/**
 * Louis Renner Presentation Multi-Language Translations (DE, EN, JA, ZH)
 * Professional Piano Technology & Engineering Terminology
 * Based on Renner Academy 2025 Masterclass Documentations
 */

const translations = {
  de: {
    brand_sub: "Mechaniken & Hammerköpfe seit 1882",
    conf_badge: "Konferenz 2025 • Tokio & Shanghai",
    speaker_notes_title: "Referenten-Notizen",
    slides_overview: "Folien-Übersicht",
    keyboard_shortcuts: "Tastaturkürzel",
    laser_mode: "Laserpointer (L)",
    notes_mode: "Notizen (N)",
    grid_mode: "Übersicht (G)",
    sound_demo: "Klang-Simulator (S)",
    fullscreen_mode: "Vollbild (F)",
    prev_slide: "Zurück (←)",
    next_slide: "Weiter (→ / Leertaste)",
    
    // Slide categories
    cat_intro: "Teil 1: Einführung & Historie",
    cat_meuselwitz: "Teil 1: Der Neue Hauptsitz Meuselwitz",
    cat_felt: "Teil 2: Die Kunst der Filzfertigung",
    cat_production: "Teil 2: Hochpräzise Hammerkopffertigung",
    cat_sound: "Teil 2: Klangspektrum nach Maß",
    cat_specs: "Teil 3: Spezifikation von Hammerköpfen",
    cat_yamaha: "Teil 3: Das Renner Yamaha-Kit",
    cat_voicing: "Teil 4: Die Hohe Kunst des Intonierens",
    cat_conclusion: "Abschluss & Kontakt",
    
    // Interactive tools & Terminology
    strike_point: "Scheitel / Anschlagspunkt (12:00)",
    shoulder: "Schulterzone / Obertöne",
    cushion: "Flanke / Bassfundament & Dynamik",
    traditional_approach: "Traditionelle 20-Schritte Montage",
    yamaha_kit_approach: "Renner Yamaha-Kit (Plug & Play)",
    time_spent: "Zeitaufwand",
    prevoicing_needed: "Vorintonation",
    accuracy: "Präzision",
    play_animation: "Animation starten (09.2025 → Heute)",
    pause_animation: "Animation anhalten",
    cinematic_zoom: "Kino-Zoom",
    construction_start: "Start 09.2025",

    // Dynamic Wedges (Intonation_10_25)
    wedge_red_title: "Rote Zone (12:00 Uhr Scheitel / Anschlagspunkt)",
    wedge_red_sub: "Nicht tief stechen! Nur oberflächlich (1 mm) bei Glas-Attacke.",
    wedge_purple_title: "Violetter Keil (11:30–12:30 Uhr Pianissimo-Keil)",
    wedge_purple_sub: "Feinste Nadelung für flüsterleises pp und sensible Ansprache.",
    wedge_orange_title: "Orangener Keil (10:30–11:30 & 12:30–1:30 Piano-Keil)",
    wedge_orange_sub: "Warmer, lyrischer Gesangston im Mezzopiano.",
    wedge_green_title: "Grüner Keil (9:30–10:30 & 1:30–2:30 Forte-Keil)",
    wedge_green_sub: "Tragende Klangfülle, Obertonglanz und Saalfüllung.",
    wedge_blue_title: "Blauer Keil (9:00–9:30 & 2:30–3:00 Fortissimo-Keil)",
    wedge_blue_sub: "Erster Vorintonationsschritt: Tiefe 90°-Stiche bauen Werksspannung ab.",

    // Technical Formulas & Tools
    boring_formula_title: "Berechnung der Bohrungslänge",
    overhang_title: "90°-Anschlag & 3 mm Stielüberstand",
    kruse_axiom_title: "Das Goldene Regulierungs-Axiom (Jens-Sören Kruse)",
    kruse_axiom_text: "»Ohne gute Regulierung keine saubere Stimmung, und ohne saubere Stimmung keine saubere Intonation. Eines führt zum anderen, und alles hängt mit allem zusammen.«",
    sample_case_title: "RENNER Musterteilekoffer (MTK)",
    setting_storage_title: "5 Tage Reifelagerung im Klimaraum",
    conical_reaming_title: "Konisches Aufreiben (1:50 Kegelmaß)",
    gauge_91_title: "91° Flügel-Hammerkopf-Winkellehre",
    japanese_saw_title: "Japanische Zugsäge & Ausstiel-Klemmvorrichtung"
  },

  en: {
    brand_sub: "Actions & Hammerheads since 1882",
    conf_badge: "Conference 2025 • Tokyo & Shanghai",
    speaker_notes_title: "Speaker Notes",
    slides_overview: "Slides Overview",
    keyboard_shortcuts: "Keyboard Shortcuts",
    laser_mode: "Laser Pointer (L)",
    notes_mode: "Notes (N)",
    grid_mode: "Overview (G)",
    sound_demo: "Sound Simulator (S)",
    fullscreen_mode: "Fullscreen (F)",
    prev_slide: "Previous (←)",
    next_slide: "Next (→ / Space)",
    
    // Slide categories
    cat_intro: "Part 1: Introduction & Heritage",
    cat_meuselwitz: "Part 1: The New Meuselwitz Headquarters",
    cat_felt: "Part 2: The Art of Felt Processing",
    cat_production: "Part 2: Precision Hammerhead Manufacturing",
    cat_sound: "Part 2: Tailored Sound Spectrum",
    cat_specs: "Part 3: Hammerhead Specification",
    cat_yamaha: "Part 3: The Renner Yamaha Kit",
    cat_voicing: "Part 4: The Master Art of Voicing",
    cat_conclusion: "Conclusion & Contact",
    
    // Interactive tools & Terminology
    strike_point: "Strike Point / Crown (12:00)",
    shoulder: "Shoulder / Overtone Zone",
    cushion: "Flank & Base / Fundamental & Power",
    traditional_approach: "Traditional 20-Step Benchwork",
    yamaha_kit_approach: "Renner Yamaha Kit (Plug & Play)",
    time_spent: "Time Required",
    prevoicing_needed: "Pre-voicing",
    accuracy: "Precision",
    play_animation: "Start Animation (09.2025 → Today)",
    pause_animation: "Pause Animation",
    cinematic_zoom: "Cinema Zoom",
    construction_start: "Start 09.2025",

    // Dynamic Wedges (Intonation_10_25)
    wedge_red_title: "Red Zone (12:00 Strike Point / Crown)",
    wedge_red_sub: "Do not touch deeply! Only superficial micro-touch (1 mm) if glassy.",
    wedge_purple_title: "Purple Wedge (11:30–12:30 Pianissimo Wedge)",
    wedge_purple_sub: "Delicate micro-needling for whisper-soft pp response.",
    wedge_orange_title: "Orange Wedge (10:30–11:30 & 12:30–1:30 Piano Wedge)",
    wedge_orange_sub: "Warm singing tone and lyrical character at moderate touch.",
    wedge_green_title: "Green Wedge (9:30–10:30 & 1:30–2:30 Forte Wedge)",
    wedge_green_sub: "Dynamic power, harmonic bloom and concert projection.",
    wedge_blue_title: "Blue Wedge (9:00–9:30 & 2:30–3:00 Fortissimo Wedge)",
    wedge_blue_sub: "First step of pre-voicing: Deep 90° stitches release rigid tension into forte wedge.",

    // Technical Formulas & Tools
    boring_formula_title: "Calculation of Boring Length",
    overhang_title: "90° Strike Angle & 3 mm Shank Overhang",
    kruse_axiom_title: "The Golden Regulation Axiom (Jens-Sören Kruse)",
    kruse_axiom_text: "»No clean voicing without good regulation, and without good regulation, no clean tuning, and without clean tuning, no clean voicing. One leads to the other, and everything is connected with everything.«",
    sample_case_title: "RENNER Sample Part Case (MTK)",
    setting_storage_title: "5-Day Climate Setting Storage",
    conical_reaming_title: "Conical Reaming (1:50 Taper)",
    gauge_91_title: "91° Grand Hammerhead Rake Gauge",
    japanese_saw_title: "Japanese Flush Saw & Tail Clamping Device"
  },
  
  ja: {
    brand_sub: "1882年創業 • アクション＆ハンマーヘッド",
    conf_badge: "2025年 カンファレンス • 東京＆上海",
    speaker_notes_title: "講演者メモ",
    slides_overview: "スライド一覧",
    keyboard_shortcuts: "キーボードショートカット",
    laser_mode: "レーザーポインター (L)",
    notes_mode: "ノート表示 (N)",
    grid_mode: "グリッド一覧 (G)",
    sound_demo: "サウンドシミュレーター (S)",
    fullscreen_mode: "全画面表示 (F)",
    prev_slide: "前へ (←)",
    next_slide: "次へ (→ / スペース)",
    
    // Slide categories
    cat_intro: "第1部: レンナーの歴史と伝統",
    cat_meuselwitz: "第1部: モイゼルヴィッツ新本社拠点",
    cat_felt: "第2部: 極上フェルト製造の秘密",
    cat_production: "第2部: 精密ハンマーヘッド製造工程",
    cat_sound: "第2部: 理想の音響スペクトラム設計",
    cat_specs: "第3部: ハンマーヘッドの最適仕様設計",
    cat_yamaha: "第3部: 革新のレンナー・ヤマハキット",
    cat_voicing: "第4部: ヴォイシング（整音）の極意",
    cat_conclusion: "総括＆お問い合わせ",
    
    // Interactive tools & Terminology
    strike_point: "打弦点（クラウン 12:00）",
    shoulder: "ショルダー部（倍音領域）",
    cushion: "側面・クッション部（低音・ダイナミクス）",
    traditional_approach: "従来の20工程手動取付作業",
    yamaha_kit_approach: "レンナー・ヤマハキット（プラグ＆プレイ）",
    time_spent: "所要時間",
    prevoicing_needed: "事前整音（予備整音）",
    accuracy: "取付精度",
    play_animation: "建設タイムラプス再生（2025.09 → 現在）",
    pause_animation: "アニメーション停止",
    cinematic_zoom: "シネマズーム",
    construction_start: "2025.09着工",

    // Dynamic Wedges (Intonation_10_25)
    wedge_red_title: "レッドゾーン（12:00 打弦点・クラウン）",
    wedge_red_sub: "深く刺してはならない！金属音がある場合のみ極浅く（1mm）微調整。",
    wedge_purple_title: "パープルウェッジ（11:30–12:30 ピアニッシモ楔）",
    wedge_purple_sub: "繊細な微細針入れで囁くようなppレスポンスを実現。",
    wedge_orange_title: "オレンジウェッジ（10:30–11:30 & 12:30–1:30 ピアノ楔）",
    wedge_orange_sub: "中弱音での温かく歌うようなリリカルな音色を形成。",
    wedge_green_title: "グリーンウェッジ（9:30–10:30 & 1:30–2:30 フォルテ楔）",
    wedge_green_sub: "豊かな音量、倍音の広がり、ホールに響き渡るプロジェクション。",
    wedge_blue_title: "ブルーウェッジ（9:00–9:30 & 2:30–3:00 フォルティッシモ楔）",
    wedge_blue_sub: "予備整音の第一歩：90度方向の深針で製造時過剰張力を緩和。",

    // Technical Formulas & Tools
    boring_formula_title: "ボウリング長（穴あけ長）の計算式",
    overhang_title: "90°打弦角度と3mmシャンクオーバーハングの法則",
    kruse_axiom_title: "整調の黄金律（イエンス＝ソーレン・クルーゼ）",
    kruse_axiom_text: "「精密な整調なくして真の調律なし、真の調律なくして完璧な整音はあり得ない。すべては一つに繋がり合っている。」",
    sample_case_title: "RENNER アクション・サンプルケース（MTK）",
    setting_storage_title: "5日間の調湿セッティング保管工程",
    conical_reaming_title: "テーパーリーマーによる1:50円錐拡張（接着剤はみ出し防止）",
    gauge_91_title: "91° グランドハンマー用レイクゲージ",
    japanese_saw_title: "日本製胴付鋸＆テール加工専用保護治具"
  },
  
  zh: {
    brand_sub: "始于1882年的顶级击弦机与弦槌",
    conf_badge: "2025年研讨峰会 • 东京与上海",
    speaker_notes_title: "讲演者备忘录",
    slides_overview: "幻灯片总览",
    keyboard_shortcuts: "快捷键指南",
    laser_mode: "激光笔模式 (L)",
    notes_mode: "演讲笔记 (N)",
    grid_mode: "缩略总览 (G)",
    sound_demo: "声音频谱模拟器 (S)",
    fullscreen_mode: "全屏模式 (F)",
    prev_slide: "上一页 (←)",
    next_slide: "下一页 (→ / 空格)",
    
    // Slide categories
    cat_intro: "第一部分: 德国雷诺历史与品牌荣耀",
    cat_meuselwitz: "第一部分: 莫伊瑟尔维茨新总部与工厂合并",
    cat_felt: "第二部分: 顶级纯羊毛毡制造工艺",
    cat_production: "第二部分: 现代高精度弦槌制造工艺",
    cat_sound: "第二部分: 定制音色频谱架构",
    cat_specs: "第三部分: 弦槌核心参数规格评定",
    cat_yamaha: "第三部分: 全新雷诺雅马哈套件（即装即用）",
    cat_voicing: "第四部分: 钢琴整音（整调）大师秘籍",
    cat_conclusion: "总结与全球技术联络",
    
    // Interactive tools & Terminology
    strike_point: "击弦点（槌顶 12:00）",
    shoulder: "槌肩区域（泛音与明亮感）",
    cushion: "槌腰与侧翼（基音饱满度与强奏爆发力）",
    traditional_approach: "传统20步繁复手工工序",
    yamaha_kit_approach: "雷诺雅马哈专用套件（免预整音）",
    time_spent: "耗费工时",
    prevoicing_needed: "预先整音需求",
    accuracy: "装配几何精度",
    play_animation: "播放建设演变全景（2025.09 → 至今）",
    pause_animation: "暂停演播",
    cinematic_zoom: "电影级运镜",
    construction_start: "2025.09启航",

    // Dynamic Wedges (Intonation_10_25)
    wedge_red_title: "红色禁区（12:00 击弦点/槌顶）",
    wedge_red_sub: "严禁深扎！仅在出现刺耳玻璃敲击声时极其轻微浅挑（1mm）。",
    wedge_purple_title: "紫色楔区（11:30–12:30 极弱音pp楔区）",
    wedge_purple_sub: "极其细腻的微针处理，赋予如耳语般清晰柔和的极弱音响应。",
    wedge_orange_title: "橙色楔区（10:30–11:30 & 12:30–1:30 弱音p楔区）",
    wedge_orange_sub: "掌控中等力度下歌唱般的温暖抒情音质。",
    wedge_green_title: "绿色楔区（9:30–10:30 & 1:30–2:30 强音f楔区）",
    wedge_green_sub: "释放澎湃动态、泛音光彩与音乐厅空间穿透力。",
    wedge_blue_title: "蓝色楔区（9:00–9:30 & 2:30–3:00 极强音ff楔区）",
    wedge_blue_sub: "预整音第一步：垂直90度深针泄除出厂死硬张力，将弹性转移至强音区。",

    // Technical Formulas & Tools
    boring_formula_title: "弦槌钻孔长度精准计算公式",
    overhang_title: "90°击弦直角与3mm槌柄外伸惯性定律",
    kruse_axiom_title: "整音整调黄金法则（延斯-索伦·克鲁泽）",
    kruse_axiom_text: "“没有精密的整调，就没有纯正的调律；没有纯正的调律，就没有完美的整音。环环相扣，万物皆有回响。”",
    sample_case_title: "RENNER 击弦机原厂样本箱（MTK）",
    setting_storage_title: "恒温恒湿房5天内应力释放期",
    conical_reaming_title: "1:50锥度铰刀扩孔（彻底防止胶水溢出）",
    gauge_91_title: "91° 三角琴弦槌倾角规",
    japanese_saw_title: "日本细齿手锯与弦槌尾部修整保护夹具"
  }
};
