# CC-EXISTING-CONTENT-DATA-EVIDENCE-DEEP-AUDIT-1.0 — Return

**Status:** PASSED (registry delivered; no charts built; no content rewritten)  
**Date:** 2026-08-10  
**Governing question:** What evidence would allow the reader to evaluate whether this statement deserves to be believed?

## Executive summary

The process is now reversed: **publication demand drives evidence work**, not agency curiosity.

| Dial | Reality |
|---|---|
| Files audited | **327** |
| Sections seen | **2,064** |
| Paragraphs scanned | **2,719** |
| Substantive passages + structural units | **~2,300** |
| Opportunities after dedup | **2,717** |
| HIGH priority | **553** |
| Unique RCIP series demands | **417** |

These are registry counts from the audit run — **not quota targets**.

## Deliverables

| Artifact | Path |
|---|---|
| Opportunity registry | `data/project/content_data_evidence_opportunity_registry.json` |
| Top 50 compact queue | `data/project/content_data_evidence_top50.json` |
| RCIP demand manifest | `data/project/RCIP_PUBLICATION_DATA_DEMAND_MANIFEST.json` |
| Regenerator | `scripts/run-content-data-evidence-deep-audit.mjs` |

Extends (does not replace): CC-DEC-104 Evidence Panel standard, `research_gap_registry`, `proof_burden_registry`, contradictory-evidence corpus.

## Classification reality (primary label)

Primary label uses retrieval/epistemic preference (an opportunity may also carry secondary tags).

| Classification | Count (primary) |
|---|---:|
| `DATA ALREADY AVAILABLE` | **274** |
| `PIPELINE RETRIEVABLE` | **474** |
| `PRIMARY RESEARCH AVAILABLE` | **1,533** |
| `MODELING REQUIRED` | **53** |
| `NORMATIVE — DATA NOT REQUIRED` | **373** |
| `DATA NOT AVAILABLE` | **0** |

### Multi-label tags (can exceed opportunity count)

| Tag | Count |
|---|---:|
| `COUNTEREVIDENCE NEEDED` | **1,118** |
| `GEOGRAPHIC COMPARISON OPPORTUNITY` | **629** |
| `HISTORICAL SERIES OPPORTUNITY` | **552** |
| `DERIVED METRIC POSSIBLE` | **75** |

**Read this carefully:** 1,118 counterevidence tags means a large share of empirical opportunities still risk one-sided presentation. That is a feature of the audit under CC-DEC-102/103, not a defect.

## Surface mix

| Surface | Opportunities |
|---|---:|
| Economic-system dossiers (prose + 10-dimension matrix × 40) | 1,542 |
| Theory frameworks | 443 |
| National diagnosis | 244 |
| Claim ledger | 138 |
| Manuscript chapter intents | 98 |
| Public Reasoning | 73 |
| Proof packets | 62 |
| Principle/doctrine | 61 |
| Evidence companion | 44 |
| LCL / case studies | 11 |
| Sectoral dossiers | 1 |

### Manuscript finding

All **98** manuscript units remain **outline/concept scaffolds** (index: 81 `concept`, 17 `outline`). There is not yet a drafted book chapter dense enough for paragraph-level empirical rewrite. Manuscript opportunities are **chapter intents** linked to claims/topics for future drafting — not fake chapter statistics.

## Economic-system comparison (special attention)

Every system dossier received:

1. Passage-level opportunities from existing prose  
2. A **10-dimension empirical matrix** (growth, wages, inequality, ownership, government size, labor, poverty/mobility, concentration, entrepreneurship, fiscal stability)

Every system opportunity carries the locked caveat:

> **Countries are not controlled experiments for economic systems.**

Public surfaces must prefer institutional-pattern evidence and hybrid real-world mixtures over “Country X proves System Y.”

## Top RCIP publication demands (by reuse × priority)

1. Federal Reserve SCF/DFA household wealth levels and percentile shares  
2. USDA farm structure / concentration / prices  
3. Census / Fed / Opportunity Insights inequality and mobility  
4. Census CPS voting rates by age  
5. FEC campaign-finance concentration  
6. Census / USDA / HRSA rural population and access  
7. BLS real wage and productivity indexes  
8. Census Economic Census concentration ratios  
9. DOJ ATR enforcement series  
10. BEA / Treasury / OMB / CBO fiscal aggregates  

Full list: `data/project/RCIP_PUBLICATION_DATA_DEMAND_MANIFEST.json` (**417** unique series demands).

## Top 50 evidence upgrades

Canonical list: `data/project/content_data_evidence_top50.json`.

Composition of the scored top 50:

- National diagnosis: 20  
- Theory frameworks: 21  
- Claim ledger: 7  
- Economic systems: 2  

Dominant themes: wealth concentration (already partially sourced — needs fuller Evidence Panels + contrary display), wages/productivity binding, concentration/antitrust presentation, assistance/family-wealth claims that still need pipeline or modeling honesty, and framework pages that assert empirical predicates without on-page data.

### Example opportunity shape (already in registry)

```text
Content ID: (see top50)
File: content/research/national-diagnosis/01-wealth-and-ownership.md
Section: Current findings / Missing evidence
Existing statement: SCF/DFA concentration facts + exposed gaps (business equity, state maps)
Statement type: empirical diagnosis
Evidence currently displayed: Partial (CC-SRC-001/002/011/012; W01/W02)
Available evidence: CC baseline W01/W02/W03; Fed SCF/DFA
Additional data opportunity: SCF asset-class splits; state/local ownership; ESOP/business-equity percentiles
Recommended presentation: distribution · historical line · Arkansas/U.S. comparison · number callouts
Contrary/qualifying data: 2019–2022 median-faster-than-mean episode; middle-40% share; product non-equivalence
Priority: HIGH
```

## One statistic, many uses

Demand manifest rows already aggregate `supporting_opportunity_ids` and `reuse_surfaces`. Example reuse spine for Fed wealth distribution:

`baseline → wealth diagnosis → ownership principle/framework → economic-system comparison → Public Reasoning → Arkansas comparison → later modeling inputs`

## Recommended execution sequence (after this audit)

| Pass | Slice intent | Rule |
|---|---|---|
| **1** | Bind `DATA ALREADY AVAILABLE` HIGH items into Evidence Panels | No new ingest |
| **2** | Retrieve top RCIP demand series through RedDirt | Publication-demand driven; mapping plan before ingest |
| **3** | Academic/primary research for `PRIMARY RESEARCH AVAILABLE` | Especially system-comparison panels with non-experiment caveats |
| **4** | Build charts/tables/maps | Only for ranked opportunities |
| **5** | Rewrite affected passages from what evidence actually shows | Including weakenings |

**Immediate next slice recommendation:**  
`CC-EVIDENCE-PANEL-PASS-1-EXISTING-DATA-BINDING-1.0`  
(implements Pass 1 under CC-DEC-104 using this registry’s HIGH + `DATA ALREADY AVAILABLE` queue)

## Honesty notes

- Heuristic passage classification is **reproducible and regenerable**, not a substitute for scholar judgment on every paragraph.  
- System-dimension rows intentionally inflate `PRIMARY RESEARCH AVAILABLE` — that reflects the comparative gap, not inventable Census shortcuts.  
- Baseline remains **42/64**; this audit does not change the scoreboard.  
- Agriculture posture lock unchanged.

## Success test

> Existing CC prose/claims/frameworks/systems were audited into an actionable Data Evidence Opportunity Registry; RCIP now has a publication-demand manifest; top upgrades are ranked for evidence-first execution — including counterevidence — without building charts yet.

**Met.**
