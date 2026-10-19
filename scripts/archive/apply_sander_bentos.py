#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_sander_bentos.py
Upgrades slide_definitions.py with @SlidesbySander Bento Grid designs
and runs build_full_presentation.py to update index.html.
"""

import re
import subprocess

def main():
    with open("slide_definitions.py", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. SLIDE 2: Agenda
    p2 = r'# SLIDE 2: Agenda & Course Topics.*?</section>\'\'\'\)'
    r2 = """# SLIDE 2: Agenda & Course Topics (Sander Bento Grid)
    slides.append(f'''      <!-- SLIDE 2: Agenda & Course Topics -->
      <section class="slide" data-slide="2">
        <div class="slide-header">
          <div>
            <div class="slide-category">Übersicht • Struktur der Masterclass</div>
            <h2 class="slide-title">Die 6 Kernmodule der Renner Masterclass</h2>
            <div class="slide-subtitle">Vollständiges Schulungs- & Fachprogramm auf Basis der originalen Renner Academy Unterlagen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-3">
            <div class="bento-card">
              <div class="bento-step-watermark">01</div>
              <span class="bento-badge gold">MODUL 1</span>
              <div class="bento-card-title">Historie & Hauptsitz</div>
              <div class="bento-card-desc">140+ Jahre Meilensteine, Zusammenlegung der Werke Gärtringen und Meuselwitz & der neue weltweite Hauptsitz (Bau 09.2023–2025).</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge green">MODUL 2</span>
              <div class="bento-card-title">Filzherstellung (FFW Wurzen)</div>
              <div class="bento-card-desc">Weickert-Tradition seit 1783, Rohwoll-Selektion, Kardieren, Walken (Shore 0.56) und exklusiver „Weickert Special“-Filz.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold">MODUL 3</span>
              <div class="bento-card-title">Hammerkopf-Fertigung</div>
              <div class="bento-card-desc">Roboter-Filzzuschnitt, Unterfilzfräsen, Kernhölzer (Dichten 490–860 kg/m³), Presskräfte, CNC-Bearbeitung und T-Vernietung.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">04</div>
              <span class="bento-badge green">MODUL 4</span>
              <div class="bento-card-title">Musterteilekoffer & Stiele</div>
              <div class="bento-card-desc">15 Hebeglieder, 16 Kapselvarianten, Röllchen (17 / 15,5 mm), Stieldurchmesser (6,0 / 5,3 / 4,8 mm) und 5-Tage-Ruhelagerung.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold">MODUL 5</span>
              <div class="bento-card-title">Maßblätter & Geometrie</div>
              <div class="bento-card-desc">Standard-Bohrungslänge (Gesamtlänge - 24 mm), Bohrwinkel in Gon (100er-Teilung), 90°-Stielwinkel und 3 mm Überhang.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">06</div>
              <span class="bento-badge green">MODUL 6</span>
              <div class="bento-card-title">Hohe Schule der Intonation</div>
              <div class="bento-card-desc">Das Uhren-Modell, 4 dynamische Keile (ff, f, p, pp), Pre-Needling, Saitennivellierung, Kronenabzug und Una-Corda-Feinabstimmung.</div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c2 = re.subn(p2, r2, content, count=1, flags=re.DOTALL)
    print(f"Slide 2 upgraded: {c2}")

    # 2. SLIDE 4: Transformation Meuselwitz
    p4 = r'# SLIDE 4: Transformation Meuselwitz.*?</section>\'\'\'\)'
    r4 = """# SLIDE 4: Transformation Meuselwitz (Sander Bento Mosaic)
    slides.append(f'''      <!-- SLIDE 4: Transformation Meuselwitz -->
      <section class="slide" data-slide="4">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 1: Einführung & Historie • Standort Meuselwitz</div>
            <h2 class="slide-title">Zusammenlegung & Ausbau zum globalen Hauptsitz</h2>
            <div class="slide-subtitle">Bündelung aller Kompetenzen am modernen Produktionsstandort Meuselwitz</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold">STANDORT-STRATEGIE</span>
              <div class="bento-card-title">Bündelung aller Kompetenzen am modernen Welt-Hauptsitz</div>
              <div class="bento-card-desc">
                Um den wachsenden internationalen Qualitätsanforderungen gerecht zu werden und Synergien optimal zu nutzen, hat Louis Renner die Werke Gärtringen und Meuselwitz an einem zukunftsweisenden Standort vereint.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Bauvorhaben ab 09.2023 / 2024:</strong> Umfassende Revitalisierung und Modernisierung der Hallenflächen in Meuselwitz (Thüringen).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Konzentration:</strong> Vollständige Zusammenführung von Mechanik- und Hammerkopf-Kompetenz an einer zentralen Stätte.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Wertstromorientiertes Layout:</strong> Kürzeste Wege vom Holzzuschnitt über die Filzlagerung bis zur Endmontage und Baugruppenruhe.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/Bilder/02_Meuselwitz_Umbau/24_meuselwitz_moderner_hauptsitz_aussen_innen.jpg" alt="Neuer Renner Hauptsitz Meuselwitz">
              <div class="bento-media-overlay">
                <span class="bento-badge green">MEUSELWITZ 2025</span>
                <div class="bento-media-caption">Der neue vereinte Renner Hauptsitz</div>
                <div class="bento-media-subcaption">Zukunftssicherung & Kapazität für weltweite Konzert- und Serienkunden</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c4 = re.subn(p4, r4, content, count=1, flags=re.DOTALL)
    print(f"Slide 4 upgraded: {c4}")

    # 3. SLIDE 13: 0.56 Shore
    p13 = r'# SLIDE 13: Natürliche Walkhärte: 0.56 Shore.*?</section>\'\'\'\)'
    r13 = """# SLIDE 13: Natürliche Walkhärte: 0.56 Shore (Sander Bento Stat Hero)
    slides.append(f'''      <!-- SLIDE 13: Natürliche Walkhärte: 0.56 Shore -->
      <section class="slide" data-slide="13">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 2: Filzherstellung • Elastizität</div>
            <h2 class="slide-title">0.56 Shore: Die Grenze der natürlichen Walkhärte</h2>
            <div class="slide-subtitle">Maximale Eigenelastizität durch Verzicht auf chemische oder thermische Überhärtung</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold">PHYSIKALISCHE GRENZE</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">0.56</span>
                <span class="bento-metric-unit">Shore</span>
              </div>
              <div class="bento-card-title">Maximale natürliche Walkhärte</div>
              <div class="bento-card-desc">
                Filzplatten werden beim Wurzener Walkverfahren so lange verdichtet, bis sich die Fasern rein mechanisch nicht weiter zusammenschieben lassen – ganz ohne synthetische Harze oder Weichmacher.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>100% reine Faserelastizität:</strong> Reiche Obertonstruktur und blitzschnelle Rückfederung von der Saite („Let-off“ des Hammers).</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Kein Eigengeräusch:</strong> Weicher Anschlagskontakt, dynamischer Reichtum und singender Klangcharakter.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image7.jpeg" alt="Filzplatten bei FFW">
              <div class="bento-media-overlay">
                <span class="bento-badge green">FFW WURZEN</span>
                <div class="bento-media-caption">Original Weickert-Filzplatten</div>
                <div class="bento-media-subcaption">0.56 Shore natürliche Federkraft nach der Hammerwalke</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c13 = re.subn(p13, r13, content, count=1, flags=re.DOTALL)
    print(f"Slide 13 upgraded: {c13}")

    # 4. SLIDE 22: Kernholz-Arten & Dichten
    p22 = r'# SLIDE 22: Kernholz-Arten & spezifische Dichten.*?</section>\'\'\'\)'
    r22 = """# SLIDE 22: Kernholz-Arten & spezifische Dichten (Sander Bento Wood Grid)
    slides.append(f'''      <!-- SLIDE 22: Kernholz-Arten & Dichten -->
      <section class="slide" data-slide="22">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 3: Hammerkopf-Produktion • Kernholz-Arten</div>
            <h2 class="slide-title">Kernholz-Arten & Spezifische Gewichte</h2>
            <div class="slide-subtitle">Die Masse und Elastizität des Kernholzes bestimmen Anschlagsträgheit und Tonfarbe</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 12px;">
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge green">HARTHOLZ</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700; font-size: 1.05rem;">800–860 kg/m³</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.1rem;">Weißbuche (Hornbeam)</div>
                <div class="bento-card-desc">Maximaler Punch, kraftvoller Attack, extrem formstabil für moderne Konzertflügel.</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge gold">MITTELFEST</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700; font-size: 1.05rem;">530–790 kg/m³</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.1rem;">Bergahorn (Maple)</div>
                <div class="bento-card-desc">Brillant, transparent, differenzierter obertonreicher Ton für filigranes Spiel.</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge gold">MITTELFEST</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700; font-size: 1.05rem;">590–680 kg/m³</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.1rem;">Nussbaum (Walnut)</div>
                <div class="bento-card-desc">Warmer, samtiger Grundton mit vollem, tragfähigem Bassfundament.</div>
              </div>
              <div class="bento-card">
                <div class="bento-card-header">
                  <span class="bento-badge green">LEICHT / AGIL</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700; font-size: 1.05rem;">490–750 kg/m³</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.1rem;">Mahagoni (Kotibé)</div>
                <div class="bento-card-desc">Geringe Trägheit, singender Diskant und extrem sensible Ansprache.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_12_2_Image217.jpg" alt="Kernholz-Arten Renner">
              <div class="bento-media-overlay">
                <span class="bento-badge gold">WERKSTOFF-SELEKTION</span>
                <div class="bento-media-caption">Original Renner Kernhölzer</div>
                <div class="bento-media-subcaption">Weißbuche, Bergahorn, Nussbaum & Mahagoni (Kotibé)</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c22 = re.subn(p22, r22, content, count=1, flags=re.DOTALL)
    print(f"Slide 22 upgraded: {c22}")

    # 5. SLIDE 35: Die 16 Kapseltypen
    p35 = r'# SLIDE 35: Auswahlkriterium: Die 16 Kapseltypen.*?</section>\'\'\'\)'
    r35 = """# SLIDE 35: Auswahlkriterium: Die 16 Kapseltypen (Sander Bento KPI Hero)
    slides.append(f'''      <!-- SLIDE 35: Die 16 Kapseltypen -->
      <section class="slide" data-slide="35">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Kapsel-Selektion</div>
            <h2 class="slide-title">Die 16 Kapselvarianten für alle Flügelmodelle</h2>
            <div class="slide-subtitle">Exakte Zuordnung von Schraubenbohrung, Langloch und Abfallschraubenposition</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold">MUSTERTEILEKOFFER</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">16</span>
                <span class="bento-metric-unit">Kapseltypen</span>
              </div>
              <div class="bento-card-title">Exakte Passform für jeden Flügel weltweit</div>
              <div class="bento-card-desc">
                Das Renner MTK-System differenziert 16 Kapselvarianten nach Röllchenabstand (17,0 mm vs. 15,5 mm), Kapsellänge, Bohrungsdurchmesser und Kröpfung.
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>17,0 mm Standard-Röllchen:</strong> Renner Standard, Steinway & Sons, Bösendorfer.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>15,5 mm Kompakt-Röllchen:</strong> Für spezifische asiatische und historische Klaviaturen.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Kapsellängen:</strong> Präzise Abstimmung für optimale Geometrie und Hebelverhältnisse.</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HSt/page_10_2_Image203.jpg" alt="16 Kapseltypen Renner">
              <div class="bento-media-overlay">
                <span class="bento-badge green">MTK BAZAR</span>
                <div class="bento-media-caption">16 Kapselvarianten im Vergleich</div>
                <div class="bento-media-subcaption">Vollständige Abdeckung aller internationalen Flügelfabrikate</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c35 = re.subn(p35, r35, content, count=1, flags=re.DOTALL)
    print(f"Slide 35 upgraded: {c35}")

    # 6. SLIDE 36: Röllchen & Stieldurchmesser
    p36 = r'# SLIDE 36: Auswahlkriterien: Röllchen, Holz & Dimensionen.*?</section>\'\'\'\)'
    r36 = """# SLIDE 36: Auswahlkriterien: Röllchen, Holz & Dimensionen (Sander Bento Metric Grid)
    slides.append(f'''      <!-- SLIDE 36: Röllchen, Holz & Dimensionen -->
      <section class="slide" data-slide="36">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 4: Musterteilekoffer • Stiel-Parameter</div>
            <h2 class="slide-title">Röllchenabstand, Stielstärke & Satz-Zusammenstellung</h2>
            <div class="slide-subtitle">Die 7 entscheidenden Auswahlkriterien für den perfekten Hammerstiel</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-3" style="gap: 12px;">
              <div class="bento-card metric-card">
                <span class="bento-badge gold">BASS</span>
                <div class="bento-metric-top">
                  <span class="bento-metric-num">6,0</span>
                  <span class="bento-metric-unit">mm</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;">Stieldurchmesser</div>
                <div class="bento-card-desc">Maximale Biegesteifigkeit für hohe Stoßkräfte.</div>
              </div>
              <div class="bento-card metric-card">
                <span class="bento-badge green">MITTE</span>
                <div class="bento-metric-top">
                  <span class="bento-metric-num">5,3</span>
                  <span class="bento-metric-unit">mm</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;">Stieldurchmesser</div>
                <div class="bento-card-desc">Harmonische Balance aus Elastizität & Tragfähigkeit.</div>
              </div>
              <div class="bento-card metric-card">
                <span class="bento-badge gold">DISKANT</span>
                <div class="bento-metric-top">
                  <span class="bento-metric-num">4,8</span>
                  <span class="bento-metric-unit">mm</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;">Stieldurchmesser</div>
                <div class="bento-card-desc">Geringste Masse für blitzschnelle Repetition.</div>
              </div>
              <div class="bento-card col-span-3">
                <div class="bento-card-header">
                  <span class="bento-badge green">RÖLLCHEN & HOLZART</span>
                  <span class="mono-val" style="color: var(--gold-light); font-weight: 700;">17 mm & 15,5 mm</span>
                </div>
                <div class="bento-card-desc">
                  Röllchenabstand 17 mm (Renner-Norm) oder 15,5 mm (Steinway); Holzarten: Weißbuche (steif) oder Bergahorn (elastisch); Röllchen-ø 10 mm (Standard) oder 9 mm.
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HSt/page_11_2_Image207.jpg" alt="Röllchen und Stieldimensionen">
              <div class="bento-media-overlay">
                <span class="bento-badge green">STIELGEOMETRIE</span>
                <div class="bento-media-caption">Röllchenpositionen & Stieldurchmesser</div>
                <div class="bento-media-subcaption">Abstimmung nach Register und Flügelfabrikat</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c36 = re.subn(p36, r36, content, count=1, flags=re.DOTALL)
    print(f"Slide 36 upgraded: {c36}")

    # 7. SLIDE 40: Bohrungslänge = Gesamtlänge - 24 mm
    p40 = r'# SLIDE 40: Standardmaße & Bohrungslänge.*?</section>\'\'\'\)'
    r40 = """# SLIDE 40: Standardmaße & Bohrungslänge (Sander Bento Formula Grid)
    slides.append(f'''      <!-- SLIDE 40: Standardmaße & Bohrungslänge -->
      <section class="slide" data-slide="40">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Standardparameter</div>
            <h2 class="slide-title">Bohrungslänge = Gesamtlänge - 24 mm</h2>
            <div class="slide-subtitle">Die universelle Faustformel für Flügelhammerköpfe im Renner-Standard</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 12px;">
              <div class="bento-card col-span-2 hero-card">
                <span class="bento-badge gold">RENNER FAUSTFORMEL</span>
                <div class="bento-card-title" style="font-size: 1.4rem; color: var(--gold-light);">Länge = Gesamtlänge - 24 mm</div>
                <div class="bento-card-desc">Garantiert die exakte Einstecktiefe des Stiels und optimale Masseverteilung des Hammerkopfs.</div>
              </div>
              <div class="bento-card">
                <span class="bento-badge green">BOHRUNG</span>
                <div class="bento-metric-top">
                  <span class="bento-metric-num" style="font-size: 2.2rem;">5,4</span>
                  <span class="bento-metric-unit">mm ø</span>
                </div>
                <div class="bento-card-desc">Standardbohrung für konische Renner Hammerstiele.</div>
              </div>
              <div class="bento-card">
                <span class="bento-badge green">RAKE-WINKEL</span>
                <div class="bento-metric-top">
                  <span class="bento-metric-num" style="font-size: 2.2rem;">91°</span>
                  <span class="bento-metric-unit">Lehre</span>
                </div>
                <div class="bento-card-desc">Leichte Vorneigung beim Einleimen für optimalen Anschlag.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_27_2_Image284.jpg" alt="Standardmaße Bohrung">
              <div class="bento-media-overlay">
                <span class="bento-badge gold">GEOMETRIE-NORM</span>
                <div class="bento-media-caption">Standardmaße der Flügelhammerkopf-Bohrung</div>
                <div class="bento-media-subcaption">Renner Werksnorm für Flügelhammerköpfe</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c40 = re.subn(p40, r40, content, count=1, flags=re.DOTALL)
    print(f"Slide 40 upgraded: {c40}")

    # 8. SLIDE 41: Bohrwinkel in Gon
    p41 = r'# SLIDE 41: Bohrwinkel in Gon.*?</section>\'\'\'\)'
    r41 = """# SLIDE 41: Bohrwinkel in Gon (Sander Bento Gon Grid)
    slides.append(f'''      <!-- SLIDE 41: Bohrwinkel in Gon -->
      <section class="slide" data-slide="41">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Gon-Winkel</div>
            <h2 class="slide-title">Bohrwinkel in Gon (100er-Teilung des 90°-Winkels)</h2>
            <div class="slide-subtitle">Warum Renner Bohrwinkel traditionell in Gon statt in Grad angibt</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold">WINKELNORM</span>
              <div class="bento-metric-top">
                <span class="bento-metric-num">100</span>
                <span class="bento-metric-unit">Gon = 90°</span>
              </div>
              <div class="bento-card-title">Zehntelgrad-genaue Teilung ohne Bruchminuten</div>
              <div class="bento-card-desc">
                Gon ermöglicht präziseste Bohrwinkelabstufungen über alle 88 Tasten hinweg:
              </div>
              <div class="bento-card-list">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Klavier (UP):</strong> Bass 30 Gon – 0 Gon | Diskant 125 Gon – 0 Gon.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Flügel (GP):</strong> Bass 25 Gon – 0 Gon | Diskant 125 Gon – 0 Gon.</span>
                </div>
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Staffelung nach Chören:</strong> Noten 1–26 (10 Gon), 27–30 (110 Gon), 31–33 (109 Gon) bis Noten 55–88 (101 Gon).</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_28_2_Image291.jpg" alt="Bohrwinkel in Gon">
              <div class="bento-media-overlay">
                <span class="bento-badge green">BOHRWINKEL-TABELLE</span>
                <div class="bento-media-caption">Bohrwinkeltabelle nach Registern</div>
                <div class="bento-media-subcaption">Exakte Abstufung zur Vermeidung von Torsionskräften</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c41 = re.subn(p41, r41, content, count=1, flags=re.DOTALL)
    print(f"Slide 41 upgraded: {c41}")

    # 9. SLIDE 42: Stielwinkel & Überhang
    p42 = r'# SLIDE 42: Das Prinzip des Stielwinkels.*?</section>\'\'\'\)'
    r42 = """# SLIDE 42: Das Prinzip des Stielwinkels (Sander Bento KPI Double Hero)
    slides.append(f'''      <!-- SLIDE 42: Das Prinzip des Stielwinkels -->
      <section class="slide" data-slide="42">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 5: Maßblätter & Geometrie • Stielwinkel-Physik</div>
            <h2 class="slide-title">90°-Stielwinkel & 3 mm Überhang: Physik des Tons</h2>
            <div class="slide-subtitle">Warum übermäßige Abschliffe alter Hämmer den Saitenbruch provozieren</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div style="display: flex; gap: 28px; align-items: baseline; margin-bottom: 14px;">
                <div>
                  <div class="bento-metric-top">
                    <span class="bento-metric-num">90°</span>
                    <span class="bento-metric-unit">Winkel</span>
                  </div>
                  <div class="bento-card-title" style="font-size: 1.1rem;">Rechtwinkliger Anschlag</div>
                </div>
                <div>
                  <div class="bento-metric-top">
                    <span class="bento-metric-num">3.0</span>
                    <span class="bento-metric-unit">mm</span>
                  </div>
                  <div class="bento-card-title" style="font-size: 1.1rem;">Hinterer Überhang</div>
                </div>
              </div>
              <div class="bento-card-desc">
                Der Hammer muss im Moment des Saitenkontakts exakt im 90°-Winkel auf die Saite treffen. Durch den 3 mm Stielüberhang wird die kinetische Stoßenergie gezielt in Richtung Steg abgeleitet!
              </div>
              <div class="bento-card-list" style="margin-top: 14px;">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span><strong>Gefahr bei &lt; 90°:</strong> Wird ein alter Hammer zu oft geschliffen (Kopf wird kürzer), sinkt der Winkel unter 90°. Der Hammer verkeilt sich in Richtung Agraffe -> Saite reißt, Klang wird stumpf!</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_31_1_Image169.png" alt="Prinzip Stielwinkel">
              <div class="bento-media-overlay">
                <span class="bento-badge gold">KRAFTVEKTOR</span>
                <div class="bento-media-caption">Geometrie des Hammerstielwinkels</div>
                <div class="bento-media-subcaption">Exakte Kraftableitung in Richtung Steg</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c42 = re.subn(p42, r42, content, count=1, flags=re.DOTALL)
    print(f"Slide 42 upgraded: {c42}")

    # 10. SLIDE 60: Regulierung & Stimmung
    p60 = r'# SLIDE 60: Regulierung & Stimmung als Grundvoraussetzung.*?</section>\'\'\'\)'
    r60 = """# SLIDE 60: Regulierung & Stimmung als Grundvoraussetzung (Sander Bento Quote Hero)
    slides.append(f'''      <!-- SLIDE 60: Regulierung & Stimmung -->
      <section class="slide" data-slide="60">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Voraussetzungen</div>
            <h2 class="slide-title">Keine Intonation ohne makellose Regulierung!</h2>
            <div class="slide-subtitle">Der goldene Grundsatz von Jens-Sören Kruse (Klavierbaumeister)</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <span class="bento-badge gold">GRUNDGESETZ DES KLAVIERBAUS</span>
              <div class="bento-card-title">Der unabdingbare Kreislauf</div>
              <div class="bento-card-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--gold-light); font-style: italic; margin-top: 8px;">
                „Ohne gute Regulierung keine saubere Stimmung,<br>
                und ohne gute Regulierung keine saubere Intonation,<br>
                und ohne saubere Stimmung keine saubere Intonation.<br>
                <strong>Eines führt zum anderen, und alles ist mit allem verbunden!</strong>“
              </div>
              <div class="bento-card-list" style="margin-top: 14px;">
                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span>Wer versucht, ungleichmäßigen Ton durch Nadeln auszugleichen, wenn in Wahrheit Auslösung, Steighöhe oder Saitenchor ungleich sind, zerstört den Hammerkopf!</span>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image11.jpeg" alt="Regulierung und Feineinstellung">
              <div class="bento-media-overlay">
                <span class="bento-badge green">JENS-SÖREN KRUSE</span>
                <div class="bento-media-caption">Mechanikregulierung als Fundament</div>
                <div class="bento-media-subcaption">Auslösung, Steighöhe und Fänger müssen auf 0,1 mm stimmen</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c60 = re.subn(p60, r60, content, count=1, flags=re.DOTALL)
    print(f"Slide 60 upgraded: {c60}")

    # 11. SLIDE 61: Uhren-Modell & 4 dynamische Keile
    p61 = r'# SLIDE 61: Das Uhren-Modell & Die 4 dynamischen Keile.*?</section>\'\'\'\)'
    r61 = """# SLIDE 61: Das Uhren-Modell & Die 4 dynamischen Keile (Sander Bento Clock Grid)
    slides.append(f'''      <!-- SLIDE 61: Das Uhren-Modell -->
      <section class="slide" data-slide="61">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Geometrie & Keile</div>
            <h2 class="slide-title">Das Uhren-Modell: Die 4 dynamischen Keile</h2>
            <div class="slide-subtitle">Strukturierte Aufteilung des Hammerkopfs nach Register- und Lautstärkezielen</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <div class="bento-card" style="border-left: 4px solid #3b82f6;">
                <div class="bento-card-header">
                  <span class="bento-badge" style="background: rgba(59,130,246,0.2); color: #93c5fd; border-color: rgba(59,130,246,0.4);">FORTISSIMO (ff)</span>
                  <span class="mono-val" style="font-size: 0.85rem;">9–10 & 2–3 Uhr</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.05rem;">Blauer Keil</div>
                <div class="bento-card-desc">Tiefe Nadelstiche zur Entspannung der werkseitigen Grundspannung.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #22c55e;">
                <div class="bento-card-header">
                  <span class="bento-badge" style="background: rgba(34,197,94,0.2); color: #86efac; border-color: rgba(34,197,94,0.4);">FORTE (f)</span>
                  <span class="mono-val" style="font-size: 0.85rem;">10–11 & 1–2 Uhr</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.05rem;">Grüner Keil</div>
                <div class="bento-card-desc">Raumklang, Brillanz, Glanz und dynamische Entfaltung.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #f97316;">
                <div class="bento-card-header">
                  <span class="bento-badge" style="background: rgba(249,115,22,0.2); color: #fdba74; border-color: rgba(249,115,22,0.4);">PIANO (p)</span>
                  <span class="mono-val" style="font-size: 0.85rem;">11–11:30 & 12:30–1</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.05rem;">Orangener Keil</div>
                <div class="bento-card-desc">Lyrischer Gesangston, feine Nuancen und weiche Ansprache.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #a855f7;">
                <div class="bento-card-header">
                  <span class="bento-badge" style="background: rgba(168,85,247,0.2); color: #d8b4fe; border-color: rgba(168,85,247,0.4);">PIANISSIMO (pp)</span>
                  <span class="mono-val" style="font-size: 0.85rem;">11:30–12 & 12–12:30</span>
                </div>
                <div class="bento-card-title" style="font-size: 1.05rem;">Violetter Keil</div>
                <div class="bento-card-desc">Flüsterleise Ansprache im sensibelsten Anschlagbereich.</div>
              </div>
              <div class="bento-card col-span-2" style="border-left: 4px solid #ef4444; background: rgba(239,68,68,0.08);">
                <div class="bento-card-header">
                  <span class="bento-badge red">KRONENSPITZE</span>
                  <span class="mono-val" style="color: #f87171; font-weight: 700;">12:00 UHR SCHEITEL</span>
                </div>
                <div class="bento-card-title" style="color: #fca5a5; font-size: 1.05rem;">DO NOT TOUCH! – Niemals tief einstechen!</div>
                <div class="bento-card-desc" style="color: #fecaca; font-size: 0.84rem;">Die Schlaglinie an der Kronenspitze darf niemals mit tiefen Nadeln perforiert werden, da sonst die Tonstabilität und der Aufschlagskontakt unwiederbringlich zerstört werden!</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image210.jpg" alt="Das Uhren-Modell der Intonation">
              <div class="bento-media-overlay">
                <span class="bento-badge gold">JENS-SÖREN KRUSE</span>
                <div class="bento-media-caption">Renner Uhrenmodell & Dynamische Keile</div>
                <div class="bento-media-subcaption">Wissenschaftliche Zonenaufteilung der Hammerkopf-Intonation</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c61 = re.subn(p61, r61, content, count=1, flags=re.DOTALL)
    print(f"Slide 61 upgraded: {c61}")

    # 12. SLIDE 68: Abschluss & Fazit
    p68 = r'# SLIDE 68: Verschiebungsintonation.*?</section>\'\'\'\)'
    r68 = """# SLIDE 68: Verschiebungsintonation & Die Renner Academy (Sander Bento Finale)
    slides.append(f'''      <!-- SLIDE 68: Una Corda & Fazit -->
      <section class="slide" data-slide="68">
        <div class="slide-header">
          <div>
            <div class="slide-category">Teil 7: Intonation • Una Corda & Dialog</div>
            <h2 class="slide-title">Verschiebungsintonation & Die Renner Academy</h2>
            <div class="slide-subtitle">Linkes Pedal abstimmen, Geräusche vermeiden & Willkommen im Renner-Fachdialog</div>
          </div>
        </div>
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-grid" style="grid-template-columns: 1fr; gap: 12px;">
              <div class="bento-card">
                <span class="bento-badge green">UNA CORDA PRAXIS</span>
                <div class="bento-card-title">Verschiebungsintonation</div>
                <div class="bento-card-desc">
                  Chromatisches Spiel mit getretenem Pedal; nur die tatsächlich getroffenen Saitenbereiche vorsichtig nachnadeln.
                </div>
                <div class="bento-card-list">
                  <div class="bento-card-list-item">
                    <span class="bento-dot gold"></span>
                    <span><strong>Experten-Tipp:</strong> Leichtes Brechen der linken Kante der Hammerkrone mit feiner Schleiffeile verhindert Reibgeräusche an Nachbarsaiten!</span>
                  </div>
                </div>
              </div>
              <div class="bento-card hero-card">
                <span class="bento-badge gold">RENNER ACADEMY</span>
                <div class="bento-card-title">Ihr Partner für meisterlichen Klang</div>
                <div class="bento-card-desc">
                  Renner bietet fundierte Meisterkurse, Werksführungen in Meuselwitz und individuellen Werkstattsupport für Klavierbaumeister weltweit.
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image31.png" alt="Renner Abschluss">
              <div class="bento-media-overlay">
                <span class="bento-badge gold">LOUIS RENNER GMBH</span>
                <div class="bento-media-caption">140+ Jahre Tradition & Perfektion</div>
                <div class="bento-media-subcaption">Meuselwitz, Deutschland • Weltmaßstab für Klaviermechaniken & Hammerköpfe</div>
              </div>
            </div>
          </div>
        </div>
{get_watermark()}
      </section>''')"""
    content, c68 = re.subn(p68, r68, content, count=1, flags=re.DOTALL)
    print(f"Slide 68 upgraded: {c68}")

    with open("slide_definitions.py", "w", encoding="utf-8") as f:
        f.write(content)
    print("slide_definitions.py written successfully!")

if __name__ == "__main__":
    main()
