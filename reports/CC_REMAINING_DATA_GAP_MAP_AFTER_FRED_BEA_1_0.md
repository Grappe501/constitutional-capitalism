# Remaining data-gap map after FRED/BEA — 1.0

**As of:** 2026-08-12  
**After completed structural APIs:** Census/BLS · EIA · FDIC · HRSA · NASS (incl. county density) · OpenFEC/Open States/Congress · FRED/BEA (thin + densify)  
**Baseline scoreboard:** still **42/64** sourced (22 countable slots open).  
**Panels:** **18** (architecture freeze; densify bound existing systems only).

This map classifies what remains. It is **not** a commitment to fill every slot before manuscript; it is a retrieval-vs-debt inventory so modeling/legal/primary-research work is not mistaken for “one more API pass.”

---

## A. Genuinely retrievable (or near-retrievable) with another official pass

These still look like **stable public series / filings** if definition locks are chosen carefully. They are the main candidates for remaining baseline fills — not FRED/BEA leftovers.

| Slot / theme | Why still open | Likely path |
|---|---|---|
| Contested races / electoral competitiveness (`CC-IND-D01`) | Needs operational definition + election returns join | MIT Election Lab / state SOS / FEC candidate files — not FRED |
| District integrity / split indicators (`CC-IND-D02`) | Geometry + residency definition debt first | Census geography + redistricting products |
| Recorded-vote / legislative transparency (`CC-IND-D05`) | Partial Open States/Congress coverage; completeness gaps | Congress.gov + Open States densify; AR chamber journals where APIs thin |
| Officeholder financial-conflict indicators (`CC-IND-D08`) | Disclosure systems exist but are heterogeneous | State ethics / personal financial disclosure + FEC where federal |
| Young-adult entrepreneurship / formation (`CC-IND-HC03`) | Near BDS/BFS/ACS if age/geography locked | Census BDS/BFS; not BEA GDP |
| Early-career earnings by pathway (`CC-IND-HC05`) | Needs pathway definition | ACS PUMS / LEHD / College Scorecard-style joins |
| Preventable disease / prevention investment (`CC-IND-E04`, `CC-IND-E08`) | Partial CDC/HRSA adjacency; spend shares harder | CDC Wonder / BRFSS / NASBO or CMS NHE for spend shares |
| Insurance concentration / claim transparency (`CC-IND-E03`) | Possible via NAIC / CMS / state DOI — not FRED | Filings + HHS products |
| Drug pricing / publicly funded research access (`CC-IND-E06`) | Partial NIH/CMS adjacency | NIH RePORTER + CMS/Medicaid price files — definition lock required |

**Note:** Credentials for Civic / OpenStates / api.data.gov / Socrata may unblock some D-family densify work; they do not convert definition-deferred slots into sourced metrics by themselves.

---

## B. Definition debt (concept not yet locked to an official measure)

Do **not** fill these with convenient macro proxies (GDP, PCPI, DFA shares, farm income aggregates).

| Slot | Title | Why definition debt |
|---|---|---|
| `CC-IND-L03` | Ownership (worker/employee) | ESOP/coop/employee-ownership share needs a chosen universe; DFA ownership ≠ workplace ownership |
| `CC-IND-B03` | Local ownership | “Local” firm ownership has no single federal series; Census/BDS proximity ≠ ownership |
| `CC-IND-CM03` | Hospital access | HRSA/AHA adjacency exists; access ≠ beds ≠ travel time — lock required |
| `CC-IND-D09` | Civic engagement | Voting/volunteering/org membership are different objects |
| `CC-IND-D11` | Local participation | Meeting attendance / petition / local office — usually primary or survey design |
| `CC-IND-I02` | AI investment | Capex/R&D/adoption — no single BEA “AI” line that matches the claim |
| `CC-IND-HC01` | Multiple-pathway secondary completion | Credential taxonomy must be locked before ACS/IPEDS fills |

---

## C. Primary research / unavailable as continuous official series

| Slot / theme | Classification | Comment |
|---|---|---|
| `CC-IND-J04` Public-defense access | Primary / sparse admin | State indigent-defense caseloads rarely nationalized |
| `CC-IND-J05` Legal financial obligations / court debt | Primary / sparse admin | Court debt systems are fragmented; not FRED |
| Local prosperity / resilience narratives | Modeling + primary | County NASS + BEA state accounts illuminate structure/accounts; they do **not** measure resilience |
| Arkansas County ↔ Van Buren **causation** | Primary / modeling | Same NASS definitions show structure contrast; causation is out of API scope |
| Political **capture** as latent variable | Modeling / legal | FEC/Open States are contribution and process evidence, not capture proof |

---

## D. Legal research (not a statistics pass)

| Theme | Why legal |
|---|---|---|
| `CC-IND-D06` Local home-rule / preemption intensity | Statutory/case inventory + coding scheme |
| `CC-IND-J08` White-collar / economic crime enforcement intensity | Charging/prosecution definitions; DOJ/state AG publications are partial |
| Market power / monopsony / rule of reason | Doctrine + case law; production concentration ≠ legal conclusion (CC-CLAIM-003 hold) |
| Preemption vs local capital authority | Arkansas/federal statutory map |

---

## E. Modeling questions (architecture / inference — not missing APIs)

| Question | Status |
|---|---|
| Production concentration → market power | **NEE** under hold; not filled by BEA GDP or DFA wealth |
| Wealth shares → political capture | Requires explicit model; DFA is structure only |
| Farm structure → rural capital outcomes | NASS structure + BEA farm income are complementary objects; join is a modeling choice |
| Wages–productivity gap interpretation | BLS indexes bound; causal attribution remains model-side |
| Remaining ~22 baseline slots → manuscript sequencing | Process decision: definition-locks first, then retrievable fills, then park rest |

---

## F. What FRED/BEA closed vs what they refused

**Closed / densified (structure & accounts):**

- National wealth **structure** (DFA asset + prior net-worth paths)
- US/AR real GDP and personal-income component histories
- US/AR farm proprietors’ income (accounts, not county structure)
- Federal fiscal capacity ratios (% GDP)
- BLS compensation vs output-per-hour indexes for the wages–productivity panel

**Explicitly refused as proxies:**

- Ownership (worker/local)
- Local prosperity / county resilience
- Market power / monopsony / capture
- Causation for NASS county contrasts
- Civic engagement / contestedness / home-rule

---

## G. Recommended next structural order (no architecture change)

1. **Baseline definition-locks** for the definition-debt set (B) — decide measure or park.  
2. **Retrievable fills** (A) only after locks — election/legislative/ethics/BDS/health admin as separate small passes.  
3. Keep **HYP-125 / HYP-126 / HYP-127** on the parallel track; do not interrupt structural fills.  
4. Legal (D) and modeling (E) are manuscript/analysis tracks, not “next API.”

**Hard boundary respected:** 0 new panels by default; 18-system freeze holds.
