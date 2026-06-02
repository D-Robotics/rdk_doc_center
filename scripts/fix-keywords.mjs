/**
 * 校验 keywords 是否出现在 title / parent / summary 中；移除不匹配的项。
 * 用法: node scripts/fix-keywords.mjs [--dry-run]
 */
import fs from "fs";

const files = [
  "src/data/manualChapterIndex.js",
  "src/data/manualChapterIndexRdkS.js",
  "src/data/manualChapterIndexTros.js",
  "src/data/manualChapterIndexMagicbox.js",
  "src/data/manualChapterIndexOe.js",
  "src/data/manualChapterIndexStudio.js",
];

const dryRun = process.argv.includes("--dry-run");

function keywordInCorpus(keyword, corpus) {
  const kl = keyword.toLowerCase();
  const cl = corpus.toLowerCase();
  if (cl.includes(kl)) return true;
  // 「烧录问题」类：corpus 含「烧录」即可
  if (kl.endsWith("问题") && cl.includes(kl.slice(0, -2))) return true;
  return false;
}

function fixKeywordsLine(line, corpus) {
  const m = line.match(/^(\s*keywords:\s*)\[(.*)\](,?)\s*$/);
  if (!m) return { line, changed: false };
  const keywords = [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const kept = keywords.filter((k) => keywordInCorpus(k, corpus));
  if (kept.length === keywords.length) return { line, changed: false };
  const newLine = `${m[1]}[${kept.map((k) => `"${k}"`).join(", ")}]${m[3]}`;
  return { line: newLine, changed: true, removed: keywords.filter((k) => !kept.includes(k)) };
}

function fixFile(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  let corpus = "";
  let removed = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const titleM = line.match(/^\s*title:\s*"(.*)",?\s*$/);
    if (titleM) {
      corpus = titleM[1];
      continue;
    }

    const parentM = line.match(/^\s*parent:\s*"(.*)",?\s*$/);
    if (parentM) {
      corpus += " " + parentM[1];
      continue;
    }

    if (line.match(/^\s*parent:\s*null,?\s*$/)) continue;

    const summaryM = line.match(/^\s*summary:\s*"(.*)",?\s*$/);
    if (summaryM) {
      corpus += " " + summaryM[1];
      continue;
    }

    if (line.match(/^\s*summary:\s*$/)) {
      const next = lines[i + 1]?.match(/^\s*"(.*)",?\s*$/);
      if (next) corpus += " " + next[1];
      continue;
    }

    if (line.match(/^\s*keywords:\s*\[/)) {
      const { line: newLine, changed, removed: r } = fixKeywordsLine(line, corpus);
      if (changed) {
        if (r?.length) {
          console.log(`${filePath}: removed [${r.join(", ")}] from: ${corpus.slice(0, 60)}...`);
        }
        lines[i] = newLine;
        removed += r?.length || 0;
      }
      corpus = "";
    }

    if (line.match(/^\s*\},\s*$/) && lines[i + 1]?.match(/^\s*(en:|path:)/)) {
      corpus = "";
    }
  }

  if (removed && !dryRun) {
    fs.writeFileSync(filePath, lines.join("\n"));
  }
  return removed;
}

let total = 0;
for (const f of files) {
  total += fixFile(f);
}
console.log(dryRun ? `[dry-run] Would remove ${total} invalid keywords` : `Removed ${total} invalid keywords`);
