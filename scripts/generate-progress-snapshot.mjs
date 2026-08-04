import fs from "node:fs";
import { r } from "./lib/paths.mjs";

const layersDoc = JSON.parse(fs.readFileSync(r("data/metrics/progress_layers.json"), "utf8"));
const structure = JSON.parse(fs.readFileSync(r("data/manuscript/book_structure.json"), "utf8"));
const phases = JSON.parse(fs.readFileSync(r("data/project/phases.json"), "utf8"));
const milestones = JSON.parse(fs.readFileSync(r("data/metrics/project_milestones.json"), "utf8"));
const researchQ = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const claims = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const deployments = JSON.parse(
  fs.readFileSync(r("data/deployments/deployment_status.json"), "utf8")
);
const slices = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const decisions = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
const risks = JSON.parse(fs.readFileSync(r("data/project/risk_register.json"), "utf8"));

const chapters = structure.chapters || [];
const statusCounts = {};
for (const ch of chapters) {
  statusCounts[ch.status] = (statusCounts[ch.status] || 0) + 1;
}

const totalWords = chapters.reduce((s, c) => s + (c.current_word_count || 0), 0);
const targetWords = chapters.reduce((s, c) => s + (c.word_count_target || 0), 0);

const manuscriptPercent = Math.min(
  100,
  Math.round(((statusCounts.published || 0) * 100 + (statusCounts.drafting || 0) * 10) / Math.max(chapters.length, 1))
);

// Derive selected layers from evidence; keep honest floors/ceilings
const derived = {
  book_architecture: chapters.length >= 90 ? 90 : Math.round((chapters.length / 90) * 90),
  manuscript: Math.max(3, manuscriptPercent),
  research_foundation: researchQ.questions?.length ? 20 : 0,
  source_verification: (claims.claims || []).length === 0 ? 0 : 5,
  deployment_readiness: deployments.applications.every((a) => a.netlify_config) ? 50 : 20,
  project_governance: 85,
};

const layers = (layersDoc.layers || []).map((layer) => {
  const percent = derived[layer.id] != null ? derived[layer.id] : layer.percent;
  return {
    ...layer,
    percent,
    status:
      percent === 0 ? "not_started" : percent >= 80 ? "strong" : percent >= 30 ? "underway" : "early",
    last_updated: new Date().toISOString().slice(0, 10),
    basis: [
      ...(layer.basis || []),
      "generated_from_canonical_records",
    ].filter((v, i, a) => a.indexOf(v) === i),
  };
});

// Persist updated layer percents
layersDoc.layers = layers;
layersDoc.last_updated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(r("data/metrics/progress_layers.json"), JSON.stringify(layersDoc, null, 2) + "\n");

const overall = Math.round(layers.reduce((s, l) => s + l.percent, 0) / layers.length);

const snapshot = {
  version: "0.1.0",
  generated_at: new Date().toISOString(),
  overall_percent: overall,
  current_phase: phases.current_phase,
  active_slice: slices.active_slice,
  manuscript: {
    units: chapters.length,
    status_counts: statusCounts,
    current_word_count: totalWords,
    target_word_count: targetWords,
  },
  research: {
    open_questions: researchQ.questions?.length || 0,
    claims: claims.claims?.length || 0,
    sources: JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources
      .length,
  },
  decisions: {
    open: decisions.decisions.filter((d) => d.status === "open").length,
    approved: decisions.decisions.filter((d) => d.status === "approved").length,
  },
  risks: {
    open: risks.risks.filter((rsk) => rsk.status === "open").length,
    critical: risks.risks.filter((rsk) => rsk.severity === "critical").length,
  },
  milestones: milestones.milestones.map((m) => ({
    id: m.id,
    title: m.title,
    status: m.status,
  })),
  deployments: deployments.applications.map((a) => ({
    id: a.id,
    status: a.status,
    production_url: a.production_url,
  })),
  layers,
  note: "Dashboard must not be treated as source of truth. Canonical records live in data/.",
};

fs.writeFileSync(
  r("data/metrics/progress_snapshot.json"),
  JSON.stringify(snapshot, null, 2) + "\n"
);

fs.mkdirSync(r("data/generated"), { recursive: true });
fs.writeFileSync(
  r("data/generated/progress_snapshot_latest.json"),
  JSON.stringify(snapshot, null, 2) + "\n"
);

console.log("[OK] Progress snapshot generated");
console.log(`     Overall: ${overall}%`);
console.log(`     Chapters: ${chapters.length}`);
console.log(`     Open decisions: ${snapshot.decisions.open}`);
console.log(`     Open risks: ${snapshot.risks.open}`);
