/**
 * Finalize Phase 2 diagnosis briefs, evidence dossiers, CBO tax source, progress formula hooks.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const today = "2026-08-04";

function write(rel, body) {
  const p = r(rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body.endsWith("\n") ? body : body + "\n");
  console.log("[OK]", rel);
}

function brief({
  title,
  status,
  question,
  why,
  findings,
  supporting,
  contrary,
  uncertainties,
  gaps,
  constitutional,
  policy,
  metrics,
  sources,
  claims,
  next,
}) {
  return `# ${title}

**Domain status:** ${status}  
**Last updated:** ${today}  
**Phase:** 2 — Diagnosis Research Foundation

## Central question

${question}

## Why it matters

${why}

## Current findings

${findings}

## Strongest supporting evidence

${supporting.map((x) => `- ${x}`).join("\n")}

## Contrary evidence

${contrary.map((x) => `- ${x}`).join("\n")}

## Uncertainties

${uncertainties.map((x) => `- ${x}`).join("\n")}

## Data gaps

${gaps.map((x) => `- ${x}`).join("\n")}

## Constitutional implications

${constitutional}

## Policy implications (not yet resolved)

${policy}

## Metrics

${metrics}

## Source IDs

${sources.length ? sources.map((s) => `- \`${s}\``).join("\n") : "- None yet for this brief."}

## Claim IDs

${claims.length ? claims.map((c) => `- \`${c}\``).join("\n") : "- See claim ledger for related claims."}

## Next research actions

${next.map((n, i) => `${i + 1}. ${n}`).join("\n")}
`;
}

// --- Add CBO tax source + upgrade claim 013 ---
const sourcesPath = r("data/research/source_registry.json");
const sourcesDoc = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
if (!sourcesDoc.sources.find((s) => s.source_id === "CC-SRC-013")) {
  sourcesDoc.sources.push({
    source_id: "CC-SRC-013",
    title: "The Distribution of Household Income in 2021",
    authors: ["Congressional Budget Office"],
    year: 2024,
    url: "https://www.cbo.gov/publication/60341",
    source_type: "federal_statistical",
    reliability: "primary_official",
    primary_or_secondary: "primary",
    jurisdiction: "US",
    research_domain: "taxation_income",
    publication_date: "2024-09",
    retrieval_date: today,
    summary:
      "CBO distributional analysis of household income, means-tested transfers, and federal taxes for 2021. Highest-quintile average income before transfers/taxes roughly 19× lowest quintile; after transfers and taxes about 7×. Federal taxes and transfers reduce measured inequality but do not eliminate concentration of income and tax payments at the top.",
    key_findings: [
      "Highest-quintile average income before transfers/taxes ≈19× lowest quintile in 2021",
      "After transfers and taxes, highest/lowest ratio ≈7×",
      "Pandemic-era transfers and credits raised lower-income incomes while capital gains raised top incomes",
    ],
    limitations:
      "CBO income/tax concepts differ from IRS AGI or SCF wealth; 2021 includes temporary pandemic policies; incidence assumptions are model-based.",
    ideological_or_institutional_considerations: "Nonpartisan congressional scorekeeping agency.",
    verification_status: "url_verified",
    notes: "Primary federal source for income/tax distribution architecture.",
  });
  sourcesDoc.last_updated = today;
  sourcesDoc.version = "0.2.1";
  fs.writeFileSync(sourcesPath, JSON.stringify(sourcesDoc, null, 2) + "\n");
  console.log("[OK] added CC-SRC-013");
}

const claimsPath = r("data/research/claim_ledger.json");
const claimsDoc = JSON.parse(fs.readFileSync(claimsPath, "utf8"));
const c13 = claimsDoc.claims.find((c) => c.claim_id === "CC-CLAIM-013");
if (c13) {
  c13.support_level = "partially_supported";
  c13.evidence_strength = "moderate";
  c13.source_ids = ["CC-SRC-013"];
  c13.fact_check_status = "in_progress";
  c13.publication_readiness = "draft_ok_with_caveats";
  c13.public_wording =
    "CBO’s 2021 household income/tax distribution shows federal taxes and transfers are major redistributive instruments; labor and capital income composition differs sharply by quintile. Exact payroll vs income-tax incidence modules remain Phase 2.1 work.";
  c13.opposing_evidence = [
    ...(c13.opposing_evidence || []),
    "Average tax rates and shares depend on CBO’s income definition and how refundable credits are classified.",
  ];
}
claimsDoc.last_updated = today;
fs.writeFileSync(claimsPath, JSON.stringify(claimsDoc, null, 2) + "\n");

// --- Priority briefs ---
const briefs = {
  "00-overview.md": brief({
    title: "Overview",
    status: "priority_first_pass",
    question:
      "What is the present condition of American economic and civic life, what forces produced it, who benefits, who bears its costs, and what evidence would justify restructuring the system?",
    why: "Phase 1 stated belief. Phase 2 assembles proof architecture and a first-pass evidence base before constitution/policy drafting.",
    findings: `Priority domains now have sourced first-pass briefs: wealth/ownership, wages/productivity, taxation (CBO distribution), corporate power/concentration, worker ownership, local/rural economies, internet commerce (architecture + research queue), and political/economic power (linked to concentration evidence; causal democracy links still open).

Verified federal/primary sources registered in \`source_registry.json\` (Fed SCF/DFA, BLS, Census, USDA ERS, FDIC, CBO) with secondary scholarly/advocacy sources labeled. Two baseline wealth metrics carry sourced values; most baseline indicators remain pending by design.

This overview does **not** claim a finished national diagnosis. Remaining domains are foundational shells queued for Phase 2.1.`,
    supporting: [
      "Wealth concentration documented in Fed SCF 2022 and DFA/FRED Q1 2026 shares (`CC-SRC-001`, `CC-SRC-002`, `CC-SRC-012`).",
      "Productivity–compensation divergence documented by BLS analysis and EPI secondary series (`CC-SRC-003`, `CC-SRC-004`).",
      "Industry concentration ratios available from Census Economic Census (`CC-SRC-005`).",
      "Rural structural stress indicators from USDA ERS and FDIC (`CC-SRC-008`–`010`).",
      "Employee-ownership research syntheses show modest average positive associations with heterogeneity (`CC-SRC-006`, `CC-SRC-007`).",
      "CBO 2021 income/tax distribution shows large pre-tax gaps narrowed (not erased) by transfers and taxes (`CC-SRC-013`).",
    ],
    contrary: [
      "2019–2022 SCF showed median wealth rising faster than mean — some narrowing alongside persistent inequality.",
      "Some nonmetro counties gained population after 2020 even as a majority declined.",
      "Concentration and EO performance effects are industry- and design-specific; averages conceal null/negative cases.",
      "Normative and predictive claims (destination-based tax, system-level forecasts) are labeled and unsupported as facts.",
    ],
    uncertainties: [
      "Causal attribution across technology, globalization, institutions, and market power remains contested.",
      "Measurement definitions (compensation vs typical pay; SCF levels vs DFA shares) change magnitudes.",
      "Political-accountability and internet-commerce leakage modules lack Phase 2 quantitative closure.",
    ],
    gaps: [
      "Housing, education, healthcare detail, transport/broadband, food, banking depth, trade, tech/AI, constitutional/legal, international, flourishing — foundational only.",
      "84 of 86 baseline metrics still pending sourced values.",
      "Legal review and economic modeling remain 0%.",
    ],
    constitutional:
      "Empirical concentration of ownership and market power raises questions about whether economic power remains accountable to a free, prosperous people — without treating any single statistic as a constitutional conclusion.",
    policy:
      "Phase 2 does not enact national legislation. Findings feed later design under the Constitutional Capitalism Test.",
    metrics:
      "- Sourced: `CC-IND-W01` (SCF median net worth), `CC-IND-W02` (DFA wealth shares).\n- Status file: `data/baseline/baseline_status.json`.",
    sources: [
      "CC-SRC-001",
      "CC-SRC-002",
      "CC-SRC-003",
      "CC-SRC-004",
      "CC-SRC-005",
      "CC-SRC-006",
      "CC-SRC-007",
      "CC-SRC-008",
      "CC-SRC-009",
      "CC-SRC-010",
      "CC-SRC-011",
      "CC-SRC-012",
      "CC-SRC-013",
    ],
    claims: [
      "CC-CLAIM-002",
      "CC-CLAIM-004",
      "CC-CLAIM-005",
      "CC-CLAIM-006",
      "CC-CLAIM-011",
      "CC-CLAIM-012",
      "CC-CLAIM-013",
      "CC-CLAIM-019",
    ],
    next: [
      "Phase 2.1 full sourcing for remaining domains.",
      "Expand sourced baseline beyond wealth indicators.",
      "Deepen political-power and internet-commerce modules without concealing contrary evidence.",
    ],
  }),

  "01-wealth-and-ownership.md": brief({
    title: "Wealth and Ownership",
    status: "priority_first_pass",
    question: "How is wealth and productive ownership distributed in the United States?",
    why: "Ownership of capital shapes who captures returns, who can weather shocks, and who can participate in economic self-government beyond wages alone.",
    findings: `Federal data show U.S. household wealth remains highly concentrated.

- **SCF 2022 (Fed bulletin, Oct 2023):** real median net worth **$192,900**; real mean **$1,063,700** — mean far above median (\`CC-SRC-001\`).
- **DFA / FRED shares (Q1 2026):** top 1% ≈ **28.8%**; 90–99th ≈ **34.7%**; 50–90th ≈ **31.1%**; bottom 50% ≈ **5.3%** of household wealth (\`CC-SRC-002\`, \`CC-SRC-012\`).
- An NBER working paper on the 2022 SCF reports a top-1% wealth share near **35%** under its processing choices — complementary to, not identical with, DFA quarterly shares (\`CC-SRC-011\`).

Between 2019 and 2022, SCF median rose faster than mean (largest three-year median increase in modern SCF history), implying some narrowing while levels of inequality remained large.`,
    supporting: [
      "`CC-SRC-001` SCF levels and mean–median gap.",
      "`CC-SRC-002` / `CC-SRC-012` DFA concentration shares.",
      "`CC-CLAIM-011`, `CC-CLAIM-012` classified supported with caveats.",
    ],
    contrary: [
      "2019–2022 SCF narrowing episode shows concentration is not a one-way ratchet every survey cycle.",
      "Middle 40% (50–90th) still holds a substantial minority share (~31% in Q1 2026 DFA).",
      "Housing equity gains can lift middle-class net worth without equalizing business/financial ownership.",
    ],
    uncertainties: [
      "SCF levels vs DFA model-based quarterly shares are not interchangeable.",
      "Top-coding and valuation of private business/pension claims affect extremes.",
      "Productive ownership (control rights) is not identical to net-worth percentiles.",
    ],
    gaps: [
      "Business equity and ESOP wealth shares by percentile need dedicated modules.",
      "State/local ownership patterns not yet mapped.",
    ],
    constitutional:
      "High concentration of ownership is a factual predicate for later questions about economic power and republican accountability — not itself a completed constitutional verdict.",
    policy: "No ownership redesign locked in Phase 2. Predictions such as `CC-CLAIM-010` remain unsupported forecasts.",
    metrics: "- `CC-IND-W01` sourced from SCF 2022.\n- `CC-IND-W02` sourced from DFA Q1 2026 shares.",
    sources: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-011", "CC-SRC-012"],
    claims: ["CC-CLAIM-011", "CC-CLAIM-012", "CC-CLAIM-010"],
    next: [
      "Add SCF percentile tables for financial vs housing assets.",
      "Map employee-ownership wealth into baseline when official series allow.",
    ],
  }),

  "02-work-wages-and-productivity.md": brief({
    title: "Work, Wages, and Productivity",
    status: "priority_first_pass",
    question: "Have wages and productivity moved together for typical U.S. workers, and what do measurement choices change?",
    why: "If typical compensation lags productivity for long periods, claims about shared gains from growth require scrutiny.",
    findings: `BLS staff analysis documents a **productivity–compensation gap** since the 1970s: productivity and compensation rose together for decades after the 1940s, then diverged at aggregate and many industry levels (\`CC-SRC-003\`).

EPI’s secondary series (built from BLS/BEA inputs) reports large cumulative divergence since 1979 — e.g., net productivity +61.8% vs typical-worker hourly pay +17.5% through 2020 under EPI’s definitions (\`CC-SRC-004\`). EPI is labeled advocacy-affiliated secondary and must not stand alone.

Gap **size** depends on average compensation vs median/typical-worker pay, benefits inclusion, and price deflators. Causal attribution (technology, globalization, institutions, market power) remains debated.`,
    supporting: [
      "`CC-SRC-003` BLS Beyond the Numbers analysis of divergence.",
      "`CC-SRC-004` EPI productivity–pay gap synthesis (secondary).",
      "`CC-CLAIM-002` partially_supported.",
    ],
    contrary: [
      "Some analyses emphasize nonwage benefits growth and composition effects.",
      "Industry heterogeneity: not every sector shows the same gap.",
      "Recent tight labor markets can compress gaps temporarily without erasing the long-run pattern.",
    ],
    uncertainties: [
      "Which worker series best represents “typical” outcomes.",
      "How much of the gap is measurement vs real distributional change.",
      "Labor monopsony (`CC-CLAIM-015`) not yet sourced in this slice.",
    ],
    gaps: ["Updated BLS industry tables post-2015.", "Wage vs total compensation by education/occupation."],
    constitutional:
      "Persistent divergence between productivity and typical pay is relevant to whether broad prosperity is shared — still distinct from prescribing a wage rule.",
    policy: "No wage-policy package in Phase 2.",
    metrics: "- Wage/productivity baseline indicators remain pending pending refreshed official series attachment.",
    sources: ["CC-SRC-003", "CC-SRC-004"],
    claims: ["CC-CLAIM-002", "CC-CLAIM-015"],
    next: [
      "Attach current BLS productivity and compensation indexes to baseline metrics.",
      "Separate descriptive gap documentation from causal monopsony research.",
    ],
  }),

  "03-taxation.md": brief({
    title: "Taxation",
    status: "priority_first_pass",
    question: "How do federal taxes and transfers currently distribute income, and what remains unknown about incidence?",
    why: "Tax design is a core lever in any economic constitution; diagnosis must separate distributional facts from normative redesign.",
    findings: `CBO’s *Distribution of Household Income in 2021* (\`CC-SRC-013\`) shows large pre-tax income gaps: average income before transfers and taxes in the highest quintile was roughly **19×** the lowest quintile; after means-tested transfers and federal taxes, about **7×**. Transfers and taxes therefore compress inequality substantially without eliminating it. 2021 includes pandemic-era credits and elevated capital gains — year effects matter.

\`CC-CLAIM-013\` (payroll/income taxes as major labor-income burden components) is **partially_supported** at the institutional/distributional level via CBO; detailed payroll-vs-income incidence modules remain Phase 2.1.

\`CC-CLAIM-008\` (destination-based taxation) and \`CC-CLAIM-014\` (corporate-tax incidence on workers/consumers) remain **requires_additional_research** / normative — not treated as facts.`,
    supporting: [
      "`CC-SRC-013` CBO 2021 household income, transfers, and federal taxes.",
      "CBO long-run trend products document rising inequality since 1979 with transfers/taxes mitigating but not reversing the pattern.",
    ],
    contrary: [
      "Effective tax rates and shares depend on income definition and credit classification.",
      "Temporary 2020–2021 policies are not steady-state tax architecture.",
      "Corporate-tax incidence literature is contested; do not assert settled worker burden.",
    ],
    uncertainties: [
      "Economic incidence vs statutory liability.",
      "State/local tax interaction not covered here.",
      "Destination-based tax administration and trade-law issues unresolved.",
    ],
    gaps: ["Treasury/IRS SOI detailed tables.", "State property-tax modules (`CC-CLAIM-017`)."],
    constitutional: "Tax power is constitutional in the U.S. system; redesign proposals must later pass legal and CC Test screens.",
    policy: "No tax code rewrite in Phase 2. Destination-based ideas stay developing doctrine / research queues.",
    metrics: "- Tax baseline indicators pending quantified attachment beyond CBO narrative findings.",
    sources: ["CC-SRC-013"],
    claims: ["CC-CLAIM-008", "CC-CLAIM-013", "CC-CLAIM-014", "CC-CLAIM-017"],
    next: [
      "Add CBO average federal tax rates by income group to baseline JSON with exact table citations.",
      "Source corporate-tax incidence literature review without picking a single contested estimate as truth.",
    ],
  }),

  "04-corporate-power-and-financialization.md": brief({
    title: "Corporate Power and Financialization",
    status: "priority_first_pass",
    question: "How concentrated is corporate economic power, and what is known vs unknown about financialization?",
    why: "Corporate scale and financial claims can reshape labor markets, local economies, and political influence.",
    findings: `The Census Bureau’s Economic Census concentration tables (\`CC-SRC-005\`, EC2200SIZECONCEN) provide official industry-level concentration ratios (e.g., CR4/CR8 and related largest-firm shares). These establish a **descriptive** evidence base that many industries have substantial large-firm shares.

\`CC-CLAIM-005\` (concentration can weaken competition) is **partially_supported**: data show concentration; competitive effects on prices/wages/entry are industry-specific and debated.

Financialization (rising role of financial motives, markets, and actors) remains a **research queue** in this slice — architecture present, no invented macro financialization index asserted.`,
    supporting: [
      "`CC-SRC-005` Economic Census concentration ratios.",
      "Industry tables enable tracking of largest-firm revenue/sales shares.",
    ],
    contrary: [
      "Rising concentration can reflect efficiency and scale economies.",
      "National concentration can misstate local or digital rivalry.",
      "Not all concentrated industries show elevated markups or wage suppression.",
    ],
    uncertainties: [
      "Markup and labor-share linkages need separate empirical modules.",
      "Financialization metrics (share of finance in GDP, buybacks, etc.) not yet registered as sourced baseline.",
    ],
    gaps: ["BEA finance share series.", "Firm-level markups literature synthesis."],
    constitutional:
      "Economic power concentration is a factual input to later accountability design — not proof of capture by itself (`CC-CLAIM-003` still open).",
    policy: "Antitrust posture not locked; legal review required before publication of causal political claims.",
    metrics: "- Competition indicators pending industry-selected CR4 attachments.",
    sources: ["CC-SRC-005"],
    claims: ["CC-CLAIM-003", "CC-CLAIM-005", "CC-CLAIM-015"],
    next: [
      "Select priority NAICS industries and attach CR4/CR8 values with year/definition.",
      "Queue financialization indicator sources (BEA, Fed) for Phase 2.1.",
    ],
  }),

  "05-competition-and-concentration.md": brief({
    title: "Competition and Concentration",
    status: "priority_first_pass",
    question: "What do official concentration statistics show, and what do they not prove?",
    why: "Competition policy depends on measurement that is honest about limits.",
    findings: `Census Economic Census concentration products (\`CC-SRC-005\`) are the primary official spine. They report largest-firm shares within industries; they do **not** by themselves prove monopoly power, consumer harm, or political capture.

This brief shares evidence with corporate-power domain; competition is treated as the measurement layer, power as the broader interpretation layer.`,
    supporting: ["Official CR-style ratios for 2022 Economic Census industries."],
    contrary: [
      "Entry, imports, and multi-sided platforms can discipline concentrated sellers.",
      "Product-market definition disputes can overturn apparent concentration.",
    ],
    uncertainties: ["Local vs national markets.", "Platform ecosystems spanning NAICS codes."],
    gaps: ["DOJ/FTC merger retrospective attachments.", "Labor-market concentration datasets."],
    constitutional: "Competition policy implicates both commerce powers and liberty interests; keep empirical and legal tracks separate.",
    policy: "No merger guidelines rewritten here.",
    metrics: "- Pending selected industry CR attachments.",
    sources: ["CC-SRC-005"],
    claims: ["CC-CLAIM-005", "CC-CLAIM-003"],
    next: ["Publish a short industry sample table with sourced CR4 values."],
  }),

  "06-local-and-rural-economies.md": brief({
    title: "Local and Rural Economies",
    status: "priority_first_pass",
    question: "What structural pressures face nonmetro communities in population, services, and local capital?",
    why: "Constitutional Capitalism claims about broad flourishing fail if rural and local economies are treated as residual.",
    findings: `USDA ERS *Rural America at a Glance, 2025*: about **46.2 million** nonmetro residents (**13.6%** of U.S.) in July 2024; **51%** of nonmetro counties lost population July 2020–June 2024 despite some aggregate nonmetro migration gains (\`CC-SRC-008\`).

ERS chart note: **146** rural-county hospitals closed or converted from acute inpatient care **2005–2023** (**81** complete shutdowns) (\`CC-SRC-009\`).

FDIC (2014): more than half of rural counties lost population **1980–2010**; community-bank charters in depopulating rural areas fell sharply with consolidation (\`CC-SRC-010\`).

\`CC-CLAIM-006\` and \`CC-CLAIM-019\` are **partially_supported** for selected structural indicators, with explicit heterogeneity caveats.`,
    supporting: [
      "`CC-SRC-008` nonmetro population and county decline shares.",
      "`CC-SRC-009` rural hospital closures/conversions.",
      "`CC-SRC-010` rural depopulation and community banks.",
    ],
    contrary: [
      "Some nonmetro areas gained population via post-2020 migration.",
      "Recreation-adjacent and amenity counties diverge from persistent-poverty counties.",
      "Older FDIC article needs updated banking-structure refresh.",
    ],
    uncertainties: [
      "Plant relocation causal estimates not yet in this slice.",
      "Broadband and transport access treated in separate foundational briefs.",
    ],
    gaps: ["Updated FDIC rural banking series.", "County-type typology tables in baseline."],
    constitutional: "Geographic dispersion of opportunity affects equal citizenship in practice.",
    policy: "No rural subsidy package locked.",
    metrics: "- Rural population/hospital indicators pending JSON attachment with exact ERS series IDs.",
    sources: ["CC-SRC-008", "CC-SRC-009", "CC-SRC-010"],
    claims: ["CC-CLAIM-006", "CC-CLAIM-019"],
    next: [
      "Source baseline metrics for nonmetro population share and hospital closures.",
      "Add contrary case studies of rural growth counties.",
    ],
  }),

  "07-internet-commerce.md": brief({
    title: "Internet Commerce",
    status: "priority_first_pass",
    question: "How does online commerce reshape local spending, platform power, and wealth leakage — and what is still unquantified?",
    why: "Platform-mediated commerce can expand consumer choice while relocating margins and data rents away from localities.",
    findings: `Phase 2 establishes the **research architecture** for internet commerce. \`CC-CLAIM-016\` remains **requires_additional_research**: plausible mechanisms (platform concentration, local retail displacement, tax-base shifts) are identified, but this slice does **not** invent national leakage percentages.

Related concentration measurement can draw on Census Economic Census industry tables (\`CC-SRC-005\`) for e-commerce-relevant NAICS once selected. Post-*Wayfair* sales-tax collection changes mean older “untaxed remote sales” narratives are outdated and must not be recycled without new sources.`,
    supporting: [
      "Census concentration infrastructure exists for industry selection (`CC-SRC-005`).",
      "Claim ledger preserves opposing points: consumer choice and local seller enablement.",
    ],
    contrary: [
      "E-commerce expands variety and can support some local/online hybrid sellers.",
      "Sales-tax collection rules have changed; do not cite pre-Wayfair leakage as current fact.",
    ],
    uncertainties: [
      "National estimates of local wealth leakage require dedicated studies.",
      "Platform market-share definitions are contested.",
    ],
    gaps: [
      "Census Annual Retail Trade e-commerce shares.",
      "Local multiplier / leakage studies with transparent methods.",
    ],
    constitutional: "Platform power raises accountability questions adjacent to corporate concentration.",
    policy: "No platform regulatory package in Phase 2.",
    metrics: "- Internet commerce baseline indicators pending.",
    sources: ["CC-SRC-005"],
    claims: ["CC-CLAIM-016"],
    next: [
      "Register Census e-commerce share sources.",
      "Select 2–3 platform-relevant industries for CR attachment.",
    ],
  }),

  "16-political-and-economic-power.md": brief({
    title: "Political and Economic Power",
    status: "priority_first_pass",
    question: "How might economic concentration relate to democratic accountability — and what is established vs contested?",
    why: "The project’s civilizational frame asks where power should reside; diagnosis must not leap from market shares to capture.",
    findings: `Economic concentration is measurable (\`CC-SRC-005\`; wealth concentration \`CC-SRC-001\`/\`002\`/\`012\`). The causal claim that concentration **weakens democratic accountability** (\`CC-CLAIM-003\`) remains **requires_additional_research**: campaign finance, lobbying, media ownership, and revolving-door modules are not completed in this slice.

Honest Phase 2 posture: treat concentration as a **risk factor and research priority**, preserve contrary institutional checks (elections, courts, media pluralism where present), and refuse partisan diagnosis.`,
    supporting: [
      "Measurable wealth and industry concentration create a factual backdrop for power analysis.",
      "Open research questions and developing doctrine track accountability concerns without declaring proof.",
    ],
    contrary: [
      "Concentration measures ≠ automatic political capture.",
      "Countervailing institutions vary across jurisdictions and eras.",
      "Some concentrated sectors face intense electoral and regulatory scrutiny.",
    ],
    uncertainties: [
      "Identification strategies for lobbying → policy causal chains.",
      "Digital media concentration vs traditional measures.",
    ],
    gaps: [
      "FEC/IRS nonprofit political spending modules.",
      "State-level capture case studies with primary sources.",
    ],
    constitutional:
      "Republican government presupposes that private economic power remains accountable to the people through law — diagnosis feeds later design, not a verdict by slogan.",
    policy: "No campaign-finance bill drafted here. Legal review required before strong public causal claims.",
    metrics: "- Political-economy indicators pending.",
    sources: ["CC-SRC-005", "CC-SRC-001", "CC-SRC-002", "CC-SRC-012"],
    claims: ["CC-CLAIM-003", "CC-CLAIM-005", "CC-CLAIM-011"],
    next: [
      "Build a sourced lobbying/campaign-finance bibliography.",
      "Keep claim support levels honest until identification standards are met.",
    ],
  }),
};

// Worker ownership — map to domain 05 in plan is "Worker ownership"; file may be under competition.
// Plan domains: 5 Worker ownership — use a dedicated update on an existing research note if present.
// We already have 05-competition; worker ownership content goes into evidence + a note in overview.
// Add worker ownership as part of competition file? Better: write into content via expanding
// a research domain file. Checking plan: national-diagnosis 00-20 — worker ownership may be
// folded into wealth or a research subdomain. Looking at file list, there's no separate
// worker-ownership diagnosis file. Plan says 21 briefs 00-20. Worker ownership maps to
// claim 004 and can be covered via a subsection in wealth OR we enhance by writing
 // into 01 and a dedicated evidence dossier. Also write foundational note into
 // content/research if there's a worker-ownership folder.

write(
  "content/research/national-diagnosis/05b-worker-ownership.md",
  brief({
    title: "Worker Ownership",
    status: "priority_first_pass",
    question: "What does research show about employee ownership and firm/worker outcomes?",
    why: "Broadened ownership is central to Constitutional Capitalism’s developing doctrine; evidence must stay modest and conditional.",
    findings: `Kruse (IZA World of Labor, 2016) synthesizes 100+ studies: employee ownership is generally associated with better average productivity, pay, job stability, and survival, with **small** average performance effects and difficult causal identification (\`CC-SRC-006\`).

NCEO research digests report similar average associations and some crisis-resilience findings, with advocacy-affiliation caveats (\`CC-SRC-007\`).

\`CC-CLAIM-004\` is **partially_supported**: “can improve under some conditions,” not “always improves.” Free-rider problems, selection into ESOPs, complementary HR practices, and retirement-risk concentration are first-class contrary points.`,
    supporting: [
      "Meta-analytic small positive average performance association (cited in Kruse synthesis).",
      "Multiple studies associate ESOPs with retention/stability in some samples.",
    ],
    contrary: [
      "Many null results; average effect sizes are small.",
      "Selection bias and complementary workplace practices confound causality.",
      "Undiversified employer stock can raise worker financial risk.",
    ],
    uncertainties: [
      "Which governance designs (participation, information, diversification) mediate outcomes.",
      "Cooperative vs ESOP vs broad-based equity differences.",
    ],
    gaps: ["Updated meta-analyses post-2016.", "Official aggregate ESOP wealth in SCF-compatible form."],
    constitutional: "Ownership participation relates to economic citizenship — still distinct from mandating a single firm form.",
    policy: "No national EO mandate in Phase 2.",
    metrics: "- EO prevalence/performance metrics pending.",
    sources: ["CC-SRC-006", "CC-SRC-007"],
    claims: ["CC-CLAIM-004"],
    next: [
      "Keep Evidence Companion dossier synchronized with claim ledger.",
      "Add BLS/GAO EO prevalence sources when verified.",
    ],
  })
);

for (const [file, body] of Object.entries(briefs)) {
  write(`content/research/national-diagnosis/${file}`, body);
}

// Foundational remainder — light upgrade marking Phase 2.1
const foundational = [
  ["08-housing-and-ownership-security.md", "Housing and Ownership Security", "How secure is housing-related ownership, and how do taxes/costs affect it?"],
  ["09-education-and-human-development.md", "Education and Human Development", "Who pays for skill formation, and who captures returns?"],
  ["10-healthcare-and-economic-security.md", "Healthcare and Economic Security", "How does healthcare access shape economic security?"],
  ["11-transportation-and-broadband.md", "Transportation and Broadband", "How do connectivity and mobility constrain local opportunity?"],
  ["12-food-and-community-resilience.md", "Food and Community Resilience", "How resilient are community food systems?"],
  ["13-banking-and-capital.md", "Banking and Capital", "How does capital access vary geographically and by firm size?"],
  ["14-trade-and-corporate-relocation.md", "Trade and Corporate Relocation", "How do trade and relocation reshape regional capacity?"],
  ["15-technology-automation-and-ai.md", "Technology, Automation, and AI", "How might AI/automation redistribute returns between capital and labor?"],
  ["17-constitutional-and-legal-foundations.md", "Constitutional and Legal Foundations", "What legal constraints bind economic redesign?"],
  ["18-international-comparisons.md", "International Comparisons", "What can cross-country evidence teach without false transplants?"],
  ["19-human-flourishing.md", "Human Flourishing", "How should flourishing be measured beyond income?"],
  ["20-conclusions-and-open-questions.md", "Conclusions and Open Questions", "What is established, contested, and queued after Phase 2 first pass?"],
];

for (const [file, title, question] of foundational) {
  write(
    `content/research/national-diagnosis/${file}`,
    brief({
      title,
      status: "foundational_phase_2_1",
      question,
      why: "Architecture reserved so Phase 2 does not silently omit the domain. Full sourced treatment deferred to Phase 2.1 to protect quality.",
      findings:
        "_Foundational brief only._ No invented statistics. Research questions and claim ledger entries may point here; upgrade only with registered sources.",
      supporting: ["None asserted pending source registration."],
      contrary: ["Contrary evidence will be recorded when sources are added — not suppressed."],
      uncertainties: ["Domain awaits Phase 2.1 primary-source pass."],
      gaps: ["Full source registration.", "Baseline metric attachment.", "Claim support upgrades."],
      constitutional: "Normative implications await evidence modules.",
      policy: "No policy locked from an empty evidence base.",
      metrics: "- See pending indicators in `data/baseline/national_baseline_metrics.json`.",
      sources: [],
      claims: [],
      next: [
        "Register primary/authoritative sources.",
        "Write first-pass findings with supporting and contrary evidence.",
        "Attach sourced baseline values only.",
      ],
    })
  );
}

// Patch 20 with real open questions from Phase 2
write(
  "content/research/national-diagnosis/20-conclusions-and-open-questions.md",
  brief({
    title: "Conclusions and Open Questions",
    status: "priority_first_pass",
    question: "What can Phase 2 honestly conclude, and what must remain open?",
    why: "A diagnosis foundation that overclaims would corrupt later constitution/policy work.",
    findings: `**Established at first-pass strength (with caveats):** wealth concentration (SCF/DFA); productivity–compensation divergence phenomenon (BLS + labeled secondary); industry concentration measurement infrastructure (Census); selected rural structural stress indicators (ERS/FDIC); modest average EO performance associations (scholarly/secondary); CBO income/tax distribution compression via transfers/taxes (2021).

**Contested / incomplete:** democratic accountability causation; internet-commerce leakage magnitudes; corporate-tax incidence; destination-based tax as fact; monopsony wage effects; AI distributional forecasts.

**Unsupported as evidence:** system-level 10–20 year predictions (\`CC-CLAIM-009\`, \`CC-CLAIM-010\`).

**Phase 2 status recommendation:** partial / Phase 2.1 required for remaining domains and deeper quantification.`,
    supporting: ["Priority source registry + claim support upgrades listed in overview."],
    contrary: ["Every supported claim retains opposing evidence fields in the ledger."],
    uncertainties: ["Causal identification across domains.", "Baseline completeness (2/86 sourced)."],
    gaps: ["12 foundational domains.", "Legal review 0%.", "Modeling 0%."],
    constitutional: "Evidence foundation is necessary but not sufficient for constitutional redesign.",
    policy: "Proceed to deeper research before national policy drafting.",
    metrics: "- `baseline_status.json`: partial_phase_2.",
    sources: ["CC-SRC-001", "CC-SRC-002", "CC-SRC-003", "CC-SRC-005", "CC-SRC-008", "CC-SRC-013"],
    claims: ["CC-CLAIM-002", "CC-CLAIM-004", "CC-CLAIM-005", "CC-CLAIM-011", "CC-CLAIM-013", "CC-CLAIM-019"],
    next: [
      "Execute Phase 2.1 remaining domains.",
      "Expand sourced baseline metrics.",
      "Keep civic deliberation parallel track separate from diagnosis claims.",
    ],
  })
);

function dossier(id, claimText, support, body) {
  return `# Evidence dossier: ${id}

**Claim:** ${claimText}

**Book One status:** Priority claim  
**Companion status:** ${support}  
**Last updated:** ${today}

${body}
`;
}

const claimById = Object.fromEntries(claimsDoc.claims.map((c) => [c.claim_id, c]));

const dossiers = [
  [
    "CC-CLAIM-002",
    `## Supporting research

- \`CC-SRC-003\` — BLS Beyond the Numbers: documents productivity–compensation divergence since the 1970s.
- \`CC-SRC-004\` — EPI productivity–pay gap (secondary, advocacy-affiliated): large cumulative gap under EPI definitions.

## Opposing research

- Measurement debates: average compensation vs typical-worker pay; benefits; deflators.
- Composition and sector effects can change magnitudes.

## Limitations

- Descriptive gap ≠ single causal story.
- Secondary series must not be presented as federal official statistics.

## Confidence level

**Partially supported / moderate** — phenomenon documented; magnitudes and causes contested.

## Questions remaining

- Best public series for “typical worker” communication?
- How much of the gap closes in tight labor markets?

## Data sources

- \`CC-SRC-003\`, \`CC-SRC-004\`
`,
  ],
  [
    "CC-CLAIM-004",
    `## Supporting research

- \`CC-SRC-006\` — Kruse IZA synthesis: small average positive performance association; better average pay/stability in many studies.
- \`CC-SRC-007\` — NCEO research digest (secondary/advocacy-adjacent): similar average associations; selection caveats apply.

## Opposing research

- Null results common; average effect sizes small (\`r̄≈0.04\` cited in synthesis).
- Selection into ESOPs; complementary HR practices.
- Employer-stock concentration of retirement risk.

## Limitations

- “Can improve” ≠ “always improves.”
- Design quality likely mediates outcomes.

## Confidence level

**Partially supported / moderate** — conditional and heterogeneous.

## Questions remaining

- Which governance designs are most robust?
- ESOP vs cooperative vs broad-based equity differences?

## Data sources

- \`CC-SRC-006\`, \`CC-SRC-007\`
`,
  ],
  [
    "CC-CLAIM-005",
    `## Supporting research

- \`CC-SRC-005\` — Census Economic Census concentration ratios (EC2200SIZECONCEN).

## Opposing research

- Efficiency/scale explanations for rising concentration.
- National ratios may misstate local or digital competition.

## Limitations

- Concentration ≠ proven exercise of market power.
- Industry-specific price/wage/entry effects required.

## Confidence level

**Partially supported / moderate** for descriptive concentration; competitive-harm claims remain case-specific.

## Questions remaining

- Priority NAICS sample with attached CR4 values?
- Markup and wage pass-through modules?

## Data sources

- \`CC-SRC-005\`
`,
  ],
  [
    "CC-CLAIM-006",
    `## Supporting research

- \`CC-SRC-008\` — ERS rural demography (county decline share; nonmetro population).
- \`CC-SRC-009\` — ERS rural hospital closures/conversions 2005–2023.
- \`CC-SRC-010\` — FDIC rural depopulation and community banks.

## Opposing research

- Post-2020 nonmetro migration gains in some areas.
- County-type heterogeneity (amenity vs persistent poverty).

## Limitations

- Plant-level relocation causality not established in this dossier.
- FDIC article is older and needs refresh.

## Confidence level

**Partially supported / moderate** for selected structural indicators.

## Questions remaining

- Updated rural banking structure series?
- Local fiscal capacity measures?

## Data sources

- \`CC-SRC-008\`, \`CC-SRC-009\`, \`CC-SRC-010\`
`,
  ],
  [
    "CC-CLAIM-011",
    `## Supporting research

- \`CC-SRC-001\` — SCF 2022 median $192,900 vs mean $1,063,700.
- \`CC-SRC-002\` / \`CC-SRC-012\` — DFA Q1 2026 shares (top 1% ≈28.8%; bottom 50% ≈5.3%).
- \`CC-SRC-011\` — NBER WP secondary corroboration (processing-dependent top-1% ≈35% in 2022 SCF analysis).

## Opposing research

- 2019–2022 SCF median rose faster than mean (some narrowing).
- Quarterly DFA shares move over time.

## Limitations

- Levels (SCF) and shares (DFA) are complementary.
- Private business valuation and top-coding affect tails.

## Confidence level

**Supported / strong** for the qualitative claim of high concentration; exact shares depend on series.

## Questions remaining

- Business equity vs housing decomposition by percentile?

## Data sources

- \`CC-SRC-001\`, \`CC-SRC-002\`, \`CC-SRC-011\`, \`CC-SRC-012\`
`,
  ],
  [
    "CC-CLAIM-012",
    `## Supporting research

- \`CC-SRC-012\` / \`CC-SRC-002\` — DFA Q1 2026: bottom 50% ≈5.3%; top decile ≈63.5% (1% + 90–99).

## Opposing research

- Middle 40% still holds ~31% — not a pure top/bottom binary.

## Limitations

- Share figures are quarterly model-based.

## Confidence level

**Supported / strong** for limited bottom-half share relative to top decile.

## Questions remaining

- How much of bottom-half wealth is housing equity vs financial assets?

## Data sources

- \`CC-SRC-012\`, \`CC-SRC-002\`
`,
  ],
  [
    "CC-CLAIM-013",
    `## Supporting research

- \`CC-SRC-013\` — CBO Distribution of Household Income in 2021: federal taxes and transfers are major distributional instruments; income composition and tax burdens differ sharply by quintile.

## Opposing research

- Incidence of payroll taxes may be shared; consumption taxes also burden workers.
- CBO concepts differ from statutory payroll/income splits in popular discourse.

## Limitations

- Partial support for institutional/distributional importance; not a finished incidence study.

## Confidence level

**Partially supported / moderate**.

## Questions remaining

- Attach average federal tax rates by income group to baseline JSON.
- Separate employee vs employer payroll statutory vs economic incidence.

## Data sources

- \`CC-SRC-013\`
`,
  ],
  [
    "CC-CLAIM-019",
    `## Supporting research

- Same rural spine as \`CC-CLAIM-006\`: \`CC-SRC-008\`, \`CC-SRC-009\`, \`CC-SRC-010\`.

## Opposing research

- Uneven recent migration gains; not all rural places share the same trajectory.

## Limitations

- “Structural barriers” is a family of mechanisms; this dossier covers selected indicators only.

## Confidence level

**Partially supported / moderate**.

## Questions remaining

- Broadband, childcare, and housing cost modules for rural areas.

## Data sources

- \`CC-SRC-008\`, \`CC-SRC-009\`, \`CC-SRC-010\`
`,
  ],
];

for (const [id, body] of dossiers) {
  const c = claimById[id];
  write(
    `content/evidence-companion/${id}.md`,
    dossier(id, c?.claim_text || id, c?.support_level || "unknown", body)
  );
}

// Refresh CC-CLAIM-004 filename variant used earlier
write(
  "content/evidence-companion/CC-CLAIM-004-employee-ownership.md",
  dossier(
    "CC-CLAIM-004",
    claimById["CC-CLAIM-004"]?.claim_text || "Employee ownership",
    "partially_supported",
    dossiers.find((d) => d[0] === "CC-CLAIM-004")[1]
  )
);

// Update evidence companion overview
write(
  "content/evidence-companion/EVIDENCE_COMPANION_OVERVIEW.md",
  `# Evidence Companion Overview

**Status:** Phase 2 seeded  
**Last updated:** ${today}

## Purpose

Book Two of the three-book architecture: claim-linked dossiers with supporting evidence, contrary evidence, limitations, and confidence — never empty sections presented as proof.

## Seeded dossiers (Phase 2)

| Claim | Support | File |
|---|---|---|
| CC-CLAIM-002 | partially_supported | \`CC-CLAIM-002.md\` |
| CC-CLAIM-004 | partially_supported | \`CC-CLAIM-004.md\` / \`CC-CLAIM-004-employee-ownership.md\` |
| CC-CLAIM-005 | partially_supported | \`CC-CLAIM-005.md\` |
| CC-CLAIM-006 | partially_supported | \`CC-CLAIM-006.md\` |
| CC-CLAIM-011 | supported | \`CC-CLAIM-011.md\` |
| CC-CLAIM-012 | supported | \`CC-CLAIM-012.md\` |
| CC-CLAIM-013 | partially_supported | \`CC-CLAIM-013.md\` |
| CC-CLAIM-019 | partially_supported | \`CC-CLAIM-019.md\` |

## Rules

1. Every quantitative assertion links a \`source_id\`.
2. Contrary evidence is required, not optional.
3. Predictions and normative proposals stay labeled and out of “supported fact” language.
4. Template: \`EVIDENCE_ENTRY_TEMPLATE.md\`.
`
);

// baseline status already 2 sourced; refresh note
const bStatus = JSON.parse(fs.readFileSync(r("data/baseline/baseline_status.json"), "utf8"));
bStatus.last_updated = today;
bStatus.note =
  "Phase 2 partial: 2/86 metrics sourced (wealth). Remaining pending — no invented targets.";
fs.writeFileSync(r("data/baseline/baseline_status.json"), JSON.stringify(bStatus, null, 2) + "\n");

console.log("[OK] Phase 2 content finalize complete");
console.log(`     sources: ${sourcesDoc.sources.length}`);
console.log(`     dossiers: ${dossiers.length}`);
