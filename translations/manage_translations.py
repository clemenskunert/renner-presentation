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

  python3 translations/manage_translations.py --export-xlsx [pfad.xlsx]
      Exportiert ALLE Präsentationstexte (Folien 01–33 inkl. aller interaktiven JS-Module,
      Referenten-Notizen und UI-Navigation) als formatierte Excel-Arbeitsmappe (.xlsx)
      für das Korrekturlesen in China (ZH) und Japan (JA).

  python3 translations/manage_translations.py --import-xlsx <pfad.xlsx> [--lang zh|ja|en|de]
      Importiert geprüfte Übersetzungen aus einer Excel-Datei (.xlsx) verlustfrei zurück in
      translations/slides_content.json UND alle interaktiven JS-Module und kompiliert neu.

  python3 translations/manage_translations.py --export-csv [pfad.csv]
      Exportiert alle Texte als UTF-8-BOM CSV-Tabelle.

  python3 translations/manage_translations.py --import-csv <pfad.csv> [--lang zh|ja|en|de]
      Importiert bearbeitete Übersetzungen aus einer CSV-Datei zurück.

  python3 translations/manage_translations.py --sync-from-locales
      Liest direkte Änderungen aus translations/locales/{de,en,ja,zh}.json zurück.
"""

import os
import sys
import re
import json
import csv
import argparse

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
if THIS_DIR not in sys.path:
    sys.path.insert(0, THIS_DIR)

import js_i18n_bridge
import xlsx_codec

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
window.TRANSLATIONS_DATA = window.slideTranslations;

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
                          
            # Title (preserve optional id/extra attributes)
            def title_repl(tm):
                tag = tm.group(1)
                cls = tm.group(2)
                rest = re.sub(r'\s*data-i18n="[^"]*"', '', tm.group(3) or '')
                return f'<{tag} class="{cls}"{rest} data-i18n="s{num}_title">'
            body = re.sub(r'<(h[12]) class="(slide-title|hero-main-title)"([^>]*)>',
                          title_repl, body, count=1)
                          
            # Kicker (Slide 1)
            body = re.sub(r'<span class="hero-kicker"(?:\s+data-i18n="[^"]*")?>',
                          f'<span class="hero-kicker" data-i18n="s{num}_kicker">', body, count=1)

            # Subtitle (preserve optional id/extra attributes)
            def sub_repl(sm):
                rest = re.sub(r'\s*data-i18n="[^"]*"', '', sm.group(1) or '')
                return f'<div class="slide-subtitle"{rest} data-i18n="s{num}_subtitle">'
            body = re.sub(r'<div class="slide-subtitle"([^>]*)>',
                          sub_repl, body, count=1)
            # Hero Main Subtitle (Slide 1)
            slide_entry = data.get("slides", {}).get(f"slide_{num}") or data.get("slides", {}).get(f"slide_{num:02d}", {})
            body = re.sub(r'<p class="hero-main-subtitle"[^>]*>.*?</p>(\s*<p class="hero-main-subtitle"[^>]*>.*?</p>)*',
                          f'<p class="hero-main-subtitle" data-i18n="s{num}_subtitle">' +
                          slide_entry.get("subtitle", {}).get("de", "") +
                          '</p>', body, flags=re.DOTALL)
                          
            # Badges
            b_cnt = [0]
            def b_repl(bm):
                b_cnt[0] += 1
                cls = bm.group(1).strip()
                rest = bm.group(2)
                m_existing = re.search(r'data-i18n="([^"]+)"', rest)
                key = m_existing.group(1) if (m_existing and m_existing.group(1) in flat["de"]) else f"s{num}_b{b_cnt[0]}_badge"
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', rest)
                return f'<span class="bento-badge {cls}"{extra} data-i18n="{key}">' if cls else f'<span class="bento-badge"{extra} data-i18n="{key}">'
            body = re.sub(r'<span class="bento-badge\s*([^">]*)"([^>]*)>', b_repl, body)

            # Card titles
            ct_cnt = [0]
            def ct_repl(cm):
                ct_cnt[0] += 1
                cls = cm.group(1)
                rest = cm.group(2)
                m_existing = re.search(r'data-i18n="([^"]+)"', rest)
                key = m_existing.group(1) if (m_existing and m_existing.group(1) in flat["de"]) else f"s{num}_c{ct_cnt[0]}_title"
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', rest)
                return f'<div class="{cls}"{extra} data-i18n="{key}">'
            body = re.sub(r'<div class="(card-title|bento-card-title)"([^>]*)>', ct_repl, body)

            # Card descs
            cd_cnt = [0]
            def cd_repl(cm):
                cd_cnt[0] += 1
                cls = cm.group(1)
                rest = cm.group(2)
                m_existing = re.search(r'data-i18n="([^"]+)"', rest)
                key = m_existing.group(1) if (m_existing and m_existing.group(1) in flat["de"]) else f"s{num}_c{cd_cnt[0]}_desc"
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', rest)
                return f'<div class="{cls}"{extra} data-i18n="{key}">'
            body = re.sub(r'<div class="(card-desc|bento-card-desc)"([^>]*)>', cd_repl, body)

            # Bullets
            bu_cnt = [0]
            def bu_repl(bm):
                bu_cnt[0] += 1
                prefix = bm.group(1)
                existing_key = bm.group(2)
                key = existing_key if (existing_key and existing_key in flat["de"]) else f"s{num}_bullet_{bu_cnt[0]}"
                return f'{prefix}<span data-i18n="{key}">'
            body = re.sub(r'((?:<li class="bullet-item"[^>]*>|<div class="bento-card-list-item"[^>]*>)\s*<span class="(?:bullet-dot|bento-dot)[^"]*"></span>\s*)<span(?:\s+data-i18n="([^"]*)")?>', bu_repl, body)

            # Captions
            cap_cnt = [0]
            def cap_repl(cm):
                cap_cnt[0] += 1
                rest = cm.group(2)
                m_existing = re.search(r'data-i18n="([^"]+)"', rest)
                key = m_existing.group(1) if (m_existing and m_existing.group(1) in flat["de"]) else f"s{num}_caption_{cap_cnt[0]}"
                extra = re.sub(r'\s*data-i18n="[^"]*"', '', rest)
                return f'<div class="{cm.group(1)}"{extra} data-i18n="{key}">'
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
        if 'js/translations-data.js' not in html:
            m_target = re.search(r'<script\s+src="js/translations\.js(?:\?[^"]*)?"></script>', html)
            if m_target:
                html = html.replace(m_target.group(0), f"{m_target.group(0)}\n  {script_tag}")
                with open(INDEX_HTML_FILE, "w", encoding="utf-8") as f:
                    f.write(html)
                print(f"✓ <script src=\"js/translations-data.js\"></script> in index.html eingebunden.")

    print("\n🎉 Alles erfolgreich kompiliert & synchronisiert! Starten Sie server.py oder laden Sie index.html neu.")

REVIEW_HEADERS = [
    "ID",
    "Slide",
    "Context",
    "Type",
    "DE (Deutsch)",
    "EN (English)",
    "ZH (简体中文)",
    "JA (日本語)",
    "Review_Note",
]


def _classify_element_type(el_key):
    if "badge" in el_key or "pill" in el_key or "tag" in el_key:
        return "Badge / Label"
    if "title" in el_key or "heading" in el_key:
        return "Karte-Titel / Card Title"
    if "subtitle" in el_key or "sub" in el_key:
        return "Untertitel / Subtitle"
    if "bullet" in el_key:
        return "Aufzählung / Bullet"
    if "fact" in el_key or "rule" in el_key:
        return "Merksatz / Key Takeaway"
    if "caption" in el_key or "cap" in el_key:
        return "Bildunterschrift / Caption"
    if "kpi" in el_key or "_val" in el_key:
        return "Kennzahl / Metric"
    if "desc" in el_key or "body" in el_key or "txt" in el_key:
        return "Fließtext / Description"
    return "Folien-Element / Element"


def collect_all_review_rows():
    """
    Sammelt 100 % aller mehrsprachigen Texte der gesamten Präsentation:
      - slides_entries: Alle sichtbaren Texte der Folien 01–33 (JSON + interaktive JS-Module) in Folienreihenfolge
      - notes_entries:  Alle Referenten-Notizen der Folien 01–33
      - ui_entries:     Globale UI- & Navigationsbegriffe (slides_content.json["ui"] + js/translations.js)
    Jeder Eintrag besitzt eine eindeutige, deterministische ID für den verlustfreien Re-Import.
    """
    data = load_master()
    js_entries = js_i18n_bridge.extract_all_js_entries(BASE_DIR)

    js_by_slide = {}
    for je in js_entries:
        js_by_slide.setdefault(je["slide"], []).append(je)

    slide_rows = []
    notes_rows = []
    ui_rows = []

    slides_dict = data.get("slides", {})
    sorted_slide_keys = sorted(slides_dict.keys(), key=lambda k: slides_dict[k].get("slide_number", 999))

    for s_key in sorted_slide_keys:
        s = slides_dict[s_key]
        num = s["slide_number"]
        slide_lbl = f"Slide {num:02d}"
        ch_de = s.get("chapter_name", {}).get("de", f"Kapitel {s.get('chapter', 1)}")
        ctx_base = f"Folie {num:02d} • {s.get('title', {}).get('en', '')[:38]}"

        for field, typ_lbl in [
            ("category", "Kategorie / Category"),
            ("kicker", "Dachzeile / Kicker"),
            ("title", "Folientitel / Slide Title"),
            ("subtitle", "Untertitel / Subtitle"),
        ]:
            if field in s and any(s[field].get(l) for l in LANGUAGES):
                slide_rows.append({
                    "ID": f"JSON::{s_key}::{field}",
                    "Slide": slide_lbl,
                    "Context": ctx_base,
                    "Type": typ_lbl,
                    "DE": s[field].get("de", ""),
                    "EN": s[field].get("en", ""),
                    "ZH": s[field].get("zh", ""),
                    "JA": s[field].get("ja", ""),
                    "Note": "",
                })

        for el_key, el_dict in s.get("elements", {}).items():
            slide_rows.append({
                "ID": f"JSON::{s_key}::elements::{el_key}",
                "Slide": slide_lbl,
                "Context": f"Folie {num:02d} • {el_key}",
                "Type": _classify_element_type(el_key),
                "DE": el_dict.get("de", ""),
                "EN": el_dict.get("en", ""),
                "ZH": el_dict.get("zh", ""),
                "JA": el_dict.get("ja", ""),
                "Note": "",
            })

        # Interaktive JS-Texte dieser Folie direkt im Anschluss einfügen!
        for je in js_by_slide.get(num, []):
            langs = je["langs"]
            slide_rows.append({
                "ID": f"JS::{je['id']}",
                "Slide": slide_lbl,
                "Context": f"{je['module_label']} → {je['subpath']}",
                "Type": f"Interaktiv ({_classify_element_type(je['subpath'])})",
                "DE": langs.get("de", {}).get("val", ""),
                "EN": langs.get("en", {}).get("val", ""),
                "ZH": langs.get("zh", {}).get("val", ""),
                "JA": langs.get("ja", {}).get("val", ""),
                "Note": "",
            })

        if "notes" in s and any(s["notes"].get(l) for l in LANGUAGES):
            notes_rows.append({
                "ID": f"JSON::{s_key}::notes",
                "Slide": slide_lbl,
                "Context": f"{ch_de} • Folie {num:02d}",
                "Type": "Referenten-Notiz / Speaker Note",
                "DE": s["notes"].get("de", ""),
                "EN": s["notes"].get("en", ""),
                "ZH": s["notes"].get("zh", ""),
                "JA": s["notes"].get("ja", ""),
                "Note": "",
            })

    # UI Strings aus slides_content.json
    for ui_key, ui_dict in data.get("ui", {}).items():
        ui_rows.append({
            "ID": f"JSON::ui::{ui_key}",
            "Slide": "UI Global",
            "Context": f"UI Master (slides_content.json) → {ui_key}",
            "Type": "UI / Navigation",
            "DE": ui_dict.get("de", ""),
            "EN": ui_dict.get("en", ""),
            "ZH": ui_dict.get("zh", ""),
            "JA": ui_dict.get("ja", ""),
            "Note": "",
        })

    # UI Strings aus js/translations.js
    for je in js_by_slide.get(0, []):
        langs = je["langs"]
        ui_rows.append({
            "ID": f"JS::{je['id']}",
            "Slide": "UI Global",
            "Context": f"{je['module_label']} → {je['subpath']}",
            "Type": "UI / Fachbegriff",
            "DE": langs.get("de", {}).get("val", ""),
            "EN": langs.get("en", {}).get("val", ""),
            "ZH": langs.get("zh", {}).get("val", ""),
            "JA": langs.get("ja", {}).get("val", ""),
            "Note": "",
        })

    return slide_rows, notes_rows, ui_rows


def _format_sheet_rows(dict_rows):
    styled = [[(h, 1) for h in REVIEW_HEADERS]]
    for r in dict_rows:
        styled.append([
            (r["ID"], 2),
            (r["Slide"], 2),
            (r["Context"], 2),
            (r["Type"], 2),
            (r["DE"], 3),
            (r["EN"], 3),
            (r["ZH"], 4),
            (r["JA"], 4),
            (r.get("Note", ""), 5),
        ])
    return styled


def cmd_export_xlsx(filepath=""):
    if not filepath:
        filepath = os.path.join(TRANSLATIONS_DIR, "Louis_Renner_Uebersetzungen_Review_DE_EN_ZH_JA.xlsx")

    slide_rows, notes_rows, ui_rows = collect_all_review_rows()

    instr_rows = [
        [("LOUIS RENNER MASTERCLASS — TRANSLATION REVIEW WORKBOOK (DE • EN • ZH • JA)", 1), ("", 1)],
        [("🇩🇪 Anleitung (Deutsch)", 6), (
            "1. Alle sichtbaren Folientexte (Folien 01–33 inkl. aller interaktiven Grafiken & Reiter) befinden sich im Tabellenblatt '1_Folientexte_Slides_01-33' exakt in Folienreihenfolge.\n"
            "2. Bitte bearbeiten Sie direkt die Spalten 'ZH (简体中文)' bzw. 'JA (日本語)' (oder 'DE'/'EN'). Rückfragen können in 'Review_Note' eingetragen werden.\n"
            "3. WICHTIG: Bitte die Spalte 'ID' (Spalte A) NICHT verändern! HTML-Tags wie <strong>...</strong> oder <em>...</em> sowie Variablen wie ${tau} bitte beibehalten.\n"
            "4. Re-Import Befehl:\n"
            "   • Alle Änderungen importieren:  python3 translations/manage_translations.py --import-xlsx <datei.xlsx>\n"
            "   • Nur Chinesisch importieren:   python3 translations/manage_translations.py --import-xlsx <datei_china.xlsx> --lang zh\n"
            "   • Nur Japanisch importieren:    python3 translations/manage_translations.py --import-xlsx <datei_japan.xlsx> --lang ja", 0
        )],
        [("🇬🇧 Instructions (English)", 6), (
            "1. Sheet '1_Folientexte_Slides_01-33' contains all visible texts from Slide 01 to Slide 33 in exact presentation order (including all interactive tabs, timelines, and voicing diagrams).\n"
            "2. Edit the target language column ('ZH (简体中文)' or 'JA (日本語)') directly. Optional comments/questions can be added in 'Review_Note'.\n"
            "3. IMPORTANT: Do NOT modify Column A ('ID'). Please preserve inline formatting tags (<strong>...</strong>, <em>...</em>) and dynamic placeholders (${...}) where present.", 0
        )],
        [("🇨🇳 审校说明（简体中文）", 6), (
            "1. 工作表 '1_Folientexte_Slides_01-33' 按第 01–33 页顺序收录了演示文稿的全部幻灯片文本（含所有交互式图表、历史时间轴与整音分区），可直接对照中文版 PDF 逐页审校。\n"
            "2. 请直接在第 G 列 'ZH (简体中文)' 中修改译文；如有疑问或备注，请填写在第 I 列 'Review_Note' 中。\n"
            "3. 重要提示：请勿修改第 A 列 'ID'！若原文中含有 <strong>...</strong>、<em>...</em> 加粗/斜体标签或 ${...} 动态数值占位符，请予以保留。", 0
        )],
        [("🇯🇵 校正ガイド（日本語）", 6), (
            "1. シート '1_Folientexte_Slides_01-33' には、スライド 01〜33 の全テキスト（インタラクティブ図解・歴史年表・整音ゾーンを含む）がスライド順に収録されています。日本語版 PDF と並べてご確認いただけます。\n"
            "2. H列 'JA (日本語)' のセルを直接修正してください。コメントや確認事項がある場合は I列 'Review_Note' にご記入ください。\n"
            "3. 重要：A列 'ID' は変更しないでください。また、<strong>...</strong> や <em>...</em> などの書式タグ、および ${...} の数値プレースホルダーはそのまま維持してください。", 0
        )],
        [("📊 Umfang / Scope", 6), (
            f"• Blatt 1 (1_Folientexte_Slides_01-33): {len(slide_rows)} Zeilen (alle Folien & interaktiven Grafiken)\n"
            f"• Blatt 2 (2_Referenten_Notizen): {len(notes_rows)} Zeilen (optionale Sprechernotizen)\n"
            f"• Blatt 3 (3_UI_Navigation): {len(ui_rows)} Zeilen (Menüs & Schaltflächen)\n"
            f"• Gesamt: {len(slide_rows) + len(notes_rows) + len(ui_rows)} mehrsprachige Text-Einträge", 0
        )],
    ]

    col_widths_data = [36, 12, 34, 22, 48, 48, 48, 48, 34]
    sheets = [
        {
            "name": "Anleitung_Instructions",
            "col_widths": [32, 115],
            "freeze_header": True,
            "auto_filter": False,
            "rows": instr_rows,
        },
        {
            "name": "1_Folientexte_Slides_01-33",
            "col_widths": col_widths_data,
            "freeze_header": True,
            "auto_filter": True,
            "rows": _format_sheet_rows(slide_rows),
        },
        {
            "name": "2_Referenten_Notizen",
            "col_widths": col_widths_data,
            "freeze_header": True,
            "auto_filter": True,
            "rows": _format_sheet_rows(notes_rows),
        },
        {
            "name": "3_UI_Navigation",
            "col_widths": col_widths_data,
            "freeze_header": True,
            "auto_filter": True,
            "rows": _format_sheet_rows(ui_rows),
        },
    ]

    os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
    xlsx_codec.write_xlsx(filepath, sheets)
    total = len(slide_rows) + len(notes_rows) + len(ui_rows)
    print(f"✓ Excel-Review-Arbeitsmappe exportiert ({total} Einträge in 4 Blättern): {filepath}")


def _extract_lang_cols(row_dict):
    """Liest ID + DE/EN/ZH/JA flexibel unabhängig von Klammerzusätzen im Spaltenkopf."""
    rid = (row_dict.get("ID") or row_dict.get("Key") or "").strip()
    langs = {}
    for k, v in row_dict.items():
        if v is None:
            continue
        ku = k.strip().upper()
        if ku == "DE" or ku.startswith("DE "):
            langs["de"] = v
        elif ku == "EN" or ku.startswith("EN "):
            langs["en"] = v
        elif ku == "ZH" or ku.startswith("ZH "):
            langs["zh"] = v
        elif ku == "JA" or ku.startswith("JA "):
            langs["ja"] = v
    return rid, langs


def _apply_imported_records(records, lang_filter=None):
    """
    Wendet importierte Zeilen (aus XLSX oder CSV) verlustfrei auf slides_content.json
    UND alle interaktiven JS-Dateien an und führt anschließend cmd_apply() aus.
    """
    allowed_langs = set(lang_filter) if lang_filter else set(LANGUAGES)
    data = load_master()

    json_updates = {l: 0 for l in LANGUAGES}
    js_updates_payload = {}

    for row in records:
        rid, row_langs = _extract_lang_cols(row)
        if not rid:
            continue

        if rid.startswith("JSON::"):
            parts = rid.split("::")
            # JSON::ui::<key>  OR  JSON::slide_X::<field>  OR  JSON::slide_X::elements::<el_key>
            target_dict = None
            if len(parts) == 3 and parts[1] == "ui":
                ui_key = parts[2]
                data.setdefault("ui", {}).setdefault(ui_key, {})
                target_dict = data["ui"][ui_key]
            elif len(parts) == 3 and parts[1] in data.get("slides", {}):
                s_key, field = parts[1], parts[2]
                data["slides"][s_key].setdefault(field, {})
                target_dict = data["slides"][s_key][field]
            elif len(parts) == 4 and parts[1] in data.get("slides", {}) and parts[2] == "elements":
                s_key, el_key = parts[1], parts[3]
                data["slides"][s_key].setdefault("elements", {}).setdefault(el_key, {})
                target_dict = data["slides"][s_key]["elements"][el_key]

            if target_dict is not None:
                for lang in allowed_langs:
                    new_val = row_langs.get(lang)
                    if new_val is not None and new_val.strip() != "":
                        if target_dict.get(lang, "") != new_val:
                            target_dict[lang] = new_val
                            json_updates[lang] += 1

        elif rid.startswith("JS::"):
            js_id = rid[4:]
            js_updates_payload[js_id] = {l: row_langs[l] for l in allowed_langs if l in row_langs}

    total_json = sum(json_updates.values())
    if total_json > 0:
        save_master(data)

    js_cells_changed, touched_js = js_i18n_bridge.apply_js_updates(
        BASE_DIR, js_updates_payload, allowed_langs=allowed_langs
    )

    print(f"✓ Import-Ergebnis (Sprachen: {', '.join(sorted(allowed_langs)).upper()}):")
    print(f"  • Geänderte JSON-Zellen (slides_content.json): {total_json} {json_updates}")
    print(f"  • Geänderte JS-Zellen (interaktive Module):    {js_cells_changed} in {len(touched_js)} Datei(en)")
    if touched_js:
        for tf in touched_js:
            print(f"    - {tf} (JSC-Syntaxprüfung bestanden ✓)")

    cmd_apply()


def cmd_import_xlsx(filepath, lang_filter=None):
    if not os.path.exists(filepath):
        print(f"FEHLER: Excel-Datei nicht gefunden: {filepath}")
        sys.exit(1)
    sheets = xlsx_codec.read_xlsx(filepath)
    all_rows = []
    for sh_name, rows in sheets.items():
        if sh_name.startswith("Anleitung"):
            continue
        all_rows.extend(rows)
    _apply_imported_records(all_rows, lang_filter=lang_filter)


def cmd_export_csv(filepath):
    if not filepath:
        filepath = os.path.join(TRANSLATIONS_DIR, "translations_export.csv")

    slide_rows, notes_rows, ui_rows = collect_all_review_rows()
    all_rows = slide_rows + notes_rows + ui_rows

    with open(filepath, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=REVIEW_HEADERS)
        writer.writeheader()
        for r in all_rows:
            writer.writerow({
                "ID": r["ID"],
                "Slide": r["Slide"],
                "Context": r["Context"],
                "Type": r["Type"],
                "DE (Deutsch)": r["DE"],
                "EN (English)": r["EN"],
                "ZH (简体中文)": r["ZH"],
                "JA (日本語)": r["JA"],
                "Review_Note": r.get("Note", ""),
            })

    print(f"✓ {len(all_rows)} Textzeilen (inkl. interaktiver JS-Module) exportiert nach: {filepath}")


def cmd_import_csv(filepath, lang_filter=None):
    if not os.path.exists(filepath):
        print(f"FEHLER: CSV-Datei nicht gefunden: {filepath}")
        sys.exit(1)
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = list(csv.DictReader(f))
    _apply_imported_records(reader, lang_filter=lang_filter)


def cmd_sync_from_locales():
    data = load_master()
    # Build reverse lookup from flat key -> (s_key, field_or_element)
    key_lookup = {}
    for ui_k in data.get("ui", {}):
        key_lookup[ui_k] = ("ui", ui_k, None)
    for s_key, s in data.get("slides", {}).items():
        num = s["slide_number"]
        for field in ("category", "kicker", "title", "subtitle", "notes"):
            if field in s:
                key_lookup[f"s{num}_{field}"] = ("slide_field", s_key, field)
        for el_k in s.get("elements", {}):
            key_lookup[el_k] = ("slide_elem", s_key, el_k)

    count = 0
    for lang in LANGUAGES:
        loc_file = os.path.join(LOCALES_DIR, f"{lang}.json")
        if not os.path.exists(loc_file):
            continue
        with open(loc_file, "r", encoding="utf-8") as f:
            loc_dict = json.load(f)

        for k, val in loc_dict.items():
            if k not in key_lookup:
                continue
            kind, p1, p2 = key_lookup[k]
            if kind == "ui":
                if data["ui"][p1].get(lang) != val:
                    data["ui"][p1][lang] = val
                    count += 1
            elif kind == "slide_field":
                if data["slides"][p1][p2].get(lang) != val:
                    data["slides"][p1][p2][lang] = val
                    count += 1
            elif kind == "slide_elem":
                if data["slides"][p1]["elements"][p2].get(lang) != val:
                    data["slides"][p1]["elements"][p2][lang] = val
                    count += 1

    save_master(data)
    print(f"✓ {count} geänderte Einträge aus Einzel-Locales synchronisiert!")
    cmd_apply()


def main():
    parser = argparse.ArgumentParser(description="Louis Renner Präsentation - Übersetzungs- & Text-Manager")
    parser.add_argument("--status", action="store_true", help="Zeigt aktuellen Übersetzungsstatus")
    parser.add_argument("--apply", "--build", action="store_true", help="Kompiliert Master-JSON in JS/HTML/Locales")
    parser.add_argument("--export-xlsx", nargs="?", const="", help="Exportiert alle Texte als Excel-Arbeitsmappe (.xlsx)")
    parser.add_argument("--import-xlsx", help="Importiert geprüfte Excel-Arbeitsmappe (.xlsx)")
    parser.add_argument("--export-csv", nargs="?", const="", help="Exportiert alle Texte als UTF-8 CSV")
    parser.add_argument("--import-csv", help="Importiert bearbeitete CSV-Datei")
    parser.add_argument("--lang", help="Optionaler Sprachfilter beim Import, z. B. --lang zh oder --lang ja,zh")
    parser.add_argument("--sync-from-locales", action="store_true", help="Synchronisiert bearbeitete Locales zurück")

    args = parser.parse_args()
    lang_filter = [x.strip().lower() for x in args.lang.split(",") if x.strip()] if args.lang else None

    if args.status:
        cmd_status()
    elif args.apply:
        cmd_apply()
    elif args.export_xlsx is not None:
        cmd_export_xlsx(args.export_xlsx)
    elif args.import_xlsx:
        cmd_import_xlsx(args.import_xlsx, lang_filter=lang_filter)
    elif args.export_csv is not None:
        cmd_export_csv(args.export_csv)
    elif args.import_csv:
        cmd_import_csv(args.import_csv, lang_filter=lang_filter)
    elif args.sync_from_locales:
        cmd_sync_from_locales()
    else:
        cmd_status()


if __name__ == "__main__":
    main()
