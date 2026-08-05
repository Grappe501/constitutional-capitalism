import fs from "node:fs";
import { createRequire } from "node:module";
import { r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");
const ajv = new Ajv2020({ allErrors: true, strict: false });
const errors = [];
const fail = (m) => { errors.push(m); console.error("[FAIL]", m); };
const ok = (m) => console.log("[OK]", m);

const dataRel = "data/baseline/national_baseline_metrics.json";
const schemaRel = "schemas/national_baseline_metrics.schema.json";
if (!fs.existsSync(r(dataRel))) fail(`Missing ${dataRel}`);
else if (!fs.existsSync(r(schemaRel))) fail(`Missing ${schemaRel}`);
else {
  const validate = ajv.compile(JSON.parse(fs.readFileSync(r(schemaRel), "utf8")));
  const data = JSON.parse(fs.readFileSync(r(dataRel), "utf8"));
  if (!validate(data)) {
    fail(`${dataRel} failed schema`);
    (validate.errors ?? []).forEach((e) => console.error(`  - ${e.instancePath} ${e.message}`));
  } else ok(dataRel);

  let sourced = 0;
  for (const m of data.metrics || []) {
    if (m.current_value != null && (!m.source_ids || !m.source_ids.length)) {
      fail(`Metric ${m.metric_id} has value without source_ids`);
    }
    if (m.current_value != null && m.source_ids?.length) sourced += 1;
  }
  ok(`sourced metrics: ${sourced} / ${(data.metrics || []).length}`);
}

for (const rel of [
  "data/baseline/baseline_source_map.json",
  "data/baseline/baseline_methodology.json",
  "data/baseline/baseline_status.json",
  "data/testing/test_framework.json",
  "data/testing/pilot_registry.json",
]) {
  try {
    JSON.parse(fs.readFileSync(r(rel), "utf8"));
    ok(`parse ${rel}`);
  } catch {
    fail(`Missing or invalid ${rel}`);
  }
}

console.log(`Baseline/testing validation: ${errors.length ? "FAILED" : "PASSED"}`);
if (errors.length) process.exit(1);
