/**
 * RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0
 *
 * Narrow question: Can OpenFEC reliably measure where candidate money comes from,
 * at what geographic resolution, across cycles, without confusing disclosed
 * contributor geography with ultimate beneficial source?
 *
 * Hard distinctions (do not collapse):
 * - Contributor address ≠ beneficial source
 * - Out-of-state money ≠ illegitimate money
 * - Large contribution ≠ corruption
 * - Independent expenditure ≠ coordination
 * - Donor concentration ≠ political capture
 *
 * No new Evidence Panel. No CC-CLAIM-003 movement. No doctrine.
 *
 * Usage (from CC root, key loaded from RedDirt .env):
 *   node scripts/run-with-reddirt-env.mjs scripts/run-rcip-pass-local-campaign-finance-openfec-locality-probe.mjs
 *   or: node --env-file=H:/SOSWebsite/RedDirt-rcip-public-statistics/.env ...
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REDDIRT_ENV = "H:/SOSWebsite/RedDirt-rcip-public-statistics/.env";
const SLICE = "RCIP-PASS-LOCAL-CAMPAIGN-FINANCE-OPENFEC-LOCALITY-PROBE-1.0";
const OUT_DIR = path.join(ROOT, "data", "project", "campaign_finance_probes");
const TODAY = "2026-08-11";

const HARD_DISTINCTIONS = [
  "Contributor address ≠ beneficial source",
  "Out-of-state money ≠ illegitimate money",
  "Large contribution ≠ corruption",
  "Independent expenditure ≠ coordination",
  "Donor concentration ≠ political capture",
];

/** Deliberately small instrumentation pilot — federal only. */
const SAMPLE = {
  race_state: "AR",
  cycles: [2018, 2020, 2022, 2024],
  races: [
    { label: "AR-SEN", office: "S", district: null },
    { label: "AR-02", office: "H", district: "02" },
    { label: "AR-04", office: "H", district: "04" },
  ],
  /** Top principal candidates by receipts per race-cycle (keeps probe small). */
  top_candidates_per_race_cycle: 2,
  /** FEC Schedule A by_size: size 200 = $200 and under bucket (itemization threshold). */
  small_dollar_size_code: 200,
  small_dollar_lock:
    "FEC Schedule A by_size size=200 ($200 and under) treated as small-dollar bucket for this probe; unitemized aggregates live inside that disclosure regime and are not individual small-donor counts.",
};

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const m = t.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/s);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[m[1]] = val;
  }
  return out;
}

function usable(key) {
  if (!key?.trim()) return false;
  const v = key.trim();
  if (v.length < 8) return false;
  if (/your_?.*api_?key/i.test(v) || /<.*>/.test(v)) return false;
  if (/^(changeme|todo|replace|xxx|placeholder)$/i.test(v)) return false;
  return true;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fecGet(apiKey, pathname, params = {}, attempt = 0) {
  const u = new URL(`https://api.open.fec.gov/v1${pathname}`);
  u.searchParams.set("api_key", apiKey);
  for (const [k, v] of Object.entries(params)) {
    if (v == null || v === "") continue;
    u.searchParams.set(k, String(v));
  }
  const res = await fetch(u);
  if (res.status === 429 && attempt < 6) {
    const wait = 1500 * Math.pow(2, attempt);
    await sleep(wait);
    return fecGet(apiKey, pathname, params, attempt + 1);
  }
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 200) };
  }
  return {
    status: res.status,
    body,
    endpoint: pathname,
    params: { ...params }, // never include key
    retries: attempt,
  };
}

function pct(part, whole) {
  if (!whole || !Number.isFinite(part) || !Number.isFinite(whole)) return null;
  return Math.round((10000 * part) / whole) / 100;
}

function sum(arr) {
  return arr.reduce((a, b) => a + (Number(b) || 0), 0);
}

function hhi(shares) {
  // shares as fractions 0–1
  return shares.reduce((a, s) => a + s * s, 0);
}

async function main() {
  const fileEnv = loadEnvFile(REDDIRT_ENV);
  const apiKey = usable(process.env.OPENFEC_API_KEY)
    ? process.env.OPENFEC_API_KEY.trim()
    : usable(fileEnv.OPENFEC_API_KEY)
      ? fileEnv.OPENFEC_API_KEY.trim()
      : null;

  const provenance = [];
  const raceCycleResults = [];
  const errors = [];

  if (!apiKey) {
    const blocked = {
      slice_id: SLICE,
      status: "BLOCKED_NO_OPENFEC_KEY",
      generated_at: TODAY,
      hard_distinctions: HARD_DISTINCTIONS,
    };
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(
      path.join(OUT_DIR, "openfec_locality_probe_1_0.json"),
      JSON.stringify(blocked, null, 2) + "\n"
    );
    console.log(JSON.stringify(blocked, null, 2));
    process.exit(2);
  }

  // Health ping
  const health = await fecGet(apiKey, "/candidates/", {
    state: "AR",
    per_page: 1,
  });
  provenance.push({
    step: "health",
    endpoint: health.endpoint,
    http: health.status,
    ok: health.status === 200,
  });
  if (health.status !== 200) {
    throw new Error(`OpenFEC health failed HTTP ${health.status}`);
  }

  for (const cycle of SAMPLE.cycles) {
    for (const race of SAMPLE.races) {
      const raceKey = `${race.label}-${cycle}`;
      const totalsParams = {
        state: SAMPLE.race_state,
        office: race.office,
        cycle: String(cycle),
        election_full: "true",
        sort: "-receipts",
        per_page: "20",
      };
      if (race.district) totalsParams.district = race.district;

      const totals = await fecGet(apiKey, "/candidates/totals/", totalsParams);
      provenance.push({
        step: "candidates_totals",
        race: raceKey,
        endpoint: totals.endpoint,
        http: totals.status,
        params: totalsParams,
      });
      await sleep(400);

      if (totals.status !== 200) {
        errors.push(`${raceKey}: candidates/totals HTTP ${totals.status}`);
        await sleep(2000);
        continue;
      }

      const candidates = (totals.body?.results || [])
        .filter((r) => Number(r.receipts) > 0)
        .slice(0, SAMPLE.top_candidates_per_race_cycle);

      const candidateBlocks = [];
      for (const cand of candidates) {
        const candidateId = cand.candidate_id;

        // candidates/totals does not reliably include principal committee ids —
        // resolve via /candidate/{id}/committees/ designation=P.
        let committeeId =
          cand.principal_committee_ids?.[0] || cand.committee_id || null;
        if (!committeeId && candidateId) {
          const com = await fecGet(apiKey, `/candidate/${candidateId}/committees/`, {
            cycle: String(cycle),
            designation: "P",
            per_page: "5",
          });
          provenance.push({
            step: "candidate_principal_committee",
            race: raceKey,
            candidate_id: candidateId,
            http: com.status,
          });
          await sleep(350);
          if (com.status === 200) {
            const rows = com.body?.results || [];
            committeeId = rows[0]?.committee_id || null;
          }
        }

        let byState = null;
        let bySize = null;
        let ies = null;

        if (committeeId) {
          const st = await fecGet(apiKey, "/schedules/schedule_a/by_state/", {
            committee_id: committeeId,
            cycle: String(cycle),
            per_page: "100",
            sort: "-total",
          });
          provenance.push({
            step: "schedule_a_by_state",
            race: raceKey,
            candidate_id: candidateId,
            committee_id: committeeId,
            http: st.status,
          });
          await sleep(350);
          if (st.status === 200) {
            const rows = st.body?.results || [];
            const totalItemizedGeo = sum(rows.map((r) => r.total));
            const arRow = rows.find((r) => r.state === "AR");
            const arTotal = Number(arRow?.total) || 0;
            const outTotal = totalItemizedGeo - arTotal;
            const topStates = rows.slice(0, 5).map((r) => ({
              state: r.state,
              total: Number(r.total) || 0,
              count: r.count,
              share_of_itemized_geo_pct: pct(Number(r.total) || 0, totalItemizedGeo),
            }));
            byState = {
              measurable: true,
              definition:
                "Contributor state on itemized Schedule A receipts to the principal campaign committee (OpenFEC schedule_a/by_state). This is disclosed contributor address geography — not beneficial-source geography.",
              itemized_geo_total: totalItemizedGeo,
              arkansas_total: arTotal,
              out_of_state_total: outTotal,
              arkansas_share_of_itemized_geo_pct: pct(arTotal, totalItemizedGeo),
              out_of_state_share_of_itemized_geo_pct: pct(outTotal, totalItemizedGeo),
              top_states: topStates,
              limitations: [
                "Only itemized contributions appear in by_state geography.",
                "Contributor address ≠ beneficial source (conduit/PAC/nonprofit layers invisible here).",
                "Missing/unknown state rows may exist; treat as residual.",
                "Out-of-state money ≠ illegitimate money.",
              ],
            };
          } else {
            byState = {
              measurable: false,
              http: st.status,
              error: "schedule_a/by_state failed",
            };
          }

          const sz = await fecGet(apiKey, "/schedules/schedule_a/by_size/", {
            committee_id: committeeId,
            cycle: String(cycle),
            per_page: "20",
          });
          provenance.push({
            step: "schedule_a_by_size",
            race: raceKey,
            candidate_id: candidateId,
            committee_id: committeeId,
            http: sz.status,
          });
          await sleep(350);
          if (sz.status === 200) {
            const rows = sz.body?.results || [];
            const totalSized = sum(rows.map((r) => r.total));
            const small = rows.find((r) => Number(r.size) === SAMPLE.small_dollar_size_code);
            const smallTotal = Number(small?.total) || 0;
            const largeTotal = totalSized - smallTotal;
            bySize = {
              measurable: true,
              definition: SAMPLE.small_dollar_lock,
              size_buckets: rows.map((r) => ({
                size: r.size,
                total: Number(r.total) || 0,
                count: r.count,
              })),
              small_dollar_total: smallTotal,
              large_or_other_total: largeTotal,
              small_dollar_share_pct: pct(smallTotal, totalSized),
              limitations: [
                "by_size buckets are FEC disclosure aggregates, not unique small-donor headcounts.",
                "Large contribution ≠ corruption.",
              ],
            };
          } else {
            bySize = {
              measurable: false,
              http: sz.status,
              error: "schedule_a/by_size failed",
            };
          }
        }

        // Independent expenditures mentioning this candidate
        const ie = await fecGet(apiKey, "/schedules/schedule_e/", {
          candidate_id: candidateId,
          cycle: String(cycle),
          per_page: "100",
          sort: "-expenditure_amount",
          is_notice: "false",
        });
        provenance.push({
          step: "schedule_e",
          race: raceKey,
          candidate_id: candidateId,
          http: ie.status,
        });
        await sleep(350);
        if (ie.status === 200) {
          const rows = ie.body?.results || [];
          const support = rows.filter((r) => /S/i.test(String(r.support_oppose_indicator || "")));
          const oppose = rows.filter((r) => /O/i.test(String(r.support_oppose_indicator || "")));
          const byCommittee = new Map();
          for (const r of rows) {
            const cid = r.committee_id || "UNKNOWN";
            byCommittee.set(
              cid,
              (byCommittee.get(cid) || 0) + (Number(r.expenditure_amount) || 0)
            );
          }
          const ieTotal = sum(rows.map((r) => r.expenditure_amount));
          const committeeTotals = [...byCommittee.entries()]
            .map(([committee_id, total]) => ({ committee_id, total }))
            .sort((a, b) => b.total - a.total);
          const shares = ieTotal
            ? committeeTotals.map((c) => c.total / ieTotal)
            : [];
          ies = {
            measurable: true,
            definition:
              "Independent expenditures from Schedule E linked to candidate_id. Spender committee is disclosed; ultimate beneficial funders behind the spender are often not fully visible in this endpoint.",
            page_row_count: rows.length,
            pagination_count: ie.body?.pagination?.count ?? null,
            support_total: sum(support.map((r) => r.expenditure_amount)),
            oppose_total: sum(oppose.map((r) => r.expenditure_amount)),
            ie_total_on_page_or_returned: ieTotal,
            top_spender_committees: committeeTotals.slice(0, 5),
            spender_hhi: shares.length ? Math.round(hhi(shares) * 10000) / 10000 : null,
            limitations: [
              "Independent expenditure ≠ coordination.",
              "Disclaimer/spender name ≠ beneficial-source chain (nonprofit → PAC → super PAC layers may break).",
              "Pagination: probe uses first page (up to 100); large races may undercount unless fully paged.",
              "Donor concentration among IE spenders ≠ political capture.",
            ],
            beneficial_source_break:
              "OpenFEC Schedule E identifies the spending committee and often payee/candidate support-oppose, but does not reliably expose the full chain individual/corporation → nonprofit → PAC → super PAC → expenditure.",
          };
        } else {
          ies = { measurable: false, http: ie.status, error: "schedule_e failed" };
        }

        // Simple itemized donor concentration via schedule_a sample (first page)
        let donorConcentration = null;
        if (committeeId) {
          const sa = await fecGet(apiKey, "/schedules/schedule_a/", {
            committee_id: committeeId,
            two_year_transaction_period: String(cycle),
            per_page: "100",
            sort: "-contribution_receipt_amount",
            is_individual: "true",
          });
          provenance.push({
            step: "schedule_a_top_page",
            race: raceKey,
            candidate_id: candidateId,
            committee_id: committeeId,
            http: sa.status,
          });
          await sleep(350);
          if (sa.status === 200) {
            const rows = sa.body?.results || [];
            const amounts = rows.map((r) => Number(r.contribution_receipt_amount) || 0);
            const pageSum = sum(amounts);
            const top10 = sum(amounts.slice(0, 10));
            donorConcentration = {
              measurable_with_limitations: true,
              definition:
                "Top-page Schedule A individual contributions sorted by amount (first 100). This is a disclosure concentration probe, not a complete donor universe and not capture.",
              page_row_count: rows.length,
              page_sum: pageSum,
              top10_share_of_page_pct: pct(top10, pageSum),
              limitations: [
                "First-page sample only — not full contributor universe.",
                "Donor concentration ≠ political capture (CC-CLAIM-003 hold).",
                "Entity name matching across filings is imperfect.",
              ],
            };
          }
        }

        candidateBlocks.push({
          candidate_id: candidateId,
          name: cand.name,
          party: cand.party_full || cand.party,
          incumbent_challenge_full: cand.incumbent_challenge_full,
          principal_committee_id: committeeId,
          receipts: Number(cand.receipts) || 0,
          disbursements: Number(cand.disbursements) || 0,
          individual_itemized_contributions:
            Number(cand.individual_itemized_contributions) || null,
          individual_unitemized_contributions:
            Number(cand.individual_unitemized_contributions) || null,
          pac_contributions: Number(cand.other_political_committee_contributions) || null,
          locality_by_contributor_state: byState,
          small_large_structure: bySize,
          donor_concentration_probe: donorConcentration,
          independent_expenditures: ies,
        });
      }

      raceCycleResults.push({
        race_key: raceKey,
        label: race.label,
        office: race.office,
        district: race.district,
        cycle,
        candidate_universe_returned: (totals.body?.results || []).length,
        candidates_probed: candidateBlocks,
      });
    }
  }

  // --- Feasibility matrix vs CC-DEM-LCF-001…011 ---
  const hadByState = raceCycleResults.some((r) =>
    r.candidates_probed.some((c) => c.locality_by_contributor_state?.measurable)
  );
  const hadBySize = raceCycleResults.some((r) =>
    r.candidates_probed.some((c) => c.small_large_structure?.measurable)
  );
  const hadTotals = raceCycleResults.some((r) => r.candidates_probed.length > 0);
  const hadIe = raceCycleResults.some((r) =>
    r.candidates_probed.some((c) => c.independent_expenditures?.measurable)
  );
  const hadDonorConc = raceCycleResults.some((r) =>
    r.candidates_probed.some((c) => c.donor_concentration_probe?.measurable_with_limitations)
  );

  const feasibility_matrix = [
    {
      demand_id: "CC-DEM-LCF-001",
      metric: "local_vs_out_of_state_donor_share",
      classification: hadByState ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "schedule_a/by_state on principal campaign committees yields AR vs non-AR shares of itemized contributor-state totals.",
      limitations: [
        "Contributor address ≠ beneficial source",
        "Itemized geography only; unitemized lack state breakout in this endpoint",
        "Multi-cycle reproducible for federal principal committees in this probe sample",
      ],
      geographic_resolution: "contributor_state (not county/ZIP for this aggregate endpoint)",
      beneficial_source_break:
        "Stops at disclosed contributor state on Schedule A to the candidate committee.",
    },
    {
      demand_id: "CC-DEM-LCF-002",
      metric: "small_dollar_share",
      classification: hadBySize ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "schedule_a/by_size size=200 bucket + candidate totals unitemized fields.",
      limitations: [
        SAMPLE.small_dollar_lock,
        "Not unique small-donor counts",
        "Large contribution ≠ corruption",
      ],
      geographic_resolution: "committee-level; not geo-crossed with size in this probe",
      beneficial_source_break: "Size buckets are disclosure aggregates, not ultimate-source classes.",
    },
    {
      demand_id: "CC-DEM-LCF-003",
      metric: "donor_concentration",
      classification: hadDonorConc ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "Schedule A sorted pages + PAC contribution totals; full HHI needs complete pagination / entity resolution.",
      limitations: [
        "Donor concentration ≠ political capture",
        "Entity resolution incomplete",
        "Probe used first-page sample for individuals",
      ],
      geographic_resolution: "n/a (amount concentration)",
      beneficial_source_break: "Top named contributors still may be intermediaries.",
    },
    {
      demand_id: "CC-DEM-LCF-004",
      metric: "independent_expenditure_share",
      classification: hadIe && hadTotals ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "schedule_e totals vs candidate committee disbursements/receipts for ratio construction.",
      limitations: [
        "Independent expenditure ≠ coordination",
        "Pagination may undercount without full crawl",
        "Timing/cycle alignment must be locked",
      ],
      geographic_resolution: "spender committee; not necessarily AR-local speech geography",
      beneficial_source_break:
        "IE share measurable at spender layer; ultimate funders often opaque.",
    },
    {
      demand_id: "CC-DEM-LCF-005",
      metric: "outside_spending_concentration",
      classification: hadIe ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support: "Schedule E concentration among spender committees (HHI on returned rows).",
      limitations: [
        "Spender concentration ≠ beneficial-source concentration",
        "Chain individual/corp → nonprofit → PAC → super PAC → expenditure frequently breaks after spender committee",
      ],
      geographic_resolution: "spender committee",
      beneficial_source_break:
        "NOT OBSERVABLE as full beneficial-source concentration from OpenFEC alone.",
    },
    {
      demand_id: "CC-DEM-LCF-006",
      metric: "candidate_spending_levels",
      classification: hadTotals ? "DIRECTLY_MEASURABLE" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support: "candidates/totals receipts and disbursements by cycle/office/district.",
      limitations: ["Federal candidate committees only in this probe"],
      geographic_resolution: "race geography (state/district), not contributor geography",
      beneficial_source_break: "n/a for spending levels",
    },
    {
      demand_id: "CC-DEM-LCF-007",
      metric: "contested_vs_uncontested",
      classification: "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "OpenFEC can list candidates/receipts; contestedness needs election-results / opponent presence lock outside pure finance totals.",
      limitations: [
        "Competitiveness definition not locked",
        "Unopposed federal races still file finance data",
      ],
      geographic_resolution: "race",
      beneficial_source_break: "n/a",
    },
    {
      demand_id: "CC-DEM-LCF-008",
      metric: "incumbent_challenger_gaps",
      classification: hadTotals ? "DERIVABLE_WITH_LIMITATIONS" : "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support:
        "candidates/totals includes incumbent_challenge_full; compare receipts/disbursements/IE by status.",
      limitations: ["Open-seat coding must be handled separately", "Small sample in this probe"],
      geographic_resolution: "race",
      beneficial_source_break: "n/a for gap construction",
    },
    {
      demand_id: "CC-DEM-LCF-009",
      metric: "ar_state_race_finance_analogues",
      classification: "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support: "OpenFEC does not cover Arkansas statewide/legislative/local races.",
      limitations: [
        "Federal instrumentation pilot only",
        "Need AR SOS / state disclosure / Open States inventory next",
      ],
      geographic_resolution: "n/a via OpenFEC",
      beneficial_source_break: "OpenFEC out of scope for state/local elections",
      note: "HYP-125 ultimately requires state/local elections; OpenFEC is the pilot instrument, not the destination universe.",
    },
    {
      demand_id: "CC-DEM-LCF-010",
      metric: "congress_finance_reform_legislative_objects",
      classification: "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support: "Not an OpenFEC object — Congress.gov / legislative-civic spine.",
      limitations: ["Study objects only; not endorsement"],
      geographic_resolution: "n/a",
      beneficial_source_break: "n/a",
    },
    {
      demand_id: "CC-DEM-LCF-011",
      metric: "journalism_coverage_covariates",
      classification: "REQUIRES_ADDITIONAL_SOURCE",
      openfec_support: "None — link existing civic-information coding; do not invent.",
      limitations: ["Existing matrix partial/directional"],
      geographic_resolution: "AR outlet coding",
      beneficial_source_break: "n/a",
    },
  ];

  // Illustrative computed rows (federal pilot only) — not publication claims
  const illustrative = [];
  for (const race of raceCycleResults) {
    for (const c of race.candidates_probed) {
      const loc = c.locality_by_contributor_state;
      if (!loc?.measurable) continue;
      illustrative.push({
        race_key: race.race_key,
        candidate_id: c.candidate_id,
        name: c.name,
        receipts: c.receipts,
        disbursements: c.disbursements,
        arkansas_share_of_itemized_geo_pct: loc.arkansas_share_of_itemized_geo_pct,
        out_of_state_share_of_itemized_geo_pct: loc.out_of_state_share_of_itemized_geo_pct,
        small_dollar_share_pct: c.small_large_structure?.small_dollar_share_pct ?? null,
        ie_total_returned: c.independent_expenditures?.ie_total_on_page_or_returned ?? null,
        interpretation_guard:
          "Contributor-state shares are disclosure geography only. Out-of-state ≠ illegitimate. Not capture.",
      });
    }
  }

  const classification_counts = feasibility_matrix.reduce((acc, row) => {
    acc[row.classification] = (acc[row.classification] || 0) + 1;
    return acc;
  }, {});

  const verdict = {
    probe_question:
      "Can OpenFEC data reliably measure where candidate money comes from, at what geographic resolution, across multiple election cycles, without confusing disclosed contributor geography with the ultimate source of political influence?",
    answer_summary:
      "Partially. Within the completed Arkansas federal race-cycle sample, OpenFEC reproducibly supports contributor-state locality shares (itemized), size-bucket structure, candidate totals, and spender-layer independent expenditures across multiple cycles. It does not deliver beneficial-source transparency, and it cannot instrument Arkansas state/local elections at all.",
    supports_next_design: [
      "Define defensible locality measures from contributor-state + size buckets with explicit limitation labels",
      "Inventory Arkansas/state/local disclosure sources (HYP-125 destination universe)",
      "Only then historical measurement across election types",
    ],
    does_not_support: [
      "Beneficial-source chain completeness",
      "Treating out-of-state money as illegitimate",
      "Promoting CC-CLAIM-003 from concentration/IE disclosure",
      "Doctrine or new publication panel from this probe",
    ],
  };

  const output = {
    version: "1.0.0",
    slice_id: SLICE,
    generated_at: TODAY,
    status: "PROBE_COMPLETE",
    hypothesis_id: "CC-HYP-LOCAL-DEMOCRATIC-CAMPAIGN-FINANCE-SYSTEM",
    incubator_alias: "HYP-125",
    decision_id: "CC-DEC-105",
    hard_distinctions: HARD_DISTINCTIONS,
    holds: [
      "No new Evidence Panel",
      "No doctrine / principle promotion",
      "CC-CLAIM-003 remains Not Enough Evidence",
      "Federal races are instrumentation pilot only — not the HYP-125 destination universe",
    ],
    research_progression_lock: [
      "OpenFEC feasibility",
      "define defensible locality measures",
      "Arkansas/state/local source inventory",
      "historical measurement",
      "compare election types",
      "test reform mechanisms",
      "legal analysis",
      "only then policy design",
    ],
    sample: SAMPLE,
    openfec_health: { http: health.status, ok: true },
    race_cycle_results: raceCycleResults,
    illustrative_locality_rows: illustrative,
    feasibility_matrix,
    classification_counts,
    beneficial_source_chain_assessment: {
      target_chain: [
        "advertisement",
        "spender",
        "intermediary",
        "funding_organization",
        "significant_original_funding_sources",
      ],
      openfec_visibility: {
        advertisement: "partial (IE payee/purpose fields; not complete ad archive)",
        spender: "usually visible (committee_id on Schedule E / committee on Schedule A recipient side)",
        intermediary: "often opaque",
        funding_organization: "partial for some committees; breaks for dark-money patterns",
        significant_original_funding_sources: "NOT_OBSERVABLE in general from OpenFEC alone",
      },
      rule: "Record the break; do not pretend beneficial-source transparency was achieved.",
    },
    verdict,
    errors,
    provenance_count: provenance.length,
    provenance_sample: provenance.slice(0, 12),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, "openfec_locality_probe_1_0.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

  // Compact matrix artifact for easy reading
  const matrixPath = path.join(OUT_DIR, "locality_measurement_feasibility_matrix_1_0.json");
  writeFileSync(
    matrixPath,
    JSON.stringify(
      {
        slice_id: SLICE,
        generated_at: TODAY,
        hard_distinctions: HARD_DISTINCTIONS,
        classification_counts,
        matrix: feasibility_matrix,
        verdict,
      },
      null,
      2
    ) + "\n"
  );

  console.log(
    JSON.stringify(
      {
        ok: true,
        outPath,
        matrixPath,
        races_probed: raceCycleResults.length,
        illustrative_rows: illustrative.length,
        classification_counts,
        errors: errors.length,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
