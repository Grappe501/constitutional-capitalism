/**
 * UPD-063 — Rose Bud Rural Education and Farm Community Laboratory (second LCL).
 * Not a pilot. Not a funding claim. Does not displace PP-FF-01.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-063";
const HYP = "HYP-122";
const TODAY = "2026-08-05";
const CASE = "CC-CASE-ROSEBUD-001";

const roseBudCase = {
  case_id: CASE,
  title: "Rose Bud Rural Education and Farm Community Laboratory",
  community: "Rose Bud",
  status: "architecture_scaffold_only",
  kind: "living_community_laboratory",
  not: ["pilot", "approved_funding_claim", "authorized_implementation"],
  hypothesis_id: HYP,
  dossier_path: "content/research/case-studies/rose-bud/00-overview.md",
  complements: {
    case_id: "CC-CASE-LEWISVILLE-001",
    lewisville_pathway: "resource development, local ownership, infrastructure, community wealth",
    rose_bud_pathway:
      "rural education, agriculture, workforce preparation, population attraction, long-term community renewal"
  },
  central_research_question:
    "Can a rural public school district become a regional education, agriculture, and skilled-trades hub that attracts students, strengthens the local economy, supports family farms, and creates a sustainable pathway for community growth?",
  working_concept: {
    note: "Unproven design agenda for research — not a claim of feasibility or funding.",
    grades: "9–12",
    regional_transportation: true,
    housing: "graduated stages only after demonstrated demand and capacity"
  },
  first_research_gate: {
    title: "Student funding / enrollment economics",
    critical_calculation:
      "Marginal recurring revenue per additional student minus full marginal cost of instruction, transportation, housing, food, staffing, student services, facilities, and compliance",
    must_distinguish: [
      "transfers from another Arkansas district",
      "school choice participants",
      "specialized programs while enrolled elsewhere",
      "temporary residence in district",
      "interdistrict agreements",
      "residential students",
      "CTE funding",
      "weighted or categorical funding",
      "transportation funding",
      "facilities funding",
      "special-education responsibilities",
      "federal program eligibility"
    ]
  },
  arkansas_learns: {
    rule: "Do not assume Arkansas LEARNS automatically authorizes or funds the model. Tie each element to actual statutory or regulatory authority."
  },
  funding_map_rule:
    "USDA and other programs are potential tools, not presumed sources. Record eligibility, allowable use, match, renewal, timing, operations vs capital.",
  housing_stages: [
    "Stage 1 — Regional commuting",
    "Stage 2 — Limited weekly housing",
    "Stage 3 — Education village",
    "Stage 4 — Community growth housing"
  ],
  scenarios: [
    "Existing trajectory",
    "Regional career academy",
    "Rural education and trade hub",
    "Residential rural innovation center (housing only after earlier sustainability)"
  ],
  proper_status_statement:
    "Rose Bud Rural Education and Farm Community Laboratory — architecture scaffold only; statutory authority, enrollment economics, funding eligibility, community demand, and implementation feasibility remain unproven.",
  honesty_rules: [
    "Do not invent Rose Bud enrollment, finance, LEARNS, or USDA conclusions",
    "Do not treat as pilot or claim existing funding will support the concept",
    "Do not interrupt PP-FF-01",
    "Baseline and legal claims require registered sources only"
  ]
};

const lcl = read("data/project/living_community_laboratories.json");
lcl.version = "0.2.0";
lcl.last_updated = TODAY;
lcl.recorded_as_updates = Array.from(
  new Set([...(lcl.recorded_as_updates || []), lcl.recorded_as_update, UPD].filter(Boolean))
);
lcl.recorded_as_update = UPD;
lcl.paired_pathways = {
  update_id: UPD,
  rule: "Lewisville and Rose Bud are complementary Living Community Laboratories testing different prosperity pathways — resource/community wealth vs education/agriculture/renewal.",
  cases: ["CC-CASE-LEWISVILLE-001", CASE]
};
if (!lcl.cases.some((c) => c.case_id === CASE)) {
  lcl.cases.push(roseBudCase);
}
write("data/project/living_community_laboratories.json", lcl);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Rose Bud Rural Education and Farm Community Laboratory",
    summary:
      "Under CC-DEC-102 (not a new decision): captures Rose Bud as second Living Community Laboratory (CC-CASE-ROSEBUD-001 / HYP-122) — rural education/agriculture/trades hub hypothesis complementary to Lewisville. Architecture scaffold only; not a pilot; funding and LEARNS authority unproven. First research gate = marginal enrollment economics. Does not interrupt PP-FF-01.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const inc = read("data/project/architecture_incubator.json");
const cards = inc.hypothesis_cards || [];
if (!cards.some((h) => h.hypothesis_id === HYP)) {
  cards.push({
    hypothesis_id: HYP,
    title: "Rose Bud Rural Education and Farm Community Laboratory",
    proposition:
      "A rural public school district could become a regional education, agriculture, and skilled-trades hub that attracts students and strengthens local farms and economy — but only if enrollment economics, statutory authority (including Arkansas LEARNS), funding eligibility, transportation, graduated housing, and community impacts are honestly researched. Status: architecture scaffold only; unproven.",
    status: "Research hypothesis — case scaffold only",
    publishable: false,
    confidence_percent: 6,
    related_principle_ids: [],
    related_decision_ids: ["CC-DEC-102", "CC-DEC-089"],
    related_framework: "data/project/living_community_laboratories.json",
    public_path: null,
    evidence_needed: [
      "Arkansas LEARNS / school-choice / funding statute map",
      "Marginal revenue vs marginal cost model for additional students",
      "Transportation feasibility study",
      "USDA and non-USDA funding eligibility matrix (operations vs capital)",
      "Community demand and safeguarding capacity for any housing stage",
      "Neighboring-district impact analysis"
    ],
    proof_packet_status: "not_started",
    note: "Not a pilot. Not a funding claim. Complements HYP-121 Lewisville. Priority remains PP-FF-01."
  });
}
inc.hypothesis_cards = cards;
inc.last_updated = TODAY;
write("data/project/architecture_incubator.json", inc);

const cbs = read("data/project/current_build_state.json");
cbs.living_community_laboratories = {
  update_id: UPD,
  cases: ["CC-CASE-LEWISVILLE-001", CASE],
  rule: "Scaffolds only. Not pilots. Do not invent local stats or funding. PP-FF-01 remains next execution milestone."
};
write("data/project/current_build_state.json", cbs);

const eras = read("data/project/project_eras_roadmap.json");
eras.living_community_laboratories = {
  ...(eras.living_community_laboratories || {}),
  update_id: UPD,
  cases: ["CC-CASE-LEWISVILLE-001", CASE],
  rule: "Paired pathways: Lewisville (resource/wealth) · Rose Bud (education/agriculture/renewal). Case study ≠ pilot."
};
write("data/project/project_eras_roadmap.json", eras);

console.log("UPD-063: Rose Bud Laboratory scaffold captured (not a pilot).");
