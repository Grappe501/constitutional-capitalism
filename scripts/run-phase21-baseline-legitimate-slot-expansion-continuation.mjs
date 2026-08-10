/**
 * CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-CONTINUATION-1.0
 *
 * Continue expansion after ontology cleanup without weakening the retrieval
 * standard for Census infrastructure failures. Record failed retrievals.
 * Apply three-state taxonomy:
 *   SOURCE_UNKNOWN | SOURCE_IDENTIFIED_DATA_PENDING | BASELINE_COMPLETE
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-CONTINUATION-1.0";
const ARC_BEFORE = "27/64";
const PASS_BEFORE_NUM = 34;
const PASS_BEFORE = "34/64";
const BEFORE_DEN = 64;
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
  m.baseline_completion_state = "BASELINE_COMPLETE";
  m.confidence_level = fields.confidence_level || "high";
  m.target_setting_status = "no_targets_in_phase_2";
  m.counts_toward_baseline_scoreboard = true;
  m.scoreboard_inclusion = "baseline_slot";
  m.slice_id = SLICE;
  m.last_sourced_at = TODAY;
  m.governance_disposition = fields.governance_disposition || "KEEP AS WRITTEN";
  return m;
}

function markPending(id, fields) {
  const m = findMetric(id);
  Object.assign(m, fields);
  m.counts_toward_baseline_scoreboard = true;
  m.scoreboard_inclusion = "baseline_slot";
  m.slice_id = SLICE;
  m.last_reviewed_at = TODAY;
  return m;
}

const newSources = [
  {
    source_id: "CC-SRC-255",
    title:
      "DOJ Antitrust Division — Total Criminal Cases Filed (FY2016–FY2025 table; FY2024 = 20)",
    authors: ["U.S. Department of Justice Antitrust Division"],
    year: 2025,
    url: "https://www.justice.gov/atr/total-criminal-cases-filed",
    source_type: "federal_administrative",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "competition",
    publication_date: "2025-12-09",
    retrieval_date: TODAY,
    summary:
      "Official DOJ ATR table of total criminal antitrust cases filed by fiscal year. FY2024 = 20.",
    key_findings: ["FY2024 total criminal antitrust cases filed = 20"],
    limitations:
      "Criminal cases only; excludes FTC actions and DOJ civil/merger non-criminal filings.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-C03",
  },
  {
    source_id: "CC-SRC-256",
    title:
      "DOJ Asset Forfeiture Program — Total Receipts and Expenses (FY2024 receipts $2,422M)",
    authors: ["U.S. Department of Justice Asset Forfeiture Program"],
    year: 2026,
    url: "https://www.justice.gov/afp/total-deposits-and-expenses",
    source_type: "federal_administrative",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "justice",
    publication_date: "2026-02-11",
    retrieval_date: TODAY,
    summary:
      "Official AFF time series: FY2024 Total Receipts = $2,422 million.",
    key_findings: ["FY2024 AFF total receipts = $2,422 million"],
    limitations:
      "National fund receipts ≠ local agency revenue dependence; Treasury/Treasury AFF accounting transactions.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-J06",
  },
  {
    source_id: "CC-SRC-257",
    title:
      "FEC weball24 all-candidates file — 2023–2024 House/Senate candidate receipts (bulk download)",
    authors: ["Federal Election Commission"],
    year: 2025,
    url: "https://www.fec.gov/files/bulk-downloads/2024/weball24.zip",
    source_type: "federal_administrative",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "democracy",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "FEC all-candidates bulk file for 2023–2024 cycle. Used to compute top-decile share of House+Senate candidate total receipts among candidates with receipts > 0.",
    key_findings: [
      "Top-decile share of HS candidate receipts among receipts>0 = 73.0% (2733 candidates; file retrieved 2026-08-10)",
    ],
    limitations:
      "Weball universe count/sum can differ from FEC 24-month statistical summary (2,152 candidates; $3,801.5M). Concentration uses transparent top-decile formula on this primary file.",
    verification_status: "file_downloaded_and_computed",
    notes: "CC-IND-D04",
  },
  {
    source_id: "CC-SRC-258",
    title:
      "Federal Reserve Banks — 2025 Report on Employer Firms (2024 SBCS): full financing approval rate 52%",
    authors: ["Federal Reserve Banks"],
    year: 2025,
    url: "https://www.fedsmallbusiness.org/-/media/project/clevelandfedtenant/fsbsite/reports/2025/2025-report-on-employer-firms.pdf",
    source_type: "federal_survey",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "small_business_credit",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "2024 Small Business Credit Survey employer-firm applicants: 52% fully approved for loan/line/MCA financing sought (prior 12 months).",
    key_findings: ["2024 survey full approval rate among applicants = 52%"],
    limitations:
      "Survey of employer firms; excludes non-employer firms; rural breakout not the national scalar used here.",
    verification_status: "pdf_downloaded_and_verified",
    notes: "CC-IND-E02",
  },
  {
    source_id: "CC-SRC-259",
    title:
      "USDA FSA Farm Loan Programs Executive Summary FY2024 — total obligations $5,393,837,808",
    authors: ["USDA Farm Service Agency"],
    year: 2024,
    url: "https://www.fsa.usda.gov/sites/default/files/2025-05/FY2024_Executive_Summary.pdf",
    source_type: "federal_administrative",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "rural_capital",
    publication_date: "2024-09-30",
    retrieval_date: TODAY,
    summary:
      "FY2024 as of Sep 30: total Farm Loan Program dollar amount $5,393,837,808 across Direct/Guaranteed OL/FO and Emergency; 24,555 loans.",
    key_findings: ["FY2024 FSA FLP total obligations = $5,393,837,808"],
    limitations:
      "Farm loan programs only; not general small-business lending. Complements SBCS access rate for E02 rural capital component.",
    verification_status: "pdf_downloaded_and_verified",
    notes: "CC-IND-E02",
  },
  {
    source_id: "CC-SRC-260",
    title:
      "Census CPS historical Table A-1 — reported voting by age (1964–2020); 18–24 citizen voted rate path confirmed",
    authors: ["U.S. Census Bureau"],
    year: 2021,
    url: "https://www2.census.gov/programs-surveys/cps/tables/time-series/voting-historical-time-series/a1.xlsx",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "civic_participation",
    publication_date: "2021",
    retrieval_date: TODAY,
    summary:
      "Primary historical workbook confirms reproducible 18–24 citizen population voting rates through 2020 (e.g., 51.4% voted in 2020). Does not extend to 2024.",
    key_findings: [
      "A-1 establishes primary retrieval path for ages 18–24 citizen voted rate through 2020",
      "2020 18–24 citizen voted rate = 51.4% (not used as current baseline)",
    ],
    limitations:
      "Ends at 2020; 2024 P20-587 age table still retrieval-pending. Do not treat 2020 as 2024 baseline.",
    verification_status: "file_downloaded_and_parsed",
    notes: "CC-IND-HC07 path confirmation; not a 2024 observation",
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
  ` Phase 2.1 (${TODAY}): CC-SRC-255–260 legitimate-slot expansion continuation.`;
wj("data/research/source_registry.json", srcDoc);

const newlyCompleted = [];

// C03 — antitrust criminal cases filed
patchMetric("CC-IND-C03", {
  title: "Antitrust activity (DOJ ATR criminal cases filed)",
  definition:
    "Count of total criminal antitrust cases filed by the U.S. Department of Justice Antitrust Division in the federal fiscal year.",
  unit: "criminal_cases_filed",
  current_value: 20,
  reference_year: "FY2024",
  source_ids: ["CC-SRC-255"],
  geographic_level: "national_US",
  population_scope: "DOJ_Antitrust_Division_criminal_filings",
  historical_series_available: true,
  update_frequency: "annual_fiscal_DOJ_ATR_table",
  limitations:
    "Criminal cases only. Excludes FTC enforcement and DOJ civil/non-criminal merger actions. Not a rate per firm or per merger filing.",
  observation_type: "directly_observed_administrative",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "count of criminal cases filed",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "DOJ ATR Total Criminal Cases Filed table — FY2024 row",
    url: "https://www.justice.gov/atr/total-criminal-cases-filed",
    agencies: ["DOJ Antitrust Division"],
  },
});
newlyCompleted.push("CC-IND-C03");

// J06 — AFF receipts (dependence ratio still open)
patchMetric("CC-IND-J06", {
  title: "Civil asset forfeiture fund receipts (DOJ AFF total receipts)",
  definition:
    "DOJ Assets Forfeiture Fund total receipts in the federal fiscal year, as published in the Asset Forfeiture Program Total Receipts and Expenses series (USD millions).",
  unit: "USD_millions_receipts",
  current_value: 2422,
  reference_year: "FY2024",
  source_ids: ["CC-SRC-256"],
  geographic_level: "national_US",
  population_scope: "DOJ_Assets_Forfeiture_Fund",
  historical_series_available: true,
  update_frequency: "annual_fiscal_AFF",
  limitations:
    "Operational redefine from 'revenue dependence' to national AFF receipts stock. Local/agency budget dependence ratios remain unmeasured and require locked denominators before any dependence claim.",
  observation_type: "directly_observed_administrative",
  ontology_class: "ADMINISTRATIVE COUNT",
  numerator_denominator: "AFF total receipts (USD millions)",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method: "DOJ AFP Total Receipts and Expenses — Total Receipts row, FY2024",
    url: "https://www.justice.gov/afp/total-deposits-and-expenses",
    agencies: ["DOJ Asset Forfeiture Program"],
  },
});
newlyCompleted.push("CC-IND-J06");

// D04 — campaign funding concentration via top-decile share
patchMetric("CC-IND-D04", {
  title: "Campaign funding concentration (top-decile share of congressional candidate receipts)",
  definition:
    "Share of aggregate House+Senate candidate total receipts held by the top 10% of House+Senate candidates with receipts > 0 in the FEC weball all-candidates file for the election cycle.",
  unit: "percent_of_total_receipts",
  current_value: 73.0,
  reference_year: "2023-2024_cycle",
  source_ids: ["CC-SRC-257"],
  geographic_level: "national_US",
  population_scope: "FEC_weball_House_Senate_candidates_receipts_gt_0",
  historical_series_available: true,
  update_frequency: "election_cycle_FEC_bulk",
  limitations:
    "Derived concentration on FEC weball universe (2,733 HS candidates with receipts>0 in retrieved file). Universe/sum can differ from FEC 24-month statistical summary (2,152 candidates; $3,801.5M). Not donor-level concentration. Excludes presidential and independent-expenditure-only committees.",
  observation_type: "derived_official_administrative",
  ontology_class: "DERIVED STATISTIC",
  numerator_denominator:
    "sum(receipts of top decile by receipts) / sum(receipts of all HS candidates with receipts>0) × 100",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method:
      "Download https://www.fec.gov/files/bulk-downloads/2024/weball24.zip; parse weball24.txt; keep Cand_ID starting H/S; TTL_RECEIPTS (field 6) > 0; sort descending; top ceil(0.1*N) share of sum",
    url: "https://www.fec.gov/files/bulk-downloads/2024/weball24.zip",
    agencies: ["FEC"],
    computed_on_retrieval_date: TODAY,
    computed_inputs: {
      candidates_with_receipts_gt_0: 2733,
      top_decile_n: 273,
      top_decile_share_pct: 73.0,
    },
  },
});
newlyCompleted.push("CC-IND-D04");

// E02 — small-business access (SBCS) + rural farm-loan obligations (FSA)
patchMetric("CC-IND-E02", {
  title: "Small-business and rural capital access indicators",
  definition:
    "Two-component indicator: (1) Federal Reserve Small Business Credit Survey share of employer-firm loan/line/MCA applicants fully approved for financing sought in the prior 12 months; (2) USDA FSA Farm Loan Programs total dollar obligations in the federal fiscal year.",
  unit: "composite_access_rate_and_rural_loan_obligations",
  current_value: {
    sbcs_full_approval_rate_pct: 52,
    sbcs_survey_year: 2024,
    usda_fsa_farm_loan_obligations_usd: 5393837808,
    usda_fsa_loan_count: 24555,
    fsa_fiscal_year: "FY2024",
  },
  reference_year: "2024",
  source_ids: ["CC-SRC-258", "CC-SRC-259"],
  geographic_level: "national_US",
  population_scope: "SBCS_employer_firm_applicants_plus_FSA_FLP_borrowers",
  historical_series_available: true,
  update_frequency: "annual_SBCS_and_annual_FSA",
  limitations:
    "SBCS is applicant approval among employer firms, not a population credit-access rate and not rural-specific. FSA covers farm loan programs only, not general rural small-business credit. SBA 7(a)/504 dollar series remains SOURCE_IDENTIFIED_DATA_PENDING (primary workbook retrieval failed this pass).",
  observation_type: "mixed_survey_and_administrative",
  ontology_class: "STRUCTURAL INDICATOR",
  numerator_denominator:
    "(1) fully approved applicants / applicants with resolved loan/line/MCA outcomes; (2) sum of FSA FLP obligation dollars",
  source_to_baseline_fit: "STRONG",
  governance_disposition: "REDEFINE",
  reproducible_retrieval: {
    method:
      "Fed SBCS 2025 Report on Employer Firms — 2024 survey full-approval percent; USDA FSA FY2024 Executive Summary total amount",
    urls: [
      "https://www.fedsmallbusiness.org/-/media/project/clevelandfedtenant/fsbsite/reports/2025/2025-report-on-employer-firms.pdf",
      "https://www.fsa.usda.gov/sites/default/files/2025-05/FY2024_Executive_Summary.pdf",
    ],
    agencies: ["Federal Reserve Banks", "USDA FSA"],
  },
});
newlyCompleted.push("CC-IND-E02");

// --- Pending-state taxonomy updates (no false completion) ---
const pendingStates = {
  "CC-IND-B01": {
    baseline_completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    status: "source_identified_data_pending",
    deferred_disposition: "DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING",
    deferred_note:
      "Authoritative series remains Census BDS economy-wide establishment entry rate (estabs_entry_rate). Cloudflare 520 stubs and timed-out CSV URLs are rejected as evidence. No secondary republisher substitution.",
    governance_disposition: "DEFER — PRIMARY RETRIEVAL PENDING",
    identified_source: {
      agency: "US Census Bureau",
      series: "Business Dynamics Statistics estabs_entry_rate",
      preferred_paths: [
        "https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds2023_e.csv",
        "Census Bureau API (requires key)",
      ],
    },
  },
  "CC-IND-HC07": {
    baseline_completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    status: "source_identified_data_pending",
    deferred_disposition: "PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING",
    deferred_note:
      "CPS A-1 workbook confirms reproducible primary path for 18–24 citizen voting rate through 2020 (e.g., 51.4% in 2020). That 2020 value must not be presented as the current baseline if the slot intends to represent 2024. 2024 CPS P20-587 age-table retrieval remains failed (timeouts) — infrastructure failure, not evidence failure. Source path preserved: CC-SRC-260.",
    governance_disposition: "DEFER — CURRENT OBSERVATION PENDING",
    source_ids: ["CC-SRC-260"],
    identified_source: {
      agency: "US Census Bureau",
      series: "CPS Voting and Registration — ages 18–24 citizen reported voting rate",
      historical_path:
        "https://www2.census.gov/programs-surveys/cps/tables/time-series/voting-historical-time-series/a1.xlsx",
      current_path_pending:
        "https://www2.census.gov/programs-surveys/cps/tables/p20/587/ (age tables; retrieval failed)",
    },
  },
  "CC-IND-B02": {
    baseline_completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    status: "source_identified_data_pending",
    deferred_disposition: "SOURCE_IDENTIFIED_DATA_PENDING",
    deferred_note:
      "Authoritative family is Census BDS survival/exit measures. Same primary-retrieval blockage as B01; do not substitute secondary republishers.",
    governance_disposition: "DEFER — PRIMARY RETRIEVAL PENDING",
    identified_source: {
      agency: "US Census Bureau",
      series: "Business Dynamics Statistics survival / exit rates",
    },
  },
  "CC-IND-C02": {
    baseline_completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    status: "source_identified_data_pending",
    deferred_disposition: "SOURCE_IDENTIFIED_DATA_PENDING",
    deferred_note:
      "Closely coupled to BDS entry/establishment dynamics. Source identified; primary observation pending with B01/B02 retrieval.",
    governance_disposition: "DEFER — PRIMARY RETRIEVAL PENDING",
    identified_source: {
      agency: "US Census Bureau",
      series: "Business Dynamics Statistics / related entry measures",
    },
  },
};

for (const [id, fields] of Object.entries(pendingStates)) {
  markPending(id, fields);
}

// Deferred slots remain deferred / SOURCE_UNKNOWN where definition unlocked
const stillDeferred = [
  "CC-IND-B03",
  "CC-IND-I02",
  "CC-IND-J08",
  "CC-IND-HC01",
  "CC-IND-CM03",
  "CC-IND-D09",
  "CC-IND-D11",
];
for (const id of stillDeferred) {
  const m = findMetric(id);
  m.baseline_completion_state = "SOURCE_UNKNOWN";
  m.status = "definition_deferred";
  m.deferred_disposition = "REMAINS DEFERRED";
  m.governance_disposition = "DEFER — DEFINITION REQUIRED";
  m.slice_id = SLICE;
  m.last_reviewed_at = TODAY;
}

// Mark remaining open slots without clear source as SOURCE_UNKNOWN unless already pending
const countableAll = metricsDoc.metrics.filter(
  (m) => m.counts_toward_baseline_scoreboard === true
);
for (const m of countableAll) {
  if (m.status === "sourced" && m.current_value != null && m.source_ids?.length) {
    m.baseline_completion_state = "BASELINE_COMPLETE";
    continue;
  }
  if (m.baseline_completion_state) continue;
  if (m.status === "baseline_pending" || !m.status) {
    m.baseline_completion_state = "SOURCE_UNKNOWN";
  }
}

// Failed retrieval research log
const failedRetrievalLog = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  purpose:
    "Preserve why an indicator is incomplete so the same failed URLs are not rediscovered and mistaken for 'not available.'",
  rule: "Infrastructure/data-access failure ≠ evidence that the metric construct fails. Do not weaken the baseline standard.",
  entries: [
    {
      metric_id: "CC-IND-B01",
      disposition: "DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING",
      attempted_at: TODAY,
      attempts: [
        {
          url: "https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds2023_e.csv",
          result: "timeout_45s",
        },
        {
          url: "https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds_e_all_release.csv",
          result: "timeout_45s",
        },
        {
          url: "https://www2.census.gov/programs-surveys/bds/data/2023/bds2023_e.csv",
          result: "timeout_45s",
        },
        {
          url: "https://www2.census.gov/programs-surveys/bds/tables/2023/bds_e.csv",
          result: "timeout_45s",
        },
        {
          local_artifact: ".local/temp/bds_eage.csv",
          result: "cloudflare_520_stub_rejected",
        },
        {
          local_artifact: ".local/temp/bds_try.csv",
          result: "cloudflare_520_stub_rejected",
        },
      ],
      do_not: [
        "treat 520 stubs as BDS observations",
        "substitute secondary republishers to close the slot",
      ],
      retry_guidance: "Alternate primary mechanism (Census API with key; FTP mirror; later www2 window).",
    },
    {
      metric_id: "CC-IND-HC07",
      disposition: "PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING",
      attempted_at: TODAY,
      successes: [
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/time-series/voting-historical-time-series/a1.xlsx",
          result: "downloaded_ok_42938_bytes",
          note: "Confirms 18–24 citizen voted path through 2020; 2020 value 51.4% must not be labeled current 2024 baseline",
        },
      ],
      attempts: [
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/table04a.xlsx",
          result: "timeout",
        },
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/table4a.xlsx",
          result: "timeout",
        },
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/table01.xlsx",
          result: "timeout",
        },
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/table4.xlsx",
          result: "timeout",
        },
        {
          url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/table04.xlsx",
          result: "process_failed_no_output",
        },
      ],
      classification: "RETRIEVAL FAILURE, NOT EVIDENCE FAILURE",
      do_not: [
        "present 2020 A-1 51.4% as the 2024 baseline observation",
        "fill from secondary republishers while P20-587 primary path is intended",
      ],
      retry_guidance: "Retry P20-587 age tables via alternate primary retrieval mechanism.",
    },
    {
      metric_id: "CC-IND-E02",
      related: "SBA_7a_504_workbook",
      disposition: "COMPONENT_SOURCE_IDENTIFIED_DATA_PENDING",
      attempted_at: TODAY,
      attempts: [
        {
          url: "https://data.sba.gov/dataset/7a-504-activity-reports-fy2024-year-end/resource/.../download",
          result: "404_or_api_404",
        },
        {
          url: "https://www.sba.gov/sites/default/files/2024-10/Capital-Impact-Report-2024_Final.pdf",
          result: "404",
        },
      ],
      note: "E02 completed via Fed SBCS + USDA FSA primary paths; SBA 7(a)/504 dollar workbook remains pending for a future refinement, not forced from secondary republishers.",
    },
    {
      series: "Census_BFS",
      disposition: "RETRIEVAL_FAILED",
      attempts: [
        {
          url: "https://www.census.gov/econ/bfs/csv/bfs_us_apps_sa.csv",
          result: "404",
        },
        {
          url: "https://www2.census.gov/econ/bfs/csv/bfs_us_apps_sa.csv",
          result: "timeout",
        },
      ],
      note: "Logged for business-formation research; not used to force B01/C02 closure.",
    },
  ],
};
wj("research/phase_2/baseline_failed_retrieval_log.json", failedRetrievalLog);

const newOntologyDefects = [
  {
    metric_id: "CC-IND-J06",
    problem: "title_redefined_from_dependence_to_receipts_stock",
    detail:
      "Original 'revenue dependence' requires locked agency/local denominators. Filled as AFF total receipts with dependence ratio remaining open.",
    action: "documented_in_metric_limitations",
  },
  {
    metric_id: "CC-IND-HC05",
    problem: "pathway_dimension_unlocked",
    detail:
      "BLS early-career median earnings by age exist, but 'by pathway' is unlocked. Age-only fill rejected as proxy stuffing.",
    action: "governance_queue",
  },
  {
    metric_id: "CC-IND-D01",
    problem: "no_primary_contested_race_series_at_EAC",
    detail:
      "EAC EAVS does not publish contested/unopposed race shares. Slot remains SOURCE_UNKNOWN pending definition + primary election-returns methodology.",
    action: "governance_queue",
  },
];

const countable = metricsDoc.metrics.filter(
  (m) =>
    m.counts_toward_baseline_scoreboard !== false &&
    !["design_indicator", "research_question", "retired", "retired_merged"].includes(
      m.status
    )
);
const sourcedCountable = countable.filter(
  (m) => m.current_value != null && m.source_ids?.length && m.status === "sourced"
);
const AFTER_NUM = sourcedCountable.length;
const AFTER_DEN = countable.length;
if (AFTER_DEN !== BEFORE_DEN) {
  console.error("Denominator changed unexpectedly", AFTER_DEN);
  process.exit(1);
}
if (AFTER_NUM < PASS_BEFORE_NUM) {
  console.error("Numerator fell unexpectedly", AFTER_NUM);
  process.exit(1);
}
const AFTER_DISPLAY = `${AFTER_NUM}/${AFTER_DEN}`;

metricsDoc.version = "0.4.2";
metricsDoc.last_updated = TODAY;
metricsDoc.status = "partially_sourced_ontology_cleaned";
metricsDoc.note = `Phase 2 partial after ${SLICE}: arc ${ARC_BEFORE}→${AFTER_DISPLAY} (this pass ${PASS_BEFORE}→${AFTER_DISPLAY}). Continuation fills only; Census failures logged not worked around.`;
metricsDoc.completion_states = [
  "SOURCE_UNKNOWN",
  "SOURCE_IDENTIFIED_DATA_PENDING",
  "BASELINE_COMPLETE",
];
wj("data/baseline/national_baseline_metrics.json", metricsDoc);

statusDoc.version = "0.4.2";
statusDoc.last_updated = TODAY;
statusDoc.total_metrics = AFTER_DEN;
statusDoc.sourced_metrics = AFTER_NUM;
statusDoc.pending_metrics = AFTER_DEN - AFTER_NUM;
statusDoc.status = "partial_phase_2_ontology_cleaned";
statusDoc.note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE} (pass before ${PASS_BEFORE}; arc before ${ARC_BEFORE}). Denominator held at ${AFTER_DEN}.`;
statusDoc.before_after = {
  arc_before_display: ARC_BEFORE,
  pass_before_display: PASS_BEFORE,
  after_display: AFTER_DISPLAY,
  before_sourced: PASS_BEFORE_NUM,
  after_sourced: AFTER_NUM,
  denominator: AFTER_DEN,
  slice_id: SLICE,
};
wj("data/baseline/baseline_status.json", statusDoc);

sourceMap.version = "0.4.2";
sourceMap.last_updated = TODAY;
sourceMap.mappings = sourcedCountable.map((m) => ({
  metric_id: m.metric_id,
  title: m.title,
  source_ids: m.source_ids,
}));
wj("data/baseline/baseline_source_map.json", sourceMap);

methodology.last_updated = TODAY;
methodology.completion_state_taxonomy = {
  SOURCE_UNKNOWN: "Authoritative source and/or construct not yet locked.",
  SOURCE_IDENTIFIED_DATA_PENDING:
    "Authoritative source and metric known; primary observation not yet successfully retrieved.",
  BASELINE_COMPLETE:
    "Definition, observation, primary evidence, retrieval path, and limitations satisfy the reproducible-retrieval standard.",
};
methodology.failed_retrieval_log =
  "research/phase_2/baseline_failed_retrieval_log.json";
wj("data/baseline/baseline_methodology.json", methodology);

bridge.version = "0.6.2";
bridge.last_updated = TODAY;
bridge.live_baseline_display = AFTER_DISPLAY;
bridge.legitimate_slot_expansion_continuation = {
  slice_id: SLICE,
  pathways_established: [
    {
      metric_id: "CC-IND-C03",
      agencies: ["DOJ Antitrust Division"],
      series: "Total criminal cases filed",
    },
    {
      metric_id: "CC-IND-J06",
      agencies: ["DOJ Asset Forfeiture Program"],
      series: "AFF total receipts",
    },
    {
      metric_id: "CC-IND-D04",
      agencies: ["FEC"],
      series: "weball top-decile receipt share",
    },
    {
      metric_id: "CC-IND-E02",
      agencies: ["Federal Reserve Banks", "USDA FSA"],
      series: "SBCS full approval rate + FSA FLP obligations",
    },
  ],
  still_blocked: [
    {
      metric_id: "CC-IND-B01",
      reason: "Census BDS primary retrieval pending; 520 stubs rejected",
    },
    {
      metric_id: "CC-IND-HC07",
      reason: "2024 CPS P20-587 age table retrieval pending; A-1 historical path confirmed",
    },
  ],
};
wj("data/project/public_statistics_bridge.json", bridge);

const gate07 = (checklist.gates || []).find((g) => g.id === "GATE-07");
if (gate07) {
  gate07.forensic_note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE} (arc ${ARC_BEFORE}→${AFTER_DISPLAY}). Denominator held at 64. GATE remains open — not complete.`;
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

let phase2Val = fs.readFileSync(r("scripts/validate-phase2-acceptance.mjs"), "utf8");
phase2Val = phase2Val
  .replace(
    /if \(baselineStatus\.sourced_metrics !== \d+\) \{[\s\S]*?else ok\("baseline sourced count remains [^"]+"\);/,
    `if (baselineStatus.sourced_metrics !== ${AFTER_NUM}) {\n  warn(\n    \`sourced_metrics is \${baselineStatus.sourced_metrics} (canonical operating snapshot expected ${AFTER_NUM} after legitimate-slot expansion continuation)\`\n  );\n} else ok("baseline sourced count remains ${AFTER_DISPLAY}");`
  )
  .replace(
    /if \(baselineStatus\.total_metrics !== \d+\) \{[\s\S]*?else ok\("baseline denominator is [^"]+"\);/,
    `if (baselineStatus.total_metrics !== ${AFTER_DEN}) {\n  fail(\`baseline_status.total_metrics must be ${AFTER_DEN} after ontology cleanup, found \${baselineStatus.total_metrics}\`);\n} else ok("baseline denominator is ${AFTER_DEN} (ontology-cleaned countable slots)");`
  );
fs.writeFileSync(r("scripts/validate-phase2-acceptance.mjs"), phase2Val, "utf8");

const deferredDisposition = {
  "CC-IND-B01": {
    disposition: "DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING",
    completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    note: pendingStates["CC-IND-B01"].deferred_note,
  },
  "CC-IND-HC07": {
    disposition: "PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING",
    completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    note: pendingStates["CC-IND-HC07"].deferred_note,
  },
  "CC-IND-B02": {
    disposition: "SOURCE_IDENTIFIED_DATA_PENDING",
    completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    note: pendingStates["CC-IND-B02"].deferred_note,
  },
  "CC-IND-C02": {
    disposition: "SOURCE_IDENTIFIED_DATA_PENDING",
    completion_state: "SOURCE_IDENTIFIED_DATA_PENDING",
    note: pendingStates["CC-IND-C02"].deferred_note,
  },
  "CC-IND-B03": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-I02": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-J08": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-HC01": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-CM03": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-D09": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
  "CC-IND-D11": { disposition: "REMAINS DEFERRED", completion_state: "SOURCE_UNKNOWN" },
};

const scoreboard = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  arc_before: ARC_BEFORE,
  pass_before: PASS_BEFORE,
  after: AFTER_DISPLAY,
  newly_completed_ids: newlyCompleted,
  deferred_disposition: deferredDisposition,
  new_ontology_defects: newOntologyDefects,
  primary_sources_added: newSources.map((s) => s.source_id),
  derived_metrics_added: ["CC-IND-D04"],
  failed_retrieval_log: "research/phase_2/baseline_failed_retrieval_log.json",
  completion_state_taxonomy: methodology.completion_state_taxonomy,
  definition_debt_remaining: Object.entries(deferredDisposition)
    .filter(([, d]) => d.disposition !== "COMPLETED")
    .map(([id, d]) => ({
      metric_id: id,
      disposition: d.disposition,
      completion_state: d.completion_state,
    })),
  weakest_empirical_domains: [
    "business dynamics (B01/B02/C02) — source identified, Census retrieval pending",
    "human-capital pathways (HC01/HC03–HC05; HC07 observation pending)",
    "democracy structural (D01/D02/D05/D06/D08 + D09/D11)",
    "hospital access (CM03)",
    "local/employee ownership (B03/L03)",
    "specialty essential systems (E03/E04/E06/E08)",
    "justice specialty (J04/J05/J08)",
  ],
  honesty:
    "Did not weaken standard for Census failures. B01/HC07 logged as SOURCE_IDENTIFIED_DATA_PENDING. No PS/T reintroduction. Denominator 64 held.",
};
wj(
  "research/phase_2/baseline_legitimate_slot_expansion_continuation_scoreboard.json",
  scoreboard
);

if (!updates.updates.some((u) => u.id === "UPD-094")) {
  updates.updates.push({
    id: "UPD-094",
    date: TODAY,
    title: "Legitimate baseline slot expansion continuation",
    summary: `Under CC-DEC-103: scoreboard ${PASS_BEFORE}→${AFTER_DISPLAY} (arc ${ARC_BEFORE}→${AFTER_DISPLAY}) with ${newlyCompleted.length} fills (C03, J06, D04, E02). Census B01/HC07 remain SOURCE_IDENTIFIED_DATA_PENDING with failed-retrieval log. Denominator held at 64. Sources 255–260.`,
    public: true,
  });
}
updates.last_updated = TODAY;
wj("data/project/updates.json", updates);

const sliceRec = {
  slice_id: SLICE,
  title: "Baseline Legitimate Slot Expansion Continuation",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    `scoreboard ${PASS_BEFORE}→${AFTER_DISPLAY} (arc ${ARC_BEFORE}→${AFTER_DISPLAY})`,
    `${newlyCompleted.length} newly completed empirical slots`,
    "failed retrieval log recorded",
    "completion-state taxonomy applied",
    "CC-SRC-255–260",
  ],
  next_recommended_slice: NEXT,
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.active_slice = NEXT;
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
wj("data/project/slice_queue.json", sliceQueue);

build.version = "0.4.12";
build.last_updated = TODAY;
build.mission_id = SLICE;
build.slice_return =
  "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_CONTINUATION_1_0_RETURN.md";
build.writing_focus = `Baseline ${AFTER_DISPLAY}. Census retrievals logged pending; continue definition locks.`;
build.next_action =
  "Definition locks for remaining SOURCE_UNKNOWN slots; retry Census BDS/P20 via alternate primary mechanism; human ag voice calls remain open.";
build.baseline = AFTER_DISPLAY;
build.active_slice = NEXT;
build.last_completed_slice = SLICE;
build.sources_registered = srcDoc.sources.length;
build.notes = [
  `${SLICE}: ${PASS_BEFORE}→${AFTER_DISPLAY} (arc ${ARC_BEFORE}→${AFTER_DISPLAY}); ${newlyCompleted.length} fills; denominator 64 held; modeling/legal 0%.`,
];
wj("data/project/current_build_state.json", build);

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary: `Continuation expansion: ${PASS_BEFORE}→${AFTER_DISPLAY} (arc ${ARC_BEFORE}→${AFTER_DISPLAY}). Census failures logged, not worked around. Taxonomy states applied.`,
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
  update_ids: ["UPD-094"],
  public_paths: ["/where-we-are/", "/metrics/", "/status/"],
  board_paths: ["/baseline/", "/phase-2-gate/", "/diagnosis/"],
  integrity_note:
    "No Census proxy stuffing. Failed retrievals preserved. Denominator 64 held.",
  next_command: "Definition locks + alternate Census primary retrieval; human ag voice calls",
  report:
    "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_CONTINUATION_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  baseline_arc_before: ARC_BEFORE,
  baseline_pass_before: PASS_BEFORE,
  baseline_after: AFTER_DISPLAY,
  newly_completed: newlyCompleted,
  agriculture_posture_lock: AG_LOCK,
});

let start = fs.readFileSync(r("START_HERE_FOR_AI.md"), "utf8");
start = start
  .replace(
    /Latest completed slices:.*\nActive \/ next:.*\n/,
    `Latest completed slices: legitimate-slot expansion; expansion continuation\nActive / next: ${NEXT}\n`
  )
  .replace(/GATE-07: OPEN — baseline [^\n]*/, `GATE-07: OPEN — baseline ${AFTER_DISPLAY}`)
  .replace(/Baseline: \d+\/\d+/, `Baseline: ${AFTER_DISPLAY}`)
  .replace(/Sources: \d+/, `Sources: ${srcDoc.sources.length}`)
  .replace(
    /Active next slice: `[^`]+`[^\n]*/,
    `Active next slice: \`${NEXT}\` (Phase 2 remains PARTIAL; expansion continuation shipped)`
  );
fs.writeFileSync(r("START_HERE_FOR_AI.md"), start, "utf8");

const handoffPath = r("docs/handoffs/CURRENT_THREAD_HANDOFF.md");
let handoff = fs.readFileSync(handoffPath, "utf8");
const marker = `## Legitimate-slot expansion continuation (${TODAY})`;
if (!handoff.includes(marker)) {
  handoff += `\n\n---\n\n${marker}\n\n- Scoreboard **${PASS_BEFORE} → ${AFTER_DISPLAY}** (arc **${ARC_BEFORE} → ${AFTER_DISPLAY}**)\n- Newly completed: ${newlyCompleted.join(", ")}\n- Failed retrieval log: \`research/phase_2/baseline_failed_retrieval_log.json\`\n- Active next: \`${NEXT}\`\n- Phase 2: **PARTIAL**\n`;
  fs.writeFileSync(handoffPath, handoff, "utf8");
}

const gateAstro = r("apps/build-board/src/pages/phase-2-gate.astro");
if (fs.existsSync(gateAstro)) {
  let astro = fs.readFileSync(gateAstro, "utf8");
  const before = astro;
  astro = astro.replace(/\d+\/64/g, AFTER_DISPLAY);
  if (astro !== before) fs.writeFileSync(gateAstro, astro, "utf8");
}

const deferredLines = Object.entries(deferredDisposition)
  .map(
    ([id, d]) =>
      `| \`${id}\` | ${d.disposition} | \`${d.completion_state || ""}\` |`
  )
  .join("\n");

const returnMd = `# ${SLICE} — Return

**Generated:** ${TODAY}  
**Rule:** Expand valid empirical baselines. Do not weaken the standard for Census retrieval failures.

## 1. Required delta

\`\`\`text
Baseline before: ${ARC_BEFORE}
Baseline after: ${AFTER_DISPLAY}

Newly completed:
${newlyCompleted.map((id) => `- ${id}`).join("\n")}

Deferred resolved:
- (none forced; D10 already completed prior pass)

Deferred still open:
- B01 → DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING (SOURCE_IDENTIFIED_DATA_PENDING)
- HC07 → PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING (SOURCE_IDENTIFIED_DATA_PENDING)
- B02, C02 → SOURCE_IDENTIFIED_DATA_PENDING
- B03, I02, J08, HC01, CM03, D09, D11 → REMAINS DEFERRED (SOURCE_UNKNOWN)

New ontology defects:
- J06 redefined receipts stock vs dependence ratio (documented)
- HC05 pathway dimension unlocked — age-only earnings rejected
- D01 no EAC contested-race series (flagged)

Primary sources added:
- CC-SRC-255–260

Derived metrics added:
- CC-IND-D04

Definition debt remaining:
- B03, I02, J08, HC01, CM03, D09, D11 (+ B01/B02/C02/HC07 data pending)

Weakest empirical domains:
- business dynamics (Census retrieval)
- human-capital pathways
- democracy structural (ex-D04)
- hospital access
- local/employee ownership
\`\`\`

## 2. Newly completed (retrieval standard)

| ID | Value | Year | Fit | Agency |
| --- | ---: | --- | --- | --- |
| C03 | 20 criminal cases filed | FY2024 | STRONG | DOJ ATR |
| J06 | $2,422M AFF receipts | FY2024 | STRONG | DOJ AFP |
| D04 | 73.0% top-decile receipt share | 2023–24 | STRONG | FEC |
| E02 | 52% full approval; $5.394B FSA FLP | 2024 | STRONG | Fed + USDA FSA |

## 3. Completion-state taxonomy

| State | Meaning |
| --- | --- |
| \`SOURCE_UNKNOWN\` | Authoritative source/construct not yet locked |
| \`SOURCE_IDENTIFIED_DATA_PENDING\` | Source+metric known; primary observation not retrieved |
| \`BASELINE_COMPLETE\` | Full reproducible-retrieval standard met |

## 4. Deferred / pending special treatment

| ID | Disposition | State |
| --- | --- | --- |
${deferredLines}

## 5. Hard boundaries held

- No PS/T design inventories reintroduced
- No HC01 / CM03 proxies
- No B01 fill from Cloudflare 520 stubs or secondary republishers
- No HC07 fill with 2020 A-1 51.4% as if it were 2024
- Denominator unchanged at **64**
- Failed retrievals preserved in \`research/phase_2/baseline_failed_retrieval_log.json\`

## 6. Gate impact

- GATE-07 reassessed: still **OPEN** at ${AFTER_DISPLAY}
- Public Statistics Bridge pathways updated for the four fills
- Unrelated gates not moved
- Phase 2 remains **PARTIAL**; modeling/legal **0%**

## 7. Next

\`${NEXT}\`

## 8. Validators

Filled at ship.
`;

wt(
  "reports/CC_PHASE_2_1_BASELINE_LEGITIMATE_SLOT_EXPANSION_CONTINUATION_1_0_RETURN.md",
  returnMd
);

console.log(`Slice ${SLICE}`);
console.log(`Arc: ${ARC_BEFORE} → ${AFTER_DISPLAY}`);
console.log(`Pass: ${PASS_BEFORE} → ${AFTER_DISPLAY}`);
console.log(`Newly completed (${newlyCompleted.length}): ${newlyCompleted.join(", ")}`);
console.log(`Sources now: ${srcDoc.sources.length}`);
console.log(`Denominator held: ${AFTER_DEN}`);
