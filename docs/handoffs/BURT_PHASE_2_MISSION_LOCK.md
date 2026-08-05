# Burt Handoff — Phase 2 Mission Lock

**Decision:** `CC-DEC-064`  
**Lock file:** `data/project/phase2_mission_lock.json`  
**Date:** 2026-08-04

## Official active state

```text
Phase 1: ACCEPTED / CLOSED
Current mission: CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0
Evidence/Baseline slice: ABSORBED ALIAS
Civic deliberation: APPROVED PARALLEL / NOT ACTIVE IN THIS MISSION
Current HEAD: read from git (authorization-era note 7184b70 is historical)
Overall baseline: read from progress snapshot (honest; do not hardcode)
Primary question: What can we prove?
```

## Frame

- **Phase 1 = belief; Phase 2 = proof**
- Diagnosis is the active mission
- Evidence and baseline are deliverables inside this mission, not competing slices
- Eight priority domains receive real sourcing; remaining domains may honestly roll into Phase 2.1
- Modeling and legal review stay at **0%**
- Civic deliberation remains approved but separate
- No public feedback backend touches the unprotected Build Board

## Mandatory research rule

> Every diagnosis brief must distinguish three layers: what the data directly establishes, what may reasonably be inferred, and what Constitutional Capitalism normatively concludes.

Standard: `content/research/national-diagnosis/DIAGNOSIS_BRIEF_STANDARD.md`

## Acceptance criteria

Do **not** call Phase 2 complete because architecture, routes, and files exist. Minimum completion requires:

- all 21 diagnosis briefs created
- the eight priority domains receiving substantive sourced first passes
- the 20 priority claims classified
- contrary evidence recorded where it exists
- a meaningful subset of baseline metrics populated with verified data
- the public evidence surfaces rendering source-backed content
- the Build Board accurately reporting gaps
- all new schemas and validators passing
- a full source and claim audit
- no inflated progress
- green gate, commit, push, and verified deployments

If those conditions are not met, return:

```text
Phase 2 status: PARTIAL
Next slice: CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0
```

## Doctrine capture

Post–Phase 1 ideas are indexed in `developing_doctrine.json` → `capture_clusters` (`CC-DCC-01`–`15`), tagged with maturity, evidence status, affected domains, constitutional questions, implementation level, risks, and Phase 3/4 destination. Not final doctrine.

## System interdependencies

`data/research/system_interdependencies.json` maps cross-domain chains (e.g., education→…→community retention; resource extraction→…→regenerative restoration). Classify links as documented / plausible / disputed / untested. Prevent double counting and unsupported causal chains.

## Hard rules

- H:-only
- Never invent citations, stats, or baseline values
- Do not rewrite the Declaration
- Do not inflate modeling/legal progress
- Source of truth is `data/` and `content/`, not dashboard UI

## Bootstrap

```powershell
cd H:\Constitutional-Capitalism
powershell -ExecutionPolicy Bypass -File scripts\enter-cc-environment.ps1
pnpm env:verify
pnpm gate
```
