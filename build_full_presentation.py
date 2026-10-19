#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_full_presentation.py
Rebuilds index.html with the complete, authentic 68-slide Renner Masterclass Presentation.
All content is strictly based on the 5 technical masterclass documents in "Präsentation - Basis":
1. Hammerkopf_Japan_040325 (Clemens Kunert, Meuselwitz)
2. HK_Prd_Auswahl_10_25 (Jens-Sören Kruse, Klavierbaumeister)
3. HSt_Kap_Auswahl_MTK_10_25 (Jens-Sören Kruse, Klavierbaumeister)
4. EN_GP_HK_Glueing_10_25 (Jens-Sören Kruse, Klavierbaumeister)
5. Intonation_10_25 (Jens-Sören Kruse, Klavierbaumeister)
plus the official louis-renner.de history and Google Photos Meuselwitz transformation album.
"""

import os
import re

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
    import slide_definitions
    all_slides_html = slide_definitions.get_all_slides_html()

    new_content = before_deck + all_slides_html + after_deck

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    # Standalone SharePoint Support:
    # SharePoint Online / On-Premise natively executes and displays .aspx files as web pages directly in the browser
    for aspx_name in ("Start_SharePoint.aspx", "presentation.aspx"):
        with open(aspx_name, "w", encoding="utf-8") as f:
            f.write(new_content)

    print(f"Successfully updated {html_path}, Start_SharePoint.aspx & presentation.aspx with {slide_definitions.TOTAL_SLIDES} slides!")

if __name__ == "__main__":
    main()
