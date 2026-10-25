<%@ Page Language="C#" AutoEventWireup="true" %>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Louis Renner">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#0a0e1a">
  <link rel="apple-touch-icon" href="Visuell/web_assets/renner_logo_weiss_schatten.png">
  <link rel="manifest" href="manifest.json">
  <title>Louis Renner - The Heart of the Piano | Conference 2025</title>
  
  <!-- Google Fonts matching louis-renner.de Aesthetic -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Roboto+Slab:wght@400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
  
  <!-- Presentation Styles -->
  <link rel="stylesheet" href="css/presentation.css?v=20261021_0725">
</head>
<body data-country-theme="de">

  <!-- ==========================================================================
       Top Header HUD
       ========================================================================== -->
  <header class="header-hud">
    <!-- Linke Seite: Nur Logo und Slogan -->
    <div class="brand-section">
      <div class="brand-logo-container">
        <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner Logo" class="brand-logo">
        <div class="brand-logo-light-sheen" aria-hidden="true"></div>
      </div>
      <span class="brand-name">LOUIS RENNER</span>
      <span class="brand-divider" aria-hidden="true">•</span>
      <span class="brand-subtitle" data-i18n="brand_sub">Maßstab des guten Ton • Seit 1882</span>
    </div>

    <!-- Rechte Seite: Module (Folie 2) Schnell-Sprung & Menü-Symbol -->
    <div class="header-right-zone">
      <button class="header-modules-btn" id="header-jump-slide2-btn" title="Zurück zur Modul-Übersicht (Folie 2) [Taste: 2]">
        <span class="header-modules-icon">⊞</span>
        <span class="header-modules-text" data-i18n="header_modules_btn">Module (Folie 2)</span>
      </button>
      <button class="header-menu-btn" id="header-menu-btn" aria-expanded="false" aria-controls="header-menu-dropdown" title="Menü & Einstellungen (M)">
        <span class="menu-hamburger-icon" aria-hidden="true">
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
        </span>
        <span class="menu-btn-text">Menü</span>
      </button>
    </div>

    <!-- Dropdown / Popover Menü für Sprache, Themes & Werkzeuge (erscheint bei Klick auf Menü) -->
    <div class="header-menu-dropdown" id="header-menu-dropdown" aria-hidden="true">
      <div class="menu-dropdown-header">
        <div class="menu-dropdown-title">
          <span class="menu-title-icon">⚙️</span>
          <span>Einstellungen & Werkzeuge</span>
        </div>
        <button class="menu-dropdown-close" id="header-menu-close-btn" aria-label="Menü schließen" title="Schließen (Esc)">✕</button>
      </div>

      <!-- Kontext: Konferenz & Aktuelle Folie -->
      <div class="menu-section menu-context-section">
        <div class="menu-context-badge" data-i18n="conf_badge">Konferenz 2025 • Tokio & Shanghai</div>
        <div class="menu-context-slide" id="slide-name-breadcrumb">Renner Hammerkopf 2025</div>
      </div>

      <!-- Sprache / Language Switcher -->
      <div class="menu-section">
        <div class="menu-section-label">
          <span>Sprache / Language</span>
        </div>
        <div class="lang-selector">
          <button class="lang-btn active" data-lang="de">🇩🇪 DE</button>
          <button class="lang-btn" data-lang="en">🇬🇧 EN</button>
          <button class="lang-btn" data-lang="ja">🇯🇵 日本語</button>
          <button class="lang-btn" data-lang="zh">🇨🇳 中文</button>
        </div>
      </div>

      <!-- Country Color Theme Selector -->
      <div class="menu-section">
        <div class="menu-section-label">
          <span>Design / Farbschema</span>
        </div>
        <div class="theme-selector" id="theme-selector" title="Farbschema nach Land (DE / JA / ZH / EN)">
          <button class="theme-btn active" data-theme="de" title="Deutschland: Renner Klassik (Grün & Gold)">🇩🇪 DE</button>
          <button class="theme-btn" data-theme="ja" title="Japan: 漆 Urushi & 蒔絵 Maki-e (Gold & Matcha)">🇯🇵 JA</button>
          <button class="theme-btn" data-theme="zh" title="China: 故宫朱红与琉璃金 (Imperial Red & Gold)">🇨🇳 ZH</button>
          <button class="theme-btn" data-theme="en" title="International: Concert Grand Stage">🌐 Global</button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="menu-section">
        <div class="menu-section-label">
          <span>Präsentations-Werkzeuge</span>
        </div>
        <div class="menu-tools-grid">
          <button class="menu-tool-btn icon-btn" id="toggle-sound-btn" title="Klang-Simulator (S)">
            <span class="tool-icon">🎵</span>
            <span class="tool-text">Klang-Simulator (S)</span>
          </button>
          <button class="menu-tool-btn icon-btn" id="toggle-grid-btn" title="Folien-Übersicht (G)">
            <span class="tool-icon">☵</span>
            <span class="tool-text">Folien-Übersicht (G)</span>
          </button>
          <button class="menu-tool-btn icon-btn" id="toggle-notes-btn" title="Referenten-Notizen (N)">
            <span class="tool-icon">📝</span>
            <span class="tool-text">Notizen (N)</span>
          </button>
          <button class="menu-tool-btn icon-btn" id="toggle-laser-btn" title="Laserpointer (L)">
            <span class="tool-icon">🔴</span>
            <span class="tool-text">Laserpointer (L)</span>
          </button>
          <button class="menu-tool-btn icon-btn" id="toggle-fullscreen-btn" title="Vollbild (F)">
            <span class="tool-icon">⛶</span>
            <span class="tool-text">Vollbild (F)</span>
          </button>
          <a href="image-manager.html" target="_blank" class="menu-tool-btn icon-btn" id="open-image-manager-btn" title="Bildbeschreibungen & Medien verwalten (Öffnet Bild-Manager in neuem Tab)">
            <span class="tool-icon">🖼️</span>
            <span class="tool-text">Bild-Manager</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       Main Presentation Deck Viewport
       ========================================================================== -->
  <main class="presentation-viewport">
    <div class="slide-deck" id="slide-deck">
      <!-- SLIDE 1: Hero / Title Slide -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 2: Agenda & Course Topics (Animated Masterclass Journey) -->
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
              <div class="agenda-journey-node" data-target-slide="28" style="--node-idx: 4;">
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
                <span class="agenda-slide-pill"><span class="pill-dot green"></span>Folie 27</span>
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
            <div class="bento-card agenda-card hero-highlight" data-target-slide="28" role="button" tabindex="0" style="--card-idx: 4;">
              <div class="agenda-card-glow-edge gold"></div>
              <div class="agenda-card-sheen"></div>
              <div class="bento-step-watermark">05</div>
              <div class="agenda-card-header">
                <span class="bento-badge gold" data-i18n="s2_b5_badge">KAPITEL 5</span>
                <span class="agenda-slide-pill highlight"><span class="pill-dot gold"></span>Folie 28–35</span>
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 3: 140+ Jahre Tradition & Meilensteine (Flying Light Point & Branching Ray) -->
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
          <!-- MILESTONE 0: 1882 (Branch UP) -->
          <div class="tree-milestone-panel active branch-up" data-milestone="0" id="tree-milestone-0">
            <div class="tree-watermark-year">1882</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg" alt="1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik - Archivfoto 1" data-caption="Gründer: Louis Renner 1882"><img class="hero-image hero-slideshow-img fit-contain" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_1882_rohlfing_klaviermechanik_vintage.webp" alt="1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik - Archivfoto 2" data-caption="Historische Klaviermechanik – Beginn der Reise"><img class="hero-image hero-slideshow-img" data-slide-index="2" src="Visuell/Bilder/01_Geschichte/01_1882_werkstatt_stuttgart_illustration.png" alt="1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik - Archivfoto 3" data-caption="Erste Werkstatt in der Heusteigstraße Stuttgart 1882">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span><span class="slideshow-dot" data-target-index="2"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1882 Gründung</div>
                <div class="hero-image-caption">Gründer: Louis Renner 1882</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1882</div>
                  <span class="hero-step-tag">Meilenstein 1 von 9</span>
                </div>

                <h3 class="hero-title">1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik</h3>
                <p class="hero-sentence">Im Oktober 1882 gründete Louis Renner seine Werkstatt in der Stuttgarter Heusteigstraße – mit dem Ziel, hochpräzise Klaviermechaniken als Herzstück des Instruments zu fertigen.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Feinmechanik im Fokus:</strong> Beginn der Fertigung höchstpräziser Klaviermechaniken.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Historische Parallele:</strong> Zeitgleich zu Rönischs Panzerplatte setzt Renner den Präzisionsmaßstab.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Wurzel von Meuselwitz:</strong> Grundstein der Tradition, die 1990 in Thüringen zusammenfloss.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ Beginn mit Klaviermechaniken 1882 • Historische Wurzel von Meuselwitz</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev" disabled title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Von der Stuttgarter Werkstatt 1882 bis zur Übernahme der Mechanik-Fertigung der Piano Union 1990: Unsere Meuselwitzer Wurzeln vereinen die großen Meilensteine deutscher Klavierbautradition.“</span>
              <span class="tree-counter-author">• Louis Renner Chronik & Ursprung Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- MILESTONE 1: 1906 (Branch DOWN) -->
          <div class="tree-milestone-panel  branch-down" data-milestone="1" id="tree-milestone-1">
            <div class="tree-watermark-year">1906</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Vom lederbezogenen Papierröllchen Cristoforis zur perfekten Spannungsbalance: Der Hammerkopf ist die Seele des Klavierklangs.“</span>
              <span class="tree-counter-author">• Louis Renner Manufaktur • Klangtradition seit 1906</span>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active fit-contain" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg" alt="1906: Aufnahme der anspruchsvollen Hammerkopffertigung - Archivfoto 1" data-caption="Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)"><img class="hero-image hero-slideshow-img fit-contain" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_1700_christofori_hammermechanik.jpg" alt="1906: Aufnahme der anspruchsvollen Hammerkopffertigung - Archivfoto 2" data-caption="1700: Erste Hammer-Mechanik von Bartolomeo Cristofori – Der Ursprung des Hammerkopfs"><img class="hero-image hero-slideshow-img" data-slide-index="2" src="Visuell/Bilder/01_Geschichte/01_1906_mechanikfertigung_historisch.png" alt="1906: Aufnahme der anspruchsvollen Hammerkopffertigung - Archivfoto 3" data-caption="1906: Beginn der eigenen Hammerkopffertigung mit eigens entwickelten Pressen"><img class="hero-image hero-slideshow-img" data-slide-index="3" src="Visuell/Bilder/01_Geschichte/01_1906_hammerkopf_pressen_fertigung.png" alt="1906: Aufnahme der anspruchsvollen Hammerkopffertigung - Archivfoto 4" data-caption="Hammerkopfnieten im Halbautomaten">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span><span class="slideshow-dot" data-target-index="2"></span><span class="slideshow-dot" data-target-index="3"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1906 Hammer</div>
                <div class="hero-image-caption">Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1906</div>
                  <span class="hero-step-tag">Meilenstein 2 von 9</span>
                </div>

                <h3 class="hero-title">1906: Aufnahme der anspruchsvollen Hammerkopffertigung</h3>
                <p class="hero-sentence">Von Cristoforis erstem Hammerkopf (1700) zu Renners eigener Fertigung ab 1906: Der entscheidende Schritt, der später den unverwechselbaren Klang jedes Steinway-Flügels definierte.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Cristoforis Impuls:</strong> Vom Ur-Hammerkopf (1700) zur ersten industriellen Perfektion.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Eigene Spezialpressen:</strong> Entwicklung eigener Hochdruckpressen für maximale Dynamik.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Globaler Klangstandard:</strong> Maßstab für Steinway und führende Flügelbauer weltweit.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ Von Cristoforis Papierröllchen 1700 • Zum weltweiten Renner-Klangstandard ab 1906</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- MILESTONE 2: 1911 (Branch UP) -->
          <div class="tree-milestone-panel  branch-up" data-milestone="2" id="tree-milestone-2">
            <div class="tree-watermark-year">1911</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active fit-contain" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg" alt="1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm - Archivfoto 1" data-caption="Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel"><img class="hero-image hero-slideshow-img fit-contain" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_1808_erard_repetitionsmechanik.jpg" alt="1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm - Archivfoto 2" data-caption="1808 / 1821: Érard-Repetitionsmechanik – Das Fundament des modernen Flügelprogramms"><img class="hero-image hero-slideshow-img" data-slide-index="2" src="Visuell/Bilder/01_Geschichte/01_1911_renner_elektrifizierte_arbeitsumgebung.webp" alt="1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm - Archivfoto 3" data-caption="Hunderte elektrische Einzelantriebe: Technisierung unter Oscar Renner (1911)">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span><span class="slideshow-dot" data-target-index="2"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1911 Antriebe</div>
                <div class="hero-image-caption">Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1911</div>
                  <span class="hero-step-tag">Meilenstein 3 von 9</span>
                </div>

                <h3 class="hero-title">1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm</h3>
                <p class="hero-sentence">1911 erweiterte Oscar Renner das Programm um vollständige Konzert-Flügelmechaniken und trieb die Modernisierung mit hunderten elektrischen Einzelantrieben voran.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Érard-Repetition:</strong> Doppelte Auslösung als Fundament moderner Flügelmechaniken.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Konzertprogramm komplett:</strong> Flügel- und Klaviermechaniken aus einer Meisterhand.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Hunderte Einzelmotoren:</strong> Wegweisende Umstellung von Transmissionen auf Elektro-Einzelantrieb.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ Érards Repetition als Fundament • 1911: Erste Renner-Flügelmechaniken & Hunderte Einzelmotoren</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Um alle Zweige der Herstellung von Klaviermechaniken in einer Hand zu vereinigen und dem Fabrikationsprogramm eine gewisse Abrundung zu geben, wurde jetzt auch die Fertigung von Flügelmechaniken aufgenommen.“</span>
              <span class="tree-counter-author">• Oscar Renner • Firmenchronik 1911</span>
            </div>
            </div>
          </div>
          <!-- MILESTONE 3: 1944 (Branch DOWN) -->
          <div class="tree-milestone-panel  branch-down" data-milestone="3" id="tree-milestone-3">
                        <div class="milestone-fire-backdrop" aria-hidden="true">
              <div class="fire-inferno-glow"></div>
              <div class="fire-smoke-drift"></div>
              <div class="fire-embers-field">
                <span class="fire-ember" style="--left:2%;--size:3.4px;--dur:4.8s;--delay:0.1s;--drift:-18px;--h:720px;"></span><span class="fire-ember" style="--left:4%;--size:2.2px;--dur:3.8s;--delay:1.4s;--drift:15px;--h:620px;"></span><span class="fire-ember" style="--left:6%;--size:4.5px;--dur:5.8s;--delay:0.8s;--drift:25px;--h:820px;"></span><span class="fire-ember" style="--left:8%;--size:1.8px;--dur:3.5s;--delay:2.2s;--drift:-12px;--h:540px;"></span><span class="fire-ember" style="--left:10%;--size:2.6px;--dur:4.1s;--delay:0.4s;--drift:-22px;--h:660px;"></span><span class="fire-ember" style="--left:12%;--size:3.8px;--dur:5.2s;--delay:1.9s;--drift:18px;--h:770px;"></span><span class="fire-ember" style="--left:14%;--size:5.0px;--dur:6.1s;--delay:1.1s;--drift:28px;--h:860px;"></span><span class="fire-ember" style="--left:16%;--size:2.0px;--dur:3.7s;--delay:2.7s;--drift:-15px;--h:570px;"></span><span class="fire-ember" style="--left:18%;--size:3.5px;--dur:4.6s;--delay:0.5s;--drift:-20px;--h:700px;"></span><span class="fire-ember" style="--left:20%;--size:4.2px;--dur:5.5s;--delay:1.7s;--drift:22px;--h:790px;"></span><span class="fire-ember" style="--left:22%;--size:2.8px;--dur:4.9s;--delay:2.5s;--drift:24px;--h:760px;"></span><span class="fire-ember" style="--left:24%;--size:1.6px;--dur:3.3s;--delay:0.3s;--drift:-10px;--h:520px;"></span><span class="fire-ember" style="--left:26%;--size:4.2px;--dur:5.9s;--delay:1.3s;--drift:-28px;--h:840px;"></span><span class="fire-ember" style="--left:28%;--size:3.0px;--dur:4.4s;--delay:2.9s;--drift:16px;--h:680px;"></span><span class="fire-ember" style="--left:30%;--size:2.2px;--dur:3.8s;--delay:0.2s;--drift:14px;--h:590px;"></span><span class="fire-ember" style="--left:32%;--size:4.8px;--dur:6.0s;--delay:1.8s;--drift:-24px;--h:850px;"></span><span class="fire-ember" style="--left:34%;--size:5.4px;--dur:6.3s;--delay:0.9s;--drift:-26px;--h:880px;"></span><span class="fire-ember" style="--left:36%;--size:2.4px;--dur:4.0s;--delay:2.4s;--drift:18px;--h:640px;"></span><span class="fire-ember" style="--left:38%;--size:3.0px;--dur:4.5s;--delay:0.7s;--drift:20px;--h:700px;"></span><span class="fire-ember" style="--left:40%;--size:4.0px;--dur:5.4s;--delay:1.5s;--drift:-24px;--h:790px;"></span><span class="fire-ember" style="--left:42%;--size:1.9px;--dur:3.6s;--delay:3.1s;--drift:12px;--h:560px;"></span><span class="fire-ember" style="--left:44%;--size:4.6px;--dur:5.9s;--delay:0.6s;--drift:26px;--h:830px;"></span><span class="fire-ember" style="--left:46%;--size:2.6px;--dur:4.2s;--delay:2.1s;--drift:15px;--h:660px;"></span><span class="fire-ember" style="--left:48%;--size:3.3px;--dur:4.8s;--delay:1.0s;--drift:-18px;--h:740px;"></span><span class="fire-ember" style="--left:50%;--size:4.8px;--dur:6.1s;--delay:0.2s;--drift:-22px;--h:850px;"></span><span class="fire-ember" style="--left:52%;--size:2.1px;--dur:3.7s;--delay:2.6s;--drift:14px;--h:580px;"></span><span class="fire-ember" style="--left:54%;--size:3.2px;--dur:4.7s;--delay:1.6s;--drift:26px;--h:755px;"></span><span class="fire-ember" style="--left:56%;--size:4.4px;--dur:5.7s;--delay:0.8s;--drift:-25px;--h:820px;"></span><span class="fire-ember" style="--left:58%;--size:2.4px;--dur:3.9s;--delay:2.8s;--drift:-14px;--h:620px;"></span><span class="fire-ember" style="--left:60%;--size:3.6px;--dur:5.1s;--delay:1.2s;--drift:20px;--h:780px;"></span><span class="fire-ember" style="--left:62%;--size:5.2px;--dur:6.2s;--delay:0.4s;--drift:25px;--h:870px;"></span><span class="fire-ember" style="--left:64%;--size:1.7px;--dur:3.4s;--delay:2.3s;--drift:-11px;--h:535px;"></span><span class="fire-ember" style="--left:66%;--size:3.6px;--dur:5.0s;--delay:1.4s;--drift:-20px;--h:770px;"></span><span class="fire-ember" style="--left:68%;--size:4.5px;--dur:5.8s;--delay:3.0s;--drift:22px;--h:830px;"></span><span class="fire-ember" style="--left:70%;--size:2.8px;--dur:4.3s;--delay:0.5s;--drift:18px;--h:690px;"></span><span class="fire-ember" style="--left:72%;--size:3.9px;--dur:5.3s;--delay:1.7s;--drift:-21px;--h:795px;"></span><span class="fire-ember" style="--left:74%;--size:4.4px;--dur:5.7s;--delay:2.0s;--drift:-27px;--h:830px;"></span><span class="fire-ember" style="--left:76%;--size:2.0px;--dur:3.6s;--delay:0.7s;--drift:13px;--h:570px;"></span><span class="fire-ember" style="--left:78%;--size:3.0px;--dur:4.5s;--delay:2.4s;--drift:21px;--h:705px;"></span><span class="fire-ember" style="--left:80%;--size:4.7px;--dur:5.9s;--delay:1.1s;--drift:-25px;--h:840px;"></span><span class="fire-ember" style="--left:82%;--size:5.0px;--dur:6.2s;--delay:0.3s;--drift:-23px;--h:860px;"></span><span class="fire-ember" style="--left:84%;--size:2.3px;--dur:3.9s;--delay:2.7s;--drift:16px;--h:625px;"></span><span class="fire-ember" style="--left:86%;--size:2.5px;--dur:4.1s;--delay:0.9s;--drift:15px;--h:650px;"></span><span class="fire-ember" style="--left:88%;--size:4.1px;--dur:5.4s;--delay:1.9s;--drift:-22px;--h:805px;"></span><span class="fire-ember" style="--left:90%;--size:4.2px;--dur:5.5s;--delay:0.5s;--drift:-24px;--h:800px;"></span><span class="fire-ember" style="--left:92%;--size:1.8px;--dur:3.5s;--delay:2.5s;--drift:12px;--h:550px;"></span><span class="fire-ember" style="--left:94%;--size:3.4px;--dur:4.9s;--delay:1.3s;--drift:20px;--h:740px;"></span><span class="fire-ember" style="--left:96%;--size:4.6px;--dur:5.9s;--delay:2.8s;--drift:-19px;--h:830px;"></span><span class="fire-ember" style="--left:98%;--size:2.7px;--dur:4.2s;--delay:0.6s;--drift:14px;--h:660px;"></span><span class="fire-ember" style="--left:3%;--size:1.5px;--dur:3.2s;--delay:1.7s;--drift:9px;--h:515px;"></span><span class="fire-ember" style="--left:7%;--size:3.1px;--dur:4.6s;--delay:2.3s;--drift:-16px;--h:715px;"></span><span class="fire-ember" style="--left:11%;--size:2.2px;--dur:3.7s;--delay:0.9s;--drift:13px;--h:605px;"></span><span class="fire-ember" style="--left:15%;--size:4.3px;--dur:5.7s;--delay:3.2s;--drift:-23px;--h:820px;"></span><span class="fire-ember" style="--left:19%;--size:1.7px;--dur:3.3s;--delay:1.4s;--drift:10px;--h:535px;"></span><span class="fire-ember" style="--left:23%;--size:3.5px;--dur:5.1s;--delay:0.1s;--drift:-18px;--h:750px;"></span><span class="fire-ember" style="--left:27%;--size:2.5px;--dur:4.0s;--delay:2.1s;--drift:16px;--h:650px;"></span><span class="fire-ember" style="--left:31%;--size:4.0px;--dur:5.5s;--delay:1.6s;--drift:-21px;--h:810px;"></span><span class="fire-ember" style="--left:35%;--size:1.9px;--dur:3.6s;--delay:3.3s;--drift:12px;--h:570px;"></span><span class="fire-ember" style="--left:39%;--size:3.7px;--dur:5.2s;--delay:0.8s;--drift:-20px;--h:775px;"></span><span class="fire-ember" style="--left:43%;--size:2.3px;--dur:3.8s;--delay:2.0s;--drift:14px;--h:615px;"></span><span class="fire-ember" style="--left:47%;--size:4.7px;--dur:6.0s;--delay:1.2s;--drift:-26px;--h:845px;"></span><span class="fire-ember" style="--left:51%;--size:1.6px;--dur:3.2s;--delay:2.9s;--drift:9px;--h:525px;"></span><span class="fire-ember" style="--left:55%;--size:3.8px;--dur:5.3s;--delay:0.4s;--drift:21px;--h:785px;"></span><span class="fire-ember" style="--left:59%;--size:2.4px;--dur:3.9s;--delay:1.8s;--drift:-14px;--h:635px;"></span><span class="fire-ember" style="--left:63%;--size:4.5px;--dur:5.8s;--delay:3.1s;--drift:23px;--h:835px;"></span><span class="fire-ember" style="--left:67%;--size:1.8px;--dur:3.4s;--delay:0.7s;--drift:-11px;--h:545px;"></span><span class="fire-ember" style="--left:71%;--size:3.4px;--dur:4.9s;--delay:2.2s;--drift:18px;--h:740px;"></span><span class="fire-ember" style="--left:75%;--size:2.6px;--dur:4.1s;--delay:1.5s;--drift:-17px;--h:670px;"></span><span class="fire-ember" style="--left:79%;--size:4.9px;--dur:6.2s;--delay:0.3s;--drift:25px;--h:860px;"></span><span class="fire-ember" style="--left:83%;--size:1.7px;--dur:3.3s;--delay:2.8s;--drift:-10px;--h:535px;"></span><span class="fire-ember" style="--left:87%;--size:3.6px;--dur:5.1s;--delay:1.1s;--drift:20px;--h:765px;"></span><span class="fire-ember" style="--left:91%;--size:2.2px;--dur:3.7s;--delay:3.4s;--drift:-13px;--h:595px;"></span><span class="fire-ember" style="--left:95%;--size:4.4px;--dur:5.7s;--delay:0.5s;--drift:22px;--h:820px;"></span><span class="fire-ember" style="--left:21%;--size:3.9px;--dur:5.4s;--delay:1.8s;--drift:-21px;--h:790px;"></span><span class="fire-ember" style="--left:33%;--size:4.6px;--dur:6.1s;--delay:2.6s;--drift:26px;--h:850px;"></span><span class="fire-ember" style="--left:45%;--size:5.2px;--dur:6.4s;--delay:0.7s;--drift:-25px;--h:880px;"></span><span class="fire-ember" style="--left:57%;--size:4.1px;--dur:5.6s;--delay:2.3s;--drift:19px;--h:800px;"></span><span class="fire-ember" style="--left:69%;--size:5.1px;--dur:6.3s;--delay:1.3s;--drift:-24px;--h:870px;"></span><span class="fire-ember" style="--left:81%;--size:3.8px;--dur:5.2s;--delay:2.7s;--drift:21px;--h:775px;"></span><span class="fire-ember" style="--left:89%;--size:4.3px;--dur:5.6s;--delay:0.9s;--drift:-18px;--h:810px;"></span>
              </div>
            </div>
<div class="tree-watermark-year">1944</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Trotz Zerstörung, trotz unendlicher Hindernisse: Renner wird wieder aufgebaut!“</span>
              <span class="tree-counter-author">• Wilhelm Megenhardt • Chronik 1944</span>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_1.jpg" alt="1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau - Archivfoto 1"><img class="hero-image hero-slideshow-img" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_2.jpg" alt="1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau - Archivfoto 2"><img class="hero-image hero-slideshow-img" data-slide-index="2" src="Visuell/Bilder/01_Geschichte/01_1944_stuttgart_luftangriff_archiv.jpg" alt="1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau - Archivfoto 3">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span><span class="slideshow-dot" data-target-index="2"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1944 Brandnacht</div>
                <div class="hero-image-caption">Historische Dokumente: Stuttgarter Bombennacht & Zerstörung 1944 vor dem Wiederaufbau</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1944</div>
                  <span class="hero-step-tag">Meilenstein 4 von 9</span>
                </div>

                <h3 class="hero-title">1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau</h3>
                <p class="hero-sentence">In der Stuttgarter Bombennacht vom 24./25. Juli 1944 brannten alle Renner-Gebäude nieder – doch der Wille zum sofortigen Wiederaufbau war ungebrochen.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Totalverlust im Feuersturm:</strong> Zerstörung der Stuttgarter Werke am 24./25. Juli 1944.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Mut zur Zukunft:</strong> Sofortiger Entschluss zum Wiederaufbau noch in den Trümmern.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Geschlossene Belegschaft:</strong> Gemeinsamer Wiederbeginn unter schwersten Bedingungen.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ Bombennacht 24./25.07.1944 & Wiederaufbau</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- MILESTONE 4: 1951/1952 (Branch UP) -->
          <div class="tree-milestone-panel  branch-up" data-milestone="4" id="tree-milestone-4">
            <div class="tree-watermark-year">1951/1952</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <img class="hero-image" src="Visuell/web_assets/herstellung-renermechanik.png" alt="1951/1952: Dr. Manfred Renner & Vollendung des Wiederaufbaus">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1951/1952 Wiederaufbau</div>
                <div class="hero-image-caption">Vollendung des Wiederaufbaus und Wiedereinzug in das Stuttgarter Hauptgebäude (1955)</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1951/1952</div>
                  <span class="hero-step-tag">Meilenstein 5 von 9</span>
                </div>

                <h3 class="hero-title">1951/1952: Dr. Manfred Renner & Vollendung des Wiederaufbaus</h3>
                <p class="hero-sentence">Mit Dr. Manfred Renner trat 1951 die 3. Generation an die Unternehmensspitze, vollendete den Wiederaufbau und führte Renner zu neuer internationaler Größe.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>3. Generation am Ruder:</strong> Dr. Manfred Renner übernimmt die Unternehmensführung (1951).</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Neues Stammwerk (1955):</strong> Feierlicher Wiedereinzug in das Stuttgarter Hauptgebäude.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Weltmarktführerschaft:</strong> Konsequente Qualitätsstandards festigen die Weltspitze.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ 1951/1952 • Manfred Renner & Wiederbezug 1955</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Mit jugendlichem Eifer nahm er die Zügel in die Hand und ließ den Wiederaufbau bis zur ursprünglichen Ausdehnung durchführen.“</span>
              <span class="tree-counter-author">• Renner Chronik • 1951/1952</span>
            </div>
            </div>
          </div>
          <!-- MILESTONE 5: 1990 (Branch DOWN) -->
          <div class="tree-milestone-panel  branch-down" data-milestone="5" id="tree-milestone-5">
            <div class="tree-watermark-year">1990</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Die Übernahme der Mechanik-Fertigung in Zeitz war für Renner eine Frage des nackten Fortbestands – sie sicherte unseren größten Kunden Schimmel und schuf das Fundament unserer Zukunft.“</span>
              <span class="tree-counter-author">• Louis Renner Chronik • Das Wendejahr 1990</span>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg" alt="1990: Mauerfall, Zeitenwende & Sicherung des Fortbestands - Archivfoto 1" data-caption="Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner"><img class="hero-image hero-slideshow-img" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_1990_piano_union_zeitz_mechanikfertigung.webp" alt="1990: Mauerfall, Zeitenwende & Sicherung des Fortbestands - Archivfoto 2" data-caption="Historische Mechanik-Fertigung in Zeitz (Piano Union / Rönisch) – Die Rettung von Renners Zukunft">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">1990 Wende & Zeitz</div>
                <div class="hero-image-caption">Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">1990</div>
                  <span class="hero-step-tag">Meilenstein 6 von 9</span>
                </div>

                <h3 class="hero-title">1990: Mauerfall, Zeitenwende & Sicherung des Fortbestands</h3>
                <p class="hero-sentence">1990 nutzte Renner die historische Chance der Wiedervereinigung: Die Übernahme der Mechanikfertigung in Zeitz sicherte die Existenz des Unternehmens und legte die Basis für Meuselwitz.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Chance der Einheit:</strong> Übernahme der Mechanik-Fertigung der Piano Union in Zeitz.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Großkunde Schimmel gerettet:</strong> Sicherung der Kapazitäten für über 40 Klaviere pro Tag.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Tor nach Meuselwitz:</strong> Entscheidende Weichenstellung für den heutigen Thüringer Hauptsitz.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ 1990 • Wende, Schimmel-Partnerschaft & Zeitz</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- MILESTONE 6: 2011 (Branch UP) -->
          <div class="tree-milestone-panel  branch-up" data-milestone="6" id="tree-milestone-6">
            <div class="tree-watermark-year">2011</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="3500">
                  <img class="hero-image hero-slideshow-img active" data-slide-index="0" src="Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp" alt="2011: Zwei feste Standorte – Neubau Gärtringen & Kernfertigung Meuselwitz - Archivfoto 1" data-caption="Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung"><img class="hero-image hero-slideshow-img" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_2011_standort_meuselwitz_vogelperspektive.jpg" alt="2011: Zwei feste Standorte – Neubau Gärtringen & Kernfertigung Meuselwitz - Archivfoto 2" data-caption="Standort Meuselwitz aus der Vogelperspektive: Moderne Kernfertigung (6.800 m²) nach Umzug von Zeitz">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">2011 Standorte</div>
                <div class="hero-image-caption">Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">2011</div>
                  <span class="hero-step-tag">Meilenstein 7 von 9</span>
                </div>

                <h3 class="hero-title">2011: Zwei feste Standorte – Neubau Gärtringen & Kernfertigung Meuselwitz</h3>
                <p class="hero-sentence">Im Jahr 2011 bündelte Renner seine dezentralen Werke an zwei modernen Standorten: Gärtringen und Meuselwitz.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Zwei feste Standorte:</strong> Umzug von Zeitz nach Meuselwitz und Neubau Gärtringen.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Kernwerk Meuselwitz:</strong> 6.800 m² Großfertigung für Mechaniken, Hammerköpfe und Bauteile.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Hauptsitz Gärtringen:</strong> Präzise Holzverarbeitung, Bohrwerkstätten und Verwaltung.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ 2011 • Zwei feste Standorte: Gärtringen & Meuselwitz (6.800 m²)</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Im Jahr 2011 wurden die zuvor verstreuten Werke an zwei Standorten zusammengelegt: Meuselwitz und Gärtringen.“</span>
              <span class="tree-counter-author">• Louis Renner Chronik • Zwei Standorte 2011</span>
            </div>
            </div>
          </div>
          <!-- MILESTONE 7: 2019 (Branch DOWN) -->
          <div class="tree-milestone-panel  branch-down" data-milestone="7" id="tree-milestone-7">
            <div class="tree-watermark-year">2019</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Ebenso wie wir verfügt Renner über eine sehr lange Tradition, ist führend in seinem Segment und beliefert Kunden weltweit mit hervorragender Qualität. Uns verbinden gleiche Werte – und es ist wichtig, dass Renner weiterhin unabhängig arbeiten wird.“</span>
              <span class="tree-counter-author">• Guido Zimmermann • President Steinway & Sons Hamburg</span>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <div class="hero-image-slideshow" data-slide-interval="4500">
                  <video class="hero-image hero-slideshow-img hero-slideshow-video active" data-slide-index="0" src="Visuell/Video/steinwayshort.mp4" playsinline muted style="object-fit:contain; width:100%; height:100%; background:#000; pointer-events:none;" data-caption="Historische Partnerschaft mit Steinway & Sons: 100% operative Eigenständigkeit"></video><img class="hero-image hero-slideshow-img" data-slide-index="1" src="Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg" alt="2019: Steinway & Sons übernimmt Renner – 100% Eigenständigkeit - Archivfoto 2" data-caption="Clemens von Arnim in der Fertigung: Schutz der Belegschaft & Zukunftssicherung">
                  <div class="hero-slideshow-dots">
                    <span class="slideshow-dot active" data-target-index="0"></span><span class="slideshow-dot" data-target-index="1"></span>
                  </div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">2019 Steinway</div>
                <div class="hero-image-caption">Historische Partnerschaft mit Steinway & Sons</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">2019</div>
                  <span class="hero-step-tag">Meilenstein 8 von 9</span>
                </div>

                <h3 class="hero-title">2019: Steinway & Sons übernimmt Renner – 100% Eigenständigkeit</h3>
                <p class="hero-sentence">2019 entschied sich Inhaber Clemens von Arnim mit großer Weitsicht für Steinway & Sons – zum Schutz der Belegschaft und für die volle Unabhängigkeit von Renner.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>100% Eigenständigkeit:</strong> Steinway & Sons garantiert volle operative Unabhängigkeit.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Verantwortung vor Profit:</strong> Clemens von Arnim lehnte höhere Gebote zum Schutz der Belegschaft ab.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Ehrendes Gedenken († 2024):</strong> Tiefer Dank an Clemens von Arnim für seine visionäre Führung.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ 2019 • Steinway & In ehrendem Gedenken an Clemens von Arnim († 2024)</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Weiter">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- MILESTONE 8: Heute (Branch UP) -->
          <div class="tree-milestone-panel  branch-up" data-milestone="8" id="tree-milestone-8">
            <div class="milestone-sheen-backdrop" aria-hidden="true">
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
            </div>
<div class="tree-watermark-year">Heute</div>

            <!-- Top Slot (Above Central Flight Path) -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card">
              <div class="hero-image-wrapper">
                <video class="hero-image hero-video-media" src="Visuell/Video/LouisRennerMeuselwitzAußen.mp4" preload="auto" playsinline muted loop style="object-fit:cover; width:100%; height:100%; background:#050505; cursor:pointer;" title="Klicken zum Pausieren/Abspielen"></video>
                <div class="video-buffer-shimmer" id="m8-video-shimmer" aria-hidden="true">
                  <div class="shimmer-spinner"></div>
                </div>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="hero-image-badge">Meuselwitz 2026</div>
                <div class="hero-image-caption">Welt-Hauptsitz Meuselwitz: Drohnenflug über das modernisierte Werksgelände mit neuer zentraler Filter- & Absauganlage (2026)</div>
              </div>

              <div class="hero-meta-wrapper">
                <div class="hero-meta-top">
                  <div class="hero-year-pill">Heute</div>
                  <span class="hero-step-tag">Meilenstein 9 von 9</span>
                </div>

                <h3 class="hero-title">Heute: Tradition bewahren. Zukunft gestalten.</h3>
                <p class="hero-sentence">Aus der kleinen Werkstatt von 1882 ist der globale Qualitätsmaßstab geworden. Heute bündelt Renner alle Kräfte am Welt-Hauptsitz Meuselwitz.</p>
                <ul class="hero-bullet-list"><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Standortbündelung vollendet:</strong> Alle Fertigungsbereiche erfolgreich in Meuselwitz vereint.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Dank an Team Gärtringen:</strong> Tiefste Anerkennung für jahrzehntelangen herausragenden Einsatz.</span></li><li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span><strong>Zukunft der Spitzenklasse:</strong> Konzentriertes Wissen sichert höchste Präzision für Generationen.</span></li></ul>

                <div class="hero-meta-bottom">
                  <div class="hero-fact-tag">✦ Tradition bewahren • Zukunft gestalten</div>
                  <div class="hero-quick-nav">
                    <button class="hero-nav-arrow prev" data-dir="prev"  title="Zurück">←</button>
                    <button class="hero-nav-arrow next" data-dir="next"  title="Zur Baudokumentation">→</button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer (Zero background lines, completely dark) -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot (Below Central Flight Path) -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">„Erfahrung ist die Basis – Perfektion das Ziel.“</span>
              <span class="tree-counter-author">• Clemens Kunert • Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
            </div>
          </div>

        </div>
        <!-- Backward-compat hidden anchor for slide navigation hooks -->
        <div id="history-slide-body" style="display:none;"></div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 4: Interaktive Baudokumentation Meuselwitz (Harmonic Flying Light Point & Photo-Focus Timeline) -->
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
          <!-- BUILD MILESTONE 0: 11.2025 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel active branch-up" data-milestone="0" id="build-milestone-0">
            <div class="tree-watermark-year tree-watermark-month-year">11.2025</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/01_20251103_152224.jpg" alt="Start Bauvorhaben: Entkernung">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">11.2025</div>
                <div class="photo-card-step-badge">Bauphase 1 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Start Bauvorhaben: Entkernung</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Freilegung der tragenden Hallenstrukturen im Bereich des künftigen Verwaltungs- und Empfangstrakts.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev" disabled title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 1: Hallenvorbereitung & Entkernung</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 1: 12.2025 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="1" id="build-milestone-1">
            <div class="tree-watermark-year tree-watermark-month-year">12.2025</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 2: Entkernung Foyer & Baufeld</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/14_20251201_135805.jpg" alt="Entkernung des Foyers & Eingangsbereichs">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">12.2025</div>
                <div class="photo-card-step-badge">Bauphase 2 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Entkernung des Foyers & Eingangsbereichs</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Blick vom Foyer in Richtung Filzproduktion: Freigeräumte Großflächen für die neue Manufaktur-Infrastruktur.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 2: 01.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="2" id="build-milestone-2">
            <div class="tree-watermark-year tree-watermark-month-year">01.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/18_20260106_135356.jpg" alt="Medien- & Trinkwasserversorgung">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">01.2026</div>
                <div class="photo-card-step-badge">Bauphase 3 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Medien- & Trinkwasserversorgung</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Präzise Schachtarbeiten für Frisch- und Brauchwasserleitungen – unterbrechungsfrei bei laufender Produktion.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 3: Tiefbau & Medienversorgung</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 3: 02.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="3" id="build-milestone-3">
            <div class="tree-watermark-year tree-watermark-month-year">02.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 4: Klaviermechanik-Aufbau</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/23_20260227_074933.jpg" alt="Aufbau der Klaviermechanik-Fertigung">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">02.2026</div>
                <div class="photo-card-step-badge">Bauphase 4 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Aufbau der Klaviermechanik-Fertigung</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Frühere Lagerflächen werden zur hochmodernen Fertigungsstraße für Klavier-Hebeglieder umgebaut.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 4: 03.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="4" id="build-milestone-4">
            <div class="tree-watermark-year tree-watermark-month-year">03.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/25_20260320_090128.jpg" alt="Intelligente Lagerlogistik & Lagerlifte">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">03.2026</div>
                <div class="photo-card-step-badge">Bauphase 5 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Intelligente Lagerlogistik & Lagerlifte</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Maximale Flächeneffizienz: Installation moderner vertikaler Shuttle-Lagerlifte für zehntausende Bauteile.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 5: Moderne Lagerlogistik</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 5: 04.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="5" id="build-milestone-5">
            <div class="tree-watermark-year tree-watermark-month-year">04.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 6: Umzug Hammerkopffertigung</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/34_20260521_144701.jpg" alt="Umzug der Hammerkopf-Manufaktur">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">04.2026</div>
                <div class="photo-card-step-badge">Bauphase 6 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Umzug der Hammerkopf-Manufaktur</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Das akustische Herzstück von Renner bezieht seinen neuen, klimastabilen Fertigungsbereich in Meuselwitz.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 6: 05.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="6" id="build-milestone-6">
            <div class="tree-watermark-year tree-watermark-month-year">05.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/27_20260428_083959.jpg" alt="Spezialfundament für die Filteranlage">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">05.2026</div>
                <div class="photo-card-step-badge">Bauphase 7 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Spezialfundament für die Filteranlage</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Statische Hochpräzision: Fundamentierung für die 40 Tonnen schwere und 12 Meter hohe zentrale Absauganlage.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 7: Fundamente Absauganlage</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 7: 05.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="7" id="build-milestone-7">
            <div class="tree-watermark-year tree-watermark-month-year">05.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 8: Kranhub der Filtermodule</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <video class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/31_20260512_113224.mp4" autoplay loop muted playsinline></video>
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">05.2026</div>
                <div class="photo-card-step-badge">Bauphase 8 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Anlieferung & Kranhub der Filtermodule</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Schwerlast-Logistik per 70-Tonnen-Autokran: Millimetergenaue Positionierung der tonnenschweren Filterkomponenten.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 8: 05.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="8" id="build-milestone-8">
            <div class="tree-watermark-year tree-watermark-month-year">05.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/33_20260513_120405.jpg" alt="Kranmontage des Filterturms">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">05.2026</div>
                <div class="photo-card-step-badge">Bauphase 9 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Kranmontage des Filterturms</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Präzisionsmontage in luftiger Höhe: Das 12 Meter hohe Filterturm-Oberteil wird auf die schwingungsentkoppelte Stahlkonstruktion gesetzt.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 9: Kranmontage des Filterturms</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 9: 06.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="9" id="build-milestone-9">
            <div class="tree-watermark-year tree-watermark-month-year">06.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 10: Montage der Großfilteranlage</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/36_20260610_075535.jpg" alt="Montage der Großfilter- & Absauganlage">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">06.2026</div>
                <div class="photo-card-step-badge">Bauphase 10 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Montage der Großfilter- & Absauganlage</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Mit 120.000 m³/h Luftleistung garantiert die neu errichtete Filteranlage staubfreie, hochpräzise Fertigungsprozesse.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 10: 07.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="10" id="build-milestone-10">
            <div class="tree-watermark-year tree-watermark-month-year">07.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/38_20260708_120853.jpg" alt="Absaugtrassen & Hallenverrohrung">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">07.2026</div>
                <div class="photo-card-step-badge">Bauphase 11 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Absaugtrassen & Hallenverrohrung</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Installation der großdimensionierten Rohrtrassen zur lückenlosen Absaugung aller Holzbearbeitungsmaschinen.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 11: Hallenverrohrung & Trassenbau</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 11: 09.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="11" id="build-milestone-11">
            <div class="tree-watermark-year tree-watermark-month-year">09.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 12: Dachzentrale & Klimatechnik</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/42_20260909_094559.jpg" alt="Dachzentrale: Prozessluft & Klimatechnik">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">09.2026</div>
                <div class="photo-card-step-badge">Bauphase 12 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Dachzentrale: Prozessluft & Klimatechnik</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Perfekte Klimastabilität: Garantierte 45–50 % relative Luftfeuchte und konstante Temperaturen – sommers wie winters.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 12: 09.2026 (Branch UP) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-up" data-milestone="12" id="build-milestone-12">
            <div class="tree-watermark-year tree-watermark-month-year">09.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Meuselwitz_Umbau/44_20260915_133800.jpg" alt="Prozessluft- und Klimaanlage">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">09.2026</div>
                <div class="photo-card-step-badge">Bauphase 13 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Prozessluft- und Klimaanlage</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Hocheffiziente Prozessluft- und Klimatechnik auf dem Werksdach: Höchste Klimastabilität für anspruchsvollste Holz- und Filzverarbeitung.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Weiter">→</button>
                </div>
              </div>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 13: Prozessluft- & Klimaanlage</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>
          </div>
          <!-- BUILD MILESTONE 13: 10.2026 (Branch DOWN) -->
          <div class="tree-milestone-panel build-milestone-panel  branch-down" data-milestone="13" id="build-milestone-13">
            <div class="tree-watermark-year tree-watermark-month-year">10.2026</div>

            <!-- Top Slot -->
            <div class="tree-slot top-slot">
                          <div class="tree-counter-pill">
              <span class="tree-counter-text">Phase 14: Kehlerei & Vollbetrieb Meuselwitz</span>
              <span class="tree-counter-author">• Louis Renner Meuselwitz</span>
            </div>
            </div>

            <!-- Center Spine Spacer -->
            <div class="tree-slot spine-slot"></div>

            <!-- Bottom Slot -->
            <div class="tree-slot bottom-slot">
                          <div class="tree-hero-card photo-focus-card">
              <div class="photo-card-img-wrapper">
                <img class="photo-card-img" src="Visuell/Bilder/02_Umbau_und_Umzug/48_20261009_081342.jpg" alt="Montage der Kehlerei & Vollendung">
                <div class="hero-corner-bracket top-left"></div>
                <div class="hero-corner-bracket top-right"></div>
                <div class="hero-corner-bracket bottom-left"></div>
                <div class="hero-corner-bracket bottom-right"></div>
                <div class="photo-card-month-badge">10.2026</div>
                <div class="photo-card-step-badge">Bauphase 14 von 14</div>
              </div>
              <div class="photo-caption-bar">
                <div class="photo-caption-dot"></div>
                <div class="photo-caption-title">Montage der Kehlerei & Vollendung</div>
                <span class="photo-caption-separator">•</span>
                <div class="photo-caption-text">Letzte Abteilung erfolgreich verlagert: Die traditionsreiche Kehlerei und die gesamte Holzfertigung produzieren nun in Meuselwitz.</div>
                <div class="photo-caption-nav">
                  <button class="photo-nav-btn prev" data-dir="prev"  title="Zurück">←</button>
                  <button class="photo-nav-btn next" data-dir="next"  title="Nächste Folie">→</button>
                </div>
              </div>
            </div>
            </div>
          </div>
            </div>
          </div>

        </div>
        <!-- Backward-compat hidden anchor for slide navigation hooks -->
        <div id="build-slide-body" style="display:none;"></div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 5 (Animierte FFW Firmengeschichte & Weickert-Filz) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 6 (FFW Felt Stage: Rohwolle & Faserselektion) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 7 (FFW Felt Stage: Die geheime Wollmischung) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 8 (FFW Felt Stage: Krempeln & Vliesbildung) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 9 (FFW Felt Stage: Der Walkprozess) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 10 (FFW Felt Stage: Natürliche Walkhärte 0.56 Shore) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 11 (FFW Felt Stage: Nachpressen mit Filzhämmern & Steinen) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 12 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 13 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 14 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 15 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 16 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 17 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 18: Unterfilz-Farbprogramm -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 19: Kernholz-Arten & Dichten -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 20: Kernholz-Profilformen -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 21 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 22 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 23 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 24 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 25 (Sander Bento Mosaic) -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 26: Vorteile der neuen Renner-Hammerköpfe -->
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
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 27: Original Louis Renner Yamaha Kit (Folie 5 Layout Struktur) -->
      <section class="slide yk-kit-slide" data-slide="27">
        <!-- Ambient Felt Texture Background Layer -->
        <div class="ffw-ambient-felt-backdrop" aria-hidden="true"></div>

        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s27_category">Teil 4: Yamaha Kit • Produktvorstellung</div>
            <h2 class="slide-title" data-i18n="s27_title">Louis Renner Yamaha Kit (C1–C3)<br>Nahtloser Einbau &amp; Maximale Klangveredelung</h2>
            <div class="slide-subtitle" data-i18n="s27_subtitle">Maßgeschneidert für Yamaha C1–C3: Dynamische Ausdruckskraft, brillante Obertöne &amp; tiefer Fundamentalbass.</div>
          </div>

          <!-- Timeline Stepper & Autoplay Controls -->
          <div class="ffw-timeline-controls">
            <button class="ffw-play-btn" id="yk-play-btn" title="Präsentation abspielen">
              <span class="ffw-play-icon" id="yk-play-icon">▶</span>
              <span class="ffw-play-label" data-i18n="s27_play_label">Präsentation abspielen</span>
              <div class="ffw-play-progress" id="yk-play-progress"></div>
            </button>
            <div class="ffw-step-buttons">
              <button class="ffw-step-btn prev" id="yk-prev-btn" title="Vorheriger Bereich">←</button>
              <span class="ffw-step-counter" id="yk-step-counter">1 / 5</span>
              <button class="ffw-step-btn next" id="yk-next-btn" title="Nächster Bereich">→</button>
            </div>
          </div>
        </div>

        <div class="slide-body">
          <div class="ffw-history-layout">
            <!-- LEFT WING: Interactive Stage (62% width) -->
            <div class="ffw-history-main">
              <!-- Epoch / Topic Tabs Bar -->
              <div class="ffw-epoch-tabs" id="yk-epoch-tabs" role="tablist">
                <button class="ffw-epoch-tab active" data-epoch="0" role="tab" aria-selected="true">
                  <span class="ffw-tab-year">INNOVATION</span>
                  <span class="ffw-tab-tag" data-i18n="s27_tab1_tag">Messbasiertes System</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="1" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">DYNAMIK</span>
                  <span class="ffw-tab-tag" data-i18n="s27_tab2_tag">Gewicht &amp; Dynamik</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="2" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">DROP-IN</span>
                  <span class="ffw-tab-tag" data-i18n="s27_tab3_tag">1-Schrauben-Montage</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="3" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">KLANG</span>
                  <span class="ffw-tab-tag" data-i18n="s27_tab4_tag">Konzertklang</span>
                </button>
                <button class="ffw-epoch-tab" data-epoch="4" role="tab" aria-selected="false">
                  <span class="ffw-tab-year">EFFIZIENZ</span>
                  <span class="ffw-tab-tag" data-i18n="s27_tab5_tag">Stunden statt Tage</span>
                </button>
              </div>

              <!-- Active Epoch Stage Card -->
              <div class="ffw-stage-card" id="yk-stage-card">
                <!-- PANEL 0: INNOVATION -->
                <div class="ffw-milestone-panel active" data-panel="0">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s27_b1_badge">&gt;MESSBASIERTE FERTIGUNG · 5 JAHRE ENTWICKLUNG</span>
                      <span class="ffw-panel-year" style="font-size: 1.6rem;">INNOVATION</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s27_p1_title">Proprietäres Mess- &amp; Fertigungssystem</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s27_p1_subtitle">Vollendete Klangkultur für neue wie bestehende Yamaha C1–C3 Flügel.</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p1_bullet_1"><strong>Kalibriertes System:</strong> 5 Jahre Entwicklung für exakt abgestimmte Dichte, Elastizität und Filzspannung.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p1_bullet_2"><strong>Definierter Zielklang:</strong> Jeder Satz millimetergenau auf das akustische Optimum des C1–C3 gefertigt.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p1_bullet_3"><strong>Klang ohne Nadelarbeit:</strong> Sofort voller, warmer Konzertton – ohne aufwendige manuelle Vorintonation.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s27_p1_fact">✦ Prozesssicherer Konzertklang: Sofortiges Meisterergebnis ab Werk</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/img_1352.jpg" alt="Renner Hammerköpfe mit Weickert Filz">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s27_b2_badge">&gt;RENNER MESS-SYSTEM</span>
                      <span class="ffw-media-caption-text" data-i18n="s27_p1_caption">Vorkalibrierter Hammerkopfsatz: Vollendetes Klangspektrum ohne manuelle Nadelung</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 1: DYNAMIK -->
                <div class="ffw-milestone-panel" data-panel="1">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s27_b3_badge">&gt;OPTIMIERTES TRÄGHEITSMOMENT</span>
                      <span class="ffw-panel-year" style="font-size: 1.6rem;">DYNAMIK</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s27_p2_title">Ausbalanciertes Gewicht &amp; Schnelle Repetition</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s27_p2_subtitle">Kalibrierter Nussbaumkern mit feinjährigen Stielen für spürbar leichtere Tastenansprache.</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p2_bullet_1"><strong>Kalibrierter Nussbaumkern:</strong> Leichter Resonanzkern senkt das Trägheitsmoment für agiles, müheloses Spiel.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p2_bullet_2"><strong>Selektierte Weißbuche:</strong> Feinjähriges Spiegelholz garantiert maximale Biegesteifigkeit und pure Schwingung.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p2_bullet_3"><strong>Vorgespannte Röllchen:</strong> Unter hoher Zugspannung verleimt für überlegene Rückstellkraft und verzögerungsfreie Repetition.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s27_p2_fact">✦ Enorme Zeitersparnis: Kompletter Tausch &amp; Feinregulation in 4–5 Stunden vor Ort</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/img_1351.jpg" alt="Hainbuchenstiele mit Kapseln">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s27_b4_badge">&gt;GEWICHT &amp; GEOMETRIE</span>
                      <span class="ffw-media-caption-text" data-i18n="s27_p2_caption">Auf Yamaha C1–C3 kalibrierte Hammerstiele mit Kapseln für feinfühliges Spielgefühl</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 2: DROP-IN -->
                <div class="ffw-milestone-panel" data-panel="2">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s27_b5_badge">&gt;EINSCHRAUBEN · AUSRICHTEN · FERTIG</span>
                      <span class="ffw-panel-year" style="font-size: 1.6rem;">DROP-IN</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s27_p3_title">Simple 1-Schrauben-Montage</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s27_p3_subtitle">Vollständig auf Kapseln aufgeleimter Satz – werkseitig mit natürlichem Glutenleim fixiert.</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p3_bullet_1"><strong>1-Schrauben-Fixierung:</strong> Kapseln Note für Note direkt in das originale Yamaha-Aluminiumprofil verschrauben.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p3_bullet_2"><strong>Präzise Vorbohrung:</strong> Im exakten Winkel vorgebohrt – keinerlei Einmess- oder Bohraufwand in der Werkstatt.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p3_bullet_3"><strong>Glasharter Glutenleim:</strong> Kristallisiert glashart aus für ungedämpften, direkten Schwingungsfluss in den Stiel.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s27_p3_fact">✦ Maximale Prozesssicherheit: Null Fehlerrisiko bei Bohrung und Leimung</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/installation_rail.jpg" alt="Werkseitige 91 Grad Verleimung">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s27_b6_badge">&gt;PLUG &amp; PLAY</span>
                      <span class="ffw-media-caption-text" data-i18n="s27_p3_caption">Im 91°-Winkel verleimter Satz auf Kapseln – direkt auf die originale Yamaha-Schiene montierbar</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 3: KLANG -->
                <div class="ffw-milestone-panel" data-panel="3">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s27_b7_badge">&gt;OBERTONREICHER KONZERTKLANG</span>
                      <span class="ffw-panel-year" style="font-size: 1.6rem;">KLANG</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s27_p4_title">Reiches Klangspektrum &amp; Farbigkeit</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s27_p4_subtitle">Vom warmen europäischen Pianissimo bis zur kraftvollen Tragfähigkeit im Fortissimo.</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p4_bullet_1"><strong>Homogener Filzstreifen:</strong> Aus einem Stück 3D-gepresst – garantiert bruchlose Übergänge über alle 88 Tasten.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p4_bullet_2"><strong>Differenzierter Bass:</strong> Austarierte Masse und elastischer Filz für tiefe Grundtönigkeit und saubere Tontrennung.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p4_bullet_3"><strong>Glockenreiner Diskant:</strong> Leichter Kern und gezielte Scheitel-Verdichtung für einen tragenden, singenden Gesangston.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s27_p4_fact">✦ Klangveredelung: Verwandelt harten Attack in warmen, singenden Konzertton</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/Verpackung_Deckel_Mockup_Box_DE.jpg" alt="Renner Yamaha Kit Box">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s27_b8_badge">&gt;DYNAMIK &amp; KLANGFARBEN</span>
                      <span class="ffw-media-caption-text" data-i18n="s27_p4_caption">Aus einem homogenen Filzstreifen gefertigt: Nahtlose Klangübergänge ohne Registerbrüche</span>
                    </div>
                  </div>
                </div>

                <!-- PANEL 4: EFFIZIENZ -->
                <div class="ffw-milestone-panel" data-panel="4">
                  <div class="ffw-panel-info">
                    <div class="ffw-panel-header">
                      <span class="bento-badge gold" data-i18n="s27_b9_badge">&gt;STUNDEN STATT TAGE</span>
                      <span class="ffw-panel-year" style="font-size: 1.6rem;">EFFIZIENZ</span>
                    </div>
                    <h3 class="ffw-panel-title" data-i18n="s27_p5_title">4–5 Stunden vor Ort statt 3–7 Tage Werkstatt</h3>
                    <div class="ffw-panel-subtitle" data-i18n="s27_p5_subtitle">Klassische Werkstatt-Prozedur versus taggleicher Einbau und Feinregulation direkt am Instrument.</div>
                    <div class="ffw-panel-bullets">
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p5_bullet_1"><strong>Klassisch (3–7 Tage):</strong> Transport, Köpfe ausleimen, Bohrtabelle, Warmleim, Flucht richten, Schleifen &amp; Vorintonieren.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p5_bullet_2"><strong>Renner Kit (4–5 h):</strong> Direkt aufschrauben, Saitenebene und Scheitel ausrichten – bei Bedarf fertig intonieren.</span>
                      </div>
                      <div class="ffw-bullet-item">
                        <span class="bento-dot gold"></span>
                        <span data-i18n="s27_p5_bullet_3"><strong>Vor Ort &amp; Raumakustik:</strong> Kein Transportrisiko – mehr Zeit für die perfekte Abstimmung auf Raumakustik und Kundenwunsch.</span>
                      </div>
                    </div>
                    <div class="ffw-panel-footer">
                      <span class="ffw-fact-badge" data-i18n="s27_p5_fact">✦ Höchste Wirtschaftlichkeit: Arbeitsaufwand von Tagen auf wenige Stunden vor Ort reduziert</span>
                    </div>
                  </div>
                  <div class="ffw-panel-media">
                    <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/img_1433.jpg" alt="Althammer vs Neuer Renner Hammerkopf">
                    <div class="hero-corner-bracket top-left"></div>
                    <div class="hero-corner-bracket top-right"></div>
                    <div class="hero-corner-bracket bottom-left"></div>
                    <div class="hero-corner-bracket bottom-right"></div>
                    <div class="ffw-media-caption-box">
                      <span class="bento-badge green" data-i18n="s27_b10_badge">&gt;EFFIZIENZ-VERGLEICH</span>
                      <span class="ffw-media-caption-text" data-i18n="s27_p5_caption">Ausgespielter Althammer nach 25 Jahren vs. Neuer Renner Konzert-Hammerkopf auf Stiel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT WING: Kit Spotlight Card (38% width) -->
            <div class="ffw-felt-spotlight">
              <div class="bento-card ffw-felt-card">
                <div class="ffw-felt-card-header">
                  <span class="bento-badge gold" data-i18n="s27_b11_badge">&gt;RENNER YAMAHA KIT</span>
                  <div class="bento-card-title" data-i18n="s27_c1_title">Köpfe &amp; Stiele im Detail</div>
                  <div class="bento-card-desc" data-i18n="s27_c1_desc">
                    100% einbaufertig vorkonfektioniert für Yamaha C1, C2 und C3.
                  </div>
                </div>

                <!-- Product Viewer Box with Zoom -->
                <div class="ffw-texture-viewer" id="yk-texture-viewer" title="Klicken für Makro-Inspektion">
                  <img src="Visuell/Bilder/05_Yamaha_Kit/kit_assets/img_1360.jpg" alt="Renner Hammerkopf auf Stiel Detail" class="ffw-texture-img" id="yk-texture-img">
                  <div class="hero-corner-bracket top-left"></div>
                  <div class="hero-corner-bracket top-right"></div>
                  <div class="hero-corner-bracket bottom-left"></div>
                  <div class="hero-corner-bracket bottom-right"></div>
                  <div class="ffw-texture-overlay">
                    <span class="ffw-texture-tag" data-i18n="s27_texture_tag">Makro: Kopf auf Stiel mit Kapsel</span>
                    <button class="ffw-zoom-toggle-btn" id="yk-zoom-toggle-btn" data-i18n="s27_zoom_btn">🔍 Detail-Lupe</button>
                  </div>
                </div>

                <!-- 4 Excellence Highlights -->
                <div class="ffw-felt-highlights">
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s27_hl1_title">Kalibriertes System:</strong>
                      <span data-i18n="s27_hl1_desc">Proprietäres Messverfahren für vollendeten Klang ab Werk – ohne Vorintonation.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s27_hl2_title">Nussbaum &amp; Weißbuche:</strong>
                      <span data-i18n="s27_hl2_desc">Minimiertes Trägheitsmoment für blitzschnelle Repetition und agile Tastenansprache.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s27_hl3_title">Drop-In &amp; Glutenleim:</strong>
                      <span data-i18n="s27_hl3_desc">Glasharte 91°-Schwingungskopplung, werkseitig fertig verleimt – 0 h Bohrarbeit.</span>
                    </div>
                  </div>
                  <div class="ffw-highlight-item">
                    <span class="ffw-hl-dot"></span>
                    <div>
                      <strong data-i18n="s27_hl4_title">1-Schrauben-Montage:</strong>
                      <span data-i18n="s27_hl4_desc">Plug &amp; Play ins Originalprofil – Einbau &amp; Mechanikregulation in 4–5 Stunden vor Ort.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 28: Das Uhren-Modell -->
      <section class="slide slide-hero-theme" data-slide="28">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s28_category">Teil 5: Intonation • Geometrie & Keile</div>
            <h2 class="slide-title" data-i18n="s28_title">Das Uhren-Modell: Die 4 dynamischen Keile</h2>
            <div class="slide-subtitle" data-i18n="s28_subtitle">Strukturierte Aufteilung des Hammerkopfs nach Register- und Lautstärkezielen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid" style="grid-template-columns: repeat(2, 1fr); gap: 14px;">
              <div class="bento-card" style="border-left: 4px solid #3b82f6;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s28_b1_badge">FORTISSIMO (ff)</span>
                  <span class="mono-val">9:00–10:00 & 2:00–3:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s28_c1_title">Blauer Keil</div>
                <div class="bento-card-desc" data-i18n="s28_c1_desc">Tiefe Nadelstiche zur Entspannung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #22c55e;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s28_b2_badge">FORTE (f)</span>
                  <span class="mono-val">10:00–11:00 & 1:00–2:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s28_c2_title">Grüner Keil</div>
                <div class="bento-card-desc" data-i18n="s28_c2_desc">Raumklang, Glanz und dynamische Entfaltung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #f97316;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s28_b3_badge">PIANO (p)</span>
                  <span class="mono-val">11:00–11:30 & 12:30–1:00</span>
                </div>
                <div class="bento-card-title" data-i18n="s28_c3_title">Orangener Keil</div>
                <div class="bento-card-desc" data-i18n="s28_c3_desc">Lyrischer Gesangston, feine Abstimmung</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #a855f7;">
                <div class="bento-card-header">
                  <span class="bento-badge" data-i18n="s28_b4_badge">PIANISSIMO (pp)</span>
                  <span class="mono-val">11:30–12:00 & 12:00–12:30</span>
                </div>
                <div class="bento-card-title" data-i18n="s28_c4_title">Violetter Keil</div>
                <div class="bento-card-desc" data-i18n="s28_c4_desc">Flüsterleise Ansprache</div>
              </div>
              <div class="bento-card col-span-2" style="border-left: 4px solid #ef4444; background: rgba(239,68,68,0.08);">
                <div class="bento-card-header">
                  <span class="bento-badge red" data-i18n="s28_b5_badge">>ROTE ZONE (SCHEITEL)</span>
                  <span class="mono-val" style="color: #f87171; font-weight: 700;">12:00 UHR KRONENSPITZE</span>
                </div>
                <div class="bento-card-title" style="color: #fca5a5;" data-i18n="s28_c5_title">DO NOT TOUCH! – Niemals tief einstechen!</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image210.jpg" alt="Das Uhren-Modell der Intonation">
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s28_b6_badge">>JENS-SÖREN KRUSE</span>
                <div class="bento-media-caption" data-i18n="s28_caption_1">Original Renner Uhrenmodell</div>
                <div class="bento-media-subcaption" data-i18n="s28_caption_2">mit den 4 dynamischen Keilen (ff, f, p, pp)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 29 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="29">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s29_category">Teil 5: Intonation • Vorintonation</div>
            <h2 class="slide-title" data-i18n="s29_title">Vorintonation (Pre-Needling): Tiefe Stiche im ff-Keil</h2>
            <div class="slide-subtitle" data-i18n="s29_subtitle">Abbau werkseitiger Vorspannung und Energieübertragung in den Forte-Keil</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s29_b1_badge">>PRE-NEEDLING</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">pp – ff</span>
                <span class="bento-metric-unit">Vorintonation</span>
              </div>
              <div class="bento-card-desc" data-i18n="s29_c1_desc">
                Die Vorintonation ist der wichtigste Basisschritt bei fabrikneuen oder neu befilzten Hämmern:
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_1"><strong>Arbeitszone:</strong> Ausschließlich im blauen Fortissimo-Keil (Bereiche 9:00–10:00 Uhr und 2:00–3:00 Uhr).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_2"><strong>Tiefe Einstiche:</strong> Nadeln tief bis kurz vor den Unterfilz einstechen (niemals in Unterfilz oder Holzkern stechen!).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_3"><strong>Spannungstransfer:</strong> Der Kopf verliert die harte Werkssteife; elastische Spannungsenergie fließt in den grünen Forte-Keil ab.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s29_bullet_4"><strong>Empfehlung:</strong> Dieser Schritt ist vor dem ersten Anspielen im Instrument fast ausnahmslos anzuraten.</span>
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
                <span class="bento-badge green" data-i18n="s29_b2_badge">>GRUNDELASTIZITÄT</span>
                <div class="bento-media-caption" data-i18n="s29_caption_1">Pre-Needling: Tiefe Stiche im Fortissimo-Keil (9:00 bis 10:00 Uhr)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 30 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="30">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s30_category">Teil 5: Intonation • Werkzeug & Technik</div>
            <h2 class="slide-title" data-i18n="s30_title">Nadelstich-Vorgaben & Intonierwerkzeuge</h2>
            <div class="slide-subtitle" data-i18n="s30_subtitle">Drücken statt Hacken – Exakte Stichanzahlen für Bass, Mittellage und Diskant</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s30_b1_badge">>WERKZEUGKUNDE</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">3 & 1</span>
                <span class="bento-metric-unit">Nadelwerkzeuge</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s30_bullet_1"><strong>Stichanzahlen Pre-Needling:</strong>
                <br>• Bass: 7–10 Stiche horizontal
                <br>• Mittellage: 5–10 Stiche horizontal
                <br>• Diskant: 0–7 Stiche vertikal</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s30_bullet_2"><strong>Drücken, niemals hacken!</strong> Nadeln ruhig und mit Körpergewicht eindrücken. Hacken zerreißt die Wollfasern unkontrolliert!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s30_bullet_3"><strong>Original Renner Werkzeuge:</strong>
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
                <span class="bento-badge green" data-i18n="s30_b2_badge">>PRÄZISIONSNADELN</span>
                <div class="bento-media-caption" data-i18n="s30_caption_1">Renner Intonierwerkzeuge, Nadelhalter und Intonierapparat</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 31 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="31">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s31_category">Teil 5: Intonation • Saitenlagerung</div>
            <h2 class="slide-title" data-i18n="s31_title">Saitenvorbereitung: Anhangstifte, Stegstifte & Agraffen</h2>
            <div class="slide-subtitle" data-i18n="s31_subtitle">„Der beste Hammerkopf kann nur das hervorbringen, was im Instrument programmiert ist!“</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s31_b1_badge">>SAITEN-BETTUNG</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_1"><strong>Anhangstifte setzen:</strong> Saiten von hinten nach vorn am Anhangstift mit Messingdurchschlag und leichtem Hammer vorsichtig niederschlagen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_2"><strong>Saiten an Stegstiften anpassen:</strong> Mit speziellem Renner-Setzer die Saiten auf den Steg drücken, um falsche Schwingungen auszuschließen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s31_bullet_3"><strong>Chorreinheit abstimmen:</strong> Vor der ersten Intonationsnadelung muss der Saitenchor absolut rein und nebengeräuschfrei klingen.</span>
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
                <span class="bento-badge green" data-i18n="s31_b2_badge">>CHORREINHEIT</span>
                <div class="bento-media-caption" data-i18n="s31_caption_1">Saiten niederschlagen am Anhangstift mit Messingdurchschlag</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 32 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="32">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s32_category">Teil 5: Intonation • Ausrichtung</div>
            <h2 class="slide-title" data-i18n="s32_title">Anschlagspunkt im Diskant & Geradheitsprüfung</h2>
            <div class="slide-subtitle" data-i18n="s32_subtitle">Optimierung der Noten 69–88 durch Verschieben des Klaviaturrahmens</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s32_b1_badge">>STRIKE POINT</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">3</span>
                <span class="bento-metric-unit">Saiten Tricord</span>
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_1"><strong>Anschlagspunkt Note 88 prüfen:</strong> Klaviaturrahmen minimal vor- und zurückschieben, um die hellste, tragfähigste Klangstelle im Diskant zu finden.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_2"><strong>Noten 69 bis 88 anpassen:</strong> Der Diskant vieler Flügel lässt sich durch eine Neujustierung des Anschlagspunkts dramatisch verbessern!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s32_bullet_3"><strong>Geradheit aller Köpfe:</strong> Prüfung durch leichtes Anzupfen mit Haken oder Heben der Klinke mit dem Finger; Markierung mit Kreide auf der Taste.</span>
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
                <span class="bento-badge green" data-i18n="s32_b2_badge">>DISKANTGLANZ</span>
                <div class="bento-media-caption" data-i18n="s32_caption_1">Prüfung des Diskant-Anschlagspunkts und Ausrichtung der Hämmer</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 33: Abziehen der Hammerkronen (Filing) -->
      <section class="slide slide-hero-theme" data-slide="33">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s33_category">Teil 5: Intonation • Kronenabzug</div>
            <h2 class="slide-title" data-i18n="s33_title">Abziehen der Hammerkrone: Hohl vs. Plan vs. Schief</h2>
            <div class="slide-subtitle" data-i18n="s33_subtitle">Anpassung der Scheitelfläche an den 3-chörigen Saitenverlauf mit feiner Hammerfeile</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s33_b1_badge">>HOHL VOR RUND</span>
                </div>
                <div class="bento-card-title" data-i18n="s33_c1_title">1. Hohl vor Rund (Seitenabzug)</div>
                <div class="bento-card-desc" data-i18n="s33_c1_desc">Mit dem Schleifbrettchen von den Schultern her zur Scheitelmitte hin arbeiten, um die natürliche Keilspannung zu bewahren.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s33_b2_badge">>KRONENSCHEITEL</span>
                </div>
                <div class="bento-card-title" data-i18n="s33_c2_title">2. Sanfter Kronenscheitel</div>
                <div class="bento-card-desc" data-i18n="s33_c2_desc">Abschließend den Scheitel mit feinstem Schleifleinen (Körnung 320–400) vorsichtig verrunden, ohne Scheitelfilz abzutragen.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image209.jpg" alt="Kronenabzug">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s33_b3_badge">>SCHLEIFFEILE</span>
                <div class="bento-media-caption" data-i18n="s33_caption_1">Kronenabzug: Schleifbrettführung für gleichmäßigen Scheitelradius</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
<!-- SLIDE 34 (Sander Bento Mosaic) -->
      <section class="slide slide-hero-theme" data-slide="34">
<div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s34_category">Teil 5: Intonation • Feinabstimmung</div>
            <h2 class="slide-title" data-i18n="s34_title">Zwischen- & Feinintonation: Die 2-mm-Kronenstiche</h2>
            <div class="slide-subtitle" data-i18n="s34_subtitle">Chromatisches Durchhören und vorsichtiges Egalisieren von Einzeltönen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s34_b1_badge">>FEININTONATION</span>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s34_bullet_1"><strong>Chromatisches Durchspielen:</strong> Tastatur auf- und abwärts chromatisch anschlagen; Noten mit abweichender Härte oder Lautstärke lokalisieren.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s34_bullet_2"><strong>Zwischenintonation (Mid-Voicing):</strong> Sanftes Nadeln im grünen Forte- und orangenen Piano-Keil. Zu weiche Töne werden durch feines Nachschleifen gehärtet!</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s34_bullet_3"><strong>Feinintonation (Final Balance):</strong> Kurze Einzelnadel (BDK-Halter Art. 43-0003269 oder Chop Stick Art. 43-0003271).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span data-i18n="s34_bullet_4"><strong>Stichtiefe max. 2 mm an der Krone:</strong> Ausschließlich zwischen den Saitenabdrücken einstechen, niemals direkt in den Rillen!</span>
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
                <span class="bento-badge green" data-i18n="s34_b2_badge">>FARBPALETTE</span>
                <div class="bento-media-caption" data-i18n="s34_caption_1">Chromatisches Abhören und Feinabstimmung mit kurzer Einzelnadel</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
      <!-- SLIDE 35: Una Corda & Fazit -->
      <section class="slide slide-hero-theme" data-slide="35">
        <div class="slide-header">
          <div>
            <div class="slide-category" data-i18n="s35_category">Teil 5: Intonation • Una Corda & Dialog</div>
            <h2 class="slide-title" data-i18n="s35_title">Verschiebungsintonation & Die Renner Academy</h2>
            <div class="slide-subtitle" data-i18n="s35_subtitle">Linkes Pedal abstimmen, Geräusche vermeiden & Willkommen im Renner-Fachdialog</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-grid" style="grid-template-columns: 1fr; gap: 12px;">
              <div class="bento-card">
                <span class="bento-badge green" data-i18n="s35_b1_badge">>UNA CORDA PRAXIS</span>
                <div class="bento-card-title" data-i18n="s35_c1_title">Verschiebungsintonation</div>
                <div class="bento-card-desc" data-i18n="s35_c1_desc">
                  Chromatisches Spiel mit getretenem Pedal; nur die getroffenen Saitenbereiche vorsichtig nachnadeln.
                </div>
                <div class="bento-card-list">
                  <div class="bento-card-list-item">
                    <span class="bento-dot gold"></span>
                    <span data-i18n="s35_bullet_1"><strong>Experten-Tipp:</strong> Leichtes Brechen der linken Kante der Hammerkrone mit feiner Schleiffeile verhindert Reibgeräusche an Nachbarsaiten!</span>
                  </div>
                </div>
              </div>
              <div class="bento-card hero-card">
                <span class="bento-badge gold" data-i18n="s35_b2_badge">>RENNER ACADEMY</span>
                <div class="bento-card-title" data-i18n="s35_c2_title">Renner Academy & Technischer Dialog</div>
                <div class="bento-card-desc" data-i18n="s35_c2_desc">
                  Renner bietet fundierte Meisterkurse, Werksführungen in Meuselwitz und individuellen Werkstattsupport für Klavierbaumeister weltweit.
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image31.png" alt="Renner Abschluss">
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s35_b3_badge">>LOUIS RENNER GMBH</span>
                <div class="bento-media-caption" data-i18n="s35_caption_1">Louis Renner GmbH</div>
                <div class="bento-media-subcaption" data-i18n="s35_caption_2">Ihr Partner für meisterlichen Klang weltweit</div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-corner-watermark">
          <div class="brand-logo-container corner-variant">
            <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
            <div class="brand-logo-light-sheen" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <!-- ==========================================================================
       Bottom Navigation HUD
       ========================================================================== -->
  <footer class="bottom-hud">
    <div class="progress-container">
      <div class="progress-bar-fill" id="progress-bar-fill"></div>
    </div>

    <div class="slide-info-group">
      <span class="slide-counter" id="slide-counter">1 / 68</span>
      <span class="slide-brand-pill">Louis Renner GmbH</span>
    </div>

    <div class="bottom-hud-right">
      <div class="nav-controls">
        <button class="hud-jump-modules-btn" id="hud-jump-slide2-btn" title="Zurück zur Modul-Übersicht (Folie 2) [Taste: 2]">
          <span class="hud-jump-icon">⊞</span>
          <span class="hud-jump-text" data-i18n="btn_back_to_modules">Folie 2 (Module)</span>
        </button>
        <button class="nav-arrow-btn" id="prev-slide-btn" title="Vorherige Folie (←)">
          ←
        </button>
        <button class="nav-arrow-btn" id="next-slide-btn" title="Nächste Folie (→ / Leertaste)">
          →
        </button>
      </div>

      <div class="bottom-hud-brand-wrap" title="Louis Renner GmbH • Seit 1882">
        <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner Logo" class="bottom-hud-renner-logo">
      </div>
    </div>
  </footer>

  <!-- ==========================================================================
       Slide Grid Overview Modal
       ========================================================================== -->
  <div class="modal-overlay" id="slides-grid-modal">
    <div class="modal-content-card">
      <div class="modal-header">
        <h3 class="modal-title" data-i18n="slides_overview">Folien-Übersicht</h3>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="slides-grid-view" id="slides-grid-view"></div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       Speaker Notes Drawer
       ========================================================================== -->
  <div class="notes-drawer" id="speaker-notes-drawer">
    <div class="notes-header">
      <span class="notes-title">
        📝 <span data-i18n="speaker_notes_title">Referenten-Notizen</span>
      </span>
      <button class="modal-close-btn" onclick="window.presentation.toggleNotes()">&times;</button>
    </div>
    <div class="notes-content" id="speaker-notes-content">
      <p>Willkommen zur Renner Präsentation 2025.</p>
    </div>
  </div>

  <!-- ==========================================================================
       Virtual Laser Pointer Element
       ========================================================================== -->
  <div class="laser-pointer" id="laser-pointer"></div>

  <!-- ==========================================================================
       Landscape Orientation Warning (Device rotation reminder)
       ========================================================================== -->
  <div class="orientation-landscape-warning" id="orientation-warning">
    <div class="orientation-warning-card">
      <div class="orientation-icon">🔄</div>
      <h3 data-i18n="rotate_device_title">Bitte Gerät drehen</h3>
      <p data-i18n="rotate_device_desc">Die Louis Renner Masterclass ist für das Querformat (Landscape) optimiert.</p>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/translations.js"></script>
  <script src="js/translations-data.js"></script>
  <script src="js/audio-synth.js"></script>
  <script src="js/timelapse.js"></script>
  <script src="js/history-journey.js"></script>
  <script src="js/transformation-journey.js"></script>
  <script src="js/ffw-history.js"></script>
  <script src="js/felt-anatomy.js"></script>
  <script src="js/yamaha-kit.js"></script>
  <script src="js/presentation.js"></script>
  <script>
    // Offline PWA Service Worker Management
    // In local development (localhost / 127.0.0.1), unregister service workers & purge caches to ensure live code is always seen
    if ('serviceWorker' in navigator) {
      if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const reg of registrations) reg.unregister();
        });
        if ('caches' in window) {
          caches.keys().then(keys => {
            for (const key of keys) caches.delete(key);
          });
        }
      } else if (window.location.protocol.startsWith('http')) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
      }
    }
  </script>
  <script>
    // Fail-Safe Fallback: Warnt benutzerfreundlich, wenn die Datei einzeln ohne Ressourcen heruntergeladen wurde
    setTimeout(function() {
      if (!window.presentation) {
        var banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,14,26,0.96);color:#fff;z-index:999999;display:flex;align-items:center;justify-content:center;padding:24px;font-family:sans-serif;text-align:center;';
        banner.innerHTML = '<div style="max-width:620px;background:#1a2236;padding:36px;border-radius:12px;border:1px solid #c5a059;box-shadow:0 10px 40px rgba(0,0,0,0.8);">' +
          '<h2 style="color:#c5a059;margin-top:0;">🎹 Louis Renner Masterclass Präsentation</h2>' +
          '<p style="font-size:15px;line-height:1.6;color:#e0e0e0;">Die Skripte und Präsentationsinhalte wurden nicht geladen. Dies passiert, wenn eine Datei einzeln aus dem Web-SharePoint in den Download-Ordner heruntergeladen wurde.</p>' +
          '<div style="text-align:left;background:#0d121f;padding:16px 20px;border-radius:8px;margin:20px 0;font-size:14px;line-height:1.6;">' +
          '<strong>So starten Sie die Anwendung aus SharePoint:</strong><br><br>' +
          '• <strong>iPad / Tablet:</strong> Öffnen Sie die Präsentation im Ordner <code>Deployed/</code> oder starten Sie <code>index_offline_tablet.html</code> direkt in Safari / Chrome.<br>' +
          '• <strong>Windows:</strong> Öffnen Sie den synchronisierten SharePoint-Ordner im Windows Explorer und doppelklicken Sie auf <code>Start_Windows.bat</code>.<br>' +
          '• <strong>Mac:</strong> Doppelklicken Sie im Ordner auf <code>Start_Mac.app</code>.<br>' +
          '• <strong>OneDrive-Synchronisation:</strong> Klicken Sie in SharePoint oben in der Menüleiste auf <em>„Synchronisieren“</em>, um den Ordner auf Ihren PC einzubinden.' +
          '</div>' +
          '<button onclick="this.parentElement.parentElement.remove()" style="background:#c5a059;color:#000;border:none;padding:10px 24px;border-radius:6px;font-weight:bold;cursor:pointer;">Schließen</button>' +
          '</div>';
        document.body.appendChild(banner);
      }
    }, 1800);
  </script>
</body>
</html>

