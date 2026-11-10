#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
js_i18n_bridge.py
Deterministic tokenizer & structural parser for localized I18N blocks in the
interactive JavaScript modules of the Louis Renner presentation.
Supports 100% lossless extraction to review spreadsheets AND in-place source
patching on re-import with JavaScriptCore syntax verification.
"""

import os
import re
import subprocess

LANGUAGES = ("de", "en", "ja", "zh")
JSC_BIN = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"

# Registry of all localized JS blocks in the presentation, mapped to their Slide number & label
JS_TARGETS = [
    {
        "id_prefix": "UI.js_translations",
        "file": "js/translations.js",
        "marker": "const translations =",
        "mode": "lang_top",
        "slide": 0,
        "module_label": "UI Global • Basis-Wörterbuch (js/translations.js)",
    },
    {
        "id_prefix": "S03.js_history",
        "file": "js/history-journey.js",
        "marker": "this.milestonesData =",
        "mode": "leaf_lang",
        "slide": 4,
        "module_label": "Folie 04 • Historie-Zeitreise (9 Meilensteine)",
    },
    {
        "id_prefix": "S03.js_history_ui",
        "file": "js/history-journey.js",
        "marker": "this.uiLabels =",
        "mode": "auto",
        "slide": 4,
        "optional": True,
        "module_label": "Folie 04 • Historie UI-Elemente",
    },
    {
        "id_prefix": "S04.js_transform",
        "file": "js/transformation-journey.js",
        "marker": "this.phases =",
        "mode": "leaf_lang",
        "slide": 5,
        "module_label": "Folie 05 • Bau-Dokumentation Meuselwitz (14 Bauphasen)",
    },
    {
        "id_prefix": "S12.js_weickert_rem",
        "file": "js/weickert-rem-zoom.js",
        "marker": "const DYNAMIC_I18N =",
        "mode": "lang_top",
        "slide": 14,
        "module_label": "Folie 14 • Weickert-Spezial REM-Mikroskopie",
    },
    {
        "id_prefix": "S15.js_weight_balance",
        "file": "js/hammer-weight-balance.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 17,
        "module_label": "Folie 17 • Hammerkopfgewicht & Saitenmasse",
    },
    {
        "id_prefix": "S22.js_acoustic_bands",
        "file": "js/yamaha-kit-acoustic.js",
        "marker": "const BAND_META_I18N =",
        "mode": "lang_top",
        "slide": 24,
        "module_label": "Folie 24 • Klangspektrum (5 Frequenzbänder)",
    },
    {
        "id_prefix": "S23.js_acoustic_partials",
        "file": "js/yamaha-kit-acoustic.js",
        "marker": "const PARTIAL_NAMES_I18N =",
        "mode": "lang_top",
        "slide": 25,
        "module_label": "Folie 25 • Teiltonreihe H1–H12 Bezeichnungen",
    },
    {
        "id_prefix": "S25.js_piano_tone_a1",
        "file": "js/piano-tone-a1.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 27,
        "module_label": "Folie 27 • Teiltonaufbau A1 (55 Hz) & Anschlagstelle",
    },
    {
        "id_prefix": "S26.js_hammer_spring",
        "file": "js/hammer-spring.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 28,
        "module_label": "Folie 28 • Komplexe Feder Hammerkopf (Cristofori & Zonen)",
    },
    {
        "id_prefix": "S27.js_voicing_zones",
        "file": "js/voicing-zones.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 29,
        "module_label": "Folie 29 • Intonations-Zonen (Renner-Uhrmodell)",
    },
    {
        "id_prefix": "S28.js_crown_alignment",
        "file": "js/crown-string-alignment.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 30,
        "module_label": "Folie 30 • Scheitel & Saitenebene (3-chöriger Bezug)",
    },
    {
        "id_prefix": "S31.js_lacquer_hardening",
        "file": "js/felt-lacquer-hardening.js",
        "marker": "const I18N =",
        "mode": "lang_top",
        "slide": 33,
        "module_label": "Folie 33 • Tränkung / Lack-Dosierung & Hammerkopfgewicht",
    },
]


class JSTokenizer:
    """Tokenizes a slice of JavaScript source into punctuation, identifiers, numbers, and string/template literals."""
    def __init__(self, text, start_offset=0):
        self.text = text
        self.pos = start_offset
        self.n = len(text)

    def skip_ws_and_comments(self):
        t = self.text
        n = self.n
        while self.pos < n:
            ch = t[self.pos]
            if ch in " \t\r\n":
                self.pos += 1
            elif t.startswith("//", self.pos):
                nl = t.find("\n", self.pos + 2)
                self.pos = n if nl == -1 else nl + 1
            elif t.startswith("/*", self.pos):
                end = t.find("*/", self.pos + 2)
                self.pos = n if end == -1 else end + 2
            else:
                break

    def read_quoted_string(self, quote):
        t = self.text
        start = self.pos
        self.pos += 1
        chars = []
        while self.pos < self.n:
            ch = t[self.pos]
            if ch == "\\":
                self.pos += 1
                if self.pos < self.n:
                    esc = t[self.pos]
                    mapping = {"n": "\n", "r": "\r", "t": "\t", "\\": "\\", "'": "'", '"': '"', "`": "`"}
                    if esc in mapping:
                        chars.append(mapping[esc])
                    elif esc == "u" and self.pos + 4 < self.n:
                        hex_part = t[self.pos+1:self.pos+5]
                        if re.fullmatch(r"[0-9a-fA-F]{4}", hex_part):
                            chars.append(chr(int(hex_part, 16)))
                            self.pos += 4
                        else:
                            chars.append("\\u")
                    else:
                        chars.append(esc)
                    self.pos += 1
            elif ch == quote:
                self.pos += 1
                return ("STRING", "".join(chars), start, self.pos, quote)
            else:
                chars.append(ch)
                self.pos += 1
        raise ValueError(f"Unterminated string starting at {start}")

    def read_template_literal(self):
        """Reads `...` including nested ${...} expressions kept verbatim in the decoded text."""
        t = self.text
        start = self.pos
        self.pos += 1  # skip opening `
        out = []
        while self.pos < self.n:
            ch = t[self.pos]
            if ch == "\\":
                if self.pos + 1 < self.n:
                    nxt = t[self.pos + 1]
                    if nxt == "`":
                        out.append("`")
                    elif nxt == "$":
                        out.append("\\$")
                    elif nxt == "n":
                        out.append("\n")
                    elif nxt == "\\":
                        out.append("\\")
                    else:
                        out.append("\\" + nxt)
                    self.pos += 2
                else:
                    self.pos += 1
            elif ch == "`":
                self.pos += 1
                return ("TEMPLATE", "".join(out), start, self.pos, "`")
            elif t.startswith("${", self.pos):
                # Capture balanced ${...} verbatim
                expr_start = self.pos
                self.pos += 2
                depth = 1
                while self.pos < self.n and depth > 0:
                    c2 = t[self.pos]
                    if c2 in ("'", '"'):
                        self.read_quoted_string(c2)
                    elif c2 == "`":
                        self.read_template_literal()
                    elif c2 == "{":
                        depth += 1
                        self.pos += 1
                    elif c2 == "}":
                        depth -= 1
                        self.pos += 1
                    else:
                        self.pos += 1
                out.append(t[expr_start:self.pos])
            else:
                out.append(ch)
                self.pos += 1
        raise ValueError(f"Unterminated template literal at {start}")

    def peek_char(self):
        self.skip_ws_and_comments()
        return self.text[self.pos] if self.pos < self.n else ""


def find_block_bounds(text, marker):
    idx = text.find(marker)
    if idx == -1:
        return None
    eq_idx = text.find("=", idx)
    tok = JSTokenizer(text, eq_idx + 1)
    ch = tok.peek_char()
    if ch not in ("{", "["):
        return None
    open_ch = ch
    close_ch = "}" if ch == "{" else "]"
    start_pos = tok.pos
    depth = 0
    while tok.pos < tok.n:
        tok.skip_ws_and_comments()
        if tok.pos >= tok.n:
            break
        c = text[tok.pos]
        if c in ("'", '"'):
            tok.read_quoted_string(c)
        elif c == "`":
            tok.read_template_literal()
        elif c == open_ch:
            depth += 1
            tok.pos += 1
        elif c == close_ch:
            depth -= 1
            tok.pos += 1
            if depth == 0:
                return (start_pos, tok.pos)
        else:
            tok.pos += 1
    return None


def parse_js_value(tok):
    """Parses JS object/array/string/arrow-function-returning-strings into a structured Python node."""
    ch = tok.peek_char()
    t = tok.text

    if ch == "{":
        tok.pos += 1
        obj = {}
        while True:
            c = tok.peek_char()
            if c == "}" or not c:
                tok.pos += 1
                break
            if c in ("'", '"'):
                _, key, _, _, _ = tok.read_quoted_string(c)
            else:
                m = re.match(r"[A-Za-z0-9_$]+", t[tok.pos:])
                if not m:
                    # Skip unexpected token safely
                    tok.pos += 1
                    continue
                key = m.group(0)
                tok.pos += len(key)
            c = tok.peek_char()
            if c == ":":
                tok.pos += 1
                obj[str(key)] = parse_js_value(tok)
            else:
                # Shorthand or method — skip to comma or closing brace
                skip_expression(tok)
            c = tok.peek_char()
            if c == ",":
                tok.pos += 1
        return ("OBJECT", obj)

    if ch == "[":
        tok.pos += 1
        arr = []
        while True:
            c = tok.peek_char()
            if c == "]" or not c:
                tok.pos += 1
                break
            arr.append(parse_js_value(tok))
            c = tok.peek_char()
            if c == ",":
                tok.pos += 1
        return ("ARRAY", arr)

    if ch in ("'", '"'):
        kind, val, s, e, q = tok.read_quoted_string(ch)
        return ("LEAF", {"val": val, "start": s, "end": e, "quote": q})

    if ch == "`":
        kind, val, s, e, q = tok.read_template_literal()
        return ("LEAF", {"val": val, "start": s, "end": e, "quote": q})

    # Otherwise it is an expression (number, boolean, or arrow function like `(a, b) => ...`)
    return parse_expression_leaves(tok)


def skip_expression(tok):
    depth_paren = 0
    depth_brace = 0
    depth_brack = 0
    t = tok.text
    while tok.pos < tok.n:
        tok.skip_ws_and_comments()
        if tok.pos >= tok.n:
            break
        c = t[tok.pos]
        if c in ("'", '"'):
            tok.read_quoted_string(c)
        elif c == "`":
            tok.read_template_literal()
        elif c == "(":
            depth_paren += 1
            tok.pos += 1
        elif c == ")":
            if depth_paren == 0:
                break
            depth_paren -= 1
            tok.pos += 1
        elif c == "{":
            depth_brace += 1
            tok.pos += 1
        elif c == "}":
            if depth_brace == 0 and depth_paren == 0 and depth_brack == 0:
                break
            depth_brace = max(0, depth_brace - 1)
            tok.pos += 1
        elif c == "[":
            depth_brack += 1
            tok.pos += 1
        elif c == "]":
            if depth_brack == 0 and depth_paren == 0 and depth_brace == 0:
                break
            depth_brack = max(0, depth_brack - 1)
            tok.pos += 1
        elif c == "," and depth_paren == 0 and depth_brace == 0 and depth_brack == 0:
            break
        else:
            tok.pos += 1


def parse_expression_leaves(tok):
    """
    Scans an expression (e.g. `(tau, mb) => \\`...\\`` or `(aged) => aged ? 'A' : 'B'`)
    and collects any top-level string/template literals outside `${...}` so arrow-function
    strings are also 100% reviewable and editable!
    """
    depth_paren = 0
    depth_brace = 0
    depth_brack = 0
    t = tok.text
    expr_start = tok.pos
    leaves = []
    seen_arrow = False

    while tok.pos < tok.n:
        tok.skip_ws_and_comments()
        if tok.pos >= tok.n:
            break
        c = t[tok.pos]
        if t.startswith("=>", tok.pos) and depth_paren == 0 and depth_brace == 0:
            seen_arrow = True
            tok.pos += 2
            continue
        if c in ("'", '"'):
            _, val, s, e, q = tok.read_quoted_string(c)
            if seen_arrow and depth_paren == 0:
                leaves.append({"val": val, "start": s, "end": e, "quote": q})
        elif c == "`":
            _, val, s, e, q = tok.read_template_literal()
            if seen_arrow and depth_paren == 0:
                leaves.append({"val": val, "start": s, "end": e, "quote": q})
        elif c == "(":
            depth_paren += 1
            tok.pos += 1
        elif c == ")":
            if depth_paren == 0:
                break
            depth_paren -= 1
            tok.pos += 1
        elif c == "{":
            depth_brace += 1
            tok.pos += 1
        elif c == "}":
            if depth_brace == 0 and depth_paren == 0 and depth_brack == 0:
                break
            depth_brace = max(0, depth_brace - 1)
            tok.pos += 1
        elif c == "[":
            depth_brack += 1
            tok.pos += 1
        elif c == "]":
            if depth_brack == 0 and depth_paren == 0 and depth_brace == 0:
                break
            depth_brack = max(0, depth_brack - 1)
            tok.pos += 1
        elif c == "," and depth_paren == 0 and depth_brace == 0 and depth_brack == 0:
            break
        else:
            tok.pos += 1

    if len(leaves) == 1:
        return ("LEAF", leaves[0])
    elif len(leaves) > 1:
        return ("ARRAY", [("LEAF", lf) for lf in leaves])
    return ("OTHER", t[expr_start:tok.pos].strip())


def flatten_subtree(node, prefix=""):
    """Flattens a parsed node (inside a single language) into {subpath: leaf_dict}."""
    kind, val = node
    out = {}
    if kind == "LEAF":
        # Skip hex color codes like #38bdf8
        if re.fullmatch(r"#[0-9a-fA-F]{3,8}", val["val"].strip()):
            return out
        out[prefix] = val
    elif kind == "OBJECT":
        for k, child in val.items():
            if k == "color":
                continue
            sub = f"{prefix}.{k}" if prefix else k
            out.update(flatten_subtree(child, sub))
    elif kind == "ARRAY":
        for idx, child in enumerate(val):
            sub = f"{prefix}[{idx}]" if prefix else f"[{idx}]"
            out.update(flatten_subtree(child, sub))
    return out


def walk_leaf_lang(node, prefix=""):
    """
    Walks structures like `milestonesData` or `phases` where languages sit near the leaves:
      heading: { de: '...', en: '...', ja: '...', zh: '...' }
      bullets: { de: ['...', '...'], en: ['...', '...'], ... }
    Returns Ordered dict of {subpath: {lang: leaf_dict}}.
    """
    kind, val = node
    grouped = {}
    if kind == "OBJECT":
        keys = set(val.keys())
        if keys and keys.issubset(set(LANGUAGES)) and ("de" in keys or "en" in keys):
            # Found a language dictionary! Flatten each language branch and align by subpath
            per_lang = {lang: flatten_subtree(val[lang], "") for lang in LANGUAGES if lang in val}
            all_sub = []
            for lang in LANGUAGES:
                for sp in per_lang.get(lang, {}):
                    if sp not in all_sub:
                        all_sub.append(sp)
            for sp in all_sub:
                full_p = f"{prefix}.{sp}" if (prefix and sp) else (prefix or sp)
                grouped[full_p] = {lang: per_lang[lang][sp] for lang in LANGUAGES if sp in per_lang.get(lang, {})}
        else:
            for k, child in val.items():
                sub = f"{prefix}.{k}" if prefix else k
                grouped.update(walk_leaf_lang(child, sub))
    elif kind == "ARRAY":
        for idx, child in enumerate(val):
            sub = f"{prefix}[{idx}]" if prefix else f"[{idx}]"
            grouped.update(walk_leaf_lang(child, sub))
    return grouped


def extract_target_entries(base_dir, target):
    """
    Returns list of entries for one JS target:
    Each entry: {
      "id": "S27.js_voicing_zones::zones.blue.title",
      "slide": 28,
      "module_label": "...",
      "file": "js/voicing-zones.js",
      "subpath": "zones.blue.title",
      "langs": { "de": leaf, "en": leaf, "ja": leaf, "zh": leaf }
    }
    """
    abs_path = os.path.join(base_dir, target["file"])
    if not os.path.exists(abs_path):
        return []
    with open(abs_path, "r", encoding="utf-8") as f:
        text = f.read()

    bounds = find_block_bounds(text, target["marker"])
    if not bounds:
        if target.get("optional"):
            return []
        raise RuntimeError(f"Marker '{target['marker']}' not found in {target['file']}")

    tok = JSTokenizer(text, bounds[0])
    tree = parse_js_value(tok)

    grouped = {}
    if target["mode"] == "lang_top":
        assert tree[0] == "OBJECT"
        top_obj = tree[1]
        per_lang = {}
        for lang in LANGUAGES:
            if lang in top_obj:
                per_lang[lang] = flatten_subtree(top_obj[lang], "")
        all_sub = []
        for lang in LANGUAGES:
            for sp in per_lang.get(lang, {}):
                if sp not in all_sub:
                    all_sub.append(sp)
        for sp in all_sub:
            grouped[sp] = {lang: per_lang[lang][sp] for lang in LANGUAGES if sp in per_lang.get(lang, {})}
    else:
        grouped = walk_leaf_lang(tree, "")

    entries = []
    for sp, lang_leaves in grouped.items():
        # Must have at least 2 languages to be a real translatable entry
        if len(lang_leaves) < 2:
            continue
        entries.append({
            "id": f"{target['id_prefix']}::{sp}",
            "slide": target["slide"],
            "module_label": target["module_label"],
            "file": target["file"],
            "subpath": sp,
            "langs": lang_leaves,
        })
    return entries


def extract_all_js_entries(base_dir):
    all_entries = []
    for t in JS_TARGETS:
        all_entries.extend(extract_target_entries(base_dir, t))
    return all_entries


def encode_js_literal(new_val, quote_char):
    """Encodes a string back into its original JS quote style (' / \" / `)."""
    if quote_char == "`" or "${" in new_val:
        # Encode as template literal, preserving ${...} expressions untouched!
        parts = re.split(r"(\$\{[^}]+\})", new_val)
        enc = []
        for idx, p in enumerate(parts):
            if idx % 2 == 1:
                enc.append(p)
            else:
                p_esc = p.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
                enc.append(p_esc)
        return "`" + "".join(enc) + "`"
    elif quote_char == "'":
        esc = (
            new_val.replace("\\", "\\\\")
            .replace("'", "\\'")
            .replace("\r", "")
            .replace("\n", "\\n")
        )
        return f"'{esc}'"
    else:
        esc = (
            new_val.replace("\\", "\\\\")
            .replace('"', '\\"')
            .replace("\r", "")
            .replace("\n", "\\n")
        )
        return f'"{esc}"'


def verify_js_syntax(js_code, filename_hint="file.js"):
    if not os.path.exists(JSC_BIN):
        return True, ""
    wrapper = "new Function(" + repr(js_code) + ");"
    res = subprocess.run([JSC_BIN, "-e", wrapper], capture_output=True, text=True)
    if res.returncode != 0:
        return False, (res.stdout + "\n" + res.stderr).strip()
    return True, ""


def apply_js_updates(base_dir, updates_by_id, allowed_langs=None):
    """
    updates_by_id: { entry_id: { "de": "...", "en": "...", "ja": "...", "zh": "..." } }
    Patches changed strings directly in the .js files (bottom-to-top per file) and
    verifies syntax via JavaScriptCore before saving!
    Returns (updated_cells_count, touched_files_list).
    """
    entries = extract_all_js_entries(base_dir)
    entry_map = {e["id"]: e for e in entries}

    edits_per_file = {}  # file -> list of (start, end, replacement_literal)
    updated_cells = 0

    for eid, new_langs in updates_by_id.items():
        if eid not in entry_map:
            continue
        ent = entry_map[eid]
        for lang, new_text in new_langs.items():
            if allowed_langs and lang not in allowed_langs:
                continue
            if lang not in ent["langs"]:
                continue
            if new_text is None:
                continue
            leaf = ent["langs"][lang]
            cur_text = leaf["val"]
            if new_text != cur_text and new_text.strip() != "":
                rep = encode_js_literal(new_text, leaf["quote"])
                edits_per_file.setdefault(ent["file"], []).append((leaf["start"], leaf["end"], rep, eid, lang))

    touched_files = []
    for rel_file, edits in edits_per_file.items():
        abs_path = os.path.join(base_dir, rel_file)
        with open(abs_path, "r", encoding="utf-8") as f:
            orig_code = f.read()

        # Sort descending by start offset so replacements never shift earlier spans
        edits_sorted = sorted(edits, key=lambda x: x[0], reverse=True)
        patched = orig_code
        for s, e, rep, eid, lang in edits_sorted:
            patched = patched[:s] + rep + patched[e:]

        ok, err = verify_js_syntax(patched, rel_file)
        if not ok:
            raise RuntimeError(
                f"Syntax-Schutz hat eine ungültige Platzhalter-Änderung in {rel_file} abgefangen!\n"
                f"Bitte prüfen Sie geschweifte Platzhalter wie ${{...}} in den geänderten Zeilen.\nDetails: {err}"
            )

        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(patched)
        updated_cells += len(edits_sorted)
        touched_files.append(rel_file)

    return updated_cells, touched_files


if __name__ == "__main__":
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    all_e = extract_all_js_entries(base)
    by_slide = {}
    for e in all_e:
        by_slide[e["slide"]] = by_slide.get(e["slide"], 0) + 1
    print(f"Extracted {len(all_e)} multi-language JS entries across slides: {by_slide}")

