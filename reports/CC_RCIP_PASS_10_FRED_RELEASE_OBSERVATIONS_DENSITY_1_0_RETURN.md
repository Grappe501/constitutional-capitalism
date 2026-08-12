# RCIP-PASS-10-FRED-RELEASE-OBSERVATIONS-DENSITY-1.0 — Return

**Slice:** `RCIP-PASS-10-FRED-RELEASE-OBSERVATIONS-DENSITY-1.0`  
**Date:** 2026-08-12  
**Export:** `exp_5da8b3fe67d94923` (11,296 warehouse observations after seed)

## What shipped

1. **FRED v2 adapter** — `release/observations` with `Authorization: Bearer` + `next_cursor` pagination; v1 `series/observations` retained.
2. **Demand-filtered Z.1 whitelist** (`release_id=52`) — household/nonprofit and nonfinancial corporate balance-sheet stocks + farm-sector equity/NW; **no full-release dump**.
3. **Classic Z.1 aliases** via series path where release titles/aliases diverge (`TNWBSHNO`, `CMDEBT`, `HCCSDODNS`, `DABSHNO`).
4. **Bind** into existing panels only (**0 new**): wealth, ownership, rural.

## Signature readings (bind time)

| Series | Latest |
|---|---|
| HH+NP net worth (TNWBSHNO) | **$183.0T** (2026-Q1) |
| NFC net worth (BOGZ1) | **$37.1T** (2025) |
| Corporate farm NW | **$1.1T** (2026-Q1) |

## Epistemic wall

Z.1 structure histories ≠ worker/local ownership, market power, county prosperity, or political capture. Complements DFA shares and county NASS; does not replace them.

## Parallel track

HYP-127 Maryland election-record inventory ran as non-displacing parallel research (see companion return).
