/**
 * Pass 1 — Comparative shared-dial harmonization.
 * Builds a reusable cross-system matrix from the 16 bound systems + publication panels.
 * Does not invent numbers. Missing/NEE stay missing/NEE.
 * Optionally normalizes observable_outcomes to include all shared domain keys.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-08-12";
const SLICE = "CC-COMPARATIVE-SYSTEMS-SHARED-DIAL-HARMONIZATION-PASS-1.0";
const WAVE_SLICE = "CC-COORDINATED-DEVELOPMENT-WAVE-1.0";

const comparisonPath = path.join(root, "data/project/economic_system_comparison.json");
const panelsPath = path.join(root, "data/project/publication_evidence_panels.json");
const outPath = path.join(root, "data/project/comparative_systems_shared_dial_matrix.json");

const systems = JSON.parse(fs.readFileSync(comparisonPath, "utf8"));
const panelsDoc = JSON.parse(fs.readFileSync(panelsPath, "utf8"));
const panels = Object.fromEntries(panelsDoc.panels.map((p) => [p.panel_id, p]));

/** Canonical domain anchors — identical definitions for cross-system comparability */
const CANONICAL = {
  wealth: {
    primary_panel_id: "CC-EP-WEALTH-BASELINE-1",
    primary_metric_ids: ["CC-IND-W01", "CC-IND-W02", "CC-IND-W04"],
    supplementary_panel_ids: ["CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
    denominator_note: "Household / SCF–DFA wealth shares; not firm-level concentration",
  },
  labor: {
    primary_panel_id: "CC-EP-WAGES-PRODUCTIVITY-1",
    primary_metric_ids: ["CC-IND-L01", "CC-IND-L02"],
    supplementary_panel_ids: ["CC-EP-HUMAN-CAPITAL-PATHWAYS-1"],
    denominator_note: "Real wage / productivity indices — not unemployment alone",
  },
  competition: {
    primary_panel_id: "CC-EP-COMPETITION-ENFORCEMENT-1",
    primary_metric_ids: ["CC-IND-C03", "CC-IND-C02"],
    supplementary_panel_ids: [
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-SECTORAL-INFLUENCE-LADDER-1",
    ],
    denominator_note: "Enforcement / entry dials — not a market-power proof (CC-CLAIM-003 NEE)",
  },
  democracy: {
    primary_panel_id: "CC-EP-COMPARISON-POLITICAL-MONEY-1",
    primary_metric_ids: ["CC-IND-D04"],
    supplementary_panel_ids: [
      "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
      "CC-EP-TRUST-AND-BASELINE-DIAL-1",
      "CC-EP-JOURNALISM-90DAY-1",
      "CC-EP-JOURNALISM-PUBLIC-FINANCE-1",
    ],
    denominator_note: "Political-money concentration dial D04 is the cross-system comparable; journalism geos are AR-pilot only",
  },
  healthcare: {
    primary_panel_id: "CC-EP-PRIMARY-CARE-ACCESS-1",
    primary_metric_ids: ["CC-IND-E05"],
    supplementary_panel_ids: [],
    denominator_note: "HPSA / primary-care access counts — not outcome quality scores",
  },
  agriculture: {
    primary_panel_id: "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
    primary_metric_ids: ["CC-IND-CM02", "CC-IND-CM04", "CC-IND-E01", "CC-IND-E02"],
    supplementary_panel_ids: ["CC-EP-AR-AG-PROCESSING-ACCESS-1"],
    denominator_note: "Rural/local capital and farm structure; AR processing panel is Arkansas-geography supplementary",
  },
  fiscal: {
    primary_panel_id: "CC-EP-FISCAL-REVENUE-SYSTEM-1",
    primary_metric_ids: ["CC-IND-G01", "CC-IND-G02", "CC-IND-G03"],
    supplementary_panel_ids: [],
    denominator_note: "Federal receipts/outlays/debt as % GDP — not Arkansas state budget identity",
  },
};

const DOMAINS = Object.keys(CANONICAL);

function criticalNumbers(panelId) {
  const p = panels[panelId];
  if (!p) return [];
  return (p.what_the_data_show?.critical_numbers || []).map((n) => ({
    label: n.label ?? null,
    value: n.value ?? null,
    period: n.period ?? null,
    geography: normalizeGeo(n.geography),
    metric_id: n.metric_id ?? null,
    source_id: n.source_id ?? null,
    panel_id: panelId,
  }));
}

function normalizeGeo(g) {
  if (!g) return null;
  const s = String(g).trim();
  if (s === "United States" || s === "US" || s === "U.S.") return "US";
  if (s === "Arkansas" || s === "AR") return "Arkansas";
  if (/county/i.test(s) || /AR pilot/i.test(s) || /Clinton|Van Buren/i.test(s)) {
    return s.includes("Arkansas") || /AR /i.test(s) || /pilot/i.test(s)
      ? "Arkansas_county"
      : s;
  }
  if (/multi/i.test(s)) return "multi_state_comparative";
  return s;
}

function geographiesFor(panelIds) {
  const geos = new Set();
  for (const id of panelIds) {
    for (const n of criticalNumbers(id)) {
      if (n.geography) geos.add(n.geography);
    }
  }
  return [...geos];
}

function periodsFor(panelIds) {
  const periods = new Set();
  for (const id of panelIds) {
    for (const n of criticalNumbers(id)) {
      if (n.period) periods.add(n.period);
    }
  }
  return [...periods];
}

function classifyCell(domain, boundPanelIds) {
  const canon = CANONICAL[domain];
  const bound = new Set(boundPanelIds || []);
  const hasPrimary = bound.has(canon.primary_panel_id);
  const supp = canon.supplementary_panel_ids.filter((id) => bound.has(id));
  const unknown = [...bound].filter(
    (id) => id !== canon.primary_panel_id && !canon.supplementary_panel_ids.includes(id)
  );

  if (hasPrimary) {
    return {
      status: "comparable",
      comparable: true,
      reason: "Primary panel bound with canonical metric definitions",
      primary_panel_id: canon.primary_panel_id,
      supplementary_panel_ids: supp,
      non_canonical_panel_ids: unknown,
    };
  }
  if (supp.length || unknown.length) {
    return {
      status: "similar_not_comparable",
      comparable: false,
      reason:
        "Domain coverage uses related panels only — not the canonical primary dial for cross-system comparison",
      primary_panel_id: null,
      supplementary_panel_ids: supp,
      non_canonical_panel_ids: unknown,
    };
  }
  return {
    status: "missing",
    comparable: false,
    reason: "No panels bound for this shared domain — preserved as missing, not imputed",
    primary_panel_id: null,
    supplementary_panel_ids: [],
    non_canonical_panel_ids: [],
  };
}

const bound = systems.filter((s) => s.phase2_evidence);
if (bound.length !== 16) {
  console.error(`Expected 16 bound systems, found ${bound.length}`);
  process.exit(1);
}

const systemRows = [];
let normalizedCount = 0;

for (const sys of bound) {
  const oo = sys.phase2_evidence.observable_outcomes || {};
  // Normalize: every shared domain key present (empty array if unbound)
  const normalized = {};
  for (const d of DOMAINS) {
    normalized[d] = Array.isArray(oo[d]) ? [...oo[d]] : [];
  }
  // Preserve any unexpected keys
  for (const [k, v] of Object.entries(oo)) {
    if (!(k in normalized)) normalized[k] = v;
  }
  const before = JSON.stringify(oo);
  const after = JSON.stringify(normalized);
  if (before !== after) {
    sys.phase2_evidence.observable_outcomes = normalized;
    normalizedCount += 1;
  }

  const domains = {};
  for (const d of DOMAINS) {
    const panelIds = normalized[d];
    const cell = classifyCell(d, panelIds);
    const allIds = [
      ...(cell.primary_panel_id ? [cell.primary_panel_id] : []),
      ...cell.supplementary_panel_ids,
      ...cell.non_canonical_panel_ids,
    ];
    const numbers = allIds.flatMap((id) => criticalNumbers(id));
    const geos = geographiesFor(allIds);
    const periods = periodsFor(allIds);
    const missingMetrics = CANONICAL[d].primary_metric_ids.filter(
      (mid) => !numbers.some((n) => n.metric_id === mid)
    );

    domains[d] = {
      ...cell,
      bound_panel_ids: panelIds,
      geographies: geos,
      periods,
      critical_numbers: numbers.filter((n) => n.metric_id || n.value != null),
      missing_primary_metrics: missingMetrics,
      missing_data_treatment: "left_missing_no_imputation",
      verdict_language_allowed: [
        "supporting_observational",
        "contradicting_or_bounding_overclaim",
        "not_enough_evidence",
      ],
    };
  }

  const verdicts = sys.phase2_evidence.evidence_verdicts || {};
  systemRows.push({
    slug: sys.slug,
    name: sys.name,
    wave: sys.phase2_evidence.wave || null,
    evidence_panel_ids: sys.phase2_evidence.evidence_panel_ids || [],
    domains,
    evidence_verdicts_summary: {
      supporting_count: (verdicts.supporting || []).length,
      contradicting_count: (verdicts.contradicting || []).length,
      not_enough_evidence_count: (verdicts.not_enough_evidence || []).length,
    },
    arkansas_relevance_status: sys.phase2_evidence.arkansas_relevance?.status || null,
  });

  // Stamp harmonization pointer on system (lightweight, reusable)
  sys.shared_dial_harmonization = {
    slice_id: SLICE,
    wave_slice_id: WAVE_SLICE,
    matrix_path: "data/project/comparative_systems_shared_dial_matrix.json",
    status: "harmonized_v1",
    comparable_domains: DOMAINS.filter((d) => domains[d].comparable),
    missing_domains: DOMAINS.filter((d) => domains[d].status === "missing"),
    similar_not_comparable_domains: DOMAINS.filter(
      (d) => domains[d].status === "similar_not_comparable"
    ),
  };
}

const domainCoverage = {};
for (const d of DOMAINS) {
  const rows = systemRows.map((r) => ({
    slug: r.slug,
    status: r.domains[d].status,
    comparable: r.domains[d].comparable,
  }));
  domainCoverage[d] = {
    canonical: CANONICAL[d],
    comparable_system_count: rows.filter((r) => r.comparable).length,
    similar_not_comparable_count: rows.filter((r) => r.status === "similar_not_comparable")
      .length,
    missing_count: rows.filter((r) => r.status === "missing").length,
    systems: rows,
  };
}

const matrix = {
  version: "1.0.0",
  slice_id: SLICE,
  wave_slice_id: WAVE_SLICE,
  generated_at: TODAY,
  status: "harmonization_pass_1_complete",
  module_id: "CC-MOD-COMPARATIVE-SHARED-DIAL-MATRIX",
  decision_id: "CC-DEC-115",
  update_id: "UPD-128",
  purpose:
    "Reusable cross-system data structure for the 16 evidence-bound systems — genuinely comparable dials, not page-by-page category mimicry.",
  not: [
    "ranking",
    "new_panels",
    "imputed_missing_cells",
    "fill_remaining_24",
    "causal_claims",
    "upgrade_of_CC_CLAIM_003",
  ],
  definition_control_applied: [
    "identical_metric_definitions",
    "identical_geography_rules",
    "compatible_time_periods",
    "explicit_missing_data_treatment",
    "source_provenance",
    "comparable_vs_non_comparable_markers",
    "evidence_for_against_nee",
  ],
  shared_domains: DOMAINS,
  canonical_dials: CANONICAL,
  systems_harmonized: systemRows.length,
  systems_remaining_definition_only: systems.length - systemRows.length,
  domain_coverage: domainCoverage,
  systems: systemRows,
  holds: [
    "CC-CLAIM-003 remains NEE",
    "Missing cells stay missing",
    "Observational ≠ causal",
    "Remaining 24 systems = controlled backlog",
    "Overall completion dial held at 43 until design layers earn credit",
  ],
  feeds: [
    "CC-ARKANSAS-STRATEGIC-CAPACITY-SOURCE-INVENTORY-1.0",
    "CC-ARKANSAS-MAGNET-HUB-FUNDING-ELIGIBILITY-MATRIX-1.0",
  ],
  source_of_truth_panels: "data/project/publication_evidence_panels.json",
  source_of_truth_binds: "data/project/economic_system_comparison.json",
};

fs.writeFileSync(outPath, JSON.stringify(matrix, null, 2) + "\n", "utf8");
fs.writeFileSync(comparisonPath, JSON.stringify(systems, null, 2) + "\n", "utf8");

console.log(
  `Harmonization matrix written: ${systemRows.length} systems; normalized observable_outcomes on ${normalizedCount}; out=${path.relative(root, outPath)}`
);
for (const d of DOMAINS) {
  const c = domainCoverage[d];
  console.log(
    `  ${d}: comparable=${c.comparable_system_count} similar=${c.similar_not_comparable_count} missing=${c.missing_count}`
  );
}
