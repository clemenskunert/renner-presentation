/**
 * Louis Renner Presentation - Slide 4: Chronological Diorama / Daumenkino (Flipbook)
 * & Automatic Transition to Interior Drone Flight (Visuell/Video/DRONE_MSWInnen.mp4)
 *
 * Features:
 * - All 47 chronological construction photos (03.11.2025 – 09.10.2026) from Visuell/Bilder/02_Umbau_und_Umzug/
 * - 3D Diorama side-wings + depth-stacked Daumenkino (flipbook) with rapid 3D page-flip animation
 * - Automatic seamless transition into the full-stage interior drone flight video:
 *   Visuell/Video/DRONE_MSWInnen.mp4
 * - Interactive timeline scrubber (47 frames + Drone Finale), Play/Pause, Step Back/Forward, and 4-language i18n
 */

class RennerTransformationJourney {
  constructor() {
    this.currentLang = 'de';
    this.currentFrame = 0;
    this.isStarted = false;
    this.isPlayingFlipbook = false;
    this.inDroneMode = false;
    this.flipTimer = null;

    // 14 construction phases (DE, EN, JA, ZH) mapped across the 47 chronological photos
    this.phases = [
      {
        phase: { de: 'Phase 1: Hallenvorbereitung & Entkernung', en: 'Phase 1: Hall Preparation & Gutting', ja: '第1フェーズ：工場棟整備と解体', zh: '第一阶段：车间整备与结构拆除' },
        title: { de: 'Start Bauvorhaben: Entkernung', en: 'Project Kickoff: Site Gutting', ja: '建設開始：内部解体工事', zh: '工程启动：内部腾退拆除' },
        caption: { de: 'Freilegung der tragenden Hallenstrukturen im Bereich des künftigen Verwaltungs- und Empfangstrakts.', en: 'Gutting and structural preparation of core hall lines for the future administration and reception wing.', ja: '新管理棟・レセプションエリアの将来レイアウトに合わせた工場躯体構造の露出と解体工事。', zh: '拆除腾退未来行政与接待大厅区域，清理裸露厂房核心承重承力结构。' }
      },
      {
        phase: { de: 'Phase 2: Entkernung Foyer & Baufeld', en: 'Phase 2: Foyer Demolition & Clearing', ja: '第2フェーズ：エントランス解体と整地', zh: '第二阶段：门厅拆除与施工面腾退' },
        title: { de: 'Entkernung des Foyers & Eingangsbereichs', en: 'Foyer & Entrance Area Demolition', ja: 'エントランスロビーと玄関エリアの解体', zh: '主门厅与迎宾大堂空间拆除' },
        caption: { de: 'Blick vom Foyer in Richtung Filzproduktion: Freigeräumte Großflächen für die neue Manufaktur-Infrastruktur.', en: 'View from the foyer toward felt production: cleared large-scale areas for the new manufacturing infrastructure.', ja: 'ロビーからフェルト製造エリアを望む：新製造インフラを迎えるために完全にクリアされた広大なフロア。', zh: '由前厅眺望羊毛毡生产区：为全新精密工坊基础设施彻底腾退开阔作业空间。' }
      },
      {
        phase: { de: 'Phase 3: Tiefbau & Medienversorgung', en: 'Phase 3: Utilities & Groundwork', ja: '第3フェーズ：配管・インフラ土木工事', zh: '第三阶段：深基管网与公用工程' },
        title: { de: 'Medien- & Trinkwasserversorgung', en: 'Utilities & Fresh Water Supply', ja: '給排水・ユーティリティ配管網', zh: '给排水与综合管网系统施工' },
        caption: { de: 'Präzise Schachtarbeiten für Frisch- und Brauchwasserleitungen – unterbrechungsfrei bei laufender Produktion.', en: 'Precision trenching for fresh and industrial water lines – conducted seamlessly without disrupting ongoing production.', ja: '稼働中ラインを一切停止することなく実施された、給排水・産業用水配管の高精度掘削工事。', zh: '给水与工业用水管路高精度开槽施工——在原有正常生产不停歇前提下无缝实施。' }
      },
      {
        phase: { de: 'Phase 4: Klaviermechanik-Aufbau', en: 'Phase 4: Action Assembly Line Setup', ja: '第4フェーズ：ピアノアクション製造ライン構築', zh: '第四阶段：立式击弦机总装线搭建' },
        title: { de: 'Aufbau der Klaviermechanik-Fertigung', en: 'Upright Action Assembly Installation', ja: 'アップライトアクション製造ラインの設置', zh: '立式钢琴击弦机制造产线组装' },
        caption: { de: 'Frühere Lagerflächen werden zur hochmodernen Fertigungsstraße für Klavier-Hebeglieder umgebaut.', en: 'Former warehouse areas are transformed into a state-of-the-art production line for upright piano wippens.', ja: '旧倉庫エリアを高精度なピアノアクション・ヒッカケ専用の最新製造ラインへ全面転換。', zh: '原仓储空间全面重塑，打造为高精立式钢琴联动杆自动化组装产线。' }
      },
      {
        phase: { de: 'Phase 5: Moderne Lagerlogistik', en: 'Phase 5: Modern Warehouse Logistics', ja: '第5フェーズ：先進スマート倉庫物流', zh: '第五阶段：现代智能立体仓储' },
        title: { de: 'Intelligente Lagerlogistik & Lagerlifte', en: 'Smart Storage Logistics & Vertical Lifts', ja: 'インテリジェント自動倉庫タワー導入', zh: '智能物流与垂直升降立体仓储塔' },
        caption: { de: 'Maximale Flächeneffizienz: Installation moderner vertikaler Shuttle-Lagerlifte für zehntausende Bauteile.', en: 'Maximum space efficiency: installation of automated vertical shuttle towers storing tens of thousands of precision components.', ja: '最大のフロア効率：数万点に及ぶ精密部品を立体保管する最新型垂直自動シャトルタワーの導入。', zh: '极大化坪效利用：部署多座现代化垂直升降式穿梭料仓，高密度存取数万种精密部件。' }
      },
      {
        phase: { de: 'Phase 6: Fundamente Absauganlage', en: 'Phase 6: Filtration System Foundation', ja: '第6フェーズ：大型集塵設備専用基礎工事', zh: '第六阶段：除尘过滤机组基坑工程' },
        title: { de: 'Spezialfundament für die Filteranlage', en: 'Reinforced Foundation for Filter System', ja: '大型集塵プラント専用の高強度耐荷重基礎', zh: '超大型除尘净化机组专属承重基础' },
        caption: { de: 'Bewehrung und Betonguss des Schwerlastfundaments für die 40 Tonnen schwere, 12 Meter hohe zentrale Absauganlage.', en: 'Reinforcement and concrete pour for the heavy-duty foundation of the 40-ton, 12-meter-tall central filtration plant.', ja: '総重量40トン・高さ12メートルの中央集塵プラントを支える重荷重基礎の配筋およびコンクリート打設。', zh: '为重达40吨、高12米的中央除尘过滤系统实施重型基础钢筋绑扎与混凝土浇筑。' }
      },
      {
        phase: { de: 'Phase 7: Kranhub der Filtermodule', en: 'Phase 7: Crane Lift of Filter Modules', ja: '第7フェーズ：集塵モジュールのクレーン吊り上げ', zh: '第七阶段：除尘过滤模块起重机精准吊装' },
        title: { de: 'Anlieferung & Kranhub der Filtermodule', en: 'Delivery & Crane Lift of Filter Modules', ja: '大型集塵モジュールの搬入とクレーン吊り上げ', zh: '除尘模块重载运输与特种起重机吊装' },
        caption: { de: 'Schwerlast-Logistik per 70-Tonnen-Autokran: Millimetergenaue Positionierung der tonnenschweren Filterkomponenten.', en: 'Heavy-duty logistics with a 70-ton mobile crane: millimeter-accurate positioning of multi-ton filtration components.', ja: '70トン大型クレーンによる重量物物流：数トンの大型フィルターコンポーネントをミリ単位で位置合わせ。', zh: '70吨全地面起重机特种重载作业：将重达数吨的除尘过滤核心组件进行毫米级高精定位。' }
      },
      {
        phase: { de: 'Phase 8: Kranmontage des Filterturms', en: 'Phase 8: Crane Assembly of Filter Tower', ja: '第8フェーズ：集塵タワーのクレーン据付組立', zh: '第八阶段：除尘塔上部箱体高空精准拼装' },
        title: { de: 'Kranmontage des 12 m Filterturms', en: 'Crane Assembly of 12 m Filter Tower', ja: '集塵タワー上部ユニットのクレーン組立て', zh: '除尘过滤塔箱体结构高空合拢' },
        caption: { de: 'Montage des 12 Meter hohen Filterturm-Oberteils auf dem schwingungsentkoppelten Stahlrahmen.', en: 'Assembly of the 12-meter-tall upper filter tower section onto the vibration-isolated steel frame.', ja: '防振鋼構造フレーム上に高さ12メートルの集塵タワー上部ユニットを据付。', zh: '将12米高室外除尘塔上部箱体精准吊装至减振钢结构底座。' }
      },
      {
        phase: { de: 'Phase 9: Umzug Hammerkopffertigung', en: 'Phase 9: Hammerhead Relocation', ja: '第9フェーズ：ハンマーヘッド製造部門の移転', zh: '第九阶段：弦槌制造核心工序搬迁' },
        title: { de: 'Einzug der Hammerkopffertigung', en: 'Relocation of Hammerhead Production', ja: 'ハンマーヘッド製造ラインの移設', zh: '弦槌制造产线迁入新厂区' },
        caption: { de: 'Einzug der Hammerkopffertigung in den neu ausgebauten, klimatisierten Hallenbereich in Meuselwitz.', en: 'Relocation of hammerhead production into the newly built, climate-controlled hall section in Meuselwitz.', ja: 'モイゼルヴィッツの空調完備の新フロアへハンマーヘッド製造ラインを移設。', zh: '雷诺弦槌制造产线正式迁入莫伊塞尔维茨全新恒温恒湿生产区。' }
      },
      {
        phase: { de: 'Phase 10: Montage der Großfilteranlage', en: 'Phase 10: Industrial Filter Assembly', ja: '第10フェーズ：大型集塵設備の据付組立', zh: '第十阶段：大型集尘过滤总成安装' },
        title: { de: 'Montage der Großfilter- & Absauganlage', en: 'Assembly of 120,000 m³/h Filter Plant', ja: '120,000 m³/h 大型集塵プラントの組み立て', zh: '每小时12万立方米大型集尘净化塔吊装' },
        caption: { de: 'Mit 120.000 m³/h Luftleistung sichert die neue Filteranlage staubfreie, maßhaltige Fertigungsprozesse.', en: 'With a 120,000 m³/h airflow capacity, the new filter plant ensures dust-free, dimensionally stable production.', ja: '毎時12万m³の給排気循環能力を誇る新設大型フィルタープラントがクリーンな製造環境を実現。', zh: '高达120,000 m³/h换气集尘能力，全天候保障洁净稳定的精密加工环境。' }
      },
      {
        phase: { de: 'Phase 11: Hallenverrohrung & Trassenbau', en: 'Phase 11: Ductwork & Overhead Trusses', ja: '第11フェーズ：大口径配管ダクトと天井トラス', zh: '第十一阶段：车间集尘管道与管廊架设' },
        title: { de: 'Absaugtrassen & Hallenverrohrung', en: 'Extraction Trusses & Hall Ductwork', ja: '天井集塵ダクト配管網とパイプライン敷設', zh: '负压集尘管网全线贯通与管桥布设' },
        caption: { de: 'Installation der großdimensionierten Rohrtrassen zur lückenlosen Absaugung aller Holzbearbeitungsmaschinen.', en: 'Installation of large-diameter overhead ductwork for continuous dust extraction across all woodworking machines.', ja: 'すべての木工加工機に直結する大口径スチールパイプラインの天井敷設により確実な集塵経路を確立。', zh: '安装全厂大口径集尘镀锌管道与高空管廊，实现全系列木材加工机床的闭环负压吸尘。' }
      },
      {
        phase: { de: 'Phase 12: Dachzentrale & Klimatechnik', en: 'Phase 12: Rooftop HVAC & Climate Plant', ja: '第12フェーズ：屋上空調プラント完成', zh: '第十二阶段：屋顶大型工艺气调机房' },
        title: { de: 'Dachzentrale: Prozessluft & Klimatechnik', en: 'Rooftop Plant: Process Air & HVAC', ja: '屋上プロセス空調・温湿度管理センター', zh: '屋顶中央工艺送风与恒温恒湿机房' },
        caption: { de: 'Ganzjährig konstante Temperatur und 45–50 % relative Luftfeuchte für maßhaltige Holz- und Filzverarbeitung.', en: 'Year-round constant temperature and 45–50% relative humidity for dimensionally stable wood and felt processing.', ja: '年間を通じて湿度45〜50%・一定温度を維持し、木材とフェルトの寸法安定性を確保。', zh: '全年恒定保持温度与 45–50% 相对湿度，确保实木与毛毡加工尺寸稳定。' }
      },
      {
        phase: { de: 'Phase 13: Luftbefeuchtung & Konditionierung', en: 'Phase 13: Humidity Control & Conditioning', ja: '第13フェーズ：精密加湿・空調制御', zh: '第十三阶段：精准加湿与气调控制' },
        title: { de: 'Präzise Luftbefeuchtung für Holz & Filz', en: 'Precision Humidity Control for Wood & Felt', ja: '木材とフェルトを守る精密加湿システム', zh: '面向实木与毛毡的精准加湿系统' },
        caption: { de: 'Kontrollierte Luftbefeuchtung verhindert Spannungsrisse im Tonholz und Maßänderungen im Hammerfilz.', en: 'Controlled humidification prevents checking in tonewoods and dimensional drift in hammer felt.', ja: '精密加湿により音響木材の割れやハンマーフェルトの寸法変化を防止。', zh: '受控加湿有效防止实木开裂与弦槌毛毡尺寸漂移。' }
      },
      {
        phase: { de: 'Phase 14: Kehlerei & Vollbetrieb Meuselwitz', en: 'Phase 14: Molding Shop & Full Operation', ja: '第14フェーズ：木型成形部門の統合と全面稼働', zh: '第十四阶段：开槽成型车间搬迁与全面达产' },
        title: { de: 'Montage der Kehlerei & Vollbetrieb', en: 'Molding Line Setup & Full Operation', ja: '木型成形部門の据付と全面稼働', zh: '开槽成型车间就位与新总部全面投产' },
        caption: { de: 'Letzte Abteilung erfolgreich verlagert: Die gesamte Holz-, Mechanik- und Hammerkopffertigung arbeitet vereint in Meuselwitz.', en: 'Final department relocated: all wood, action, and hammerhead manufacturing now operates under one roof in Meuselwitz.', ja: '最終部門が移転完了：木工・アクション・ハンマーヘッド全工程がモイゼルヴィッツ本社工場で一体稼働。', zh: '最后一个核心部门顺利迁入：全部木工、击弦机与弦槌产线在莫伊塞尔维茨总部协同投产。' }
      }
    ];

    // All 46 chronological images (01_20251103 .. 46_20260924) — every image in the folder except the last one (48_20261009)
    const rawFiles = [
      ['01_20251103_152224.jpg', '03.11.2025', '11.2025', 0],
      ['02_20251104_152516.jpg', '04.11.2025', '11.2025', 0],
      ['03_20251104_152550.jpg', '04.11.2025', '11.2025', 0],
      ['04_20251106_135140.jpg', '06.11.2025', '11.2025', 0],
      ['05_20251107_083445.jpg', '07.11.2025', '11.2025', 0],
      ['06_20251111_152144.jpg', '11.11.2025', '11.2025', 0],
      ['07_20251111_152615.jpg', '11.11.2025', '11.2025', 0],
      ['08_20251112_151842.jpg', '12.11.2025', '11.2025', 0],
      ['09_20251112_151920.jpg', '12.11.2025', '11.2025', 0],
      ['10_20251112_152604.jpg', '12.11.2025', '11.2025', 0],
      ['11_20251117_150213.jpg', '17.11.2025', '11.2025', 0],
      ['12_20251201_135635.jpg', '01.12.2025', '12.2025', 1],
      ['13_20251201_135642.jpg', '01.12.2025', '12.2025', 1],
      ['14_20251201_135805.jpg', '01.12.2025', '12.2025', 1],
      ['15_20251205_083602.jpg', '05.12.2025', '12.2025', 1],
      ['16_20251205_083629.jpg', '05.12.2025', '12.2025', 1],
      ['17_20251217_114726.jpg', '17.12.2025', '12.2025', 1],
      ['18_20260106_135356.jpg', '06.01.2026', '01.2026', 2],
      ['19_20260109_065118.jpg', '09.01.2026', '01.2026', 2],
      ['20_20260122_082955.jpg', '22.01.2026', '01.2026', 2],
      ['21_20260130_080805.jpg', '30.01.2026', '01.2026', 2],
      ['22_20260130_080930.jpg', '30.01.2026', '01.2026', 2],
      ['23_20260227_074933.jpg', '27.02.2026', '02.2026', 3],
      ['24_20260227_080105.jpg', '27.02.2026', '02.2026', 3],
      ['25_20260320_090128.jpg', '20.03.2026', '03.2026', 4],
      ['26_20260320_090158.jpg', '20.03.2026', '03.2026', 4],
      ['27_20260428_083959.jpg', '28.04.2026', '04.2026', 5],
      ['28_20260428_084018.jpg', '28.04.2026', '04.2026', 5],
      ['29_20260512_102657.jpg', '12.05.2026', '05.2026', 6],
      ['30_20260512_102708.jpg', '12.05.2026', '05.2026', 6],
      ['31_20260512_113224.jpg', '12.05.2026', '05.2026', 6],
      ['32_20260513_120325.jpg', '13.05.2026', '05.2026', 7],
      ['33_20260513_120405.jpg', '13.05.2026', '05.2026', 7],
      ['34_20260521_144701.jpg', '21.05.2026', '05.2026', 8],
      ['35_20260526_140023.jpg', '26.05.2026', '05.2026', 8],
      ['36_20260610_075535.jpg', '10.06.2026', '06.2026', 9],
      ['37_20260611_132154.jpg', '11.06.2026', '06.2026', 9],
      ['38_20260708_120853.jpg', '08.07.2026', '07.2026', 10],
      ['39_20260708_121435.jpg', '08.07.2026', '07.2026', 10],
      ['40_20260708_121630.jpg', '08.07.2026', '07.2026', 10],
      ['41_20260708_122002.jpg', '08.07.2026', '07.2026', 10],
      ['42_20260909_094559.jpg', '09.09.2026', '09.2026', 11],
      ['43_20260915_112232.jpg', '15.09.2026', '09.2026', 12],
      ['44_20260915_133800.jpg', '15.09.2026', '09.2026', 12],
      ['45_20260924_104802.jpg', '24.09.2026', '09.2026', 13],
      ['46_20260924_140257.jpg', '24.09.2026', '09.2026', 13]
    ];

    this.frames = rawFiles.map(([file, dateStr, monthYear, phaseIdx], idx) => ({
      index: idx,
      src: `Visuell/Bilder/02_Umbau_und_Umzug/web_hd/${file}`,
      dateStr,
      monthYear,
      phaseIdx
    }));

    this.totalFrames = this.frames.length;
    this.totalMilestones = this.totalFrames; // compatibility with presentation.js
    this.currentMilestone = 0;

    // Triple-buffer ring state for center photo + double-buffer state for 3D side wings
    this.centerRingIdx = 0;
    this.leftWingIdx = 0;
    this.rightWingIdx = 0;
    this.leftWingSrc = '';
    this.rightWingSrc = '';

    // Frame-locked rAF playback & organic motion state
    this.rafId = null;
    this.lastRafTime = 0;
    this.frameStartTime = 0;
    this.currentFrameDuration = 680;
    this.scrubberTrackWidth = 800;
    this.isScrubbing = false;

    // Smooth 3D parallax & ambient breathing state
    this.pointerNormX = 0;
    this.pointerNormY = 0;
    this.smoothRx = 0;
    this.smoothRy = 0;
    this.stackImpulse = 0;
    this.prefersReducedMotion = false;

    // Smart sliding-window bitmap cache & drone warm-up state
    this.pinnedBitmaps = new Map();
    this.httpPrefetchTimer = null;
    this.dronePreloadPromoted = false;
    this.dronePreStarted = false;
    this.bloomTimers = [];
    this.captionGlideTimer = null;
    this.watermarkGlideTimer = null;
    this.displayedPhaseIdx = -1;
    this.displayedMonthYear = '';
  }

  cacheDom() {
    this.slide4El = document.querySelector('.slide[data-slide="5"]');
    this.containerEl = document.getElementById('build-timeline-container');
    this.arenaEl = this.containerEl ? this.containerEl.querySelector('.diorama-3d-arena') : null;
    this.centerStackEl = document.getElementById('diorama-center-stack');
    this.photoFrameEl = document.getElementById('diorama-photo-frame');

    this.centerBuffers = [
      document.getElementById('diorama-main-img'),
      document.getElementById('diorama-flip-img'),
      document.getElementById('diorama-prep-img')
    ].filter(Boolean);

    this.leftWingCard = document.getElementById('diorama-wing-left-btn') ||
      (this.containerEl && this.containerEl.querySelector('.diorama-wing.left .diorama-wing-card'));
    this.leftWingBuffers = [
      document.getElementById('diorama-wing-left-img'),
      document.getElementById('diorama-wing-left-img-b')
    ].filter(Boolean);

    this.rightWingCard = document.getElementById('diorama-wing-right-btn') ||
      (this.containerEl && this.containerEl.querySelector('.diorama-wing.right .diorama-wing-card'));
    this.rightWingLabelEl = this.rightWingCard ? this.rightWingCard.querySelector('.diorama-wing-label') : null;
    this.rightWingBuffers = [
      document.getElementById('diorama-wing-right-img'),
      document.getElementById('diorama-wing-right-img-b')
    ].filter(Boolean);

    this.watermarkEl = document.getElementById('diorama-watermark');
    this.dateBadgeEl = document.getElementById('diorama-date-badge');
    this.frameBadgeEl = document.getElementById('diorama-frame-badge');
    this.phaseBadgeEl = document.getElementById('diorama-phase-badge');
    this.captionBarEl = document.getElementById('diorama-caption-bar');
    this.titleEl = document.getElementById('diorama-phase-title');
    this.capEl = document.getElementById('diorama-phase-caption');
    this.brightFlashEl = document.getElementById('diorama-bright-flash');

    this.droneStageEl = document.getElementById('diorama-drone-stage');
    this.droneVidEl = document.getElementById('diorama-drone-video');
    this.droneBadgeEl = document.getElementById('diorama-drone-badge');
    this.replayBtnEl = document.getElementById('diorama-replay-flipbook-btn');

    this.scrubberTrackEl = document.getElementById('diorama-scrubber-track') ||
      (this.containerEl && this.containerEl.querySelector('.diorama-scrubber-track-wrap'));
    this.progFillEl = document.getElementById('diorama-progress-fill');
    this.scrubberOrbEl = document.getElementById('diorama-scrubber-orb');
    this.dronePillEl = document.getElementById('diorama-scrubber-drone');

    this.playBtnEl = document.getElementById('build-play-btn');
    this.playIconEl = document.getElementById('build-play-icon');
    this.playLabelEl = document.getElementById('build-play-label');
    this.playProgEl = document.getElementById('build-play-progress');
    this.counterBadgeEl = document.getElementById('build-step-counter');
    this.prevBtnEl = document.getElementById('build-prev-btn');
    this.nextBtnEl = document.getElementById('build-next-btn');
    this.nextLabelEl = document.getElementById('build-next-label');
    this.droneBtnEl = document.getElementById('build-drone-btn');

    this.tickEls = Array.from(document.querySelectorAll('.diorama-tick[data-frame]'));
  }

  init() {
    this.prefersReducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.cacheDom();
    this.measureScrubber();
    this.warmImageCache();
    this.ensureWindowDecoded(0);

    if (window.ResizeObserver && this.scrubberTrackEl) {
      this.resizeObs = new ResizeObserver(() => {
        this.measureScrubber();
        if (!this.isPlayingFlipbook) {
          const p = this.inDroneMode ? 1 : (this.currentFrame + 1) / this.totalFrames;
          this.applyScrubberTransform(p);
        }
      });
      this.resizeObs.observe(this.scrubberTrackEl);
    }

    if (this.playBtnEl) {
      this.playBtnEl.addEventListener('click', () => {
        if (this.inDroneMode) {
          this.startFlipbook(0);
        } else if (this.isPlayingFlipbook) {
          this.pauseFlipbook();
        } else {
          const startIdx = this.currentFrame >= this.totalFrames - 1 ? 0 : this.currentFrame;
          this.startFlipbook(startIdx);
        }
      });
    }

    if (this.droneBtnEl) {
      this.droneBtnEl.addEventListener('click', () => {
        if (this.inDroneMode) {
          this.startFlipbook(0);
        } else {
          this.startDroneVideo(false);
        }
      });
    }

    if (this.replayBtnEl) {
      this.replayBtnEl.addEventListener('click', () => {
        this.startFlipbook(0);
      });
    }

    if (this.prevBtnEl) {
      this.prevBtnEl.addEventListener('click', () => {
        if (this.inDroneMode) {
          this.exitDroneVideo(this.totalFrames - 1);
          return;
        }
        this.pauseFlipbook();
        if (this.currentFrame > 0) {
          this.renderFrame(this.currentFrame - 1, true, 340);
          this.applyScrubberTransform((this.currentFrame + 0.5) / this.totalFrames);
        } else if (window.presentation && typeof window.presentation.prevSlide === 'function') {
          window.presentation.prevSlide();
        }
      });
    }

    if (this.nextBtnEl) {
      this.nextBtnEl.addEventListener('click', () => {
        if (!this.inDroneMode) {
          this.startDroneVideo(false);
        } else if (window.presentation && typeof window.presentation.goToSlide === 'function') {
          this.pause();
          window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
        }
      });
    }

    // Interactive 3D Side Wings (step back / step forward organically)
    if (this.leftWingCard) {
      this.leftWingCard.addEventListener('click', () => {
        if (this.inDroneMode) return;
        this.pauseFlipbook();
        if (this.currentFrame > 0) {
          this.renderFrame(this.currentFrame - 1, true, 360);
          this.applyScrubberTransform((this.currentFrame + 0.5) / this.totalFrames);
        }
      });
    }

    if (this.rightWingCard) {
      this.rightWingCard.addEventListener('click', () => {
        if (this.inDroneMode) return;
        this.pauseFlipbook();
        if (this.currentFrame < this.totalFrames - 1) {
          this.renderFrame(this.currentFrame + 1, true, 360);
          this.applyScrubberTransform((this.currentFrame + 0.5) / this.totalFrames);
        } else {
          this.startDroneVideo(false);
        }
      });
    }

    // Subtle 3D pointer parallax on the diorama stage
    if (this.containerEl) {
      this.containerEl.addEventListener('pointermove', (e) => {
        if (this.inDroneMode || this.prefersReducedMotion) return;
        const rect = this.containerEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          this.pointerNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          this.pointerNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        }
      }, { passive: true });

      this.containerEl.addEventListener('pointerleave', () => {
        this.pointerNormX = 0;
        this.pointerNormY = 0;
      }, { passive: true });
    }

    // Interactive Scrubber Track (click & smooth drag scrubbing across all 46 frames)
    if (this.scrubberTrackEl) {
      const scrubFromEvent = (e) => {
        const rect = this.scrubberTrackEl.getBoundingClientRect();
        if (rect.width <= 0) return;
        const rel = Math.max(0, Math.min(0.9999, (e.clientX - rect.left) / rect.width));
        const fIdx = Math.floor(rel * this.totalFrames);
        this.pauseFlipbook();
        if (this.inDroneMode) {
          this.exitDroneVideo(fIdx);
        } else if (fIdx !== this.currentFrame) {
          this.renderFrame(fIdx, true, 240);
        }
        this.applyScrubberTransform(rel);
      };

      this.scrubberTrackEl.addEventListener('pointerdown', (e) => {
        this.isScrubbing = true;
        try { this.scrubberTrackEl.setPointerCapture(e.pointerId); } catch (_) {}
        scrubFromEvent(e);
      });

      this.scrubberTrackEl.addEventListener('pointermove', (e) => {
        if (!this.isScrubbing) return;
        scrubFromEvent(e);
      });

      const endScrub = () => { this.isScrubbing = false; };
      this.scrubberTrackEl.addEventListener('pointerup', endScrub);
      this.scrubberTrackEl.addEventListener('pointercancel', endScrub);
    }

    this.tickEls.forEach(tick => {
      tick.addEventListener('click', (e) => {
        e.stopPropagation();
        const fIdx = parseInt(tick.getAttribute('data-frame'), 10);
        if (!isNaN(fIdx)) {
          this.pauseFlipbook();
          this.exitDroneVideo(fIdx);
        }
      });
    });

    if (this.dronePillEl) {
      this.dronePillEl.addEventListener('click', () => {
        this.startDroneVideo(false);
      });
    }

    // Observe Slide 4 active state to start/stop GPU ambient loop & pause video cleanly
    if (this.slide4El) {
      const obs = new MutationObserver(() => {
        if (this.slide4El.classList.contains('active')) {
          this.measureScrubber();
          this.ensureWindowDecoded(this.currentFrame);
          this.startRafLoop();
        } else {
          this.pause();
          this.stopRafLoop();
        }
      });
      obs.observe(this.slide4El, { attributes: true, attributeFilter: ['class'] });
    }

    this.renderFrame(0, false);
  }

  measureScrubber() {
    if (this.scrubberTrackEl) {
      const w = this.scrubberTrackEl.clientWidth;
      if (w > 40) this.scrubberTrackWidth = w;
    }
  }

  warmImageCache() {
    // Trickle-prefetch compressed JPEGs into browser HTTP cache in small non-blocking batches
    // without decoding all 46 bitmaps at once (prevents GPU bitmap cache eviction)
    let cursor = 0;
    const stepBatch = () => {
      const end = Math.min(this.totalFrames, cursor + 3);
      for (let i = cursor; i < end; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = this.frames[i].src;
      }
      cursor = end;
      if (cursor < this.totalFrames) {
        this.httpPrefetchTimer = setTimeout(stepBatch, 95);
      }
    };
    this.httpPrefetchTimer = setTimeout(stepBatch, 300);
  }

  ensureWindowDecoded(centerIdx) {
    // Keep a compact rolling window [centerIdx - 2 .. centerIdx + 7] GPU-decoded in memory (~60 MB max)
    const winStart = Math.max(0, centerIdx - 2);
    const winEnd = Math.min(this.totalFrames - 1, centerIdx + 7);

    for (const key of this.pinnedBitmaps.keys()) {
      if (key < winStart - 2 || key > winEnd + 2) {
        this.pinnedBitmaps.delete(key);
      }
    }

    for (let i = winStart; i <= winEnd; i++) {
      if (!this.pinnedBitmaps.has(i)) {
        const img = new Image();
        img.decoding = 'async';
        img.src = this.frames[i].src;
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
        this.pinnedBitmaps.set(i, img);
      }
    }
  }

  promoteDroneVideoPreload() {
    if (this.dronePreloadPromoted || !this.droneVidEl) return;
    this.dronePreloadPromoted = true;
    try {
      this.droneVidEl.preload = 'auto';
      if (this.droneVidEl.readyState === 0) {
        this.droneVidEl.load();
      }
    } catch (_) {}
  }

  preStartDronePlayback() {
    if (this.dronePreStarted || this.inDroneMode || !this.droneVidEl) return;
    this.dronePreStarted = true;
    try {
      this.droneVidEl.muted = false;
      if (this.droneVidEl.currentTime > 0.25) {
        this.droneVidEl.currentTime = 0;
      }
      const p = this.droneVidEl.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          this.droneVidEl.muted = true;
          this.droneVidEl.play().catch(() => {});
        });
      }
    } catch (_) {}
  }

  getFrameDuration(idx) {
    // Smooth, organic kinematic pacing curve:
    // 1. Calm opening settle (frames 0..2) so the 3D diorama rises gracefully
    // 2. Flowing narrative rhythm (frames 3..38) with a subtle breath on new construction phases
    // 3. Continuous exponential crescendo on the final 7 frames (39..45) into the Drone Finale
    if (idx === 0) return 680;
    if (idx === 1) return 575;
    if (idx === 2) return 520;

    const crescendoStart = this.totalFrames - 7; // index 39
    if (idx >= crescendoStart) {
      const crescendoSchedule = [420, 345, 275, 215, 168, 132, 112];
      return crescendoSchedule[Math.min(crescendoSchedule.length - 1, idx - crescendoStart)];
    }

    const isNewPhase = idx > 0 && this.frames[idx].phaseIdx !== this.frames[idx - 1].phaseIdx;
    return isNewPhase ? 545 : 475;
  }

  crossfadeWing(buffers, currentIdxProp, currentSrcProp, cardEl, targetSrc, durMs, instant) {
    if (!buffers || buffers.length === 0) return;
    if (buffers.length === 1) {
      if (this[currentSrcProp] !== targetSrc) {
        buffers[0].src = targetSrc;
        buffers[0].classList.add('is-visible');
        this[currentSrcProp] = targetSrc;
      }
      return;
    }

    if (!instant && this[currentSrcProp] === targetSrc) return;

    if (cardEl) {
      cardEl.style.setProperty('--wing-dur', instant ? '0ms' : `${durMs}ms`);
    }

    if (instant) {
      this[currentIdxProp] = 0;
      this[currentSrcProp] = targetSrc;
      buffers[0].src = targetSrc;
      buffers[0].classList.remove('is-under');
      buffers[0].classList.add('is-visible');
      buffers[1].classList.remove('is-visible', 'is-under');
      return;
    }

    const nextSlot = (this[currentIdxProp] + 1) % 2;
    const incoming = buffers[nextSlot];
    const outgoing = buffers[this[currentIdxProp]];
    this[currentIdxProp] = nextSlot;
    this[currentSrcProp] = targetSrc;

    if (!incoming.getAttribute('src') || !incoming.getAttribute('src').endsWith(targetSrc)) {
      incoming.src = targetSrc;
    }
    outgoing.classList.remove('is-visible');
    outgoing.classList.add('is-under');
    incoming.classList.remove('is-under', 'is-visible');
    // Trigger clean CSS keyframe dissolve on incoming buffer without layout reflow
    requestAnimationFrame(() => {
      incoming.classList.add('is-visible');
    });
  }

  applyScrubberTransform(progress01) {
    const p = Math.max(0.015, Math.min(1, progress01));
    if (this.progFillEl) {
      this.progFillEl.style.transform = `scaleX(${p.toFixed(4)})`;
    }
    if (this.playProgEl) {
      this.playProgEl.style.transform = `scaleX(${p.toFixed(4)})`;
    }
    if (this.scrubberOrbEl) {
      const usableW = Math.max(0, this.scrubberTrackWidth - 16);
      const xPx = 8 + p * usableW;
      this.scrubberOrbEl.style.transform = `translate3d(${xPx.toFixed(2)}px, -50%, 0)`;
    }
  }

  renderFrame(index, animateFlip = true, customDurMs = null) {
    const clamped = Math.max(0, Math.min(this.totalFrames - 1, index));
    const prevIdx = this.currentFrame;
    this.currentFrame = clamped;
    this.currentMilestone = clamped;

    this.ensureWindowDecoded(clamped);

    // Promote drone video buffering smoothly once the initial reveal has settled
    if (clamped >= 6) {
      this.promoteDroneVideoPreload();
    }

    const cur = this.frames[clamped];
    const prev = this.frames[Math.max(0, clamped - 1)];
    const next1 = this.frames[Math.min(this.totalFrames - 1, clamped + 1)];
    const phaseObj = this.phases[cur.phaseIdx] || this.phases[0];
    const lang = this.currentLang;

    const frameDur = customDurMs || this.getFrameDuration(clamped);
    this.currentFrameDuration = frameDur;
    const flipCssDur = Math.max(82, Math.min(365, Math.round(frameDur * 0.74)));

    if (this.photoFrameEl) {
      this.photoFrameEl.style.setProperty('--flip-dur', animateFlip ? `${flipCssDur}ms` : '0ms');
    }

    // Subtle stack wave impulse on each card turn
    if (animateFlip && prevIdx !== clamped) {
      this.stackImpulse = Math.min(1, this.stackImpulse + 0.85);
    }

    // 1. Triple-Buffered GPU Ring Crossfade (never mutates an outgoing image mid-fade)
    const bufs = this.centerBuffers;
    if (bufs.length >= 3) {
      if (!animateFlip || prevIdx === clamped) {
        this.centerRingIdx = 0;
        bufs[0].src = cur.src;
        bufs[0].classList.remove('is-exiting');
        bufs[0].classList.add('is-visible');

        bufs[1].classList.remove('is-visible', 'is-exiting');
        bufs[1].src = next1.src;
        if (typeof bufs[1].decode === 'function') bufs[1].decode().catch(() => {});

        bufs[2].classList.remove('is-visible', 'is-exiting');
      } else {
        const idleSlot = (this.centerRingIdx + 2) % 3;
        const outgoingSlot = this.centerRingIdx;
        const incomingSlot = (this.centerRingIdx + 1) % 3;
        this.centerRingIdx = incomingSlot;

        const idleBuf = bufs[idleSlot];
        const outgoingBuf = bufs[outgoingSlot];
        const incomingBuf = bufs[incomingSlot];

        // Clear previous exiting state on the oldest slot (drops immediately to opacity:0; transition:none)
        idleBuf.classList.remove('is-visible', 'is-exiting');

        // Ensure incoming slot holds cur.src (pre-staged on the prior tick during normal playback)
        if (!incomingBuf.getAttribute('src') || !incomingBuf.getAttribute('src').endsWith(cur.src)) {
          incomingBuf.src = cur.src;
        }
        incomingBuf.classList.remove('is-exiting');
        incomingBuf.classList.add('is-visible');

        outgoingBuf.classList.remove('is-visible');
        outgoingBuf.classList.add('is-exiting');

        // Pre-stage next1.src onto the completely hidden idle slot for the upcoming tick
        if (!idleBuf.getAttribute('src') || !idleBuf.getAttribute('src').endsWith(next1.src)) {
          idleBuf.src = next1.src;
          if (typeof idleBuf.decode === 'function') idleBuf.decode().catch(() => {});
        }
      }
    } else if (bufs.length === 2) {
      const incoming = bufs[clamped % 2];
      const outgoing = bufs[(clamped + 1) % 2];
      incoming.src = cur.src;
      incoming.classList.add('is-visible');
      outgoing.classList.remove('is-visible');
    }

    // 2. Smooth GPU Double-Buffered 3D Side Wings + Clean Boundary Handling
    const wingDur = Math.max(120, Math.min(440, flipCssDur + 30));
    const isAtFirst = clamped === 0;
    const isAtLast = clamped === this.totalFrames - 1;
    const rightPreviewSrc = isAtLast
      ? 'Visuell/Bilder/02_Umbau_und_Umzug/web_hd/poster_drone_meuselwitz.jpg'
      : next1.src;

    if (this.leftWingCard) {
      this.leftWingCard.classList.toggle('is-boundary', isAtFirst);
      this.leftWingCard.setAttribute('aria-disabled', isAtFirst ? 'true' : 'false');
    }
    if (this.rightWingLabelEl) {
      if (isAtLast) {
        this.rightWingLabelEl.textContent = lang === 'de' ? '🎬 Drohnenflug ▶' :
                                            lang === 'en' ? '🎬 Drone Flight ▶' :
                                            lang === 'ja' ? '🎬 ドローン映像 ▶' :
                                            '🎬 无人机航拍 ▶';
      } else {
        const dict = (window.slideTranslations && window.slideTranslations[lang]) || {};
        this.rightWingLabelEl.textContent = dict.s5_wing_next ||
          (lang === 'de' ? 'Nächstes Bild ▶' :
           lang === 'en' ? 'Next Frame ▶' :
           lang === 'ja' ? '次の写真 ▶' : '下一张 ▶');
      }
    }

    this.crossfadeWing(this.leftWingBuffers, 'leftWingIdx', 'leftWingSrc', this.leftWingCard, prev.src, wingDur, !animateFlip);
    this.crossfadeWing(this.rightWingBuffers, 'rightWingIdx', 'rightWingSrc', this.rightWingCard, rightPreviewSrc, wingDur, !animateFlip);

    // 3. Smooth Watermark & Phase Caption Cross-Glide (only animate when month or phase changes)
    if (this.watermarkEl && this.displayedMonthYear !== cur.monthYear) {
      this.displayedMonthYear = cur.monthYear;
      if (animateFlip && frameDur >= 260) {
        this.watermarkEl.classList.add('is-gliding');
        clearTimeout(this.watermarkGlideTimer);
        this.watermarkGlideTimer = setTimeout(() => {
          if (this.watermarkEl) {
            this.watermarkEl.textContent = cur.monthYear;
            this.watermarkEl.classList.remove('is-gliding');
          }
        }, 120);
      } else {
        this.watermarkEl.textContent = cur.monthYear;
        this.watermarkEl.classList.remove('is-gliding');
      }
    }

    if (this.dateBadgeEl) this.dateBadgeEl.textContent = `📅 ${cur.dateStr}`;

    if (this.frameBadgeEl) {
      const lbl = lang === 'de' ? 'Bild' : lang === 'en' ? 'Frame' : lang === 'ja' ? '写真' : '画面';
      this.frameBadgeEl.textContent = `${lbl} ${String(clamped + 1).padStart(2, '0')} / ${this.totalFrames}`;
    }

    const phaseChanged = this.displayedPhaseIdx !== cur.phaseIdx;
    if (phaseChanged || !animateFlip) {
      this.displayedPhaseIdx = cur.phaseIdx;
      const nextPhaseTxt = phaseObj.phase[lang] || phaseObj.phase.de;
      const nextTitleTxt = phaseObj.title[lang] || phaseObj.title.de;
      const nextCapTxt = phaseObj.caption[lang] || phaseObj.caption.de;

      if (animateFlip && phaseChanged && frameDur >= 280) {
        if (this.phaseBadgeEl) this.phaseBadgeEl.classList.add('is-gliding');
        if (this.captionBarEl) this.captionBarEl.classList.add('is-gliding');
        clearTimeout(this.captionGlideTimer);
        this.captionGlideTimer = setTimeout(() => {
          if (this.phaseBadgeEl) {
            this.phaseBadgeEl.textContent = nextPhaseTxt;
            this.phaseBadgeEl.classList.remove('is-gliding');
          }
          if (this.titleEl) this.titleEl.textContent = nextTitleTxt;
          if (this.capEl) this.capEl.textContent = nextCapTxt;
          if (this.captionBarEl) this.captionBarEl.classList.remove('is-gliding');
        }, 115);
      } else {
        if (this.phaseBadgeEl) {
          this.phaseBadgeEl.textContent = nextPhaseTxt;
          this.phaseBadgeEl.classList.remove('is-gliding');
        }
        if (this.titleEl) this.titleEl.textContent = nextTitleTxt;
        if (this.capEl) this.capEl.textContent = nextCapTxt;
        if (this.captionBarEl) this.captionBarEl.classList.remove('is-gliding');
      }
    }

    // 4. Header Counter & Cached Scrubber Ticks
    if (this.counterBadgeEl) {
      this.counterBadgeEl.textContent = `${cur.monthYear} • ${String(clamped + 1).padStart(2, '0')} / ${this.totalFrames}`;
    }

    for (let i = 0; i < this.tickEls.length; i++) {
      const tick = this.tickEls[i];
      tick.classList.toggle('is-passed', i <= clamped);
      tick.classList.toggle('is-current', i === clamped);
    }

    if (!this.isPlayingFlipbook && !this.isScrubbing) {
      this.applyScrubberTransform((clamped + 1) / this.totalFrames);
    }

    this.updateHeaderButtons();
  }

  startRafLoop() {
    if (this.rafId) return;
    this.lastRafTime = performance.now();
    const step = (now) => {
      this.rafId = null;
      if (this.slide4El && !this.slide4El.classList.contains('active')) return;
      this.onAnimationFrame(now);
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  stopRafLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  onAnimationFrame(now) {
    const dt = Math.min(0.064, Math.max(0.001, (now - this.lastRafTime) / 1000));
    this.lastRafTime = now;

    // 1. Advance frame-locked Flipbook timeline & continuous 60/120fps Scrubber + Finale Bloom
    let crescendoT = 0;
    if (this.isPlayingFlipbook && !this.inDroneMode) {
      let elapsed = now - this.frameStartTime;

      if (elapsed >= this.currentFrameDuration) {
        const carry = Math.min(24, elapsed - this.currentFrameDuration);
        if (this.currentFrame < this.totalFrames - 1) {
          this.frameStartTime = now - carry;
          this.renderFrame(this.currentFrame + 1, true);
          elapsed = carry;
        } else {
          // Completed final frame -> emerge seamlessly out of warm golden-white light into the Drone Flight!
          this.isPlayingFlipbook = false;
          this.startDroneVideo(true);
          return;
        }
      }

      const frameProgress = Math.max(0, Math.min(1, elapsed / Math.max(1, this.currentFrameDuration)));
      const continuousProgress = (this.currentFrame + frameProgress) / this.totalFrames;
      this.applyScrubberTransform(continuousProgress);

      // Smooth continuous crescendo over the final 7 frames (indices 39..45)
      const crescendoStart = this.totalFrames - 7;
      if (this.currentFrame >= crescendoStart) {
        crescendoT = Math.max(0, Math.min(1, ((this.currentFrame - crescendoStart) + frameProgress) / 7));
        if (crescendoT >= 0.45) {
          this.promoteDroneVideoPreload();
        }
      }

      if (this.brightFlashEl) {
        this.brightFlashEl.style.opacity = '0';
      }
    }

    // 2. Organic 3D Diorama Breathing, Pointer Parallax & Stack Ripple (pure GPU custom properties)
    if (!this.inDroneMode && this.arenaEl && !this.prefersReducedMotion) {
      const tSec = now * 0.001;
      const ambientPlayFactor = this.isPlayingFlipbook ? 1 : 0.45;
      const breathRy = Math.sin(tSec * 0.95) * 0.65 * ambientPlayFactor;
      const breathRx = Math.cos(tSec * 0.78) * 0.42 * ambientPlayFactor;
      const breathTy = Math.sin(tSec * 1.15) * 2.2 * ambientPlayFactor;

      const targetRy = breathRy + this.pointerNormX * 1.65;
      const targetRx = breathRx - this.pointerNormY * 1.15;

      const damp = 1 - Math.exp(-dt * 6.5);
      this.smoothRx += (targetRx - this.smoothRx) * damp;
      this.smoothRy += (targetRy - this.smoothRy) * damp;
      this.stackImpulse *= Math.exp(-dt * 7.5);

      const forwardScale = 1 + (crescendoT * crescendoT * 0.044);

      if (!this.containerEl || !this.containerEl.classList.contains('is-dark-start')) {
        this.arenaEl.style.setProperty('--arena-rx', `${this.smoothRx.toFixed(3)}deg`);
        this.arenaEl.style.setProperty('--arena-ry', `${this.smoothRy.toFixed(3)}deg`);
        this.arenaEl.style.setProperty('--arena-ty', `${breathTy.toFixed(2)}px`);
        this.arenaEl.style.setProperty('--arena-scale', forwardScale.toFixed(4));
      }

      if (this.centerStackEl) {
        const w1 = (this.stackImpulse * 3.2) + Math.sin(tSec * 1.6) * 0.8 * ambientPlayFactor;
        const w2 = (this.stackImpulse * 5.4) + Math.cos(tSec * 1.4) * 1.2 * ambientPlayFactor;
        this.centerStackEl.style.setProperty('--stack-wave-1', `${w1.toFixed(2)}px`);
        this.centerStackEl.style.setProperty('--stack-wave-2', `${w2.toFixed(2)}px`);
      }

      if (this.leftWingCard) {
        const wl = Math.sin(tSec * 1.1 + 0.7) * 2.4 * ambientPlayFactor;
        this.leftWingCard.style.setProperty('--wing-float-l', `${wl.toFixed(2)}px`);
      }
      if (this.rightWingCard) {
        const wr = Math.sin(tSec * 1.1 + 2.3) * 2.4 * ambientPlayFactor;
        this.rightWingCard.style.setProperty('--wing-float-r', `${wr.toFixed(2)}px`);
      }
    }
  }

  clearBloomTimers() {
    while (this.bloomTimers.length) {
      clearTimeout(this.bloomTimers.pop());
    }
    if (this.brightFlashEl) {
      this.brightFlashEl.classList.remove('is-peaking', 'is-dissolving');
      this.brightFlashEl.style.opacity = '0';
    }
  }

  startFlipbook(startIndex = 0) {
    this.clearBloomTimers();
    this.isStarted = true;
    this.inDroneMode = false;
    this.isPlayingFlipbook = true;
    this.dronePreStarted = false;

    if (this.containerEl) {
      this.containerEl.classList.remove('is-dark-start', 'is-drone-mode');
    }
    if (this.droneStageEl) {
      this.droneStageEl.classList.remove('is-active');
    }
    if (this.droneVidEl) {
      try {
        this.droneVidEl.pause();
        if (this.droneVidEl.readyState >= 1) {
          this.droneVidEl.currentTime = 0.001;
        }
      } catch (_) {}
    }
    if (this.dronePillEl) {
      this.dronePillEl.classList.remove('active');
    }

    this.measureScrubber();
    this.renderFrame(startIndex, false);
    this.frameStartTime = performance.now();
    this.applyScrubberTransform((startIndex + 0.02) / this.totalFrames);
    this.startRafLoop();
    this.updateHeaderButtons();
  }

  pauseFlipbook() {
    this.isPlayingFlipbook = false;
    if (this.brightFlashEl && !this.inDroneMode) {
      this.brightFlashEl.classList.remove('is-peaking', 'is-dissolving');
      this.brightFlashEl.style.opacity = '0';
    }
    if (this.arenaEl) {
      this.arenaEl.style.setProperty('--arena-scale', '1');
    }
    this.updateHeaderButtons();
  }

  startDroneVideo(fromBrightFlash = false) {
    this.isPlayingFlipbook = false;
    this.isStarted = true;
    this.inDroneMode = true;
    this.promoteDroneVideoPreload();

    while (this.bloomTimers.length) {
      clearTimeout(this.bloomTimers.pop());
    }

    if (this.brightFlashEl) {
      this.brightFlashEl.classList.remove('is-peaking', 'is-dissolving');
      this.brightFlashEl.style.opacity = '0';
    }

    if (this.containerEl) {
      this.containerEl.classList.remove('is-dark-start');
      this.containerEl.classList.add('is-drone-mode');
    }

    if (this.watermarkEl) {
      this.watermarkEl.textContent = '2026';
      this.displayedMonthYear = '2026';
    }

    if (this.droneStageEl) this.droneStageEl.classList.add('is-active');
    if (this.dronePillEl) this.dronePillEl.classList.add('active');

    this.measureScrubber();
    this.applyScrubberTransform(1);

    if (this.counterBadgeEl) {
      this.counterBadgeEl.textContent = this.currentLang === 'de' ? '🎬 Drohnenflug Meuselwitz' :
                                         this.currentLang === 'en' ? '🎬 Drone Flight Meuselwitz' :
                                         this.currentLang === 'ja' ? '🎬 ドローン映像' : '🎬 莫伊塞尔维茨无人机航拍';
    }

    if (this.droneVidEl) {
      try {
        if (this.droneVidEl.readyState >= 1) {
          this.droneVidEl.currentTime = 0;
        }
        const p = this.droneVidEl.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            this.droneVidEl.muted = true;
            this.droneVidEl.play().catch(() => {});
          });
        }
      } catch (_) {}
    }

    this.updateHeaderButtons();
  }

  exitDroneVideo(targetFrame = 0) {
    this.pauseFlipbook();
    this.inDroneMode = false;
    this.clearBloomTimers();

    if (this.containerEl) this.containerEl.classList.remove('is-drone-mode');
    if (this.droneStageEl) this.droneStageEl.classList.remove('is-active');
    if (this.dronePillEl) this.dronePillEl.classList.remove('active');

    if (this.droneVidEl) {
      try { this.droneVidEl.pause(); } catch (_) {}
    }

    this.renderFrame(targetFrame, false);
    this.startRafLoop();
  }

  updateHeaderButtons() {
    const lang = this.currentLang;
    if (this.prevBtnEl) {
      this.prevBtnEl.disabled = false;
    }

    if (this.playBtnEl) {
      this.playBtnEl.classList.toggle('playing', this.isPlayingFlipbook);
      this.playBtnEl.classList.toggle('is-playing', this.isPlayingFlipbook);
    }
    if (this.playIconEl) {
      this.playIconEl.textContent = this.isPlayingFlipbook ? '❚❚' : '▶';
    }
    if (this.playLabelEl) {
      if (this.isPlayingFlipbook) {
        this.playLabelEl.textContent = lang === 'de' ? 'Pause' : lang === 'en' ? 'Pause' : lang === 'ja' ? '一時停止' : '暂停';
      } else {
        this.playLabelEl.textContent = lang === 'de' ? 'Daumenkino starten' :
                                        lang === 'en' ? 'Play Flipbook' :
                                        lang === 'ja' ? 'パラパラ映像再生' : '播放翻页动画';
      }
    }

    if (this.nextLabelEl) {
      if (this.inDroneMode) {
        this.nextLabelEl.textContent = lang === 'de' ? 'Nächste Folie' :
                                        lang === 'en' ? 'Next Slide' :
                                        lang === 'ja' ? '次のスライド' : '下一页';
      } else {
        this.nextLabelEl.textContent = lang === 'de' ? 'Drohnenflug' :
                                        lang === 'en' ? 'Drone Flight' :
                                        lang === 'ja' ? 'ドローン映像へ' : '无人机航拍';
      }
    }
  }

  // Compatibility hooks called by js/presentation.js
  resetToDarkState() {
    this.pause();
    this.clearBloomTimers();
    this.isStarted = false;
    this.inDroneMode = false;
    if (this.containerEl) {
      this.containerEl.classList.remove('is-drone-mode');
      this.containerEl.classList.add('is-dark-start');
    }
    if (this.droneStageEl) {
      this.droneStageEl.classList.remove('is-active');
    }
    if (this.dronePillEl) {
      this.dronePillEl.classList.remove('active');
    }
    this.renderFrame(0, false);
    this.applyScrubberTransform(0.015);
  }

  startJourney() {
    this.startFlipbook(0);
  }

  goToMilestone(index) {
    if (index >= this.totalFrames - 1) {
      this.startDroneVideo(false);
    } else {
      this.exitDroneVideo(index);
    }
  }

  nextEra() {
    if (!this.inDroneMode) {
      this.startDroneVideo(false);
      return true;
    }
    this.pause();
    return false;
  }

  prevEra() {
    if (this.inDroneMode) {
      this.exitDroneVideo(this.totalFrames - 1);
      return true;
    }
    this.pause();
    return false;
  }

  pause() {
    this.pauseFlipbook();
    if (this.droneVidEl && !this.droneVidEl.paused) {
      try { this.droneVidEl.pause(); } catch (_) {}
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.displayedPhaseIdx = -1; // Force clean refresh of localized phase texts
    if (this.droneBadgeEl) {
      this.droneBadgeEl.textContent = lang === 'de' ? 'DROHNENFLUG INNEN • WERK MEUSELWITZ (2026)' :
                                       lang === 'en' ? 'INTERIOR DRONE FLIGHT • MEUSELWITZ PLANT (2026)' :
                                       lang === 'ja' ? '工場内部ドローン映像 • モイゼルヴィッツ（2026）' :
                                       '莫伊塞尔维茨新工厂内部无人机航拍 (2026)';
    }
    if (this.replayBtnEl) {
      this.replayBtnEl.textContent = lang === 'de' ? '↺ Daumenkino wiederholen' :
                                      lang === 'en' ? '↺ Replay Flipbook' :
                                      lang === 'ja' ? '↺ パラパラ映像を再生' :
                                      '↺ 重播翻页纪实';
    }
    if (this.inDroneMode) {
      if (this.counterBadgeEl) {
        this.counterBadgeEl.textContent = lang === 'de' ? '🎬 Drohnenflug Meuselwitz' :
                                           lang === 'en' ? '🎬 Drone Flight Meuselwitz' :
                                           lang === 'ja' ? '🎬 ドローン映像' : '🎬 莫伊塞尔维茨无人机航拍';
      }
      this.updateHeaderButtons();
    } else {
      this.renderFrame(this.currentFrame, false);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.meuselwitzJourney = new RennerTransformationJourney();
  window.meuselwitzJourney.init();
});
