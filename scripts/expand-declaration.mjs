import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(ROOT, "content/declarations/DECLARATION_OF_CONSTITUTIONAL_CAPITALISM.md");
let md = fs.readFileSync(file, "utf8");

const expansion = `
## Additional Clarifications for Readers and Future Editors

### On wealth and justice

Constitutional Capitalism does not treat wealth as evidence of vice. A free society should hope for creators, builders, savers, and investors who succeed. The moral problem is not that some people become rich through productive contribution. The moral problem arises when rules, privileges, barriers, captured regulation, or collapsed competition convert success into unaccountable dominion over the lives of others. Distinguishing earned productive success from entrenched domination is one of the central intellectual tasks of this project. That distinction will require evidence in later phases. It begins here as a principle of judgment.

### On equality

This philosophy does not promise equality of outcome. People differ in talent, preference, luck, diligence, risk tolerance, and timing. A free economy will produce unequal results. What it must not produce, if it wishes to remain compatible with self-government, is a closed structure in which opportunity is formally announced and practically rationed by concentrated gatekeepers. Broad ownership, competition, and accountable institutions are instruments against closure, not instruments of engineered sameness.

### On the corporation as legal technology

The corporation is one of the most powerful legal technologies ever invented. It pools capital, limits liability, endures beyond founders, and enables projects no lone household could finance. Constitutional Capitalism does not seek to abolish that technology. It seeks to remember what it is: a public legal invention serving public and private purposes under rules. When corporate form becomes a shield for conduct that would be intolerable if undertaken by a named person with no privilege, the constitutional question reappears. Privilege and obligation travel together.

### On information power

In earlier centuries, domination often required land, armies, or factories. In the present century, domination may also operate through platforms that mediate speech, commerce, reputation, employment matching, and political attention. Constitutional Capitalism does not equate every large digital platform with a government. It does insist that institutions controlling essential channels of economic and civic participation cannot be analyzed solely as ordinary shops selling ordinary goods. Scale plus indispensability plus opacity creates a constitutional problem even when the legal form remains private.

### On the poor and the precarious

A philosophy of ownership that speaks only to those already near ownership is incomplete. Pathways into property, skill, savings, and enterprise must be real for people now living close to the edge. This does not require pretending that every person will become an entrepreneur. It requires that the baseline of work, housing, and portable security not be designed as a permanent trap. Later policy chapters will wrestle with instruments. The Declaration establishes the moral direction: independence is preferable to administered dependence wherever independence can be honestly built.

### On international commerce

Constitutional Capitalism is not a doctrine of sealed borders or economic solitude. Lawful international commerce can widen opportunity, diffuse knowledge, and discipline domestic incumbents. The question is whether trade and capital mobility operate under rules that preserve domestic capacity for self-government, fair competition, and community viability — or whether they become pathways for regulatory arbitrage, labor arbitrage without reciprocal obligation, and the permanent export of civic consequence. Universal principles can condemn predation without condemning exchange.

### On evidence and humility

Many readers will ask for proof. They should. Claims about wage-productivity divergence, monopoly harms, ownership effects, tax incidence, and democratic erosion are empirical questions as well as moral ones. This Declaration states principles and directions. It does not pretend that the empirical case is finished. Unsupported claims must remain labeled. Sources must be gathered. Models must be tested. Opponents must be answered at their strongest. A philosophy unwilling to survive disagreement does not deserve to govern a free people.

### On the relationship between this Declaration and future Articles

The Economic Articles sketched elsewhere in the project are not yet law and are not yet final doctrine. They are an emerging institutional architecture. This Declaration is prior to them. If an Article cannot be justified by the principles here — or contradicts them — the Article must change, not the other way around. Philosophy before program is the discipline that prevents Constitutional Capitalism from collapsing into a bag of disconnected proposals.

### On tone and public trust

This project will fail if it becomes a vehicle for contempt — contempt for workers, contempt for owners, contempt for the poor, contempt for the successful, or contempt for those who disagree. Free people persuade. They measure. They amend. They do not require unanimous enthusiasm before they require honest argument. The Declaration is written to be sharable across disagreement precisely because the stakes are shared: whether the next generation inherits a republic of owners and citizens, or a landscape of dependents managed by powers they did not choose and cannot effectively restrain.

### On the meaning of constitutional accountability

Constitutional accountability does not mean that every firm must await permission before innovating. It means that when institutions acquire power capable of shaping livelihoods, market access, information flows, or political influence at public scale, the rules governing that power must be knowable, contestable, and enforceable. Hidden privilege is not liberty. Arbitrary discretion — public or private — is not law.

### On savings, pensions, and ordinary capital

Millions of citizens encounter capitalism primarily through wages, housing, and retirement accounts. Any reform that casually destabilizes those forms of ownership betrays the people it claims to help. Constitutional Capitalism therefore treats the protection of lawful savings and retirement ownership as a transition constraint, not as an afterthought. Broadening ownership cannot begin by wrecking the ownership that already exists for ordinary families.

### On small enterprise

Small businesses are not miniature versions of concentrated platforms. They are often civic infrastructure: employers of neighbors, sponsors of local life, and repositories of practical knowledge. A philosophy obsessed only with the largest firms will misunderstand the economy. Rules aimed at public-scale power must be designed so they do not crush the shop, the clinic, the farm, the contractor, or the local manufacturer under compliance burdens meant for giants.

### On education and capability

Ownership without capability can become a slogan. A free people need education that forms not only employees, but owners, citizens, and stewards: financial literacy, civic literacy, practical skill, and the habits of responsibility. Constitutional Capitalism does not reduce education to job training, nor does it pretend schooling alone can substitute for fair markets and accountable institutions. It does insist that broad prosperity requires people prepared to understand contracts, investments, enterprises, and public choices.

### On measurement

What a nation measures, it tends to manage. If the only celebrated numbers are aggregate output and asset prices, then policy will drift toward those numbers even when independence and community vitality decline. Constitutional Capitalism therefore anticipates later work on better measures of national prosperity — not to abolish GDP, but to stop mistaking one instrument panel for the whole machine. Measurement reform belongs downstream of purpose. Purpose has been stated here.

### On disagreement inside the project

Reasonable supporters of Constitutional Capitalism will disagree about tax design, ownership mechanisms, antitrust remedies, transition speed, and the precise edge between private liberty and public obligation. That disagreement is not failure. It is evidence that the philosophy is a framework for argument rather than a personality cult. What must remain shared is the refusal of two extremes: markets without constitutional accountability, and states without constitutional limits.

`;

if (!md.includes("Additional Clarifications for Readers")) {
  md = md.replace("## XV. The Declaration", expansion + "\n## XV. The Declaration");
  fs.writeFileSync(file, md);
}

const body = md.replace(/^---[\s\S]*?---/, "").trim();
console.log("Declaration words:", body.split(/\s+/).filter(Boolean).length);
