/**
 * RCIP-PASS-9 / CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-9.0
 * Bind USDA NASS farm-structure arrays into existing rural/local-capital panel.
 * 0 new panels. Production concentration ≠ market power ≠ monopsony ≠ political capture.
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

function earliest(series) {
  if (!series?.points?.length) return null;
  const sorted = [...series.points]
    .filter((p) => p.value != null && Number.isFinite(Number(p.value)))
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  return sorted[0] || null;
}

function toPoints(series, max = 10, format = (v) => String(v)) {
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

function fmtInt(v) {
  return Math.round(v).toLocaleString("en-US");
}

function fmtAcresM(v) {
  return (v / 1_000_000).toFixed(1) + "M";
}

function fmtUsdB(v) {
  return (v / 1_000_000_000).toFixed(1) + "B";
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

const usFarms = seriesById("CC-PASS9-NASS-US-FARM-OPERATIONS", "geo:us");
const arFarms = seriesById("CC-PASS9-NASS-AR-FARM-OPERATIONS", "geo:us-ar");
const usAcres = seriesById("CC-PASS9-NASS-US-ACRES-OPERATED", "geo:us");
const arAcres = seriesById("CC-PASS9-NASS-AR-ACRES-OPERATED", "geo:us-ar");
const usSales = seriesById("CC-PASS9-NASS-US-AG-PRODUCT-SALES", "geo:us");
const arSales = seriesById("CC-PASS9-NASS-AR-AG-PRODUCT-SALES", "geo:us-ar");
const usBroilers = seriesById("CC-PASS9-NASS-US-BROILER-INVENTORY", "geo:us");
const arBroilers = seriesById("CC-PASS9-NASS-AR-BROILER-INVENTORY", "geo:us-ar");
const usCows = seriesById("CC-PASS9-NASS-US-CATTLE-COWS-INVENTORY", "geo:us");
const arCows = seriesById("CC-PASS9-NASS-AR-CATTLE-COWS-INVENTORY", "geo:us-ar");
const usLt1k = seriesById("CC-PASS9-NASS-US-FARMS-BY-SALES-LT1K", "geo:us");
const arLt1k = seriesById("CC-PASS9-NASS-AR-FARMS-BY-SALES-LT1K", "geo:us-ar");
const usGe1m = seriesById("CC-PASS9-NASS-US-FARMS-BY-SALES-GE1M", "geo:us");
const arGe1m = seriesById("CC-PASS9-NASS-AR-FARMS-BY-SALES-GE1M", "geo:us-ar");

if (!usFarms || !arFarms) {
  throw new Error("NASS farm-operations series missing — import Pass 9 export first");
}

const lastUsFarms = latest(usFarms);
const lastArFarms = latest(arFarms);
const firstUsFarms = earliest(usFarms);
const firstArFarms = earliest(arFarms);
const lastUsAcres = latest(usAcres);
const lastArAcres = latest(arAcres);
const lastUsSales = latest(usSales);
const lastArSales = latest(arSales);
const lastUsBroilers = latest(usBroilers);
const lastArBroilers = latest(arBroilers);
const lastUsCows = latest(usCows);
const lastArCows = latest(arCows);
const lastUsLt1k = latest(usLt1k);
const lastArLt1k = latest(arLt1k);
const lastUsGe1m = latest(usGe1m);
const lastArGe1m = latest(arGe1m);

const arFarmShare2022 =
  lastArFarms && lastUsFarms
    ? (100 * Number(lastArFarms.value)) / Number(lastUsFarms.value)
    : null;
const arSalesClassLt1kShare =
  lastArLt1k && lastArFarms
    ? (100 * Number(lastArLt1k.value)) / Number(lastArFarms.value)
    : null;
const arSalesClassGe1mShare =
  lastArGe1m && lastArFarms
    ? (100 * Number(lastArGe1m.value)) / Number(lastArFarms.value)
    : null;
const usSalesClassLt1kShare =
  lastUsLt1k && lastUsFarms
    ? (100 * Number(lastUsLt1k.value)) / Number(lastUsFarms.value)
    : null;
const usSalesClassGe1mShare =
  lastUsGe1m && lastUsFarms
    ? (100 * Number(lastUsGe1m.value)) / Number(lastUsFarms.value)
    : null;

{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};
  const retained = (sys.series_points || []).filter((s) => {
    const id = String(s.series_id || "");
    return id.startsWith("CC-PASS6-BDS") || id.startsWith("CC-PASS8-FDIC");
  });

  const nassSeries = [
    {
      series_id: "CC-PASS9-NASS-US-FARM-OPERATIONS",
      label: "US farm operations (Census of Agriculture)",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: usFarms?.points?.length || 0,
      coverage: coverage(usFarms),
      definition_note: "Census TOTAL operations — structure history, not market power.",
      points: toPoints(usFarms, 10, fmtInt),
    },
    {
      series_id: "CC-PASS9-NASS-AR-FARM-OPERATIONS",
      label: "Arkansas farm operations (Census of Agriculture)",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: arFarms?.points?.length || 0,
      coverage: coverage(arFarms),
      definition_note: "Same Census TOTAL definition as US — valid AR/US contrast.",
      points: toPoints(arFarms, 10, fmtInt),
    },
    {
      series_id: "CC-PASS9-NASS-US-ACRES-OPERATED",
      label: "US acres operated",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: usAcres?.points?.length || 0,
      coverage: coverage(usAcres),
      points: toPoints(usAcres, 10, (v) => fmtAcresM(v)),
    },
    {
      series_id: "CC-PASS9-NASS-AR-ACRES-OPERATED",
      label: "Arkansas acres operated",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: arAcres?.points?.length || 0,
      coverage: coverage(arAcres),
      points: toPoints(arAcres, 10, (v) => fmtAcresM(v)),
    },
    {
      series_id: "CC-PASS9-NASS-US-AG-PRODUCT-SALES",
      label: "US ag product sales ($)",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: usSales?.points?.length || 0,
      coverage: coverage(usSales),
      points: toPoints(usSales, 10, (v) => fmtUsdB(v)),
    },
    {
      series_id: "CC-PASS9-NASS-AR-AG-PRODUCT-SALES",
      label: "Arkansas ag product sales ($)",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: arSales?.points?.length || 0,
      coverage: coverage(arSales),
      points: toPoints(arSales, 10, (v) => fmtUsdB(v)),
    },
    {
      series_id: "CC-PASS9-NASS-US-BROILER-INVENTORY",
      label: "US broiler inventory",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: usBroilers?.points?.length || 0,
      coverage: coverage(usBroilers),
      definition_note: "Commodity structure — inventory ≠ monopsony or packer power.",
      points: toPoints(usBroilers, 8, fmtInt),
    },
    {
      series_id: "CC-PASS9-NASS-AR-BROILER-INVENTORY",
      label: "Arkansas broiler inventory",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: arBroilers?.points?.length || 0,
      coverage: coverage(arBroilers),
      definition_note: "Commodity structure — inventory ≠ monopsony or packer power.",
      points: toPoints(arBroilers, 8, fmtInt),
    },
    {
      series_id: "CC-PASS9-NASS-US-CATTLE-COWS-INVENTORY",
      label: "US cattle cows inventory",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: usCows?.points?.length || 0,
      coverage: coverage(usCows),
      points: toPoints(usCows, 8, fmtInt),
    },
    {
      series_id: "CC-PASS9-NASS-AR-CATTLE-COWS-INVENTORY",
      label: "Arkansas cattle cows inventory",
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: arCows?.points?.length || 0,
      coverage: coverage(arCows),
      points: toPoints(arCows, 8, fmtInt),
    },
  ].filter((s) => s.point_count > 0);

  sys.series_points = [...retained, ...nassSeries];

  const priorGeo = (sys.geography_contrast || []).filter(
    (g) => !String(g.label || "").toLowerCase().includes("farm")
  );
  sys.geography_contrast = [
    ...priorGeo,
    {
      label: "Farm operations latest census (AR vs US)",
      value:
        lastArFarms && lastUsFarms
          ? `AR ${fmtInt(Number(lastArFarms.value))} vs US ${fmtInt(Number(lastUsFarms.value))} (${lastArFarms.period})`
          : "NOT ATTACHED",
      note: "NASS Census TOTAL operations — agricultural structure, not capture.",
    },
    {
      label: "Acres operated latest census (AR vs US)",
      value:
        lastArAcres && lastUsAcres
          ? `AR ${fmtAcresM(Number(lastArAcres.value))} vs US ${fmtAcresM(Number(lastUsAcres.value))} acres (${lastArAcres.period})`
          : "NOT ATTACHED",
      note: "FARM OPERATIONS - ACRES OPERATED.",
    },
    {
      label: "Ag product sales latest census (AR vs US)",
      value:
        lastArSales && lastUsSales
          ? `AR $${fmtUsdB(Number(lastArSales.value))} vs US $${fmtUsdB(Number(lastUsSales.value))} (${lastArSales.period})`
          : "NOT ATTACHED",
      note: "Sales concentration ≠ market power ≠ monopsony.",
    },
    {
      label: "2022 sales-class structure (AR vs US)",
      value:
        arSalesClassLt1kShare != null &&
        arSalesClassGe1mShare != null &&
        usSalesClassLt1kShare != null &&
        usSalesClassGe1mShare != null
          ? `AR <\$1k ${arSalesClassLt1kShare.toFixed(1)}% / ≥\$1M ${arSalesClassGe1mShare.toFixed(1)}% vs US <\$1k ${usSalesClassLt1kShare.toFixed(1)}% / ≥\$1M ${usSalesClassGe1mShare.toFixed(1)}%`
          : "NOT ATTACHED",
      note: "Economic-class operation shares — not a small-vs-large moral verdict.",
    },
  ];

  const priorHist = (sys.observation_history || []).filter(
    (h) => !String(h.label || "").toLowerCase().includes("farm operation")
  );
  sys.observation_history = [
    ...priorHist,
    ...(firstArFarms && lastArFarms
      ? [
          {
            period: coverage(arFarms),
            value: `${fmtInt(Number(firstArFarms.value))} → ${fmtInt(Number(lastArFarms.value))} AR farm operations`,
            label: "Arkansas farm operations path",
            geography: "AR",
            note: `USDA NASS Census via ${exportId}`,
          },
        ]
      : []),
    ...(firstUsFarms && lastUsFarms
      ? [
          {
            period: coverage(usFarms),
            value: `${fmtInt(Number(firstUsFarms.value))} → ${fmtInt(Number(lastUsFarms.value))} US farm operations`,
            label: "US farm operations path",
            geography: "US",
            note: `USDA NASS Census via ${exportId}`,
          },
        ]
      : []),
  ];

  sys.definition =
    "CM02 = Census rural population share. ERS nonmetro is a different geography. CM04/E01 = FDIC/NCUA local-capital shares. E02 = SBCS + FSA. BDS entry/exit rates = national establishment dynamics. NASS Census farm operations/acres/sales/livestock = agricultural structure histories (AR vs US).";
  sys.series_note = `Pass 9 attached USDA NASS Census farm-structure histories (operations, acres operated, ag product sales, broiler inventory, cattle-cows inventory) and 2022 sales-class bookends via ${exportId}. Pass 8 FDIC and Pass 6 BDS arrays retained. Production concentration ≠ market power ≠ monopsony ≠ political capture.`;
  sys.series_status = "nass_farm_structure_arrays_bound_fdic_retained";
  sys.missing_layers = [
    ...(sys.missing_layers || []).filter(
      (m) => !String(m).includes("NASS") && !String(m).includes("farm structure")
    ),
    "County farm-structure comparisons (disclosure-suppressed cells common)",
    "Operator/producer characteristic time series with locked definitions",
    "Market power / monopsony / political capture evidence (not NASS)",
  ];
  sys.qualification =
    "NASS arrays show how Arkansas and U.S. agricultural structure changed. They do not prove that small farms are good or large farms are bad, and they do not establish market power, monopsony, or political capture. Bank/branch structure remains local-capital infrastructure, not town prosperity proof.";

  p.evidence_system = sys;
  p.evidence_strength = "Strong";
  p.strength_note =
    "Stronger with NASS AR/US farm-structure histories plus FDIC local-capital arrays. Still Partial for county farm maps, QBP community-bank path, and community-level outcomes. Structure ≠ capture.";

  p.what_the_data_show = {
    key_finding: [
      lastArFarms && lastUsFarms
        ? `Census of Agriculture farm operations now show Arkansas ${fmtInt(Number(lastArFarms.value))} vs U.S. ${fmtInt(Number(lastUsFarms.value))} in ${lastArFarms.period}${arFarmShare2022 != null ? ` (AR ≈ ${arFarmShare2022.toFixed(2)}% of U.S. operations)` : ""}.`
        : "NASS farm operations attached.",
      firstArFarms && lastArFarms
        ? `Arkansas operations moved from ${fmtInt(Number(firstArFarms.value))} (${firstArFarms.period}) to ${fmtInt(Number(lastArFarms.value))} (${lastArFarms.period}).`
        : null,
      lastArSales && lastUsSales
        ? `Ag product sales: AR $${fmtUsdB(Number(lastArSales.value))} vs US $${fmtUsdB(Number(lastUsSales.value))} (${lastArSales.period}).`
        : null,
      lastArBroilers && lastUsBroilers
        ? `Broiler inventory (structure only): AR ${fmtInt(Number(lastArBroilers.value))} vs US ${fmtInt(Number(lastUsBroilers.value))} head (${lastArBroilers.period}).`
        : null,
      "These deepen agricultural structure under existing rural/community arguments. They do not establish monopsony or political capture.",
    ]
      .filter(Boolean)
      .join(" "),
    critical_numbers: [
      ...(lastArFarms && lastUsFarms
        ? [
            {
              label: "Farm operations AR vs US",
              value: `AR ${fmtInt(Number(lastArFarms.value))} / US ${fmtInt(Number(lastUsFarms.value))}`,
              period: String(lastArFarms.period),
              geography: "AR / US",
              note: `NASS Census via ${exportId}`,
            },
          ]
        : []),
      ...(lastArAcres && lastUsAcres
        ? [
            {
              label: "Acres operated AR vs US",
              value: `AR ${fmtAcresM(Number(lastArAcres.value))} / US ${fmtAcresM(Number(lastUsAcres.value))}`,
              period: String(lastArAcres.period),
              geography: "AR / US",
            },
          ]
        : []),
      ...(lastArSales && lastUsSales
        ? [
            {
              label: "Ag product sales AR vs US",
              value: `AR $${fmtUsdB(Number(lastArSales.value))} / US $${fmtUsdB(Number(lastUsSales.value))}`,
              period: String(lastArSales.period),
              geography: "AR / US",
              note: "Sales structure ≠ market power.",
            },
          ]
        : []),
      ...(arSalesClassGe1mShare != null && usSalesClassGe1mShare != null
        ? [
            {
              label: "Share of farms with sales ≥ $1M (2022)",
              value: `AR ${arSalesClassGe1mShare.toFixed(1)}% / US ${usSalesClassGe1mShare.toFixed(1)}%`,
              period: "2022",
              geography: "AR / US",
              note: "Economic-class bookend — not a moral ranking of farm size.",
            },
          ]
        : []),
    ],
    plain_english:
      "Rural and community pages can now show how Arkansas farm counts, acres, sales, and key livestock inventories changed across Census years beside U.S. totals — while keeping the hard line that structure evidence is not capture evidence.",
  };

  p.what_supports_this = [
    `USDA NASS Quick Stats Census via RedDirt ${exportId}`,
    `FDIC BankFind Suite via prior Pass 8 export`,
    "Census BDS entry/exit histories (Pass 6)",
  ];
  p.what_challenges_it = [
    "Production concentration ≠ market power ≠ monopsony ≠ political capture",
    "Statewide farm structure ≠ town prosperity or family-farm engine proof",
    "ERS family-farm production-value shares are a different series than NASS operation counts",
  ];
  p.what_we_dont_know = [
    "County farm-structure maps with disclosure-safe cells",
    "Stable operator/producer characteristic paths",
    "Whether sales-class concentration caused market power or political capture",
  ];
  p.last_updated = {
    date: "2026-08-11",
    dataset_or_release: `Pass 9 — NASS farm-structure arrays bound from ${exportId}`,
  };
}

data.version = data.version || "1.0";
data.pass_summary = {
  ...(data.pass_summary || {}),
  pass_9: {
    slice_id: "RCIP-PASS-9-USDA-NASS-FARM-STRUCTURE-ADAPTER-AND-PUBLICATION-BINDING-1.0",
    export_id: exportId,
    panels_touched: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"],
    new_panels: 0,
    distinction:
      "Production concentration ≠ market power ≠ monopsony ≠ political capture",
    note: "NASS farm-structure bind-only; FRED/BEA deferred; county/operator series deferred.",
  },
};
data.last_updated = "2026-08-11";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      ok: true,
      export_id: exportId,
      panel: "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
      nass_series_bound: [
        usFarms,
        arFarms,
        usAcres,
        arAcres,
        usSales,
        arSales,
        usBroilers,
        arBroilers,
        usCows,
        arCows,
      ].filter(Boolean).length,
      latest_ar_farms: lastArFarms && {
        period: lastArFarms.period,
        value: Number(lastArFarms.value),
      },
      latest_us_farms: lastUsFarms && {
        period: lastUsFarms.period,
        value: Number(lastUsFarms.value),
      },
    },
    null,
    2
  )
);
