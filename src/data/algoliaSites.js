/**
 * Algolia 联邦索引抓取源（由 DOC_CENTER_CONFIG 派生）。
 * site 稳定 id 用于 facet，二期可映射为各站独立 indexName。
 *
 * 抓取时将 d-robotics.github.io 英文站改写为 developer.d-robotics.cc
 *（CI / 内网常无法访问 github.io；路径结构一致，例如
 * https://d-robotics.github.io/rdk_x_doc/en/RDK/
 * → https://developer.d-robotics.cc/rdk_x_doc/en/RDK）。
 */
import {
  DOC_CENTER_CONFIG,
  isEntryPending,
  normalizeVersions,
} from "./sites";

const DEVELOPER_HOST = "developer.d-robotics.cc";

/**
 * Rewrite GitHub Pages EN mirrors to the developer CDN for crawling only.
 * Card hrefs in sites.js are unchanged.
 */
export function rewriteCrawlUrl(href) {
  try {
    const u = new URL(href);
    if (
      u.hostname === "d-robotics.github.io" ||
      u.hostname.endsWith(".github.io")
    ) {
      u.protocol = "https:";
      u.hostname = DEVELOPER_HOST;
      // Drop trailing slash noise; indexer normalizes again
      return u.toString().replace(/\/+$/, "") || `https://${DEVELOPER_HOST}`;
    }
  } catch {
    /* keep original */
  }
  return href;
}

function siteIdFromHref(href) {
  try {
    const u = new URL(href);
    if (u.hostname.includes("toolchain.d-robotics.cc")) return "toolchain";
    const seg = u.pathname.split("/").filter(Boolean)[0];
    return seg || u.hostname.replace(/\./g, "_");
  } catch {
    return "unknown";
  }
}

function pathPrefixFromHref(href) {
  try {
    const u = new URL(href);
    if (u.hostname.includes("toolchain.d-robotics.cc")) {
      return u.pathname.includes("/en/") ? "/en" : "";
    }
    const parts = u.pathname.split("/").filter(Boolean);
    if (!parts.length) return "";
    // e.g. /rdk_x_doc/en/... or Sphinx /oe_x5_doc/cn/...
    if (parts[1] === "en" || parts[1] === "cn") {
      return `/${parts[0]}/${parts[1]}`;
    }
    return `/${parts[0]}`;
  } catch {
    return "";
  }
}

function crawlHrefsForLocale(entry, locale) {
  if (isEntryPending(entry, locale)) return [];
  const i18n = entry[locale];
  if (!i18n) return [];

  const versions = normalizeVersions(entry, locale);
  if (versions.length) {
    return versions
      .filter((version) => !version.pendingRelease && (version.channelLatest || version.index))
      .map((version) => version.href)
      .filter((href) => href && /^https?:\/\//.test(href));
  }

  const rawHref = i18n.href || entry.href;
  return rawHref && /^https?:\/\//.test(rawHref) ? [rawHref] : [];
}

/**
 * @returns {Array<{
 *   site: string,
 *   entryId: string,
 *   manualTitle: { zh: string, en: string },
 *   locales: Array<{ language: string, startUrl: string, pathPrefix: string }>
 * }>}
 */
export function getAlgoliaCrawlTargets() {
  const bySite = new Map();

  for (const entry of DOC_CENTER_CONFIG.entries) {
    for (const locale of ["zh", "en"]) {
      const hrefs = crawlHrefsForLocale(entry, locale);
      for (const rawHref of hrefs) {
        const href = rewriteCrawlUrl(rawHref);
        const site = siteIdFromHref(href);
        if (!bySite.has(site)) {
          bySite.set(site, {
            site,
            entryId: entry.id,
            manualTitle: {
              zh: entry.zh?.title || entry.id,
              en: entry.en?.title || entry.zh?.title || entry.id,
            },
            locales: [],
          });
        }

        const target = bySite.get(site);
        const language = locale === "en" ? "en" : "zh-Hans";
        if (target.locales.some((l) => l.language === language)) continue;
        target.locales.push({
          language,
          startUrl: href,
          pathPrefix: pathPrefixFromHref(href),
        });
      }
    }
  }

  return [...bySite.values()];
}

export const ALGOLIA_INDEX_NAME_DEFAULT = "rdk_doc_center";
