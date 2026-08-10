/**
 * CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0
 *
 * facility presence → usable capacity
 * Four layers: nominal → accessible → available → economically usable
 * Natural State discrete. No invented wait times/prices/interviews.
 * Voice PSTN calls not available in agent environment — logged as REQUIRED.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0";
const PRIOR =
  "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";
const CLINTON_LESSON =
  "We believed Clinton might already function as a regional USDA livestock-processing hub. The establishment data did not support that belief. We changed our understanding accordingly.";

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

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const accessInv = JSON.parse(
  fs.readFileSync(r("research/phase_2/ar_livestock_processing_access_inventory.json"), "utf8")
);
const gapMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/ar_processing_capacity_gap_matrix.json"), "utf8")
);
const moduleDoc = JSON.parse(
  fs.readFileSync(
    r("research/phase_2/arkansas_livestock_monopsony_processing_access_module.json"),
    "utf8"
  )
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));

// ─── Sources 182–190 ───────────────────────────────────────────
const newSources = [
  {
    source_id: "CC-SRC-182",
    title: "Natural State Poultry Processing — pricing & scheduling page (Cypress Valley / Grass Roots JV)",
    authors: ["Natural State Processing", "Cypress Valley Meat Company"],
    year: 2026,
    url: "https://cypressvalleymeatcompany.com/about/location/natural-state-processing/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Operator page publishes chicken whole-bird and cut-up fee schedule (including $200 minimum for 1–50 birds) and 'Schedule Your Appointment' language. Claims USDA inspected poultry. Same address historically associated with M51255; still absent from FSIS active MPI Directory extract re-checked 2026-08-10.",
    key_findings: [
      "Published poultry processing fee schedule",
      "Commercial site still markets appointment scheduling",
      "Directory conflict with FSIS active MPI unresolved by website alone",
    ],
    limitations: "Operator marketing; does not prove current FSIS grant; lead times not stated.",
    verification_status: "url_verified_via_fetch",
    notes: "Natural State discrete verification packet — primary website evidence.",
  },
  {
    source_id: "CC-SRC-183",
    title: "JACO Meats FAQ — custom processing fees (Hope, AR)",
    authors: ["JACO Meats"],
    year: 2026,
    url: "https://www.jacomeats.com/faq",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "State-inspected Hope processor FAQ: producers may bring own beef/hogs. Published fees — Beef: $0.90/lb hanging weight + $70 kill + $50 inspection; Hogs: $0.90/lb + $40 kill + $50 inspection. Does not publish current booking lead times.",
    key_findings: [
      "Explicit outside-animal acceptance for beef and hogs",
      "Itemized kill/inspection/hanging-weight fees published",
      "Lead time UNKNOWN without voice confirmation",
    ],
    limitations: "Fees may change; pathway is state inspection (intrastate); wait times not on page.",
    verification_status: "url_verified_via_fetch",
    notes: "Strongest cattle/hog fee primary evidence in this slice.",
  },
  {
    source_id: "CC-SRC-184",
    title: "Ferguson's Packing Company — published beef/hog/deer pricing (Atkins, AR)",
    authors: ["Ferguson's Packing Company"],
    year: 2026,
    url: "https://fergusonspacking.com/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Operator site publishes beef kill fee $75 + $0.85/lb and hog kill fee $50 + $0.85/lb (plus smoke/cure add-ons). Family-table marketing language. Separately reported as 2023 state meat inspection licensee (CC-SRC-177). Whether published prices apply to state-inspected retail-sale pathway vs custom-exempt owner-use requires plant confirmation.",
    key_findings: [
      "Published beef/hog processing fee components",
      "Pathway (state retail vs custom) not unambiguously labeled on pricing page",
      "Lead times not published",
    ],
    limitations: "Pathway ambiguity; call-to-order for booking.",
    verification_status: "url_verified_via_fetch",
    notes: "Cost components known; legal pathway for resale needs confirmation.",
  },
  {
    source_id: "CC-SRC-185",
    title: "Across the Creek Farm — Custom USDA Poultry Processing via B&R Winslow",
    authors: ["Across the Creek Farm"],
    year: 2026,
    url: "https://acrossthecreekfarm.com/custom-usda-poultry-processing",
    source_type: "commercial_partner_operator",
    reliability: "primary_partner_claim_about_plant",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Farm partner page for USDA poultry processing at B&R Processing (Winslow): commercial customers only (no yard birds); minimum 50 chickens; published whole-bird fees $5.00/$4.00/$3.50 by lot size; cut-up $2/ea. Scheduling via Spence 479-601-5390. Demonstrates LIMITED accessible poultry path — not open walk-in for small flocks.",
    key_findings: [
      "B&R poultry access is limited/commercial with 50-bird minimum via partner channel",
      "Published poultry fee schedule",
      "Booking requires phone scheduling",
    ],
    limitations: "Partner-mediated; cattle/hog B&R fees not on this page; not dual-sourced with B&R itself in this slice.",
    verification_status: "url_verified_via_fetch",
    notes: "Accessibility ≠ open to all independent flock sizes.",
  },
  {
    source_id: "CC-SRC-186",
    title: "Arkansas Cattlemen's Association — Beef Processing Plant Directory",
    authors: ["Arkansas Cattlemen's Association"],
    year: 2026,
    url: "https://www.arbeef.org/processing-plant-directory",
    source_type: "trade_association_directory",
    reliability: "secondary_association",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Association directory classifying processors by area as USDA Inspected, State Inspected, or Custom Exempt. Lists Cypress Valley Pottsville and Keys as USDA slaughter/process; Ferguson, JACO, Taylor's, J&D, Daily Meats, ASU, WBU as state; Hawthorn and 5R/Clinton Cypress under custom-exempt sections. Useful triangulation — not FSIS primary and not booking confirmation.",
    key_findings: [
      "Additional state-inspected names beyond 2023 news four",
      "Hawthorn listed custom-exempt despite FSIS Meat Slaughter row — status conflict",
      "5R and Clinton Cypress listed custom-exempt",
    ],
    limitations: "Self/association listing; may lag; no fees/lead times on fetched page.",
    verification_status: "url_verified_via_fetch",
    notes: "Secondary geographic roster expansion.",
  },
  {
    source_id: "CC-SRC-187",
    title: "Cypress Valley Meat Company — Arkansas Grown verified listing",
    authors: ["Arkansas Grown", "Cypress Valley Meat Company"],
    year: 2026,
    url: "https://arkansasgrown.org/listing/cypress-valley-meat-company/",
    source_type: "state_program_listing",
    reliability: "secondary_official_program_listing",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Verified Arkansas Grown listing for Cypress Valley Pottsville: USDA inspected; harvest/custom process beef, hogs, sheep, goats, bison; can label for resale to individuals, restaurants, farmers markets. Supports accessible capacity claim; no lead times or fees.",
    key_findings: [
      "Resale labeling claim for inspected product",
      "Multi-species including sheep",
      "Independent producer orientation",
    ],
    limitations: "Listing text; booking/economics unknown.",
    verification_status: "url_verified_via_fetch",
    notes: "Accessibility support for Pottsville federal path.",
  },
  {
    source_id: "CC-SRC-188",
    title: "FSIS MPI Directory re-check — Natural State / Clinton (2026-08-10 retrieval)",
    authors: ["USDA FSIS"],
    year: 2026,
    url: "https://www.fsis.usda.gov/sites/default/files/media_file/documents/MPI_Directory_by_Establishment_Name.csv",
    source_type: "federal_agency_directory",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2026-08-03-edition-rechecked",
    retrieval_date: TODAY,
    summary:
      "Re-retrieved MPI Directory CSV. Natural State Processing / M51255 still absent. Only Clinton/Van Buren active row remains Global Refrigerated Services V46922 at 245 Quality Drive (cold storage/ID). Confirms ongoing directory conflict with commercial Natural State pages.",
    key_findings: [
      "M51255 still not in active directory extract",
      "Same-address cold storage row persists",
    ],
    limitations: "Weekly snapshot; cannot alone explain commercial scheduling claims.",
    verification_status: "csv_retrieved",
    notes: "Natural State verification — directory leg.",
  },
  {
    source_id: "CC-SRC-189",
    title: "Keys Family Butcher Shop domain status note (services URL retrieval)",
    authors: ["Constitutional Capitalism research retrieval"],
    year: 2026,
    url: "https://keysfamilybutchershop.com/services/",
    source_type: "research_retrieval_note",
    reliability: "primary_observation_of_domain",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: TODAY,
    retrieval_date: TODAY,
    summary:
      "On 2026-08-10 retrieval, keysfamilybutchershop.com/services/ and homepage returned unrelated gambling/spam content rather than butcher services. Prior search snippets had described Custom Exempt vs USDA Approved services and cut sheets. Treat website as unreliable/compromised for current primary evidence; rely on FSIS row + association directory + phone verification.",
    key_findings: [
      "Operator website currently unusable for rate/booking evidence",
      "Information friction is itself an access barrier",
    ],
    limitations: "Domain may be restored later; snapshot observation.",
    verification_status: "url_verified_via_fetch",
    notes: "Information-friction bottleneck example.",
  },
  {
    source_id: "CC-SRC-190",
    title:
      "Arkansas Beef Council / UADA Public Policy Center — Retail Beef Production Practices survey (May 2020)",
    authors: ["University of Arkansas Division of Agriculture Public Policy Center"],
    year: 2020,
    url: "https://www.uaex.uada.edu/business-communities/public-policy-center/Arkansas-Beef-Council-Retail-Beef-Production-Report-May2020.pdf",
    source_type: "university_extension_survey",
    reliability: "secondary_official_extension",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_processing_infrastructure",
    publication_date: "2020-05",
    retrieval_date: TODAY,
    summary:
      "Pre-state-program survey of Arkansas beef slaughter/processing facilities. Documents producer perception of long waits; reported average advance-contact days by month ranging ~15–39 days (facility survey responses). Historical context only — NOT current 2026 booking lead times.",
    key_findings: [
      "Scheduling friction was already a documented producer concern in 2020",
      "Advance reservation windows varied widely by month",
    ],
    limitations: "2020 point-in-time; cannot substitute for 2026 plant calls.",
    verification_status: "url_verified_via_fetch",
    notes: "Secondary historical lead-time context — labeled HISTORICAL only in matrices.",
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  ` Phase 2.1 (${TODAY}): CC-SRC-182–190 open-plant booking / usable-capacity study.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources 182–190; total", srcDoc.sources.length);

// ─── Natural State verification ────────────────────────────────
const naturalState = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  establishment_name: "Natural State Processing",
  historical_establishment_number: "M51255+P51255",
  address: "245 Quality Dr, Clinton, AR 72031",
  discrete_from_cattle_hog_findings: true,
  question:
    "What is the current inspection and operating status of Natural State Processing?",
  resolution_code: "UNRESOLVED_AFTER_REASONABLE_DESK_INQUIRY",
  resolution_detail:
    "Commercial operator pages still publish USDA poultry pricing and appointment language; FSIS active MPI Directory re-check still lacks M51255; same address shows Global Refrigerated Services (V46922) cold-storage/ID only. Voice confirmation with plant/ARDA not completed in agent environment.",
  evidence_legs: [
    {
      leg: "FSIS_ACTIVE_MPI",
      result: "ABSENT",
      source_ids: ["CC-SRC-188", "CC-SRC-172"],
      provenance: "directory_primary",
    },
    {
      leg: "OPERATOR_WEBSITE",
      result: "CLAIMS_ACTIVE_USDA_POULTRY_WITH_PUBLISHED_FEES",
      source_ids: ["CC-SRC-182", "CC-SRC-175"],
      provenance: "establishment_operator_primary",
    },
    {
      leg: "SAME_ADDRESS_OTHER_FSIS_ROW",
      result: "V46922_GLOBAL_REFRIGERATED_SERVICES_COLD_STORAGE",
      source_ids: ["CC-SRC-188"],
      provenance: "directory_primary",
    },
    {
      leg: "VOICE_PLANT_CONFIRMATION",
      result: "NOT_COMPLETED_AGENT_CANNOT_PLACE_PSTN_CALLS",
      source_ids: [],
      provenance: "primary_outreach_gap",
    },
  ],
  published_fee_components_if_operating: {
    chicken_whole_bird_per_head: {
      "1-50": "200 USD minimum charge band per operator page",
      "51-500": "4.00",
      "501-2000": "3.95",
      "2000+": "3.85",
    },
    cut_up_per_head_additional: { band: "2.25–2.50" },
    source_ids: ["CC-SRC-182"],
    note: "Fees are operator-published; do not prove current FSIS grant.",
  },
  contamination_rule:
    "Do not use Natural State unresolved status to alter cattle/hog accessibility verdicts.",
  next_required: "Human voice call to (501) 745-2367 + ARDA/FSIS confirmation",
  last_updated: TODAY,
};
wj("research/phase_2/natural_state_processing_status_verification.json", naturalState);

// ─── Inquiry log ───────────────────────────────────────────────
const inquiries = [
  {
    inquiry_id: "INQ-001",
    establishment_id: "FSIS-6163437",
    establishment_name: "Cypress Valley Meat Company — Pottsville",
    contact_date: TODAY,
    contact_method: "operator_website_and_arkansas_grown_listing",
    respondent_role: "n/a_public_materials",
    outcome: "partial_desk_primary",
    nominal_confirmed: true,
    accessible_confirmed: "yes_claimed_independent_producers",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "sheep", "goats", "buffalo"],
    inspection_status_stated: "USDA_FEDERAL",
    services: ["slaughter", "cut_wrap", "label_for_resale_claimed"],
    fee_disclosure: "not_published",
    fee_notes: "No livestock rate sheet on fetched pages",
    economic_usability_signals: "UNKNOWN_AT_LAYER",
    constraints: ["INFORMATION_FRICTION_FEES", "SCHEDULING_UNKNOWN"],
    producer_geography_notes: "Claims Arkansas and surrounding regions",
    provenance: "establishment_operator_primary+state_program_listing",
    source_ids: ["CC-SRC-175", "CC-SRC-187"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(479) 968-6330",
  },
  {
    inquiry_id: "INQ-002",
    establishment_id: "STATE-JACO-HOPE",
    establishment_name: "JACO Meats",
    contact_date: TODAY,
    contact_method: "operator_website_faq",
    respondent_role: "n/a_public_materials",
    outcome: "partial_desk_primary",
    nominal_confirmed: true,
    accessible_confirmed: "yes",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "deer_wild_game"],
    inspection_status_stated: "STATE_INSPECTED_USDA_APPROVED_PROGRAM_CLAIM",
    services: ["custom_slaughter", "processing", "smoking", "vacuum_pack", "retail"],
    fee_disclosure: "public_sheet",
    fee_notes:
      "Beef: $0.90/lb hanging + $70 kill + $50 inspection; Hog: $0.90/lb + $40 kill + $50 inspection (FAQ)",
    economic_usability_signals: "FEE_COMPONENTS_KNOWN_MARGIN_UNKNOWN",
    constraints: ["INTRASTATE_ONLY_WITHOUT_CIS", "SCHEDULING_UNKNOWN"],
    producer_geography_notes: "Hope / Texarkana / SW Arkansas claimed",
    provenance: "establishment_operator_primary",
    source_ids: ["CC-SRC-183"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(870) 397-4189",
  },
  {
    inquiry_id: "INQ-003",
    establishment_id: "STATE-FERGUSON-ATKINS",
    establishment_name: "Ferguson's Packing Company",
    contact_date: TODAY,
    contact_method: "operator_website",
    respondent_role: "n/a_public_materials",
    outcome: "partial_desk_primary",
    nominal_confirmed: true,
    accessible_confirmed: "yes_family_processing_claimed",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "deer"],
    inspection_status_stated: "STATE_LICENSEE_REPORTED_2023_PATHWAY_ON_PRICE_PAGE_AMBIGUOUS",
    services: ["slaughter", "cut_wrap", "smoke_cure_add_ons"],
    fee_disclosure: "public_sheet",
    fee_notes:
      "Beef: $75 kill + $0.85/lb; Hog: $50 kill + $0.85/lb (+ smoke/cure). Confirm if state-inspected retail path or custom-exempt owner-use.",
    economic_usability_signals: "FEE_COMPONENTS_KNOWN_PATHWAY_AMBIGUOUS_MARGIN_UNKNOWN",
    constraints: ["PATHWAY_AMBIGUITY", "SCHEDULING_UNKNOWN"],
    producer_geography_notes: "Pope County / River Valley",
    provenance: "establishment_operator_primary",
    source_ids: ["CC-SRC-184", "CC-SRC-177"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(479) 641-7604",
  },
  {
    inquiry_id: "INQ-004",
    establishment_id: "FSIS-126548",
    establishment_name: "B & R Meat Processing — Winslow",
    contact_date: TODAY,
    contact_method: "partner_farm_website",
    respondent_role: "partner_scheduler_channel",
    outcome: "partial_desk_primary_poultry_only",
    nominal_confirmed: true,
    accessible_confirmed: "limited_poultry_commercial_min_50",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes:
      "Poultry booking via partner phone; cattle/hog lead times UNKNOWN / PRIMARY VERIFICATION REQUIRED",
    species_accepted: ["poultry_commercial_channel", "livestock_unknown_from_this_channel"],
    inspection_status_stated: "USDA_FEDERAL_FOR_POULTRY_CHANNEL",
    services: ["poultry_slaughter", "cut_up", "vacuum_label"],
    fee_disclosure: "public_sheet_via_partner",
    fee_notes: "Whole bird $3.50–$5.00 by lot size; cut-up $2; min 50 birds; no yard birds",
    economic_usability_signals: "POULTRY_FEE_KNOWN_MARGIN_UNKNOWN_CATTLE_HOG_UNKNOWN",
    constraints: ["MINIMUM_LOT_SIZE", "COMMERCIAL_ONLY_POULTRY_CHANNEL", "SCHEDULING_PHONE"],
    producer_geography_notes: "NWA commercial growers via Across the Creek channel",
    provenance: "partner_operator_primary_about_plant",
    source_ids: ["CC-SRC-185"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(479) 634-2211 plant; (479) 601-5390 partner scheduler",
  },
  {
    inquiry_id: "INQ-005",
    establishment_id: "FSIS-4004",
    establishment_name: "Key's Family Butcher Shop",
    contact_date: TODAY,
    contact_method: "operator_website_attempt_plus_directory",
    respondent_role: "n/a",
    outcome: "website_unusable_directory_only",
    nominal_confirmed: true,
    accessible_confirmed: "unknown_claimed_usda_in_directories",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "sheep_directory_claim"],
    inspection_status_stated: "FSIS_MEAT_SLAUGHTER_ROW_PLUS_ACA_USDA_LISTING",
    services: ["slaughter", "process"],
    fee_disclosure: "not_available",
    fee_notes: "Website compromised/spam on retrieval — no usable rate sheet",
    economic_usability_signals: "UNKNOWN_AT_LAYER",
    constraints: ["INFORMATION_FRICTION", "WEBSITE_FAILURE", "SCHEDULING_UNKNOWN"],
    producer_geography_notes: "Crawford / western AR",
    provenance: "directory_primary+association_secondary; website_failed",
    source_ids: ["CC-SRC-172", "CC-SRC-186", "CC-SRC-189"],
    source_confidence: "secondary_only",
    voice_followup_phone: "(479) 474-1645",
  },
  {
    inquiry_id: "INQ-006",
    establishment_id: "FSIS-3998",
    establishment_name: "G.E. Hawthorn Meat Company",
    contact_date: TODAY,
    contact_method: "fsis_plus_association_directory",
    respondent_role: "n/a",
    outcome: "status_conflict_no_fee_sheet",
    nominal_confirmed: true,
    accessible_confirmed: "unknown",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle_hogs_assumed_from_meat_slaughter_activity"],
    inspection_status_stated: "CONFLICT_FSIS_MEAT_SLAUGHTER_VS_ACA_CUSTOM_EXEMPT_LISTING",
    services: ["UNKNOWN"],
    fee_disclosure: "not_found",
    fee_notes: "No verified operator fee sheet in this slice",
    economic_usability_signals: "UNKNOWN_AT_LAYER",
    constraints: ["STATUS_CONFLICT", "INFORMATION_FRICTION"],
    producer_geography_notes: "Hot Springs / Garland",
    provenance: "directory_primary+association_secondary",
    source_ids: ["CC-SRC-172", "CC-SRC-186"],
    source_confidence: "secondary_only",
    voice_followup_phone: "(501) 762-2661",
  },
  {
    inquiry_id: "INQ-007",
    establishment_id: "COMM-CYPRESS-CLINTON",
    establishment_name: "Cypress Valley Meat Company — Clinton",
    contact_date: TODAY,
    contact_method: "operator_website",
    respondent_role: "n/a_public_materials",
    outcome: "partial_desk_primary",
    nominal_confirmed: true,
    accessible_confirmed: "yes_custom_exempt_path",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "goats"],
    inspection_status_stated: "CUSTOM_EXEMPT_NOT_USDA",
    services: ["slaughter", "processing"],
    fee_disclosure: "not_published",
    fee_notes: "No fee sheet fetched",
    economic_usability_signals: "NOT_INSPECTED_RETAIL_PATH",
    constraints: ["CUSTOM_EXEMPT_OWNER_USE_LIMIT"],
    producer_geography_notes: "Clinton / Van Buren",
    provenance: "establishment_operator_primary",
    source_ids: ["CC-SRC-175"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(501) 745-4844",
    note: "Does not count toward inspected retail path totals",
  },
  {
    inquiry_id: "INQ-008",
    establishment_id: "COMM-NATURAL-STATE-CLINTON",
    establishment_name: "Natural State Processing",
    contact_date: TODAY,
    contact_method: "operator_website_plus_fsis_recheck",
    respondent_role: "n/a",
    outcome: "directory_conflict_unresolved",
    nominal_confirmed: "conflicted",
    accessible_confirmed: "claimed_yes_if_operating",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "N/A cattle/hogs; poultry UNKNOWN / voice required",
    species_accepted: ["poultry"],
    inspection_status_stated: "OPERATOR_CLAIMS_USDA_FSIS_DIRECTORY_ABSENT",
    services: ["poultry_slaughter", "cut_up", "further_processing"],
    fee_disclosure: "public_sheet",
    fee_notes: "See Natural State verification JSON",
    economic_usability_signals: "POULTRY_FEES_PUBLISHED_STATUS_UNRESOLVED",
    constraints: ["DIRECTORY_CONFLICT", "VOICE_CONFIRMATION_REQUIRED"],
    producer_geography_notes: "Multi-state claim in 2024 news; not re-verified",
    provenance: "establishment_operator_primary+directory_primary_conflict",
    source_ids: ["CC-SRC-182", "CC-SRC-188"],
    source_confidence: "primary_operator",
    voice_followup_phone: "(501) 745-2367",
  },
  {
    inquiry_id: "INQ-009",
    establishment_id: "FSIS-6166960",
    establishment_name: "5R Custom Meats",
    contact_date: TODAY,
    contact_method: "fsis_plus_operator_network_page_plus_aca",
    respondent_role: "n/a",
    outcome: "status_conflict",
    nominal_confirmed: true,
    accessible_confirmed: "unknown",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes: "UNKNOWN / PRIMARY VERIFICATION REQUIRED (voice)",
    species_accepted: ["cattle", "hogs", "goats"],
    inspection_status_stated: "CONFLICT_FSIS_MEAT_SLAUGHTER_VS_OPERATOR_CUSTOM_EXEMPT_LABEL",
    services: ["UNKNOWN"],
    fee_disclosure: "not_found",
    fee_notes: null,
    economic_usability_signals: "UNKNOWN_AT_LAYER",
    constraints: ["STATUS_CONFLICT"],
    producer_geography_notes: "White County / north-central AR",
    provenance: "directory_primary+operator_network_primary_conflict",
    source_ids: ["CC-SRC-172", "CC-SRC-175", "CC-SRC-186"],
    source_confidence: "secondary_only",
    voice_followup_phone: "(501) 556-5077",
  },
  {
    inquiry_id: "INQ-010",
    establishment_id: "META-VOICE-OUTREACH",
    establishment_name: "Priority plant voice campaign",
    contact_date: TODAY,
    contact_method: "pstn_voice",
    respondent_role: "n/a",
    outcome: "not_completed",
    nominal_confirmed: null,
    accessible_confirmed: "unknown",
    available_lead_time_cattle_days: null,
    available_lead_time_hog_days: null,
    available_lead_time_notes:
      "Agent environment cannot place PSTN calls. All booking lead times remain UNKNOWN / PRIMARY VERIFICATION REQUIRED pending human calls to listed phones.",
    species_accepted: [],
    inspection_status_stated: null,
    services: [],
    fee_disclosure: "not_asked",
    fee_notes: null,
    economic_usability_signals: "UNKNOWN_AT_LAYER",
    constraints: ["OUTREACH_CHANNEL_LIMITATION"],
    producer_geography_notes: null,
    provenance: "research_operations_limitation",
    source_ids: [],
    source_confidence: "n/a",
    voice_followup_phone: "see plant rows",
  },
];

wj("research/phase_2/ar_processing_plant_inquiry_log.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  method_note:
    "Desk primary = materials published by establishments (or partner channels). Voice PSTN not completed in-agent. Do not treat desk primary as booking confirmation.",
  provenance_classes: [
    "establishment_operator_primary",
    "partner_operator_primary_about_plant",
    "directory_primary",
    "association_secondary",
    "extension_secondary_historical",
    "news_secondary",
    "research_operations_limitation",
  ],
  inquiries,
  last_updated: TODAY,
});

// ─── Booking matrix ────────────────────────────────────────────
const bookingRows = [
  {
    establishment: "Cypress Valley — Pottsville",
    species: "cattle",
    inspection_path: "federal",
    accessible: "YES_CLAIMED",
    available_lead_time_band: "unknown",
    seasonality_flag: "unknown",
    services_available: ["slaughter", "cut_wrap", "resale_label_claimed"],
    evidence_quality: "operator_primary_no_booking_confirm",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-175", "CC-SRC-187"],
  },
  {
    establishment: "Cypress Valley — Pottsville",
    species: "hogs",
    inspection_path: "federal",
    accessible: "YES_CLAIMED",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap"],
    evidence_quality: "operator_primary_no_booking_confirm",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-175", "CC-SRC-187"],
  },
  {
    establishment: "Cypress Valley — Pottsville",
    species: "sheep_goats",
    inspection_path: "federal",
    accessible: "YES_CLAIMED",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap"],
    evidence_quality: "operator_primary_no_booking_confirm",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-187"],
  },
  {
    establishment: "JACO Meats — Hope",
    species: "cattle",
    inspection_path: "state",
    accessible: "YES",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap", "smoke", "vacuum"],
    evidence_quality: "operator_primary_fees_no_booking_confirm",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-183"],
  },
  {
    establishment: "JACO Meats — Hope",
    species: "hogs",
    inspection_path: "state",
    accessible: "YES",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap", "smoke", "vacuum"],
    evidence_quality: "operator_primary_fees_no_booking_confirm",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-183"],
  },
  {
    establishment: "Ferguson's — Atkins",
    species: "cattle",
    inspection_path: "state_or_custom_CONFIRM",
    accessible: "YES_CLAIMED",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap"],
    evidence_quality: "operator_primary_pathway_ambiguous",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-184"],
  },
  {
    establishment: "Ferguson's — Atkins",
    species: "hogs",
    inspection_path: "state_or_custom_CONFIRM",
    accessible: "YES_CLAIMED",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_wrap", "cure_smoke"],
    evidence_quality: "operator_primary_pathway_ambiguous",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-184"],
  },
  {
    establishment: "B&R — Winslow (via Across the Creek)",
    species: "poultry",
    inspection_path: "federal",
    accessible: "LIMITED_COMMERCIAL_MIN_50",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_up", "label"],
    evidence_quality: "partner_primary",
    layer_code: "UNKNOWN_AT_LAYER_AVAILABLE",
    source_ids: ["CC-SRC-185"],
  },
  {
    establishment: "Key's — Van Buren",
    species: "cattle",
    inspection_path: "federal_directory",
    accessible: "UNKNOWN",
    available_lead_time_band: "unknown",
    services_available: ["UNKNOWN"],
    evidence_quality: "directory_only_website_failed",
    layer_code: "UNKNOWN_AT_LAYER",
    source_ids: ["CC-SRC-172", "CC-SRC-189"],
  },
  {
    establishment: "Natural State — Clinton",
    species: "poultry",
    inspection_path: "unresolved_directory_conflict",
    accessible: "CLAIMED_IF_OPERATING",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "cut_up", "further"],
    evidence_quality: "operator_primary_conflicts_directory",
    layer_code: "UNKNOWN_AT_LAYER",
    source_ids: ["CC-SRC-182", "CC-SRC-188"],
  },
  {
    establishment: "Cypress Valley — Clinton",
    species: "cattle",
    inspection_path: "custom_exempt",
    accessible: "YES_CUSTOM_ONLY",
    available_lead_time_band: "unknown",
    services_available: ["slaughter", "processing"],
    evidence_quality: "operator_primary",
    layer_code: "NOMINAL_CUSTOM_NOT_INSPECTED_RETAIL",
    source_ids: ["CC-SRC-175"],
  },
];

wj("research/phase_2/ar_open_plant_booking_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  historical_lead_time_context_only: {
    source_id: "CC-SRC-190",
    note: "2020 UADA survey average advance-contact days ~15–39 by month — NOT current booking data",
  },
  rows: bookingRows,
  last_updated: TODAY,
});

// ─── Economic usability ────────────────────────────────────────
const econRows = [
  {
    path_id: "PATH-JACO-BEEF-STATE",
    establishment: "JACO Meats",
    species: "cattle",
    inspection_path: "state_intrastate",
    accessible_layer: "YES",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: {
      kill_usd: 70,
      inspection_usd: 50,
      per_lb_hanging_usd: 0.9,
      source_ids: ["CC-SRC-183"],
      provenance: "establishment_operator_primary",
    },
    illustrative_processing_cost_only: {
      assumption_hanging_weight_lb: 400,
      formula: "70 + 50 + 0.90*400",
      result_usd: 480,
      note: "Illustrative arithmetic from published components — NOT a quote for a specific animal; NOT a margin verdict",
    },
    transport: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    storage: "UNKNOWN",
    market_channel: "intrastate_retail_possible_if_state_inspected",
    margin_verdict: "unknown",
    economic_layer_code: "FEE_KNOWN_AVAILABLE_AND_MARGIN_UNKNOWN",
  },
  {
    path_id: "PATH-JACO-HOG-STATE",
    establishment: "JACO Meats",
    species: "hogs",
    inspection_path: "state_intrastate",
    accessible_layer: "YES",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: {
      kill_usd: 40,
      inspection_usd: 50,
      per_lb_hanging_usd: 0.9,
      source_ids: ["CC-SRC-183"],
    },
    illustrative_processing_cost_only: {
      assumption_hanging_weight_lb: 150,
      formula: "40 + 50 + 0.90*150",
      result_usd: 225,
      note: "Illustrative only",
    },
    margin_verdict: "unknown",
    economic_layer_code: "FEE_KNOWN_AVAILABLE_AND_MARGIN_UNKNOWN",
  },
  {
    path_id: "PATH-FERGUSON-BEEF",
    establishment: "Ferguson's Packing",
    species: "cattle",
    inspection_path: "CONFIRM_STATE_VS_CUSTOM",
    accessible_layer: "YES_CLAIMED",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: {
      kill_usd: 75,
      per_lb_usd: 0.85,
      source_ids: ["CC-SRC-184"],
      provenance: "establishment_operator_primary",
      pathway_ambiguity: true,
    },
    illustrative_processing_cost_only: {
      assumption_hanging_weight_lb: 400,
      formula: "75 + 0.85*400",
      result_usd: 415,
      note: "Illustrative; pathway ambiguity remains",
    },
    margin_verdict: "unknown",
    economic_layer_code: "FEE_KNOWN_PATHWAY_AMBIGUOUS_MARGIN_UNKNOWN",
  },
  {
    path_id: "PATH-POTTSVILLE-FEDERAL",
    establishment: "Cypress Valley Pottsville",
    species: "cattle",
    inspection_path: "federal",
    accessible_layer: "YES_CLAIMED",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: null,
    margin_verdict: "unknown",
    economic_layer_code: "UNKNOWN_AT_LAYER",
    note: "Strongest multi-species federal accessibility claim; no published fee sheet in this slice",
  },
  {
    path_id: "PATH-BR-POULTRY-LIMITED",
    establishment: "B&R via Across the Creek",
    species: "poultry",
    inspection_path: "federal",
    accessible_layer: "LIMITED_MIN_50_COMMERCIAL",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: {
      whole_bird_usd: "3.50–5.00 by lot",
      cut_up_usd: 2,
      source_ids: ["CC-SRC-185"],
    },
    margin_verdict: "unknown",
    economic_layer_code: "FEE_KNOWN_ACCESS_LIMITED_MARGIN_UNKNOWN",
  },
  {
    path_id: "PATH-NATURAL-STATE-POULTRY",
    establishment: "Natural State Clinton",
    species: "poultry",
    inspection_path: "UNRESOLVED",
    accessible_layer: "CLAIMED",
    available_layer: "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED",
    fee_components_known: { source_ids: ["CC-SRC-182"] },
    margin_verdict: "unknown",
    economic_layer_code: "STATUS_UNRESOLVED",
  },
];

wj("research/phase_2/ar_processing_economic_usability_worksheet.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "No overall winner score. No invented margins. Illustrative fee arithmetic labeled non-quote.",
  paths: econRows,
  species_path_counts_desk_evidence: {
    cattle_inspected_accessible_claimed: {
      count: 3,
      paths: ["Cypress Pottsville (federal claimed)", "JACO (state yes)", "Ferguson (claimed; pathway confirm)"],
      booking_confirmed: 0,
      economically_usable_confirmed: 0,
    },
    hogs_inspected_accessible_claimed: {
      count: 3,
      paths: ["Cypress Pottsville", "JACO", "Ferguson (confirm pathway)"],
      booking_confirmed: 0,
      economically_usable_confirmed: 0,
    },
    sheep_goats_inspected_accessible_claimed: {
      count: 1,
      paths: ["Cypress Pottsville (Arkansas Grown lists sheep/goats)"],
      booking_confirmed: 0,
      economically_usable_confirmed: 0,
    },
    poultry_inspected_accessible: {
      count_open_unresolved: 1,
      count_limited_commercial: 1,
      paths: ["Natural State (unresolved status)", "B&R via Across the Creek (min 50 commercial)"],
      booking_confirmed: 0,
      economically_usable_confirmed: 0,
    },
  },
  bottom_line:
    "Desk evidence supports a small number of claimed accessible inspected paths by species; zero paths have confirmed available booking windows or economically usable margins in this slice.",
  last_updated: TODAY,
});

// Update access inventory notes for priority plants
accessInv.booking_study_slice = SLICE;
accessInv.four_layer_rule =
  "nominal ≠ accessible ≠ available ≠ economically usable";
accessInv.last_updated = TODAY;
for (const row of accessInv.inventory) {
  if (row.establishment_name?.includes("Cypress Valley Meat Company") && row.city === "Pottsville") {
    row.producer_access_class = "OPEN_TO_OUTSIDE_PRODUCERS";
    row.family_farm_practical_access = "CANDIDATE";
    row.booking_available = "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED";
    row.economic_usability = "UNKNOWN";
    row.evidence_provenance = "establishment_operator_primary";
    row.source_ids = [...new Set([...(row.source_ids || []), "CC-SRC-187"])];
  }
  if (row.establishment_name === "JACO Meats") {
    row.producer_access_class = "OPEN_TO_OUTSIDE_PRODUCERS";
    row.family_farm_practical_access = "CANDIDATE";
    row.booking_available = "UNKNOWN_PRIMARY_VERIFICATION_REQUIRED";
    row.economic_usability = "FEE_COMPONENTS_KNOWN_MARGIN_UNKNOWN";
    row.evidence_provenance = "establishment_operator_primary";
    row.source_ids = [...new Set([...(row.source_ids || []), "CC-SRC-183"])];
  }
}
fs.writeFileSync(
  r("research/phase_2/ar_livestock_processing_access_inventory.json"),
  JSON.stringify(accessInv, null, 2) + "\n"
);
console.log("[OK] access inventory updated");

gapMatrix.four_layer_update = {
  slice_id: SLICE,
  note: "Available and economically usable layers remain UNKNOWN without voice booking confirmation",
  cattle_accessible_claimed_paths_statewide_desk: 3,
  cattle_available_confirmed: 0,
  cattle_economically_usable_confirmed: 0,
};
gapMatrix.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/ar_processing_capacity_gap_matrix.json"),
  JSON.stringify(gapMatrix, null, 2) + "\n"
);

// Hypothesis / claim
const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === "CC-HYP-CLINTON-PROCESSING-HUB");
if (hyp) {
  hyp.empirical_status =
    "CONTRADICTED (preserved). Booking study found no USDA livestock booking evidence in Clinton; custom-exempt remains; Natural State poultry unresolved.";
  hyp.dossier_verdict = "CONTRADICTED";
  hyp.last_updated = TODAY;
}
const hypCompound = hypDoc.hypotheses.find(
  (h) => h.hypothesis_id === "CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS"
);
if (hypCompound) {
  hypCompound.empirical_status =
    "QUALIFIED — few claimed accessible inspected paths; available/economic layers still unknown pending voice booking study completion";
  hypCompound.dossier_verdict = "QUALIFIED";
  hypCompound.last_updated = TODAY;
}
fs.writeFileSync(
  r("research/phase_2/hypothesis_registry_political_power.json"),
  JSON.stringify(hypDoc, null, 2) + "\n"
);

const claim = claimDoc.claims.find((c) => c.claim_id === "CC-CLAIM-138");
if (claim) {
  claim.slice_reassessment_booking = {
    slice_id: SLICE,
    verdict: "QUALIFIED",
    note: "Usable-capacity layers mostly unknown; scarcity of confirmed bookable inspected paths is consistent with bottleneck clause but does not prove monopsony magnitudes.",
    adjudicator: ADJUDICATOR,
    decision_id: DECISION_ID,
    at: TODAY,
  };
  for (const sid of ["CC-SRC-183", "CC-SRC-184", "CC-SRC-185", "CC-SRC-187", "CC-SRC-188"]) {
    if (!claim.source_ids.includes(sid)) claim.source_ids.push(sid);
  }
}
fs.writeFileSync(r("data/research/claim_ledger.json"), JSON.stringify(claimDoc, null, 2) + "\n");

moduleDoc.booking_study_slice = SLICE;
moduleDoc.usable_capacity_status =
  "ACCESSIBILITY_PARTIALLY_DOCUMENTED_AVAILABILITY_AND_ECONOMICS_UNKNOWN";
moduleDoc.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/arkansas_livestock_monopsony_processing_access_module.json"),
  JSON.stringify(moduleDoc, null, 2) + "\n"
);

// RQs
const rqArr = rqDoc.research_questions || rqDoc.questions;
const newRqs = [
  {
    id: "CC-RQ-P21-071",
    question:
      "What are current booking lead times (by species and season) at Cypress Valley Pottsville, JACO Hope, Ferguson Atkins, Keys Van Buren, and B&R Winslow?",
    status: "OPEN",
    priority: "critical",
    note: "Voice primary required — not answered by this desk pass.",
  },
  {
    id: "CC-RQ-P21-072",
    question:
      "Do published Ferguson Packing fees apply to state-inspected product eligible for intrastate retail sale, or only to custom-exempt owner-use processing?",
    status: "OPEN",
    priority: "high",
    source_ids: ["CC-SRC-184"],
  },
  {
    id: "CC-RQ-P21-073",
    question:
      "For a representative direct-market beef carcass, what is net producer margin after JACO/Pottsville processing fees, haul, storage, and selling costs?",
    status: "OPEN",
    priority: "high",
    note: "Requires fee + market pathway primary data; illustrative $480 JACO beef processing cost is not a margin.",
  },
];
for (const q of newRqs) {
  const i = rqArr.findIndex((x) => x.id === q.id);
  if (i >= 0) rqArr[i] = { ...rqArr[i], ...q };
  else rqArr.push(q);
}
// Close/update RQ-067 partially
const rq067 = rqArr.find((x) => x.id === "CC-RQ-P21-067");
if (rq067) {
  rq067.status = "OPEN_PARTIAL";
  rq067.note =
    "Desk legs complete: directory absent + operator fees published. Voice/ARDA confirmation still required.";
}
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");

// Public reasoning
const prs = [
  [
    "045",
    "We thought Clinton was already a USDA livestock hub — what happened?",
    CLINTON_LESSON +
      " The booking study did not reverse that. Clinton still shows custom-exempt livestock processing and an unresolved Natural State poultry directory conflict — not a confirmed USDA cattle/hog hub.",
  ],
  [
    "046",
    "If a plant is on the USDA list, why might a farmer still be unable to use it?",
    "Listing is nominal capacity. The plant may be captive, limited to contracts, full for months, wrong species, or impossible to reach for scheduling. Usable capacity requires accessibility, availability, and economics — not just a directory row.",
  ],
  [
    "047",
    "What is the difference between a plant existing and a booking existing?",
    "Existence is nominal. A booking is available capacity — an actual open date for your animal. We found published acceptance and some fees, but not confirmed next available dates, because those require live scheduler confirmation.",
  ],
  [
    "048",
    "Why might processing be available but still not make economic sense?",
    "Kill fees, per-pound charges, hauling, deposits, storage, and what you can sell the meat for can erase the advantage of direct marketing. In this slice we can show fee components for some plants; we cannot yet certify economically usable margins.",
  ],
  [
    "049",
    "Why are you calling plants instead of just using government databases?",
    "Databases show who is inspected. They do not show who will take your steer next month or what it costs. That operational layer is what family farmers actually face.",
  ],
  [
    "050",
    "Why won't you recommend building new plants yet?",
    "Because we still lack confirmed booking scarcity and economically usable path counts. Building into unknown demand and high small-plant failure risk would be speculation, not proof.",
  ],
  [
    "051",
    "What did Natural State Processing status turn out to be?",
    "Unresolved after desk inquiry. The company still publishes poultry prices and appointment language; FSIS active directory still lacks the establishment number. That conflict needs a human call and agency confirmation — we will not infer it away.",
  ],
  [
    "052",
    "Does a long wait time prove monopsony?",
    "No. Long waits are evidence about processing access. Packer buyer power is a separate market-structure question. Both can hurt farmers; confusing them produces the wrong remedy.",
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
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    domain: "livestock_processing_usable_capacity",
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

// Reports
wt(
  "reports/CC_NATURAL_STATE_PROCESSING_STATUS_VERIFICATION_1_0.md",
  `# Natural State Processing Status Verification 1.0

**Resolution:** \`UNRESOLVED_AFTER_REASONABLE_DESK_INQUIRY\`

| Leg | Result | Provenance |
| --- | --- | --- |
| FSIS active MPI | ABSENT (M51255) | directory_primary (CC-SRC-188) |
| Operator website | Claims USDA poultry; publishes fees; schedule language | establishment_operator_primary (CC-SRC-182) |
| Same address | Global Refrigerated Services V46922 cold storage/ID | directory_primary |
| Voice / ARDA | Not completed in-agent | primary_outreach_gap |

**Contamination rule:** Do not alter cattle/hog conclusions from this unresolved poultry status.

**Next:** Human call (501) 745-2367 + agency confirmation.
`
);

wt(
  "reports/CC_ARKANSAS_OPEN_PLANT_BOOKING_STUDY_1_0.md",
  `# Arkansas Open Plant Booking Study 1.0

## Provenance rule

Distinguish **establishment-direct** evidence from directories, association listings, extension surveys, and news.

## What desk primary established

| Plant | Accessible? | Fees published? | Lead time |
| --- | --- | --- | --- |
| Cypress Valley Pottsville | YES claimed (independent producers; resale labeling) | NO | UNKNOWN / voice required |
| JACO Hope | YES (bring own beef/hogs) | YES | UNKNOWN / voice required |
| Ferguson Atkins | YES claimed (pathway confirm) | YES | UNKNOWN / voice required |
| B&R poultry via partner | LIMITED (commercial, min 50) | YES (partner page) | UNKNOWN / voice required |
| Keys Van Buren | UNKNOWN (website failed) | NO | UNKNOWN / voice required |
| Hawthorn | UNKNOWN (FSIS vs ACA conflict) | NO | UNKNOWN / voice required |
| Natural State | CLAIMED / directory conflict | YES | UNKNOWN |
| Cypress Clinton | YES custom-exempt only | NO | UNKNOWN |

## Voice outreach

PSTN calls **not completed** in agent environment. All available-capacity cells remain \`UNKNOWN / PRIMARY VERIFICATION REQUIRED\`.

## Historical context only

2020 UADA survey (CC-SRC-190): advance contact averages ~15–39 days by month — **not** current bookings.
`
);

wt(
  "reports/CC_ARKANSAS_PROCESSING_ECONOMIC_USABILITY_1_0.md",
  `# Arkansas Processing Economic Usability 1.0

## Rule

Fee components ≠ economically usable capacity. Margin requires market pathway evidence.

## Illustrative processing costs (non-quotes)

From **establishment operator primary** sheets only:

- **JACO beef:** $70 kill + $50 inspection + $0.90/lb hanging → **$480** at assumed 400 lb hanging (illustrative)
- **JACO hog:** $40 + $50 + $0.90/lb → **$225** at assumed 150 lb hanging (illustrative)
- **Ferguson beef:** $75 + $0.85/lb → **$415** at 400 lb (illustrative; pathway ambiguity)

## Confirmed economically usable paths

**Zero** in this slice.

## Why

Available booking windows unconfirmed; farm-gate/retail net returns not measured; Pottsville federal fees unpublished.
`
);

wt(
  "reports/CC_ARKANSAS_FAMILY_FARM_USABLE_CAPACITY_WHAT_WE_LEARNED_1_0.md",
  `# What We Learned — Family Farm Usable Capacity 1.0

1. ${CLINTON_LESSON}
2. **Nominal ≠ accessible ≠ available ≠ economically usable.**
3. Desk primary found **~3 claimed accessible inspected cattle paths** (Pottsville federal; JACO state; Ferguson confirm-pathway) — **0 booking-confirmed**, **0 economically-usable-confirmed**.
4. Poultry: limited commercial B&R channel (min 50) + Natural State unresolved.
5. Published fees exist for some plants; lead times require human calls.
6. Information friction is real (Keys website failure; unpublished Pottsville fees).
7. No construction recommendation.
`
);

const returnMd = `# CC-PHASE-2.1-AR-PROCESSING-PRIMARY-RESEARCH-AND-OPEN-PLANT-BOOKING-STUDY-1.0 — Return

**Generated:** ${TODAY}

## 1. Executive Summary

Moved from facility map toward usable capacity. **Desk primary** evidence shows a **small set of claimed accessible inspected paths** (notably Cypress Valley Pottsville federal; JACO Hope state with published fees; Ferguson Atkins with published fees but pathway ambiguity). **Available booking lead times:** not obtained — voice PSTN outreach not completable in-agent; coded \`UNKNOWN / PRIMARY VERIFICATION REQUIRED\`. **Economically usable paths confirmed: 0.** Natural State poultry status remains **unresolved** (operator fees vs FSIS absence). Clinton USDA livestock hub finding **preserved as CONTRADICTED**.

## 2. Prior Clinton Finding Preserved

> ${CLINTON_LESSON}

## 3. Capacity Taxonomy Applied

| Layer | Result this slice |
| --- | --- |
| Nominal | Prior FSIS/state map retained |
| Accessible | Partially documented from operator primary materials |
| Available | **UNKNOWN** pending voice |
| Economically usable | **UNKNOWN** (fee components only for some paths) |

## 4. Natural State Verification Result

\`UNRESOLVED_AFTER_REASONABLE_DESK_INQUIRY\` — see discrete packet. Cattle/hog findings not contaminated.

## 5. Inquiry Coverage

| Channel | Count / status |
| --- | --- |
| Establishment website / FAQ primary | Completed for Cypress, JACO, Ferguson, Natural State |
| Partner channel primary | B&R poultry via Across the Creek |
| FSIS directory re-check | Completed |
| Association directory secondary | ACA processing directory |
| PSTN voice | **Not completed** (agent limitation) — phones logged for human follow-up |

## 6. Accessible Capacity Findings

**Cattle (inspected, claimed accessible):** 3 desk paths — Pottsville (federal), JACO (state), Ferguson (confirm state vs custom).  
**Hogs:** same 3.  
**Sheep/goats:** 1 claimed (Pottsville).  
**Poultry:** 1 limited commercial (B&R/ATC min 50) + 1 unresolved (Natural State).  
Custom-exempt Clinton Cypress: accessible for owner-use only — **excluded** from inspected retail totals.

## 7. Available Capacity / Booking Lead Times

**All unknown** for current dates. Historical 2020 survey context only (CC-SRC-190).

## 8. Cost Disclosure Findings

| Plant | Provenance | Fees |
| --- | --- | --- |
| JACO | establishment_operator_primary | Beef/hog kill+inspection+$/lb published |
| Ferguson | establishment_operator_primary | Beef/hog kill+$/lb published; pathway confirm needed |
| Natural State | establishment_operator_primary | Poultry schedule published |
| B&R poultry | partner_operator_primary | Lot-based whole bird + cut-up |
| Pottsville / Keys / Hawthorn | — | Not published / unavailable this pass |

## 9. Economically Usable Capacity Findings

**Confirmed economically usable inspected paths: 0.**  
Illustrative JACO beef processing cost ~$480 at 400 lb hanging — **not a margin**.

## 10. Species-Specific Results

See \`ar_processing_economic_usability_worksheet.json\` counts. No species has a booking-confirmed + margin-confirmed path.

## 11. Geography Overlay

Travel proxies from prior slice still apply to **nominal/accessible candidates**. Without availability confirmation, no geography can be rated SUFFICIENT on usable capacity.

## 12. Bottleneck Reclassification

Observed/desk-supported:

- INFORMATION_FRICTION (Keys website; unpublished Pottsville fees)
- PATHWAY_AMBIGUITY (Ferguson custom vs state)
- DIRECTORY_CONFLICT (Natural State; 5R; Hawthorn)
- SCHEDULING — **unknown** (not measured)
- INSPECTION_DAYS / LABOR / COLD_STORAGE — **unknown** pending operator interviews
- Do not equate unknown scheduling with proven slaughter scarcity

## 13. Pathway Legality Notes

State paths = intrastate without CIS. Custom-exempt ≠ retail. Federal Pottsville claim includes resale labeling (Arkansas Grown listing).

## 14. Strongest Supporting Evidence

- JACO FAQ: outside animals + itemized fees (establishment primary)
- Cypress/Arkansas Grown: independent producers + multi-species federal resale claim
- Ferguson published fee table (establishment primary)
- B&R poultry limited commercial channel with fees (partner primary)

## 15. Strongest Contrary Evidence / Failed Assumptions

- Cannot confirm any next-available booking date from desk work
- Natural State still unresolved
- Keys website failure blocks producer information
- 2020 wait-time averages must not be pasted as 2026 facts

## 16. Claim & Hypothesis Verdicts

| ID | Verdict |
| --- | --- |
| CC-HYP-CLINTON-PROCESSING-HUB | **CONTRADICTED** (preserved) |
| CC-CLAIM-138 | **QUALIFIED** |
| CC-HYP-AR-LIVESTOCK-COMPOUNDED-ACCESS | **QUALIFIED** |

## 17. Public Reasoning Records

CC-PR-045–052.

## 18. Sources / Inquiry Evidence Added

CC-SRC-182–190. Inquiry log: \`ar_processing_plant_inquiry_log.json\`. Registry total: ${srcDoc.sources.length}.

## 19. Research Questions Added / Closed

CC-RQ-P21-071–073 OPEN. CC-RQ-P21-067 → OPEN_PARTIAL.

## 20. Baseline

**Unchanged: 2/86.**

## 21. GATE-02

**Not passed.**

## 22. Validators

Filled at ship.

## 23. Files Changed

Listed at ship.

## 24. Commit Hash

Filled after commit.

## 25. Remaining Unknowns

Current lead times; Pottsville fees; Ferguson pathway; Keys/Hawthorn/5R live status; Natural State grant; producer margins; Delta travel+booking joint friction.

## 26. Exact Next Recommended Slice

**CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0**

Human PSTN campaign against the phone list in the inquiry log, then first margin worksheets for JACO + Pottsville paths — still **no construction recommendation**.
`;

wt(
  "reports/CC_PHASE_2_1_AR_PROCESSING_PRIMARY_RESEARCH_AND_OPEN_PLANT_BOOKING_STUDY_1_0_RETURN.md",
  returnMd
);

// Also ensure script/protocol files present are referenced
if (!fs.existsSync(r("reports/CC_PHASE_2_1_AR_PROCESSING_PRIMARY_RESEARCH_AND_OPEN_PLANT_BOOKING_STUDY_1_0_CURSOR_SCRIPT.md"))) {
  console.warn("[WARN] cursor script missing");
}

updates.updates.push({
  id: "UPD-083",
  date: TODAY,
  title: "AR processing primary booking / usable-capacity study (desk pass)",
  summary:
    "Under CC-DEC-103: four-layer usable-capacity pass. Desk primary fees/access for JACO, Ferguson, Pottsville claims, B&R limited poultry; Natural State unresolved; voice booking lead times UNKNOWN. Economically usable confirmed paths: 0. Clinton hub CONTRADICTED preserved. Sources 182–190.",
  public: true,
});
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

sliceQueue.active_slice =
  "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0";
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  active_slice: sliceQueue.active_slice,
  writing_focus:
    "Usable-capacity desk pass complete; voice booking confirmation required next.",
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary:
    "Usable-capacity study desk pass: ~3 claimed accessible inspected cattle paths; 0 booking-confirmed; 0 economically-usable-confirmed. Natural State unresolved. Voice PSTN required. Clinton CONTRADICTED preserved. Sources 182–190.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice:
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-083"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "No invented wait times. Desk primary ≠ booking confirmation. Economically usable paths confirmed: 0. Baseline 2/86 unchanged.",
  next_command: "Human PSTN booking confirmation campaign",
  report:
    "reports/CC_PHASE_2_1_AR_PROCESSING_PRIMARY_RESEARCH_AND_OPEN_PLANT_BOOKING_STUDY_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  cattle_accessible_claimed_paths: 3,
  booking_confirmed_paths: 0,
  economically_usable_confirmed_paths: 0,
});

console.log("\nBooking study desk pass complete");
console.log("Accessible cattle claimed:", 3);
console.log("Booking confirmed:", 0);
console.log("Economically usable confirmed:", 0);
