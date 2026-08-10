/**
 * CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0
 *
 * Diagnose Arkansas civic-information conditions BEFORE researching financing.
 * Unit of analysis: institutional coverage — not outlet count.
 * No composite scores. No invented coverage frequencies.
 * No new principle / doctrine.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0";
const MOD =
  "CC-MOD-LOCAL-INDEPENDENT-JOURNALISM-AND-CIVIC-INFORMATION-INFRASTRUCTURE";
const HYP = "CC-HYP-LOCAL-INDEPENDENT-JOURNALISM-ECOSYSTEM";

function wj(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function wt(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const INSTITUTIONS = [
  "city_council",
  "quorum_court",
  "school_board",
  "planning_commission",
  "courts",
  "public_safety",
  "utilities",
  "hospital_board",
  "economic_development_authority",
  "elections",
  "budgets_procurement",
  "local_business",
  "agriculture",
  "nonprofits_community_life",
];

const MATRIX_VARS = [
  "frequency",
  "depth",
  "original_reporting",
  "reporter_locality",
  "public_record_use",
  "continuity",
];

const CODING = {
  NOT_YET_CODED: "not_yet_coded",
  DOCUMENTED_PRESENCE: "documented_presence_claim",
  SELF_DESCRIBED: "outlet_self_description",
  WEAK_SIGNAL: "weak_signal_not_coverage_proof",
  ABSENT_IN_SAMPLE: "absent_in_homepage_sample",
};

const geos = [
  {
    geography_id: "AR-GEO-SEARCY-COUNTY",
    name: "Searcy County",
    contrast_role: "deeply_rural",
    population_band: "~1.5k–15k class (very rural)",
  },
  {
    geography_id: "AR-GEO-LAFAYETTE-COUNTY",
    name: "Lafayette County",
    contrast_role: "small_rural_delta_border",
    population_band: "~1.5k–15k class (very rural)",
  },
  {
    geography_id: "AR-GEO-WEST-HELENA",
    name: "West Helena / Helena-West Helena (Phillips County)",
    contrast_role: "distressed_delta",
    population_band: "municipal + county Delta market",
  },
  {
    geography_id: "AR-GEO-JACKSONVILLE",
    name: "Jacksonville (Pulaski County municipality)",
    contrast_role: "municipal_suburban_granular_test",
    population_band: "municipal within metro orbit",
  },
  {
    geography_id: "AR-GEO-BENTON-COUNTY",
    name: "Benton County",
    contrast_role: "high_growth_high_prosperity",
    population_band: "~150k class information market",
  },
  {
    geography_id: "AR-GEO-PULASKI-COUNTY",
    name: "Pulaski County",
    contrast_role: "metropolitan_state_government_media",
    population_band: "~150k+ class / state capital market",
  },
];

const outlets = [
  {
    outlet_id: "AR-OUT-001",
    name: "Marshall Mountain Wave",
    geography_ids: ["AR-GEO-SEARCY-COUNTY"],
    medium: "newspaper_print_digital",
    ownership_form: "chain_owned_cherryroad_media",
    ownership_notes: "LOC catalog lists CherryRoad Media, Inc.; chamber page lists cherryroad.com staff contacts.",
    url: "https://www.emountainwave.com/",
    original_vs_aggregation: "appears_to_publish_staff_and_community_items",
    verification: "url_verified_homepage_2026-08-10",
    source_ids: ["CC-SRC-149", "CC-SRC-150"],
    notes: "Nominal local paper present. Homepage sample (2026-08-10) dominated by community/lifestyle; school-board meeting listed under Events calendar — calendar listing ≠ meeting coverage proof.",
  },
  {
    outlet_id: "AR-OUT-002",
    name: "Lafayette County Press",
    geography_ids: ["AR-GEO-LAFAYETTE-COUNTY"],
    medium: "newspaper_print_digital",
    ownership_form: "locally_owned_independent_claimed",
    ownership_notes: "Publisher/editor Tommy & Lucy Goodwin (Stamps) per outlet about page.",
    url: "https://www.lafayettecountypress.com/",
    original_vs_aggregation: "claims_local_original_coverage",
    verification: "url_verified_2026-08-10",
    source_ids: ["CC-SRC-151"],
    notes: "Nominal county paper present. Institutional coverage frequencies not yet content-coded.",
  },
  {
    outlet_id: "AR-OUT-003",
    name: "Lafayette County Democrat",
    geography_ids: ["AR-GEO-LAFAYETTE-COUNTY"],
    medium: "newspaper_print",
    ownership_form: "unknown_requires_verification",
    ownership_notes: "LOC catalog entry exists (sn89051457); current operating status and digital presence require field verification.",
    url: "https://www.loc.gov/item/sn89051457/",
    original_vs_aggregation: "unknown",
    verification: "catalog_presence_only_not_active_site_audit",
    source_ids: ["CC-SRC-152"],
    notes: "Do not count as proven active digital coverage without operating-site confirmation.",
  },
  {
    outlet_id: "AR-OUT-004",
    name: "Helena World (Helena-West Helena World)",
    geography_ids: ["AR-GEO-WEST-HELENA"],
    medium: "newspaper_print_digital",
    ownership_form: "locally_owned_after_2019_rescue",
    ownership_notes: "Local purchase Sept 2019 after GateHouse closure attempt (ADG feature).",
    url: "https://www.helenaworld.org/",
    original_vs_aggregation: "original_local_reporting_documented",
    verification: "url_verified_homepage_2026-08-10",
    source_ids: ["CC-SRC-153", "CC-SRC-154"],
    notes: "Strongest rural/Delta evidence in this pilot that nominal paper ≠ dead paper: city-council stories on site; ADG 2020 feature describes Quorum Court/City Council/school-board attendance. Still needs systematic matrix coding.",
  },
  {
    outlet_id: "AR-OUT-005",
    name: "The Arkansas Leader",
    geography_ids: ["AR-GEO-JACKSONVILLE"],
    medium: "newspaper_print_digital",
    ownership_form: "family_owned_local",
    ownership_notes: "Self-described family-owned; Jacksonville address 404 Graham Rd.",
    url: "https://www.arkansasleader.com/",
    original_vs_aggregation: "claims_original_local_government_coverage",
    verification: "url_verified_2026-08-10",
    source_ids: ["CC-SRC-155"],
    notes: "Self-describes coverage of local city councils/schools. Self-description ≠ coded frequency/depth audit.",
  },
  {
    outlet_id: "AR-OUT-006",
    name: "Northwest Arkansas Democrat-Gazette",
    geography_ids: ["AR-GEO-BENTON-COUNTY"],
    medium: "newspaper_print_digital_daily",
    ownership_form: "wehco_family_owned_regional",
    ownership_notes: "WEHCO / Northwest Arkansas Newspapers joint structure; Community Journalism Project philanthropic support layer.",
    url: "https://www.nwaonline.com/",
    original_vs_aggregation: "original_staff_reporting",
    verification: "url_verified_2026-08-10",
    source_ids: ["CC-SRC-156", "CC-SRC-157"],
    notes: "High-capacity regional daily covers Benton County government (e.g., industrial-development authority / Quorum Court reporting). Capacity ≠ every institution routinely covered.",
  },
  {
    outlet_id: "AR-OUT-007",
    name: "Arkansas Democrat-Gazette",
    geography_ids: ["AR-GEO-PULASKI-COUNTY", "AR-GEO-JACKSONVILLE"],
    medium: "newspaper_print_digital_statewide",
    ownership_form: "wehco_family_owned",
    ownership_notes: "Statewide capital paper; Community Journalism Project donor layer via Arkansas Community Foundation.",
    url: "https://www.arkansasonline.com/",
    original_vs_aggregation: "original_staff_reporting",
    verification: "url_verified_2026-08-10",
    source_ids: ["CC-SRC-158", "CC-SRC-159"],
    notes: "Metro/state capacity present. Jacksonville stories may appear; municipal granular continuity still needs coding vs Arkansas Leader.",
  },
  {
    outlet_id: "AR-OUT-008",
    name: "Arkansas Times",
    geography_ids: ["AR-GEO-PULASKI-COUNTY"],
    medium: "digital_alt_weekly_roots",
    ownership_form: "independent_alt",
    ownership_notes: "Longstanding Little Rock alternative outlet (Encyclopedia of Arkansas).",
    url: "https://arktimes.com/",
    original_vs_aggregation: "original_and_commentary_mix",
    verification: "established_outlet_bibliography",
    source_ids: ["CC-SRC-160"],
    notes: "Metro alternative voice — institutional coverage patterns require separate coding.",
  },
  {
    outlet_id: "AR-OUT-009",
    name: "Arkansas Nonprofit News Network (ANNN)",
    geography_ids: ["AR-GEO-PULASKI-COUNTY", "AR-GEO-BENTON-COUNTY"],
    medium: "nonprofit_investigative_distributed",
    ownership_form: "nonprofit",
    ownership_notes: "Independent nonprofit; stories republished by partner newsrooms statewide.",
    url: "https://arknews.org/",
    original_vs_aggregation: "original_investigative_then_distributed",
    verification: "url_verified_about_page_2026-08-10",
    source_ids: ["CC-SRC-161"],
    notes: "Important for distinguishing original production vs partner aggregation/reposting.",
  },
  {
    outlet_id: "AR-OUT-010",
    name: "KUAR / Little Rock Public Radio",
    geography_ids: ["AR-GEO-PULASKI-COUNTY"],
    medium: "public_radio",
    ownership_form: "university_public_media",
    ownership_notes: "UA Little Rock public service unit; collaboration grants with KUAF/KASU noted in 2025 WRF award coverage.",
    url: "https://www.ualrpublicradio.org/",
    original_vs_aggregation: "original_broadcast_and_partner_content",
    verification: "institutional_presence_documented",
    source_ids: ["CC-SRC-162"],
    notes: "Radio medium gap-fill relative to print-only desert measures.",
  },
];

function emptyMatrixRow(geography_id, institution) {
  const vars = {};
  for (const v of MATRIX_VARS) {
    vars[v] = {
      code: CODING.NOT_YET_CODED,
      evidence: null,
      notes: "Requires systematic content audit (sample window + coder protocol).",
    };
  }
  return { geography_id, institution, variables: vars, coding_status: "open" };
}

const matrixRows = [];
for (const g of geos) {
  for (const inst of INSTITUTIONS) {
    matrixRows.push(emptyMatrixRow(g.geography_id, inst));
  }
}

// Documented evidence overlays (sparse — honesty over completeness)
function setVar(geo, inst, variable, code, evidence, notes) {
  const row = matrixRows.find((r) => r.geography_id === geo && r.institution === inst);
  if (!row) return;
  row.variables[variable] = { code, evidence, notes };
  row.coding_status = "partial";
}

// Helena — ADG feature documents meeting attendance pattern (not a frequency score)
setVar(
  "AR-GEO-WEST-HELENA",
  "quorum_court",
  "continuity",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-154"],
  "ADG 2020 feature: editor/publisher described as present at Quorum Court meetings. Not a quantified frequency score.",
);
setVar(
  "AR-GEO-WEST-HELENA",
  "city_council",
  "continuity",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-154", "CC-SRC-153"],
  "ADG 2020 feature + 2026 homepage city-council stories indicate ongoing municipal coverage capacity.",
);
setVar(
  "AR-GEO-WEST-HELENA",
  "school_board",
  "continuity",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-154"],
  "ADG 2020 feature mentions school-board attendance. Needs current-window coding.",
);
setVar(
  "AR-GEO-WEST-HELENA",
  "city_council",
  "original_reporting",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-153"],
  "Homepage sample shows bylined/staff city-council reporting.",
);

// Jacksonville Leader — self-description of city council coverage
setVar(
  "AR-GEO-JACKSONVILLE",
  "city_council",
  "original_reporting",
  CODING.SELF_DESCRIBED,
  ["CC-SRC-155"],
  "Outlet about text claims city-council reporting. Content-frequency audit still required.",
);
setVar(
  "AR-GEO-JACKSONVILLE",
  "school_board",
  "original_reporting",
  CODING.SELF_DESCRIBED,
  ["CC-SRC-155"],
  "Outlet about text claims school coverage. Not yet coded for depth/frequency.",
);

// Searcy — weak calendar signal
setVar(
  "AR-GEO-SEARCY-COUNTY",
  "school_board",
  "frequency",
  CODING.WEAK_SIGNAL,
  ["CC-SRC-149"],
  "Homepage Events listed a school-board meeting time. Calendar listing is NOT meeting coverage.",
);

// Benton — documented Quorum Court / economic development reporting examples exist via NWA ADG
setVar(
  "AR-GEO-BENTON-COUNTY",
  "economic_development_authority",
  "original_reporting",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-163"],
  "NWA ADG reporting on proposed industrial development authority / Quorum Court process (example story). Does not prove continuous coverage of all ED entities.",
);
setVar(
  "AR-GEO-BENTON-COUNTY",
  "quorum_court",
  "original_reporting",
  CODING.DOCUMENTED_PRESENCE,
  ["CC-SRC-163"],
  "Staff beat reporting references Quorum Court actions. Full continuity coding open.",
);

wj("research/phase_2/arkansas_local_news_outlet_inventory.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: MOD,
  related_hypothesis: HYP,
  unit_of_analysis_rule:
    "Institutional coverage is the unit of analysis. Outlet presence is necessary context but not sufficient evidence of adequate journalism.",
  mediums_in_scope: [
    "newspaper",
    "radio",
    "television",
    "digital_only",
    "newsletter",
    "podcast",
    "video_channel",
    "nonprofit_newsroom",
    "university_student_journalism",
    "hyperlocal",
  ],
  original_vs_aggregation_rule:
    "Distinguish original reporting from aggregation/reposting. ANNN partner republishing is distribution, not local original production by the partner.",
  geographies: geos,
  outlets,
  inventory_findings: {
    all_six_geographies_have_at_least_one_nominal_or_regional_outlet: true,
    ownership_concentration_signals: [
      "CherryRoad Media ownership of Marshall Mountain Wave (chain)",
      "WEHCO regional/statewide dominance in Benton + Pulaski markets",
      "Local-ownership rescue case: Helena World (2019)",
      "Family-owned municipal paper: Arkansas Leader (Jacksonville)",
    ],
    medium_gaps_observed_in_pilot: [
      "Television local-news inventory not yet systematically coded per geography",
      "Podcasts/newsletters/video channels under-sampled",
      "University/student journalism not yet mapped per geography",
      "Rural radio newscasts claimed regionally (ArkansasRadio.com) — Jacksonville listed in market list; beat-level coding open",
    ],
    do_not_infer: [
      "No Arkansas 'news desert' scores invented from this inventory",
      "No claim that every listed outlet provides adequate institutional scrutiny",
      "No composite civic-information index yet",
    ],
  },
  last_updated: TODAY,
});

wj("research/phase_2/civic_information_coverage_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  module_id: MOD,
  title: "Civic Information Coverage Matrix (pilot)",
  matrix_definition:
    "Institution × frequency × depth × original_reporting × reporter_locality × public_record_use × continuity",
  variables: MATRIX_VARS,
  institutions: INSTITUTIONS,
  coding_vocabulary: CODING,
  no_composite_score: true,
  no_composite_score_reason:
    "First learn which variables survive collection. Composite scores deferred until coder reliability and missingness are understood.",
  falsification_question:
    "Does the presence of a nominal local news outlet meaningfully predict sustained independent scrutiny of the institutions exercising public power?",
  falsification_preliminary_answer: {
    status: "INCOMPLETE_BUT_DIRECTIONAL",
    statement:
      "In this pilot, all six designated geographies show at least one nominal or regional outlet — yet nearly all Institution×variable cells remain not_yet_coded. Therefore outlet presence alone does NOT yet demonstrate sustained independent institutional scrutiny. Conventional news-desert measures (paper present/absent) are insufficient for Constitutional Capitalism purposes until coverage matrices are populated.",
    what_would_confirm:
      "Coded windows showing regular original coverage of high-power institutions where outlets exist — or systematic absence despite outlet presence.",
    what_would_falsify_insufficiency_claim:
      "If outlet presence strongly predicted high continuity/depth across institutions after rigorous coding, desert/outlet metrics might suffice for some geographies.",
  },
  rows: matrixRows,
  coding_stats: {
    total_cells: matrixRows.length * MATRIX_VARS.length,
    partially_coded_rows: matrixRows.filter((r) => r.coding_status === "partial").length,
    open_rows: matrixRows.filter((r) => r.coding_status === "open").length,
  },
  next_coding_protocol: {
    sample_window: "Recommend 90-day rolling window per geography",
    unit: "story/meeting-coverage instance",
    distinguish: ["original", "wire_repost", "press_release_rewrite", "calendar_only"],
    dual_coder_pilot: "Required before any score aggregation",
  },
  last_updated: TODAY,
});

wt(
  "research/phase_2/civic_information_coverage_matrix_schema.md",
  `# Civic Information Coverage Matrix — Schema (Pilot)

**Slice:** \`${SLICE}\`  
**Rule:** No composite score yet.

## Dimensions

| Dimension | Meaning | Allowed pilot codes |
| --- | --- | --- |
| frequency | How often the institution appears in original coverage | not_yet_coded / later: none, rare, intermittent, regular |
| depth | Meeting notes vs accountability reporting | not_yet_coded / later: mention, summary, accountability, investigation |
| original_reporting | Original vs aggregation/repost | not_yet_coded / documented_presence_claim / outlet_self_description / … |
| reporter_locality | Local beat vs distant/parachute | not_yet_coded |
| public_record_use | FOIA/minutes/budgets evident | not_yet_coded |
| continuity | Sustained over time vs one-off | not_yet_coded / documented_presence_claim / weak_signal… |

## Institutions in scope

City councils · Quorum courts · School boards · Planning commissions · Courts · Public safety · Utilities · Hospital boards · Economic-development authorities · Elections · Budgets/procurement · Local business · Agriculture · Nonprofits/community life

## Falsification question

> Does the presence of a nominal local news outlet meaningfully predict sustained independent scrutiny of the institutions exercising public power?

If **no**, conventional news-desert measures are insufficient for this research program.
`,
);

// --- Register sources ---
const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const newSources = [
  {
    source_id: "CC-SRC-149",
    title: "Marshall Mountain Wave — homepage",
    authors: ["Marshall Mountain Wave / CherryRoad Media"],
    year: 2026,
    url: "https://www.emountainwave.com/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Searcy County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Active digital front page for Searcy County weekly. Documents outlet presence; homepage sample used for weak-signal observation (events calendar listing school-board meeting), not for inventing coverage rates.",
    key_findings: [
      "Nominal local newspaper outlet exists for Searcy County",
      "Homepage sample shows community/lifestyle emphasis in retrieved view",
    ],
    limitations: "Single retrieval snapshot; not a content census; ownership/chain dynamics require separate confirmation beyond LOC/chamber notes.",
    ideological_or_institutional_considerations: "Chain-owned local weekly context.",
    verification_status: "url_verified",
    notes: "AR outlet inventory pilot AR-OUT-001",
  },
  {
    source_id: "CC-SRC-150",
    title: "Marshall Mountain Wave — Library of Congress newspaper catalog entry",
    authors: ["Library of Congress"],
    year: 2022,
    url: "https://www.loc.gov/item/2022201585/",
    source_type: "catalog",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Searcy County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "catalog",
    retrieval_date: TODAY,
    summary: "LOC catalog identifies Marshall Mountain Wave (Marshall, AR) as weekly newspaper with publisher CherryRoad Media, Inc.",
    key_findings: ["Documents title, place, weekly frequency, CherryRoad Media publisher attribution in catalog"],
    limitations: "Catalog metadata ≠ coverage quality; begin date notes uncertain in record.",
    ideological_or_institutional_considerations: "Neutral bibliographic record.",
    verification_status: "url_verified",
    notes: "Ownership attribution for AR-OUT-001",
  },
  {
    source_id: "CC-SRC-151",
    title: "Lafayette County Press — site / about",
    authors: ["Lafayette County Press"],
    year: 2026,
    url: "https://www.lafayettecountypress.com/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Lafayette County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary: "County newspaper site (Stamps) documenting ongoing publication/subscription presence for Lafayette County.",
    key_findings: ["Nominal local county paper present", "About history claims 1997 founding and APA acceptance"],
    limitations: "Institutional coverage not coded from this registration alone.",
    ideological_or_institutional_considerations: "Local independent claim — verify continuously.",
    verification_status: "url_verified",
    notes: "AR-OUT-002",
  },
  {
    source_id: "CC-SRC-152",
    title: "Lafayette County Democrat — Library of Congress catalog",
    authors: ["Library of Congress"],
    year: 1905,
    url: "https://www.loc.gov/item/sn89051457/",
    source_type: "catalog",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Lafayette County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "catalog",
    retrieval_date: TODAY,
    summary: "LOC catalog entry for Lafayette County Democrat (Stamps/Lewisville). Used only as bibliographic presence signal pending operating-status verification.",
    key_findings: ["Historical/catalog presence of a second Lafayette title"],
    limitations: "Does not prove current digital operation or coverage quality.",
    ideological_or_institutional_considerations: "Neutral bibliographic record.",
    verification_status: "url_verified",
    notes: "AR-OUT-003 — status uncertain",
  },
  {
    source_id: "CC-SRC-153",
    title: "Helena World — homepage",
    authors: ["Helena World"],
    year: 2026,
    url: "https://www.helenaworld.org/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Phillips County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary: "Active Helena-West Helena weekly site showing city-council and local public-safety reporting in retrieved homepage sample.",
    key_findings: ["Outlet active", "Municipal government stories present in sample"],
    limitations: "Homepage sample ≠ full matrix coding.",
    ideological_or_institutional_considerations: "Locally owned post-2019 rescue context (see CC-SRC-154).",
    verification_status: "url_verified",
    notes: "AR-OUT-004",
  },
  {
    source_id: "CC-SRC-154",
    title: "For newspaper, the world is local (Arkansas Democrat-Gazette feature on Helena World)",
    authors: ["Stephen Steed", "Arkansas Democrat-Gazette"],
    year: 2020,
    url: "https://www.arkansasonline.com/news/2020/sep/20/for-newspaper-the-world-is-local/",
    source_type: "news_feature",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "Phillips County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "2020-09-20",
    retrieval_date: TODAY,
    summary:
      "Feature on local purchase of Helena World after GateHouse closure attempt; describes editor/publisher attending Quorum Court, City Council, and school-board meetings and shift to weekly publication under local owners.",
    key_findings: [
      "Documents 2019 local ownership rescue",
      "Describes meeting-attendance practice for major local boards",
      "Illustrates that corporate closure risk ≠ permanent information loss when local capital re-enters",
    ],
    limitations: "2020 snapshot; not a 2026 content census; ADG is also a competitor/observer.",
    ideological_or_institutional_considerations: "Statewide paper covering rural peer outlet.",
    verification_status: "url_verified",
    notes: "Strong qualitative evidence for coverage-capacity distinction vs outlet-count.",
  },
  {
    source_id: "CC-SRC-155",
    title: "The Arkansas Leader — about / contact (Jacksonville)",
    authors: ["The Arkansas Leader"],
    year: 2026,
    url: "https://www.arkansasleader.com/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Jacksonville / north Pulaski, AR",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Family-owned community newspaper (founded 1987) covering Jacksonville and nearby communities; self-describes city-council and school reporting.",
    key_findings: ["Municipal-focused outlet exists for Jacksonville test case", "Self-described local government beat"],
    limitations: "Self-description requires content-audit confirmation for frequency/depth.",
    ideological_or_institutional_considerations: "Local family ownership claim.",
    verification_status: "url_verified",
    notes: "AR-OUT-005",
  },
  {
    source_id: "CC-SRC-156",
    title: "Northwest Arkansas Democrat-Gazette — site",
    authors: ["Northwest Arkansas Democrat-Gazette / WEHCO"],
    year: 2026,
    url: "https://www.nwaonline.com/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Northwest Arkansas incl. Benton County",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary: "Regional daily serving high-growth NWA market including Benton County.",
    key_findings: ["High-capacity regional daily present in Benton contrast geography"],
    limitations: "Presence ≠ complete institutional matrix coverage.",
    ideological_or_institutional_considerations: "WEHCO family ownership + philanthropic Community Journalism Project layer.",
    verification_status: "url_verified",
    notes: "AR-OUT-006",
  },
  {
    source_id: "CC-SRC-157",
    title: "Northwest Arkansas Democrat-Gazette Community Journalism Project",
    authors: ["Northwest Arkansas Democrat-Gazette", "Arkansas Community Foundation"],
    year: 2025,
    url: "https://www.nwajournalism.org/",
    source_type: "program_documentation",
    reliability: "primary_institutional",
    primary_or_secondary: "primary",
    jurisdiction: "Northwest Arkansas",
    research_domain: "civic_information_journalism",
    publication_date: "program",
    retrieval_date: TODAY,
    summary:
      "Philanthropic support vehicle for NWA Democrat-Gazette newsroom; claims donor non-interference with editorial control. Comparative note for public/philanthropic finance + firewall research — not a citizen-credit model.",
    key_findings: ["Documents hybrid commercial+philanthropic financing in high-growth market", "States editorial independence from donors"],
    limitations: "Self-described firewalls; not NJ CIC; not citizen-directed allocation.",
    ideological_or_institutional_considerations: "Walton Family Foundation matching noted in related ADG coverage — donor concentration risk is a research question.",
    verification_status: "url_verified",
    notes: "Finance-stack evidence for Benton contrast",
  },
  {
    source_id: "CC-SRC-158",
    title: "Arkansas Democrat-Gazette — about / core values",
    authors: ["Arkansas Democrat-Gazette / WEHCO"],
    year: 2026,
    url: "https://www.arkansasonline.com/corevalues/",
    source_type: "news_outlet_primary",
    reliability: "primary_outlet",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas / Pulaski County",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary: "Statewide capital daily based in Little Rock; documents WEHCO newspaper footprint and subscription model.",
    key_findings: ["Metro/state information capacity anchor for Pulaski geography"],
    limitations: "Statewide scope can under-serve granular municipal institutions without local weeklies.",
    ideological_or_institutional_considerations: "Dominant statewide commercial paper.",
    verification_status: "url_verified",
    notes: "AR-OUT-007",
  },
  {
    source_id: "CC-SRC-159",
    title: "Arkansas Democrat-Gazette Community Journalism Project",
    authors: ["Arkansas Democrat-Gazette", "Arkansas Community Foundation"],
    year: 2024,
    url: "https://www.arcommunitynews.org/",
    source_type: "program_documentation",
    reliability: "primary_institutional",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "civic_information_journalism",
    publication_date: "program",
    retrieval_date: TODAY,
    summary: "Donor-supported project claiming editorial independence; relevant comparative financing structure for Pulaski/state market.",
    key_findings: ["Philanthropic layer atop commercial statewide paper"],
    limitations: "Not citizen-directed credits; donor influence risk remains research question despite stated firewalls.",
    ideological_or_institutional_considerations: "Finance + firewall dossier input for NJ CIC comparison later.",
    verification_status: "url_verified",
    notes: "Pulaski finance-stack",
  },
  {
    source_id: "CC-SRC-160",
    title: "Arkansas Times — Encyclopedia of Arkansas entry",
    authors: ["Encyclopedia of Arkansas"],
    year: 2024,
    url: "https://encyclopediaofarkansas.net/entries/arkansas-times-3060/",
    source_type: "encyclopedia",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "Pulaski County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "entry",
    retrieval_date: TODAY,
    summary: "Reference entry on Arkansas Times history as Little Rock alternative media outlet and relationship to ANNN founding.",
    key_findings: ["Documents longstanding alt outlet in capital market", "Notes ANNN founding connection/independence"],
    limitations: "Secondary encyclopedia; coverage matrix still required.",
    ideological_or_institutional_considerations: "Editorial tradition differs from ADG — diversity of metro voices matters.",
    verification_status: "url_verified",
    notes: "AR-OUT-008 bibliography",
  },
  {
    source_id: "CC-SRC-161",
    title: "About ANNN — Arkansas Nonprofit News Network",
    authors: ["Arkansas Nonprofit News Network"],
    year: 2026,
    url: "https://arknews.org/index.php/about/",
    source_type: "program_documentation",
    reliability: "primary_institutional",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Nonprofit investigative outlet distributing free reporting to partner newsrooms statewide. Critical for original-vs-aggregation coding (partners republish ANNN originals).",
    key_findings: ["Statewide nonprofit investigative production model", "Partner redistribution list includes KUAR/KUAF and many newspapers"],
    limitations: "Does not by itself fill rural meeting-coverage gaps; topic selection may differ from local beats.",
    ideological_or_institutional_considerations: "Philanthropic/donor funded — independence claims to test.",
    verification_status: "url_verified",
    notes: "AR-OUT-009",
  },
  {
    source_id: "CC-SRC-162",
    title: "Winthrop Rockefeller Foundation award to Little Rock Public Radio (UA Little Rock news)",
    authors: ["UA Little Rock"],
    year: 2025,
    url: "https://ualr.edu/news/2025/01/15/radio-grant/",
    source_type: "university_news",
    reliability: "secondary_institutional",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "civic_information_journalism",
    publication_date: "2025-01-15",
    retrieval_date: TODAY,
    summary:
      "Announces $50,000 WRF support for collaboration among KUAR, KUAF, and KASU to expand independent reporting — evidence of public-radio medium and shared-services experimentation.",
    key_findings: ["Public-radio collaborative capacity agenda in Arkansas", "Philanthropic support framed as news-desert response"],
    limitations: "Grant announcement ≠ measured coverage outcomes; dollar figure is source fact, not CC proposal.",
    ideological_or_institutional_considerations: "University public media + foundation finance.",
    verification_status: "url_verified",
    notes: "AR-OUT-010 medium diversity",
  },
  {
    source_id: "CC-SRC-163",
    title: "Benton County residents decry proposed industrial development authority (NWA Democrat-Gazette)",
    authors: ["Thomas Saccente", "Northwest Arkansas Democrat-Gazette"],
    year: 2026,
    url: "https://www.arkansasonline.com/news/2026/apr/12/benton-county-residents-decry-proposed-industrial/",
    source_type: "news_article",
    reliability: "primary_outlet_reporting",
    primary_or_secondary: "primary",
    jurisdiction: "Benton County, AR",
    research_domain: "civic_information_journalism",
    publication_date: "2026-04-12",
    retrieval_date: TODAY,
    summary:
      "Example beat story covering Benton County Quorum Court-related industrial development authority controversy — used as documented original reporting presence for ED/quorum-court matrix cells, not as a frequency score.",
    key_findings: ["Shows NWA ADG producing original Benton County government accountability coverage"],
    limitations: "Single story ≠ continuity metric across all institutions.",
    ideological_or_institutional_considerations: "Commercial regional paper beat reporting.",
    verification_status: "url_verified",
    notes: "Matrix evidence overlay for Benton",
  },
];

const existingIds = new Set(srcDoc.sources.map((s) => s.source_id));
for (const s of newSources) {
  if (!existingIds.has(s.source_id)) {
    srcDoc.sources.push(s);
    existingIds.add(s.source_id);
  }
}
srcDoc.last_updated = TODAY;
srcDoc.note = (srcDoc.note || "") + ` Phase 2.1 (${TODAY}): CC-SRC-149–163 Arkansas local-news outlet map / coverage matrix pilot.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] source_registry +15 sources (149–163)");

// Research questions
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const newRQs = [
  {
    id: "CC-RQ-P21-060",
    domain: "civic_information_journalism",
    question:
      "For each designated geography, which institutions exercising public power receive original independent coverage in a 90-day window, at what depth, and by which outlet?",
    status: "open",
    related_hypothesis: HYP,
    related_module: MOD,
    slice_id: SLICE,
  },
  {
    id: "CC-RQ-P21-061",
    domain: "civic_information_journalism",
    question:
      "Does nominal local-outlet presence predict sustained institutional scrutiny after matrix coding — or are coverage deserts common inside communities that still 'have a newspaper'?",
    status: "open",
    related_hypothesis: HYP,
    related_module: MOD,
    slice_id: SLICE,
  },
  {
    id: "CC-RQ-P21-062",
    domain: "civic_information_journalism",
    question:
      "How should original reporting be distinguished from ANNN/partner redistribution, wire copy, and calendar-only notices in Arkansas coding?",
    status: "open",
    related_hypothesis: HYP,
    related_module: MOD,
    slice_id: SLICE,
    related_sources: ["CC-SRC-161"],
  },
];
const rqIds = new Set(rqDoc.questions.map((q) => q.id));
for (const q of newRQs) {
  if (!rqIds.has(q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");
console.log("[OK] research questions 060–062");

// Public reasoning
const prDoc = JSON.parse(fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8"));
const prRecords = [
  {
    record_id: "CC-PR-022",
    change_id: "CC-CHG-P21-JOURN-001",
    claim_id: null,
    change_type: "RESEARCH_FINDING",
    decision: "DIAGNOSE_BEFORE_FINANCE",
    decision_id: "CC-DEC-103",
    adjudicator: "ChatGPT",
    decided_at: TODAY,
    skeptical_reader_question: "Why map outlets instead of designing Civic Information Credits first?",
    public_answer:
      "Because financing should answer a diagnosed failure. If communities already have papers but institutions go uncovered, a credit designed only to 'save newspapers' may miss the real gap: coverage deserts inside communities.",
    what_we_originally_said: "Local Information Commons financing hypotheses registered.",
    what_made_us_question_it: "Risk of solution-first design without Arkansas institutional coverage evidence.",
    what_we_learned:
      "All six pilot geographies show some nominal/regional outlet presence, but nearly all Institution×variable matrix cells remain uncoded — so outlet presence ≠ proven scrutiny.",
    where_our_reasoning_was_weak: "News-desert vocabulary can hide uncovered boards/utilities inside 'served' counties.",
    what_we_now_say:
      "Pilot finding (directional): conventional outlet-presence measures are insufficient until Civic Information Coverage Matrices are populated. No composite score yet.",
    why_we_made_that_decision: "Diagnose first; then test whether NJ CIC / voucher designs address the diagnosed failure.",
    what_we_still_dont_know: "90-day coded frequencies/depths for each institution in each geography.",
    what_else_this_could_affect: ["Citizen-credit design", "Infrastructure-floor definition", "SIE civic-information variables"],
    potential_secondary_effects_or_unintended_consequences: [
      "Readers may think rural Arkansas has 'enough news' because papers exist — matrix is meant to prevent that error",
    ],
    what_evidence_could_change_our_mind_again:
      "Dual-coded matrices showing outlet presence strongly predicts regular original scrutiny across high-power institutions.",
  },
  {
    record_id: "CC-PR-023",
    change_id: "CC-CHG-P21-JOURN-002",
    claim_id: null,
    change_type: "RESEARCH_FINDING",
    decision: "KEEP_MATRIX_WITHOUT_COMPOSITE",
    decision_id: "CC-DEC-103",
    adjudicator: "ChatGPT",
    decided_at: TODAY,
    skeptical_reader_question: "Why not publish a single civic-information score per county?",
    public_answer:
      "Because we do not yet know which variables survive collection or how missingness behaves. A premature index would look precise and be false.",
    what_we_originally_said: "Desire for coverage dashboards.",
    what_made_us_question_it: "Most matrix cells are not_yet_coded; inventing scores would violate project honesty rules.",
    what_we_learned: "Variable survival must precede aggregation.",
    where_our_reasoning_was_weak: "Dashboard aesthetics can outrun measurement validity.",
    what_we_now_say: "Publish the matrix schema + sparse documented overlays; defer composites.",
    why_we_made_that_decision: "Honesty dials / no invented statistics.",
    what_we_still_dont_know: "Intercoder reliability; weightings; equity adjustments.",
    what_else_this_could_affect: ["Observatory metric design", "LCL baselines"],
    potential_secondary_effects_or_unintended_consequences: ["Slower public narrative — acceptable cost"],
    what_evidence_could_change_our_mind_again: "Completed dual-coded pilot with stable variables.",
  },
];
const prIds = new Set(prDoc.records.map((x) => x.record_id));
for (const rec of prRecords) {
  if (!prIds.has(rec.record_id)) prDoc.records.push(rec);
}
prDoc.slice_id = SLICE;
prDoc.generated_at = TODAY;
fs.writeFileSync(r("research/phase_2/public_reasoning_registry.json"), JSON.stringify(prDoc, null, 2) + "\n");
console.log("[OK] CC-PR-022/023");

wt(
  "reports/public_reasoning/CC-PR-022.md",
  `# CC-PR-022 — Diagnose coverage before financing journalism

${prRecords[0].public_answer}

**Finding:** Outlet presence across all six pilot geographies does not yet prove institutional scrutiny; matrices remain mostly uncoded.
`,
);
wt(
  "reports/public_reasoning/CC-PR-023.md",
  `# CC-PR-023 — No composite civic-information score yet

${prRecords[1].public_answer}
`,
);

// Hypothesis registry note
const hypReg = JSON.parse(
  fs.readFileSync(r("research/phase_2/civic_information_research_hypothesis_registry.json"), "utf8"),
);
hypReg.pilot_execution = {
  slice_id: SLICE,
  status: "OUTLET_INVENTORY_COMPLETE_MATRIX_CODING_PARTIAL",
  falsification_question_status: "INCOMPLETE_BUT_DIRECTIONAL",
  next: "CC-PHASE-2.1-NJ-CIC-AND-JOURNALISM-VOUCHER-COMPARATIVE-DOSSIER-1.0",
  then_return_to: "Clinton/FSIS agriculture track",
};
hypReg.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/civic_information_research_hypothesis_registry.json"),
  JSON.stringify(hypReg, null, 2) + "\n",
);

// Geography set note
const geoSet = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_designated_research_geography_set.json"), "utf8"),
);
geoSet.journalism_outlet_map_pilot = {
  slice_id: SLICE,
  completed_at: TODAY,
  geographies_executed: geos.map((g) => g.geography_id),
  artifacts: [
    "research/phase_2/arkansas_local_news_outlet_inventory.json",
    "research/phase_2/civic_information_coverage_matrix.json",
  ],
};
geoSet.version = "1.3.1";
geoSet.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/arkansas_designated_research_geography_set.json"),
  JSON.stringify(geoSet, null, 2) + "\n",
);

// Slice queue
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const entry = {
  slice_id: SLICE,
  title: "Arkansas Local-News Outlet Map & Coverage Dashboard Pilot",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "arkansas_local_news_outlet_inventory.json",
    "civic_information_coverage_matrix.json",
    "CC-SRC-149–163",
    "CC-PR-022–023",
    "CC-RQ-P21-060–062",
  ],
  next_recommended_slice: "CC-PHASE-2.1-NJ-CIC-AND-JOURNALISM-VOUCHER-COMPARATIVE-DOSSIER-1.0",
  alternate_next: [
    "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0",
    "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0",
  ],
  note: "Diagnose first. No composite scores. No financing proposal. Matrix mostly not_yet_coded by design.",
};
if (!Array.isArray(sliceQueue.slices)) sliceQueue.slices = [];
if (!sliceQueue.slices.some((s) => s.slice_id === SLICE)) sliceQueue.slices.push(entry);
sliceQueue.active_slice = "CC-PHASE-2.1-NJ-CIC-AND-JOURNALISM-VOUCHER-COMPARATIVE-DOSSIER-1.0";
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");
console.log("[OK] slice_queue");

// Build state + return (merge, do not wipe prior keys)
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
Object.assign(buildState, {
  version: "0.4.9",
  last_updated: TODAY,
  mission_id: SLICE,
  slice_return: "reports/CC_PHASE_2_1_AR_LOCAL_NEWS_OUTLET_MAP_AND_COVERAGE_DASHBOARD_PILOT_1_0_RETURN.md",
  writing_focus:
    "Arkansas outlet inventory + Civic Information Coverage Matrix pilot complete. Diagnose coverage deserts before financing. No composite scores. Next: NJ CIC/voucher dossier, then Clinton/FSIS.",
  next_action:
    "Run NJ CIC / voucher comparative dossier against deficiencies found; then return to Clinton/FSIS. Optional: 90-day matrix coding pass.",
  sources_registered: srcDoc.sources.length,
  journalism_module: MOD,
  journalism_hypothesis: HYP,
  journalism_pilot: SLICE,
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");
console.log("[OK] current_build_state (merged)");

wj("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  summary:
    "Arkansas local-news outlet map + Civic Information Coverage Matrix pilot across 6 designated geographies. Outlet presence found in all six; institutional matrix mostly not_yet_coded — directional finding that nominal outlets do not prove sustained scrutiny. Sources CC-SRC-149–163. No composite scores. No financing. No new principle. Next: NJ CIC/voucher dossier, then Clinton/FSIS.",
  module_id: MOD,
  primary_hypothesis: HYP,
  empirical_status: "PARTIAL_DIAGNOSTIC",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  return_path: "reports/CC_PHASE_2_1_AR_LOCAL_NEWS_OUTLET_MAP_AND_COVERAGE_DASHBOARD_PILOT_1_0_RETURN.md",
  next_recommended_slice: "CC-PHASE-2.1-NJ-CIC-AND-JOURNALISM-VOUCHER-COMPARATIVE-DOSSIER-1.0",
});

const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
if (!updates.updates.some((u) => u.id === "UPD-080")) {
  updates.updates.push({
    id: "UPD-080",
    date: TODAY,
    title: "Arkansas local-news outlet map & coverage matrix pilot",
    summary:
      "Under CC-DEC-103 (not doctrine): completed outlet inventory + Civic Information Coverage Matrix pilot for Searcy, Lafayette, West Helena/Phillips, Jacksonville, Benton, and Pulaski. All six show nominal/regional outlets; nearly all Institution×variable cells remain not_yet_coded — directional evidence that outlet presence ≠ sustained institutional scrutiny. No composite scores. No financing proposal. Sources CC-SRC-149–163.",
    public: true,
  });
}
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

wt(
  "reports/CC_PHASE_2_1_AR_LOCAL_NEWS_OUTLET_MAP_AND_COVERAGE_DASHBOARD_PILOT_1_0_RETURN.md",
  `# CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0 — Return

## 1. Executive Summary

Completed the first **diagnostic** execution of the Local Information Commons research module: an Arkansas **outlet inventory** plus a **Civic Information Coverage Matrix** scaffold for six designated geographies.

**Directional finding:** every pilot geography has at least one nominal or regional outlet — but nearly all Institution×variable cells remain \`not_yet_coded\`. Therefore **outlet presence does not yet demonstrate sustained independent scrutiny** of institutions exercising public power. Conventional news-desert / outlet-count measures are **insufficient** for this program until matrices are populated.

No composite scores. No Civic Information Credit dollars. No new principle. Financing research waits for diagnosis.

## 2. Geographies

| Geography | Contrast role | Outlet signal (pilot) |
| --- | --- | --- |
| Searcy County | Deeply rural | Marshall Mountain Wave (CherryRoad) |
| Lafayette County | Small rural / Delta-border | Lafayette County Press (+ Democrat catalog) |
| West Helena / Phillips | Distressed Delta | Helena World (local ownership rescue) |
| Jacksonville | Municipal granular test | Arkansas Leader (family-owned) + ADG metro |
| Benton County | High-growth | NWA Democrat-Gazette (+ CJP philanthropy) |
| Pulaski County | Metro / state government | ADG, Arkansas Times, ANNN, KUAR |

## 3. Artifacts

- \`research/phase_2/arkansas_local_news_outlet_inventory.json\`
- \`research/phase_2/civic_information_coverage_matrix.json\`
- \`research/phase_2/civic_information_coverage_matrix_schema.md\`

## 4. Sources

CC-SRC-149 through CC-SRC-163

## 5. Falsification question

> Does the presence of a nominal local news outlet meaningfully predict sustained independent scrutiny of the institutions exercising public power?

**Preliminary:** Incomplete but directional — **not yet**. Sparse documented overlays (esp. Helena World; Benton ED/Quorum Court examples; Jacksonville self-description) show that *some* scrutiny exists where papers exist, but the matrix is almost entirely open. A community can “have a newspaper” and still contain **coverage deserts** (hospital boards, utilities, planning, etc.) until coded.

## 6. What remains unknown

90-day dual-coded frequency/depth/locality/public-record/continuity for each institution; TV/podcast/newsletter census; Lafayette Democrat operating status; equity of coverage inside metro counties.

## 7. Next

1. **NJ CIC / voucher comparative dossier** — test financing designs against these diagnosed gaps  
2. Optional: 90-day matrix coding pass  
3. Then return to **Clinton/FSIS** agriculture track  

## 8. Freeze compliance

No principle added. No doctrine. Modeling/legal dials untouched. Infrastructure freeze respected (research execution only).
`,
);

// Corpus bridge — add seed sources to research/corpus if present
const corpusPath = r("research/corpus/source_registry.json");
if (fs.existsSync(corpusPath)) {
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  const cids = new Set((corpus.sources || []).map((s) => s.source_id));
  for (const sid of ["CC-SRC-149", "CC-SRC-153", "CC-SRC-154", "CC-SRC-155", "CC-SRC-161"]) {
    if (cids.has(sid)) continue;
    const full = srcDoc.sources.find((s) => s.source_id === sid);
    if (!full) continue;
    corpus.sources.push({
      source_id: full.source_id,
      title: full.title,
      author: (full.authors || []).join("; "),
      organization: (full.authors || [])[0] || "",
      publication: full.title,
      year: full.year,
      country: "US",
      jurisdiction: full.jurisdiction,
      source_type: full.source_type,
      peer_reviewed: false,
      government: false,
      book: false,
      article: full.source_type === "news_article" || full.source_type === "news_feature",
      dataset: false,
      report: false,
      case_study: false,
      statute: false,
      court_opinion: false,
      credibility: full.reliability,
      review_status: "accepted",
      topics: ["Civic Information", "Journalism", "Arkansas"],
      claims_supported: [],
      claims_contradicted: [],
      notes: `Seeded from ${SLICE}`,
    });
  }
  corpus.last_updated = TODAY;
  fs.writeFileSync(corpusPath, JSON.stringify(corpus, null, 2) + "\n");
  console.log("[OK] corpus bridge");
}

console.log("\nPilot complete:", SLICE);
console.log("Sources:", srcDoc.sources.length);
console.log("Matrix rows:", matrixRows.length, "partial:", matrixRows.filter((r) => r.coding_status === "partial").length);
