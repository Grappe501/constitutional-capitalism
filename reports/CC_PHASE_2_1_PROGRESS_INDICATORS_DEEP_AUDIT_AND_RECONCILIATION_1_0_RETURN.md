# CC-PHASE-2.1-PROGRESS-INDICATORS-DEEP-AUDIT-AND-RECONCILIATION-1.0 — Return

**Generated:** 2026-08-10  
**Rule:** Update live dials to match evidence. Do not inflate Phase 2 to COMPLETE.

## 1. Canonical live state

| Indicator | Value |
| --- | ---: |
| Phase 2 | **PARTIAL** |
| Baseline | **27/86** |
| Sources | **247** |
| Claims | **138** |
| First-20 weak-fit | **5** |
| First-20 DIRECT/STRONG | **14** |
| Gates passed / open | **6 / 10** |
| Overall snapshot | **43%** (not completion) |
| Modeling | **0%** |
| Legal review | **0%** |
| Processing | **~3 / 0 / 0** |
| Feed | **voice-gated** |

## 2. Drift corrected (12)

- `data/project/current_build_state.json` · weak_fit_claims / direct_strong_fit: 8/11 → 5/14
- `data/project/forensic_audit_governance.json` · integrity_dials.baseline_sourced_of_total: 2/86 → 27/86
- `data/project/phases.json` · phase-2.note baseline: 2/86 → 27/86
- `data/project/phase2_mission_lock.json` · overall_baseline_note: stale freeze text → Baseline 27/86; sources 247
- `data/project/phase2_acceptance_checklist.json` · GATE-02 forensic_note baseline: 14/86 → 27/86
- `data/project/public_statistics_bridge.json` · explicitly_not_done baseline: 14/86 → 27/86
- `data/project/rcip_civic_data_spine.json` · baseline_rule: 2/86 → 27/86
- `data/imports/reddirt-public-statistics/manifest.json` · baseline note: 2/86 → 27/86
- `data/imports/reddirt-public-statistics/import-validation.json` · baseline note: 2/86 → 27/86
- `apps/build-board/src/pages/phase-2-gate.astro` · hardcoded baseline copy: 2/86 → 27/86
- `START_HERE_FOR_AI.md` · Official active state: 2/86, sources 93, weak 12 → 27/86, sources 247, weak 5
- `docs/handoffs/CURRENT_THREAD_HANDOFF.md` · appended live state block: stale 2/86 / 93 sources → reconciled footer

## 3. Progress snapshot

Regenerated via `generate-progress-snapshot.mjs` after expanding verified-status recognition (`url_verified_via_search`, `url_verified_via_fetch`, CSV retrieved). Inventory now shows sources **247**, verified **232**, claims **138**, active slice `CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0`.

Research/source layer percents remain capped (headroom for baseline completion and remaining gates) — overall **43%** is still not a completion claim.

## 4. Intentionally unchanged

- Historical UPD entries that correctly describe past 2/86 moments
- Modeling/legal honesty dials at 0%
- Phase 2 PARTIAL / not declared complete
- Agriculture human-call gates

## 5. Next

`CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0`

## 6. Validators

- `baseline:validate` — PASSED (27/86)
- `phase2:validate` — PASSED (PARTIAL; modeling/legal 0%; 10 gates open)
- `progress:validate` — PASSED (snapshot inventory sources 247 / verified 232)
