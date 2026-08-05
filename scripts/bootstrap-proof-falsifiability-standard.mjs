/**
 * CC-DEC-102 — Proof Packet Falsifiability Standard (scholarship mindset).
 * Not new platform architecture. Research-program operating rule for Phase 2.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const DEC = "CC-DEC-102";
const UPD = "UPD-053";
const TODAY = "2026-08-05";

const falsifiability = {
  decision_id: DEC,
  title: "Proof Packet Falsifiability Standard",
  kind: "scholarship_operating_rule",
  not_architecture: true,
  text: "Every proof packet should be capable of disproving the doctrine it examines.",
  purpose:
    "Honestly answer whether the evidence supports, qualifies, or contradicts the architectural hypothesis — not to prove the architecture correct.",
  each_packet_must_actively_seek: [
    "the strongest supporting evidence",
    "the strongest contrary evidence",
    "implementation failures",
    "boundary conditions",
    "unintended consequences",
    "alternative explanations",
    "the conditions under which the proposal should not be adopted"
  ],
  revision_rule:
    "If a packet concludes that part of the architecture should be revised, that is not a failure of Constitutional Capitalism — it is evidence that the governance process is working as intended.",
  constitutional_symmetry_expression: {
    architecture: "stable enough to resist casual change",
    scholarship: "rigorous enough to challenge any assumption",
    arbiter: "evidence, not author preference, determines whether refinement is warranted"
  },
  methodology_note:
    "At this stage, the methodology is as important as the conclusions it produces. PP-FF-01 validates the packet method as much as local-procurement substance.",
  priority_work: [
    "Burt Step 2 — establish the proof workflow as the project's operating rhythm",
    "PP-FF-01 — first full proof packet; validate methodology",
    "Use PP-FF-01 as the template for every subsequent evidence dossier"
  ]
};

const pbr = read("data/project/proof_burden_registry.json");
pbr.version = "0.2.0";
pbr.last_updated = TODAY;
pbr.related_decision_ids = Array.from(
  new Set([...(pbr.related_decision_ids || []), DEC, "CC-DEC-094", "CC-DEC-101", "CC-DEC-100"])
);
pbr.research_program_mode = {
  decision_id: DEC,
  from: "design effort",
  to: "research program",
  success_question: "Can we prove what we already have?"
};
pbr.falsifiability_standard = falsifiability;
pbr.operating_rule =
  "Advance the proof before expanding the architecture. Every packet must be capable of disproving the doctrine it examines.";
pbr.honesty_rules = Array.from(
  new Set([
    ...(pbr.standard?.honesty_rules || []),
    "Packets seek contrary evidence and non-adoption conditions, not confirmation alone",
    "Architecture revision recommended by evidence is governance success, not project failure"
  ])
);
if (pbr.standard) {
  pbr.standard.honesty_rules = pbr.honesty_rules;
}
write("data/project/proof_burden_registry.json", pbr);

const decisions = read("data/decisions/decisions.json");
if (!decisions.decisions.some((d) => d.decision_id === DEC)) {
  decisions.decisions.push({
    decision_id: DEC,
    title: "Proof Packet Falsifiability Standard — Research Program Mode",
    question:
      "Should Phase 2 scholarship operate under a falsifiability standard — every proof packet must be capable of disproving the doctrine it examines, actively seeking supporting and contrary evidence, failures, boundaries, unintended consequences, alternative explanations, and non-adoption conditions — treating evidence-driven architectural revision as governance success, while PP-FF-01 serves as the methodology template and Burt Step 2 becomes the operating rhythm?",
    status: "approved",
    rationale:
      "Strong research challenges its own hypotheses. Confirmation-only packets would violate Constitutional Symmetry. This is a scholarship operating rule, not new platform architecture. Freeze (CC-DEC-101) remains intact.",
    impact: [
      "proof_burden_registry.json falsifiability_standard",
      "PP-FF-01 scaffold updated as methodology exemplar",
      "UPD-053",
      "NO new architecture / NO new CC-PRIN-*"
    ],
    recommendation:
      "Approve and execute: Burt Step 2 rhythm; complete PP-FF-01 rigorously; replicate the method.",
    approved_by: "Steve",
    decided_at: TODAY,
    supersedes: null
  });
  decisions.last_updated = TODAY;
  write("data/decisions/decisions.json", decisions);
}

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Proof Packet Falsifiability Standard",
    summary:
      "Adopts CC-DEC-102: research-program mode. Every proof packet must be capable of disproving the doctrine it examines. Evidence-driven revision is governance success. PP-FF-01 is the methodology template. Burt Step 2 is the operating rhythm. No new architecture.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.related_decision_ids = Array.from(new Set([...(cbs.related_decision_ids || []), DEC]));
cbs.writing_focus =
  "RESEARCH PROGRAM — Can we prove (or disprove) what we already have? Falsifiable proof packets (CC-DEC-102).";
cbs.next_action =
  "Burt Step 2 operating rhythm; PP-FF-01 full packet under falsifiability standard (supports / qualifies / contradicts). Do not invent architecture.";
write("data/project/current_build_state.json", cbs);

const lock = read("data/project/phase2_mission_lock.json");
lock.related_decision_ids = Array.from(new Set([...(lock.related_decision_ids || []), DEC]));
lock.proof_falsifiability = {
  decision_id: DEC,
  rule: "Every proof packet must be capable of disproving the doctrine it examines. PP-FF-01 is the methodology template."
};
write("data/project/phase2_mission_lock.json", lock);

const fag = read("data/project/forensic_audit_governance.json");
fag.related_decision_ids = Array.from(new Set([...(fag.related_decision_ids || []), DEC]));
fag.proof_falsifiability = {
  decision_id: DEC,
  rule: "Burt Step 2 and proof packets operate under falsifiability — seek contrary evidence and non-adoption conditions."
};
write("data/project/forensic_audit_governance.json", fag);

const eras = read("data/project/project_eras_roadmap.json");
eras.related_decision_ids = Array.from(new Set([...(eras.related_decision_ids || []), DEC]));
eras.scholarship_return = {
  ...(eras.scholarship_return || {}),
  falsifiability_decision_id: DEC,
  mode: "research program",
  rule: "Every proof packet should be capable of disproving the doctrine it examines."
};
write("data/project/project_eras_roadmap.json", eras);

console.log("Falsifiability standard locked. Research program mode. Execute PP-FF-01.");
