/**
 * RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0
 * Bind designated-county USDA NASS farm-structure arrays into existing rural/local-capital panel.
 * 0 new panels. farm structure ≠ market power ≠ monopsony ≠ political capture.
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

const COUNTIES = [
  { fips: "05001", geo: "geo:us-ar-05001", label: "Arkansas County", role: "commodity/export ag pair" },
  { fips: "05141", geo: "geo:us-ar-05141", label: "Van Buren County", role: "family/livestock/specialty ag pair (Clinton)" },
  { fips: "05129", geo: "geo:us-ar-05129", label: "Searcy County", role: "extreme rural" },
  { fips: "05093", geo: "geo:us-ar-05093", label: "Mississippi County", role: "Delta ag/industry" },
  { fips: "05073", geo: "geo:us-ar-05073", label: "Lafayette County", role: "extreme rural" },
  { fips: "05107", geo: "geo:us-ar-05107", label: "Phillips County", role: "West Helena / Delta distress county context" },
  { fips: "05145", geo: "geo:us-ar-05145", label: "White County", role: "Rose Bud surrounding county context" },
];

const METRICS = [
  { key: "FARM-OPERATIONS", label: "farm operations", format: "int" },
  { key: "ACRES-OPERATED", label: "acres operated", format: "acres" },
  { key: "AG-PRODUCT-SALES", label: "ag product sales", format: "usd" },
  { key: "CROP-SALES", label: "crop sales", format: "usd" },
  { key: "ANIMAL-PRODUCT-SALES", label: "animal product sales", format: "usd" },
  { key: "BROILER-INVENTORY", label: "broiler inventory", format: "int" },
  { key: "CATTLE-COWS-INVENTORY", label: "cattle cows inventory", format: "int" },
  { key: "CATTLE-INCL-CALVES", label: "cattle incl calves", format: "int" },
  { key: "HOGS-INVENTORY", label: "hogs inventory", format: "int" },
  { key: "LAYERS-INVENTORY", label: "layers inventory", format: "int" },
  { key: "RICE-ACRES", label: "rice acres harvested", format: "acres" },
  { key: "SOYBEAN-ACRES", label: "soybean acres harvested", format: "acres" },
  { key: "COTTON-ACRES", label: "cotton acres harvested", format: "acres" },
  { key: "CORN-GRAIN-ACRES", label: "corn grain acres harvested", format: "acres" },
  { key: "WHEAT-ACRES", label: "wheat acres harvested", format: "acres" },
  { key: "HAY-ACRES", label: "hay acres harvested", format: "acres" },
];

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

function toPoints(series, max = 8, format = (v) => String(v)) {
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

function fmtAcres(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  return Math.round(v).toLocaleString("en-US");
}

function fmtUsd(v) {
  if (v >= 1_000_000_000) return "$" + (v / 1_000_000_000).toFixed(2) + "B";
  if (v >= 1_000_000) return "$" + (v / 1_000_000).toFixed(1) + "M";
  return "$" + Math.round(v).toLocaleString("en-US");
}

function formatter(kind) {
  if (kind === "acres") return fmtAcres;
  if (kind === "usd") return fmtUsd;
  return fmtInt;
}

function find(id) {
  const p = data.panels.find((x) => x.panel_id === id);
  if (!p) throw new Error("missing " + id);
  return p;
}

const countySeriesRows = [];
const countyLatest = {};

for (const c of COUNTIES) {
  countyLatest[c.fips] = { label: c.label, role: c.role, metrics: {} };
  for (const m of METRICS) {
    const id = `CC-COUNTY-NASS-${c.fips}-${m.key}`;
    const series = seriesById(id, c.geo) || seriesById(id);
    if (!series?.points?.length) continue;
    const last = latest(series);
    countyLatest[c.fips].metrics[m.key] = last
      ? { period: last.period, value: Number(last.value) }
      : null;
    countySeriesRows.push({
      series_id: id,
      label: `${c.label} ${m.label}`,
      source: `USDA NASS Quick Stats via RedDirt ${exportId}`,
      point_count: series.points.length,
      coverage: coverage(series),
      definition_note:
        "County Census structure — not market power, monopsony, or political capture.",
      points: toPoints(series, 8, formatter(m.format)),
    });
  }
}

const ops2022 = COUNTIES.map((c) => {
  const m = countyLatest[c.fips].metrics["FARM-OPERATIONS"];
  return m ? { ...c, ops: m.value, period: m.period } : { ...c, ops: null, period: null };
}).filter((r) => r.ops != null);

if (!ops2022.length) {
  throw new Error("No county farm-operations series found — import county NASS export first");
}

const arCounty = countyLatest["05001"];
const vbCounty = countyLatest["05141"];

{
  const p = find("CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1");
  const sys = p.evidence_system || {};

  // Retain prior non-county series; replace prior county NASS rows if re-running.
  const retained = (sys.series_points || []).filter((s) => {
    const id = String(s.series_id || "");
    return !id.startsWith("CC-COUNTY-NASS-");
  });
  sys.series_points = [...retained, ...countySeriesRows];

  const priorGeo = (sys.geography_contrast || []).filter((g) => {
    const label = String(g.label || "").toLowerCase();
    return !label.includes("county farm") && !label.includes("designated ar counties");
  });

  const opsLine = ops2022
    .map((r) => `${r.label.replace(" County", "")} ${fmtInt(r.ops)}`)
    .join(" · ");

  const salesLine = COUNTIES.map((c) => {
    const m = countyLatest[c.fips].metrics["AG-PRODUCT-SALES"];
    return m ? `${c.label.replace(" County", "")} ${fmtUsd(m.value)}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  const broilerPresent = COUNTIES.filter(
    (c) => countyLatest[c.fips].metrics["BROILER-INVENTORY"]
  ).map((c) => c.label.replace(" County", ""));
  const broilerAbsent = COUNTIES.filter(
    (c) => !countyLatest[c.fips].metrics["BROILER-INVENTORY"]
  ).map((c) => c.label.replace(" County", ""));

  const cropSalesLine = COUNTIES.map((c) => {
    const m = countyLatest[c.fips].metrics["CROP-SALES"];
    return m ? `${c.label.replace(" County", "")} ${fmtUsd(m.value)}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  const animalSalesLine = COUNTIES.map((c) => {
    const m = countyLatest[c.fips].metrics["ANIMAL-PRODUCT-SALES"];
    return m ? `${c.label.replace(" County", "")} ${fmtUsd(m.value)}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  const riceLine = COUNTIES.map((c) => {
    const m = countyLatest[c.fips].metrics["RICE-ACRES"];
    return m ? `${c.label.replace(" County", "")} ${fmtAcres(m.value)}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  const hayLine = COUNTIES.map((c) => {
    const m = countyLatest[c.fips].metrics["HAY-ACRES"];
    return m ? `${c.label.replace(" County", "")} ${fmtAcres(m.value)}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  sys.geography_contrast = [
    ...priorGeo,
    {
      label: "Designated AR counties — 2022 farm operations",
      value: opsLine,
      note: "Same Census TOTAL operations definition across counties — structure contrast, not capture.",
    },
    {
      label: "Arkansas County vs Van Buren County (ag pair) — 2022 operations",
      value:
        arCounty?.metrics["FARM-OPERATIONS"] && vbCounty?.metrics["FARM-OPERATIONS"]
          ? `Arkansas Co ${fmtInt(arCounty.metrics["FARM-OPERATIONS"].value)} vs Van Buren ${fmtInt(vbCounty.metrics["FARM-OPERATIONS"].value)}`
          : "NOT ATTACHED",
      note: "Commodity/export vs family/livestock/specialty pair — archetypes not locked from this alone.",
    },
    {
      label: "Designated AR counties — latest ag product sales",
      value: salesLine || "NOT ATTACHED",
      note: "Sales structure ≠ market power ≠ monopsony.",
    },
    {
      label: "Designated AR counties — crop sales vs animal-product sales",
      value:
        cropSalesLine || animalSalesLine
          ? `Crops: ${cropSalesLine || "sparse"}. Animals: ${animalSalesLine || "sparse"}.`
          : "NOT ATTACHED",
      note: "Commodity-mix structure contrast — especially Delta crop counties vs Ozark livestock counties. Not causation.",
    },
    {
      label: "Rice acres harvested (where disclosed)",
      value: riceLine || "NOT ATTACHED / suppressed across designated set",
      note: "Rice marks commodity/export structure; absence/suppression in hill counties is structural evidence, not a slogan.",
    },
    {
      label: "Hay acres harvested (where disclosed)",
      value: hayLine || "NOT ATTACHED",
      note: "Hay often tracks livestock-oriented counties; complementary to rice/soy contrasts.",
    },
    {
      label: "Broiler inventory presence (disclosure-aware)",
      value: `Attached: ${broilerPresent.join(", ") || "none"}. Not attached / suppressed: ${broilerAbsent.join(", ") || "none"}.`,
      note: "Missing cells are disclosure/definition outcomes — not proof of absence of poultry economy narratives.",
    },
  ];

  sys.series_note = [
    sys.series_note || "",
    `County NASS density pass via ${exportId}: core ops/acres/sales/livestock plus crop/animal sales split, commodity acreage (rice/soy/cotton/corn/wheat/hay), and expanded livestock inventories where disclosure-safe. County sales-class still blocked. Structure ≠ market power ≠ monopsony ≠ capture. NASS shows what happened to structure, not why.`,
  ]
    .filter(Boolean)
    .join(" ");

  sys.series_status = "county_nass_density_bound_pass9_pass10_retained";
  sys.missing_layers = [
    ...(sys.missing_layers || []).filter(
      (m) =>
        !String(m).toLowerCase().includes("county farm") &&
        !String(m).toLowerCase().includes("county sales-class")
    ),
    "County sales-class (economic class) facets — Quick Stats 400 at county agg_level in this pass",
    "Operator/producer characteristic time series with locked definitions",
    "Market power / monopsony / political capture evidence (not NASS)",
    "Statewide all-county NASS panel (intentionally out of scope)",
  ];

  sys.qualification =
    "County NASS arrays show how designated Arkansas research geographies differ in farm count, acres, sales, and livestock structure. They do not prove that one county model is morally superior, and they do not establish market power, monopsony, or political capture. Rural Arkansas is not one farm economy.";

  p.evidence_system = sys;
  p.evidence_strength = "Strong";
  p.strength_note =
    "Stronger with designated-county farm-structure contrasts plus prior AR/US NASS and FDIC arrays. Still Partial for sales-class at county scale, operator characteristics, and capture claims. Structure ≠ capture.";

  const keyBits = [
    `Designated-county Census farm operations (latest): ${opsLine}.`,
    arCounty?.metrics["FARM-OPERATIONS"] && vbCounty?.metrics["FARM-OPERATIONS"]
      ? `Arkansas County (${fmtInt(arCounty.metrics["FARM-OPERATIONS"].value)}) vs Van Buren County (${fmtInt(vbCounty.metrics["FARM-OPERATIONS"].value)}) shows the ag-pair contrast without collapsing rural Arkansas into one economy.`
      : null,
    "Broiler inventories attach in some livestock/mountain counties and not in others — disclosure-aware structure, not a capture finding.",
    "These deepen family-farm, rural-capital, food-system, and LCL pages. They do not establish monopsony or political capture.",
  ].filter(Boolean);

  p.what_the_data_show = {
    ...(p.what_the_data_show || {}),
    key_finding: keyBits.join(" "),
    critical_numbers: [
      ...((p.what_the_data_show && p.what_the_data_show.critical_numbers) || []).filter(
        (n) => !String(n.label || "").toLowerCase().includes("county")
      ),
      ...ops2022.map((r) => ({
        label: `${r.label} farm operations`,
        value: fmtInt(r.ops),
        period: String(r.period),
        geography: r.label,
        note: `NASS Census via ${exportId}`,
      })),
    ],
    plain_english:
      "Family-farm and rural pages can now show that Arkansas County, Van Buren/Clinton, Searcy, Mississippi, Lafayette, Phillips/West Helena, and White/Rose Bud are different agricultural systems — not interchangeable 'rural Arkansas' — while keeping the hard line that structure evidence is not capture evidence.",
  };

  p.what_supports_this = [
    `USDA NASS Quick Stats county Census via RedDirt ${exportId}`,
    "Prior Pass 9 AR/US NASS farm-structure arrays",
    "FDIC BankFind Suite (Pass 8) and Census BDS (Pass 6)",
  ];
  p.what_challenges_it = [
    "farm structure ≠ market power ≠ monopsony ≠ political capture",
    "County sales-class facets failed Quick Stats (HTTP 400) in this pass",
    "Suppressed livestock cells are not narrative proof",
  ];
  p.what_we_dont_know = [
    "County economic-class sales shares under a disclosure-safe facet path",
    "Stable operator/producer characteristic paths at county scale",
    "Whether structural differences caused market power or political capture",
  ];
  p.last_updated = {
    date: "2026-08-12",
    dataset_or_release: `County NASS farm-structure arrays bound from ${exportId}`,
  };
}

data.pass_summary = {
  ...(data.pass_summary || {}),
  county_nass_farm_structure: {
    slice_id: "RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0",
    export_id: exportId,
    panels_touched: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"],
    new_panels: 0,
    counties: COUNTIES.map((c) => c.fips),
    series_bound: countySeriesRows.length,
    sales_class_status: "blocked_http_400_at_county_agg_level",
    distinction: "farm structure ≠ market power ≠ monopsony ≠ political capture",
    note: "Designated geographies only. Reusable across family-farm, rural prosperity, food systems, LCL pages via existing panel.",
  },
};
data.last_updated = "2026-08-12";

fs.writeFileSync(panelsPath, JSON.stringify(data, null, 2) + "\n");

console.log(
  JSON.stringify(
    {
      ok: true,
      export_id: exportId,
      panel: "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
      county_series_bound: countySeriesRows.length,
      ops_2022: Object.fromEntries(
        ops2022.map((r) => [r.fips, { label: r.label, ops: r.ops }])
      ),
      broiler_attached: COUNTIES.filter(
        (c) => countyLatest[c.fips].metrics["BROILER-INVENTORY"]
      ).map((c) => c.fips),
    },
    null,
    2
  )
);
