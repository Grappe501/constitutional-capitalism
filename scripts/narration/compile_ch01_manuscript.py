#!/usr/bin/env python3
"""Compile Public Book Chapter 1 into Narration Director paragraph units.

Does not call ElevenLabs. Directions are first-pass Style Guide defaults.
"""
from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "data/project/stage5_pass51_the_arkansas_we_inherited.json"
STYLE = ROOT / "data/project/narration/cc_narration_style_guide.json"
OUT = ROOT / "data/project/narration/chapters/ch01_the_arkansas_we_inherited.json"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def compile_v3_tags(direction: dict, spoken: str) -> str:
    """Optional expressive render string — tags are narrator instructions only."""
    tags = []
    pace = direction.get("pace")
    emotion = direction.get("emotion")
    if pace == "slow":
        tags.append("[slowly]")
    elif pace == "measured":
        tags.append("[measured]")
    if emotion and emotion not in ("neutral", "thoughtful"):
        tags.append(f"[{emotion}]")
    elif emotion == "thoughtful":
        tags.append("[thoughtful]")
    prefix = " ".join(tags)
    return f"{prefix} {spoken}".strip() if prefix else spoken


# Signature paragraph keys: (section_id, 1-based index)
SIGNATURES = {
    ("S1", 1),  # temptation / diagnosis
    ("S1", 2),  # refuses shortcut
    ("S1", 4),  # what Arkansas inherited
    ("S2", 5),  # honesty over averages
    ("S3", 4),  # average is a rumor
    ("S4", 2),  # household unit of success
    ("S5", 5),  # wages and retail life
    ("S8", 3),  # refuse fake leakage %
    ("S8", 4),  # fake totals = marketing
    ("S9", 1),  # central problem
    ("S9", 5),  # COUNTABLE $0 honesty
    ("S10", 4),  # no longer designing
    ("S10", 5),  # turn the page
}

EMPHASIS = {
    ("S1", 2): ["refuses", "shortcut"],
    ("S1", 4): ["inherited"],
    ("S2", 3): ["Rivers household", "illustration"],
    ("S2", 4): ["Phillips County", "real place"],
    ("S2", 5): ["honesty"],
    ("S3", 4): ["rumor"],
    ("S4", 2): ["household"],
    ("S5", 5): ["wages", "retail life"],
    ("S7", 3): ["refuses to invent"],
    ("S8", 3): ["do not invent"],
    ("S8", 4): ["marketing"],
    ("S9", 1): ["capable", "leaky"],
    ("S9", 5): ["COUNTABLE", "honesty"],
    ("S10", 5): ["inherited"],
}

NOTES = {
    ("S1", 1): "Opening thesis. Measured; do not sell.",
    ("S1", 2): "Hard stop after 'shortcut.' This is the book's method.",
    ("S1", 4): "Definitional turn — what Arkansas inherited. Leave space.",
    ("S2", 3): "Introduce Rivers: warm, analytical, not melodrama.",
    ("S2", 4): "Phillips County FACT — respectful, not pity.",
    ("S2", 5): "Honesty rule. Firm, not angry.",
    ("S3", 4): "Kitchen-table turn. Slight restraint.",
    ("S4", 2): "Unit of success definition. The book rests on this.",
    ("S5", 1): "Quiet affirmation — Arkansas is not empty.",
    ("S5", 5): "Fiscal punchline. Lean on wages and retail; no sneer.",
    ("S6", 5): "Funded vs reachable. Logistics, not metaphor theater.",
    ("S7", 3): "Honesty rule on assets. Firm.",
    ("S8", 3): "Refuse fake precision. Signature discipline.",
    ("S8", 4): "Short blade. Do not rush.",
    ("S9", 1): "Central problem in one breath. Do not race.",
    ("S9", 5): "COUNTABLE still zero. Same honesty as Stage 4.",
    ("S10", 4): "Pivot line. Hold after.",
    ("S10", 5): "Chapter landing. Leave silence.",
}


def main():
    chapter = load(SOURCE)
    style = load(STYLE)
    defaults = style["defaults"]
    units = []
    section_list = chapter.get("sections") or []
    total_sections = len(section_list)

    for si, section in enumerate(section_list):
        sid = section["id"]
        heading = section.get("heading") or sid
        prose = section.get("prose") or []
        n = len(prose)
        for pi, text in enumerate(prose, start=1):
            key = (sid, pi)
            direction = {
                "voice": None,
                "energy": defaults["energy"],
                "pace": defaults["pace"],
                "emotion": defaults["emotion"],
                "emphasis": EMPHASIS.get(key, []),
                "opening_pause_ms": defaults["opening_pause_ms"],
                "closing_pause_ms": defaults["closing_pause_ms"],
                "performance_note": NOTES.get(key, ""),
            }

            # Section first / last
            if pi == 1:
                direction.update(defaults["section_first_paragraph"])
            if pi == n:
                direction["closing_pause_ms"] = defaults["section_last_paragraph"][
                    "closing_pause_ms"
                ]

            # Chapter open / close
            if si == 0 and pi == 1:
                for k, v in defaults["chapter_open"].items():
                    if k == "performance_note":
                        direction["performance_note"] = v
                    else:
                        direction[k] = v
            if si == total_sections - 1 and pi == n:
                for k, v in defaults["chapter_close"].items():
                    if k == "performance_note":
                        direction["performance_note"] = v
                    else:
                        direction[k] = v

            # Restore specific notes if we overwrote with chapter open/close only when no specific
            if key in NOTES and not (
                (si == 0 and pi == 1) or (si == total_sections - 1 and pi == n)
            ):
                direction["performance_note"] = NOTES[key]
            elif key in NOTES and (si == 0 and pi == 1):
                direction["performance_note"] = NOTES[key]
            elif key in NOTES and (si == total_sections - 1 and pi == n):
                direction["performance_note"] = NOTES[key]

            priority = "signature" if key in SIGNATURES else "standard"
            if priority == "signature" and direction["energy"] < 3:
                pass
            if priority == "signature" and key in (("S9", 1), ("S4", 2), ("S8", 3)):
                direction["pace"] = "slow"
                direction["closing_pause_ms"] = max(direction["closing_pause_ms"], 1400)

            unit_id = f"{sid}.P{pi:02d}"
            unit = {
                "unit_id": unit_id,
                "source_path": "data/project/stage5_pass51_the_arkansas_we_inherited.json",
                "source_pass_id": chapter.get("pass_id", "PASS_5_1"),
                "section_id": sid,
                "section_heading": heading,
                "paragraph_index": pi,
                "spoken_text": text,
                "direction": direction,
                "eleven_v3_tags": compile_v3_tags(direction, text),
                "priority": priority,
                "status": "draft",
                "audio": {
                    "model": None,
                    "voice_id": None,
                    "file_path": None,
                    "content_hash": None,
                    "generated_at": None,
                    "characters": None,
                },
            }
            units.append(unit)

    signature_count = sum(1 for u in units if u["priority"] == "signature")
    chars = sum(len(u["spoken_text"]) for u in units)
    out = {
        "version": "1.0.0",
        "id": "CC-NARRATION-CH01-THE-ARKANSAS-WE-INHERITED-1.0",
        "chapter_slug": "the-arkansas-we-inherited",
        "chapter_title": chapter.get("pass_name"),
        "public_surface": chapter.get("public_surface"),
        "director_surface": "/public-book/narration/ch01/",
        "source_path": "data/project/stage5_pass51_the_arkansas_we_inherited.json",
        "style_guide": "data/project/narration/cc_narration_style_guide.json",
        "pronunciation_dictionary": "data/project/narration/cc_pronunciation_dictionary.json",
        "generated_at": "2026-08-16",
        "status": "DRAFT_PENDING_REVIEW",
        "spend_status": "NO_API_SPEND",
        "stats": {
            "sections": total_sections,
            "paragraph_units": len(units),
            "signature_units": signature_count,
            "spoken_characters": chars,
            "spoken_words_approx": sum(len(u["spoken_text"].split()) for u in units),
        },
        "discipline": [
            "Public Book prose unchanged",
            "Directions are narrator instructions only",
            "No ElevenLabs generation until Style Guide freeze + --confirm-spend",
            "Regenerate paragraph units only",
        ],
        "units": units,
    }
    dump(OUT, out)
    print(
        f"Wrote {OUT.relative_to(ROOT)} — {len(units)} units, "
        f"{signature_count} signature, {chars} chars"
    )


if __name__ == "__main__":
    main()
