# CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0

**Generated:** 2026-08-10  
**Mode:** Audit only — no schema changes, migrations, or new API clients.  
**Secret rule:** Env var names and presence only; values never printed or stored.

## Executive dashboard

| Area | What we know |
| --- | --- |
| Database tables (CC) | **0 live SQL tables.** 8 canonical JSON stores under `data/`. |
| Database tables (RedDirt) | **186 Prisma models** in Postgres/Supabase. |
| public_statistics schema | **Design target only** (9 foundational tables). **Not migrated.** |
| File warehouse (RedDirt) | Exists; **0 observations**; 2026-08-05 API pulls **BROKEN** (invalid keys). |
| Census datasets successfully ingested | **0** |
| Census datasets attempted | **8** ACS5 queries (US + AR) — all failed invalid key |
| BLS series successfully ingested | **0** |
| BLS series attempted | **4** (LAUS/CPS, AR LAUS, CPI, CES) — all failed invalid key |
| Other agencies | Manual CC provenance only (BEA, USDA, Fed, FEC bulk, HRSA/CDC sparse) |
| Baseline | **38/64** — **100% JSON/manual**, 0 DB-backed, 0 warehouse-backed |
| Research corpus | JSON-only (`data/research/*`, `research/phase_2/*`) |
| Knowledge graph | JSON-only |
| Duplicate ingestion issues | **4** flagged (see external registry) |
| Missing APIs | Census + BLS keys **not configured** despite architecture assuming them |
| Broken pipelines | RedDirt public-statistics spine; county census/bls adapters |

## Critical finding (process)

Configured government-data APIs were **not** available as working credentials:

- `CENSUS_API_KEY` — **absent** from RedDirt `.env` / `.env.local`
- `BLS_API_KEY` — **absent** from RedDirt `.env` / `.env.local`
- `API_DOT_GOV_KEY` — **present** in RedDirt `.env`, but warehouse/adapters do **not** treat it as Census/BLS registration
- CC repo — **no** Census/BLS keys (correct under bridge credential rules)

Raw warehouse evidence (2026-08-05):

- Census responses: HTML **Invalid Key** (rowCount 0)
- BLS responses: `The key:<YOUR_BLS_API_KEY> provided by the User is invalid`

So repeated CC file-download fights were **not** overlooking a working live Census client. They overlooked **architecture that exists but is unconfigured/broken**. The correct next ops step is: configure real keys in RedDirt, repair the spine, then consume exports — not invent a second CC statistics client.

## System rule (lock after this audit)

> For authoritative statistical agencies with configured API access, **API retrieval is the preferred baseline-ingestion method**. Static file retrieval is the fallback when the dataset is not API-accessible.
>
> Order: **API → official machine-readable file → official table/workbook → manual primary retrieval → secondary source only for corroboration, never silent substitution.**
>
> Before any future research script retrieves public statistics manually, it must first check `data/project/external_data_source_registry.json`.

## What tables exist?

### Constitutional Capitalism (this repo)

Live store = **JSON files**, validated by Ajv schemas. No SQL migrations.

Canonical stores include:

- `data/baseline/national_baseline_metrics.json`
- `data/baseline/baseline_status.json`
- `data/research/source_registry.json`
- `data/research/claim_ledger.json`
- `data/research/knowledge_graph.json`
- `data/project/public_statistics_bridge.json`
- `data/imports/reddirt-public-statistics/*` (stubs, 0 observations)

Research-pipeline table names in `research_pipeline/schemas/database_tables.json` are **registry-only** (no production DB).

### RedDirt (`H:\\SOSWebsite\\RedDirt`)

- **186 Prisma models** (campaign + civic ops). Most are **MUST_NOT_CROSS** the CC boundary.
- Public-stats-relevant: `CountyPublicDemographics` (Census/BLS fields intended; adapter **not implemented**).
- **File warehouse:** `data/public-statistics/warehouse/warehouse.json`
- **Design tables:** `public_statistics.{sources,datasets,series,observations,geographies,releases,ingestion_runs,revisions,metric_mappings}` — **not implemented in migrations**.

Full machine inventory: `data/project/database_table_registry.json`.

## Census / BLS audit (references found)

| Location | Role |
| --- | --- |
| RedDirt `countyIngestionAdapters.ts` | Checks `CENSUS_API_KEY` / `BLS_API_KEY`; returns deferred; **pull not implemented** |
| RedDirt `docs/intelligence/API_AND_FEED_KEY_INVENTORY.md` | Marks Census/BLS as **PLANNED** |
| RedDirt `data/public-statistics/*` | Attempted API pulls; invalid keys; 0 observations |
| CC `public_statistics_bridge.json` | Architecture contract; keys must stay in RedDirt |
| CC `scripts/validate-public-statistics-import.mjs` | Rejects credential field names in imports |
| CC baseline scripts | Manual agency URL/PDF/CSV fills — **active path today** |
| CC committed code | **No** `api.census.gov` / `api.bls.gov` client |

### Census datasets already being pulled (successfully)

**None.**

### Census datasets attempted (failed)

| dataset | endpoint | variables (safe) | geography | year | destination | result |
| --- | --- | --- | --- | --- | --- | --- |
| acs5 | `https://api.census.gov/data/2022/acs/acs5` | `NAME,B01003_001E,B01003_001M` | us:* | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5` | `NAME,B01003_001E,B01003_001M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5` | `NAME,B19013_001E,B19013_001M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5/subject` | `NAME,S1701_C03_001E,S1701_C03_001M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5` | `NAME,B15003_022E,B15003_022M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5/subject` | `NAME,S2301_C02_001E,S2301_C02_001M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5/profile` | `NAME,DP04_0046PE` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |
| acs5 | `https://api.census.gov/data/2022/acs/acs5/subject` | `NAME,S2801_C02_014E,S2801_C02_014M` | state:05 | 2022 | raw cache | FAILED_INVALID_KEY |

### BLS series already being pulled (successfully)

**None.**

### BLS series attempted (failed)

| dataset | series | geography | year | result |
| --- | --- | --- | --- | --- |
| laus_cps | `LNS14000000` | nation | 2024 | FAILED_INVALID_KEY |
| laus | `LASST050000000000003` | state:05 | 2024 | FAILED_INVALID_KEY |
| cpi | `CUUR0000SA0` | nation | 2024 | FAILED_INVALID_KEY |
| ces | `CES0500000003` | nation | 2024 | FAILED_INVALID_KEY |

## Actual vs ideal data flow

```text
IDEAL:
Agency API → RedDirt ingest → staging → public_statistics → export → CC import → baseline → claims → public site

ACTUAL (working):
Agency page/PDF/CSV → CC research script → national_baseline_metrics.json → static site

ACTUAL (broken spine):
Agency API → RedDirt warehouse raw (Invalid Key) → observations=[] → no export → CC stubs stay empty
```

## Duplication flags

1. **STATIC MANUAL VALUE WHERE API INGESTION ALREADY EXISTS** (architecture exists; keys/pulls broken)
2. **SAME AGENCY PULLED BY MULTIPLE CLIENTS** (adapters + warehouse + CC manual)
3. **JSON FILE + DATABASE HOLDING DIFFERENT VERSIONS** (CC scoreboard ≠ RedDirt DB/warehouse)
4. **SAME DATA IN MULTIPLE TABLES** (design observations vs warehouse vs baseline values)

## Artifacts

- `reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md` (this file)
- `data/project/database_table_registry.json`
- `data/project/external_data_source_registry.json`
- `data/project/data_flow_registry.json`

## Recommended next slices (after this audit)

1. **RedDirt ops (outside CC):** configure real `CENSUS_API_KEY` + `BLS_API_KEY` in RedDirt server env; re-run public-statistics spine; confirm observations > 0.
2. **RCIP export → CC import:** produce validated export; land in `data/imports/reddirt-public-statistics/`; map to baseline slots.
3. **Only then** retry B01/HC07: use API **if** the product is API-exposed; else official file fallback — still no secondary substitution.
4. Do **not** build a second Census/BLS client inside Constitutional Capitalism.

## Gate / honesty

- Phase 2 remains **PARTIAL**
- Baseline remains **38/64** (unchanged by this audit)
- Modeling / legal remain **0%**
- This slice does not move GATE-07
