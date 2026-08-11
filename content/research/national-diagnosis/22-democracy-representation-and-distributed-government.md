# Democracy, Representation, and Distributed Government

**Domain status:** priority_phase_2_architecture  
**Last updated:** 2026-08-11  
**Phase:** 2 — Diagnosis Research Foundation (second constitutional spine)  
**Evidence upgrade:** `CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-1.0` · panel `CC-EP-DEMOCRACY-POLITICAL-MONEY-1`

## Central question

Can political power remain returnable to citizens and communities — or does the machinery of districts, parties, procedure, donors, unified government, and officeholder wealth convert temporary victory into permanent control?

## Why it matters

Economic power returned to the people is incomplete if political power remains self-protecting. This domain is a constitutional spine equal in dignity to economics and justice.

## Current findings

_Architecture and developing doctrine established (`CC-DEV-015`–`CC-DEV-019`, `data/project/democracy_framework.json`)._

Sourced legal/institutional context (not a full empirical diagnosis):

- **`CC-SRC-014` — *Rucho v. Common Cause* (2019):** The Supreme Court held that partisan-gerrymandering claims present political questions beyond the reach of federal courts. Practical consequence: much redistricting reform proceeds through Congress, state constitutions and courts, commissions, and voters — not federal judicial policing of partisan maps.
- **`CC-SRC-015` — NCSL redistricting commissions overview:** States use varied commission and nonlegislative arrangements for legislative maps; independence and structure differ.
- **`CC-SRC-016` — NCSL legislative term limits overview:** A minority of states use legislative term limits; experience includes intended rotation and documented risks of influence shifting toward lobbyists, staff, agencies, and parties when institutional knowledge leaves with legislators.

### Evidence Panel — political money and legislative observability

**Reader question:** How concentrated is congressional campaign funding, and what legislative structure is actually observable?

| Number | Value | Period / geography | Trace |
|---|---:|---|---|
| Top-decile share of House+Senate candidate receipts | **73%** | 2023–2024 cycle / US | `CC-IND-D04` · `CC-SRC-257` |
| Candidates with receipts > 0 (weball file) | **2,733** | 2023–2024 cycle / US | `CC-IND-D04` |
| Arkansas officeholders (Open States roster) | **142** | 2026-08-10 retrieval / AR | `CC-SRC-266` |
| Recent Arkansas bill sample | **60 bills / 2 sessions** | targeted sample / AR | `CC-SRC-266` |
| Congress.gov recent bill sample | **20 bills** | 118th Congress sample / US | `CC-SRC-267` |

**Plain English:** Federal disclosure makes candidate-receipt concentration measurable. Observability is not capture. Arkansas roster and bill samples answer institutional-structure questions for Living Community Laboratory work; they do not score influence.

**Evidence strength:** Strong for disclosure/observability (`CC-CLAIM-134`); not enough evidence for causal capture (`CC-CLAIM-003`).

**Honesty labels:** association, not demonstrated causation · targeted sample, not a full civic warehouse · Google Civic contest structure still PARTIAL (IP-restricted runtime).

<details>
<summary>Explore the data</summary>

- Supports: FEC weball (`CC-SRC-257`); RedDirt export `exp_legciv_9ab7ba9f3266`; Open States / Congress.gov samples.
- Challenges: disclosure ≠ capture; receipt concentration ≠ donor concentration; bill volume ≠ scrutiny.
- Don’t know: causal concentration→accountability identification; multi-cycle weball series beyond D04; Google Civic controlled-place contests.
- Canonical panel: `data/project/publication_evidence_panels.json` → `CC-EP-DEMOCRACY-POLITICAL-MONEY-1`

</details>

Quantitative claims about district competitiveness, public trust, and local participation remain **pending** fuller source registration beyond the campaign-finance baseline slot.

## Strongest supporting evidence

- Federal holding in *Rucho* constrains federal judicial remedies for partisan gerrymandering (`CC-SRC-014`).
- Institutional variation in state redistricting commissions is documented by NCSL (`CC-SRC-015`).
- Term limits are neither universal nor a complete anti-capture solution (`CC-SRC-016`).
- Candidate-receipt concentration among House/Senate candidates with receipts is measurable at **73%** top-decile share for 2023–2024 (`CC-IND-D04` / `CC-SRC-257`).

## Contrary evidence

- Parties can organize accountability, platforms, and opposition — banishing parties is not the doctrine.
- Independent commissions can themselves be captured or poorly designed.
- Direct democracy and initiative processes can be dominated by wealthy interests without safeguards.
- Term limits can weaken legislatures relative to permanent lobbyists and agencies.
- Supermajority and multipartisan requirements can produce paralysis if overused.

## Uncertainties

- Optimal districting metrics (compactness, communities of interest, partisan fairness) involve tradeoffs.
- Causal effects of public financing, open primaries, and multimember districts vary by state.
- Measuring “meaningful competition” and “public trust” requires careful definitions.

## Data gaps

- `CC-IND-D04` (campaign funding concentration) is now sourced; other democracy baseline slots remain thin.
- Lobbying access, local preemption, and legislative recorded-vote coverage (`CC-IND-D05`) still pending.
- Google Civic election/contest structure for controlled Arkansas reference places not yet publishable from the restricted runtime.

## Constitutional implications

Developing doctrine: political authority is held in trust; anti-entrenchment; parties may support but not own offices; structural independence under unified control; home rule with rights floors; courts independent without supremacy. Not silent Declaration amendments.

## Policy implications (not yet resolved)

No national redistricting statute, campaign-finance code, or state constitutional package in this slice. Future proposals must pass the Democracy Test and Bill Transparency Test.

## Metrics

- Sourced: `CC-IND-D04` campaign funding concentration (top-decile share of congressional candidate receipts) = **73%** (2023–2024).
- Pending / remapped: see `research/phase_2/baseline_id_remap_table.json` (voter participation → `CC-IND-D03`; civic engagement / public trust / local participation → `CC-IND-D09`/`D10`/`D11`; legislative transparency → `CC-IND-D05`).

## Source IDs

- `CC-SRC-014`, `CC-SRC-015`, `CC-SRC-016`
- `CC-SRC-257` (FEC weball / D04)
- `CC-SRC-265`–`CC-SRC-267` (RedDirt legislative/civic targeted export objects)

## Claim IDs

- `CC-CLAIM-024` — temporary majorities should not convert victory into permanent control (normative / requires research modules)
- `CC-CLAIM-025` — partisan gerrymandering is largely outside federal judicial remedy after *Rucho* (legal descriptive / supported for the holding)
- `CC-CLAIM-026` — term limits alone are insufficient anti-capture design (partially supported via institutional secondary overview)
- `CC-CLAIM-134` — federal campaign-finance/lobbying disclosure makes large political-money flows observable without proving accountability collapse
- `CC-CLAIM-003` — concentration can weaken democratic accountability (**not enough evidence** for causal upgrade)

## Doctrine IDs

- `CC-DEV-015`–`CC-DEV-019`

## Next research actions

1. Bind multi-cycle weball series (not capped OpenFEC API samples) for historical depth on D04.  
2. Re-run Google Civic from an IP-allowed machine for controlled Arkansas reference places.  
3. Deepen local preemption and legislative-procedure transparency modules with contrary evidence preserved.
