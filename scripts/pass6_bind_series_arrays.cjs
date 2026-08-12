/**
 * CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-6.0
 * Bind RedDirt series-arrays.json into existing evidence systems (no new panels).
 */
const fs = require("fs");

const arrays = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/series-arrays.json", "utf8")
);
const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));

function seriesById(id, geo) {
  return arrays.series.find(
    (s) => s.consumer_metric_id === id && (!geo || s.geography_id === geo)
  );
}

function toPoints(series, max = 24) {
  if (!series) return [];
  const pts = series.points
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .map((p) => ({
      period: p.period,
      value: String(p.value),
      geography: series.geography_name,
    }));
  if (pts.length <= max) return pts;
  // Keep endpoints + evenly spaced middle samples (no interpolation).
  const out = [pts[0]];
  const inner = max - 2;
  for (let i = 1; i <= inner; i += 1) {
    const idx = Math.round((i * (pts.length - 1)) / (inner + 1));
    out.push(pts[idx]);
  }
  out.push(pts[pts.length - 1]);
  const seen = new Set();
  return out.filter((p) => {
    const k = p.period;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function deriveRealAheOty() {
  const ces = seriesById("CC-PASS6-CES-AHE-LEVEL", "geo:us");
  const cpi = seriesById("CC-PASS6-CPI-U", "geo:us");
  if (!ces || !cpi) return null;
  const cesMap = new Map(ces.points.map((p) => [p.period, Number(p.value)]));
  const cpiMap = new Map(cpi.points.map((p) => [p.period, Number(p.value)]));
  const periods = [...cesMap.keys()].filter((p) => cpiMap.has(p)).sort();
  const real = periods.map((p) => ({
    period: p,
    real: (cesMap.get(p) / cpiMap.get(p)) * 100,
  }));
  const oty = [];
  for (let i = 1; i < real.length; i += 1) {
    const prev = real[i - 1];
    const cur = real[i];
    // Only adjacent December pairs (no interpolation across gaps).
    const prevYear = Number(prev.period.slice(0, 4));
    const curYear = Number(cur.period.slice(0, 4));
    if (curYear !== prevYear + 1) continue;
    const pct = ((cur.real - prev.real) / prev.real) * 100;
    oty.push({
      period: `${cur.period} vs ${prev.period}`,
      value: `${pct.toFixed(1)}%`,
      geography: "US",
      note: "Derived from CES0500000003 / CUUR0000SA0 December levels — supporting history, not a replacement for the official L01 release cell.",
    });
  }
  return {
    point_count: oty.length,
    coverage: oty.length
      ? `${oty[0].period} → ${oty[oty.length - 1].period}`
      : null,
    points: oty,
  };
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

const derived = deriveRealAheOty();
const prod = seriesById("CC-PASS6-NFB-PRODUCTIVITY-Q4", "geo:us");
const jolts = seriesById("CC-PASS6-JOLTS-QUITS", "geo:us");
const unempUs = seriesById("CC-PASS6-UNEMP-US", "geo:us");
const unempAr = seriesById("CC-PASS6-UNEMP-AR", "geo:us-ar");
const bdsEntry = seriesById("CC-IND-B01", "geo:us");
const bdsExit = seriesById("CC-IND-B02", "geo:us");
const bdsEntrants = seriesById("CC-IND-C02", "geo:us");
const bdsEntryAr = seriesById("CC-PASS6-BDS-ENTRY-AR", "geo:us-ar");
const bdsExitAr = seriesById("CC-PASS6-BDS-EXIT-AR", "geo:us-ar");

// --- WAGES ---
{
  const p = find("CC-EP-WAGES-PRODUCTIVITY-1");
  const sys = p.evidence_system || {};
  const sampleOty = derived ? toPoints({ points: derived.points.map((x) => ({ period: x.period, value: x.value })), geography_name: "US" }, 12) : [];
  sys.reader_stack = sys.reader_stack || undefined;
  sys.series_points = [
    {
      series_id: "CC-PASS6-DERIVED-REAL-AHE-OTY",
      label: "Derived real AHE Dec-to-Dec % change (CES/CPI)",
      source: "RedDirt exp_226e711e08704b06 → CES0500000003 + CUUR0000SA0",
      point_count: derived?.point_count || 0,
      coverage: derived?.coverage || "none",
      definition_note:
        "Supporting derived history. Not a substitute for the official BLS Real Earnings L01 cell.",
      points: (derived?.points || []).slice(-12),
    },
    {
      series_id: "CC-PASS6-NFB-PRODUCTIVITY-Q4",
      label: "NFB productivity % change (Q4, annual rate)",
      source: "BLS PRS85006092 via RedDirt",
      point_count: prod?.points.length || 0,
      coverage: prod ? `${prod.points[0].period} → ${prod.points[prod.points.length - 1].period}` : "none",
      definition_note:
        "DEFINITION BREAK vs CC-IND-L02: this is quarterly % change at annual rate (Q4 spine), not the official annual L02 dial.",
      points: toPoints(prod, 14).map((pt) => ({
        period: pt.period,
        value: `${pt.value}%`,
        geography: "US",
      })),
    },
    {
      series_id: "CC-PASS6-JOLTS-QUITS",
      label: "JOLTS quits rate (Dec points where annual absent)",
      source: "BLS JTS000000000000000QUR via RedDirt",
      point_count: jolts?.points.length || 0,
      coverage: jolts ? `${jolts.points[0].period} → ${jolts.points[jolts.points.length - 1].period}` : "none",
      definition_note: "December points used when annual M13 cells are absent — labeled, not interpolated.",
      points: toPoints(jolts, 12).map((pt) => ({
        period: pt.period,
        value: `${pt.value}%`,
        geography: "US",
      })),
    },
  ];
  sys.geography_contrast = [
    {
      label: "Unemployment Dec path (AR vs US)",
      value: unempAr && unempUs
        ? `AR ${unempAr.points[unempAr.points.length - 1].value}% (${unempAr.points[unempAr.points.length - 1].period}) vs US ${unempUs.points[unempUs.points.length - 1].value}% (${unempUs.points[unempUs.points.length - 1].period})`
        : "partial",
      note: `Series coverage ${unempAr?.points[0]?.period || "?"}–${unempAr?.points.at(-1)?.period || "?"} (AR) and ${unempUs?.points[0]?.period || "?"}–${unempUs?.points.at(-1)?.period || "?"} (US). Labor-market context only — not L01/L02.`,
    },
  ];
  sys.observation_history = [
    ...(derived?.points?.length
      ? [
          {
            period: derived.coverage,
            value: `${derived.point_count} derived Dec-to-Dec real AHE OTY points attached`,
            label: "CES/CPI derived wage history",
            geography: "US",
            note: "See series_points; not official L01 release table.",
          },
        ]
      : []),
    {
      period: prod ? `${prod.points[0].period}→${prod.points.at(-1).period}` : "missing",
      value: prod ? `${prod.points.length} Q4 productivity points` : "not attached",
      label: "PRS85006092 Q4 spine",
      geography: "US",
      note: "Definition break vs L02 annual dial.",
    },
    {
      period: jolts ? `${jolts.points[0].period}→${jolts.points.at(-1).period}` : "missing",
      value: jolts ? `${jolts.points.length} JOLTS Dec points` : "not attached",
      label: "JOLTS quits history",
      geography: "US",
    },
  ];
  sys.series_note =
    "Pass 6 attached RedDirt multi-year arrays for CES/CPI-derived real AHE OTY, JOLTS quits, unemployment AR/US, and a Q4 productivity spine. Official L01/L02 release cells remain the current dials; derived/Q4 series are labeled supporting history.";
  sys.series_status = "partial_arrays_attached";
  sys.missing_layers = [
    "Official BLS Real Earnings L01 multi-year release table (prefer over derived CES/CPI)",
    "Official annual L02 % path (PRS85006092 Q4 ≠ L02)",
    "SCF/DFA/CBO/FDIC/HRSA/EIA arrays still blocked without adapters",
    ...((sys.missing_layers || []).filter((x) => !/L01|L02|L04|Multi-year real|Multi-decade NFB|JOLTS/.test(x))),
  ];
  sys.qualification =
    "L01 remains mean AHE of jobs. Derived CES/CPI OTY is supporting history only. PRS85006092 Q4 is not the L02 annual dial — do not collapse them.";
  p.evidence_system = sys;
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "reddirt exp_226e711e08704b06 series-arrays",
  };
  p.what_the_data_show.key_finding =
    "Current dials remain real AHE +1.1% / productivity +2.3% / quits 2.1%. Pass 6 now attaches multi-year movement: derived Dec-to-Dec real AHE OTY from CES/CPI (2008–2025 span where adjacent years exist), a 1970–2024 Q4 productivity % spine (definitionally distinct from L02), JOLTS Dec quits history, and AR vs US December unemployment paths.";
  p.explore = {
    ...(p.explore || {}),
    import_package: "data/imports/reddirt-public-statistics/",
    mapping: "data/imports/reddirt-public-statistics/series-arrays.json",
    related_claims: p.explore?.related_claims || ["CC-CLAIM-002"],
  };
}

// --- MARKET DYNAMICS ---
{
  const p = find("CC-EP-MARKET-DYNAMICS-SYSTEM-1");
  const sys = p.evidence_system || {};
  const entryPts = toPoints(bdsEntry, 12);
  const exitPts = toPoints(bdsExit, 12);
  const entrantPts = toPoints(bdsEntrants, 12);
  sys.series_points = [
    {
      series_id: "CC-IND-B01",
      label: "US BDS establishment entry rate",
      source: "Census BDS via RedDirt",
      point_count: bdsEntry?.points.length || 0,
      coverage: bdsEntry ? `${bdsEntry.points[0].period}→${bdsEntry.points.at(-1).period}` : "none",
      points: entryPts.map((pt) => ({ period: pt.period, value: `${pt.value}%`, geography: "US" })),
    },
    {
      series_id: "CC-IND-B02",
      label: "US BDS establishment exit rate",
      source: "Census BDS via RedDirt",
      point_count: bdsExit?.points.length || 0,
      coverage: bdsExit ? `${bdsExit.points[0].period}→${bdsExit.points.at(-1).period}` : "none",
      points: exitPts.map((pt) => ({ period: pt.period, value: `${pt.value}%`, geography: "US" })),
    },
    {
      series_id: "CC-IND-C02",
      label: "US BDS new establishment entrants",
      source: "Census BDS via RedDirt",
      point_count: bdsEntrants?.points.length || 0,
      coverage: bdsEntrants
        ? `${bdsEntrants.points[0].period}→${bdsEntrants.points.at(-1).period}`
        : "none",
      points: entrantPts.map((pt) => ({
        period: pt.period,
        value: Number(pt.value).toLocaleString("en-US"),
        geography: "US",
      })),
    },
  ];
  sys.observation_history = [
    {
      period: "2000–2023",
      value: `${bdsEntry?.points.length || 0} entry-rate / ${bdsExit?.points.length || 0} exit-rate / ${bdsEntrants?.points.length || 0} entrant-count points`,
      label: "BDS annual history attached",
      geography: "US",
    },
  ];
  sys.series_note =
    "Pass 6 attached Census BDS annual arrays 2000–2023 for entry rate, exit rate, and entrant counts. Enforcement (C03) remains a single-year dial. CR/markup series still missing.";
  sys.series_status = "partial_arrays_attached";
  sys.missing_layers = [
    "Fixed-NAICS multi-year CR4/CR8 sample table — PASS5-DEM-CR-SAMPLE",
    "Markup / price-cost margin comparable series — PASS5-DEM-MARKUPS",
    "DOJ ATR criminal-case multi-year path",
    "Labor-market concentration datasets",
  ];
  // Interpretation note if recent entry is not peak
  const firstEntry = bdsEntry?.points[0]?.value;
  const lastEntry = bdsEntry?.points.at(-1)?.value;
  p.what_the_data_show.key_finding = `Market-dynamics evidence now includes BDS histories (entry/exit rates and entrant counts, 2000–2023) beside the FY2024 enforcement dial (20 criminal cases). Latest US entry rate ${lastEntry}% vs ${firstEntry}% in 2000 — dynamics move over time; still not a competitiveness score or national CR%.`;
  p.what_the_data_show.plain_english =
    "Readers can now see establishment dynamics move across two decades. Entry/exit histories still do not measure markups or industry concentration.";
  p.evidence_system = sys;
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "reddirt exp_226e711e08704b06 series-arrays",
  };
}

// --- RURAL ---
{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};
  sys.series_points = [
    {
      series_id: "CC-PASS6-BDS-ENTRY-AR",
      label: "Arkansas BDS establishment entry rate",
      source: "Census BDS via RedDirt",
      point_count: bdsEntryAr?.points.length || 0,
      coverage: bdsEntryAr
        ? `${bdsEntryAr.points[0].period}→${bdsEntryAr.points.at(-1).period}`
        : "none",
      points: toPoints(bdsEntryAr, 12).map((pt) => ({
        period: pt.period,
        value: `${pt.value}%`,
        geography: "Arkansas",
      })),
    },
    {
      series_id: "CC-IND-B01",
      label: "US BDS establishment entry rate (comparison)",
      source: "Census BDS via RedDirt",
      point_count: bdsEntry?.points.length || 0,
      coverage: bdsEntry ? `${bdsEntry.points[0].period}→${bdsEntry.points.at(-1).period}` : "none",
      points: toPoints(bdsEntry, 12).map((pt) => ({
        period: pt.period,
        value: `${pt.value}%`,
        geography: "US",
      })),
    },
  ];
  sys.geography_contrast = [
    {
      label: "BDS entry rate latest year (AR vs US)",
      value:
        bdsEntryAr && bdsEntry
          ? `AR ${bdsEntryAr.points.at(-1).value}% vs US ${bdsEntry.points.at(-1).value}% (${bdsEntry.points.at(-1).period})`
          : "partial",
      note: "Same BDS definition — comparable. Statewide ≠ local community baseline.",
    },
    {
      label: "BDS exit rate latest year (AR vs US)",
      value:
        bdsExitAr && bdsExit
          ? `AR ${bdsExitAr.points.at(-1).value}% vs US ${bdsExit.points.at(-1).value}% (${bdsExit.points.at(-1).period})`
          : "partial",
      note: "Same BDS definition — comparable.",
    },
    {
      label: "Rural definition contrast",
      value: "Census rural 20% vs ERS nonmetro 13.6%",
      note: "Keep both; never average them.",
    },
  ];
  sys.series_note =
    "Pass 6 attached AR and US BDS entry/exit rate histories (2000–2023). FDIC community-bank paths and HPSA arrays remain blocked without adapters.";
  sys.series_status = "partial_arrays_attached";
  sys.missing_layers = [
    "FDIC QBP community-bank deposit/loan share path — PASS5-DEM-FDIC-PATH",
    "HRSA HPSA multi-year / AR designations — PASS5-DEM-HPSA-HISTORY / PASS5-DEM-HPSA-AR",
    "Hospital-access baseline CM03 (deferred)",
    "SBA 7(a)/504 dollar series",
    "Community-level ownership / leakage maps",
  ];
  p.what_the_data_show.key_finding =
    "Rural/local-capital context now includes Arkansas vs U.S. BDS entry/exit rate histories (2000–2023) beside Census-rural/ERS-nonmetro definition contrasts and single-period local-capital dials. Statewide dynamics ≠ town outcomes; FDIC/HPSA trend arrays still missing.";
  p.evidence_system = sys;
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: "reddirt exp_226e711e08704b06 series-arrays",
  };
}

// Energy: keep panel; mark RCIP 0418-0425 still blocked
{
  const p = find("CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1");
  if (p.evidence_system) {
    p.evidence_system.series_note =
      "Pass 6 attempted RCIP-DEM-0418–0425 retrieval: blocked — no EIA connector/API key path in RedDirt RCIP spine yet. Structural endpoints from CC-SRC-056–061 remain; full MER/electricity/trade arrays not attached.";
    p.evidence_system.series_status = "structural_endpoints_eia_arrays_blocked";
    p.last_updated = {
      date: "2026-08-11",
      dataset_or_release: "Pass 6 — EIA adapter pending; export exp_226e711e08704b06 has no energy series",
    };
  }
}

// Ownership / fiscal / health: explicit still-blocked status
for (const id of [
  "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
  "CC-EP-FISCAL-REVENUE-SYSTEM-1",
  "CC-EP-PRIMARY-CARE-ACCESS-1",
]) {
  const p = find(id);
  if (!p.evidence_system) continue;
  p.evidence_system.series_note = `${p.evidence_system.series_note || ""} Pass 6: adapter still missing — no new arrays attached.`.trim();
  p.evidence_system.series_status = "official_series_available_adapter_blocked";
}

data.version = "1.5.0";
data.slice_id = "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-6.0";
data.generated_at = "2026-08-11";
data.pass_summary = {
  pass: "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-6.0",
  panels_total: data.panels.length,
  panels_added_pass_6: 0,
  systems_deepened_with_arrays: 3,
  export_id: "exp_226e711e08704b06",
  observation_count: 284,
  preference: "retrieval_and_binding_no_new_panels",
  energy_rcip_0418_0425: "blocked_no_eia_adapter",
  baseline_impact: "none — no ontology promotion",
  note: "Attached BLS/Census multi-year arrays into wages, market-dynamics, and rural systems. SCF/DFA/CBO/FDIC/HRSA/EIA still blocked.",
};
data.pass_6_rule =
  "No new panel unless a genuinely new evidence question requires one. Prefer richer time series, geographic comparisons, and distribution layers inside the existing panels.";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");

const report = {
  export_id: "exp_226e711e08704b06",
  derived_real_ahe_oty_points: derived?.point_count || 0,
  productivity_q4_points: prod?.points.length || 0,
  jolts_points: jolts?.points.length || 0,
  bds_us_entry_points: bdsEntry?.points.length || 0,
  bds_ar_entry_points: bdsEntryAr?.points.length || 0,
  panels_total: data.panels.length,
};
fs.writeFileSync(
  "data/project/pass6_bind_summary.json",
  JSON.stringify(report, null, 2) + "\n"
);
console.log(JSON.stringify(report, null, 2));
