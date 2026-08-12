#!/usr/bin/env node
/**
 * CC-AI-RESEARCH-INTELLIGENCE-LAYER-1.0 CLI
 *
 * Usage:
 *   node scripts/run-ai-research-intelligence.mjs --pack
 *   node scripts/run-ai-research-intelligence.mjs --mode completion_advancement_map
 *   node scripts/run-ai-research-intelligence.mjs --mode county_living_systems --fips 05145
 *   node scripts/run-ai-research-intelligence.mjs --mode comparative_systems --fips 05145 --fips 05073
 *   node scripts/run-ai-research-intelligence.mjs --mode hypothesis_stress --hyp HYP-128
 *   node scripts/run-ai-research-intelligence.mjs --mode claim_auditor --claim CC-CLAIM-003
 *
 * OPENAI_API_KEY must be set in the environment for live model modes.
 * Never commit the key. Never put it in website assets.
 */

import { buildContextPack, runAnalyst } from "./lib/cc-ai-research/run.mjs";
import { buildCompletionAdvancementMap } from "./lib/cc-ai-research/completion-map.mjs";
import { writeJson } from "./lib/cc-ai-research/io.mjs";
import fs from "node:fs";
import path from "node:path";
import { abs } from "./lib/cc-ai-research/paths.mjs";

function parseArgs(argv) {
  const out = { mode: null, fips: [], hyp: null, claim: null, pack: false, question: null, noModel: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--pack") out.pack = true;
    else if (a === "--no-model") out.noModel = true;
    else if (a === "--mode") out.mode = argv[++i];
    else if (a === "--fips") out.fips.push(argv[++i]);
    else if (a === "--hyp") out.hyp = argv[++i];
    else if (a === "--claim") out.claim = argv[++i];
    else if (a === "--question") out.question = argv[++i];
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.pack || !args.mode) {
    buildCompletionAdvancementMap();
    const pack = buildContextPack();
    const dest = abs(
      "apps/build-board/netlify/functions/_pack/ai_research_context_pack.json"
    );
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, `${JSON.stringify(pack)}\n`, "utf8");
    // Also expose static map for board UI without functions
    writeJson(
      "apps/build-board/public/ai-research/completion_advancement_map.json",
      pack.completion_map
    );
    writeJson(
      "apps/build-board/public/ai-research/layer_meta.json",
      {
        slice_id: pack.slice_id,
        version: pack.version,
        status: pack.layer_status,
        modes: [
          "county_living_systems",
          "comparative_systems",
          "hypothesis_stress",
          "evidence_gap",
          "counterexample",
          "claim_auditor",
          "completion_advancement_map",
        ],
        credential_rule:
          "OPENAI_API_KEY server/env only — never in browser or git",
      }
    );
    console.log(
      JSON.stringify(
        {
          ok: true,
          action: "pack",
          counties: pack.counties?.counties?.length,
          completion_percent: pack.completion_map?.current_overall_percent,
          function_pack: "apps/build-board/netlify/functions/_pack/ai_research_context_pack.json",
        },
        null,
        2
      )
    );
    if (!args.mode) return;
  }

  const params = {
    fips: args.fips[0],
    fips_list: args.fips,
    fips_a: args.fips[0],
    fips_b: args.fips[1],
    hypothesis_id: args.hyp,
    claim_id: args.claim,
  };

  const result = await runAnalyst({
    mode: args.mode,
    params,
    question: args.question,
    useModel: !args.noModel,
    persist: true,
    source: "cli",
  });

  console.log(result.analysis.markdown);
  console.log(
    "\n---\n",
    JSON.stringify(
      {
        activity_id: result.activity.id,
        proposal_id: result.proposal.id,
        model: result.activity.model,
        api_key_present: result.activity.api_key_present,
        sources: result.evidence_pack_meta.sources,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
