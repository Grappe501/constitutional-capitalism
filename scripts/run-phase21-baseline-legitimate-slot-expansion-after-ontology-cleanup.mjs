/**
 * CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-AFTER-ONTOLOGY-CLEANUP-1.0
 *
 * Expand cleaned 27/64 empirical baseline only with reproducible primary fills.
 * Do not touch parked design/research items. Do not stuff proxies into deferred debt.
 * Governing rule: a bad metric is worse than a missing metric.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-AFTER-ONTOLOGY-CLEANUP-1.0";
const BEFORE_NUM = 27;
const BEFORE_DEN = 64;
const BEFORE_DISPLAY = "27/64";
const AG_LOCK = "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md";
const NEXT =
  "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0";

const wj = (rel, obj) => {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
};
const wt = (rel, text) => {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
};
const read = (rel) => JSON.parse(fs.readFileSync(r(rel), "utf8"));

const metricsDoc = read("data/baseline/national_baseline_metrics.json");
const statusDoc = read("data/baseline/baseline_status.json");
const sourceMap = read("data/baseline/baseline_source_map.json");
const methodology = read("data/baseline/baseline_methodology.json");
const srcDoc = read("data/research/source_registry.json");
const bridge = read("data/project/public_statistics_bridge.json");
const checklist = read("data/project/phase2_acceptance_checklist.json");
const build = read("data/project/current_build_state.json");
const sliceQueue = read("data/project/slice_queue.json");
const updates = read("data/project/updates.json");
const forensic = read("data/project/forensic_audit_governance.json");

function findMetric(id) {
  const m = metricsDoc.metrics.find((x) => x.metric_id === id);
  if (!m) throw new Error("Missing metric " + id);
  return m;
}

function patchMetric(id, fields) {
  const m = findMetric(id);
  if (m.counts_toward_baseline_scoreboard === false) {
    throw new Error("Refusing to source non-scoreboard metric " + id);
  }
  Object.assign(m, fields);
  m.status = "sourced";
  m.confidence_level = fields.confidence_level || "high";
  m.target_setting_status = "no_targets_in_phase_2";
  m.counts_toward_baseline_scoreboard = true;
  m.scoreboard_inclusion = "baseline_slot";
  m.slice_id = SLICE;
  m.last_sourced_at = TODAY;
  m.governance_disposition = fields.governance_disposition || "KEEP AS WRITTEN";
  return m;
}

const newSources = [
  {
    source_id: "CC-SRC-248",
    title: "BLS JOLTS Table 22 — annual average quits rate total nonfarm 2.1% (2024)",
    authors: ["U.S. Bureau of Labor Statistics"],
    year: 2026,
    url: "https://www.bls.gov/news.release/jolts.t22.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "labor",
    publication_date: "2026-03",
    retrieval_date: TODAY,
    summary:
      "Annual average quits rate for total nonfarm = sum of 12 monthly quits levels / sum of 12 monthly CES employment levels × 100. 2024 = 2.1%.",
    key_findings: ["Total nonfarm annual average quits rate 2.1% (2024)"],
    limitations: "Quits ≠ all job-to-job moves; not seasonally adjusted annual-average construction.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-L04",
  },
  {
    source_id: "CC-SRC-249",
    title: "FDIC QBP 2024 Q4 — community-bank and industry domestic deposits / loans / assets",
    authors: ["FDIC"],
    year: 2025,
    url: "https://www.fdic.gov/quarterly-banking-profile/quarterly-banking-profile-fourth-quarter-2024",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "banking",
    publication_date: "2025-02",
    retrieval_date: TODAY,
    summary:
      "Community banks: domestic office deposits $2,327,241M; total loans & leases $1,933,394M; assets $2,768,428M; 4,046 institutions. Industry (Statistics at a Glance / QBP): domestic deposits $17,748B; loans $12,725B; assets $24,098B; 4,487 institutions.",
    key_findings: [
      "Community-bank domestic deposit share ≈ 13.1%",
      "Community-bank loan share of industry bank loans ≈ 15.2%",
    ],
    limitations: "FDIC community-bank definition is criteria-based, not purely asset-size.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-CM04; CC-IND-E01 numerator component",
  },
  {
    source_id: "CC-SRC-250",
    title: "NCUA Quarterly Credit Union Data Summary 2024 Q4 — total loans $1.65T",
    authors: ["NCUA"],
    year: 2025,
    url: "https://ncua.gov/files/publications/analysis/quarterly-data-summary-2024-Q4.pdf",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "credit_unions",
    publication_date: "2025-03",
    retrieval_date: TODAY,
    summary: "Federally insured credit unions: total loans outstanding $1.65 trillion at 2024 Q4.",
    key_findings: ["Credit union loans $1.65T (2024 Q4)"],
    limitations: "Federally insured CU universe; excludes banks.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-E01 denominator/numerator component",
  },
  {
    source_id: "CC-SRC-251",
    title: "FFIEC/OCC CRA 2023 — small business loan originations $242.87B",
    authors: ["FFIEC", "OCC"],
    year: 2024,
    url: "https://www.occ.gov/news-issuances/news-releases/2024/nr-ia-2024-134b.pdf",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "small_business_lending",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "CRA reporters: small business loan originations $242,872,604 thousand (~$242.87B) in 2023; original amounts ≤ $1M.",
    key_findings: ["Small business loan originations $242.87B (2023)"],
    limitations:
      "Reporter coverage (large banks/mandatory reporters); loan-size definition ≠ firm-size definition unless using revenue ≤ $1M subset.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-B04",
  },
  {
    source_id: "CC-SRC-252",
    title: "DOL RAPIDS / apprenticeship.gov — 353,177 youth apprentices served (FY2023)",
    authors: ["U.S. Department of Labor, Office of Apprenticeship"],
    year: 2024,
    url: "https://www.apprenticeship.gov/sites/default/files/DOL_IndFactsheet_Youth_043024.pdf",
    source_type: "federal_administrative",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "human_capital",
    publication_date: "2024-04",
    retrieval_date: TODAY,
    summary:
      "Youth apprentices ages 16–24 total served in FY2023: 353,177 (active or exited during the fiscal year).",
    key_findings: ["353,177 youth apprentices served (FY2023)"],
    limitations: "Total served ≠ point-in-time active; RAPIDS coverage; not all paid WBL outside Registered Apprenticeship.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-HC02",
  },
  {
    source_id: "CC-SRC-253",
    title: "BJS — Recidivism of Prisoners Released in 34 States in 2012 (5-year return-to-prison 46%)",
    authors: ["Bureau of Justice Statistics"],
    year: 2021,
    url: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "justice",
    publication_date: "2021-07",
    retrieval_date: TODAY,
    summary:
      "Among persons released from prison in 2012 in 21 states with return-to-prison data, 46% returned to prison within 5 years for a parole/probation violation or new sentence.",
    key_findings: ["5-year return-to-prison rate 46% (2012 release cohort)"],
    limitations: "Cohort study, not an annual current rate; 21-state subset for return-to-prison; does not measure reentry employment.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-J07",
  },
  {
    source_id: "CC-SRC-254",
    title: "ANES 2024 Time Series — trust government in Washington always/most of the time 15.4%",
    authors: ["American National Election Studies"],
    year: 2025,
    url: "https://electionstudies.org/",
    source_type: "academic_survey_nsf",
    reliability: "primary_survey",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "democracy",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "ANES 2024 pre-election V241229PRE: Always 1.2% + Most of the time 14.2% = 15.4% among valid responses (N shown in codebook release).",
    key_findings: ["Trust always or most of the time 15.4% (2024 ANES)"],
    limitations: "Survey instrument/version changes; not a Census/BLS series; Pew long trend is a different instrument.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-D10",
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  ` Phase 2.1 (${TODAY}): CC-SRC-248–254 legitimate-slot expansion after ontology cleanup.`;
wj("data/research/source_registry.json", srcDoc);

const newlyCompleted = [];

// L04 — redefine operationally to JOLTS annual quits rate
patchMetric("CC-IND-L04", {
  title: "Job mobility (voluntary quits rate)",
  definition:
    "BLS JOLTS annual average quits rate for total nonfarm employment: 100 × (sum of 12 monthly quits levels) / (sum of 12 monthly CES employment levels).",
  unit: "percent_annual_average_quits_rate",
  current_value: 2.1,
  reference_year: "2024",
  source_ids: ["CC-SRC-248"],
  geographic_level: "national_US",
  population_scope: "total_nonfarm_payroll_employment_CES",
  historical_series_available: true,
  update_frequency: "annual_from_monthly_JOLTS",
  limitations:
    "Operational redefine from vague 'job mobility' to voluntary quits. Quits exclude layoffs and many employer-to-employer transitions not coded as quits. Not a Census job-to-job flow measure.",
  observation_type: "directly_observed_administrative_survey",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "annual quits / annual CES employment (JOLTS Table 22 method)",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "BLS JOLTS Table 22 — Total row, year 2024 annual average quits rate",
    url: "https://www.bls.gov/news.release/jolts.t22.htm",
    agencies: ["BLS"],
  },
});
newlyCompleted.push("CC-IND-L04");

// CM04 — local banking via community-bank deposit share
const cm04Share = Number(((2327241 / 17748000) * 100).toFixed(1)); // 13.1
patchMetric("CC-IND-CM04", {
  title: "Local banking (community-bank domestic deposit share)",
  definition:
    "FDIC-defined community banks' domestic office deposits as a percent of all FDIC-insured institutions' domestic deposits (QBP quarter-end).",
  unit: "percent_of_domestic_deposits",
  current_value: cm04Share,
  reference_year: "2024Q4",
  source_ids: ["CC-SRC-249"],
  geographic_level: "national_US",
  population_scope: "FDIC_insured_institutions",
  historical_series_available: true,
  update_frequency: "quarterly_QBP",
  limitations:
    "Community-bank label is FDIC criteria-based. Deposit allocation across offices follows SOD/internal methods. Not credit-union inclusive.",
  observation_type: "derived_official_administrative",
  ontology_class: "DERIVED STATISTIC",
  numerator_denominator: "community-bank domestic office deposits ($2,327,241M) / industry domestic deposits ($17,748,000M)",
  source_to_baseline_fit: "DIRECT",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method:
      "FDIC QBP Table II-B community-bank domestic office deposits ÷ FDIC industry domestic deposits (Statistics at a Glance / QBP) for same quarter",
    url: "https://www.fdic.gov/quarterly-banking-profile/quarterly-banking-profile-fourth-quarter-2024",
    agencies: ["FDIC"],
  },
});
newlyCompleted.push("CC-IND-CM04");

// E01 — community bank + credit union lending share
const e01Share = Number((((1933.394 + 1650) / (12725 + 1650)) * 100).toFixed(1)); // 24.9
patchMetric("CC-IND-E01", {
  title: "Community bank / credit union lending share",
  definition:
    "Combined FDIC community-bank total loans & leases plus NCUA federally insured credit-union total loans, as a percent of (FDIC-insured industry total loans & leases + NCUA CU total loans), same quarter.",
  unit: "percent_of_depository_loans",
  current_value: e01Share,
  reference_year: "2024Q4",
  source_ids: ["CC-SRC-249", "CC-SRC-250"],
  geographic_level: "national_US",
  population_scope: "FDIC_insured_banks_plus_federally_insured_credit_unions",
  historical_series_available: true,
  update_frequency: "quarterly",
  limitations:
    "Adds bank and CU systems with distinct charters. Excludes non-depository lenders. Community-bank definition is FDIC-criteria.",
  observation_type: "derived_official_administrative",
  ontology_class: "DERIVED STATISTIC",
  numerator_denominator:
    "(community-bank loans $1,933.394B + CU loans $1,650B) / (industry bank loans $12,725B + CU loans $1,650B)",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "FDIC QBP community-bank loans + NCUA Q4 loans; divide by FDIC industry loans + NCUA loans",
    url: "https://www.fdic.gov/quarterly-banking-profile/quarterly-banking-profile-fourth-quarter-2024",
    agencies: ["FDIC", "NCUA"],
  },
});
newlyCompleted.push("CC-IND-E01");

// B04 — CRA small business originations
patchMetric("CC-IND-B04", {
  title: "Small-business lending (CRA originations)",
  definition:
    "Aggregate dollar amount of CRA-reported small business loan originations (original amounts of $1 million or less) in the report year.",
  unit: "USD_billions_originations",
  current_value: 242.87,
  reference_year: "2023",
  source_ids: ["CC-SRC-251"],
  geographic_level: "national_US",
  population_scope: "CRA_reporting_institutions",
  historical_series_available: true,
  update_frequency: "annual_CRA",
  limitations:
    "Coverage limited to CRA reporters. 'Small loan' ≠ necessarily 'small firm' unless using revenue ≤ $1M breakouts. Not a rate.",
  observation_type: "directly_observed_administrative",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "sum of CRA small-business loan origination dollars",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "FFIEC/OCC CRA national tables — small business loan originations dollar amount for year",
    url: "https://www.occ.gov/news-issuances/news-releases/2024/nr-ia-2024-134b.pdf",
    agencies: ["FFIEC", "OCC", "FDIC", "Federal Reserve"],
  },
});
newlyCompleted.push("CC-IND-B04");

// HC02 — youth apprentices served
patchMetric("CC-IND-HC02", {
  title: "Youth apprenticeship / paid work-based learning participation (Registered Apprenticeship youth served)",
  definition:
    "Number of Registered Apprenticeship participants ages 16–24 total served in the federal fiscal year (active during the year or exited during the year) in RAPIDS.",
  unit: "persons_total_served",
  current_value: 353177,
  reference_year: "FY2023",
  source_ids: ["CC-SRC-252"],
  geographic_level: "national_US",
  population_scope: "RAPIDS_registered_apprentices_ages_16_24",
  historical_series_available: true,
  update_frequency: "annual_fiscal",
  limitations:
    "Total served ≠ stock of active apprentices. Excludes non-Registered paid WBL. Distinct from L05 all-ages apprenticeship counts.",
  observation_type: "directly_observed_administrative",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "count of youth apprentices total served",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "DOL Office of Apprenticeship youth fact sheet / RAPIDS dashboards — youth (16–24) total served for FY",
    url: "https://www.apprenticeship.gov/sites/default/files/DOL_IndFactsheet_Youth_043024.pdf",
    agencies: ["DOL"],
  },
});
newlyCompleted.push("CC-IND-HC02");

// J07 — redefine to return-to-prison; employment component deferred
patchMetric("CC-IND-J07", {
  title: "Recidivism (5-year return-to-prison rate)",
  definition:
    "Percent of persons released from state prison in a BJS national release cohort who returned to prison within 5 years for a parole/probation violation or a new sentence (states with return-to-prison data).",
  unit: "percent_returned_to_prison_within_5_years",
  current_value: 46,
  reference_year: "2012_release_cohort_followed_through_2017",
  source_ids: ["CC-SRC-253"],
  geographic_level: "national_US_subset_states",
  population_scope: "state_prison_releases_BJS_21_state_return_measure",
  historical_series_available: true,
  update_frequency: "periodic_BJS_cohort_studies",
  limitations:
    "Not an annual current rate. 21-state subset for return-to-prison measure. Reentry employment is NOT included in this value and remains definition debt for a future split/slot.",
  observation_type: "directly_observed_administrative_cohort",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "returned to prison within 5 years / released prisoners in measure universe",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "BJS recidivism report for 2012 releases — 5-year return-to-prison percent",
    url: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
    agencies: ["BJS"],
  },
});
newlyCompleted.push("CC-IND-J07");

// D10 — public trust via ANES lock
patchMetric("CC-IND-D10", {
  title: "Public trust (trust government in Washington always/most of the time)",
  definition:
    "Share of ANES respondents answering that they can trust the government in Washington to do what is right 'always' or 'most of the time' (ANES 2024 item V241229PRE or successor identically coded).",
  unit: "percent_of_respondents",
  current_value: 15.4,
  reference_year: "2024",
  source_ids: ["CC-SRC-254"],
  geographic_level: "national_US",
  population_scope: "ANES_time_series_respondents",
  historical_series_available: true,
  update_frequency: "election_cycle_ANES",
  limitations:
    "Survey instrument; not Census/BLS. Pew long series uses related but not identical wording/field periods. Distinct from CC-IND-D03 voter participation.",
  observation_type: "directly_observed_survey",
  ontology_class: "SURVEY MEASURE",
  numerator_denominator: "(always + most of the time) / valid responses",
  source_to_baseline_fit: "DIRECT",
  governance_disposition: "REDEFINE",
  status_note: "definition_deferred cleared by instrument lock",
  reproducible_retrieval: {
    method: "ANES 2024 Time Series codebook/frequencies for trust-in-government item; sum Always + Most of the time",
    url: "https://electionstudies.org/",
    agencies: ["ANES", "NSF"],
  },
});
newlyCompleted.push("CC-IND-D10");

// Deferred dispositions (honest)
const deferredDisposition = {
  "CC-IND-B03": {
    disposition: "REMAINS DEFERRED",
    note: "Local ownership still lacks locked geography/entity/control criteria. SCF business-equity ownership (14.6%) is NOT worker/employee or local ownership — rejected as proxy.",
  },
  "CC-IND-I02": {
    disposition: "REMAINS DEFERRED",
    note: "AI investment boundary (software/R&D/capex/startups/public) still unlocked. No private VC headline fill.",
  },
  "CC-IND-J08": {
    disposition: "REMAINS DEFERRED",
    note: "White-collar / economic crime enforcement intensity still lacks locked offense class, agency universe, and rate base.",
  },
  "CC-IND-HC01": {
    disposition: "REMAINS DEFERRED",
    note: "Multiple-pathway composite still unlocked. Rejected bachelor's-or-higher and HS-only substitutes.",
  },
  "CC-IND-CM03": {
    disposition: "REMAINS DEFERRED",
    note: "Hospital access construct still unlocked. Rejected beds, HPSA (E05), overnight utilization substitutes.",
  },
  "CC-IND-D09": {
    disposition: "REMAINS DEFERRED",
    note: "Civic engagement still unlocked; must remain distinct from CM05 volunteering and from D10 trust.",
  },
  "CC-IND-D10": {
    disposition: "COMPLETED",
    note: "Instrument locked to ANES always/most-of-the-time trust; sourced 15.4% (2024).",
  },
  "CC-IND-D11": {
    disposition: "REMAINS DEFERRED",
    note: "Local participation still unlocked; must remain distinct from campaign funding (D04) and CM05.",
  },
  "CC-IND-B01": {
    disposition: "DEFINITION RESOLVED / DATA PENDING",
    note: "Locked candidate remains Census BDS economy-wide establishment entry rate (estabs_entry_rate). Primary CSV/API retrieval blocked this pass (API key / download path). No secondary republisher used.",
  },
  "CC-IND-HC07": {
    disposition: "DEFINITION RESOLVED / DATA PENDING",
    note: "Locked candidate: CPS Voting Supplement reported voting rate among citizens ages 18–24. 2024 age table cell not retrieved from primary Census workbook this pass (historical A-1 not yet extended; P20-587 download incomplete). No secondary republisher used.",
  },
};

for (const [id, d] of Object.entries(deferredDisposition)) {
  if (newlyCompleted.includes(id)) continue;
  const m = findMetric(id);
  m.deferred_disposition = d.disposition;
  m.deferred_note = d.note;
  m.governance_slice_id = SLICE;
  if (d.disposition.includes("DEFINITION RESOLVED")) {
    m.status = "definition_resolved_data_pending";
    m.governance_disposition = "DEFER — DATA UNAVAILABLE";
  } else if (d.disposition === "REMAINS DEFERRED") {
    m.status = "definition_deferred";
    m.governance_disposition = "DEFER — DEFINITION REQUIRED";
  }
}

// New ontology / governance flags discovered this pass
const newOntologyDefects = [
  {
    metric_id: "CC-IND-L03",
    problem: "concept_mismatch_risk",
    detail:
      "Title 'Ownership (worker/employee)' is not SCF business-equity ownership (14.6%) and not general self-employment. Needs ESOP/employee-ownership definition lock before any fill.",
    action: "governance_queue",
  },
  {
    metric_id: "CC-IND-J07",
    problem: "dual_construct_split_recommended",
    detail:
      "Original title mixed recidivism and reentry employment. This slice redefined to return-to-prison only; reentry employment remains unmeasured and may need SPLIT later.",
    action: "documented_in_metric_limitations",
  },
  {
    metric_id: "CC-IND-E04",
    problem: "still_non_fillable_without_lock",
    detail:
      "Preventable disease / prevention investment is not the NCHS all-cause age-adjusted death rate. Flagged rather than filled.",
    action: "governance_queue",
  },
];

// Scoreboard
const countable = metricsDoc.metrics.filter(
  (m) =>
    m.counts_toward_baseline_scoreboard !== false &&
    !["design_indicator", "research_question", "retired", "retired_merged"].includes(m.status)
);
const sourcedCountable = countable.filter(
  (m) => m.current_value != null && m.source_ids?.length
);
const AFTER_NUM = sourcedCountable.length;
const AFTER_DEN = countable.length;
if (AFTER_DEN !== BEFORE_DEN) {
  console.error("Denominator changed unexpectedly", AFTER_DEN);
  process.exit(1);
}
const AFTER_DISPLAY = `${AFTER_NUM}/${AFTER_DEN}`;

metricsDoc.version = "0.4.1";
metricsDoc.last_updated = TODAY;
metricsDoc.status = "partially_sourced_ontology_cleaned";
metricsDoc.note = `Phase 2 partial after ${SLICE}: scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY}. Only ontology-compatible empirical fills. No parked design/research reintroduction. Ag posture lock preserved.`;
wj("data/baseline/national_baseline_metrics.json", metricsDoc);

statusDoc.version = "0.4.1";
statusDoc.last_updated = TODAY;
statusDoc.total_metrics = AFTER_DEN;
statusDoc.sourced_metrics = AFTER_NUM;
statusDoc.pending_metrics = AFTER_DEN - AFTER_NUM;
statusDoc.status = "partial_phase_2_ontology_cleaned";
statusDoc.note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE} (was ${BEFORE_DISPLAY}). Denominator held at ${AFTER_DEN}.`;
statusDoc.before_after = {
  before_display: BEFORE_DISPLAY,
  after_display: AFTER_DISPLAY,
  before_sourced: BEFORE_NUM,
  after_sourced: AFTER_NUM,
  denominator: AFTER_DEN,
  slice_id: SLICE,
};
wj("data/baseline/baseline_status.json", statusDoc);

sourceMap.version = "0.4.1";
sourceMap.last_updated = TODAY;
sourceMap.mappings = sourcedCountable.map((m) => ({
  metric_id: m.metric_id,
  title: m.title,
  source_ids: m.source_ids,
}));
wj("data/baseline/baseline_source_map.json", sourceMap);

methodology.last_updated = TODAY;
methodology.legitimate_slot_expansion_rule =
  "After ontology cleanup, source only countable empirical slots with full reproducible-retrieval fields. Prefer empty over proxy.";
wj("data/baseline/baseline_methodology.json", methodology);

// Public Statistics Bridge — real pathways only
bridge.version = "0.6.1";
bridge.last_updated = TODAY;
bridge.live_baseline_display = AFTER_DISPLAY;
bridge.legitimate_slot_expansion = {
  slice_id: SLICE,
  pathways_established: [
    {
      metric_id: "CC-IND-L04",
      agencies: ["BLS"],
      series: "JOLTS annual average quits rate (Table 22)",
    },
    {
      metric_id: "CC-IND-CM04",
      agencies: ["FDIC"],
      series: "QBP community-bank domestic deposit share",
    },
    {
      metric_id: "CC-IND-E01",
      agencies: ["FDIC", "NCUA"],
      series: "Community-bank + credit-union lending share",
    },
    {
      metric_id: "CC-IND-B04",
      agencies: ["FFIEC", "OCC"],
      series: "CRA small business loan originations",
    },
    {
      metric_id: "CC-IND-HC02",
      agencies: ["DOL"],
      series: "RAPIDS youth apprentices total served",
    },
    {
      metric_id: "CC-IND-J07",
      agencies: ["BJS"],
      series: "Release-cohort 5-year return-to-prison",
    },
    {
      metric_id: "CC-IND-D10",
      agencies: ["ANES/NSF"],
      series: "Trust in government always/most of the time",
    },
  ],
  still_blocked: [
    {
      metric_id: "CC-IND-B01",
      reason: "Census BDS estabs_entry_rate primary retrieval still API/CSV gated",
    },
  ],
};
if (Array.isArray(bridge.explicitly_not_done)) {
  bridge.explicitly_not_done = bridge.explicitly_not_done.map((line) =>
    typeof line === "string" && line.includes("27/64")
      ? `Baseline scoreboard now ${AFTER_DISPLAY} after legitimate-slot expansion; RedDirt live connectors still not required for these records`
      : line
  );
}
wj("data/project/public_statistics_bridge.json", bridge);

// GATE-07 reassessment only
const gate07 = (checklist.gates || []).find((g) => g.id === "GATE-07");
if (gate07) {
  gate07.forensic_note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE} (was ${BEFORE_DISPLAY}). Denominator held at 64. GATE remains open — not complete.`;
}
if (checklist.operating_honesty_dials?.baseline) {
  checklist.operating_honesty_dials.baseline.sourced_metrics = AFTER_NUM;
  checklist.operating_honesty_dials.baseline.total_metrics = AFTER_DEN;
  checklist.operating_honesty_dials.baseline.display_rule = `Show ${AFTER_DISPLAY}. Completeness = reproducible retrieval. Never revive 38-metric or pre-cleanup 86-as-if-all-empirical narratives.`;
}
checklist.last_updated = TODAY;
wj("data/project/phase2_acceptance_checklist.json", checklist);

if (forensic.integrity_dials) {
  forensic.integrity_dials.baseline_sourced_of_total = AFTER_DISPLAY;
  forensic.integrity_dials.baseline_note = `Scoreboard after ${SLICE}.`;
}
forensic.last_updated = TODAY;
wj("data/project/forensic_audit_governance.json", forensic);

// Validator expected count
let phase2Val = fs.readFileSync(r("scripts/validate-phase2-acceptance.mjs"), "utf8");
phase2Val = phase2Val
  .replace(
    /if \(baselineStatus\.sourced_metrics !== \d+\) \{[\s\S]*?else ok\("baseline sourced count remains [^"]+"\);/,
    `if (baselineStatus.sourced_metrics !== ${AFTER_NUM}) {\n  warn(\n    \`sourced_metrics is \${baselineStatus.sourced_metrics} (canonical operating snapshot expected ${AFTER_NUM} after legitimate-slot expansion)\`\n  );\n} else ok("baseline sourced count remains ${AFTER_DISPLAY}");`
  )
  .replace(
    /if \(baselineStatus\.total_metrics !== \d+\) \{[\s\S]*?else ok\("baseline denominator is [^"]+"\);/,
    `if (baselineStatus.total_metrics !== ${AFTER_DEN}) {\n  fail(\`baseline_status.total_metrics must be ${AFTER_DEN} after ontology cleanup, found \${baselineStatus.total_metrics}\`);\n} else ok("baseline denominator is ${AFTER_DEN} (ontology-cleaned countable slots)");`
  );
fs.writeFileSync(r("scripts/validate-phase2-acceptance.mjs"), phase2Val, "utf8");

const domainWeakness = {
  strongest_after_this_slice: [
    "labor (L01–L02, L04–L05)",
    "banking/local capital (CM04, E01, B04)",
    "wealth/family/fiscal already strong",
  ],
  weakest_remaining_empirical: [
    "business dynamics B01/B02/C02 (BDS retrieval)",
    "human-capital pathways HC01/HC03–HC05/HC07",
    "democracy structural D01/D02/D04–D06/D08 + D09/D11",
    "hospital access CM03",
    "local/employee ownership B03/L03",
    "specialty essential systems E02–E04/E06/E08",
    "justice specialty J04–J06/J08",
  ],
};

const scoreboard = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  before: BEFORE_DISPLAY,
  after: AFTER_DISPLAY,
  newly_completed_ids: newlyCompleted,
  deferred_disposition: deferredDisposition,
  new_ontology_defects: newOntologyDefects,
  primary_sources_added: newSources.map((s) => s.source_id),
  derived_metrics_added: ["CC-IND-CM04", "CC-IND-E01"],
  definition_debt_remaining: Object.entries(deferredDisposition)
    .filter(([, d]) => d.disposition !== "COMPLETED")
    .map(([id, d]) => ({ metric_id: id, disposition: d.disposition })),
  weakest_empirical_domains: domainWeakness.weakest_remaining_empirical,
  domain_weakness: domainWeakness,
  agriculture_posture_lock: AG_LOCK,
  honesty:
    "Numerator rose only via primary reproducible fills. Denominator unchanged at 64. No PS/T reintroduction. No HC01/CM03 proxies.",
};
wj("research/phase_2/baseline_legitimate_slot_expansion_scoreboard.json", scoreboard);

// Updates / slice queue / build / latest
if (!updates.updates.some((u) => u.id === "UPD-093")) {
  updates.updates.push({
    id: "UPD-093",
    date: TODAY,
    title: "Legitimate baseline slot expansion after ontology cleanup",
    summary: `Under CC-DEC-103: scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY} with ${newlyCompleted.length} reproducible fills (L04, CM04, E01, B04, HC02, J07, D10). Deferred debt handled honestly (incl. B01/HC07 definition-resolved/data-pending). Denominator held at 64. Ag lock preserved. Sources 248–254.`,
    public: true,
  });
}
updates.last_updated = TODAY;
wj("data/project/updates.json", updates);

const sliceRec = {
  slice_id: SLICE,
  title: "Baseline Legitimate Slot Expansion After Ontology Cleanup",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    `scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY}`,
    `${newlyCompleted.length} newly completed empirical slots`,
    "deferred dispositions recorded",
    "Public Statistics Bridge pathways updated",
    "CC-SRC-248–254",
    "ag posture lock preserved",
  ],
  next_recommended_slice: NEXT,
  alternate_next: [
    "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-HC01-CM03-B03-I02-J08-1.0",
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  ],
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.active_slice = NEXT;
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
wj("data/project/slice_queue.json", sliceQueue);

build.version = "0.4.11";
build.last_updated = TODAY;
build.mission_id = SLICE;
build.slice_return =
  "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_AFTER_ONTOLOGY_CLEANUP_1_0_RETURN.md";
build.writing_focus = `Baseline ${AFTER_DISPLAY}. Next: definition locks / BDS retrieval. Ag voice-gated.`;
build.next_action =
  "Definition locks for remaining deferred slots; Census BDS retrieval for B01; human ag voice calls remain open.";
build.baseline = AFTER_DISPLAY;
build.active_slice = NEXT;
build.last_completed_slice = SLICE;
build.sources_registered = srcDoc.sources.length;
build.notes = [
  `${SLICE}: ${BEFORE_DISPLAY}→${AFTER_DISPLAY}; ${newlyCompleted.length} fills; denominator 64 held; modeling/legal 0%; processing ~3/0/0; feed voice-gated.`,
];
wj("data/project/current_build_state.json", build);

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary: `Legitimate-slot expansion: ${BEFORE_DISPLAY}→${AFTER_DISPLAY}. ${newlyCompleted.length} reproducible fills; deferred debt not stuffed. Denominator held at 64. Ag lock preserved.`,
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: build.overall_percent,
  phase_2_status: "PARTIAL",
  recommended_next_slice: NEXT,
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-093"],
  public_paths: ["/where-we-are/", "/metrics/", "/status/"],
  board_paths: ["/baseline/", "/phase-2-gate/", "/diagnosis/"],
  integrity_note:
    "Denominator unchanged. No PS/T reintroduction. No HC01/CM03 proxies. No secondary republisher for B01.",
  next_command: "Definition locks + BDS retrieval; human ag voice calls",
  report:
    "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_AFTER_ONTOLOGY_CLEANUP_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  baseline_before: BEFORE_DISPLAY,
  baseline_after: AFTER_DISPLAY,
  newly_completed: newlyCompleted,
  agriculture_posture_lock: AG_LOCK,
  processing_baseline: {
    cattle_accessible_claimed_desk: 3,
    booking_confirmed: 0,
    economically_usable_confirmed: 0,
  },
});

// START_HERE
let start = fs.readFileSync(r("START_HERE_FOR_AI.md"), "utf8");
start = start
  .replace(
    /Latest completed slices:.*\nActive \/ next:.*\n/,
    `Latest completed slices: bad-metric governance / ID remap; legitimate-slot expansion after ontology cleanup\nActive / next: ${NEXT}\n`
  )
  .replace(
    /GATE-07: OPEN — baseline 27\/\d+[^\n]*/,
    `GATE-07: OPEN — baseline ${AFTER_DISPLAY} (ontology-cleaned countable slots; growing without proxy stuffing)`
  )
  .replace(/Baseline: 27\/\d+/, `Baseline: ${AFTER_DISPLAY}`)
  .replace(/Sources: \d+/, `Sources: ${srcDoc.sources.length}`)
  .replace(
    /Active next slice: `[^`]+`[^\n]*/,
    `Active next slice: \`${NEXT}\` (Phase 2 remains PARTIAL; legitimate-slot expansion shipped)`
  );
fs.writeFileSync(r("START_HERE_FOR_AI.md"), start, "utf8");

const handoffPath = r("docs/handoffs/CURRENT_THREAD_HANDOFF.md");
let handoff = fs.readFileSync(handoffPath, "utf8");
const marker = `## Legitimate-slot expansion (${TODAY})`;
if (!handoff.includes(marker)) {
  handoff += `\n\n---\n\n${marker}\n\n- Scoreboard **${BEFORE_DISPLAY} → ${AFTER_DISPLAY}**\n- Newly completed: ${newlyCompleted.join(", ")}\n- Denominator held at **64**\n- Active next: \`${NEXT}\`\n- Phase 2: **PARTIAL**\n`;
  fs.writeFileSync(handoffPath, handoff, "utf8");
}

const gateAstro = r("apps/build-board/src/pages/phase-2-gate.astro");
if (fs.existsSync(gateAstro)) {
  let astro = fs.readFileSync(gateAstro, "utf8");
  const before = astro;
  astro = astro.replace(/27\/64/g, AFTER_DISPLAY);
  if (astro !== before) fs.writeFileSync(gateAstro, astro, "utf8");
}

const deferredLines = Object.entries(deferredDisposition)
  .map(([id, d]) => `| \`${id}\` | ${d.disposition} |`)
  .join("\n");

const returnMd = `# ${SLICE} — Return

**Generated:** ${TODAY}  
**Rule:** Increase the share of valid empirical baselines that are fully sourced and reproducible. Do not chase the numerator.

## 1. Required delta

\`\`\`text
Baseline before: ${BEFORE_DISPLAY}
Baseline after: ${AFTER_DISPLAY}

Newly completed:
${newlyCompleted.map((id) => `- ${id}`).join("\n")}

Deferred resolved:
- CC-IND-D10 → COMPLETED (ANES instrument lock)

Deferred still open:
- B03, I02, J08, HC01, CM03, D09, D11 → REMAINS DEFERRED
- B01, HC07 → DEFINITION RESOLVED / DATA PENDING

New ontology defects:
- L03 worker/employee ownership ≠ SCF business equity (flagged)
- J07 dual construct → redefined to return-to-prison; employment split pending
- E04 not fillable with all-cause death rate (flagged)

Primary sources added:
- CC-SRC-248–254

Derived metrics added:
- CC-IND-CM04, CC-IND-E01

Definition debt remaining:
- B03, I02, J08, HC01, CM03, D09, D11 (+ B01/HC07 data pending)

Weakest empirical domains:
- business dynamics (B01/B02/C02)
- human-capital pathways (HC01/HC03–HC05/HC07)
- democracy structural (D01/D02/D04–D06/D08 + D09/D11)
- hospital access (CM03)
- local/employee ownership (B03/L03)
\`\`\`

## 2. Newly completed (retrieval standard)

| ID | Value | Year | Fit | Agency |
| --- | ---: | --- | --- | --- |
| L04 | 2.1% quits rate | 2024 | STRONG | BLS JOLTS |
| CM04 | ${cm04Share}% community-bank deposit share | 2024Q4 | DIRECT | FDIC |
| E01 | ${e01Share}% CB+CU loan share | 2024Q4 | STRONG | FDIC+NCUA |
| B04 | $242.87B CRA SB originations | 2023 | STRONG | FFIEC/OCC |
| HC02 | 353,177 youth apprentices served | FY2023 | STRONG | DOL |
| J07 | 46% 5-year return-to-prison | 2012 cohort | STRONG | BJS |
| D10 | 15.4% trust always/most | 2024 | DIRECT | ANES |

## 3. Deferred special treatment

| ID | Disposition |
| --- | --- |
${deferredLines}

## 4. Hard boundaries held

- No PS/T design inventories reintroduced
- No HC01 / CM03 proxies
- No B03 / I02 / J08 / D09 / D11 fills without definition/source fit
- No secondary republisher for B01
- Denominator unchanged at **64**
- Legacy merged IDs not revived

## 5. Gate impact

- GATE-07 reassessed: still **OPEN** at ${AFTER_DISPLAY}
- Public Statistics Bridge pathways updated for the seven fills
- Unrelated gates not moved
- Phase 2 remains **PARTIAL**; modeling/legal **0%**

## 6. Next

\`${NEXT}\`

## 7. Validators

Filled at ship.
`;

wt(
  "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_AFTER_ONTOLOGY_CLEANUP_1_0_RETURN.md",
  returnMd
);

console.log(`Slice ${SLICE}`);
console.log(`Scoreboard: ${BEFORE_DISPLAY} → ${AFTER_DISPLAY}`);
console.log(`Newly completed (${newlyCompleted.length}): ${newlyCompleted.join(", ")}`);
console.log(`Sources now: ${srcDoc.sources.length}`);
console.log(`Denominator held: ${AFTER_DEN}`);
