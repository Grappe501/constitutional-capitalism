# Three-Book Architecture

Status: architectural proposal (post–Phase 1)  
Last updated: 2026-08-04  
Related decision: `CC-DEC-030`

## Purpose

Constitutional Capitalism develops as **three parallel books**, not one overloaded manuscript.

Book One stays readable. Book Two holds rigor. Book Three holds implementation.

**Medium note (`CC-DEC-035`):** these books are content streams inside the living **Constitutional Capitalism Project** website. Book One functions as the public *Introduction*; the website is the school of thought.

## Book One — Constitutional Capitalism

**Subtitle:** Restoring Prosperity Through Constitutional Principles

| Attribute | Value |
|---|---|
| Audience | General public, civic readers, students |
| Tone | Readable, inspirational, philosophical |
| Location | `content/manuscript/` + public book-site |
| Role | The public argument and constitutional vision |

Book One must not be stuffed with every citation, model, or legislative schedule. It should end chapters with evaluation hooks (see chapter evaluation template), then point serious readers to Books Two and Three.

## Book Two — The Constitutional Capitalism Evidence Companion

Never intended for most readers.

| Attribute | Value |
|---|---|
| Audience | Policymakers, researchers, critics, serious reviewers |
| Tone | Rigorous, balanced, uncertainty-aware |
| Location | `content/evidence-companion/` + `data/research/` |
| Role | Evidence dossier for every factual claim in Book One |

### Entry pattern (per claim)

For each factual claim (example: “Worker ownership increases productivity”):

1. Supporting research  
2. Opposing research  
3. Limitations  
4. Confidence level  
5. Questions remaining  
6. Data sources  

Machine spine: `data/research/claim_ledger.json` + `source_registry.json`.  
Human-readable dossiers: `content/evidence-companion/`.

**Discipline:** No invented citations. Unsupported claims remain labeled unsupported.

## Book Three — The Constitutional Capitalism Implementation Manual

| Attribute | Value |
|---|---|
| Audience | Legislators, governors, agencies, reformers, implementers |
| Tone | Practical, sequential, measurable |
| Location | `content/implementation-manual/` + transition/policy data |
| Role | How a nation (or state) would actually implement the framework |

Includes:

- Year 1 / Year 2 / Year 5 pathways  
- Testing ladder and pilot programs  
- Metrics and dashboards  
- Economic models (when built; currently 0%)  
- Legislation sketches  
- Transition plans and failure modes  

Anchors: Part VI manuscript units, `transition_scenarios.json`, `national_baseline.json`, policy registers.

## Relationship diagram

```text
Book One (public argument)
    │
    ├── every factual claim ──► Book Two (evidence dossier)
    │
    └── every reform pathway ──► Book Three (implementation)
```

## What this protects

- Book One from becoming unreadable  
- Book Two from becoming advocacy without counter-evidence  
- Book Three from floating without constitutional principle  
- The project from confusing **principles**, **proposals**, **predictions**, and **evidence** (see Argument Layers Standard)

## Progress honesty

| Layer | Implication |
|---|---|
| Foundational philosophy ~70% | Book One spine advancing |
| Economic modeling 0% | Book Three models not started |
| Legal review 0% | Neither book cleared legally |
| Source verification ~2% | Book Two barely begun |

Phase 2 begins **building evidence**, not merely collecting notes.
