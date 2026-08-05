import fs from 'node:fs';
import { r } from './lib/paths.mjs';

const read = (rel) => JSON.parse(fs.readFileSync(r(rel), 'utf8'));
const write = (rel, data) => fs.writeFileSync(r(rel), JSON.stringify(data, null, 2) + '\n');

const principles = read('data/project/principles.json');
const existingPrin = new Set(principles.map((p) => p.id));
const newPrinciples = [
  {
    id: 'CC-PRIN-21',
    title: 'Distributed constitutional power',
    statement:
      'Power should be distributed as close as possible to the people who create and sustain society.',
    text: 'Power should be distributed as close as possible to the people who create and sustain society.',
    explanation:
      'Constitutional Capitalism organizes around where power should reside in a republic, not around expanding government, corporate, or factional control as ends in themselves.',
    protects: ['self-government', 'local agency', 'broad ownership'],
    prohibits: ['unnecessary centralization', 'unaccountable concentration'],
    implications: [
      'apply subsidiarity intuition to ownership and economic benefit',
      'justify upward power transfers',
    ],
    related_declaration_sections: ['II. First Principles', 'VI. Constitutional Order'],
    related_chapters: ['CC-CH-006', 'CC-CH-025', 'CC-CH-034'],
    related_policy_pillars: ['CC-PILLAR-01', 'CC-PILLAR-06'],
    open_questions: ['Which functions demonstrably require national scale?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-22',
    title: 'Subsidiarity extended to ownership',
    statement:
      'Authority, ownership, and economic benefit should remain as close as reasonably possible to the people and communities that create the value, unless a broader level of organization is demonstrably necessary.',
    text: 'Authority, ownership, and economic benefit should remain as close as reasonably possible to the people and communities that create the value, unless a broader level of organization is demonstrably necessary.',
    explanation:
      'The philosophy shares the classical intuition of subsidiarity and extends it into economics, ownership, and constitutional accountability rather than claiming a brand-new discovery.',
    protects: ['community capacity', 'local ownership', 'proportional institutions'],
    prohibits: ['default centralization', 'extraction without local benefit'],
    implications: ['map the power hierarchy before proposing national fixes'],
    related_declaration_sections: ['II. First Principles', 'V. Communities'],
    related_chapters: ['CC-CH-034', 'CC-CH-076'],
    related_policy_pillars: ['CC-PILLAR-02', 'CC-PILLAR-06'],
    open_questions: ['How is necessity at a higher level demonstrated?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-23',
    title: 'People as source of national capacity',
    statement:
      "The people are the nation's greatest source of productive capacity, creativity, innovation, and self-government.",
    text: "The people are the nation's greatest source of productive capacity, creativity, innovation, and self-government.",
    explanation:
      'Investing in health, education, security, and opportunity can be productive investment. People remain citizens with dignity — never merely inputs or resources to be used.',
    protects: ['human dignity', 'human capital', 'self-government'],
    prohibits: ['reducing people to inputs', 'treating citizens as expendable'],
    implications: ['evaluate systems by human flourishing and capacity'],
    related_declaration_sections: ['I. Purpose', 'II. First Principles'],
    related_chapters: ['CC-CH-005', 'CC-CH-006'],
    related_policy_pillars: ['CC-PILLAR-01', 'CC-PILLAR-05'],
    open_questions: ['Which human-capacity investments show strongest evidence?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-24',
    title: 'Stewardship across generations',
    statement:
      'Each generation must improve and pass on the constitutional, economic, and social inheritance it receives.',
    text: 'Each generation must improve and pass on the constitutional, economic, and social inheritance it receives.',
    explanation:
      'Stewardship gives the philosophy a long horizon: land, institutions, infrastructure, knowledge, public trust, and constitutional government are held in trust for those who follow.',
    protects: ['future generations', 'public trust', 'institutional continuity'],
    prohibits: ['short-term extraction of inheritance', 'untouchable dogma that blocks improvement'],
    implications: ['evaluate policies by multi-generational effects'],
    related_declaration_sections: ['I. Purpose', 'VII. Future Generations'],
    related_chapters: ['CC-CH-037', 'CC-CH-038'],
    related_policy_pillars: ['CC-PILLAR-01'],
    open_questions: ['How should stewardship metrics enter the National Baseline?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-25',
    title: 'Duty of constructive improvement',
    statement:
      'No generation inherits a perfect system; every generation has a duty to improve it for the next through evidence, reason, and constitutional process.',
    text: 'No generation inherits a perfect system; every generation has a duty to improve it for the next through evidence, reason, and constitutional process.',
    explanation:
      'Improving the philosophy and the system for all is among the highest forms of civic service. Blind loyalty and mere destruction both fail this duty.',
    protects: ['amendment culture', 'evidence-based reform', 'civic agency'],
    prohibits: ['dogmatic freeze', 'reform without respect for rights'],
    implications: ['make Living Amendments a first-class project surface'],
    related_declaration_sections: ['VI. Constitutional Order'],
    related_chapters: ['CC-CH-038', 'CC-CH-081'],
    related_policy_pillars: ['CC-PILLAR-01'],
    open_questions: ['What process governs philosophical amendments?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-26',
    title: 'Community economic sovereignty',
    statement:
      'Communities should retain enough productive and institutional capacity to remain resilient and prosperous without permanent dependence on distant centers.',
    text: 'Communities should retain enough productive and institutional capacity to remain resilient and prosperous without permanent dependence on distant centers.',
    explanation:
      'This is economic sovereignty, not a claim of political secession. It asks whether communities can feed, educate, care, finance, house, and train locally — and why not if they cannot.',
    protects: ['local resilience', 'regional opportunity', 'belonging'],
    prohibits: ['extractive centralization that hollows communities'],
    implications: ['measure community capabilities in the National Baseline'],
    related_declaration_sections: ['V. Communities'],
    related_chapters: ['CC-CH-034', 'CC-CH-076'],
    related_policy_pillars: ['CC-PILLAR-06'],
    open_questions: ['Which resilience capacities are minimum viable?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-27',
    title: 'Corporations as constitutional partners',
    statement:
      'Corporations that benefit from a community share responsibility for sustaining the conditions that allow that community to flourish.',
    text: 'Corporations that benefit from a community share responsibility for sustaining the conditions that allow that community to flourish.',
    explanation:
      "A corporation's primary function is efficient, sustainable production of goods and services. Broader social goods are shared responsibilities. Corporations are partners — not governments and not rulers.",
    protects: ['reciprocal prosperity', 'community conditions', 'lawful enterprise'],
    prohibits: ['corporate government substitution', 'corporate rule without accountability'],
    implications: [
      'frame corporate duties as partnership, not total social welfare assignment',
    ],
    related_declaration_sections: ['IV. Institutions'],
    related_chapters: ['CC-CH-030'],
    related_policy_pillars: ['CC-PILLAR-04'],
    open_questions: ['Which reciprocal duties are enforceable vs cultural?'],
    maturity_percent: 15,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
  {
    id: 'CC-PRIN-28',
    title: 'Essential infrastructure accessibility',
    statement:
      'Essential infrastructure that enables participation in modern economic life should be broadly accessible.',
    text: 'Essential infrastructure that enables participation in modern economic life should be broadly accessible.',
    explanation:
      'Transportation, broadband, and similar arteries may become so fundamental that exclusion blocks opportunity. Institutional form — public, private, cooperative, or hybrid — remains a design question under the principle.',
    protects: ['equal opportunity to participate', 'regional connection'],
    prohibits: ['treating essential access as optional luxury without analysis'],
    implications: ['separate principle from ownership model debates'],
    related_declaration_sections: ['V. Communities', 'VI. Constitutional Order'],
    related_chapters: ['CC-CH-034', 'CC-CH-076'],
    related_policy_pillars: ['CC-PILLAR-03', 'CC-PILLAR-06'],
    open_questions: ['Which infrastructures meet the essentiality threshold where?'],
    maturity_percent: 10,
    approval_status: 'draft',
    last_updated: '2026-08-04',
    status: 'draft',
  },
];

for (const p of newPrinciples) {
  if (!existingPrin.has(p.id)) principles.push(p);
}
write('data/project/principles.json', principles);
console.log('[OK] principles', principles.length);

const terms = read('data/project/terms_to_define.json');
const existingTerms = new Set(terms.map((t) => t.id));
const newTerms = [
  [
    'CC-TERM-026',
    'Subsidiarity',
    'The idea that decisions should be made at the lowest competent level; Constitutional Capitalism shares this intuition and extends it into ownership and economic accountability.',
  ],
  [
    'CC-TERM-027',
    'Community economic sovereignty',
    "A community's capacity to sustain essential productive and institutional functions locally without permanent dependence on distant centers — not political secession.",
  ],
  [
    'CC-TERM-028',
    'Stewardship',
    'The duty to improve and pass on land, institutions, infrastructure, knowledge, and public trust to the next generation.',
  ],
  [
    'CC-TERM-029',
    'Constructive improvement',
    "Civic virtue of amending systems through evidence, reason, constitutional process, and respect for others' rights.",
  ],
  [
    'CC-TERM-030',
    'Constitutional partner (corporation)',
    'A corporation understood as a reciprocal participant in national prosperity — neither enemy nor ruler nor substitute government.',
  ],
  [
    'CC-TERM-031',
    'Essential infrastructure',
    'Infrastructure so fundamental to modern economic participation that lack of access can block equal opportunity; institutional form remains open.',
  ],
  [
    'CC-TERM-032',
    'Arteries (civilizational)',
    'Connecting systems — transportation, broadband, energy, finance, and related networks — that keep communities linked without draining all opportunity to one destination.',
  ],
];
for (const [id, term, def] of newTerms) {
  if (!existingTerms.has(id)) {
    terms.push({
      id,
      term,
      working_definition: def,
      status: 'working_definition',
      notes:
        'Civilizational-core working definition; not a final sourced scholarly or legal definition.',
      last_updated: '2026-08-04',
    });
  }
}
write('data/project/terms_to_define.json', terms);
console.log('[OK] terms', terms.length);

const arts = read('data/project/constitutional_articles.json');
const summaryMap = {
  'CC-ART-04':
    'Corporations as constitutional partners: primary function is productive enterprise; shared responsibility for community conditions that enable flourishing — not corporate government.',
  'CC-ART-08':
    'Community economic sovereignty and resilience: capacity to feed, educate, care, finance, house, and train locally; regional opportunity and belonging without anti-city hostility.',
  'CC-ART-11':
    'Stewardship and future generations: improve and pass on constitutional, economic, and social inheritance.',
  'CC-ART-12':
    'Duty of constructive improvement and living amendment: the philosophy is never finished; improvement is a civic duty.',
};
for (const a of arts.articles) {
  if (summaryMap[a.article_id]) a.summary = summaryMap[a.article_id];
}
arts.last_updated = '2026-08-04';
write('data/project/constitutional_articles.json', arts);
console.log('[OK] articles updated');

const dec = read('data/decisions/decisions.json');
const existingDec = new Set(dec.decisions.map((d) => d.decision_id));
const addDec = [
  {
    decision_id: 'CC-DEC-034',
    title: 'sacred sentence on power flow',
    question:
      'Should the never-changing sacred sentence be: "Power should always flow toward the people, never permanently away from them."?',
    status: 'open',
    rationale: 'Gives every institution a single constitutional test question.',
    impact: ['philosophy', 'Constitutional Capitalism Test', 'public framing'],
    recommendation:
      'Adopt as working sacred sentence; keep distinct from canonical definition until formal amendment.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-035',
    title: 'website as primary living medium',
    question:
      'Should the Constitutional Capitalism Project treat the living website as the primary medium and the book as an Introduction, rather than containing the philosophy only in a static book?',
    status: 'open',
    rationale: 'Enables branching domains, life-path views, research, pilots, and amendments.',
    impact: ['apps/book-site', 'three-book architecture', 'IA'],
    recommendation: 'Adopt living-project architecture; keep title/subtitle stable.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-036',
    title: 'subsidiarity acknowledgement and extension',
    question:
      'Should the philosophy explicitly acknowledge subsidiarity as a shared intuition and adopt the working statement extending it to authority, ownership, and economic benefit?',
    status: 'open',
    rationale: 'Avoids false novelty claims while clarifying economic extension.',
    impact: ['principles', 'declaration companions', 'terms'],
    recommendation: 'Adopt acknowledgement + working statement as draft principle.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-037',
    title: 'stewardship as fifth pillar',
    question:
      'Should Stewardship join Liberty, Ownership, Accountability, and Prosperity as a fifth core pillar?',
    status: 'open',
    rationale: 'Adds multi-generational horizon beyond current prosperity.',
    impact: ['pillars', 'Article XI', 'National Baseline'],
    recommendation: 'Adopt as proposed pillar.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-038',
    title: 'permanent ownership and tax-shift agenda',
    question:
      'Should permanent ownership security and shifting away from labor/property taxes that erode ownership become a formal design agenda (not yet locked policy)?',
    status: 'open',
    rationale:
      'Radical aspiration requiring honest local-funding and revenue redesign before prescription.',
    impact: ['policy pillars', 'Book Three', 'local government finance'],
    recommendation: 'Accept as open design agenda; forbid presenting as solved policy.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-039',
    title: 'people as source framing with dignity guardrail',
    question:
      "Should the first principle state that people are the nation's greatest source of productive capacity while forbidding \"mere resource\" language?",
    status: 'open',
    rationale: 'Keeps human investment productive without instrumentalizing persons.',
    impact: ['principles', 'voice guide', 'education/health framing'],
    recommendation: 'Adopt first-principle text + dignity guardrail.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-040',
    title: 'duty of constructive improvement',
    question:
      'Should a Constitutional Duty of Improvement — questioning and improving the system through evidence and constitutional process — become a core article/principle?',
    status: 'open',
    rationale: 'Makes Living Amendments and critique a civic virtue rather than disloyalty.',
    impact: ['Article XII', 'website Living Amendments', 'culture'],
    recommendation: 'Adopt as draft principle and deepen Article XII.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-041',
    title: 'community economic sovereignty article emphasis',
    question:
      'Should Community Economic Sovereignty become a pillar-level emphasis under Communities and Local Economies (Article VIII)?',
    status: 'open',
    rationale:
      'Captures resilience, food/energy/education/health capacity, and belonging without secession claims.',
    impact: ['CC-ART-08', 'National Baseline communities domain'],
    recommendation: 'Adopt emphasis; keep political sovereignty language out.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
  {
    decision_id: 'CC-DEC-042',
    title: 'essential infrastructure accessibility principle',
    question:
      'Should essential infrastructure accessibility (e.g., transportation and broadband as candidate arteries) be adopted as a principle while leaving public/private/hybrid models open?',
    status: 'open',
    rationale: 'Separates principle from ownership model; supports distributed prosperity.',
    impact: ['policy lab', 'regional communities', 'website domains'],
    recommendation: 'Adopt principle; require local model analysis before mandates.',
    approved_by: null,
    decided_at: null,
    supersedes: null,
  },
];
for (const d of addDec) {
  if (!existingDec.has(d.decision_id)) dec.decisions.push(d);
}
dec.last_updated = '2026-08-04';
write('data/decisions/decisions.json', dec);
console.log('[OK] decisions', dec.decisions.length);

const identity = read('data/project/book_identity.json');
identity.proposed_sacred_sentence =
  'Power should always flow toward the people, never permanently away from them.';
identity.proposed_organizing_principle =
  'Power should be distributed as close as possible to the people who create and sustain society.';
identity.proposed_primary_medium = 'living_website';
identity.proposed_book_role = 'Introduction to Constitutional Capitalism';
identity.project_status = 'civilizational_architecture_proposed';
identity.last_updated = '2026-08-04';
write('data/project/book_identity.json', identity);
console.log('[OK] book_identity companion fields (canonical definition unchanged)');

const books = read('data/project/three_book_architecture.json');
books.medium_note =
  'Books are content streams inside the living Constitutional Capitalism Project website (CC-DEC-035). Book One functions as the public Introduction.';
books.last_updated = '2026-08-04';
write('data/project/three_book_architecture.json', books);
console.log('[OK] three_book_architecture medium note');
