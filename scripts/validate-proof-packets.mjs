/**
 * Proof Packet Operating System validator (methodology 1.0).
 * npm run proofpacket:validate
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { r } from "./lib/paths.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020.js").default || require("ajv/dist/2020.js");
const ajv = new Ajv2020({ allErrors: true, strict: false });

const errors = [];
const warnings = [];
const fail = (m) => {
  errors.push(m);
  console.error("[FAIL]", m);
};
const warn = (m) => {
  warnings.push(m);
  console.warn("[WARN]", m);
};
const ok = (m) => console.log("[OK]", m);

const ROOT_REL = "research/proof_packets";
const REQUIRED_DIRS = [
  "templates",
  "contracts",
  "validators",
  "examples",
  "registry",
  "standards",
];

const REQUIRED_SECTIONS = [
  "Claim",
  "Architectural Source",
  "Research Question",
  "Hypothesis",
  "Evidence Reviewed",
  "Supporting Evidence",
  "Contrary Evidence",
  "Alternative Explanations",
  "Boundary Conditions",
  "Failure Conditions",
  "Implementation Considerations",
  "Economic Considerations",
  "Legal Considerations",
  "Research Gaps",
  "Confidence Assessment",
  "Final Verdict",
  "Future Research",
];

const REQUIRED_STANDARDS = [
  "standards/VERDICT_STANDARD.md",
  "standards/CONFIDENCE_STANDARD.md",
  "standards/PROOF_PACKET_METHOD.md",
  "standards/proof_packet_validation_checklist.md",
  "standards/packet_lifecycle.md",
  "standards/proof_packet_methodology_audit.md",
  "templates/PROOF_PACKET_TEMPLATE.md",
  "contracts/proof_packet.contract.json",
  "registry/proof_packet_registry.json",
];

const VERDICTS = new Set([
  "Supports",
  "Qualifies",
  "Contradicts",
  "Not Enough Evidence",
  "Withdrawn",
  "Superseded",
]);

const STATUSES = new Set([
  "Planned",
  "Researching",
  "Draft",
  "Internal Review",
  "Methodology Review",
  "Domain Review",
  "Complete",
  "Archived",
  "Superseded",
]);

function headingPresent(md, title) {
  const re = new RegExp(`^#{1,3}\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "mi");
  return re.test(md);
}

// --- Folder structure ---
if (!fs.existsSync(r(ROOT_REL))) fail(`Missing ${ROOT_REL}`);
else ok(`${ROOT_REL} exists`);

for (const d of REQUIRED_DIRS) {
  const p = r(ROOT_REL, d);
  if (!fs.existsSync(p) || !fs.statSync(p).isDirectory()) fail(`Missing directory ${ROOT_REL}/${d}`);
  else ok(`dir ${d}`);
}

for (const rel of REQUIRED_STANDARDS) {
  const p = r(ROOT_REL, rel);
  if (!fs.existsSync(p)) fail(`Missing ${ROOT_REL}/${rel}`);
  else ok(rel);
}

// --- Contract schema ---
const schemaPath = r(ROOT_REL, "contracts/proof_packet.contract.json");
let validateContract;
try {
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  validateContract = ajv.compile(schema);
  ok("compiled proof_packet.contract.json");
} catch (e) {
  fail(`Contract schema compile failed: ${e.message}`);
}

// --- Source / claim IDs for integrity ---
const sourceIds = new Set(
  (JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources || []).map(
    (s) => s.source_id,
  ),
);
const claimIds = new Set(
  (JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8")).claims || []).map(
    (c) => c.claim_id,
  ),
);

// --- Registry ---
const registryPath = r(ROOT_REL, "registry/proof_packet_registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const registryPackets = registry.packets || [];
if (!Array.isArray(registryPackets) || registryPackets.length < 1) {
  fail("Registry must list at least one packet");
} else ok(`registry packets: ${registryPackets.length}`);

const registryIds = new Set();
for (const row of registryPackets) {
  if (!row.packet_id) fail("Registry row missing packet_id");
  if (registryIds.has(row.packet_id)) fail(`Duplicate registry packet_id ${row.packet_id}`);
  registryIds.add(row.packet_id);
  if (row.verdict && !VERDICTS.has(row.verdict)) fail(`Registry ${row.packet_id} invalid verdict ${row.verdict}`);
  if (row.status && !STATUSES.has(row.status)) fail(`Registry ${row.packet_id} invalid status ${row.status}`);
  if (typeof row.completion_percent !== "number") fail(`Registry ${row.packet_id} missing completion_percent`);
  const contractRel = row.contract_path;
  if (!contractRel || !fs.existsSync(r(contractRel))) fail(`Registry ${row.packet_id} missing contract at ${contractRel}`);
  const mdRel = row.markdown_path;
  if (!mdRel || !fs.existsSync(r(mdRel))) fail(`Registry ${row.packet_id} missing markdown at ${mdRel}`);
}

// --- Executive packet contracts (PP-* dirs excluding examples) ---
const rootAbs = r(ROOT_REL);
const packetDirs = fs
  .readdirSync(rootAbs, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^PP-[A-Z0-9]+-\d{2}$/.test(d.name))
  .map((d) => d.name);

for (const packetId of packetDirs) {
  const dir = r(ROOT_REL, packetId);
  const contractFile = path.join(dir, `${packetId}.contract.json`);
  const mdFile = path.join(dir, `${packetId}.md`);
  if (!fs.existsSync(contractFile)) {
    fail(`Missing contract ${packetId}/${packetId}.contract.json`);
    continue;
  }
  if (!fs.existsSync(mdFile)) {
    fail(`Missing markdown ${packetId}/${packetId}.md`);
    continue;
  }
  if (!registryIds.has(packetId)) fail(`Packet dir ${packetId} not listed in registry`);

  const contract = JSON.parse(fs.readFileSync(contractFile, "utf8"));
  if (validateContract && !validateContract(contract)) {
    fail(`${packetId} contract failed schema`);
    (validateContract.errors || []).forEach((e) =>
      console.error(`  - ${e.instancePath || "/"} ${e.message}`),
    );
  } else if (validateContract) ok(`${packetId} contract schema`);

  if (contract.packet_id !== packetId) fail(`${packetId} contract packet_id mismatch`);

  for (const cid of contract.claim_ids || []) {
    if (!claimIds.has(cid)) fail(`${packetId} unknown claim_id ${cid}`);
  }
  for (const sid of contract.supporting_sources || []) {
    if (sid.startsWith("CC-SRC-") && !sourceIds.has(sid)) fail(`${packetId} unknown supporting source ${sid}`);
  }

  const contrary = contract.contrary_sources || [];
  const searchLog = contract.contrary_search_log || [];
  if (contrary.length === 0 && searchLog.length === 0) {
    fail(`${packetId} must include contrary_sources or contrary_search_log`);
  }
  if (searchLog.length > 0 && searchLog.length < 3) {
    warn(`${packetId}: contrary_search_log has ${searchLog.length} entries (methodology 1.1 recommends ≥3)`);
  }
  const hasExternalContrary = contrary.some((s) => String(s).startsWith("CC-SRC-"));
  if (!hasExternalContrary) {
    warn(`${packetId}: no CC-SRC-* contrary sources registered (confidence should stay Low)`);
  }
  if (contract.verdict === "Supports" && !hasExternalContrary) {
    fail(`${packetId}: Supports requires at least one contrary CC-SRC-* (or cannot use Supports)`);
  }
  if (contract.review_status === "Complete" && !hasExternalContrary) {
    fail(`${packetId}: Complete requires ≥1 contrary CC-SRC-* (methodology calibration MIB-001)`);
  }
  if (contract.methodology_version !== "1.0" && contract.methodology_version !== "1.1") {
    fail(`${packetId}: methodology_version must be 1.0 or 1.1`);
  }
  const supportCount = (contract.supporting_sources || []).length;
  const contrarySrcCount = contrary.filter((s) => String(s).startsWith("CC-SRC-")).length;
  if (supportCount > 0 && contrarySrcCount === 0 && contract.confidence?.overall && !["Very Low", "Low"].includes(contract.confidence.overall)) {
    fail(`${packetId}: overall confidence cannot exceed Low without contrary CC-SRC sources`);
  }
  if (supportCount >= 3 && contrarySrcCount === 0) {
    warn(`${packetId}: confirmation-bias signal — supporting sources without contrary CC-SRC (ratio infinite)`);
  }

  // Ledger completeness
  const ledgerPath = path.join(dir, `${packetId}_RESEARCH_LEDGER.json`);
  if (fs.existsSync(ledgerPath)) {
    const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    if (!Array.isArray(ledger.entries) || ledger.entries.length < 1) {
      fail(`${packetId} research ledger empty`);
    } else {
      for (const entry of ledger.entries) {
        if (!entry.entry_id || !entry.classification || !entry.search_date) {
          fail(`${packetId} ledger entry missing required fields`);
          break;
        }
      }
      ok(`${packetId} research ledger completeness`);
    }
  }

  // Reproducibility artifacts for Draft+
  if (["Draft", "Internal Review", "Methodology Review", "Domain Review", "Complete"].includes(contract.review_status)) {
    const biasNote = fs.existsSync(r("research/methodology/confirmation_bias_audit.md"));
    if (!biasNote) warn("methodology confirmation_bias_audit.md missing (calibration artifact)");
  }

  const md = fs.readFileSync(mdFile, "utf8");
  for (const section of REQUIRED_SECTIONS) {
    if (!headingPresent(md, section)) fail(`${packetId}.md missing section heading: ${section}`);
  }
  ok(`${packetId}.md required sections`);

  // Supports / Qualifies / Contradicts headings exist under Final Verdict area
  for (const v of ["Supports", "Qualifies", "Contradicts"]) {
    if (!headingPresent(md, v)) fail(`${packetId}.md missing verdict subsection: ${v}`);
  }

  if (!VERDICTS.has(contract.verdict)) fail(`${packetId} invalid verdict`);
  if (!STATUSES.has(contract.review_status)) fail(`${packetId} invalid review_status`);

  if (["Complete"].includes(contract.review_status)) {
    const audit = path.join(dir, `${packetId}_METHOD_AUDIT.md`);
    const ledger = path.join(dir, `${packetId}_RESEARCH_LEDGER.json`);
    const integrity = path.join(dir, `${packetId}_RESEARCH_INTEGRITY.md`);
    if (!fs.existsSync(audit)) fail(`${packetId} Complete requires METHOD_AUDIT`);
    if (!fs.existsSync(ledger)) fail(`${packetId} Complete requires RESEARCH_LEDGER`);
    if (!fs.existsSync(integrity)) fail(`${packetId} Complete requires RESEARCH_INTEGRITY`);
  }

  // Soft requirements for Draft+ executive packets
  if (["Draft", "Internal Review", "Methodology Review", "Domain Review", "Complete"].includes(contract.review_status)) {
    for (const suffix of ["_METHOD_AUDIT.md", "_RESEARCH_LEDGER.json", "_RESEARCH_INTEGRITY.md"]) {
      const f = path.join(dir, `${packetId}${suffix}`);
      if (!fs.existsSync(f)) fail(`${packetId} status ${contract.review_status} requires ${packetId}${suffix}`);
      else ok(`${packetId}${suffix}`);
    }
  }
}

// --- Example contract shape (optional) ---
const exampleContract = r(ROOT_REL, "examples/PP-EXAMPLE.contract.json");
if (fs.existsSync(exampleContract) && validateContract) {
  const ex = JSON.parse(fs.readFileSync(exampleContract, "utf8"));
  // Example uses PP-EX-00 which matches pattern; validate shape
  if (!validateContract(ex)) {
    fail("examples/PP-EXAMPLE.contract.json failed schema");
    (validateContract.errors || []).forEach((e) =>
      console.error(`  - ${e.instancePath || "/"} ${e.message}`),
    );
  } else ok("example contract schema");
}

// Touch validators dir marker
const validatorMarker = r(ROOT_REL, "validators/README.md");
if (!fs.existsSync(validatorMarker)) {
  fs.writeFileSync(
    validatorMarker,
    "# Proof Packet Validators\n\nCanonical validation: `npm run proofpacket:validate` → `scripts/validate-proof-packets.mjs`.\n",
    "utf8",
  );
  ok("wrote validators/README.md");
} else ok("validators/README.md");

console.log(`Proof packet validation: ${errors.length ? "FAILED" : "PASSED"} (${warnings.length} warnings)`);
if (errors.length) process.exit(1);
