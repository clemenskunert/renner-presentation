#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
image_manager_backend.py
Backend service for the Louis Renner Media & Image Caption Manager.
Extracts, catalogs, updates, and synchronizes all image captions across
slide_definitions.py, translations/slides_content.json, and js/history-journey.js.
"""

import os
import sys
import re
import json
import csv
import io

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SLIDE_DEFS_FILE = os.path.join(BASE_DIR, "slide_definitions.py")
SLIDES_CONTENT_FILE = os.path.join(BASE_DIR, "translations", "slides_content.json")
HISTORY_JS_FILE = os.path.join(BASE_DIR, "js", "history-journey.js")
TIMELAPSE_JS_FILE = os.path.join(BASE_DIR, "js", "timelapse.js")
TRANSFORMATION_JS_FILE = os.path.join(BASE_DIR, "js", "transformation-journey.js")
BUILD_SCRIPT = os.path.join(BASE_DIR, "build_full_presentation.py")
MANAGE_TRANS_SCRIPT = os.path.join(BASE_DIR, "translations", "manage_translations.py")


def load_master_json():
    if not os.path.exists(SLIDES_CONTENT_FILE):
        return {}
    with open(SLIDES_CONTENT_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_master_json(data):
    with open(SLIDES_CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def get_all_catalog_images():
    """
    Parses and aggregates all images and videos from the presentation:
    - Slide 3 (History Milestones in slide_definitions.py & js/history-journey.js)
    - Slide 4 (Baudokumentation in slide_definitions.py & js/timelapse.js)
    - Slides 5 - 68 (All media in slide_definitions.py linked with data-i18n & translations/slides_content.json)
    """
    master_json = load_master_json()
    slides_dict = master_json.get("slides", {})

    with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
        sd_code = f.read()

    import slide_definitions
    all_html = slide_definitions.get_all_slides_html()

    items = []
    seen_keys = set()

    # 1. PARSE SLIDE 3: History Milestones
    # Extract history_milestones_data directly from slide_definitions code
    s3_match = re.search(r'history_milestones_data\s*=\s*\[(.*?)\]\s*\n\s*panels_html', sd_code, re.DOTALL)
    if s3_match:
        # Use history-journey.js for rich multilingual captions
        hj_captions = {}
        if os.path.exists(HISTORY_JS_FILE):
            with open(HISTORY_JS_FILE, "r", encoding="utf-8") as hj_f:
                hj_content = hj_f.read()
            # Extract milestones from js
            # We can match id, year, image, images, imageCaption, imageCaptions
            for m_idx in range(9):
                # Search block for milestone m_idx
                block_m = re.search(rf'{m_idx}:\s*\{{(.*?)\n\s*\}},\s*\n\s*(?:{m_idx+1}:|\}};\s*\n\s*this\.milestoneCount)', hj_content, re.DOTALL)
                if block_m:
                    block_txt = block_m.group(1)
                    # year
                    yr = re.search(r"year:\s*['\"]([^'\"]+)['\"]", block_txt)
                    year_val = yr.group(1) if yr else f"Meilenstein {m_idx+1}"
                    # images
                    imgs_m = re.search(r"images:\s*\[(.*?)\]", block_txt, re.DOTALL)
                    imgs_list = [i.strip().strip("'\"") for i in imgs_m.group(1).split(",") if i.strip().strip("'\"")] if imgs_m else []
                    single_img = re.search(r"image:\s*['\"]([^'\"]+)['\"]", block_txt)
                    if not imgs_list and single_img:
                        imgs_list = [single_img.group(1)]

                    # Captions in DE
                    de_cap = re.search(r"imageCaption:\s*\{[^}]*de:\s*['\"]([^'\"]+)['\"]", block_txt, re.DOTALL)
                    de_single = de_cap.group(1) if de_cap else ""
                    
                    de_caps_m = re.search(r"imageCaptions:\s*\{[^}]*de:\s*\[(.*?)\]", block_txt, re.DOTALL)
                    de_caps_list = []
                    if de_caps_m:
                        de_caps_list = [c.strip().strip("'\"") for c in re.findall(r"['\"]([^'\"]+)['\"]", de_caps_m.group(1))]

                    # Captions in EN
                    en_cap = re.search(r"imageCaption:\s*\{[^}]*en:\s*['\"]([^'\"]+)['\"]", block_txt, re.DOTALL)
                    en_single = en_cap.group(1) if en_cap else ""
                    en_caps_m = re.search(r"imageCaptions:\s*\{[^}]*en:\s*\[(.*?)\]", block_txt, re.DOTALL)
                    en_caps_list = [c.strip().strip("'\"") for c in re.findall(r"['\"]([^'\"]+)['\"]", en_caps_m.group(1))] if en_caps_m else []

                    # Captions in JA
                    ja_cap = re.search(r"imageCaption:\s*\{[^}]*ja:\s*['\"]([^'\"]+)['\"]", block_txt, re.DOTALL)
                    ja_single = ja_cap.group(1) if ja_cap else ""
                    ja_caps_m = re.search(r"imageCaptions:\s*\{[^}]*ja:\s*\[(.*?)\]", block_txt, re.DOTALL)
                    ja_caps_list = [c.strip().strip("'\"") for c in re.findall(r"['\"]([^'\"]+)['\"]", ja_caps_m.group(1))] if ja_caps_m else []

                    # Captions in ZH
                    zh_cap = re.search(r"imageCaption:\s*\{[^}]*zh:\s*['\"]([^'\"]+)['\"]", block_txt, re.DOTALL)
                    zh_single = zh_cap.group(1) if zh_cap else ""
                    zh_caps_m = re.search(r"imageCaptions:\s*\{[^}]*zh:\s*\[(.*?)\]", block_txt, re.DOTALL)
                    zh_caps_list = [c.strip().strip("'\"") for c in re.findall(r"['\"]([^'\"]+)['\"]", zh_caps_m.group(1))] if zh_caps_m else []

                    for img_i, img_src in enumerate(imgs_list):
                        c_de = de_caps_list[img_i] if img_i < len(de_caps_list) else de_single
                        c_en = en_caps_list[img_i] if img_i < len(en_caps_list) else en_single
                        c_ja = ja_caps_list[img_i] if img_i < len(ja_caps_list) else ja_single
                        c_zh = zh_caps_list[img_i] if img_i < len(zh_caps_list) else zh_single
                        unique_id = f"s3_m{m_idx}_img{img_i}"
                        seen_keys.add(unique_id)
                        items.append({
                            "id": unique_id,
                            "slide": 3,
                            "slide_title": "140+ Jahre Tradition & Perfektion (1882 – Heute)",
                            "category": "Teil 1: Einführung & Historie • Meilensteine",
                            "group": f"Meilenstein {year_val} (Bild {img_i+1}/{len(imgs_list)})",
                            "context_type": "slide_3_milestone",
                            "milestone_index": m_idx,
                            "image_index": img_i,
                            "src": img_src,
                            "tag": "video" if img_src.lower().endswith(('.mp4', '.webm', '.mov')) else "image",
                            "title": f"Epoche {year_val} • Bild {img_i+1}",
                            "caption_de": c_de,
                            "caption_en": c_en,
                            "caption_ja": c_ja,
                            "caption_zh": c_zh,
                            "i18n_key": ""
                        })

    # 2. PARSE SLIDE 4: Transformation / Baudokumentation Meuselwitz
    s4_js_trans = {}
    if os.path.exists(TRANSFORMATION_JS_FILE):
        try:
            with open(TRANSFORMATION_JS_FILE, "r", encoding="utf-8") as f_tj:
                tj_code = f_tj.read()
            m_tj = re.search(r'this\.milestonesData\s*=\s*\[(.*?)\];\s*\n\s*this\.trailPoints', tj_code, re.DOTALL)
            if m_tj:
                tj_dicts = list(re.finditer(r'      \{\s*\n\s*id:\s*\'[^\']+\'[\s\S]*?\n      \}', m_tj.group(1)))
                for idx_tj, d_tj in enumerate(tj_dicts):
                    block_tj = d_tj.group(0)
                    en_m = re.search(r"caption:\s*\{[^{}]*en:\s*'([^']*)'", block_tj)
                    ja_m = re.search(r"caption:\s*\{[^{}]*ja:\s*'([^']*)'", block_tj)
                    zh_m = re.search(r"caption:\s*\{[^{}]*zh:\s*'([^']*)'", block_tj)
                    s4_js_trans[idx_tj] = {
                        "en": en_m.group(1) if en_m else "",
                        "ja": ja_m.group(1) if ja_m else "",
                        "zh": zh_m.group(1) if zh_m else ""
                    }
        except Exception:
            pass

    s4_match = re.search(r'transformation_milestones_data\s*=\s*\[(.*?)\]\s*\n\s*build_panels_html', sd_code, re.DOTALL)
    if s4_match:
        raw_s4 = s4_match.group(1)
        # Match each dictionary inside raw_s4
        dict_blocks = re.findall(r'\{(.*?)\}', raw_s4, re.DOTALL)
        for p_idx, b_txt in enumerate(dict_blocks):
            m_my = re.search(r"monthYear':\s*['\"]([^'\"]+)['\"]", b_txt)
            m_ph = re.search(r"phase':\s*['\"]([^'\"]+)['\"]", b_txt)
            m_ti = re.search(r"title':\s*['\"]([^'\"]+)['\"]", b_txt)
            m_ca = re.search(r"caption':\s*['\"]([^'\"]+)['\"]", b_txt)
            m_im = re.search(r"image':\s*['\"]([^'\"]+)['\"]", b_txt)

            month_str = m_my.group(1) if m_my else f"Phase {p_idx+1}"
            phase_str = m_ph.group(1) if m_ph else ""
            title_str = m_ti.group(1) if m_ti else ""
            caption_str = m_ca.group(1) if m_ca else ""
            img_src = m_im.group(1) if m_im else ""

            if img_src:
                unique_id = f"s4_doc_{p_idx}"
                seen_keys.add(unique_id)
                t_data = s4_js_trans.get(p_idx, {})
                items.append({
                    "id": unique_id,
                    "slide": 4,
                    "slide_title": "Baudokumentation: Die Entstehung des neuen Werks",
                    "category": "Teil 1: Einführung & Historie • Meuselwitz Transformation",
                    "group": f"{month_str} • {phase_str}",
                    "context_type": "slide_4_photodoc",
                    "doc_index": p_idx,
                    "src": img_src,
                    "tag": "video" if img_src.lower().endswith(('.mp4', '.webm', '.mov')) else "image",
                    "title": title_str,
                    "caption_de": caption_str,
                    "caption_en": t_data.get("en", ""),
                    "caption_ja": t_data.get("ja", ""),
                    "caption_zh": t_data.get("zh", ""),
                    "i18n_key": ""
                })

    # 3. PARSE SLIDES 5 - 68: HTML Media & Translations Master
    sections = re.findall(r'<section\s+class=\"slide[^\"]*\"\s+data-slide=\"(\d+)\">(.*?)</section>', all_html, re.DOTALL)
    for s_num_str, content in sections:
        s_num = int(s_num_str)
        if s_num in (1, 2, 3, 4):
            continue  # Already handled or non-content slides

        # Slide Title & Category
        slide_key = f"slide_{s_num:02d}"
        s_meta = slides_dict.get(slide_key, {})
        s_title_obj = s_meta.get("title", {})
        slide_title = s_title_obj.get("de", "") if isinstance(s_title_obj, dict) else str(s_title_obj)
        if not slide_title:
            t_match = re.search(r'<(?:h1|h2)[^>]*class=[\"\'][^\"\']*title[^\"\']*[\"\'][^>]*>(.*?)</(?:h1|h2)>', content, re.DOTALL)
            slide_title = re.sub(r'<[^>]+>', '', t_match.group(1)).strip() if t_match else f"Folie {s_num}"

        s_cat_obj = s_meta.get("category", {})
        slide_cat = s_cat_obj.get("de", "") if isinstance(s_cat_obj, dict) else str(s_cat_obj)
        if not slide_cat:
            cat_match = re.search(r'<div[^>]*class=[\"\']slide-category[\"\'][^>]*>(.*?)</div>', content, re.DOTALL)
            slide_cat = re.sub(r'<[^>]+>', '', cat_match.group(1)).strip() if cat_match else ""

        # Extract all media items in this slide
        media_matches = list(re.finditer(r'<(img|video)\s+([^>]+)>', content))
        for m_idx, mm in enumerate(media_matches):
            tag_type = mm.group(1)
            attrs = mm.group(2)

            src_m = re.search(r'src=[\"\']([^\"\']+)[\"\']', attrs)
            if not src_m:
                continue
            src = src_m.group(1)
            if "renner_logo" in src or "watermark" in src or "flag" in src or "data:image" in src:
                continue

            alt_m = re.search(r'alt=[\"\']([^\"\']*)[\"\']', attrs)
            alt = alt_m.group(1) if alt_m else ""

            # Check forward up to 600 chars for caption
            after_span = content[mm.end():mm.end()+650]
            next_img_m = re.search(r'<(?:img|video)', after_span)
            if next_img_m:
                after_span = after_span[:next_img_m.start()]

            cap_m = re.search(r'<div[^>]*class=[\"\'][^\"\']*caption[^\"]*[\"\'](?:\s+data-i18n=[\"\']([^\"\']+)[\"\'])?[^>]*>(.*?)</div>', after_span, re.DOTALL)
            
            i18n_key = ""
            caption_de = ""
            if cap_m:
                i18n_key = cap_m.group(1) or ""
                caption_de = re.sub(r'<[^>]+>', '', cap_m.group(2)).strip()

            # Preceding fallback if forward not found
            if not caption_de:
                prev_span = content[max(0, mm.start()-500):mm.start()]
                cap_prev_m = re.search(r'<div[^>]*class=[\"\'][^\"\']*caption[^\"]*[\"\'](?:\s+data-i18n=[\"\']([^\"\']+)[\"\'])?[^>]*>(.*?)</div>', prev_span, re.DOTALL)
                if cap_prev_m:
                    i18n_key = cap_prev_m.group(1) or ""
                    caption_de = re.sub(r'<[^>]+>', '', cap_prev_m.group(2)).strip()

            # If i18n_key exists in slides_content.json, load all 4 languages!
            caption_en = ""
            caption_ja = ""
            caption_zh = ""
            if i18n_key and slide_key in slides_dict:
                el_obj = slides_dict[slide_key].get("elements", {}).get(i18n_key, {})
                if isinstance(el_obj, dict):
                    caption_de = el_obj.get("de", caption_de)
                    caption_en = el_obj.get("en", "")
                    caption_ja = el_obj.get("ja", "")
                    caption_zh = el_obj.get("zh", "")

            # If still no caption, check card title or alt
            card_title = ""
            if not caption_de and alt:
                caption_de = alt

            unique_id = f"s{s_num}_img{m_idx+1}"
            seen_keys.add(unique_id)
            items.append({
                "id": unique_id,
                "slide": s_num,
                "slide_title": slide_title,
                "category": slide_cat,
                "group": f"Folie {s_num} • Medieninhalt {m_idx+1}",
                "context_type": "slide_i18n" if i18n_key else "slide_standard",
                "src": src,
                "tag": tag_type,
                "title": alt if (alt and alt != caption_de) else "",
                "caption_de": caption_de,
                "caption_en": caption_en,
                "caption_ja": caption_ja,
                "caption_zh": caption_zh,
                "i18n_key": i18n_key
            })

    return items


def update_single_image_caption(item_data):
    """
    Updates a single image's title and caption across the relevant source files.
    """
    context_type = item_data.get("context_type")
    item_id = item_data.get("id")
    slide_num = int(item_data.get("slide", 0))
    new_de = item_data.get("caption_de", "").strip()
    new_en = item_data.get("caption_en", "").strip()
    new_ja = item_data.get("caption_ja", "").strip()
    new_zh = item_data.get("caption_zh", "").strip()
    new_title = item_data.get("title", "").strip()
    i18n_key = item_data.get("i18n_key", "")

    # CASE 1: Standard / i18n element in translations/slides_content.json
    if i18n_key:
        master_json = load_master_json()
        slide_key = f"slide_{slide_num:02d}"
        if slide_key in master_json.get("slides", {}):
            elements = master_json["slides"][slide_key].setdefault("elements", {})
            if i18n_key not in elements:
                elements[i18n_key] = {}
            elements[i18n_key]["de"] = new_de
            if new_en: elements[i18n_key]["en"] = new_en
            if new_ja: elements[i18n_key]["ja"] = new_ja
            if new_zh: elements[i18n_key]["zh"] = new_zh
            save_master_json(master_json)

    # CASE 2: Slide 3 Milestone (History)
    if context_type == "slide_3_milestone":
        milestone_index = item_data.get("milestone_index", 0)
        image_index = item_data.get("image_index", 0)
        # Update js/history-journey.js and slide_definitions.py
        _update_slide3_milestone_caption(milestone_index, image_index, new_de, new_en, new_ja, new_zh)

    # CASE 3: Slide 4 Baudokumentation (Photodocs)
    if context_type == "slide_4_photodoc":
        doc_index = item_data.get("doc_index", 0)
        _update_slide4_photodoc(doc_index, new_title, new_de, new_en, new_ja, new_zh)

    # Trigger compilation in background without blocking
    schedule_compilation()

    import datetime
    saved_time = datetime.datetime.now().strftime("%H:%M:%S")
    return {
        "success": True, 
        "saved_at": saved_time,
        "message": f"Bildunterschrift für {item_id} um {saved_time} persistent gespeichert!"
    }


def _update_slide3_milestone_caption(m_idx, img_idx, de_val, en_val, ja_val, zh_val):
    """Updates caption in slide_definitions.py and js/history-journey.js for milestone m_idx and image img_idx."""
    # 1. Update in slide_definitions.py
    if os.path.exists(SLIDE_DEFS_FILE):
        with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
            code = f.read()

        m_block = re.search(r'(history_milestones_data\s*=\s*\[)(.*?)(\]\s*\n\s*panels_html)', code, re.DOTALL)
        if m_block:
            prefix = m_block.group(1)
            raw_block = m_block.group(2)
            suffix = m_block.group(3)

            dicts = list(re.finditer(r'\{[^{}]*\'id\':[^{}]*\}', raw_block, re.DOTALL))
            if m_idx < len(dicts):
                target_dict = dicts[m_idx].group(0)
                new_dict = target_dict

                # Check if image_captions list exists
                caps_m = re.search(r"('image_captions':\s*\[)(.*?)(\])", target_dict, re.DOTALL)
                if caps_m:
                    caps_list_raw = caps_m.group(2)
                    str_matches = list(re.finditer(r"'([^']*)'", caps_list_raw))
                    if img_idx < len(str_matches):
                        repl_str = f"'{_esc(de_val)}'"
                        new_caps_list_raw = caps_list_raw[:str_matches[img_idx].start()] + repl_str + caps_list_raw[str_matches[img_idx].end():]
                        new_dict = new_dict[:caps_m.start(2)] + new_caps_list_raw + new_dict[caps_m.end(2):]

                # If img_idx == 0 or single caption
                if img_idx == 0 or not caps_m:
                    new_dict = re.sub(r"'image_caption':\s*'[^']*'", f"'image_caption': '{_esc(de_val)}'", new_dict)

                updated_block = raw_block[:dicts[m_idx].start()] + new_dict + raw_block[dicts[m_idx].end():]
                new_code = code[:m_block.start(2)] + updated_block + code[m_block.end(2):]
                with open(SLIDE_DEFS_FILE, "w", encoding="utf-8") as f_out:
                    f_out.write(new_code)

    # 2. Update in js/history-journey.js
    if os.path.exists(HISTORY_JS_FILE):
        with open(HISTORY_JS_FILE, "r", encoding="utf-8") as f:
            js_code = f.read()

        m_regex = rf"(\b{m_idx}:\s*\{{)(.*?)(\n\s*\}},\s*\n\s*(?:{m_idx+1}:|\}};\s*\n\s*this\.milestoneCount))"
        m_match = re.search(m_regex, js_code, re.DOTALL)
        if m_match:
            pre_m = m_match.group(1)
            b_txt = m_match.group(2)
            post_m = m_match.group(3)

            caps_match = re.search(r"(imageCaptions:\s*\{)(.*?)(\n\s*\})", b_txt, re.DOTALL)
            if caps_match:
                caps_pre = caps_match.group(1)
                caps_body = caps_match.group(2)
                caps_post = caps_match.group(3)

                for lang_k, val_k in [('de', de_val), ('en', en_val), ('ja', ja_val), ('zh', zh_val)]:
                    if val_k:
                        lang_m = re.search(rf"({lang_k}:\s*\[)(.*?)(\])", caps_body, re.DOTALL)
                        if lang_m:
                            l_pre = lang_m.group(1)
                            l_body = lang_m.group(2)
                            l_post = lang_m.group(3)
                            items = list(re.finditer(r"'([^']*)'", l_body))
                            if img_idx < len(items):
                                repl_item = f"'{_esc_js(val_k)}'"
                                new_l_body = l_body[:items[img_idx].start()] + repl_item + l_body[items[img_idx].end():]
                                caps_body = caps_body[:lang_m.start()] + l_pre + new_l_body + l_post + caps_body[lang_m.end():]
                b_txt = b_txt[:caps_match.start()] + caps_pre + caps_body + caps_post + b_txt[caps_match.end():]

            if img_idx == 0 or not caps_match:
                single_match = re.search(r"(imageCaption:\s*\{)(.*?)(\n\s*\})", b_txt, re.DOTALL)
                if single_match:
                    s_pre = single_match.group(1)
                    s_body = single_match.group(2)
                    s_post = single_match.group(3)
                    for lang_k, val_k in [('de', de_val), ('en', en_val), ('ja', ja_val), ('zh', zh_val)]:
                        if val_k:
                            s_body = re.sub(rf"({lang_k}:\s*')[^']*(')", rf"\g<1>{_esc_js(val_k)}\g<2>", s_body)
                    b_txt = b_txt[:single_match.start()] + s_pre + s_body + s_post + b_txt[single_match.end():]

            new_js = js_code[:m_match.start()] + pre_m + b_txt + post_m + js_code[m_match.end():]
            with open(HISTORY_JS_FILE, "w", encoding="utf-8") as f_out:
                f_out.write(new_js)


def _update_slide4_photodoc(doc_idx, new_title, new_caption, new_en="", new_ja="", new_zh=""):
    """Updates title and caption in transformation_milestones_data in slide_definitions.py and js/transformation-journey.js."""
    # 1. Update in slide_definitions.py
    if os.path.exists(SLIDE_DEFS_FILE):
        with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
            code = f.read()

        # Find transformation_milestones_data
        pattern = r"transformation_milestones_data\s*=\s*\[(.*?)\]\s*\n\s*build_panels_html"
        m = re.search(pattern, code, re.DOTALL)
        if m:
            raw_block = m.group(1)
            dicts = list(re.finditer(r'\{[^{}]*\}', raw_block, re.DOTALL))
            if doc_idx < len(dicts):
                target_dict = dicts[doc_idx].group(0)
                new_dict = target_dict
                if new_title:
                    new_dict = re.sub(r"'title':\s*['\"].*?['\"]", f"'title': '{_esc(new_title)}'", new_dict)
                if new_caption:
                    new_dict = re.sub(r"'caption':\s*['\"].*?['\"]", f"'caption': '{_esc(new_caption)}'", new_dict)

                updated_block = raw_block[:dicts[doc_idx].start()] + new_dict + raw_block[dicts[doc_idx].end():]
                new_code = code[:m.start(1)] + updated_block + code[m.end(1):]
                with open(SLIDE_DEFS_FILE, "w", encoding="utf-8") as f_out:
                    f_out.write(new_code)

    # 2. Update in js/transformation-journey.js
    if os.path.exists(TRANSFORMATION_JS_FILE):
        with open(TRANSFORMATION_JS_FILE, "r", encoding="utf-8") as f:
            js_code = f.read()

        m_js = re.search(r'(this\.milestonesData\s*=\s*\[)(.*?)(\];\s*\n\s*this\.trailPoints)', js_code, re.DOTALL)
        if m_js:
            raw_block = m_js.group(2)
            dicts = list(re.finditer(r'      \{\s*\n\s*id:\s*\'[^\']+\'[\s\S]*?\n      \}', raw_block))
            if doc_idx < len(dicts):
                target_dict = dicts[doc_idx].group(0)
                new_dict = target_dict
                if new_title:
                    new_dict = re.sub(r"(title:\s*\{[^{}]*de:\s*')[^']*(')", rf"\g<1>{_esc_js(new_title)}\g<2>", new_dict)
                if new_caption:
                    new_dict = re.sub(r"(caption:\s*\{[^{}]*de:\s*')[^']*(')", rf"\g<1>{_esc_js(new_caption)}\g<2>", new_dict)
                if new_en:
                    new_dict = re.sub(r"(caption:\s*\{[^{}]*en:\s*')[^']*(')", rf"\g<1>{_esc_js(new_en)}\g<2>", new_dict)
                if new_ja:
                    new_dict = re.sub(r"(caption:\s*\{[^{}]*ja:\s*')[^']*(')", rf"\g<1>{_esc_js(new_ja)}\g<2>", new_dict)
                if new_zh:
                    new_dict = re.sub(r"(caption:\s*\{[^{}]*zh:\s*')[^']*(')", rf"\g<1>{_esc_js(new_zh)}\g<2>", new_dict)

                updated_block = raw_block[:dicts[doc_idx].start()] + new_dict + raw_block[dicts[doc_idx].end():]
                new_js_code = js_code[:m_js.start(2)] + updated_block + js_code[m_js.end(2):]
                with open(TRANSFORMATION_JS_FILE, "w", encoding="utf-8") as f_out:
                    f_out.write(new_js_code)


def _esc(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")


def _esc_js(s):
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ')


import threading

_compilation_timer = None
_compilation_lock = threading.Lock()


def schedule_compilation(delay=0.35):
    """Debounces presentation compilation so rapid field edits compile smoothly in background."""
    global _compilation_timer
    with _compilation_lock:
        if _compilation_timer is not None:
            try:
                _compilation_timer.cancel()
            except Exception:
                pass
        _compilation_timer = threading.Timer(delay, _do_compile)
        _compilation_timer.daemon = True
        _compilation_timer.start()


def _do_compile():
    import subprocess
    try:
        subprocess.run([sys.executable, MANAGE_TRANS_SCRIPT, "--apply"], cwd=BASE_DIR, check=True, capture_output=True)
        subprocess.run([sys.executable, BUILD_SCRIPT], cwd=BASE_DIR, check=True, capture_output=True)
    except Exception as e:
        print(f"[COMPILATION ERROR] {e}")


def run_compilation(sync=False):
    """Executes or schedules manage_translations.py --apply and build_full_presentation.py."""
    if sync:
        _do_compile()
    else:
        schedule_compilation(0.35)



def export_catalog_to_csv():
    """Exports all catalogued images and their captions as UTF-8 CSV with Excel BOM."""
    catalog = get_all_catalog_images()
    output = io.StringIO()
    # Excel BOM
    output.write('\ufeff')
    writer = csv.writer(output, delimiter=';', quoting=csv.QUOTE_ALL)
    writer.writerow([
        "ID",
        "Folie",
        "Kategorie",
        "Folientitel",
        "Bereich / Gruppe",
        "Dateipfad",
        "Medientyp",
        "Titel / Stichwort",
        "Bildunterschrift (Deutsch)",
        "Englisch (EN)",
        "Japanisch (JA)",
        "Chinesisch (ZH)",
        "i18n-Schlüssel"
    ])

    for it in catalog:
        writer.writerow([
            it.get("id", ""),
            it.get("slide", ""),
            it.get("category", ""),
            it.get("slide_title", ""),
            it.get("group", ""),
            it.get("src", ""),
            it.get("tag", ""),
            it.get("title", ""),
            it.get("caption_de", ""),
            it.get("caption_en", ""),
            it.get("caption_ja", ""),
            it.get("caption_zh", ""),
            it.get("i18n_key", "")
        ])

    return output.getvalue()


if __name__ == "__main__":
    print("Testing image catalog extraction...")
    imgs = get_all_catalog_images()
    print(f"✓ Total images catalogued: {len(imgs)}")
    with_cap = sum(1 for i in imgs if i.get("caption_de"))
    print(f"✓ Images with German caption: {with_cap} / {len(imgs)}")
    sample = imgs[5] if len(imgs) > 5 else imgs[0]
    print(f"Sample: Folie {sample['slide']} | {sample['src']} | Cap: {sample['caption_de']}")
