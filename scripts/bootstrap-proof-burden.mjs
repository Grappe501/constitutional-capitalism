/**
 * Bootstrap CC-DEC-094 Proof Burden Standard (PRIN-44 exemplar).
 * Safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const DECISION = "CC-DEC-094";

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Proof Burden Standard — Architecture vs Evidence",
      question:
        "Should Constitutional Capitalism adopt an explicit Proof Burden standard for every principle — separating architectural completion from evidentiary completion — and seed CC-PRIN-44 (Family Farm Prosperity) as the exemplar with a nine-category burden table and five priority evidence packets (local procurement, regenerative economics, regional food infrastructure, succession, community multipliers), while keeping Phase 2 PARTIAL and publishable=false until packets graduate?",
      status: "approved",
      rationale:
        "Architecture for CC-PRIN-44 is integrated with initial ERS/FNS/LAMP anchors, but institutional assumptions remain hypotheses. Three baseline claims are not a comprehensive dossier. An explicit burden table tells readers and contributors where scholarship remains. The project bottleneck is now verifying, modeling, testing, and documenting — not inventing more doctrine.",
      impact: [
        "proof_burden_registry.json",
        "content/research/proof-packets/family-farm/* scaffolds",
        "HYP-116 linked to PP-FF-01–05",
        "board proof-incubator Proof Burden panel",
        "UPD-045",
      ],
      recommendation:
        "Approve. Keep Phase 2 PARTIAL. Do not treat scaffolds as completed research. Do not invent multipliers. Burt steps 2→3/4→5→6→8→9→10 remain the Phase 2 spine; PRIN-44 packets are the scholarship track for HYP-116. Do not mint new principles.",
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
  if (!up.updates.some((u) => u.id === "UPD-045")) {
    up.updates.push({
      id: "UPD-045",
      date: "2026-08-05",
      title: "Proof Burden Standard (CC-PRIN-44 exemplar)",
      summary:
        "Adopts CC-DEC-094: explicit Proof Burden tables separate architectural completion from evidentiary completion. Seeds CC-PRIN-44 with nine proof categories (historical/economic/pilots Partial; constitutional/fiscal/impact/environmental/admin Open) and five scaffold evidence packets. Phase 2 remains PARTIAL; publishable=false; advance proof before architecture.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const inc = read("data/project/architecture_incubator.json");
  inc.last_updated = "2026-08-05";
  inc.related_decision_ids = Array.from(
    new Set([...(inc.related_decision_ids || []), DECISION])
  );
  inc.proof_burden_registry = "data/project/proof_burden_registry.json";
  const hyp = inc.hypothesis_cards.find((h) => h.hypothesis_id === "HYP-116");
  if (hyp) {
    hyp.proof_burden_principle_id = "CC-PRIN-44";
    hyp.priority_evidence_packets = [
      "PP-FF-01",
      "PP-FF-02",
      "PP-FF-03",
      "PP-FF-04",
      "PP-FF-05",
    ];
    hyp.proof_packet_status = "scaffolds_opened_not_complete";
    hyp.note =
      "USDA ERS/FNS baselines are diagnosis context only. Proof Burden table and five packet scaffolds opened under CC-DEC-094 — not a graduated Proof Packet.";
  }
  write("data/project/architecture_incubator.json", inc);
}

{
  const fag = read("data/project/forensic_audit_governance.json");
  fag.last_updated = "2026-08-05";
  fag.related_decision_ids = Array.from(
    new Set([...(fag.related_decision_ids || []), DECISION])
  );
  fag.proof_burden = {
    decision_id: DECISION,
    registry_file: "data/project/proof_burden_registry.json",
    rule: "Architectural completion never implies evidentiary completion. Every principle intended for manuscript/policy use carries an explicit Proof Burden table.",
    exemplar: "CC-PRIN-44",
  };
  write("data/project/forensic_audit_governance.json", fag);
}

{
  const lock = read("data/project/phase2_mission_lock.json");
  lock.last_updated = "2026-08-05";
  lock.related_decision_ids = Array.from(
    new Set([...(lock.related_decision_ids || []), DECISION])
  );
  lock.proof_burden = {
    decision_id: DECISION,
    registry_file: "data/project/proof_burden_registry.json",
    exemplar: "CC-PRIN-44",
  };
  if (
    !lock.honest_progress_rules.includes(
      "Architectural completion never implies evidentiary completion"
    )
  ) {
    lock.honest_progress_rules.push(
      "Architectural completion never implies evidentiary completion"
    );
  }
  write("data/project/phase2_mission_lock.json", lock);
}

{
  const cbs = read("data/project/current_build_state.json");
  cbs.last_updated = "2026-08-05";
  cbs.related_decision_ids = Array.from(
    new Set([...(cbs.related_decision_ids || []), "CC-DEC-093", "CC-DEC-075", DECISION])
  );
  cbs.writing_focus =
    "PROOF FIRST: Burt steps 2–6 and 8–10; Proof Burden scholarship track for CC-PRIN-44 (PP-FF-01–05 scaffolds); no new principles; architecture ≠ evidence";
  cbs.next_action =
    "Burt step 2 three-layer retrofit; begin filling PP-FF-01 local procurement packet with registered sources only; do not invent multipliers; do not mint CC-PRIN-48+";
  cbs.proof_burden = {
    decision_id: DECISION,
    registry_file: "data/project/proof_burden_registry.json",
    exemplar: "CC-PRIN-44",
  };
  write("data/project/current_build_state.json", cbs);
}

{
  const pr = read("data/project/principles.json");
  const p = pr.find((x) => x.id === "CC-PRIN-44");
  if (p) {
    p.proof_burden_file = "data/project/proof_burden_registry.json";
    p.evidence_status = "not_yet_validated";
    if (!p.related_decision_ids?.includes(DECISION)) {
      p.related_decision_ids = [...(p.related_decision_ids || []), DECISION];
    }
  }
  write("data/project/principles.json", pr);
}

{
  const fw = read("data/project/family_farm_prosperity_framework.json");
  fw.proof_burden_file = "data/project/proof_burden_registry.json";
  fw.evidence_status = "not_yet_validated";
  fw.architecture_vs_evidence_note =
    "Architecture integration complete; evidentiary validation not complete. See Proof Burden for CC-PRIN-44.";
  write("data/project/family_farm_prosperity_framework.json", fw);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/proof_burden_registry.json";
  if (!sm.related_framework_files.includes(f)) sm.related_framework_files.push(f);
  write("data/project/systems_map.json", sm);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/architecture_incubator.json','schemas/architecture_incubator.schema.json'],";
  const insert =
    "['data/project/architecture_incubator.json','schemas/architecture_incubator.schema.json'],\n  ['data/project/proof_burden_registry.json','schemas/proof_burden_registry.schema.json'],";
  if (!text.includes("proof_burden_registry.json")) {
    if (!text.includes(needle)) throw new Error("validate needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Proof Burden Standard bootstrap complete.");
