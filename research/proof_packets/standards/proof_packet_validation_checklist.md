# Proof Packet Validation Checklist

**Methodology version:** 1.0

No packet may move to **Complete** unless every item is checked and justified in the packet or accompanying audit files.

## Required before close

- [ ] Strongest support included (registered sources preferred)
- [ ] Strongest contrary evidence included (or exhaustive contrary search log)
- [ ] Assumptions identified
- [ ] Limitations identified
- [ ] Legal issues identified (research notes; no unauthorized legal conclusions)
- [ ] Implementation considerations documented
- [ ] Verdict justified (exactly one primary investigative label when closing on merits)
- [ ] Confidence justified (evidence quality, not certainty)
- [ ] Citations complete (IDs resolve in source registry / ledger, or ledger explains exception)
- [ ] Template sections all present
- [ ] JSON contract instance validates
- [ ] Research ledger present
- [ ] Methodology audit present
- [ ] Research integrity note present
- [ ] Registry row updated

## Automated gate

```bash
npm run proofpacket:validate
```

Must pass before Complete status.
