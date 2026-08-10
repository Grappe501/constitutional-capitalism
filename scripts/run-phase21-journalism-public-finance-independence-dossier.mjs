/**
 * CC-PHASE-2.1-LOCAL-JOURNALISM-PUBLIC-FINANCE-AND-INDEPENDENCE-COMPARATIVE-DOSSIER-1.0
 *
 * Financing-and-governance falsification study — NOT an argument for subsidies.
 * Preserves Arkansas diagnosis: OUTLET PRESENCE ≠ PROVEN INSTITUTIONAL SCRUTINY.
 * not_yet_coded = UNKNOWN, not uncovered.
 * No new principle / doctrine. No invented appropriation series.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-LOCAL-JOURNALISM-PUBLIC-FINANCE-AND-INDEPENDENCE-COMPARATIVE-DOSSIER-1.0";
const MOD =
  "CC-MOD-LOCAL-INDEPENDENT-JOURNALISM-AND-CIVIC-INFORMATION-INFRASTRUCTURE";
const HYP_PARENT = "CC-HYP-LOCAL-INDEPENDENT-JOURNALISM-ECOSYSTEM";
const HYP_PROD = "CC-HYP-CIVIC-INFORMATION-AS-PRODUCTIVE-INFRASTRUCTURE";
const HYP_CREDIT = "CC-HYP-CITIZEN-DIRECTED-JOURNALISM-ALLOCATION";
const HYP_SHARED = "CC-HYP-REGIONAL-NEWSROOM-SHARED-SERVICES";

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

const AR_DIAGNOSIS = {
  preserved: true,
  rule: "OUTLET PRESENCE ≠ PROVEN INSTITUTIONAL SCRUTINY",
  matrix_snapshot: {
    institution_x_geography_rows: 84,
    partial_rows: 8,
    remainder: "not_yet_coded",
    not_yet_coded_means: "UNKNOWN — not absence of coverage",
  },
  source_slice: "CC-PHASE-2.1-AR-LOCAL-NEWS-OUTLET-MAP-AND-COVERAGE-DASHBOARD-PILOT-1.0",
};

// ─── Core JSON artifacts ───────────────────────────────────────
wj("research/phase_2/nj_civic_information_consortium_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "COMPARATIVE_DOSSIER_RESEARCH",
  entity: "New Jersey Civic Information Consortium (NJCIC)",
  arkansas_diagnosis_preserved: AR_DIAGNOSIS,
  statutory_origin: {
    statute: "N.J.S.A. 18A:64-96 et seq. (P.L.2018, c.111)",
    signed: "2018-08",
    source_ids: ["CC-SRC-144"],
    design_intent:
      "Nonprofit university consortium vehicle for civic-information grants — not a government newsroom",
  },
  governance: {
    board_size: 16,
    appointment_structure_from_case_study: {
      governor_appointees: 2,
      legislative_leadership_appointees: 4,
      university_appointees: 6,
      board_public_appointees: 4,
      source_ids: ["CC-SRC-164"],
      note: "Case study written for NJCIC; verify against statute/bylaws before legal conclusions.",
    },
    member_universities_from_program_site: [
      "TCNJ",
      "Montclair State",
      "NJIT",
      "Rowan",
      "Kean",
      "Rutgers",
    ],
    source_ids: ["CC-SRC-145", "CC-SRC-164"],
    nonprofit_status: {
      claimed: "501(c)(3) / public charity",
      case_study_note: "Nonprofit filing path described; official May 2021 nonprofit milestone in case study",
      source_ids: ["CC-SRC-164"],
      independence_warning: "Nonprofit status ≠ immunity from political appropriation/appointment pressure",
    },
  },
  editorial_independence_safeguards_claimed: {
    program_claim:
      "State law prevents New Jersey and the Consortium from owning funded projects or exercising editorial control over grantees",
    source_ids: ["CC-SRC-145", "CC-SRC-144"],
    verification_status: "STATUTORY_CLAIM_DOCUMENTED_PRACTICE_INCOMPLETE",
  },
  funding_history: {
    note: "MULTIPLE SECONDARY SERIES CONFLICT. Do not treat any single series as reconciled truth. Prefer line-item budget records when available.",
    series_a_njbudget_com_line_items: {
      source_ids: ["CC-SRC-165"],
      years: [
        { fy: 2024, governor_recommendation: 2000000, appropriated: 3000000 },
        { fy: 2025, governor_recommendation: 1000000, appropriated: 2000000 },
        { fy: 2026, governor_recommendation: 0, appropriated: 2500000 },
        { fy: 2027, governor_recommendation: 0, appropriated: 0 },
      ],
      reliability: "secondary_budget_aggregator_citing_OMB_legislature — verify against primary PDFs before modeling",
    },
    series_b_njcic_case_study_narrative: {
      source_ids: ["CC-SRC-164"],
      years_narrative: [
        { year: 2020, note: "Appropriation described then withdrawn for COVID emergency" },
        { year: 2021, appropriated_claimed: 500000 },
        { year: 2022, appropriated_claimed: 2000000 },
        { year: 2023, appropriated_claimed: 4000000 },
        { year: 2024, appropriated_claimed: 4000000 },
        { year: 2025, appropriated_claimed: 3000000 },
      ],
      reliability: "program-commissioned case study — not independent audit",
    },
    grant_totals_promotional: {
      annual_report_2025_claim: "135 grants totalling over $12M across 19 of 21 counties; grantmaking >$4.3M in 2025",
      source_ids: ["CC-SRC-166"],
      reliability: "self-reported program document",
      distinguish: {
        money_appropriated: "state budget line",
        money_awarded: "grants approved",
        journalism_produced: "NOT EQUAL TO DOLLARS",
        audience_reached: "self-reported web metrics — not institutional coverage",
        institutions_covered: "NOT MEASURED in these program totals",
        civic_outcomes: "NOT ESTABLISHED by appropriation or award totals",
      },
    },
    durable_capacity_question:
      "Did public funding create durable reporting capacity or primarily temporary projects? — NOT ENOUGH EVIDENCE without longitudinal employment/beat continuity study independent of grantee self-reports.",
  },
  outcomes: {
    measured_outputs_claimed_by_program: [
      "Grants awarded / dollars granted",
      "Stories / jobs / trainings (self-reported impact metrics — site JS may not render; use PDF reports)",
      "Web visit estimates (self-reported)",
    ],
    measured_outcomes_independent: "NOT FOUND in this slice as peer-reviewed causal evaluations of civic behavior change",
    institutions_covered: "NOT SYSTEMATICALLY MEASURED (Arkansas-style matrix not applied to NJ grantees here)",
  },
  weaknesses_and_criticism: [
    "Appropriation volatility / zero recommendation years create dependency risk (CC-SRC-165 FY2027 $0 appropriated in aggregator)",
    "Board includes political appointees — statutory editorial firewall does not eliminate appropriation retaliation channel",
    "Program-commissioned case study is not independent impact evaluation (CC-SRC-164 admits impact is separate report)",
    "Self-reported audience metrics ≠ institutional scrutiny",
    "Eligibility/grant selection remains a discretionary board process — capture and viewpoint-proxy risks remain open",
  ],
  evidence_of_success_qualified: [
    "Demonstrates a US state can create a statutory nonprofit intermediary for local-news grants",
    "Moved public dollars into journalism/civic-info projects at multi-million scale (self-reported + budget lines)",
    "Explicit statutory/program claim against government ownership/editorial control of grantee content",
  ],
  evidence_of_failure_or_fragility: [
    "Funding instability across fiscal years / governor recommendations of $0",
    "No independent proof that grants produce sustained institutional coverage where markets fail",
    "Hostile-government survival untested — system still depends on annual legislative willingness",
  ],
  last_updated: TODAY,
});

wj("research/phase_2/journalism_government_influence_attack_surface.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule: "Nonprofit status does not establish independence. Map every political power contact.",
  attack_surface: [
    {
      point: "Appropriation",
      who: "Governor (recommend) + Legislature (appropriate)",
      check: "Budget process transparency; multi-year authorizations (often absent)",
      retaliate: "YES — reduce/zero out funding after unfavorable coverage",
      selective_withhold: "YES via line-item or conditions",
      viewpoint_discriminate: "INDIRECT via eligibility statutes or rider conditions",
      incumbent_privilege: "POSSIBLE if renewals favor established outlets",
      publicly_reviewable: "Budget documents yes; political bargains often opaque",
      nj_cic_note: "FY2027 aggregator shows $0 appropriated after prior years of funding — illustrates fragility",
    },
    {
      point: "Board appointment",
      who: "Governor, legislative leaders, universities, board itself (per case study)",
      check: "Bipartisan design claim; staggered terms (verify bylaws)",
      retaliate: "MEDIUM — replace appointees over time",
      selective_withhold: "INDIRECT via board composition",
      viewpoint_discriminate: "POSSIBLE through appointee ideology",
      incumbent_privilege: "POSSIBLE",
      publicly_reviewable: "PARTIAL — appointments may be public; deliberation less so",
    },
    {
      point: "Executive leadership",
      who: "Board-hired ED / staff",
      check: "Board oversight; conflict policies",
      retaliate: "MEDIUM if board politicized",
      selective_withhold: "YES via staff grant recommendations",
      viewpoint_discriminate: "YES risk",
      incumbent_privilege: "YES risk",
      publicly_reviewable: "PARTIAL",
    },
    {
      point: "Eligibility rules",
      who: "Statute + board policy",
      check: "Published guidelines; judicial review of viewpoint discrimination",
      retaliate: "YES via redefinition of 'journalism' / 'civic information'",
      selective_withhold: "YES",
      viewpoint_discriminate: "CORE RISK — eligibility is the constitutional flashpoint",
      incumbent_privilege: "YES if compliance costs favor incumbents",
      publicly_reviewable: "Guidelines yes; application of guidelines contested",
    },
    {
      point: "Application review / grant selection",
      who: "Staff + grants committee + board",
      check: "Rubrics, conflict-of-interest, published awards",
      retaliate: "YES against critics via non-award",
      selective_withhold: "YES",
      viewpoint_discriminate: "YES (proxy criteria)",
      incumbent_privilege: "YES",
      publicly_reviewable: "Awards lists often public; scoring sheets often not",
    },
    {
      point: "Renewal",
      who: "Board",
      check: "Renewal criteria; multi-year grants",
      retaliate: "YES — non-renewal after critical reporting",
      selective_withhold: "YES",
      viewpoint_discriminate: "YES",
      incumbent_privilege: "YES",
      publicly_reviewable: "PARTIAL",
    },
    {
      point: "Auditing / reporting requirements",
      who: "Consortium + state oversight",
      check: "Standard fiscal audit vs content review",
      retaliate: "YES if 'reporting' becomes content surveillance",
      selective_withhold: "YES via compliance findings",
      viewpoint_discriminate: "POSSIBLE",
      incumbent_privilege: "Compliance capacity favors larger orgs",
      publicly_reviewable: "Fiscal reports more than editorial metrics",
    },
    {
      point: "Funding termination / statutory amendment",
      who: "Legislature + Governor",
      check: "Constitutional limits; political cost",
      retaliate: "YES — ultimate attack surface",
      selective_withhold: "YES",
      viewpoint_discriminate: "YES via statute",
      incumbent_privilege: "N/A",
      publicly_reviewable: "YES for statute; political motive often deniable",
    },
  ],
  bottom_line:
    "A system that works only under benevolent appropriators is NOT resilient enough for Constitutional Capitalism. NJ CIC's strongest remaining risk is annual political control of the purse despite editorial non-ownership claims.",
  last_updated: TODAY,
});

wj("research/phase_2/civic_information_credit_failure_modes.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  hypothesis_id: HYP_CREDIT,
  architecture_under_test: "Public money → Citizen allocation → Independent journalism",
  status: "FAILURE_MODES_MAPPED_NOT_SOLVED",
  analogy_warning:
    "Seattle Democracy Vouchers are campaign-finance evidence for allocation mechanics/participation patterns — NOT evidence that journalism vouchers work.",
  failure_modes: [
    { id: "FM-POP", name: "Popularity contest", status: "THEORETICAL_HIGH", evidence: "Predicted by voucher literature; no US journalism voucher pilot to observe" },
    { id: "FM-PART", name: "Partisan mobilization", status: "THEORETICAL_HIGH", evidence: "Campaign vouchers show organized uptake; journalism transfer untested" },
    { id: "FM-CELEB", name: "Celebrity / large outlets dominate", status: "THEORETICAL_HIGH", evidence: "Proposals often add caps (e.g., 1% caps in academic designs) precisely because of this risk" },
    { id: "FM-FRAUD", name: "Fraud / bot identities", status: "THEORETICAL_MEDIUM", evidence: "Administrative identity problem acknowledged in policy menus; not empirically measured for news vouchers" },
    { id: "FM-COORD", name: "Coordinated allocation campaigns", status: "THEORETICAL_HIGH", evidence: "Parallel to campaign voucher organizing" },
    { id: "FM-SENS", name: "Sensationalism incentives", status: "THEORETICAL_HIGH", evidence: "Attention markets; infrastructure-floor hypothesis responds to this" },
    { id: "FM-EXT", name: "Extremist outlets", status: "THEORETICAL_HIGH", evidence: "Eligibility definition problem — constitutional flashpoint" },
    { id: "FM-LOWINFO", name: "Low-information allocation", status: "THEORETICAL_HIGH", evidence: "Citizens may not know which outlets cover quorum courts" },
    { id: "FM-EQUITY", name: "Rich communities supplement more", status: "THEORETICAL_HIGH", evidence: "Tax-credit designs especially regressive; voucher designs claim mitigation — untested for news" },
    { id: "FM-RURAL", name: "Rural outlets lack scale / compliance capacity", status: "THEORETICAL_HIGH_AND_AR_RELEVANT", evidence: "Arkansas pilot shows small rural papers; admin burden risk high" },
    { id: "FM-SURV", name: "Administrative surveillance", status: "THEORETICAL_MEDIUM", evidence: "Eligibility portals create data + discretion" },
    { id: "FM-ELIG", name: "Government eligibility manipulation", status: "THEORETICAL_CRITICAL", evidence: "Attack surface eligibility point" },
    { id: "FM-INCUMB", name: "Incumbent entrenchment / new-entrant barriers", status: "THEORETICAL_HIGH", evidence: "Brand recognition + compliance" },
  ],
  observed_us_journalism_voucher_pilot: false,
  seattle_democracy_vouchers: {
    source_ids: ["CC-SRC-167", "CC-SRC-168"],
    usable_for: ["allocation mechanics", "participation inequality patterns", "administrative design lessons"],
    not_usable_for: ["proof that news vouchers increase institutional journalism"],
  },
  academic_proposals_source_ids: ["CC-SRC-169", "CC-SRC-170"],
  last_updated: TODAY,
});

wj("research/phase_2/journalism_capacity_ladder.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  purpose: "Analytical ladder — not a scored index. Prevents HAS NEWSPAPER = INFORMED COMMUNITY.",
  levels: [
    { level: 0, label: "No identified regular civic-information outlet" },
    { level: 1, label: "Outlet presence" },
    { level: 2, label: "Original local reporting" },
    { level: 3, label: "Regular institutional reporting" },
    { level: 4, label: "Multiple independent sources / competitive scrutiny" },
    { level: 5, label: "Investigative + specialized + resilient civic-information ecosystem" },
  ],
  assignment_rule:
    "Do not assign communities to Levels 3–5 without coded matrix evidence. Level 1 may be assigned from outlet inventory alone.",
  arkansas_pilot_assignments: {
    "AR-GEO-SEARCY-COUNTY": { max_supported_level: 1, notes: "Outlet present; institutional regularity not coded" },
    "AR-GEO-LAFAYETTE-COUNTY": { max_supported_level: 1, notes: "Outlet present; operating status nuances; matrix open" },
    "AR-GEO-WEST-HELENA": {
      max_supported_level: 2,
      notes: "Documented original municipal/county meeting coverage claims (CC-SRC-153/154); Level 3 requires frequency coding",
    },
    "AR-GEO-JACKSONVILLE": { max_supported_level: 1, notes: "Self-described council coverage; not yet coded to Level 2/3" },
    "AR-GEO-BENTON-COUNTY": {
      max_supported_level: 2,
      notes: "High-capacity regional daily with documented government stories; Level 3+ needs matrix",
    },
    "AR-GEO-PULASKI-COUNTY": {
      max_supported_level: 2,
      notes: "Multiple outlets; competitive Level 4 conceivable but not evidenced for all institutions",
    },
  },
  last_updated: TODAY,
});

wj("research/phase_2/journalism_public_finance_comparison_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  no_overall_winner_score: true,
  mechanisms: [
    "Advertising",
    "Subscription",
    "Membership",
    "Philanthropy",
    "Nonprofit",
    "Public grant (NJ CIC style)",
    "Citizen-directed credit",
    "Tax credit",
    "Matching system",
    "Cooperative ownership",
    "Shared-services model",
    "Public media",
  ],
  dimensions: [
    "Revenue stability",
    "Local accessibility",
    "New-entry accessibility",
    "Government influence risk",
    "Donor influence risk",
    "Advertiser influence risk",
    "Popularity bias",
    "Rural viability",
    "Administrative complexity",
    "Scalability",
    "Editorial independence",
    "Technology neutrality",
    "Evidence quality",
  ],
  cells: {
    Advertising: {
      "Revenue stability": "LOW_POST_PLATFORM",
      "Government influence risk": "LOW_DIRECT",
      "Advertiser influence risk": "HIGH",
      "Rural viability": "LOW",
      "Evidence quality": "STRONG_THAT_MODEL_ERODED",
    },
    Subscription: {
      "Revenue stability": "MEDIUM_IF_SCALE",
      "Popularity bias": "HIGH",
      "Rural viability": "LOW_MEDIUM",
      "Evidence quality": "MODERATE",
    },
    Philanthropy: {
      "Donor influence risk": "HIGH",
      "Revenue stability": "MEDIUM_VOLATILE",
      "Rural viability": "UNEVEN",
      "Evidence quality": "MODERATE_CASE_BASED",
    },
    "Public grant (NJ CIC style)": {
      "Government influence risk": "HIGH_VIA_APPROPRIATION_MEDIUM_VIA_EDITORIAL_FIREWALL",
      "Revenue stability": "LOW_WITHOUT_MULTIYEAR",
      "Rural viability": "POSSIBLE_IF_TARGETED",
      "Evidence quality": "MODERATE_ON_DOLLARS_WEAK_ON_INSTITUTIONAL_OUTCOMES",
    },
    "Citizen-directed credit": {
      "Government influence risk": "MEDIUM_VIA_ELIGIBILITY_LOW_VIA_OUTLET_CHOICE",
      "Popularity bias": "HIGH",
      "Administrative complexity": "HIGH",
      "Evidence quality": "WEAK_NO_US_NEWS_PILOT",
    },
    "Tax credit": {
      "Local accessibility": "REGRESSIVE_RISK",
      "Evidence quality": "PROPOSAL_STAGE",
    },
    "Shared-services model": {
      "Editorial independence": "PRESERVABLE_IF_NONEDITORIAL_ONLY",
      "Rural viability": "PROMISING_HYPOTHESIS",
      "Evidence quality": "EMERGING_CASE_NOT_PROOF",
    },
    "Public media": {
      "Government influence risk": "MEDIUM_HIGH_DEPENDS_ON_FIREWALLS",
      "Evidence quality": "STRONG_INTERNATIONAL_MIXED_US",
    },
  },
  last_updated: TODAY,
});

// Matrix schema note — metadata only, no full coding
const matrixPath = r("research/phase_2/civic_information_coverage_matrix.json");
if (fs.existsSync(matrixPath)) {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
  matrix.schema_metadata_updates = matrix.schema_metadata_updates || [];
  matrix.schema_metadata_updates.push({
    date: TODAY,
    slice_id: SLICE,
    change:
      "Document that financing research does NOT reinterpret not_yet_coded as uncovered; add optional future variable 'funding_dependence' deferred until coding pass",
    variables_unchanged: true,
  });
  fs.writeFileSync(matrixPath, JSON.stringify(matrix, null, 2) + "\n");
  console.log("[OK] coverage matrix metadata note");
}

// ─── Sources ───────────────────────────────────────────────────
const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const newSources = [
  {
    source_id: "CC-SRC-164",
    title: "Case Study: New Jersey Civic Information Consortium (Louie & Porto)",
    authors: ["Dickson L. Louie", "Marisa Porto"],
    year: 2025,
    url: "https://njcivicinfo.org/wp-content/uploads/2025/02/Case-Study-New-Jersey-Civic-Information-Consortium.pdf",
    source_type: "program_commissioned_case_study",
    reliability: "secondary_interested",
    primary_or_secondary: "secondary",
    jurisdiction: "New Jersey",
    research_domain: "civic_information_journalism",
    publication_date: "2025-02-06",
    retrieval_date: TODAY,
    summary:
      "Detailed institutional history of NJCIC written for the Consortium. Documents statutory path, board appointment design (16 members), early appropriations narrative, grant focus areas, and partnership with Montclair Center for Cooperative Media. Explicitly notes it does not address overall impact (separate impact report).",
    key_findings: [
      "Board structure: governor 2, legislative leaders 4, universities 6, board public 4 (as described)",
      "Early funding narrative including COVID withdrawal and 2021 $500k start",
      "Grant priorities: reporting, journalism pipeline, civic engagement",
    ],
    limitations: "Commissioned/from Consortium perspective; funding figures may conflict with budget line items; not independent causal evaluation.",
    ideological_or_institutional_considerations: "Program-adjacent authorship — use for institutional description, not proof of success.",
    verification_status: "url_verified",
    notes: "Primary narrative dossier source; cross-check money with CC-SRC-165.",
  },
  {
    source_id: "CC-SRC-165",
    title: "New Jersey Civic Information Consortium — NJ State Budget Annual Extras funding history",
    authors: ["NJ Budget Annual Extras (aggregator citing NJ OMB / Legislature)"],
    year: 2026,
    url: "https://njbudget.com/entity/new-jersey-civic-information-consortium/",
    source_type: "budget_aggregator",
    reliability: "secondary_reputable_with_verification_duty",
    primary_or_secondary: "secondary",
    jurisdiction: "New Jersey",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Tabulates governor recommendations vs appropriated amounts for NJCIC: FY2024 $3M appropriated; FY2025 $2M; FY2026 $2.5M; FY2027 $0 appropriated / $0 recommended. Demonstrates appropriation volatility.",
    key_findings: [
      "Appropriation can exceed or differ from governor recommendation",
      "FY2027 shows $0 in this aggregator — critical for hostile/indifferent government stress test",
    ],
    limitations: "Aggregator — verify against primary budget PDFs before locking claim magnitudes; may lag supplemental actions.",
    ideological_or_institutional_considerations: "Neutral budget tracking site.",
    verification_status: "url_verified",
    notes: "Preferred for attack-surface purse risk; conflicts with some case-study year totals.",
  },
  {
    source_id: "CC-SRC-166",
    title: "2025 Annual Report — New Jersey Civic Information Consortium",
    authors: ["New Jersey Civic Information Consortium"],
    year: 2026,
    url: "https://njcivicinfo.org/wp-content/uploads/2026/02/2025-Annual-Report-New-Jersey-Civic-Info-Consortium.pdf",
    source_type: "program_annual_report",
    reliability: "primary_institutional_self_report",
    primary_or_secondary: "primary",
    jurisdiction: "New Jersey",
    research_domain: "civic_information_journalism",
    publication_date: "2026-02",
    retrieval_date: TODAY,
    summary:
      "Self-reported grantmaking growth and totals (e.g., 135 grants over $12M; 2025 grantmaking >$4.3M). Describes blended public–private model with philanthropy supporting operations so state dollars go to grants.",
    key_findings: [
      "Self-reported scale of grant program",
      "Blended finance model claim",
      "Acknowledges continued public investment as essential",
    ],
    limitations: "Self-report; dollars awarded ≠ institutions covered; not an independent audit of civic outcomes.",
    ideological_or_institutional_considerations: "Promotional/accountability hybrid — pair with budget records.",
    verification_status: "url_verified",
    notes: "Outputs ≠ outcomes distinction mandatory.",
  },
  {
    source_id: "CC-SRC-167",
    title: "The effects of public campaign funding: Evidence from Seattle’s Democracy Voucher program",
    authors: ["Journal of Public Economics (article)"],
    year: 2022,
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0047272722000780",
    source_type: "peer_reviewed",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "Seattle, WA",
    research_domain: "civic_information_journalism",
    publication_date: "2022",
    retrieval_date: TODAY,
    summary:
      "Peer-reviewed difference-in-differences study of Seattle Democracy Vouchers for municipal campaigns — increased contributions/donors/candidates. Used ONLY as analogy for citizen-allocation mechanics, not as proof journalism vouchers work.",
    key_findings: [
      "Citizen vouchers can reallocate public money via individual choice at city scale",
      "Participation and competitive effects observed in campaign finance — different domain",
    ],
    limitations: "Campaign finance ≠ journalism markets; eligibility and speech contexts differ constitutionally.",
    ideological_or_institutional_considerations: "Academic causal study of a different policy.",
    verification_status: "url_verified",
    notes: "ANALOGY ONLY for HYP-CREDIT failure-mode analysis.",
  },
  {
    source_id: "CC-SRC-168",
    title: "Expanding Participation in Municipal Elections: Assessing the Impact of Seattle’s Democracy Voucher Program (UW)",
    authors: ["University of Washington researchers / Seattle program evaluation"],
    year: 2018,
    url: "https://www.seattle.gov/documents/departments/ethicselections/democracyvoucher/biennial%20reports/uw_seattle_voucher_final.pdf",
    source_type: "program_evaluation",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "Seattle, WA",
    research_domain: "civic_information_journalism",
    publication_date: "2018",
    retrieval_date: TODAY,
    summary:
      "Early evaluation: vouchers increased participation vs cash donors but users still skewed older/wealthier/whiter than electorate — equity failure mode relevant to citizen journalism credits by analogy.",
    key_findings: [
      "Participation inequality persists even under vouchers",
      "Voucher users more representative than cash donors but not fully representative",
    ],
    limitations: "Campaign finance domain; 2017 inaugural cycle.",
    ideological_or_institutional_considerations: "City-commissioned/academic evaluation.",
    verification_status: "url_verified",
    notes: "Supports FM-EQUITY / FM-LOWINFO theoretical risks for credits.",
  },
  {
    source_id: "CC-SRC-169",
    title: "Academics craft a plan… Give every American $50 to donate to news orgs (Poynter summary of Stigler/Rolnik et al. proposal)",
    authors: ["Rick Edmonds", "Poynter"],
    year: 2019,
    url: "https://www.poynter.org/business-work/2019/academics-craft-a-plan-to-infuse-billions-into-journalism-give-every-american-50-to-donate-to-news-orgs/",
    source_type: "journalism_trade",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "2019",
    retrieval_date: TODAY,
    summary:
      "Trade summary of academic citizenship news voucher proposal (~$50/adult), including eligibility panel, caps, and Seattle analogy. Proposal — not implemented.",
    key_findings: [
      "Serious voucher designs anticipate celebrity capture via caps",
      "Eligibility gatekeeping is inherent — creates government/panel influence surface",
    ],
    limitations: "Secondary summary of proposal; dollar amounts are proposal math, not CC modeling inputs.",
    ideological_or_institutional_considerations: "Trade press.",
    verification_status: "url_verified",
    notes: "Proposal bibliography for HYP-CREDIT.",
  },
  {
    source_id: "CC-SRC-170",
    title: "Policy Menu — Rebuild Local News (consumer subsidies / Local News Dollars)",
    authors: ["Rebuild Local News"],
    year: 2025,
    url: "https://www.rebuildlocalnews.org/policy-menu/",
    source_type: "advocacy_policy_menu",
    reliability: "secondary_advocacy",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Policy menu describing Local News Dollars citizen credits, tax credits, and employment tax credits. Lists pros/cons including coordinated political misuse and admin vetting — useful failure-mode catalog, not evidence of efficacy.",
    key_findings: [
      "Advocates themselves list misuse and eligibility-admin risks",
      "Distinguishes vouchers vs tax credits vs payroll credits",
    ],
    limitations: "Advocacy organization; not peer-reviewed evaluation.",
    ideological_or_institutional_considerations: "Mission-driven policy shop.",
    verification_status: "url_verified",
    notes: "Failure-mode inventory aid.",
  },
  {
    source_id: "CC-SRC-171",
    title: "Weighing different paths to funding local news (Columbia Journalism Review)",
    authors: ["Columbia Journalism Review"],
    year: 2021,
    url: "https://www.cjr.org/business_of_news/how-to-fund-local-news.php",
    source_type: "journalism_trade",
    reliability: "secondary_reputable",
    primary_or_secondary: "secondary",
    jurisdiction: "US",
    research_domain: "civic_information_journalism",
    publication_date: "2021",
    retrieval_date: TODAY,
    summary:
      "Discussion of vouchers vs tax credits vs other paths among economists/advocates (Cagé, McChesney, Prat, Waldman). Clarifies design tradeoffs; no implemented US news voucher.",
    key_findings: [
      "Economists often prefer vouchers over tax credits for equity reasons",
      "All plans still require deciding who is eligible — the hard constitutional problem",
    ],
    limitations: "Interview/feature format; not a systematic review.",
    ideological_or_institutional_considerations: "Trade journalism.",
    verification_status: "url_verified",
    notes: "Comparative design literature.",
  },
];

const existing = new Set(srcDoc.sources.map((s) => s.source_id));
for (const s of newSources) {
  if (!existing.has(s.source_id)) {
    srcDoc.sources.push(s);
    existing.add(s.source_id);
  }
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  ` Phase 2.1 (${TODAY}): CC-SRC-164–171 journalism public finance / independence comparative dossier.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources 164–171; total", srcDoc.sources.length);

// RQs
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const newRQs = [
  {
    id: "CC-RQ-P21-063",
    domain: "civic_information_journalism",
    question:
      "Reconcile NJCIC appropriation series across OMB/legislature primary PDFs vs program case-study narratives; publish an audited year-by-year table.",
    status: "open",
    related_hypothesis: HYP_PARENT,
    related_module: MOD,
    slice_id: SLICE,
    related_sources: ["CC-SRC-164", "CC-SRC-165"],
  },
  {
    id: "CC-RQ-P21-064",
    domain: "civic_information_journalism",
    question:
      "Do NJCIC grants increase regular original coverage of local institutions exercising public power, or mainly temporary projects and pipeline/engagement work?",
    status: "open",
    related_hypothesis: HYP_PARENT,
    related_module: MOD,
    slice_id: SLICE,
  },
  {
    id: "CC-RQ-P21-065",
    domain: "civic_information_journalism",
    question:
      "Can a journalism-financing system survive a hostile appropriator while remaining viewpoint-neutral and editorial-independent?",
    status: "open",
    related_hypothesis: HYP_CREDIT,
    related_module: MOD,
    slice_id: SLICE,
  },
  {
    id: "CC-RQ-P21-066",
    domain: "civic_information_journalism",
    question:
      "What eligibility criteria for 'qualifying journalism' survive First Amendment scrutiny without becoming viewpoint discrimination?",
    status: "open",
    related_hypothesis: HYP_CREDIT,
    related_module: MOD,
    slice_id: SLICE,
  },
];
const rqIds = new Set(rqDoc.questions.map((q) => q.id));
for (const q of newRQs) if (!rqIds.has(q.id)) rqDoc.questions.push(q);
rqDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");

// Hypothesis registry update
const hypReg = JSON.parse(
  fs.readFileSync(r("research/phase_2/civic_information_research_hypothesis_registry.json"), "utf8"),
);
for (const h of hypReg.hypotheses) {
  if (h.hypothesis_id === HYP_PARENT) {
    h.empirical_status = "QUALIFIED";
    h.dossier_verdict = "QUALIFIED";
    h.dossier_reason =
      "Public grant intermediaries can move money and fund journalism activities (NJ CIC), but independence under hostile appropriators is unproven; Arkansas institutional outcomes unmeasured; dollars≠scrutiny.";
  }
  if (h.hypothesis_id === HYP_PROD) {
    h.empirical_status = "NOT_ENOUGH_EVIDENCE";
    h.dossier_verdict = "NOT_ENOUGH_EVIDENCE";
    h.dossier_reason = "Causal links from granular reporting to trust/participation/prosperity not established in this slice.";
  }
  if (h.hypothesis_id === HYP_CREDIT) {
    h.empirical_status = "NOT_ENOUGH_EVIDENCE";
    h.dossier_verdict = "NOT_ENOUGH_EVIDENCE";
    h.dossier_reason =
      "No US journalism voucher pilot; Seattle evidence is campaign-finance analogy only; failure modes remain theoretical/high.";
  }
  if (h.hypothesis_id === HYP_SHARED) {
    h.empirical_status = "NOT_ENOUGH_EVIDENCE";
    h.dossier_verdict = "NOT_ENOUGH_EVIDENCE";
    h.dossier_reason =
      "Cooperative Media / shared tooling examples exist; no Arkansas rural multi-newsroom shared-services proof that preserves editorial independence.";
  }
  h.last_updated = TODAY;
}
hypReg.finance_dossier = { slice_id: SLICE, completed_at: TODAY };
hypReg.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/civic_information_research_hypothesis_registry.json"),
  JSON.stringify(hypReg, null, 2) + "\n",
);

// Public reasoning
const prDoc = JSON.parse(fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8"));
const prs = [
  {
    id: "CC-PR-024",
    q: "Why should taxpayers pay for journalism?",
    a: "Only if granular independent reporting is a public good the market underproduces — and only if a financing design can be shown to increase that reporting without political control. Importance alone is not a funding argument. Arkansas still has uncoded institutional coverage; NJ CIC shows money can move, not that scrutiny is secured.",
  },
  {
    id: "CC-PR-025",
    q: "Doesn't government funding turn journalists into government employees?",
    a: "It can, if government picks outlets, reviews content, or punishes critics via the purse. NJ CIC tries to block ownership/editorial control by statute, but appropriations and board appointments remain political. That is the attack surface — not a solved problem.",
  },
  {
    id: "CC-PR-026",
    q: "Who decides what counts as legitimate news?",
    a: "Every public program needs eligibility rules. That is the hardest constitutional and administrative problem. We catalog criteria others propose; we do not claim a final legal definition in this slice.",
  },
  {
    id: "CC-PR-027",
    q: "Why subsidize a newspaper I disagree with?",
    a: "Viewpoint-neutral public goods logic says you fund the reporting function, not your preferred ideology — but citizen credits reintroduce preference, and grant boards reintroduce discretion. Both create fair-objection problems we refuse to paper over.",
  },
  {
    id: "CC-PR-028",
    q: "Could citizen credits fund partisan propaganda?",
    a: "Yes, that is a first-order failure mode. Eligibility gates try to stop it and recreate government influence risk. No US news-voucher pilot resolves this tradeoff.",
  },
  {
    id: "CC-PR-029",
    q: "Why not let failing newspapers fail?",
    a: "Markets should be allowed to kill bad business models. The open question is whether the public function — original scrutiny of local power — disappears with them. That requires coverage matrices, not nostalgia for print.",
  },
  {
    id: "CC-PR-030",
    q: "Could subsidies protect bad incumbents?",
    a: "Yes. Grant renewals and brand-driven credits can entrench weak outlets. Any design must be tested for new-entrant access and performance, not mere survival of legacy mastheads.",
  },
  {
    id: "CC-PR-031",
    q: "Why can't philanthropy solve this?",
    a: "Philanthropy already funds much nonprofit news — and creates donor-influence and geographic favoritism risks. It may complement, not replace, a resilient public-interest design. WEHCO Community Journalism Projects illustrate hybrid models with their own capture questions.",
  },
  {
    id: "CC-PR-032",
    q: "What if the legislature dislikes the reporting it funds?",
    a: "Then annual appropriations are a retaliation channel. NJ budget aggregators showing $0 in a later year illustrate fragility. A design that works only for friendly politicians fails Constitutional Capitalism's resilience test.",
  },
  {
    id: "CC-PR-033",
    q: "Would this violate the First Amendment?",
    a: "Possibly, depending on eligibility, conditions, and administration. This slice queues Press/Speech Clause, unconstitutional conditions, and viewpoint-discrimination questions for the legal phase. We do not claim constitutional validity.",
  },
];
const prIds = new Set(prDoc.records.map((x) => x.record_id));
for (const p of prs) {
  if (prIds.has(p.id)) continue;
  prDoc.records.push({
    record_id: p.id,
    change_id: `CC-CHG-P21-${p.id}`,
    claim_id: null,
    change_type: "PUBLIC_REASONING",
    decision: "EXPLAIN_OPEN_PROBLEM",
    decision_id: "CC-DEC-103",
    adjudicator: "ChatGPT",
    decided_at: TODAY,
    skeptical_reader_question: p.q,
    public_answer: p.a,
    what_we_originally_said: "Local journalism hypotheses registered under freeze.",
    what_made_us_question_it: "Risk of sliding from 'journalism matters' to 'therefore subsidize.'",
    what_we_learned: p.a,
    where_our_reasoning_was_weak: "Solution-first temptation.",
    what_we_now_say: p.a,
    why_we_made_that_decision: "Falsification study discipline.",
    what_we_still_dont_know: "Legal validity; Arkansas institutional effects; durable capacity from grants.",
    what_else_this_could_affect: ["Civic Information Credit design", "Infrastructure floor", "SIE variables"],
    potential_secondary_effects_or_unintended_consequences: ["Readers may want a simple yes/no — refused"],
    what_evidence_could_change_our_mind_again: "Independent evaluations + hostile-government stress tests + coded coverage gains.",
  });
  wt(
    `reports/public_reasoning/${p.id}.md`,
    `# ${p.id}\n\n**Q:** ${p.q}\n\n**A:** ${p.a}\n`,
  );
}
prDoc.slice_id = SLICE;
prDoc.generated_at = TODAY;
fs.writeFileSync(r("research/phase_2/public_reasoning_registry.json"), JSON.stringify(prDoc, null, 2) + "\n");

// Reports
wt(
  "reports/CC_NJ_CIVIC_INFORMATION_CONSORTIUM_DOSSIER_1_0.md",
  `# NJ Civic Information Consortium Dossier 1.0

**Slice:** ${SLICE}  
**Sources:** CC-SRC-144, 145, 164, 165, 166

## Institutional history (compressed)

- Created by P.L.2018, c.111 as a nonprofit university consortium for civic-information grants.
- Board described as 16 members (gov 2 / legislative leaders 4 / universities 6 / board public 4) — case study.
- Claims statutory barrier to state/consortium ownership or editorial control of grantee projects.
- Partner ecosystem includes Montclair Center for Cooperative Media; Civilio NJ (meeting→searchable info) announced as new initiative on program site.

## Funding history

**Conflict warning:** case-study year totals ≠ njbudget.com appropriated series. Both retained; neither silently preferred without primary PDF reconciliation (RQ-063).

From **CC-SRC-165** (aggregator): FY2024 $3M; FY2025 $2M; FY2026 $2.5M; FY2027 $0 appropriated.

## Distinguish

MONEY APPROPRIATED ≠ MONEY AWARDED ≠ JOURNALISM PRODUCED ≠ AUDIENCE REACHED ≠ INSTITUTIONS COVERED ≠ CIVIC OUTCOMES.

## Weaknesses

Appropriation fragility; political appointees; self-reported impact; no Arkansas-style institutional coverage matrix for NJ grantees in this slice.
`,
);

wt(
  "reports/CC_JOURNALISM_GOVERNMENT_INDEPENDENCE_TEST_1_0.md",
  `# Journalism Government Independence Test 1.0

See \`research/phase_2/journalism_government_influence_attack_surface.json\`.

**Bottom line:** Editorial non-ownership claims matter, but the decisive vulnerability is the **annual political purse**. A financing system that requires benevolent appropriators is not resilient enough for Constitutional Capitalism.
`,
);

wt(
  "reports/CC_CIVIC_INFORMATION_CREDIT_FALSIFICATION_1_0.md",
  `# Civic Information Credit Falsification 1.0

Hypothesis under test — not a proposal.

**Verdict: NOT ENOUGH EVIDENCE.**

No US journalism voucher pilot. Seattle Democracy Vouchers inform mechanics and equity failure modes only. Academic proposals themselves introduce eligibility panels/caps — recreating government/panel influence.

Failure-mode registry: \`civic_information_credit_failure_modes.json\`.
`,
);

wt(
  "reports/CC_JOURNALISM_PUBLIC_FINANCE_COMPARISON_1_0.md",
  `# Journalism Public Finance Comparison 1.0

Matrix: \`journalism_public_finance_comparison_matrix.json\`.

No overall winner score. Key pattern: mechanisms that reduce government outlet-picking (credits) raise popularity/eligibility problems; mechanisms that target civic gaps (grants/floors) raise appropriation/board discretion problems.
`,
);

wt(
  "reports/CC_LOCAL_JOURNALISM_FINANCE_WHAT_WE_LEARNED_1_0.md",
  `# What We Learned — Local Journalism Finance (1.0)

1. Arkansas: outlet presence ≠ proven institutional scrutiny (\`not_yet_coded\` = unknown).
2. NJ CIC: proves a state can fund journalism via nonprofit intermediary; does **not** prove durable institutional coverage or hostile-government survival.
3. Citizen credits: theoretically attractive for diffusion of choice; empirically untested for news; failure modes serious.
4. Infrastructure floor + shared non-editorial services remain promising research paths for low-popularity civic beats.
5. Forbidden inference rejected: “Journalism is important ⇒ government should subsidize it.”
`,
);

const returnMd = `# CC-PHASE-2.1-LOCAL-JOURNALISM-PUBLIC-FINANCE-AND-INDEPENDENCE-COMPARATIVE-DOSSIER-1.0 — Return

## 1. Executive Summary

Financing-and-governance falsification study complete. **We do not conclude that government should subsidize journalism.** NJ CIC shows public dollars can fund journalism projects through a nonprofit intermediary with claimed editorial firewalls — while remaining vulnerable to appropriation politics. Citizen-directed credits remain **NOT ENOUGH EVIDENCE** (no US news voucher pilot). Arkansas diagnosis preserved.

## 2. Arkansas Diagnostic Preserved

\`OUTLET PRESENCE ≠ PROVEN INSTITUTIONAL SCRUTINY\`  
84 rows; 8 partial; remainder \`not_yet_coded\` = **unknown**, not uncovered.

## 3. NJ CIC Institutional History

Statute 2018; nonprofit consortium; 16-member board design (case study); university partners; grant priorities: reporting / pipeline / engagement. Sources CC-SRC-144/145/164.

## 4. NJ CIC Funding History

Conflicting series documented (CC-SRC-164 vs CC-SRC-165). Aggregator shows FY2027 **$0** appropriated — central to resilience analysis. RQ-063 opened for primary PDF reconciliation.

## 5. NJ CIC Outcomes

Self-reported grants/dollars/audience (CC-SRC-166). **Institutions covered** and **civic outcomes** not independently established here.

## 6. NJ CIC Weaknesses / Criticism

Purse volatility; political appointments; self-evaluation bias; dollars≠scrutiny.

## 7. Government Influence Attack Surface

\`journalism_government_influence_attack_surface.json\` — appropriation is the critical channel.

## 8. Citizen-Directed Financing Evidence

Proposals + Seattle campaign-finance analogy only (CC-SRC-167–171).

## 9. Civic Information Credit Failure Modes

Mapped (popularity, partisan mobilization, eligibility manipulation, rural compliance, etc.) — not solved.

## 10. Infrastructure-Floor Evidence

Conceptually supported by Arkansas gap logic (low-popularity boards) and NJ grant targeting claims; **no causal proof**.

## 11. Shared-Services Evidence

Montclair Cooperative Media / Civilio NJ are adjacent examples; rural multi-newsroom co-op preserving editorial independence = **NOT ENOUGH EVIDENCE**.

## 12. Ownership Findings

Local rescue (Helena), chain weekly (Searcy), family municipal (Jacksonville), WEHCO regionals — **insufficient evidence** to claim ownership form ⇒ coverage quality without matrix coding.

## 13. Technology / Distribution Findings

Platform/ad dependence is real market context (case study narrative); community can lose practical access even if journalism exists — flagged, not quantified.

## 14. Medium-Neutrality Findings

Support the **function** (original civic reporting), not a privileged medium — eligibility still hard.

## 15. Journalism Eligibility Problem

Identified as constitutional/admin flashpoint; no final definition.

## 16. Constitutional Questions Queued

Viewpoint/content discrimination; subsidies for speech; unconstitutional conditions; Press/Speech Clause — legal phase.

## 17. International Comparisons

Deferred deep dive; license-fee/public broadcaster families noted as mechanism catalogs only — not importable without US constitutional accounting.

## 18. Arkansas Applicability

| Geography | Likely problem class (conceptual) |
| --- | --- |
| Searcy | Revenue + reporter capacity + **unknown** institutional coverage |
| Lafayette | Same; second title status uncertain |
| West Helena | Capacity exists relatively; durability/revenue; matrix incomplete |
| Jacksonville | Municipal granular coverage unknown vs self-description |
| Benton | Market stronger; still unknown for all institutions |
| Pulaski | Outlet-rich; coverage deserts inside metro still possible |

Do not prescribe funding where diagnosis remains unknown.

## 19. Journalism Capacity Ladder

Levels 0–5 defined; AR geos capped at 1–2 pending coding.

## 20. Financing Comparison Matrix

No winner score — see JSON.

## 21. Strongest Supporting Evidence

- NJ CIC statutory intermediary + claimed editorial non-control
- Budget lines showing multi-year public appropriations (when present)
- Arkansas evidence that local ownership can restart a paper after chain closure (Helena)

## 22. Strongest Contrary Evidence

- Appropriation can go to $0 (aggregator FY2027)
- No independent proof grants ⇒ sustained institutional scrutiny
- Citizen credits untested; Seattle equity skew warns against romanticizing allocation
- Eligibility gates recreate state influence

## 23. Unintended Consequences

Incumbent protection; dependency; donor capture of matches; admin burden crushing rural startups; partisan credit capture; compliance-as-surveillance.

## 24. Public Reasoning Records

CC-PR-024 through CC-PR-033.

## 25. Hypothesis Verdicts

| Hypothesis | Verdict |
| --- | --- |
| CC-HYP-LOCAL-INDEPENDENT-JOURNALISM-ECOSYSTEM | **QUALIFIED** |
| CC-HYP-CIVIC-INFORMATION-AS-PRODUCTIVE-INFRASTRUCTURE | **NOT ENOUGH EVIDENCE** |
| CC-HYP-CITIZEN-DIRECTED-JOURNALISM-ALLOCATION | **NOT ENOUGH EVIDENCE** |
| CC-HYP-REGIONAL-NEWSROOM-SHARED-SERVICES | **NOT ENOUGH EVIDENCE** |

## 26. Sources Added

CC-SRC-164–171 (total sources now ${"SOURCE_TOTAL"}).

## 27. Research Questions Added

CC-RQ-P21-063–066.

## 28. Baseline

**Unchanged** — still 2/86 (not advanced by this slice).

## 29. GATE-02

**Not passed** — source growth alone insufficient.

## 30. Validators

See ship log in return process.

## 31. Files Changed

See git commit.

## 32. Commit Hash

Pending ship.

## 33. Remaining Unknowns

Primary PDF appropriation reconciliation; NJ institutional coverage matrix; US news voucher pilot evidence; First Amendment holdings on eligibility; Arkansas 90-day coding.

## 34. Exact Next Recommended Slice

\`CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0\`

(Journalism track pauses; agriculture/livestock processing resumes.)
`;

wt(
  "reports/CC_PHASE_2_1_LOCAL_JOURNALISM_PUBLIC_FINANCE_AND_INDEPENDENCE_COMPARATIVE_DOSSIER_1_0_RETURN.md",
  returnMd.replace("${" + "SOURCE_TOTAL}", String(srcDoc.sources.length)),
);

// Fix returnMd - I used a bad replace. Rewrite last part properly.
wt(
  "reports/CC_PHASE_2_1_LOCAL_JOURNALISM_PUBLIC_FINANCE_AND_INDEPENDENCE_COMPARATIVE_DOSSIER_1_0_RETURN.md",
  `# CC-PHASE-2.1-LOCAL-JOURNALISM-PUBLIC-FINANCE-AND-INDEPENDENCE-COMPARATIVE-DOSSIER-1.0 — Return

## 1. Executive Summary

Financing-and-governance falsification study complete. **We do not conclude that government should subsidize journalism.** NJ CIC shows public dollars can fund journalism projects through a nonprofit intermediary with claimed editorial firewalls — while remaining vulnerable to appropriation politics. Citizen-directed credits remain **NOT ENOUGH EVIDENCE** (no US news voucher pilot). Arkansas diagnosis preserved.

## 2. Arkansas Diagnostic Preserved

\`OUTLET PRESENCE ≠ PROVEN INSTITUTIONAL SCRUTINY\`  
84 rows; 8 partial; remainder \`not_yet_coded\` = **unknown**, not uncovered.

## 3–7. NJ CIC + Attack Surface

See \`nj_civic_information_consortium_dossier.json\`, \`journalism_government_influence_attack_surface.json\`, and companion reports. Appropriation fragility (incl. FY2027 $0 in CC-SRC-165 aggregator) is the decisive independence stress.

## 8–11. Credits, Floor, Shared Services

Credits: **NOT ENOUGH EVIDENCE**. Floor + shared non-editorial services: promising, unproven.

## 12–17. Ownership, Tech, Medium, Eligibility, Constitution, International

Ownership form ≠ proven coverage quality without matrices. Medium-neutrality preferred for *function*. Eligibility = constitutional flashpoint (queued). International systems = mechanism catalog only.

## 18. Arkansas Applicability

Do not prescribe funding where institutional coverage remains unknown. Problem classes differ by geography (revenue/capacity vs possible intra-metro coverage deserts).

## 19–20. Ladder + Finance Matrix

Ladder levels 0–5; AR capped at 1–2. Finance matrix has **no winner score**.

## 21–23. Support / Contrary / Unintended

Support: intermediary model + claimed editorial non-control + multi-year appropriations when present.  
Contrary: purse-to-zero risk; dollars≠scrutiny; untested credits; eligibility capture.  
Unintended: incumbent protection, dependency, donor/partisan capture, rural admin burden.

## 24. Public Reasoning

CC-PR-024–033.

## 25. Hypothesis Verdicts

| Hypothesis | Verdict |
| --- | --- |
| Parent ecosystem | **QUALIFIED** |
| Productive infrastructure | **NOT ENOUGH EVIDENCE** |
| Civic Information Credit | **NOT ENOUGH EVIDENCE** |
| Shared-services co-op | **NOT ENOUGH EVIDENCE** |

## 26–27. Sources / RQs

CC-SRC-164–171 · CC-RQ-P21-063–066 · Sources total: ${srcDoc.sources.length}

## 28–29. Baseline / GATE-02

Baseline **unchanged (2/86)**. GATE-02 **not passed**.

## 30–32. Validators / Files / Commit

Filled at ship time.

## 33. Remaining Unknowns

Primary appropriation reconciliation; NJ institutional coverage; news voucher empirics; First Amendment eligibility doctrine; AR 90-day coding.

## 34. Exact Next Recommended Slice

**CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0**
`,
);

// Project wiring
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
if (!updates.updates.some((u) => u.id === "UPD-081")) {
  updates.updates.push({
    id: "UPD-081",
    date: TODAY,
    title: "Journalism public finance & independence comparative dossier",
    summary:
      "Under CC-DEC-103 (not doctrine): falsification dossier on NJ CIC, citizen-credit proposals, attack surfaces, and financing comparison. Parent journalism hypothesis QUALIFIED; credit/shared-services/productive-infrastructure children NOT ENOUGH EVIDENCE. Arkansas outlet≠scrutiny diagnosis preserved. No subsidy endorsement. Next: Clinton/FSIS.",
    public: true,
  });
}
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const entry = {
  slice_id: SLICE,
  title: "Local Journalism Public Finance & Independence Comparative Dossier",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "nj_civic_information_consortium_dossier.json",
    "journalism_public_finance_comparison_matrix.json",
    "civic_information_credit_failure_modes.json",
    "journalism_government_influence_attack_surface.json",
    "journalism_capacity_ladder.json",
    "CC-SRC-164–171",
    "CC-PR-024–033",
    "hypothesis verdicts QUALIFIED / NEE",
  ],
  next_recommended_slice: "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0",
  note: "Falsification study — not a subsidy argument. Return to agriculture track.",
};
if (!sliceQueue.slices.some((s) => s.slice_id === SLICE)) sliceQueue.slices.push(entry);
sliceQueue.active_slice = "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0";
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  slice_return:
    "reports/CC_PHASE_2_1_LOCAL_JOURNALISM_PUBLIC_FINANCE_AND_INDEPENDENCE_COMPARATIVE_DOSSIER_1_0_RETURN.md",
  writing_focus:
    "Journalism finance falsification dossier complete. Credits NEE. NJ CIC QUALIFIED as intermediary model only. Return to Clinton/FSIS livestock-processing capacity.",
  next_action: "Execute Clinton/FSIS + Arkansas establishment capacity map. Journalism pauses.",
  sources_registered: srcDoc.sources.length,
  journalism_finance_dossier: SLICE,
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary:
    "Journalism public-finance/independence falsification dossier: NJ CIC intermediary model QUALIFIED with appropriation fragility; Civic Information Credit NOT ENOUGH EVIDENCE; shared-services NEE; productive-infrastructure NEE. Arkansas outlet≠scrutiny preserved. No subsidy endorsement. Sources 164–171. Next: Clinton/FSIS.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice: "CC-PHASE-2.1-CLINTON-HUB-FSIS-TEST-AND-AR-ESTABLISHMENT-CAPACITY-MAP-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-081"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "Rejected 'journalism matters ⇒ subsidize.' Baseline 2/86 unchanged. GATE-02 not passed. Funding series conflicts documented, not invented away.",
  next_command: "Run Clinton/FSIS capacity map slice",
  report:
    "reports/CC_PHASE_2_1_LOCAL_JOURNALISM_PUBLIC_FINANCE_AND_INDEPENDENCE_COMPARATIVE_DOSSIER_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
});

console.log("\nDossier complete:", SLICE);
console.log("Sources:", srcDoc.sources.length);
