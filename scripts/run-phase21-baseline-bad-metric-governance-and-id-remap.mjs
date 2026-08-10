/**
 * CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0
 *
 * Rule: A bad metric is worse than a missing metric because it creates false confidence.
 * Mission: clean baseline architecture without expanding doctrine or stuffing weak proxies.
 */
import fs from "node:fs";
import { r } from "./lib/paths.mjs";

const SLICE = "CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0";
const TODAY = "2026-08-10";
const BEFORE_DISPLAY = "27/86";
const NEXT =
  "CC-PHASE-2.1-BASELINE-LEGITIMATE-SLOT-EXPANSION-AFTER-ONTOLOGY-CLEANUP-1.0";

const read = (rel) => JSON.parse(fs.readFileSync(r(rel), "utf8"));
const write = (rel, obj) =>
  fs.writeFileSync(r(rel), `${JSON.stringify(obj, null, 2)}\n`, "utf8");

const metricsDoc = read("data/baseline/national_baseline_metrics.json");
const statusDoc = read("data/baseline/baseline_status.json");
const sourceMap = read("data/baseline/baseline_source_map.json");
const methodology = read("data/baseline/baseline_methodology.json");
const checklist = read("data/project/phase2_acceptance_checklist.json");
const build = read("data/project/current_build_state.json");
const updates = read("data/project/updates.json");
const sliceQueue = read("data/project/slice_queue.json");
const forensic = read("data/project/forensic_audit_governance.json");

const COUNTABLE_ONTOLOGY = new Set([
  "OBSERVED STATISTIC",
  "DERIVED STATISTIC",
  "INDEX",
  "SURVEY MEASURE",
  "ADMINISTRATIVE COUNT",
  "STRUCTURAL INDICATOR",
]);

/** @type {Array<{historical_ref: string, historical_title: string, context: string, disposition: string, canonical_id: string, notes: string}>} */
const idRemap = [
  {
    historical_ref: "CC-IND-D01",
    historical_title: "Voter participation",
    context: "legacy_early_democracy_block",
    disposition: "MERGE",
    canonical_id: "CC-IND-D03",
    notes:
      "Legacy vague 'Voter participation' merges into framework 'Voter participation rate' (CPS citizen VAP). No separate row retained. Historical mentions of D01+voter participation resolve here when title context is legacy.",
  },
  {
    historical_ref: "CC-IND-D02",
    historical_title: "Civic engagement",
    context: "legacy_early_democracy_block",
    disposition: "REMAP ID",
    canonical_id: "CC-IND-D09",
    notes:
      "New unique ID. Distinct from framework D02 (district community-integrity). Definition still required before sourcing.",
  },
  {
    historical_ref: "CC-IND-D03",
    historical_title: "Public trust",
    context: "legacy_early_democracy_block",
    disposition: "REMAP ID",
    canonical_id: "CC-IND-D10",
    notes:
      "New unique ID. Distinct from framework D03 (voter participation rate, sourced). Survey-measure candidate after definition lock.",
  },
  {
    historical_ref: "CC-IND-D04",
    historical_title: "Local participation",
    context: "legacy_early_democracy_block",
    disposition: "REMAP ID",
    canonical_id: "CC-IND-D11",
    notes:
      "New unique ID. Distinct from framework D04 (campaign funding concentration) and from CM05 volunteerism.",
  },
  {
    historical_ref: "CC-IND-D01",
    historical_title: "Share of meaningfully contested races",
    context: "democracy_framework_block",
    disposition: "KEEP AS WRITTEN",
    canonical_id: "CC-IND-D01",
    notes: "Canonical holder of CC-IND-D01 after remap.",
  },
  {
    historical_ref: "CC-IND-D02",
    historical_title: "District community-integrity / split indicators",
    context: "democracy_framework_block",
    disposition: "KEEP AS WRITTEN",
    canonical_id: "CC-IND-D02",
    notes: "Canonical holder of CC-IND-D02 after remap.",
  },
  {
    historical_ref: "CC-IND-D03",
    historical_title: "Voter participation rate",
    context: "democracy_framework_block",
    disposition: "KEEP AS WRITTEN",
    canonical_id: "CC-IND-D03",
    notes: "Canonical holder of CC-IND-D03; already sourced (CC-SRC-246).",
  },
  {
    historical_ref: "CC-IND-D04",
    historical_title: "Campaign funding concentration",
    context: "democracy_framework_block",
    disposition: "KEEP AS WRITTEN",
    canonical_id: "CC-IND-D04",
    notes: "Canonical holder of CC-IND-D04 after remap.",
  },
];

function q(measured, observable, conceptFit, reproducible) {
  return {
    what_exactly_measured: measured,
    reproducibly_observable: observable,
    measures_intended_concept: conceptFit,
    outside_researcher_same_answer: reproducible,
  };
}

/** Flag adjudications (12 problems → concrete metric/cluster rows). */
const adjudications = [
  {
    flag_id: "FLAG-DUP-D01-D04",
    metric_ids: ["CC-IND-D01", "CC-IND-D02", "CC-IND-D03", "CC-IND-D04"],
    disposition: "REMAP ID",
    ontology_class: "STRUCTURAL INDICATOR",
    scoreboard_inclusion: "mixed_see_remap",
    questions: q(
      "Two incompatible democracy blocks shared D01–D04 IDs (legacy titles vs framework titles).",
      "ID collision is an architecture defect, not a statistic.",
      "Duplicate IDs destroy concept fit by making retrieval ambiguous.",
      "No — researchers would not know which D03 was meant."
    ),
    rationale:
      "Preserve historical lineage via remap table. Framework keeps D01–D04. Legacy voter participation MERGES into D03; civic engagement / public trust / local participation REMAP to D09–D11.",
  },
  {
    flag_id: "FLAG-CM01",
    metric_ids: ["CC-IND-CM01"],
    disposition: "RECLASSIFY AS RESEARCH QUESTION",
    ontology_class: "RESEARCH QUESTION",
    scoreboard_inclusion: "research_question",
    questions: q(
      "Storefront / Main Street commercial occupancy — geography, sector, and vacancy definition undefined.",
      "No authoritative national Census/BLS scalar for 'Main Street occupancy'.",
      "Any convenient proxy (retail employment, commercial vacancy indexes) would misrepresent the construct.",
      "No — without a locked inventory method, answers diverge by source."
    ),
    rationale:
      "Keep the concept visible as a research question. Do not fill with a national proxy. Local pilots may later invent a defensible ADMINISTRATIVE COUNT / STRUCTURAL INDICATOR.",
  },
  {
    flag_id: "FLAG-B03",
    metric_ids: ["CC-IND-B03"],
    disposition: "DEFER — DEFINITION REQUIRED",
    ontology_class: "STRUCTURAL INDICATOR",
    scoreboard_inclusion: "baseline_slot",
    questions: q(
      "Share of firms/employment/equity under 'local' ownership — entity, control, and geography undefined.",
      "Potentially yes after lock (e.g., Census ABS / ownership tables), not yet.",
      "Current title is too vague; a weak proxy would create false confidence.",
      "Not until geography/entity/control criteria are locked."
    ),
    rationale:
      "Retain as countable empirical candidate. Explicit definition debt. No number in this slice.",
  },
  {
    flag_id: "FLAG-G04",
    metric_ids: ["CC-IND-G04"],
    disposition: "RECLASSIFY AS RESEARCH QUESTION",
    ontology_class: "RESEARCH QUESTION",
    scoreboard_inclusion: "research_question",
    questions: q(
      "'Regulatory burden' as a single national scalar — pages of CFR, compliance cost, restrictiveness indexes, etc.",
      "No single accepted official scalar; competing constructs.",
      "Normatively loaded; convenient indexes measure chosen methodology more than a settled concept.",
      "No — reasonable researchers pick different burden proxies."
    ),
    rationale:
      "Remove from baseline scoreboard masquerade. Remains a research/normative measurement debate, not a Phase-2 baseline statistic.",
  },
  {
    flag_id: "FLAG-I02",
    metric_ids: ["CC-IND-I02"],
    disposition: "DEFER — DEFINITION REQUIRED",
    ontology_class: "DERIVED STATISTIC",
    scoreboard_inclusion: "baseline_slot",
    questions: q(
      "AI investment — software, R&D, capex, startups, or public budget? Boundary unlocked.",
      "Possible after boundary lock (BEA/NSF/private capital series), not before.",
      "Private VC headlines are not a substitute for a locked national construct.",
      "Not until the investment boundary is governed."
    ),
    rationale:
      "Keep as countable candidate (likely DERIVED). Do not source from unlocked private tallies in this slice.",
  },
  {
    flag_id: "FLAG-E07",
    metric_ids: ["CC-IND-E07"],
    disposition: "RECLASSIFY AS DESIGN INDICATOR",
    ontology_class: "DESIGN TARGET",
    scoreboard_inclusion: "design_indicator",
    questions: q(
      "Community Health Index coverage — an index CC intends to design.",
      "Not an existing observed series.",
      "Title already admits design agenda; keeping it as baseline_pending falsifies empirics.",
      "No baseline retrieval exists."
    ),
    rationale:
      "Park as design target. Does not count toward baseline scoreboard until a governed observed/derived index exists.",
  },
  {
    flag_id: "FLAG-D07",
    metric_ids: ["CC-IND-D07"],
    disposition: "RECLASSIFY AS RESEARCH QUESTION",
    ontology_class: "RESEARCH QUESTION",
    scoreboard_inclusion: "research_question",
    questions: q(
      "Independent oversight durability under unified government — institutional quality construct.",
      "Not a single official series; requires coding rules and case judgment.",
      "Institutional quality judgment ≠ baseline statistic.",
      "No — coding schemes would diverge without a locked protocol."
    ),
    rationale:
      "Move off scoreboard. Remains an important democracy research question for later structured coding, not a fillable baseline cell.",
  },
  {
    flag_id: "FLAG-J08",
    metric_ids: ["CC-IND-J08"],
    disposition: "DEFER — DEFINITION REQUIRED",
    ontology_class: "ADMINISTRATIVE COUNT",
    scoreboard_inclusion: "baseline_slot",
    questions: q(
      "White-collar / economic crime enforcement intensity — rate per what population/base?",
      "Possible administrative counts (DOJ/FBI/USSC) after definition lock; no locked intensity rate now.",
      "Raw case counts without intensity definition are a weak proxy.",
      "Not until offense class, agency universe, and rate base are locked."
    ),
    rationale:
      "Retain countable candidate. Definition debt explicit. No stuffed proxy.",
  },
  {
    flag_id: "FLAG-HC01",
    metric_ids: ["CC-IND-HC01"],
    disposition: "DEFER — DEFINITION REQUIRED",
    ontology_class: "DERIVED STATISTIC",
    scoreboard_inclusion: "baseline_slot",
    questions: q(
      "Multiple-pathway secondary completion / credential attainment composite.",
      "Component series exist (NCES); composite does not until governed.",
      "Bachelor's-or-higher alone distorts the multiple-pathway concept.",
      "Not until composite membership and ages are locked."
    ),
    rationale:
      "Keep countable. Reject bachelor's-or-higher substitute. Definition lock required before sourcing.",
  },
  {
    flag_id: "FLAG-CM03",
    metric_ids: ["CC-IND-CM03"],
    disposition: "DEFER — DEFINITION REQUIRED",
    ontology_class: "STRUCTURAL INDICATOR",
    scoreboard_inclusion: "baseline_slot",
    questions: q(
      "Hospital access — travel-time, closure, or capacity?",
      "No single authoritative national access scalar ready for this slot.",
      "Beds ≠ access; HPSA primary-care belongs to E05; overnight stays ≠ geographic access.",
      "Not until access construct is locked."
    ),
    rationale:
      "Keep countable with explicit rejected substitutes. No number this slice.",
  },
  {
    flag_id: "FLAG-HC08",
    metric_ids: ["CC-IND-HC08"],
    disposition: "RECLASSIFY AS RESEARCH QUESTION",
    ontology_class: "RESEARCH QUESTION",
    scoreboard_inclusion: "research_question",
    questions: q(
      "Employer satisfaction with pathway graduates.",
      "No federal statistical series.",
      "Any ad-hoc survey would be a new research instrument, not a baseline retrieve.",
      "No shared official answer exists."
    ),
    rationale:
      "Park as research question / future survey design. Not a baseline scoreboard cell.",
  },
  {
    flag_id: "FLAG-PS-T-CLUSTER",
    metric_ids: [
      "CC-IND-PS01",
      "CC-IND-PS02",
      "CC-IND-PS03",
      "CC-IND-PS04",
      "CC-IND-PS05",
      "CC-IND-PS06",
      "CC-IND-PS07",
      "CC-IND-PS08",
      "CC-IND-T01",
      "CC-IND-T02",
      "CC-IND-T03",
      "CC-IND-T04",
      "CC-IND-T05",
      "CC-IND-T06",
      "CC-IND-T07",
      "CC-IND-T08",
    ],
    disposition: "RECLASSIFY AS DESIGN INDICATOR",
    ontology_class: "DESIGN TARGET",
    scoreboard_inclusion: "design_indicator",
    questions: q(
      "Public-service and transparency inventory / audit constructs.",
      "Require custom inventories/audits, not one agency table.",
      "Treating them as ordinary baseline statistics creates false confidence.",
      "No — answers depend on unfinished inventory methodology."
    ),
    rationale:
      "Park PS01–PS08 and T01–T08 as design/measurement-build indicators. May return later as ADMINISTRATIVE COUNT after inventory methodology locks. Do not count toward empirical baseline scoreboard now.",
  },
];

const adjudicationByMetric = new Map();
for (const a of adjudications) {
  for (const id of a.metric_ids) {
    if (a.flag_id === "FLAG-DUP-D01-D04") continue; // handled via remap/title
    adjudicationByMetric.set(id, a);
  }
}

function ontologyFromObservationType(m) {
  const t = m.observation_type || "";
  if (/survey/i.test(t)) return "SURVEY MEASURE";
  if (/derived|accounts|ratio|share/i.test(t)) return "DERIVED STATISTIC";
  if (/administrative|patent|grant|count/i.test(t)) return "ADMINISTRATIVE COUNT";
  if (/census|directly_observed/i.test(t)) return "OBSERVED STATISTIC";
  if (m.current_value != null) return "OBSERVED STATISTIC";
  return "STRUCTURAL INDICATOR";
}

function applyGovernanceFields(m, { ontology_class, scoreboard_inclusion, disposition, status }) {
  m.ontology_class = ontology_class;
  m.scoreboard_inclusion = scoreboard_inclusion;
  m.governance_disposition = disposition;
  m.governance_slice_id = SLICE;
  m.governance_at = TODAY;
  if (status) m.status = status;
  if (scoreboard_inclusion === "design_indicator") {
    m.counts_toward_baseline_scoreboard = false;
  } else if (scoreboard_inclusion === "research_question") {
    m.counts_toward_baseline_scoreboard = false;
  } else if (scoreboard_inclusion === "baseline_slot") {
    m.counts_toward_baseline_scoreboard = true;
  } else if (scoreboard_inclusion === "retired_merged") {
    m.counts_toward_baseline_scoreboard = false;
  }
}

// --- Transform metrics array: resolve duplicate D01–D04 ---
const nextMetrics = [];
let removedLegacyVoterParticipation = 0;
let remappedLegacy = 0;

for (const m of metricsDoc.metrics) {
  const isLegacyD01 =
    m.metric_id === "CC-IND-D01" && /^Voter participation$/i.test(m.title);
  const isLegacyD02 =
    m.metric_id === "CC-IND-D02" && /^Civic engagement$/i.test(m.title);
  const isLegacyD03 =
    m.metric_id === "CC-IND-D03" && /^Public trust$/i.test(m.title);
  const isLegacyD04 =
    m.metric_id === "CC-IND-D04" && /^Local participation$/i.test(m.title);
  const isFrameworkD01 =
    m.metric_id === "CC-IND-D01" && /contested races/i.test(m.title);
  const isFrameworkD02 =
    m.metric_id === "CC-IND-D02" && /community-integrity|split indicators/i.test(m.title);
  const isFrameworkD03 =
    m.metric_id === "CC-IND-D03" && /voter participation rate/i.test(m.title);
  const isFrameworkD04 =
    m.metric_id === "CC-IND-D04" && /campaign funding/i.test(m.title);

  if (isLegacyD01) {
    removedLegacyVoterParticipation += 1;
    // Merged away — lineage only in remap table
    continue;
  }

  if (isLegacyD02) {
    m.metric_id = "CC-IND-D09";
    m.historical_metric_id = "CC-IND-D02";
    m.historical_title_context = "legacy_early_democracy_block";
    m.definition =
      "Civic engagement — definition deferred. Not the same slot as district community-integrity (CC-IND-D02). Do not fill with CM05 volunteerism without an explicit redefine decision.";
    m.limitations =
      "ID remapped from legacy CC-IND-D02. Definition required before sourcing. Bad metric rule: no convenient proxy.";
    applyGovernanceFields(m, {
      ontology_class: "SURVEY MEASURE",
      scoreboard_inclusion: "baseline_slot",
      disposition: "REMAP ID",
      status: "definition_deferred",
    });
    remappedLegacy += 1;
    nextMetrics.push(m);
    continue;
  }

  if (isLegacyD03) {
    m.metric_id = "CC-IND-D10";
    m.historical_metric_id = "CC-IND-D03";
    m.historical_title_context = "legacy_early_democracy_block";
    m.definition =
      "Public trust in government/institutions — definition deferred (instrument, population, geography). Distinct from CC-IND-D03 voter participation rate.";
    m.limitations =
      "ID remapped from legacy CC-IND-D03. Survey-measure candidate only after instrument lock. No stuffed proxy.";
    applyGovernanceFields(m, {
      ontology_class: "SURVEY MEASURE",
      scoreboard_inclusion: "baseline_slot",
      disposition: "REMAP ID",
      status: "definition_deferred",
    });
    remappedLegacy += 1;
    nextMetrics.push(m);
    continue;
  }

  if (isLegacyD04) {
    m.metric_id = "CC-IND-D11";
    m.historical_metric_id = "CC-IND-D04";
    m.historical_title_context = "legacy_early_democracy_block";
    m.definition =
      "Local civic/political participation — definition deferred. Distinct from campaign funding (CC-IND-D04) and from CM05 volunteerism.";
    m.limitations =
      "ID remapped from legacy CC-IND-D04. Definition required before sourcing.";
    applyGovernanceFields(m, {
      ontology_class: "SURVEY MEASURE",
      scoreboard_inclusion: "baseline_slot",
      disposition: "REMAP ID",
      status: "definition_deferred",
    });
    remappedLegacy += 1;
    nextMetrics.push(m);
    continue;
  }

  if (isFrameworkD01 || isFrameworkD02 || isFrameworkD03 || isFrameworkD04) {
    m.canonical_id_holder = true;
    m.id_remap_note =
      "Canonical democracy-framework holder after CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0. See research/phase_2/baseline_id_remap_table.json.";
    if (isFrameworkD03) {
      applyGovernanceFields(m, {
        ontology_class: "SURVEY MEASURE",
        scoreboard_inclusion: "baseline_slot",
        disposition: "KEEP AS WRITTEN",
        status: m.status,
      });
      m.merged_historical_ids = [
        {
          historical_ref: "CC-IND-D01",
          historical_title: "Voter participation",
          context: "legacy_early_democracy_block",
        },
      ];
    } else {
      applyGovernanceFields(m, {
        ontology_class: "STRUCTURAL INDICATOR",
        scoreboard_inclusion: "baseline_slot",
        disposition: "KEEP AS WRITTEN",
        status: m.status,
      });
    }
    nextMetrics.push(m);
    continue;
  }

  const adj = adjudicationByMetric.get(m.metric_id);
  if (adj) {
    const statusMap = {
      "RECLASSIFY AS DESIGN INDICATOR": "design_indicator",
      "RECLASSIFY AS RESEARCH QUESTION": "research_question",
      "DEFER — DEFINITION REQUIRED": "definition_deferred",
      "DEFER — DATA UNAVAILABLE": "data_unavailable",
      RETIRE: "retired",
      REDEFINE: "redefinition_pending",
    };
    applyGovernanceFields(m, {
      ontology_class: adj.ontology_class,
      scoreboard_inclusion: adj.scoreboard_inclusion,
      disposition: adj.disposition,
      status: statusMap[adj.disposition] || m.status,
    });
    m.governance_rationale = adj.rationale;
    m.limitations = `${m.limitations || ""} Governance (${SLICE}): ${adj.disposition}. ${adj.rationale}`.trim();
    nextMetrics.push(m);
    continue;
  }

  // Default classification for unflagged metrics
  const ontology = ontologyFromObservationType(m);
  applyGovernanceFields(m, {
    ontology_class: ontology,
    scoreboard_inclusion: "baseline_slot",
    disposition: "KEEP AS WRITTEN",
    status: m.status,
  });
  nextMetrics.push(m);
}

metricsDoc.metrics = nextMetrics;

// Integrity checks
const idCounts = {};
for (const m of metricsDoc.metrics) {
  idCounts[m.metric_id] = (idCounts[m.metric_id] || 0) + 1;
}
const remainingDups = Object.entries(idCounts).filter(([, n]) => n > 1);
if (remainingDups.length) {
  console.error("Duplicate IDs remain:", remainingDups);
  process.exit(1);
}

const registryEntries = metricsDoc.metrics.length;
const countable = metricsDoc.metrics.filter((m) => m.counts_toward_baseline_scoreboard !== false);
const nonCount = metricsDoc.metrics.filter((m) => m.counts_toward_baseline_scoreboard === false);
const sourcedCountable = countable.filter(
  (m) => m.current_value != null && m.source_ids?.length
);
const sourcedAll = metricsDoc.metrics.filter(
  (m) => m.current_value != null && m.source_ids?.length
);

if (sourcedAll.length !== sourcedCountable.length) {
  console.error("Sourced metric fell into non-countable class — abort");
  process.exit(1);
}

const AFTER_NUM = sourcedCountable.length;
const AFTER_DEN = countable.length;
const AFTER_DISPLAY = `${AFTER_NUM}/${AFTER_DEN}`;

// Summaries
const dispositionCounts = {};
for (const m of metricsDoc.metrics) {
  const d = m.governance_disposition || "KEEP AS WRITTEN";
  dispositionCounts[d] = (dispositionCounts[d] || 0) + 1;
}

const definitionDebt = metricsDoc.metrics
  .filter((m) =>
    ["definition_deferred", "data_unavailable", "redefinition_pending"].includes(m.status)
  )
  .map((m) => ({
    metric_id: m.metric_id,
    title: m.title,
    disposition: m.governance_disposition,
    ontology_class: m.ontology_class,
  }));

const domainsAffected = [
  ...new Set(
    metricsDoc.metrics
      .filter((m) => m.governance_slice_id === SLICE && m.governance_disposition !== "KEEP AS WRITTEN")
      .map((m) => m.domain_name || m.domain_id)
  ),
].sort();

// Artifacts
const remapTable = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "No silent renumbering. Every historical ID+title context resolves to a canonical target.",
  resolve_algorithm:
    "Match on (metric_id + title context). If historical title is legacy voter participation under D01, resolve to CC-IND-D03. Framework titles keep D01–D04. Legacy civic engagement / public trust / local participation resolve to D09 / D10 / D11.",
  entries: idRemap,
  graph_and_report_repair: [
    {
      path: "content/research/national-diagnosis/22-democracy-representation-and-distributed-government.md",
      change: "Clarify D01+ now means democracy-framework block; see remap table for legacy titles.",
    },
    {
      path: "data/research/source_registry.json",
      change: "CC-SRC-246 note already points at voter participation rate framework slot (D03).",
    },
  ],
  historical_references_preserved: true,
  silent_renumbering: false,
};

const ontologyCleanup = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  governing_rule:
    "A bad metric is worse than a missing metric because it creates false confidence.",
  ontology_classes: [
    "OBSERVED STATISTIC",
    "DERIVED STATISTIC",
    "INDEX",
    "SURVEY MEASURE",
    "ADMINISTRATIVE COUNT",
    "STRUCTURAL INDICATOR",
    "DESIGN TARGET",
    "RESEARCH QUESTION",
    "NORMATIVE GOAL",
  ],
  countable_toward_baseline_scoreboard: [...COUNTABLE_ONTOLOGY],
  non_countable: ["DESIGN TARGET", "RESEARCH QUESTION", "NORMATIVE GOAL"],
  before: {
    registry_entries: 86,
    unique_metric_ids: 82,
    duplicate_ids: ["CC-IND-D01", "CC-IND-D02", "CC-IND-D03", "CC-IND-D04"],
    sourced: 27,
    scoreboard: BEFORE_DISPLAY,
    integrity: "broken_duplicate_ids",
  },
  after: {
    registry_entries: registryEntries,
    unique_metric_ids: Object.keys(idCounts).length,
    duplicate_ids: [],
    sourced: AFTER_NUM,
    countable_baseline_slots: AFTER_DEN,
    design_indicators: nonCount.filter((m) => m.scoreboard_inclusion === "design_indicator").length,
    research_questions: nonCount.filter((m) => m.scoreboard_inclusion === "research_question").length,
    scoreboard: AFTER_DISPLAY,
    integrity: "unique_ids_ontology_tagged",
  },
  class_counts: metricsDoc.metrics.reduce((acc, m) => {
    const k = m.ontology_class || "UNSET";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {}),
  note: "Design targets and research questions remain in the registry for lineage but do not count toward the empirical baseline scoreboard.",
};

const governanceReturn = {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  adjudications,
  disposition_counts_on_metrics: dispositionCounts,
  ids_remapped: {
    merged: [
      {
        from: "CC-IND-D01@legacy:Voter participation",
        to: "CC-IND-D03",
      },
    ],
    remapped: [
      { from: "CC-IND-D02@legacy:Civic engagement", to: "CC-IND-D09" },
      { from: "CC-IND-D03@legacy:Public trust", to: "CC-IND-D10" },
      { from: "CC-IND-D04@legacy:Local participation", to: "CC-IND-D11" },
    ],
    canonical_retained: ["CC-IND-D01", "CC-IND-D02", "CC-IND-D03", "CC-IND-D04"],
  },
  metrics_retained_keep_as_written: dispositionCounts["KEEP AS WRITTEN"] || 0,
  metrics_redefined: dispositionCounts.REDEFINE || 0,
  metrics_split: dispositionCounts.SPLIT || 0,
  metrics_retired_or_merged: removedLegacyVoterParticipation,
  metrics_deferred_definition: definitionDebt.length,
  metrics_reclassified_design: nonCount.filter((m) => m.scoreboard_inclusion === "design_indicator")
    .length,
  metrics_reclassified_research: nonCount.filter((m) => m.scoreboard_inclusion === "research_question")
    .length,
  definition_debt_remaining: definitionDebt,
  domains_affected: domainsAffected,
  graph_references_repaired: remapTable.graph_and_report_repair.length,
  historical_references_preserved: true,
  baseline_count_before: BEFORE_DISPLAY,
  baseline_count_after: AFTER_DISPLAY,
  numerator_change: AFTER_NUM - 27,
  denominator_change: AFTER_DEN - 86,
  remapped_legacy_rows: remappedLegacy,
};

write("research/phase_2/baseline_id_remap_table.json", remapTable);
write("research/phase_2/baseline_ontology_cleanup.json", ontologyCleanup);
write("research/phase_2/baseline_bad_metric_governance_adjudications.json", {
  version: "1.0.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "A bad metric is worse than a missing metric because it creates false confidence.",
  allowed_dispositions: [
    "KEEP AS WRITTEN",
    "REDEFINE",
    "SPLIT",
    "REMAP ID",
    "MERGE",
    "RECLASSIFY AS DESIGN INDICATOR",
    "RECLASSIFY AS RESEARCH QUESTION",
    "RETIRE",
    "DEFER — DEFINITION REQUIRED",
    "DEFER — DATA UNAVAILABLE",
  ],
  adjudications,
  summary: governanceReturn,
});

// Close prior flags file with pointer
write("research/phase_2/baseline_bad_metrics_governance_flags.json", {
  version: "0.2.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "adjudicated",
  superseded_by: "research/phase_2/baseline_bad_metric_governance_adjudications.json",
  prior_definition_problems_found: 12,
  note: "Flags from round-2 expansion have been dispositioned. See adjudications + ontology cleanup + ID remap table.",
});

metricsDoc.version = "0.4.0";
metricsDoc.last_updated = TODAY;
metricsDoc.status = "partially_sourced_ontology_cleaned";
metricsDoc.note = `Phase 2 partial after ${SLICE}: scoreboard ${AFTER_DISPLAY} (was ${BEFORE_DISPLAY}). Registry entries ${registryEntries} with unique IDs. Design/research items parked off scoreboard. Completeness = reproducible retrieval. Bad metrics not stuffed. Ag posture lock preserved.`;
metricsDoc.ontology_rule =
  "Only OBSERVED STATISTIC, DERIVED STATISTIC, INDEX, SURVEY MEASURE, ADMINISTRATIVE COUNT, and STRUCTURAL INDICATOR normally count toward the baseline scoreboard. DESIGN TARGET / RESEARCH QUESTION / NORMATIVE GOAL do not.";
metricsDoc.id_remap_table = "research/phase_2/baseline_id_remap_table.json";
write("data/baseline/national_baseline_metrics.json", metricsDoc);

statusDoc.version = "0.4.0";
statusDoc.last_updated = TODAY;
statusDoc.total_metrics = AFTER_DEN;
statusDoc.sourced_metrics = AFTER_NUM;
statusDoc.pending_metrics = AFTER_DEN - AFTER_NUM;
statusDoc.registry_entries = registryEntries;
statusDoc.design_indicators_parked = ontologyCleanup.after.design_indicators;
statusDoc.research_questions_parked = ontologyCleanup.after.research_questions;
statusDoc.status = "partial_phase_2_ontology_cleaned";
statusDoc.note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE}. Historical ${BEFORE_DISPLAY} had duplicate D01–D04 IDs and design/research items counting as ordinary slots. Numerator unchanged (${AFTER_NUM}). Denominator cleaned ${86}→${AFTER_DEN}.`;
statusDoc.before_after = {
  before_display: BEFORE_DISPLAY,
  after_display: AFTER_DISPLAY,
  before_sourced: 27,
  after_sourced: AFTER_NUM,
  before_denominator: 86,
  after_denominator: AFTER_DEN,
  slice_id: SLICE,
};
statusDoc.scoreboard_rule =
  "Scoreboard = sourced countable slots / countable empirical slots. Design targets and research questions are registry-preserved but excluded from the denominator.";
write("data/baseline/baseline_status.json", statusDoc);

sourceMap.version = "0.4.0";
sourceMap.last_updated = TODAY;
sourceMap.mappings = countable
  .filter((m) => m.source_ids?.length)
  .map((m) => ({ metric_id: m.metric_id, title: m.title, source_ids: m.source_ids }));
sourceMap.note = `Mappings for countable sourced metrics only (${AFTER_DISPLAY}). See ontology cleanup for parked design/research IDs.`;
write("data/baseline/baseline_source_map.json", sourceMap);

methodology.version = "0.2.0";
methodology.last_updated = TODAY;
methodology.bad_metric_rule =
  "A bad metric is worse than a missing metric because it creates false confidence.";
methodology.ontology_classes = ontologyCleanup.ontology_classes;
methodology.countable_ontology_classes = ontologyCleanup.countable_toward_baseline_scoreboard;
methodology.id_remap_table = "research/phase_2/baseline_id_remap_table.json";
methodology.governance_slice = SLICE;
methodology.round_2_rule =
  "Do not fill a baseline slot until the metric definition, source, geography, year, retrieval path, and limitations all line up.";
methodology.governance_rule =
  "Do not stuff weak proxies into deferred, design, or research-question slots. Prefer an empty countable slot or an explicit park off-scoreboard.";
write("data/baseline/baseline_methodology.json", methodology);

// Democracy brief repair
const demPath = "content/research/national-diagnosis/22-democracy-representation-and-distributed-government.md";
let dem = fs.readFileSync(r(demPath), "utf8");
const demOld = "- Pending National Baseline democracy indicators (`CC-IND-D01`+).";
const demNew = `- Pending National Baseline democracy indicators (\`CC-IND-D01\`+ framework block). Legacy early-block titles that once reused D01–D04 are remapped — see \`research/phase_2/baseline_id_remap_table.json\` (voter participation → \`CC-IND-D03\`; civic engagement / public trust / local participation → \`CC-IND-D09\`/\`D10\`/\`D11\`).`;
if (dem.includes(demOld)) {
  dem = dem.replace(demOld, demNew);
  fs.writeFileSync(r(demPath), dem, "utf8");
}

// Validators: accept cleaned denominator
let phase2Val = fs.readFileSync(r("scripts/validate-phase2-acceptance.mjs"), "utf8");
phase2Val = phase2Val
  .replace(
    /if \(baselineStatus\.total_metrics !== 86\) \{\s*fail\(`baseline_status\.total_metrics must be 86, found \$\{baselineStatus\.total_metrics\}`\);\s*\} else ok\("baseline denominator is 86"\);/,
    `if (baselineStatus.total_metrics !== ${AFTER_DEN}) {\n  fail(\`baseline_status.total_metrics must be ${AFTER_DEN} after ontology cleanup, found \${baselineStatus.total_metrics}\`);\n} else ok("baseline denominator is ${AFTER_DEN} (ontology-cleaned countable slots)");`
  )
  .replace(
    /if \(baselineStatus\.sourced_metrics !== 27\) \{\s*warn\(\s*`sourced_metrics is \$\{baselineStatus\.sourced_metrics\} \(canonical operating snapshot expected 27 after baseline subset expansion round 2\)`\s*\);\s*\} else ok\("baseline sourced count remains 27\/86"\);/,
    `if (baselineStatus.sourced_metrics !== ${AFTER_NUM}) {\n  warn(\n    \`sourced_metrics is \${baselineStatus.sourced_metrics} (canonical operating snapshot expected ${AFTER_NUM} after bad-metric governance)\`\n  );\n} else ok("baseline sourced count remains ${AFTER_DISPLAY}");`
  );
fs.writeFileSync(r("scripts/validate-phase2-acceptance.mjs"), phase2Val, "utf8");

let baselineVal = fs.readFileSync(r("scripts/validate-baseline-data.mjs"), "utf8");
if (!baselineVal.includes("unique metric_id")) {
  baselineVal = baselineVal.replace(
    `ok(\`sourced metrics: \${sourced} / \${(data.metrics || []).length}\`);`,
    `const idHits = {};
  let countable = 0;
  let sourcedCountable = 0;
  for (const m of data.metrics || []) {
    idHits[m.metric_id] = (idHits[m.metric_id] || 0) + 1;
    const counts = m.counts_toward_baseline_scoreboard !== false
      && !["design_indicator", "research_question", "retired", "retired_merged"].includes(m.status);
    if (counts) {
      countable += 1;
      if (m.current_value != null && m.source_ids?.length) sourcedCountable += 1;
    }
  }
  const dups = Object.entries(idHits).filter(([, n]) => n > 1);
  if (dups.length) fail(\`duplicate metric_id values: \${dups.map(([id]) => id).join(", ")}\`);
  else ok("unique metric_id values");
  ok(\`sourced metrics (registry rows): \${sourced} / \${(data.metrics || []).length}\`);
  ok(\`scoreboard countable: \${sourcedCountable} / \${countable}\`);`
  );
  fs.writeFileSync(r("scripts/validate-baseline-data.mjs"), baselineVal, "utf8");
}

// GATE-07 + honesty dials
const gate07 = (checklist.gates || []).find((g) => g.id === "GATE-07");
if (gate07) {
  gate07.forensic_note = `Baseline scoreboard ${AFTER_DISPLAY} after ${SLICE} (was ${BEFORE_DISPLAY}). Numerator unchanged. Denominator ontology-cleaned; duplicate D01–D04 resolved. GATE remains open.`;
}
if (checklist.operating_honesty_dials?.baseline) {
  checklist.operating_honesty_dials.baseline.sourced_metrics = AFTER_NUM;
  checklist.operating_honesty_dials.baseline.total_metrics = AFTER_DEN;
  checklist.operating_honesty_dials.baseline.display_rule = `Show ${AFTER_DISPLAY}. Historical ${BEFORE_DISPLAY} retained in lineage notes. Completeness = reproducible retrieval. Never revive 38-metric narratives.`;
}
checklist.last_updated = TODAY;
write("data/project/phase2_acceptance_checklist.json", checklist);

if (forensic.integrity_dials) {
  forensic.integrity_dials.baseline_sourced_of_total = AFTER_DISPLAY;
  forensic.integrity_dials.baseline_note = `Scoreboard after ontology cleanup (${SLICE}). Historical ${BEFORE_DISPLAY} had duplicate IDs + design/research contamination in the denominator.`;
}
forensic.last_updated = TODAY;
write("data/project/forensic_audit_governance.json", forensic);

// Updates
const updId = "UPD-092";
if (!updates.updates.some((u) => u.id === updId)) {
  updates.updates.push({
    id: updId,
    date: TODAY,
    title: "Baseline bad-metric governance and ID remap",
    summary: `Under CC-DEC-103: adjudicated 12 bad-metric flags. Remapped duplicate D01–D04 (legacy voter participation MERGED→D03; civic/trust/local→D09–D11). Scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY} (numerator unchanged; denominator cleaned). Design/research items parked off scoreboard. Ag lock preserved.`,
    public: true,
  });
}
updates.last_updated = TODAY;
write("data/project/updates.json", updates);

// Slice queue
const sliceRec = {
  slice_id: SLICE,
  title: "Baseline Bad-Metric Governance and ID Remap",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    `scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY}`,
    "duplicate D01–D04 remapped",
    "12 flags adjudicated",
    "ontology cleanup shipped",
    "historical lineage preserved",
    "ag posture lock preserved",
  ],
  next_recommended_slice: NEXT,
  alternate_next: [
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    "CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-HC01-CM03-B03-I02-J08-1.0",
  ],
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.active_slice = NEXT;
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
sliceQueue.progress_audit = {
  slice_id: SLICE,
  as_of: TODAY,
  baseline: AFTER_DISPLAY,
  sources: build.sources_registered,
  overall_percent: build.overall_percent,
};
write("data/project/slice_queue.json", sliceQueue);

build.version = "0.4.10";
build.last_updated = TODAY;
build.mission_id = SLICE;
build.slice_return = `reports/CC_PHASE_2_1_BASELINE_BAD_METRIC_GOVERNANCE_AND_ID_REMAP_1_0_RETURN.md`;
build.writing_focus = `Baseline ontology cleaned. Scoreboard ${AFTER_DISPLAY}. Next: legitimate-slot expansion / definition locks. Ag voice-gated.`;
build.next_action =
  "Expand only countable empirical slots; finish definition locks for HC01/CM03/B03/I02/J08; human ag voice calls remain open.";
build.baseline = AFTER_DISPLAY;
build.active_slice = NEXT;
build.last_completed_slice = SLICE;
build.notes = [
  `${SLICE}: scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY}; unique IDs; design/research parked; modeling/legal 0%; processing ~3/0/0; feed voice-gated.`,
];
write("data/project/current_build_state.json", build);

const latest = {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary: `Bad-metric governance: scoreboard ${BEFORE_DISPLAY}→${AFTER_DISPLAY}. Duplicate D01–D04 remapped with lineage table. 12 flags adjudicated. No stuffed proxies. Ag lock preserved.`,
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: build.overall_percent,
  phase_2_status: "PARTIAL",
  recommended_next_slice: NEXT,
  decision_ids: ["CC-DEC-103"],
  update_ids: [updId],
  public_paths: ["/where-we-are/", "/metrics/", "/status/"],
  board_paths: ["/baseline/", "/phase-2-gate/", "/diagnosis/"],
  integrity_note:
    "Denominator cleaned; numerator not inflated. Design/research items are not baseline statistics. No ag booking inference.",
  next_command: "Legitimate countable-slot expansion and/or definition locks; human ag voice calls",
  report: "reports/CC_PHASE_2_1_BASELINE_BAD_METRIC_GOVERNANCE_AND_ID_REMAP_1_0_RETURN.md",
  sources_registered: build.sources_registered,
  baseline_before: BEFORE_DISPLAY,
  baseline_after: AFTER_DISPLAY,
  baseline_sourced: AFTER_NUM,
  baseline_total: AFTER_DEN,
  agriculture_posture_lock: "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md",
  processing_baseline: {
    cattle_accessible_claimed_desk: 3,
    booking_confirmed: 0,
    economically_usable_confirmed: 0,
  },
};
write("data/project/latest_cursor_return.json", latest);

// START_HERE banner
let start = fs.readFileSync(r("START_HERE_FOR_AI.md"), "utf8");
start = start
  .replace(
    /Latest completed slices:.*\nActive \/ next:.*\n/,
    `Latest completed slices: progress-indicators deep audit; baseline bad-metric governance / ID remap\nActive / next: ${NEXT}\n`
  )
  .replace(/GATE-07: OPEN — baseline 27\/86[^\n]*/, `GATE-07: OPEN — baseline ${AFTER_DISPLAY} (ontology-cleaned countable slots; numerator unchanged)`)
  .replace(/Baseline: 27\/86/, `Baseline: ${AFTER_DISPLAY}`)
  .replace(
    /Active next slice: `CC-PHASE-2\.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1\.0`[^\n]*/,
    `Active next slice: \`${NEXT}\` (Phase 2 remains PARTIAL; bad-metric governance shipped)`
  );
fs.writeFileSync(r("START_HERE_FOR_AI.md"), start, "utf8");

// phase-2-gate.astro if it hardcodes 27/86
const gateAstroPath = "apps/build-board/src/pages/phase-2-gate.astro";
if (fs.existsSync(r(gateAstroPath))) {
  let astro = fs.readFileSync(r(gateAstroPath), "utf8");
  if (astro.includes("27/86") || astro.includes("2/86")) {
    astro = astro
      .replace(/27\/86/g, AFTER_DISPLAY)
      .replace(/baseline remains 27\/86/gi, `baseline scoreboard ${AFTER_DISPLAY}`);
    fs.writeFileSync(r(gateAstroPath), astro, "utf8");
  }
}

const returnMd = `# CC-PHASE-2.1-BASELINE-BAD-METRIC-GOVERNANCE-AND-ID-REMAP-1.0 — Return

**Generated:** ${TODAY}  
**Governing rule:** A bad metric is worse than a missing metric because it creates false confidence.

## 1. Scoreboard

| | |
| --- | ---: |
| Baseline count before | **${BEFORE_DISPLAY}** |
| Baseline count after | **${AFTER_DISPLAY}** |
| Numerator change | **${AFTER_NUM - 27}** (unchanged) |
| Denominator change | **${AFTER_DEN - 86}** (ontology cleanup) |
| Registry entries (lineage) | **${registryEntries}** |
| Unique metric IDs | **${Object.keys(idCounts).length}** |

## 2. Disposition summary

| Outcome | Count |
| --- | ---: |
| IDs remapped (legacy→canonical) | **4** (1 MERGE + 3 REMAP) |
| Metrics retained (KEEP AS WRITTEN) | **${dispositionCounts["KEEP AS WRITTEN"] || 0}** |
| Metrics redefined | **${dispositionCounts.REDEFINE || 0}** |
| Metrics split | **${dispositionCounts.SPLIT || 0}** |
| Metrics retired / merged away | **${removedLegacyVoterParticipation}** |
| Metrics deferred (definition/data) | **${definitionDebt.length}** |
| Reclassified design indicator | **${ontologyCleanup.after.design_indicators}** |
| Reclassified research question | **${ontologyCleanup.after.research_questions}** |

## 3. Duplicate D01–D04 remap (no silent renumbering)

| Historical | Context | Disposition | Canonical |
| --- | --- | --- | --- |
| D01 Voter participation | legacy early block | MERGE | **D03** Voter participation rate |
| D02 Civic engagement | legacy early block | REMAP ID | **D09** |
| D03 Public trust | legacy early block | REMAP ID | **D10** |
| D04 Local participation | legacy early block | REMAP ID | **D11** |
| D01 Contested races | framework | KEEP AS WRITTEN | **D01** |
| D02 District integrity | framework | KEEP AS WRITTEN | **D02** |
| D03 Voter participation rate | framework | KEEP AS WRITTEN | **D03** (sourced) |
| D04 Campaign funding concentration | framework | KEEP AS WRITTEN | **D04** |

Canonical table: \`research/phase_2/baseline_id_remap_table.json\`

## 4. Flag adjudications (strict four questions applied)

| Flag | Disposition | Ontology |
| --- | --- | --- |
| Duplicate D01–D04 | REMAP ID / MERGE | structural / survey |
| CM01 Main Street occupancy | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| B03 Local ownership | DEFER — DEFINITION REQUIRED | STRUCTURAL INDICATOR |
| G04 Regulatory burden | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| I02 AI investment | DEFER — DEFINITION REQUIRED | DERIVED STATISTIC |
| E07 Community Health Index | RECLASSIFY AS DESIGN INDICATOR | DESIGN TARGET |
| D07 Oversight durability | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| J08 White-collar enforcement intensity | DEFER — DEFINITION REQUIRED | ADMINISTRATIVE COUNT |
| HC01 Multiple-pathway completion | DEFER — DEFINITION REQUIRED | DERIVED STATISTIC |
| CM03 Hospital access | DEFER — DEFINITION REQUIRED | STRUCTURAL INDICATOR |
| HC08 Employer satisfaction | RECLASSIFY AS RESEARCH QUESTION | RESEARCH QUESTION |
| PS01–PS08 / T01–T08 | RECLASSIFY AS DESIGN INDICATOR | DESIGN TARGET |

Full Q&A: \`research/phase_2/baseline_bad_metric_governance_adjudications.json\`

## 5. Ontology cleanup

Only these classes count toward the scoreboard denominator:

\`\`\`text
OBSERVED STATISTIC
DERIVED STATISTIC
INDEX
SURVEY MEASURE
ADMINISTRATIVE COUNT
STRUCTURAL INDICATOR
\`\`\`

Design targets and research questions remain in the registry for lineage but **do not** count as baseline statistics.

Artifact: \`research/phase_2/baseline_ontology_cleanup.json\`

## 6. Definition debt remaining

${definitionDebt.map((d) => `- \`${d.metric_id}\` — ${d.title} (${d.disposition})`).join("\n")}

## 7. Domains affected

${domainsAffected.map((d) => `- ${d}`).join("\n")}

## 8. Graph / report references

- Democracy diagnosis metrics bullet updated to point at remap table
- Historical references preserved (no silent renumbering)
- Graph references repaired: **${remapTable.graph_and_report_repair.length}** documented touchpoints

## 9. Intentionally unchanged

- Sourced numerator **${AFTER_NUM}** (no expansion this slice)
- Modeling / legal **0% / 0%**
- Phase 2 **PARTIAL**
- Agriculture posture lock (~3 / 0 / 0; feed voice-gated)
- Doctrine / principle count

## 10. Next

\`${NEXT}\`

Alternate: definition locks for HC01 / CM03 / B03 / I02 / J08 before further fills.

## 11. Validators

Filled at ship.
`;

fs.writeFileSync(
  r("reports/CC_PHASE_2_1_BASELINE_BAD_METRIC_GOVERNANCE_AND_ID_REMAP_1_0_RETURN.md"),
  returnMd,
  "utf8"
);

console.log(`Slice ${SLICE}`);
console.log(`Scoreboard: ${BEFORE_DISPLAY} → ${AFTER_DISPLAY}`);
console.log(`Registry entries: ${registryEntries}; unique IDs: ${Object.keys(idCounts).length}`);
console.log(`Legacy merged away: ${removedLegacyVoterParticipation}; remapped: ${remappedLegacy}`);
console.log(
  `Design parked: ${ontologyCleanup.after.design_indicators}; research parked: ${ontologyCleanup.after.research_questions}`
);
console.log(`Definition debt rows: ${definitionDebt.length}`);
console.log(`Domains affected: ${domainsAffected.join(", ")}`);
