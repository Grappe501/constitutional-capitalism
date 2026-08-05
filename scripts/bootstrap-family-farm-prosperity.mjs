/**
 * One-shot registry bootstrap for Local Food and Family Farm Prosperity System.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_local_food_family_farm_prosperity";
const DECISION = "CC-DEC-089";
const PRINCIPLE = "CC-PRIN-44";
const COMMON_CONFLICTS = [
  "export-only or distant-commodity-only farm strategy",
  "temporary grants mistaken for local ownership",
  "certification bureaucracy that only large corporations can afford",
  "government micromanagement replacing farmer independence",
  "treating illustrative institutional purchase percentages as locked law",
];
const COMMON_RESEARCH = [
  "Local Food Prosperity Fund fiscal modeling",
  "Institutional purchasing guarantee percentage design by region",
  "Food Utility Cooperative capital and fee modeling",
  "Farm Stewardship Contract measurement protocols",
  "legal drafting for market-power and land-access rules",
];

const statements = [
  [269, "proposed_foundational_principle", true, "Local Food and Family Farm Prosperity System: make the local family farm one of the primary engines of community wealth, public health, land stewardship, and national resilience. Reverse a structure where farmers carry land, labor, weather, debt, and market risk while distant processors, distributors, retailers, and financiers capture much of the profit."],
  [270, "proposed", false, "Central promise: a farmer who produces healthy food, restores soil, protects water, employs local people, and feeds the surrounding community should earn dependable middle-class or better income; build farm equity; pass the operation to the next generation; receive retirement and healthcare security; survive weather and market shocks; compete without becoming a massive industrial operation; and share directly in local food-economy prosperity."],
  [271, "proposed_design_agenda", false, "Local Food Prosperity Fund / Dividend: county or regional funds invest in farms, processing, storage, markets, transportation, and food access; surplus shared among farmers, workers, local investors, hosting communities, and land/water restoration — local ownership, not temporary grants. Exact revenue mix requires modeling."],
  [272, "proposed", false, "Local Food Purchasing Guarantees: publicly funded institutions purchase an increasing share from qualified local/regional producers when supply is available. Illustrative phased target may begin at 10% and rise as capacity grows — percentage requires modeling. Regional planners publish projected institutional demand so farmers gain predictable buyers, volume, and income before planting."],
  [273, "proposed", false, "Regional Food Utility Cooperatives: farmer-controlled or publicly partnered shared access to processing, packing, cold/freezer storage, commercial kitchens, aggregation, refrigerated transport, testing, branding, and ordering systems — public-infrastructure posture with reasonable fees, filling the missing middle between farm and customer."],
  [274, "proposed", false, "Farm Stewardship Contracts: pay participating farmers for verified soil health, water quality, drought resilience, habitat, pollinators, and related public benefits based primarily on practices and measurable land improvement — not complicated carbon markets dominated by distant brokers. Farmers retain land control and future environmental value."],
  [275, "proposed", false, "Regenerative Transition Guarantee: voluntary five- to seven-year support including partial income protection, transition finance, restoration equipment grants, experienced-producer technical assistance, early yield-loss protection, and premium purchase contracts — so farmers do not carry the entire public burden of system change."],
  [276, "proposed", false, "Regional Natural and Regenerative Standard: clear principles, affordable inspections, farmer-to-farmer verification, transparent records, random audits, and graduated levels (Participating, Transitioning, Regenerative, Regenerative Plus, Regional Stewardship Leader) — reward improvement without excluding small farms through corporate-scale bureaucracy."],
  [277, "proposed", false, "Next Generation Farm Ownership Program: long-term low-interest land loans, down-payment help, shared equity, lease-to-own, tax incentives for sales to working farmers, conservation easements against speculation — tied to active farming and stewardship so subsidized land does not become speculative real estate."],
  [278, "proposed", false, "Rural Food and Farm Service Corps: paid apprenticeships, technical and business training, land-access assistance, student-debt relief, housing support, and prosperity/retirement contributions; post-service farm start-up capital, preferred land loans, cooperative shares, education benefits, or enhanced retirement — linking agriculture to broader service-to-wealth pathways."],
  [279, "proposed", false, "Community Food Contribution Credit: additional incentives when food stays in the region (schools, food banks, markets, seniors, restaurants, CSA). Farmers remain free to sell anywhere; local sales should be at least as financially attractive as distant commodity markets."],
  [280, "proposed_design_agenda", false, "Community Food Accounts: household accounts usable with participating local producers and retailers; additional contributions for lower-income, seniors, veterans, disability, and families with children; bonus purchasing power for qualifying local/regenerative foods without dictating diets. Multiplier examples (e.g., $1.25–$1.50) require modeling."],
  [281, "proposed", false, "Farm and Community Prosperity Accounts: participating farmers earn retirement and healthcare security based on local production years, stewardship, community institutional food supply, local employment, mentoring, and cooperative participation — enabling dignified retirement and succession without forced corporate or developer sale."],
  [282, "proposed", false, "Protect independent farmers from corporate market power: ban unfair contracts, retaliation, hidden pricing, processing concentration abuse, forced inputs, farm-data control, and discrimination. Affirm right to repair, farm-data ownership, transparent pricing, independent processing access, and cooperative freedom. Public funds should not support firms that undermine local producers."],
  [283, "proposed", false, "Local Food Prosperity Scorecard: publish family farms, farmer income, beginning farmers, family ownership acres, soil/water health, institutional local share, processing capacity, jobs, food access, succession, local circulation, and waste/transport reduction — not commodity volume alone."],
  [284, "proposed", false, "Economic cycle: institutional local purchasing → farmer income → land investment → cooperative processing → worker wages/ownership → household food access → lower health/environmental costs → returns to Local Food Prosperity Fund → more farmers, infrastructure, and retirement security. A circular economy rooted in the land."],
  [285, "proposed", false, "Governing measurement question: Is the land healthier, are the farmers more prosperous, are the people better fed, and is more of the wealth remaining in the community?"],
  [286, "proposed", false, "Public message to farmers: not new environmental rules imposed alone, but making it profitable to care for the land, feed neighbors, own the farm, raise a family, and pass something valuable forward — choices, markets, infrastructure, and security without government micromanagement."],
  [287, "proposed_foundational_principle", true, "American Shared Prosperity Compact language for food and farms: food, land, water, and soil as foundations of national security and community prosperity; rebuild locally rooted family farms through fair market access, regional processing, stewardship rewards, expanded ownership, and shared wealth for those who feed their communities."],
  [288, "proposed", false, "Implementation rule: pilot Local Food Prosperity Funds, purchasing guarantees, and Food Utility Cooperatives regionally with defined costs, outcomes, failure triggers, and independent evaluation. Complements Community Food Security System. Financing formulas and purchase floors remain design parameters until modeled. Architecture ≠ evidence."],
];

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Family Farm Prosperity")) {
    dd.note = dd.note.replace(
      "Includes Prosperous Aging System",
      "Includes Local Food / Family Farm Prosperity (CC-PRIN-44), Prosperous Aging System"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-29")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-29",
      title: "Local Food and Family Farm Prosperity System",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_usda_ers_fns_baselines",
      affected_domains: [
        "agriculture",
        "family_farms",
        "local_food",
        "food_processing",
        "stewardship",
        "rural_development",
        "institutional_procurement",
        "community_wealth",
      ],
      constitutional_questions: [
        "How does a republic make family farms engines of community wealth without micromanaging production?",
        "How should public institutions guarantee local markets while remaining free of export bans?",
        "How are stewardship and regenerative transition paid for without distant carbon-broker capture?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local", "regional"],
      risks: [
        "treating illustrative purchase-floor percentages as locked law",
        "conflating USDA baselines with proof that Prosperity Funds or Food Utilities already exist",
        "certification schemes that exclude small farms",
        "architecture surge mistaken for Phase 2 proof completion",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-44; USDA ERS/FNS/AMS baselines sourced; financing formulas require modeling; legal 0%; complements Community Food Security.",
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
      implications: n === 269 ? [PRINCIPLE] : ["family_farm_prosperity"],
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
      title: "Local Food and Family Farm Prosperity",
      statement:
        "A shared-prosperity system should make the local family farm one of the primary engines of community wealth, public health, land stewardship, and national resilience. Farmers who feed their communities and restore the land should earn dependable income, build equity, secure succession, and share directly in the prosperity of the local food economy.",
      text:
        "A shared-prosperity system should make the local family farm one of the primary engines of community wealth, public health, land stewardship, and national resilience. Farmers who feed their communities and restore the land should earn dependable income, build equity, secure succession, and share directly in the prosperity of the local food economy.",
      explanation:
        "Major national doctrine complementing Community Food Security. Thirteen pillars: Local Food Prosperity Funds, institutional purchasing guarantees, Food Utility Cooperatives, stewardship contracts, regenerative transition guarantees, affordable regenerative standards, next-generation ownership, Farm Service Corps, community food credits and accounts, farm retirement security, anti-concentration protections, and Local Food Prosperity Scorecards. Institutional purchase floors are illustrative. USDA ERS/FNS baselines sourced. Architecture only; legal/modeling 0%.",
      protects: [
        "family farm income and equity",
        "local processing and market access",
        "land stewardship without forced carbon-broker capture",
        "next-generation farm ownership and succession",
      ],
      prohibits: [
        "treating family farms as residual commodity suppliers only",
        "certification systems only large corporations can afford",
        "government micromanagement replacing farmer independence",
        "public funds supporting firms that undermine independent producers",
      ],
      implications: [
        "Local Food and Family Farm Prosperity architecture",
        "links Community Food Security, Resource Sovereignty, Health, Prosperous Aging, Civic Wealth",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What institutional local-purchase floors are feasible by region without inventing supply?",
        "What Food Utility Cooperative capital structures remain farmer-controlled?",
        "What stewardship metrics are measurable without carbon-broker capture?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/family_farm_prosperity_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Local Food and Family Farm Prosperity System",
      question:
        "Should Constitutional Capitalism adopt the Local Food and Family Farm Prosperity System as a major doctrine (CC-PRIN-44, CC-DEV-269–288, CC-DCC-29) — making family farms engines of community wealth through Local Food Prosperity Funds, institutional purchasing guarantees, Food Utility Cooperatives, stewardship and regenerative transition supports, affordable regenerative standards, next-generation ownership, Farm Service Corps, community food credits/accounts, farm retirement security, anti-concentration protections, and Local Food Prosperity Scorecards — complementing Community Food Security while registering sourced USDA ERS/FNS/AMS baselines without locking purchase-floor percentages or claiming institutions already exist?",
      status: "approved",
      rationale:
        "Too much agricultural value leaves communities while farmers carry production and risk. A profitable regenerative local food system should reverse that structure through markets, shared infrastructure, stewardship pay, and ownership — without export bans or government micromanagement. Complements existing Community Food Security capacity architecture.",
      impact: [
        PRINCIPLE,
        "CC-DEV-269–288",
        "capture_cluster CC-DCC-29",
        "family_farm_prosperity_framework",
        "sources CC-SRC-073–074 + CC-SRC-039",
        "claims CC-CLAIM-124–126",
        "book/board family-farm-prosperity surfaces",
        "new IA node CC-WEB-FAMILY-FARM",
      ],
      recommendation:
        "Adopt as major pillar architecture. Label institutional purchase floors and food-account multipliers as design parameters requiring modeling. Do not invent farmer-income or acreage outcomes. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86. Complements Community Food Security.",
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
  if (!up.updates.some((u) => u.id === "UPD-040")) {
    up.updates.push({
      id: "UPD-040",
      date: "2026-08-05",
      title: "Local Food and Family Farm Prosperity System",
      summary:
        "Adopts CC-PRIN-44 / CC-DEC-089: family farms as community wealth engines — Local Food Prosperity Funds, institutional purchasing guarantees, Food Utility Cooperatives, stewardship contracts, regenerative transition guarantees, next-generation ownership, Farm Service Corps, community food accounts, farm retirement security, anti-concentration protections, and Local Food Prosperity Scorecards. Sourced USDA ERS/FNS baselines. Complements Community Food Security. Architecture only; purchase floors and financing require modeling; legal 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Family Farm")) {
    src.note = src.note.replace(
      "and Prosperous Aging SSA/GAO/IRS baselines",
      "Prosperous Aging SSA/GAO/IRS baselines, and Family Farm USDA ERS/FNS baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-073",
      title: "America’s Farms and Ranches at a Glance: 2024 Edition",
      authors: ["USDA Economic Research Service"],
      year: 2024,
      url: "https://ers.usda.gov/sites/default/files/_laserfiche/publications/110560/EIB-283.pdf",
      source_type: "federal_statistical",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "farm_structure",
      publication_date: "2024",
      retrieval_date: "2026-08-05",
      summary:
        "ERS EIB-283 using 2023 ARMS: family farms about 96% of farms and 83% of production value; small family farms about 86% of farms, 41% of land, 17% of production value; large-scale family farms about 48% of production value.",
      key_findings: [
        "Family farms ≈96% of farms and ≈83% of production value (2023)",
        "Small family farms ≈86% of farms but ≈17% of production value",
      ],
      limitations:
        "GCFI-based size classes; covers contiguous U.S. in ARMS methodology; not a claim that small farms lack importance.",
      ideological_or_institutional_considerations: "Official USDA ERS statistical report.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports family-farm centrality and small-farm production-share context for prosperity doctrine.",
    },
    {
      source_id: "CC-SRC-074",
      title: "2023 Farm to School Census",
      authors: ["USDA Food and Nutrition Service"],
      year: 2024,
      url: "https://www.fns.usda.gov/research/f2s/census2023",
      source_type: "federal_statistical",
      reliability: "primary_official",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "local_food_institutional_procurement",
      publication_date: "2024",
      retrieval_date: "2026-08-05",
      summary:
        "FNS 2023 Farm to School Census (SY 2022–23): nearly 74% of SFAs reported at least one farm-to-school activity; participating SFAs spent almost $1.8 billion on local purchases, about 16% of total food spending; availability and cost remain common challenges.",
      key_findings: [
        "≈74% of SFAs reported farm-to-school activity in SY 2022–23",
        "≈$1.8B local purchases ≈16% of participating SFA food spending",
      ],
      limitations:
        "Local definitions vary; fluid milk is a large share of local spending; not a finished Constitutional Capitalism purchase-guarantee design.",
      ideological_or_institutional_considerations: "Official USDA FNS census product.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports institutional local-purchase feasibility context; illustrative CC floors still require modeling.",
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
      claim_id: "CC-CLAIM-124",
      claim_text:
        "According to USDA ERS America’s Farms and Ranches at a Glance (2024 edition), family farms accounted for about 96% of U.S. farms and 83% of the value of production in 2023; small family farms accounted for about 86% of farms but about 17% of production value.",
      chapter_ids: [],
      claim_type: "agriculture",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_statistics",
      source_ids: ["CC-SRC-073"],
      opposing_evidence: [
        "Production value is concentrated on larger family and nonfamily operations; farm count dominance is not production dominance.",
      ],
      uncertainty: "Supports family-farm centrality; does not by itself prove local prosperity institutions exist.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "2023",
      doctrine_ids: ["CC-DEV-269", "CC-DEV-270"],
      public_wording:
        "USDA ERS reports that family farms are about 96% of U.S. farms and 83% of production value (2023), while small family farms are most farms but a smaller share of production value.",
    },
    {
      claim_id: "CC-CLAIM-125",
      claim_text:
        "According to USDA FNS 2023 Farm to School Census, school food authorities participating in farm to school spent almost $1.8 billion on local purchases in SY 2022–23 — about 16% of their total food spending — and nearly three-quarters of SFAs reported at least one farm-to-school activity.",
      chapter_ids: [],
      claim_type: "local_food",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_statistics",
      source_ids: ["CC-SRC-074"],
      opposing_evidence: [
        "Local definitions vary; milk is a large share of local spending; availability and cost remain barriers.",
      ],
      uncertainty: "Supports institutional local purchasing as existing practice; CC purchase floors remain design parameters.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "SY_2022_23",
      doctrine_ids: ["CC-DEV-272"],
      public_wording:
        "USDA FNS reports nearly $1.8 billion in local school-food purchases in SY 2022–23 — about 16% of participating SFAs’ food spending — with about three-quarters of SFAs doing farm-to-school activity.",
    },
    {
      claim_id: "CC-CLAIM-126",
      claim_text:
        "USDA AMS Local Agriculture Market Program (LAMP) supports local and regional food markets, value-added products, and food-system infrastructure tools such as aggregation and distribution — illustrating federal market-access programs rather than a finished Constitutional Capitalism Food Utility Cooperative.",
      chapter_ids: [],
      claim_type: "local_food",
      claim_class: "descriptive_program",
      importance: "medium",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_program_description",
      source_ids: ["CC-SRC-039"],
      opposing_evidence: [
        "Program existence does not establish farmer-controlled regional utility infrastructure at scale.",
      ],
      uncertainty: "Descriptive baseline for missing-middle infrastructure agenda.",
      fact_check_status: "verified_against_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary",
      doctrine_ids: ["CC-DEV-273"],
      public_wording:
        "USDA already funds local/regional market and food-hub style tools through LAMP; CC proposes expanding that missing middle into farmer-controlled Food Utility Cooperatives.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

{
  const core = read("data/project/civilizational_core.json");
  if (!core.family_farm_prosperity_spine) {
    core.family_farm_prosperity_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major national pillar: local family farms as engines of community wealth, public health, land stewardship, and national resilience — markets, shared infrastructure, stewardship pay, and ownership.",
      governing_principle:
        "A shared-prosperity system should make the local family farm one of the primary engines of community wealth, public health, land stewardship, and national resilience.",
      central_promise:
        "Farmers who feed their communities and restore the land should earn dependable income, build equity, secure succession, and share in local food-economy prosperity.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-FAMILY-FARM",
      framework_file: "data/project/family_farm_prosperity_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: ["CC-CLAIM-124", "CC-CLAIM-125", "CC-CLAIM-126"],
      links_to: [
        "community_food_security",
        "resource_sovereignty",
        "energy_sovereignty_spine",
        "health_human_capacity_spine",
        "prosperous_aging_spine",
        "civic_wealth_spine",
        "assistance_spine",
        "human_capital_doctrine",
      ],
      note: "Architecture only — institutional purchase floors and fund formulas require modeling; USDA ERS/FNS baselines sourced; legal 0%. Complements Community Food Security. Architecture ≠ evidence that Prosperity Funds or Food Utilities already exist.",
    };
  }
  if (core.community_food_security && !core.community_food_security.links_to?.includes("family_farm_prosperity_spine")) {
    core.community_food_security.links_to = [
      ...(core.community_food_security.links_to || []),
      "family_farm_prosperity_spine",
    ];
  }
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-FAMILY-FARM")) {
    const agIdx = tree.findIndex((n) => n.node_id === "CC-WEB-AGRICULTURE");
    const node = {
      node_id: "CC-WEB-FAMILY-FARM",
      title: "Local Food and Family Farm Prosperity",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-063", "CC-DEC-062", "CC-DEC-088"],
      path: "/family-farm-prosperity/",
      central_promise:
        "A farmer who produces healthy food, restores the soil, protects water, employs local people, and feeds the surrounding community should earn a dependable income, build equity, pass the farm forward, and share in the prosperity of the local food economy.",
      iconic_phrase:
        "Is the land healthier, are the farmers more prosperous, are the people better fed, and is more of the wealth remaining in the community?",
      branches: [
        "Central promise to farmers",
        "Local Food Prosperity Fund",
        "Local Food Purchasing Guarantees",
        "Regional Food Utility Cooperatives",
        "Farm Stewardship Contracts",
        "Regenerative Transition Guarantee",
        "Regional Natural and Regenerative Standard",
        "Next Generation Farm Ownership",
        "Rural Food and Farm Service Corps",
        "Community Food Contribution Credit",
        "Community Food Accounts",
        "Farm retirement and healthcare security",
        "Anti-concentration farmer protections",
        "Local Food Prosperity Scorecard",
      ],
      framework_file: "data/project/family_farm_prosperity_framework.json",
      research_domain_title:
        "Family Farm Wealth Engines, Local Markets, Regional Food Utilities, and Regenerative Stewardship",
    };
    if (agIdx >= 0) {
      tree[agIdx].related_decision_ids = Array.from(
        new Set([...(tree[agIdx].related_decision_ids || []), DECISION])
      );
      tree.splice(agIdx + 1, 0, node);
    } else tree.push(node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/family_farm_prosperity_framework.json";
  if (!sm.related_framework_files.includes(f)) {
    const idx = sm.related_framework_files.indexOf(
      "data/project/community_food_security_framework.json"
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
    "['data/project/prosperous_aging_framework.json','schemas/prosperous_aging_framework.schema.json'],";
  const insert =
    "['data/project/prosperous_aging_framework.json','schemas/prosperous_aging_framework.schema.json'],\n  ['data/project/family_farm_prosperity_framework.json','schemas/family_farm_prosperity_framework.schema.json'],";
  if (!text.includes("family_farm_prosperity_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Local Food and Family Farm Prosperity registry bootstrap complete.");
