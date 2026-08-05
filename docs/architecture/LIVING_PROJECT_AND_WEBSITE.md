# Living Project and Website Architecture

Status: architectural proposal (post–Phase 1)  
Last updated: 2026-08-04  
Data: `data/project/website_information_architecture.json`  
Related decision: `CC-DEC-035`

## Medium shift

The project has outgrown “the book” as the sole container.

| Artifact | Role |
|---|---|
| **Book** | *Introduction to Constitutional Capitalism* — readable entry, not the whole system |
| **Website** | *The Constitutional Capitalism Project* — living school of thought |

The website evolves: research, debate, amendments, models, pilots, evidence dashboard, encyclopedia depth.

Three parallel books (public introduction, Evidence Companion, Implementation Manual) remain content streams **inside** the living project — not the outer product boundary.

## Why this opens the work

A static manuscript cannot hold every domain drill-down, counterargument, pilot result, and amendment. An online philosophy can branch, deepen, and correct without pretending the first edition was final.

## Dual information architecture

### A. Domain tree (institutions & fields)

Constitutional Capitalism

- The Philosophy  
- The Constitution  
- Human Flourishing  
- Economics  
- **Justice, Safety, and Restoration** (principal domain; branches in `justice_framework.json`)  
- **Public Service and the 21st-Century State** (defining friction-reduction doctrine; *invisible—but never unaccountable*; branches in `government_capacity_framework.json`)  
- **Constitutional Transparency and the People's Ledger** (presumption of openness with justified exceptions; branches in `transparency_framework.json`)  
- **Essential Systems** (banking, insurance, healthcare, pharmaceuticals, prevention; system-design method in `essential_systems_framework.json`)  
- **Human Capital Doctrine** (human infrastructure, equal-dignity pathways, regional academy pilots; `human_capital_framework.json`)  
- Communities  
- Families  
- Education  
- Healthcare  
- Housing  
- Agriculture  
- Technology & AI  
- Environment  
- **Democracy, Representation, and Distributed Government** (second constitutional spine; branches in `democracy_framework.json`)  
- National Security  
- Global Adaptation  
- Research Library  
- Policy Laboratory  
- Pilot Communities  
- Evidence Dashboard  
- Living Amendments  

### B. Life-path tree (human stories)

Do not organize *only* by government departments. Organize also by human life:

- A Child  
- A Student  
- A Worker  
- An Entrepreneur  
- A Parent  
- A Farmer  
- A Manufacturer  
- A Small-Town Resident  
- A Retiree  
- A Community  
- A Nation  

Show how institutions contribute to that person’s ability to flourish.

People think in stories more than organizational charts.

## Civilizational objective

What kind of society should a constitutional republic intentionally build over the next hundred years?

Not only: who owns, who governs, who pays.

Also: belonging, multi-generational roots, regional opportunity, families and communities that can stay together by choice, distributed prosperity through living “arteries.”

## Relationship to Build Board and book-site

| Surface | Near-term role |
|---|---|
| `apps/book-site` | Public introduction, Declaration, principles, status |
| `apps/build-board` | Command center for architecture, decisions, research honesty |
| Future domain/life sections | Expand as Phase 2+ evidence and content mature |

Do not invent finished domain pages. Seed IA first; publish when content is real.
