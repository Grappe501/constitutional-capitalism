/**
 * CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0
 *
 * Desk primary + instruments for human voice. Do NOT invent mill quotes,
 * toll willingness, or IP livestock-channel access.
 * Processing voice lane remains frozen at ~3 / 0 / 0.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0";
const HYP = "CC-HYP-AR-LOCAL-NON-GMO-FEED-INFRASTRUCTURE-GAP";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";
const PROCESSING_BASELINE = {
  cattle_accessible_claimed_desk: 3,
  booking_confirmed: 0,
  economically_usable_confirmed: 0,
};

function wj(rel, obj) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
  console.log("[OK]", rel);
}
function wt(rel, text) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.endsWith("\n") ? text : text + "\n");
  console.log("[OK]", rel);
}

const srcDoc = JSON.parse(fs.readFileSync(r("data/research/source_registry.json"), "utf8"));
const rqDoc = JSON.parse(fs.readFileSync(r("data/research/research_questions.json"), "utf8"));
const hypDoc = JSON.parse(
  fs.readFileSync(r("research/phase_2/hypothesis_registry_political_power.json"), "utf8")
);
const prRegistry = JSON.parse(
  fs.readFileSync(r("research/phase_2/public_reasoning_registry.json"), "utf8")
);
const buildState = JSON.parse(fs.readFileSync(r("data/project/current_build_state.json"), "utf8"));
const sliceQueue = JSON.parse(fs.readFileSync(r("data/project/slice_queue.json"), "utf8"));
const updates = JSON.parse(fs.readFileSync(r("data/project/updates.json"), "utf8"));
const processingCalls = JSON.parse(
  fs.readFileSync(r("research/phase_2/ar_processing_voice_call_records.json"), "utf8")
);

// Freeze processing lane
if (
  processingCalls.desk_pass_baseline_preserve?.booking_confirmed !== 0 ||
  processingCalls.desk_pass_baseline_preserve?.economically_usable_confirmed !== 0
) {
  console.warn("[WARN] processing call baseline unexpected — not mutating processing records");
}
processingCalls.status = "AWAITING_HUMAN_CALLS";
processingCalls.desk_pass_baseline_preserve = {
  ...processingCalls.desk_pass_baseline_preserve,
  ...PROCESSING_BASELINE,
  zeros_mean: "NOT_YET_VERIFIED — not proof that no capacity exists",
  frozen_by_parallel_slice: SLICE,
  frozen_at: TODAY,
};
fs.writeFileSync(
  r("research/phase_2/ar_processing_voice_call_records.json"),
  JSON.stringify(processingCalls, null, 2) + "\n"
);

const newSources = [
  {
    source_id: "CC-SRC-202",
    title: "JA Farms Feed — Bismarck AR custom feed mill (operator site)",
    authors: ["JA Farms Feed"],
    year: 2026,
    url: "https://www.jafarmsfeed.com/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Independent Bismarck AR feed mill/retailer offering custom feed mixes, protein tubs, minerals, hay. Forms: bulk bags, 50 lb bags, truckload. Species-relevant SKUs include layer ration, goat/sheep, pig grower, cattle mixes. Phones (501) 865-1929 / (501) 626-1160. No published prices; no Non-GMO Project or organic claims on fetched page. Toll milling of farmer-supplied IP grain not advertised.",
    key_findings: [
      "Second open custom mill in Bismarck alongside LF Feeds",
      "Custom formulation exists; verified non-GMO status UNKNOWN",
      "Prices require voice primary",
    ],
    limitations: "No price list; non-GMO/organic not claimed.",
    verification_status: "url_verified_via_fetch",
    notes: "Priority toll-milling call target.",
  },
  {
    source_id: "CC-SRC-203",
    title: "Kalmbach Feeds — Non-GMO Project Verified 17% Layer Crumbles DTC price",
    authors: ["Kalmbach Feeds"],
    year: 2026,
    url: "https://www.kalmbachfeeds.com/products/17-layer-crumble-non-gmo",
    source_type: "commercial_manufacturer",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "US / Arkansas distribution claimed",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Direct product page lists Non-GMO Project Verified 17% layer crumbles, 50 lb, at $21.99 USD (DTC). Ingredients include corn and soybean meal. Demonstrates a published verified non-GMO retail price point available to buyers — not proof of Arkansas grown+milled supply or AR dealer shelf price.",
    key_findings: [
      "Published verified non-GMO retail price: $21.99 / 50 lb DTC",
      "Verification class: Non-GMO Project Verified",
      "Grain origin / mill location not Arkansas-local chain",
    ],
    limitations: "DTC price may differ from AR dealer/freight-delivered cost.",
    verification_status: "url_verified_via_fetch",
    notes: "Desk-evidenced available price — national brand channel.",
  },
  {
    source_id: "CC-SRC-204",
    title: "Dealer listing — Kalmbach Non-GMO 17% Layer Crumbles ~$25.99 / 50 lb",
    authors: ["Spikes & Houles Feed"],
    year: 2026,
    url: "https://www.spikesandhoules.com/kalmbach-feeds-non-gmo-17-layer-crumbles-for-chickens-50-lbs",
    source_type: "commercial_retailer",
    reliability: "secondary_retail_listing",
    primary_or_secondary: "secondary",
    jurisdiction: "US (dealer listing; not AR-specific shelf)",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Independent retailer lists Kalmbach Non-GMO Project Verified 17% layer crumbles 50 lb at $25.99. Provides a second published price observation above Kalmbach DTC. Not an Arkansas store shelf confirmation.",
    key_findings: [
      "Dealer list price observation ~$25.99 / 50 lb",
      "Implies retail markup / channel variance vs $21.99 DTC",
    ],
    limitations: "Not Arkansas geography confirmation; inventory unknown.",
    verification_status: "url_verified_via_search",
    notes: "Price band evidence only.",
  },
  {
    source_id: "CC-SRC-205",
    title: "Amazon listing — Kalmbach 17% Organic Layer Crumbles ~$56.99 / 50 lb",
    authors: ["Amazon marketplace listing for Kalmbach Feeds"],
    year: 2026,
    url: "https://www.amazon.com/dp/B0F8XDMJTZ",
    source_type: "marketplace_listing",
    reliability: "secondary_marketplace",
    primary_or_secondary: "secondary",
    jurisdiction: "US e-commerce",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Marketplace listing for Kalmbach 17% Organic Layer Crumbles 50 lb shows ~$56.99 and USDA Certified Organic claim. Illustrates organic vs Non-GMO Project price gap for similar layer SKUs when purchased via e-commerce. Freight/delivered AR cost and local dealer organic prices UNKNOWN.",
    key_findings: [
      "Organic layer SKU e-commerce observation ~$56.99 / 50 lb",
      "Organic premium can be large vs Non-GMO Project ~$22–26 range",
    ],
    limitations: "Marketplace prices volatile; not AR mill quote.",
    verification_status: "url_verified_via_search",
    notes: "Certification-class price differentiation evidence.",
  },
  {
    source_id: "CC-SRC-206",
    title: "Taggart & Taggart Seed — Augusta AR non-GMO soy + QAI organic soy cleaning",
    authors: ["Taggart & Taggart Seed, Inc."],
    year: 2026,
    url: "https://taggartseed.com/services/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_grain_supply",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Augusta AR firm claims non-GMO soybean seed production with >20 growers within 30 miles; commercial corn buying/storage (~2.37M bu capacity); QAI-certified to clean and bag organic soybeans, stating >280,000 bu cleaned since 2015. Establishes Arkansas IP/non-GMO and organic soy handling capability — channel appears seed/food/export oriented; livestock-feed sales to independents not stated.",
    key_findings: [
      "AR IP/non-GMO soy production/cleaning infrastructure exists",
      "Organic soy handling certified (QAI) with substantial volume claim",
      "Livestock feed channel access NOT ESTABLISHED",
    ],
    limitations: "Does not prove open sale of IP grain to small livestock farms.",
    verification_status: "url_verified_via_fetch",
    notes: "Critical: production/channel ≠ feed-mill access.",
  },
  {
    source_id: "CC-SRC-207",
    title: "Delta Soy — Arkansas non-GMO specialty natto soybeans",
    authors: ["Delta Soy"],
    year: 2026,
    url: "https://www.deltasoy.com/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_grain_supply",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Arkansas-based company specializing in production, storage, cleaning, and international shipping of non-GMO specialty natto soybeans grown across Arkansas. Confirms specialty non-GMO soy identity-preserved supply exists in-state for food/export markets.",
    key_findings: [
      "AR non-GMO specialty soy IP chain exists",
      "Primary market described as international food (natto), not livestock feed",
    ],
    limitations: "No livestock-feed offtake or prices stated.",
    verification_status: "url_verified_via_fetch",
    notes: "Channel mismatch hypothesis support.",
  },
  {
    source_id: "CC-SRC-208",
    title: "ImportGenius — River Valley Organics (Hartman AR) NOP organic paprika import",
    authors: ["ImportGenius customs extract"],
    year: 2025,
    url: "https://www.importgenius.com/importers/river-valley-organics",
    source_type: "customs_trade_record_aggregator",
    reliability: "secondary_customs_aggregator",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "2025-10-07",
    retrieval_date: TODAY,
    summary:
      "Customs aggregator shows River Valley Organics, 277 County Rd 3020, Hartman AR, as importer of NOP organic paprika powder (arrival 2025-10-07; contact Leon Hostetler). Strengthens that the Hartman facility handles NOP organic ingredients. Does not by itself prove USDA organic livestock-feed certification status or open retail pricing.",
    key_findings: [
      "Hartman AR facility handles NOP organic ingredients",
      "Contact name for primary verification: Leon Hostetler",
      "Full organic feed certification still requires OID/primary confirm",
    ],
    limitations: "Aggregator; single shipment; not a feed price list.",
    verification_status: "url_verified_via_fetch",
    notes: "Upgrade from directory-only RVO evidence.",
  },
  {
    source_id: "CC-SRC-209",
    title: "Powell Feed & Milling — Green Forest AR custom mills / retail network",
    authors: ["Powell Feed Stores"],
    year: 2026,
    url: "https://www.powellfeedstores.com/about-us",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Family-owned N Arkansas feed manufacturer since 1942; claims multiple feed mills and ~17 retail locations; custom-milled livestock feed and bulk delivery. Green Forest contact commonly listed ~870-438-5184. No Non-GMO Project/organic claims on about page. Toll milling of farmer IP grain not advertised.",
    key_findings: [
      "Regional open custom-milling network in N Arkansas",
      "Verified specialty status UNKNOWN",
      "Toll/IP segregation willingness UNKNOWN — call required",
    ],
    limitations: "No prices; specialty claims absent.",
    verification_status: "url_verified_via_search",
    notes: "Priority regional custom-mill call target.",
  },
  {
    source_id: "CC-SRC-210",
    title: "NEMO Feed (MO) — published toll milling service example (comparator)",
    authors: ["NEMO Feed"],
    year: 2026,
    url: "https://nemofeed.com/services/",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Missouri",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Missouri feed manufacturer publicly advertises toll milling (custom milling, mixing, pelleting, extruding). Used only as a comparator showing toll milling is a recognized commercial service in the region — not evidence that Arkansas mills offer equivalent IP-segregated toll services.",
    key_findings: [
      "Toll milling is a known commercial product nearby",
      "Does not prove AR mill willingness or segregation capability",
    ],
    limitations: "Out-of-state comparator only.",
    verification_status: "url_verified_via_search",
    notes: "Shows the service class exists; AR status still UNKNOWN.",
  },
];

for (const s of newSources) {
  const i = srcDoc.sources.findIndex((x) => x.source_id === s.source_id);
  if (i >= 0) srcDoc.sources[i] = s;
  else srcDoc.sources.push(s);
}
srcDoc.last_updated = TODAY;
srcDoc.note =
  (srcDoc.note || "") +
  ` Phase 2.1 (${TODAY}): CC-SRC-202–210 non-GMO feed primary price / IP grain / toll milling study.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources; total", srcDoc.sources.length);

// ─── Price matrix ──────────────────────────────────────────────
wj("research/phase_2/ar_nongmo_feed_primary_price_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "DESK_PRIMARY_PARTIAL_VOICE_REQUIRED",
  hard_rule:
    "Published national retail prices ≠ Arkansas mill quotes. Empty mill cells stay UNKNOWN until human call records entered.",
  verification_classes: [
    "CERTIFIED_ORGANIC",
    "NON_GMO_PROJECT_VERIFIED",
    "IDENTITY_PRESERVED_NON_GMO",
    "TESTED_NON_GMO",
    "SUPPLIER_ATTESTED_NON_GMO",
    "CONVENTIONAL",
    "UNSPECIFIED",
  ],
  rows: [
    {
      id: "PRICE-KALMBACH-NONGMO-LAYER-DTC",
      supplier: "Kalmbach Feeds (DTC)",
      geography: "US_ecommerce_ships_to_AR_claimed",
      product: "17% Layer Crumbles Non-GMO",
      verification_class: "NON_GMO_PROJECT_VERIFIED",
      form: "50_lb_bag",
      unit_price_usd: 21.99,
      price_basis: "listed_dtc_2026-08-10",
      minimum_order: "1_bag_retail",
      grain_origin: "NOT_ARKANSAS_LOCAL_CHAIN",
      segregation_standard: "Non-GMO Project program",
      delivery: "ecommerce_shipping_extra_unknown",
      ar_grown_milled_distributed: false,
      economically_usable: "UNKNOWN",
      source_ids: ["CC-SRC-203", "CC-SRC-193"],
      evidence_class: "DESK_PRIMARY_PUBLISHED",
    },
    {
      id: "PRICE-KALMBACH-NONGMO-LAYER-DEALER",
      supplier: "Spikes & Houles (dealer listing)",
      geography: "US_dealer_not_AR_confirmed",
      product: "Kalmbach 17% Layer Crumbles Non-GMO",
      verification_class: "NON_GMO_PROJECT_VERIFIED",
      form: "50_lb_bag",
      unit_price_usd: 25.99,
      price_basis: "listed_dealer_2026-08-10",
      minimum_order: "1_bag_retail",
      grain_origin: "NOT_ARKANSAS_LOCAL_CHAIN",
      ar_grown_milled_distributed: false,
      source_ids: ["CC-SRC-204"],
      evidence_class: "DESK_SECONDARY_RETAIL",
    },
    {
      id: "PRICE-KALMBACH-ORGANIC-LAYER-AMAZON",
      supplier: "Amazon marketplace / Kalmbach Organic",
      geography: "US_ecommerce",
      product: "17% Organic Layer Crumbles",
      verification_class: "CERTIFIED_ORGANIC",
      form: "50_lb_bag",
      unit_price_usd: 56.99,
      price_basis: "marketplace_observation_2026-08-10",
      minimum_order: "1_bag_retail",
      grain_origin: "NOT_ARKANSAS_LOCAL_CHAIN",
      note: "Illustrates organic premium vs Non-GMO Project SKU band; volatile",
      source_ids: ["CC-SRC-205"],
      evidence_class: "DESK_SECONDARY_MARKETPLACE",
    },
    {
      id: "PRICE-LF-FEEDS-BISMARCK",
      supplier: "LF Feeds LLC",
      geography: "Bismarck_AR",
      product: "custom livestock rations",
      verification_class: "UNSPECIFIED",
      unit_price_usd: null,
      price_basis: "UNKNOWN",
      minimum_order: "UNKNOWN",
      grain_origin: "arkansas_claimed_local",
      toll_milling_farmer_grain: "UNKNOWN",
      source_ids: ["CC-SRC-191"],
      evidence_class: "VOICE_REQUIRED",
      phone: "(501) 304-4323",
    },
    {
      id: "PRICE-JA-FARMS-BISMARCK",
      supplier: "JA Farms Feed",
      geography: "Bismarck_AR",
      product: "custom mixes / layer / goat / pig / cattle",
      verification_class: "UNSPECIFIED",
      unit_price_usd: null,
      price_basis: "UNKNOWN",
      minimum_order: "UNKNOWN_bulk_bag_50lb_truckload_offered",
      grain_origin: "UNKNOWN",
      toll_milling_farmer_grain: "UNKNOWN",
      source_ids: ["CC-SRC-202"],
      evidence_class: "VOICE_REQUIRED",
      phone: "(501) 865-1929",
    },
    {
      id: "PRICE-RVO-HARTMAN",
      supplier: "River Valley Organics",
      geography: "Hartman_AR",
      product: "organic livestock feed claimed",
      verification_class: "CERTIFIED_ORGANIC_CANDIDATE",
      unit_price_usd: null,
      price_basis: "UNKNOWN",
      minimum_order: "UNKNOWN",
      grain_origin: "UNKNOWN_imports_some_NOP_ingredients",
      toll_milling_farmer_grain: "UNKNOWN",
      source_ids: ["CC-SRC-192", "CC-SRC-208"],
      evidence_class: "VOICE_REQUIRED",
      phone: "(479) 497-1616",
      note: "NOP ingredient handling evidenced via customs; feed OID still primary-verify",
    },
    {
      id: "PRICE-POWELL-GREEN-FOREST",
      supplier: "Powell Feed & Milling",
      geography: "Green_Forest_AR_network",
      product: "custom-milled livestock feed",
      verification_class: "UNSPECIFIED",
      unit_price_usd: null,
      price_basis: "UNKNOWN",
      minimum_order: "UNKNOWN",
      toll_milling_farmer_grain: "UNKNOWN",
      source_ids: ["CC-SRC-209"],
      evidence_class: "VOICE_REQUIRED",
      phone: "(870) 438-5184",
    },
  ],
  desk_price_band_summary: {
    nongmo_project_layer_50lb_usd: { low: 21.99, high: 25.99, n: 2 },
    organic_layer_50lb_usd_observation: { value: 56.99, n: 1, volatile: true },
    arkansas_mill_verified_quotes: 0,
    note: "National retail availability proven; AR mill economically usable layer still UNKNOWN",
  },
  last_updated: TODAY,
});

wj("research/phase_2/ar_ip_grain_livestock_channel_map.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "PARTIAL_DESK",
  core_distinction:
    "Arkansas can produce/handle IP non-GMO and organic soy without that grain being available as livestock feed to independent farmers.",
  nodes: [
    {
      id: "IP-TAGGART-AUGUSTA",
      name: "Taggart & Taggart Seed",
      location: "Augusta, AR",
      commodities: ["non_gmo_soybeans_seed", "organic_soybeans_cleaning", "commercial_corn"],
      verification: ["non_gmo_seed_production", "QAI_organic_soy_cleaning"],
      claimed_volume_note: ">280,000 bu organic soy cleaned since 2015 (operator claim)",
      primary_channels_claimed: ["seed", "commercial_grain", "organic_soy_handling", "container_export_capable"],
      livestock_feed_channel_to_independents: "NOT_ESTABLISHED",
      phone: "(870) 347-6301",
      source_ids: ["CC-SRC-206"],
    },
    {
      id: "IP-DELTA-SOY",
      name: "Delta Soy",
      location: "Arkansas (statewide grower network claimed)",
      commodities: ["non_gmo_specialty_natto_soybeans"],
      verification: ["identity_preserved_non_gmo_food_grade"],
      primary_channels_claimed: ["international_food_export"],
      livestock_feed_channel_to_independents: "NOT_ESTABLISHED_LIKELY_NO",
      source_ids: ["CC-SRC-207"],
    },
    {
      id: "IP-CONVENTIONAL-COMMODITY",
      name: "Arkansas conventional corn/soy stream",
      commodities: ["corn", "soybeans"],
      verification: ["CONVENTIONAL"],
      livestock_feed_channel_to_independents: "YES_VIA_COMMODITY_MILLS",
      specialty_verified_nongmo: "NOT_BY_DEFAULT",
      source_ids: ["CC-SRC-199"],
    },
  ],
  channel_gap_hypothesis:
    "IP non-GMO/organic soy capacity in AR may serve seed/food/export first. The livestock-feed bridge (contracts → segregated storage → open mill) is the unproven link.",
  last_updated: TODAY,
});

wj("research/phase_2/ar_toll_milling_and_custom_blend_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  question:
    "Can Arkansas mills custom-blend or toll-process farmer/co-op grain while preserving identity?",
  least_cost_repair_candidate:
    "existing mills + aggregated producer demand + IP grain contracts / toll milling",
  definitions: {
    custom_blend_mill_ingredients:
      "Mill formulates ration from mill-sourced ingredients to farmer specs",
    toll_mill_farmer_grain:
      "Farmer/co-op delivers owned grain; mill grinds/mixes/pellets for a fee; ownership of grain remains with farmer/co-op",
    identity_preserved_toll:
      "Toll milling with documented segregation/cleanout/testing to protect non-GMO/organic identity",
  },
  arkansas_desk_findings: [
    {
      mill: "LF Feeds",
      custom_blend_advertised: true,
      toll_ip_advertised: false,
      status: "VOICE_REQUIRED",
      source_ids: ["CC-SRC-191"],
    },
    {
      mill: "JA Farms Feed",
      custom_blend_advertised: true,
      toll_ip_advertised: false,
      status: "VOICE_REQUIRED",
      source_ids: ["CC-SRC-202"],
    },
    {
      mill: "Powell Feed & Milling",
      custom_blend_advertised: true,
      toll_ip_advertised: false,
      status: "VOICE_REQUIRED",
      source_ids: ["CC-SRC-209"],
    },
    {
      mill: "River Valley Organics",
      custom_blend_advertised: "UNKNOWN",
      organic_handling_candidate: true,
      toll_ip_advertised: false,
      status: "VOICE_REQUIRED",
      source_ids: ["CC-SRC-208"],
    },
    {
      mill: "Integrator mills (Tyson/Simmons/Butterball)",
      custom_blend_advertised: "captive_only",
      toll_ip_for_independents: "NO_OPEN_MARKET",
      note: "Butterball has segregated specialty line inside captive system",
      source_ids: ["CC-SRC-196", "CC-SRC-197", "CC-SRC-198"],
    },
  ],
  regional_comparator: {
    note: "MO mills publicly advertise toll milling (e.g., NEMO Feed) — proves service class exists nearby, not AR availability",
    source_ids: ["CC-SRC-210"],
  },
  verdict_desk: "NOT_ENOUGH_EVIDENCE — toll/IP pathway must be voice-tested before any new-mill hypothesis advances",
  advance_new_mill_gate:
    "Do not advance greenfield mill recommendations until LF Feeds, JA Farms, Powell, and RVO have been asked about identity-preserved toll/custom runs and refused or proven technically unable under stated conditions.",
  last_updated: TODAY,
});

wj("research/phase_2/ar_feed_bottleneck_adjudication.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  question:
    "Is the real bottleneck feed milling, segregated grain supply, demand aggregation, transportation, or certification?",
  candidates: [
    {
      id: "MILLING_CAPACITY",
      desk_status: "UNLIKELY_PRIMARY",
      rationale: "Extensive licensed feed commerce + open custom mills + captive mega-mills",
    },
    {
      id: "SEGREGATED_IP_GRAIN_TO_FEED_CHANNEL",
      desk_status: "LEADING_CANDIDATE",
      rationale:
        "IP/non-GMO and organic soy handling exists (Taggart/Delta Soy) but livestock-feed bridge unproven; conventional commodity stream abundant",
    },
    {
      id: "DEMAND_AGGREGATION",
      desk_status: "CO_LEADING_CANDIDATE",
      rationale:
        "Specialty runs and IP toll need committed volume; cooperatives remain equal-standing repair",
    },
    {
      id: "TRANSPORTATION",
      desk_status: "NOT_PROVEN_PRIMARY",
      rationale: "National bagged retail already reaches AR; freight may matter for bulk but not yet measured as dominant premium",
    },
    {
      id: "CERTIFICATION_VERIFICATION",
      desk_status: "MATERIAL_FRICTION",
      rationale:
        "Organic vs Non-GMO Project price gap large in desk observations; verification class drives market-claim economics",
    },
    {
      id: "TOLL_MILL_UNWILLINGNESS_OR_INABILITY",
      desk_status: "UNKNOWN_CRITICAL_TEST",
      rationale: "If mills refuse/cannot segregate, infrastructure case strengthens; if willing with demand, least-cost repair likely",
    },
  ],
  working_diagnosis_refined:
    "Arkansas has feed production capacity, but independent family farmers seeking verified non-GMO or organic feed may face a gap in open, identity-preserved, segregated, and economically usable supply — with a testable least-cost repair via existing mills + IP grain contracts + demand aggregation/toll milling.",
  last_updated: TODAY,
});

// Voice call records (empty slots)
wj("research/phase_2/ar_feed_voice_call_records.json", {
  version: "0.1.0",
  slice_id: SLICE,
  status: "AWAITING_HUMAN_CALLS",
  generated_at: TODAY,
  hard_rule:
    "Do not invent mill prices, toll willingness, grain origin, or segregation capability. Empty fields stay UNKNOWN until human call records entered.",
  processing_lane_frozen: PROCESSING_BASELINE,
  unlock_rule:
    "First bottleneck adjudication upgrade after LF Feeds + JA Farms + River Valley Organics entered (COMPLETED or PARTIAL). Powell + Taggart strengthen IP/toll conclusions. Do not recommend new mills from empty slots.",
  call_record_schema: {
    call_id: "string",
    facility_id: "string",
    facility_name: "string",
    phone: "string",
    call_datetime_local: "ISO-8601 or date + time Central",
    caller_name: "string",
    respondent_role: "owner|manager|sales|nutritionist|other|declined_identify",
    attribution_allowed: "boolean",
    outcome:
      "COMPLETED|PARTIAL|REFUSED|NO_ANSWER|VOICEMAIL_ONLY|WRONG_NUMBER|CALL_BACK_SCHEDULED",
    products_quoted: [
      {
        product_name: "string",
        species: "string",
        verification_class: "string",
        form: "bag|bulk|either|unknown",
        price: "text|null",
        unit: "per_50lb|per_ton|per_cwt|other|null",
        minimum_order: "text|null",
        delivery_or_pickup: "text|null",
        freight_terms: "text|null",
      },
    ],
    grain_origin_stated: "text|null",
    segregation_standard_stated: "text|null",
    testing_or_certification_stated: "text|null",
    custom_blend_available: "yes|no|limited|unknown|null",
    toll_mill_farmer_grain: "yes|no|limited|unknown|null",
    toll_ip_segregation_possible: "yes|no|conditional|unknown|null",
    toll_conditions: "text|null",
    min_run_for_specialty_or_toll: "text|null",
    cleanout_fee_or_protocol: "text|null",
    would_work_with_producer_coop: "yes|no|maybe|unknown|null",
    stated_bottleneck: "text|null",
    bottleneck_codes_caller_map: [
      "MILLING_CAPACITY",
      "SEGREGATED_IP_GRAIN_SUPPLY",
      "DEMAND_AGGREGATION",
      "TRANSPORTATION",
      "CERTIFICATION_COST",
      "CONTAMINATION_RISK",
      "LABOR",
      "WORKING_CAPITAL",
      "REGULATION",
      "OTHER",
      "DECLINED",
      "UNKNOWN",
    ],
    raw_quotes: [
      {
        text: "string",
        evidence_class: "OWN_OPERATION_FACT|INDUSTRY_BELIEF|UNCLEAR",
      },
    ],
    notes: "string|null",
    entered_by: "string",
    entered_at: "date",
  },
  evidence_class_rule:
    "Do not promote INDUSTRY_BELIEF into price or toll facts. Cursor may cite beliefs only as hypotheses.",
  priority_slots: [
    {
      call_id: "FEED-CALL-01",
      facility_id: "FEED-LF-BISMARCK",
      facility_name: "LF Feeds LLC",
      phone: "(501) 304-4323",
      priority: 1,
      status: "EMPTY",
      record: null,
    },
    {
      call_id: "FEED-CALL-02",
      facility_id: "FEED-JA-FARMS",
      facility_name: "JA Farms Feed",
      phone: "(501) 865-1929",
      alt_phone: "(501) 626-1160",
      priority: 2,
      status: "EMPTY",
      record: null,
    },
    {
      call_id: "FEED-CALL-03",
      facility_id: "FEED-RVO-HARTMAN",
      facility_name: "River Valley Organics",
      phone: "(479) 497-1616",
      contact_hint: "Leon Hostetler (customs records)",
      priority: 3,
      status: "EMPTY",
      record: null,
    },
    {
      call_id: "FEED-CALL-04",
      facility_id: "FEED-POWELL-GREEN-FOREST",
      facility_name: "Powell Feed & Milling — Green Forest",
      phone: "(870) 438-5184",
      priority: 4,
      status: "EMPTY",
      record: null,
    },
    {
      call_id: "FEED-CALL-05",
      facility_id: "IP-TAGGART-AUGUSTA",
      facility_name: "Taggart & Taggart Seed",
      phone: "(870) 347-6301",
      priority: 5,
      status: "EMPTY",
      focus: "IP/non-GMO/organic soy availability to livestock feed buyers or mills",
      record: null,
    },
  ],
  last_updated: TODAY,
});

wt(
  "reports/CC_AR_FEED_HUMAN_VOICE_CALL_PROTOCOL_1_0.md",
  `# Arkansas Feed / Non-GMO — Human Voice Call Protocol 1.0

**Slice:** \`${SLICE}\`  
**Role:** Human caller only. Cursor must **not** invent mill prices, toll willingness, grain origin, or segregation capability.

## Processing lane (frozen)

Preserve processing baseline **~3 / 0 / 0**. Do not invent booking lead times there.

## Identity script

> Hello — my name is [Name]. I’m doing research for the Constitutional Capitalism project on Arkansas family-farm feed access, especially verified non-GMO and organic options. This is not a sales call and we’re not placing an order today. We’re trying to understand what independent farmers can actually buy or have milled. Do you have a few minutes? You can decline any commercially sensitive item.

Offer anonymity for prices if requested. Record attribution permission.

## Priority call order

1. **LF Feeds LLC — Bismarck** — (501) 304-4323  
2. **JA Farms Feed — Bismarck** — (501) 865-1929 / (501) 626-1160  
3. **River Valley Organics — Hartman** — (479) 497-1616 *(ask for Leon Hostetler if useful)*  
4. **Powell Feed & Milling — Green Forest** — (870) 438-5184  
5. **Taggart & Taggart Seed — Augusta** — (870) 347-6301 *(IP grain channel; not a feed mill)*  

Optional later: Kalmbach AR dealers (retail shelf price), Delta Soy (food-channel offtake only).

## Required fields (mills)

Capture exactly; use \`DECLINED\`, \`UNKNOWN\`, or \`N/A\` — never invent.

1. Sell to independent / outside livestock producers?  
2. Products by species (cattle / hog / sheep-goat / poultry / other)  
3. Verification class available today (organic / Non-GMO Project / IP tested / supplier-attested / conventional / none)  
4. Current prices (per 50 lb / ton / other) and **minimum order**  
5. Pickup vs delivery; delivery radius / freight terms  
6. Grain origin (Arkansas / regional / Midwest / unknown)  
7. Segregation / testing / certification mechanism  
8. **Custom blend** from mill ingredients? (Y/N/conditions)  
9. **Toll mill farmer/co-op grain?** (Y/N/conditions)  
10. If toll: can identity be preserved (cleanout, dedicated run, testing)? Fees? Min run size?  
11. Would you work with a producer cooperative on scheduled specialty runs?  
12. **What do *you* believe is the main bottleneck** for verified non-GMO/organic feed for independent farmers?

Question 12 is mandatory. Do **not** suggest “we need a new mill” as the answer.

## Required fields (Taggart / IP grain)

1. Sell non-GMO or organic soy/corn to livestock feed mills or producers?  
2. Minimum lots / contracts  
3. Testing standard  
4. Any existing livestock-feed offtake in Arkansas?  
5. Willingness to contract with a co-op supplying an open mill?

## Evidence class

| Class | Definition |
| --- | --- |
| **OWN_OPERATION_FACT** | About their mill/elevator |
| **INDUSTRY_BELIEF** | About Arkansas generally |

Do not collapse these.

## After calls

Enter into \`research/phase_2/ar_feed_voice_call_records.json\`.

**Unlock first bottleneck upgrade** after LF Feeds + JA Farms + River Valley Organics entered.  
**Do not recommend new mills** until toll/IP questions are answered for those three (and preferably Powell).
`
);

wt(
  "reports/CC_AR_FEED_VOICE_CALL_ONE_PAGE_WORKSHEET_1_0.md",
  `# Feed Voice Call — One-Page Worksheet

**Facility:** _______________________ **Phone:** _____________ **Date/time:** _____________  
**Caller:** _____________ **Respondent/role:** _____________ **Attribution OK?** Y / N  
**Outcome:** COMPLETED / PARTIAL / REFUSED / NO_ANSWER / VOICEMAIL / WRONG# / CALLBACK

## Products / prices

| Product | Species | Verification class | Form | Price | Min order | Pickup/delivery |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |
| | | | | | | |

Grain origin: _________________ Segregation/testing: _________________

## Custom / toll

- Custom blend (mill ingredients): Y / N / limited — notes: _____________
- Toll mill farmer/co-op grain: Y / N / limited — notes: _____________
- IP segregation possible: Y / N / conditional — cleanout/min run/fees: _____________
- Work with producer co-op: Y / N / maybe — notes: _____________

## Bottleneck (their words)

OWN_OPERATION_FACT: _______________________________________________  
INDUSTRY_BELIEF: _________________________________________________

Codes (caller map): milling / IP grain / demand / transport / certification / other: _____________

Enter into \`ar_feed_voice_call_records.json\` the same day.
`
);

wt(
  "reports/CC_ARKANSAS_FEED_RESEARCH_HANDOFF_HUMAN_VOICE_PASS_1_0.md",
  `# Arkansas Feed Research Handoff — Human Voice Pass 1.0

## Desk pass already done

- National verified non-GMO retail price band observed (~$22–$26 / 50 lb layer; organic e-com ~$57)
- AR open custom mills identified: LF Feeds, JA Farms, Powell
- RVO Hartman handles NOP organic ingredients (customs)
- AR IP soy exists (Taggart, Delta Soy) — livestock-feed channel unproven
- Toll/IP willingness at AR mills: **UNKNOWN**

## What humans must do next

Call priority mills using \`CC_AR_FEED_HUMAN_VOICE_CALL_PROTOCOL_1_0.md\` and enter \`ar_feed_voice_call_records.json\`.

## Decision fork after calls

| If calls show… | Then… |
| --- | --- |
| Mills will IP-toll / specialty-run with co-op volume | Prefer aggregation + contracts over new mills |
| Mills refuse or cannot segregate | Infrastructure case for dedicated capacity strengthens |
| IP grain unavailable to feed channel | Grain-contract / elevator bridge is the repair |
| Prices make specialty unverifiable economically | Economically usable layer fails — publish that |

## Parallel

Processing voice pass remains frozen at **~3 / 0 / 0**.
`
);

// Hypothesis update
const hyp = hypDoc.hypotheses.find((h) => h.hypothesis_id === HYP);
if (hyp) {
  hyp.empirical_status =
    "QUALIFIED — desk pass refined: IP soy/handling exists in AR but livestock-feed bridge unproven; published national verified retail prices exist; AR mill quotes/toll IP willingness VOICE_REQUIRED. Least-cost repair candidate = existing mills + IP contracts + demand aggregation.";
  hyp.dossier_verdict = "QUALIFIED";
  hyp.dossier_reason =
    "Primary price/IP/toll study: channel gap and toll willingness are the decisive unknowns. No new-mill recommendation. Processing lane frozen separately.";
  hyp.last_updated = TODAY;
  hyp.slice_id = SLICE;
  hyp.related_sources = [
    ...(hyp.related_sources || []),
    "CC-SRC-202",
    "CC-SRC-203",
    "CC-SRC-206",
    "CC-SRC-207",
    "CC-SRC-208",
    "CC-SRC-209",
  ].filter((v, i, a) => a.indexOf(v) === i);
}
fs.writeFileSync(
  r("research/phase_2/hypothesis_registry_political_power.json"),
  JSON.stringify(hypDoc, null, 2) + "\n"
);

// RQs
const rqArr = rqDoc.questions || rqDoc.research_questions;
const newRqs = [
  {
    id: "CC-RQ-P21-078",
    question:
      "What are current LF Feeds, JA Farms, River Valley Organics, and Powell prices/minimums for verified non-GMO or organic livestock rations sold to independents?",
    status: "OPEN",
    priority: "critical",
    note: "Voice primary required.",
  },
  {
    id: "CC-RQ-P21-079",
    question:
      "Will those mills toll-process or custom-run farmer/co-op identity-preserved grain with stated cleanout, testing, min run, and fees?",
    status: "OPEN",
    priority: "critical",
  },
  {
    id: "CC-RQ-P21-080",
    question:
      "Will Taggart (or similar) sell IP non-GMO/organic soy/corn into Arkansas livestock-feed channels or co-op contracts?",
    status: "OPEN",
    priority: "high",
  },
  {
    id: "CC-RQ-P21-081",
    question:
      "For a representative specialty enterprise, does national bagged Non-GMO Project feed already dominate AR mill options on delivered cost?",
    status: "OPEN",
    priority: "high",
  },
  {
    id: "CC-RQ-P21-082",
    question:
      "After voice answers, which single bottleneck (milling / IP grain channel / demand / transport / certification) is primary?",
    status: "OPEN",
    priority: "critical",
  },
];
for (const q of newRqs) {
  const i = rqArr.findIndex((x) => x.id === q.id);
  if (i >= 0) rqArr[i] = { ...rqArr[i], ...q };
  else rqArr.push(q);
}
rqDoc.last_updated = TODAY;
fs.writeFileSync(r("data/research/research_questions.json"), JSON.stringify(rqDoc, null, 2) + "\n");

// Public reasoning
const prs = [
  [
    "062",
    "If Arkansas already grows non-GMO soy, why is feed still hard?",
    "Specialty soy often moves through seed, food, or export channels. That is not the same as an open livestock-feed offer with segregation, testing, and small-lot delivery to independent farms.",
  ],
  [
    "063",
    "Can’t farmers just buy Non-GMO Project feed at the store?",
    "Sometimes yes — national brands publish Arkansas availability and retail prices. That proves retail access, not a local grown-and-milled chain, and may not fit every species, bulk need, or organic market claim.",
  ],
  [
    "064",
    "Why ask mills about toll milling before proposing a new mill?",
    "If an existing mill will grind and mix farmer or co-op grain under identity-preserving rules, that can repair the gap using capital that already exists. A new mill is the more expensive hypothesis and should wait on that test.",
  ],
  [
    "065",
    "Why is organic feed so much more expensive than non-GMO feed?",
    "Desk observations show a large gap between Non-GMO Project layer bags and organic layer bags. Certification, organic ingredient supply, and smaller runs can all matter. We will not guess which dominates until Arkansas mill quotes are collected.",
  ],
  [
    "066",
    "Is transportation the main problem?",
    "Not proven. Bagged verified feed already ships into Arkansas. Freight may matter for bulk rations, but segregation, verification, and demand aggregation remain leading candidates until measured.",
  ],
  [
    "067",
    "What would count as fixing the problem without building mills?",
    "Committed co-op demand, IP grain contracts, and scheduled specialty or toll runs at willing existing mills — if voice research shows those mills can and will segregate.",
  ],
  [
    "068",
    "When would a new mill become the honest answer?",
    "If open mills refuse or cannot identity-preserve specialty runs under realistic volumes, and regional retail options remain economically unusable for the target enterprises — after those facts are recorded, not before.",
  ],
];
for (const [num, q, a] of prs) {
  const id = `CC-PR-${num}`;
  wt(
    `reports/public_reasoning/${id}.md`,
    `# ${id}\n\n## Skeptical reader question\n\n${q}\n\n## Public answer\n\n${a}\n\n## Slice\n\n${SLICE}\n`
  );
  const rec = {
    record_id: id,
    slice_id: SLICE,
    skeptical_reader_question: q,
    public_answer: a,
    decision_id: DECISION_ID,
    adjudicator: ADJUDICATOR,
    decided_at: TODAY,
    domain: "agriculture_feed_infrastructure",
  };
  const ri = prRegistry.records.findIndex((x) => x.record_id === id);
  if (ri >= 0) prRegistry.records[ri] = { ...prRegistry.records[ri], ...rec };
  else prRegistry.records.push(rec);
}
prRegistry.last_updated = TODAY;
fs.writeFileSync(
  r("research/phase_2/public_reasoning_registry.json"),
  JSON.stringify(prRegistry, null, 2) + "\n"
);

const returnMd = `# CC-PHASE-2.1-AR-NON-GMO-FEED-PRIMARY-PRICE-IP-GRAIN-AND-TOLL-MILLING-STUDY-1.0 — Return

**Generated:** ${TODAY}  
**Processing lane:** frozen at **~${PROCESSING_BASELINE.cattle_accessible_claimed_desk} / ${PROCESSING_BASELINE.booking_confirmed} / ${PROCESSING_BASELINE.economically_usable_confirmed}** (not touched).

## 1. Executive Summary

Working diagnosis under test:

> Arkansas has feed production capacity, but independent family farmers seeking verified non-GMO or organic feed may face a gap in open, identity-preserved, segregated, and economically usable supply.

**Desk-pass verdict: diagnosis HOLDS as the working frame; least-cost repair path identified but not yet voice-confirmed.**

| Question | Desk answer |
| --- | --- |
| 1. What verified feed can a farmer buy today, at what price/min? | National Non-GMO Project poultry bags **yes** (~$22–$26 / 50 lb published); organic e-com observation ~$57 / 50 lb. **AR mill quotes: 0** (voice required). |
| 2. Grain origin + verification standard? | National brands: Non-GMO Project / organic programs; not AR local chain. AR IP soy exists (Taggart/Delta Soy) — **livestock-feed channel NOT ESTABLISHED**. RVO handles NOP organic ingredients (customs). |
| 3. Toll mill / custom-blend IP farmer grain? | Custom blend **advertised** at open mills. Identity-preserved **toll of farmer/co-op grain: UNKNOWN** — no AR public offers found; MO comparator exists. |
| 4. Real bottleneck? | Leading desk candidates: **IP grain→feed channel** + **demand aggregation** + **certification class**; milling capacity unlikely primary; transport not proven primary. Toll willingness is the critical test. |

**Cursor is BLOCKED from inventing mill quotes.** Human instruments shipped.

## 2. Price matrix (desk)

See \`ar_nongmo_feed_primary_price_matrix.json\`.

- Kalmbach Non-GMO Project 17% layer: **$21.99** DTC; dealer listing **$25.99** / 50 lb  
- Kalmbach organic layer e-com observation: **~$56.99** / 50 lb  
- LF Feeds / JA Farms / RVO / Powell: **UNKNOWN** pending calls  

Economically usable layer for AR enterprises: still **UNKNOWN**.

## 3. IP grain map

See \`ar_ip_grain_livestock_channel_map.json\`.

- **Taggart (Augusta):** non-GMO soy seed growers; QAI organic soy cleaning (>280k bu since 2015 claimed)  
- **Delta Soy:** AR non-GMO specialty natto soy → international food  
- Implication: **IP capacity ≠ livestock-feed access**

## 4. Toll milling dossier

See \`ar_toll_milling_and_custom_blend_dossier.json\`.

**Gate:** do not advance new-mill hypotheses until LF Feeds, JA Farms, Powell, and RVO are asked about IP toll/specialty runs and refuse or prove inability under stated conditions.

## 5. Bottleneck adjudication (desk)

See \`ar_feed_bottleneck_adjudication.json\`. Leading: segregated IP grain→feed channel + demand aggregation; certification material; milling capacity unlikely primary.

## 6. Human voice instruments

- \`reports/CC_AR_FEED_HUMAN_VOICE_CALL_PROTOCOL_1_0.md\`  
- \`reports/CC_AR_FEED_VOICE_CALL_ONE_PAGE_WORKSHEET_1_0.md\`  
- \`research/phase_2/ar_feed_voice_call_records.json\` (empty priority slots)  
- \`reports/CC_ARKANSAS_FEED_RESEARCH_HANDOFF_HUMAN_VOICE_PASS_1_0.md\`

Unlock first bottleneck upgrade after **LF Feeds + JA Farms + RVO** entered.

## 7. Hypothesis

\`${HYP}\`: remains **QUALIFIED** (refined; voice-gated next).

## 8. Public Reasoning

CC-PR-062–068.

## 9. Sources / RQs

CC-SRC-202–210 · CC-RQ-P21-078–082 · Sources total: ${srcDoc.sources.length}

## 10. Decision fork (after human calls)

| Result | Implication |
| --- | --- |
| Mills will IP-toll / specialty-run with co-op volume | Prefer aggregation + contracts over construction |
| Mills refuse / cannot segregate | Dedicated capacity case strengthens |
| IP grain unavailable to feed channel | Repair is grain-contract/elevator bridge |
| Specialty delivered cost unusable | Publish economic failure — do not romanticize local |

## 11. Baseline / GATE-02

Unchanged **2/86**. GATE-02 not passed.

## 12. Validators

Filled at ship.

## 13. Exact next step

**Human:** complete feed voice calls → enter JSON → Cursor upgrades bottleneck adjudication.  
**Parallel:** processing voice calls remain independent and frozen until entered.
`;

wt(
  `reports/CC_PHASE_2_1_AR_NON_GMO_FEED_PRIMARY_PRICE_IP_GRAIN_AND_TOLL_MILLING_STUDY_1_0_RETURN.md`,
  returnMd
);

// Project state
const sliceRec = {
  slice_id: SLICE,
  title: "AR Non-GMO Feed Primary Price, IP Grain, and Toll Milling Study",
  status: "partial_complete_awaiting_human_calls",
  completed_at: TODAY,
  completion_evidence: [
    "ar_nongmo_feed_primary_price_matrix.json",
    "ar_ip_grain_livestock_channel_map.json",
    "ar_toll_milling_and_custom_blend_dossier.json",
    "ar_feed_bottleneck_adjudication.json",
    "ar_feed_voice_call_records.json",
    "feed voice call protocol + worksheet + handoff",
    "CC-SRC-202–210",
    "CC-PR-062–068",
    "processing baseline frozen ~3/0/0",
  ],
  next_recommended_slice:
    "CC-PHASE-2.1-AR-FEED-VOICE-BOTTLENECK-ADJUDICATION-1.0",
  alternate_next: [
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  ],
  note: "Desk primary done; Cursor blocked on mill quote invention. Toll/IP is least-cost repair test.",
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...sliceRec };
else sliceQueue.slices.push(sliceRec);

sliceQueue.active_slice = SLICE;
sliceQueue.parallel_blocked = {
  slice_id: "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  status: "AWAITING_HUMAN_CALLS",
  baseline: "~3 / 0 / 0",
};
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const upd086 = {
  id: "UPD-086",
  date: TODAY,
  title: "Non-GMO feed primary price / IP grain / toll milling desk pass",
  summary:
    "Under CC-DEC-103: published national verified retail price band; AR IP soy (Taggart/Delta Soy) exists but livestock-feed channel unproven; custom mills identified; toll/IP willingness voice-gated. Least-cost repair = existing mills + IP contracts + demand aggregation pending calls. Processing frozen ~3/0/0. Sources 202–210.",
  public: true,
};
const ui = updates.updates.findIndex((u) => u.id === "UPD-086");
if (ui >= 0) updates.updates[ui] = upd086;
else updates.updates.push(upd086);
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  writing_focus:
    "Feed price/IP/toll desk pass done; awaiting human feed calls. Processing voice still ~3/0/0.",
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL_AWAITING_HUMAN_FEED_CALLS",
  updated_at: TODAY,
  summary:
    "Desk primary: national Non-GMO Project retail ~$22–26/50lb; organic e-com ~$57. AR mill quotes 0. IP soy exists (Taggart/Delta Soy) but livestock-feed channel unproven. Toll/IP at open mills UNKNOWN — least-cost repair candidate pending voice. Processing frozen ~3/0/0. Sources 202–210.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice: "CC-PHASE-2.1-AR-FEED-VOICE-BOTTLENECK-ADJUDICATION-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-086"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "Did not invent AR mill quotes or toll willingness. IP capacity ≠ feed access. New mills gated on toll/IP refusals. Processing booking baseline frozen.",
  next_command:
    "Human: feed calls (LF Feeds, JA Farms, RVO, Powell, Taggart) → enter ar_feed_voice_call_records.json; parallel processing voice calls",
  report:
    "reports/CC_PHASE_2_1_AR_NON_GMO_FEED_PRIMARY_PRICE_IP_GRAIN_AND_TOLL_MILLING_STUDY_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  feed_hypothesis_verdict: "QUALIFIED",
  processing_voice_status: "AWAITING_HUMAN_CALLS",
  processing_baseline: PROCESSING_BASELINE,
  arkansas_mill_verified_quotes: 0,
  desk_nongmo_retail_band_usd_per_50lb: { low: 21.99, high: 25.99 },
});

console.log("\nPrimary price / IP / toll study desk pass complete");
console.log("Processing baseline frozen:", PROCESSING_BASELINE);
console.log("AR mill verified quotes: 0 — voice required");
