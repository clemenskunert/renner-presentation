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
├── index.html                   # Haupt-Präsentationsanwendung
├── server.py                    # Lokaler Webserver (HTTP 206 Partial Content für Video-Streaming)
├── README.md                    # Dokumentation
├── .gitignore                   # Ausschluss großer Binärdateien (>100MB)
├── css/
│   └── presentation.css         # Styling (Concert Grand Dark/Gold/Renner-Grün, Responsive HUD)
├── js/
│   ├── presentation.js          # Präsentations-Engine, Slider, Widgets, Gesten
│   ├── translations.js          # Mehrsprachiges Wörterbuch (DE, EN, JA, ZH)
│   └── audio-synth.js           # Web Audio API Obertongenerator mit Canvas-Oszilloskop
├── Visuell/
│   ├── Bilder/
│   │   ├── 01_Geschichte/       # Historische Fotos (Werkstatt 1882, Werk Stuttgart, Mechaniken)
│   │   ├── 02_Meuselwitz_Umbau/ # 25 kuratierte Fotos vom Umbau, Transport & Inbetriebnahme
│   │   ├── 03_Fertigung_Filz_FFW/# FFW Wurzen Merinowolle, Vliesbildung, Filzlager, Roboter
│   │   ├── 04_Fertigung_Holzkern_Pressung/# Unterfilz, Holzkernfräsen, Heißpressen, Spannungsverlauf
│   │   ├── 05_CNC_Bohrung_Nietung/# Hammerkopfleisten, Diamantschnitt, T-Nieten, Winkelbohrung
│   │   ├── 06_Hammerkopf_Spezifikation/# Makroaufnahmen, Bemaßung, Modellvielfalt
│   │   ├── 07_Yamaha_Kit/       # High-End Fotos Yamaha-Kit Edelkassette & Einschraubmontage
│   │   ├── 08_Intonation_Voicing/# 3-Nadel-Intonation, Abziehfeile & Scheitelschliff
│   │   └── Layout_Vorlagen/     # Offizielle Renner Logos, Banner und Folienlayouts
│   └── Videos/
│       ├── 01_roboter_filzzuschnitt.mp4  # Video 1: Roboter-Filzzuschnitt
│       ├── 02_unterfilz_profilieren.mp4  # Video 2: Unterfilzprofilierung
│       ├── 03_holzkern_profil_fraesen.mp4# Video 3: Holzkernfräsen
│       ├── 04_hammerkopf_pressen_leimen.mp4 # Video 4: Pressen & Heißleimen
│       └── 05_hammerkopf_bohren_nieten.mp4  # Video 5: Bohren & T-Nieten
└── Präsentation - Basis/
    ├── Hammerkopf_Japan_040325.pdf      # Original Basis-Präsentation (PDF)
    └── Hammerkopf_Japan_040325.pptx     # Original Großdatei (Lokal gesichert)
```

---

## 🏛️ Kontakt & Urheber

- **Unternehmen:** Louis Renner GmbH
- **Neuer Hauptsitz:** Meuselwitz, Deutschland
- **Referent:** Clemens Kunert
- **Website:** [www.louis-renner.de](https://www.louis-renner.de/)
