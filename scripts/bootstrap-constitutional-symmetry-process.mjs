/**
 * CC-DEC-100 — Constitutional process of the framework + constitutional symmetry
 * architectural doctrine. Not a new CC-PRIN-*. Affirms architecture freeze / return to scholarship.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const DEC = "CC-DEC-100";
const UPD = "UPD-051";
const TODAY = "2026-08-05";

const stages = [
  {
    stage: "Discover",
    purpose: "Generate ideas and architecture",
    authority: "Core authors"
  },
  {
    stage: "Prove",
    purpose: "Build evidence, legal analysis, and models",
    authority: "Scholarship and research"
  },
  {
    stage: "Write",
    purpose: "Produce the canonical manuscript",
    authority: "Editorial authority"
  },
  {
    stage: "Review",
    purpose: "Structured peer review and critique",
    authority: "Verified reviewers"
  },
  {
    stage: "Understand",
    purpose: "Analyze consequences and explore alternatives",
    authority: "Systems Intelligence Engine (under human decision authority)"
  }
];

const symmetry = {
  id: "constitutional_symmetry",
  title: "Constitutional Symmetry (architectural doctrine)",
  kind: "architectural_doctrine",
  not_a_doctrine_principle: true,
  note: "Not a new CC-PRIN-*. Captures how the project governs itself.",
  text: "The framework itself should operate according to the same values it advocates for society.",
  mappings: [
    {
      value: "Transparency",
      project_practice: "every decision has a ledger"
    },
    {
      value: "Accountability",
      project_practice: "every accepted change has a rationale"
    },
    {
      value: "Distributed knowledge",
      project_practice: "expertise is welcomed through structured review"
    },
    {
      value: "Evidence before authority",
      project_practice: "claims advance through proof, not popularity"
    },
    {
      value: "Checks and balances",
      project_practice: "AI analyzes, reviewers critique, humans decide"
    },
    {
      value: "Stewardship",
      project_practice: "every revision strengthens rather than destabilizes the system"
    }
  ]
};

// --- Eras roadmap ---
const eras = read("data/project/project_eras_roadmap.json");
eras.version = "1.1.0";
eras.last_updated = TODAY;
eras.related_decision_ids = Array.from(
  new Set([...(eras.related_decision_ids || []), DEC, "CC-DEC-099"])
);
eras.what_the_project_defines = {
  substance: "What Constitutional Capitalism is",
  process: "How Constitutional Capitalism itself should evolve",
  note: "The five stages are a constitutional process for the framework, not merely a development plan."
};
eras.constitutional_process = {
  title: "Five-stage constitutional process of the framework",
  rule: "Every stage has a different purpose and a different authority — preventing one function from dominating the others.",
  stages
};
eras.architectural_doctrines = eras.architectural_doctrines || [];
if (!eras.architectural_doctrines.some((d) => d.id === symmetry.id)) {
  eras.architectural_doctrines.push(symmetry);
}
eras.scholarship_return = {
  decision_id: DEC,
  rule: "Stop designing the future platform. Return to scholarship.",
  highest_leverage_now: [
    "Burt Step 2",
    "PP-FF-01 and remaining proof packets",
    "Evidence, legal analysis, and modeling foundations"
  ],
  rationale:
    "Phase 9 quality depends almost entirely on Phase 2 rigor. The best Systems Intelligence Engine cannot compensate for weak evidence."
};
eras.stability_rule =
  "High-level roadmap is stable (CC-DEC-099/100). No further Phase 8/9 architecture expansion. Return to proof.";
write("data/project/project_eras_roadmap.json", eras);

// --- SIE knowledge-graph primacy ---
const sie = read("data/project/systems_intelligence_engine_framework.json");
sie.related_decision_ids = Array.from(new Set([...(sie.related_decision_ids || []), DEC]));
sie.knowledge_graph_primacy = {
  decision_id: DEC,
  title: "Knowledge graph primacy",
  rule: "The enduring Phase 9 asset is the interconnected knowledge graph — not the chatbot interface.",
  contrast: {
    most_policy_platforms: "What do you believe?",
    this_system: "If we change this belief, what else changes?"
  },
  example_systems_questions: [
    "Show me every place where Principle 17 influences retirement policy.",
    "If we remove Community Prosperity Accounts, what doctrines become orphaned?",
    "Which assumptions are responsible for 80% of the projected increase in rural prosperity?"
  ],
  note: "These are systems-engineering questions, not chatbot questions. Illustrative only — not claims of current capability."
};
if (!sie.architectural_doctrines) sie.architectural_doctrines = [];
if (!sie.architectural_doctrines.some((d) => d.id === symmetry.id)) {
  sie.architectural_doctrines.push(symmetry);
}
write("data/project/systems_intelligence_engine_framework.json", sie);

// --- Living identity ---
const living = read("data/project/living_project_identity.json");
living.last_updated = TODAY;
living.related_decision_ids = Array.from(
  new Set([...(living.related_decision_ids || []), DEC, "CC-DEC-099"])
);
living.scope_shift = {
  ...(living.scope_shift || {}),
  evolution_framing:
    "The project defines not only what Constitutional Capitalism is, but how Constitutional Capitalism itself should evolve.",
  eras_file: "data/project/project_eras_roadmap.json"
};
living.architectural_doctrines = living.architectural_doctrines || [];
if (!living.architectural_doctrines.some((d) => d.id === symmetry.id)) {
  living.architectural_doctrines.push(symmetry);
}
living.integrity_rules_observed = Array.from(
  new Set([
    ...(living.integrity_rules_observed || []),
    "Stop designing the future platform while Phase 2 proof remains open",
    "Phase 9 depends on Phase 2 evidence quality"
  ])
);
write("data/project/living_project_identity.json", living);

// --- Decision ---
const decisions = read("data/decisions/decisions.json");
if (!decisions.decisions.some((d) => d.decision_id === DEC)) {
  decisions.decisions.push({
    decision_id: DEC,
    title: "Constitutional Process and Constitutional Symmetry",
    question:
      "Should Constitutional Capitalism capture (1) the five-stage Discover→Prove→Write→Review→Understand process as a constitutional process of the framework with separated authorities, and (2) Constitutional Symmetry as architectural doctrine — the framework operates by the same values it advocates — without minting a new CC-PRIN-*, while affirming the Phase 8/9 architecture freeze and return to Phase 2 scholarship?",
    status: "approved",
    rationale:
      "Governance of the framework is now part of the project’s substance. Separated stage authorities and constitutional symmetry make the process internally consistent with the philosophy. Further platform design would dilute proof. No new principle ID.",
    impact: [
      "project_eras_roadmap.json constitutional_process + architectural_doctrines",
      "systems_intelligence_engine_framework.json knowledge_graph_primacy",
      "living_project_identity.json evolution framing",
      "UPD-051",
      "NO new CC-PRIN-* / NO Phase 8/9 backends"
    ],
    recommendation:
      "Approve as final meta-architecture capture for this chapter. Return immediately to Burt Step 2 / PP-FF-01.",
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
    title: "Constitutional process and constitutional symmetry",
    summary:
      "Adopts CC-DEC-100: five-stage framework process with separated authorities; Constitutional Symmetry architectural doctrine (not CC-PRIN-*); knowledge-graph primacy for Phase 9; affirms architecture freeze and return to Phase 2 scholarship (PP-FF-01 / Burt Step 2).",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

// --- Mission lock / build state ---
const lock = read("data/project/phase2_mission_lock.json");
lock.related_decision_ids = Array.from(new Set([...(lock.related_decision_ids || []), DEC]));
lock.eras_roadmap = {
  ...(lock.eras_roadmap || {}),
  meta_doctrine_decision_id: DEC,
  rule: "Era I Creation (now). Architecture chapter closed for Phase 8/9. Return to Burt Step 2 / PP-FF-01."
};
write("data/project/phase2_mission_lock.json", lock);

const cbs = read("data/project/current_build_state.json");
cbs.related_decision_ids = Array.from(new Set([...(cbs.related_decision_ids || []), DEC]));
cbs.next_action =
  "ARCHITECTURE CHAPTER CLOSED (CC-DEC-099/100). Burt step 2; PP-FF-01 with registered sources. Do NOT expand Phase 8/9 architecture. Do NOT build backends.";
cbs.writing_focus =
  "PROOF FIRST — PP-FF-01 and Burt 2–6, 8–10. Meta-architecture complete; scholarship resumes.";
write("data/project/current_build_state.json", cbs);

const fag = read("data/project/forensic_audit_governance.json");
fag.related_decision_ids = Array.from(new Set([...(fag.related_decision_ids || []), DEC]));
fag.eras_roadmap = {
  ...(fag.eras_roadmap || {}),
  meta_doctrine_decision_id: DEC,
  rule: "Constitutional process + symmetry captured. Burt returns to Step 2. Platform design paused."
};
write("data/project/forensic_audit_governance.json", fag);

const inc = read("data/project/architecture_incubator.json");
inc.related_decision_ids = Array.from(new Set([...(inc.related_decision_ids || []), DEC]));
inc.architecture_roadmap_freeze = {
  ...(inc.architecture_roadmap_freeze || {}),
  closed_by_decision_ids: ["CC-DEC-099", DEC],
  rule: "Architecture chapter closed. Default next work is proof packets, not new platform design."
};
write("data/project/architecture_incubator.json", inc);

console.log("Constitutional process + symmetry captured. Architecture chapter closed. Return to scholarship.");
