# Return — CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0

**Date:** 2026-08-07  
**Repository:** `H:\constitutional-capitalism`  
**HEAD (pre-commit):** see git (`git rev-parse HEAD`) — this return ships as working-tree changes pending Steve commit  
**Phase 2 status:** **PARTIAL** (unchanged completion posture)  
**Infrastructure freeze:** Observed (no new platforms)

---

## 1. Executive summary

This slice attacked **substance**, not structure. It:

- Built the eight-domain research coverage matrix from the **canonical** priority domains
- Forensically re-audited **CC-CLAIM-001 through CC-CLAIM-020**
- Registered **10** new verified sources (`CC-SRC-081`–`090`) for weakest claims first
- Triaged `CC-RQ-P21-001`–`027` (+ audit RQs) into P0–P3
- Produced claim evidence matrix, evidence delta, and integrity report
- Evaluated **GATE-02** against existing criteria without changing them

**Result:** evidence quality and claim honesty improved. Doctrine unchanged. Baseline unchanged at **2/86**. GATE-02 **PARTIAL / REMAINS OPEN**.

Honest disposition tally:

| Disposition | Count |
|---|---:|
| SUPPORTED AS WRITTEN | 2 |
| SUPPORTED WITH QUALIFICATION | 9 |
| NOT ENOUGH EVIDENCE | 4 |
| CONTRADICTED | 0 |
| REWRITE REQUIRED | 4 |
| RETIRE | 1 |

Operational metric: **confidence earned per claim tested** — not overall %.

---

## 2. Eight-domain coverage (before → after)

Canonical domains (from mission lock — not invented):

| Domain | Before (honest) | After coverage |
|---|---|---|
| Wealth and ownership | Strong facts / weak predictions | **ADEQUATE** (legal CRITICAL GAP) |
| Wages and productivity | Thin monopsony | **ADEQUATE** (015 sourced) |
| Taxation | Thin incidence | **THIN→improving** (014 sourced; legal CRITICAL GAP) |
| Corporate power / concentration | Measurement only | **THIN** |
| Worker ownership | Adequate conditional | **ADEQUATE** |
| Local and rural | Adequate structural | **ADEQUATE** |
| Internet commerce | Architecture only | **THIN** (scale+Wayfair; leakage open) |
| Political and economic power | Critical gap | **CRITICAL GAP** (still) |

Full matrix: `research/phase_2/priority_domain_research_matrix.json` · `reports/CC_PHASE_2_PRIORITY_DOMAIN_RESEARCH_MATRIX.md`

---

## 3. First 20 claim audit

### Supported as written (2)
- `CC-CLAIM-011`, `CC-CLAIM-012` (wealth concentration / limited ordinary share)

### Supported with qualification (9)
- `002`, `004`, `005`, `006`, `013`, `014`, `015`, `019`, `020`

### Not enough evidence (4)
- `CC-CLAIM-003`, `CC-CLAIM-007`, `CC-CLAIM-008`, `CC-CLAIM-018`

### Contradicted (0)
None. No registered evidence strong enough to warrant Contradicts as investigative verdict.

### Rewrite required (4)
- `001`, `010`, `016`, `017` (proposed replacements recorded; originals preserved)

### Retire (1)
- `009` (unsupported system-level prediction → prediction ledger)

Matrix: `reports/CC_PHASE_2_FIRST_20_CLAIM_EVIDENCE_MATRIX.md`

---

## 4. Evidence quality delta

| Metric | Before | After |
|---|---:|---:|
| Registered sources | 80 | **90** |
| First-20 with Supports/Qualifies dispositions | ~9 partial/supported mix | **11** Supported-as-written or with-qualification |
| Claims newly given official/peer spines | — | **014, 015, 020** (+016/017 partial) |
| Baseline | 2/86 | **2/86** |
| GATE-02 | open | **open** |

Source count is secondary. The real gain is **fit honesty** and three previously empty claims now Qualifies-capable.

Delta file: `reports/CC_PHASE_2_1_EVIDENCE_DELTA.md`

---

## 5. Contrary evidence discoveries

- **Wayfair** (`CC-SRC-086`): kills pre-2018 untaxed-remote-sales tropes for CC-CLAIM-016
- **Brookings BPEA 1994** (`CC-SRC-090`): measurement dispute keeps productivity-pay at Qualifies
- **Lincoln Institute** (`CC-SRC-089`): documents burden **and** property-tax institutional strengths — softens “threaten ownership security”
- **CBO/CRS incidence** (`CC-SRC-083/084`): capital-majority agency assumptions qualify worker/consumer burden magnitudes
- **Concentration ≠ capture** restated for CC-CLAIM-003 (fit failure)

---

## 6. Research-question progress

Triage: `reports/CC_PHASE_2_1_RESEARCH_QUESTION_TRIAGE.md`

| Priority | Count (approx) | Progress |
|---|---:|---|
| P0 | 9 open | Partial: monopsony/incidence/Wayfair/e-commerce share advanced; claim validity blockers remain |
| P1 | open | Baseline attachments still open |
| P2/P3 | open | Deferred |

No question marked resolved merely because a source was located.

---

## 7. Baseline

**Before:** 2 / 86  
**After:** **2 / 86**  
No artificial movement. Discovered sources ≠ completed baseline metrics.

---

## 8. GATE-02 determination

```text
PARTIAL / REMAINS OPEN
```

Exact reason:

> GATE-02 remains open because only 11/20 audited claims have Supported/Supported-with-qualification dispositions; 13/20 have PARTIAL/WEAK/NON-SUPPORTING source-to-claim fit; 9 P0 research questions remain open; eight-domain matrix still includes THIN and CRITICAL GAP domains (internet commerce; political/economic power; taxation legal track). Three-layer presence is not three-layer proof.

---

## 9. Phase 2 gate scoreboard

| | Before retrofit+continuation | After this slice |
|---|---|---|
| GATE-03 | passed (9/9 presence) | passed |
| GATE-02 | open | **open** (forensic reason recorded) |
| Required gates open | 10/16 | **10/16** |
| Phase 2 | PARTIAL | **PARTIAL** |

---

## 10. Validators

All required validators **PASSED** on H: (2026-08-07):

- `pnpm phase2:validate` — PASSED (10/16 gates open; GATE-03 9/9; baseline 2/86)
- `pnpm research:validate` — PASSED (90 sources; 132 claims)
- `pnpm proofpacket:validate` — PASSED (2 prior PP-FF-01 contrary warnings)
- `pnpm graph:validate` — PASSED
- `pnpm corpus:validate` — PASSED
- `pnpm baseline:validate` — PASSED (2/86)
- `pnpm progress:generate` — overall 43% (not completion)

## 11. Files changed (principal)

- `data/research/source_registry.json` (+CC-SRC-081–090)
- `data/research/claim_ledger.json` (first-20 audit fields + support honesty)
- `data/research/research_questions.json` (+audit RQs)
- `data/research/knowledge_graph.json` (non-speculative audit links)
- `data/project/phase2_acceptance_checklist.json` (GATE-02 forensic note)
- `research/phase_2/*.json`
- `reports/CC_PHASE_2_*.md` / `CC_PHASE_2_1_*.md`
- `scripts/run-phase21-diagnosis-continuation.mjs`

## 12. Commit hash

Working-tree return on top of `d2f394c`. Commit when Steve authorizes.

---

## 13. Remaining blockers

1. GATE-02 substantive sourcing criteria unmet (see §8)
2. Political/economic power CRITICAL GAP
3. Internet-commerce leakage unproven
4. P0 questions still open
5. Baseline still 2/86
6. Legal track CRITICAL GAP across domains
7. Rewrite/retire proposals awaiting governed approval (001, 009, 010, 016, 017)

---

## 14. Exact recommended next slice

```text
CC-PHASE-2.1-PRIORITY-CLAIM-REWRITE-AND-P0-CLOSEOUT-1.0
```

Purpose: apply governed claim rewrites/retirements; close remaining P0 questions that block fit; deepen CRITICAL GAP domains (political power; internet leakage) with primary sources only; still no doctrine, no infrastructure, no baseline inflation.
