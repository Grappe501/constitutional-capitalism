/**
 * UPD-059 — Disciplinary reviewer profiles (not political identity);
 * Founding Steward beta role; multi-perspective review; coverage dashboards (deferred).
 * Not a new decision. Not Phase 8 activation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-059";
const TODAY = "2026-08-05";

const primaryExpertise = [
  "Economics",
  "Constitutional Law",
  "Political Science",
  "Public Administration",
  "Grassroots Organizing",
  "Agriculture",
  "Healthcare",
  "Municipal Finance",
  "Education",
  "Emergency Management",
  "Energy",
  "Environmental Science",
  "Tax Policy",
  "Behavioral Psychology",
  "Systems Engineering",
  "History",
  "Retirement Systems"
];

const professionalBackground = [
  "Academic",
  "Practitioner",
  "Public Official",
  "Business Leader",
  "Nonprofit Leader",
  "Community Organizer",
  "Researcher",
  "Attorney",
  "Student"
];

const analyticalPerspectives = [
  "Austrian economics",
  "Keynesian economics",
  "Public choice economics",
  "Institutional economics",
  "Cooperative economics",
  "Libertarian philosophy",
  "Progressive public policy",
  "Conservative constitutionalism",
  "Systems thinking",
  "Behavioral economics"
];

const betaRoles = [
  "Economist",
  "Constitutional lawyer",
  "Skeptical legislator",
  "Grassroots organizer",
  "County judge",
  "Farmer",
  "Community college instructor",
  "Mayor",
  "Municipal finance expert",
  "Implementation practitioner"
];

// --- Reviewers charter ---
const charter = read("data/project/reviewers_charter.json");
charter.version = "0.2.0";
charter.last_updated = TODAY;
charter.refined_as_update = UPD;
charter.culture = {
  invitation_is: "Help us make this stronger.",
  invitation_is_not: "Help us prove we're right.",
  note: "Serious scholars appreciate being invited to improve a framework rather than endorse it."
};
charter.registration_model = {
  rule: "Register by disciplinary perspective and optionally by analytical framework — not by political identity labels (e.g., libertarian, conservative, progressive as registration categories).",
  forbids: [
    "political identity as primary registration",
    "partisan labels as required profile fields",
    "reducing reviewers to ideology tags"
  ],
  primary_expertise: primaryExpertise,
  professional_background: professionalBackground,
  analytical_perspectives_optional: {
    title: "Analytical Perspectives (optional)",
    purpose:
      "Allow AI and future readers to understand the lens of a review without reducing reviewers to partisan labels.",
    options: analyticalPerspectives
  }
};
charter.multi_perspective_review = {
  title: "Multi-perspective review",
  rule: "Far more valuable than 100 general comments: the same doctrine reviewed by distinct professional perspectives.",
  example_panel: [
    "economist",
    "constitutional lawyer",
    "grassroots organizer",
    "mayor",
    "farmer",
    "municipal finance expert",
    "implementation practitioner"
  ]
};
charter.coverage_dashboard_deferred = {
  title: "Reviewer coverage dashboards (much later)",
  objective: "Show coverage, not agreement.",
  example_columns: ["Discipline", "Reviewed %", "Confidence"],
  note: "Ensure major disciplines have meaningfully engaged relevant parts of the framework — not unanimous agreement."
};
write("data/project/reviewers_charter.json", charter);

// --- CCR ---
const ccr = read("data/project/collaborative_constitutional_review_framework.json");
ccr.last_updated = TODAY;
ccr.related_decision_ids = Array.from(
  new Set([...(ccr.related_decision_ids || []), "CC-DEC-102"])
);
ccr.expertise_domains = {
  title: "Primary Expertise (disciplinary — not political identity)",
  rule: "Reviewers register by discipline and professional background; optional analytical frameworks. Not partisan labels.",
  domains: primaryExpertise
};
ccr.professional_backgrounds = professionalBackground;
ccr.analytical_perspectives_optional = analyticalPerspectives;
ccr.registration_model = charter.registration_model;
ccr.multi_perspective_review = charter.multi_perspective_review;
ccr.coverage_dashboard = charter.coverage_dashboard_deferred;
ccr.reviewers_charter = {
  ...(ccr.reviewers_charter || {}),
  refined_as_update: UPD,
  culture: charter.culture
};
ccr.founding_steward = {
  update_id: UPD,
  role_title: "Founding Steward",
  not: "author as sole identity during Beta",
  holder: "Steve",
  beta_rule:
    "Founding Steward is the BETA collaborator and goes through the entire build before anyone else.",
  responsibilities: [
    "testing every workflow",
    "reviewing every proof packet",
    "checking every review artifact",
    "exercising every governance path",
    "validating every decision ledger",
    "finding ambiguity",
    "identifying missing connections",
    "ensuring the system behaves as designed"
  ],
  software_analogy: "First end-to-end user of the governance system",
  beta_simulation: {
    rule: "During Beta, do not review only as yourself. Intentionally adopt different roles and ask: What would this reviewer object to?",
    roles: betaRoles,
    precursor_to: "Phase 9 Red Team Mode (manual precursor)"
  }
};
write("data/project/collaborative_constitutional_review_framework.json", ccr);

// --- Living identity / founding steward ---
const living = read("data/project/living_project_identity.json");
living.last_updated = TODAY;
living.founding_steward = {
  update_id: UPD,
  role_title: "Founding Steward",
  holder: "Steve",
  rule: "BETA collaborator — exercise the entire governance and research system before external reviewers. Not merely 'author.'",
  responsibilities: ccr.founding_steward.responsibilities,
  beta_simulation_roles: betaRoles
};
write("data/project/living_project_identity.json", living);

// --- Updates ---
const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Disciplinary reviewer profiles; Founding Steward beta",
    summary:
      "Under CC-DEC-096/098/102 (not a new decision; not Phase 8): reviewers register by primary expertise, professional background, and optional analytical frameworks — not political identity. Multi-perspective review and deferred coverage dashboards noted. Founding Steward (Steve) formalized as BETA end-to-end governance user with role-simulation passes. Culture: help us make this stronger.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const cbs = read("data/project/current_build_state.json");
cbs.founding_steward = {
  update_id: UPD,
  role: "Founding Steward",
  holder: "Steve",
  rule: "Beta end-to-end steward of governance system. Role simulation before external invite. PP-FF-01 remains next research milestone."
};
cbs.reviewers_charter = {
  ...(cbs.reviewers_charter || {}),
  refined_as_update: UPD,
  registration: "disciplinary + optional analytical framework — not political identity"
};
write("data/project/current_build_state.json", cbs);

console.log("UPD-059: disciplinary profiles + Founding Steward captured (deferred).");
