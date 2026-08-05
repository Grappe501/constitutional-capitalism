/**
 * Bootstrap CC-DEC-093 doctrine freeze + incubator wiring.
 * Safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const DECISION = "CC-DEC-093";
const ARCH_PRINS = ["CC-PRIN-44", "CC-PRIN-45", "CC-PRIN-46", "CC-PRIN-47"];

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Doctrine Freeze — Proof Packets and Architecture Incubator",
      question:
        "Should Constitutional Capitalism adopt a stricter doctrine freeze: no new principles unless they solve a missing proof requirement; route other ideas to Hypothesis Cards in an Architecture Incubator; require Proof Packets with historical, economic, and constitutional/legal three-layer reviews before graduation to publishable doctrine; and reclassify recent architecture surge principles (CC-PRIN-44–47 and related surfaces) as Architecture Candidates / not publishable until Proof Packets close?",
      status: "approved",
      rationale:
        "The design space expanded faster than the evidentiary foundation. Ideas, evidence, models, and claims cannot advance at the same speed. Forensic audit already diagnosed architecture-ahead-of-evidence; a tighter freeze converts that diagnosis into workflow: invent less, prove more, preserve promising ideas as hypotheses without presenting them as finished doctrine.",
      impact: [
        "architecture_incubator.json governing freeze + HYP-111–116",
        "forensic_audit_governance doctrine_freeze section",
        "phase2_mission_lock freeze rules",
        "principles CC-PRIN-44–47 marked architecture_candidate_not_publishable",
        "board surface /proof-incubator/",
        "UPD-044",
      ],
      recommendation:
        "Approve freeze at current principle count (47). Default next work remains Burt steps 2→3/4→5→6→8→9→10. Do not mint CC-PRIN-48+ for architectural appeal. Do not begin steps 14–25. Modeling/legal remain 0%. Phase 2 remains PARTIAL.",
      approved_by: "Steve",
      decided_at: "2026-08-05",
      supersedes: null,
    });
  }
  write("data/decisions/decisions.json", dec);
}

{
  const up = read("data/project/updates.json");
  up.last_updated = "2026-08-05";
  if (!up.updates.some((u) => u.id === "UPD-044")) {
    up.updates.push({
      id: "UPD-044",
      date: "2026-08-05",
      title: "Doctrine Freeze and Architecture Incubator",
      summary:
        "Adopts CC-DEC-093: no new principles unless they close a Phase 2 proof gap; Hypothesis Cards + Proof Packets; three-layer historical/economic/legal reviews required before doctrine graduation; recent surge (Family Farms, Community Prosperity, Resilience, Local Ownership) reclassified as Architecture Candidates / not publishable. Priority returns to Burt proof steps.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const pr = read("data/project/principles.json");
  for (const p of pr) {
    if (!ARCH_PRINS.includes(p.id)) continue;
    p.publication_status = "architecture_candidate_not_publishable";
    p.incubator_note =
      "Captured architecture under doctrine surge; governed by CC-DEC-093. Not manuscript-ready until Proof Packet graduation (historical + economic + constitutional/legal layers).";
    if (!p.related_decision_ids?.includes(DECISION)) {
      p.related_decision_ids = [...(p.related_decision_ids || []), DECISION];
    }
  }
  write("data/project/principles.json", pr);
}

{
  const fag = read("data/project/forensic_audit_governance.json");
  fag.last_updated = "2026-08-05";
  fag.related_decision_ids = Array.from(
    new Set([...(fag.related_decision_ids || []), DECISION])
  );
  fag.doctrine_freeze = {
    decision_id: DECISION,
    rule: "No new principles unless they solve a missing proof requirement.",
    frozen_principle_count: 47,
    incubator_file: "data/project/architecture_incubator.json",
    workflow: "Proof Packets + three-layer historical/economic/legal reviews before doctrine graduation",
    note: "Architectural appeal alone is not a Phase 2 gate. Route non-proof ideas to Hypothesis Cards.",
  };
  fag.controlling_shift =
    "Priority shifts from inventing to proving. The three-layer retrofit is the doctrine workflow, not a side task.";
  write("data/project/forensic_audit_governance.json", fag);
}

{
  const lock = read("data/project/phase2_mission_lock.json");
  lock.last_updated = "2026-08-05";
  lock.related_decision_ids = Array.from(
    new Set([...(lock.related_decision_ids || []), DECISION])
  );
  lock.doctrine_freeze = {
    decision_id: DECISION,
    rule: "No new principles unless they solve a missing proof requirement.",
    frozen_principle_count: 47,
    incubator_file: "data/project/architecture_incubator.json",
    architecture_candidates_not_publishable: ARCH_PRINS,
  };
  if (!lock.honest_progress_rules.includes("No new principles unless they solve a missing proof requirement")) {
    lock.honest_progress_rules.push(
      "No new principles unless they solve a missing proof requirement"
    );
  }
  if (
    !lock.honest_progress_rules.includes(
      "Architecture Candidate pages are not publishable doctrine until Proof Packet graduation"
    )
  ) {
    lock.honest_progress_rules.push(
      "Architecture Candidate pages are not publishable doctrine until Proof Packet graduation"
    );
  }
  write("data/project/phase2_mission_lock.json", lock);
}

{
  const cbs = read("data/project/current_build_state.json");
  cbs.last_updated = "2026-08-05";
  cbs.decision_id = DECISION;
  cbs.related_decision_ids = ["CC-DEC-075", "CC-DEC-064"];
  cbs.writing_focus =
    "PROOF FIRST under doctrine freeze (CC-DEC-093): Hypothesis Cards / Proof Packets; three-layer retrofit as workflow; Burt steps 2–6 and 8–10; no new principles unless they close a proof gap";
  cbs.next_action =
    "Execute Burt step 2 (three-layer retrofit) then 3/4→5→6→8→9→10; park non-proof ideas in architecture_incubator.json; do not mint CC-PRIN-48+; do not begin steps 14–25";
  cbs.primary_question = "What can we prove?";
  cbs.doctrine_freeze = {
    status: "active",
    decision_id: DECISION,
    frozen_principle_count: 47,
    incubator_file: "data/project/architecture_incubator.json",
  };
  write("data/project/current_build_state.json", cbs);
}

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Doctrine Freeze CC-DEC-093")) {
    dd.note =
      "Doctrine Freeze CC-DEC-093 ACTIVE: no new principles unless they solve a missing proof requirement; non-proof ideas become Hypothesis Cards in architecture_incubator.json. " +
      dd.note;
  }
  write("data/project/developing_doctrine.json", dd);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/architecture_incubator.json";
  if (!sm.related_framework_files.includes(f)) {
    sm.related_framework_files.push(f);
  }
  write("data/project/systems_map.json", sm);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/forensic_audit_governance.json','schemas/forensic_audit_governance.schema.json'],";
  const insert =
    "['data/project/forensic_audit_governance.json','schemas/forensic_audit_governance.schema.json'],\n  ['data/project/architecture_incubator.json','schemas/architecture_incubator.schema.json'],";
  if (!text.includes("architecture_incubator.json")) {
    if (!text.includes(needle)) throw new Error("validate needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Doctrine freeze / Architecture Incubator bootstrap complete.");
