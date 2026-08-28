# Causal Relationship Modeling Standard

Last updated: 2026-08-28

Status: canonical planning standard — pre-code

## Purpose

This document governs how Constitutional Capitalism converts doctrine, proposals, and research hypotheses into relationships that may eventually participate in the Systems Intelligence Engine and National Debt & Prosperity simulator.

The model is not allowed to prove the doctrine by assumption. Doctrine supplies questions. Evidence supplies parameters. Simulation exposes consequences, tradeoffs, failure modes, and uncertainty.

## Core rule

A connection between two concepts is not a causal relationship merely because the project expects, hopes, or proposes that one will affect the other.

Every candidate relationship must be represented explicitly and classified by evidence strength before it can influence public simulation.

## Relationship contract

Every relationship must define:

- stable ID
- source variable
- destination variable
- direction of expected effect
- proposed mechanism
- evidence state
- parameter status and plausible range
- time lag
- geographic scope
- affected populations
- dependencies and complements
- countervailing forces
- nonlinearities and thresholds
- distributional consequences
- source requirements
- confidence
- public-simulation status

No hidden coefficients are allowed.

## Epistemic states

1. **Established causal relationship** — the relationship is structurally or empirically well established.
2. **Strongly supported causal inference** — credible empirical evidence supports causality, but magnitude still depends on context.
3. **Observed correlation** — variables move together; causality remains unresolved or mixed.
4. **Plausible mechanism** — the pathway is economically or institutionally coherent but lacks sufficient causal evidence.
5. **Project assumption** — a stated assumption used for exploratory scenario work.
6. **Illustrative parameter** — a deliberately hypothetical value used to show mechanics, never presented as evidence.
7. **Unresolved hypothesis** — a research question awaiting evidence.
8. **Normative only** — a value or constitutional preference that should not be represented as an empirical causal claim.

## Public simulation gates

A relationship may be used in a public-facing numeric scenario only when:

1. the current baseline is bound to a dated source;
2. the relationship's evidence state is visible;
3. the parameter or parameter range is sourced or explicitly labeled as an illustrative scenario;
4. time lag and geographic scope are represented;
5. known dependencies and countervailing forces are included;
6. the model exposes uncertainty and sensitivity;
7. the calculation can be reproduced from documented inputs;
8. users can inspect the source trail;
9. the interface does not label a scenario as a forecast;
10. contradictory evidence is not suppressed.

## Relationship types

The Systems Intelligence Engine should support at least:

- increases
- decreases
- enables
- constrains
- funds
- requires
- substitutes for
- complements
- creates risk for
- affects after delay
- changes distribution of
- changes geographic location of
- creates threshold effect in
- reinforces
- balances

## Time

Every model must make time visible. Approved planning horizons are:

- Year 1
- Year 5
- Year 10
- Year 20
- Year 30
- Year 50
- Year 70

The model must distinguish upfront cost from operating cost, maintenance cost, delayed benefits, replacement cycles, and terminal or residual asset value.

## Geography

Relationships may differ across:

person → household → family → neighborhood → community → county → region → state → nation.

National averages may not overwrite local constraints. A policy that appears beneficial nationally may harm a community, and a community benefit may not scale nationally.

## Distribution

Each relationship must ask who pays and who benefits. At minimum, assess when relevant:

- federal government
- state government
- local government
- households
- workers
- employers
- investors
- taxpayers
- renters
- homeowners
- rural communities
- urban communities
- age cohorts
- income groups
- future generations

A federal budget saving that merely shifts greater cost to states or households is not automatically a national saving.

## Productive debt test

Debt-financed investment must be evaluated as a full balance-sheet transaction rather than spending alone.

For every proposed investment, calculate or research:

1. financing cost;
2. operating cost;
3. maintenance and replacement cost;
4. direct public asset created;
5. induced or complementary private investment;
6. effect on productive capacity;
7. effect on household costs or income;
8. effect on tax revenue;
9. effect on other public expenditures;
10. residual asset value;
11. risks and downside cases;
12. whether the realized social/fiscal return exceeds the cost of capital.

The model must allow productive-debt proposals to fail this test.

## Complements and binding constraints

Constitutional Capitalism frequently proposes systems rather than isolated programs. The simulator therefore needs a `what_must_also_be_true` layer.

Example: a regional agricultural academy may fail to create regional prosperity if housing, employers, healthcare, transportation, broadband, land access, processing capacity, or capital are binding constraints.

The simulator should be able to compare:

- intervention alone;
- intervention plus partial complements;
- intervention plus full system;
- no intervention baseline.

## Feedback loops

The first registry recognizes five priority loops:

### Rural prosperity reinforcing loop
skills → jobs → household retention → tax base → public services → location attractiveness → household retention

### Housing constraint balancing loop
jobs/population → housing demand → housing cost → reduced in-migration

### Productive debt loop
borrowing → productive investment → productive capacity → income/tax base → fiscal return → debt-service capacity

### Interest pressure loop
debt → interest cost → deficit → debt

### Family and human-capital loop
family stability/child investment → human capital → earnings/assets → future family stability/child investment

Feedback loops are not guaranteed outcomes. Each edge retains its own evidence label and may weaken, reverse, or break.

## First demonstration case: Rose Bud agricultural academy

The first community digital-twin scenario should test a hypothetical agricultural magnet / regional academy in Rose Bud, Arkansas.

The academy itself is only one input. The model must include at least:

- capital and operating costs
- student capacity and program mix
- apprenticeship and student-enterprise capacity
- employer and farm participation
- housing supply
- childcare
- healthcare
- broadband
- transportation
- teacher supply
- land access
- farm profitability
- processing and market access
- startup capital
- population composition
- school enrollment
- tax base
- public-service costs
- business formation
- farm succession
- household/family proximity
- state and federal fiscal effects

Required scenario horizons: 1, 5, 10, 20, 30, 50, and 70 years.

Required cases: baseline, downside, central scenario, upside, academy without complements, academy with full complements.

No numeric Rose Bud outcome should be published until local baseline data and causal ranges are sourced.

## Model honesty rules

- Never invent a multiplier.
- Never hide a parameter.
- Never convert correlation into causation without labeling the change.
- Never use a national estimate as a local estimate without adjustment and warning.
- Never collapse human flourishing into GDP alone.
- Never count the same benefit twice through different pathways.
- Never treat a transfer between government levels as a national saving without netting the receiving burden.
- Never count gross job creation without accounting for displacement when material.
- Never assume a project reaches full utilization.
- Never assume a 30-, 50-, or 70-year estimate becomes more certain merely because the model can calculate it.

## Canonical files

- `data/project/causal_relationship_registry.json` — machine-readable causal graph seed
- `data/project/constitutional_capitalism_doctrine_model_inventory.json` — doctrine-to-model inventory
- `docs/architecture/DOCTRINE_TO_MODEL_CROSSWALK.md` — human-readable crosswalk
- `docs/architecture/NATIONAL_DEBT_AND_PROSPERITY_MODELING_SYSTEM.md` — National Debt & Prosperity architecture
- `data/project/systems_intelligence_engine_framework.json` — intended whole-system capstone architecture

## Next build

`CC-BASELINE-AND-DATA-SOURCE-INVENTORY-1.0`

That build should identify every authoritative dataset required to populate current-state variables before numeric simulator implementation begins.

Code gate remains **CLOSED**.
