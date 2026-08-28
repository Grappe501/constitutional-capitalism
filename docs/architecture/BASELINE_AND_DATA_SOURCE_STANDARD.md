# Baseline and Data Source Standard

Last updated: 2026-08-28

Status: canonical planning standard — pre-code

Slice: `CC-BASELINE-AND-DATA-SOURCE-INVENTORY-1.0`

## Purpose

The Systems Intelligence Engine cannot model consequences honestly until it knows what exists now. This standard governs how Constitutional Capitalism defines, sources, stores, refreshes, and displays baseline facts for the National Debt & Prosperity model and future community digital twins.

The baseline is not a collection of convenient numbers. It is a reproducible, dated picture of a system.

## Core rule

**First-party data owns the baseline whenever a suitable first-party measure exists.**

Constitutional Capitalism doctrine may determine what questions we ask. It may not determine the answer to a baseline question.

Every public number must be traceable to a source, definition, geography, reference period, vintage, unit, transformation, and retrieval date.

## Baseline versus projection versus simulation

The product must visibly distinguish four things:

1. **Observed baseline** — an official statistic or administrative record describing a measured past/current condition.
2. **Official estimate** — an agency-modeled measure, such as a small-area health estimate.
3. **Institutional projection** — a CBO, agency, or other authorized forecast/baseline projection.
4. **Project simulation** — a Constitutional Capitalism scenario generated from explicit assumptions and causal parameters.

A CBO baseline projection is not an observed fact. A CDC small-area modeled estimate is not a direct survey observation. A Constitutional Capitalism scenario is not a forecast.

## Authoritative source hierarchy

### Tier 1 — primary federal statistical and administrative sources

Use these as the default owners of national baselines:

- Congressional Budget Office — current-law budget and economic baseline, long-term fiscal projections
- U.S. Treasury / FiscalData — actual debt, financing, cash, interest, security structure
- Office of Management and Budget — federal budget history, executive budget, agency accounts
- Bureau of Economic Analysis — national accounts, GDP, regional GDP and personal income
- Bureau of Labor Statistics — employment, unemployment, wages, occupations, prices, productivity
- U.S. Census Bureau — population, ACS, migration, housing, business, government finance, resilience
- IRS — tax and income administrative statistics where appropriate
- CMS — Medicare, Medicaid, national health expenditures and program data
- CDC — health outcomes, prevention, disability, behavioral and small-area health estimates
- USDA ERS / NASS — agriculture, farm structure, rural economy, food access and environment
- EIA — energy production, generation, prices, consumption and capacity
- FERC / DOE — transmission, grid markets, interconnection, reliability and planning
- NCES — elementary, secondary and postsecondary education data
- HUD — affordability, housing programs, fair-market-rent and housing research datasets
- Federal Reserve — monetary/financial conditions, Treasury holdings, household finance and credit

### Tier 2 — state and local primary sources

Community and state models should prefer official state/local administrative records when those records are more granular or current than national aggregates.

Examples include state budget offices, education departments, health departments, DOTs, utility commissions, workforce agencies, audited local financial statements, assessor records, school district records, planning records and public utilities.

### Tier 3 — research used for causal parameters

Peer-reviewed research and credible research institutions are often necessary to estimate elasticities, multipliers, lags and causal effects. They do not automatically replace first-party data as the baseline owner.

### Tier 4 — context only

Industry reports, trade associations, advocacy research, private datasets and journalism can identify questions or provide context. They must not silently become canonical baseline owners when authoritative public data exist.

## Source ownership examples

### Federal debt

CBO provides the current-law baseline against which policy changes are compared. Treasury provides actual debt and financing records. Both are required because they answer different questions.

### Population

The Census Population Estimates Program is the preferred current population estimate. ACS is used for household, income, housing, education, commuting and other characteristics. Do not substitute an ACS population characteristic estimate for the official population estimate without documenting why.

### Local health

CDC PLACES provides valuable county/place/tract/ZCTA health measures, but many are model-based small-area estimates. The public interface must disclose this rather than displaying them as direct local survey observations.

### Housing

ACS supplies local housing structure. HUD supplies affordability constructs and housing-program measures. Federal Reserve and other official series may be needed for financing conditions. One housing number cannot represent the housing system.

## Required baseline record

Every stored baseline observation must include at minimum:

- stable variable ID
- public display name
- exact definition
- value
- unit
- geography type and identifier
- reference period
- vintage
- source agency
- source dataset
- source table or series
- source URL/API descriptor
- retrieval date/time
- epistemic class
- revision status
- transformation applied
- confidence
- notes

When applicable, also retain margin of error, confidence interval, suppression flags, seasonal adjustment, inflation basis, price base year, geography crosswalk method, and prior-vintage value.

## Revision and vintage doctrine

Economic and demographic data are revised. Revision is not an error.

The system must preserve enough metadata to reproduce what the public saw at a particular time while allowing the current dashboard to use the latest accepted vintage.

For Census Population Estimates, the latest vintage may supersede earlier estimates for prior years under the agency's stated methodology. The system should preserve the old vintage for historical reproducibility while marking the newer vintage as current.

## Geography doctrine

The engine needs a stable crosswalk among:

- nation
- state
- county
- Census place
- census tract
- ZCTA
- school district
- metro/micropolitan area
- regional or commuting geography
- utility/service territory when required
- custom Constitutional Capitalism regional hub definitions

A custom region must never masquerade as a federal statistical geography. Its component geographies and aggregation method must be inspectable.

## Community Digital Twin rule

A Community Digital Twin is not a decorative map. It is a joined baseline across population, households, labor, housing, education, health, business, agriculture, transportation, infrastructure, public finance and other relevant systems.

A community twin may contain missing values. Missing is preferable to invented.

## Rose Bud first twin

The first demonstration twin should establish a reproducible baseline for Rose Bud and its surrounding functional region before the agricultural-academy scenario is parameterized.

Minimum categories include:

- population and age structure
- households and family structure
- student population and school enrollment
- education attainment
- labor force, occupations, industries and wages
- commuting and travel-to-work patterns
- housing stock, occupancy, tenure, rents and values
- health access and locally supportable health indicators
- food access and agricultural structure
- farms, farm operators and relevant regional processing
- business establishments and employer demand
- local public revenue and expenditure where obtainable
- broadband/access
- transportation access to jobs and services
- nearby CTE, community-college, university and apprenticeship capacity
- migration/retention proxies
- land/farm access research slots

The model must distinguish Rose Bud municipal/place data from county or regional values. Never assign county averages to the town without labeling the geographic substitution.

## Update cadence

Do not force all data onto one refresh schedule.

Indicative cadence:

- Treasury debt stock: daily
- market/interest series: daily/monthly
- federal budget actuals: monthly/annual
- CBO baseline: each official baseline/update
- GDP: quarterly with revisions
- labor: monthly/quarterly/annual depending on series
- population: annual plus decennial benchmark
- ACS: annual vintage, 1-year/5-year depending on geography
- school and higher-ed: academic year/annual
- health: annual/periodic depending on dataset
- agriculture: annual plus Census of Agriculture cycles
- state/local finance: annual/budget cycle

The UI should display the reference period, not merely "updated today."

## Data quality flags

Every variable should be able to carry flags such as:

- preliminary
- revised
- estimated
- modeled-small-area
- suppressed
- imputed
- crosswalk-derived
- inflation-adjusted
- seasonally-adjusted
- geography-mismatch
- stale
- incomplete

A data-quality flag must be capable of blocking a public slider if the variable is essential to the calculation.

## Baseline binding gate

A variable is **bound** only when:

1. its definition is fixed;
2. an authoritative source owner is designated;
3. the exact series/table/API path is known;
4. geography behavior is defined;
5. update cadence is defined;
6. revision behavior is defined;
7. transformations are reproducible;
8. missing/suppression behavior is defined;
9. the display label cannot misrepresent the statistical definition.

Listing an agency name alone does not satisfy this gate.

## Public explanation layer

Every baseline figure will eventually support a drill-down:

**Plain English** — What does this mean?

**Mechanics** — How is it calculated?

**Source** — Who measured it, when, and how?

**Limitations** — What does it not tell us?

**Advanced** — methodology, revisions, statistical uncertainty, alternatives and disputes.

This is the bridge between the public dashboard and the doctorate-level learning layer.

## Architecture drift discovered in this slice

`PROJECT_MASTER_MAP.md` previously references `data/project/national_baseline.json` and `data/baseline/`. Those exact paths were not found on `main` during this build.

Do not fabricate them retroactively or assume they contain historical work. The new inventory at `data/project/baseline_data_source_inventory.json` is the canonical planning bridge.

The next slice must reconcile the master map and then create the actual baseline schema/storage deliberately.

## Current gates

- Production simulator code: **CLOSED**
- Public numeric sliders: **CLOSED**
- Public national baseline: **CLOSED pending binding**
- Community Digital Twin: **CLOSED pending source/geography binding**
- Baseline architecture and source inventory: **OPEN / ACTIVE**

## Next slice

`CC-BASELINE-SCHEMA-SOURCE-BINDING-AND-NATIONAL-SEED-1.0`

That slice should turn this source inventory into exact machine contracts and seed the first authoritative national baseline without yet building the interactive simulator.
