# Diagnosis Brief Standard

**Decision:** `CC-DEC-064`  
**Lock:** `data/project/phase2_mission_lock.json`  
**Slice:** `CC-PHASE-2.1-THREE-LAYER-PROOF-RETROFIT-EXECUTION-1.0`  
**Applies to:** `content/research/national-diagnosis/*`

## Purpose

Phase 1 stated belief. Phase 2 assembles proof. Diagnosis briefs must not quietly become advocacy.

## Mandatory three-layer rule

Every diagnosis brief (new or revised) must distinguish three layers:

1. **What the data directly establishes** — facts supported by registered sources (`CC-SRC-*`) for the specific claim made.
2. **What may reasonably be inferred** — plausible interpretation, labeled as inference, with contrary readings noted where relevant.
3. **What Constitutional Capitalism normatively concludes** — philosophical or design conclusions that follow from the framework, never presented as if they were empirical findings.

Required section headings (exact strings; validators check these):

```markdown
## What the data directly establishes

## What may reasonably be inferred

## What Constitutional Capitalism normatively concludes
```

## Phase 2.1 evidence-track treatment (priority briefs)

Inside or immediately before the three mandatory layers, priority briefs must also treat evidence along three **tracks**, populated only from registered sources:

1. **Historical evidence** — what registered sources establish about change over time.
2. **Economic evidence** — levels, shares, ratios, and distributional facts from registered sources.
3. **Constitutional / legal evidence** — registered legal or institutional sources only. If none are registered for the domain, write **MISSING EVIDENCE** and queue the gap. Do not invent case law, statutes, or doctrines as if sourced.

Recommended headings:

```markdown
## Evidence tracks

### Historical evidence

### Economic evidence

### Constitutional / legal evidence
```

## Claim assessments (Supports / Qualifies / Contradicts)

Where linked claims have enough registered evidence to judge, use exactly one investigative label per `research/proof_packets/standards/VERDICT_STANDARD.md`:

- **Supports** — registered evidence materially supports the claim within stated limits.
- **Qualifies** — partial, conditional, or overclaimed relative to evidence.
- **Contradicts** — strongest registered evidence undercuts the claim as stated.
- **Not Enough Evidence** — corpus insufficient; do not soft-land doctrine.

Assessments must cite `CC-SRC-*` / `CC-CLAIM-*` IDs. Unresolved gaps go to `data/research/research_questions.json`.

## Honesty rules

- No invented citations, statistics, or baseline values.
- Prefer **MISSING EVIDENCE** over filler prose.
- Contrary evidence must be recorded where it exists.
- Architecture, routes, and file scaffolding are not proof.
- Causal chains across domains must respect classifications in `data/research/system_interdependencies.json` (`documented` / `plausible` / `disputed` / `untested`).
- Do not double-count overlapping benefits.

## Completion posture

Meeting this standard for a brief does not complete Phase 2. Phase completion requires the full acceptance criteria in the mission lock. Three-layer retrofit closes GATE-03 presence; substantive sourcing (GATE-02) remains a separate bar.
