/**
 * UPD-064 — Rural Prosperity Campus Model + Distributed Arkansas Prosperity Network
 * as major research hypotheses (not doctrine). Linked to Rose Bud LCL.
 * Does not interrupt PP-FF-01. No new CC-PRIN-*.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`, "utf8");

const UPD = "UPD-064";
const HYP_CAMPUS = "HYP-123";
const HYP_NETWORK = "HYP-124";
const TODAY = "2026-08-05";

const campusStream = {
  stream_id: "LCL-STREAM-RURAL-PROSPERITY-CAMPUS",
  title: "Living Community Laboratory: Rural Prosperity Campus Model",
  status: "major_research_hypothesis_not_doctrine",
  hypothesis_id: HYP_CAMPUS,
  update_id: UPD,
  decision_anchor: "CC-DEC-102",
  not: ["doctrine", "pilot", "new_principle", "funded_program"],
  central_hypothesis:
    "Can a rural public education system become the coordinating institution for rebuilding a regional food economy while simultaneously improving education, workforce development, family farm profitability, and community prosperity?",
  defining_questions: [
    "Can education itself become productive economic infrastructure?",
    "Can a rural school district function as the coordinating institution for regional economic development without compromising its primary educational mission?"
  ],
  layers: [
    "Education (inside functioning businesses)",
    "Family Farm Network (partner, do not replace)",
    "Natural Resource Partnerships (eligibility-aware; no presumed funding)",
    "Food System (full value chain)",
    "Regional Business Cluster",
    "Cooperative Development (ownership pathways)",
    "Food Security (local priorities + sustainable external markets)",
    "Student Enterprises (experiential learning)",
    "Graduate Transition (relationship continues after diploma)"
  ],
  empirical_questions: [
    "Does the model improve educational outcomes?",
    "Does it strengthen family farm profitability?",
    "Does it improve workforce readiness?",
    "Does it increase entrepreneurship?",
    "Does it improve local food security?",
    "Does it attract new families?",
    "Does it become financially sustainable?",
    "Does it strengthen rather than weaken neighboring communities?",
    "Under what conditions does it succeed or fail?"
  ],
  linked_case_id: "CC-CASE-ROSEBUD-001",
  related_network_hypothesis_id: HYP_NETWORK,
  dossier_path: "content/research/hypotheses/rural-prosperity-campus.md",
  verdict_discipline: ["Supports", "Qualifies", "Contradicts"]
};

const networkHyp = {
  stream_id: "LCL-STREAM-DISTRIBUTED-PROSPERITY-NETWORK",
  title: "Distributed Arkansas Prosperity Network (research concept)",
  status: "major_research_hypothesis_not_doctrine",
  hypothesis_id: HYP_NETWORK,
  update_id: UPD,
  decision_anchor: "CC-DEC-102",
  not: ["doctrine", "statewide_mandate", "identical_campuses"],
  proposition:
    "Regional living laboratories can specialize (e.g., Rose Bud — agriculture/food; Lewisville — resource development/community wealth; others — forestry, aquaculture, manufacturing, healthcare, transportation) while sharing curriculum, research, and operational lessons as a connected, non-identical statewide knowledge network.",
  rule: "Not centralized. Not identical. Connected. Each hub contributes unique specialty expertise.",
  linked_case_ids: ["CC-CASE-ROSEBUD-001", "CC-CASE-LEWISVILLE-001"]
};

const lcl = read("data/project/living_community_laboratories.json");
lcl.version = "0.3.0";
lcl.last_updated = TODAY;
lcl.recorded_as_updates = Array.from(
  new Set([...(lcl.recorded_as_updates || []), UPD].filter(Boolean))
);
lcl.recorded_as_update = UPD;
lcl.research_streams = lcl.research_streams || [];
if (!lcl.research_streams.some((s) => s.stream_id === campusStream.stream_id)) {
  lcl.research_streams.push(campusStream);
}
if (!lcl.research_streams.some((s) => s.stream_id === networkHyp.stream_id)) {
  lcl.research_streams.push(networkHyp);
}
const rose = lcl.cases.find((c) => c.case_id === "CC-CASE-ROSEBUD-001");
if (rose) {
  rose.related_research_streams = [
    campusStream.stream_id,
    networkHyp.stream_id
  ];
  rose.rural_prosperity_campus_hypothesis_id = HYP_CAMPUS;
}
write("data/project/living_community_laboratories.json", lcl);

const updates = read("data/project/updates.json");
if (!updates.updates.some((u) => u.id === UPD)) {
  updates.updates.push({
    id: UPD,
    date: TODAY,
    title: "Rural Prosperity Campus Model (major research hypothesis)",
    summary:
      "Under CC-DEC-102 (not doctrine / not a new principle): captures Rural Prosperity Campus as Living Community Laboratory research stream (HYP-123) — education as coordinating institution for regional food economy/workforce/farm prosperity. Nine ecosystem layers for study. Defining questions: education as productive economic infrastructure; school as economic coordinator without compromising educational mission. Related HYP-124 Distributed Arkansas Prosperity Network. Linked to Rose Bud case. Does not interrupt PP-FF-01.",
    public: true
  });
  updates.last_updated = TODAY;
  write("data/project/updates.json", updates);
}

const inc = read("data/project/architecture_incubator.json");
const cards = inc.hypothesis_cards || [];
if (!cards.some((h) => h.hypothesis_id === HYP_CAMPUS)) {
  cards.push({
    hypothesis_id: HYP_CAMPUS,
    title: "Rural Prosperity Campus Model",
    proposition:
      "A rural public education system can become the coordinating institution for rebuilding a regional food economy while improving education, workforce development, family farm profitability, and community prosperity — with the high school as anchor of a multi-layer ecosystem (farms, food chain, business cluster, cooperatives, food security, student enterprises, graduate transition) — without compromising its primary educational mission. Unproven; research only.",
    status: "Major research hypothesis — not doctrine",
    publishable: false,
    confidence_percent: 5,
    related_principle_ids: [],
    related_decision_ids: ["CC-DEC-102", "CC-DEC-089"],
    related_framework: "data/project/living_community_laboratories.json",
    public_path: null,
    evidence_needed: [
      "Educational outcome measures for campus-style models",
      "Family farm partnership / profitability evidence",
      "Enrollment economics and mission-integrity safeguards",
      "Food-system and cooperative case literature",
      "Neighboring-district and equity impacts",
      "Financial sustainability without presumed grant stacks"
    ],
    proof_packet_status: "not_started",
    note: "Not doctrine. Linked to Rose Bud LCL. Priority remains PP-FF-01.",
    dossier_path: "content/research/hypotheses/rural-prosperity-campus.md"
  });
}
if (!cards.some((h) => h.hypothesis_id === HYP_NETWORK)) {
  cards.push({
    hypothesis_id: HYP_NETWORK,
    title: "Distributed Arkansas Prosperity Network",
    proposition:
      "Specialized regional living laboratories can form a connected, non-identical statewide network sharing curriculum, research, and lessons — each hub excellent at something different (agriculture, resource wealth, forestry, manufacturing, healthcare, etc.).",
    status: "Major research hypothesis — not doctrine",
    publishable: false,
    confidence_percent: 4,
    related_principle_ids: [],
    related_decision_ids: ["CC-DEC-102", "CC-DEC-097"],
    related_framework: "data/project/living_community_laboratories.json",
    public_path: null,
    evidence_needed: [
      "Comparable multi-campus / hub-network education models",
      "Governance of shared curriculum without homogenizing communities",
      "Knowledge-graph / lesson-sharing feasibility"
    ],
    proof_packet_status: "not_started",
    note: "Depends on successful individual LCL case methodology. Not statewide doctrine."
  });
}
inc.hypothesis_cards = cards;
inc.last_updated = TODAY;
write("data/project/architecture_incubator.json", inc);

const pbr = read("data/project/proof_burden_registry.json");
pbr.rural_prosperity_campus = {
  update_id: UPD,
  hypothesis_id: HYP_CAMPUS,
  rule: "Major research hypothesis under falsifiability standard. Not doctrine. Empirical questions only until evidence graduates."
};
write("data/project/proof_burden_registry.json", pbr);

const cbs = read("data/project/current_build_state.json");
cbs.living_community_laboratories = {
  ...(cbs.living_community_laboratories || {}),
  update_id: UPD,
  research_streams: [campusStream.stream_id, networkHyp.stream_id],
  rule: "Rural Prosperity Campus = research hypothesis, not doctrine. PP-FF-01 remains next execution milestone."
};
write("data/project/current_build_state.json", cbs);

console.log("UPD-064: Rural Prosperity Campus + Distributed Network hypotheses captured.");
