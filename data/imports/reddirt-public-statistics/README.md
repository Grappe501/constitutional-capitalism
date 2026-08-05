# RedDirt public-statistics imports

Approved, secret-free exports from RedDirt’s isolated `public_statistics` schema.

## Rules

- Public statistical data only.
- No Census/BLS API keys.
- No campaign, donor, volunteer, constituent, voter-ops, or private RedDirt records.
- Phase 2 builds from validated snapshots after `pnpm imports:validate` and baseline validators.
- Architecture here does **not** raise baseline progress. Values raise `2/86` only when mapped observations pass validation.

See `docs/architecture/PUBLIC_STATISTICS_BRIDGE.md` and `data/project/public_statistics_bridge.json`.
