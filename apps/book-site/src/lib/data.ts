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

export type EconomicSystem = {
  id: string;
  slug: string;
  name: string;
  family: string;
  era: string;
  ownership_model: string;
  role_of_markets: string;
  role_of_government: string;
  private_property: string;
  labor_treatment: string;
  concentrated_power_approach: string;
  accountability_source: string;
  strengths: string[];
  risks: string[];
  relationship_to_cc: string;
  historical_exemplars: string[];
  neighbor_systems: string[];
  dossier_path: string;
  status: string;
};

export const FAMILY_ORDER = [
  "Historical",
  "Market-capitalist",
  "Coordinated-market",
  "Socialist",
  "Diagnostic",
  "Political-economic",
] as const;

export const principles = { principles: asList<Principle>(principlesRaw) };
export const comparison = { systems: asList<EconomicSystem>(comparisonRaw) };

export function comparisonBySlug(slug: string): EconomicSystem | undefined {
  return comparison.systems.find((s) => s.slug === slug);
}

export function comparisonGroupedByFamily(): { family: string; systems: EconomicSystem[] }[] {
  const map = new Map<string, EconomicSystem[]>();
  for (const s of comparison.systems) {
    const list = map.get(s.family) || [];
    list.push(s);
    map.set(s.family, list);
  }
  const ordered: { family: string; systems: EconomicSystem[] }[] = [];
  for (const family of FAMILY_ORDER) {
    const systems = map.get(family);
    if (systems?.length) ordered.push({ family, systems });
  }
  for (const [family, systems] of map) {
    if (!FAMILY_ORDER.includes(family as (typeof FAMILY_ORDER)[number])) {
      ordered.push({ family, systems });
    }
  }
  return ordered;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimal markdown → HTML for system dossiers (no invented content). */
export function simpleMarkdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inUl = false;
  let inOl = false;
  let inBq = false;
  let inTable = false;

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };
  const closeBq = () => {
    if (inBq) {
      out.push("</blockquote>");
      inBq = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      out.push("</tbody></table>");
      inTable = false;
    }
  };

  const inline = (s: string) => {
    let t = escapeHtml(s);
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return t;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|") && line.includes("|", 1)) {
      closeLists();
      closeBq();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const next = lines[i + 1] || "";
      const isSep = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(next);
      if (!inTable) {
        out.push('<table class="compare-dossier-table"><thead><tr>');
        for (const c of cells) out.push(`<th>${inline(c)}</th>`);
        out.push("</tr></thead><tbody>");
        inTable = true;
        if (isSep) {
          i += 2;
          continue;
        }
        i += 1;
        continue;
      }
      if (isSep) {
        i += 2;
        continue;
      }
      out.push("<tr>");
      for (const c of cells) out.push(`<td>${inline(c)}</td>`);
      out.push("</tr>");
      i += 1;
      continue;
    }
    closeTable();

    if (line.startsWith("> ")) {
      closeLists();
      if (!inBq) {
        out.push("<blockquote>");
        inBq = true;
      }
      out.push(`<p>${inline(line.slice(2))}</p>`);
      i += 1;
      continue;
    }
    closeBq();

    const hm = /^(#{1,3})\s+(.+)$/.exec(line);
    if (hm) {
      closeLists();
      const level = hm[1].length;
      const title = hm[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      out.push(`<h${level} id="${id}">${inline(title)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      closeLists();
      out.push("<hr />");
      i += 1;
      continue;
    }

    const ul = /^[-*]\s+(.+)$/.exec(line);
    if (ul) {
      closeBq();
      if (inOl) {
        out.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      i += 1;
      continue;
    }

    const ol = /^(\d+)\.\s+(.+)$/.exec(line);
    if (ol) {
      closeBq();
      if (inUl) {
        out.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inline(ol[2])}</li>`);
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeLists();
      i += 1;
      continue;
    }

    closeLists();
    out.push(`<p>${inline(line)}</p>`);
    i += 1;
  }

  closeLists();
  closeBq();
  closeTable();
  return out.join("\n");
}

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
