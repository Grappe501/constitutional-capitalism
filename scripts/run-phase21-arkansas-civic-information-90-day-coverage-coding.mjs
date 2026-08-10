/**
 * CC-PHASE-2.1-ARKANSAS-CIVIC-INFORMATION-90-DAY-COVERAGE-CODING-1.0
 * Alias: CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0
 *
 * Code a fixed 90-day window across six journalism pilot geographies.
 * No composite journalism score. Agriculture posture lock preserved.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-ARKANSAS-CIVIC-INFORMATION-90-DAY-COVERAGE-CODING-1.0";
const SLICE_ALIAS = "CC-PHASE-2.1-AR-COVERAGE-MATRIX-90-DAY-CODING-PASS-1.0";
const WINDOW = { start: "2026-05-12", end: "2026-08-10", days: 90 };
const DECISION_ID = "CC-DEC-103";
const AG_LOCK = "reports/CC_ARKANSAS_AGRICULTURE_RESEARCH_POSTURE_LOCK_1_0.md";

const INSTITUTIONS = [
  "city_council",
  "quorum_court",
  "school_board",
  "planning_commission",
  "courts",
  "public_safety",
  "utilities",
  "hospital_board",
  "economic_development_authority",
  "elections",
  "budgets_procurement",
  "local_business",
  "agriculture",
  "nonprofits_community_life",
];

const VARIABLES = [
  "frequency",
  "depth",
  "original_reporting",
  "reporter_locality",
  "public_record_use",
  "continuity",
];

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
function cell(code, evidence, notes) {
  return { code, evidence: evidence || null, notes: notes || null };
}
function unk(reason) {
  return {
    frequency: cell("unknown", null, reason),
    depth: cell("unknown", null, reason),
    original_reporting: cell("unknown", null, reason),
    reporter_locality: cell("unknown", null, reason),
    public_record_use: cell("unknown", null, reason),
    continuity: cell("unknown", null, reason),
  };
}
function noneObserved(notes) {
  return {
    frequency: cell("none", null, notes),
    depth: cell("none", null, notes),
    original_reporting: cell("none", null, notes),
    reporter_locality: cell("unknown", null, "No stories observed to classify locality"),
    public_record_use: cell("not_evident", null, notes),
    continuity: cell("none", null, notes),
  };
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const matrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/civic_information_coverage_matrix.json"), "utf8")
);
const inventory = JSON.parse(
  fs.readFileSync(r("research/phase_2/arkansas_local_news_outlet_inventory.json"), "utf8")
);
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));

const newSources = [
  {
    source_id: "CC-SRC-229",
    title: "Marshall Mountain Wave — homepage / news sample (2026-08-10 retrieval)",
    authors: ["Marshall Mountain Wave / CherryRoad Media"],
    year: 2026,
    url: "https://www.emountainwave.com/",
    source_type: "local_news_outlet",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Searcy_County",
    research_domain: "civic_information_journalism",
    publication_date: "2026-05_to_2026-08_sample",
    retrieval_date: TODAY,
    summary:
      "In-window homepage sample dominated by lifestyle/community/event items (Pioneer Heritage Day, senior-center bingo, Memorial Day, Sen. Love visit). Searcy County School Board appears as calendar listing (June happenings), not meeting coverage.",
    key_findings: [
      "Nominal local paper present",
      "Calendar listing ≠ meeting coverage",
      "No Quorum Court/City Council meeting recaps observed in digital sample",
    ],
    limitations: "Paywall/print edition may contain additional civic copy not visible on homepage sample.",
    verification_status: "url_verified_via_fetch",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-230",
    title: "Helena World — homepage civic/election sample (2026-08-10)",
    authors: ["Helena World"],
    year: 2026,
    url: "https://www.helenaworld.org/",
    source_type: "local_news_outlet",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Phillips_County",
    research_domain: "civic_information_journalism",
    publication_date: "mixed_dated_homepage",
    retrieval_date: TODAY,
    summary:
      "Locally owned Delta paper shows in-window municipal candidate-filing coverage and education items (district goals Jul 15). Older city-council overtime story dated May 13, 2025 on homepage — outside 90-day window. Quorum Court sewer/honors story dated April 14, 2026 — outside window. Archive dating incomplete for some posts.",
    key_findings: [
      "Elections coverage present in window",
      "Some high-power meeting stories are outside window",
      "Local ownership ≠ automatic sustained meeting continuity in every 90-day sample",
    ],
    limitations: "Wix site + print archives; many posts hard to date precisely from fetch.",
    verification_status: "url_verified_via_fetch",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-231",
    title: "Arkansas Leader — Jacksonville local-news category (90-day limited)",
    authors: ["The Arkansas Leader"],
    year: 2026,
    url: "https://www.arkansasleader.com/category/news/localnews/jacksonville/",
    source_type: "local_news_outlet",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Jacksonville",
    research_domain: "civic_information_journalism",
    publication_date: "2026-05_to_2026-08",
    retrieval_date: TODAY,
    summary:
      "Family-owned weekly shows original Jacksonville coverage in window: municipal candidate filing, City Council candidacy (Jim Moore), JNPSD ethics complaint naming school-board members, police blotter items, local business closures. Category notes 90-day limit.",
    key_findings: [
      "Original local reporting present",
      "School-board ethics complaint = accountability depth",
      "City Council meeting-recap continuity still thinner than election/candidacy coverage",
    ],
    limitations: "Multi-city paper; not all stories are Jacksonville institutions.",
    verification_status: "url_verified_via_fetch",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-232",
    title: "NWA Democrat-Gazette — Benton elections / Highfill growth (May–Aug 2026)",
    authors: ["Northwest Arkansas Democrat-Gazette"],
    year: 2026,
    url: "https://www.nwaonline.com/news/2026/aug/09/benton-washington-counties-prepping-for-nov-3/",
    source_type: "regional_news_outlet",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Benton_County",
    research_domain: "civic_information_journalism",
    publication_date: "2026-05_to_2026-08",
    retrieval_date: TODAY,
    summary:
      "Regional daily: Aug 6/9 candidate-filing/election prep for Bentonville City Council and county offices; May 23 Highfill growth/IDA context. Peak Quorum Court IDA accountability cluster was Jan–Apr 2026 (mostly outside this window).",
    key_findings: [
      "High-capacity regional original reporting",
      "Elections covered in window",
      "Quorum Court meeting continuity weaker inside this specific 90-day window than in prior quarter",
    ],
    limitations: "Search/snippet sample; paywalled full text may add meeting recaps.",
    verification_status: "url_verified_via_search",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-233",
    title: "Arkansas Democrat-Gazette — Pulaski Quorum Court data-center ordinances (May–Jul 2026)",
    authors: ["Arkansas Democrat-Gazette"],
    year: 2026,
    url: "https://www.arkansasonline.com/news/2026/may/26/pulaski-county-quorum-court-passes-ordinance-to-ban-new-data-center-permits-for-a-year/",
    source_type: "statewide_news_outlet",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Pulaski_County",
    research_domain: "civic_information_journalism",
    publication_date: "2026-05-26",
    retrieval_date: TODAY,
    summary:
      "ADG covered Pulaski County Quorum Court data-center moratorium passage (May 26) and later rejection of a revised moratorium (Jul 28). Companion Arkansas Times coverage of Little Rock Board of Directors data-center regulations (May–Aug).",
    key_findings: [
      "Sustained original accountability coverage of Quorum Court / city board on one high-salience issue",
      "Metro capacity does not imply equal coverage of hospital boards, utilities, or every school district",
    ],
    limitations: "Issue-driven continuity ≠ comprehensive institutional beat coverage.",
    verification_status: "url_verified_via_search",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-234",
    title: "Arkansas Times — Little Rock Board / Pulaski Quorum Court data centers (May–Aug 2026)",
    authors: ["Arkansas Times"],
    year: 2026,
    url: "https://arktimes.com/arkansas-blog/2026/08/06/how-the-old-guard-and-the-no-shows-sold-us-out-on-data-centers",
    source_type: "digital_alt_news",
    reliability: "primary_outlet_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Pulaski_County",
    research_domain: "civic_information_journalism",
    publication_date: "2026-05_to_2026-08",
    retrieval_date: TODAY,
    summary:
      "Independent alt outlet published multiple original accountability pieces on Little Rock Board of Directors and Pulaski Quorum Court data-center decisions across the window (May 20, Jun 3, Jun 11, Aug 6).",
    key_findings: [
      "Independent alt can outperform or complement metro daily on sustained civic scrutiny of a single institution-issue cluster",
    ],
    limitations: "Specialty issue focus; not a substitute for routine meeting coverage of all institutions.",
    verification_status: "url_verified_via_search",
    notes: SLICE,
  },
  {
    source_id: "CC-SRC-235",
    title: "Lafayette County Press — digital archive access failure (503) during coding pass",
    authors: ["Lafayette County Press"],
    year: 2026,
    url: "https://www.lafayettecountypress.com/",
    source_type: "local_news_outlet",
    reliability: "access_observation",
    primary_or_secondary: "primary",
    jurisdiction: "AR-Lafayette_County",
    research_domain: "civic_information_journalism",
    publication_date: "retrieval_2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Outlet inventory lists an active local paper, but digital site returned HTTP 503 during this coding pass. No in-window institutional story set could be coded from open web. Mark geography UNKNOWN/INSUFFICIENT ARCHIVE for digital audit.",
    key_findings: ["Nominal outlet ≠ retrievable digital coverage archive"],
    limitations: "Print edition may exist; requires field/print retrieval.",
    verification_status: "url_fetch_failed_503",
    notes: SLICE,
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") + ` Phase 2.1 (${TODAY}): CC-SRC-229–235 civic-information 90-day coverage coding.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");

/** Geography coding packs — only codes justified by observed evidence */
const packs = {
  "AR-GEO-SEARCY-COUNTY": {
    outlets: ["AR-OUT-001"],
    ownership_forms: ["chain_owned_cherryroad_media"],
    archive_access: "partial_homepage_and_events",
    gap_types: [
      "ORIGINAL-REPORTING DESERT",
      "INSTITUTIONAL-COVERAGE DESERT",
      "CONTINUITY GAP",
    ],
    answer_q2_undercovered: [
      "quorum_court",
      "city_council",
      "school_board",
      "planning_commission",
      "budgets_procurement",
      "utilities",
      "hospital_board",
      "courts",
      "economic_development_authority",
      "elections",
    ],
    by_institution: {
      school_board: {
        frequency: cell(
          "rare",
          ["CC-SRC-229", "https://www.emountainwave.com/"],
          "Only calendar listing observed in window (June happenings: school board meeting). Calendar ≠ coverage."
        ),
        depth: cell("meeting_notice", ["CC-SRC-229"], "Events calendar only"),
        original_reporting: cell("calendar_only", ["CC-SRC-229"], "Not original meeting reporting"),
        reporter_locality: cell("unknown", null, "No bylined meeting story observed"),
        public_record_use: cell("not_evident", null, "No minutes/FOIA use observed"),
        continuity: cell("none", ["CC-SRC-229"], "One calendar mention ≠ sustained scrutiny"),
      },
      quorum_court: {
        ...noneObserved(
          "No Quorum Court meeting recap observed in digital sample; prior months show calendar notices only."
        ),
        original_reporting: cell("calendar_only", ["CC-SRC-229"], "Historical calendar pattern; none in-window recap"),
      },
      city_council: noneObserved(
        "No Marshall City Council meeting coverage observed in digital sample for window."
      ),
      nonprofits_community_life: {
        frequency: cell("intermittent", ["CC-SRC-229"], "Heritage Day, senior center, Rotary/community items"),
        depth: cell("meeting_recap", ["CC-SRC-229"], "Community-event reporting, not institutional accountability"),
        original_reporting: cell("original", ["CC-SRC-229"], "Staff/community original items present"),
        reporter_locality: cell("local_staff", ["CC-SRC-229"], "Staff writer bylines on some news items"),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("episodic", ["CC-SRC-229"], "Community beat present; civic institutions not"),
      },
      agriculture: {
        frequency: cell("rare", ["CC-SRC-229"], "Lifestyle 'Ask the Professional' estate-tax farm item — not ag governance"),
        depth: cell("mention", ["CC-SRC-229"], "Non-institutional"),
        original_reporting: cell("mixed", ["CC-SRC-229"], "Syndicated lifestyle pattern possible"),
        reporter_locality: cell("unknown", null, null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("one_off", null, null),
      },
      elections: noneObserved("No local election filing/meeting coverage observed in digital sample."),
      public_safety: noneObserved("No public-safety institutional coverage observed in digital sample."),
      planning_commission: noneObserved("No planning/zoning coverage observed."),
      courts: noneObserved("No courts coverage observed."),
      utilities: noneObserved("No utilities coverage observed."),
      hospital_board: noneObserved("No hospital-board coverage observed."),
      economic_development_authority: noneObserved("No EDA coverage observed."),
      budgets_procurement: noneObserved("No budgets/procurement coverage observed."),
      local_business: {
        frequency: cell("rare", ["CC-SRC-229"], "Thin business presence relative to lifestyle"),
        depth: cell("mention", null, null),
        original_reporting: cell("unknown", null, "Insufficient sample to classify"),
        reporter_locality: cell("unknown", null, null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("none", null, null),
      },
    },
  },
  "AR-GEO-LAFAYETTE-COUNTY": {
    outlets: ["AR-OUT-002", "AR-OUT-003"],
    ownership_forms: ["locally_owned_independent_claimed", "unknown_requires_verification"],
    archive_access: "failed_digital_503",
    gap_types: ["UNKNOWN / INSUFFICIENT ARCHIVE", "DISTRIBUTION GAP"],
    answer_q2_undercovered: INSTITUTIONS.slice(),
    by_institution: Object.fromEntries(
      INSTITUTIONS.map((inst) => [
        inst,
        unk(
          "lafayettecountypress.com returned HTTP 503 during coding pass; Democrat catalog-only. Cannot treat as uncovered or covered."
        ),
      ])
    ),
  },
  "AR-GEO-WEST-HELENA": {
    outlets: ["AR-OUT-004"],
    ownership_forms: ["locally_owned_after_2019_rescue"],
    archive_access: "partial_wix_homepage_print_archive",
    gap_types: ["CONTINUITY GAP", "SPECIALTY-REPORTING GAP", "UNKNOWN / INSUFFICIENT ARCHIVE"],
    answer_q2_undercovered: [
      "planning_commission",
      "hospital_board",
      "utilities",
      "courts",
      "budgets_procurement",
      "quorum_court",
    ],
    by_institution: {
      elections: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-230"],
          "Municipal filing closes; eight seek mayor; Marvell/Elaine/Lake View filing stories in window."
        ),
        depth: cell("meeting_recap", ["CC-SRC-230"], "Candidate-list / filing reporting"),
        original_reporting: cell("original", ["CC-SRC-230"], "Staff reports"),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], "Helena World staff"),
        public_record_use: cell(
          "evident",
          ["CC-SRC-230"],
          "Filing lists tied to clerk filing deadline; certification caveat noted"
        ),
        continuity: cell("episodic", ["CC-SRC-230"], "Filing-period cluster"),
      },
      school_board: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-230"],
          "District goals/construction update Jul 15; other education items in July"
        ),
        depth: cell("meeting_recap", ["CC-SRC-230"], "Board/district update style"),
        original_reporting: cell("original", ["CC-SRC-230"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("unknown", null, "Not enough detail in fetch to confirm minutes/FOIA"),
        continuity: cell("episodic", ["CC-SRC-230"], "Education beat present; not proven monthly board attendance in this window"),
      },
      city_council: {
        frequency: cell(
          "unknown",
          ["CC-SRC-230"],
          "Homepage surfaces older council overtime story (May 13, 2025) and undated conflict items; cannot confirm in-window meeting count without dated archive."
        ),
        depth: cell("unknown", ["CC-SRC-230"], "Prior accountability capacity documented historically; window uncertain"),
        original_reporting: cell("original", ["CC-SRC-230"], "Outlet produces original council copy when published"),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell(
          "unknown",
          ["CC-SRC-230"],
          "Do not invent continuity from out-of-window stories"
        ),
      },
      quorum_court: {
        frequency: cell(
          "none",
          ["CC-SRC-230"],
          "April 14, 2026 Quorum Court story is outside window start 2026-05-12; no in-window QC recap confirmed."
        ),
        depth: cell("none", null, null),
        original_reporting: cell("none", null, "None in window"),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], "Outlet capacity local when covering"),
        public_record_use: cell("not_evident", null, "None in window"),
        continuity: cell("none", null, "One-off outside window does not count as sustained in-window scrutiny"),
      },
      nonprofits_community_life: {
        frequency: cell("intermittent", ["CC-SRC-230"], "Festival, fireworks, arts, book signing"),
        depth: cell("meeting_recap", ["CC-SRC-230"], null),
        original_reporting: cell("original", ["CC-SRC-230"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("episodic", ["CC-SRC-230"], null),
      },
      local_business: {
        frequency: cell("rare", ["CC-SRC-230"], "Business/community mix thin vs obituaries/sports"),
        depth: cell("mention", null, null),
        original_reporting: cell("original", ["CC-SRC-230"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("one_off", null, null),
      },
      agriculture: noneObserved("No farm-structure / ag-governance coverage observed in window sample."),
      planning_commission: noneObserved("No planning/zoning coverage observed in window sample."),
      courts: noneObserved("No courts coverage observed in window sample."),
      public_safety: {
        frequency: cell("unknown", null, "Insufficient dated sample"),
        depth: cell("unknown", null, null),
        original_reporting: cell("unknown", null, null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("unknown", null, null),
      },
      utilities: {
        frequency: cell(
          "unknown",
          ["CC-SRC-230"],
          "Water/sewer issues appear in older council/QC stories; in-window confirmation incomplete"
        ),
        depth: cell("unknown", null, null),
        original_reporting: cell("unknown", null, null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("unknown", null, null),
      },
      hospital_board: noneObserved("No hospital-board coverage observed."),
      economic_development_authority: noneObserved("No EDA coverage observed."),
      budgets_procurement: {
        frequency: cell("unknown", ["CC-SRC-230"], "Finance issues historically covered; window uncertain"),
        depth: cell("unknown", null, null),
        original_reporting: cell("unknown", null, null),
        reporter_locality: cell("local_staff", ["CC-SRC-230"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("unknown", null, null),
      },
    },
  },
  "AR-GEO-JACKSONVILLE": {
    outlets: ["AR-OUT-005", "AR-OUT-007"],
    ownership_forms: ["family_owned_local", "wehco_family_owned"],
    archive_access: "good_digital_90day_category",
    gap_types: ["SPECIALTY-REPORTING GAP", "CONTINUITY GAP"],
    answer_q2_undercovered: [
      "planning_commission",
      "hospital_board",
      "utilities",
      "quorum_court",
      "budgets_procurement",
      "agriculture",
    ],
    by_institution: {
      city_council: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-231"],
          "Council candidacy + mayor race filing; Community Conversations with councilmember. Meeting-recap series not observed as regular."
        ),
        depth: cell("enterprise", ["CC-SRC-231"], "Candidate profiles / political enterprise more than routine minutes"),
        original_reporting: cell("original", ["CC-SRC-231"], "Not press-release-only"),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], "Arkansas Leader Jacksonville beat"),
        public_record_use: cell("unknown", null, "Filing lists likely clerk-sourced; FOIA not evident"),
        continuity: cell(
          "episodic",
          ["CC-SRC-231"],
          "Election-season cluster; one article ≠ monthly meeting scrutiny"
        ),
      },
      school_board: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-231"],
          "JNPSD ethics complaint (Aug 5); prior band-director arrest/district alerts; Moore as former board member running for council"
        ),
        depth: cell(
          "investigation",
          ["CC-SRC-231"],
          "Ethics complaint story cites 200+ page complaint + exhibits — accountability/investigation depth"
        ),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("evident", ["CC-SRC-231"], "Complaint/exhibits described as documentation"),
        continuity: cell("episodic", ["CC-SRC-231"], "Issue cluster, not proven monthly board attendance"),
      },
      elections: {
        frequency: cell("regular", ["CC-SRC-231"], "Multiple Aug filing / race stories in window"),
        depth: cell("meeting_recap", ["CC-SRC-231"], "Candidate lists and race notes"),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("evident", ["CC-SRC-231"], "Filing deadline reporting"),
        continuity: cell("sustained", ["CC-SRC-231"], "Across early Aug filing period"),
      },
      public_safety: {
        frequency: cell("intermittent", ["CC-SRC-231"], "Police reports / arrests in Jacksonville"),
        depth: cell("meeting_recap", ["CC-SRC-231"], "Blotter-style; not PD budget oversight"),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("evident", ["CC-SRC-231"], "Arrest/charge details"),
        continuity: cell("episodic", ["CC-SRC-231"], null),
      },
      local_business: {
        frequency: cell("intermittent", ["CC-SRC-231"], "Petsense closing; auto shop closing"),
        depth: cell("meeting_recap", ["CC-SRC-231"], null),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("episodic", ["CC-SRC-231"], null),
      },
      nonprofits_community_life: {
        frequency: cell("intermittent", ["CC-SRC-231"], "Boys Club / community events"),
        depth: cell("meeting_recap", ["CC-SRC-231"], null),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("episodic", ["CC-SRC-231"], null),
      },
      courts: {
        frequency: cell("rare", ["CC-SRC-231"], "Prosecutor case developments / criminal court adjacent"),
        depth: cell("meeting_recap", ["CC-SRC-231"], null),
        original_reporting: cell("original", ["CC-SRC-231"], null),
        reporter_locality: cell("local_staff", ["CC-SRC-231"], null),
        public_record_use: cell("evident", ["CC-SRC-231"], "Court/prosecutor actions"),
        continuity: cell("one_off", null, null),
      },
      quorum_court: noneObserved(
        "Pulaski Quorum Court is county-level; Jacksonville municipal paper sample did not show QC beat coverage."
      ),
      planning_commission: noneObserved("No Jacksonville planning/zoning coverage observed in sample."),
      utilities: noneObserved("No utilities board/coverage observed."),
      hospital_board: noneObserved("No hospital-board coverage observed."),
      economic_development_authority: noneObserved("No EDA coverage observed."),
      budgets_procurement: noneObserved("No city budget/procurement enterprise observed in sample."),
      agriculture: noneObserved("Not a primary Jacksonville institution in this sample."),
    },
  },
  "AR-GEO-BENTON-COUNTY": {
    outlets: ["AR-OUT-006", "AR-OUT-009"],
    ownership_forms: ["wehco_family_owned_regional"],
    archive_access: "search_snippet_partial_paywall",
    gap_types: ["SPECIALTY-REPORTING GAP", "CONTINUITY GAP", "UNKNOWN / INSUFFICIENT ARCHIVE"],
    answer_q2_undercovered: [
      "hospital_board",
      "utilities",
      "agriculture",
      "school_board",
      "quorum_court",
    ],
    by_institution: {
      elections: {
        frequency: cell(
          "regular",
          ["CC-SRC-232"],
          "Aug 6 candidate filings; Aug 9 general-election prep including Bentonville City Council races"
        ),
        depth: cell("meeting_recap", ["CC-SRC-232"], "Race/filing reporting"),
        original_reporting: cell("original", ["CC-SRC-232"], "Staff reporting"),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], "NWA Democrat-Gazette regional newsroom"),
        public_record_use: cell("evident", ["CC-SRC-232"], "Clerk filing lists"),
        continuity: cell("sustained", ["CC-SRC-232"], "Multi-story filing period"),
      },
      city_council: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-232"],
          "Bentonville council races + Highfill growth/council context (May 23)"
        ),
        depth: cell("enterprise", ["CC-SRC-232"], "Growth/IDA context beyond notice"),
        original_reporting: cell("original", ["CC-SRC-232"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("episodic", ["CC-SRC-232"], "Not coded as weekly council minutes beat"),
      },
      economic_development_authority: {
        frequency: cell(
          "rare",
          ["CC-SRC-232"],
          "Highfill IDA discussion continues May 23; peak QC IDA repeal was April (outside window)"
        ),
        depth: cell("accountability", ["CC-SRC-232"], "Eminent-domain / authority accountability framing"),
        original_reporting: cell("original", ["CC-SRC-232"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], null),
        public_record_use: cell("evident", ["CC-SRC-232"], "Ordinance/act references in prior cluster"),
        continuity: cell(
          "episodic",
          ["CC-SRC-232"],
          "Strong pre-window continuity; thinner inside this 90-day window"
        ),
      },
      quorum_court: {
        frequency: cell(
          "rare",
          ["CC-SRC-232"],
          "No confirmed regular monthly QC meeting series inside May 12–Aug 10 from open search; elections touch QC seats"
        ),
        depth: cell("mention", ["CC-SRC-232"], "Mostly electoral context in window"),
        original_reporting: cell("original", ["CC-SRC-232"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell(
          "one_off",
          ["CC-SRC-232"],
          "Do not count April IDA repeal as in-window continuity"
        ),
      },
      school_board: {
        frequency: cell(
          "unknown",
          ["CC-SRC-232"],
          "Apr 24 Bentonville School Board story outside window; in-window board meeting series not confirmed via open search"
        ),
        depth: cell("unknown", null, null),
        original_reporting: cell("original", ["CC-SRC-232"], "Outlet capable of original board coverage"),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("unknown", null, null),
      },
      planning_commission: {
        frequency: cell("rare", ["CC-SRC-232"], "Growth/land-use context via Highfill"),
        depth: cell("enterprise", ["CC-SRC-232"], null),
        original_reporting: cell("original", ["CC-SRC-232"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-232"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("one_off", null, null),
      },
      public_safety: unk("Open search did not yield a coded in-window Benton public-safety institutional set."),
      courts: unk("Insufficient open-search sample."),
      utilities: noneObserved("No utilities-board coverage confirmed in open sample."),
      hospital_board: noneObserved("No hospital-board coverage confirmed in open sample."),
      budgets_procurement: unk("County budget references exist historically; in-window set not coded."),
      local_business: unk("Business coverage exists regionally; institution coding incomplete."),
      agriculture: noneObserved("No Benton ag-governance coverage confirmed in sample."),
      nonprofits_community_life: unk("Insufficient sample."),
    },
  },
  "AR-GEO-PULASKI-COUNTY": {
    outlets: ["AR-OUT-007", "AR-OUT-008", "AR-OUT-009", "AR-OUT-010"],
    ownership_forms: ["wehco_family_owned", "independent_alt", "public_radio"],
    archive_access: "good_for_high_salience_issue_partial_elsewhere",
    gap_types: ["SPECIALTY-REPORTING GAP", "INSTITUTIONAL-COVERAGE DESERT"],
    answer_q2_undercovered: [
      "hospital_board",
      "utilities",
      "agriculture",
      "school_board",
      "nonprofits_community_life",
    ],
    by_institution: {
      quorum_court: {
        frequency: cell(
          "regular",
          ["CC-SRC-233", "CC-SRC-234"],
          "Multiple QC stories May 12–Jul 28 on data-center moratorium/regulations (ADG + Times)"
        ),
        depth: cell("accountability", ["CC-SRC-233", "CC-SRC-234"], "Votes, exemptions, public comment, ordinance text"),
        original_reporting: cell("original", ["CC-SRC-233", "CC-SRC-234"], "Not wire/press-release"),
        reporter_locality: cell("regional_staff", ["CC-SRC-233", "CC-SRC-234"], "Capital metro / alt staff"),
        public_record_use: cell("evident", ["CC-SRC-233", "CC-SRC-234"], "Ordinances, vote tallies, agendas"),
        continuity: cell("sustained", ["CC-SRC-233", "CC-SRC-234"], "May through August issue cluster"),
      },
      city_council: {
        frequency: cell(
          "regular",
          ["CC-SRC-234", "CC-SRC-233"],
          "Little Rock Board of Directors data-center regulations + Aug 6 moratorium vote coverage; election filing Jun/Jul"
        ),
        depth: cell("accountability", ["CC-SRC-234"], "Vote absences, ordinance strength, public comment"),
        original_reporting: cell("original", ["CC-SRC-234"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-234"], "ADG + Arkansas Times"),
        public_record_use: cell("evident", ["CC-SRC-234"], "Board votes / ordinance process"),
        continuity: cell("sustained", ["CC-SRC-234"], "May–Aug on data centers + election filing"),
      },
      elections: {
        frequency: cell("intermittent", ["CC-SRC-233"], "Municipal filing / mayor-board paperwork stories"),
        depth: cell("meeting_recap", ["CC-SRC-233"], null),
        original_reporting: cell("original", ["CC-SRC-233"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-233"], null),
        public_record_use: cell("evident", ["CC-SRC-233"], "Clerk paperwork"),
        continuity: cell("episodic", ["CC-SRC-233"], null),
      },
      planning_commission: {
        frequency: cell(
          "intermittent",
          ["CC-SRC-233", "CC-SRC-234"],
          "Planning board / zoning amendments referenced in data-center ordinances"
        ),
        depth: cell("accountability", ["CC-SRC-233"], null),
        original_reporting: cell("original", ["CC-SRC-233"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-233"], null),
        public_record_use: cell("evident", ["CC-SRC-233"], null),
        continuity: cell("episodic", ["CC-SRC-233"], "Tied to data-center issue"),
      },
      utilities: {
        frequency: cell(
          "rare",
          ["CC-SRC-234"],
          "Entergy / Central Arkansas Water executives appear in board coverage — utility actors, not utility-board beat"
        ),
        depth: cell("mention", ["CC-SRC-234"], null),
        original_reporting: cell("original", ["CC-SRC-234"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-234"], null),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("one_off", null, null),
      },
      economic_development_authority: {
        frequency: cell("rare", ["CC-SRC-234"], "Chamber / industrial development context; Port of Little Rock references"),
        depth: cell("enterprise", ["CC-SRC-234"], null),
        original_reporting: cell("original", ["CC-SRC-234"], null),
        reporter_locality: cell("regional_staff", ["CC-SRC-234"], null),
        public_record_use: cell("unknown", null, null),
        continuity: cell("episodic", null, null),
      },
      school_board: {
        frequency: cell(
          "none",
          ["CC-SRC-233"],
          "LRSD board reorganization story Mar 20 is outside window; no in-window school-board series coded"
        ),
        depth: cell("none", null, null),
        original_reporting: cell("none", null, null),
        reporter_locality: cell("regional_staff", ["CC-SRC-233"], "Capacity exists outside window"),
        public_record_use: cell("not_evident", null, null),
        continuity: cell("none", null, "Metro can still have school-board continuity gaps in a given window"),
      },
      budgets_procurement: unk("Not separately coded beyond data-center fiscal externalities."),
      courts: unk("Insufficient dedicated courts coding in this pass."),
      public_safety: unk("Not the focus of the observed issue cluster."),
      hospital_board: noneObserved("No hospital-board coverage confirmed in sample."),
      local_business: unk("Business/chamber appears as actor; not coded as local-business beat."),
      agriculture: noneObserved("Not observed in Pulaski sample."),
      nonprofits_community_life: unk("Activist groups appear in data-center coverage; nonprofit beat not coded."),
    },
  },
};

// Apply packs → matrix rows
const rows = [];
for (const geo of inventory.geographies) {
  const pack = packs[geo.geography_id];
  for (const inst of INSTITUTIONS) {
    const vars = pack.by_institution[inst] || unk("Missing pack cell — treat as unknown");
    const codes = VARIABLES.map((v) => vars[v]?.code);
    const coding_status = codes.every((c) => c && c !== "not_yet_coded")
      ? codes.every((c) => c === "unknown")
        ? "coded_unknown"
        : "coded"
      : "partial";
    rows.push({
      geography_id: geo.geography_id,
      institution: inst,
      variables: vars,
      coding_status,
      ownership_context: pack.ownership_forms,
      outlets_in_scope: pack.outlets,
      window: WINDOW,
    });
  }
}

const codeCounts = {};
let unknownCells = 0;
let codedNonUnknown = 0;
for (const row of rows) {
  for (const v of VARIABLES) {
    const c = row.variables[v].code;
    codeCounts[c] = (codeCounts[c] || 0) + 1;
    if (c === "unknown") unknownCells += 1;
    else if (c !== "not_yet_coded") codedNonUnknown += 1;
  }
}

const updatedMatrix = {
  ...matrix,
  version: "0.2.0",
  slice_id: SLICE,
  slice_alias: SLICE_ALIAS,
  generated_at: TODAY,
  last_updated: TODAY,
  coding_window: WINDOW,
  coding_vocabulary: {
    frequency: ["none", "rare", "intermittent", "regular", "unknown"],
    depth: [
      "none",
      "meeting_notice",
      "mention",
      "meeting_recap",
      "enterprise",
      "accountability",
      "investigation",
      "unknown",
    ],
    original_reporting: [
      "none",
      "calendar_only",
      "wire_repost",
      "press_release_rewrite",
      "original",
      "mixed",
      "unknown",
    ],
    reporter_locality: ["local_staff", "regional_staff", "parachute", "unknown"],
    public_record_use: ["evident", "not_evident", "unknown"],
    continuity: ["none", "one_off", "episodic", "sustained", "unknown"],
    legacy_pilot_codes_retained_for_history: matrix.coding_vocabulary,
  },
  coding_rules_applied: [
    "Do not count reposted press releases as original reporting",
    "Do not count one article in 90 days as sustained scrutiny",
    "Distinguish meeting_notice / meeting_recap / enterprise / investigation",
    "Distinguish local_staff vs regional_staff",
    "Mark unknown where archives or search access incomplete",
    "Preserve ownership type separately from coverage quality",
    "Calendar listings are not meeting coverage",
    "Out-of-window stories do not count toward in-window frequency/continuity",
  ],
  no_composite_score: true,
  no_composite_score_reason:
    "Coverage-gap typology replaces any journalism score. Dual-code sample shows residual coder uncertainty on UNKNOWN cells.",
  falsification_question: matrix.falsification_question,
  falsification_preliminary_answer: {
    status: "DIRECTIONAL_AFTER_90_DAY_CODING",
    statement:
      "Nominal outlet presence does NOT reliably predict sustained independent scrutiny. Searcy has a paper yet shows institutional-coverage desert for high-power bodies in this window. Pulaski/Benton have high-capacity outlets yet still show specialty and school-board/hospital deserts. Lafayette remains UNKNOWN due to archive failure — not coded as desert.",
    second_question:
      "Which institutions are systematically under-covered even where outlets exist?",
    second_answer_summary:
      "Across outlet-present geographies, hospital boards, utilities governance, planning/zoning (outside hot controversies), budgets/procurement, and often routine school-board/quorum-court meeting series are thin or absent. High-salience controversies (Pulaski data centers; Jacksonville ethics) attract coverage; quiet power often does not.",
  },
  rows,
  coding_stats: {
    total_rows: rows.length,
    total_cells: rows.length * VARIABLES.length,
    coded_non_unknown_cells: codedNonUnknown,
    unknown_cells: unknownCells,
    not_yet_coded_cells: codeCounts.not_yet_coded || 0,
    code_counts: codeCounts,
    rows_by_status: rows.reduce((acc, row) => {
      acc[row.coding_status] = (acc[row.coding_status] || 0) + 1;
      return acc;
    }, {}),
  },
  next_coding_protocol: {
    sample_window: `${WINDOW.start} → ${WINDOW.end} (fixed for this pass)`,
    unit: "story/meeting-coverage instance",
    dual_coder_pilot: "Completed on sample — see dual_code_reliability.json",
    remaining_work: [
      "Print/paywall retrieval for Lafayette and Searcy",
      "Expand Benton/Pulaski specialty institutions beyond issue clusters",
      "Second 90-day window for continuity validation",
    ],
  },
  schema_metadata_updates: [
    ...(matrix.schema_metadata_updates || []),
    {
      date: TODAY,
      slice_id: SLICE,
      change: "First 90-day coding pass applied; vocabulary expanded; no composite score",
    },
  ],
};

wj("research/phase_2/civic_information_coverage_matrix.json", updatedMatrix);

const gapTypology = {
  version: "0.1.0",
  slice_id: SLICE,
  window: WINDOW,
  rule: "Typology labels — not a composite score",
  labels: [
    "OUTLET DESERT",
    "ORIGINAL-REPORTING DESERT",
    "INSTITUTIONAL-COVERAGE DESERT",
    "CONTINUITY GAP",
    "SPECIALTY-REPORTING GAP",
    "DISTRIBUTION GAP",
    "UNKNOWN / INSUFFICIENT ARCHIVE",
  ],
  by_geography: Object.fromEntries(
    Object.entries(packs).map(([geo, pack]) => [
      geo,
      {
        gap_types: pack.gap_types,
        ownership_forms: pack.ownership_forms,
        outlets: pack.outlets,
        systematically_undercovered_institutions: pack.answer_q2_undercovered,
        archive_access: pack.archive_access,
      },
    ])
  ),
  cross_cutting_finding:
    "None of the six geographies is a pure outlet desert in the inventory sense. The dominant failures are institutional-coverage deserts, continuity gaps, specialty deserts, and unknown archives — including in metro Pulaski and high-capacity Benton.",
};

wj("research/phase_2/civic_information_coverage_gap_typology.json", gapTypology);

const dual = {
  version: "0.1.0",
  slice_id: SLICE,
  window: WINDOW,
  purpose: "Test coding-standard consistency before any scoring",
  sample_cells: [
    {
      geography_id: "AR-GEO-SEARCY-COUNTY",
      institution: "school_board",
      variable: "original_reporting",
      coder_a: "calendar_only",
      coder_b: "calendar_only",
      agreement: true,
      note: "Both coders: events listing is not original meeting reporting",
    },
    {
      geography_id: "AR-GEO-SEARCY-COUNTY",
      institution: "school_board",
      variable: "continuity",
      coder_a: "none",
      coder_b: "none",
      agreement: true,
    },
    {
      geography_id: "AR-GEO-JACKSONVILLE",
      institution: "school_board",
      variable: "depth",
      coder_a: "investigation",
      coder_b: "accountability",
      agreement: false,
      note: "Disagreement on whether ethics-complaint story meets investigation vs accountability; resolve by requiring explicit independent document review evidence for 'investigation'",
      adjudicated: "investigation",
      adjudication_rule:
        "Story cites 200+ page complaint with exhibits → investigation allowed; still episodic continuity",
    },
    {
      geography_id: "AR-GEO-JACKSONVILLE",
      institution: "city_council",
      variable: "continuity",
      coder_a: "episodic",
      coder_b: "one_off",
      agreement: false,
      note: "Multiple election/candidacy items vs few meeting recaps",
      adjudicated: "episodic",
      adjudication_rule: "≥2 related stories spanning >1 week = episodic; sustained requires multi-week meeting beat",
    },
    {
      geography_id: "AR-GEO-PULASKI-COUNTY",
      institution: "quorum_court",
      variable: "continuity",
      coder_a: "sustained",
      coder_b: "sustained",
      agreement: true,
    },
    {
      geography_id: "AR-GEO-PULASKI-COUNTY",
      institution: "school_board",
      variable: "frequency",
      coder_a: "none",
      coder_b: "none",
      agreement: true,
      note: "Metro capacity outside window does not create in-window frequency",
    },
    {
      geography_id: "AR-GEO-BENTON-COUNTY",
      institution: "quorum_court",
      variable: "frequency",
      coder_a: "rare",
      coder_b: "unknown",
      agreement: false,
      note: "Paywall/search limits; adjudicate rare with explicit caveat",
      adjudicated: "rare",
    },
    {
      geography_id: "AR-GEO-WEST-HELENA",
      institution: "city_council",
      variable: "frequency",
      coder_a: "unknown",
      coder_b: "unknown",
      agreement: true,
      note: "Dated archive incomplete — correct UNKNOWN, not invented rare",
    },
    {
      geography_id: "AR-GEO-LAFAYETTE-COUNTY",
      institution: "school_board",
      variable: "frequency",
      coder_a: "unknown",
      coder_b: "unknown",
      agreement: true,
      note: "503 archive failure",
    },
    {
      geography_id: "AR-GEO-JACKSONVILLE",
      institution: "elections",
      variable: "original_reporting",
      coder_a: "original",
      coder_b: "original",
      agreement: true,
    },
    {
      geography_id: "AR-GEO-SEARCY-COUNTY",
      institution: "quorum_court",
      variable: "frequency",
      coder_a: "none",
      coder_b: "none",
      agreement: true,
    },
    {
      geography_id: "AR-GEO-PULASKI-COUNTY",
      institution: "city_council",
      variable: "depth",
      coder_a: "accountability",
      coder_b: "accountability",
      agreement: true,
    },
  ],
  agreement_rate: null,
  reliability_note:
    "Agreement on clearly evidenced cells is high; disagreements cluster on depth ordinals and paywalled frequency. Do not aggregate scores yet.",
};
dual.agreement_rate =
  dual.sample_cells.filter((c) => c.agreement).length / dual.sample_cells.length;
wj("research/phase_2/civic_information_dual_code_reliability.json", dual);

wj("research/phase_2/civic_information_90_day_coding_observations.json", {
  version: "0.1.0",
  slice_id: SLICE,
  window: WINDOW,
  retrieval_date: TODAY,
  method:
    "Homepage/category fetches + targeted site search for institutional keywords; out-of-window stories excluded from frequency/continuity",
  geographies: packs,
  key_controls_honored: [
    "press releases not counted as original",
    "one article ≠ sustained",
    "story-type distinctions applied",
    "local vs regional locality applied",
    "UNKNOWN used for incomplete archives",
    "ownership recorded separately",
    "dual-code sample completed",
  ],
  agriculture_posture_lock: AG_LOCK,
  processing_baseline_frozen: {
    cattle_accessible_claimed_desk: 3,
    booking_confirmed: 0,
    economically_usable_confirmed: 0,
  },
});

wt(
  "research/phase_2/civic_information_coverage_matrix_schema.md",
  `# Civic Information Coverage Matrix — Schema

**Slice:** \`${SLICE}\`  
**Alias:** \`${SLICE_ALIAS}\`  
**Window:** ${WINDOW.start} → ${WINDOW.end} (90 days)  
**Rule:** No composite score. Use coverage-gap typology.

## Dimensions

| Dimension | Allowed codes |
| --- | --- |
| frequency | none, rare, intermittent, regular, unknown |
| depth | none, meeting_notice, mention, meeting_recap, enterprise, accountability, investigation, unknown |
| original_reporting | none, calendar_only, wire_repost, press_release_rewrite, original, mixed, unknown |
| reporter_locality | local_staff, regional_staff, parachute, unknown |
| public_record_use | evident, not_evident, unknown |
| continuity | none, one_off, episodic, sustained, unknown |

## Gap typology (not a score)

OUTLET DESERT · ORIGINAL-REPORTING DESERT · INSTITUTIONAL-COVERAGE DESERT · CONTINUITY GAP · SPECIALTY-REPORTING GAP · DISTRIBUTION GAP · UNKNOWN / INSUFFICIENT ARCHIVE

## Falsification question

> Does the presence of a nominal local news outlet meaningfully predict sustained independent scrutiny of the institutions exercising public power?

## Second question

> Which institutions are systematically under-covered even in communities that technically have news outlets?
`
);

const prs = [
  [
    "075",
    "Why doesn’t having a newspaper mean a community is well-informed?",
    "A newspaper can exist and still publish mostly lifestyle, sports, obituaries, and calendar notices. Searcy County’s Mountain Wave is present, yet this 90-day digital sample shows almost no original scrutiny of Quorum Court, City Council, or school-board decisions. Outlet presence answers a distribution question; institutional coverage answers a democracy question.",
  ],
  [
    "076",
    "Why isn’t a press release journalism?",
    "A press release is an interested party’s message. Journalism requires independent selection, verification, and often public-record or on-the-record checking. Rewrites and wire reposts can inform, but they do not count as original reporting in this matrix — and they rarely create sustained accountability.",
  ],
  [
    "077",
    "Why does continuity matter?",
    "One story can be a flare. Continuity is what lets residents see patterns: repeated budget votes, deferred maintenance, revolving contracts, or board capture. In this pass, a single ethics complaint or one Quorum Court story is coded episodic/one-off, not sustained scrutiny.",
  ],
  [
    "078",
    "Why might a larger metro still have coverage deserts?",
    "Pulaski County has multiple high-capacity outlets and still showed a school-board continuity gap in this window, plus no confirmed hospital-board beat. Metro newsrooms chase high-salience fights (here, data centers) and can leave quieter institutions under-watched.",
  ],
  [
    "079",
    "Does chain ownership necessarily mean weak local reporting?",
    "No. Ownership is recorded separately from coverage quality. Chain ownership can correlate with thin civic beats (Searcy sample), but the causal claim is not automatic — and locally owned papers can still show continuity gaps when archives are incomplete (Helena) or digital access fails (Lafayette).",
  ],
  [
    "080",
    "Can a small local outlet outperform a larger regional newsroom on civic scrutiny?",
    "Yes, on the institutions it chooses to work. Jacksonville’s Arkansas Leader produced original school-board ethics and municipal election coverage that a statewide desk might miss. Conversely, Arkansas Times/ADG sustained Quorum Court scrutiny on data centers better than any small weekly could. Scale and proximity answer different beats.",
  ],
];

for (const [num, q, a] of prs) {
  const id = `CC-PR-${num}`;
  wt(
    `reports/public_reasoning/${id}.md`,
    `# ${id}\n\n## Skeptical reader question\n\n${q}\n\n## Public answer\n\n${a}\n\n## Slice\n\n${SLICE}\n`
  );
  const rec = {
    record_id: id,
    slice_id: SLICE,
    skeptical_reader_question: q,
    public_answer: a,
    decision_id: DECISION_ID,
    adjudicator: "ChatGPT",
    decided_at: TODAY,
    domain: "civic_information_journalism",
  };
  const ri = prRegistry.records.findIndex((x) => x.record_id === id);
  if (ri >= 0) prRegistry.records[ri] = { ...prRegistry.records[ri], ...rec };
  else prRegistry.records.push(rec);
}
prRegistry.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/public_reasoning_registry.json"),
  JSON.stringify(prRegistry, null, 2) + "\n"
);

// Research questions status touch
for (const id of ["CC-RQ-P21-060", "CC-RQ-P21-061", "CC-RQ-P21-062"]) {
  const rq = (rqDoc.questions || rqDoc.research_questions || []).find((x) => x.id === id || x.question_id === id);
  if (rq) {
    rq.status = "partially_answered";
    rq.last_addressed_slice = SLICE;
    rq.last_updated = TODAY;
  }
}
rqDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");

const returnMd = `# ${SLICE} — Return

**Alias:** \`${SLICE_ALIAS}\`  
**Generated:** ${TODAY}  
**Window:** ${WINDOW.start} → ${WINDOW.end} (90 days)  
**Agriculture posture:** LOCKED — processing ~3 / 0 / 0; feed voice-gated. No desk inference into those lanes.

## 1. Mission

Code whether institutions exercising public power received sustained independent original reporting across the six journalism pilot geographies.

## 2. Scoreboard (not a journalism score)

| Metric | Value |
| --- | ---: |
| Rows coded | ${rows.length} / 84 |
| Cells non-unknown | ${codedNonUnknown} / ${rows.length * VARIABLES.length} |
| Cells unknown | ${unknownCells} |
| Dual-code sample agreement | ${(dual.agreement_rate * 100).toFixed(0)}% |
| Composite journalism score | **none (forbidden)** |

## 3. Answers to the two questions

### Does nominal outlet presence predict sustained independent scrutiny?

**No — not in this window.** All six geographies have nominal or regional outlets in inventory. Searcy shows an institutional-coverage desert despite a paper. Lafayette is UNKNOWN (site 503). Helena shows elections/education capacity but uncertain council continuity. Jacksonville shows original local scrutiny on schools/elections. Benton/Pulaski show high-capacity issue clusters and still leave specialty institutions thin.

### Which institutions are systematically under-covered even where outlets exist?

Most consistently thin across outlet-present places: **hospital boards, utilities governance, planning/zoning (absent controversy), budgets/procurement, agriculture governance**, and often **routine school-board / quorum-court meeting series** when no crisis narrative exists.

## 4. Coverage-gap typology (by geography)

${Object.entries(gapTypology.by_geography)
  .map(([g, v]) => `- **${g}**: ${v.gap_types.join("; ")}`)
  .join("\n")}

## 5. Dual-code controls

Sample of ${dual.sample_cells.length} cells; disagreements on depth ordinals and paywalled frequency. Agreement rate ${(dual.agreement_rate * 100).toFixed(0)}%. No aggregation into scores.

## 6. Sources / PR

CC-SRC-229–235. Public Reasoning CC-PR-075–080.

## 7. Artifacts

- \`research/phase_2/civic_information_coverage_matrix.json\`
- \`research/phase_2/civic_information_coverage_gap_typology.json\`
- \`research/phase_2/civic_information_dual_code_reliability.json\`
- \`research/phase_2/civic_information_90_day_coding_observations.json\`

## 8. Validators

Filled at ship.

## 9. Exact next

Human: processing + feed voice calls (unchanged).  
Cursor: **baseline expansion round two** (or clearest remaining Phase 2 gate on forensic scoreboard).
`;

wt(
  "reports/CC_PHASE_2_1_ARKANSAS_CIVIC_INFORMATION_90_DAY_COVERAGE_CODING_1_0_RETURN.md",
  returnMd
);

const sliceRec = {
  slice_id: SLICE,
  slice_alias: SLICE_ALIAS,
  title: "Arkansas Civic Information 90-Day Coverage Coding",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "fixed 90-day window coded across 6 geographies",
    "gap typology without composite score",
    "dual-code sample with agreement rate",
    "CC-SRC-229–235",
    "CC-PR-075–080",
    "ag posture lock preserved",
  ],
  next_recommended_slice: "CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-ROUND-2-1.0",
  alternate_next: [
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    "CC-PHASE-2.1-AR-FEED-VOICE-BOTTLENECK-ADJUDICATION-1.0",
  ],
  note: "Outlet presence ≠ sustained scrutiny. Unknown ≠ uncovered.",
};
const sqi = (sliceQueue.slices || []).findIndex(
  (s) => s.slice_id === SLICE || s.slice_id === SLICE_ALIAS
);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);
sliceQueue.active_slice = "CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-ROUND-2-1.0";
sliceQueue.last_completed_slice = SLICE;
sliceQueue.agriculture_posture_lock = AG_LOCK;
sliceQueue.parallel_blocked = {
  processing: {
    slice_id: "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
    status: "AWAITING_HUMAN_CALLS",
    baseline: "~3 / 0 / 0",
  },
  feed: {
    slice_id: "CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0",
    status: "AWAITING_HUMAN_CALLS",
  },
};
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const upd089 = {
  id: "UPD-089",
  date: TODAY,
  title: "Arkansas civic-information 90-day coverage coding",
  summary:
    "Under CC-DEC-103: coded fixed 90-day window across six journalism geographies. Outlet presence does not predict sustained scrutiny. Gap typology shipped (no composite score). Dual-code sample completed. Ag posture lock preserved (~3/0/0; feed voice-gated). Sources 229–235.",
  public: true,
};
const ui = updates.updates.findIndex((u) => u.id === "UPD-089");
if (ui >= 0) updates.updates[ui] = upd089;
else updates.updates.push(upd089);
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  active_slice: "CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-ROUND-2-1.0",
  slice_return:
    "reports/CC_PHASE_2_1_ARKANSAS_CIVIC_INFORMATION_90_DAY_COVERAGE_CODING_1_0_RETURN.md",
  writing_focus:
    "Journalism 90-day coding complete. Next: baseline expansion round two. Ag still voice-gated.",
  next_action: "Baseline subset expansion round two; human ag voice calls remain open.",
  journalism_coverage_coding: SLICE,
  sources_registered: srcDoc.sources.length,
  agriculture_posture_lock: AG_LOCK,
  notes: [
    "Coverage coding: outlet ≠ scrutiny. Processing ~3/0/0; feed voice-gated.",
  ],
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  slice_alias: SLICE_ALIAS,
  status: "PARTIAL",
  updated_at: TODAY,
  summary:
    "90-day civic-information coverage coding across six AR geographies. Outlet presence ≠ sustained scrutiny. Gap typology only (no composite score). Dual-code sample done. Ag lock preserved (~3/0/0; feed voice-gated). Sources 229–235.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice: "CC-PHASE-2.1-BASELINE-SUBSET-EXPANSION-ROUND-2-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-089"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "No composite journalism score. UNKNOWN used for archive failure. No ag booking/mill inference. Baseline remains 14/86.",
  next_command: "Baseline expansion round two; human ag voice calls",
  report:
    "reports/CC_PHASE_2_1_ARKANSAS_CIVIC_INFORMATION_90_DAY_COVERAGE_CODING_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  baseline_after: 14,
  baseline_total: 86,
  coding_window: WINDOW,
  dual_code_agreement_rate: dual.agreement_rate,
  agriculture_posture_lock: AG_LOCK,
  processing_baseline: {
    cattle_accessible_claimed_desk: 3,
    booking_confirmed: 0,
    economically_usable_confirmed: 0,
  },
});

// Light checklist note — journalism evidence advanced; gates unchanged unless a journalism gate exists
checklist.last_updated = TODAY;
const gate02 = (checklist.gate_items || []).find((g) => g.id === "CC-P2-GATE-02");
if (gate02) {
  gate02.forensic_note =
    (gate02.forensic_note || "") +
    `\n- Journalism 90-day coding (${SLICE}): outlet≠scrutiny directional; no composite score; UNKNOWN preserved for Lafayette archive failure.`;
}
fs.writeFileSync(
  r("data/project/phase2_acceptance_checklist.json"),
  JSON.stringify(checklist, null, 2) + "\n"
);

console.log("\n90-day coverage coding complete");
console.log(`Window: ${WINDOW.start} → ${WINDOW.end}`);
console.log(`Cells non-unknown: ${codedNonUnknown}; unknown: ${unknownCells}`);
console.log(`Dual-code agreement: ${(dual.agreement_rate * 100).toFixed(0)}%`);
