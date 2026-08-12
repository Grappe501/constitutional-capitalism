/**
 * Import a validated RedDirt public-statistics export into
 * data/imports/reddirt-public-statistics/
 *
 * Usage:
 *   pnpm publicstats:import --from H:\SOSWebsite\RedDirt\exports\constitutional-capitalism\latest
 *
 * Does not update the 86-metric baseline. Mapping is a separate approved step
 * only after observations_present and provenance checks pass.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { r } from "./lib/paths.mjs";

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i < 0) return null;
  return process.argv[i + 1] || null;
}

const from =
  argValue("--from") ||
  process.env.RCIP_EXPORT_PATH ||
  "H:\\SOSWebsite\\RedDirt\\exports\\constitutional-capitalism\\latest";

const dest = r("data/imports/reddirt-public-statistics");
const required = [
  "manifest.json",
  "national-baseline.json",
  "arkansas-baseline.json",
  "county-baselines.json",
  "series-metadata.json",
  "source-registry.json",
  "source-citations.json",
  "cross-check-results.json",
  "limitations.json",
  "validation-report.json",
];
/** Optional Pass 6+ multi-period arrays — included in checksum when present in export. */
const optional = ["series-arrays.json"];

const PROHIBITED = [
  /email/i,
  /phone/i,
  /voter/i,
  /donor/i,
  /volunteer/i,
  /gmail/i,
  /calendar/i,
  /api_?key/i,
  /token/i,
  /secret/i,
  /campaign/i,
];

function fail(msg) {
  console.error("[FAIL]", msg);
  process.exit(1);
}

function gitShort() {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: r("."), encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

if (!fs.existsSync(from)) fail(`Export path not found: ${from}`);

for (const file of required) {
  const p = path.join(from, file);
  if (!fs.existsSync(p)) fail(`Missing export file: ${file}`);
}

const files = {};
for (const file of required) {
  files[file] = JSON.parse(fs.readFileSync(path.join(from, file), "utf8"));
}
for (const file of optional) {
  const p = path.join(from, file);
  if (fs.existsSync(p)) {
    files[file] = JSON.parse(fs.readFileSync(p, "utf8"));
  }
}

const manifest = files["manifest.json"];
if (manifest.contract_version !== "1.0") {
  fail(`Unsupported contract_version: ${manifest.contract_version}`);
}
if (manifest.contains_private_data === true) fail("Export attests private data");
if ((manifest.observation_count || 0) < 1) {
  fail("Export has zero observations — refusing import (fail-closed)");
}

function scan(node, trail) {
  if (node == null) return;
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (PROHIBITED.some((re) => re.test(k)) && k !== "contains_private_data") {
        fail(`Prohibited field ${trail}.${k}`);
      }
      scan(v, `${trail}.${k}`);
    }
  }
}
for (const [name, payload] of Object.entries(files)) scan(payload, name);

const ordered = Object.keys(files)
  .filter((f) => f !== "manifest.json")
  .sort()
  .map((f) => JSON.stringify(files[f]));
const checksum = crypto.createHash("sha256").update(ordered.join("\n"), "utf8").digest("hex");
if (manifest.checksum && manifest.checksum !== checksum) {
  fail(`Checksum mismatch: manifest=${manifest.checksum} computed=${checksum}`);
}

fs.mkdirSync(dest, { recursive: true });
for (const file of Object.keys(files)) {
  if (file === "manifest.json") continue;
  fs.writeFileSync(path.join(dest, file), JSON.stringify(files[file], null, 2) + "\n", "utf8");
}

const ccManifest = {
  export_id: manifest.export_id,
  generated_at: manifest.generated_at,
  source_database: "RedDirt public_statistics / file warehouse export",
  source_agencies: manifest.source_agencies || [],
  dataset_versions: manifest.dataset_versions || [],
  series_count: manifest.series_count || 0,
  observation_count: manifest.observation_count || 0,
  minimum_period: manifest.minimum_reference_period ?? null,
  maximum_period: manifest.maximum_reference_period ?? null,
  validation_status: manifest.validation_status === "passed" ? "passed" : "pending",
  contract_version: manifest.contract_version,
  reddirt_commit: manifest.generator_commit || null,
  constitutional_capitalism_import_commit: gitShort(),
  git_commit: gitShort(),
  boundary_attestation: {
    contains_campaign_data: false,
    contains_personal_data: false,
    contains_api_keys: false,
    public_statistics_only: true,
  },
  series_arrays_present: Boolean(files["series-arrays.json"]),
  note: "Imported from RedDirt validated export. Baseline mapping requires separate approval after publicstats:validate. Pass 6 series-arrays bind to evidence systems separately — not automatic baseline promotion.",
};

fs.writeFileSync(path.join(dest, "manifest.json"), JSON.stringify(ccManifest, null, 2) + "\n", "utf8");

const importValidation = {
  export_id: manifest.export_id,
  status: "imported_awaiting_baseline_map",
  reddirt_generator_commit: manifest.generator_commit || null,
  constitutional_capitalism_import_commit: gitShort(),
  contract_version: manifest.contract_version,
  checks: [
    { id: "no_api_keys", passed: true, detail: "No credential fields detected" },
    { id: "no_campaign_fields", passed: true, detail: "Privacy field scan passed" },
    {
      id: "observations_present",
      passed: true,
      detail: `${manifest.observation_count} observations in export`,
    },
    {
      id: "baseline_lineage",
      passed: false,
      detail: "Baseline not auto-updated — map only approved metrics in a follow-on step",
    },
  ],
};

fs.writeFileSync(
  path.join(dest, "import-validation.json"),
  JSON.stringify(importValidation, null, 2) + "\n",
  "utf8"
);

console.log("[OK] imported export", manifest.export_id, "→", dest);
console.log("[OK] baseline unchanged (still requires explicit mapping step)");
