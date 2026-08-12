# CC-AI-RESEARCH-INTELLIGENCE-LAYER-1.0 — Return

**Decision:** CC-DEC-120  
**Update:** UPD-133  
**Date:** 2026-08-12  
**Overall completion:** **43%** (honesty hold — unchanged)

## Verdict

Shipped a Phase-2 **research-ops precursor**: a Constitutional Capitalism Intelligence Engine that sits above the evidence warehouse. **Not** a public chatbot. **Not** Phase 9 Systems Intelligence Engine activation (CC-DEC-097 remains deferred).

Pipeline locked:

> Official data → normalized observations → evidence/provenance → AI analysis → **human decision** → publication (never autonomous)

## What landed

| # | Component | Artifact |
|---|-----------|----------|
| 1–2 | Secure OpenAI config + server-only credentials | `.env.example`, Netlify Functions env, CLI `OPENAI_API_KEY` |
| 3 | Research-object registry | `data/project/ai_research_object_registry.json` |
| 4 | Evidence retrieval layer | `scripts/lib/cc-ai-research/retrieve.mjs` |
| 5 | Provenance-aware prompts | `scripts/lib/cc-ai-research/prompts.mjs` |
| 6–11 | Analyst modes | county / comparative / hypothesis / gap / counterexample / claim |
| 12 | Completion Advancement Map | `data/project/ai_research_completion_advancement_map.json` |
| 13 | Human approval gate | `data/project/ai_research_proposals.json` + download proposal on board |
| 14 | Activity/audit log | `data/project/ai_research_activity_log.json` |

Board surface: `/ai-research-intelligence/`  
CLI: `pnpm ai:research` / `pnpm ai:research:pack`  
Function: `apps/build-board/netlify/functions/cc-ai-research.mjs`

## Credential rule (hard)

`OPENAI_API_KEY` may live only in:

- local process environment / `.env` (gitignored)
- Netlify **board** site environment variables (Functions)

It must **never** appear in browser JavaScript, committed files, or public Netlify static assets.

## AI permissions

**May:** observe → compare → question → summarize → recommend  

**Must not:** invent evidence; silently alter evidence; promote hypotheses; change principles; publish legal conclusions; change baseline; inflate dial; autonomously publish; lock pilots; assert causation without modeling.

## Completion Advancement Map (why 43%?)

The map does **not** raise the dial. It answers:

1. Why the honesty hold remains at 43% (architecture ≠ proof; NEE claims; no locked pilot; county ADWS gap; empirical waves are instruments).
2. What would earn **43 → 50** (validated comparative diagnosis packets; definition-lock fills; multi-year voter series).
3. What would earn **50 → 60** (modeling after observation; legal/funding feasibility; field readiness without false lock; Claim-003 evidence path).
4. What sits beyond (measured pilots; Phase 9 SIE when gates met).

## Relationship to Phase 9 SIE

Documented on `systems_intelligence_engine_framework.json` as `research_ops_precursor`. Shares governance (“AI analyzes, humans decide”) but does not unlock simulation, digital twins, or whole-system impact engine build-now status.

## How to use

```bash
# Refresh retrieval pack + static map
pnpm ai:research:pack

# Deterministic (no key required)
pnpm ai:research --mode completion_advancement_map --no-model
pnpm ai:research --mode counterexample --no-model
pnpm ai:research --mode claim_auditor --claim CC-CLAIM-003 --no-model

# Live model (requires OPENAI_API_KEY in env)
pnpm ai:research --mode county_living_systems --fips 05145
pnpm ai:research --mode comparative_systems --fips 05145 --fips 05073
pnpm ai:research --mode hypothesis_stress --hyp HYP-128
```

Board: set `OPENAI_API_KEY` on the board Netlify site, deploy with Functions, open `/ai-research-intelligence/`.

## Holds preserved

- overall_percent = 43
- no client/git API key
- no autonomous publication
- not Phase 9 activation
- no locked site
- observation first

## Next

- Human-led: validated comparative diagnosis packets; structural definition-locks  
- Optional: configure board Function key for live county/hypothesis analysts  
- Phase 9 SIE remains gated
