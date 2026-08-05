import fs from "node:fs";
import { createRequire } from "node:module";
import { r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");
const ajv = new Ajv2020({ allErrors: true, strict: false });
const errors = [];
const fail = (m) => { errors.push(m); console.error("[FAIL]", m); };
const ok = (m) => console.log("[OK]", m);

const pairs = [
  ["data/research/claim_ledger.json", "schemas/claim_ledger.schema.json"],
  ["data/research/source_registry.json", "schemas/source_registry.schema.json"],
  ["data/project/developing_doctrine.json", "schemas/developing_doctrine.schema.json"],
  ["data/project/transition_timeline.json", "schemas/transition_timeline.schema.json"],
];

for (const [dataRel, schemaRel] of pairs) {
  if (!fs.existsSync(r(dataRel))) { fail(`Missing ${dataRel}`); continue; }
  if (!fs.existsSync(r(schemaRel))) { fail(`Missing ${schemaRel}`); continue; }
  const validate = ajv.compile(JSON.parse(fs.readFileSync(r(schemaRel), "utf8")));
  if (!validate(JSON.parse(fs.readFileSync(r(dataRel), "utf8")))) {
    fail(`${dataRel} failed schema`);
    (validate.errors ?? []).forEach((e) => console.error(`  - ${e.instancePath} ${e.message}`));
  } else ok(dataRel);
}

const sources = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources || [];
const claims = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8")).claims || [];
const sourceIds = new Set(sources.map((s) => s.source_id));
for (const c of claims) {
  for (const sid of c.source_ids || []) {
    if (!sourceIds.has(sid)) fail(`Claim ${c.claim_id} references missing source ${sid}`);
  }
}

const diagnosisDir = r("content/research/national-diagnosis");
if (!fs.existsSync(diagnosisDir)) fail("Missing national-diagnosis directory");
else {
  const files = fs.readdirSync(diagnosisDir).filter((f) => f.endsWith(".md"));
  if (files.length < 21) fail(`Expected >=21 diagnosis briefs, found ${files.length}`);
  else ok(`diagnosis briefs ${files.length}`);
}

ok(`sources registered: ${sources.length}`);
ok(`claims: ${claims.length}`);
console.log(`Research validation: ${errors.length ? "FAILED" : "PASSED"}`);
if (errors.length) process.exit(1);
