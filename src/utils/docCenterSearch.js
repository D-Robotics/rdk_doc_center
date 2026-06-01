import { MANUAL_CHAPTER_INDEX } from "@site/src/data/manualChapterIndex";

function normalizeQuery(query) {
  return query.trim().toLowerCase();
}

function buildHaystack(localeFields) {
  return [localeFields.title, localeFields.parent, localeFields.summary, ...(localeFields.keywords || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function resolveChapterHref(docBase, path, locale) {
  const base = locale === "en" ? docBase.en : docBase.zh;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${normalizedPath}`;
}

function findManualSite(sites, hrefMatch) {
  return sites.find((site) => site.href?.includes(hrefMatch));
}

/**
 * 在章节索引中搜索，返回带所属手册信息的结果。
 */
export function searchManualChapters(query, { locale, sites }) {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const results = [];

  for (const manual of MANUAL_CHAPTER_INDEX) {
    const site = findManualSite(sites, manual.siteHrefMatch);
    if (!site) continue;

    for (const chapter of manual.chapters) {
      const fields = chapter[locale] || chapter.zh;
      if (!fields) continue;

      const haystack = buildHaystack(fields);
      if (!haystack.includes(normalized)) continue;

      results.push({
        type: "chapter",
        id: `${manual.siteHrefMatch}-${chapter.path}`,
        manualTitle: site.title,
        manualHref: site.href,
        chapterTitle: fields.title,
        parentChapter: fields.parent,
        summary: fields.summary,
        href: resolveChapterHref(manual.docBase, chapter.path, locale),
        external: true,
        accent: undefined,
        groupTitle: site.title,
      });
    }
  }

  return results;
}

export function searchManualCards(grouped, query) {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const matches = [];
  for (const items of Object.values(grouped)) {
    for (const item of items) {
      const haystack = [item.title, item.description, ...(item.tags || [])]
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

export function searchDocCenter(query, { locale, sites, grouped, groupsMap }) {
  const chapterHits = searchManualChapters(query, { locale, sites });
  const manualHits = searchManualCards(grouped, query).map((item) => ({
    ...item,
    groupTitle: groupsMap[item.group]?.title || "",
    accent: groupsMap[item.group]?.accent,
  }));

  const manualIdsFromChapters = new Set(
    chapterHits.map((hit) => hit.manualHref),
  );

  const dedupedManualHits = manualHits.filter(
    (item) => !manualIdsFromChapters.has(item.href),
  );

  return {
    chapterHits,
    manualHits: dedupedManualHits,
    total: chapterHits.length + dedupedManualHits.length,
  };
}
