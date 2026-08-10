import fs from "node:fs";
import path from "node:path";
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

const SECRET_VALUE_PATTERNS = [
  /bearer\s+[a-z0-9._\-]+/i,
  /sk_live_[a-z0-9]+/i,
  /-----BEGIN (RSA )?PRIVATE KEY-----/,
];
const CREDENTIAL_FIELD_NAMES = [
  "api_key",
  "apikey",
  "census_api_key",
  "bls_api_key",
  "secret",
  "password",
  "access_token",
  "private_key",
];
const FORBIDDEN_OPERATIONAL_FIELD_NAMES = [
  "donor",
  "donors",
  "volunteer",
  "volunteers",
  "campaign_contact",
  "constituent",
  "voter_file",
  "gmail",
  "calendar_event",
  "relationship_score",
  "political_targeting",
];
const ATTESTATION_ALLOWED_FIELDS = new Set([
  "contains_api_keys",
  "contains_campaign_data",
  "contains_personal_data",
  "public_statistics_only",
]);

const importDir = r("data/imports/reddirt-public-statistics");
const requiredFiles = [
  "manifest.json",
  "national-baseline.json",
  "arkansas-baseline.json",
  "county-baselines.json",
  "series-metadata.json",
  "source-citations.json",
  "import-validation.json",
];

if (!fs.existsSync(importDir)) fail("Missing import directory");
else ok("import directory present");

for (const file of requiredFiles) {
  const p = path.join(importDir, file);
  if (!fs.existsSync(p)) fail(`Missing import file: ${file}`);
  else ok(`present ${file}`);
}

const ajv = new Ajv2020({ allErrors: true, strict: false });
const bridgeSchema = JSON.parse(
  fs.readFileSync(r("schemas/public_statistics_bridge.schema.json"), "utf8")
);
const manifestSchema = JSON.parse(
  fs.readFileSync(r("schemas/public_statistics_import_manifest.schema.json"), "utf8")
);
const bridge = JSON.parse(fs.readFileSync(r("data/project/public_statistics_bridge.json"), "utf8"));

function pathJoinRead(name) {
  return JSON.parse(fs.readFileSync(path.join(importDir, name), "utf8"));
}
const manifest = pathJoinRead("manifest.json");

const validateBridge = ajv.compile(bridgeSchema);
if (!validateBridge(bridge)) {
  fail("public_statistics_bridge.json failed schema");
  for (const e of validateBridge.errors || []) console.error(" ", e.message);
} else ok("public_statistics_bridge schema valid");

const validateManifest = ajv.compile(manifestSchema);
if (!validateManifest(manifest)) {
  fail("manifest.json failed schema");
  for (const e of validateManifest.errors || []) console.error(" ", e.message);
} else ok("manifest schema valid");

const attestation = manifest.boundary_attestation || {};
if (attestation.contains_campaign_data === true) fail("manifest attests campaign data present");
if (attestation.contains_personal_data === true) fail("manifest attests personal data present");
if (attestation.contains_api_keys === true) fail("manifest attests API keys present");
if (attestation.public_statistics_only !== true) {
  fail("manifest must attest public_statistics_only=true");
} else ok("boundary attestation denies campaign/personal/keys");

function scanValue(value, trail) {
  if (value == null) return;
  if (typeof value === "string") {
    for (const re of SECRET_VALUE_PATTERNS) {
      if (re.test(value)) fail(`Possible secret pattern at ${trail}`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => scanValue(v, `${trail}[${i}]`));
    return;
  }
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      const lower = k.toLowerCase();
      if (FORBIDDEN_OPERATIONAL_FIELD_NAMES.some((f) => lower.includes(f))) {
        fail(`Forbidden operational field name "${k}" at ${trail}`);
      }
      if (CREDENTIAL_FIELD_NAMES.includes(lower) && !ATTESTATION_ALLOWED_FIELDS.has(lower)) {
        fail(`Forbidden credential field name "${k}" at ${trail}`);
      }
      // Attestation booleans may be named contains_api_keys, but values must stay boolean false/true only.
      if (lower === "contains_api_keys" && typeof v !== "boolean") {
        fail(`contains_api_keys must be boolean at ${trail}`);
      }
      scanValue(v, `${trail}.${k}`);
    }
  }
}

for (const file of requiredFiles) {
  const data = pathJoinRead(file);
  scanValue(data, file);
}
ok("import files scanned for secrets and operational fields");

const national = pathJoinRead("national-baseline.json");
const arkansas = pathJoinRead("arkansas-baseline.json");
const county = pathJoinRead("county-baselines.json");
function countImportedMetrics(payload) {
  if (Array.isArray(payload?.metrics)) return payload.metrics.length;
  if (Array.isArray(payload?.observations)) return payload.observations.length;
  return 0;
}
const nationalCount = countImportedMetrics(national);
const arkansasCount = countImportedMetrics(arkansas);
const countyCount = countImportedMetrics(county);
const obsCount = nationalCount + arkansasCount + countyCount;
const baselineStatus = JSON.parse(fs.readFileSync(r("data/baseline/baseline_status.json"), "utf8"));

if (manifest.validation_status === "architecture_stub") {
  if (obsCount > 0) {
    fail("architecture_stub manifest cannot include observations");
  } else ok("stub export correctly has zero observations");
  if (baselineStatus.sourced_metrics !== 2) {
    warn(
      `baseline sourced_metrics=${baselineStatus.sourced_metrics}; stub bridge must not silently change expected 2/86 without a real validated import`
    );
  } else ok("baseline remains 2/86 under stub import");
} else if (manifest.validation_status === "passed") {
  if (obsCount === 0) fail("passed export must include observations");
  if ((manifest.observation_count || 0) !== obsCount) {
    fail(
      `manifest.observation_count=${manifest.observation_count} does not match imported metric rows=${obsCount}`
    );
  } else ok(`imported observation rows match manifest (${obsCount})`);
  if (!manifest.reddirt_commit) warn("passed export missing reddirt_commit");
  if (manifest.series_count < 1) fail("passed export series_count must be >= 1");
  // Credential-separation proof: reject secret-bearing assignments/values,
  // not documentation that merely names the forbidden env vars.
  const payloadFiles = requiredFiles.filter((f) => f !== "import-validation.json");
  const importText = payloadFiles
    .map((f) => fs.readFileSync(path.join(importDir, f), "utf8"))
    .join("\n");
  const secretBearing = [
    /"(?:CENSUS_API_KEY|BLS_API_KEY|API_DOT_GOV_KEY)"\s*:\s*"(?!false|true)[^"]+"/i,
    /(?:CENSUS_API_KEY|BLS_API_KEY|API_DOT_GOV_KEY)\s*=\s*\S+/i,
  ];
  let credentialSeparationOk = true;
  for (const re of secretBearing) {
    if (re.test(importText)) {
      fail(`Credential-bearing pattern detected in CC import package: ${re}`);
      credentialSeparationOk = false;
    }
  }
  if (credentialSeparationOk) {
    ok("credential-separation proof: no Census/BLS/data.gov secret values in import package");
  }
} else if (manifest.validation_status === "pending") {
  warn("manifest validation_status is pending — not yet approved for baseline promotion");
}

if (bridge.status === "architecture_only") {
  ok("bridge status architecture_only — not counted as baseline proof");
}

console.log("");
console.log(`Public statistics import validation: ${errors.length ? "FAILED" : "PASSED"}`);
console.log(`  Warnings: ${warnings.length}`);
console.log(`  Observations in national snapshot: ${obsCount}`);
console.log(`  Baseline sourced: ${baselineStatus.sourced_metrics}/${baselineStatus.total_metrics}`);
if (errors.length) process.exit(1);
