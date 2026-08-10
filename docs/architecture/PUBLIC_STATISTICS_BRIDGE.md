# Public Statistics Bridge (RedDirt → Constitutional Capitalism)

**Decisions:** `CC-DEC-076`, `CC-DEC-077`  
**Slice:** `CC-PHASE-2-PUBLIC-STATISTICS-BRIDGE-1.0`  
**Canonical JSON:** `data/project/public_statistics_bridge.json`  
**Import root:** `data/imports/reddirt-public-statistics/`  
**Engine workspace:** `H:\SOSWebsite\RedDirt`  
**RCIP vision:** `docs/architecture/REDDIRT_CIVIC_INTELLIGENCE_PLATFORM.md`

## Governing rule

> **RedDirt may provide Constitutional Capitalism with approved public statistical infrastructure, but Constitutional Capitalism may never inherit RedDirt’s campaign identity, operational data, political targeting, private records, or application dependencies.**

## Publication use (`CC-DEC-104`)

Imported public statistics exist to be **shown** on theory, proof, doctrine, and policy surfaces under the Data-Dense Publication Standard — not buried as research-only footnotes. Binding path: `metric → observation → dataset → agency → release`. See `docs/publishing/DATA_DENSE_PUBLICATION_STANDARD.md`.

## Why this exists

RedDirt (`H:\SOSWebsite\RedDirt`) is the shared **Public Data Engine** — evolving into the **RedDirt Civic Intelligence Platform (RCIP)**. Rebuilding Census/BLS (or future agency) connectors inside Constitutional Capitalism would waste mature infrastructure, risk credential leakage into a static public site, and create duplicate integrations across civic apps.

Constitutional Capitalism needs **proof**, not a data-platform stack. It asks for named validated measures; RedDirt handles agency complexity; CC imports secret-free snapshots with full provenance.

## Architecture

```text
Census API ─┐
            ├─→ RedDirt ingestion workers
BLS API ────┘          ↓
                 Shared public-data schema
                         ↓
                  Read-only data API / approved export
                    ↙           ↘
             RedDirt         Constitutional Capitalism
```

### RedDirt keeps

- API credentials (server-side only)
- scheduled ingestion, retries, errors
- source metadata, historical series
- geographic normalization
- update timestamps

### Constitutional Capitalism receives

- normalized public data
- source citations, release dates, definitions
- geographic identifiers
- methodology notes
- revision history

### Never crosses the boundary

Campaign contacts, volunteers, donors, campaign intelligence, private notes, constituent records, voter-ops data, admin accounts, private analytics, Gmail/Calendar metadata, API keys, or broad DB credentials.

## Phase 2 preference: validated snapshots

Because the public sites are static Astro apps and research must be reproducible, Phase 2 prefers:

1. RedDirt generates an approved export from `public_statistics`
2. CC imports JSON under `data/imports/reddirt-public-statistics/`
3. Validators run
4. Public pages build from committed, source-backed snapshots

A narrow live public-data endpoint may be considered later. It is not required to start.

## RedDirt schema (design target)

Isolated schema (name options): `public_statistics` or `constitutional_capitalism_data`.

Foundational tables: `sources`, `datasets`, `series`, `observations`, `geographies`, `releases`, `ingestion_runs`, `revisions`, `metric_mappings`.

Read-only role: `cc_public_statistics_reader` — approved views only. Prefer **no live CC DB credentials in Phase 2**; use exports.

## Metric lineage

Every displayed number must preserve derivation via `metric_mappings`:

```text
CC baseline metric_id
→ official series / calculation
→ geography levels
→ release / revision
→ export_id
```

## First wave

Select **10–15** of the 86 baseline indicators that Census/BLS can authoritatively support. Prove full lineage before expanding.

Architecture alone does **not** raise baseline progress. `2/86` remains until validated observations are mapped.

Census/BLS will not fill all 86 indicators. The schema is **agency-neutral** for BEA, Fed, USDA, FCC, CDC, CMS, Education, Treasury, IRS, EIA, EPA, DOJ, and state agencies.

## Subordination

This slice supports Phase 2 proof work. It remains subordinate to:

- `CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0`
- `CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0`
- forensic audit governance (Burt steps 1–13)

## Validation

```powershell
pnpm imports:validate
pnpm phase2:validate
pnpm baseline:validate
```
