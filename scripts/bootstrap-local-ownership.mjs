/**
 * One-shot registry bootstrap for Local Ownership Prosperity Framework.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_local_ownership_prosperity";
const DECISION = "CC-DEC-092";
const PRINCIPLE = "CC-PRIN-47";
const COMMON_CONFLICTS = [
  "punishing large businesses or prohibiting outside investment",
  "incentives based on ownership label alone without measured contribution",
  "invented local-multiplier percentages treated as locked law",
  "patronage capital disguised as Community Investment Banks",
  "non-competitive procurement that ignores price and quality",
];
const COMMON_RESEARCH = [
  "Local Prosperity Score factor weights and audit design",
  "Community Investment Bank / revolving fund capital modeling",
  "succession and cooperative-conversion tax incentive design",
  "local recirculation measurement protocols",
  "legal drafting for enterprise classification and procurement weighting",
];

const statements = [
  [329, "proposed_foundational_principle", true, "Local Ownership Prosperity Framework: expand opportunities for family-owned, employee-owned, cooperative, and locally controlled enterprises by rewarding measurable local prosperity contributions — not by punishing large businesses or prohibiting outside investment."],
  [330, "proposed", false, "Foundational design principle: the closer ownership is to the community, the more likely wealth circulates within that community — via local reinvestment, civic support, job stability, accountable leadership, generational wealth, and resilience. Treat as testable; measure rather than assert universal automatic effects. Reward public benefits without blocking national growth or competition."],
  [331, "proposed", false, "Community Enterprise Classification: Community Enterprise, Family Enterprise, Worker Cooperative, Community Cooperative, and Public Benefit Enterprise — multi-qualification allowed; categories structure eligibility, not exclusion of other ownership forms."],
  [332, "proposed_design_agenda", false, "Local Prosperity Score: incentives unlocked by measurable factors such as local ownership share, payroll, purchasing, retention, training, apprenticeships, family-supporting wages, community investment, volunteer support, stewardship, local tax contribution, local decision authority, and longevity — not size alone. Weights require modeling."],
  [333, "proposed_design_agenda", false, "Capital Access Advantage: Community Investment Banks or revolving funds offer patient capital — lower rates, longer terms, expansion, succession, equipment, working capital, disaster recovery — prioritized for businesses that strengthen the local economy under transparent eligibility. Terms require modeling."],
  [334, "proposed", false, "Tax incentives for keeping ownership local: reward employee sales, local family succession, cooperative conversion, local headquarters, local production, and reinvestment in expansion or workforce — encourage continuity without restricting owners' exit choices."],
  [335, "proposed", false, "Succession Protection: planning assistance, intergenerational transfer incentives, employee buyout financing, cooperative conversion help, mentorship, and estate planning support so productive firms and jobs do not disappear at retirement."],
  [336, "proposed", false, "Community Investment Priority in procurement: appropriate weight to local economic impact, workforce development, community reinvestment, supplier diversity, reliability, price, and quality — recognize full local value while remaining fair and competitive."],
  [337, "proposed", false, "Local Ownership Retirement Connection: optional Community Prosperity Account investment in approved local manufacturing, food processing, childcare, housing, renewable energy, startups, downtown redevelopment, and cooperatives — with fiduciary diversification caps; residents share returns when enterprises succeed."],
  [338, "proposed_design_agenda", false, "Community Reinvestment Requirement: businesses receiving substantial public incentives may commit to proportional, transparent reinvestment in training, expansion, innovation, local philanthropy, community development, or environmental improvements. Exact shares require modeling."],
  [339, "proposed", false, "Cooperative Development Initiative: Cooperative Development Centers provide legal, planning, financing, governance, accounting, marketing, technology, and succession support so cooperative ownership is practical, not niche."],
  [340, "proposed", false, "Measure local economic multipliers by community impact metrics — recirculation, local supplier spend, employee ownership, survival and formation rates, family-business retention, cooperative growth, wages, household wealth, local investment, volunteerism, philanthropy — without inventing unverified multiplier constants."],
  [341, "proposed", false, "Virtuous cycle: local ownership → local reinvestment → stronger businesses → better jobs → higher household wealth → more community investment → better schools/infrastructure/services → more entrepreneurship → stronger local ownership."],
  [342, "proposed", false, "Link to Community Prosperity Accounts: Local Ownership provides the enterprise side of optional place-based investment under the same diversification and fiduciary safeguards."],
  [343, "proposed", false, "Link to Family Farm Prosperity and Civic Wealth: agricultural and community cooperatives, employee ownership, and service-to-ownership pathways reinforce rooted wealth without micromanaging firm structure."],
  [344, "proposed", false, "Link to Energy Sovereignty and Community Resilience: locally rooted energy, food processing, and essential enterprises may qualify under Local Prosperity Scores when they deliver measured community benefits."],
  [345, "proposed", false, "Implementation rule: pilot Local Prosperity Scores, succession financing, and Cooperative Development Centers with published metrics, independent evaluation, and failure triggers. Architecture ≠ evidence that institutions already exist."],
  [346, "proposed_foundational_principle", true, "Compact language: communities prosper when ownership is rooted where value is created; expand opportunities for family, employee, and cooperative enterprises through capital access, succession, cooperative development, and recognition of community reinvestment — reward lasting local wealth rather than favoring one model by exclusion."],
  [347, "proposed", false, "Market alignment: ownership structure has public consequences; encourage local and cooperative ownership by rewarding measurable prosperity contributions rather than excluding or penalizing other ownership forms."],
  [348, "proposed", false, "NCEO ESOP and USDA agricultural cooperative baselines inform diagnosis that employee ownership and member cooperatives are established U.S. channels for circulating ownership and value — not invented Constitutional Capitalism inventions."],
];

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Local Ownership Prosperity")) {
    dd.note = dd.note.replace(
      "Includes Community Resilience System (CC-PRIN-46)",
      "Includes Local Ownership Prosperity (CC-PRIN-47), Community Resilience System (CC-PRIN-46)"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-32")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-32",
      title: "Local Ownership Prosperity Framework",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_nceo_esop_and_usda_ag_coop_baselines",
      affected_domains: [
        "local_business",
        "employee_ownership",
        "cooperatives",
        "succession",
        "community_capital",
        "procurement",
        "community_wealth",
      ],
      constitutional_questions: [
        "How does a republic reward rooted ownership without punishing outside capital or firm growth?",
        "How should Local Prosperity Scores weight contribution versus ownership labels?",
        "How are succession and cooperative conversion financed without patronage?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local"],
      risks: [
        "anti-large-business politics mistaken for prosperity design",
        "invented local-multiplier percentages",
        "architecture surge mistaken for Phase 2 proof completion",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-47; NCEO/USDA baselines sourced; score weights and capital terms require modeling; legal 0%.",
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
      implications: n === 329 ? [PRINCIPLE] : ["local_ownership"],
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
      title: "Local Ownership Prosperity",
      statement:
        "Communities prosper when ownership is rooted where value is created. Expand opportunities for family-owned, employee-owned, cooperative, and locally controlled enterprises by rewarding measurable local prosperity contributions — not by punishing large businesses or prohibiting outside investment.",
      text:
        "Communities prosper when ownership is rooted where value is created. Expand opportunities for family-owned, employee-owned, cooperative, and locally controlled enterprises by rewarding measurable local prosperity contributions — not by punishing large businesses or prohibiting outside investment.",
      explanation:
        "Major dedicated architecture: Community Enterprise Classification, Local Prosperity Score, patient community capital, continuity tax incentives, succession protection, procurement that counts full local value, Community Prosperity Account enterprise link, proportional reinvestment, Cooperative Development Centers, and recirculation metrics. NCEO ESOP and USDA ag-coop baselines sourced. Score weights and capital terms require modeling. Legal 0%.",
      protects: [
        "opportunity for rooted and cooperative ownership models",
        "freedom for firms to grow and compete nationally",
        "transparent outcome-based incentives rather than patronage",
        "succession pathways that preserve productive local capacity",
      ],
      prohibits: [
        "punishing large businesses or banning outside investment as policy default",
        "incentives based on ownership label alone without measured contribution",
        "invented local-multiplier percentages as locked fiscal facts",
        "non-competitive procurement that ignores price and quality",
      ],
      implications: [
        "Local Ownership Prosperity architecture",
        "links Community Prosperity, Civic Wealth, Family Farms, Energy, Assistance",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What Local Prosperity Score weights are evidence-based by region?",
        "What Community Investment Bank terms remain solvent and non-patronage?",
        "What succession tax designs raise continuity without locking exit paths?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/local_ownership_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Local Ownership Prosperity Framework",
      question:
        "Should Constitutional Capitalism adopt the Local Ownership Prosperity Framework as a major doctrine (CC-PRIN-47, CC-DEV-329–348, CC-DCC-32) — rewarding measurable local prosperity contributions of family, employee, cooperative, and locally controlled enterprises through classification, Local Prosperity Scores, patient capital, succession tools, procurement weighting, Cooperative Development Centers, and Community Prosperity Account links — without punishing large businesses or prohibiting outside investment, while registering NCEO ESOP and USDA agricultural cooperative baselines without locking score weights or claiming institutions already exist?",
      status: "approved",
      rationale:
        "Ownership structure has public consequences for recirculation, civic engagement, and resilience. The framework rewards measured community benefits and continuity tools rather than excluding outside capital. Complements Community Prosperity Accounts and Family Farm / Civic Wealth pathways.",
      impact: [
        PRINCIPLE,
        "CC-DEV-329–348",
        "capture_cluster CC-DCC-32",
        "local_ownership_framework",
        "sources CC-SRC-079–080",
        "claims CC-CLAIM-131–132",
        "book/board local-ownership surfaces",
        "new IA node CC-WEB-LOCAL-OWNERSHIP",
      ],
      recommendation:
        "Adopt as major pillar architecture. Label Local Prosperity Score weights, capital terms, and reinvestment shares as design parameters requiring modeling. Do not invent local-multiplier percentages. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86.",
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
  if (!up.updates.some((u) => u.id === "UPD-043")) {
    up.updates.push({
      id: "UPD-043",
      date: "2026-08-05",
      title: "Local Ownership Prosperity Framework",
      summary:
        "Adopts CC-PRIN-47 / CC-DEC-092: reward measurable local prosperity contributions of family, employee, cooperative, and locally controlled enterprises — classification, Local Prosperity Score, patient capital, succession, procurement weighting, Cooperative Development Centers, Community Prosperity Account link. Does not punish large businesses or ban outside investment. Sourced NCEO ESOP and USDA ag-coop baselines. Architecture only; score weights require modeling; legal 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Local Ownership")) {
    src.note = src.note.replace(
      "and Community Resilience ISO/NFPA baselines",
      "Community Resilience ISO/NFPA baselines, and Local Ownership NCEO/USDA baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-079",
      title: "Employee Ownership by the Numbers",
      authors: ["National Center for Employee Ownership"],
      year: 2025,
      url: "https://www.nceo.org/research/employee-ownership-by-the-numbers",
      source_type: "research_statistical",
      reliability: "reputable_nonprofit_research_from_dol_filings",
      primary_or_secondary: "secondary_analysis_of_dol_filings",
      jurisdiction: "US",
      research_domain: "employee_ownership",
      publication_date: "2025",
      retrieval_date: "2026-08-05",
      summary:
        "NCEO analysis of DOL Form 5500 ESOP filings for plan year 2023: 6,609 ESOPs at 6,411 unique companies; about 15.1 million participants including about 11.0 million active; over $2 trillion in total plan assets; 309 new ESOPs reported in 2023.",
      key_findings: [
        "6,609 ESOPs / 6,411 companies (plan year 2023)",
        "~15.1M participants (~11.0M active); >$2T plan assets",
      ],
      limitations:
        "NCEO tabulation of DOL filings; public vs private ESOP participant mix differs; not a claim about all employee-ownership forms.",
      ideological_or_institutional_considerations:
        "NCEO promotes employee ownership research and education; figures drawn from official DOL filings.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports employee ownership as an established U.S. channel for Local Ownership doctrine.",
    },
    {
      source_id: "CC-SRC-080",
      title: "USDA Annual Survey of U.S. Agricultural Cooperatives (2024 results summary)",
      authors: ["USDA Rural Development"],
      year: 2026,
      url: "https://content.govdelivery.com/accounts/USDARD/bulletins/4033d4c",
      source_type: "federal_statistical",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "agricultural_cooperatives",
      publication_date: "2026",
      retrieval_date: "2026-08-05",
      summary:
        "USDA annual survey: 1,620 farmer, rancher, and fishery cooperatives in 2024; cooperative revenues about $275.8 billion; net income before taxes about $11 billion; co-op count declined from 1,647 in 2023 mainly via mergers.",
      key_findings: [
        "1,620 ag cooperatives in 2024",
        "≈$275.8B cooperative revenues in 2024",
      ],
      limitations:
        "Covers agricultural co-ops, not all consumer/worker co-ops; count declines partly reflect mergers, not only dissolution.",
      ideological_or_institutional_considerations: "Official USDA Rural Development cooperative statistics.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports member-owned cooperative enterprise as a major agricultural ownership channel.",
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
      claim_id: "CC-CLAIM-131",
      claim_text:
        "According to the National Center for Employee Ownership analysis of Department of Labor filings for plan year 2023, there were 6,609 ESOPs in the United States at 6,411 unique companies, covering about 15.1 million participants including about 11.0 million active participants, with over $2 trillion in total plan assets.",
      chapter_ids: [],
      claim_type: "employee_ownership",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "research_tabulation_of_official_filings",
      source_ids: ["CC-SRC-079"],
      opposing_evidence: [
        "Most active participants are in publicly traded company ESOPs; private ESOP counts differ from participant shares.",
      ],
      uncertainty:
        "Supports ESOP prevalence; does not prove Local Prosperity Score designs or automatic local recirculation.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "plan_year_2023",
      doctrine_ids: ["CC-DEV-331", "CC-DEV-348"],
      public_wording:
        "NCEO reports about 6,600 ESOPs covering roughly 15 million participants and over $2 trillion in plan assets (2023 filings) — employee ownership is an established U.S. channel.",
    },
    {
      claim_id: "CC-CLAIM-132",
      claim_text:
        "According to USDA’s annual survey of farmer, rancher, and fishery cooperatives, there were 1,620 agricultural cooperatives in 2024 with about $275.8 billion in cooperative revenues.",
      chapter_ids: [],
      claim_type: "cooperatives",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_statistics",
      source_ids: ["CC-SRC-080"],
      opposing_evidence: [
        "Co-op counts have declined over time largely via mergers; revenues are not identical to local recirculation.",
      ],
      uncertainty:
        "Supports ag cooperative scale; does not cover all cooperative types or prove universal community multipliers.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2024",
      doctrine_ids: ["CC-DEV-331", "CC-DEV-339"],
      public_wording:
        "USDA counts 1,620 farmer, rancher, and fishery cooperatives in 2024 with about $275.8 billion in revenues — member ownership remains a major agricultural channel.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

{
  const core = read("data/project/civilizational_core.json");
  if (!core.local_ownership_spine) {
    core.local_ownership_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major dedicated pillar: reward measurable local prosperity contributions of rooted, family, employee, and cooperative enterprises — without punishing large firms or banning outside investment.",
      governing_principle:
        "Communities prosper when ownership is rooted where value is created; incentives reward lasting local wealth and civic strength across generations.",
      central_promise:
        "Expand opportunities for family, employee, cooperative, and locally controlled enterprises through capital, succession, cooperative development, and outcome-based recognition.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-LOCAL-OWNERSHIP",
      framework_file: "data/project/local_ownership_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: ["CC-CLAIM-131", "CC-CLAIM-132"],
      links_to: [
        "community_prosperity_spine",
        "civic_wealth_spine",
        "family_farm_prosperity_spine",
        "energy_sovereignty_spine",
        "assistance_spine",
        "human_capital_doctrine",
        "community_resilience_spine",
        "prosperous_aging_spine",
      ],
      note: "Architecture only — Local Prosperity Score weights and capital terms require modeling; NCEO/USDA baselines sourced; legal 0%. Architecture ≠ evidence that Community Investment Banks already exist.",
    };
  }
  for (const key of [
    "community_prosperity_spine",
    "civic_wealth_spine",
    "family_farm_prosperity_spine",
  ]) {
    if (core[key] && !core[key].links_to?.includes("local_ownership_spine")) {
      core[key].links_to = [...(core[key].links_to || []), "local_ownership_spine"];
    }
  }
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-LOCAL-OWNERSHIP")) {
    const cpaIdx = tree.findIndex((n) => n.node_id === "CC-WEB-COMMUNITY-PROSPERITY");
    const node = {
      node_id: "CC-WEB-LOCAL-OWNERSHIP",
      title: "Local Ownership Prosperity",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-090", "CC-DEC-085", "CC-DEC-089", "CC-DEC-086"],
      path: "/local-ownership/",
      central_promise:
        "Communities prosper when ownership is rooted where value is created — reward enterprises that create lasting local wealth without punishing growth or outside investment.",
      iconic_phrase:
        "The closer ownership is to the community, the more likely wealth circulates within that community.",
      branches: [
        "Foundational principle",
        "Community Enterprise Classification",
        "Local Prosperity Score",
        "Capital Access Advantage",
        "Tax incentives for local continuity",
        "Succession Protection",
        "Community Investment Priority",
        "Local Ownership Retirement Connection",
        "Community Reinvestment Requirement",
        "Cooperative Development Initiative",
        "Local economic multipliers",
        "Virtuous cycle",
      ],
      framework_file: "data/project/local_ownership_framework.json",
      research_domain_title:
        "Community Enterprises, Cooperatives, Succession, Local Capital Access, and Local Prosperity Scores",
    };
    const insertAt = cpaIdx >= 0 ? cpaIdx + 1 : tree.length;
    if (cpaIdx >= 0) {
      tree[cpaIdx].related_decision_ids = Array.from(
        new Set([...(tree[cpaIdx].related_decision_ids || []), DECISION])
      );
    }
    tree.splice(insertAt, 0, node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/local_ownership_framework.json";
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
    "['data/project/community_resilience_framework.json','schemas/community_resilience_framework.schema.json'],";
  const insert =
    "['data/project/community_resilience_framework.json','schemas/community_resilience_framework.schema.json'],\n  ['data/project/local_ownership_framework.json','schemas/local_ownership_framework.schema.json'],";
  if (!text.includes("local_ownership_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Local Ownership Prosperity Framework registry bootstrap complete.");
