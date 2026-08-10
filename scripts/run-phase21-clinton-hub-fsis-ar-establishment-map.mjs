/**
 * CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0
 *
 * Distinguishes: "Arkansas has inspected establishments"
 * from: "family farmers have practical access to adequate slaughter/processing."
 *
 * Hard boundaries: no invented wait times/pricing; no hub declaration before evidence;
 * plant count ≠ throughput; inspected ≠ available; no construction recommendation.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";
const MPI_SNAP =
  "research/phase_2/source_snapshots/fsis_mpi_directory_arkansas_2026-08-03.csv";
const MPI_EDITION = "2026-08-03";

function wj(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function wt(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}
function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const rows = [];
  for (const line of lines) {
    const out = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        q = !q;
        continue;
      }
      if (c === "," && !q) {
        out.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    out.push(cur);
    rows.push(out);
  }
  const headers = rows[0];
  return rows.slice(1).map((vals) => {
    const o = {};
    headers.forEach((h, i) => (o[h.trim()] = (vals[i] || "").trim()));
    return o;
  });
}
function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(lat2 - lat1);
  const dLon = toR(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function roadProxy(miles) {
  // Straight-line × 1.35 ≈ rough rural road proxy — NOT measured drive time.
  return {
    straight_line_miles: Math.round(miles * 10) / 10,
    estimated_road_miles_proxy: Math.round(miles * 1.35 * 10) / 10,
    estimated_drive_minutes_proxy: Math.round(miles * 1.35 * 1.4),
    confidence: "ESTIMATED_PROXY_NOT_ROUTED",
    note: "Do not treat as measured farmer travel pattern.",
  };
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const moduleDoc = JSON.parse(
  fs.readFileSync(
    r("research/phase_2/arkansas_livestock_monopsony_processing_access_module.json"),
    "utf8"
  )
);
const meatTrack = JSON.parse(
  fs.readFileSync(
    r("research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json"),
    "utf8"
  )
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));

const mpiRows = parseCsv(fs.readFileSync(r(MPI_SNAP), "utf8"));

const ACCESS_OVERRIDES = {
  "M46139+P46139+V46139": {
    access: "OPEN_TO_OUTSIDE_PRODUCERS",
    species_claim: ["cattle", "hogs", "goats", "buffalo", "poultry"],
    evidence: "Company location page: USDA Inspected beef/hogs/goats/buffalo; serves independent farmers",
    source_ids: ["CC-SRC-175"],
  },
  "M1025+P1025+V1025": {
    access: "OPEN_TO_OUTSIDE_PRODUCERS",
    species_claim: ["cattle", "hogs", "goats"],
    evidence:
      "FSIS lists Meat Slaughter; Cypress Valley affiliate page labels Custom Exempt — dual-status requires verification",
    source_ids: ["CC-SRC-172", "CC-SRC-175"],
    status_conflict: true,
  },
  "M10650+P10650+V10650": {
    access: "OPEN_TO_OUTSIDE_PRODUCERS",
    species_claim: ["cattle", "hogs", "goats", "poultry", "rabbit"],
    evidence: "Very small butcher shop with meat+poultry slaughter activities; CARES grant recipient",
    source_ids: ["CC-SRC-172", "CC-SRC-179"],
  },
  "M46910+P46910+V46910": {
    access: "OPEN_TO_OUTSIDE_PRODUCERS",
    species_claim: ["cattle", "hogs", "poultry"],
    evidence: "Listed among fee-for-service poultry processors; FSIS meat+poultry slaughter",
    source_ids: ["CC-SRC-172", "CC-SRC-176"],
  },
  "M10620+V10620": {
    access: "UNKNOWN",
    species_claim: ["cattle", "hogs"],
    evidence: "FSIS Very Small meat slaughter/processing; outside-producer acceptance not verified",
    source_ids: ["CC-SRC-172"],
  },
  M10624: {
    access: "PRIVATE_CAPTIVE",
    species_claim: ["cattle", "hogs"],
    evidence: "Arkansas Department of Corrections facility — not family-farm market access",
    source_ids: ["CC-SRC-172"],
  },
};

const INTEGRATED_NAME_RE =
  /Cargill|George'?s|Butterball|Bachoco|OK Foods|Conagra|Land O'?Frost|Boar'?s Head|Gerber/i;

function classifyFsis(row) {
  const acts = row.activities || "";
  const meatSlaughter = acts.includes("Meat Slaughter");
  const poultrySlaughter = acts.includes("Poultry Slaughter");
  const meatProc = acts.includes("Meat Processing");
  const poultryProc = acts.includes("Poultry Processing");
  const coldOnly =
    !meatSlaughter &&
    !poultrySlaughter &&
    !meatProc &&
    !poultryProc &&
    /Off-Premise Freezing|Identification|Certification/i.test(acts);

  let access = "UNKNOWN";
  let species = [];
  let notes = [];
  const ov = ACCESS_OVERRIDES[row.establishment_number];
  if (ov) {
    access = ov.access;
    species = ov.species_claim;
    notes.push(ov.evidence);
  } else if (INTEGRATED_NAME_RE.test(row.establishment_name)) {
    access = "VERTICALLY_INTEGRATED_OR_LIMITED";
    notes.push("Large/brand processor — do not count as practical family-farm fee-for-service access without proof");
    if (poultrySlaughter || poultryProc) species.push("poultry");
    if (meatSlaughter || meatProc) species.push("livestock_meat");
  } else if (coldOnly) {
    access = "NOT_SLAUGHTER_PROCESSING";
    notes.push("Cold storage / identification / export certification — not slaughter access");
  }

  return {
    establishment_id: `FSIS-${row.establishment_id || row.establishment_number}`,
    establishment_name: row.establishment_name,
    establishment_number: row.establishment_number,
    location: {
      street: row.street,
      city: row.city,
      county: row.county,
      state: row.state,
      zip: row.zip,
      latitude: row.latitude ? Number(row.latitude) : null,
      longitude: row.longitude ? Number(row.longitude) : null,
      fips: row.fips_code || null,
    },
    inspection_authority: "FEDERALLY_INSPECTED",
    inspection_status_detail: "FSIS grant of inspection (active MPI directory row)",
    species_activities_raw: acts,
    species: species,
    slaughter_meat: meatSlaughter,
    slaughter_poultry: poultrySlaughter,
    processing_meat: meatProc,
    processing_poultry: poultryProc,
    further_processing: /RTE|Raw Intact|Raw Non-Intact/i.test(acts) || meatProc || poultryProc,
    retail_exempt: false,
    facility_size_fsis: row.size || null,
    active_status: "ACTIVE_IN_MPI_DIRECTORY",
    public_contact_phone: row.phone || null,
    producer_access_class: access,
    capacity_confidence: "ESTABLISHMENT_CLASSIFICATION_ONLY",
    capacity_note:
      "FSIS size class is HACCP business class — does NOT equal throughput. Never convert plant count to capacity.",
    source_ids: ["CC-SRC-172"],
    last_verified: MPI_EDITION,
    notes,
  };
}

const fsisEstablishments = mpiRows.map(classifyFsis);

const supplementalEstablishments = [
  {
    establishment_id: "COMM-CYPRESS-CLINTON",
    establishment_name: "Cypress Valley Meat Company — Clinton",
    establishment_number: null,
    location: {
      street: "3288 US-65",
      city: "Clinton",
      county: "Van Buren County",
      state: "AR",
      zip: "72031",
      latitude: 35.5915,
      longitude: -92.4602,
      fips: "05141",
    },
    inspection_authority: "CUSTOM_EXEMPT",
    inspection_status_detail:
      "Company states No USDA Inspection / Custom Exempt — beef, hogs, goats",
    species: ["cattle", "hogs", "goats"],
    slaughter_meat: true,
    slaughter_poultry: false,
    processing_meat: true,
    processing_poultry: false,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: null,
    active_status: "CLAIMED_ACTIVE_COMPANY_SITE",
    public_contact_phone: "(501) 745-4844",
    producer_access_class: "OPEN_TO_OUTSIDE_PRODUCERS",
    capacity_confidence: "UNKNOWN",
    capacity_note: "Custom-exempt pathway — owner-use / not general retail interstate",
    source_ids: ["CC-SRC-175"],
    last_verified: TODAY,
    notes: [
      "Does NOT satisfy USDA-inspected hub hypothesis",
      "Relevant for custom/owner-use local processing geography",
    ],
  },
  {
    establishment_id: "COMM-NATURAL-STATE-CLINTON",
    establishment_name: "Natural State Processing",
    establishment_number: "M51255+P51255",
    location: {
      street: "245 Quality Dr",
      city: "Clinton",
      county: "Van Buren County",
      state: "AR",
      zip: "72031",
      latitude: 35.5685,
      longitude: -92.4579,
      fips: "05141",
    },
    inspection_authority: "UNKNOWN_REQUIRES_VERIFICATION",
    inspection_status_detail:
      "Historically FSIS poultry (M51255+P51255); NOT present in FSIS active MPI Directory dated 2026-08-03. Same address shows Global Refrigerated Services (V46922) cold-storage/ID activities only.",
    species: ["poultry"],
    slaughter_meat: false,
    slaughter_poultry: true,
    processing_meat: false,
    processing_poultry: true,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: "Very Small (historical secondary)",
    active_status: "DIRECTORY_ABSENT_COMMERCIAL_CLAIMS_PERSIST",
    public_contact_phone: "(501) 745-2367",
    producer_access_class: "UNKNOWN",
    capacity_confidence: "UNKNOWN",
    capacity_note:
      "Democrat-Gazette 2024: fee-for-service USDA poultry to producers in eight states; expansion grant uncertain. Current federal active listing unverified.",
    source_ids: ["CC-SRC-173", "CC-SRC-174", "CC-SRC-175", "CC-SRC-172"],
    last_verified: TODAY,
    notes: [
      "Central Clinton-hub verification gap",
      "Do not count as confirmed active federal poultry slaughter without MPI row or plant confirmation",
    ],
  },
  {
    establishment_id: "STATE-JACO-HOPE",
    establishment_name: "JACO Meats",
    establishment_number: null,
    location: {
      city: "Hope",
      county: "Hempstead County",
      state: "AR",
      latitude: 33.667,
      longitude: -93.591,
      fips: "05057",
    },
    inspection_authority: "STATE_INSPECTED",
    inspection_status_detail: "Arkansas State Meat Inspection Program licensee (news 2023)",
    species: ["cattle", "hogs"],
    slaughter_meat: true,
    slaughter_poultry: false,
    processing_meat: true,
    processing_poultry: false,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: null,
    active_status: "REPORTED_LICENSED_2023_VERIFY_CURRENT",
    public_contact_phone: null,
    producer_access_class: "OPEN_TO_OUTSIDE_PRODUCERS",
    capacity_confidence: "UNKNOWN",
    capacity_note: "Intrastate sales only unless CIS (AR not CIS)",
    source_ids: ["CC-SRC-177"],
    last_verified: "2023-12-news",
    notes: ["State program — not in FSIS federal MPI as federal plant"],
  },
  {
    establishment_id: "STATE-ASU-JONESBORO",
    establishment_name: "Arkansas State University Meat Market",
    establishment_number: null,
    location: {
      city: "Jonesboro",
      county: "Craighead County",
      state: "AR",
      latitude: 35.842,
      longitude: -90.704,
      fips: "05031",
    },
    inspection_authority: "STATE_INSPECTED",
    inspection_status_detail: "Arkansas State Meat Inspection Program licensee (news 2023)",
    species: ["cattle", "hogs"],
    slaughter_meat: true,
    slaughter_poultry: false,
    processing_meat: true,
    processing_poultry: false,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: null,
    active_status: "REPORTED_LICENSED_2023_VERIFY_CURRENT",
    producer_access_class: "LIMITED_OR_UNKNOWN",
    capacity_confidence: "UNKNOWN",
    capacity_note: "University meat lab/market — scheduling/access model unknown",
    source_ids: ["CC-SRC-177"],
    last_verified: "2023-12-news",
    notes: [],
  },
  {
    establishment_id: "STATE-FERGUSON-ATKINS",
    establishment_name: "Ferguson's Packing Company",
    establishment_number: null,
    location: {
      city: "Atkins",
      county: "Pope County",
      state: "AR",
      latitude: 35.246,
      longitude: -92.937,
      fips: "05115",
    },
    inspection_authority: "STATE_INSPECTED",
    inspection_status_detail: "Arkansas State Meat Inspection Program licensee (news 2023)",
    species: ["cattle", "hogs"],
    slaughter_meat: true,
    slaughter_poultry: false,
    processing_meat: true,
    processing_poultry: false,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: null,
    active_status: "REPORTED_LICENSED_2023_VERIFY_CURRENT",
    producer_access_class: "OPEN_TO_OUTSIDE_PRODUCERS",
    capacity_confidence: "UNKNOWN",
    source_ids: ["CC-SRC-177"],
    last_verified: "2023-12-news",
    notes: [],
  },
  {
    establishment_id: "STATE-WBU-WALNUT-RIDGE",
    establishment_name: "Williams Baptist University Meat Processing",
    establishment_number: null,
    location: {
      city: "Walnut Ridge",
      county: "Lawrence County",
      state: "AR",
      latitude: 36.068,
      longitude: -90.956,
      fips: "05075",
    },
    inspection_authority: "STATE_INSPECTED",
    inspection_status_detail: "Arkansas State Meat Inspection Program licensee (news 2023/2024)",
    species: ["cattle", "hogs"],
    slaughter_meat: true,
    slaughter_poultry: false,
    processing_meat: true,
    processing_poultry: false,
    further_processing: true,
    retail_exempt: false,
    facility_size_fsis: null,
    active_status: "REPORTED_LICENSED_2023_VERIFY_CURRENT",
    producer_access_class: "LIMITED_OR_UNKNOWN",
    capacity_confidence: "UNKNOWN",
    source_ids: ["CC-SRC-177", "CC-SRC-178"],
    last_verified: "2023-12-news",
    notes: ["University facility — producer access model unknown"],
  },
];

const allEstablishments = [...fsisEstablishments, ...supplementalEstablishments];

const meatSlaughterFederal = fsisEstablishments.filter((e) => e.slaughter_meat);
const poultrySlaughterFederal = fsisEstablishments.filter((e) => e.slaughter_poultry);
const producerAccessibleMeatSlaughter = allEstablishments.filter(
  (e) =>
    e.slaughter_meat &&
    (e.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS" ||
      e.producer_access_class === "LIMITED_OR_UNKNOWN" ||
      e.producer_access_class === "UNKNOWN") &&
    e.producer_access_class !== "PRIVATE_CAPTIVE" &&
    e.producer_access_class !== "VERTICALLY_INTEGRATED_OR_LIMITED" &&
    e.producer_access_class !== "NOT_SLAUGHTER_PROCESSING"
);

// Stricter set for travel: OPEN only + federal/state inspected (exclude custom-only for "inspected retail path")
const inspectedOpenMeatSlaughter = allEstablishments.filter(
  (e) =>
    e.slaughter_meat &&
    e.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS" &&
    (e.inspection_authority === "FEDERALLY_INSPECTED" ||
      e.inspection_authority === "STATE_INSPECTED")
);

wj("research/phase_2/ar_livestock_processing_establishment_map.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "INVENTORY_V1_NOT_COMPLETE_CENSUS",
  distinction: {
    proposition_a: "Arkansas has inspected establishments",
    proposition_b:
      "Arkansas family farmers have practical access to adequate slaughter and processing capacity",
    rule: "These are not the same proposition.",
  },
  inspection_status_legend: {
    FEDERALLY_INSPECTED:
      "FSIS continuous inspection; product may enter interstate commerce when produced under federal grant.",
    STATE_INSPECTED:
      "Arkansas MPI 'at least equal to' FMIA; product limited to intrastate commerce unless CIS (AR not CIS as of CC-SRC-130).",
    CUSTOM_EXEMPT:
      "Slaughter for owner(s) of the animal; generally not for commercial retail sale of meat.",
    RETAIL_EXEMPT: "Limited retail exemptions — not a general packing pathway.",
    UNKNOWN_REQUIRES_VERIFICATION: "Directory conflict or unverified secondary claim.",
  },
  data_sources: {
    federal_mpi_snapshot: MPI_SNAP,
    federal_mpi_edition: MPI_EDITION,
    federal_source_id: "CC-SRC-172",
    state_sources: ["CC-SRC-128", "CC-SRC-177", "CC-SRC-178"],
    commercial_access_sources: ["CC-SRC-175", "CC-SRC-173", "CC-SRC-174"],
  },
  counts: {
    fsis_arkansas_rows_in_snapshot: fsisEstablishments.length,
    fsis_meat_slaughter: meatSlaughterFederal.length,
    fsis_poultry_slaughter: poultrySlaughterFederal.length,
    supplemental_non_mpi_or_uncertain: supplementalEstablishments.length,
    total_records_in_map: allEstablishments.length,
  },
  hard_limits: [
    "Plant count ≠ throughput",
    "Inspected ≠ available to outside producers",
    "FSIS size ≠ capacity",
    "No invented appointment wait times or prices",
  ],
  establishments: allEstablishments,
  last_updated: TODAY,
});

const accessInventory = allEstablishments.map((e) => ({
  establishment_id: e.establishment_id,
  establishment_name: e.establishment_name,
  county: e.location.county,
  city: e.location.city,
  inspection_authority: e.inspection_authority,
  slaughter_meat: e.slaughter_meat,
  slaughter_poultry: e.slaughter_poultry,
  producer_access_class: e.producer_access_class,
  family_farm_practical_access:
    e.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS"
      ? "CANDIDATE"
      : e.producer_access_class === "VERTICALLY_INTEGRATED_OR_LIMITED" ||
          e.producer_access_class === "PRIVATE_CAPTIVE" ||
          e.producer_access_class === "NOT_SLAUGHTER_PROCESSING"
        ? "NO"
        : "UNKNOWN",
  source_ids: e.source_ids,
}));

wj("research/phase_2/ar_livestock_processing_access_inventory.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "A vertically integrated plant must not count as practical family-farm processing access merely because it exists.",
  access_classes: [
    "OPEN_TO_OUTSIDE_PRODUCERS",
    "LIMITED_OR_CONTRACT",
    "VERTICALLY_INTEGRATED_OR_LIMITED",
    "PRIVATE_CAPTIVE",
    "NOT_SLAUGHTER_PROCESSING",
    "UNKNOWN",
  ],
  summary: {
    open_to_outside: accessInventory.filter((a) => a.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS")
      .length,
    vertically_integrated_or_limited: accessInventory.filter(
      (a) => a.producer_access_class === "VERTICALLY_INTEGRATED_OR_LIMITED"
    ).length,
    private_captive: accessInventory.filter((a) => a.producer_access_class === "PRIVATE_CAPTIVE")
      .length,
    unknown: accessInventory.filter((a) => a.producer_access_class === "UNKNOWN").length,
  },
  inventory: accessInventory,
  last_updated: TODAY,
});

const geos = [
  {
    id: "AR-GEO-VAN-BUREN-COUNTY",
    name: "Clinton / Van Buren County",
    lat: 35.5915,
    lon: -92.4602,
  },
  { id: "AR-GEO-ROSE-BUD", name: "Rose Bud", lat: 35.331, lon: -92.081 },
  { id: "AR-GEO-SEARCY-COUNTY", name: "Searcy County", lat: 35.908, lon: -92.64 },
  { id: "AR-GEO-ARKANSAS-COUNTY", name: "Arkansas County", lat: 34.5, lon: -91.55 },
  { id: "AR-GEO-LAFAYETTE-COUNTY", name: "Lafayette County", lat: 33.36, lon: -93.58 },
  { id: "AR-GEO-WEST-HELENA", name: "West Helena / Phillips County", lat: 34.55, lon: -90.64 },
  { id: "AR-GEO-MISSISSIPPI-COUNTY", name: "Mississippi County", lat: 35.93, lon: -89.91 },
];

function nearest(geo, filterFn) {
  const candidates = allEstablishments.filter(filterFn).filter((e) => e.location.latitude != null);
  if (!candidates.length) return null;
  let best = null;
  for (const e of candidates) {
    const d = haversineMiles(geo.lat, geo.lon, e.location.latitude, e.location.longitude);
    if (!best || d < best.miles) best = { e, miles: d };
  }
  return {
    establishment_id: best.e.establishment_id,
    name: best.e.establishment_name,
    city: best.e.location.city,
    county: best.e.location.county,
    inspection_authority: best.e.inspection_authority,
    producer_access_class: best.e.producer_access_class,
    ...roadProxy(best.miles),
  };
}

const travelRows = geos.map((g) => ({
  geography_id: g.id,
  geography_name: g.name,
  nearest_cattle_or_meat_slaughter_inspected_open: nearest(
    g,
    (e) =>
      e.slaughter_meat &&
      e.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS" &&
      (e.inspection_authority === "FEDERALLY_INSPECTED" ||
        e.inspection_authority === "STATE_INSPECTED")
  ),
  nearest_meat_slaughter_any_open_incl_custom: nearest(
    g,
    (e) => e.slaughter_meat && e.producer_access_class === "OPEN_TO_OUTSIDE_PRODUCERS"
  ),
  nearest_poultry_option: nearest(
    g,
    (e) =>
      (e.slaughter_poultry || e.establishment_id === "COMM-NATURAL-STATE-CLINTON") &&
      e.producer_access_class !== "VERTICALLY_INTEGRATED_OR_LIMITED" &&
      e.producer_access_class !== "PRIVATE_CAPTIVE"
  ),
  sheep_goat_note:
    "Species-specific sheep/goat federal slaughter not separately coded in MPI activity string; multi-species plants may accept — UNKNOWN without plant confirmation.",
}));

const clintonTest = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  hypothesis_id: "CC-HYP-CLINTON-PROCESSING-HUB",
  hypothesis_text:
    "Clinton, Arkansas (Van Buren County) functions as a regional destination where many Arkansas family livestock farms obtain USDA-inspected slaughter/processing services.",
  verdict: "CONTRADICTED",
  verdict_scope: {
    cattle_hogs_usda_in_clinton: "CONTRADICTED",
    poultry_usda_in_clinton: "NOT_ENOUGH_EVIDENCE_DIRECTORY_CONFLICT",
    custom_exempt_livestock_in_clinton: "SUPPORTED_AS_PRESENT_NOT_AS_USDA_HUB",
  },
  findings: [
    "No Van Buren County establishment with Meat Slaughter appears in FSIS active MPI Directory (2026-08-03).",
    "Only FSIS active row in Clinton/Van Buren: Global Refrigerated Services (V46922) — cold storage/identification, not slaughter.",
    "Cypress Valley Meat Company Clinton location is company-labeled Custom Exempt for beef/hogs/goats — not USDA-inspected.",
    "Nearest Cypress Valley USDA livestock plant in FSIS directory is Pottsville (Pope County), not Clinton.",
    "Natural State Processing (historical M51255 poultry) is absent from the 2026-08-03 active MPI extract despite commercial site and 2024 reporting — federal active status requires verification.",
    "Public evidence that family-scale cattle/hog producers from outside Clinton use Clinton for USDA-inspected processing: NOT FOUND.",
  ],
  what_would_support_hub: [
    "Active FSIS Meat Slaughter row in Clinton/Van Buren accepting outside livestock",
    "Producer origin-county usage data showing regional draw",
    "Verified booking volumes from outside counties",
  ],
  producer_usage_evidence: "NOT_FOUND_IN_PUBLIC_RECORDS",
  primary_research_protocol: "reports/CC_CLINTON_PROCESSING_PRIMARY_RESEARCH_PROTOCOL_1_0.md",
  source_ids: ["CC-SRC-172", "CC-SRC-173", "CC-SRC-174", "CC-SRC-175"],
  last_updated: TODAY,
};

wj("research/phase_2/clinton_processing_hub_test.json", clintonTest);

const gapMatrix = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  no_statewide_headline_number: true,
  classification_values: [
    "SUFFICIENT_ACCESS",
    "LIMITED_ACCESS",
    "SEVERE_ACCESS_CONSTRAINT",
    "UNKNOWN",
  ],
  rule: "Only classify where evidence supports. Do not invent wait times.",
  rows: geos.map((g) => {
    const row = travelRows.find((t) => t.geography_id === g.id);
    const near = row.nearest_cattle_or_meat_slaughter_inspected_open;
    let access = "UNKNOWN";
    let rationale = "";
    if (!near) {
      access = "SEVERE_ACCESS_CONSTRAINT";
      rationale = "No mapped open inspected meat-slaughter candidate with coordinates";
    } else if (near.estimated_road_miles_proxy <= 60) {
      access = "LIMITED_ACCESS";
      rationale =
        "Mapped open inspected meat slaughter within ~60 road-proxy miles — capacity/scheduling still UNKNOWN so not SUFFICIENT";
    } else if (near.estimated_road_miles_proxy <= 120) {
      access = "LIMITED_ACCESS";
      rationale = "Open inspected meat slaughter within ~120 road-proxy miles; friction material; capacity UNKNOWN";
    } else {
      access = "SEVERE_ACCESS_CONSTRAINT";
      rationale = "Nearest mapped open inspected meat slaughter >~120 road-proxy miles";
    }
    // Delta/south extremes
    if (
      g.id === "AR-GEO-LAFAYETTE-COUNTY" ||
      g.id === "AR-GEO-WEST-HELENA" ||
      g.id === "AR-GEO-MISSISSIPPI-COUNTY"
    ) {
      if (near && near.estimated_road_miles_proxy > 90) {
        access = "SEVERE_ACCESS_CONSTRAINT";
        rationale += " — Delta/south geography far from Ozark/west AR slaughter cluster";
      }
    }
    if (g.id === "AR-GEO-VAN-BUREN-COUNTY") {
      rationale +=
        " — Clinton itself lacks active FSIS meat slaughter; custom-exempt local; USDA livestock requires travel (e.g., Pottsville)";
    }
    return {
      geography_id: g.id,
      geography_name: g.name,
      species_focus: "cattle_hogs_inspected_retail_path",
      access_class: access,
      nearest: near,
      capacity_evidence: "UNKNOWN",
      market_pathway_note:
        "Custom-exempt may be nearer but does not enable general retail meat sales",
      rationale,
    };
  }),
  travel_proxy_table: travelRows,
  last_updated: TODAY,
};

wj("research/phase_2/ar_processing_capacity_gap_matrix.json", gapMatrix);

wj("research/phase_2/ar_state_meat_inspection_adequacy_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  program_exists: true,
  cooperative_agreement: {
    signed: "2022-10-04",
    source_ids: ["CC-SRC-127", "CC-SRC-128"],
  },
  statutory_authorization: "Act 418 of 2021 (reported)",
  commerce_scope: "Intrastate only unless CIS",
  reported_licensed_facilities_2023: [
    "JACO Meats (Hope)",
    "ASU Meat Market (Jonesboro)",
    "Ferguson's Packing (Atkins)",
    "Williams Baptist University (Walnut Ridge)",
  ],
  reported_licensed_count_2023: 4,
  staffing_budget_detail: "NOT_ENOUGH_EVIDENCE in this slice (no full program budget/staff series assembled)",
  geographic_coverage: "Thin — four reported sites; large regions without a reported state plant",
  species_coverage: "Program is meat inspection; poultry coverage detail incomplete in sources used",
  cis_status: "Arkansas NOT listed among CIS states (CC-SRC-130)",
  question:
    "Is the current program sufficient to expand practical family-farm processing access?",
  verdict: "PARTIALLY_ADEQUATE",
  verdict_reason:
    "Program existence and first licensees are real progress vs pre-2022 federal-only path, but small licensee count, intrastate limit, incomplete public establishment census, and unknown inspector/throughput capacity mean it is not yet shown to be sufficient statewide.",
  source_ids: ["CC-SRC-127", "CC-SRC-128", "CC-SRC-122", "CC-SRC-177", "CC-SRC-178"],
  last_updated: TODAY,
});

wj("research/phase_2/ar_cis_feasibility_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  arkansas_cis_status: "NOT_PARTICIPATING",
  source_ids: ["CC-SRC-130", "CC-SRC-180", "CC-SRC-181"],
  eligibility_plant: {
    max_employees: 25,
    must_meet_federal_standards: true,
    state_must_recommend: true,
  },
  state_prerequisites: [
    "Existing 'at least equal to' State MPI program (AR has this)",
    "Supplemental CIS cooperative agreement with FSIS (AR does not have this listed)",
    "State capacity to inspect selected establishments to federal standards",
  ],
  potential_benefits: [
    "Qualifying state-inspected plants could ship interstate",
    "Could expand markets for small plants without converting fully to federal inspection",
  ],
  potential_limitations: [
    "Does not create plants — only expands commerce scope for eligible selected plants",
    "25-employee cap",
    "Administrative/inspector burden on state",
    "No automatic producer access improvement if plants remain scarce or captive",
  ],
  participating_states_as_of_src_130: [
    "Indiana",
    "Iowa",
    "Maine",
    "Missouri",
    "Montana",
    "North Dakota",
    "Ohio",
    "South Dakota",
    "Vermont",
    "Wisconsin",
  ],
  would_arkansas_producers_benefit: "NOT_ENOUGH_EVIDENCE",
  benefit_test_required: [
    "Which AR state plants would qualify and seek CIS?",
    "Do target customers lie across state lines?",
    "Would CIS change booking availability for family farms vs only plant revenue?",
  ],
  recommendation: "DO_NOT_RECOMMEND_MERELY_BECAUSE_INTERSTATE_SALES_ARE_ALLOWED",
  last_updated: TODAY,
});

// ─── Sources 172–181 ───────────────────────────────────────────
const newSources = [
  {
    source_id: "CC-SRC-172",
    title: "FSIS Meat, Poultry and Egg Product Inspection Directory — Arkansas extract",
    authors: ["USDA Food Safety and Inspection Service"],
    year: 2026,
    url: "https://www.fsis.usda.gov/sites/default/files/media_file/documents/MPI_Directory_by_Establishment_Name.csv",
    source_type: "federal_agency_directory",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: MPI_EDITION,
    retrieval_date: TODAY,
    summary:
      "Official FSIS MPI Directory CSV (edition noted Aug 3, 2026 on FSIS page). Arkansas extract archived at research/phase_2/source_snapshots/fsis_mpi_directory_arkansas_2026-08-03.csv (47 rows). Shows 6 establishments with Meat Slaughter activity; only Global Refrigerated Services in Van Buren County (cold storage/ID — not slaughter). Natural State Processing M51255 not present.",
    key_findings: [
      "47 FSIS Arkansas rows in extract",
      "6 Meat Slaughter activity establishments",
      "No Clinton/Van Buren Meat Slaughter row",
      "Plant list ≠ throughput or outside-producer access",
    ],
    limitations: "Point-in-time weekly directory; species within 'Meat Slaughter' not fully disaggregated; access class requires supplemental evidence.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "csv_retrieved_and_archived",
    notes: "Primary instrument for Clinton hub falsification.",
  },
  {
    source_id: "CC-SRC-173",
    title:
      "USDA awards $3.7M for meat processing facility expansion in Clinton (Arkansas Democrat-Gazette)",
    authors: ["Cristina LaRue", "Arkansas Democrat-Gazette"],
    year: 2024,
    url: "https://www.arkansasonline.com/news/2024/sep/21/usda-awards-37m-for-meat-processing-facility/",
    source_type: "news",
    reliability: "secondary_reputable_local",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2024-09-21",
    retrieval_date: TODAY,
    summary:
      "Natural State Processing (Clinton) approved for $3.7M MPPEP grant but CEO says additional capital uncertain (~50/50). Describes firm as independent fee-for-service USDA-inspected poultry processor serving producers in eight states. Notes Cypress Valley network: of five AR facilities only two offer USDA meat inspection (per article/website).",
    key_findings: [
      "Clinton Natural State framed as multi-state fee-for-service poultry, not cattle hub",
      "Expansion finance fragility acknowledged by operator",
      "Cypress Valley USDA meat inspection not located at Clinton per network description",
    ],
    limitations: "News interview; not FSIS directory verification; 2024 snapshot.",
    ideological_or_institutional_considerations: "Local newspaper agriculture beat.",
    verification_status: "url_verified_via_fetch",
    notes: "Supports poultry-hub narrative historically; conflicts with 2026-08-03 MPI absence.",
  },
  {
    source_id: "CC-SRC-174",
    title: "FSIS Salmonella Categorization dataset referencing Natural State Processing Clinton",
    authors: ["USDA FSIS"],
    year: 2025,
    url: "https://www.fsis.usda.gov/sites/default/files/media_file/documents/Dataset_EstablishmentCategories_202504.pdf",
    source_type: "federal_agency_dataset",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2025-04",
    retrieval_date: TODAY,
    summary:
      "FSIS Salmonella categorization PDF lists M51255+P51255 Natural State Processing, Clinton AR for Young Chicken Carcasses and Chicken Parts — confirms historical federal poultry establishment identity. Does not by itself prove 2026-08 active MPI status.",
    key_findings: [
      "Establishment number M51255+P51255 associated with Natural State Processing Clinton",
      "Poultry carcass/parts categorization — not livestock meat slaughter",
    ],
    limitations: "Sampling-window categorization file; may lag grant-of-inspection changes.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_fetch",
    notes: "Used to document directory conflict with Aug 2026 MPI extract.",
  },
  {
    source_id: "CC-SRC-175",
    title: "Cypress Valley Meat Company — About / Locations",
    authors: ["Cypress Valley Meat Company"],
    year: 2026,
    url: "https://cypressvalleymeatcompany.com/about/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Operator site: Pottsville USDA Inspected (beef/hogs/goats/buffalo); Clinton Custom Exempt (beef/hogs/goats); Natural State Processing USDA Inspected Poultry at 245 Quality Dr Clinton; 5R Mt. Vernon labeled Custom Exempt on site (conflicts with FSIS Meat Slaughter row). Claims service to independent farmers.",
    key_findings: [
      "Clinton livestock plant is custom-exempt per operator",
      "USDA livestock slaughter claimed at Pottsville, not Clinton",
      "Natural State is poultry",
    ],
    limitations: "Commercial site — establishes services claimed, not market-wide conclusions or throughput.",
    ideological_or_institutional_considerations: "Processor marketing.",
    verification_status: "url_verified_via_fetch",
    notes: "Critical for access classification and Clinton hub falsification.",
  },
  {
    source_id: "CC-SRC-176",
    title: "USDA Inspected Fee-for-Service Poultry Processors (NMPAN list)",
    authors: ["Niche Meat Processor Assistance Network"],
    year: 2026,
    url: "https://www.nichemeatprocessing.org/usda-inspected-fee-for-service-poultry-processors/",
    source_type: "industry_assistance_directory",
    reliability: "secondary_practitioner",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "NMPAN directory lists Arkansas fee-for-service poultry processors including B & R Meat Processing (Winslow) and Natural State Processing (Clinton).",
    key_findings: [
      "Natural State and B&R identified as fee-for-service poultry options",
      "Supports outside-producer access class for those plants when active",
    ],
    limitations: "Third-party list; may lag plant status; fetch timeout on re-check — use with FSIS.",
    ideological_or_institutional_considerations: "Extension/industry assistance network.",
    verification_status: "url_indexed_partial_fetch",
    notes: "Access classification aid — not capacity proof.",
  },
  {
    source_id: "CC-SRC-177",
    title: "4 meat inspection sites OK’d in ’23 (Arkansas Democrat-Gazette)",
    authors: ["Arkansas Democrat-Gazette"],
    year: 2023,
    url: "https://www.arkansasonline.com/news/2023/dec/09/4-meat-inspection-sites-okd-in-23/",
    source_type: "news",
    reliability: "secondary_reputable_local",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_inspection_law",
    publication_date: "2023-12-09",
    retrieval_date: TODAY,
    summary:
      "Reports four state meat inspection licensees in 2023: ASU Meat Market (Jonesboro), JACO Meats (Hope), Ferguson's Packing (Atkins), Williams Baptist University (Walnut Ridge). Quotes UADA livestock economist James Mitchell on ~62% meat-processing firm failure rate and SE small/medium plant vulnerability; diversification (multi-species, retail) as survival advice. Notes $10.4M CARES meat/poultry processing grants and Act 418 / 2022 FSIS agreement.",
    key_findings: [
      "Four state-inspected sites reported in 2023",
      "Small processor failure risk emphasized by extension economist",
      "Program growth early-stage",
    ],
    limitations: "News; licensee list may be incomplete/outdated vs 2026.",
    ideological_or_institutional_considerations: "Local press + extension quotes.",
    verification_status: "url_verified_via_search",
    notes: "State adequacy + failure economics.",
  },
  {
    source_id: "CC-SRC-178",
    title: "Another Arkansas meat plant receives state license (MEAT+POULTRY)",
    authors: ["MEAT+POULTRY"],
    year: 2023,
    url: "https://www.meatpoultry.com/articles/29389-another-arkansas-meat-plant-receives-state-license",
    source_type: "trade_press",
    reliability: "secondary_trade",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_inspection_law",
    publication_date: "2023",
    retrieval_date: TODAY,
    summary:
      "Trade press: Williams Baptist University becomes fourth state-licensed meat processing facility; lists prior JACO, ASU, Ferguson.",
    key_findings: ["Confirms four-plant early state program roster"],
    limitations: "Trade press; not official roster PDF.",
    ideological_or_institutional_considerations: "Industry trade media.",
    verification_status: "url_verified_via_search",
    notes: "Corroborates CC-SRC-177 roster.",
  },
  {
    source_id: "CC-SRC-179",
    title: "Small Meat Processors in Arkansas Get CARES Grants (Arkansas Business)",
    authors: ["Arkansas Business"],
    year: 2020,
    url: "https://www.arkansasbusiness.com/article/recipients-of-5m-in-meat-processing-grants-named/",
    source_type: "business_press",
    reliability: "secondary",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2020",
    retrieval_date: TODAY,
    summary:
      "Lists early Arkansas meat-processing grant recipients including Natural State Processing (Clinton), Cypress Valley (Pottsville), Key's Family Butcher Shop, B&R, JACO, and others. Anticipated capacity increases self-reported by applicants.",
    key_findings: [
      "Clinton Natural State among funded processors",
      "Self-reported capacity expansion goals ≠ measured outcomes",
    ],
    limitations: "Applicant aspirations; not audited throughput outcomes.",
    ideological_or_institutional_considerations: "Business press.",
    verification_status: "url_verified_via_search",
    notes: "Historical funding context only.",
  },
  {
    source_id: "CC-SRC-180",
    title: "Cooperative Interstate Shipping Program (FSIS overview)",
    authors: ["USDA FSIS"],
    year: 2026,
    url: "https://www.fsis.usda.gov/inspection/state-inspection-programs/cooperative-interstate-shipping-program",
    source_type: "federal_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_inspection_law",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "CIS allows selected state-inspected establishments in participating MPI states that meet federal standards and employ 25 or fewer employees to ship interstate. Plants apply via state MPI; state recommends; FSIS selects.",
    key_findings: [
      "≤25 employees",
      "State MPI + CIS agreement required",
      "Does not itself create capacity",
    ],
    limitations: "Program description — not Arkansas readiness assessment.",
    ideological_or_institutional_considerations: "Official FSIS.",
    verification_status: "url_verified_via_search",
    notes: "CIS feasibility dossier core.",
  },
  {
    source_id: "CC-SRC-181",
    title: "USDA OIG — Cooperative Interstate Shipment Program audit summary materials",
    authors: ["USDA Office of Inspector General"],
    year: 2024,
    url: "https://usdaoig.oversight.gov/sites/default/files/reports/2024-11/24601-0002-22.pdf",
    source_type: "federal_oig",
    reliability: "primary_official_oversight",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_inspection_law",
    publication_date: "2024",
    retrieval_date: TODAY,
    summary:
      "OIG materials on CIS: limited to establishments averaging 25 or fewer employees; state must have CIS agreement; documents program scale and oversight issues. Useful for constraints — not an Arkansas endorsement.",
    key_findings: [
      "Employee cap confirmed",
      "State agreement prerequisite",
      "Program participation historically limited relative to eligible states",
    ],
    limitations: "National audit focus; Arkansas not analyzed as case study here.",
    ideological_or_institutional_considerations: "OIG oversight.",
    verification_status: "url_verified_via_search",
    notes: "Failure-mode/limitation evidence for CIS optimism.",
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.note = (srcDoc.note || "") + ` Phase 2.1 (${TODAY}): CC-SRC-172–181 Clinton/FSIS AR establishment capacity map.`;
srcDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources 172–181; total", srcDoc.sources.length);

// ─── Hypothesis + claim governance ────────────────────────────
const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-CLINTON-PROCESSING-HUB");
if (hyp) {
  hyp.empirical_status = "CONTRADICTED for USDA livestock hub in Clinton; poultry federal status directory-conflicted; custom-exempt present";
  hyp.dossier_verdict = "CONTRADICTED";
  hyp.dossier_reason = clintonTest.findings.join(" ");
  hyp.last_updated = TODAY;
  hyp.slice_id = SLICE;
  hyp.test_results = {
    fsis_meat_slaughter_in_van_buren: false,
    custom_exempt_clinton: true,
    natural_state_in_active_mpi_2026_08_03: false,
    producer_usage_public_evidence: "NOT_FOUND",
  };
}
const hypCompound = hypDoc.hypotheses.find(
  (h) => h.hypothesis_id === "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS"
);
if (hypCompound) {
  hypCompound.empirical_status =
    "QUALIFIED — processing-access scarcity for family retail pathway reinforced by establishment/access map; buyer-radius monopsony still unmeasured";
  hypCompound.dossier_verdict = "QUALIFIED";
  hypCompound.last_updated = TODAY;
}
fs.writeFileSync(
  r("research/phase_2/hypothesis_registry_political_power.json"),
  JSON.stringify(hypDoc, null, 2) + "\n"
);
console.log("[OK] hypothesis verdicts");

const claim = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-138");
if (claim) {
  claim.support_level = "supported_with_qualification";
  claim.evidence_strength = "moderate";
  claim.slice_reassessment = {
    slice_id: SLICE,
    verdict: "QUALIFIED",
    note: "Establishment map strengthens AR processing-bottleneck clause; does not prove monopsony magnitudes or that Clinton is the hub. Inspected≠accessible reinforced.",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    at: TODAY,
  };
  for (const sid of ["CC-SRC-172", "CC-SRC-173", "CC-SRC-175", "CC-SRC-177"]) {
    if (!claim.source_ids.includes(sid)) claim.source_ids.push(sid);
  }
  claim.uncertainty =
    "Arkansas buyer-radius monopsony magnitudes unmeasured; Natural State active status uncertain; wait times/prices not measured; Clinton USDA livestock hub contradicted.";
}
fs.writeFileSync(r("data/research/claim_ledger.json"), JSON.stringify(claimDoc, null, 2) + "\n");

moduleDoc.status = "OPEN_MEASUREMENT_IN_PROGRESS";
moduleDoc.establishment_map_slice = SLICE;
moduleDoc.clinton_hub_verdict = "CONTRADICTED";
moduleDoc.claim_138_verdict = "QUALIFIED";
moduleDoc.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/arkansas_livestock_monopsony_processing_access_module.json"),
  JSON.stringify(moduleDoc, null, 2) + "\n"
);

meatTrack.adequacy_verdict = "PARTIALLY_ADEQUATE";
meatTrack.cis_verdict = "NOT_ENOUGH_EVIDENCE_FOR_PRODUCER_BENEFIT";
meatTrack.last_updated = TODAY;
meatTrack.related_slice = SLICE;
fs.writeFileSync(
  r("research/phase_2/arkansas_meat_inspection_infrastructure_research_track.json"),
  JSON.stringify(meatTrack, null, 2) + "\n"
);

// RQs
const newRqs = [
  {
    id: "CC-RQ-P21-067",
    question:
      "What is the current FSIS grant-of-inspection status of Natural State Processing (M51255) in Clinton, and if inactive, what replaced producer poultry access?",
    status: "OPEN",
    priority: "high",
    related_hypothesis: "CC-HYP-CLINTON-PROCESSING-HUB",
    source_ids: ["CC-SRC-172", "CC-SRC-173", "CC-SRC-174"],
  },
  {
    id: "CC-RQ-P21-068",
    question:
      "For each Arkansas open inspected meat-slaughter plant, what share of bookings are outside fee-for-service family producers vs captive/contract, and what are typical lead times by season?",
    status: "OPEN",
    priority: "high",
    related_module: "CC-MOD-AR-LIVESTOCK-MONOPSONY-AND-PROCESSING-ACCESS",
    note: "Requires primary research protocol — do not invent wait times.",
  },
  {
    id: "CC-RQ-P21-069",
    question:
      "Is the Arkansas State Meat Inspection Program's inspector staffing and licensee pipeline sufficient to move Delta/south geographies out of severe access constraint?",
    status: "OPEN",
    priority: "high",
    related_track: "CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE",
  },
  {
    id: "CC-RQ-P21-070",
    question:
      "Would CIS participation increase farm-gate options for Arkansas family producers, or mainly expand plant sales without relieving booking scarcity?",
    status: "OPEN",
    priority: "medium",
    related_track: "CC-MOD-AR-MEAT-INSPECTION-INFRASTRUCTURE",
    source_ids: ["CC-SRC-180", "CC-SRC-181"],
  },
];
if (!rqDoc.research_questions) rqDoc.research_questions = rqDoc.questions || [];
const rqArr = rqDoc.research_questions || rqDoc.questions;
for (const q of newRqs) {
  const i = rqArr.findIndex((x) => x.id === q.id);
  if (i >= 0) rqArr[i] = { ...rqArr[i], ...q };
  else rqArr.push(q);
}
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");
console.log("[OK] RQs 067–070");

// Knowledge graph (careful, no false causal edges)
const nodes = kgDoc.nodes || [];
const edges = kgDoc.edges || kgDoc.relationships || [];
function upsertNode(n) {
  const i = nodes.findIndex((x) => x.id === n.id);
  if (i >= 0) nodes[i] = { ...nodes[i], ...n };
  else nodes.push(n);
}
function upsertEdge(e) {
  const i = edges.findIndex((x) => x.id === e.id);
  if (i >= 0) edges[i] = { ...edges[i], ...e };
  else edges.push(e);
}
upsertNode({
  id: "CC-NODE-AR-FSIS-EST-MAP",
  type: "dataset",
  label: "Arkansas FSIS establishment map v1",
  slice_id: SLICE,
});
upsertNode({
  id: "CC-NODE-CLINTON-HUB-TEST",
  type: "hypothesis_test",
  label: "Clinton processing hub test",
  verdict: "CONTRADICTED",
});
upsertEdge({
  id: "CC-EDGE-MAP-TO-CLINTON-TEST",
  from: "CC-NODE-AR-FSIS-EST-MAP",
  to: "CC-NODE-CLINTON-HUB-TEST",
  type: "evidences",
  note: "Directory shows no Van Buren meat slaughter",
});
upsertEdge({
  id: "CC-EDGE-CLINTON-TEST-TO-HYP",
  from: "CC-NODE-CLINTON-HUB-TEST",
  to: "CC-HYP-CLINTON-PROCESSING-HUB",
  type: "tests",
  note: "Verdict CONTRADICTED for USDA livestock hub claim",
});
kgDoc.nodes = nodes;
if (kgDoc.edges) kgDoc.edges = edges;
else kgDoc.relationships = edges;
kgDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/knowledge_graph.json"), JSON.stringify(kgDoc, null, 2) + "\n");
console.log("[OK] knowledge graph");

// Public reasoning
const prDefs = [
  [
    "034",
    "Arkansas has meatpacking plants, so why can't small farmers just use them?",
    "Many plants are large integrated poultry or brand processors that do not sell slaughter slots to independent family farms. Having an establishment in the FSIS directory is not the same as having a booking you can get. Our map separates plant presence from producer-accessible capacity.",
  ],
  [
    "035",
    "What's the difference between a big packing plant and a small inspected processor?",
    "Big packers often buy live animals on commodity terms and run high-volume captive or contracted supply. Small inspected processors can (when they accept outside animals) slaughter and cut for a fee so a farmer can sell meat. They are different market roles — plant count alone hides that.",
  ],
  [
    "036",
    "Why does inspection matter?",
    "For commercial sale of meat, federal or qualifying state inspection is a food-safety legal requirement — not optional red tape you can skip for retail meat. Scarcity of compliant plants therefore becomes a market-access constraint, even though inspection itself is not 'the monopsony.'",
  ],
  [
    "037",
    "Does more inspection make processing harder?",
    "Inspection raises fixed compliance costs and can be hard for tiny plants. It also enables lawful sales. The hard design problem is enough accessible compliant capacity — not abolishing inspection.",
  ],
  [
    "038",
    "Why not let farmers process meat themselves?",
    "Farmers can use custom-exempt slaughter for meat they (or co-owners) will consume, and limited poultry exemptions exist in some cases. Those paths generally do not authorize open retail meat sales the way inspected processing does.",
  ],
  [
    "039",
    "Why isn't custom-exempt processing enough?",
    "Custom-exempt serves owner-use. It can help households and some local arrangements, but it is not a substitute for inspected processing if the business model is selling packaged meat to the public across normal retail channels.",
  ],
  [
    "040",
    "Why do some farmers wait months for slaughter dates?",
    "Public Arkansas wait-time statistics were not verified in this slice — we refuse to invent them. Scheduling friction is widely reported in extension/trade discussions and is a priority for primary research (see Clinton protocol).",
  ],
  [
    "041",
    "Would more small processors raise food prices?",
    "Not automatically measured here. Small plants have higher unit costs; they can also create competition and premium local products. Consumer-price effects require separate evidence — do not assume either cheaper or more expensive.",
  ],
  [
    "042",
    "Could new plants fail?",
    "Yes. Extension commentary cites high failure rates for small/medium processors, especially without multi-species work and retail/wholesale outlets. A plant that opens and closes does not solve access.",
  ],
  [
    "043",
    "What would CIS actually change?",
    "CIS would let qualifying small state-inspected plants in a participating state ship across state lines. Arkansas is not currently a CIS state. CIS does not create plants or guarantee farmer booking slots.",
  ],
  [
    "044",
    "Why does processing access affect farm ownership and local food?",
    "If the only practical path is selling live animals into concentrated buyer markets, farm-gate options narrow. Accessible inspected processing is one infrastructure condition for direct and local meat markets — necessary in many models, not sufficient alone.",
  ],
];

for (const [num, q, a] of prDefs) {
  const id = `CC-PR-${num}`;
  wt(`reports/public_reasoning/${id}.md`, `# ${id}

## Skeptical reader question

${q}

## Public answer

${a}

## What we still don't know

Producer booking lead times, prices, and origin-county usage remain primary-research needs. Natural State Processing's current federal status requires verification against FSIS.

## Slice

${SLICE}
`);
  const rec = {
    record_id: id,
    slice_id: SLICE,
    skeptical_reader_question: q,
    public_answer: a,
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    domain: "livestock_processing_access",
  };
  const ri = prRegistry.records.findIndex((x) => x.record_id === id);
  if (ri >= 0) prRegistry.records[ri] = { ...prRegistry.records[ri], ...rec };
  else prRegistry.records.push(rec);
}
prRegistry.slice_id = SLICE;
prRegistry.generated_at = TODAY;
prRegistry.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/public_reasoning_registry.json"),
  JSON.stringify(prRegistry, null, 2) + "\n"
);
console.log("[OK] PR 034–044");

// Reports
wt(
  "reports/CC_CLINTON_PROCESSING_PRIMARY_RESEARCH_PROTOCOL_1_0.md",
  `# Clinton / Arkansas Processing — Primary Research Protocol 1.0

**Status:** Future field protocol — **no interviews fabricated**.  
**Slice:** ${SLICE}

## Purpose

Public records cannot yet answer whether family-scale producers from outside Clinton use Clinton-area processing in meaningful numbers, nor typical booking lead times.

## Potential respondents

- Plant operators (Clinton custom-exempt; Pottsville USDA; Natural State if active; other open plants)
- Local livestock producers (Van Buren, Searcy, Cleburne, Faulkner, Pope)
- Extension personnel (UADA livestock / local foods)
- Veterinarians
- Auction / livestock-market participants
- Farmers-market meat vendors
- Feed suppliers
- County officials
- Arkansas Department of Agriculture Meat Inspection Program

## Required measurements (do not invent beforehand)

1. Origin counties of producers using each plant (last 12 months)
2. Typical booking lead time by species and season
3. Species accepted / refused
4. Throughput constraints (animals/week; days operated)
5. Expansion interest and capital constraints
6. Workforce / skilled butcher constraints
7. Inspection constraints (federal vs state vs custom)
8. Equipment / cold storage / wastewater constraints
9. Share fee-for-service vs captive/contract
10. Whether Natural State Processing currently holds FSIS grant of inspection

## Ethics / method

- Identify as Constitutional Capitalism research
- Offer anonymity option for commercial-sensitive scheduling/pricing
- Separate operator claims from producer claims
- Dual-source any hub-scale usage claim
`
);

wt(
  "reports/CC_ARKANSAS_LIVESTOCK_PROCESSING_ESTABLISHMENT_MAP_1_0.md",
  `# Arkansas Livestock Processing Establishment Map 1.0

**Slice:** ${SLICE}  
**FSIS snapshot:** ${MPI_EDITION} (${MPI_SNAP})

## Core distinction

**Arkansas has inspected establishments** ≠ **family farmers have practical access**.

## Federal snapshot (Arkansas extract)

| Metric | Count |
| --- | ---: |
| FSIS rows | ${fsisEstablishments.length} |
| Meat Slaughter activity | ${meatSlaughterFederal.length} |
| Poultry Slaughter activity | ${poultrySlaughterFederal.length} |

Meat Slaughter rows include: 5R Custom Meats (Mt. Vernon); Arkansas Department of Corrections (Grady — captive); B & R (Winslow); Cypress Valley (Pottsville); G.E. Hawthorn (Hot Springs); Key's Family Butcher Shop (Van Buren city / Crawford County).

## Van Buren / Clinton

- Active FSIS: Global Refrigerated Services only (not slaughter)
- Cypress Valley Clinton: **custom-exempt** (operator)
- Natural State Processing: **absent from active MPI extract** — verify

## State-inspected (news roster 2023)

JACO Hope; ASU Jonesboro; Ferguson Atkins; Williams Baptist Walnut Ridge — intrastate only; current roster needs official refresh.

## Capacity

Capacity confidence mostly **ESTABLISHMENT_CLASSIFICATION_ONLY** or **UNKNOWN**. No plant-count→throughput conversion.
`
);

wt(
  "reports/CC_CLINTON_PROCESSING_HUB_TEST_1_0.md",
  `# Clinton Processing Hub Test 1.0

## Hypothesis

${clintonTest.hypothesis_text}

## Verdict: **CONTRADICTED** (USDA livestock hub as stated)

### Scope

| Scope | Verdict |
| --- | --- |
| Cattle/hogs USDA in Clinton | CONTRADICTED |
| Poultry USDA in Clinton | NOT ENOUGH EVIDENCE (directory conflict) |
| Custom-exempt livestock in Clinton | Present — does not satisfy USDA hub claim |

### Findings

${clintonTest.findings.map((f) => `- ${f}`).join("\n")}

### Producer usage

${clintonTest.producer_usage_evidence}

See primary research protocol for the field path.
`
);

wt(
  "reports/CC_ARKANSAS_STATE_MEAT_INSPECTION_ADEQUACY_1_0.md",
  `# Arkansas State Meat Inspection Adequacy 1.0

## Verdict: **PARTIALLY ADEQUATE**

Arkansas **has** a State Meat Inspection Program (FSIS cooperative agreement Oct 2022). The obsolete “should Arkansas create a program?” question remains retired.

### Evidence of progress

- Legal program exists (CC-SRC-127/128)
- Early licensees reported in 2023 (four named plants — CC-SRC-177/178)

### Why not ADEQUATE

- Small reported licensee count
- Intrastate-only without CIS
- Incomplete public official plant census in this slice
- Staffing/budget/throughput series not assembled
- Delta/south access still looks severe on travel proxies

### Sufficiency question

Not answered as “enough for all family farms.” Answered as: real but incomplete infrastructure.
`
);

wt(
  "reports/CC_ARKANSAS_CIS_FEASIBILITY_1_0.md",
  `# Arkansas CIS Feasibility 1.0

## Status

Arkansas is **not** listed among CIS participating states (CC-SRC-130).

## What CIS changes

Eligible state-inspected plants (≤25 employees, federal-equivalent standards, state-recommended) may ship **interstate**.

## What CIS does not change

- Does not create plants
- Does not guarantee fee-for-service slots for family farms
- Does not remove labor/capital/failure risks

## Producer-benefit verdict

**NOT ENOUGH EVIDENCE** — requires plant qualification + customer geography study.

Do **not** recommend CIS merely because interstate sales are allowed.
`
);

wt(
  "reports/CC_ARKANSAS_FAMILY_FARM_PROCESSING_ACCESS_WHAT_WE_LEARNED_1_0.md",
  `# What We Learned — Family Farm Processing Access 1.0

1. **Inspected ≠ accessible.** Large FSIS poultry/brand plants dominate counts; few open meat-slaughter options.
2. **Clinton is not a proven USDA livestock hub.** Custom-exempt yes; federal meat slaughter in-county no (MPI 2026-08-03).
3. **Natural State poultry status is a live verification gap** (commercial claims vs missing MPI row).
4. **Pottsville (Pope), not Clinton, is the Cypress Valley USDA livestock node in FSIS.**
5. **State MPI is PARTIALLY ADEQUATE** — exists, early licensees, not shown sufficient statewide.
6. **CIS is optional architecture, not a capacity fairy wand.**
7. **Small plants fail often** — diversification/retail matter (extension commentary).
8. **Success standard met:** we can finally separate “Arkansas has meat plants” from “family farmers have practical inspected access.”
`
);

const returnMd = `# CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0 — Return

**Generated:** ${TODAY}

## 1. Executive Summary

Clinton is **not** a proven regional **USDA-inspected livestock** processing hub. FSIS active directory (2026-08-03 extract) shows **no Meat Slaughter** establishment in Van Buren County; Clinton’s Cypress Valley site is **custom-exempt**; Natural State poultry’s federal active status is **directory-conflicted**. Arkansas has inspected plants — that is not the same as practical family-farm access. CC-CLAIM-138 remains **QUALIFIED**. Baseline **2/86** unchanged. GATE-02 **not passed**.

## 2. Arkansas Establishment Inventory

- FSIS AR rows: **${fsisEstablishments.length}** (snapshot ${MPI_EDITION})
- Supplemental state/custom/uncertain records added separately
- Canonical: \`research/phase_2/ar_livestock_processing_establishment_map.json\`

## 3. Inspection Status Breakdown

| Status | Meaning |
| --- | --- |
| Federally inspected | Interstate-capable when under FSIS grant |
| State inspected | Intrastate; AR program exists; not CIS |
| Custom exempt | Owner-use pathway — not general retail |
| Unknown / verify | Directory conflicts (Natural State) |

## 4. Producer-Accessible vs Captive Facilities

Access inventory separates OPEN, LIMITED, VERTICALLY_INTEGRATED, PRIVATE_CAPTIVE, UNKNOWN. ADC Grady = captive. Large poultry brands ≠ family fee-for-service. Canonical: \`ar_livestock_processing_access_inventory.json\`.

## 5. Species Coverage

Federal Meat Slaughter activity: **${meatSlaughterFederal.length}** establishments in extract. Poultry slaughter activity includes large integrators + a few small plants. Sheep/goat not separately coded — UNKNOWN without plant confirmation.

## 6. Capacity Evidence

Hierarchy applied; most rows **ESTABLISHMENT_CLASSIFICATION_ONLY** or **UNKNOWN**. **No** plant-count→throughput conversion. CAFF/UADA still report scarce livestock slaughter among small plants (CC-SRC-121).

## 7. Clinton Hub Test

**Verdict: CONTRADICTED** for USDA livestock hub as hypothesized.  
Poultry: **NOT ENOUGH EVIDENCE** (MPI absence vs commercial/2024 reporting).  
Custom-exempt livestock: present, insufficient for USDA-hub claim.  
Producer origin-county usage: **NOT FOUND** in public records.

## 8. Producer Travel Radius Findings

Road-distance **proxies** (not routed GPS studies) from designated geographies to nearest **open inspected** meat slaughter show Clinton-area producers typically looking to **Pope/White/Crawford** clusters; Delta/south geographies often **SEVERE** on proxy. See gap matrix travel table.

## 9. Processing Bottleneck Types

Separable bottlenecks retained: slaughter vs cut/wrap vs inspection vs labor vs cold storage vs packaging vs value-added vs scheduling vs transport vs working capital vs compliance. Clinton shows **inspection-status mismatch** (custom vs USDA) more clearly than a single “shortage” slogan.

## 10. Family-Farm Market Pathways

Mapped non-predictively: live-animal sale; direct-market via inspected slaughter→cut/wrap→cold→retail; custom-exempt owner-use. Value retention differs by who owns the animal, sets price, pays processing, and bears inventory/spoilage risk — connects later to monopsony module without proving it here.

## 11. State Inspection Adequacy

**PARTIALLY ADEQUATE** — program real; early licensees; not shown sufficient statewide; CIS absent.

## 12. CIS Findings

AR not participating. Plant cap ≤25 employees. Producer benefit **NOT ENOUGH EVIDENCE**. Do not recommend merely for interstate permission.

## 13. Processor Failure Economics

Mandatory caution: small/medium processors face high failure risk; diversification and retail/wholesale outlets matter (CC-SRC-177; national small-plant survival literature via extension). New plants are not automatic solutions.

## 14. Regional Capacity Gap Matrix

Classifications for seven geographies — mostly LIMITED or SEVERE for inspected cattle/hog retail pathway; **no SUFFICIENT** without capacity/scheduling proof. No statewide headline number.

## 15. CC-CLAIM-138 Verdict

**QUALIFIED** (supported_with_qualification). Processing-bottleneck clause strengthened; monopsony magnitudes still unmeasured; Clinton hub language must not be smuggled in.

## 16. Clinton Hypothesis Verdict

**CC-HYP-CLINTON-PROCESSING-HUB: CONTRADICTED** (as USDA livestock regional hub).

## 17. Monopsony/Processing Module Implications

Module stays OPEN. Downstream scarcity measurement advanced; upstream buyer-radius still pending. False hub narrative retired — next capacity work should follow **actual open plants** (e.g., Pottsville cluster) and Delta gaps.

## 18. Public Reasoning Records

CC-PR-034 through CC-PR-044.

## 19. Sources Added

CC-SRC-172–181. Registry total: ${srcDoc.sources.length}.

## 20. Research Questions Added

CC-RQ-P21-067–070.

## 21. Baseline

**Unchanged: 2/86.**

## 22. GATE-02

**Not passed.**

## 23. Validators

Filled at ship time.

## 24. Files Changed

- \`research/phase_2/ar_livestock_processing_establishment_map.json\`
- \`research/phase_2/ar_livestock_processing_access_inventory.json\`
- \`research/phase_2/ar_processing_capacity_gap_matrix.json\`
- \`research/phase_2/clinton_processing_hub_test.json\`
- \`research/phase_2/ar_state_meat_inspection_adequacy_dossier.json\`
- \`research/phase_2/ar_cis_feasibility_dossier.json\`
- \`research/phase_2/source_snapshots/fsis_mpi_directory_arkansas_2026-08-03.csv\`
- Reports under \`reports/CC_ARKANSAS_*\`, \`CC_CLINTON_*\`, return, PR 034–044
- Script: \`scripts/run-phase21-clinton-hub-fsis-ar-establishment-map.mjs\`

## 25. Commit Hash

Filled after commit.

## 26. Remaining Unknowns

Natural State active status; official current state licensee census; booking lead times; prices; producer origin counties; sheep/goat species confirmation; CIS plant appetite; buyer-radius monopsony metrics.

## 27. Exact Next Recommended Slice

**CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0**  
(Execute Clinton/Arkansas primary research protocol against open plants — especially Pottsville cluster + state licensees + Natural State verification — before any construction recommendation.)

Alternate if agriculture pause desired: resume journalism coverage coding or CTE follow-ons — but processing gap measurement is the natural continuation.
`;

wt(
  `reports/CC_PHASE_2_1_CLINTON_HUB_FSIS_TEST_AND_AR_ESTABLISHMENT_CAPACITY_MAP_1_0_RETURN.md`,
  returnMd
);

// Project pointers
updates.updates = updates.updates || updates;
const updateArr = Array.isArray(updates.updates) ? updates.updates : updates;
if (Array.isArray(updates.updates)) {
  updates.updates.push({
    id: "UPD-082",
    date: TODAY,
    slice_id: SLICE,
    summary:
      "Clinton USDA livestock hub CONTRADICTED via FSIS map; Natural State poultry status directory-conflicted; state MPI PARTIALLY ADEQUATE; CIS NEE; Claim-138 QUALIFIED. Inspected≠accessible established.",
  });
}
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

sliceQueue.active_slice =
  "CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0";
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

buildState.active_slice = sliceQueue.active_slice;
buildState.last_completed_slice = SLICE;
buildState.last_updated = TODAY;
buildState.notes = [
  "Clinton USDA livestock hub CONTRADICTED. Processing access map v1 complete. Primary booking study next.",
];
fs.writeFileSync(
  r("data/project/current_build_state.json"),
  JSON.stringify(buildState, null, 2) + "\n"
);

wj("data/project/latest_cursor_return.json", {
  slice_id: SLICE,
  completed_at: TODAY,
  clinton_hub_verdict: "CONTRADICTED",
  claim_138_verdict: "QUALIFIED",
  state_mpi_adequacy: "PARTIALLY_ADEQUATE",
  cis: "NOT_ENOUGH_EVIDENCE",
  baseline: "2/86",
  gate_02: "NOT_PASSED",
  next_recommended_slice:
    "CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0",
  return_path:
    "reports/CC_PHASE_2_1_CLINTON_HUB_FSIS_TEST_AND_AR_ESTABLISHMENT_CAPACITY_MAP_1_0_RETURN.md",
});

console.log("\nSlice complete:", SLICE);
console.log("Clinton hub:", clintonTest.verdict);
console.log("Meat slaughter federal:", meatSlaughterFederal.length);
console.log("Open inspected meat slaughter mapped:", inspectedOpenMeatSlaughter.length);
