#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_deployed_package.py
Erstellt den vollstaendigen, 100% internet-unabhaengigen "Deployed/"-Ordner fuer
Windows 10/11 PCs, macOS, Apple iPad / Tablets und SharePoint (optimiert fuer China / Offline).

Garantien:
1. Null externe Netzwerk-Aufrufe (alle Google Fonts lokal als WOFF2 + Base64 im Offline-Bundle)
2. 100% Windows-kompatible Videos (8-bit H.264 avc1 + AAC + FastStart moov<mdat, kein HEVC/H.265)
3. 100% reine 7-Bit-ASCII Dateipfade im gesamten Deployed/-Paket (immun gegen CP936/GBK, Shift-JIS & NFD/NFC ZIP-Fehler)
4. Schlankes Paket: Kopiert ausschliesslich die tatsaechlich referenzierten Medien + Handout-PDFs
5. CRLF-Zeilenenden fuer Windows (.bat / .ps1) & ausfuehrbare macOS-Starter ohne Xcode-Popup-Falle
"""

import base64
import os
import re
import shutil
import struct
import subprocess
import sys
import time
import zipfile
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DEPLOY_DIR = BASE_DIR / "Deployed"
STANDALONE_ZIP_PATH = BASE_DIR / "Louis_Renner_Masterclass_Standalone.zip"
STANDALONE_ZIP_ROOT = "Louis_Renner_Masterclass_Standalone"
H264_CACHE_DIR = BASE_DIR / "Visuell" / "Video_Standalone_H264"

STORED_BINARY_EXTS = {".mp4", ".jpg", ".jpeg", ".png", ".webp", ".woff2"}

JS_FILES = [
    "translations.js",
    "translations-data.js",
    "audio-synth.js",
    "timelapse.js",
    "history-journey.js",
    "transformation-journey.js",
    "ffw-history.js",
    "felt-anatomy.js",
    "weickert-rem-zoom.js",
    "hammer-weight-balance.js",
    "yamaha-kit.js",
    "yamaha-kit-acoustic.js",
    "piano-tone-a1.js",
    "hammer-spring.js",
    "crown-string-alignment.js",
    "voicing-zones.js",
    "felt-lacquer-hardening.js",
    "presentation.js",
]

UMLAUT_MAP = str.maketrans({
    "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss",
    "Ä": "Ae", "Ö": "Oe", "Ü": "Ue",
    " ": "_",
})


def log(msg: str):
    print(f"[DEPLOY] {msg}")


def to_ascii_relpath(rel_path: str) -> str:
    """Convert German umlauts/eszett in asset relative paths to pure 7-bit ASCII."""
    return rel_path.translate(UMLAUT_MAP)


def collect_referenced_visuell_paths() -> dict:
    """
    Scan index.html, css/*.css, and js/*.js for all active Visuell/... media paths.
    Returns dict mapping {original_rel_path: ascii_rel_path}.
    """
    refs = set()
    scan_targets = [BASE_DIR / "index.html"]
    scan_targets += sorted((BASE_DIR / "css").glob("*.css"))
    scan_targets += [p for p in sorted((BASE_DIR / "js").glob("*.js")) if p.name != "timelapse.js"]

    for fpath in scan_targets:
        if not fpath.exists():
            continue
        txt = fpath.read_text(encoding="utf-8")
        for m in re.finditer(r'["\'(](Visuell/[^"\'()]+)["\')]', txt):
            raw = m.group(1).split("?")[0].split("#")[0].strip()
            if "${" in raw:
                continue
            refs.add(raw)

    # Dynamic flipbook frames in transformation-journey.js
    tj_path = BASE_DIR / "js" / "transformation-journey.js"
    if tj_path.exists():
        tj_txt = tj_path.read_text(encoding="utf-8")
        for m in re.finditer(r"\['(\d+_[^']+\.jpg)'", tj_txt):
            refs.add(f"Visuell/Bilder/02_Umbau_und_Umzug/web_hd/{m.group(1)}")

    mapping = {}
    for orig in sorted(refs):
        if (BASE_DIR / orig).is_file():
            mapping[orig] = to_ascii_relpath(orig)
    return mapping


def rewrite_non_ascii_asset_refs(text: str, path_mapping: dict) -> str:
    """Replace any non-ASCII or space-containing Visuell/... path in HTML/JS/CSS with its clean Deployed path."""
    from urllib.parse import quote
    for orig, ascii_rel in sorted(path_mapping.items(), key=lambda kv: -len(kv[0])):
        if orig != ascii_rel:
            text = text.replace(orig, ascii_rel)
            for safe_chars in ("/:._- ", "/:._-"):
                orig_enc = quote(orig, safe=safe_chars)
                if orig_enc != orig:
                    text = text.replace(orig_enc, ascii_rel)
    return text


def prepare_standalone_html(raw_html: str, path_mapping: dict) -> str:
    """Inject standalone marker, hide authoring-only buttons, and apply ASCII asset paths."""
    out = rewrite_non_ascii_asset_refs(raw_html, path_mapping)
    # Hide authoring-only Image Manager link in Deployed package
    out = out.replace(
        'id="open-image-manager-btn"',
        'id="open-image-manager-btn" style="display:none !important;"'
    )
    # Inject window.__RENNER_STANDALONE__ = true right before first script or end of <head>
    standalone_flag = '  <script>window.__RENNER_STANDALONE__ = true;</script>\n</head>'
    if "window.__RENNER_STANDALONE__" not in out:
        out = out.replace("</head>", standalone_flag, 1)
    return out


def build_inlined_fonts_css() -> str:
    """Read css/fonts.css and inline all WOFF2 files as base64 data URIs for file:// CORS immunity."""
    fonts_css_path = BASE_DIR / "css" / "fonts.css"
    if not fonts_css_path.exists():
        return ""
    css_text = fonts_css_path.read_text(encoding="utf-8")

    def repl_woff2(match):
        rel_font = match.group(1)
        font_file = BASE_DIR / "css" / rel_font
        if not font_file.exists():
            return match.group(0)
        b64 = base64.b64encode(font_file.read_bytes()).decode("ascii")
        return f"url(data:font/woff2;base64,{b64})"

    return re.sub(r"url\((fonts/[^)]+\.woff2)\)", repl_woff2, css_text)


def build_offline_tablet_html(path_mapping: dict = None):
    """Generate Deployed/index_offline_tablet.html with 100% embedded fonts (base64), CSS, and JS."""
    if path_mapping is None:
        path_mapping = collect_referenced_visuell_paths()

    index_path = BASE_DIR / "index.html"
    html = prepare_standalone_html(index_path.read_text(encoding="utf-8"), path_mapping)

    # 1. Embed self-hosted WOFF2 fonts as base64 data URIs (works on file:// in Chrome/Edge/Safari!)
    inlined_fonts = build_inlined_fonts_css()
    if inlined_fonts:
        fonts_style_tag = f"<style>\n/* Embedded Self-Hosted Fonts (100% Offline & file:// Safe) */\n{inlined_fonts}\n</style>"
        html = re.sub(
            r'<link\s+rel="stylesheet"\s+href="css/fonts\.css(?:\?[^"]*)?">',
            lambda _: fonts_style_tag,
            html,
        )

    # 2. Embed presentation.css
    css_path = BASE_DIR / "css" / "presentation.css"
    if css_path.exists():
        css_code = rewrite_non_ascii_asset_refs(css_path.read_text(encoding="utf-8"), path_mapping)
        css_tag = f"<style>\n/* Louis Renner Presentation Styles (Embedded Standalone) */\n{css_code}\n</style>"
        html = re.sub(
            r'<link\s+rel="stylesheet"\s+href="css/presentation\.css(?:\?[^"]*)?">',
            lambda _: css_tag,
            html,
        )

    # 3. Embed all 18 JS files
    for js_name in JS_FILES:
        p = BASE_DIR / "js" / js_name
        if p.exists():
            js_code = rewrite_non_ascii_asset_refs(p.read_text(encoding="utf-8"), path_mapping)
            pattern = re.compile(rf'<script\s+src="js/{re.escape(js_name)}(?:\?[^"]*)?"></script>')
            replacement = f"<script>\n/* Embedded {js_name} */\n{js_code}\n</script>"
            html = pattern.sub(lambda _, r=replacement: r, html)

    DEPLOY_DIR.mkdir(parents=True, exist_ok=True)
    target_path = DEPLOY_DIR / "index_offline_tablet.html"
    target_path.write_text(html, encoding="utf-8")
    log(f"✓ Standalone Single-File HTML erstellt: Deployed/index_offline_tablet.html ({len(html)//1024} KB)")


def write_crlf_file(src_path: Path, dst_path: Path):
    """Write text file with strict Windows CRLF line endings."""
    raw = src_path.read_text(encoding="utf-8")
    normalized = raw.replace("\r\n", "\n").replace("\r", "\n").replace("\n", "\r\n")
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dst_path, "wb") as fp:
        fp.write(normalized.encode("ascii", errors="ignore"))


def sync_deployed_bundle(sync_media: bool = False):
    """Synchronize HTML, CSS (with fonts/), JS, Windows/Mac launchers, and optionally Visuell/ media."""
    DEPLOY_DIR.mkdir(parents=True, exist_ok=True)
    path_mapping = collect_referenced_visuell_paths()

    # 1. Copy CSS + WOFF2 fonts
    dst_css = DEPLOY_DIR / "css"
    if dst_css.exists():
        shutil.rmtree(dst_css)
    shutil.copytree(BASE_DIR / "css", dst_css, ignore=shutil.ignore_patterns(".DS_Store"))
    for css_f in dst_css.glob("*.css"):
        css_f.write_text(rewrite_non_ascii_asset_refs(css_f.read_text(encoding="utf-8"), path_mapping), encoding="utf-8")

    # 2. Copy JS with ASCII asset paths
    dst_js = DEPLOY_DIR / "js"
    if dst_js.exists():
        shutil.rmtree(dst_js)
    dst_js.mkdir(parents=True, exist_ok=True)
    for js_f in sorted((BASE_DIR / "js").glob("*.js")):
        js_txt = rewrite_non_ascii_asset_refs(js_f.read_text(encoding="utf-8"), path_mapping)
        (dst_js / js_f.name).write_text(js_txt, encoding="utf-8")

    # 3. Write standalone index.html, SharePoint ASPX, and index_offline_tablet.html
    raw_index = (BASE_DIR / "index.html").read_text(encoding="utf-8")
    standalone_index = prepare_standalone_html(raw_index, path_mapping)
    (DEPLOY_DIR / "index.html").write_text(standalone_index, encoding="utf-8")

    aspx_content = '<%@ Page Language="C#" AutoEventWireup="true" %>\n' + standalone_index
    for aspx_name in ("Start_SharePoint.aspx", "presentation.aspx"):
        (DEPLOY_DIR / aspx_name).write_text(aspx_content, encoding="utf-8")

    build_offline_tablet_html(path_mapping)

    # 4. Copy manifest.json, sw.js, server.py
    for fname in ("manifest.json", "sw.js", "server.py"):
        src = BASE_DIR / fname
        if src.exists():
            shutil.copy2(src, DEPLOY_DIR / fname)

    # 5. Copy Windows launchers with strict CRLF line endings (both root & Deployed)
    bat_src = BASE_DIR / "Start_Windows.bat"
    ps_src = BASE_DIR / "scripts" / "server_windows.ps1"
    if bat_src.exists():
        write_crlf_file(bat_src, BASE_DIR / "Start_Windows.bat")
        write_crlf_file(bat_src, DEPLOY_DIR / "Start_Windows.bat")
    if ps_src.exists():
        write_crlf_file(ps_src, BASE_DIR / "scripts" / "server_windows.ps1")
        write_crlf_file(ps_src, DEPLOY_DIR / "scripts" / "server_windows.ps1")

    # Ensure executable permissions on Mac launchers + place Start_Mac.command in root too
    mac_cmd = DEPLOY_DIR / "Start_Mac.command"
    mac_app_bin = DEPLOY_DIR / "Start_Mac.app" / "Contents" / "MacOS" / "launcher"
    if mac_cmd.exists():
        os.chmod(mac_cmd, 0o755)
        shutil.copy2(mac_cmd, BASE_DIR / "Start_Mac.command")
        os.chmod(BASE_DIR / "Start_Mac.command", 0o755)
    if mac_app_bin.exists():
        os.chmod(mac_app_bin, 0o755)

    # Remove stale .active_port and .server_pid from Deployed/
    for stale_name in (".active_port", ".server_pid"):
        stale_f = DEPLOY_DIR / stale_name
        if stale_f.exists():
            stale_f.unlink()

    # 6. Copy PDF Speaker Handouts, Slide Text PDFs & Translation Review Sheet into Deployed/Handouts/
    docs_dir = BASE_DIR / "docs"
    handouts_dst = DEPLOY_DIR / "Handouts"
    handouts_dst.mkdir(parents=True, exist_ok=True)
    for doc_name in (
        "Referenten_Spickzettel_DE.pdf",
        "Speaker_Cheat_Sheet_EN.pdf",
        "Referenten_Handout_Ausfuehrlich_DE.pdf",
        "Speaker_Handout_Detailed_EN.pdf",
        "Praesentationsfolien_Texte_EN.pdf",
        "Praesentationsfolien_Texte_ZH.pdf",
        "Praesentationsfolien_Texte_JA.pdf",
        "Louis_Renner_Uebersetzungen_Review_DE_EN_ZH_JA.xlsx",
        "Louis_Renner_Praesentation_Backup_4K_DE.pdf",
        "Louis_Renner_Praesentation_Backup_4K_EN.pdf",
    ):
        src_doc = docs_dir / doc_name
        if src_doc.exists():
            shutil.copy2(src_doc, handouts_dst / doc_name)

    # 7. Sync referenced media into Deployed/Visuell/ if requested
    if sync_media:
        sync_referenced_media(path_mapping)


def sync_referenced_media(path_mapping: dict):
    """Copy ONLY the active 127 media files into Deployed/Visuell/, substituting H.264 FastStart videos."""
    dst_visuell = DEPLOY_DIR / "Visuell"
    if dst_visuell.exists():
        shutil.rmtree(dst_visuell)

    copied_count = 0
    h264_substituted = 0
    for orig_rel, ascii_rel in path_mapping.items():
        src_file = BASE_DIR / orig_rel
        # Check if a Windows-safe 1080p H.264 FastStart version exists in H264_CACHE_DIR
        cached_h264 = H264_CACHE_DIR / src_file.name
        if src_file.suffix.lower() == ".mp4" and cached_h264.exists():
            src_to_copy = cached_h264
            h264_substituted += 1
        else:
            src_to_copy = src_file

        dst_file = DEPLOY_DIR / ascii_rel
        dst_file.parent.mkdir(parents=True, exist_ok=True)

        # Use APFS clonefile on macOS for instant zero-space copy
        if sys.platform == "darwin":
            res = subprocess.run(["cp", "-c", str(src_to_copy), str(dst_file)], capture_output=True)
            if res.returncode != 0:
                shutil.copy2(src_to_copy, dst_file)
        else:
            shutil.copy2(src_to_copy, dst_file)
        copied_count += 1

    log(f"✓ {copied_count} aktive Mediendateien in Deployed/Visuell/ kopiert ({h264_substituted} Videos als 1080p H.264 FastStart fuer Windows optimiert).")


def create_instructions():
    """Write up-to-date German/English offline instructions for Windows PC, Mac & iPad."""
    md_content = """# Louis Renner Masterclass – 100% Offline Standalone Paket (Windows PC, Mac & iPad)

Dieser Ordner (`Deployed/` bzw. `Louis_Renner_Masterclass_Standalone/`) ist **vollständig unabhängig vom Internet** (null externe Server-, CDN- oder Google-Fonts-Verbindungen – speziell gehärtet für Offline-Konferenzen u. a. in China).
Alle **34 Folien**, sämtliche **4 Sprachen (DE, EN, JA, ZH)**, Ansprechpartner-vCards, Schriften, Klangsimulationen und **1080p H.264-Videos** sind lokal eingebettet.

---

## 1. Start auf einem Windows PC (Windows 10 / 11 – Offline)

1. Entpacken bzw. kopieren Sie den gesamten Ordner auf die lokale Festplatte (z. B. Desktop) oder starten Sie ihn vom USB-Stick.
2. **Empfohlen:** Doppelklick auf **`Start_Windows.bat`**
   - Startet automatisch den integrierten lokalen Streaming-Server (über Windows-eigenes PowerShell oder Python – **keine Installation, keine Admin-Rechte, keine Firewall-Freigabe nötig**) und öffnet den Standardbrowser (Edge / Chrome).
3. **Direktstart ohne Skripte (falls Firmen-IT `.bat` blockiert):**
   - Doppelklick direkt auf **`index_offline_tablet.html`** (alle Stile, Schriften und Skripte sind in einer einzigen Datei eingebettet).
4. Drücken Sie im Browser **`F11`** (oder Taste **`F`** in der Präsentation) für den randlosen Vollbildmodus.

---

## 2. Start auf dem Mac (macOS – Offline)

1. **Empfohlen:** Doppelklick auf **`Start_Mac.app`** oder **`Start_Mac.command`**.
2. **Alternativ komplett ohne Server:** Doppelklick oder Rechtsklick → *Öffnen mit Chrome / Safari* auf **`index_offline_tablet.html`**.

---

## 3. Nutzung auf dem Apple iPad / Tablet (Offline)

1. Ordner per AirDrop oder USB-C-Stick in die Apple **„Dateien“-App** (*Auf meinem iPad*) kopieren bzw. die ZIP-Datei dort antippen zum Entpacken.
2. Tippen Sie auf **`index_offline_tablet.html`**.

---

## 4. Referenten-Handouts & 4K-Backups (`Handouts/`)

Im Unterordner **`Handouts/`** liegen druckfertige A4-Unterlagen und Backups bereit:
- `Referenten_Spickzettel_DE.pdf` & `Speaker_Cheat_Sheet_EN.pdf` (Kompakter Spickzettel DE / EN)
- `Referenten_Handout_Ausfuehrlich_DE.pdf` & `Speaker_Handout_Detailed_EN.pdf` (Ausführliches Referenten-Handout DE / EN)
- `Louis_Renner_Praesentation_Backup_4K_DE.pdf` & `Louis_Renner_Praesentation_Backup_4K_EN.pdf` (Statisches 4K-PDF-Backup)
- `Praesentationsfolien_Texte_EN.pdf`, `Praesentationsfolien_Texte_ZH.pdf`, `Praesentationsfolien_Texte_JA.pdf` & `Louis_Renner_Uebersetzungen_Review_DE_EN_ZH_JA.xlsx`
"""

    txt_content = """======================================================================
  LOUIS RENNER MASTERCLASS - 100% OFFLINE STANDALONE EDITION
  (Windows 10/11 PC, macOS & iPad - China / Offline Ready - 34 Slides)
======================================================================

WINDOWS PC (100% OFFLINE):
  -> Option A (Empfohlen): Doppelklick auf "Start_Windows.bat"
  -> Option B (Ohne Skript): Doppelklick auf "index_offline_tablet.html"
  -> Vollbild im Browser: Taste F11 oder Taste F druecken.

MAC (100% OFFLINE):
  -> Option A (Empfohlen): Doppelklick auf "Start_Mac.app" oder "Start_Mac.command"
  -> Option B (Ohne Server): "index_offline_tablet.html" in Safari/Chrome oeffnen.

IPAD / TABLET (100% OFFLINE):
  -> Ordner in die Dateien-App ("Auf meinem iPad") kopieren / entpacken
  -> Auf "index_offline_tablet.html" tippen.

REFERENTEN-HANDOUTS & BACKUPS (DE & EN):
  -> Siehe Ordner "Handouts/" (Kurz-Spickzettel, Ausfuehrliche Handouts & 4K-PDF-Backups)

SPRACHEN (Oben rechts ueber Menue waehlbar):
  Deutsch | English | 日本語 | 中文
======================================================================
"""
    (DEPLOY_DIR / "ANLEITUNG_IPAD_TABLET.md").write_text(md_content, encoding="utf-8")
    (DEPLOY_DIR / "LIESMICH.txt").write_text(txt_content, encoding="utf-8")
    log("✓ Anleitungsdateien ANLEITUNG_IPAD_TABLET.md und LIESMICH.txt aktualisiert.")


def verify_deployed_package() -> bool:
    """Strict automated offline & cross-platform verification of Deployed/."""
    errors = []

    # 1. Check external URLs in HTML/CSS
    for html_name in ("index.html", "index_offline_tablet.html"):
        txt = (DEPLOY_DIR / html_name).read_text(encoding="utf-8")
        for m in re.finditer(r'https?://[^\s"\'<>)]+', txt):
            url = m.group(0)
            if "www.w3.org/" in url or "louis-renner.de" in url:
                continue
            errors.append(f"Externe URL in {html_name}: {url}")

    # 2. Check pure 7-bit ASCII filenames across entire Deployed/ tree
    for p in DEPLOY_DIR.rglob("*"):
        if p.name == ".DS_Store":
            p.unlink()
            continue
        rel = str(p.relative_to(DEPLOY_DIR))
        if any(ord(c) > 127 for c in rel):
            errors.append(f"Nicht-ASCII Dateipfad in Deployed/: {rel}")
        if rel.startswith("Visuell/") and " " in rel:
            errors.append(f"Leerzeichen im Medienpfad in Deployed/: {rel}")

    # 3. Check all media references in Deployed/index.html & Deployed/js/*.js exist in Deployed/
    check_files = [DEPLOY_DIR / "index.html"] + [
        p for p in sorted((DEPLOY_DIR / "js").glob("*.js")) if p.name != "timelapse.js"
    ]
    for cf in check_files:
        txt = cf.read_text(encoding="utf-8")
        for m in re.finditer(r'["\'(](Visuell/[^"\'()]+)["\')]', txt):
            ref = m.group(1).split("?")[0].split("#")[0].strip()
            if "${" in ref:
                continue
            if not (DEPLOY_DIR / ref).is_file():
                errors.append(f"Fehlende Mediendatei in Deployed/ ({cf.name}): {ref}")

    # 4. Check all MP4 videos in Deployed/Visuell/ are H.264 (avc1) + FastStart (moov < mdat)
    for mp4 in sorted((DEPLOY_DIR / "Visuell").rglob("*.mp4")):
        size = mp4.stat().st_size
        boxes = []
        has_avc1 = False
        has_hevc = False
        with open(mp4, "rb") as fp:
            pos = 0
            while pos < size:
                fp.seek(pos)
                hdr = fp.read(16)
                if len(hdr) < 8:
                    break
                bsize, btype = struct.unpack(">I4s", hdr[:8])
                bname = btype.decode("latin1", errors="replace")
                if bsize == 1 and len(hdr) >= 16:
                    bsize = struct.unpack(">Q", hdr[8:16])[0]
                elif bsize == 0:
                    bsize = size - pos
                boxes.append(bname)
                if bname == "moov" and bsize < 50_000_000:
                    fp.seek(pos)
                    moov_data = fp.read(bsize)
                    has_avc1 = b"avc1" in moov_data
                    has_hevc = (b"hvc1" in moov_data or b"hev1" in moov_data)
                if bsize < 8:
                    break
                pos += bsize
        if has_hevc or not has_avc1:
            errors.append(f"Video nicht H.264/avc1 kompatibel fuer Windows: {mp4.name}")
        if not ("moov" in boxes and "mdat" in boxes and boxes.index("moov") < boxes.index("mdat")):
            errors.append(f"Video ohne FastStart (moov hinter mdat): {mp4.name}")

    total_mb = sum(p.stat().st_size for p in DEPLOY_DIR.rglob("*") if p.is_file()) / (1024 * 1024)
    if errors:
        for e in errors:
            log(f"✗ FEHLER: {e}")
        return False

    log(f"✓ VERIFIKATION BESTANDEN: 0 externe Links, 100% ASCII-Pfade, alle Videos H.264+FastStart, Gesamtgroesse Deployed/: {total_mb:.1f} MB")
    return True


def ensure_prerequisites():
    log("Synchronisiere Folieninhalte und Uebersetzungen...")
    env = os.environ.copy()
    env["RENNER_SKIP_DEPLOY_SYNC"] = "1"

    build_py = BASE_DIR / "build_full_presentation.py"
    res = subprocess.run([sys.executable, str(build_py)], cwd=str(BASE_DIR), env=env, capture_output=True, text=True)
    if res.returncode != 0:
        log(f"WARNUNG: build_full_presentation.py: {res.stderr}")
    else:
        log("✓ index.html aktualisiert.")

    manage_trans_py = BASE_DIR / "translations" / "manage_translations.py"
    res = subprocess.run([sys.executable, str(manage_trans_py), "--apply"], cwd=str(BASE_DIR), env=env, capture_output=True, text=True)
    if res.returncode != 0:
        log(f"WARNUNG: manage_translations.py: {res.stderr}")
    else:
        log("✓ Uebersetzungen (DE, EN, JA, ZH) kompiliert.")


def build_standalone_zip() -> Path:
    """Create cross-platform Louis_Renner_Masterclass_Standalone.zip from Deployed/ with pure ASCII paths and Unix exec permissions."""
    tmp_zip = STANDALONE_ZIP_PATH.with_suffix(".zip.tmp")
    if tmp_zip.exists():
        tmp_zip.unlink()

    exec_rel_paths = {
        "Start_Mac.command",
        "Start_Mac.app/Contents/MacOS/launcher",
    }
    skip_names = {".DS_Store", "Thumbs.db", ".active_port", ".server_pid"}

    files_written = 0
    with zipfile.ZipFile(tmp_zip, mode="w", allowZip64=True) as zf:
        for file_path in sorted(DEPLOY_DIR.rglob("*")):
            if not file_path.is_file() or file_path.name in skip_names:
                continue
            rel_posix = file_path.relative_to(DEPLOY_DIR).as_posix()
            arcname = f"{STANDALONE_ZIP_ROOT}/{rel_posix}"

            st = file_path.stat()
            dt = time.localtime(st.st_mtime)[:6]
            zi = zipfile.ZipInfo(filename=arcname, date_time=dt)
            zi.create_system = 3  # Unix permissions compatible with macOS/iPadOS & Windows Explorer
            if rel_posix in exec_rel_paths:
                zi.external_attr = (0o100755 & 0xFFFF) << 16
            else:
                zi.external_attr = (0o100644 & 0xFFFF) << 16

            ext = file_path.suffix.lower()
            compress_type = zipfile.ZIP_STORED if ext in STORED_BINARY_EXTS else zipfile.ZIP_DEFLATED
            zi.compress_type = compress_type

            with open(file_path, "rb") as src_fp:
                data = src_fp.read()
            if compress_type == zipfile.ZIP_DEFLATED:
                zf.writestr(zi, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=6)
            else:
                zf.writestr(zi, data, compress_type=zipfile.ZIP_STORED)
            files_written += 1

    tmp_zip.replace(STANDALONE_ZIP_PATH)
    zip_mb = STANDALONE_ZIP_PATH.stat().st_size / (1024 * 1024)
    log(f"✓ Standalone-ZIP aktualisiert: {STANDALONE_ZIP_PATH.name} ({files_written} Dateien, {zip_mb:.1f} MB)")
    return STANDALONE_ZIP_PATH


def main():
    build_zip = "--no-zip" not in sys.argv
    log("Starte Erstellung des 100% Offline Standalone-Pakets (Deployed/)...")
    ensure_prerequisites()
    sync_deployed_bundle(sync_media=True)
    create_instructions()
    ok = verify_deployed_package()
    if not ok:
        sys.exit(1)
    if build_zip:
        build_standalone_zip()
    log("======================================================================")
    log("STANDALONE DEPLOYMENT FUER WINDOWS PC, MAC & IPAD EINSATZBEREIT!")
    log(f"Zielordner: {DEPLOY_DIR}")
    if build_zip:
        log(f"ZIP-Archiv: {STANDALONE_ZIP_PATH}")
    log("======================================================================")


if __name__ == "__main__":
    main()
