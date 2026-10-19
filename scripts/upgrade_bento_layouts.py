#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/upgrade_bento_layouts.py
Upgrades all split-layout slides in Chapters 2 to 7 of slide_definitions.py
to authentic @SlidesbySander Bento Grid layouts, matching the aesthetics of Chapter 1.
Preserves 100% data-i18n integrity and synchronizes translations in translations/slides_content.json.
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDE_DEFS_FILE = os.path.join(BASE_DIR, "slide_definitions.py")
TRANSLATIONS_MASTER = os.path.join(BASE_DIR, "translations", "slides_content.json")

BADGES = {
    7: {
        "b1": {"de": "TRADITION 1783", "en": "TRADITION 1783", "ja": "伝統 1783", "zh": "传统 1783"},
        "b2": {"de": "WURZEN (SACHSEN)", "en": "WURZEN (SAXONY)", "ja": "ヴルツェン（ザクセン）", "zh": "武尔岑（萨克森）"}
    },
    8: {
        "b1": {"de": "FFW WURZEN", "en": "FFW WURZEN", "ja": "FFW ヴルツェン", "zh": "FFW 武尔岑"},
        "b2": {"de": "EXKLUSIV-PARTNER", "en": "EXCLUSIVE PARTNER", "ja": "独占パートナー", "zh": "独家合作伙伴"}
    },
    9: {
        "b1": {"de": "ROHSTOFF-SELEKTION", "en": "RAW MATERIAL SELECTION", "ja": "原料選定", "zh": "原料筛选"},
        "b2": {"de": "UNVERPRESSTE BALLEN", "en": "UNPRESSED BALES", "ja": "非圧縮ベール", "zh": "非压制原包"}
    },
    10: {
        "b1": {"de": "MANUFAKTURGEHEIMNIS", "en": "MANUFACTURING SECRET", "ja": "秘伝の配合", "zh": "工坊秘制配方"},
        "b2": {"de": "FASERAUFBEREITUNG", "en": "FIBER PREPARATION", "ja": "繊維調合", "zh": "纤维处理"}
    },
    11: {
        "b1": {"de": "FASERORIENTIERUNG", "en": "FIBER ORIENTATION", "ja": "繊維配向", "zh": "纤维走向"},
        "b2": {"de": "KARDIEREN & VLIES", "en": "CARDING & FLEECE", "ja": "カーディング＆フリース", "zh": "梳理与絮片"}
    },
    12: {
        "b1": {"de": "HEISSDAMPF", "en": "HOT STEAM", "ja": "熱蒸気", "zh": "高温蒸汽"},
        "b2": {"de": "MECHANISCHER DRUCK", "en": "MECHANICAL PRESSURE", "ja": "機械圧力", "zh": "机械压力"},
        "b3": {"de": "OSZILLATION", "en": "OSCILLATION", "ja": "振動摩擦", "zh": "往复振动"},
        "b4": {"de": "HANDWERKSKUNST", "en": "CRAFTSMANSHIP", "ja": "熟練の技", "zh": "匠人工艺"},
        "b5": {"de": "HAMMERWALKE", "en": "HAMMER MILL", "ja": "ハンマー縮絨", "zh": "槌击缩绒"}
    },
    14: {
        "b1": {"de": "FORMGEBUNG OHNE SCHLEIFEN", "en": "SHAPING WITHOUT GRINDING", "ja": "研磨なし成形", "zh": "无磨损成形"},
        "b2": {"de": "HAMMER & STEIN", "en": "HAMMER & STONE", "ja": "ハンマー＆ストーン", "zh": "毡槌与石滚"}
    },
    15: {
        "b1": {"de": "KLIMATISIERTES FILZLAGER", "en": "CLIMATE-CONTROLLED STORAGE", "ja": "定温定湿保管", "zh": "恒温恒湿毛毡库"},
        "b2": {"de": "MEUSELWITZ LAGER", "en": "MEUSELWITZ STORAGE", "ja": "モイゼルヴィッツ保管庫", "zh": "梅瑟尔维茨仓储"}
    },
    16: {
        "b1": {"de": "MARKENZEICHEN", "en": "HALLMARK", "ja": "特徴・商標", "zh": "品牌精髓"},
        "b2": {"de": "DICHTEGRADIENT", "en": "DENSITY GRADIENT", "ja": "密度勾配", "zh": "密度梯度"}
    },
    17: {
        "b1": {"de": "EXKLUSIVITÄT", "en": "EXCLUSIVITY", "ja": "独占供給", "zh": "独家专供"},
        "b2": {"de": "WEICKERT SPECIAL", "en": "WEICKERT SPECIAL", "ja": "ヴァイケルト・スペシャル", "zh": "魏克特特级毡"}
    },
    18: {
        "b1": {"de": "ROBOTERTECHNOLOGIE", "en": "ROBOTICS", "ja": "ロボット技術", "zh": "机器人切割"},
        "b2": {"de": "WERKSVIDEO MEUSELWITZ", "en": "FACTORY VIDEO MEUSELWITZ", "ja": "工場動画 モイゼルヴィッツ", "zh": "梅瑟尔维茨车间视频"}
    },
    19: {
        "b1": {"de": "QUALITÄTSKONTROLLE", "en": "QUALITY CONTROL", "ja": "品質管理", "zh": "品质管控"},
        "b2": {"de": "DECKFILZ-STREIFEN", "en": "TOP FELT STRIPS", "ja": "トップフェルト帯", "zh": "外层毛毡条"}
    },
    20: {
        "b1": {"de": "UNTERFILZ-FRÄSEN", "en": "UNDERFELT MILLING", "ja": "アンダーフェルト切削", "zh": "内层毡铣型"},
        "b2": {"de": "WERKSVIDEO", "en": "FACTORY VIDEO", "ja": "工場動画", "zh": "车间视频"}
    },
    21: {
        "b1": {"de": "KLASSIKER", "en": "CLASSIC", "ja": "定番カラー", "zh": "经典配色"},
        "b2": {"de": "14 FARBTÖNE", "en": "14 COLOR SHADES", "ja": "14色展開", "zh": "14种定制色彩"}
    },
    23: {
        "b1": {"de": "SYMMETRISCH", "en": "SYMMETRICAL", "ja": "対称形状", "zh": "对称截面"},
        "b2": {"de": "ASYMMETRISCH", "en": "ASYMMETRICAL", "ja": "非対称形状", "zh": "非对称截面"}
    },
    24: {
        "b1": {"de": "VORFORMUNG", "en": "PRE-FORMING", "ja": "予備成形", "zh": "毛毡预成型"},
        "b2": {"de": "BIEGEKRAFT", "en": "BENDING FORCE", "ja": "曲げ応力", "zh": "弯曲成弧"}
    },
    25: {
        "b1": {"de": "HOCHDRUCK-PRESSEN", "en": "HIGH-PRESSURE PRESSING", "ja": "高圧プレス", "zh": "高压压制"},
        "b2": {"de": "WERKSVIDEO", "en": "FACTORY VIDEO", "ja": "工場動画", "zh": "车间视频"}
    },
    26: {
        "b1": {"de": "RIEGEL-FERTIGUNG", "en": "MOULD PRODUCTION", "ja": "モール製造", "zh": "整体压制音槌排"},
        "b2": {"de": "PRESS-RIEGEL", "en": "PRESSED MOULD", "ja": "プレスモール", "zh": "连排音槌木"}
    },
    27: {
        "b1": {"de": "CNC-ABRICHTEN", "en": "CNC DRESSING", "ja": "CNC切削仕上げ", "zh": "CNC精加工"},
        "b2": {"de": "CNC-FRÄSUNG", "en": "CNC MILLING", "ja": "CNCフライス加工", "zh": "数控分切"}
    },
    28: {
        "b1": {"de": "VEREDELUNG & ENDBEARBEITUNG", "en": "FINISHING & FINAL TOUCH", "ja": "精密仕上げ加工", "zh": "精磨与成型"},
        "b2": {"de": "WERKSVIDEO", "en": "FACTORY VIDEO", "ja": "工場動画", "zh": "车间视频"}
    },
    29: {
        "b1": {"de": "MASSGESCHNEIDERT", "en": "CUSTOM-MADE", "ja": "カスタムメイド", "zh": "专属定制"},
        "b2": {"de": "EFFIZIENZ", "en": "EFFICIENCY", "ja": "効率性", "zh": "免初整音"},
        "b3": {"de": "PRÄZISION", "en": "PRECISION", "ja": "超高精度", "zh": "微米精度"},
        "b4": {"de": "STABILITÄT", "en": "STABILITY", "ja": "耐久性", "zh": "音色持久"},
        "b5": {"de": "OBERTONREICH", "en": "RICH HARMONICS", "ja": "倍音の豊かさ", "zh": "泛音丰富"},
        "b6": {"de": "EINBAUFERTIG", "en": "READY TO INSTALL", "ja": "取付即応", "zh": "到手即装"}
    },
    30: {
        "b1": {"de": "WERKSTATT-STANDARD", "en": "WORKSHOP STANDARD", "ja": "工房の基準器", "zh": "车间诊断标准"},
        "b2": {"de": "MTK SYSTEM", "en": "SAMPLE KIT SYSTEM", "ja": "MTKシステム", "zh": "MTK精准选配箱"}
    },
    31: {
        "b1": {"de": "HEBEL-GEOMETRIE", "en": "LEVER GEOMETRY", "ja": "レバー幾何学", "zh": "杠杆几何"},
        "b2": {"de": "WECHSELSÄTTEL", "en": "EXCHANGEABLE HEELS", "ja": "交換式ヒール", "zh": "可替换顶柱托"}
    },
    32: {
        "b1": {"de": "DÄMPFUNG & MECHANIK", "en": "DAMPER & ACTION", "ja": "ダンパー＆アクション", "zh": "止音与击弦配件"},
        "b2": {"de": "ORIGINALTEILE", "en": "GENUINE PARTS", "ja": "純正部品", "zh": "原厂精密配件"}
    },
    33: {
        "b1": {"de": "KLAVIER & PIANINO", "en": "UPRIGHT & PIANO", "ja": "アップライトピアノ", "zh": "立式钢琴机件"},
        "b2": {"de": "AP-SERIEN", "en": "AP SERIES", "ja": "APシリーズ", "zh": "AP立式系列"}
    },
    34: {
        "b1": {"de": "STIEL-SORTIMENT", "en": "SHANK ASSORTMENT", "ja": "シャンクラインナップ", "zh": "槌柄配置"},
        "b2": {"de": "VORMONTIERT", "en": "PRE-ASSEMBLED", "ja": "事前組立済", "zh": "预装微调总成"}
    },
    37: {
        "b1": {"de": "BAUGRUPPENRUHE", "en": "ASSEMBLY SETTLING", "ja": "アセンブリシーズニング", "zh": "总成应力消除"},
        "b2": {"de": "KLIMARAUM", "en": "CLIMATE ROOM", "ja": "定温定湿室", "zh": "恒温平衡室"}
    },
    38: {
        "b1": {"de": "BESTELLSYSTEMATIK", "en": "ORDERING SYSTEM", "ja": "発注システム", "zh": "订制规范"},
        "b2": {"de": "MASSBLATT GP/UP", "en": "SPEC SHEET GP/UP", "ja": "仕様書 GP/UP", "zh": "三角/立式规格表"}
    },
    39: {
        "b1": {"de": "WERKSARCHIV", "en": "FACTORY ARCHIVE", "ja": "メーカーアーカイブ", "zh": "百年数据档案"},
        "b2": {"de": "GLOBALER STANDARD", "en": "GLOBAL STANDARD", "ja": "世界基準", "zh": "世界名琴标准"}
    },
    43: {
        "b1": {"de": "FORMEL-BERECHNUNG", "en": "FORMULA CALCULATION", "ja": "計算式算出", "zh": "公式推导"},
        "b2": {"de": "GEOMETRISCHE ACHSE", "en": "GEOMETRIC AXIS", "ja": "幾何学的基準軸", "zh": "几何中心轴"}
    },
    44: {
        "b1": {"de": "FLÜGEL (GP)", "en": "GRAND PIANO (GP)", "ja": "グランドピアノ（GP）", "zh": "三角琴（GP）"},
        "b2": {"de": "KLAVIER (UP)", "en": "UPRIGHT PIANO (UP)", "ja": "アップライトピアノ（UP）", "zh": "立式琴（UP）"}
    },
    45: {
        "b1": {"de": "MONTAGE-SCHRITT 01", "en": "ASSEMBLY STEP 01", "ja": "組立工程 01", "zh": "装配步骤 01"},
        "b2": {"de": "SPACING-KONTROLLE", "en": "SPACING CHECK", "ja": "間隔調整", "zh": "均等间距校验"}
    },
    46: {
        "b1": {"de": "AKUSTISCHE SELEKTION", "en": "ACOUSTIC SELECTION", "ja": "音響的選別", "zh": "声学校正筛选"},
        "b2": {"de": "KLANG-SELEKTION", "en": "TONE MATCHING", "ja": "トーンマッチング", "zh": "频响共振配对"}
    },
    47: {
        "b1": {"de": "PRÄZISIONSAUSRICHTUNG", "en": "PRECISION ALIGNMENT", "ja": "精密垂直調整", "zh": "垂直走行校正"},
        "b2": {"de": "TRAVELING PAPER", "en": "TRAVELING PAPER", "ja": "トラベリングペーパー", "zh": "走直校正衬纸"}
    },
    48: {
        "b1": {"de": "QUALITÄTSSICHERUNG", "en": "QUALITY ASSURANCE", "ja": "品質保証", "zh": "品质保证"},
        "b2": {"de": "SATZ-INTEGRITÄT", "en": "SET INTEGRITY", "ja": "セット順序管理", "zh": "组序严格受控"}
    },
    49: {
        "b1": {"de": "REFERENZHÄMMER", "en": "REFERENCE HAMMERS", "ja": "基準ハンマー", "zh": "基准定位槌"},
        "b2": {"de": "KONISCHES REIBEN", "en": "TAPER REAMING", "ja": "テーパーリーミング", "zh": "锥孔精准扩磨"}
    },
    50: {
        "b1": {"de": "FORM- & KRAFTSCHLUSS", "en": "POSITIVE FIT & LOCK", "ja": "嵌合と締結", "zh": "刚性形变自锁"},
        "b2": {"de": "KEGELSITZ", "en": "TAPER SEAT", "ja": "テーパーシート", "zh": "锥形紧密配合"}
    },
    51: {
        "b1": {"de": "WINKELKALIBRIERUNG", "en": "ANGLE CALIBRATION", "ja": "角度校正", "zh": "角度校准"},
        "b2": {"de": "ANSCHLAGSWINKEL", "en": "STRIKE ANGLE", "ja": "打弦角度", "zh": "击弦倾角"}
    },
    52: {
        "b1": {"de": "HEISSLEIM (65°C)", "en": "HOT GLUE (65°C)", "ja": "膠接着（65℃）", "zh": "传统皮胶（65℃）"},
        "b2": {"de": "KALTLEIM (D3)", "en": "COLD GLUE (D3)", "ja": "白ボンド（D3）", "zh": "白胶（D3）"}
    },
    53: {
        "b1": {"de": "HANDWERKSTECHNIK", "en": "CRAFT TECHNIQUE", "ja": "伝統技法", "zh": "手工秘法"},
        "b2": {"de": "DREHBEWEGUNG", "en": "ROTATIONAL MOTION", "ja": "回転塗布", "zh": "旋转涂布均匀"}
    },
    54: {
        "b1": {"de": "VERPUTZTECHNIK", "en": "CLEANING TECHNIQUE", "ja": "膠面仕上げ技法", "zh": "胶缝清理技法"},
        "b2": {"de": "SAUBERE FUGE", "en": "CLEAN JOINT", "ja": "クリーンジョイント", "zh": "平顺无残留"}
    },
    55: {
        "b1": {"de": "KAPPVERFAHREN", "en": "TRIMMING METHOD", "ja": "切断工法", "zh": "切柄与修整"},
        "b2": {"de": "DOZUKI SÄGE", "en": "DOZUKI SAW", "ja": "胴付鋸", "zh": "道突精密手锯"}
    },
    56: {
        "b1": {"de": "SCHRITT 01", "en": "STEP 01", "ja": "工程 01", "zh": "步骤 01"},
        "b2": {"de": "SCHRITT 02", "en": "STEP 02", "ja": "工程 02", "zh": "步骤 02"}
    },
    57: {
        "b1": {"de": "MEISTER-FINISH", "en": "MASTER FINISH", "ja": "マイスター仕上げ", "zh": "大师级收尾"},
        "b2": {"de": "VEREDELTE KANTEN", "en": "REFINED EDGES", "ja": "面取り仕上げ", "zh": "倒角精细处理"}
    },
    58: {
        "b1": {"de": "KLANGPHILOSOPHIE", "en": "SOUND PHILOSOPHY", "ja": "整音の哲学", "zh": "声音哲学"},
        "b2": {"de": "DIE SEELE DES TONS", "en": "SOUL OF SOUND", "ja": "音の魂", "zh": "钢琴音色之魂"}
    },
    59: {
        "b1": {"de": "AKUSTISCHE GRENZEN", "en": "ACOUSTIC LIMITS", "ja": "音響的制約", "zh": "固有物理边界"},
        "b2": {"de": "RESONANZBODEN & SAITEN", "en": "SOUNDBOARD & STRINGS", "ja": "響板と弦", "zh": "音板与琴弦协同"}
    },
    62: {
        "b1": {"de": "PRE-NEEDLING", "en": "PRE-NEEDLING", "ja": "下整音（針刺し）", "zh": "基础刺针整音"},
        "b2": {"de": "GRUNDELASTIZITÄT", "en": "BASIC ELASTICITY", "ja": "基本弾力性", "zh": "建立核心弹性"}
    },
    63: {
        "b1": {"de": "WERKZEUGKUNDE", "en": "TOOL SET", "ja": "専門工具", "zh": "专业整音工具"},
        "b2": {"de": "PRÄZISIONSNADELN", "en": "PRECISION NEEDLES", "ja": "精密針", "zh": "进口精密排针"}
    },
    64: {
        "b1": {"de": "SAITEN-BETTUNG", "en": "STRING BEDDING", "ja": "弦合わせ工程", "zh": "琴弦沉实就位"},
        "b2": {"de": "CHORREINHEIT", "en": "UNISON PURITY", "ja": "同音同調の純度", "zh": "三弦同音纯净"}
    },
    65: {
        "b1": {"de": "STRIKE POINT", "en": "STRIKE POINT", "ja": "打弦点探索", "zh": "最佳击弦点"},
        "b2": {"de": "DISKANTGLANZ", "en": "TREBLE BRILLIANCE", "ja": "高音域の輝き", "zh": "高音晶莹通透"}
    },
    66: {
        "b1": {"de": "HOHL VOR RUND", "en": "HOLLOW BEFORE ROUND", "ja": "削り技法", "zh": "修磨技法"},
        "b2": {"de": "KRONENSCHEITEL", "en": "CROWN APEX", "ja": "クラウン頂点", "zh": "槌顶圆弧"}
    },
    67: {
        "b1": {"de": "FEININTONATION", "en": "FINE VOICING", "ja": "仕上げ整音", "zh": "精细色彩调配"},
        "b2": {"de": "FARBPALETTE", "en": "COLOR PALETTE", "ja": "色彩パレット", "zh": "全音域色彩平衡"}
    }
}

METRICS = {
    7: ("1783", "Gegründet"),
    9: ("100%", "Reine Schurwolle"),
    11: ("100%", "Parallele Ausrichtung"),
    15: ("30+", "Plattensorten"),
    17: ("100%", "Renner Exklusiv"),
    18: ("±0,01", "mm Toleranz"),
    21: ("14", "Farbtöne"),
    25: ("16", "Tonnen Druck"),
    26: ("88", "Tasten im Block"),
    28: ("T", "Messing-Nietung"),
    30: ("MTK", "Diagnose-System"),
    31: ("15 & 12", "Hebel & Sättel"),
    34: ("16", "Stielvarianten"),
    37: ("5", "Tage Baugruppenruhe"),
    38: ("14", "Kernparameter"),
    39: ("100+", "Jahre Werksdaten"),
    43: ("GL - 24", "mm Formel"),
    46: ("Hz", "Resonanz-Matching"),
    48: ("1 – 88", "Satz-Nummerierung"),
    49: ("5,4", "mm Reibahle"),
    50: ("1:30", "Konusverhältnis"),
    51: ("91°", "Winkellehre"),
    52: ("65°C", "Glutin-Heißleim"),
    55: ("Dozuki", "Präzisionsschnitt"),
    62: ("pp – ff", "Vorintonation"),
    63: ("3 & 1", "Nadelwerkzeuge"),
    65: ("3", "Saiten Tricord"),
}

NEW_BULLETS = {
    43: {
        "s43_bullet_1": {
            "de": "<strong>1. Steighöhe & Tastenweg:</strong> Mechanikhub (46–48 mm) und Spieltiefe (10–10,5 mm) exakt einmessen.",
            "en": "<strong>1. Blow Distance & Key Dip:</strong> Measure action blow distance (46–48 mm) and key dip (10–10.5 mm) precisely.",
            "ja": "<strong>1. 打弦距離とキーの深さ：</strong> アクションの打弦距離（46〜48 mm）とキーの深さ（10〜10.5 mm）を正確に測定。",
            "zh": "<strong>1. 开门与下中深度：</strong> 精确测量击弦距离（46–48 mm）和琴键下沉深度（10–10.5 mm）。"
        },
        "s43_bullet_2": {
            "de": "<strong>2. Schnabellinie bestimmen:</strong> Höhe der Kapselleiste zur Saitenunterkante als Referenzmaß nehmen.",
            "en": "<strong>2. Flange Rail Reference:</strong> Use height of flange rail relative to string underside as datum plane.",
            "ja": "<strong>2. フレンジレールの基準線：</strong> 弦下面に対するフレンジレールの高さを基準面として設定。",
            "zh": "<strong>2. 弦总成基准线：</strong> 以微调总成轨道至琴弦下沿的高度作为基准基面。"
        },
        "s43_bullet_3": {
            "de": "<strong>3. Faustformel anwenden:</strong> Bohrungslänge = Gesamtlänge - 24 mm für Standard-Flügelgeometrien.",
            "en": "<strong>3. Apply Rule of Thumb:</strong> Boring length = overall length - 24 mm for standard grand piano geometries.",
            "ja": "<strong>3. 基本公式の適用：</strong> 標準的なグランドピアノではボア長＝全長 - 24 mm。",
            "zh": "<strong>3. 应用核心公式：</strong> 标准三角琴规格采用 钻孔长度 = 总长 - 24 mm。"
        },
        "s43_bullet_4": {
            "de": "<strong>4. Mathematische Kontrolle:</strong> Stielüberstand von mindestens 3 mm für Festigkeit berücksichtigen.",
            "en": "<strong>4. Mathematical Verification:</strong> Ensure a shank protrusion of at least 3 mm for structural integrity.",
            "ja": "<strong>4. 数学的検証：</strong> 強度確保のためシャンク突出量が最低3 mmあることを確認。",
            "zh": "<strong>4. 数学复核校验：</strong> 确保留出至少 3 mm 的柄头余量以保障抗剪强度。"
        }
    },
    64: {
        "s64_bullet_1": {
            "de": "<strong>Anhangstifte setzen:</strong> Saiten von hinten nach vorn am Anhangstift mit Messingdurchschlag und leichtem Hammer vorsichtig niederschlagen.",
            "en": "<strong>Setting Hitch Pins:</strong> Carefully seat strings from back to front at hitch pins using a brass drift punch and light hammer.",
            "ja": "<strong>ヒッチピンの弦合わせ：</strong> 真鍮ポンチと軽量ハンマーで弦をヒッチピンに慎重に密着。",
            "zh": "<strong>挂弦钉沉降：</strong> 用黄铜冲头和轻手锤将琴弦自后向前轻敲至挂弦钉根部沉实。"
        },
        "s64_bullet_2": {
            "de": "<strong>Saiten an Stegstiften anpassen:</strong> Mit speziellem Renner-Setzer die Saiten auf den Steg drücken, um falsche Schwingungen auszuschließen.",
            "en": "<strong>Bridge Pin Alignment:</strong> Seat strings on the bridge with Renner bridge punch to eliminate false beats.",
            "ja": "<strong>駒ピンの弦合わせ：</strong> 専用セッターで弦を駒に押し込み、不要なノイズや偽うなりを排除。",
            "zh": "<strong>弦码钉就位：</strong> 使用专用敲合器使琴弦紧贴弦码，消除假杂音与拍音。"
        },
        "s64_bullet_3": {
            "de": "<strong>Chorreinheit abstimmen:</strong> Vor der ersten Intonationsnadelung muss der Saitenchor absolut rein und nebengeräuschfrei klingen.",
            "en": "<strong>Unison Purity:</strong> Before the first voicing needle, the unison must ring absolutely pure and free of unwanted friction.",
            "ja": "<strong>同音の純度調整：</strong> 最初の針刺し前に、ユニゾンが完全に澄み切りノイズのない状態に調弦。",
            "zh": "<strong>同音同轴纯净度：</strong> 首次刺针整音前，三根同音弦必须调校至完全纯净、绝无杂音。"
        }
    }
}

def get_chapter_watermark(snum):
    if snum <= 4: return "01"
    if snum <= 17: return "02"
    if snum <= 29: return "03"
    if snum <= 37: return "04"
    if snum <= 44: return "05"
    if snum <= 57: return "06"
    return "07"

def sync_translations_to_master():
    with open(TRANSLATIONS_MASTER, "r", encoding="utf-8") as f:
        master = json.load(f)

    added_badges = 0
    for snum, badge_dict in BADGES.items():
        skey = f"slide_{snum:02d}"
        if skey not in master["slides"]:
            continue
        slide_entry = master["slides"][skey]
        if "elements" not in slide_entry:
            slide_entry["elements"] = {}
        for b_name, b_trans in badge_dict.items():
            el_key = f"s{snum}_{b_name}_badge"
            if el_key not in slide_entry["elements"]:
                slide_entry["elements"][el_key] = b_trans
                added_badges += 1
            else:
                for lang in ["de", "en", "ja", "zh"]:
                    if not slide_entry["elements"][el_key].get(lang):
                        slide_entry["elements"][el_key][lang] = b_trans[lang]

    added_bullets = 0
    for snum, bullet_dict in NEW_BULLETS.items():
        skey = f"slide_{snum:02d}"
        if skey not in master["slides"]:
            continue
        slide_entry = master["slides"][skey]
        if "elements" not in slide_entry:
            slide_entry["elements"] = {}
        for b_key, b_trans in bullet_dict.items():
            if b_key not in slide_entry["elements"]:
                slide_entry["elements"][b_key] = b_trans
                added_bullets += 1
            else:
                for lang in ["de", "en", "ja", "zh"]:
                    if not slide_entry["elements"][b_key].get(lang):
                        slide_entry["elements"][b_key][lang] = b_trans[lang]

    with open(TRANSLATIONS_MASTER, "w", encoding="utf-8") as f:
        json.dump(master, f, ensure_ascii=False, indent=2)
    print(f"✓ Synchronisiert: {added_badges} neue Badges & {added_bullets} neue Bullets in translations/slides_content.json.")

def upgrade_slide(snum, s_html):
    # Skip slides that already have customized Bento layouts or timelines
    if snum in (1, 2, 3, 4, 13, 22, 35, 36, 40, 41, 42, 60, 61, 68):
        return s_html

    # Extract header up to slide-body
    header_m = re.search(r'(<div class="slide-header">[\s\S]*?)(?=\s*<div class="slide-body)', s_html)
    if not header_m:
        print(f"WARNUNG: Header für Folie {snum} nicht gefunden!")
        return s_html
    header_html = header_m.group(1).rstrip()

    # --- SPECIAL SLIDE 12: Die 4 Säulen des Walkens ---
    if snum == 12:
        return f'''      <!-- SLIDE 12: Der Walkprozess (Felting) -->
      <section class="slide" data-slide="12">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s12_b1_badge">>HEISSDAMPF</span>
                </div>
                <div class="bento-card-title" data-i18n="s12_c1_title">1. Heißdampf</div>
                <div class="bento-card-desc" data-i18n="s12_c1_desc">Öffnet die mikroskopischen Schuppen der Haare und macht das Keratin geschmeidig.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s12_b2_badge">>MECHANISCHER DRUCK</span>
                </div>
                <div class="bento-card-title" data-i18n="s12_c2_title">2. Mechanischer Druck</div>
                <div class="bento-card-desc" data-i18n="s12_c2_desc">Presst die Vlieslagen kontinuierlich zusammen und leitet die Verdichtung ein.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">03</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s12_b3_badge">>OSZILLATION</span>
                </div>
                <div class="bento-card-title" data-i18n="s12_c3_title">3. Oszillierende Bewegung</div>
                <div class="bento-card-desc" data-i18n="s12_c3_desc">Reibung verschlingt die Widerhaken der Fasern unlösbar ineinander.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">04</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s12_b4_badge">>HANDWERKSKUNST</span>
                </div>
                <div class="bento-card-title" data-i18n="s12_c4_title">4. Handwerkliches Know-how</div>
                <div class="bento-card-desc" data-i18n="s12_c4_desc">Gefühl für den exakten Abbruchzeitpunkt bestimmt Elastizität und Resonanz.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_8_2_Image194.jpg" alt="Der Walkprozess">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s12_b5_badge">>HAMMERWALKE</span>
                <div class="bento-media-caption" data-i18n="s12_caption_1">Zusammenführen und Walken der Vlieslagen zur homogenen Filzplatte</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 21: Unterfilz-Farben ---
    if snum == 21:
        return f'''      <!-- SLIDE 21: Unterfilz-Farbprogramm -->
      <section class="slide" data-slide="21">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 12px;">
              <div class="bento-card" style="border-left: 4px solid #cc2222;">
                <div class="bento-card-header">
                  <span class="bento-badge red" data-i18n="s21_b1_badge">>KLASSIKER</span>
                </div>
                <div class="bento-card-title" data-i18n="s21_c1_title">Rot / Weinrot</div>
                <div class="bento-card-desc" data-i18n="s21_c1_desc">Der weltbekannte Renner-Klassiker; Standard bei vielen europäischen Spitzenmarken.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #ff9900;">
                <div class="bento-card-header">
                  <span class="bento-badge gold">>KONZERTSERIE</span>
                </div>
                <div class="bento-card-title" data-i18n="s21_c2_title">Orange</div>
                <div class="bento-card-desc" data-i18n="s21_c2_desc">Traditionelle Kennfarbe klassischer Konzertinstrumente und historischer Reparaturen.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #ddbb00;">
                <div class="bento-card-header">
                  <span class="bento-badge gold">>TRADITION</span>
                </div>
                <div class="bento-card-title" data-i18n="s21_c3_title">Gelb</div>
                <div class="bento-card-desc" data-i18n="s21_c3_desc">Charakteristischer Unterfilz für renommierte sächsische und Wiener Klaviere.</div>
              </div>
              <div class="bento-card" style="border-left: 4px solid #2255cc;">
                <div class="bento-card-header">
                  <span class="bento-badge green">>DESIGN</span>
                </div>
                <div class="bento-card-title" data-i18n="s21_c4_title">Blau / Schwarz</div>
                <div class="bento-card-desc" data-i18n="s21_c4_desc">Klassisches Blau für C. Bechstein sowie edles Schwarz für moderne Designer-Flügel.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_14_2_Image226.jpg" alt="Unterfilz Farbpalette">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s21_b2_badge">>14 FARBTÖNE</span>
                <div class="bento-media-caption" data-i18n="s21_caption_1">Renner Unterfilz-Sortiment: Rot, Weinrot, Orange, Gelb, Blau, Schwarz</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 23: Kernholz-Profilformen ---
    if snum == 23:
        return f'''      <!-- SLIDE 23: Kernholz-Profilformen -->
      <section class="slide" data-slide="23">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s23_b1_badge">>SYMMETRISCH</span>
                </div>
                <div class="bento-card-title" data-i18n="s23_c1_title">Symmetrische Standardformen</div>
                <div class="bento-card-desc" data-i18n="s23_c1_desc">Für Steinway & Sons (historisch und modern), Bösendorfer sowie die Mehrheit aller klassischen europäischen Flügelmechaniken.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s23_b2_badge">>ASYMMETRISCH</span>
                </div>
                <div class="bento-card-title" data-i18n="s23_c2_title">Asymmetrische Sonderformen</div>
                <div class="bento-card-desc" data-i18n="s23_c2_desc">Für spezifische Geometrien, z. B. historische Blüthner-Flügel oder Instrumente mit speziellem Saitenkreuzungswinkel.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_14_2_Image229.jpg" alt="Kernholz Profilformen">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green">>KERN-GEOMETRIE</span>
                <div class="bento-media-caption" data-i18n="s23_caption_1">Symmetrische und asymmetrische Kernholz-Profile im Querschnitt</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 29: Die 6 Kernvorteile ---
    if snum == 29:
        return f'''      <!-- SLIDE 29: Vorteile der neuen Renner-Hammerköpfe -->
      <section class="slide" data-slide="29">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-3">
            <div class="bento-card">
              <div class="bento-step-watermark">01</div>
              <span class="bento-badge gold" data-i18n="s29_b1_badge">>MASSGESCHNEIDERT</span>
              <div class="bento-card-title" data-i18n="s29_c1_title">1. Maßgeschneiderte Fertigung</div>
              <div class="bento-card-desc" data-i18n="s29_c1_desc">Individuelle Sonderanfertigung von Einzelstücken für historische Schätze bis hin zu großen Konzert-Serien.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">02</div>
              <span class="bento-badge green" data-i18n="s29_b2_badge">>EFFIZIENZ</span>
              <div class="bento-card-title" data-i18n="s29_c2_title">2. Direkt fertig zur Endintonation</div>
              <div class="bento-card-desc" data-i18n="s29_c2_desc">Keine zeitraubende Vorintonation am Instrument mehr nötig! Der Satz ist ab Werk klanglich vorbereitet.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">03</div>
              <span class="bento-badge gold" data-i18n="s29_b3_badge">>PRÄZISION</span>
              <div class="bento-card-title" data-i18n="s29_c3_title">3. Höchste Fertigungspräzision</div>
              <div class="bento-card-desc" data-i18n="s29_c3_desc">Kombination aus traditionellem FFW-Filzhandwerk und mikrometergenauer Roboter- und CNC-Bearbeitung.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">04</div>
              <span class="bento-badge green" data-i18n="s29_b4_badge">>STABILITÄT</span>
              <div class="bento-card-title" data-i18n="s29_c4_title">4. Überragende Klangstabilität</div>
              <div class="bento-card-desc" data-i18n="s29_c4_desc">Durch die Eigenspannung des Weickert-Special-Filzes bleibt das Klangbild über viele Jahre hinweg stabil.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">05</div>
              <span class="bento-badge gold" data-i18n="s29_b5_badge">>OBERTONREICH</span>
              <div class="bento-card-title" data-i18n="s29_c5_title">5. Reiches Obertonspektrum</div>
              <div class="bento-card-desc" data-i18n="s29_c5_desc">Breiteste Dynamikspreizung vom zartesten Pianissimo bis zum tragfähigen Fortissimo im großen Konzertsaal.</div>
            </div>
            <div class="bento-card">
              <div class="bento-step-watermark">06</div>
              <span class="bento-badge green" data-i18n="s29_b6_badge">>EINBAUFERTIG</span>
              <div class="bento-card-title" data-i18n="s29_c6_title">6. Einbaufertig veredelt</div>
              <div class="bento-card-desc" data-i18n="s29_c6_desc">Präzise gebohrt, formschlüssig vernietet, mit verrundeten Schwanzenden und veredelter Scheitelkontur.</div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 37: Baugruppen-Lagerung ---
    if snum == 37:
        return f'''      <!-- SLIDE 37: Hammerstiel-Produktion & Lagerung -->
      <section class="slide" data-slide="37">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-3" style="gap: 12px;">
              <div class="bento-card">
                <div class="bento-step-watermark">01</div>
                <span class="bento-badge gold">>AUTOMATION</span>
                <div class="bento-card-title" style="font-size: 1.05rem;" data-i18n="s37_c1_title">Automatisierte Kapselmontage</div>
                <div class="bento-card-desc" data-i18n="s37_c1_desc">Vollautomatische Montagestraße setzt Achsen, Kapseltuch und Schrauben mit digitaler Drehmomentüberwachung.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <span class="bento-badge green">>OPTIK</span>
                <div class="bento-card-title" style="font-size: 1.05rem;" data-i18n="s37_c2_title">Optisches Kamerasystem</div>
                <div class="bento-card-desc" data-i18n="s37_c2_desc">Jedes Röllchen und jede Kapselachse wird optisch vermessen. Abweichungen im Zehntelmillimeter-Bereich werden sofort ausgeschleust.</div>
              </div>
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">03</div>
                <span class="bento-badge gold" data-i18n="s37_b1_badge">>BAUGRUPPENRUHE</span>
                <div class="bento-card-title" style="font-size: 1.05rem;" data-i18n="s37_c3_title">5-tägige Ruhephase (Setzprozess)</div>
                <div class="bento-card-desc" data-i18n="s37_c3_desc">Alle montierten Hammerstiele lagern zwingend 5 Tage im klimatisierten Baugruppenlager für optimalen Spannungsabbau.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HSt/page_18_2_Image235.jpg" alt="Baugruppenlager Meuselwitz">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s37_b2_badge">>KLIMARAUM</span>
                <div class="bento-media-caption" data-i18n="s37_caption_1">5 Tage Baugruppenruhe: Spannungsabbau vor der manuellen Endkontrolle</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 39: Reparaturprogramm Weltmarken ---
    if snum == 39:
        return f'''      <!-- SLIDE 39: Das Renner Reparaturprogramm -->
      <section class="slide" data-slide="39">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 10px;">
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge gold">>STEINWAY</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c1_title">• Steinway & Sons</div>
                <div class="bento-card-desc" data-i18n="s39_c1_desc">Alle Modelle & Epochen</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge green">>BECHSTEIN</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c2_title">• C. Bechstein</div>
                <div class="bento-card-desc" data-i18n="s39_c2_desc">Historisch & modern</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge gold">>BÖSENDORFER</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c3_title">• Bösendorfer</div>
                <div class="bento-card-desc" data-i18n="s39_c3_desc">Sämtliche Längen</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge green">>BLÜTHNER</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c4_title">• Julius Blüthner</div>
                <div class="bento-card-desc" data-i18n="s39_c4_desc">Patent & Standard</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge gold">>SCHIMMEL</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c5_title">• Wilhelm Schimmel</div>
                <div class="bento-card-desc" data-i18n="s39_c5_desc">Flügel & Pianos</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge green">>STEINGRAEBER</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c6_title">• Steingraeber & Söhne</div>
                <div class="bento-card-desc" data-i18n="s39_c6_desc">Konzertspezifikation</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge gold">>FÖRSTER</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c7_title">• August Förster</div>
                <div class="bento-card-desc" data-i18n="s39_c7_desc">Traditionsmaße</div>
              </div>
              <div class="bento-card" style="padding: 14px;">
                <div class="bento-card-header" style="margin-bottom: 6px;">
                  <span class="bento-badge green">>YAMAHA & KAWAI</span>
                </div>
                <div class="bento-card-title" style="font-size: 1rem;" data-i18n="s39_c8_title">• Yamaha & Kawai</div>
                <div class="bento-card-desc" data-i18n="s39_c8_desc">C- / RX- / GX-Serie</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_24_2_Image269.png" alt="Renner Reparaturprogramm">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge gold" data-i18n="s39_b1_badge">>WERKSARCHIV</span>
                <div class="bento-media-caption" data-i18n="s39_caption_1">Archivierte Renner Standard-Datensätze für weltweite Reparaturen</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 44: GP vs UP Formulare ---
    if snum == 44:
        return f'''      <!-- SLIDE 44: Flügel- & Klavier-Maßblätter im Detail -->
      <section class="slide" data-slide="44">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">GP</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s44_b1_badge">>FLÜGEL (GP)</span>
                </div>
                <div class="bento-card-title" data-i18n="s44_c1_title">Grand Piano (GP) Formular</div>
                <div class="bento-card-desc" data-i18n="s44_c1_desc">Fokus auf Gesamtlänge, Bohrungslänge, Stieldurchmesser, Röllchenabstand (17 mm vs. 15,5 mm) und 91°-Rake-Winkel.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">UP</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s44_b2_badge">>KLAVIER (UP)</span>
                </div>
                <div class="bento-card-title" data-i18n="s44_c2_title">Upright Piano (UP) Formular</div>
                <div class="bento-card-desc" data-i18n="s44_c2_desc">Besonderheiten bei Kröpfungswinkeln der Bass- und Diskantchöre, Nussbaugruppen und Achsenpositionen.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/HK/page_31_2_Image309.jpg" alt="Maßblätter im Vergleich">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge gold">>DIAGNOSEBLATT</span>
                <div class="bento-media-caption" data-i18n="s44_caption_1">Gegenüberstellung: Renner Bestellformulare für Flügel und Klaviere</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 52: Leimauswahl ---
    if snum == 52:
        return f'''      <!-- SLIDE 52: Leimauswahl: Heiß- vs. Kaltleim -->
      <section class="slide" data-slide="52">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s52_b1_badge">>HEISSLEIM (65°C)</span>
                </div>
                <div class="bento-card-title" data-i18n="s52_c1_title">Heißleim (Traditionelle Wahl)</div>
                <div class="bento-card-desc" data-i18n="s52_c1_desc">Elektrisches Warmleimbecken 0,2 l bei 60–65°C. Glutinleim kristallisiert glashart aus und überträgt Schwingungsenergie ohne jeden Verlust direkt auf den Hammerkopf.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s52_b2_badge">>KALTLEIM (D3)</span>
                </div>
                <div class="bento-card-title" data-i18n="s52_c2_title">Hartholz-Kaltleim (D3 / Weißleim)</div>
                <div class="bento-card-desc" data-i18n="s52_c2_desc">Höhere Elastizität, längere offene Zeit für Korrekturen, aber etwas weichere Schwingungsübertragung im obersten Frequenzbereich.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/EN_GP/page_10_2_Image203.jpg" alt="Leimauswahl">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green">>KRISTALLINE BRÜCKE</span>
                <div class="bento-media-caption" data-i18n="s52_caption_1">Warmleimbecken und Leimauftrag auf den konischen Stielsitz</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 56: Schwanzformung ---
    if snum == 56:
        return f'''      <!-- SLIDE 56: Schwanzformung (Sanding & Forming) -->
      <section class="slide" data-slide="56">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s56_b1_badge">>SCHRITT 01</span>
                </div>
                <div class="bento-card-title" data-i18n="s56_c1_title">Schritt 1: Überstand beischleifen</div>
                <div class="bento-card-desc" data-i18n="s56_c1_desc">Mit Schleifklotz Körnung 40 wird der abgekappte Stielüberstand bündig zur Kernholzkontur beigeschliffen.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s56_b2_badge">>SCHRITT 02</span>
                </div>
                <div class="bento-card-title" data-i18n="s56_c2_title">Schritt 2: Fängerprofil anpassen</div>
                <div class="bento-card-desc" data-i18n="s56_c2_desc">Schwanzkrümmung so formen, dass der Fänger beim Repetieren sofort und geräuschlos greift, ohne abzurutschen.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/EN_GP/page_14_2_Image227.jpg" alt="Schwanzformung">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green">>FÄNGERGEOMETRIE</span>
                <div class="bento-media-caption" data-i18n="s56_caption_1">Prüfung des Fänger-Eingriffs nach dem Schleifen der Schwanzkrümmung</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 59: Unveränderliche vs Beeinflussbare Faktoren ---
    if snum == 59:
        return f'''      <!-- SLIDE 59: Unveränderliche vs. Beeinflussbare Faktoren -->
      <section class="slide" data-slide="59">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card">
                <div class="bento-step-watermark">01</div>
                <span class="bento-badge red" data-i18n="s59_b1_badge">>AKUSTISCHE GRENZEN</span>
                <div class="bento-card-title" style="color: var(--text-muted); font-size: 1.1rem;" data-i18n="s59_c1_title">Unveränderliche Faktoren</div>
                <div class="bento-card-list">
                  <div class="bento-card-list-item">
                    <span class="bento-dot"></span>
                    <span data-i18n="s59_bullet_1"><strong>Konstruktion:</strong> Mensur, Gussplatte, Resonanzbodenholz</span>
                  </div>
                  <div class="bento-card-list-item">
                    <span class="bento-dot"></span>
                    <span data-i18n="s59_bullet_2"><strong>Raumakustik:</strong> Großer Saal, Studio, Wohnraum, Schule</span>
                  </div>
                  <div class="bento-card-list-item">
                    <span class="bento-dot"></span>
                    <span data-i18n="s59_bullet_3"><strong>Pianist:</strong> Individueller Anschlag und Geschmack</span>
                  </div>
                </div>
              </div>
              <div class="bento-card hero-card" style="border-color: var(--border-green);">
                <div class="bento-step-watermark">02</div>
                <span class="bento-badge green">>EINFLUSSBEREICH</span>
                <div class="bento-card-title" style="color: var(--renner-green-bright); font-size: 1.1rem;" data-i18n="s59_c2_title">Was wir beeinflussen können:</div>
                <div class="bento-card-list">
                  <div class="bento-card-list-item">
                    <span class="bento-dot green"></span>
                    <span data-i18n="s59_bullet_4"><strong>Renner Hammerköpfe & Filze:</strong> Perfekte Basis</span>
                  </div>
                  <div class="bento-card-list-item">
                    <span class="bento-dot green"></span>
                    <span data-i18n="s59_bullet_5"><strong>Renner Mechanikteile:</strong> Präzise Hebelwege</span>
                  </div>
                  <div class="bento-card-list-item">
                    <span class="bento-dot green"></span>
                    <span data-i18n="s59_bullet_6"><strong>Saitenlagerung:</strong> Fester Sitz an Stegen und Stiften</span>
                  </div>
                  <div class="bento-card-list-item">
                    <span class="bento-dot green"></span>
                    <span data-i18n="s59_bullet_7"><strong>Feinregulierung & Stimmung:</strong> Perfektes Fundament</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/image8.jpeg" alt="Raum und Instrument">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green" data-i18n="s59_b2_badge">>RESONANZBODEN & SAITEN</span>
                <div class="bento-media-caption" data-i18n="s59_caption_1">Der Flügel im Konzertsaal: Raumakustik und Instrument im Einklang</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- SPECIAL SLIDE 66: Abziehen der Hammerkronen ---
    if snum == 66:
        return f'''      <!-- SLIDE 66: Abziehen der Hammerkronen (Filing) -->
      <section class="slide" data-slide="66">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-hero-left">
            <div class="bento-grid bento-grid-2" style="gap: 14px;">
              <div class="bento-card hero-card">
                <div class="bento-step-watermark">01</div>
                <div class="bento-card-header">
                  <span class="bento-badge gold" data-i18n="s66_b1_badge">>HOHL VOR RUND</span>
                </div>
                <div class="bento-card-title" data-i18n="s66_c1_title">1. Hohl vor Rund (Seitenabzug)</div>
                <div class="bento-card-desc" data-i18n="s66_c1_desc">Mit dem Schleifbrettchen von den Schultern her zur Scheitelmitte hin arbeiten, um die natürliche Keilspannung zu bewahren.</div>
              </div>
              <div class="bento-card">
                <div class="bento-step-watermark">02</div>
                <div class="bento-card-header">
                  <span class="bento-badge green" data-i18n="s66_b2_badge">>KRONENSCHEITEL</span>
                </div>
                <div class="bento-card-title" data-i18n="s66_c2_title">2. Sanfter Kronenscheitel</div>
                <div class="bento-card-desc" data-i18n="s66_c2_desc">Abschließend den Scheitel mit feinstem Schleifleinen (Körnung 320–400) vorsichtig verrunden, ohne Scheitelfilz abzutragen.</div>
              </div>
            </div>
            <div class="bento-card media-framed">
              <img src="Visuell/basis_media/Intonation/page_11_2_Image209.jpg" alt="Kronenabzug">
              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>
              <div class="bento-media-overlay">
                <span class="bento-badge green">>SCHLEIFFEILE</span>
                <div class="bento-media-caption" data-i18n="s66_caption_1">Kronenabzug: Schleifbrettführung für gleichmäßigen Scheitelradius</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

    # --- GENERAL SPLIT LAYOUT TO BENTO MOSAIC UPGRADE ---
    intro_m = re.search(r'<p class="slide-intro-p">([\s\S]*?)</p>', s_html)
    intro_text = intro_m.group(1).strip() if intro_m else ""

    # Bullets extraction
    bullets = re.findall(r'<li class="bullet-item"[^>]*>[\s\S]*?<span(?:\s+data-i18n="([^"]*)")?>([\s\S]*?)</span>\s*</li>', s_html)
    
    # If no standard bullet items found, check if it's Slide 43 or Slide 64
    if not bullets and snum == 43:
        bullets = [
            ("s43_bullet_1", NEW_BULLETS[43]["s43_bullet_1"]["de"]),
            ("s43_bullet_2", NEW_BULLETS[43]["s43_bullet_2"]["de"]),
            ("s43_bullet_3", NEW_BULLETS[43]["s43_bullet_3"]["de"]),
            ("s43_bullet_4", NEW_BULLETS[43]["s43_bullet_4"]["de"]),
        ]
    elif not bullets and snum == 64:
        bullets = [
            ("s64_bullet_1", NEW_BULLETS[64]["s64_bullet_1"]["de"]),
            ("s64_bullet_2", NEW_BULLETS[64]["s64_bullet_2"]["de"]),
            ("s64_bullet_3", NEW_BULLETS[64]["s64_bullet_3"]["de"]),
        ]

    # Media element extraction
    is_video = "<video" in s_html
    if is_video:
        vid_m = re.search(r'(<video[\s\S]*?</video>)', s_html)
        media_tag = vid_m.group(1) if vid_m else ""
        media_tag = re.sub(r'style="[^"]*"', 'style="width: 100%; height: 100%; object-fit: cover;"', media_tag)
    else:
        img_m = re.search(r'(<img[^>]*>)', s_html)
        media_tag = img_m.group(1) if img_m else ""

    # Caption extraction
    cap_m = re.search(r'<div class="media-caption"(?:\s+data-i18n="([^"]*)")?>([\s\S]*?)</div>', s_html)
    caption_i18n = cap_m.group(1) if (cap_m and cap_m.group(1)) else f"s{snum}_caption_1"
    caption_text = cap_m.group(2).strip() if cap_m else ""

    # Badges
    badge_b1 = BADGES.get(snum, {}).get("b1", {}).get("de", "PRÄZISIONSTECHNIK")
    badge_b2 = BADGES.get(snum, {}).get("b2", {}).get("de", "WERKSTÄTTE")

    # Watermark
    watermark_num = get_chapter_watermark(snum)

    # Metric HTML
    metric_html = ""
    if snum in METRICS:
        num_val, unit_val = METRICS[snum]
        metric_html = f'''              <div class="bento-metric-top">
                <span class="bento-metric-num">{num_val}</span>
                <span class="bento-metric-unit">{unit_val}</span>
              </div>\n'''

    # Intro HTML
    intro_html = ""
    if intro_text:
        intro_html = f'''              <div class="bento-card-desc" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 14px;">
                {intro_text}
              </div>\n'''

    # List items
    bento_items = []
    for idx, (b_i18n, b_text) in enumerate(bullets):
        i18n_attr = f' data-i18n="{b_i18n}"' if b_i18n else f' data-i18n="s{snum}_bullet_{idx+1}"'
        bento_items.append(f'''                <div class="bento-card-list-item">
                  <span class="bento-dot gold"></span>
                  <span{i18n_attr}>{b_text}</span>
                </div>''')
    list_html = "\n".join(bento_items)

    # Overlay extra for videos (pointer events none so controls can be clicked)
    overlay_extra = ' style="pointer-events: none;"' if is_video else ""

    # Corner brackets (images only)
    brackets_html = """              <div class="hero-corner-bracket top-left"></div>
              <div class="hero-corner-bracket top-right"></div>
              <div class="hero-corner-bracket bottom-left"></div>
              <div class="hero-corner-bracket bottom-right"></div>\n""" if not is_video else ""

    return f'''      <!-- SLIDE {snum} (Sander Bento Mosaic) -->
      <section class="slide" data-slide="{snum}">
{header_html}
        <div class="slide-body">
          <div class="bento-grid bento-grid-mosaic">
            <div class="bento-card hero-card">
              <div class="bento-step-watermark">{watermark_num}</div>
              <span class="bento-badge gold" data-i18n="s{snum}_b1_badge">>{badge_b1}</span>
{metric_html}{intro_html}              <div class="bento-card-list">
{list_html}
              </div>
            </div>
            <div class="bento-card media-framed">
              {media_tag}
{brackets_html}              <div class="bento-media-overlay"{overlay_extra}>
                <span class="bento-badge green" data-i18n="s{snum}_b2_badge">>{badge_b2}</span>
                <div class="bento-media-caption" data-i18n="{caption_i18n}">{caption_text}</div>
              </div>
            </div>
          </div>
        </div>
{{get_watermark()}}
      </section>'''

def main():
    print("Starte Upgrade der Folien-Layouts auf Bento Grid...")
    
    # 1. Sync badges and new bullets into translations master JSON
    sync_translations_to_master()

    # 2. Read slide_definitions.py
    with open(SLIDE_DEFS_FILE, "r", encoding="utf-8") as f:
        defs_text = f.read()

    section_pattern = r'(# SLIDE (\d+):[^\n]*\n\s*slides\.append\(f\'\'\'\s*<!-- SLIDE \2:[^\n]*-->\s*<section class="slide[^\"]*" data-slide="\2">[\s\S]*?</section>\'\'\'\))'

    upgraded_count = 0

    def replacer(m):
        nonlocal upgraded_count
        snum = int(m.group(2))
        full_slide = m.group(0)
        
        # Check if already upgraded
        if snum in (1, 2, 3, 4, 13, 22, 35, 36, 40, 41, 42, 60, 61, 68):
            return full_slide

        # Upgrade
        upgraded = upgrade_slide(snum, full_slide)
        if upgraded != full_slide:
            upgraded_count += 1
            # Extract comment title
            comment_line = full_slide.splitlines()[0]
            # Replace comment with Bento note
            new_comment = f"# SLIDE {snum}: {comment_line.split(':', 1)[1].strip()} (Sander Bento)" if ":" in comment_line else f"# SLIDE {snum}: (Sander Bento)"
            return f"{new_comment}\n    slides.append(f'''" + upgraded.strip() + "''')"
        return full_slide

    new_defs = re.sub(section_pattern, replacer, defs_text)

    with open(SLIDE_DEFS_FILE, "w", encoding="utf-8") as f:
        f.write(new_defs)

    print(f"✓ slide_definitions.py: {upgraded_count} Folien erfolgreich auf Bento Grid aktualisiert!")

if __name__ == "__main__":
    main()
