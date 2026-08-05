import identity from "../../../../data/project/book_identity.json";
import principlesRaw from "../../../../data/project/principles.json";
import structure from "../../../../data/manuscript/book_structure.json";
import snapshot from "../../../../data/metrics/progress_snapshot.json";
import updates from "../../../../data/project/updates.json";
import layers from "../../../../data/metrics/progress_layers.json";
import comparisonRaw from "../../../../data/project/economic_system_comparison.json";
import declarationSource from "../../../../content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md?raw";
import claims from "../../../../data/research/claim_ledger.json";
import sources from "../../../../data/research/source_registry.json";
import baselineMetrics from "../../../../data/baseline/national_baseline_metrics.json";
import baselineStatus from "../../../../data/baseline/baseline_status.json";
import baselineMethodology from "../../../../data/baseline/baseline_methodology.json";

type Principle = {
  id: string;
  title?: string;
  text?: string;
  statement?: string;
  explanation?: string;
  maturity_percent?: number;
  status?: string;
};

function asList<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of ["principles", "systems", "terms", "objections", "updates"]) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

export const principles = { principles: asList<Principle>(principlesRaw) };
export const comparison = { systems: asList<Record<string, unknown>>(comparisonRaw) };
export {
  identity,
  structure,
  snapshot,
  updates,
  layers,
  declarationSource,
  claims,
  sources,
  baselineMetrics,
  baselineStatus,
  baselineMethodology,
};

type Layer = { id: string; label: string; percent: number; status: string };

export function publicProgressLayers(): Layer[] {
  // Public status shows inventory + honesty dials (modeling/legal stay visible at 0%).
  const safeIds = [
    "project_governance",
    "book_architecture",
    "foundational_philosophy",
    "manuscript",
    "research_foundation",
    "source_verification",
    "policy_development",
    "economic_modeling",
    "legal_review",
    "public_book_website",
    "publishing_formats",
    "free_distribution",
    "public_launch_readiness",
  ];
  return ((layers.layers || []) as Layer[]).filter((l) => safeIds.includes(l.id));
}

export function chapterAvailability(status: string, publicStatus: string) {
  if (publicStatus === "available" || status === "published") return "available";
  if (["drafting", "draft_complete", "editing", "fact_check", "final", "outline"].includes(status)) {
    return "in_development";
  }
  return "planned";
}

export function parseDeclaration(raw: string) {
  const withoutFm = raw.replace(/^---[\s\S]*?---\n*/, "");
  const lines = withoutFm.split(/\r?\n/);
  const sections: { id: string; title: string; level: number; content: string[] }[] = [];
  let current: { id: string; title: string; level: number; content: string[] } | null = null;

  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      if (current) sections.push(current);
      const title = m[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      current = { id, title, level: m[1].length, content: [] };
    } else if (current) {
      current.content.push(line);
    }
  }
  if (current) sections.push(current);

  const body = withoutFm.trim();
  const words = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return { sections, words, minutes, body };
}
