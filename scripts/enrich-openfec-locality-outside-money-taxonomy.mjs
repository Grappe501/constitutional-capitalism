/**
 * Enrich OpenFEC locality probe artifacts with outside-money taxonomy
 * (no new API calls; uses stored probe fields).
 */
import { readFileSync, writeFileSync } from "node:fs";

const probePath = "data/project/campaign_finance_probes/openfec_locality_probe_1_0.json";
const matrixPath =
  "data/project/campaign_finance_probes/locality_measurement_feasibility_matrix_1_0.json";
const ldfesPath = "data/project/local_democratic_finance_evidence_system.json";

const probe = JSON.parse(readFileSync(probePath, "utf8"));
const matrix = JSON.parse(readFileSync(matrixPath, "utf8"));
const ldfes = JSON.parse(readFileSync(ldfesPath, "utf8"));

function pct(part, whole) {
  if (!whole || !Number.isFinite(part) || !Number.isFinite(whole)) return null;
  return Math.round((10000 * part) / whole) / 100;
}

const rows = [];
for (const race of probe.race_cycle_results || []) {
  for (const c of race.candidates_probed || []) {
    const receipts = Number(c.receipts) || 0;
    const pac = Number(c.pac_contributions);
    const indivItem = Number(c.individual_itemized_contributions);
    const loc = c.locality_by_contributor_state;
    const ie = c.independent_expenditures;
    const outShare = loc?.measurable ? loc.out_of_state_share_of_itemized_geo_pct : null;
    const arShare = loc?.measurable ? loc.arkansas_share_of_itemized_geo_pct : null;
    // Approximate out-of-state individual itemized $ using geo share × itemized individuals
    const approxOutIndiv =
      loc?.measurable && Number.isFinite(indivItem) && outShare != null
        ? (outShare / 100) * indivItem
        : null;
    rows.push({
      race_key: race.race_key,
      candidate_id: c.candidate_id,
      name: c.name,
      receipts,
      phenomena: {
        LDF_OUT_01_individual_outside_constituency: {
          status: loc?.measurable ? "estimated_from_itemized_contributor_state" : "not_measured",
          arkansas_share_of_itemized_geo_pct: arShare,
          out_of_state_share_of_itemized_geo_pct: outShare,
          approx_out_of_state_itemized_individual_dollars: approxOutIndiv,
          guard: "Contributor address ≠ beneficial source; out-of-state ≠ illegitimate",
        },
        LDF_OUT_02_pac_committee_money: {
          status: Number.isFinite(pac) ? "measured" : "missing",
          pac_contributions: Number.isFinite(pac) ? pac : null,
          pac_share_of_receipts_pct: Number.isFinite(pac) ? pct(pac, receipts) : null,
          guard: "PAC receipts ≠ IE ≠ beneficial source",
        },
        LDF_OUT_03_party_money: {
          status: "field_available_on_openfec_totals_not_stored_in_probe_v1",
          guard: "Party money is a separate phenomenon from PAC and IE",
        },
        LDF_OUT_04_independent_expenditures: {
          status: ie?.measurable ? "spender_layer_measured" : "not_measured",
          ie_total_returned: ie?.ie_total_on_page_or_returned ?? null,
          support_total: ie?.support_total ?? null,
          oppose_total: ie?.oppose_total ?? null,
          ie_to_receipts_ratio:
            ie?.measurable && receipts
              ? Math.round((10000 * (ie.ie_total_on_page_or_returned || 0)) / receipts) / 10000
              : null,
          guard: "IE ≠ coordination; spender ≠ beneficial source",
        },
        LDF_OUT_05_organizational_intermediary_funding: {
          status: "partial_breaks",
          note: "Visible only when intermediary is the disclosed contributor/spender",
        },
        LDF_OUT_06_untraceable_beneficial_source: {
          status: "not_observable_from_openfec_alone",
          note: ie?.beneficial_source_break || "Chain typically breaks after spender committee",
        },
      },
    });
  }
}

const four_answers = {
  q1_contributor_geography_reproducibly_measurable:
    "YES, with limitations — OpenFEC schedule_a/by_state reproducibly yields itemized contributor-state AR vs non-AR shares for principal campaign committees across the completed AR federal sample.",
  q2_locality_comparable_across_cycles_candidates:
    "YES, for federal principal committees using a locked geography rule (state for Senate; House district vs state rule still needs freeze). Multi-cycle comparison demonstrated 2018–2024 for AR-02/AR-04 and Senate on-cycle years.",
  q3_which_demands_openfec_answers:
    matrix.classification_counts,
  q4_where_money_trail_becomes_opaque:
    "After the disclosed contributor (Schedule A) or spending committee (Schedule E). Intermediary layers and significant original funders are often NOT OBSERVABLE — especially individual/corp → nonprofit → PAC → super PAC → expenditure.",
};

probe.outside_money_decomposition = {
  rule: "Do not collapse these into a single 'outside money' claim.",
  taxonomy_ref: "data/project/local_democratic_finance_evidence_system.json",
  candidate_rows: rows,
};
probe.four_answers = four_answers;
probe.local_democratic_finance_evidence_system =
  "data/project/local_democratic_finance_evidence_system.json";

matrix.outside_money_taxonomy = ldfes.outside_money_taxonomy;
matrix.four_answers = four_answers;
matrix.proposed_evidence_system =
  "data/project/local_democratic_finance_evidence_system.json";
matrix.sequence_lock = {
  completed: "RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0",
  next_structural: "RCIP-PASS-COUNTY-NASS-FARM-STRUCTURE-1.0",
  then: "FRED_BEA_macro_wealth_gaps",
  hyp125_definition_parallel: "CC-LOCAL-CAMPAIGN-FINANCE-LOCALITY-MEASURE-LOCK-1.0",
};

writeFileSync(probePath, JSON.stringify(probe, null, 2) + "\n");
writeFileSync(matrixPath, JSON.stringify(matrix, null, 2) + "\n");

console.log(
  JSON.stringify(
    {
      ok: true,
      candidates_enriched: rows.length,
      four_answers,
    },
    null,
    2
  )
);
