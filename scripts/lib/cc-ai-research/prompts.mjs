import { GOVERNANCE_PREAMBLE } from "./permissions.mjs";

const MODE_INSTRUCTIONS = {
  county_living_systems: `Analyze ONE county using only the provided verified observations and provenance.
Describe major changes across available years. Identify statistically interesting co-movements, contradictions, missing information, and hypotheses worth testing.
Do not infer causation. Prefer counterexamples when the pack includes them.`,

  comparative_systems: `Compare the provided counties using only verified observations.
Do not make causal claims. Flag definition mismatches (e.g., turnout-of-CVAP vs turnout-of-registered). Privilege counterexamples.`,

  hypothesis_stress: `Stress-test the hypothesis using only provided evidence.
Separate: supporting observations, contradicting observations, ambiguous patterns, and missing evidence required to move the hypothesis.
Do not promote the hypothesis to doctrine.`,

  evidence_gap: `List the specific evidence gaps that block stronger claims or diagnosis packets.
Be concrete about what dataset, geography, years, and denominator would close each gap.`,

  counterexample: `Surface counterexamples to common co-travel assumptions in the pack.
If the Counterexample Register already enumerates cases, summarize them faithfully and note remaining unknowns.`,

  claim_auditor: `Audit the claim against its ledger fields and cited source IDs only.
State what would be needed to move from NEE / requires_additional_research toward supported — without inventing that evidence.`,

  completion_advancement_map: `Explain the Completion Advancement Map.
Answer: why we remain at the current honesty-hold percent, and what specific evidence/modeling/legal/manuscript work would earn movement to the next rungs.
Do not raise or recommend raising the dial in this turn.`,
};

export function buildMessages(mode, evidencePack, userQuestion) {
  const modeHelp = MODE_INSTRUCTIONS[mode] || "Follow governance rules.";
  const question =
    userQuestion ||
    defaultQuestion(mode, evidencePack);

  return [
    { role: "system", content: GOVERNANCE_PREAMBLE },
    {
      role: "system",
      content: `Analyst mode: ${mode}\n\n${modeHelp}`,
    },
    {
      role: "user",
      content: `${question}\n\n--- EVIDENCE PACK (authoritative; do not contradict with memory) ---\n${JSON.stringify(evidencePack, null, 2)}`,
    },
  ];
}

function defaultQuestion(mode, pack) {
  switch (mode) {
    case "county_living_systems": {
      const c = pack.county?.counties?.[0];
      const name = c?.county || "the selected county";
      return `Describe major changes for ${name} across available years. Identify interesting relationships, contradictions, missing information, and hypotheses worth testing. Do not infer causation.`;
    }
    case "comparative_systems": {
      const names = (pack.counties?.counties || [])
        .map((c) => c.county)
        .join(" vs ");
      return `Compare ${names || "the counties"} without making causal claims.`;
    }
    case "hypothesis_stress":
      return `What evidence currently supports, contradicts, or leaves unresolved ${pack.hypothesis?.canonical_hypothesis_id || "the hypothesis"}?`;
    case "evidence_gap":
      return "What data gaps prevent stronger testing of rural healthcare, civic participation, and capacity↔demand hypotheses?";
    case "counterexample":
      return "Find counties/patterns that contradict the assumption that economic distress corresponds with low civic participation — using only the register and observations provided.";
    case "claim_auditor":
      return `What evidence currently supports ${pack.claim?.claim?.claim_id || "the claim"}, and what would be needed to move it from NEE toward supported?`;
    case "completion_advancement_map":
      return "Why are we still at the honesty-hold completion percent, and what specific work would move us from 43 → 50 → 60 without artificially raising the number?";
    default:
      return "Analyze the evidence pack under Constitutional Capitalism governance rules.";
  }
}
