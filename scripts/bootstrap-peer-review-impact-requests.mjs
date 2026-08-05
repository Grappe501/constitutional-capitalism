/**
 * CC-DEC-098 — Peer-review journal model + Impact Requests for Collaborative Review.
 * Review = Phase 8; Understand (SIE) = Phase 9. Architecture only.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const DEC = "CC-DEC-098";
const UPD = "UPD-049";
const HYP = "HYP-119";
const TODAY = "2026-08-05";

const expertiseDomains = [
  "Constitutional law",
  "Economics",
  "Municipal finance",
  "Agriculture",
  "Healthcare",
  "Energy",
  "Public administration",
  "Education",
  "Emergency management",
  "Tax policy",
  "Retirement systems",
  "Environmental science",
  "History"
];

const reviewTypes = [
  {
    id: "evidence_review",
    title: "Evidence Review",
    labels: ["Needs citation", "Weak source", "Better source", "Contradictory evidence"]
  },
  {
    id: "logical_review",
    title: "Logical Review",
    labels: ["Doesn't follow", "Circular reasoning", "Needs clarification", "Missing assumption"]
  },
  {
    id: "legal_review",
    title: "Legal Review",
    labels: ["Potential legal conflict", "Court precedent", "Federalism issue", "Delegation issue"]
  },
  {
    id: "economic_review",
    title: "Economic Review",
    labels: ["Needs modeling", "Questionable incentive", "Unintended consequence", "Market distortion"]
  },
  {
    id: "implementation_review",
    title: "Implementation Review",
    labels: ["Administrative feasibility", "Capacity gap", "Sequencing risk", "Local variation"]
  },
  {
    id: "editorial_review",
    title: "Editorial Review",
    labels: ["Grammar", "Style", "Organization", "Readability"]
  },
  {
    id: "counterargument",
    title: "Counterargument",
    labels: ["Strongest good-faith objection", "Competing principle tension", "Tradeoff underweighted"]
  },
  {
    id: "alternative_design",
    title: "Alternative Design",
    labels: ["Suggested rewrite", "Alternative mechanism", "New example", "Additional research"]
  },
  {
    id: "clarifying_question",
    title: "Clarifying Question",
    labels: ["I don't understand..."],
    note: "High volume of confusion on one paragraph means the paragraph is the problem."
  }
];

const impactRequestFields = [
  "Principles affected",
  "Claims affected",
  "Evidence packets requiring review",
  "Legal questions introduced",
  "Economic variables affected",
  "Other chapters requiring revision",
  "Potential conflicts with existing doctrine",
  "Recommended simulation scenarios",
  "Confidence in the assessment"
];

const fiveStages = [
  {
    id: "discover",
    title: "Discover",
    summary: "Philosophy and architecture",
    phases: "Phase 1–early Phase 2 doctrine/architecture"
  },
  {
    id: "prove",
    title: "Prove",
    summary: "Evidence, legal analysis, and modeling",
    phases: "Phase 2 proof burden, legal, modeling"
  },
  {
    id: "write",
    title: "Write",
    summary: "Manuscript and educational materials",
    phases: "Phase 6 manuscript; Phase 7 education/publication"
  },
  {
    id: "review",
    title: "Review",
    summary: "Structured scholarly collaboration (peer-review journal model)",
    phases: "Phase 8 Collaborative Constitutional Review",
    decision_id: "CC-DEC-096",
    refinement_decision_id: DEC
  },
  {
    id: "understand",
    title: "Understand",
    summary: "AI systems intelligence, simulation, and impact analysis",
    phases: "Phase 9 Systems Intelligence Engine",
    decision_id: "CC-DEC-097",
    note: "AI helps everyone understand consequences of changing the work — not write it."
  }
];

// --- CCR framework ---
const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.version = "0.2.0";
ccr.last_updated = TODAY;
ccr.related_decision_ids = Array.from(
  new Set([...(ccr.related_decision_ids || []), DEC, "CC-DEC-097"])
);
ccr.subtitle =
  "Phase 8 penultimate human-governance layer — academic peer-review journal model; Impact Requests bridge to Phase 9 Systems Intelligence";
ccr.governance_vs_construction = {
  title: "Governance separated from construction",
  rule: "While Constitutional Capitalism is still being constructed, collaboration is premature — reviewers would debate ideas not yet fully researched, modeled, or legally analyzed.",
  opens_when:
    "Architecture is mature enough that outside expertise can improve it rather than define it.",
  participants: "reviewers",
  not_participants: "generic commenters"
};
ccr.operating_model = {
  title: "Academic peer-review journal — not an online commenting platform",
  principle: "People should not merely comment. They should help improve the document as reviewers.",
  psychology_shift: ccr.principle?.psychology_shift || {
    from: "I disagree.",
    to: "I believe this section could be stronger because..."
  }
};
ccr.principle = {
  text: "People should not merely comment. They should help improve the document as scholarly reviewers.",
  psychology_shift: ccr.operating_model.psychology_shift
};
ccr.expertise_domains = {
  title: "Declared areas of expertise",
  rule: "Every review records the reviewer's declared expertise domain(s) and the review type.",
  domains: expertiseDomains
};
ccr.review_types = reviewTypes;
ccr.comment_types = reviewTypes.map((t) => ({
  id: t.id,
  labels: t.labels,
  ...(t.note ? { note: t.note } : {}),
  superseded_by: "review_types",
  title: t.title
}));
ccr.impact_requests = {
  title: "Impact Requests",
  status: "architecture_candidate_deferred",
  decision_id: DEC,
  hypothesis_id: HYP,
  rule: "Instead of opinion-only comments, a reviewer may submit a structured Impact Request for system-level analysis.",
  example_submission:
    "I think we should increase local investment from 10% to 15%.",
  transforms: "Collaboration from opinion into structured systems analysis.",
  bridges_to: {
    phase: 9,
    engine: "Constitutional Capitalism Systems Intelligence Engine",
    framework_file: "data/project/systems_intelligence_engine_framework.json",
    response_artifact: "System Impact Review"
  },
  ai_response_fields: impactRequestFields,
  authority:
    "AI analyzes Impact Requests; humans review; authorized humans decide; decision ledger records the outcome. AI never auto-modifies doctrine."
};
ccr.five_stage_progression = {
  title: "Natural evolution of the build",
  stages: fiveStages,
  note: "Review (Phase 8) precedes Understand (Phase 9). The AI does not become the author; it becomes the instrument for understanding consequences of change."
};
ccr.is = Array.from(
  new Set([
    ...(ccr.is || []),
    "Academic peer-review journal model",
    "Expertise-tagged scholarly reviews",
    "Typed review artifacts (not generic comments)",
    "Impact Requests that feed the Systems Intelligence Engine"
  ])
);
ccr.is_not = Array.from(
  new Set([
    ...(ccr.is_not || []),
    "Generic online commenting platform",
    "Opinion threads without expertise or review-type metadata"
  ])
);
ccr.review_artifacts = {
  ...(ccr.review_artifacts || {}),
  title: "Reviews as scholarly artifacts",
  required_metadata: [
    "Declared expertise domain(s)",
    "Review type",
    "Manuscript node / version",
    "Optional Impact Request flag"
  ],
  rule: "Every submission should be capable of becoming a tracked review artifact with expertise, type, and permanent audit trail — journal peer review, not a comment widget."
};
ccr.activation_gates = {
  ...(ccr.activation_gates || {}),
  related_existing_slice: {
    ...(ccr.activation_gates?.related_existing_slice || {}),
    rule: "No public feedback backend on unprotected Build Board. CCR is the Phase 8 peer-review design; Impact Requests connect to Phase 9 Systems Intelligence when activated."
  }
};
write("data/project/collaborative_constitutional_review_framework.json", ccr);

// --- SIE framework ---
const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.version = "0.2.0";
sie.last_updated = TODAY;
sie.related_decision_ids = Array.from(
  new Set([...(sie.related_decision_ids || []), DEC, "CC-DEC-096"])
);
sie.five_stage_progression = {
  title: "Natural evolution of the build",
  stages: fiveStages,
  capstone_role:
    "Understand — AI helps collaborators, policymakers, and citizens understand consequences of changing Constitutional Capitalism, not write it."
};
sie.impact_requests = {
  title: "Impact Requests (from Collaborative Review)",
  decision_id: DEC,
  source_phase: 8,
  source_framework: "data/project/collaborative_constitutional_review_framework.json",
  consumes: "Structured reviewer Impact Requests",
  produces: "System Impact Review + optional simulation scenario recommendations",
  ai_response_fields: impactRequestFields,
  authority: sie.authority_chain?.text
};
sie.suggestion_impact_review = {
  ...(sie.suggestion_impact_review || {}),
  title: "System Impact Review",
  triggered_by: ["Impact Requests (Phase 8)", "Internal design proposals", "Hypothesis Cards under review"],
  sections: [
    "Direct implications",
    "Connected systems affected",
    "Potential benefits",
    "Potential risks",
    "Legal questions",
    "Evidence status",
    "System conflicts",
    "Recommended simulation scenarios",
    "Confidence in the assessment",
    "Recommendation for consideration (test ranges — not accept/reject)"
  ]
};
sie.phase_placement = {
  ...(sie.phase_placement || {}),
  build_order: [
    "Discover — philosophy and architecture",
    "Prove — evidence, legal analysis, and modeling",
    "Write — manuscript and educational materials",
    "Review — Phase 8 peer-review scholarly collaboration (Impact Requests optional)",
    "Understand — Phase 9 Systems Intelligence Engine (impact analysis, simulation, learning)"
  ]
};
write("data/project/systems_intelligence_engine_framework.json", sie);

// --- Decision ---
const decisions = read("data/decisions/decisions.json");
if (!decisions.decisions.some((d) => d.decision_id === DEC)) {
  decisions.decisions.push({
    decision_id: DEC,
    title: "Peer-Review Journal Model and Impact Requests",
    question:
      "Should Collaborative Constitutional Review (Phase 8) operate as an academic peer-review journal — reviewers with declared expertise and typed reviews — and include deferred Impact Requests that the Phase 9 Systems Intelligence Engine answers with structured System Impact Reviews, while preserving governance-vs-construction separation and the Discover→Prove→Write→Review→Understand progression?",
    status: "approved",
    rationale:
      "Generic commenting is premature during construction and weak as a review instrument. Expertise-tagged, typed peer review improves mature architecture. Impact Requests turn collaboration into systems analysis under human authority. No new principle ID; not built in Phase 2.",
    impact: [
      "collaborative_constitutional_review_framework.json v0.2",
      "systems_intelligence_engine_framework.json Impact Requests bridge",
      `${HYP} incubator card`,
      "UPD-049",
      "NO implementation / NO new CC-PRIN-*"
    ],
    recommendation:
      "Approve as architecture refinement only. Keep Phase 8 Review before Phase 9 Understand. Do not build review backends or AI impact pipelines now.",
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
    title: "Peer-review journal model and Impact Requests",
    summary:
      "Adopts CC-DEC-098: Collaborative Review refined as academic peer-review (expertise domains + typed reviews), not a comment platform; Impact Requests bridge Phase 8→9 System Impact Reviews; five-stage progression Discover→Prove→Write→Review→Understand locked. Architecture only.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

// --- Incubator ---
const inc = read("data/project/architecture_incubator.json");
inc.related_decision_ids = Array.from(new Set([...(inc.related_decision_ids || []), DEC]));
const cards = inc.hypothesis_cards || [];
const hyp117 = cards.find((h) => h.hypothesis_id === "HYP-117");
if (hyp117) {
  hyp117.related_decision_ids = Array.from(
    new Set([...(hyp117.related_decision_ids || []), DEC])
  );
  hyp117.note =
    "PENULTIMATE LAYER (Phase 8). Peer-review journal model + Impact Requests under CC-DEC-098. Do not build in Phase 2. True capstone is HYP-118 Understand layer (Phase 9).";
  hyp117.proposition =
    "After proof, legal, modeling, manuscript, and education maturity, a peer-review journal–style scholarly system (expertise-tagged reviewers, typed reviews, Impact Requests) can strengthen the document without crowdsourcing or social-media dynamics.";
}
if (!cards.some((h) => h.hypothesis_id === HYP)) {
  cards.push({
    hypothesis_id: HYP,
    title: "Impact Requests → System Impact Review",
    proposition:
      "When a Phase 8 reviewer submits an Impact Request (e.g., change a policy variable), the Phase 9 Systems Intelligence Engine can return a structured System Impact Review — principles, claims, evidence packets, legal questions, variables, conflicts, simulation scenarios, and confidence — without accepting or rejecting the change.",
    status: "Architectural hypothesis — deferred bridge",
    publishable: false,
    confidence_percent: 12,
    related_principle_ids: [],
    related_decision_ids: [DEC, "CC-DEC-096", "CC-DEC-097"],
    related_framework: "data/project/collaborative_constitutional_review_framework.json",
    public_path: "/collaborative-review/",
    evidence_needed: [
      "Impact Request schema and validation",
      "Knowledge-graph coverage for requested variables",
      "System Impact Review template evaluation",
      "Human-in-the-loop approval before any doctrine change",
      "Refusal rules when evidence is insufficient"
    ],
    proof_packet_status: "not_started",
    note: "Bridge capability. Requires Phase 8 review platform + Phase 9 engine. Not built in Phase 2."
  });
}
inc.hypothesis_cards = cards;
inc.last_updated = TODAY;
write("data/project/architecture_incubator.json", inc);

// --- Mission lock / build state / forensic ---
const lock = read("data/project/phase2_mission_lock.json");
lock.related_decision_ids = Array.from(new Set([...(lock.related_decision_ids || []), DEC]));
lock.collaborative_constitutional_review = {
  ...(lock.collaborative_constitutional_review || {}),
  peer_review_refinement_decision_id: DEC,
  impact_requests_hypothesis_id: HYP,
  rule: "Phase 8 peer-review journal model. Impact Requests deferred until Phase 9 engine. Do not implement in Phase 2."
};
write("data/project/phase2_mission_lock.json", lock);

const cbs = read("data/project/current_build_state.json");
cbs.related_decision_ids = Array.from(new Set([...(cbs.related_decision_ids || []), DEC]));
cbs.parallel_note =
  "Phase 8 Collaborative Review (peer-review journal + Impact Requests architecture) + Phase 9 Systems Intelligence = APPROVED ARCHITECTURE / NOT ACTIVE. Discover→Prove→Write→Review→Understand. No backends in Phase 2.";
write("data/project/current_build_state.json", cbs);

const fag = read("data/project/forensic_audit_governance.json");
fag.related_decision_ids = Array.from(new Set([...(fag.related_decision_ids || []), DEC]));
fag.collaborative_constitutional_review = {
  ...(fag.collaborative_constitutional_review || {}),
  refinement_decision_id: DEC,
  rule: "Phase 8 peer-review journal model under CC-DEC-098. Reviewers with expertise + typed reviews; Impact Requests bridge to Phase 9."
};
write("data/project/forensic_audit_governance.json", fag);

console.log("Peer-review journal model + Impact Requests captured (architecture only).");
