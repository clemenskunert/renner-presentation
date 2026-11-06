#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_full_presentation.py
Rebuilds index.html with the complete, authentic 68-slide Renner Masterclass Presentation.
All content is strictly based on the 5 technical masterclass documents in "Praesentation_Basis":
1. Hammerkopf_Japan_040325 (Clemens Kunert, Meuselwitz)
2. HK_Prd_Auswahl_10_25 (Jens-Sören Kruse, Klavierbaumeister)
3. HSt_Kap_Auswahl_MTK_10_25 (Jens-Sören Kruse, Klavierbaumeister)
4. EN_GP_HK_Glueing_10_25 (Jens-Sören Kruse, Klavierbaumeister)
5. Intonation_10_25 (Jens-Sören Kruse, Klavierbaumeister)
plus the official louis-renner.de history and Google Photos Meuselwitz transformation album.
"""

import os
import re
import shutil
from datetime import datetime

def main():
    html_path = "index.html"
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find slide-deck wrapper
    start_tag = '<div class="slide-deck" id="slide-deck">'
    end_tag = '</div>\n  </main>'
    
    if start_tag not in content or end_tag not in content:
        print("ERROR: Could not locate slide-deck bounds in index.html")
        return

    before_deck = content.split(start_tag)[0] + start_tag + "\n"
    after_deck = "\n    " + end_tag + content.split(end_tag)[1]

    # Now load generated slides
    import importlib
    import slide_definitions
    importlib.reload(slide_definitions)
    all_slides_html = slide_definitions.get_all_slides_html()

    new_content = before_deck + all_slides_html + after_deck

    # Stamp fresh cache-buster ?v=<timestamp> on fonts.css, presentation.css and all js/*.js scripts
    cache_ver = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_content = re.sub(
        r'(<link\s+rel="stylesheet"\s+href="css/(?:fonts|presentation)\.css)(?:\?[^"]*)?(">)',
        rf'\1?v={cache_ver}\2',
        new_content,
    )
    new_content = re.sub(
        r'(<script\s+src="js/[^"?]+\.js)(?:\?[^"]*)?("></script>)',
        rf'\1?v={cache_ver}\2',
        new_content,
    )

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully updated {html_path} with {slide_definitions.TOTAL_SLIDES} slides (v={cache_ver})!")

    # Auto-synchronize Deployed folder if it exists (unless invoked from build_deployed_package.py itself)
    deployed_dir = "Deployed"
    if os.path.exists(deployed_dir) and os.environ.get("RENNER_SKIP_DEPLOY_SYNC") != "1":
        try:
            import importlib.util
            spec = importlib.util.spec_from_file_location("build_deployed", os.path.join("scripts", "build_deployed_package.py"))
            build_mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(build_mod)
            build_mod.sync_deployed_bundle(sync_media=False)
            print("✓ Deployed/ Ordner (CSS+Fonts, JS, index.html, ASPX & index_offline_tablet.html) automatisch synchronisiert!")
        except Exception as e:
            print(f"[HINWEIS] Konnte Deployed/ nicht automatisch synchronisieren: {e}")

if __name__ == "__main__":
    main()
