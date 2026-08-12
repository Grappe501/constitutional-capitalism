import { buildEvidencePack } from "./retrieve.mjs";
import { buildMessages } from "./prompts.mjs";
import { chatCompletion, getApiKey } from "./openai.mjs";
import { buildCompletionAdvancementMap } from "./completion-map.mjs";
import { readJson, writeJson } from "./io.mjs";
import { AI_MAY, AI_MUST_NOT } from "./permissions.mjs";

function deterministicAnalysis(mode, pack) {
  if (mode === "completion_advancement_map") {
    const map = pack.map || buildCompletionAdvancementMap();
    const why = (map.why_still_at_current_percent || [])
      .map((w) => `- **${w.id}**: ${w.statement}`)
      .join("\n");
    const ladder = (map.advancement_ladder || [])
      .map((rung) => {
        const items = (rung.required_workstreams || [])
          .map((w) => `  - ${w.title}: ${w.earns_credit_when}`)
          .join("\n");
        return `### ${rung.label} — ${rung.theme}\n${items}`;
      })
      .join("\n\n");
    return {
      kind: "deterministic",
      markdown: `## Observed\nCurrent honesty-hold overall percent: **${map.current_overall_percent}%**.\nDial rule: ${map.dial_rule}\n\n## Why still at ${map.current_overall_percent}%?\n${why}\n\n## Advancement ladder\n${ladder}\n\n## Human decision required\nChoose which workstream to fund next. Do not inflate the dial.`,
    };
  }

  if (mode === "counterexample") {
    const hyps = pack.counterexamples?.hypotheses || [];
    const blocks = hyps
      .map((h) => {
        const id = h.hypothesis_id || h.id || "hyp";
        const title = h.claim || h.title || "";
        const contra = h.strongest_contradictory_pattern
          ? `  - ${h.strongest_contradictory_pattern.county} (${h.strongest_contradictory_pattern.fips}) x=${h.strongest_contradictory_pattern.x_value} y=${h.strongest_contradictory_pattern.y_value}`
          : "  - (none listed)";
        const cases = (h.counterexamples || [])
          .slice(0, 5)
          .map(
            (x) =>
              `  - ${x.county} (${x.fips}): ${x.pattern} — ${x.why_valuable || ""}`
          )
          .join("\n");
        const missing = (h.missing_data_cases || h.missing || [])
          .slice(0, 5)
          .map((x) =>
            typeof x === "string"
              ? `  - ${x}`
              : `  - ${x.county || x.fips || JSON.stringify(x)}: ${x.why_valuable || x.reason || ""}`
          )
          .join("\n");
        return `### ${id}\n${title}\n**Strongest contradiction**\n${contra}\n**Counterexample cases**\n${cases || "  - (none listed)"}\n**Missing data**\n${missing || "  - (none listed)"}`;
      })
      .join("\n\n");
    return {
      kind: "deterministic",
      markdown: `## Observed\nCounterexample Register entries: ${hyps.length}.\n\n${blocks}\n\n## Human decision required\nPrivilege contradictions in any comparative diagnosis packet. AI must not erase them.`,
    };
  }

  if (mode === "evidence_gap") {
    const gaps = pack.gaps || {};
    const structural = (gaps.structural_known_gaps || [])
      .map((g) => `- ${g}`)
      .join("\n");
    return {
      kind: "deterministic",
      markdown: `## Unknown / missing evidence\n${structural}\n\n### ADWS\n- ${gaps.adws_bridge?.known_gap}\n- status: ${gaps.adws_bridge?.status}\n\n### Build holds\n- overall_percent: ${gaps.build_holds?.overall_percent}\n- next_action: ${gaps.build_holds?.next_action}\n\n## Human decision required\nPrioritize gap closure that feeds validated comparative diagnosis — not dial theater.`,
    };
  }

  if (mode === "claim_auditor") {
    const c = pack.claim?.claim;
    if (!pack.claim?.found || !c) {
      return {
        kind: "deterministic",
        markdown: `## Unknown / missing evidence\nClaim not found in ledger.\n\n## Human decision required\nVerify claim id.`,
      };
    }
    return {
      kind: "deterministic",
      markdown: `## Observed\n- **${c.claim_id}**: ${c.claim_text}\n- support_level: ${c.support_level}\n- evidence_strength: ${c.evidence_strength}\n- publication_readiness: ${c.publication_readiness}\n- source_ids: ${(c.source_ids || []).join(", ")}\n- audit: ${c.phase21_audit?.disposition || "n/a"}\n\n## Unknown / missing evidence\n${c.uncertainty || "(none recorded)"}\n\n## Research implications\nAdditional sourced modules are required before any upgrade. No automatic disposition change.\n\n## Human decision required\nApprove any ledger change via a separate decision/update.`,
    };
  }

  return {
    kind: "deterministic_stub",
    markdown: `## Observed\nEvidence pack assembled for mode \`${mode}\` (${summarizePack(pack)}).\n\n## Research implications\nSet \`OPENAI_API_KEY\` in the server/CLI environment to run the live analyst for this mode. Deterministic modes (completion map, counterexample, evidence gap, claim auditor) work without a key.\n\n## Human decision required\nDo not place API keys in the website or git.`,
  };
}

function summarizePack(pack) {
  if (pack.county?.counties) return `${pack.county.counties.length} county pack(s)`;
  if (pack.counties?.counties) return `${pack.counties.counties.length} counties`;
  if (pack.hypothesis) return pack.hypothesis.canonical_hypothesis_id;
  if (pack.claim) return pack.claim.claim?.claim_id || "claim";
  return "pack ready";
}

export function appendActivityLog(entry) {
  const log = readJson("data/project/ai_research_activity_log.json");
  log.entries = log.entries || [];
  log.entries.push(entry);
  writeJson("data/project/ai_research_activity_log.json", log);
  return entry;
}

export function appendProposal(proposal) {
  const file = readJson("data/project/ai_research_proposals.json");
  file.proposals = file.proposals || [];
  file.proposals.push(proposal);
  writeJson("data/project/ai_research_proposals.json", file);
  return proposal;
}

export async function runAnalyst({
  mode,
  params = {},
  question = null,
  useModel = true,
  persist = true,
  source = "cli",
}) {
  if (mode === "completion_advancement_map") {
    buildCompletionAdvancementMap();
  }

  const evidencePack = buildEvidencePack(mode, params);
  const keyPresent = Boolean(getApiKey());
  let analysis;
  let model = null;
  let usage = null;

  const needsModel = ![
    "completion_advancement_map",
    "counterexample",
    "evidence_gap",
    "claim_auditor",
  ].includes(mode);

  if (useModel && keyPresent && (needsModel || params.force_model)) {
    const messages = buildMessages(mode, evidencePack, question);
    const result = await chatCompletion({ messages });
    analysis = { kind: "model", markdown: result.content };
    model = result.model;
    usage = result.usage;
  } else if (useModel && needsModel && !keyPresent) {
    analysis = deterministicAnalysis(mode, evidencePack);
    analysis.markdown = `${analysis.markdown}\n\n_Note: live model path skipped — OPENAI_API_KEY not present in server environment._`;
  } else {
    analysis = deterministicAnalysis(mode, evidencePack);
  }

  const activity = {
    id: `AI-ACT-${Date.now()}`,
    at: new Date().toISOString(),
    source,
    mode,
    params,
    model: model || (analysis.kind === "deterministic" ? "deterministic" : null),
    api_key_present: keyPresent,
    usage,
    proposal_status: "proposed",
    permissions_snapshot: { ai_may: AI_MAY, ai_must_not: AI_MUST_NOT },
  };

  const proposal = {
    id: `AI-PROP-${Date.now()}`,
    at: activity.at,
    mode,
    status: "proposed",
    analysis_kind: analysis.kind,
    markdown: analysis.markdown,
    evidence_sources: collectSources(evidencePack),
    human_approval_required: true,
    cannot_auto_publish: true,
  };

  if (persist && source === "cli") {
    appendActivityLog(activity);
    appendProposal(proposal);
  }

  return {
    activity,
    proposal,
    analysis,
    evidence_pack_meta: {
      mode,
      sources: collectSources(evidencePack),
      county_count:
        evidencePack.county?.counties?.length ||
        evidencePack.counties?.counties?.length ||
        0,
    },
    governance: {
      ai_may: AI_MAY,
      ai_must_not: AI_MUST_NOT,
      publication_rule: "AI proposes. The project decides.",
    },
  };
}

function collectSources(pack) {
  const out = new Set();
  const walk = (o) => {
    if (!o || typeof o !== "object") return;
    if (typeof o.source === "string") out.add(o.source);
    for (const v of Object.values(o)) {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") walk(v);
    }
  };
  walk(pack);
  return [...out];
}

export function buildContextPack() {
  buildCompletionAdvancementMap();
  const registry = readJson("data/project/ai_research_object_registry.json");
  const layer = readJson("data/project/ai_research_intelligence_layer.json");
  const map = readJson(
    "data/project/ai_research_completion_advancement_map.json"
  );
  const fips = registry.designated_counties.map((c) => c.fips);
  const pack = {
    version: "1.0.0",
    generated_at: new Date().toISOString().slice(0, 10),
    slice_id: layer.slice_id,
    layer_status: layer.status,
    registry,
    completion_map: map,
    counties: buildEvidencePack("comparative_systems", { fips_list: fips })
      .counties,
    counterexamples: buildEvidencePack("counterexample").counterexamples,
    gaps: buildEvidencePack("evidence_gap").gaps,
    hyp128: buildEvidencePack("hypothesis_stress", {
      hypothesis_id: "HYP-128",
      fips_list: fips,
    }).hypothesis,
    claim_003: buildEvidencePack("claim_auditor", {
      claim_id: "CC-CLAIM-003",
    }).claim,
  };
  writeJson("data/project/ai_research_context_pack.json", pack);
  return pack;
}
