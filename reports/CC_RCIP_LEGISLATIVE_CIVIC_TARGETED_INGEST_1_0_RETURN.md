# RCIP-LEGISLATIVE-CIVIC-TARGETED-INGEST-1.0 — Return

**Status:** PASSED (with scoped partials)  
**Date:** 2026-08-10  
**Mode:** Demand-scoped RedDirt ingest → credential-free export → CC import → evidence-ready mapping only.  
**No page rewrites in this slice.**

## Executive summary

Executed the 11-template ingest queue against live RedDirt connectors and imported a credential-free package into CC. Success is measured by how many of the **289** demand opportunities are now directly supportable — not by raw row count.

| Dial | Reality |
|---|---:|
| Export ID | `exp_legciv_9ab7ba9f3266` |
| Normalized objects | **16** |
| Provenance events | **24+** |
| Templates covered | **11 / 11** |
| Opportunities **EVIDENCE_READY** | **253 / 289 (87.5%)** |
| Opportunities **PARTIAL_READY** | **36 / 289** |
| Opportunities **NOT_YET** | **0** |
| High-reuse EVIDENCE_READY | **246** |
| Baseline scoreboard | unchanged **42/64** |
| Sources registered | unchanged **264** |

## Governing rule applied

> No ingest object gets built unless it has at least one manifest-backed publication use and a defined provenance path.

Preserved on each object / provenance event: source family, endpoint/object, query parameters, geography, historical range, retrieval timestamp, response metadata, normalization rules, source version/release where available, target CC content IDs, reuse count (via demand map), privacy classification.

## Pipeline

```text
RedDirt live APIs
  → normalized civic/legislative objects
  → validated credential-free export
  → CC import (data/imports/reddirt-legislative-civic/)
  → evidence-ready mapping report
  ↛ page rewrites (deferred)
```

## Queue execution results

| # | Object | Result |
|---|---|---|
| 1 | OpenFEC candidate receipts / cycle totals | **OK** — 5-cycle top-decile concentration series (2016–2024) |
| 2 | Open States AR bills, multi-session | **OK** — 60-bill sample across sessions |
| 3 | Congress.gov bill actions / sponsors / committees | **OK** — bill + member + committee samples |
| 4 | Open States AR legislators / committees / votes | **Partial** — **142** legislators; votes sample empty (0 in included bill details) |
| 5 | Google Civic voterInfo contests | **PARTIAL** — IP-restricted for this runtime; controlled AR reference places retained in contract |
| 6 | Google Civic elections / divisions | **PARTIAL** — same IP restriction |
| 7 | CPS voting / HC07 | **PARTIAL** — reuse pointer to prior export `exp_79f42d2fe71f4b69` / CC-IND-HC07 |
| 8 | ACS context | **OK** — AR population + median household income |

## Evidence-ready answer (success criterion)

> **How many existing CC passages, claims, baselines, Public Reasoning records, and comparison pages become directly supportable from these targeted civic/legislative ingest objects?**

**253 of 289** opportunities are now **EVIDENCE_READY** for publication binding.

| Surface class | EVIDENCE_READY | PARTIAL_READY |
|---|---:|---:|
| public_reasoning | 139 | 16 |
| claim_ledger | 50 | 8 |
| lcl_community | 27 | 3 |
| other | 14 | 0 |
| national_diagnosis | 12 | 4 |
| economic_system | 8 | 2 |
| theory_framework | 2 | 1 |
| journalism_module | 1 | 2 |

| Source family | EVIDENCE_READY | PARTIAL_READY |
|---|---:|---:|
| OPENSTATES | 129 | 1 |
| CENSUS_BLS_PUBLIC_STATISTICS | 92 | 6 |
| CONGRESS_GOV | 18 | 0 |
| OPENFEC | 14 | 0 |
| GOOGLE_CIVIC | 0 | 29 |

### Still partial (36)

1. **Google Civic (29)** — key is IP-restricted from the agent/cloud runtime (`57.138.123.244`). Re-run `npm run legislative:targeted-ingest` from an allowed machine (or widen Google Cloud key IP allowlist). Privacy boundary unchanged: controlled city/state reference places only; never a residential-address warehouse.
2. **CPS voting (6)** — reuse pointer only; prior HC07 series remains the bind target.
3. **Open States votes (1)** — bills/legislators ready; vote events empty in the capped bill-detail sample.

## Privacy / boundary attestation

- Credential-free export (no API keys).
- No residential-address warehouse.
- Google Civic: controlled Arkansas reference places only (`Little Rock`, `Helena-West Helena`, `Lewisville`, `Searcy`, `Conway`).
- OpenFEC: aggregate receipts concentration only — no donor PII.
- Separate package from baseline `ccExport` privacy scan (civic field names are publication-safe aggregates).

## Deliverables

| Artifact | Path |
|---|---|
| Import package | `data/imports/reddirt-legislative-civic/` |
| Export payload | `data/imports/reddirt-legislative-civic/legislative-civic-export.json` |
| Evidence-ready mapping | `data/project/legislative_civic_evidence_ready_mapping.json` |
| Mapping regenerator | `scripts/run-legislative-civic-evidence-ready-mapping.mjs` |
| RedDirt ingest | `H:\SOSWebsite\RedDirt-rcip-public-statistics\scripts\legislative-civic-targeted-ingest.mjs` |

## Exact next slice

**`CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-1-LEGISLATIVE-CIVIC-1.0`**

Bind highest-reuse **EVIDENCE_READY** items into Evidence Panels / progressive disclosure under **CC-DEC-104** — starting with claim ledger + Public Reasoning + LCL/democracy surfaces — **without** indiscriminate page rewrites. Optionally re-run Google Civic from an IP-allowed machine first to clear the 29 PARTIAL opportunities.
