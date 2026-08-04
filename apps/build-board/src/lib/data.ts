import identity from "../../../../data/project/book_identity.json";
import structure from "../../../../data/manuscript/book_structure.json";
import snapshot from "../../../../data/metrics/progress_snapshot.json";
import layers from "../../../../data/metrics/progress_layers.json";
import phases from "../../../../data/project/phases.json";
import principles from "../../../../data/project/principles.json";
import pillars from "../../../../data/project/policy_pillars.json";
import proposals from "../../../../data/project/policy_proposals.json";
import articles from "../../../../data/project/constitutional_articles.json";
import decisions from "../../../../data/decisions/decisions.json";
import risks from "../../../../data/project/risk_register.json";
import deployments from "../../../../data/deployments/deployment_status.json";
import slices from "../../../../data/project/slice_queue.json";
import buildState from "../../../../data/project/current_build_state.json";
import cursorReturn from "../../../../data/project/latest_cursor_return.json";
import researchQuestions from "../../../../data/research/research_questions.json";
import claims from "../../../../data/research/claim_ledger.json";
import sources from "../../../../data/research/source_registry.json";
import factCheck from "../../../../data/research/fact_check_queue.json";
import expertReview from "../../../../data/research/expert_review_queue.json";
import milestones from "../../../../data/metrics/project_milestones.json";
import buildHistory from "../../../../data/metrics/build_history.json";
import openQuestions from "../../../../data/project/open_questions.json";
import objections from "../../../../data/project/objections.json";
import config from "../../../../data/project/project_config.json";

export {
  identity,
  structure,
  snapshot,
  layers,
  phases,
  principles,
  pillars,
  proposals,
  articles,
  decisions,
  risks,
  deployments,
  slices,
  buildState,
  cursorReturn,
  researchQuestions,
  claims,
  sources,
  factCheck,
  expertReview,
  milestones,
  buildHistory,
  openQuestions,
  objections,
  config,
};

export function daysSince(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}
