/**
 * CC-PHASE-2.1-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS-MODULE-1.0
 *
 * - Open CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS
 * - CORRECT: Arkansas already has a state meat inspection program (2022) — reframed RQs
 * - Register ERS meatpacking concentration + AR/FSIS sources
 * - Canonicalize ChatGPT-tightened claim wording as CC-CLAIM-138 (qualified)
 * - Deliberate falsification agenda; no "USDA laws created monopsony"
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS-MODULE-1.0";
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
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const meatTrack = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const newSources = [
  {
    source_id: "CC-SRC-126",
    title:
      "Concentration in U.S. Meatpacking Industry and How It Affects Competition and Cattle Prices",
    authors: ["James M. MacDonald", "USDA Economic Research Service"],
    year: 2024,
    url: "https://www.ers.usda.gov/amber-waves/2024/january/concentration-in-u-s-meatpacking-industry-and-how-it-affects-competition-and-cattle-prices",
    source_type: "federal_agency_analysis",
    reliability: "primary_official_analysis",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "agriculture_market_structure",
    publication_date: "2024-01-25",
    retrieval_date: TODAY,
    summary:
      "ERS Amber Waves (MacDonald): four largest beef packers handle ~85% of steer/heifer purchases; four largest hog packers ~67% of hog purchases; most regions have a handful of major buyers. Historical research found limited evidence that concentration alone reduced livestock prices in 1980s–2000s because scale economies lowered costs and often outweighed market-power effects. Recent evidence (esp. after packing capacity tightened post-2015) is stronger that limited competition enabled packers to pay lower cattle prices, reflected in widened farm-to-wholesale spreads. Notes new smaller/producer-owned plants and USDA Meat and Poultry Processing Expansion Program as capacity responses. Drawn from EIB-256.",
    key_findings: [
      "CR4 ≈85% steer/heifer purchases; ≈67% hog purchases",
      "Concentration ≠ automatic monopsony harm in every period — scale economies mattered historically",
      "Stronger recent evidence of buyer-side market power after capacity tightened post-2015",
      "Additional packing capacity (including smaller/producer-owned) is a competition-restoration pathway USDA is pursuing"
    ],
    limitations:
      "National cattle/hog focus; Arkansas buyer radii and small-processor bottlenecks require separate measurement; Amber Waves summarizes EIB-256.",
    ideological_or_institutional_considerations: "Official USDA ERS.",
    verification_status: "url_verified_via_fetch",
    notes: "Core source for CC-CLAIM-138 / monopsony module. Rejects crude 'concentration always harms' and crude 'USDA created monopsony'."
  },
  {
    source_id: "CC-SRC-127",
    title: "USDA and Arkansas Sign Cooperative Agreement for State Meat Inspection Program",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2022,
    url: "https://www.fsis.usda.gov/news-events/news-press-releases/usda-and-arkansas-sign-cooperative-agreement-state-meat-inspection",
    source_type: "federal_agency_press_release",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_inspection_law",
    publication_date: "2022-10-04",
    retrieval_date: TODAY,
    summary:
      "FSIS press release Oct 4, 2022: Arkansas finalized cooperative agreement for a state meat inspection program. With Arkansas, 29 states participate in State MPI programs. Program must be 'at least equal to' FMIA; state-inspected product limited to intrastate commerce unless CIS participation. CORRECTS prior CC framing that asked whether Arkansas should create a program.",
    key_findings: [
      "Arkansas state meat inspection program exists under 2022 FSIS cooperative agreement",
      "State-inspected meat ordinarily intrastate-only unless CIS"
    ],
    limitations: "Does not measure program scale, wait times, geographic coverage, or producer outcomes.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Correction source — Arkansas already has MPI program."
  },
  {
    source_id: "CC-SRC-128",
    title: "State Meat Inspection Program",
    authors: ["Arkansas Department of Agriculture"],
    year: 2026,
    url: "https://agriculture.arkansas.gov/animals/meat-inspection-program/",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_inspection_law",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "Arkansas Department of Agriculture page: State Meat Inspection Program serves small and very small slaughter/processing establishments under USDA-FSIS cooperative agreement; state-inspected products may be sold within Arkansas; requirements at least equal to FMIA. Links facilities viewer and application.",
    key_findings: [
      "Active Arkansas state meat inspection program for small/very small establishments",
      "Intrastate sale of state-inspected meat"
    ],
    limitations:
      "Does not publish complete capacity/wait-time metrics on this page; adequacy remains empirical question.",
    ideological_or_institutional_considerations: "Official state agriculture department.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "State program existence + application pathway; adequacy not proven."
  },
  {
    source_id: "CC-SRC-129",
    title: "Inspection of Meat Products",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2020,
    url: "https://www.fsis.usda.gov/inspection/inspection-programs/inspection-meat-products",
    source_type: "federal_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_inspection_law",
    publication_date: "2020-08-16",
    retrieval_date: TODAY,
    summary:
      "FSIS: Federal Meat Inspection Act requires that meat sold commercially be inspected and passed as safe, wholesome, and properly labeled. Livestock (cattle, sheep, swine, goat) must be slaughtered and processed under required inspection for commercial human consumption. Establishes that inspection is a food-safety requirement — not optional for commercial retail meat — so scarcity of compliant capacity can constrain market access.",
    key_findings: [
      "Commercial meat sale requires inspection under FMIA framework",
      "Inspection is a food-safety safeguard, not a substitute for market-structure analysis"
    ],
    limitations:
      "Does not itself analyze monopsony or Arkansas capacity; custom-exempt pathways exist but limit retail/interstate options.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_fetch",
    notes: "Supports 'inspection amplifies disadvantage when capacity scarce' without blaming USDA for monopsony."
  },
  {
    source_id: "CC-SRC-130",
    title: "Cooperative Interstate Shipment (CIS) Establishments",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2026,
    url: "https://www.fsis.usda.gov/inspection/state-inspection-programs/cooperative-interstate-shipping-program/cooperative-interstate",
    source_type: "federal_agency_directory",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_inspection_law",
    publication_date: "2026-03-26",
    retrieval_date: TODAY,
    summary:
      "FSIS CIS establishments page lists participating states (Indiana, Iowa, Maine, Missouri, Montana, North Dakota, Ohio, South Dakota, Vermont, Wisconsin as of retrieval). Arkansas is not listed among CIS-participating states. Important for reframed research: whether Arkansas should pursue CIS so qualifying state-inspected small processors can ship interstate.",
    key_findings: [
      "CIS participating states listed; Arkansas not among them as of retrieval",
      "CIS is the interstate pathway for eligible state-inspected establishments"
    ],
    limitations: "Directory snapshot; participation status can change; eligibility/readiness for Arkansas not assessed here.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Arkansas not CIS participant — research question, not recommendation."
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
// CORRECT meat inspection track
// ============================================================================

meatTrack.version = "0.2.0";
meatTrack.status = "OPEN_RESEARCH_TRACK_CORRECTED";
meatTrack.correction = {
  at: TODAY,
  slice_id: SLICE,
  previous_error:
    "Primary RQ asked whether Arkansas should create a state meat inspection program.",
  corrected_fact:
    "Arkansas already operates a State Meat Inspection Program under a 2022 FSIS cooperative agreement (CC-SRC-127, CC-SRC-128).",
  sources: ["CC-SRC-127", "CC-SRC-128", "CC-SRC-130"]
};
meatTrack.arkansas_program_status = {
  exists: true,
  cooperative_agreement_date: "2022-10-04",
  commerce_scope: "intrastate unless CIS",
  cis_participant: false,
  cis_as_of: TODAY,
  cis_source: "CC-SRC-130"
};
meatTrack.primary_research_question =
  "Is Arkansas's current state meat inspection program large enough, accessible enough, and strategically deployed enough to materially expand family-farm processing capacity—and should Arkansas pursue Cooperative Interstate Shipment so qualifying state-inspected small processors can sell across state lines—without compromising food safety or imposing unsustainable public costs?";
meatTrack.superseded_question =
  "Would an Arkansas meat inspection program… (OBSOLETE — program already exists)";
meatTrack.research_agenda = [
  "Map Arkansas state-inspected vs federally inspected establishments by species/location",
  "Measure accessibility: wait times, fees, haul distances, scheduling (if discoverable)",
  "Compare program scale to producer demand / chicken-and-egg constraint",
  "CIS eligibility and institutional readiness for Arkansas",
  "Workforce: inspectors, meat cutters, veterinary capacity",
  "Capital costs and failure rates of small/midsize plants",
  "Food-safety outcomes under state vs federal inspection",
  "Whether expanded capacity raises farm-gate returns without consumer-price harm"
];
meatTrack.related_module = "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS";
meatTrack.slice_id_correction = SLICE;
writeJson(
  "research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json",
  meatTrack
);

writeText(
  "reports/CC_ARKANSAS_MEAT_INSPECTION_INFRASTRUCTURE_RESEARCH_TRACK_1_0.md",
  `# Arkansas Meat Inspection & Processing Infrastructure Research Track 1.1 (CORRECTED)

## Correction

Arkansas **already has** a State Meat Inspection Program (FSIS cooperative agreement, Oct 4, 2022 — CC-SRC-127/128).

The obsolete question “Should Arkansas create a state meat inspection program?” is **retired**.

## Current questions

1. Is the current program large / accessible / strategically deployed enough to expand family-farm processing capacity?
2. Should Arkansas pursue **CIS** so qualifying state-inspected plants can ship interstate? (Arkansas **not** listed among CIS states as of retrieval — CC-SRC-130)

Must test both sides; food safety and public cost remain constraints.
`
);

// ============================================================================
// Module
// ============================================================================

const module = {
  version: "0.1.0",
  status: "OPEN",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
  related_geographies: ["AR-GEO-VAN-BUREN-COUNTY", "AR-GEO-ARKANSAS-COUNTY"],
  related_tracks: ["CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE"],
  primary_hypothesis_id: "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS",
  primary_hypothesis:
    "Arkansas family-scale livestock producers face a compounded market-access disadvantage created by concentrated livestock purchasing and scarce inspected slaughter/processing capacity; expanding competitive small and midsize processing infrastructure may increase producer bargaining power and access to higher-value local and regional markets.",
  deliberate_falsification: true,
  rejected_overclaims: [
    "USDA laws created the monopsony",
    "Concentration alone proves monopsony harm in every period",
    "Inspection should be abandoned",
    "Break up every large processor as the only remedy",
    "Family farms good / large farms bad"
  ],
  two_layer_structure: {
    upstream_buyer_concentration:
      "Few major packers purchase livestock (national CR4 evidence; Arkansas radii TBD)",
    downstream_processing_scarcity:
      "Few accessible inspected processors enable farmers to bypass commodity buyers (AR bottleneck evidence)"
  },
  system_diagnosis_thesis: {
    status: "RESEARCH_THESIS_NOT_DOCTRINE",
    text: "The problem is not simply that family farmers are inefficient competitors against large farms. The structure of agricultural markets can deny small producers access to competitive buyers, affordable processing, distribution infrastructure, and higher-value markets."
  },
  policy_response_posture: {
    not: ["price controls as first response", "abandon USDA inspection", "break up every large processor"],
    test: "Whether creating competitive alternatives (capacity, cooperatives, CIS, shared infrastructure) restores bargaining power"
  },
  measurement_agenda: [
    "Arkansas livestock buyers by species",
    "Buyer concentration within realistic hauling radii",
    "Arkansas slaughter establishments by species and inspection status (federal vs state)",
    "Processing appointment wait times if discoverable",
    "Slaughter fees",
    "Distance traveled by small producers",
    "Clinton-area processing specifically (CC-HYP-CLINTON-PROCESSING-HUB)",
    "CIS eligibility/readiness",
    "Producer margins under live-sale vs direct-market models",
    "Minimum throughput for small plants",
    "Failure rates of small processors",
    "Consumer-price implications",
    "Whether additional capacity raises farm-gate returns"
  ],
  sources: {
    national_concentration: ["CC-SRC-126"],
    arkansas_processing: ["CC-SRC-120", "CC-SRC-121"],
    inspection_law: ["CC-SRC-122", "CC-SRC-127", "CC-SRC-128", "CC-SRC-129", "CC-SRC-130"],
    establishment_directory: ["CC-SRC-123"]
  },
  related_claim: "CC-CLAIM-138",
  related_rqs: ["CC-RQ-P21-037", "CC-RQ-P21-040", "CC-RQ-P21-041", "CC-RQ-P21-042"]
};
writeJson(
  "research/phase_2/arkansas_livestock_monopsony_processing_access_module.json",
  module
);

writeText(
  "reports/CC_ARKANSAS_LIVESTOCK_MONOPSONY_AND_PROCESSING_ACCESS_MODULE_1_0.md",
  `# CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS 1.0

**Status:** OPEN — deliberately try to disprove.

## Primary hypothesis

> Arkansas family-scale livestock producers face a compounded market-access disadvantage created by concentrated livestock purchasing and scarce inspected slaughter/processing capacity; expanding competitive small and midsize processing infrastructure may increase producer bargaining power and access to higher-value local and regional markets.

## Two layers

1. **Upstream buyer concentration** — few major packers (ERS: ~85% steer/heifer CR4).
2. **Downstream processing scarcity** — few accessible inspected plants for bypass/direct markets.

## Rejected overclaims

Do **not** say USDA laws created the monopsony. Inspection is a food-safety safeguard; scarcity of compliant capacity can amplify disadvantage.

## Strongest defensible public claim today

See **CC-CLAIM-138**.

## Next measurement

Buyer radii, establishment map (federal/state), wait times/fees, Clinton hub test, CIS readiness, margin comparisons.
`
);

// Hypothesis
if (!hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS")) {
  hypDoc.hypotheses.push({
    hypothesis_id: "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS",
    text: module.primary_hypothesis,
    epistemic_class: "HYPOTHESIS",
    module_id: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
    geography_ids: ["AR-GEO-VAN-BUREN-COUNTY", "AR-GEO-ARKANSAS-COUNTY"],
    empirical_status:
      "PARTIALLY MOTIVATED nationally (CC-SRC-126) and by AR processing bottleneck (CC-SRC-120/121); Arkansas buyer-radius and capacity-intervention causal effects UNTESTED.",
    not_empirical_proof: true,
    deliberate_falsification: true,
    sources_support: ["CC-SRC-126", "CC-SRC-120", "CC-SRC-121"],
    sources_qualify: ["CC-SRC-126"],
    governance: {
      decision: "KEEP_AS_HYPOTHESIS",
      adjudicator: ADJUDICATOR,
      decision_id: DECISION_ID,
      reason: "Compounded-access claim requires Arkansas measurement before promotion beyond CC-CLAIM-138's carefully limited wording."
    },
    last_updated: TODAY,
    slice_id: SLICE
  });
}
hypDoc.version = "0.4.0";
hypDoc.slice_id = SLICE;
writeJson("research/phase_2/hypothesis_registry_political_power.json", hypDoc);

// Claim 138 — ChatGPT tightened wording
const claim138Text =
  "Highly concentrated meatpacking markets have reduced buyer competition for livestock, and recent USDA research finds stronger evidence that packers have exercised market power by paying cattle producers less than they likely would under more competitive conditions. In Arkansas, limited small-scale slaughter and processing capacity creates an additional bottleneck for family and specialty livestock producers. Federal and state inspection requirements are essential food-safety safeguards, but when compliant processing capacity is scarce, those requirements can amplify the practical market-access disadvantage facing small producers.";

const claim138 = {
  claim_id: "CC-CLAIM-138",
  claim_text: claim138Text,
  chapter_ids: [],
  claim_type: "agriculture_market_structure",
  claim_class: "descriptive_empirical",
  epistemic_class: "EMPIRICAL_CLAIM",
  importance: "high",
  support_level: "supported_with_qualification",
  evidence_strength: "moderate",
  consensus_status: "contested_across_literatures",
  source_ids: [
    "CC-SRC-126",
    "CC-SRC-120",
    "CC-SRC-121",
    "CC-SRC-129",
    "CC-SRC-127",
    "CC-SRC-128"
  ],
  opposing_evidence: [
    "Historical USDA research found consolidation produced economies of scale that lowered processing costs and could raise livestock demand — concentration alone does not prove monopsony harm in every period (CC-SRC-126).",
    "Arkansas state meat inspection program already exists (CC-SRC-127/128); capacity adequacy and CIS non-participation are separate empirical questions."
  ],
  uncertainty:
    "Arkansas-specific buyer-radius monopsony magnitudes unmeasured; causal effect of capacity expansion on farm-gate returns unproven; Clinton hub unproven.",
  fact_check_status: "audited",
  publication_readiness: "not_ready",
  geographic_scope: "US national + Arkansas processing bottleneck",
  temporal_scope: "stronger market-power evidence post-2015 nationally; AR bottleneck 2020–2025 sources",
  evidence_level: 3,
  related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
  related_hypothesis_id: "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS",
  forbidden_readings: [
    "USDA laws created the monopsony",
    "Abandon inspection",
    "All concentration is always harmful"
  ],
  governance: {
    decision: "APPROVE",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    slice_id: SLICE,
    at: TODAY,
    note: "ChatGPT-tightened wording adopted; stronger than casual monopsony slogan; weaker than causal AR intervention claim."
  },
  phase21_audit: {
    slice_id: SLICE,
    audited_at: TODAY,
    disposition: "SUPPORTED WITH QUALIFICATION",
    source_to_claim_fit: "PARTIAL",
    confidence: "Moderate",
    evidence_type: "ASSOCIATIONAL / STRUCTURAL",
    reasoning:
      "ERS recent market-power evidence + AR processing bottleneck + inspection-as-safeguard/amplification framing; historical scale-economy qualification retained."
  }
};

const existing138 = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-138");
if (existing138) Object.assign(existing138, claim138);
else claimDoc.claims.push(claim138);
claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

// Update RQ-037 and add new RQs
const rq037 = rqDoc.questions.find((q) => q.id === "CC-RQ-P21-037");
if (rq037) {
  rq037.question = meatTrack.primary_research_question;
  rq037.status = "open_corrected";
  rq037.correction =
    "Arkansas already has a state meat inspection program (2022). Question reframed to adequacy + CIS.";
  rq037.related_sources = ["CC-SRC-127", "CC-SRC-128", "CC-SRC-130"];
  rq037.slice_id = SLICE;
}

const newRqs = [
  {
    id: "CC-RQ-P21-040",
    question:
      "Where exactly do Arkansas family livestock producers lose bargaining power, and how much of that disadvantage is attributable to buyer concentration versus processing scarcity?",
    status: "open",
    domain: "agriculture_market_structure",
    related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
    related_claim: "CC-CLAIM-138",
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-041",
    question:
      "What infrastructure interventions (state-inspected capacity expansion, CIS, cooperatives, shared cold storage, mobile slaughter where lawful, financing, training) most improve farm-gate returns without sacrificing food safety or imposing unsustainable public costs?",
    status: "open",
    domain: "agriculture_processing_infrastructure",
    related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
    must_test_both_sides: true,
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-042",
    question:
      "Does additional small/midsize packing capacity in or accessible to Arkansas raise cattle/livestock prices or producer margins relative to live-sale into concentrated buyer markets?",
    status: "open",
    domain: "agriculture_market_structure",
    related_hypothesis: "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS",
    related_sources: ["CC-SRC-126"],
    slice_id: SLICE
  }
];
for (const q of newRqs) {
  if (!rqDoc.questions.find((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Research posture / system thesis
writeJson("research/phase_2/livestock_market_access_system_diagnosis.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "RESEARCH_THESIS_NOT_DOCTRINE",
  thesis: module.system_diagnosis_thesis.text,
  two_layers: module.two_layer_structure,
  policy_response_posture: module.policy_response_posture,
  personal_experience_rule:
    "Producer lived experience identifies friction points (scheduling, slaughter access, transport, inspection, pricing, storage, marketing) for rigorous testing — it is not itself the evidence.",
  related_claim: "CC-CLAIM-138",
  related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS"
});

// Public reasoning
const pr013 = {
  record_id: "CC-PR-013",
  claim_id: "CC-CLAIM-138",
  change_type: "NEW_QUALIFIED_CLAIM",
  decision: "APPROVE",
  decision_id: DECISION_ID,
  adjudicator: ADJUDICATOR,
  decided_at: TODAY,
  skeptical_reader_question:
    "Did USDA laws create a meatpacking monopsony that traps family farmers?",
  public_answer:
    "Not in that crude form. Highly concentrated packers can exercise buyer power — recent USDA research finds stronger evidence of that for cattle after packing capacity tightened. But earlier consolidation also brought scale economies. In Arkansas, scarce small-scale inspected processing adds a second bottleneck if a farmer wants to sell meat rather than live animals. Inspection itself is a food-safety requirement, not the monopsony. When compliant plants are scarce, that requirement can amplify the practical disadvantage. Arkansas already has a state meat inspection program; the open questions are whether it is adequate and whether Cooperative Interstate Shipment would help.",
  what_we_originally_said:
    "Earlier research track asked whether Arkansas should create a state meat inspection program.",
  what_made_us_question_it:
    "FSIS and Arkansas Department of Agriculture records show the program was approved in 2022.",
  what_we_learned:
    "Two layers matter: buyer concentration and processing scarcity. Inspection scarcity amplifies disadvantage; inspection is not the villain.",
  where_our_reasoning_was_weak:
    "Risk of sloganizing 'USDA created monopsony' or treating concentration as always harmful.",
  what_we_now_say: claim138Text,
  why_we_made_that_decision:
    "Adopt ChatGPT-tightened wording that matches ERS + Arkansas processing evidence and keeps food-safety safeguards intact.",
  what_we_still_dont_know:
    "Arkansas buyer-radius magnitudes; wait times/fees; Clinton hub; CIS readiness; whether capacity expansion raises farm-gate returns.",
  what_else_this_could_affect: [
    "Family Farm Prosperity architecture",
    "Arkansas County / Clinton paired comparison",
    "Anti-monopsony design agendas"
  ],
  potential_secondary_effects_or_unintended_consequences: [
    "New small plants can fail if throughput is insufficient",
    "CIS adds compliance burden",
    "Consumer prices may rise if costs are higher at small plants"
  ],
  what_evidence_could_change_our_mind_again:
    "Arkansas measurement showing competitive local buyers and ample accessible processing; or capacity expansion that fails to improve producer returns."
};

const pri = prRegistry.records.findIndex((x) => x.record_id === "CC-PR-013");
if (pri >= 0) prRegistry.records[pri] = pr013;
else prRegistry.records.push(pr013);
prRegistry.version = "0.3.0";
prRegistry.slice_id = SLICE;
writeJson("research/phase_2/public_reasoning_registry.json", prRegistry);
writeText(
  `reports/public_reasoning/CC-PR-013_CC-CLAIM-138.md`,
  `# CC-PR-013 — ${pr013.skeptical_reader_question}

## Public answer

${pr013.public_answer}

## What we now say

${pr013.what_we_now_say}
`
);

writeText(
  "reports/CC_WHAT_WE_LEARNED_LIVESTOCK_MONOPSONY_AND_PROCESSING_ACCESS_1_0.md",
  `# What We Learned — Livestock Monopsony & Processing Access

1. **ERS:** ~85% steer/heifer CR4; stronger recent evidence of buyer power after capacity tightened — but historical scale economies qualify any crude concentration story.
2. **Arkansas:** processing scarcity is a real bottleneck for family/specialty livestock.
3. **Inspection:** food-safety safeguard; scarcity of compliant capacity amplifies disadvantage — does not mean “USDA created monopsony.”
4. **Correction:** Arkansas already has a state meat inspection program (2022). Open questions: adequacy + CIS (Arkansas not currently a CIS state).
5. **Two layers:** upstream buyer concentration + downstream processing scarcity.
6. **Response posture to test:** competitive alternatives / capacity — not price controls or abandoning inspection.
`
);

// KG
function nextNode() {
  const nums = kgDoc.nodes
    .map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return (Math.max(0, ...nums) || 0) + 1;
}
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Livestock Monopsony & Processing Access Module",
  kind: "system",
  related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS"
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.5";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_LIVESTOCK_MONOPSONY_AND_PROCESSING_ACCESS_MODULE_1_0_RETURN.md";
buildState.writing_focus =
  "CC-CLAIM-138 qualified meatpacking/processing claim; AR state inspection EXISTS; CIS open; compounded-access hypothesis under falsification agenda.";
buildState.next_action =
  "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0 (measure plants, inspection status, radii) or comparative CIS readiness.";
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Opened livestock monopsony/processing module. Corrected: AR state meat inspection exists (2022); CIS not joined. CC-CLAIM-138 approved with ChatGPT wording. Sources ${srcDoc.sources.length}.`,
  return_report:
    "reports/CC_PHASE_2_1_LIVESTOCK_MONOPSONY_AND_PROCESSING_ACCESS_MODULE_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Livestock Monopsony and Processing Access Module",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
    "CC-CLAIM-138",
    "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS",
    "meat inspection track CORRECTED",
    "CC-SRC-126–130",
    "CC-PR-013"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0",
  note: "Falsification agenda active. No doctrine expansion."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_LIVESTOCK_MONOPSONY_AND_PROCESSING_ACCESS_MODULE_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Opened **CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS**. Approved **CC-CLAIM-138** (ChatGPT-tightened wording). **Corrected** prior framing: Arkansas already has a state meat inspection program (2022); CIS not currently joined. Compounded-access hypothesis kept under deliberate falsification.

**Sources: ${srcDoc.sources.length}** · **Baseline: 2/86** · **Capture/monopsony slogans: rejected**

## 2. Strongest Defensible Claim (CC-CLAIM-138)

${claim138Text}

## 3. Correction

| Before | After |
|---|---|
| Should AR create state meat inspection? | Program exists (2022). Adequacy + CIS are the questions. |

## 4. Two-Layer Structure

Upstream buyer concentration (ERS) + downstream processing scarcity (AR UADA).

## 5. Module / Hypothesis

- Module OPEN with measurement agenda
- **CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS** KEEP (try to disprove)

## 6. Sources Added

CC-SRC-126 (ERS MacDonald) · 127 (FSIS AR agreement) · 128 (AR DA program) · 129 (FMIA inspection) · 130 (CIS states list)

## 7. Public Reasoning

CC-PR-013

## 8. Validators

| Command | Result |
|---|---|
| \`pnpm research:validate\` | PENDING |
| \`pnpm phase2:validate\` | PENDING |
| \`pnpm baseline:validate\` | PENDING |

## 9. Commit Hash

PENDING_COMMIT

## 10. Next Slice

\`CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0\`
`
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("claim 138: APPROVED");
console.log("AR state inspection: EXISTS");
console.log("CIS: NOT PARTICIPATING");
