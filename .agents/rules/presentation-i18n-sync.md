# Regel: Synchronisation von Präsentations-Änderungen und Übersetzungstexten

## Verbindliche Vorgabe
Bei **jeder Anpassung, Erweiterung oder Korrektur** an der Präsentation, den Folien, Texten, Titeln, Karten oder Referenten-Notizen **müssen zwingend auch die Übersetzungs- und Text-Dokumente synchron gehalten werden**.

## Betroffene Dateien
1. **Master-Datei:** [`translations/slides_content.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/slides_content.json)
   - Deutsche Ausgangstexte (`"de"`) aktualisieren.
   - Übersetzungen für Englisch (`"en"`), Japanisch (`"ja"`) und Chinesisch (`"zh"`) entsprechend anpassen bzw. ergänzen.
2. **Build & Kompilierung:**
   - Nach Text- oder Folienänderungen stets ausführen:
     ```bash
     python3 translations/manage_translations.py --apply
     ```
   - Dadurch werden automatisch aktualisiert:
     - [`translations/locales/de.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/locales/de.json), [`en.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/locales/en.json), [`ja.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/locales/ja.json), [`zh.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/locales/zh.json)
     - [`js/translations-data.js`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/js/translations-data.js) (für die Live-Umschaltung im Browser)
     - [`slide_definitions.py`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/slide_definitions.py) & [`index.html`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/index.html) mit den korrespondierenden `data-i18n`-Attributen
3. **Neue Folien oder Elemente:**
   - Werden neue Textelemente (Titel, Karten, Badges, Aufzählungen, Notizen) angelegt, erhalten diese immer ein eindeutiges `data-i18n`-Attribut (`s{Foliennummer}_...`) und werden im Master-JSON hinterlegt.
