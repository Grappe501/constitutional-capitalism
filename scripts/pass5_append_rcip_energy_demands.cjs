const fs = require("fs");
const path = "data/project/RCIP_PUBLICATION_DATA_DEMAND_MANIFEST.json";
const m = JSON.parse(fs.readFileSync(path, "utf8"));
const existing = new Set(m.demands.map((d) => d.demand_id));
const news = [
  {
    demand_id: "RCIP-DEM-0418",
    agency: "EIA",
    dataset: "Monthly Energy Review / Annual Energy Review",
    series: "primary energy production, consumption, and net exports (quads), annual",
    geography: "US (+ AR later)",
    retrieval_path: "official_machine_readable_file",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: [
      "data/project/energy_sovereignty_framework.json",
      "apps/book-site/src/pages/energy-sovereignty.astro",
      "data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json",
      "data/project/publication_evidence_panels.json",
    ],
    reuse_surfaces: ["energy_sovereignty", "publication_evidence_panels", "national_diagnosis"],
    notes: ["Pass 5 evidence-desert demand. Do not invent public-return metrics."],
    pass5_demand_id: "PASS5-DEM-ENERGY-MER",
  },
  {
    demand_id: "RCIP-DEM-0419",
    agency: "EIA",
    dataset: "Electricity",
    series: "electricity net generation (TWh) annual; generation capacity where comparable",
    geography: "US (+ AR later)",
    retrieval_path: "API",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty"],
    pass5_demand_id: "PASS5-DEM-ENERGY-ELEC",
  },
  {
    demand_id: "RCIP-DEM-0420",
    agency: "EIA",
    dataset: "Petroleum / STEO finalize",
    series: "crude oil production (mb/d) annual finalized",
    geography: "US (+ AR later)",
    retrieval_path: "API",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty"],
    pass5_demand_id: "PASS5-DEM-ENERGY-CRUDE",
  },
  {
    demand_id: "RCIP-DEM-0421",
    agency: "EIA / DOE",
    dataset: "Natural gas / petroleum trade",
    series: "LNG exports annual; petroleum net trade; crude vs products imports/exports",
    geography: "US",
    retrieval_path: "official_machine_readable_file",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty"],
    pass5_demand_id: "PASS5-DEM-ENERGY-TRADE",
  },
  {
    demand_id: "RCIP-DEM-0422",
    agency: "EIA / ACS / LEAD",
    dataset: "prices / energy burden",
    series: "electricity prices and/or household energy burden (definition lock first)",
    geography: "US / AR",
    retrieval_path: "API",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty"],
    notes: ["Definition lock required before ingest."],
    pass5_demand_id: "PASS5-DEM-ENERGY-PRICES",
  },
  {
    demand_id: "RCIP-DEM-0423",
    agency: "EIA / OE",
    dataset: "reliability",
    series: "reliability metrics where measurable and definition-locked",
    geography: "US / AR if available",
    retrieval_path: "official_machine_readable_file",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty"],
    notes: ["Definition lock required."],
    pass5_demand_id: "PASS5-DEM-ENERGY-RELIABILITY",
  },
  {
    demand_id: "RCIP-DEM-0424",
    agency: "EIA",
    dataset: "utility ownership structure",
    series: "IOU / municipal / cooperative customer shares or equivalent",
    geography: "US / AR",
    retrieval_path: "official_machine_readable_file",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty", "local_ownership"],
    pass5_demand_id: "PASS5-DEM-ENERGY-OWNERSHIP",
  },
  {
    demand_id: "RCIP-DEM-0425",
    agency: "EIA / state energy office",
    dataset: "Arkansas energy accounts",
    series: "Arkansas production by source, consumption, prices, generation capacity",
    geography: "AR",
    retrieval_path: "API",
    supporting_opportunity_ids: ["PASS5-ENERGY"],
    supporting_files: ["data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json"],
    reuse_surfaces: ["energy_sovereignty", "arkansas_baseline"],
    pass5_demand_id: "PASS5-DEM-ENERGY-AR",
  },
];
let added = 0;
for (const d of news) {
  if (!existing.has(d.demand_id)) {
    m.demands.push(d);
    added++;
  }
}
m.summary.unique_series_demands = m.demands.length;
m.notes = m.notes || [];
if (!m.notes.some((n) => String(n).includes("Pass 5 energy"))) {
  m.notes.push(
    "Pass 5 appended RCIP-DEM-0418–0425 energy desert demands from CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json."
  );
}
m.pass_5_extension = {
  slice_id: "CC-PUBLICATION-EVIDENCE-UPGRADE-PASS-5.0",
  added_demand_ids: news.map((d) => d.demand_id),
  backlog: "data/project/CC_PASS_5_EVIDENCE_DESERT_DATA_DEMAND_BACKLOG.json",
};
fs.writeFileSync(path, JSON.stringify(m, null, 2) + "\n");
console.log("RCIP demands", m.demands.length, "added", added);
