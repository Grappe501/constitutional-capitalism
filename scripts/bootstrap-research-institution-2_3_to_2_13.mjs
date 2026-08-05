/**
 * Bootstraps CC-PHASE-2.3 through 2.13 research institution foundations.
 * Research infrastructure only — no doctrine, principles, or architecture.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-05";
const write = (rel, content) => {
  const abs = r(rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content.endsWith("\n") ? content : content + "\n", "utf8");
};
const writeJson = (rel, obj) => write(rel, JSON.stringify(obj, null, 2));
const mkdir = (...parts) => fs.mkdirSync(r(...parts), { recursive: true });

console.log("Bootstrapping research institution 2.3–2.13…");

// ─── Shared helpers ─────────────────────────────────────────────
const dirs = [
  // 2.3
  "research/methodology",
  // 2.4
  "research/corpus/sources",
  "research/corpus/authors",
  "research/corpus/topics",
  "research/corpus/evidence",
  "research/corpus/government",
  "research/corpus/academic",
  "research/corpus/books",
  "research/corpus/history",
  "research/corpus/international",
  "research/corpus/case_studies",
  "research/corpus/legislation",
  "research/corpus/statistics",
  "research/corpus/reviews",
  "research/corpus/contracts",
  "research/corpus/standards",
  // 2.5
  "research/living_community_laboratories/templates",
  "research/living_community_laboratories/contracts",
  "research/living_community_laboratories/comparative",
  "research/living_community_laboratories/registries",
  "research/living_community_laboratories/metrics",
  "research/living_community_laboratories/scenarios",
  "research/living_community_laboratories/systems_mapping",
  "research/living_community_laboratories/community_profiles",
  // 2.6
  "research_pipeline/connectors",
  "research_pipeline/staging",
  "research_pipeline/classification",
  "research_pipeline/review",
  "research_pipeline/dedup",
  "research_pipeline/metadata",
  "research_pipeline/claim_extraction",
  "research_pipeline/citation",
  "research_pipeline/jobs",
  "research_pipeline/reports",
  "research_pipeline/schemas",
  // 2.7
  "research_watch/watchlists",
  "research_watch/subscriptions",
  "research_watch/change_detection",
  "research_watch/alerts",
  "research_watch/review_queue",
  "research_watch/legislation",
  "research_watch/courts",
  "research_watch/statistics",
  "research_watch/academic",
  "research_watch/government",
  "research_watch/international",
  "research_watch/reports",
  // 2.8
  "knowledge_graph/contracts",
  "knowledge_graph/nodes",
  "knowledge_graph/relationships",
  "knowledge_graph/schemas",
  "knowledge_graph/validators",
  "knowledge_graph/visualizations",
  "knowledge_graph/queries",
  "knowledge_graph/registry",
  "knowledge_graph/exports",
  // 2.9
  "evidence_synthesis/reviews",
  "evidence_synthesis/systematic_reviews",
  "evidence_synthesis/meta_reviews",
  "evidence_synthesis/topic_summaries",
  "evidence_synthesis/confidence",
  "evidence_synthesis/conflicts",
  "evidence_synthesis/research_gaps",
  "evidence_synthesis/recommendations",
  "evidence_synthesis/exports",
  "evidence_synthesis/contracts",
  // 2.10
  "modeling/scenarios",
  "modeling/assumptions",
  "modeling/variables",
  "modeling/constraints",
  "modeling/sensitivity",
  "modeling/outputs",
  "modeling/comparisons",
  "modeling/validation",
  "modeling/registries",
  "modeling/exports",
  "modeling/contracts",
  // 2.11
  "observatory/registries",
  "observatory/measurements",
  "observatory/time_series",
  "observatory/community",
  "observatory/state",
  "observatory/national",
  "observatory/international",
  "observatory/baselines",
  "observatory/indices",
  "observatory/dashboards",
  "observatory/quality",
  "observatory/exports",
  "observatory/contracts",
  // 2.12
  "research_operations/dashboard",
  "research_operations/missions",
  "research_operations/assignments",
  "research_operations/queues",
  "research_operations/priorities",
  "research_operations/reviews",
  "research_operations/milestones",
  "research_operations/calendar",
  "research_operations/reports",
  "research_operations/metrics",
  "research_operations/governance",
  // 2.13
  "institutional_history/decision_ledger",
  "institutional_history/research_history",
  "institutional_history/confidence_history",
  "institutional_history/methodology_history",
  "institutional_history/review_history",
  "institutional_history/revision_history",
  "institutional_history/debate_history",
  "institutional_history/timelines",
  "institutional_history/exports",
  "institutional_history/contracts",
];
for (const d of dirs) mkdir(d);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 3 — Methodology Calibration
// ═══════════════════════════════════════════════════════════════

write(
  "research/methodology/METHODOLOGY_CALIBRATION_1_0.md",
  `# Methodology Calibration 1.0

**Slice:** CC-PHASE-2.3-RESEARCH-METHODOLOGY-CALIBRATION-1.0  
**Date:** ${TODAY}  
**Subject:** PP-FF-01 as methodology stress test  
**Rule:** Improve methodology — not Family Farm doctrine.

## Philosophy

The methodology is never presumed correct. Weaknesses exposed by PP-FF-01 improve the research program, not the architecture.

## Audit dimensions

| Dimension | Finding | Severity |
| --- | --- | --- |
| Template quality | Usable; required sections complete | Low |
| Research workflow | Clear Draft→Review path; Complete gate still ahead | Low |
| Evidence collection | Strong for registered federal sources; weak for literature breadth | High |
| Contrary evidence | Claim-ledger notes present; external contrary CC-SRC corpus empty | Critical |
| Source quality | Primary official stats strong; peer-reviewed absent | High |
| Confidence scoring | Overall Low correct; risk of conflating descriptive High with hypothesis High | Medium |
| Verdict process | Qualifies correctly chosen; thresholds informal | Medium |
| Legal review | Open questions only — correct; thin guidance | Medium |
| Economic review | Descriptive only; no modeling (honesty dial 0%) | Expected |
| Implementation review | Logical barriers listed; not empirically sourced | Medium |
| Research ledger | Reproducible for registered sources | Low |
| Validation | Automates structure; weak on bias/completeness | Medium |
| Reproducibility | Another researcher can follow registered trail; cannot reproduce unregistered searches | Medium |

## Readiness for PP-02

**CONDITIONAL GO** — see \`RESEARCH_METHODOLOGY_CALIBRATION_REPORT.md\`.
`,
);

write(
  "research/methodology/PP_METHOD_LESSONS_LEARNED.md",
  `# PP-FF-01 Method Lessons Learned

## Worked Well

- Canonical template forced contrary, alternatives, boundaries, failure conditions.
- Registered-source discipline prevented invented citations.
- Qualifies verdict demonstrated investigator mindset (CC-DEC-102).
- Ledger + contract made the packet machine-checkable.
- Confidence capped at Low when contrary external corpus was empty.

## Needs Improvement

- Contrary evidence must include registered \`CC-SRC-*\` sources before Complete.
- Separate descriptive_confidence vs hypothesis_confidence in contract.
- Encode minimum contrary_search_log length in validator.
- Legal/economic section checklists with explicit “gap” vs “reviewed” flags.

## Unexpected Problems

- Scaffold opposing notes felt like contrary evidence but are not external literature.
- Architecture prose is rhetorically strong and must stay out of the evidence column.
- “Supports / Qualifies / Contradicts” headings all required even when two are “Not selected.”

## Reviewer Friction

- No independent reviewer yet (Founding Steward beta).
- Method audit authored by packet author — independence deferred.

## Research Bottlenecks

- Source registration before citation is slow but necessary.
- No corpus home for reusable contrary literature (addressed in Script 4).
- Peer-reviewed searches not yet operationalized as jobs (Script 6).

## Missing Standards

- Verdict decision tree (now added).
- Research quality metrics (now added).
- Confirmation-bias checklist as first-class artifact (now added).

## Ambiguous Instructions

- When Not Enough Evidence vs Qualifies for thin descriptive baselines.
- How many contrary sources are “enough” for Complete.

## Validation Improvements

- Fail Complete without external contrary CC-SRC (unless waived with rationale).
- Require methodology_version on all executive packets (already present).
- Warn when supporting_sources >> contrary_sources by >3:1 without Low confidence.

## Automation Opportunities

- Ledger row generation from claim_ledger / source_registry IDs.
- Coverage metrics dashboard from registry JSON.
- Duplicate source detection at corpus layer.
`,
);

write(
  "research/methodology/confirmation_bias_audit.md",
  `# Confirmation Bias Audit — PP-FF-01

| Question | Finding | Severity |
| --- | --- | --- |
| Was supporting evidence easier to find? | **Yes** — federal program/stats pages already registered for Family Farm doctrine work | Medium |
| Were contrary sources equally pursued? | **No** — opposing notes used; external failure literature not registered | Critical |
| Did wording favor doctrine? | **Mostly avoided** — architecture labeled design-only; compact language kept out of evidence | Low |
| Were assumptions hidden? | **No** — alternatives and failure conditions explicit | Low |
| Was evidence over-interpreted? | **No** — census/spend totals not treated as purchase-floor proof | Low |
| Did conclusions exceed evidence? | **No** — Qualifies, not Supports | Low |
| Were confidence ratings inflated? | **No** — Overall Low; descriptive High not elevated to hypothesis proof | Low |

## Assigned findings

1. **BIAS-01 (Critical):** Contrary pursuit asymmetry — Accepted for methodology fix (validator + corpus contrary registry).
2. **BIAS-02 (Medium):** Prior registration favored supporting federal sources — Deferred to Research Watch topic balance.
3. **BIAS-03 (Low):** Author dual-role (architect + investigator) — Deferred until Domain Stewards active.
`,
);

write(
  "research/methodology/research_friction_report.md",
  `# Research Friction Report — PP-FF-01

| Measure | Assessment |
| --- | --- |
| Most difficult research step | Finding *registered* contrary literature without inventing citations |
| Most time-consuming step | Structuring full template honestly around a thin registered corpus |
| Most subjective decision | Qualifies vs Not Enough Evidence for thin descriptive baselines |
| Most ambiguous instruction | “Strongest contrary evidence” when none registered externally |
| Biggest source gap | Peer-reviewed food hub / cooperative failure studies |
| Biggest legal uncertainty | Interstate commerce + procurement preference legality |
| Biggest economic uncertainty | Comparative prosperity vs conventional systems (unmodeled) |
`,
);

write(
  "research/methodology/reproducibility_review.md",
  `# Reproducibility Review — PP-FF-01

## Question

Could another researcher produce essentially the same packet using only the documented methodology?

## Answer

**Yes for the registered evidence trail. Partial for search process.**

Another researcher can:

- Load CC-CLAIM-124/125/126 and CC-SRC-073/074/039
- Rebuild supporting tables and opposing notes
- Reach Qualifies / Low given the same corpus

They cannot fully reproduce:

- Negative search results for unregistered literature (only search-log strings exist)
- Implicit judgment that Qualifies beats Not Enough Evidence

## Missing documentation

- Explicit decision rule for Qualifies vs Not Enough Evidence (now in verdict_decision_tree.md)
- Required minimum external contrary sources for Complete

## Hidden assumptions

- Federal descriptive statistics are the correct starting corpus
- Claim-ledger opposing_evidence counts toward contrary duty (partial credit only)

## Non-repeatable steps

- Ad-hoc project source_registry grep for failure studies

## Suggested improvements

- Formal search protocol template (databases, queries, dates)
- Corpus ingest before packet drafting
- Decision tree mandatory attachment
`,
);

write(
  "research/methodology/verdict_decision_tree.md",
  `# Verdict Decision Tree (Methodology 1.1 candidate)

\`\`\`
START: Research question + hypothesis recorded exactly
  │
  ├─ Is the registered evidence corpus empty for the question?
  │    YES → Not Enough Evidence (keep Draft/Researching)
  │    NO  ↓
  │
  ├─ Does strongest evidence materially support the hypothesis
  │  under stated boundary conditions AFTER contrary search?
  │    NO  ↓
  │    YES ↓
  │
  ├─ Is there material contrary evidence or unresolved
  │  alternative explanations that bound or undercut the claim?
  │    YES → Could still be Supports only if contrary is peripheral
  │          and documented; else → Qualifies or Contradicts
  │
  ├─ Does contrary evidence falsify the core mechanism
  │  under conditions the doctrine assumes?
  │    YES → Contradicts
  │    NO  ↓
  │
  ├─ Is support only partial / conditional / descriptive-precondition only?
  │    YES → Qualifies
  │    NO  → Supports (still with confidence + boundaries)
  │
  └─ Confidence = evidence quality for the chosen verdict
       (never certainty; overall ≤ weakest material component)
\`\`\`

## Mixed cases

- Strong descriptive baselines + unproven system claim → **Qualifies** (PP-FF-01 pattern)
- Empty contrary external corpus → cannot Choose Supports for Complete status
`,
);

write(
  "research/methodology/research_quality_metrics.md",
  `# Research Quality Metrics

## Definitions

| Metric | Definition |
| --- | --- |
| Source diversity | Count of distinct source_types in packet ledger |
| Contrary evidence ratio | contrary_registered_sources / supporting_sources |
| Peer-reviewed % | peer_reviewed sources / total sources |
| Government % | government/primary_official / total |
| Primary % | primary sources / total |
| Secondary % | secondary / total |
| Unknown % | unknown quality / total |
| Average confidence | Mean of component scores mapped 1–5 |
| Research completeness | Checklist items checked / required |
| Citation quality | % sources with URL + retrieval_date + limitations |
| Reproducibility score | 0–100 rubric (ledger + search log + decision tree) |

## PP-FF-01 snapshot (honest)

| Metric | Value |
| --- | --- |
| Supporting CC-SRC | 3 |
| Contrary CC-SRC | 0 |
| Contrary evidence ratio | 0.0 |
| Government % | ~100% of supporting |
| Peer-reviewed % | 0% |
| Overall confidence | Low |
| Reproducibility score | ~70 (registered trail strong; search thin) |
| Research completeness | ~85% Draft |
`,
);

writeJson("research/methodology/methodology_version_history.json", {
  version: "1.0.0",
  last_updated: TODAY,
  current_active_version: "1.0",
  versions: [
    {
      version: "1.0",
      status: "active",
      activated: TODAY,
      changes: [
        "Initial Proof Packet OS: template, contract, verdict/confidence standards, lifecycle, validate script",
      ],
      reason: "CC-PHASE-2.1 operating system",
      packets_affected: ["PP-FF-01"],
      approval_status: "Accepted",
    },
    {
      version: "1.1",
      status: "proposed",
      activated: null,
      changes: [
        "Verdict decision tree required",
        "descriptive_confidence vs hypothesis_confidence fields",
        "Complete requires ≥1 contrary CC-SRC unless waiver",
        "Minimum contrary_search_log length ≥3",
        "Confirmation bias checklist attachment",
      ],
      reason: "Calibration from PP-FF-01 (CC-PHASE-2.3)",
      packets_affected: ["future packets; PP-FF-01 remains 1.0"],
      approval_status: "Pending governance acceptance of backlog items",
    },
  ],
});

writeJson("research/methodology/methodology_improvement_backlog.json", {
  version: "1.0.0",
  last_updated: TODAY,
  rule: "Nothing changes automatically. Each item: Accepted | Deferred | Rejected with rationale.",
  items: [
    {
      id: "MIB-001",
      title: "Require contrary CC-SRC before Complete",
      status: "Accepted",
      rationale: "PP-FF-01 contrary asymmetry was the critical methodology failure mode",
      target_methodology_version: "1.1",
    },
    {
      id: "MIB-002",
      title: "Split descriptive vs hypothesis confidence",
      status: "Accepted",
      rationale: "Prevents readers conflating High descriptive stats with doctrine proof",
      target_methodology_version: "1.1",
    },
    {
      id: "MIB-003",
      title: "Minimum contrary_search_log length ≥3",
      status: "Accepted",
      rationale: "Encode existing PP-FF-01 practice",
      target_methodology_version: "1.1",
    },
    {
      id: "MIB-004",
      title: "Formal literature search protocol template",
      status: "Accepted",
      rationale: "Reproducibility of negative searches",
      target_methodology_version: "1.1",
    },
    {
      id: "MIB-005",
      title: "Independent methodology reviewer for Complete",
      status: "Deferred",
      rationale: "Domain Stewards / Reviewer's Charter not yet activated",
    },
    {
      id: "MIB-006",
      title: "Auto-fail Supports when contrary ratio = 0",
      status: "Accepted",
      rationale: "Hard investigator rule",
      target_methodology_version: "1.1",
    },
    {
      id: "MIB-007",
      title: "Raise Overall confidence above Low without peer-reviewed or multi-type sources",
      status: "Rejected",
      rationale: "Would recreate confirmation bias; keep strict",
    },
  ],
});

write(
  "research/methodology/research_program_health.md",
  `# Research Program Health

| Indicator | Status |
| --- | --- |
| Packets Complete | 0 (PP-FF-01 Draft Qualifies) |
| Methodology Version | 1.0 active; 1.1 proposed |
| Average Confidence | Low (PP-FF-01) |
| Evidence Quality | Descriptive federal strong; literature thin |
| Reproducibility | Partial→Good for registered trail |
| Open Questions | Contrary corpus; legal/econ modeling; Arkansas studies |
| Known Weaknesses | Contrary asymmetry; author dual-role; no peer review yet |
| Research Risk | Medium — infrastructure growing faster than evidence if unchecked |
| Methodology Stability | Calibrating (healthy) |
| PP-02 Readiness | **CONDITIONAL GO** |
`,
);

write(
  "research/methodology/RESEARCH_METHODOLOGY_CALIBRATION_REPORT.md",
  `# Research Methodology Calibration Report

**Slice:** CC-PHASE-2.3  
**Date:** ${TODAY}

## Executive finding

PP-FF-01 successfully stress-tested Methodology 1.0. The investigator process worked; the critical weakness is **contrary external evidence registration**, not verdict honesty.

## Methodology Version Recommendation

- Keep **1.0** active for the closed PP-FF-01 draft record.
- Approve **1.1** proposed changes via Accepted backlog items before marking new packets Complete.
- Do not rewrite PP-FF-01 doctrine language.

## Lessons Learned

See \`PP_METHOD_LESSONS_LEARNED.md\`.

## Research Quality Metrics

See \`research_quality_metrics.md\` — contrary ratio 0.0 is the headline metric.

## Reproducibility Assessment

**Partial / Good** on registered sources; improve search protocol for negatives.

## Methodology Improvement Backlog

See \`methodology_improvement_backlog.json\` — 5 Accepted, 1 Deferred, 1 Rejected.

## Readiness Recommendation for PP-02

# CONDITIONAL GO

Conditions:

1. Methodology 1.1 Accepted items encoded in \`proofpacket:validate\` (soft warnings + Complete hard fails).
2. At least one contrary external source path identified for the next packet’s topic (register before or during Researching).
3. Packet authors attach confirmation-bias checklist.
4. No new doctrine/principles/architecture while executing.

**HOLD** only if the project starts a second packet without addressing contrary-source asymmetry.
`,
);

write(
  "research/methodology/README.md",
  `# Research Methodology

Calibration home for the Proof Packet methodology (CC-PHASE-2.3).  
Active packet methodology version is tracked in \`methodology_version_history.json\`.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 4 — Canonical Research Corpus
// ═══════════════════════════════════════════════════════════════

write(
  "research/corpus/README.md",
  `# Canonical Research Corpus

**Slice:** CC-PHASE-2.4-CANONICAL-RESEARCH-CORPUS-1.0  

One source. Many uses. Research once. Use many times.  
Stores evidence — **not** doctrine.

Canonical claim/source ledgers remain authoritative in \`data/research/\`.  
This corpus is the reusable research library layer that indexes and extends them.
`,
);

writeJson("research/corpus/source_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  authority_note:
    "Mirrors and extends data/research/source_registry.json. New corpus entries must eventually sync to the data ledger before packet Complete.",
  canonical_data_ledger: "data/research/source_registry.json",
  sources: [
    {
      source_id: "CC-SRC-073",
      title: "America’s Farms and Ranches at a Glance: 2024 Edition",
      author: "USDA Economic Research Service",
      organization: "USDA ERS",
      publication: "EIB-283",
      year: 2024,
      country: "US",
      jurisdiction: "US",
      source_type: "federal_statistical",
      peer_reviewed: false,
      government: true,
      book: false,
      article: false,
      dataset: false,
      report: true,
      case_study: false,
      statute: false,
      court_opinion: false,
      credibility: "primary_official",
      review_status: "accepted",
      topics: ["Agriculture", "Rural Development", "Family Farms"],
      claims_supported: ["CC-CLAIM-124"],
      claims_contradicted: [],
      notes: "Seeded from PP-FF-01",
    },
    {
      source_id: "CC-SRC-074",
      title: "2023 Farm to School Census",
      author: "USDA Food and Nutrition Service",
      organization: "USDA FNS",
      publication: "Farm to School Census",
      year: 2024,
      country: "US",
      jurisdiction: "US",
      source_type: "federal_statistical",
      peer_reviewed: false,
      government: true,
      book: false,
      article: false,
      dataset: true,
      report: true,
      case_study: false,
      statute: false,
      court_opinion: false,
      credibility: "primary_official",
      review_status: "accepted",
      topics: ["Agriculture", "Food Systems", "Education", "Local Food"],
      claims_supported: ["CC-CLAIM-125"],
      claims_contradicted: [],
      notes: "Seeded from PP-FF-01",
    },
    {
      source_id: "CC-SRC-039",
      title: "Local Agriculture Market Program (LAMP)",
      author: "USDA Agricultural Marketing Service",
      organization: "USDA AMS",
      publication: "Program page",
      year: 2024,
      country: "US",
      jurisdiction: "US",
      source_type: "federal_program",
      peer_reviewed: false,
      government: true,
      book: false,
      article: false,
      dataset: false,
      report: false,
      case_study: false,
      statute: false,
      court_opinion: false,
      credibility: "primary_official",
      review_status: "accepted",
      topics: ["Agriculture", "Food Systems", "Cooperatives", "Infrastructure"],
      claims_supported: ["CC-CLAIM-126"],
      claims_contradicted: [],
      notes: "Seeded from PP-FF-01",
    },
  ],
});

writeJson("research/corpus/topic_taxonomy.json", {
  version: "1.0.0",
  last_updated: TODAY,
  topics: [
    { id: "TOP-AG", name: "Agriculture", children: ["TOP-AG-LOCAL", "TOP-AG-FAMILY", "TOP-AG-REGEN"] },
    { id: "TOP-AG-LOCAL", name: "Local Food", children: [] },
    { id: "TOP-AG-FAMILY", name: "Family Farms", children: [] },
    { id: "TOP-AG-REGEN", name: "Regenerative Agriculture", children: [] },
    { id: "TOP-EDU", name: "Education", children: [] },
    { id: "TOP-HEALTH", name: "Healthcare", children: [] },
    { id: "TOP-ENERGY", name: "Energy", children: [] },
    { id: "TOP-TAX", name: "Taxation", children: [] },
    { id: "TOP-RETIRE", name: "Retirement", children: [] },
    { id: "TOP-HOUSING", name: "Housing", children: [] },
    { id: "TOP-CW", name: "Community Wealth", children: [] },
    { id: "TOP-OWN", name: "Ownership", children: [] },
    { id: "TOP-EMS", name: "Emergency Services", children: [] },
    { id: "TOP-TRANS", name: "Transportation", children: [] },
    { id: "TOP-GOV", name: "Governance", children: [] },
    { id: "TOP-EDEV", name: "Economic Development", children: [] },
    { id: "TOP-LG", name: "Local Government", children: [] },
    { id: "TOP-COOP", name: "Cooperatives", children: [] },
    { id: "TOP-RURAL", name: "Rural Development", children: [] },
    { id: "TOP-MFG", name: "Manufacturing", children: [] },
    { id: "TOP-INFRA", name: "Infrastructure", children: [] },
    { id: "TOP-NR", name: "Natural Resources", children: [] },
    { id: "TOP-FOOD", name: "Food Systems", children: [] },
  ],
});

writeJson("research/corpus/contracts/evidence_object.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "EvidenceObject",
  type: "object",
  required: [
    "evidence_id",
    "source_id",
    "summary",
    "claim",
    "supports",
    "qualifies",
    "contradicts",
    "confidence",
    "limitations",
    "jurisdiction",
    "time_period",
    "relevance",
    "research_notes",
  ],
  properties: {
    evidence_id: { type: "string", pattern: "^EV-[A-Z0-9-]+$" },
    source_id: { type: "string" },
    summary: { type: "string" },
    claim: { type: "string" },
    supports: { type: "array", items: { type: "string" } },
    qualifies: { type: "array", items: { type: "string" } },
    contradicts: { type: "array", items: { type: "string" } },
    confidence: { type: "string", enum: ["Very Low", "Low", "Moderate", "High", "Very High"] },
    limitations: { type: "string" },
    jurisdiction: { type: "string" },
    time_period: { type: "string" },
    relevance: { type: "string" },
    research_notes: { type: "string" },
  },
});

writeJson("research/corpus/evidence/seed_evidence_objects.json", {
  version: "1.0.0",
  last_updated: TODAY,
  objects: [
    {
      evidence_id: "EV-FF-001",
      source_id: "CC-SRC-073",
      summary: "Family farms dominate U.S. farm counts; production value concentrated.",
      claim: "CC-CLAIM-124",
      supports: ["CC-CLAIM-124"],
      qualifies: ["HYP-116"],
      contradicts: [],
      confidence: "High",
      limitations: "Descriptive structure only; not prosperity proof",
      jurisdiction: "US",
      time_period: "2023",
      relevance: "PP-FF-01 structural baseline",
      research_notes: "Seeded from PP-FF-01",
    },
    {
      evidence_id: "EV-FF-002",
      source_id: "CC-SRC-074",
      summary: "Farm-to-school local purchases material among participating SFAs.",
      claim: "CC-CLAIM-125",
      supports: ["CC-CLAIM-125"],
      qualifies: ["HYP-116"],
      contradicts: [],
      confidence: "High",
      limitations: "Local definitions; milk share; cost barriers",
      jurisdiction: "US",
      time_period: "SY_2022_23",
      relevance: "PP-FF-01 institutional purchasing",
      research_notes: "Seeded from PP-FF-01",
    },
    {
      evidence_id: "EV-FF-003",
      source_id: "CC-SRC-039",
      summary: "USDA LAMP supports local/regional market tools.",
      claim: "CC-CLAIM-126",
      supports: ["CC-CLAIM-126"],
      qualifies: ["HYP-116"],
      contradicts: [],
      confidence: "Moderate",
      limitations: "Program ≠ Food Utility Cooperative",
      jurisdiction: "US",
      time_period: "contemporary",
      relevance: "PP-FF-01 missing-middle context",
      research_notes: "Seeded from PP-FF-01",
    },
  ],
});

writeJson("research/corpus/author_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  authors: [
    {
      author_id: "AUTH-USDA-ERS",
      author: "USDA Economic Research Service",
      institution: "USDA",
      discipline: "agricultural_economics",
      expertise: ["farm structure", "rural economy"],
      publications: ["CC-SRC-073"],
      credibility: "primary_official",
      reviewed_sources: ["CC-SRC-073"],
    },
    {
      author_id: "AUTH-USDA-FNS",
      author: "USDA Food and Nutrition Service",
      institution: "USDA",
      discipline: "nutrition_policy",
      expertise: ["farm to school", "institutional food"],
      publications: ["CC-SRC-074"],
      credibility: "primary_official",
      reviewed_sources: ["CC-SRC-074"],
    },
    {
      author_id: "AUTH-USDA-AMS",
      author: "USDA Agricultural Marketing Service",
      institution: "USDA",
      discipline: "agricultural_markets",
      expertise: ["local food markets", "grants"],
      publications: ["CC-SRC-039"],
      credibility: "primary_official",
      reviewed_sources: ["CC-SRC-039"],
    },
  ],
});

writeJson("research/corpus/institution_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  institutions: [
    { id: "INST-USDA", name: "USDA", type: "federal_agency", country: "US" },
    { id: "INST-ERS", name: "ERS", type: "federal_research", parent: "INST-USDA", country: "US" },
    { id: "INST-NRCS", name: "NRCS", type: "federal_agency", parent: "INST-USDA", country: "US" },
    { id: "INST-FNS", name: "FNS", type: "federal_agency", parent: "INST-USDA", country: "US" },
    { id: "INST-AMS", name: "AMS", type: "federal_agency", parent: "INST-USDA", country: "US" },
    { id: "INST-GAO", name: "GAO", type: "federal_watchdog", country: "US" },
    { id: "INST-CRS", name: "Congressional Research Service", type: "legislative_research", country: "US" },
    { id: "INST-FED", name: "Federal Reserve", type: "central_bank", country: "US" },
    { id: "INST-UNI", name: "Universities", type: "academic_category", country: "US" },
    { id: "INST-STATE", name: "State agencies", type: "state_category", country: "US" },
    { id: "INST-TT", name: "Think tanks", type: "advocacy_research_category", country: "US" },
    { id: "INST-IO", name: "International organizations", type: "international_category", country: "INTL" },
  ],
});

writeJson("research/corpus/research_relationship_graph.json", {
  version: "1.0.0",
  last_updated: TODAY,
  note: "First layer toward Systems Intelligence knowledge graph. References only — no inference.",
  layers: [
    "Sources",
    "Evidence Objects",
    "Claims",
    "Proof Packets",
    "Living Community Laboratories",
    "Comparative Studies",
    "Systems Intelligence",
  ],
  edges: [
    { from: "CC-SRC-073", to: "EV-FF-001", type: "provides_evidence" },
    { from: "EV-FF-001", to: "CC-CLAIM-124", type: "supports_claim" },
    { from: "CC-CLAIM-124", to: "PP-FF-01", type: "evaluated_in_packet" },
    { from: "CC-SRC-074", to: "EV-FF-002", type: "provides_evidence" },
    { from: "EV-FF-002", to: "CC-CLAIM-125", type: "supports_claim" },
    { from: "CC-CLAIM-125", to: "PP-FF-01", type: "evaluated_in_packet" },
    { from: "CC-SRC-039", to: "EV-FF-003", type: "provides_evidence" },
    { from: "EV-FF-003", to: "CC-CLAIM-126", type: "supports_claim" },
    { from: "CC-CLAIM-126", to: "PP-FF-01", type: "evaluated_in_packet" },
  ],
});

writeJson("research/corpus/contradictory_evidence_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  entries: [
    {
      id: "CONTRA-FF-001",
      claim: "CC-CLAIM-124 / HYP-116 prosperity reading",
      supporting_evidence: ["EV-FF-001"],
      contradictory_evidence: ["Production value concentrated on larger operations (claim opposing note)"],
      research_gap: "Registered external studies on small-farm prosperity mechanisms",
      status: "open",
    },
    {
      id: "CONTRA-FF-002",
      claim: "CC-CLAIM-125 as proof of CC purchase floors",
      supporting_evidence: ["EV-FF-002"],
      contradictory_evidence: ["Local definition variance; milk share; cost/availability barriers"],
      research_gap: "Peer-reviewed procurement barrier and food-hub failure literature",
      status: "open",
    },
    {
      id: "CONTRA-FF-003",
      claim: "CC-CLAIM-126 as Food Utility Cooperative existence",
      supporting_evidence: ["EV-FF-003"],
      contradictory_evidence: ["Program existence ≠ farmer-controlled utility at scale"],
      research_gap: "Empirical food utility / cooperative infrastructure outcome studies",
      status: "open",
    },
  ],
});

write(
  "research/corpus/standards/duplicate_source_validator.md",
  `# Duplicate Source Validator

Prevent the same paper, dataset, or report being entered multiple times.

## Checks

1. Exact \`source_id\` uniqueness
2. Normalized title+year+organization match
3. URL match
4. DOI / report number match when present
5. New edition → link \`supersedes\` / \`superseded_by\`, do not silently replace

Automated in \`npm run corpus:validate\`.
`,
);

write(
  "research/corpus/standards/CANONICAL_CITATION_STANDARD.md",
  `# Canonical Citation Standard

## Required fields

source_id, title, author/organization, year, url (when public), jurisdiction, source_type, retrieval_date, limitations

## Forms

- **Short:** \`CC-SRC-074 (USDA FNS 2024)\`
- **Full:** Author. Year. Title. Publisher/Agency. URL.
- **Government:** Agency. Title. Series/Report No. Year. URL.
- **Court:** Case name, reporter, year, jurisdiction
- **Dataset:** Name, version, producer, year, access URL
- **Web:** Author/Org. Title. Site. Publication/Update date. Retrieved date. URL.
- **Book:** Author. Year. Title. Publisher.
`,
);

write(
  "research/corpus/standards/SOURCE_QUALITY_STANDARD.md",
  `# Source Quality Standard

Never confuse these categories:

| Label | Meaning |
| --- | --- |
| Primary | Original data, statute, opinion, official statistics |
| Secondary | Analysis of primary materials |
| Tertiary | Summaries/encyclopedic |
| Opinion | Normative commentary |
| Editorial | Editorial board positions |
| Research | Systematic inquiry (may be peer-reviewed or not) |
| Government | Official public-sector publication |
| Peer-reviewed | Passed external scholarly review |
| Industry | Trade/industry association |
| Advocacy | Mission-driven persuasion research |
| Unknown | Insufficient metadata — do not treat as strong |

PP-FF-01 supporting sources are **Government / Primary official**, not peer-reviewed research.
`,
);

write(
  "research/corpus/research_coverage.md",
  `# Research Coverage

| Metric | Value (seed) |
| --- | --- |
| Total Sources (corpus index) | 3 |
| Government % | 100% |
| Academic % | 0% |
| Books % | 0% |
| Peer Reviewed % | 0% |
| Primary % | 100% |
| Secondary % | 0% |
| Topics Covered | Agriculture, Local Food, Family Farms, Food Systems, Education, Cooperatives, Infrastructure |
| Topics Weak | Healthcare, Energy, Housing, Manufacturing, most non-ag domains |
| Research Gaps | Contrary food-hub/coop literature; Arkansas studies; peer-reviewed local food economics |
| Open Questions | See contradictory_evidence_registry.json |
`,
);

write(
  "research/corpus/CANONICAL_RESEARCH_CORPUS_REPORT.md",
  `# Canonical Research Corpus Report

**Slice:** CC-PHASE-2.4  
**Date:** ${TODAY}

## Summary

Corpus OS created. Seeded with three PP-FF-01 USDA sources as reusable assets. Authoritative claim/source ledgers remain in \`data/research/\`.

## Topic Coverage Report

Strong (seed): Agriculture / Local Food. Weak: nearly all other taxonomy topics.

## Research Gap Inventory

Contrary literature; peer-reviewed local food economics; Arkansas-specific studies; non-ag domains empty.

## Source Quality Summary

All seed sources government/primary official. Zero peer-reviewed. Quality honest, coverage thin.

## Knowledge Graph Readiness Assessment

Relationship graph layer 1 present (sources→evidence→claims→packet). Ready for Script 8 expansion.

## Corpus Validation Report

See \`npm run corpus:validate\`.

## Recommendations Before PP-02

1. Register ≥1 contrary external source into corpus + data ledger.
2. Expand topic coverage only when executing packets — do not bulk-scrape.
3. Keep dual-write rule: corpus index ↔ data/research source_registry.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 5 — LCL Operating System
// ═══════════════════════════════════════════════════════════════

const LCL = "research/living_community_laboratories";

write(
  `${LCL}/README.md`,
  `# Living Community Laboratory Operating System

**Slice:** CC-PHASE-2.5  
Communities are research partners — not experiments or validation pilots.  
Bridges \`data/project/living_community_laboratories.json\` without implementing Lewisville/Rose Bud.
`,
);

write(
  `${LCL}/templates/LCL_TEMPLATE.md`,
  `# LCL Template

Required structure (do not delete headings):

## Executive Summary
## Community Identity
## Prosperity Engine
## Baseline
## Assets
## Challenges
## Institutional Landscape
## Economic Structure
## Education
## Healthcare
## Housing
## Transportation
## Agriculture
## Infrastructure
## Governance
## Natural Resources
## Businesses
## Community Organizations
## Systems Map
## Scenario Analysis
## Research Questions
## Evidence
## Unknowns
## Risks
## Boundary Conditions
## Lessons
## Supports
## Qualifies
## Contradicts
## Future Research

Investigator rule: Reality determines the verdict. No community is expected to validate Constitutional Capitalism.
`,
);

writeJson(`${LCL}/contracts/community_profile.contract.json`, {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "CommunityProfile",
  type: "object",
  required: [
    "community_id",
    "name",
    "county",
    "population",
    "geography",
    "prosperity_engine",
    "demographics",
    "industries",
    "major_assets",
    "major_challenges",
    "research_status",
    "comparison_group",
    "review_status",
  ],
  properties: {
    community_id: { type: "string" },
    name: { type: "string" },
    county: { type: "string" },
    population: { type: ["string", "null"] },
    geography: { type: "string" },
    prosperity_engine: { type: "string" },
    demographics: { type: "string" },
    industries: { type: "array", items: { type: "string" } },
    major_assets: { type: "array", items: { type: "string" } },
    major_challenges: { type: "array", items: { type: "string" } },
    research_status: { type: "string" },
    comparison_group: { type: "string" },
    review_status: { type: "string" },
  },
});

writeJson(`${LCL}/registries/prosperity_engine_registry.json`, {
  version: "1.0.0",
  last_updated: TODAY,
  engines: [
    "Agriculture",
    "Resource Development",
    "Education",
    "Manufacturing",
    "Healthcare",
    "Tourism",
    "Technology",
    "Transportation",
    "Forestry",
    "Outdoor Recreation",
    "Regional Services",
    "Mixed Economy",
  ],
  rule: "Communities may have multiple engines; designate one primary. Engines are studied, not prescribed.",
});

write(
  `${LCL}/comparative/comparative_methodology.md`,
  `# Comparative Methodology

Research questions:

1. Why did Community A succeed?
2. Why did Community B struggle?
3. Which institutions differed?
4. Which conditions differed?
5. Which doctrines transferred?
6. Which doctrines failed?
7. Which variables mattered most?
8. What surprised us?

Rule: Compare without forcing communities to become identical. Authentic local prosperity engines first (UPD-065).
`,
);

writeJson(`${LCL}/contracts/community_systems_map.contract.json`, {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "CommunitySystemsMap",
  type: "object",
  required: ["map_id", "community_id", "relationships"],
  properties: {
    map_id: { type: "string" },
    community_id: { type: "string" },
    relationships: {
      type: "array",
      items: {
        type: "object",
        required: ["from", "to", "direction", "strength", "confidence", "time_delay", "evidence"],
        properties: {
          from: { type: "string" },
          to: { type: "string" },
          direction: { type: "string" },
          strength: { type: "string" },
          confidence: { type: "string" },
          time_delay: { type: "string" },
          evidence: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
});

write(
  `${LCL}/scenarios/scenario_framework.md`,
  `# Scenario Framework

Every LCL evaluates (no preferred scenario):

1. Current Trajectory
2. Conservative Improvement
3. Institutional Innovation
4. High Transformation
5. Counterfactual

Only comparison — not advocacy.
`,
);

writeJson(`${LCL}/metrics/community_metrics_registry.json`, {
  version: "1.0.0",
  last_updated: TODAY,
  categories: [
    "Population",
    "Employment",
    "Median Income",
    "Household Wealth",
    "Business Formation",
    "School Performance",
    "Health",
    "Housing",
    "Infrastructure",
    "Agriculture",
    "Emergency Services",
    "Food Security",
    "Energy",
    "Transportation",
    "Community Participation",
    "Environmental Quality",
  ],
  metric_fields: ["baseline", "trend", "confidence", "source", "limitations"],
  note: "No fabricated baselines. Register sources before values.",
});

writeJson(`${LCL}/registries/community_relationship_graph.json`, {
  version: "1.0.0",
  last_updated: TODAY,
  layers: [
    "Communities",
    "Prosperity Engines",
    "Institutions",
    "Doctrines",
    "Evidence",
    "Research Corpus",
    "Proof Packets",
  ],
  planned_communities: [
    { community_id: "CC-CASE-LEWISVILLE-001", primary_engine: "Resource Development", status: "scaffold_only" },
    { community_id: "CC-CASE-ROSEBUD-001", primary_engine: "Education", status: "scaffold_only" },
  ],
  note: "No field implementation in this slice.",
});

write(
  `${LCL}/community_comparison_dashboard.md`,
  `# Community Comparison Dashboard

| Indicator | Status |
| --- | --- |
| Communities Studied | 0 (2 scaffolds planned) |
| Prosperity Engines | Registry ready |
| Doctrines Tested | None in field |
| Evidence Strength | N/A |
| Research Confidence | Very Low (no baselines yet) |
| Comparative Findings | None |
| Open Questions | Baseline authority; LEARNS/funding (Rose Bud); transition economics (Lewisville) |
`,
);

write(
  `${LCL}/LCL_OPERATING_MANUAL.md`,
  `# Living Community Laboratory Operating Manual

**Slice:** CC-PHASE-2.5  

## Gates before any LCL begins

1. Community selected  
2. Baseline complete (registered sources only)  
3. Research questions approved  
4. Evidence framework ready  
5. Systems map defined  
6. Scenario framework defined  

## Completion deliverables present

- Template, profile contract, prosperity engines, comparative methodology  
- Systems map contract, scenario framework, metrics registry  
- Relationship graph stub, comparison dashboard  

## Readiness

**Framework ready. Field work not started.** Lewisville and Rose Bud inherit this OS when baselines are authorized.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 6 — Research Intelligence Pipeline
// ═══════════════════════════════════════════════════════════════

write(
  "research_pipeline/README.md",
  `# Research Intelligence Pipeline

**Slice:** CC-PHASE-2.6  

AI discovers and organizes. Humans verify and decide.  
Nothing enters doctrine automatically. Review-first.

Lifecycle: Discovery → Validation → Acquisition → Metadata → Claim Extraction → Classification → Contradiction Detection → Human Review → Canonical Corpus → Packets / LCLs / SIE
`,
);

writeJson("research_pipeline/schemas/pipeline_stages.json", {
  version: "1.0.0",
  stages: [
    { id: 1, name: "Discovery", store: "metadata_only" },
    { id: 2, name: "Acquisition", store: "document_record" },
    { id: 3, name: "Metadata Extraction", store: "metadata/" },
    { id: 4, name: "Claim Extraction", store: "claim_extraction/", provisional: true },
    { id: 5, name: "Evidence Classification", labels: ["Supports", "Qualifies", "Contradicts", "Neutral", "Background", "Unknown"] },
    { id: 6, name: "Citation Builder", formats: ["APA", "Chicago", "Government", "Court", "Dataset", "Web", "Book"] },
    { id: 7, name: "Duplicate Detection", store: "dedup/" },
    { id: 8, name: "Contradiction Detection", output: "Research Conflict" },
    { id: 9, name: "Human Review Queue", statuses: ["Needs Review", "Accepted", "Rejected", "Needs More Research"] },
    { id: 10, name: "Canonical Corpus", gate: "human_accepted_only" },
  ],
  ai_may_suggest: ["summary", "claims", "citations", "contradictions", "confidence", "topics"],
  ai_may_not: ["final_verdicts", "doctrine_changes", "automatic_publication"],
});

writeJson("research_pipeline/jobs/discovery_job_types.json", {
  version: "1.0.0",
  job_types: [
    "Academic literature",
    "Government reports",
    "Court opinions",
    "Legislation",
    "Datasets",
    "Statistical releases",
    "Policy papers",
    "Books",
    "Historical archives",
    "Conference proceedings",
    "Case studies",
    "International organizations",
    "Think tanks",
  ],
  status: "framework_only_no_live_connectors",
});

writeJson("research_pipeline/schemas/database_tables.json", {
  version: "1.0.0",
  tables: [
    "research_documents",
    "research_sources",
    "research_claims",
    "research_citations",
    "research_topics",
    "research_reviews",
    "research_conflicts",
    "research_jobs",
    "research_ingest",
    "research_relationships",
  ],
  note: "Schema registry only — no production database in this slice.",
});

writeJson("research_pipeline/review/review_queue.json", {
  version: "1.0.0",
  last_updated: TODAY,
  queue: [],
  note: "Empty by design. No automated ingest yet.",
});

write(
  "research_pipeline/reports/PIPELINE_MANUAL.md",
  `# Research Intelligence Pipeline Manual

Review-first supply chain for research assets.  
Connectors are stubs. No live scraping. No doctrine influence without human acceptance.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 7 — Continuous Research Watch
// ═══════════════════════════════════════════════════════════════

write(
  "research_watch/README.md",
  `# Continuous Research Watch

**Slice:** CC-PHASE-2.7  

Research never finishes. Confidence evolves. Doctrine earns confidence continuously.  
Watch recommends. Humans decide. Never auto-updates doctrine/verdicts/confidence.
`,
);

writeJson("research_watch/watch_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  watches: [
    {
      watch_id: "WATCH-PP-FF-01",
      topic: "Local food / family farm prosperity",
      claim: "CC-CLAIM-124,125,126",
      proof_packet: "PP-FF-01",
      community: null,
      priority: "High",
      watch_type: "proof_packet",
      frequency: "monthly",
      review_status: "Open",
      owner: "Founding Steward",
    },
    {
      watch_id: "WATCH-CLAIM-124",
      topic: "Farm structure",
      claim: "CC-CLAIM-124",
      proof_packet: "PP-FF-01",
      community: null,
      priority: "Normal",
      watch_type: "claim",
      frequency: "quarterly",
      review_status: "Open",
      owner: null,
    },
    {
      watch_id: "WATCH-LCL-LEWISVILLE",
      topic: "Resource transition / regional planning",
      claim: null,
      proof_packet: null,
      community: "CC-CASE-LEWISVILLE-001",
      priority: "Low",
      watch_type: "community",
      frequency: "quarterly",
      review_status: "Deferred",
      owner: null,
    },
    {
      watch_id: "WATCH-LCL-ROSEBUD",
      topic: "Education / rural development / agriculture",
      claim: null,
      proof_packet: null,
      community: "CC-CASE-ROSEBUD-001",
      priority: "Low",
      watch_type: "community",
      frequency: "quarterly",
      review_status: "Deferred",
      owner: null,
    },
  ],
});

writeJson("research_watch/alerts/research_alert_queue.json", {
  version: "1.0.0",
  last_updated: TODAY,
  alerts: [],
  impact_labels: [
    "No Impact",
    "Background",
    "Supports",
    "Qualifies",
    "Potential Contradiction",
    "Major Contradiction",
    "Needs Immediate Review",
  ],
  workflow: ["Open", "Under Review", "Accepted", "Rejected", "Deferred", "Archived"],
});

writeJson("research_watch/reports/research_timeline.json", {
  version: "1.0.0",
  last_updated: TODAY,
  events: [
    {
      date: TODAY,
      type: "methodology_calibration",
      summary: "PP-FF-01 calibration complete; Research Watch initialized",
    },
    {
      date: TODAY,
      type: "proof_packet_draft",
      summary: "PP-FF-01 Qualifies / Low — watch subscribed",
    },
  ],
});

write(
  "research_watch/reports/CONTINUOUS_RESEARCH_WATCH_MANUAL.md",
  `# Continuous Research Watch Manual

Monitors scholarship, legislation, courts, datasets, and policy for impact on claims/packets/communities.  
Impact classification is advisory. Confidence drift is tracked, never auto-applied.
`,
);

writeJson("research_watch/change_detection/confidence_drift_framework.json", {
  version: "1.0.0",
  states: ["Confidence Increased", "Confidence Stable", "Confidence Decreasing", "Research Inconclusive"],
  rule: "History preserved. Humans apply changes via institutional history + packet revision — not silently.",
});

// ═══════════════════════════════════════════════════════════════
// SCRIPT 8 — Knowledge Graph Foundation
// ═══════════════════════════════════════════════════════════════

write(
  "knowledge_graph/README.md",
  `# Knowledge Graph Foundation

**Slice:** CC-PHASE-2.8  

Not Systems Intelligence. Structural map only.  
Legacy scaffold: \`data/research/knowledge_graph.json\` (CC-DEC-072). This foundation extends research-object connectivity without AI inference.
`,
);

writeJson("knowledge_graph/contracts/knowledge_node.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "KnowledgeNode",
  type: "object",
  required: [
    "node_id",
    "node_type",
    "title",
    "summary",
    "status",
    "created",
    "updated",
    "confidence",
    "owner",
    "source_reference",
    "review_status",
  ],
  properties: {
    node_id: { type: "string" },
    node_type: { type: "string" },
    title: { type: "string" },
    summary: { type: "string" },
    status: { type: "string" },
    created: { type: "string" },
    updated: { type: "string" },
    confidence: { type: "string" },
    owner: { type: ["string", "null"] },
    source_reference: { type: ["string", "null"] },
    review_status: { type: "string" },
  },
});

writeJson("knowledge_graph/contracts/relationship.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "KnowledgeRelationship",
  type: "object",
  required: [
    "relationship_id",
    "from_node",
    "to_node",
    "relationship_type",
    "direction",
    "confidence",
    "evidence",
    "notes",
    "created",
    "review_status",
  ],
  properties: {
    relationship_id: { type: "string" },
    from_node: { type: "string" },
    to_node: { type: "string" },
    relationship_type: { type: "string" },
    direction: { type: "string" },
    confidence: { type: "string" },
    evidence: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
    created: { type: "string" },
    review_status: { type: "string" },
  },
});

writeJson("knowledge_graph/registry/node_types.json", {
  version: "1.0.0",
  node_types: [
    "Principle",
    "Decision",
    "Doctrine",
    "Claim",
    "Proof Packet",
    "Evidence",
    "Source",
    "Author",
    "Institution",
    "Law",
    "Court Case",
    "Metric",
    "Dataset",
    "Community",
    "Prosperity Engine",
    "Living Community Laboratory",
    "Research Question",
    "Hypothesis",
    "Scenario",
    "Variable",
    "Risk",
    "Assumption",
    "Review",
    "Research Gap",
  ],
});

writeJson("knowledge_graph/registry/relationship_types.json", {
  version: "1.0.0",
  relationship_types: [
    "supports",
    "qualifies",
    "contradicts",
    "depends_on",
    "requires",
    "measures",
    "influences",
    "causes",
    "associated_with",
    "implemented_by",
    "evaluated_by",
    "reviewed_by",
    "governed_by",
    "references",
    "extends",
    "derived_from",
    "tested_in",
    "compared_to",
    "monitored_by",
    "superseded_by",
    "related_to",
  ],
});

writeJson("knowledge_graph/nodes/seed_nodes.json", {
  version: "1.0.0",
  last_updated: TODAY,
  nodes: [
    {
      node_id: "KG-PP-FF-01",
      node_type: "Proof Packet",
      title: "PP-FF-01",
      summary: "Local Food and Family Farm Prosperity — Qualifies / Low",
      status: "Draft",
      created: TODAY,
      updated: TODAY,
      confidence: "Low",
      owner: null,
      source_reference: "research/proof_packets/PP-FF-01/PP-FF-01.md",
      review_status: "Draft",
    },
    {
      node_id: "KG-HYP-116",
      node_type: "Hypothesis",
      title: "HYP-116",
      summary: "Family farm wealth engines hypothesis",
      status: "Architectural hypothesis",
      created: TODAY,
      updated: TODAY,
      confidence: "Low",
      owner: null,
      source_reference: "data/project/architecture_incubator.json",
      review_status: "open",
    },
    {
      node_id: "KG-CLAIM-124",
      node_type: "Claim",
      title: "CC-CLAIM-124",
      summary: "Family farm structure statistics",
      status: "supported_descriptive",
      created: TODAY,
      updated: TODAY,
      confidence: "High",
      owner: null,
      source_reference: "data/research/claim_ledger.json",
      review_status: "accepted",
    },
  ],
});

writeJson("knowledge_graph/relationships/seed_relationships.json", {
  version: "1.0.0",
  last_updated: TODAY,
  relationships: [
    {
      relationship_id: "KGR-001",
      from_node: "KG-CLAIM-124",
      to_node: "KG-PP-FF-01",
      relationship_type: "evaluated_by",
      direction: "claim_to_packet",
      confidence: "High",
      evidence: ["CC-SRC-073"],
      notes: "Seed",
      created: TODAY,
      review_status: "accepted",
    },
    {
      relationship_id: "KGR-002",
      from_node: "KG-PP-FF-01",
      to_node: "KG-HYP-116",
      relationship_type: "qualifies",
      direction: "packet_to_hypothesis",
      confidence: "Low",
      evidence: ["PP-FF-01"],
      notes: "Packet verdict Qualifies hypothesis",
      created: TODAY,
      review_status: "accepted",
    },
  ],
});

writeJson("knowledge_graph/registry/knowledge_graph_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  total_nodes: 3,
  total_relationships: 2,
  node_types: 24,
  relationship_types: 21,
  orphan_nodes: 0,
  validation_status: "seed",
  coverage: "minimal_seed",
  graph_version: "0.1.0-foundation",
  legacy_scaffold: "data/research/knowledge_graph.json",
});

write(
  "knowledge_graph/queries/graph_queries.md",
  `# Graph Queries (structured traversal — no AI)

Examples:

- Show every claim supported by Principle X
- Show all evidence connected to Claim 124
- Show all Proof Packets referencing USDA
- Show every doctrine related to Community Wealth
- Show all communities using Agriculture as a prosperity engine
- Show every contradiction affecting PP-FF-01
- Show every research gap connected to Local Ownership

Implement via \`npm run graph:build\` exports + registry joins.
`,
);

write(
  "knowledge_graph/exports/knowledge_graph_summary.md",
  `# Knowledge Graph Summary

Seed foundation only. 3 nodes, 2 relationships. Phase 9 readiness: **foundation structure present, content thin**.
`,
);

write(
  "knowledge_graph/graph_readiness.md",
  `# Graph Readiness

| Metric | Status |
| --- | --- |
| Claims Connected | Minimal seed |
| Evidence Connected | Via corpus relationship graph |
| Proof Packets Connected | PP-FF-01 |
| Communities Connected | Planned IDs only |
| Research Questions Connected | Not yet |
| Review Coverage | Seed accepted edges only |
| Relationship Density | Very low |
| Knowledge Coverage | Foundation |
| Graph Completeness | Early |
`,
);

write(
  "knowledge_graph/KNOWLEDGE_GRAPH_ARCHITECTURE_GUIDE.md",
  `# Knowledge Graph Architecture Guide

Nodes and relationships are explicit, evidenced, and human-reviewed.  
No inferred edges become canonical automatically.  
\`npm run graph:build\` assembles exports; \`npm run graph:validate\` checks integrity.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 9 — Evidence Synthesis Engine
// ═══════════════════════════════════════════════════════════════

write(
  "evidence_synthesis/README.md",
  `# Evidence Synthesis Engine

**Slice:** CC-PHASE-2.9  

Synthesizes collections of research into structured bodies of evidence.  
Never replaces studies. Never auto-changes doctrine/verdicts/confidence.
`,
);

writeJson("evidence_synthesis/contracts/evidence_synthesis.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "EvidenceSynthesis",
  type: "object",
  required: [
    "synthesis_id",
    "topic",
    "research_question",
    "included_sources",
    "excluded_sources",
    "selection_reason",
    "summary",
    "major_findings",
    "contradictions",
    "limitations",
    "confidence",
    "research_gaps",
    "recommended_next_steps",
    "review_status",
    "methodology_version",
  ],
  additionalProperties: true,
});

writeJson("evidence_synthesis/exports/evidence_matrix.json", {
  version: "1.0.0",
  last_updated: TODAY,
  topics: {
    "Family Farms": {
      supporting_studies: ["CC-SRC-073", "CC-SRC-074", "CC-SRC-039"],
      contrary_studies: [],
      mixed_results: ["definitional_local_and_production_concentration_notes"],
      unknown: ["comparative_prosperity_vs_conventional"],
      research_quality: "descriptive_government",
      jurisdictions: ["US"],
      time_periods: ["2023", "SY_2022_23"],
      sample_size: "national_federal_products",
      applicability: "baselines_not_system_proof",
    },
  },
});

writeJson("evidence_synthesis/conflicts/research_conflict_matrix.json", {
  version: "1.0.0",
  last_updated: TODAY,
  conflicts: [
    {
      question: "Do institutional local purchases prove CC-style prosperity systems?",
      supporting_position: "Material farm-to-school local spend exists",
      contrary_position: "Definition/milk/cost barriers; floors untested",
      evidence_strength: "Moderate descriptive / Low for system claim",
      missing_research: "Comparative outcome studies; contrary food-hub literature",
      recommended_review: "Before PP-FF-01 Complete",
    },
  ],
});

writeJson("evidence_synthesis/research_gaps/research_gap_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  gaps: [
    { id: "GAP-001", title: "Food hub / cooperative failure literature", impact: "High", status: "open" },
    { id: "GAP-002", title: "Arkansas-specific local food studies", impact: "High", status: "open" },
    { id: "GAP-003", title: "Longitudinal prosperity comparisons", impact: "High", status: "open" },
    { id: "GAP-004", title: "Legal feasibility of purchase preferences", impact: "High", status: "open" },
    { id: "GAP-005", title: "Economic modeling of floors/utilities", impact: "High", status: "open", blocked_by: "modeling_honesty_dial_0" },
  ],
});

writeJson("evidence_synthesis/confidence/topic_confidence_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  topics: [
    {
      topic: "Family Farm Prosperity",
      historical: "Very Low",
      economic: "Low",
      legal: "Very Low",
      implementation: "Low",
      overall: "Low",
    },
  ],
});

writeJson("evidence_synthesis/exports/topic_evidence_timeline.json", {
  version: "1.0.0",
  topics: {
    "Family Farms": {
      first_registered_sources: ["CC-SRC-039", "CC-SRC-073", "CC-SRC-074"],
      major_milestones: ["PP-FF-01 Qualifies draft"],
      contradictory_findings: ["production concentration", "local definition barriers"],
      current_state: "Descriptive baselines only",
      future_watch: "WATCH-PP-FF-01",
    },
  },
});

write(
  "evidence_synthesis/EVIDENCE_SYNTHESIS_MANUAL.md",
  `# Evidence Synthesis Manual

Consensus labels: Strong / Moderate / Emerging / Mixed / Limited / Conflicting / Insufficient Evidence.  
Never force consensus. Minority findings remain visible.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 10 — Scenario & Modeling Laboratory
// ═══════════════════════════════════════════════════════════════

write(
  "modeling/README.md",
  `# Scenario & Modeling Laboratory

**Slice:** CC-PHASE-2.10  

Models explore possibilities. They do not predict the future.  
Not Phase 9. Not public calculators. Modeling honesty dial remains 0% for results.
`,
);

writeJson("modeling/contracts/model.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "ResearchModel",
  type: "object",
  required: [
    "model_id",
    "title",
    "research_question",
    "purpose",
    "scope",
    "included_variables",
    "excluded_variables",
    "assumptions",
    "constraints",
    "outputs",
    "limitations",
    "confidence",
    "validation_status",
    "methodology_version",
  ],
  additionalProperties: true,
});

writeJson("modeling/contracts/community_model.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "CommunityModel",
  type: "object",
  required: ["model_id", "community_id", "scenarios", "status"],
  properties: {
    model_id: { type: "string" },
    community_id: { type: "string" },
    scenarios: { type: "array", items: { type: "string" } },
    status: { type: "string", const: "future_use_only" },
  },
});

writeJson("modeling/registries/variable_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  variables: [
    "Population",
    "Employment",
    "Median Income",
    "Farm Profitability",
    "Housing Units",
    "Business Formation",
    "Tax Revenue",
    "Food Production",
    "Transportation Cost",
    "School Enrollment",
    "Emergency Response Time",
    "Infrastructure Investment",
    "Energy Cost",
    "Volunteer Participation",
  ].map((name, i) => ({
    variable_id: `VAR-${String(i + 1).padStart(3, "0")}`,
    name,
    definition: "TBD when modeling authorized",
    unit: "TBD",
    baseline: null,
    minimum: null,
    maximum: null,
    confidence: "Very Low",
    source: null,
    jurisdiction: "US",
    time_horizon: "TBD",
    review_status: "placeholder",
  })),
});

writeJson("modeling/registries/assumption_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  assumptions: [],
  rule: "Every future model assumption needs reason, supporting/contrary evidence, confidence, review status.",
});

writeJson("modeling/registries/constraint_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  constraints: [
    "Constitutional",
    "Legal",
    "Budgetary",
    "Geographic",
    "Environmental",
    "Administrative",
    "Political",
    "Infrastructure",
    "Workforce",
  ],
});

writeJson("modeling/registries/model_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  models: [],
  note: "No executed models in Phase 2 honesty dials.",
});

write(
  "modeling/sensitivity/sensitivity_framework.md",
  `# Sensitivity Framework

Determine which assumptions matter most, which variables dominate, which create instability, and which have little influence. Required before any model Complete.
`,
);

write(
  "modeling/validation/uncertainty_standard.md",
  `# Uncertainty Standard

Document known, unknown, evidence, model, and external uncertainty. Never hide uncertainty.
`,
);

write(
  "modeling/validation/model_validation.md",
  `# Model Validation

- Are assumptions explicit?
- Can results be reproduced?
- Are variables sourced?
- Are limitations documented?
- Were sensitivity tests run?
- Were contradictory scenarios tested?
`,
);

write(
  "modeling/SCENARIO_MODELING_LABORATORY_MANUAL.md",
  `# Scenario & Modeling Laboratory Manual

Scenarios: Baseline · Incremental · Moderate Reform · Transformational · Counterfactual · Sensitivity.  
No preferred outcome. Researchers interpret; models do not recommend policy.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 11 — Digital Observatory
// ═══════════════════════════════════════════════════════════════

write(
  "observatory/README.md",
  `# Constitutional Capitalism Digital Observatory

**Slice:** CC-PHASE-2.11  

Observes. Does not analyze, predict, or recommend.  
Telescopes before the AI astronomer.
`,
);

writeJson("observatory/registries/observatory_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  domains: 0,
  metrics: 0,
  communities: 0,
  datasets: 0,
  time_series: 0,
  quality: "framework_only",
  coverage: 0,
  status: "foundation",
});

writeJson("observatory/registries/domain_registry.json", {
  version: "1.0.0",
  domains: [
    "Agriculture",
    "Education",
    "Healthcare",
    "Infrastructure",
    "Transportation",
    "Housing",
    "Emergency Services",
    "Energy",
    "Business",
    "Employment",
    "Ownership",
    "Community Wealth",
    "Food Systems",
    "Environment",
    "Government",
    "Public Finance",
    "Population",
    "Civic Participation",
    "Volunteerism",
    "Public Trust",
    "Safety",
  ],
});

writeJson("observatory/contracts/measurement.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Measurement",
  type: "object",
  required: [
    "measurement_id",
    "metric",
    "domain",
    "community",
    "jurisdiction",
    "date",
    "value",
    "units",
    "confidence",
    "source",
    "method",
    "limitations",
    "review_status",
  ],
  additionalProperties: true,
});

writeJson("observatory/baselines/baseline_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  baselines: [],
  rule: "Never overwrite. Future measurements reference baseline. No fabricated values.",
});

writeJson("observatory/indices/index_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  indices: [
    "Prosperity",
    "Community Wealth",
    "Food Security",
    "Educational Opportunity",
    "Infrastructure",
    "Emergency Readiness",
    "Local Ownership",
    "Health",
    "Environmental Stewardship",
    "Community Resilience",
  ].map((name, i) => ({
    index_id: `IDX-${String(i + 1).padStart(3, "0")}`,
    name,
    formula: null,
    status: "registry_only",
  })),
  note: "No formulas yet.",
});

writeJson("observatory/registries/observatory_timeline.json", {
  version: "1.0.0",
  events: [{ date: TODAY, type: "observatory_founded", summary: "Digital Observatory framework created" }],
});

write(
  "observatory/DIGITAL_OBSERVATORY_MANUAL.md",
  `# Digital Observatory Manual

Quality labels: Verified · Estimated · Incomplete · Conflicting · Historical · Derived.  
No projections in Phase 2 — structure only.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 12 — Research Operations Command Center
// ═══════════════════════════════════════════════════════════════

write(
  "research_operations/README.md",
  `# Research Operations Command Center (ROCC)

**Slice:** CC-PHASE-2.12  

Coordinates research. Does not conduct conclusions.  
After this + Script 13: hard rule — complete substantial research missions before more infrastructure.
`,
);

writeJson("research_operations/missions/research_mission_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  mission_types: [
    "Proof Packet",
    "Living Community Laboratory",
    "Comparative Research",
    "Evidence Synthesis",
    "Corpus Expansion",
    "Methodology Review",
    "Research Watch",
    "Community Baseline",
    "Observatory Build",
    "Literature Review",
  ],
  lifecycle: [
    "Requested",
    "Approved",
    "Assigned",
    "Researching",
    "Evidence Review",
    "Methodology Review",
    "Domain Review",
    "Ready",
    "Complete",
    "Archived",
  ],
  missions: [
    {
      mission_id: "MIS-PP-FF-01",
      type: "Proof Packet",
      title: "PP-FF-01 Local Food and Family Farm Prosperity",
      status: "Evidence Review",
      priority: "High",
      owner: "Founding Steward",
      depends_on: [],
      blocks: ["PP-FF-01 Complete"],
      notes: "Draft Qualifies delivered; contrary corpus still open",
    },
    {
      mission_id: "MIS-METH-CAL-1",
      type: "Methodology Review",
      title: "Methodology Calibration 1.0",
      status: "Complete",
      priority: "Critical",
      owner: "Founding Steward",
      depends_on: ["MIS-PP-FF-01"],
      blocks: [],
      notes: "CC-PHASE-2.3",
    },
    {
      mission_id: "MIS-CORPUS-1",
      type: "Corpus Expansion",
      title: "Canonical Research Corpus foundation",
      status: "Ready",
      priority: "High",
      owner: null,
      depends_on: [],
      blocks: ["PP-02 execution quality"],
      notes: "Seeded; needs contrary sources",
    },
  ],
});

writeJson("research_operations/milestones/milestone_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  milestones: [
    { id: "MS-PP-FF-01", title: "PP-FF-01", completion_percent: 85, evidence_percent: 30, confidence: "Low", status: "Draft Qualifies" },
    { id: "MS-METH-CAL", title: "Methodology Calibration", completion_percent: 100, evidence_percent: 100, confidence: "n/a", status: "Complete" },
    { id: "MS-CORPUS", title: "Corpus Ready", completion_percent: 40, evidence_percent: 10, confidence: "Low", status: "Foundation" },
    { id: "MS-GRAPH", title: "Graph Ready", completion_percent: 25, evidence_percent: 5, confidence: "Low", status: "Foundation" },
    { id: "MS-COMM", title: "Community Ready", completion_percent: 20, evidence_percent: 0, confidence: "Very Low", status: "OS only" },
    { id: "MS-OBS", title: "Observatory Ready", completion_percent: 20, evidence_percent: 0, confidence: "Very Low", status: "OS only" },
    { id: "MS-PUB", title: "Publication Ready", completion_percent: 0, evidence_percent: 0, confidence: "Very Low", status: "Not started" },
  ],
});

writeJson("research_operations/priorities/priority_matrix.json", {
  version: "1.0.0",
  levels: ["Critical", "High", "Normal", "Low", "Future"],
  determinants: [
    "Evidence impact",
    "Research dependency",
    "Community dependency",
    "Proof Packet dependency",
    "Publication dependency",
  ],
});

write(
  "research_operations/governance/execution_rule.md",
  `# Post-Foundation Execution Rule

> **For every new infrastructure script, complete at least three major research missions.**

Progress is measured not by systems built, but by hypotheses honestly tested (CC-DEC-102).

After Script 13 foundations, **HOLD** further platform infrastructure until substantial completed research exists (target band: 10–20 Proof Packets, multiple syntheses, initial observatory baselines, first LCL research when appropriate).
`,
);

write(
  "research_operations/RESEARCH_OPERATIONS_MANUAL.md",
  `# Research Operations Manual

ROCC coordinates missions, assignments, reviews, milestones, and weekly reports.  
Review path: Methodology → Domain → Research Integrity → Acceptance. Nothing bypasses review.
`,
);

write(
  "research_operations/reports/weekly_research_report_standard.md",
  `# Weekly Research Report Standard

Include: Research Completed · Started · Delayed · Evidence Added · Gaps Closed · Major Findings · Open Risks · Recommendations.
`,
);

// ═══════════════════════════════════════════════════════════════
// SCRIPT 13 — Institutional History
// ═══════════════════════════════════════════════════════════════

write(
  "institutional_history/README.md",
  `# Institutional History & Intellectual Memory

**Slice:** CC-PHASE-2.13  

Future researchers should understand not only what Constitutional Capitalism believes, but how it arrived there.  
History is immutable. Corrections create new entries.
`,
);

writeJson("institutional_history/contracts/intellectual_history.contract.json", {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "IntellectualHistoryEvent",
  type: "object",
  required: [
    "history_id",
    "date",
    "subject",
    "event_type",
    "summary",
    "trigger",
    "participants",
    "supporting_documents",
    "affected_claims",
    "affected_packets",
    "affected_doctrine",
    "confidence_before",
    "confidence_after",
    "review_status",
  ],
  additionalProperties: true,
});

writeJson("institutional_history/research_history/research_events.json", {
  version: "1.0.0",
  last_updated: TODAY,
  events: [
    {
      history_id: "IH-001",
      date: TODAY,
      subject: "Proof Packet OS 1.0",
      event_type: "Methodology Change",
      summary: "Operating system for proof packets established",
      trigger: "CC-PHASE-2.1",
      participants: ["Founding Steward"],
      supporting_documents: ["research/proof_packets/"],
      affected_claims: [],
      affected_packets: ["PP-FF-01"],
      affected_doctrine: false,
      confidence_before: null,
      confidence_after: null,
      review_status: "accepted",
    },
    {
      history_id: "IH-002",
      date: TODAY,
      subject: "PP-FF-01",
      event_type: "Proof Packet Complete",
      summary: "First executive packet Draft Qualifies / Low (not Complete lifecycle)",
      trigger: "CC-PHASE-2.2",
      participants: ["Founding Steward"],
      supporting_documents: ["research/proof_packets/PP-FF-01/"],
      affected_claims: ["CC-CLAIM-124", "CC-CLAIM-125", "CC-CLAIM-126"],
      affected_packets: ["PP-FF-01"],
      affected_doctrine: false,
      confidence_before: null,
      confidence_after: "Low",
      review_status: "accepted",
    },
    {
      history_id: "IH-003",
      date: TODAY,
      subject: "Methodology Calibration 1.0",
      event_type: "Methodology Change",
      summary: "PP-FF-01 used to calibrate methodology; 1.1 proposed; CONDITIONAL GO for PP-02",
      trigger: "CC-PHASE-2.3",
      participants: ["Founding Steward"],
      supporting_documents: ["research/methodology/"],
      affected_claims: [],
      affected_packets: ["PP-FF-01"],
      affected_doctrine: false,
      confidence_before: null,
      confidence_after: null,
      review_status: "accepted",
    },
    {
      history_id: "IH-004",
      date: TODAY,
      subject: "Research Institution Foundations 2.4–2.13",
      event_type: "Architecture Decision",
      summary:
        "Corpus, LCL OS, pipeline, watch, graph, synthesis, modeling, observatory, ROCC, institutional history foundations — research infrastructure only",
      trigger: "CC-PHASE-2.4 through 2.13",
      participants: ["Founding Steward"],
      supporting_documents: [
        "research/corpus/",
        "research/living_community_laboratories/",
        "research_pipeline/",
        "research_watch/",
        "knowledge_graph/",
        "evidence_synthesis/",
        "modeling/",
        "observatory/",
        "research_operations/",
        "institutional_history/",
      ],
      affected_claims: [],
      affected_packets: [],
      affected_doctrine: false,
      confidence_before: null,
      confidence_after: null,
      review_status: "accepted",
    },
  ],
});

writeJson("institutional_history/debate_history/research_debate_registry.json", {
  version: "1.0.0",
  last_updated: TODAY,
  debates: [
    {
      id: "DEB-001",
      question: "Does institutional local purchasing prove Family Farm Prosperity systems?",
      position_a: "Material Farm to School spend shows feasibility",
      position_b: "Spend totals do not prove CC floors/utilities/stewardship pay",
      supporting_evidence: ["CC-SRC-074"],
      contrary_evidence: ["definition/milk/cost barriers", "unregistered failure literature gap"],
      current_confidence: "Low for system claim",
      open_questions: ["comparative outcomes", "Arkansas evidence"],
      recommended_research: "Register contrary literature; evidence synthesis",
    },
  ],
});

writeJson("institutional_history/confidence_history/confidence_history.json", {
  version: "1.0.0",
  last_updated: TODAY,
  entries: [
    {
      topic: "HYP-116 / PP-FF-01 overall",
      previous_confidence: null,
      new_confidence: "Low",
      reason: "First executive packet Qualifies on descriptive baselines only",
      supporting_research: ["PP-FF-01"],
      reviewer: "Founding Steward",
      date: TODAY,
    },
  ],
});

writeJson("institutional_history/methodology_history/methodology_history.json", {
  version: "1.0.0",
  note: "Mirror of research/methodology/methodology_version_history.json",
  canonical: "research/methodology/methodology_version_history.json",
});

write(
  "institutional_history/timelines/constitutional_research_timeline.md",
  `# Constitutional Research Timeline

| Date | Event |
| --- | --- |
| ${TODAY} | Proof Packet OS 1.0 |
| ${TODAY} | PP-FF-01 Draft Qualifies |
| ${TODAY} | Methodology Calibration 1.0 (CONDITIONAL GO PP-02) |
| ${TODAY} | Canonical Corpus foundation |
| ${TODAY} | LCL Operating System |
| ${TODAY} | Research Intelligence Pipeline framework |
| ${TODAY} | Continuous Research Watch framework |
| ${TODAY} | Knowledge Graph Foundation seed |
| ${TODAY} | Evidence Synthesis Engine framework |
| ${TODAY} | Scenario & Modeling Laboratory framework |
| ${TODAY} | Digital Observatory framework |
| ${TODAY} | Research Operations Command Center |
| ${TODAY} | Institutional History System |
`,
);

write(
  "institutional_history/timelines/research_debate_dashboard.md",
  `# Research Debate Dashboard

| Topic | Confidence | Status |
| --- | --- | --- |
| Local purchasing → prosperity systems | Low for system claim | Open (DEB-001) |
`,
);

write(
  "institutional_history/exports/annual_research_evolution.md",
  `# Annual Research Evolution (seed)

What changed: Research institution foundations built; first proof packet Qualifies.  
Why: CC-DEC-102 research-program mode.  
What remained stable: Principles (47), architecture freeze, modeling/legal 0%.  
What became stronger: Methodology honesty (Qualifies).  
What became weaker: N/A — confidence never claimed High for HYP-116.  
Hypotheses matured: HYP-116 entered evidence-qualified state.  
Hypotheses rejected: None.
`,
);

write(
  "institutional_history/INSTITUTIONAL_HISTORY_MANUAL.md",
  `# Institutional History Manual

Event types include architecture decisions, methodology changes, packet completion, evidence add/remove, confidence updates, gaps, contradictions, reviews, community studies, publications, revisions.  
History immutable. Corrections = new entries.
`,
);

writeJson("data/project/research_institution_foundations.json", {
  version: "1.0.0",
  last_updated: TODAY,
  status: "foundations_complete_execution_next",
  decision_anchor: "CC-DEC-102",
  slices: [
    "CC-PHASE-2.3-RESEARCH-METHODOLOGY-CALIBRATION-1.0",
    "CC-PHASE-2.4-CANONICAL-RESEARCH-CORPUS-1.0",
    "CC-PHASE-2.5-LIVING-COMMUNITY-LABORATORY-OPERATING-SYSTEM-1.0",
    "CC-PHASE-2.6-RESEARCH-INTELLIGENCE-PIPELINE-1.0",
    "CC-PHASE-2.7-CONTINUOUS-RESEARCH-WATCH-1.0",
    "CC-PHASE-2.8-CONSTITUTIONAL-KNOWLEDGE-GRAPH-FOUNDATION-1.0",
    "CC-PHASE-2.9-EVIDENCE-SYNTHESIS-ENGINE-1.0",
    "CC-PHASE-2.10-SCENARIO-AND-MODELING-LABORATORY-1.0",
    "CC-PHASE-2.11-CONSTITUTIONAL-CAPITALISM-DIGITAL-OBSERVATORY-1.0",
    "CC-PHASE-2.12-RESEARCH-OPERATIONS-COMMAND-CENTER-1.0",
    "CC-PHASE-2.13-CONSTITUTIONAL-INTELLECTUAL-HISTORY-AND-DECISION-LEDGER-1.0",
  ],
  pp_02_readiness: "CONDITIONAL_GO",
  infrastructure_freeze_rule:
    "No additional platform infrastructure until substantial completed research missions (target: 10–20 proof packets, syntheses, baselines, first LCL research when appropriate). For every new infrastructure script thereafter, complete at least three major research missions.",
  doctrine_changed: false,
  principles_changed: false,
  architecture_changed: false,
  roots: {
    methodology: "research/methodology/",
    corpus: "research/corpus/",
    lcl_os: "research/living_community_laboratories/",
    pipeline: "research_pipeline/",
    watch: "research_watch/",
    knowledge_graph: "knowledge_graph/",
    synthesis: "evidence_synthesis/",
    modeling: "modeling/",
    observatory: "observatory/",
    operations: "research_operations/",
    history: "institutional_history/",
  },
});

write(
  "reports/CC_PHASE_2_3_TO_2_13_RESEARCH_INSTITUTION_FOUNDATIONS_RETURN.md",
  `# Return — Research Institution Foundations (2.3–2.13)

**Date:** ${TODAY}  
**Updates:** UPD-069 through UPD-079  
**Decision anchor:** CC-DEC-102 (no new doctrine)

## Summary

Built the complete Constitutional Capitalism research-institution foundation after PP-FF-01:

1. Methodology calibration → **CONDITIONAL GO** for PP-02  
2. Canonical Research Corpus  
3. LCL Operating System  
4. Research Intelligence Pipeline  
5. Continuous Research Watch  
6. Knowledge Graph Foundation  
7. Evidence Synthesis Engine  
8. Scenario & Modeling Laboratory  
9. Digital Observatory  
10. Research Operations Command Center  
11. Institutional History System  

## Hard rule hereafter

No more platform infrastructure until substantial research execution. Progress = hypotheses honestly tested.

## Integrity

No doctrine/principles/architecture changes. Modeling/legal remain 0%. Phase 2 remains PARTIAL. No invented measurements or citations.
`,
);

console.log("Bootstrap complete.");