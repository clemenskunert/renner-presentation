# -*- coding: utf-8 -*-
"""
slide_definitions.py
Complete, authentic slide definitions for the 68 slides of the Renner Masterclass Deck.
Strictly based on the 5 technical masterclass documents in "Praesentation_Basis":
1. Hammerkopf_Japan_040325 (Clemens Kunert, Meuselwitz)
2. HK_Prd_Auswahl_10_25 (Jens-Sören Kruse, Klavierbaumeister)
3. HSt_Kap_Auswahl_MTK_10_25 (Jens-Sören Kruse, Klavierbaumeister)
4. EN_GP_HK_Glueing_10_25 (Jens-Sören Kruse, Klavierbaumeister)
5. Intonation_10_25 (Jens-Sören Kruse, Klavierbaumeister)
plus the official louis-renner.de history and Google Photos Meuselwitz transformation album.
"""

TOTAL_SLIDES = 45
import re

def get_watermark():
    return '''        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>'''

def get_all_slides_html():
    slides = []

    # =========================================================================
    # KAPITEL 1: EINFÜHRUNG, GESCHICHTE & DIE NEUE ÄRA IN MEUSELWITZ (1 - 6)
    # =========================================================================

    # SLIDE 1: Hero / Title Slide
    slides.append(f'''      <!-- SLIDE 1: Hero / Title Slide -->
      <section class="slide active hero-slide" data-slide="1">
        <span class="hero-kicker" data-i18n="s1_kicker">Renner Masterclass & Konferenz 2025 • Beijing & Toyohashi</span>
        <h1 class="hero-main-title" data-i18n="s1_title">LOUIS RENNER</h1>
        <p class="hero-main-subtitle" data-i18n="s1_subtitle">Das Herzstück des Klaviers: 140 Jahre Tradition, die neue Fertigung in Meuselwitz & die hohe Kunst des Hammerkopfs</p>
        <div class="hero-meta-bar">
          <div class="hero-meta-item">
            <span>Speaker:</span> <strong>Clemens Kunert</strong>
          </div>
          <div class="hero-meta-item">
            <span>Location:</span> <strong data-i18n="s1_location">Beijing & Toyohashi Conference 2025</strong>
          </div>
          <div class="hero-meta-item">
            <span>Headquarters:</span> <strong>Louis Renner GmbH • Meuselwitz, Germany</strong>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 2: Agenda & Course Topics (Animated Masterclass Journey)
    slides.append(f'''      <!-- SLIDE 2: Agenda & Course Topics (Animated Masterclass Journey) -->
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
            <!-- KAPITEL 1 -->
            <div class="bento-card agenda-card" data-target-slide="3" role="button" tabindex="0" style="--card-idx: 0;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">01</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b1_badge">KAPITEL 1</span>
                <span class="agenda-slide-pill"><span class="pill-dot gold"></span>Folie 3–4</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c1_title">Geschichte & Gegenwart</div>
                <div class="bento-card-desc" data-i18n="s2_c1_desc">140+ Jahre Geschichte, Zusammenlegung der Standorte & der neue Hauptsitz in Meuselwitz.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- KAPITEL 2 -->
            <div class="bento-card agenda-card" data-target-slide="5" role="button" tabindex="0" style="--card-idx: 1;">
              <div class="agenda-card-glow-edge green"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">02</div>
              <div class="agenda-card-header">
                <span class="bento-badge green" data-i18n="s2_b2_badge">KAPITEL 2</span>
                <span class="agenda-slide-pill"><span class="pill-dot green"></span>Folie 5–14</span>
              </div>
              <div class="agenda-card-main">
                <div class="bento-card-title" data-i18n="s2_c2_title">Filzfertigung & Tradition</div>
                <div class="bento-card-desc" data-i18n="s2_c2_desc">FFW- & Weickert-Tradition seit 1783, reine Merinowolle, natürliches Walken (0.56 Shore) & der exklusive Weickert-Special-Filz.</div>
              </div>
              <div class="agenda-card-footer">
                <span class="agenda-action-text">Kapitel öffnen</span>
                <span class="agenda-nav-arrow">↗</span>
              </div>
            </div>

            <!-- KAPITEL 3 -->
            <div class="bento-card agenda-card" data-target-slide="15" role="button" tabindex="0" style="--card-idx: 2;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">03</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b3_badge">KAPITEL 3</span>
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

            <!-- KAPITEL 4 -->
            <div class="bento-card agenda-card" data-target-slide="27" role="button" tabindex="0" style="--card-idx: 3;">
              <div class="agenda-card-glow-edge green"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">04</div>
              <div class="agenda-card-header">
                <span class="bento-badge green" data-i18n="s2_b4_badge">KAPITEL 4</span>
                <span class="agenda-slide-pill"><span class="pill-dot green"></span>Folie 27–37</span>
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

            <!-- KAPITEL 5 -->
            <div class="bento-card agenda-card hero-highlight" data-target-slide="38" role="button" tabindex="0" style="--card-idx: 4;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">05</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b5_badge">KAPITEL 5</span>
                <span class="agenda-slide-pill highlight"><span class="pill-dot gold"></span>Folie 38–45</span>
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
      </section>''')

    def get_fire_backdrop_html():
        embers_data = [
            # (left%, size_px, dur_s, delay_s, drift_px, h_px)
            # Tier 1: Main vibrant embers (left to right spread, climbing up to the top)
            (2, 3.4, 4.8, 0.1, -18, 720),
            (4, 2.2, 3.8, 1.4, 15, 620),
            (6, 4.5, 5.8, 0.8, 25, 820),
            (8, 1.8, 3.5, 2.2, -12, 540),
            (10, 2.6, 4.1, 0.4, -22, 660),
            (12, 3.8, 5.2, 1.9, 18, 770),
            (14, 5.0, 6.1, 1.1, 28, 860),
            (16, 2.0, 3.7, 2.7, -15, 570),
            (18, 3.5, 4.6, 0.5, -20, 700),
            (20, 4.2, 5.5, 1.7, 22, 790),
            (22, 2.8, 4.9, 2.5, 24, 760),
            (24, 1.6, 3.3, 0.3, -10, 520),
            (26, 4.2, 5.9, 1.3, -28, 840),
            (28, 3.0, 4.4, 2.9, 16, 680),
            (30, 2.2, 3.8, 0.2, 14, 590),
            (32, 4.8, 6.0, 1.8, -24, 850),
            (34, 5.4, 6.3, 0.9, -26, 880),
            (36, 2.4, 4.0, 2.4, 18, 640),
            (38, 3.0, 4.5, 0.7, 20, 700),
            (40, 4.0, 5.4, 1.5, -24, 790),
            (42, 1.9, 3.6, 3.1, 12, 560),
            (44, 4.6, 5.9, 0.6, 26, 830),
            (46, 2.6, 4.2, 2.1, 15, 660),
            (48, 3.3, 4.8, 1.0, -18, 740),
            (50, 4.8, 6.1, 0.2, -22, 850),
            (52, 2.1, 3.7, 2.6, 14, 580),
            (54, 3.2, 4.7, 1.6, 26, 755),
            (56, 4.4, 5.7, 0.8, -25, 820),
            (58, 2.4, 3.9, 2.8, -14, 620),
            (60, 3.6, 5.1, 1.2, 20, 780),
            (62, 5.2, 6.2, 0.4, 25, 870),
            (64, 1.7, 3.4, 2.3, -11, 535),
            (66, 3.6, 5.0, 1.4, -20, 770),
            (68, 4.5, 5.8, 3.0, 22, 830),
            (70, 2.8, 4.3, 0.5, 18, 690),
            (72, 3.9, 5.3, 1.7, -21, 795),
            (74, 4.4, 5.7, 2.0, -27, 830),
            (76, 2.0, 3.6, 0.7, 13, 570),
            (78, 3.0, 4.5, 2.4, 21, 705),
            (80, 4.7, 5.9, 1.1, -25, 840),
            (82, 5.0, 6.2, 0.3, -23, 860),
            (84, 2.3, 3.9, 2.7, 16, 625),
            (86, 2.5, 4.1, 0.9, 15, 650),
            (88, 4.1, 5.4, 1.9, -22, 805),
            (90, 4.2, 5.5, 0.5, -24, 800),
            (92, 1.8, 3.5, 2.5, 12, 550),
            (94, 3.4, 4.9, 1.3, 20, 740),
            (96, 4.6, 5.9, 2.8, -19, 830),
            (98, 2.7, 4.2, 0.6, 14, 660),

            # Tier 2: Additional convective sparks & glowing micro-embers (filling the space)
            (3, 1.5, 3.2, 1.7, 9, 515),
            (7, 3.1, 4.6, 2.3, -16, 715),
            (11, 2.2, 3.7, 0.9, 13, 605),
            (15, 4.3, 5.7, 3.2, -23, 820),
            (19, 1.7, 3.3, 1.4, 10, 535),
            (23, 3.5, 5.1, 0.1, -18, 750),
            (27, 2.5, 4.0, 2.1, 16, 650),
            (31, 4.0, 5.5, 1.6, -21, 810),
            (35, 1.9, 3.6, 3.3, 12, 570),
            (39, 3.7, 5.2, 0.8, -20, 775),
            (43, 2.3, 3.8, 2.0, 14, 615),
            (47, 4.7, 6.0, 1.2, -26, 845),
            (51, 1.6, 3.2, 2.9, 9, 525),
            (55, 3.8, 5.3, 0.4, 21, 785),
            (59, 2.4, 3.9, 1.8, -14, 635),
            (63, 4.5, 5.8, 3.1, 23, 835),
            (67, 1.8, 3.4, 0.7, -11, 545),
            (71, 3.4, 4.9, 2.2, 18, 740),
            (75, 2.6, 4.1, 1.5, -17, 670),
            (79, 4.9, 6.2, 0.3, 25, 860),
            (83, 1.7, 3.3, 2.8, -10, 535),
            (87, 3.6, 5.1, 1.1, 20, 765),
            (91, 2.2, 3.7, 3.4, -13, 595),
            (95, 4.4, 5.7, 0.5, 22, 820),

            # Tier 3: Core intense floating flakes in central hotspot area
            (21, 3.9, 5.4, 1.8, -21, 790),
            (33, 4.6, 6.1, 2.6, 26, 850),
            (45, 5.2, 6.4, 0.7, -25, 880),
            (57, 4.1, 5.6, 2.3, 19, 800),
            (69, 5.1, 6.3, 1.3, -24, 870),
            (81, 3.8, 5.2, 2.7, 21, 775),
            (89, 4.3, 5.6, 0.9, -18, 810),
        ]
        embers_html = "".join([
            f'<span class="fire-ember" style="--left:{l}%;--size:{s}px;--dur:{dur}s;--delay:{delay}s;--drift:{drift}px;--h:{h}px;"></span>'
            for l, s, dur, delay, drift, h in embers_data
        ])
        return f'''            <div class="milestone-fire-backdrop" aria-hidden="true">
              <div class="fire-inferno-glow"></div>
              <div class="fire-smoke-drift"></div>
              <div class="fire-embers-field">
                {embers_html}
              </div>
            </div>'''

    # SLIDE 3: 140+ Jahre Tradition & Meilensteine (Central Timeline with Vertical Tree Branches)
    history_milestones_data = [
      {
        'id': '1882',
        'year': '1882',
        'tag': 'Gründung',
        'branch': 'up',
        'arrow': '▲',
        'badge': '1882 • Gründung',
        'heading': '1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik',
        'sentence': 'Im Oktober 1882 gründete Louis Renner seine Werkstatt in der Stuttgarter Heusteigstraße – mit dem Ziel, hochpräzise Klaviermechaniken als Herzstück des Instruments zu fertigen.',
        'bullets': [
          '<strong>Feinmechanik im Fokus:</strong> Beginn der Fertigung höchstpräziser Klaviermechaniken.',
          '<strong>Historische Parallele:</strong> Zeitgleich zu Rönischs Panzerplatte setzt Renner den Präzisionsmaßstab.',
          '<strong>Wurzel von Meuselwitz:</strong> Grundstein der Tradition, die 1990 in Thüringen zusammenfloss.'
        ],
        'fact': '✦ Beginn mit Klaviermechaniken 1882 • Historische Wurzel von Meuselwitz',
        'quote': '„Von der Stuttgarter Werkstatt 1882 bis zur Übernahme der Mechanik-Fertigung der Piano Union 1990: Unsere Meuselwitzer Wurzeln vereinen die großen Meilensteine deutscher Klavierbautradition.“',
        'quote_author': 'Louis Renner Chronik & Ursprung Meuselwitz',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
          'Visuell/Bilder/01_Geschichte/01_1882_rohlfing_klaviermechanik_vintage.webp',
          'Visuell/Bilder/01_Geschichte/01_1882_werkstatt_stuttgart_illustration.png'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
        'image_caption': 'Gründer: Louis Renner 1882',
        'image_captions': [
          'Gründer: Louis Renner 1882',
          'Historische Klaviermechanik – Beginn der Reise',
          'Erste Werkstatt in der Heusteigstraße Stuttgart 1882'
        ],
        'image_tag': '1882 Gründung',
        'slide_interval': 3500
      },
      {
        'id': '1906',
        'year': '1906',
        'tag': 'Hammer',
        'branch': 'down',
        'arrow': '▼',
        'badge': '1906 • Eigene Hammerköpfe',
        'heading': '1906: Aufnahme der anspruchsvollen Hammerkopffertigung',
        'sentence': 'Von Cristoforis erstem Hammerkopf (1700) zu Renners eigener Fertigung ab 1906: Der entscheidende Schritt, der später den unverwechselbaren Klang jedes Steinway-Flügels definierte.',
        'bullets': [
          '<strong>Cristoforis Impuls:</strong> Vom Ur-Hammerkopf (1700) zur ersten industriellen Perfektion.',
          '<strong>Eigene Spezialpressen:</strong> Entwicklung eigener Hochdruckpressen für maximale Dynamik.',
          '<strong>Globaler Klangstandard:</strong> Maßstab für Steinway und führende Flügelbauer weltweit.'
        ],
        'fact': '✦ Von Cristoforis Papierröllchen 1700 • Zum weltweiten Renner-Klangstandard ab 1906',
        'quote': '„Vom lederbezogenen Papierröllchen Cristoforis zur perfekten Spannungsbalance: Der Hammerkopf ist die Seele des Klavierklangs.“',
        'quote_author': 'Louis Renner Manufaktur • Klangtradition seit 1906',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1700_christofori_hammermechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1906_mechanikfertigung_historisch.png',
          'Visuell/Bilder/01_Geschichte/01_1906_hammerkopf_pressen_fertigung.png'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
        'image_caption': 'Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)',
        'image_captions': [
          'Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)',
          '1700: Erste Hammer-Mechanik von Bartolomeo Cristofori – Der Ursprung des Hammerkopfs',
          '1906: Beginn der eigenen Hammerkopffertigung mit eigens entwickelten Pressen',
          'Hammerkopfnieten im Halbautomaten'
        ],
        'image_tag': '1906 Hammer',
        'slide_interval': 3500
      },
      {
        'id': '1911',
        'year': '1911',
        'tag': 'Antriebe',
        'branch': 'up',
        'arrow': '▲',
        'badge': '1911 • Technisierung',
        'heading': '1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm',
        'sentence': '1911 erweiterte Oscar Renner das Programm um vollständige Konzert-Flügelmechaniken und trieb die Modernisierung mit hunderten elektrischen Einzelantrieben voran.',
        'bullets': [
          '<strong>Érard-Repetition:</strong> Doppelte Auslösung als Fundament moderner Flügelmechaniken.',
          '<strong>Konzertprogramm komplett:</strong> Flügel- und Klaviermechaniken aus einer Meisterhand.',
          '<strong>Hunderte Einzelmotoren:</strong> Wegweisende Umstellung von Transmissionen auf Elektro-Einzelantrieb.'
        ],
        'fact': '✦ Érards Repetition als Fundament • 1911: Erste Renner-Flügelmechaniken & Hunderte Einzelmotoren',
        'quote': '„Um alle Zweige der Herstellung von Klaviermechaniken in einer Hand zu vereinigen und dem Fabrikationsprogramm eine gewisse Abrundung zu geben, wurde jetzt auch die Fertigung von Flügelmechaniken aufgenommen.“',
        'quote_author': 'Oscar Renner • Firmenchronik 1911',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1808_erard_repetitionsmechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1911_renner_elektrifizierte_arbeitsumgebung.webp'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
        'image_caption': 'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel',
        'image_captions': [
          'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel',
          '1808 / 1821: Érard-Repetitionsmechanik – Das Fundament des modernen Flügelprogramms',
          'Hunderte elektrische Einzelantriebe: Technisierung unter Oscar Renner (1911)'
        ],
        'image_tag': '1911 Antriebe',
        'slide_interval': 3500
      },
      {
        'id': '1944',
        'year': '1944',
        'tag': 'Brandnacht',
        'branch': 'down',
        'arrow': '▼',
        'badge': '1944 • Brandnacht',
        'heading': '1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau',
        'sentence': 'In der Stuttgarter Bombennacht vom 24./25. Juli 1944 brannten alle Renner-Gebäude nieder – doch der Wille zum sofortigen Wiederaufbau war ungebrochen.',
        'bullets': [
          '<strong>Totalverlust im Feuersturm:</strong> Zerstörung der Stuttgarter Werke am 24./25. Juli 1944.',
          '<strong>Mut zur Zukunft:</strong> Sofortiger Entschluss zum Wiederaufbau noch in den Trümmern.',
          '<strong>Geschlossene Belegschaft:</strong> Gemeinsamer Wiederbeginn unter schwersten Bedingungen.'
        ],
        'fact': '✦ Bombennacht 24./25.07.1944 & Wiederaufbau',
        'quote': '„Trotz Zerstörung, trotz unendlicher Hindernisse: Renner wird wieder aufgebaut!“',
        'quote_author': 'Wilhelm Megenhardt • Chronik 1944',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_1.jpg',
          'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_2.jpg',
          'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_luftangriff_archiv.jpg'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_1.jpg',
        'image_caption': 'Historische Dokumente: Stuttgarter Bombennacht & Zerstörung 1944 vor dem Wiederaufbau',
        'image_tag': '1944 Brandnacht'
      },
      {
        'id': '1951',
        'year': '1951/1952',
        'tag': 'Manfred Renner',
        'branch': 'up',
        'arrow': '▲',
        'badge': '1951/1952 • Manfred Renner',
        'heading': '1951/1952: Dr. Manfred Renner & Vollendung des Wiederaufbaus',
        'sentence': 'Mit Dr. Manfred Renner trat 1951 die 3. Generation an die Unternehmensspitze, vollendete den Wiederaufbau und führte Renner zu neuer internationaler Größe.',
        'bullets': [
          '<strong>3. Generation am Ruder:</strong> Dr. Manfred Renner übernimmt die Unternehmensführung (1951).',
          '<strong>Neues Stammwerk (1955):</strong> Feierlicher Wiedereinzug in das Stuttgarter Hauptgebäude.',
          '<strong>Weltmarktführerschaft:</strong> Konsequente Qualitätsstandards festigen die Weltspitze.'
        ],
        'fact': '✦ 1951/1952 • Manfred Renner & Wiederbezug 1955',
        'quote': '„Mit jugendlichem Eifer nahm er die Zügel in die Hand und ließ den Wiederaufbau bis zur ursprünglichen Ausdehnung durchführen.“',
        'quote_author': 'Renner Chronik • 1951/1952',
        'image': 'Visuell/web_assets/herstellung-renermechanik.png',
        'image_caption': 'Vollendung des Wiederaufbaus und Wiedereinzug in das Stuttgarter Hauptgebäude (1955)',
        'image_tag': '1951/1952 Wiederaufbau'
      },
      {
        'id': '1990',
        'year': '1990',
        'tag': 'Zeitenwende',
        'branch': 'down',
        'arrow': '▼',
        'badge': '1990 • Zeitenwende & Existenzsicherung',
        'heading': '1990: Mauerfall, Zeitenwende & Sicherung des Fortbestands',
        'sentence': '1990 nutzte Renner die historische Chance der Wiedervereinigung: Die Übernahme der Mechanikfertigung in Zeitz sicherte die Existenz des Unternehmens und legte die Basis für Meuselwitz.',
        'bullets': [
          '<strong>Chance der Einheit:</strong> Übernahme der Mechanik-Fertigung der Piano Union in Zeitz.',
          '<strong>Großkunde Schimmel gerettet:</strong> Sicherung der Kapazitäten für über 40 Klaviere pro Tag.',
          '<strong>Tor nach Meuselwitz:</strong> Entscheidende Weichenstellung für den heutigen Thüringer Hauptsitz.'
        ],
        'fact': '✦ 1990 • Wende, Schimmel-Partnerschaft & Zeitz',
        'quote': '„Die Übernahme der Mechanik-Fertigung in Zeitz war für Renner eine Frage des nackten Fortbestands – sie sicherte unseren größten Kunden Schimmel und schuf das Fundament unserer Zukunft.“',
        'quote_author': 'Louis Renner Chronik • Das Wendejahr 1990',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
          'Visuell/Bilder/01_Geschichte/01_1990_piano_union_zeitz_mechanikfertigung.webp'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
        'image_caption': 'Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner',
        'image_captions': [
          'Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner',
          'Historische Mechanik-Fertigung in Zeitz (Piano Union / Rönisch) – Die Rettung von Renners Zukunft'
        ],
        'image_tag': '1990 Wende & Zeitz',
        'slide_interval': 3500
      },
      {
        'id': '2011',
        'year': '2011',
        'tag': 'Standorte',
        'branch': 'up',
        'arrow': '▲',
        'badge': '2011 • Zwei feste Standorte',
        'heading': '2011: Zwei feste Standorte – Neubau Gärtringen & Kernfertigung Meuselwitz',
        'sentence': 'Im Jahr 2011 bündelte Renner seine dezentralen Werke an zwei modernen Standorten: Gärtringen und Meuselwitz.',
        'bullets': [
          '<strong>Zwei feste Standorte:</strong> Umzug von Zeitz nach Meuselwitz und Neubau Gärtringen.',
          '<strong>Kernwerk Meuselwitz:</strong> 6.800 m² Großfertigung für Mechaniken, Hammerköpfe und Bauteile.',
          '<strong>Hauptsitz Gärtringen:</strong> Präzise Holzverarbeitung, Bohrwerkstätten und Verwaltung.'
        ],
        'fact': '✦ 2011 • Zwei feste Standorte: Gärtringen & Meuselwitz (6.800 m²)',
        'quote': '„Im Jahr 2011 wurden die zuvor verstreuten Werke an zwei Standorten zusammengelegt: Meuselwitz und Gärtringen.“',
        'quote_author': 'Louis Renner Chronik • Zwei Standorte 2011',
        'images': [
          'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
          'Visuell/Bilder/01_Geschichte/01_2011_standort_meuselwitz_vogelperspektive.jpg'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
        'image_caption': 'Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung',
        'image_captions': [
          'Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung',
          'Standort Meuselwitz aus der Vogelperspektive: Moderne Kernfertigung (6.800 m²) nach Umzug von Zeitz'
        ],
        'image_tag': '2011 Standorte',
        'slide_interval': 3500
      },
      {
        'id': '2019',
        'year': '2019',
        'tag': 'Steinway',
        'branch': 'down',
        'arrow': '▼',
        'badge': '2019 • Neuer Eigentümer',
        'heading': '2019: Steinway & Sons übernimmt Renner – 100% Eigenständigkeit',
        'sentence': '2019 entschied sich Inhaber Clemens von Arnim mit großer Weitsicht für Steinway & Sons – zum Schutz der Belegschaft und für die volle Unabhängigkeit von Renner.',
        'bullets': [
          '<strong>100% Eigenständigkeit:</strong> Steinway & Sons garantiert volle operative Unabhängigkeit.',
          '<strong>Verantwortung vor Profit:</strong> Clemens von Arnim lehnte höhere Gebote zum Schutz der Belegschaft ab.',
          '<strong>Ehrendes Gedenken († 2024):</strong> Tiefer Dank an Clemens von Arnim für seine visionäre Führung.'
        ],
        'fact': '✦ 2019 • Steinway & In ehrendem Gedenken an Clemens von Arnim († 2024)',
        'quote': '„Ebenso wie wir verfügt Renner über eine sehr lange Tradition, ist führend in seinem Segment und beliefert Kunden weltweit mit hervorragender Qualität. Uns verbinden gleiche Werte – und es ist wichtig, dass Renner weiterhin unabhängig arbeiten wird.“',
        'quote_author': 'Guido Zimmermann • President Steinway & Sons Hamburg',
        'images': [
          'Visuell/Video/steinwayshort.mp4',
          'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg'
        ],
        'image': 'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg',
        'image_caption': 'Historische Partnerschaft mit Steinway & Sons',
        'image_captions': [
          'Historische Partnerschaft mit Steinway & Sons: 100% operative Eigenständigkeit',
          'Clemens von Arnim in der Fertigung: Schutz der Belegschaft & Zukunftssicherung'
        ],
        'image_tag': '2019 Steinway',
        'slide_interval': 4500
      },
      {
        'id': 'heute',
        'year': 'Heute',
        'tag': 'Meuselwitz',
        'branch': 'up',
        'arrow': '▲',
        'badge': '2025+ • Welt-Hauptsitz',
        'heading': 'Heute: Tradition bewahren. Zukunft gestalten.',
        'sentence': 'Aus der kleinen Werkstatt von 1882 ist der globale Qualitätsmaßstab geworden. Heute bündelt Renner alle Kräfte am Welt-Hauptsitz Meuselwitz.',
        'bullets': [
          '<strong>Standortbündelung vollendet:</strong> Alle Fertigungsbereiche erfolgreich in Meuselwitz vereint.',
          '<strong>Dank an Team Gärtringen:</strong> Tiefste Anerkennung für jahrzehntelangen herausragenden Einsatz.',
          '<strong>Zukunft der Spitzenklasse:</strong> Konzentriertes Wissen sichert höchste Präzision für Generationen.'
        ],
        'fact': '✦ Tradition bewahren • Zukunft gestalten',
        'quote': '„Erfahrung ist die Basis – Perfektion das Ziel.“',
        'quote_author': 'Clemens Kunert • Louis Renner Meuselwitz',
        'image': 'Visuell/Video/LouisRennerMeuselwitzAußen.mp4',
        'video': 'Visuell/Video/LouisRennerMeuselwitzAußen.mp4',
        'image_caption': 'Welt-Hauptsitz Meuselwitz: Drohnenflug über das modernisierte Werksgelände mit neuer zentraler Filter- & Absauganlage (2026)',
        'image_tag': 'Meuselwitz 2026'
      }
    ]

    panels_html = []
    for idx, m in enumerate(history_milestones_data):
        active_cls = 'active' if idx == 0 else ''
        prev_dis = 'disabled' if idx == 0 else ''
        next_dis = ''
        next_title = 'Zur Baudokumentation' if idx == (len(history_milestones_data) - 1) else 'Weiter'

        bullets_html = ""
        if 'bullets' in m and m['bullets']:
            items = "".join([f'<li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span>{b}</span></li>' for b in m['bullets']])
            bullets_html = f'<ul class="hero-bullet-list">{items}</ul>'

        if 'images' in m and m['images']:
            img_tags = []
            captions = m.get('image_captions', [])
            slide_interval = m.get('slide_interval', 3500)
            for img_idx, img_src in enumerate(m['images']):
                act = ' active' if img_idx == 0 else ''
                is_vid = img_src.lower().endswith(('.mp4', '.webm', '.ogg', '.mov'))
                cap_attr = f' data-caption="{captions[img_idx]}"' if img_idx < len(captions) else ''
                fit_cls = ' fit-contain' if ('1882_renner' in img_src.lower() or 'rohlfing' in img_src.lower() or 'cristofori' in img_src.lower() or 'christofori' in img_src.lower() or 'érard' in img_src.lower() or 'erard' in img_src.lower()) else ''
                if is_vid:
                    img_tags.append(f'<video class="hero-image hero-slideshow-img hero-slideshow-video{act}" data-slide-index="{img_idx}" src="{img_src}" playsinline muted style="object-fit:contain; width:100%; height:100%; background:#000; pointer-events:none;"{cap_attr}></video>')
                else:
                    img_tags.append(f'<img class="hero-image hero-slideshow-img{act}{fit_cls}" data-slide-index="{img_idx}" src="{img_src}" alt="{m["heading"]} - Archivfoto {img_idx+1}"{cap_attr}>')
            dots = "".join([f'<span class="slideshow-dot{" active" if i==0 else ""}" data-target-index="{i}"></span>' for i in range(len(m['images']))])
            media_html = f'''<div class="hero-image-slideshow" data-slide-interval="{slide_interval}">
                  {"".join(img_tags)}
                  <div class="hero-slideshow-dots">
                    {dots}
                  </div>
                </div>'''
        else:
            is_vid = m.get('video') or (m.get('image') and m['image'].lower().endswith(('.mp4', '.webm', '.ogg', '.mov')))
            if is_vid:
                video_src = m.get('video') or m['image']
                media_html = f'''<video class="hero-image hero-video-media" src="{video_src}" preload="auto" playsinline muted loop style="object-fit:cover; width:100%; height:100%; background:#050505; cursor:pointer;" title="Klicken zum Pausieren/Abspielen"></video>
                <div class="video-buffer-shimmer" id="m8-video-shimmer" aria-hidden="true">
                  <div class="shimmer-spinner"></div>
                </div>'''
            else:
                media_html = f'<img class="hero-image" src="{m["image"]}" alt="{m["heading"]}">'

        card_html = f'''            <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                {media_html}
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">{m['image_tag']}</div>
                <div class="hero-image-caption">{m['image_caption']}</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">{m['year']}</div>
                  <span class="hero-step-tag">Meilenstein {idx + 1} von {len(history_milestones_data)}</span>
                </div>

                <h3 class="hero-title">{m['heading']}</h3>
                <p class="hero-sentence">{m['sentence']}</p>
                {bullets_html}

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">{m['fact']}</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev" {prev_dis} title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next" {next_dis} title="{next_title}">→</button>
                  </div>
                </div>
              </div>
            </div>'''

        counter_pill_html = f'''            <div class="tree-counter-pill">
              <span class="tree-counter-text">{m['quote']}</span>
              <span class="tree-counter-author">• {m['quote_author']}</span>
            </div>'''

        fire_backdrop_html = ""
        if m.get('id') == '1944':
            fire_backdrop_html = get_fire_backdrop_html() + "\n"

        sheen_backdrop_html = ""
        if m.get('id') == 'heute':
            sheen_backdrop_html = '''<div class="milestone-sheen-backdrop" aria-hidden="true">
              <div class="sheen-ambient-glow"></div>
              <div class="sheen-radial-flare"></div>
              <div class="sheen-corona-ring"></div>
            </div>
            <!-- Milestone 8 Ladefrequenz & Resonanz-Aura -->
            <div class="milestone-loading-frequency" id="m8-loading-frequency" aria-hidden="true">
              <div class="frequency-resonance-rings">
                <span class="freq-ring ring-1"></span>
                <span class="freq-ring ring-2"></span>
                <span class="freq-ring ring-3"></span>
              </div>
              <div class="frequency-indicator-pill">
                <div class="frequency-bars">
                  <span class="f-bar"></span>
                  <span class="f-bar"></span>
                  <span class="f-bar"></span>
                  <span class="f-bar"></span>
                  <span class="f-bar"></span>
                </div>
                <span class="frequency-text" data-i18n="s3_frequency_load">Meuselwitz 2026 • Ladefrequenz synchronisiert...</span>
              </div>
            </div>\n'''

        if m['branch'] == 'up':
            top_content = f'''{card_html}'''
            bottom_content = f'''{counter_pill_html}'''
        else:
            top_content = f'''{counter_pill_html}'''
            bottom_content = f'''{card_html}'''

        panels_html.append(f'''          <!-- MILESTONE {idx}: {m['year']} (Branch {m['branch'].upper()}) -->
          <div class="tree-milestone-panel {active_cls} branch-{m['branch']}" data-milestone="{idx}" id="tree-milestone-{idx}">
            {fire_backdrop_html}{sheen_backdrop_html}<div class="tree-watermark-year">{m['year']}</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
              {top_content}
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
              {bottom_content}
            </div>
          </div>''')

    panels_str = chr(10).join(panels_html)

    slides.append(f'''      <!-- SLIDE 3: 140+ Jahre Tradition & Meilensteine (Flying Light Point & Branching Ray) -->
      <section class="slide" data-slide="3">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s3_category">Teil 1: Einführung & Historie • Unsere Geschichte</div>
            <h2 class="slide-title" id="history-main-title">140+ Jahre Tradition & Perfektion (1882 – Heute)</h2>
            <div class="slide-subtitle" id="history-main-subtitle">Vom Stuttgarter Handwerksbetrieb zum Weltmaßstab für Klaviermechaniken & Hammerköpfe</div>
          </div>

          <!-- Timeline Controls -->
          <div class="vox-timeline-header-controls">
            <!-- Autoplay Video Mode Button -->
            <button class="vox-play-btn" id="vox-play-btn" title="Zeitreise als Video / Film abspielen">
              <span class="vox-play-icon" id="vox-play-icon">▶</span>
              <span class="vox-play-label" id="vox-play-label" data-i18n="vox_play">Zeitreise abspielen</span>
              <div class="vox-play-progress" id="vox-play-progress"></div>
            </button>

            <!-- Stepping Controls -->
            <div class="vox-nav-group">
              <button class="vox-step-btn" id="vox-prev-btn" disabled title="Nach links in die Vergangenheit">
                ← <span data-i18n="vox_past">Vergangenheit</span>
              </button>
              <span class="vox-step-counter" id="vox-step-counter" data-i18n="vox_start_journey">✦ Zeitreise starten</span>
              <button class="vox-step-btn highlight" id="vox-next-btn" title="Nach rechts in die Zukunft">
                <span id="vox-next-label" data-i18n="vox_future">In die Zukunft</span> →
              </button>
            </div>
          </div>
        </div>

        <!-- Central Timeline Container with Flying Light Sphere -->
        <div class="tree-timeline-container is-dark-start" id="tree-timeline-container">
          
          <!-- Full-Frame Canvas for Real Curved Comet Tail & Stardust Particles -->
          <canvas class="comet-trail-canvas" id="comet-trail-canvas"></canvas>

          <!-- Flying Light Sphere Traveler ("Licht-Kugel mit harmonischer Welle") -->
          <div class="flying-comet-traveler" id="flying-comet-traveler">
            <!-- Vertical Branching Ray (Der verzweigte Strahl vom Punkt zur Epoche) -->
            <div class="comet-branch-ray" id="comet-branch-ray">
              <div class="ray-light-shaft"></div>
              <div class="ray-blooming-flare"></div>
            </div>

            <!-- Radiant Harmonic Light Sphere Head (Die Kugel) -->
            <div class="comet-head-point" id="comet-head-point" data-luminosity="0">
              <div class="point-core-white"></div>
              <div class="point-corona-ring"></div>
              <div class="point-starburst-flare"></div>
              <div class="point-birth-burst" id="point-birth-burst"></div>
            </div>
          </div>

          <!-- Horizontal Tracking Viewport (Temporal Window: Only Current Section Seen) -->
          <div class="tree-viewport" id="tree-viewport">
            <!-- Sliding Panorama Track along the Organic Energy Stream -->
            <div class="tree-pan-track" id="tree-pan-track">
{panels_str}
            </div>
          </div>

        </div>
        <!-- Backward-compat hidden anchor for slide navigation hooks -->
        <div id="history-slide-body" style="display:none;"></div>
{get_watermark()}
      </section>''')

    # SLIDE 4: Interaktive Baudokumentation Meuselwitz (Harmonic Flying Light Point & Photo-Focus Timeline)
    transformation_milestones_data = [
        {
            'id': '2025-11',
            'monthYear': '11.2025',
            'branch': 'up',
            'phase': 'Phase 1: Hallenvorbereitung & Entkernung',
            'title': 'Start Bauvorhaben: Entkernung',
            'caption': 'Freilegung der tragenden Hallenstrukturen im Bereich des künftigen Verwaltungs- und Empfangstrakts.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/01_20251103_152224.jpg'
        },
        {
            'id': '2025-12',
            'monthYear': '12.2025',
            'branch': 'down',
            'phase': 'Phase 2: Entkernung Foyer & Baufeld',
            'title': 'Entkernung des Foyers & Eingangsbereichs',
            'caption': 'Blick vom Foyer in Richtung Filzproduktion: Freigeräumte Großflächen für die neue Manufaktur-Infrastruktur.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/14_20251201_135805.jpg'
        },
        {
            'id': '2026-01',
            'monthYear': '01.2026',
            'branch': 'up',
            'phase': 'Phase 3: Tiefbau & Medienversorgung',
            'title': 'Medien- & Trinkwasserversorgung',
            'caption': 'Präzise Schachtarbeiten für Frisch- und Brauchwasserleitungen – unterbrechungsfrei bei laufender Produktion.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/18_20260106_135356.jpg'
        },
        {
            'id': '2026-02',
            'monthYear': '02.2026',
            'branch': 'down',
            'phase': 'Phase 4: Klaviermechanik-Aufbau',
            'title': 'Aufbau der Klaviermechanik-Fertigung',
            'caption': 'Frühere Lagerflächen werden zur hochmodernen Fertigungsstraße für Klavier-Hebeglieder umgebaut.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/23_20260227_074933.jpg'
        },
        {
            'id': '2026-03',
            'monthYear': '03.2026',
            'branch': 'up',
            'phase': 'Phase 5: Moderne Lagerlogistik',
            'title': 'Intelligente Lagerlogistik & Lagerlifte',
            'caption': 'Maximale Flächeneffizienz: Installation moderner vertikaler Shuttle-Lagerlifte für zehntausende Bauteile.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/25_20260320_090128.jpg'
        },
        {
            'id': '2026-04',
            'monthYear': '04.2026',
            'branch': 'down',
            'phase': 'Phase 6: Umzug Hammerkopffertigung',
            'title': 'Umzug der Hammerkopf-Manufaktur',
            'caption': 'Das akustische Herzstück von Renner bezieht seinen neuen, klimastabilen Fertigungsbereich in Meuselwitz.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/34_20260521_144701.jpg'
        },
        {
            'id': '2026-05-fundament',
            'monthYear': '05.2026',
            'branch': 'up',
            'phase': 'Phase 7: Fundamente Absauganlage',
            'title': 'Spezialfundament für die Filteranlage',
            'caption': 'Statische Hochpräzision: Fundamentierung für die 40 Tonnen schwere und 12 Meter hohe zentrale Absauganlage.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/27_20260428_083959.jpg'
        },
        {
            'id': '2026-05-kranhub',
            'monthYear': '05.2026',
            'branch': 'down',
            'phase': 'Phase 8: Kranhub der Filtermodule',
            'title': 'Anlieferung & Kranhub der Filtermodule',
            'caption': 'Schwerlast-Logistik per 70-Tonnen-Autokran: Millimetergenaue Positionierung der tonnenschweren Filterkomponenten.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/31_20260512_113224.mp4'
        },
        {
            'id': '2026-05-kranmontage',
            'monthYear': '05.2026',
            'branch': 'up',
            'phase': 'Phase 9: Kranmontage des Filterturms',
            'title': 'Kranmontage des Filterturms',
            'caption': 'Präzisionsmontage in luftiger Höhe: Das 12 Meter hohe Filterturm-Oberteil wird auf die schwingungsentkoppelte Stahlkonstruktion gesetzt.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/33_20260513_120405.jpg'
        },
        {
            'id': '2026-06',
            'monthYear': '06.2026',
            'branch': 'down',
            'phase': 'Phase 10: Montage der Großfilteranlage',
            'title': 'Montage der Großfilter- & Absauganlage',
            'caption': 'Mit 120.000 m³/h Luftleistung garantiert die neu errichtete Filteranlage staubfreie, hochpräzise Fertigungsprozesse.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/36_20260610_075535.jpg'
        },
        {
            'id': '2026-07',
            'monthYear': '07.2026',
            'branch': 'up',
            'phase': 'Phase 11: Hallenverrohrung & Trassenbau',
            'title': 'Absaugtrassen & Hallenverrohrung',
            'caption': 'Installation der großdimensionierten Rohrtrassen zur lückenlosen Absaugung aller Holzbearbeitungsmaschinen.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/38_20260708_120853.jpg'
        },
        {
            'id': '2026-09',
            'monthYear': '09.2026',
            'branch': 'down',
            'phase': 'Phase 12: Dachzentrale & Klimatechnik',
            'title': 'Dachzentrale: Prozessluft & Klimatechnik',
            'caption': 'Perfekte Klimastabilität: Garantierte 45–50 % relative Luftfeuchte und konstante Temperaturen – sommers wie winters.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/42_20260909_094559.jpg'
        },
        {
            'id': '2026-09-klima',
            'monthYear': '09.2026',
            'branch': 'up',
            'phase': 'Phase 13: Prozessluft- & Klimaanlage',
            'title': 'Prozessluft- und Klimaanlage',
            'caption': 'Hocheffiziente Prozessluft- und Klimatechnik auf dem Werksdach: Höchste Klimastabilität für anspruchsvollste Holz- und Filzverarbeitung.',
            'image': 'Visuell/Bilder/02_Meuselwitz_Umbau/44_20260915_133800.jpg'
        },
        {
            'id': '2026-10',
            'monthYear': '10.2026',
            'branch': 'down',
            'phase': 'Phase 14: Kehlerei & Vollbetrieb Meuselwitz',
            'title': 'Montage der Kehlerei & Vollendung',
            'caption': 'Letzte Abteilung erfolgreich verlagert: Die traditionsreiche Kehlerei und die gesamte Holzfertigung produzieren nun in Meuselwitz.',
            'image': 'Visuell/Bilder/02_Umbau_und_Umzug/48_20261009_081342.jpg'
        }
    ]

    build_panels_html = []
    total_phases = len(transformation_milestones_data)
    for idx, m in enumerate(transformation_milestones_data):
        active_cls = 'active' if idx == 0 else ''
        prev_dis = 'disabled' if idx == 0 else ''
        next_dis = ''
        next_title = 'Nächste Folie' if idx == (total_phases - 1) else 'Weiter'

        media_src = m['image']
        media_title = m['title']
        is_video = media_src.lower().endswith(('.mp4', '.webm', '.mov'))
        if is_video:
            media_html = f'<video class="photo-card-img" src="{media_src}" autoplay loop muted playsinline></video>'
        else:
            media_html = f'<img class="photo-card-img" src="{media_src}" alt="{media_title}">'

        card_html = f'''            <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                {media_html}
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">{m['monthYear']}</div>
                <div class="photo-card-step-badge">Bauphase {idx + 1} von {total_phases}</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">{m['title']}</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">{m['caption']}</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev" {prev_dis} title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next" {next_dis} title="{next_title}">→</button>
                </div>
              </div>
            </div>'''

        counter_pill_html = f'''            <div class="tree-counter-pill">
              <span class="tree-counter-text">{m['phase']}</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>'''

        if m['branch'] == 'up':
            top_content = f'''{card_html}'''
            bottom_content = f'''{counter_pill_html}'''
        else:
            top_content = f'''{counter_pill_html}'''
            bottom_content = f'''{card_html}'''

        build_panels_html.append(f'''          <!-- BUILD MILESTONE {idx}: {m['monthYear']} (Branch {m['branch'].upper()}) -->
          <div class="tree-milestone-panel build-milestone-panel {active_cls} branch-{m['branch']}" data-milestone="{idx}" id="build-milestone-{idx}">
            <div class="tree-watermark-year tree-watermark-month-year">{m['monthYear']}</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
              {top_content}
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
              {bottom_content}
            </div>
          </div>''')

    build_panels_str = chr(10).join(build_panels_html)

    slides.append(f'''      <!-- SLIDE 4: Interaktive Baudokumentation Meuselwitz (Harmonic Flying Light Point & Photo-Focus Timeline) -->
      <section class="slide" data-slide="4">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s4_category">Teil 1: Einführung & Historie • Meuselwitz Transformation</div>
            <h2 class="slide-title" id="build-main-title">Baudokumentation: Die Entstehung des neuen Werks</h2>
            <div class="slide-subtitle" id="build-main-subtitle">Fotodokumentation der Meilensteine des Umbaus in Meuselwitz (11.2025 – 10.2026)</div>
          </div>

          <!-- Timeline Controls -->
          <div class="vox-timeline-header-controls">
            <!-- Autoplay Video Mode Button -->
            <button class="vox-play-btn" id="build-play-btn" title="Fotoreise als Video / Film abspielen">
              <span class="vox-play-icon" id="build-play-icon">▶</span>
              <span class="vox-play-label" id="build-play-label" data-i18n="build_play">Fotoreise abspielen</span>
              <div class="vox-play-progress" id="build-play-progress"></div>
            </button>

            <!-- Stepping Controls -->
            <div class="vox-nav-group">
              <button class="vox-step-btn" id="build-prev-btn" disabled title="Nach links in die Vergangenheit">
                ← <span data-i18n="vox_past">Vergangenheit</span>
              </button>
              <span class="vox-step-counter" id="build-step-counter" data-i18n="build_start_journey">✦ Fotoreise starten</span>
              <button class="vox-step-btn highlight" id="build-next-btn" title="Nach rechts in die Zukunft">
                <span id="build-next-label" data-i18n="vox_future">In die Zukunft</span> →
              </button>
            </div>
          </div>
        </div>

        <!-- Central Timeline Container with Flying Light Sphere -->
        <div class="tree-timeline-container is-dark-start" id="build-timeline-container">
          
          <!-- Full-Frame Canvas for Real Curved Comet Tail & Stardust Particles -->
          <canvas class="comet-trail-canvas" id="build-trail-canvas"></canvas>

          <!-- Flying Light Sphere Traveler ("Licht-Kugel mit harmonischer Welle") -->
          <div class="flying-comet-traveler" id="build-comet-traveler">
            <!-- Vertical Branching Ray -->
            <div class="comet-branch-ray" id="build-branch-ray">
              <div class="ray-light-shaft"></div>
              <div class="ray-blooming-flare"></div>
            </div>

            <!-- Radiant Harmonic Light Sphere Head -->
            <div class="comet-head-point" id="build-head-point" data-luminosity="0">
              <div class="point-core-white"></div>
              <div class="point-corona-ring"></div>
              <div class="point-starburst-flare"></div>
              <div class="point-birth-burst" id="build-birth-burst"></div>
            </div>
          </div>

          <!-- Horizontal Tracking Viewport -->
          <div class="tree-viewport" id="build-viewport">
            <!-- Sliding Panorama Track -->
            <div class="tree-pan-track" id="build-pan-track">
{build_panels_str}
            </div>
          </div>

        </div>
        <!-- Backward-compat hidden anchor for slide navigation hooks -->
        <div id="build-slide-body" style="display:none;"></div>
{get_watermark()}
      </section>''')


    # =========================================================================
    # KAPITEL 2: DIE FILZHERSTELLUNG BEI FFW WURZEN (FFW & WEICKERT) (5 - 14)
    # =========================================================================

    # SLIDE 5: FFW Wurzen Firmengeschichte & Der Hochwertige Weickert-Filz
    slides.append(f'''<!-- SLIDE 5 (Animierte FFW Firmengeschichte & Weickert-Filz) -->
      <section class="slide" data-slide="5">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s5_category">Teil 2: Filzherstellung • Historie & Tradition</div>
            <h2 class="slide-title" data-i18n="s5_title">Filzfabrik Wurzen (FFW) – Die Wiege des Hammerkopffilzes</h2>
            <div class="slide-subtitle" data-i18n="s5_subtitle">Wurzen 1783 • Vom ersten Pianofortefilz 1847 zur Weickert-Spezial-Partnerschaft mit Renner</div>
          </div>

          <!-- Timeline Stepper & Autoplay Controls -->
          <div class="ffw-timeline-controls">
            <button class="ffw-play-btn" id="ffw-play-btn" title="Zeitreise abspielen">
              <span class="ffw-play-icon" id="ffw-play-icon">▶</span>
              <span class="ffw-play-label" data-i18n="s5_play_label">Zeitreise abspielen</span>
              <div class="ffw-play-progress" id="ffw-play-progress"></div>
            </button>
            <div class="ffw-step-buttons">
              <button class="ffw-step-btn prev" id="ffw-prev-btn" title="Vorheriger Meilenstein">←</button>
              <span class="ffw-step-counter" id="ffw-step-counter">1 / 6</span>
              <button class="ffw-step-btn next" id="ffw-next-btn" title="Nächster Meilenstein">→</button>
            </div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Interactive History Stage (60% width) -->
            <div class="ffw-history-main">
              <!-- Epoch Tabs Bar -->
              <div class="ffw-epoch-tabs" id="ffw-epoch-tabs" role="tablist">
                <button class="ffw-epoch-tab active" data-epoch="0" role="tab" aria-selected="true">
                  <span class="ffw-tab-year">1783</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab1_tag">Wurzen 1783</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="1" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">1847</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab2_tag">1. Pianofortefilz</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="2" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">1850–67</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab3_tag">Weltausstellung</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="3" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">1861</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab4_tag">Werk Wurzen</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="4" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">1906</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab5_tag">Weltmarktführer</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="5" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">Heute</span>
                  <span class="ffw-tab-tag" data-i18n="s5_tab6_tag">Weickert Spezial</span>
                </button>
              </div>

              <!-- Active Epoch Stage Card -->
              <div class="ffw-stage-card" id="ffw-stage-card">
                <!-- PANEL 0: 1783 GRÜNDUNG IN WURZEN -->
                <div class="ffw-milestone-panel active" data-panel="0">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b1_badge">>URSPRUNG WURZEN 1783</span>
                      <span class="ffw-panel-year">1783</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m1_title">Gründung der Filzmanufaktur in Wurzen</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m1_subtitle">Die älteste industrielle Filzmanufaktur der Welt – verwurzelt im sächsischen Muldental</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m1_bullet_1"><strong>Gründung 1783:</strong> Johann Dankegott Weickert begründet in Wurzen die sächsische Woll- und Filztradition.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m1_bullet_2"><strong>Pionier der Feinfilze:</strong> Aus der Handwerksmanufaktur wächst ein führendes Zentrum für edle technische Wollfilze.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m1_bullet_3"><strong>Fokus Klavierbau:</strong> Frühe Spezialisierung auf hochelastische Filze für den aufstrebenden Hammerflügelbau.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m1_fact">🏛 Älteste industrielle Filzmanufaktur der Welt in Wurzen</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_wolle_kardieren_vlies.jpeg" alt="Rohwolle Vlies zu Filz">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b2_badge">>FASER-URSPRUNG</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m1_caption">Vom handkardierten Rohwollvlies zur hochverdichteten Oberfilz-Tafel</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 1: 1847 DER ERSTE PIANOFORTEFILZ -->
                <div class="ffw-milestone-panel" data-panel="1">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b3_badge">>ERFINDUNG 1847</span>
                      <span class="ffw-panel-year">1847</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m2_title">Erster brauchbarer Pianofortefilz Deutschlands</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m2_subtitle">Patzschke & Weickert revolutionieren 1847 den europäischen Klavierbau</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m2_bullet_1"><strong>Filz ersetzt Leder:</strong> 1847 gelingt es erstmals, harte Lederbezüge durch homogenen Hammerkopffilz abzulösen.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m2_bullet_2"><strong>Meisterliche Symbiose:</strong> Weickerts Unternehmergeist und Patzschkes Filz-Expertise begründen den Weltruf.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m2_bullet_3"><strong>Standortfaktor Mulde:</strong> Das kalkarme, weiche Wasser der Mulde sichert reinstes, elastisches Wollgewebe.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m2_fact">🎹 Meilenstein: Wurzener Filz löst Lederbezüge im Klavierbau ab</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_golzernmuehle_1850_large.png" alt="Golzernmühle 1850">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b4_badge">>GOLZERNMÜHLE 1850</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m2_caption">Golzernmühle bei Grimma (1850): Erste Filzfertigung auf einer Insel in der Mulde</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 2: 1850–1867 WELTAUSSTELLUNGEN & MEDAILLEN -->
                <div class="ffw-milestone-panel" data-panel="2">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b5_badge">>WELTRUHM 1851</span>
                      <span class="ffw-panel-year">1851</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m3_title">Weltausstellungen & Goldmedaillen London & Paris</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m3_subtitle">Internationale Triumphe und königliche Ehrungen für vollendete Filzgüte</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m3_bullet_1"><strong>Weltausstellungs-Gold:</strong> Höchste Prämierungen in Leipzig (1850), London (1851) und Paris (1867) begründen den Weltruhm.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m3_bullet_2"><strong>Königliche Besuche:</strong> Sächsische Monarchen würdigen persönlich die überragende Qualität der Wurzener Manufaktur.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m3_bullet_3"><strong>Europas erste Wahl:</strong> Führende Klavierbauer in Wien, Paris und London stellen geschlossen auf Weickert-Filz um.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m3_fact">🏅 Goldmedaillen London 1851, Paris 1867 & Leipzig 1850</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media medal-spotlight">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_medaille_1850.jpg" alt="Historische Medaillen">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b6_badge">>AUSZEICHNUNGEN</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m3_caption">Historische Medaillen der Weltausstellungen für vollendete Filzgüte</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 3: 1861 WERK WURZEN -->
                <div class="ffw-milestone-panel" data-panel="3">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b7_badge">>EXPANSION 1861</span>
                      <span class="ffw-panel-year">1861</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m4_title">Großfertigung am Mühlgraben in Wurzen</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m4_subtitle">Dampfkraft, modernste Walkwerke und die Kraft der Vereinigten Mulde</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m4_bullet_1"><strong>Industrielle Großfertigung:</strong> 1861 entstehen moderne Hallen am Wurzener Mühlgraben mit eigener Dampfkraft.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m4_bullet_2"><strong>Präzisions-Walkmaschinen:</strong> Dampfgetriebene Spezialmaschinen garantieren unerreichte Dichte und Chargenkonstanz.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m4_bullet_3"><strong>Schonende Wollwäsche:</strong> Das mineralarme Mulde-Wasser schützt die natürliche Schuppenstruktur der Merinowolle.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m4_fact">⚙️ Dampf-Walkerei & Flusswasser am Wurzener Mühlgraben</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_fabrik_1871.jpg" alt="Pianofortefilzfabrik Wurzen 1871">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b8_badge">>WURZEN 1871</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m4_caption">Originalansicht der Pianofortefilzfabrik in Wurzen 1871 am Mühlgraben</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 4: 1906 WELTMARKTFÜHRER & MEISTER MIT PATZSCHKE -->
                <div class="ffw-milestone-panel" data-panel="4">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b9_badge">>WELTMARKTFÜHRER 1906</span>
                      <span class="ffw-panel-year">1906</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m5_title">Weltmarktführer für 200.000 Klaviere jährlich</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m5_subtitle">Direktor Patzschke, seine Meister & 350 Fachkräfte im Wurzener Werk (1906)</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m5_bullet_1"><strong>Globaler Weltmarktführer:</strong> Wurzen stattet jährlich 200.000 Klaviere und Flügel weltweit mit Hammerkopffilz aus.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m5_bullet_2"><strong>Weltweiter Standard:</strong> Steinway & Sons New York und Europas Spitzenmanufakturen setzen auf Wurzener Filz.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m5_bullet_3"><strong>Meister & Direktor Patzschke:</strong> Historisches Originalfoto (1906) am monumentalen, keilförmig gewalkten Filzblock.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m5_fact">🌎 Weltweiter Referenzstandard für Steinway & Sons New York</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/FilzfabrikWurzen_1906.jpg" alt="Filzfabrik Wurzen 1906 – Meister und Herr Patzschke" style="object-position: center 30%;">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b10_badge">>MEISTER & HERR PATZSCHKE (1906)</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m5_caption">Historische Originalaufnahme (Sept. 1906): Meister der Filzfabrik Wurzen mit Direktor Patzschke am Filzzuschnitt-Tisch</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 5: HEUTE RENAISSANCE & RENNER MEUSELWITZ PARTNERSCHAFT -->
                <div class="ffw-milestone-panel" data-panel="5">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s5_b11_badge">>HEUTE • RENNER PARTNER</span>
                      <span class="ffw-panel-year">Heute</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s5_m6_title">Renaissance von „Weickert Spezial“ & Partnerschaft mit Renner</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s5_m6_subtitle">Traditionswerk Wurzen & direkte räumliche Nähe zur Renner-Fabrik in Meuselwitz</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m6_bullet_1"><strong>Wiedergeburt 2010:</strong> Familie Brand reaktiviert die legendäre Originalrezeptur von 1903 für absolute Weltklasse.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m6_bullet_2"><strong>Räumliche Nähe (nur 65 km):</strong> Wurzen und das Renner-Werk Meuselwitz liegen im gemeinsamen mitteldeutschen Klavierbau-Cluster.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s5_m6_bullet_3"><strong>Direkter Meister-Austausch:</strong> Kurze Wege ermöglichen die persönliche Abstimmung von Dichte und Elastizität vor Ort.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s5_m6_fact">📍 Nur 65 km: Direkte Partnerschaft Wurzen ↔ Renner Meuselwitz</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/IMG_1360.jpg" alt="Weickert Spezial Hammerkopf mit Renner und FFW Prägung">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s5_b12_badge">>WEICKERT SPEZIAL</span>
                      <span class="ffw-media-caption-text" data-i18n="s5_m6_caption">Wurzener Weickert Spezial Filz: Vollendete Intonation & klangliche Tiefe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: High Quality Felt Spotlight (40% width) -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s5_b13_badge">>100% REINE MERINO-SCHURWOLLE</span>
                  <div class="bento-card-title" data-i18n="s5_c1_title">Das Geheimnis des Weickert-Filzes</div>
                  <div class="bento-card-desc" data-i18n="s5_c1_desc">
                    Rein mechanische Verfilzung ohne chemische Zusätze – die klangliche Seele des Konzertflügels
                  </div>
                </div>

                <!-- Felt Texture Viewer Box with Zoom -->
                <div class="ffw-texture-viewer" id="ffw-texture-viewer" title="Klicken für Makro-Faser-Inspektion">
                  <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_filz_walken_kompression.jpeg" alt="Rohfilzstruktur" class="ffw-texture-img" id="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s5_texture_tag">Mikro-Textur: Walk-Kompression</span>
                    <button class="ffw-zoom-toggle-btn" id="ffw-zoom-toggle-btn" data-i18n="s5_zoom_btn">🔍 Faser-Lupe</button>
                  </div>
                </div>

                <!-- 4 Acoustic Excellence Highlights -->
                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s5_hl1_title">Exklusive Wollmischung:</strong>
                      <span data-i18n="s5_hl1_desc">Exklusive Filzmischung aus erlesener Wolle aus Argentinien, Südafrika und Neuseeland: Erst das präzise Zusammenspiel aus langen feinen Fasern und stark verzahnenden Wollen ergibt diesen extrem zugfesten Hammerkopffilz.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s5_hl2_title">Reine Walkung ohne Harze:</strong>
                      <span data-i18n="s5_hl2_desc">Verdichtung nur durch Mulde-Wasser, Hitze und Druck – frei von dämpfenden Kunstharzen oder Klebern.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s5_hl3_title">Dauerelastisches Rückfedern:</strong>
                      <span data-i18n="s5_hl3_desc">Natürliche Keratinfedern federn in Millisekunden ab – für freie Entfaltung des vollen Obertonspektrums.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s5_hl4_title">Räumliche Nähe Meuselwitz (65 km):</strong>
                      <span data-i18n="s5_hl4_desc">Nur ca. 65 km Distanz sichern direkten Austausch der Filz- und Hammerkopfmeister sowie sofortige Verfügbarkeit.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 6: Rohwolle & Faserselektion (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 6 (FFW Felt Stage: Rohwolle & Faserselektion) -->
      <section class="slide ffw-felt-slide" data-slide="6">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s6_category">Teil 2: Filzherstellung • Rohstoff & Wolle</div>
            <h2 class="slide-title" data-i18n="s6_title">Reine Schurwolle: Schonung der Faserstruktur</h2>
            <div class="slide-subtitle" data-i18n="s6_subtitle">Nur unverpresste Rohwolle garantiert die maximale natürliche Elastizität</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s6_b1_badge">>ROHSTOFF-SELEKTION</span>
                      <span class="ffw-panel-year">01</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s6_panel_title">Selektion edler Merinowolle aus Übersee</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s6_panel_subtitle">Schonender Transport in unverpressten Ballen bewahrt die mikroskopische Schuppenstruktur</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s6_bullet_1"><strong>Ballenlieferung ohne Überpressung:</strong> Die Rohwolle wird in locker gepackten Ballen transportiert. Zu starkes Verpressen würde die empfindlichen Schuppen und Biegungen der Wollfasern irreversibel schädigen.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s6_bullet_2"><strong>Höhere Logistikkosten für Spitzenqualität:</strong> Dieser schonende Transport erhöht das Transportvolumen, sichert jedoch die unversehrte Faserelastizität.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s6_bullet_3"><strong>Starke Faserkräuselung:</strong> Nur hochgradig gekräuselte Merinowollfasern bieten beim späteren Walkprozess den optimalen Verhakungseffekt.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s6_fact_badge">🐑 100% reine Merinoschurwolle ohne synthetische Beimischung</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p5_2.jpg" alt="Unverpresste Wollballen">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s6_b2_badge">>UNVERPRESSTE BALLEN</span>
                      <span class="ffw-media-caption-text" data-i18n="s6_caption_1">Anlieferung der Rohwolle: Schonend gelagerte Wollballen bei FFW</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s6_b3_badge">>FASERINTEGRITÄT</span>
                  <div class="bento-card-title" data-i18n="s6_c1_title">Die Naturkraft des Keratins</div>
                  <div class="bento-card-desc" data-i18n="s6_c1_desc">Die intakte Schuppenstruktur entscheidet über die spätere Anschlagselastizität des Hammerkopfs</div>
                </div>

                <div class="ffw-texture-viewer" id="s6-texture-viewer" title="Detailansicht">
                  <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p5_3.jpg" alt="Merinowollfasern Kräuselung" class="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s6_texture_tag">Faser-Makro: Schuppenstruktur</span>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s6_hl1_title">Schonende Carbonisierung:</strong>
                      <span data-i18n="s6_hl1_desc">Sanfte biologisch-mechanische Reinigung entfernt pflanzliche Reste ohne die Keratin-Proteinstruktur anzugreifen.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s6_hl2_title">Natürliche Spiralfedern:</strong>
                      <span data-i18n="s6_hl2_desc">Millionen feiner Biegungen federn den Aufprall an den Saiten in Millisekunden ab.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s6_hl3_title">Reines Wollfett (Lanolin):</strong>
                      <span data-i18n="s6_hl3_desc">Bewahrt die Fasergeschmeidigkeit und schützt vor Versprödung bei Raumklimaschwankungen.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 7: Die geheime Wollmischung (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 7 (FFW Felt Stage: Die geheime Wollmischung) -->
      <section class="slide ffw-felt-slide" data-slide="7">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s7_category">Teil 2: Filzherstellung • Wollmischung</div>
            <h2 class="slide-title" data-i18n="s7_title">Die geheime Rezeptur der Wollmischung</h2>
            <div class="slide-subtitle" data-i18n="s7_subtitle">Auflockerung und Mischung verschiedener Wollpartien für maßgeschneiderte Dichten</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s7_b1_badge">>MANUFAKTURGEHEIMNIS</span>
                      <span class="ffw-panel-year">02</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s7_panel_title">Präzises Zusammenspiel verschiedener Wollcharaktere</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s7_panel_subtitle">Auflockerung und Mischung verschiedener Wollpartien für maßgeschneiderte Dichten</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s7_bullet_1"><strong>Blend-Verfahren:</strong> Mischen unterschiedlicher Faserlängen und -stärken, um spezifische Federsteifigkeiten zu erzielen.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s7_bullet_2"><strong>Faserauflockerung:</strong> Mehrstufiges maschinelles Zupfen und Belüften trennt Faserknäuel sanft in Einzelfasern.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s7_bullet_3"><strong>Klimakonditionierung:</strong> Konstante Feuchteaufnahme vor dem Kardieren verhindert elektrostatische Aufladung und Faserbruch.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s7_fact_badge">🔒 Exklusive Renner-Mischung für maximale dynamische Bandbreite</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p6_2.jpg" alt="Mischen der Wollfasern">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s7_b2_badge">>FASERAUFBEREITUNG</span>
                      <span class="ffw-media-caption-text" data-i18n="s7_caption_1">Auflockerungs- und Mischprozess der Faserchargen bei FFW Wurzen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s7_b3_badge">>REZEPTUR-BALANCE</span>
                  <div class="bento-card-title" data-i18n="s7_c1_title">Federsteifigkeit nach Maß</div>
                  <div class="bento-card-desc" data-i18n="s7_c1_desc">Harmonisches Gleichgewicht aus langen Spannungsfasern und feinen Füllhaaren</div>
                </div>

                <div class="ffw-texture-viewer" id="s7-texture-viewer" title="Detailansicht">
                  <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_wolle_kardieren_vlies.jpeg" alt="Fasermischungs-Inspektion" class="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s7_texture_tag">Rezeptur: Chargen-Zusammenführung</span>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s7_hl1_title">Lange Zugfasern:</strong>
                      <span data-i18n="s7_hl1_desc">Nehmen die enormen Dehnspannungen beim Umbiegen um die Hammerkern-Spitze auf.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s7_hl2_title">Feine Füllfasern:</strong>
                      <span data-i18n="s7_hl2_desc">Verdichten die Zwischenräume und sichern das elastische Rückstellvermögen.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s7_hl3_title">Homogene Elastizität:</strong>
                      <span data-i18n="s7_hl3_desc">Verhindert Dichteschwankungen und harte Nester über alle 88 Töne.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 8: Krempeln & Vliesbildung (Carding) (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 8 (FFW Felt Stage: Krempeln & Vliesbildung) -->
      <section class="slide ffw-felt-slide" data-slide="8">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s8_category">Teil 2: Filzherstellung • Vlies & Faserrichtung</div>
            <h2 class="slide-title" data-i18n="s8_title">Krempeln: Parallele Ausrichtung zu weichen Vliesen</h2>
            <div class="slide-subtitle" data-i18n="s8_subtitle">Die definierte Faserorientierung als Fundament für Schwingung und Saitenansprache</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s8_b1_badge">>FASERORIENTIERUNG</span>
                      <span class="ffw-panel-year">03</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s8_panel_title">Trommelkarden kämmen die Fasern parallel</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s8_panel_subtitle">Gezielte Längs- und Querausrichtung für vorhersehbare Elastizität beim Anschlag</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s8_bullet_1"><strong>Kardieren (Carding):</strong> Die aufgelockerten Fasern werden über feine Nadelwalzen gekämmt, entwirrt und parallel zueinander angeordnet.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s8_bullet_2"><strong>Definierte Faserrichtung:</strong> Das so entstehende hauchdünne, weiche Vlies besitzt eine exakt vorgegebene Vorzugsrichtung der Fasern.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s8_bullet_3"><strong>Schichtung:</strong> Mehrere Vlieslagen werden im Kreuz- und Längsverbund übereinandergelegt, um die gewünschte Plattendicke und Dichteverteilung aufzubauen.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s8_fact_badge">🧵 Parallele Faserführung ist die Grundvoraussetzung präziser Intonation</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p7_2.jpg" alt="Krempeln zu Vlies">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s8_b2_badge">>KARDIEREN & VLIES</span>
                      <span class="ffw-media-caption-text" data-i18n="s8_caption_1">Auskämmen der Wolle zu seidig fließenden Vliesen mit definierter Faserrichtung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s8_b3_badge">>VLIES-STRUKTUR</span>
                  <div class="bento-card-title" data-i18n="s8_c1_title">Voraussetzung für die Intonation</div>
                  <div class="bento-card-desc" data-i18n="s8_c1_desc">Nur parallel geordnete Fasern reagieren bei späteren Intonierarbeiten vorhersehbar und gleichmäßig auf Nadelstiche</div>
                </div>

                <div class="ffw-texture-viewer" id="s8-texture-viewer" title="Detailansicht">
                  <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p7_3.jpg" alt="Ausgerichtetes Wollvlies" class="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s8_texture_tag">Vlies-Flor: ausgerichtete Fasern</span>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s8_hl1_title">Gleitende Nadelung:</strong>
                      <span data-i18n="s8_hl1_desc">Intoniernadeln verdrängen parallele Fasern, anstatt sie zu zerschneiden.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s8_hl2_title">Fließende Dichteverläufe:</strong>
                      <span data-i18n="s8_hl2_desc">Schichtung im Kreuzverbund verhindert Delamination bei extremem Tastendruck.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s8_hl3_title">Maximale Faserlänge:</strong>
                      <span data-i18n="s8_hl3_desc">Schonendes Kardieren verhindert Faserbruch und sichert maximale Zugfestigkeit des Vlieses.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 9: Der Walkprozess (Felting) (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 9 (FFW Felt Stage: Der Walkprozess) -->
      <section class="slide ffw-felt-slide" data-slide="9">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s9_category">Teil 2: Filzherstellung • Walkprozess</div>
            <h2 class="slide-title" data-i18n="s9_title">Die 4 Säulen des Walkens: Dampf, Druck, Bewegung & Wissen</h2>
            <div class="slide-subtitle" data-i18n="s9_subtitle">Verschlingung der Fasern durch natürliche physikalisch-thermische Reize</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s9_b1_badge">>HAMMERWALKE</span>
                      <span class="ffw-panel-year">04</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s9_panel_title">Reine mechanische Verfilzung ohne Fremdstoffe</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s9_panel_subtitle">Wasser, Wärme, Druck und Rhythmus verschlingen die Fasern dauerhaft</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s9_bullet_1"><strong>1. Heißdampf:</strong> Öffnet die mikroskopischen Schuppen der Haare und macht das Keratin geschmeidig.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s9_bullet_2"><strong>2. Mechanischer Druck:</strong> Presst die Vlieslagen kontinuierlich zusammen und leitet die Verdichtung ein.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s9_bullet_3"><strong>3. Oszillierende Bewegung:</strong> Reibung verschlingt die Widerhaken der Fasern unlösbar ineinander.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s9_bullet_4"><strong>4. Handwerkliches Know-how:</strong> Gefühl für den exakten Abbruchzeitpunkt bestimmt Elastizität und Resonanz.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s9_fact_badge">🌊 Ausschließlich weiches Muldental-Wasser und Hitze – 100% chemiefrei</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p8_2.jpg" alt="Vergleich geschichtete Fließbahnen vs. Fertige Oberfilztafel">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s9_b2_badge">>HANDWERKSKUNST</span>
                      <span class="ffw-media-caption-text" data-i18n="s9_caption_1">Zusammenführen und Walken der Vlieslagen zur homogenen Filzplatte</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s9_b3_badge">>WALK-KOMPRESSION</span>
                  <div class="bento-card-title" data-i18n="s9_c1_title">Physikalische Verdichtung</div>
                  <div class="bento-card-desc" data-i18n="s9_c1_desc">Die Schuppen der Wollhaare verhaken sich mikromechanisch wie Kletten</div>
                </div>

                <div class="ffw-texture-viewer" id="s9-texture-viewer" title="Detailansicht">
                  <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p8_3.jpg" alt="Walkmaschine Dampf und Druck" class="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s9_texture_tag">Mikro-Textur: Walk-Kompression</span>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s9_hl1_title">Keine Dämpfung durch Kleber:</strong>
                      <span data-i18n="s9_hl1_desc">Rein mechanische Verfilzung erhält die freie Schwingung der Wollhaare.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s9_hl2_title">Dauerelastizität:</strong>
                      <span data-i18n="s9_hl2_desc">Natürliche Keratinfedern federn in Millisekunden ab und ermüden nicht.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s9_hl3_title">Maximale Obertonreinheit:</strong>
                      <span data-i18n="s9_hl3_desc">Das weiche Muldental-Wasser verhindert Mineralablagerungen in den Poren.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 10: Natürliche Walkhärte: 0.56 Shore (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 10 (FFW Felt Stage: Natürliche Walkhärte 0.56 Shore) -->
      <section class="slide ffw-felt-slide" data-slide="10">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s10_category">Teil 2: Filzherstellung • Elastizität</div>
            <h2 class="slide-title" data-i18n="s10_title">0.56 Shore: Die Grenze der natürlichen Walkhärte</h2>
            <div class="slide-subtitle" data-i18n="s10_subtitle">Maximale Eigenelastizität durch Verzicht auf chemische oder thermische Überhärtung</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s10_b1_badge">>PHYSIKALISCHE GRENZE</span>
                      <span class="ffw-panel-year">0.56</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s10_panel_title">Vollendete Verdichtung an der physikalischen Grenze</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s10_panel_subtitle">Filzplatten werden exakt bis zum Punkt verdichtet, an dem sich die Fasern optimal berühren</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s10_bullet_1"><strong>Maximale Faserkompression:</strong> Die Fasern lassen sich auf rein mechanischem Wege nicht weiter zusammenschieben, ohne beschädigt zu werden.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s10_bullet_2"><strong>Höchste natürliche Rückstellkraft:</strong> Entspricht dem physikalischen Optimum an Eigenelastizität für den Konzertflügelanschlag.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s10_bullet_3"><strong>Frei von Kunstharzen:</strong> Verzicht auf synthetische Versteifer oder chemische Überhärtung sichert dauerhafte Resonanz.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s10_fact_badge">🎯 0.56 Shore: Reinste Eigenelastizität ohne Verhärtungsmittel</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p9_2.jpg" alt="Gewalkte Filzplatte bei 0.56 Shore">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s10_b2_badge">>FFW WURZEN</span>
                      <span class="ffw-media-caption-text" data-i18n="s10_caption_2">Nachbearbeitung: Verdichten der Filzplatten mit Hämmern und Steinen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s10_b3_badge">>AKUSTISCHE PERFEKTION</span>
                  <div class="bento-card-title" data-i18n="s10_c1_title">Federkraft statt Härte</div>
                  <div class="bento-card-desc" data-i18n="s10_c1_desc">Reine Walkhärte liefert unübertroffenes dynamisches Ansprechverhalten am Konzertflügel</div>
                </div>

                <div class="ffw-texture-viewer" id="s10-texture-viewer" title="Detailansicht">
                  <img src="Visuell/Bilder/03_Hammerkopf_Fertigung/03.1_Filz_FFW/ffw_filz_walken_kompression.jpeg" alt="Rohfilzstruktur" class="ffw-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s10_texture_tag">Die natürliche Walkdichte kann maximal 56% betragen.</span>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s10_hl1_title">Schneller Let-Off:</strong>
                      <span data-i18n="s10_hl1_desc">Der Hammer löst sich verzögerungsfrei von der Saite – kein Abdämpfen des Tons.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s10_hl2_title">Farbenreicher Klang:</strong>
                      <span data-i18n="s10_hl2_desc">Volle Ausbildung der Grund- und Teiltöne ohne Schrillheit im Diskant.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s10_hl3_title">Stabiler Anschlag:</strong>
                      <span data-i18n="s10_hl3_desc">Konstante Dichte über zehntausende Anschläge hinweg.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 11: Nachpressen mit Filzhämmern & Steinen (FFW Felt Stage)
    slides.append(f'''<!-- SLIDE 11 (FFW Felt Stage: Nachpressen mit Filzhämmern & Steinen) -->
      <section class="slide ffw-felt-slide" data-slide="11">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s11_category">Teil 2: Filzherstellung • Nachverdichtung</div>
            <h2 class="slide-title" data-i18n="s11_title">Verdichten mit Filzhämmern & Filzsteinen</h2>
            <div class="slide-subtitle" data-i18n="s11_subtitle">Formgebung auf Endmaß ohne Schleifen – Bewahrung der seidigen Faserhaut</div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Main Stage Card -->
            <div class="ffw-history-main">
              <div class="ffw-stage-card">
                <div class="ffw-static-panel">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s11_b1_badge">>FORMGEBUNG OHNE SCHLEIFEN</span>
                      <span class="ffw-panel-year">05</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s11_panel_title">Manuelle Verdichtung und Egalisierung</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s11_panel_subtitle">Gezielte Hammerschläge bringen die Filzplatten auf das exakte Maß und entspannen das Fasergefüge</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s11_bullet_1"><strong>Mechanisches Nachschlagen:</strong> Spezielle Filzhämmer und polierte Natursteine verdichten die Platten auf die exakten Sollmaße.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s11_bullet_2"><strong>Verzicht auf Schleifen:</strong> Wird Filz geschliffen, werden Abermillionen Fasern gekappt. Das Weickert-Verfahren verzichtet vollständig auf Schleifen.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s11_bullet_3"><strong>Glatter Biegeradius:</strong> Beim Biegen um den Holzkern bleibt die Oberfläche vollkommen geschlossen und glatt – ohne Reißen oder Auseinanderrutschen.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s11_fact_badge">🔨 Intakte Oberflächenfaserhaut sichert maximale Langlebigkeit</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/04_Hammerkopf_Spezifikation/hk_prd_auswahl_10_25_p9_3.jpg" alt="Verdichten mit Filzhämmern">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s11_b2_badge">>HAMMER & STEIN</span>
                      <span class="ffw-media-caption-text" data-i18n="s11_caption_1">Gewalkte Filzplatten mit einer natürlichen Eindringfestigkeit im Bereich von 56 bis 68 Shore-A.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Felt Spotlight Card -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s11_b3_badge">>SCHICHTAUFBAU & RÜCKGRAT</span>
                  <div class="bento-card-title" data-i18n="s11_c1_title">Zugspannung & Formstabilität: Das Vliesbahnen-Rückgrat</div>
                  <div class="bento-card-desc" data-i18n="s11_c1_desc">Ungeschliffen halten 2×6 Vliesbahnen die volle Zugspannung. Geschliffen verschieben und lockern sich die Fasern: Die Spannung nimmt drastisch ab.</div>
                </div>

                <!-- ANIMATION: 2x6 Vliesbahnen & Schleif-Schadens-Simulation (Vergrößert) -->
                <div class="ffw-felt-anatomy-container is-intact" id="s11-felt-anatomy" role="region" aria-label="Filztafel Schichtaufbau und Vliesbahnen-Spannungsanimation">
                  <!-- Interactive Control Header -->
                  <div class="felt-anatomy-controls">
                    <div class="felt-mode-group">
                      <button class="felt-mode-btn active" id="felt-btn-intact" data-mode="intact" title="Ungeschliffen: 2×6 Vliesbahnen nehmen alle Zugkräfte auf">
                        <span class="mode-dot green"></span>
                        <span data-i18n="s11_anim_mode_intact">✦ Ungeschliffen (Spannung hält)</span>
                      </button>
                      <button class="felt-mode-btn" id="felt-btn-sanded" data-mode="sanded" title="Geschliffen: Vliesbahnen zerstört – Tafel kann Spannung nicht halten">
                        <span class="mode-dot red"></span>
                        <span data-i18n="s11_anim_mode_sanded">⚠️ Geschliffen (Verformung)</span>
                      </button>
                    </div>
                    <div class="felt-tension-kpi" id="felt-tension-kpi" title="Mechanische Formstabilität & Spannungsaufnahme">
                      <div class="kpi-label-row">
                        <span class="kpi-title" data-i18n="s11_anim_gauge_label">Spannungs- & Formstabilität</span>
                        <span class="kpi-value" id="felt-tension-val">100%</span>
                      </div>
                      <div class="kpi-meter-bar">
                        <div class="kpi-meter-fill" id="felt-tension-meter" style="width: 100%;"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Interactive Graphic Stage (Enlarged) -->
                  <div class="felt-anatomy-stage" id="felt-anatomy-stage">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>

                    <!-- SVG Tension vs Deformation Illustration -->
                    <svg class="felt-cross-section-svg" viewBox="0 0 540 220" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <!-- Gradients -->
                        <linearGradient id="feltCoreGradIntact" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#162238"/>
                          <stop offset="50%" stop-color="#263554"/>
                          <stop offset="100%" stop-color="#162238"/>
                        </linearGradient>

                        <linearGradient id="feltCoreGradDeformed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#3b1d22"/>
                          <stop offset="50%" stop-color="#4c1d24"/>
                          <stop offset="100%" stop-color="#2a1518"/>
                        </linearGradient>

                        <linearGradient id="vliesGradGold" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stop-color="#22c55e" stop-opacity="0.85"/>
                          <stop offset="20%" stop-color="#86efac" stop-opacity="1"/>
                          <stop offset="50%" stop-color="#ffd700" stop-opacity="1"/>
                          <stop offset="80%" stop-color="#86efac" stop-opacity="1"/>
                          <stop offset="100%" stop-color="#22c55e" stop-opacity="0.85"/>
                        </linearGradient>

                        <linearGradient id="vliesGradSevered" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
                          <stop offset="40%" stop-color="#f87171" stop-opacity="0.8"/>
                          <stop offset="70%" stop-color="#7f1d1d" stop-opacity="0.4"/>
                          <stop offset="100%" stop-color="#450a0a" stop-opacity="0.2"/>
                        </linearGradient>

                        <filter id="goldTensGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2.5" result="blur"/>
                          <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>

                        <filter id="damageAlertGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3.5" result="blur"/>
                          <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>

                        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20,0 L 0,0 0,20" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="0.8"/>
                        </pattern>

                        <pattern id="woolPatt2" width="16" height="16" patternUnits="userSpaceOnUse">
                          <path d="M 0,8 Q 4,2 8,8 T 16,8" fill="none" stroke="rgba(200, 163, 86, 0.15)" stroke-width="1.2"/>
                        </pattern>
                      </defs>

                      <!-- Technical Background Grid -->
                      <rect x="0" y="0" width="540" height="220" fill="url(#gridPattern)"/>

                      <!-- Left & Right Clamping Fixtures -->
                      <g class="clamping-fixture left-clamp">
                        <rect x="24" y="136" width="46" height="54" rx="4" fill="#1e293b" stroke="rgba(200,163,86,0.4)" stroke-width="1.5"/>
                        <circle cx="47" cy="148" r="3.5" fill="#c8a356"/>
                        <circle cx="47" cy="178" r="3.5" fill="#c8a356"/>
                        <line x1="14" y1="163" x2="34" y2="163" stroke="#22c55e" stroke-width="2.5"/>
                        <polygon points="37,163 30,159 30,167" fill="#22c55e"/>
                        <text x="47" y="196" text-anchor="middle" class="svg-clamp-label" data-i18n="s11_svg_clamp">EINSPANNUNG</text>
                      </g>

                      <g class="clamping-fixture right-clamp">
                        <rect x="470" y="136" width="46" height="54" rx="4" fill="#1e293b" stroke="rgba(200,163,86,0.4)" stroke-width="1.5"/>
                        <circle cx="493" cy="148" r="3.5" fill="#c8a356"/>
                        <circle cx="493" cy="178" r="3.5" fill="#c8a356"/>
                        <line x1="526" y1="163" x2="506" y2="163" stroke="#22c55e" stroke-width="2.5"/>
                        <polygon points="503,163 510,159 510,167" fill="#22c55e"/>
                        <text x="493" y="196" text-anchor="middle" class="svg-clamp-label" data-i18n="s11_svg_clamp">EINSPANNUNG</text>
                      </g>

                      <!-- ======================================================== -->
                      <!-- STATE 1: UNGESCHLIFFEN - DIE SPANNUNG HÄLT (FORMSTABIL) -->
                      <!-- ======================================================== -->
                      <g class="felt-geometry-group group-intact" id="svg-felt-intact">
                        <!-- Felt Body Fill (Bogenform) -->
                        <path class="felt-body-fill intact-body" d="M 70,162 Q 270,36 470,162 L 470,192 Q 270,96 70,192 Z" fill="url(#feltCoreGradIntact)" stroke="rgba(200,163,86,0.25)" stroke-width="1"/>
                        <path d="M 70,162 Q 270,36 470,162 L 470,192 Q 270,96 70,192 Z" fill="url(#woolPatt2)" opacity="0.6"/>

                        <!-- Central Elastic Cushion Wave -->
                        <path class="intact-core-wave" d="M 75,178 Q 170,95 270,68 Q 370,95 465,178" fill="none" stroke="rgba(200, 163, 86, 0.35)" stroke-width="1.5" stroke-dasharray="4,4"/>

                        <!-- TOP 6 CONTINUOUS FLEECE WEBS (Oberseite: ZUGTRÄGER) -->
                        <g class="top-vlies-layers">
                          <path class="vlies-line vlies-t1" d="M 70,162 Q 270,36 470,162" stroke="url(#vliesGradGold)" stroke-width="3" stroke-linecap="round"/>
                          <path class="vlies-line vlies-t2" d="M 70,166 Q 270,42 470,166" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-t3" d="M 70,170 Q 270,48 470,170" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-t4" d="M 70,174 Q 270,54 470,174" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-t5" d="M 70,178 Q 270,60 470,178" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-t6" d="M 70,182 Q 270,66 470,182" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>

                          <!-- Dynamic Tension Pulse Traveling along the webs -->
                          <path class="vlies-dynamic-pulse" d="M 70,162 Q 270,36 470,162" stroke="#ffffff" stroke-width="2" stroke-dasharray="14,35" filter="url(#goldTensGlow)"/>
                        </g>

                        <!-- BOTTOM 6 CONTINUOUS FLEECE WEBS (Unterseite: DRUCKZONE) -->
                        <g class="bottom-vlies-layers">
                          <path class="vlies-line vlies-b1" d="M 70,183 Q 270,86 470,183" stroke="url(#vliesGradGold)" stroke-width="2" stroke-linecap="round"/>
                          <path class="vlies-line vlies-b2" d="M 70,185 Q 270,88 470,185" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-b3" d="M 70,187 Q 270,90 470,187" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-b4" d="M 70,189 Q 270,92 470,189" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-b5" d="M 70,191 Q 270,94 470,191" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                          <path class="vlies-line vlies-b6" d="M 70,193 Q 270,96 470,193" stroke="url(#vliesGradGold)" stroke-width="2.5" stroke-linecap="round"/>
                        </g>

                        <!-- Tension Vector Arrows (Zugkraft-Aufnahme) -->
                        <g class="tension-arrows-intact">
                          <polygon points="163,92 153,95 158,102" fill="#86efac"/>
                          <path d="M 125,122 L 160,94" stroke="#86efac" stroke-width="2"/>
                          <polygon points="377,92 387,95 382,102" fill="#86efac"/>
                          <path d="M 415,122 L 380,94" stroke="#86efac" stroke-width="2"/>

                          <text x="270" y="24" text-anchor="middle" class="svg-badge-text-green" data-i18n="s11_svg_vlies_intact">◀── 2×6 VLIESBAHNEN NEHMEN ZUGSPANNUNG VOLL AUF (FORMSTABIL) ──▶</text>
                          <text x="270" y="80" text-anchor="middle" class="svg-core-sub" data-i18n="s11_svg_core_sub">Elastische Rückstellkraft: 100% Federwirkung</text>
                        </g>

                        <!-- Crown Stability Badge -->
                        <rect x="175" y="4" width="190" height="20" rx="4" fill="rgba(6, 78, 59, 0.94)" stroke="#22c55e" stroke-width="1.2"/>
                        <text x="270" y="18" text-anchor="middle" class="svg-crown-badge-green" data-i18n="s11_svg_crown_intact">✓ SPANNUNG HÄLT: FORMSTABIL</text>
                      </g>

                      <!-- ======================================================== -->
                      <!-- STATE 2: GESCHLIFFEN - KANN SPANNUNG NICHT HALTEN (VERFORMUNG) -->
                      <!-- ======================================================== -->
                      <g class="felt-geometry-group group-deformed" id="svg-felt-deformed">
                        <!-- Ghost Ideal Reference Line (Shows where unground felt stood) -->
                        <g class="ghost-reference-arch">
                          <path d="M 70,162 Q 270,36 470,162" fill="none" stroke="rgba(200, 163, 86, 0.45)" stroke-dasharray="5,4" stroke-width="1.8"/>
                          <text x="270" y="32" text-anchor="middle" class="svg-ghost-label" data-i18n="s11_svg_ghost_label">--- SOLL-KONTUR (Ungeschliffen: Formstabil unter Spannung) ---</text>
                        </g>

                        <!-- Deformed / Buckled Felt Body Fill (Sunken at center, deformed) -->
                        <path class="felt-body-fill deformed-body" d="M 70,162 Q 155,95 195,108 Q 235,122 270,122 Q 305,122 345,108 Q 385,95 470,162 L 470,192 Q 375,142 270,158 Q 165,142 70,192 Z" fill="url(#feltCoreGradDeformed)" stroke="#ef4444" stroke-width="1.2"/>
                        <path d="M 70,162 Q 155,95 195,108 Q 235,122 270,122 Q 305,122 345,108 Q 385,95 470,162 L 470,192 Q 375,142 270,158 Q 165,142 70,192 Z" fill="url(#woolPatt2)" opacity="0.4"/>

                        <!-- Severed Fleece Layers (Left Side: ending with broken frays at X=195) -->
                        <g class="severed-left-layers">
                          <path d="M 70,162 Q 155,95 195,108" stroke="url(#vliesGradSevered)" stroke-width="3" stroke-linecap="round"/>
                          <path d="M 70,166 Q 155,99 193,111" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 70,170 Q 155,103 191,114" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 70,174 Q 155,107 189,117" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 70,178 Q 155,111 187,120" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 70,182 Q 155,115 185,123" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <!-- Frayed Fiber Stubs Left -->
                          <path d="M 193,106 L 202,109 M 190,113 L 200,116 M 186,120 L 195,123" stroke="#fca5a5" stroke-width="2" stroke-linecap="round"/>
                        </g>

                        <!-- Severed Fleece Layers (Right Side: ending with broken frays at X=345) -->
                        <g class="severed-right-layers">
                          <path d="M 470,162 Q 385,95 345,108" stroke="url(#vliesGradSevered)" stroke-width="3" stroke-linecap="round"/>
                          <path d="M 470,166 Q 385,99 347,111" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 470,170 Q 385,103 349,114" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 470,174 Q 385,107 351,117" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 470,178 Q 385,111 353,120" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <path d="M 470,182 Q 385,115 355,123" stroke="url(#vliesGradSevered)" stroke-width="2.5" stroke-linecap="round"/>
                          <!-- Frayed Fiber Stubs Right -->
                          <path d="M 347,106 L 338,109 M 350,113 L 340,116 M 354,120 L 345,123" stroke="#fca5a5" stroke-width="2" stroke-linecap="round"/>
                        </g>

                        <!-- Sanded Ground Trench (X: 195 to 345 - no continuous fleece!) -->
                        <path d="M 195,108 Q 235,122 270,122 Q 305,122 345,108" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
                        
                        <!-- Downward Fiber Shift & Tension Drop Callout (No mm values) -->
                        <g class="deformation-indicator">
                          <line x1="270" y1="42" x2="270" y2="108" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,2"/>
                          <polygon points="270,114 265,103 275,103" fill="#ef4444"/>
                          <rect x="265" y="62" width="258" height="24" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#ef4444" stroke-width="1.2"/>
                          <text x="272" y="77" class="svg-deform-callout" fill="#fca5a5" data-i18n="s11_svg_deform_callout">▼ FASERN VERSCHIEBEN &amp; RUTSCHEN: &gt; 40 % SPANNUNGSVERLUST</text>
                        </g>

                        <!-- Structural Tear / Crack at Apex (Scheitel-Riss & Delamination) -->
                        <g class="apex-crack">
                          <path d="M 264,122 L 270,148 L 276,122 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1.2" filter="url(#damageAlertGlow)"/>
                          <line x1="255" y1="126" x2="285" y2="126" stroke="#fca5a5" stroke-width="1.5"/>
                          <text x="270" y="162" text-anchor="middle" class="svg-crack-label" data-i18n="s11_svg_crack_label">⚠️ SCHEITEL-RISS (Fasern reißen &amp; rutschen auseinander)</text>
                        </g>

                        <!-- Deformed Bottom Layer -->
                        <path d="M 70,192 Q 165,142 270,158 Q 375,142 470,192" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,4"/>

                        <!-- Failure Alert Banner -->
                        <rect x="75" y="4" width="390" height="20" rx="4" fill="rgba(153, 27, 27, 0.95)" stroke="#ef4444" stroke-width="1.2"/>
                        <text x="270" y="18" text-anchor="middle" class="svg-crown-badge-red" data-i18n="s11_svg_crown_sanded">⚠️ HÄLT SPANNUNG NICHT (&gt; 40 % VERLUST): FASERN VERRUTSCHEN</text>
                      </g>
                    </svg>

                    <!-- Bottom Status Caption Bar -->
                    <div class="felt-stage-status-bar" id="felt-stage-status-bar">
                      <span class="status-indicator-dot green" id="felt-status-dot"></span>
                      <span class="status-caption-text" id="felt-status-text" data-i18n="s11_anim_status_intact">✓ Ungeschliffen: 2×6 Vliesbahnen halten Zugspannung • Formstabil</span>
                      <button class="felt-auto-toggle-btn active" id="felt-auto-toggle-btn" title="Automatischen Vergleich starten/pausieren">
                        <span class="auto-toggle-icon">⏸</span>
                        <span class="auto-toggle-text" data-i18n="s11_anim_auto_toggle">Auto-Vergleich</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <div class="ffw-hl-header">
                      <span class="ffw-hl-dot"></span>
                      <strong data-i18n="s11_hl1_title">2×6 Vliesbahnen:</strong>
                    </div>
                    <span data-i18n="s11_hl1_desc">Tragendes Spannungs-Rückgrat (oben & unten).</span>
                  </div>
                  <div class="ffw-highlight-item">
                    <div class="ffw-hl-header">
                      <span class="ffw-hl-dot"></span>
                      <strong data-i18n="s11_hl2_title">Ungeschliffen (Hält):</strong>
                    </div>
                    <span data-i18n="s11_hl2_desc">Nimmt alle Zugkräfte auf – 100% formstabil.</span>
                  </div>
                  <div class="ffw-highlight-item">
                    <div class="ffw-hl-header">
                      <span class="ffw-hl-dot"></span>
                      <strong data-i18n="s11_hl3_title">Geschliffen (Kollaps):</strong>
                    </div>
                    <span data-i18n="s11_hl3_desc">Gekappte Fasern verschieben sich &amp; rutschen – über 40 % Spannungsverlust.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')


    # SLIDE 12: Das klimatisierte Filzlager in Meuselwitz (Sander Bento)
    slides.append(f'''<!-- SLIDE 12 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="12">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s12_category">Teil 2: Filzherstellung • Filzlager Meuselwitz</div>
            <h2 class="slide-title" data-i18n="s12_title">Über 30 Plattensorten im klimatisierten Lager</h2>
            <div class="slide-subtitle" data-i18n="s12_subtitle">Konische Plattengeometrie und permanente Reifekontrolle im Werk Meuselwitz</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge gold" data-i18n="s12_b1_badge">>KLIMATISIERTES FILZLAGER</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">30+</span>
                <span class="bento-metric-unit">Plattensorten</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s12_bullet_1"><strong>Konische Plattenform:</strong> Die Filzplatten sind werkseitig keilförmig aufgebaut – dicker und schwerer im Bass, stetig dünner und dichter werdend zum Diskant hin.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s12_bullet_2"><strong>Über 30 Rezepturen auf Lager:</strong> Renner hält permanent weit über 30 verschiedene Filzplattensorten von FFW Wurzen vorrätig – mehr als jeder andere Hersteller weltweit.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s12_bullet_3"><strong>Klimakontrolle & Mottenschutz:</strong> Kontrollierte Luftfeuchte und Pheromonfallen schützen das Naturmaterial dauerhaft.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s12_bullet_4"><strong>Spannungsfreies Reifen:</strong> Mindestlagerdauer vor dem Zuschnitt baut innere Restspannungen vollständig ab.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_10_2_Image202.jpg" alt="Filzlager Meuselwitz">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s12_b2_badge">>MEUSELWITZ LAGER</span>
                <div class="bento-media-caption" data-i18n="s12_caption_1">Filzplattenlager im Werk Meuselwitz: Über 30 Plattensorten permanent verfügbar</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 13: Die „Seele“ des Filzes (Sander Bento)
    slides.append(f'''<!-- SLIDE 13 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="13">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s13_category">Teil 2: Filzherstellung • Filz-Identifikation</div>
            <h2 class="slide-title" data-i18n="s13_title">Die „Seele“: Das Markenzeichen der Wurzener Filze</h2>
            <div class="slide-subtitle" data-i18n="s13_subtitle">1 oder 2 farbige Schichten am Bass-Beginn als traditioneller Herkunftsnachweis</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge gold" data-i18n="s13_b1_badge">>MARKENZEICHEN</span>
              <div class="bento-card-desc" style="line-height: 1.6; color: var(--text-secondary); margin-bottom: 14px;" data-i18n="s13_c1_desc">
                Beim Blick auf originale Renner-Hammerköpfe im Bass fällt oft ein feiner farbiger Streifen im Inneren des Filzes auf.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s13_bullet_1"><strong>Was ist die „Seele“?</strong> Eine dünne, andersfarbige Filzschicht, die bei der Plattenherstellung am Bassanfang eingearbeitet wird.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s13_bullet_2"><strong>Traditioneller Herkunftsnachweis:</strong> Ein historisches Echtheitsmerkmal der Filzfabrik Wurzen für Klavierbauer weltweit.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s13_bullet_3"><strong>Kein Qualitätsunterschied:</strong> Platten mit 1 oder 2 Seelen besitzen identische Fasereigenschaften – sie dienen der Chargenkennzeichnung und optischen Authentizität.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_11_2_Image206.jpg" alt="Filzstreifen mit Seele">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s13_b2_badge">>DICHTEGRADIENT</span>
                <div class="bento-media-caption" data-i18n="s13_caption_1">Filzstreifen mit sichtbarer „Seele“ (farbige Kennzeichnungsschicht am Bassanfang)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 14: Exklusiv: Der „Weickert Special“-Filz (Sander Bento)
    slides.append(f'''<!-- SLIDE 14 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="14">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s14_category">Teil 2: Filzherstellung • Weickert Special</div>
            <h2 class="slide-title" data-i18n="s14_title">„Weickert Special“: Nur für Louis Renner</h2>
            <div class="slide-subtitle" data-i18n="s14_subtitle">Höchster Lanolingehalt für unübertroffene Intonationsstabilität und Tonansprache</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge gold" data-i18n="s14_b1_badge">>EXKLUSIVITÄT</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">100%</span>
                <span class="bento-metric-unit">Renner Exklusiv</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s14_bullet_1"><strong>Exklusivrezeptur:</strong> Wird von der Filzfabrik Wurzen ausschließlich für Renner gefertigt.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s14_bullet_2"><strong>Höherer Wollfettgehalt (Lanolin):</strong> Spezieller Waschprozess belässt mehr natürliches Lanolin in der Faser.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s14_bullet_3"><strong>Reduziertes Quellverhalten:</strong> Deutlich unempfindlicher gegenüber jahreszeitlichen Luftfeuchteschwankungen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s14_bullet_4"><strong>Verbesserte Traktionskräfte:</strong> Außergewöhnliche Adhäsion und Eigenspannung am Holzkern.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s14_bullet_5"><strong>Dauerhafte Intonationshaltung:</strong> Der einmal intonierte Klangcharakter bleibt über Jahre stabil.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_11_3_Image207.jpg" alt="Weickert Special Filz">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s14_b2_badge">>WEICKERT SPECIAL</span>
                <div class="bento-media-caption" data-i18n="s14_caption_1">Weickert Special: Feinste Wollfaserqualität mit maximaler Standzeit</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # =========================================================================
    # KAPITEL 3: DIE NEUE HAMMERKOPF-FERTIGUNG IN MEUSELWITZ (15 - 26)
    # =========================================================================

    # SLIDE 15: Filzzuschnitt mit Robotertechnologie (Sander Bento)
    slides.append(f'''<!-- SLIDE 15 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="15">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s15_category">Teil 3: Hammerkopf-Produktion • Roboter-Zuschnitt</div>
            <h2 class="slide-title" data-i18n="s15_title">Robotischer Filzzuschnitt: Höchste Schnittpräzision</h2>
            <div class="slide-subtitle" data-i18n="s15_subtitle">Automatisiertes Trennen der Filzplatten in exakt proportionierte Deckfilzstreifen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s15_b1_badge">>ROBOTERTECHNOLOGIE</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">±0,01</span>
                <span class="bento-metric-unit">mm Toleranz</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s15_bullet_1"><strong>Präzisions-Robotik:</strong> 6-Achs-Roboter führt das Spezial-Schneidmesser mit gleichbleibender Geschwindigkeit und Schnittdruck.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s15_bullet_2"><strong>Gleichmäßige Streifen:</strong> Exakt parallele Kanten ohne Quetschungen oder thermische Faserverglasung.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s15_bullet_3"><strong>Automatische Signierung:</strong> Jeder geschnittene Streifen wird sofort mit internen Fertigungs- und Chargendaten codiert.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s15_bullet_4"><strong>Industrie 4.0 im Klavierbau:</strong> Digitale Rückverfolgbarkeit vom Wollballen bis zum fertigen Konzertflügel.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image15.png">
                <source src="Visuell/Videos/01_roboter_filzzuschnitt.mp4" type="video/mp4">
              </video>
              <div class="bento-media-overlay" style="pointer-events: none;">
                <span class="bento-badge green" data-i18n="s15_b2_badge">>WERKSVIDEO MEUSELWITZ</span>
                <div class="bento-media-caption" data-i18n="s15_caption_1">Werk Meuselwitz: Robotischer Filzzuschnitt der Deckfilzstreifen</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 16: Qualität der Deckfilzstreifen nach dem Schnitt (Sander Bento)
    slides.append(f'''<!-- SLIDE 16 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="16">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s16_category">Teil 3: Hammerkopf-Produktion • Deckfilz-Qualität</div>
            <h2 class="slide-title" data-i18n="s16_title">Kantenqualität & Faserintegrität des Deckfilzes</h2>
            <div class="slide-subtitle" data-i18n="s16_subtitle">Makellose Schnittflächen als Voraussetzung für spannungsfreies Umschlingen des Kerns</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s16_b1_badge">>QUALITÄTSKONTROLLE</span>
              <div class="bento-card-desc" data-i18n="s16_c1_desc">
                Nach dem Roboterschnitt wird jeder Streifen einer optischen Prüfung unterzogen.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s16_bullet_1"><strong>Konische Geometrie:</strong> Gleichmäßige Keilform von Note 1 bis Note 88 ohne Maßabweichungen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s16_bullet_2"><strong>Saubere Schnittkanten:</strong> Keine abstehenden Faserbündel, keine Fransen – glatte Seitenwände für den Leimauftrag.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s16_bullet_3"><strong>Vermeidung von Schiefzug:</strong> Nur exakt rechtwinklig geschnittene Streifen legen sich beim Pressen absolut symmetrisch um das Kernholz.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image16.jpeg" alt="Qualität Deckfilzstreifen">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s16_b2_badge">>DECKFILZ-STREIFEN</span>
                <div class="bento-media-caption" data-i18n="s16_caption_1">Geprüfter Deckfilzstreifen: Konischer Verlauf und homogene Faserstruktur</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 17: Unterfilz-Profilierung (Sander Bento)
    slides.append(f'''<!-- SLIDE 17 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="17">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s17_category">Teil 3: Hammerkopf-Produktion • Unterfilz</div>
            <h2 class="slide-title" data-i18n="s17_title">Unterfilz-Profilierung: Geometrie vor dem Verpressen</h2>
            <div class="slide-subtitle" data-i18n="s17_subtitle">Formfräsen des Unterfilzes für die optimale Dämpfungs- und Kraftübertragungszone</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s17_b1_badge">>UNTERFILZ-FRÄSEN</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s17_bullet_1"><strong>Funktion des Unterfilzes:</strong> Der Unterfilz dient als elastischer Puffer zwischen dem harten Holzkern und dem weicheren Deckfilz.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s17_bullet_2"><strong>Präzisions-Profilierung:</strong> In Meuselwitz wird der Unterfilzstreifen vor dem Verleimen auf Spezial-Fräsmaschinen exakt profiliert.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s17_bullet_3"><strong>Gleichmäßiger Druckverlauf:</strong> Die profilierte Kontur garantiert, dass der Pressdruck beim Schließen der Pressbacken gleichmäßig in die Flanken geleitet wird.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image17.png">
                <source src="Visuell/Videos/02_unterfilz_profilieren.mp4" type="video/mp4">
              </video>
              <div class="bento-media-overlay" style="pointer-events: none;">
                <span class="bento-badge green" data-i18n="s17_b2_badge">>WERKSVIDEO</span>
                <div class="bento-media-caption" data-i18n="s17_caption_1">Profilieren des Unterfilzstreifens auf der Renner Spezialfräse</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 18: Unterfilz-Farbprogramm (Sander Bento)
    slides.append(f'''<!-- SLIDE 18: Unterfilz-Farbprogramm -->
      <section class="slide slide-hero-theme" data-slide="18">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s18_category">Teil 3: Hammerkopf-Produktion • Farbprogramm</div>
            <h2 class="slide-title" data-i18n="s18_title">Das Renner Unterfilz-Farbsortiment</h2>
            <div class="slide-subtitle" data-i18n="s18_subtitle">Traditionsfarben für jeden Klavierhersteller und individuelle Sonderwünsche</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 12px;">
              <div class="bento-card" style="border-left: 4px solid #cc2222;">
                <div class="bento-card-header">
                  <span class="bento-badge red" data-i18n="s18_b1_badge">>KLASSIKER</span>
                </div>
                <div class="bento-card-title" data-i18n="s18_c1_title">Rot / Weinrot</div>
                <div class="bento-card-desc" data-i18n="s18_c1_desc">Der weltbekannte Renner-Klassiker; Standard bei vielen europäischen Spitzenmarken.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #ff9900;">
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s18_b2_badge">>KONZERTSERIE</span>
                </div>
                <div class="bento-card-title" data-i18n="s18_c2_title">Orange</div>
                <div class="bento-card-desc" data-i18n="s18_c2_desc">Traditionelle Kennfarbe klassischer Konzertinstrumente und historischer Reparaturen.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #ddbb00;">
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s18_b3_badge">>TRADITION</span>
                </div>
                <div class="bento-card-title" data-i18n="s18_c3_title">Gelb</div>
                <div class="bento-card-desc" data-i18n="s18_c3_desc">Charakteristischer Unterfilz für renommierte sächsische und Wiener Klaviere.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #2255cc;">
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s18_b4_badge">>DESIGN</span>
                </div>
                <div class="bento-card-title" data-i18n="s18_c4_title">Blau / Schwarz</div>
                <div class="bento-card-desc" data-i18n="s18_c4_desc">Klassisches Blau für C. Bechstein sowie edles Schwarz für moderne Designer-Flügel.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_14_2_Image226.jpg" alt="Unterfilz Farbpalette">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s18_b5_badge">>14 FARBTÖNE</span>
                <div class="bento-media-caption" data-i18n="s18_caption_1">Renner Unterfilz-Sortiment: Rot, Weinrot, Orange, Gelb, Blau, Schwarz</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 19: Kernholz-Arten & spezifische Dichten (Sander Bento Wood Grid)
    slides.append(f'''      <!-- SLIDE 19: Kernholz-Arten & Dichten -->
      <section class="slide slide-hero-theme" data-slide="19">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s19_category">Teil 3: Hammerkopf-Produktion • Kernholz-Arten</div>
            <h2 class="slide-title" data-i18n="s19_title">Kernholz-Arten & Spezifische Gewichte</h2>
            <div class="slide-subtitle" data-i18n="s19_subtitle">Die Masse und Elastizität des Kernholzes bestimmen Anschlagsträgheit und Tonfarbe</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 12px;">
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s19_b1_badge">>HARTHOLZ</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700;">800–860 kg/m³</span>
                </div>
                <div class="bento-card-title" data-i18n="s19_c1_title">Weißbuche (Hornbeam)</div>
                <div class="bento-card-desc" data-i18n="s19_c1_desc">Maximaler Punch, kraftvoller Attack, extrem formstabil</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s19_b2_badge">>MITTELFEST</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700;">530–790 kg/m³</span>
                </div>
                <div class="bento-card-title" data-i18n="s19_c2_title">Bergahorn (Maple)</div>
                <div class="bento-card-desc" data-i18n="s19_c2_desc">Brillant, transparent, differenzierter obertonreicher Ton</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s19_b3_badge">>MITTELFEST</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700;">590–680 kg/m³</span>
                </div>
                <div class="bento-card-title" data-i18n="s19_c3_title">Nussbaum (Walnut)</div>
                <div class="bento-card-desc" data-i18n="s19_c3_desc">Warmer, samtiger Grundton, volles Bassfundament</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s19_b4_badge">>MITTELFEST / LEICHT</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700;">490–750 kg/m³</span>
                </div>
                <div class="bento-card-title" data-i18n="s19_c4_title">Mahagoni (Kotibé)</div>
                <div class="bento-card-desc" data-i18n="s19_c4_desc">Geringe Trägheit, singender Diskant, leichte Ansprache</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_12_2_Image217.jpg" alt="Kernholz-Arten Renner">
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s19_b5_badge">>KERNHÖLZER</span>
                <div class="bento-media-caption" data-i18n="s19_caption_1">Original Kernhölzer</div>
                <div class="bento-media-subcaption" data-i18n="s19_caption_2">Weißbuche, Bergahorn, Nussbaum & Mahagoni (Kotibé)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 20: Kernholz-Profilformen (Sander Bento)
    slides.append(f'''<!-- SLIDE 20: Kernholz-Profilformen -->
      <section class="slide slide-hero-theme" data-slide="20">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s20_category">Teil 3: Hammerkopf-Produktion • Kern-Geometrie</div>
            <h2 class="slide-title" data-i18n="s20_title">Kernholz-Formen: Symmetrisch & Asymmetrisch</h2>
            <div class="slide-subtitle" data-i18n="s20_subtitle">Historische und moderne Fräsprofile für über 20 Flügel- und Klaviermarken</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s20_b1_badge">>SYMMETRISCH</span>
                </div>
                <div class="bento-card-title" data-i18n="s20_c1_title">Symmetrische Standardformen</div>
                <div class="bento-card-desc" data-i18n="s20_c1_desc">Für Steinway & Sons (historisch und modern), Bösendorfer sowie die Mehrheit aller klassischen europäischen Flügelmechaniken.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s20_b2_badge">>ASYMMETRISCH</span>
                </div>
                <div class="bento-card-title" data-i18n="s20_c2_title">Asymmetrische Sonderformen</div>
                <div class="bento-card-desc" data-i18n="s20_c2_desc">Für spezifische Geometrien, z. B. historische Blüthner-Flügel oder Instrumente mit speziellem Saitenkreuzungswinkel.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_14_2_Image229.jpg" alt="Kernholz Profilformen">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s20_b3_badge">>KERN-GEOMETRIE</span>
                <div class="bento-media-caption" data-i18n="s20_caption_1">Symmetrische und asymmetrische Kernholz-Profile im Querschnitt</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 21: Vorformung & Filzkurven (Sander Bento)
    slides.append(f'''<!-- SLIDE 21 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="21">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s21_category">Teil 3: Hammerkopf-Produktion • Vorformung</div>
            <h2 class="slide-title" data-i18n="s21_title">Vorformung des Bassfilzes & Biegekurven</h2>
            <div class="slide-subtitle" data-i18n="s21_subtitle">Ausbildung der charakteristischen Spannungsbögen vor dem Schließen der Presse</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s21_b1_badge">>VORFORMUNG</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s21_bullet_1"><strong>Elastische Vorbiegung:</strong> Das dicke Bass-Ende des Filzstreifens wird vor dem Einbringen in die Pressform vorkonditioniert.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s21_bullet_2"><strong>Charakteristische Kurven:</strong> Entlang des Streifens bilden sich harmonische Wellen, die den späteren Druckfluss abbilden.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s21_bullet_3"><strong>Gleichmäßige Dehnung:</strong> Verhindert das Reißen äußerer Faserlagen beim engen Umschließen der Kernholzspitze.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_15_2_Image229.jpg" alt="Vorformung Bassfilz">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s21_b2_badge">>BIEGEKRAFT</span>
                <div class="bento-media-caption" data-i18n="s21_caption_1">Bass-Ende des Filzstreifens mit charakteristischen Biegekurven vor dem Pressen</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 22: Press- und Verleimprozess – Zug- & Druckkräfte (Sander Bento)
    slides.append(f'''<!-- SLIDE 22 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="22">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s22_category">Teil 3: Hammerkopf-Produktion • Pressprozess</div>
            <h2 class="slide-title" data-i18n="s22_title">Pressen & Verleimen: Zug- und Druckkräfte im Filz</h2>
            <div class="slide-subtitle" data-i18n="s22_subtitle">Nachspannen des Kernholzes zur Erzeugung maximaler elastischer Außenspannung</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s22_b1_badge">>HOCHDRUCK-PRESSEN</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">16</span>
                <span class="bento-metric-unit">Tonnen Druck</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s22_bullet_1"><strong>Schließen der Seitenbacken:</strong> Die temperierten Pressbacken umschließen den Filz seitlich und führen ihn um das beleimte Kernholz.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s22_bullet_2"><strong>Kernholz nachspannen:</strong> Nachdem die Seitenbacken geschlossen sind, wird das Kernholz nochmals mit Hochdruck nachgespannt.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s22_bullet_3"><strong>Zugspannung in den Außenlagen:</strong> Durch diesen Renner-spezifischen Schritt erhalten die äußeren Filzlagen eine unerreichte Vorspannung.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s22_bullet_4"><strong>Basis für die spätere Intonation:</strong> Diese elastische Eigenspannung erlaubt späteres Intonieren mit unvergleichlicher Dynamikspreizung.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image21.jpg">
                <source src="Visuell/Videos/04_hammerkopf_pressen_leimen.mp4" type="video/mp4">
              </video>
              <div class="bento-media-overlay" style="pointer-events: none;">
                <span class="bento-badge green" data-i18n="s22_b2_badge">>WERKSVIDEO</span>
                <div class="bento-media-caption" data-i18n="s22_caption_1">Press- und Verleimvorgang des Hammerkopfs unter Hochdruck</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 23: Der Hammerkopf-Riegel nach dem Pressen (Sander Bento)
    slides.append(f'''<!-- SLIDE 23 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="23">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s23_category">Teil 3: Hammerkopf-Produktion • Hammerkopf-Riegel</div>
            <h2 class="slide-title" data-i18n="s23_title">Der Hammerkopf-Riegel im Rohzustand</h2>
            <div class="slide-subtitle" data-i18n="s23_subtitle">Entformung des monolithischen 88er-Riegels nach dem Aushärten des Leims</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s23_b1_badge">>RIEGEL-FERTIGUNG</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">88</span>
                <span class="bento-metric-unit">Tasten im Block</span>
              </div>
              <div class="bento-card-desc" data-i18n="s23_c1_desc">
                Nach dem kontrollierten Abkühlen und Abbinden des Leims wird der Hammerkopf als zusammenhängender Riegel entnommen.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s23_bullet_1"><strong>Perfekte Leimfuge:</strong> Vollflächige Verbindung zwischen Holz, Unterfilz und Deckfilz ohne Lufteinschlüsse.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s23_bullet_2"><strong>Harmonischer Übergang:</strong> Die Kernform zeichnet sich präzise unter dem komprimierten Filz ab.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s23_bullet_3"><strong>Betriebsgeheimnis der Formgebung:</strong> Bestimmte nachgelagerte Warmformschritte unterliegen dem strengen Renner-Verfahrensschutz.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image24.jpeg" alt="Hammerkopf-Riegel roh">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s23_b2_badge">>PRESS-RIEGEL</span>
                <div class="bento-media-caption" data-i18n="s23_caption_1">Der verleimte Hammerkopf-Riegel direkt nach dem Entformen</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 24: CNC-Bearbeitung des Hammerkopf-Riegels (Sander Bento)
    slides.append(f'''<!-- SLIDE 24 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="24">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s24_category">Teil 3: Hammerkopf-Produktion • CNC-Bearbeitung</div>
            <h2 class="slide-title" data-i18n="s24_title">CNC-Bearbeitung & Abrichten des Riegels</h2>
            <div class="slide-subtitle" data-i18n="s24_subtitle">Mehrachsiges Fräsen der Flanken und Trennen in 88 Einzelexemplare</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s24_b1_badge">>CNC-ABRICHTEN</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s24_bullet_1"><strong>CNC-Abrichten der Leisten:</strong> Beseitigung von Leimaustritten und exaktes Ausfräsen der Außenradien.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s24_bullet_2"><strong>Hochgeschwindigkeits-Fräsen:</strong> Spezialwerkzeuge schneiden den dichten Wollfilz mit rasiermesserscharfen Kanten ohne Faserausriss.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s24_bullet_3"><strong>Präzises Auftrennen:</strong> Trennen des Riegels in exakt abgestimmte Breiten (Bass ca. 11,5 mm bis Diskant ca. 9,5–10 mm).</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image25.jpg" alt="CNC Bearbeitung Hammerkopf">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s24_b2_badge">>CNC-FRÄSUNG</span>
                <div class="bento-media-caption" data-i18n="s24_caption_1">CNC-Präzisionsfräszentrum in Meuselwitz bei der Leistenbearbeitung</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 25: Bohren, T-Vernietung & Verrundung (Sander Bento)
    slides.append(f'''<!-- SLIDE 25 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="25">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s25_category">Teil 3: Hammerkopf-Produktion • Bohren & Vernieten</div>
            <h2 class="slide-title" data-i18n="s25_title">Bohrung, T-Vernietung & Veredelung</h2>
            <div class="slide-subtitle" data-i18n="s25_subtitle">Präzise Stielbohrung im Raumwinkel und formschlüssige Messing-T-Niete</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s25_b1_badge">>VEREDELUNG & ENDBEARBEITUNG</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">T</span>
                <span class="bento-metric-unit">Messing-Nietung</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s25_bullet_1"><strong>Automatisierte Stielbohrung:</strong> Bohren im exakten Raumwinkel (Bohrungslänge, Durchmesser ø 5,4 mm, Neigungswinkel in Gon).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s25_bullet_2"><strong>T-Vernietung (Riveting):</strong> Hochfeste Messing-T-Nieten sichern die Filzschenkel dauerhaft gegen Aufplatzen bei stärksten Konzertanschlägen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s25_bullet_3"><strong>Verrundung der Hammerschwänze:</strong> Speziell geformte Radien am Schwanz erleichtern später das Einpassen in den Fänger.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image29.png">
                <source src="Visuell/Videos/05_hammerkopf_bohren_nieten.mp4" type="video/mp4">
              </video>
              <div class="bento-media-overlay" style="pointer-events: none;">
                <span class="bento-badge green" data-i18n="s25_b2_badge">>WERKSVIDEO</span>
                <div class="bento-media-caption" data-i18n="s25_caption_1">Bohren und Einbringen der T-Nieten in Meuselwitz</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 26: Alle Vorteile der neuen Renner-Hammerköpfe (Sander Bento)
    slides.append(f'''<!-- SLIDE 26: Vorteile der neuen Renner-Hammerköpfe -->
      <section class="slide slide-hero-theme" data-slide="26">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s26_category">Teil 3: Hammerkopf-Produktion • Qualität & Nutzen</div>
            <h2 class="slide-title" data-i18n="s26_title">Die 6 Kernvorteile der neuen Renner-Hammerköpfe</h2>
            <div class="slide-subtitle" data-i18n="s26_subtitle">Zusammenfassung der Innovationskraft aus dem Vortrag von Clemens Kunert</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-3">
            <div class="bento-card">
              <div class="bento-step-watermark">01</div>
              <span class="bento-badge gold" data-i18n="s26_b1_badge">>MASSGESCHNEIDERT</span>
              <div class="bento-card-title" data-i18n="s26_c1_title">1. Maßgeschneiderte Fertigung</div>
              <div class="bento-card-desc" data-i18n="s26_c1_desc">Individuelle Sonderanfertigung von Einzelstücken für historische Schätze bis hin zu großen Konzert-Serien.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge green" data-i18n="s26_b2_badge">>EFFIZIENZ</span>
              <div class="bento-card-title" data-i18n="s26_c2_title">2. Direkt fertig zur Endintonation</div>
              <div class="bento-card-desc" data-i18n="s26_c2_desc">Keine zeitraubende Vorintonation am Instrument mehr nötig! Der Satz ist ab Werk klanglich vorbereitet.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s26_b3_badge">>PRÄZISION</span>
              <div class="bento-card-title" data-i18n="s26_c3_title">3. Höchste Fertigungspräzision</div>
              <div class="bento-card-desc" data-i18n="s26_c3_desc">Kombination aus traditionellem FFW-Filzhandwerk und mikrometergenauer Roboter- und CNC-Bearbeitung.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">04</div>
              <span class="bento-badge green" data-i18n="s26_b4_badge">>STABILITÄT</span>
              <div class="bento-card-title" data-i18n="s26_c4_title">4. Überragende Klangstabilität</div>
              <div class="bento-card-desc" data-i18n="s26_c4_desc">Durch die Eigenspannung des Weickert-Special-Filzes bleibt das Klangbild über viele Jahre hinweg stabil.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s26_b5_badge">>OBERTONREICH</span>
              <div class="bento-card-title" data-i18n="s26_c5_title">5. Reiches Obertonspektrum</div>
              <div class="bento-card-desc" data-i18n="s26_c5_desc">Breiteste Dynamikspreizung vom zartesten Pianissimo bis zum tragfähigen Fortissimo im großen Konzertsaal.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">06</div>
              <span class="bento-badge green" data-i18n="s26_b6_badge">>EINBAUFERTIG</span>
              <div class="bento-card-title" data-i18n="s26_c6_title">6. Einbaufertig veredelt</div>
              <div class="bento-card-desc" data-i18n="s26_c6_desc">Präzise gebohrt, formschlüssig vernietet, mit verrundeten Schwanzenden und veredelter Scheitelkontur.</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

        # =========================================================================
    # KAPITEL 4: DAS LOUIS RENNER YAMAHA KIT C1–C3 (27 - 37)
    # =========================================================================

    # SLIDE 27: Produktpremiere & Vision (3D Mockup Box)
    slides.append(f'''<!-- SLIDE 27 (Yamaha Kit Premiere) -->
      <section class="slide slide-hero-theme" data-slide="27">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s27_category">Teil 4: Yamaha Kit • Produktpremiere</div>
            <h2 class="slide-title" data-i18n="s27_title">Original Louis Renner Yamaha Kit (C1–C3)</h2>
            <div class="slide-subtitle" data-i18n="s27_subtitle">Die Drop-In Revolution: Von tagelanger Werkstattarbeit zu wenigen Stunden am Instrument</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card yk-sheen-effect">
              <div class="bento-step-watermark">04</div>
              <span class="bento-badge gold" data-i18n="s27_b1_badge">>DROP-IN UPGRADE</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s27_c1_title">Auspacken | Einbauen | Aufwerten</div>
              <div class="bento-card-desc" data-i18n="s27_c1_desc">
                Mit dem neuen Yamaha Kit für die Modelle C1, C2 und C3 revolutioniert Renner die traditionelle Hammerkopferneuerung. Erstmals erhalten Klavierbauer einen komplett vorkonfektionierten, werkseitig im perfekten 91°-Winkel mit natürlichem Glutenleim verleimten Satz, der direkt in die Kapselleiste eingehängt werden kann.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s27_bullet_1"><strong>100% Plug & Play:</strong> Keine zeitraubende Bohr-, Mess- und Leimarbeit mehr in der Werkstatt.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s27_bullet_2"><strong>Wurzen-Konzertfilz & Nussbaum:</strong> Verleiht dem Instrument sofort tragfähigen, warmen europäischen Gesangston.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s27_bullet_3"><strong>Fertigstellung an einem Nachmittag:</strong> Kompletter Wechsel in ca. 90 Minuten direkt beim Kunden vor Ort.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed mockup-zoom-container">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/Verpackung_Deckel_Mockup_Box_DE.jpg" alt="Louis Renner Yamaha Kit Box Mockup">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s27_b2_badge">>VERPACKUNGS-MOCKUP</span>
                <div class="bento-media-caption" data-i18n="s27_caption_1">Die offizielle Louis Renner Yamaha Kit Box (C1–C3) mit edlem Deckel-Branding und 3 vorsortierten Trays</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 28: Traditionelle Werkstatt vs. Drop-In Präzision
    slides.append(f'''<!-- SLIDE 28 (Workshop Comparison & Time Savings) -->
      <section class="slide slide-hero-theme" data-slide="28">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s28_category">Teil 4: Yamaha Kit • Werkstatt-Vergleich</div>
            <h2 class="slide-title" data-i18n="s28_title">Traditionelle Werkstatt vs. Drop-In Präzision</h2>
            <div class="slide-subtitle" data-i18n="s28_subtitle">Wie das Kit die Arbeitszeit von Klavierbauern und Technikern um ca. 10 Stunden reduziert</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card" style="padding-bottom: 12px;">
              <span class="bento-badge gold" data-i18n="s28_b1_badge">>EFFIZIENZ-VERGLEICH</span>
              <div class="time-comparison-grid">
                <!-- Traditionelle Werkstatt -->
                <div class="time-card traditional">
                  <div class="time-card-header">
                    <span class="time-card-title" data-i18n="s28_c1_title">Klassischer Ablauf: ~12 Stunden</span>
                    <span class="time-badge red">Bisher</span>
                  </div>
                  <div class="time-metric-hero">
                    <span class="time-metric-number">12</span>
                    <span class="time-metric-label">Stunden Werkstattaufwand</span>
                  </div>
                  <div class="time-progress-track">
                    <div class="time-progress-bar red"></div>
                  </div>
                  <div class="time-card-desc" data-i18n="s28_c1_desc" style="font-size: 0.78rem; margin-bottom: 8px;">
                    Alte Köpfe abdämpfen, 88 Rohköpfe manuell ausmessen & bohren (Schrägwinkel, Bohrlehre), Heißleim kochen, Stiele einleimen, Flucht richten, 48h Trocknung, langwierige Vorintonation.
                  </div>
                </div>

                <!-- Renner Drop-In Kit -->
                <div class="time-card renner-kit">
                  <div class="time-card-header">
                    <span class="time-card-title" data-i18n="s28_c2_title">Louis Renner Kit: ~1.5 Stunden</span>
                    <span class="time-badge green">–88% ZEIT</span>
                  </div>
                  <div class="time-metric-hero">
                    <span class="time-metric-number">1.5</span>
                    <span class="time-metric-label">Stunden Vor-Ort-Einbau</span>
                  </div>
                  <div class="time-progress-track">
                    <div class="time-progress-bar green"></div>
                  </div>
                  <div class="time-card-desc" data-i18n="s28_c2_desc" style="font-size: 0.78rem; margin-bottom: 8px;">
                    100% einbaufertig vormontiert mit Kapseln. Direkte 1-Schrauben-Montage an der Schiene. 0h Bohren, 0h Leimen, 0h Vorintonation. Direkt vor Ort beim Kunden fertiggestellt!
                  </div>
                </div>
              </div>

              <div class="bento-card-list" style="margin-top: 10px;">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s28_bullet_1"><strong>Zeitersparnis von über 85 %:</strong> Aus Tagen harter Werkstattarbeit wird ein einzelner Termin.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s28_bullet_2"><strong>Höchste Prozesssicherheit:</strong> Kein Risiko von schiefen Bohrungen oder Leimfehlern.</span>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/replace_past_1433.jpg" alt="Vergleich Alter vs. Neuer Hammerkopf">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s28_b2_badge">>VORHER / NACHHER</span>
                <div class="bento-media-caption" data-i18n="s28_caption_1">Vergleich: Ausgespielter Althammer (rechts) vs. neuer Louis Renner Konzertkopf mit Wurzen-Filz (links)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 29: Die akustische Transformation (Soundwave)
    slides.append(f'''<!-- SLIDE 29 (Soundwave Acoustic Vibration) -->
      <section class="slide slide-hero-theme" data-slide="29">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s29_category">Teil 4: Yamaha Kit • Akustik & Saitenwellen</div>
            <h2 class="slide-title" data-i18n="s29_title">Replace the Past · Elevate the Tone</h2>
            <div class="slide-subtitle" data-i18n="s29_subtitle">Die klangliche Wiedergeburt: Warum Yamaha-Flügel durch Renner-Köpfe veredelt werden</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s29_b1_badge">>AKUSTIK-INNOVATION</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s29_c1_title">Vom harten Attack zum warmen Konzertgesang</div>
              <div class="bento-card-desc" data-i18n="s29_c1_desc">
                Yamaha-Flügel besitzen eine hochpräzise Mechanik, doch nach jahrelangem Spiel verhärtet der Originalfilz und verliert seine Elastizität. Das Resultat ist ein spitzer, metallischer Anschlag mit kurzem Ausklang. Der Wechsel auf das Renner Yamaha Kit stellt die volle dynamische Tragfähigkeit und Wärme wieder her.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_1"><strong>Horizontale Schallwelle:</strong> Elastische Übertragung der Anschlagsenergie am Scheitelpunkt in die Saite.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_2"><strong>Wurzen Weickert Special Filz:</strong> Singender Diskant und resonantes Bassfundament ohne Härte.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_3"><strong>Dynamische Weite:</strong> Nuancierte Kontrolle von zartestem Pianissimo (ppp) bis zum strahlenden Fortissimo (fff).</span>
                </div>
              </div>
            </div>

            <!-- Interaktive Soundwave Animation -->
            <div class="bento-card soundwave-hero-container">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/hero_effekt_3_mit_hammerkopf.png" class="soundwave-bg-media" alt="Renner Hero Soundwave">
              <div class="soundwave-strings-overlay">
                <div class="soundwave-string-line"></div>
                <div class="soundwave-string-line"></div>
                <div class="soundwave-string-line"></div>
              </div>
              <div class="soundwave-impact-pulse"></div>
              <div class="soundwave-ripple-wave"></div>
              <div class="soundwave-ripple-wave"></div>
              <button class="soundwave-trigger-btn" onclick="triggerSoundwavePulse()">
                <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                <span>Anschlag simulieren</span>
              </button>
              <div class="bento-media-overlay" style="pointer-events: none;">
                <span class="bento-badge green" data-i18n="s29_b2_badge">>SAITEN-SCHALLWELLE</span>
                <div class="bento-media-caption" data-i18n="s29_caption_1">Die Renner Schallwelle (Hero Effekt 3): Horizontale Energieausbreitung am oberen Anschlagspunkt der Saite</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 30: Die 3 handwerklichen Säulen des Kits
    slides.append(f'''<!-- SLIDE 30 (3 Craftsmanship Pillars) -->
      <section class="slide slide-hero-theme" data-slide="30">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s30_category">Teil 4: Yamaha Kit • Material-Exzellenz</div>
            <h2 class="slide-title" data-i18n="s30_title">Die 3 Säulen: Wurzenfilz, Nussbaum & Glutenleim</h2>
            <div class="slide-subtitle" data-i18n="s30_subtitle">Deutsche Handwerkskunst und edelste Rohstoffe, gefertigt in Meuselwitz</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-3">
            <!-- Säule 1 -->
            <div class="bento-card">
              <div class="bento-step-watermark">01</div>
              <span class="bento-badge gold" data-i18n="s30_b1_badge">>WURZEN KONZERTFILZ</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s30_c1_title">Wurzen Weickert Special Filz</div>
              <div class="bento-card-desc" data-i18n="s30_c1_desc">
                Ausschließlich aus feinster Schurwolle ohne chemische Zusätze hergestellt. Die elastisch gewalkte Faserstruktur bietet enorme Lebensdauer und unverwechselbaren Klangfarbenreichtum.
              </div>
              <div style="margin-top: 14px; border-radius: 8px; overflow: hidden; height: 110px;">
                <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/felt_and_wood.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Filz und Holz Detail">
              </div>
            </div>

            <!-- Säule 2 -->
            <div class="bento-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge green" data-i18n="s30_b2_badge">>NUSSBAUM & HAINBUCHE</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s30_c2_title">Amerikanischer Nussbaum Kern</div>
              <div class="bento-card-desc" data-i18n="s30_c2_desc">
                Speziell auf die Trägheitsmomente der Yamaha C1–C3 Mechanik kalibriert. Geringes Gewicht kombiniert mit optimaler Steifigkeit ermöglicht blitzschnelle Repetition.
              </div>
              <div style="margin-top: 14px; border-radius: 8px; overflow: hidden; height: 110px;">
                <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/hero_action_sharp.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Nussbaumkern Detail">
              </div>
            </div>

            <!-- Säule 3 -->
            <div class="bento-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s30_b3_badge">>RENNER GLUTENLEIM</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s30_c3_title">Akustisch harter Glutenleim</div>
              <div class="bento-card-desc" data-i18n="s30_c3_desc">
                Im Heißleimverfahren unter hohem Druck verpresst. Die knochenharte Verbindung dämpft keine Schwingungen und leitet 100% der Energie verlustfrei in die Saite.
              </div>
              <div style="margin-top: 14px; border-radius: 8px; overflow: hidden; height: 110px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.4);">
                <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/HK-DE freigestellt.jpg" style="height: 100%; width: auto; object-fit: contain;" alt="Made in Germany Hammerkopf">
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 31: Packungsinhalt & Vorkonfektionierung
    slides.append(f'''<!-- SLIDE 31 (Tray Architecture & 88 Notes) -->
      <section class="slide slide-hero-theme" data-slide="31">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s31_category">Teil 4: Yamaha Kit • Vorkonfektionierung</div>
            <h2 class="slide-title" data-i18n="s31_title">88 vorjustierte Präzisionsteile – Fehlerfrei sortiert</h2>
            <div class="slide-subtitle" data-i18n="s31_subtitle">Strukturierte Trays für einen intuitiven und verwechslungsfreien Werkstatt-Workflow</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s31_b1_badge">>VORKONFEKTIONIERUNG</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s31_c1_title">Das 3-Zonen Verpackungskonzept</div>
              <div class="bento-card-desc" data-i18n="s31_c1_desc">
                Die 88 Hammerköpfe mit Stielen und Kapseln liegen in drei maßgefertigten Schaumstoff-Trays, aufgeteilt nach akustischen Registern. Jeder Hammer ist exakt für seine Notenposition nummeriert und kalibriert.
              </div>

              <!-- Interaktive Tastaturleiste -->
              <div class="range-keyboard-bar">
                <div class="range-zone-btn bass active" onclick="selectRangeZone('bass', this)">
                  <span>Bass 1–26</span>
                  <span class="range-zone-sub">7°–9° Schrägung</span>
                </div>
                <div class="range-zone-btn mid" onclick="selectRangeZone('mid', this)">
                  <span>Mitte 27–59</span>
                  <span class="range-zone-sub">Homogene Verjüngung</span>
                </div>
                <div class="range-zone-btn treble" onclick="selectRangeZone('treble', this)">
                  <span>Diskant 60–88</span>
                  <span class="range-zone-sub">Glockenbrillanz</span>
                </div>
              </div>

              <!-- Dynamische Anzeige der gewählten Zone -->
              <div id="range-zone-display-panel" style="background: rgba(0, 43, 102, 0.25); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;">
                <div id="range-zone-display-title" style="font-family: 'Roboto Slab', serif; font-size: 0.92rem; font-weight: 700; color: var(--gold-light);">Bassbereich: Maximale Masse & Resonanz</div>
                <div id="range-zone-display-desc" style="font-size: 0.78rem; color: #cbd5e1; margin-top: 2px;">Breite Nussbaumkerne mit speziellem Schrägwinkel zur Saitenebene. Großvolumiger Wurzen-Filz erzeugt ein warmes, tragfähiges Bassfundament.</div>
                <div id="range-zone-display-specs" style="font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: #00d4ff; margin-top: 4px;">Kernbreite: 11,2 mm · Schrägwinkel: 7° – 9° · Röllchenabstand: 17,0 mm</div>
              </div>

              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_1"><strong>Bassbereich (Noten 1–26):</strong> Kräftige Kerne, 7°–9° Schrägungswinkel für ideale Saitenüberdeckung.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_2"><strong>Mittellage (Noten 27–59):</strong> Homogener Übergang der Kernbreite (10,5 auf 10,0 mm) ohne Stufen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_3"><strong>Diskantbereich (Noten 60–88):</strong> Maximale Faserkompression an der Spitze für brillante, langanhaltende Obertöne.</span>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/steps/image16.jpg" alt="Yamaha Kit Vorsortierte Trays">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s31_b2_badge">>3-TRAY-SYSTEM</span>
                <div class="bento-media-caption" data-i18n="s31_caption_1">Die 3 vorsortierten Fächer des Yamaha Kits: Bass (1–26), Mitten (27–59) und Diskant (60–88)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 32: Montage in Rekordzeit: Die 1-Schrauben-Kapselbefestigung
    slides.append(f'''<!-- SLIDE 32 (1-Screw Flange Attachment) -->
      <section class="slide slide-hero-theme" data-slide="32">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s32_category">Teil 4: Yamaha Kit • Montage & Kapselleiste</div>
            <h2 class="slide-title" data-i18n="s32_title">Phase 1 & 2: 1-Schrauben-Kapselmontage an der Schiene</h2>
            <div class="slide-subtitle" data-i18n="s32_subtitle">Passgenauer Wechsel ohne Ausbau des Mechanikrahmens – Note für Note</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s32_b1_badge">>MONTAGE-WORKFLOW</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s32_c1_title">Die Linksdreh-Regel (Gewinde erfühlen)</div>
              <div class="bento-card-desc" data-i18n="s32_c1_desc">
                Die Kapselbohrung passt 1:1 auf das Aluminiumprofil der Yamaha C1–C3 Mechanik. Um das Gewinde im Aluminiumprofil lebenslang zu schützen, gilt die goldene Regel von Klavierbaumeister Jens-Sören Kruse:
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_1"><strong>Linksdreh-Klick:</strong> Kapselschraube zuerst linksherum drehen, bis sie spürbar in den alten Gewindegang einrastet.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_2"><strong>Kein neues Gewinde schneiden:</strong> Verhindert Überdrehen und Ausleiern der Bohrung im Aluminiumprofil.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_3"><strong>Handfest anziehen:</strong> Gleichmäßiges Drehmoment für dauerhaften Kapselhalt und perfekte Flucht.</span>
                </div>
              </div>
              <div style="margin-top: 14px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 8px; padding: 10px 14px;">
                <span style="font-weight: 700; color: #34d399; font-size: 0.82rem;">⚡ Zeitersparnis:</span>
                <span style="font-size: 0.78rem; color: #e2e8f0; margin-left: 6px;">Der komplette Wechsel aller 88 Stiele an der Schiene dauert weniger als 35 Minuten!</span>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/installation_rail.jpg" alt="1-Schrauben Kapselmontage Schiene">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s32_b2_badge">>KAPSELLEISTE</span>
                <div class="bento-media-caption" data-i18n="s32_caption_1">Einhängen und Fixieren der neuen Renner-Kapsel direkt auf dem Yamaha Aluminium-Profil</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 33: Perfekte Flucht & Geometrie-Sollmaße
    slides.append(f'''<!-- SLIDE 33 (Action Regulation & Benchmarks) -->
      <section class="slide slide-hero-theme" data-slide="33">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s33_category">Teil 4: Yamaha Kit • Mechanik-Regulation</div>
            <h2 class="slide-title" data-i18n="s33_title">Phase 3: Präzise Geometrie & Sollmaße der Yamaha-Mechanik</h2>
            <div class="slide-subtitle" data-i18n="s33_subtitle">Alle Kernmaße auf einen Blick für die fehlerfreie Regulierung der Hebelverhältnisse</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s33_b1_badge">>GEOMETRIE-SOLLMAßE</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s33_c1_title">Sollwerte für Yamaha C1, C2 & C3</div>
              <div class="bento-card-desc" data-i18n="s33_c1_desc">
                Da die Renner-Hammerköpfe werkseitig im optimalen 91°-Winkel und vorgebohrter Tiefe verleimt sind, greift die Mechanik sofort in ihre ideale Hebelgeometrie ein.
              </div>

              <!-- Blueprint Specs Table -->
              <table class="blueprint-spec-table" style="margin: 10px 0;">
                <thead>
                  <tr>
                    <th>Regulierparameter</th>
                    <th>Yamaha C1–C3 Sollmaß</th>
                    <th>Einstellorgan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Steighöhe (Blow Distance)</td>
                    <td class="blueprint-spec-val">45,0 – 47,0 mm</td>
                    <td>Wippen-Pilote</td>
                  </tr>
                  <tr>
                    <td>Auslösung Bass (Let-off)</td>
                    <td class="blueprint-spec-val">1/2 Saitendurchmesser</td>
                    <td>Auslösepuppe</td>
                  </tr>
                  <tr>
                    <td>Auslösung Diskant</td>
                    <td class="blueprint-spec-val">1,0 – 1,5 mm</td>
                    <td>Auslösepuppe</td>
                  </tr>
                  <tr>
                    <td>Abfall (Drop)</td>
                    <td class="blueprint-spec-val">1,0 – 2,0 mm unter Auslösung</td>
                    <td>Dropschraube</td>
                  </tr>
                  <tr>
                    <td>Nachdruck (Aftertouch)</td>
                    <td class="blueprint-spec-val">exakt 1,0 mm</td>
                    <td>Tastentiefgang</td>
                  </tr>
                </tbody>
              </table>

              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s33_bullet_1"><strong>Steighöhe (45,0 – 47,0 mm):</strong> Schnelleinstellung über die Pilotenschraube (Wippen-Pilote).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s33_bullet_2"><strong>Traveling & Senkrechter Gang:</strong> Hammerstiele laufen absolut spurtreu ohne seitliches Scheren.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s33_bullet_3"><strong>Auslösung (Let-off):</strong> Im Bass 1/2 Saite (ca. 2 mm), im Diskant auf 1,0 – 1,5 mm einstellen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s33_bullet_4"><strong>Abfall (Drop):</strong> Exakt 1,0 – 2,0 mm unterhalb der Auslösung für feinstes Pianissimo-Spiel.</span>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/steps/image25.jpg" alt="Steighöhe Regulierung">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s33_b2_badge">>PRÄZISIONSMESSUNG</span>
                <div class="bento-media-caption" data-i18n="s33_caption_1">Einstellung der Steighöhe (45–47 mm) und parallele Flucht aller 88 Hammerköpfe</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 34: Die 4 goldenen Meister-Regeln von Jens-Sören Kruse
    slides.append(f'''<!-- SLIDE 34 (4 Master Rules by Jens-Sören Kruse) -->
      <section class="slide slide-hero-theme" data-slide="34">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s34_category">Teil 4: Yamaha Kit • Meister-Regeln</div>
            <h2 class="slide-title" data-i18n="s34_title">Die 4 goldenen Meister-Regeln der Renner Academy</h2>
            <div class="slide-subtitle" data-i18n="s34_subtitle">Essentielles Praxiswissen von Jens-Sören Kruse (Klavierbaumeister & Concert Voicer)</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/master_kruse.jpg" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid var(--yk-gold);" alt="Jens-Sören Kruse">
                <div>
                  <span class="bento-badge gold" data-i18n="s34_b1_badge">>JENS-SÖREN KRUSE</span>
                  <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">Klavierbaumeister & Head of Productmanagement</div>
                </div>
              </div>

              <!-- 4 Meisterkarten -->
              <div class="meister-rules-grid">
                <div class="meister-rule-card">
                  <span class="meister-rule-num">01</span>
                  <div class="meister-rule-title" data-i18n="s34_c1_title">1. Linksdreh-Regel (Gewinde)</div>
                  <div class="meister-rule-text" data-i18n="s34_c1_desc">
                    Kapselschraube erst linksdrehen, bis sie spürbar in den alten Gewindegang einrastet. Nie neues Gewinde schneiden!
                  </div>
                </div>

                <div class="meister-rule-card">
                  <span class="meister-rule-num">02</span>
                  <div class="meister-rule-title" data-i18n="s34_c2_title">2. Repetierfeder (Oberer Schenkel)</div>
                  <div class="meister-rule-text" data-i18n="s34_c2_desc">
                    Federjustage ausschließlich am oberen Schenkel mit dem Federhaken durchführen. Unteren Schenkel niemals biegen!
                  </div>
                </div>

                <div class="meister-rule-card">
                  <span class="meister-rule-num">03</span>
                  <div class="meister-rule-title" data-i18n="s34_c3_title">3. Scheitelprofil (Kein Hohlstand)</div>
                  <div class="meister-rule-text" data-i18n="s34_c3_desc">
                    Scheitelfläche muss gleichmäßig konvex sein. Hohlscheitel und Schrägscheitel sofort hauchdünn mit Schleiffeile abziehen.
                  </div>
                </div>

                <div class="meister-rule-card">
                  <span class="meister-rule-num">04</span>
                  <div class="meister-rule-title" data-i18n="s34_c4_title">4. Nachdruck (exakt 1,0 mm)</div>
                  <div class="meister-rule-text" data-i18n="s34_c4_desc">
                    Exakt 1,0 mm Resthub nach der Auslösung garantiert saubere, blitzschnelle Repetition ohne Tastenklemmen.
                  </div>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/steps/image58.jpg" alt="Scheitelprofile beim Abziehen">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s34_b2_badge">>SCHEITELPROFIL</span>
                <div class="bento-media-caption" data-i18n="s34_caption_1">Scheitelprofil beim Abziehen: Hohlscheitel ✗ | Schrägscheitel ✗ | Scheitel korrekt gewölbt ✓</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 35: Klaviatur-Harmonie & Dreichorauflage
    slides.append(f'''<!-- SLIDE 35 (Trichord Mating & Key Dip) -->
      <section class="slide slide-hero-theme" data-slide="35">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s35_category">Teil 4: Yamaha Kit • Klaviatur & Dreichor</div>
            <h2 class="slide-title" data-i18n="s35_title">Phase 4 & 5: Dreichorauflage, Wippen & Tastentiefgang</h2>
            <div class="slide-subtitle" data-i18n="s35_subtitle">Gleichzeitiger Anschlag aller 3 Saiten und zentrische Kraftübertragung</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s35_b1_badge">>DREICHORAUFLAGE</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s35_c1_title">Synchroner Anschlag & zentrische Führung</div>
              <div class="bento-card-desc" data-i18n="s35_c1_desc">
                Damit die Energie des Hammerkopfes vollkommen rein in die Saiten übergeht, müssen alle drei Saiten eines Chors absolut zeitgleich getroffen werden. Jede Schiefstellung raubt Obertöne.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s35_bullet_1"><strong>Dreichorauflage prüfen:</strong> Taste langsam niederdrücken – alle drei Saiten müssen im selben Moment berührt werden.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s35_bullet_2"><strong>Zentrische Stoßzunge:</strong> Stoßzungen müssen exakt mittig unter dem Hammerröllchen stehen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s35_bullet_3"><strong>Tastentiefgang (10,0 mm):</strong> Gleichmäßiger Tiefgang über alle 88 Tasten sichert die ergonomische Haptik.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s35_bullet_4"><strong>Klaviaturhöhe:</strong> Weiß ca. 20 / 65 mm, Schwarz 12 mm Überstand über dem Elfenbein.</span>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/steps/image43.jpg" alt="Dreichorauflage Prüfung">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s35_b2_badge">>KLAVIATUR-JUSTAGE</span>
                <div class="bento-media-caption" data-i18n="s35_caption_1">Prüfung der planparallelen Dreichorauflage am Diskantsaitenchor mit dem Kruse-Flügelprüfer</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 36: Fertigstellung & Ton-Vollendung
    slides.append(f'''<!-- SLIDE 36 (Final Regulation & Concert Voicing) -->
      <section class="slide slide-hero-theme" data-slide="36">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s36_category">Teil 4: Yamaha Kit • Fänger & Feinintonation</div>
            <h2 class="slide-title" data-i18n="s36_title">Phase 6: Fänger, Repetierfeder & Klang-Vollendung</h2>
            <div class="slide-subtitle" data-i18n="s36_subtitle">Minimaler Abstimmungsaufwand – Sofortige Konzertreife ohne zeitraubende Vorintonation</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold" data-i18n="s36_b1_badge">>KONZERTREIFE</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s36_c1_title">Vom Einbau zum Konzertklang in Rekordzeit</div>
              <div class="bento-card-desc" data-i18n="s36_c1_desc">
                Weil der Weickert-Special-Filz von Renner bereits im Kern die perfekte Dichte und Elastizität besitzt, entfällt das stundenlange Vorintonieren (Pre-Needling) komplett. Der Techniker widmet sich nur der musikalischen Feinabstimmung.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s36_bullet_1"><strong>Fanghöhe (ca. 15 mm):</strong> Gleichmäßiger Fang bei Forte-Anschlag, Fänger parallel zu den Gegenfängern kröpfen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s36_bullet_2"><strong>Repetierfeder:</strong> Zügiges, prellfreies Aufsteigen des Hammers zur Auslösung für virtuose Spieltechnik.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s36_bullet_3"><strong>Ausgleichsintonation:</strong> Nur feine Stiche in den elastischen Schulterzonen – die Hammerkrone wird geschont!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s36_bullet_4"><strong>Konzert-Feinstimmung:</strong> Abschließende Stimmung auf Kammerton A4 = 440 – 442 Hz.</span>
                </div>
              </div>
            </div>

            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/installed_hammers_overview.jpg" alt="88 montierte Renner Hammerköpfe">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s36_b2_badge">>88 NOTEN FLUCHT</span>
                <div class="bento-media-caption" data-i18n="s36_caption_1">Makellose Flucht und Ausrichtung aller 88 montierten Louis Renner Hammerköpfe im Flügel</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 37: Die wirtschaftliche & klangliche Bilanz des Yamaha Kits
    slides.append(f'''<!-- SLIDE 37 (Economic & Acoustic Value Dashboard) -->
      <section class="slide slide-hero-theme" data-slide="37">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s37_category">Teil 4: Yamaha Kit • Zusammenfassung & Nutzen</div>
            <h2 class="slide-title" data-i18n="s37_title">Die Bilanz: Höchste Effizienz & Weltklasse-Klang</h2>
            <div class="slide-subtitle" data-i18n="s37_subtitle">Der unschlagbare Mehrwert für Techniker, Klavierhäuser und anspruchsvolle Pianisten</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-3">
            <!-- Nutzen für den Techniker -->
            <div class="bento-card">
              <div class="bento-step-watermark">01</div>
              <span class="bento-badge gold" data-i18n="s37_b1_badge">>FÜR TECHNIKER</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s37_c1_title">10h Bench Time gespart</div>
              <div class="bento-card-desc" data-i18n="s37_c1_desc">
                Kein mühsames Ausmessen, Bohren und Leimen. Einbau direkt beim Kunden an einem einzigen Nachmittag. Null Risiko von Fehlbohrungen oder Kleberesten.
              </div>
              <div style="margin-top: 14px; background: rgba(0, 43, 102, 0.35); border-radius: 8px; padding: 10px; border: 1px solid rgba(197, 160, 89, 0.2);">
                <div style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #34d399; font-weight: 700;">–88%</div>
                <div style="font-size: 0.72rem; color: #94a3b8;">Arbeitszeitreduktion pro Flügel</div>
              </div>
            </div>

            <!-- Nutzen für den Handel -->
            <div class="bento-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge green" data-i18n="s37_b2_badge">>FÜR DEN HANDEL</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s37_c2_title">Höhere Marge & Durchlauf</div>
              <div class="bento-card-desc" data-i18n="s37_c2_desc">
                Verwandelt Gebrauchtflügel in begehrte Premium-Instrumente mit offiziellem Renner-Upgrade. Kürzere Standzeiten und überzeugende Verkaufsargumente.
              </div>
              <div style="margin-top: 14px; background: rgba(0, 43, 102, 0.35); border-radius: 8px; padding: 10px; border: 1px solid rgba(197, 160, 89, 0.2);">
                <div style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--gold-light); font-weight: 700;">+25%</div>
                <div style="font-size: 0.72rem; color: #94a3b8;">Wertsteigerung des Flügels</div>
              </div>
            </div>

            <!-- Nutzen für den Pianisten -->
            <div class="bento-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s37_b3_badge">>FÜR PIANISTEN</span>
              <div class="bento-card-title" style="margin-top: 8px;" data-i18n="s37_c3_title">Europäischer Konzertgesang</div>
              <div class="bento-card-desc" data-i18n="s37_c3_desc">
                Warmer, farbenreicher Gesangston statt greller Attack-Härte. Federleichte, feinfühlige Repetition und spürbare Wertsteigerung des Instruments.
              </div>
              <!-- QR Code & Link Support -->
              <div style="margin-top: 12px; display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.4); border-radius: 8px; padding: 8px 10px; border: 1px solid rgba(197, 160, 89, 0.25);">
                <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/qr_yamaha_kit.png" style="width: 44px; height: 44px; border-radius: 4px;" alt="QR Code Yamaha Kit">
                <div>
                  <div style="font-size: 0.72rem; font-weight: 700; color: #fff;">Online-Montageleitfaden</div>
                  <div style="font-size: 0.65rem; color: var(--gold-light);">louis-renner.de/renner-hammerkoepfe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 38: Das Uhren-Modell & Die 4 dynamischen Keile (Sander Bento Clock Grid)
    slides.append(f'''      <!-- SLIDE 38: Das Uhren-Modell -->
      <section class="slide slide-hero-theme" data-slide="38">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s38_category">Teil 5: Intonation • Geometrie & Keile</div>
            <h2 class="slide-title" data-i18n="s38_title">Das Uhren-Modell: Die 4 dynamischen Keile</h2>
            <div class="slide-subtitle" data-i18n="s38_subtitle">Strukturierte Aufteilung des Hammerkopfs nach Register- und Lautstärkezielen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid" style="grid-template-columns: repeat(2, 1fr); gap: 14px;">
              <div class="bento-card" style="border-left: 4px solid #3b82f6;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s38_b1_badge">FORTISSIMO (ff)</span>
                  <span class="mono-val">9:00–10:00 & 2:00–3:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s38_c1_title">Blauer Keil</div>
                <div class="bento-card-desc" data-i18n="s38_c1_desc">Tiefe Nadelstiche zur Entspannung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #22c55e;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s38_b2_badge">FORTE (f)</span>
                  <span class="mono-val">10:00–11:00 & 1:00–2:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s38_c2_title">Grüner Keil</div>
                <div class="bento-card-desc" data-i18n="s38_c2_desc">Raumklang, Glanz und dynamische Entfaltung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #f97316;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s38_b3_badge">PIANO (p)</span>
                  <span class="mono-val">11:00–11:30 & 12:30–1:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s38_c3_title">Orangener Keil</div>
                <div class="bento-card-desc" data-i18n="s38_c3_desc">Lyrischer Gesangston, feine Abstimmung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #a855f7;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s38_b4_badge">PIANISSIMO (pp)</span>
                  <span class="mono-val">11:30–12:00 & 12:00–12:30</span>
                </div>
                <div class="bento-card-title" data-i18n="s38_c4_title">Violetter Keil</div>
                <div class="bento-card-desc" data-i18n="s38_c4_desc">Flüsterleise Ansprache</div>
              </div>
              <div class="bento-card col-span-2" style="border-left: 4px solid #ef4444; background: rgba(239,68,68,0.08);">
                <div class="bento-card-header">
                  <span class="bento-badge red" data-i18n="s38_b5_badge">>ROTE ZONE (SCHEITEL)</span>
                  <span class="mono-val" style="color: #f87171; font-weight: 700;">12:00 UHR KRONENSPITZE</span>
                </div>
                <div class="bento-card-title" style="color: #fca5a5;" data-i18n="s38_c5_title">DO NOT TOUCH! – Niemals tief einstechen!</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image210.jpg" alt="Das Uhren-Modell der Intonation">
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s38_b6_badge">>JENS-SÖREN KRUSE</span>
                <div class="bento-media-caption" data-i18n="s38_caption_1">Original Renner Uhrenmodell</div>
                <div class="bento-media-subcaption" data-i18n="s38_caption_2">mit den 4 dynamischen Keilen (ff, f, p, pp)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 39: Die Vorintonation (Pre-Needling) (Sander Bento)
    slides.append(f'''<!-- SLIDE 39 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="39">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s39_category">Teil 5: Intonation • Vorintonation</div>
            <h2 class="slide-title" data-i18n="s39_title">Vorintonation (Pre-Needling): Tiefe Stiche im ff-Keil</h2>
            <div class="slide-subtitle" data-i18n="s39_subtitle">Abbau werkseitiger Vorspannung und Energieübertragung in den Forte-Keil</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s39_b1_badge">>PRE-NEEDLING</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">pp – ff</span>
                <span class="bento-metric-unit">Vorintonation</span>
              </div>
              <div class="bento-card-desc" data-i18n="s39_c1_desc">
                Die Vorintonation ist der wichtigste Basisschritt bei fabrikneuen oder neu befilzten Hämmern:
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s39_bullet_1"><strong>Arbeitszone:</strong> Ausschließlich im blauen Fortissimo-Keil (Bereiche 9:00–10:00 Uhr und 2:00–3:00 Uhr).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s39_bullet_2"><strong>Tiefe Einstiche:</strong> Nadeln tief bis kurz vor den Unterfilz einstechen (niemals in Unterfilz oder Holzkern stechen!).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s39_bullet_3"><strong>Spannungstransfer:</strong> Der Kopf verliert die harte Werkssteife; elastische Spannungsenergie fließt in den grünen Forte-Keil ab.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s39_bullet_4"><strong>Empfehlung:</strong> Dieser Schritt ist vor dem ersten Anspielen im Instrument fast ausnahmslos anzuraten.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_12_5_Image247.jpg" alt="Vorintonation Stiche">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s39_b2_badge">>GRUNDELASTIZITÄT</span>
                <div class="bento-media-caption" data-i18n="s39_caption_1">Pre-Needling: Tiefe Stiche im Fortissimo-Keil (9:00 bis 10:00 Uhr)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 40: Werkzeuge & Nadelstich-Vorgaben (Sander Bento)
    slides.append(f'''<!-- SLIDE 40 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="40">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s40_category">Teil 5: Intonation • Werkzeug & Technik</div>
            <h2 class="slide-title" data-i18n="s40_title">Nadelstich-Vorgaben & Intonierwerkzeuge</h2>
            <div class="slide-subtitle" data-i18n="s40_subtitle">Drücken statt Hacken – Exakte Stichanzahlen für Bass, Mittellage und Diskant</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s40_b1_badge">>WERKZEUGKUNDE</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">3 & 1</span>
                <span class="bento-metric-unit">Nadelwerkzeuge</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s40_bullet_1"><strong>Stichanzahlen Pre-Needling:</strong>
                <br>• Bass: 7–10 Stiche horizontal
                <br>• Mittellage: 5–10 Stiche horizontal
                <br>• Diskant: 0–7 Stiche vertikal</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s40_bullet_2"><strong>Drücken, niemals hacken!</strong> Nadeln ruhig und mit Körpergewicht eindrücken. Hacken zerreißt die Wollfasern unkontrolliert!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s40_bullet_3"><strong>Original Renner Werkzeuge:</strong>
                <br>• Intonierapparat verstellbar (Art. 43-0005642)
                <br>• 3er-Intonierer Profi-Typ (Art. 43-0003270)
                <br>• Nadeln Nr. 7 vernickelt ø 0,60 mm, 9 mm lang (Art. 43-0003426).</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_13_2_Image257.png" alt="Intonierwerkzeuge Renner">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s40_b2_badge">>PRÄZISIONSNADELN</span>
                <div class="bento-media-caption" data-i18n="s40_caption_1">Renner Intonierwerkzeuge, Nadelhalter und Intonierapparat</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 41: Saitenvorbereitung im Instrument (Sander Bento)
    slides.append(f'''<!-- SLIDE 41 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="41">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s41_category">Teil 5: Intonation • Saitenlagerung</div>
            <h2 class="slide-title" data-i18n="s41_title">Saitenvorbereitung: Anhangstifte, Stegstifte & Agraffen</h2>
            <div class="slide-subtitle" data-i18n="s41_subtitle">„Der beste Hammerkopf kann nur das hervorbringen, was im Instrument programmiert ist!“</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s41_b1_badge">>SAITEN-BETTUNG</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s41_bullet_1"><strong>Anhangstifte setzen:</strong> Saiten von hinten nach vorn am Anhangstift mit Messingdurchschlag und leichtem Hammer vorsichtig niederschlagen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s41_bullet_2"><strong>Saiten an Stegstiften anpassen:</strong> Mit speziellem Renner-Setzer die Saiten auf den Steg drücken, um falsche Schwingungen auszuschließen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s41_bullet_3"><strong>Chorreinheit abstimmen:</strong> Vor der ersten Intonationsnadelung muss der Saitenchor absolut rein und nebengeräuschfrei klingen.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_16_2_Image274.jpg" alt="Saiten setzen Anhangstift">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s41_b2_badge">>CHORREINHEIT</span>
                <div class="bento-media-caption" data-i18n="s41_caption_1">Saiten niederschlagen am Anhangstift mit Messingdurchschlag</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 42: Anschlagspunkt & Geradheit der Hammerköpfe (Sander Bento)
    slides.append(f'''<!-- SLIDE 42 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="42">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s42_category">Teil 5: Intonation • Ausrichtung</div>
            <h2 class="slide-title" data-i18n="s42_title">Anschlagspunkt im Diskant & Geradheitsprüfung</h2>
            <div class="slide-subtitle" data-i18n="s42_subtitle">Optimierung der Noten 69–88 durch Verschieben des Klaviaturrahmens</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s42_b1_badge">>STRIKE POINT</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">3</span>
                <span class="bento-metric-unit">Saiten Tricord</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s42_bullet_1"><strong>Anschlagspunkt Note 88 prüfen:</strong> Klaviaturrahmen minimal vor- und zurückschieben, um die hellste, tragfähigste Klangstelle im Diskant zu finden.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s42_bullet_2"><strong>Noten 69 bis 88 anpassen:</strong> Der Diskant vieler Flügel lässt sich durch eine Neujustierung des Anschlagspunkts dramatisch verbessern!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s42_bullet_3"><strong>Geradheit aller Köpfe:</strong> Prüfung durch leichtes Anzupfen mit Haken oder Heben der Klinke mit dem Finger; Markierung mit Kreide auf der Taste.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_20_2_Image291.jpg" alt="Anschlagspunkt und Geradheit">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s42_b2_badge">>DISKANTGLANZ</span>
                <div class="bento-media-caption" data-i18n="s42_caption_1">Prüfung des Diskant-Anschlagspunkts und Ausrichtung der Hämmer</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 43: Abziehen der Hammerkronen (Filing) (Sander Bento)
    slides.append(f'''<!-- SLIDE 43: Abziehen der Hammerkronen (Filing) -->
      <section class="slide slide-hero-theme" data-slide="43">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s43_category">Teil 5: Intonation • Kronenabzug</div>
            <h2 class="slide-title" data-i18n="s43_title">Abziehen der Hammerkrone: Hohl vs. Plan vs. Schief</h2>
            <div class="slide-subtitle" data-i18n="s43_subtitle">Anpassung der Scheitelfläche an den 3-chörigen Saitenverlauf mit feiner Hammerfeile</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s43_b1_badge">>HOHL VOR RUND</span>
                </div>
                <div class="bento-card-title" data-i18n="s43_c1_title">1. Hohl vor Rund (Seitenabzug)</div>
                <div class="bento-card-desc" data-i18n="s43_c1_desc">Mit dem Schleifbrettchen von den Schultern her zur Scheitelmitte hin arbeiten, um die natürliche Keilspannung zu bewahren.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s43_b2_badge">>KRONENSCHEITEL</span>
                </div>
                <div class="bento-card-title" data-i18n="s43_c2_title">2. Sanfter Kronenscheitel</div>
                <div class="bento-card-desc" data-i18n="s43_c2_desc">Abschließend den Scheitel mit feinstem Schleifleinen (Körnung 320–400) vorsichtig verrunden, ohne Scheitelfilz abzutragen.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image209.jpg" alt="Kronenabzug">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s43_b3_badge">>SCHLEIFFEILE</span>
                <div class="bento-media-caption" data-i18n="s43_caption_1">Kronenabzug: Schleifbrettführung für gleichmäßigen Scheitelradius</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 44: Zwischen- & Feinintonation (Mid & Balance Voicing) (Sander Bento)
    slides.append(f'''<!-- SLIDE 44 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="44">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s44_category">Teil 5: Intonation • Feinabstimmung</div>
            <h2 class="slide-title" data-i18n="s44_title">Zwischen- & Feinintonation: Die 2-mm-Kronenstiche</h2>
            <div class="slide-subtitle" data-i18n="s44_subtitle">Chromatisches Durchhören und vorsichtiges Egalisieren von Einzeltönen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s44_b1_badge">>FEININTONATION</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s44_bullet_1"><strong>Chromatisches Durchspielen:</strong> Tastatur auf- und abwärts chromatisch anschlagen; Noten mit abweichender Härte oder Lautstärke lokalisieren.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s44_bullet_2"><strong>Zwischenintonation (Mid-Voicing):</strong> Sanftes Nadeln im grünen Forte- und orangenen Piano-Keil. Zu weiche Töne werden durch feines Nachschleifen gehärtet!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s44_bullet_3"><strong>Feinintonation (Final Balance):</strong> Kurze Einzelnadel (BDK-Halter Art. 43-0003269 oder Chop Stick Art. 43-0003271).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s44_bullet_4"><strong>Stichtiefe max. 2 mm an der Krone:</strong> Ausschließlich zwischen den Saitenabdrücken einstechen, niemals direkt in den Rillen!</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_22_2_Image298.jpg" alt="Feinintonation chromatisch">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s44_b2_badge">>FARBPALETTE</span>
                <div class="bento-media-caption" data-i18n="s44_caption_1">Chromatisches Abhören und Feinabstimmung mit kurzer Einzelnadel</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    # SLIDE 45: Verschiebungsintonation & Die Renner Academy (Sander Bento Finale)
    slides.append(f'''      <!-- SLIDE 45: Una Corda & Fazit -->
      <section class="slide slide-hero-theme" data-slide="45">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s45_category">Teil 5: Intonation • Una Corda & Dialog</div>
            <h2 class="slide-title" data-i18n="s45_title">Verschiebungsintonation & Die Renner Academy</h2>
            <div class="slide-subtitle" data-i18n="s45_subtitle">Linkes Pedal abstimmen, Geräusche vermeiden & Willkommen im Renner-Fachdialog</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-grid" style="grid-template-columns: 1fr; gap: 12px;">
              <div class="bento-card">
                <span class="bento-badge green" data-i18n="s45_b1_badge">>UNA CORDA PRAXIS</span>
                <div class="bento-card-title" data-i18n="s45_c1_title">Verschiebungsintonation</div>
                <div class="bento-card-desc" data-i18n="s45_c1_desc">
                  Chromatisches Spiel mit getretenem Pedal; nur die getroffenen Saitenbereiche vorsichtig nachnadeln.
                </div>
                <div class="bento-card-list">
                  <div class="bento-card-list-item">
                    <span class="bento-dot gold"></span>
                    <span data-i18n="s45_bullet_1"><strong>Experten-Tipp:</strong> Leichtes Brechen der linken Kante der Hammerkrone mit feiner Schleiffeile verhindert Reibgeräusche an Nachbarsaiten!</span>
                  </div>
                </div>
              </div>
              <div class="bento-card hero-card">
                <span class="bento-badge gold" data-i18n="s45_b2_badge">>RENNER ACADEMY</span>
                <div class="bento-card-title" data-i18n="s45_c2_title">Renner Academy & Technischer Dialog</div>
                <div class="bento-card-desc" data-i18n="s45_c2_desc">
                  Renner bietet fundierte Meisterkurse, Werksführungen in Meuselwitz und individuellen Werkstattsupport für Klavierbaumeister weltweit.
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image31.png" alt="Renner Abschluss">
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s45_b3_badge">>LOUIS RENNER GMBH</span>
                <div class="bento-media-caption" data-i18n="s45_caption_1">Louis Renner GmbH</div>
                <div class="bento-media-subcaption" data-i18n="s45_caption_2">Ihr Partner für meisterlichen Klang weltweit</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')

    for i in range(len(slides)):
        slides[i] = re.sub(r'data-slide="\d+"', f'data-slide="{i + 1}"', slides[i], count=1)

    return "\n".join(slides)
