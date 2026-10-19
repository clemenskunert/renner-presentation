# Louis Renner – Konferenz-Präsentation 2025 (Tokio & Shanghai)
### *The Heart of the Piano / Das Herzstück des Klaviers*

Interaktive, animierte HTML5-Präsentationsplattform der **Louis Renner GmbH** für internationale Fachkonferenzen in **Japan** und **China**.

---

## 🎹 Inhaltsübersicht

Die Präsentation gliedert sich in 4 Hauptteile über 25 hochauflösende interaktive Folien:

1. **Teil 1: Einführung & Meuselwitz**
   - **Historie & Bedeutung:** Gegründet 1882 in Stuttgart durch Louis Renner. Über 140 Jahre deutsche Spitzeningenieurskunst und weltweiter Marktführer für Klaviermechaniken und Hammerköpfe (Partner von über 90 % der führenden Konzertflügelhersteller wie Steinway & Sons, Bösendorfer, Schimmel, Fazioli etc.).
   - **Strategische Weichenstellung:** Zusammenlegung der bisherigen Standorte (Gärtringen bei Stuttgart und Meuselwitz) am neuen, hochmodernen **Hauptsitz Meuselwitz** (Thüringen).
   - **Interaktive Fotogalerie & Zeitstrahl:** Der Umbau, Schwertransport der Präzisionsmaschinen und die neuen Produktionshallen 2026.

2. **Teil 2: Hammerkopf-Produktion & Neue Produktqualität**
   - **Filzfertigung & Rohstoffexklusivität:** Partnerschaft mit der traditionsreichen **Filzfabrik Wurzen (FFW)** (seit 1783). 100 % feinste Merinowolle, schonende Carbonisierung zur Schonung der natürlichen Faserelastizität.
   - **Präzisions-Produktionsschritte (mit Videos):**
     - *Video 1:* Neuer Roboter-Zuschnitt – Vollautomatischer, scherspannungsfreier Trapezzuschnitt.
     - *Video 2:* Profilierung des Unterfilzstreifens – Elastische Spannungsbasis.
     - *Video 3:* CNC-Fräsen des Holzkerns aus feinjähriger Weißbuche (Hornbeam).
     - *Video 4:* Thermodynamisches Pressen & Heißleimen unter Tonnen kalibriertem Druck.
     - *CNC Finish:* Leistenkonditionierung und mikrometergenaue Einzelkopftrennung.
     - *Video 5:* CNC-Bohrung mit individuellen Winkeln und T-Drahtheftung für extreme dynamische Langlebigkeit.
   - **Klangspektrum nach Maß:** Gezielte Formung der akustischen Obertöne (Romantisch-warm, Konzert-Standard, Modern-brillant).
   - **Interaktiver Web-Audio Klangsimulator:** Hör- und sichtbare Darstellung der Obertöne bei unterschiedlicher Filzhärte.

3. **Teil 3: Spezifikation & Das Neue RENNER YAMAHA-KIT**
   - **Kunden-Spezifikation:** Bohrungsabstand, Winkelprogression, Grammaturstaffelung und Mensuranpassung.
   - **Das neue Renner Yamaha-Kit (HIGHLIGHT!):**
     - Komplett fertig eingeleimte, zentrierte Hammerstiele mit Hammerköpfen für Yamaha-Flügel.
     - **Plug & Play:** Einfach alte Kapseln abschrauben und Renner-Kit einschrauben.
     - **Keine Vorintonation nötig:** Werkseitig perfekt vorkonditioniert.
     - Zeitersparnis von 2–3 Werkstatttagen auf 1–2 Stunden!

4. **Teil 4: Die Hohe Kunst des Intonierens (Voicing Masterclass)**
   - Philosophie und elastische Wirkzonen am Hammerkopf.
   - **Interaktives Zonendiagramm:** Scheitel (Attack), Schultern (Klangfarbe/Obertöne), Flanken (Fortissimo-Klangfülle).
   - **Abziehen & Schleifen (Filing):** Korrekte Schleifrichtung (von der Schulter zum Scheitel), 240/400er Körnung.
   - **Konzertsaal-Feinintonation:** Heißbügeln, Nadelungstiefe, Raumakustik-Anpassung.

---

## 🚀 Lokalen Server starten

Die Präsentation läuft über den integrierten HTTP/206 Streaming-Server:

```bash
# Server starten (Port 8080)
python3 server.py
```

Anschließend im Browser öffnen:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🎮 Steuerung & Konferenz-Features

| Taste | Funktion |
| :--- | :--- |
| `→` / `Leertaste` / `Bild ↓` | Nächste Folie |
| `←` / `Backspace` / `Bild ↑` | Vorherige Folie |
| `Pos 1` / `Ende` | Erste / Letzte Folie |
| `F` | Vollbildmodus an/aus |
| `N` | Referenten-Notizen Drawer ein-/ausblenden |
| `G` oder `O` | Folien-Rasterübersicht (Grid Overview) |
| `L` | Virtueller roter Laserpointer (folgt Mauszeiger) |
| `S` | Interaktiver Klangsynthesizer / Spektrumanalysator |
| `DE` / `EN` / `日本語` / `中文` | 4-Sprachen-Umschalter für Vorträge in Asien & international |

---

## 📁 Projekt- & Ordnerstruktur

```text
├── index.html                   # 67-Folien Masterclass Präsentation (kompiliert)
├── server.py                    # Lokaler Webserver (HTTP 206 Partial Content + REST-API)
├── build_full_presentation.py   # Rebuild-Skript für index.html aus slide_definitions.py
├── slide_definitions.py         # Maßgebliche Python-Folien- und Komponenten-Definitionen
├── image-manager.html           # Visuelles Redaktionswerkzeug für Bildtitel & Übersetzungen
├── image_manager_backend.py     # Backend-Service für Bildkatalogisierung & Synchronisation
├── AGENTS.md                    # Verbindliche Entwickler- & KI-Richtlinien
├── README.md                    # Projektdokumentation & Bedienungsanleitung
├── .gitignore                   # Ausschluss von OS-Junk & lokalen Binärdateien
├── css/
│   └── presentation.css         # Styling (Concert Grand Dark/Gold/Renner-Grün, Responsive HUD)
├── js/
│   ├── presentation.js          # Haupt-Engine (Tastatur-Navigation, Zoom, Gesten, Laser)
│   ├── history-journey.js       # Interaktive Baum-Zeitleiste (1882 – Heute) für Folie 3
│   ├── transformation-journey.js# Baudokumentation & Meilensteine (2025–2026) für Folie 4
│   ├── audio-synth.js           # Web Audio API Obertongenerator mit Canvas-Oszilloskop
│   ├── translations.js          # Mehrsprachiges Umschalt- & Anzeigesystem
│   └── translations-data.js     # Kompilierte Übersetzungsdatenbank (DE, EN, JA, ZH)
├── translations/
│   ├── manage_translations.py   # Zentrales Übersetzungs- & Synchronisations-Tool
│   ├── slides_content.json      # Master-JSON aller Folientexte & Bildbeschreibungen
│   ├── translations_export.csv  # CSV-Export für externe Übersetzer / Tabellenkalkulation
│   └── locales/                 # Generierte Einzeldateien (de.json, en.json, ja.json, zh.json)
├── Praesentation_Basis/         # Technische Original-Quellendokumente (PDFs & Transkripte)
│   ├── 2012_Buch_Intonieren_Burkard_Olbrich.pdf
│   ├── Hammerkopf_Japan_040325.pdf
│   ├── HK_Prd_Auswahl_10_25.pdf
│   ├── HSt_Kap_Auswahl_MTK_10_25.pdf
│   ├── EN_GP_HK_Glueing_10_25.pdf
│   ├── Intonation_10_25.pdf
│   └── extracted_texts/         # Texttranskripte aller 6 Basisdokumente
├── Visuell/
│   ├── Bilder/
│   │   ├── 01_Geschichte/       # Chronologisch benannte Archivfotos (01_YYYY_...)
│   │   ├── 02_Umbau_und_Umzug/  # 48 Baudokumentationsfotos der Meuselwitz-Transformation
│   │   ├── 03_Hammerkopf_Fertigung/ # Fertigungsschritte (Filz, Kern, Pressen, Fräsen)
│   │   ├── 04_Hammerkopf_Spezifikation/ # Bemaßungen, Bohrungen & Gon-Winkel
│   │   ├── 05_Yamaha_Kit/       # Fotodokumentation zum Yamaha Drop-In Kit
│   │   ├── 06_Intonation/       # 34 kuratierte Fachfotos meisterlicher Intonationsschritte
│   │   ├── Layout_Vorlagen/     # Renner Logos, Wasserzeichen & Master-Layouts
│   │   └── Referenz_Olbrich_Buch/ # 26 REM-Aufnahmen & Abbildungen aus dem Olbrich-Buch
│   ├── Video/
│   │   ├── steinwayshort.mp4    # Aktives Video zur Steinway & Sons Partnerschaft
│   │   ├── bfl_marke_steinwaysons.mp4 # Vollständiges Ausgangsvideo
│   │   └── project_files/       # Premiere Pro Projektdateien & Sicherungen
│   └── web_assets/              # Vektorlogos renommierter Klaviermarken & Renner
├── docs/                        # Fachdokumentationen (Olbrich-Kompendium, Sander-Methodik)
└── scripts/
    └── archive/                 # Archivierte Migrations- & Generierungsskripte
```

---

## 🏛️ Kontakt & Urheber

- **Unternehmen:** Louis Renner GmbH
- **Neuer Hauptsitz:** Meuselwitz, Deutschland
- **Referent:** Clemens Kunert
- **Website:** [www.louis-renner.de](https://www.louis-renner.de/)
