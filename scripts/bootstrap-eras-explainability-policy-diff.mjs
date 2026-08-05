/**
 * CC-DEC-099 — Three eras roadmap stable; Explainable Systems Intelligence rule;
 * Policy Diff Analysis capability. Architecture freeze for further Phase 8/9 expansion.
 * Does NOT mint a new CC-PRIN-* (doctrine freeze).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const DEC = "CC-DEC-099";
const UPD = "UPD-050";
const HYP = "HYP-120";
const TODAY = "2026-08-05";

const explainable = {
  id: "explainable_systems_intelligence",
  title: "Principle of Explainable Systems Intelligence",
  kind: "governing_engine_rule",
  not_a_doctrine_principle: true,
  note: "Captured as Phase 9 engine governance — does not mint CC-PRIN-*. Doctrine freeze preserved.",
  text: "Every conclusion produced by the Systems Intelligence Engine must be traceable to its assumptions, evidence, governing principles, and causal reasoning. The engine must show why it reached a conclusion, not merely what it concluded.",
  must_expose: [
    "assumptions used",
    "variables changed",
    "evidence relied upon",
    "confidence level",
    "unresolved uncertainties",
    "competing interpretations",
    "which Constitutional Capitalism principles influenced the analysis"
  ],
  forbids: [
    "opaque black-box conclusions",
    "answers without provenance when project evidence exists",
    "hiding uncertainty or competing interpretations"
  ]
};

const policyDiff = {
  id: "C12",
  title: "Policy Diff Analysis",
  summary:
    "Git-diff for the constitutional-economic framework: given a proposed manuscript or doctrine change, report affected doctrine items, principles, evidence packets, legal analyses, educational modules, and simulations — surfacing unintended consequences before acceptance.",
  example:
    "This modification affects 14 doctrine items, 6 principles, 3 evidence packets, 2 legal analyses, 4 educational modules, and changes the projected outcomes of three existing simulations.",
  status: "architecture_candidate_deferred",
  hypothesis_id: HYP
};

// --- SIE ---
const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.version = "0.3.0";
sie.last_updated = TODAY;
sie.related_decision_ids = Array.from(
  new Set([...(sie.related_decision_ids || []), DEC, "CC-DEC-098"])
);
sie.eras_roadmap_file = "data/project/project_eras_roadmap.json";
sie.doctrine_ai_relationship =
  "Doctrine becomes the source of AI reasoning. AI never becomes the source of doctrine.";
sie.governing_rules = sie.governing_rules || [];
if (!sie.governing_rules.some((r) => r.id === explainable.id)) {
  sie.governing_rules.unshift(explainable);
}
sie.authority_chain = {
  ...(sie.authority_chain || {}),
  ai_never: Array.from(
    new Set([
      ...(sie.authority_chain?.ai_never || []),
      "produce opaque black-box conclusions without traceable assumptions, evidence, principles, and causal reasoning"
    ])
  )
};
if (!sie.capabilities.some((c) => c.id === "C12")) {
  sie.capabilities.push(policyDiff);
}
sie.policy_diff_analysis = {
  title: "Policy Diff Analysis",
  decision_id: DEC,
  hypothesis_id: HYP,
  ...policyDiff,
  rule: "Make unintended consequences visible before changes are accepted."
};
sie.architecture_freeze = {
  decision_id: DEC,
  rule: "High-level Phase 8/9 roadmap is stable. Resist further architecture expansion. Value now comes from doctrine, evidence, and models."
};
write("data/project/systems_intelligence_engine_framework.json", sie);

// --- Eras file related_decision already set; ensure file exists ---
const eras = read("data/project/project_eras_roadmap.json");
eras.last_updated = TODAY;
eras.decision_id = DEC;
write("data/project/project_eras_roadmap.json", eras);

// --- CCR light link ---
const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.related_decision_ids = Array.from(new Set([...(ccr.related_decision_ids || []), DEC]));
ccr.eras_roadmap_file = "data/project/project_eras_roadmap.json";
ccr.era = {
  id: "era-ii-review",
  title: "Era II — Review",
  phase: 8
};
ccr.architecture_freeze = {
  decision_id: DEC,
  rule: "High-level roadmap stable. Do not expand Phase 8 architecture further in Phase 2."
};
write("data/project/collaborative_constitutional_review_framework.json", ccr);

// --- Decision ---
const decisions = read("data/decisions/decisions.json");
if (!decisions.decisions.some((d) => d.decision_id === DEC)) {
  decisions.decisions.push({
    decision_id: DEC,
    title: "Three Eras Roadmap Stable — Explainability + Policy Diff",
    question:
      "Should Constitutional Capitalism lock a stable three-era roadmap (Creation → Review → Intelligence), capture the Principle of Explainable Systems Intelligence as a Phase 9 governing engine rule (not a new CC-PRIN-*), capture Policy Diff Analysis as a deferred Phase 9 capability, freeze further Phase 8/9 architecture expansion, and return priority to Burt Step 2 proof work?",
    status: "approved",
    rationale:
      "The high-level lifecycle is coherent. Further architecture dilutes proof. Explainability must be locked early so the engine never becomes a black box. Policy Diff is the natural consequence of a connected knowledge graph. Doctrine freeze preserved — no new principle ID.",
    impact: [
      "project_eras_roadmap.json",
      "systems_intelligence_engine_framework.json governing rule + C12",
      `${HYP} incubator card`,
      "UPD-050",
      "architecture freeze for Phase 8/9 expansion",
      "NO new CC-PRIN-* / NO backends"
    ],
    recommendation:
      "Approve and freeze. Return to Burt Step 2. Do not build Phase 8 or Phase 9.",
    approved_by: "Steve",
    decided_at: TODAY,
    supersedes: null
  });
  decisions.last_updated = TODAY;
  write("data/decisions/decisions.json", decisions);
}

// --- Updates ---
const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Three eras roadmap stable; explainability; Policy Diff",
    summary:
      "Adopts CC-DEC-099: Era I Creation / Era II Review (Phase 8) / Era III Intelligence (Phase 9) locked as stable. Captures Principle of Explainable Systems Intelligence (engine rule, not CC-PRIN-*) and Policy Diff Analysis (HYP-120). Freezes further Phase 8/9 architecture expansion. Return to Burt Step 2 proof.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

// --- Incubator ---
const inc = read("data/project/architecture_incubator.json");
inc.related_decision_ids = Array.from(new Set([...(inc.related_decision_ids || []), DEC]));
const cards = inc.hypothesis_cards || [];
if (!cards.some((h) => h.hypothesis_id === HYP)) {
  cards.push({
    hypothesis_id: HYP,
    title: "Policy Diff Analysis",
    proposition:
      "A proposed manuscript or doctrine change can be analyzed as a framework-wide diff — counting and explaining affected doctrine items, principles, evidence packets, legal analyses, educational modules, and simulations — so unintended consequences are visible before acceptance.",
    status: "Architectural hypothesis — deferred Phase 9 capability",
    publishable: false,
    confidence_percent: 10,
    related_principle_ids: [],
    related_decision_ids: [DEC, "CC-DEC-097"],
    related_framework: "data/project/systems_intelligence_engine_framework.json",
    public_path: "/systems-intelligence/",
    evidence_needed: [
      "Graph edge completeness for doctrine↔claim↔source↔chapter links",
      "Diff presentation UX without false precision",
      "Human review gate before any accepted change",
      "Explainability fields on every diff conclusion"
    ],
    proof_packet_status: "not_started",
    note: "Phase 9 capability under roadmap freeze. Do not build in Phase 2."
  });
}
inc.hypothesis_cards = cards;
inc.architecture_roadmap_freeze = {
  decision_id: DEC,
  rule: "High-level Phase 8/9 roadmap stable. Default: no further architecture expansion; strengthen proof foundations.",
  eras_file: "data/project/project_eras_roadmap.json"
};
inc.last_updated = TODAY;
write("data/project/architecture_incubator.json", inc);

// --- Mission lock / build state / forensic / systems_map / validate ---
const lock = read("data/project/phase2_mission_lock.json");
lock.related_decision_ids = Array.from(new Set([...(lock.related_decision_ids || []), DEC]));
lock.eras_roadmap = {
  decision_id: DEC,
  file: "data/project/project_eras_roadmap.json",
  status: "stable",
  rule: "Era I Creation (now). Do not build Era II Review or Era III Intelligence. Return to Burt Step 2."
};
lock.systems_intelligence_engine = {
  ...(lock.systems_intelligence_engine || {}),
  explainability_rule_id: explainable.id,
  policy_diff_hypothesis_id: HYP,
  architecture_freeze_decision_id: DEC
};
write("data/project/phase2_mission_lock.json", lock);

const cbs = read("data/project/current_build_state.json");
cbs.related_decision_ids = Array.from(new Set([...(cbs.related_decision_ids || []), DEC]));
cbs.writing_focus =
  "PROOF FIRST (Burt 2–6, 8–10). High-level roadmap STABLE (CC-DEC-099). Do not expand Phase 8/9 architecture.";
cbs.next_action =
  "Burt step 2 three-layer retrofit; PP-FF-01; do NOT build Collaborative Review or Systems Intelligence Engine; do NOT add more Phase 8/9 architecture";
cbs.parallel_note =
  "Eras I/II/III stable (CC-DEC-099). Phase 8 Review + Phase 9 Intelligence = APPROVED / NOT ACTIVE / ARCHITECTURE FROZEN. Build→Prove→Review→Understand. No backends in Phase 2.";
cbs.eras_roadmap_file = "data/project/project_eras_roadmap.json";
write("data/project/current_build_state.json", cbs);

const fag = read("data/project/forensic_audit_governance.json");
fag.related_decision_ids = Array.from(new Set([...(fag.related_decision_ids || []), DEC]));
fag.eras_roadmap = {
  decision_id: DEC,
  file: "data/project/project_eras_roadmap.json",
  rule: "Roadmap stable. Burt returns to Step 2. Steps 14–25 and Phase 8/9 backends remain deferred."
};
write("data/project/forensic_audit_governance.json", fag);

const sm = read("data/project/systems_map.json");
const files = sm.framework_files || sm.related_files || [];
const erasPath = "data/project/project_eras_roadmap.json";
if (Array.isArray(sm.framework_files) && !sm.framework_files.includes(erasPath)) {
  sm.framework_files.push(erasPath);
} else if (Array.isArray(sm.related_files) && !sm.related_files.includes(erasPath)) {
  sm.related_files.push(erasPath);
}
write("data/project/systems_map.json", sm);

const vpdPath = path.join(root, "scripts/validate-project-data.mjs");
const vpd = fs.readFileSync(vpdPath, "utf8");
if (!vpd.includes("project_eras_roadmap.json")) {
  const insertAfter =
    "  ['data/project/systems_intelligence_engine_framework.json','schemas/systems_intelligence_engine_framework.schema.json'],\n";
  const row =
    "  ['data/project/project_eras_roadmap.json','schemas/project_eras_roadmap.schema.json'],\n";
  if (vpd.includes(insertAfter)) {
    fs.writeFileSync(vpdPath, vpd.replace(insertAfter, insertAfter + row), "utf8");
  }
}

// Schema stub
const schemaPath = "schemas/project_eras_roadmap.schema.json";
if (!fs.existsSync(path.join(root, schemaPath))) {
  write(schemaPath, {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "project_eras_roadmap.schema.json",
    type: "object",
    required: ["version", "decision_id", "status", "eras", "lifecycle"],
    properties: {
      version: { type: "string" },
      decision_id: { type: "string" },
      status: { type: "string" },
      eras: { type: "array" },
      lifecycle: { type: "array" }
    },
    additionalProperties: true
  });
}

console.log("Three eras + explainability + Policy Diff captured. Roadmap frozen. Return to proof.");
