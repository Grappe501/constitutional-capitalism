/**
 * Atlas completion pass (still CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0):
 * - data_asset_master_registry.json
 * - B01/B02/C02/HC07 missing-vs-unused forensic
 * - master lineage chains
 * - pause baseline expansion pending decision
 * Audit only. No migrations, clients, or baseline fills.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE = "CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0";
const REDIRT = "H:\\SOSWebsite\\RedDirt";

const wj = (rel, obj) => {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
};
const read = (rel) => JSON.parse(fs.readFileSync(r(rel), "utf8"));

const tableReg = read("data/project/database_table_registry.json");
const externalReg = read("data/project/external_data_source_registry.json");
const flowReg = read("data/project/data_flow_registry.json");
const metricsDoc = read("data/baseline/national_baseline_metrics.json");
const statusDoc = read("data/baseline/baseline_status.json");
const srcDoc = read("data/research/source_registry.json");
const claimDoc = read("data/research/claim_ledger.json");
const failedLog = read("research/phase_2/baseline_failed_retrieval_log.json");
const bridge = read("data/project/public_statistics_bridge.json");

function keyStatus(block, name) {
  const k = block?.keys?.[name];
  if (!k || !k.present) return "NOT FOUND";
  if (!k.has_nonempty_value) return "PRESENT_EMPTY";
  return "CONFIGURED";
}

const reddirtEnv = externalReg.credential_inventory.reddirt.result[".env"];
const ccEnv = externalReg.credential_inventory.constitutional_capitalism.result[".env"];

const credentialSummary = {
  CENSUS_API_KEY: {
    local_reddirt_env: keyStatus(reddirtEnv, "CENSUS_API_KEY"),
    local_cc_env: keyStatus(ccEnv, "CENSUS_API_KEY"),
    expected_by_code: true,
    code_locations: [
      "H:\\SOSWebsite\\RedDirt\\src\\lib\\county-workbench\\factory\\ingestion\\countyIngestionAdapters.ts",
      "H:\\SOSWebsite\\RedDirt\\docs\\intelligence\\API_AND_FEED_KEY_INVENTORY.md (PLANNED)",
    ],
    distinction:
      "Code expects CENSUS_API_KEY; RedDirt env does not have it. Architecture assumes configured API access that is not present.",
  },
  BLS_API_KEY: {
    local_reddirt_env: keyStatus(reddirtEnv, "BLS_API_KEY"),
    local_cc_env: keyStatus(ccEnv, "BLS_API_KEY"),
    expected_by_code: true,
    code_locations: [
      "H:\\SOSWebsite\\RedDirt\\src\\lib\\county-workbench\\factory\\ingestion\\countyIngestionAdapters.ts",
      "H:\\SOSWebsite\\RedDirt\\docs\\intelligence\\API_AND_FEED_KEY_INVENTORY.md (PLANNED)",
    ],
    distinction:
      "Code expects BLS_API_KEY; RedDirt env does not have it. Warehouse run used invalid placeholder.",
  },
  API_DOT_GOV_KEY: {
    local_reddirt_env: keyStatus(reddirtEnv, "API_DOT_GOV_KEY"),
    local_cc_env: keyStatus(ccEnv, "API_DOT_GOV_KEY"),
    expected_by_census_bls_clients: false,
    distinction:
      "Configured in RedDirt, but not the Census Data API key or BLS registration key used by audited clients.",
  },
};

// Warehouse contents relevant to pending slots
const warehousePath = path.join(REDIRT, "data", "public-statistics", "warehouse", "warehouse.json");
const warehouse = fs.existsSync(warehousePath)
  ? JSON.parse(fs.readFileSync(warehousePath, "utf8"))
  : { sourceQueries: [], observations: [] };
const warehouseDatasets = [
  ...new Set((warehouse.sourceQueries || []).map((q) => q.datasetId)),
];
const warehouseHasBds = (warehouse.sourceQueries || []).some((q) =>
  /bds/i.test(JSON.stringify(q))
);
const warehouseHasCpsVoting = (warehouse.sourceQueries || []).some((q) => {
  const s = JSON.stringify(q).toLowerCase();
  return s.includes("voting") || s.includes("p20") || s.includes("registration");
});

const slotForensic = {
  question:
    "Are B01, B02, C02 and HC07 actually missing data—or are we failing to use infrastructure/data we already possess?",
  verdict:
    "MISSING_PRIMARY_OBSERVATIONS — not unused warehouse/DB fills. Partial path existence without usable values.",
  credentials: {
    "CENSUS_API_KEY": credentialSummary.CENSUS_API_KEY.local_reddirt_env,
    "BLS_API_KEY": credentialSummary.BLS_API_KEY.local_reddirt_env,
  },
  warehouse_datasets_present: warehouseDatasets,
  warehouse_observations: (warehouse.observations || []).length,
  slots: {
    "CC-IND-B01": {
      title: "Startup rate",
      status: "SOURCE_IDENTIFIED_DATA_PENDING",
      identified_source: "Census BDS estabs_entry_rate",
      already_in_reddirt_warehouse: false,
      already_in_reddirt_postgres: false,
      already_in_cc_baseline_value: false,
      local_temp_usable: false,
      local_temp_note: ".local/temp/bds_*.csv are Cloudflare 520 stubs (16 bytes) — rejected",
      api_exposure:
        "Possibly via Census API/BDS routes when key configured; not among warehouse ACS5 attempts. File CSV path also timed out.",
      chain_stops_at: "primary_observation_retrieval",
      answer: "Missing data (observation). Infrastructure intended but empty/broken; no hidden usable BDS value to wire.",
    },
    "CC-IND-B02": {
      title: "Business survival",
      status: "SOURCE_IDENTIFIED_DATA_PENDING",
      identified_source: "Census BDS survival/exit family",
      already_in_reddirt_warehouse: false,
      already_in_reddirt_postgres: false,
      already_in_cc_baseline_value: false,
      local_temp_usable: false,
      api_exposure: "Same BDS family as B01; not ingested.",
      chain_stops_at: "primary_observation_retrieval",
      answer: "Missing data (observation). Coupled to B01 retrieval failure — not an unused existing fill.",
    },
    "CC-IND-C02": {
      title: "New entrants",
      status: "SOURCE_IDENTIFIED_DATA_PENDING",
      identified_source: "Census BDS / related entry measures",
      already_in_reddirt_warehouse: false,
      already_in_reddirt_postgres: false,
      already_in_cc_baseline_value: false,
      local_temp_usable: false,
      api_exposure: "Same family; warehouse only has acs5 + bls laus/cpi/ces.",
      chain_stops_at: "primary_observation_retrieval",
      answer: "Missing data (observation). Not sitting unused in DB/warehouse.",
    },
    "CC-IND-HC07": {
      title: "Civic participation among young adults",
      status: "SOURCE_IDENTIFIED_DATA_PENDING",
      identified_source: "CPS Voting Supplement 18–24 citizen voting rate",
      already_in_reddirt_warehouse: false,
      warehouse_note:
        "laus_cps in warehouse is unemployment CPS/LAUS, not voting CPS. warehouseHasCpsVoting=" +
        warehouseHasCpsVoting,
      already_in_reddirt_postgres: false,
      already_in_cc_baseline_value: false,
      local_temp_usable_partial: true,
      local_temp_note:
        ".local/temp/a1.xlsx (CPS A-1) confirms historical path through 2020 (e.g. 51.4% 18–24 citizen voted). Must NOT be used as 2024 current baseline. CC-SRC-260 registered as path confirmation only.",
      api_exposure:
        "2024 P20-587 age tables are file/workbook products; not present in RedDirt warehouse API attempts. Census key would not automatically close HC07 if product is file-only.",
      chain_stops_at: "current_year_observation_retrieval",
      answer:
        "Partially possess historical primary path (2020), missing current (2024) observation. Not a case of unused live DB/API data.",
    },
  },
};

const lineageChains = [
  {
    chain_id: "LINEAGE-BASELINE-MANUAL-GENERIC",
    status: "ACTIVE_PARTIAL",
    ideal: [
      "Agency API",
      "raw observation",
      "database",
      "normalized metric",
      "baseline ID",
      "claim",
      "proof packet",
      "doctrine",
      "manuscript/public page",
    ],
    actual: [
      "Agency page/PDF/CSV (manual)",
      "CC phase21 script",
      "national_baseline_metrics.current_value",
      "source_registry",
      "optional claim_ledger link",
      "build-board/book-site static JSON",
    ],
    stops_at: null,
    covers: "Most of 38/64 completed slots",
  },
  {
    chain_id: "LINEAGE-REDIRT-PUBLICSTATS-SPINE",
    status: "BROKEN",
    ideal: [
      "Census/BLS API",
      "RedDirt raw/",
      "public_statistics tables",
      "approved export",
      "CC import",
      "baseline ID",
      "claim",
      "public page",
    ],
    actual: [
      "Census/BLS API",
      "RedDirt raw/ (Invalid Key bodies)",
      "warehouse.json sourceQueries rowCount=0",
      "observations=[]",
      "STOP — no export, no CC baseline mapping",
    ],
    stops_at: "raw_observation_valid_parse",
    covers: "Intended RCIP path; feeds 0 baseline slots today",
  },
  {
    chain_id: "LINEAGE-B01-BDS",
    status: "STOPPED",
    metric_ids: ["CC-IND-B01", "CC-IND-B02", "CC-IND-C02"],
    actual: [
      "Census BDS identified as authoritative",
      "file download attempts → timeout/520 stubs",
      "warehouse has no BDS queries",
      "Postgres has no BDS observations",
      "baseline current_value=null",
      "STOP",
    ],
    stops_at: "primary_observation_retrieval",
    next_required: "Configure Census access path that can retrieve BDS (API if exposed, else official file); no secondary substitution",
  },
  {
    chain_id: "LINEAGE-HC07-CPS-VOTING",
    status: "STOPPED_AFTER_HISTORICAL_PATH",
    metric_ids: ["CC-IND-HC07"],
    actual: [
      "CPS Voting 18–24 citizen rate identified",
      "A-1 workbook retrieved (through 2020) → CC-SRC-260 path confirmation",
      "2024 P20-587 age tables → retrieval failure",
      "baseline current_value=null (correct — do not use 2020 as 2024)",
      "STOP",
    ],
    stops_at: "current_year_observation_retrieval",
    next_required: "Retrieve 2024 primary age table; API key alone may be insufficient if product is file-only",
  },
  {
    chain_id: "LINEAGE-CLAIM-PROOF",
    status: "PARTIAL",
    actual: [
      "claim_ledger.json",
      "source_registry.json",
      "proof packets / reports (selected)",
      "doctrine freeze (principles) — separate from baseline numbers",
      "public reasoning pages",
    ],
    stops_at: "many claims still below STRONG; baseline→claim wiring incomplete for most IND slots",
    phase_9_note:
      "Systems Intelligence Engine cannot answer 'if this number changes, what else changes?' until observation→metric→claim edges are first-class.",
  },
];

// Build master asset registry
const assets = [];

function addAsset(a) {
  assets.push({
    asset_id: a.asset_id,
    kind: a.kind,
    title: a.title,
    path: a.path || null,
    system: a.system,
    classification: a.classification,
    status: a.status,
    purpose: a.purpose,
    feeds: a.feeds || [],
    fed_by: a.fed_by || [],
    related_metric_ids: a.related_metric_ids || [],
    related_claim_ids: a.related_claim_ids || [],
    lineage_chain_ids: a.lineage_chain_ids || [],
    last_known_update: a.last_known_update || null,
    notes: a.notes || null,
  });
}

// CC JSON stores from table registry
for (const t of tableReg.tables.filter((x) => x.system === "ConstitutionalCapitalism-JSON")) {
  addAsset({
    asset_id: `CC-ASSET-JSON-${t.table_name}`,
    kind: "json_registry",
    title: t.table_name,
    path: t.database_schema + "/" + t.table_name,
    system: "ConstitutionalCapitalism-JSON",
    classification: t.classification,
    status: t.status,
    purpose: t.purpose,
    feeds: t.read_paths,
    fed_by: t.write_paths,
    lineage_chain_ids: ["LINEAGE-BASELINE-MANUAL-GENERIC"],
    last_known_update: t.last_known_ingestion,
  });
}

addAsset({
  asset_id: "CC-ASSET-BASELINE-METRICS",
  kind: "json_registry",
  title: "National baseline metrics",
  path: "data/baseline/national_baseline_metrics.json",
  system: "ConstitutionalCapitalism-JSON",
  classification: "CANONICAL",
  status: "ACTIVE",
  purpose: "Scoreboard + metric definitions/values",
  feeds: ["build-board", "validators", "public metrics surfaces"],
  fed_by: ["phase21 baseline scripts (manual)"],
  related_metric_ids: (metricsDoc.metrics || [])
    .filter((m) => m.counts_toward_baseline_scoreboard === true)
    .map((m) => m.metric_id),
  lineage_chain_ids: ["LINEAGE-BASELINE-MANUAL-GENERIC"],
  last_known_update: statusDoc.last_updated,
  notes: `Scoreboard ${statusDoc.sourced_metrics}/${statusDoc.total_metrics}`,
});

addAsset({
  asset_id: "CC-ASSET-SOURCE-REGISTRY",
  kind: "json_registry",
  title: "Source registry",
  path: "data/research/source_registry.json",
  system: "ConstitutionalCapitalism-JSON",
  classification: "CANONICAL",
  status: "ACTIVE",
  purpose: "Canonical source ledger",
  feeds: ["claims", "baseline source_ids", "proof packets"],
  fed_by: ["research/baseline scripts"],
  last_known_update: srcDoc.last_updated || TODAY,
  notes: `${(srcDoc.sources || []).length} sources`,
});

addAsset({
  asset_id: "CC-ASSET-CLAIM-LEDGER",
  kind: "json_registry",
  title: "Claim ledger",
  path: "data/research/claim_ledger.json",
  system: "ConstitutionalCapitalism-JSON",
  classification: "CANONICAL",
  status: "ACTIVE",
  purpose: "Claims and evidence fit",
  feeds: ["proof packets", "public reasoning"],
  fed_by: ["phase21 claim scripts"],
  related_claim_ids: (claimDoc.claims || []).slice(0, 5).map((c) => c.claim_id),
  lineage_chain_ids: ["LINEAGE-CLAIM-PROOF"],
  notes: `${(claimDoc.claims || []).length} claims`,
});

addAsset({
  asset_id: "CC-ASSET-FAILED-RETRIEVAL-LOG",
  kind: "generated_research_file",
  title: "Baseline failed retrieval log",
  path: "research/phase_2/baseline_failed_retrieval_log.json",
  system: "ConstitutionalCapitalism-JSON",
  classification: "CANONICAL",
  status: "ACTIVE",
  purpose: "Why slots are incomplete — prevent rediscovering failed URLs",
  feeds: ["future retrieval planning"],
  fed_by: ["legitimate-slot expansion continuation"],
  related_metric_ids: ["CC-IND-B01", "CC-IND-HC07"],
  lineage_chain_ids: ["LINEAGE-B01-BDS", "LINEAGE-HC07-CPS-VOTING"],
});

addAsset({
  asset_id: "CC-ASSET-PUBLICSTATS-IMPORT-STUBS",
  kind: "json_registry",
  title: "RedDirt public statistics import stubs",
  path: "data/imports/reddirt-public-statistics/",
  system: "ConstitutionalCapitalism-JSON",
  classification: "STAGING",
  status: "DORMANT",
  purpose: "Landing zone for RedDirt exports",
  feeds: ["intended baseline mapping — not active"],
  fed_by: ["pnpm publicstats:import"],
  lineage_chain_ids: ["LINEAGE-REDIRT-PUBLICSTATS-SPINE"],
  notes: "observation_count=0",
});

addAsset({
  asset_id: "RD-ASSET-FILE-WAREHOUSE",
  kind: "json_registry",
  title: "RedDirt public-statistics file warehouse",
  path: "H:\\SOSWebsite\\RedDirt\\data\\public-statistics\\warehouse\\warehouse.json",
  system: "RedDirt-JSON-warehouse",
  classification: "STAGING",
  status: "BROKEN",
  purpose: "Operator warehouse for RCIP spine",
  feeds: ["intended export — none yet"],
  fed_by: ["Census/BLS API attempts 2026-08-05"],
  lineage_chain_ids: ["LINEAGE-REDIRT-PUBLICSTATS-SPINE"],
  notes: `datasets=[${warehouseDatasets.join(",")}] observations=0`,
});

addAsset({
  asset_id: "RD-ASSET-COUNTY-PUBLIC-DEMOGRAPHICS",
  kind: "database_table",
  title: "CountyPublicDemographics",
  path: "RedDirt.prisma/CountyPublicDemographics",
  system: "RedDirt-Postgres",
  classification: "CANONICAL",
  status: "ACTIVE_IN_REDIRT_SCHEMA_ONLY",
  purpose: "County ACS/BLS-style aggregates (campaign county intel)",
  feeds: ["RedDirt county workbench"],
  fed_by: ["censusAdapter/blsAdapter — NOT IMPLEMENTED; keys absent"],
  lineage_chain_ids: ["LINEAGE-REDIRT-PUBLICSTATS-SPINE"],
  notes: "Must not silently become CC baseline without export boundary",
});

for (const name of [
  "sources",
  "datasets",
  "series",
  "observations",
  "geographies",
  "releases",
  "ingestion_runs",
  "revisions",
  "metric_mappings",
]) {
  addAsset({
    asset_id: `RD-ASSET-DESIGN-PS-${name}`,
    kind: "database_table_design",
    title: `public_statistics.${name}`,
    path: `design:public_statistics.${name}`,
    system: "RedDirt-Postgres-design",
    classification: "CANONICAL",
    status: "NOT_IMPLEMENTED",
    purpose: "Isolated public statistics warehouse (CC-DEC-076)",
    feeds: ["intended CC export views"],
    fed_by: ["intended agency connectors"],
    lineage_chain_ids: ["LINEAGE-REDIRT-PUBLICSTATS-SPINE"],
  });
}

// Government datasets as assets
const govDatasets = [
  {
    id: "GOV-CENSUS-ACS5",
    title: "Census ACS 5-year",
    status: "ATTEMPTED_FAILED",
    notes: "Warehouse invalid key",
  },
  {
    id: "GOV-CENSUS-BDS",
    title: "Census Business Dynamics Statistics",
    status: "IDENTIFIED_NOT_INGESTED",
    related: ["CC-IND-B01", "CC-IND-B02", "CC-IND-C02"],
  },
  {
    id: "GOV-CENSUS-CPS-VOTING",
    title: "Census CPS Voting and Registration",
    status: "HISTORICAL_PATH_ONLY",
    related: ["CC-IND-HC07"],
  },
  {
    id: "GOV-BLS-LAUS",
    title: "BLS LAUS / CPS unemployment series",
    status: "ATTEMPTED_FAILED",
  },
  {
    id: "GOV-BLS-CPI",
    title: "BLS CPI",
    status: "ATTEMPTED_FAILED",
  },
  {
    id: "GOV-BLS-CES",
    title: "BLS CES",
    status: "ATTEMPTED_FAILED",
  },
  {
    id: "GOV-BLS-JOLTS",
    title: "BLS JOLTS",
    status: "MANUAL_IN_CC_BASELINE",
    related: ["CC-IND-L04"],
  },
];

for (const g of govDatasets) {
  addAsset({
    asset_id: g.id,
    kind: "government_dataset",
    title: g.title,
    system: "external_agency",
    classification: "CANONICAL",
    status: g.status,
    purpose: "Authoritative statistical product",
    related_metric_ids: g.related || [],
    notes: g.notes || null,
    lineage_chain_ids:
      g.id.includes("BDS")
        ? ["LINEAGE-B01-BDS"]
        : g.id.includes("CPS-VOTING")
          ? ["LINEAGE-HC07-CPS-VOTING"]
          : g.id.includes("CENSUS-ACS") || g.id.includes("BLS-LAUS") || g.id.includes("BLS-CPI") || g.id.includes("BLS-CES")
            ? ["LINEAGE-REDIRT-PUBLICSTATS-SPINE"]
            : ["LINEAGE-BASELINE-MANUAL-GENERIC"],
  });
}

const master = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  audit_only: true,
  operating_rule:
    "CHECK EXISTING DATA ASSETS → CHECK EXISTING CONNECTOR → RETRIEVE → CREATE NEW PIPELINE ONLY IF NECESSARY.",
  preferred_ingestion_order: [
    "agency_api_with_configured_key",
    "official_machine_readable_file",
    "official_table_or_workbook",
    "manual_primary_retrieval",
    "secondary_corroboration_only",
  ],
  credential_summary: {
    "CENSUS_API_KEY": credentialSummary.CENSUS_API_KEY.local_reddirt_env,
    "BLS_API_KEY": credentialSummary.BLS_API_KEY.local_reddirt_env,
    "API_DOT_GOV_KEY": credentialSummary.API_DOT_GOV_KEY.local_reddirt_env,
    note: "Presence labels only. Values never stored.",
    code_expects_keys_absent_in_env: {
      CENSUS_API_KEY: true,
      BLS_API_KEY: true,
    },
  },
  baseline_pause: {
    paused: true,
    scoreboard: `${statusDoc.sourced_metrics}/${statusDoc.total_metrics}`,
    reason:
      "Stop individual baseline expansion until atlas-informed decision: API repair vs consolidation vs proof gates.",
  },
  slot_forensic: slotForensic,
  lineage_chains: lineageChains,
  related_registries: [
    "data/project/database_table_registry.json",
    "data/project/external_data_source_registry.json",
    "data/project/data_flow_registry.json",
    "research/phase_2/baseline_failed_retrieval_log.json",
  ],
  assets,
  counts: {
    total_assets: assets.length,
    by_kind: assets.reduce((acc, a) => {
      acc[a.kind] = (acc[a.kind] || 0) + 1;
      return acc;
    }, {}),
    by_status: assets.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {}),
  },
};

wj("data/project/data_asset_master_registry.json", master);

// Patch supporting registries
externalReg.credential_summary_labels = {
  "CENSUS_API_KEY": credentialSummary.CENSUS_API_KEY.local_reddirt_env,
  "BLS_API_KEY": credentialSummary.BLS_API_KEY.local_reddirt_env,
  "API_DOT_GOV_KEY": credentialSummary.API_DOT_GOV_KEY.local_reddirt_env,
};
externalReg.code_expects_but_env_absent = ["CENSUS_API_KEY", "BLS_API_KEY"];
externalReg.slot_forensic_b01_b02_c02_hc07 = slotForensic;
externalReg.data_asset_master_registry = "data/project/data_asset_master_registry.json";
wj("data/project/external_data_source_registry.json", externalReg);

flowReg.lineage_chains = lineageChains;
flowReg.baseline_expansion_paused = true;
flowReg.data_asset_master_registry = "data/project/data_asset_master_registry.json";
wj("data/project/data_flow_registry.json", flowReg);

bridge.data_asset_master_registry = "data/project/data_asset_master_registry.json";
bridge.baseline_expansion_paused = true;
bridge.slot_forensic_pending_census = {
  B01: "MISSING_OBSERVATION",
  B02: "MISSING_OBSERVATION",
  C02: "MISSING_OBSERVATION",
  HC07: "HISTORICAL_PATH_ONLY_CURRENT_MISSING",
};
bridge.last_updated = TODAY;
wj("data/project/public_statistics_bridge.json", bridge);

const methodology = read("data/baseline/baseline_methodology.json");
methodology.baseline_expansion_paused = true;
methodology.baseline_expansion_pause_reason =
  "Await decision after dataflow atlas: API repair / consolidation / proof gate — do not continue blind 38/64 fills.";
methodology.data_asset_master_registry = "data/project/data_asset_master_registry.json";
methodology.research_start_rule =
  "CHECK EXISTING DATA ASSETS → CHECK EXISTING CONNECTOR → RETRIEVE → CREATE NEW PIPELINE ONLY IF NECESSARY.";
methodology.last_updated = TODAY;
wj("data/baseline/baseline_methodology.json", methodology);

const sliceQueue = read("data/project/slice_queue.json");
sliceQueue.baseline_expansion_paused = true;
sliceQueue.active_slice = "AWAITING_DECISION_AFTER_DATAFLOW_ATLAS";
sliceQueue.decision_options_after_atlas = [
  "API repair in RedDirt (configure CENSUS_API_KEY/BLS_API_KEY; re-run spine; export)",
  "Database/ingestion consolidation (wire warehouse→export→CC mapping)",
  "Resume baseline expansion 38/64 with registry-first rule",
  "Other Phase 2 proof gate (non-baseline)",
];
sliceQueue.last_updated = TODAY;
wj("data/project/slice_queue.json", sliceQueue);

const build = read("data/project/current_build_state.json");
build.baseline_expansion_paused = true;
build.active_slice = "AWAITING_DECISION_AFTER_DATAFLOW_ATLAS";
build.writing_focus =
  "Baseline paused at 38/64. Atlas complete including asset master + B01/B02/C02/HC07 forensic. Await decision.";
build.next_action =
  "Human decision: API repair vs consolidation vs resume baseline vs other proof gate.";
build.last_updated = TODAY;
wj("data/project/current_build_state.json", build);

// Append forensic section to atlas report
const reportPath = r("reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md");
let report = fs.readFileSync(reportPath, "utf8");
const marker = "## Slot forensic: B01 / B02 / C02 / HC07";
if (!report.includes(marker)) {
  report += `

## Credential labels (no values)

\`\`\`text
CENSUS_API_KEY: ${credentialSummary.CENSUS_API_KEY.local_reddirt_env} (RedDirt .env)
BLS_API_KEY: ${credentialSummary.BLS_API_KEY.local_reddirt_env} (RedDirt .env)
API_DOT_GOV_KEY: ${credentialSummary.API_DOT_GOV_KEY.local_reddirt_env} (RedDirt .env; not Census/BLS client key)
CENSUS_API_KEY / BLS_API_KEY in CC: NOT FOUND (correct under bridge rules)
Code expects CENSUS_API_KEY + BLS_API_KEY: YES — env absent (EXPECTED BY CODE BUT ABSENT)
\`\`\`

${marker}

**Question:** Are these slots missing data, or failing to use data we already possess?

**Verdict:** **Missing primary observations** (with one historical-path exception). Not unused live warehouse/DB fills.

| Slot | Possessed? | Where chain stops |
| --- | --- | --- |
| B01 Startup (BDS entry) | No usable observation. Warehouse has **no BDS**. Local CSV stubs are 520 rejects. | primary_observation_retrieval |
| B02 Survival (BDS) | Same as B01 — not in warehouse/DB. | primary_observation_retrieval |
| C02 New entrants | Same BDS-family gap. | primary_observation_retrieval |
| HC07 Young adult civic | Historical A-1 path confirmed through **2020** (local + CC-SRC-260). **2024** observation missing. Do not use 2020 as current. | current_year_observation_retrieval |

Warehouse datasets actually attempted: \`${warehouseDatasets.join(", ")}\` — ACS5 + BLS LAUS/CPI/CES only. \`laus_cps\` is unemployment, not voting.

## Master lineage (where chains stop)

\`\`\`text
IDEAL:
Agency API → raw → database → normalized metric → baseline ID → claim → proof → doctrine → public page

B01/B02/C02:
Census BDS identified → file/API retrieval FAILED → STOP (no observation)

HC07:
CPS voting identified → A-1 historical OK (≤2020) → 2024 P20 FAILED → STOP (no current baseline value)

Working 38/64 path:
Agency page/PDF → CC script → national_baseline_metrics.json → static site
(skips RedDirt DB/warehouse)

Broken RCIP path:
Agency API → Invalid Key raw → warehouse observations=[] → STOP (no export to CC)
\`\`\`

## Data asset master registry

Canonical index: \`data/project/data_asset_master_registry.json\`

Future research start rule:

> **CHECK EXISTING DATA ASSETS → CHECK EXISTING CONNECTOR → RETRIEVE → CREATE NEW PIPELINE ONLY IF NECESSARY.**

## Baseline expansion status

**PAUSED** at **${statusDoc.sourced_metrics}/${statusDoc.total_metrics}** pending human decision among:

1. RedDirt API repair (configure keys; re-run spine; export)
2. Ingestion consolidation (warehouse → CC mapping)
3. Resume baseline expansion under registry-first rule
4. Other Phase 2 proof gate

Do not continue blind individual statistic retrieval until that decision.
`;
  fs.writeFileSync(reportPath, report.endsWith("\n") ? report : report + "\n");
}

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "COMPLETE_AUDIT_ONLY_BASELINE_PAUSED",
  updated_at: TODAY,
  summary:
    "Atlas completed with data_asset_master_registry and B01/B02/C02/HC07 forensic: missing observations (HC07 historical-only), not unused DB data. CENSUS_API_KEY/BLS_API_KEY NOT FOUND in RedDirt env though code expects them. Baseline expansion paused at 38/64 awaiting decision.",
  report: "reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md",
  data_asset_master_registry: "data/project/data_asset_master_registry.json",
  credentials: {
    CENSUS_API_KEY: credentialSummary.CENSUS_API_KEY.local_reddirt_env,
    BLS_API_KEY: credentialSummary.BLS_API_KEY.local_reddirt_env,
  },
  baseline: `${statusDoc.sourced_metrics}/${statusDoc.total_metrics}`,
  baseline_expansion_paused: true,
  decision_options: sliceQueue.decision_options_after_atlas,
  github_push: "pending",
});

console.log("Asset master count:", assets.length);
console.log("CENSUS_API_KEY:", credentialSummary.CENSUS_API_KEY.local_reddirt_env);
console.log("BLS_API_KEY:", credentialSummary.BLS_API_KEY.local_reddirt_env);
console.log("Slot verdict:", slotForensic.verdict);
console.log("Baseline paused at", `${statusDoc.sourced_metrics}/${statusDoc.total_metrics}`);
