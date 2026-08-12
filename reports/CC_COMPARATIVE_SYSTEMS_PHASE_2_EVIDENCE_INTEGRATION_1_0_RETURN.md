# CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0 — Return

**Slice ID:** `CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0`  
**Status:** PASSED (priority wave)  
**Date:** 2026-08-12  
**Decision:** `CC-DEC-110`  
**Update:** `UPD-123`

## Scope executed

Upgraded the Comparative Systems Matrix from Phase 1 philosophical comparison toward Phase 2 evidence integration for **five priority systems**, binding existing publication evidence panels before creating new content.

### Question shift

| Before | After |
|---|---|
| What does this system claim? | What does existing evidence show when societies move toward this system? |

### Five layers (priority systems)

1. Definition (existing dossier)  
2. Observable outcomes (live `EvidencePanel` binds)  
3. Arkansas relevance  
4. Evidence supporting / contradicting / NEE  
5. Transition feasibility (constitutional → state amendment)

## Priority systems completed

| Slug | Panels bound (examples) |
|---|---|
| `constitutional-capitalism` | wealth, ownership, labor, competition, democracy, healthcare, ag, journalism |
| `plutocracy` | wealth, ownership, political money, trust |
| `crony-capitalism` | political money, sectoral influence, journalism, competition |
| `laissez-faire-capitalism` | wages/productivity, competition/entry-exit, wealth, healthcare, rural capital |
| `stakeholder-capitalism` | wealth, ownership, labor, human capital, rural capital |

## Holds preserved

- `CC-CLAIM-003` remains NEE  
- HYP-125 through HYP-129 not promoted  
- No causal claims from observational data  
- No new publication evidence panels in this wave  
- Status remains `developing_analytical_tool`

## Artifacts

| Artifact | Path |
|---|---|
| Program | `data/project/comparative_systems_phase2_evidence.json` |
| Demands | `data/project/CC_COMPARATIVE_SYSTEMS_PHASE2_DATA_DEMANDS.json` |
| Bind script | `scripts/bind-compare-phase2-priority.mjs` |
| Matrix field | `phase2_evidence` on 5 systems in `economic_system_comparison.json` |
| UI | `apps/book-site/src/pages/compare/[system].astro` live panels + layers |

## Remaining

35 of 40 systems still definition-only. Wave 2 queued: social democracy and near neighbors.

## Next

| Role | Slice |
|---|---|
| Compare Wave 2 | `CC-COMPARATIVE-SYSTEMS-PHASE-2-WAVE-2-SOCIAL-DEMOCRACY-AND-DIAGNOSTICS-1.0` |
| Structural | `CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0` |
