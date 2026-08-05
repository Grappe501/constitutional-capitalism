/**
 * Bootstrap CC-DEC-095 Ten Foundational Axioms (distillation — no new principle).
 * Safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const DECISION = "CC-DEC-095";

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Ten Foundational Axioms — Philosophy Distillation",
      question:
        "Should Constitutional Capitalism adopt 'The Ten Foundational Axioms of Constitutional Capitalism' as a proposed distillation layer — First Principle plus ten axioms (prosperity definition, government, markets, ownership, intergenerational responsibility, community, liberty/responsibility, human capital, ethical guardrails, traceability) — explicitly without minting a new CC-PRIN-* ID, without rewriting the Declaration, and interpreting Foundational Philosophy ~82% as integration/bounding work rather than a need for more domain doctrines?",
      status: "approved",
      rationale:
        "The philosophy is conceptually rich but not yet distilled into a coherent operating doctrine. Remaining foundational-philosophy work is integration, bounding, and operationalization — not more agriculture/healthcare/energy domains. Axioms give every later principle a derivation test while preserving doctrine freeze and Declaration integrity.",
      impact: [
        "foundational_axioms.json",
        "content/philosophy/TEN_FOUNDATIONAL_AXIOMS.md",
        "book/board /foundational-axioms/",
        "civilizational_core.foundational_axioms_file",
        "UPD-046",
        "NO new CC-PRIN-*",
      ],
      recommendation:
        "Approve as proposed_distillation. Do not raise Foundational Philosophy to 100% or uncap progress formulas. Do not rewrite Declaration. Keep Phase 2 PARTIAL and Burt proof spine. Use axioms to test new ideas; non-derivable items go to Incubator.",
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
  if (!up.updates.some((u) => u.id === "UPD-046")) {
    up.updates.push({
      id: "UPD-046",
      date: "2026-08-05",
      title: "Ten Foundational Axioms",
      summary:
        "Adopts CC-DEC-095: proposed distillation of First Principle + ten axioms. Interprets Foundational Philosophy ~82% as integration/bounding gap, not missing domains. No new principle ID; Declaration not rewritten. Traceability rule: doctrines must derive from axioms or be questioned.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const core = read("data/project/civilizational_core.json");
  core.last_updated = "2026-08-05";
  core.foundational_axioms_file = "data/project/foundational_axioms.json";
  core.foundational_axioms_note =
    "Proposed distillation (CC-DEC-095). Organizes philosophy for operational coherence; does not replace Declaration or mint new principles.";
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-FOUNDATIONAL-AXIOMS")) {
    const philIdx = tree.findIndex((n) => n.node_id === "CC-WEB-PHILOSOPHY");
    const node = {
      node_id: "CC-WEB-FOUNDATIONAL-AXIOMS",
      title: "Ten Foundational Axioms",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-093", "CC-DEC-094"],
      path: "/foundational-axioms/",
      central_promise:
        "Distill Constitutional Capitalism into a First Principle and ten axioms so every doctrine remains traceable, bounded, and operationally coherent.",
      iconic_phrase:
        "If a doctrine item cannot be derived from the First Principle, it should be questioned.",
      branches: [
        "First Principle",
        "Definition of Prosperity",
        "Role of Government",
        "Role of Markets",
        "Theory of Ownership",
        "Intergenerational Responsibility",
        "Philosophy of Community",
        "Liberty and Shared Responsibility",
        "Human Capital Philosophy",
        "Ethical Guardrails",
        "Traceability",
      ],
      framework_file: "data/project/foundational_axioms.json",
      research_domain_title: "Foundational Philosophy Distillation and Operating Axioms",
    };
    if (philIdx >= 0) tree.splice(philIdx + 1, 0, node);
    else tree.unshift(node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const fag = read("data/project/forensic_audit_governance.json");
  fag.last_updated = "2026-08-05";
  fag.related_decision_ids = Array.from(
    new Set([...(fag.related_decision_ids || []), DECISION])
  );
  fag.foundational_axioms = {
    decision_id: DECISION,
    file: "data/project/foundational_axioms.json",
    rule: "Foundational Philosophy remaining work is distillation/integration — not more domain doctrines. No new CC-PRIN-* from this slice.",
  };
  write("data/project/forensic_audit_governance.json", fag);
}

{
  const lock = read("data/project/phase2_mission_lock.json");
  lock.last_updated = "2026-08-05";
  lock.related_decision_ids = Array.from(
    new Set([...(lock.related_decision_ids || []), DECISION])
  );
  lock.foundational_axioms_file = "data/project/foundational_axioms.json";
  if (
    !lock.honest_progress_rules.includes(
      "Foundational Philosophy remaining work is integration/bounding — not more domain doctrines"
    )
  ) {
    lock.honest_progress_rules.push(
      "Foundational Philosophy remaining work is integration/bounding — not more domain doctrines"
    );
  }
  write("data/project/phase2_mission_lock.json", lock);
}

{
  const cbs = read("data/project/current_build_state.json");
  cbs.last_updated = "2026-08-05";
  cbs.related_decision_ids = Array.from(
    new Set([...(cbs.related_decision_ids || []), DECISION, "CC-DEC-093", "CC-DEC-094"])
  );
  cbs.writing_focus =
    "PROOF FIRST (Burt 2–6, 8–10) + philosophy distillation via Ten Foundational Axioms (no new principles); Proof Burden for CC-PRIN-44 packets";
  cbs.next_action =
    "Burt step 2 three-layer retrofit; use foundational axioms as derivation test for incubator items; fill PP-FF-01 with registered sources only; do not mint CC-PRIN-48+";
  cbs.foundational_axioms_file = "data/project/foundational_axioms.json";
  write("data/project/current_build_state.json", cbs);
}

{
  const inc = read("data/project/architecture_incubator.json");
  inc.last_updated = "2026-08-05";
  inc.related_decision_ids = Array.from(
    new Set([...(inc.related_decision_ids || []), DECISION])
  );
  inc.foundational_axioms_file = "data/project/foundational_axioms.json";
  inc.derivation_test =
    "New ideas must derive from the First Principle and Ten Foundational Axioms (CC-DEC-095) or remain Hypothesis Cards.";
  write("data/project/architecture_incubator.json", inc);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/foundational_axioms.json";
  if (!sm.related_framework_files.includes(f)) {
    sm.related_framework_files.unshift(f);
  }
  write("data/project/systems_map.json", sm);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/proof_burden_registry.json','schemas/proof_burden_registry.schema.json'],";
  const insert =
    "['data/project/proof_burden_registry.json','schemas/proof_burden_registry.schema.json'],\n  ['data/project/foundational_axioms.json','schemas/foundational_axioms.schema.json'],";
  if (!text.includes("foundational_axioms.json")) {
    if (!text.includes(needle)) throw new Error("validate needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Foundational Axioms bootstrap complete (no new principle).");
