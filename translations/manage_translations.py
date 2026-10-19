#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
manage_translations.py
Zentrales Management- und Build-Werkzeug für die mehrsprachigen Präsentationstexte.

Befehle:
  python3 translations/manage_translations.py --status
      Zeigt den Übersetzungsstatus aller 67 Folien (DE, EN, JA, ZH).

  python3 translations/manage_translations.py --apply (oder --build)
      Kompiliert translations/slides_content.json:
      - Erzeugt js/translations-data.js
      - Erzeugt translations/locales/{de,en,ja,zh}.json
      - Injiziert data-i18n Attribute in slide_definitions.py & index.html

  python3 translations/manage_translations.py --export-csv [pfad.csv]
      Exportiert alle Folientexte als CSV-Tabelle für Excel / Übersetzungsagenturen.

  python3 translations/manage_translations.py --import-csv [pfad.csv]
      Importiert bearbeitete Übersetzungen aus einer CSV-Datei zurück in den Master-Store.

  python3 translations/manage_translations.py --sync-from-locales
      Liest direkte Änderungen aus translations/locales/{de,en,ja,zh}.json zurück.
"""

import os
import sys
import re
import json
import csv
import argparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSLATIONS_DIR = os.path.join(BASE_DIR, "translations")
MASTER_FILE = os.path.join(TRANSLATIONS_DIR, "slides_content.json")
LOCALES_DIR = os.path.join(TRANSLATIONS_DIR, "locales")
JS_DATA_FILE = os.path.join(BASE_DIR, "js", "translations-data.js")
SLIDE_DEFS_FILE = os.path.join(BASE_DIR, "slide_definitions.py")
INDEX_HTML_FILE = os.path.join(BASE_DIR, "index.html")

LANGUAGES = ["de", "en", "ja", "zh"]
LANG_NAMES = {
    "de": "🇩🇪 Deutsch",
    "en": "🇬🇧 English",
    "ja": "🇯🇵 日本語",
    "zh": "🇨🇳 中文"
}

def load_master():
    if not os.path.exists(MASTER_FILE):
        print(f"FEHLER: Master-Datei nicht gefunden: {MASTER_FILE}")
        sys.exit(1)
    with open(MASTER_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_master(data):
    with open(MASTER_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✓ Master-Datei aktualisiert: {os.path.relpath(MASTER_FILE, BASE_DIR)}")

def flatten_data(data):
    """
    Erzeugt flache Schlüssel-Werte-Wörterbücher pro Sprache für schnellen Lookup.
    """
    flat = {lang: {} for lang in LANGUAGES}
    
    # UI Strings
    for ui_key, ui_dict in data.get("ui", {}).items():
        for lang in LANGUAGES:
            val = ui_dict.get(lang, "")
            if val: flat[lang][ui_key] = val

    for s_key, slide in data.get("slides", {}).items():
        num = slide.get("slide_number")
        
        # Category
        if "category" in slide:
            for lang in LANGUAGES:
                val = slide["category"].get(lang, "")
                if val: flat[lang][f"s{num}_category"] = val
                
        # Title
        if "title" in slide:
            for lang in LANGUAGES:
                val = slide["title"].get(lang, "")
                if val: flat[lang][f"s{num}_title"] = val
                
        # Subtitle
        if "subtitle" in slide:
            for lang in LANGUAGES:
                val = slide["subtitle"].get(lang, "")
                if val: flat[lang][f"s{num}_subtitle"] = val

        # Kicker
        if "kicker" in slide:
            for lang in LANGUAGES:
                val = slide["kicker"].get(lang, "")
                if val: flat[lang][f"s{num}_kicker"] = val

        # Elements (Badges, Cards, Bullets, Captions)
        for el_key, el_dict in slide.get("elements", {}).items():
            for lang in LANGUAGES:
                val = el_dict.get(lang, "")
                if val: flat[lang][el_key] = val

        # Notes
        if "notes" in slide:
            for lang in LANGUAGES:
                val = slide["notes"].get(lang, "")
                if val: flat[lang][f"s{num}_notes"] = val

    return flat

def cmd_status():
    data = load_master()
    flat = flatten_data(data)
    slides = data.get("slides", {})

    print("\n" + "="*70)
    print(" 🎹 LOUIS RENNER MASTERCLASS 2025 – ÜBERSETZUNGSSTATUS")
    print("="*70)
    print(f" Folien insgesamt: {len(slides)}")
    
    total_keys = len(flat["de"])
    print(f" Extrahierte Text-Elemente pro Sprache (Basis DE): {total_keys}\n")
    
    print(f"{'Sprache':<20} | {'Übersetzt':<12} | {'Deckungsgrad':<15}")
    print("-" * 52)
    for lang in LANGUAGES:
        count = len(flat[lang])
        # Count non-identical to DE (real translation)
        if lang == "de":
            pct = 100.0
            note = "(Original)"
        else:
            pct = (count / total_keys * 100) if total_keys else 0
            note = ""
        bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
        print(f"{LANG_NAMES[lang]:<20} | {count:>5}/{total_keys:<5} | {pct:>5.1f}% {bar} {note}")
    print("-" * 52)

    # Missing slide-by-slide check
    print("\nÜbersicht nach Kapiteln:")
    chapters = {}
    for s_key, s in slides.items():
        ch = s.get("chapter", 1)
        if ch not in chapters:
            chapters[ch] = {"name": s.get("chapter_name", {}).get("de", f"Kapitel {ch}"), "slides": []}
        chapters[ch]["slides"].append(s)

    for ch_num, ch_data in sorted(chapters.items()):
        ch_slides = ch_data["slides"]
        print(f"\n▶ {ch_data['name']} ({len(ch_slides)} Folien):")
        for s in ch_slides:
            num = s["slide_number"]
            t_de = s.get("title", {}).get("de", "Ohne Titel")[:32]
            status_icons = []
            for lang in LANGUAGES:
                has_t = bool(s.get("title", {}).get(lang))
                status_icons.append(f"{lang.upper()}:{'✓' if has_t else '✗'}")
            print(f"   Folie {num:>2}: {t_de:<32} [{' '.join(status_icons)}]")

    print("\n" + "="*70 + "\n")

def cmd_apply():
    data = load_master()
    flat = flatten_data(data)
    os.makedirs(LOCALES_DIR, exist_ok=True)

    # 1. Export flat JSON locales
    for lang in LANGUAGES:
        loc_file = os.path.join(LOCALES_DIR, f"{lang}.json")
        with open(loc_file, "w", encoding="utf-8") as f:
            json.dump(flat[lang], f, ensure_ascii=False, indent=2)
        print(f"✓ Locale gespeichert: {os.path.relpath(loc_file, BASE_DIR)} ({len(flat[lang])} Schlüssel)")

    # 2. Generate js/translations-data.js
    js_content = """/**
 * Louis Renner Presentation 2025 - Complete Slide Deck Translations
 * Automatically compiled by translations/manage_translations.py.
 * Provides instant live localization across German, English, Japanese, and Chinese.
 */

window.slideTranslations = """ + json.dumps(flat, ensure_ascii=False, indent=2) + """;

// Automatically merge into global translations dictionary if loaded
if (typeof translations !== 'undefined') {
  for (const lang of ['de', 'en', 'ja', 'zh']) {
    if (window.slideTranslations[lang]) {
      translations[lang] = translations[lang] || {};
      Object.assign(translations[lang], window.slideTranslations[lang]);
    }
  }
}
"""
    with open(JS_DATA_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"✓ JS-Laufzeitdatei generiert: {os.path.relpath(JS_DATA_FILE, BASE_DIR)}")

    # 3. Inject data-i18n attributes into slide_definitions.py
    if os.path.exists(SLIDE_DEFS_FILE):
        with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
            defs_content = f.read()

        pattern = r'(<section class=\"slide[^\"]*\" data-slide=\"(\d+)\">)(.*?)(</section>)'
        
        def repl_section(m):
            start_tag = m.group(1)
            num = int(m.group(2))
            body = m.group(3)
            end_tag = m.group(4)

            # Injektionen
            # Category
            body = re.sub(r'<div class="slide-category"(?:\s+data-i18n="[^"]*")?>',
                          f'<div class="slide-category" data-i18n="s{num}_category">', body, count=1)
                          
            # Title
            body = re.sub(r'<(h[12]) class="(slide-title|hero-main-title)"(?:\s+data-i18n="[^"]*")?>',
                          rf'<\1 class="\2" data-i18n="s{num}_title">', body, count=1)
                          
            # Kicker (Slide 1)
            body = re.sub(r'<span class="hero-kicker"(?:\s+data-i18n="[^"]*")?>',
                          f'<span class="hero-kicker" data-i18n="s{num}_kicker">', body, count=1)

            # Subtitle
            body = re.sub(r'<div class="slide-subtitle"(?:\s+data-i18n="[^"]*")?>',
                          f'<div class="slide-subtitle" data-i18n="s{num}_subtitle">', body, count=1)
            # Hero Main Subtitle (Slide 1)
            body = re.sub(r'<p class="hero-main-subtitle"[^>]*>.*?</p>(\s*<p class="hero-main-subtitle"[^>]*>.*?</p>)*',
                          f'<p class="hero-main-subtitle" data-i18n="s{num}_subtitle">' +
                          data.get("slides", {}).get(f"slide_{num:02d}", {}).get("subtitle", {}).get("de", "") +
                          '</p>', body, flags=re.DOTALL)
                          
            # Badges
            b_cnt = [0]
            def b_repl(bm):
                b_cnt[0] += 1
                cls = bm.group(1).strip()
                return f'<span class="bento-badge {cls}" data-i18n="s{num}_b{b_cnt[0]}_badge">' if cls else f'<span class="bento-badge" data-i18n="s{num}_b{b_cnt[0]}_badge">'
            body = re.sub(r'<span class="bento-badge\s*([^">]*)"[^>]*>', b_repl, body)

            # Card titles
            ct_cnt = [0]
            def ct_repl(cm):
                ct_cnt[0] += 1
                cls = cm.group(1)
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', cm.group(2))
                return f'<div class="{cls}"{extra} data-i18n="s{num}_c{ct_cnt[0]}_title">'
            body = re.sub(r'<div class="(card-title|bento-card-title)"([^>]*)>', ct_repl, body)

            # Card descs
            cd_cnt = [0]
            def cd_repl(cm):
                cd_cnt[0] += 1
                cls = cm.group(1)
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', cm.group(2))
                return f'<div class="{cls}"{extra} data-i18n="s{num}_c{cd_cnt[0]}_desc">'
            body = re.sub(r'<div class="(card-desc|bento-card-desc)"([^>]*)>', cd_repl, body)

            # Bullets
            bu_cnt = [0]
            def bu_repl(bm):
                bu_cnt[0] += 1
                prefix = bm.group(1)
                return f'{prefix}<span data-i18n="s{num}_bullet_{bu_cnt[0]}">'
            body = re.sub(r'((?:<li class="bullet-item"[^>]*>|<div class="bento-card-list-item"[^>]*>)\s*<span class="(?:bullet-dot|bento-dot)[^"]*"></span>\s*)<span(?:\s+data-i18n="[^"]*")?>', bu_repl, body)

            # Captions
            cap_cnt = [0]
            def cap_repl(cm):
                cap_cnt[0] += 1
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', cm.group(2))
                return f'<div class="{cm.group(1)}"{extra} data-i18n="s{num}_caption_{cap_cnt[0]}">'
            body = re.sub(r'<div class="(media-caption|bento-media-caption|bento-media-subcaption)"([^>]*)>', cap_repl, body)

            return f"{start_tag}{body}{end_tag}"

        new_defs = re.sub(pattern, repl_section, defs_content, flags=re.DOTALL)
        with open(SLIDE_DEFS_FILE, "w", encoding="utf-8") as f:
            f.write(new_defs)
        print(f"✓ slide_definitions.py mit data-i18n Bindungen aktualisiert!")

    # 4. Rebuild index.html via build_full_presentation.py
    build_script = os.path.join(BASE_DIR, "build_full_presentation.py")
    if os.path.exists(build_script):
        os.system(f"python3 '{build_script}'")

    # 5. Ensure translations-data.js is referenced in index.html
    if os.path.exists(INDEX_HTML_FILE):
        with open(INDEX_HTML_FILE, "r", encoding="utf-8") as f:
            html = f.read()
        
        script_tag = '<script src="js/translations-data.js"></script>'
        if script_tag not in html:
            target = '<script src="js/translations.js"></script>'
            if target in html:
                html = html.replace(target, f"{target}\n  {script_tag}")
                with open(INDEX_HTML_FILE, "w", encoding="utf-8") as f:
                    f.write(html)
                print(f"✓ <script src=\"js/translations-data.js\"></script> in index.html eingebunden.")

    print("\n🎉 Alles erfolgreich kompiliert & synchronisiert! Starten Sie server.py oder laden Sie index.html neu.")

def cmd_export_csv(filepath):
    data = load_master()
    flat = flatten_data(data)
    
    if not filepath:
        filepath = os.path.join(TRANSLATIONS_DIR, "translations_export.csv")

    rows = []
    for s_key, s in data.get("slides", {}).items():
        num = s["slide_number"]
        ch = s.get("chapter", 1)

        # Category
        if "category" in s:
            k = f"s{num}_category"
            rows.append({
                "Key": k, "Slide": num, "Chapter": ch, "Element": "Kategorie",
                "DE": s["category"].get("de", ""),
                "EN": s["category"].get("en", ""),
                "JA": s["category"].get("ja", ""),
                "ZH": s["category"].get("zh", "")
            })

        # Title
        if "title" in s:
            k = f"s{num}_title"
            rows.append({
                "Key": k, "Slide": num, "Chapter": ch, "Element": "Titel",
                "DE": s["title"].get("de", ""),
                "EN": s["title"].get("en", ""),
                "JA": s["title"].get("ja", ""),
                "ZH": s["title"].get("zh", "")
            })

        # Subtitle
        if "subtitle" in s:
            k = f"s{num}_subtitle"
            rows.append({
                "Key": k, "Slide": num, "Chapter": ch, "Element": "Untertitel",
                "DE": s["subtitle"].get("de", ""),
                "EN": s["subtitle"].get("en", ""),
                "JA": s["subtitle"].get("ja", ""),
                "ZH": s["subtitle"].get("zh", "")
            })

        # Elements
        for el_key, el in s.get("elements", {}).items():
            el_type = "Karte-Titel" if "title" in el_key else ("Karte-Text" if "desc" in el_key else ("Aufzählung" if "bullet" in el_key else "Element"))
            rows.append({
                "Key": el_key, "Slide": num, "Chapter": ch, "Element": el_type,
                "DE": el.get("de", ""),
                "EN": el.get("en", ""),
                "JA": el.get("ja", ""),
                "ZH": el.get("zh", "")
            })

        # Notes
        if "notes" in s:
            k = f"s{num}_notes"
            rows.append({
                "Key": k, "Slide": num, "Chapter": ch, "Element": "Notizen",
                "DE": s["notes"].get("de", ""),
                "EN": s["notes"].get("en", ""),
                "JA": s["notes"].get("ja", ""),
                "ZH": s["notes"].get("zh", "")
            })

    # Write UTF-8 BOM so Excel opens it with umlauts & kanji cleanly
    with open(filepath, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["Key", "Slide", "Chapter", "Element", "DE", "EN", "JA", "ZH"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✓ {len(rows)} Textzeilen exportiert nach: {os.path.relpath(filepath, BASE_DIR)}")
    print("  Kann direkt in Microsoft Excel, Apple Numbers oder Google Sheets bearbeitet werden.")

def cmd_import_csv(filepath):
    if not os.path.exists(filepath):
        print(f"FEHLER: CSV-Datei nicht gefunden: {filepath}")
        sys.exit(1)

    data = load_master()
    updated_count = 0

    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            k = row.get("Key", "").strip()
            if not k: continue

            # Match slide number
            m = re.match(r's(\d+)_([a-zA-Z0-9_]+)', k)
            if not m: continue
            num = int(m.group(1))
            field = m.group(2)
            s_key = f"slide_{num:02d}"

            if s_key not in data.get("slides", {}): continue
            slide = data["slides"][s_key]

            for lang in LANGUAGES:
                val = row.get(lang.upper(), "").strip()
                if not val: continue

                if field == "category":
                    slide["category"][lang] = val
                elif field == "title":
                    slide["title"][lang] = val
                elif field == "subtitle":
                    slide["subtitle"][lang] = val
                elif field == "notes":
                    slide["notes"][lang] = val
                else:
                    if "elements" not in slide: slide["elements"] = {}
                    if k not in slide["elements"]: slide["elements"][k] = {}
                    slide["elements"][k][lang] = val
                
            updated_count += 1

    save_master(data)
    print(f"✓ {updated_count} Einträge aus {os.path.relpath(filepath, BASE_DIR)} erfolgreich importiert!")
    cmd_apply()

def cmd_sync_from_locales():
    data = load_master()
    count = 0

    for lang in LANGUAGES:
        loc_file = os.path.join(LOCALES_DIR, f"{lang}.json")
        if not os.path.exists(loc_file): continue
        with open(loc_file, "r", encoding="utf-8") as f:
            loc_dict = json.load(f)

        for k, val in loc_dict.items():
            m = re.match(r's(\d+)_([a-zA-Z0-9_]+)', k)
            if not m: continue
            num = int(m.group(1))
            field = m.group(2)
            s_key = f"slide_{num:02d}"

            if s_key not in data.get("slides", {}): continue
            slide = data["slides"][s_key]

            if field == "category":
                slide["category"][lang] = val
            elif field == "title":
                slide["title"][lang] = val
            elif field == "subtitle":
                slide["subtitle"][lang] = val
            elif field == "notes":
                slide["notes"][lang] = val
            else:
                if "elements" not in slide: slide["elements"] = {}
                if k not in slide["elements"]: slide["elements"][k] = {}
                slide["elements"][k][lang] = val
            count += 1

    save_master(data)
    print(f"✓ {count} Einträge aus Einzel-Locales synchronisiert!")
    cmd_apply()

def main():
    parser = argparse.ArgumentParser(description="Louis Renner Präsentation - Übersetzungs- & Text-Manager")
    parser.add_argument("--status", action="store_true", help="Zeigt aktuellen Übersetzungsstatus")
    parser.add_argument("--apply", "--build", action="store_true", help="Kompiliert Master-JSON in JS/HTML/Locales")
    parser.add_argument("--export-csv", nargs="?", const="", help="Exportiert Texte als CSV für Excel")
    parser.add_argument("--import-csv", help="Importiert bearbeitete CSV-Datei")
    parser.add_argument("--sync-from-locales", action="store_true", help="Synchronisiert bearbeitete Locales zurück")

    args = parser.parse_args()

    if args.status:
        cmd_status()
    elif args.apply:
        cmd_apply()
    elif args.export_csv is not None:
        cmd_export_csv(args.export_csv)
    elif args.import_csv:
        cmd_import_csv(args.import_csv)
    elif args.sync_from_locales:
        cmd_sync_from_locales()
    else:
        # Default action: status
        cmd_status()

if __name__ == "__main__":
    main()
