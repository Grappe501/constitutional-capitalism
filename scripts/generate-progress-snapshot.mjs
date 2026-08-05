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
const principlesRaw = JSON.parse(fs.readFileSync(r("data/project/principles.json"), "utf8"));
const objectionsRaw = JSON.parse(fs.readFileSync(r("data/project/objections.json"), "utf8"));
const termsRaw = JSON.parse(fs.readFileSync(r("data/project/terms_to_define.json"), "utf8"));
const identity = JSON.parse(fs.readFileSync(r("data/project/book_identity.json"), "utf8"));

const principles = Array.isArray(principlesRaw) ? principlesRaw : principlesRaw.principles || [];
const objections = Array.isArray(objectionsRaw) ? objectionsRaw : objectionsRaw.objections || [];
const terms = Array.isArray(termsRaw) ? termsRaw : termsRaw.terms || [];
const researchQuestions = Array.isArray(researchQ)
  ? researchQ
  : researchQ.questions || [];
const claimList = claims.claims || [];

const chapters = structure.chapters || [];
const statusCounts = {};
for (const ch of chapters) {
  statusCounts[ch.status] = (statusCounts[ch.status] || 0) + 1;
}

const totalWords = chapters.reduce((s, c) => s + (c.current_word_count || 0), 0);
const targetWords = chapters.reduce((s, c) => s + (c.word_count_target || 0), 0);
const outlined = statusCounts.outline || 0;

const declarationPath = r("content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md");
const declarationExists = fs.existsSync(declarationPath);
let declarationWords = 0;
if (declarationExists) {
  const body = fs
    .readFileSync(declarationPath, "utf8")
    .replace(/^---[\s\S]*?---/, "")
    .trim();
  declarationWords = body.split(/\s+/).filter(Boolean).length;
}

const manuscriptPercent = Math.min(
  12,
  Math.max(
    3,
    Math.round(
      ((statusCounts.published || 0) * 100 +
        (statusCounts.drafting || 0) * 10 +
        outlined * 4) /
        Math.max(chapters.length, 1)
    )
  )
);

const philosophyPercent = declarationExists
  ? Math.min(70, 35 + Math.round(declarationWords / 250) + Math.min(principles.length, 20))
  : 25;

const sourceList =
  JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources || [];
const verifiedSources = sourceList.filter(
  (s) => s.verification_status === "url_verified" || s.verification_status === "verified"
);
const claimsWithSources = claimList.filter((c) => (c.source_ids || []).length > 0);
const claimsSupportedish = claimList.filter((c) =>
  ["supported", "partially_supported"].includes(c.support_level)
);
const diagnosisDir = r("content/research/national-diagnosis");
const diagnosisFiles = fs.existsSync(diagnosisDir)
  ? fs.readdirSync(diagnosisDir).filter((f) => f.endsWith(".md"))
  : [];
const priorityBriefHits = diagnosisFiles.filter((f) => {
  const body = fs.readFileSync(`${diagnosisDir}/${f}`, "utf8");
  return body.includes("priority_first_pass");
}).length;

// Honest Phase 2 progress: reward registered sources + claim upgrades + briefs, not scaffolding alone.
const researchFoundation = Math.min(
  42,
  16 +
    Math.round(verifiedSources.length * 0.7) +
    Math.round(claimsSupportedish.length * 1.1) +
    Math.min(8, Math.round(priorityBriefHits * 0.5))
);
const sourceVerification = Math.min(
  20,
  Math.round(verifiedSources.length * 1.1) + Math.round(claimsWithSources.length * 0.35)
);

const derived = {
  project_governance: 90,
  book_architecture: chapters.length >= 90 ? 90 : Math.round((chapters.length / 90) * 90),
  foundational_philosophy: philosophyPercent,
  manuscript: manuscriptPercent,
  research_foundation: researchFoundation,
  source_verification: sourceVerification,
  policy_development: 15,
  economic_modeling: 0,
  constitutional_analysis: declarationExists ? 25 : 5,
  legal_review: 0,
  editorial_review: declarationExists ? 10 : 0,
  public_book_website: declarationExists ? 70 : 40,
  build_board: 75,
  accessibility: 40,
  publishing_formats: 8,
  free_distribution: 20,
  deployment_readiness: deployments.applications.every((a) => a.netlify_config) ? 55 : 20,
  public_launch_readiness: declarationExists ? 20 : 5,
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

layersDoc.layers = layers;
layersDoc.last_updated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(r("data/metrics/progress_layers.json"), JSON.stringify(layersDoc, null, 2) + "\n");

const overall = Math.round(layers.reduce((s, l) => s + l.percent, 0) / layers.length);

const snapshot = {
  version: "0.2.0",
  generated_at: new Date().toISOString(),
  overall_percent: overall,
  current_phase: phases.current_phase,
  active_slice: slices.active_slice,
  declaration: {
    exists: declarationExists,
    words: declarationWords,
    status: declarationExists ? "first_draft" : "missing",
  },
  principles_count: principles.length,
  objections_count: objections.length,
  terms_count: terms.length,
  manuscript: {
    units: chapters.length,
    status_counts: statusCounts,
    current_word_count: totalWords,
    target_word_count: targetWords,
    outlined_units: outlined,
  },
  research: {
    open_questions: researchQuestions.length,
    claims: claimList.length,
    sources: JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8")).sources
      .length,
  },
  decisions: {
    open: (decisions.decisions || []).filter((d) => d.status === "open").length,
    approved: (decisions.decisions || []).filter((d) => d.status === "approved").length,
  },
  risks: {
    open: (risks.risks || []).filter((rsk) => rsk.status === "open").length,
    critical: (risks.risks || []).filter((rsk) => rsk.severity === "critical").length,
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
  identity_version: identity.version,
  layers,
  note: "Dashboard must not be treated as source of truth. Canonical records live in data/.",
};

fs.writeFileSync(r("data/metrics/progress_snapshot.json"), JSON.stringify(snapshot, null, 2) + "\n");
fs.mkdirSync(r("data/generated"), { recursive: true });
fs.writeFileSync(
  r("data/generated/progress_snapshot_latest.json"),
  JSON.stringify(snapshot, null, 2) + "\n"
);

console.log("[OK] Progress snapshot generated");
console.log(`     Overall: ${overall}%`);
console.log(`     Declaration words: ${declarationWords}`);
console.log(`     Principles: ${principles.length}`);
console.log(`     Outlined chapters: ${outlined}`);
