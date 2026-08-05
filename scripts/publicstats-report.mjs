import fs from "node:fs";
import { r } from "./lib/paths.mjs";

const importDir = r("data/imports/reddirt-public-statistics");
const manifest = JSON.parse(fs.readFileSync(`${importDir}/manifest.json`, "utf8"));
const validation = JSON.parse(fs.readFileSync(`${importDir}/import-validation.json`, "utf8"));
const national = JSON.parse(fs.readFileSync(`${importDir}/national-baseline.json`, "utf8"));
const arkansas = JSON.parse(fs.readFileSync(`${importDir}/arkansas-baseline.json`, "utf8"));

const report = {
  mission: "CC-PHASE-2-PUBLIC-STATISTICS-BRIDGE-1.0 / RCIP-PHASE-1 consumer",
  export_id: manifest.export_id,
  validation_status: manifest.validation_status,
  observation_count: manifest.observation_count ?? 0,
  series_count: manifest.series_count ?? 0,
  reddirt_commit: manifest.reddirt_commit ?? null,
  import_commit: manifest.constitutional_capitalism_import_commit ?? null,
  national_metrics: Array.isArray(national.metrics) ? national.metrics.length : 0,
  arkansas_metrics: Array.isArray(arkansas.metrics) ? arkansas.metrics.length : 0,
  import_validation_status: validation.status,
  baseline_note: "Canonical baseline remains 86 metrics; sourced count rises only after mapped import approval.",
  checks: validation.checks || [],
};

const out = r("reports/publicstats-import-report.json");
fs.mkdirSync(r("reports"), { recursive: true });
fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(JSON.stringify(report, null, 2));
console.log("[OK] wrote", out);
