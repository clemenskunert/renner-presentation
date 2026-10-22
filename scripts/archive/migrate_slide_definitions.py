#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Migrates slide_definitions.py:
1. Updates TOTAL_SLIDES = 45
2. Replaces Slide 2 with the modern animated Masterclass Journey layout
3. Removes slides 35 to 54
4. Renumbers slides 55..65 to 35..45 with appropriate data-i18n attributes
"""

import re
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDE_DEFS_FILE = os.path.join(BASE_DIR, "slide_definitions.py")

with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update TOTAL_SLIDES
content = re.sub(r'TOTAL_SLIDES\s*=\s*\d+', 'TOTAL_SLIDES = 45', content)

# 2. Define the new Slide 2
new_slide_2 = """      <!-- SLIDE 2: Agenda & Course Topics (Animated Masterclass Journey) -->
      <section class="slide" data-slide="2">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s2_category">Übersicht • Struktur der Masterclass</div>
            <h2 class="slide-title" data-i18n="s2_title">Die 5 Kernmodule der Renner Masterclass</h2>
            <div class="slide-subtitle" data-i18n="s2_subtitle">Vollständiges Schulungs- & Fachprogramm auf Basis der originalen Renner Academy Unterlagen</div>
          </div>
        </div>
        <div class="slide-body agenda-slide-body">
          <!-- Animated Journey Roadmap Rail -->
          <div class="agenda-journey-track-wrapper">
            <div class="agenda-journey-track">
              <div class="agenda-journey-laser"></div>
            </div>
            <div class="agenda-journey-nodes">
              <div class="agenda-journey-node" data-target-slide="3" style="--node-idx: 0;">
                <span class="node-pin-dot"></span>
                <span class="node-pin-pulse"></span>
                <span class="node-pin-num">01</span>
              </div>
              <div class="agenda-journey-node" data-target-slide="5" style="--node-idx: 1;">
                <span class="node-pin-dot"></span>
                <span class="node-pin-pulse"></span>
                <span class="node-pin-num">02</span>
              </div>
              <div class="agenda-journey-node" data-target-slide="15" style="--node-idx: 2;">
                <span class="node-pin-dot"></span>
                <span class="node-pin-pulse"></span>
                <span class="node-pin-num">03</span>
              </div>
              <div class="agenda-journey-node" data-target-slide="27" style="--node-idx: 3;">
                <span class="node-pin-dot"></span>
                <span class="node-pin-pulse"></span>
                <span class="node-pin-num">04</span>
              </div>
              <div class="agenda-journey-node" data-target-slide="35" style="--node-idx: 4;">
                <span class="node-pin-dot"></span>
                <span class="node-pin-pulse"></span>
                <span class="node-pin-num">05</span>
              </div>
            </div>
          </div>

          <!-- 5 Modern Interactive Bento Cards -->
          <div class="agenda-cards-grid">
            <!-- MODUL 1 -->
            <div class="bento-card agenda-card" data-target-slide="3" role="button" tabindex="0" style="--card-idx: 0;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">01</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b1_badge">MODUL 1</span>
                <span class="agenda-slide-pill"><span class="pill-dot gold"></span>Folie 3–4</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c1_title">Geschichte & Hauptsitz</div>
                <div class="bento-card-desc" data-i18n="s2_c1_desc">140+ Jahre Meilensteine, Zusammenlegung der Standorte & die neue moderne Produktion in Meuselwitz (Bau 09.2023–2025).</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- MODUL 2 -->
            <div class="bento-card agenda-card" data-target-slide="5" role="button" tabindex="0" style="--card-idx: 1;">
              <div class="agenda-card-glow-edge green"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">02</div>
              <div class="agenda-card-header">
                <span class="bento-badge green" data-i18n="s2_b2_badge">MODUL 2</span>
                <span class="agenda-slide-pill"><span class="pill-dot green"></span>Folie 5–14</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c2_title">Filz Herstellung</div>
                <div class="bento-card-desc" data-i18n="s2_c2_desc">Weickert-Tradition seit 1783, Rohwoll-Selektion, Kardieren, Walken (Shore 0.56) und exklusiver „Weickert Special“-Filz.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- MODUL 3 -->
            <div class="bento-card agenda-card" data-target-slide="15" role="button" tabindex="0" style="--card-idx: 2;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">03</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b3_badge">MODUL 3</span>
                <span class="agenda-slide-pill"><span class="pill-dot gold"></span>Folie 15–26</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c3_title">Hammerkopf Fertigung</div>
                <div class="bento-card-desc" data-i18n="s2_c3_desc">Roboter-Filzzuschnitt, Unterfilzfräsen, Kernhölzer (Dichten 490–860 kg/m³), Presskräfte, CNC-Bearbeitung und T-Vernietung.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- MODUL 4 -->
            <div class="bento-card agenda-card" data-target-slide="27" role="button" tabindex="0" style="--card-idx: 3;">
              <div class="agenda-card-glow-edge green"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">04</div>
              <div class="agenda-card-header">
                <span class="bento-badge green" data-i18n="s2_b4_badge">MODUL 4</span>
                <span class="agenda-slide-pill"><span class="pill-dot green"></span>Folie 27–34</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c4_title">Yamaha KIT</div>
                <div class="bento-card-desc" data-i18n="s2_c4_desc">Vorjustiertes Drop-In Kit für Yamaha Flügel: Vorgeleimt, 91°-Winkel kalibriert, FFW-Filz, 45 Min. Einbau ohne Vorintonation.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- MODUL 5 -->
            <div class="bento-card agenda-card hero-highlight" data-target-slide="35" role="button" tabindex="0" style="--card-idx: 4;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">05</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b5_badge">MODUL 5</span>
                <span class="agenda-slide-pill highlight"><span class="pill-dot gold"></span>Folie 35–45</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c5_title">Intonation</div>
                <div class="bento-card-desc" data-i18n="s2_c5_desc">Das Uhren-Modell, 4 dynamische Keile (ff, f, p, pp), Pre-Needling, Saitennivellierung, Kronenabzug und Una-Corda-Feinabstimmung.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>"""

# Replace Slide 2
pattern_s2 = r'(\s*<!-- SLIDE 2: Agenda & Course Topics.*?)(<!-- SLIDE 3:)'
# Wait, let's find the exact bounds of slide 2
s2_start_tag = '    # SLIDE 2: Agenda & Course Topics (Sander Bento Grid)\n    slides.append(f\'\'\''
s2_end_tag = '{get_watermark()}\n      </section>\'\'\')'
# Find first occurrence of s2_start_tag
if s2_start_tag in content:
    idx_s2_start = content.index(s2_start_tag)
    idx_s2_body_start = idx_s2_start + len(s2_start_tag)
    idx_s2_end = content.index(s2_end_tag, idx_s2_body_start) + len(s2_end_tag)
    content = content[:idx_s2_start] + "    # SLIDE 2: Agenda & Course Topics (Animated Masterclass Journey)\n    slides.append(f'''" + new_slide_2 + "''')" + content[idx_s2_end:]
    print("✓ Slide 2 successfully updated in slide_definitions.py")
else:
    print("Warning: Could not locate s2_start_tag in slide_definitions.py")

# 3. Locate the cut point: from Chapter 5 (Slide 35) to Chapter 7 (Slide 55)
chap5_marker = "    # =========================================================================\n    # KAPITEL 5: WERKSTATTPRAXIS – MASSBLÄTTER, GEOMETRIE & BOHRWINKEL (35 - 41)\n    # ========================================================================="
chap7_marker = "    # =========================================================================\n    # KAPITEL 7: DIE HOHE SCHULE DER INTONATION (RENNER MASTER VOICING) (55 - 65)\n    # ========================================================================="

if chap5_marker in content and chap7_marker in content:
    idx_chap5 = content.index(chap5_marker)
    idx_chap7 = content.index(chap7_marker)
    
    # Extract part before chapter 5
    part_before = content[:idx_chap5]
    # Extract chapter 7 and beyond
    part_intonation = content[idx_chap7:]

    # In part_intonation:
    # Replace header:
    new_chap5_header = "    # =========================================================================\n    # KAPITEL 5: DIE HOHE SCHULE DER INTONATION (RENNER MASTER VOICING) (35 - 45)\n    # ========================================================================="
    part_intonation = part_intonation.replace(chap7_marker, new_chap5_header, 1)

    # Renumber slides 55..65 to 35..45
    for old_num in range(55, 66):
        new_num = old_num - 20
        # Replace comments
        part_intonation = re.sub(rf'<!-- SLIDE {old_num}\b', f'<!-- SLIDE {new_num}', part_intonation)
        part_intonation = re.sub(rf'# SLIDE {old_num}:', f'# SLIDE {new_num}:', part_intonation)
        # Replace data-slide
        part_intonation = re.sub(rf'data-slide="{old_num}"', f'data-slide="{new_num}"', part_intonation)
        # Replace data-i18n tags: s55_ -> s35_
        part_intonation = re.sub(rf'data-i18n="s{old_num}_', f'data-i18n="s{new_num}_', part_intonation)

    # Replace category text "Teil 7: Intonation" with "Teil 5: Intonation"
    part_intonation = part_intonation.replace("Teil 7: Intonation", "Teil 5: Intonation")
    # Replace step watermark "07" with "05" where appropriate
    part_intonation = part_intonation.replace('<div class="bento-step-watermark">07</div>', '<div class="bento-step-watermark">05</div>')

    content = part_before + part_intonation
    print("✓ Removed slides 35..54 and renumbered slides 55..65 to 35..45 in slide_definitions.py")
else:
    print("Error: Could not find chapter markers!")

with open(SLIDE_DEFS_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("✓ slide_definitions.py written successfully.")
