/**
 * RCIP-PASS-10 density bind — FRED/BEA densify into existing panels.
 * 0 new panels. Preserve producer. Macro/wealth structure ≠ capture.
 */
const fs = require("fs");

const arrays = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/series-arrays.json", "utf8"),
);
const importMeta = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/manifest.json", "utf8"),
);
const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));
const exportId = importMeta.export_id || "unknown";

function seriesById(id, geo) {
  return arrays.series.find(
    (s) => s.consumer_metric_id === id && (!geo || s.geography_id === geo),
  );
}

function coverage(series) {
  if (!series?.points?.length) return "none";
  const sorted = [...series.points]
    .filter((p) => p.value != null)
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  if (!sorted.length) return "none";
  return `${sorted[0].period} → ${sorted[sorted.length - 1].period}`;
}

function latest(series) {
  if (!series?.points?.length) return null;
  const sorted = [...series.points]
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  return sorted[sorted.length - 1] || null;
}

function toPoints(series, max = 12, format = (v) => String(v)) {
  if (!series) return [];
  const pts = series.points
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .map((p) => ({
      period: String(p.period),
      value: format(Number(p.value)),
      geography: series.geography_name,
    }));
  if (pts.length <= max) return pts;
  const out = [pts[0]];
  const inner = max - 2;
  for (let i = 1; i <= inner; i += 1) {
    const idx = Math.round((i * (pts.length - 1)) / (inner + 1));
    out.push(pts[idx]);
  }
  out.push(pts[pts.length - 1]);
  const seen = new Set();
  return out.filter((p) => {
    if (seen.has(p.period)) return false;
    seen.add(p.period);
    return true;
  });
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

function pct1(v) {
  return Number(v).toFixed(1) + "%";
}
function idx1(v) {
  return Number(v).toFixed(1);
}
function usdB(v) {
  return "$" + Number(v).toFixed(1) + "B";
}
function usdM(v) {
  return "$" + Math.round(v).toLocaleString("en-US") + "M";
}
function usd(v) {
  return "$" + Math.round(v).toLocaleString("en-US");
}

function row(id, geo, label, format, note) {
  const series = seriesById(id, geo);
  if (!series?.points?.length) return null;
  const last = latest(series);
  return {
    series_id: id,
    label,
    coverage: coverage(series),
    latest: last ? { period: last.period, value: format(last.value) } : null,
    points: toPoints(series, 12, format),
    note,
  };
}

const assetTop1 = seriesById("CC-PASS10-FRED-DFA-TOP1-ASSET-SHARE", "geo:us");
const assetBot50 = seriesById("CC-PASS10-FRED-DFA-BOTTOM50-ASSET-SHARE", "geo:us");
const receipts = seriesById("CC-PASS10-FRED-OMB-RECEIPTS-PCT-GDP", "geo:us");
const outlays = seriesById("CC-PASS10-FRED-OMB-OUTLAYS-PCT-GDP", "geo:us");
const debt = seriesById("CC-PASS10-FRED-DEBT-HELD-BY-PUBLIC-PCT-GDP", "geo:us");
const arFarm = seriesById("CC-PASS10-FRED-BEA-AR-FARM-PROPRIETORS-INCOME", "geo:us-ar");
const usFarm = seriesById("CC-PASS10-FRED-BEA-US-FARM-PROPRIETORS-INCOME", "geo:us");
const arRealGdp = seriesById("CC-PASS10-FRED-BEA-AR-REAL-GDP", "geo:us-ar");
const usRealGdp = seriesById("CC-PASS10-FRED-BEA-US-REAL-GDP", "geo:us");
const comp = seriesById("CC-PASS10-FRED-BLS-REAL-HOURLY-COMP", "geo:us");
const prod = seriesById("CC-PASS10-FRED-BLS-LABOR-PRODUCTIVITY", "geo:us");

if (!assetTop1 || !assetBot50) {
  throw new Error("DFA asset-share densify series missing — import Pass 10 density export first");
}
if (!receipts || !outlays || !debt) {
  throw new Error("Fiscal %GDP densify series missing — import Pass 10 density export first");
}

const densifyIds = new Set([
  "CC-PASS10-FRED-DFA-TOP1-ASSET-SHARE",
  "CC-PASS10-FRED-DFA-P90-P99-ASSET-SHARE",
  "CC-PASS10-FRED-DFA-P50-P90-ASSET-SHARE",
  "CC-PASS10-FRED-DFA-BOTTOM50-ASSET-SHARE",
  "CC-PASS10-FRED-DFA-TOP1-FINANCIAL-ASSET-SHARE",
  "CC-PASS10-FRED-BEA-US-REAL-GDP",
  "CC-PASS10-FRED-BEA-AR-REAL-GDP",
  "CC-PASS10-FRED-BEA-US-PERSONAL-INCOME-ANNUAL",
  "CC-PASS10-FRED-BEA-AR-PERSONAL-INCOME",
  "CC-PASS10-FRED-BEA-REAL-DPI-PER-CAPITA",
  "CC-PASS10-FRED-BEA-REAL-DPI",
  "CC-PASS10-FRED-BEA-COMPENSATION-WAGES",
  "CC-PASS10-FRED-BEA-PROPRIETORS-INCOME",
  "CC-PASS10-FRED-BEA-US-FARM-PROPRIETORS-INCOME",
  "CC-PASS10-FRED-BEA-AR-FARM-PROPRIETORS-INCOME",
  "CC-PASS10-FRED-BEA-TRANSFER-RECEIPTS",
  "CC-PASS10-FRED-BEA-CORPORATE-PROFITS",
  "CC-PASS10-FRED-OMB-RECEIPTS-PCT-GDP",
  "CC-PASS10-FRED-OMB-OUTLAYS-PCT-GDP",
  "CC-PASS10-FRED-DEBT-HELD-BY-PUBLIC-PCT-GDP",
  "CC-PASS10-FRED-BLS-REAL-HOURLY-COMP",
  "CC-PASS10-FRED-BLS-LABOR-PRODUCTIVITY",
]);

function mergeSeries(sys, rows) {
  const keep = (sys.series_points || []).filter((s) => !densifyIds.has(String(s.series_id || "")));
  sys.series_points = [...keep, ...rows.filter(Boolean)];
}

const assetNote =
  "Share of Total Assets (DFA via FRED) — matches baseline W02 product. Distinct from net-worth shares already bound.";
const fiscalNote =
  "OMB/Treasury×BEA identities via FRED — not CBO Historical Budget Data and not tax-rate-by-income tables.";

// --- WEALTH BASELINE ---
{
  const p = find("CC-EP-WEALTH-BASELINE-1");
  const sys = p.evidence_system || {};
  mergeSeries(sys, [
    row("CC-PASS10-FRED-DFA-TOP1-ASSET-SHARE", "geo:us", "DFA top 1% asset share", pct1, assetNote),
    row("CC-PASS10-FRED-DFA-P90-P99-ASSET-SHARE", "geo:us", "DFA 90–99 asset share", pct1, assetNote),
    row("CC-PASS10-FRED-DFA-P50-P90-ASSET-SHARE", "geo:us", "DFA 50–90 asset share", pct1, assetNote),
    row(
      "CC-PASS10-FRED-DFA-BOTTOM50-ASSET-SHARE",
      "geo:us",
      "DFA bottom 50% asset share",
      pct1,
      assetNote,
    ),
    row(
      "CC-PASS10-FRED-DFA-TOP1-FINANCIAL-ASSET-SHARE",
      "geo:us",
      "DFA top 1% financial-asset share",
      pct1,
      "Financial-asset composition — not a prosperity score.",
    ),
  ]);
  const lt = latest(assetTop1);
  const lb = latest(assetBot50);
  if (lt && lb) {
    sys.comparison = [
      ...((sys.comparison || []).filter((c) => !String(c.label || "").includes("asset shares"))),
      {
        label: "Bottom 50% / top 1% asset shares (DFA via FRED)",
        value: `${pct1(lb.value)} / ${pct1(lt.value)} (${lt.period})`,
        note: assetNote,
      },
    ];
  }
  sys.series_status = "dfa_asset_and_net_worth_paths_bound";
  sys.series_note =
    "Pass 10 densify attaches DFA asset-share histories alongside prior net-worth paths. Asset ≠ net worth ≠ SCF levels ≠ capture.";
  p.evidence_system = sys;
  p.last_updated = { date: "2026-08-12", dataset_or_release: `reddirt ${exportId} Pass 10 densify` };
}

// --- OWNERSHIP ---
{
  const p = find("CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1");
  const sys = p.evidence_system || {};
  mergeSeries(sys, [
    row("CC-PASS10-FRED-DFA-TOP1-ASSET-SHARE", "geo:us", "DFA top 1% asset share", pct1, assetNote),
    row(
      "CC-PASS10-FRED-DFA-BOTTOM50-ASSET-SHARE",
      "geo:us",
      "DFA bottom 50% asset share",
      pct1,
      assetNote,
    ),
    row(
      "CC-PASS10-FRED-BEA-REAL-DPI-PER-CAPITA",
      "geo:us",
      "BEA real DPI per capita",
      usd,
      "Income flow — not retirement adequacy or ownership redesign proof.",
    ),
    row(
      "CC-PASS10-FRED-BEA-COMPENSATION-WAGES",
      "geo:us",
      "BEA wage and salary disbursements",
      usdB,
      "Labor-income flow via BEA — not wealth share.",
    ),
    row(
      "CC-PASS10-FRED-BEA-PROPRIETORS-INCOME",
      "geo:us",
      "BEA proprietors' income",
      usdB,
      "Small-owner income flow ≠ wealth concentration share.",
    ),
  ]);
  sys.series_status = "dfa_paths_and_bea_income_flows_bound_scf_still_blocked";
  sys.missing_layers = (sys.missing_layers || []).filter(
    (x) => !String(x).includes("DFA wealth shares quarterly path"),
  );
  p.evidence_system = sys;
  p.last_updated = { date: "2026-08-12", dataset_or_release: `reddirt ${exportId} Pass 10 densify` };
}

// --- RURAL ---
{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};
  mergeSeries(sys, [
    row(
      "CC-PASS10-FRED-BEA-AR-REAL-GDP",
      "geo:us-ar",
      "BEA Arkansas real GDP",
      (v) => "$" + (v / 1000).toFixed(1) + "B",
      "Real state output — not rural-only and not capture.",
    ),
    row(
      "CC-PASS10-FRED-BEA-US-REAL-GDP",
      "geo:us",
      "BEA US real GDP",
      (v) => "$" + (v / 1000).toFixed(1) + "T",
      "National real GDP companion.",
    ),
    row(
      "CC-PASS10-FRED-BEA-AR-PERSONAL-INCOME",
      "geo:us-ar",
      "BEA Arkansas total personal income",
      usdM,
      "State income level — complements PCPI; not local ownership.",
    ),
    row(
      "CC-PASS10-FRED-BEA-AR-FARM-PROPRIETORS-INCOME",
      "geo:us-ar",
      "BEA Arkansas farm proprietors' income",
      usdM,
      "Income flow complementary to NASS farm structure — not causation of consolidation.",
    ),
    row(
      "CC-PASS10-FRED-BEA-US-FARM-PROPRIETORS-INCOME",
      "geo:us",
      "BEA US farm proprietors' income",
      usdB,
      "National farm income companion to NASS structure.",
    ),
    row(
      "CC-PASS10-FRED-BEA-TRANSFER-RECEIPTS",
      "geo:us",
      "BEA personal current transfer receipts",
      usdB,
      "Transfer structure — not poverty adequacy.",
    ),
  ]);
  const laf = latest(arFarm);
  const luf = latest(usFarm);
  const lar = latest(arRealGdp);
  if (laf || lar) {
    sys.geography_contrast = [
      ...((sys.geography_contrast || []).filter(
        (g) =>
          !String(g.label || "").includes("farm proprietors") &&
          !String(g.label || "").includes("real GDP"),
      )),
      lar
        ? {
            label: "Arkansas real GDP (BEA via FRED)",
            value: `$${(lar.value / 1000).toFixed(1)}B (${lar.period})`,
            note: "Complements county NASS structure; does not explain consolidation causes.",
          }
        : null,
      laf
        ? {
            label: "Arkansas farm proprietors' income (BEA via FRED)",
            value: `${usdM(laf.value)} (${laf.period})` + (luf ? `; US ${usdB(luf.value)}` : ""),
            note: "Income ≠ structure ≠ market power. Complements county NASS ops/acres/sales.",
          }
        : null,
    ].filter(Boolean);
  }
  sys.series_status = "county_nass_and_pass10_fred_bea_density_bound";
  p.evidence_system = sys;
  p.last_updated = { date: "2026-08-12", dataset_or_release: `reddirt ${exportId} Pass 10 densify` };
}

// --- FISCAL ---
{
  const p = find("CC-EP-FISCAL-REVENUE-SYSTEM-1");
  const sys = p.evidence_system || {};
  mergeSeries(sys, [
    row(
      "CC-PASS10-FRED-OMB-RECEIPTS-PCT-GDP",
      "geo:us",
      "Federal receipts % GDP",
      pct1,
      fiscalNote,
    ),
    row(
      "CC-PASS10-FRED-OMB-OUTLAYS-PCT-GDP",
      "geo:us",
      "Federal net outlays % GDP",
      pct1,
      fiscalNote,
    ),
    row(
      "CC-PASS10-FRED-DEBT-HELD-BY-PUBLIC-PCT-GDP",
      "geo:us",
      "Debt held by public % GDP",
      pct1,
      fiscalNote,
    ),
    row(
      "CC-PASS10-FRED-BEA-CORPORATE-PROFITS",
      "geo:us",
      "BEA corporate profits after tax",
      usdB,
      "Income-side structure — not markups and not capture.",
    ),
  ]);
  const lr = latest(receipts);
  const lo = latest(outlays);
  const ld = latest(debt);
  if (lr && lo) {
    sys.comparison = [
      ...((sys.comparison || []).filter((c) => !String(c.label || "").includes("Receipts vs outlays"))),
      {
        label: "Receipts vs outlays (latest FRED/OMB identities)",
        value: `${pct1(lr.value)} vs ${pct1(lo.value)} of GDP (${lr.period})`,
        note: fiscalNote,
      },
      ld
        ? {
            label: "Debt held by the public",
            value: `${pct1(ld.value)} of GDP (${ld.period})`,
            note: fiscalNote,
          }
        : null,
    ].filter(Boolean);
    sys.observation_history = [
      ...((sys.observation_history || []).filter(
        (h) => !String(h.label || "").includes("Federal %GDP path"),
      )),
      {
        period: `${coverage(receipts)}`,
        value: `receipts ${pct1(lr.value)}; outlays ${pct1(lo.value)}${ld ? `; debt ${pct1(ld.value)}` : ""}`,
        label: "Federal %GDP path (OMB/Treasury via FRED)",
        geography: "US",
        note: fiscalNote,
      },
    ];
  }
  sys.series_status = "fred_omb_treasury_pct_gdp_bound_cbo_tax_tables_still_blocked";
  sys.series_note =
    "Pass 10 densify binds long federal receipts/outlays/debt %GDP histories via FRED. CBO tax-rate-by-income and revenue-composition adapters remain separate. Federal identities ≠ state/local no-PIT redesign proof.";
  sys.missing_layers = (sys.missing_layers || []).filter(
    (m) => !String(m).includes("receipts/outlays/debt % GDP multi-decade path"),
  );
  p.evidence_system = sys;
  p.last_updated = { date: "2026-08-12", dataset_or_release: `reddirt ${exportId} Pass 10 densify` };
}

// --- WAGES / PRODUCTIVITY (optional awkward FRED redistribution of BLS) ---
{
  const p = find("CC-EP-WAGES-PRODUCTIVITY-1");
  if (p && (comp || prod)) {
    const sys = p.evidence_system || {};
    mergeSeries(sys, [
      row(
        "CC-PASS10-FRED-BLS-REAL-HOURLY-COMP",
        "geo:us",
        "BLS real hourly compensation (via FRED)",
        idx1,
        "BLS producer; FRED channel. Complements Pass 6 CES arrays.",
      ),
      row(
        "CC-PASS10-FRED-BLS-LABOR-PRODUCTIVITY",
        "geo:us",
        "BLS labor productivity OPH (via FRED)",
        idx1,
        "BLS producer; FRED channel. Productivity ≠ compensation adequacy.",
      ),
    ]);
    sys.series_status = (sys.series_status || "") + "_pass10_fred_bls_comp_prod_bound";
    p.evidence_system = sys;
    p.last_updated = {
      date: "2026-08-12",
      dataset_or_release: `reddirt ${exportId} Pass 10 densify`,
    };
  }
}

data.pass_10_density_rule =
  "BEA-first densify via FRED channel; preserve original producer; bind existing panels only; 0 new panels; structure ≠ capture.";
data.pass_10_density_export_id = exportId;
data.pass_10_density_bound_at = new Date().toISOString();

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");

const summary = {
  slice_id: "RCIP-PASS-10-FRED-BEA-MACRO-WEALTH-GAPS-DENSITY-1.0",
  export_id: exportId,
  panels_touched: [
    "CC-EP-WEALTH-BASELINE-1",
    "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
    "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
    "CC-EP-FISCAL-REVENUE-SYSTEM-1",
    "CC-EP-WAGES-PRODUCTIVITY-1",
  ],
  new_panels: 0,
  latest: {
    top1_asset: latest(assetTop1) && {
      period: latest(assetTop1).period,
      value: pct1(latest(assetTop1).value),
    },
    bottom50_asset: latest(assetBot50) && {
      period: latest(assetBot50).period,
      value: pct1(latest(assetBot50).value),
    },
    receipts_pct_gdp: latest(receipts) && {
      period: latest(receipts).period,
      value: pct1(latest(receipts).value),
    },
    outlays_pct_gdp: latest(outlays) && {
      period: latest(outlays).period,
      value: pct1(latest(outlays).value),
    },
    debt_pct_gdp: latest(debt) && {
      period: latest(debt).period,
      value: pct1(latest(debt).value),
    },
    ar_farm_income: latest(arFarm) && {
      period: latest(arFarm).period,
      value: usdM(latest(arFarm).value),
    },
    ar_real_gdp: latest(arRealGdp) && {
      period: latest(arRealGdp).period,
      value: "$" + (latest(arRealGdp).value / 1000).toFixed(1) + "B",
    },
  },
  distinction:
    "FRED/BEA establish macro and wealth-structure histories. They do not by themselves establish market power or political capture.",
};

console.log(JSON.stringify(summary, null, 2));
