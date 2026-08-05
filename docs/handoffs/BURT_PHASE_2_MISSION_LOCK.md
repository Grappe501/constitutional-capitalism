# Burt Handoff — Phase 2 under Forensic Audit Governance

**Decision:** `CC-DEC-075` (extends `CC-DEC-064`)  
**Governance:** `data/project/forensic_audit_governance.json`  
**Checklist:** `data/project/phase2_acceptance_checklist.json`  
**Lock file:** `data/project/phase2_mission_lock.json`  
**Board:** `/phase-2-gate/`  
**Date:** 2026-08-05

## Central diagnosis

> **The architecture is ahead of the evidence.**

That is not failure. Convert structure into proof before constitutional design or policy.

## Controlling objective

> **Make Phase 2 true in substance, not merely complete in structure.**

## Official active state

```text
Phase 1: LOCKED / CLOSED
Phase 2: PARTIAL
Mission: CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0
Forensic audit overall snapshot: 36%
Overall (regenerated): read progress_snapshot — not a completion claim
Economic Modeling: 0%
Legal Review: 0%
Baseline: 2 of 86 meaningfully sourced
Current risk: polished surfaces may overstate evidentiary maturity
Primary question: What can we prove?
```

## Burt’s active authority

Work **only through steps 1–13**.

Do **not** begin steps 14–25 (no Phase 3 constitution, Phase 4 policy architecture, Phase 5 modeling theater, legal conclusions without review, major manuscript expansion, full civic-feedback activation, or HFI launch claims).

### Steps 1–13

1. Reconcile acceptance criteria (canonical checklist owns conflicts)
2. Retrofit three-layer rule into substantive briefs
3. Complete eight priority sourced passes
4. Audit priority claims (honest classifications; wording ≤ evidence)
5. Repair baseline (86 total; keep **2 of 86** visible until count changes)
6. Build meaningful evidence dossiers
7. Continue Phase 2.1 domains only after priority eight are materially sound
8. Source-and-claim forensic audit
9. Reconcile deployment truth (verify production; do not assume HEAD is live)
10. Protect the Build Board (civic deliberation stays gated)
11. Expand knowledge graph carefully (documented / plausible / disputed / untested)
12. Source first HFI measures
13. Source first child-flourishing measures

## Honest outcomes

```text
Outcome A — Phase 2: COMPLETE (checklist passes)
Outcome B — Phase 2: PARTIAL → CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0
```

## Working rule

> **Do not build the constitution of the new system until the diagnosis of the current system can withstand an informed critic.**

## Three-layer rule

Every substantive diagnosis brief must separate:

1. What the evidence directly establishes  
2. What may reasonably be inferred  
3. What Constitutional Capitalism normatively concludes  

Standard: `content/research/national-diagnosis/DIAGNOSIS_BRIEF_STANDARD.md`  
Enforcement: `pnpm phase2:validate`

## Supporting slice (queued)

`CC-PHASE-2-PUBLIC-STATISTICS-BRIDGE-1.0` (`CC-DEC-076`/`077`) — RedDirt at `H:\SOSWebsite\RedDirt` is the RCIP Public Data Engine; CC never duplicates agency connectors; consumes named validated measures + provenance only. Architecture does not raise baseline `2/86`. See `docs/architecture/REDDIRT_CIVIC_INTELLIGENCE_PLATFORM.md`.

## Validation

```powershell
cd H:\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\enter-cc-environment.ps1
pnpm env:verify
pnpm phase2:validate
pnpm imports:validate
pnpm gate
```

## Hard rules

- H:-only
- Never invent citations, stats, or baseline values
- Do not rewrite the Declaration
- Do not inflate modeling/legal progress
- Never revive 38-metric baseline narratives
- Source of truth is `data/` and `content/`, not dashboard polish
