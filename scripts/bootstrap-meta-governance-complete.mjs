/**
 * UPD-061 — Meta-governance planning complete.
 * Three kinds of truth; independent scholarly community (not advisory board).
 * Not a new decision. Not Phase 8. Next: PP-FF-01.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-061";
const TODAY = "2026-08-05";

const progression = [
  { id: "UPD-054", text: "The project becomes a research program." },
  { id: "UPD-055", text: "Every hypothesis must survive an honest test." },
  { id: "UPD-056", text: "Credibility comes from transparent scrutiny." },
  { id: "UPD-057", text: "Architecture is complete." },
  {
    id: "UPD-058–060",
    text: "The future scholarly community is defined (charter, disciplinary profiles, Domain Stewards)."
  },
  {
    id: "UPD-061",
    text: "Meta-governance design complete; three kinds of truth separated; execution begins."
  }
];

const threeTruths = [
  {
    id: "empirical_truth",
    title: "Empirical truth",
    question: "What does the evidence show?",
    belongs_to: "proof packets"
  },
  {
    id: "normative_judgment",
    title: "Normative judgment",
    question: "What ought society to value?",
    belongs_to: "philosophy and constitutional principles"
  },
  {
    id: "design_judgment",
    title: "Design judgment",
    question:
      "Assuming our values are accepted, what institutional design best advances them?",
    belongs_to: "doctrine, modeling, and implementation work"
  }
];

const eras = read("data/project/project_eras_roadmap.json");
eras.last_updated = TODAY;
eras.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  anchored_at_decision_id: "CC-DEC-102",
  progression_upd_054_through_061: progression,
  coherent_philosophy:
    "One governance philosophy: research program → honest tests → transparent scrutiny → architecture complete → scholarly community defined → meta-governance closed → execution.",
  three_kinds_of_truth: {
    rule: "Keep empirical truth, normative judgment, and design judgment separate. Experts may agree on evidence while disagreeing on values, or share values while disagreeing on design.",
    kinds: threeTruths,
    productivity:
      "Separation prevents unnecessarily polarized debates by identifying where disagreement actually lies."
  },
  review_culture: {
    is: "A community of independent scholarly reviewers",
    is_not: "An advisory board that guides the organization",
    distinction:
      "An advisory board tends to help guide the organization. An independent scholarly community helps evaluate the work itself. Independence carefully preserved becomes a strength."
  },
  what_is_complete: [
    "Architecture has an identity",
    "Research has a methodology",
    "Future review community has a charter",
    "AI has a defined constitutional role"
  ],
  remaining_challenge: "scholarly execution — not conceptual design",
  next_milestone: "PP-FF-01"
};
eras.architecture_chapter_closed = {
  ...(eras.architecture_chapter_closed || {}),
  meta_governance_closing_update: UPD,
  status: "formally_complete"
};
write("data/project/project_eras_roadmap.json", eras);

const pbr = read("data/project/proof_burden_registry.json");
pbr.last_updated = TODAY;
pbr.three_kinds_of_truth = {
  update_id: UPD,
  rule: "Keep empirical, normative, and design disagreements separate in every proof packet and review.",
  kinds: threeTruths,
  example: {
    empirical:
      "Community ownership can increase local capital formation (evidence question)",
    normative: "Whether it should receive preferential incentives (values question)",
    design: "Which implementation mechanism to use (institutional design question)"
  }
};
pbr.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  next: "PP-FF-01 scholarly execution"
};
write("data/project/proof_burden_registry.json", pbr);

const charter = read("data/project/reviewers_charter.json");
charter.version = "0.4.0";
charter.last_updated = TODAY;
charter.refined_as_update = UPD;
charter.meta_governance_complete = true;
charter.three_kinds_of_truth = pbr.three_kinds_of_truth;
charter.review_culture = eras.meta_governance_complete.review_culture;
write("data/project/reviewers_charter.json", charter);

const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.last_updated = TODAY;
ccr.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  review_culture: eras.meta_governance_complete.review_culture,
  three_kinds_of_truth: threeTruths
};
write("data/project/collaborative_constitutional_review_framework.json", ccr);

const living = read("data/project/living_project_identity.json");
living.last_updated = TODAY;
living.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  remaining_challenge: "scholarly execution",
  next: "PP-FF-01"
};
living.three_kinds_of_truth = threeTruths;
write("data/project/living_project_identity.json", living);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Meta-governance planning complete",
    summary:
      "Under CC-DEC-102 (not a new decision): UPD-054–060 treated as one coherent governance philosophy. Meta-governance design complete. Separates empirical truth, normative judgment, and design judgment. Review culture = independent scholarly community (not advisory board). Remaining challenge is scholarly execution beginning with PP-FF-01.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.writing_focus =
  "RESEARCH EXECUTION — meta-governance complete (UPD-061). Separate empirical / normative / design. Prove PP-FF-01.";
cbs.next_action =
  "META-GOVERNANCE COMPLETE (UPD-061). Burt Step 2; execute PP-FF-01. No more planning concepts.";
cbs.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  next: "PP-FF-01"
};
write("data/project/current_build_state.json", cbs);

const lock = read("data/project/phase2_mission_lock.json");
lock.meta_governance_complete = {
  update_id: UPD,
  status: "complete",
  rule: "Planning phase closed. Execute proof packets. Do not expand meta-governance design."
};
write("data/project/phase2_mission_lock.json", lock);

console.log("UPD-061: Meta-governance planning complete. Execute PP-FF-01.");
