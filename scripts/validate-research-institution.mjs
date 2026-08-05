/**
 * Validates research institution foundations (2.3–2.13).
 * Also exposed as focused npm scripts that call this with --only=.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : "all";

const errors = [];
const warnings = [];
const fail = (m) => {
  errors.push(m);
  console.error("[FAIL]", m);
};
const warn = (m) => {
  warnings.push(m);
  console.warn("[WARN]", m);
};
const ok = (m) => console.log("[OK]", m);

function mustDir(rel) {
  if (!fs.existsSync(r(rel)) || !fs.statSync(r(rel)).isDirectory()) fail(`Missing dir ${rel}`);
  else ok(`dir ${rel}`);
}
function mustFile(rel) {
  if (!fs.existsSync(r(rel))) fail(`Missing file ${rel}`);
  else ok(rel);
}
function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(r(rel), "utf8"));
  } catch (e) {
    fail(`JSON parse ${rel}: ${e.message}`);
    return null;
  }
}
function uniqueIds(items, key, label) {
  const seen = new Set();
  for (const item of items || []) {
    const id = item[key];
    if (!id) {
      fail(`${label} missing ${key}`);
      continue;
    }
    if (seen.has(id)) fail(`${label} duplicate ${key} ${id}`);
    seen.add(id);
  }
}

const suites = {
  methodology() {
    mustDir("research/methodology");
    [
      "research/methodology/METHODOLOGY_CALIBRATION_1_0.md",
      "research/methodology/PP_METHOD_LESSONS_LEARNED.md",
      "research/methodology/confirmation_bias_audit.md",
      "research/methodology/research_friction_report.md",
      "research/methodology/reproducibility_review.md",
      "research/methodology/verdict_decision_tree.md",
      "research/methodology/research_quality_metrics.md",
      "research/methodology/methodology_version_history.json",
      "research/methodology/methodology_improvement_backlog.json",
      "research/methodology/research_program_health.md",
      "research/methodology/RESEARCH_METHODOLOGY_CALIBRATION_REPORT.md",
    ].forEach(mustFile);
    const hist = readJson("research/methodology/methodology_version_history.json");
    if (hist && hist.current_active_version !== "1.0") warn("Expected active methodology 1.0");
    const backlog = readJson("research/methodology/methodology_improvement_backlog.json");
    if (backlog) {
      for (const item of backlog.items || []) {
        if (!["Accepted", "Deferred", "Rejected"].includes(item.status)) {
          fail(`Backlog ${item.id} invalid status ${item.status}`);
        }
      }
      ok("methodology backlog statuses");
    }
  },

  corpus() {
    const dirs = [
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
    ];
    dirs.forEach(mustDir);
    [
      "research/corpus/source_registry.json",
      "research/corpus/topic_taxonomy.json",
      "research/corpus/contracts/evidence_object.contract.json",
      "research/corpus/author_registry.json",
      "research/corpus/institution_registry.json",
      "research/corpus/research_relationship_graph.json",
      "research/corpus/contradictory_evidence_registry.json",
      "research/corpus/standards/CANONICAL_CITATION_STANDARD.md",
      "research/corpus/standards/SOURCE_QUALITY_STANDARD.md",
      "research/corpus/research_coverage.md",
    ].forEach(mustFile);
    const corpus = readJson("research/corpus/source_registry.json");
    const dataSources = readJson("data/research/source_registry.json");
    const dataIds = new Set((dataSources?.sources || []).map((s) => s.source_id));
    uniqueIds(corpus?.sources, "source_id", "corpus sources");
    for (const s of corpus?.sources || []) {
      if (s.source_id?.startsWith("CC-SRC-") && !dataIds.has(s.source_id)) {
        fail(`Corpus source ${s.source_id} missing from data/research/source_registry.json`);
      }
    }
    const evidence = readJson("research/corpus/evidence/seed_evidence_objects.json");
    uniqueIds(evidence?.objects, "evidence_id", "evidence objects");
    for (const e of evidence?.objects || []) {
      if (!e.limitations) fail(`${e.evidence_id} missing limitations`);
    }
    ok("corpus integrity");
  },

  lcl() {
    const root = "research/living_community_laboratories";
    [
      `${root}/templates/LCL_TEMPLATE.md`,
      `${root}/contracts/community_profile.contract.json`,
      `${root}/contracts/community_systems_map.contract.json`,
      `${root}/registries/prosperity_engine_registry.json`,
      `${root}/comparative/comparative_methodology.md`,
      `${root}/scenarios/scenario_framework.md`,
      `${root}/metrics/community_metrics_registry.json`,
      `${root}/registries/community_relationship_graph.json`,
      `${root}/LCL_OPERATING_MANUAL.md`,
    ].forEach(mustFile);
    const engines = readJson(`${root}/registries/prosperity_engine_registry.json`);
    if (!engines?.engines?.length) fail("prosperity engines empty");
    else ok(`prosperity engines ${engines.engines.length}`);
  },

  pipeline() {
    mustDir("research_pipeline");
    [
      "research_pipeline/schemas/pipeline_stages.json",
      "research_pipeline/jobs/discovery_job_types.json",
      "research_pipeline/schemas/database_tables.json",
      "research_pipeline/review/review_queue.json",
      "research_pipeline/reports/PIPELINE_MANUAL.md",
    ].forEach(mustFile);
    const stages = readJson("research_pipeline/schemas/pipeline_stages.json");
    if (stages && stages.stages?.length !== 10) fail("pipeline must define 10 stages");
    else ok("pipeline 10 stages");
  },

  researchwatch() {
    mustDir("research_watch");
    [
      "research_watch/watch_registry.json",
      "research_watch/alerts/research_alert_queue.json",
      "research_watch/reports/research_timeline.json",
      "research_watch/change_detection/confidence_drift_framework.json",
      "research_watch/reports/CONTINUOUS_RESEARCH_WATCH_MANUAL.md",
    ].forEach(mustFile);
    const watches = readJson("research_watch/watch_registry.json");
    uniqueIds(watches?.watches, "watch_id", "watches");
    for (const w of watches?.watches || []) {
      if (w.proof_packet === "PP-FF-01" && !fs.existsSync(r("research/proof_packets/PP-FF-01"))) {
        fail("watch references missing PP-FF-01");
      }
    }
    ok("research watch");
  },

  graph() {
    mustDir("knowledge_graph");
    [
      "knowledge_graph/contracts/knowledge_node.contract.json",
      "knowledge_graph/contracts/relationship.contract.json",
      "knowledge_graph/registry/knowledge_graph_registry.json",
      "knowledge_graph/nodes/seed_nodes.json",
      "knowledge_graph/relationships/seed_relationships.json",
      "knowledge_graph/registry/node_types.json",
      "knowledge_graph/registry/relationship_types.json",
    ].forEach(mustFile);
    const nodes = readJson("knowledge_graph/nodes/seed_nodes.json");
    const rels = readJson("knowledge_graph/relationships/seed_relationships.json");
    const nodeIds = new Set((nodes?.nodes || []).map((n) => n.node_id));
    uniqueIds(nodes?.nodes, "node_id", "graph nodes");
    uniqueIds(rels?.relationships, "relationship_id", "graph relationships");
    for (const rel of rels?.relationships || []) {
      if (!nodeIds.has(rel.from_node)) fail(`broken from_node ${rel.from_node}`);
      if (!nodeIds.has(rel.to_node)) fail(`broken to_node ${rel.to_node}`);
      if (!(rel.evidence || []).length) warn(`relationship ${rel.relationship_id} has no evidence`);
    }
    ok("graph seed integrity");
  },

  synthesis() {
    mustDir("evidence_synthesis");
    [
      "evidence_synthesis/contracts/evidence_synthesis.contract.json",
      "evidence_synthesis/exports/evidence_matrix.json",
      "evidence_synthesis/conflicts/research_conflict_matrix.json",
      "evidence_synthesis/research_gaps/research_gap_registry.json",
      "evidence_synthesis/confidence/topic_confidence_registry.json",
      "evidence_synthesis/EVIDENCE_SYNTHESIS_MANUAL.md",
    ].forEach(mustFile);
    const gaps = readJson("evidence_synthesis/research_gaps/research_gap_registry.json");
    uniqueIds(gaps?.gaps, "id", "research gaps");
    ok("synthesis");
  },

  modeling() {
    mustDir("modeling");
    [
      "modeling/contracts/model.contract.json",
      "modeling/contracts/community_model.contract.json",
      "modeling/registries/variable_registry.json",
      "modeling/registries/assumption_registry.json",
      "modeling/registries/constraint_registry.json",
      "modeling/registries/model_registry.json",
      "modeling/sensitivity/sensitivity_framework.md",
      "modeling/validation/uncertainty_standard.md",
      "modeling/validation/model_validation.md",
      "modeling/SCENARIO_MODELING_LABORATORY_MANUAL.md",
    ].forEach(mustFile);
    const models = readJson("modeling/registries/model_registry.json");
    if (models?.models?.length) warn("models present while modeling honesty dial is 0% — ensure no invented results");
    ok("modeling framework");
  },

  observatory() {
    mustDir("observatory");
    [
      "observatory/registries/observatory_registry.json",
      "observatory/registries/domain_registry.json",
      "observatory/contracts/measurement.contract.json",
      "observatory/baselines/baseline_registry.json",
      "observatory/indices/index_registry.json",
      "observatory/DIGITAL_OBSERVATORY_MANUAL.md",
    ].forEach(mustFile);
    const baselines = readJson("observatory/baselines/baseline_registry.json");
    if ((baselines?.baselines || []).some((b) => b.value != null && !b.source)) {
      fail("baseline value without source");
    }
    ok("observatory");
  },

  researchops() {
    mustDir("research_operations");
    [
      "research_operations/missions/research_mission_registry.json",
      "research_operations/milestones/milestone_registry.json",
      "research_operations/priorities/priority_matrix.json",
      "research_operations/governance/execution_rule.md",
      "research_operations/RESEARCH_OPERATIONS_MANUAL.md",
    ].forEach(mustFile);
    const missions = readJson("research_operations/missions/research_mission_registry.json");
    uniqueIds(missions?.missions, "mission_id", "missions");
    ok("research ops");
  },

  history() {
    mustDir("institutional_history");
    [
      "institutional_history/contracts/intellectual_history.contract.json",
      "institutional_history/research_history/research_events.json",
      "institutional_history/debate_history/research_debate_registry.json",
      "institutional_history/confidence_history/confidence_history.json",
      "institutional_history/timelines/constitutional_research_timeline.md",
      "institutional_history/INSTITUTIONAL_HISTORY_MANUAL.md",
    ].forEach(mustFile);
    const events = readJson("institutional_history/research_history/research_events.json");
    uniqueIds(events?.events, "history_id", "history events");
    ok("institutional history");
  },

  foundations() {
    mustFile("data/project/research_institution_foundations.json");
    const f = readJson("data/project/research_institution_foundations.json");
    if (f?.pp_02_readiness !== "CONDITIONAL_GO") fail("pp_02_readiness must be CONDITIONAL_GO");
    if (f?.doctrine_changed || f?.principles_changed || f?.architecture_changed) {
      fail("foundations must not change doctrine/principles/architecture");
    }
    ok("foundations registry");
  },
};

const order = [
  "methodology",
  "corpus",
  "lcl",
  "pipeline",
  "researchwatch",
  "graph",
  "synthesis",
  "modeling",
  "observatory",
  "researchops",
  "history",
  "foundations",
];

const run = only === "all" ? order : [only];
for (const name of run) {
  if (!suites[name]) {
    fail(`Unknown suite ${name}`);
    continue;
  }
  console.log(`\n== ${name} ==`);
  suites[name]();
}

console.log(
  `\nResearch institution validation (${only}): ${errors.length ? "FAILED" : "PASSED"} (${warnings.length} warnings)`,
);
if (errors.length) process.exit(1);
