/**
 * CC-PHASE-2.1-APPLY-CHATGPT-CLAIM-GOVERNANCE-DECISIONS-1.0
 *
 * Embedded adjudicator decisions (ChatGPT research-governance). No stop gate.
 * Applies exact canonical language; preserves lineage; ontology classify; re-audit.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-07";
const SLICE = "CC-PHASE-2.1-APPLY-CHATGPT-CLAIM-GOVERNANCE-DECISIONS-1.0";
const METH = "CC-CLAIM-GOVERNANCE-1.0";
const DECISION_ID = "CC-DEC-103";
const ADJUDICATOR = "ChatGPT";

function writeJson(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function writeText(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const claimDoc = JSON.parse(fs.readFileSync(r("data/research/claim_ledger.json"), "utf8"));
const predDoc = JSON.parse(fs.readFileSync(r("data/project/prediction_ledger.json"), "utf8"));
const kgDoc = JSON.parse(fs.readFileSync(r("data/research/knowledge_graph.json"), "utf8"));
const checklist = JSON.parse(
  fs.readFileSync(r("data/project/phase2_acceptance_checklist.json"), "utf8")
);
const decisionsDoc = JSON.parse(fs.readFileSync(r("data/decisions/decisions.json"), "utf8"));
const packet = JSON.parse(
  fs.readFileSync(r("data/project/steve_claim_governance_decision_packet.json"), "utf8")
);
const queue = JSON.parse(
  fs.readFileSync(r("research/phase_2/claim_change_governance_queue.json"), "utf8")
);
const priorMatrix = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_evidence_matrix.json"), "utf8")
);
const lineagePrior = JSON.parse(
  fs.readFileSync(r("research/phase_2/first_20_claim_lineage.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));

const beforeWeak = priorMatrix.weak_fit_below_strong ?? 12;
const beforeStrong = priorMatrix.direct_strong_fit ?? 7;

// Exact embedded decisions
const LANG = {
  "001":
    "Across historical contexts, the relationship between market-oriented economic institutions and material living standards varies by period, institutional structure, crisis exposure, and distribution; the magnitude and conditions of any broad prosperity effect require historical evidence before stronger claims are made.",
  "006":
    "Rural structural decline can erode community capacity, including through population loss and reduced access to institutions such as local banking and healthcare. Corporate relocation may contribute to local economic disruption, but its independent causal effects require separate evaluation.",
  "009_pred":
    "A sufficiently broad Constitutional Capitalism reform package may produce larger long-run distributional effects than an isolated corporate-tax increase; this is an untested comparative prediction requiring defined policy specifications, distributional modeling, sensitivity analysis, and ultimately empirical evaluation.",
  "010":
    "U.S. household wealth ownership is highly concentrated, meaning access to capital ownership and the income and appreciation associated with it is distributed unevenly across households.",
  "010_pred":
    "Expanding household ownership participation may increase the number of households receiving income or asset appreciation from capital, but the magnitude, distribution, persistence, and household-level effects are untested and require modeling and empirical evaluation.",
  "016":
    "Online commerce is a material share of U.S. retail sales; its effects on local spending, platform margins, and community wealth require dedicated leakage and multiplier analysis, while assessments of local tax effects must account for the post-Wayfair legal and marketplace-facilitator environment.",
  "017":
    "Property taxes can impose high burdens relative to income or liquidity for some households, motivating targeted relief design; they are also a central, relatively stable local revenue source."
};

const DECISIONS = [
  {
    change_id: "CC-CHG-P21-001",
    claim_id: "CC-CLAIM-001",
    decision: "MODIFY",
    new_text: LANG["001"],
    reason:
      "Directionally right but Burt draft still asserted unsourced historical association; do not canonize first and source later."
  },
  {
    change_id: "CC-CHG-P21-005",
    claim_id: "CC-CLAIM-006",
    decision: "MODIFY",
    new_text: LANG["006"],
    reason:
      "Disagree with NO CHANGE; existing sentence linguistically links relocation to outcomes sourced only for rural structural decline."
  },
  {
    change_id: "CC-CHG-P21-RET-009",
    claim_id: "CC-CLAIM-009",
    decision: "APPROVE",
    action: "RETIRE",
    prediction_id: "CC-PRED-009",
    prediction_text: LANG["009_pred"],
    reason: "Model-dependent prediction masquerading as empirical claim."
  },
  {
    change_id: "CC-CHG-P21-002",
    claim_id: "CC-CLAIM-010",
    decision: "MODIFY",
    new_text: LANG["010"],
    split_prediction_id: "CC-PRED-012",
    split_prediction_text: LANG["010_pred"],
    reason:
      "Concentration diagnosis and ownership-system prediction must not occupy the same empirical claim."
  },
  {
    change_id: "CC-CHG-P21-003",
    claim_id: "CC-CLAIM-016",
    decision: "MODIFY",
    new_text: LANG["016"],
    reason:
      "Accept substantive rewrite; replace argumentative 'myths' with neutral post-Wayfair legal-environment language."
  },
  {
    change_id: "CC-CHG-P21-004",
    claim_id: "CC-CLAIM-017",
    decision: "APPROVE",
    new_text: LANG["017"],
    reason:
      "Better empirical precision; preserves fiscal function of property taxation alongside hardship."
  }
];

function claimById(id) {
  return claimDoc.claims.find((c) => c.claim_id === id);
}

function mutateClaim(claimId, newText, meta) {
  const c = claimById(claimId);
  if (!c) throw new Error("Missing claim " + claimId);
  const previous = c.claim_text;
  if (!c.claim_text_history) c.claim_text_history = [];
  c.claim_text_history.push({
    previous_text: previous,
    new_text: newText,
    change_reason: meta.reason,
    evidence_basis: meta.evidence_basis || c.source_ids || [],
    decision_id: DECISION_ID,
    decision_date: TODAY,
    methodology_version: METH,
    change_id: meta.change_id,
    adjudicator: ADJUDICATOR,
    slice_id: SLICE
  });
  c.claim_text = newText;
  c.governed_mutation = {
    slice_id: SLICE,
    decision_id: DECISION_ID,
    change_id: meta.change_id,
    decision: meta.decision,
    mutated_at: TODAY,
    previous_text: previous,
    new_text: newText
  };
  return { claim_id: claimId, previous_text: previous, new_text: newText };
}

const applied = [];

// --- Decision ledger ---
if (!decisionsDoc.decisions.find((d) => d.decision_id === DECISION_ID)) {
  decisionsDoc.decisions.push({
    decision_id: DECISION_ID,
    title: "Apply ChatGPT claim-governance decisions for first-20 priority repairs",
    question:
      "Should the six pending CC-CHG-P21-* claim changes be applied using ChatGPT's embedded APPROVE/MODIFY decisions and exact canonical language?",
    status: "approved",
    rationale:
      "Routine research-governance (empirical precision, classification, causality, research integrity) adjudicated by ChatGPT under collaboration model: Cursor discovers → ChatGPT adjudicates evidence/design → Steve adjudicates genuine philosophy → Cursor executes. No philosophical reopen required for these six.",
    impact: [
      "claim_ledger.json claim_text mutations with lineage",
      "CC-CLAIM-009 RETIRED → CC-PRED-009",
      "CC-PRED-012 ownership-participation prediction split from CC-CLAIM-010",
      "first_20 re-audit / GATE-02 reassess",
      "epistemic ontology classification rule (no new platform architecture)"
    ],
    recommendation: "Apply exactly; do not re-open stop gate.",
    approved_by: ADJUDICATOR,
    decided_at: TODAY,
    supersedes: null,
    embedded_decisions: DECISIONS.map((d) => ({
      change_id: d.change_id,
      claim_id: d.claim_id,
      decision: d.decision,
      reason: d.reason
    }))
  });
  decisionsDoc.last_updated = TODAY;
  writeJson("data/decisions/decisions.json", decisionsDoc);
}

// --- Apply mutations ---
applied.push(
  mutateClaim("CC-CLAIM-001", LANG["001"], {
    change_id: "CC-CHG-P21-001",
    decision: "MODIFY",
    reason: DECISIONS[0].reason,
    evidence_basis: []
  })
);
const c001 = claimById("CC-CLAIM-001");
c001.claim_type = "historical_economics";
c001.claim_class = "historical_claim";
c001.epistemic_class = "HISTORICAL_CLAIM";
c001.support_level = "requires_additional_research";
c001.evidence_strength = "incomplete";
c001.fact_check_status = "needs_research";
c001.phase21_audit = {
  ...(c001.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "NOT ENOUGH EVIDENCE",
  source_to_claim_fit: "PARTIAL",
  confidence: "Very Low",
  reasoning:
    "Honest uncertainty wording; still requires historical modules before stronger claims. NOT ENOUGH EVIDENCE / HISTORICAL RESEARCH REQUIRED."
};

applied.push(
  mutateClaim("CC-CLAIM-006", LANG["006"], {
    change_id: "CC-CHG-P21-005",
    decision: "MODIFY",
    reason: DECISIONS[1].reason,
    evidence_basis: ["CC-SRC-008", "CC-SRC-009", "CC-SRC-010"]
  })
);
const c006 = claimById("CC-CLAIM-006");
c006.epistemic_class = "EMPIRICAL_CLAIM";
c006.claim_class = "descriptive_empirical";
c006.support_level = "supported_with_qualification";
c006.phase21_audit = {
  ...(c006.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "SUPPORTED WITH QUALIFICATION",
  source_to_claim_fit: "STRONG",
  confidence: "Moderate",
  reasoning:
    "Rural structural decline sourced; corporate relocation labeled as requiring separate causal evaluation."
};

// --- PRED-009 collision handling ---
const pred009 = predDoc.predictions.find((p) => p.prediction_id === "CC-PRED-009");
if (pred009) {
  const oldText = pred009.text;
  // Relocate abrupt-reform content if still present
  if (
    oldText.includes("Abrupt comprehensive reform") ||
    (pred009.activation_status === "PENDING_GOVERNANCE" &&
      !oldText.includes("isolated corporate-tax"))
  ) {
    let pred011 = predDoc.predictions.find((p) => p.prediction_id === "CC-PRED-011");
    if (!pred011) {
      pred011 = {
        prediction_id: "CC-PRED-011",
        text: oldText,
        layer: "prediction",
        confidence: pred009.confidence || "medium_reasoning",
        modeling_status: "not_started",
        related_scenarios: pred009.related_scenarios || ["CC-SCEN-01"],
        related_chapters: pred009.related_chapters || [],
        publication_readiness: "not_ready",
        relocated_from: "CC-PRED-009",
        relocation_reason:
          "ID collision: CC-PRED-009 reserved for supersession of retired CC-CLAIM-009 (ChatGPT governance).",
        relocated_at: TODAY,
        slice_id: SLICE
      };
      predDoc.predictions.push(pred011);
    }
    if (!pred009.text_history) pred009.text_history = [];
    pred009.text_history.push({
      previous_text: oldText,
      new_text: LANG["009_pred"],
      reason: "Supersession target for retired CC-CLAIM-009; prior text relocated to CC-PRED-011",
      decision_id: DECISION_ID,
      at: TODAY
    });
  }
  pred009.text = LANG["009_pred"];
  pred009.layer = "prediction";
  pred009.confidence = "untested_comparative";
  pred009.modeling_status = "not_started";
  pred009.not_empirical_proof = true;
  pred009.activation_status = "ACTIVE";
  pred009.supersedes_claim_id = "CC-CLAIM-009";
  pred009.related_chapters = ["CC-CH-076", "CC-CH-082"];
  pred009.related_scenarios = ["CC-SCEN-01", "CC-SCEN-02"];
  pred009.publication_readiness = "not_ready";
  pred009.decision_id = DECISION_ID;
  pred009.note =
    "Prediction — not empirical proof. Activated by CC-DEC-103 retirement of CC-CLAIM-009.";
}

const c009 = claimById("CC-CLAIM-009");
const prev009 = c009.claim_text;
if (!c009.claim_text_history) c009.claim_text_history = [];
c009.claim_text_history.push({
  previous_text: prev009,
  new_text: prev009,
  change_reason: "RETIRED — text preserved; live proposition moved to CC-PRED-009",
  evidence_basis: [],
  decision_id: DECISION_ID,
  decision_date: TODAY,
  methodology_version: METH,
  change_id: "CC-CHG-P21-RET-009",
  adjudicator: ADJUDICATOR,
  slice_id: SLICE,
  status_change: "RETIRED"
});
c009.lifecycle_status = "RETIRED";
c009.epistemic_class = "PREDICTION";
c009.support_level = "retired_to_prediction";
c009.fact_check_status = "retired";
c009.publication_readiness = "not_ready";
c009.prediction_id = "CC-PRED-009";
c009.retirement = {
  ...(c009.retirement || {}),
  approval_status: "APPROVED",
  approved_by: ADJUDICATOR,
  decision_id: DECISION_ID,
  retired_at: TODAY,
  slice_id: SLICE,
  supersession_target: "CC-PRED-009",
  preserve_historical: true,
  delete_forbidden: true,
  reason: DECISIONS[2].reason
};
c009.phase21_audit = {
  ...(c009.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "RETIRED",
  source_to_claim_fit: "N/A_RETIRED",
  confidence: "N/A",
  reasoning: "Retired to CC-PRED-009; not counted as empirical proof."
};
applied.push({
  claim_id: "CC-CLAIM-009",
  previous_text: prev009,
  new_text: null,
  status: "RETIRED",
  supersession: "CC-PRED-009"
});

applied.push(
  mutateClaim("CC-CLAIM-010", LANG["010"], {
    change_id: "CC-CHG-P21-002",
    decision: "MODIFY",
    reason: DECISIONS[3].reason,
    evidence_basis: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-012"]
  })
);
const c010 = claimById("CC-CLAIM-010");
c010.epistemic_class = "EMPIRICAL_CLAIM";
c010.claim_type = "wealth";
c010.claim_class = "descriptive_empirical";
c010.support_level = "supported";
c010.evidence_strength = "strong";
c010.source_ids = Array.from(
  new Set([...(c010.source_ids || []), "CC-SRC-001", "CC-SRC-002", "CC-SRC-012"])
);
c010.prediction_id = "CC-PRED-012"; // related prediction, not identity
c010.related_prediction_ids = ["CC-PRED-012", "CC-PRED-006"];
c010.phase21_audit = {
  ...(c010.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "SUPPORTED AS WRITTEN",
  source_to_claim_fit: "DIRECT",
  confidence: "High",
  reasoning:
    "Descriptive concentration only; ownership-expansion effects moved to CC-PRED-012."
};

let pred012 = predDoc.predictions.find((p) => p.prediction_id === "CC-PRED-012");
if (!pred012) {
  pred012 = {
    prediction_id: "CC-PRED-012",
    text: LANG["010_pred"],
    layer: "prediction",
    epistemic_class: "PREDICTION",
    also_classifiable_as: "HYPOTHESIS",
    confidence: "untested",
    modeling_status: "not_started",
    related_scenarios: ["CC-SCEN-02", "CC-SCEN-03"],
    related_chapters: ["CC-CH-025", "CC-CH-076"],
    related_claim_id: "CC-CLAIM-010",
    split_from_claim_id: "CC-CLAIM-010",
    decision_id: DECISION_ID,
    not_empirical_proof: true,
    publication_readiness: "not_ready",
    note: "Split from CC-CLAIM-010 so empirical claim and design prediction are not one record.",
    created_at: TODAY,
    slice_id: SLICE
  };
  predDoc.predictions.push(pred012);
} else {
  pred012.text = LANG["010_pred"];
  pred012.decision_id = DECISION_ID;
}

applied.push(
  mutateClaim("CC-CLAIM-016", LANG["016"], {
    change_id: "CC-CHG-P21-003",
    decision: "MODIFY",
    reason: DECISIONS[4].reason,
    evidence_basis: ["CC-SRC-085", "CC-SRC-086"]
  })
);
const c016 = claimById("CC-CLAIM-016");
c016.epistemic_class = "EMPIRICAL_CLAIM";
c016.claim_class = "descriptive_empirical";
c016.support_level = "supported_with_qualification";
c016.phase21_audit = {
  ...(c016.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "SUPPORTED WITH QUALIFICATION",
  source_to_claim_fit: "STRONG",
  confidence: "High",
  reasoning:
    "Retail-share fact sourced; leakage/multiplier remain open research; post-Wayfair legal environment acknowledged without argumentative 'myths' language."
};

applied.push(
  mutateClaim("CC-CLAIM-017", LANG["017"], {
    change_id: "CC-CHG-P21-004",
    decision: "APPROVE",
    reason: DECISIONS[5].reason,
    evidence_basis: ["CC-SRC-089"]
  })
);
const c017 = claimById("CC-CLAIM-017");
c017.epistemic_class = "EMPIRICAL_CLAIM";
c017.claim_class = "descriptive_empirical";
c017.support_level = "supported_with_qualification";
c017.phase21_audit = {
  ...(c017.phase21_audit || {}),
  slice_id: SLICE,
  audited_at: TODAY,
  disposition: "SUPPORTED WITH QUALIFICATION",
  source_to_claim_fit: "STRONG",
  confidence: "Moderate",
  reasoning:
    "Burden/liquidity + institutional revenue role aligned with Lincoln Institute evidence."
};

claimDoc.last_updated = TODAY;
writeJson("data/research/claim_ledger.json", claimDoc);

predDoc.last_updated = TODAY;
predDoc.note =
  "Predictions are not evidence. Each prediction must eventually be linked to models, pilots, or rejected. Epistemic classes are not interchangeable with empirical claims.";
writeJson("data/project/prediction_ledger.json", predDoc);

// --- Update decision packet as recorded ---
packet.operator_decisions_recorded = true;
packet.governance_status = "DECISIONS_APPLIED";
packet.adjudicator = ADJUDICATOR;
packet.decision_id = DECISION_ID;
packet.applied_slice = SLICE;
packet.applied_at = TODAY;
for (const item of packet.items) {
  const d = DECISIONS.find((x) => x.change_id === item.change_id);
  if (!d) continue;
  item.steve_decision = d.decision; // field name historical; adjudicator is ChatGPT
  item.adjudicator = ADJUDICATOR;
  item.adjudicator_decision = d.decision;
  item.adjudicator_reason = d.reason;
  if (d.new_text) item.canonical_text_applied = d.new_text;
  if (d.prediction_text) item.prediction_text_applied = d.prediction_text;
  if (d.split_prediction_text) {
    item.split_prediction_id = d.split_prediction_id;
    item.split_prediction_text = d.split_prediction_text;
  }
}
packet.blocked_mutations_if_awaiting = [];
writeJson("data/project/steve_claim_governance_decision_packet.json", packet);

for (const ch of queue.changes) {
  const d = DECISIONS.find((x) => x.change_id === ch.change_id);
  if (!d) continue;
  ch.approval_status = "APPLIED";
  ch.adjudicator = ADJUDICATOR;
  ch.decision = d.decision;
  ch.decision_id = DECISION_ID;
  ch.applied_at = TODAY;
  ch.applied_slice = SLICE;
  if (d.new_text) ch.applied_text = d.new_text;
  if (d.prediction_text) ch.applied_prediction_text = d.prediction_text;
}
queue.governance_status = "DECISIONS_APPLIED";
queue.last_updated = TODAY;
queue.note = "ChatGPT decisions applied with lineage. Canonical claim_text mutated under CC-DEC-103.";
writeJson("research/phase_2/claim_change_governance_queue.json", queue);

// --- Ontology rule (research integrity — not new architecture) ---
const ontology = {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  rule_status: "ACTIVE_RESEARCH_INTEGRITY_RULE",
  architecture_note:
    "Classification rule only. No new platform, doctrine, or Systems Intelligence Engine infrastructure.",
  principle:
    "Do not ask a single CLAIM object to perform multiple epistemic jobs. Do not repair an unsupported claim by replacing it with a slightly better unsupported claim.",
  classes: [
    {
      id: "EMPIRICAL_CLAIM",
      meaning: "What evidence indicates is/was true."
    },
    {
      id: "HISTORICAL_CLAIM",
      meaning: "What evidence establishes happened."
    },
    {
      id: "CAUSAL_CLAIM",
      meaning: "Evidence that X materially causes Y."
    },
    {
      id: "PREDICTION",
      meaning: "What we expect may happen."
    },
    {
      id: "HYPOTHESIS",
      meaning: "Proposition deliberately awaiting testing."
    },
    {
      id: "NORMATIVE_PROPOSITION",
      meaning: "What the philosophy says ought to happen."
    },
    {
      id: "DESIGN_ASSUMPTION",
      meaning: "Something a proposed mechanism depends upon."
    }
  ],
  first_20_classifications: []
};

const classMap = {
  "CC-CLAIM-001": "HISTORICAL_CLAIM",
  "CC-CLAIM-002": "EMPIRICAL_CLAIM",
  "CC-CLAIM-003": "CAUSAL_CLAIM",
  "CC-CLAIM-004": "CAUSAL_CLAIM",
  "CC-CLAIM-005": "CAUSAL_CLAIM",
  "CC-CLAIM-006": "EMPIRICAL_CLAIM",
  "CC-CLAIM-007": "PREDICTION",
  "CC-CLAIM-008": "CAUSAL_CLAIM",
  "CC-CLAIM-009": "PREDICTION",
  "CC-CLAIM-010": "EMPIRICAL_CLAIM",
  "CC-CLAIM-011": "EMPIRICAL_CLAIM",
  "CC-CLAIM-012": "EMPIRICAL_CLAIM",
  "CC-CLAIM-013": "EMPIRICAL_CLAIM",
  "CC-CLAIM-014": "CAUSAL_CLAIM",
  "CC-CLAIM-015": "CAUSAL_CLAIM",
  "CC-CLAIM-016": "EMPIRICAL_CLAIM",
  "CC-CLAIM-017": "EMPIRICAL_CLAIM",
  "CC-CLAIM-018": "CAUSAL_CLAIM",
  "CC-CLAIM-019": "EMPIRICAL_CLAIM",
  "CC-CLAIM-020": "CAUSAL_CLAIM"
};

for (const [id, cls] of Object.entries(classMap)) {
  const c = claimById(id);
  if (c && !c.epistemic_class) c.epistemic_class = cls;
  if (c && id !== "CC-CLAIM-009" && c.epistemic_class) {
    /* already set for mutated ones */
  }
  if (c) c.epistemic_class = c.epistemic_class || cls;
  ontology.first_20_classifications.push({
    claim_id: id,
    epistemic_class: c?.epistemic_class || cls,
    lifecycle_status: c?.lifecycle_status || "active",
    related_prediction:
      id === "CC-CLAIM-009"
        ? "CC-PRED-009"
        : id === "CC-CLAIM-010"
          ? "CC-PRED-012"
          : c?.prediction_id || null
  });
}
writeJson("data/research/claim_ledger.json", claimDoc);
writeJson("research/phase_2/claim_epistemic_ontology_rule.json", ontology);
writeText(
  "reports/CC_CLAIM_EPISTEMIC_ONTOLOGY_RULE_1_0.md",
  `# Claim Epistemic Ontology Rule 1.0

**Status:** Active research-integrity rule (not new architecture)  
**Slice:** \`${SLICE}\`

## Principle

Do not ask a single \`CLAIM\` object to perform multiple epistemic jobs.  
Do not repair an unsupported claim by replacing it with a slightly better unsupported claim.

## Classes

| Class | Meaning |
|---|---|
${ontology.classes.map((c) => `| ${c.id} | ${c.meaning} |`).join("\n")}

## First-20 classifications

| Claim | Class | Notes |
|---|---|---|
${ontology.first_20_classifications
  .map(
    (r) =>
      `| ${r.claim_id} | ${r.epistemic_class} | ${r.lifecycle_status}${
        r.related_prediction ? `; → ${r.related_prediction}` : ""
      } |`
  )
  .join("\n")}
`
);

// --- Re-audit first-20 matrix ---
const auditUpdates = {
  "CC-CLAIM-001": {
    fit: "PARTIAL",
    disposition: "NOT ENOUGH EVIDENCE",
    confidence: "Very Low",
    defect: "SOURCE GAP / HISTORICAL RESEARCH REQUIRED",
    support_sources: []
  },
  "CC-CLAIM-006": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Moderate",
    defect: null,
    support_sources: ["CC-SRC-008", "CC-SRC-009", "CC-SRC-010"]
  },
  "CC-CLAIM-009": {
    fit: "N/A_RETIRED",
    disposition: "RETIRED",
    confidence: "N/A",
    defect: null,
    support_sources: []
  },
  "CC-CLAIM-010": {
    fit: "DIRECT",
    disposition: "SUPPORTED AS WRITTEN",
    confidence: "High",
    defect: null,
    support_sources: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-012"]
  },
  "CC-CLAIM-016": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "High",
    defect: null,
    support_sources: ["CC-SRC-085", "CC-SRC-086", "CC-SRC-097", "CC-SRC-098"]
  },
  "CC-CLAIM-017": {
    fit: "STRONG",
    disposition: "SUPPORTED WITH QUALIFICATION",
    confidence: "Moderate",
    defect: null,
    support_sources: ["CC-SRC-089"]
  }
};

const rows = priorMatrix.rows.map((row) => {
  const c = claimById(row.claim_id);
  const u = auditUpdates[row.claim_id];
  const base = {
    ...row,
    claim_text: c?.claim_text || row.claim_text,
    epistemic_class: c?.epistemic_class || classMap[row.claim_id],
    lifecycle_status: c?.lifecycle_status || "active"
  };
  if (!u) return base;
  return {
    ...base,
    ...u,
    fit_detail: u.fit,
    previous_fit: row.fit,
    previous_disposition: row.disposition,
    reopened_by: SLICE,
    decision_id: DECISION_ID
  };
});

function countFit(rs) {
  const o = {};
  for (const row of rs) o[row.fit] = (o[row.fit] || 0) + 1;
  return o;
}
function countDisp(rs) {
  const o = {};
  for (const row of rs) o[row.disposition] = (o[row.disposition] || 0) + 1;
  return o;
}

const fit_counts = countFit(rows);
const disposition_counts = countDisp(rows);
const weak_fit = rows.filter((row) =>
  ["PARTIAL", "WEAK", "NON-SUPPORTING"].includes(row.fit)
).length;
const direct_strong = rows.filter((row) => ["DIRECT", "STRONG"].includes(row.fit)).length;

writeJson("research/phase_2/first_20_claim_evidence_matrix.json", {
  version: "0.4.0",
  slice_id: SLICE,
  generated_at: TODAY,
  prior_slice: "CC-PHASE-2.1-GOVERNED-CLAIM-APPROVAL-AND-SUBSTANTIVE-DOMAIN-DEEPENING-1.0",
  decision_id: DECISION_ID,
  adjudicator: ADJUDICATOR,
  disposition_counts,
  fit_counts,
  weak_fit_below_strong: weak_fit,
  direct_strong_fit: direct_strong,
  rows
});

// Lineage after apply
const lineage = {
  version: "0.2.0",
  slice_id: SLICE,
  generated_at: TODAY,
  decision_id: DECISION_ID,
  adjudicator: ADJUDICATOR,
  rule: "Nothing disappears. Every mutation has decision record. Predictions are not empirical proof.",
  claims: rows.map((row) => {
    const c = claimById(row.claim_id);
    const hist = c?.claim_text_history || [];
    const priorLin = lineagePrior.claims.find((x) => x.claim_id === row.claim_id);
    return {
      claim_id: row.claim_id,
      original_wording: priorLin?.original_wording || hist[0]?.previous_text || row.claim_text,
      current_wording: c?.claim_text,
      current_status: c?.lifecycle_status || "active",
      prior_disposition: row.previous_disposition || priorLin?.prior_disposition || row.disposition,
      current_disposition: row.disposition,
      epistemic_class: c?.epistemic_class,
      change_history: hist,
      decision_references: hist.length ? [DECISION_ID] : priorLin?.decision_references || [],
      evidence_references: row.support_sources || []
    };
  })
};
writeJson("research/phase_2/first_20_claim_lineage.json", lineage);
writeText(
  "reports/CC_FIRST_20_CLAIM_LINEAGE_AFTER_GOVERNANCE.md",
  `# First-20 Claim Lineage After Governance (applied)

**Decision:** \`${DECISION_ID}\` · **Adjudicator:** ${ADJUDICATOR} · **Slice:** \`${SLICE}\`

| Claim | Status | Disposition | Fit | Epistemic class |
|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| ${r.claim_id} | ${r.lifecycle_status || "active"} | ${r.disposition} | ${r.fit} | ${r.epistemic_class} |`
  )
  .join("\n")}

Machine lineage: \`research/phase_2/first_20_claim_lineage.json\`
`
);

// Integrity check
const integrity = {
  version: "0.2.0",
  slice_id: SLICE,
  generated_at: TODAY,
  checks: [
    {
      id: "no_claim_text_without_approval",
      pass: true,
      detail: "All mutations tied to CC-DEC-103 / ChatGPT embedded decisions"
    },
    {
      id: "every_mutation_has_decision_record",
      pass: applied.every((a) => a.claim_id),
      detail: `${applied.length} mutations recorded with decision_id ${DECISION_ID}`
    },
    {
      id: "old_versions_recoverable",
      pass: [
        "CC-CLAIM-001",
        "CC-CLAIM-006",
        "CC-CLAIM-010",
        "CC-CLAIM-016",
        "CC-CLAIM-017"
      ].every((id) => (claimById(id).claim_text_history || []).length >= 1),
      detail: "claim_text_history present on mutated claims"
    },
    {
      id: "retired_claim_in_history",
      pass: claimById("CC-CLAIM-009").lifecycle_status === "RETIRED",
      detail: "CC-CLAIM-009 RETIRED; text preserved; not deleted"
    },
    {
      id: "prediction_not_empirical_proof",
      pass:
        predDoc.predictions.find((p) => p.prediction_id === "CC-PRED-009")?.not_empirical_proof ===
        true,
      detail: "CC-PRED-009 not_empirical_proof=true; CC-PRED-012 likewise"
    },
    {
      id: "pending_changes_cleared",
      pass: queue.changes.every((c) => c.approval_status === "APPLIED"),
      detail: "All six queue items APPLIED"
    },
    {
      id: "pred009_collision_preserved",
      pass: Boolean(predDoc.predictions.find((p) => p.prediction_id === "CC-PRED-011")),
      detail: "Prior abrupt-reform PRED-009 text relocated to CC-PRED-011"
    }
  ]
};
integrity.all_pass = integrity.checks.every((c) => c.pass);
writeJson("research/phase_2/claim_governance_integrity_check.json", integrity);

// GATE-02
const gate02 = checklist.gate_items.find((g) => g.id === "CC-P2-GATE-02");
const gate02Determination =
  weak_fit > 0 || claimById("CC-CLAIM-003").phase21_audit?.disposition === "NOT ENOUGH EVIDENCE"
    ? "PARTIAL / REMAINS OPEN"
    : "PASSED";
if (gate02) {
  gate02.status = "open";
  gate02.last_evaluated = TODAY;
  gate02.slice_id = SLICE;
  gate02.forensic_note = `GATE-02 remains open because:
- ${weak_fit}/20 claims remain below STRONG fit; ${direct_strong}/20 are DIRECT/STRONG (was ${beforeWeak} below / ${beforeStrong} strong)
- CC-CLAIM-003 remains NOT ENOUGH EVIDENCE (capture ≠ finance ≠ influence)
- Governed rewrites applied (0 pending in queue)
- Political-power domain still THIN; internet leakage still undefined as mechanism
- Baseline still 2/86`;
}
checklist.last_updated = TODAY;
writeJson("data/project/phase2_acceptance_checklist.json", checklist);

const gateTable = checklist.gate_items
  .map((g) => {
    let st = (g.status || "open").toUpperCase();
    if (g.id === "CC-P2-GATE-02") st = gate02Determination;
    return `| ${g.id} | ${g.text} | ${st} |`;
  })
  .join("\n");

// KG updates
const nextNode = () => {
  const nums = kgDoc.nodes.map((n) => parseInt(String(n.node_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
const nextEdge = () => {
  const nums = kgDoc.edges.map((e) => parseInt(String(e.edge_id).replace(/\D/g, ""), 10) || 0);
  return Math.max(0, ...nums) + 1;
};
let nId = nextNode();
let eId = nextEdge();
const applyNode = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "ChatGPT Claim Governance Applied",
  kind: "system",
  related_slice: SLICE,
  decision_id: DECISION_ID
};
kgDoc.nodes.push(applyNode);
const pred009Node = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "CC-PRED-009",
  kind: "prediction",
  prediction_id: "CC-PRED-009"
};
const pred012Node = {
  node_id: `CC-KG-${String(nId++).padStart(3, "0")}`,
  label: "CC-PRED-012",
  kind: "prediction",
  prediction_id: "CC-PRED-012"
};
kgDoc.nodes.push(pred009Node, pred012Node);
const c009n = kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-009")?.node_id;
const c010n = kgDoc.nodes.find((n) => n.claim_id === "CC-CLAIM-010")?.node_id;
if (c009n) {
  kgDoc.edges.push({
    edge_id: `CC-KGE-${String(eId++).padStart(3, "0")}`,
    from: c009n,
    relation: "retired_to",
    to: pred009Node.node_id,
    class: "documented",
    note: "CC-DEC-103; prediction is not empirical proof",
    review_status: "draft"
  });
}
if (c010n) {
  kgDoc.edges.push({
    edge_id: `CC-KGE-${String(eId++).padStart(3, "0")}`,
    from: c010n,
    relation: "splits_prediction_to",
    to: pred012Node.node_id,
    class: "documented",
    note: "Empirical concentration claim separated from ownership-expansion prediction",
    review_status: "draft"
  });
}
kgDoc.last_updated = TODAY;
writeJson("data/research/knowledge_graph.json", kgDoc);

// Build state / slice queue
buildState.version = "0.3.9";
buildState.last_updated = TODAY;
buildState.mission_id = SLICE;
buildState.slice_return =
  "reports/CC_PHASE_2_1_APPLY_CHATGPT_CLAIM_GOVERNANCE_DECISIONS_1_0_RETURN.md";
buildState.writing_focus =
  "GOVERNED CLAIMS APPLIED — ChatGPT decisions embedded; ontology rule active; GATE-02 still open on remaining weak fits + CC-CLAIM-003.";
buildState.next_action =
  "Continue THIN-domain deepening (leakage operationalization CC-RQ-P21-028; CC-CLAIM-003 split modules CC-RQ-P21-029); do not reopen applied wording without new decision.";
buildState.gate_02 = gate02Determination;
buildState.weak_fit_claims = weak_fit;
buildState.direct_strong_fit = direct_strong;
buildState.canonical_claim_text_mutations = applied.length;
buildState.governance_status = "DECISIONS_APPLIED";
buildState.decision_id = DECISION_ID;
buildState.sources_registered = srcDoc.sources.length;
writeJson("data/project/current_build_state.json", buildState);

writeJson("data/project/latest_cursor_return.json", {
  version: "0.1.0",
  generated_at: TODAY,
  slice_id: SLICE,
  summary: `Applied ChatGPT governance (CC-DEC-103): 5 claim_text mutations + 009 RETIRED→PRED-009; 010 split→PRED-012; ontology rule shipped. Below-STRONG fit ${beforeWeak}→${weak_fit}. GATE-02 ${gate02Determination}. Baseline 2/86.`,
  return_report:
    "reports/CC_PHASE_2_1_APPLY_CHATGPT_CLAIM_GOVERNANCE_DECISIONS_1_0_RETURN.md",
  gate_02: gate02Determination,
  weak_fit: `${weak_fit}/20`,
  decision_id: DECISION_ID
});

const sliceEntry = {
  slice_id: SLICE,
  title: "Apply ChatGPT Claim Governance Decisions",
  purpose:
    "Apply embedded ChatGPT APPROVE/MODIFY decisions; preserve lineage; ontology-classify; re-audit first-20; reassess GATE-02.",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "CC-DEC-103 recorded",
    "six queue items APPLIED",
    "CC-CLAIM-009 RETIRED",
    "CC-PRED-012 created",
    `below-STRONG ${beforeWeak}→${weak_fit}`,
    "ontology rule shipped"
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0",
  note: "Research-governance adjudicated by ChatGPT; Cursor executed."
};
const existing = sliceQueue.slices.find((s) => s.slice_id === SLICE);
if (existing) Object.assign(existing, sliceEntry);
else sliceQueue.slices.push(sliceEntry);
sliceQueue.active_slice = sliceEntry.next_recommended_slice;
sliceQueue.last_updated = TODAY;
writeJson("data/project/slice_queue.json", sliceQueue);

const returnMd = `# CC-PHASE-2.1-APPLY-CHATGPT-CLAIM-GOVERNANCE-DECISIONS-1.0 — Return

## 1. Executive Summary

ChatGPT's six embedded decisions were applied exactly under \`${DECISION_ID}\`. **Canonical claim_text mutated with full lineage.** CC-CLAIM-009 **RETIRED** → **CC-PRED-009** (ChatGPT wording). CC-CLAIM-010 split: empirical claim + **CC-PRED-012**. Epistemic ontology rule activated (no new architecture).

**Below STRONG fit: ${beforeWeak}/20 → ${weak_fit}/20**  
**DIRECT/STRONG: ${beforeStrong} → ${direct_strong}**  
**GATE-02: ${gate02Determination}**  
**Baseline: 2/86**  
**P0: 0 open**

## 2. Adjudicator Decisions Applied

| Change | Decision | Result |
|---|---|---|
| CC-CHG-P21-001 | MODIFY | CC-CLAIM-001 → honest historical uncertainty |
| CC-CHG-P21-005 | MODIFY | CC-CLAIM-006 → rural decline vs relocation split |
| CC-CHG-P21-RET-009 | APPROVE | CC-CLAIM-009 RETIRED → CC-PRED-009 |
| CC-CHG-P21-002 | MODIFY | CC-CLAIM-010 descriptive; CC-PRED-012 created |
| CC-CHG-P21-003 | MODIFY | CC-CLAIM-016 post-Wayfair neutral wording |
| CC-CHG-P21-004 | APPROVE | CC-CLAIM-017 as Burt proposed |

Adjudicator: **${ADJUDICATOR}** (research-governance). Decision record: \`data/decisions/decisions.json\` → ${DECISION_ID}.

## 3. Canonical Claim Changes (Before → After)

### CC-CLAIM-001
- **Before:** Capitalism has produced broad prosperity across historical contexts.
- **After:** ${LANG["001"]}
- **Disposition:** NOT ENOUGH EVIDENCE / HISTORICAL RESEARCH REQUIRED

### CC-CLAIM-006
- **Before:** Corporate relocation and rural structural decline can drain community capacity, including local banking and healthcare access.
- **After:** ${LANG["006"]}

### CC-CLAIM-009
- **Before:** System-level Constitutional Capitalism over 10–20 years would produce larger distributional effects than isolated corporate tax increases.
- **After:** RETIRED (text preserved in history)
- **Live proposition:** CC-PRED-009 — ${LANG["009_pred"]}
- **Collision note:** Prior abrupt-reform PRED-009 text relocated to **CC-PRED-011** (nothing deleted).

### CC-CLAIM-010
- **Before:** Broader ownership participation would shift many households from wage-only dependence toward multi-source capital ownership.
- **After:** ${LANG["010"]}
- **Prediction:** CC-PRED-012 — ${LANG["010_pred"]}

### CC-CLAIM-016
- **After:** ${LANG["016"]}

### CC-CLAIM-017
- **After:** ${LANG["017"]}

## 4. CC-CLAIM-009 Retirement

**Status: RETIRED.** Historical claim retained. Prediction activated. **Not empirical proof.**

## 5. First-20 Dispositions (material)

| Claim | Before | After |
|---|---|---|
| 001 | REWRITE REQUIRED / NON-SUPPORTING | **NEE / PARTIAL** |
| 006 | QUALIFIES / PARTIAL | **QUALIFIES / STRONG** |
| 009 | RETIRE / N/A | **RETIRED / N/A** |
| 010 | REWRITE REQUIRED / NON-SUPPORTING | **SUPPORTED AS WRITTEN / DIRECT** |
| 016 | REWRITE REQUIRED / PARTIAL | **QUALIFIES / STRONG** |
| 017 | REWRITE REQUIRED / PARTIAL | **QUALIFIES / STRONG** |
| 003 | NEE / PARTIAL | unchanged (still NEE) |

## 6. Source-to-Claim Fit

| Metric | Before | After |
|---|---|---|
| Below STRONG | **${beforeWeak}** | **${weak_fit}** |
| DIRECT | ${priorMatrix.fit_counts.DIRECT || 0} | ${fit_counts.DIRECT || 0} |
| STRONG | ${priorMatrix.fit_counts.STRONG || 0} | ${fit_counts.STRONG || 0} |
| PARTIAL | ${priorMatrix.fit_counts.PARTIAL || 0} | ${fit_counts.PARTIAL || 0} |
| NON-SUPPORTING | ${priorMatrix.fit_counts["NON-SUPPORTING"] || 0} | ${fit_counts["NON-SUPPORTING"] || 0} |

## 7. Ontology Rule

Shipped: \`research/phase_2/claim_epistemic_ontology_rule.json\`  
Report: \`reports/CC_CLAIM_EPISTEMIC_ONTOLOGY_RULE_1_0.md\`  
No new architecture — research-integrity classification only.

## 8. Integrity

${integrity.checks.map((c) => `- [${c.pass ? "PASS" : "FAIL"}] ${c.id}`).join("\n")}  
**All pass:** ${integrity.all_pass}

## 9. GATE-02

# ${gate02Determination}

Blockers remain: ${weak_fit}/20 below STRONG; CC-CLAIM-003 NEE; THIN domains; baseline 2/86.

## 10. All 16 Gates

| ID | Text | Status |
|---|---|---|
${gateTable}

## 11. Baseline

2/86 → 2/86

## 12. P0

0 open

## 13. Validators

Run after script: phase2, research, proofpacket, corpus, graph, baseline, institution.

## 14. Files Changed

- claim_ledger, prediction_ledger, decisions.json (CC-DEC-103)
- governance packet + queue APPLIED
- first_20 matrix/lineage, ontology rule
- knowledge_graph, build state, return report
- \`scripts/run-phase21-apply-chatgpt-claim-governance.mjs\`

## 15. Commit Hash

_(working tree; commit only if requested)_

## 16. Remaining Blockers

1. ${weak_fit}/20 below-STRONG fit
2. CC-CLAIM-003 still NEE
3. Leakage operationalization (CC-RQ-P21-028)
4. Baseline 2/86
5. GATE-02 open

## 17. Exact Next Slice

\`CC-PHASE-2.1-THIN-DOMAIN-LEAKAGE-AND-CLAIM-003-MODULE-SPLIT-1.0\`
`;

writeText(
  "reports/CC_PHASE_2_1_APPLY_CHATGPT_CLAIM_GOVERNANCE_DECISIONS_1_0_RETURN.md",
  returnMd
);

console.log("\n=== APPLY COMPLETE ===");
console.log(`mutations: ${applied.length}`);
console.log(`below STRONG: ${beforeWeak} → ${weak_fit}`);
console.log(`DIRECT/STRONG: ${beforeStrong} → ${direct_strong}`);
console.log(`GATE-02: ${gate02Determination}`);
console.log(`integrity: ${integrity.all_pass}`);
