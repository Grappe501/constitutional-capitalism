/**
 * Generates expanded economic_system_comparison.json + Voice-B dossiers.
 * Developing analytical tool — no invented statistics.
 */
import fs from "node:fs";
import path from "node:path";
import { r } from "./lib/paths.mjs";

const STATUS = "developing_analytical_tool";

/** @typedef {{
 *  id: string, slug: string, name: string, family: string, era: string,
 *  ownership_model: string, role_of_markets: string, role_of_government: string,
 *  private_property: string, labor_treatment: string, concentrated_power_approach: string,
 *  accountability_source: string, strengths: string[], risks: string[],
 *  relationship_to_cc: string, historical_exemplars: string[], neighbor_systems: string[],
 *  definition: string, how_it_functions: string, why_emerges: string,
 *  claimed_benefits: string, weaknesses: string, historical_notes: string,
 *  neighbors_prose: string, sources: string[]
 * }} Sys */

/** @type {Sys[]} */
const systems = [
  // ——— Historical ———
  {
    id: "CC-SYS-FEUDALISM",
    slug: "feudalism",
    name: "Feudalism",
    family: "Historical",
    era: "Medieval Europe (ideal-type; regional variants)",
    ownership_model: "Layered land tenure under lords; peasants hold use-rights under obligation",
    role_of_markets: "Local and limited; land and labor often non-market or weakly marketized",
    role_of_government: "Fragmented lordship and personal jurisdiction more than modern territorial state",
    private_property: "Conditional tenure, not modern absolute title",
    labor_treatment: "Customary dues, labor services, serfdom or dependent peasantry in many settings",
    concentrated_power_approach: "Hierarchy of military-landholding elites",
    accountability_source: "Custom, oath, and local force rather than impersonal public law",
    strengths: ["Local order under weak central capacity", "Reciprocal (if unequal) protection bargains"],
    risks: ["Arbitrary lordship", "Immobility", "Violence and fragmented justice"],
    relationship_to_cc: "Historical contrast: CC requires impersonal constitutional property and citizenship, not personal dependence",
    historical_exemplars: ["High medieval western Europe (ideal-type)", "Regional seigneurial regimes"],
    neighbor_systems: ["CC-SYS-GUILD-MEDIEVAL-ECONOMY", "CC-SYS-TRIBUTARY-PALACE-ECONOMY", "CC-SYS-MERCANTILISM"],
    definition:
      "Feudalism, as a political-economy ideal-type, describes hierarchical landholding in which military and jurisdictional authority are tied to conditional tenure, and dependent rural populations render dues or services in exchange for protection and access to land.",
    how_it_functions:
      "Production is organized around estates and villages. Lords claim superior rights in land and often in local justice; cultivators hold inferior use-rights. Markets for land and free wage labor exist unevenly. Surplus extraction runs through customary obligations more than through modern corporate ownership or bureaucratic tax alone.",
    why_emerges:
      "It tends to appear where central administrative capacity is weak, military protection is expensive, and agriculture is the primary surplus base. Personal bonds and local force substitute for impersonal state capacity.",
    claimed_benefits:
      "Defenders of feudal or seigneurial order historically claimed mutual obligation, local protection, and social stability. Modern analysts sometimes note that fragmented authority can check distant tyranny even while enabling local domination.",
    weaknesses:
      "Arbitrary jurisdiction, barriers to mobility, chronic private violence, and weak impersonal rights. Dependence on personal status conflicts with equal citizenship.",
    historical_notes:
      "Historians debate how unitary 'feudalism' ever was. Use the category as a comparative ideal-type, not a claim that all medieval societies were identical.",
    neighbors_prose:
      "Differs from guild economies (urban corporate regulation) and from mercantilism (stronger territorial states steering trade). Differs from modern oligarchy, which usually operates through modern property and states rather than medieval tenure.",
    sources: [
      "Marc Bloch, Feudal Society",
      "Susan Reynolds, Fiefs and Vassals (critical of over-unified feudal models)",
      "Perry Anderson, Passages from Antiquity to Feudalism (Marxist comparative history)",
    ],
  },
  {
    id: "CC-SYS-GUILD-MEDIEVAL-ECONOMY",
    slug: "guild-medieval-economy",
    name: "Guild / medieval corporate economy",
    family: "Historical",
    era: "Late medieval–early modern urban Europe",
    ownership_model: "Artisan and merchant corporate ownership within town privileges",
    role_of_markets: "Regulated markets; entry, quality, and prices often guild-governed",
    role_of_government: "Municipal and corporate privileges bargain with princes and towns",
    private_property: "Strong for members within corporate rules; outsiders restricted",
    labor_treatment: "Apprenticeship and journeyman hierarchies; mastership as gate",
    concentrated_power_approach: "Corporate monopoly privileges by craft and town",
    accountability_source: "Guild statutes, municipal courts, custom",
    strengths: ["Quality control", "Skill transmission", "Member mutual aid"],
    risks: ["Entry barriers", "Innovation drag", "Insider privilege"],
    relationship_to_cc: "CC may respect associations and skill standards but rejects closed privilege as a constitutional baseline",
    historical_exemplars: ["Late medieval Italian and Northern European towns", "Craft guild charters"],
    neighbor_systems: ["CC-SYS-FEUDALISM", "CC-SYS-CORPORATISM", "CC-SYS-MERCANTILISM", "CC-SYS-COOPERATIVE-ECONOMICS"],
    definition:
      "A guild-centered medieval corporate economy organizes urban production and trade through legally privileged associations that regulate entry, training, product standards, and often prices.",
    how_it_functions:
      "Masters control workshops; apprentices and journeymen advance under corporate rules. Town governments and guilds co-produce market order. Privilege is explicit: membership confers economic rights outsiders lack.",
    why_emerges:
      "Urban specialization, reputation goods, and weak impersonal market institutions make corporate self-regulation attractive to producers and sometimes to rulers seeking taxable order.",
    claimed_benefits:
      "Adherents and later romantic interpreters emphasize craft dignity, quality, mutual insurance, and resistance to cutthroat undercutting.",
    weaknesses:
      "Exclusion of outsiders, gender and class barriers, rent-seeking through privilege, and friction with open-entry competition and innovation.",
    historical_notes:
      "Guild power varied by city and century; some historians stress flexibility, others cartel-like behavior. Treat as a spectrum of corporate market regulation.",
    neighbors_prose:
      "Closer to corporatism than to laissez-faire. Shares association themes with cooperatives but rests on legal privilege rather than open member-ownership norms.",
    sources: [
      "Sheilagh Ogilvie, The European Guilds",
      "S.R. Epstein and Maarten Prak (eds.), Guilds, Innovation and the European Economy",
      "Antony Black, Guilds and Civil Society",
    ],
  },
  {
    id: "CC-SYS-PHYSIOCRACY",
    slug: "physiocracy",
    name: "Physiocracy",
    family: "Historical",
    era: "18th-century France (intellectual system)",
    ownership_model: "Private landed property as the productive core",
    role_of_markets: "Free grain trade and natural price formation emphasized",
    role_of_government: "Legal despotism in physiocratic theory: strong authority to secure natural order",
    private_property: "Strong, especially agricultural land",
    labor_treatment: "Agriculture privileged as productive class; industry often labeled sterile in theory",
    concentrated_power_approach: "Landed surplus and single tax on net product as fiscal redesign",
    accountability_source: "Natural law and enlightened administration",
    strengths: ["Early systematic political economy", "Critique of mercantilist privilege"],
    risks: ["Agricultural monism", "Authoritarian legal-despotism risk", "Undervaluation of industry"],
    relationship_to_cc: "Shares anti-privilege and property themes; CC rejects physiocratic class metaphysics and legal despotism",
    historical_exemplars: ["Quesnay's Tableau économique", "Turgot-era reform debates"],
    neighbor_systems: ["CC-SYS-MERCANTILISM", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM", "CC-SYS-GEORGISM"],
    definition:
      "Physiocracy is an Enlightenment political-economy doctrine holding that agriculture uniquely yields a net product, that free internal grain trade is natural, and that fiscal and legal order should align with that natural surplus.",
    how_it_functions:
      "In theory, landlords receive the net product; a single tax on that surplus funds the sovereign; barriers to grain circulation are attacked. Industry and commerce are useful but not primary surplus creators in physiocratic classification.",
    why_emerges:
      "Emerges from critique of French mercantilist regulation, fiscal crisis, and agricultural reform debates under absolute monarchy.",
    claimed_benefits:
      "Adherents claimed scientific economic order, reduced arbitrary privileges, and prosperity through free grain circulation and sound land taxation.",
    weaknesses:
      "Overstates agriculture as sole productive sector; 'legal despotism' sits uneasily with liberal constitutionalism; empirical industrial growth falsifies sterile-industry dogma.",
    historical_notes:
      "Important as intellectual ancestor to later liberalism and tax-on-rent ideas, not as a durable national operating system.",
    neighbors_prose:
      "Anti-mercantilist relative to Colbertism; precursor affinities with laissez-faire and with Georgist rent focus, without Georgism's full program.",
    sources: [
      "François Quesnay, Tableau économique",
      "Elizabeth Fox-Genovese, The Origins of Physiocracy",
      "Ronald L. Meek, The Economics of Physiocracy",
    ],
  },
  {
    id: "CC-SYS-TRIBUTARY-PALACE-ECONOMY",
    slug: "tributary-palace-economy",
    name: "Ancient tributary / palace economy",
    family: "Historical",
    era: "Bronze Age and ancient agrarian empires (ideal-type)",
    ownership_model: "Palace, temple, or imperial centers claim superior claims on surplus",
    role_of_markets: "Markets exist at margins; allocation often administered by redistributive centers",
    role_of_government: "Ruler-centered extraction and redistribution; household of the palace as economic hub",
    private_property: "Conditional and stratified; elite and institutional holdings dominate",
    labor_treatment: "Corvée, dependent labor, slavery, and tribute obligations common in variants",
    concentrated_power_approach: "Central ceremonial-political concentration of surplus",
    accountability_source: "Divine kingship, temple authority, imperial hierarchy",
    strengths: ["Large-scale mobilization", "Grain storage and crisis redistribution capacity"],
    risks: ["Extractive predation", "Information and incentive failures", "Subject vulnerability"],
    relationship_to_cc: "Contrary ideal-type: CC rejects palace-centered domination and requires constitutional limits on extractive power",
    historical_exemplars: ["Mycenaean palace records (ideal-type reference)", "Ancient Near Eastern redistributive polities (comparative)"],
    neighbor_systems: ["CC-SYS-FEUDALISM", "CC-SYS-COMMAND-ECONOMIES", "CC-SYS-STATE-CAPITALISM"],
    definition:
      "A tributary or palace economy is an ideal-type in which political-religious centers extract agricultural and craft surplus through tribute, dependent labor, and redistribution, with markets secondary to administered allocation.",
    how_it_functions:
      "Palace or temple households record, store, and reallocate goods. Subjects owe deliveries or labor. Long-distance trade and private exchange can exist without displacing the extractive center.",
    why_emerges:
      "Irrigation agriculture, warfare, and ceremonial states create incentives for centralized surplus control before modern markets and impersonal property dominate.",
    claimed_benefits:
      "Rulers and priestly elites claimed cosmic order, famine buffering, and civilizational scale projects. Modern functionalists sometimes stress coordination under high transaction costs.",
    weaknesses:
      "Predation, brittle hierarchy, limited subject exit, and weak rights against the center.",
    historical_notes:
      "Archaeology and Assyriology show huge variation. Use as comparative diagnostic, not a single ancient template.",
    neighbors_prose:
      "Shares administered allocation with command economies but lacks modern industrial planning ideology. Differs from feudalism's fragmented lordship by centering the palace/temple.",
    sources: [
      "Karl Polanyi, The Great Transformation (substantivist framing of administered trade)",
      "Moses Finley, The Ancient Economy (debated market role in antiquity)",
      "Timothy Earle, How Chiefs Come to Power (comparative political economy of surplus)",
    ],
  },
  {
    id: "CC-SYS-CLASSICAL-REPUBLICAN-MIXED-ECONOMY",
    slug: "classical-republican-mixed-economy",
    name: "Classical republican mixed economy",
    family: "Historical",
    era: "Greco-Roman and early-modern republican thought; selective practice",
    ownership_model: "Private household property with civic limits against luxury and dependency",
    role_of_markets: "Commerce accepted with suspicion of corruption and dependency",
    role_of_government: "Mixed constitution; civic virtue and anti-domination as political aims",
    private_property: "Strong for citizens; tied to independence and military/civic capacity",
    labor_treatment: "Ideal of independent proprietor; historical reliance on slavery or dependents in many republics",
    concentrated_power_approach: "Agrarian laws, sumptuary norms, and mixed offices to check oligarchy",
    accountability_source: "Civic virtue, mixed institutions, public contestation",
    strengths: ["Anti-domination ethic", "Link of property to citizenship", "Suspicion of corrupting concentration"],
    risks: ["Exclusionary citizenship", "Slavery and patriarchy in historical republics", "Anti-commercial romanticism"],
    relationship_to_cc: "Major intellectual neighbor on anti-domination and broad independent ownership; CC must reject historical exclusions while learning the independence-property link",
    historical_exemplars: ["Roman republican ideology (idealized)", "Machiavelli and Atlantic republican discourse", "Early American agrarian republican themes"],
    neighbor_systems: ["CC-SYS-DISTRIBUTISM", "CC-SYS-OLIGARCHY", "CC-SYS-CONSTITUTIONAL-CAPITALISM", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM"],
    definition:
      "Classical republican political economy ties free citizenship to non-dominated property holdings, mixed government, and vigilance against oligarchic or monarchical corruption of civic independence.",
    how_it_functions:
      "Ideal households are economically independent enough to resist patrons. Laws and norms restrain luxury and extreme concentration. Markets operate, but commercial dependency is treated as a political risk.",
    why_emerges:
      "City-state and early modern republican settings where military citizenship and elite rivalry make domination a live constitutional fear.",
    claimed_benefits:
      "Adherents claim liberty as non-domination, civic equality among citizens, and durable free institutions.",
    weaknesses:
      "Historical republics often rested on slavery, patriarchy, and narrow citizenship. Anti-commercial strands can block productive exchange.",
    historical_notes:
      "Distinguish civic ideology from practice. Roman and Atlantic republicanism are intellectual resources, not plug-and-play models.",
    neighbors_prose:
      "Closer to distributism and CC on broad ownership than to laissez-faire indifference to concentration. Opposed to oligarchy by definition of the ideal.",
    sources: [
      "J.G.A. Pocock, The Machiavellian Moment",
      "Quentin Skinner, Liberty before Liberalism",
      "Philip Pettit, Republicanism (modern reconstruction of non-domination)",
    ],
  },
  {
    id: "CC-SYS-MERCANTILISM",
    slug: "mercantilism",
    name: "Mercantilism",
    family: "Historical",
    era: "Early modern European states; recurrent modern echoes",
    ownership_model: "Mixed private ownership under national strategic direction",
    role_of_markets: "Trade managed for national advantage; bullion and balance-of-trade focus historically",
    role_of_government: "Uses tariffs, monopolies, navigation acts, and charters",
    private_property: "Conditional on sovereign strategy and privilege",
    labor_treatment: "Labor serves national production and naval/military capacity",
    concentrated_power_approach: "Chartered monopolies and favored companies common",
    accountability_source: "Sovereign strategy and fiscal-military state",
    strengths: ["State capacity building", "Infant-industry and naval power logics"],
    risks: ["Rent seeking", "War and commercial conflict", "Consumer costs of privilege"],
    relationship_to_cc: "CC rejects privilege charters while allowing lawful resilience and competition policy — not mercantile monopoly",
    historical_exemplars: ["Colbertist France", "English Navigation Acts era", "Chartered companies"],
    neighbor_systems: ["CC-SYS-PHYSIOCRACY", "CC-SYS-DEVELOPMENTAL-STATE", "CC-SYS-CRONY-CAPITALISM", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM"],
    definition:
      "Mercantilism names early modern and recurrent doctrines that treat international trade and industry as instruments of state power, often using privileges, tariffs, and monopolies to strengthen the fiscal-military state.",
    how_it_functions:
      "Governments charter companies, regulate shipping, protect selected producers, and treat specie or strategic industries as power resources. Private traders operate inside a privilege architecture.",
    why_emerges:
      "Interstate rivalry, colonial expansion, and weak free-trade institutions make managed commerce attractive to rulers seeking revenue and naval strength.",
    claimed_benefits:
      "Advocates claim national wealth, employment in favored sectors, strategic independence, and stronger state capacity.",
    weaknesses:
      "Monopoly rents, retaliation, misallocation, and capture by favored interests. Classical political economy (Smith) made this the foil for free trade critique.",
    historical_notes:
      "Eli Heckscher and later historians debate coherence of 'mercantilism' as a single system. Still useful as a family of state-trade strategies.",
    neighbors_prose:
      "Overlaps with developmental-state industrial policy but classical mercantilism is more privilege-and-bullion flavored. Degenerates into cronyism when favors detach from public strategy.",
    sources: [
      "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (critique of mercantile system)",
      "Eli F. Heckscher, Mercantilism",
      "Lars Magnusson, Mercantilism: The Shaping of an Economic Language",
    ],
  },

  // ——— Market-capitalist ———
  {
    id: "CC-SYS-LAISSEZ-FAIRE-CAPITALISM",
    slug: "laissez-faire-capitalism",
    name: "Laissez-faire capitalism",
    family: "Market-capitalist",
    era: "Classical liberal ideal; 19th-century approximations",
    ownership_model: "Predominantly private ownership",
    role_of_markets: "Markets coordinate most activity with minimal intervention",
    role_of_government: "Limited to property, contract, basic order, and narrow public goods",
    private_property: "Strong",
    labor_treatment: "Contractual wage labor",
    concentrated_power_approach: "Relies largely on entry and market correction",
    accountability_source: "Private contract and market discipline",
    strengths: ["Entrepreneurship", "Price discovery", "Low discretionary intervention"],
    risks: ["Externalities", "Concentrated private power", "Under-provision of public goods"],
    relationship_to_cc: "Partial ancestor; CC adds constitutional accountability for public and private domination",
    historical_exemplars: ["Classical liberal treatises", "Select 19th-century policy regimes (approximate)"],
    neighbor_systems: ["CC-SYS-NEOLIBERALISM", "CC-SYS-ANARCHO-CAPITALISM", "CC-SYS-ORDOLIBERALISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Laissez-faire capitalism is the ideal in which private property and voluntary exchange coordinate production with a night-watchman state limited to enforcing rights and narrow public functions.",
    how_it_functions:
      "Prices, profits, and losses guide investment. Government refrains from industrial planning, extensive redistribution, and discretionary privilege. Antitrust, if present, is thin compared with ordoliberal designs.",
    why_emerges:
      "Intellectual reaction against mercantilist privilege and, later, against expanding administrative states. Appeals where trust in spontaneous order is high.",
    claimed_benefits:
      "Adherents claim maximum liberty, efficient allocation, innovation, and skepticism of political knowledge.",
    weaknesses:
      "Externalities, systemic risk, monopoly and monopsony power, and political inequality that markets alone may not correct.",
    historical_notes:
      "Pure laissez-faire is rare; most 'liberal' centuries mixed markets with empire, tariffs, or poor-law institutions. Use as ideal-type.",
    neighbors_prose:
      "More minimal-state than neoliberalism's often active market-construction agenda. Less anti-monopoly-constitutional than ordoliberalism and CC.",
    sources: [
      "Adam Smith, Wealth of Nations",
      "Frédéric Bastiat, Economic Sophisms",
      "Friedrich Hayek, The Road to Serfdom; The Constitution of Liberty",
    ],
  },
  {
    id: "CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM",
    slug: "shareholder-primacy-capitalism",
    name: "Shareholder-primacy capitalism",
    family: "Market-capitalist",
    era: "20th–21st century corporate law and finance ideology",
    ownership_model: "Private corporate ownership oriented to residual shareholder claims",
    role_of_markets: "Capital and control markets discipline managers",
    role_of_government: "Sets corporate, securities, and bankruptcy law",
    private_property: "Strong",
    labor_treatment: "Labor treated chiefly as contractual input",
    concentrated_power_approach: "Competition law plus capital-market discipline",
    accountability_source: "Shareholder value metrics and fiduciary doctrines (as interpreted)",
    strengths: ["Clear managerial objective", "Capital formation", "Exit discipline via markets"],
    risks: ["Short-termism", "Stakeholder externalities", "Agency problems despite the slogan"],
    relationship_to_cc: "CC rejects shareholder value as the sole constitutional lens on corporate power",
    historical_exemplars: ["Berle-Means corporation debates", "Late-20th-century agency theory influence"],
    neighbor_systems: ["CC-SYS-STAKEHOLDER-CAPITALISM", "CC-SYS-PUBLIC-BENEFIT-CAPITALISM", "CC-SYS-NEOLIBERALISM", "CC-SYS-WELFARE-CAPITALISM"],
    definition:
      "Shareholder-primacy capitalism treats maximizing residual returns to shareholders as the governing purpose of the business corporation within the bounds of law.",
    how_it_functions:
      "Boards and managers are evaluated by equity value. Labor, communities, and environment enter mainly as constraints or instruments unless mandated otherwise. Takeovers and investor activism are key disciplines.",
    why_emerges:
      "Separation of ownership and control, deep equity markets, and intellectual campaigns against managerialism and stakeholder vagueness.",
    claimed_benefits:
      "Proponents claim clarity, capital attraction, reduced managerial self-dealing, and social wealth via residual maximization under competitive markets.",
    weaknesses:
      "Externalized harms, truncated time horizons, weak voice for non-shareholder constituencies affected by corporate power.",
    historical_notes:
      "Legal historians debate how absolute 'primacy' ever was in doctrine versus rhetoric. Still a powerful operating ideology in finance and governance.",
    neighbors_prose:
      "Opposed by stakeholder and public-benefit models on purpose; overlaps neoliberal capital-market governance; distinct from welfare capitalism's social insurance overlay.",
    sources: [
      "Adolf A. Berle and Gardiner C. Means, The Modern Corporation and Private Property",
      "Milton Friedman, 'The Social Responsibility of Business Is to Increase Its Profits' (1970)",
      "Michael C. Jensen and William H. Meckling, 'Theory of the Firm' (1976)",
    ],
  },
  {
    id: "CC-SYS-NEOLIBERALISM",
    slug: "neoliberalism",
    name: "Neoliberalism",
    family: "Market-capitalist",
    era: "Late 20th century onward (contested label)",
    ownership_model: "Private ownership expanded via privatization and marketization",
    role_of_markets: "Markets actively constructed and extended into new domains",
    role_of_government: "Strong state as market-maker: competition rules, monetary regimes, globalization architecture",
    private_property: "Strong; intellectual property and finance emphasized",
    labor_treatment: "Flexible labor markets; unions often weakened relative to mid-century peaks",
    concentrated_power_approach: "Competition policy varies; finance and platform concentration recurring issues",
    accountability_source: "Price signals, independent agencies, and international economic rules",
    strengths: ["Anti-inflation monetary credibility (claimed)", "Trade integration", "Entrepreneurial dynamism"],
    risks: ["Financial instability", "Inequality", "Democratic backlash", "Label overuse"],
    relationship_to_cc: "Overlaps on markets and property; CC rejects reducing constitutional order to market efficiency alone",
    historical_exemplars: ["Post-1970s policy shifts in multiple OECD countries", "Washington Consensus debates"],
    neighbor_systems: ["CC-SYS-LAISSEZ-FAIRE-CAPITALISM", "CC-SYS-ORDOLIBERALISM", "CC-SYS-KEYNESIAN-MANAGED-CAPITALISM", "CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM"],
    definition:
      "Neoliberalism, as used here, means a family of late-modern projects that expand market coordination while using state power to entrench competition, privatization, capital mobility, and credibility-focused macroeconomic regimes—not simple absence of government.",
    how_it_functions:
      "Privatization, deregulation in some sectors, re-regulation in others, independent central banking, trade and capital-account openness, and metrics of competitiveness. The state is often busy building markets.",
    why_emerges:
      "Stagflation crises, dissatisfaction with mid-century planning and corporatism, and intellectual networks promoting market order.",
    claimed_benefits:
      "Adherents claim efficiency, consumer gains from trade, fiscal discipline, and escape from capture by producer coalitions.",
    weaknesses:
      "Financial crises, geographic and class polarization, eroded bargaining power, and contested democratic legitimacy. The term is also analytically slippery when used as a slur.",
    historical_notes:
      "Scholars disagree on whether neoliberalism is a coherent system or a cluster. Distinguish it carefully from classical laissez-faire.",
    neighbors_prose:
      "More constructivist about market order than romantic laissez-faire; related to but not identical with German ordoliberalism; opposed to Keynesian demand management priorities.",
    sources: [
      "Quinn Slobodian, Globalists",
      "David Harvey, A Brief History of Neoliberalism (critical)",
      "Michel Foucault, The Birth of Biopolitics (lectures on neoliberal governmentality)",
    ],
  },
  {
    id: "CC-SYS-KEYNESIAN-MANAGED-CAPITALISM",
    slug: "keynesian-managed-capitalism",
    name: "Keynesian / managed capitalism",
    family: "Market-capitalist",
    era: "Mid-20th century mixed economies; recurrent after crises",
    ownership_model: "Mostly private ownership with periodic public enterprise",
    role_of_markets: "Markets central; demand management and stabilization overlay",
    role_of_government: "Fiscal-monetary stabilization, automatic stabilizers, sometimes incomes policy",
    private_property: "Strong",
    labor_treatment: "Full employment as a political goal; union bargaining often institutionalized",
    concentrated_power_approach: "Competition policy plus macroeconomic management; not primarily ownership socialization",
    accountability_source: "Electoral democracy and technocratic economic management",
    strengths: ["Stabilization ambition", "Employment focus", "Crisis response toolkit"],
    risks: ["Inflation", "Fiscal stress", "Political business cycles", "Capture of industrial policy"],
    relationship_to_cc: "Compatible toolkit elements possible; CC is not identical to mid-century managed capitalism",
    historical_exemplars: ["Postwar OECD 'golden age' debates", "Keynesian policy manuals"],
    neighbor_systems: ["CC-SYS-WELFARE-CAPITALISM", "CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-MIXED-ECONOMY", "CC-SYS-NEOLIBERALISM"],
    definition:
      "Keynesian or managed capitalism keeps private ownership and markets while using macroeconomic policy—and sometimes planning or incomes policy—to stabilize demand and pursue high employment.",
    how_it_functions:
      "Governments adjust spending, taxes, and monetary conditions; welfare and unemployment insurance act as stabilizers; private firms remain primary producers.",
    why_emerges:
      "Great Depression trauma, wartime mobilization lessons, and electoral demand for employment security.",
    claimed_benefits:
      "Adherents claim fewer deep depressions, higher employment, and reconciliation of capitalism with mass democracy.",
    weaknesses:
      "Inflation and stop-go cycles, debt concerns, and limits of fine-tuning. Supply shocks expose demand-only tools.",
    historical_notes:
      "National variants differed (social democratic, conservative, developmental). Treat as a macroeconomic regime family atop market ownership.",
    neighbors_prose:
      "Overlaps welfare capitalism and social democracy; contested by neoliberal credibility regimes after the 1970s.",
    sources: [
      "John Maynard Keynes, The General Theory of Employment, Interest and Money",
      "Peter A. Hall (ed.), The Political Power of Economic Ideas: Keynesianism across Nations",
      "Michal Kalecki, essays on political aspects of full employment",
    ],
  },
  {
    id: "CC-SYS-WELFARE-CAPITALISM",
    slug: "welfare-capitalism",
    name: "Welfare capitalism",
    family: "Market-capitalist",
    era: "20th century onward",
    ownership_model: "Private ownership with employer or public benefits layered on",
    role_of_markets: "Markets central for production and jobs",
    role_of_government: "Supports income, health, and social insurance—or mandates employer provision",
    private_property: "Strong",
    labor_treatment: "Benefits supplement wages; employment often gateway to security",
    concentrated_power_approach: "Conventional competition policy; social insurance as counterweight",
    accountability_source: "Employers, insurers, and welfare-state institutions",
    strengths: ["Security within markets", "Political stabilization of capitalism"],
    risks: ["Employer dependency", "Coverage gaps", "Cost and fiscal pressures"],
    relationship_to_cc: "CC may incorporate compatible protections without equating CC to welfare capitalism",
    historical_exemplars: ["Company welfare traditions", "Bismarckian and Beveridgean insurance lineages"],
    neighbor_systems: ["CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-KEYNESIAN-MANAGED-CAPITALISM", "CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM"],
    definition:
      "Welfare capitalism combines private enterprise with social insurance and benefits—public, employer-based, or hybrid—to buffer workers against market risks.",
    how_it_functions:
      "Wages plus pensions, health coverage, unemployment insurance, and related benefits. Eligibility often tied to employment or citizenship categories.",
    why_emerges:
      "Industrial risk, labor conflict, and electoral pressure to make capitalism livable for wage earners.",
    claimed_benefits:
      "Advocates claim dignity, risk pooling, and reconciliation of markets with social peace.",
    weaknesses:
      "Job-lock, dualization between insiders and outsiders, and fiscal or employer cost stress. Does not by itself solve concentrated corporate power.",
    historical_notes:
      "Esping-Andersen's regime types (liberal, conservative, social democratic) show internal diversity.",
    neighbors_prose:
      "Narrower than full social democracy's decommodification ambition; softer on ownership change than socialism.",
    sources: [
      "Gøsta Esping-Andersen, The Three Worlds of Welfare Capitalism",
      "T.H. Marshall, Citizenship and Social Class",
      "Jacob S. Hacker, The Divided Welfare State",
    ],
  },
  {
    id: "CC-SYS-STAKEHOLDER-CAPITALISM",
    slug: "stakeholder-capitalism",
    name: "Stakeholder capitalism",
    family: "Market-capitalist",
    era: "Late 20th–21st century governance discourse",
    ownership_model: "Private ownership with multiple stakeholder duties claimed",
    role_of_markets: "Markets central",
    role_of_government: "Sets disclosure, fiduciary expectations, and soft-law codes",
    private_property: "Strong",
    labor_treatment: "Labor recognized as stakeholder alongside communities and environment",
    concentrated_power_approach: "Voluntary or legal stakeholder governance; enforcement often soft",
    accountability_source: "Corporate governance codes, ESG metrics, reputation",
    strengths: ["Broader impact recognition", "Managerial ethical language"],
    risks: ["Vagueness", "Weak enforcement", "Managerial unaccountability"],
    relationship_to_cc: "CC seeks constitutional grounding for accountability rather than voluntary stakeholder rhetoric alone",
    historical_exemplars: ["Business Roundtable 2019 statement debates", "Rhenish governance comparisons"],
    neighbor_systems: ["CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM", "CC-SYS-PUBLIC-BENEFIT-CAPITALISM", "CC-SYS-SOCIAL-MARKET-ECONOMICS"],
    definition:
      "Stakeholder capitalism holds that corporate managers should balance interests of shareholders, workers, customers, suppliers, communities, and sometimes the environment.",
    how_it_functions:
      "Purpose statements, ESG reporting, and board duties (hard or soft) expand beyond residual equity claims. Capital markets still matter; legal bite varies by jurisdiction.",
    why_emerges:
      "Legitimacy crises of shareholder primacy, inequality politics, and climate/social risk disclosure demands.",
    claimed_benefits:
      "Proponents claim long-term value, social license, and realistic recognition of corporate power's effects.",
    weaknesses:
      "Without clear metrics and enforcement, stakeholder language can mask managerial self-interest or public-relations substitution for rights.",
    historical_notes:
      "Some coordinated-market economies practiced stakeholder-ish governance before the slogan. Distinguish soft ESG branding from hard law.",
    neighbors_prose:
      "Softer than public-benefit entity law; less structural than social-market competition orders; rival to shareholder primacy.",
    sources: [
      "R. Edward Freeman, Strategic Management: A Stakeholder Approach",
      "Colin Mayer, Prosperity",
      "Lucian Bebchuk and Roberto Tallarita critiques of stakeholderism (law-review literature)",
    ],
  },
  {
    id: "CC-SYS-PUBLIC-BENEFIT-CAPITALISM",
    slug: "public-benefit-capitalism",
    name: "Public-benefit capitalism",
    family: "Market-capitalist",
    era: "21st-century entity-law innovation",
    ownership_model: "Private ownership including mission-locked or benefit entities",
    role_of_markets: "Markets with social-purpose corporate forms",
    role_of_government: "Authorizes and regulates benefit corporations and similar forms",
    private_property: "Strong",
    labor_treatment: "Labor treated as stakeholder within mission governance",
    concentrated_power_approach: "Voluntary mission governance; not a full concentration remedy",
    accountability_source: "Charters, benefit reports, and limited fiduciary redesign",
    strengths: ["Mission protection", "Legal clarity vs pure soft stakeholderism"],
    risks: ["Voluntary uptake", "Enforcement thinness", "Greenwashing risk"],
    relationship_to_cc: "Compatible mechanism family, not a complete CC system",
    historical_exemplars: ["U.S. benefit corporation statutes", "Community interest company analogues abroad"],
    neighbor_systems: ["CC-SYS-STAKEHOLDER-CAPITALISM", "CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM"],
    definition:
      "Public-benefit capitalism uses specialized private entity forms that legally permit or require pursuit of stated public benefits alongside profit.",
    how_it_functions:
      "Founders lock mission into charters; directors gain cover to consider non-shareholder aims; reporting duties vary. Ordinary competitive markets still allocate capital and customers.",
    why_emerges:
      "Entrepreneurs and investors seek legal tools against pure residual-maximization pressure.",
    claimed_benefits:
      "Advocates claim credible commitment to mission, innovation in corporate purpose, and market-compatible social enterprise.",
    weaknesses:
      "Optional uptake leaves most corporate power unchanged; reporting can be shallow; not a substitute for constitutional competition and anti-domination rules.",
    historical_notes:
      "Entity-law reform is real but partial. Do not equate statute availability with systemic transformation.",
    neighbors_prose:
      "Harder-edged than slogan stakeholderism; still private-property market economy unlike socialism.",
    sources: [
      "Model Benefit Corporation Legislation and state enactments (U.S.)",
      "Jill E. Fisch and Steven Davidoff Solomon analyses of benefit corporations",
      "UK Companies Act community interest company framework materials",
    ],
  },
  {
    id: "CC-SYS-ANARCHO-CAPITALISM",
    slug: "anarcho-capitalism",
    name: "Anarcho-capitalism",
    family: "Market-capitalist",
    era: "Late 20th-century libertarian theory",
    ownership_model: "Fully private ownership including security and law as market goods",
    role_of_markets: "Markets replace state provision of nearly all services",
    role_of_government: "Abolished or reduced to vanishing point in the ideal",
    private_property: "Maximal",
    labor_treatment: "Pure contract; no public labor regime",
    concentrated_power_approach: "Assumes competition among private defense agencies prevents domination",
    accountability_source: "Reputation, contract, and exit among private providers",
    strengths: ["Radical anti-coercion ethic (as claimed)", "Consistency about monopoly of force skepticism"],
    risks: ["Warlord and cartel risk", "Public-goods underprovision", "Unequal access to justice"],
    relationship_to_cc: "CC affirms limited capable constitutional government; rejects abolition of the public coercive framework",
    historical_exemplars: ["Theoretical literature (Rothbard, Friedman)", "No durable large-scale national exemplar"],
    neighbor_systems: ["CC-SYS-LAISSEZ-FAIRE-CAPITALISM", "CC-SYS-MUTUALISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Anarcho-capitalism proposes that private property and free markets can supply law, defense, and adjudication without a territorial state.",
    how_it_functions:
      "In theory, competing insurers and defense firms protect rights; polycentric law emerges from contract. Taxation and monopoly state courts disappear.",
    why_emerges:
      "Extension of libertarian property ethics and economic arguments against state monopoly of force.",
    claimed_benefits:
      "Adherents claim maximum liberty, peace through commerce, and escape from political predation.",
    weaknesses:
      "Credible commitment and cartelization problems among force providers; historical analogies to private violence are cautionary. Empirical large-polity tests are essentially absent.",
    historical_notes:
      "Keep clearly labeled as a normative ideal-type. Do not invent success cases.",
    neighbors_prose:
      "More anti-statist than laissez-faire minarchism; market-property opposite of mutualist anti-capitalist anarchism.",
    sources: [
      "Murray N. Rothbard, For a New Liberty",
      "David D. Friedman, The Machinery of Freedom",
      "Robert Nozick, Anarchy, State, and Utopia (minarchist foil)",
    ],
  },
  {
    id: "CC-SYS-MIXED-ECONOMY",
    slug: "mixed-economy",
    name: "Mixed economy",
    family: "Market-capitalist",
    era: "Twentieth century–present (most real economies)",
    ownership_model: "Private enterprise dominant with public ownership in selected sectors",
    role_of_markets: "Markets allocate most goods; planning or regulation in others",
    role_of_government: "Regulator, insurer, sometimes producer; shares vary by country",
    private_property: "Strong but bounded by regulation and public domains",
    labor_treatment: "Wage labor with public labor law overlays",
    concentrated_power_approach: "Competition law, regulation, and occasional public options",
    accountability_source: "Democratic politics plus market discipline",
    strengths: ["Pragmatic hybridity", "Sector-specific tools", "Empirical commonality"],
    risks: ["Conceptual vagueness", "Inconsistent accountability", "Fiscal and regulatory overload"],
    relationship_to_cc: "Describes many baselines CC would reform; mixed economy is a description, not CC's distinctive constitutional thesis",
    historical_exemplars: ["Postwar Western economies", "Contemporary OECD mixes"],
    neighbor_systems: ["CC-SYS-KEYNESIAN-MANAGED-CAPITALISM", "CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-STATE-CAPITALISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "A mixed economy combines private markets with substantial public ownership, regulation, and social provision—the empirical default of modern capitalism rather than a pure ideology.",
    how_it_functions:
      "Private firms produce most tradables; governments run or heavily regulate utilities, education, health finance, and transfers. Shares differ widely.",
    why_emerges:
      "Political bargaining after industrialization, wars, and depressions; recognition that pure poles are unstable.",
    claimed_benefits:
      "Pragmatists claim flexibility and the ability to correct market and state failures sector by sector.",
    weaknesses:
      "As a category it explains little without specifying which mix. Can hide privilege and blur responsibility.",
    historical_notes:
      "Use as a residual empirical label and bridge category, then drill into more specific regime types.",
    neighbors_prose:
      "Broader umbrella than social democracy or Keynesianism; less state-dominant than state capitalism.",
    sources: [
      "Andrew Shonfield, Modern Capitalism",
      "Peter A. Hall and David Soskice, Varieties of Capitalism",
      "Joseph E. Stiglitz, Economics of the Public Sector (textbook framing of mixes)",
    ],
  },
  {
    id: "CC-SYS-CONSTITUTIONAL-CAPITALISM",
    slug: "constitutional-capitalism",
    name: "Constitutional Capitalism",
    family: "Market-capitalist",
    era: "Developing contemporary framework",
    ownership_model: "Secure private and broadly distributed ownership",
    role_of_markets: "Free and fair markets under constitutional safeguards",
    role_of_government: "Limited, capable, democratically accountable rule enforcement",
    private_property: "Strong, subject to lawful obligations",
    labor_treatment: "Workers possess dignity, voice, and optional ownership pathways",
    concentrated_power_approach: "Prevents domination by public or private power",
    accountability_source: "Constitutional law, democratic accountability, and contestable markets",
    strengths: ["Liberty", "Pluralism", "Broad opportunity", "Anti-domination aim"],
    risks: ["Unresolved mechanisms", "Overbreadth risk", "Implementation incompleteness"],
    relationship_to_cc: "The developing framework being defined — not settled doctrine completion",
    historical_exemplars: ["Project Declaration and principles (in development)", "Comparative lessons from ordoliberal and republican traditions"],
    neighbor_systems: ["CC-SYS-ORDOLIBERALISM", "CC-SYS-SOCIAL-MARKET-ECONOMICS", "CC-SYS-CLASSICAL-REPUBLICAN-MIXED-ECONOMY", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM"],
    definition:
      "Constitutional Capitalism is a developing constitutional-economic framework that affirms private property and free enterprise while asking how constitutional law can prevent both public and private domination.",
    how_it_functions:
      "In aspiration: secure property, contestable markets, broad ownership pathways, dignified work, and limited but capable government under democratic accountability. Mechanisms remain under research and are not claimed as completed law.",
    why_emerges:
      "Response to perceived failures of cronyism, oligarchic concentration, and socialist abolition of private property—seeking a third path grounded in constitutional anti-domination.",
    claimed_benefits:
      "Proponents claim reconciliation of prosperity with civic equality, and rejection of both state economic dictatorship and private economic domination.",
    weaknesses:
      "Framework incompleteness: many mechanisms unresolved; risk of overclaiming before evidence and legal design mature. This project treats that incompleteness as a governance fact, not a marketing problem.",
    historical_notes:
      "Not a historical regime with settled outcomes. Comparative neighbors (ordoliberalism, republicanism, social-market thought) are intellectual references, not identities.",
    neighbors_prose:
      "Not socialism; not laissez-faire indifference to private power; not mere stakeholder slogans. Closest comparative references include ordoliberal competition order and classical republican anti-domination, without equating them to CC.",
    sources: [
      "Project document: WHAT_CONSTITUTIONAL_CAPITALISM_IS_AND_IS_NOT.md",
      "Project Declaration of Constitutional Capitalism (draft)",
      "Comparative references: Walter Eucken on economic order; classical republican liberty literature",
    ],
  },

  // ——— Coordinated-market ———
  {
    id: "CC-SYS-SOCIAL-MARKET-ECONOMICS",
    slug: "social-market-economics",
    name: "Social-market economics",
    family: "Coordinated-market",
    era: "Postwar West Germany and related European debates",
    ownership_model: "Private ownership within a social legal order",
    role_of_markets: "Markets coordinate under social safeguards",
    role_of_government: "Maintains competition and social protection",
    private_property: "Strong",
    labor_treatment: "Labor protections and social partnership",
    concentrated_power_approach: "Strong competition policy",
    accountability_source: "Constitutional democratic law",
    strengths: ["Competitive dynamism with social security"],
    risks: ["Complexity", "Fiscal demands", "Corporatist insider risk"],
    relationship_to_cc: "Close comparative reference, not an identity",
    historical_exemplars: ["Soziale Marktwirtschaft discourse", "Postwar Federal Republic economic order debates"],
    neighbor_systems: ["CC-SYS-ORDOLIBERALISM", "CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-CORPORATISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Social-market economics seeks a competitive private-property market order joined to social insurance and labor protections—markets with a social floor, not socialism.",
    how_it_functions:
      "Private firms compete under antitrust-minded rules; welfare institutions cushion risk; social partners may coordinate wages without abolishing markets.",
    why_emerges:
      "Post-fascist and postwar reconstruction politics seeking neither laissez-faire myth nor command socialism.",
    claimed_benefits:
      "Adherents claim prosperity with dignity, competition with cohesion.",
    weaknesses:
      "Institutional complexity; tensions between competition purity and social partnership; fiscal load.",
    historical_notes:
      "Interwoven with ordoliberal ideas yet broader in social-policy practice. National implementations varied.",
    neighbors_prose:
      "Near ordoliberalism on competition; nearer social democracy on welfare depth depending on period.",
    sources: [
      "Alfred Müller-Armack writings on soziale Marktwirtschaft",
      "A.J. Nicholls, Freedom with Responsibility",
      "Volker Berghahn, The Americanisation of West German Industry (context)",
    ],
  },
  {
    id: "CC-SYS-ORDOLIBERALISM",
    slug: "ordoliberalism",
    name: "Ordoliberalism",
    family: "Coordinated-market",
    era: "Freiburg School; postwar German economic constitution debates",
    ownership_model: "Private ownership under a competitive order",
    role_of_markets: "Markets require an ordering legal framework to remain free",
    role_of_government: "Strong rule-setting state; limited discretionary industrial direction",
    private_property: "Strong",
    labor_treatment: "Labor protected within legal order",
    concentrated_power_approach: "Prevents monopolies and privileges as constitutional-economic duty",
    accountability_source: "Rule of law and competition order",
    strengths: ["Anti-monopoly clarity", "Order-based liberalism"],
    risks: ["May understate distributional conflict", "Technocratic rigidity risk"],
    relationship_to_cc: "Major intellectual comparison for CC's competition and anti-privilege aims",
    historical_exemplars: ["Freiburg School texts", "German competition-law tradition influences"],
    neighbor_systems: ["CC-SYS-SOCIAL-MARKET-ECONOMICS", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM", "CC-SYS-NEOLIBERALISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Ordoliberalism holds that a free market economy is not spontaneous laissez-faire but an economic constitution: the state must maintain competition and prevent private power from becoming private government.",
    how_it_functions:
      "Rules against cartels and privilege; skepticism of discretionary intervention; emphasis on liability, price signals, and Ordnungspolitik.",
    why_emerges:
      "Critique of both Weimar cartelism and Nazi command, and of laissez-faire blindness to private power.",
    claimed_benefits:
      "Adherents claim liberty through order, dispersed power, and durable competition.",
    weaknesses:
      "Distribution and macroeconomic stabilization can be underweighted; real politics often dilutes competition purity.",
    historical_notes:
      "Distinct from Anglo-American neoliberal caricatures; related but not identical to social-market practice.",
    neighbors_prose:
      "More constitutional-competitive than laissez-faire; less welfare-defining than social democracy; key foil/neighbor for CC.",
    sources: [
      "Walter Eucken, Principles of Economic Policy / Foundations of Economics",
      "Franz Böhm on economic constitution",
      "Viktor J. Vanberg on ordoliberal constitutional economics",
    ],
  },
  {
    id: "CC-SYS-SOCIAL-DEMOCRACY",
    slug: "social-democracy",
    name: "Social democracy",
    family: "Coordinated-market",
    era: "20th–21st century electoral socialism-within-capitalism",
    ownership_model: "Mostly private ownership with strong public welfare and regulation",
    role_of_markets: "Markets remain central for production",
    role_of_government: "Provides services, redistribution, and labor protections",
    private_property: "Strong",
    labor_treatment: "Strong labor protections and collective bargaining",
    concentrated_power_approach: "Competition law plus welfare and labor counterweights",
    accountability_source: "Democratic institutions and parties",
    strengths: ["Security", "Equality of opportunity ambitions", "Mass legitimacy"],
    risks: ["Fiscal burden", "Administrative complexity", "Globalization constraints"],
    relationship_to_cc: "Overlaps on democratic accountability; CC remains distinct and not identical",
    historical_exemplars: ["Nordic model debates", "Postwar European social democratic governments"],
    neighbor_systems: ["CC-SYS-DEMOCRATIC-SOCIALISM", "CC-SYS-WELFARE-CAPITALISM", "CC-SYS-SOCIAL-MARKET-ECONOMICS", "CC-SYS-KEYNESIAN-MANAGED-CAPITALISM"],
    definition:
      "Social democracy pursues egalitarian security and labor power primarily through democratic politics, welfare states, and regulated private markets rather than full socialization of productive assets.",
    how_it_functions:
      "Progressive taxation, universal or broad social services, labor law, and active labor-market policy sit atop private enterprise.",
    why_emerges:
      "Working-class enfranchisement and rejection of revolutionary rupture in favor of electoral reformism.",
    claimed_benefits:
      "Adherents claim freedom as real capability, compressed inequality, and civilized capitalism.",
    weaknesses:
      "Fiscal and demographic pressures; insider-outsider labor divides; limited tools against some forms of corporate concentration.",
    historical_notes:
      "Distinct from democratic socialism when the latter prioritizes social ownership. Borders blur in party rhetoric.",
    neighbors_prose:
      "More market-retaining than socialism; more egalitarian-ambitious than residual welfare capitalism.",
    sources: [
      "Gøsta Esping-Andersen, The Three Worlds of Welfare Capitalism",
      "Sheri Berman, The Primacy of Politics",
      "Karl Polanyi, The Great Transformation (double movement context)",
    ],
  },
  {
    id: "CC-SYS-CORPORATISM",
    slug: "corporatism",
    name: "Corporatism",
    family: "Coordinated-market",
    era: "Interwar theory; postwar neocorporatist practice",
    ownership_model: "Private or mixed ownership organized by functional groups",
    role_of_markets: "Markets coordinated through organized interests",
    role_of_government: "Bargains with and directs recognized groups",
    private_property: "Variable",
    labor_treatment: "Labor represented through official peak associations",
    concentrated_power_approach: "Managed through group bargaining",
    accountability_source: "State-recognized associations",
    strengths: ["Coordination", "Peak-level representation", "Strike reduction potential"],
    risks: ["Exclusion of outsiders", "Elite bargaining opacity", "Authoritarian variants"],
    relationship_to_cc: "CC may learn from coordination but rejects closed privilege and compulsory functional representation as constitutional baseline",
    historical_exemplars: ["Postwar Austrian/Scandinavian neocorporatism", "Interwar authoritarian corporatist ideologies (distinct)"],
    neighbor_systems: ["CC-SYS-FASCIST-POLITICAL-ECONOMY", "CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-GUILD-MEDIEVAL-ECONOMY", "CC-SYS-SOCIAL-MARKET-ECONOMICS"],
    definition:
      "Corporatism organizes economic governance through recognized functional groups—labor, capital, professions—bargaining with the state, rather than solely through parliamentary individualism or pure markets.",
    how_it_functions:
      "Peak associations negotiate wages, prices, or policy. The state licenses interlocutors. Democratic neocorporatism differs sharply from fascist compulsory corporations.",
    why_emerges:
      "Need for stabilization amid strong organized labor and capital, or authoritarian projects to suppress class conflict.",
    claimed_benefits:
      "Defenders of democratic corporatism claim governability, wage restraint with voice, and social peace.",
    weaknesses:
      "Outsider exclusion, rigidity, and—in authoritarian forms—destruction of independent pluralism.",
    historical_notes:
      "Always separate democratic social partnership from fascist corporatism in analysis.",
    neighbors_prose:
      "Democratic pole near social democracy; authoritarian pole near fascist political economy; medieval echo in guild privilege.",
    sources: [
      "Philippe C. Schmitter on still the century of corporatism",
      "Peter J. Katzenstein, Small States in World Markets",
      "Howard J. Wiarda, Corporatism and Comparative Politics",
    ],
  },
  {
    id: "CC-SYS-DEVELOPMENTAL-STATE",
    slug: "developmental-state",
    name: "Developmental state",
    family: "Coordinated-market",
    era: "Late 20th-century East Asian industrialization literature",
    ownership_model: "Private firms guided by selective state industrial policy",
    role_of_markets: "Export markets central; domestic markets often steered",
    role_of_government: "Pilot agencies, credit steering, performance discipline",
    private_property: "Strong but politically conditional in strategic sectors",
    labor_treatment: "Varies; often repression or incorporation during high-growth phases",
    concentrated_power_approach: "National champions and conglomerates cultivated then sometimes disciplined",
    accountability_source: "Performance legitimacy and bureaucratic insulation (contested)",
    strengths: ["Rapid industrialization capacity", "Learning-by-doing coordination"],
    risks: ["Authoritarian politics", "Crony degeneration", "Hard mid-income transitions"],
    relationship_to_cc: "CC rejects authoritarian insulation; may study performance discipline without importing unaccountable pilot agencies",
    historical_exemplars: ["Japan MITI debates", "South Korea and Taiwan high-growth literatures"],
    neighbor_systems: ["CC-SYS-MERCANTILISM", "CC-SYS-STATE-CAPITALISM", "CC-SYS-CRONY-CAPITALISM", "CC-SYS-AUTHORITARIAN-MARKET-ECONOMY"],
    definition:
      "The developmental state is a comparative ideal-type in which a capable bureaucracy steers private investment toward industrial upgrading through selective incentives and export discipline.",
    how_it_functions:
      "Credit, licensing, and planning agencies favor firms that meet performance standards. Markets remain, but prices and entry are politically shaped.",
    why_emerges:
      "Late development under geopolitical pressure; desire to catch up without waiting for spontaneous comparative advantage alone.",
    claimed_benefits:
      "Advocates claim rapid growth, technological ladder-climbing, and national capability.",
    weaknesses:
      "Political authoritarianism in several cases; capture and cronyism when discipline fails; difficulty liberalizing later.",
    historical_notes:
      "Chalmers Johnson and successors debate scope conditions. Not a blank check for any industrial policy.",
    neighbors_prose:
      "More performance-oriented than classical mercantilist privilege; collapses toward cronyism or authoritarian market economy when accountability fails.",
    sources: [
      "Chalmers Johnson, MITI and the Japanese Miracle",
      "Alice H. Amsden, Asia's Next Giant",
      "Peter Evans, Embedded Autonomy",
    ],
  },
  {
    id: "CC-SYS-DISTRIBUTISM",
    slug: "distributism",
    name: "Distributism",
    family: "Coordinated-market",
    era: "Early 20th-century Catholic social thought; ongoing niche",
    ownership_model: "Widely distributed small-scale productive property",
    role_of_markets: "Markets with preference for small owners and local exchange",
    role_of_government: "Supports ownership dispersion and associations; anti-monopoly spirit",
    private_property: "Strong and broad",
    labor_treatment: "Family and guild-oriented work; skepticism of proletarian wage dependence",
    concentrated_power_approach: "Structural dispersion of property",
    accountability_source: "Household, parish, and local association",
    strengths: ["Independence", "Local ownership", "Anti-servility ethic"],
    risks: ["Scale limitations", "Romanticism", "Under-specified macro institutions"],
    relationship_to_cc: "Shares broad ownership aim; not a fixed CC form or confessional program",
    historical_exemplars: ["Chesterton and Belloc writings", "Select cooperative/agrarian experiments"],
    neighbor_systems: ["CC-SYS-CLASSICAL-REPUBLICAN-MIXED-ECONOMY", "CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-GEORGISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Distributism seeks a society of many owners—small farms, shops, and crafts—rather than concentration in capitalist combines or socialist states.",
    how_it_functions:
      "Policy imagination centers on anti-monopoly rules, guild-like associations, and family property. Large impersonal corporations are disfavored.",
    why_emerges:
      "Catholic social critique of industrial proletarianization and of socialist collectivism.",
    claimed_benefits:
      "Adherents claim dignity of ownership, rooted communities, and freedom from both boss and bureaucrat.",
    weaknesses:
      "Modern capital intensity and global scale challenge small-property romanticism; institutional program often incomplete.",
    historical_notes:
      "Normative school more than completed national system. Compare with republican yeoman ideals.",
    neighbors_prose:
      "Near cooperatives and republican mixed economy; distinct from Georgism's land-tax focus though sometimes allied in anti-landlordism.",
    sources: [
      "Hilaire Belloc, The Servile State",
      "G.K. Chesterton, The Outline of Sanity",
      "Pope Leo XIII, Rerum Novarum (broader Catholic social context)",
    ],
  },
  {
    id: "CC-SYS-COOPERATIVE-ECONOMICS",
    slug: "cooperative-economics",
    name: "Cooperative economics",
    family: "Coordinated-market",
    era: "19th century–present",
    ownership_model: "Member-owned firms and associations",
    role_of_markets: "Markets can coordinate cooperatives alongside other firms",
    role_of_government: "Enables cooperative legal structures and sometimes preferential policy",
    private_property: "Strong, often collective among members",
    labor_treatment: "Workers or consumer-members govern enterprises",
    concentrated_power_approach: "Member ownership as counter to investor concentration",
    accountability_source: "Member governance (one-member-one-vote norms common)",
    strengths: ["Participation", "Shared returns", "Local anchoring potential"],
    risks: ["Capital access constraints", "Governance collective-action problems"],
    relationship_to_cc: "CC treats cooperatives as one possible ownership mechanism among others",
    historical_exemplars: ["Rochdale principles", "Mondragon (comparative case literature)", "Credit union movements"],
    neighbor_systems: ["CC-SYS-MUTUALISM", "CC-SYS-MARKET-SOCIALISM", "CC-SYS-DISTRIBUTISM", "CC-SYS-PUBLIC-BENEFIT-CAPITALISM"],
    definition:
      "Cooperative economics centers enterprises owned and governed by their members—workers, consumers, or producers—rather than residual equity investors alone.",
    how_it_functions:
      "Surpluses and control follow membership rules. Cooperatives still buy, sell, and hire in markets unless embedded in a different system.",
    why_emerges:
      "Responses to industrial exploitation, rural credit gaps, and desire for democratic workplaces.",
    claimed_benefits:
      "Adherents claim dignity, resilience, and alignment of firm purpose with member needs.",
    weaknesses:
      "Raising risk capital, scaling governance, and competing with investor-owned firms under unequal finance access.",
    historical_notes:
      "Success is sector- and institution-specific. Avoid inventing universal performance claims.",
    neighbors_prose:
      "Overlaps mutualism and market socialism; can exist inside mixed capitalism without system change.",
    sources: [
      "International Cooperative Alliance principles statements",
      "Johnston Birchall, The International Co-operative Movement",
      "Henry Hansmann, The Ownership of Enterprise",
    ],
  },
  {
    id: "CC-SYS-COMMONS-CPR-GOVERNANCE",
    slug: "commons-cpr-governance",
    name: "Commons / common-pool resource governance",
    family: "Coordinated-market",
    era: "Long historical practice; late 20th-century institutional analysis",
    ownership_model: "Shared resource systems with community rules (not open-access chaos)",
    role_of_markets: "May coexist; core allocation often by local rules and norms",
    role_of_government: "May recognize, support, or undermine local governance",
    private_property: "Nested rights; not simple private vs state binary",
    labor_treatment: "Users contribute monitoring and maintenance labor",
    concentrated_power_approach: "Local rule design to prevent overuse and elite capture (aspirational)",
    accountability_source: "User communities and nested institutions",
    strengths: ["Local knowledge", "Sustainable use potential", "Polycentric governance insights"],
    risks: ["Elite capture", "Scale limits", "External pressure breakdown"],
    relationship_to_cc: "Informative for polycentric governance; not a complete national economic system substitute for CC",
    historical_exemplars: ["Irrigation communities", "Fisheries and forest commons case studies in Ostrom tradition"],
    neighbor_systems: ["CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-MUTUALISM", "CC-SYS-FEUDALISM"],
    definition:
      "Commons / CPR governance refers to institutions through which communities sustainably manage shared resources via rules, monitoring, and sanctions—distinct from both pure private parcels and pure state ownership.",
    how_it_functions:
      "Users craft boundaries, appropriation rules, and graduated sanctions. Nested higher authorities may help or harm. Markets for products can exist without privatizing the resource system itself.",
    why_emerges:
      "Where exclusion is hard and subtractability is high, communities invent rules to avoid tragedy-of-open-access.",
    claimed_benefits:
      "Researchers and practitioners claim durability, fairness among users, and ecological care when design principles hold.",
    weaknesses:
      "Not automatic; fails under certain inequality, mobility, or state predation conditions. Not a universal template for industrial capital.",
    historical_notes:
      "Ostrom's work rebuts simple Hardin open-access fatalism without denying failure cases.",
    neighbors_prose:
      "Related to cooperatives and mutualism at local scale; unlike feudalism, modern CPR analysis emphasizes craftable rules and monitoring.",
    sources: [
      "Elinor Ostrom, Governing the Commons",
      "Garrett Hardin, 'The Tragedy of the Commons' (1968) — contrast piece",
      "National Research Council volumes on common-pool resources",
    ],
  },
  {
    id: "CC-SYS-GEORGISM",
    slug: "georgism",
    name: "Georgism",
    family: "Coordinated-market",
    era: "Late 19th century–present land-value tax tradition",
    ownership_model: "Private improvements; social claim on land rents",
    role_of_markets: "Markets for goods and labor; land taxed to capture unearned rent",
    role_of_government: "Assesses and taxes land value; otherwise often market-friendly",
    private_property: "Strong in produced capital; land rent socialized via tax",
    labor_treatment: "Labor and capital keep what they produce; land rent redirected",
    concentrated_power_approach: "Attacks land monopoly and speculative rent",
    accountability_source: "Fiscal transparency of land assessments",
    strengths: ["Clear rent theory", "Anti-speculation logic", "Compatibility with markets"],
    risks: ["Assessment politics", "Transition conflicts", "Incomplete as full system"],
    relationship_to_cc: "Interesting anti-rent instrument set; not identical to CC and not silently adopted as doctrine",
    historical_exemplars: ["Henry George's Progress and Poverty movement", "Select land-value tax local experiments"],
    neighbor_systems: ["CC-SYS-PHYSIOCRACY", "CC-SYS-DISTRIBUTISM", "CC-SYS-LAISSEZ-FAIRE-CAPITALISM", "CC-SYS-SOCIAL-DEMOCRACY"],
    definition:
      "Georgism holds that land rents are socially created and should be captured for public use via land-value taxation, while leaving private earnings on labor and improvements largely untaxed.",
    how_it_functions:
      "Assess site values; tax rents; reduce taxes on production. Housing and business improvements remain private.",
    why_emerges:
      "Gilded Age inequality and observation that rising land values enrich owners without productive effort.",
    claimed_benefits:
      "Adherents claim poverty reduction, efficient land use, and reconciliation of free production with justice.",
    weaknesses:
      "Political resistance from landowners; technical assessment disputes; does not by itself solve all corporate power problems.",
    historical_notes:
      "Influenced diverse reformers. Empirical magnitudes of effects are jurisdiction-specific and not asserted here.",
    neighbors_prose:
      "Echoes physiocratic focus on land surplus; more market-retaining than socialism; different from distributism's small-plot emphasis though sometimes allied.",
    sources: [
      "Henry George, Progress and Poverty",
      "Mason Gaffney essays on Georgist economics",
      "Modern land-value tax policy literature (jurisdictional studies)",
    ],
  },

  // ——— Socialist ———
  {
    id: "CC-SYS-DEMOCRATIC-SOCIALISM",
    slug: "democratic-socialism",
    name: "Democratic socialism",
    family: "Socialist",
    era: "20th–21st century (contested usage)",
    ownership_model: "Substantial social, public, or worker ownership of major assets",
    role_of_markets: "Markets vary by program—from limited to sectoral",
    role_of_government: "Democratic direction of investment and ownership forms",
    private_property: "Limited for major productive assets",
    labor_treatment: "Labor as co-owner or democratic participant",
    concentrated_power_approach: "Public/social ownership as primary curb on capital concentration",
    accountability_source: "Democratic social control",
    strengths: ["Equality ambitions", "Workplace voice", "Public control of investment"],
    risks: ["State or collective control risks", "Capital flight", "Innovation and calculation debates"],
    relationship_to_cc: "CC protects private property as foundational and is not this system",
    historical_exemplars: ["Programmatic party platforms", "Select nationalization waves under democratic governments"],
    neighbor_systems: ["CC-SYS-SOCIALISM", "CC-SYS-SOCIAL-DEMOCRACY", "CC-SYS-MARKET-SOCIALISM", "CC-SYS-SYNDICALISM"],
    definition:
      "Democratic socialism seeks socialist ownership or control of major productive assets through democratic politics rather than one-party dictatorship—usage varies, and some speakers use the term for Nordic social democracy (treated separately here).",
    how_it_functions:
      "Programs emphasize public ownership, worker cooperatives at scale, or socialized investment funds, with elections remaining the legitimacy source.",
    why_emerges:
      "Desire to combine socialist equality with political democracy after authoritarian socialist failures.",
    claimed_benefits:
      "Adherents claim real freedom through economic democracy and an end to private capital's veto over public life.",
    weaknesses:
      "Investment coordination challenges; risks of new bureaucratic domination; contested growth and innovation performance. Boundary with social democracy often rhetorically blurred.",
    historical_notes:
      "This matrix keeps social democracy distinct to preserve analytical clarity.",
    neighbors_prose:
      "More ownership-transforming than social democracy; more electoral than classical Marxism-Leninism; overlaps market socialism and syndicalism depending on design.",
    sources: [
      "Ralph Miliband, Parliamentary Socialism (critical historical study)",
      "John Roemer, A Future for Socialism",
      "Michael Harrington, Socialism: Past and Future",
    ],
  },
  {
    id: "CC-SYS-SOCIALISM",
    slug: "socialism",
    name: "Socialism",
    family: "Socialist",
    era: "19th century–present (family of systems)",
    ownership_model: "Social, cooperative, or state ownership of major productive assets",
    role_of_markets: "Markets range from limited to absent across variants",
    role_of_government: "Directs or owns significant production",
    private_property: "Restricted for major assets",
    labor_treatment: "Labor framed as collective producer",
    concentrated_power_approach: "Social ownership as primary remedy to capital concentration",
    accountability_source: "Social ownership or planning institutions",
    strengths: ["Equality aims", "Coordination ambitions", "Decommodification goals"],
    risks: ["Liberty risks", "Innovation and incentive problems", "New elite formation"],
    relationship_to_cc: "CC is not socialism",
    historical_exemplars: ["Diverse national experiments and movements", "Second International traditions"],
    neighbor_systems: ["CC-SYS-DEMOCRATIC-SOCIALISM", "CC-SYS-MARXISM", "CC-SYS-MARKET-SOCIALISM", "CC-SYS-COMMAND-ECONOMIES"],
    definition:
      "Socialism names systems and movements that socialize major productive assets—via state, cooperative, or communal forms—to subordinate capital to collective aims.",
    how_it_functions:
      "Variants differ: planning vs market socialism; democratic vs authoritarian. Common thread is limiting private capital's residual control of production.",
    why_emerges:
      "Industrial inequality, labor movements, and critiques of capitalist crisis and exploitation.",
    claimed_benefits:
      "Adherents claim justice, solidarity, and rational production for need.",
    weaknesses:
      "Historical authoritarian outcomes in several states; calculation and incentive debates; suppression risks. Fair analysis must also register social achievements claimed in health and literacy in some cases without inventing magnitudes here.",
    historical_notes:
      "Umbrella term—always specify variant when making strong claims.",
    neighbors_prose:
      "Broader than Marxism as ideology; includes non-Marxian socialist traditions. Command economies are one implementation family.",
    sources: [
      "G.D.H. Cole, A History of Socialist Thought",
      "Albert Fried and Ronald Sanders (eds.), Socialist Thought: A Documentary History",
      "Alec Nove, The Economics of Feasible Socialism",
    ],
  },
  {
    id: "CC-SYS-MARXISM",
    slug: "marxism",
    name: "Marxism",
    family: "Socialist",
    era: "19th century theory; 20th century political movements",
    ownership_model: "Collective ownership after class transformation",
    role_of_markets: "Markets seen as historically superseded under full communism; socialism as transition debated",
    role_of_government: "State often transitional in theory (dictatorship of the proletariat debates)",
    private_property: "Abolished for productive capital",
    labor_treatment: "Labor emancipated from wage relation in the ideal trajectory",
    concentrated_power_approach: "Class abolition through revolutionary transformation",
    accountability_source: "Historical materialism and proletarian political rule (theory)",
    strengths: ["Structural critique of exploitation and crisis", "Totalizing social analysis"],
    risks: ["Authoritarian implementation risks", "Teleology", "Suppression of pluralism"],
    relationship_to_cc: "CC rejects class-revolutionary premises and abolition of productive private property",
    historical_exemplars: ["Marx and Engels theoretical corpus", "Diverse 20th-century Marxist parties and states"],
    neighbor_systems: ["CC-SYS-COMMUNISM", "CC-SYS-SOCIALISM", "CC-SYS-COMMAND-ECONOMIES", "CC-SYS-SYNDICALISM"],
    definition:
      "Marxism is a theory of history and capitalism centered on class, exploitation, and the projected supersession of capitalist property relations—later institutionalized in varied political forms.",
    how_it_functions:
      "As analysis: critique of surplus value and accumulation. As politics: parties and states claiming Marxist authority organized planning and one-party rule in several countries—outcomes fiercely debated.",
    why_emerges:
      "Industrial capitalism's conflicts and intellectual synthesis of German philosophy, British political economy, and French socialism.",
    claimed_benefits:
      "Adherents claim scientific insight into capitalism and a path to human emancipation from class domination.",
    weaknesses:
      "Authoritarian party-states claiming Marxism caused mass coercion in multiple cases; prediction and calculation problems; tendency to dismiss liberal rights as bourgeois.",
    historical_notes:
      "Distinguish Marx's texts, Marxist movements, and Soviet-type regimes. Fairness requires not collapsing all into one caricature—or excusing coercion.",
    neighbors_prose:
      "Theoretical parent to many socialisms; communism as end-state ideal; command economies as historical implementations.",
    sources: [
      "Karl Marx, Capital, Volume I",
      "Karl Marx and Friedrich Engels, The Communist Manifesto",
      "Leszek Kołakowski, Main Currents of Marxism",
    ],
  },
  {
    id: "CC-SYS-COMMUNISM",
    slug: "communism",
    name: "Communism",
    family: "Socialist",
    era: "Theoretical end-state; 20th-century party-state claims",
    ownership_model: "Common ownership in a classless ideal",
    role_of_markets: "Markets abolished in the ideal form",
    role_of_government: "State withers away in theory; party-states claimed the name in practice",
    private_property: "Abolished for productive assets in the ideal",
    labor_treatment: "Labor allocated by communal principle ('from each…')",
    concentrated_power_approach: "Eliminates class ownership in theory",
    accountability_source: "Communal self-rule in theory; party hierarchy in many practices",
    strengths: ["Egalitarian ideal", "Critique of class division"],
    risks: ["Coordination problems", "Coercion in practice", "Gap between ideal and party-state"],
    relationship_to_cc: "CC rejects abolition of property and markets",
    historical_exemplars: ["Marxian end-state writings", "20th-century Communist Party states (practical claimants)"],
    neighbor_systems: ["CC-SYS-MARXISM", "CC-SYS-COMMAND-ECONOMIES", "CC-SYS-SOCIALISM"],
    definition:
      "Communism, in classical theory, is a classless common-ownership society beyond the state; in political practice, parties and states used the name for hierarchical systems that never matched the ideal.",
    how_it_functions:
      "Ideal: communal production and distribution without commodity exchange. Practice: centralized parties, planning, and security apparatuses claiming transitional necessity.",
    why_emerges:
      "Theoretical completion of socialist trajectory; political brand of revolutionary parties.",
    claimed_benefits:
      "Adherents claim ultimate equality, abundance, and freedom from alienation.",
    weaknesses:
      "Ideal underspecifies incentives and information; practical claimants produced coercion and scarcity pathologies in multiple cases.",
    historical_notes:
      "Always separate regulative ideal from USSR/PRC-type historical regimes in careful comparison.",
    neighbors_prose:
      "End-state relative to Marxism; command economies were the main operating form of states using the label.",
    sources: [
      "Marx, Critique of the Gotha Programme",
      "Friedrich Engels, Anti-Dühring (state and withering themes)",
      "Archie Brown, The Rise and Fall of Communism",
    ],
  },
  {
    id: "CC-SYS-COMMAND-ECONOMIES",
    slug: "command-economies",
    name: "Command economies",
    family: "Socialist",
    era: "20th-century Soviet-type and related systems",
    ownership_model: "State ownership or command over production",
    role_of_markets: "Planning replaces most market allocation",
    role_of_government: "Central planners direct output, prices, and investment",
    private_property: "Restricted",
    labor_treatment: "Labor allocated administratively; enterprise employment norms",
    concentrated_power_approach: "Central command concentration",
    accountability_source: "Planning authority and party hierarchy",
    strengths: ["Mobilization for defined crash goals", "Rapid structural shift capacity"],
    risks: ["Information failures", "Shortages", "Coercion", "Innovation drag"],
    relationship_to_cc: "Contrary to CC market freedom and private property foundations",
    historical_exemplars: ["Soviet-type economies", "Classic central planning textbooks and critiques"],
    neighbor_systems: ["CC-SYS-STATE-CAPITALISM", "CC-SYS-COMMUNISM", "CC-SYS-MARKET-SOCIALISM", "CC-SYS-TRIBUTARY-PALACE-ECONOMY"],
    definition:
      "A command economy allocates resources primarily by administrative targets and material balances rather than by market prices.",
    how_it_functions:
      "Ministries issue output plans; enterprises fulfill quotas; prices are often accounting tools. Informal bargaining and black markets commonly appear as adaptations.",
    why_emerges:
      "Revolutionary nationalization, war economy habits, and ideological rejection of market allocation.",
    claimed_benefits:
      "Advocates claimed full employment, rapid heavy industrialization, and social provision insulated from profit.",
    weaknesses:
      "Soft budget constraints, chronic shortage, poor consumer responsiveness, and political repression often paired with the model.",
    historical_notes:
      "Janos Kornai's shortage economy analysis is central. Performance varied by period; do not invent aggregate statistics here.",
    neighbors_prose:
      "Operating form near state capitalism debates; market socialism proposed as reform alternative; ancient palace economies share administered allocation without modern industry.",
    sources: [
      "János Kornai, The Socialist System; Economics of Shortage",
      "Alec Nove, The Soviet Economic System",
      "Paul R. Gregory and Robert C. Stuart, Russian and Soviet Economic Performance and Structure",
    ],
  },
  {
    id: "CC-SYS-MARKET-SOCIALISM",
    slug: "market-socialism",
    name: "Market socialism",
    family: "Socialist",
    era: "20th–21st century theoretical and reform models",
    ownership_model: "Social or public ownership of firms that compete in markets",
    role_of_markets: "Markets allocate goods; capital ownership socialized",
    role_of_government: "Sets ownership rules, regulation, and sometimes investment planning",
    private_property: "Limited for means of production; personal property retained",
    labor_treatment: "Worker self-management variants or publicly hired labor",
    concentrated_power_approach: "Social ownership plus market competition among enterprises",
    accountability_source: "Boards, planners, or worker councils depending on model",
    strengths: ["Attempts to combine social ownership with price signals"],
    risks: ["Soft budgets", "Political interference", "Investment inefficiency debates"],
    relationship_to_cc: "Still socializes productive capital; CC retains private productive property",
    historical_exemplars: ["Lange model debates", "Yugoslav self-management literature", "Late socialist reform programs"],
    neighbor_systems: ["CC-SYS-SOCIALISM", "CC-SYS-DEMOCRATIC-SOCIALISM", "CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-COMMAND-ECONOMIES"],
    definition:
      "Market socialism seeks to keep market price coordination while replacing private capital ownership with social, public, or worker ownership of enterprises.",
    how_it_functions:
      "Firms buy and sell competitively; profits accrue to society or workers rather than private residual claimants. Models differ on who appoints managers and how investment is allocated.",
    why_emerges:
      "Response to calculation critiques of pure planning and to authoritarian command failures.",
    claimed_benefits:
      "Adherents claim efficiency with equity and avoidance of capitalist class power.",
    weaknesses:
      "Political capture of 'social' owners; innovation and hard-budget problems; historical reform attempts often unstable.",
    historical_notes:
      "Distinguish textbook Lange-Lerner models from Yugoslavia or Hungarian reform practice.",
    neighbors_prose:
      "Between command planning and cooperative capitalism; nearer democratic socialism than ordoliberal private-property orders.",
    sources: [
      "Oskar Lange, On the Economic Theory of Socialism",
      "Branko Horvat, The Political Economy of Socialism",
      "John E. Roemer, A Future for Socialism",
    ],
  },
  {
    id: "CC-SYS-SYNDICALISM",
    slug: "syndicalism",
    name: "Syndicalism",
    family: "Socialist",
    era: "Early 20th-century labor movements",
    ownership_model: "Producer unions / syndicates control industry",
    role_of_markets: "Often subordinated to federated producer coordination",
    role_of_government: "Skeptical of parliamentary state; dual power via unions",
    private_property: "Rejected for productive assets",
    labor_treatment: "Workers as collective industrial sovereigns",
    concentrated_power_approach: "Union federation replaces capital owners",
    accountability_source: "Union democracy and industrial federations",
    strengths: ["Workplace democracy ideal", "Direct producer power"],
    risks: ["Producer capture against consumers", "Coordination across industries", "Militancy-institutionalization tension"],
    relationship_to_cc: "Rejects private capital sovereignty; incompatible with CC property foundations",
    historical_exemplars: ["French CGT revolutionary syndicalism", "Spanish CNT traditions", "IWW influence"],
    neighbor_systems: ["CC-SYS-MUTUALISM", "CC-SYS-DEMOCRATIC-SOCIALISM", "CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-MARXISM"],
    definition:
      "Syndicalism seeks to place industries under the control of organized producers through unions or syndicates, often via direct action rather than parliamentary socialism alone.",
    how_it_functions:
      "Strikes, boycotts, and workplace organization build dual power; federations coordinate production after expropriation of owners.",
    why_emerges:
      "Shop-floor experience of exploitation and distrust of both capital and bureaucratic socialist parties.",
    claimed_benefits:
      "Adherents claim authentic worker emancipation and end of parasitic ownership.",
    weaknesses:
      "Consumer and inter-industry conflict; vulnerability to state repression; unclear investment governance.",
    historical_notes:
      "Powerful as movement culture; durable national operating systems rare.",
    neighbors_prose:
      "Near mutualism and council communism variants; more anti-statist than many democratic socialisms.",
    sources: [
      "Émile Pouget and revolutionary syndicalist pamphlets",
      "Rudolf Rocker, Anarcho-Syndicalism",
      "Larry Peterson and Marcel van der Linden historiographies of syndicalism",
    ],
  },
  {
    id: "CC-SYS-MUTUALISM",
    slug: "mutualism",
    name: "Mutualism",
    family: "Socialist",
    era: "19th-century Proudhonian and related traditions",
    ownership_model: "Possessory use-rights and mutual credit; anti-capitalist rent/interest critique",
    role_of_markets: "Markets of independent producers without capitalist profit on capital",
    role_of_government: "Minimal or federative; anti-authoritarian",
    private_property: "Possession of use; hostility to absentee capitalist property",
    labor_treatment: "Independent producers and mutual associations",
    concentrated_power_approach: "Mutual credit and anti-monopoly norms",
    accountability_source: "Contracts among free producers and mutual banks",
    strengths: ["Anti-authoritarian socialism", "Producer independence ethic"],
    risks: ["Credit system fragility", "Scale limits", "Ambiguity vs markets"],
    relationship_to_cc: "Shares anti-domination instincts but rejects CC's acceptance of productive private capital within constitutional limits",
    historical_exemplars: ["P.J. Proudhon's writings", "Mutual credit experiments"],
    neighbor_systems: ["CC-SYS-ANARCHO-CAPITALISM", "CC-SYS-COOPERATIVE-ECONOMICS", "CC-SYS-SYNDICALISM", "CC-SYS-DISTRIBUTISM"],
    definition:
      "Mutualism is an anti-authoritarian socialist tradition favoring markets among independent producers, mutual credit, and possessory property—while opposing capitalist rent, interest, and wage domination.",
    how_it_functions:
      "Producers exchange; mutual banks aim to supply cheap credit; absentee ownership of means of production is illegitimate.",
    why_emerges:
      "Artisan republicanism confronting industrial capitalism and state socialism simultaneously.",
    claimed_benefits:
      "Adherents claim liberty, equality of producers, and escape from both state and capitalist bosses.",
    weaknesses:
      "Hard to scale against concentrated industry; mutual credit schemes historically fragile; property distinctions contested.",
    historical_notes:
      "Often grouped under anarchism. Distinct from anarcho-capitalism despite market forms.",
    neighbors_prose:
      "Market forms without capitalist property ethics; nearer cooperatives/distributism culturally than Rothbardian anarcho-capitalism.",
    sources: [
      "Pierre-Joseph Proudhon, What Is Property?; The Philosophy of Poverty",
      "Kevin Carson, Studies in Mutualist Political Economy (contemporary reconstruction)",
      "George Woodcock, Anarchism (historical context)",
    ],
  },
  {
    id: "CC-SYS-STATE-CAPITALISM",
    slug: "state-capitalism",
    name: "State capitalism",
    family: "Socialist",
    era: "20th–21st century comparative label",
    ownership_model: "State owns or controls key enterprises while using market or quasi-market tools",
    role_of_markets: "Markets may operate under state direction",
    role_of_government: "State is owner, regulator, and strategist",
    private_property: "Limited or subordinate in commanding heights",
    labor_treatment: "Labor often state-directed or weakly independent",
    concentrated_power_approach: "State concentration of economic power",
    accountability_source: "State authority and performance legitimacy",
    strengths: ["Mobilization", "Strategic investment capacity"],
    risks: ["Political coercion", "Weak independent accountability", "Soft budgets"],
    relationship_to_cc: "Contrary to CC independent property and constitutional limits on state economic domination",
    historical_exemplars: ["Debates over USSR as state capitalism", "Contemporary SOE-heavy marketizers"],
    neighbor_systems: ["CC-SYS-COMMAND-ECONOMIES", "CC-SYS-DEVELOPMENTAL-STATE", "CC-SYS-AUTHORITARIAN-MARKET-ECONOMY", "CC-SYS-MIXED-ECONOMY"],
    definition:
      "State capitalism describes systems where the state acts as dominant capitalist—owning or steering enterprises for accumulation and power—whether or not markets exist at the edges.",
    how_it_functions:
      "State-owned enterprises, party-linked conglomerates, and strategic control of finance coexist with product markets to varying degrees.",
    why_emerges:
      "Revolutionary nationalization without full planning purity; developmental catch-up; authoritarian modernization.",
    claimed_benefits:
      "Defenders claim national autonomy, long-horizon investment, and escape from foreign capital dependence.",
    weaknesses:
      "Unaccountable managerial-political elites; repression risks; inefficiency without hard budgets.",
    historical_notes:
      "Label is contested (Trotskyist and other debates). Use comparatively, not as a slur substitute for analysis.",
    neighbors_prose:
      "Overlaps command economies and authoritarian market economies; heavier state ownership than developmental-state private-firm steering.",
    sources: [
      "Tony Cliff, State Capitalism in Russia (interpretive tradition)",
      "Ian Bremmer, The End of the Free Market (contemporary state capitalism framing)",
      "OECD and World Bank SOE governance literature (institutional descriptions)",
    ],
  },

  // ——— Diagnostic ———
  {
    id: "CC-SYS-CRONY-CAPITALISM",
    slug: "crony-capitalism",
    name: "Crony capitalism",
    family: "Diagnostic",
    era: "Recurrent pathology across market eras",
    ownership_model: "Nominally private ownership with privileged political access",
    role_of_markets: "Markets distorted by favors, barriers, and selective enforcement",
    role_of_government: "Distributes privileges, bailouts, and protection to connected firms",
    private_property: "Formal but selectively applied",
    labor_treatment: "Labor subject to privileged firms' market power",
    concentrated_power_approach: "Protects favored incumbents",
    accountability_source: "Patronage networks",
    strengths: ["Can mobilize aligned investment quickly", "Predictability for insiders"],
    risks: ["Corruption", "Weak competition", "Public cynicism"],
    relationship_to_cc: "Directly contrary to CC",
    historical_exemplars: ["Privilege-ridden developmental episodes", "Regulatory capture case literatures"],
    neighbor_systems: ["CC-SYS-MERCANTILISM", "CC-SYS-OLIGARCHY", "CC-SYS-KLEPTOCRACY", "CC-SYS-DEVELOPMENTAL-STATE"],
    definition:
      "Crony capitalism is a diagnostic pattern in which private enterprise depends on political favor—licenses, tariffs, credit, enforcement forbearance—rather than open competition.",
    how_it_functions:
      "Connected firms win contracts and barriers; outsiders face predatory regulation. Formal markets exist; the allocation of opportunity is political.",
    why_emerges:
      "High stakes regulation, weak rule of law, campaign finance pressures, and mutual advantage between politicians and incumbents.",
    claimed_benefits:
      "Beneficiaries and some developmental apologias claim stability, national champions, and reduced 'wasteful' competition. These are claims of insiders, not endorsements.",
    weaknesses:
      "Efficiency losses, innovation drag, inequality of political voice, and legitimacy collapse. CC treats this as a core failure mode of unreformed capitalism.",
    historical_notes:
      "Appears inside many nominal system types. Diagnostic category, not a proud school.",
    neighbors_prose:
      "Overlaps mercantilist privilege and oligarchy; kleptocracy when theft is overt; developmental states try (and sometimes fail) to discipline cronies.",
    sources: [
      "Anne O. Krueger on rent-seeking",
      "George J. Stigler, 'The Theory of Economic Regulation'",
      "Transparency International and similar corruption perception methodologies (use cautiously; no invented scores here)",
    ],
  },
  {
    id: "CC-SYS-OLIGARCHY",
    slug: "oligarchy",
    name: "Oligarchy",
    family: "Diagnostic",
    era: "Ancient concept; modern comparative use",
    ownership_model: "Ownership and control concentrated among a small elite",
    role_of_markets: "Markets subordinate to elite coordination when they conflict with elite interests",
    role_of_government: "Government captured or directed by the few",
    private_property: "Selective—strong for elites",
    labor_treatment: "Labor dependent on elite institutions",
    concentrated_power_approach: "Concentration entrenched as governing principle",
    accountability_source: "Elite cohesion and coercion",
    strengths: ["Fast elite coordination", "Policy stability for insiders"],
    risks: ["Domination", "Weak accountability", "Exit of talent and capital over time"],
    relationship_to_cc: "Contrary to CC anti-concentration and equal citizenship",
    historical_exemplars: ["Classical Greek oligarchic constitutions (concept)", "Modern 'oligarch' literatures in post-Soviet and other contexts"],
    neighbor_systems: ["CC-SYS-PLUTOCRACY", "CC-SYS-CRONY-CAPITALISM", "CC-SYS-CLASSICAL-REPUBLICAN-MIXED-ECONOMY", "CC-SYS-KLEPTOCRACY"],
    definition:
      "Oligarchy is rule by a few—economically and politically—such that the many lack effective power to contest elite decisions.",
    how_it_functions:
      "Interlocking ownership, informal councils, security ties, and captured agencies maintain elite bargains. Elections, if present, are managed or outweighed.",
    why_emerges:
      "Asset concentration, weak countervailing institutions, revolutionary privatizations without accountability, or long erosion of civic equality.",
    claimed_benefits:
      "Elites claim competence, order, and protection from 'chaotic' mass politics. Classical critics treated such claims as self-serving.",
    weaknesses:
      "Systemic domination, brittle legitimacy, underinvestment in broad human capital, and vulnerability to faction among elites.",
    historical_notes:
      "Aristotle's typology remains conceptually useful. Modern measurement is contested; no invented oligarchy indices asserted here.",
    neighbors_prose:
      "Plutocracy emphasizes wealth specifically; oligarchy can be military or party-based as well. Republican thought defines itself against oligarchy.",
    sources: [
      "Aristotle, Politics (oligarchy vs polity)",
      "Jeffrey A. Winters, Oligarchy",
      "Classical republican critiques of the few (Pocock tradition)",
    ],
  },
  {
    id: "CC-SYS-PLUTOCRACY",
    slug: "plutocracy",
    name: "Plutocracy",
    family: "Diagnostic",
    era: "Modern democratic-capitalist pathology label",
    ownership_model: "Wealth holders dominate ownership and politics",
    role_of_markets: "Markets reinforce wealth-to-power translation",
    role_of_government: "Disproportionately responsive to wealth",
    private_property: "Strong for elites",
    labor_treatment: "Labor voice diminished relative to capital",
    concentrated_power_approach: "Money translates into political control",
    accountability_source: "Campaign finance, lobbying, and elite media influence (mechanisms vary)",
    strengths: ["Investment capacity", "Policy attention to capital formation"],
    risks: ["Political inequality", "Capture", "Erosion of equal citizenship"],
    relationship_to_cc: "Contrary to CC separation of economic power from civic domination",
    historical_exemplars: ["Progressive Era critiques", "Contemporary money-in-politics research programs"],
    neighbor_systems: ["CC-SYS-OLIGARCHY", "CC-SYS-CRONY-CAPITALISM", "CC-SYS-SHAREHOLDER-PRIMACY-CAPITALISM", "CC-SYS-CONSTITUTIONAL-CAPITALISM"],
    definition:
      "Plutocracy names political systems—or tendencies within democracies—where wealth confers decisive political power beyond formal one-person-one-vote equality.",
    how_it_functions:
      "Campaign spending, lobbying, revolving doors, and agenda control skew policy. Markets may be competitive yet politics unequal.",
    why_emerges:
      "Costly campaigns, organizational advantages of concentrated wealth, and weak countervailing civic institutions.",
    claimed_benefits:
      "Beneficiaries claim that wealth signals success and that capital needs political protection to invest. Democratic theorists treat this as a corruption of equality.",
    weaknesses:
      "Unequal responsiveness, policy bias, and legitimacy crises. Empirical magnitudes of influence are researched case-by-case—not invented here.",
    historical_notes:
      "Diagnostic tendency measurable in degrees; rarely a self-ascribed constitution.",
    neighbors_prose:
      "Subset or cousin of oligarchy focused on money; enabled by unreformed shareholder-financial power; opposed by CC's anti-domination aim.",
    sources: [
      "Larry M. Bartels, Unequal Democracy",
      "Martin Gilens, Affluence and Influence",
      "Progressive Era anti-plutocracy literature (e.g., critiques of 'money power')",
    ],
  },
  {
    id: "CC-SYS-KLEPTOCRACY",
    slug: "kleptocracy",
    name: "Kleptocracy",
    family: "Diagnostic",
    era: "Modern comparative politics / illicit finance",
    ownership_model: "Public office used to seize and launder private fortunes",
    role_of_markets: "Markets become channels for looting and offshore concealment",
    role_of_government: "Government is the extraction machine",
    private_property: "Insecure for subjects; hyper-secure for protected looters",
    labor_treatment: "Labor and citizens as fiscal prey",
    concentrated_power_approach: "Theft centralized in ruling networks",
    accountability_source: "Fear, patronage, and opacity",
    strengths: ["Enrichment of rulers", "Short-term loyalty buying"],
    risks: ["State failure risk", "Capital flight", "Violence", "Development collapse"],
    relationship_to_cc: "Maximally contrary to constitutional accountable government and lawful property",
    historical_exemplars: ["Comparative kleptocracy case studies", "Illicit financial flows literatures"],
    neighbor_systems: ["CC-SYS-CRONY-CAPITALISM", "CC-SYS-OLIGARCHY", "CC-SYS-AUTHORITARIAN-MARKET-ECONOMY"],
    definition:
      "Kleptocracy is rule by thieves: public authority systematically converts state power into private stolen wealth.",
    how_it_functions:
      "Procurement fraud, resource concession theft, expropriation, and offshore laundering. Formal laws exist as camouflage.",
    why_emerges:
      "Resource rents, weak oversight, external enablers in global finance, and security forces paid from loot.",
    claimed_benefits:
      "Rulers rationalize predation as stability or sovereignty. There is no serious normative school defending kleptocracy as justice.",
    weaknesses:
      "Destroys public goods, property security, and growth. Moral and developmental failure mode.",
    historical_notes:
      "Diagnostic extreme. Distinguish from ordinary corruption by systemic centrality of theft.",
    neighbors_prose:
      "Worse than routine cronyism; often nested inside authoritarian market or oligarchic orders.",
    sources: [
      "Sarah Chayes, Thieves of State",
      "Global Witness investigative reports (case-based)",
      "World Bank governance and anti-corruption research programs (methodological caution)",
    ],
  },

  // ——— Political-economic ———
  {
    id: "CC-SYS-FASCIST-POLITICAL-ECONOMY",
    slug: "fascist-political-economy",
    name: "Fascist political economy / fascist corporatism",
    family: "Political-economic",
    era: "Interwar Europe; cautionary comparative type",
    ownership_model: "Private property retained under state-dictated corporatist coordination",
    role_of_markets: "Markets subordinated to autarky, militarization, and party goals",
    role_of_government: "Dictatorial party-state directs syndicates and firms",
    private_property: "Formally private; politically conditional",
    labor_treatment: "Independent unions crushed; compulsory syndicates",
    concentrated_power_approach: "State-party concentration; cartels under political command",
    accountability_source: "Leader and party; terror against opponents",
    strengths: ["Rapid militarized mobilization (historical)", "Suppression of left labor conflict (from regime view)"],
    risks: ["Totalitarian violence", "War", "Destruction of pluralism", "Economic irrationality under politics"],
    relationship_to_cc: "Absolutely contrary to CC's constitutional liberty and anti-domination",
    historical_exemplars: ["Italian Fascist corporatist institutions", "Nazi economic controls (related but not identical)"],
    neighbor_systems: ["CC-SYS-CORPORATISM", "CC-SYS-AUTHORITARIAN-MARKET-ECONOMY", "CC-SYS-COMMAND-ECONOMIES"],
    definition:
      "Fascist political economy preserves private ownership while destroying liberal democracy and independent labor, coordinating economy through party-state corporatism toward nationalist and often militarist ends.",
    how_it_functions:
      "Compulsory corporations replace free associations; planning and cartels serve regime goals; violence enforces compliance.",
    why_emerges:
      "Postwar crises, fear of socialism, nationalist mobilization, and elite bargains with paramilitary movements.",
    claimed_benefits:
      "Regimes claimed national rebirth, order, and transcendence of class conflict. These claims accompanied mass crimes and are not rehabilitated here.",
    weaknesses:
      "Terror, aggressive war, and suppression of truth. Economically, politics overrides feedback; human destruction is the decisive condemnation.",
    historical_notes:
      "Never normalize. Distinguish carefully from democratic neocorporatism.",
    neighbors_prose:
      "Authoritarian opposite of democratic corporatism; shares administered features with command systems while keeping private titles.",
    sources: [
      "Gaetano Salvemini, Under the Axe of Fascism",
      "Franz Neumann, Behemoth",
      "Aristotle Kallis and modern fascist studies (comparative)",
    ],
  },
  {
    id: "CC-SYS-AUTHORITARIAN-MARKET-ECONOMY",
    slug: "authoritarian-market-economy",
    name: "Authoritarian market economy / illiberal capitalism",
    family: "Political-economic",
    era: "Late 20th–21st century comparative type",
    ownership_model: "Private and state ownership under authoritarian political monopoly",
    role_of_markets: "Product and labor markets operate; politics closed",
    role_of_government: "Authoritarian center sets red lines; selectively intervenes in firms",
    private_property: "Real but politically contingent",
    labor_treatment: "Markets with restricted independent organizing",
    concentrated_power_approach: "Political concentration primary; economic concentration tolerated or managed",
    accountability_source: "Performance and coercion more than open contestation",
    strengths: ["Policy continuity", "Rapid projects without electoral vetoes (regime claim)"],
    risks: ["Rights abuses", "Succession crises", "Crony/kleptocratic drift", "Information distortion"],
    relationship_to_cc: "Rejects CC's democratic constitutional accountability even if markets exist",
    historical_exemplars: ["Comparative 'authoritarian capitalism' case literatures", "Illiberal market reformers"],
    neighbor_systems: ["CC-SYS-DEVELOPMENTAL-STATE", "CC-SYS-STATE-CAPITALISM", "CC-SYS-CRONY-CAPITALISM", "CC-SYS-FASCIST-POLITICAL-ECONOMY"],
    definition:
      "Authoritarian market economy / illiberal capitalism describes regimes that use markets and private business while denying open political competition and robust civil liberties.",
    how_it_functions:
      "Firms compete and trade; security services and party structures police politics; property rights hold until they threaten regime survival.",
    why_emerges:
      "Growth coalitions that fear democratic redistribution or pluralism; post-socialist or postcolonial authoritarian modernization.",
    claimed_benefits:
      "Regimes claim order, growth, and resistance to 'chaos.' Beneficiaries value predictability for connected capital.",
    weaknesses:
      "Rights violations, corrupted feedback, capital misallocation toward loyalty, and brittle legitimacy.",
    historical_notes:
      "Not identical to fascism; overlaps developmental and state-capitalist forms. Case-based analysis required.",
    neighbors_prose:
      "Markets without liberal democracy—unlike CC and ordoliberal democratic constitutionalism; can host cronyism and kleptocracy.",
    sources: [
      "Barrington Moore Jr., Social Origins of Dictatorship and Democracy (long comparative arc)",
      "Bruce Bueno de Mesquita et al., The Logic of Political Survival",
      "Contemporary comparative politics literature on authoritarian capitalism",
    ],
  },
];

function matrixRow(s) {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    family: s.family,
    era: s.era,
    ownership_model: s.ownership_model,
    role_of_markets: s.role_of_markets,
    role_of_government: s.role_of_government,
    private_property: s.private_property,
    labor_treatment: s.labor_treatment,
    concentrated_power_approach: s.concentrated_power_approach,
    accountability_source: s.accountability_source,
    strengths: s.strengths,
    risks: s.risks,
    relationship_to_cc: s.relationship_to_cc,
    historical_exemplars: s.historical_exemplars,
    neighbor_systems: s.neighbor_systems,
    dossier_path: `content/public-resources/systems/${s.slug}.md`,
    status: STATUS,
  };
}

function dossierMd(s, byId) {
  const neighbors = s.neighbor_systems
    .map((id) => {
      const n = byId.get(id);
      return n ? `- [${n.name}](/compare/${n.slug}/) (\`${id}\`)` : `- \`${id}\``;
    })
    .join("\n");

  return `# ${s.name}

> **Developing analytical tool — not settled scholarship and not an endorsement.**
> Descriptive fairness standard: an informed adherent or serious analyst should recognize this account as fair, while clearly distinguishing analysis from advocacy.
> No invented statistics. Empirical magnitudes not established on this page are left unclaimed.

**ID:** \`${s.id}\`  
**Family:** ${s.family}  
**Era / setting:** ${s.era}  
**Matrix:** [/compare/](/compare/)

## 1. Status / fairness disclaimer

This dossier is a Phase 1 comparative instrument for Constitutional Capitalism. Categories overlap; real societies are usually hybrids. Pejorative or diagnostic labels (where used) describe patterns of power, not identities people must proudly claim.

## 2. Definition

${s.definition}

**Plain version:** ${s.name} is analyzed here as a political-economic pattern with distinctive ownership, market, and authority arrangements—not as a single timeless nation.

## 3. How it functions

${s.how_it_functions}

| Dimension | Summary |
|---|---|
| Ownership | ${s.ownership_model} |
| Property regime | ${s.private_property} |
| Markets | ${s.role_of_markets} |
| Government / polity | ${s.role_of_government} |
| Labor / work | ${s.labor_treatment} |
| Power & concentration | ${s.concentrated_power_approach} |
| Accountability | ${s.accountability_source} |

## 4. Why it emerges / what sustains it

${s.why_emerges}

## 5. What informed adherents or beneficiaries claim

${s.claimed_benefits}

These are **reported claims**, not project endorsements.

**Strengths often cited:** ${s.strengths.join("; ")}.

## 6. Major weaknesses and failure modes

${s.weaknesses}

**Risks tagged in the matrix:** ${s.risks.join("; ")}.

## 7. Historical conditions and exemplars

${s.historical_notes}

**Exemplars / references (non-statistical):** ${s.historical_exemplars.join("; ")}.

## 8. Comparison along shared dimensions

Use the table in section 3 as the shared scorecard against other systems on [/compare/](/compare/). Prefer qualitative institutional comparison over invented performance numbers.

## 9. Neighbors and near-misses

${s.neighbors_prose}

${neighbors}

## 10. Relationship to Constitutional Capitalism

${s.relationship_to_cc}

Constitutional Capitalism remains a developing framework. Boundary statements here follow project governance documents and do not silently add doctrine.

## 11. Sources / further reading

${s.sources.map((x) => `- ${x}`).join("\n")}

---

*Return to the [Economic system comparison](/compare/).*
`;
}

function overviewMd(rows) {
  const byFamily = new Map();
  for (const s of rows) {
    if (!byFamily.has(s.family)) byFamily.set(s.family, []);
    byFamily.get(s.family).push(s);
  }
  const familyOrder = [
    "Historical",
    "Market-capitalist",
    "Coordinated-market",
    "Socialist",
    "Diagnostic",
    "Political-economic",
  ];
  let body = `# Economic System Comparison

> **Developing analytical tool — not settled scholarship.** This comparison is a working aid, not a definitive account of any tradition. Real-world systems are usually hybrids. Descriptions aim for fairness to informed adherents without endorsing every system. **No invented statistics.**

Constitutional Capitalism is a developing framework, not a settled ideology. It protects private property and enterprise while asking how constitutional law can prevent both public and private domination.

**Live matrix:** [/compare/](/compare/)  
**Systems in matrix:** ${rows.length}

`;
  for (const fam of familyOrder) {
    const list = byFamily.get(fam) || [];
    if (!list.length) continue;
    body += `## ${fam}\n\n`;
    for (const s of list) {
      body += `### [${s.name}](/compare/${s.slug}/)\n`;
      body += `**Ownership:** ${s.ownership_model}\n\n`;
      body += `**Markets:** ${s.role_of_markets}\n\n`;
      body += `**Government:** ${s.role_of_government}\n\n`;
      body += `**Property regime:** ${s.private_property}\n\n`;
      body += `**Labor:** ${s.labor_treatment}\n\n`;
      body += `**Concentrated power:** ${s.concentrated_power_approach}\n\n`;
      body += `**Accountability:** ${s.accountability_source}\n\n`;
      body += `**Historical exemplars:** ${s.historical_exemplars.join("; ")}\n\n`;
      body += `**Relationship to Constitutional Capitalism:** ${s.relationship_to_cc}\n\n`;
      body += `**Strengths:** ${s.strengths.join("; ")}. **Risks:** ${s.risks.join("; ")}.\n\n`;
      body += `Full dossier: \`content/public-resources/systems/${s.slug}.md\`\n\n`;
    }
  }
  return body;
}

const byId = new Map(systems.map((s) => [s.id, s]));
for (const s of systems) {
  for (const n of s.neighbor_systems) {
    if (!byId.has(n)) {
      console.warn("[WARN] missing neighbor", s.id, "->", n);
    }
  }
}

const rows = systems.map(matrixRow);
const jsonPath = r("data/project/economic_system_comparison.json");
fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2) + "\n");
console.log("[OK] wrote", rows.length, "systems ->", jsonPath);

const dir = r("content/public-resources/systems");
fs.mkdirSync(dir, { recursive: true });
for (const s of systems) {
  const p = path.join(dir, `${s.slug}.md`);
  fs.writeFileSync(p, dossierMd(s, byId));
}
console.log("[OK] wrote", systems.length, "dossiers ->", dir);

const overviewPath = r("content/public-resources/economic-system-comparison.md");
fs.writeFileSync(overviewPath, overviewMd(rows));
console.log("[OK] wrote overview", overviewPath);
