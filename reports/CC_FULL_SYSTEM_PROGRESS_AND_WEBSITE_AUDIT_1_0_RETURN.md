# CC-FULL-SYSTEM-PROGRESS-AND-WEBSITE-AUDIT-1.0 — Return

**Slice ID:** `CC-FULL-SYSTEM-PROGRESS-AND-WEBSITE-AUDIT-1.0`  
**Status:** PASSED  
**Date:** 2026-08-11  
**Update:** `UPD-114`  
**Active structural next (unchanged):** `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0`

## Verdict

Phase 2 is **partially complete** at an honest regenerator overall of **43%** (18-layer mean). Baseline **42/64**, sources **268**, Evidence Panels **18**, claims **138**, principles **47**. Architecture frozen through **CC-DEC-106**. Manuscript remains essentially undrafted. Modeling/legal remain **0%**. Website scaffolding is strong; content depth and proof still lag.

Progress dials were reconciled; stale **48%** manual dial removed. Book and board **internal href audits: 0 broken** after fixes.

---

## Executive dials (canonical after regenerate)

| Dial | Value | Source |
|---|---|---|
| Overall completion | **43%** | `pnpm progress:generate` → `data/metrics/progress_snapshot.json` |
| Baseline | **42/64** | `data/baseline/baseline_status.json` |
| Sources / verified | **268 / 241** | `data/research/source_registry.json` |
| Claims | **138** (CC-CLAIM-003 = NEE) | `data/research/claim_ledger.json` |
| Principles | **47** | `data/project/principles.json` |
| Evidence Panels | **18** | `data/project/publication_evidence_panels.json` |
| Open research questions | **145** | `data/research/research_questions.json` |
| Decisions approved / open | **64 / 42** | `data/decisions/decisions.json` |
| Manuscript units | **98** (81 concept / 17 outline / **0** published words) | book structure |
| Modeling / Legal | **0% / 0%** | progress layers (honesty) |
| Public-stats export | `exp_a700221b6d2e4b3a` (1344 obs) | Pass 9 NASS |
| Active slice | `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0` | CBS + slice_queue + snapshot |

### Layer bars (regenerated)

| Layer | % |
|---|---:|
| Project governance | 90 |
| Book architecture | 90 |
| Foundational philosophy | 82 |
| Public book website | 82 |
| Build board | 75 |
| Research foundation | 62 |
| Deployment readiness | 55 |
| Policy development | 50 |
| Source verification | 48 |
| Accessibility | 40 |
| Constitutional analysis | 30 |
| Free distribution | 20 |
| Public launch readiness | 20 |
| Editorial review | 10 |
| Publishing formats | 8 |
| Manuscript | 3 |
| Economic modeling | 0 |
| Legal review | 0 |

---

## Area-by-area progress

| Area | Status | Done | Gap |
|---|---|---|---|
| Architecture freeze (DEC-100–106) | FROZEN / stewardship | Process, falsifiability, Public Reasoning, Data-Dense Publication, HYP-125/126 keep | No new principles; high-threshold gate for any architecture change |
| Principles / axioms | Partial | 47 principles; 10 axioms + First Principle (proposed distillation) | Axiom integration; no `CC-PRIN-48+` |
| Claims / GATE-02 | Integrity ahead of graduation | 138 claims; modules for 003; Public Reasoning active | 003 stays NEE; 5/20 first-twenty below STRONG; GATE-04/05 open |
| Evidence Panels | 18 live | Passes 1–9; EIA/FDIC/HRSA/NASS bound into existing systems | Deepen arrays; no panel #19 theater |
| Baseline | 42/64 | Ontology cleaned; expansions via BDS/CPS etc. | 22 remaining; GATE-07 open |
| RedDirt / RCIP passes | 2 closed; 3–5 passed; 6 partial; 7–9 passed | LegCiv + public-stats bridge | County NASS → FRED/BEA; QBP; HPSA history; energy reliability/ownership |
| HYP-120 | Deferred Phase 9 | Card exists | Frozen with Phase 8/9 |
| HYP-121/122 LCL | Scaffold only | Lewisville + Rose Bud cases registered | No Parts I–VI field work |
| HYP-123/124 | Registered | Rural campus + network cards | Literature/methodology before pilots |
| HYP-125 campaign finance | Probe PASSED | OpenFEC locality + taxonomy + draft LDFES | Measure-lock; AR state/local inventory |
| HYP-126 Distributed Civic Commons | REGISTERED | Hard boundary + demands 001–014 | Scholarship/failure-mode map |
| Journalism module | Deep for Phase 2 | Outlet map, 90-day coding, NJ CIC dossier | Optional recode; no composite desert scores |
| Agriculture AR | State/US NASS bound | Pass 9; posture lock; Clinton hub CONTRADICTED | County NASS; human voice gates for processing/feed |
| Democracy framework | Architecture | Framework + panels | Evidence graduation before policy lock |
| Proof packets / Burt | OS live | PP-FF-01 Qualifies/Low; Burt 1–13 only | PP-02+; gates 2,4,5,7–13 open; no Burt 14–25 |
| Manuscript / books | Early | Declaration ~5,005 words; 98 unit scaffold | Substantive drafting deferred |
| Book website | Scaffolding strong | 47 static routes + compare systems; nav dense | Depth on stubs; IA path coverage |
| Build board | Operational | 49 routes; 0 orphans | Honesty labels; keep dials synced |
| Modeling / legal | Honest zero | Dial held at 0 | Real models / counsel only |

---

## Website audit

### Surfaces

| App | Routes | Prod |
|---|---|---|
| Book (`apps/book-site`) | 47 static + `/compare/{slug}/` (40 systems) | https://constitutional-capitalism.netlify.app |
| Board (`apps/build-board`) | 49 | https://constitutional-capitalism-board.netlify.app |

### Link audit (post-fix)

| Check | Result |
|---|---|
| Book internal `href="/…"` | **0 broken** |
| Board internal `href="/…"` | **0 broken** |
| Board → book methodology | Fixed to absolute book URL |
| Board → book Declaration | Fixed to absolute book URL |
| Board phase-2-gate baseline text | **38/64 → 42/64** |
| `robots.txt` sitemap | Fixed to `/sitemap.xml` |
| Book sitemap | Expanded to all doctrine pages + compare systems |
| Footer orphans `/why/`, `/read/` | Linked in footer |

Artifact: `data/project/site_internal_link_audit_1_0.json`  
Script: `scripts/audit-site-internal-links.mjs`

### Remaining website quality gaps (not broken links)

1. `/resources/` still a placeholder  
2. `/read/` reading room has no chapters  
3. `/why/` developing argument, not claimed  
4. Many doctrine pages are architecture/scaffold prose, not evidence-dense DEC-104 surfaces  
5. IA file (`website_information_architecture.json`) still marks many nodes proposed; only 32 seeded  
6. Nav is very long (38 items) — discoverability debt, not a link break  
7. Deploy required for prod to pick up sitemap/robots/footer/link fixes  

---

## Fixes applied this slice

1. Aligned `slice_queue.active_slice` → county NASS  
2. Ran `pnpm progress:generate` + `progress:validate`  
3. Synced CBS / progress_markers overall **43%** (removed inflated 48%)  
4. Fixed board EvidencePanel + axioms cross-app links  
5. Fixed phase-2-gate baseline hardcode  
6. Fixed robots.txt sitemap URL  
7. Expanded book sitemap  
8. Footer links for `/why/` and `/read/`  
9. Published this return + backlog  

---

## Extensive build-out backlog

### A. Structural data sequence (locked)

1. `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0` — Arkansas, Van Buren/Clinton, Searcy, Mississippi, Lafayette (+ designated set)  
2. FRED adapter seed for high-value / awkward series  
3. BEA regional/macro AR–US contrasts  
4. FDIC QBP multiyear  
5. HPSA history  
6. Energy reliability + ownership (RCIP-DEM-0423/0424)  
7. CBO / SCF–DFA history / CR markups when demand-justified  
8. Google Civic when IP/runtime clean  
9. Pass-5 desert backlog arrays behind existing 18 panels  
10. Definition-lock empty baseline slots (B03, CM03, D09, D11, I02, J08, HC01, …)

### B. Baseline / gates

11. Fill remaining **22/64** scoreboard slots without denominator games  
12. Close GATE-07 verified reproducible subset  
13. Keep design indicators parked off scoreboard  
14. Close GATE-02/04/05/08–13 forensic items  

### C. Claims / scholarship

15. Hold **CC-CLAIM-003** at NEE until modules earn upgrades  
16. Advance CC-MOD-003-D/E sectoral identification  
17. Repair remaining 5/20 below-STRONG first-twenty claims  
18. Continue Public Reasoning for consequential changes  
19. Source/claim audit GATE-11  

### D. Campaign finance (HYP-125)

20. Locality measure-lock (House geography rule freeze)  
21. AR state/local finance source inventory (destination universe)  
22. Scale LDFES measures without collapsing outside-money taxonomy  
23. Track B comparative constitutional research (study ≠ endorse)  
24. Journalism × finance covariates  

### E. Distributed Civic Commons (HYP-126)

25. Scholarship + failure-mode map  
26. Civic connectivity indicator (≠ party)  
27. Failure modes: capture, exclusion, burnout, factionalism, conformity  
28. Civic Record safety (never rights-conditioning)  
29. Joint journalism + network co-variation  
30. Execute DEM-DCC-001…014 as research only  

### F. Agriculture / rural AR

31. County NASS contrasts (structural next)  
32. Human voice: processing booking/margin (~3/0/0)  
33. Human voice: feed toll/IP  
34. Operator-characteristics with definition discipline  
35. Market power / monopsony modules **separate** from structure  
36. Preserve Clinton hub CONTRADICTED  

### G. Journalism / civic information

37. Optional 90-day recode / archive repair  
38. No invented composite news-desert scores  
39. Keep NJ CIC / credits QUALIFIED–NEE — no subsidy endorsement  
40. Sustained-scrutiny expansion only with dual-code discipline  

### H. Living Community Laboratories

41. Lewisville Parts I–VI (when not displacing proof)  
42. Rose Bud enrollment-economics gate  
43. HYP-123 campus ecosystem literature map  
44. HYP-124 only after individual LCL methodology works  
45. No pilot branding / no invented local stats  

### I. Proof packets / Burt

46. Complete PP-FF-01 review cycle honestly  
47. Launch PP-02 under methodology 1.1  
48. Replicate falsifiability across priority doctrines  
49. Burt 3→4→5→6→8→9→10 under forensic gate  
50. Do **not** begin Burt 14–25  

### J. Democracy / political architecture

51. Keep democracy framework as architecture until evidence graduates  
52. Historical political-money series without claiming capture  
53. Open States vote-sample residuals  
54. Hold no-knowledge-qualification-for-suffrage constraint  

### K. Publication / product

55. Apply DEC-104 Idea→evidence→… to remaining theory pages  
56. GATE-09/10 honesty labels on book + board  
57. Prefer deepening arrays over panel #19  
58. Energy facts ≠ prosperity-fund proof  
59. Deploy book + board after this audit so prod matches repo  

### L. Manuscript / books

60. Hold chapter drafting until claim/baseline gates improve  
61. Declaration revision after axiom integration  
62. Evidence Companion dossiers to GATE-08 standard  
63. Implementation Manual remains design agenda  
64. Fill `/read/` only with real chapter content  

### M. Website IA / UX debt

65. Refresh `website_information_architecture.json` paths for all live routes  
66. Reduce nav clutter (section groups / secondary nav) without orphaning pages  
67. Finish or clearly label `/resources/` placeholder  
68. Cross-link collaborative-review ↔ systems-intelligence from main Evidence/Status hubs  
69. Keep board EvidencePanel pointing at book methodology URL  

### N. Deferred infrastructure

70. Civic deliberation feedback system (secure backend)  
71. Phase 8/9 backends frozen (HYP-120 stays deferred)  
72. Modeling honesty dial until real models  
73. Legal review until real counsel work  
74. RedDirt credential hygiene outside CC repo  

### O. Governance hygiene (ongoing)

75. Re-run `pnpm progress:generate` after every major dial move  
76. Keep incubator cards non-publishable  
77. Sequence lock: county NASS → FRED/BEA; cultural tracks parallel only  

---

## Sequence lock

1. **Structural:** `RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0`  
2. **Then:** FRED / BEA  
3. **Parallel HYP-125:** locality measure-lock → AR state/local inventory  
4. **Parallel HYP-126:** scholarship + failure-mode map  
5. **Do not:** upgrade CC-CLAIM-003; mint new principles; Phase 8/9; invent mill quotes; displace county NASS  

---

## Artifacts

| Path | Role |
|---|---|
| `data/metrics/progress_snapshot.json` | Regenerated website dials |
| `data/metrics/progress_layers.json` | Layer percents |
| `data/project/current_build_state.json` | Ops dial |
| `data/project/site_internal_link_audit_1_0.json` | Link audit |
| `scripts/audit-site-internal-links.mjs` | Re-runnable auditor |
| This return | Governance return |
