/**
 * One-shot registry bootstrap for Community Prosperity Accounts.
 * Safe to re-run: skips IDs that already exist.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, obj) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(obj, null, 2) + "\n");

const ORIGIN = "project_direction_community_prosperity_accounts";
const DECISION = "CC-DEC-090";
const PRINCIPLE = "CC-PRIN-45";
const COMMON_CONFLICTS = [
  "replacing diversified retirement savings with local-only concentration",
  "elected officials directing investments without fiduciary boards",
  "political patronage disguised as community equity",
  "treating illustrative 5–20% local allocation bands as locked law",
  "trapping residents geographically through non-portable benefits",
];
const COMMON_RESEARCH = [
  "Community Prosperity Account allocation-cap modeling",
  "Community Investment Unit securities and fiduciary design",
  "Community Equity Credit measurement and anti-patronage rules",
  "portability and vesting for multi-community careers",
  "legal drafting for local public equity instruments",
];

const statements = [
  [289, "proposed_foundational_principle", true, "Community Prosperity Accounts: citizens should be able to become long-term investors in the prosperity of the communities they help build — creating community equity that complements, rather than replaces, diversified national and international retirement savings."],
  [290, "proposed", false, "Core principle: communities create wealth through infrastructure, education, entrepreneurship, public safety, housing, healthcare, parks, transportation, utilities, tourism, and civic trust; citizens who spend decades building those assets should have a meaningful opportunity to own part of the increase in value — community equity, not simply another pension."],
  [291, "proposed", false, "Traditional Retirement component remains majority diversified national and international investment to protect households against local downturns."],
  [292, "proposed_design_agenda", false, "Community Prosperity Account: a smaller share — illustrative 5–20% band potentially chosen by the individual — may invest in approved local productive projects (broadband, municipal energy, industrial parks, workforce housing, incubators, food processing, health/childcare, downtown, water, transit). Exact percentages require modeling and fiduciary caps. Returns may include dividends, retirement contributions, appreciation, and community ownership credits."],
  [293, "proposed", false, "Community Investment Units: cities and regions may raise resident capital for productive infrastructure so returns flow to citizen-owners rather than only as interest to distant bondholders. Units finance productive, revenue-capable or clearly sustainable public-benefit assets under fiduciary rules — not patronage."],
  [294, "proposed", false, "Incentive structure: when employment, local business activity, energy production, or downtown value grow the Community Prosperity Fund, investors and participation-credit earners share in that growth — shifting psychology from 'what can I get from city hall?' to 'how do we help this town succeed?'"],
  [295, "proposed", false, "Citizenship creates equity: Community Equity Credits for verified contribution (boards, volunteering, military service, teaching, entrepreneurship, raising children locally, beautification, mentoring, emergency response, local agriculture, long-term residency) may increase share in the community investment pool under transparent statutory rules — contribution alongside dollars, without secret political ownership."],
  [296, "proposed", false, "Cities as wealth builders: leaders ask what investments increase community wealth over thirty years — not only how to balance next year's budget — evaluating major projects partly on public benefit and financial sustainability."],
  [297, "proposed", false, "Community Wealth metrics become the stock price of the community: median household wealth, home and business ownership, volunteer hours, educational attainment, population stability, business starts, farm profitability, housing affordability, crime reduction, life expectancy, retirement security, and youth retention/return."],
  [298, "proposed", false, "Healthy local competition: cities compete on schools, entrepreneurship, family attraction, downtown restoration, public health, and retirement wealth — prosperity becomes measurable."],
  [299, "proposed", false, "Safeguards: diversification complementing broad retirement savings; professional fiduciary boards independent of sole elected control; project-level transparency on costs, risks, returns, and performance; regular independent audits."],
  [300, "proposed", false, "Safeguards continued: caps on local retirement exposure; clearly defined redemption/transfer rules; gradual vesting with partial portability so people are not trapped geographically in a failing locality."],
  [301, "proposed", false, "Political shift: from tax/subsidy/blame fights toward growing community value, attracting employers, improving schools, reducing crime, and building healthy neighborhoods — citizens as co-owners of a community enterprise."],
  [302, "proposed", false, "Link to Prosperous Aging Layer 3: Community Prosperity Accounts elaborate Local Community Prosperity Accounts / Trusts without replacing Social Security or the National Citizen Ownership Account."],
  [303, "proposed", false, "Link to Civic Wealth: Community Equity Credits and service pathways reinforce investment-through-contribution without converting political status into hereditary entitlement."],
  [304, "proposed", false, "Link to Energy Sovereignty, Family Farm Prosperity, Health, and Human Capital: approved local projects may include community energy, food utilities/hubs, health and childcare facilities, and education/workforce infrastructure that raise place value."],
  [305, "proposed", false, "Implementation rule: pilot Community Investment Units and Community Prosperity Funds with published risk disclosures, independent evaluation, failure triggers, and strict separation from ordinary operating budgets. Architecture ≠ evidence that institutions already exist."],
  [306, "proposed_foundational_principle", true, "Compact language: every American should have the opportunity to own a stake in the long-term prosperity of the community they help build; communities should raise capital from residents for productive public investments; community ownership complements — does not replace — diversified retirement savings."],
  [307, "proposed", false, "Foundational communities bridge: longer-term investment in educating local citizens, improving energy and essential infrastructure, and making places more valuable so businesses and families choose to stay and arrive — circulating prosperity where people live."],
  [308, "proposed", false, "Shared prosperity pathways: military service, civic service, teaching, local entrepreneurship, farming, and long-term community engagement increase opportunity to participate in community wealth creation — those who help build a place should share in its success."],
];

{
  const dd = read("data/project/developing_doctrine.json");
  dd.last_updated = "2026-08-05";
  if (!dd.note.includes("Community Prosperity Accounts")) {
    dd.note = dd.note.replace(
      "Includes Local Food / Family Farm Prosperity (CC-PRIN-44)",
      "Includes Community Prosperity Accounts (CC-PRIN-45), Local Food / Family Farm Prosperity (CC-PRIN-44)"
    );
  }
  const ids = statements.map(([n]) => `CC-DEV-${n}`);
  if (!dd.capture_clusters.some((c) => c.cluster_id === "CC-DCC-30")) {
    dd.capture_clusters.push({
      cluster_id: "CC-DCC-30",
      title: "Community Prosperity Accounts — Local Equity in Places People Build",
      maturity: "proposed_architecture",
      evidence_status: "normative_architecture_with_sourced_ici_msrb_gao_baselines",
      affected_domains: [
        "retirement",
        "local_capital_markets",
        "community_wealth",
        "municipal_finance",
        "civic_contribution",
        "fiduciary_governance",
        "place_based_development",
      ],
      constitutional_questions: [
        "How can residents own community upside without imprudent local concentration of retirement savings?",
        "How are Community Investment Units designed as fiduciary instruments rather than political patronage?",
        "How do contribution-based equity credits remain transparent and portable?",
      ],
      implementation_level: ["constitutional_design", "federal", "state", "local"],
      risks: [
        "local concentration risk mistaken for shared prosperity",
        "elected control of investment decisions",
        "illustrative allocation bands treated as locked law",
        "architecture surge mistaken for Phase 2 proof completion",
      ],
      phase_destination: "phase-3_and_phase-4",
      related_doctrine_ids: ids,
      note: "Principle CC-PRIN-45; elaborates Prosperous Aging Layer 3; links Civic Wealth; ICI/MSRB/GAO baselines; allocation formulas require modeling; legal 0%.",
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
      implications: n === 289 ? [PRINCIPLE] : ["community_prosperity"],
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
      title: "Community Prosperity Accounts",
      statement:
        "Every American should have the opportunity to own a stake in the long-term prosperity of the community they help build. Community ownership should complement—not replace—diversified retirement savings, aligning personal financial security with the enduring success of the places people call home.",
      text:
        "Every American should have the opportunity to own a stake in the long-term prosperity of the community they help build. Community ownership should complement—not replace—diversified retirement savings, aligning personal financial security with the enduring success of the places people call home.",
      explanation:
        "Major dedicated architecture elaborating Prosperous Aging Layer 3 and linking Civic Wealth contribution pathways. Dual retirement (diversified + Community Prosperity Account), Community Investment Units, Community Equity Credits, cities as thirty-year wealth builders, Community Wealth metrics, and fiduciary safeguards (diversification, independent boards, transparency, audits, exposure caps, exit/portability). Illustrative local allocation bands require modeling. ICI/MSRB/GAO baselines sourced. Legal/modeling 0%.",
      protects: [
        "resident opportunity to own community upside",
        "diversified retirement as the majority protection against local downturns",
        "fiduciary and transparency guardrails against patronage",
        "partial portability so people are not trapped geographically",
      ],
      prohibits: [
        "replacing diversified retirement with local-only concentration",
        "elected officials directing investments without fiduciary boards",
        "secret political equity credits",
        "treating illustrative allocation percentages as locked law",
      ],
      implications: [
        "Community Prosperity Accounts architecture",
        "links Prosperous Aging, Civic Wealth, Energy, Family Farms, Health, Human Capital",
      ],
      related_declaration_sections: ["I. Purpose", "V. Communities"],
      related_chapters: ["CC-CH-001", "CC-CH-034"],
      related_policy_pillars: ["CC-PILLAR-01", "CC-PILLAR-02", "CC-PILLAR-03"],
      open_questions: [
        "What local allocation caps are prudent by household age and wealth?",
        "What Community Investment Unit instruments fit securities and municipal law?",
        "How should Community Equity Credits vest and remain portable across moves?",
      ],
      maturity_percent: 14,
      approval_status: "draft",
      last_updated: "2026-08-05",
      status: "draft",
      related_decision_ids: [DECISION],
      framework_file: "data/project/community_prosperity_framework.json",
    });
  }
  write("data/project/principles.json", pr);
}

{
  const dec = read("data/decisions/decisions.json");
  if (!dec.decisions.some((d) => d.decision_id === DECISION)) {
    dec.decisions.push({
      decision_id: DECISION,
      title: "Community Prosperity Accounts — Local Equity in Places People Build",
      question:
        "Should Constitutional Capitalism adopt Community Prosperity Accounts as a major doctrine (CC-PRIN-45, CC-DEV-289–308, CC-DCC-30) — dual retirement with optional local productive investment, Community Investment Units, Community Equity Credits, cities as wealth builders, Community Wealth metrics, and fiduciary safeguards — elaborating Prosperous Aging Layer 3 and linking Civic Wealth, while registering ICI/MSRB/GAO baselines without locking allocation percentages or claiming institutions already exist?",
      status: "approved",
      rationale:
        "Most retirement capital is pooled in national fund vehicles while residents rarely own the upside of the places they build. Community equity can realign incentives toward foundational communities if — and only if — it complements diversified savings under fiduciary guardrails. Complements Prosperous Aging and Civic Wealth without replacing Social Security or national ownership accounts.",
      impact: [
        PRINCIPLE,
        "CC-DEV-289–308",
        "capture_cluster CC-DCC-30",
        "community_prosperity_framework",
        "sources CC-SRC-075–076 + CC-SRC-070",
        "claims CC-CLAIM-127–128 + CC-CLAIM-122",
        "book/board community-prosperity surfaces",
        "new IA node CC-WEB-COMMUNITY-PROSPERITY",
      ],
      recommendation:
        "Adopt as major pillar architecture elaborating Prosperous Aging Layer 3. Label local allocation bands as design parameters requiring modeling. Do not invent fund returns. Legal drafting and modeling remain 0%. Preserve forensic Phase 2 gate and baseline 2/86.",
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
  if (!up.updates.some((u) => u.id === "UPD-041")) {
    up.updates.push({
      id: "UPD-041",
      date: "2026-08-05",
      title: "Community Prosperity Accounts",
      summary:
        "Adopts CC-PRIN-45 / CC-DEC-090: Community Prosperity Accounts — dual retirement with optional local productive investment, Community Investment Units, Community Equity Credits, cities as thirty-year wealth builders, Community Wealth metrics, and fiduciary safeguards. Elaborates Prosperous Aging Layer 3; links Civic Wealth and foundational communities. Sourced ICI/MSRB/GAO baselines. Architecture only; allocation caps require modeling; legal 0%.",
      public: true,
    });
  }
  write("data/project/updates.json", up);
}

{
  const src = read("data/research/source_registry.json");
  src.last_updated = "2026-08-05";
  if (!src.note.includes("Community Prosperity")) {
    src.note = src.note.replace(
      "and Family Farm USDA ERS/FNS baselines",
      "Family Farm USDA ERS/FNS baselines, and Community Prosperity ICI/MSRB baselines"
    );
  }
  const sources = [
    {
      source_id: "CC-SRC-075",
      title: "2025 Investment Company Fact Book — Quick Facts Guide",
      authors: ["Investment Company Institute"],
      year: 2025,
      url: "https://www.iciglobal.org/system/files/2025-05/2025-factbook-quick-facts-guide.pdf",
      source_type: "industry_statistical",
      reliability: "reputable_industry_primary_data",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "retirement_assets",
      publication_date: "2025",
      retrieval_date: "2026-08-05",
      summary:
        "ICI quick facts: U.S. retirement market about $44.1 trillion at year-end 2024; IRAs $17.0T and DC plans $12.4T were 67% of total; mutual funds managed 45% of those account-based retirement assets.",
      key_findings: [
        "US retirement market ≈$44.1T YE2024",
        "IRAs + DC ≈67% of retirement market; mutual funds manage ≈45% of those account-based assets",
      ],
      limitations:
        "Industry association data; mutual-fund share does not by itself measure local vs global equity exposure inside funds.",
      ideological_or_institutional_considerations:
        "ICI represents investment companies; figures are widely cited market statistics.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports diagnosis that retirement savings are heavily pooled in national fund vehicles.",
    },
    {
      source_id: "CC-SRC-076",
      title: "Municipal Market Facts / Municipal Market Year in Review (MSRB; Fed Financial Accounts)",
      authors: ["Municipal Securities Rulemaking Board", "Board of Governors of the Federal Reserve System"],
      year: 2025,
      url: "https://www.msrb.org/sites/default/files/2026-01/MSRB-2025-Municipal-Market-Year-in-Review.pdf",
      source_type: "market_regulator_statistical",
      reliability: "primary_official_and_market_regulator",
      primary_or_secondary: "primary",
      jurisdiction: "US",
      research_domain: "municipal_finance",
      publication_date: "2025",
      retrieval_date: "2026-08-05",
      summary:
        "MSRB materials summarizing Federal Reserve Financial Accounts holder data for municipal securities: large market financed as debt instruments; households and mutual funds are major holders receiving contractual bond returns rather than automatic resident project equity.",
      key_findings: [
        "Municipal capital is raised primarily through municipal securities markets",
        "Households and funds are major holders of munis as debt claims (interest/principal), not resident equity upside by default",
      ],
      limitations:
        "Holder categories do not prove whether bondholders live in the issuing locality; supports structure of debt vs equity, not a claim that all returns leave town.",
      ideological_or_institutional_considerations: "MSRB is the municipal market self-regulatory organization; underlying holder data from Fed Financial Accounts.",
      verification_status: "url_verified_via_search_excerpt",
      notes: "Supports Community Investment Units as a design alternative/complement to debt-only capital raising.",
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
      claim_id: "CC-CLAIM-127",
      claim_text:
        "According to the Investment Company Institute 2025 Fact Book quick facts, the U.S. retirement market held about $44.1 trillion at year-end 2024; IRAs ($17.0 trillion) and defined-contribution plans ($12.4 trillion) were about 67% of that total; and mutual funds managed about 45% of those account-based retirement assets.",
      chapter_ids: [],
      claim_type: "retirement",
      claim_class: "descriptive_statistical",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "industry_statistics",
      source_ids: ["CC-SRC-075"],
      opposing_evidence: [
        "Some retirement assets are in DB plans, annuities, and non-mutual-fund vehicles; fund pooling is not identical to zero local ownership.",
      ],
      uncertainty:
        "Supports national fund pooling of retirement capital; does not by itself prove residents lack any local equity elsewhere (homes, businesses).",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "YE2024",
      doctrine_ids: ["CC-DEV-289", "CC-DEV-291"],
      public_wording:
        "ICI reports about $44.1 trillion in U.S. retirement assets at year-end 2024, with IRAs and DC plans most of that market and mutual funds managing about 45% of those account-based assets — retirement savings heavily pooled in national fund vehicles.",
    },
    {
      claim_id: "CC-CLAIM-128",
      claim_text:
        "According to MSRB municipal market materials summarizing Federal Reserve Financial Accounts data, U.S. state and local governments raise capital primarily through municipal securities markets in which holders receive contractual interest and principal — a debt-financing structure, not automatic resident equity ownership of community project upside.",
      chapter_ids: [],
      claim_type: "municipal_finance",
      claim_class: "descriptive_structural",
      importance: "high",
      support_level: "supported",
      evidence_strength: "strong",
      consensus_status: "official_and_market_regulator_statistics",
      source_ids: ["CC-SRC-076"],
      opposing_evidence: [
        "Households are large muni holders nationally; some residents do hold local bonds; debt finance can still serve public purposes well.",
      ],
      uncertainty:
        "Supports the structural gap Community Investment Units aim to fill (resident equity/returns), not a claim that all muni interest leaves the issuing community.",
      fact_check_status: "verified_via_search_excerpt_primary_page",
      publication_readiness: "ready_with_citation",
      legal_review_requirement: false,
      geographic_scope: "US",
      temporal_scope: "contemporary_2025",
      doctrine_ids: ["CC-DEV-293"],
      public_wording:
        "Cities mainly raise capital with municipal bonds — debt that pays holders contractual interest — not automatic resident ownership of the upside of local projects.",
    },
  ];
  for (const c of claims) {
    if (!cl.claims.some((x) => x.claim_id === c.claim_id)) cl.claims.push(c);
  }
  write("data/research/claim_ledger.json", cl);
}

{
  const core = read("data/project/civilizational_core.json");
  if (!core.community_prosperity_spine) {
    core.community_prosperity_spine = {
      decision_id: DECISION,
      status: "proposed",
      role: "Major dedicated pillar: residents as co-owners of place prosperity through Community Prosperity Accounts, Community Investment Units, and Community Equity Credits — complementing diversified retirement.",
      governing_principle:
        "Every American should have the opportunity to own a stake in the long-term prosperity of the community they help build.",
      central_promise:
        "Community ownership complements diversified retirement savings and aligns personal security with the enduring success of the places people call home.",
      principle_id: PRINCIPLE,
      website_domain: "CC-WEB-COMMUNITY-PROSPERITY",
      framework_file: "data/project/community_prosperity_framework.json",
      doctrine_ids: statements.map(([n]) => `CC-DEV-${n}`),
      sourced_claim_ids: ["CC-CLAIM-127", "CC-CLAIM-128", "CC-CLAIM-122"],
      links_to: [
        "prosperous_aging_spine",
        "civic_wealth_spine",
        "energy_sovereignty_spine",
        "family_farm_prosperity_spine",
        "health_human_capacity_spine",
        "human_capital_doctrine",
        "community_operating_system",
        "assistance_spine",
      ],
      note: "Architecture only — allocation caps and unit instruments require modeling; ICI/MSRB/GAO baselines sourced; legal 0%. Elaborates Prosperous Aging Layer 3. Architecture ≠ evidence that Community Investment Units already exist.",
    };
  }
  if (core.prosperous_aging_spine && !core.prosperous_aging_spine.links_to?.includes("community_prosperity_spine")) {
    core.prosperous_aging_spine.links_to = [
      ...(core.prosperous_aging_spine.links_to || []),
      "community_prosperity_spine",
    ];
  }
  if (core.civic_wealth_spine && !core.civic_wealth_spine.links_to?.includes("community_prosperity_spine")) {
    core.civic_wealth_spine.links_to = [
      ...(core.civic_wealth_spine.links_to || []),
      "community_prosperity_spine",
    ];
  }
  write("data/project/civilizational_core.json", core);
}

{
  const ia = read("data/project/website_information_architecture.json");
  const tree = ia.domain_tree || [];
  if (!tree.some((n) => n.node_id === "CC-WEB-COMMUNITY-PROSPERITY")) {
    const agingIdx = tree.findIndex((n) => n.node_id === "CC-WEB-PROSPEROUS-AGING");
    const civicIdx = tree.findIndex((n) => n.node_id === "CC-WEB-CIVIC-WEALTH");
    const node = {
      node_id: "CC-WEB-COMMUNITY-PROSPERITY",
      title: "Community Prosperity Accounts",
      status: "seeded",
      decision_id: DECISION,
      related_decision_ids: ["CC-DEC-088", "CC-DEC-085", "CC-DEC-086"],
      path: "/community-prosperity/",
      central_promise:
        "Every American should have the opportunity to own a stake in the long-term prosperity of the community they help build — complementing, not replacing, diversified retirement savings.",
      iconic_phrase:
        "What if citizens could become long-term investors in the prosperity of the communities they help build?",
      branches: [
        "Core question and principle",
        "Dual retirement architecture",
        "Community Prosperity Account",
        "Community Investment Units",
        "Community Equity Credits",
        "Cities as wealth builders",
        "Community Wealth metrics",
        "Healthy local competition",
        "Fiduciary safeguards",
        "Co-owner politics",
        "Foundational communities bridge",
        "Compact language",
      ],
      framework_file: "data/project/community_prosperity_framework.json",
      research_domain_title:
        "Community Equity, Community Investment Units, Civic Equity Credits, and Local Capital Formation",
    };
    const insertAt = agingIdx >= 0 ? agingIdx + 1 : civicIdx >= 0 ? civicIdx + 1 : tree.length;
    if (agingIdx >= 0) {
      tree[agingIdx].related_decision_ids = Array.from(
        new Set([...(tree[agingIdx].related_decision_ids || []), DECISION])
      );
    }
    if (civicIdx >= 0) {
      tree[civicIdx].related_decision_ids = Array.from(
        new Set([...(tree[civicIdx].related_decision_ids || []), DECISION])
      );
    }
    tree.splice(insertAt, 0, node);
  }
  ia.last_updated = "2026-08-05";
  write("data/project/website_information_architecture.json", ia);
}

{
  const sm = read("data/project/systems_map.json");
  const f = "data/project/community_prosperity_framework.json";
  if (!sm.related_framework_files.includes(f)) {
    const idx = sm.related_framework_files.indexOf(
      "data/project/prosperous_aging_framework.json"
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
    "['data/project/family_farm_prosperity_framework.json','schemas/family_farm_prosperity_framework.schema.json'],";
  const insert =
    "['data/project/family_farm_prosperity_framework.json','schemas/family_farm_prosperity_framework.schema.json'],\n  ['data/project/community_prosperity_framework.json','schemas/community_prosperity_framework.schema.json'],";
  if (!text.includes("community_prosperity_framework.json")) {
    if (!text.includes(needle)) throw new Error("validate-project-data.mjs needle not found");
    text = text.replace(needle, insert);
    fs.writeFileSync(vp, text);
  }
}

console.log("Community Prosperity Accounts registry bootstrap complete.");
