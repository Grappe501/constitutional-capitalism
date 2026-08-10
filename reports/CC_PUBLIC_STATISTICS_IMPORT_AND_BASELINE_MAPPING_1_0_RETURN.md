# CC-PUBLIC-STATISTICS-IMPORT-AND-BASELINE-MAPPING-1.0 — Return

**Status:** PASSED  
**Date:** 2026-08-10  
**Export:** `exp_b8877b6dc05b4217`

## 1. Executive Summary

The bridge works. Twelve live agency observations (8 Census ACS5, 4 BLS) imported into CC with full provenance and zero credentials. Definition-faithful mapping produced **0 DIRECT MATCH** promotions; baseline remains **38/64**. Success was institutional, not scoreboard inflation.

## 2. Export Validation

| Check | Result |
|---|---|
| export_id | `exp_b8877b6dc05b4217` |
| privacy_clean | true (`privacy_scan: passed`) |
| total_observations | 12 |
| census_observations | 8 |
| bls_observations | 4 |
| datasets | acs5, laus_cps, laus, cpi, ces |
| integrity note | Manifest checksum repaired to match on-disk payload after privacy_scan mutation (generator bug fixed in RCIP `ccExport.ts`) |

## 3. Import Path

```text
pnpm publicstats:import --from H:\SOSWebsite\RedDirt-rcip-public-statistics\exports\constitutional-capitalism\exp_b8877b6dc05b4217
→ data/imports/reddirt-public-statistics/
```

Canonical lane reused. No parallel import directory invented.

## 4. 12-Observation Mapping Table

| observation_id | agency | series | geo | period | value | candidate | mapping_status |
|---|---|---|---|---|---|---|---|
| obs_90e79e2a2b334c0b | Census | B01003_001E | US | 2022 | 331097593 | — | NO_CURRENT_BASELINE_SLOT |
| obs_f737d6b98a074e99 | Census | B01003_001E | AR | 2022 | 3018669 | — | NO_CURRENT_BASELINE_SLOT |
| obs_b78cbdfcb0fd4c62 | Census | B19013_001E | AR | 2022 | 56335 | — | NO_CURRENT_BASELINE_SLOT |
| obs_1d476390a033471b | Census | S1701_C03_001E | AR | 2022 | 16.2 | F03 (non-fit) | NO_CURRENT_BASELINE_SLOT |
| obs_2716055bf6694c61 | Census | B15003_022E | AR | 2022 | 317437 | HC01 (rejected) | NO_CURRENT_BASELINE_SLOT |
| obs_347ef01d1ed34958 | Census | S2301_C02_001E | AR | 2022 | 58.2 | — | NO_CURRENT_BASELINE_SLOT |
| obs_567d60a45fcb4c04 | Census | DP04_0046PE | AR | 2022 | 66.2 | W04 | SUPPORTING_SERIES_ONLY |
| obs_4544088e19bb44cc | Census | S2801_C02_014E | AR | 2022 | 82.4 | — | NO_CURRENT_BASELINE_SLOT |
| obs_f42ac1e52eea4fe8 | BLS | LNS14000000 | US | 2024-M12 | 4.1 | — | NO_CURRENT_BASELINE_SLOT |
| obs_bb2fecb63a194a44 | BLS | LASST050000000000003 | AR | 2024-M12 | 3.7 | — | NO_CURRENT_BASELINE_SLOT |
| obs_d74c9ec9f23c4db9 | BLS | CUUR0000SA0 | US | 2024-M12 | 315.605 | L01 | SUPPORTING_SERIES_ONLY |
| obs_1d8ddebc745249eb | BLS | CES0500000003 | US | 2024-M12 | 35.69 | L01 | SUPPORTING_SERIES_ONLY |

Full record: `data/imports/reddirt-public-statistics/baseline-observation-mapping.json`.

## 5. Baseline Matches

| Status | Count |
|---|---|
| DIRECT MATCH | 0 |
| POTENTIAL MATCH — DEFINITION REVIEW REQUIRED | 0 |
| SUPPORTING SERIES ONLY | 3 |
| NO CURRENT BASELINE SLOT | 9 |

## 6. Manual-vs-Imported Comparisons

| Slot | Result | Notes |
|---|---|---|
| W04 | NOT COMPARABLE | AR ACS5 DP04 66.2 vs US ACS1 65.2 — left untouched |
| L01 | NOT COMPARABLE | Import = nominal CES/CPI levels; slot = real AHE YoY % |
| F03 | NOT COMPARABLE | AR ACS all-ages poverty ≠ national CPS child poverty |

No silent replacements.

## 7. New Baseline Completions

**0.** No slot met exact definition + geography + period + transformation standards.

## 8. B01/B02/C02/HC07 Status

| ID | Status |
|---|---|
| B01 | UNRESOLVED — no BDS in export |
| B02 | UNRESOLVED — no BDS in export |
| C02 | UNRESOLVED — no BDS in export |
| HC07 | UNRESOLVED — `laus_cps` unemployment ≠ CPS voting |

## 9. Credential-Separation Proof

CC import package contains:

- no `CENSUS_API_KEY`
- no `BLS_API_KEY`
- no `API_DOT_GOV_KEY`
- no credential field values

Attestation: `boundary_attestation.contains_api_keys = false`. Enforced in `scripts/validate-public-statistics-import.mjs`.

## 10. Public Statistics Bridge Status

| Stage | Status |
|---|---|
| credential configuration | passed_in_reddirt_only |
| live ingest | passed_12_observations |
| validated export | passed_exp_b8877b6dc05b4217_privacy_clean |
| CC import | passed |
| baseline mapping | completed_zero_direct_match_promotions |

Live paths recorded:

```text
Census API → RedDirt → CC
BLS API → RedDirt → CC
```

## 11. Baseline Before → After

```text
Baseline before: 38/64
Baseline after:  38/64

Imported observations: 12
Direct baseline matches: 0
Potential matches: 0
Supporting-only: 3
No-slot: 9
Existing manual values confirmed: 0 (none definition-comparable)
Existing manual values contradicted: 0
New baseline completions: 0
```

## 12. End-to-End Lineage Proof

See `reports/CC_PUBLIC_STATISTICS_END_TO_END_LINEAGE_PROOF_1_0.md` (Census pop + BLS CES AHE chains).

## 13. Validators

| Command | Result |
|---|---|
| `pnpm imports:validate` | PASSED (warn: missing reddirt_commit) |
| `pnpm baseline:validate` | PASSED — 38/64 |
| `pnpm research:validate` | PASSED |
| `pnpm project:validate` | PASSED |
| `pnpm phase2:validate` | PASSED |
| `pnpm graph:validate` | PASSED |
| `pnpm progress:validate` | PASSED |

## 14. Files Changed

- `data/imports/reddirt-public-statistics/*` (live package + mapping)
- `data/project/public_statistics_bridge.json`
- `data/project/data_asset_master_registry.json`
- `data/project/data_flow_registry.json`
- `data/project/external_data_source_registry.json`
- `scripts/validate-public-statistics-import.mjs`
- `reports/CC_PUBLIC_STATISTICS_END_TO_END_LINEAGE_PROOF_1_0.md`
- `reports/CC_PUBLIC_STATISTICS_IMPORT_AND_BASELINE_MAPPING_1_0_RETURN.md`
- `reports/CC_DATABASE_SCHEMA_ATLAS_1_0.md` (sequence status)
- RedDirt RCIP: `src/lib/civic-intelligence/exports/ccExport.ts` (checksum-after-privacy fix)

## 15. Commit Hash

_Pending — filled after commit._

## 16. Remaining Gaps

- Seeded RCIP indicators are mostly AR ACS / national CPI-unemp-earnings — not definition-aligned to empty national scoreboard slots.
- B01/B02/C02 still need BDS.
- HC07 still needs CPS voting current observation.
- `reddirt_commit` on export remains null (generator commit not recorded in worktree run).

## 17. Exact Next Recommended Slice

**`RCIP-BASELINE-ALIGNED-SERIES-EXPANSION-1.0`**

Expand RedDirt’s approved indicator manifest to series that can DIRECT-MATCH empty or pending CC slots (priority: Census BDS for B01/B02/C02; CPS voting for HC07; then other locked empty national definitions), re-export, import, and map — still without putting credentials in CC.
