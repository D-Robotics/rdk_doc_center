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

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    let path = u.pathname.replace(/\/+$/, "") || "/";
    // Drop common index suffixes
    path = path.replace(/\/index\.html?$/i, "");
    u.pathname = path;
    return u.toString().replace(/\/$/, "") || u.origin;
  } catch {
    return url;
  }
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

async function fetchText(url) {
  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (isToolchain(url)) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,*/*" },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!/html|xml|text/i.test(ct) && ct) return null;
    return { url: res.url || url, text: await res.text() };
  } catch (e) {
    console.warn(`  fetch fail: ${url} (${e.message})`);
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
    const got = await fetchText(sm);
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
  const queue = [normalizeUrl(startUrl)];
  const seen = new Set(queue);
  const pages = [];

  while (queue.length && pages.length < MAX_PAGES_PER_LOCALE) {
    const batch = queue.splice(0, FETCH_CONCURRENCY);
    const results = await Promise.all(batch.map((u) => fetchText(u)));
    for (const got of results) {
      if (!got) continue;
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
          abs = normalizeUrl(new URL(href, pageUrl).toString());
        } catch {
          return;
        }
        if (!sameSiteAllowed(abs, startUrl, pathPrefix)) return;
        if (seen.has(abs)) return;
        seen.add(abs);
        if (seen.size <= MAX_PAGES_PER_LOCALE * 2) queue.push(abs);
      });
    }
  }
  console.log(`  bfs: ${pages.length} pages from ${startUrl}`);
  return pages;
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
  } else {
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
