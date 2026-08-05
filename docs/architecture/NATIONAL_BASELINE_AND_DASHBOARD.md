# National Baseline and Dashboard

Status: architectural proposal (post–Phase 1)  
Last updated: 2026-08-04  
Related decision: `CC-DEC-033`  
Data: `data/project/national_baseline.json`

## Reframe

Phase 2 is not primarily “what’s wrong with America?”

Phase 2 begins with:

> **If Constitutional Capitalism were adopted tomorrow, what would we measure so that we could honestly determine whether it succeeded?**

That question creates a **National Baseline** — a pre-commitment to evidence before conclusions.

## Purpose

1. Define success criteria before advocacy hardens.  
2. Separate diagnosis (current readings) from prescription (proposed reforms).  
3. Give Book Three and Part VI a shared measurement spine.  
4. Prevent moving goalposts after implementation begins.

## Dashboard domains

| Domain | Example measures |
|---|---|
| Wealth | Median household wealth; net worth by decile; asset ownership; homeownership; retirement ownership |
| Labor | Wage growth; productivity; ownership; job mobility; apprenticeships |
| Business | Startup rate; business survival; local ownership; small-business lending |
| Competition | Market concentration; new entrants; antitrust activity |
| Communities | Main Street occupancy; rural population; hospital access; local banking; volunteerism |
| Families | Marriage; birth rates; child poverty; household savings |
| Democracy | Voter participation; civic engagement; public trust; local participation |
| Government | Revenue; spending; debt; regulatory burden |
| Innovation | Patents; AI investment; research; manufacturing |

Exact series, agencies, and methodologies are recorded in `national_baseline.json` as they are sourced. Until sourced, indicators remain `baseline_pending`.

## Rules

- No fabricated baseline numbers.  
- Every published indicator needs a source ID when populated.  
- Predictions about future movement belong in the prediction ledger, not the baseline.  
- Baseline answers “where are we now?” Evaluation answers “did the framework work?”

## Link to chapter endings

Each chapter’s **Success Metrics** section should map to one or more dashboard indicators where possible.

## Link to Constitutional Capitalism Test

Question 10 of the Test (“Is there a measurable way to determine whether it worked?”) should normally cite dashboard indicators or pilot metrics.
