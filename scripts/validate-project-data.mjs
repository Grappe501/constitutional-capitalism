import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { ROOT, r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);

let Ajv2020;
try {
  Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");
} catch {
  console.error("[FAIL] ajv not installed. Run pnpm install first.");
  process.exit(1);
}

const errors = [];
function fail(msg) {
  errors.push(msg);
  console.error("[FAIL]", msg);
}
function ok(msg) {
  console.log("[OK]", msg);
}

const ajv = new Ajv2020({ allErrors: true, strict: false });

const validations = [
  ["data/project/book_identity.json", "schemas/book_identity.schema.json"],
  ["data/manuscript/book_structure.json", "schemas/book_structure.schema.json"],
  ["data/metrics/progress_layers.json", "schemas/progress_layers.schema.json"],
  ["data/research/claim_ledger.json", "schemas/claim_ledger.schema.json"],
  ["data/research/source_registry.json", "schemas/source_registry.schema.json"],
  ["data/project/policy_proposals.json", "schemas/policy_proposals.schema.json"],
  ["data/decisions/decisions.json", "schemas/decisions.schema.json"],
  ["data/project/risk_register.json", "schemas/risk_register.schema.json"],
  ["data/deployments/deployment_status.json", "schemas/deployment_status.schema.json"],
  ["data/project/phases.json", "schemas/phases.schema.json"],
  ["data/project/constitutional_articles.json", "schemas/constitutional_articles.schema.json"],
  ["data/project/latest_cursor_return.json", "schemas/build_report.schema.json"],
];

for (const [dataRel, schemaRel] of validations) {
  const dataPath = r(dataRel);
  const schemaPath = r(schemaRel);
  if (!fs.existsSync(dataPath)) {
    fail(`Missing data file: ${dataRel}`);
    continue;
  }
  if (!fs.existsSync(schemaPath)) {
    fail(`Missing schema: ${schemaRel}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    fail(`${dataRel} failed schema validation`);
    for (const e of validate.errors || []) {
      console.error(`  - ${e.instancePath || "/"} ${e.message}`);
    }
  } else {
    ok(`${dataRel}`);
  }
}

// Structural sanity
const required = [
  "data/project/principles.json",
  "data/project/policy_pillars.json",
  "data/project/open_questions.json",
  "data/project/objections.json",
  "data/project/terms_to_define.json",
  "data/project/slice_queue.json",
  "data/project/current_build_state.json",
  "data/research/research_questions.json",
  "data/research/fact_check_queue.json",
  "data/research/expert_review_queue.json",
  "data/metrics/project_milestones.json",
  "data/metrics/build_history.json",
  "data/metrics/validation_history.json",
];

for (const rel of required) {
  if (!fs.existsSync(r(rel))) fail(`Missing required data: ${rel}`);
  else {
    JSON.parse(fs.readFileSync(r(rel), "utf8"));
    ok(`parse ${rel}`);
  }
}

const decisions = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
if ((decisions.decisions || []).length < 10) {
  fail("Expected at least 10 seeded decisions");
}

const risks = JSON.parse(fs.readFileSync(r("data/project/risk_register.json"), "utf8"));
if ((risks.risks || []).length < 15) {
  fail("Expected at least 15 seeded risks");
}

const phases = JSON.parse(fs.readFileSync(r("data/project/phases.json"), "utf8"));
if ((phases.phases || []).length !== 10) {
  fail("Expected phases 0–9 (10 total)");
}

console.log("");
console.log(`Project data validation: ${errors.length ? "FAILED" : "PASSED"}`);
if (errors.length) process.exit(1);
