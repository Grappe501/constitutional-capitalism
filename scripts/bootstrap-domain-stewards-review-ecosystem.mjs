/**
 * UPD-060 — Domain Stewards + review ecosystem (stress-test, not consensus).
 * Not a new decision. Not Phase 8 activation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-060";
const TODAY = "2026-08-05";

const complementaryDomains = [
  {
    domain: "Economics",
    examines: ["incentives", "capital formation", "markets", "public finance", "opportunity costs"]
  },
  {
    domain: "Grassroots organizing",
    examines: [
      "implementation in real communities",
      "civic participation",
      "coalition-building",
      "human behavior"
    ]
  },
  {
    domain: "Engineering and systems thinking",
    examines: ["robustness", "dependencies", "failure modes", "optimization", "scalability"]
  },
  {
    domain: "Urban planning",
    examines: [
      "land use",
      "transportation",
      "housing",
      "regional development",
      "municipal systems"
    ]
  },
  {
    domain: "Government leadership",
    examines: [
      "political feasibility",
      "administration",
      "institutional design",
      "constitutional authority"
    ]
  }
];

const ecosystem = [
  {
    id: "domain_steward",
    title: "Domain Steward",
    role: "Long-term subject-matter reviewer",
    core_question: "Has this domain been treated fairly, rigorously, and accurately?",
    not: "Expected to agree with the framework or certify that proposals are optimal"
  },
  {
    id: "contributing_reviewer",
    title: "Contributing Reviewer",
    role: "Specialist who reviews specific proof packets"
  },
  {
    id: "methodology_reviewer",
    title: "Methodology Reviewer",
    role: "Expert who evaluates the research process itself"
  },
  {
    id: "implementation_reviewer",
    title: "Implementation Reviewer",
    role: "Practitioner who assesses operational feasibility"
  },
  {
    id: "cross_domain_reviewer",
    title: "Cross-Domain Reviewer",
    role: "Spans multiple disciplines; identifies interactions between fields"
  }
];

const charter = read("data/project/reviewers_charter.json");
charter.version = "0.3.0";
charter.last_updated = TODAY;
charter.refined_as_updates = Array.from(
  new Set([...(charter.refined_as_updates || []), charter.refined_as_update, UPD].filter(Boolean))
);
charter.refined_as_update = UPD;
charter.panel_purpose = {
  text: "Assemble a panel to stress-test the framework from fundamentally different domains of expertise — not to reach consensus.",
  complementary_not_overlapping: true,
  example_dimensions: complementaryDomains
};
charter.domain_steward = {
  title: "Domain Steward",
  rule: "Once the project reaches that stage, think of long-term subject-matter reviewers as Domain Stewards — not primarily as collaborators seeking agreement.",
  core_question: "Has this domain been treated fairly, rigorously, and accurately?",
  economist_certifies: [
    "economic reasoning is coherent",
    "assumptions are explicit",
    "tradeoffs are acknowledged",
    "literature is represented fairly",
    "uncertainties are honestly stated"
  ],
  engineer_helps_determine: [
    "whether the system behaves coherently under stress",
    "whether hidden dependencies or failure modes have been overlooked"
  ],
  not: ["endorse policy", "certify every proposal is optimal", "agree with every conclusion"]
};
charter.independence = {
  title: "Preserve independence",
  do_not_ask: "Will you support Constitutional Capitalism?",
  ask: "Will you independently review this work within your area of expertise and tell us where it is strong, where it is weak, and where it requires further research?",
  why: "If reviewers become advocates, readers may question objectivity. Independent experts carry more weight—even when they disagree."
};
charter.future_endorsement_ideal = {
  text: "I disagree with several conclusions, but the work accurately represents my field, engages the strongest counterarguments, and treats the evidence honestly.",
  value: "Speaks to integrity of process rather than agreement with outcome"
};
charter.review_ecosystem = {
  title: "Review ecosystem (deferred)",
  roles: ecosystem,
  aligns_with: "evidence, transparency, and disciplined inquiry — not consensus-building"
};
charter.culture = {
  ...(charter.culture || {}),
  invitation_is: "Help us make this stronger.",
  invitation_is_not: "Help us prove we're right.",
  reinforcement:
    "The project is not asking experts to endorse a conclusion. It is asking them to improve the quality of the scholarship."
};
if (!charter.registration_model.primary_expertise.includes("Urban Planning")) {
  charter.registration_model.primary_expertise.push("Urban Planning");
}
if (!charter.registration_model.primary_expertise.includes("Political Science")) {
  /* already present typically */
}
write("data/project/reviewers_charter.json", charter);

const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.last_updated = TODAY;
ccr.panel_purpose = charter.panel_purpose;
ccr.domain_steward = charter.domain_steward;
ccr.independence = charter.independence;
ccr.review_ecosystem = charter.review_ecosystem;
ccr.future_endorsement_ideal = charter.future_endorsement_ideal;
ccr.founding_steward = {
  ...(ccr.founding_steward || {}),
  distinction:
    "Founding Steward (Steve, Beta) exercises the whole system. Domain Stewards are long-term independent subject-matter reviewers for specific disciplines — not the same role."
};
const domains = ccr.expertise_domains?.domains || [];
if (!domains.includes("Urban Planning")) domains.push("Urban Planning");
if (!domains.includes("Systems Engineering")) domains.push("Systems Engineering");
if (!domains.includes("Grassroots Organizing")) domains.push("Grassroots Organizing");
if (!domains.includes("Political Science")) domains.push("Political Science");
ccr.expertise_domains = {
  ...(ccr.expertise_domains || {}),
  domains
};
ccr.reviewers_charter = {
  ...(ccr.reviewers_charter || {}),
  refined_as_update: UPD
};
write("data/project/collaborative_constitutional_review_framework.json", ccr);

const living = read("data/project/living_project_identity.json");
living.last_updated = TODAY;
living.domain_stewards = {
  update_id: UPD,
  core_question: "Has this domain been treated fairly, rigorously, and accurately?",
  independence_ask: charter.independence.ask,
  distinguished_from_founding_steward: true
};
write("data/project/living_project_identity.json", living);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Domain Stewards and independent review ecosystem",
    summary:
      "Under CC-DEC-096/098/102 (not a new decision; not Phase 8): panels stress-test from complementary domains, not consensus. Domain Stewards answer whether a domain was treated fairly/rigorously/accurately. Independence preserved (review, not support). Review ecosystem roles: Domain Steward, Contributing, Methodology, Implementation, Cross-Domain. Ideal endorsement: disagree with conclusions but affirm honest treatment of the field.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.reviewers_charter = {
  ...(cbs.reviewers_charter || {}),
  refined_as_update: UPD,
  panel_purpose: "stress-test complementary domains — not consensus",
  domain_steward_core_question:
    "Has this domain been treated fairly, rigorously, and accurately?"
};
write("data/project/current_build_state.json", cbs);

console.log("UPD-060: Domain Stewards + review ecosystem captured (deferred).");
