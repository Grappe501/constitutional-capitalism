/**
 * Bootstrap CC-DEC-097 Systems Intelligence Engine + corrected Phase 8/9 order.
 * Safe to re-run. Does NOT implement AI/simulation backends.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const DECISION = "CC-DEC-097";

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Systems Intelligence Engine — True Capstone (Phase 9)",
      question:
        "Should Constitutional Capitalism correct the final build order so Phase 8 is Collaborative Review and Public Stewardship (CC-DEC-096) and Phase 9 is the Constitutional Capitalism Systems Intelligence Engine — a RedDirt-connected whole-system impact / simulation / learning layer with knowledge graph, tradeoff laboratory, digital twins, red-team mode, and strict AI governance — while AI never replaces human authority, never invents citations, never presents simulations as forecasts, and is not built during Phase 2?",
      status: "approved",
      rationale:
        "Collaboration is the final human-governance layer; intelligence/simulation is the true capstone instrument. The project becomes a living civic-economic laboratory only after proof, manuscript, education, and scholarly review foundations exist. RedDirt remains the civic-data spine under existing isolation rules. No new principle ID.",
      impact: [
        "systems_intelligence_engine_framework.json",
        "phases.json Phase 7–9 reordered",
        "CCR moved to Phase 8",
        "HYP-118 incubator card",
        "board/book /systems-intelligence/ capture",
        "UPD-048",
        "NO implementation / modeling stays 0% until real models",
      ],
      recommendation:
        "Approve corrected order and capture architecture only. Do not build chatbot, sliders, or twins now. Keep campaign data out of CC. Preserve doctrine freeze and Burt proof spine.",
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
  if (!up.updates.some((u) => u.id === "UPD-048")) {
    up.updates.push({
      id: "UPD-048",
      date: "2026-08-05",
      title: "Systems Intelligence Engine (true capstone)",
      summary:
        "Adopts CC-DEC-097: Phase 8 = Collaborative Review; Phase 9 = Constitutional Capitalism Systems Intelligence Engine (RedDirt-connected whole-system impact, simulation, learning, red-team, AI governance). AI analyzes; humans decide. Architecture only — not built; modeling progress not inflated.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const phases = read("data/project/phases.json");
  phases.last_updated = "2026-08-05";

  const p6 = phases.phases.find((p) => p.id === "phase-6");
  if (p6) {
    p6.note =
      "Builds the document. Phase 8 Collaborative Review and Phase 9 Systems Intelligence Engine come only after manuscript/education/proof maturity.";
  }

  const p7 = phases.phases.find((p) => p.id === "phase-7");
  if (p7) {
    p7.title = "Public Education and Publication Packages";
    p7.deliverables = [
      "citizen summary",
      "policy guide",
      "visual explanations",
      "FAQs",
      "glossary",
      "downloadable materials",
      "web edition",
      "PDF",
      "EPUB",
      "print-ready edition",
      "accessibility review",
      "licensing",
      "distribution preparation",
    ];
    p7.note =
      "Combines education and publication packages so Phase 8/9 can be collaboration then intelligence capstone.";
  }

  const p8 = phases.phases.find((p) => p.id === "phase-8");
  if (p8) {
    p8.title = "Collaborative Review and Public Stewardship";
    p8.status = "planned_deferred_penultimate";
    p8.decision_id = "CC-DEC-096";
    p8.framework_file = "data/project/collaborative_constitutional_review_framework.json";
    p8.meaning =
      "Penultimate layer — final human-governance / scholarly review layer. Not crowdsourcing. Not the true AI capstone.";
    p8.deliverables = [
      "registered email verification",
      "anonymous public identity",
      "line-level / manuscript-tree margin review",
      "typed review artifacts with lifecycles",
      "version-aware comment attachment",
      "discussion and moderation",
      "quality signals (not social likes)",
      "decision history / ledger",
      "platform protection",
    ];
    p8.activation_requires = [
      "mature proof / legal / modeling layers",
      "mature manuscript",
      "Public Education and Publication Packages",
      "protected review platform",
    ];
    p8.note =
      "Moved from former Phase 9 placement (CC-DEC-097 corrected order). True capstone is Phase 9 Systems Intelligence Engine.";
  }

  const p9 = phases.phases.find((p) => p.id === "phase-9");
  if (p9) {
    p9.title = "AI Intelligence, Simulation, and Learning";
    p9.status = "planned_deferred_true_capstone";
    p9.decision_id = DECISION;
    p9.framework_file = "data/project/systems_intelligence_engine_framework.json";
    p9.meaning =
      "True capstone: Constitutional Capitalism Systems Intelligence Engine — whole-system impact, RedDirt-connected simulation and learning. AI analyzes; humans decide.";
    p9.deliverables = [
      "knowledge graph of axioms/principles/claims/policies/outcomes",
      "AI research analyst over project evidence",
      "simulation engine with scenario-estimate labeling",
      "policy tradeoff laboratory",
      "learning mode",
      "community digital twins",
      "AI-assisted collaborative synthesis",
      "red team mode",
      "constitutional/legal analysis assist (not legal advice)",
      "personalized learning paths",
      "evidence-grounded answer contracts",
      "AI governance controls and logging",
      "whole-system impact / System Impact Reviews",
      "system health dashboard (multi-dimension, no hidden tradeoffs)",
    ];
    p9.activation_requires = [
      "Phase 8 review platform protected (or staged isolation)",
      "validated RedDirt→CC statistics path for twin baselines",
      "populated knowledge graph / variable contracts",
      "real modeling for simulated claims",
      "AI governance gates",
    ];
    p9.note =
      "Not a chatbot. Modeling remains 0% until real models exist. Architecture capture does not inflate progress.";
  }

  write("data/project/phases.json", phases);
}

{
  const ccr = read("data/project/collaborative_constitutional_review_framework.json");
  ccr.last_updated = "2026-08-05";
  ccr.subtitle =
    "Penultimate layer — final human-governance scholarly review (Phase 8); true capstone is Systems Intelligence Engine (Phase 9)";
  ccr.status = "architecture_candidate_deferred_penultimate";
  ccr.related_decision_ids = Array.from(
    new Set([...(ccr.related_decision_ids || []), DECISION])
  );
  ccr.phase_placement = {
    chronological_phase_id: "phase-8",
    chronological_phase_number: 8,
    role: "penultimate_human_governance_layer",
    steve_intent_note:
      "Corrected order (CC-DEC-097): Collaborative Review is Phase 8; Systems Intelligence Engine is Phase 9 true capstone. Manuscript remains Phase 6; education/publication packages are Phase 7.",
    everything_before_builds_the_document: true,
    do_not_activate_early: true,
    true_capstone_phase_id: "phase-9",
    true_capstone_decision_id: DECISION,
  };
  ccr.why_last = {
    text: "Only after architecture, evidence, legal review, modeling, manuscript, and education layers are mature should the public be invited into drafting. Collaboration is the final human-governance layer before the intelligence capstone.",
    embodiment:
      "Prosperity grows through participation — scholarly review strengthens the document; the Systems Intelligence Engine then lets people test assumptions across the whole system under human authority.",
  };
  write("data/project/collaborative_constitutional_review_framework.json", ccr);
}

{
  const inc = read("data/project/architecture_incubator.json");
  inc.last_updated = "2026-08-05";
  inc.related_decision_ids = Array.from(
    new Set([...(inc.related_decision_ids || []), DECISION])
  );
  const hyp117 = inc.hypothesis_cards.find((h) => h.hypothesis_id === "HYP-117");
  if (hyp117) {
    hyp117.note =
      "PENULTIMATE LAYER (Phase 8 under CC-DEC-097). Do not build in Phase 2. True capstone is HYP-118 Systems Intelligence Engine (Phase 9).";
    hyp117.status = "Architectural hypothesis — deferred penultimate";
  }
  if (!inc.hypothesis_cards.some((h) => h.hypothesis_id === "HYP-118")) {
    inc.hypothesis_cards.push({
      hypothesis_id: "HYP-118",
      title: "Constitutional Capitalism Systems Intelligence Engine",
      proposition:
        "A RedDirt-connected whole-system impact engine can let users change inputs and see direct, indirect, delayed, distributional, and legal/tradeoff effects across the Constitutional Capitalism graph — with simulations labeled as scenario estimates and humans retaining all authority over doctrine and publication.",
      status: "Architectural hypothesis — deferred true capstone",
      publishable: false,
      confidence_percent: 12,
      related_principle_ids: [],
      related_decision_ids: [DECISION],
      related_framework: "data/project/systems_intelligence_engine_framework.json",
      public_path: "/systems-intelligence/",
      evidence_needed: [
        "Knowledge-graph population from existing registries",
        "Validated RedDirt→CC public statistics snapshots",
        "Causal/epistemic labeling methodology",
        "Simulation model specifications (assumptions published)",
        "AI grounding/refusal evaluation",
        "Digital-twin data contracts by geography",
        "Governance logging and human-approval workflows",
        "Security isolation from campaign data",
      ],
      proof_packet_status: "not_started",
      note: "TRUE CAPSTONE Phase 9. Architecture only. Does not raise modeling % until real models exist.",
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
  fag.systems_intelligence_engine = {
    decision_id: DECISION,
    framework_file: "data/project/systems_intelligence_engine_framework.json",
    rule: "True Phase 9 capstone. Architecture only in Phase 2. AI analyzes; humans decide. Simulations are scenario estimates, not forecasts. Modeling % stays 0 until real models exist.",
  };
  fag.collaborative_constitutional_review = {
    decision_id: "CC-DEC-096",
    framework_file: "data/project/collaborative_constitutional_review_framework.json",
    rule: "Phase 8 penultimate human-governance layer under corrected order (CC-DEC-097).",
  };
  const steps = fag.burt_active_authority?.deferred_steps?.steps || [];
  const s23 = steps.find((s) => s.step === 23);
  if (s23) {
    s23.title = "Phase 7 — Public Education and Publication Packages";
    s23.summary =
      "Citizen education materials plus web/PDF/EPUB/print packages before collaboration and intelligence layers.";
  }
  const s24 = steps.find((s) => s.step === 24);
  if (s24) {
    s24.title = "Phase 8 — Collaborative Review and Public Stewardship (gated)";
    s24.summary =
      "Protected scholarly review platform — anonymous-but-accountable, review artifacts, versioning (CC-DEC-096). Not crowdsourcing.";
  }
  const s25 = steps.find((s) => s.step === 25);
  if (s25) {
    s25.title = "Phase 9 — Systems Intelligence Engine (true capstone)";
    s25.summary =
      "RedDirt-connected whole-system impact, simulation, learning, red-team, AI governance (CC-DEC-097). AI analyzes; humans decide. Not a chatbot; not autonomous doctrine.";
  }
  write("data/project/forensic_audit_governance.json", fag);
}

{
  const lock = read("data/project/phase2_mission_lock.json");
  lock.last_updated = "2026-08-05";
  lock.related_decision_ids = Array.from(
    new Set([...(lock.related_decision_ids || []), DECISION])
  );
  lock.systems_intelligence_engine = {
    decision_id: DECISION,
    status: "deferred_true_capstone_not_active",
    framework_file: "data/project/systems_intelligence_engine_framework.json",
    rule: "Do not implement AI/simulation backends in Phase 2. Do not inflate modeling progress.",
  };
  if (lock.collaborative_constitutional_review) {
    lock.collaborative_constitutional_review.phase = "phase-8";
    lock.collaborative_constitutional_review.rule =
      "Phase 8 penultimate layer. Do not implement public review backends in Phase 2.";
  }
  if (
    !lock.honest_progress_rules.includes(
      "Systems Intelligence Engine architecture does not raise modeling percent until real models exist"
    )
  ) {
    lock.honest_progress_rules.push(
      "Systems Intelligence Engine architecture does not raise modeling percent until real models exist"
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
    "Phase 8 Collaborative Review + Phase 9 Systems Intelligence Engine = APPROVED ARCHITECTURE / NOT ACTIVE. No public feedback or AI simulation backends in Phase 2. RedDirt campaign data never enters CC.";
  cbs.next_action =
    "Burt step 2 three-layer retrofit; PP-FF-01; axioms derivation test; do NOT build Collaborative Review or Systems Intelligence Engine";
  write("data/project/current_build_state.json", cbs);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  const ccr = tree.find((n) => n.node_id === "CC-WEB-COLLABORATIVE-REVIEW");
  if (ccr) {
    ccr.note =
      "Phase 8 penultimate scholarly review architecture (CC-DEC-096/097). Not active in Phase 2. True capstone is Systems Intelligence Engine.";
  }
  if (!tree.some((n) => n.node_id === "CC-WEB-SYSTEMS-INTELLIGENCE")) {
    tree.push({
      node_id: "CC-WEB-SYSTEMS-INTELLIGENCE",
      title: "Systems Intelligence Engine",
      status: "captured_deferred",
      decision_id: DECISION,
      path: "/systems-intelligence/",
      central_promise:
        "Change one input and see whole-system consequences — scenario estimates under human authority, grounded in evidence and RedDirt-validated public data.",
      iconic_phrase:
        "AI analyzes → humans review → authorized humans decide → decision ledger records the result.",
      framework_file: "data/project/systems_intelligence_engine_framework.json",
      note: "True Phase 9 capstone. Architecture only. Not a chatbot.",
    });
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/systems_intelligence_engine_framework.json";
  if (!sm.related_framework_files.includes(f)) sm.related_framework_files.push(f);
  write("data/project/systems_map.json", sm);
}

{
  const rcip = read("data/project/rcip_civic_data_spine.json");
  rcip.last_updated = "2026-08-05";
  rcip.systems_intelligence_engine = {
    decision_id: DECISION,
    role: "Future Phase 9 consumer of validated public-statistics layers and multi-source confidence — never campaign schemas",
    framework_file: "data/project/systems_intelligence_engine_framework.json",
  };
  write("data/project/rcip_civic_data_spine.json", rcip);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/collaborative_constitutional_review_framework.json','schemas/collaborative_constitutional_review_framework.schema.json'],";
  const insert =
    "['data/project/collaborative_constitutional_review_framework.json','schemas/collaborative_constitutional_review_framework.schema.json'],\n  ['data/project/systems_intelligence_engine_framework.json','schemas/systems_intelligence_engine_framework.schema.json'],";
  if (!text.includes("systems_intelligence_engine_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Systems Intelligence Engine + Phase 8/9 reorder complete (not built).");
