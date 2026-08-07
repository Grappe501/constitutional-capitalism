/**
 * CC-PHASE-2.1-ARKANSAS-AG-GEOGRAPHY-PAIR-AND-MEAT-INSPECTION-RESEARCH-TRACK-1.0
 *
 * - Add Arkansas County + Clinton/Van Buren County as CANDIDATE agricultural contrast geographies
 * - Do NOT canonize county production/export or Clinton processing-hub claims without county evidence
 * - Register statewide processing-bottleneck + FSIS legal sources
 * - Open meat-inspection research module / RQs (systems constraint; both sides)
 * - Complementarity philosophy recorded as research posture — not doctrine mutation
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-ARKANSAS-AG-GEOGRAPHY-PAIR-AND-MEAT-INSPECTION-RESEARCH-TRACK-1.0";
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
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const geoSet = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_designated_research_geography_set.json"), "utf8")
);

const newSources = [
  {
    source_id: "CC-SRC-120",
    title:
      "Public Policy Center Publishes Arkansas Beef Slaughterhouse Survey Results",
    authors: ["University of Arkansas Division of Agriculture Public Policy Center"],
    year: 2020,
    url: "https://www.uaex.uada.edu/business-communities/ced-blog/posts/2020/May/Public-Policy-Center-Publishes-Arkansas-Beef-Slaughterhouse-Survey-Results.aspx",
    source_type: "university_extension_report_summary",
    reliability: "secondary_official_extension",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2020-05",
    retrieval_date: TODAY,
    summary:
      "UADA Public Policy Center early-2020 survey of Arkansas beef slaughter/processing facilities (14 of 26 invited; 54% response). States Arkansas relies on USDA inspection for retail beef; as of May 2020 FSIS directory listed three Arkansas businesses with USDA inspectors for beef. Documents chicken-and-egg capacity paradox (not enough plants for producers / not enough producers for plants). Nine respondents supported pursuing a state-level beef inspection program; four did not; one unsure.",
    key_findings: [
      "Arkansas retail beef depends on USDA inspection; few USDA-inspected beef establishments noted as of May 2020",
      "Circular capacity paradox: producers need processing; processors need producers",
      "9 of 14 surveyed facilities supported exploring state-level beef inspection"
    ],
    limitations:
      "Point-in-time pre-COVID-severity survey; self-selected facilities; statewide capacity—not Clinton/Van Buren identification.",
    ideological_or_institutional_considerations: "University of Arkansas Extension / Beef Council commissioned context.",
    verification_status: "url_verified_via_fetch",
    notes: "Statewide processing bottleneck + state-inspection interest. Does NOT establish Clinton hub claim."
  },
  {
    source_id: "CC-SRC-121",
    title: "Report on Organic Meat & Poultry Processing in Arkansas",
    authors: [
      "Center for Arkansas Farms and Food",
      "Food and Livestock Planning, Inc. (feasibility study)"
    ],
    year: 2025,
    url: "https://arkansasorganicag.uada.edu/organic-meat-processing/",
    source_type: "university_extension_feasibility_summary",
    reliability: "secondary_official_extension",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "UADA/CAFF-linked summary of organic meat & poultry processing feasibility study: processing is the primary constraint on Arkansas organic/specialty livestock. Reports ~30 small federally inspected meat/poultry plants; only 6 slaughter livestock; 3 slaughter poultry; essentially no organic-certified meat plant (one poultry organic). Pasture-raised recommended over grain-fed organic given feed costs. Notes chicken-and-egg expansion economics for new plants.",
    key_findings: [
      "Processing shortage identified as biggest factor limiting organic/specialty livestock production in Arkansas",
      "Few livestock-slaughter plants among small federally inspected establishments; organic meat certification gap",
      "Recommended mid-scale multi-species plant economics and modular poultry options discussed"
    ],
    limitations:
      "Summary page of feasibility study; plant counts may change; not county-specific to Arkansas County or Clinton.",
    ideological_or_institutional_considerations: "CAFF / Midwest TOPP supported feasibility work.",
    verification_status: "url_verified_via_fetch",
    notes: "Statewide specialty/organic processing bottleneck — supports Clinton research purpose without proving hub claim."
  },
  {
    source_id: "CC-SRC-122",
    title: "State Inspection Programs",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2026,
    url: "https://www.fsis.usda.gov/inspection/apply-grant-inspection/state-inspection-programs",
    source_type: "federal_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_inspection_law",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "FSIS official page: states may operate Meat and Poultry Inspection (MPI) programs under cooperative agreement if requirements are 'at least equal to' federal FMIA/PPIA/HMSA standards. State-inspected product is limited to intrastate commerce unless the state also participates in Cooperative Interstate Shipment (CIS). FSIS reports ~30 state MPI programs and ~1,450 state-inspected establishments (small/very small), with federal cost-sharing up to ~50%. Establishes legal reality of state inspection — not an Arkansas program endorsement.",
    key_findings: [
      "State MPI programs must enforce requirements at least equal to federal inspection",
      "State-inspected product is ordinarily intrastate-only unless CIS applies",
      "About 30 state MPI programs and ~1,450 state-inspected establishments exist nationally"
    ],
    limitations:
      "Does not evaluate Arkansas cost/workforce feasibility; does not claim Arkansas currently operates a state MPI program.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_search_excerpt",
    related_urls: [
      "https://www.fsis.usda.gov/inspection/state-inspection-programs/cooperative-interstate-shipping-program"
    ],
    notes: "Legal framework for state inspection / CIS research module."
  },
  {
    source_id: "CC-SRC-123",
    title: "Meat, Poultry and Egg Product Inspection Directory",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2026,
    url: "https://www.fsis.usda.gov/inspection/establishments/meat-poultry-and-egg-product-inspection-directory",
    source_type: "federal_agency_directory",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "FSIS MPI Directory and Establishment Demographic Data: official listing of FSIS-regulated establishments with location, size, species, and activity categories. Updated regularly. Primary tool to test the Clinton/Van Buren County USDA-processing hub hypothesis and to map Arkansas inspected capacity.",
    key_findings: [
      "Authoritative establishment directory exists for plant location / species / activities",
      "Enables falsifiable test of Clinton regional-processing destination claim"
    ],
    limitations:
      "Directory identifies plants, not producer travel patterns; hub status requires additional producer/usage evidence.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Method instrument for CC-HYP-CLINTON-PROCESSING-HUB."
  },
  {
    source_id: "CC-SRC-124",
    title: "USDA/NASS 2025 State Agriculture Overview for Arkansas",
    authors: ["USDA National Agricultural Statistics Service"],
    year: 2025,
    url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=ARKANSAS",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "farm_structure",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "NASS state overview (Quick Stats as of retrieval): Arkansas ~37,000 farm operations; ~13.6 million acres operated. Major commodities include soybeans, rice, corn, cotton, hay; large broiler production. Statewide diversity/scale context — does not establish Arkansas County or Van Buren County archetypes.",
    key_findings: [
      "≈37,000 Arkansas farm operations; ≈13.6 million acres operated",
      "State is a major soybean, rice, poultry, and livestock producer"
    ],
    limitations:
      "Statewide aggregates; county archetypes require Census of Agriculture county profiles / county Quick Stats.",
    ideological_or_institutional_considerations: "Official NASS.",
    verification_status: "url_verified_via_fetch",
    notes: "Statewide context only — not county dominance proof."
  },
  {
    source_id: "CC-SRC-125",
    title: "Farm Structure and Organization — Farm Structure and Contracting",
    authors: ["USDA Economic Research Service"],
    year: 2024,
    url: "https://www.ers.usda.gov/topics/farm-economy/farm-structure-and-organization/farm-structure-and-contracting",
    source_type: "federal_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "farm_structure",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "ERS farm-structure topic page documenting that family farms are not a homogeneous category and span diverse scales and economic structures (consistent with EIB farm-classification work). Supports research posture rejecting family-farms-good / large-farms-bad dichotomy.",
    key_findings: [
      "Family farms are heterogeneous across scale and structure",
      "Analytical categories must distinguish farm types rather than treat 'family farm' as a single model"
    ],
    limitations: "National framing; Arkansas County/Clinton specifics still require county evidence.",
    ideological_or_institutional_considerations: "Official USDA ERS.",
    verification_status: "url_verified_via_search_excerpt",
    notes: "Supports complementary-agriculture research philosophy (not doctrine rewrite)."
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
// Geography set expansion
// ============================================================================

const additions = [
  {
    id: "AR-GEO-ARKANSAS-COUNTY",
    name: "Arkansas County, Arkansas",
    type: "county",
    fips: "05001",
    status: "CANDIDATE",
    research_archetype: "Large-scale commodity / export-oriented agriculture",
    contrast_role: "candidate large-scale commodity / export agriculture research geography",
    research_purpose:
      "Study the infrastructure, capital, processing, transportation, commodity-market, water, land, technology, labor and trade requirements of high-volume Arkansas agriculture.",
    research_posture:
      "Candidate geography. Specific claims about production/export dominance must be established from county-level USDA/UADA evidence before canonical use.",
    paired_with: "AR-GEO-VAN-BUREN-COUNTY",
    complementary_question:
      "How do we keep highly productive, globally competitive agriculture prosperous while improving stewardship and ensuring that more of its value strengthens Arkansas communities?",
    sources_context_statewide_only: ["CC-SRC-124", "CC-SRC-125"],
    county_evidence_required_before_canonical: [
      "Census of Agriculture county profile / Quick Stats for Arkansas County",
      "Commodity mix, farm-size distribution, land use, processing/transport links"
    ]
  },
  {
    id: "AR-GEO-VAN-BUREN-COUNTY",
    name: "Clinton / Van Buren County, Arkansas",
    type: "county_with_municipality_anchor",
    fips: "05141",
    municipality_anchor: "Clinton, Arkansas",
    status: "CANDIDATE",
    research_archetype:
      "Family-farm / livestock / specialty / organic / regional-processing hub (candidate)",
    contrast_role:
      "candidate distributed family-farm, livestock, specialty/organic and processing-infrastructure geography",
    research_purpose:
      "Study the infrastructure required for smaller livestock and family-farm systems, including slaughter/processing capacity, inspection, cold storage, distribution, cooperative infrastructure, direct markets and regional food systems.",
    research_posture:
      "Candidate geography. Clinton's claimed role as a regional USDA-processing destination and the scale/composition of family and organic agriculture must be independently established before canonical use.",
    paired_with: "AR-GEO-ARKANSAS-COUNTY",
    complementary_question:
      "What infrastructure prevents smaller livestock, regenerative, specialty and family farms from reaching viable scale—and which pieces should markets, cooperatives, communities, state government and federal programs provide?",
    clinton_processing_hub_claim: {
      status: "HYPOTHESIS_ONLY",
      hypothesis_id: "CC-HYP-CLINTON-PROCESSING-HUB",
      note:
        "Statewide processing bottleneck is evidenced; Clinton-as-regional-USDA-destination is NOT yet established from authoritative sources."
    },
    sources_context_statewide: ["CC-SRC-120", "CC-SRC-121", "CC-SRC-123"],
    county_evidence_required_before_canonical: [
      "FSIS MPI Directory establishments in/near Clinton / Van Buren County (species, size, activities)",
      "Producer usage / travel-shed evidence if available",
      "Census of Agriculture county profile for Van Buren County farm structure"
    ]
  }
];

for (const loc of additions) {
  const i = geoSet.locations.findIndex((x) => x.id === loc.id);
  if (i >= 0) geoSet.locations[i] = loc;
  else geoSet.locations.push(loc);
}

geoSet.version = "1.1.0";
geoSet.slice_id = SLICE;
geoSet.generated_at = TODAY;
geoSet.last_updated = TODAY;
geoSet.location_count = geoSet.locations.length;
geoSet.agricultural_paired_comparison = {
  status: "CANDIDATE_PAIR",
  locations: ["AR-GEO-ARKANSAS-COUNTY", "AR-GEO-VAN-BUREN-COUNTY"],
  purpose:
    "Test whether Constitutional Capitalism can strengthen both large-scale commodity agriculture and distributed family/specialty livestock systems rather than forcing a false choice between them.",
  philosophical_posture_not_doctrine:
    "Reject family-farms-good / large-farms-bad. Ask what infrastructure and rules allow each productive agricultural model to prosper while internalizing costs, preserving competition, protecting natural resources, strengthening local communities, and giving new/smaller producers a realistic path into agriculture.",
  evidence_gate:
    "County-level USDA/NASS/UADA and FSIS establishment evidence required before treating archetypes as established facts."
};
geoSet.this_slice_geography_required = false;
geoSet.this_slice_note =
  "Geography set expanded with candidate ag pair; no forced field study. County claims remain provisional.";
geoSet.paired_comparison_future =
  "Includes Benton vs Delta/rural pairs AND Arkansas County vs Clinton/Van Buren agricultural-system pair once county evidence is assembled.";

writeJson("research/phase_2/arkansas_designated_research_geography_set.json", geoSet);

writeText(
  "reports/CC_ARKANSAS_DESIGNATED_RESEARCH_GEOGRAPHY_SET_1_0.md",
  `# Arkansas Designated Research Geography Set 1.1

**Status:** Active sampling preference when a research question requires geography.  
**Not:** automatic LCL launch · forced sample for every study · result-shopping.

## Selection rule

> Prefer the designated Arkansas research geography set when one or more locations provide a methodologically appropriate sample. Select by research question, data quality, contrast value, and replicability—not by the result we expect to find. Document why the location was selected and why the other candidates were not necessary.

## Locations (${geoSet.locations.length})

| ID | Place | Contrast / archetype | Status |
|---|---|---|---|
| AR-GEO-JACKSONVILLE | Jacksonville | suburban / military-linked municipal systems | active |
| AR-GEO-SEARCY-COUNTY | Searcy County | very rural conditions | active |
| AR-GEO-LAFAYETTE-COUNTY | Lafayette County | very rural conditions | active |
| AR-GEO-HOT-SPRINGS-VILLAGE | Hot Springs Village | retirement/community structure crossing counties | active |
| AR-GEO-WEST-HELENA | West Helena / Helena-West Helena | Delta urban/rural economic distress | active |
| AR-GEO-PULASKI-COUNTY | Pulaski County | state metropolitan / government center | active |
| AR-GEO-BENTON-COUNTY | Benton County | high-growth / high-income economic development | active |
| AR-GEO-MISSISSIPPI-COUNTY | Mississippi County | agriculture / industry and major industrial investment | active |
| AR-GEO-ARKANSAS-COUNTY | Arkansas County | **candidate** large-scale commodity / export agriculture | **CANDIDATE** |
| AR-GEO-VAN-BUREN-COUNTY | Clinton / Van Buren County | **candidate** family-farm / livestock / specialty / processing infrastructure | **CANDIDATE** |

## Agricultural paired comparison (candidate)

**Arkansas County** asks how highly productive commodity agriculture can prosper while improving stewardship and community value retention.  
**Clinton / Van Buren** asks what infrastructure smaller livestock, specialty, and family farms need to reach viable scale.

These are **complementary** questions — not family farms good / large farms bad.

### Evidence gate

- County production/export dominance claims for Arkansas County: **not yet canonical** — need county USDA/UADA evidence.
- Clinton as regional USDA-processing destination: **hypothesis only** (\`CC-HYP-CLINTON-PROCESSING-HUB\`) until FSIS directory + usage evidence assembled.

Statewide processing bottleneck evidence exists (CC-SRC-120, CC-SRC-121) without proving the Clinton hub claim.

## Faulkner County

Prior leakage pilot remains in the record. **Do not redo immediately.**
`
);

// ============================================================================
// Meat inspection research track (open module — not completed analysis)
// ============================================================================

const meatModule = {
  version: "0.1.0",
  status: "OPEN_RESEARCH_TRACK",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: "CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE",
  primary_research_question:
    "Would an Arkansas meat inspection program, combined with strategically distributed small and midsized processing infrastructure, materially expand market access and profitability for family livestock farms without compromising food safety or imposing unsustainable public costs?",
  must_test_both_sides: true,
  systems_constraint_named: {
    name: "processing chicken-and-egg",
    description:
      "Processors may need more producers to justify expansion while producers need processing capacity before they can expand local retail production.",
    sources: ["CC-SRC-120", "CC-SRC-121"]
  },
  legal_framework_sources: ["CC-SRC-122", "CC-SRC-123"],
  research_agenda: [
    "States already operating MPI programs: structure, costs, outcomes",
    "Establishment economics and throughput requirements",
    "Inspector / veterinary workforce requirements",
    "At-least-equal-to equivalency requirements",
    "Interstate limitations and Cooperative Interstate Shipment (CIS) options",
    "Capital costs for small/mid-sized multi-species plants",
    "Producer wait times and scheduling constraints",
    "Food-safety outcomes vs federal inspection",
    "Whether new capacity generates enough producer volume to remain viable",
    "Distribution of plants relative to Arkansas County vs Van Buren County producer geographies"
  ],
  not_in_this_slice: [
    "Cost-benefit recommendation",
    "Doctrine expansion",
    "Claim that Arkansas should or should not create a state program",
    "Canonical Clinton hub claim"
  ],
  related_geographies: ["AR-GEO-VAN-BUREN-COUNTY", "AR-GEO-ARKANSAS-COUNTY"],
  related_hypothesis: "CC-HYP-CLINTON-PROCESSING-HUB",
  related_rqs: ["CC-RQ-P21-037", "CC-RQ-P21-038", "CC-RQ-P21-039"]
};
writeJson(
  "research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json",
  meatModule
);

writeText(
  "reports/CC_ARKANSAS_MEAT_INSPECTION_INFRASTRUCTURE_RESEARCH_TRACK_1_0.md",
  `# Arkansas Meat Inspection & Processing Infrastructure Research Track 1.0

**Status:** OPEN — agenda and sources registered; analysis not complete.

## Primary question

> Would an Arkansas meat inspection program, combined with strategically distributed small and midsized processing infrastructure, materially expand market access and profitability for family livestock farms without compromising food safety or imposing unsustainable public costs?

Test **both sides**.

## What is already evidenced (statewide)

- Retail beef depends on USDA inspection; limited inspected capacity noted in 2020 UADA survey (CC-SRC-120).
- Organic/specialty livestock limited by processing bottleneck (CC-SRC-121).
- Chicken-and-egg: producers ↔ processors (CC-SRC-120).
- State MPI + CIS is a real federal legal pathway (CC-SRC-122); establishment directory exists (CC-SRC-123).

## What is NOT evidenced

- That Clinton specifically is where many Arkansas family farms bring livestock for USDA processing (**hypothesis**).
- That a state program would net-benefit producers after costs/workforce/safety tradeoffs.
- County archetype dominance claims for Arkansas County or Van Buren County.

## Agenda

See \`research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json\`.
`
);

// Hypothesis: Clinton hub
if (!hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-CLINTON-PROCESSING-HUB")) {
  hypDoc.hypotheses.push({
    hypothesis_id: "CC-HYP-CLINTON-PROCESSING-HUB",
    text: "Clinton, Arkansas (Van Buren County) functions as a regional destination where many Arkansas family livestock farms obtain USDA-inspected slaughter/processing services.",
    epistemic_class: "HYPOTHESIS",
    geography_ids: ["AR-GEO-VAN-BUREN-COUNTY"],
    empirical_status:
      "UNTESTED. Statewide processing bottleneck evidenced (CC-SRC-120/121); Clinton-specific hub role not established.",
    not_empirical_proof: true,
    test_plan: [
      "Query FSIS MPI Directory / demographics for establishments in Clinton / Van Buren County and nearby counties (CC-SRC-123)",
      "Record species, size class, activities",
      "Seek producer usage / travel-shed evidence before promoting to empirical claim"
    ],
    sources_context: ["CC-SRC-120", "CC-SRC-121", "CC-SRC-123"],
    governance: {
      decision: "KEEP_AS_HYPOTHESIS",
      adjudicator: ADJUDICATOR,
      decision_id: DECISION_ID,
      reason: "Do not canonize anecdotal hub claims; instrument exists to test."
    },
    last_updated: TODAY,
    slice_id: SLICE
  });
}
hypDoc.version = "0.3.1";
hypDoc.slice_id = SLICE;
writeJson("research/phase_2/hypothesis_registry_political_power.json", hypDoc);

const rqs = [
  {
    id: "CC-RQ-P21-037",
    question: meatModule.primary_research_question,
    status: "open",
    domain: "agriculture_processing_infrastructure",
    related_module: "CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE",
    slice_id: SLICE,
    must_test_both_sides: true
  },
  {
    id: "CC-RQ-P21-038",
    question:
      "Does FSIS establishment data and producer usage evidence support treating Clinton/Van Buren County as a regional USDA livestock processing destination for Arkansas family farms?",
    status: "open",
    domain: "agriculture_processing_infrastructure",
    related_hypothesis: "CC-HYP-CLINTON-PROCESSING-HUB",
    related_sources: ["CC-SRC-123"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-039",
    question:
      "What county-level USDA/NASS evidence establishes (or falsifies) Arkansas County as a large-scale commodity/export agriculture archetype and Van Buren County as a distributed family-farm/livestock/specialty archetype?",
    status: "open",
    domain: "farm_structure",
    related_geographies: ["AR-GEO-ARKANSAS-COUNTY", "AR-GEO-VAN-BUREN-COUNTY"],
    related_sources: ["CC-SRC-124", "CC-SRC-125"],
    slice_id: SLICE
  }
];
for (const q of rqs) {
  if (!rqDoc.questions.find((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

// Complementary ag philosophy note (research posture — not doctrine)
writeJson("research/phase_2/arkansas_agricultural_complementarity_research_posture.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "RESEARCH_POSTURE_NOT_DOCTRINE",
  rejected_false_choice: "family farms good / large farms bad",
  governing_research_question:
    "What infrastructure and rules allow each productive agricultural model to prosper while internalizing its costs, preserving competition, protecting natural resources, strengthening local communities, and giving new and smaller producers a realistic path into agriculture?",
  paired_candidate_geographies: ["AR-GEO-ARKANSAS-COUNTY", "AR-GEO-VAN-BUREN-COUNTY"],
  supporting_structure_sources: ["CC-SRC-073", "CC-SRC-125", "CC-SRC-124"],
  note:
    "Records research posture for the Arkansas County / Clinton comparison. Does not silently expand Family Farm Prosperity doctrine."
});

writeText(
  "reports/CC_ARKANSAS_AGRICULTURAL_COMPLEMENTARITY_RESEARCH_POSTURE_1_0.md",
  `# Arkansas Agricultural Complementarity — Research Posture 1.0

**Not doctrine.** Research posture for the Arkansas County ↔ Clinton/Van Buren candidate pair.

## Rejected false choice

Family farms good / large farms bad.

## Governing question

> What infrastructure and rules allow each productive agricultural model to prosper while internalizing its costs, preserving competition, protecting natural resources, strengthening local communities, and giving new and smaller producers a realistic path into agriculture?

## Pair

| Geography | Candidate question |
|---|---|
| Arkansas County | Keep highly productive commodity agriculture prosperous while improving stewardship and community value |
| Clinton / Van Buren | Which infrastructure unlocks viable scale for smaller livestock, specialty, and family farms |

County archetypes remain **candidate** until USDA/NASS/FSIS county evidence is assembled.
`
);

// KG nodes
function nextNode() {
  const nums = kgDoc.nodes
    .map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return (Math.max(0, ...nums) || 0) + 1;
}
let nId = nextNode();
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Arkansas County Ag Candidate Geography",
  kind: "geography",
  related_id: "AR-GEO-ARKANSAS-COUNTY"
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "Clinton/Van Buren Ag Candidate Geography",
  kind: "geography",
  related_id: "AR-GEO-VAN-BUREN-COUNTY"
});
kgDoc.nodes.push({
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "AR Meat Inspection Infrastructure Research Track",
  kind: "system",
  related_module: "CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE"
});
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

buildState.version = "0.4.4";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_ARKANSAS_AG_GEOGRAPHY_PAIR_AND_MEAT_INSPECTION_RESEARCH_TRACK_1_0_RETURN.md";
buildState.writing_focus =
  "Arkansas County + Clinton/Van Buren added as CANDIDATE ag pair; Clinton processing hub = hypothesis; meat-inspection track OPEN; no doctrine expansion.";
buildState.next_action =
  "Either (a) FSIS directory test of Clinton hub + county Census Ag profiles, or (b) first-20 below-STRONG repair, or (c) meat-inspection comparative-state module.";
buildState.arkansas_geography_set = "ACTIVE_10_LOCATIONS_2_CANDIDATE_AG";
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Added Arkansas County + Clinton/Van Buren as CANDIDATE ag contrast pair (10 geographies). Clinton USDA hub = hypothesis. Meat-inspection research track OPEN. Sources ${srcDoc.sources.length}. No doctrine expansion.`,
  return_report:
    "reports/CC_PHASE_2_1_ARKANSAS_AG_GEOGRAPHY_PAIR_AND_MEAT_INSPECTION_RESEARCH_TRACK_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Arkansas Ag Geography Pair and Meat Inspection Research Track",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "geography set v1.1 with two CANDIDATE ag locations",
    "CC-HYP-CLINTON-PROCESSING-HUB",
    "meat inspection research track OPEN",
    "CC-SRC-120–125",
    "complementarity research posture (not doctrine)"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-COUNTY-AG-ARCHETYPE-EVIDENCE-1.0",
  alternate_next: [
    "CC-PHASE-2.1-ARKANSAS-MEAT-INSPECTION-COMPARATIVE-STATE-MODULE-1.0",
    "CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-OR-MEATPACKING-ANTITRUST-INFLUENCE-MODULE-1.0"
  ],
  note: "Candidate geographies only. No forced LCL. Capture/doctrine unchanged."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_ARKANSAS_AG_GEOGRAPHY_PAIR_AND_MEAT_INSPECTION_RESEARCH_TRACK_1_0_RETURN.md",
  `# ${SLICE} — Return

## 1. Executive Summary

Added **Arkansas County** and **Clinton / Van Buren County** to the designated geography set as **CANDIDATE** agricultural contrast geographies. Statewide processing bottleneck and FSIS legal pathway registered. Clinton-as-regional-USDA-hub remains a **hypothesis**. Meat-inspection infrastructure track **OPEN** (not answered). No Family Farm doctrine expansion.

**Sources: ${srcDoc.sources.length}** · **Geographies: ${geoSet.locations.length}** · **Baseline: 2/86** · **GATE-02: unchanged**

## 2. Geography Additions

| ID | Archetype | Posture |
|---|---|---|
| AR-GEO-ARKANSAS-COUNTY | Large-scale commodity / export (candidate) | County dominance claims **not** canonical yet |
| AR-GEO-VAN-BUREN-COUNTY | Family-farm / livestock / specialty / processing (candidate) | Clinton hub role = **hypothesis** |

## 3. What Statewide Evidence Supports

- Processing bottleneck + chicken-and-egg (CC-SRC-120, CC-SRC-121)
- State MPI / CIS legal pathway (CC-SRC-122)
- FSIS establishment directory as test instrument (CC-SRC-123)
- AR ag scale/diversity context (CC-SRC-124); family-farm heterogeneity (CC-SRC-125 / CC-SRC-073)

## 4. What Remains Unproven

- Arkansas County production/export dominance
- Clinton as the place many family farms take livestock for USDA processing
- Net benefits of an Arkansas state meat inspection program

## 5. Open Module

\`CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE\` — primary RQ CC-RQ-P21-037; must test both sides.

## 6. Hypotheses / RQs

- **CC-HYP-CLINTON-PROCESSING-HUB** KEEP
- **CC-RQ-P21-037/038/039** OPEN

## 7. Research Posture (not doctrine)

Complementary agriculture: infrastructure for **each** productive model — reject false choice.

## 8. Validators

| Command | Result |
|---|---|
| \`pnpm research:validate\` | PENDING |
| \`pnpm phase2:validate\` | PENDING |
| \`pnpm graph:validate\` | PENDING |
| \`pnpm baseline:validate\` | PENDING |

## 9. Commit Hash

PENDING_COMMIT

## 10. Exact Next Recommended Slice

\`CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-COUNTY-AG-ARCHETYPE-EVIDENCE-1.0\`

Alternate: comparative-state meat-inspection module, or first-20 below-STRONG repair.
`
);

console.log("=== COMPLETE ===");
console.log("sources", srcDoc.sources.length);
console.log("geographies", geoSet.locations.length);
console.log("clinton hub: HYPOTHESIS_ONLY");
console.log("meat inspection track: OPEN");
