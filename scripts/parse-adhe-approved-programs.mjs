/**
 * Parse ADHE AHECB Approved Degree Programs text extract into a structured
 * Arkansas official program catalog focused on strategic CIP families.
 * Source PDF: https://adhe.edu/File/AHECB_APPROVED_DEGREE_PROGRAMS_BoardDate_Apr_24_2026_update.pdf
 * Does not invent enrollment/capacity — those remain NEE.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-08-12";
const SLICE = "CC-ARKANSAS-STRATEGIC-CAPACITY-OFFICIAL-CATALOG-PULL-1.0";

const defaultInputs = [
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/h-constitutional-capitalism/agent-tools/13304a61-da4f-463f-a98f-d5ea5ab5cda7.txt"
  ),
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/h-constitutional-capitalism/agent-tools/33bfeb2a-b6e9-4f10-8f27-58925cef12ab.txt"
  ),
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/h-constitutional-capitalism/agent-tools/994be0ed-9b3d-4051-964d-f65222d710d9.txt"
  ),
];
const inputPaths = process.argv.length > 2 ? process.argv.slice(2) : defaultInputs.filter(fs.existsSync);
if (!inputPaths.length) {
  console.error("Missing ADHE text extracts");
  process.exit(1);
}

/** Strategic CIP 2-digit (and key 6-digit) families for HYP-130 */
const STRATEGIC = {
  agriculture_food: { cip2: ["01", "03"], label: "Agriculture / food / natural resources" },
  computer_ai_tech: { cip2: ["11", "30"], label: "Computer science / data / AI-related", nameHint: /data science|artificial intelligence|machine learning|cyber/i },
  engineering_manufacturing: { cip2: ["14", "15"], label: "Engineering / engineering technology / manufacturing" },
  skilled_trades: { cip2: ["46", "47", "48", "49"], label: "Construction / mechanic / precision / transport trades" },
  health_professions: { cip2: ["51"], label: "Health professions & related" },
  nuclear_energy: { cip2: ["15"], label: "Nuclear / energy-related tech", nameHint: /nuclear|energy systems|power/i },
};

const KEYSTONE_CIP6 = {
  "51.1201": "Medicine (MD)",
  "51.0401": "Dentistry (DDS/DMD)",
  "01.8001": "Veterinary Medicine (DVM)",
  "51.3801": "Registered Nursing / Nursing",
  "51.3901": "Licensed Practical / Vocational Nursing",
  "51.0911": "Radiologic Technology / Medical Imaging",
  "51.2308": "Physical Therapy",
  "51.2306": "Occupational Therapy",
  "14.0101": "Engineering, General",
  "11.0101": "Computer Science",
  "01.0102": "Agribusiness / Agricultural Business",
};

const AWARD_MAP = {
  CP: "Certificate of Proficiency",
  TC: "Technical Certificate",
  AA: "Associate of Arts",
  AS: "Associate of Science",
  AAS: "Associate of Applied Science",
  AGS: "Associate of General Studies",
  ABA: "Associate of Business Administration",
  ASNT: "Associate (Nuclear Technology)",
  AC: "Advanced Certificate",
  GC: "Graduate Certificate",
  PBC: "Post-Baccalaureate Certificate",
  BA: "Bachelor of Arts",
  BS: "Bachelor of Science",
  BBA: "Bachelor of Business Administration",
  BSN: "Bachelor of Science in Nursing",
  BSA: "Bachelor of Science in Agriculture",
  BSCE: "Bachelor of Science in Civil Engineering",
  BSEE: "Bachelor of Science in Electrical Engineering",
  BSME: "Bachelor of Science in Mechanical Engineering",
  BSCmpE: "Bachelor of Science in Computer Engineering",
  BSE: "Bachelor of Science in Education",
  BFA: "Bachelor of Fine Arts",
  BM: "Bachelor of Music",
  BME: "Bachelor of Music Education",
  BAS: "Bachelor of Applied Science",
  BGS: "Bachelor of General Studies",
  MA: "Master of Arts",
  MS: "Master of Science",
  MBA: "Master of Business Administration",
  MAcc: "Master of Accountancy",
  MSN: "Master of Science in Nursing",
  MSE: "Master of Science in Education",
  MEd: "Master of Education",
  MPA: "Master of Public Administration",
  MSA: "Master of Science in Agriculture",
  MEM: "Master of Engineering Management",
  EdS: "Education Specialist",
  EdD: "Doctor of Education",
  PhD: "Doctor of Philosophy",
  DNP: "Doctor of Nursing Practice",
  DPT: "Doctor of Physical Therapy",
  DVM: "Doctor of Veterinary Medicine",
  OTD: "Doctor of Occupational Therapy",
  MD: "Doctor of Medicine",
  DDS: "Doctor of Dental Surgery",
  "M.AT": "Master of Athletic Training",
  MSMC: "Master of Science in Mass Communication",
};

const programs = [];
const recordRe =
  /\b([ANIFPD])\s+(\d{2})\s+([A-Za-z0-9.]+)\s+(\d{2}\.\d{4})\s+(\d{3,4})\s+(\d+(?:-\d+)?)\s+(?:(\d+(?:-\d+)?%|\d+%)\s+)?(.+?)\s+(\d{1,2}\/\d{1,2}\/\d{4}|\d{4})\b/g;
const academicYear = "2026";

const HEADER_PATTERNS = [
  /AHECB Approved Degree Programs(?: by Distance Education)?\s+(.+?)\s+Academic Year\s+(\d{4})/i,
  /Assigned Degree Codes for Private and Nursing Institutions\s+(.+?)\s+Academic Year\s+(\d{4})/i,
];

function inferPreambleInstitution(filePath, text) {
  // Primary public PDF extract opens on ASU Jonesboro (title page / DVM row).
  if (/13304a61/i.test(filePath) || (/DVM 01\.8001/.test(text) && /BoardDate/i.test(filePath))) {
    return "Arkansas State University";
  }
  // Distance extract preamble before first header is unattributed — skip inventing campus.
  if (/33bfeb2a/i.test(filePath)) return "DISTANCE_LIST_PREAMBLE_UNATTRIBUTED";
  return "UNATTRIBUTED_PREAMBLE";
}

function sourceMeta(filePath) {
  if (/33bfeb2a|Distance/i.test(filePath)) {
    return {
      document: "AHECB_APPROVED_DEGREE_PROGRAMS_DistanceOnly_BoardDate_Apr_24_2026_update.pdf",
      url: "https://adhe.edu/File/AHECB_APPROVED_DEGREE_PROGRAMS_DistanceOnly_BoardDate_Apr_24_2026_update.pdf",
      list_scope: "distance_education_subset",
    };
  }
  if (/994be0ed|Private/i.test(filePath)) {
    return {
      document: "AY2026 Approved Degree List - Private Insts.pdf",
      url: "https://adhe.edu/File/AY2026%20Approved%20Degree%20List%20-%20Private%20Insts.pdf",
      list_scope: "private_and_nursing_institutions",
    };
  }
  return {
    document: "AHECB_APPROVED_DEGREE_PROGRAMS_BoardDate_Apr_24_2026_update.pdf",
    url: "https://adhe.edu/students-parents/degree-information-and-approved-lists",
    list_scope: "public_institutions_partial_extract",
  };
}

function parseFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const meta = sourceMeta(filePath);
  let currentInstitution = inferPreambleInstitution(filePath, text);
  // Split on any recognized institution header
  const splitRe =
    /(?=AHECB Approved Degree Programs(?: by Distance Education)?\s+|Assigned Degree Codes for Private and Nursing Institutions\s+)/i;
  const blocks = text.split(splitRe);
  for (const block of blocks) {
    for (const hp of HEADER_PATTERNS) {
      const hh = hp.exec(block);
      if (hh) {
        currentInstitution = hh[1]
          .replace(/^by Distance Education\s+/i, "")
          .trim();
        break;
      }
    }
    const flat = block.replace(/\s+/g, " ");
    recordRe.lastIndex = 0;
    let m;
    while ((m = recordRe.exec(flat)) !== null) {
      const status = m[1];
      if (status !== "A" && status !== "N") continue;
      const level = m[2];
      const award = m[3];
      const cip = m[4];
      const degreeCode = m[5];
      const creditHours = m[6];
      const percentDistance = m[7] || null;
      let name = m[8].trim().replace(/\s+\d{4}\s+\d{4}$/, "").trim();
      // Private-list names sometimes include "Dental" under other CIPs — keep keystone CIP filter
      const approvalDate = m[9];
      const cip2 = cip.slice(0, 2);

      let strategicFamily = null;
      for (const [key, cfg] of Object.entries(STRATEGIC)) {
        if (!cfg.cip2.includes(cip2)) continue;
        if (cfg.nameHint && key === "computer_ai_tech" && cip2 === "30") {
          if (!cfg.nameHint.test(name) && !/data|analytics|comput|informat/i.test(name))
            continue;
        }
        if (key === "nuclear_energy" && !cfg.nameHint.test(name)) continue;
        strategicFamily = key;
        break;
      }
      let keystone = KEYSTONE_CIP6[cip] || null;
      // Private dental/medicine name fallbacks when CIP OCR/layout differs
      if (!keystone && /dentistry|doctor of dental/i.test(name)) keystone = "Dentistry (DDS/DMD)";
      if (!keystone && /\bMD\b|Doctor of Medicine|Osteopathic Medicine/i.test(name))
        keystone = "Medicine (MD/DO)";
      if (!strategicFamily && !keystone) continue;
      if (!strategicFamily) {
        if (cip.startsWith("51") || /medicine|dental|nursing/i.test(name))
          strategicFamily = "health_professions";
        else if (cip.startsWith("01")) strategicFamily = "agriculture_food";
        else if (cip.startsWith("11")) strategicFamily = "computer_ai_tech";
        else if (cip.startsWith("14") || cip.startsWith("15"))
          strategicFamily = "engineering_manufacturing";
      }

      programs.push({
        available_in_arkansas: true,
        institution: currentInstitution,
        credential: AWARD_MAP[award] || award,
        award_code: award,
        cip_code: cip,
        degree_code: degreeCode,
        credit_hours: creditHours,
        percent_distance: percentDistance,
        program_name: name,
        pathway_length: creditHours ? `${creditHours} credit hours (ADHE list)` : "NEE",
        capacity: "NEE",
        location: "NEE_CAMPUS_GEOCODE",
        workforce_destination: "NEE",
        geographic_gap: "NEE",
        evidence_date: "2026-04-24",
        academic_year: academicYear,
        status_code: status,
        level_code: level,
        approval_date: approvalDate,
        strategic_family: strategicFamily,
        keystone: keystone,
        list_scope: meta.list_scope,
        source: {
          agency: "Arkansas Division of Higher Education / AHECB",
          document: meta.document,
          url: meta.url,
          listing_page:
            "https://adhe.edu/students-parents/degree-information-and-approved-lists",
        },
      });
    }
  }
}

for (const p of inputPaths) {
  console.log("Parsing", path.basename(p));
  parseFile(p);
}

// Deduplicate by institution+cip+award+degree_code+name
const seen = new Set();
const deduped = [];
for (const p of programs) {
  const k = [p.institution, p.cip_code, p.award_code, p.degree_code, p.program_name].join(
    "|"
  );
  if (seen.has(k)) continue;
  seen.add(k);
  deduped.push(p);
}

function summarize(family) {
  const rows = deduped.filter((p) => p.strategic_family === family);
  const institutions = [...new Set(rows.map((r) => r.institution))].sort();
  return {
    program_count: rows.length,
    institution_count: institutions.length,
    institutions,
  };
}

const keystonesFound = {};
for (const [cip, label] of Object.entries(KEYSTONE_CIP6)) {
  const rows = deduped.filter((p) => p.cip_code === cip || p.keystone === label);
  keystonesFound[cip] = {
    label,
    available_in_arkansas: rows.length > 0,
    institutions: [...new Set(rows.map((r) => r.institution))],
    programs: rows.map((r) => ({
      institution: r.institution,
      credential: r.credential,
      program_name: r.program_name,
      award_code: r.award_code,
      list_scope: r.list_scope,
    })),
  };
}

// Name-based supplements for private lists
const dentalRows = deduped.filter(
  (p) =>
    p.cip_code === "51.0401" ||
    /dentistry|doctor of dental|dental surgery|dental medicine/i.test(p.program_name)
);
const medicineRows = deduped.filter(
  (p) =>
    p.cip_code === "51.1201" ||
    p.cip_code === "51.1202" ||
    /doctor of medicine|osteopathic medicine|allopathic/i.test(p.program_name)
);

const leaveStateSignals = [
  {
    capability: "allopathic_or_osteopathic_medicine",
    question: "Is a medical doctorate pathway available in Arkansas?",
    answer: medicineRows.length ? "AVAILABLE_IN_STATE" : "LEAVE_STATE_OR_ABSENT_PENDING_VERIFY",
    institutions: [...new Set(medicineRows.map((r) => r.institution))],
    notes:
      "UAMS MD and/or Alice Walton / ACHE osteopathic pathways may appear across public + private lists. Capacity/scale remains NEE.",
  },
  {
    capability: "dentistry_DDS_DMD",
    question: "Is a dental school available in Arkansas?",
    answer: dentalRows.length
      ? "AVAILABLE_IN_STATE_PRIVATE_LIST"
      : "NOT_FOUND_IN_PARSED_LISTS_VERIFY",
    institutions: [...new Set(dentalRows.map((r) => r.institution))],
    notes:
      "Lyon College DDS (CIP 51.0401) appears on ADHE private AY2026 list if parsed. Capacity/scale/sufficiency NEE. Public-flagship dental school question remains distinct. Do not invent.",
  },
  {
    capability: "veterinary_medicine_DVM",
    question: "Is a DVM program available in Arkansas?",
    answer: keystonesFound["01.8001"]?.available_in_arkansas
      ? "AVAILABLE_IN_STATE"
      : "LEAVE_STATE_OR_ABSENT_PENDING_VERIFY",
    institutions: keystonesFound["01.8001"]?.institutions || [],
    notes: "ASU DVM on AY2026 approved list — seat scale / sufficiency still NEE.",
  },
];

const out = {
  version: "1.0.0",
  slice_id: SLICE,
  wave_slice_id: "CC-ARKANSAS-CAPACITY-FEASIBILITY-WAVE-1.0",
  generated_at: TODAY,
  status: "official_catalog_pull_partial_strategic_cip",
  module_id: "CC-MOD-ARKANSAS-OFFICIAL-PROGRAM-CATALOG",
  decision_id: "CC-DEC-116",
  update_id: "UPD-129",
  coverage_honesty:
    "Partial multi-list parse of ADHE approved-program extracts (public lead + distance subset + private/nursing). Not a complete statewide Excel ingest. Program existence ≠ sufficient scale. Capacity cells remain NEE until ADHE completer/enrollment reports are bound.",
  central_question:
    "What does Arkansas need that an Arkansas resident cannot currently obtain—or cannot obtain at sufficient scale—inside Arkansas?",
  not: [
    "complete_enrollment_census",
    "invented_seat_counts",
    "statewide_secondary_CTE_course_catalog",
    "apprenticeship_sponsor_census",
    "claim_that_program_existence_equals_sufficient_scale",
    "complete_public_institution_excel_ingest",
  ],
  source_of_truth: {
    listing_page:
      "https://adhe.edu/students-parents/degree-information-and-approved-lists",
    board_date: "2026-04-24",
    academic_year: "2026",
    parse_inputs: inputPaths.map((p) => path.basename(p)),
  },
  record_schema: [
    "available_in_arkansas",
    "institution",
    "credential",
    "cip_code",
    "capacity",
    "location",
    "pathway_length",
    "workforce_destination",
    "geographic_gap",
    "evidence_date",
  ],
  parse_stats: {
    strategic_programs_parsed: deduped.length,
    institutions_touched: [...new Set(deduped.map((p) => p.institution))].length,
  },
  family_summaries: Object.fromEntries(
    Object.keys(STRATEGIC).map((k) => [k, summarize(k)])
  ),
  keystone_capabilities: keystonesFound,
  leave_state_signals: leaveStateSignals,
  programs: deduped,
  next_pulls: [
    "Secondary CTE Programs of Study catalog (DCTE)",
    "Registered Apprenticeship sponsor list (OSD / USDOL)",
    "Enrollment / completer counts by CIP (ADHE statistical reports — separate from approved list)",
    "Campus geocodes for geographic_gap",
    "Residency slot inventories (GME) for medicine",
  ],
  feeds: [
    "data/project/arkansas_strategic_capacity_inventory.json",
    "data/project/arkansas_magnet_hub_intervention_packets.json",
  ],
  overall_percent_rule: "Catalog existence rows alone do not move the 43% dial; scale + feasibility + pilots must earn credit",
};

const outPath = path.join(root, "data/project/arkansas_official_program_catalog.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(
  `Wrote ${deduped.length} strategic programs; institutions=${out.parse_stats.institutions_touched}`
);
for (const [k, v] of Object.entries(out.family_summaries)) {
  console.log(`  ${k}: ${v.program_count} programs / ${v.institution_count} institutions`);
}
for (const [cip, v] of Object.entries(keystonesFound)) {
  console.log(
    `  keystone ${cip} ${v.label}: ${v.available_in_arkansas ? "YES" : "NO"} [${v.institutions.join("; ")}]`
  );
}
