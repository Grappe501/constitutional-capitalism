# REDDIRT-PUBLIC-STATISTICS-CREDENTIAL-REPAIR-AND-LIVE-INGEST-PROOF-1.0 — Status

**Slice ID:** `REDDIRT-PUBLIC-STATISTICS-CREDENTIAL-REPAIR-AND-LIVE-INGEST-PROOF-1.0`  
**Status:** `PASSED`  
**Date:** 2026-08-10  
**Predecessor:** `CC-DATABASE-DATAFLOW-FORENSIC-ATLAS-1.0`  
**Successor (next):** `CC-PUBLIC-STATISTICS-IMPORT-AND-BASELINE-MAPPING-1.0`

## Acceptance test

> Real Census/BLS credentials configured → at least one successful Census dataset and one successful BLS series ingested → observations > 0 → provenance recorded → no secrets committed → validated export produced for CC.

| Gate | Result |
|---|---|
| `CENSUS_API_KEY` configured | CONFIGURED (len 40; values never printed) |
| `BLS_API_KEY` configured | CONFIGURED (len 32; values never printed) |
| Census ingest | **succeeded** — `run_a81ac69cbb444a91` — 8 inserted / 0 rejected |
| BLS ingest | **succeeded** — `run_c86e497b5b904990` — 4 inserted / 0 rejected |
| Observations | **12** |
| Validate | `ok: true` |
| Export | `exp_b8877b6dc05b4217` — privacyOk true — 12 observations |
| Secrets in export | No API key material found in export scan |

## Engine workspace

| Item | Value |
|---|---|
| Worktree | `H:\SOSWebsite\RedDirt-rcip-public-statistics` |
| Branch | `fix/rcip-public-statistics-credential-repair-1.0` |
| Spine base | `4a8eaca4` |
| Export path | `H:\SOSWebsite\RedDirt-rcip-public-statistics\exports\constitutional-capitalism\exp_b8877b6dc05b4217` |
| Warehouse | file warehouse (DB migration still not applied; not required for this proof) |

## Bug fixed during slice

Parent shells (including Cursor) injected angle-bracket placeholders into `process.env` for `CENSUS_API_KEY` / `BLS_API_KEY`. `loadPublicdataEnv` previously refused to overwrite any set value, so operator `.env` was ignored.

**Fix:** for those two names only, replace unusable parent placeholders with usable file values (`src/lib/civic-intelligence/env/loadPublicdataEnv.ts`).

## Locked sequence remaining

1. ~~Repair RedDirt public-statistics spine / credentials~~ **DONE**
2. ~~Prove observations > 0~~ **DONE**
3. ~~Validated RedDirt → CC export~~ **DONE** (artifact generated; not yet imported into CC)
4. **Next:** map export → baseline IDs via `CC-PUBLIC-STATISTICS-IMPORT-AND-BASELINE-MAPPING-1.0`
5. Only then retry B01 / B02 / C02 / HC07

## Architecture reminder

CC remains JSON-backed research consumer. RedDirt holds credentials and ingestion. Do not create a Census/BLS client in CC. Do not migrate CC into SQL because RedDirt has a database.
