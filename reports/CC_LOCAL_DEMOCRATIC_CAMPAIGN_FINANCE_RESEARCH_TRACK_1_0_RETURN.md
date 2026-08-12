# CC-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-RESEARCH-TRACK-1.0 — Return

**Slice ID:** `CC-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-RESEARCH-TRACK-1.0`  
**Status:** PASSED (registration + demand list only)  
**Date:** 2026-08-11  
**Decision:** `CC-DEC-105` — `KEEP_AS_HYPOTHESIS`  
**Hypothesis:** `CC-HYP-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-SYSTEM` (`HYP-125`)  
**Update:** `UPD-110`

## Scope executed

Register a major research program — **not doctrine**, **not a principle**, **not claim promotion**. No OpenFEC/Congress/OpenStates ingest. No new Evidence Panel. No amendment endorsement. Google Civic remains deferred. `CC-CLAIM-003` remains **Not Enough Evidence**.

## Central question

> Can campaign-finance rules make political power substantially more local, transparent, citizen-driven, and competitive without allowing government to determine which political voices may be heard?

## Constitutional Capitalism test

> Can we design campaign finance so that money remains capable of supporting political speech, but wealth can no longer purchase anonymity, privileged access, or disproportionate control over the political information environment?

## Artifacts created

| Artifact | Path |
|---|---|
| Program file | `data/project/local_democratic_campaign_finance_research.json` |
| Hypothesis dossier | `content/research/hypotheses/local-democratic-campaign-finance.md` |
| Empirical demands (no ingest) | `data/project/CC_LOCAL_DEMOCRATIC_CAMPAIGN_FINANCE_DATA_DEMANDS.json` |
| This return | `reports/CC_LOCAL_DEMOCRATIC_CAMPAIGN_FINANCE_RESEARCH_TRACK_1_0_RETURN.md` |

## Hard distinctions locked

1. Eliminating dark money ≠ eliminating political spending (beneficial-source traceability target).  
2. Locality ≠ banning out-of-state speech (agency for small local donors under national spending).  
3. Disclosure ≠ capture (`CC-CLAIM-003` stays NEE).  
4. Hypothesis ≠ doctrine (`major_research_hypothesis_not_doctrine`).

## Design tracks

- **Track A:** reforms under current First Amendment doctrine (disclosure, matching/vouchers, coordination definitions, forums, cheap civic information, journalism).  
- **Track B:** comparative constitutional architecture research if doctrine blocks necessary design (study objects such as S.J.Res.78 **without adopting them**). Legal environment note: FEC states SCOTUS held federal coordinated party-expenditure limits unconstitutional (2026-06-30); research must not stop at *Citizens United*.

## Wiring

| Surface | Change |
|---|---|
| Architecture incubator | Appended `HYP-125` |
| Proof burden registry | Pointer under `local_democratic_campaign_finance` |
| Journalism hyp registry | Sibling converging track cross-link |
| Democracy framework | No clean `research_tracks` field — referenced only from program file (per plan) |
| Updates | `UPD-110` |
| Build state / latest return / slice queue | Point next to OpenFEC locality probe |

## Explicit non-goals (honored)

- No OpenFEC/Congress/OpenStates retrieval run  
- No new publication Evidence Panel  
- No amendment endorsement  
- No locked slogan doctrine  
- No claim that outside money’s effects are already measured  
- No baseline inflation (still **42/64**; panels still **18**)

## Demand IDs registered for later ingest

`CC-DEM-LCF-001` … `CC-DEM-LCF-011` — locality/small-dollar/IE concentration, contested gaps, AR state analogues (gap-flagged), Congress.gov study objects, journalism covariates (link-only).

## Next slice

`RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0` — credential check + targeted OpenFEC locality/small-donor metrics for selected AR/US races; bind into existing democracy/transparency panels **only if** series qualify.
