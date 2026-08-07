# Return — CC-PHASE-2.1-PRIORITY-CLAIM-REWRITE-AND-P0-CLOSEOUT-1.0

**Date:** 2026-08-07  
**Repository:** `H:\constitutional-capitalism`  
**HEAD base:** `d2f394c` (working-tree return; commit when authorized)  
**Phase 2:** **PARTIAL**  
**Slice type:** Claim integrity — no doctrine, no architecture, no modeling theater

---

## 1. Executive summary

This slice closed **all 9 P0 research questions**, filed **governed rewrite/retire proposals** without silently mutating canonical claim text, formally recommended retirement of **CC-CLAIM-009** into the prediction ledger, registered **3** new primary sources (`CC-SRC-091`–`093`), and re-scored first-20 fits.

**Result:** claims are more defensible and process-honest. GATE-02 remains **PARTIAL / REMAINS OPEN** because weak-fit claims and pending rewrite approvals still block substantive closure. Baseline unchanged at **2/86**.

Key movement:

| Metric | Before | After |
|---|---:|---:|
| P0 open | 9 | **0** |
| Weak-fit (PARTIAL/WEAK/NON-SUPPORTING) | 13 | **12** |
| Direct/Strong fit | 7 | **7** |
| Sources | 90 | **93** |
| Canonical claim texts mutated | — | **0** |
| GATE-02 | open | **open** |

---

## 2. P0 closeout

**Closed: 9 / Open: 0**

| RQ | Status |
|---|---|
| CC-RQ-P21-005 | CLOSED — QUALIFIES |
| CC-RQ-P21-008 | CLOSED — QUALIFIES |
| CC-RQ-P21-014 | CLOSED — QUALIFIES |
| CC-RQ-P21-022 | CLOSED — QUALIFIES |
| CC-RQ-P21-024 | CLOSED — QUALIFIES |
| CC-RQ-P21-025 | CLOSED — QUALIFIES |
| CC-RQ-P21-027 | CLOSED — QUALIFIES |
| CC-RQ-P21-AUD-001 | CLOSED — QUESTION INVALID / MISFRAMED |
| CC-RQ-P21-AUD-009 | CLOSED — QUALIFIES |

Ledger: `research/phase_2/p0_closeout_ledger.json` · `reports/CC_PHASE_2_P0_CLOSEOUT_LEDGER.md`

No P0 forced closed without evidence. Closing a bibliography/discipline question does **not** upgrade CC-CLAIM-003.

---

## 3. Four rewrite-required claims (plus optional fifth)

Canonical wording **unchanged**. All `approval_status: PENDING`.

| Claim | Current → Proposed (summary) |
|---|---|
| **001** | Sweeping “capitalism produced prosperity” → scoped association with exceptions |
| **010** | Ownership redesign forecast → concentration fact + labeled untested prediction |
| **016** | Online commerce “extract/leakage” → retail share fact + leakage as research agenda + Wayfair caution |
| **017** | “Threaten ownership security” → burden/liquidity + targeted relief + tax as local revenue |
| **006** (optional) | Relocation+decline package → structural decline sourced; relocation plausible/separate |

Full candidates: `reports/CC_PHASE_2_PRIORITY_CLAIM_REWRITE_CANDIDATES.md`  
Governance queue: `research/phase_2/claim_change_governance_queue.json`

---

## 4. CC-CLAIM-009

**Retirement decision:** `retirement_recommended` / **PENDING** governance approval

- Original claim preserved in ledger (`lifecycle_status: retirement_recommended`)
- Migrated concept to `data/project/prediction_ledger.json` as **`CC-PRED-009`**
- Not deleted
- Evidence failure: unsupported forecast; no diagnosis sources; fails fit
- Knowledge graph edge: `retirement_recommended_by`

Criteria satisfied for **recommendation**; full retirement awaits Steve approval (no autonomous approval mechanism invented).

---

## 5. First-20 dispositions (before → after)

| Disposition | Before | After |
|---|---:|---:|
| SUPPORTED AS WRITTEN | 2 | **2** |
| SUPPORTED WITH QUALIFICATION | 9 | **9** |
| NOT ENOUGH EVIDENCE | 4 | **4** |
| CONTRADICTED | 0 | **0** |
| REWRITE REQUIRED | 4 | **4** (still pending approval) |
| RETIRE | 1 | **1** (formalized recommendation) |

Dispositions did not inflate: rewrite approvals have not landed, so Qualifies/Supports counts stay honest.

---

## 6. Source-to-claim fit (before → after)

| Fit | Before | After |
|---|---:|---:|
| DIRECT | 2 | **2** |
| STRONG | 5 | **5** |
| PARTIAL | 5 | **5** |
| WEAK | 2 | **2** |
| NON-SUPPORTING | 6 | **5** |
| N/A — retired | 0 | **1** (009) |

**Weak-fit claims: 13 → 12** (009 removed from active weak set).

Proposed fits *if rewrites approved* would further improve 016/017/006/010 — recorded in candidates, not applied.

---

## 7. Claim defect categories

| Category | Claims |
|---|---|
| WORDING TOO BROAD | 001, 017 |
| FORECAST WITHOUT MODEL | 009, 010 |
| CAUSAL OVERREACH | 003, 006, 016 |
| SOURCE GAP | 007, 008, 018 |
| MEASUREMENT MISMATCH | 005, 013, 020 |
| (none / healthy) | 002, 004, 011, 012, 014, 015, 019 |

---

## 8. Sources added

| ID | Title |
|---|---|
| CC-SRC-091 | BLS MLR — Measuring labor market concentration using the QCEW (2024) |
| CC-SRC-092 | FEC Campaign Finance Data portal |
| CC-SRC-093 | FEC Campaign Finance Statistics tables |

Registry total: **93**.

---

## 9. GATE-02 determination

```text
PARTIAL / REMAINS OPEN
```

Exact blockers:

```text
GATE-02 remains open:
- 12/20 claims remain below STRONG source-to-claim fit (PARTIAL/WEAK/NON-SUPPORTING); 7/20 are DIRECT/STRONG
- 0 P0 questions remain open (9/9 closed this slice)
- 5 claims require governed rewrite approval before canonical wording can improve fit
- Political accountability (CC-CLAIM-003) remains NOT ENOUGH EVIDENCE despite FEC bibliography spine
- Baseline still 2/86; three-layer presence is not three-layer proof
```

---

## 10. Baseline

**Before:** 2 / 86  
**After:** **2 / 86**  
Rewrites, P0 closures, and new sources were **not** counted as baseline completion.

---

## 11. Phase 2 gates

| Gate | Before | After |
|---|---|---|
| GATE-03 | passed | passed |
| GATE-02 | open | **open** (updated forensic note) |
| Required open | 10/16 | **10/16** |
| Phase 2 | PARTIAL | **PARTIAL** |

---

## 12. Validators

(See session run — expected PASS on phase2/research/proofpacket/corpus/graph/baseline.)

---

## 13. Files changed (principal)

- `data/research/source_registry.json`
- `data/research/claim_ledger.json` (metadata/repair/retirement fields; **no claim_text overwrites**)
- `data/research/research_questions.json`
- `data/project/prediction_ledger.json` (`CC-PRED-009`)
- `data/research/knowledge_graph.json`
- `data/project/phase2_acceptance_checklist.json`
- `research/phase_2/p0_closeout_ledger.json`
- `research/phase_2/priority_claim_rewrite_candidates.json`
- `research/phase_2/claim_change_governance_queue.json`
- `research/phase_2/claim_repair_matrix.json`
- `research/phase_2/first_20_claim_evidence_matrix.json`
- `reports/CC_PHASE_2_P0_CLOSEOUT_LEDGER.md`
- `reports/CC_PHASE_2_PRIORITY_CLAIM_REWRITE_CANDIDATES.md`
- `reports/CC_PHASE_2_CLAIM_REPAIR_MATRIX.md`
- `reports/CC_PHASE_2_1_PRIORITY_CLAIM_REPAIR_DELTA.md`
- `scripts/run-phase21-claim-repair.mjs`

---

## 14. Commit hash

Working tree on `d2f394c`. Commit when Steve authorizes.

---

## 15. Remaining proof blockers

1. Governed approval of rewrite/retire queue (`CC-CHG-P21-*`)
2. CC-CLAIM-003 still NEE (FEC spine ≠ capture proof)
3. 12 weak-fit claims until approvals + further sourcing
4. Baseline 2/86
5. Legal review 0%
6. Modeling deferred predictions (009/010)

---

## 16. Exact next recommended slice

```text
CC-PHASE-2.1-GOVERNED-CLAIM-APPROVAL-AND-SUBSTANTIVE-DOMAIN-DEEPENING-1.0
```

Purpose: Steve reviews PENDING change queue (approve/reject rewrite & 009 retirement); apply only approved mutations; then deepen remaining CRITICAL GAP domains (political power identification; internet leakage studies) and advance GATE-02 only if criteria truly move.
