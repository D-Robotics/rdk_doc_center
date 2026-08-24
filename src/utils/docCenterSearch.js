import { algoliasearch } from "algoliasearch";

/** 搜索结果展示用：去掉「1.2 」「3.7.1 」等章节序号前缀 */
export function stripChapterPrefix(title) {
  if (!title) return title;
  return title.replace(/^\d+(?:\.\d+)*\.?\s+/, "");
}

function normalizeQuery(query) {
  return query.trim().toLowerCase();
}

export function searchManualCards(grouped, query) {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const matches = [];
  for (const items of Object.values(grouped)) {
    for (const item of items) {
      const versionLabels = (item.versions || []).map((v) => v.label || v.id);
      const haystack = [
        item.title,
        item.description,
        item.versionHint,
        ...(item.tags || []),
        ...versionLabels,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (haystack.includes(normalized)) {
        matches.push({ ...item, type: "manual" });
      }
    }
  }
  return matches;
}

function deepestHierarchyTitle(hierarchy) {
  if (!hierarchy) return "";
  for (let i = 6; i >= 0; i -= 1) {
    const v = hierarchy[`lvl${i}`];
    if (v) return v;
  }
  return "";
}

function parentHierarchyTitle(hierarchy) {
  if (!hierarchy) return "";
  const levels = [];
  for (let i = 0; i <= 6; i += 1) {
    if (hierarchy[`lvl${i}`]) levels.push(hierarchy[`lvl${i}`]);
  }
  if (levels.length < 2) return levels[0] === hierarchy.lvl0 ? "" : "";
  // parent = second-to-last meaningful title (skip lvl0 manual name when deeper exists)
  if (levels.length >= 3) return levels[levels.length - 2];
  return levels[0];
}

function mapHitToChapter(hit) {
  const hierarchy = hit.hierarchy || {};
  const chapterTitle =
    stripChapterPrefix(deepestHierarchyTitle(hierarchy)) ||
    hit.manualTitle ||
    hit.url;
  const parentRaw = parentHierarchyTitle(hierarchy);
  const parentChapter =
    parentRaw && parentRaw !== deepestHierarchyTitle(hierarchy)
      ? stripChapterPrefix(parentRaw)
      : hierarchy.lvl0 && hierarchy.lvl0 !== chapterTitle
        ? stripChapterPrefix(hierarchy.lvl0)
        : "";

  const summary =
    hit._snippetResult?.content?.value?.replace(/<\/?[^>]+>/g, "") ||
    hit.content ||
    "";

  return {
    type: "chapter",
    id: hit.objectID || hit.url,
    manualTitle: hit.manualTitle || hierarchy.lvl0 || hit.site || "",
    manualHref: hit.url_without_anchor || hit.url,
    chapterTitle,
    parentChapter,
    summary,
    href: hit.url,
    external: true,
    site: hit.site,
  };
}

/**
 * Query Algolia (supports multi-index via searchIndexes for phase-2).
 * @returns {Promise<{ chapterHits: any[], rawHits: any[] }>}
 */
export async function searchAlgoliaChapters(query, { language, algoliaConfig }) {
  const q = query.trim();
  if (!q) return { chapterHits: [], rawHits: [] };

  const appId = algoliaConfig?.appId;
  const apiKey = algoliaConfig?.apiKey;
  const indexes =
    algoliaConfig?.searchIndexes?.length > 0
      ? algoliaConfig.searchIndexes
      : algoliaConfig?.indexName
        ? [algoliaConfig.indexName]
        : [];

  if (!appId || !apiKey || !indexes.length) {
    if (typeof console !== "undefined") {
      console.warn(
        "[doc-center] Algolia is not configured (customFields.algolia). Chapter search skipped.",
      );
    }
    return { chapterHits: [], rawHits: [] };
  }

  const client = algoliasearch(appId, apiKey);
  const lang = language === "en" ? "en" : "zh-Hans";
  const requests = indexes.map((indexName) => ({
    indexName,
    query: q,
    hitsPerPage: 40,
    filters: `language:${lang}`,
    attributesToRetrieve: [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type",
      "site",
      "manualTitle",
      "language",
    ],
    attributesToSnippet: ["content:20"],
    distinct: true,
  }));

  const { results } = await client.search({ requests });
  const rawHits = [];
  for (const result of results || []) {
    if (result.hits) rawHits.push(...result.hits);
  }

  // Dedupe by url, keep first (higher ranked)
  const seen = new Set();
  const chapterHits = [];
  for (const hit of rawHits) {
    const key = hit.url || hit.objectID;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    chapterHits.push(mapHitToChapter(hit));
  }

  return { chapterHits, rawHits };
}

/**
 * Compose portal search: Algolia chapters + local manual card matches.
 */
export async function searchDocCenter(query, { locale, grouped, groupsMap, algoliaConfig }) {
  const normalized = query.trim();
  if (!normalized) {
    return { chapterHits: [], manualHits: [], total: 0 };
  }

  const language = locale === "en" ? "en" : "zh-Hans";
  const { chapterHits } = await searchAlgoliaChapters(normalized, {
    language,
    algoliaConfig,
  });

  const manualHits = searchManualCards(grouped, normalized).map((item) => ({
    ...item,
    groupTitle: groupsMap[item.group]?.title || "",
    accent: groupsMap[item.group]?.accent,
  }));

  const manualsFromChapters = new Set(
    chapterHits.map((h) => h.site).filter(Boolean),
  );
  const dedupedManualHits = manualHits.filter((item) => {
    // Drop card if we already have chapter hits from same site id in href
    const href = item.href || "";
    for (const site of manualsFromChapters) {
      if (href.includes(site)) return false;
    }
    return true;
  });

  return {
    chapterHits,
    manualHits: dedupedManualHits,
    total: chapterHits.length + dedupedManualHits.length,
  };
}
