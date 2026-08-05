# Cursor Return — CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0

## 1. Mission ID

`CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0`

## 2. Final status

**PARTIAL / Phase 2.1 recommended** — priority domains first-pass complete; remaining domains foundational only. Gate expected green after this return.

## 3. Starting commit

`7184b70` (clean `main` at plan start; contrast fix)

## 4. Ending commit

`1117a1eb0b29000ed6a747819e291bed594240eb`

Message: `research: establish Constitutional Capitalism national diagnosis`

## 5. Branch

`main`

## 6. Core question answered (partially)

> What is the present condition of American economic and civic life, what forces produced it, who benefits, who bears its costs, and what evidence would justify restructuring the system?

First-pass sourced answers exist for priority domains. Causal political-accountability, internet-commerce leakage magnitudes, and most baseline indicators remain open.

## 7. Deliverables

### Architecture spines

- `content/research/national-diagnosis/` — 22 briefs (priority first-pass + foundational Phase 2.1 + worker-ownership)
- `content/evidence-companion/` — overview, template, 8 seeded dossiers
- `data/baseline/` — metrics, source map, methodology, status (2/38 sourced)
- `data/project/developing_doctrine.json`
- `data/project/transition_timeline.json`
- `data/testing/` + testing/pilot docs
- Validators: `pnpm research:validate`, `baseline:validate` (wired into `check:all`)

### Sources and claims

- **13** sources in `source_registry.json` (Fed SCF/DFA/FRED, BLS, EPI secondary, Census, Kruse/NCEO, USDA ERS, FDIC, CBO)
- **20** priority claims with support levels, contrary evidence, scopes, public wording
- Supported / partially supported examples: wealth concentration, productivity gap, EO (conditional), concentration measurement, rural indicators, CBO tax/transfer distribution

### Baseline

- `CC-IND-W01` SCF 2022 median net worth $192,900
- `CC-IND-W02` DFA Q1 2026 wealth shares
- No invented targets

### Public surfaces (book-site)

- `/where-we-are/`
- `/evidence/`, `/evidence/methodology/`, `/evidence/open-questions/`
- `/metrics/`

### Board surfaces

- Enriched `/research/`
- `/diagnosis/`, `/baseline/`, `/evidence/`
- Overview stats for sources, claims, baseline

### Parallel track (metadata only)

- `CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0` remains `queued_parallel` — no feedback backend in this mission

## 8. Progress honesty

- Research foundation / source verification raised only by measured source+claim+brief work
- Economic modeling: **0%**
- Legal review: **0%**
- Overall project % must not jump on scaffolding alone
- Foundational Philosophy remains ~70% (Phase 1)

## 9. Forbidden rules compliance

- No invented stats/sources
- Declaration not rewritten
- Predictions labeled unsupported
- No fake pilots/legal/modeling
- Contrary evidence preserved
- Nonpartisan diagnosis posture
- H:-only paths

## 10. Recommended next slice

`CC-PHASE-2.1-DIAGNOSIS-RESEARCH-CONTINUATION-1.0` (legacy short ID `CC-PHASE-2.1-DIAGNOSIS-CONTINUATION-1.0` retained as alias only)

- Full sourcing for housing, education, healthcare, transport/broadband, food, banking depth, trade, tech/AI, constitutional/legal, international, flourishing
- Expand baseline beyond wealth
- Deepen political-power and internet-commerce modules
- Attach additional CBO/BLS/Census series to baseline JSON with exact table citations

## 11. Validation

- `pnpm research:validate`
- `pnpm baseline:validate`
- `pnpm gate`

## 12. Deploy

Redeploy book + board Netlify sites after green gate and push to `main`.
