/**
 * Board-only Netlify Function: CC AI Research Intelligence Layer.
 * Reads OPENAI_API_KEY from Netlify environment only.
 * Never returns the key. Never writes canonical doctrine.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACK_PATH = path.join(
  __dirname,
  "_pack",
  "ai_research_context_pack.json"
);

const AI_MAY = ["observe", "compare", "question", "summarize", "recommend"];
const AI_MUST_NOT = [
  "invent evidence or citations",
  "silently alter evidence",
  "promote a hypothesis to doctrine",
  "change a principle",
  "publish legal conclusions",
  "change the baseline",
  "inflate overall completion percent",
  "autonomously publish",
  "lock pilot sites",
  "assert causation without modeling",
];

const GOVERNANCE = `You are the Constitutional Capitalism Research Intelligence Layer.
You sit ABOVE an evidence warehouse. You never manufacture evidence.
You MAY: ${AI_MAY.join(", ")}.
You MUST NOT: ${AI_MUST_NOT.join("; ")}.
Method wall: observation_first → interpretation_second → causation_only_after_modeling.
Use headings: Observed; Potential relationships (correlation only); Counterexamples; Unknown / missing evidence; Research implications; Human decision required.
If a fact is not in the evidence pack, say unknown. Do not invent numbers or citations.`;

function loadPack() {
  return JSON.parse(fs.readFileSync(PACK_PATH, "utf8"));
}

function pickEvidence(mode, body, pack) {
  switch (mode) {
    case "county_living_systems": {
      const fips = String(body.fips || "05145");
      const county = {
        ...pack.counties,
        counties: (pack.counties?.counties || []).filter(
          (c) => String(c.fips) === fips
        ),
      };
      return { mode, county, counterexamples: pack.counterexamples };
    }
    case "comparative_systems": {
      const list = (body.fips_list || [body.fips_a || "05145", body.fips_b || "05073"]).map(
        String
      );
      return {
        mode,
        counties: {
          ...pack.counties,
          counties: (pack.counties?.counties || []).filter((c) =>
            list.includes(String(c.fips))
          ),
        },
        counterexamples: pack.counterexamples,
      };
    }
    case "hypothesis_stress":
      return {
        mode,
        hypothesis: pack.hyp128,
        counties: pack.counties,
        counterexamples: pack.counterexamples,
      };
    case "evidence_gap":
      return { mode, gaps: pack.gaps };
    case "counterexample":
      return { mode, counterexamples: pack.counterexamples };
    case "claim_auditor":
      return { mode, claim: pack.claim_003 };
    case "completion_advancement_map":
      return { mode, map: pack.completion_map };
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}

function deterministic(mode, evidence) {
  if (mode === "completion_advancement_map") {
    const map = evidence.map;
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
    return `## Observed\nCurrent honesty-hold overall percent: **${map.current_overall_percent}%**.\n\n## Why still at ${map.current_overall_percent}%?\n${why}\n\n## Advancement ladder\n${ladder}\n\n## Human decision required\nChoose the next workstream. Do not inflate the dial.`;
  }
  if (mode === "counterexample") {
    const hyps = evidence.counterexamples?.hypotheses || [];
    const blocks = hyps
      .map((h) => {
        const contra = h.strongest_contradictory_pattern
          ? `${h.strongest_contradictory_pattern.county} (${h.strongest_contradictory_pattern.fips})`
          : "n/a";
        return `### ${h.hypothesis_id}\n${h.claim}\nStrongest contradiction: ${contra}`;
      })
      .join("\n\n");
    return `## Observed\n${hyps.length} register hypotheses.\n\n${blocks}\n\n## Human decision required\nPrivilege contradictions.`;
  }
  if (mode === "evidence_gap") {
    const gaps = (evidence.gaps?.structural_known_gaps || [])
      .map((g) => `- ${g}`)
      .join("\n");
    return `## Unknown / missing evidence\n${gaps}\n\n## Human decision required\nPrioritize gaps that feed validated comparative diagnosis.`;
  }
  if (mode === "claim_auditor") {
    const c = evidence.claim?.claim;
    if (!c) return "## Unknown\nClaim not in pack.";
    return `## Observed\n**${c.claim_id}**: ${c.claim_text}\n- support_level: ${c.support_level}\n- publication_readiness: ${c.publication_readiness}\n- sources: ${(c.source_ids || []).join(", ")}\n\n## Human decision required\nNo automatic upgrade.`;
  }
  return null;
}

async function callOpenAI(messages) {
  const key = (process.env.OPENAI_API_KEY || "").trim();
  if (!key) {
    const err = new Error("OPENAI_API_KEY not configured on server");
    err.code = "MISSING_API_KEY";
    throw err;
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      messages,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message || `OpenAI HTTP ${res.status}`);
  }
  return {
    model: body.model,
    content: body.choices?.[0]?.message?.content || "",
    usage: body.usage || null,
  };
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: cors,
      body: JSON.stringify({ error: "POST only" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const mode = body.mode || "completion_advancement_map";
    const pack = loadPack();
    const evidence = pickEvidence(mode, body, pack);
    const keyPresent = Boolean((process.env.OPENAI_API_KEY || "").trim());

    let markdown = deterministic(mode, evidence);
    let model = markdown ? "deterministic" : null;
    let usage = null;
    let kind = markdown ? "deterministic" : "model";

    const forceModel = Boolean(body.force_model);
    const needsModel =
      forceModel ||
      ![
        "completion_advancement_map",
        "counterexample",
        "evidence_gap",
        "claim_auditor",
      ].includes(mode);

    if (needsModel) {
      if (!keyPresent) {
        markdown = `## Observed\nEvidence pack ready for \`${mode}\`.\n\n## Research implications\nConfigure \`OPENAI_API_KEY\` in the **Netlify board site environment** (Functions), never in the browser or git.\n\n## Human decision required\nAdd the key server-side, then re-run.`;
        kind = "deterministic_stub";
        model = "deterministic_stub";
      } else {
        const question =
          body.question ||
          `Run analyst mode ${mode} on the evidence pack. Do not invent evidence.`;
        const result = await callOpenAI([
          { role: "system", content: GOVERNANCE },
          {
            role: "user",
            content: `${question}\n\n--- EVIDENCE PACK ---\n${JSON.stringify(evidence)}`,
          },
        ]);
        markdown = result.content;
        model = result.model;
        usage = result.usage;
        kind = "model";
      }
    }

    const payload = {
      ok: true,
      slice_id: "CC-AI-RESEARCH-INTELLIGENCE-LAYER-1.0",
      mode,
      kind,
      model,
      api_key_present: keyPresent,
      usage,
      markdown,
      proposal: {
        status: "proposed",
        human_approval_required: true,
        cannot_auto_publish: true,
      },
      governance: {
        ai_may: AI_MAY,
        ai_must_not: AI_MUST_NOT,
        publication_rule: "AI proposes. The project decides.",
      },
      // never echo secrets
    };

    return { statusCode: 200, headers: cors, body: JSON.stringify(payload) };
  } catch (err) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({
        ok: false,
        error: err.message || String(err),
        api_key_present: Boolean((process.env.OPENAI_API_KEY || "").trim()),
      }),
    };
  }
}
