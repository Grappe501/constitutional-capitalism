/**
 * One-shot registry bootstrap for Prosperous Aging System.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_prosperous_aging_shared_prosperity_retirement";
const DECISION = "CC-DEC-088";
const PRINCIPLE = "CC-PRIN-43";
const COMMON_CONFLICTS = [
  "replacing Social Security before ownership layers are proven",
  "converting the guarantee entirely into private investment accounts",
  "political raiding of retirement or community trust principal",
  "community benefits that trap people geographically",
  "treating contribution formulas as locked without modeling",
];
const COMMON_RESEARCH = [
  "Social Security stabilization and contribution-base modeling",
  "Citizen Ownership Account contribution and matching design",
  "Community Prosperity Trust vesting and portability rules",
  "corporate prosperity contribution formula fiscal modeling",
  "30-year transition stress testing and legal drafting",
];

const statements = [
  [
    249,
    "proposed_foundational_principle",
    true,
    "Prosperous Aging System: A lifetime of work, caregiving, military service, civic participation, entrepreneurship, and community contribution should produce more than subsistence in old age. The republic shall preserve a guaranteed foundation of retirement security while enabling every person to accumulate ownership, share in national productivity, participate in the prosperity of the community they helped build, and age with healthcare, housing, transportation, medicine, energy, dignity, and meaningful civic belonging.",
  ],
  [
    250,
    "proposed",
    false,
    "Public promise: No earned Social Security benefit will be taken away. Current retirees and people nearing retirement remain fully protected. Constitutional Capitalism adds ownership, healthcare security, housing stability, transportation, energy affordability, and community dividends so retirement becomes security and participation—not mere survival.",
  ],
  [
    251,
    "proposed",
    false,
    "Problem and baseline context: Social Security is the central retirement foundation for tens of millions; SSA reports nearly 71 million beneficiaries for the 2026 COLA; the progressive PIA formula replaces a larger share of lower average earnings; 2026 Trustees project OASI full benefits only until Q4 2032 then about 78% unless Congress acts; GAO found about one in ten low-income near-retirement households had a retirement account in 2019 versus about nine in ten high-income households.",
  ],
  [
    252,
    "proposed",
    false,
    "Layer 1 — Social Security Guarantee: remain the national guarantee against poverty, disability, premature death of a supporting worker, and extreme longevity — lifelong inflation-adjusted basic income, survivor and disability protection, caregiver and interrupted-work protections, stronger minimum benefit, protection from market crashes and outliving savings. Security layer, not the entire vision. Stabilize financing transparently; exact options require modeling.",
  ],
  [
    253,
    "proposed",
    false,
    "Never convert Social Security entirely into private investment accounts. Defined-contribution systems place substantial market, longevity, and decision-making risk on individuals; many lower-income households have little or no retirement-account wealth today.",
  ],
  [
    254,
    "proposed_design_agenda",
    false,
    "Layer 2 — National Citizen Ownership Account: portable individual account from adulthood or potentially birth, accumulating diversified ownership via corporate prosperity contributions, worker contributions when able, public matching, energy and resource dividends, productivity and AI/automation contributions, civic and military service credits, profit-sharing, and public-investment earnings. Professionally managed, raid- and fee-protected, partially inheritable, partly convertible to lifetime income. Diversify beyond single-employer stock even where ESOPs broaden ownership.",
  ],
  [
    255,
    "proposed",
    false,
    "Layer 3 — Local Community Prosperity Accounts: Community Prosperity Trusts funded by community energy, resource payments, corporate community contributions, public land/lease revenue, local public equity, industrial impact payments, enterprise and community-banking returns, housing/development revenue, and matching funds. Annual earnings—not principal—may support retirement dividends, utilities, transportation, accessibility, local healthcare, food, caregivers, and community activities. Principle: when a community grows wealth, the people who built and sustained it should share in its enduring prosperity.",
  ],
  [
    256,
    "proposed",
    false,
    "Community vesting without geographic traps: eligibility builds through residency, local work or business, caregiving, civic and volunteer service, military service followed by community participation, teaching and public safety, institutional contribution, and documented disability or family care — not mere arrival shortly before retirement. Benefits vest gradually and remain partially portable while community-specific dividends reflect place-built wealth.",
  ],
  [
    257,
    "proposed",
    false,
    "Layer 4 — Retirement Essentials: security is not only a monthly check. Guarantee access to essential healthcare following the person; secure aging-in-place housing; community and medical transportation; affordable essential medicines; protected essential household energy; and local food and daily support services.",
  ],
  [
    258,
    "proposed",
    false,
    "Local Aging and Family Care Networks: coordinate home health, adult day, respite, meals, transportation, home modification, preventive care, civic activity, memory-care support, caregiver training, and hospice. Default: help people remain with family and community as long as safe, desired, and medically appropriate.",
  ],
  [
    259,
    "proposed",
    false,
    "Recognize extended-family caregiving as productive contribution: family members reducing paid work for substantial care may earn retirement credits, healthcare continuity, respite, training, and community-service credits.",
  ],
  [
    260,
    "proposed_design_agenda",
    false,
    "Corporate responsibility: transparent contributions reflecting payroll, profits, contract labor, automation gains, market size, resource consumption, public-benefit workforce dependence, and local footprint — divided among Social Security, Citizen Ownership Accounts, employee profit-sharing/ownership, Community Prosperity Trusts, and healthcare/long-term care. Small businesses get lower rates, simplified administration, or matching; do not crush local employers.",
  ],
  [
    261,
    "proposed",
    false,
    "Thirty-year transition: Era 1 protect and stabilize (0–5); Era 2 add ownership (5–12); Era 3 build local prosperity (10–20); Era 4 mature shared retirement (20–30). Nobody loses an existing benefit. Publish plain-language individual transition statements.",
  ],
  [
    262,
    "proposed",
    false,
    "Retirement Security Covenant: no confiscation of earned benefits; no current-retiree cuts from transition; near-retirees stay under planned system unless voluntarily choosing better; ownership additions before replacements; no political raids on accounts; community funds nonpartisan; strict manager fee/conflict rules; annual plain-language statements; independent stress tests; automatic corrections if funding falls below safe levels.",
  ],
  [
    263,
    "proposed",
    false,
    "Public messaging: do not say we are replacing Social Security or that government will take over retirement or that local benefits are welfare. Say we protect Social Security and build the system that should have existed above it; every citizen gains real ownership; communities return shared earnings to those who built them.",
  ],
  [
    264,
    "proposed_foundational_principle",
    true,
    "Governing retirement doctrine restated: preserve a guaranteed foundation while enabling ownership, national productivity shares, community prosperity participation, and aging with healthcare, housing, transportation, medicine, energy, dignity, and civic belonging — a Prosperous Aging System, not merely a pension program.",
  ],
  [
    265,
    "proposed",
    false,
    "Vision phrase: Social Security keeps you from falling. Constitutional Capitalism helps you continue rising.",
  ],
  [
    266,
    "proposed",
    false,
    "Integrate with Health Human Capacity, Energy Sovereignty / People’s Energy Dividend, Civic Wealth, Resource Sovereignty, Assistance, and Family spines so retirement essentials and dividends are coherent across domains rather than siloed programs.",
  ],
  [
    267,
    "proposed",
    false,
    "Payroll-financing reductions or transfers wait until the new system is fully funded, independently audited, stress-tested through recessions, and shown to outperform the old structure.",
  ],
  [
    268,
    "proposed",
    false,
    "Implementation rule: pilot Community Prosperity Trusts and Citizen Ownership Account mechanics regionally with defined costs, outcomes, failure triggers, and independent evaluation before nationwide restructuring. Contribution formulas remain design parameters until modeled.",
  ],
];

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Prosperous Aging")) {
    dd.note = dd.note.replace(
      "Includes Health / Human Capacity",
      "Includes Prosperous Aging System (CC-PRIN-43), Health / Human Capacity"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-28")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-28",
      title: "Prosperous Aging System / Shared Prosperity Retirement",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_ssa_gao_irs_baselines",
      affected_domains: [
        "social_security",
        "retirement",
        "ownership",
        "community_prosperity",
        "aging_care",
        "corporate_contribution",
        "healthcare",
        "housing",
      ],
      constitutional_questions: [
        "How does a republic protect Social Security as a permanent floor while building ownership above it?",
        "How can community prosperity dividends reward builders without trapping residents geographically?",
        "How should corporate prosperity contributions finance people and places without crushing small employers?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local", "regional"],
      risks: [
        "frightening the public with replace-Social-Security framing",
        "treating contribution formulas as locked before modeling",
        "political raiding of ownership or community trusts",
        "conflating SSA/GAO baselines with proof that new institutions already exist",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-43; SSA/GAO/IRS baselines sourced; financing formulas require modeling; legal 0%.",
    });
  }
  for (const [n, maturity, declCand, statement] of statements) {
    const id = `CC-DEV-${n}`;
    if (dd.items.some((i) => i.doctrine_id === id)) continue;
    dd.items.push({
      doctrine_id: id,
      statement,
      origin: ORIGIN,
      maturity,
      implications: n === 249 ? [PRINCIPLE] : ["prosperous_aging"],
      conflicts: COMMON_CONFLICTS,
      research_required: COMMON_RESEARCH,
      declaration_revision_candidate: declCand,
      status: "open",
      related_decision_ids: [DECISION],
      phase_destination: "phase-3_and_phase-4",
    });
  }
  write("data/project/developing_doctrine.json", dd);
}

{
  const pr = read("data/project/principles.json");
  if (!pr.some((p) => p.id === PRINCIPLE)) {
    pr.push({
      id: PRINCIPLE,
      title: "Prosperous Aging System",
      statement:
        "A lifetime of work, caregiving, military service, civic participation, entrepreneurship, and community contribution should produce more than subsistence in old age. The republic shall preserve a guaranteed foundation of retirement security while enabling every person to accumulate ownership, share in national productivity, participate in the prosperity of the community they helped build, and age with healthcare, housing, transportation, medicine, energy, dignity, and meaningful civic belonging.",
      text:
        "A lifetime of work, caregiving, military service, civic participation, entrepreneurship, and community contribution should produce more than subsistence in old age. The republic shall preserve a guaranteed foundation of retirement security while enabling every person to accumulate ownership, share in national productivity, participate in the prosperity of the community they helped build, and age with healthcare, housing, transportation, medicine, energy, dignity, and meaningful civic belonging.",
      explanation:
        "Major national doctrine. Protect Social Security first as permanent floor; add National Citizen Ownership Accounts, Community Prosperity Trusts, and Retirement Essentials above it over a ~30-year transition. Retirement Security Covenant. Never convert Social Security entirely into private accounts. Links Health, Energy, Civic Wealth, Resource Sovereignty. Architecture only; SSA/GAO/IRS baselines sourced; contribution formulas and legal drafting 0%.",
      protects: [
        "earned Social Security benefits for current and near-retirees",
        "portable diversified citizen ownership",
        "community prosperity participation for builders and caregivers",
        "aging with essential healthcare, housing, transport, medicine, and energy",
      ],
      prohibits: [
        "confiscating earned Social Security benefits in transition",
        "replacing the guarantee with private accounts before ownership layers are proven",
        "political raiding of retirement or community trust principal",
        "community benefits that trap people geographically",
      ],
      implications: [
        "Shared Prosperity Retirement architecture",
        "links Health Human Capacity, Energy Sovereignty, Civic Wealth, Resource Sovereignty, Assistance, Family",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What Social Security stabilization package survives actuarial modeling without benefit cuts?",
        "What Citizen Ownership Account contribution and matching rates are fiscally durable?",
        "What Community Prosperity vesting rules are fair, portable, and fraud-resistant?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/prosperous_aging_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Prosperous Aging System / Shared Prosperity Retirement",
      question:
        "Should Constitutional Capitalism adopt the Prosperous Aging System as a major doctrine (CC-PRIN-43, CC-DEV-249–268, CC-DCC-28) — protecting Social Security as the permanent guaranteed floor; adding National Citizen Ownership Accounts, Community Prosperity Trusts, and Retirement Essentials; Local Aging and Family Care Networks; corporate prosperity contributions; a ~30-year additions-before-replacements transition; and a Retirement Security Covenant — while registering sourced SSA/GAO/IRS baselines without claiming the new institutions already exist or locking contribution formulas?",
      status: "approved",
      rationale:
        "The safest persuasive path is not to replace Social Security first. Social Security remains the security layer for tens of millions; GAO evidence shows defined-contribution wealth is highly unequal; trustees project OASI financing pressure by 2032. Constitutional Capitalism should stabilize and protect that floor while building ownership, community dividends, and essential systems above it so retirement becomes security and participation—not mere survival.",
      impact: [
        PRINCIPLE,
        "CC-DEV-249–268",
        "capture_cluster CC-DCC-28",
        "prosperous_aging_framework",
        "sources CC-SRC-068–072",
        "claims CC-CLAIM-119–123",
        "book/board prosperous-aging surfaces",
        "new IA node CC-WEB-PROSPEROUS-AGING",
      ],
      recommendation:
        "Adopt as major pillar architecture. Frame as protect-and-build-above, never replace-first. Label contribution formulas and trust parameters as requiring modeling. Do not invent fund balances or benefit cuts. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86.",
      approved_by: "Steve",
      decided_at: "2026-08-05",
      supersedes: null,
    });
  }
  write("data/decisions/decisions.json", dec);
}

{
  const up = read("data/project/updates.json");
  up.last_updated = "2026-08-05";
  if (!up.updates.some((u) => u.id === "UPD-039")) {
    up.updates.push({
      id: "UPD-039",
      date: "2026-08-05",
      title: "Prosperous Aging System — protect Social Security, build ownership above it",
      summary:
        "Adopts CC-PRIN-43 / CC-DEC-088: Shared Prosperity Retirement with Social Security as permanent floor; Citizen Ownership Accounts; Community Prosperity Trusts; Retirement Essentials; Local Aging Networks; corporate contributions; 30-year transition; Retirement Security Covenant. Sourced SSA/GAO/IRS baselines. Architecture only; financing formulas and legal remain 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Prosperous Aging") && !src.note.includes("SSA/GAO")) {
    src.note = src.note.replace(
      "and Health/CMS/HRSA/CDC/ACHI structural baselines",
      "Health/CMS/HRSA/CDC/ACHI structural baselines, and Prosperous Aging SSA/GAO/IRS baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-068",
      title: "Cost-of-Living Adjustment (COLA) Information",
      authors: ["Social Security Administration"],
      year: 2025,
      url: "https://www.ssa.gov/news/en/cola/index.html",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "social_security",
      publication_date: "2025-10",
      retrieval_date: "2026-08-05",
      summary:
        "SSA COLA information: Social Security and SSI benefits for 75 million Americans increase 2.8% in 2026; nearly 71 million Social Security beneficiaries see the COLA beginning January 2026; nearly 7.5 million SSI recipients begin December 31, 2025.",
      key_findings: [
        "Nearly 71 million Social Security beneficiaries receive the 2026 COLA beginning January 2026",
        "2.8 percent COLA for 2026",
      ],
      limitations: "Beneficiary counts are point-in-time program announcements and can change with enrollment.",
      ideological_or_institutional_considerations: "Official SSA news product.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Direct /cola/ path blocked in this environment; wording confirmed via SSA news COLA page search excerpt and press release.",
    },
    {
      source_id: "CC-SRC-069",
      title: "Trustees Report Summary",
      authors: ["Social Security Board of Trustees"],
      year: 2026,
      url: "https://www.ssa.gov/oact/trsum/",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "social_security_financing",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "2026 Trustees Report Summary: OASI Trust Fund can pay 100% of scheduled benefits until the fourth quarter of 2032; thereafter continuing income sufficient to pay 78% of scheduled benefits under intermediate assumptions unless Congress acts.",
      key_findings: [
        "OASI reserves projected depleted Q4 2032",
        "About 78% of scheduled OASI benefits payable thereafter from continuing income",
      ],
      limitations: "Intermediate assumptions; projections revise annually; combined OASDI depletion timing differs from OASI-alone.",
      ideological_or_institutional_considerations: "Official Trustees summary.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Use OASI-specific 2032/78% wording carefully; do not confuse with combined OASDI 2034/83%.",
    },
    {
      source_id: "CC-SRC-070",
      title: "Older Workers: Retirement Account Disparities Have Increased by Income and Persisted by Race Over Time",
      authors: ["U.S. Government Accountability Office"],
      year: 2023,
      url: "https://www.gao.gov/products/gao-23-105342",
      source_type: "federal_oversight",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "retirement_accounts",
      publication_date: "2023",
      retrieval_date: "2026-08-05",
      summary:
        "GAO analysis of SCF data on households ages 51–64: about one in ten low-income households had a retirement account balance in 2019 (down from about one in five in 2007), while about nine in ten high-income households had a balance through the period.",
      key_findings: [
        "About 1 in 10 low-income near-retirement households had a retirement account balance in 2019",
        "About 9 in 10 high-income households had a balance 2007–2019",
      ],
      limitations: "Household survey; ages 51–64; income quintile definitions in report; not a claim about all ages.",
      ideological_or_institutional_considerations: "Nonpartisan congressional oversight agency.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports caution against converting Social Security entirely into defined-contribution accounts.",
    },
    {
      source_id: "CC-SRC-071",
      title: "Employee stock ownership plans (ESOPs)",
      authors: ["Internal Revenue Service"],
      year: 2026,
      url: "https://www.irs.gov/retirement-plans/employee-stock-ownership-plans-esops",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "employee_ownership",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "IRS: an ESOP is an IRC 401(a) qualified defined contribution plan that is a stock bonus plan (or stock bonus/money purchase plan) and must be designed to invest primarily in qualifying employer securities.",
      key_findings: [
        "ESOPs are defined contribution plans designed to invest primarily in qualifying employer securities",
      ],
      limitations: "Describes ESOP legal design; does not evaluate diversification adequacy for national retirement policy.",
      ideological_or_institutional_considerations: "Official IRS retirement-plans page.",
      verification_status: "url_verified",
      notes: "Supports diversification-safeguard framing for Citizen Ownership Accounts beyond employer stock.",
    },
    {
      source_id: "CC-SRC-072",
      title: "Primary Insurance Amount",
      authors: ["Social Security Administration"],
      year: 2026,
      url: "https://www.ssa.gov/oact/cola/piaformula.html",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "social_security",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "SSA OACT PIA formula page: for 2026 eligibility, PIA equals 90% of the first $1,286 of AIME, plus 32% of AIME between $1,286 and $7,749, plus 15% of AIME over $7,749 — a progressive bend-point structure.",
      key_findings: [
        "2026 PIA bend points $1,286 and $7,749",
        "Replacement factors 90%, 32%, and 15% across AIME segments",
      ],
      limitations: "Formula progressivity describes replacement of AIME segments; individual replacement rates vary with career earnings and claiming age.",
      ideological_or_institutional_considerations: "Official SSA Office of the Chief Actuary page.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Use for progressive-replacement design claim separate from COLA beneficiary counts.",
    },
  ];
  for (const s of sources) {
    if (!src.sources.some((x) => x.source_id === s.source_id)) src.sources.push(s);
  }
  write("data/research/source_registry.json", src);
}

{
  const cl = read("data/research/claim_ledger.json");
  cl.last_updated = "2026-08-05";
  const claims = [
    {
      claim_id: "CC-CLAIM-119",
      claim_text:
        "According to SSA COLA information, nearly 71 million Social Security beneficiaries will see the 2.8 percent COLA beginning in January 2026.",
      chapter_ids: [],
      claim_type: "social_security",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_agency_statistic",
      source_ids: ["CC-SRC-068"],
      opposing_evidence: ["Enrollment and dual SSI overlap can shift counts slightly over the year."],
      uncertainty: "Supports scale of Social Security as central foundation; not a claim about average benefit adequacy.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2026",
      doctrine_ids: ["CC-DEV-250", "CC-DEV-251"],
      public_wording:
        "SSA reports nearly 71 million Social Security beneficiaries receiving the 2026 COLA beginning in January.",
    },
    {
      claim_id: "CC-CLAIM-120",
      claim_text:
        "According to SSA’s Primary Insurance Amount formula for 2026 eligibility, benefits are computed with progressive bend-point factors of 90%, 32%, and 15% across segments of average indexed monthly earnings, so lower AIME segments receive a higher replacement share than higher segments.",
      chapter_ids: [],
      claim_type: "social_security",
      claim_class: "descriptive_program",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-072"],
      opposing_evidence: [
        "Higher earners still receive higher absolute benefits; progressivity is about replacement rates, not benefit levels.",
      ],
      uncertainty: "Do not invent career replacement-rate percentages beyond the formula structure without additional sources.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2026_formula",
      doctrine_ids: ["CC-DEV-251", "CC-DEV-252"],
      public_wording:
        "SSA’s PIA formula is progressive: lower average indexed earnings are replaced at higher percentage rates than higher earnings.",
    },
    {
      claim_id: "CC-CLAIM-121",
      claim_text:
        "According to the 2026 Social Security Trustees Report Summary, the OASI Trust Fund can pay 100% of scheduled benefits until the fourth quarter of 2032; after reserve depletion, continuing program income is projected to pay about 78% of scheduled benefits under intermediate assumptions unless Congress acts.",
      chapter_ids: [],
      claim_type: "social_security_financing",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_trustees_projection",
      source_ids: ["CC-SRC-069"],
      opposing_evidence: [
        "Combined OASDI depletion and payable percentages differ (e.g., 2034 / 83% in the same report family).",
      ],
      uncertainty: "Annual revisions; use OASI-specific wording for the 2032/78% claim.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2026_trustees_intermediate",
      doctrine_ids: ["CC-DEV-251", "CC-DEV-252"],
      public_wording:
        "2026 Trustees project OASI can pay full scheduled benefits until late 2032; thereafter about 78% from continuing income unless Congress acts.",
    },
    {
      claim_id: "CC-CLAIM-122",
      claim_text:
        "According to GAO (GAO-23-105342), about one in ten low-income households ages 51–64 had a retirement account balance in 2019, compared with about nine in ten high-income households.",
      chapter_ids: [],
      claim_type: "retirement_accounts",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_gao_analysis",
      source_ids: ["CC-SRC-070"],
      opposing_evidence: [
        "Other wealth forms (home equity, pensions) are outside the retirement-account measure.",
      ],
      uncertainty: "SCF-based; ages 51–64; income group definitions as in GAO report.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2019",
      doctrine_ids: ["CC-DEV-253", "CC-DEV-254"],
      public_wording:
        "GAO found only about one in ten low-income households approaching retirement had a retirement account in 2019, versus about nine in ten high-income households.",
    },
    {
      claim_id: "CC-CLAIM-123",
      claim_text:
        "According to the IRS, an employee stock ownership plan (ESOP) is a qualified defined contribution plan that must be designed to invest primarily in qualifying employer securities.",
      chapter_ids: [],
      claim_type: "employee_ownership",
      claim_class: "descriptive_program",
      importance: "medium",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-071"],
      opposing_evidence: [
        "ESOPs can still broaden ownership; the limitation is concentration risk, not that ESOPs lack value.",
      ],
      uncertainty: "Supports diversification-safeguard framing for national citizen accounts.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-254"],
      public_wording:
        "IRS defines ESOPs as plans designed primarily to hold employer stock — useful ownership tools that still require diversification safeguards for a national account.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

{
  const core = read("data/project/civilizational_core.json");
  if (!core.prosperous_aging_spine) {
    core.prosperous_aging_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major national pillar: Prosperous Aging / Shared Prosperity Retirement — protect Social Security as permanent floor; add ownership, community dividends, and retirement essentials above it.",
      governing_principle:
        "A lifetime of work, caregiving, military service, civic participation, entrepreneurship, and community contribution should produce more than subsistence in old age.",
      public_promise:
        "No earned Social Security benefit will be taken away. Current retirees and people nearing retirement remain fully protected.",
      vision: "Social Security keeps you from falling. Constitutional Capitalism helps you continue rising.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-PROSPEROUS-AGING",
      framework_file: "data/project/prosperous_aging_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: [
        "CC-CLAIM-119",
        "CC-CLAIM-120",
        "CC-CLAIM-121",
        "CC-CLAIM-122",
        "CC-CLAIM-123",
      ],
      links_to: [
        "health_human_capacity_spine",
        "energy_sovereignty_spine",
        "civic_wealth_spine",
        "resource_sovereignty",
        "assistance_spine",
        "family_spine",
        "human_capital_doctrine",
        "essential_systems",
      ],
      note: "Architecture only — contribution formulas and trust parameters require modeling; SSA/GAO/IRS baselines sourced; legal 0%. Architecture ≠ evidence that Citizen Ownership Accounts or Community Prosperity Trusts already exist.",
    };
  }
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-PROSPEROUS-AGING")) {
    const healthIdx = tree.findIndex((n) => n.node_id === "CC-WEB-HEALTHCARE");
    const node = {
      node_id: "CC-WEB-PROSPEROUS-AGING",
      title: "Prosperous Aging System",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-087", "CC-DEC-086", "CC-DEC-085"],
      path: "/prosperous-aging/",
      central_promise:
        "No earned Social Security benefit will be taken away. Current retirees and people nearing retirement remain fully protected. Constitutional Capitalism adds ownership, healthcare security, housing stability, transportation, energy affordability, and community dividends so retirement becomes security and participation—not mere survival.",
      iconic_phrase:
        "Social Security keeps you from falling. Constitutional Capitalism helps you continue rising.",
      branches: [
        "Protect Social Security first",
        "Social Security Guarantee",
        "National Citizen Ownership Account",
        "Community Prosperity Trusts",
        "Retirement Essentials",
        "Local Aging and Family Care Networks",
        "Caregiving as productive contribution",
        "Corporate prosperity contributions",
        "Thirty-year transition",
        "Retirement Security Covenant",
        "Keep from falling, continue rising",
      ],
      framework_file: "data/project/prosperous_aging_framework.json",
      research_domain_title:
        "Shared Prosperity Retirement, Social Security Floor, and Local Aging Networks",
    };
    if (healthIdx >= 0) tree.splice(healthIdx + 1, 0, node);
    else tree.push(node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/prosperous_aging_framework.json";
  if (!sm.related_framework_files.includes(f)) {
    const idx = sm.related_framework_files.indexOf(
      "data/project/health_human_capacity_framework.json"
    );
    if (idx >= 0) sm.related_framework_files.splice(idx + 1, 0, f);
    else sm.related_framework_files.push(f);
  }
  write("data/project/systems_map.json", sm);
}

{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/health_human_capacity_framework.json','schemas/health_human_capacity_framework.schema.json'],";
  const insert =
    "['data/project/health_human_capacity_framework.json','schemas/health_human_capacity_framework.schema.json'],\n  ['data/project/prosperous_aging_framework.json','schemas/prosperous_aging_framework.schema.json'],";
  if (!text.includes("prosperous_aging_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Prosperous Aging System registry bootstrap complete.");
