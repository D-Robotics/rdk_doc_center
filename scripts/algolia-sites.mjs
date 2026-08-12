/**
 * Load crawl targets from src/data/algoliaSites.js via jiti (Docusaurus src is ESM-in-.js).
 */
import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const jiti = require("jiti")(fileURLToPath(import.meta.url), {
  interopDefault: true,
  esmResolve: true,
});

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mod = jiti(join(root, "src/data/algoliaSites.js"));

export const ALGOLIA_INDEX_NAME_DEFAULT =
  mod.ALGOLIA_INDEX_NAME_DEFAULT || "rdk_doc_center";
export const getAlgoliaCrawlTargets = mod.getAlgoliaCrawlTargets;
