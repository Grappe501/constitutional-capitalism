# CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0 — Return

**Generated:** 2026-08-10  
**Governing rule:** A bad metric is worse than a missing metric because it creates false confidence.

## 1. Scoreboard

| | |
| --- | ---: |
| Baseline count before | **27/86** |
| Baseline count after | **27/64** |
| Numerator change | **0** (unchanged) |
| Denominator change | **-22** (ontology cleanup) |
| Registry entries (lineage) | **85** |
| Unique metric IDs | **85** |

## 2. Disposition summary

| Outcome | Count |
| --- | ---: |
| IDs remapped (legacy→canonical) | **4** (1 MERGE + 3 REMAP) |
| Metrics retained (KEEP AS WRITTEN) | **56** |
| Metrics redefined | **0** |
| Metrics split | **0** |
| Metrics retired / merged away | **1** |
| Metrics deferred (definition/data) | **8** |
| Reclassified design indicator | **17** |
| Reclassified research question | **4** |

## 3. Duplicate D01–D04 remap (no silent renumbering)

| Historical | Context | Disposition | Canonical |
| --- | --- | --- | --- |
| D01 Voter participation | legacy early block | MERGE | **D03** Voter participation rate |
| D02 Civic engagement | legacy early block | REMAP ID | **D09** |
| D03 Public trust | legacy early block | REMAP ID | **D10** |
| D04 Local participation | legacy early block | REMAP ID | **D11** |
| D01 Contested races | framework | KEEP AS WRITTEN | **D01** |
| D02 District integrity | framework | KEEP AS WRITTEN | **D02** |
| D03 Voter participation rate | framework | KEEP AS WRITTEN | **D03** (sourced) |
| D04 Campaign funding concentration | framework | KEEP AS WRITTEN | **D04** |

Canonical table: `research/phase_2/baseline_id_remap_table.json`

## 4. Flag adjudications (strict four questions applied)

| Flag | Disposition | Ontology |
| --- | --- | --- |
| Duplicate D01–D04 | REMAP ID / MERGE | structural / survey |
| CM01 Main Street occupancy | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| B03 Local ownership | DEFER — DEFINITION REQUIRED | STRUCTURAL INDICATOR |
| G04 Regulatory burden | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| I02 AI investment | DEFER — DEFINITION REQUIRED | DERIVED STATISTIC |
| E07 Community Health Index | RECLASSIFY AS DESIGN INDICATOR | DESIGN TARGET |
| D07 Oversight durability | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| J08 White-collar enforcement intensity | DEFER — DEFINITION REQUIRED | ADMINISTRATIVE COUNT |
| HC01 Multiple-pathway completion | DEFER — DEFINITION REQUIRED | DERIVED STATISTIC |
| CM03 Hospital access | DEFER — DEFINITION REQUIRED | STRUCTURAL INDICATOR |
| HC08 Employer satisfaction | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| PS01–PS08 / T01–T08 | RECLASSIFY AS DESIGN INDICATOR | DESIGN TARGET |

Full Q&A: `research/phase_2/baseline_bad_metric_governance_adjudications.json`

## 5. Ontology cleanup

Only these classes count toward the scoreboard denominator:

```text
OBSERVED STATISTIC
DERIVED STATISTIC
INDEX
SURVEY MEASURE
ADMINISTRATIVE COUNT
STRUCTURAL INDICATOR
```

Design targets and research questions remain in the registry for lineage but **do not** count as baseline statistics.

Artifact: `research/phase_2/baseline_ontology_cleanup.json`

## 6. Definition debt remaining

- `CC-IND-B03` — Local ownership (DEFER — DEFINITION REQUIRED)
- `CC-IND-CM03` — Hospital access (DEFER — DEFINITION REQUIRED)
- `CC-IND-D09` — Civic engagement (REMAP ID)
- `CC-IND-D10` — Public trust (REMAP ID)
- `CC-IND-D11` — Local participation (REMAP ID)
- `CC-IND-I02` — AI investment (DEFER — DEFINITION REQUIRED)
- `CC-IND-J08` — White-collar / economic crime enforcement intensity (DEFER — DEFINITION REQUIRED)
- `CC-IND-HC01` — Multiple-pathway secondary completion / credential attainment (DEFER — DEFINITION REQUIRED)

## 7. Domains affected

- Business
- Communities
- Constitutional Transparency
- Democracy
- Essential Systems
- Government
- Human Capital Doctrine
- Innovation
- Justice
- Public Service

## 8. Graph / report references

- Democracy diagnosis metrics bullet updated to point at remap table
- Historical references preserved (no silent renumbering)
- Graph references repaired: **2** documented touchpoints

## 9. Intentionally unchanged

- Sourced numerator **27** (no expansion this slice)
- Modeling / legal **0% / 0%**
- Phase 2 **PARTIAL**
- Agriculture posture lock (~3 / 0 / 0; feed voice-gated)
- Doctrine / principle count

## 10. Next

`CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-AFTER-ONTOLOGY-CLEANUP-1.0`

Alternate: definition locks for HC01 / CM03 / B03 / I02 / J08 before further fills.

## 11. Validators

- `baseline:validate` — PASSED (unique IDs; scoreboard 27/64; registry 27/85)
- `phase2:validate` — PASSED (PARTIAL; modeling/legal 0%; denominator 64)
- `progress:validate` — PASSED
