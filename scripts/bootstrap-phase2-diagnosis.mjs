/**
 * Phase 2 architecture bootstrap — spines, metadata, diagnosis shells.
 * Does not invent statistics or source findings.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const write = (rel, data) => {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, typeof data === "string" ? data : JSON.stringify(data, null, 2) + "\n");
};
const ensureDir = (rel) => fs.mkdirSync(path.join(root, rel), { recursive: true });

const TODAY = "2026-08-04";
const MISSION = "CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0";

// --- 1. Phase / slice closeout ---
const phases = read("data/project/phases.json");
phases.current_phase = "phase-2";
phases.last_updated = TODAY;
const p1 = phases.phases.find((p) => p.id === "phase-1");
if (p1) {
  p1.status = "complete";
  p1.accepted_build_commit = "0f24a8b";
  p1.accepted_closeout_commit = "4fbaacd";
  p1.foundational_philosophy_percent = 70;
}
const p2 = phases.phases.find((p) => p.id === "phase-2");
if (p2) {
  p2.title = "Diagnosis and Research Foundation";
  p2.status = "in_progress";
  p2.slice_id = MISSION;
  p2.note =
    "Phase 1 closed. Phase 2 builds National Diagnosis, National Baseline, and Evidence Companion. Evidence/Baseline slice ID absorbed as alias.";
  p2.deliverables = [
    "national diagnosis architecture and priority briefs",
    "national baseline metrics (sourced subset)",
    "evidence companion dossiers for priority claims",
    "claim ledger upgrades with supporting and opposing evidence",
    "source registry with primary/authoritative sources",
    "testing and pilot standards",
    "transition timeline framework",
    "developing doctrine ledger (non-Declaration)",
  ];
}
write("data/project/phases.json", phases);

const slices = read("data/project/slice_queue.json");
slices.last_updated = TODAY;
slices.active_slice = MISSION;
const evidenceSlice = slices.slices.find(
  (s) => s.slice_id === "CC-PHASE-2-EVIDENCE-AND-NATIONAL-BASELINE-1.0"
);
if (evidenceSlice) {
  evidenceSlice.status = "absorbed";
  evidenceSlice.note =
    "Absorbed into CC-PHASE-2-DIAGNOSIS-RESEARCH-FOUNDATION-1.0; deliverables retained inside Diagnosis mission.";
}
const existingDiag = slices.slices.find((s) => s.slice_id === MISSION);
if (!existingDiag) {
  slices.slices.push({
    slice_id: MISSION,
    title: "Diagnosis Research Foundation",
    purpose:
      "Establish source-backed National Diagnosis, National Baseline, and Evidence Companion; upgrade priority claims with supporting and opposing evidence.",
    prerequisites: ["CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0"],
    allowed_paths: [
      "content/**",
      "data/**",
      "docs/**",
      "schemas/**",
      "scripts/**",
      "apps/**",
      "reports/**",
    ],
    forbidden_paths: [],
    required_outputs: [
      "content/research/national-diagnosis/*",
      "data/baseline/*",
      "evidence companion overview + priority dossiers",
      "sourced priority claims",
      "public /where-we-are and /evidence surfaces",
      "return report",
    ],
    validation_commands: ["pnpm gate", "pnpm research:validate", "pnpm baseline:validate"],
    completion_evidence: [],
    status: "in_progress",
    absorbs_slice_ids: ["CC-PHASE-2-EVIDENCE-AND-NATIONAL-BASELINE-1.0"],
    next_recommended_slice: "CC-PHASE-2.1-DIAGNOSIS-CONTINUATION-1.0",
  });
} else {
  existingDiag.status = "in_progress";
}
const phase1 = slices.slices.find((s) => s.slice_id === "CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0");
if (phase1) phase1.next_recommended_slice = MISSION;

if (!slices.slices.find((s) => s.slice_id === "CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0")) {
  slices.slices.push({
    slice_id: "CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0",
    title: "Civic Deliberation Feedback System",
    purpose:
      "Parallel infrastructure: publicly anonymous, privately verified civic input. Does not block Phase 2.",
    prerequisites: ["CC-PHASE-1-FOUNDATIONAL-DECLARATION-1.0"],
    allowed_paths: ["apps/**", "docs/**", "data/**", "netlify*", "schemas/**", "scripts/**"],
    forbidden_paths: [],
    required_outputs: [
      "secure backend",
      "protected admin boundary",
      "email verification",
      "moderation standards",
    ],
    validation_commands: ["pnpm gate"],
    completion_evidence: [],
    status: "queued_parallel",
    dependency_note:
      "Requires secure backend and protected administration (apps/admin-board preferred). Open CC-DEC-011.",
    next_recommended_slice: null,
  });
}
write("data/project/slice_queue.json", slices);

write("data/project/current_build_state.json", {
  version: "0.3.0",
  last_updated: TODAY,
  mission_id: MISSION,
  phase: "phase-2",
  status: "phase_2_in_progress",
  writing_focus: "National diagnosis, baseline metrics, evidence companion — evidence before policy",
  next_action: "Populate priority sources and diagnosis briefs; continue Phase 2.1 for remaining domains",
  phase_1_accepted: {
    build_commit: "0f24a8b",
    closeout_commit: "4fbaacd",
    foundational_philosophy_percent: 70,
  },
  parallel_slices: ["CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0"],
  blockers: [],
});

const updates = read("data/project/updates.json");
if (!updates.updates.find((u) => u.id === "UPD-006")) {
  updates.updates.push({
    id: "UPD-006",
    date: TODAY,
    title: "Phase 1 accepted; Phase 2 diagnosis begun",
    summary:
      "Phase 1 closed (Declaration and foundational philosophy). Phase 2 opens the National Diagnosis, National Baseline, and Evidence Companion — evidence-building, not mass policy writing. Civic deliberation remains a parallel approved track.",
    public: true,
  });
}
updates.last_updated = TODAY;
write("data/project/updates.json", updates);

write(
  "reports/CC_PHASE_1_ACCEPTANCE_NOTE.md",
  `# Phase 1 Acceptance Note

Status: **ACCEPTED / CLOSED**  
Date: ${TODAY}

| Item | Value |
|---|---|
| Canonical build commit | \`0f24a8b\` |
| Canonical closeout commit | \`4fbaacd\` |
| Foundational Philosophy | 70% |
| Overall project (at close) | 34% |

Phase 1 delivered the Declaration (~5,005 words), principles, objections, terms, system comparison, boundary document, manuscript outlines, and public presentation.

Post–Phase-1 developing ideas (flourishing, local power, civic deliberation, etc.) are recorded as **developing doctrine**, not as a reopened Phase 1 rewrite.

Next: \`${MISSION}\`.
`
);

// --- 2. Developing doctrine ---
write("data/project/developing_doctrine.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "developing",
  note: "Not final doctrine. Not silently promoted into the Declaration. Research required before ratification.",
  items: [
    {
      doctrine_id: "CC-DEV-001",
      statement: "Power should flow toward people and communities, never permanently away from them.",
      origin: "post_phase_1_civilizational_core",
      maturity: "proposed",
      implications: ["policy screen", "subsidiarity", "ownership design"],
      conflicts: [],
      research_required: ["empirical effects of decentralization vs competence thresholds"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-002",
      statement:
        "Human beings possess inherent dignity and are not merely economic inputs; the people are the principal source of productive capacity, creativity, innovation, and self-government.",
      origin: "post_phase_1_civilizational_core",
      maturity: "proposed",
      implications: ["education", "health", "labor framing"],
      conflicts: ["mere resource language"],
      research_required: ["human-capital investment evidence"],
      declaration_revision_candidate: true,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-003",
      statement: "Ownership should become more secure against erosion that converts lasting ownership into conditional tenure.",
      origin: "steve_direction_permanent_ownership",
      maturity: "design_agenda",
      implications: ["property tax redesign", "local revenue"],
      conflicts: ["local school/road funding models"],
      research_required: ["property tax incidence", "alternative local revenue"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-004",
      statement: "Ordinary labor should bear the lightest feasible tax burden consistent with constitutional finance.",
      origin: "steve_direction_labor_tax",
      maturity: "design_agenda",
      implications: ["tax pillar", "payroll incidence research"],
      conflicts: [],
      research_required: ["tax incidence literature", "revenue replacement"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-005",
      statement: "Education should be treated as productive social investment with shared beneficiaries.",
      origin: "steve_direction_human_capital",
      maturity: "proposed",
      implications: ["education finance"],
      conflicts: [],
      research_required: ["who benefits from human capital creation"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-006",
      statement:
        "Essential transportation and broadband may function as public infrastructure enabling economic participation.",
      origin: "steve_direction_arteries",
      maturity: "proposed",
      implications: ["infrastructure principle before ownership model"],
      conflicts: [],
      research_required: ["access gaps", "delivery model comparisons"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-007",
      statement: "Local communities should possess meaningful food and economic resilience capacity.",
      origin: "community_economic_sovereignty",
      maturity: "proposed",
      implications: ["baseline metrics", "Article VIII"],
      conflicts: [],
      research_required: ["food access", "local processing", "rural decline"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-008",
      statement:
        "Constructive improvement of the common system is among the highest forms of public service.",
      origin: "duty_of_constructive_improvement",
      maturity: "proposed",
      implications: ["civic deliberation", "Living Amendments"],
      conflicts: [],
      research_required: [],
      declaration_revision_candidate: true,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-009",
      statement: "Local power should be preferred where local institutions are competent (subsidiarity).",
      origin: "subsidiarity_extension",
      maturity: "proposed",
      implications: ["power hierarchy"],
      conflicts: ["national functions requiring scale"],
      research_required: ["competence thresholds by domain"],
      declaration_revision_candidate: false,
      status: "open",
    },
    {
      doctrine_id: "CC-DEV-010",
      statement: "Prosperity should be geographically distributed so staying in a community remains a genuine option.",
      origin: "distributed_prosperity",
      maturity: "proposed",
      implications: ["rural/regional metrics"],
      conflicts: [],
      research_required: ["migration", "local opportunity", "wealth leakage"],
      declaration_revision_candidate: false,
      status: "open",
    },
  ],
});

// --- 3. Transition timeline ---
write("data/project/transition_timeline.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "framework_only",
  note: "Framework eras — not guaranteed forecasts. Predictions require modeling.",
  eras: [
    {
      era_id: "CC-ERA-01",
      name: "Foundation and public development",
      years: "0–3",
      objectives: ["public philosophy", "evidence base", "baseline", "pilot design capacity"],
      prerequisites: ["Phase 1 declaration", "Phase 2 diagnosis underway"],
      actors: ["project", "researchers", "civic contributors"],
      legal_level: "none_to_local_optional",
      risks: ["overclaiming", "premature legislation"],
      evidence_requirements: ["sourced diagnosis", "baseline metrics"],
      success_criteria: ["transparent evidence surfaces", "priority claims classified"],
      stop_or_revision_triggers: ["systematic evidence contradiction of core empirical claims"],
    },
    {
      era_id: "CC-ERA-02",
      name: "Local and state testing",
      years: "2–7",
      objectives: ["state pilots", "local ownership experiments", "metric feedback"],
      prerequisites: ["test framework", "baseline", "legal review of pilots"],
      actors: ["states", "localities", "firms", "nonprofits"],
      legal_level: "state_local",
      risks: ["uneven adoption", "capture"],
      evidence_requirements: ["pilot protocols", "pre-registered metrics"],
      success_criteria: ["published pilot results including failures"],
      stop_or_revision_triggers: ["harm exceeding stop conditions"],
    },
    {
      era_id: "CC-ERA-03",
      name: "Federal foundation",
      years: "5–10",
      objectives: ["federal enabling frameworks", "competition/ownership pathways"],
      prerequisites: ["pilot learning", "constitutional analysis"],
      actors: ["Congress", "agencies", "courts via review"],
      legal_level: "federal",
      risks: ["overcentralization", "transition shock"],
      evidence_requirements: ["modeling", "legal review"],
      success_criteria: ["accountable federal scaffolding with measurement"],
      stop_or_revision_triggers: ["constitutional defect", "severe capital flight without mitigation"],
    },
    {
      era_id: "CC-ERA-04",
      name: "Structural conversion",
      years: "8–20",
      objectives: ["ownership broadening at scale", "institutional settlement"],
      prerequisites: ["federal foundation", "stable metrics"],
      actors: ["markets", "workers", "communities", "government"],
      legal_level: "multi",
      risks: ["doing too much too fast"],
      evidence_requirements: ["longitudinal baseline"],
      success_criteria: ["predefined ownership and opportunity metrics move as hypothesized"],
      stop_or_revision_triggers: ["sustained metric failure", "democratic rejection"],
    },
    {
      era_id: "CC-ERA-05",
      name: "Constitutional settlement",
      years: "15–30",
      objectives: ["durable amendment culture", "living economic constitution"],
      prerequisites: ["structural learning", "broad legitimacy"],
      actors: ["people", "states", "federal institutions"],
      legal_level: "constitutional",
      risks: ["ossification", "capture of amendment process"],
      evidence_requirements: ["multi-decade series"],
      success_criteria: ["constructive improvement institutionalized"],
      stop_or_revision_triggers: ["erosion of constitutional limits"],
    },
  ],
});

write(
  "docs/architecture/TRANSITION_AND_IMPLEMENTATION_TIMELINE_FRAMEWORK.md",
  `# Transition and Implementation Timeline Framework

Status: framework only  
Data: \`data/project/transition_timeline.json\`  
Last updated: ${TODAY}

This is **not** a forecast of guaranteed outcomes. It structures eras so proposals can be sequenced, tested, and revised.

Eras: Years 0–3 foundation → 2–7 local/state testing → 5–10 federal foundation → 8–20 structural conversion → 15–30 constitutional settlement.

See also: \`docs/architecture/TRANSITION_AND_TESTING_ARCHITECTURE.md\`.
`
);

// --- 4. Testing foundation ---
ensureDir("data/testing");
write("data/testing/test_framework.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "framework_only",
  required_fields: [
    "hypothesis",
    "population",
    "geography",
    "baseline",
    "intervention",
    "comparison_method",
    "duration",
    "metrics",
    "risks",
    "stop_conditions",
    "independent_review",
    "public_reporting",
    "revision_pathway",
  ],
  note: "No pilots claimed. Framework for future proposals.",
});
write("data/testing/pilot_registry.json", {
  version: "0.1.0",
  last_updated: TODAY,
  pilots: [],
  note: "Empty — no pilots have occurred.",
});
write("data/testing/success_metrics.json", {
  version: "0.1.0",
  last_updated: TODAY,
  metrics: [],
  note: "Populate when pilots are designed; link to national baseline indicators.",
});
write("data/testing/failure_triggers.json", {
  version: "0.1.0",
  last_updated: TODAY,
  triggers: [
    {
      trigger_id: "CC-FAIL-001",
      text: "Predefined harm thresholds exceeded for participants",
      status: "template",
    },
    {
      trigger_id: "CC-FAIL-002",
      text: "Evidence shows sustained opposite effect on primary outcome",
      status: "template",
    },
  ],
});
write(
  "docs/research/TESTING_AND_PILOT_STANDARD.md",
  `# Testing and Pilot Standard

Status: Phase 2 framework  
Last updated: ${TODAY}

Every future pilot must define: hypothesis, population, geography, baseline, intervention, comparison method, duration, metrics, risks, stop conditions, independent review, public reporting, and revision pathway.

Do not claim any pilot has occurred unless documented in \`data/testing/pilot_registry.json\`.
`
);

// --- 5. Baseline tree ---
ensureDir("data/baseline");
const legacyBaseline = read("data/project/national_baseline.json");
const metrics = [];
for (const domain of legacyBaseline.domains || []) {
  for (const ind of domain.indicators || []) {
    metrics.push({
      metric_id: ind.indicator_id,
      title: ind.name,
      domain_id: domain.domain_id,
      domain_name: domain.name,
      definition: `${ind.name} — definition to be finalized with source methodology.`,
      unit: "pending",
      current_value: null,
      reference_year: null,
      source_ids: ind.source_ids || [],
      geographic_level: "national_US",
      population_scope: "pending",
      historical_series_available: null,
      limitations: "Structure only until sourced in Phase 2.",
      update_frequency: "pending",
      related_principles: [],
      related_chapters: [],
      target_setting_status: "no_targets_in_phase_2",
      confidence_level: "unsourced",
      status: ind.status || "baseline_pending",
    });
  }
}
write("data/baseline/national_baseline_metrics.json", {
  version: "0.1.0",
  last_updated: TODAY,
  status: "structure_with_pending_values",
  guiding_question: legacyBaseline.guiding_question,
  note: "No invented values. Populate current_value only with verified sources.",
  linked_legacy_file: "data/project/national_baseline.json",
  metrics,
});
write("data/baseline/baseline_source_map.json", {
  version: "0.1.0",
  last_updated: TODAY,
  mappings: [],
  note: "Maps metric_id → source_id once sourced.",
});
write("data/baseline/baseline_methodology.json", {
  version: "0.1.0",
  last_updated: TODAY,
  principles: [
    "Prefer federal statistical agencies and primary official series",
    "Record definition, unit, year, and limitations with every value",
    "Do not invent targets in Phase 2",
    "Distinguish levels, rates, and indices",
  ],
  preferred_agencies: [
    "Census Bureau",
    "BLS",
    "BEA",
    "Federal Reserve",
    "CBO",
    "IRS SOI",
    "GAO",
    "FTC",
    "FCC",
    "USDA",
    "ED",
    "HHS",
    "DOT",
  ],
});
write("data/baseline/baseline_status.json", {
  version: "0.1.0",
  last_updated: TODAY,
  total_metrics: metrics.length,
  sourced_metrics: 0,
  pending_metrics: metrics.length,
  status: "architecture_ready",
});

// --- 6. Evidence companion docs ---
write(
  "content/evidence-companion/EVIDENCE_COMPANION_OVERVIEW.md",
  `# Evidence Companion Overview

Book Two of the Constitutional Capitalism Project.

Machine spine: \`data/research/claim_ledger.json\` + \`data/research/source_registry.json\`.

Purpose: every factual claim from the public philosophy should eventually have supporting research, opposing research, limitations, confidence, remaining questions, and data sources.

Phase 2 seeds priority claims. Full population continues in Phase 2.1+.

Template: \`EVIDENCE_ENTRY_TEMPLATE.md\`.
`
);
write(
  "content/evidence-companion/EVIDENCE_ENTRY_TEMPLATE.md",
  `# Evidence dossier: CC-CLAIM-XXX

**Claim:**  

**Support level:** unsupported | partially_supported | contested | supported | requires_additional_research  

**Last updated:**  

## Supporting research

## Opposing research

## Methodology notes

## Confidence

## Limitations

## Relevance (chapters / principles)

## Unresolved questions

## Data sources (\`source_ids\`)

## Publication status

not_ready
`
);

// --- 7. Diagnosis briefs ---
const briefs = [
  ["00-overview.md", "Overview", "What is the present condition of American economic and civic life?"],
  ["01-wealth-and-ownership.md", "Wealth and Ownership", "How is wealth and productive ownership distributed?"],
  ["02-work-wages-and-productivity.md", "Work, Wages, and Productivity", "Have wages and productivity diverged, and for whom?"],
  ["03-taxation.md", "Taxation", "How do labor, capital, property, and consumption taxes currently burden actors?"],
  ["04-corporate-power-and-financialization.md", "Corporate Power and Financialization", "How do corporate governance and finance shape outcomes?"],
  ["05-competition-and-concentration.md", "Competition and Concentration", "How concentrated are markets, and with what effects?"],
  ["06-local-and-rural-economies.md", "Local and Rural Economies", "What structural barriers face local and rural communities?"],
  ["07-internet-commerce.md", "Internet Commerce", "How does online commerce affect local wealth retention?"],
  ["08-housing-and-ownership-security.md", "Housing and Ownership Security", "How secure is housing ownership?"],
  ["09-education-and-human-development.md", "Education and Human Development", "Who bears education costs and who captures returns?"],
  ["10-healthcare-and-economic-security.md", "Healthcare and Economic Security", "How does healthcare insecurity affect work and productivity?"],
  ["11-transportation-and-broadband.md", "Transportation and Broadband", "How do access gaps shape opportunity?"],
  ["12-food-and-community-resilience.md", "Food and Community Resilience", "How resilient are community food systems?"],
  ["13-banking-and-capital.md", "Banking and Capital", "Who can access productive capital?"],
  ["14-trade-and-corporate-relocation.md", "Trade and Corporate Relocation", "What are community costs of relocation and offshoring?"],
  ["15-technology-automation-and-ai.md", "Technology, Automation, and AI", "How may AI/automation shift returns between labor and capital?"],
  ["16-political-and-economic-power.md", "Political and Economic Power", "How does economic concentration interact with political influence?"],
  ["17-constitutional-and-legal-foundations.md", "Constitutional and Legal Foundations", "What legal structures constrain private and public economic power?"],
  ["18-international-comparisons.md", "International Comparisons", "What partial precedents exist abroad (without labeling any nation CC)?"],
  ["19-human-flourishing.md", "Human Flourishing", "What measures of household and community stability matter?"],
  ["20-conclusions-and-open-questions.md", "Conclusions and Open Questions", "What is established, contested, and still unknown?"],
];

const priorityFiles = new Set([
  "00-overview.md",
  "01-wealth-and-ownership.md",
  "02-work-wages-and-productivity.md",
  "03-taxation.md",
  "04-corporate-power-and-financialization.md",
  "05-competition-and-concentration.md",
  "06-local-and-rural-economies.md",
  "07-internet-commerce.md",
  "16-political-and-economic-power.md",
  "20-conclusions-and-open-questions.md",
]);

ensureDir("content/research/national-diagnosis");
for (const [file, title, question] of briefs) {
  const tier = priorityFiles.has(file) ? "priority_first_pass" : "foundational_queue";
  write(
    `content/research/national-diagnosis/${file}`,
    `# ${title}

**Domain status:** ${tier}  
**Last updated:** ${TODAY}  
**Phase:** 2 — Diagnosis Research Foundation

## Central question

${question}

## Why it matters

_To be completed with sourced analysis._

## Current findings

_No findings asserted until sources are registered. See \`data/research/source_registry.json\`._

## Strongest supporting evidence

- Pending source registration.

## Contrary evidence

- Pending — contrary evidence must be preserved when found.

## Uncertainties

- Definitions, time periods, and causal identification may vary across series.

## Data gaps

- Listed in research questions and baseline pending metrics.

## Constitutional implications

- Normative implications are distinct from empirical findings.

## Policy implications (not yet resolved)

- Phase 2 does not write national legislation.

## Metrics

- Link to \`data/baseline/national_baseline_metrics.json\` when sourced.

## Source IDs

- None yet for this brief.

## Claim IDs

- See claim ledger for related claims.

## Next research actions

1. Register primary/authoritative sources.
2. Attach values to baseline metrics.
3. Upgrade claim support levels honestly.
`
  );
}

write(
  "docs/architecture/CIVIC_DELIBERATION_PARALLEL_TRACK.md",
  `# Civic Deliberation — Parallel Track

Mission: \`CC-CIVIC-DELIBERATION-FEEDBACK-SYSTEM-1.0\`  
Status: **APPROVED PARALLEL** — does not block Phase 2  
Dependency: secure backend + protected admin (\`apps/admin-board\` preferred)  
Open decision: \`CC-DEC-011\`

No private contributor data on the unprotected Build Board.
`
);

console.log("[OK] Phase 2 bootstrap complete");
console.log("  mission", MISSION);
console.log("  baseline metrics", metrics.length);
console.log("  diagnosis briefs", briefs.length);
