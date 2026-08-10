#!/usr/bin/env node
/**
 * CC-EXISTING-CONTENT-DATA-EVIDENCE-DEEP-AUDIT-1.0
 *
 * Corpus-wide passage/claim audit → opportunity registry + RCIP demand manifest.
 * Governing question: what evidence would let a reader evaluate whether the statement
 * deserves to be believed? (CC-DEC-102/103/104)
 *
 * Does not invent statistics. Does not rewrite content. Does not build charts.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SLICE_ID = "CC-EXISTING-CONTENT-DATA-EVIDENCE-DEEP-AUDIT-1.0";
const GENERATED_AT = "2026-08-10";

const CLASSIFICATIONS = [
  "DATA ALREADY AVAILABLE",
  "PIPELINE RETRIEVABLE",
  "PRIMARY RESEARCH AVAILABLE",
  "DERIVED METRIC POSSIBLE",
  "HISTORICAL SERIES OPPORTUNITY",
  "GEOGRAPHIC COMPARISON OPPORTUNITY",
  "COUNTEREVIDENCE NEEDED",
  "DATA NOT AVAILABLE",
  "NORMATIVE — DATA NOT REQUIRED",
  "MODELING REQUIRED",
];

const VISUAL_FORMS = [
  "number_callout",
  "table",
  "line_chart",
  "bar_chart",
  "distribution",
  "scatterplot",
  "county_map",
  "national_map",
  "timeline",
  "sankey_flow",
  "comparison_matrix",
  "interactive_explorer",
];

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function writeJson(rel, obj) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function walkFiles(dirRel, exts) {
  const abs = path.join(ROOT, dirRel);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  const stack = [abs];
  while (stack.length) {
    const cur = stack.pop();
    for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
      const p = path.join(cur, ent.name);
      if (ent.isDirectory()) {
        if (["node_modules", ".git", ".local", "dist", ".astro"].includes(ent.name)) continue;
        stack.push(p);
      } else if (exts.some((e) => ent.name.endsWith(e))) {
        out.push(path.relative(ROOT, p).replace(/\\/g, "/"));
      }
    }
  }
  return out.sort();
}

function stripFrontmatter(md) {
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4);
  }
  return md;
}

function isPlaceholderChapter(md) {
  const body = stripFrontmatter(md);
  const bodyWords = body.split(/\s+/).filter(Boolean).length;
  // Outline/scaffold only — do not treat substantive drafts as placeholders merely because frontmatter word_count is 0
  if (/Status:\s*Outline brief/i.test(md) || /Phase-0 structural placeholder/i.test(md)) return true;
  if (/## Intended Argument/i.test(body) && /## Research Requirements/i.test(body) && bodyWords < 400) return true;
  if (bodyWords < 120 && /current_word_count:\s*0/.test(md)) return true;
  return false;
}

function splitSections(md) {
  const body = stripFrontmatter(md);
  const lines = body.split(/\r?\n/);
  const sections = [];
  let section = "Document";
  let buf = [];
  const flush = () => {
    const text = buf.join("\n").trim();
    if (text) sections.push({ section, text });
    buf = [];
  };
  for (const line of lines) {
    const h = line.match(/^#{1,3}\s+(.+)/);
    if (h) {
      flush();
      section = h[1].trim();
    } else {
      buf.push(line);
    }
  }
  flush();
  return sections;
}

function paragraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.length >= 40)
    .filter((p) => !/^[-*|]\s/.test(p) || p.length >= 80)
    .filter((p) => !/^>\s*\*\*Status/i.test(p));
}

const EMPIRICAL_RE =
  /\b(\d{1,3}(?:,\d{3})+(?:\.\d+)?%?|\d+(?:\.\d+)?%|percent|percentage|rate|share|median|mean|average|growth|declin\w+|increas\w+|concentrat\w+|inequalit\w+|poverty|wage|income|wealth|gdp|debt|unemploy\w+|homeownership|ownership|startup|business|census|bls|federal reserve|scf|dfa|bea|usda|acs|historical|trend|compared with|higher than|lower than|most|majority|few|scarce|widespread)\b/i;

const NORMATIVE_RE =
  /\b(should|ought|must|principle|we believe|moral|justice requires|freedom requires|dignity|sacred|right to)\b/i;

const MODELING_RE =
  /\b(would |counterfactual|simulate|model estimate|projected|forecast|multiplier|elasticity|if we )\b/i;

const COUNTRY_SYSTEM_RE =
  /\b(nordic|sweden|norway|denmark|china|ussr|soviet|cuba|venezuela|singapore|germany|japan|chile|yugoslavia|uk|britain|france)\b/i;

/** Topic → available CC baseline / pipeline hints */
const TOPIC_MAP = [
  {
    id: "wealth_concentration",
    re: /\b(wealth|net worth|ownership of capital|asset ownership|scf|dfa)\b/i,
    baseline: ["CC-IND-W01", "CC-IND-W02", "CC-IND-W03"],
    sources: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-011", "CC-SRC-012"],
    pipeline: [
      { agency: "Federal Reserve", dataset: "SCF / DFA", series: "household net worth levels and percentile shares", geography: "US", path: "official_machine_readable_file" },
    ],
    visuals: ["distribution", "line_chart", "number_callout", "comparison_matrix"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "homeownership",
    re: /\b(homeownership|housing equity|own(?:ing)? (?:a )?home|young adult ownership)\b/i,
    baseline: ["CC-IND-W04", "CC-IND-HC06"],
    sources: [],
    pipeline: [{ agency: "Census", dataset: "ACS / CPS", series: "homeownership rate by age", geography: "US/AR/county", path: "API" }],
    visuals: ["line_chart", "bar_chart", "county_map", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "wages_productivity",
    re: /\b(wage|productivity|compensation|real earnings|labor share)\b/i,
    baseline: ["CC-IND-L01", "CC-IND-L02"],
    sources: [],
    pipeline: [
      { agency: "BLS", dataset: "CPS / OEWS / Major Sector Productivity", series: "real wage and productivity indexes", geography: "US/AR", path: "API" },
    ],
    visuals: ["line_chart", "scatterplot", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "business_dynamics",
    re: /\b(startup|business survival|entry rate|exit rate|new entrants|establishment birth|entrepreneur)\b/i,
    baseline: ["CC-IND-B01", "CC-IND-B02", "CC-IND-C02"],
    sources: ["CC-SRC-261", "CC-SRC-262", "CC-SRC-263"],
    pipeline: [{ agency: "Census", dataset: "BDS", series: "ESTABS_ENTRY_RATE / EXIT_RATE / ENTRY", geography: "US/state", path: "API" }],
    visuals: ["line_chart", "bar_chart", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "concentration",
    re: /\b(market concentration|monopol\w+|oligopol\w+|HHI|antitrust|industry concentration)\b/i,
    baseline: ["CC-IND-C01", "CC-IND-C03"],
    sources: [],
    pipeline: [
      { agency: "Census", dataset: "Economic Census / Concentration ratios", series: "CR4/CR8/HHI where published", geography: "US", path: "official_machine_readable_file" },
      { agency: "DOJ", dataset: "ATR workload", series: "criminal cases filed", geography: "US", path: "official_workbook_table" },
    ],
    visuals: ["bar_chart", "table", "timeline", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "family_demographics",
    re: /\b(marriage|birth rate|fertility|child poverty|household savings|family formation)\b/i,
    baseline: ["CC-IND-F01", "CC-IND-F02", "CC-IND-F03", "CC-IND-F04"],
    sources: [],
    pipeline: [
      { agency: "Census/CDC/BLS", dataset: "ACS / NVSS / CPS", series: "marriage, fertility, child poverty, savings", geography: "US/AR", path: "API" },
    ],
    visuals: ["line_chart", "table", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "civic_political",
    re: /\b(voter|voting|turnout|campaign (?:finance|funding)|public trust|civic participation|political (?:power|capture|influence))\b/i,
    baseline: ["CC-IND-D03", "CC-IND-D04", "CC-IND-D10", "CC-IND-HC07"],
    sources: ["CC-SRC-264"],
    pipeline: [
      { agency: "Census", dataset: "CPS Voting and Registration", series: "voting rates by age", geography: "US", path: "official_workbook_table" },
      { agency: "FEC", dataset: "candidate receipts", series: "top-decile contribution share", geography: "US", path: "official_machine_readable_file" },
    ],
    visuals: ["bar_chart", "line_chart", "distribution", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "fiscal",
    re: /\b(government (?:revenue|spending|debt)|federal debt|deficit|taxation|tax burden|gdp share)\b/i,
    baseline: ["CC-IND-G01", "CC-IND-G02", "CC-IND-G03"],
    sources: [],
    pipeline: [{ agency: "BEA/Treasury/OMB/CBO", dataset: "NIPA / Fiscal", series: "revenue, spending, debt", geography: "US", path: "API" }],
    visuals: ["line_chart", "table", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "local_banking_capital",
    re: /\b(community bank|credit union|small-business lending|rural capital|CRA)\b/i,
    baseline: ["CC-IND-CM04", "CC-IND-B04", "CC-IND-E01", "CC-IND-E02"],
    sources: [],
    pipeline: [{ agency: "FDIC/Fed/FFIEC", dataset: "SOD / CRA", series: "community bank deposit and lending shares", geography: "US/AR/county", path: "official_machine_readable_file" }],
    visuals: ["county_map", "line_chart", "bar_chart"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "justice",
    re: /\b(incarcerat\w+|jail|pretrial|victimization|recidivism|asset forfeiture|court debt|public defense)\b/i,
    baseline: ["CC-IND-J01", "CC-IND-J02", "CC-IND-J03", "CC-IND-J06", "CC-IND-J07"],
    sources: [],
    pipeline: [{ agency: "BJS/DOJ", dataset: "NCVS / Corrections", series: "incarceration, victimization, recidivism", geography: "US/state", path: "official_machine_readable_file" }],
    visuals: ["bar_chart", "line_chart", "table", "number_callout"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "rural_community",
    re: /\b(rural|main street|hospital access|local ownership|community prosperity|county)\b/i,
    baseline: ["CC-IND-CM02", "CC-IND-CM01", "CC-IND-CM03", "CC-IND-B03"],
    sources: [],
    pipeline: [{ agency: "Census/USDA/HRSA", dataset: "ACS / ERS / Area Health", series: "rural population, access, establishments", geography: "US/AR/county", path: "API" }],
    visuals: ["county_map", "table", "bar_chart"],
    classification_if_sourced: "GEOGRAPHIC COMPARISON OPPORTUNITY",
  },
  {
    id: "innovation_manufacturing",
    re: /\b(patent|R&D|research spending|manufacturing|industrial base)\b/i,
    baseline: ["CC-IND-I01", "CC-IND-I03", "CC-IND-I04"],
    sources: [],
    pipeline: [{ agency: "USPTO/NSF/BEA", dataset: "Patents / R&D / GDP-by-industry", series: "patents, research, manufacturing share", geography: "US/state", path: "API" }],
    visuals: ["line_chart", "bar_chart", "national_map"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "health_access",
    re: /\b(primary care|mental health|health access|uninsured|life expectancy)\b/i,
    baseline: ["CC-IND-E05"],
    sources: [],
    pipeline: [{ agency: "HRSA/CDC/Census", dataset: "AHRF / BRFSS / ACS", series: "care access and coverage", geography: "US/AR/county", path: "API" }],
    visuals: ["county_map", "number_callout", "table"],
    classification_if_sourced: "DATA ALREADY AVAILABLE",
  },
  {
    id: "agriculture_food",
    re: /\b(farm|agriculture|food security|food hub|commodity|grain|feed|meatpacking)\b/i,
    baseline: [],
    sources: [],
    pipeline: [{ agency: "USDA", dataset: "NASS / ERS / FSA", series: "farm structure, concentration, prices", geography: "US/AR", path: "API" }],
    visuals: ["line_chart", "table", "county_map", "sankey_flow"],
    classification_if_sourced: "PRIMARY RESEARCH AVAILABLE",
  },
  {
    id: "inequality_mobility",
    re: /\b(inequality|mobility|opportunity|gini|intergenerational)\b/i,
    baseline: ["CC-IND-W02", "CC-IND-L04"],
    sources: [],
    pipeline: [
      { agency: "Census/Fed/Chetty-Opportunity Insights", dataset: "ACS / SCF / Opportunity Atlas", series: "income inequality and mobility", geography: "US/county", path: "official_machine_readable_file" },
    ],
    visuals: ["distribution", "scatterplot", "county_map", "line_chart"],
    classification_if_sourced: "PRIMARY RESEARCH AVAILABLE",
  },
  {
    id: "system_cross_country",
    re: /\b(social democracy|socialism|communism|nordic|mixed economy|laissez-faire|developmental state|state capitalism)\b/i,
    baseline: ["CC-IND-G01", "CC-IND-G02", "CC-IND-L01", "CC-IND-W02", "CC-IND-F03"],
    sources: [],
    pipeline: [
      { agency: "OECD/World Bank/IMF/national stats", dataset: "comparative,indicators", series: "growth, wages, inequality, poverty, tax/GDP — with non-experiment caveat", geography: "cross-national", path: "official_machine_readable_file" },
    ],
    visuals: ["comparison_matrix", "scatterplot", "table", "line_chart"],
    classification_if_sourced: "PRIMARY RESEARCH AVAILABLE",
    caveats: ["Countries are not controlled experiments for economic systems."],
  },
];

const SYSTEM_EMPIRICAL_DIMENSIONS = [
  { key: "growth", label: "Growth / living standards trajectory", series_hint: "real GDP per capita / consumption", visuals: ["line_chart", "comparison_matrix"] },
  { key: "wages", label: "Wages / compensation", series_hint: "real wages / labor share", visuals: ["line_chart", "bar_chart"] },
  { key: "inequality", label: "Inequality / distribution", series_hint: "Gini / top shares / poverty", visuals: ["distribution", "line_chart"] },
  { key: "ownership", label: "Ownership / capital concentration", series_hint: "wealth or firm ownership patterns", visuals: ["distribution", "table"] },
  { key: "government_size", label: "Government spending / taxation", series_hint: "tax/GDP, spending/GDP", visuals: ["bar_chart", "comparison_matrix"] },
  { key: "labor", label: "Labor participation / bargaining", series_hint: "LFPR, union density where relevant", visuals: ["line_chart", "table"] },
  { key: "poverty_mobility", label: "Poverty and mobility", series_hint: "poverty rate, mobility proxies", visuals: ["line_chart", "scatterplot"] },
  { key: "concentration", label: "Market / political concentration", series_hint: "industry concentration or capture proxies", visuals: ["bar_chart", "timeline"] },
  { key: "entrepreneurship", label: "Entrepreneurship / entry", series_hint: "business entry/exit where comparable", visuals: ["line_chart", "number_callout"] },
  { key: "fiscal_stability", label: "Fiscal stability", series_hint: "debt/deficit trajectories", visuals: ["line_chart", "table"] },
];

function matchTopics(text) {
  return TOPIC_MAP.filter((t) => t.re.test(text));
}

function statementType(text, surface) {
  if (MODELING_RE.test(text) && !/\b(observed|measured|reported)\b/i.test(text)) return "modeling_or_forecast";
  if (EMPIRICAL_RE.test(text) && /\b(is|are|was|were|has|have|shows?|showed|report)\b/i.test(text)) return "empirical_diagnosis";
  if (NORMATIVE_RE.test(text) && !EMPIRICAL_RE.test(text)) return "normative_judgment";
  if (surface.includes("systems/") || surface.includes("economic-system")) return "comparative_system_claim";
  if (EMPIRICAL_RE.test(text)) return "empirical_implication";
  return "explanatory_prose";
}

function classifyPassage({ text, type, topics, hasDisplayedEvidence, opposingMentioned }) {
  const tags = new Set();
  if (type === "normative_judgment") {
    tags.add("NORMATIVE — DATA NOT REQUIRED");
    return [...tags];
  }
  if (type === "modeling_or_forecast") {
    tags.add("MODELING REQUIRED");
  }
  const sourcedTopics = topics.filter((t) => (t.baseline || []).length && t.classification_if_sourced === "DATA ALREADY AVAILABLE");
  if (sourcedTopics.length && hasDisplayedEvidence) {
    tags.add("DATA ALREADY AVAILABLE");
    tags.add("HISTORICAL SERIES OPPORTUNITY");
  } else if (sourcedTopics.length) {
    tags.add("DATA ALREADY AVAILABLE");
  } else if (topics.some((t) => t.pipeline?.length)) {
    const t0 = topics[0];
    if (t0.classification_if_sourced === "PRIMARY RESEARCH AVAILABLE" || t0.id === "system_cross_country" || t0.id === "agriculture_food") {
      tags.add("PRIMARY RESEARCH AVAILABLE");
    } else {
      tags.add("PIPELINE RETRIEVABLE");
    }
  } else if (type === "empirical_diagnosis" || type === "empirical_implication" || type === "comparative_system_claim") {
    tags.add("PRIMARY RESEARCH AVAILABLE");
  } else if (type === "explanatory_prose") {
    tags.add("NORMATIVE — DATA NOT REQUIRED");
  }

  if (/\b(arkansas|county|rural|local)\b/i.test(text) || topics.some((t) => t.id === "rural_community")) {
    tags.add("GEOGRAPHIC COMPARISON OPPORTUNITY");
  }
  if (/\b(history|historical|decade|since 19|trend|over time)\b/i.test(text)) {
    tags.add("HISTORICAL SERIES OPPORTUNITY");
  }
  if (/\b(share|distribution|percentile|decile|gini)\b/i.test(text)) {
    tags.add("DERIVED METRIC POSSIBLE");
  }
  if (!opposingMentioned && (type === "empirical_diagnosis" || type.startsWith("empirical"))) {
    if (!/\b(however|although|contrary|caveat|not interchangeable|qualify)\b/i.test(text)) {
      tags.add("COUNTEREVIDENCE NEEDED");
    }
  }
  if (tags.size === 0) tags.add("DATA NOT AVAILABLE");
  return [...tags].filter((c) => CLASSIFICATIONS.includes(c));
}

function scoreOpportunity({ classifications, type, publicationProminence, reuse, central }) {
  const empirical = type.startsWith("empirical") || type === "comparative_system_claim" ? 1 : type === "modeling_or_forecast" ? 0.7 : 0.2;
  const weakness = classifications.includes("DATA ALREADY AVAILABLE") && classifications.includes("COUNTEREVIDENCE NEEDED")
    ? 0.7
    : classifications.includes("DATA ALREADY AVAILABLE")
      ? 0.55
      : classifications.includes("PIPELINE RETRIEVABLE") || classifications.includes("PRIMARY RESEARCH AVAILABLE")
        ? 0.85
        : classifications.includes("MODELING REQUIRED")
          ? 0.5
          : 0.3;
  const retrievability = classifications.includes("DATA ALREADY AVAILABLE")
    ? 1
    : classifications.includes("PIPELINE RETRIEVABLE")
      ? 0.85
      : classifications.includes("PRIMARY RESEARCH AVAILABLE")
        ? 0.55
        : classifications.includes("MODELING REQUIRED") || classifications.includes("DATA NOT AVAILABLE")
          ? 0.15
          : 0.4;
  const importance = central ? 1 : empirical;
  const raw = importance * weakness * publicationProminence * retrievability * reuse;
  return Math.round(raw * 1000) / 1000;
}

function priorityBand(score) {
  if (score >= 0.45) return "HIGH";
  if (score >= 0.25) return "MEDIUM";
  return "LOW";
}

let seq = 0;
function nextId(prefix = "CDE") {
  seq += 1;
  return `${prefix}-${String(seq).padStart(4, "0")}`;
}

const opportunities = [];
const filesAudited = [];
const passageStats = { files: 0, sections: 0, paragraphs_scanned: 0, substantive_passages: 0, skipped_placeholder_chapters: 0 };

function addOpportunity(o) {
  const id = o.content_id || nextId();
  const rec = {
    content_id: id,
    file: o.file,
    surface_class: o.surface_class,
    section: o.section,
    existing_statement: o.existing_statement.slice(0, 500),
    statement_type: o.statement_type,
    evidence_currently_displayed: o.evidence_currently_displayed || "None detected in passage",
    available_evidence: o.available_evidence || [],
    additional_data_opportunity: o.additional_data_opportunity || [],
    recommended_presentation: o.recommended_presentation || [],
    contrary_qualifying_data: o.contrary_qualifying_data || [],
    classifications: o.classifications,
    publication_surfaces: o.publication_surfaces || [],
    reuse_targets: o.reuse_targets || [],
    rcip_series_demand: o.rcip_series_demand || [],
    caveats: o.caveats || [],
    priority_score: o.priority_score,
    priority: o.priority,
    audit_method: o.audit_method || "heuristic_passage",
  };
  opportunities.push(rec);
  return rec;
}

function prominenceFor(surfaceClass, file) {
  if (surfaceClass === "claim_ledger") return 1;
  if (surfaceClass === "national_diagnosis") return 0.95;
  if (surfaceClass === "manuscript_draft") return 0.95;
  if (surfaceClass === "economic_system") return 0.9;
  if (surfaceClass === "theory_framework") return 0.85;
  if (surfaceClass === "public_reasoning") return 0.8;
  if (surfaceClass === "sectoral_dossier") return 0.85;
  if (surfaceClass === "proof_packet") return 0.8;
  if (surfaceClass === "principle_doctrine") return 0.75;
  if (surfaceClass === "lcl_community") return 0.7;
  if (surfaceClass === "manuscript_outline") return 0.45;
  if (file.includes("compare")) return 0.9;
  return 0.6;
}

function reusePotential(topics, surfaceClass) {
  let r = 0.5;
  if (topics.length >= 2) r += 0.15;
  if (topics.some((t) => ["wealth_concentration", "wages_productivity", "concentration", "civic_political"].includes(t.id))) r += 0.2;
  if (["claim_ledger", "national_diagnosis", "economic_system", "theory_framework"].includes(surfaceClass)) r += 0.1;
  return Math.min(1, r);
}

function extractRefs(text) {
  const claims = [...text.matchAll(/CC-CLAIM-\d+/g)].map((m) => m[0]);
  const inds = [...text.matchAll(/CC-IND-[A-Z0-9]+/g)].map((m) => m[0]);
  const srcs = [...text.matchAll(/CC-SRC-\d+/g)].map((m) => m[0]);
  return {
    claims: [...new Set(claims)],
    inds: [...new Set(inds)],
    srcs: [...new Set(srcs)],
  };
}

function auditMarkdownFile(file, surfaceClass) {
  const abs = path.join(ROOT, file);
  const md = fs.readFileSync(abs, "utf8");
  filesAudited.push(file);
  passageStats.files += 1;

  const placeholder = surfaceClass.startsWith("manuscript") && isPlaceholderChapter(md);
  if (placeholder) {
    passageStats.skipped_placeholder_chapters += 1;
    surfaceClass = "manuscript_outline";
    const refs = extractRefs(md);
    if (refs.claims.length || /Factual Claims|Research Requirements|Intended Argument/i.test(md)) {
      const topics = matchTopics(md);
      const classifications = refs.claims.length
        ? ["PRIMARY RESEARCH AVAILABLE", "DATA ALREADY AVAILABLE"].filter(Boolean)
        : ["NORMATIVE — DATA NOT REQUIRED"];
      // Outline: register intended empirical work, not fake paragraph density
      const statement = (md.match(/summary:\s*"([^"]+)"/) || [])[1] || `Outline chapter pending draft: ${path.basename(file)}`;
      const score = scoreOpportunity({
        classifications: refs.claims.length ? ["PIPELINE RETRIEVABLE", "COUNTEREVIDENCE NEEDED"] : ["NORMATIVE — DATA NOT REQUIRED"],
        type: refs.claims.length ? "empirical_diagnosis" : "normative_judgment",
        publicationProminence: prominenceFor(surfaceClass, file),
        reuse: 0.4,
        central: false,
      });
      addOpportunity({
        file,
        surface_class: surfaceClass,
        section: "Outline / intended claims",
        existing_statement: statement,
        statement_type: refs.claims.length ? "empirical_diagnosis" : "normative_judgment",
        evidence_currently_displayed: "Outline only — no drafted empirical presentation",
        available_evidence: [...refs.inds, ...refs.srcs, ...refs.claims],
        additional_data_opportunity: topics.flatMap((t) => t.pipeline || []),
        recommended_presentation: topics.flatMap((t) => t.visuals || []).slice(0, 4),
        classifications: refs.claims.length
          ? ["PIPELINE RETRIEVABLE", "HISTORICAL SERIES OPPORTUNITY", "COUNTEREVIDENCE NEEDED"]
          : ["NORMATIVE — DATA NOT REQUIRED"],
        publication_surfaces: ["book_chapter_future"],
        reuse_targets: ["baseline_dashboard", "book_chapter"],
        rcip_series_demand: topics.flatMap((t) => t.pipeline || []),
        priority_score: score,
        priority: priorityBand(score),
        audit_method: "manuscript_outline_intent",
      });
    }
    return;
  }

  const sections = splitSections(md);
  for (const { section, text } of sections) {
    passageStats.sections += 1;
    // Skip pure meta/status sections for opportunity spam
    if (/^(Status|Dependencies|Editorial Note|Supporting Principles|Stable ID)/i.test(section)) continue;

    const paras = paragraphs(text);
    for (const p of paras) {
      passageStats.paragraphs_scanned += 1;
      const type = statementType(p, file);
      const refs = extractRefs(p + "\n" + section);
      const topics = matchTopics(p);
      const hasEvidence = refs.srcs.length > 0 || refs.inds.length > 0 || /`CC-SRC-|\(\d{4}\)|\$[\d,]+|\d+\.\d+%/.test(p);
      const opposing = /contrary|however|although|caveat|qualify|not enough evidence|missing evidence/i.test(p) || /Contrary|Missing evidence/i.test(section);

      // Keep substantive: empirical, claim-linked, system comparative, modeling, or diagnosis missing-evidence
      const substantive =
        type.startsWith("empirical") ||
        type === "modeling_or_forecast" ||
        type === "comparative_system_claim" ||
        refs.claims.length > 0 ||
        /MISSING EVIDENCE|What the data|Current findings|Central question/i.test(section) ||
        (topics.length > 0 && type !== "explanatory_prose") ||
        (type === "normative_judgment" && prominenceFor(surfaceClass, file) >= 0.85);

      if (!substantive) continue;
      // Drop pure boilerplate disclaimers
      if (/Developing analytical tool|No invented statistics|Phase 1 comparative instrument/i.test(p) && topics.length === 0) continue;

      passageStats.substantive_passages += 1;
      const classifications = classifyPassage({
        text: p,
        type,
        topics,
        hasDisplayedEvidence: hasEvidence,
        opposingMentioned: opposing,
      });

      // If diagnosis marks MISSING EVIDENCE, force primary/pipeline
      if (/MISSING EVIDENCE/i.test(section) || /MISSING EVIDENCE/i.test(p)) {
        if (!classifications.includes("DATA ALREADY AVAILABLE")) {
          classifications.length = 0;
          classifications.push("PRIMARY RESEARCH AVAILABLE", "COUNTEREVIDENCE NEEDED");
        } else {
          classifications.push("COUNTEREVIDENCE NEEDED");
        }
      }

      const pub = prominenceFor(surfaceClass, file);
      const reuse = reusePotential(topics, surfaceClass);
      const central = /Central question|Current findings|What the data|Definition of|Central Proposition/i.test(section) || refs.claims.length > 0;
      const score = scoreOpportunity({
        classifications,
        type,
        publicationProminence: pub,
        reuse,
        central,
      });

      const available = [];
      for (const t of topics) {
        for (const b of t.baseline || []) available.push(`CC baseline ${b}`);
        for (const s of t.sources || []) available.push(s);
      }
      for (const x of refs.inds) available.push(`CC baseline ${x}`);
      for (const x of refs.srcs) available.push(x);
      for (const x of refs.claims) available.push(x);

      const demand = topics.flatMap((t) => t.pipeline || []);
      const visuals = [...new Set(topics.flatMap((t) => t.visuals || []))];
      if (!visuals.length) {
        if (classifications.includes("HISTORICAL SERIES OPPORTUNITY")) visuals.push("line_chart");
        if (classifications.includes("GEOGRAPHIC COMPARISON OPPORTUNITY")) visuals.push("county_map");
        visuals.push("number_callout", "table");
      }

      const contrary = [];
      if (classifications.includes("COUNTEREVIDENCE NEEDED")) {
        contrary.push("Seek contrary/qualifying series before hardening the public wording (CC-DEC-102/103).");
      }
      if (topics.some((t) => t.id === "system_cross_country") || COUNTRY_SYSTEM_RE.test(p)) {
        contrary.push("Countries are not controlled experiments for economic systems — show selection effects and institutional hybrids.");
      }

      addOpportunity({
        file,
        surface_class: surfaceClass,
        section,
        existing_statement: p,
        statement_type: type,
        evidence_currently_displayed: hasEvidence ? `Inline refs/numbers detected (${[...refs.srcs, ...refs.inds].slice(0, 6).join(", ") || "numeric"})` : "None",
        available_evidence: [...new Set(available)].slice(0, 12),
        additional_data_opportunity: demand.slice(0, 6),
        recommended_presentation: visuals.filter((v) => VISUAL_FORMS.includes(v)).slice(0, 5),
        contrary_qualifying_data: contrary,
        classifications: [...new Set(classifications)],
        publication_surfaces: [surfaceClass, ...topics.map((t) => t.id)],
        reuse_targets: [
          "baseline_dashboard",
          surfaceClass,
          ...(topics.some((t) => t.id === "wealth_concentration") ? ["ownership_principle", "public_reasoning", "economic_system_comparison"] : []),
          ...(topics.some((t) => t.id === "wages_productivity") ? ["labor_theory", "book_chapters"] : []),
        ],
        rcip_series_demand: demand,
        caveats: topics.flatMap((t) => t.caveats || []),
        priority_score: score,
        priority: priorityBand(score),
        audit_method: "heuristic_passage",
      });
    }
  }
}

/** Claim ledger: first-class audit units */
function auditClaims(baselineById) {
  const ledger = readJson("data/research/claim_ledger.json");
  const claims = ledger.claims || [];
  for (const claim of claims) {
    const text = claim.claim_text || claim.public_wording || "";
    const topics = matchTopics(text);
    const support = (claim.support_level || claim.evidence_strength || "").toString().toLowerCase();
    const hasSources = (claim.source_ids || []).length > 0;
    const opposing = (claim.opposing_evidence || []).length > 0;
    const classifications = [];
    if (claim.epistemic_class === "normative" || claim.claim_class === "normative") {
      classifications.push("NORMATIVE — DATA NOT REQUIRED");
    } else if (/model|forecast|counterfactual/i.test(claim.claim_type || "") || /would /i.test(text)) {
      classifications.push("MODELING REQUIRED");
    } else if (hasSources && topics.some((t) => t.baseline?.some((b) => baselineById[b]?.status === "sourced"))) {
      classifications.push("DATA ALREADY AVAILABLE");
      if (!opposing) classifications.push("COUNTEREVIDENCE NEEDED");
      classifications.push("HISTORICAL SERIES OPPORTUNITY");
      classifications.push("GEOGRAPHIC COMPARISON OPPORTUNITY");
    } else if (topics.some((t) => t.pipeline?.length)) {
      classifications.push(topics[0].classification_if_sourced === "PRIMARY RESEARCH AVAILABLE" ? "PRIMARY RESEARCH AVAILABLE" : "PIPELINE RETRIEVABLE");
      if (!opposing) classifications.push("COUNTEREVIDENCE NEEDED");
    } else {
      classifications.push("PRIMARY RESEARCH AVAILABLE");
      if (!opposing) classifications.push("COUNTEREVIDENCE NEEDED");
    }

    const score = scoreOpportunity({
      classifications,
      type: classifications.includes("MODELING REQUIRED") ? "modeling_or_forecast" : "empirical_diagnosis",
      publicationProminence: claim.importance === "critical" || claim.importance === "high" ? 1 : 0.85,
      reuse: reusePotential(topics, "claim_ledger"),
      central: true,
    });

    addOpportunity({
      content_id: nextId("CDE-CL"),
      file: "data/research/claim_ledger.json",
      surface_class: "claim_ledger",
      section: claim.claim_id,
      existing_statement: text,
      statement_type: classifications.includes("NORMATIVE — DATA NOT REQUIRED")
        ? "normative_judgment"
        : classifications.includes("MODELING REQUIRED")
          ? "modeling_or_forecast"
          : "empirical_diagnosis",
      evidence_currently_displayed: hasSources ? `source_ids: ${(claim.source_ids || []).slice(0, 8).join(", ")}` : "None / thin",
      available_evidence: [...(claim.source_ids || []), ...topics.flatMap((t) => t.baseline || []).map((b) => `CC baseline ${b}`)],
      additional_data_opportunity: topics.flatMap((t) => t.pipeline || []),
      recommended_presentation: [...new Set(topics.flatMap((t) => t.visuals || ["number_callout", "table"]))].slice(0, 5),
      contrary_qualifying_data: opposing
        ? ["Opposing evidence already registered — surface it on publication pages."]
        : ["Register and display contrary/qualifying evidence before publication hardening."],
      classifications: [...new Set(classifications)],
      publication_surfaces: ["claim_ledger", ...(claim.chapter_ids || []), ...(claim.public_reasoning_ids || [])],
      reuse_targets: ["baseline_dashboard", "book_chapters", "public_reasoning", "theory_pages", "economic_system_comparison"],
      rcip_series_demand: topics.flatMap((t) => t.pipeline || []),
      priority_score: score,
      priority: priorityBand(score),
      audit_method: "claim_ledger_unit",
    });
  }
}

/** Economic systems: dimension matrix opportunities (special attention) */
function auditEconomicSystems() {
  const systems = walkFiles("content/public-resources/systems", [".md"]);
  for (const file of systems) {
    filesAudited.push(file);
    passageStats.files += 1;
    const md = fs.readFileSync(path.join(ROOT, file), "utf8");
    // Still run passage audit for existing prose
    auditMarkdownFile(file, "economic_system");
    // Deduplicate: auditMarkdownFile already pushed file — remove double count
    // Actually auditMarkdownFile increments files again. Fix by not calling both ways.
  }
}

function auditEconomicSystemsDimensions() {
  const systems = walkFiles("content/public-resources/systems", [".md"]);
  for (const file of systems) {
    const slug = path.basename(file, ".md");
    const md = fs.readFileSync(path.join(ROOT, file), "utf8");
    const name = (md.match(/^#\s+(.+)/m) || [, slug])[1];
    const hasStats = /\$\d|\d+\.\d+%|\b\d{4}\b.*\b(percent|rate|GDP)\b/i.test(md);
    for (const dim of SYSTEM_EMPIRICAL_DIMENSIONS) {
      const classifications = [
        "PRIMARY RESEARCH AVAILABLE",
        "HISTORICAL SERIES OPPORTUNITY",
        "GEOGRAPHIC COMPARISON OPPORTUNITY",
        "COUNTEREVIDENCE NEEDED",
      ];
      if (!hasStats) classifications.unshift("PIPELINE RETRIEVABLE");
      const score = scoreOpportunity({
        classifications,
        type: "comparative_system_claim",
        publicationProminence: 0.9,
        reuse: 0.85,
        central: dim.key === "ownership" || dim.key === "inequality" || dim.key === "concentration",
      });
      addOpportunity({
        content_id: nextId("CDE-SYS"),
        file,
        surface_class: "economic_system",
        section: `Empirical dimension: ${dim.label}`,
        existing_statement: `${name} dossier currently states conceptual/historical claims about ${dim.label.toLowerCase()} without a structured evidence panel. ${hasStats ? "Some numbers may appear elsewhere on page." : "No empirical magnitudes established on this page."}`,
        statement_type: "comparative_system_claim",
        evidence_currently_displayed: hasStats ? "Sparse/partial numeric mentions possible" : "None",
        available_evidence: ["CC-DEC-104 Evidence Panel schema", "Shared comparison dimensions in economic_system_comparison.json"],
        additional_data_opportunity: [
          {
            agency: "OECD/World Bank/IMF/national statistical offices",
            dataset: "comparative indicators",
            series: dim.series_hint,
            geography: "exemplar countries only, with hybrid caveat",
            path: "official_machine_readable_file",
            baseline_fit: "supporting_comparison_not_baseline_slot",
          },
        ],
        recommended_presentation: dim.visuals.concat(["comparison_matrix"]),
        contrary_qualifying_data: [
          "Countries are not controlled experiments for economic systems.",
          "Prefer institutional-pattern evidence over 'Country X proves System Y'.",
          "Show hybrid real-world mixtures and selection effects.",
        ],
        classifications: [...new Set(classifications)],
        publication_surfaces: ["compare", `compare/${slug}`, "economic_system_comparison", "theory_pages"],
        reuse_targets: ["economic_system_comparison", "book_chapters", "public_reasoning", "baseline_dashboard"],
        rcip_series_demand: [
          {
            agency: "OECD/World Bank/national",
            dataset: "system-comparison-panel",
            series: `${slug}:${dim.key}:${dim.series_hint}`,
            geography: "exemplars",
            path: "official_machine_readable_file",
          },
        ],
        caveats: ["Countries are not controlled experiments for economic systems."],
        priority_score: score,
        priority: priorityBand(score),
        audit_method: "system_dimension_matrix",
      });
    }
  }
}

function auditFrameworks() {
  const files = walkFiles("data/project", [".json"]).filter((f) => f.endsWith("_framework.json"));
  for (const file of files) {
    filesAudited.push(file);
    passageStats.files += 1;
    const data = readJson(file);
    const blobs = [];
    const walk = (v, trail) => {
      if (typeof v === "string" && v.length >= 60) blobs.push({ trail, text: v });
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${trail}[${i}]`));
      else if (v && typeof v === "object") {
        for (const [k, val] of Object.entries(v)) {
          if (["id", "version", "last_updated", "slug"].includes(k)) continue;
          walk(val, trail ? `${trail}.${k}` : k);
        }
      }
    };
    walk(data, "");
    for (const { trail, text } of blobs) {
      const type = statementType(text, file);
      if (type === "explanatory_prose" && !EMPIRICAL_RE.test(text)) continue;
      if (!EMPIRICAL_RE.test(text) && !MODELING_RE.test(text) && type !== "normative_judgment") continue;
      passageStats.substantive_passages += 1;
      const topics = matchTopics(text);
      const classifications = classifyPassage({
        text,
        type,
        topics,
        hasDisplayedEvidence: false,
        opposingMentioned: false,
      });
      const score = scoreOpportunity({
        classifications,
        type,
        publicationProminence: 0.85,
        reuse: reusePotential(topics, "theory_framework"),
        central: /core|thesis|claim|diagnosis/i.test(trail),
      });
      addOpportunity({
        file,
        surface_class: "theory_framework",
        section: trail.slice(0, 120),
        existing_statement: text,
        statement_type: type,
        evidence_currently_displayed: "Framework JSON — typically not yet Evidence-Panel bound on site",
        available_evidence: topics.flatMap((t) => (t.baseline || []).map((b) => `CC baseline ${b}`)),
        additional_data_opportunity: topics.flatMap((t) => t.pipeline || []),
        recommended_presentation: [...new Set(topics.flatMap((t) => t.visuals || ["number_callout"]))].slice(0, 5),
        contrary_qualifying_data: classifications.includes("COUNTEREVIDENCE NEEDED")
          ? ["Surface contrary evidence in the public Evidence Panel for this framework page."]
          : [],
        classifications,
        publication_surfaces: ["book-site theory page", path.basename(file, ".json")],
        reuse_targets: ["theory_pages", "baseline_dashboard", "public_reasoning"],
        rcip_series_demand: topics.flatMap((t) => t.pipeline || []),
        priority_score: score,
        priority: priorityBand(score),
        audit_method: "framework_string_unit",
      });
    }
  }
}

function main() {
  const baseline = readJson("data/baseline/national_baseline_metrics.json");
  const baselineById = Object.fromEntries((baseline.metrics || []).map((m) => [m.metric_id, m]));

  // 1) Claims
  auditClaims(baselineById);

  // 2) Manuscript — index-driven intents only (corpus is still outline/concept scaffolds; avoid template noise)
  const chaptersIndex = readJson("data/manuscript/chapters_index.json");
  for (const ch of chaptersIndex.chapters || []) {
    const file = ch.file;
    if (!file || !fs.existsSync(path.join(ROOT, file))) continue;
    filesAudited.push(file);
    passageStats.files += 1;
    passageStats.skipped_placeholder_chapters += 1;
    const md = fs.readFileSync(path.join(ROOT, file), "utf8");
    const refs = extractRefs(md);
    const topics = matchTopics(`${ch.title} ${ch.summary || ""} ${(ch.core_claims || []).join(" ")}`);
    const hasClaims = (ch.core_claims || []).length > 0 || refs.claims.length > 0;
    const classifications = hasClaims
      ? ["PIPELINE RETRIEVABLE", "HISTORICAL SERIES OPPORTUNITY", "COUNTEREVIDENCE NEEDED"]
      : ["NORMATIVE — DATA NOT REQUIRED"];
    if (topics.some((t) => t.id === "rural_community")) classifications.push("GEOGRAPHIC COMPARISON OPPORTUNITY");
    const score = scoreOpportunity({
      classifications,
      type: hasClaims ? "empirical_diagnosis" : "normative_judgment",
      publicationProminence: 0.55,
      reuse: 0.45,
      central: hasClaims,
    });
    addOpportunity({
      content_id: nextId("CDE-CH"),
      file,
      surface_class: "manuscript_outline",
      section: `${ch.chapter_id} / ${ch.status}`,
      existing_statement: ch.summary || `Chapter intent: ${ch.title}`,
      statement_type: hasClaims ? "empirical_diagnosis" : "normative_judgment",
      evidence_currently_displayed: "Manuscript unit is outline/concept scaffold — no finished empirical presentation",
      available_evidence: [...(ch.core_claims || []), ...refs.inds, ...refs.srcs],
      additional_data_opportunity: topics.flatMap((t) => t.pipeline || []),
      recommended_presentation: [...new Set(topics.flatMap((t) => t.visuals || ["number_callout", "table"]))].slice(0, 5),
      contrary_qualifying_data: hasClaims
        ? ["When drafting, bind Evidence Panel before hardening empirical wording (CC-DEC-104)."]
        : [],
      classifications: [...new Set(classifications)],
      publication_surfaces: ["book_chapter_future", ch.chapter_id],
      reuse_targets: ["book_chapters", "baseline_dashboard", "theory_pages"],
      rcip_series_demand: topics.flatMap((t) => t.pipeline || []),
      priority_score: score,
      priority: priorityBand(score),
      audit_method: "manuscript_outline_intent",
    });
  }

  // 3) Diagnosis
  for (const file of walkFiles("content/research/national-diagnosis", [".md"])) {
    if (file.endsWith("DIAGNOSIS_BRIEF_STANDARD.md")) continue;
    auditMarkdownFile(file, "national_diagnosis");
  }

  // 4) Economic systems — prose + dimension matrix
  // Avoid double file counting: prose via walk, then dimensions separately without re-prose
  const systemFiles = walkFiles("content/public-resources/systems", [".md"]);
  for (const file of systemFiles) {
    // custom prose audit without using auditEconomicSystems()
    const abs = path.join(ROOT, file);
    const md = fs.readFileSync(abs, "utf8");
    filesAudited.push(file);
    passageStats.files += 1;
    for (const { section, text } of splitSections(md)) {
      passageStats.sections += 1;
      if (/Status|fairness disclaimer/i.test(section)) continue;
      for (const p of paragraphs(text)) {
        passageStats.paragraphs_scanned += 1;
        const type = statementType(p, file);
        const topics = matchTopics(p);
        if (type === "explanatory_prose" && topics.length === 0 && !/Definition|functions|weaknesses|adherents|Historical/i.test(section)) continue;
        if (/Developing analytical tool|No invented statistics|Descriptive fairness|reported claims, not project|^\*\*ID:\*\*|Keep clearly labeled|Matrix:\s*\[/i.test(p)) continue;
        if (/^\| Dimension \| Summary \|/i.test(p)) continue;
        passageStats.substantive_passages += 1;
        const classifications = classifyPassage({
          text: p,
          type: type === "explanatory_prose" ? "comparative_system_claim" : type,
          topics,
          hasDisplayedEvidence: /\$\d|\d+%/.test(p),
          opposingMentioned: /weakness|failure|risk/i.test(section),
        });
        if (!classifications.includes("COUNTEREVIDENCE NEEDED") && /strength|claim|adherent/i.test(section)) {
          classifications.push("COUNTEREVIDENCE NEEDED");
        }
        const score = scoreOpportunity({
          classifications,
          type: "comparative_system_claim",
          publicationProminence: 0.9,
          reuse: 0.8,
          central: /Definition|functions|weaknesses/i.test(section),
        });
        addOpportunity({
          file,
          surface_class: "economic_system",
          section,
          existing_statement: p,
          statement_type: "comparative_system_claim",
          evidence_currently_displayed: /\$\d|\d+%/.test(p) ? "Numeric mention" : "None",
          available_evidence: topics.flatMap((t) => (t.baseline || []).map((b) => `CC baseline ${b}`)),
          additional_data_opportunity: topics.flatMap((t) => t.pipeline || []),
          recommended_presentation: ["comparison_matrix", "line_chart", "table"],
          contrary_qualifying_data: ["Countries are not controlled experiments for economic systems."],
          classifications: [...new Set(classifications)],
          publication_surfaces: ["compare", file],
          reuse_targets: ["economic_system_comparison", "book_chapters", "public_reasoning"],
          rcip_series_demand: topics.flatMap((t) => t.pipeline || []),
          caveats: ["Countries are not controlled experiments for economic systems."],
          priority_score: score,
          priority: priorityBand(score),
          audit_method: "system_prose_passage",
        });
      }
    }
  }
  auditEconomicSystemsDimensions();

  // Hub comparison page
  if (fs.existsSync(path.join(ROOT, "content/public-resources/economic-system-comparison.md"))) {
    auditMarkdownFile("content/public-resources/economic-system-comparison.md", "economic_system");
  }

  // 5) Frameworks
  auditFrameworks();

  // 6) Public Reasoning (sample denser files — all files, but skip tiny stubs)
  for (const file of walkFiles("reports/public_reasoning", [".md"])) {
    auditMarkdownFile(file, "public_reasoning");
  }

  // 7) Sectoral dossiers
  for (const file of walkFiles("reports/sectoral_dossiers", [".md"])) {
    auditMarkdownFile(file, "sectoral_dossier");
  }

  // 8) Proof packets
  for (const file of walkFiles("content/research/proof-packets", [".md"])) {
    auditMarkdownFile(file, "proof_packet");
  }
  for (const file of walkFiles("research/proof_packets", [".md"])) {
    if (file.includes("registry")) continue;
    auditMarkdownFile(file, "proof_packet");
  }

  // 9) Evidence companion
  for (const file of walkFiles("content/evidence-companion", [".md"])) {
    auditMarkdownFile(file, "evidence_companion");
  }

  // 10) LCL / community
  for (const file of walkFiles("research/living_community_laboratories", [".md"])) {
    auditMarkdownFile(file, "lcl_community");
  }
  for (const file of walkFiles("content/research/case-studies", [".md"])) {
    auditMarkdownFile(file, "lcl_community");
  }

  // 11) Doctrine / declaration / philosophy
  for (const file of [
    "content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md",
    "content/philosophy/TEN_FOUNDATIONAL_AXIOMS.md",
  ]) {
    if (fs.existsSync(path.join(ROOT, file))) auditMarkdownFile(file, "principle_doctrine");
  }

  // Deduplicate near-identical statements within same file+section (keep highest score)
  const dedup = new Map();
  for (const o of opportunities) {
    const key = `${o.file}|${o.section}|${o.existing_statement.slice(0, 160)}`;
    const prev = dedup.get(key);
    if (!prev || o.priority_score > prev.priority_score) dedup.set(key, o);
  }
  const finalOpps = [...dedup.values()].sort((a, b) => b.priority_score - a.priority_score);
  // reassign stable display order ids while preserving claim/system prefixes where present
  finalOpps.forEach((o, i) => {
    if (!o.content_id || o.content_id.startsWith("CDE-") && !o.content_id.includes("CL") && !o.content_id.includes("SYS")) {
      // keep existing specialty ids; normalize bare ones
    }
    o.rank = i + 1;
  });

  // Classification histogram (primary = first tag; also multi-tag counts)
  const classCounts = Object.fromEntries(CLASSIFICATIONS.map((c) => [c, 0]));
  for (const o of finalOpps) {
    for (const c of o.classifications) classCounts[c] = (classCounts[c] || 0) + 1;
  }
  const primaryPreference = [
    "DATA ALREADY AVAILABLE",
    "PIPELINE RETRIEVABLE",
    "PRIMARY RESEARCH AVAILABLE",
    "MODELING REQUIRED",
    "DERIVED METRIC POSSIBLE",
    "HISTORICAL SERIES OPPORTUNITY",
    "GEOGRAPHIC COMPARISON OPPORTUNITY",
    "COUNTEREVIDENCE NEEDED",
    "NORMATIVE — DATA NOT REQUIRED",
    "DATA NOT AVAILABLE",
  ];
  const primaryClassCounts = Object.fromEntries(CLASSIFICATIONS.map((c) => [c, 0]));
  for (const o of finalOpps) {
    // Prefer retrieval/epistemic class over secondary tags (order in primaryPreference, not array order)
    const primary = primaryPreference.find((c) => o.classifications.includes(c)) || o.classifications[0];
    primaryClassCounts[primary] = (primaryClassCounts[primary] || 0) + 1;
  }

  const top50 = finalOpps.slice(0, 50);

  // RCIP demand manifest — unique series keyed by agency|dataset|series
  const demandMap = new Map();
  for (const o of finalOpps) {
    for (const d of o.rcip_series_demand || []) {
      const series = typeof d === "string" ? d : d.series;
      const agency = d.agency || "unknown";
      const dataset = d.dataset || "unknown";
      const key = `${agency}|${dataset}|${series}`;
      if (!demandMap.has(key)) {
        demandMap.set(key, {
          demand_id: `RCIP-DEM-${String(demandMap.size + 1).padStart(4, "0")}`,
          agency,
          dataset,
          series,
          geography: d.geography || "unspecified",
          retrieval_path: d.path || "unspecified",
          supporting_opportunity_ids: [],
          supporting_files: [],
          reuse_surfaces: new Set(),
          priority_max: 0,
        });
      }
      const rec = demandMap.get(key);
      rec.supporting_opportunity_ids.push(o.content_id);
      if (!rec.supporting_files.includes(o.file)) rec.supporting_files.push(o.file);
      for (const s of o.publication_surfaces || []) rec.reuse_surfaces.add(s);
      rec.priority_max = Math.max(rec.priority_max, o.priority_score || 0);
    }
  }
  const demandItems = [...demandMap.values()]
    .map((d) => ({
      ...d,
      reuse_surfaces: [...d.reuse_surfaces],
      supporting_opportunity_count: d.supporting_opportunity_ids.length,
      supporting_opportunity_ids: d.supporting_opportunity_ids.slice(0, 40),
      supporting_files: d.supporting_files.slice(0, 40),
    }))
    .sort((a, b) => b.priority_max - a.priority_max || b.supporting_opportunity_count - a.supporting_opportunity_count);

  const surfaceCounts = {};
  for (const o of finalOpps) {
    surfaceCounts[o.surface_class] = (surfaceCounts[o.surface_class] || 0) + 1;
  }

  const registry = {
    version: "1.0.0",
    slice_id: SLICE_ID,
    generated_at: GENERATED_AT,
    decision_bindings: ["CC-DEC-102", "CC-DEC-103", "CC-DEC-104"],
    governing_question:
      "What evidence would allow the reader to evaluate whether this statement deserves to be believed?",
    non_goals: [
      "Do not ask what statistics prove Constitutional Capitalism.",
      "Do not build hundreds of visualizations in this pass.",
      "Do not manufacture data where unavailable.",
      "Do not treat countries as controlled experiments for economic systems.",
    ],
    methodology: {
      approach: "hybrid_structural_and_passage_audit",
      units: [
        "claim_ledger_units",
        "manuscript_draft_paragraphs",
        "manuscript_outline_intents",
        "national_diagnosis_sections",
        "economic_system_prose_and_dimension_matrix",
        "theory_framework_strings",
        "public_reasoning_passages",
        "sectoral_dossiers",
        "proof_packets",
        "evidence_companion",
        "lcl_community",
        "principle_doctrine",
      ],
      priority_formula: "evidence_importance × current_weakness × publication_prominence × retrievability × reuse_potential",
      note: "Counts are registry realities from this audit run — not quota targets. Multi-label classifications mean tag totals exceed opportunity count.",
      extends_not_duplicates: [
        "data/project/data_dense_publication_standard.json",
        "evidence_synthesis/research_gaps/research_gap_registry.json",
        "data/project/proof_burden_registry.json",
        "research/corpus/contradictory_evidence_registry.json",
      ],
    },
    corpus_scan: {
      files_audited: [...new Set(filesAudited)].length,
      files_audited_list_sample: [...new Set(filesAudited)].slice(0, 80),
      sections_seen: passageStats.sections,
      paragraphs_scanned: passageStats.paragraphs_scanned,
      substantive_passages_and_units: passageStats.substantive_passages + finalOpps.filter((o) => o.audit_method === "claim_ledger_unit").length,
      placeholder_manuscript_chapters_noted: passageStats.skipped_placeholder_chapters,
      opportunities_after_dedup: finalOpps.length,
    },
    summary: {
      opportunities_total: finalOpps.length,
      primary_classification_counts: primaryClassCounts,
      multi_label_classification_counts: classCounts,
      by_surface_class: surfaceCounts,
      high_priority: finalOpps.filter((o) => o.priority === "HIGH").length,
      medium_priority: finalOpps.filter((o) => o.priority === "MEDIUM").length,
      low_priority: finalOpps.filter((o) => o.priority === "LOW").length,
      already_supported_primary: primaryClassCounts["DATA ALREADY AVAILABLE"],
      pipeline_retrievable_primary: primaryClassCounts["PIPELINE RETRIEVABLE"],
      primary_research_primary: primaryClassCounts["PRIMARY RESEARCH AVAILABLE"],
      modeling_required_primary: primaryClassCounts["MODELING REQUIRED"],
      counterevidence_tagged: classCounts["COUNTEREVIDENCE NEEDED"],
      normative_primary: primaryClassCounts["NORMATIVE — DATA NOT REQUIRED"],
    },
    top_50_content_ids: top50.map((o) => o.content_id),
    opportunities: finalOpps,
  };

  const demandManifest = {
    version: "1.0.0",
    slice_id: SLICE_ID,
    generated_at: GENERATED_AT,
    title: "RCIP Publication Data Demand Manifest",
    governing_rule: "Publication-demand driven ingest: retrieve each demanded series once, normalize once, reuse across CC surfaces.",
    hierarchy: ["API", "official_machine_readable_file", "official_workbook_table", "manual_primary"],
    notes: [
      "Generated from content_data_evidence_opportunity_registry.json",
      "Baseline slots remain ontology-gated; many demands are publication-supporting rather than baseline fills.",
      "Cross-national system-comparison series require explicit non-experiment caveats on every surface.",
    ],
    summary: {
      unique_series_demands: demandItems.length,
      opportunities_driving_demand: finalOpps.filter((o) => (o.rcip_series_demand || []).length).length,
    },
    demands: demandItems,
  };

  writeJson("data/project/content_data_evidence_opportunity_registry.json", registry);
  writeJson("data/project/RCIP_PUBLICATION_DATA_DEMAND_MANIFEST.json", demandManifest);

  // Compact top-50 companion for humans
  writeJson(
    "data/project/content_data_evidence_top50.json",
    {
      version: "1.0.0",
      slice_id: SLICE_ID,
      generated_at: GENERATED_AT,
      items: top50.map((o) => ({
        content_id: o.content_id,
        rank: o.rank,
        priority: o.priority,
        priority_score: o.priority_score,
        file: o.file,
        surface_class: o.surface_class,
        section: o.section,
        statement_type: o.statement_type,
        audit_method: o.audit_method,
        classifications: o.classifications,
        existing_statement: o.existing_statement,
        evidence_currently_displayed: o.evidence_currently_displayed,
        available_evidence: o.available_evidence,
        recommended_presentation: o.recommended_presentation,
        contrary_qualifying_data: o.contrary_qualifying_data,
        reuse_targets: o.reuse_targets,
      })),
    }
  );

  console.log(JSON.stringify({
    ok: true,
    files_audited: registry.corpus_scan.files_audited,
    opportunities: finalOpps.length,
    high: registry.summary.high_priority,
    demand_series: demandItems.length,
    primary: primaryClassCounts,
  }, null, 2));
}

main();
