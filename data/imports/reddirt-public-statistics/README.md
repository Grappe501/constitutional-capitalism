# RedDirt public-statistics imports

Approved, secret-free exports from RedDirt’s isolated `public_statistics` schema / file warehouse.

## Current live package

| Field | Value |
|---|---|
| export_id | `exp_226e711e08704b06` |
| observations | 284 |
| series_arrays | present (`series-arrays.json`) |
| privacy | clean |
| mapping | `baseline-observation-mapping.json` / Pass 6 evidence-system bind |
| scoreboard effect | none (baseline remains 42/64) |

## Pass 6 note

Multi-year BLS/Census arrays are bound into publication evidence systems via `scripts/pass6_bind_series_arrays.cjs`. Array attachment is **not** baseline promotion.

Energy RCIP-DEM-0418–0425 remain blocked until an EIA connector exists in the RedDirt RCIP worktree.

## Rules

- Public statistical data only.
- No Census/BLS API keys.
- No campaign, donor, volunteer, constituent, voter-ops, or private RedDirt records.
- Phase 2 builds from validated snapshots after `pnpm publicstats:validate` and baseline validators.
- Architecture / import alone does **not** raise baseline progress. Only definition-compatible mapped observations may promote a slot.

See `docs/architecture/PUBLIC_STATISTICS_BRIDGE.md` and `data/project/public_statistics_bridge.json`.
