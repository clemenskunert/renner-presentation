/**
 * Louis Renner Presentation - Slide 4: Chronological Diorama / Daumenkino (Flipbook)
 * & Automatic Transition to Interior Drone Flight (Visuell/Video/APTA2026-MeuselwitzInnen.mp4)
 *
 * Features:
 * - All 47 chronological construction photos (03.11.2025 – 09.10.2026) from Visuell/Bilder/02_Umbau_und_Umzug/
 * - 3D Diorama side-wings + depth-stacked Daumenkino (flipbook) with rapid 3D page-flip animation
 * - Automatic seamless transition into the full-stage interior drone flight video:
 *   Visuell/Video/APTA2026-MeuselwitzInnen.mp4
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
        caption: { de: 'Statische Hochpräzision: Fundamentierung für die 40 Tonnen schwere und 12 Meter hohe zentrale Absauganlage.', en: 'Structural heavy-duty engineering: foundation concrete for the 40-ton, 12-meter-tall central filtration plant.', ja: '静的精密設計：総重量40トン・高さ12メートルの超大型中央集塵プラントを支える専用高剛性基礎。', zh: '结构高承重基础工程：为重达40吨、高12米的室外大型工业除尘过滤系统打造抗震隔振基坑。' }
      },
      {
        phase: { de: 'Phase 7: Kranhub der Filtermodule', en: 'Phase 7: Crane Lift of Filter Modules', ja: '第7フェーズ：集塵モジュールのクレーン吊り上げ', zh: '第七阶段：除尘过滤模块起重机精准吊装' },
        title: { de: 'Anlieferung & Kranhub der Filtermodule', en: 'Delivery & Crane Lift of Filter Modules', ja: '大型集塵モジュールの搬入とクレーン吊り上げ', zh: '除尘模块重载运输与特种起重机吊装' },
        caption: { de: 'Schwerlast-Logistik per 70-Tonnen-Autokran: Millimetergenaue Positionierung der tonnenschweren Filterkomponenten.', en: 'Heavy-duty logistics with a 70-ton mobile crane: millimeter-accurate positioning of multi-ton filtration components.', ja: '70トン大型クレーンによる重量物物流：数トンの大型フィルターコンポーネントをミリ単位で位置合わせ。', zh: '70吨全地面起重机特种重载作业：将重达数吨的除尘过滤核心组件进行毫米级高精定位。' }
      },
      {
        phase: { de: 'Phase 8: Kranmontage des Filterturms', en: 'Phase 8: Crane Assembly of Filter Tower', ja: '第8フェーズ：集塵タワーのクレーン据付組立', zh: '第八阶段：除尘塔上部箱体高空精准拼装' },
        title: { de: 'Kranmontage des 12 m Filterturms', en: 'Crane Assembly of 12 m Filter Tower', ja: '集塵タワー上部ユニットのクレーン組立て', zh: '除尘过滤塔箱体结构高空合拢' },
        caption: { de: 'Präzisionsmontage in luftiger Höhe: Das 12 Meter hohe Filterturm-Oberteil wird auf die Stahlkonstruktion gesetzt.', en: 'Precision assembly at height: The 12-meter-tall upper filter section is positioned onto the steel frame.', ja: '高所精密組立：防振鋼構造フレーム上に高さ12メートルの集塵タワー上部ユニットをドッキング。', zh: '高空精准拼装：高达12米的室外除尘塔上部箱体结构精准吊装至减振钢结构底座之上。' }
      },
      {
        phase: { de: 'Phase 9: Umzug Hammerkopffertigung', en: 'Phase 9: Hammerhead Relocation', ja: '第9フェーズ：ハンマーヘッド製造部門の移転', zh: '第九阶段：弦槌制造核心工序搬迁' },
        title: { de: 'Umzug der Hammerkopf-Manufaktur', en: 'Relocation of Hammerhead Workshop', ja: 'ハンマーヘッド専門マニュファクチュールの移転', zh: '核心弦槌制造工坊正式迁入' },
        caption: { de: 'Das akustische Herzstück von Renner bezieht seinen neuen, klimastabilen Fertigungsbereich in Meuselwitz.', en: 'The acoustic soul of Louis Renner settles into its new, climate-controlled manufacturing area in Meuselwitz.', ja: 'ルイス・レンナーの音響の魂であるハンマーヘッド製造が、モイゼルヴィッツの恒温恒湿新フロアへと移転。', zh: '雷诺钢琴声学的传奇灵魂——弦槌制造车间正式进驻莫伊瑟尔维茨全新恒温恒湿专属生产区。' }
      },
      {
        phase: { de: 'Phase 10: Montage der Großfilteranlage', en: 'Phase 10: Industrial Filter Assembly', ja: '第10フェーズ：大型集塵設備の据付組立', zh: '第十阶段：大型集尘过滤总成安装' },
        title: { de: 'Montage der Großfilter- & Absauganlage', en: 'Assembly of 120,000 m³/h Filter Plant', ja: '120,000 m³/h 大型集塵プラントの組み立て', zh: '每小时12万立方米大型集尘净化塔吊装' },
        caption: { de: 'Mit 120.000 m³/h Luftleistung garantiert die neu errichtete Filteranlage staubfreie, hochpräzise Fertigungsprozesse.', en: 'With a 120,000 m³/h air capacity, the newly erected plant guarantees dust-free, micrometer-precise production.', ja: '毎時12万m³の給排気循環能力を誇る新設大型フィルタープラントが最高精度の製造を実現。', zh: '高达120,000 m³/h超强换气集尘能力，全天候保障车间无微尘干扰的微米级加工质量。' }
      },
      {
        phase: { de: 'Phase 11: Hallenverrohrung & Trassenbau', en: 'Phase 11: Ductwork & Overhead Trusses', ja: '第11フェーズ：大口径配管ダクトと天井トラス', zh: '第十一阶段：车间集尘管道与管廊架设' },
        title: { de: 'Absaugtrassen & Hallenverrohrung', en: 'Extraction Trusses & Hall Ductwork', ja: '天井集塵ダクト配管網とパイプライン敷設', zh: '负压集尘管网全线贯通与管桥布设' },
        caption: { de: 'Installation der großdimensionierten Rohrtrassen zur lückenlosen Absaugung aller Holzbearbeitungsmaschinen.', en: 'Installation of large-diameter overhead ductwork for continuous dust extraction across all woodworking machines.', ja: 'すべての木工加工機に直結する大口径スチールパイプラインの天井敷設により確実な集塵経路を確立。', zh: '安装全厂大口径集尘镀锌管道与高空管廊，实现全系列高精木材加工机床的闭环负压吸尘。' }
      },
      {
        phase: { de: 'Phase 12: Dachzentrale & Klimatechnik', en: 'Phase 12: Rooftop HVAC & Climate Plant', ja: '第12フェーズ：屋上空調プラント完成', zh: '第十二阶段：屋顶大型工艺气调机房' },
        title: { de: 'Dachzentrale: Prozessluft & Klimatechnik', en: 'Rooftop Plant: Process Air & HVAC', ja: '屋上プロセス空調・温湿度管理センター', zh: '屋顶中央工艺送风与恒温恒湿机房' },
        caption: { de: 'Perfekte Klimastabilität: Garantierte 45–50 % relative Luftfeuchte und konstante Temperaturen – sommers wie winters.', en: 'Flawless climate stability: guaranteed 45–50% relative humidity and steady temperatures year-round.', ja: '完璧な気候安定性：通年で湿度45〜50%・一定温度を完全保証する精密プロセス空調。', zh: '极致环境控制：全天候恒定确保45-50%相对湿度与微差恒温。' }
      },
      {
        phase: { de: 'Phase 13: Prozessluft- & Klimaanlage', en: 'Phase 13: Process Air & Air Conditioning', ja: '第13フェーズ：プロセス空調・大型空調設備', zh: '第十三阶段：工艺气调与恒温恒湿空调机组' },
        title: { de: 'Prozessluft- und Klimaanlage', en: 'Process Air & Air Conditioning System', ja: 'プロセス給気・精密空調システム', zh: '工艺送风与恒温恒湿空调系统' },
        caption: { de: 'Hocheffiziente Prozessluft- und Klimatechnik auf dem Werksdach für anspruchsvollste Holz- und Filzverarbeitung.', en: 'High-efficiency rooftop process air and climate control systems for demanding wood and felt fabrication.', ja: '屋上に設置された高効率プロセス空調システム：音響木材と精密フェルト加工に不可欠な環境を実現。', zh: '屋顶高能效中央工艺送风与恒温恒湿空调系统：为精细木料与羊毛毡加工提供稳定保障。' }
      },
      {
        phase: { de: 'Phase 14: Kehlerei & Vollbetrieb Meuselwitz', en: 'Phase 14: Molding Shop & Full Operation', ja: '第14フェーズ：木型成形部門の統合と全面稼働', zh: '第十四阶段：开槽成型车间搬迁与全面达产' },
        title: { de: 'Montage der Kehlerei & Vollendung', en: 'Molding Line Setup & Full Commissioning', ja: '伝統の溝彫り・木型成形部門の据付と統合完了', zh: '精细开槽车间安装就位与新总部全面达产' },
        caption: { de: 'Letzte Abteilung erfolgreich verlagert: Die gesamte Holz- und Mechanikfertigung produziert nun vereint in Meuselwitz.', en: 'Final department successfully relocated: the entire wood and action fabrication now operates united in Meuselwitz.', ja: '最終部門が移転完了：木工・アクション全工程がモイゼルヴィッツ新本社で一体稼働。', zh: '最后一支核心技术部门顺利迁入：全套木工与击弦机制造产线在莫伊瑟尔维茨全面投产运营。' }
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
    this.activeBuffer = 'main'; // 'main' (#diorama-main-img) or 'flip' (#diorama-flip-img)
    this.stageNextTimer = null;
    this.droneDecoderPrimed = false;
    this.dronePreStarted = false;
    this.decodedImages = [];
  }

  init() {
    this.preloadImages();

    const playBtn = document.getElementById('build-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
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

    const droneBtn = document.getElementById('build-drone-btn');
    if (droneBtn) {
      droneBtn.addEventListener('click', () => {
        if (this.inDroneMode) {
          this.startFlipbook(0);
        } else {
          this.startDroneVideo();
        }
      });
    }

    const replayBtn = document.getElementById('diorama-replay-flipbook-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        this.startFlipbook(0);
      });
    }

    const prevBtn = document.getElementById('build-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.inDroneMode) {
          this.exitDroneVideo(this.totalFrames - 1);
          return;
        }
        this.pauseFlipbook();
        if (this.currentFrame > 0) {
          this.renderFrame(this.currentFrame - 1, true);
        } else if (window.presentation && typeof window.presentation.prevSlide === 'function') {
          window.presentation.prevSlide();
        }
      });
    }

    const nextBtn = document.getElementById('build-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!this.inDroneMode) {
          this.startDroneVideo();
        } else if (window.presentation && typeof window.presentation.goToSlide === 'function') {
          this.pause();
          window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
        }
      });
    }

    // Scrubber ticks & month markers
    document.querySelectorAll('.diorama-tick[data-frame]').forEach(tick => {
      tick.addEventListener('click', () => {
        const fIdx = parseInt(tick.getAttribute('data-frame'), 10);
        if (!isNaN(fIdx)) {
          this.pauseFlipbook();
          this.exitDroneVideo(fIdx);
        }
      });
    });

    const dronePill = document.getElementById('diorama-scrubber-drone');
    if (dronePill) {
      dronePill.addEventListener('click', () => {
        this.startDroneVideo();
      });
    }

    // Also pause drone video if Slide 4 loses .active class
    const slide4 = document.querySelector('.slide[data-slide="4"]');
    if (slide4) {
      const obs = new MutationObserver(() => {
        if (!slide4.classList.contains('active')) {
          this.pause();
        }
      });
      obs.observe(slide4, { attributes: true, attributeFilter: ['class'] });
    }

    this.renderFrame(0, false);
  }

  preloadImages() {
    // Preload and GPU-decode all 46 Full-HD photos sequentially & concurrently for zero decode stutter
    this.decodedImages = this.frames.map(f => {
      const img = new Image();
      img.decoding = 'async';
      img.src = f.src;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
      return img;
    });
  }

  warmUpDroneVideo() {
    const droneVid = document.getElementById('diorama-drone-video');
    if (!droneVid) return;

    droneVid.preload = 'auto';
    if (droneVid.readyState === 0) {
      try { droneVid.load(); } catch (e) {}
    }

    // Prime the hardware HEVC decoder while the 46 images are running so play() has 0ms latency
    const primeDecoder = () => {
      if (this.droneDecoderPrimed || this.inDroneMode) return;
      this.droneDecoderPrimed = true;
      const prevMuted = droneVid.muted;
      droneVid.muted = true;
      const p = droneVid.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          setTimeout(() => {
            if (!this.inDroneMode && !this.dronePreStarted) {
              try {
                droneVid.pause();
                droneVid.currentTime = 0.001;
                droneVid.muted = prevMuted;
              } catch (e) {}
            }
          }, 45);
        }).catch(() => {
          droneVid.muted = prevMuted;
        });
      }
    };

    if (droneVid.readyState >= 3) {
      primeDecoder();
    } else {
      droneVid.addEventListener('canplay', primeDecoder, { once: true });
    }
  }

  preStartDronePlayback() {
    if (this.dronePreStarted || this.inDroneMode) return;
    this.dronePreStarted = true;
    const droneVid = document.getElementById('diorama-drone-video');
    if (droneVid) {
      try {
        droneVid.muted = false;
        if (droneVid.currentTime > 0.2) {
          droneVid.currentTime = 0;
        }
        const p = droneVid.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            droneVid.muted = true;
            droneVid.play().catch(() => {});
          });
        }
      } catch (e) {}
    }
  }

  renderFrame(index, animateFlip = true) {
    const clamped = Math.max(0, Math.min(this.totalFrames - 1, index));
    const prevIdx = this.currentFrame;
    this.currentFrame = clamped;
    this.currentMilestone = clamped;

    const cur = this.frames[clamped];
    const prev = this.frames[Math.max(0, clamped - 1)];
    const next1 = this.frames[Math.min(this.totalFrames - 1, clamped + 1)];
    const next2 = this.frames[Math.min(this.totalFrames - 1, clamped + 2)];
    const phaseObj = this.phases[cur.phaseIdx] || this.phases[0];
    const lang = this.currentLang;

    // Check if we are in the final 4 accelerating images (indices 42, 43, 44, 45)
    const isFinalFour = clamped >= this.totalFrames - 4;
    const finalFourStep = isFinalFour ? (clamped - (this.totalFrames - 4) + 1) : 0; // 1, 2, 3, 4

    // Pre-start the already warmed-up Drone Video on step 3 of the final 4 (~240ms before transition)
    if (finalFourStep >= 3 && this.isPlayingFlipbook) {
      this.preStartDronePlayback();
    }

    const photoFrame = document.getElementById('diorama-photo-frame');
    if (photoFrame) {
      if (isFinalFour && this.isPlayingFlipbook) {
        photoFrame.setAttribute('data-bloom', String(finalFourStep));
      } else {
        photoFrame.removeAttribute('data-bloom');
      }
    }

    const brightFlash = document.getElementById('diorama-bright-flash');
    if (brightFlash) {
      if (isFinalFour && this.isPlayingFlipbook) {
        brightFlash.setAttribute('data-bloom', String(finalFourStep));
      } else if (!this.inDroneMode) {
        brightFlash.removeAttribute('data-bloom');
      }
    }

    // 1. True Double-Buffered GPU Crossfade between #diorama-main-img and #diorama-flip-img
    const mainImg = document.getElementById('diorama-main-img');
    const flipImg = document.getElementById('diorama-flip-img');

    if (this.stageNextTimer) {
      clearTimeout(this.stageNextTimer);
      this.stageNextTimer = null;
    }

    if (mainImg && flipImg) {
      if (!animateFlip || prevIdx === clamped) {
        this.activeBuffer = 'main';
        mainImg.src = cur.src;
        mainImg.classList.add('is-visible');
        flipImg.classList.remove('is-visible');
        // Stage next frame into hidden buffer B immediately so it is pre-decoded before next tick
        flipImg.src = next1.src;
        if (typeof flipImg.decode === 'function') flipImg.decode().catch(() => {});
      } else {
        const incoming = this.activeBuffer === 'main' ? flipImg : mainImg;
        const outgoing = this.activeBuffer === 'main' ? mainImg : flipImg;
        this.activeBuffer = this.activeBuffer === 'main' ? 'flip' : 'main';

        // Only update incoming.src if it wasn't already pre-staged to cur.src
        if (!incoming.getAttribute('src') || !incoming.getAttribute('src').endsWith(cur.src)) {
          incoming.src = cur.src;
        }
        incoming.classList.add('is-visible');
        outgoing.classList.remove('is-visible');

        // After the crossfade settles, stage next1.src onto the now-hidden outgoing buffer
        const stageDelay = isFinalFour ? 95 : 260;
        this.stageNextTimer = setTimeout(() => {
          if (outgoing && !outgoing.classList.contains('is-visible')) {
            outgoing.src = next1.src;
            if (typeof outgoing.decode === 'function') outgoing.decode().catch(() => {});
          }
        }, stageDelay);
      }
    }

    // 2. Update 3D Diorama Stack / Wings
    const back1Img = document.getElementById('diorama-back1-img');
    const back2Img = document.getElementById('diorama-back2-img');
    const wingLeftImg = document.getElementById('diorama-wing-left-img');
    const wingRightImg = document.getElementById('diorama-wing-right-img');

    if (back1Img) back1Img.src = next1.src;
    if (back2Img) back2Img.src = next2.src;
    if (wingLeftImg) wingLeftImg.src = prev.src;
    if (wingRightImg) wingRightImg.src = next1.src;

    // 3. Update Watermark, Badges & Caption Bar
    const wm = document.getElementById('diorama-watermark');
    if (wm) wm.textContent = cur.monthYear;

    const dateBadge = document.getElementById('diorama-date-badge');
    if (dateBadge) dateBadge.textContent = `📅 ${cur.dateStr}`;

    const frameBadge = document.getElementById('diorama-frame-badge');
    if (frameBadge) {
      const lbl = lang === 'de' ? 'Bild' : lang === 'en' ? 'Frame' : lang === 'ja' ? '写真' : '画面';
      frameBadge.textContent = `${lbl} ${String(clamped + 1).padStart(2, '0')} / ${this.totalFrames}`;
    }

    const phaseBadge = document.getElementById('diorama-phase-badge');
    if (phaseBadge) phaseBadge.textContent = phaseObj.phase[lang] || phaseObj.phase.de;

    const titleEl = document.getElementById('diorama-phase-title');
    if (titleEl) titleEl.textContent = phaseObj.title[lang] || phaseObj.title.de;

    const capEl = document.getElementById('diorama-phase-caption');
    if (capEl) capEl.textContent = phaseObj.caption[lang] || phaseObj.caption.de;

    // 4. Update Header Counter & Scrubber Progress
    const counterBadge = document.getElementById('build-step-counter');
    if (counterBadge) {
      counterBadge.textContent = `${cur.monthYear} • ${String(clamped + 1).padStart(2, '0')} / ${this.totalFrames}`;
    }

    const pct = ((clamped + 1) / this.totalFrames) * 100;
    const progFill = document.getElementById('diorama-progress-fill');
    if (progFill) progFill.style.width = `${pct.toFixed(1)}%`;

    const playProg = document.getElementById('build-play-progress');
    if (playProg) playProg.style.width = `${pct.toFixed(1)}%`;

    document.querySelectorAll('.diorama-tick[data-frame]').forEach(tick => {
      const fIdx = parseInt(tick.getAttribute('data-frame'), 10);
      tick.classList.toggle('is-passed', fIdx <= clamped);
      tick.classList.toggle('is-current', fIdx === clamped);
    });

    this.updateHeaderButtons();
  }

  startFlipbook(startIndex = 0) {
    this.clearFlipTimer();
    this.isStarted = true;
    this.inDroneMode = false;
    this.isPlayingFlipbook = true;
    this.dronePreStarted = false;

    const container = document.getElementById('build-timeline-container');
    if (container) {
      container.classList.remove('is-dark-start', 'is-drone-mode');
    }

    const brightFlash = document.getElementById('diorama-bright-flash');
    if (brightFlash) brightFlash.removeAttribute('data-bloom');

    const droneStage = document.getElementById('diorama-drone-stage');
    if (droneStage) droneStage.classList.remove('is-active');

    const droneVid = document.getElementById('diorama-drone-video');
    if (droneVid) {
      try {
        droneVid.pause();
        droneVid.currentTime = 0.001;
      } catch (e) {}
    }

    const dronePill = document.getElementById('diorama-scrubber-drone');
    if (dronePill) dronePill.classList.remove('active');

    // Utilize the 21-second flipbook playback window to buffer and warm up the Drone Video decoder
    this.warmUpDroneVideo();

    this.renderFrame(startIndex, false);
    this.scheduleNextFlip();
    this.updateHeaderButtons();
  }

  scheduleNextFlip() {
    if (!this.isPlayingFlipbook) return;

    // 0.5 seconds (500ms) per image for images 1..42, then accelerating on the last 4 images (indices 42, 43, 44, 45)
    let delay = 500;
    const remainingFromStartOfFinalFour = this.currentFrame - (this.totalFrames - 4);
    if (remainingFromStartOfFinalFour === 0) {
      delay = 310; // 4th from last (#43)
    } else if (remainingFromStartOfFinalFour === 1) {
      delay = 210; // 3rd from last (#44)
    } else if (remainingFromStartOfFinalFour === 2) {
      delay = 140; // 2nd from last (#45)
    } else if (remainingFromStartOfFinalFour >= 3) {
      delay = 100; // Final image (#46) -> immediate luminous flash into Drone Flight!
    }

    this.flipTimer = setTimeout(() => {
      if (!this.isPlayingFlipbook) return;
      if (this.currentFrame < this.totalFrames - 1) {
        this.renderFrame(this.currentFrame + 1, true);
        this.scheduleNextFlip();
      } else {
        // Reached the 4th final image (#46) -> emerge directly from the bright flash into the Drone Flight!
        this.isPlayingFlipbook = false;
        this.startDroneVideo(true);
      }
    }, delay);
  }

  pauseFlipbook() {
    this.isPlayingFlipbook = false;
    this.clearFlipTimer();
    this.updateHeaderButtons();
  }

  clearFlipTimer() {
    if (this.flipTimer) {
      clearTimeout(this.flipTimer);
      this.flipTimer = null;
    }
    if (this.stageNextTimer) {
      clearTimeout(this.stageNextTimer);
      this.stageNextTimer = null;
    }
  }

  startDroneVideo(fromBrightFlash = false) {
    this.pauseFlipbook();
    this.isStarted = true;
    this.inDroneMode = true;

    const brightFlash = document.getElementById('diorama-bright-flash');
    if (brightFlash) {
      if (fromBrightFlash) {
        brightFlash.setAttribute('data-bloom', 'peak');
        setTimeout(() => {
          if (brightFlash.getAttribute('data-bloom') === 'peak') {
            brightFlash.setAttribute('data-bloom', 'dissolve');
          }
        }, 70);
        setTimeout(() => {
          if (brightFlash.getAttribute('data-bloom') === 'dissolve') {
            brightFlash.removeAttribute('data-bloom');
          }
        }, 900);
      } else {
        brightFlash.removeAttribute('data-bloom');
      }
    }

    const container = document.getElementById('build-timeline-container');
    if (container) {
      container.classList.remove('is-dark-start');
      container.classList.add('is-drone-mode');
    }

    const wm = document.getElementById('diorama-watermark');
    if (wm) wm.textContent = '2026';

    const droneStage = document.getElementById('diorama-drone-stage');
    if (droneStage) droneStage.classList.add('is-active');

    const dronePill = document.getElementById('diorama-scrubber-drone');
    if (dronePill) dronePill.classList.add('active');

    const progFill = document.getElementById('diorama-progress-fill');
    if (progFill) progFill.style.width = '100%';

    const counterBadge = document.getElementById('build-step-counter');
    if (counterBadge) {
      counterBadge.textContent = this.currentLang === 'de' ? '🎬 Drohnenflug Meuselwitz' :
                                 this.currentLang === 'en' ? '🎬 Drone Flight Meuselwitz' :
                                 this.currentLang === 'ja' ? '🎬 ドローン映像' : '🎬 莫伊瑟尔维茨无人机航拍';
    }

    const droneVid = document.getElementById('diorama-drone-video');
    if (droneVid) {
      try {
        // If preStartDronePlayback() already started the video during the last 2 frames, keep it rolling seamlessly!
        if (droneVid.paused) {
          if (!fromBrightFlash) droneVid.currentTime = 0;
          const p = droneVid.play();
          if (p && typeof p.catch === 'function') {
            p.catch(() => {
              droneVid.muted = true;
              droneVid.play().catch(() => {});
            });
          }
        }
      } catch (e) {}
    }

    this.updateHeaderButtons();
  }

  exitDroneVideo(targetFrame = 0) {
    this.inDroneMode = false;
    const container = document.getElementById('build-timeline-container');
    if (container) container.classList.remove('is-drone-mode');

    const brightFlash = document.getElementById('diorama-bright-flash');
    if (brightFlash) brightFlash.removeAttribute('data-bloom');

    const photoFrame = document.getElementById('diorama-photo-frame');
    if (photoFrame) photoFrame.removeAttribute('data-bloom');

    const droneStage = document.getElementById('diorama-drone-stage');
    if (droneStage) droneStage.classList.remove('is-active');

    const dronePill = document.getElementById('diorama-scrubber-drone');
    if (dronePill) dronePill.classList.remove('active');

    const droneVid = document.getElementById('diorama-drone-video');
    if (droneVid) {
      try { droneVid.pause(); } catch (e) {}
    }

    this.renderFrame(targetFrame, false);
  }

  updateHeaderButtons() {
    const lang = this.currentLang;
    const playBtn = document.getElementById('build-play-btn');
    const playIcon = document.getElementById('build-play-icon');
    const playLabel = document.getElementById('build-play-label');
    const nextLabel = document.getElementById('build-next-label');
    const prevBtn = document.getElementById('build-prev-btn');

    if (prevBtn) {
      prevBtn.disabled = false;
    }

    if (playBtn) {
      playBtn.classList.toggle('playing', this.isPlayingFlipbook);
    }
    if (playIcon) {
      playIcon.textContent = this.isPlayingFlipbook ? '❚❚' : '▶';
    }
    if (playLabel) {
      if (this.isPlayingFlipbook) {
        playLabel.textContent = lang === 'de' ? 'Pause' : lang === 'en' ? 'Pause' : lang === 'ja' ? '一時停止' : '暂停';
      } else {
        playLabel.textContent = lang === 'de' ? 'Daumenkino starten' :
                                lang === 'en' ? 'Play Flipbook' :
                                lang === 'ja' ? 'パラパラ映像再生' : '播放翻页动画';
      }
    }

    if (nextLabel) {
      if (this.inDroneMode) {
        nextLabel.textContent = lang === 'de' ? 'Nächste Folie' :
                                lang === 'en' ? 'Next Slide' :
                                lang === 'ja' ? '次のスライド' : '下一页';
      } else {
        nextLabel.textContent = lang === 'de' ? 'Drohnenflug' :
                                lang === 'en' ? 'Drone Flight' :
                                lang === 'ja' ? 'ドローン映像へ' : '无人机航拍';
      }
    }
  }

  // Compatibility hooks called by js/presentation.js
  resetToDarkState() {
    this.pause();
    this.isStarted = false;
    this.inDroneMode = false;
    this.renderFrame(0, false);
  }

  startJourney() {
    this.startFlipbook(0);
  }

  goToMilestone(index) {
    if (index >= this.totalFrames - 1) {
      this.startDroneVideo();
    } else {
      this.exitDroneVideo(index);
    }
  }

  nextEra() {
    // If flipbook is still running or showing photos, Right Arrow jumps to the Drone Flight video first
    if (!this.inDroneMode) {
      this.startDroneVideo();
      return true;
    }
    // If already in Drone Flight mode, Right Arrow advances to Slide 5
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
    const droneVid = document.getElementById('diorama-drone-video');
    if (droneVid && !droneVid.paused) {
      try { droneVid.pause(); } catch (e) {}
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    const droneBadge = document.getElementById('diorama-drone-badge');
    if (droneBadge) {
      droneBadge.textContent = lang === 'de' ? '>DROHNENFLUG INNEN • WERK MEUSELWITZ (2026)' :
                               lang === 'en' ? '>INTERIOR DRONE FLIGHT • MEUSELWITZ PLANT (2026)' :
                               lang === 'ja' ? '>工場内部ドローン映像 • モイゼルヴィッツ（2026）' :
                               '>莫伊瑟尔维茨新工厂内部无人机航拍 (2026)';
    }
    const replayBtn = document.getElementById('diorama-replay-flipbook-btn');
    if (replayBtn) {
      replayBtn.textContent = lang === 'de' ? '↺ Daumenkino wiederholen' :
                              lang === 'en' ? '↺ Replay Flipbook' :
                              lang === 'ja' ? '↺ パラパラ映像を再生' :
                              '↺ 重播翻页纪实';
    }
    if (this.inDroneMode) {
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
