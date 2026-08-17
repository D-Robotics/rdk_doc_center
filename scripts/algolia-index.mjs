/**
 * Crawl live doc sites listed in algoliaSites.js and upload DocSearch-compatible
 * records into the federated Algolia index (default: rdk_doc_center).
 *
 * Requires ALGOLIA_ADMIN_API_KEY. Optional: ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME.
 *
 * Usage:
 *   npm run algolia:index
 *   npm run algolia:index -- --site=rdk_x_doc --dry-run
 */
import "dotenv/config";
import { createHash } from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { algoliasearch } from "algoliasearch";
import {
  ALGOLIA_INDEX_NAME_DEFAULT,
  getAlgoliaCrawlTargets,
} from "./algolia-sites.mjs";
import { DOCSEARCH_INDEX_SETTINGS } from "./algolia-settings.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TMP_DIR = join(ROOT, "scripts", "_algolia_tmp");

const APP_ID =
  process.env.ALGOLIA_APP_ID ||
  process.env.DOCUSAURUS_ALGOLIA_APP_ID ||
  "";
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_API_KEY || "";
const INDEX_NAME =
  process.env.ALGOLIA_INDEX_NAME || ALGOLIA_INDEX_NAME_DEFAULT;

const MAX_PAGES_PER_LOCALE = Number(process.env.ALGOLIA_MAX_PAGES || 250);
const FETCH_CONCURRENCY = 6;
const CONTENT_CHUNK_SIZE = 1800;
const USER_AGENT = "rdk-doc-center-algolia-indexer/1.0";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const siteFilter = args
  .find((a) => a.startsWith("--site="))
  ?.slice("--site=".length);

function levelFromWeight(type) {
  if (type === "content") return 0;
  const m = /^lvl(\d)$/.exec(type);
  return m ? 100 - Number(m[1]) * 10 : 0;
}

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\-_]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function toHttps(url) {
  try {
    const u = new URL(url);
    if (u.protocol === "http:") u.protocol = "https:";
    return u.toString();
  } catch {
    return url;
  }
}

function lastPathSegment(pathname) {
  return pathname.split("/").filter(Boolean).pop() || "";
}

function hasFileExtension(pathname) {
  return /\.[a-z0-9]{1,8}$/i.test(lastPathSegment(pathname));
}

function normalizeUrl(url) {
  try {
    const u = new URL(toHttps(url));
    u.hash = "";
    let path = u.pathname || "/";
    // Collapse index.html to a directory URL, keep the trailing slash.
    // Stripping both /index.html and "/" makes OE/Sphinx hosts 301 to http://
    // (port 80 times out) or 404 on extensionless paths like /en and /cn.
    path = path.replace(/\/index\.html?$/i, "/");
    if (path !== "/" && !hasFileExtension(path) && !path.endsWith("/")) {
      path += "/";
    }
    u.pathname = path || "/";
    return u.toString();
  } catch {
    return url;
  }
}

function fetchUrlCandidates(url) {
  const seen = new Set();
  const out = [];
  const add = (value) => {
    try {
      const href = toHttps(new URL(value).toString());
      if (!seen.has(href)) {
        seen.add(href);
        out.push(href);
      }
    } catch {
      /* skip */
    }
  };

  add(url);
  try {
    const u = new URL(toHttps(url));
    if (!hasFileExtension(u.pathname)) {
      const withSlash = new URL(u);
      if (!withSlash.pathname.endsWith("/")) withSlash.pathname += "/";
      add(withSlash.toString());
      const indexHtml = new URL(u);
      indexHtml.pathname = `${u.pathname.replace(/\/+$/, "")}/index.html`;
      add(indexHtml.toString());
    }
  } catch {
    /* keep original candidate */
  }
  return out;
}

function sameSiteAllowed(url, startUrl, pathPrefix) {
  let u;
  let start;
  try {
    u = new URL(url);
    start = new URL(startUrl);
  } catch {
    return false;
  }
  if (u.origin !== start.origin) return false;
  if (pathPrefix) {
    const p = u.pathname;
    if (!(p === pathPrefix || p.startsWith(`${pathPrefix}/`))) return false;
  }
  // Skip assets / non-doc
  if (/\.(png|jpe?g|gif|svg|webp|css|js|json|xml|pdf|zip|ico|woff2?|map)$/i.test(u.pathname)) {
    return false;
  }
  // Skip non-doc utility paths
  if (/\/(search|tags|blog)(\/|$)/i.test(u.pathname)) return false;
  return true;
}

function isToolchain(url) {
  return url.includes("toolchain.d-robotics.cc");
}

function isRedirectStatus(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function fetchOnce(url, accept) {
  let current = toHttps(url);
  for (let hop = 0; hop < 8; hop += 1) {
    const res = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": USER_AGENT, accept },
      signal: AbortSignal.timeout(25000),
    });
    if (isRedirectStatus(res.status)) {
      const loc = res.headers.get("location");
      if (!loc) {
        return { ok: false, status: res.status, url: current, res };
      }
      current = toHttps(new URL(loc, current).toString());
      continue;
    }
    return { ok: res.ok, status: res.status, url: res.url || current, res };
  }
  return { ok: false, status: 0, url: current, res: null };
}

async function fetchText(url, { accept = "text/html,application/xhtml+xml,application/xml,application/json,text/xml,*/*", warn = true } = {}) {
  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (isToolchain(url)) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  const candidates = fetchUrlCandidates(url);
  let lastError = "";
  try {
    for (const candidate of candidates) {
      try {
        const got = await fetchOnce(candidate, accept);
        if (!got.ok || !got.res) {
          lastError = `${got.status || "error"} ${candidate}`;
          continue;
        }
        const ct = got.res.headers.get("content-type") || "";
        if (ct && !/html|xml|json|text|javascript|ecmascript/i.test(ct)) {
          lastError = `content-type ${ct} ${candidate}`;
          continue;
        }
        return { url: got.url || candidate, text: await got.res.text() };
      } catch (e) {
        lastError = `${e.message} ${candidate}`;
      }
    }
    if (warn) {
      console.warn(`  fetch fail: ${url} (${lastError || "no candidate succeeded"})`);
    }
    return null;
  } finally {
    if (isToolchain(url)) {
      if (prevTls === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevTls;
    }
  }
}

async function discoverFromSitemap(startUrl, pathPrefix) {
  const origin = new URL(startUrl).origin;
  const candidates = [
    `${origin}${pathPrefix}/sitemap.xml`,
    `${origin}/sitemap.xml`,
  ];
  const urls = new Set();
  for (const sm of candidates) {
    const got = await fetchText(sm, { warn: false });
    if (!got) continue;
    const matches = [...got.text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)];
    for (const m of matches) {
      const loc = m[1].trim();
      if (sameSiteAllowed(loc, startUrl, pathPrefix)) {
        urls.add(normalizeUrl(loc));
      }
    }
    if (urls.size) {
      console.log(`  sitemap: ${sm} → ${urls.size} urls`);
      return [...urls];
    }
  }
  return [];
}

async function discoverByBfs(startUrl, pathPrefix) {
  const startKey = normalizeUrl(startUrl);
  const queue = [startUrl];
  const seen = new Set([startKey]);
  const pages = [];

  while (queue.length && pages.length < MAX_PAGES_PER_LOCALE) {
    const batch = queue.splice(0, FETCH_CONCURRENCY);
    const results = await Promise.all(batch.map((u) => fetchText(u)));
    for (const got of results) {
      if (!got) continue;
      if (isSpaShell(got.text)) continue;
      const pageUrl = normalizeUrl(got.url);
      pages.push({ url: pageUrl, html: got.text });
      const $ = cheerio.load(got.text);
      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
          return;
        }
        let abs;
        try {
          abs = new URL(href, got.url).toString();
        } catch {
          return;
        }
        if (!sameSiteAllowed(abs, startUrl, pathPrefix)) return;
        const key = normalizeUrl(abs);
        if (seen.has(key)) return;
        seen.add(key);
        if (seen.size <= MAX_PAGES_PER_LOCALE * 2) queue.push(abs);
      });
    }
  }
  console.log(`  bfs: ${pages.length} pages from ${startUrl}`);
  return pages;
}

function isSpaShell(html) {
  if (!html) return false;
  const compact = html.slice(0, 8000);
  const hasRoot = /id=["']root["']/i.test(compact);
  const rspress = /generator" content="Rspress/i.test(compact);
  const hasArticle = /<(article|main)\b/i.test(html);
  return (hasRoot || rspress) && !hasArticle && html.length < 20000;
}

function isRspressDataScript(src) {
  const name = (src.split("/").pop() || "").split("?")[0];
  if (!/\.js$/i.test(name)) return false;
  if (/^(lib-|styles\.)/i.test(name)) return false;
  return true;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlFromRspressDoc(doc) {
  const paras = String(doc.content || "")
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");
  return `<article class="theme-doc-markdown"><h1>${escapeHtml(doc.title || "")}</h1>${paras}</article>`;
}

function staticDirFromStartUrl(startUrl) {
  const u = new URL(startUrl);
  const root = u.pathname.split("/").filter(Boolean)[0];
  return root ? `${u.origin}/${root}/static` : `${u.origin}/static`;
}

async function loadRspressSearchDocs(startPage, localeCfg) {
  const $ = cheerio.load(startPage.text);
  const scripts = [];
  $("script[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (!src || !isRspressDataScript(src)) return;
    try {
      scripts.push(new URL(src, startPage.url).toString());
    } catch {
      /* skip */
    }
  });
  if (!scripts.length) return [];

  const langKey = localeCfg.language === "en" ? "en" : "zh";
  const hashEntries = [];
  const jsPages = await mapPool(scripts, FETCH_CONCURRENCY, (src) => fetchText(src));
  for (const got of jsPages) {
    if (!got) continue;
    for (const m of got.text.matchAll(/"([^"]*###(zh|en))":"([a-f0-9]+)"/g)) {
      const version = m[1].slice(0, m[1].indexOf("###"));
      hashEntries.push({ version, lang: m[2], hash: m[3] });
    }
  }
  const picked =
    hashEntries.find((e) => e.lang === langKey && !e.version) ||
    hashEntries.find((e) => e.lang === langKey && e.version === "latest") ||
    hashEntries.find((e) => e.lang === langKey);
  if (!picked) {
    console.warn(`  rspress: no search_index hash for lang=${langKey}`);
    return [];
  }

  const versionSuffix = picked.version ? `.${picked.version.replace(/\./g, "_")}` : "";
  const indexUrl = `${staticDirFromStartUrl(localeCfg.startUrl)}/search_index${versionSuffix}.${langKey}.${picked.hash}.json`;
  const got = await fetchText(indexUrl, { accept: "application/json,text/plain,*/*" });
  if (!got) return [];

  let docs;
  try {
    docs = JSON.parse(got.text);
  } catch (e) {
    console.warn(`  rspress: invalid search_index JSON (${e.message})`);
    return [];
  }
  if (!Array.isArray(docs)) return [];

  const filtered = docs.filter((doc) => {
    if (!doc || typeof doc !== "object") return false;
    if (doc.lang && doc.lang !== langKey) return false;
    const route = String(doc.routePath || "");
    if (langKey === "en") return route.includes("/en/");
    return route && !route.includes("/en/");
  });
  const limited = filtered.slice(0, Math.max(MAX_PAGES_PER_LOCALE, 2000));
  console.log(`  rspress: ${indexUrl} → ${limited.length} docs`);
  const origin = new URL(localeCfg.startUrl).origin;
  return limited.map((doc) => ({
    url: `${origin}${doc.routePath || "/"}`,
    html: htmlFromRspressDoc(doc),
  }));
}

function pickContentRoot($) {
  const selectors = [
    "article .theme-doc-markdown",
    "article",
    "main .theme-doc-markdown",
    "main .markdown",
    ".theme-doc-markdown",
    "main",
    ".vp-doc",
    "#app .content",
    "[role='main']",
    "div.body",
    ".document",
    ".rst-content",
    "body",
  ];
  for (const sel of selectors) {
    const node = $(sel).first();
    if (node.length && node.text().trim().length > 40) return node;
  }
  return $("body");
}

function readMeta($, name) {
  return (
    $(`meta[name="${name}"]`).attr("content") ||
    $(`meta[property="${name}"]`).attr("content") ||
    ""
  );
}

function extractRecords(html, pageUrl, { site, manualTitle, language }) {
  const $ = cheerio.load(html);
  // Prefer markdown article only — avoids sidebar/toc list explosion
  const root = pickContentRoot($);
  root.find("nav, .theme-doc-toc-desktop, .theme-doc-toc-mobile, .pagination-nav, .hash-link").remove();

  const pageTitle =
    root.find("h1").first().text().trim() ||
    $("h1").first().text().trim() ||
    $("title").text().split(/[|\-·]/)[0].trim() ||
    manualTitle;

  const docusaurusTag =
    readMeta($, "docsearch:docusaurus_tag") || "docs-default-current";
  const metaLang =
    readMeta($, "docsearch:language") ||
    $("html").attr("lang") ||
    language;

  const hierarchy = {
    lvl0: manualTitle,
    lvl1: pageTitle && pageTitle !== manualTitle ? pageTitle : null,
    lvl2: null,
    lvl3: null,
    lvl4: null,
    lvl5: null,
    lvl6: null,
  };

  const urlWithoutAnchor = normalizeUrl(pageUrl);
  const records = [];
  let position = 0;
  let currentAnchor =
    root.find("h1").first().attr("id") || slugify(hierarchy.lvl1 || pageTitle);
  let contentBuf = "";

  const hierarchySnapshot = () => {
    const h = { ...hierarchy };
    for (const k of Object.keys(h)) {
      if (h[k] == null) delete h[k];
    }
    return h;
  };

  const pushRecord = (type, content, anchor, hOverride) => {
    position += 1;
    const h = hOverride || hierarchySnapshot();
    const objectID = createHash("sha1")
      .update(`${site}|${language}|${urlWithoutAnchor}|${type}|${anchor || ""}|${content}|${position}`)
      .digest("hex");
    records.push({
      objectID,
      hierarchy: h,
      content: content || "",
      type,
      url: anchor ? `${urlWithoutAnchor}#${anchor}` : urlWithoutAnchor,
      url_without_anchor: urlWithoutAnchor,
      anchor: anchor || null,
      language,
      lang: metaLang || language,
      version: "current",
      docusaurus_tag: docusaurusTag,
      site,
      manualTitle,
      weight: {
        pageRank: urlWithoutAnchor.includes("/category/") ? -1 : 0,
        level: levelFromWeight(type),
        position,
      },
    });
  };

  const flushContent = () => {
    const text = contentBuf.replace(/\s+/g, " ").trim();
    contentBuf = "";
    if (text.length < 8) return;
    const h = hierarchySnapshot();
    for (let i = 0; i < text.length; i += CONTENT_CHUNK_SIZE) {
      pushRecord("content", text.slice(i, i + CONTENT_CHUNK_SIZE), currentAnchor, h);
    }
  };

  if (hierarchy.lvl1) {
    pushRecord("lvl1", "", currentAnchor);
  }

  // Only headings + paragraphs (aggregate). Skip li/td to keep record count manageable.
  root.find("h1, h2, h3, h4, h5, h6, p").each((_, el) => {
    const $el = $(el);
    const tag = (($el.prop("tagName") || el.name || "") + "").toLowerCase();
    const text = $el.text().replace(/\s+/g, " ").trim();
    if (!text) return;

    if (/^h[1-6]$/.test(tag)) {
      flushContent();
      const level = Number(tag[1]);
      for (let i = level; i <= 6; i += 1) hierarchy[`lvl${i}`] = null;
      hierarchy[`lvl${level}`] = text;
      currentAnchor = $el.attr("id") || slugify(text);
      if (!(level === 1 && records.some((r) => r.type === "lvl1" && r.anchor === currentAnchor))) {
        pushRecord(`lvl${level}`, "", currentAnchor);
      }
      return;
    }

    contentBuf = contentBuf ? `${contentBuf} ${text}` : text;
  });
  flushContent();

  if (!records.length) {
    pushRecord("lvl0", pageTitle || "", null);
  }

  return records;
}

async function mapPool(items, concurrency, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i;
      i += 1;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function crawlLocale(target, localeCfg) {
  const { site, manualTitle } = target;
  const title =
    localeCfg.language === "en" ? manualTitle.en : manualTitle.zh;
  console.log(`\n[${site}] ${localeCfg.language} ← ${localeCfg.startUrl}`);

  let pageEntries = [];
  const startPage = await fetchText(localeCfg.startUrl);

  if (startPage && isSpaShell(startPage.text)) {
    pageEntries = await loadRspressSearchDocs(startPage, localeCfg);
  }

  if (!pageEntries.length) {
    const fromSm = await discoverFromSitemap(
      localeCfg.startUrl,
      localeCfg.pathPrefix,
    );
    if (fromSm.length) {
      const limited = fromSm.slice(0, MAX_PAGES_PER_LOCALE);
      const fetched = await mapPool(limited, FETCH_CONCURRENCY, async (url) => {
        const got = await fetchText(url);
        return got ? { url: normalizeUrl(got.url), html: got.text } : null;
      });
      pageEntries = fetched.filter(Boolean);
      console.log(`  fetched ${pageEntries.length}/${limited.length} sitemap pages`);
    }
  }

  if (!pageEntries.length) {
    pageEntries = await discoverByBfs(localeCfg.startUrl, localeCfg.pathPrefix);
  }

  const records = [];
  for (const page of pageEntries) {
    try {
      records.push(
        ...extractRecords(page.html, page.url, {
          site,
          manualTitle: title,
          language: localeCfg.language,
        }),
      );
    } catch (e) {
      console.warn(`  parse fail ${page.url}: ${e.message}`);
    }
  }
  console.log(`  records: ${records.length}`);
  return records;
}

async function main() {
  if (!ADMIN_KEY && !dryRun) {
    console.error(
      "Missing ALGOLIA_ADMIN_API_KEY. Copy .env.example to .env and set the Admin key.",
    );
    process.exit(1);
  }
  if (!APP_ID && !dryRun) {
    console.error("Missing ALGOLIA_APP_ID.");
    process.exit(1);
  }

  let targets = getAlgoliaCrawlTargets();
  if (siteFilter) {
    targets = targets.filter((t) => t.site === siteFilter);
    if (!targets.length) {
      console.error(`No crawl target matches --site=${siteFilter}`);
      process.exit(1);
    }
  }

  console.log(
    `Indexing ${targets.length} site(s) → ${INDEX_NAME}${dryRun ? " (dry-run)" : ""}`,
  );

  const allRecords = [];
  for (const target of targets) {
    for (const localeCfg of target.locales) {
      const records = await crawlLocale(target, localeCfg);
      allRecords.push(...records);
    }
  }

  console.log(`\nTotal records: ${allRecords.length}`);
  mkdirSync(TMP_DIR, { recursive: true });
  const samplePath = join(TMP_DIR, "last-run-sample.json");
  writeFileSync(
    samplePath,
    JSON.stringify(allRecords.slice(0, 20), null, 2),
    "utf8",
  );
  console.log(`Sample written to ${samplePath}`);

  if (dryRun) {
    console.log("Dry-run complete; nothing uploaded.");
    return;
  }

  const client = algoliasearch(APP_ID, ADMIN_KEY);

  console.log("Applying index settings…");
  await client.setSettings({
    indexName: INDEX_NAME,
    indexSettings: DOCSEARCH_INDEX_SETTINGS,
  });

  console.log("Clearing index…");
  await client.clearObjects({ indexName: INDEX_NAME });

  const batchSize = 500;
  for (let i = 0; i < allRecords.length; i += batchSize) {
    const chunk = allRecords.slice(i, i + batchSize);
    await client.saveObjects({ indexName: INDEX_NAME, objects: chunk });
    console.log(`  uploaded ${Math.min(i + batchSize, allRecords.length)}/${allRecords.length}`);
  }

  // Per-site counts
  const bySite = {};
  for (const r of allRecords) {
    bySite[r.site] = (bySite[r.site] || 0) + 1;
  }
  console.log("\nRecords by site:");
  for (const [site, n] of Object.entries(bySite).sort()) {
    console.log(`  ${site}: ${n}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  // Avoid dumping env / request headers that might contain Admin key
  const message = err?.message || String(err);
  console.error(`algolia:index failed: ${message}`);
  if (err?.status || err?.statusCode) {
    console.error(`status: ${err.status || err.statusCode}`);
  }
  process.exit(1);
});
