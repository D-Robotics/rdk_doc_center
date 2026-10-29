/**
 * Rspress OE 手册发布的是扁平的 route.html。
 * Sphinx OE 手册（X3 / X5）才是目录式 URL，尾斜杠对应 index.html。
 *
 * 联邦索引曾把所有 oe_* 都当成 Sphinx，给 routePath 补上尾斜杠。
 * 网关因此去取 route/index.html，对象存储返回 NoSuchKey。
 * 路径末段带点号时（如 qwen2.5）不加 .html 也会 404，因为 .5 会被当成扩展名。
 */

export const RSPRESS_OE_ROOTS = new Set([
  "oe_s_doc",
  "oe_llm_doc",
  "oe_llm_s100p_doc",
]);

export const SPHINX_OE_ROOTS = new Set(["oe_x3_doc", "oe_x5_doc"]);

export function pathRoot(pathname) {
  return String(pathname || "").split("/").filter(Boolean)[0] || "";
}

export function isRspressOeRoot(pathname) {
  return RSPRESS_OE_ROOTS.has(pathRoot(pathname));
}

export function isSphinxOeRoot(pathname) {
  return SPHINX_OE_ROOTS.has(pathRoot(pathname));
}

/** route 或带尾斜杠的目录 URL → 实际存在的 .html 对象路径。 */
export function rspressPublicPath(pathname) {
  let path = String(pathname || "/").replace(/\/+$/, "") || "/";
  if (path !== "/" && !/\.html?$/i.test(path)) path += ".html";
  return path;
}

/**
 * 只改写 Rspress OE 命中。Sphinx 目录 URL 与其它站点原样返回。
 * 保留 hash，供章节锚点继续跳转。
 */
export function toRspressPublicUrl(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return url;
  }
  if (!isRspressOeRoot(u.pathname)) return url;
  const hash = u.hash;
  u.hash = "";
  u.pathname = rspressPublicPath(u.pathname);
  u.hash = hash;
  return u.toString();
}
