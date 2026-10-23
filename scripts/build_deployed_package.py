#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_deployed_package.py
Erstellt den vollstaendigen, autarken "Deployed/"-Ordner fuer Apple Tablets (iPad / iPadOS),
Android-Tablets, Smartphones, SharePoint und Offline-Praesentationen.

Inhalte des Deployed/-Ordners:
1. index.html - Standard-HTML fuer Webserver, SharePoint & Safari
2. index_offline_tablet.html - Single-File Standalone Bundle mit eingebetteten CSS & JS,
   optimiert fuer die iOS Dateien-App (Files app), AirDrop und Offline-Nutzung ohne Server.
3. Start_SharePoint.aspx & presentation.aspx - Direktstart in Microsoft SharePoint / Teams
4. manifest.json & sw.js - Progressive Web App (PWA) fuer Vollbild-Start vom iPad Home-Bildschirm
5. css/ & js/ - Alle vorkompilierten Stylesheets und Skripte (inkl. aller 4 Sprachen DE, EN, JA, ZH)
6. Visuell/ - Alle Bild- und Videodateien
7. ANLEITUNG_IPAD_TABLET.md & LIESMICH.txt - Schritt-fuer-Schritt-Anleitung
8. Start_Windows.bat & Start_Mac.command - Desktop-Schnellstarter
"""

import os
import sys
import shutil
import re
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPLOY_DIR = os.path.join(BASE_DIR, "Deployed")

def log(msg):
    print(f"[DEPLOY] {msg}")

def ensure_prerequisites():
    log("Pruefe und synchronisiere Text- und Folieninhalte...")
    # 1. build_full_presentation.py ausfuehren
    build_py = os.path.join(BASE_DIR, "build_full_presentation.py")
    res = subprocess.run([sys.executable, build_py], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        log(f"WARNUNG: build_full_presentation.py Rueckgabewert: {res.stderr}")
    else:
        log("✓ index.html und ASPX-Dateien aktuell.")

    # 2. manage_translations.py --apply ausfuehren
    manage_trans_py = os.path.join(BASE_DIR, "translations", "manage_translations.py")
    res = subprocess.run([sys.executable, manage_trans_py, "--apply"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        log(f"WARNUNG: manage_translations.py Rueckgabewert: {res.stderr}")
    else:
        log("✓ Uebersetzungen (DE, EN, JA, ZH) kompiliert in js/translations-data.js.")

def copy_directory_fast(src, dst):
    """Kopiert ein Verzeichnis, nutzt wenn moeglich APFS Clone auf Mac."""
    if os.path.exists(dst):
        shutil.rmtree(dst)
    
    # Auf macOS cp -cR probieren fuer verzweigte APFS-Clones (sekundenschnell, spart Speicher)
    if sys.platform == "darwin":
        res = subprocess.run(["cp", "-cR", src, dst], capture_output=True)
        if res.returncode == 0:
            return
    shutil.copytree(src, dst)

def build_offline_tablet_html():
    """Erzeugt index_offline_tablet.html mit eingebetteten CSS- und JS-Dateien."""
    index_path = os.path.join(BASE_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. CSS einbetten
    css_path = os.path.join(BASE_DIR, "css", "presentation.css")
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_code = f.read()
        css_tag = f"<style>\n/* Louis Renner Presentation Styles (Embedded Standalone) */\n{css_code}\n</style>"
        html = re.sub(r'<link\s+rel="stylesheet"\s+href="css/presentation\.css(?:\?[^"]*)?">', lambda m: css_tag, html)

    # 2. JS-Dateien einbetten
    js_files = [
        "translations.js",
        "translations-data.js",
        "audio-synth.js",
        "timelapse.js",
        "history-journey.js",
        "transformation-journey.js",
        "ffw-history.js",
        "felt-anatomy.js",
        "yamaha-kit.js",
        "presentation.js"
    ]

    for js_name in js_files:
        p = os.path.join(BASE_DIR, "js", js_name)
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                js_code = f.read()
            # Ersetze das Script-Tag (Verwendung von lambda verhindert Python re-escape Fehler bei \d o.ä.)
            pattern = re.compile(rf'<script\s+src="js/{re.escape(js_name)}"></script>')
            replacement = f'<script>\n/* Embedded {js_name} */\n{js_code}\n</script>'
            html = pattern.sub(lambda m, r=replacement: r, html)

    target_path = os.path.join(DEPLOY_DIR, "index_offline_tablet.html")
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(html)
    log(f"✓ Standalone Tablet-Datei erstellt: Deployed/index_offline_tablet.html ({len(html)//1024} KB)")

def create_instructions():
    """Erzeugt ausfuehrliche Anleitungsdokumente im Deployed-Ordner."""
    md_content = """# 🎹 Louis Renner Masterclass Präsentation – Standalone Deployment für Tablets & Mobile Endgeräte

Dieses Verzeichnis (`Deployed/`) enthält die **vollständig vorinstallierte und autarke Version** der Louis Renner Masterclass Konferenz-Präsentation 2025.

> **Wichtig:** Auf dem Tablet ist **keine** Datensynchronisation, kein Python, kein Terminal und kein Server erforderlich! Alle 65 Folien und sämtliche Übersetzungen (Deutsch, Englisch, Japanisch, Chinesisch) sind bereits vollständig vorkompiliert.

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
"""

    txt_content = """======================================================================
  LOUIS RENNER MASTERCLASS 2025 - STANDALONE TABLET DEPLOYMENT
======================================================================

SO STARTEN SIE DIE PRAESENTATION AUF DEM IPAD / TABLET:

1. Ordner "Deployed" auf das iPad kopieren (AirDrop, iCloud, USB-Stick).
2. In der Apple "Dateien"-App oeffnen:
   --> Doppeltipp auf "index_offline_tablet.html" (Empfohlen!)
   oder
   --> Doppeltipp auf "index.html"

3. ALS VOLLBILD-APP AUF DEM HOME-BILDSCHIRM SPEICHERN:
   In Safari auf "Teilen" (Viereck mit Pfeil) -> "Zum Home-Bildschirm".
   Es erscheint ein App-Icon, das die Praesentation im Vollbild startet!

SPRACHEN:
   Oben rechts im Menue (Zahnrad) waehlbar:
   - Deutsch
   - English
   - 日本語 (Japanisch)
   - 中文 (Chinesisch)

WEITERE SYSTEME:
- SharePoint Online: Start_SharePoint.aspx oeffnen
- Windows PC: Start_Windows.bat doppelklicken
- Mac: Start_Mac.command doppelklicken
======================================================================
"""

    with open(os.path.join(DEPLOY_DIR, "ANLEITUNG_IPAD_TABLET.md"), "w", encoding="utf-8") as f:
        f.write(md_content)

    with open(os.path.join(DEPLOY_DIR, "LIESMICH.txt"), "w", encoding="utf-8") as f:
        f.write(txt_content)
    log("✓ Anleitungsdateien ANLEITUNG_IPAD_TABLET.md und LIESMICH.txt erstellt.")

def main():
    log("Starte Erstellung des Deployed-Ordners...")
    ensure_prerequisites()

    os.makedirs(DEPLOY_DIR, exist_ok=True)

    # 1. Basis-Dateien kopieren (Start_Mac.app, Start_Mac.command, Start_Windows.bat & ASPX liegen direkt in Deployed/)
    files_to_copy = [
        "index.html",
        "manifest.json",
        "sw.js",
        "server.py",
        "Start_Windows.bat"
    ]

    for fname in files_to_copy:
        src = os.path.join(BASE_DIR, fname)
        dst = os.path.join(DEPLOY_DIR, fname)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            log(f"✓ Kopiert: {fname}")

    # 2. Ordner kopieren
    log("Kopiere css/...")
    copy_directory_fast(os.path.join(BASE_DIR, "css"), os.path.join(DEPLOY_DIR, "css"))

    log("Kopiere js/...")
    copy_directory_fast(os.path.join(BASE_DIR, "js"), os.path.join(DEPLOY_DIR, "js"))

    # PowerShell Hilfsskript fuer Windows Server falls noetig
    os.makedirs(os.path.join(DEPLOY_DIR, "scripts"), exist_ok=True)
    ps_src = os.path.join(BASE_DIR, "scripts", "server_windows.ps1")
    if os.path.exists(ps_src):
        shutil.copy2(ps_src, os.path.join(DEPLOY_DIR, "scripts", "server_windows.ps1"))

    # 3. Visuell/ kopieren
    log("Kopiere Medienordner Visuell/ (kann einen Moment dauern)...")
    copy_directory_fast(os.path.join(BASE_DIR, "Visuell"), os.path.join(DEPLOY_DIR, "Visuell"))
    log("✓ Visuell/ erfolgreich kopiert.")

    # 4. Standalone Tablet HTML Datei generieren
    build_offline_tablet_html()

    # 5. Anleitungen schreiben
    create_instructions()

    log("======================================================================")
    log("🎉 DEPLOYMENT ERFOLGREICH ABGESCHLOSSEN!")
    log(f"Zielordner: {DEPLOY_DIR}")
    log("Alle Standalone-Komponenten sind einsatzbereit für iPad, Tablets & Mobile.")
    log("======================================================================")

if __name__ == "__main__":
    main()
