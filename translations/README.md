# 🌍 Louis Renner Masterclass 2025 – Text- & Übersetzungs-Management

Diese Struktur ermöglicht es Ihnen, **alle Texte der 67 Präsentationsfolien einfach anzupassen** und **Übersetzungen in Deutsch (DE), Englisch (EN), Japanisch (JA) und Chinesisch (ZH) zu hinterlegen und zu verwalten** – ohne jemals HTML-Code oder komplexe Python-Formatierungen bearbeiten zu müssen.

---

## 📁 Ordner- & Dateiübersicht

```text
translations/
├── slides_content.json         # 👑 Die Master-Datei: Alle 67 Folien mit Texten in DE, EN, JA, ZH
├── manage_translations.py      # 🛠️ Das Steuerungs-Werkzeug (Status, Build, Export/Import)
├── README.md                   # 📖 Diese Anleitung
├── translations_export.csv     # 📊 Excel-Tabelle für einfache Bearbeitung & Übersetzungsagenturen
└── locales/                    # 🌐 Einzelne Sprachdateien (JSON)
    ├── de.json                 # Deutscher Ausgangstext (657 Elemente)
    ├── en.json                 # Englische Übersetzung (657 Elemente)
    ├── ja.json                 # Japanische Übersetzung (日本語, 657 Elemente)
    └── zh.json                 # Chinesische Übersetzung (中文, 657 Elemente)
```

---

## 🚀 Die 3 Wege, Texte anzupassen & Übersetzungen zu hinterlegen

Sie können den für Sie bequemsten Weg wählen:

### Weg 1: Direkt in der Master-Datei `slides_content.json` (Empfohlen)
Öffnen Sie `translations/slides_content.json` in Ihrem Editor (z. B. VS Code, Antigravity, TextEdit).

Jede Folie ist klar gegliedert:
```json
"slide_18": {
  "slide_number": 18,
  "chapter": 3,
  "category": {
    "de": "Teil 3: Hammerkopf-Produktion • Roboter-Zuschnitt",
    "en": "Part 3: Hammerhead Production • Robotic Cutting",
    "ja": "第3部：ハンマーヘッド製造 • ロボット裁断工程",
    "zh": "第三部分：弦槌高精制造工艺 • 六轴机器人毛毡裁切"
  },
  "title": {
    "de": "Robotischer Filzzuschnitt: Höchste Schnittpräzision",
    "en": "Robotic Felt Cutting: Supreme Cutting Accuracy",
    "ja": "ロボットによるフェルト裁断：極限の幾何精度",
    "zh": "工业机器人毛毡精准裁切：零剪切应力工艺"
  },
  "subtitle": {
    "de": "Automatisiertes Trennen der Filzplatten in exakt proportionierte Deckfilzstreifen",
    "en": "Automated slicing of felt sheets into precisely proportioned top felt strips",
    "ja": "フェルト原反から外側トップフェルト条片への完全自動精密スリット加工",
    "zh": "厚板羊毛毡全自动高精分割，生成严格符合梯度梯形截面的顶毡条"
  },
  "elements": {
    "s18_bullet_1": {
      "de": "<strong>Präzisions-Robotik:</strong> 6-Achs-Roboter führt das Spezial-Schneidmesser...",
      "en": "<strong>Precision Robotics:</strong> 6-axis robot guides the specialized blade...",
      "ja": "<strong>精密ロボティクス：</strong> 6軸多関節ロボットが専用特殊カッターを...",
      "zh": "<strong>六轴高精工业机器人：</strong> 机械臂匀速平稳引导特种切刀..."
    }
  },
  "notes": {
    "de": "Folie 18: Erläutern Sie den Roboter-Zuschnitt...",
    "en": "Slide 18: Explain the robotic cutting process...",
    "ja": "スライド 18: ロボット裁断工程を解説し...",
    "zh": "第 18 页：向嘉宾详细讲解六轴机器人下料工艺..."
  }
}
```
- **Text anpassen:** Ändern Sie einfach den Text unter `"de"`.
- **Übersetzung hinterlegen:** Tragen Sie die Übersetzung unter `"en"`, `"ja"` oder `"zh"` ein.

Nach dem Speichern einmal im Terminal ausführen:
```bash
python3 translations/manage_translations.py --apply
```

---

### Weg 2: In Microsoft Excel oder Apple Numbers (via CSV)
Besonders praktisch, wenn Sie Texte in einer Tabelle überblicken oder an Übersetzer geben möchten:

1. **Tabelle exportieren:**
   ```bash
   python3 translations/manage_translations.py --export-csv
   ```
2. Öffnen Sie `translations/translations_export.csv` in **Excel**, **Numbers** oder **Google Sheets**.
3. Spalten:
   - `Key`: Technischer Bezeichner (nicht ändern)
   - `Slide`: Foliennummer (1–68)
   - `Chapter`: Kapitel (1–7)
   - `Element`: Typ (Titel, Untertitel, Karte, Aufzählung, Notiz)
   - `DE`: Deutscher Text
   - `EN`: Englischer Text
   - `JA`: Japanischer Text
   - `ZH`: Chinesischer Text
4. Ändern oder ergänzen Sie die gewünschten Texte und speichern Sie die CSV-Datei ab.
5. **Tabelle wieder importieren & anwenden:**
   ```bash
   python3 translations/manage_translations.py --import-csv translations/translations_export.csv
   ```

---

### Weg 3: Über die Einzelsprachdateien (`translations/locales/`)
Wenn ein Übersetzer nur eine bestimmte Sprache bearbeiten soll (z. B. `ja.json` für Japanisch oder `zh.json` für Chinesisch):

1. Geben Sie die entsprechende Datei weiter:
   - `translations/locales/en.json`
   - `translations/locales/ja.json`
   - `translations/locales/zh.json`
2. Nach Rückerhalt der geänderten Datei führen Sie aus:
   ```bash
   python3 translations/manage_translations.py --sync-from-locales
   ```
   Alle Änderungen werden automatisch in die Master-Datei übernommen und in die Präsentation eingespielt.

---

## 🔍 Übersetzungsstatus prüfen

Möchten Sie wissen, wie viele Folien bereits vollständig übersetzt sind?

```bash
python3 translations/manage_translations.py --status
```

Sie erhalten eine übersichtliche Fortschrittsanzeige:
```text
Sprache              | Übersetzt    | Deckungsgrad   
----------------------------------------------------
🇩🇪 Deutsch           |   657/657   | 100.0% ████████████████████ (Original)
🇬🇧 English           |   657/657   | 100.0% ████████████████████ 
🇯🇵 日本語               |   657/657   | 100.0% ████████████████████ 
🇨🇳 中文                |   657/657   | 100.0% ████████████████████ 
----------------------------------------------------
```
Zusätzlich sehen Sie eine kapitel- und folienweise Aufstellung.

---

## 🖥️ Live-Test im Browser

1. Lokalen Server starten:
   ```bash
   python3 server.py
   ```
2. Im Browser öffnen: **[http://localhost:8080](http://localhost:8080)**
3. Oben rechts auf das **Menü-Symbol** (oder Taste `M`) klicken.
4. Zwischen **🇩🇪 DE**, **🇬🇧 EN**, **🇯🇵 日本語** und **🇨🇳 中文** umschalten:
   - Folientitel, Untertitel, Bento-Karten, Aufzählungen, Badges und Bildunterschriften wechseln **sofort und ohne Neuladen der Seite** in die gewählte Sprache!
   - Drücken Sie Taste `N`: Auch die **Referenten-Notizen** erscheinen in der gewählten Sprache!
   - Drücken Sie Taste `G`: Auch die **Folienübersicht** zeigt die übersetzten Titel!
