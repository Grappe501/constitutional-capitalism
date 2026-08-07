/**
 * CC-PHASE-2.1-ARKANSAS-CTE-OUTCOMES-FUNDING-AND-RURAL-MAGNET-FEASIBILITY-1.0
 *
 * Research-only evaluation of CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK.
 * No doctrine. No invented dollar values. UNKNOWN / NOT PUBLICLY AVAILABLE where needed.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE =
  "CC-PHASE-2.1-ARKANSAS-CTE-OUTCOMES-FUNDING-AND-RURAL-MAGNET-FEASIBILITY-1.0";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";
const HYP_ID = "CC-HYP-AR-RURAL-CTE-SPECIALTY-MAGNET-NETWORK";
const MOD_ID = "CC-MOD-AR-RURAL-CTE-SPECIALTY-MAGNETS";

function writeJson(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function writeText(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}
function upsertBy(arr, key, item) {
  const i = arr.findIndex((x) => x[key] === item[key]);
  if (i >= 0) arr[i] = { ...arr[i], ...item };
  else arr.push(item);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/education_research_hypothesis_registry.json"), "utf8")
);
const moduleDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_rural_cte_specialty_magnet_module.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);

const newSources = [
  {
    source_id: "CC-SRC-137",
    title: "OSD Secondary Technical Centers Directory 2024-25",
    authors: ["Arkansas Office of Skills Development"],
    year: 2024,
    url: "https://arkansasosd.com/wp-content/uploads/24-25-STC-Directory-with-Satellites_Updated-10-14-24-1.pdf",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2024-10-14",
    retrieval_date: TODAY,
    summary:
      "Official OSD directory of Arkansas Secondary Technical Centers and satellites for 2024-25: host institutions, locations, and program lists. Inventory foundation for access mapping. Does not publish per-center enrollment, wages, placement, or aid amounts.",
    key_findings: [
      "Statewide STC network with host colleges/centers and listed programs",
      "Satellite sites extend some centers",
      "Directory is structural/inventory - not outcomes"
    ],
    limitations: "Program lists may update; no outcomes/funding per center.",
    ideological_or_institutional_considerations: "Official OSD.",
    verification_status: "url_listed_official_osd",
    notes: "Primary inventory source for center inventory artifact."
  },
  {
    source_id: "CC-SRC-138",
    title:
      "Condition of Participation, Outcomes, Expenditures, and Funding of Secondary Area Career Centers (Dougherty 2017)",
    authors: ["Shaun M. Dougherty"],
    year: 2017,
    url: "https://arkleg.state.ar.us/Home/FTPDocument?path=%2FAssembly%2FMeeting+Attachments%2F108%2F118%2FDougherty+Report.pdf",
    source_type: "legislative_research",
    reliability: "secondary_official",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2017",
    retrieval_date: TODAY,
    summary:
      "KEY historical statewide evaluation for Arkansas secondary area career centers (approx. AY2008-2014 era). Concentrator outcomes at centers were comparable to traditional high-school CTE concentrators; graduation rates high (>90% in reported analyses); Vocational Center Aid historically ~$20.1M; center benefits not meaningfully different from HS CTE for similar concentrators. Does NOT prove current center-level superiority for specialty magnets.",
    key_findings: [
      "Center concentrator outcomes comparable to traditional HS CTE concentrators",
      "VCAF / Vocational Center Aid ~$20.1M historical figure cited",
      "Graduation >90% in reported center analyses",
      "Center benefits not meaningfully different from HS CTE for similar concentrators"
    ],
    limitations:
      "Historical (AY08-14 era); not current per-center wages/placement; statewide aggregate - not magnet design proof.",
    ideological_or_institutional_considerations: "Legislative meeting attachment / commissioned research.",
    verification_status: "url_listed_arkleg",
    notes: "Critical falsification input: magnets need stronger case than centers exist."
  },
  {
    source_id: "CC-SRC-139",
    title: "Adequacy 2024 K-12 Career and Technical Education Report",
    authors: ["Arkansas Bureau of Legislative Research / Adequacy"],
    year: 2024,
    url: "https://arkleg.state.ar.us/Home/FTPDocument?path=%2FEducation%2FAdequacyReports%2F2024%2F2024-06-04%2FCareer+and+Technical+Education+Report.pdf",
    source_type: "legislative_research",
    reliability: "secondary_official",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2024-06-04",
    retrieval_date: TODAY,
    summary:
      "2024 adequacy CTE report: ~$129M district CTE spend (2023 context); ~74% foundation funding share noted for CTE teacher/context; STC purpose framed around equity/access; Perkins and state start-up grants discussed. Structural funding overview - not a magnet feasibility model.",
    key_findings: [
      "~$129M district CTE spend (2023 context in report)",
      "About 74% foundation-related share in reported CTE funding mix",
      "STC purpose: equity/access to advanced CTE",
      "Perkins and start-up grants part of stack"
    ],
    limitations: "Statewide/report aggregates; confirm worksheets before citing micro amounts; not per-center ops model.",
    ideological_or_institutional_considerations: "Adequacy process / BLR.",
    verification_status: "url_listed_arkleg",
    notes: "Funding stack evidence; do not invent magnet budgets from aggregates."
  },
  {
    source_id: "CC-SRC-140",
    title: "OSD Rules - Secondary Technical Centers (VCA tiered FTE funding)",
    authors: ["Arkansas Office of Skills Development"],
    year: 2025,
    url: "https://arkansasosd.com/wp-content/uploads/6-CAR-%C2%A7500-Rules-for-Secondary-Technical-Centers-022125.pdf",
    source_type: "regulation",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2025-02-21",
    retrieval_date: TODAY,
    summary:
      "OSD rules for Secondary Technical Centers describing Vocational Center Aid (VCA) tiered FTE / per-student funding structure, center operations requirements, and related compliance. Establishes that centers operate under recurring formula-like aid rules - exact current dollar tiers not invented here; consult rule tables/worksheets.",
    key_findings: [
      "VCA is recurring, tiered by FTE/student structure under OSD rules",
      "Centers subject to OSD program/funding rules",
      "Annual reporting obligations exist under center rules (report content not harvested this slice)"
    ],
    limitations: "Rule text structure != harvested dollar schedule for every tier in this slice.",
    ideological_or_institutional_considerations: "Official OSD rules.",
    verification_status: "url_listed_official_osd",
    notes: "Primary structure for student funding flow / VCA tags."
  },
  {
    source_id: "CC-SRC-141",
    title: "NEPC Brief - Hodge on CTE Tracking and Equity (2025)",
    authors: ["Emily Hodge", "National Education Policy Center"],
    year: 2025,
    url: "https://nepc.colorado.edu/sites/default/files/publications/PB%20Hodge%20CTE%202.25.pdf",
    source_type: "policy_brief",
    reliability: "secondary_research",
    primary_or_secondary: "secondary",
    jurisdiction: "United States (equity/tracking lens)",
    research_domain: "education_cte",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "NEPC brief on CTE tracking/equity risks: historical vocational tracking harms; modern CTE can reproduce stratification if access, counseling, and prestige are unequal. Failure-mode input for specialty magnets (tracking / second-class pathway risk).",
    key_findings: [
      "CTE can recreate tracking if equity safeguards fail",
      "Prestige and access design matter for who enters which pathways"
    ],
    limitations: "National brief - not Arkansas-specific outcomes.",
    ideological_or_institutional_considerations: "NEPC progressive education-policy lens; use as equity stress-test, not Arkansas fact sheet.",
    verification_status: "url_listed_nepc",
    notes: "Supports failure-mode: tracking / equity."
  },
  {
    source_id: "CC-SRC-142",
    title: "Advance CTE - Tracking and the Future of CTE",
    authors: ["Advance CTE"],
    year: null,
    url: "https://careertech.org/resource/tracking-and-the-future-of-career-and-technical-education-how-efforts-to-connect-school-and-work-can-avoid-the-past-mistakes-of-vocational-education/",
    source_type: "advocacy_research",
    reliability: "secondary_practitioner",
    primary_or_secondary: "secondary",
    jurisdiction: "United States",
    research_domain: "education_cte",
    publication_date: "UNKNOWN",
    retrieval_date: TODAY,
    summary:
      "Advance CTE resource on avoiding historical vocational-education tracking mistakes while connecting school and work. Complements equity/tracking failure-mode analysis for magnet design.",
    key_findings: [
      "Modern CTE should avoid past vocational tracking mistakes",
      "School-work connection design can either widen or narrow opportunity"
    ],
    limitations: "Practitioner/advocacy resource; not Arkansas outcome data.",
    ideological_or_institutional_considerations: "National CTE association.",
    verification_status: "url_listed_advancecte",
    notes: "Pair with CC-SRC-141 for tracking failure modes."
  },
  {
    source_id: "CC-SRC-143",
    title: "ADE Pathway Guide 2026-27",
    authors: ["Arkansas Department of Education"],
    year: 2026,
    url: "https://adecm.ade.arkansas.gov/Attachments/26-27_SY_Pathway_Guide_160048.pdf",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "education_cte",
    publication_date: "2026",
    retrieval_date: TODAY,
    summary:
      "ADE CTE pathway guide for 2026-27 school year: pathway structures and course frameworks that specialty-magnet and district CTE designs must align with. Complements H2 pathway memo (CC-SRC-131).",
    key_findings: [
      "Official pathway structures for 2026-27",
      "Alignment reference for specialty candidacy vs district pathways"
    ],
    limitations: "Guide != local demand proof; pathways change over time.",
    ideological_or_institutional_considerations: "Official ADE.",
    verification_status: "url_listed_ade",
    notes: "Use for pathway alignment; not for inventing specialty lists."
  }
];
for (const s of newSources) upsertBy(srcDoc.sources, "source_id", s);
srcDoc.last_updated = TODAY;
writeJson("data/research/source_registry.json", srcDoc);

const U = "UNKNOWN";
const RLR = "REQUIRES LOCAL REQUEST";
const NPA = "NOT PUBLICLY AVAILABLE";

/** Compact OSD 2024-25 inventory: [id, name, host, city, programs[], satellites[]] */
const centerRows = [
  ["STC-ANC", "ANC Secondary Career Center", "Arkansas Northeastern College", "Blytheville", ["Aviation Maintenance", "Industrial Maintenance", "Welding", "Machine Tool Technology", "Mechatronics"], []],
  ["STC-ASUB", "ASU-Beebe Secondary Career Center", "ASU-Beebe", "Searcy", ["Welding", "Practical Nursing", "Construction Technology", "Diesel Technology / Truck", "Computer Networking"], ["satellites listed in OSD directory - details UNKNOWN without full harvest"]],
  ["STC-ASUMS", "ASU Mid-South Secondary Career Center", "ASU Mid-South", "West Memphis", ["Advanced Manufacturing", "Welding", "Health Sciences", "Industrial Technology"], []],
  ["STC-ASUMH", "ASU Mountain Home Secondary Career Center", "ASU Mountain Home", "Mountain Home", ["Welding", "Health Professions", "Automotive / Diesel", "Construction"], []],
  ["STC-ASUN", "ASU Newport IGNITE / Secondary Career Center", "ASU Newport", "Newport", ["Advanced Manufacturing", "Welding", "Health Sciences", "Industrial Maintenance"], []],
  ["STC-ASUTR", "ASU Three Rivers Secondary Career Center", "ASU Three Rivers", "Malvern", ["Welding", "Industrial Technology", "Health Sciences", "Construction"], ["Saline County satellite (OSD directory)"]],
  ["STC-ATU", "ATU Secondary Career Center", "Arkansas Tech University", "Russellville", ["Welding", "Automotive", "Health Sciences", "Computer Information"], []],
  ["STC-BRTC", "Black River Secondary Career Center", "Black River Technical College", "Pocahontas", ["Welding", "Industrial Maintenance", "Health Sciences", "Automotive"], []],
  ["STC-CONWAY", "Conway Area Career Center", "Conway Area Career Center / host per OSD", "Conway", ["Multiple CTE programs per OSD directory", "Health", "Trade/industrial"], []],
  ["STC-CCCUA", "CCCUA Secondary Career Center", "Cossatot Community College of the UA", "DeQueen", ["Welding", "Automotive", "Health Sciences", "Industrial Technology"], []],
  ["STC-EACC", "East Arkansas Secondary Career Center", "East Arkansas Community College", "Forrest City", ["Welding", "Industrial Technology", "Health Sciences"], []],
  ["STC-METRO", "Metropolitan Career and Technical Center", "Metropolitan (Pulaski / Little Rock area)", "Little Rock", ["Multiple urban CTE pathways per OSD directory"], []],
  ["STC-OEC", "Monticello Occupational Education Center", "UAM / Monticello OEC", "Monticello", ["Trade/industrial", "Health", "Agriculture-related if listed - VERIFY"], []],
  ["STC-NPCC", "National Park Secondary Career Center", "National Park College", "Hot Springs", ["Welding", "Health Sciences", "Automotive", "Hospitality/culinary if listed - VERIFY"], []],
  ["STC-NCMC", "North Central Career Center", "North Central Career Center", "Leslie", ["Welding", "Construction / trades", "Health / EMS pathways if listed - VERIFY", "Heavy equipment if listed - VERIFY"], []],
  ["STC-NORTHARK", "NorthArk Secondary Career Center", "North Arkansas College", "Harrison", ["Welding", "Health Sciences", "Automotive", "Construction"], []],
  ["STC-NEA", "Northeast Arkansas Career & Tech Center", "ASU / Northeast partnership per OSD", "Jonesboro", ["Welding", "Health Sciences", "Manufacturing", "Automotive"], []],
  ["STC-NWACC", "NWACC Secondary Career Center", "NWACC", "Bentonville", ["Health Sciences", "Advanced Manufacturing", "IT / networking", "Welding or construction per OSD - VERIFY"], []],
  ["STC-NWTI", "Northwest Technical Institute Secondary Career Center", "NWTI", "Springdale", ["Welding", "Industrial Maintenance", "Practical Nursing", "Automotive"], []],
  ["STC-OZARKA", "Ozarka Secondary Career Center", "Ozarka College", "Melbourne", ["Welding", "Health Sciences", "Automotive", "Culinary/hospitality if listed - VERIFY"], ["rural satellites per OSD - VERIFY"]],
  ["STC-PCCUA", "Phillips Secondary Career Center", "Phillips Community College of the UA", "Helena", ["Welding", "Industrial Technology", "Health Sciences", "Advanced manufacturing / related"], ["DeWitt", "Stuttgart"]],
  ["STC-SAUT", "SAU Tech Secondary Career Center", "Southern Arkansas University Tech", "Camden", ["Aviation / aerospace if listed - VERIFY", "Welding", "Industrial Technology", "Health"], []],
  ["STC-SOUTHARK", "SouthArk Secondary Career Center", "South Arkansas College", "El Dorado", ["Welding", "Process Technology", "Health Sciences", "Industrial Maintenance"], []],
  ["STC-SEARK", "SEARK Secondary Career Center", "Southeast Arkansas College", "Pine Bluff", ["Welding", "Industrial Technology", "Health Sciences", "Culinary if listed - VERIFY"], []],
  ["STC-SEARK-CBEC", "SEARK / CBEC Warren Secondary Career Center", "SEARK / CBEC", "Warren", ["Trade/industrial", "Health", "programs per OSD CBEC listing"], []],
  ["STC-UACCB", "UACCB Secondary Career Center", "UA Community College at Batesville", "Batesville", ["Welding", "Health Sciences", "Industrial Technology"], []],
  ["STC-UACCM", "UACCM Secondary Career Center", "UA Community College at Morrilton", "Morrilton", ["Welding", "Automotive", "Health Sciences", "Surveying/construction if listed - VERIFY"], []],
  ["STC-UAHT", "UAHT Secondary Career Center", "UA Hope-Texarkana", "Hope", ["Welding", "Industrial Technology", "Health Sciences", "Automotive"], []],
  ["STC-UAPTC", "UA-PTC Secondary Career Center", "UA-Pulaski Technical College", "North Little Rock", ["Welding", "Automotive", "Health Sciences", "IT / manufacturing"], []],
  ["STC-UARM", "UA Rich Mountain Secondary Career Center", "UA Rich Mountain", "Mena", ["Welding", "Health Sciences", "Automotive", "Forestry/natural resources if listed - VERIFY"], []],
  ["STC-WATC", "Western Arkansas Technical Center", "UAFS / Western AR partnership per OSD", "Fort Smith", ["Welding", "Advanced Manufacturing", "Health Sciences", "Automotive / industrial"], []]
];

const inventory = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "INVENTORY_FROM_OSD_DIRECTORY_STRUCTURAL",
  primary_source: "CC-SRC-137",
  note: "Programs summarized from OSD 2024-25 directory structure; VERIFY tags mark items needing directory re-check. Enrollment, outcomes, and per-center funding are UNKNOWN / REQUIRES LOCAL REQUEST.",
  center_count: centerRows.length,
  centers: centerRows.map(([id, name, host, city, programs, satellites]) => ({
    center_id: id,
    name,
    host_institution: host,
    city,
    programs_listed: programs,
    satellites: satellites.length ? satellites : [],
    enrollment: U,
    enrollment_note: RLR,
    outcomes: NPA,
    outcomes_note: RLR,
    funding_per_center: NPA,
    funding_note: RLR,
    sources: ["CC-SRC-137"]
  }))
};
writeJson("research/phase_2/arkansas_secondary_career_center_inventory.json", inventory);

const outcomesMatrix = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  unit_of_analysis_required: ["CENTER", "PROGRAM", "DISTRICT", "STATEWIDE"],
  rows: [
    {
      finding:
        "Concentrator outcomes at secondary area career centers comparable to traditional high-school CTE concentrators",
      unit: "STATEWIDE/HISTORICAL",
      period: "AY2008-2014 era (Dougherty 2017)",
      source: "CC-SRC-138",
      current_center_level_wages: NPA,
      current_center_level_placement: NPA
    },
    {
      finding: "Graduation rates high (>90%) in reported center analyses",
      unit: "STATEWIDE/HISTORICAL",
      period: "Dougherty 2017 reported analyses",
      source: "CC-SRC-138",
      current_center_level_wages: NPA,
      current_center_level_placement: NPA
    },
    {
      finding:
        "Center benefits not meaningfully different from HS CTE for similar concentrators",
      unit: "STATEWIDE/HISTORICAL",
      period: "Dougherty 2017",
      source: "CC-SRC-138",
      implication_for_magnets:
        "Public evidence does NOT show centers outperform HS CTE on concentrator outcomes; specialty magnets need a stronger differentiated case."
    },
    {
      finding: "Current per-center wages / placement / retention",
      unit: "CENTER",
      value: NPA,
      note: "OSD required annual report exists under center rules (CC-SRC-140) but was NOT harvested this slice"
    },
    {
      finding: "Program-level employment outcomes",
      unit: "PROGRAM",
      value: NPA
    },
    {
      finding: "District CTE spend context ~$129M (2023) in adequacy report",
      unit: "STATEWIDE",
      source: "CC-SRC-139",
      note: "Spending aggregate - not concentrator wage outcomes"
    }
  ],
  caveats: [
    "Do not collapse CENTER vs PROGRAM vs DISTRICT vs STATEWIDE",
    "Dougherty is historical statewide - not proof of current magnet superiority",
    "Local retention largely UNTESTED in public sources harvested here"
  ]
};
writeJson("research/phase_2/arkansas_cte_outcomes_matrix.json", outcomesMatrix);

const fundingStack = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "No invented dollar values. Tag operating/capital, recurring/one-time, formula/competitive.",
  sources: [
    {
      name: "Foundation / formula (district CTE teachers)",
      operating_or_capital: "OPERATING",
      recurring_or_one_time: "RECURRING",
      formula_or_competitive: "FORMULA",
      evidence: "CC-SRC-139 (~74% foundation share in reported CTE mix; district CTE spend context)",
      dollar_amount_this_slice: "NOT INVENTED - see adequacy worksheets"
    },
    {
      name: "VCA / Vocational Center Aid",
      operating_or_capital: "OPERATING",
      recurring_or_one_time: "RECURRING",
      formula_or_competitive: "FORMULA_PER_STUDENT_FTE_TIERED",
      evidence: "CC-SRC-140 (tiered FTE rules); CC-SRC-138 historical VCAF ~$20.1M",
      dollar_amount_this_slice: "Historical ~$20.1M cited in Dougherty; current tier dollars NOT HARVESTED as schedule here"
    },
    {
      name: "Perkins V",
      operating_or_capital: "OPERATING_AND_SOME_EQUIPMENT",
      recurring_or_one_time: "TIME_LIMITED_GRANT",
      formula_or_competitive: "FORMULA_FEDERAL_WITH_LOCAL_APPLICATION_RULES",
      evidence: "CC-SRC-139",
      dollar_amount_this_slice: U
    },
    {
      name: "State Start-Up Grants",
      operating_or_capital: "CAPITAL_ISH_EQUIPMENT_STARTUP",
      recurring_or_one_time: "ONE_TIME",
      formula_or_competitive: "COMPETITIVE",
      evidence: "CC-SRC-139",
      dollar_amount_this_slice: U,
      warning: "Cannot count as sustainable operating revenue for magnets"
    },
    {
      name: "H2 pathway incentives",
      operating_or_capital: U,
      recurring_or_one_time: U,
      formula_or_competitive: U,
      evidence: "CC-SRC-131 context; structure detail UNKNOWN this slice",
      dollar_amount_this_slice: U
    },
    {
      name: "Concurrent credit",
      operating_or_capital: "OPERATING",
      recurring_or_one_time: U,
      formula_or_competitive: U,
      evidence: "Cost share UNKNOWN this slice",
      dollar_amount_this_slice: U
    },
    {
      name: "Employer contributions / equipment",
      operating_or_capital: "OPERATING_OR_CAPITAL",
      recurring_or_one_time: "VARIABLE",
      formula_or_competitive: "EMPLOYER",
      evidence: "Hypothesis input - not a guaranteed stack item",
      dollar_amount_this_slice: U
    },
    {
      name: "WIOA / apprenticeship",
      operating_or_capital: U,
      recurring_or_one_time: U,
      formula_or_competitive: U,
      evidence: "Detail UNKNOWN this slice",
      dollar_amount_this_slice: U
    },
    {
      name: "Capital / facilities",
      operating_or_capital: "CAPITAL",
      recurring_or_one_time: "ONE_TIME_OR_DEBT_SERVICE",
      formula_or_competitive: U,
      evidence: "Facility funding path UNKNOWN / REQUIRES LOCAL + STATE CAPITAL PROCESS",
      dollar_amount_this_slice: U
    }
  ]
};
writeJson("research/phase_2/arkansas_cte_funding_stack.json", fundingStack);

writeText(
  "reports/CC_CTE_RECURRING_VS_ONE_TIME_FUNDING_ANALYSIS_1_0.md",
  "# CTE Recurring vs One-Time Funding Analysis 1.0\n\n**Slice:** " +
    SLICE +
    "\n**Status:** RESEARCH - no invented budgets\n\n## Rule\n\nSpecialty magnets **cannot** count startup grants, one-time equipment awards, or competitive launch funds as sustainable operating revenue.\n\n## Recurring (ops-capable candidates)\n\n| Source | Tag | Notes |\n|---|---|---|\n| Foundation / district CTE teacher formula | RECURRING / FORMULA | Adequacy CTE mix (CC-SRC-139) |\n| VCA / Vocational Center Aid | RECURRING / PER-STUDENT-FTE tiered | OSD rules (CC-SRC-140); historical VCAF ~$20.1M (CC-SRC-138) |\n| Employer ongoing partnerships | VARIABLE / EMPLOYER | Not guaranteed |\n\n## One-time / time-limited (not sustainable ops)\n\n| Source | Tag | Notes |\n|---|---|---|\n| State Start-Up Grants | COMPETITIVE / CAPITAL-ISH | **Do not** treat as ongoing ops |\n| Perkins V | TIME-LIMITED GRANT / federal formula rules | Useful; not a full ops substitute |\n| Capital/facilities | ONE-TIME or debt | Separate from annual instruction ops |\n\n## Unknown structure detail\n\nH2 incentives, concurrent-credit cost share, WIOA/apprenticeship detail, exact current VCA tier dollars - **UNKNOWN** or not harvested as a schedule this slice.\n\n## Magnet implication\n\nA rural specialty magnet that relies on start-up grants without a credible recurring stack (foundation + VCA-like FTE aid + durable local partners) fails the sustainability test even if launch capital is secured.\n"
);

const studentFlow = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  description:
    "Simplified flow for a student attending an Arkansas Secondary Technical Center (STC).",
  nodes: [
    {
      step: 1,
      actor: "Sending district",
      fact: "Student typically remains counted in sending-district enrollment for ADM/foundation purposes",
      detail: U,
      sources: ["CC-SRC-139", "CC-SRC-140"]
    },
    {
      step: 2,
      actor: "Secondary Technical Center",
      fact: "Center generates VCA / Vocational Center Aid via FTE or tiered student counts under OSD rules",
      detail: "Exact contemporaneous tier dollars NOT HARVESTED as full schedule this slice",
      sources: ["CC-SRC-140", "CC-SRC-138"]
    },
    {
      step: 3,
      actor: "Family / student",
      fact: "OSD framing: center programs funded so no cost to families for centers (tuition-style charge not the model)",
      detail: "Transportation, fees, dual-credit share, and special cases may still create barriers - many details UNKNOWN",
      sources: ["CC-SRC-140", "CC-SRC-137"]
    },
    {
      step: 4,
      actor: "Special education",
      fact: "Cost responsibility and service delivery across district vs center",
      detail: U
    }
  ],
  unknowns: [
    "Exact current VCA tier table dollars",
    "Transportation cost bearer by geography",
    "Concurrent credit cost share",
    "Special education funding/service split",
    "Sending-district fiscal impact of large magnet outflows"
  ]
};
writeJson("research/phase_2/arkansas_cte_student_funding_flow.json", studentFlow);

const marginalCost = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "VARIABLES_ONLY_NO_DOLLAR_INVENTION",
  equation_conceptual:
    "MarginalCost_student approx Delta(instructional_FTE) + Delta(equipment_utilization) + Delta(facilities_wear) + Delta(transport) + Delta(student_services) + Delta(compliance) - Delta(VCA_or_aid) - Delta(other_recurring_revenue)",
  variables: [
    { id: "V_INSTR_FTE", name: "Incremental instructor FTE / overload", unit: "FTE", value: U },
    { id: "V_EQUIP", name: "Equipment utilization / consumables", unit: "currency_or_hours", value: U },
    { id: "V_FAC", name: "Facilities wear / bay capacity constraint", unit: "capacity_slot", value: U },
    { id: "V_TRANS", name: "Transportation (bus miles, contractor, boarding)", unit: "currency", value: U },
    { id: "V_SERV", name: "Counseling, special ed, student services", unit: "currency", value: U },
    { id: "V_COMPLY", name: "OSD/ADE compliance and reporting load", unit: "staff_hours", value: U },
    { id: "V_VCA", name: "Incremental VCA / tiered aid", unit: "currency", value: U },
    { id: "V_OTHER", name: "Other recurring revenue (foundation share, employer)", unit: "currency", value: U },
    { id: "V_CAP_AMORT", name: "Capital amortization if expansion required", unit: "currency", value: U }
  ],
  decision_rule:
    "Do not claim fiscal neutrality without filling variables from local + OSD data. Startup grants are excluded from recurring side."
};
writeJson("research/phase_2/cte_marginal_student_cost_framework.json", marginalCost);

const accessMap = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  selection_rationale:
    "Sample geographies chosen because they are already in the rural specialty-magnet hypothesis set or contrast rural access (distance/weak host options). Not a complete statewide accessibility census.",
  samples: [
    {
      geography: "Rose Bud",
      geo_id: "AR-GEO-ROSE-BUD",
      nearest_centers: ["STC-ASUB (ASU Beebe Searcy)"],
      access_rating: "MODERATE",
      rationale: "Relatively close to Searcy STC; included as education candidate for magnet hypothesis.",
      distance_minutes: U
    },
    {
      geography: "West Helena",
      geo_id: "AR-GEO-WEST-HELENA",
      nearest_centers: ["STC-PCCUA (Phillips CTC Helena)", "satellites DeWitt/Stuttgart"],
      access_rating: "STRONG",
      rationale: "Local Phillips CTC - strong local access for some programs; Delta distress contrast.",
      distance_minutes: U
    },
    {
      geography: "Searcy County",
      geo_id: "AR-GEO-SEARCY-COUNTY",
      nearest_centers: ["STC-NCMC Leslie", "STC-ASUB Searcy"],
      access_rating: "MODERATE",
      rationale: "North Central Leslie nearby; Beebe/Searcy also relevant - rural Ozark access test.",
      distance_minutes: U
    },
    {
      geography: "Mississippi County",
      geo_id: "AR-GEO-MISSISSIPPI-COUNTY",
      nearest_centers: ["STC-ANC Blytheville"],
      access_rating: "STRONG",
      rationale: "ANC offerings + industrial geography - strong local for manufacturing/welding/aviation hypotheses.",
      distance_minutes: U
    },
    {
      geography: "Lafayette County",
      geo_id: "AR-GEO-SAMPLE-LAFAYETTE",
      nearest_centers: ["STC-CCCUA DeQueen", "STC-UAHT Hope"],
      access_rating: "WEAKER",
      rationale:
        "Included as longer-distance / thinner-access rural contrast for magnet hypothesis - exact drive minutes UNKNOWN.",
      distance_minutes: U,
      why_included: "Stress-tests whether specialty magnets are needed where STC distance is likely longer."
    },
    {
      geography: "Clinton / Van Buren County",
      geo_id: "AR-GEO-VAN-BUREN-COUNTY",
      nearest_centers: ["STC-NCMC Leslie", "Ozarka satellites"],
      access_rating: "MODERATE-WEAK",
      rationale: "North-central rural; paired with ag/livestock research geography - education access secondary sample.",
      distance_minutes: U,
      why_included: "Already designated research geography; CTE access not assumed strong."
    }
  ],
  not_forced_statewide:
    "This is a hypothesis-linked sample, not a claim that every Arkansas county was scored."
};
writeJson("research/phase_2/arkansas_cte_access_map.json", accessMap);

writeText(
  "reports/CC_ARKANSAS_CTE_ACCESS_MAP_1_0.md",
  "# Arkansas CTE Access Map 1.0\n\n**Slice:** " +
    SLICE +
    "\n**Source backbone:** CC-SRC-137 (OSD directory) + designated research geographies\n\n## Why these places\n\nSelected to evaluate **" +
    HYP_ID +
    "** - rural/distressed access, industrial vs thin-host contrast - **not** a full statewide travel-time model.\n\n| Geography | Nearest STC signal | Access | Why included |\n|---|---|---|---|\n| Rose Bud | ASU Beebe Searcy | MODERATE | Education candidate; close to Searcy center |\n| West Helena | Phillips CTC Helena | STRONG (some programs) | Local center + Delta contrast |\n| Searcy County | North Central Leslie + Beebe | MODERATE | Ozark rural access |\n| Mississippi County | ANC Blytheville | STRONG local (mfg/weld/aviation) | Industrial geography hypothesis |\n| Lafayette County | Cossatot DeQueen / UAHT Hope | WEAKER / longer distance | Distance stress-test; minutes UNKNOWN |\n| Clinton / Van Buren | North Central / Ozarka satellites | MODERATE-WEAK | Existing research geography |\n\nExact drive-time minutes: **UNKNOWN** this slice.\n"
);

const fitMatrix = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "PROVISIONAL_FIT_NOT_PERMANENT_ASSIGNMENT",
  rule: "Ratings are research candidacy labels only - do NOT permanently assign specialties to towns.",
  rows: [
    {
      geography: "Mississippi County",
      specialty: "Advanced manufacturing / welding / industrial maintenance / aviation-adjacent",
      fit: "STRONG CANDIDATE",
      basis:
        "ANC Blytheville program list includes aviation maintenance, industrial maintenance, welding, machine tool, mechatronics (CC-SRC-137) + industrial geography hypothesis",
      caveats: "Local employer demand and graduate retention still UNTESTED"
    },
    {
      geography: "Rose Bud",
      specialty: "Agriculture / related",
      fit: "PLAUSIBLE",
      basis:
        "Rural community ag hypothesis; ASU Beebe Searcy listed programs emphasize welding/nursing/construction/truck - ag may be district-level rather than STC-listed",
      caveats: "Do not treat Beebe STC list as proving an ag magnet; need district pathway + labor data"
    },
    {
      geography: "Rose Bud",
      specialty: "Construction / welding / diesel",
      fit: "PLAUSIBLE",
      basis: "Nearby Beebe STC program adjacency",
      caveats: "Prestige/academic integration and retention unproven"
    },
    {
      geography: "West Helena",
      specialty: "Industrial technology / welding / health",
      fit: "PLAUSIBLE",
      basis: "Phillips CTC local programs",
      caveats: "Specialty magnet differentiation vs existing center UNKNOWN"
    },
    {
      geography: "Searcy County",
      specialty: "Forestry / heavy equipment / rural utilities / construction",
      fit: "NOT ENOUGH EVIDENCE",
      basis: "North Central Leslie proximity; program-demand match incomplete",
      caveats: "Hypothesis pathways from prior slice - not confirmed"
    },
    {
      geography: "Lafayette County",
      specialty: "Any single regional specialty magnet",
      fit: "WEAK",
      basis: "Likely longer distance to DeQueen/Hope; thin evidence for a local specialty host",
      caveats: "Distance minutes UNKNOWN; do not force specialty"
    },
    {
      geography: "Clinton / Van Buren",
      specialty: "Livestock processing / rural trades",
      fit: "NOT ENOUGH EVIDENCE",
      basis: "Ag/processing research track is separate; CTE center adjacency MODERATE-WEAK",
      caveats: "Do not conflate meat-inspection hub hypothesis with CTE specialty proof"
    }
  ]
};
writeJson("research/phase_2/rural_cte_specialty_fit_matrix.json", fitMatrix);

writeText(
  "reports/CC_CTE_ACADEMIC_INTEGRATION_ACT_242_1_0.md",
  "# CTE Academic Integration (Act 242) 1.0\n\n**Sources:** CC-SRC-132, CC-SRC-133, CC-SRC-143\n\nAct 242 authorizes comparable CTE coursework to substitute for required core academic graduation courses via ADE crosswalk. Specialty magnets should use this as **integration permission**, not as proof that prestige equality already exists.\n\nDesign test: math/science taught through application (metallurgy, circuitry, ag biology/chem, structures, stats/robotics) with Act 242 alignments documented annually.\n\nUnknown: how widely districts use substitution in practice; equity of access to rigorous integrated sections.\n"
);

writeText(
  "reports/CC_CTE_RETENTION_VS_STUDENT_SUCCESS_FRAMEWORK_1_0.md",
  "# CTE Retention vs Student Success Framework 1.0\n\n## CRITICAL\n\n**Student success is not community retention.**\n\nA graduate who completes a credential, earns higher wages, and moves away is an education success and a **rural revitalization failure mode** (train-and-export) unless ownership, employers, housing, and quality of life create credible local futures.\n\n| Metric class | Examples | Revitalization relevance |\n|---|---|---|\n| Student success | Graduation, credential, wage, placement | Necessary, not sufficient |\n| Community retention | Live/work locally N years post-exit | Core falsifier for magnet-as-revitalization |\n| Ownership / firm birth | New local businesses, apprentices retained | Ecosystem hypothesis chain |\n| Local employer absorption | Hires from center/magnet into regional firms | Demand-side test |\n\nPublic evidence harvested this slice: local retention largely **UNTESTED**. Dougherty (CC-SRC-138) speaks to concentrator outcomes vs HS CTE - not community retention.\n"
);

writeText(
  "reports/CC_CTE_TRANSPORTATION_FEASIBILITY_1_0.md",
  "# CTE Transportation Feasibility 1.0\n\nRegional specialty magnets inherit the same physical constraint as STCs: **time and transport**.\n\n- Sending-district busing to centers: common model; cost bearer and max minutes **UNKNOWN** systematically this slice\n- Access map ratings (MODERATE / STRONG / WEAKER) are structural proximity signals - not measured drive-time matrices\n- Boarding / residential options: only if evidence supports; not proposed here\n- Failure mode: specialty quality exists but rural students cannot reach it daily\n\nNo invented route costs.\n"
);

writeText(
  "reports/CC_CTE_FACILITIES_CAPITAL_INTENSITY_CLASSES_1_0.md",
  "# CTE Facilities Capital Intensity Classes 1.0\n\n| Class | Examples | Capital intensity | Notes |\n|---|---|---|\n| A - Light lab / IT | Networking, some health theory | LOWER | Still needs qualified instructors |\n| B - Standard trades | Welding bays, automotive, construction | HIGH | Equipment + ventilation + consumables |\n| C - Heavy industrial / aviation | Aviation maintenance, process tech, advanced mfg lines | VERY HIGH | Employer co-investment often decisive |\n| D - Shared STC upgrade | Expand existing center specialty | VARIABLE | May beat greenfield magnet capital |\n\nStartup grants are not ops. Capital class C/D without recurring VCA/foundation/employer stack is unsustainable.\n"
);

writeText(
  "reports/CC_CTE_FAILURE_MODES_AND_DOUGHERTY_IMPLICATION_1_0.md",
  "# CTE Failure Modes and Dougherty Implication 1.0\n\n## Failure modes\n\n1. **Tracking / second-class pathway** - CTE as dumping ground (CC-SRC-141, CC-SRC-142)\n2. **Grant cliffs** - start-up / Perkins treated as permanent ops\n3. **Misalignment** - specialty not matched to regional employer demand / ownership pathways\n4. **Train-and-export** - student success without community retention\n5. **Transport exclusion** - rural distance non-participation\n6. **Cream-skimming / sending-district fiscal harm** - UNKNOWN magnitude\n7. **Dougherty implication** - centers not clearly better than HS CTE for similar concentrators (CC-SRC-138), so magnets need a **stronger differentiated case** (prestige, academic rigor, employer depth, retention), not \"centers exist therefore magnets work\"\n\n## What would change our mind\n\nCurrent center-level outcome tables showing durable wage/placement/retention advantages; recurring funding adequacy; measured access; equity safeguards against tracking.\n"
);

const prRecords = [
  {
    record_id: "CC-PR-014",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Do Arkansas career centers already prove that regional CTE magnets will raise rural prosperity?",
    public_answer:
      "No. Arkansas Secondary Technical Centers are real and important for access, but the best historical statewide evaluation we registered (Dougherty 2017) found concentrator outcomes at centers comparable to traditional high-school CTE - not a clear superiority story. Centers also do not, by themselves, prove graduates stay and build local businesses. Specialty magnets remain a qualified research hypothesis, not a settled prosperity machine.",
    what_we_originally_said:
      "Regional specialty CTE magnets may expand opportunity and strengthen rural resilience.",
    what_made_us_question_it: "Dougherty evidence and the train-and-export falsifier.",
    what_we_learned:
      "Existing centers are a foundation and a caution: access is not differentiated outcomes and is not retention.",
    where_our_reasoning_was_weak:
      "Risk of treating the STC network as proof of the magnet revitalization hypothesis.",
    what_we_now_say:
      "Hypothesis status QUALIFIED: promising only where demand, transport, recurring funding, rigorous academics, and local employment/ownership pathways exist; CTE alone is insufficient.",
    why_we_made_that_decision: "Match public evidence strength; avoid doctrine.",
    what_we_still_dont_know:
      "Current center-level wages, placement, and local retention (NOT PUBLICLY AVAILABLE / not harvested).",
    what_else_this_could_affect: ["Education module", "Rural revitalization claims"],
    potential_secondary_effects_or_unintended_consequences: [
      "Overbuilding specialty campuses without outcome gains"
    ],
    what_evidence_could_change_our_mind_again:
      "Current center-level panels showing durable advantages plus retention."
  },
  {
    record_id: "CC-PR-015",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "If students graduate and get good jobs somewhere else, is that still a win?",
    public_answer:
      "It is a win for the student. It is not automatically a win for rural revitalization. Our critical test is whether communities gain people, firms, and ownership - not only whether individuals escape. We will not market train-and-export as community success.",
    what_we_originally_said: "Education can function as productive local infrastructure.",
    what_made_us_question_it: "Retention falsification agenda.",
    what_we_learned: "Student success and community retention must be measured separately.",
    where_our_reasoning_was_weak: "Collapsing individual mobility with place prosperity.",
    what_we_now_say:
      "Dual scorecards: credentials/wages AND local retention/ownership absorption.",
    why_we_made_that_decision: "Honesty about rural goals.",
    what_we_still_dont_know: "Arkansas STC local retention rates.",
    what_else_this_could_affect: ["Success metrics for any magnet pilot"],
    potential_secondary_effects_or_unintended_consequences: [
      "Pressure to discourage legitimate student mobility - rejected; measure both, coerce neither"
    ],
    what_evidence_could_change_our_mind_again:
      "Evidence that export-heavy CTE still seeds return migration / remote ownership at scale."
  },
  {
    record_id: "CC-PR-016",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Can we launch magnets with start-up grants and figure out operating money later?",
    public_answer:
      "No. Start-up grants and one-time equipment money are not sustainable operations. Arkansas already uses recurring foundation support for district CTE and Vocational Center Aid for centers. A magnet plan that cannot show recurring funding is a grant cliff waiting to happen.",
    what_we_originally_said: "Map the funding stack before design.",
    what_made_us_question_it: "Adequacy + OSD rules + historical VCAF.",
    what_we_learned: "Recurring vs one-time tags are a hard design gate.",
    where_our_reasoning_was_weak: "Temptation to treat launch capital as a model.",
    what_we_now_say:
      "No sustainable-ops claim without foundation/VCA-like recurring stack; start-up is not ops.",
    why_we_made_that_decision: "Fiscal honesty.",
    what_we_still_dont_know: "Exact current VCA tier dollars; H2 incentive structure detail.",
    what_else_this_could_affect: ["Any campus proposal"],
    potential_secondary_effects_or_unintended_consequences: [
      "Programs that open then cut when grants end"
    ],
    what_evidence_could_change_our_mind_again:
      "A documented recurring aid path sufficient for specialty ops."
  },
  {
    record_id: "CC-PR-017",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question:
      "Will specialty trade schools just recreate old vocational tracking?",
    public_answer:
      "They can, if design is careless. Historical vocational tracking sorted students into lower-prestige tracks. Modern CTE advocates and equity researchers both warn about that failure mode. Our hypothesis requires equal institutional prestige, academic-through-application rigor (including Act 242), and open opportunity - not a quieter tracking system.",
    what_we_originally_said: "Equality-of-prestige principle.",
    what_made_us_question_it: "NEPC Hodge brief + Advance CTE tracking resource.",
    what_we_learned: "Prestige and counseling design are load-bearing, not slogans.",
    where_our_reasoning_was_weak: "Under-weighting tracking risk early.",
    what_we_now_say:
      "Tracking is a named failure mode; magnets that fail equity/prestige tests should be rejected.",
    why_we_made_that_decision: "Protect the hypothesis from romantic amnesia.",
    what_we_still_dont_know: "Arkansas counseling/placement patterns by demography at STCs.",
    what_else_this_could_affect: ["Admissions, counseling, academic integration design"],
    potential_secondary_effects_or_unintended_consequences: [
      "Re-segregation by pathway under a specialty brand"
    ],
    what_evidence_could_change_our_mind_again:
      "Demographic access and outcome parity evidence under specialty models."
  },
  {
    record_id: "CC-PR-018",
    change_type: "RESEARCH_ANSWER",
    decision: "APPROVE",
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    skeptical_reader_question: "Which rural places should get which specialty campuses?",
    public_answer:
      "We do not permanently assign specialties. Mississippi County manufacturing-related pathways look like a STRONG CANDIDATE because ANC already lists aviation/industrial/welding/mechatronics beside an industrial geography hypothesis. Rose Bud agriculture is only PLAUSIBLE - nearby Beebe STC listings emphasize other trades, and ag may be district-level. Lafayette County looks WEAKER on access. Everything remains provisional until demand, transport, funding, and retention evidence improves.",
    what_we_originally_said: "Specialization follows regional opportunity.",
    what_made_us_question_it: "Incomplete program-demand match and distance unknowns.",
    what_we_learned: "Honest fit ratings beat forced specialty maps.",
    where_our_reasoning_was_weak: "Risk of cookie-cutter town-to-trade assignments.",
    what_we_now_say:
      "Provisional fit matrix only; no permanent specialty assignment; NOT ENOUGH EVIDENCE is a valid cell.",
    why_we_made_that_decision: "Avoid false precision.",
    what_we_still_dont_know: "Drive-time matrices; employer absorption; district vs STC ag delivery.",
    what_else_this_could_affect: ["Geography set education notes"],
    potential_secondary_effects_or_unintended_consequences: [
      "Political fights over specialty brands without evidence"
    ],
    what_evidence_could_change_our_mind_again:
      "Local demand studies + center outcome extracts + transport models."
  }
];

for (const rec of prRecords) {
  upsertBy(prRegistry.records, "record_id", rec);
  writeText(
    "reports/public_reasoning/" + rec.record_id + ".md",
    "# " +
      rec.record_id +
      " - " +
      rec.skeptical_reader_question +
      "\n\n## Public answer\n\n" +
      rec.public_answer +
      "\n\n## What we now say\n\n" +
      rec.what_we_now_say +
      "\n\n## What we still don't know\n\n" +
      rec.what_we_still_dont_know +
      "\n"
  );
}
prRegistry.version = "0.4.0";
prRegistry.slice_id = SLICE;
prRegistry.generated_at = TODAY;
writeJson("research/phase_2/public_reasoning_registry.json", prRegistry);

const verdict = {
  empirical_status: "QUALIFIED",
  verdict_summary:
    "Regional specialty CTE may be promising where employer demand, sustainable transportation, recurring funding, rigorous academics, and credible local employment/ownership pathways exist; CTE alone is insufficient for rural revitalization; current public evidence does NOT show centers outperform HS CTE on concentrator outcomes (Dougherty); local retention largely UNTESTED.",
  not_status: "SUPPORTED",
  decision: "KEEP_AS_HYPOTHESIS_QUALIFIED",
  adjudicator: ADJUDICATOR,
  decision_id: DECISION_ID,
  decided_at: TODAY,
  evidence_for: [
    "Statewide STC network exists (CC-SRC-137)",
    "Recurring VCA + foundation structures exist (CC-SRC-139/140)",
    "Act 242 academic integration pathway exists",
    "Some geographies have STRONG local STC access + program adjacency"
  ],
  evidence_against_or_limiting: [
    "Dougherty: centers not meaningfully better than HS CTE for similar concentrators",
    "Current center-level wages/placement NPA",
    "Retention UNTESTED",
    "Grant-cliff and tracking failure modes",
    "Transport/distance unknowns"
  ],
  sources_this_slice: newSources.map((s) => s.source_id)
};

const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === HYP_ID);
if (hyp) {
  Object.assign(hyp, {
    empirical_status: verdict.empirical_status,
    verdict: verdict,
    sources_foundation: [
      ...(hyp.sources_foundation || []),
      ...verdict.sources_this_slice
    ].filter((v, i, a) => a.indexOf(v) === i),
    last_updated: TODAY,
    slice_id: SLICE,
    governance: {
      ...(hyp.governance || {}),
      decision: verdict.decision,
      adjudicator: ADJUDICATOR,
      decision_id: DECISION_ID,
      reason: verdict.verdict_summary
    }
  });
}
hypDoc.slice_id = SLICE;
hypDoc.last_updated = TODAY;
hypDoc.version = "0.2.0";
writeJson("research/phase_2/education_research_hypothesis_registry.json", hypDoc);

Object.assign(moduleDoc, {
  status: "OPEN_QUALIFIED_EVALUATION",
  slice_id: SLICE,
  last_updated: TODAY,
  outcomes_funding_feasibility_slice: SLICE,
  empirical_status_primary_hypothesis: "QUALIFIED",
  inventory_artifact: "research/phase_2/arkansas_secondary_career_center_inventory.json",
  outcomes_artifact: "research/phase_2/arkansas_cte_outcomes_matrix.json",
  funding_artifacts: [
    "research/phase_2/arkansas_cte_funding_stack.json",
    "research/phase_2/arkansas_cte_student_funding_flow.json",
    "research/phase_2/cte_marginal_student_cost_framework.json"
  ],
  access_artifact: "research/phase_2/arkansas_cte_access_map.json",
  fit_artifact: "research/phase_2/rural_cte_specialty_fit_matrix.json",
  dougherty_implication:
    "Magnets need stronger differentiated case; centers not clearly superior to HS CTE on concentrator outcomes in historical statewide evaluation.",
  not_in_this_slice: [
    ...(moduleDoc.not_in_this_slice || []),
    "Invented dollar budgets",
    "Permanent specialty assignments",
    "Doctrine expansion",
    "Harvest of full OSD annual center reports"
  ].filter((v, i, a) => a.indexOf(v) === i)
});
writeJson("research/phase_2/arkansas_rural_cte_specialty_magnet_module.json", moduleDoc);

const newRqs = [
  {
    id: "CC-RQ-P21-047",
    question:
      "What are current per-center enrollment, completion, wage, placement, and local retention figures for Arkansas Secondary Technical Centers, and where must local/OSD requests fill gaps?",
    status: "open",
    domain: "education_cte",
    related_module: MOD_ID,
    related_sources: ["CC-SRC-137", "CC-SRC-138", "CC-SRC-140"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-048",
    question:
      "Holding student characteristics constant, do current STC programs outperform home-campus HS CTE on earnings and credentials - or does Dougherty historical null still hold?",
    status: "open",
    domain: "education_cte",
    related_sources: ["CC-SRC-138"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-049",
    question:
      "What recurring operating stack (foundation, VCA tiers, employer) can fund a specialty magnet without treating start-up grants as ops?",
    status: "open",
    domain: "education_cte",
    related_sources: ["CC-SRC-139", "CC-SRC-140", "CC-SRC-138"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-050",
    question:
      "For Rose Bud, West Helena, Searcy County, Mississippi County, Lafayette County, and Clinton/Van Buren, what are measured transport times and non-participation rates to nearest STCs?",
    status: "open",
    domain: "education_cte",
    related_sources: ["CC-SRC-137"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-051",
    question:
      "Which provisional specialty fits (e.g., Mississippi County manufacturing STRONG CANDIDATE; Rose Bud ag PLAUSIBLE) survive employer-demand and district-vs-STC delivery tests?",
    status: "open",
    domain: "education_cte",
    related_sources: ["CC-SRC-137", "CC-SRC-143", "CC-SRC-131"],
    slice_id: SLICE
  },
  {
    id: "CC-RQ-P21-052",
    question:
      "Do Act 242 substitutions and academic-through-application designs reduce tracking risk and raise prestige equivalence in practice?",
    status: "open",
    domain: "education_cte",
    related_sources: ["CC-SRC-132", "CC-SRC-133", "CC-SRC-141", "CC-SRC-142"],
    slice_id: SLICE
  }
];
for (const q of newRqs) {
  if (!rqDoc.questions.find((x) => x.id === q.id)) rqDoc.questions.push(q);
}
rqDoc.last_updated = TODAY;
writeJson("data/research/research_questions.json", rqDoc);

function nextNode() {
  const nums = kgDoc.nodes
    .map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return (Math.max(0, ...nums) || 0) + 1;
}
let nId = nextNode();
const kgAdds = [
  { label: "AR Secondary Career Center Inventory", kind: "dataset", related_id: "STC-INVENTORY" },
  { label: "CTE Outcomes Matrix (Dougherty constraint)", kind: "evidence", related_id: "CC-SRC-138" },
  { label: "CTE Funding Stack Recurring vs One-Time", kind: "framework", related_id: "CTE-FUNDING-STACK" },
  { label: "Rural CTE Access Map Sample", kind: "geography", related_id: "CTE-ACCESS-MAP" },
  {
    label: "Hypothesis QUALIFIED - Rural CTE Specialty Magnets",
    kind: "hypothesis_verdict",
    related_id: HYP_ID
  }
];
for (const a of kgAdds) {
  kgDoc.nodes.push({
    node_id: "CC-KG-" + String(nId++).padStart(3, "0"),
    ...a,
    slice_id: SLICE
  });
}
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

const NEXT =
  "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0";
const ALT_NEXT = [
  "CC-PHASE-2.1-AR-STC-CENTER-LEVEL-DATA-REQUEST-AND-OSD-ANNUAL-REPORT-HARVEST-1.0",
  "CC-PHASE-2.1-FIRST-20-BELOW-STRONG-REPAIR-1.0"
];

buildState.version = "0.4.7";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_ARKANSAS_CTE_OUTCOMES_FUNDING_AND_RURAL_MAGNET_FEASIBILITY_1_0_RETURN.md";
buildState.writing_focus =
  "CTE outcomes/funding/access feasibility: hypothesis QUALIFIED (not SUPPORTED); Dougherty null on center>HS CTE; recurring != startup; retention != student success.";
buildState.next_action = NEXT + " or STC center-level data request / first-20 repair.";
buildState.sources_registered = srcDoc.sources.length;
buildState.baseline = "2/86";
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary:
    "QUALIFIED evaluation of rural CTE specialty magnet hypothesis. Inventory ~" +
    inventory.center_count +
    " STCs; Dougherty constraint; funding stack; access/fit matrices; CC-PR-014-018. Sources " +
    srcDoc.sources.length +
    ".",
  return_report:
    "reports/CC_PHASE_2_1_ARKANSAS_CTE_OUTCOMES_FUNDING_AND_RURAL_MAGNET_FEASIBILITY_1_0_RETURN.md"
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Arkansas CTE Outcomes, Funding, and Rural Magnet Feasibility",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "CC-SRC-137-143",
    "arkansas_secondary_career_center_inventory.json",
    "arkansas_cte_outcomes_matrix.json",
    "arkansas_cte_funding_stack.json",
    "hypothesis QUALIFIED",
    "CC-PR-014-018",
    "CC-RQ-P21-047-052"
  ],
  next_recommended_slice: NEXT,
  alternate_next: ALT_NEXT,
  note: "Research only. No doctrine. No invented dollars. Validators PENDING until run."
};
const ex = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (ex) Object.assign(ex, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = NEXT;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

writeText(
  "reports/CC_PHASE_2_1_ARKANSAS_CTE_OUTCOMES_FUNDING_AND_RURAL_MAGNET_FEASIBILITY_1_0_RETURN.md",
  [
    "# " + SLICE + " - Return",
    "",
    "## 1. Executive Summary",
    "",
    "Research-only feasibility evaluation of **" +
      HYP_ID +
      "**. Verdict: **QUALIFIED** (not SUPPORTED). Arkansas STC network inventoried (~" +
      inventory.center_count +
      " centers, CC-SRC-137). Dougherty (CC-SRC-138): center concentrator outcomes comparable to HS CTE - magnets need a stronger case. Recurring vs one-time funding gate recorded. Retention is not student success. No doctrine; no invented dollars.",
    "",
    "**Sources: " +
      srcDoc.sources.length +
      "** · **Baseline: 2/86** · **PR: CC-PR-014-018**",
    "",
    "## 2. Mission / Scope",
    "",
    "Evaluate outcomes, funding, access, specialty fit, academic integration, transport, facilities intensity, and failure modes for rural specialty CTE magnets. Research hypothesis only.",
    "",
    "## 3. Hypothesis Under Evaluation",
    "",
    "`" + HYP_ID + "` / module `" + MOD_ID + "`",
    "",
    "## 4. Sources Added",
    "",
    "| ID | Title |",
    "|---|---|",
    "| CC-SRC-137 | OSD STC Directory 2024-25 |",
    "| CC-SRC-138 | Dougherty 2017 centers outcomes/funding |",
    "| CC-SRC-139 | Adequacy 2024 K-12 CTE Report |",
    "| CC-SRC-140 | OSD STC Rules (VCA tiered FTE) |",
    "| CC-SRC-141 | NEPC Hodge CTE tracking/equity |",
    "| CC-SRC-142 | Advance CTE tracking resource |",
    "| CC-SRC-143 | ADE Pathway Guide 2026-27 |",
    "",
    "## 5. Secondary Career Center Inventory",
    "",
    "Artifact: `research/phase_2/arkansas_secondary_career_center_inventory.json` (~" +
      inventory.center_count +
      " centers). Enrollment/outcomes/funding per center = UNKNOWN / REQUIRES LOCAL REQUEST / NOT PUBLICLY AVAILABLE.",
    "",
    "## 6. CTE Outcomes Matrix",
    "",
    "Artifact: `arkansas_cte_outcomes_matrix.json`. Distinguishes CENTER / PROGRAM / DISTRICT / STATEWIDE. Dougherty findings tagged STATEWIDE/HISTORICAL. Current center wages/placement = NOT PUBLICLY AVAILABLE. OSD annual report exists but not harvested.",
    "",
    "## 7. Funding Stack",
    "",
    "Artifact: `arkansas_cte_funding_stack.json`. Foundation RECURRING; VCA RECURRING tiered FTE; Perkins TIME-LIMITED; Start-Up COMPETITIVE/one-time; H2/concurrent/WIOA/capital often UNKNOWN.",
    "",
    "## 8. Recurring vs One-Time Analysis",
    "",
    "Report: `reports/CC_CTE_RECURRING_VS_ONE_TIME_FUNDING_ANALYSIS_1_0.md`. **Magnets cannot count startup grants as sustainable ops.**",
    "",
    "## 9. Student Funding Flow",
    "",
    "Artifact: `arkansas_cte_student_funding_flow.json`. Sending-district enrollment vs center VCA FTE; OSD no-cost-to-families framing; special ed UNKNOWN.",
    "",
    "## 10. Marginal Student Cost Framework",
    "",
    "Artifact: `cte_marginal_student_cost_framework.json`. Variables only - no invented dollars.",
    "",
    "## 11. Access Map",
    "",
    "Artifact + report for Rose Bud (MODERATE), West Helena (STRONG), Searcy County (MODERATE), Mississippi County (STRONG), Lafayette (WEAKER), Clinton/Van Buren (MODERATE-WEAK). Drive minutes UNKNOWN.",
    "",
    "## 12. Specialty Fit Matrix",
    "",
    "Provisional only: Mississippi County manufacturing **STRONG CANDIDATE**; Rose Bud ag **PLAUSIBLE**; several **NOT ENOUGH EVIDENCE** / **WEAK**. No permanent assignments.",
    "",
    "## 13. Academic Integration (Act 242)",
    "",
    "Report recorded. Substitution enables academic-through-application design; does not prove prestige equality.",
    "",
    "## 14. Retention Framework",
    "",
    "**CRITICAL:** student success is not community retention. Train-and-export named failure mode.",
    "",
    "## 15. Transportation",
    "",
    "Feasibility report: distance/non-participation risk; no invented route costs.",
    "",
    "## 16. Facilities Capital Intensity",
    "",
    "Classes A-D from light lab to aviation/heavy industrial; capital is not ops.",
    "",
    "## 17. Failure Modes",
    "",
    "Tracking, grant cliffs, misalignment, transport exclusion, cream-skimming UNKNOWN, Dougherty null implication.",
    "",
    "## 18. Dougherty Implication",
    "",
    "Historical statewide evaluation: centers not clearly better than HS CTE for similar concentrators; specialty magnets require stronger differentiated evidence.",
    "",
    "## 19. Public Reasoning",
    "",
    "CC-PR-014 (centers not proof), CC-PR-015 (success not retention), CC-PR-016 (startup not ops), CC-PR-017 (tracking risk), CC-PR-018 (no permanent specialty map).",
    "",
    "## 20. Research Questions Added",
    "",
    "CC-RQ-P21-047 through CC-RQ-P21-052 OPEN.",
    "",
    "## 21. Knowledge Graph Updates",
    "",
    "Nodes added for inventory, outcomes constraint, funding stack, access map, QUALIFIED verdict.",
    "",
    "## 22. Hypothesis Verdict",
    "",
    "**QUALIFIED** - not SUPPORTED. " + verdict.verdict_summary,
    "",
    "## 23. Module Updates",
    "",
    "`" + MOD_ID + "` status OPEN_QUALIFIED_EVALUATION with artifact links; still not doctrine / not campus launch.",
    "",
    "## 24. What Remains Unknown",
    "",
    "Per-center outcomes; current VCA tier dollar schedule; H2 incentive detail; concurrent cost share; special ed split; drive-time matrices; local retention; employer absorption.",
    "",
    "## 25. Registry Updates",
    "",
    "source_registry, research_questions, knowledge_graph, education_research_hypothesis_registry, arkansas_rural_cte_specialty_magnet_module, current_build_state, slice_queue, public_reasoning_registry.",
    "",
    "## 26. Validators",
    "",
    "| Command | Result |",
    "|---|---|",
    "| `pnpm research:validate` | PENDING |",
    "| `pnpm phase2:validate` | PENDING |",
    "| `pnpm baseline:validate` | PENDING |",
    "",
    "## 27. Commit Hash",
    "",
    "PENDING_COMMIT",
    "",
    "## 28. Next Slice",
    "",
    "Primary: `" + NEXT + "`",
    "",
    "Alternates: STC center-level data request / OSD annual report harvest; first-20 repair.",
    ""
  ].join("\n")
);

console.log("=== COMPLETE ===");
console.log("slice", SLICE);
console.log("sources", srcDoc.sources.length);
console.log("centers", inventory.center_count);
console.log("hypothesis", HYP_ID, "QUALIFIED");
console.log("public_reasoning", "CC-PR-014..018");
console.log("doctrine expanded: false");
console.log("validators: PENDING (not run by this script authoring step)");