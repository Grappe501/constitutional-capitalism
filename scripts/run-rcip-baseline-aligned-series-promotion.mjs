/**
 * RCIP-BASELINE-ALIGNED-SERIES-EXPANSION-1.0
 * Promote B01/B02/C02/HC07 from validated RedDirt aligned export DIRECT MATCHES.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const SLICE = "RCIP-BASELINE-ALIGNED-SERIES-EXPANSION-1.0";
const TODAY = "2026-08-10";

const national = JSON.parse(
  fs.readFileSync(r("data/imports/reddirt-public-statistics/national-baseline.json"), "utf8"),
);
const byConsumer = Object.fromEntries(
  (national.metrics || []).map((m) => [m.consumer_metric_id, m]),
);

const fills = [
  {
    metric_id: "CC-IND-B01",
    import_id: "CC-IND-B01",
    definition:
      "Census BDS economy-wide establishment entry rate: rate of establishments born during the last 12 months (ESTABS_ENTRY_RATE).",
    unit: "percent",
    source_id: "CC-SRC-261",
    source: {
      title: "Census Business Dynamics Statistics — ESTABS_ENTRY_RATE (US, 2023) via Census API timeseries/bds",
      url: "https://api.census.gov/data/timeseries/bds",
      summary: "National economy-wide establishment entry rate from BDS 2023 release via Census API.",
      key_findings: ["US ESTABS_ENTRY_RATE 2023 = 10.608"],
      limitations: "BDS annual dynamics; not Business Formation Statistics (BFS).",
    },
  },
  {
    metric_id: "CC-IND-B02",
    import_id: "CC-IND-B02",
    definition:
      "Census BDS economy-wide establishment exit rate: rate of establishments exited during the last 12 months (ESTABS_EXIT_RATE). Official BDS survival-family complement to establishment entry.",
    unit: "percent",
    source_id: "CC-SRC-262",
    source: {
      title: "Census Business Dynamics Statistics — ESTABS_EXIT_RATE (US, 2023) via Census API timeseries/bds",
      url: "https://api.census.gov/data/timeseries/bds",
      summary: "National economy-wide establishment exit rate from BDS 2023 release via Census API.",
      key_findings: ["US ESTABS_EXIT_RATE 2023 = 9.396"],
      limitations: "Exit rate is the published official measure; multi-year cohort survival tables are a different construct.",
    },
  },
  {
    metric_id: "CC-IND-C02",
    import_id: "CC-IND-C02",
    definition:
      "Census BDS count of establishments born during the last 12 months (ESTABS_ENTRY) — economy-wide new establishment entrants.",
    unit: "establishments",
    source_id: "CC-SRC-263",
    source: {
      title: "Census Business Dynamics Statistics — ESTABS_ENTRY (US, 2023) via Census API timeseries/bds",
      url: "https://api.census.gov/data/timeseries/bds",
      summary: "National count of establishment births from BDS 2023 release via Census API.",
      key_findings: ["US ESTABS_ENTRY 2023 = 790295"],
      limitations: "Count of establishment births, not firm startups only; not BFS applications.",
    },
  },
  {
    metric_id: "CC-IND-HC07",
    import_id: "CC-IND-HC07",
    definition:
      "Percent of United States citizens ages 18–24 who reported voting in the November 2024 election (CPS Voting and Registration Supplement, P20-587 Table 1).",
    unit: "percent_of_citizen_population_ages_18_24",
    source_id: "CC-SRC-264",
    source: {
      title: "Census CPS Voting and Registration P20-587 Table 1 (vote01_2024.xlsx) — ages 18–24 citizen reported voted percent",
      url: "https://www2.census.gov/programs-surveys/cps/tables/p20/587/vote01_2024.xlsx",
      summary: "Official 2024 workbook cell: BOTH SEXES, 18 to 24 years, citizen reported voted percent = 47.7.",
      key_findings: ["18–24 citizen reported voting rate November 2024 = 47.7%"],
      limitations: "Self-reported; overstates administrative turnout. Distinct from all-age D03 (65.3%).",
    },
  },
];

const metricsPath = r("data/baseline/national_baseline_metrics.json");
const metricsDoc = JSON.parse(fs.readFileSync(metricsPath, "utf8"));
const sourcePath = r("data/research/source_registry.json");
const sourcesDoc = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

for (const fill of fills) {
  const imported = byConsumer[fill.import_id];
  if (!imported) throw new Error(`Missing import metric ${fill.import_id}`);
  const m = metricsDoc.metrics.find((x) => x.metric_id === fill.metric_id);
  if (!m) throw new Error(`Missing baseline metric ${fill.metric_id}`);
  if (m.current_value != null) throw new Error(`${fill.metric_id} already sourced`);

  sourcesDoc.sources.push({
    source_id: fill.source_id,
    title: fill.source.title,
    authors: ["U.S. Census Bureau"],
    year: Number(String(imported.reference_period).slice(0, 4)),
    url: fill.source.url,
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: fill.metric_id.startsWith("CC-IND-HC")
      ? "civic_participation"
      : "business_dynamics",
    publication_date: String(imported.reference_period),
    retrieval_date: TODAY,
    summary: fill.source.summary,
    key_findings: fill.source.key_findings,
    limitations: fill.source.limitations,
    verification_status: "primary_retrieval_via_reddirt_aligned_seed",
    notes: `${fill.metric_id}; ${SLICE}; reddirt_observation_id=${imported.reddirt_observation_id}; export=${imported.reddirt_export_id}`,
  });

  m.definition = fill.definition;
  m.unit = fill.unit;
  m.current_value = imported.value;
  m.reference_year = String(imported.reference_period).slice(0, 4);
  m.source_ids = [fill.source_id];
  m.status = "sourced";
  m.confidence_level = "high";
  m.observation_type = "directly_observed_official_series";
  m.source_to_baseline_fit = "DIRECT";
  m.baseline_completion_state = "BASELINE_COMPLETE";
  m.limitations = Array.isArray(imported.limitations)
    ? imported.limitations.join(" ")
    : String(imported.limitations || fill.source.limitations);
  m.reproducible_retrieval = {
    method: `RedDirt RCIP aligned seed → export ${imported.reddirt_export_id} → CC import → DIRECT MATCH promotion`,
    url: fill.source.url,
    agencies: ["US Census Bureau"],
    reddirt_observation_id: imported.reddirt_observation_id,
    reddirt_ingestion_run_id: imported.reddirt_ingestion_run_id,
  };
  m.slice_id = SLICE;
  m.last_sourced_at = TODAY;
  delete m.deferred_note;
  delete m.identified_source;
  m.status_note = "Definition locked to official Census series in aligned expansion slice.";
}

fs.writeFileSync(metricsPath, JSON.stringify(metricsDoc, null, 2) + "\n");
fs.writeFileSync(sourcePath, JSON.stringify(sourcesDoc, null, 2) + "\n");

// Refresh baseline_status counts
const countable = metricsDoc.metrics.filter(
  (m) =>
    m.counts_toward_baseline_scoreboard !== false &&
    !["design_indicator", "research_question"].includes(m.status) &&
    m.ontology_class !== "DESIGN INDICATOR",
);
// Simpler: use existing scoreboard logic fields
const all = metricsDoc.metrics;
const sourced = all.filter(
  (m) =>
    m.counts_toward_baseline_scoreboard !== false &&
    m.current_value != null &&
    Array.isArray(m.source_ids) &&
    m.source_ids.length > 0 &&
    m.status !== "design_indicator" &&
    m.status !== "research_question",
);
const statusPath = r("data/baseline/baseline_status.json");
const status = JSON.parse(fs.readFileSync(statusPath, "utf8"));
const before = status.sourced_metrics;
status.sourced_metrics = sourced.length;
status.pending_metrics = 64 - sourced.length;
status.last_updated = TODAY;
status.notes = `${SLICE}: promoted B01/B02/C02/HC07 via RedDirt aligned DIRECT MATCHES (${before}→${sourced.length}/64).`;
fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + "\n");

const mappingPath = r(
  "data/imports/reddirt-public-statistics/baseline-aligned-observation-mapping.json",
);
fs.writeFileSync(
  mappingPath,
  JSON.stringify(
    {
      slice_id: SLICE,
      export_id: "exp_79f42d2fe71f4b69",
      mapped_at: TODAY,
      promotions: fills.map((f) => {
        const imported = byConsumer[f.import_id];
        return {
          observation_id: imported.reddirt_observation_id,
          candidate_baseline_id: f.metric_id,
          mapping_status: "DIRECT MATCH",
          value: imported.value,
          period: imported.reference_period,
          source_id: f.source_id,
        };
      }),
      baseline_before: `${before}/64`,
      baseline_after: `${sourced.length}/64`,
    },
    null,
    2,
  ) + "\n",
);

console.log(
  JSON.stringify(
    {
      before: `${before}/64`,
      after: `${sourced.length}/64`,
      promoted: fills.map((f) => f.metric_id),
    },
    null,
    2,
  ),
);
