/**
 * CC-PHASE-2.1-RURAL-CTE-SPECIALTY-MAGNET-RESEARCH-HYPOTHESIS-1.0
 *
 * Record education research hypothesis (NOT doctrine):
 * Can Arkansas elevate CTE to equal institutional prestige via regional specialty magnets?
 * Build on existing Act 237 / Act 242 / Secondary Career Centers — not "start taking trades seriously."
 * Correct magnet-placement premise; specialization follows regional opportunity (workforce data).
 * Falsify hard: graduate retention / local economic development vs train-and-export.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-RURAL-CTE-SPECIALTY-MAGNET-RESEARCH-HYPOTHESIS-1.0";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";

function writeJson(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function writeText(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const geoSet = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_designated_research_geography_set.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const newSources = [
  {
    source_id: "CC-SRC-131",
    title: "2026-2027 CTE High-Demand and High-Wage (H2) Pathways",
    authors: ["Arkansas Department of Education"],
    year: 2026,
    url: "https://adecm.ade.arkansas.gov/ViewApprovedMemo.aspx?Id=5822",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2026-02-09",
    retrieval_date: TODAY,
    summary:
      "ADE Commissioner's Memo CTE-26-004: Act 237 of 2023 requires districts to offer at least one High Demand/High Wage (H2) CTE pathway. For 2026–27, ADE recognizes 29 H2 pathways aligned to SOC codes using Arkansas workforce demand and MIT living-wage wage thresholds. Documents that Arkansas already treats high-demand CTE pathways as a statutory district obligation — not a blank slate for 'starting to take trades seriously.'",
    key_findings: [
      "Act 237 requires ≥1 H2 CTE pathway per district",
      "29 H2 pathways recognized for 2026–27",
      "H2 defined via forecast demand and living-wage median wage thresholds"
    ],
    limitations: "Does not prove equal institutional prestige with AP/arts/athletics; pathway list changes annually.",
    ideological_or_institutional_considerations: "Official ADE.",
    verification_status: "url_verified_via_fetch",
    notes: "Foundation for elevating CTE — existing statutory H2 obligation."
  },
  {
    source_id: "CC-SRC-132",
    title: "CTE Course Substitution Crosswalk (ACT 242)",
    authors: ["Arkansas Department of Education"],
    year: 2025,
    url: "https://adecm.ade.arkansas.gov/ViewApprovedMemo.aspx?Id=5747",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "ADE Commissioner's Memo CTE-25-020 on Act 242 of 2023: creates process for students to substitute comparable CTE elective coursework for required core academic graduation courses via annual ADE crosswalk. Structural flexibility for academic+applied integration research — not proof that prestige equality already exists.",
    key_findings: [
      "Act 242 authorizes comparable CTE coursework to substitute for core graduation requirements",
      "ADE publishes annual substitution crosswalk"
    ],
    limitations: "Substitution ≠ institutional prestige equivalence; crosswalk updates annually.",
    ideological_or_institutional_considerations: "Official ADE.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Supports academic-through-application design hypothesis."
  },
  {
    source_id: "CC-SRC-133",
    title: "Act 242 of 2023 — CTE Comparable Coursework Substitution",
    authors: ["Arkansas General Assembly"],
    year: 2023,
    url: "https://arkleg.state.ar.us/Acts/FTPDocument?ddBienniumSession=2023%2F2023R&file=242.pdf&path=%2FACTS%2F2023R%2FPublic%2F",
    source_type: "statute",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2023",
    retrieval_date: TODAY,
    summary:
      "Arkansas Act 242 of 2023 amends academic-standards statute to require DESE to include means for public-school students to substitute comparable CTE elective coursework for required core academic classes, with an approval/crosswalk process.",
    key_findings: [
      "Statutory basis for CTE-core substitution exists",
      "Requires annual certification of eligible alignments"
    ],
    limitations: "Does not mandate specialty magnet campuses or prestige reform.",
    ideological_or_institutional_considerations: "Primary statute.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Primary law behind CC-SRC-132."
  },
  {
    source_id: "CC-SRC-134",
    title: "Career and Technical Education Presentation (Adequacy)",
    authors: ["Arkansas Bureau of Legislative Research / Adequacy materials"],
    year: 2024,
    url: "https://arkleg.state.ar.us/Home/FTPDocument?path=%2FEducation%2FAdequacyReports%2F2024%2F2024-06-04%2FCareer+and+Technical+Education+Presentation.pdf",
    source_type: "legislative_research",
    reliability: "secondary_official",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2024-06-04",
    retrieval_date: TODAY,
    summary:
      "Arkansas legislative adequacy CTE presentation summarizing Secondary Technical Centers / career centers, Act 237 career-ready pathway requirements, Act 242 CTE substitution, and related CTE structure. Useful overview of existing shared advanced CTE facilities and statutory architecture supporting regional access research.",
    key_findings: [
      "Secondary career/technical centers provide shared advanced CTE access across districts",
      "LEARNS/Act 237 career-ready pathway and H2 alignment summarized",
      "Act 242 CTE substitution summarized"
    ],
    limitations:
      "Presentation summary — verify dollar figures and participation unevenness against full adequacy report worksheets before citing precise aid amounts.",
    ideological_or_institutional_considerations: "Legislative research / adequacy process.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Use for structure; dollar amounts need worksheet confirmation (CC-RQ funding map)."
  },
  {
    source_id: "CC-SRC-135",
    title: "LEARNS — Home",
    authors: ["Arkansas Department of Education"],
    year: 2026,
    url: "https://learns.ade.arkansas.gov/",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "ADE LEARNS portal summarizing Arkansas education reform priorities including career readiness emphasis. Context for internship/apprenticeship and CTE alignment with high-demand jobs — verify specific statutory mandates in Act 237 materials rather than portal marketing alone.",
    key_findings: [
      "LEARNS frames career readiness / workforce alignment as state priority",
      "Portal points to related ADE CTE/career resources"
    ],
    limitations: "Portal overview; not a substitute for statute/memo primary sources.",
    ideological_or_institutional_considerations: "Official ADE reform brand.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Contextual; prefer Act 237/ADE memos for claims."
  },
  {
    source_id: "CC-SRC-136",
    title: "Little Rock School Desegregation Cases (1982–2014)",
    authors: ["Encyclopedia of Arkansas"],
    year: 2024,
    url: "https://encyclopediaofarkansas.net/entries/little-rock-school-desegregation-cases-7997/",
    source_type: "encyclopedia",
    reliability: "secondary_reference",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas / Little Rock",
    research_domain: "education_history",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "Encyclopedia of Arkansas entry on Little Rock desegregation litigation: magnet schools and transportation were part of court-supervised desegregation remedies. Used to CORRECT the inaccurate premise that magnet schools are generally defined as schools placed in low-socioeconomic areas; historical magnets often tied to desegregation strategies.",
    key_findings: [
      "Little Rock magnets historically linked to desegregation remedies",
      "Magnet placement history ≠ 'generally low-SES by definition'"
    ],
    limitations: "Encyclopedia secondary; national magnet history is broader than Little Rock.",
    ideological_or_institutional_considerations: "CALS Encyclopedia of Arkansas.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Corrects false premise; supports deliberate opportunity-anchor placement principle."
  }
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
writeJson("data/research/source_registry.json", srcDoc);

// ============================================================================
// Geography: add Rose Bud candidate + education specialty candidate notes
// ============================================================================

const roseBud = {
  id: "AR-GEO-ROSE-BUD",
  name: "Rose Bud, Arkansas",
  type: "municipality",
  counties: ["White"],
  status: "CANDIDATE",
  research_archetype:
    "Agriculture / food systems / animal science / rural entrepreneurship education anchor (candidate)",
  contrast_role: "candidate rural specialty CTE / agriculture-education geography",
  research_purpose:
    "Study whether a rigorous agriculture/food-systems specialty campus can expand opportunity and local economic capacity without becoming a train-and-export pipeline.",
  research_posture:
    "Candidate geography. Specialty pathways and economic effects must be established from workforce, enrollment, and outcome evidence before canonical use.",
  related_education_hypothesis: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
  candidate_specialty_pathways_hypothesis_only: [
    "Agriculture",
    "Food production / processing",
    "Animal science",
    "Agricultural technology",
    "Rural entrepreneurship / business development"
  ],
  pathway_rule:
    "Specialization follows regional economic and human-capital opportunity from workforce data — not cookie-cutter statewide curriculum."
};

const iRose = geoSet.locations.findIndex((x) => x.id === roseBud.id);
if (iRose >= 0) geoSet.locations[iRose] = { ...geoSet.locations[iRose], ...roseBud };
else geoSet.locations.push(roseBud);

const educationNotes = {
  AR_GEO_WEST_HELENA: {
    candidate_specialty_pathways_hypothesis_only: [
      "Delta agriculture / food systems",
      "River / logistics",
      "Diesel technology",
      "Industrial maintenance",
      "Healthcare (if demand evidenced)"
    ],
    note: "Hypothesis only — establish from regional workforce/demand data."
  },
  AR_GEO_SEARCY_COUNTY: {
    candidate_specialty_pathways_hypothesis_only: [
      "Forestry",
      "Construction trades",
      "Rural utilities",
      "Heavy equipment",
      "Conservation / outdoor industries",
      "Healthcare / emergency services"
    ],
    note: "Hypothesis only."
  },
  AR_GEO_MISSISSIPPI_COUNTY: {
    candidate_specialty_pathways_hypothesis_only: [
      "Advanced manufacturing / steel",
      "Mechatronics",
      "Welding",
      "Robotics",
      "Industrial electrical",
      "Logistics"
    ],
    note: "Hypothesis only — industrial economy suggests candidates; do not assume without data."
  }
};

for (const loc of geoSet.locations) {
  const key = loc.id.replace(/-/g, "_");
  // map id styles
  if (loc.id === "AR-GEO-WEST-HELENA") {
    loc.education_specialty_candidate = educationNotes.AR_GEO_WEST_HELENA;
  }
  if (loc.id === "AR-GEO-SEARCY-COUNTY") {
    loc.education_specialty_candidate = educationNotes.AR_GEO_SEARCY_COUNTY;
  }
  if (loc.id === "AR-GEO-MISSISSIPPI-COUNTY") {
    loc.education_specialty_candidate = educationNotes.AR_GEO_MISSISSIPPI_COUNTY;
  }
}

geoSet.version = "1.2.0";
geoSet.location_count = geoSet.locations.length;
geoSet.education_research_link = {
  hypothesis_id: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
  module_id: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
  placement_principle:
    "Place exceptional educational assets in communities where those assets can expand opportunity and become anchors for broader economic renewal — not a false claim that magnets are generally defined by low-SES siting.",
  specialization_rule:
    "Specialization follows the economic and human-capital opportunities of the region, not a statewide cookie-cutter curriculum."
};
geoSet.slice_id = SLICE;
geoSet.last_updated = TODAY;
writeJson("research/phase_2/arkansas_designated_research_geography_set.json", geoSet);

writeText(
  "reports/CC_ARKANSAS_DESIGNATED_RESEARCH_GEOGRAPHY_SET_1_0.md",
  `# Arkansas Designated Research Geography Set 1.2

**Status:** Active sampling preference when geography is required.  
**Locations:** ${geoSet.locations.length} (includes CANDIDATE ag pair + Rose Bud education candidate).

## Selection rule

Prefer designated set by research question, data quality, contrast, replicability — not expected results.

## Education research link

Hypothesis: \`CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK\`

**Placement principle:** Place exceptional educational assets where they expand opportunity and can anchor economic renewal.  
**Do not** claim magnets are generally defined as low-SES placements (desegregation history is distinct — CC-SRC-136).

**Specialization rule:** Pathways follow regional opportunity / workforce data — not cookie-cutter curricula.

Candidate specialty notes on West Helena, Searcy County, Mississippi County, and Rose Bud are **hypotheses only**.
`
);

// ============================================================================
// Education hypothesis registry + module
// ============================================================================

const hypRegistry = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "RESEARCH_HYPOTHESES_NOT_DOCTRINE",
  hypotheses: [
    {
      hypothesis_id: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
      text: "A geographically distributed network of rigorous specialty CTE magnet schools may expand educational opportunity in rural and distressed communities while simultaneously developing workforce capacity, attracting industry, supporting entrepreneurship, and strengthening regional economic resilience.",
      epistemic_class: "HYPOTHESIS",
      module_id: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
      not_empirical_proof: true,
      deliberate_falsification: true,
      obsolete_framing_rejected:
        "Should Arkansas start taking trades seriously? — REJECTED. Arkansas already has Act 237 H2 pathways, Act 242 substitution, and Secondary Career Centers.",
      stronger_research_question:
        "Can Arkansas elevate career and technical education to the same institutional prestige, academic expectation, and statewide specialty infrastructure that it gives mathematics, science, arts, and college preparation — particularly by locating advanced regional trade magnets in rural and economically distressed communities?",
      equality_of_prestige_principle:
        "Trades/applied specialties should signal institutional equivalence to advanced math, AP science, fine arts, and athletics — rigorous different advanced education, not easier school.",
      academic_applied_integration:
        "Resist trades-vs-math split; teach math/science through sophisticated application (welding→geometry/metallurgy/physics; electrical→math/circuitry; agriculture→biology/chemistry/economics/data; construction→geometry/structures/PM/finance; advanced manufacturing→programming/robotics/measurement/stats).",
      placement_principle:
        "Place exceptional educational assets in communities where they expand opportunity and can anchor economic renewal.",
      false_premise_corrected:
        "Do not canonize 'magnet schools are generally put in low socioeconomic areas.' Historical magnets often tied to desegregation (CC-SRC-136).",
      success_criterion_critical:
        "Training people for jobs elsewhere is not rural revitalization. Success requires ownership, businesses, infrastructure, and quality of life that give graduates reason and opportunity to build futures in the community.",
      ecosystem_hypothesis_chain: [
        "School",
        "Trade instructors",
        "Students",
        "Apprentices",
        "Local employers",
        "New businesses",
        "Community college partnerships",
        "Equipment/training facilities",
        "Housing demand",
        "New families",
        "Stronger tax base"
      ],
      working_name_concept_not_brand:
        "Arkansas Academies of Applied Science, Trades, and Rural Innovation (research label only)",
      related_geographies: [
        "AR-GEO-ROSE-BUD",
        "AR-GEO-WEST-HELENA",
        "AR-GEO-SEARCY-COUNTY",
        "AR-GEO-MISSISSIPPI-COUNTY"
      ],
      sources_foundation: [
        "CC-SRC-131",
        "CC-SRC-132",
        "CC-SRC-133",
        "CC-SRC-134",
        "CC-SRC-135",
        "CC-SRC-136"
      ],
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID,
        reason: "Record research hypothesis; try hard to prove wrong before any doctrine."
      },
      last_updated: TODAY,
      slice_id: SLICE
    },
    {
      hypothesis_id: "CC-HYP-EDUCATION-AS-PRODUCTIVE-INFRASTRUCTURE",
      text: "Education itself can function as productive economic infrastructure — not only as human-capital export — when specialty institutions are coupled to local ownership, employer partnerships, and community quality-of-life conditions that retain graduates.",
      epistemic_class: "HYPOTHESIS",
      parent_hypothesis_id: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
      not_empirical_proof: true,
      deliberate_falsification: true,
      governance: {
        decision: "KEEP_AS_HYPOTHESIS",
        adjudicator: ADJUDICATOR,
        decision_id: DECISION_ID
      },
      last_updated: TODAY,
      slice_id: SLICE
    }
  ]
};
writeJson("research/phase_2/education_research_hypothesis_registry.json", hypRegistry);

const module = {
  version: "0.1.0",
  status: "OPEN",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
  status_note: "RESEARCH MODULE — not doctrine, not campus launch",
  primary_hypothesis_id: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
  primary_research_question:
    "Can Arkansas elevate career and technical education to the same institutional prestige, academic expectation, and statewide specialty infrastructure that it gives mathematics, science, arts, and college preparation — particularly by locating advanced regional trade magnets in rural and economically distressed communities?",
  existing_foundation: {
    act_237_h2_pathways: "CC-SRC-131",
    act_242_cte_substitution: ["CC-SRC-132", "CC-SRC-133"],
    secondary_career_centers: "CC-SRC-134",
    learns_context: "CC-SRC-135"
  },
  model_elements_to_research: [
    "Grades 9–12 specialty magnets with full academic core",
    "Limited specialties per campus (exceptional at few things)",
    "Regional enrollment catchment (districts, buses, career-center relationships, concurrent enrollment, choice where lawful; residential options only if evidence supports)",
    "Employer partnerships / apprenticeships / co-op / paid work in grades 11–12",
    "Business-provided equipment/labs vs school buying everything",
    "Equality-of-prestige institutional signaling",
    "Academic-through-application curriculum design using Act 242 flexibility"
  ],
  funding_map_required_before_design: [
    "Arkansas Secondary Career Center / vocational-center aid (confirm adequacy worksheets)",
    "H2 pathway incentives",
    "Perkins V",
    "WIOA",
    "Apprenticeship funding",
    "Concurrent-credit mechanisms",
    "Workforce-development grants",
    "Employer investment / equipment donations",
    "Community-college partnerships",
    "Rural-development funding where applicable",
    "Capital/facilities funding"
  ],
  falsification_agenda: [
    "Existing Secondary Career Center outcomes (earnings, credentials, placement)",
    "Successful rural CTE/magnet models in other states — and failures",
    "Enrollment effects and cream-skimming / sending-district fiscal impacts",
    "Transportation barriers and distance non-participation",
    "Graduate earnings and employer outcomes",
    "Whether specialized schools produce broader local economic development",
    "OR merely train young people who leave (train-and-export failure mode)",
    "District finances and sustainability after grants end"
  ],
  related_geographies: [
    "AR-GEO-ROSE-BUD",
    "AR-GEO-WEST-HELENA",
    "AR-GEO-SEARCY-COUNTY",
    "AR-GEO-MISSISSIPPI-COUNTY"
  ],
  not_in_this_slice: [
    "Campus construction recommendation",
    "Doctrine expansion",
    "Canonizing pathway lists by town",
    "Funding architecture invention",
    "False claim that magnets are generally low-SES by definition"
  ]
};
writeJson("research/phase_2/arkansas_rural_cte_specialty_magnet_module.json", module);

writeText(
  "reports/CC_ARKANSAS_RURAL_CTE_SPECIALTY_MAGNET_RESEARCH_HYPOTHESIS_1_0.md",
  `# Rural CTE Specialty Magnet Research Hypothesis 1.0

**Status:** RESEARCH HYPOTHESIS — not doctrine · not campus launch

## Wrong question (rejected)

> Should Arkansas start taking trades seriously?

Arkansas already requires H2 CTE pathways (Act 237), allows CTE-core substitution (Act 242), and operates Secondary Career Centers.

## Right question

> Can Arkansas elevate CTE to the same institutional prestige, academic expectation, and statewide specialty infrastructure as math, science, arts, and college preparation — especially via advanced regional trade magnets in rural and distressed communities?

## Primary hypothesis

\`CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK\`

A geographically distributed network of rigorous specialty CTE magnets may expand rural opportunity **and** strengthen regional economic resilience — **if** graduates have reasons and opportunities to build futures locally.

## Critical success test

**Training people for jobs elsewhere is not rural revitalization.**

## Placement principle (corrected)

Place exceptional educational assets where they expand opportunity and can anchor renewal.  
Do **not** say magnets are generally low-SES by definition (desegregation history ≠ that claim).

## Specialization rule

Pathways follow regional workforce opportunity — West Helena / Searcy County / Mississippi County / Rose Bud specialty lists are **hypotheses only**.

## First research pass

Career Center outcomes · out-of-state rural CTE/magnet models · transportation · earnings · employer outcomes · local economic development vs train-and-export · funding sustainability.
`
);

const rqs = [
  {
    id: "CC-RQ-P21-043",
    question: module.primary_research_question,
    status: "open",
    domain: "education_cte",
    related_hypothesis: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
    related_module: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-044",
    question:
      "Do Arkansas Secondary Career Centers improve graduate earnings, credentials, and local retention — or primarily train students who leave the region?",
    status: "open",
    domain: "education_cte",
    related_module: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
    related_sources: ["CC-SRC-134"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-045",
    question:
      "What combination of Secondary Career Center aid, H2 incentives, Perkins V, WIOA, apprenticeship, concurrent credit, employer investment, and capital funding can sustain a regional specialty magnet without grant-only dependence?",
    status: "open",
    domain: "education_cte",
    related_module: "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-046",
    question:
      "Which specialty pathways are justified by workforce and economic data for Rose Bud, West Helena, Searcy County, and Mississippi County — and which hypothesized pathways fail demand tests?",
    status: "open",
    domain: "education_cte",
    related_geographies: [
      "AR-GEO-ROSE-BUD",
      "AR-GEO-WEST-HELENA",
      "AR-GEO-SEARCY-COUNTY",
      "AR-GEO-MISSISSIPPI-COUNTY"
    ],
    slice_id: SLICE
  }
];
for (const q of rqs) {
  if (!rqDoc.questions.find((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

function nextNode() {
  const nums = kgDoc.nodes
    .map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return (Math.max(0, ...nums) || 0) + 1;
}
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Rural CTE Specialty Magnet Hypothesis",
  kind: "hypothesis",
  related_id: "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK"
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Rose Bud Education Candidate Geography",
  kind: "geography",
  related_id: "AR-GEO-ROSE-BUD"
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.6";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_RURAL_CTE_SPECIALTY_MAGNET_RESEARCH_HYPOTHESIS_1_0_RETURN.md";
buildState.writing_focus =
  "Rural CTE specialty magnet hypothesis registered (not doctrine); Act 237/242 foundation; Rose Bud candidate; train-and-export falsification critical.";
buildState.next_action =
  "CC-PHASE-2.1-AR-SECONDARY-CAREER-CENTER-OUTCOMES-AND-CTE-FUNDING-MAP-1.0 or continue Clinton hub / livestock capacity map.";
buildState.arkansas_geography_set = `ACTIVE_${geoSet.locations.length}_LOCATIONS`;
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Registered rural CTE specialty magnet research hypothesis (not doctrine). Act 237/242 foundation; Rose Bud candidate geography; magnet low-SES premise corrected. Sources ${srcDoc.sources.length}.`,
  return_report:
    "reports/CC_PHASE_2_1_RURAL_CTE_SPECIALTY_MAGNET_RESEARCH_HYPOTHESIS_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Rural CTE Specialty Magnet Research Hypothesis",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK",
    "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS",
    "AR-GEO-ROSE-BUD candidate",
    "CC-SRC-131–136",
    "magnet placement premise corrected"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-AR-SECONDARY-CAREER-CENTER-OUTCOMES-AND-CTE-FUNDING-MAP-1.0",
  alternate_next: [
    "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0"
  ],
  note: "Hypothesis only. Try to prove wrong. No campus launch."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_RURAL_CTE_SPECIALTY_MAGNET_RESEARCH_HYPOTHESIS_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Registered **CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK** and module **CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS** as research — **not doctrine**. Rejected “start taking trades seriously.” Built on Act 237 H2 + Act 242 substitution + Secondary Career Centers. Added **Rose Bud** as candidate geography. Corrected magnet low-SES premise.

**Sources: ${srcDoc.sources.length}** · **Geographies: ${geoSet.locations.length}** · **Baseline: 2/86**

## 2. Stronger Research Question

${module.primary_research_question}

## 3. Existing Arkansas Foundation

| Structure | Source |
|---|---|
| Act 237 H2 pathways (29 for 2026–27) | CC-SRC-131 |
| Act 242 CTE↔core substitution | CC-SRC-132/133 |
| Secondary Career Centers / adequacy CTE overview | CC-SRC-134 |
| LEARNS context | CC-SRC-135 |

## 4. Placement Correction

Do **not** canonize “magnets are generally in low-SES areas.” Use deliberate opportunity-anchor placement (CC-SRC-136).

## 5. Critical Falsification

Train-and-export ≠ rural revitalization. Measure retention, ownership, local employers, quality of life.

## 6. Geography Notes

Candidate specialty lists for Rose Bud / West Helena / Searcy / Mississippi County = **hypotheses only**.

## 7. Validators

| Command | Result |
|---|---|
| \`pnpm research:validate\` | PENDING |
| \`pnpm phase2:validate\` | PENDING |
| \`pnpm baseline:validate\` | PENDING |

## 8. Commit Hash

PENDING_COMMIT

## 9. Next Slice

\`CC-PHASE-2.1-AR-SECONDARY-CAREER-CENTER-OUTCOMES-AND-CTE-FUNDING-MAP-1.0\`
`
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("geographies", geoSet.locations.length);
console.log("hypothesis: CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK");
console.log("doctrine expanded: false");
