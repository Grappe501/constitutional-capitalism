# Status Page Deep-Dive Audit — 2026-08-05

## Live page vs canonical (at audit)

| Item | Live `/status/` (screenshot) | Canonical after fix |
|---|---|---|
| Overall | 36% | **42%** regenerated |
| Foundational philosophy | 70% | **82%** (Declaration + 43 principles) |
| Research foundation | 42% | **62%** |
| Source verification | (hidden) | **48%** (now public) |
| Policy development | (hidden) | **50%** (now public) |
| Economic modeling / legal | (hidden) | **0% / 0%** (now public) |
| Public book website | 70% | **80%** (seeded IA nodes) |
| Manuscript units | 28 | Book-structure chapter units (98); drafting still early |
| Claims | 90 | 123 |
| Sources | 40 | 72 |
| Yellow/tan notice box | Present | Removed (muted prose only) |
| Nav domains | Incomplete / stale deploy | Local nav includes Health, Aging, Energy, etc. |

## Root causes

1. **Stale Netlify deploy** — public site had not yet reflected later doctrine + progress regenerations.
2. **Thin status page** — showed only a subset of layers and three inventory numbers; omitted Phase honesty dials, doctrine inventory, seeded domains, and recent updates.
3. **Progress formula undercount** — `url_verified_via_search_excerpt` sources were excluded from “verified,” so research/source layers stalled at artificial ceilings (55 / 32 / 38) despite real inventory growth.
4. **Public layer filter hid honesty dials** — economic modeling and legal review (0%) were not shown on the public status page.

## Fixes shipped

- Rebuild `apps/book-site/src/pages/status.astro` with honesty dials, inventory, seeded domains, recent updates, and non-completion disclaimers.
- Expand `publicProgressLayers()` to include source verification, policy development, economic modeling, and legal review.
- Correct verification-status counting and modestly raise research/source/policy/website caps so growth is visible without freezing Phase 2 as complete.
- Snapshot fields now include verified sources, supported claims, doctrine counts, and seeded website nodes.

## Honesty dials unchanged

- Phase 2: PARTIAL  
- Baseline: 2/86  
- Modeling / legal: 0%  
- Architecture ≠ evidence  
