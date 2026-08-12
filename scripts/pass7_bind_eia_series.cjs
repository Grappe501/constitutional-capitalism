/**
 * RCIP-PASS-7 / CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-7.0
 * Bind EIA series-arrays into existing energy evidence system (no new panels).
 * Energy data describes the system; it does not prove the prosperity-fund model.
 */
const fs = require("fs");

const arrays = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/series-arrays.json", "utf8")
);
const importMeta = JSON.parse(
  fs.readFileSync("data/imports/reddirt-public-statistics/manifest.json", "utf8")
);
const panelsPath = "data/project/publication_evidence_panels.json";
const data = JSON.parse(fs.readFileSync(panelsPath, "utf8"));

const exportId = importMeta.export_id || "unknown";

function seriesById(id, geo) {
  return arrays.series.find(
    (s) => s.consumer_metric_id === id && (!geo || s.geography_id === geo)
  );
}

function toPoints(series, max = 16) {
  if (!series) return [];
  const pts = series.points
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .map((p) => ({
      period: String(p.period),
      value: String(p.value),
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
    const k = p.period;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
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

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

const tepr = seriesById("CC-PASS7-EIA-TEPRBUS", "geo:us");
const tetc = seriesById("CC-PASS7-EIA-TETCBUS", "geo:us");
const teex = seriesById("CC-PASS7-EIA-TEEXBUS", "geo:us");
const teim = seriesById("CC-PASS7-EIA-TEIMBUS", "geo:us");
const teni = seriesById("CC-PASS7-EIA-TENIBUS", "geo:us");
const elet = seriesById("CC-PASS7-EIA-ELETPUS", "geo:us");
const papr = seriesById("CC-PASS7-EIA-PAPRPUS", "geo:us");
const ngmp = seriesById("CC-PASS7-EIA-NGMPPUS", "geo:us");
const usRes = seriesById("CC-PASS7-EIA-US-RES-PRICE", "geo:us");
const arRes = seriesById("CC-PASS7-EIA-AR-RES-PRICE", "geo:us-ar");
const usSales = seriesById("CC-PASS7-EIA-US-ALL-SALES", "geo:us");
const arSales = seriesById("CC-PASS7-EIA-AR-ALL-SALES", "geo:us-ar");

const attached = [tepr, tetc, teex, teim, teni, elet, papr, ngmp, usRes, arRes, usSales, arSales].filter(
  Boolean
);
if (attached.length < 1) {
  throw new Error("No Pass 7 EIA series found in series-arrays.json — import export first");
}

const p = find("CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1");
const sys = p.evidence_system || {};

sys.series_points = [
  {
    series_id: "CC-PASS7-EIA-TEPRBUS",
    label: "US total primary energy production (quads)",
    source: `EIA MER TEPRBUS via RedDirt ${exportId}`,
    point_count: tepr?.points?.length || 0,
    coverage: coverage(tepr),
    definition_note: "Official MER annual series. Describes production scale — not public-return capture.",
    points: toPoints(tepr, 14),
  },
  {
    series_id: "CC-PASS7-EIA-TETCBUS",
    label: "US total primary energy consumption (quads)",
    source: `EIA MER TETCBUS via RedDirt ${exportId}`,
    point_count: tetc?.points?.length || 0,
    coverage: coverage(tetc),
    points: toPoints(tetc, 14),
  },
  {
    series_id: "CC-PASS7-EIA-TENIBUS",
    label: "US total energy net imports (quads; negative = net exports)",
    source: `EIA MER TENIBUS via RedDirt ${exportId}`,
    point_count: teni?.points?.length || 0,
    coverage: coverage(teni),
    definition_note: "Negative values mean net exports. Do not invent a prosperity score from this path.",
    points: toPoints(teni, 14),
  },
  {
    series_id: "CC-PASS7-EIA-ELETPUS",
    label: "US electricity net generation",
    source: `EIA MER ELETPUS via RedDirt ${exportId}`,
    point_count: elet?.points?.length || 0,
    coverage: coverage(elet),
    points: toPoints(elet, 14),
  },
  {
    series_id: "CC-PASS7-EIA-PAPRPUS",
    label: "US crude oil production",
    source: `EIA MER PAPRPUS via RedDirt ${exportId}`,
    point_count: papr?.points?.length || 0,
    coverage: coverage(papr),
    definition_note: "MER annual path; STEO-linked current endpoints in registry may revise separately.",
    points: toPoints(papr, 14),
  },
  {
    series_id: "CC-PASS7-EIA-NGMPPUS",
    label: "US natural gas marketed production",
    source: `EIA MER NGMPPUS via RedDirt ${exportId}`,
    point_count: ngmp?.points?.length || 0,
    coverage: coverage(ngmp),
    definition_note:
      "MER marketed production (NGMPPUS). Not labeled as dry production — NGMPBUS returned zero rows on total-energy.",
    points: toPoints(ngmp, 14),
  },
  {
    series_id: "CC-PASS7-EIA-US-RES-PRICE",
    label: "US residential electricity average price (¢/kWh)",
    source: `EIA electricity/retail-sales via RedDirt ${exportId}`,
    point_count: usRes?.points?.length || 0,
    coverage: coverage(usRes),
    points: toPoints(usRes, 14),
  },
  {
    series_id: "CC-PASS7-EIA-AR-RES-PRICE",
    label: "Arkansas residential electricity average price (¢/kWh)",
    source: `EIA electricity/retail-sales via RedDirt ${exportId}`,
    point_count: arRes?.points?.length || 0,
    coverage: coverage(arRes),
    definition_note: "AR vs US price comparison uses the same EIA retail-sales object/definition.",
    points: toPoints(arRes, 14),
  },
  {
    series_id: "CC-PASS7-EIA-US-ALL-SALES",
    label: "US electricity sales (all sectors, million kWh)",
    source: `EIA electricity/retail-sales via RedDirt ${exportId}`,
    point_count: usSales?.points?.length || 0,
    coverage: coverage(usSales),
    points: toPoints(usSales, 14),
  },
  {
    series_id: "CC-PASS7-EIA-AR-ALL-SALES",
    label: "Arkansas electricity sales (all sectors, million kWh)",
    source: `EIA electricity/retail-sales via RedDirt ${exportId}`,
    point_count: arSales?.points?.length || 0,
    coverage: coverage(arSales),
    points: toPoints(arSales, 14),
  },
].filter((s) => s.point_count > 0);

sys.observation_history = [
  ...(teni
    ? [
        {
          period: coverage(teni),
          value: (() => {
            const last = latest(teni);
            return last
              ? `${last.value} quads net imports in ${last.period} (negative = net exports)`
              : "attached";
          })(),
          label: "Primary energy net-import path (MER TENIBUS)",
          geography: "US",
          note: `Full annual path attached from ${exportId}; structural endpoint CC-SRC-056 remains valid for narrative endpoints.`,
        },
      ]
    : []),
  ...(elet
    ? [
        {
          period: coverage(elet),
          value: (() => {
            const last = latest(elet);
            return last ? `${last.value} (${last.period})` : "attached";
          })(),
          label: "Electricity net generation path (MER ELETPUS)",
          geography: "US",
        },
      ]
    : []),
  ...(usRes && arRes
    ? [
        {
          period: coverage(arRes),
          value: (() => {
            const u = latest(usRes);
            const a = latest(arRes);
            return u && a
              ? `AR ${a.value} vs US ${u.value} ¢/kWh (${a.period})`
              : "attached";
          })(),
          label: "Residential electricity price AR vs US",
          geography: "AR / US",
        },
      ]
    : []),
  {
    period: "2016→2025",
    value: "LNG exports 0.5 → 15.0 Bcf/d",
    label: "LNG export growth endpoints (registry; not MER quads)",
    geography: "US",
    source_id: "CC-SRC-061",
    note: "Kept as sourced endpoints; dedicated LNG Bcf/d annual adapter not in this Pass 7 slice.",
  },
];

sys.geography_contrast = [
  {
    label: "Arkansas vs US residential electricity price",
    value:
      arRes && usRes
        ? (() => {
            const u = latest(usRes);
            const a = latest(arRes);
            return a && u ? `AR ${a.value} vs US ${u.value} ¢/kWh (${a.period})` : "ATTACHED";
          })()
        : "NOT ATTACHED",
    note: arRes
      ? "Same EIA retail-sales definition — valid AR/US contrast."
      : "PASS5-DEM-ENERGY-AR price layer still missing.",
  },
  {
    label: "Arkansas vs US electricity sales (all sectors)",
    value:
      arSales && usSales
        ? (() => {
            const u = latest(usSales);
            const a = latest(arSales);
            return a && u
              ? `AR ${a.value} vs US ${u.value} million kWh (${a.period})`
              : "ATTACHED";
          })()
        : "NOT ATTACHED",
    note: arSales
      ? "Sales volumes describe scale, not affordability or ownership."
      : "Sales contrast pending.",
  },
  {
    label: "Arkansas production / capacity / ownership / reliability",
    value: "NOT ATTACHED",
    note: "Reliability (RCIP-DEM-0423) and ownership (RCIP-DEM-0424) remain blocked without defensible official series.",
  },
];

sys.series_note =
  "Pass 7 attached EIA Open Data v2 MER + retail-sales annual arrays into this existing system. Structural registry endpoints (CC-SRC-056–061) remain; arrays deepen history. Energy facts do not prove prosperity-fund design.";
sys.series_status = "eia_arrays_partial_reliability_ownership_blocked";
sys.missing_layers = [
  "LNG Bcf/d dedicated annual series (registry endpoints only) — optional next EIA object",
  "Generation capacity / nameplate where a stable EIA object is mapped",
  "Reliability metrics (SAIDI/SAIFI or equivalent) — RCIP-DEM-0423 still blocked",
  "IOU / municipal / cooperative customer-share ownership — RCIP-DEM-0424 still blocked",
  "Arkansas primary energy production/consumption accounts beyond electricity sales/prices",
  "Public-return / prosperity-fund outcome metrics (definition lock — do not invent)",
];
sys.qualification =
  "Production, exports, generation, and price histories describe the energy system. They do not measure public capture of energy rents, People’s Energy Dividend feasibility, or community hosting outcomes. Do not promote these series into baseline prosperity metrics without ontology lock.";

p.evidence_system = sys;
p.evidence_strength = "Partial";
p.strength_note =
  "Stronger for MER production/consumption/net-trade and retail electricity price/sales histories now attached. Still partial: reliability, ownership, capacity, and prosperity-fund outcomes remain unattached or definition-locked.";

const lastTeni = latest(teni);
const lastTepr = latest(tepr);
const lastElet = latest(elet);
const lastAr = latest(arRes);
const lastUs = latest(usRes);

p.what_the_data_show = {
  key_finding: [
    lastTepr && lastTeni
      ? `EIA MER arrays now show U.S. primary energy production and net-trade paths through ${lastTepr.period} (latest production ${lastTepr.value} quads; latest net imports ${lastTeni.value} quads — negative means net exports).`
      : "EIA MER arrays attached for primary energy balance.",
    lastElet ? `Electricity net generation path attached through ${lastElet.period}.` : null,
    lastAr && lastUs
      ? `Arkansas residential electricity price contrasts with the U.S. under the same EIA retail-sales definition (latest AR ${lastAr.value} vs US ${lastUs.value} ¢/kWh in ${lastAr.period}).`
      : null,
    "These histories deepen the energy page’s empirical foundation; they do not validate a National Energy Prosperity Fund.",
  ]
    .filter(Boolean)
    .join(" "),
  critical_numbers: [
    ...(lastTeni
      ? [
          {
            label: "Net primary energy imports (negative = exports)",
            value: String(lastTeni.value),
            period: String(lastTeni.period),
            geography: "US",
            note: `MER TENIBUS via ${exportId}`,
          },
        ]
      : []),
    ...(lastTepr
      ? [
          {
            label: "Primary energy production",
            value: `${lastTepr.value} quads`,
            period: String(lastTepr.period),
            geography: "US",
            note: `MER TEPRBUS via ${exportId}`,
          },
        ]
      : []),
    ...(lastAr && lastUs
      ? [
          {
            label: "Residential electricity price AR vs US",
            value: `AR ${lastAr.value} / US ${lastUs.value} ¢/kWh`,
            period: String(lastAr.period),
            geography: "AR / US",
          },
        ]
      : []),
    {
      label: "LNG exports (registry endpoint)",
      value: "15.0 Bcf/d",
      period: "2025 (from 0.5 in 2016)",
      geography: "US",
      source_id: "CC-SRC-061",
    },
  ],
  plain_english:
    "The energy page can now show real multi-year production, trade, generation, and electricity-price histories under EIA definitions — while still saying clearly what is missing (reliability, ownership, fund outcomes).",
};

p.what_supports_this = [
  `EIA Open Data v2 MER + retail-sales via RedDirt ${exportId}`,
  "EIA Today in Energy / Energy Explained (CC-SRC-056/057/058/060/061)",
  "DOE Natural Gas Imports and Exports Monthly (CC-SRC-059)",
];
p.what_challenges_it = [
  "Attached histories ≠ public-return or dividend feasibility",
  "Net exporter status ≠ energy autarky or household affordability",
  "Reliability and ownership layers still blocked",
];
p.what_we_dont_know = [
  "Defensible official reliability series in-repo",
  "IOU/muni/coop ownership shares",
  "Prosperity-fund distributable outcomes (modeling 0%)",
];
p.last_updated = {
  date: "2026-08-11",
  dataset_or_release: `Pass 7 — EIA arrays bound from ${exportId}`,
};

data.version = "1.6.0";
data.pass_summary = {
  pass: "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-7.0",
  slice_id: "RCIP-PASS-7-AGENCY-ADAPTER-EXPANSION-AND-EVIDENCE-SYSTEM-BINDING-1.0",
  panels_total: 18,
  panels_added_pass_7: 0,
  systems_deepened_with_arrays: 4,
  export_id: exportId,
  observation_count: importMeta.observation_count || null,
  preference: "adapter_expansion_then_bind_only",
  energy_rcip_0418_0425: "partial_eia_arrays_bound_reliability_ownership_blocked",
  baseline_impact: "none — no ontology promotion",
  note: "EIA adapter retrieved demanded MER/retail series and bound into CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1. FRED/FDIC/HRSA/CBO/SCF still next. No prosperity-fund claims from energy facts.",
};
data.pass_7_rule =
  "Existing publication demand → exact source object → normalized series → credential-free export → bind into an existing evidence system. No generic warehouse expansion. No new panel unless unavoidable.";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      ok: true,
      export_id: exportId,
      series_bound: sys.series_points.map((s) => ({
        id: s.series_id,
        points: s.point_count,
        coverage: s.coverage,
      })),
      panel: "CC-EP-ENERGY-STRUCTURAL-ENDPOINTS-1",
    },
    null,
    2
  )
);
