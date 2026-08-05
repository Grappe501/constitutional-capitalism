/**
 * Bootstrap CC-DEC-096 Collaborative Constitutional Review (deferred capstone).
 * Safe to re-run. Does NOT implement any feedback backend.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const DECISION = "CC-DEC-096";

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Collaborative Constitutional Review — Deferred Capstone",
      question:
        "Should Constitutional Capitalism adopt Collaborative Constitutional Review as the last major feature / Phase 9 capstone — structured scholarly review with anonymous-but-accountable contributors, manuscript-tree margin discussions, typed review artifacts with lifecycles, version awareness, internal reputation, claim-status panels, and decision ledger — explicitly deferred until architecture, evidence, legal, modeling, manuscript, and education are mature, and explicitly not built during Phase 2 or on an unprotected Build Board?",
      status: "approved",
      rationale:
        "Inviting the public before proof standards are met produces commentary on unproven ideas. CCR embodies participation after the document is built — scholarly review artifacts, not social media. Manuscript remains Phase 6; CCR is the chronological capstone (Phase 9). No new principle ID.",
      impact: [
        "collaborative_constitutional_review_framework.json",
        "phases.json phase-9 retitled/refined",
        "HYP-117 incubator card",
        "board /collaborative-review/ capture surface",
        "UPD-047",
        "NO implementation / NO new CC-PRIN-*",
      ],
      recommendation:
        "Approve as deferred architecture only. Do not implement commenting, registration, or public backends now. Keep civic deliberation gated. Preserve doctrine freeze. Phase 2 remains PARTIAL; Burt proof spine unchanged.",
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
  if (!up.updates.some((u) => u.id === "UPD-047")) {
    up.updates.push({
      id: "UPD-047",
      date: "2026-08-05",
      title: "Collaborative Constitutional Review (deferred capstone)",
      summary:
        "Adopts CC-DEC-096: last major feature captured as Phase 9 Collaborative Constitutional Review — scholarly margin review, anonymous-but-accountable contributors, review-artifact lifecycles, version awareness. Not crowdsourcing. Not built now. Activation only after proof, legal, modeling, manuscript, and education maturity plus platform protection.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const phases = read("data/project/phases.json");
  phases.last_updated = "2026-08-05";
  const p9 = phases.phases.find((p) => p.id === "phase-9");
  if (p9) {
    p9.title = "Collaborative Constitutional Review";
    p9.status = "planned_deferred_capstone";
    p9.decision_id = DECISION;
    p9.framework_file = "data/project/collaborative_constitutional_review_framework.json";
    p9.meaning =
      "Last major feature. Structured scholarly review after the document is mature — not crowdsourcing, not Phase 2 work.";
    p9.deliverables = [
      "anonymous-but-accountable registration",
      "manuscript-tree margin review (book→word)",
      "typed review artifacts with lifecycles",
      "version-aware comment attachment",
      "quality signals (not social likes)",
      "AI discussion summaries",
      "internal contributor reputation ladder",
      "claim-status side panels",
      "decision ledger / legislative history",
      "scholarly multi-lens views",
      "moderation and platform protection",
    ];
    p9.activation_requires = [
      "mature proof / legal / modeling layers",
      "mature manuscript",
      "Public Education Edition",
      "protected review platform",
    ];
    p9.note =
      "Replaces vague 'public feedback' as the capstone design. Full Manuscript remains Phase 6. Do not activate early.";
  }
  const p6 = phases.phases.find((p) => p.id === "phase-6");
  if (p6 && !p6.note) {
    p6.note =
      "Builds the document. Collaborative Constitutional Review (Phase 9) comes only after manuscript, education, and proof maturity.";
  }
  write("data/project/phases.json", phases);
}

{
  const inc = read("data/project/architecture_incubator.json");
  inc.last_updated = "2026-08-05";
  inc.related_decision_ids = Array.from(
    new Set([...(inc.related_decision_ids || []), DECISION])
  );
  if (!inc.hypothesis_cards.some((h) => h.hypothesis_id === "HYP-117")) {
    inc.hypothesis_cards.push({
      hypothesis_id: "HYP-117",
      title: "Collaborative Constitutional Review",
      proposition:
        "After proof, legal, modeling, manuscript, and education maturity, a structured scholarly review system with anonymous-but-accountable contributors and review-artifact lifecycles can strengthen the document without crowdsourcing or social-media dynamics.",
      status: "Architectural hypothesis — deferred capstone",
      publishable: false,
      confidence_percent: 15,
      related_principle_ids: [],
      related_decision_ids: [DECISION],
      related_framework: "data/project/collaborative_constitutional_review_framework.json",
      public_path: "/collaborative-review/",
      evidence_needed: [
        "Annotation / peer-review platform case studies",
        "Moderation and identity design",
        "Version-aware comment attachment methods",
        "Reputation systems without popularity capture",
        "Privacy / security for contributor identity",
        "Legal review of public comment liability",
        "Build Board / platform protection confirmation",
      ],
      proof_packet_status: "not_started",
      note: "LAST MAJOR FEATURE. Do not build in Phase 2. Chronological Phase 9; manuscript remains Phase 6.",
    });
  }
  write("data/project/architecture_incubator.json", inc);
}

{
  const fag = read("data/project/forensic_audit_governance.json");
  fag.last_updated = "2026-08-05";
  fag.related_decision_ids = Array.from(
    new Set([...(fag.related_decision_ids || []), DECISION])
  );
  fag.collaborative_constitutional_review = {
    decision_id: DECISION,
    framework_file: "data/project/collaborative_constitutional_review_framework.json",
    rule: "Deferred capstone (Phase 9). Do not activate civic/public review backends before proof maturity and platform protection.",
  };
  const step24 = fag.burt_active_authority?.deferred_steps?.steps?.find(
    (s) => s.step === 24
  );
  if (step24) {
    step24.title = "Activate Collaborative Constitutional Review (gated)";
    step24.summary =
      "Only after Build Board/platform protection and mature manuscript/education/proof layers — CC-DEC-096 scholarly review, not generic feedback.";
  }
  const step25 = fag.burt_active_authority?.deferred_steps?.steps?.find(
    (s) => s.step === 25
  );
  if (step25) {
    step25.summary =
      "Public launch under HFI-aware continuing research; Collaborative Constitutional Review is the participation capstone, not unstructured crowdsourcing.";
  }
  write("data/project/forensic_audit_governance.json", fag);
}

{
  const lock = read("data/project/phase2_mission_lock.json");
  lock.last_updated = "2026-08-05";
  lock.related_decision_ids = Array.from(
    new Set([...(lock.related_decision_ids || []), DECISION])
  );
  lock.collaborative_constitutional_review = {
    decision_id: DECISION,
    status: "deferred_capstone_not_active",
    framework_file: "data/project/collaborative_constitutional_review_framework.json",
    rule: "Do not implement public review backends in Phase 2.",
  };
  if (
    !lock.honest_progress_rules.includes(
      "Collaborative Constitutional Review is deferred until proof, manuscript, education, and platform protection mature"
    )
  ) {
    lock.honest_progress_rules.push(
      "Collaborative Constitutional Review is deferred until proof, manuscript, education, and platform protection mature"
    );
  }
  write("data/project/phase2_mission_lock.json", lock);
}

{
  const cbs = read("data/project/current_build_state.json");
  cbs.last_updated = "2026-08-05";
  cbs.related_decision_ids = Array.from(
    new Set([...(cbs.related_decision_ids || []), DECISION])
  );
  cbs.parallel_note =
    "Civic deliberation / Collaborative Constitutional Review (CC-DEC-096) = APPROVED ARCHITECTURE / NOT ACTIVE — last major feature (Phase 9). No public feedback backend on unprotected Build Board. Do not build now.";
  cbs.next_action =
    "Burt step 2 three-layer retrofit; Proof Burden PP-FF-01; foundational axioms as derivation test; do NOT implement Collaborative Constitutional Review";
  write("data/project/current_build_state.json", cbs);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-COLLABORATIVE-REVIEW")) {
    tree.push({
      node_id: "CC-WEB-COLLABORATIVE-REVIEW",
      title: "Collaborative Constitutional Review",
      status: "captured_deferred",
      decision_id: DECISION,
      path: "/collaborative-review/",
      central_promise:
        "When the document is mature, structured scholarly review lets thoughtful readers strengthen it — anonymously accountable, evidence-first, never social-media crowdsourcing.",
      iconic_phrase: "People should not merely comment. They should help improve the document.",
      framework_file: "data/project/collaborative_constitutional_review_framework.json",
      note: "Capstone architecture only. Not active in Phase 2.",
    });
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/collaborative_constitutional_review_framework.json";
  if (!sm.related_framework_files.includes(f)) sm.related_framework_files.push(f);
  write("data/project/systems_map.json", sm);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/foundational_axioms.json','schemas/foundational_axioms.schema.json'],";
  const insert =
    "['data/project/foundational_axioms.json','schemas/foundational_axioms.schema.json'],\n  ['data/project/collaborative_constitutional_review_framework.json','schemas/collaborative_constitutional_review_framework.schema.json'],";
  if (!text.includes("collaborative_constitutional_review_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Collaborative Constitutional Review capstone capture complete (not built).");
