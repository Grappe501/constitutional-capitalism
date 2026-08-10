# RedDirt public-statistics imports

Approved, secret-free exports from RedDirt’s isolated `public_statistics` schema / file warehouse.

## Current live package

| Field | Value |
|---|---|
| export_id | `exp_b8877b6dc05b4217` |
| observations | 12 (8 Census ACS5, 4 BLS) |
| privacy | clean |
| mapping | `baseline-observation-mapping.json` |
| scoreboard effect | none (0 DIRECT MATCH promotions; remains 38/64) |

## Rules

- Public statistical data only.
- No Census/BLS API keys.
- No campaign, donor, volunteer, constituent, voter-ops, or private RedDirt records.
- Phase 2 builds from validated snapshots after `pnpm imports:validate` and baseline validators.
- Architecture / import alone does **not** raise baseline progress. Only definition-compatible mapped observations may promote a slot.

See `docs/architecture/PUBLIC_STATISTICS_BRIDGE.md` and `data/project/public_statistics_bridge.json`.
