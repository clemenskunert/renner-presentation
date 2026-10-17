#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_english_translations.py
Applies complete, authentic English translations across all 68 slides in translations/slides_content.json.
"""

import json
import os

MASTER_FILE = os.path.join(os.path.dirname(__file__), "slides_content.json")

TRANSLATIONS = {
  # =========================================================================
  # KAPITEL 1: EINFÜHRUNG & MEUSELWITZ (1 - 6)
  # =========================================================================
  "slide_02": {
    "elements": {
      "s2_c4_title": "Yamaha KIT"
    }
  },
  "slide_06": {
    "subtitle": "Constant material moisture as an indispensable requirement for micrometer precision",
    "elements": {
      "s6_c1_title": "Constant Microclimate (45–50% RH)",
      "s6_c2_title": "Moth Protection & Maturation Chambers",
      "s6_c3_title": "Dust Extraction & Cleanroom Standards",
      "s6_c1_desc": "Both wooden mouldings and felts react sensitively to fluctuations in ambient humidity. In Meuselwitz, room climate is monitored 24/7 by computerized environmental controls.",
      "s6_c2_desc": "Specially insulated wool and felt storage with pheromone-based monitoring and constant air circulation guarantee pristine raw material quality.",
      "s6_c3_desc": "State-of-the-art dust extraction at all milling and sanding stations prevents fine dust deposits on sensitive felt and cloth assemblies.",
      "s6_caption_1": "Climate-controlled sub-assembly and material storage in Meuselwitz"
    }
  },

  # =========================================================================
  # KAPITEL 2: DIE KUNST DER FILZFERTIGUNG (FFW WURZEN) (7 - 17)
  # =========================================================================
  "slide_07": {
    "subtitle": "Founded in Leipzig in 1783 – Opening of the specialized Wurzen factory in 1847",
    "elements": {
      "s7_bullet_1": "<strong>Founded in 1783:</strong> Established by Johann David Weickert in Leipzig (originally founded in 1714 in Dessau), initially manufacturing fine woven woolen goods.",
      "s7_bullet_2": "<strong>Pioneering Achievement in 1847:</strong> In the newly built factory in Wurzen, Weickert succeeded in manufacturing the world's first industrial piano hammer felt.",
      "s7_bullet_3": "<strong>Global Purveyor to Royal Courts:</strong> As early as the 19th century, Weickert supplied all leading European piano manufacturers and was officially awarded royal purveyor titles.",
      "s7_bullet_4": "<strong>Sonic Identity:</strong> Worldwide, Weickert felt is considered the quintessential standard for the singing, warm, yet brilliant European piano tone.",
      "s7_caption_1": "Original Weickert manufactory in Wurzen (Saxony)"
    }
  },
  "slide_08": {
    "subtitle": "Traditional artisan craftsmanship combined with state-of-the-art production standards",
    "elements": {
      "s8_bullet_1": "<strong>Exclusive Renner Partnership:</strong> Renner sources all of its premium top felt exclusively from the modernized Wurzen manufactory.",
      "s8_bullet_2": "<strong>Master Artisans:</strong> The deep knowledge of experienced master feltmakers regarding wool moisture, fulling times, and fiber formulations is meticulously passed on.",
      "s8_bullet_3": "<strong>Modernized Facilities:</strong> High-precision temperature and pressure monitoring ensure unmatched batch consistency.",
      "s8_caption_1": "Filzfabrik Wurzen (FFW): Traditional craftsmanship at modern production standards"
    }
  },
  "slide_09": {
    "subtitle": "Only uncompressed raw wool guarantees maximum natural elasticity",
    "elements": {
      "s9_bullet_1": "<strong>Bale Delivery Without Over-Compression:</strong> Raw wool is transported in loosely packed bales. Excessive compression would irreversibly damage the delicate scales and crimp of the wool fibers.",
      "s9_bullet_2": "<strong>Higher Logistics Costs for Supreme Quality:</strong> This gentle handling increases transport volume, but safeguards intact fiber elasticity.",
      "s9_bullet_3": "<strong>Pronounced Fiber Crimp:</strong> Only highly crimped Merino wool fibers provide optimal interlocking during the subsequent fulling process.",
      "s9_bullet_4": "<strong>Gentle Carbonization:</strong> A chemically gentle cleansing process removes plant matter without attacking the keratin protein structure.",
      "s9_caption_1": "Raw wool delivery: Gently stored wool bales at FFW"
    }
  },
  "slide_10": {
    "subtitle": "Loosening and blending distinct wool batches for tailor-made densities",
    "elements": {
      "s10_bullet_1": "<strong>Blending Process:</strong> Mixing different fiber lengths and finenesses to achieve specific spring stiffness and resilience.",
      "s10_bullet_2": "<strong>Fiber Loosening:</strong> Multi-stage mechanical picking and aeration gently separate fiber clumps into individual filaments.",
      "s10_bullet_3": "<strong>Climate Conditioning:</strong> Constant moisture absorption prior to carding prevents electrostatic charging and fiber breakage.",
      "s10_caption_1": "Aeration and blending process of wool batches at FFW Wurzen"
    }
  },
  "slide_11": {
    "subtitle": "Defined fiber orientation as the foundation for resonance and string response",
    "elements": {
      "s11_bullet_1": "<strong>Carding:</strong> Loosened fibers are combed through fine wire rollers, untangled, and arranged in parallel alignment.",
      "s11_bullet_2": "<strong>Defined Fiber Direction:</strong> The resulting gossamer-thin, soft web features a precisely specified preferential fiber orientation.",
      "s11_bullet_3": "<strong>Layering:</strong> Multiple web layers are superimposed in cross-lap and longitudinal arrangements to build the required sheet thickness and density gradient.",
      "s11_bullet_4": "<strong>Prerequisite for Voicing:</strong> Only parallel-aligned fibers react predictably and evenly to voicing needle penetration during subsequent tone regulation.",
      "s11_caption_1": "Carding wool into silky flowing webs with defined fiber orientation"
    }
  },
  "slide_12": {
    "subtitle": "Fiber entanglement through natural physical-thermal stimulation",
    "elements": {
      "s12_c1_title": "1. Live Steam",
      "s12_c2_title": "2. Mechanical Pressure",
      "s12_c3_title": "3. Oscillating Motion",
      "s12_c4_title": "4. Artisan Know-How",
      "s12_c1_desc": "Opens the microscopic cuticle scales of the hair filaments and renders keratin supple.",
      "s12_c2_desc": "Continuously compresses the fleece layers, initiating progressive density increase.",
      "s12_c3_desc": "Frictional rubbing interlocks the natural barbed scales of fibers inextricably.",
      "s12_c4_desc": "Sensory feel for the exact moment of completion governs elasticity and acoustic resonance.",
      "s12_caption_1": "Combining and fulling fleece layers into a homogeneous felt sheet"
    }
  },
  "slide_13": {
    "subtitle": "Maximum natural elasticity by eliminating chemical or thermal hardening",
    "elements": {
      "s13_b1_badge": "PHYSICAL LIMIT",
      "s13_b2_badge": "FFW WURZEN",
      "s13_c1_title": "Maximum Natural Fulling Hardness",
      "s13_c1_desc": "During fulling, felt sheets are compacted until fibers cannot be compressed further by purely mechanical means. This corresponds to the maximum natural fulling hardness of approx. 0.56 Shore.",
      "s13_caption_1": "Felt sheets at FFW",
      "s13_caption_2": "Fulled felt sheets with natural resilient spring rate of 0.56 Shore"
    }
  },
  "slide_14": {
    "subtitle": "Final dimensional calibration without sanding – preserving the silky fiber cuticle",
    "elements": {
      "s14_bullet_1": "<strong>Mechanical Hammering:</strong> Specialized felt hammers and polished natural stones consolidate sheets to exact target dimensions.",
      "s14_bullet_2": "<strong>Zero Sanding:</strong> Sanding felt shears off millions of natural fibers. The Weickert process completely eliminates surface grinding or sanding.",
      "s14_bullet_3": "<strong>Smooth Bending Radius:</strong> When wrapped around the hammer moulding, the felt surface remains completely intact and smooth without split cracking.",
      "s14_caption_1": "Post-processing: Densifying felt sheets using specialized hammers and stone polishers"
    }
  },
  "slide_15": {
    "subtitle": "Tapered sheet geometry and continuous seasoning control at the Meuselwitz plant",
    "elements": {
      "s15_bullet_1": "<strong>Tapered Sheet Geometry:</strong> Felt sheets are engineered in wedge-shaped cross sections – thicker and heavier in the bass, progressively thinner and denser toward the treble.",
      "s15_bullet_2": "<strong>Over 30 Formulations in Stock:</strong> Renner permanently stocks over 30 distinct FFW felt sheet specifications – more than any other manufacturer worldwide.",
      "s15_bullet_3": "<strong>Climate Control & Moth Protection:</strong> Monitored relative humidity and pheromone traps protect natural wool fibers permanently.",
      "s15_bullet_4": "<strong>Tension-Free Seasoning:</strong> Prescribed resting periods prior to strip cutting completely dissipate internal residual stresses.",
      "s15_caption_1": "Felt sheet storage in Meuselwitz: Over 30 sheet varieties permanently available"
    }
  },
  "slide_16": {
    "subtitle": "1 or 2 colored indicator layers at the bass edge as traditional proof of origin",
    "elements": {
      "s16_bullet_1": "<strong>What is the 'Soul'?</strong> A thin, distinctly colored felt layer integrated at the bass edge during sheet fabrication.",
      "s16_bullet_2": "<strong>Traditional Proof of Origin:</strong> A historic hallmark of Wurzen felt authenticity, recognized by piano builders worldwide.",
      "s16_bullet_3": "<strong>No Difference in Quality:</strong> Sheets with 1 or 2 indicator layers share identical fiber specs – they serve batch tracking and visual authenticity.",
      "s16_caption_1": "Felt strip showing visible indicator layer ('soul') at the bass origin"
    }
  },
  "slide_17": {
    "subtitle": "Highest lanolin retention for unsurpassed voicing stability and tonal response",
    "elements": {
      "s17_c1_title": "What makes 'Weickert Special' so unique?",
      "s17_bullet_1": "<strong>Exclusive Formulation:</strong> Manufactured by Filzfabrik Wurzen exclusively for Louis Renner.",
      "s17_bullet_2": "<strong>Higher Wool Grease (Lanolin) Retention:</strong> A gentle proprietary wash preserves more natural lanolin inside the fibers.",
      "s17_bullet_3": "<strong>Reduced Hygroscopic Swelling:</strong> Substantially less sensitive to seasonal swings in atmospheric humidity.",
      "s17_bullet_4": "<strong>Enhanced Clamping Tension:</strong> Exceptional adhesion and dynamic self-tension around the wooden hammer moulding.",
      "s17_bullet_5": "<strong>Enduring Voicing Stability:</strong> The voiced tonal profile remains exceptionally stable over years of concert play.",
      "s17_caption_1": "Weickert Special: Finest wool fiber quality engineered for maximum longevity"
    }
  },

  # =========================================================================
  # KAPITEL 3: HOCHPRÄZISE HAMMERKOPFFERTIGUNG (18 - 29)
  # =========================================================================
  "slide_18": {
    "subtitle": "Computer-controlled cutting lines with micro-stepper motors and laser guidance",
    "elements": {
      "s18_bullet_1": "<strong>Tapered Strip Cutting:</strong> Micro-stepper motors guide the blade along the exact wedge profile (thick bass to thin treble).",
      "s18_bullet_2": "<strong>Laser Line Guidance:</strong> Real-time laser projection monitors cutting paths with tolerance under 0.05 mm.",
      "s18_bullet_3": "<strong>Individual Customer Tapers:</strong> Continuous wedge angles can be configured for every manufacturer and scale design.",
      "s18_bullet_4": "<strong>Industry 4.0 in Piano Making:</strong> Digital traceability from raw wool bale to finished hammerhead.",
      "s18_caption_1": "Modern robotic felt cutting center at the Meuselwitz plant"
    }
  },
  "slide_19": {
    "subtitle": "Razor-sharp vertical cuts prevent skewed stretching during hammer moulding",
    "elements": {
      "s19_bullet_1": "<strong>100% Vertical Cut Edge:</strong> Prevents distortion and uneven fiber elongation during subsequent high-pressure pressing.",
      "s19_bullet_2": "<strong>No Crushed Fibers:</strong> Clean cutting preserves internal fiber voids, ensuring unconstrained compression dynamics.",
      "s19_bullet_3": "<strong>Prevention of Skewing:</strong> Only strictly rectangular cut strips wrap around the wooden moulding with absolute lateral symmetry.",
      "s19_caption_1": "Inspected top felt strip: Tapered profile and homogeneous fiber matrix"
    }
  },
  "slide_20": {
    "subtitle": "Precision profiling of underfelt strips for optimal cushioning and energy transmission",
    "elements": {
      "s20_bullet_1": "<strong>Function of Underfelt:</strong> Acts as an elastic buffer between the rigid wood moulding and resilient top felt.",
      "s20_bullet_2": "<strong>Precision Profiling:</strong> In Meuselwitz, underfelt strips are shaped on dedicated multi-axis milling machines prior to gluing.",
      "s20_bullet_3": "<strong>Even Pressure Distribution:</strong> The profiled contour ensures press clamping force flows smoothly into the hammer flanks.",
      "s20_caption_1": "Profiling the underfelt strip on specialized Renner milling machinery"
    }
  },
  "slide_21": {
    "subtitle": "Heritage underfelt colors for legendary piano brands and custom orders",
    "elements": {
      "s21_c1_title": "Red / Wine Red",
      "s21_c2_title": "Orange",
      "s21_c3_title": "Yellow",
      "s21_c4_title": "Blue / Black",
      "s21_c1_desc": "The world-renowned Renner classic; standard across premier European concert brands.",
      "s21_c2_desc": "Traditional signature color of classic concert instruments and historic restorations.",
      "s21_c3_desc": "Characteristic underfelt of renowned Saxon and Viennese piano makers.",
      "s21_c4_desc": "Classic blue for C. Bechstein as well as elegant black for modern designer grands.",
      "s21_caption_1": "Renner underfelt range: Red, Wine Red, Orange, Yellow, Blue, Black"
    }
  },
  "slide_22": {
    "subtitle": "Moulding density and elasticity dictate strike inertia and timbre",
    "elements": {
      "s22_b1_badge": "HARDWOOD",
      "s22_b2_badge": "MEDIUM-HARD",
      "s22_b3_badge": "MEDIUM-HARD",
      "s22_b4_badge": "MEDIUM / LIGHT",
      "s22_b5_badge": "CORE WOODS",
      "s22_c1_title": "Hornbeam (Weißbuche)",
      "s22_c2_title": "Maple (Bergahorn)",
      "s22_c3_title": "Walnut (Nussbaum)",
      "s22_c4_title": "Mahogany (Kotibé)",
      "s22_c1_desc": "Maximum punch, powerful attack, extreme dimensional stability",
      "s22_c2_desc": "Brilliant, transparent tone with rich, differentiated overtones",
      "s22_c3_desc": "Warm, velvety fundamental tone, resonant bass foundation",
      "s22_c4_desc": "Low inertia, singing treble sustain, effortless response",
      "s22_caption_1": "Original core mouldings",
      "s22_caption_2": "Hornbeam, Maple, Walnut & Mahogany (Kotibé)"
    }
  },
  "slide_23": {
    "subtitle": "Historic and modern profiles for over 20 grand and upright piano marques",
    "elements": {
      "s23_c1_title": "Symmetrical Standard Profiles",
      "s23_c2_title": "Asymmetrical Custom Profiles",
      "s23_c1_desc": "For Steinway & Sons (historic and modern), Bösendorfer, Schimmel, C. Bechstein, Yamaha, Kawai, Grotrian-Steinweg, Petrof, August Förster, Sauter, Blüthner, and Renner USA.",
      "s23_c2_desc": "Historic Bechstein designs, grands with ultra-slender treble progressions, and custom mouldings balancing moment of inertia against steep string angles.",
      "s23_caption_1": "Moulding Types: Diversity of core wood profiles in the Renner catalogue"
    }
  },
  "slide_24": {
    "subtitle": "Developing characteristic tension arches before closing the press",
    "elements": {
      "s24_bullet_1": "<strong>Elastic Pre-Bending:</strong> The heavy bass end of the felt strip is pre-conditioned before loading into the press fixture.",
      "s24_bullet_2": "<strong>Characteristic Contours:</strong> Harmonious wave profiles form along the strip, mirroring subsequent pressure vectors.",
      "s24_bullet_3": "<strong>Uniform Elongation:</strong> Prevents outer fiber tearing when tightly encircling the apex of the wooden moulding.",
      "s24_caption_1": "Bass end of felt strip exhibiting characteristic pre-bending curves before pressing"
    }
  },
  "slide_25": {
    "subtitle": "Re-tensioning the wooden moulding to build maximum elastic outer tension",
    "elements": {
      "s25_bullet_1": "<strong>Closing Side Jaws:</strong> Temperature-controlled press jaws flank the felt and wrap it around the glued wooden moulding.",
      "s25_bullet_2": "<strong>Re-tensioning the Moulding:</strong> Once side jaws are closed, high hydraulic pressure re-tensions the core moulding downwards.",
      "s25_bullet_3": "<strong>Tensile Pre-Stress in Outer Layers:</strong> This proprietary Renner technique imparts unmatched dynamic pre-tension to outer felt layers.",
      "s25_bullet_4": "<strong>Foundation for Voicing:</strong> This elastic stored energy enables subsequent voicing with extraordinary dynamic range.",
      "s25_caption_1": "Hammerhead pressing and gluing process under high hydraulic pressure"
    }
  },
  "slide_26": {
    "subtitle": "De-moulding the monolithic 88-note block after glue cure",
    "elements": {
      "s26_bullet_1": "<strong>Flawless Glue Line:</strong> Continuous bonding between wood, underfelt, and top felt with zero air pockets.",
      "s26_bullet_2": "<strong>Harmonious Transition:</strong> The moulding contour imprints crisply beneath the compacted felt envelope.",
      "s26_bullet_3": "<strong>Proprietary Thermo-Forming:</strong> Dedicated post-cure thermal stabilization remains a strictly guarded Renner trade secret.",
      "s26_caption_1": "The bonded hammerhead block immediately following de-moulding"
    }
  },
  "slide_27": {
    "subtitle": "Multi-axis flank milling and slicing into 88 individual hammerheads",
    "elements": {
      "s27_bullet_1": "<strong>CNC Truing of Blocks:</strong> Removal of glue beads and high-precision milling of outer moulding contours.",
      "s27_bullet_2": "<strong>High-Speed Milling:</strong> Specialized tooling cuts dense wool felt with razor-sharp edges without fiber pullout.",
      "s27_bullet_3": "<strong>Precision Slicing:</strong> Slicing the block into exact progressive widths (approx. 11.5 mm bass to 9.5–10 mm treble).",
      "s27_caption_1": "CNC precision milling center in Meuselwitz machining hammerhead blocks"
    }
  },
  "slide_28": {
    "subtitle": "Precision shank boring at spatial angles and brass T-rivet insertion",
    "elements": {
      "s28_bullet_1": "<strong>Automated Shank Boring:</strong> Boring at exact spatial angles (bore depth, diameter ø 5.4 mm, inclination in gon).",
      "s28_bullet_2": "<strong>T-Riveting:</strong> High-tensile brass T-rivets permanently secure felt flanks against bursting under fortissimo concert attacks.",
      "s28_bullet_3": "<strong>Tail Radiusing:</strong> Specially shaped tail profiles facilitate smooth engagement with the backcheck.",
      "s28_caption_1": "Boring and T-rivet insertion at the Meuselwitz facility"
    }
  },
  "slide_29": {
    "subtitle": "Executive summary of innovations presented by Clemens Kunert",
    "elements": {
      "s29_c1_title": "1. Tailor-Made Fabrication",
      "s29_c2_title": "2. Ready for Final Voicing",
      "s29_c3_title": "3. Supreme Precision",
      "s29_c4_title": "4. Outstanding Tonal Stability",
      "s29_c5_title": "5. Rich Overtones",
      "s29_c6_title": "6. Drop-In Refinement",
      "s29_c1_desc": "Custom one-off fabrication for historic treasures through to major concert series runs.",
      "s29_c2_desc": "No time-consuming pre-voicing required at the piano! Sets arrive tonally pre-conditioned from the factory.",
      "s29_c3_desc": "Combining traditional FFW felt mastery with micrometer-level robotic and CNC precision.",
      "s29_c4_desc": "Thanks to the stored tension of Weickert Special felt, tonal response remains rock-solid for years.",
      "s29_c5_desc": "Widest dynamic range from the whisper of pianissimo to room-filling fortissimo projection.",
      "s29_c6_desc": "Bored to spec, securely riveted, with radiused tail ends and hand-inspected crown contours."
    }
  },

  # =========================================================================
  # KAPITEL 4: DER RENNER MUSTERTEILEKOFFER & HAMMERSTIELE (30 - 37)
  # =========================================================================
  "slide_30": {
    "subtitle": "The indispensable diagnostic and selection tool for restoration workshops",
    "elements": {
      "s30_bullet_1": "<strong>Direct Fit Testing:</strong> Sample parts can be installed and evaluated directly in customer instruments.",
      "s30_bullet_2": "<strong>Comprehensive Technical Manual:</strong> Extensive tables detailing lever lengths, angles, and flange spacings.",
      "s30_bullet_3": "<strong>Zero Ordering Errors:</strong> Unambiguous Renner item numbers ensure seamless replacement ordering.",
      "s30_caption_1": "The Renner Sample Parts Case (MTK) with accompanying technical handbook"
    }
  },
  "slide_31": {
    "subtitle": "Complete coverage of leverage ratios for grand pianos of all historical eras",
    "elements": {
      "s31_bullet_1": "<strong>15 Grand Whippen Configurations:</strong> Two units of each model included as evaluation samples in the case.",
      "s31_bullet_2": "<strong>2 Models Without Flange Cushion:</strong> Allow customized adaptation in historic non-standard actions.",
      "s31_bullet_3": "<strong>12 Interchangeable Flanges:</strong> Varied cushion heights and rake inclinations for fine-tuning lift leverage.",
      "s31_bullet_4": "<strong>Immediate Availability:</strong> All 15 whippen models are stocked at Renner as complete replacement sets.",
      "s31_caption_1": "Selection of 15 whippen models and interchangeable flanges in the sample case"
    }
  },
  "slide_32": {
    "subtitle": "Precision action components for grand and upright pianos to European and US specs",
    "elements": {
      "s32_bullet_1": "<strong>15 Grand Flanges:</strong> Varied screw hole centers, drop-screw locations, and center pin heights.",
      "s32_bullet_2": "<strong>10 Upright Flanges:</strong> For whippens and damper levers of modern and vintage uprights.",
      "s32_bullet_3": "<strong>Damper Levers (US & Renner):</strong> Tailored offsets and lengths accommodating both standards.",
      "s32_bullet_4": "<strong>Jacks & Action Rails:</strong> Sample profiles of all original Renner brass and extruded aluminium rails.",
      "s32_caption_1": "Original flanges, damper levers, and rail sample profiles in the MTK"
    }
  },
  "slide_33": {
    "subtitle": "Specialized upright action components, abstract extensions & damper bodies",
    "elements": {
      "s33_bullet_1": "<strong>Bass & Treble Dampers:</strong> Varied felt wedge and flat felt profiles for upright pianos.",
      "s33_bullet_2": "<strong>Damper Levers for AP & APK:</strong> Precision geometries matching Renner standard upright actions.",
      "s33_bullet_3": "<strong>Whippins with Abstract Extensions:</strong> For historic designs with drop-level keybeds.",
      "s33_bullet_4": "<strong>Hammer Butts:</strong> Diverse designs complete with pre-fitted flange and return spring.",
      "s33_caption_1": "Upright action components (AP / APK) in the sample parts case"
    }
  },
  "slide_34": {
    "subtitle": "Full restoration assortment including custom and patent shank configurations",
    "elements": {
      "s34_bullet_1": "<strong>16 Standard Grand Shanks with Flange:</strong> Two units of each specification included in the case.",
      "s34_bullet_2": "<strong>3 Shanks Without Flange:</strong> For custom re-pinning into original vintage flanges.",
      "s34_bullet_3": "<strong>Blüthner Patent Shanks:</strong> Authentic geometries tailored for historic Blüthner patent actions.",
      "s34_bullet_4": "<strong>Viennese Action & Clamping Sleeves:</strong> Specialist components for authentic restoration of historic Viennese grands.",
      "s34_caption_1": "16 authentic grand hammer shanks with pre-fitted flanges in the MTK"
    }
  },
  "slide_35": {
    "subtitle": "Exact matching of screw hole, slot, and let-off drop screw alignment",
    "elements": {
      "s35_b1_badge": "SAMPLE PARTS CASE",
      "s35_b2_badge": "FLANGE OVERVIEW",
      "s35_caption_1": "16 maker-specific flange geometries"
    }
  },
  "slide_36": {
    "subtitle": "The 7 decisive criteria for selecting the perfect hammer shank",
    "elements": {
      "s36_b1_badge": "BASS",
      "s36_b2_badge": "MID-RANGE",
      "s36_b3_badge": "TREBLE",
      "s36_b4_badge": "ADDITIONAL CRITERIA",
      "s36_b5_badge": "SHANK GEOMETRY",
      "s36_c1_title": "Shank Diameter",
      "s36_c2_title": "Shank Diameter",
      "s36_c3_title": "Shank Diameter",
      "s36_caption_1": "Knuckle positions and shank diameters",
      "s36_caption_2": "to Renner factory specifications"
    }
  },
  "slide_37": {
    "subtitle": "Strict quality flow: From optical camera inspection to mandatory assembly seasoning",
    "elements": {
      "s37_c1_title": "Automated Flange Assembly",
      "s37_c2_title": "Optical Camera Inspection",
      "s37_c3_title": "5-Day Seasoning (Rest Phase)",
      "s37_c1_desc": "Fully automated line installs center pins, bushing cloth, and screws under digital torque monitoring.",
      "s37_c2_desc": "Every knuckle and flange pin is optically scanned. Tenth-of-a-millimeter deviations are rejected immediately.",
      "s37_c3_desc": "All assembled shanks rest mandatory 5 days in climate storage. This step is a strict value-stream requirement and must never be curtailed!",
      "s37_caption_1": "5-day assembly seasoning: Stress relief before final manual inspection"
    }
  },

  # =========================================================================
  # KAPITEL 5: MASSBLÄTTER & GEOMETRIE (38 - 44)
  # =========================================================================
  "slide_38": {
    "subtitle": "Comprehensive capture of all geometric data for drop-in ready hammer sets",
    "elements": {
      "s38_bullet_1": "<strong>Instrument Baseline Data:</strong> Maker, serial number, model, year of build (e.g. Steinway & Sons M 170 #535100 from 1996).",
      "s38_bullet_2": "<strong>Baseline Data Frequently Sufficient:</strong> For renowned brands, these parameters allow Renner to supply an exact bored set directly.",
      "s38_bullet_3": "<strong>Precise Dimensional Records:</strong> For vintage, obscure, or modified pianos, total length, boring depth, thickness, and angles are recorded.",
      "s38_caption_1": "Original Renner hammerhead specification sheet for grand and upright pianos"
    }
  },
  "slide_39": {
    "subtitle": "Hundreds of pre-bored standard replacement sets available immediately",
    "elements": {
      "s39_c1_title": "• Steinway & Sons",
      "s39_c2_title": "• C. Bechstein",
      "s39_c3_title": "• Bösendorfer",
      "s39_c4_title": "• Julius Blüthner",
      "s39_c5_title": "• Wilhelm Schimmel",
      "s39_c6_title": "• Steingraeber & Söhne",
      "s39_c7_title": "• August Förster",
      "s39_c8_title": "• Yamaha & Kawai",
      "s39_c1_desc": "All models & historical eras",
      "s39_c2_desc": "Historic & contemporary",
      "s39_c3_desc": "Full spectrum of lengths",
      "s39_c4_desc": "Patent & standard actions",
      "s39_c5_desc": "Grands & uprights",
      "s39_c6_desc": "Concert scale specifications",
      "s39_c7_desc": "Heritage traditional scaling",
      "s39_c8_desc": "C / RX / GX series",
      "s39_caption_1": "Archived Renner standard datasets for worldwide restorations"
    }
  },
  "slide_40": {
    "subtitle": "The universal rule of thumb for grand hammerheads to Renner standards",
    "elements": {
      "s40_b1_badge": "RENNER RULE OF THUMB",
      "s40_b2_badge": "BORING DEPTH",
      "s40_b3_badge": "HAMMER-TO-SHANK",
      "s40_b4_badge": "RAKE ANGLE",
      "s40_b5_badge": "GEOMETRIC STANDARD",
      "s40_c1_title": "Length = Overall Length - 24 mm",
      "s40_c1_desc": "Exact insertion depth of the hammer shank.",
      "s40_c2_desc": "Matching Renner conical shanks.",
      "s40_c3_desc": "Strict perpendicularity to the string plane.",
      "s40_c4_desc": "Slight forward pitch when gluing.",
      "s40_caption_1": "Standard dimensions of grand hammerhead boring",
      "s40_caption_2": "to Renner engineering standards"
    }
  },
  "slide_41": {
    "subtitle": "Why Renner traditionally specifies boring angles in gon rather than degrees",
    "elements": {
      "s41_b1_badge": "ANGLE STANDARD",
      "s41_b2_badge": "BORING ANGLE TABLE",
      "s41_c1_title": "Decimal-grade divisions without fractional minutes",
      "s41_c1_desc": "Gon (gradians) enables finer, decimal-accurate angle division without fractional arc minutes. Typical values:",
      "s41_caption_1": "Boring angle schedule in gon",
      "s41_caption_2": "across the piano registers"
    }
  },
  "slide_42": {
    "subtitle": "Why excessive filing of worn hammers provokes premature string breakage",
    "elements": {
      "s42_b1_badge": "FORCE VECTOR",
      "s42_c1_title": "Perpendicular Strike",
      "s42_c2_title": "Shank Overhang",
      "s42_c1_desc": "At the moment of string impact, the hammer must strike at an exact 90° angle. The shank must have approx. 3 mm overhang. Through inertia, strike energy is channeled directly toward the soundboard bridge!",
      "s42_caption_1": "Geometry of hammer shank angle",
      "s42_caption_2": "and force vector toward the bridge"
    }
  },
  "slide_43": {
    "subtitle": "The proven 4-step calculation method developed by Renner Academy",
    "elements": {
      "s43_c1_title": "The 4-Step Calculation Formula:",
      "s43_caption_1": "Measurement diagram for determining hammer boring depth in grands"
    }
  },
  "slide_44": {
    "subtitle": "Step-by-step documentation guide for comprehensive restorations and new builds",
    "elements": {
      "s44_c1_title": "Grand Piano (GP) Form",
      "s44_c2_title": "Upright Piano (UP) Form",
      "s44_c1_desc": "Focus on overall length, boring depth, shank center, rake angle (91° gauge), and lift angle. Specially designed for salon and concert grands.",
      "s44_c2_desc": "Recording butt boring, butt flange, hammer length from pin axis, and rake angles for uprights and concert verticals.",
      "s44_caption_1": "Ready-to-use GP dimension sheet from the Renner Academy"
    }
  },

  # =========================================================================
  # KAPITEL 6: MONTAGE & VERLEIMUNG (45 - 57)
  # =========================================================================
  "slide_45": {
    "subtitle": "Pre-assembly in field sections according to piano scale division",
    "elements": {
      "s45_bullet_1": "<strong>Distribution in Sections:</strong> Mount shanks in sections according to string division, leaving 1-2 positions open between sections.",
      "s45_bullet_2": "<strong>Starting in the Treble:</strong> Begin from note 88 working down toward bass, following Renner's factory packaging order.",
      "s45_bullet_3": "<strong>Left-Hand Thread Catch:</strong> On used action rails, turn the screw counter-clockwise first until it drops into the existing thread pitch, then tighten lightly.",
      "s45_bullet_4": "<strong>New Screws with Disc Springs:</strong> Recommended: Renner screws with spring washers (item no. 43-0008745) for clean seating.",
      "s45_caption_1": "Pre-mounting hammer shanks on the action rail in scale sections"
    }
  },
  "slide_46": {
    "subtitle": "Acoustic frequency pairing of shanks to balance string response",
    "elements": {
      "s46_bullet_1": "<strong>Tapping Shanks:</strong> Lightly tapping unglued hammer shanks against the rail reveals their acoustic pitch.",
      "s46_bullet_2": "<strong>Ascending Frequency:</strong> Group shanks with ascending resonance frequency from bass to high treble.",
      "s46_bullet_3": "<strong>Acoustic Uniformity:</strong> Prevents isolated 'dead' notes and balances dynamic transmission across section breaks.",
      "s46_caption_1": "Acoustic sorting and frequency pairing of hammer shanks"
    }
  },
  "slide_47": {
    "subtitle": "Truing the shank path using blue paper under-spacers (Item 43-0005975)",
    "elements": {
      "s47_bullet_1": "<strong>90° Alignment of Boundary Shanks:</strong> Align the first and last shank of each section strictly perpendicular to the rail.",
      "s47_bullet_2": "<strong>Traveling Correction:</strong> Shanks tracking off-center are corrected by placing 0.2 mm blue gummed paper (item 43-0005975) under the flange.",
      "s47_bullet_3": "<strong>Angled Felt Knife (Item 43-0003252):</strong> Enables clean insertion and trimming of paper shims under the flange base.",
      "s47_bullet_4": "<strong>Section Shifting:</strong> Entire scale sections in older grands can be systematically shifted left or right to align with string spacing.",
      "s47_caption_1": "Traveling hammer shanks with 0.2 mm blue gummed paper shims"
    }
  },
  "slide_48": {
    "subtitle": "Why key numbers must be freshly applied in pencil prior to gluing",
    "elements": {
      "s48_bullet_1": "<strong>Sorting Out Spares:</strong> Lay the set out on the bench and separate extra spare hammers.",
      "s48_bullet_2": "<strong>Risk of Losing Numbers:</strong> Because hammer mouldings are tapered narrower than the cut width, factory markings are frequently planed off!",
      "s48_bullet_3": "<strong>Re-Numbering in Pencil:</strong> All 88 hammerheads must be re-numbered on their underside with soft pencil before gluing begins.",
      "s48_caption_1": "Inspection, sorting, and manual re-numbering of hammerheads"
    }
  },
  "slide_49": {
    "subtitle": "Positioning reference sample hammers and preparing the conical bore",
    "elements": {
      "s49_bullet_1": "<strong>Setting Reference Hammers:</strong> Mount the first and last hammer of each section as visual guide samples.",
      "s49_bullet_2": "<strong>Hand Reamer (Item 43-0003409):</strong> Reamer ø 5.0 mm with precise 1:50 taper; always rotate clockwise when cutting!",
      "s49_bullet_3": "<strong>Conical Reaming:</strong> The cylindrical factory bore is reamed to match the exact 1:50 taper of the Renner shank.",
      "s49_bullet_4": "<strong>Checking Friction Fit:</strong> The hammerhead must seat firmly and without wobble on the dry shank before adhesive is applied.",
      "s49_caption_1": "Hand reamer ø 5.0 mm (1:50) conically sizing the hammer bore"
    }
  },
  "slide_50": {
    "subtitle": "Why cylindrical bores fail and conical friction locking creates indestructible joints",
    "elements": {
      "s50_c1_title": "The Conical Advantage:",
      "s50_bullet_1": "<strong>No Glue Scraping:</strong> With cylindrical shanks, sliding the head on pushes glue outward – starving the joint of adhesive.",
      "s50_bullet_2": "<strong>Even Glue Film:</strong> With conical fits, wood surfaces make contact only across the final fraction of a millimeter.",
      "s50_bullet_3": "<strong>Wood Swelling Creates Wedge Lock:</strong> Moisture in the glue swells wood fibers in the bore, locking the shank in an unbreakable friction weld.",
      "s50_caption_1": "Cutaway diagram: Conical shank locked into conically reamed bore"
    }
  },
  "slide_51": {
    "subtitle": "Precise pitch angle verification during fitting and gluing",
    "elements": {
      "s51_bullet_1": "<strong>Grand Hammer Angle Gauge (Item 43-0005650):</strong> Specially calibrated 91° gauge designed for grand actions.",
      "s51_bullet_2": "<strong>Why 91°?</strong> The subtle 1° forward pitch exactly compensates for dynamic shank deflection under concert attack loads.",
      "s51_bullet_3": "<strong>Checking Reference Hammers:</strong> The first and last hammer of each section are precisely aligned to the 91° gauge.",
      "s51_caption_1": "Measuring with the authentic Renner 91° Grand Hammer Angle Gauge"
    }
  },
  "slide_52": {
    "subtitle": "Hot glue bath, pearl glue, rabbit glue vs. modern D3 PVA hardwood adhesive",
    "elements": {
      "s52_c1_title": "Hot Hide Glue (Traditional Choice)",
      "s52_c2_title": "PVA Cold Glue (Modern Choice)",
      "s52_c3_title": "Viscosity Rule:",
      "s52_c1_desc": "Electric glue pot 0.2 l (item 43-0003248), brown pearl glue (item 43-0001162), or rabbit glue granules (item 43-0004644). Cures into a glassy, acoustic joint; fully reversible.",
      "s52_c2_desc": "Special white glue for hardwoods (item 43-0007262). Extended open time, resilient bond.",
      "s52_c3_desc": "Glue viscosity must precisely match that of warm liquid honey!",
      "s52_caption_1": "Electric glue pot, pearl glue, and specialized PVA for hardwoods"
    }
  },
  "slide_53": {
    "subtitle": "Rotational mounting and optical sight-line checks in groups of three",
    "elements": {
      "s53_bullet_1": "<strong>Double Glue Application:</strong> Thin glue film on the shank tip and dripless application inside the bore.",
      "s53_bullet_2": "<strong>Rotational Motion:</strong> Twist hammerhead ~90° back and forth while seating -> guarantees a continuous 360° glue bead.",
      "s53_bullet_3": "<strong>Rule of Three:</strong> Glue 3 hammers in sequence and immediately sight the center one against reference guide hammers.",
      "s53_bullet_4": "<strong>Sight-Line Verification:</strong> Visually align the sight-line across front felt, rear felt, and tails.",
      "s53_caption_1": "Twisting hammerhead onto shank to ensure uniform 360° glue bead"
    }
  },
  "slide_54": {
    "subtitle": "Warm water brush for hot glue – Clean slicing after approx. 1 hour cure",
    "elements": {
      "s54_bullet_1": "<strong>Hot Water Brush:</strong> Immediately after seating, smooth the glue squeeze-out with hot water (or diluted glue wash for PVA).",
      "s54_bullet_2": "<strong>1-Hour Curing Window:</strong> After ~60 minutes, the protruding glue ring achieves the rubbery texture of gummy candy ('Gummibärchen').",
      "s54_bullet_3": "<strong>Clean Trimming:</strong> In this elastic state, the bead slices away cleanly with a sharp carving knife without scoring wood.",
      "s54_caption_1": "Cleanly trimming the glue ring after 1 hour curing time"
    }
  },
  "slide_55": {
    "subtitle": "Absolute center pin protection using the Renner Specialty Clamp (Item 43-0003233)",
    "elements": {
      "s55_bullet_1": "<strong>Threat to Flange Center Pin:</strong> Sawing force and sanding pressure must never transfer into the delicate center pin!",
      "s55_bullet_2": "<strong>Shank Clamping Pliers (Item 43-0003233):</strong> Grips the shank right behind the head, shunting all mechanical force directly into the clamp.",
      "s55_bullet_3": "<strong>Japanese Flush Saw Cut:</strong> Fine-toothed Japanese saw trims the protruding shank spigot flush with the wooden moulding.",
      "s55_caption_1": "Using clamping pliers to protect center pins while trimming shank ends"
    }
  },
  "slide_56": {
    "subtitle": "40-grit sanding block for reliable checking without jamming or bouncing",
    "elements": {
      "s56_c1_title": "Step 1: Sand Trimming Flush",
      "s56_c2_title": "Step 2: Shape Symmetrical Flank",
      "s56_c3_title": "Step 3: Optimum Backcheck Grip",
      "s56_c1_desc": "With a 40-grit sanding block, sand saw burrs flush with the core wood bevel.",
      "s56_c2_desc": "Shape a uniform tail angle. <strong>Crucial:</strong> Too round -> hammer bounces out of check! Too flat -> hammer binds upon release!",
      "s56_c3_desc": "The 40-grit scratch pattern leaves a fine wood texture that locks perfectly into backcheck leather.",
      "s56_caption_1": "Precise tail shaping for optimum backcheck engagement"
    }
  },
  "slide_57": {
    "subtitle": "Fine sanding file, deburring and spirit flame truing of the sight line",
    "elements": {
      "s57_bullet_1": "<strong>Breaking Edges:</strong> Sharp wooden corners along tail flanks are gently radiused with a fine sanding file.",
      "s57_bullet_2": "<strong>Flame Truing on Spirit Lamp:</strong> Minute alignment or spacing errors are corrected by gently warming the shank over a spirit flame.",
      "s57_bullet_3": "<strong>Installation-Ready State:</strong> The set is now mechanically trued, aligned, and ready for action regulation in the piano.",
      "s57_caption_1": "Final finish: Breaking edges and verifying sight line over spirit lamp"
    }
  },

  # =========================================================================
  # KAPITEL 7: DIE HOHE SCHULE DER INTONATION (58 - 68)
  # =========================================================================
  "slide_58": {
    "subtitle": "Tonal beauty, widest dynamic range, and the broadest overtone spectrum",
    "elements": {
      "s58_c1_title": "The 3 Core Objectives of Masterful Voicing:",
      "s58_bullet_1": "<strong>1. Full Tonal Beauty:</strong> Elevating the inherent sonic character of the specific piano to its highest potential.",
      "s58_bullet_2": "<strong>2. Maximum Dynamic Gradations:</strong> Every note must offer as many dynamic shadings as possible – from pianissimo to fortissimo.",
      "s58_bullet_3": "<strong>3. Broad Overtone Spectrum:</strong> Rich harmonic content delivering carrying projection and sustain in the hall.",
      "s58_caption_1": "The goal of master voicing: Open dynamic tone and singing sustain"
    }
  },
  "slide_59": {
    "subtitle": "Understanding scale design and room acoustics – mastering action and felt",
    "elements": {
      "s59_c1_title": "Immutable Factors",
      "s59_c2_title": "What We Can Influence:",
      "s59_bullet_1": "<strong>Design Scale:</strong> String scale, cast-iron plate, soundboard spruce",
      "s59_bullet_2": "<strong>Room Acoustics:</strong> Concert hall, studio, living room, academy",
      "s59_bullet_3": "<strong>Pianist:</strong> Individual touch, velocity, and aesthetic preference",
      "s59_bullet_4": "<strong>Renner Hammerheads & Felts:</strong> The perfect acoustic foundation",
      "s59_bullet_5": "<strong>Renner Action Parts:</strong> Precise leverage and energy transfer",
      "s59_bullet_6": "<strong>String Seating:</strong> Solid bedding on bridges, hitch pins, and agraffes",
      "s59_bullet_7": "<strong>Fine Regulation & Tuning:</strong> The indispensable foundation",
      "s59_caption_1": "The concert grand on stage: Room acoustics and instrument in harmony"
    }
  },
  "slide_60": {
    "subtitle": "The golden rule of Master Piano Builder Jens-Sören Kruse",
    "elements": {
      "s60_b1_badge": "JENS-SÖREN KRUSE",
      "s60_b2_badge": "REGULATION",
      "s60_c1_title": "The Indispensable Cycle",
      "s60_c1_desc": "“Without fine regulation there is no clean tuning,<br> and without fine regulation there is no clean voicing,<br> and without clean tuning there is no clean voicing.<br> <strong>One leads to the other, and everything is interconnected!”",
      "s60_caption_1": "Precision regulation of the grand action",
      "s60_caption_2": "prior to commencing voicing"
    }
  },
  "slide_61": {
    "subtitle": "Structured hammerhead zoning by register and dynamic objectives",
    "elements": {
      "s61_b1_badge": "FORTISSIMO (ff)",
      "s61_b2_badge": "FORTE (f)",
      "s61_b3_badge": "PIANO (p)",
      "s61_b4_badge": "PIANISSIMO (pp)",
      "s61_b5_badge": "RED ZONE (APEX)",
      "s61_b6_badge": "JENS-SÖREN KRUSE",
      "s61_c1_title": "Blue Wedge",
      "s61_c2_title": "Green Wedge",
      "s61_c3_title": "Orange Wedge",
      "s61_c4_title": "Violet Wedge",
      "s61_c5_title": "DO NOT TOUCH! – Never prick deeply here!",
      "s61_c1_desc": "Deep needle stitches for tension release",
      "s61_c2_desc": "Projection, brilliance, and dynamic blossoming",
      "s61_c3_desc": "Lyrical singing tone, nuanced balance",
      "s61_c4_desc": "Whisper-soft pianissimo response",
      "s61_caption_1": "Original Renner Clock Model",
      "s61_caption_2": "with the 4 dynamic wedges (ff, f, p, pp)"
    }
  },
  "slide_62": {
    "subtitle": "Relieving factory pre-tension and channeling elastic energy into the forte wedge",
    "elements": {
      "s62_bullet_1": "<strong>Work Zone:</strong> Exclusively in the blue fortissimo wedge (clock zones 9:00–10:00 and 2:00–3:00).",
      "s62_bullet_2": "<strong>Deep Needling:</strong> Insert needles deeply to just short of the underfelt (never pierce underfelt or core wood!).",
      "s62_bullet_3": "<strong>Tension Transfer:</strong> The head sheds rigid factory stiffness; stored tension flows into the green forte wedge.",
      "s62_bullet_4": "<strong>Recommendation:</strong> This step is recommended almost without exception prior to first playing-in in the instrument.",
      "s62_caption_1": "Pre-needling: Deep stitches in the fortissimo wedge (9:00 to 10:00 o'clock)"
    }
  },
  "slide_63": {
    "subtitle": "Press, do not chop – Exact stitch counts for bass, mid-range, and treble",
    "elements": {
      "s63_bullet_1": "<strong>Stitch Counts for Pre-Needling:</strong> <br>• Bass: 7–10 stitches horizontally <br>• Mid-Range: 5–10 stitches horizontally <br>• Treble: 0–7 stitches vertically",
      "s63_bullet_2": "<strong>Press, never chop!</strong> Press needles steadily using body weight. Chopping tears wool fibers uncontrollably!",
      "s63_bullet_3": "<strong>Original Renner Tools:</strong> <br>• Adjustable Voicing Tool (item 43-0005642) <br>• 3-Needle Voicing Tool Professional (item 43-0003270) <br>• Nickel-plated needles no. 7 ø 0.60 mm, 9 mm long (item 43-0003426).",
      "s63_caption_1": "Renner voicing tools, needle handles, and adjustable voicing instrument"
    }
  },
  "slide_64": {
    "subtitle": "“The finest hammerhead can only reveal what is programmed into the instrument!”",
    "elements": {
      "s64_caption_1": "Bedding strings firmly at the hitch pin using brass drift punch"
    }
  },
  "slide_65": {
    "subtitle": "Optimizing notes 69–88 by micro-shifting the keyframe strike line",
    "elements": {
      "s65_bullet_1": "<strong>Test Strike Point on Note 88:</strong> Shift keyframe slightly forward and back to locate the brightest, most singing treble sweet spot.",
      "s65_bullet_2": "<strong>Optimize Notes 69 to 88:</strong> The high treble on many grands improves dramatically once the strike line is precisely repositioned!",
      "s65_bullet_3": "<strong>Squareness of All Hammers:</strong> Test by plucking strings or lifting jacks with finger; mark corrections with chalk on key tops.",
      "s65_caption_1": "Verifying treble strike point and square alignment of hammerheads"
    }
  },
  "slide_66": {
    "subtitle": "Adapting the strike crown to the 3-string unison using a fine hammer file",
    "elements": {
      "s66_c1_title": "Hollow Crown",
      "s66_c2_title": "Crooked Crown",
      "s66_c3_title": "Level & Symmetrical (Crown OK)",
      "s66_c1_desc": "Crown contacts only outer strings -> incomplete attack tone, must be filed level.",
      "s66_c2_desc": "Asymmetrical contact creates double attack and string buzz -> file true to string plane.",
      "s66_c3_desc": "Simultaneous solid contact on all 3 unison strings for a full fundamental tone.",
      "s66_caption_1": "Filing hammer crowns for perfect flush alignment to 3-string unisons"
    }
  },
  "slide_67": {
    "subtitle": "Chromatic listening and delicate evening-out of individual notes",
    "elements": {
      "s67_bullet_1": "<strong>Chromatic Play-Through:</strong> Play chromatically up and down the keyboard; flag notes with harsh attack or uneven volume.",
      "s67_bullet_2": "<strong>Mid-Voicing:</strong> Gentle needle pricks in green forte and orange piano wedges. Overly soft notes are firmed by light surface sanding!",
      "s67_bullet_3": "<strong>Final Voicing:</strong> Short single needle (BDK handle item 43-0003269 or Chop Stick item 43-0003271).",
      "s67_bullet_4": "<strong>Max. 2 mm Depth at Crown:</strong> Insert only between string grooves, never directly into the string depressions!",
      "s67_caption_1": "Chromatic listening and fine voicing with short single needle"
    }
  },
  "slide_68": {
    "subtitle": "Voicing the una corda pedal, eliminating noise & welcome to the Renner dialogue",
    "elements": {
      "s68_b1_badge": "UNA CORDA PRACTICE",
      "s68_b2_badge": "RENNER ACADEMY",
      "s68_b3_badge": "LOUIS RENNER GMBH",
      "s68_c1_title": "Shift Pedal Voicing (Una Corda)",
      "s68_c2_title": "Renner Academy & Technical Dialogue",
      "s68_c1_desc": "Play chromatically with shift pedal depressed; gently voice only the contacted string contact areas.",
      "s68_c2_desc": "Renner provides masterclasses, factory tours in Meuselwitz, and tailored technical support for piano technicians worldwide.",
      "s68_caption_1": "Louis Renner GmbH",
      "s68_caption_2": "Your partner for master-grade tone worldwide"
    }
  }
}

def main():
    with open(MASTER_FILE, "r", encoding="utf-8") as f:
        master_data = json.load(f)

    slides = master_data.get("slides", {})
    updated_count = 0

    for slide_id, trans in TRANSLATIONS.items():
        if slide_id not in slides:
            print(f"Warning: {slide_id} not found in master data")
            continue
        
        slide_obj = slides[slide_id]
        
        # Update subtitle if present
        if "subtitle" in trans:
            if "subtitle" in slide_obj and isinstance(slide_obj["subtitle"], dict):
                slide_obj["subtitle"]["en"] = trans["subtitle"]
                updated_count += 1
                
        # Update elements
        if "elements" in trans:
            slide_elements = slide_obj.setdefault("elements", {})
            for elem_key, en_text in trans["elements"].items():
                if elem_key in slide_elements and isinstance(slide_elements[elem_key], dict):
                    slide_elements[elem_key]["en"] = en_text
                    updated_count += 1
                else:
                    # Create element entry if missing
                    slide_elements[elem_key] = {
                        "de": en_text, # fallback
                        "en": en_text,
                        "ja": en_text,
                        "zh": en_text
                    }
                    updated_count += 1

    with open(MASTER_FILE, "w", encoding="utf-8") as f:
        json.dump(master_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully applied {updated_count} English translations to {MASTER_FILE}")

if __name__ == "__main__":
    main()
