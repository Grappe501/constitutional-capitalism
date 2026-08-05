# Burt Handoff — Public Statistics Bridge

**Slice:** `CC-PHASE-2-PUBLIC-STATISTICS-BRIDGE-1.0`  
**Decisions:** `CC-DEC-076`, `CC-DEC-077`, `CC-DEC-078`  
**Status:** queued / architecture-only  
**Authority:** Forensic audit steps **5, 7, 8** support — not a Phase 3 unlock  
**Engine:** `H:\SOSWebsite\RedDirt` (RCIP shared civic-data spine)  
**Spine:** `data/project/rcip_civic_data_spine.json`  
**Vision:** `docs/architecture/REDDIRT_CIVIC_INTELLIGENCE_PLATFORM.md`

## Purpose

Treat RedDirt as the shared **Public Data Engine**. Do not duplicate Census/BLS connectors into Constitutional Capitalism. CC consumes only approved public statistical exports with full provenance.

## Do

1. In **RedDirt** (`H:\SOSWebsite\RedDirt`): audit existing Census/BLS ingestion; formalize four RCIP layers (raw → canonical → evidence/confidence → product projection).
2. Create isolated schemas (`public_statistics`, `campaign_private`, etc.) — never one unrestricted pool.
3. Design multi-source validation for a pilot topic (e.g. county employment: ACS + BLS + BEA + state).
4. Create approved export/views; generate validated export → CC `data/imports/reddirt-public-statistics/` with provenance + confidence/disagreement fields.
5. Map **10–15** first-wave baseline metrics with full lineage and display contract fields.
6. Run `pnpm imports:validate`, `pnpm baseline:validate`, `pnpm phase2:validate` in CC.

## Do not

- Implement agency connectors inside Constitutional Capitalism
- Copy Census/BLS keys into CC, GitHub, or Astro
- Give CC broad RedDirt DB credentials in Phase 2
- Import campaign/personal/operational data
- Raise baseline counts because architecture files exist
- Begin Burt steps 14–25 or Phase 3 constitutional build

## First-wave candidates

See `data/project/public_statistics_bridge.json` → `first_wave_metric_candidates`.

## Success for this slice

- Boundary proof: no campaign/personal/keys in exports
- At least one validated export with reproducibility manifest
- 10–15 metrics mapped with definitions/units/geography/release lineage
- Public site still builds from snapshots
- Baseline sourced count rises only for metrics that actually pass validation
