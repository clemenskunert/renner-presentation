#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sync_all.py
Zentrales Synchronisations-Skript für die Louis Renner Präsentation.

Führt automatisch folgende Schritte aus:
1. Kompiliert Übersetzungen & generiert Folien (manage_translations.py --apply)
2. Aktualisiert Deployed-Paket & Standalone-Dateien (build_deployed_package.py)
3. Synchronisiert den aktuellen Stand 1:1 mit dem Microsoft SharePoint / OneDrive Ordner
4. Committet Änderungen und lädt alles zu GitHub (git push origin main) hoch

Aufruf:
  python3 scripts/sync_all.py
  python3 scripts/sync_all.py -m "Meine Commit-Nachricht"
"""

import os
import sys
import subprocess
import argparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Mögliche Pfade zum SharePoint-Ordner auf dem Mac
SHAREPOINT_CANDIDATE_PATHS = [
    "/Users/clemenskunert/Library/CloudStorage/OneDrive-FreigegebeneBibliotheken–Steinway&Sons/Louis Renner - Koordinationskreis Produktion MSW-Messen und Konferenzen - Dokumente/Präsentation - Renner",
    os.path.expanduser("~/Library/CloudStorage/OneDrive-FreigegebeneBibliotheken–Steinway&Sons/Louis Renner - Koordinationskreis Produktion MSW-Messen und Konferenzen - Dokumente/Präsentation - Renner"),
    os.path.expanduser("~/Steinway & Sons/Louis Renner - Koordinationskreis Produktion MSW-Messen und Konferenzen - Dokumente/Präsentation - Renner")
]

def find_sharepoint_dir():
    for p in SHAREPOINT_CANDIDATE_PATHS:
        if os.path.isdir(p):
            return p
    return None

def run_cmd(cmd, desc, allow_fail=False):
    print(f"\n▶ {desc}...")
    try:
        res = subprocess.run(cmd, cwd=BASE_DIR, check=not allow_fail, capture_output=True, encoding="utf-8", errors="replace")
        if res.stdout:
            print(res.stdout.strip())
        if res.stderr and res.returncode != 0:
            print(f"[Warnung/Fehler] {res.stderr.strip()}", file=sys.stderr)
        return res
    except subprocess.CalledProcessError as e:
        print(f"❌ Fehler bei: {desc}\n{e.stderr or e}", file=sys.stderr)
        if not allow_fail:
            sys.exit(1)
        return e

def sync_translations_and_build():
    manage_script = os.path.join(BASE_DIR, "translations", "manage_translations.py")
    if os.path.exists(manage_script):
        run_cmd([sys.executable, manage_script, "--apply"], "1. Übersetzungen & Folien kompilieren")

    deploy_script = os.path.join(BASE_DIR, "scripts", "build_deployed_package.py")
    if os.path.exists(deploy_script):
        run_cmd([sys.executable, deploy_script], "2. Deployed-Paket & Standalone-Build aktualisieren")

def sync_sharepoint():
    sp_dir = find_sharepoint_dir()
    if not sp_dir:
        print("\n⚠️ SharePoint-Ordner wurde auf diesem System nicht gefunden.")
        print("  Gesuchte Pfade:")
        for p in SHAREPOINT_CANDIDATE_PATHS:
            print(f"   - {p}")
        return False

    print(f"\n▶ 3. Synchronisiere mit SharePoint-Ordner:\n   Ziel: {sp_dir}")
    src_dir = BASE_DIR.rstrip("/") + "/"
    target_dir = sp_dir.rstrip("/") + "/"

    rsync_cmd = [
        "rsync", "-av", "--delete",
        "--exclude=.git",
        "--exclude=.DS_Store",
        "--exclude=*.swp",
        "--exclude=__pycache__",
        "--exclude=.agents",
        src_dir,
        target_dir
    ]

    res = subprocess.run(rsync_cmd, capture_output=True, encoding="utf-8", errors="replace")
    if res.returncode == 0:
        lines = [line for line in res.stdout.splitlines() if line and not line.startswith("sending") and not line.startswith("total") and line != "./"]
        print(f"✓ SharePoint erfolgreich abgeglichen ({len(lines)} Dateien/Ordner synchronisiert).")
        return True
    else:
        print(f"❌ SharePoint rsync fehlgeschlagen:\n{res.stderr}", file=sys.stderr)
        return False

def sync_github(commit_msg=None):
    print("\n▶ 4. GitHub-Synchronisation prüfen & hochladen...")
    
    # Prüfe Status
    st_res = subprocess.run(["git", "status", "--porcelain"], cwd=BASE_DIR, capture_output=True, encoding="utf-8", errors="replace")
    has_changes = bool(st_res.stdout.strip())

    if has_changes:
        msg = commit_msg or "Automatischer Abgleich: Folien, Übersetzungen & Deployed aktualisiert"
        run_cmd(["git", "add", "-A"], "Git Add")
        run_cmd(["git", "commit", "-m", msg], f"Git Commit: {msg}", allow_fail=True)

    # Push to origin
    push_res = run_cmd(["git", "push", "origin", "main"], "Git Push zu GitHub (origin/main)", allow_fail=True)
    if push_res.returncode == 0:
        print("✓ Erfolgreich zu GitHub hochgeladen.")
        return True
    else:
        print(f"⚠️ Git Push nicht erfolgreich oder bereits aktuell.")
        return False

def main():
    parser = argparse.ArgumentParser(description="Synchronisiere Renner-Präsentation mit SharePoint und GitHub")
    parser.add_argument("-m", "--message", help="Optionale Commit-Nachricht für GitHub", default=None)
    parser.add_argument("--skip-build", action="store_true", help="Überspringe Kompilierung")
    args = parser.parse_args()

    print("=" * 70)
    print("🚀 LOUIS RENNER PRÄSENTATION: VOLLSTÄNDIGER ABGLEICH")
    print("=" * 70)

    if not args.skip_build:
        sync_translations_and_build()

    sp_ok = sync_sharepoint()
    gh_ok = sync_github(args.message)

    print("\n" + "=" * 70)
    if sp_ok and gh_ok:
        print("🎉 ALLES ERFOLGREICH SYNCHRONISIERT (SharePoint & GitHub sind aktuell)!")
    elif sp_ok:
        print("✓ SharePoint ist aktuell. Bitte prüfen Sie den GitHub-Push.")
    elif gh_ok:
        print("✓ GitHub ist aktuell. Bitte prüfen Sie den SharePoint-Pfad.")
    else:
        print("⚠️ Bitte überprüfen Sie die Konsolenausgaben.")
    print("=" * 70)

if __name__ == "__main__":
    main()
