# CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-AFTER-ONTOLOGY-CLEANUP-1.0 — Return

**Generated:** 2026-08-10  
**Rule:** Increase the share of valid empirical baselines that are fully sourced and reproducible. Do not chase the numerator.

## 1. Required delta

```text
Baseline before: 27/64
Baseline after: 34/64

Newly completed:
- CC-IND-L04
- CC-IND-CM04
- CC-IND-E01
- CC-IND-B04
- CC-IND-HC02
- CC-IND-J07
- CC-IND-D10

Deferred resolved:
- CC-IND-D10 → COMPLETED (ANES instrument lock)

Deferred still open:
- B03, I02, J08, HC01, CM03, D09, D11 → REMAINS DEFERRED
- B01, HC07 → DEFINITION RESOLVED / DATA PENDING

New ontology defects:
- L03 worker/employee ownership ≠ SCF business equity (flagged)
- J07 dual construct → redefined to return-to-prison; employment split pending
- E04 not fillable with all-cause death rate (flagged)

Primary sources added:
- CC-SRC-248–254

Derived metrics added:
- CC-IND-CM04, CC-IND-E01

Definition debt remaining:
- B03, I02, J08, HC01, CM03, D09, D11 (+ B01/HC07 data pending)

Weakest empirical domains:
- business dynamics (B01/B02/C02)
- human-capital pathways (HC01/HC03–HC05/HC07)
- democracy structural (D01/D02/D04–D06/D08 + D09/D11)
- hospital access (CM03)
- local/employee ownership (B03/L03)
```

## 2. Newly completed (retrieval standard)

| ID | Value | Year | Fit | Agency |
| --- | ---: | --- | --- | --- |
| L04 | 2.1% quits rate | 2024 | STRONG | BLS JOLTS |
| CM04 | 13.1% community-bank deposit share | 2024Q4 | DIRECT | FDIC |
| E01 | 24.9% CB+CU loan share | 2024Q4 | STRONG | FDIC+NCUA |
| B04 | $242.87B CRA SB originations | 2023 | STRONG | FFIEC/OCC |
| HC02 | 353,177 youth apprentices served | FY2023 | STRONG | DOL |
| J07 | 46% 5-year return-to-prison | 2012 cohort | STRONG | BJS |
| D10 | 15.4% trust always/most | 2024 | DIRECT | ANES |

## 3. Deferred special treatment

| ID | Disposition |
| --- | --- |
| `CC-IND-B03` | REMAINS DEFERRED |
| `CC-IND-I02` | REMAINS DEFERRED |
| `CC-IND-J08` | REMAINS DEFERRED |
| `CC-IND-HC01` | REMAINS DEFERRED |
| `CC-IND-CM03` | REMAINS DEFERRED |
| `CC-IND-D09` | REMAINS DEFERRED |
| `CC-IND-D10` | COMPLETED |
| `CC-IND-D11` | REMAINS DEFERRED |
| `CC-IND-B01` | DEFINITION RESOLVED / DATA PENDING |
| `CC-IND-HC07` | DEFINITION RESOLVED / DATA PENDING |

## 4. Hard boundaries held

- No PS/T design inventories reintroduced
- No HC01 / CM03 proxies
- No B03 / I02 / J08 / D09 / D11 fills without definition/source fit
- No secondary republisher for B01
- Denominator unchanged at **64**
- Legacy merged IDs not revived

## 5. Gate impact

- GATE-07 reassessed: still **OPEN** at 34/64
- Public Statistics Bridge pathways updated for the seven fills
- Unrelated gates not moved
- Phase 2 remains **PARTIAL**; modeling/legal **0%**

## 6. Next

`CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0`

## 7. Validators

- `baseline:validate` — PASSED (unique IDs; scoreboard 34/64; registry 34/85)
- `phase2:validate` — PASSED (PARTIAL; modeling/legal 0%; denominator 64)
- `progress:validate` — PASSED
