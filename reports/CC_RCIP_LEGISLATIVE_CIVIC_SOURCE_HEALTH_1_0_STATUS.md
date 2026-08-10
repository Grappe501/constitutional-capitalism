# RCIP-LEGISLATIVE-CIVIC-SOURCE-HEALTH-1.0 — Status

**Date:** 2026-08-10  
**Mode:** Credential health pass only — no wholesale ingest, no CC-side second API client.  
**Result:** Legislative/civic **core CLEARED** for demand-manifest work.

## Governing rules (locked)

1. Configure once in RedDirt; probe each source independently; preserve credential boundaries; CC consumes only validated exports.
2. **API availability is not evidence relevance.**
3. Demand manifest drives ingest.
4. `API_DOT_GOV_KEY` ≠ `CENSUS_API_KEY`.
5. Prefer historical depth when a defensible series exists.
6. No new architecture; no indiscriminate API harvesting.

## Health board (machine probe after Windows paste)

| Source | Status | Evidence |
|---|---|---|
| Congress.gov | **LIVE_USABLE** | HTTP 200 `/v3/member` |
| OpenFEC | **LIVE_USABLE** | HTTP 200 `/v1/candidates/` |
| Open States | **LIVE_USABLE** | HTTP 200 `/jurisdictions` after reissue + dialog |
| Google Civic | Separate family (demand-map eligible) | See google civic source family |
| Census/BLS spine | Separate spine (context) | Hard separation preserved |
| api.data.gov | **DEFERRED_NONBLOCKING** | Key written; NREL probe still `fetch failed` — not marked source-broken; non-blocking for legislative manifest |

## Operator actions completed

- Windows paste dialog configured `OPENSTATES_API_KEY` and `API_DOT_GOV_KEY` into RedDirt `.env` (presence only).
- `npm run legislative:probe` re-run from machine path.

## Downstream

~~`RCIP-LEGISLATIVE-CIVIC-PUBLICATION-DEMAND-MANIFEST-1.0`~~ **PASSED** — 289 opportunities → 11 unique ingest objects.

~~`RCIP-LEGISLATIVE-CIVIC-TARGETED-INGEST-1.0`~~ **PASSED** — export `exp_legciv_9ab7ba9f3266`; **253/289** opportunities EVIDENCE_READY.

**Next:** `CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-1-LEGISLATIVE-CIVIC-1.0`  
(Optional first: re-run Google Civic from an IP-allowed machine to clear 29 PARTIAL opportunities.)

Canonical posture: `data/project/legislative_civic_api_source_families.json`  
Manifest: `data/project/RCIP_LEGISLATIVE_CIVIC_PUBLICATION_DEMAND_MANIFEST.json`  
Mapping: `data/project/legislative_civic_evidence_ready_mapping.json`
