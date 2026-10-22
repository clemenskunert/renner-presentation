#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/remove_module_5.py
Removes Module 5 (slides 35 to 54) and renumbers slides 55-65 to 35-45.
Updates:
- translations/slides_content.json
- slide_definitions.py
- css/presentation.css (adding modern animations for the 5-module outline)
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDES_CONTENT_FILE = os.path.join(BASE_DIR, "translations", "slides_content.json")
SLIDE_DEFS_FILE = os.path.join(BASE_DIR, "slide_definitions.py")
CSS_FILE = os.path.join(BASE_DIR, "css", "presentation.css")

def migrate_slides_content():
    print("▶ Updating translations/slides_content.json...")
    with open(SLIDES_CONTENT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Update _meta
    if "_meta" in data:
        data["_meta"]["total_slides"] = 45

    # 2. Update slide_02
    s2 = data["slides"]["slide_02"]
    s2["title"] = {
        "de": "Die 5 Kernmodule der Renner Masterclass",
        "en": "The 5 Core Modules of the Renner Masterclass",
        "ja": "レンナー・マスタークラスの5大コアモジュール",
        "zh": "雷诺大师课五大核心技术模块"
    }

    # Backup old s2_c6 values before remapping
    old_c6_title = s2["elements"].get("s2_c6_title", {
        "de": "Intonation",
        "en": "Voicing & Intonation",
        "ja": "整音技術（イントネーション）",
        "zh": "极致声音整音艺术"
    })
    old_c6_desc = s2["elements"].get("s2_c6_desc", {
        "de": "Das Uhren-Modell, 4 dynamische Keile (ff, f, p, pp), Pre-Needling, Saitennivellierung, Kronenabzug und Una-Corda-Feinabstimmung.",
        "en": "The clock dial model, 4 dynamic sound wedges (ff, f, p, pp), pre-needling, string leveling, crown shaping, and una corda voicing.",
        "ja": "クロック（時計盤）モデル、4つのダイナミック領域（ff, f, p, pp）、事前針刺し、弦合わせ、クラウン研磨、ウナ・コルダ微調整。",
        "zh": "时钟表盘整音法、四层动态音色扇区（ff, f, p, pp）、预刺针、三弦平整度校准、槌顶弧度修整与左踏板弱音极细调谐。"
    })

    # Remove old module 5 (s2_c5) and module 6 keys
    new_s2_elements = {}
    for k in ["s2_b1_badge", "s2_b2_badge", "s2_b3_badge", "s2_b4_badge", "s2_b5_badge"]:
        if k in s2["elements"]:
            new_s2_elements[k] = s2["elements"][k]
        elif k == "s2_b5_badge":
            new_s2_elements[k] = {"de": "MODUL 5", "en": "MODULE 5", "ja": "モジュール 5", "zh": "模块 5"}

    for k in ["s2_c1_title", "s2_c2_title", "s2_c3_title", "s2_c4_title"]:
        if k in s2["elements"]:
            new_s2_elements[k] = s2["elements"][k]
    # s2_c5_title is now Intonation!
    new_s2_elements["s2_c5_title"] = old_c6_title

    for k in ["s2_c1_desc", "s2_c2_desc", "s2_c3_desc", "s2_c4_desc"]:
        if k in s2["elements"]:
            new_s2_elements[k] = s2["elements"][k]
    # s2_c5_desc is now Intonation description!
    new_s2_elements["s2_c5_desc"] = old_c6_desc

    s2["elements"] = new_s2_elements

    s2["notes"] = {
        "de": "Folie 2: Die 5 Kernmodule der Masterclass vorstellen: Geschichte & Hauptsitz Meuselwitz, Filz Herstellung in Wurzen, Hammerkopf Fertigung, das neue Yamaha KIT als Highlight sowie die Hohe Schule der Intonation.",
        "en": "Slide 2: Introduce the 5 core modules of the masterclass: History & Headquarters in Meuselwitz, Felt Manufacturing in Wurzen, Hammerhead Production, the new Yamaha KIT as a highlight, and the Art of Voicing.",
        "ja": "スライド 2: マスタークラスの5大主要モジュール（歴史とモイゼルヴィッツ新拠点、ヴルツェンでのフェルト製造、ハンマーヘッド製造、注目ハイライトのヤマハKIT、至高の整音技術）を紹介します。",
        "zh": "第 2 页：介绍大师课五大核心技术模块：品牌历史与莫伊瑟尔维茨新总部、德国顶尖纯羊毛毡制造工艺、高精弦槌精密制造、重磅新品雅马哈高定套件（Yamaha KIT），以及极致声音整音艺术。"
    }

    # 3. Build new slides dictionary
    new_slides = {}

    # Copy slides 1 to 34
    for i in range(1, 35):
        k = f"slide_{i:02d}"
        if k in data["slides"]:
            new_slides[k] = data["slides"][k]
        else:
            print(f"Warning: {k} missing in slides_content.json")

    # Migrate slides 55..65 to 35..45
    for old_num in range(55, 66):
        new_num = old_num - 20
        old_k = f"slide_{old_num:02d}"
        new_k = f"slide_{new_num:02d}"

        if old_k not in data["slides"]:
            print(f"Warning: {old_k} missing in slides_content.json")
            continue

        slide_data = data["slides"][old_k]
        slide_data["slide_number"] = new_num
        slide_data["chapter"] = 5
        slide_data["chapter_name"] = {
            "de": "Teil 5: Die Hohe Schule der Intonation",
            "en": "Part 5: Master Voicing & Intonation",
            "ja": "第5部：至高の整音技術",
            "zh": "第五部分：极致整音艺术"
        }

        # Update category strings
        if "category" in slide_data:
            cat = slide_data["category"]
            if "de" in cat:
                cat["de"] = cat["de"].replace("Teil 7:", "Teil 5:")
            if "en" in cat:
                cat["en"] = cat["en"].replace("Part 7:", "Part 5:")
            if "ja" in cat:
                cat["ja"] = cat["ja"].replace("第7部:", "第5部:")
            if "zh" in cat:
                cat["zh"] = cat["zh"].replace("第七部分:", "第5部分:").replace("第7部分:", "第5部分:")

        # Update elements keys: s55_* -> s35_* etc.
        old_elements = slide_data.get("elements", {})
        new_elements = {}
        old_prefix = f"s{old_num}_"
        new_prefix = f"s{new_num}_"

        for el_key, el_val in old_elements.items():
            migrated_key = el_key.replace(old_prefix, new_prefix, 1)
            # Update any textual references in the values
            if isinstance(el_val, dict):
                migrated_val = {}
                for lang_k, text_v in el_val.items():
                    if isinstance(text_v, str):
                        text_v = text_v.replace("Teil 7", "Teil 5").replace("Part 7", "Part 5").replace("第7部", "第5部")
                    migrated_val[lang_k] = text_v
            else:
                migrated_val = el_val
            new_elements[migrated_key] = migrated_val

        slide_data["elements"] = new_elements

        # Update notes
        if "notes" in slide_data:
            notes = slide_data["notes"]
            if "de" in notes and isinstance(notes["de"], str):
                notes["de"] = notes["de"].replace(f"Folie {old_num}:", f"Folie {new_num}:").replace("Teil 7", "Teil 5")
            if "en" in notes and isinstance(notes["en"], str):
                notes["en"] = notes["en"].replace(f"Slide {old_num}:", f"Slide {new_num}:").replace("Part 7", "Part 5")
            if "ja" in notes and isinstance(notes["ja"], str):
                notes["ja"] = notes["ja"].replace(f"スライド {old_num}:", f"スライド {new_num}:").replace("第7部", "第5部")
            if "zh" in notes and isinstance(notes["zh"], str):
                notes["zh"] = notes["zh"].replace(f"第 {old_num} 页:", f"第 {new_num} 页:").replace(f"第{old_num}页:", f"第{new_num}页:").replace("第七部分", "第五部分")

        new_slides[new_k] = slide_data

    data["slides"] = new_slides

    with open(SLIDES_CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✓ slides_content.json successfully updated! Total slides: {len(new_slides)}")

if __name__ == "__main__":
    migrate_slides_content()
