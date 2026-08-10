# CC-PHASE-2.1-ARKANSAS-CIVIC-INFORMATION-90-DAY-COVERAGE-CODING-1.0 — Return

**Alias:** `CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0`  
**Generated:** 2026-08-10  
**Window:** 2026-05-12 → 2026-08-10 (90 days)  
**Agriculture posture:** LOCKED — processing ~3 / 0 / 0; feed voice-gated. No desk inference into those lanes.

## 1. Mission

Code whether institutions exercising public power received sustained independent original reporting across the six journalism pilot geographies.

## 2. Scoreboard (not a journalism score)

| Metric | Value |
| --- | ---: |
| Rows coded | 84 / 84 |
| Cells non-unknown | 300 / 504 |
| Cells unknown | 204 |
| Dual-code sample agreement | 75% |
| Composite journalism score | **none (forbidden)** |

## 3. Answers to the two questions

### Does nominal outlet presence predict sustained independent scrutiny?

**No — not in this window.** All six geographies have nominal or regional outlets in inventory. Searcy shows an institutional-coverage desert despite a paper. Lafayette is UNKNOWN (site 503). Helena shows elections/education capacity but uncertain council continuity. Jacksonville shows original local scrutiny on schools/elections. Benton/Pulaski show high-capacity issue clusters and still leave specialty institutions thin.

### Which institutions are systematically under-covered even where outlets exist?

Most consistently thin across outlet-present places: **hospital boards, utilities governance, planning/zoning (absent controversy), budgets/procurement, agriculture governance**, and often **routine school-board / quorum-court meeting series** when no crisis narrative exists.

## 4. Coverage-gap typology (by geography)

- **AR-GEO-SEARCY-COUNTY**: ORIGINAL-REPORTING DESERT; INSTITUTIONAL-COVERAGE DESERT; CONTINUITY GAP
- **AR-GEO-LAFAYETTE-COUNTY**: UNKNOWN / INSUFFICIENT ARCHIVE; DISTRIBUTION GAP
- **AR-GEO-WEST-HELENA**: CONTINUITY GAP; SPECIALTY-REPORTING GAP; UNKNOWN / INSUFFICIENT ARCHIVE
- **AR-GEO-JACKSONVILLE**: SPECIALTY-REPORTING GAP; CONTINUITY GAP
- **AR-GEO-BENTON-COUNTY**: SPECIALTY-REPORTING GAP; CONTINUITY GAP; UNKNOWN / INSUFFICIENT ARCHIVE
- **AR-GEO-PULASKI-COUNTY**: SPECIALTY-REPORTING GAP; INSTITUTIONAL-COVERAGE DESERT

## 5. Dual-code controls

Sample of 12 cells; disagreements on depth ordinals and paywalled frequency. Agreement rate 75%. No aggregation into scores.

## 6. Sources / PR

CC-SRC-229–235. Public Reasoning CC-PR-075–080.

## 7. Artifacts

- `research/phase_2/civic_information_coverage_matrix.json`
- `research/phase_2/civic_information_coverage_gap_typology.json`
- `research/phase_2/civic_information_dual_code_reliability.json`
- `research/phase_2/civic_information_90_day_coding_observations.json`

## 8. Validators

- `research:validate` — PASSED (sources 235)
- `project:validate` — PASSED
- `phase2:validate` — PASSED (baseline still 14/86; modeling/legal 0%)
- `baseline:validate` — PASSED

## 9. Exact next

Human: processing + feed voice calls (unchanged).  
Cursor: **baseline expansion round two** (or clearest remaining Phase 2 gate on forensic scoreboard).
