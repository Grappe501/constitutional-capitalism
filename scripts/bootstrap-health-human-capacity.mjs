/**
 * One-shot registry bootstrap for Health, Human Capacity, and Community Care.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_health_human_capacity_community_care";
const DECISION = "CC-DEC-087";
const PRINCIPLE = "CC-PRIN-42";
const COMMON_CONFLICTS = [
  "employer-tied essential coverage as the only foundation",
  "volume-only rural hospital survival",
  "value-based penalties that abandon hard communities",
  "political favor distribution of rural health funds",
  "treating financing formulas as locked without modeling",
];
const COMMON_RESEARCH = [
  "Health and Human Capacity Contribution fiscal modeling",
  "Community Health Readiness Budget cost modeling by region",
  "Primary and Preventive Care Floor percentage design",
  "Rural Health Equity Formula weights and minimum capacity payments",
  "legal drafting for universal foundation and insurance/pharma rules",
];

const statements = [
  [
    229,
    "proposed_foundational_principle",
    true,
    "Health, Human Capacity, and Community Care: Every person must have reliable access to essential healthcare because a healthy population is foundational to liberty, productivity, family stability, community prosperity, and national strength. The system should reward keeping people healthy, restoring them quickly when sick, and delivering care as close to home as safely possible.",
  ],
  [
    230,
    "proposed",
    false,
    "Problem diagnosis: the present structure often pays most reliably for billable illness transactions, while rural communities need financing for permanent capacity. Volume-based incentives are especially damaging where population cannot generate urban-level admissions. The system finances transactions; rural communities need capacity.",
  ],
  [
    231,
    "proposed",
    false,
    "Universal essential-health foundation: a clearly defined essential package follows the person — not lost because of job change, entrepreneurship, moves, temporary unemployment, reduced hours, leaving military service, retirement, or return from incarceration. Guiding rule: Basic health security follows the person. Supplemental choice may follow the market. Private insurance may remain for networks, amenities, electives, and supplements.",
  ],
  [
    232,
    "proposed_design_agenda",
    false,
    "Shared Health and Human Capacity Contribution: finance the essential system through broad, progressive, portable, transparent sources independent of a single employer — not premiums that punish hiring or wages. Exact formula requires economic modeling. Individuals may still pay reasonable income-adjusted contributions or cost sharing for some services.",
  ],
  [
    233,
    "proposed",
    false,
    "Community Health Readiness Budgets: pay rural health regions for the capacity they must maintain — 24-hour emergency readiness, EMS, stabilization, maternal care where needed, lab/imaging, pharmacy, telehealth, mental-health crisis response, disaster preparedness, rotating specialists, and community health workers — like funding a fire department rather than billing only for fires. Expand beyond CAH/REH into a complete rural-capacity model.",
  ],
  [
    234,
    "proposed",
    false,
    "Rural Health Equity Formula: distribute funds by need (population, age, poverty, chronic-disease burden, travel time, shortages, maternal access, emergency response, uninsured/underinsured, hospital vulnerability, disability, transportation, isolation) with a minimum community capacity payment. Equal citizenship does not always require identical spending; it requires enough capacity for a comparable basic standard of care.",
  ],
  [
    235,
    "proposed",
    false,
    "Primary and Preventive Care Floor: redirect a larger share of funding to family medicine, pediatrics, maternal care, dental, behavioral health, nutrition, community health workers, home visits, and chronic-disease management. Arkansas should protect a defined portion of Medicaid, public-employee, and regulated commercial spending for primary care and prevention — percentage requires modeling. Every resident should have a primary-care home and preventive support.",
  ],
  [
    236,
    "proposed",
    false,
    "Pay for outcomes without abandoning difficult communities: value-based payments must risk-adjust for poverty, rurality, housing instability, transportation, food access, disability, and provider scarcity. Reward improvements in chronic control, avoidable hospitalizations, maternal outcomes, addiction recovery, and childhood health — without punishing providers merely for serving inherited disadvantage.",
  ],
  [
    237,
    "proposed",
    false,
    "Community Health Network: every person needs a reliable network even if every town lacks a full traditional hospital — local health station → primary-care hub → mobile clinics/home visits → telehealth and rotating specialists → regional emergency/diagnostic center → full-service referral hospital. Transportation between levels is part of the healthcare system.",
  ],
  [
    238,
    "proposed",
    false,
    "Build the rural workforce locally: academy pathways beginning in local schools for nurses, physicians, paramedics, therapists, dental and behavioral-health professionals, pharmacists, technicians, community health workers, and administrators. Publicly funded professional education may be debt-free in exchange for defined underserved service — a coordinated pipeline, not scattered small programs.",
  ],
  [
    239,
    "proposed",
    false,
    "Healthcare as a local economic engine: a stable health network creates skilled jobs, purchasing power, workforce reliability, healthier children, support for aging residents, business recruitment, and emergency readiness — a central anchor for small-town implementation plans.",
  ],
  [
    240,
    "proposed",
    false,
    "Pharmaceutical reform: preserve innovation while requiring cost disclosure, recognition of taxpayer-funded research, negotiated public purchasing, limits on anti-competitive patent extensions, faster lawful generic/biosimilar competition, outcome-based pricing for very expensive treatments, public or nonprofit production where essential generic markets fail, and a national essential-medicines reserve. Where public research materially creates a drug, the public should receive reasonable pricing, licensing rights, royalties, equity, or guaranteed access.",
  ],
  [
    241,
    "proposed",
    false,
    "Insurance reform: return insurance to pooling unpredictable risk. Require standardized plain-language plans, transparent denial rates, rapid independent appeals, public administrative-cost ratios, continuity during serious treatment, restrictions on excessive vertical integration, and public reporting by county and income. No insurer should earn more simply because patients cannot navigate the system.",
  ],
  [
    242,
    "proposed_design_agenda",
    false,
    "State Health Prosperity Fund: a protected Arkansas fund for rural and underserved health capacity, financed from healthcare funds, sector assessments, settlements, resource-impact and health-impact charges, energy-export public revenue, recovered fraud, and administrative savings. Distribution follows the published rural-equity formula and appears in the People’s Ledger — not political favors.",
  ],
  [
    243,
    "proposed",
    false,
    "Prevention Dividend: when a region reduces avoidable costs while maintaining quality, part of verified savings returns to that region for parks, trails, healthy food, school nutrition, home repairs, maternal support, addiction recovery, fitness, and senior wellness. Communities should share financially when they become healthier.",
  ],
  [
    244,
    "proposed",
    false,
    "Public health accountability: every county and health region publishes a dashboard covering life expectancy, maternal/infant outcomes, primary-care access, vacancies, emergency response, hospital stability, preventable admissions, behavioral health and addiction outcomes, uninsured rates, healthcare debt, spending, insurer performance, and satisfaction. Private patient information remains protected; system performance does not.",
  ],
  [
    245,
    "proposed",
    false,
    "Constitutional division of health responsibility: local/regional governments handle community planning, prevention, facilities, transportation, food/environmental health, accountability, and workforce partnerships; states handle equitable funding, licensing, Medicaid, rural workforce strategy, insurance regulation, data, and network planning; the federal government handles universal baseline financing, Medicare, interstate insurance and pharmaceutical regulation, drug negotiation/competition, research, civil-rights protections, epidemic response, and support for regions unable to maintain essential capacity alone.",
  ],
  [
    246,
    "proposed_foundational_principle",
    true,
    "Governing doctrine: Healthcare is a shared foundation of freedom and prosperity. The republic shall guarantee access to essential care, finance rural readiness rather than illness volume alone, reward prevention and restoration, protect medical choice and innovation, and distribute resources according to human need rather than geographic profitability.",
  ],
  [
    247,
    "proposed",
    false,
    "Public promise: No Arkansan should be condemned to poorer health because of their ZIP code, income, employment status, or distance from a major hospital. We will fund the capacity to keep communities healthy—not merely the transactions generated after people become sick.",
  ],
  [
    248,
    "proposed",
    false,
    "Implementation rule: test the Constitutional Health System regionally before statewide restructuring, with clearly defined costs, outcomes, failure triggers, and independent evaluation. Financing formulas and floor percentages remain design parameters until modeled.",
  ],
];

// --- developing_doctrine ---
{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Health, Human Capacity")) {
    dd.note = dd.note.replace(
      "Includes Energy Sovereignty",
      "Includes Health / Human Capacity / Community Care (CC-PRIN-42), Energy Sovereignty"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-27")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-27",
      title: "Health, Human Capacity, and Community Care",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_cms_hrsa_cdc_achi_baselines",
      affected_domains: [
        "healthcare",
        "rural_health",
        "primary_care",
        "prevention",
        "insurance",
        "pharmaceuticals",
        "human_capital",
        "community_capacity",
      ],
      constitutional_questions: [
        "How does a republic guarantee essential health security that follows the person without nationalizing every clinic?",
        "How should rural readiness capacity be financed when billing volume cannot sustain it?",
        "How can value-based payment reward improvement without abandoning poorer, older, or sicker communities?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local", "regional"],
      risks: [
        "treating contribution formulas or care-floor percentages as locked law before modeling",
        "conflating CMS/HRSA/CDC/ACHI baselines with proof that the Constitutional Health System already exists",
        "political capture of State Health Prosperity Fund distributions",
        "outcome metrics that punish providers for inherited community disadvantage",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-42; CMS/HRSA/CDC/ACHI baselines sourced; financing formulas require modeling; legal 0%.",
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
      implications: n === 229 ? [PRINCIPLE] : ["health_human_capacity"],
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

// --- principles ---
{
  const pr = read("data/project/principles.json");
  if (!pr.some((p) => p.id === PRINCIPLE)) {
    pr.push({
      id: PRINCIPLE,
      title: "Health, Human Capacity, and Community Care",
      statement:
        "Every person must have reliable access to essential healthcare because a healthy population is foundational to liberty, productivity, family stability, community prosperity, and national strength. The system should reward keeping people healthy, restoring them quickly when sick, and delivering care as close to home as safely possible.",
      text:
        "Every person must have reliable access to essential healthcare because a healthy population is foundational to liberty, productivity, family stability, community prosperity, and national strength. The system should reward keeping people healthy, restoring them quickly when sick, and delivering care as close to home as safely possible.",
      explanation:
        "Major national and Arkansas-ready doctrine treating healthcare as human-capital infrastructure. Five financial layers: universal essential foundation; shared Health and Human Capacity Contribution; Community Health Readiness Budgets; Primary and Preventive Care Floor; risk-adjusted outcomes without abandoning hard communities. Rural Health Equity Formula, Community Health Network, local workforce pipeline, State Health Prosperity Fund, Prevention Dividend, pharmaceutical and insurance reform, public dashboards. Complements Essential Systems. Architecture only; CMS/HRSA/CDC/ACHI baselines sourced; financing formulas and legal drafting remain 0%.",
      protects: [
        "portable essential health security",
        "rural readiness capacity independent of illness volume alone",
        "primary and preventive care as front-door investment",
        "fair outcome measurement for disadvantaged communities",
      ],
      prohibits: [
        "essential care lost solely because of job change or temporary unemployment",
        "financing rural hospitals only through billable illness volume",
        "political favor distribution of rural health capacity funds",
        "value-based punishments that abandon hard communities",
      ],
      implications: [
        "Constitutional Health System architecture",
        "links Essential Systems, Human Capital, Assistance, Family, Food Security, Energy Sovereignty",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What Health and Human Capacity Contribution formula is fiscally stable and progressive?",
        "What Primary and Preventive Care Floor percentage survives modeling across Medicaid and commercial markets?",
        "What Rural Health Equity Formula weights and minimum capacity payments are measurable without inventing county ratios?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/health_human_capacity_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

// --- decisions ---
{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Health, Human Capacity, and Community Care",
      question:
        "Should Constitutional Capitalism adopt Health, Human Capacity, and Community Care as a major dedicated domain (CC-PRIN-42, CC-DEV-229–248, CC-DCC-27) — healthcare as human-capital infrastructure; universal essential foundation following the person; shared Health and Human Capacity Contribution; Community Health Readiness Budgets; Rural Health Equity Formula; Primary and Preventive Care Floor; risk-adjusted outcomes without abandoning hard communities; Community Health Network; rural workforce pipeline; pharmaceutical and insurance reform; State Health Prosperity Fund; Prevention Dividend; public dashboards; local/state/federal division; and regional pilots before statewide restructuring — while registering sourced CMS/HRSA/CDC/ACHI baselines without claiming the Constitutional Health System already exists?",
      status: "approved",
      rationale:
        "A healthy population is foundational to liberty, productivity, family stability, community prosperity, and national strength. The present structure often finances illness transactions while rural communities need permanent capacity. Government need not own every clinic or eliminate private insurance; it must establish a universal foundation, align incentives, and ensure rural and low-income communities are not punished for being smaller, older, sicker, or less profitable.",
      impact: [
        PRINCIPLE,
        "CC-DEV-229–248",
        "capture_cluster CC-DCC-27",
        "health_human_capacity_framework",
        "sources CC-SRC-062–067",
        "claims CC-CLAIM-113–118",
        "book/board health surfaces",
        "seeded IA node CC-WEB-HEALTHCARE",
      ],
      recommendation:
        "Adopt as major pillar architecture. Label contribution formulas, readiness budgets, and Primary Care Floor percentages as design parameters requiring modeling. Do not invent Arkansas physician ratios or fund balances without sourced text. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86. Complements Essential Systems rather than replacing its banking/insurance/pharma method.",
      approved_by: "Steve",
      decided_at: "2026-08-05",
      supersedes: null,
    });
  }
  write("data/decisions/decisions.json", dec);
}

// --- updates ---
{
  const up = read("data/project/updates.json");
  up.last_updated = "2026-08-05";
  if (!up.updates.some((u) => u.id === "UPD-038")) {
    up.updates.push({
      id: "UPD-038",
      date: "2026-08-05",
      title: "Health, Human Capacity, and Community Care",
      summary:
        "Adopts CC-PRIN-42 / CC-DEC-087: major healthcare doctrine as human-capital infrastructure — universal essential foundation following the person; shared Health and Human Capacity Contribution; Community Health Readiness Budgets; Rural Health Equity Formula; Primary and Preventive Care Floor; risk-adjusted outcomes; Community Health Network; rural workforce pipeline; State Health Prosperity Fund; Prevention Dividend; pharma and insurance reform. Sourced CMS/HRSA/CDC/ACHI baselines. Architecture only; financing formulas and legal remain 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

// --- sources ---
{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Health")) {
    src.note = src.note.replace(
      "and Energy Sovereignty EIA/DOE structural baselines",
      "Energy Sovereignty EIA/DOE structural baselines, and Health/CMS/HRSA/CDC/ACHI structural baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-062",
      title: "CMS' Value-Based Programs",
      authors: ["Centers for Medicare & Medicaid Services"],
      year: 2026,
      url: "https://www.cms.gov/medicare/quality/value-based-programs",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "healthcare_payment",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "CMS describes value-based programs that reward health care providers with incentive payments for the quality of care they give to people with Medicare, as part of reforming how care is delivered and paid for.",
      key_findings: [
        "Value-based programs reward quality of care for Medicare beneficiaries with incentive payments",
        "Programs are part of CMS quality strategy to reform delivery and payment",
      ],
      limitations:
        "Does not by itself quantify how complete the national transition from volume-based payment is.",
      ideological_or_institutional_considerations: "Official federal agency program page.",
      verification_status: "url_verified",
      notes: "Supports incomplete transition context; not proof that Constitutional Health System institutions exist.",
    },
    {
      source_id: "CC-SRC-063",
      title: "Rural Hospital Programs",
      authors: ["Health Resources and Services Administration"],
      year: 2026,
      url: "https://www.hrsa.gov/rural-health/grants/rural-hospitals",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "rural_health",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "HRSA rural hospital programs page states that between 2010 and 2025, 152 rural hospitals closed, of which 52 were Critical Access Hospitals.",
      key_findings: [
        "152 rural hospitals closed between 2010 and 2025",
        "52 of those closures were Critical Access Hospitals",
      ],
      limitations:
        "Closure definitions and inclusion of conversions can differ across trackers (e.g., Chartis reports higher totals).",
      ideological_or_institutional_considerations: "Official federal rural health agency page.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Direct fetch blocked from this environment; wording confirmed via search excerpt of HRSA page.",
    },
    {
      source_id: "CC-SRC-064",
      title: "Fast Facts: Health and Economic Costs of Chronic Conditions",
      authors: ["Centers for Disease Control and Prevention"],
      year: 2026,
      url: "https://www.cdc.gov/chronic-disease/data-research/facts-stats/index.html",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "chronic_disease_economics",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "CDC states that ninety percent of the nation’s $5.3 trillion in annual health care expenditures are for people with chronic and mental health conditions.",
      key_findings: [
        "90% of $5.3T annual health care expenditures are for people with chronic and mental health conditions",
      ],
      limitations:
        "Wording covers spending for people who have those conditions — not that 90% of spending is solely treatment of those conditions.",
      ideological_or_institutional_considerations: "Official CDC chronic-disease facts page.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Page is JS-rendered; wording confirmed via search excerpt. Do not paraphrase as ‘90% treats chronic disease.’",
    },
    {
      source_id: "CC-SRC-065",
      title: "Report Assesses Access to Primary Care in Arkansas",
      authors: ["Arkansas Center for Health Improvement"],
      year: 2026,
      url: "https://achi.net/newsroom/report-assesses-access-to-primary-care-in-arkansas/",
      source_type: "state_policy_analysis",
      reliability: "reputable_secondary",
      primary_or_secondary: "secondary",
      jurisdiction: "AR",
      research_domain: "primary_care_access",
      publication_date: "2026-03",
      retrieval_date: "2026-08-05",
      summary:
        "ACHI summarizes Milbank Memorial Fund findings: 18% of Arkansas adults report not having a usual source of care (nearly 1 in 5), comparable to a national estimate of 17%.",
      key_findings: [
        "18% of Arkansas adults report not having a usual source of care",
        "Nearly 1 in 5 Arkansans lack a usual source of care",
        "National estimate cited as 17%",
      ],
      limitations:
        "Secondary summary of Milbank report; definitions of usual source of care are survey-based.",
      ideological_or_institutional_considerations:
        "Arkansas Center for Health Improvement policy communication.",
      verification_status: "url_verified",
      notes: "Supports Arkansas primary-care access diagnosis; not proof of CC institutions.",
    },
    {
      source_id: "CC-SRC-066",
      title: "Critical Access Hospitals",
      authors: ["Centers for Medicare & Medicaid Services"],
      year: 2026,
      url: "https://www.cms.gov/medicare/health-safety-standards/certification-compliance/critical-access-hospitals",
      source_type: "federal_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "rural_health_payment",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "CMS describes Critical Access Hospitals as a separate Medicare provider type with distinct Conditions of Participation and payment method, and links Rural Emergency Hospitals as a related rural facility model.",
      key_findings: [
        "CAHs are a separate Medicare provider type with distinct CoPs and payment method",
        "CMS maintains a Rural Emergency Hospitals certification pathway alongside CAHs",
      ],
      limitations:
        "Describes existing federal models; does not establish a complete Community Health Readiness Budget system.",
      ideological_or_institutional_considerations: "Official CMS certification page.",
      verification_status: "url_verified",
      notes: "Supports descriptive baseline that distinct rural payment models already exist.",
    },
    {
      source_id: "CC-SRC-067",
      title: "Student Loan Repayment & Scholarship Programs",
      authors: ["Arkansas Department of Health"],
      year: 2026,
      url: "https://healthy.arkansas.gov/programs-services/prevention-healthy-living/rural-health-primary-care/primary-care-office-pco/loans-scholarships-schools-jobs/",
      source_type: "state_agency",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "AR",
      research_domain: "healthcare_workforce",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "ADH Primary Care Office page on student loan repayment and scholarship programs notes HRSA and VA initiatives that reduce financial barriers for health professionals while addressing workforce shortages in underserved communities.",
      key_findings: [
        "ADH publishes loan repayment and scholarship program information for healthcare workforce",
        "Programs aim to reduce financial barriers and improve access in underserved communities",
      ],
      limitations:
        "Program catalog page; does not quantify Arkansas placement outcomes for this claim.",
      ideological_or_institutional_considerations: "Official Arkansas Department of Health page.",
      verification_status: "url_verified",
      notes: "Supports existing pipeline fragments; CC proposes coordination into a full rural academy pipeline.",
    },
  ];
  for (const s of sources) {
    if (!src.sources.some((x) => x.source_id === s.source_id)) src.sources.push(s);
  }
  write("data/research/source_registry.json", src);
}

// --- claims ---
{
  const cl = read("data/research/claim_ledger.json");
  cl.last_updated = "2026-08-05";
  const claims = [
    {
      claim_id: "CC-CLAIM-113",
      claim_text:
        "CMS operates value-based programs that reward health care providers with incentive payments for the quality of care they give to people with Medicare as part of reforming how care is delivered and paid for.",
      chapter_ids: [],
      claim_type: "healthcare",
      claim_class: "descriptive_program",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-062"],
      opposing_evidence: [
        "Program existence does not prove the national transition from volume incentives is complete.",
      ],
      uncertainty:
        "Supports incomplete-transition framing only as normative context, not as a quantified share of payments.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-230", "CC-DEV-236"],
      public_wording:
        "CMS describes value-based programs rewarding Medicare quality; the broader shift from volume remains incomplete as a design problem.",
    },
    {
      claim_id: "CC-CLAIM-114",
      claim_text:
        "According to HRSA, between 2010 and 2025, 152 rural hospitals closed; of these, 52 were Critical Access Hospitals.",
      chapter_ids: [],
      claim_type: "rural_health",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_agency_statistic",
      source_ids: ["CC-SRC-063"],
      opposing_evidence: [
        "Some independent trackers report higher totals depending on how conversions and inpatient discontinuations are counted.",
      ],
      uncertainty: "Use HRSA wording; note definitional variation across trackers.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2010_to_2025",
      doctrine_ids: ["CC-DEV-230", "CC-DEV-233"],
      public_wording:
        "HRSA reports 152 rural hospital closures between 2010 and 2025, including 52 Critical Access Hospitals.",
    },
    {
      claim_id: "CC-CLAIM-115",
      claim_text:
        "According to CDC, ninety percent of the nation’s $5.3 trillion in annual health care expenditures are for people with chronic and mental health conditions.",
      chapter_ids: [],
      claim_type: "healthcare",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_agency_statistic",
      source_ids: ["CC-SRC-064"],
      opposing_evidence: [
        "Paraphrases that claim 90% of spending ‘treats chronic disease’ overstate the CDC wording, which covers spending for people who have those conditions.",
      ],
      uncertainty:
        "Does not mean all such spending is preventable; supports prevention as a central financial strategy.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-235", "CC-DEV-243"],
      public_wording:
        "CDC reports that 90% of the nation’s $5.3 trillion in annual health care spending is for people with chronic and mental health conditions — not that 90% is solely disease treatment.",
    },
    {
      claim_id: "CC-CLAIM-116",
      claim_text:
        "According to ACHI, citing Milbank Memorial Fund analysis, 18% of Arkansas adults report not having a usual source of care — nearly 1 in 5 Arkansans.",
      chapter_ids: [],
      claim_type: "primary_care_access",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "moderate",
      consensus_status: "state_policy_secondary_of_milbank",
      source_ids: ["CC-SRC-065"],
      opposing_evidence: [
        "Usual-source-of-care measures are survey-based and may differ by definition and year.",
      ],
      uncertainty: "Secondary ACHI summary of Milbank findings; national comparator cited as 17%.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "AR",
      temporal_scope: "Milbank_2026_summary",
      doctrine_ids: ["CC-DEV-235", "CC-DEV-247"],
      public_wording:
        "ACHI reports that 18% of Arkansas adults — nearly 1 in 5 — lack a usual source of care.",
    },
    {
      claim_id: "CC-CLAIM-117",
      claim_text:
        "CMS maintains distinct Critical Access Hospital and Rural Emergency Hospital frameworks for rural facility certification and payment.",
      chapter_ids: [],
      claim_type: "rural_health",
      claim_class: "descriptive_program",
      importance: "medium",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-066"],
      opposing_evidence: [
        "Existing models do not by themselves constitute a complete Community Health Readiness Budget system.",
      ],
      uncertainty: "Descriptive baseline for expanding rural-capacity financing concepts.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-233"],
      public_wording:
        "CMS already operates distinct Critical Access Hospital and Rural Emergency Hospital models; CC proposes expanding readiness financing beyond those fragments.",
    },
    {
      claim_id: "CC-CLAIM-118",
      claim_text:
        "Arkansas Department of Health’s Primary Care Office publishes student loan repayment and scholarship program information, including HRSA and VA initiatives that aim to reduce financial barriers for health professionals serving underserved communities.",
      chapter_ids: [],
      claim_type: "healthcare_workforce",
      claim_class: "descriptive_program",
      importance: "medium",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-067"],
      opposing_evidence: [
        "Publishing programs is not the same as a coordinated K–12-to-practice rural academy pipeline.",
      ],
      uncertainty: "Supports existence of program fragments, not outcome magnitudes.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "AR",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-238"],
      public_wording:
        "ADH already lists loan repayment and scholarship pathways for underserved service; CC would coordinate them into a full rural workforce pipeline.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

// --- civilizational_core ---
{
  const core = read("data/project/civilizational_core.json");
  if (!core.health_human_capacity_spine) {
    core.health_human_capacity_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major national and Arkansas-ready pillar: healthcare as human-capital infrastructure — portable essential foundation, rural readiness financing, prevention floors, and fair outcomes.",
      governing_principle:
        "Every person must have reliable access to essential healthcare because a healthy population is foundational to liberty, productivity, family stability, community prosperity, and national strength. The system should reward keeping people healthy, restoring them quickly when sick, and delivering care as close to home as safely possible.",
      public_promise:
        "No Arkansan should be condemned to poorer health because of their ZIP code, income, employment status, or distance from a major hospital. We will fund the capacity to keep communities healthy—not merely the transactions generated after people become sick.",
      guiding_rule: "Basic health security follows the person. Supplemental choice may follow the market.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-HEALTHCARE",
      framework_file: "data/project/health_human_capacity_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: [
        "CC-CLAIM-113",
        "CC-CLAIM-114",
        "CC-CLAIM-115",
        "CC-CLAIM-116",
        "CC-CLAIM-117",
        "CC-CLAIM-118",
      ],
      links_to: [
        "essential_systems",
        "human_capital_doctrine",
        "assistance_spine",
        "family_spine",
        "community_food_security",
        "energy_sovereignty_spine",
        "resource_sovereignty",
        "transparency_framework",
        "federalism_spine",
      ],
      note: "Architecture only — financing formulas, readiness budgets, and Primary Care Floor percentages require modeling; CMS/HRSA/CDC/ACHI baselines sourced; legal 0%. Architecture ≠ evidence that Constitutional Health System institutions already exist.",
    };
  }
  write("data/project/civilizational_core.json", core);
}

// --- website IA ---
{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || ia.nodes || [];
  const health = tree.find((n) => n.node_id === "CC-WEB-HEALTHCARE");
  if (health) {
    Object.assign(health, {
      node_id: "CC-WEB-HEALTHCARE",
      title: "Health, Human Capacity, and Community Care",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-053", "CC-DEC-052"],
      path: "/health/",
      central_promise:
        "No Arkansan should be condemned to poorer health because of their ZIP code, income, employment status, or distance from a major hospital. We will fund the capacity to keep communities healthy—not merely the transactions generated after people become sick.",
      iconic_phrase: "Basic health security follows the person. Supplemental choice may follow the market.",
      branches: [
        "Healthcare as human-capital infrastructure",
        "Universal essential-health foundation",
        "Health and Human Capacity Contribution",
        "Community Health Readiness Budgets",
        "Rural Health Equity Formula",
        "Primary and Preventive Care Floor",
        "Risk-adjusted outcomes",
        "Community Health Network",
        "Rural workforce pipeline",
        "Pharmaceutical reform",
        "Insurance as risk pooling",
        "State Health Prosperity Fund",
        "Prevention Dividend",
        "Public health dashboards",
      ],
      framework_file: "data/project/health_human_capacity_framework.json",
      research_domain_title:
        "Constitutional Health System, Rural Capacity Financing, and Prevention Dividends",
    });
    delete health.note;
  }
  const essential = tree.find((n) => n.node_id === "CC-WEB-ESSENTIAL");
  if (essential?.supersedes_nodes) {
    essential.supersedes_nodes = essential.supersedes_nodes.filter(
      (id) => id !== "CC-WEB-HEALTHCARE"
    );
    if (essential.supersedes_nodes.length === 0) delete essential.supersedes_nodes;
    essential.related_decision_ids = Array.from(
      new Set([...(essential.related_decision_ids || []), DECISION])
    );
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

// --- systems_map ---
{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/health_human_capacity_framework.json";
  if (!sm.related_framework_files.includes(f)) {
    const idx = sm.related_framework_files.indexOf(
      "data/project/energy_sovereignty_framework.json"
    );
    if (idx >= 0) sm.related_framework_files.splice(idx + 1, 0, f);
    else sm.related_framework_files.push(f);
  }
  write("data/project/systems_map.json", sm);
}

// --- validate-project-data pair ---
{
  const vp = path.join(root, "scripts/validate-project-data.mjs");
  let text = fs.readFileSync(vp, "utf8");
  const needle =
    "['data/project/energy_sovereignty_framework.json','schemas/energy_sovereignty_framework.schema.json'],";
  const insert =
    "['data/project/energy_sovereignty_framework.json','schemas/energy_sovereignty_framework.schema.json'],\n  ['data/project/health_human_capacity_framework.json','schemas/health_human_capacity_framework.schema.json'],";
  if (!text.includes("health_human_capacity_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Health, Human Capacity, and Community Care registry bootstrap complete.");
