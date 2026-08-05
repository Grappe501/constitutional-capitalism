import identity from "../../../../data/project/book_identity.json";
import structure from "../../../../data/manuscript/book_structure.json";
import snapshot from "../../../../data/metrics/progress_snapshot.json";
import layers from "../../../../data/metrics/progress_layers.json";
import phases from "../../../../data/project/phases.json";
import principlesRaw from "../../../../data/project/principles.json";
import pillars from "../../../../data/project/policy_pillars.json";
import proposals from "../../../../data/project/policy_proposals.json";
import articles from "../../../../data/project/constitutional_articles.json";
import decisions from "../../../../data/decisions/decisions.json";
import risks from "../../../../data/project/risk_register.json";
import deployments from "../../../../data/deployments/deployment_status.json";
import slices from "../../../../data/project/slice_queue.json";
import buildState from "../../../../data/project/current_build_state.json";
import cursorReturn from "../../../../data/project/latest_cursor_return.json";
import researchQuestionsRaw from "../../../../data/research/research_questions.json";
import claims from "../../../../data/research/claim_ledger.json";
import sources from "../../../../data/research/source_registry.json";
import factCheck from "../../../../data/research/fact_check_queue.json";
import expertReview from "../../../../data/research/expert_review_queue.json";
import milestones from "../../../../data/metrics/project_milestones.json";
import buildHistory from "../../../../data/metrics/build_history.json";
import openQuestionsRaw from "../../../../data/project/open_questions.json";
import objectionsRaw from "../../../../data/project/objections.json";
import config from "../../../../data/project/project_config.json";
import comparisonRaw from "../../../../data/project/economic_system_comparison.json";
import termsRaw from "../../../../data/project/terms_to_define.json";
import transitionScenarios from "../../../../data/project/transition_scenarios.json";
import predictions from "../../../../data/project/prediction_ledger.json";
import impactAssessments from "../../../../data/project/national_impact_assessments.json";
import threeBooks from "../../../../data/project/three_book_architecture.json";
import nationalBaseline from "../../../../data/project/national_baseline.json";
import ccTest from "../../../../data/project/constitutional_capitalism_test.json";
import chapterEvaluationTemplate from "../../../../data/project/chapter_evaluation_template.json";
import civilizationalCore from "../../../../data/project/civilizational_core.json";
import websiteIa from "../../../../data/project/website_information_architecture.json";
import baselineMetrics from "../../../../data/baseline/national_baseline_metrics.json";
import baselineStatus from "../../../../data/baseline/baseline_status.json";
import developingDoctrine from "../../../../data/project/developing_doctrine.json";
import transitionTimeline from "../../../../data/project/transition_timeline.json";

function asList<T>(value: unknown, key?: string): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object" && key) {
    const arr = (value as Record<string, unknown>)[key];
    if (Array.isArray(arr)) return arr as T[];
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const k of Object.keys(obj)) {
      if (Array.isArray(obj[k])) return obj[k] as T[];
    }
  }
  return [];
}

export const principles = { principles: asList(principlesRaw, "principles") };
export const objections = { objections: asList(objectionsRaw, "objections") };
export const researchQuestions = {
  questions: asList(researchQuestionsRaw, "questions"),
};
export const openQuestions = { questions: asList(openQuestionsRaw, "questions") };
export const comparison = { systems: asList(comparisonRaw, "systems") };
export const terms = { terms: asList(termsRaw, "terms") };

export {
  identity,
  structure,
  snapshot,
  layers,
  phases,
  pillars,
  proposals,
  articles,
  decisions,
  risks,
  deployments,
  slices,
  buildState,
  cursorReturn,
  claims,
  sources,
  factCheck,
  expertReview,
  milestones,
  buildHistory,
  config,
  transitionScenarios,
  predictions,
  impactAssessments,
  threeBooks,
  nationalBaseline,
  ccTest,
  chapterEvaluationTemplate,
  civilizationalCore,
  websiteIa,
  baselineMetrics,
  baselineStatus,
  developingDoctrine,
  transitionTimeline,
};

export function daysSince(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}
