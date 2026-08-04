import fs from "node:fs";
import { createRequire } from "node:module";
import { r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");

const snapshot = JSON.parse(fs.readFileSync(r("data/metrics/progress_snapshot.json"), "utf8"));
const layersSchema = JSON.parse(fs.readFileSync(r("schemas/progress_layers.schema.json"), "utf8"));

const errors = [];
function fail(msg) {
  errors.push(msg);
  console.error("[FAIL]", msg);
}
function ok(msg) {
  console.log("[OK]", msg);
}

if (!snapshot.generated_at) fail("progress_snapshot.generated_at missing — run progress:generate");
if (typeof snapshot.overall_percent !== "number") fail("overall_percent must be a number");
if (snapshot.overall_percent < 0 || snapshot.overall_percent > 100) fail("overall_percent out of range");
if (!Array.isArray(snapshot.layers) || snapshot.layers.length < 10) {
  fail("progress snapshot must include progress layers");
}

// Honesty checks for Phase 0
const byId = Object.fromEntries(snapshot.layers.map((l) => [l.id, l]));
if (byId.manuscript && byId.manuscript.percent > 15) {
  fail("Manuscript progress falsely inflated for Phase 0 (>15%)");
} else {
  ok("Manuscript progress remains appropriately low");
}
if (byId.source_verification && byId.source_verification.percent > 5) {
  fail("Source verification progress inflated without sources");
} else {
  ok("Source verification progress honest");
}
if (byId.legal_review && byId.legal_review.percent > 5) {
  fail("Legal review progress inflated");
} else {
  ok("Legal review progress honest");
}
if (byId.book_architecture && byId.book_architecture.percent < 70) {
  fail("Book architecture should be substantially complete after Phase 0 scaffold");
} else {
  ok("Book architecture progress present");
}

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(layersSchema);
const layerDoc = {
  version: snapshot.version || "0.1.0",
  layers: snapshot.layers,
};
if (!validate(layerDoc)) {
  fail("Snapshot layers failed schema");
  for (const e of validate.errors || []) console.error(" ", e.message);
} else {
  ok("Snapshot layers schema valid");
}

console.log("");
console.log(`Progress snapshot validation: ${errors.length ? "FAILED" : "PASSED"}`);
if (errors.length) process.exit(1);
