/**
 * CC-PHASE-2.1-ARKANSAS-LOCAL-FEED-GRAIN-AND-NON-GMO-SUPPLY-CHAIN-TEST-1.0
 *
 * Falsify (do not accept) the assertion that AR family farmers seeking non-GMO feed
 * must source/manufacture outside Arkansas.
 *
 * Analog to processing: feed capacity ≠ farmer-accessible verified supply.
 * Do not equate "not on website" with "does not exist."
 * Processing voice lane remains BLOCKED — do not invent booking data there.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const TODAY = "2026-08-10";
const SLICE =
  "CC-PHASE-2.1-ARKANSAS-LOCAL-FEED-GRAIN-AND-NON-GMO-SUPPLY-CHAIN-TEST-1.0";
const HYP = "CC-HYP-AR-LOCAL-NON-GMO-FEED-INFRASTRUCTURE-GAP";
const ADJUDICATOR = "ChatGPT";
const DECISION_ID = "CC-DEC-103";

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

const ASSERTION_UNDER_TEST =
  "Arkansas family farmers seeking non-GMO feed face an infrastructure disadvantage because suitable feed/grain must often be sourced or manufactured outside Arkansas.";

const VERIFICATION_CLASSES = [
  "CERTIFIED_ORGANIC",
  "NON_GMO_PROJECT_VERIFIED",
  "IDENTITY_PRESERVED_NON_GMO",
  "TESTED_NON_GMO",
  "SUPPLIER_ATTESTED_NON_GMO",
  "CONVENTIONAL",
  "UNSPECIFIED",
];

// ─── Sources 191–200 ───────────────────────────────────────────
const newSources = [
  {
    source_id: "CC-SRC-191",
    title: "LF Feeds LLC — Arkansas Grown verified listing",
    authors: ["LF Feeds LLC", "Arkansas Grown"],
    year: 2026,
    url: "https://arkansasgrown.org/listing/lf-feeds-llc/",
    source_type: "state_program_listing",
    reliability: "secondary_official_program_listing",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Verified Arkansas Grown listing: custom mixed livestock feeds in Bismarck AR; small batches 4 days/week; claims locally sourced grains; horse/cow/pig/goat/sheep/layer/meat bird/turkey rations. Does NOT explicitly state Non-GMO Project verification or organic certification on fetched page. Evidence of independent-producer-accessible custom milling — not proof of verified non-GMO chain.",
    key_findings: [
      "Open custom feed mill serving independent livestock producers in AR",
      "Local grain sourcing claimed",
      "Non-GMO/organic verification status UNKNOWN from listing alone",
    ],
    limitations: "Listing ≠ lab verification; capacity/price/min order not stated.",
    verification_status: "url_verified_via_fetch",
    notes: "Open-access candidate; do not invent non-GMO status.",
  },
  {
    source_id: "CC-SRC-192",
    title: "River Valley Organics — Hartman, AR organic feed manufacturer (directory listings)",
    authors: ["River Valley Organics"],
    year: 2026,
    url: "https://www.mylocalservices.com/River+Valley+Organics-Hartman-Arkansas-22876260.html",
    source_type: "business_directory",
    reliability: "secondary_directory",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Multiple directories list River Valley Organics at 277 Co Rd 3020, Hartman AR 72840, (479) 497-1616 as organic feed manufacturer. Indicates at least one Arkansas organic feed milling node. Certification details, grain origin, and independent-producer terms require primary verification.",
    key_findings: [
      "Arkansas-sited organic feed manufacturer identified",
      "Contradicts absolute 'no AR specialty feed milling' claim",
      "Scale/access/price UNKNOWN without primary contact",
    ],
    limitations: "Directory/secondary; not NOP certificate fetch in this slice.",
    verification_status: "url_verified_via_search",
    notes: "Strongest AR organic mill candidate found in desk pass.",
  },
  {
    source_id: "CC-SRC-193",
    title: "Kalmbach Feeds — Non-GMO / organic chicken feeds available in Arkansas",
    authors: ["Kalmbach Feeds"],
    year: 2026,
    url: "https://www.kalmbachfeeds.com/pages/all-natural-non-gmo-organic-chicken-feeds-in-arkansas-ak",
    source_type: "commercial_manufacturer",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "US / Arkansas distribution",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "National manufacturer markets Non-GMO Project Verified and USDA Certified Organic chicken feeds as available in Arkansas via website/Amazon/Chewy/dealer map. Demonstrates retail availability of verified non-GMO feed in AR — but does NOT establish grown+milled-in-Arkansas supply chain.",
    key_findings: [
      "Verified non-GMO feed is commercially available to AR buyers via national brand channels",
      "Availability ≠ local milling ≠ Arkansas grain origin",
    ],
    limitations: "Marketing page; mill locations outside AR typical for national brand.",
    verification_status: "url_verified_via_search",
    notes: "Separates 'can buy verified feed in AR' from 'AR local supply chain'.",
  },
  {
    source_id: "CC-SRC-194",
    title: "Arkansas Department of Agriculture — Commercial Feed Program / Facility License",
    authors: ["Arkansas Department of Agriculture"],
    year: 2026,
    url: "https://agriculture.arkansas.gov/crops-industry/quality-control-and-compliance/feed-2/",
    source_type: "state_agency",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_regulation",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "AR Feed Program licenses facilities manufacturing/distributing commercial feed. Retail-only stores of registered manufacturers need not hold license. Feed Exemption License for feed mixed solely for licensee's own livestock (still may need facility license if selling). No public named mill directory on fetched page.",
    key_findings: [
      "Licensing regime exists; own-use mixing pathway distinct from commercial sale",
      "Public named manufacturer roster not published on program page",
    ],
    limitations: "No facility-level inventory from this page alone.",
    verification_status: "url_verified_via_search",
    notes: "Regulatory baseline.",
  },
  {
    source_id: "CC-SRC-195",
    title: "Arkansas Licensed Occupations — Feed Facility License count (2023)",
    authors: ["State of Arkansas"],
    year: 2023,
    url: "https://www.discover.arkansas.gov/_docs/Publications/Licensed-Occupations/DLO.pdf",
    source_type: "state_government_publication",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_regulation",
    publication_date: "2023",
    retrieval_date: TODAY,
    summary:
      "Directory of Licensed Occupations reports 1,133 Feed Facility Licenses issued during 2023 under Arkansas Department of Agriculture Feed and Fertilizer Division. Demonstrates large nominal licensed feed commerce footprint — license count ≠ open non-GMO mills and includes distributors/manufacturers broadly.",
    key_findings: [
      "1,133 feed facility licenses in 2023",
      "Nominal feed infrastructure is extensive",
      "Does not identify non-GMO or independent-access subset",
    ],
    limitations: "License count aggregates many facility types; not a mill census of specialty feed.",
    verification_status: "url_verified_via_fetch",
    notes: "Nominal capacity evidence.",
  },
  {
    source_id: "CC-SRC-196",
    title: "Butterball Yellville AR feed mill — Grainnet/Repete case study",
    authors: ["Repete / Grainnet coverage"],
    year: 2022,
    url: "https://www.repete.com/2022/02/butterball-feed-arkansas/",
    source_type: "industry_case_study",
    reliability: "secondary_industry",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "2022-02",
    retrieval_date: TODAY,
    summary:
      "Documents Butterball ~$50M Yellville turkey feed mill (~12,000 tpw). Notes few local row crops in Ozarks; corn mostly railed from Midwest. Mentions one milling line segregated for organic/specialized ingredients. Captive integrator infrastructure — not independent open market.",
    key_findings: [
      "Large captive AR feed capacity exists",
      "Even integrator mills may rail corn into AR",
      "Segregated specialty line exists inside captive system",
    ],
    limitations: "Industry vendor coverage; not open-market access proof.",
    verification_status: "url_verified_via_search",
    notes: "Captive capacity + grain-origin lesson.",
  },
  {
    source_id: "CC-SRC-197",
    title: "Simmons Foods — vertically integrated poultry with AR feed mills",
    authors: ["Simmons Foods"],
    year: 2026,
    url: "https://simmonsfoods.com/industries",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Simmons Prepared Foods (Siloam Springs AR base) states vertical integration including three feed mills supplying nearly 300 independent poultry growers and 20+ company farms (~200M chickens/year). Feed is for contracted/integrated production — not evidence of open retail non-GMO feed market.",
    key_findings: [
      "Multiple AR integrator feed mills serve contract growers",
      "Independent contract growers ≠ open feed market for specialty livestock",
    ],
    limitations: "Company overview; no non-GMO claims assessed.",
    verification_status: "url_verified_via_search",
    notes: "Captive/contract access class.",
  },
  {
    source_id: "CC-SRC-198",
    title: "Tyson Foods — contract poultry model supplies feed; AR mill examples",
    authors: ["Tyson Foods", "Feed & Grain"],
    year: 2024,
    url: "https://www.tysonfoods.com/who-we-are/our-partners/farmers/contract-poultry-farming",
    source_type: "commercial_operator",
    reliability: "primary_operator_claim",
    primary_or_secondary: "primary",
    jurisdiction: "US / Arkansas",
    research_domain: "agriculture_feed_infrastructure",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "Tyson states it supplies birds and feed to contract poultry farmers. Prospective farmers generally must be within ~30–50 miles of feed mills serving a complex. Separate industry reporting documents large Tyson poultry feed mill investment in Fulton AR replacing Hope/Nashville mills; MapQuest/listings also show Pottsville AR Tyson feed mill. Captive/contract infrastructure.",
    key_findings: [
      "Integrator feed is tied to contract poultry model",
      "Geographic radius constraint around mills",
      "Large AR mill capacity can coexist with poor open specialty access",
    ],
    limitations: "Corporate claims; non-GMO not addressed.",
    verification_status: "url_verified_via_search",
    notes: "Vertical integration consequences for open market.",
  },
  {
    source_id: "CC-SRC-199",
    title: "USDA/NASS via UADA coverage — Arkansas corn & soybean production estimates",
    authors: ["USDA NASS", "University of Arkansas Division of Agriculture (Stiles)"],
    year: 2025,
    url: "https://www.stuttgartdailyleader.com/usda-releases-first-crop-production-report-since-september-arkansas-sees-sizable-shifts-in-corn-rice/",
    source_type: "news_citing_federal_statistics",
    reliability: "secondary_citing_primary",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_grain_supply",
    publication_date: "2025-11",
    retrieval_date: TODAY,
    summary:
      "Extension economist coverage of USDA Crop Production: AR 2025 corn production estimate ~141.4M bushels (up sharply vs 2024); soybean estimate ~138.7M bushels (down vs 2024's 166.1M). Establishes large conventional grain production — NOT identity-preserved non-GMO supply.",
    key_findings: [
      "Arkansas grows large volumes of corn and soybeans",
      "Production ≠ segregated/IP/non-GMO accessible supply",
    ],
    limitations: "News paraphrase of USDA; IP/non-GMO bushels not reported.",
    verification_status: "url_verified_via_search",
    notes: "Grain production side of chain.",
  },
  {
    source_id: "CC-SRC-200",
    title: "Organic Trade Association — Arkansas 2025 organic state sheet",
    authors: ["Organic Trade Association"],
    year: 2025,
    url: "https://ota.com/sites/default/files/docs/Arkansas-2025.pdf",
    source_type: "trade_association",
    reliability: "secondary_citing_usda_oid",
    primary_or_secondary: "secondary",
    jurisdiction: "Arkansas",
    research_domain: "agriculture_organic",
    publication_date: "2025",
    retrieval_date: TODAY,
    summary:
      "OTA Arkansas sheet: 179 organic operations; 21,624 certified organic acres (as of OID 7/1/2025 citation). Ranks 8th nationally for organic animals (~$48M farmgate). Top organic commodities listed as eggs, chickens, tomatoes — not feed grains. Implies limited organic land base relative to conventional grain agriculture.",
    key_findings: [
      "Organic acreage in AR is small vs conventional row-crop scale",
      "Organic animal sector present; feed-grain IP supply not quantified here",
    ],
    limitations: "Advocacy trade association compilation; commodity grain acres not broken out.",
    verification_status: "url_verified_via_fetch",
    notes: "Organic land scarcity constraint candidate.",
  },
  {
    source_id: "CC-SRC-201",
    title: "FDA / extension — FSMA Preventive Controls for Animal Food (small/qualified facilities)",
    authors: ["FDA", "NC State Extension", "National Agricultural Law Center"],
    year: 2020,
    url: "https://content.ces.ncsu.edu/fsma-preventive-control-for-animal-food-pcaf-exemption-decision-tree-tool",
    source_type: "federal_regulatory_guidance",
    reliability: "primary_official_guidance",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "agriculture_feed_regulation",
    publication_date: "retrieved-2026-08-10",
    retrieval_date: TODAY,
    summary:
      "FSMA PCAF framework: animal food facilities generally subject to CGMP and preventive controls; 'very small business' / qualified facility pathways (e.g., <$2.5M animal-food sales average) may use modified requirements with attestation. Establishes regulatory compliance as real fixed cost for new mills — not proof that mills are infeasible.",
    key_findings: [
      "Small mills still face CGMP/feed safety obligations",
      "Qualified facility relief exists but is not zero regulation",
    ],
    limitations: "National framework; AR-specific cost magnitudes not measured.",
    verification_status: "url_verified_via_search",
    notes: "Local mill feasibility dossier regulatory leg.",
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
  ` Phase 2.1 (${TODAY}): CC-SRC-191–201 Arkansas local feed / non-GMO supply chain test.`;
fs.writeFileSync(r("data/research/source_registry.json"), JSON.stringify(srcDoc, null, 2) + "\n");
console.log("[OK] sources; total", srcDoc.sources.length);

// ─── Inventory ─────────────────────────────────────────────────
const facilities = [
  {
    id: "FEED-LF-BISMARCK",
    name: "LF Feeds LLC",
    location: { city: "Bismarck", county: "Hot Spring County", state: "AR" },
    ownership: "local_independent_claimed",
    function: ["feed_milling", "custom_mixing"],
    market: "independent_producers",
    species: ["cattle", "hogs", "sheep", "goats", "poultry", "horse", "turkey"],
    feed_spec_advertised: "UNSPECIFIED_CUSTOM_LOCAL_GRAIN_CLAIMED",
    verification_class: "UNSPECIFIED",
    form: ["unknown_bulk_or_bag"],
    grain_origin: "arkansas_claimed_local",
    segregation: "unknown",
    custom_formulation: "yes",
    minimum_order: "UNKNOWN",
    distribution: ["pickup_claimed"],
    capacity: "UNKNOWN",
    price: "UNKNOWN",
    access_class: "OPEN_TO_OUTSIDE_PRODUCERS",
    four_layer: {
      nominal: "YES",
      accessible: "YES_CLAIMED",
      available_verified_nongmo: "UNKNOWN",
      economically_usable: "UNKNOWN",
    },
    source_ids: ["CC-SRC-191"],
    provenance: "state_program_listing",
  },
  {
    id: "FEED-RVO-HARTMAN",
    name: "River Valley Organics",
    location: { city: "Hartman", county: "Johnson County", state: "AR" },
    ownership: "local_independent_claimed",
    function: ["feed_milling"],
    market: "independent_producers_claimed",
    species: ["livestock_poultry_variety_claimed"],
    feed_spec_advertised: "ORGANIC",
    verification_class: "CERTIFIED_ORGANIC_CLAIMED_VERIFY",
    form: "UNKNOWN",
    grain_origin: "UNKNOWN",
    segregation: "organic_system_implied",
    custom_formulation: "UNKNOWN",
    minimum_order: "UNKNOWN",
    distribution: "UNKNOWN",
    capacity: "UNKNOWN",
    price: "UNKNOWN",
    access_class: "OPEN_CANDIDATE",
    four_layer: {
      nominal: "YES",
      accessible: "YES_CANDIDATE",
      available_verified_nongmo: "ORGANIC_CLAIMED_PRIMARY_VERIFY",
      economically_usable: "UNKNOWN",
    },
    source_ids: ["CC-SRC-192"],
    provenance: "business_directory_secondary",
  },
  {
    id: "FEED-KALMBACH-AR-DISTRIBUTION",
    name: "Kalmbach Feeds (national) — AR distribution channel",
    location: { city: "n/a", county: "n/a", state: "AR_DISTRIBUTION" },
    ownership: "regional_national",
    function: ["feed_manufacturing_outside_ar_likely", "dealer_retail_distribution"],
    market: "independent_producers",
    species: ["poultry_emphasized"],
    feed_spec_advertised: "NON_GMO_PROJECT_VERIFIED_AND_ORGANIC",
    verification_class: "NON_GMO_PROJECT_VERIFIED",
    form: ["bagged_retail"],
    grain_origin: "not_arkansas_local_chain",
    segregation: "brand_program",
    custom_formulation: "no_retail_sku",
    minimum_order: "retail_bag",
    distribution: ["dealer", "e_commerce"],
    capacity: "national_brand",
    price: "UNKNOWN_CURRENT",
    access_class: "OPEN_RETAIL",
    four_layer: {
      nominal: "YES_DISTRIBUTION",
      accessible: "YES",
      available_verified_nongmo: "YES_FOR_SKUS",
      economically_usable: "UNKNOWN",
      local_grown_milled_distributed: "NO_NOT_ESTABLISHED",
    },
    source_ids: ["CC-SRC-193"],
    provenance: "establishment_operator_primary",
  },
  {
    id: "FEED-TYSON-POTTSVILLE",
    name: "Tyson Foods Feed Mill — Pottsville",
    location: { city: "Pottsville", county: "Pope County", state: "AR" },
    ownership: "corporate_integrated",
    function: ["feed_milling"],
    market: "captive_contract_poultry",
    species: ["poultry"],
    feed_spec_advertised: "CONVENTIONAL_INTEGRATOR",
    verification_class: "CONVENTIONAL",
    form: ["bulk"],
    grain_origin: "UNKNOWN",
    segregation: "UNKNOWN",
    custom_formulation: "integrator_specs",
    minimum_order: "n/a_contract",
    distribution: ["contract_delivery"],
    capacity: "UNKNOWN_LARGE",
    price: "n/a_bundled_contract",
    access_class: "CAPTIVE_CONTRACT",
    four_layer: {
      nominal: "YES",
      accessible: "NO_OPEN_MARKET",
      available_verified_nongmo: "NOT_APPLICABLE_OPEN",
      economically_usable: "NOT_APPLICABLE_OPEN",
    },
    source_ids: ["CC-SRC-198"],
    provenance: "listings_plus_integrator_model",
  },
  {
    id: "FEED-TYSON-FULTON",
    name: "Tyson Foods Feed Mill — Fulton (mega-mill)",
    location: { city: "Fulton", county: "Hempstead County", state: "AR" },
    ownership: "corporate_integrated",
    function: ["feed_milling"],
    market: "captive_contract_poultry",
    species: ["poultry"],
    feed_spec_advertised: "CONVENTIONAL_INTEGRATOR",
    verification_class: "CONVENTIONAL",
    form: ["bulk"],
    grain_origin: "UNKNOWN",
    access_class: "CAPTIVE_CONTRACT",
    four_layer: {
      nominal: "YES",
      accessible: "NO_OPEN_MARKET",
      available_verified_nongmo: "NOT_APPLICABLE_OPEN",
      economically_usable: "NOT_APPLICABLE_OPEN",
    },
    source_ids: ["CC-SRC-198"],
    provenance: "industry_press",
  },
  {
    id: "FEED-SIMMONS-SYSTEM",
    name: "Simmons Foods — three feed mills (system)",
    location: { city: "Siloam Springs area / NW AR", county: "various", state: "AR" },
    ownership: "corporate_integrated",
    function: ["feed_milling"],
    market: "captive_contract_poultry",
    species: ["poultry"],
    feed_spec_advertised: "CONVENTIONAL_INTEGRATOR",
    verification_class: "CONVENTIONAL",
    access_class: "CAPTIVE_CONTRACT",
    four_layer: {
      nominal: "YES",
      accessible: "NO_OPEN_MARKET",
      available_verified_nongmo: "NOT_APPLICABLE_OPEN",
      economically_usable: "NOT_APPLICABLE_OPEN",
    },
    source_ids: ["CC-SRC-197"],
    provenance: "establishment_operator_primary",
  },
  {
    id: "FEED-BUTTERBALL-YELLVILLE",
    name: "Butterball Feed Mill — Yellville",
    location: { city: "Yellville", county: "Marion County", state: "AR" },
    ownership: "corporate_integrated",
    function: ["feed_milling"],
    market: "captive_contract_turkey",
    species: ["poultry_turkey"],
    feed_spec_advertised: "CONVENTIONAL_PLUS_SEGREGATED_ORGANIC_LINE",
    verification_class: "CONVENTIONAL_WITH_SPECIALTY_LINE",
    grain_origin: "midwest_rail_claimed_for_corn",
    segregation: "one_line_organic_specialty_claimed",
    access_class: "CAPTIVE_CONTRACT",
    four_layer: {
      nominal: "YES",
      accessible: "NO_OPEN_MARKET",
      available_verified_nongmo: "NOT_APPLICABLE_OPEN",
      economically_usable: "NOT_APPLICABLE_OPEN",
    },
    source_ids: ["CC-SRC-196"],
    provenance: "industry_case_study",
    note: "Shows even captive mills may import grain by rail; specialty segregation can exist without open market",
  },
  {
    id: "FEED-LICENSE-POPULATION",
    name: "Arkansas Feed Facility License population (aggregate)",
    location: { state: "AR" },
    ownership: "mixed",
    function: ["licensed_commercial_feed_commerce"],
    market: "mixed_unknown",
    species: ["mixed"],
    feed_spec_advertised: "UNSPECIFIED",
    verification_class: "UNSPECIFIED",
    access_class: "AGGREGATE_NOT_FACILITY",
    four_layer: {
      nominal: "YES_EXTENSIVE",
      accessible: "UNKNOWN_SUBSET",
      available_verified_nongmo: "UNKNOWN",
      economically_usable: "UNKNOWN",
    },
    source_ids: ["CC-SRC-194", "CC-SRC-195"],
    provenance: "state_license_count",
    note: "1,133 licenses in 2023 — not a specialty mill count",
  },
];

wj("research/phase_2/ar_feed_mill_infrastructure_inventory.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "INVENTORY_V1_PARTIAL_NOT_COMPLETE_CENSUS",
  rule: "Do not equate missing website non-GMO claim with absence of capability. Captive ≠ open access.",
  verification_classes: VERIFICATION_CLASSES,
  facilities,
  counts: {
    listed_facilities_including_aggregate: facilities.length,
    open_access_candidates: facilities.filter((f) =>
      ["OPEN_TO_OUTSIDE_PRODUCERS", "OPEN_CANDIDATE", "OPEN_RETAIL"].includes(f.access_class)
    ).length,
    captive_contract: facilities.filter((f) => f.access_class === "CAPTIVE_CONTRACT").length,
  },
  last_updated: TODAY,
});

wj("research/phase_2/ar_non_gmo_feed_access_matrix.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  four_layers: {
    nominal: "Feed manufacturing / licensed feed commerce exists at large scale in AR",
    accessible: "Independent farmers can buy some feeds; integrator mills generally closed",
    available: "Verified non-GMO/organic specs exist via limited AR nodes + national retail — full local chain unverified",
    economically_usable: "UNKNOWN — prices/margins not measured this slice",
  },
  geographies: [
    {
      id: "AR-GEO-VAN-BUREN-COUNTY",
      nearest_open_candidate: "LF Feeds Bismarck / River Valley Organics Hartman / retail brands",
      verified_local_chain: "UNKNOWN",
      note: "Distance/access friction UNKNOWN without primary calls",
    },
    {
      id: "AR-GEO-ROSE-BUD",
      nearest_open_candidate: "LF Feeds Bismarck (Hot Spring) / central AR dealers",
      verified_local_chain: "UNKNOWN",
    },
    {
      id: "AR-GEO-ARKANSAS-COUNTY",
      nearest_open_candidate: "commodity grain abundant; specialty feed nodes not mapped locally",
      verified_local_chain: "UNKNOWN",
      note: "Commodity production ≠ IP non-GMO supply",
    },
    {
      id: "AR-GEO-MISSISSIPPI-COUNTY",
      nearest_open_candidate: "integrator/commodity infrastructure likely; open specialty UNKNOWN",
      verified_local_chain: "UNKNOWN",
    },
    {
      id: "AR-GEO-SEARCY-COUNTY",
      nearest_open_candidate: "remote; likely higher transport friction to specialty mills",
      verified_local_chain: "UNKNOWN",
    },
  ],
  rows: [
    {
      need: "certified_organic_livestock_feed",
      ar_grown_milled_distributed: "CANDIDATE_RVO_PRIMARY_VERIFY",
      ar_retail_national_brand: "YES_POULTRY_SKUS",
      economically_usable: "UNKNOWN",
    },
    {
      need: "non_gmo_project_verified_feed",
      ar_grown_milled_distributed: "NOT_ESTABLISHED",
      ar_retail_national_brand: "YES_KALMBACH_CHANNEL",
      economically_usable: "UNKNOWN",
    },
    {
      need: "identity_preserved_nongmo_grain_for_custom_mill",
      ar_supply: "UNKNOWN_LIKELY_SCARCE_RELATIVE_TO_CONVENTIONAL",
      note: "Conventional corn/soy large; IP bushels not found in desk sources",
    },
    {
      need: "supplier_attested_or_custom_local_ration",
      ar_supply: "LF_FEEDS_CANDIDATE",
      verification_strength: "WEAKER_THAN_CERTIFIED",
    },
  ],
  last_updated: TODAY,
});

wj("research/phase_2/ar_feed_grain_supply_chain_map.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  chain_stages: [
    "grain_production",
    "segregation",
    "storage",
    "testing_verification",
    "milling",
    "formulation",
    "bagging_bulk",
    "distribution",
    "demand",
    "price",
    "transportation",
  ],
  stage_assessments: [
    {
      stage: "grain_production",
      status: "CONVENTIONAL_ABUNDANT_IP_UNKNOWN",
      evidence: "AR corn ~141.4M bu (2025 est.) / soy ~138.7M bu (2025 est.) per UADA/USDA coverage; organic acres ~21.6k statewide",
      source_ids: ["CC-SRC-199", "CC-SRC-200"],
    },
    {
      stage: "segregation",
      status: "LIKELY_BREAK_FOR_IP_NONGMO",
      evidence: "Commodity channels dominate; IP/non-GMO segregation infrastructure not documented as open statewide",
      source_ids: ["CC-SRC-199", "CC-SRC-200"],
    },
    {
      stage: "storage",
      status: "UNKNOWN_FOR_IP",
      evidence: "Elevator/IP storage census not assembled this slice",
    },
    {
      stage: "testing_verification",
      status: "PARTIAL_VIA_NATIONAL_BRANDS_AND_ORGANIC_NODES",
      evidence: "Non-GMO Project / organic programs exist; AR on-farm/mill testing rates UNKNOWN",
      source_ids: ["CC-SRC-193", "CC-SRC-192"],
    },
    {
      stage: "milling",
      status: "NOMINAL_EXTENSIVE_OPEN_SPECIALTY_THIN",
      evidence: "1,133 feed licenses; integrator mills; LF Feeds; River Valley Organics candidate",
      source_ids: ["CC-SRC-195", "CC-SRC-191", "CC-SRC-192", "CC-SRC-196", "CC-SRC-197", "CC-SRC-198"],
    },
    {
      stage: "formulation",
      status: "CUSTOM_OPEN_EXISTS",
      evidence: "LF Feeds custom rations",
      source_ids: ["CC-SRC-191"],
    },
    {
      stage: "bagging_bulk",
      status: "UNKNOWN_MIXED",
    },
    {
      stage: "distribution",
      status: "OPEN_RETAIL_PLUS_CAPTIVE",
      evidence: "Dealer/e-commerce national brands; integrator closed loops",
      source_ids: ["CC-SRC-193", "CC-SRC-197", "CC-SRC-198"],
    },
    {
      stage: "demand",
      status: "UNKNOWN_MAY_LIMIT_SPECIALTY_RUNS",
      evidence: "Hypothesis C — insufficient demand for segregated runs — not measured",
    },
    {
      stage: "price",
      status: "UNKNOWN",
      evidence: "No delivered-cost series collected this slice",
    },
    {
      stage: "transportation",
      status: "NOT_PROVEN_PRIMARY_PREMIUM",
      evidence: "Butterball case shows rail import of corn even for captive mill; freight framework built separately",
      source_ids: ["CC-SRC-196"],
    },
  ],
  primary_break_hypothesis:
    "For verified non-GMO/organic independent livestock feed, the break is more likely at segregation / IP grain supply / verification / specialty demand than at total absence of milling capacity.",
  last_updated: TODAY,
});

wj("research/phase_2/ar_non_gmo_feed_delivered_cost_framework.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  status: "FRAMEWORK_ONLY_NO_FILLED_TOTALS",
  formula:
    "mill_price + freight + fuel_surcharge + minimum_shipment_penalty + storage + handling + spoilage + working_capital_cost = delivered_feed_cost",
  components: [
    { id: "mill_price", status: "UNKNOWN", note: "Primary quote required" },
    { id: "freight", status: "UNKNOWN", note: "Do not equate gasoline retail price with freight rate" },
    { id: "fuel_surcharge", status: "UNKNOWN" },
    { id: "minimum_shipment", status: "UNKNOWN" },
    { id: "storage", status: "UNKNOWN" },
    { id: "handling", status: "UNKNOWN" },
    { id: "spoilage", status: "UNKNOWN" },
    { id: "working_capital", status: "UNKNOWN" },
    {
      id: "nongmo_premium_segregation_certification",
      status: "UNKNOWN_MAY_DOMINATE",
      note: "May exceed freight — must be measured separately",
    },
  ],
  competing_premium_drivers: [
    "non_gmo_or_organic_ingredient_premium",
    "segregation_and_testing",
    "certification_fees",
    "small_batch_production_runs",
    "order_size_minimums",
    "transportation",
  ],
  hypothesis_D:
    "Transportation is not assumed primary. Desk evidence insufficient to rank drivers — PRIMARY PRICE COLLECTION REQUIRED.",
  last_updated: TODAY,
});

wj("research/phase_2/ar_local_feed_mill_feasibility_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  question:
    "Under what demand, grain-supply, scale and distribution conditions could an independent Arkansas feed mill compete sustainably with regional suppliers?",
  not_the_question: "Would more local feed mills be good?",
  cost_categories: [
    "minimum_efficient_scale",
    "equipment_grind_mix_pellet",
    "grain_cleaning",
    "storage",
    "segregation_contamination_controls",
    "testing",
    "labor",
    "energy",
    "transportation",
    "working_capital",
    "FDA_FSMA_PCAF_CGMP",
    "state_feed_license_tonnage",
    "insurance",
  ],
  regulatory_notes: {
    source_ids: ["CC-SRC-201", "CC-SRC-194"],
    summary:
      "FSMA animal-food CGMP/PC rules apply with qualified-facility pathways for very small businesses; AR feed facility license + tonnage fees apply to commercial distribution.",
  },
  existing_open_nodes_reduce_build_urgency: [
    "LF Feeds custom open milling",
    "River Valley Organics organic candidate",
    "National brand retail non-GMO availability",
  ],
  verdict: "NOT_ENOUGH_EVIDENCE_TO_RECOMMEND_NEW_MILLS",
  note: "A subsidized mill that permanently loses money is not community prosperity. Demand aggregation may beat greenfield construction.",
  last_updated: TODAY,
});

wj("research/phase_2/ar_feed_cooperative_alternative_dossier.json", {
  version: "0.1.0",
  slice_id: SLICE,
  generated_at: TODAY,
  alternative_under_test:
    "Producer cooperative aggregation: contract growing → segregated storage → toll/custom milling → bulk purchasing → distribution",
  compare_to: "Building a new specialty mill",
  equal_standing_rule: "Aggregation through existing AR mills must be evaluated before construction recommendations",
  potential_advantages: [
    "Uses sunk mill capital (e.g., custom mills like LF Feeds)",
    "Aggregates demand to meet minimum runs",
    "May finance IP grain contracts",
  ],
  potential_failure_modes: [
    "Insufficient committed demand",
    "Contamination/segregation failures",
    "Governance/free-rider problems",
    "Still dependent on scarce IP grain",
  ],
  verdict: "NOT_ENOUGH_EVIDENCE_BUT_MUST_REMAIN_ON_TABLE",
  evidence_quality: "conceptual_plus_existence_of_custom_mills",
  last_updated: TODAY,
});

// Hypothesis registry
if (!hypDoc.hypotheses.some((h) => h.hypothesis_id === HYP)) {
  hypDoc.hypotheses.push({
    hypothesis_id: HYP,
    text: ASSERTION_UNDER_TEST,
    epistemic_class: "HYPOTHESIS",
    empirical_status:
      "QUALIFIED — absolute outside-sourcing claim too strong; open verified local chain thin/unverified; captive capacity large",
    dossier_verdict: "QUALIFIED",
    dossier_reason:
      "Desk evidence shows AR feed capacity and some specialty/open nodes, but not a proven statewide grown+milled+distributed verified non-GMO chain for independents. Production≠accessible IP supply.",
    deliberate_falsification: true,
    not_empirical_proof: true,
    governance: {
      decision: "KEEP_AS_HYPOTHESIS",
      adjudicator: ADJUDICATOR,
      decision_id: DECISION_ID,
    },
    slice_id: SLICE,
    last_updated: TODAY,
    related_sources: ["CC-SRC-191", "CC-SRC-192", "CC-SRC-193", "CC-SRC-195", "CC-SRC-196", "CC-SRC-199", "CC-SRC-200"],
  });
} else {
  const h = hypDoc.hypotheses.find((x) => x.hypothesis_id === HYP);
  h.dossier_verdict = "QUALIFIED";
  h.empirical_status =
    "QUALIFIED — absolute outside-sourcing claim too strong; open verified local chain thin/unverified";
  h.last_updated = TODAY;
}
fs.writeFileSync(
  r("research/phase_2/hypothesis_registry_political_power.json"),
  JSON.stringify(hypDoc, null, 2) + "\n"
);

// RQs
const rqArr = rqDoc.research_questions || rqDoc.questions;
const newRqs = [
  {
    id: "CC-RQ-P21-074",
    question:
      "Can River Valley Organics (Hartman) and/or LF Feeds (Bismarck) supply identity-preserved or certified non-GMO/organic livestock feeds to independent Arkansas producers at what delivered prices and minimums?",
    status: "OPEN",
    priority: "critical",
    related_hypothesis: HYP,
  },
  {
    id: "CC-RQ-P21-075",
    question:
      "How many bushels of Arkansas corn/soy are available through segregated IP/non-GMO/organic channels usable by independent livestock producers?",
    status: "OPEN",
    priority: "high",
    related_hypothesis: HYP,
  },
  {
    id: "CC-RQ-P21-076",
    question:
      "For a representative specialty livestock ration, what share of delivered non-GMO feed cost is ingredient premium vs freight vs certification vs small-batch fees?",
    status: "OPEN",
    priority: "high",
  },
  {
    id: "CC-RQ-P21-077",
    question:
      "Would cooperative demand aggregation through existing custom mills be lower-cost than new specialty mill construction in Arkansas?",
    status: "OPEN",
    priority: "medium",
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
    "053",
    "Arkansas grows huge amounts of grain. Why would farmers need to import feed?",
    "Growing grain is not the same as selling segregated, verified feed ingredients to independent livestock producers. Most commercial corn and soy move in commodity channels. Specialty livestock may need identity-preserved or certified feed that is scarce even when total bushels are large.",
  ],
  [
    "054",
    "Doesn't Arkansas already have feed mills?",
    "Yes — many licensed feed facilities and large integrator mills. The open question is whether independent farmers can buy the specific verified non-GMO or organic rations they need from open mills, not whether Arkansas can manufacture feed for contract poultry.",
  ],
  [
    "055",
    "Why does non-GMO feed cost more?",
    "Possible drivers include ingredient premiums, segregation and testing, certification, small production runs, and shipping. We built a delivered-cost framework; we have not yet measured which driver dominates in Arkansas.",
  ],
  [
    "056",
    "Why can't farmers simply grow their own grain?",
    "Some can and do. Others lack land, equipment, storage, or the right crops/climate for a balanced ration. Own-use mixing is partly recognized in Arkansas feed law, but it does not solve every enterprise model.",
  ],
  [
    "057",
    "Why should taxpayers care what feed farmers choose?",
    "Only if a public claim is made that infrastructure failure blocks valued farm ownership or local food pathways. Preference alone is not a subsidy case. This slice tests infrastructure facts first.",
  ],
  [
    "058",
    "Would subsidizing small mills just create inefficient businesses?",
    "It might. Permanent loss-making mills are not prosperity. We treat cooperative aggregation and using existing custom mills as equal alternatives to construction.",
  ],
  [
    "059",
    "Are large agricultural companies causing the problem?",
    "Integrators operate large captive feed systems that are not open specialty markets. That may be efficient for commodity poultry. It does not by itself prove wrongdoing — it does help explain why capacity can exist without open access.",
  ],
  [
    "060",
    "Would cooperatives work better than government programs?",
    "Unknown. Aggregation could unlock toll milling and IP contracts. Governance and demand risk remain. Equal standing with other options — not assumed superior.",
  ],
  [
    "061",
    "Could local feed actually cost more than imported feed?",
    "Yes, that is possible. Small local runs can be more expensive than large regional plants. If evidence shows that, we will publish it rather than assume local is cheaper.",
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

const falsification = {
  A_assertion_substantially_correct:
    "PARTIAL — access frictions for verified non-GMO/organic independents are plausible; absolute 'must source outside AR' is too strong",
  B_production_exists_access_is_problem:
    "SUPPORTED_AS_LEADING_PATTERN — large nominal/captive capacity; open specialty thin",
  C_mills_could_make_nongmo_but_demand_insufficient: "PLAUSIBLE_UNTESTED",
  D_transport_not_primary_cost_problem: "NOT_ENOUGH_EVIDENCE_FRAMEWORK_ONLY",
  E_regional_supply_more_efficient_than_local: "PLAUSIBLE_UNTESTED",
  F_cooperative_beats_new_mill: "NOT_ENOUGH_EVIDENCE_EQUAL_STANDING",
  G_original_claim_wrong:
    "CONTRADICTED_IN_ABSOLUTE_FORM — AR organic mill candidate + custom open mill + retail verified brands exist",
};

const returnMd = `# CC-PHASE-2.1-ARKANSAS-LOCAL-FEED-GRAIN-AND-NON-GMO-SUPPLY-CHAIN-TEST-1.0 — Return

**Generated:** ${TODAY}  
**Processing lane status:** still **BLOCKED** on human voice calls (~3 / 0 / 0). This slice does not touch booking inference.

## 1. Executive Summary

Assertion under test:

> ${ASSERTION_UNDER_TEST}

**Verdict: QUALIFIED — absolute form contradicted; access/verification gap remains open.**

Arkansas has extensive **nominal** feed infrastructure (1,133 feed facility licenses in 2023; large integrator mills). Independent producers can buy some feeds locally (custom mills; organic mill candidate; national Non-GMO Project retail brands distributed in AR). We did **not** establish a commercial-scale chain that is simultaneously **grown + milled + distributed in Arkansas** with strong non-GMO verification for independent livestock. Analog to processing: **capacity ≠ open accessible verified supply.**

## 2. Hard test of the original claim

| Trap avoided | Result |
| --- | --- |
| Website silence ⇒ no production | Rejected (Clinton lesson) |
| Grain bushels ⇒ IP feed supply | Rejected |
| Integrator mills ⇒ farmer access | Rejected |

Absolute “must manufacture/source outside AR” fails. Soft claim “verified non-GMO local chain is thin/frictional” remains plausible.

## 3. Feed infrastructure inventory (partial)

See \`ar_feed_mill_infrastructure_inventory.json\`.

- **Open candidates:** LF Feeds (Bismarck) custom local-grain rations; River Valley Organics (Hartman) organic mill candidate  
- **Open retail verified:** Kalmbach Non-GMO Project / organic poultry SKUs distributed in AR (not AR local chain)  
- **Captive:** Tyson (incl. Pottsville/Fulton), Simmons (3 mills), Butterball Yellville  

## 4. Four-layer results

| Layer | Finding |
| --- | --- |
| Nominal | Extensive |
| Accessible | Partial — open custom/organic candidates + retail brands; integrators closed |
| Available (needed verification class) | Thin/uncertain for full local verified chain |
| Economically usable | **UNKNOWN** |

## 5. Verification taxonomy

Organic ≠ Non-GMO Project ≠ IP tested ≠ supplier-attested ≠ conventional. Market claim requirements may differ; economics differ.

## 6. Grain production vs accessible IP supply

Conventional corn/soy production is large (CC-SRC-199). Certified organic land ~21.6k acres / 179 operations (CC-SRC-200). **IP non-GMO bushels available to independents: UNKNOWN / likely scarce relative to commodity stream.**

## 7. Where the chain breaks (leading hypothesis)

Primary break for verified specialty feed is more likely at **segregation / IP grain / verification / specialty demand** than at “Arkansas has no mills.” Transportation not proven primary premium (framework only; Butterball case shows rail-in grain even for captive mills).

## 8. Delivered-cost framework

Built; **no filled totals**. Do not assume gas prices = freight.

## 9. Local mill feasibility

**NOT ENOUGH EVIDENCE to recommend new mills.** FSMA/AR licensing are real fixed costs; demand conditions undetermined. Loss-making mills ≠ prosperity.

## 10. Cooperative alternative

Equal standing with construction. Custom mills may enable toll/aggregated runs. **NEE.**

## 11. Vertical integration

Supported as description: large AR feed capacity serves contract poultry, not open specialty markets. Not labeled wrongdoing.

## 12. Falsification board (A–G)

| Option | Result |
| --- | --- |
| A substantially correct | PARTIAL |
| B production exists / access problem | **LEADING** |
| C demand insufficient for specialty | PLAUSIBLE_UNTESTED |
| D transport not primary | NEE (framework) |
| E regional more efficient | PLAUSIBLE_UNTESTED |
| F cooperative > new mill | NEE equal standing |
| G claim wrong | **Absolute form contradicted** |

## 13. Hypothesis verdict

\`${HYP}\`: **QUALIFIED**

## 14. Public Reasoning

CC-PR-053–061.

## 15. Sources / RQs

CC-SRC-191–201 · CC-RQ-P21-074–077 · Sources total: ${srcDoc.sources.length}

## 16. Baseline / GATE-02

Unchanged **2/86**. GATE-02 not passed.

## 17. Validators

Run at ship: research / project / phase2 / baseline as applicable.

## 18. Precise answer demanded by decision standard

> Where between an Arkansas grain field and an independent Arkansas livestock farmer does the non-GMO/local-feed supply chain break?

**Leading desk answer:** after commodity harvest — at **segregation / identity preservation / verification**, and at the boundary between **captive integrator milling** and **open specialty supply**, not at total absence of feed manufacturing. Economic magnitude and least-cost repair remain **UNKNOWN** pending primary price and IP-supply work.

## 19. Remaining unknowns

Primary confirmation of RVO/LF Feeds specs & prices; IP bushel census; delivered-cost decomposition; geography travel times; cooperative demand thresholds.

## 20. Exact next recommended slice (feed track)

\`CC-PHASE-2.1-AR-FEED-MILL-PRIMARY-PRICE-AND-IP-GRAIN-SUPPLY-PASS-1.0\`  
(Human/primary calls to LF Feeds + River Valley Organics + selected dealers; IP grain grower/elevator inquiry.)

**Parallel:** processing voice pass remains gated (~3 / 0 / 0).
`;

wt(
  `reports/CC_PHASE_2_1_ARKANSAS_LOCAL_FEED_GRAIN_AND_NON_GMO_SUPPLY_CHAIN_TEST_1_0_RETURN.md`,
  returnMd
);

wt(
  "reports/CC_ARKANSAS_LOCAL_FEED_NON_GMO_WHAT_WE_LEARNED_1_0.md",
  `# What We Learned — Local Feed / Non-GMO 1.0

1. Do not accept “must import non-GMO feed” as absolute — specialty nodes and retail verified brands exist.
2. Do not treat grain bushels or integrator mills as open verified supply.
3. Same four layers as processing: nominal → accessible → available → economically usable.
4. Leading break: segregation/IP/verification + captive vs open — not “no mills.”
5. New mills not recommended from desk evidence; cooperatives/toll milling stay on the table.
6. Processing voice lane still blocked; this slice is independent.
`
);

// Project pointers — keep processing voice as parallel gated work
const feedSliceRec = {
  slice_id: SLICE,
  title: "Arkansas Local Feed Grain and Non-GMO Supply Chain Test",
  status: "completed",
  completed_at: TODAY,
  completion_evidence: [
    "ar_feed_mill_infrastructure_inventory.json",
    "ar_non_gmo_feed_access_matrix.json",
    "ar_feed_grain_supply_chain_map.json",
    "ar_non_gmo_feed_delivered_cost_framework.json",
    "ar_local_feed_mill_feasibility_dossier.json",
    "ar_feed_cooperative_alternative_dossier.json",
    "CC-HYP-AR-LOCAL-NON-GMO-FEED-INFRASTRUCTURE-GAP QUALIFIED",
    "CC-SRC-191–201",
    "CC-PR-053–061",
    "CC-RQ-P21-074–077",
  ],
  next_recommended_slice: "CC-PHASE-2.1-AR-FEED-MILL-PRIMARY-PRICE-AND-IP-GRAIN-SUPPLY-PASS-1.0",
  alternate_next: [
    "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  ],
  note:
    "Falsification study. Absolute outside-sourcing claim contradicted. Captive≠open. Production≠IP supply. No new-mill recommendation. Processing voice remains human-gated in parallel.",
};
const sqi = (sliceQueue.slices || []).findIndex((s) => s.slice_id === SLICE);
if (sqi >= 0) sliceQueue.slices[sqi] = { ...sliceQueue.slices[sqi], ...feedSliceRec };
else sliceQueue.slices.push(feedSliceRec);

sliceQueue.active_slice =
  "CC-PHASE-2.1-AR-FEED-MILL-PRIMARY-PRICE-AND-IP-GRAIN-SUPPLY-PASS-1.0";
sliceQueue.parallel_blocked = {
  slice_id: "CC-PHASE-2.1-AR-PROCESSING-VOICE-BOOKING-CONFIRMATION-AND-MARGIN-PILOT-1.0",
  status: "AWAITING_HUMAN_CALLS",
  baseline: "~3 / 0 / 0",
};
sliceQueue.last_completed_slice = SLICE;
sliceQueue.last_updated = TODAY;
fs.writeFileSync(r("data/project/slice_queue.json"), JSON.stringify(sliceQueue, null, 2) + "\n");

const upd085 = {
  id: "UPD-085",
  date: TODAY,
  title: "Arkansas local feed / non-GMO supply chain falsification test",
  summary:
    "Under CC-DEC-103: tested non-GMO/local-feed assertion. Absolute outside-sourcing claim contradicted; leading pattern is capacity/access split (captive mills + thin open verified specialty). Four-layer framework applied. No new-mill recommendation. Processing voice lane still gated. Sources 191–201.",
  public: true,
};
const ui = updates.updates.findIndex((u) => u.id === "UPD-085");
if (ui >= 0) updates.updates[ui] = upd085;
else updates.updates.push(upd085);
updates.last_updated = TODAY;
fs.writeFileSync(r("data/project/updates.json"), JSON.stringify(updates, null, 2) + "\n");

Object.assign(buildState, {
  last_updated: TODAY,
  mission_id: SLICE,
  last_completed_slice: SLICE,
  writing_focus:
    "Feed/non-GMO assertion QUALIFIED. Processing voice still awaiting human calls.",
});
fs.writeFileSync(r("data/project/current_build_state.json"), JSON.stringify(buildState, null, 2) + "\n");

wj("data/project/latest_cursor_return.json", {
  mission_id: SLICE,
  status: "PARTIAL",
  updated_at: TODAY,
  summary:
    "Non-GMO/local-feed assertion QUALIFIED: absolute outside-sourcing contradicted; leading break is segregation/IP/verification and captive vs open access—not absence of mills. Economically usable layer UNKNOWN. Processing voice still ~3/0/0 gated. Sources 191–201.",
  repository_root: "H:\\Constitutional-Capitalism",
  branch: "main",
  starting_commit: "pending",
  ending_commit: "pending",
  github_push: "pending",
  remote_url: "https://github.com/Grappe501/constitutional-capitalism",
  overall_percent: 43,
  phase_2_status: "PARTIAL",
  recommended_next_slice:
    "CC-PHASE-2.1-AR-FEED-MILL-PRIMARY-PRICE-AND-IP-GRAIN-SUPPLY-PASS-1.0",
  decision_ids: ["CC-DEC-103"],
  update_ids: ["UPD-085"],
  public_paths: [],
  board_paths: ["/research/"],
  integrity_note:
    "Did not equate website silence with absence. Captive≠open. Production≠IP supply. No new-mill recommendation. Processing booking not inferred.",
  next_command: "Primary calls to LF Feeds + River Valley Organics; parallel human processing voice calls",
  report:
    "reports/CC_PHASE_2_1_ARKANSAS_LOCAL_FEED_GRAIN_AND_NON_GMO_SUPPLY_CHAIN_TEST_1_0_RETURN.md",
  sources_registered: srcDoc.sources.length,
  doctrine_expanded: false,
  principle_added: false,
  feed_hypothesis_verdict: "QUALIFIED",
  processing_voice_status: "AWAITING_HUMAN_CALLS",
  falsification,
});

console.log("\nFeed/non-GMO slice complete");
console.log("Hypothesis:", HYP, "QUALIFIED");
console.log("Falsification G (absolute claim wrong):", falsification.G_original_claim_wrong);
