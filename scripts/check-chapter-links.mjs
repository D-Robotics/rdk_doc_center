/**
 * 校验 manualChapterIndex* 中 path 在对应 docBase 下是否可访问（HTTP HEAD）。
 */
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "src", "data");

const SITE_BASES = {
  "manualChapterIndex.js": [
    { label: "rdk_x_doc", base: "https://developer.d-robotics.cc/rdk_x_doc" },
  ],
  "manualChapterIndexRdkS.js": [
    { label: "rdk_s_doc", base: "https://developer.d-robotics.cc/rdk_s_doc" },
  ],
  "manualChapterIndexTros.js": [
    { label: "tros_doc", base: "https://developer.d-robotics.cc/tros_doc" },
  ],
  "manualChapterIndexMagicbox.js": [
    { label: "magicbox_doc", base: "https://developer.d-robotics.cc/magicbox_doc" },
  ],
  "manualChapterIndexStudio.js": [
    { label: "rdk_studio_doc", base: "https://developer.d-robotics.cc/rdk_studio_doc" },
  ],
  "manualChapterIndexOe.js": [
    { label: "toolchain", base: "https://toolchain.d-robotics.cc" },
  ],
};

function extractPaths(filePath) {
  const text = readFileSync(filePath, "utf8");
  const paths = [];
  for (const m of text.matchAll(/path:\s*"([^"]+)"/g)) {
    paths.push(m[1]);
  }
  return paths;
}

function isToolchainUrl(url) {
  return url.includes("toolchain.d-robotics.cc");
}

async function headOk(url) {
  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (isToolchainUrl(url)) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    return res.ok ? "ok" : String(res.status);
  } catch (e) {
    return e.cause?.code || e.message || "error";
  } finally {
    if (isToolchainUrl(url)) {
      if (prevTls === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevTls;
    }
  }
}

const concurrency = 8;
async function mapPool(items, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

const files = readdirSync(dataDir).filter((f) => f.startsWith("manualChapterIndex") && f.endsWith(".js"));

let total = 0;
let failed = 0;
const failures = [];

for (const file of files.sort()) {
  const bases = SITE_BASES[file];
  if (!bases) continue;
  const paths = [...new Set(extractPaths(join(dataDir, file)))];
  for (const { label, base } of bases) {
    const checks = paths.map((path) => ({
      file,
      label,
      path,
      url: `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`,
    }));
    total += checks.length;
    const results = await mapPool(checks, async (c) => {
      const status = await headOk(c.url);
      return { ...c, status };
    });
    for (const r of results) {
      if (r.status !== "ok") {
        failed++;
        failures.push(r);
      }
    }
    const ok = results.filter((r) => r.status === "ok").length;
    console.log(`${label} (${file}): ${ok}/${results.length} OK`);
  }
}

console.log(`\n总计: ${total - failed}/${total} 可访问`);
if (failures.length) {
  console.log(`\n不可访问 (${failures.length}):`);
  for (const f of failures) {
    console.log(`  [${f.label}] ${f.path} -> ${f.status}\n    ${f.url}`);
  }
  process.exit(1);
}
