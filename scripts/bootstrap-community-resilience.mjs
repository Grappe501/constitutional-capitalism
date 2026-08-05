/**
 * One-shot registry bootstrap for Community Resilience System.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_community_resilience_system";
const DECISION = "CC-DEC-091";
const PRINCIPLE = "CC-PRIN-46";
const COMMON_CONFLICTS = [
  "treating fire/EMS/public health only as costs to minimize",
  "rewarding higher spending instead of measured resilience outcomes",
  "allowing volunteer emergency service to disappear without succession pathways",
  "siloing emergency response from healthcare and infrastructure",
  "treating Safety Dividend formulas as locked law before modeling",
];
const COMMON_RESEARCH = [
  "Community Safety Dividend outcome formulas",
  "Community Emergency Reserve sizing and governance",
  "volunteer equity-credit and benefit design",
  "insurance partnership / PPC-linked premium pilots",
  "legal drafting for regional mutual aid and reserve instruments",
];

const statements = [
  [309, "proposed_foundational_principle", true, "Community Resilience System: fire protection, EMS, emergency management, disaster preparedness, and public health are prosperity infrastructure and economic development assets — not merely government expenses to minimize. Safe communities are prosperous communities."],
  [310, "proposed", false, "Integrated Community Resilience System mission: protect life, reduce risk, strengthen resilience, and increase long-term community prosperity — integrating fire, EMS, emergency management, disaster recovery, search and rescue, public health preparedness, hazard mitigation, resilience planning, critical infrastructure protection, local-government cyber preparedness, and volunteer emergency organizations."],
  [311, "proposed", false, "Prosperity through lower risk: budget prevention by asking how much future loss is prevented — wildfire mitigation, flood control, storm shelters, resilient power and water, emergency communications, warning systems, disaster planning, and resilient building standards — not only how much a line item costs this year."],
  [312, "proposed_design_agenda", false, "Community Safety Dividend: communities with measurable improvements (insurance losses, EMS response, fire loss, disaster recovery costs, preventable deaths, cardiac survival, wildfire preparedness, infrastructure resilience, volunteer participation, mutual aid readiness) may receive additional prosperity-framework investment. Reward outcomes — not spending more. Formulas require modeling."],
  [313, "proposed", false, "Professional + volunteer partnership: volunteer emergency service is a recognized pathway to Community Equity Credits, education assistance, retirement contributions, training scholarships, healthcare supplements, leadership development, workforce priority, and housing assistance — addressing recruitment while recognizing public value created."],
  [314, "proposed_design_agenda", false, "Community Emergency Reserve: permanent regional resilience reserves grow in good years and stabilize bad years — funding equipment replacement, regional training, mutual aid gear, emergency communications, disaster supplies, temporary housing, recovery grants, and rapid infrastructure repair. Sizing requires modeling."],
  [315, "proposed", false, "Healthcare integration: emergency services and healthcare form one continuum — rural hospitals, clinics, mental health crisis response, mobile care, telemedicine, prevention, home health, addiction treatment, and public health education — measuring health outcomes and resilience, not spending alone."],
  [316, "proposed", false, "Insurance partnership: encourage lower premiums for communities achieving measurable resilience improvements (better fire/PPC ratings, flood mitigation, building standards, faster response, preparedness programs) so residents see tangible financial benefits from public-safety investment."],
  [317, "proposed", false, "Emergency services as economic development: beyond tax abatements, excellent EMS, fire protection, hospitals, communications, resilient infrastructure, trained volunteers, and rapid disaster recovery are competitive advantages — businesses value predictability and resilience."],
  [318, "proposed", false, "National service pathway: fire, EMS, and disaster response join military, teaching, healthcare, conservation, agriculture, infrastructure, and civic leadership as recognized public service with transparent eligibility for retirement contributions, education benefits, or community investment credits."],
  [319, "proposed", false, "Community Resilience Scorecard: annual public indicators including EMS response time, fire performance, cardiac survival, insurance risk ratings where available, disaster recovery time, volunteer participation, rural hospital and mental health access, preventive participation, infrastructure resilience, water reliability, power outage duration, emergency broadband reliability, and preparedness."],
  [320, "proposed", false, "Link to Constitutional Defense: local Community Resilience elaborates the national resilience / community-strength branch without militarizing domestic emergency services."],
  [321, "proposed", false, "Link to Health / Human Capacity: EMS–hospital–public health continuum aligns with Prevention Dividend and rural readiness without replacing the health-domain architecture."],
  [322, "proposed", false, "Link to Civic Wealth and Community Prosperity: volunteer and professional emergency service earn Community Equity Credits and shared-prosperity pathways under transparent rules — not political patronage."],
  [323, "proposed", false, "Link to Energy Sovereignty and essential systems: resilient power, water, and emergency communications are both resilience infrastructure and prosperity infrastructure."],
  [324, "proposed", false, "Implementation rule: pilot Community Safety Dividends, Emergency Reserves, and volunteer prosperity pathways regionally with published metrics, independent evaluation, and failure triggers. Architecture ≠ evidence that institutions already exist."],
  [325, "proposed", false, "Budget honesty: do not invent avoided-loss multipliers or claim every prevention dollar always saves a fixed multiple — use measured local baselines and evaluated pilots."],
  [326, "proposed_foundational_principle", true, "Compact language: safe communities are prosperous communities; treat fire, EMS, disaster preparedness, and public health as productive infrastructure supporting professional and volunteer responders, rewarding prevention and preparedness, and ensuring every community can protect people, attract investment, and recover quickly."],
  [327, "proposed", false, "Community wealth link: resilience lowers long-term costs, improves quality of life, increases business confidence, and makes places stronger to live, work, raise families, and retire."],
  [328, "proposed", false, "ISO/NFPA sourced baselines inform diagnosis: fire-protection quality is already priced into insurance markets via PPC-style ratings, and volunteer firefighter ranks have declined while call volume rose — architecture must strengthen both professional capacity and volunteer pathways."],
];

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Community Resilience System")) {
    dd.note = dd.note.replace(
      "Includes Community Prosperity Accounts (CC-PRIN-45)",
      "Includes Community Resilience System (CC-PRIN-46), Community Prosperity Accounts (CC-PRIN-45)"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-31")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-31",
      title: "Community Resilience System — Emergency Services as Prosperity Infrastructure",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_iso_ppc_and_nfpa_volunteer_baselines",
      affected_domains: [
        "fire_protection",
        "ems",
        "emergency_management",
        "public_health_preparedness",
        "disaster_recovery",
        "insurance",
        "rural_volunteer_service",
        "community_wealth",
      ],
      constitutional_questions: [
        "How should a republic budget emergency services as prosperity infrastructure without militarizing domestic response?",
        "How are volunteer emergency pathways tied to shared prosperity without patronage?",
        "How should Safety Dividends reward outcomes rather than spend?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local", "regional"],
      risks: [
        "spending-for-spend's-sake mistaken for resilience",
        "invented avoided-loss multipliers",
        "architecture surge mistaken for Phase 2 proof completion",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-46; ISO PPC and NFPA volunteer baselines sourced; dividend/reserve formulas require modeling; legal 0%.",
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
      implications: n === 309 ? [PRINCIPLE] : ["community_resilience"],
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
      title: "Community Resilience as Prosperity Infrastructure",
      statement:
        "Safe communities are prosperous communities. Fire protection, emergency medical services, disaster preparedness, and public health are foundational investments that protect lives, reduce economic risk, and strengthen local prosperity.",
      text:
        "Safe communities are prosperous communities. Fire protection, emergency medical services, disaster preparedness, and public health are foundational investments that protect lives, reduce economic risk, and strengthen local prosperity.",
      explanation:
        "Major dedicated architecture treating emergency services as productive infrastructure: integrated Community Resilience System, prevention-first budgeting, Community Safety Dividend for measured outcomes, professional–volunteer partnership with shared-prosperity pathways, Community Emergency Reserve, healthcare continuum, insurance partnership, service recognition, and annual Resilience Scorecard. ISO PPC and NFPA volunteer baselines sourced. Dividend/reserve formulas require modeling. Legal 0%.",
      protects: [
        "life and rapid emergency response capacity",
        "volunteer emergency service as valued public contribution",
        "prevention and hazard mitigation as prosperity investments",
        "transparent outcome-based resilience rewards",
      ],
      prohibits: [
        "treating fire/EMS/public health only as costs to minimize",
        "rewarding spend without outcome improvement",
        "letting rural volunteer capacity collapse without succession pathways",
        "inventing avoided-loss multipliers as locked fiscal facts",
      ],
      implications: [
        "Community Resilience System architecture",
        "links Constitutional Defense, Health, Civic Wealth, Community Prosperity, Energy",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What Safety Dividend formulas are fiscally sustainable by region?",
        "How large should Community Emergency Reserves be relative to local risk?",
        "What volunteer benefit packages raise recruitment without patronage?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/community_resilience_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Community Resilience System — Emergency Services as Prosperity Infrastructure",
      question:
        "Should Constitutional Capitalism adopt the Community Resilience System as a major doctrine (CC-PRIN-46, CC-DEV-309–328, CC-DCC-31) — treating fire, EMS, emergency management, and public health preparedness as prosperity infrastructure with integrated systems, prevention-first budgeting, Community Safety Dividends, volunteer prosperity pathways, Emergency Reserves, healthcare continuum, insurance partnership, service recognition, and Resilience Scorecards — while registering ISO PPC and NFPA volunteer baselines without locking dividend formulas or claiming institutions already exist?",
      status: "approved",
      rationale:
        "Emergency services enable investment, family residency, and insurance affordability. Current budgeting often treats them as costs to cut. An integrated resilience architecture aligns prevention, professional and volunteer capacity, healthcare, and insurance with community wealth creation. Complements Constitutional Defense and Health spines.",
      impact: [
        PRINCIPLE,
        "CC-DEV-309–328",
        "capture_cluster CC-DCC-31",
        "community_resilience_framework",
        "sources CC-SRC-077–078",
        "claims CC-CLAIM-129–130",
        "book/board community-resilience surfaces",
        "new IA node CC-WEB-COMMUNITY-RESILIENCE",
      ],
      recommendation:
        "Adopt as major pillar architecture. Label Safety Dividend and reserve sizes as design parameters requiring modeling. Do not invent avoided-loss multipliers. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86.",
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
  if (!up.updates.some((u) => u.id === "UPD-042")) {
    up.updates.push({
      id: "UPD-042",
      date: "2026-08-05",
      title: "Community Resilience System",
      summary:
        "Adopts CC-PRIN-46 / CC-DEC-091: emergency services as prosperity infrastructure — integrated Community Resilience System, prevention-first budgeting, Community Safety Dividend, volunteer prosperity pathways, Emergency Reserves, healthcare continuum, insurance partnership, service recognition, and Resilience Scorecard. Sourced ISO PPC and NFPA volunteer baselines. Architecture only; dividend/reserve formulas require modeling; legal 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Community Resilience")) {
    src.note = src.note.replace(
      "and Community Prosperity ICI/MSRB baselines",
      "Community Prosperity ICI/MSRB baselines, and Community Resilience ISO/NFPA baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-077",
      title: "ISO Public Protection Classification (PPC) Program",
      authors: ["ISO / Verisk Community Hazard Mitigation Services"],
      year: 2024,
      url: "https://www.isomitigation.com/ppc/",
      source_type: "industry_rating_program",
      reliability: "primary_program_description",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "fire_protection_insurance",
      publication_date: "ongoing",
      retrieval_date: "2026-08-05",
      summary:
        "ISO PPC program classifies community fire-protection capability from Class 1 (generally superior) to Class 10 (does not meet minimum criteria) using the Fire Suppression Rating Schedule; program materials state that better classifications help secure lower fire insurance premiums and that insurers use PPC information in premium setting.",
      key_findings: [
        "PPC classes 1–10 rate community fire-protection capability",
        "Program links better public fire protection to lower fire insurance premiums for communities",
      ],
      limitations:
        "Private rating schedule; premium effects vary by insurer and other underwriting factors; not a government standard.",
      ideological_or_institutional_considerations:
        "Commercial risk-assessment product widely used in U.S. property insurance markets.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports insurance–fire-protection market link for Community Resilience doctrine.",
    },
    {
      source_id: "CC-SRC-078",
      title: "Volunteer Firefighter Crisis (NFPA Journal summary of NFPA research)",
      authors: ["National Fire Protection Association"],
      year: 2026,
      url: "https://www.nfpa.org/news-blogs-and-articles/nfpa-journal/2026/02/11/volunteer-fire-service-crisis",
      source_type: "research_summary",
      reliability: "reputable_standards_organization",
      primary_or_secondary: "secondary_summary_of_nfpa_data",
      jurisdiction: "US",
      research_domain: "volunteer_fire_service",
      publication_date: "2026-02-11",
      retrieval_date: "2026-08-05",
      summary:
        "NFPA Journal article summarizing NFPA research: volunteer firefighter ranks fell from about 827,000 in 2008 to about 635,000 in 2023; fire department call volume rose about 70% over that period (roughly 25 million to 42 million).",
      key_findings: [
        "Volunteer firefighters ≈635,000 in 2023 vs ≈827,000 in 2008",
        "Fire department calls ≈+70% since 2008",
      ],
      limitations:
        "Journal summary of underlying NFPA statistical series; department-type mix and EMS share of calls matter for interpretation.",
      ideological_or_institutional_considerations: "NFPA is a standards and research organization for fire protection.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports volunteer recruitment/retention pressure diagnosis for rural resilience pathways.",
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
      claim_id: "CC-CLAIM-129",
      claim_text:
        "ISO’s Public Protection Classification (PPC) program rates community fire-protection capability from Class 1 (generally representing superior property fire protection) to Class 10 (area does not meet minimum criteria), and ISO/Verisk program materials state that the PPC program helps secure lower fire insurance premiums for communities with better public protection and that insurers use PPC information in calculating premiums.",
      chapter_ids: [],
      claim_type: "fire_protection",
      claim_class: "descriptive_program",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "industry_standard_practice",
      source_ids: ["CC-SRC-077"],
      opposing_evidence: [
        "Premiums also depend on claims history, construction, and insurer underwriting; PPC is not the sole driver.",
      ],
      uncertainty:
        "Supports market pricing of fire-protection quality; does not prove a finished CC Safety Dividend design.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-309", "CC-DEV-316"],
      public_wording:
        "Insurers commonly use ISO Public Protection Classifications when pricing fire insurance — better community fire protection can mean lower premiums.",
    },
    {
      claim_id: "CC-CLAIM-130",
      claim_text:
        "According to NFPA research summarized by NFPA Journal (2026), U.S. volunteer firefighter numbers fell from about 827,000 in 2008 to about 635,000 in 2023, while fire department call volume rose about 70% over that period.",
      chapter_ids: [],
      claim_type: "emergency_services",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "standards_organization_statistics",
      source_ids: ["CC-SRC-078"],
      opposing_evidence: [
        "Some communities shifted to combination/career staffing; call growth is heavily EMS-driven in many departments.",
      ],
      uncertainty:
        "Supports volunteer-capacity stress diagnosis; does not by itself prove any single benefit package will reverse the trend.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2008_to_2023",
      doctrine_ids: ["CC-DEV-313", "CC-DEV-328"],
      public_wording:
        "NFPA data show volunteer firefighter ranks fell from about 827,000 (2008) to about 635,000 (2023) while call volume rose about 70% — a core rural resilience pressure.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

{
  const core = read("data/project/civilizational_core.json");
  if (!core.community_resilience_spine) {
    core.community_resilience_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major dedicated pillar: fire, EMS, emergency management, and public health preparedness as prosperity infrastructure — prevention, professional/volunteer capacity, Safety Dividends, reserves, and scorecards.",
      governing_principle:
        "Safe communities are prosperous communities. Emergency services are foundational investments that protect lives, reduce economic risk, and strengthen local prosperity.",
      central_promise:
        "Treat community resilience as productive infrastructure supporting responders, rewarding prevention and preparedness, and ensuring communities can protect people, attract investment, and recover quickly.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-COMMUNITY-RESILIENCE",
      framework_file: "data/project/community_resilience_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: ["CC-CLAIM-129", "CC-CLAIM-130"],
      links_to: [
        "constitutional_defense_spine",
        "health_human_capacity_spine",
        "community_prosperity_spine",
        "civic_wealth_spine",
        "energy_sovereignty_spine",
        "prosperous_aging_spine",
        "human_capital_doctrine",
        "essential_systems_doctrine",
      ],
      note: "Architecture only — Safety Dividend and reserve formulas require modeling; ISO/NFPA baselines sourced; legal 0%. Architecture ≠ evidence that reserves or dividends already exist.",
    };
  }
  for (const key of [
    "constitutional_defense_spine",
    "health_human_capacity_spine",
    "community_prosperity_spine",
    "civic_wealth_spine",
  ]) {
    if (core[key] && !core[key].links_to?.includes("community_resilience_spine")) {
      core[key].links_to = [...(core[key].links_to || []), "community_resilience_spine"];
    }
  }
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-COMMUNITY-RESILIENCE")) {
    const cpaIdx = tree.findIndex((n) => n.node_id === "CC-WEB-COMMUNITY-PROSPERITY");
    const secIdx = tree.findIndex((n) => n.node_id === "CC-WEB-SECURITY");
    const node = {
      node_id: "CC-WEB-COMMUNITY-RESILIENCE",
      title: "Community Resilience System",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-084", "CC-DEC-087", "CC-DEC-090", "CC-DEC-085"],
      path: "/community-resilience/",
      central_promise:
        "Safe communities are prosperous communities. Treat fire, EMS, disaster preparedness, and public health as productive infrastructure that protects people, attracts investment, and recovers quickly.",
      iconic_phrase: "How much future loss does this prevent?",
      branches: [
        "Principle — emergency services as economic assets",
        "Integrated Community Resilience System",
        "Prosperity through lower risk",
        "Community Safety Dividend",
        "Professional + volunteer partnership",
        "Community Emergency Reserve",
        "Healthcare integration",
        "Insurance partnership",
        "National service pathway",
        "Community Resilience Scorecard",
        "Compact language",
      ],
      framework_file: "data/project/community_resilience_framework.json",
      research_domain_title:
        "Fire, EMS, Disaster Preparedness, Public Health Resilience, and Community Safety Dividends",
    };
    const insertAt = cpaIdx >= 0 ? cpaIdx + 1 : secIdx >= 0 ? secIdx : tree.length;
    if (secIdx >= 0) {
      tree[secIdx].related_decision_ids = Array.from(
        new Set([...(tree[secIdx].related_decision_ids || []), DECISION])
      );
    }
    tree.splice(insertAt, 0, node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/community_resilience_framework.json";
  if (!sm.related_framework_files.includes(f)) {
    const idx = sm.related_framework_files.indexOf(
      "data/project/community_prosperity_framework.json"
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
    "['data/project/community_prosperity_framework.json','schemas/community_prosperity_framework.schema.json'],";
  const insert =
    "['data/project/community_prosperity_framework.json','schemas/community_prosperity_framework.schema.json'],\n  ['data/project/community_resilience_framework.json','schemas/community_resilience_framework.schema.json'],";
  if (!text.includes("community_resilience_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Community Resilience System registry bootstrap complete.");
