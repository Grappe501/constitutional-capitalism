import { readJson, writeJson } from "./io.mjs";

/**
 * Deterministic Completion Advancement Map.
 * Explains why overall % remains 43 and what would earn movement — without raising the dial.
 */
export function buildCompletionAdvancementMap() {
  const build = readJson("data/project/current_build_state.json");
  const layer = readJson(
    "data/project/ai_research_intelligence_layer.json"
  );
  const claim = readJson("data/research/claim_ledger.json");
  const claim003 = (claim.claims || []).find((c) => c.claim_id === "CC-CLAIM-003");

  const whyStill43 = [
    {
      id: "honesty_hold",
      statement:
        "Overall completion is an honesty hold at 43%, not a measure of research inactivity.",
      evidence: build.notes || [],
    },
    {
      id: "architecture_vs_proof",
      statement:
        "Empirical waves expand the research instrument; they do not by themselves earn dial credit.",
      evidence: [
        "County×Year layer and Counterexample Register are infrastructure for later validated diagnosis.",
        "Phase 9 Systems Intelligence Engine remains deferred; this AI layer is a research-ops precursor only.",
      ],
    },
    {
      id: "nee_claims",
      statement: "High-importance claims such as CC-CLAIM-003 remain NEE / not publication-ready.",
      evidence: claim003
        ? [
            `support_level=${claim003.support_level}`,
            `publication_readiness=${claim003.publication_readiness}`,
            claim003.phase21_audit?.disposition || "audit disposition unknown",
          ]
        : ["CC-CLAIM-003 not found"],
    },
    {
      id: "no_locked_pilot",
      statement:
        "Rose Bud / Lewisville remain investigative candidates; pilot lock and measured intervention have not earned credit.",
      evidence: [
        build.pilot_readiness_status,
        build.hyp128_site_selection_status,
      ],
    },
    {
      id: "county_demand_gap",
      statement:
        "ADWS capacity↔demand bridge is statewide; county demand gap remains NEE (no false shortages).",
      evidence: [build.arkansas_adws_bridge_status],
    },
  ];

  const ladder = [
    {
      target_percent: 50,
      label: "43 → 50",
      theme: "Validated comparative diagnosis + definition-lock fills",
      required_workstreams: [
        {
          id: "validated_comparative_diagnosis_packets",
          title: "Validated comparative diagnosis packets",
          using: [
            "County Counterexample Register",
            "County×Year observations with provenance",
          ],
          earns_credit_when:
            "Packets distinguish observed co-travel, contradictions, and missing evidence without causal overclaim.",
        },
        {
          id: "baseline_definition_locks",
          title: "Baseline definition-locks and legitimate fills",
          using: ["CC-PHASE-2.1-BASELINE-DEFINITION-LOCKS-AND-NEXT-LEGITIMATE-FILLS-1.0"],
          earns_credit_when:
            "Remaining SOURCE_UNKNOWN / definition-locked slots close with reproducible fills — not curiosity ingest.",
        },
        {
          id: "multi_year_voter_series",
          title: "Multi-year registered-voter series",
          using: ["EAVS and state voter files where available"],
          earns_credit_when:
            "Turnout denominators are longitudinal, labeled by election type, and not confused with CVAP-only rates.",
        },
      ],
    },
    {
      target_percent: 60,
      label: "50 → 60",
      theme: "Modeled relationships + legal feasibility + pilot readiness",
      required_workstreams: [
        {
          id: "causal_or_quasi_experimental_modeling",
          title: "Modeling after observation",
          earns_credit_when:
            "Causation claims appear only after explicit modeling; method wall preserved.",
        },
        {
          id: "legal_funding_feasibility",
          title: "Legal and funding feasibility for intervention packets",
          earns_credit_when:
            "Packets carry WHY_THIS_CAN_START_NOW with cited authority — labeled research assistance, not legal conclusions.",
        },
        {
          id: "field_readiness_without_false_lock",
          title: "Pilot geography field readiness",
          earns_credit_when:
            "Readiness checklists filled from field/source work; sites still not locked until selection gate fires.",
        },
        {
          id: "claim_003_evidence_module",
          title: "CC-CLAIM-003 evidence upgrade path",
          earns_credit_when:
            "Additional sourced political-economy modules justify any disposition change; no automatic upgrade.",
        },
      ],
    },
    {
      target_percent: null,
      label: "Beyond 60 (later)",
      theme: "Measured pilot → expansion → Phase 8/9",
      required_workstreams: [
        {
          id: "measured_intervention",
          title: "Pilot measurement and matched comparison",
          earns_credit_when:
            "Baseline → intervention → annual measurement exists for locked pilots.",
        },
        {
          id: "phase_9_sie",
          title: "Systems Intelligence Engine (true capstone)",
          earns_credit_when:
            "CC-DEC-097 activation gates met; not this research-ops precursor alone.",
        },
      ],
    },
  ];

  const map = {
    version: "1.0.0",
    slice_id: layer.slice_id,
    generated_at: "2026-08-12",
    decision_id: "CC-DEC-120",
    update_id: "UPD-133",
    current_overall_percent: build.overall_percent,
    dial_rule:
      "This map explains advancement paths. It does not change overall_percent. AI must not inflate the dial.",
    current_state_snapshot: {
      active_slice: build.active_slice,
      last_completed_parallel_research_slice:
        build.last_completed_parallel_research_slice,
      sources_registered: build.sources_registered,
      verified_sources: build.verified_sources,
      claims: build.claims,
      county_longitudinal_layer_status: build.county_longitudinal_layer_status,
      county_counterexample_register_status:
        build.county_counterexample_register_status,
      next_action: build.next_action,
    },
    why_still_at_current_percent: whyStill43,
    advancement_ladder: ladder,
    ai_role:
      "AI may summarize this map and suggest which evidence gaps block the next rung. AI may not raise the percent.",
  };

  writeJson("data/project/ai_research_completion_advancement_map.json", map);
  return map;
}
