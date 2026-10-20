# 🎹 Louis Renner Masterclass Präsentation – Standalone Deployment für Tablets & Mobile Endgeräte

Dieses Verzeichnis (`Deployed/`) enthält die **vollständig vorinstallierte und autarke Version** der Louis Renner Masterclass Konferenz-Präsentation 2025.

> **Wichtig:** Auf dem Tablet ist **keine** Datensynchronisation, kein Python, kein Terminal und kein Server erforderlich! Alle 66 Folien und sämtliche Übersetzungen (Deutsch, Englisch, Japanisch, Chinesisch) sind bereits vollständig vorkompiliert.

---

## 📱 1. Nutzung auf dem Apple iPad / Tablet (Offline)

### Methode A: Direkt aus der Apple „Dateien“-App (Files App)
1. Kopieren Sie den Ordner `Deployed` auf Ihr iPad (über AirDrop, USB-C Stick, iCloud Drive oder OneDrive).
2. Öffnen Sie die App **„Dateien“** auf dem iPad.
3. Tippen Sie im Ordner `Deployed` auf:
   - **`index_offline_tablet.html`** (Empfohlen: Alle Skripte und Stile sind direkt eingebettet – öffnet sofort ohne Einschränkungen der Apple-Sandbox).
   - Alternativ tippen Sie auf **`index.html`**.

### Methode B: Als echte Vollbild-App auf dem Home-Bildschirm speichern (PWA)
1. Öffnen Sie `index.html` oder `index_offline_tablet.html` in **Safari**.
2. Tippen Sie oben rechts (oder in der Navigationsleiste) auf das **Teilen-Symbol** (Viereck mit Pfeil nach oben `↑`).
3. Scrollen Sie in der Liste nach unten und tippen Sie auf **„Zum Home-Bildschirm“** (Add to Home Screen).
4. Bestätigen Sie mit **„Hinzufügen“**.
5. **Fertig:** Auf Ihrem iPad-Bildschirm erscheint das goldene **Louis Renner App-Icon**. Beim Antippen öffnet sich die Präsentation im **randlosen Vollbildmodus** – genau wie eine native iPad-App!

### Wischgesten auf dem iPad:
- **Nach links wischen:** Nächste Folie
- **Nach rechts wischen:** Vorherige Folie
- **Modul-Sprung:** Oben rechts auf `⊞ Module (Folie 2)` tippen
- **Sprachauswahl:** Oben rechts auf das Zahnrad / Menü tippen (Deutsch, Englisch, Japanisch, Chinesisch)

---

## ☁️ 2. Nutzung über Microsoft SharePoint & Teams

Wenn Sie die Präsentation im SharePoint-Portal Ihres Unternehmens hinterlegen:
- Öffnen Sie direkt die Datei **`Start_SharePoint.aspx`** oder **`presentation.aspx`**.
- SharePoint Online führt diese Datei direkt im Webbrowser aus – ohne Download und auf jedem Endgerät (iPad, Mac, Windows, Android).

---

## 💻 3. Nutzung auf Windows PC & Mac

Falls der Ordner auf einen PC oder Mac kopiert wird:
- **Windows:** Doppelklick auf `Start_Windows.bat` (startet automatisch den lokalen Server & öffnet den Browser).
- **Mac:** Doppelklick auf `Start_Mac.app` (bequeme App mit Icon) oder `Start_Mac.command`.
- **Ohne Server:** Doppelklick direkt auf `index.html` oder `index_offline_tablet.html`.

---

## 📂 Struktur des Deployed-Ordners

| Datei / Ordner | Zweck |
| :--- | :--- |
| **`index_offline_tablet.html`** | **Beste Wahl für iPad & Tablets:** 100% offline, alle Skripte eingebettet, keine Sandbox-Blockaden. |
| **`index.html`** | Standard-Webversion für Browser und Server. |
| **`Start_SharePoint.aspx`** | Direkte Ausführung in SharePoint Online / Teams. |
| **`manifest.json` & `sw.js`** | PWA-Konfiguration für die Installation als Vollbild-App auf iPad & Android. |
| **`Visuell/`** | Alle Bilder, Meisterklasse-Dokumente und hochauflösenden Medien. |
| **`css/` & `js/`** | Modulare Stylesheets und vorkompilierte Übersetzungsdaten. |
| **`Start_Windows.bat`** | 1-Klick-Starter für Windows-Rechner. |
| **`Start_Mac.app` & `Start_Mac.command`** | 1-Klick-Starter für macOS (mit App-Icon bzw. Shell-Skript). |
