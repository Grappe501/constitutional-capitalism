/**
 * UPD-066 — Four-level evidence hierarchy; LCL conceptual planning closed.
 * Field research sites (not demonstrations). Not doctrine. Next: PP-FF-01.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-066";
const TODAY = "2026-08-05";

const levels = [
  {
    level: 1,
    id: "proof_packets",
    title: "Proof Packets",
    question: "Is this individual doctrine supported by the evidence?",
    examples: [
      "Family Farm Prosperity",
      "Community Prosperity Accounts",
      "Local Ownership"
    ],
    verdicts: ["Supports", "Qualifies", "Contradicts"]
  },
  {
    level: 2,
    id: "living_community_laboratories",
    title: "Living Community Laboratories",
    question: "How do multiple doctrines interact within a real community?",
    examples: ["Lewisville", "Rose Bud"],
    asks: [
      "Which combinations reinforce one another?",
      "Which assumptions fail?",
      "Which local conditions matter most?"
    ],
    kind: "field_research_sites",
    not: "demonstrations of Constitutional Capitalism"
  },
  {
    level: 3,
    id: "comparative_community_research",
    title: "Comparative Community Research",
    question: "What patterns emerge across many different communities?",
    asks: [
      "Why did two similar hubs produce different outcomes?",
      "What institutional differences mattered?",
      "What local conditions mattered?",
      "What should the framework learn?"
    ],
    protects_against: "Overgeneralizing from a single success"
  },
  {
    level: 4,
    id: "systems_intelligence",
    title: "Systems Intelligence",
    phase: 9,
    rule: "Only after Levels 1–3 mature does Phase 9 become truly valuable — reasoning over scholarly evidence, proof packets, real communities, comparative findings, and institutional relationships — not abstract simulations alone."
  }
];

const lcl = read("data/project/living_community_laboratories.json");
lcl.version = "0.5.0";
lcl.last_updated = TODAY;
lcl.recorded_as_updates = Array.from(
  new Set([...(lcl.recorded_as_updates || []), UPD].filter(Boolean))
);
lcl.recorded_as_update = UPD;
lcl.field_research_identity = {
  update_id: UPD,
  rule: "Living Community Laboratories are field research sites — not demonstrations.",
  demonstration: "Begins with an expected answer",
  field_study: "Begins with a question",
  methodology_requires: "field study"
};
lcl.evidence_hierarchy = {
  update_id: UPD,
  decision_anchor: "CC-DEC-102",
  levels,
  single_success_rule:
    "Even if one laboratory performs extremely well, ask which features appear transferable and which depend on unique geography, leadership, economy, or culture — do not conclude every community should replicate it."
};
lcl.conceptual_planning = {
  status: "complete",
  closed_by_update: UPD,
  prior_updates: ["UPD-061", "UPD-062", "UPD-063", "UPD-064", "UPD-065"],
  remaining: "execution — PP-FF-01, remaining proof packets, evidence dossiers; community studies only when time comes",
  transition:
    "Stop asking 'What do we think?' and increasingly ask 'What have we learned?'"
};
lcl.research_legacy_aspiration = {
  update_id: UPD,
  text: "The enduring contribution may be a repeatable methodology for evaluating community development — a method that outlives the initial architecture and can test ideas not yet imagined."
};
write("data/project/living_community_laboratories.json", lcl);

const pbr = read("data/project/proof_burden_registry.json");
pbr.evidence_hierarchy = {
  update_id: UPD,
  levels: levels.map((l) => ({
    level: l.level,
    id: l.id,
    title: l.title,
    question: l.question || l.rule
  })),
  rule: "Level 1 proof packets remain the immediate execution priority. Levels 2–4 are sequenced, not simultaneous."
};
write("data/project/proof_burden_registry.json", pbr);

const eras = read("data/project/project_eras_roadmap.json");
eras.evidence_hierarchy = {
  update_id: UPD,
  levels: ["Proof Packets", "Living Community Laboratories", "Comparative Community Research", "Systems Intelligence"],
  lcl_planning: "complete"
};
eras.living_community_laboratories = {
  ...(eras.living_community_laboratories || {}),
  conceptual_planning_closed: UPD,
  identity: "field research sites — not demonstrations"
};
write("data/project/project_eras_roadmap.json", eras);

const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.evidence_hierarchy_placement = {
  update_id: UPD,
  level: 4,
  rule: "Phase 9 becomes powerful after Levels 1–3 mature — evidence, communities, and comparative findings — not simulations alone."
};
write("data/project/systems_intelligence_engine_framework.json", sie);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Evidence hierarchy; LCL conceptual planning closed",
    summary:
      "Under CC-DEC-102 (not doctrine): records four-level evidence hierarchy — Proof Packets → Living Community Laboratories (field sites, not demos) → Comparative Community Research → Systems Intelligence. Protects against overgeneralizing from one success. LCL conceptual planning complete (UPD-061–065). Execution resumes with PP-FF-01.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.writing_focus =
  "RESEARCH EXECUTION — evidence hierarchy Level 1 first (UPD-066). LCL planning closed. What have we learned?";
cbs.next_action =
  "LCL CONCEPTUAL PLANNING CLOSED (UPD-066). Burt Step 2; execute PP-FF-01. Community studies later.";
cbs.living_community_laboratories = {
  ...(cbs.living_community_laboratories || {}),
  update_id: UPD,
  conceptual_planning: "complete",
  identity: "field research sites"
};
cbs.evidence_hierarchy_update = UPD;
write("data/project/current_build_state.json", cbs);

const lock = read("data/project/phase2_mission_lock.json");
lock.evidence_hierarchy = {
  update_id: UPD,
  immediate: "Level 1 — Proof Packets (PP-FF-01)",
  rule: "LCL conceptual planning closed. Do not expand LCL design further; execute proof."
};
write("data/project/phase2_mission_lock.json", lock);

console.log("UPD-066: Evidence hierarchy locked. LCL planning closed. Execute PP-FF-01.");
