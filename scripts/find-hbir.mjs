process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const html = await fetch("https://toolchain.d-robotics.cc/guide/doc_introduction.html").then((r) => r.text());
const re = /href=["']([^"']*hbir[^"']*)["']/gi;
const s = new Set();
let m;
while ((m = re.exec(html))) s.add(m[1]);
console.log([...s].join("\n") || "none in intro");
for (const p of ["/guide/appendix/hbir_op.html", "/guide/appendix/HBIR_Operator.html"]) {
  const r = await fetch(`https://toolchain.d-robotics.cc${p}`, { method: "HEAD" });
  console.log(r.status, p);
}
