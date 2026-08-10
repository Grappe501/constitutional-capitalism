/**
 * CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-AND-PUBLIC-STATISTICS-BRIDGE-1.0
 *
 * Move a bounded set of existing baseline IDs from placeholder → fully sourced
 * reproducible records. No quota theater. No invented metric IDs.
 * Agriculture posture lock preserved (no processing/feed desk inference).
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-AND-PUBLIC-STATISTICS-BRIDGE-1.0";
const DECISION_ID = "CC-DEC-103";
const BEFORE_SOURCED = 2;

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

const metricsDoc = JSON.parse(
  fs.readFileSync(r("data/baseline/national_baseline_metrics.json"), "utf8")
);
const statusDoc = JSON.parse(fs.readFileSync(r("data/baseline/baseline_status.json"), "utf8"));
const sourceMap = JSON.parse(fs.readFileSync(r("data/baseline/baseline_source_map.json"), "utf8"));
const methodology = JSON.parse(
  fs.readFileSync(r("data/baseline/baseline_methodology.json"), "utf8")
);
const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const bridge = JSON.parse(fs.readFileSync(r("data/project/public_statistics_bridge.json"), "utf8"));
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);

// Freeze note — do not mutate call records beyond lock confirmation
const agLock = "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md";

const newSources = [
  {
    source_id: "CC-SRC-218",
    title: "Census ACS-61 — Housing Availability and Affordability: 2023 (homeownership 65.2%)",
    authors: ["U.S. Census Bureau"],
    year: 2025,
    url: "https://www.census.gov/library/publications/2025/acs/acs-61.html",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "housing",
    publication_date: "2025-09",
    retrieval_date: TODAY,
    summary:
      "ACS report states 2023 national homeownership rate 65.2% (85.7M owner-occupied of 131.3M occupied housing units). Aligns with ACS table B25003 Tenure (1-year).",
    key_findings: ["US homeownership rate 65.2% in 2023 (occupied-unit basis)"],
    limitations: "Occupied housing units universe; differs slightly from SCF family homeownership.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-W04",
  },
  {
    source_id: "CC-SRC-219",
    title: "BLS Real Earnings — December 2025 (real AHE +1.1% over year)",
    authors: ["U.S. Bureau of Labor Statistics"],
    year: 2026,
    url: "https://www.bls.gov/news.release/archives/realer_01132026.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "labor_wages",
    publication_date: "2026-01",
    retrieval_date: TODAY,
    summary:
      "Real average hourly earnings for all employees on private nonfarm payrolls increased 1.1% from Dec 2024 to Dec 2025, seasonally adjusted (CES; CPI-U deflator).",
    key_findings: ["Real AHE over-year change +1.1% (Dec 2024–Dec 2025)"],
    limitations: "Private nonfarm payroll jobs; preliminary recent months; not median wage.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-L01",
  },
  {
    source_id: "CC-SRC-220",
    title: "BLS Productivity and Costs — 2024 annual nonfarm business productivity +2.3%",
    authors: ["U.S. Bureau of Labor Statistics"],
    year: 2025,
    url: "https://www.bls.gov/opub/ted/2025/productivity-up-2-3-percent-in-2024.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "labor_productivity",
    publication_date: "2025-02",
    retrieval_date: TODAY,
    summary:
      "Nonfarm business sector labor productivity (output per hour) increased 2.3% in 2024 (output +2.9%, hours +0.6%).",
    key_findings: ["Nonfarm business productivity +2.3% in 2024"],
    limitations: "Excludes general government, nonprofit institutions, private households, owner-occupied housing; revisions occur.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-L02",
  },
  {
    source_id: "CC-SRC-221",
    title: "Census P60-283 — Poverty in the United States: 2023 (official child poverty)",
    authors: ["U.S. Census Bureau"],
    year: 2024,
    url: "https://www.census.gov/library/publications/2024/demo/p60-283.html",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "poverty",
    publication_date: "2024-09",
    retrieval_date: TODAY,
    summary:
      "Official poverty measure via CPS ASEC: overall poverty 11.1% in 2023. CRS/Census age detail: official child (under 18) poverty rate 15.3% in 2023. SPM child poverty was 13.7% (different measure).",
    key_findings: ["Official child poverty 15.3% (2023)", "SPM child poverty 13.7% (do not mix)"],
    limitations: "Official ≠ SPM; ACS child poverty differs (e.g. 16.0% ACS 2023).",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-F03 — use official CPS ASEC child rate",
  },
  {
    source_id: "CC-SRC-222",
    title: "Census 2020 Urban Areas Facts — rural population 20.0%",
    authors: ["U.S. Census Bureau"],
    year: 2023,
    url: "https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural/2020-ua-facts.html",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "rural_population",
    publication_date: "2023-06_update",
    retrieval_date: TODAY,
    summary:
      "2020 Census urban/rural classification: rural population 66,300,254 (20.0% of US); urban 80.0%. Classification criteria changed vs 2010; not identical to OMB metro/nonmetro.",
    key_findings: ["Rural share 20.0% (2020 Census urban/rural)"],
    limitations: "Decennial classification; differs from USDA ERS nonmetro (~13.8% in 2020).",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-CM02",
  },
  {
    source_id: "CC-SRC-223",
    title: "BEA / FRED A072RC1A156NBEA — Personal saving rate annual 2025 = 4.6%",
    authors: ["U.S. Bureau of Economic Analysis", "FRED"],
    year: 2026,
    url: "https://fred.stlouisfed.org/series/A072RC1A156NBEA",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "household_saving",
    publication_date: "2026-03",
    retrieval_date: TODAY,
    summary:
      "BEA personal saving as percent of disposable personal income, annual: 4.6% in 2025 (5.4% in 2024). National accounts concept — not SCF median household savings balances.",
    key_findings: ["Annual personal saving rate 4.6% (2025)"],
    limitations: "Macro flow rate ≠ household balance-sheet saving; revisions possible.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-F04",
  },
  {
    source_id: "CC-SRC-224",
    title: "BLS Employment Projections — manufacturing employment share 7.5% (2024)",
    authors: ["U.S. Bureau of Labor Statistics"],
    year: 2025,
    url: "https://www.bls.gov/emp/tables/employment-by-major-industry-sector.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "manufacturing",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "BLS employment by major industry sector table: manufacturing employment 12,817.2 thousand in 2024 = 7.5% of total employment (percent distribution 2024).",
    key_findings: ["Manufacturing share of employment 7.5% in 2024"],
    limitations: "Employment share ≠ output share; EP table uses comprehensive employment concept.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-I04",
  },
  {
    source_id: "CC-SRC-225",
    title: "HRSA — State of the Primary Care Workforce 2024 (HPSA population ~22%)",
    authors: ["HRSA National Center for Health Workforce Analysis"],
    year: 2024,
    url: "https://bhw.hrsa.gov/sites/default/files/bureau-health-workforce/state-of-the-primary-care-workforce-report-2024.pdf",
    source_type: "federal_agency_report",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "health_access",
    publication_date: "2024-11",
    retrieval_date: TODAY,
    summary:
      "As of June 30, 2024: 7,501 designated primary care HPSAs; nearly 75 million residents (~22% of U.S. population) live in designated primary care HPSAs. Access proxy — not uninsured rate.",
    key_findings: ["~22% of population in primary care HPSAs (June 30, 2024)"],
    limitations: "Designation system; overlaps and facility HPSAs; not a clinical utilization measure.",
    verification_status: "url_verified_via_fetch",
    notes: "CC-IND-E05",
  },
  {
    source_id: "CC-SRC-226",
    title: "CBO Budget and Economic Outlook — debt held by public ~99% of GDP end-2024",
    authors: ["Congressional Budget Office"],
    year: 2024,
    url: "https://www.cbo.gov/system/files/2024-02/59710-Outlook-2024.pdf",
    source_type: "federal_budget_office",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "public_finance",
    publication_date: "2024-02",
    retrieval_date: TODAY,
    summary:
      "CBO February 2024 Outlook: federal debt held by the public rises to 99% of GDP at end of 2024 under then-current law baseline. Later outlooks revise levels; always cite vintage.",
    key_findings: ["Debt held by public 99% of GDP at end of 2024 (Feb 2024 baseline)"],
    limitations: "Baseline projections revise; gross debt differs from debt held by public; not local-government fiscal capacity.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-G03 — federal debt/GDP, not local gov",
  },
  {
    source_id: "CC-SRC-227",
    title: "Federal Reserve SCF 2022 — retirement account ownership 54.3%; financial asset ownership ~99%",
    authors: ["Board of Governors of the Federal Reserve System"],
    year: 2023,
    url: "https://www.federalreserve.gov/publications/october-2023-changes-in-us-family-finances-from-2019-to-2022.htm",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "wealth_ownership",
    publication_date: "2023-10",
    retrieval_date: TODAY,
    summary:
      "2022 SCF: 54.3% of families held retirement accounts; ~99% owned any financial asset; direct stock ownership discussed separately (~21%). Family survey unit.",
    key_findings: [
      "Retirement account ownership 54.3% (2022)",
      "Any financial asset ownership ~99% (2022)",
    ],
    limitations: "Triennial; family unit; not ACS household.",
    verification_status: "url_verified_via_search",
    notes: "CC-IND-W03 / CC-IND-W05",
  },
  {
    source_id: "CC-SRC-228",
    title: "USDA NASS 2022 Census of Agriculture — 1,900,487 farms (supporting series)",
    authors: ["USDA National Agricultural Statistics Service"],
    year: 2024,
    url: "https://www.nass.usda.gov/Newsroom/2024/02-13-2024.php",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture",
    publication_date: "2024-02-13",
    retrieval_date: TODAY,
    summary:
      "2022 Census of Agriculture: 1,900,487 farms (−6.9% from 2017); average size 463 acres. No dedicated CC-IND farm-structure slot yet — registered as Public Statistics Bridge supporting series only.",
    key_findings: ["1,900,487 US farms in 2022"],
    limitations: "Not mapped to an existing baseline metric_id in this slice.",
    verification_status: "url_verified_via_search",
    notes: "Supporting series — do not invent CC-IND farm ID",
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
  ` Phase 2.1 (${TODAY}): CC-SRC-218–228 baseline subset expansion / public statistics bridge.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");

function patchMetric(id, fields) {
  const m = metricsDoc.metrics.find((x) => x.metric_id === id);
  if (!m) throw new Error("Missing metric " + id);
  Object.assign(m, fields);
  m.status = "sourced";
  m.confidence_level = fields.confidence_level || "high";
  m.target_setting_status = "no_targets_in_phase_2";
  m.slice_id = SLICE;
  m.last_sourced_at = TODAY;
  return m;
}

const sourcedThisSlice = [];

// Enrich already-sourced W01/W02 with reproducible fields
for (const id of ["CC-IND-W01", "CC-IND-W02"]) {
  const m = metricsDoc.metrics.find((x) => x.metric_id === id);
  if (!m) continue;
  m.observation_type = "directly_observed_official_series";
  m.source_to_baseline_fit = "DIRECT";
  m.reproducible_retrieval = m.reproducible_retrieval || {
    method:
      id === "CC-IND-W01"
        ? "Open Fed SCF bulletin / SCF tables; median family net worth (2022 dollars)"
        : "Open FRED/DFA distribute tables for wealth percentile shares; record quarter",
    agencies: ["Federal Reserve"],
  };
  m.numerator_denominator =
    m.numerator_denominator ||
    (id === "CC-IND-W01"
      ? "SCF survey estimate — median of family net worth distribution"
      : "DFA modeled wealth shares by percentile group");
  m.historical_series_available = true;
}

patchMetric("CC-IND-W03", {
  title: "Asset ownership",
  definition:
    "Percent of U.S. families owning any financial asset (transaction accounts, CDs, bonds, stocks, pooled funds, retirement accounts, cash-value life insurance, other managed assets) — SCF.",
  unit: "percent_of_families",
  current_value: 99.0,
  reference_year: "2022",
  source_ids: ["CC-SRC-227", "CC-SRC-001"],
  geographic_level: "national_US",
  population_scope: "US_families_SCF",
  historical_series_available: true,
  update_frequency: "triennial",
  limitations:
    "Nearly universal due to transaction accounts; not a measure of productive capital ownership. Direct stock ownership is lower (~21%).",
  observation_type: "directly_observed_survey",
  numerator_denominator: "families with any financial asset / all families",
  source_to_baseline_fit: "STRONG",
  reproducible_retrieval: {
    method: "Fed SCF Bulletin tables / interactive SCF table — Percent Holding — Any financial asset",
    url: "https://www.federalreserve.gov/publications/october-2023-changes-in-us-family-finances-from-2019-to-2022.htm",
    agencies: ["Federal Reserve"],
  },
});
sourcedThisSlice.push("CC-IND-W03");

patchMetric("CC-IND-W04", {
  title: "Homeownership",
  definition:
    "Share of occupied housing units that are owner-occupied (ACS homeownership rate).",
  unit: "percent_of_occupied_housing_units",
  current_value: 65.2,
  reference_year: "2023",
  source_ids: ["CC-SRC-218"],
  geographic_level: "national_US",
  population_scope: "occupied_housing_units_ACS",
  historical_series_available: true,
  update_frequency: "annual_ACS_1yr",
  limitations:
    "Occupied-unit universe. SCF family homeownership (66.1% in 2022) is a different unit — do not mix without labeling.",
  observation_type: "directly_observed_survey",
  numerator_denominator: "owner-occupied units / occupied housing units (85.7M / 131.3M in ACS-61 narrative)",
  source_to_baseline_fit: "DIRECT",
  reproducible_retrieval: {
    method: "data.census.gov → ACS 1-year → table B25003 Tenure for United States; or ACS-61 report",
    url: "https://data.census.gov/table/ACSDT1Y2023.B25003",
    agencies: ["US Census Bureau"],
  },
});
sourcedThisSlice.push("CC-IND-W04");

patchMetric("CC-IND-W05", {
  title: "Retirement ownership",
  definition:
    "Percent of U.S. families holding retirement accounts (IRA/Keogh and certain employer-sponsored accounts such as 401(k)/403(b)/TSP) — SCF.",
  unit: "percent_of_families",
  current_value: 54.3,
  reference_year: "2022",
  source_ids: ["CC-SRC-227"],
  geographic_level: "national_US",
  population_scope: "US_families_SCF",
  historical_series_available: true,
  update_frequency: "triennial",
  limitations: "Ownership ≠ adequacy of balances; conditional medians are separate metrics.",
  observation_type: "directly_observed_survey",
  numerator_denominator: "families with retirement accounts / all families",
  source_to_baseline_fit: "DIRECT",
  reproducible_retrieval: {
    method: "Fed SCF 2022 bulletin — retirement accounts ownership rate",
    url: "https://www.federalreserve.gov/publications/files/scf23.pdf",
    agencies: ["Federal Reserve"],
  },
});
sourcedThisSlice.push("CC-IND-W05");

patchMetric("CC-IND-L01", {
  title: "Wage growth",
  definition:
    "12-month percent change in real average hourly earnings for all employees on private nonfarm payrolls (CES), CPI-U deflated, seasonally adjusted.",
  unit: "percent_change_over_year",
  current_value: 1.1,
  reference_year: "2025-12_vs_2024-12",
  source_ids: ["CC-SRC-219"],
  geographic_level: "national_US",
  population_scope: "private_nonfarm_payroll_jobs_CES",
  historical_series_available: true,
  update_frequency: "monthly",
  limitations:
    "Mean AHE of jobs, not median worker wages; excludes most government; recent months preliminary.",
  observation_type: "directly_observed_official_series",
  numerator_denominator: "index/level change in real AHE over 12 months",
  source_to_baseline_fit: "STRONG",
  reproducible_retrieval: {
    method: "BLS Real Earnings news release Table A-1 — over-the-year percent change, real AHE all employees",
    url: "https://www.bls.gov/news.release/realer.toc.htm",
    agencies: ["BLS"],
  },
});
sourcedThisSlice.push("CC-IND-L01");

patchMetric("CC-IND-L02", {
  title: "Productivity",
  definition:
    "Annual percent change in labor productivity (output per hour) in the nonfarm business sector — BLS Productivity and Costs.",
  unit: "percent_change_annual",
  current_value: 2.3,
  reference_year: "2024",
  source_ids: ["CC-SRC-220"],
  geographic_level: "national_US",
  population_scope: "nonfarm_business_sector",
  historical_series_available: true,
  update_frequency: "quarterly_with_annual",
  limitations: "Sector coverage excludes general government and several nonbusiness activities; subject to revision.",
  observation_type: "derived_official_index",
  numerator_denominator: "real output index / hours-worked index (growth rates)",
  source_to_baseline_fit: "DIRECT",
  reproducible_retrieval: {
    method: "BLS Productivity and Costs annual averages — nonfarm business labor productivity",
    url: "https://www.bls.gov/productivity/",
    agencies: ["BLS"],
  },
});
sourcedThisSlice.push("CC-IND-L02");

patchMetric("CC-IND-F03", {
  title: "Child poverty",
  definition:
    "Official poverty rate for people under age 18 (CPS ASEC official poverty measure).",
  unit: "percent_of_children",
  current_value: 15.3,
  reference_year: "2023",
  source_ids: ["CC-SRC-221"],
  geographic_level: "national_US",
  population_scope: "persons_under_18_CPS_ASEC",
  historical_series_available: true,
  update_frequency: "annual",
  limitations:
    "Official ≠ SPM (SPM child poverty 13.7% in 2023). ACS child poverty differs. Do not mix measures.",
  observation_type: "directly_observed_survey",
  numerator_denominator: "children below official poverty threshold / all children",
  source_to_baseline_fit: "DIRECT",
  reproducible_retrieval: {
    method: "Census P60 poverty report / Table A-1 age detail; confirm Official Poverty Measure, under 18",
    url: "https://www.census.gov/library/publications/2024/demo/p60-283.html",
    agencies: ["US Census Bureau"],
  },
});
sourcedThisSlice.push("CC-IND-F03");

patchMetric("CC-IND-F04", {
  title: "Household savings",
  definition:
    "BEA personal saving as a percentage of disposable personal income (annual national accounts rate).",
  unit: "percent_of_DPI",
  current_value: 4.6,
  reference_year: "2025",
  source_ids: ["CC-SRC-223"],
  geographic_level: "national_US",
  population_scope: "personal_sector_NIPA",
  historical_series_available: true,
  update_frequency: "monthly_with_annual",
  limitations:
    "Macro flow rate — not median household bank balances. Title says household; series is personal sector.",
  observation_type: "derived_official_national_accounts",
  numerator_denominator: "personal saving / disposable personal income × 100",
  source_to_baseline_fit: "STRONG",
  reproducible_retrieval: {
    method: "FRED series A072RC1A156NBEA or BEA Personal Income and Outlays / NIPA Table 2.1 annual",
    url: "https://fred.stlouisfed.org/series/A072RC1A156NBEA",
    agencies: ["BEA"],
  },
});
sourcedThisSlice.push("CC-IND-F04");

patchMetric("CC-IND-CM02", {
  title: "Rural population",
  definition:
    "Percent of U.S. population living in Census-defined rural territory (areas outside urban areas) — 2020 Census urban/rural classification.",
  unit: "percent_of_population",
  current_value: 20.0,
  reference_year: "2020",
  source_ids: ["CC-SRC-222"],
  geographic_level: "national_US",
  population_scope: "total_resident_population_2020_Census",
  historical_series_available: true,
  update_frequency: "decennial_urban_rural",
  limitations:
    "2020 criteria changed vs 2010. Not OMB metro/nonmetro (nonmetro ~13.8% in 2020 per USDA ERS). Absolute rural population 66,300,254.",
  observation_type: "directly_observed_census",
  numerator_denominator: "rural population / total population (66,300,254 / 331,449,281)",
  source_to_baseline_fit: "DIRECT",
  reproducible_retrieval: {
    method: "Census Urban Areas Facts table — Percent population living within rural areas",
    url: "https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural/2020-ua-facts.html",
    agencies: ["US Census Bureau"],
  },
});
sourcedThisSlice.push("CC-IND-CM02");

patchMetric("CC-IND-I04", {
  title: "Manufacturing",
  definition:
    "Manufacturing employment as a percent of total U.S. employment (BLS Employment Projections industry distribution, 2024).",
  unit: "percent_of_total_employment",
  current_value: 7.5,
  reference_year: "2024",
  source_ids: ["CC-SRC-224"],
  geographic_level: "national_US",
  population_scope: "BLS_employment_projections_total_employment",
  historical_series_available: true,
  update_frequency: "annual_EP_tables",
  limitations: "Employment share ≠ manufacturing output share of GDP; CES monthly levels differ conceptually.",
  observation_type: "directly_observed_official_table",
  numerator_denominator: "manufacturing employment / total employment (12,817.2k / 169,956.1k → 7.5%)",
  source_to_baseline_fit: "STRONG",
  reproducible_retrieval: {
    method: "BLS EMP table 'Employment by major industry sector' — Percent distribution, Manufacturing, 2024",
    url: "https://www.bls.gov/emp/tables/employment-by-major-industry-sector.htm",
    agencies: ["BLS"],
  },
});
sourcedThisSlice.push("CC-IND-I04");

patchMetric("CC-IND-E05", {
  title: "Primary care and mental-health access",
  definition:
    "Approximate share of U.S. population residing in designated primary care Health Professional Shortage Areas (HPSAs) — HRSA.",
  unit: "percent_of_population_in_primary_care_HPSA",
  current_value: 22,
  reference_year: "2024-06-30",
  source_ids: ["CC-SRC-225"],
  geographic_level: "national_US",
  population_scope: "residents_in_designated_primary_care_HPSAs",
  historical_series_available: true,
  update_frequency: "ongoing_designations",
  limitations:
    "Primary-care HPSA population share used as access proxy. Mental-health HPSAs are separate (count available; share not used as the scalar here). Designation ≠ realized care utilization.",
  observation_type: "directly_observed_administrative_designation",
  numerator_denominator: "~75 million residents in primary care HPSAs / U.S. population ≈ 22%",
  source_to_baseline_fit: "PARTIAL_TO_STRONG",
  reproducible_retrieval: {
    method: "HRSA State of the Primary Care Workforce report / shortage-area dashboards — primary care HPSA population",
    url: "https://bhw.hrsa.gov/sites/default/files/bureau-health-workforce/state-of-the-primary-care-workforce-report-2024.pdf",
    agencies: ["HRSA", "HHS"],
  },
});
sourcedThisSlice.push("CC-IND-E05");

patchMetric("CC-IND-G03", {
  title: "Debt",
  definition:
    "Federal debt held by the public as a percent of GDP at fiscal year-end (CBO baseline).",
  unit: "percent_of_GDP",
  current_value: 99,
  reference_year: "2024",
  source_ids: ["CC-SRC-226", "CC-SRC-211"],
  geographic_level: "national_US",
  population_scope: "federal_government",
  historical_series_available: true,
  update_frequency: "annual_outlook_updates",
  limitations:
    "FEDERAL debt held by public — not state/local fiscal capacity. Gross debt differs. Baseline vintages revise (later outlooks may show ~100% for 2025).",
  observation_type: "derived_official_budget_identity",
  numerator_denominator: "debt held by the public / GDP",
  source_to_baseline_fit: "STRONG",
  reproducible_retrieval: {
    method: "CBO Budget and Economic Outlook — debt held by the public as % of GDP for stated fiscal year; record outlook vintage",
    url: "https://www.cbo.gov/publication/59710",
    agencies: ["CBO"],
  },
});
sourcedThisSlice.push("CC-IND-G03");

patchMetric("CC-IND-C01", {
  title: "Market concentration",
  definition:
    "Industry-level concentration of largest firms (CR4/CR8/CR20/CR50; HHI where published) from the Economic Census Establishment and Firm Size / concentration tables — not a single national scalar.",
  unit: "industry_level_CR_and_HHI_table",
  current_value: {
    measurement_object: "Economic_Census_industry_concentration_ratios",
    table_id: "EC2200SIZECONCEN",
    year: 2022,
    national_single_scalar: null,
    rationale:
      "A single US-wide concentration percentage would misstate the measure; authoritative objects are industry CR/HHI cells.",
  },
  reference_year: "2022",
  source_ids: ["CC-SRC-212"],
  geographic_level: "national_US_by_industry",
  population_scope: "Economic_Census_industries",
  historical_series_available: true,
  update_frequency: "quinquennial_Economic_Census",
  limitations:
    "Concentration ≠ competitive harm. Product-market definition matters. Advocacy averages (e.g. mean C4) are secondary and not used as the CC value.",
  observation_type: "directly_observed_official_table",
  numerator_denominator: "sales/shipments of largest N firms / industry total (per industry cell)",
  source_to_baseline_fit: "DIRECT_FOR_MEASUREMENT_SPINE",
  reproducible_retrieval: {
    method: "data.census.gov → table EC2200SIZECONCEN (2022) — concentration of largest firms",
    url: "https://data.census.gov/table/ECNSIZE2022.EC2200SIZECONCEN",
    agencies: ["US Census Bureau"],
  },
  confidence_level: "high",
});
sourcedThisSlice.push("CC-IND-C01");

metricsDoc.last_updated = TODAY;
metricsDoc.status = "partially_sourced";
metricsDoc.note = `Phase 2 partial: sourced metrics include wealth (W01–W05 subset), labor (L01–L02), families (F03–F04), communities (CM02), manufacturing (I04), health access (E05), federal debt (G03), and concentration measurement spine (C01). Slice ${SLICE}. No invented targets. Agriculture posture lock preserved.`;
metricsDoc.version = "0.2.0";

const sourcedCount = metricsDoc.metrics.filter(
  (m) => m.current_value != null && m.source_ids?.length
).length;

statusDoc.version = "0.2.0";
statusDoc.last_updated = TODAY;
statusDoc.total_metrics = metricsDoc.metrics.length;
statusDoc.sourced_metrics = sourcedCount;
statusDoc.pending_metrics = metricsDoc.metrics.length - sourcedCount;
statusDoc.status = "partial_phase_2";
statusDoc.note = `Baseline ${sourcedCount}/${metricsDoc.metrics.length} after ${SLICE}. Honesty rule: completeness requires reproducible retrieval, not a found number.`;
statusDoc.before_after = { before: BEFORE_SOURCED, after: sourcedCount, slice_id: SLICE };

sourceMap.version = "0.2.0";
sourceMap.last_updated = TODAY;
sourceMap.mappings = metricsDoc.metrics
  .filter((m) => m.source_ids?.length)
  .map((m) => ({ metric_id: m.metric_id, source_ids: m.source_ids }));

methodology.last_updated = TODAY;
methodology.completeness_rule =
  "A baseline is not complete because we found a number. It is complete when another researcher can independently retrieve the same statistic and understand exactly what it measures.";
methodology.required_fields_for_sourced = [
  "exact_metric_definition",
  "authoritative_source",
  "geography",
  "observation_year",
  "update_cadence",
  "numerator_denominator",
  "historical_series_flag",
  "limitations",
  "observation_type_direct_or_derived",
  "reproducible_retrieval_instructions",
  "source_to_baseline_fit",
];
methodology.preferred_agencies = [
  ...new Set([
    ...(methodology.preferred_agencies || []),
    "CDC",
    "NCES",
    "HRSA",
    "USDA NASS",
    "state statistical agencies",
  ]),
];

fs.writeFileSync(
  r("data/baseline/national_baseline_metrics.json"),
  JSON.stringify(metricsDoc, null, 2) + "\n"
);
fs.writeFileSync(r("data/baseline/baseline_status.json"), JSON.stringify(statusDoc, null, 2) + "\n");
fs.writeFileSync(
  r("data/baseline/baseline_source_map.json"),
  JSON.stringify(sourceMap, null, 2) + "\n"
);
fs.writeFileSync(
  r("data/baseline/baseline_methodology.json"),
  JSON.stringify(methodology, null, 2) + "\n"
);

wj("research/phase_2/baseline_subset_expansion_scoreboard.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  before: BEFORE_SOURCED,
  after: sourcedCount,
  total: metricsDoc.metrics.length,
  newly_sourced_ids: sourcedThisSlice,
  attempted_not_completed: [
    {
      metric_id: "CC-IND-B01",
      reason:
        "BDS 2023 available, but national establishment entry rate requires Census API key or BDS Explorer interactive pull — not invented from secondary snippets.",
    },
    {
      metric_id: "CC-IND-HC01",
      reason:
        "Title requires multiple-pathway credential attainment; bachelor's-or-higher alone would be a measurement mismatch.",
    },
    {
      metric_id: "CC-IND-CM03",
      reason: "Hospital access needs a locked definition (closures vs travel time vs beds); not forced this pass.",
    },
  ],
  supporting_series_not_baseline_slots: [
    {
      series: "USDA_NASS_farm_count_2022",
      value: 1900487,
      source_id: "CC-SRC-228",
      note: "No existing CC-IND farm-structure ID — bridge only",
    },
  ],
  agriculture_posture_lock: agLock,
  honesty:
    "No target quota. If fewer records met the standard, the scoreboard would show fewer.",
});

// Public statistics bridge update
bridge.version = "0.5.0";
bridge.last_updated = TODAY;
bridge.status = "spine_partial_first_wave_populated";
bridge.slice_id = SLICE;
bridge.agency_to_cc_metric_map = {
  "US Census Bureau": [
    "CC-IND-W04",
    "CC-IND-F03",
    "CC-IND-CM02",
    "CC-IND-C01",
    "CC-IND-B01_pending_api",
  ],
  BLS: ["CC-IND-L01", "CC-IND-L02", "CC-IND-I04"],
  BEA: ["CC-IND-F04"],
  "Federal Reserve": ["CC-IND-W01", "CC-IND-W02", "CC-IND-W03", "CC-IND-W05"],
  CBO: ["CC-IND-G03"],
  HRSA: ["CC-IND-E05"],
  "USDA NASS": ["supporting_farm_count_not_yet_CC_IND"],
  CDC: ["future_health_outcomes"],
  NCES: ["future_education_pathway_metrics"],
  "state agencies": ["future_local_fiscal_and_education"],
};
bridge.mapping_rules = {
  do_not_copy_definitions_incorrectly:
    "Lock the agency definition text before assigning a CC-IND. Prefer official table IDs and universes.",
  official_measure_conflicts: [
    "ACS homeownership vs SCF family homeownership",
    "Official poverty vs SPM vs ACS poverty",
    "Census rural vs OMB nonmetro",
    "Debt held by public vs gross federal debt",
  ],
  completeness_standard: methodology.completeness_rule,
};
bridge.first_wave_execution = {
  slice_id: SLICE,
  before: BEFORE_SOURCED,
  after: sourcedCount,
  completed_ids: sourcedThisSlice,
  redDirt_note:
    "Phase 2 continues to prefer validated snapshots; this pass sources from primary publications with reproducible retrieval paths usable by RedDirt connectors later.",
};
fs.writeFileSync(
  r("data/project/public_statistics_bridge.json"),
  JSON.stringify(bridge, null, 2) + "\n"
);

// GATE-07 note if present
const gate07 = (checklist.gate_items || []).find((g) => g.id === "CC-P2-GATE-07");
if (gate07) {
  gate07.last_evaluated = TODAY;
  gate07.slice_id = SLICE;
  gate07.forensic_note = `Baseline sourced count now ${sourcedCount}/${metricsDoc.metrics.length} (was ${BEFORE_SOURCED}). GATE remains open until materially broader coverage. Completeness = reproducible retrieval, not quota.`;
  gate07.status = "open";
}
checklist.last_updated = TODAY;
fs.writeFileSync(
  r("data/project/phase2_acceptance_checklist.json"),
  JSON.stringify(checklist, null, 2) + "\n"
);

const prs = [
  [
    "072",
    "Why is the baseline still far from 86/86?",
    "Because many indicators are still structural placeholders, and some important ideas (farm structure, pathway credentials, hospital access) do not yet have locked definitions that match an authoritative series. We raise the count only when another researcher can retrieve the same statistic.",
  ],
  [
    "073",
    "Why not invent a farm-structure baseline ID for USDA farm counts?",
    "The registry already has 86 slots. Inventing IDs mid-pass would break the contract that Cursor uses outstanding baseline IDs. USDA farm counts are recorded as a supporting Public Statistics Bridge series until a governed slot exists.",
  ],
  [
    "074",
    "Did this baseline work reopen Arkansas processing or feed conclusions?",
    "No. Agriculture remains locked: capacity may exist while independent access stays unverified until human calls return.",
  ],
];
for (const [num, q, a] of prs) {
  const id = `CC-PR-${num}`;
  wt(
    `reports/public_reasoning/${id}.md`,
    `# ${id}\n\n## Skeptical reader question\n\n${q}\n\n## Public answer\n\n${a}\n\n## Slice\n\n${SLICE}\n`
  );
  const rec = {
    record_id: id,
    slice_id: SLICE,
    skeptical_reader_question: q,
    public_answer: a,
    decision_id: DECISION_ID,
    adjudicator: "ChatGPT",
    decided_at: TODAY,
    domain: "baseline_measurement",
  };
  const ri = prRegistry.records.findIndex((x) => x.record_id === id);
  if (ri >= 0) prRegistry.records[ri] = { ...prRegistry.records[ri], ...rec };
  else prRegistry.records.push(rec);
}
prRegistry.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/public_reasoning_registry.json"),
  JSON.stringify(prRegistry, null, 2) + "\n"
);

const returnMd = `# ${SLICE} — Return

**Generated:** ${TODAY}  
**Agriculture posture:** LOCKED — processing ~3/0/0; feed specialty/toll IP voice-gated. No desk inference into those lanes.

## 1. Scoreboard

| | Count |
| --- | ---: |
| Before | **${BEFORE_SOURCED}/86** |
| After | **${sourcedCount}/86** |
| Newly completed this slice | **${sourcedThisSlice.length}** |

No quota. Records that could not meet the retrieval standard were left pending (B01 API/explorer rate; HC01 pathway mismatch; CM03 hospital definition).

## 2. Completeness rule

> A baseline is not complete because we found a number. It is complete when another researcher can independently retrieve the same statistic and understand exactly what it measures.

Each newly sourced metric includes definition, agency source, geography, year, cadence, numerator/denominator, series flag, limitations, direct/derived flag, retrieval instructions, and source-to-baseline fit.

## 3. Newly sourced IDs

${sourcedThisSlice.map((id) => `- \`${id}\``).join("\n")}

## 4. Public Statistics Bridge

Updated agency→metric map for Census, BLS, BEA, Fed, CBO, HRSA; flagged USDA farm count as supporting series (no invented CC-IND). Conflict warnings recorded (ACS vs SCF homeownership; official vs SPM poverty; rural vs nonmetro; debt held by public vs gross debt).

## 5. Sources

CC-SRC-218–228. Total sources: ${srcDoc.sources.length}.

## 6. Public Reasoning

CC-PR-072–074.

## 7. GATE / baseline honesty

GATE-07 remains open. Modeling/legal remain 0%. Baseline narrative must show **${sourcedCount} of 86**, never revive 38-metric fiction.

## 8. Validators

Filled at ship.

## 9. Exact next

Human: processing + feed voice calls (unchanged).  
Cursor: journalism coverage matrix 90-day coding pass (after this measurement advance).
`;

wt(
  "reports/CC_PHASE_2_1_BASELINE_SUBSET_EXPANSION_AND_PUBLIC_STATISTICS_BRIDGE_1_0_RETURN.md",
  returnMd
);

const sliceRec = {
  slice_id: SLICE,
  title: "Baseline Subset Expansion and Public Statistics Bridge",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    `baseline ${BEFORE_SOURCED}→${sourcedCount}/86`,
    "reproducible retrieval fields on newly sourced metrics",
    "public_statistics_bridge agency map updated",
    "CC-SRC-218–228",
    "CC-PR-072–074",
    "ag posture lock preserved",
  ],
  next_recommended_slice: "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0",
  alternate_next: [
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    "CC-PHASE-2.1-AR-FEED-VOICE-BOTTLENECK-ADJUDICATION-1.0",
  ],
  note: "No quota theater. Agriculture remains human-gated.",
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.active_slice = "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0";
sliceQueue.agriculture_posture_lock = agLock;
sliceQueue.parallel_blocked = {
  processing: {
    slice_id: "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    status: "AWAITING_HUMAN_CALLS",
    baseline: "~3 / 0 / 0",
  },
  feed: {
    slice_id: "CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0",
    status: "AWAITING_HUMAN_CALLS",
  },
};
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const upd088 = {
  id: "UPD-088",
  date: TODAY,
  title: "Baseline subset expansion — reproducible public statistics",
  summary: `Under CC-DEC-103: moved baseline ${BEFORE_SOURCED}/86 → ${sourcedCount}/86 with full retrieval metadata (W03–W05, L01–L02, F03–F04, CM02, I04, E05, G03, C01). Public Statistics Bridge agency map updated. No quota inflation. Ag posture lock preserved. Sources 218–228.`,
  public: true,
};
const ui = updates.updates.findIndex((u) => u.id === "UPD-088");
if (ui >= 0) updates.updates[ui] = upd088;
else updates.updates.push(upd088);
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  writing_focus: `Baseline ${sourcedCount}/86. Ag still voice-gated. Next: journalism coverage coding.`,
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary: `Baseline ${BEFORE_SOURCED}/86 → ${sourcedCount}/86 with reproducible retrieval standards. Public Statistics Bridge updated. Ag lock preserved (~3/0/0 processing; feed voice-gated). Sources 218–228.`,
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice: "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-088"],
  public_paths: [],
  board_paths: ["/research/", "/baseline/"],
  integrity_note:
    "No invented metric IDs. No quota. Completeness = reproducible retrieval. No ag booking/mill inference.",
  next_command: "Human ag voice calls; Cursor journalism coverage coding",
  report:
    "reports/CC_PHASE_2_1_BASELINE_SUBSET_EXPANSION_AND_PUBLIC_STATISTICS_BRIDGE_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  baseline_before: BEFORE_SOURCED,
  baseline_after: sourcedCount,
  baseline_total: metricsDoc.metrics.length,
  agriculture_posture_lock: agLock,
  processing_baseline: {
    cattle_accessible_claimed_desk: 3,
    booking_confirmed: 0,
    economically_usable_confirmed: 0,
  },
});

console.log("\nBaseline subset expansion complete");
console.log(`Scoreboard: ${BEFORE_SOURCED}/86 → ${sourcedCount}/86`);
console.log("Newly sourced:", sourcedThisSlice.join(", "));
