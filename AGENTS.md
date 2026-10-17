# Projekt-Richtlinien für KI-Assistenten & Entwickler

## 🌐 Pflicht zur Synchronisation von Folientexten & Übersetzungen
Bei **jeder** inhaltlichen oder strukturellen Änderung an der Louis Renner Präsentation (Folien, Überschriften, Beschreibungen, Bento-Karten, Bullet-Points, Referenten-Notizen) gilt:

1. **Texte & Übersetzungen immer mitpflegen:**
   - Änderungen müssen in [`translations/slides_content.json`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/slides_content.json) für Deutsch (`"de"`) und die entsprechenden Übersetzungen (`"en"`, `"ja"`, `"zh"`) nachgeführt werden.
2. **Kompilierung ausführen:**
   - Nach jeder Änderung muss der Befehl ausgeführt werden:
     ```bash
     python3 translations/manage_translations.py --apply
     ```
   - Dies aktualisiert [`js/translations-data.js`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/js/translations-data.js), [`index.html`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/index.html) und die Einzel-Locales in [`translations/locales/`](file:///Users/clemenskunert/Documents/Pr%C3%A4sentation%20-%20Renner/translations/locales).
3. **Neue Text-Elemente mit `data-i18n` versehen:**
   - Neue Texte niemals hartcodiert ohne Attribut belassen. Immer ein semantisches `data-i18n="s{Foliennummer}_..."` vergeben.
