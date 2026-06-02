import fs from "fs";

const files = [
  "src/data/manualChapterIndex.js",
  "src/data/manualChapterIndexRdkS.js",
  "src/data/manualChapterIndexTros.js",
  "src/data/manualChapterIndexMagicbox.js",
  "src/data/manualChapterIndexOe.js",
  "src/data/manualChapterIndexStudio.js",
];

const issues = [];

for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const re = /path:\s*["']([^"']+)["'][\s\S]*?zh:\s*\{([\s\S]*?)\n\s*\},\s*\n\s*en:/g;
  let m;
  while ((m = re.exec(text))) {
    const path = m[1];
    const block = m[2];
    const title = block.match(/title:\s*["']([^"']+)["']/);
    const summary = block.match(/summary:\s*\n?\s*["']([^"']+)["']/);
    const parent = block.match(/parent:\s*(null|["']([^"']*)["'])/);
    const kw = block.match(/keywords:\s*\[([^\]]*)\]/);
    if (!kw) continue;
    const keywords = [...kw[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
    const corpus = [title?.[1], parent?.[2], summary?.[1]].filter(Boolean).join(" ").toLowerCase();
    for (const k of keywords) {
      const kl = k.toLowerCase();
      const ok =
        corpus.includes(kl) ||
        (kl.endsWith("问题") && corpus.includes(kl.slice(0, -2))) ||
        corpus.split(/\s+/).some((w) => w.includes(kl) || kl.includes(w));
      if (!ok) {
        issues.push({ f, path, title: title?.[1], keyword: k });
      }
    }
  }
}

console.log(`Issues: ${issues.length}`);
for (const i of issues) {
  console.log(`${i.f.split("/").pop()}\t${i.path}\t${i.keyword}\t${i.title}`);
}
