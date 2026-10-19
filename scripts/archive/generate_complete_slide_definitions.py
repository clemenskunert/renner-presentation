# -*- coding: utf-8 -*-
"""
generate_complete_slide_definitions.py
Generates the complete 68 slide definitions into slide_definitions.py
"""

def generate():
    with open("slide_definitions.py", "w", encoding="utf-8") as f:
        f.write('''# -*- coding: utf-8 -*-
"""
slide_definitions.py
Complete, authentic slide definitions for the 68 slides of the Renner Masterclass Deck.
Strictly based on the 5 technical masterclass documents in "Präsentation - Basis":
1. Hammerkopf_Japan_040325 (Clemens Kunert, Meuselwitz)
2. HK_Prd_Auswahl_10_25 (Jens-Sören Kruse, Klavierbaumeister)
3. HSt_Kap_Auswahl_MTK_10_25 (Jens-Sören Kruse, Klavierbaumeister)
4. EN_GP_HK_Glueing_10_25 (Jens-Sören Kruse, Klavierbaumeister)
5. Intonation_10_25 (Jens-Sören Kruse, Klavierbaumeister)
plus the official louis-renner.de history and Google Photos Meuselwitz transformation album.
"""

TOTAL_SLIDES = 68

def get_watermark():
    return \'\'\'        <div class="slide-corner-watermark">
          <img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo">
        </div>\'\'\'

def get_all_slides_html():
    slides = []
''')

        # Generate CHAPTER 1: Slides 1-6
        f.write('''
    # =========================================================================
    # KAPITEL 1: EINFÜHRUNG, GESCHICHTE & DIE NEUE ÄRA IN MEUSELWITZ (1 - 6)
    # =========================================================================

    # SLIDE 1: Hero / Title Slide
    slides.append(f\'\'\'      <!-- SLIDE 1: Hero / Title Slide -->
      <section class="slide active hero-slide" data-slide="1">
        <span class="hero-kicker">Renner Masterclass & Konferenz 2025 • Tokyo & Shanghai</span>
        <h1 class="hero-main-title">LOUIS RENNER</h1>
        <p class="hero-main-subtitle" data-lang-content="de">
          Das Herzstück des Klaviers: 140 Jahre Tradition, die neue Fertigung in Meuselwitz & die hohe Kunst des Hammerkopfs
        </p>
        <p class="hero-main-subtitle" data-lang-content="en" style="display:none;">
          The Heart of the Piano: 140 Years of Tradition, Modern Manufacturing in Meuselwitz & The Art of Hammerhead Engineering
        </p>
        <p class="hero-main-subtitle" data-lang-content="ja" style="display:none;">
          ピアノの心臓部：140年の伝統、モイゼルヴィッツ新拠点、そして至高のハンマーヘッド製造技術
        </p>
        <p class="hero-main-subtitle" data-lang-content="zh" style="display:none;">
          钢琴的心脏：雷诺140年极致工艺传承、莫伊瑟尔维茨新总部启航与弦槌声学生产大师课
        </p>
        <div class="hero-meta-bar">
          <div class="hero-meta-item">
            <span>Speaker:</span> <strong>Clemens Kunert</strong>
          </div>
          <div class="hero-meta-item">
            <span>Location:</span> <strong>Tokyo & Shanghai Conference 2025</strong>
          </div>
          <div class="hero-meta-item">
            <span>Headquarters:</span> <strong>Louis Renner GmbH • Meuselwitz, Germany</strong>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 2: Agenda & Course Topics
    slides.append(f\'\'\'      <!-- SLIDE 2: Agenda & Course Topics -->
      <section class="slide" data-slide="2">
        <div class="slide-header">
          <div>
            <div class="slide-category">Übersicht • Struktur der Masterclass</div>
            <h2 class="slide-title">Die 6 Kernmodule der Renner Masterclass</h2>
            <div class="slide-subtitle">Vollständiges Schulungs- & Fachprogramm auf Basis der originalen Renner Academy Unterlagen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="card-grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div class="feature-card">
              <div class="card-icon">🏛️</div>
              <div class="card-title">1. Historie & Hauptsitz</div>
              <div class="card-desc">140+ Jahre Meilensteine, Zusammenlegung der Standorte & die neue moderne Produktion in Meuselwitz (Bau 09.2023–2025).</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🐑</div>
              <div class="card-title">2. Filzherstellung (FFW Wurzen)</div>
              <div class="card-desc">Weickert-Tradition seit 1783, Rohwoll-Selektion, Kardieren, Walken (Shore 0.56) und exklusiver „Weickert Special“-Filz.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">⚙️</div>
              <div class="card-title">3. Hammerkopf-Fertigung</div>
              <div class="card-desc">Roboter-Filzzuschnitt, Unterfilzfräsen, Kernhölzer (Dichten 490–860 kg/m³), Presskräfte, CNC-Bearbeitung und T-Vernietung.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🧰</div>
              <div class="card-title">4. Musterteilekoffer & Stiele</div>
              <div class="card-desc">15 Hebeglieder, 16 Kapselvarianten, Röllchen (17 / 15,5 mm), Stieldurchmesser (6,0 / 5,3 / 4,8 mm) und 5-Tage-Ruhelagerung.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">📐</div>
              <div class="card-title">5. Maßblätter & Geometrie</div>
              <div class="card-desc">Standard-Bohrungslänge (Gesamtlänge - 24 mm), Bohrwinkel in Gon (100er-Teilung), 90°-Stielwinkel und 3 mm Überhang.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🎹</div>
              <div class="card-title">6. Hohe Schule der Intonation</div>
              <div class="card-desc">Das Uhren-Modell, 4 dynamische Keile (ff, f, p, pp), Pre-Needling, Saitennivellierung, Kronenabzug und Una-Corda-Feinabstimmung.</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 3: 140+ Jahre Tradition & Meilensteine
    slides.append(f\'\'\'      <!-- SLIDE 3: 140+ Jahre Tradition & Meilensteine -->
      <section class="slide" data-slide="3">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 1: Einführung & Historie • Unsere Geschichte</div>
            <h2 class="slide-title">140+ Jahre Tradition & Perfektion (1882 – Heute)</h2>
            <div class="slide-subtitle">Vom Stuttgarter Handwerksbetrieb zum Weltmaßstab für Klaviermechaniken & Hammerköpfe</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title" style="color: var(--gold-accent);">1882 – Gründung durch Louis Renner</div>
              <div class="card-desc">Gründung in Stuttgart als handwerkliche Werkstatt für Flügel- und Klaviermechaniken. Stetiges Wachstum durch kompromisslose Präzision.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title" style="color: var(--gold-accent);">1906 – Eigene Hammerkopf-Fertigung</div>
              <div class="card-desc">Aufnahme der eigenen Hammerkopf-Produktion zur vollständigen Kontrolle über das akustische Zusammenspiel von Mechanik und Saite.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title" style="color: var(--gold-accent);">1944 / 1952 – Zerstörung & Neubeginn Gärtringen</div>
              <div class="card-desc">Nach völliger Zerstörung im Krieg Wiederaufbau und 1952 Bezug des neuen Werksstandorts in Gärtringen bei Stuttgart.</div>
            </div>
            <div class="feature-card">
              <div class="card-title" style="color: var(--gold-accent);">1991 / 2019 / 2025 – Meuselwitz & Moderne Ära</div>
              <div class="card-desc">Gründung Werk Meuselwitz 1991; 2019 Eingliederung in Steinway & Sons; 2025 Bündelung aller Kräfte am neuen Welt-Hauptsitz Meuselwitz.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/Bilder/01_Geschichte/01_historische_renner_werkstatt_1882.png" alt="Historische Renner Werkstatt 1882">
              <div class="media-caption">Historische Renner Manufaktur: Traditionelle Handarbeit seit 1882</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 4: Transformation Meuselwitz
    slides.append(f\'\'\'      <!-- SLIDE 4: Transformation Meuselwitz -->
      <section class="slide" data-slide="4">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 1: Einführung & Historie • Standort Meuselwitz</div>
            <h2 class="slide-title">Zusammenlegung & Ausbau zum globalen Hauptsitz</h2>
            <div class="slide-subtitle">Bündelung aller Kompetenzen am modernen Produktionsstandort Meuselwitz</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Um den wachsenden internationalen Qualitätsanforderungen gerecht zu werden und Synergien optimal zu nutzen, hat Louis Renner die beiden bisherigen Werke (Gärtringen und Meuselwitz) an einem hochmodernen Standort zusammengeführt.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Bauvorhaben ab 09.2023 / 2024:</strong> Umfassende Revitalisierung und Erweiterung der Hallenflächen in Meuselwitz (Thüringen).</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Schließung Standort Gärtringen:</strong> Konzentration der gesamten Mechanik- und Hammerkopf-Kompetenz an einer zentralen Stätte.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Wertstromorientiertes Layout:</strong> Kürzeste Wege vom Holzzuschnitt über die Filzlagerung bis zur Endmontage und Baugruppenruhe.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Zukunftssicherung:</strong> Ausbau von Ausbildungsplätzen und Kapazitäten für weltweite Konzert- und Serienkunden.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/Bilder/02_Meuselwitz_Umbau/24_meuselwitz_moderner_hauptsitz_aussen_innen.jpg" alt="Neuer Renner Hauptsitz Meuselwitz">
              <div class="media-caption">Der neue, vereinte Renner Hauptsitz in Meuselwitz</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 5: Interaktive Baudokumentation Meuselwitz
    slides.append(f\'\'\'      <!-- SLIDE 5: Interaktive Baudokumentation Meuselwitz -->
      <section class="slide" data-slide="5">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 1: Einführung & Historie • Baudokumentation</div>
            <h2 class="slide-title">Baudokumentation: Die Entstehung des neuen Werks</h2>
            <div class="slide-subtitle">Fotodokumentation der Meilensteine des Umbaus in Meuselwitz (09.2023 – 2025)</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 16px;">
              <div class="card-title">Der Umbau in 5 Phasen</div>
              <ul class="bullet-list" style="margin-top: 10px;">
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Phase 1:</strong> Entkernung, Bodensanierung und Hallenisolierung</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Phase 2:</strong> Installation modernster Klimatechnik und Absauganlagen</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Phase 3:</strong> Umzug der Spezialmaschinen und Präzisionspressen</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Phase 4:</strong> Aufbau der robotergestützten Zuschnittlinien</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Phase 5:</strong> Inbetriebnahme des klimatisierten Filz- und Baugruppenlagers</span></li>
              </ul>
            </div>
            <div class="media-container" style="height: 180px; min-height: 180px;">
              <img src="Visuell/Bilder/02_Meuselwitz_Umbau/16_meuselwitz_montagetische_einrichtung.jpg" alt="Montagetische Meuselwitz">
              <div class="media-caption">Neue Montagetische und ergonomische Arbeitsplätze</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 440px;">
              <img id="timelapse-stage-image" src="Visuell/Bilder/02_Meuselwitz_Umbau/00_meuselwitz_bauvorhaben_start_2025.jpg" alt="Baufortschritt Meuselwitz">
              <div class="media-caption" id="timelapse-stage-caption">Start des Bauvorhabens: Rohbau und Hallenstruktur</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 6: Moderne Produktionsinfrastruktur
    slides.append(f\'\'\'      <!-- SLIDE 6: Moderne Produktionsinfrastruktur -->
      <section class="slide" data-slide="6">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 1: Einführung & Historie • Meuselwitz Infrastruktur</div>
            <h2 class="slide-title">Klimakontrolle & Präzisionslogistik</h2>
            <div class="slide-subtitle">Gleichbleibende Materialfeuchte als Voraussetzung für Mikrometer-Präzision</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="card-grid" style="grid-template-columns: 1fr; gap: 14px;">
              <div class="feature-card">
                <div class="card-title">Konstantes Mikroklima (45–50% r.F.)</div>
                <div class="card-desc">Sowohl Holzkörper als auch Filze reagieren sensibel auf Luftfeuchtigkeitsschwankungen. In Meuselwitz wird das Raumklima rund um die Uhr computergesteuert überwacht.</div>
              </div>
              <div class="feature-card">
                <div class="card-title">Mottenschutz & Reifekammern</div>
                <div class="card-desc">Speziell isolierte Woll- und Filzlager mit pheromonbasiertem Monitoring und konstanter Luftumwälzung garantieren makellose Rohstoffqualität.</div>
              </div>
              <div class="feature-card">
                <div class="card-title">Absaugung & Reinraum-Standards</div>
                <div class="card-desc">Moderne Absauganlagen an allen Fräs- und Schleifstationen verhindern Feinstaubablagerungen auf den sensiblen Filz- und Tuchbaugruppen.</div>
              </div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/Bilder/02_Meuselwitz_Umbau/13_meuselwitz_klimatisierte_lagerraeume.jpg" alt="Klimatisierte Lagerräume Meuselwitz">
              <div class="media-caption">Klimatisierte Baugruppen- und Materiallager in Meuselwitz</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 2: Slides 7-17
        f.write('''
    # =========================================================================
    # KAPITEL 2: DIE FILZHERSTELLUNG BEI FFW WURZEN (FFW & WEICKERT) (7 - 17)
    # =========================================================================

    # SLIDE 7: Geschichte des Weickert-Filzes
    slides.append(f\'\'\'      <!-- SLIDE 7: Geschichte des Weickert-Filzes -->
      <section class="slide" data-slide="7">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Historie & Tradition</div>
            <h2 class="slide-title">J.D. Weickert & Die Wiege des Hammerkopffilzes</h2>
            <div class="slide-subtitle">1783 in Leipzig gegründet – 1847 Eröffnung der Spezialfabrik in Wurzen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Gründung 1783:</strong> Gegründet von Johann David Weickert in Leipzig (Sachsen). Ursprünglich Tuch- und Filzherstellung.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Pionierleistung 1847:</strong> In der neu errichteten Fabrik in Wurzen gelang es erstmals, speziellen Hammerkopffilz in gleichbleibender Spitzenqualität zu fertigen, wie er bis heute genutzt wird.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Weltweiter Hoflieferant:</strong> Bereits im 19. Jahrhundert belieferte Weickert die renommiertesten Pianoforte-Fabrikanten Europas und Amerikas.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Klangliche Identität:</strong> Weickert-Filz gilt weltweit als der Inbegriff des warmen, tragfähigen und farbenreichen europäischen Klaviertons.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_3_2_Image161.jpg" alt="Geschichte Weickert Filz">
              <div class="media-caption">Original Weickert-Manufaktur in Wurzen (Sachsen)</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 8: FFW Wurzen heute
    slides.append(f\'\'\'      <!-- SLIDE 8: FFW Wurzen heute -->
      <section class="slide" data-slide="8">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • FFW Wurzen heute</div>
            <h2 class="slide-title">FFW Wurzen – Weickert-Filz in der Gegenwart</h2>
            <div class="slide-subtitle">Traditionelles Handwerkswissen vereint mit modernsten Produktionsstandards</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Die Filzfabrik Wurzen (FFW) wird heute von renommierten Filzmanufakturen aus Braunschweig (Deutschland) und Toronto (Kanada) geführt.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Exklusive Renner-Partnerschaft:</strong> Renner bezieht seinen gesamten Premium-Deckfilz exklusiv aus der modernisierten Wurzener Manufaktur.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Traditionsmeister:</strong> Das tiefe Wissen erfahrener Altmeister über Wollfeuchte, Walkzeiten und Faserrezepturen wird sorgfältig weitergegeben.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Modernisierte Anlagen:</strong> Präzise Temperatur- und Drucküberwachung für unerreichte Chargenkonstanz.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image6.jpeg" alt="Filzfabrik Wurzen modern">
              <div class="media-caption">Filzfabrik Wurzen (FFW): Traditionelle Fertigung auf modernem Niveau</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 9: Rohwolle & Faserselektion
    slides.append(f\'\'\'      <!-- SLIDE 9: Rohwolle & Faserselektion -->
      <section class="slide" data-slide="9">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Rohstoff & Wolle</div>
            <h2 class="slide-title">Reine Schurwolle: Schonung der Faserstruktur</h2>
            <div class="slide-subtitle">Nur unverpresste Rohwolle garantiert die maximale natürliche Elastizität</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Ballenlieferung ohne Überpressung:</strong> Die Rohwolle wird in locker gepackten Ballen transportiert. Zu starkes Verpressen würde die empfindlichen Schuppen und Biegungen der Wollfasern irreversibel schädigen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Höhere Logistikkosten für Spitzenqualität:</strong> Dieser schonende Transport erhöht das Transportvolumen, sichert jedoch die unversehrte Faserelastizität.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Starke Faserkräuselung:</strong> Nur hochgradig gekräuselte Merinowollfasern bieten beim späteren Walkprozess den optimalen Verhakungseffekt.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Schonende Carbonisierung:</strong> Chemisch sanftes Reinigungsverfahren entfernt Pflanzenteilchen, ohne die Proteinstruktur des Keratins anzugreifen.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_5_2_Image181.jpg" alt="Rohwolle in Ballen">
              <div class="media-caption">Anlieferung der Rohwolle: Schonend gelagerte Wollballen bei FFW</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 10: Die geheime Wollmischung
    slides.append(f\'\'\'      <!-- SLIDE 10: Die geheime Wollmischung -->
      <section class="slide" data-slide="10">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Wollmischung</div>
            <h2 class="slide-title">Die geheime Rezeptur der Wollmischung</h2>
            <div class="slide-subtitle">Auflockerung und Mischung verschiedener Wollpartien für maßgeschneiderte Dichten</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Die Zusammensetzung und Aufbereitung der Wollfasern für Renner-Hammerköpfe ist ein streng gehütetes Manufakturgeheimnis zwischen der Filzfabrik Wurzen und Louis Renner.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Blend-Verfahren:</strong> Mischen unterschiedlicher Faserlängen und -stärken, um spezifische Federsteifigkeiten zu erzielen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Faserauflockerung:</strong> Mehrstufiges maschinelles Zupfen und Belüften trennt Faserknäuel sanft in Einzelfasern.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Klimakonditionierung:</strong> Konstante Feuchteaufnahme vor dem Kardieren verhindert elektrostatische Aufladung und Faserbruch.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_6_2_Image187.jpg" alt="Mischen der Wollfasern">
              <div class="media-caption">Auflockerungs- und Mischprozess der Faserchargen bei FFW Wurzen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 11: Krempeln & Vliesbildung (Carding)
    slides.append(f\'\'\'      <!-- SLIDE 11: Krempeln & Vliesbildung (Carding) -->
      <section class="slide" data-slide="11">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Vlies & Faserrichtung</div>
            <h2 class="slide-title">Krempeln: Parallele Ausrichtung zu weichen Vliesen</h2>
            <div class="slide-subtitle">Die definierte Faserorientierung als Fundament für Schwingung und Saitenansprache</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Kardieren (Carding):</strong> Die aufgelockerten Fasern werden über feine Nadelwalzen gekämmt, entwirrt und parallel zueinander angeordnet.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Definierte Faserrichtung:</strong> Das so entstehende hauchdünne, weiche Vlies besitzt eine exakt vorgegebene Vorzugsrichtung der Fasern.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Schichtung:</strong> Mehrere Vlieslagen werden im Kreuz- und Längsverbund übereinandergelegt, um die gewünschte Plattendicke und Dichteverteilung aufzubauen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Voraussetzung für die Intonation:</strong> Nur parallel geordnete Fasern reagieren bei späteren Intonierarbeiten vorhersehbar und gleichmäßig auf Nadelstiche.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_7_2_Image190.jpg" alt="Krempeln zu Vlies">
              <div class="media-caption">Auskämmen der Wolle zu seidig fließenden Vliesen mit definierter Faserrichtung</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 12: Der Walkprozess (Felting)
    slides.append(f\'\'\'      <!-- SLIDE 12: Der Walkprozess (Felting) -->
      <section class="slide" data-slide="12">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Walkprozess</div>
            <h2 class="slide-title">Die 4 Säulen des Walkens: Dampf, Druck, Bewegung & Wissen</h2>
            <div class="slide-subtitle">Verschlingung der Fasern durch natürliche physikalisch-thermische Reize</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Echter Hammerkopffilz entsteht ohne Bindemittel oder Klebstoffe. Das Verfilzen beruht rein auf den natürlichen Schuppen der Wollhaare.
            </p>
            <div class="card-grid" style="grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px;">
              <div class="feature-card">
                <div class="card-title">1. Heißdampf</div>
                <div class="card-desc">Öffnet die mikroskopischen Schuppen der Haare und macht das Keratin geschmeidig.</div>
              </div>
              <div class="feature-card">
                <div class="card-title">2. Mechanischer Druck</div>
                <div class="card-desc">Presst die Vlieslagen kontinuierlich zusammen und leitet die Verdichtung ein.</div>
              </div>
              <div class="feature-card">
                <div class="card-title">3. Oszillierende Bewegung</div>
                <div class="card-desc">Reibung verschlingt die Widerhaken der Fasern unlösbar ineinander.</div>
              </div>
              <div class="feature-card">
                <div class="card-title">4. Handwerkliches Know-how</div>
                <div class="card-desc">Gefühl für den exakten Abbruchzeitpunkt bestimmt Elastizität und Resonanz.</div>
              </div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_8_2_Image194.jpg" alt="Der Walkprozess">
              <div class="media-caption">Zusammenführen und Walken der Vlieslagen zur homogenen Filzplatte</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 13: Natürliche Walkhärte: 0.56 Shore
    slides.append(f\'\'\'      <!-- SLIDE 13: Natürliche Walkhärte: 0.56 Shore -->
      <section class="slide" data-slide="13">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Elastizität</div>
            <h2 class="slide-title">0.56 Shore: Die Grenze der natürlichen Walkhärte</h2>
            <div class="slide-subtitle">Maximale Eigenelastizität durch Verzicht auf chemische oder thermische Überhärtung</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Maximale Kompression der Fasern:</strong> Filzplatten werden beim Walken so lange verdichtet, bis sich die Fasern auf rein mechanischem Wege nicht weiter zusammenschieben lassen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Physikalische Obergrenze 0.56 Shore:</strong> Dies entspricht der maximalen natürlichen Walkhärte von ca. 0.56 Shore.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Keine künstliche Versteifung:</strong> Härtere Filze anderer Hersteller werden oft durch Leime oder chemische Zusätze erzwungen – Weickert/Renner setzt auf 100% reine Faserelastizität!</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Akustisches Resultat:</strong> Reiche Obertonstruktur, schnelle Rückfederung von der Saite („Let-off“ des Hammers) und minimales Eigengeräusch.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image7.jpeg" alt="Filzplatten bei FFW">
              <div class="media-caption">Gewalkte Filzplatten mit natürlicher Federkraft von 0.56 Shore</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 14: Nachpressen mit Filzhämmern & Steinen
    slides.append(f\'\'\'      <!-- SLIDE 14: Nachpressen mit Filzhämmern & Steinen -->
      <section class="slide" data-slide="14">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Nachverdichtung</div>
            <h2 class="slide-title">Verdichten mit Filzhämmern & Filzsteinen</h2>
            <div class="slide-subtitle">Formgebung auf Endmaß ohne Schleifen – Bewahrung der seidigen Faserhaut</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Die Nachbearbeitung gewalkter Platten entscheidet über deren Langzeitstabilität:
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Mechanisches Nachschlagen:</strong> Spezielle Filzhämmer und polierte Natursteine verdichten die Platten auf die exakten Sollmaße.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Verzicht auf Schleifen:</strong> Wird Filz geschliffen, werden Abermillionen Fasern gekappt. Das Weickert-Verfahren verzichtet vollständig auf Schleifen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Glatter Biegeradius:</strong> Beim Biegen um den Holzkern bleibt die Oberfläche vollkommen geschlossen und glatt ohne aufplatzende Risse.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_9_2_Image198.jpg" alt="Verdichten mit Filzhämmern">
              <div class="media-caption">Nachbearbeitung: Verdichten der Filzplatten mit Hämmern und Steinen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 15: Das klimatisierte Filzlager in Meuselwitz
    slides.append(f\'\'\'      <!-- SLIDE 15: Das klimatisierte Filzlager in Meuselwitz -->
      <section class="slide" data-slide="15">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Filzlager Meuselwitz</div>
            <h2 class="slide-title">Über 30 Plattensorten im klimatisierten Lager</h2>
            <div class="slide-subtitle">Konische Plattengeometrie und permanente Reifekontrolle im Werk Meuselwitz</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Konische Plattenform:</strong> Die Filzplatten sind werkseitig keilförmig aufgebaut – dicker und schwerer im Bass, stetig dünner und dichter werdend zum Diskant hin.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Über 30 Rezepturen auf Lager:</strong> Renner hält permanent weit über 30 verschiedene Filzplattensorten von FFW Wurzen vorrätig – mehr als jeder andere Hersteller weltweit.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Klimakontrolle & Mottenschutz:</strong> Kontrollierte Luftfeuchte und Pheromonfallen schützen das Naturmaterial dauerhaft.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Spannungsfreies Reifen:</strong> Mindestlagerdauer vor dem Zuschnitt baut innere Restspannungen vollständig ab.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_10_2_Image202.jpg" alt="Filzlager Meuselwitz">
              <div class="media-caption">Filzplattenlager im Werk Meuselwitz: Über 30 Plattensorten permanent verfügbar</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 16: Die „Seele“ des Filzes
    slides.append(f\'\'\'      <!-- SLIDE 16: Die „Seele“ des Filzes -->
      <section class="slide" data-slide="16">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Filz-Identifikation</div>
            <h2 class="slide-title">Die „Seele“: Das Markenzeichen der Wurzener Filze</h2>
            <div class="slide-subtitle">1 oder 2 farbige Schichten am Bass-Beginn als traditioneller Herkunftsnachweis</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Beim Blick auf originale Renner-Hammerköpfe im Bass fällt oft ein feiner farbiger Streifen im Inneren des Filzes auf.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Was ist die „Seele“?</strong> Eine dünne, andersfarbige Filzschicht, die bei der Plattenherstellung am Bassanfang eingearbeitet wird.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Traditioneller Herkunftsnachweis:</strong> Ein historisches Echtheitsmerkmal der Filzfabrik Wurzen für Klavierbauer weltweit.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Kein Qualitätsunterschied:</strong> Platten mit 1 oder 2 Seelen besitzen identische Fasereigenschaften – sie dienen der Chargenkennzeichnung und optischen Authentizität.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_11_2_Image206.jpg" alt="Filzstreifen mit Seele">
              <div class="media-caption">Filzstreifen mit sichtbarer „Seele“ (farbige Kennzeichnungsschicht am Bassanfang)</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 17: Exklusiv: Der „Weickert Special“-Filz
    slides.append(f\'\'\'      <!-- SLIDE 17: Exklusiv: Der „Weickert Special“-Filz -->
      <section class="slide" data-slide="17">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Weickert Special</div>
            <h2 class="slide-title">„Weickert Special“: Nur für Louis Renner</h2>
            <div class="slide-subtitle">Höchster Lanolingehalt für unübertroffene Intonationsstabilität und Tonansprache</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px; border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Was macht „Weickert Special“ so einzigartig?</div>
              <ul class="bullet-list" style="margin-top: 8px;">
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Exklusivrezeptur:</strong> Wird von der Filzfabrik Wurzen ausschließlich für Renner gefertigt.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Höherer Wollfettgehalt (Lanolin):</strong> Spezieller Waschprozess belässt mehr natürliches Lanolin in der Faser.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Reduziertes Quellverhalten:</strong> Deutlich unempfindlicher gegenüber jahreszeitlichen Luftfeuchteschwankungen.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Verbesserte Traktionskräfte:</strong> Außergewöhnliche Adhäsion und Eigenspannung am Holzkern.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Dauerhafte Intonationshaltung:</strong> Der einmal intonierte Klangcharakter bleibt über Jahre stabil.</span></li>
              </ul>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_11_3_Image207.jpg" alt="Weickert Special Filz">
              <div class="media-caption">Weickert Special: Feinste Wollfaserqualität mit maximaler Standzeit</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 3: Slides 18-29
        f.write('''
    # =========================================================================
    # KAPITEL 3: DIE NEUE HAMMERKOPF-FERTIGUNG IN MEUSELWITZ (18 - 29)
    # =========================================================================

    # SLIDE 18: Filzzuschnitt mit Robotertechnologie
    slides.append(f\'\'\'      <!-- SLIDE 18: Filzzuschnitt mit Robotertechnologie -->
      <section class="slide" data-slide="18">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Roboter-Zuschnitt</div>
            <h2 class="slide-title">Robotischer Filzzuschnitt: Höchste Schnittpräzision</h2>
            <div class="slide-subtitle">Automatisiertes Trennen der Filzplatten in exakt proportionierte Deckfilzstreifen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Präzisions-Robotik:</strong> 6-Achs-Roboter führt das Spezial-Schneidmesser mit gleichbleibender Geschwindigkeit und Schnittdruck.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Gleichmäßige Streifen:</strong> Exakt parallele Kanten ohne Quetschungen oder thermische Faserverglasung.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Automatische Signierung:</strong> Jeder geschnittene Streifen wird sofort mit internen Fertigungs- und Chargendaten codiert.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Industrie 4.0 im Klavierbau:</strong> Digitale Rückverfolgbarkeit vom Wollballen bis zum fertigen Konzertflügel.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image15.png">
                <source src="Visuell/Videos/01_roboter_filzzuschnitt.mp4" type="video/mp4">
              </video>
              <div class="media-caption">Werk Meuselwitz: Robotischer Filzzuschnitt der Deckfilzstreifen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 19: Qualität der Deckfilzstreifen nach dem Schnitt
    slides.append(f\'\'\'      <!-- SLIDE 19: Qualität der Deckfilzstreifen -->
      <section class="slide" data-slide="19">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Deckfilz-Qualität</div>
            <h2 class="slide-title">Kantenqualität & Faserintegrität des Deckfilzes</h2>
            <div class="slide-subtitle">Makellose Schnittflächen als Voraussetzung für spannungsfreies Umschlingen des Kerns</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Nach dem Roboterschnitt wird jeder Streifen einer optischen Prüfung unterzogen.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Konische Geometrie:</strong> Gleichmäßige Keilform von Note 1 bis Note 88 ohne Maßabweichungen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Saubere Schnittkanten:</strong> Keine abstehenden Faserbündel, keine Fransen – glatte Seitenwände für den Leimauftrag.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Vermeidung von Schiefzug:</strong> Nur exakt rechtwinklig geschnittene Streifen legen sich beim Pressen absolut symmetrisch um das Kernholz.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image16.jpeg" alt="Qualität Deckfilzstreifen">
              <div class="media-caption">Geprüfter Deckfilzstreifen: Konischer Verlauf und homogene Faserstruktur</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 20: Unterfilz-Profilierung
    slides.append(f\'\'\'      <!-- SLIDE 20: Unterfilz-Profilierung -->
      <section class="slide" data-slide="20">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Unterfilz</div>
            <h2 class="slide-title">Unterfilz-Profilierung: Geometrie vor dem Verpressen</h2>
            <div class="slide-subtitle">Formfräsen des Unterfilzes für die optimale Dämpfungs- und Kraftübertragungszone</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Funktion des Unterfilzes:</strong> Der Unterfilz dient als elastischer Puffer zwischen dem harten Holzkern und dem weicheren Deckfilz.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Präzisions-Profilierung:</strong> In Meuselwitz wird der Unterfilzstreifen vor dem Verleimen auf Spezial-Fräsmaschinen exakt profiliert.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Gleichmäßiger Druckverlauf:</strong> Die profilierte Kontur garantiert, dass der Pressdruck beim Schließen der Pressbacken gleichmäßig in die Flanken geleitet wird.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image17.png">
                <source src="Visuell/Videos/02_unterfilz_profilieren.mp4" type="video/mp4">
              </video>
              <div class="media-caption">Profilieren des Unterfilzstreifens auf der Renner Spezialfräse</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 21: Unterfilz-Farbprogramm
    slides.append(f\'\'\'      <!-- SLIDE 21: Unterfilz-Farbprogramm -->
      <section class="slide" data-slide="21">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Farbprogramm</div>
            <h2 class="slide-title">Das Renner Unterfilz-Farbsortiment</h2>
            <div class="slide-subtitle">Traditionsfarben für jeden Klavierhersteller und individuelle Sonderwünsche</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Der Unterfilz prägt nicht nur die Mechanik-Elastizität, sondern auch das unverwechselbare optische Gesicht traditionsreicher Instrumente.
            </p>
            <div class="card-grid" style="grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px;">
              <div class="feature-card" style="border-left: 4px solid #cc2222;">
                <div class="card-title">Rot / Weinrot</div>
                <div class="card-desc">Der weltbekannte Renner-Klassiker; Standard bei vielen europäischen Spitzenmarken.</div>
              </div>
              <div class="feature-card" style="border-left: 4px solid #ff9900;">
                <div class="card-title">Orange</div>
                <div class="card-desc">Traditionelle Kennfarbe klassischer Konzertinstrumente und historischer Reparaturen.</div>
              </div>
              <div class="feature-card" style="border-left: 4px solid #ddbb00;">
                <div class="card-title">Gelb</div>
                <div class="card-desc">Charakteristischer Unterfilz für renommierte sächsische und Wiener Klaviere.</div>
              </div>
              <div class="feature-card" style="border-left: 4px solid #2255cc;">
                <div class="card-title">Blau / Schwarz</div>
                <div class="card-desc">Klassisches Blau für C. Bechstein sowie edles Schwarz für moderne Designer-Flügel.</div>
              </div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_14_2_Image226.jpg" alt="Unterfilz Farbpalette">
              <div class="media-caption">Renner Unterfilz-Sortiment: Rot, Weinrot, Orange, Gelb, Blau, Schwarz</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 22: Kernholz-Arten & spezifische Dichten
    slides.append(f\'\'\'      <!-- SLIDE 22: Kernholz-Arten & Dichten -->
      <section class="slide" data-slide="22">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Kernholz-Arten</div>
            <h2 class="slide-title">Kernholz-Arten & Spezifische Gewichte</h2>
            <div class="slide-subtitle">Die Masse und Elastizität des Kernholzes bestimmen Anschlagsträgheit und Tonfarbe</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <table class="spec-table" style="width: 100%; margin-top: 6px;">
              <thead>
                <tr>
                  <th>Holzart</th>
                  <th>Härtegrad</th>
                  <th>Spezifisches Gewicht</th>
                  <th>Klangcharakteristik</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Weißbuche (Hornbeam)</strong></td>
                  <td>Hartholz</td>
                  <td><span class="mono-val">800 – 860 kg/m³</span></td>
                  <td>Maximaler Punch, kraftvoller Attack, extrem formstabil</td>
                </tr>
                <tr>
                  <td><strong>Bergahorn (Maple)</strong></td>
                  <td>Mittelfest</td>
                  <td><span class="mono-val">530 – 790 kg/m³</span></td>
                  <td>Brillant, transparent, differenzierter obertonreicher Ton</td>
                </tr>
                <tr>
                  <td><strong>Nussbaum (Walnut)</strong></td>
                  <td>Mittelfest</td>
                  <td><span class="mono-val">590 – 680 kg/m³</span></td>
                  <td>Warmer, samtiger Grundton, volles Bassfundament</td>
                </tr>
                <tr>
                  <td><strong>Mahagoni (Kotibé)</strong></td>
                  <td>Mittelfest / Leicht</td>
                  <td><span class="mono-val">490 – 750 kg/m³</span></td>
                  <td>Geringe Trägheit, singender Diskant, leichte Ansprache</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_12_2_Image217.jpg" alt="Kernholz-Arten Renner">
              <div class="media-caption">Original Kernhölzer: Weißbuche, Ahorn, Nussbaum und Mahagoni (Kotibé)</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 23: Kernholz-Profilformen
    slides.append(f\'\'\'      <!-- SLIDE 23: Kernholz-Profilformen -->
      <section class="slide" data-slide="23">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Kern-Geometrie</div>
            <h2 class="slide-title">Kernholz-Formen: Symmetrisch & Asymmetrisch</h2>
            <div class="slide-subtitle">Historische und moderne Fräsprofile für über 20 Flügel- und Klaviermarken</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 14px;">
              <div class="card-title">Symmetrische Standardformen</div>
              <div class="card-desc">Für Steinway & Sons (historisch und modern), Bösendorfer, Schimmel, C. Bechstein, Yamaha, Kawai, Grotrian-Steinweg, Petrof, August Förster, Sauter, Blüthner und Renner USA.</div>
            </div>
            <div class="feature-card">
              <div class="card-title">Asymmetrische Sonderformen</div>
              <div class="card-desc">Alt-Bechstein Konstruktionen, Flügel mit extrem schlankem Diskantverlauf sowie Spezialprofile zur Anpassung des Trägheitsmoments an steile Saitenwinkel.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_13_2_Image220.jpg" alt="Kernholz Profilformen">
              <div class="media-caption">Moulding Types: Vielfalt der Kernholz-Profile im Renner Sortiment</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 24: Vorformung & Filzkurven
    slides.append(f\'\'\'      <!-- SLIDE 24: Vorformung & Filzkurven -->
      <section class="slide" data-slide="24">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Vorformung</div>
            <h2 class="slide-title">Vorformung des Bassfilzes & Biegekurven</h2>
            <div class="slide-subtitle">Ausbildung der charakteristischen Spannungsbögen vor dem Schließen der Presse</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Elastische Vorbiegung:</strong> Das dicke Bass-Ende des Filzstreifens wird vor dem Einbringen in die Pressform vorkonditioniert.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Charakteristische Kurven:</strong> Entlang des Streifens bilden sich harmonische Wellen, die den späteren Druckfluss abbilden.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Gleichmäßige Dehnung:</strong> Verhindert das Reißen äußerer Faserlagen beim engen Umschließen der Kernholzspitze.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_15_2_Image229.jpg" alt="Vorformung Bassfilz">
              <div class="media-caption">Bass-Ende des Filzstreifens mit charakteristischen Biegekurven vor dem Pressen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 25: Press- und Verleimprozess – Zug- & Druckkräfte
    slides.append(f\'\'\'      <!-- SLIDE 25: Press- und Verleimprozess -->
      <section class="slide" data-slide="25">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Pressprozess</div>
            <h2 class="slide-title">Pressen & Verleimen: Zug- und Druckkräfte im Filz</h2>
            <div class="slide-subtitle">Nachspannen des Kernholzes zur Erzeugung maximaler elastischer Außenspannung</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Schließen der Seitenbacken:</strong> Die temperierten Pressbacken umschließen den Filz seitlich und führen ihn um das beleimte Kernholz.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Kernholz nachspannen:</strong> Nachdem die Seitenbacken geschlossen sind, wird das Kernholz nochmals mit Hochdruck nachgespannt.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Zugspannung in den Außenlagen:</strong> Durch diesen Renner-spezifischen Schritt erhalten die äußeren Filzlagen eine unerreichte Vorspannung.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Basis für die spätere Intonation:</strong> Diese elastische Eigenspannung erlaubt späteres Intonieren mit unvergleichlicher Dynamikspreizung.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image21.jpg">
                <source src="Visuell/Videos/04_hammerkopf_pressen_leimen.mp4" type="video/mp4">
              </video>
              <div class="media-caption">Press- und Verleimvorgang des Hammerkopfs unter Hochdruck</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 26: Der Hammerkopf-Riegel nach dem Pressen
    slides.append(f\'\'\'      <!-- SLIDE 26: Der Hammerkopf-Riegel nach dem Pressen -->
      <section class="slide" data-slide="26">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Hammerkopf-Riegel</div>
            <h2 class="slide-title">Der Hammerkopf-Riegel im Rohzustand</h2>
            <div class="slide-subtitle">Entformung des monolithischen 88er-Riegels nach dem Aushärten des Leims</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Nach dem kontrollierten Abkühlen und Abbinden des Leims wird der Hammerkopf als zusammenhängender Riegel entnommen.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Perfekte Leimfuge:</strong> Vollflächige Verbindung zwischen Holz, Unterfilz und Deckfilz ohne Lufteinschlüsse.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Harmonischer Übergang:</strong> Die Kernform zeichnet sich präzise unter dem komprimierten Filz ab.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Betriebsgeheimnis der Formgebung:</strong> Bestimmte nachgelagerte Warmformschritte unterliegen dem strengen Renner-Verfahrensschutz.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image24.jpeg" alt="Hammerkopf-Riegel roh">
              <div class="media-caption">Der verleimte Hammerkopf-Riegel direkt nach dem Entformen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 27: CNC-Bearbeitung des Hammerkopf-Riegels
    slides.append(f\'\'\'      <!-- SLIDE 27: CNC-Bearbeitung des Hammerkopf-Riegels -->
      <section class="slide" data-slide="27">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • CNC-Bearbeitung</div>
            <h2 class="slide-title">CNC-Bearbeitung & Abrichten des Riegels</h2>
            <div class="slide-subtitle">Mehrachsiges Fräsen der Flanken und Trennen in 88 Einzelexemplare</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>CNC-Abrichten der Leisten:</strong> Beseitigung von Leimaustritten und exaktes Ausfräsen der Außenradien.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Hochgeschwindigkeits-Fräsen:</strong> Spezialwerkzeuge schneiden den dichten Wollfilz mit rasiermesserscharfen Kanten ohne Faserausriss.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Präzises Auftrennen:</strong> Trennen des Riegels in exakt abgestimmte Breiten (Bass ca. 11,5 mm bis Diskant ca. 9,5–10 mm).</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image25.jpg" alt="CNC Bearbeitung Hammerkopf">
              <div class="media-caption">CNC-Präzisionsfräszentrum in Meuselwitz bei der Leistenbearbeitung</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 28: Bohren, T-Vernietung & Verrundung
    slides.append(f\'\'\'      <!-- SLIDE 28: Bohren, T-Vernietung & Verrundung -->
      <section class="slide" data-slide="28">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Bohren & Vernieten</div>
            <h2 class="slide-title">Bohrung, T-Vernietung & Veredelung</h2>
            <div class="slide-subtitle">Präzise Stielbohrung im Raumwinkel und formschlüssige Messing-T-Niete</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Automatisierte Stielbohrung:</strong> Bohren im exakten Raumwinkel (Bohrungslänge, Durchmesser ø 5,4 mm, Neigungswinkel in Gon).</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>T-Vernietung (Riveting):</strong> Hochfeste Messing-T-Nieten sichern die Filzschenkel dauerhaft gegen Aufplatzen bei stärksten Konzertanschlägen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Verrundung der Hammerschwänze:</strong> Speziell geformte Radien am Schwanz erleichtern später das Einpassen in den Fänger.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <video controls style="width: 100%; height: 100%; object-fit: cover;" poster="Visuell/basis_media/image29.png">
                <source src="Visuell/Videos/05_hammerkopf_bohren_nieten.mp4" type="video/mp4">
              </video>
              <div class="media-caption">Bohren und Einbringen der T-Nieten in Meuselwitz</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 29: Alle Vorteile der neuen Renner-Hammerköpfe
    slides.append(f\'\'\'      <!-- SLIDE 29: Vorteile der neuen Renner-Hammerköpfe -->
      <section class="slide" data-slide="29">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Qualität & Nutzen</div>
            <h2 class="slide-title">Die 6 Kernvorteile der neuen Renner-Hammerköpfe</h2>
            <div class="slide-subtitle">Zusammenfassung der Innovationskraft aus dem Vortrag von Clemens Kunert</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="card-grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div class="feature-card">
              <div class="card-icon">🎯</div>
              <div class="card-title">1. Maßgeschneiderte Fertigung</div>
              <div class="card-desc">Individuelle Sonderanfertigung von Einzelstücken für historische Schätze bis hin zu großen Konzert-Serien.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">⚡</div>
              <div class="card-title">2. Direkt fertig zur Endintonation</div>
              <div class="card-desc">Keine zeitraubende Vorintonation am Instrument mehr nötig! Der Satz ist ab Werk klanglich vorbereitet.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🔬</div>
              <div class="card-title">3. Höchste Fertigungspräzision</div>
              <div class="card-desc">Kombination aus traditionellem FFW-Filzhandwerk und mikrometergenauer Roboter- und CNC-Bearbeitung.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🏆</div>
              <div class="card-title">4. Überragende Klangstabilität</div>
              <div class="card-desc">Durch die Eigenspannung des Weickert-Special-Filzes bleibt das Klangbild über viele Jahre hinweg stabil.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🎶</div>
              <div class="card-title">5. Reiches Obertonspektrum</div>
              <div class="card-desc">Breiteste Dynamikspreizung vom zartesten Pianissimo bis zum tragfähigen Fortissimo im großen Konzertsaal.</div>
            </div>
            <div class="feature-card">
              <div class="card-icon">🛠️</div>
              <div class="card-title">6. Einbaufertig veredelt</div>
              <div class="card-desc">Präzise gebohrt, formschlüssig vernietet, mit verrundeten Schwanzenden und veredelter Scheitelkontur.</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 4: Slides 30-37
        f.write('''
    # =========================================================================
    # KAPITEL 4: DER RENNER MUSTERTEILEKOFFER & HAMMERSTIEL-AUSWAHL (30 - 37)
    # =========================================================================

    # SLIDE 30: Der Renner Musterteilekoffer
    slides.append(f\'\'\'      <!-- SLIDE 30: Der Renner Musterteilekoffer -->
      <section class="slide" data-slide="30">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Systemübersicht</div>
            <h2 class="slide-title">Der Renner Musterteilekoffer (MTK)</h2>
            <div class="slide-subtitle">Das unverzichtbare Diagnose- und Auswahlinstrument für die Reparaturwerkstatt</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Bei der Reparatur historischer oder moderner Flügel und Klaviere stehen Klavierbauer oft vor unbekannten Mechanikgeometrien. Der Renner Musterteilekoffer liefert für jede Aufgabenstellung das exakt passende Original-Musterteil.
            </p>
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Direkte Passprüfung:</strong> Musterteile können direkt im Kundeninstrument eingehängt und getestet werden.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Umfassendes Fachhandbuch:</strong> Ausführliche Tabellen mit Hebellängen, Winkeln und Kapselabständen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Vermeidung von Fehlbestellungen:</strong> Eindeutige Renner-Artikelnummern für reibungslose Nachbestellung.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_4_2_Image171.jpg" alt="Renner Musterteilekoffer">
              <div class="media-caption">Der Renner Musterteilekoffer mit beiliegendem technischem Fachhandbuch</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 31: Inhalt: Flügel-Hebeglieder
    slides.append(f\'\'\'      <!-- SLIDE 31: Inhalt: Flügel-Hebeglieder -->
      <section class="slide" data-slide="31">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Flügel-Hebeglieder</div>
            <h2 class="slide-title">15 Flügel-Hebeglieder & 12 Wechselsättel</h2>
            <div class="slide-subtitle">Lückenlose Abdeckung aller Hebelverhältnisse für Flügel aller Epochen</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>15 verschiedene Hebeglied-Varianten:</strong> Jeweils 2 Stück pro Modell als Testmuster im Koffer enthalten.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>2 Modelle ohne Sattel:</strong> Ermöglichen individuelle Anpassungen bei historischen Sonderkonstruktionen.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>12 kombinierbare Sättel:</strong> Unterschiedliche Sattelhöhen und Neigungen zur Feinabstimmung der Steighöhe.</span>
              </li>
              <li class="bullet-item">
                <span class="bullet-dot green"></span>
                <span><strong>Sofortige Lieferbarkeit:</strong> Alle 15 Hebeglied-Typen sind bei Renner ab Lager als kompletter Reparatursatz verfügbar.</span>
              </li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_3_2_Image161.jpg" alt="Flügel Hebeglieder Muster">
              <div class="media-caption">Auswahl der 15 Hebeglied-Modelle und Wechselsättel im Musterteilekoffer</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 32: Inhalt: Mechanikteile & Dämpfung
    slides.append(f\'\'\'      <!-- SLIDE 32: Inhalt: Mechanikteile & Dämpfung -->
      <section class="slide" data-slide="32">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Mechanikteile</div>
            <h2 class="slide-title">Mechanik-Kapseln, Dämpferarme & Leisten</h2>
            <div class="slide-subtitle">Präzisionsteile für Flügel und Klaviere nach europäischer und US-Norm</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>15 Flügel-Kapseln:</strong> Unterschiedlichste Befestigungsbohrungen, Drop-Schrauben-Positionen und Achshöhen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>10 Klavier-Kapseln:</strong> Für Hebeglieder und Dämpferarme moderner und älterer Klaviere.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Dämpferarme (US & Renner):</strong> Spezifische Kröpfungen und Längen für beide Normwelten.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Klinken & Mechanikleisten:</strong> Musterprofile aller originalen Renner-Messing- und Aluminiumleisten.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_6_2_Image184.jpg" alt="Mechanikteile Kapseln Dämpfer">
              <div class="media-caption">Original Kapseln, Dämpferarme und Leistenmuster im MTK</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 33: Inhalt: Klavier-Mechanikteile (UP Parts)
    slides.append(f\'\'\'      <!-- SLIDE 33: Inhalt: Klavier-Mechanikteile -->
      <section class="slide" data-slide="33">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Klavierteile</div>
            <h2 class="slide-title">Klavier-Mechanikteile für AP- & APK-Systeme</h2>
            <div class="slide-subtitle">Spezialteile für Hochklaviere, Verlängerungsabstrakten & Dämpferkörper</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Bass- & Diskantdämpfer:</strong> Unterschiedliche Filzkeile und Einzelfilze für stehende Klaviere.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Dämpferarme für AP & APK:</strong> Passgenaue Geometrien für Renner Standard-Klaviermechaniken.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Hebeglieder mit Verlängerungsabstrakten:</strong> Für ältere Bauformen mit tiefer liegendem Klaviaturtisch.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Hammernüsse:</strong> Diverse Ausführungen mit Kapsel und Rückholfeder.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_7_2_Image187.jpg" alt="Klavier-Mechanikteile">
              <div class="media-caption">Klavier-Mechanikkomponenten (AP / APK) im Musterteilekoffer</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 34: Inhalt: 16 Flügel-Hammerstiele mit Kapseln
    slides.append(f\'\'\'      <!-- SLIDE 34: Inhalt: Flügel-Hammerstiele -->
      <section class="slide" data-slide="34">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Hammerstiele</div>
            <h2 class="slide-title">16 Flügel-Hammerstiele mit Kapseln</h2>
            <div class="slide-subtitle">Vollständiges Reparatursortiment inklusive Spezial- und Patentstielen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>16 Standard-Hammerstiele mit Kapsel:</strong> Jeweils 2 Stück pro Modell als Testmuster im Koffer.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>3 Stiele ohne Kapsel:</strong> Für Selbstreparaturen und das Einsetzen in Originalkapseln.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Blüthner-Patentstiele:</strong> Originale Geometrien für historische Blüthner-Patentmechaniken.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Wiener Mechanik & Klemmschläuche:</strong> Spezialteile zur fachgerechten Restauration historischer Wiener Flügel.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_8_2_Image190.jpg" alt="Flügel-Hammerstiele">
              <div class="media-caption">16 originale Flügel-Hammerstiele mit montierten Kapseln im MTK</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 35: Auswahlkriterium: Die 16 Kapseltypen
    slides.append(f\'\'\'      <!-- SLIDE 35: Die 16 Kapseltypen -->
      <section class="slide" data-slide="35">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Kapsel-Selektion</div>
            <h2 class="slide-title">Die 16 Kapselvarianten für alle Flügelmodelle</h2>
            <div class="slide-subtitle">Exakte Zuordnung von Schraubenbohrung, Langloch und Abfallschraubenposition</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="card-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Renner Standard</div><div class="card-desc">Europäische Norm</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Renner mit Tellerfedern</div><div class="card-desc">Sicherer Halt</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Renner ungebohrt</div><div class="card-desc">Für Sonderbohrung</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Modifizierte Drop-Schraube</div><div class="card-desc">Versetzt</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Versetzte Schraubenbohrung</div><div class="card-desc">Sonderabstand</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Mason & Hamlin (M&H)</div><div class="card-desc">Langloch + Scheiben</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Kawai Kapsel</div><div class="card-desc">Japanische Passung</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Yamaha neu / alt</div><div class="card-desc">C- / CFX-Serie</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Baldwin neu / alt</div><div class="card-desc">US-Standard</div></div>
              <div class="feature-card" style="padding: 12px;"><div class="card-title" style="font-size: 0.95rem;">• Pratt-Read / Flemming</div><div class="card-desc">Klassische Flügel</div></div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_10_2_Image203.jpg" alt="16 Kapseltypen Renner">
              <div class="media-caption">Kapselübersicht: 16 herstellerspezifische Kapsel-Geometrien</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 36: Auswahlkriterien: Röllchen, Holz & Dimensionen
    slides.append(f\'\'\'      <!-- SLIDE 36: Röllchen, Holz & Dimensionen -->
      <section class="slide" data-slide="36">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Stiel-Parameter</div>
            <h2 class="slide-title">Röllchenabstand, Stielstärke & Satz-Zusammenstellung</h2>
            <div class="slide-subtitle">Die 7 entscheidenden Auswahlkriterien für den perfekten Hammerstiel</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Kapseltyp:</strong> 16 verschiedene Kapseltypen für Reparaturen lieferbar.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Holzart:</strong> Weißbuche (hohe Steifigkeit) oder Bergahorn (elastisch-transparent).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Röllchenabstand:</strong> 17 mm (Renner Standard) oder 15,5 mm (z. B. Steinway-Geometrie).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Röllchendurchmesser:</strong> 10 mm Standard oder 9 mm Spezialdurchmesser (Breite 11,7 mm) sowie 10 mm (Breite 11,2 mm).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Stieldurchmesser:</strong> Bass = 6,0 mm, Mittellage = 5,3 mm, Diskant = 4,8 mm.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Satz-Aufteilung:</strong> 70 Bass/20 Diskant oder 60|10|20, 50|20|20, 75|25, 90, 100 Stück.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_11_2_Image207.jpg" alt="Röllchen und Stieldimensionen">
              <div class="media-caption">Röllchenpositionen und Stieldurchmesser nach Renner-Spezifikation</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 37: Hammerstiel-Produktion & Baugruppen-Lagerung
    slides.append(f\'\'\'      <!-- SLIDE 37: Hammerstiel-Produktion & Lagerung -->
      <section class="slide" data-slide="37">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Fertigungsprozess</div>
            <h2 class="slide-title">Automatisierte Montage & 5 Tage Reifung</h2>
            <div class="slide-subtitle">Strikter Qualitätsablauf: Vom Kamerasystem zur vorgeschriebenen Baugruppenruhe</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Automatisierte Kapselmontage</div>
              <div class="card-desc">Vollautomatische Montagestraße setzt Achsen, Kapseltuch und Schrauben mit digitaler Drehmomentüberwachung.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Optisches Kamerasystem</div>
              <div class="card-desc">Jedes Röllchen und jede Kapselachse wird optisch vermessen. Abweichungen im Zehntelmillimeter-Bereich werden sofort ausgeschleust.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">5-tägige Ruhephase (Setzprozess)</div>
              <div class="card-desc">Alle montierten Hammerstiele lagern zwingend 5 Tage im klimatisierten Baugruppenlager. Dieser Schritt ist fester Bestandteil des Wertstroms und darf nicht unterschritten werden!</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HSt/page_18_2_Image235.jpg" alt="Baugruppenlager Meuselwitz">
              <div class="media-caption">5 Tage Baugruppenruhe: Spannungsabbau vor der manuellen Endkontrolle</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 5: Slides 38-44
        f.write('''
    # =========================================================================
    # KAPITEL 5: WERKSTATTPRAXIS – MASSBLÄTTER, GEOMETRIE & BOHRWINKEL (38 - 44)
    # =========================================================================

    # SLIDE 38: Das Renner Hammerkopf-Maßblatt
    slides.append(f\'\'\'      <!-- SLIDE 38: Das Renner Hammerkopf-Maßblatt -->
      <section class="slide" data-slide="38">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Erfassungsbogen</div>
            <h2 class="slide-title">Das Renner Hammerkopf-Maßblatt (Flügel & Klavier)</h2>
            <div class="slide-subtitle">Vollständige Erfassung aller Geometriedaten für einbaufertige Hämmer</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Basisdaten des Instruments:</strong> Hersteller, Seriennummer, Modell, Baujahr (z. B. Steinway & Sons M 170 #535100 von 1996).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Oft genügen Basisdaten:</strong> Bei renommierten Marken reichen diese Angaben bereits aus, damit Renner einen exakt passenden, gebohrten Satz liefert.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Präzise Einzelmaße:</strong> Bei unbekannten oder modifizierten Flügeln werden Gesamtlänge, Bohrungslänge, Stärke und Winkel erfasst.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_23_2_Image265.png" alt="Renner Maßblatt">
              <div class="media-caption">Original Renner Hammerkopf-Maßblatt für Flügel und Klaviere</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 39: Das Renner Reparaturprogramm für Weltmarken
    slides.append(f\'\'\'      <!-- SLIDE 39: Das Renner Reparaturprogramm -->
      <section class="slide" data-slide="39">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Datenbank</div>
            <h2 class="slide-title">Werksspezifikationen für alle Weltmarken</h2>
            <div class="slide-subtitle">Hunderte vorgebohrte Standard-Reparatursätze sofort lieferbar</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Renner verfügt über das weltweit umfangreichste Archiv an Original-Bohrungsdaten für fast alle Qualitätsklaviere und -flügel:
            </p>
            <div class="card-grid" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Steinway & Sons</div><div class="card-desc">Alle Modelle & Epochen</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• C. Bechstein</div><div class="card-desc">Historisch & modern</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Bösendorfer</div><div class="card-desc">Sämtliche Längen</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Julius Blüthner</div><div class="card-desc">Patent & Standard</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Wilhelm Schimmel</div><div class="card-desc">Flügel & Pianos</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Steingraeber & Söhne</div><div class="card-desc">Konzertspezifikation</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• August Förster</div><div class="card-desc">Traditionsmaße</div></div>
              <div class="feature-card" style="padding: 10px;"><div class="card-title" style="font-size: 0.95rem;">• Yamaha & Kawai</div><div class="card-desc">C- / RX- / GX-Serie</div></div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_24_2_Image269.png" alt="Renner Reparaturprogramm">
              <div class="media-caption">Archivierte Renner Standard-Datensätze für weltweite Reparaturen</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 40: Standardmaße & Bohrungslänge
    slides.append(f\'\'\'      <!-- SLIDE 40: Standardmaße & Bohrungslänge -->
      <section class="slide" data-slide="40">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Standardparameter</div>
            <h2 class="slide-title">Bohrungslänge = Gesamtlänge - 24 mm</h2>
            <div class="slide-subtitle">Die universelle Faustformel für Flügelhammerköpfe im Renner-Standard</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <table class="spec-table" style="width: 100%; margin-top: 8px;">
              <thead>
                <tr><th>Parameter</th><th>Renner Standard (Flügel)</th><th>Bedeutung</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Bohrungslänge</strong></td><td><span class="mono-val">Gesamtlänge minus 24 mm</span></td><td>Exakte Einstecktiefe des Stiels</td></tr>
                <tr><td><strong>Bohrungsdurchmesser</strong></td><td><span class="mono-val">ø 5,4 mm</span></td><td>Passend für Renner Konusstiele</td></tr>
                <tr><td><strong>Hammer-zu-Stiel-Winkel</strong></td><td><span class="mono-val">90°</span></td><td>Rechtwinkligkeit zur Saitenebene</td></tr>
                <tr><td><strong>Rake-Winkel</strong></td><td><span class="mono-val">91° (mit Lehre)</span></td><td>Leichte Vorneigung beim Einleimen</td></tr>
              </tbody>
            </table>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_27_2_Image284.jpg" alt="Standardmaße Bohrung">
              <div class="media-caption">Standardmaße der Flügelhammerkopf-Bohrung nach Renner-Norm</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 41: Bohrwinkel in Gon (100er-Teilung)
    slides.append(f\'\'\'      <!-- SLIDE 41: Bohrwinkel in Gon -->
      <section class="slide" data-slide="41">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Gon-Winkel</div>
            <h2 class="slide-title">Bohrwinkel in Gon (100er-Teilung des 90°-Winkels)</h2>
            <div class="slide-subtitle">Warum Renner Bohrwinkel traditionell in Gon statt in Grad angibt</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>100 Gon = 90° rechter Winkel:</strong> Gon ermöglicht feinere, zehntelgrad-genaue Teilungen ohne Bruchminuten.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Normalwerte Klavier (UP):</strong> Bass 30 Gon – 0 Gon | Diskant 125 Gon – 0 Gon.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Normalwerte Flügel (GP):</strong> Bass 25 Gon – 0 Gon | Diskant 125 Gon – 0 Gon.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Staffelung nach Chören:</strong> Noten 1–26 (10 Gon), 27–30 (110 Gon), 31–33 (109 Gon) bis Noten 55–88 (101 Gon).</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_28_2_Image291.jpg" alt="Bohrwinkel in Gon">
              <div class="media-caption">Bohrwinkeltabelle in Gon über die verschiedenen Register</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 42: Das Prinzip des Stielwinkels (90° & 3 mm Überhang)
    slides.append(f\'\'\'      <!-- SLIDE 42: Das Prinzip des Stielwinkels -->
      <section class="slide" data-slide="42">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Stielwinkel-Physik</div>
            <h2 class="slide-title">90°-Stielwinkel & 3 mm Überhang: Physik des Tons</h2>
            <div class="slide-subtitle">Warum übermäßige Abschliffe alter Hämmer den Saitenbruch provozieren</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Rechtwinkliger Anschlag:</strong> Der Hammer muss im Moment des Saitenkontakts exakt im 90°-Winkel auf die Saite treffen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>3 mm Stielüberhang:</strong> Der Stiel muss ca. 3 mm Überhang haben. Durch die Massenträgheit wird die kinetische Energie gezielt in Richtung Steg geleitet!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Gefahr bei &lt; 90°:</strong> Wird ein alter Hammer zu oft geschliffen (Kopf wird kürzer), sinkt der Winkel unter 90°. Der Hammer verkeilt sich in Richtung Agraffe -> Saite reißt, Klang wird stumpf!</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_31_1_Image169.png" alt="Prinzip Stielwinkel">
              <div class="media-caption">Geometrie des Hammerstielwinkels und Kraftvektor zum Steg</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 43: Exakte Berechnung der Bohrungslänge ohne Muster
    slides.append(f\'\'\'      <!-- SLIDE 43: Berechnung der Bohrungslänge -->
      <section class="slide" data-slide="43">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Längenberechnung</div>
            <h2 class="slide-title">Berechnung der Bohrungslänge ohne Muster</h2>
            <div class="slide-subtitle">Die bewährte 4-Schritte-Methode der Renner Academy</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px; border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Die 4-Schritte-Berechnungsformel:</div>
              <ol style="margin-left: 20px; line-height: 1.8; color: var(--text-primary); margin-top: 8px;">
                <li><strong>(1.)</strong> Abstand von der Saitenebene zum Klaviaturtisch messen.</li>
                <li><strong>(2.)</strong> Abstand von der Hammerstielachse (Kapselmittelpunkt) zum Klaviaturtisch messen.</li>
                <li><strong>=</strong> Differenz aus Wert (1.) minus Wert (2.) bilden.</li>
                <li><strong>- (3.)</strong> 3 mm abziehen (für den Stielüberhang beim Saitenanschlag).</li>
                <li><strong>= (4.) Exakte rechnerische Bohrungslänge!</strong></li>
              </ol>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_32_3_Image312.png" alt="Berechnung Bohrungslänge">
              <div class="media-caption">Messschema zur Ermittlung der Bohrungslänge im Flügel</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 44: Flügel- & Klavier-Maßblätter im Detail
    slides.append(f\'\'\'      <!-- SLIDE 44: Maßblätter im Detail -->
      <section class="slide" data-slide="44">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Dokumentation</div>
            <h2 class="slide-title">Flügel- & Klavier-Maßblätter im Vergleich</h2>
            <div class="slide-subtitle">Schritt-für-Schritt Ausfüllhilfe für Großreparaturen und Neubauten</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 14px;">
              <div class="card-title">Grand Piano (GP) Formular</div>
              <div class="card-desc">Fokus auf Gesamtlänge, Bohrungslänge, Stielachse, Steigungswinkel und Rake-Winkel (91° Lehre). Speziell für Flach- und Konzertflügel.</div>
            </div>
            <div class="feature-card">
              <div class="card-title">Upright Piano (UP) Formular</div>
              <div class="card-desc">Erfassung von Nussbohrung, Nusskapsel, Hammerlänge ab Achse und Steigungswinkel für Pianinos und Konzertklaviere.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/HK/page_33_2_Image316.jpg" alt="Flügel Maßblatt Formular">
              <div class="media-caption">Ausfüllfertiges GP-Maßblatt der Renner Academy</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 6: Slides 45-57
        f.write('''
    # =========================================================================
    # KAPITEL 6: WERKSTATTPRAXIS – MONTAGE & VERLEIMEN DER HAMMERKÖPFE (45 - 57)
    # =========================================================================

    # SLIDE 45: Vormontage der Stiele auf der Mechanikleiste
    slides.append(f\'\'\'      <!-- SLIDE 45: Vormontage der Stiele -->
      <section class="slide" data-slide="45">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 1: Stielmontage</div>
            <h2 class="slide-title">Vormontage der Hammerstiele & Spezialschrauben</h2>
            <div class="slide-subtitle">Renner Kapselschrauben 4,5x22 mm mit Tellerfedern und Kapselabstandhalter</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Vormontage in Feldern:</strong> Stiele nach Registerverteilung aufstecken; 1–2 Positionen zwischen Feldern frei lassen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Gewindegang finden:</strong> Bei gebrauchten Leisten Schraube zuerst leicht nach links drehen, bis sie spürbar in den alten Gewindegang einrastet.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Renner Flanschschraube (Art. 43-0008745):</strong> 4,5x22 mm mit Tellerfeder-Scheibe und kombiniertem Schlitz/Kreuzschlitz.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Werkzeuge:</strong> PZD 2 Ballengriff-Schraubendreher (Art. 43-0008316) und Kapselabstandhalter (Art. 43-0003286).</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_3_2_Image161.jpg" alt="Vormontage Hammerstiele">
              <div class="media-caption">Vormontage der Hammerstiele auf der Mechanikleiste im Werkstattbock</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 46: Frequenzprüfung der Stiele (Klangprobe)
    slides.append(f\'\'\'      <!-- SLIDE 46: Frequenzprüfung der Stiele -->
      <section class="slide" data-slide="46">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 2: Frequenzabgleich</div>
            <h2 class="slide-title">Frequenzprüfung & Akustische Sortierung</h2>
            <div class="slide-subtitle">Abklopfen der montierten Stiele: Tiefer Ton im Bass, hohe Resonanz im Diskant</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Bevor die Schrauben endgültig angezogen werden, erfolgt die akustische Frequenzkontrolle jedes einzelnen Hammerstiels:
            </p>
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Klangprobe durch Antippen:</strong> Jeder Stiel wird sanft angeklopft und seine Eigenresonanz belauscht.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Harmonischer Tonverlauf:</strong> Stiele mit tieferer Resonanzfrequenz gehören in den Bass, mittlere in die Mittellage, helle hohe Resonanzen in den Diskant.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Homogenes Spielgefühl:</strong> Diese akustische Sortierung verhindert Klangausreißer und ungleiche Energieübertragung.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_4_2_Image173.jpg" alt="Frequenzprüfung Stiele">
              <div class="media-caption">Frequenzprüfung der Stiele vor dem festen Verschrauben</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 47: Ausrichten & Traveling der Hammerstiele
    slides.append(f\'\'\'      <!-- SLIDE 47: Traveling der Hammerstiele -->
      <section class="slide" data-slide="47">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 3: Traveling</div>
            <h2 class="slide-title">Traveling: Gerader Stiellauf mit blauem Papier</h2>
            <div class="slide-subtitle">Blaues einseitig klebendes Traveling-Papier 0,2 mm und Winkelfilzmesser</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>90°-Ausrichtung der Randstiele:</strong> Zuerst den ersten und letzten Stiel jedes Feldes rechtwinklig zur Leiste einrichten.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Traveling-Korrektur:</strong> Schief laufende Kapseln werden mit blauem, 0,2 mm dickem Klebepapier (Art. 43-0005975) unterfüttert.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Winkelfilzmesser (Art. 43-0003252):</strong> Ermöglicht das saubere Unterschieben und Schneiden der Papierstreifen unter der Kapselsohle.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Feldverschiebung:</strong> Ganze Felder können bei älteren Flügeln gezielt nach links oder rechts korrigiert werden.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_5_2_Image179.jpg" alt="Traveling Hammerstiele">
              <div class="media-caption">Traveling der Hammerstiele mit blauem 0,2-mm-Klebepapier</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 48: Auspacken, Sortieren & Neunummerieren
    slides.append(f\'\'\'      <!-- SLIDE 48: Auspacken & Neunummerieren -->
      <section class="slide" data-slide="48">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 4: Vorbereitung</div>
            <h2 class="slide-title">Zwingende Neunummerierung vor dem Verleimen</h2>
            <div class="slide-subtitle">Warum die Tastennummern vor Beginn mit Bleistift neu aufgetragen werden müssen</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Jeder Renner-Hammerkopfsatz wird im Werk exakt gezählt, sortiert und ab Werk signiert. Dennoch gilt ein eiserner Grundsatz:
            </p>
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Überzählige Hämmer aussortieren:</strong> Satz auf das Arbeitsbrett legen und Reservehämmer separieren.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Gefahr des Nummernverlusts:</strong> Durch das Verjüngen der Hammerkerne (schmaler als Schnittbreite) werden Werkssignaturen oft weggeschliffen!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Neunummerierung mit Bleistift:</strong> Alle 88 Hammerköpfe müssen vor dem Verleimen auf der Unterseite mit ihrer Tastennummer beschriftet werden.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_8_2_Image191.jpg" alt="Neunummerieren der Hammerköpfe">
              <div class="media-caption">Kontrolle, Sortierung und manuelle Neunummerierung der Hammerköpfe</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 49: Musterhämmer setzen & Konisches Aufreiben
    slides.append(f\'\'\'      <!-- SLIDE 49: Musterhämmer & Konisches Aufreiben -->
      <section class="slide" data-slide="49">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 5: Aufreiben</div>
            <h2 class="slide-title">Musterhämmer & Handreibahle ø 5,0 mm (Konus 1:50)</h2>
            <div class="slide-subtitle">Setzen der Referenzhämmer und Vorbereitung der konischen Bohrung</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Referenzhämmer setzen:</strong> Zuerst den ersten und letzten Hammer jedes Teilfeldes als Orientierungsmuster aufstecken.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Handreibahle (Art. 43-0003409):</strong> Reibahle ø 5,0 mm mit exaktem Konusmaß 1:50, Schneidrichtung stets im Uhrzeigersinn!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Konisches Aufweiten:</strong> Die zylindrische Werksbohrung wird exakt auf die Konizität des Hammerstiels erweitert.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Spannung kontrollieren:</strong> Der Hammer muss sich ohne Klebstoff bereits fest und wackelfrei aufreiben lassen.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_10_2_Image200.jpg" alt="Handreibahle konisch">
              <div class="media-caption">Handreibahle ø 5,0 mm (1:50) beim konischen Reiben der Bohrung</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 50: Das Prinzip: Konischer Stiel & Konische Bohrung
    slides.append(f\'\'\'      <!-- SLIDE 50: Das Konus-Prinzip -->
      <section class="slide" data-slide="50">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 6: Konus-Prinzip</div>
            <h2 class="slide-title">Konischer Stiel & Konische Bohrung: Die Physik</h2>
            <div class="slide-subtitle">Warum zylindrische Bohrungen versagen und Konizität unzerstörbar hält</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px; border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Der Konus-Vorteil:</div>
              <ul class="bullet-list" style="margin-top: 8px;">
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Kein Leimabstreifen:</strong> Bei zylindrischen Stielen wird der Leim beim Aufschieben nach außen geschoben – die Leimfuge verhungert.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Gleichmäßiger Leimfilm:</strong> Beim Konus berühren sich Holz und Bohrung erst auf den letzten Millimetern.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Holzquellung als Keilverschluss:</strong> Durch das Wasser im Leim quillt das Holz in der Bohrung auf und arretiert den Stiel unlösbar.</span></li>
              </ul>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_12_2_Image210.png" alt="Konischer Stiel und Bohrung">
              <div class="media-caption">Schnittzeichnung: Konischer Stiel verkeilt in konischer Reibungsbohrung</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 51: Prüfen des Rake-Winkels (91°)
    slides.append(f\'\'\'      <!-- SLIDE 51: Prüfen des Rake-Winkels -->
      <section class="slide" data-slide="51">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 7: Rake-Winkel</div>
            <h2 class="slide-title">91°-Rake-Winkel mit der Winkellehre</h2>
            <div class="slide-subtitle">Präzise Neigungsmessung während des Aufsteckens und Verleimens</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Flügel-Hammerkopfwinkel-Lehre (Art. 43-0005650):</strong> Speziell kalibrierte 91°-Lehre für die Flügelmechanik.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Warum 91°?</strong> Die minimale 1°-Neigung gleicht die spätere Stieldurchbiegung unter Anschlagslast exakt aus.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Kontrolle der Referenzhämmer:</strong> Erster und letzter Hammer jedes Feldes werden auf die 91°-Lehre justiert.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_13_2_Image214.jpg" alt="Rake-Winkellehre 91 Grad">
              <div class="media-caption">Messung mit der originalen Renner Flügel-Hammerkopfwinkel-Lehre 91°</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 52: Leimauswahl: Heiß- vs. Kaltleim
    slides.append(f\'\'\'      <!-- SLIDE 52: Leimauswahl -->
      <section class="slide" data-slide="52">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 8: Leimauswahl</div>
            <h2 class="slide-title">Heißer Knochenleim vs. Hartholz-PVA-Leim</h2>
            <div class="slide-subtitle">Warmleimbecken, Perlleim, Hasenleim oder moderner D3-Weißleim</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Heißleim (Traditionelle Wahl)</div>
              <div class="card-desc">Elektrisches Warmleimbecken 0,2 l (Art. 43-0003248), Perlleim braun (Art. 43-0001162) oder Hasenleim-Granulat (Art. 43-0004644). Extrem glasartige, resonanzstarke Fuge; reversibel.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">PVA-Kaltleim (Moderne Wahl)</div>
              <div class="card-desc">Spezial-Weißleim für Hartholz (Art. 43-0007262). Längere offene Zeit, hochelastische Fuge.</div>
            </div>
            <div class="feature-card">
              <div class="card-title" style="color: var(--gold-accent);">Konsistenz-Regel:</div>
              <div class="card-desc">Die Leimviskosität muss exakt der von flüssigem Bienenhonig entsprechen!</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_17_5_Image239.png" alt="Leimauswahl Werkstatt">
              <div class="media-caption">Elektrischer Leimtopf, Perlleim und Spezial-PVA für Hartholz</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 53: Leimauftrag & Drehverleimung
    slides.append(f\'\'\'      <!-- SLIDE 53: Drehverleimung -->
      <section class="slide" data-slide="53">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 9: Verleimen</div>
            <h2 class="slide-title">Drehverleimung für lückenlose Leimringe</h2>
            <div class="slide-subtitle">Aufschieben mit Rotation und optische Fluchtkontrolle in 3er-Gruppen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Doppelter Leimauftrag:</strong> Dünner Leimfilm auf den Stiel und tropffrei in die Bohrung.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Rotierende Bewegung:</strong> Beim Aufschieben wird der Hammerkopf um ca. 90° hin und her gedreht -> garantiert einen geschlossenen Leimring.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>3er-Gruppen-Prinzip:</strong> 3 Hämmer leimen und sofort den Durchgang des mittleren zur Referenzlinie peilen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Fluchtkontrolle:</strong> Fluchtlinie von Vorderfilz, Rückfilz und Hammerschwänzen mit dem Auge kontrollieren.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_15_2_Image223.jpg" alt="Drehverleimung Hammerkopf">
              <div class="media-caption">Drehendes Aufsetzen des Hammerkopfs zur Ausbildung gleichmäßiger Leimringe</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 54: Leimfuge verputzen & Säubern
    slides.append(f\'\'\'      <!-- SLIDE 54: Leimfuge verputzen -->
      <section class="slide" data-slide="54">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 10: Leimringe</div>
            <h2 class="slide-title">Leimfuge verputzen: Der Gummibärchen-Zustand</h2>
            <div class="slide-subtitle">Warmwasserpinsel bei Heißleim – Sauberes Abstechen nach ca. 1 Stunde</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Heißwasserpinsel:</strong> Direkt nach dem Aufsetzen wird die Fuge mit heißem Wasser (oder verdünntem „Leimwasser“ bei PVA) geglättet.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>1 Stunde Reifezeit:</strong> Nach ca. 60 Minuten erreicht der austretende Leimring die Konsistenz von Weinflaschengummi („Gummibärchen“).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Sauberes Abstechen:</strong> In diesem elastischen Zustand lässt sich der Ring mit einem scharfen Schnitzmesser rückstandslos abtrennen, ohne das Holz einzukerben.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_20_2_Image259.jpg" alt="Leimfuge verputzen">
              <div class="media-caption">Sauberes Verputzen des Leimrings nach 1 Stunde Trocknungszeit</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 55: Spannen der Schwänze & Stiele absägen
    slides.append(f\'\'\'      <!-- SLIDE 55: Klemmschere & Japansäge -->
      <section class="slide" data-slide="55">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 11: Absägen</div>
            <h2 class="slide-title">Klemmschere & Kappen mit der Japansäge</h2>
            <div class="slide-subtitle">Absoluter Achsenschutz durch die Renner Spezialklemme (Art. 43-0003233)</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Gefahr für die Kapselachse:</strong> Sägekräfte und Schleifdruck dürfen unter keinen Umständen auf die filigrane Kapselachse wirken!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Klemmschere für Flügelstiele (Art. 43-0003233):</strong> Blockiert den Stiel direkt hinter dem Kopf und leitet alle Kräfte direkt in die Klemme ab.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Schnitt mit der Japansäge:</strong> Feinzahnige Japansäge trennt den überstehenden Stielzapfen bündig am Holzkern ab.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_22_2_Image268.jpg" alt="Klemmschere und Japansäge">
              <div class="media-caption">Einsatz der Klemmschere zum Achsenschutz beim Kappen des Stielendes</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 56: Schwanzformung (Sanding & Forming)
    slides.append(f\'\'\'      <!-- SLIDE 56: Schwanzformung -->
      <section class="slide" data-slide="56">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 12: Schwanzform</div>
            <h2 class="slide-title">Schwanzformung: Weder zu rund noch zu flach</h2>
            <div class="slide-subtitle">Schleifklotz Körnung 40 für sicheres Fangen ohne Klemmen oder Aufspringen</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Schritt 1: Überstand beischleifen</div>
              <div class="card-desc">Mit Schleifklotz Körnung 40 wird der Sägegrat plan zur Schräge des Holzkerns geschliffen.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Schritt 2: Flanke gleichmäßig ausformen</div>
              <div class="card-desc">Gleichmäßige Schwanzschräge formen. <strong>Wichtig:</strong> Zu rund geschliffen -> Hammer springt aus dem Fänger! Zu flach geschliffen -> Hammer hakt sich beim Auslösen ein!</div>
            </div>
            <div class="feature-card">
              <div class="card-title">Schritt 3: Griffige Fänger-Reibung</div>
              <div class="card-desc">Die 40er-Körnung hinterlässt eine feine Holzstruktur, die optimal mit dem Fängerleder harmoniert.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_24_2_Image280.jpg" alt="Schwanzformung">
              <div class="media-caption">Präzises Ausformen der Hammerschwänze für optimalen Fängerfang</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 57: Finish, Kantenbrechen & Flammenkorrektur
    slides.append(f\'\'\'      <!-- SLIDE 57: Finish & Kosmetik -->
      <section class="slide" data-slide="57">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 6: Montage & Verleimen • Schritt 13: Endfinish</div>
            <h2 class="slide-title">Kantenbrechen & Flammenkorrektur der Flucht</h2>
            <div class="slide-subtitle">Feine Schleifpapierfeile, Entgraten und Ausrichten mit der Brennerlampe</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Kanten brechen:</strong> Scharfe Holzkanten an den Schwanzseiten werden mit feiner Schleiffeile sanft verbrochen.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Flammenkorrektur an der Brennerlampe:</strong> Kleinste Flucht- oder Neigungsfehler werden durch gezielte, sanfte Erwärmung des Stiels korrigiert.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Einbaufertiger Zustand:</strong> Der Satz ist nun mechanisch perfekt montiert, gefluchtet und bereit für die Regulierung im Instrument.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/EN/page_26_2_Image293.jpg" alt="Kosmetik und Endfinish">
              <div class="media-caption">Endfinish: Kantenbrechen und Fluchtprüfung an der Brennerlampe</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')
''')

        # Generate CHAPTER 7: Slides 58-68
        f.write('''
    # =========================================================================
    # KAPITEL 7: DIE HOHE SCHULE DER INTONATION (RENNER MASTER VOICING) (58 - 68)
    # =========================================================================

    # SLIDE 58: Philosophie der Intonation
    slides.append(f\'\'\'      <!-- SLIDE 58: Philosophie der Intonation -->
      <section class="slide" data-slide="58">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Klangphilosophie</div>
            <h2 class="slide-title">Die Philosophie der Renner Intonation</h2>
            <div class="slide-subtitle">Klangschönheit, größtmögliche Dynamik und das breiteste Teilspektrum</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 14px; border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Die 3 Kernziele wahrer Intonation:</div>
              <ul class="bullet-list" style="margin-top: 8px;">
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>1. Volle Klangschönheit:</strong> Die klanglichen Eigenheiten des spezifischen Flügels auf das höchste Niveau bringen.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>2. Maximale Dynamikstufen:</strong> Alle Töne müssen so viele dynamische Abstufungen wie möglich bieten – von pp bis ff.</span></li>
                <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>3. Breites Teilspektrum:</strong> Reicher Obertongehalt für tragfähigen Ton („Sustain“) im Raum.</span></li>
              </ul>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_10_2_Image210.jpg" alt="Intonationsphilosophie">
              <div class="media-caption">Das Ziel meisterlicher Intonation: Offene Klangdynamik und Gesangston</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 59: Unveränderliche vs. Beeinflussbare Faktoren
    slides.append(f\'\'\'      <!-- SLIDE 59: Einflussgrößen -->
      <section class="slide" data-slide="59">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Einflussgrößen</div>
            <h2 class="slide-title">Herausforderungen: Unveränderlich vs. Beeinflussbar</h2>
            <div class="slide-subtitle">Konstruktion und Raumakustik verstehen – Mechanik und Filz beherrschen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <div class="card-grid" style="grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="feature-card">
                <div class="card-title" style="color: var(--text-muted);">Unveränderliche Faktoren</div>
                <ul class="bullet-list" style="margin-top: 8px;">
                  <li class="bullet-item"><span class="bullet-dot"></span><span><strong>Konstruktion:</strong> Mensur, Gussplatte, Resonanzbodenholz</span></li>
                  <li class="bullet-item"><span class="bullet-dot"></span><span><strong>Raumakustik:</strong> Großer Saal, Studio, Wohnraum, Schule</span></li>
                  <li class="bullet-item"><span class="bullet-dot"></span><span><strong>Pianist:</strong> Individueller Anschlag und Geschmack</span></li>
                </ul>
              </div>
              <div class="feature-card" style="border-color: var(--border-green);">
                <div class="card-title" style="color: var(--renner-green-bright);">Was wir beeinflussen können:</div>
                <ul class="bullet-list" style="margin-top: 8px;">
                  <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Renner Hammerköpfe & Filze:</strong> Perfekte Basis</span></li>
                  <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Renner Mechanikteile:</strong> Präzise Hebelwege</span></li>
                  <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Saitenlagerung:</strong> Fester Sitz an Stegen und Stiften</span></li>
                  <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Feinregulierung & Stimmung:</strong> Perfektes Fundament</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image8.jpeg" alt="Raum und Instrument">
              <div class="media-caption">Der Flügel im Konzertsaal: Raumakustik und Instrument im Einklang</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 60: Regulierung & Stimmung als Grundvoraussetzung
    slides.append(f\'\'\'      <!-- SLIDE 60: Regulierung & Stimmung -->
      <section class="slide" data-slide="60">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Voraussetzungen</div>
            <h2 class="slide-title">Keine Intonation ohne makellose Regulierung!</h2>
            <div class="slide-subtitle">Der goldene Grundsatz von Jens-Sören Kruse (Klavierbaumeister)</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 14px; border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Der unabdingbare Kreislauf:</div>
              <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); margin-top: 8px;">
                „Ohne gute Regulierung keine saubere Stimmung,<br>
                und ohne gute Regulierung keine saubere Intonation,<br>
                und ohne saubere Stimmung keine saubere Intonation.<br>
                <em>Eines führt zum anderen, und alles ist mit allem verbunden!</em>“
              </p>
            </div>
            <p class="slide-intro-p">
              Wer versucht, ungleichmäßigen Ton durch Nadeln auszugleichen, wenn in Wahrheit Auslösung, Steighöhe oder Saitenchor ungleich sind, zerstört den Hammerkopf!
            </p>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image11.jpeg" alt="Regulierung und Feineinstellung">
              <div class="media-caption">Präzisionsregulierung der Flügelmechanik vor Beginn der Intonierarbeiten</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 61: Das Uhren-Modell & Die 4 dynamischen Keile
    slides.append(f\'\'\'      <!-- SLIDE 61: Das Uhren-Modell -->
      <section class="slide" data-slide="61">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Geometrie & Keile</div>
            <h2 class="slide-title">Das Uhren-Modell: Die 4 dynamischen Keile</h2>
            <div class="slide-subtitle">Strukturierte Aufteilung des Hammerkopfs nach Register- und Lautstärkezielen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <table class="spec-table" style="width: 100%; margin-top: 4px;">
              <thead>
                <tr><th>Keil-Zone</th><th>Uhrzeit</th><th>Dynamik & Funktion</th></tr>
              </thead>
              <tbody>
                <tr style="border-left: 4px solid #3366ff;">
                  <td><strong>Blauer Keil</strong></td>
                  <td><span class="mono-val">9:00–10:00 & 2:00–3:00</span></td>
                  <td><strong>Fortissimo-Keil (ff):</strong> Tiefe Nadelstiche zur Entspannung</td>
                </tr>
                <tr style="border-left: 4px solid #22cc55;">
                  <td><strong>Grüner Keil</strong></td>
                  <td><span class="mono-val">10:00–11:00 & 1:00–2:00</span></td>
                  <td><strong>Forte-Keil (f):</strong> Raumklang, Glanz und dynamische Entfaltung</td>
                </tr>
                <tr style="border-left: 4px solid #ff9900;">
                  <td><strong>Orangener Keil</strong></td>
                  <td><span class="mono-val">11:00–11:30 & 12:30–1:00</span></td>
                  <td><strong>Piano-Keil (p):</strong> Lyrischer Gesangston, feine Abstimmung</td>
                </tr>
                <tr style="border-left: 4px solid #aa33ff;">
                  <td><strong>Violetter Keil</strong></td>
                  <td><span class="mono-val">11:30–12:00 & 12:00–12:30</span></td>
                  <td><strong>Pianissimo-Keil (pp):</strong> Flüsterleise Ansprache</td>
                </tr>
                <tr style="border-left: 4px solid #ff2222; background: rgba(255, 34, 34, 0.08);">
                  <td><strong style="color: #ff5555;">Rote Zone (Scheitel)</strong></td>
                  <td><span class="mono-val" style="color: #ff5555;">12:00 Uhr Kronenspitze</span></td>
                  <td><strong style="color: #ff5555;">DO NOT TOUCH!</strong> Niemals tief einstechen!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image210.jpg" alt="Das Uhren-Modell der Intonation">
              <div class="media-caption">Original Renner Uhrenmodell mit den 4 dynamischen Keilen (ff, f, p, pp)</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 62: Die Vorintonation (Pre-Needling)
    slides.append(f\'\'\'      <!-- SLIDE 62: Die Vorintonation -->
      <section class="slide" data-slide="62">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Vorintonation</div>
            <h2 class="slide-title">Vorintonation (Pre-Needling): Tiefe Stiche im ff-Keil</h2>
            <div class="slide-subtitle">Abbau werkseitiger Vorspannung und Energieübertragung in den Forte-Keil</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Die Vorintonation ist der wichtigste Basisschritt bei fabrikneuen oder neu befilzten Hämmern:
            </p>
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Arbeitszone:</strong> Ausschließlich im blauen Fortissimo-Keil (Bereiche 9:00–10:00 Uhr und 2:00–3:00 Uhr).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Tiefe Einstiche:</strong> Nadeln tief bis kurz vor den Unterfilz einstechen (niemals in Unterfilz oder Holzkern stechen!).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Spannungstransfer:</strong> Der Kopf verliert die harte Werkssteife; elastische Spannungsenergie fließt in den grünen Forte-Keil ab.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Empfehlung:</strong> Dieser Schritt ist vor dem ersten Anspielen im Instrument fast ausnahmslos anzuraten.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_12_5_Image247.jpg" alt="Vorintonation Stiche">
              <div class="media-caption">Pre-Needling: Tiefe Stiche im Fortissimo-Keil (9:00 bis 10:00 Uhr)</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 63: Werkzeuge & Nadelstich-Vorgaben
    slides.append(f\'\'\'      <!-- SLIDE 63: Werkzeuge & Nadelstiche -->
      <section class="slide" data-slide="63">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Werkzeug & Technik</div>
            <h2 class="slide-title">Nadelstich-Vorgaben & Intonierwerkzeuge</h2>
            <div class="slide-subtitle">Drücken statt Hacken – Exakte Stichanzahlen für Bass, Mittellage und Diskant</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Stichanzahlen Pre-Needling:</strong>
                <br>• Bass: 7–10 Stiche horizontal
                <br>• Mittellage: 5–10 Stiche horizontal
                <br>• Diskant: 0–7 Stiche vertikal</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Drücken, niemals hacken!</strong> Nadeln ruhig und mit Körpergewicht eindrücken. Hacken zerreißt die Wollfasern unkontrolliert!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Original Renner Werkzeuge:</strong>
                <br>• Intonierapparat verstellbar (Art. 43-0005642)
                <br>• 3er-Intonierer Profi-Typ (Art. 43-0003270)
                <br>• Nadeln Nr. 7 vernickelt ø 0,60 mm, 9 mm lang (Art. 43-0003426).</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_13_2_Image257.png" alt="Intonierwerkzeuge Renner">
              <div class="media-caption">Renner Intonierwerkzeuge, Nadelhalter und Intonierapparat</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 64: Saitenvorbereitung im Instrument
    slides.append(f\'\'\'      <!-- SLIDE 64: Saitenvorbereitung -->
      <section class="slide" data-slide="64">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Saitenlagerung</div>
            <h2 class="slide-title">Saitenvorbereitung: Anhangstifte, Stegstifte & Agraffen</h2>
            <div class="slide-subtitle">„Der beste Hammerkopf kann nur das hervorbringen, was im Instrument programmiert ist!“</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <ol style="margin-left: 20px; line-height: 1.8; color: var(--text-primary);">
              <li><strong>Anhangstifte setzen:</strong> Saiten von hinten nach vorn am Anhangstift mit Messingdurchschlag und leichtem Hammer vorsichtig niederschlagen.</li>
              <li><strong>Stegstifte setzen:</strong> Saite am Steg zuerst am hinteren, dann am vorderen Stift sanft nach unten treiben (Vorsicht: Saite darf sich nicht ins Stegholz eingraben!).</li>
              <li><strong>Nivellieren in den Agraffen:</strong> Bei voller Konzertstimmung (440 Hz+) Saitenchöre mit dem Haken auf exakt gleiche Höhe anheben.</li>
            </ol>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_16_2_Image274.jpg" alt="Saiten setzen Anhangstift">
              <div class="media-caption">Saiten niederschlagen am Anhangstift mit Messingdurchschlag</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 65: Anschlagspunkt & Geradheit der Hammerköpfe
    slides.append(f\'\'\'      <!-- SLIDE 65: Anschlagspunkt & Geradheit -->
      <section class="slide" data-slide="65">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Ausrichtung</div>
            <h2 class="slide-title">Anschlagspunkt im Diskant & Geradheitsprüfung</h2>
            <div class="slide-subtitle">Optimierung der Noten 69–88 durch Verschieben des Klaviaturrahmens</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Anschlagspunkt Note 88 prüfen:</strong> Klaviaturrahmen minimal vor- und zurückschieben, um die hellste, tragfähigste Klangstelle im Diskant zu finden.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Noten 69 bis 88 anpassen:</strong> Der Diskant vieler Flügel lässt sich durch eine Neujustierung des Anschlagspunkts dramatisch verbessern!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Geradheit aller Köpfe:</strong> Prüfung durch leichtes Anzupfen mit Haken oder Heben der Klinke mit dem Finger; Markierung mit Kreide auf der Taste.</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_20_2_Image291.jpg" alt="Anschlagspunkt und Geradheit">
              <div class="media-caption">Prüfung des Diskant-Anschlagspunkts und Ausrichtung der Hämmer</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 66: Abziehen der Hammerkronen (Filing)
    slides.append(f\'\'\'      <!-- SLIDE 66: Kronenabzug (Filing) -->
      <section class="slide" data-slide="66">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Kronenabzug</div>
            <h2 class="slide-title">Abziehen der Hammerkrone: Hohl vs. Plan vs. Schief</h2>
            <div class="slide-subtitle">Anpassung der Scheitelfläche an den 3-chörigen Saitenverlauf mit feiner Hammerfeile</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <p class="slide-intro-p">
              Durch das Traveling und ungleichmäßige Saitenchöre muss die Oberfläche der Hammerkrone feinst abgezogen werden:
            </p>
            <div class="feature-card" style="margin-bottom: 10px;">
              <div class="card-title">Hohlkehle (Hollow Crown)</div>
              <div class="card-desc">Scheitel trifft nur die Randsaiten -> unvollständiger Ton, muss plan nachgefeilt werden.</div>
            </div>
            <div class="feature-card" style="margin-bottom: 10px;">
              <div class="card-title">Schiefe Krone (Crooked Crown)</div>
              <div class="card-desc">Einseitiges Treffen führt zu doppelter Attacke und Saitenbrummen -> fluchtend beiziehen.</div>
            </div>
            <div class="feature-card" style="border-color: var(--border-green);">
              <div class="card-title" style="color: var(--renner-green-bright);">Plan & Symmetrisch (Crown OK)</div>
              <div class="card-desc">Gleichzeitiger, satter Anschlag auf alle 3 Saiten des Chors für vollen Grundton.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_21_2_Image294.jpg" alt="Hammerkrone abziehen">
              <div class="media-caption">Feilen der Hammerkrone zur perfekten Ausrichtung auf den 3-Saiten-Chor</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 67: Zwischen- & Feinintonation (Mid & Balance Voicing)
    slides.append(f\'\'\'      <!-- SLIDE 67: Feinintonation -->
      <section class="slide" data-slide="67">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Feinabstimmung</div>
            <h2 class="slide-title">Zwischen- & Feinintonation: Die 2-mm-Kronenstiche</h2>
            <div class="slide-subtitle">Chromatisches Durchhören und vorsichtiges Egalisieren von Einzeltönen</div>
          </div>
        </div>
        <div class="slide-body split-wide-media">
          <div class="slide-text-col">
            <ul class="bullet-list">
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Chromatisches Durchspielen:</strong> Tastatur auf- und abwärts chromatisch anschlagen; Noten mit abweichender Härte oder Lautstärke lokalisieren.</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Zwischenintonation (Mid-Voicing):</strong> Sanftes Nadeln im grünen Forte- und orangenen Piano-Keil. Zu weiche Töne werden durch feines Nachschleifen gehärtet!</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Feinintonation (Final Balance):</strong> Kurze Einzelnadel (BDK-Halter Art. 43-0003269 oder Chop Stick Art. 43-0003271).</span></li>
              <li class="bullet-item"><span class="bullet-dot green"></span><span><strong>Stichtiefe max. 2 mm an der Krone:</strong> Ausschließlich zwischen den Saitenabdrücken einstechen, niemals direkt in den Rillen!</span></li>
            </ul>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/Intonation/page_22_2_Image298.jpg" alt="Feinintonation chromatisch">
              <div class="media-caption">Chromatisches Abhören und Feinabstimmung mit kurzer Einzelnadel</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    # SLIDE 68: Verschiebungsintonation (Una Corda) & Fazit
    slides.append(f\'\'\'      <!-- SLIDE 68: Una Corda & Fazit -->
      <section class="slide" data-slide="68">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Una Corda & Dialog</div>
            <h2 class="slide-title">Verschiebungsintonation & Die Renner Academy</h2>
            <div class="slide-subtitle">Linkes Pedal abstimmen, Geräusche vermeiden & Willkommen im Renner-Fachdialog</div>
          </div>
        </div>
        <div class="slide-body split-layout">
          <div class="slide-text-col">
            <div class="feature-card" style="margin-bottom: 12px;">
              <div class="card-title">Verschiebungsintonation (Una Corda)</div>
              <div class="card-desc">Chromatisches Spiel mit getretenem Pedal; nur die getroffenen Saitenbereiche vorsichtig nachnadeln. <strong>Experten-Tipp:</strong> Leichtes Brechen der linken Kante der Hammerkrone mit feiner Schleiffeile verhindert Reibgeräusche an Nachbarsaiten!</div>
            </div>
            <div class="feature-card" style="border-color: var(--border-gold);">
              <div class="card-title" style="color: var(--gold-accent);">Renner Academy & Technischer Dialog</div>
              <div class="card-desc">Renner bietet fundierte Meisterkurse, Werksführungen in Meuselwitz und individuellen Werkstattsupport für Klavierbaumeister weltweit.</div>
            </div>
          </div>
          <div class="slide-media-col">
            <div class="media-container" style="min-height: 420px;">
              <img src="Visuell/basis_media/image31.png" alt="Renner Abschluss">
              <div class="media-caption">Louis Renner GmbH • Ihr Partner für meisterlichen Klang weltweit</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>\'\'\')

    return "\\n".join(slides)
''')
    print("generate_complete_slide_definitions.py successfully created!")

if __name__ == "__main__":
    generate()
