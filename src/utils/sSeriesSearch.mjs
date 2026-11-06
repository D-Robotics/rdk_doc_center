/**
 * S100/S600 share rdk_s_doc. The federated doc-center index stamps every hit
 * with whichever manual was crawled first (RDK S600) and keeps every DocScope
 * block, so S100-only chapters show up as S600 and each version is listed again.
 * The manual index already stores one product and one version per record.
 */

export const S_SERIES_INDEX = "rdk_s_doc";

export function sSeriesPins(versionMap) {
  return Object.entries(versionMap || [])
    .filter(([, info]) => info?.site === "s" && info.version)
    .map(([product, info]) => ({ product, version: String(info.version) }));
}

export function sSeriesFilter(language, pin) {
  const lang = language === "en" ? "en" : "zh-Hans";
  return `language:${lang} AND product:"${pin.product}" AND rdk_version:${pin.version}`;
}

export function isSSeriesHit(hit) {
  if (!hit) return false;
  if (hit.site === S_SERIES_INDEX) return true;
  const url = hit.url || "";
  try {
    return new URL(url).pathname.includes(`/${S_SERIES_INDEX}/`);
  } catch {
    return url.includes(`/${S_SERIES_INDEX}/`);
  }
}

export function tagSSeriesHit(hit) {
  const product = typeof hit?.product === "string" ? hit.product : "";
  return {
    ...hit,
    site: S_SERIES_INDEX,
    manualTitle: product || hit?.manualTitle || "",
  };
}

function hierarchyText(hit) {
  return Object.values(hit?.hierarchy || {})
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

export function zipByTitleMatch(lists, query) {
  const q = String(query || "").trim().toLowerCase();
  const ranked = [...lists].sort((a, b) => {
    const aLead = q && hierarchyText(a[0]).includes(q) ? 0 : 1;
    const bLead = q && hierarchyText(b[0]).includes(q) ? 0 : 1;
    return aLead - bLead;
  });
  const max = Math.max(0, ...ranked.map((list) => list.length));
  const out = [];
  for (let i = 0; i < max; i += 1) {
    for (const list of ranked) {
      if (list[i]) out.push(list[i]);
    }
  }
  return out;
}

export function dedupeKey(hit) {
  const manual = hit?.manualTitle || (typeof hit?.product === "string" ? hit.product : "");
  try {
    const url = new URL(hit.url);
    const hash = decodeURIComponent(url.hash || "");
    return `${manual}|${url.origin}${url.pathname}|${hash}`;
  } catch {
    return `${manual}|${hit?.url || hit?.objectID || ""}`;
  }
}

export function dedupeHits(hits) {
  const seen = new Set();
  const out = [];
  for (const hit of hits || []) {
    const key = dedupeKey(hit);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(hit);
  }
  return out;
}

/**
 * Drop federated S-series hits and put the product-scoped hits in their place.
 * If the manual index returned nothing, keep the federated list.
 */
export function mergeSSeriesHits(federatedHits, scopedHits) {
  if (!scopedHits || scopedHits.length === 0) return dedupeHits(federatedHits);
  const merged = [];
  let inserted = false;
  for (const hit of federatedHits || []) {
    if (isSSeriesHit(hit)) {
      if (!inserted) {
        merged.push(...scopedHits);
        inserted = true;
      }
      continue;
    }
    merged.push(hit);
  }
  if (!inserted) merged.push(...scopedHits);
  return dedupeHits(merged);
}
