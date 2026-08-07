# CC-PHASE-2.1-APPLY-CHATGPT-CLAIM-GOVERNANCE-DECISIONS-1.0 — Return

## 1. Executive Summary

ChatGPT's six embedded decisions were applied exactly under `CC-DEC-103`. **Canonical claim_text mutated with full lineage.** CC-CLAIM-009 **RETIRED** → **CC-PRED-009** (ChatGPT wording). CC-CLAIM-010 split: empirical claim + **CC-PRED-012**. Epistemic ontology rule activated (no new architecture).

**Below STRONG fit: 12/20 → 8/20**  
**DIRECT/STRONG: 7 → 11**  
**GATE-02: PARTIAL / REMAINS OPEN**  
**Baseline: 2/86**  
**P0: 0 open**

## 2. Adjudicator Decisions Applied

| Change | Decision | Result |
|---|---|---|
| CC-CHG-P21-001 | MODIFY | CC-CLAIM-001 → honest historical uncertainty |
| CC-CHG-P21-005 | MODIFY | CC-CLAIM-006 → rural decline vs relocation split |
| CC-CHG-P21-RET-009 | APPROVE | CC-CLAIM-009 RETIRED → CC-PRED-009 |
| CC-CHG-P21-002 | MODIFY | CC-CLAIM-010 descriptive; CC-PRED-012 created |
| CC-CHG-P21-003 | MODIFY | CC-CLAIM-016 post-Wayfair neutral wording |
| CC-CHG-P21-004 | APPROVE | CC-CLAIM-017 as Burt proposed |

Adjudicator: **ChatGPT** (research-governance). Decision record: `data/decisions/decisions.json` → CC-DEC-103.

## 3. Canonical Claim Changes (Before → After)

### CC-CLAIM-001
- **Before:** Capitalism has produced broad prosperity across historical contexts.
- **After:** Across historical contexts, the relationship between market-oriented economic institutions and material living standards varies by period, institutional structure, crisis exposure, and distribution; the magnitude and conditions of any broad prosperity effect require historical evidence before stronger claims are made.
- **Disposition:** NOT ENOUGH EVIDENCE / HISTORICAL RESEARCH REQUIRED

### CC-CLAIM-006
- **Before:** Corporate relocation and rural structural decline can drain community capacity, including local banking and healthcare access.
- **After:** Rural structural decline can erode community capacity, including through population loss and reduced access to institutions such as local banking and healthcare. Corporate relocation may contribute to local economic disruption, but its independent causal effects require separate evaluation.

### CC-CLAIM-009
- **Before:** System-level Constitutional Capitalism over 10–20 years would produce larger distributional effects than isolated corporate tax increases.
- **After:** RETIRED (text preserved in history)
- **Live proposition:** CC-PRED-009 — A sufficiently broad Constitutional Capitalism reform package may produce larger long-run distributional effects than an isolated corporate-tax increase; this is an untested comparative prediction requiring defined policy specifications, distributional modeling, sensitivity analysis, and ultimately empirical evaluation.
- **Collision note:** Prior abrupt-reform PRED-009 text relocated to **CC-PRED-011** (nothing deleted).

### CC-CLAIM-010
- **Before:** Broader ownership participation would shift many households from wage-only dependence toward multi-source capital ownership.
- **After:** U.S. household wealth ownership is highly concentrated, meaning access to capital ownership and the income and appreciation associated with it is distributed unevenly across households.
- **Prediction:** CC-PRED-012 — Expanding household ownership participation may increase the number of households receiving income or asset appreciation from capital, but the magnitude, distribution, persistence, and household-level effects are untested and require modeling and empirical evaluation.

### CC-CLAIM-016
- **After:** Online commerce is a material share of U.S. retail sales; its effects on local spending, platform margins, and community wealth require dedicated leakage and multiplier analysis, while assessments of local tax effects must account for the post-Wayfair legal and marketplace-facilitator environment.

### CC-CLAIM-017
- **After:** Property taxes can impose high burdens relative to income or liquidity for some households, motivating targeted relief design; they are also a central, relatively stable local revenue source.

## 4. CC-CLAIM-009 Retirement

**Status: RETIRED.** Historical claim retained. Prediction activated. **Not empirical proof.**

## 5. First-20 Dispositions (material)

| Claim | Before | After |
|---|---|---|
| 001 | REWRITE REQUIRED / NON-SUPPORTING | **NEE / PARTIAL** |
| 006 | QUALIFIES / PARTIAL | **QUALIFIES / STRONG** |
| 009 | RETIRE / N/A | **RETIRED / N/A** |
| 010 | REWRITE REQUIRED / NON-SUPPORTING | **SUPPORTED AS WRITTEN / DIRECT** |
| 016 | REWRITE REQUIRED / PARTIAL | **QUALIFIES / STRONG** |
| 017 | REWRITE REQUIRED / PARTIAL | **QUALIFIES / STRONG** |
| 003 | NEE / PARTIAL | unchanged (still NEE) |

## 6. Source-to-Claim Fit

| Metric | Before | After |
|---|---|---|
| Below STRONG | **12** | **8** |
| DIRECT | 2 | 3 |
| STRONG | 5 | 8 |
| PARTIAL | 7 | 5 |
| NON-SUPPORTING | 5 | 3 |

## 7. Ontology Rule

Shipped: `research/phase_2/claim_epistemic_ontology_rule.json`  
Report: `reports/CC_CLAIM_EPISTEMIC_ONTOLOGY_RULE_1_0.md`  
No new architecture — research-integrity classification only.

## 8. Integrity

- [PASS] no_claim_text_without_approval
- [PASS] every_mutation_has_decision_record
- [PASS] old_versions_recoverable
- [PASS] retired_claim_in_history
- [PASS] prediction_not_empirical_proof
- [PASS] pending_changes_cleared
- [PASS] pred009_collision_preserved  
**All pass:** true

## 9. GATE-02

# PARTIAL / REMAINS OPEN

Blockers remain: 8/20 below STRONG; CC-CLAIM-003 NEE; THIN domains; baseline 2/86.

## 10. All 16 Gates

| ID | Text | Status |
|---|---|---|
| CC-P2-GATE-01 | Canonical acceptance checklist passes | PASSED |
| CC-P2-GATE-02 | Eight priority diagnosis domains are substantively sourced | PARTIAL / REMAINS OPEN |
| CC-P2-GATE-03 | Three-layer analysis appears in substantive briefs | PASSED |
| CC-P2-GATE-04 | Twenty priority claims are audited and classified | OPEN |
| CC-P2-GATE-05 | Contrary evidence is documented | OPEN |
| CC-P2-GATE-06 | Baseline count and narratives agree at 86 | PASSED |
| CC-P2-GATE-07 | A meaningful baseline subset is verified | OPEN |
| CC-P2-GATE-08 | Evidence dossiers meet the research standard | OPEN |
| CC-P2-GATE-09 | Public surfaces accurately label incompleteness | OPEN |
| CC-P2-GATE-10 | Build Board accurately reports proof gaps | OPEN |
| CC-P2-GATE-11 | Source and claim audit passes | OPEN |
| CC-P2-GATE-12 | Production deployments are verified | OPEN |
| CC-P2-GATE-13 | Build Board protection is confirmed or risk remains visibly open | OPEN |
| CC-P2-GATE-14 | Modeling remains 0% unless actual modeling occurs | PASSED |
| CC-P2-GATE-15 | Legal review remains 0% unless actual legal review occurs | PASSED |
| CC-P2-GATE-16 | Overall progress is regenerated from evidence | PASSED |

## 11. Baseline

2/86 → 2/86

## 12. P0

0 open

## 13. Validators

| Command | Result |
|---|---|
| `pnpm phase2:validate` | PASSED |
| `pnpm research:validate` | PASSED |
| `pnpm proofpacket:validate` | PASSED (2 PP-FF-01 warnings) |
| `pnpm corpus:validate` | PASSED |
| `pnpm graph:validate` | PASSED |
| `pnpm baseline:validate` | PASSED (2/86) |
| `pnpm institution:validate` | PASSED |

## 14. Files Changed

- claim_ledger, prediction_ledger, decisions.json (CC-DEC-103)
- governance packet + queue APPLIED
- first_20 matrix/lineage, ontology rule
- knowledge_graph, build state, return report
- `scripts/run-phase21-apply-chatgpt-claim-governance.mjs`

## 15. Commit Hash

_(working tree; commit only if requested)_

## 16. Remaining Blockers

1. 8/20 below-STRONG fit
2. CC-CLAIM-003 still NEE
3. Leakage operationalization (CC-RQ-P21-028)
4. Baseline 2/86
5. GATE-02 open

## 17. Exact Next Slice

`CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0`
