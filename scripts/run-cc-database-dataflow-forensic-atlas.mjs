/**
 * CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0
 * Audit only. No schema changes. No migrations. No new API clients.
 * Never print secret values.
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
const wt = (rel, text) => {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
};

function envKeyPresence(envPath, names) {
  const out = {};
  for (const n of names) out[n] = { present: false, has_nonempty_value: false };
  if (!fs.existsSync(envPath)) return { file_exists: false, keys: out };
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const m = t.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$/);
    if (!m) continue;
    const name = m[1];
    if (!(name in out)) continue;
    out[name].present = true;
    out[name].has_nonempty_value = String(m[2] || "").trim().length > 0;
  }
  return { file_exists: true, keys: out };
}

const keyNames = [
  "CENSUS_API_KEY",
  "BLS_API_KEY",
  "API_DOT_GOV_KEY",
  "OPENFEC_API_KEY",
  "CONGRESS_GOV_API_KEY",
  "SOCRATA_APP_TOKEN",
  "GOOGLE_CIVIC_API_KEY",
  "DATABASE_URL",
  "DIRECT_URL",
];

const reddirtEnv = envKeyPresence(path.join(REDIRT, ".env"), keyNames);
const reddirtEnvLocal = envKeyPresence(path.join(REDIRT, ".env.local"), keyNames);
const reddirtEnvExample = envKeyPresence(path.join(REDIRT, ".env.example"), keyNames);
const ccEnv = envKeyPresence(r(".env"), keyNames);
const ccEnvExample = envKeyPresence(r(".env.example"), keyNames);

const prismaModels = JSON.parse(
  fs.readFileSync(r(".local/temp/reddirt_prisma_models.json"), "utf8")
);

const warehousePath = path.join(REDIRT, "data", "public-statistics", "warehouse", "warehouse.json");
const warehouse = fs.existsSync(warehousePath)
  ? JSON.parse(fs.readFileSync(warehousePath, "utf8"))
  : null;

const baselineStatus = JSON.parse(fs.readFileSync(r("data/baseline/baseline_status.json"), "utf8"));
const metricsDoc = JSON.parse(fs.readFileSync(r("data/baseline/national_baseline_metrics.json"), "utf8"));
const sourced = (metricsDoc.metrics || []).filter(
  (m) => m.counts_toward_baseline_scoreboard === true && m.status === "sourced"
);

function classifyRedDirtModel(name) {
  if (
    /Voter|Volunteer|Campaign|Communication|Email|SendGrid|Gmail|Calendar|Kelly|Opposition|Submission|Commitment|FieldUnit|Budget|Financial|Compliance|SocialContent|Conversation|OwnedMedia|Workflow|EventSignup|Audience|MessageStudio/.test(
      name
    )
  ) {
    return "LEGACY"; // campaign / ops canonical in RedDirt, forbidden for CC import
  }
  if (/CountyPublicDemographics|CountyStrategyKpi|County$|ElectionResult|CountyElectedOfficial|CountyRegistrationSnapshot|CountyCampaignStats|CountyVoterMetrics/.test(name)) {
    return "CANONICAL"; // public/civic aggregates that may later feed RCIP with governance
  }
  if (/Ingest|Snapshot|ExternalMedia|FestivalIngest/.test(name)) return "STAGING";
  if (/Analytics|PlatformMetric|SearchChunk/.test(name)) return "DERIVED";
  return "UNKNOWN";
}

const designPublicStatisticsTables = [
  "sources",
  "datasets",
  "series",
  "observations",
  "geographies",
  "releases",
  "ingestion_runs",
  "revisions",
  "metric_mappings",
].map((name) => ({
  table_name: name,
  database_schema: "public_statistics (design target)",
  system: "RedDirt-Postgres-design",
  created_by_migration: null,
  migration_file: null,
  purpose: "Isolated public-statistics warehouse for agency series/observations (CC-DEC-076 design).",
  primary_key: "design_pending",
  important_columns: ["id", "provenance fields — not migrated"],
  foreign_keys: [],
  indexes: [],
  row_count_if_safe: null,
  write_paths: ["NOT IMPLEMENTED — design only in public_statistics_bridge.json"],
  read_paths: ["approved views design: cc_baseline_observations, cc_geographic_profiles, cc_source_metadata, cc_release_status"],
  API_routes_or_functions_using_it: [],
  external_sources_feeding_it: ["Census", "BLS", "future agencies"],
  last_known_ingestion: null,
  status: "NOT_IMPLEMENTED",
  classification: "CANONICAL",
  ingestion_class: "NOT IMPLEMENTED",
}));

const ccLogicalStores = [
  {
    table_name: "national_baseline_metrics",
    database_schema: "filesystem:data/baseline",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Canonical baseline metric registry and scoreboard numerator source",
    primary_key: "metric_id",
    important_columns: [
      "metric_id",
      "definition",
      "current_value",
      "reference_year",
      "source_ids",
      "reproducible_retrieval",
      "baseline_completion_state",
      "counts_toward_baseline_scoreboard",
    ],
    foreign_keys: ["source_ids → source_registry.source_id"],
    indexes: [],
    row_count_if_safe: (metricsDoc.metrics || []).length,
    write_paths: [
      "scripts/run-phase21-baseline-*.mjs",
      "scripts/run-phase21-baseline-legitimate-slot-expansion-*.mjs",
    ],
    read_paths: [
      "apps/build-board/src/lib/data.ts",
      "scripts/validate-baseline-data.mjs",
      "scripts/validate-phase2-acceptance.mjs",
    ],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [
      "manual primary retrieval URLs in metric.reproducible_retrieval (not live API)",
    ],
    last_known_ingestion: TODAY,
    status: "ACTIVE",
    classification: "CANONICAL",
    ingestion_class: "MANUAL",
  },
  {
    table_name: "baseline_status",
    database_schema: "filesystem:data/baseline",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Scoreboard dial  sourced/total",
    primary_key: "singleton",
    important_columns: ["sourced_metrics", "total_metrics", "status"],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: 1,
    write_paths: ["scripts/run-phase21-baseline-*.mjs"],
    read_paths: ["scripts/validate-phase2-acceptance.mjs", "apps/build-board"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [],
    last_known_ingestion: TODAY,
    status: "ACTIVE",
    classification: "DERIVED",
    ingestion_class: "ACTIVE",
  },
  {
    table_name: "source_registry",
    database_schema: "filesystem:data/research",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Canonical research source ledger",
    primary_key: "source_id",
    important_columns: ["source_id", "url", "reliability", "primary_or_secondary"],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources.length,
    write_paths: ["scripts/run-phase21-*.mjs", "scripts/populate-phase2-sources-claims.mjs"],
    read_paths: ["scripts/validate-*.mjs", "apps/build-board"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: ["manual URL registration"],
    last_known_ingestion: TODAY,
    status: "ACTIVE",
    classification: "CANONICAL",
    ingestion_class: "MANUAL",
  },
  {
    table_name: "claim_ledger",
    database_schema: "filesystem:data/research",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Claim ↔ source fit ledger",
    primary_key: "claim_id",
    important_columns: ["claim_id", "source_ids", "evidence_fit"],
    foreign_keys: ["source_ids → source_registry"],
    indexes: [],
    row_count_if_safe: JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8")).claims?.length ?? null,
    write_paths: ["scripts/run-phase21-*.mjs"],
    read_paths: ["scripts/validate-*.mjs"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [],
    last_known_ingestion: TODAY,
    status: "ACTIVE",
    classification: "CANONICAL",
    ingestion_class: "MANUAL",
  },
  {
    table_name: "knowledge_graph",
    database_schema: "filesystem:data/research",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Research knowledge graph nodes/edges (JSON-only)",
    primary_key: "node/edge ids",
    important_columns: ["nodes", "edges"],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: null,
    write_paths: ["scripts/bootstrap-*.mjs", "research pipeline scripts"],
    read_paths: ["apps/build-board"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [],
    last_known_ingestion: null,
    status: "ACTIVE",
    classification: "DERIVED",
    ingestion_class: "PARTIAL",
  },
  {
    table_name: "public_statistics_bridge",
    database_schema: "filesystem:data/project",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Control-plane contract for RedDirt → CC public statistics",
    primary_key: "singleton",
    important_columns: ["architecture", "credential_rules", "reddirt_schema_design", "live_baseline_display"],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: 1,
    write_paths: ["scripts/run-phase21-baseline-*.mjs", "scripts/publicstats-*.mjs"],
    read_paths: ["scripts/validate-public-statistics-import.mjs"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [],
    last_known_ingestion: TODAY,
    status: "ACTIVE",
    classification: "CANONICAL",
    ingestion_class: "ACTIVE",
  },
  {
    table_name: "reddirt_public_statistics_import_stubs",
    database_schema: "filesystem:data/imports/reddirt-public-statistics",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: null,
    purpose: "Validated RedDirt export landing zone (currently architecture stubs, 0 observations)",
    primary_key: "export_id in manifest.json",
    important_columns: ["observation_count", "series_count", "boundary_attestation"],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: 0,
    write_paths: ["scripts/publicstats-import.mjs"],
    read_paths: ["scripts/validate-public-statistics-import.mjs"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: ["RedDirt approved export folder (empty/stub)"],
    last_known_ingestion: "2026-08-05 stub",
    status: "DORMANT",
    classification: "STAGING",
    ingestion_class: "DORMANT",
  },
  {
    table_name: "research_pipeline_schema_registry",
    database_schema: "filesystem:research_pipeline/schemas",
    system: "ConstitutionalCapitalism-JSON",
    created_by_migration: null,
    migration_file: "research_pipeline/schemas/database_tables.json",
    purpose: "Named research pipeline tables — schema registry only, no production DB",
    primary_key: "n/a",
    important_columns: [
      "research_documents",
      "research_sources",
      "research_claims",
      "research_citations",
      "research_topics",
      "research_reviews",
      "research_conflicts",
      "research_jobs",
      "research_ingest",
      "research_relationships",
    ],
    foreign_keys: [],
    indexes: [],
    row_count_if_safe: 0,
    write_paths: [],
    read_paths: ["research_pipeline docs"],
    API_routes_or_functions_using_it: [],
    external_sources_feeding_it: [],
    last_known_ingestion: null,
    status: "NOT_IMPLEMENTED",
    classification: "LEGACY",
    ingestion_class: "NOT IMPLEMENTED",
  },
];

const reddirtFileWarehouse = {
  table_name: "public_statistics_file_warehouse",
  database_schema: "filesystem:RedDirt/data/public-statistics/warehouse",
  system: "RedDirt-JSON-warehouse",
  created_by_migration: null,
  migration_file: null,
  purpose: "Operator file warehouse for RCIP public-statistics spine (not Postgres tables)",
  primary_key: "releaseId / queryId",
  important_columns: [
    "releases",
    "sourceQueries",
    "ingestionRuns",
    "observations",
    "sources",
    "datasets",
    "series",
  ],
  foreign_keys: [],
  indexes: [],
  row_count_if_safe: {
    releases: warehouse?.releases?.length ?? 0,
    sourceQueries: warehouse?.sourceQueries?.length ?? 0,
    observations: warehouse?.observations?.length ?? 0,
    sources: warehouse?.sources?.length ?? 0,
    datasets: warehouse?.datasets?.length ?? 0,
    series: warehouse?.series?.length ?? 0,
  },
  write_paths: [
    "RedDirt RCIP public-statistics runner (artifact present; package.json script name not registered)",
  ],
  read_paths: ["RedDirt data/public-statistics/reports/*"],
  API_routes_or_functions_using_it: [],
  external_sources_feeding_it: ["Census API", "BLS API"],
  last_known_ingestion: "2026-08-05 (FAILED — invalid keys; 0 observations)",
  status: "BROKEN",
  classification: "STAGING",
  ingestion_class: "BROKEN",
};

const reddirtPrismaTables = (prismaModels.models || []).map((name) => ({
  table_name: name,
  database_schema: "public (Prisma/Postgres/Supabase)",
  system: "RedDirt-Postgres",
  created_by_migration: "prisma/migrations/* (cumulative)",
  migration_file: "H:\\SOSWebsite\\RedDirt\\prisma\\schema.prisma",
  purpose:
    classifyRedDirtModel(name) === "LEGACY"
      ? "RedDirt campaign/ops table — FORBIDDEN for CC public-statistics import"
      : "RedDirt civic/county aggregate table — may relate to future RCIP exports under boundary rules",
  primary_key: "id (typical cuid)",
  important_columns: ["see prisma model"],
  foreign_keys: [],
  indexes: [],
  row_count_if_safe: null,
  write_paths: ["RedDirt Next.js app / netlify functions / scripts"],
  read_paths: ["RedDirt app"],
  API_routes_or_functions_using_it: [],
  external_sources_feeding_it:
    name === "CountyPublicDemographics" ? ["Census ACS (intended)", "BLS (intended)"] : [],
  last_known_ingestion: null,
  status: "ACTIVE_IN_REDIRT",
  classification: classifyRedDirtModel(name),
  ingestion_class:
    name === "CountyPublicDemographics" ? "NOT IMPLEMENTED" : "ACTIVE",
  cc_boundary:
    classifyRedDirtModel(name) === "LEGACY" ? "MUST_NOT_CROSS" : "GOVERNED_CANDIDATE",
}));

const tableRegistry = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  audit_only: true,
  systems: [
    {
      id: "ConstitutionalCapitalism-JSON",
      kind: "json_file_store",
      live_database: false,
      note: "No migrations, no CREATE TABLE, no Prisma/Supabase client in CC repo.",
    },
    {
      id: "RedDirt-Postgres",
      kind: "postgres_via_prisma",
      live_database: true,
      path: REDIRT,
      prisma_model_count: prismaModels.count,
      note: "Campaign platform DB. public_statistics schema design is NOT migrated as separate tables.",
    },
    {
      id: "RedDirt-JSON-warehouse",
      kind: "file_warehouse",
      live_database: false,
      path: path.join(REDIRT, "data", "public-statistics"),
      note: "RCIP spine file warehouse; 2026-08-05 API pulls returned invalid-key responses; observations=[].",
    },
  ],
  summary: {
    cc_logical_stores: ccLogicalStores.length,
    reddirt_prisma_models: prismaModels.count,
    public_statistics_design_tables: designPublicStatisticsTables.length,
    reddirt_file_warehouse_tables: 1,
    classifications: {
      CANONICAL: null,
      STAGING: null,
      CACHE: null,
      DERIVED: null,
      LEGACY: null,
      UNKNOWN: null,
    },
  },
  tables: [
    ...ccLogicalStores,
    reddirtFileWarehouse,
    ...designPublicStatisticsTables,
    ...reddirtPrismaTables,
  ],
};

// fill classification counts
const classCounts = {};
for (const t of tableRegistry.tables) {
  classCounts[t.classification] = (classCounts[t.classification] || 0) + 1;
}
tableRegistry.summary.classifications = classCounts;

const censusQueries = (warehouse?.sourceQueries || []).filter((q) => q.sourceId === "census");
const blsQueries = (warehouse?.sourceQueries || []).filter((q) => q.sourceId === "bls");

const externalRegistry = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  audit_only: true,
  credential_inventory: {
    note: "Names and presence only. Secret values never recorded.",
    constitutional_capitalism: {
      env_files_checked: [".env", ".env.example"],
      result: {
        ".env": ccEnv,
        ".env.example": ccEnvExample,
      },
      conclusion:
        "No CENSUS_API_KEY or BLS_API_KEY in CC. Bridge forbids copying RedDirt keys into CC.",
    },
    reddirt: {
      env_files_checked: [".env", ".env.local", ".env.example"],
      result: {
        ".env": reddirtEnv,
        ".env.local": reddirtEnvLocal,
        ".env.example": reddirtEnvExample,
      },
      conclusion:
        "CENSUS_API_KEY and BLS_API_KEY are NOT present in RedDirt .env / .env.local. API_DOT_GOV_KEY IS present (nonempty) but is not a substitute Census/BLS registration key. Docs mark Census/BLS as PLANNED.",
    },
  },
  system_rule_proposed:
    "For authoritative statistical agencies with configured API access, API retrieval should be the preferred baseline-ingestion method. Static file retrieval becomes the fallback when the required dataset is not API-accessible. Preferred order: API → official machine-readable file → official table/workbook → manual primary retrieval → secondary source only for corroboration, never silent substitution. Before any future research script retrieves public statistics manually, it must first check this Data Source Registry.",
  agencies: [
    {
      agency: "US Census Bureau",
      api_key_env: "CENSUS_API_KEY",
      key_configured_in_reddirt_env: reddirtEnv.keys.CENSUS_API_KEY?.present === true && reddirtEnv.keys.CENSUS_API_KEY?.has_nonempty_value === true,
      key_configured_in_cc_env: false,
      client_helper_files: [
        "H:\\SOSWebsite\\RedDirt\\src\\lib\\county-workbench\\factory\\ingestion\\countyIngestionAdapters.ts (censusAdapter — checks CENSUS_API_KEY; pull NOT IMPLEMENTED)",
        "H:\\SOSWebsite\\RedDirt\\data\\public-statistics\\warehouse\\warehouse.json (attempted ACS5 pulls 2026-08-05)",
      ],
      scheduled_or_manual: "manual/attempted spine run; not scheduled in package.json",
      tables_written: [
        "RedDirt file warehouse releases/sourceQueries (no observations)",
        "design: public_statistics.* (not migrated)",
        "CountyPublicDemographics (intended; adapter not implemented)",
      ],
      fields_stored: "none successfully — Invalid Key HTML body stored in raw cache",
      last_pull: "2026-08-05T03:42:39Z",
      coverage: "ATTEMPTED_FAILED",
      gaps: [
        "CENSUS_API_KEY missing from RedDirt env",
        "BDS / CPS voting products may not be on Census Data API even with key",
        "CC baseline fills for Census metrics are manual URL/file retrieval, not this warehouse",
      ],
      datasets_actually_attempted: censusQueries.map((q) => ({
        dataset: q.datasetId,
        endpoint: q.endpoint,
        variables: q.safeParams?.get || null,
        geography: q.safeParams?.for || null,
        year: q.safeParams?.year || null,
        frequency: "acs5_vintage",
        destination_table_or_file: q.rawResponseLocation,
        last_successful_pull: null,
        last_attempt_status: q.responseStatus,
        last_attempt_row_count: q.rowCount,
        result: "FAILED_INVALID_KEY",
      })),
      datasets_successfully_ingested: [],
    },
    {
      agency: "Bureau of Labor Statistics",
      api_key_env: "BLS_API_KEY",
      key_configured_in_reddirt_env: false,
      key_configured_in_cc_env: false,
      client_helper_files: [
        "H:\\SOSWebsite\\RedDirt\\src\\lib\\county-workbench\\factory\\ingestion\\countyIngestionAdapters.ts (blsAdapter — checks BLS_API_KEY; pull NOT IMPLEMENTED)",
        "H:\\SOSWebsite\\RedDirt\\data\\public-statistics\\warehouse\\warehouse.json",
      ],
      scheduled_or_manual: "manual/attempted spine run",
      tables_written: ["file warehouse only; 0 observations"],
      fields_stored: "none — REQUEST_NOT_PROCESSED invalid key placeholder",
      last_pull: "2026-08-05T03:42:41Z",
      coverage: "ATTEMPTED_FAILED",
      gaps: [
        "BLS_API_KEY missing from RedDirt env (warehouse used placeholder YOUR_BLS_API_KEY)",
        "CC baseline BLS values (JOLTS, CPS earnings pages, etc.) are manual HTML/table retrieval",
      ],
      datasets_actually_attempted: blsQueries.map((q) => ({
        dataset: q.datasetId,
        endpoint: q.endpoint,
        variables: q.safeParams?.seriesid || null,
        geography: q.safeParams?.geography || null,
        year: q.safeParams?.startyear || null,
        frequency: "annual_or_series_native",
        destination_table_or_file: q.rawResponseLocation,
        last_successful_pull: null,
        last_attempt_status: q.responseStatus,
        last_attempt_row_count: q.rowCount,
        result: "FAILED_INVALID_KEY",
      })),
      datasets_successfully_ingested: [],
    },
    {
      agency: "api.data.gov (generic)",
      api_key_env: "API_DOT_GOV_KEY",
      key_configured_in_reddirt_env: reddirtEnv.keys.API_DOT_GOV_KEY?.has_nonempty_value === true,
      key_configured_in_cc_env: false,
      client_helper_files: ["RedDirt .env (present); not wired as Census/BLS client in audited adapters"],
      scheduled_or_manual: "unknown",
      tables_written: [],
      fields_stored: null,
      last_pull: null,
      coverage: "KEY_PRESENT_USAGE_UNCLEAR_FOR_CENSUS_BLS",
      gaps: [
        "Must not be assumed to satisfy Census Data API or BLS registrationkey requirements",
      ],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
    {
      agency: "BEA",
      api_key_env: null,
      key_configured_in_reddirt_env: false,
      key_configured_in_cc_env: false,
      client_helper_files: [],
      scheduled_or_manual: "manual URL provenance in CC source_registry",
      tables_written: ["CC source_registry / baseline metrics (manual)"],
      coverage: "MANUAL_ONLY_IN_CC",
      gaps: ["No BEA API client in CC or audited RedDirt public-statistics path"],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
    {
      agency: "USDA / FSA / FSIS / NASS",
      api_key_env: null,
      key_configured_in_reddirt_env: false,
      key_configured_in_cc_env: false,
      client_helper_files: [
        "CC scripts/run-phase21-*ag*.mjs",
        "CC research/phase_2 source_snapshots FSIS CSV",
      ],
      scheduled_or_manual: "manual / local CSV snapshot",
      tables_written: ["CC research JSON / baseline E02 FSA figure"],
      coverage: "MANUAL_PARTIAL",
      gaps: ["No live USDA API connector in CC"],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
    {
      agency: "Federal Reserve (SBCS / FRED)",
      api_key_env: null,
      key_configured_in_reddirt_env: false,
      key_configured_in_cc_env: false,
      client_helper_files: [],
      scheduled_or_manual: "manual PDF/primary page retrieval in CC baseline scripts",
      tables_written: ["CC baseline metrics (e.g., E02 SBCS, wealth SCF/FRED series)"],
      coverage: "MANUAL_PARTIAL",
      gaps: ["No Fed API client in CC"],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
    {
      agency: "FEC",
      api_key_env: "OPENFEC_API_KEY",
      key_configured_in_reddirt_env: reddirtEnv.keys.OPENFEC_API_KEY?.has_nonempty_value === true,
      key_configured_in_cc_env: false,
      client_helper_files: ["CC used FEC bulk weball zip download for D04 — not OpenFEC API"],
      scheduled_or_manual: "manual bulk file in CC",
      tables_written: ["CC baseline D04"],
      coverage: "MANUAL_FILE_IN_CC_KEY_PRESENT_IN_REDIRT",
      gaps: ["RedDirt OpenFEC key not used by CC baseline pipeline"],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
    {
      agency: "HRSA / CDC / NCES / EAC / Arkansas agencies",
      api_key_env: null,
      key_configured_in_reddirt_env: false,
      key_configured_in_cc_env: false,
      client_helper_files: [],
      scheduled_or_manual: "manual primary pages in CC where used",
      tables_written: ["selected CC baseline / research modules"],
      coverage: "MANUAL_SPARSE",
      gaps: ["No dedicated connectors"],
      datasets_actually_attempted: [],
      datasets_successfully_ingested: [],
    },
  ],
  duplication_flags: [
    {
      kind: "STATIC MANUAL VALUE WHERE API INGESTION ALREADY EXISTS",
      detail:
        "CC baseline contains many Census/BLS-sourced metrics entered manually, while RedDirt has public-statistics warehouse + county adapters that intend API ingestion — but keys are missing and adapters/warehouse pulls are broken/unimplemented.",
      severity: "high",
    },
    {
      kind: "SAME AGENCY PULLED BY MULTIPLE CLIENTS",
      detail:
        "Census referenced by (1) RedDirt countyIngestionAdapters censusAdapter, (2) RedDirt public-statistics warehouse runner, (3) CC manual baseline scripts. None currently deliver successful live observations into CC scoreboard via DB.",
      severity: "high",
    },
    {
      kind: "JSON FILE + DATABASE HOLDING DIFFERENT VERSIONS",
      detail:
        "CC national_baseline_metrics.json is the live scoreboard. RedDirt Postgres CountyPublicDemographics and file warehouse are separate and not synchronized to CC. Import stubs remain observation_count=0.",
      severity: "high",
    },
    {
      kind: "SAME DATA IN MULTIPLE TABLES",
      detail:
        "Design public_statistics.observations vs file warehouse observations vs CC baseline current_value — three potential homes; only CC baseline currently has values.",
      severity: "medium",
    },
  ],
};

const dataFlowRegistry = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  ideal_flow: [
    "Agency API",
    "ingestion script (RedDirt)",
    "raw/staging (RedDirt raw/ + public_statistics)",
    "normalized statistical table",
    "approved export",
    "CC import stubs",
    "baseline metric",
    "claim / proof packet",
    "book/public surface",
  ],
  actual_flows: [
    {
      id: "FLOW-CC-MANUAL-BASELINE",
      status: "ACTIVE",
      path: [
        "Agency website / PDF / CSV (manual)",
        "CC phase21 baseline script hardcodes observation",
        "data/baseline/national_baseline_metrics.json",
        "source_registry entry",
        "build-board / book-site static JSON import",
      ],
      feeds_baseline_slots: sourced.length,
      note: "Current reality for nearly all of 38/64.",
    },
    {
      id: "FLOW-REDIRT-PUBLICSTATS-SPINE",
      status: "BROKEN",
      path: [
        "Census/BLS API",
        "RedDirt public-statistics runner (2026-08-05)",
        "data/public-statistics/raw/* (invalid-key bodies)",
        "warehouse.json releases/sourceQueries (rowCount=0)",
        "observations=[] — STOP",
        "(export to CC never produced)",
      ],
      feeds_baseline_slots: 0,
      blocker: "CENSUS_API_KEY / BLS_API_KEY not configured; raw responses show Invalid Key",
    },
    {
      id: "FLOW-REDIRT-COUNTY-ADAPTERS",
      status: "NOT_IMPLEMENTED",
      path: [
        "CENSUS_API_KEY / BLS_API_KEY env check",
        "countyIngestionAdapters censusAdapter/blsAdapter",
        "CountyPublicDemographics (intended)",
        "STOP — pull not implemented; key not configured",
      ],
      feeds_baseline_slots: 0,
    },
    {
      id: "FLOW-CC-PUBLICSTATS-IMPORT",
      status: "DORMANT",
      path: [
        "RedDirt approved export folder",
        "pnpm publicstats:import",
        "data/imports/reddirt-public-statistics/*",
        "validators",
        "STOP — stubs only, observation_count=0; does not update 38/64 scoreboard",
      ],
      feeds_baseline_slots: 0,
    },
    {
      id: "FLOW-RESEARCH-CORPUS-JSON",
      status: "ACTIVE",
      path: [
        "manual research",
        "data/research/*.json + research/phase_2/*",
        "claim_ledger / knowledge_graph",
        "proof packets / reports",
      ],
      db_backed: false,
    },
  ],
  baseline_backing: {
    scoreboard: baselineStatus.before_after?.after_display || `${baselineStatus.sourced_metrics}/${baselineStatus.total_metrics}`,
    db_backed_slots: 0,
    file_manual_slots: sourced.length,
    reddirt_warehouse_backed_slots: 0,
  },
  hard_rule_after_audit:
    "Before any future research script retrieves public statistics manually, it must first check data/project/external_data_source_registry.json to determine whether an existing API client, database table, or cached canonical dataset already provides the data.",
};

wj("data/project/database_table_registry.json", tableRegistry);
wj("data/project/external_data_source_registry.json", externalRegistry);
wj("data/project/data_flow_registry.json", dataFlowRegistry);

const md = `# CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0

**Generated:** ${TODAY}  
**Mode:** Audit only — no schema changes, migrations, or new API clients.  
**Secret rule:** Env var names and presence only; values never printed or stored.

## Executive dashboard

| Area | What we know |
| --- | --- |
| Database tables (CC) | **0 live SQL tables.** ${ccLogicalStores.length} canonical JSON stores under \`data/\`. |
| Database tables (RedDirt) | **${prismaModels.count} Prisma models** in Postgres/Supabase. |
| public_statistics schema | **Design target only** (9 foundational tables). **Not migrated.** |
| File warehouse (RedDirt) | Exists; **0 observations**; 2026-08-05 API pulls **BROKEN** (invalid keys). |
| Census datasets successfully ingested | **0** |
| Census datasets attempted | **${censusQueries.length}** ACS5 queries (US + AR) — all failed invalid key |
| BLS series successfully ingested | **0** |
| BLS series attempted | **${blsQueries.length}** (LAUS/CPS, AR LAUS, CPI, CES) — all failed invalid key |
| Other agencies | Manual CC provenance only (BEA, USDA, Fed, FEC bulk, HRSA/CDC sparse) |
| Baseline | **${baselineStatus.sourced_metrics}/${baselineStatus.total_metrics}** — **100% JSON/manual**, 0 DB-backed, 0 warehouse-backed |
| Research corpus | JSON-only (\`data/research/*\`, \`research/phase_2/*\`) |
| Knowledge graph | JSON-only |
| Duplicate ingestion issues | **4** flagged (see external registry) |
| Missing APIs | Census + BLS keys **not configured** despite architecture assuming them |
| Broken pipelines | RedDirt public-statistics spine; county census/bls adapters |

## Critical finding (process)

Configured government-data APIs were **not** available as working credentials:

- \`CENSUS_API_KEY\` — **absent** from RedDirt \`.env\` / \`.env.local\`
- \`BLS_API_KEY\` — **absent** from RedDirt \`.env\` / \`.env.local\`
- \`API_DOT_GOV_KEY\` — **present** in RedDirt \`.env\`, but warehouse/adapters do **not** treat it as Census/BLS registration
- CC repo — **no** Census/BLS keys (correct under bridge credential rules)

Raw warehouse evidence (2026-08-05):

- Census responses: HTML **Invalid Key** (rowCount 0)
- BLS responses: \`The key:<YOUR_BLS_API_KEY> provided by the User is invalid\`

So repeated CC file-download fights were **not** overlooking a working live Census client. They overlooked **architecture that exists but is unconfigured/broken**. The correct next ops step is: configure real keys in RedDirt, repair the spine, then consume exports — not invent a second CC statistics client.

## System rule (lock after this audit)

> For authoritative statistical agencies with configured API access, **API retrieval is the preferred baseline-ingestion method**. Static file retrieval is the fallback when the dataset is not API-accessible.
>
> Order: **API → official machine-readable file → official table/workbook → manual primary retrieval → secondary source only for corroboration, never silent substitution.**
>
> Before any future research script retrieves public statistics manually, it must first check \`data/project/external_data_source_registry.json\`.

## What tables exist?

### Constitutional Capitalism (this repo)

Live store = **JSON files**, validated by Ajv schemas. No SQL migrations.

Canonical stores include:

- \`data/baseline/national_baseline_metrics.json\`
- \`data/baseline/baseline_status.json\`
- \`data/research/source_registry.json\`
- \`data/research/claim_ledger.json\`
- \`data/research/knowledge_graph.json\`
- \`data/project/public_statistics_bridge.json\`
- \`data/imports/reddirt-public-statistics/*\` (stubs, 0 observations)

Research-pipeline table names in \`research_pipeline/schemas/database_tables.json\` are **registry-only** (no production DB).

### RedDirt (\`H:\\\\SOSWebsite\\\\RedDirt\`)

- **${prismaModels.count} Prisma models** (campaign + civic ops). Most are **MUST_NOT_CROSS** the CC boundary.
- Public-stats-relevant: \`CountyPublicDemographics\` (Census/BLS fields intended; adapter **not implemented**).
- **File warehouse:** \`data/public-statistics/warehouse/warehouse.json\`
- **Design tables:** \`public_statistics.{sources,datasets,series,observations,geographies,releases,ingestion_runs,revisions,metric_mappings}\` — **not implemented in migrations**.

Full machine inventory: \`data/project/database_table_registry.json\`.

## Census / BLS audit (references found)

| Location | Role |
| --- | --- |
| RedDirt \`countyIngestionAdapters.ts\` | Checks \`CENSUS_API_KEY\` / \`BLS_API_KEY\`; returns deferred; **pull not implemented** |
| RedDirt \`docs/intelligence/API_AND_FEED_KEY_INVENTORY.md\` | Marks Census/BLS as **PLANNED** |
| RedDirt \`data/public-statistics/*\` | Attempted API pulls; invalid keys; 0 observations |
| CC \`public_statistics_bridge.json\` | Architecture contract; keys must stay in RedDirt |
| CC \`scripts/validate-public-statistics-import.mjs\` | Rejects credential field names in imports |
| CC baseline scripts | Manual agency URL/PDF/CSV fills — **active path today** |
| CC committed code | **No** \`api.census.gov\` / \`api.bls.gov\` client |

### Census datasets already being pulled (successfully)

**None.**

### Census datasets attempted (failed)

| dataset | endpoint | variables (safe) | geography | year | destination | result |
| --- | --- | --- | --- | --- | --- | --- |
${censusQueries
  .map(
    (q) =>
      `| ${q.datasetId} | \`${q.endpoint}\` | \`${q.safeParams?.get || ""}\` | ${q.safeParams?.for || ""} | ${q.safeParams?.year || ""} | raw cache | FAILED_INVALID_KEY |`
  )
  .join("\n")}

### BLS series already being pulled (successfully)

**None.**

### BLS series attempted (failed)

| dataset | series | geography | year | result |
| --- | --- | --- | --- | --- |
${blsQueries
  .map(
    (q) =>
      `| ${q.datasetId} | \`${q.safeParams?.seriesid || ""}\` | ${q.safeParams?.geography || ""} | ${q.safeParams?.startyear || ""} | FAILED_INVALID_KEY |`
  )
  .join("\n")}

## Actual vs ideal data flow

\`\`\`text
IDEAL:
Agency API → RedDirt ingest → staging → public_statistics → export → CC import → baseline → claims → public site

ACTUAL (working):
Agency page/PDF/CSV → CC research script → national_baseline_metrics.json → static site

ACTUAL (broken spine):
Agency API → RedDirt warehouse raw (Invalid Key) → observations=[] → no export → CC stubs stay empty
\`\`\`

## Duplication flags

1. **STATIC MANUAL VALUE WHERE API INGESTION ALREADY EXISTS** (architecture exists; keys/pulls broken)
2. **SAME AGENCY PULLED BY MULTIPLE CLIENTS** (adapters + warehouse + CC manual)
3. **JSON FILE + DATABASE HOLDING DIFFERENT VERSIONS** (CC scoreboard ≠ RedDirt DB/warehouse)
4. **SAME DATA IN MULTIPLE TABLES** (design observations vs warehouse vs baseline values)

## Artifacts

- \`reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md\` (this file)
- \`data/project/database_table_registry.json\`
- \`data/project/external_data_source_registry.json\`
- \`data/project/data_flow_registry.json\`

## Recommended next slices (after this audit)

1. **RedDirt ops (outside CC):** configure real \`CENSUS_API_KEY\` + \`BLS_API_KEY\` in RedDirt server env; re-run public-statistics spine; confirm observations > 0.
2. **RCIP export → CC import:** produce validated export; land in \`data/imports/reddirt-public-statistics/\`; map to baseline slots.
3. **Only then** retry B01/HC07: use API **if** the product is API-exposed; else official file fallback — still no secondary substitution.
4. Do **not** build a second Census/BLS client inside Constitutional Capitalism.

## Gate / honesty

- Phase 2 remains **PARTIAL**
- Baseline remains **${baselineStatus.sourced_metrics}/${baselineStatus.total_metrics}** (unchanged by this audit)
- Modeling / legal remain **0%**
- This slice does not move GATE-07
`;

wt("reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md", md);

// Light project pointers
const bridge = JSON.parse(fs.readFileSync(r("data/project/public_statistics_bridge.json"), "utf8"));
bridge.dataflow_atlas = {
  slice_id: SLICE,
  generated_at: TODAY,
  report: "reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md",
  registries: [
    "data/project/database_table_registry.json",
    "data/project/external_data_source_registry.json",
    "data/project/data_flow_registry.json",
  ],
  finding:
    "Census/BLS API keys not configured in RedDirt env; warehouse pulls failed invalid key; CC baseline remains manual JSON.",
};
bridge.last_updated = TODAY;
wj("data/project/public_statistics_bridge.json", bridge);

const methodology = JSON.parse(fs.readFileSync(r("data/baseline/baseline_methodology.json"), "utf8"));
methodology.preferred_ingestion_order = [
  "agency_api_with_configured_key",
  "official_machine_readable_file",
  "official_table_or_workbook",
  "manual_primary_retrieval",
  "secondary_source_corroboration_only_never_silent_substitution",
];
methodology.data_source_registry_check_required_before_manual_retrieval =
  "data/project/external_data_source_registry.json";
methodology.dataflow_atlas_slice = SLICE;
methodology.last_updated = TODAY;
wj("data/baseline/baseline_methodology.json", methodology);

const build = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
build.last_updated = TODAY;
build.mission_id = SLICE;
build.slice_return = "reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md";
build.active_slice = "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0";
build.last_completed_slice = SLICE;
build.notes = [
  `${SLICE}: audit-only atlas shipped; Census/BLS keys absent in RedDirt env; warehouse broken; no new API client in CC.`,
];
wj("data/project/current_build_state.json", build);

const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const sliceRec = {
  slice_id: SLICE,
  title: "Database & Data-Flow Forensic Atlas",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md",
    "database_table_registry.json",
    "external_data_source_registry.json",
    "data_flow_registry.json",
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0",
  note: "Configure RedDirt CENSUS_API_KEY/BLS_API_KEY outside CC before relying on API ingestion.",
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
wj("data/project/slice_queue.json", sliceQueue);

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "COMPLETE_AUDIT_ONLY",
  updated_at: TODAY,
  summary:
    "Forensic atlas: CC is JSON-only; RedDirt has 186 Prisma tables but public_statistics DB schema not migrated; CENSUS_API_KEY/BLS_API_KEY absent; warehouse API pulls failed invalid key; baseline 38/64 remains manual.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  github_push: "pending",
  report: "reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md",
  registries: [
    "data/project/database_table_registry.json",
    "data/project/external_data_source_registry.json",
    "data/project/data_flow_registry.json",
  ],
  baseline_unchanged: `${baselineStatus.sourced_metrics}/${baselineStatus.total_metrics}`,
  recommended_next:
    "Configure RedDirt Census/BLS keys and repair spine before more manual CC retrieval; then definition locks / API-first fills where exposed.",
});

console.log(SLICE);
console.log("CC logical stores:", ccLogicalStores.length);
console.log("RedDirt prisma models:", prismaModels.count);
console.log("Census attempted:", censusQueries.length, "success: 0");
console.log("BLS attempted:", blsQueries.length, "success: 0");
console.log(
  "CENSUS_API_KEY in RedDirt .env:",
  reddirtEnv.keys.CENSUS_API_KEY
);
console.log("BLS_API_KEY in RedDirt .env:", reddirtEnv.keys.BLS_API_KEY);
console.log(
  "API_DOT_GOV_KEY in RedDirt .env present nonempty:",
  reddirtEnv.keys.API_DOT_GOV_KEY?.has_nonempty_value
);
