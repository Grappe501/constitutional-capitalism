#!/usr/bin/env python3
"""Spend-gated ElevenLabs generation for Narration Director paragraph units.

Requires:
  ELEVENLABS_API_KEY in environment (never commit)
  --confirm-spend for live calls
  --model flash|turbo|v3

Use --dry-run to estimate characters/cost without calling the API.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CHAPTER = ROOT / "data/project/narration/chapters/ch01_the_arkansas_we_inherited.json"
STYLE = ROOT / "data/project/narration/cc_narration_style_guide.json"
AUDIO_ROOT = ROOT / ".local/narration/audio"

# Approximate public API list prices (USD per 1k characters) for budgeting only.
MODEL_RATES = {
    "flash": 0.05,
    "turbo": 0.05,
    "v3": 0.10,
}

# Map CLI model aliases to ElevenLabs model_id (adjust if account uses different IDs).
MODEL_IDS = {
    "flash": "eleven_flash_v2_5",
    "turbo": "eleven_turbo_v2_5",
    "v3": "eleven_v3",
}


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, obj):
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def content_hash(text: str, model: str, voice_id: str) -> str:
    h = hashlib.sha256()
    h.update(model.encode())
    h.update(b"|")
    h.update(voice_id.encode())
    h.update(b"|")
    h.update(text.encode("utf-8"))
    return h.hexdigest()[:16]


def compile_render_text(unit: dict, model: str) -> str:
    """Spoken text for API. Prefer eleven_v3_tags only for v3 expressive passes."""
    if model == "v3" and unit.get("eleven_v3_tags"):
        return unit["eleven_v3_tags"]
    return unit["spoken_text"]


def resolve_voice_id(cli_voice: str | None, style: dict) -> str:
    if cli_voice:
        return cli_voice
    vid = (style.get("voice") or {}).get("elevenlabs_voice_id")
    if vid:
        return vid
    env = os.environ.get("ELEVENLABS_VOICE_ID")
    if env:
        return env
    raise SystemExit(
        "No voice selected. Set Style Guide voice.elevenlabs_voice_id, "
        "ELEVENLABS_VOICE_ID, or pass --voice-id."
    )


def select_units(chapter: dict, ids: list[str] | None) -> list[dict]:
    units = chapter.get("units") or []
    if not ids:
        return units
    want = set(ids)
    selected = [u for u in units if u["unit_id"] in want]
    missing = want - {u["unit_id"] for u in selected}
    if missing:
        raise SystemExit(f"Unknown unit ids: {', '.join(sorted(missing))}")
    return selected


def estimate(units: list[dict], model: str) -> tuple[int, float]:
    chars = sum(len(compile_render_text(u, model)) for u in units)
    rate = MODEL_RATES[model]
    return chars, (chars / 1000.0) * rate


def tts_request(api_key: str, voice_id: str, model_id: str, text: str) -> bytes:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    body = json.dumps(
        {
            "text": text,
            "model_id": model_id,
            "voice_settings": {
                "stability": 0.45,
                "similarity_boost": 0.75,
            },
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"ElevenLabs HTTP {e.code}: {detail}") from e


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Narration Director ElevenLabs generator")
    parser.add_argument(
        "--chapter",
        type=Path,
        default=DEFAULT_CHAPTER,
        help="Chapter performance manuscript JSON",
    )
    parser.add_argument(
        "--model",
        choices=sorted(MODEL_IDS.keys()),
        default="flash",
        help="flash/turbo for proof; v3 for expressive",
    )
    parser.add_argument(
        "--ids",
        type=str,
        default="",
        help="Comma-separated unit ids (e.g. S1.P01,S9.P01). Default: all.",
    )
    parser.add_argument("--voice-id", type=str, default=None, help="Override voice id")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Estimate characters/cost only; no API call",
    )
    parser.add_argument(
        "--confirm-spend",
        action="store_true",
        help="Required for live generation (consumes ElevenLabs credits)",
    )
    args = parser.parse_args(argv)

    chapter = load(args.chapter)
    style = load(STYLE)
    id_list = [x.strip() for x in args.ids.split(",") if x.strip()] or None
    units = select_units(chapter, id_list)
    chars, cost = estimate(units, args.model)

    print(f"Chapter: {chapter.get('id')}")
    print(f"Units:   {len(units)}")
    print(f"Model:   {args.model} ({MODEL_IDS[args.model]})")
    print(f"Chars:   {chars:,}")
    print(f"Est USD: ~${cost:.2f} (list-rate estimate; plan credits may differ)")

    if args.dry_run:
        print("Dry run complete — no API call.")
        return 0

    if not args.confirm_spend:
        print(
            "Refusing live generation without --confirm-spend. "
            "Re-run with --dry-run or --confirm-spend after Style Guide freeze.",
            file=sys.stderr,
        )
        return 2

    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        raise SystemExit("ELEVENLABS_API_KEY is not set.")

    voice_id = resolve_voice_id(args.voice_id, style)
    model_id = MODEL_IDS[args.model]
    slug = chapter.get("chapter_slug") or "chapter"
    out_dir = AUDIO_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    by_id = {u["unit_id"]: u for u in chapter["units"]}
    generated = 0
    for unit in units:
        text = compile_render_text(unit, args.model)
        digest = content_hash(text, args.model, voice_id)
        rel = f".local/narration/audio/{slug}/{unit['unit_id']}.mp3"
        abs_path = ROOT / rel
        print(f"Generating {unit['unit_id']} ({len(text)} chars)…")
        audio = tts_request(api_key, voice_id, model_id, text)
        abs_path.write_bytes(audio)
        meta = {
            "model": args.model,
            "voice_id": voice_id,
            "file_path": rel.replace("\\", "/"),
            "content_hash": digest,
            "generated_at": date.today().isoformat(),
            "characters": len(text),
        }
        by_id[unit["unit_id"]]["audio"] = meta
        by_id[unit["unit_id"]]["status"] = "proofed"
        generated += 1

    chapter["spend_status"] = "PARTIAL_OR_COMPLETE"
    chapter["last_generation"] = {
        "date": date.today().isoformat(),
        "model": args.model,
        "units_generated": generated,
        "characters": chars,
    }
    dump(args.chapter, chapter)
    print(f"Wrote {generated} audio files under {out_dir}")
    print(f"Updated metadata in {args.chapter}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
