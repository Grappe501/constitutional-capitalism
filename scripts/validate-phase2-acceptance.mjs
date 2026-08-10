import fs from "node:fs";
import { createRequire } from "node:module";
import { r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");

const errors = [];
const warnings = [];
const fail = (msg) => {
  errors.push(msg);
  console.error("[FAIL]", msg);
};
const warn = (msg) => {
  warnings.push(msg);
  console.warn("[WARN]", msg);
};
const ok = (msg) => console.log("[OK]", msg);

const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const governance = JSON.parse(
  fs.readFileSync(r("data/project/forensic_audit_governance.json"), "utf8")
);
const missionLock = JSON.parse(
  fs.readFileSync(r("data/project/phase2_mission_lock.json"), "utf8")
);
const baselineStatus = JSON.parse(
  fs.readFileSync(r("data/baseline/baseline_status.json"), "utf8")
);
const snapshot = JSON.parse(
  fs.readFileSync(r("data/metrics/progress_snapshot.json"), "utf8")
);
const deployments = JSON.parse(
  fs.readFileSync(r("data/deployments/deployment_status.json"), "utf8")
);

const ajv = new Ajv2020({ allErrors: true, strict: false });
for (const [dataRel, schemaRel] of [
  ["data/project/phase2_acceptance_checklist.json", "schemas/phase2_acceptance_checklist.schema.json"],
  ["data/project/forensic_audit_governance.json", "schemas/forensic_audit_governance.schema.json"],
]) {
  const validate = ajv.compile(JSON.parse(fs.readFileSync(r(schemaRel), "utf8")));
  const data = JSON.parse(fs.readFileSync(r(dataRel), "utf8"));
  if (!validate(data)) {
    fail(`${dataRel} failed schema`);
    for (const e of validate.errors || []) console.error(" ", e.message);
  } else ok(`${dataRel} schema valid`);
}

if (checklist.status !== "governing") fail("acceptance checklist must be governing");
if (governance.status !== "governing") fail("forensic audit governance must be governing");
if (checklist.phase_2_status !== "PARTIAL" && checklist.phase_2_declared_complete !== true) {
  fail("phase_2_status must be PARTIAL unless declared complete");
}
if (missionLock.official_active_state?.phase_2_status !== "PARTIAL") {
  warn("mission lock phase_2_status is not PARTIAL — reconcile with checklist");
}

// Baseline 86 reconciliation
if (baselineStatus.total_metrics !== 86) {
  fail(`baseline_status.total_metrics must be 86, found ${baselineStatus.total_metrics}`);
} else ok("baseline denominator is 86");
if (baselineStatus.sourced_metrics !== 14) {
  warn(
    `sourced_metrics is ${baselineStatus.sourced_metrics} (canonical operating snapshot expected 14 after baseline subset expansion)`
  );
} else ok("baseline sourced count remains 14/86");

const stale38Paths = [
  "data/project/slice_queue.json",
  "content/research/national-diagnosis/00-overview.md",
  "content/research/national-diagnosis/20-conclusions-and-open-questions.md",
  "reports/CC_PHASE_2_DIAGNOSIS_RESEARCH_FOUNDATION_1_0_RETURN.md",
];
for (const rel of stale38Paths) {
  if (!fs.existsSync(r(rel))) continue;
  const body = fs.readFileSync(r(rel), "utf8");
  if (/\b2\/38\b|\b38 metrics\b|\bof 38 baseline\b|\b36 of 38\b/.test(body)) {
    fail(`${rel} still contains stale 38-metric baseline narrative`);
  }
}
ok("checked key paths for stale 38-metric baseline narratives");

// Modeling / legal honesty
const byId = Object.fromEntries((snapshot.layers || []).map((l) => [l.id, l]));
if ((byId.economic_modeling?.percent ?? 0) !== 0) {
  fail("economic_modeling must remain 0% unless actual modeling occurs");
} else ok("economic modeling remains 0%");
if ((byId.legal_review?.percent ?? 0) !== 0) {
  fail("legal_review must remain 0% unless actual legal review occurs");
} else ok("legal review remains 0%");

// Three-layer brief presence
const LAYER_A = "What the data directly establishes";
const LAYER_B = "What may reasonably be inferred";
const LAYER_C = "What Constitutional Capitalism normatively concludes";
const diagnosisDir = r("content/research/national-diagnosis");
const priorityFiles = (checklist.priority_domains || []).flatMap((d) => d.brief_files || []);
let priorityWithLayers = 0;
const missingLayers = [];
for (const file of priorityFiles) {
  const p = `${diagnosisDir}/${file}`;
  if (!fs.existsSync(p)) {
    missingLayers.push(`${file} (missing file)`);
    continue;
  }
  const body = fs.readFileSync(p, "utf8");
  const has =
    body.includes(LAYER_A) && body.includes(LAYER_B) && body.includes(LAYER_C);
  if (has) priorityWithLayers += 1;
  else missingLayers.push(file);
}
console.log(
  `[INFO] Priority briefs with three-layer sections: ${priorityWithLayers}/${priorityFiles.length}`
);
if (missingLayers.length) {
  warn(
    `Three-layer retrofit still open for: ${missingLayers.slice(0, 12).join(", ")}${
      missingLayers.length > 12 ? "…" : ""
    }`
  );
}

// Deployment freshness (report only — do not invent live verification)
const staleDeploy = (deployments.applications || []).filter(
  (a) => a.last_known_commit && a.last_known_commit !== "verified_pending"
);
if (staleDeploy.length) {
  warn(
    `Deployment registry commits not verified against current production: ${staleDeploy
      .map((a) => `${a.id}:${a.last_known_commit}`)
      .join(", ")}`
  );
}

// False completion guard
const openRequired = (checklist.gate_items || []).filter(
  (g) => g.required && g.status !== "passed" && g.status !== "complete"
);
if (checklist.phase_2_declared_complete === true) {
  if (openRequired.length) {
    fail(
      `phase_2_declared_complete is true but ${openRequired.length} required gate items are not passed`
    );
  }
  if (priorityWithLayers < priorityFiles.length) {
    fail("cannot declare Phase 2 complete while priority briefs lack three-layer sections");
  }
} else {
  ok("Phase 2 is not falsely declared complete");
}

if (checklist.phase_2_status === "COMPLETE" && checklist.phase_2_declared_complete !== true) {
  fail("phase_2_status COMPLETE requires phase_2_declared_complete true");
}

console.log("");
console.log(`Phase 2 acceptance validation: ${errors.length ? "FAILED" : "PASSED"}`);
console.log(
  `  Gate items open: ${openRequired.length}/${(checklist.gate_items || []).length} required`
);
console.log(`  Warnings: ${warnings.length}`);
console.log(`  Overall snapshot: ${snapshot.overall_percent}% (not a completion claim)`);
console.log(`  Forensic audit overall snapshot: ${checklist.canonical_operating_state?.forensic_audit_overall_snapshot}%`);
if (errors.length) process.exit(1);
