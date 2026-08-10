# Public Statistics End-to-End Lineage Proof 1.0

**Slice:** `CC-PUBLIC-STATISTICS-IMPORT-AND-BASELINE-MAPPING-1.0`  
**Export:** `exp_b8877b6dc05b4217`  
**Date:** 2026-08-10  
**Milestone:** Live agency data moves through RedDirt into CC with provenance and zero credentials.

## Success criterion

> At least one Census and one BLS observation move cleanly from live agency API → RedDirt ingest → validated export → CC import → defensible baseline mapping with full provenance and zero credentials crossing the boundary.

**Result: MET** (mapping is defensible even where status is SUPPORTING_SERIES_ONLY / NO_CURRENT_BASELINE_SLOT — no unsafe promotion).

---

## Census chain (example)

| Stage | Artifact |
|---|---|
| Agency endpoint | `https://api.census.gov/data/2022/acs/acs5` (`get=NAME,B01003_001E,...`, `for=us:*`) |
| RedDirt connector | `src/lib/civic-intelligence/connectors/census` (RCIP worktree) |
| Ingestion run | `run_a81ac69cbb444a91` |
| Source query | `qry_981f01a9c3d54d49` |
| Observation | `obs_90e79e2a2b334c0b` — US ACS5 total population **331097593** (2022) |
| Export | `exp_b8877b6dc05b4217` / `national-baseline.json` (`CC-BASELINE-POP-001`) |
| CC import | `data/imports/reddirt-public-statistics/national-baseline.json` |
| Baseline mapping | `NO_CURRENT_BASELINE_SLOT` — absolute ACS5 pop is not a scoreboard cell |
| Credentials in CC | **none** |

## BLS chain (example)

| Stage | Artifact |
|---|---|
| Agency endpoint | `https://api.bls.gov/publicAPI/v2/timeseries/data/` series `CES0500000003` |
| RedDirt connector | `src/lib/civic-intelligence/connectors/bls` |
| Ingestion run | `run_c86e497b5b904990` |
| Source query | `qry_81aa6427aba34d02` |
| Observation | `obs_1d8ddebc745249eb` — US CES avg hourly earnings **35.69** (2024-M12) |
| Export | `exp_b8877b6dc05b4217` / `national-baseline.json` (`CC-BASELINE-EARN-001`) |
| CC import | `data/imports/reddirt-public-statistics/national-baseline.json` |
| Baseline mapping | `SUPPORTING_SERIES_ONLY` for `CC-IND-L01` (nominal level ≠ real YoY % change) |
| Manual L01 left untouched | **1.1%** real AHE YoY (`CC-SRC-219`) |
| Credentials in CC | **none** |

## Package attestation

| Check | Value |
|---|---|
| export_id | `exp_b8877b6dc05b4217` |
| privacy_clean | true |
| total_observations | 12 |
| census_observations | 8 |
| bls_observations | 4 |
| CC key names present | none (`CENSUS_API_KEY` / `BLS_API_KEY` / `API_DOT_GOV_KEY` absent from import tree) |

## Institutional meaning

The research system can now consume authoritative public statistics through RedDirt without becoming a credential holder, without a second Census/BLS client, and without pretending that every ingested series is a baseline completion.
