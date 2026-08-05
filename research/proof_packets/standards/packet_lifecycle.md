# Proof Packet Lifecycle

**Methodology version:** 1.0

| Stage | Meaning |
| --- | --- |
| **Planned** | Packet ID reserved; question and hypothesis anchors identified. |
| **Researching** | Active evidence collection; ledger open. |
| **Draft** | Packet markdown and contract filled; not yet reviewed. |
| **Internal Review** | Project investigator review for completeness and honesty. |
| **Methodology Review** | Check that process — not conclusions — matches the OS. |
| **Domain Review** | Subject-matter review (agriculture, law research notes, economics, etc.). |
| **Complete** | Checklist + validation script passed; registry updated. |
| **Archived** | Preserved; no longer active work. |
| **Superseded** | Replaced by a later packet or revision. |

## Transitions

- Planned → Researching when evidence inventory begins.
- Researching → Draft when template sections are substantially filled.
- Draft → Internal Review when author marks ready.
- Complete requires `npm run proofpacket:validate` exit 0.
- Complete → Superseded when a successor packet replaces conclusions.
- Any stage → Withdrawn (verdict/process) only with registry reason.
