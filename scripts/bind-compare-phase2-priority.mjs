/**
 * Bind Phase 2 evidence layers onto priority comparison systems.
 * Does not invent panels — joins existing CC-EP-* ids only.
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
  "No new publication evidence panels in this bind wave"
];

/** @type {Record<string, object>} */
const PRIORITY = {
  "constitutional-capitalism": {
    wave: "priority_1",
    slice_id: "CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0",
    evidence_panel_ids: [
      "CC-EP-TRUST-AND-BASELINE-DIAL-1",
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1",
      "CC-EP-AR-AG-PROCESSING-ACCESS-1",
      "CC-EP-JOURNALISM-90DAY-1",
      "CC-EP-AR-COMMUNITY-CONTEXT-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1", "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1", "CC-EP-HUMAN-CAPITAL-PATHWAYS-1"],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-MARKET-DYNAMICS-SYSTEM-1"],
      democracy: [
        "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
        "CC-EP-TRUST-AND-BASELINE-DIAL-1",
        "CC-EP-JOURNALISM-90DAY-1"
      ],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1", "CC-EP-AR-AG-PROCESSING-ACCESS-1"]
    },
    arkansas_relevance: {
      summary:
        "Arkansas is the primary test geography: Delta and rural hospital access, farm/processing structure, local banking, journalism presence, and school-centered prosperity hubs (Rose Bud LCL; Clinton falsification posture; Searcy/White County context; Lafayette/Lewisville pathway) constrain what any CC transition can honestly claim.",
      local_examples: [
        "Rose Bud (HYP-122 / Rural Prosperity Campus research)",
        "Clinton (processing-access falsification posture)",
        "Searcy / White County context",
        "Lafayette County / Lewisville (community-wealth pathway)"
      ],
      status: "state_specific"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Wealth concentration and ownership gaps are observable constraints on broad opportunity claims",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1; W01–W05 family",
          status: "observational_support"
        },
        {
          claim: "Local capital, journalism, and rural structure gaps are measurable in Arkansas settings",
          evidence: "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1; CC-EP-JOURNALISM-90DAY-1; CC-EP-AR-COMMUNITY-CONTEXT-1",
          status: "observational_support"
        },
        {
          claim: "Labor and competition dials show structural pressure that anti-domination design must confront",
          evidence: "CC-EP-WAGES-PRODUCTIVITY-1; CC-EP-COMPETITION-ENFORCEMENT-1; L01/L02/L04; C03",
          status: "observational_support"
        }
      ],
      contradicting: [
        {
          claim: "No project claim that CC mechanisms are already validated by outcome trials",
          evidence: "LCL case-study posture; living_community_laboratories investigative rule",
          status: "boundary_contradicts_overclaim"
        }
      ],
      not_enough_evidence: [
        {
          claim: "Prosperity-fund / ownership-transition outcomes under CC design",
          linked: ["HYP-123", "HYP-124", "HYP-129"]
        },
        {
          claim: "Campaign-finance locality reforms improve equal citizenship (HYP-125)",
          linked: ["HYP-125"]
        },
        {
          claim: "Distributed civic commons / between-election participation (HYP-126)",
          linked: ["HYP-126"]
        },
        {
          claim: "Age-16 local suffrage capability/participation/habit/system effects (HYP-127)",
          linked: ["HYP-127"]
        },
        {
          claim: "Civic engagement × community structure causal pathways (HYP-128)",
          linked: ["HYP-128"]
        },
        {
          claim: "Production concentration equals market power / monopsony / capture",
          linked: ["CC-CLAIM-003"]
        }
      ]
    },
    transition_feasibility: {
      constitutional:
        "Many anti-domination aims must remain inside current federal constitutional doctrine; Track B reforms stay research-bound.",
      arkansas_legislative:
        "Layer-1 magnet hub / CTE / apprenticeship pieces can often use existing statutes; larger ownership and campaign-finance redesigns need legislation or amendments (HYP-129 layers).",
      local:
        "Towns and school districts can host education–workforce–food hub pieces and nonpartisan civic process pilots under existing local authority.",
      county:
        "Counties can compare structure overlays and participation (HYP-128) and host matched-control evaluation — not statewide mandates.",
      state_constitutional_amendment:
        "Required only for Layer-4 structural items after evidence and legal gates; not a prerequisite for Layer-1 programs."
    },
    holds: HOLDS
  },
  plutocracy: {
    wave: "priority_1",
    slice_id: "CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0",
    evidence_panel_ids: [
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
      "CC-EP-TRUST-AND-BASELINE-DIAL-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1", "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
      labor: [],
      competition: [],
      democracy: [
        "CC-EP-COMPARISON-POLITICAL-MONEY-1",
        "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
        "CC-EP-TRUST-AND-BASELINE-DIAL-1"
      ],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Arkansas relevance is observational: statewide wealth dials, federal candidate-receipt concentration affecting Arkansas races, and local journalism capacity that mediates whether wealth-to-power translation is publicly scrutinized — not a finding that Arkansas is a completed plutocracy.",
      local_examples: [
        "Arkansas federal candidate-receipt concentration (D04 family)",
        "Local journalism presence vs scrutiny (90-day sample)"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Wealth concentration and political-money concentration are measurable",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-COMPARISON-POLITICAL-MONEY-1; D04; W02",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "Observable concentration proves the United States or Arkansas is a plutocracy regime",
          linked: ["CC-CLAIM-134", "CC-CLAIM-003"]
        },
        {
          claim: "Wealth concentration causally captures democratic accountability",
          linked: ["CC-CLAIM-003"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Diagnostic label — not a transition target. Counter-designs must respect speech and association doctrine.",
      arkansas_legislative: "Disclosure and locality research (HYP-125) may inform statutes; no regime reclassification from dials alone.",
      local: "Local transparency and journalism capacity can be strengthened without declaring plutocracy.",
      county: "County participation/structure overlays (HYP-128) can describe environment — not prove capture.",
      state_constitutional_amendment: "Not implied by diagnostic observation."
    },
    holds: HOLDS
  },
  "crony-capitalism": {
    wave: "priority_1",
    slice_id: "CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0",
    evidence_panel_ids: [
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
      "CC-EP-SECTORAL-INFLUENCE-LADDER-1",
      "CC-EP-JOURNALISM-90DAY-1",
      "CC-EP-JOURNALISM-PUBLIC-FINANCE-1",
      "CC-EP-COMPETITION-ENFORCEMENT-1"
    ],
    observable_outcomes: {
      wealth: [],
      labor: [],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-SECTORAL-INFLUENCE-LADDER-1"],
      democracy: [
        "CC-EP-COMPARISON-POLITICAL-MONEY-1",
        "CC-EP-DEMOCRACY-POLITICAL-MONEY-1",
        "CC-EP-JOURNALISM-90DAY-1",
        "CC-EP-JOURNALISM-PUBLIC-FINANCE-1"
      ],
      healthcare: [],
      agriculture: []
    },
    arkansas_relevance: {
      summary:
        "Arkansas relevance is case-and-disclosure based: OpenFEC locality probes, sectoral influence ladder (not a capture shortcut), journalism deserts that reduce scrutiny, and competition enforcement dials — without auto-promoting any industry to proven crony capture.",
      local_examples: [
        "OpenFEC locality research track",
        "Arkansas journalism 90-day sample",
        "Sectoral influence ladder observations"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Political-money concentration and thin local scrutiny are measurable risk conditions for privilege politics",
          evidence: "CC-EP-COMPARISON-POLITICAL-MONEY-1; CC-EP-JOURNALISM-90DAY-1; D04",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "Any named Arkansas sector is proven captured / crony-ruled from concentration dials alone",
          linked: ["CC-CLAIM-003", "CC-CLAIM-134"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Anti-crony reforms must avoid viewpoint discrimination and remain within federal doctrine.",
      arkansas_legislative: "Disclosure, procurement, and conflict rules are legislative levers; proof remains case-by-case.",
      local: "Local procurement transparency and nonpartisan civic hubs can reduce privilege without regime labels.",
      county: "County-level disclosure and journalism capacity are feasible pilots.",
      state_constitutional_amendment: "Not required for most transparency pilots."
    },
    holds: HOLDS
  },
  "laissez-faire-capitalism": {
    wave: "priority_1",
    slice_id: "CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0",
    evidence_panel_ids: [
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-COMPETITION-ENFORCEMENT-1",
      "CC-EP-MARKET-DYNAMICS-SYSTEM-1",
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-COMPARISON-POLITICAL-MONEY-1",
      "CC-EP-PRIMARY-CARE-ACCESS-1",
      "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1"],
      competition: ["CC-EP-COMPETITION-ENFORCEMENT-1", "CC-EP-MARKET-DYNAMICS-SYSTEM-1"],
      democracy: ["CC-EP-COMPARISON-POLITICAL-MONEY-1"],
      healthcare: ["CC-EP-PRIMARY-CARE-ACCESS-1"],
      agriculture: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "A thin-rule ideal would leave Delta counties, rural hospital/HPSA gaps, farm and processing access, and workforce participation to market correction alone. Existing Arkansas dials show where that bet is empirically contested — without claiming markets never work or that laissez-faire is the current Arkansas regime.",
      local_examples: [
        "Delta and rural HPSA / primary-care shortages",
        "County NASS farm structure overlays",
        "Workforce and wage-productivity dials"
      ],
      status: "high"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Entry/exit and enforcement dials can be measured without inventing a national concentration score",
          evidence: "CC-EP-MARKET-DYNAMICS-SYSTEM-1; CC-EP-COMPETITION-ENFORCEMENT-1; C03",
          status: "observational_support"
        }
      ],
      contradicting: [
        {
          claim: "Pure market self-correction is a complete answer to rural healthcare and local capital gaps in measured Arkansas settings",
          evidence: "CC-EP-PRIMARY-CARE-ACCESS-1; CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1 — gaps persist under existing market arrangements",
          status: "observational_tension"
        }
      ],
      not_enough_evidence: [
        {
          claim: "Observed gaps prove laissez-faire ideology caused them, or that thicker rules would necessarily close them",
          linked: []
        },
        {
          claim: "Production concentration equals monopsony or capture under thin rules",
          linked: ["CC-CLAIM-003"]
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Night-watchman ideal is constitutionally discussable; many U.S. programs already exceed it.",
      arkansas_legislative: "Moving further toward thin rules would require repealing or shrinking existing health, education, and development programs — a legislative choice, not observation.",
      local: "Towns cannot unilaterally impose pure laissez-faire; they can reduce local privilege and keep markets contestable.",
      county: "County pilots cannot erase state/federal floors.",
      state_constitutional_amendment: "Not required to debate the ideal; required only for specific structural repeals."
    },
    holds: HOLDS
  },
  "stakeholder-capitalism": {
    wave: "priority_1",
    slice_id: "CC-COMPARATIVE-SYSTEMS-PHASE-2-EVIDENCE-INTEGRATION-1.0",
    evidence_panel_ids: [
      "CC-EP-WEALTH-BASELINE-1",
      "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
      "CC-EP-WAGES-PRODUCTIVITY-1",
      "CC-EP-HUMAN-CAPITAL-PATHWAYS-1",
      "CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"
    ],
    observable_outcomes: {
      wealth: ["CC-EP-WEALTH-BASELINE-1", "CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1"],
      labor: ["CC-EP-WAGES-PRODUCTIVITY-1", "CC-EP-HUMAN-CAPITAL-PATHWAYS-1"],
      competition: [],
      democracy: [],
      healthcare: [],
      agriculture: ["CC-EP-RURAL-LOCAL-CAPITAL-SYSTEM-1"]
    },
    arkansas_relevance: {
      summary:
        "Stakeholder rhetoric meets Arkansas facts on ownership concentration, retirement participation, wage-productivity dials, and rural capital access. Soft ESG/governance pledges are not yet evidenced as Arkansas ownership or labor outcomes.",
      local_examples: [
        "Ownership and retirement participation dials",
        "Rural local-capital system observations",
        "Apprenticeship / human-capital pathway dials"
      ],
      status: "medium"
    },
    evidence_verdicts: {
      supporting: [
        {
          claim: "Broader-purpose language is popular; wealth and ownership concentration remain measurable regardless of pledges",
          evidence: "CC-EP-WEALTH-BASELINE-1; CC-EP-OWNERSHIP-RETIREMENT-SYSTEM-1",
          status: "observational_support"
        }
      ],
      contradicting: [],
      not_enough_evidence: [
        {
          claim: "Voluntary stakeholder / ESG statements redistribute residual claims or local ownership in Arkansas",
          linked: []
        },
        {
          claim: "Stakeholder governance substitutes for constitutional accountability of private power",
          linked: []
        }
      ]
    },
    transition_feasibility: {
      constitutional: "Private governance codes are largely voluntary; hard duties require statute or charter law.",
      arkansas_legislative: "Benefit-entity and disclosure statutes possible; not proven by rhetoric.",
      local: "Worker voice, apprenticeship, and cooperative ownership pieces can be piloted locally (overlaps HYP-129 L1–L2).",
      county: "County workforce boards can expand pathways without statewide stakeholder mandates.",
      state_constitutional_amendment: "Not required for voluntary or ordinary statutory stakeholder tools."
    },
    holds: HOLDS
  }
};

let n = 0;
for (const sys of systems) {
  const layer = PRIORITY[sys.slug];
  if (!layer) continue;
  sys.phase2_evidence = layer;
  n += 1;
}

fs.writeFileSync(file, JSON.stringify(systems, null, 2) + "\n", "utf8");
console.log(`[OK] Bound phase2_evidence on ${n} priority systems`);
