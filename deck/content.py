# -*- coding: utf-8 -*-
"""
deck/content.py – Single source of truth for the Renner deck (68 slides).

Rules (agreed with the client):
  * Every statement comes from the five documents in "Präsentation - Basis"
    or from louis-renner.de (history page). Nothing is invented.
  * Every slide carries a `source` reference that is shown on the slide.
  * Design follows the Slides-by-Sander method: one idea per slide, the title
    states the message, one accent colour, click-driven reveal.

Source keys used in `source`:
  JP  = Hammerkopf_Japan_040325 (Clemens Kunert)
  HK  = HK_Prd_Auswahl_10_25 (Jens-Sören Kruse, Renner Academy)
  MTK = HSt_Kap_Auswahl_MTK_10_25 (Jens-Sören Kruse, Renner Academy)
  GL  = EN_GP_HK_Glueing_10_25 (Jens-Sören Kruse, Renner Academy)
  IN  = Intonation_10_25 (Jens-Sören Kruse, Renner Academy)
  WEB = louis-renner.de/ueber-renner/die-geschichte-renners/
"""

SOURCES = {
    "JP": "Hammerkopf_Japan_040325",
    "HK": "HK_Prd_Auswahl_10_25",
    "MTK": "HSt_Kap_Auswahl_MTK_10_25",
    "GL": "EN_GP_HK_Glueing_10_25",
    "IN": "Intonation_10_25",
    "WEB": "louis-renner.de",
    "FOTO": "Projektalbum Meuselwitz",
}

DECK = {
    "title": "Renner Hammerkopf 2025 – Vom Filz bis zur Intonation",
    "description": "Louis Renner: Herstellung, Auswahl, Montage und Intonation des Renner-Hammerkopfs. "
                   "Konferenz 2025, Tokio & Shanghai.",
    "logo": "Visuell/web_assets/renner_logo_weiss_schatten.png",
    # Key message (Sander: 1–2 sentences, repeated at beginning, middle, end) – IN S. 8
    "key_message": "Eines führt zum anderen, und alles hängt mit allem zusammen.",
}

CHAPTERS = {
    1: ("Renner", "Geschichte und Standort Meuselwitz"),
    2: ("Filz", "Herstellung in der Filzfabrik Wurzen"),
    3: ("Hammerkopf", "Fertigung bei Renner"),
    4: ("Maßblatt & Geometrie", "Den passenden Hammerkopf bestimmen"),
    5: ("Hammerstiele", "Auswahl mit dem Musterteilekoffer"),
    6: ("Montage & Verleimung", "Hammerköpfe richtig aufleimen"),
    7: ("Intonation", "Den Renner-Hammerkopf intonieren"),
}

# --------------------------------------------------------------------------
# Asset helpers
# --------------------------------------------------------------------------
HK = "Visuell/basis_media/HK/"
MTK = "Visuell/basis_media/HSt/"
GL = "Visuell/basis_media/EN/"
IN = "Visuell/basis_media/Intonation/"
JP = "Visuell/japan_deck_assets/"
WEB = "Visuell/web_assets/"
MW = "Visuell/Bilder/02_Meuselwitz_Umbau/"
VID = "Visuell/Videos/"


def img(src, cap=None, fit="contain"):
    return {"type": "img", "src": src, "cap": cap, "fit": fit}


def vid(src, cap=None):
    return {"type": "video", "src": src, "cap": cap}


def gal(*items, cols=None):
    return {"type": "gallery", "items": list(items), "cols": cols or len(items)}


# --------------------------------------------------------------------------
# Slides
# --------------------------------------------------------------------------
SLIDES = [
    # ======================================================================
    # OPENING
    # ======================================================================
    {
        "layout": "title",
        "kicker": "Konferenz 2025 · Tokio & Shanghai",
        "title": "Renner Hammerkopf 2025",
        "lead": "Vom Filz bis zur Intonation: Herstellung, Auswahl, Montage und Intonation",
        "meta": [("Referent", "Clemens Kunert"),
                 ("Inhalte Renner Academy", "Jens-Sören Kruse, Klavierbaumeister")],
        "bg": WEB + "renner-hammerkoepfe-in-aktion-1.jpg",
        "source": "JP S. 1 · Academy-Unterlagen 2025",
        "notes": "Begrüßung. Roter Faden des Vortrags ist die Kernbotschaft aus der Academy-Unterlage "
                 "Intonation (S. 8): „Eines führt zum anderen, und alles hängt mit allem zusammen.“ "
                 "Sie kommt am Anfang, in der Mitte (Folie 58) und am Ende (Folie 68) wieder.",
    },
    {
        "layout": "agenda",
        "title": "Vom Rohstoff bis zum Klang – in sieben Kapiteln",
        "quote": "„Eines führt zum anderen, und alles hängt mit allem zusammen.“",
        "quote_src": "Renner Academy, Intonation",
        "source": "JP S. 3 · Kursübersichten HK/MTK/GL/IN S. 2",
        "notes": "Überblick. Kernbotschaft einmal laut aussprechen – sie verbindet alle Kapitel: "
                 "Filz, Pressung, Maße, Stiele, Verleimung und Intonation bauen aufeinander auf.",
    },

    # ======================================================================
    # 01 RENNER
    # ======================================================================
    {
        "layout": "timeline", "ch": 1,
        "title": "Seit 1882: aus einer Stuttgarter Werkstatt wurde ein weltweites Unternehmen",
        "events": [
            ("1882", "Gründung", "Louis Renner richtet in der Heusteigstraße in Stuttgart eine Werkstatt für Klaviermechaniken ein."),
            ("1906", "Hammerköpfe", "Die Fabrikation von Hammerköpfen wird aufgenommen."),
            ("1911", "Flügelmechaniken", "Auch die Fertigung von Flügelmechaniken wird aufgenommen."),
            ("1944", "Brand", "In der Nacht vom 24. auf 25. Juli brennen die Fabrikanlagen ab – danach Wiederaufbau."),
            ("1977", "Ersatzteile", "Ausbau der Bestandteile-Abteilung mit großem Lager und einem in der Fachwelt bestaunten Katalog."),
            ("2001", "Gärtringen", "Umzug in ein komplett neues Werk in Gärtringen."),
            ("2011", "Zwei Standorte", "Die zuvor verstreuten Werke werden in Gärtringen und Meuselwitz zusammengelegt."),
            ("2019", "Steinway & Sons", "Steinway & Sons übernimmt Renner – Renner arbeitet weiterhin unabhängig."),
        ],
        "source": "WEB",
    },
    {
        "layout": "quote", "ch": 1,
        "quote": "Ebenso wie wir verfügt das Unternehmen über eine sehr lange Tradition, ist führend in seinem "
                 "Segment und beliefert Kunden weltweit mit hervorragender Qualität. […] Es ist wichtig, dass "
                 "Renner weiterhin unabhängig arbeiten wird.",
        "author": "Guido Zimmermann",
        "role": "President Steinway & Sons Hamburg, zur Übernahme 2019",
        "title": "Steinway & Sons über Renner",
        "bg": WEB + "renner-klaviermechanik-25.jpg",
        "source": "WEB (2019)",
    },
    {
        "layout": "kpi", "ch": 1,
        "title": "Meuselwitz: die moderne Kernproduktionsstätte von Renner",
        "kpis": [("6.000", "m²", "Fläche des Standorts"), ("ca. 45", "km", "südlich von Leipzig")],
        "points": ["Vor- und Endmontage von Klavier- und Flügelmechaniken",
                   "Hammerkopfproduktion",
                   "Vertrieb von Bauteilen"],
        "media": gal(img(MW + "21_meuselwitz_fertige_mechanikmontage.jpg", fit="cover"),
                     img(MW + "13_meuselwitz_klimatisierte_lagerraeume.jpg", fit="cover"),
                     img(MW + "23_meuselwitz_praezisionsfertigung_in_betrieb.jpg", fit="cover"),
                     cols=1),
        "media_cap": "Fotos: Projektalbum Umbau Meuselwitz",
        "source": "WEB (2011) · Fotos: Projektalbum Meuselwitz",
        "notes": "Zahlen laut louis-renner.de (Abschnitt 2011). Die Fotos stammen aus dem Projektalbum zum "
                 "Umbau in Meuselwitz – Einzelheiten zum aktuellen Umbau bitte mündlich ergänzen; "
                 "in den Unterlagen sind dazu keine Daten enthalten.",
    },

    # ======================================================================
    # 02 FILZ
    # ======================================================================
    {
        "layout": "kpi", "ch": 2,
        "title": "Weickert-Filz: 1847 entstand in Wurzen der erste Hammerkopffilz",
        "kpis": [("1783", "", "Gründung durch J. D. Weickert in Leipzig, Sachsen"),
                 ("1847", "", "erster Hammerkopffilz in der neuen Fabrik in Wurzen – so, wie er auch heute verwendet werden könnte")],
        "points": ["Schon damals Lieferant vieler bekannter Hersteller"],
        "media": img(HK + "page_3_2_Image161.jpg"),
        "source": "HK S. 3",
    },
    {
        "layout": "split", "ch": 2,
        "title": "Der Filz für alle Renner-Hammerköpfe entsteht heute in Wurzen",
        "points": ["Die Filzfabrik Wurzen gehört heute einem Filzhersteller aus Braunschweig (Deutschland) und Toronto (Kanada).",
                   "Mit dem Wissen der langjährigen Belegschaft wird der Hammerkopffilz für alle Renner-Hammerköpfe am modernisierten Standort Wurzen produziert.",
                   "Renner bezieht den Deckfilz ausschließlich aus Wurzen – nur die feinste, besonders schonend karbonisierte Qualität."],
        "media": img(HK + "page_4_2_Image176.jpg"),
        "source": "HK S. 4 · JP S. 6",
    },
    {
        "layout": "split", "ch": 2,
        "title": "Rohwolle wird nicht zu stark gepresst – das schont die Fasern",
        "points": ["Die Rohwolle wird in Ballen angeliefert.",
                   "Sie darf nicht zu stark gepresst werden, sonst werden die Wollfasern beschädigt.",
                   "Das erhöht die Transportkosten – aber auch die Qualität.",
                   "Stark gekräuselte Fasern sind ein Vorteil beim Walken.",
                   "Mischung und Aufbereitung der Fasern für Renner sind ein gut gehütetes Geheimnis."],
        "media": gal(img(HK + "page_5_2_Image181.jpg", "Rohwolle in Ballen"),
                     img(HK + "page_6_2_Image187.jpg", "Auflockern und Mischen"), cols=1),
        "source": "HK S. 5–6",
    },
    {
        "layout": "split", "ch": 2,
        "title": "Krempeln: die Fasern werden entwirrt und parallel ausgerichtet",
        "points": ["Die Wollfasern werden zu weichen, fließenden Vliesen gekämmt.",
                   "Sie werden entwirrt und parallel zueinander ausgerichtet – der Fachbegriff dafür ist Krempeln.",
                   "So entsteht ein Vlies mit klar definierter Faserrichtung; danach wird es gewalkt und verdichtet."],
        "media": gal(img(HK + "page_7_2_Image190.jpg"), img(HK + "page_7_3_Image191.jpg"), cols=1),
        "source": "HK S. 7 · JP S. 8",
    },
    {
        "layout": "four", "ch": 2,
        "title": "Aus Vliesen wird eine Filzplatte – dafür braucht es vier Dinge",
        "lead": "Die Vliese werden übereinandergeschichtet und zu einer Filzplatte vereint.",
        "items": ["Dampf", "Druck", "Bewegung", "Know-how"],
        "media": img(HK + "page_8_2_Image194.jpg"),
        "source": "HK S. 8",
    },
    {
        "layout": "kpi", "ch": 2,
        "title": "Maximale natürliche Walkhärte: 0,56 Shore",
        "kpis": [("0,56", "Shore", "maximale natürliche Walkhärte")],
        "points": ["Die Filzplatten werden verdichtet, bis sich die Fasern nicht weiter zusammenschieben lassen.",
                   "Das entspricht maximaler Elastizität."],
        "media": img(HK + "page_9_2_Image198.jpg"),
        "source": "HK S. 9",
    },
    {
        "layout": "split", "ch": 2,
        "title": "Nachbearbeitung ohne Schleifen und ohne verstärktes Pressen",
        "points": ["Die Filzplatten werden mit Hämmern und Filzsteinen verdichtet.",
                   "Nachpressen auf die gewünschte Shore-Härte und die vorgegebenen Endmaße.",
                   "Ohne Schleifen und ohne verstärktes Pressen – so entsteht die größtmögliche Elastizität.",
                   "Erkennbar an einer glatten Oberfläche beim Biegen."],
        "media": img(HK + "page_9_3_Image199.jpg"),
        "source": "HK S. 9",
    },
    {
        "layout": "kpi", "ch": 2,
        "title": "Weit über 30 Filzplatten – feuchtigkeitskontrolliert gelagert",
        "kpis": [("30+", "", "verschiedene Filzplatten aus Wurzen – mehr als alle anderen")],
        "points": ["Lager im Renner-Werk Meuselwitz: feuchtigkeitskontrolliert, mit Mottenüberwachung.",
                   "Die Filzplatte hat eine konische Form.",
                   "Die Platten unterscheiden sich in Dichte, Filzmischung und Abmessungen – so kann Renner flexibel auf Kundenwünsche eingehen."],
        "media": img(HK + "page_10_2_Image202.jpg"),
        "source": "HK S. 10 · JP S. 10",
    },
    {
        "layout": "split", "ch": 2,
        "title": "Die „Seele“: ein Zeichen der Filzfabrik Wurzen – kein Qualitätsmerkmal",
        "points": ["Manche Filzplatten werden mit einer oder zwei „Seelen“ geliefert.",
                   "Die Seele ist eine andersfarbige Filzschicht, meist am Bassanfang.",
                   "Sie ist ein Zeichen der Filzfabrik Wurzen – kein Hinweis auf unterschiedliche Qualitäten."],
        "media": img(HK + "page_11_3_Image207.jpg"),
        "source": "HK S. 11",
    },
    {
        "layout": "chain", "ch": 2,
        "title": "„Weickert Special“: ein höherwertiger Filz – nur für Renner",
        "lead": "Ein spezieller Filz höherer Qualität, ausschließlich für Renner produziert.",
        "cause": "Mehr Wollfett",
        "effects": ["Geringeres Quellverhalten",
                    "Besseres Zugverhalten",
                    "Mehr Stabilität der Intonation und ein direkterer Ton"],
        "media": img(HK + "page_11_2_Image206.jpg"),
        "source": "HK S. 11",
    },

    # ======================================================================
    # 03 HAMMERKOPF
    # ======================================================================
    {
        "layout": "split", "ch": 3,
        "title": "Filzzuschnitt bei Renner: neue Robotertechnik",
        "points": ["Ein Roboter schneidet die Filzplatten in gleiche Deckfilzstreifen.",
                   "Jeder Streifen wird mit internen Informationen für die Produktion beschriftet."],
        "media": gal(vid(VID + "01_roboter_filzzuschnitt.mp4", "Filzzuschnitt mit Robotertechnik"),
                     img(JP + "page_13_img_3.jpg", "Qualität des Deckfilzstreifens nach dem Schnitt"), cols=1),
        "source": "JP S. 11–13 · HK S. 11",
    },
    {
        "layout": "split", "ch": 3,
        "title": "Profilieren des Unterfilzstreifens",
        "lead": "Das Video zeigt das Profilieren, das Bild den Unterfilzstreifen danach.",
        "media": gal(vid(VID + "02_unterfilz_profilieren.mp4", "Profilieren des Unterfilzstreifens"),
                     img(JP + "page_15_img_3.jpg", "Qualität des Unterfilzstreifens nach dem Profilieren"), cols=1),
        "source": "JP S. 14–15",
    },
    {
        "layout": "swatches", "ch": 3,
        "title": "Unterfilz: sechs Farben im Standardprogramm",
        "colors": [("Rot", "#c8202f"), ("Weinrot", "#6f1d2b"), ("Orange", "#e5782b"),
                   ("Gelb", "#efc232"), ("Blau", "#2949b0"), ("Schwarz", "#121212")],
        "media": img(HK + "page_14_2_Image226.jpg"),
        "source": "HK S. 14",
        "notes": "Die Farbfelder sind nur eine Illustration der sechs genannten Farben – maßgeblich ist das Foto bzw. das Muster.",
    },
    {
        "layout": "bars", "ch": 3,
        "title": "Kernholz: Weißbuche ist das einzige Hartholz – 800 bis 860 kg/m³",
        "rows": [("Weißbuche", "hart", 800, 860),
                 ("Ahorn", "mittelhart", 530, 790),
                 ("Nussbaum", "mittelhart", 590, 680),
                 ("Mahagoni (Kotibé)", "mittelhart", 490, 750)],
        "scale": (400, 900, 100),
        "unit": "kg/m³ (spezifisches Gewicht)",
        "highlight": 0,
        "media": img(HK + "page_12_2_Image217.jpg"),
        "source": "HK S. 12",
    },
    {
        "layout": "twocol", "ch": 3,
        "title": "Kernholzformen: asymmetrisch und symmetrisch",
        "left": ("Asymmetrische Form", ["Bechstein alt", "Flügel mit dünnem Diskant"]),
        "right": ("Symmetrische Standardform",
                  ["Bösendorfer", "Förster", "Petrof", "Sauter", "Grotrian Steinweg",
                   "Steinway alt und neu (Reparatur)", "Yamaha", "Kawai", "Blüthner", "Renner USA",
                   "Piano-Industrie", "Steinway HH", "Bösendorfer neu", "Schimmel neu", "Bechstein neu"]),
        "right_cols": 3,
        "media": vid(VID + "03_holzkern_profil_fraesen.mp4", "Fräsen des Kernholzprofils"),
        "source": "HK S. 13 · JP S. 16",
        "notes": "Zuordnung der Marken zu den beiden Formen gemäß Reihenfolge auf HK S. 13 – vor dem Vortrag am Original prüfen.",
    },
    {
        "layout": "split", "ch": 3,
        "title": "Vorformen: Kennlinien auf dem Filz machen das Pressen sichtbar",
        "points": ["Das Bild zeigt das Bassende des Filzstreifens vor dem Pressen.",
                   "Auf dem Filz sind charakteristische Kurven zu sehen.",
                   "Die Veränderungen während des Pressens beobachten."],
        "media": img(HK + "page_15_2_Image229.jpg"),
        "source": "HK S. 15",
    },
    {
        "layout": "split", "ch": 3,
        "title": "Beim Pressen wirken Druck und Zug auf den Filz",
        "points": ["Der Kern ist fast in der Endposition – bei der Filzstärke am Scheitel.",
                   "Gegenlagen beginnen, den Filz seitlich um den Kern zu schließen.",
                   "Wie haben sich die Kennlinien verändert?",
                   "Kernlinien, Druck und Zug beobachten."],
        "media": img(HK + "page_16_2_Image232.jpg"),
        "source": "HK S. 16",
    },
    {
        "layout": "split", "ch": 3,
        "title": "Nach dem Schließen wird der Kern erneut gespannt – für mehr Spannung im Filz",
        "points": ["Die Presse ist vollständig geschlossen.",
                   "Nach dem Schließen der Seitenbacken wird der Kern erneut gespannt.",
                   "Das erhöht zusätzlich die Spannung der äußeren Filzschichten.",
                   "Das ist die Grundlage für die Arbeit bei der Intonation (Kapitel 07)."],
        "media": gal(vid(VID + "04_hammerkopf_pressen_leimen.mp4", "Pressen und Verleimen"),
                     img(HK + "page_17_2_Image235.jpg"), cols=1),
        "source": "HK S. 17 · JP S. 17–18",
        "notes": "Brücke zur Intonation: Die Spannung im Filz, die hier entsteht, ist genau das, womit später bei der Intonation gearbeitet wird.",
    },
    {
        "layout": "statement", "ch": 3,
        "title": "Nach dem Pressen: Formgebung – ein Betriebsgeheimnis",
        "statement": "Nach Verleimen und Pressen durchlaufen die Hammerköpfe eine Formgebung, die aus Gründen "
                     "des Betriebs- und Prozessgeheimnisses nicht gezeigt wird.",
        "media": img(JP + "page_19_img_3.jpg", "Zustand des Hammerkopfs als Riegel nach dem Pressen"),
        "source": "HK S. 18 · JP S. 19",
    },
    {
        "layout": "gallery", "ch": 3,
        "title": "CNC-Bearbeitung: der Hammerkopf-Riegel wird bereinigt",
        "media": gal(img(JP + "page_20_img_3.jpg", "Bereinigung des Riegels per CNC-Bearbeitung"),
                     img(JP + "page_21_img_3.jpg", "Riegel nach Fräsen und CNC-Bearbeitung"),
                     img(HK + "page_19_2_Image245.jpg", "Oberfläche nach dem Schneiden")),
        "source": "JP S. 20–22 · HK S. 19",
    },
    {
        "layout": "steps", "ch": 3,
        "title": "Kontrollieren, reinigen, bohren, nieten, verpacken",
        "steps": [("Kontrollieren", ""), ("Reinigen", ""), ("Bohren", ""), ("Nieten", ""), ("Verpacken", "")],
        "media": vid(VID + "05_hammerkopf_bohren_nieten.mp4", "Bohren und Nieten des Hammerkopfs"),
        "source": "HK S. 20–22 · JP S. 23",
    },
    {
        "layout": "list", "ch": 3,
        "title": "Der Renner-Hammerkopf 2025: maßgefertigt und bereit für die Endintonation",
        "points": ["Maßgefertigte Hammerkopfproduktion",
                   "Bereit für die Endintonation – keine Vorintonation nötig",
                   "Hochpräzise und innovative Fertigung",
                   "Individuelle Fertigung vom Einzelstück bis zur Großserie",
                   "Reicher Klang und Stabilität",
                   "Gebohrt, genietet, mit individuellen Spitzen und abgerundeten Enden"],
        "numbered": True,
        "media": img(JP + "page_24_img_7.jpg", fit="cover"),
        "source": "JP S. 24",
        "notes": "Mitte des Vortrags: Kernbotschaft wiederholen. Hinweis zur Abstimmung: Die Academy-Unterlage "
                 "Intonation (S. 13) empfiehlt die Vor-Nadelung im ff-Keil „in fast jedem Fall“ – "
                 "die Aussage „keine Vorintonation nötig“ (JP S. 24) vor dem Vortrag mit Herrn Kruse abstimmen.",
    },

    # ======================================================================
    # 04 MASSBLATT & GEOMETRIE
    # ======================================================================
    {
        "layout": "gallery", "ch": 4,
        "title": "Das Renner-Maßblatt für Flügel und Klavier",
        "lead": "In der Academy wird das Maßblatt gemeinsam ausgefüllt.",
        "media": gal(img(HK + "page_33_2_Image316.jpg", "Maßblatt Flügel"),
                     img(HK + "page_34_2_Image319.jpg", "Maßblatt Klavier")),
        "source": "HK S. 2, 23, 33–34",
    },
    {
        "layout": "fields", "ch": 4,
        "title": "Bei Markeninstrumenten genügen wenige Grunddaten",
        "fields": ["Steinway & Sons", "#535100", "1996", "M 170"],
        "fields_cap": "Beispiel: Grunddaten eines Instruments",
        "statement": "Für Markeninstrumente reichen diese Angaben, damit Renner einen passenden, gebohrten und "
                     "einbaufertigen Hammerkopfsatz liefern kann.",
        "media": img(HK + "page_24_2_Image269.png"),
        "source": "HK S. 24",
    },
    {
        "layout": "wordwall", "ch": 4,
        "title": "Daten liegen für fast alle namhaften Marken vor",
        "lead": "Beispiel: Datensatz aus dem Renner-Standardprogramm für Steinway-Reparaturen.",
        "words": ["Bechstein", "Blüthner", "Bösendorfer", "Schimmel", "Sauter", "Steingraeber",
                  "Seiler", "Förster", "Yamaha", "Kawai", "Petrof", "u. v. m."],
        "media": img(HK + "page_25_2_Image274.jpg"),
        "source": "HK S. 25",
    },
    {
        "layout": "kpi", "ch": 4,
        "title": "Renner-Standard: Bohrungslänge = Gesamtlänge − 24 mm",
        "kpis": [("−24", "mm", "Bohrungslänge = Gesamtlänge − 24 mm (Flügel) – oder nach Modellinformationen von Renner"),
                 ("5,4", "mm", "Bohrungsdurchmesser"),
                 ("90", "°", "Winkel Hammer zu Stiel")],
        "points": ["Bohrwinkel nach Renner-Informationen"],
        "media": img(HK + "page_27_3_Image287.png"),
        "source": "HK S. 27",
    },
    {
        "layout": "gon", "ch": 4,
        "title": "Bohrwinkel in Gon: 100 Teile auf einen rechten Winkel",
        "table": {"cols": ["", "Bass", "Diskant"],
                  "rows": [["Klavier", "30 – 0 Gon", "125 – 0 Gon"],
                           ["Flügel", "25 – 0 Gon", "125 – 0 Gon"]]},
        "table_cap": "Übliche Werte",
        "ranges": [(1, 26, "10"), (27, 30, "110"), (31, 33, "109"), (34, 36, "108"), (37, 39, "107"),
                   (40, 42, "106"), (43, 45, "105"), (46, 48, "104"), (49, 51, "103"), (52, 54, "102"),
                   (55, 88, "101")],
        "ranges_cap": "Beispiel: Bohrwinkel in Gon je Tonbereich (Ton 1 – 88)",
        "points": ["Mindestanzahl Hämmer: Bass 27 Stück, Diskant 63 Stück"],
        "source": "HK S. 28",
    },
    {
        "layout": "kpi", "ch": 4,
        "title": "Der Hammer soll im rechten Winkel zur Saitenebene treffen",
        "kpis": [("90", "°", "zur Saitenebene"), ("3", "mm", "Überhang des Hammerstiels")],
        "points": ["Wirkung: Durch die Massenträgheit regt der Hammer die Energie stärker in Richtung Steg an.",
                   "Unter 90° verkeilt sich der Hammer zur Agraffe hin – die Saite kann brechen, der Ton leidet.",
                   "Häufigster Fall: nach der Reparatur alter Hammerköpfe, wenn zu viel Filz abgeschliffen wurde – ein gutes Argument für neue Hämmer."],
        "media": img(HK + "page_31_2_Image306.png"),
        "source": "HK S. 31",
    },
    {
        "layout": "formula", "ch": 4,
        "title": "Bohrungslänge berechnen, wenn keine Muster vorliegen",
        "lines": [("", "(1) Abstand Saitenebene – Stuhlboden"),
                  ("−", "(2) Abstand Hammerstielachse (Achsstift) – Stuhlboden"),
                  ("=", "Differenz beider Werte"),
                  ("−", "(3) 3 mm Überhang des Stiels beim Anschlag"),
                  ("=", "(4) Bohrungslänge")],
        "media": img(HK + "page_32_2_Image310.png"),
        "source": "HK S. 32",
    },

    # ======================================================================
    # 05 HAMMERSTIELE & MUSTERTEILEKOFFER
    # ======================================================================
    {
        "layout": "kpi", "ch": 5,
        "title": "Der Renner-Musterteilekoffer: Muster zum Testen – mit Begleitheft",
        "kpis": [("15", "", "verschiedene Flügel-Hebeglieder, als Standard-Ersatzteilsatz erhältlich (je 2 zum Testen)"),
                 ("12", "", "verschiedene Sättel zum Kombinieren")],
        "points": ["Zusätzlich: 2 Hebeglieder eines Modells ohne Sattel.",
                   "Begleitheft mit Beschreibungen der Musterteile, Hinweisen zu den Kit-Teilen und technischen Anleitungen zur Ersatzteilauswahl."],
        "media": img(MTK + "page_3_2_Image161.jpg"),
        "source": "MTK S. 3–4",
    },
    {
        "layout": "split", "ch": 5,
        "title": "Hammerkopf-Muster im Koffer",
        "points": ["Flügel-Hammerköpfe in 3 Größen",
                   "Verschiedene Holzkerne (Flügel)",
                   "Verschiedene Unterfilzmuster"],
        "media": img(MTK + "page_5_2_Image179.jpg"),
        "source": "MTK S. 5",
    },
    {
        "layout": "twocol", "ch": 5,
        "title": "Mechanikteile für Flügel und Klavier",
        "left": ("Flügel & Klavier",
                 ["15 verschiedene Hammerstielkapseln (Flügel)",
                  "10 verschiedene Hebegliedkapseln (Klavier)",
                  "Dämpferarm US und Renner (Flügel)",
                  "Alle Stoßzungen (Flügel)",
                  "Alle Mechanikbalken (Flügel)"]),
        "right": ("Klavier",
                  ["Verschiedene Bass- und Diskantdämpfer",
                   "Dämpferarme und Hebeglieder für AP und APK",
                   "Hebeglied mit Verlängerung für ältere Mechaniken und Einzelanfertigung",
                   "Mechanikbalken- und Hammernuss-Muster für AP und APK"]),
        "media": gal(img(MTK + "page_6_2_Image184.jpg"), img(MTK + "page_7_2_Image187.jpg"), cols=1),
        "source": "MTK S. 6–7",
    },
    {
        "layout": "kpi", "ch": 5,
        "title": "16 Flügel-Hammerstielmuster – je zwei zum Testen",
        "kpis": [("16", "", "verschiedene Flügel-Hammerstielmuster, als Standard-Ersatzteilsatz erhältlich")],
        "points": ["3 Hammerstielmuster ohne Kapsel zur Selbstreparatur",
                   "Muster für Blüthner-Patentstiel, Wiener-Mechanik-Stiel und Klemmhülse",
                   "Begleitheft: Übersicht der Hammerstiele und Hinweise zu den Kit-Teilen"],
        "media": img(MTK + "page_8_2_Image190.jpg"),
        "source": "MTK S. 8–9",
    },
    {
        "layout": "twocol", "ch": 5,
        "title": "Kapseltypen: Renner-Varianten und Fremdfabrikate",
        "lead": "16 Kapseltypen im Standardsortiment für Reparaturen.",
        "left": ("Renner",
                 ["Standard", "Mit Unterlegscheiben", "Ohne Schraubenloch – zum Selbstbohren",
                  "Mit geänderter Drop-Screw-Position", "Mit versetztem Schraubenloch"]),
        "right": ("Weitere Fabrikate",
                  ["M&H mit Langloch und Unterlegscheiben", "M&H", "Kawai", "Yamaha neu", "Yamaha alt",
                   "Baldwin neu", "Baldwin alt", "Pratt-Read", "Flemming", "Knabe"]),
        "right_cols": 2,
        "media": img(MTK + "page_10_2_Image203.jpg"),
        "source": "MTK S. 10, 13",
    },
    {
        "layout": "table", "ch": 5,
        "title": "Den richtigen Flügel-Hammerstiel finden: fünf Kriterien",
        "rows": [("Kapseltyp", "16 Typen im Standardsortiment für Reparaturen"),
                 ("Holzart", "Weißbuche oder Ahorn"),
                 ("Rollenlänge", "kurz (wie Steinway) oder lang für Reparaturen"),
                 ("Röllchenposition", "17 mm (Standard) und 15,5 mm"),
                 ("Röllchengröße", "10 mm (Standard) · 9 mm in Schnittbreite 11,7 mm · 10 mm in Schnittbreite 11,2 mm für Reparaturen")],
        "media": img(MTK + "page_12_2_Image212.jpg", "Röllchen: Drop-Screw, Unterlegscheiben, 3 Größen"),
        "source": "MTK S. 12–13",
    },
    {
        "layout": "circles", "ch": 5,
        "title": "Stieldurchmesser: 6,0 mm im Bass, 5,3 mm in der Mitte, 4,8 mm im Diskant",
        "circles": [("6,0", 6.0, "Bass"), ("5,3", 5.3, "Mitte"), ("4,8", 4.8, "Diskant")],
        "points": ["Zusammenstellungen: 70 Bass / 20 Diskant oder 60 | 10 | 20, 50 | 20 | 20, 75 | 25, 90, 100"],
        "source": "MTK S. 13",
    },
    {
        "layout": "gallery", "ch": 5,
        "title": "Hammerstiel-Produktion: vom Zuschnitt bis zur vollautomatischen Montage",
        "media": gal(img(MTK + "page_14_2_Image218.jpg", "Gefräste Platten im Magazin vor dem Zuschnitt"),
                     img(MTK + "page_15_2_Image222.jpg", "Automatisches Kamera-Qualitätskontrollsystem"),
                     img(MTK + "page_16_2_Image227.jpg", "Röllchenpresse"),
                     img(MTK + "page_17_2_Image231.jpg", "Vollautomatische Hammerstiel-Montage"), cols=4),
        "source": "MTK S. 14–17",
    },
    {
        "layout": "kpi", "ch": 5,
        "title": "5 Tage Ruhezeit: ein fester Qualitätsschritt im Wertstrom",
        "kpis": [("5", "Tage", "Lagerung aller Hammerstiel-Baugruppen für den Setzprozess")],
        "points": ["Als Qualitätsprozess im Wertstrom geplant – darf nicht unterschritten werden.",
                   "Qualitätskontrolle von Hand, nach einem klar definierten Prozess.",
                   "Danach werden die Hammerstiele in verschiedenen Zusammenstellungen zu Sätzen kombiniert und verpackt."],
        "media": img(MTK + "page_18_2_Image235.jpg"),
        "source": "MTK S. 18–19",
    },

    # ======================================================================
    # 06 MONTAGE & VERLEIMUNG
    # ======================================================================
    {
        "layout": "split", "ch": 6,
        "title": "Hammerstiele vorinstallieren: feldweise, im Diskant beginnen",
        "points": ["Feldweise nach der Aufteilung des Instruments vorinstallieren – zwischen den Feldern ein bis zwei Plätze frei lassen.",
                   "Im Diskant beginnen, so wie Renner verpackt.",
                   "Gebrauchter Mechanikbalken: Schraube zuerst nach links drehen, bis sie im alten Gewinde einrastet – dann leicht mit den Fingern anziehen.",
                   "Empfehlung: neue Renner-Schrauben – mit Federscheibe und sauberem Kombischlitz."],
        "tools": "Schraube 4,5 × 22 mm mit Federscheibe und Kombischlitz (43-0008745) · Flügelmechanik-Gestell mit verschiedenen Mechanikbalken",
        "media": img(GL + "page_3_2_Image161.jpg"),
        "source": "GL S. 3",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Beim Festschrauben: die Frequenz der Stiele prüfen",
        "points": ["Schrauben anziehen – Vorsicht: nicht zu fest.",
                   "Jetzt ist der richtige Moment, die Frequenzen der Stiele zu prüfen: tiefere Töne für tiefere Noten, höhere Frequenzen für höhere Noten.",
                   "Den ersten und letzten Stiel jedes Feldes im 90°-Winkel zum Mechanikbalken ausrichten."],
        "tools": "Akkuschrauber · Präzisionswinkel · Kreuzschlitz-Schraubendreher PZD 2 mit Kugelgriff (43-0008316) · Kapselabstandshalter Steinway/Baldwin (43-0003286)",
        "media": img(GL + "page_4_3_Image174.jpg"),
        "source": "GL S. 4",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Je sorgfältiger das Ausrichten, desto besser gelingt das Traveling",
        "points": ["Die Hammerstiele zueinander ausrichten.",
                   "Unterschiedliche Abstände ausgleichen.",
                   "Expertentipp: Den Lauf der Hämmer eines ganzen Feldes nach rechts oder links korrigieren – oft nötig bei älteren Flügeln und Steinway-Flügeln."],
        "tools": "Filzmesser mit abgewinkelter Schneide (43-0003252) · Travelling-Papier, einseitig klebend, blau, 0,2 mm (43-0005975)",
        "media": gal(img(GL + "page_5_3_Image180.jpg"), img(GL + "page_7_2_Image188.jpg"), cols=2),
        "source": "GL S. 5–7",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Neue Nummern auf die Hammerköpfe schreiben – unbedingt",
        "points": ["Satz öffnen, Hammerköpfe auf ein Arbeitsbrett legen, überzählige aussortieren.",
                   "Jeder Renner-Hammerkopf trägt ab Werk seine Nummer im Satz und das Renner-Branding (außer Original-Steinway-Ersatzteile).",
                   "Bei verjüngten Formen wird die Nummer manchmal weggeschliffen.",
                   "Beim Aussortieren gehen Nummern verloren."],
        "media": img(GL + "page_8_2_Image191.jpg"),
        "source": "GL S. 8",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Konischer Stiel in konischer Bohrung: der Leim wird nicht durchgedrückt",
        "points": ["Ohne Muster: die Mitte markieren.",
                   "Musterhämmer setzen.",
                   "Bohrungen mit der konischen Handreibahle aufreiben: Ø 5,0 mm, Konus 1:50, rechtsschneidend.",
                   "Prinzip: Der Leim kann nicht durchgedrückt werden – das Quellen des Holzes erzeugt schnell eine feste Verbindung."],
        "tools": "Stahllineal 150 mm (43-0003324) · Mittenmarkierer · Druckbleistift · Handreibahle Ø 5,0 mm, 1:50 (43-0003409)",
        "media": gal(img(GL + "page_11_2_Image205.jpg"), img(GL + "page_12_2_Image210.png", "Prinzip: konischer Stiel, konische Bohrung"), cols=2),
        "source": "GL S. 9–12",
    },
    {
        "layout": "kpi", "ch": 6,
        "title": "Den Hammer-Stiel-Winkel prüfen – mit der 91°-Lehre",
        "kpis": [("91", "°", "Rake-Lehre für Flügel-Hammerköpfe, zum Messen und Korrigieren beim Leimen (43-0005650)")],
        "points": ["Muster bzw. ersten und letzten Hammerkopf jedes Feldes setzen.",
                   "Den Hammer-Stiel-Winkel prüfen.",
                   "Die Hammerposition nach den Mustern markieren – das erleichtert das Leimen."],
        "media": img(GL + "page_13_2_Image214.jpg"),
        "source": "GL S. 13–14",
    },
    {
        "layout": "steps", "ch": 6,
        "title": "Leimen: Viskosität wie flüssiger Honig, Drehverleimung für saubere Leimringe",
        "steps": [("Leim auf den Stiel", ""), ("Leim in die Bohrung", ""), ("Wie flüssiger Honig", "Viskosität des Leims"),
                  ("Aufleimen", "Hammer aufsetzen"), ("Drehverleimung", "für saubere Leimringe")],
        "media": img(GL + "page_15_2_Image223.jpg"),
        "source": "GL S. 15",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Durchgang und Linie laufend prüfen",
        "points": ["3 Hammerköpfe leimen und den Durchgang des mittleren prüfen.",
                   "Den nächsten Hammer setzen und den Durchgang des vorherigen prüfen.",
                   "Gerade Linie der Hämmer und der Hammerschwänze prüfen – Filzlinie vorne und hinten, die ganze Linie mit dem Auge.",
                   "Den Hammer-Stiel-Winkel regelmäßig prüfen."],
        "media": gal(img(GL + "page_16_2_Image228.jpg"), img(GL + "page_18_4_Image247.jpg"), cols=2),
        "source": "GL S. 16, 18",
    },
    {
        "layout": "twocol", "ch": 6,
        "title": "Heiß- oder Kaltleim – und wie die Leimfuge nachbehandelt wird",
        "left": ("Heißleim",
                 ["Hautleim (Perlleim) braun (43-0001162)",
                  "Kaninchenleim-Granulat (43-0004644)",
                  "Elektrischer Leimtopf, Edelstahl, 0,2 l, 220 V (43-0003248)",
                  "Nachbehandeln: mit Pinsel und heißem Wasser – für eine perfekte Leimfuge"]),
        "right": ("Kaltleim",
                  ["PVA-Leim, speziell für Hartholz (43-0007262)",
                   "Nachbehandeln: mit wasserverdünntem Kaltleim („Leimwasser“)"]),
        "media": img(GL + "page_17_2_Image233.png"),
        "source": "GL S. 17, 19",
    },
    {
        "layout": "kpi", "ch": 6,
        "title": "Leimringe verputzen – nach etwa einer Stunde",
        "kpis": [("ca. 1", "Std.", "Trockenzeit bis zur optimalen Festigkeit – wie Weingummi")],
        "points": ["Mit dem Messer schneiden.",
                   "Herausgelaufene Leimreste verputzen.",
                   "Den Rest von Hand entfernen."],
        "media": img(GL + "page_20_2_Image259.jpg"),
        "source": "GL S. 20",
    },
    {
        "layout": "steps", "ch": 6,
        "title": "Hammerschwänze: nicht zu rund, nicht zu flach",
        "lead": "Zu rund: kann hochspringen, kein guter Fang. Zu flach: Einhaken möglich.",
        "steps": [("Spannen", "Perfekte Einspannung schützt die Achse des Hammerstiels"),
                  ("Absägen", "Überstehende Hammerstiele mit der Japansäge absägen"),
                  ("Abschleifen", "Überstände abschleifen"),
                  ("Planschleifen", "Eine ebene Fläche schleifen"),
                  ("Formen", "Den Hammerschwanz ausformen")],
        "tools": "Klemmvorrichtung für Flügel-Hammerstiele, in der Mechanik montiert (43-0003233) · Japansäge",
        "media": img(GL + "page_24_2_Image280.jpg"),
        "source": "GL S. 21–24",
    },
    {
        "layout": "split", "ch": 6,
        "title": "Nacharbeit von Hand – und die letzte Chance zur Korrektur",
        "points": ["Mit dem Schleifklotz, Körnung 40, nacharbeiten – für einen besseren Griff.",
                   "Die hintere Kante nacharbeiten, wenn Federn an den Hebegliedern sind – auch im Zweifel.",
                   "Mit feiner Schleifpapierfeile verputzen, Kanten und Ecken brechen.",
                   "Letzte Chance: den Durchgang der Hämmer mit der Brennerlampe korrigieren.",
                   "Hammerstiele abschrauben und versenden – oder einbauen und mit der Regulierung beginnen."],
        "media": img(GL + "page_26_2_Image293.jpg"),
        "source": "GL S. 25–26",
    },

    # ======================================================================
    # 07 INTONATION
    # ======================================================================
    {
        "layout": "list", "ch": 7,
        "title": "Intonieren heißt: das Instrument dorthin bringen, wo es am schönsten klingt",
        "points": ["Die Klangeigenschaften eines Instruments auf das Niveau bringen, auf dem es am schönsten klingt.",
                   "Alle Töne mit möglichst vielen Dynamikstufen.",
                   "Alle Töne mit dem größtmöglichen Teiltonspektrum."],
        "media": img(WEB + "renner-saiten-detail.jpg", fit="cover"),
        "source": "IN S. 3",
    },
    {
        "layout": "twocol", "ch": 7,
        "title": "Was wir nicht ändern können – und was wir beeinflussen",
        "left": ("Unveränderlich",
                 ["**Konstruktion:** Bauweisen, Materialien, Klangphilosophien, Fertigungsverfahren",
                  "**Ort:** Konzertsaal, Kammermusiksaal, Wohnzimmer, Studio, Musikschule",
                  "**Nutzer:** Techniker im Showroom, Profipianist, Privatnutzer, Spieler (Anschlag & Ton), Publikum"]),
        "right": ("Beeinflussbar",
                  ["**Material:** Renner-Hammerköpfe und Renner-Mechanikteile",
                   "**Arbeit:** perfekter Einbau der Stiele und Verleimung der Köpfe, gereinigtes Instrument, perfekte Besaitung, Regulierung & Stimmung",
                   "**Training:** professionelle Schulung der Renner Academy"]),
        "accent_side": "right",
        "source": "IN S. 4–7",
    },
    {
        "layout": "quote", "ch": 7,
        "title": "Regulierung & Stimmung",
        "quote": "Keine saubere Intonation ohne gute Regulierung – ohne gute Regulierung keine saubere Stimmung – "
                 "und ohne saubere Stimmung keine saubere Intonation.",
        "author": "Eines führt zum anderen, und alles hängt mit allem zusammen.",
        "role": "Renner Academy",
        "bg": IN + "page_8_2_Image201.jpg",
        "source": "IN S. 8",
        "notes": "Kernbotschaft (Mitte/zweite Hälfte). Kurze Pause nach dem Zitat.",
    },
    {
        "layout": "twocol", "ch": 7,
        "title": "Neun Arbeitsschritte – sechs Ziele",
        "left": ("Arbeitsschritte",
                 ["Vorintonation der Hammerköpfe",
                  "Schleifen, Formen, Bügeln der Hammerköpfe",
                  "Saiten richten, setzen, nivellieren",
                  "Abschließende Stimm- und Regulierarbeiten",
                  "Hämmer travellieren und zu den Saiten ausrichten",
                  "Hämmer zu den Saiten abziehen und richten",
                  "Abschließende Abschnitts-Intonation",
                  "Abschließende Balance-Intonation",
                  "Verschiebung (linkes Pedal) ausgleichen"]),
        "right": ("Ziele der Intonation",
                  ["Dynamikumfang vergrößern und öffnen",
                   "Tonlänge (Sustain)",
                   "Anschlagskultur, pianistische Spielweise",
                   "Balance in der Linie",
                   "Balance im Ton",
                   "Balance und Charakter der Verschiebung"]),
        "numbered": True,
        "accent_side": "right",
        "source": "IN S. 9",
    },
    {
        "layout": "clock", "ch": 7,
        "title": "Intonierbereiche: der Hammerkopf als Zifferblatt",
        "points": ["Zentrale Energielinie: 12 Uhr.",
                   "Im rechten Winkel dazu: der höchste Wangenbereich – auf Höhe der Oberkante des Unterfilzes.",
                   "Die übrige Einteilung folgt den Stunden einer Uhr."],
        "legend": [("#8e5bd8", "Lila", "Pianissimo-Keil"),
                   ("#f08a2c", "Orange", "Piano-Keil"),
                   ("#3fae5a", "Grün", "Forte-Keil"),
                   ("#3b82f6", "Blau", "Fortissimo-Keil"),
                   ("#e23b3b", "Rot", "nicht berühren!")],
        "media": img(IN + "page_10_2_Image210.jpg"),
        "source": "IN S. 10–11, 13",
        "notes": "Im Bild eingezeichnet sind nur die Lagen, die die Unterlage ausdrücklich nennt: 12 Uhr (Scheitel, "
                 "rote Zone) und der Fortissimo-Keil zwischen 9 und 10 sowie 2 und 3 Uhr (IN S. 13). "
                 "Die übrigen Keile bitte am Originalbild (IN S. 11) zeigen.",
    },
    {
        "layout": "kpi", "ch": 7,
        "title": "Vor-Nadelung im Fortissimo-Keil: tiefe Stiche bis kurz vor den Unterfilz",
        "kpis": [("7–10", "", "Stiche im Bass, horizontal"),
                 ("5–10", "", "Stiche in der Mitte, horizontal"),
                 ("0–7", "", "Stiche im Diskant, vertikal")],
        "points": ["Der Hammerkopf verliert jede Spannung – sie wird in den Forte-Keil übertragen. Deshalb in fast jedem Fall empfehlenswert.",
                   "Arbeitszone zwischen 9 und 10 Uhr sowie 2 und 3 Uhr; immer von unten nach oben – nicht in Unterfilz oder Holzkern stechen.",
                   "Nadelhalter mit 2–3 Nadeln, 0,6–0,8 mm, ca. 9 mm lang. Drücken ist wirksamer und dauerhafter als Hacken.",
                   "Vorintonation, Schleifen, Formen und Bügeln können schon vor dem Leimen erfolgen."],
        "tools": "Intoniervorrichtung für Flügel- und Klavierhammerköpfe (43-0005642) · Nadelhalter Profi, 3 Nadeln (43-0003270) · Intoniernadel Nr. 7, Ø 0,60 mm (43-0003426)",
        "kpi_style": "compact",
        "source": "IN S. 12–15",
    },
    {
        "layout": "split", "ch": 7,
        "title": "Saiten setzen und nivellieren – Grundlage für jeden Hammerkopf",
        "points": ["Stimmung auf 440 Hz oder höher; von hinten nach vorn arbeiten: Anhangstift › Stegstifte › Agraffe.",
                   "Saite mit Messingmeißel und leichtem Hammer vorsichtig auf den Stift klopfen – am Steg erst den hinteren, dann den vorderen Stift.",
                   "Klar definierte Auflagen: Je satter die Saite aufliegt, desto kraftvoller der Klang. Die Saite darf sich nicht ins Stegholz drücken (Nebengeräusche).",
                   "Nivellieren: alle Saiten anheben und in der Agraffe auf ein einheitliches Niveau bringen, Chöre im Diskant ausrichten – auf finaler Stimmhöhe."],
        "callout": "„Der beste Hammerkopf kann nur die Funktion erfüllen, die zuvor in das Instrument programmiert wurde.“",
        "media": gal(img(IN + "page_16_2_Image274.jpg"), img(IN + "page_18_3_Image283.jpg"), cols=1),
        "source": "IN S. 16–18",
    },
    {
        "layout": "kpi", "ch": 7,
        "title": "Anschlagpunkt im Diskant prüfen – hier lässt sich viel verbessern",
        "kpis": [("69–88", "", "Töne, bei denen ein neu gesetzter Anschlagpunkt den Diskant vieler Instrumente verbessern kann")],
        "points": ["Zuerst alle Hämmer wieder auf die Saiten ausrichten.",
                   "Anschlagpunkt von Ton 88 prüfen: die Klaviatur hinein- und herausschieben, um die beste Stelle zu finden.",
                   "Geradheit aller Hammerköpfe prüfen: mit dem Haken anheben und zupfen, die Stoßzunge mit dem Finger anheben und zupfen – oder leicht antippen und hören.",
                   "Was korrigiert werden muss, mit Kreide auf der Taste markieren."],
        "media": img(IN + "page_20_2_Image291.jpg"),
        "source": "IN S. 19–20",
    },
    {
        "layout": "triad", "ch": 7,
        "title": "Hämmer zu den Saiten abziehen: Krone hohl, okay oder schief",
        "items": ["Krone hohl", "Krone okay", "Krone schief"],
        "highlight": 1,
        "points": ["Unebenheiten im Saitenchor und das Travellieren verändern die Oberfläche des Hammerkopfs – sie muss angepasst werden.",
                   "Feines Abziehen mit der Hammerfeile – welches Werkzeug, entscheiden Sie selbst."],
        "media": img(IN + "page_21_2_Image294.jpg"),
        "source": "IN S. 21",
    },
    {
        "layout": "split", "ch": 7,
        "title": "Zwischenintonation: ungleiche Abschnitte finden und ausgleichen",
        "points": ["Chromatisch rauf und runter spielen – auf Abschnitte mit anderem Charakter, anderer Lautstärke oder anderem Gefühl hören.",
                   "Zu hart? Im grünen (Forte-) und orangen (Piano-)Keil arbeiten.",
                   "Vorsichtig, aber nicht ängstlich stechen – bei Unsicherheit Werkzeuge mit unterschiedlicher Nadellänge vorbereiten.",
                   "Zu weich geworden? Mit leichtem Schleifen korrigieren.",
                   "Ein ausgewogenes Klangspektrum über die ganze Klaviatur – und den Charakter des Instruments akzeptieren."],
        "media": img(IN + "page_22_2_Image298.jpg"),
        "source": "IN S. 22",
    },
    {
        "layout": "kpi", "ch": 7,
        "title": "Feinintonation: am Scheitel höchstens 2 mm tief",
        "kpis": [("2", "mm", "maximale Stichtiefe am Scheitel")],
        "points": ["Einzelne Töne mit anderem Charakter oder anderer Lautstärke finden – mit einer kurzen Einzelnadel ausgleichen.",
                   "Im Piano- (orange) und Pianissimo-Keil (lila) arbeiten – an die „rote Zone“ denken.",
                   "Leichtes, flaches Nadeln am oder knapp unter dem Scheitel. Das ist schnell übertrieben – langsam vorgehen.",
                   "Zwischen den Saitenabdrücken arbeiten, nicht direkt darin."],
        "tools": "Nadelhalter BDK, Messing, für 4 Nadeln (43-0003269) · Nadelhalter Chop Stick (43-0003271)",
        "media": img(IN + "page_23_2_Image307.jpg"),
        "source": "IN S. 23",
    },
    {
        "layout": "split", "ch": 7,
        "title": "Verschiebungsintonation: zum Schluss – mit besonderer Sorgfalt",
        "points": ["Zum Schluss die Verschiebung korrekt einstellen.",
                   "Mit getretenem Pedal chromatisch spielen und auf Gleichmäßigkeit hören.",
                   "Besonders sorgfältig arbeiten, denn die Hauptintonation kann beeinflusst werden – immer nur an den direkt betroffenen Saiten.",
                   "Danach die Balance ohne Pedal prüfen."],
        "callout": "Expertentipp: Die linke Kante der Hammerkrone mit feiner Schleifpapierfeile leicht brechen – das erleichtert die Arbeit und verhindert Nebengeräusche.",
        "media": img(IN + "page_24_2_Image311.png"),
        "source": "IN S. 24",
    },
    {
        "layout": "closing",
        "statement": "Der beste Hammerkopf kann nur die Funktion erfüllen, die zuvor in das Instrument programmiert wurde.",
        "sub": "Eines führt zum anderen, und alles hängt mit allem zusammen.",
        "thanks": "Vielen Dank für Ihr Interesse.",
        "contact": ["Louis Renner GmbH · Max-Planck-Straße 18–24 · 71116 Gärtringen",
                    "info@louis-renner.de · Renner Academy"],
        "link": ("Video zur Filzherstellung: YouTube-Kanal der Filzfabrik Wurzen", "https://youtu.be/IA7lZXILLk4"),
        "bg": WEB + "renner-hammerkoepfe-2.jpg",
        "title": "Vielen Dank",
        "source": "IN S. 8, 17 · HK S. 35 · WEB",
        "notes": "Abschluss: Kernbotschaft ein drittes Mal. Danach Fragen.",
    },
]

assert len(SLIDES) == 68, len(SLIDES)
