/**
 * Doc center crawl helpers for manuals that share one site (S100/S600, X3/X5).
 * The published HTML keeps every DocScope block; the indexer must keep only the
 * block that matches the manual card's product and version.
 */

const PRODUCT_PATH_MARKERS = [
  ["/rdk_x5_module", "RDK X5 Module"],
  ["/rdk_x3_module", "RDK X3 Module"],
  ["/rdk_x5", "RDK X5"],
  ["/rdk_x3", "RDK X3"],
  ["/rdk_s600", "RDK S600"],
  ["/rdk_s100", "RDK S100"],
];

function norm(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function seriesKey(entry) {
  const match = String(entry || "").trim().match(/^rdk\s*-\s*(.+)$/i);
  if (!match) return "";
  return norm(`RDK ${match[1]}`);
}

export function productsMatch(scopeProducts, product) {
  if (!scopeProducts || scopeProducts.length === 0) return true;
  if (!product) return false;
  const current = norm(product);
  for (const entry of scopeProducts) {
    const series = seriesKey(entry);
    if (series && (current === series || current.startsWith(`${series} `))) {
      return true;
    }
    if (norm(entry) === current) return true;
  }
  return false;
}

function compareVersions(a, b) {
  const left = String(a || "").split(".").map((part) => Number(part) || 0);
  const right = String(b || "").split(".").map((part) => Number(part) || 0);
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i += 1) {
    const delta = (left[i] || 0) - (right[i] || 0);
    if (delta) return delta > 0 ? 1 : -1;
  }
  return 0;
}

function versionRuleMatches(current, rule) {
  if (rule == null) return false;
  if (typeof rule === "string") {
    const parsed = rule.trim().match(/^(>=|<=|>|<)?\s*(\d+(?:\.\d+)*)$/);
    if (!parsed) return rule.trim() === current;
    return versionRuleMatches(current, { operator: parsed[1] || "", version: parsed[2] });
  }
  const operator = rule.operator || "";
  const version = rule.version;
  if (!version) return false;
  const cmp = compareVersions(current, version);
  if (operator === ">") return cmp > 0;
  if (operator === ">=") return cmp >= 0;
  if (operator === "<") return cmp < 0;
  if (operator === "<=") return cmp <= 0;
  return cmp === 0;
}

export function versionsMatch(scopeVersions, version) {
  if (!scopeVersions || scopeVersions.length === 0) return true;
  if (!version) return false;
  return scopeVersions.some((rule) => versionRuleMatches(version, rule));
}

export function scopeVisible(scopeProductsAttr, docScopeAttr, product, version) {
  if (!product && !version) return true;

  let products = [];
  let versions = [];
  let parsed = false;
  if (docScopeAttr) {
    try {
      const spec = JSON.parse(docScopeAttr);
      products = Array.isArray(spec.products) ? spec.products : [];
      versions = Array.isArray(spec.versions) ? spec.versions : [];
      parsed = true;
    } catch {
      parsed = false;
    }
  }
  if (scopeProductsAttr) {
    const tokens = String(scopeProductsAttr)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (tokens.length) products = tokens;
    parsed = true;
  }
  if (!parsed) return true;
  if (!productsMatch(products, product)) return false;
  if (!versionsMatch(versions, version)) return false;
  return true;
}

export function removeOutOfScope($, root, product, version) {
  if (!product && !version) return;
  const nodes = root
    .find("[data-doc-scope]")
    .toArray()
    .sort((a, b) => $(b).parents().length - $(a).parents().length);
  for (const el of nodes) {
    const $el = $(el);
    if (!$el.parent || $el.parent().length === 0) continue;
    if (
      !scopeVisible(
        $el.attr("data-scope-products"),
        $el.attr("data-doc-scope"),
        product,
        version,
      )
    ) {
      $el.remove();
    }
  }
}

export function pathAllowsProduct(pathname, product) {
  if (!product) return true;
  const path = String(pathname || "").toLowerCase();
  for (const [marker, owner] of PRODUCT_PATH_MARKERS) {
    if (path.includes(marker)) return owner === product;
  }
  return true;
}

export function stampScopeUrl(url, product, version) {
  if (!product && !version) return url;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (product && !parsed.searchParams.get("p")) parsed.searchParams.set("p", product);
  if (version && !parsed.searchParams.get("v")) parsed.searchParams.set("v", version);
  return parsed.toString();
}
