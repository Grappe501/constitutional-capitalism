import { readJson } from "./io.mjs";

function slimMetric(m) {
  if (!m || typeof m !== "object") return m;
  return {
    value: m.value,
    unit: m.unit ?? null,
    source_id: m.source_id ?? null,
    definition: m.definition ?? null,
    election_type: m.election_type ?? null,
  };
}

function slimCounty(county) {
  return {
    fips: county.fips,
    county: county.county,
    role: county.role,
    timeline: (county.timeline || []).map((row) => ({
      year: row.year,
      metrics: Object.fromEntries(
        Object.entries(row.metrics || {}).map(([k, v]) => [k, slimMetric(v)])
      ),
    })),
  };
}

export function getCountyPack(fipsList) {
  const explorer = readJson(
    "data/project/arkansas_county_living_systems_explorer.json"
  );
  const wanted = new Set((fipsList || []).map(String));
  const counties = (explorer.counties || [])
    .filter((c) => wanted.size === 0 || wanted.has(String(c.fips)))
    .map(slimCounty);
  return {
    source: "data/project/arkansas_county_living_systems_explorer.json",
    method_wall: explorer.method_wall,
    not: explorer.not,
    research_questions: explorer.research_questions,
    compare_metrics: explorer.compare_metrics,
    counties,
  };
}

export function getCounterexamplePack() {
  const reg = readJson(
    "data/project/arkansas_county_counterexample_register.json"
  );
  return {
    source: "data/project/arkansas_county_counterexample_register.json",
    version: reg.version,
    hypotheses: reg.hypotheses || [],
  };
}

export function getClaimPack(claimId) {
  const ledger = readJson("data/research/claim_ledger.json");
  const claim = (ledger.claims || []).find(
    (c) => c.claim_id === claimId || c.claim_id === `CC-CLAIM-${claimId}`
  );
  if (!claim) {
    return { source: "data/research/claim_ledger.json", found: false, claim_id: claimId };
  }
  return {
    source: "data/research/claim_ledger.json",
    found: true,
    claim: {
      claim_id: claim.claim_id,
      claim_text: claim.claim_text,
      support_level: claim.support_level,
      evidence_strength: claim.evidence_strength,
      consensus_status: claim.consensus_status,
      source_ids: claim.source_ids,
      opposing_evidence: claim.opposing_evidence,
      uncertainty: claim.uncertainty,
      fact_check_status: claim.fact_check_status,
      publication_readiness: claim.publication_readiness,
      phase21_audit: claim.phase21_audit || null,
      phase21_repair: claim.phase21_repair || null,
    },
  };
}

export function getHypothesisPack(hypId) {
  const raw = String(hypId || "").toUpperCase();
  const registry = readJson("data/project/ai_research_object_registry.json");
  const aliases = registry.object_families.find((f) => f.prefix === "CC-HYP-")
    ?.aliases || {};
  const canonical =
    aliases[raw] ||
    aliases[raw.replace("CC-", "")] ||
    (raw.startsWith("CC-HYP-") ? raw : null) ||
    (raw === "HYP-128" || raw === "128"
      ? "CC-HYP-CIVIC-ENGAGEMENT-AND-COMMUNITY-STRUCTURE"
      : raw);

  const site = readJson(
    "data/project/arkansas_hyp128_site_selection_model.json"
  );
  const burden = readJson("data/project/proof_burden_registry.json");
  const counter = getCounterexamplePack();
  const relatedBurden = Object.entries(burden)
    .filter(
      ([, v]) =>
        v &&
        typeof v === "object" &&
        (v.hypothesis_id === canonical ||
          v.canonical_hypothesis_id === canonical ||
          v.incubator_alias === raw ||
          String(v.hypothesis_id || "").includes("128"))
    )
    .map(([k, v]) => ({ key: k, ...v }));

  return {
    query: hypId,
    canonical_hypothesis_id: canonical,
    site_selection_model: {
      source: "data/project/arkansas_hyp128_site_selection_model.json",
      hypothesis_id: site.hypothesis_id,
      incubator_alias: site.incubator_alias,
      purpose: site.purpose,
      status: site.status,
      not: site.not,
      selection_criteria: site.selection_criteria,
      experimental_framework: site.experimental_framework,
    },
    proof_burden_entries: relatedBurden,
    counterexample_hypotheses: counter.hypotheses,
  };
}

export function getEvidenceGapPack() {
  const build = readJson("data/project/current_build_state.json");
  const counter = getCounterexamplePack();
  const adws = readJson("data/project/arkansas_adws_demand_cip_bridge.json");
  const missingFromCounter = [];
  for (const h of counter.hypotheses || []) {
    for (const m of h.missing_data_cases || h.missing || h.missing_evidence || []) {
      missingFromCounter.push({
        hypothesis_id: h.hypothesis_id || h.id,
        missing: m,
      });
    }
  }
  return {
    build_holds: {
      overall_percent: build.overall_percent,
      notes: build.notes,
      next_action: build.next_action,
      county_demand_status: build.arkansas_adws_bridge_status,
      turnout_status: build.county_turnout_status,
      pilot_readiness_status: build.pilot_readiness_status,
    },
    adws_bridge: {
      source: "data/project/arkansas_adws_demand_cip_bridge.json",
      status: adws.status || adws.bridge_status || null,
      scope_note: adws.scope_note || adws.notes || null,
      known_gap: "County-level demand allocation remains NEE; statewide bridge must not invent county shortages.",
    },
    counterexample_missing: missingFromCounter,
    structural_known_gaps: [
      "Multi-year registered-voter series beyond EAVS 2024 snapshot",
      "County-allocated ADWS demand (statewide only today)",
      "Validated comparative diagnosis packets",
      "Local hospital closure series for designated counties",
      "Field readiness for Rose Bud / Lewisville (candidates, not locks)",
    ],
  };
}

export function buildEvidencePack(mode, params = {}) {
  const registry = readJson("data/project/ai_research_object_registry.json");
  const base = {
    mode,
    generated_for: "CC-AI-RESEARCH-INTELLIGENCE-LAYER-1.0",
    registry_version: registry.version,
    permissions: {
      ai_may: registry.write_authority || "read_only_for_ai",
      note: "AI may observe retrieved packs only; canonical writes require human approval.",
    },
  };

  switch (mode) {
    case "county_living_systems": {
      const fips = params.fips
        ? [params.fips]
        : (params.fips_list || []).length
          ? params.fips_list
          : ["05145"];
      return {
        ...base,
        county: getCountyPack(fips),
        counterexamples: getCounterexamplePack(),
      };
    }
    case "comparative_systems": {
      const fips =
        params.fips_list?.length >= 2
          ? params.fips_list
          : [params.fips_a || "05145", params.fips_b || "05073"];
      return {
        ...base,
        counties: getCountyPack(fips),
        counterexamples: getCounterexamplePack(),
        instruction:
          "Compare without causal claims. Privilege counterexamples. Note definition mismatches.",
      };
    }
    case "hypothesis_stress":
      return {
        ...base,
        hypothesis: getHypothesisPack(params.hypothesis_id || "HYP-128"),
        counties: getCountyPack(
          params.fips_list || registry.designated_counties.map((c) => c.fips)
        ),
        counterexamples: getCounterexamplePack(),
      };
    case "evidence_gap":
      return { ...base, gaps: getEvidenceGapPack() };
    case "counterexample":
      return { ...base, counterexamples: getCounterexamplePack() };
    case "claim_auditor":
      return {
        ...base,
        claim: getClaimPack(params.claim_id || "CC-CLAIM-003"),
      };
    case "completion_advancement_map":
      return {
        ...base,
        note: "Prefer deterministic Completion Advancement Map artifact; AI may only explain it.",
        map: readJson(
          "data/project/ai_research_completion_advancement_map.json"
        ),
      };
    default:
      throw new Error(`Unknown analyst mode: ${mode}`);
  }
}
