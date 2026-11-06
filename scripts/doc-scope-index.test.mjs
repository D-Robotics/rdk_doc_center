import assert from "node:assert/strict";
import test from "node:test";
import * as cheerio from "cheerio";
import {
  pathAllowsProduct,
  productsMatch,
  removeOutOfScope,
  scopeVisible,
  stampScopeUrl,
  versionsMatch,
} from "./doc-scope-index.mjs";
import { getAlgoliaCrawlTargets } from "./algolia-sites.mjs";
import {
  dedupeHits,
  mergeSSeriesHits,
  sSeriesFilter,
  sSeriesPins,
  zipByTitleMatch,
} from "../src/utils/sSeriesSearch.mjs";

const HTML = `
<article>
  <div class="theme-doc-markdown">
    <h1>1.6 资源汇总</h1>
    <div class="doc-scope" data-scope-products="RDK S100" data-doc-scope='{"versions":[],"products":["RDK S100"]}'>
      <h2 id="认证资料">认证资料</h2>
    </div>
    <div class="doc-scope" data-doc-scope='{"versions":[{"operator":"","version":"5.1.0"}],"products":["RDK S600"]}'>
      <h2 id="s600-510">系统软件</h2>
    </div>
    <div class="doc-scope" data-doc-scope='{"versions":[{"operator":"","version":"5.1.1"}],"products":["RDK S600"]}'>
      <h2 id="s600-511">系统软件</h2>
    </div>
    <h2 id="shared">共用说明</h2>
  </div>
</article>
`;

function headings(product, version) {
  const $ = cheerio.load(HTML);
  const root = $(".theme-doc-markdown");
  removeOutOfScope($, root, product, version);
  return root
    .find("h2")
    .toArray()
    .map((el) => $(el).attr("id"));
}

test("S600 5.1.1 drops the S100 certification chapter and the other S600 version", () => {
  assert.deepEqual(headings("RDK S600", "5.1.1"), ["s600-511", "shared"]);
});

test("S100 keeps its certification chapter", () => {
  assert.deepEqual(headings("RDK S100", "4.0.5"), ["认证资料", "shared"]);
});

test("product series and version rules", () => {
  assert.equal(productsMatch(["RDK-X5"], "RDK X5 Module"), true);
  assert.equal(productsMatch(["RDK-X5"], "RDK X3"), false);
  assert.equal(productsMatch(["RDK S100"], "RDK S600"), false);
  assert.equal(versionsMatch([{ operator: "", version: "5.1.1" }], "5.1.0"), false);
  assert.equal(versionsMatch([{ operator: ">=", version: "5.1.0" }], "5.1.1"), true);
  assert.equal(
    scopeVisible(
      "RDK S100",
      '{"versions":[],"products":["RDK S100"]}',
      "RDK S600",
      "5.1.1",
    ),
    false,
  );
});

test("product folders stay on their own manual", () => {
  assert.equal(
    pathAllowsProduct("/rdk_s_doc/Quick_start/hardware_introduction/rdk_s100/kit", "RDK S600"),
    false,
  );
  assert.equal(
    pathAllowsProduct("/rdk_x_doc/Advanced_development/rdk_x5_module/accessory", "RDK X5"),
    false,
  );
  assert.equal(
    pathAllowsProduct("/rdk_s_doc/Quick_start/download", "RDK S600"),
    true,
  );
});

test("scoped url keeps the manual product and version", () => {
  assert.equal(
    stampScopeUrl("https://developer.d-robotics.cc/rdk_s_doc/Quick_start/download", "RDK S100", "4.0.5"),
    "https://developer.d-robotics.cc/rdk_s_doc/Quick_start/download?p=RDK+S100&v=4.0.5",
  );
});

test("S100 and S600 are separate crawl targets", () => {
  const targets = getAlgoliaCrawlTargets().filter((target) => target.site === "rdk_s_doc");
  const titles = targets.map((target) => `${target.manualTitle.zh} ${target.version}`).sort();
  assert.deepEqual(titles, ["RDK S100 4.0.5", "RDK S600 5.1.1"]);
});

test("search replaces collapsed S600 hits with the scoped manual hits", () => {
  const federated = [
    { site: "rdk_studio_doc", manualTitle: "RDK Studio", url: "https://developer.d-robotics.cc/rdk_studio_doc/auth" },
    {
      site: "rdk_s_doc",
      manualTitle: "RDK S600",
      url: "https://developer.d-robotics.cc/rdk_s_doc/Quick_start/download#认证资料",
    },
    {
      site: "rdk_s_doc",
      manualTitle: "RDK S600",
      url: "https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?p=RDK+S600&v=5.1.0",
    },
  ];
  const scoped = [
    {
      site: "rdk_s_doc",
      manualTitle: "RDK S100",
      product: "RDK S100",
      url: "https://developer.d-robotics.cc/rdk_s_doc/Quick_start/download?p=RDK+S100&v=4.0.5#认证资料",
    },
    {
      site: "rdk_s_doc",
      manualTitle: "RDK S600",
      product: "RDK S600",
      url: "https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?p=RDK+S600&v=5.1.1",
    },
  ];
  const merged = mergeSSeriesHits(federated, scoped);
  assert.deepEqual(
    merged.map((hit) => hit.manualTitle),
    ["RDK Studio", "RDK S100", "RDK S600"],
  );
  assert.equal(merged.some((hit) => hit.url.includes("#认证资料") && hit.manualTitle === "RDK S600"), false);
});

test("same chapter in two versions collapses to one hit", () => {
  const hits = dedupeHits([
    {
      manualTitle: "RDK S600",
      url: "https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?p=RDK+S600&v=5.1.1#认证",
    },
    {
      manualTitle: "RDK S600",
      url: "https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?p=RDK+S600&v=5.1.0#认证",
    },
  ]);
  assert.equal(hits.length, 1);
});

test("title match leads the zipped product lists", () => {
  const zipped = zipByTitleMatch(
    [
      [{ hierarchy: { lvl1: "配件清单" } }],
      [{ hierarchy: { lvl2: "认证资料" } }],
    ],
    "认证",
  );
  assert.equal(zipped[0].hierarchy.lvl2, "认证资料");
});

test("latest S series pins become separate filters", () => {
  const pins = sSeriesPins({
    "RDK S600": { site: "s", version: "5.1.1" },
    "RDK S100": { site: "s", version: "4.0.5" },
    "RDK X5": { site: "x", version: "3.5.0" },
  });
  assert.equal(pins.length, 2);
  assert.match(sSeriesFilter("zh-Hans", pins[0]), /product:"RDK S600"/);
  assert.match(sSeriesFilter("zh-Hans", pins[0]), /rdk_version:5\.1\.1/);
});
