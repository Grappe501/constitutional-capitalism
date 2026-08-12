/**
 * Phase 3 comparative matrix:
 * 1) Bind Phase 2 five-layer evidence onto Wave 2 systems
 * 2) Attach phase3_crosswalk domain tags for matrix index
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data/project/economic_system_comparison.json");
const systems = JSON.parse(fs.readFileSync(file, "utf8"));

const HOLDS = [
  "CC-CLAIM-003 remains NEE (concentration ≠ market power ≠ monopsony ≠ capture)",
  "HYP-125 through HYP-129 stay hypotheses / research frameworks — not promoted",
  "Observational panels do not authorize causal claims about system performance",
  "No new publication evidence panels in this bind wave",
  "Phase 3 crosswalk shows evidence coverage, not ranking or endorsement"
];

const SLICE = "CC-COMPARATIVE-SYSTEMS-PHASE-3-CROSSWALK-AND-WAVE-EXPANSION-1.0";

/** @type {Record<string, object>} */
const WAVE2 = {
  "social-democracy": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-TRUST-AND-BASELINE-DIAL-1",
      "CC-EP-FISCAL-REVENUE-SYSTEM-1",
      "CC-EP-WEALTH-BASELINE-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1", "CC-EP-HUMAN-CAPITAL-PATHWAYS-1"],
      competition: [],
      democracy: ["CC-EP-TRUST-AND-BASELINE-DIAL-1"],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: [],
      fiscal: ["CC-EP-FISCAL-REVENUE-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Social-democratic tools (tax-financed services, labor institutions, universal-ish access goals) meet Arkansas facts on HPSA/primary-care shortages, human-capital pathways, wage-productivity dials, and fiscal capacity — without claiming Nordic institutions already exist in Arkansas or that importing them would automatically close measured gaps.",
      local_examples: [
        "Rural primary-care / HPSA shortages",
        "Apprenticeship and early-adult pathway dials",
        "Federal fiscal dials as capacity context (not a state tax design)"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Healthcare access and human-capital pathway gaps are measurable constraints any social-democratic Arkansas agenda would confront",
          evidence: "CC-EP-PRIMARY-CARE-ACCESS-1; CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That Arkansas adopting social-democratic institutions would close measured gaps",
          linked: []
        },
        {
          claim: "That fiscal dials prove current Arkansas tax structure can or cannot fund such a package",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Many social-insurance expansions are legislatively discussable within federal doctrine; speech/association limits still bind.",
      arkansas_legislative: "Medicaid, education, and labor statutes are the main levers; Nordic-scale redesign is not a one-session bill.",
      local: "School-based health, workforce pathways, and local service pilots can start under existing authority.",
      county: "County health and workforce boards can pilot pieces; cannot rewrite state tax structure alone.",
      state_constitutional_amendment: "Usually not required for ordinary social-insurance statutes; required only for specific structural locks."
    },
    holds: HOLDS,
    phase3_domains: ["healthcare", "labor", "fiscal", "democracy", "wealth"]
  },
  "democratic-socialism": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
      "CC-EP-TRUST-AND-BASELINE-DIAL-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1", "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
      labor: [],
      competition: [],
      democracy: ["CC-EP-TRUST-AND-BASELINE-DIAL-1"],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Democratic-socialist ownership and planning ambitions interact with Arkansas farm ownership, rural capital, wealth concentration, and local-control culture. Measured ownership and access gaps motivate questions; they do not validate socialization pathways for Arkansas tax structure or farm title.",
      local_examples: [
        "Farm and rural capital structure overlays",
        "Ownership / retirement participation dials",
        "Local-control and trust constraints"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Ownership concentration and rural capital gaps are observable",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That democratic-socialist ownership transitions improve Arkansas farm or local ownership outcomes",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Large-scale socialization faces federal constitutional and Takings constraints; research-bound only here.",
      arkansas_legislative: "Public enterprise and cooperative statutes possible at the margin; wholesale redesign is long-horizon.",
      local: "Cooperatives and municipal utilities are the realistic local pieces (overlaps HYP-129 L2).",
      county: "County-owned utilities/hospitals exist as hybrids — not proof of democratic socialism.",
      state_constitutional_amendment: "Likely required for major ownership-regime shifts."
    },
    holds: HOLDS,
    phase3_domains: ["wealth", "agriculture", "healthcare", "democracy"]
  },
  corporatism: {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-SECTORAL-INFLUENCE-LADDER-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-WAGES-PRODUCTIVITY-1"
    ],
    observable_outcomes: {
      wealth: [],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1"],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-SECTORAL-INFLUENCE-LADDER-1"],
      democracy: ["CC-EP-COMPARISON-POLITICAL-MONEY-1"],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Corporatist peak-bargaining is not Arkansas’s present architecture. Sectoral influence, political-money, and labor dials show where organized interests already press policy — without equating that to European neocorporatism or proving capture.",
      local_examples: [
        "Sectoral influence ladder observations",
        "Political-money concentration (D04 family)",
        "Labor wage-productivity dials"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Organized sectoral influence and political-money concentration are measurable",
          evidence: "CC-EP-SECTORAL-INFLUENCE-LADDER-1; CC-EP-COMPARISON-POLITICAL-MONEY-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That Arkansas operates a corporatist regime, or that peak bargaining would improve measured dials",
          linked: ["CC-CLAIM-003"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Tripartite institutions must respect association and nondelegation constraints.",
      arkansas_legislative: "Labor-management councils and sector boards possible by statute; rare today.",
      local: "Local workforce partnerships can mimic thin corporatist coordination without peak associations.",
      county: "County economic-development boards are not corporatism.",
      state_constitutional_amendment: "Not required for ordinary coordination statutes."
    },
    holds: HOLDS,
    phase3_domains: ["competition", "democracy", "labor"]
  },
  oligarchy: {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
      "CC-EP-JOURNALISM-90DAY-1",
      "CC-EP-TRUST-AND-BASELINE-DIAL-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: [],
      competition: [],
      democracy: [
        "CC-EP-COMPARISON-POLITICAL-MONEY-1",
        "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
        "CC-EP-JOURNALISM-90DAY-1",
        "CC-EP-TRUST-AND-BASELINE-DIAL-1"
      ],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Oligarchy is a diagnostic pattern. Arkansas relevance is whether wealth, political-money, journalism capacity, and trust dials show elite-narrowed accountability — not a finding that Arkansas is an oligarchy.",
      local_examples: [
        "Political-money concentration affecting Arkansas races",
        "Journalism presence vs scrutiny sample",
        "Public trust dial"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Wealth and political-money concentration plus thin scrutiny are measurable risk conditions",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-COMPARISON-POLITICAL-MONEY-1; CC-EP-JOURNALISM-90DAY-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That dials prove Arkansas or the U.S. is an oligarchy regime",
          linked: ["CC-CLAIM-003", "CC-CLAIM-134"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Diagnostic only — counter-designs must stay inside speech and association doctrine.",
      arkansas_legislative: "Disclosure and anti-privilege statutes; no regime label from dials.",
      local: "Transparency and journalism capacity are feasible local responses.",
      county: "Participation/structure overlays (HYP-128) describe environment — not prove oligarchy.",
      state_constitutional_amendment: "Not implied by diagnostic observation."
    },
    holds: HOLDS,
    phase3_domains: ["wealth", "democracy"]
  },
  kleptocracy: {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-JOURNALISM-90DAY-1",
      "CC-EP-JOURNALISM-PUBLIC-FINANCE-1",
      "CC-EP-SECTORAL-INFLUENCE-LADDER-1"
    ],
    observable_outcomes: {
      wealth: [],
      labor: [],
      competition: ["CC-EP-SECTORAL-INFLUENCE-LADDER-1"],
      democracy: [
        "CC-EP-COMPARISON-POLITICAL-MONEY-1",
        "CC-EP-JOURNALISM-90DAY-1",
        "CC-EP-JOURNALISM-PUBLIC-FINANCE-1"
      ],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Kleptocracy denotes theft of public office for private gain. Arkansas dials on disclosure, journalism, and influence map scrutiny capacity — they do not establish kleptocratic rule. Use as a failure-mode boundary, not a state classification.",
      local_examples: [
        "Journalism and public-finance-of-news dials",
        "Political-money disclosure concentration"
      ],
      status: "low"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Scrutiny capacity (journalism, disclosure) is measurable",
          evidence: "CC-EP-JOURNALISM-90DAY-1; CC-EP-COMPARISON-POLITICAL-MONEY-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That Arkansas meets comparative-politics criteria for kleptocracy",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Anti-corruption tools must respect due process and speech doctrine.",
      arkansas_legislative: "Ethics, procurement, and disclosure statutes are the levers.",
      local: "Local procurement transparency is feasible now.",
      county: "County audit capacity can be strengthened without regime labels.",
      state_constitutional_amendment: "Not required for ordinary ethics statutes."
    },
    holds: HOLDS,
    phase3_domains: ["democracy", "competition"]
  },
  "social-market-economics": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-WEALTH-BASELINE-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1"],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-MARKET-DYNAMICS-SYSTEM-1"],
      democracy: [],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Social-market (Soziale Marktwirtschaft) pairs contestable markets with social insurance. Arkansas competition, labor, healthcare-access, and wealth dials show the gap between that ideal and measured U.S./Arkansas conditions — without claiming Germany’s institutions transfer intact.",
      local_examples: [
        "Competition enforcement and entry/exit dials",
        "Primary-care access shortages",
        "Wage-productivity dials"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Competition and social-access dials can be compared to social-market aspirations without inventing performance scores",
          evidence: "CC-EP-COMPETITION-ENFORCEMENT-1; CC-EP-PRIMARY-CARE-ACCESS-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That Arkansas can replicate postwar German social-market outcomes by statute alone",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Competition-order + social-insurance mix is largely legislative within federal bounds.",
      arkansas_legislative: "Insurance, labor, and competition-adjacent statutes are levers; cultural-institutional transfer is not.",
      local: "Local insurance and workforce pilots possible at the margin.",
      county: "County health/workforce pieces only.",
      state_constitutional_amendment: "Not required for ordinary social-market-style statutes."
    },
    holds: HOLDS,
    phase3_domains: ["competition", "labor", "healthcare", "wealth"]
  },
  ordoliberalism: {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-WEALTH-BASELINE-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: [],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-MARKET-DYNAMICS-SYSTEM-1"],
      democracy: ["CC-EP-COMPARISON-POLITICAL-MONEY-1"],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Ordoliberalism’s economic constitution (rules against privilege and monopoly) is a close comparative neighbor to CC. Arkansas competition-enforcement and political-money dials show how far measured conditions sit from a strong competition order — without equating U.S. antitrust counts to Freiburg doctrine.",
      local_examples: [
        "DOJ ATR / competition enforcement dials",
        "Entry/exit and market-dynamics panels",
        "Political-money concentration as privilege-risk context"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Enforcement activity and privilege-risk dials are measurable beside ordoliberal claims",
          evidence: "CC-EP-COMPETITION-ENFORCEMENT-1; CC-EP-COMPARISON-POLITICAL-MONEY-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That current enforcement levels equal or refute an ordoliberal order in Arkansas",
          linked: ["CC-CLAIM-003"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Competition-order ideas are largely statutory/federal; state can tighten privilege rules at the margin.",
      arkansas_legislative: "Procurement, licensing, and anti-privilege statutes feasible; full economic constitution is long-horizon.",
      local: "Local procurement fairness is the realistic piece now.",
      county: "County purchasing rules only.",
      state_constitutional_amendment: "Optional for locking competition principles; not required for ordinary statutes."
    },
    holds: HOLDS,
    phase3_domains: ["competition", "democracy", "wealth"]
  },
  "shareholder-primacy-capitalism": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1", "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1"],
      competition: [],
      democracy: ["CC-EP-COMPARISON-POLITICAL-MONEY-1"],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Shareholder-primacy governance dominates much U.S. corporate law practice. Arkansas workers and savers encounter it through wage-productivity dials, retirement ownership, and wealth concentration — not through a separate Arkansas corporate code experiment.",
      local_examples: [
        "Ownership and retirement participation",
        "Wage-productivity dials",
        "Wealth concentration beside residual-claimant doctrine"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Ownership concentration and labor dials are measurable under shareholder-primacy-dominated markets",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-WAGES-PRODUCTIVITY-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That shareholder primacy uniquely caused measured gaps versus stakeholder or social-market alternatives",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Corporate fiduciary default is largely state corporate law + federal securities.",
      arkansas_legislative: "Arkansas Business Corporation Act amendments possible; federal securities dominate public firms.",
      local: "Local cooperatives and benefit entities are exit options, not reforms of primacy.",
      county: "N/A for corporate fiduciary default.",
      state_constitutional_amendment: "Not required for ordinary corporate-law changes."
    },
    holds: HOLDS,
    phase3_domains: ["wealth", "labor", "democracy"]
  },
  "welfare-capitalism": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
      "CC-EP-FISCAL-REVENUE-SYSTEM-1",
      "CC-EP-WAGES-PRODUCTIVITY-1"
    ],
    observable_outcomes: {
      wealth: [],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1", "CC-EP-HUMAN-CAPITAL-PATHWAYS-1"],
      competition: [],
      democracy: [],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: [],
      fiscal: ["CC-EP-FISCAL-REVENUE-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Welfare capitalism (employer or state social benefits within capitalism) meets Arkansas healthcare-access and pathway gaps. Employer-based coverage and residual public programs already exist; measured HPSA and pathway dials show remaining shortfalls without proving a specific welfare-capitalist model.",
      local_examples: [
        "Primary-care access shortages",
        "Human-capital pathway dials",
        "Fiscal capacity context"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Access and pathway shortfalls are observable under existing mixed welfare arrangements",
          evidence: "CC-EP-PRIMARY-CARE-ACCESS-1; CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That expanding employer or state welfare packages would close Arkansas HPSA and pathway gaps",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Benefit expansions are mostly legislative within federal doctrine.",
      arkansas_legislative: "Medicaid, workforce, and education statutes are primary levers.",
      local: "School-based health and apprenticeship pieces are buildable now (HYP-129 L1 overlap).",
      county: "County health departments and workforce boards.",
      state_constitutional_amendment: "Not required for ordinary benefit statutes."
    },
    holds: HOLDS,
    phase3_domains: ["healthcare", "labor", "fiscal"]
  },
  neoliberalism: {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-FISCAL-REVENUE-SYSTEM-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: [],
      competition: ["CC-EP-MARKET-DYNAMICS-SYSTEM-1", "CC-EP-COMPETITION-ENFORCEMENT-1"],
      democracy: [],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: [],
      fiscal: ["CC-EP-FISCAL-REVENUE-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Neoliberalism (contested label) emphasizes market construction, privatization, and fiscal restraint. Arkansas relevance is how privatization/marketization agendas interact with rural access gaps, wealth concentration, and fiscal dials — not a claim that Arkansas is a completed neoliberal regime.",
      local_examples: [
        "Rural healthcare access under marketized delivery",
        "Fiscal dials as restraint/capacity context",
        "Entry/exit and competition dials"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Market-dynamics, fiscal, and access dials are measurable beside neoliberal policy claims",
          evidence: "CC-EP-MARKET-DYNAMICS-SYSTEM-1; CC-EP-FISCAL-REVENUE-SYSTEM-1; CC-EP-PRIMARY-CARE-ACCESS-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That neoliberal reforms uniquely caused or would close Arkansas rural access gaps",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Privatization and market-construction agendas are largely legislative.",
      arkansas_legislative: "Procurement, insurance, and education-choice statutes are levers.",
      local: "Local contracting choices exist within state law.",
      county: "Limited.",
      state_constitutional_amendment: "Sometimes sought for tax/spending locks; not required for all neoliberal tools."
    },
    holds: HOLDS,
    phase3_domains: ["competition", "fiscal", "healthcare", "wealth"]
  },
  "mixed-economy": {
    wave: "phase3_wave2",
    slice_id: SLICE,
    evidence_panel_ids: [
      "CC-EP-FISCAL-REVENUE-SYSTEM-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: [],
      competition: ["CC-EP-MARKET-DYNAMICS-SYSTEM-1"],
      democracy: [],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"],
      fiscal: ["CC-EP-FISCAL-REVENUE-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Most real economies — including Arkansas — are mixed. Phase 3 uses this page as the baseline hybrid against which purer ideals (laissez-faire, democratic socialism, social democracy) are compared using the same dials.",
      local_examples: [
        "Existing public–private mix in health, education, and agriculture",
        "Fiscal and market-dynamics dials as hybrid markers",
        "Rural capital structure under mixed institutions"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Arkansas already exhibits mixed public–private structure across measured domains",
          evidence: "CC-EP-FISCAL-REVENUE-SYSTEM-1; CC-EP-PRIMARY-CARE-ACCESS-1; CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "That any single ideal-type better explains Arkansas outcomes than the mixed baseline",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Mixed economy is the status quo; shifts are incremental and legislative.",
      arkansas_legislative: "Every session adjusts the mix.",
      local: "Local pilots change the mix at the margin (HYP-129).",
      county: "Same.",
      state_constitutional_amendment: "Only for locking large mix shifts."
    },
    holds: HOLDS,
    phase3_domains: ["fiscal", "healthcare", "competition", "wealth", "agriculture"]
  }
};

/** Ensure priority systems also carry phase3_domains for the crosswalk. */
const PRIORITY_DOMAINS = {
  "constitutional-capitalism": [
    "wealth",
    "labor",
    "competition",
    "democracy",
    "healthcare",
    "agriculture"
  ],
  plutocracy: ["wealth", "democracy"],
  "crony-capitalism": ["democracy", "competition"],
  "laissez-faire-capitalism": ["labor", "competition", "wealth", "healthcare", "agriculture"],
  "stakeholder-capitalism": ["wealth", "labor", "agriculture"]
};

let wave2 = 0;
let tagged = 0;

for (const sys of systems) {
  const layer = WAVE2[sys.slug];
  if (layer) {
    const { phase3_domains, ...phase2 } = layer;
    sys.phase2_evidence = phase2;
    sys.phase3_crosswalk = {
      slice_id: SLICE,
      domains: phase3_domains,
      evidence_density: "bound",
      note: "Coverage of shared dials — not a performance ranking."
    };
    wave2 += 1;
  } else if (PRIORITY_DOMAINS[sys.slug] && sys.phase2_evidence) {
    sys.phase3_crosswalk = {
      slice_id: SLICE,
      domains: PRIORITY_DOMAINS[sys.slug],
      evidence_density: "bound",
      note: "Coverage of shared dials — not a performance ranking."
    };
    tagged += 1;
  }
}

fs.writeFileSync(file, JSON.stringify(systems, null, 2) + "\n", "utf8");
console.log(`[OK] Wave2 phase2_evidence bound: ${wave2}; priority phase3 tags: ${tagged}`);
