# CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-CONTINUATION-1.0 — Return

**Generated:** 2026-08-10  
**Rule:** Expand valid empirical baselines. Do not weaken the standard for Census retrieval failures.

## 1. Required delta

```text
Baseline before: 27/64
Baseline after: 38/64

Newly completed:
- CC-IND-C03
- CC-IND-J06
- CC-IND-D04
- CC-IND-E02

Deferred resolved:
- (none forced; D10 already completed prior pass)

Deferred still open:
- B01 → DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING (SOURCE_IDENTIFIED_DATA_PENDING)
- HC07 → PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING (SOURCE_IDENTIFIED_DATA_PENDING)
- B02, C02 → SOURCE_IDENTIFIED_DATA_PENDING
- B03, I02, J08, HC01, CM03, D09, D11 → REMAINS DEFERRED (SOURCE_UNKNOWN)

New ontology defects:
- J06 redefined receipts stock vs dependence ratio (documented)
- HC05 pathway dimension unlocked — age-only earnings rejected
- D01 no EAC contested-race series (flagged)

Primary sources added:
- CC-SRC-255–260

Derived metrics added:
- CC-IND-D04

Definition debt remaining:
- B03, I02, J08, HC01, CM03, D09, D11 (+ B01/B02/C02/HC07 data pending)

Weakest empirical domains:
- business dynamics (Census retrieval)
- human-capital pathways
- democracy structural (ex-D04)
- hospital access
- local/employee ownership
```

## 2. Newly completed (retrieval standard)

| ID | Value | Year | Fit | Agency |
| --- | ---: | --- | --- | --- |
| C03 | 20 criminal cases filed | FY2024 | STRONG | DOJ ATR |
| J06 | $2,422M AFF receipts | FY2024 | STRONG | DOJ AFP |
| D04 | 73.0% top-decile receipt share | 2023–24 | STRONG | FEC |
| E02 | 52% full approval; $5.394B FSA FLP | 2024 | STRONG | Fed + USDA FSA |

## 3. Completion-state taxonomy

| State | Meaning |
| --- | --- |
| `SOURCE_UNKNOWN` | Authoritative source/construct not yet locked |
| `SOURCE_IDENTIFIED_DATA_PENDING` | Source+metric known; primary observation not retrieved |
| `BASELINE_COMPLETE` | Full reproducible-retrieval standard met |

## 4. Deferred / pending special treatment

| ID | Disposition | State |
| --- | --- | --- |
| `CC-IND-B01` | DATA AVAILABLE IN PRINCIPLE / PRIMARY RETRIEVAL PENDING | `SOURCE_IDENTIFIED_DATA_PENDING` |
| `CC-IND-HC07` | PRIMARY HISTORICAL SERIES CONFIRMED / CURRENT OBSERVATION PENDING | `SOURCE_IDENTIFIED_DATA_PENDING` |
| `CC-IND-B02` | SOURCE_IDENTIFIED_DATA_PENDING | `SOURCE_IDENTIFIED_DATA_PENDING` |
| `CC-IND-C02` | SOURCE_IDENTIFIED_DATA_PENDING | `SOURCE_IDENTIFIED_DATA_PENDING` |
| `CC-IND-B03` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-I02` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-J08` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-HC01` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-CM03` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-D09` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |
| `CC-IND-D11` | REMAINS DEFERRED | `SOURCE_UNKNOWN` |

## 5. Hard boundaries held

- No PS/T design inventories reintroduced
- No HC01 / CM03 proxies
- No B01 fill from Cloudflare 520 stubs or secondary republishers
- No HC07 fill with 2020 A-1 51.4% as if it were 2024
- Denominator unchanged at **64**
- Failed retrievals preserved in `research/phase_2/baseline_failed_retrieval_log.json`

## 6. Gate impact

- GATE-07 reassessed: still **OPEN** at 38/64
- Public Statistics Bridge pathways updated for the four fills
- Unrelated gates not moved
- Phase 2 remains **PARTIAL**; modeling/legal **0%**

## 7. Next

`CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0`

## 8. Validators

- `baseline:validate` — PASSED (unique IDs; scoreboard 38/64; registry 38/85)
- `phase2:validate` — PASSED (PARTIAL; modeling/legal 0%; denominator 64)
- `progress:validate` — PASSED
