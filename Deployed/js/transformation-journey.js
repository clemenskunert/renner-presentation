/**
 * Louis Renner Presentation - Interactive Baudokumentation Meuselwitz (Transformation Timeline)
 * Features:
 * - Exact same harmonic wave comet & light sphere flight animation as Slide 3
 * - Doubled stardust particle density in the comet's wake
 * - Branching light ray connecting to the milestone photo card
 * - Image-focused card (Photo-Focus) with elegant bottom caption pill
 * - Monats- & Jahreszahl-Wasserzeichen (11.2025 – 10.2026) mit 12s pulsierendem Leuchten
 * - 4-Language Localization: DE, EN, JA, ZH
 * - Keyboard navigation (Left / Right / Space) & Autoplay Documentary mode
 */

class RennerTransformationJourney {
  constructor() {
    this.currentMilestone = 0;
    this.currentLang = 'de';
    this.totalMilestones = 14;
    this.isAutoplay = false;
    this.autoplayDuration = 3000; // Zügigere Dokumentar-Taktung (3.0s pro Bauphase)
    this.autoplayStartTime = null;
    this.autoplayRaf = null;
    this.animationTimeouts = [];
    this.isStarted = false;

    this.milestonesData = [
      {
        id: '2025-11',
        monthYear: '11.2025',
        branch: 'up',
        phase: {
          de: 'Phase 1: Hallenvorbereitung & Entkernung',
          en: 'Phase 1: Hall Preparation & Gutting',
          ja: '第1フェーズ：工場棟整備と解体',
          zh: '第一阶段：车间整备与结构拆除'
        },
        title: {
          de: 'Start Bauvorhaben: Entkernung',
          en: 'Project Kickoff: Site Gutting',
          ja: '建設開始：内部解体工事',
          zh: '工程启动：内部腾退拆除'
        },
        caption: {
          de: 'Freilegung der tragenden Hallenstrukturen im Bereich des künftigen Verwaltungs- und Empfangstrakts.',
          en: 'Gutting and structural preparation of core hall lines for the future administration and reception wing.',
          ja: '新管理棟・レセプションエリアの将来レイアウトに合わせた工場躯体構造の露出と解体工事。',
          zh: '拆除腾退未来行政与接待大厅区域，清理裸露厂房核心承重承力结构。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/01_20251103_152224.jpg'
      },
      {
        id: '2025-12',
        monthYear: '12.2025',
        branch: 'down',
        phase: {
          de: 'Phase 2: Entkernung Foyer & Baufeld',
          en: 'Phase 2: Foyer Demolition & Clearing',
          ja: '第2フェーズ：エントランス解体と整地',
          zh: '第二阶段：门厅拆除与施工面腾退'
        },
        title: {
          de: 'Entkernung des Foyers & Eingangsbereichs',
          en: 'Foyer & Entrance Area Demolition',
          ja: 'エントランスロビーと玄関エリアの解体',
          zh: '主门厅与迎宾大堂空间拆除'
        },
        caption: {
          de: 'Blick vom Foyer in Richtung Filzproduktion: Freigeräumte Großflächen für die neue Manufaktur-Infrastruktur.',
          en: 'View from the foyer toward felt production: cleared large-scale areas for the new manufacturing infrastructure.',
          ja: 'ロビーからフェルト製造エリアを望む：新製造インフラを迎えるために完全にクリアされた広大なフロア。',
          zh: '由前厅眺望羊毛毡生产区：为全新精密工坊基础设施彻底腾退开阔作业空间。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/14_20251201_135805.jpg'
      },
      {
        id: '2026-01',
        monthYear: '01.2026',
        branch: 'up',
        phase: {
          de: 'Phase 3: Tiefbau & Medienversorgung',
          en: 'Phase 3: Utilities & Groundwork',
          ja: '第3フェーズ：配管・インフラ土木工事',
          zh: '第三阶段：深基管网与公用工程'
        },
        title: {
          de: 'Medien- & Trinkwasserversorgung',
          en: 'Utilities & Fresh Water Supply',
          ja: '給排水・ユーティリティ配管網',
          zh: '给排水与综合管网系统施工'
        },
        caption: {
          de: 'Präzise Schachtarbeiten für Frisch- und Brauchwasserleitungen – unterbrechungsfrei bei laufender Produktion.',
          en: 'Precision trenching for fresh and industrial water lines – conducted seamlessly without disrupting ongoing production.',
          ja: '稼働中ラインを一切停止することなく実施された、給排水・産業用水配管の高精度掘削工事。',
          zh: '给水与工业用水管路高精度开槽施工——在原有正常生产不停歇前提下无缝实施。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/18_20260106_135356.jpg'
      },
      {
        id: '2026-02',
        monthYear: '02.2026',
        branch: 'down',
        phase: {
          de: 'Phase 4: Klaviermechanik-Aufbau',
          en: 'Phase 4: Action Assembly Line Setup',
          ja: '第4フェーズ：ピアノアクション製造ライン構築',
          zh: '第四阶段：立式击弦机总装线搭建'
        },
        title: {
          de: 'Aufbau der Klaviermechanik-Fertigung',
          en: 'Upright Action Assembly Installation',
          ja: 'アップライトアクション製造ラインの設置',
          zh: '立式钢琴击弦机制造产线组装'
        },
        caption: {
          de: 'Frühere Lagerflächen werden zur hochmodernen Fertigungsstraße für Klavier-Hebeglieder umgebaut.',
          en: 'Former warehouse areas are transformed into a state-of-the-art production line for upright piano wippens.',
          ja: '旧倉庫エリアを高精度なピアノアクション・ヒッカケ（ウィッペン）専用の最新製造ラインへ全面転換。',
          zh: '原仓储空间全面重塑，打造为高精立式钢琴联动杆（Wippen）自动化组装产线。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/23_20260227_074933.jpg'
      },
      {
        id: '2026-03',
        monthYear: '03.2026',
        branch: 'up',
        phase: {
          de: 'Phase 5: Moderne Lagerlogistik',
          en: 'Phase 5: Modern Warehouse Logistics',
          ja: '第5フェーズ：先進スマート倉庫物流',
          zh: '第五阶段：现代智能立体仓储'
        },
        title: {
          de: 'Intelligente Lagerlogistik & Lagerlifte',
          en: 'Smart Storage Logistics & Vertical Lifts',
          ja: 'インテリジェント自動倉庫タワー導入',
          zh: '智能物流与垂直升降立体仓储塔'
        },
        caption: {
          de: 'Maximale Flächeneffizienz: Installation moderner vertikaler Shuttle-Lagerlifte für zehntausende Bauteile.',
          en: 'Maximum space efficiency: installation of automated vertical shuttle towers storing tens of thousands of precision components.',
          ja: '最大のフロア効率：数万点に及ぶ精密部品を立体保管する最新型垂直自動シャトルタワーの導入。',
          zh: '极大化坪效利用：部署多座现代化垂直升降式穿梭料仓，高密度存取数万种精密部件。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/25_20260320_090128.jpg'
      },
      {
        id: '2026-04',
        monthYear: '04.2026',
        branch: 'down',
        phase: {
          de: 'Phase 6: Umzug Hammerkopffertigung',
          en: 'Phase 6: Hammerhead Relocation',
          ja: '第6フェーズ：ハンマーヘッド製造部門の移転',
          zh: '第六阶段：弦槌制造核心工序搬迁'
        },
        title: {
          de: 'Umzug der Hammerkopf-Manufaktur',
          en: 'Relocation of Hammerhead Workshop',
          ja: 'ハンマーヘッド専門マニュファクチュールの移転',
          zh: '核心弦槌制造工坊正式迁入'
        },
        caption: {
          de: 'Das akustische Herzstück von Renner bezieht seinen neuen, klimastabilen Fertigungsbereich in Meuselwitz.',
          en: 'The acoustic soul of Louis Renner settles into its new, climate-controlled manufacturing area in Meuselwitz.',
          ja: 'ルイス・レンナーの音響の魂であるハンマーヘッド製造が、モイゼルヴィッツの恒温恒湿新フロアへと移転。',
          zh: '雷诺钢琴声学的传奇灵魂——弦槌制造车间正式进驻莫伊瑟尔维茨全新恒温恒湿专属生产区。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/34_20260521_144701.jpg'
      },
      {
        id: '2026-05-fundament',
        monthYear: '05.2026',
        branch: 'up',
        phase: {
          de: 'Phase 7: Fundamente Absauganlage',
          en: 'Phase 7: Filtration System Foundation',
          ja: '第7フェーズ：大型集塵設備専用基礎工事',
          zh: '第七阶段：除尘过滤机组基坑工程'
        },
        title: {
          de: 'Spezialfundament für die Filteranlage',
          en: 'Reinforced Foundation for Filter System',
          ja: '大型集塵プラント専用の高強度耐荷重基礎',
          zh: '超大型除尘净化机组专属承重基础'
        },
        caption: {
          de: 'Statische Hochpräzision: Fundamentierung für die 40 Tonnen schwere und 12 Meter hohe zentrale Absauganlage.',
          en: 'Structural heavy-duty engineering: foundation concrete for the 40-ton, 12-meter-tall central filtration plant.',
          ja: '静的精密設計：総重量40トン・高さ12メートルの超大型中央集塵プラントを支える専用高剛性基礎。',
          zh: '结构高承重基础工程：为重达40吨、高12米的室外大型工业除尘过滤系统打造抗震隔振基坑。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/27_20260428_083959.jpg'
      },
      {
        id: '2026-05-kranhub',
        monthYear: '05.2026',
        branch: 'down',
        phase: {
          de: 'Phase 8: Kranhub der Filtermodule',
          en: 'Phase 8: Crane Lift of Filter Modules',
          ja: '第8フェーズ：集塵モジュールのクレーン吊り上げ',
          zh: '第八阶段：除尘过滤模块起重机精准吊装'
        },
        title: {
          de: 'Anlieferung & Kranhub der Filtermodule',
          en: 'Delivery & Crane Lift of Filter Modules',
          ja: '大型集塵モジュールの搬入とクレーン吊り上げ',
          zh: '除尘模块重载运输与特种起重机吊装'
        },
        caption: {
          de: 'Schwerlast-Logistik per 70-Tonnen-Autokran: Millimetergenaue Positionierung der tonnenschweren Filterkomponenten.',
          en: 'Heavy-duty logistics with a 70-ton mobile crane: millimeter-accurate positioning of multi-ton filtration components.',
          ja: '70トン大型クレーンによる重量物物流：数トンの大型フィルターコンポーネントをミリ単位で位置合わせ。',
          zh: '70吨全地面起重机特种重载作业：将重达数吨的除尘过滤核心组件进行毫米级高精定位。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/31_20260512_113224.mp4'
      },
      {
        id: '2026-05-kranmontage',
        monthYear: '05.2026',
        branch: 'up',
        phase: {
          de: 'Phase 9: Kranmontage des Filterturms',
          en: 'Phase 9: Crane Assembly of Filter Tower',
          ja: '第9フェーズ：集塵タワーのクレーン据付組立',
          zh: '第九阶段：除尘塔上部箱体高空精准拼装'
        },
        title: {
          de: 'Kranmontage des Filterturms',
          en: 'Crane Assembly of Filter Tower',
          ja: '集塵タワー上部ユニットのクレーン組立て',
          zh: '除尘过滤塔箱体结构高空合拢'
        },
        caption: {
          de: 'Präzisionsmontage in luftiger Höhe: Das 12 Meter hohe Filterturm-Oberteil wird auf die schwingungsentkoppelte Stahlkonstruktion gesetzt.',
          en: 'Precision assembly at height: The 12-meter-tall upper filter section is positioned onto the vibration-isolated steel frame.',
          ja: '高所精密組立：防振鋼構造フレーム上に高さ12メートルの集塵タワー上部ユニットをミリ単位でドッキング。',
          zh: '高空精准拼装：高达12米的室外除尘塔上部箱体结构，精准平稳吊装至减振抗震钢结构承重底座之上。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/33_20260513_120405.jpg'
      },
      {
        id: '2026-06',
        monthYear: '06.2026',
        branch: 'down',
        phase: {
          de: 'Phase 10: Montage der Großfilteranlage',
          en: 'Phase 10: Industrial Filter Assembly',
          ja: '第10フェーズ：大型集塵設備の据付組立',
          zh: '第十阶段：大型集尘过滤总成安装'
        },
        title: {
          de: 'Montage der Großfilter- & Absauganlage',
          en: 'Assembly of 120,000 m³/h Filter Plant',
          ja: '120,000 m³/h 大型集塵プラントの組み立て',
          zh: '每小时12万立方米大型集尘净化塔吊装'
        },
        caption: {
          de: 'Mit 120.000 m³/h Luftleistung garantiert die neu errichtete Filteranlage staubfreie, hochpräzise Fertigungsprozesse.',
          en: 'With a 120,000 m³/h air capacity, the newly erected plant guarantees dust-free, micrometer-precise production.',
          ja: '毎時12万m³の給排気循環能力を誇る新設大型フィルタープラントが、微粉塵を排除した最高精度の製造を実現。',
          zh: '高达120,000 m³/h超强换气集尘能力，全天候保障车间无微尘干扰的微米级加工质量。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/36_20260610_075535.jpg'
      },
      {
        id: '2026-07',
        monthYear: '07.2026',
        branch: 'up',
        phase: {
          de: 'Phase 11: Hallenverrohrung & Trassenbau',
          en: 'Phase 11: Ductwork & Overhead Trusses',
          ja: '第11フェーズ：大口径配管ダクトと天井トラス',
          zh: '第十一阶段：车间集尘管道与管廊架设'
        },
        title: {
          de: 'Absaugtrassen & Hallenverrohrung',
          en: 'Extraction Trusses & Hall Ductwork',
          ja: '天井集塵ダクト配管網とパイプライン敷設',
          zh: '负压集尘管网全线贯通与管桥布设'
        },
        caption: {
          de: 'Installation der großdimensionierten Rohrtrassen zur lückenlosen Absaugung aller Holzbearbeitungsmaschinen.',
          en: 'Installation of large-diameter overhead ductwork for continuous dust extraction across all woodworking machines.',
          ja: 'すべての木工加工機に直結する大口径スチールパイプラインの天井敷設により、確実な集塵経路を確立。',
          zh: '安装全厂大口径集尘镀锌管道与高空管廊，实现全系列高精木材加工机床的闭环负压吸尘。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/38_20260708_120853.jpg'
      },
      {
        id: '2026-09',
        monthYear: '09.2026',
        branch: 'down',
        phase: {
          de: 'Phase 12: Dachzentrale & Klimatechnik',
          en: 'Phase 12: Rooftop HVAC & Climate Plant',
          ja: '第12フェーズ：屋上空調プラント完成',
          zh: '第十二阶段：屋顶大型工艺气调机房'
        },
        title: {
          de: 'Dachzentrale: Prozessluft & Klimatechnik',
          en: 'Rooftop Plant: Process Air & HVAC',
          ja: '屋上プロセス空調・温湿度管理センター',
          zh: '屋顶中央工艺送风与恒温恒湿机房'
        },
        caption: {
          de: 'Perfekte Klimastabilität: Garantierte 45–50 % relative Luftfeuchte und konstante Temperaturen – sommers wie winters.',
          en: 'Flawless climate stability: guaranteed 45–50% relative humidity and steady temperatures year-round, winter and summer.',
          ja: '完璧な気候安定性：夏冬を問わず通年で湿度45〜50%・一定温度を完全保証する精密プロセス空調。',
          zh: '极致环境控制：无论严冬酷暑，全天候恒定确保45-50%相对湿度与微差恒温，保障敏感音木与毛毡绝无形变。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/42_20260909_094559.jpg'
      },
      {
        id: '2026-09-klima',
        monthYear: '09.2026',
        branch: 'up',
        phase: {
          de: 'Phase 13: Prozessluft- & Klimaanlage',
          en: 'Phase 13: Process Air & Air Conditioning',
          ja: '第13フェーズ：プロセス空調・大型空調設備',
          zh: '第十三阶段：工艺气调与恒温恒湿空调机组'
        },
        title: {
          de: 'Prozessluft- und Klimaanlage',
          en: 'Process Air & Air Conditioning System',
          ja: 'プロセス給気・精密空調システム',
          zh: '工艺送风与恒温恒湿空调系统'
        },
        caption: {
          de: 'Hocheffiziente Prozessluft- und Klimatechnik auf dem Werksdach: Höchste Klimastabilität für anspruchsvollste Holz- und Filzverarbeitung.',
          en: 'High-efficiency rooftop process air and climate control systems: Ensuring peak atmospheric stability for demanding wood and felt fabrication.',
          ja: '屋上に設置された高効率プロセス空調システム：音響木材と精密フェルト加工に不可欠な極めて安定した温湿度環境を実現。',
          zh: '屋顶高能效中央工艺送风与恒温恒湿空调系统：为精细木料与核心羊毛毡加工提供全天候极致稳定的环境保障。'
        },
        image: 'Visuell/Bilder/02_Meuselwitz_Umbau/44_20260915_133800.jpg'
      },
      {
        id: '2026-10',
        monthYear: '10.2026',
        branch: 'down',
        phase: {
          de: 'Phase 14: Kehlerei & Vollbetrieb Meuselwitz',
          en: 'Phase 14: Molding Shop & Full Operation',
          ja: '第14フェーズ：木型成形部門の統合と全面稼働',
          zh: '第十四阶段：开槽成型车间搬迁与全面达产'
        },
        title: {
          de: 'Montage der Kehlerei & Vollendung',
          en: 'Molding Line Setup & Full Commissioning',
          ja: '伝統の溝彫り・木型成形部門の据付と統合完了',
          zh: '精细开槽车间安装就位与新总部全面达产'
        },
        caption: {
          de: 'Letzte Abteilung erfolgreich verlagert: Die traditionsreiche Kehlerei und die gesamte Holzfertigung produzieren nun in Meuselwitz.',
          en: 'Final department successfully relocated: the traditional molding shop and entire wood fabrication now operate in Meuselwitz.',
          ja: 'ゲルトリンゲンからの最終部門が移転完了：伝統の木型成形（Kehlerei）と木工全工程が新本社で一体稼働。',
          zh: '最后一支核心技术部门顺利迁入：历史悠久的木料成型开槽车间与全套木工制造产线在莫伊瑟尔维茨全面投产运营。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/48_20261009_081342.jpg'
      }
    ];

    this.totalMilestones = this.milestonesData.length;

    this.trailPoints = [];
    this.stardustParticles = [];
    this.canvas = null;
    this.ctx = null;
    this.cometJourneyRaf = null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
  }

  init() {
    this.canvas = document.getElementById('build-trail-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    const playBtn = document.getElementById('build-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    const prevBtn = document.getElementById('build-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.pause();
        const moved = this.prevMilestone();
        if (!moved && window.presentation && typeof window.presentation.prevSlide === 'function') {
          window.presentation.prevSlide();
        }
      });
    }

    const nextBtn = document.getElementById('build-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.pause();
        const moved = this.nextMilestone();
        if (!moved && window.presentation && typeof window.presentation.goToSlide === 'function') {
          window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
        }
      });
    }

    document.querySelectorAll('.photo-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.pause();
        const dir = btn.getAttribute('data-dir');
        if (dir === 'next') {
          const moved = this.nextMilestone();
          if (!moved && window.presentation && typeof window.presentation.goToSlide === 'function') {
            window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
          }
        }
        if (dir === 'prev') {
          const moved = this.prevMilestone();
          if (!moved && window.presentation && typeof window.presentation.prevSlide === 'function') {
            window.presentation.prevSlide();
          }
        }
      });
    });

    this.updateControls(0);
  }

  clearAnimationTimeouts() {
    this.animationTimeouts.forEach(t => clearTimeout(t));
    this.animationTimeouts = [];
  }

  getMilestoneY(index) {
    if (!this.canvasHeight) {
      const container = document.getElementById('build-timeline-container');
      this.canvasHeight = container ? container.clientHeight : 700;
    }
    const data = this.milestonesData[index >= 0 ? index : 0];
    if (!data) return this.canvasHeight * 0.9125;
    return data.branch === 'up' ? (this.canvasHeight * 0.9125) : (this.canvasHeight * 0.0875);
  }

  /* Dynamisches horizontales Zentrum der Heldenkarte (orientiert an der Mitte vom Inhalt) */
  getMilestoneCenterX() {
    const container = document.getElementById('build-timeline-container');
    const width = container ? container.clientWidth : (this.canvasWidth || 1200);
    this.canvasWidth = width;

    let marginRight = 36;
    let cardPadding = 72;
    if (width <= 900) {
      marginRight = 14;
      cardPadding = 28;
    } else if (width <= 1300) {
      marginRight = 24;
      cardPadding = 48;
    }

    const cardWidth = Math.min(1380, width - cardPadding);
    const cardRight = width - marginRight;
    return cardRight - (cardWidth / 2);
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const container = document.getElementById('build-timeline-container');
    this.canvasWidth = container.clientWidth || 1892;
    this.canvasHeight = container.clientHeight || 800;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.canvasWidth * dpr);
    this.canvas.height = Math.round(this.canvasHeight * dpr);
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
    const cometEl = document.getElementById('build-comet-traveler');
    if (cometEl && this.isStarted && cometEl.classList.contains('is-docked')) {
      cometEl.style.left = `${this.getMilestoneCenterX()}px`;
      cometEl.style.top = `${this.getMilestoneY(this.currentMilestone)}px`;
    }
  }

  clearCometTrail() {
    if (this.cometJourneyRaf) {
      cancelAnimationFrame(this.cometJourneyRaf);
      this.cometJourneyRaf = null;
    }
    this.trailPoints = [];
    this.stardustParticles = [];
    if (this.ctx && this.canvasWidth && this.canvasHeight) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  renderCometCanvas(now) {
    if (!this.ctx || !this.canvasWidth || !this.canvasHeight) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Pass 1: Prachtvoller gekrümmter Kometenschweif
    if (this.trailPoints.length > 2) {
      const maxAgeMs = 1400;
      this.trailPoints = this.trailPoints.filter(pt => (now - pt.time) < maxAgeMs);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p1 = this.trailPoints[i];
        const p2 = this.trailPoints[i + 1];
        const ageNorm = (now - p1.time) / maxAgeMs;
        const fade = Math.pow(Math.max(0, 1 - ageNorm), 1.8);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = Math.max(1.5, 24 * fade);
        ctx.strokeStyle = `rgba(200, 163, 86, ${(0.32 * fade).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p1 = this.trailPoints[i];
        const p2 = this.trailPoints[i + 1];
        const ageNorm = (now - p1.time) / maxAgeMs;
        const fade = Math.pow(Math.max(0, 1 - ageNorm), 2.2);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = Math.max(1, 10 * fade);
        ctx.strokeStyle = `rgba(255, 235, 160, ${(0.65 * fade).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p1 = this.trailPoints[i];
        const p2 = this.trailPoints[i + 1];
        const ageNorm = (now - p1.time) / maxAgeMs;
        const fade = Math.pow(Math.max(0, 1 - ageNorm), 3.0);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = Math.max(0.8, 3.0 * fade);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.95 * fade).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      ctx.restore();
    }

    // Pass 4: Feinkörniger Sternenstaub / Micro-Ember Particles (verdoppelt!)
    if (this.stardustParticles.length > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = this.stardustParticles.length - 1; i >= 0; i--) {
        const spark = this.stardustParticles[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          this.stardustParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, Math.max(0.3, spark.size * spark.alpha), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 170, ${spark.alpha.toFixed(3)})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(255, 220, 120, 0.8)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  dissolveCometTrail() {
    const fadeLoop = (now) => {
      this.renderCometCanvas(now);
      if (this.trailPoints.length > 0 || this.stardustParticles.length > 0) {
        this.cometJourneyRaf = requestAnimationFrame(fadeLoop);
      } else {
        if (this.ctx && this.canvasWidth && this.canvasHeight) {
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
        this.cometJourneyRaf = null;
      }
    };
    this.cometJourneyRaf = requestAnimationFrame(fadeLoop);
  }

  resetToDarkState() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = false;
    this.currentMilestone = -1;

    const container = document.getElementById('build-timeline-container');
    if (container) container.classList.add('is-dark-start');

    const cometEl = document.getElementById('build-comet-traveler');
    if (cometEl) {
      cometEl.style.transition = 'none';
      cometEl.style.left = '0px';
      cometEl.style.top = `${this.getMilestoneY(0)}px`;
      cometEl.classList.remove('is-docked', 'is-igniting');
    }

    const branchRay = document.getElementById('build-branch-ray');
    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
    }

    const panTrack = document.getElementById('build-pan-track');
    if (panTrack) {
      panTrack.style.transition = 'none';
      panTrack.style.transform = 'translateX(0%)';
      void panTrack.offsetWidth;
      panTrack.style.transition = 'transform 1.8s cubic-bezier(0.25, 0.9, 0.3, 1)';
    }

    document.querySelectorAll('.build-milestone-panel').forEach(panel => {
      panel.classList.remove('active');
      const card = panel.querySelector('.tree-hero-card');
      if (card) card.classList.remove('is-revealed');
      const pill = panel.querySelector('.tree-counter-pill');
      if (pill) pill.classList.remove('is-revealed');
      const year = panel.querySelector('.tree-watermark-year');
      if (year) year.classList.remove('is-revealed');
      const vids = panel.querySelectorAll('video');
      vids.forEach(v => { try { v.pause(); v.currentTime = 0; } catch(e) {} });
    });

    const counterBadge = document.getElementById('build-step-counter');
    const prevBtn = document.getElementById('build-prev-btn');
    const nextBtn = document.getElementById('build-next-btn');
    const nextLabel = document.getElementById('build-next-label');

    const startLabels = {
      de: '✦ Fotoreise starten',
      en: '✦ Start Photo Journey',
      ja: '✦ フォトジャーニーを開始',
      zh: '✦ 开启建造摄影之旅'
    };
    if (counterBadge) counterBadge.textContent = startLabels[this.currentLang] || startLabels.de;
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.add('highlight');
    }
    if (nextLabel) {
      nextLabel.textContent = this.currentLang === 'de' ? 'Reise starten' :
                              this.currentLang === 'en' ? 'Start Journey' :
                              this.currentLang === 'ja' ? '開始' : '开始';
    }
  }

  startJourney() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = true;
    this.currentMilestone = 0;
    const data = this.milestonesData[0];
    if (!data) return;

    const container = document.getElementById('build-timeline-container');
    if (container) container.classList.remove('is-dark-start');

    const cometEl = document.getElementById('build-comet-traveler');
    const branchRay = document.getElementById('build-branch-ray');
    const cometHead = document.getElementById('build-head-point');

    if (cometHead) cometHead.setAttribute('data-luminosity', '0');

    this.resizeCanvas();
    const startX = 0;
    const endX = this.getMilestoneCenterX();
    const targetY = this.getMilestoneY(0);

    if (cometEl) {
      cometEl.style.transition = 'none';
      cometEl.style.left = `${startX}px`;
      cometEl.style.top = `${targetY}px`;
      cometEl.classList.remove('is-docked');
      cometEl.classList.add('is-igniting');

      const duration = 1900; // Schnellerer Einstiegsflug (1.9s) mit voller harmonischer Welle
      let startTime = null;

      const animateWaveJourney = (now) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const linearProgress = Math.min(1, elapsed / duration);
        const p = 1 - Math.pow(1 - linearProgress, 2.7);

        const currentX = startX + (endX - startX) * p;
        const theta = 2 * Math.PI * (1.30 * p + 0.60 * p * p);
        const envelope = 10 * Math.sin(Math.PI * Math.pow(p, 0.5)) * Math.pow(1 - p, 0.75);
        const waveOffsetY = -envelope * Math.sin(theta);
        const currentY = targetY + waveOffsetY;

        cometEl.style.left = `${currentX.toFixed(1)}px`;
        cometEl.style.top = `${currentY.toFixed(1)}px`;

        this.trailPoints.unshift({
          x: currentX,
          y: currentY,
          time: now
        });

        // Feinkörniger Sternenstaub im Kielwasser
        if (linearProgress < 0.96) {
          const sparkCount = (1 + (Math.random() < 0.4 ? 1 : 0)) * 2;
          for (let s = 0; s < sparkCount; s++) {
            this.stardustParticles.push({
              x: currentX + (Math.random() - 0.5) * 4,
              y: currentY + (Math.random() - 0.5) * 4,
              vx: -0.22 - Math.random() * 0.45,
              vy: (Math.random() - 0.5) * 0.45,
              size: 0.5 + Math.random() * 1.3,
              alpha: 0.85 + Math.random() * 0.15,
              decay: 0.009 + Math.random() * 0.012
            });
          }
        }

        this.renderCometCanvas(now);

        if (linearProgress < 1) {
          this.cometJourneyRaf = requestAnimationFrame(animateWaveJourney);
        } else {
          // Erhabenes Andocken an der Epoche (orientiert an der Mitte vom Inhalt)
          cometEl.style.left = `${endX}px`;
          cometEl.style.top = `${targetY}px`;
          cometEl.classList.remove('is-igniting');
          cometEl.classList.add('is-docked');

          if (branchRay) {
            branchRay.classList.remove('branch-down');
            branchRay.classList.add('branch-up', 'is-active');
          }

          this.animationTimeouts.push(setTimeout(() => {
            const firstPanel = document.getElementById('build-milestone-0');
            if (firstPanel) {
              firstPanel.classList.add('active');
              const card = firstPanel.querySelector('.tree-hero-card');
              if (card) card.classList.add('is-revealed');
              const pill = firstPanel.querySelector('.tree-counter-pill');
              if (pill) pill.classList.add('is-revealed');
              const year = firstPanel.querySelector('.tree-watermark-year');
              if (year) year.classList.add('is-revealed');
            }
          }, 240));

          this.dissolveCometTrail();
        }
      };

      this.cometJourneyRaf = requestAnimationFrame(animateWaveJourney);
    }

    this.updateControls(0);
  }

  /* Energetisches Aufleuchten des Lichtpunkts bei Schub-Wechsel */
  flashPointIgnition(centerX, targetY) {
    const cometEl = document.getElementById('build-comet-traveler');
    if (cometEl) {
      cometEl.classList.remove('is-docked');
      cometEl.classList.add('is-thrust-flash');
      this.animationTimeouts.push(setTimeout(() => {
        cometEl.classList.remove('is-thrust-flash');
        cometEl.classList.add('is-docked');
      }, 380));
    }

    // Radialer Sternenstaub-Ausbruch auf dem Canvas ("Punkt leuchtet auf")
    if (this.ctx && this.canvasWidth && this.canvasHeight) {
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.9 + Math.random() * 3.2;
        this.stardustParticles.push({
          x: centerX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 0.8 + Math.random() * 2.0,
          alpha: 1.0,
          decay: 0.024 + Math.random() * 0.020
        });
      }
      this.dissolveCometTrail();
    }
  }

  goToMilestone(index, direction = null) {
    if (index < 0 || index >= this.totalMilestones) return;

    if (!this.isStarted) {
      if (index === 0) {
        this.startJourney();
        return;
      }
      this.isStarted = true;
      const container = document.getElementById('build-timeline-container');
      if (container) container.classList.remove('is-dark-start');
    }

    if (!direction && index !== this.currentMilestone) {
      direction = index > this.currentMilestone ? 'future' : 'past';
    }

    this.clearAnimationTimeouts();
    this.clearCometTrail();
    const prevIndex = this.currentMilestone;
    this.currentMilestone = index;
    const data = this.milestonesData[index];
    if (!data) return;

    const cometEl = document.getElementById('build-comet-traveler');
    const branchRay = document.getElementById('build-branch-ray');
    const cometHead = document.getElementById('build-head-point');
    const panTrack = document.getElementById('build-pan-track');
    const viewport = document.getElementById('build-viewport');

    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
      branchRay.style.display = 'none';
    }

    const prevPanel = document.getElementById(`build-milestone-${prevIndex}`);
    if (prevPanel) {
      const prevCard = prevPanel.querySelector('.tree-hero-card');
      if (prevCard) prevCard.classList.remove('is-revealed');
      const prevPill = prevPanel.querySelector('.tree-counter-pill');
      if (prevPill) prevPill.classList.remove('is-revealed');
      const prevYear = prevPanel.querySelector('.tree-watermark-year');
      if (prevYear) prevYear.classList.remove('is-revealed');
      const prevVideos = prevPanel.querySelectorAll('video');
      prevVideos.forEach(v => { try { v.pause(); } catch(e) {} });
    }

    document.querySelectorAll('.build-milestone-panel').forEach((panel, idx) => {
      panel.classList.toggle('active', idx === index);
    });

    if (cometHead) {
      cometHead.setAttribute('data-luminosity', index);
    }

    this.resizeCanvas();
    const centerX = this.getMilestoneCenterX();
    const targetY = this.getMilestoneY(index);

    if (viewport) {
      viewport.classList.add('is-time-traveling');
      this.animationTimeouts.push(setTimeout(() => {
        viewport.classList.remove('is-time-traveling');
      }, 700));
    }

    // 1. Schneller, dynamischer Schub des Panorama-Tracks (0.65s statt 2.4s)
    if (panTrack) {
      panTrack.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      panTrack.style.transform = `translateX(-${index * 100}%)`;
    }

    // 2. Nur der Punkt leuchtet auf ("Point Flash & Thrust")
    if (cometEl) {
      cometEl.style.transition = 'top 0.40s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease';
      cometEl.style.left = `${centerX}px`;
      cometEl.style.top = `${targetY}px`;
      this.flashPointIgnition(centerX, targetY);
    }

    // 3. Verzweigungsstrahl schnellt synchron zum neuen Bild ein
    if (branchRay) {
      branchRay.style.display = '';
      branchRay.classList.remove('branch-up', 'branch-down', 'is-active');
      this.animationTimeouts.push(setTimeout(() => {
        branchRay.classList.add('branch-' + data.branch, 'is-active');
      }, 160));
    }

    // 4. Das nächste Bild erscheint mit dem Schub (nach 190ms Enthüllung)
    this.animationTimeouts.push(setTimeout(() => {
      const currentPanel = document.getElementById(`build-milestone-${index}`);
      if (currentPanel) {
        const card = currentPanel.querySelector('.tree-hero-card');
        if (card) card.classList.add('is-revealed');
        const pill = currentPanel.querySelector('.tree-counter-pill');
        if (pill) pill.classList.add('is-revealed');
        const year = currentPanel.querySelector('.tree-watermark-year');
        if (year) year.classList.add('is-revealed');
        const currentVideos = currentPanel.querySelectorAll('video');
        currentVideos.forEach(v => {
          try {
            v.currentTime = 0;
            const p = v.play();
            if (p) p.catch(() => {});
          } catch(e) {}
        });
      }
    }, 190));

    this.updateControls(index);
  }

  updateControls(index) {
    const data = this.milestonesData[index];
    if (!data) return;
    const lang = this.currentLang;

    const prevBtn = document.getElementById('build-prev-btn');
    const nextBtn = document.getElementById('build-next-btn');
    const nextLabel = document.getElementById('build-next-label');
    const counterBadge = document.getElementById('build-step-counter');

    if (prevBtn) {
      prevBtn.disabled = (index === 0 && !this.isStarted);
    }
    if (!this.isStarted) {
      if (counterBadge) {
        const startLabels = {
          de: '✦ Fotoreise starten',
          en: '✦ Start Photo Journey',
          ja: '✦ フォトジャーニーを開始',
          zh: '✦ 开启建造摄影之旅'
        };
        counterBadge.textContent = startLabels[lang] || startLabels.de;
      }
      if (nextLabel) {
        nextLabel.textContent = lang === 'de' ? 'Reise starten' :
                                lang === 'en' ? 'Start Journey' :
                                lang === 'ja' ? '開始' : '开始';
      }
      return;
    }
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.toggle('highlight', index === this.totalMilestones - 1 || !this.isStarted);
    }
    if (nextLabel) {
      if (index === this.totalMilestones - 1) {
        nextLabel.textContent = lang === 'de' ? 'Nächste Folie' :
                                lang === 'en' ? 'Next Slide' :
                                lang === 'ja' ? '次のスライド' : '下一页';
      } else {
        nextLabel.textContent = lang === 'de' ? 'In die Zukunft' :
                                lang === 'en' ? 'Future' :
                                lang === 'ja' ? '未来へ' : '未来';
      }
    }
    if (counterBadge) {
      const word = lang === 'de' ? 'von' : lang === 'en' ? 'of' : lang === 'ja' ? '/' : '/';
      counterBadge.textContent = `${data.monthYear} • ${index + 1} ${word} ${this.totalMilestones}`;
    }

    document.querySelectorAll('.photo-nav-btn.prev').forEach(b => {
      b.disabled = (index === 0 && !this.isStarted);
    });
    document.querySelectorAll('.photo-nav-btn.next').forEach(b => {
      b.disabled = false;
    });
  }

  nextMilestone() {
    if (!this.isStarted) {
      this.startJourney();
      return true;
    }
    if (this.currentMilestone < this.totalMilestones - 1) {
      this.goToMilestone(this.currentMilestone + 1, 'future');
      return true;
    }
    return false;
  }

  prevMilestone() {
    if (!this.isStarted) return false;
    if (this.currentMilestone > 0) {
      this.goToMilestone(this.currentMilestone - 1, 'past');
      return true;
    }
    if (this.currentMilestone === 0) {
      this.resetToDarkState();
      return true;
    }
    return false;
  }

  nextEra() { return this.nextMilestone(); }
  prevEra() { return this.prevMilestone(); }

  togglePlay() {
    if (this.isAutoplay) {
      this.pause();
    } else {
      this.startAutoplay();
    }
  }

  startAutoplay() {
    this.isAutoplay = true;
    const playBtn = document.getElementById('build-play-btn');
    const playIcon = document.getElementById('build-play-icon');
    const playLabel = document.getElementById('build-play-label');

    if (playBtn) playBtn.classList.add('playing');
    if (playIcon) playIcon.textContent = '❚❚';
    if (playLabel) {
      playLabel.textContent = this.currentLang === 'de' ? 'Pause' :
                              this.currentLang === 'en' ? 'Pause' :
                              this.currentLang === 'ja' ? '一時停止' : '暂停';
    }

    if (!this.isStarted) {
      this.startJourney();
    }

    this.runAutoplayStep();
  }

  runAutoplayStep() {
    if (!this.isAutoplay) return;

    this.autoplayStartTime = performance.now();
    const progressEl = document.getElementById('build-play-progress');

    const updateProgress = (now) => {
      if (!this.isAutoplay) return;
      const elapsed = now - this.autoplayStartTime;
      const p = Math.min(1, elapsed / this.autoplayDuration);

      if (progressEl) {
        progressEl.style.width = `${(p * 100).toFixed(1)}%`;
      }

      if (elapsed < this.autoplayDuration) {
        this.autoplayRaf = requestAnimationFrame(updateProgress);
      } else {
        if (progressEl) progressEl.style.width = '0%';
        if (this.currentMilestone < this.totalMilestones - 1) {
          this.nextMilestone();
          this.runAutoplayStep();
        } else {
          this.pause();
          this.goToMilestone(0);
        }
      }
    };

    this.autoplayRaf = requestAnimationFrame(updateProgress);
  }

  pause() {
    this.isAutoplay = false;
    if (this.autoplayRaf) {
      cancelAnimationFrame(this.autoplayRaf);
      this.autoplayRaf = null;
    }
    const playBtn = document.getElementById('build-play-btn');
    const playIcon = document.getElementById('build-play-icon');
    const playLabel = document.getElementById('build-play-label');
    const progressEl = document.getElementById('build-play-progress');

    if (playBtn) playBtn.classList.remove('playing');
    if (playIcon) playIcon.textContent = '▶';
    if (playLabel) {
      playLabel.textContent = this.currentLang === 'de' ? 'Fotoreise abspielen' :
                              this.currentLang === 'en' ? 'Play Timelapse' :
                              this.currentLang === 'ja' ? 'タイムライン再生' : '播放纪录片';
    }
    if (progressEl) progressEl.style.width = '0%';
    document.querySelectorAll('.build-milestone-panel video').forEach(v => {
      try { v.pause(); } catch(e) {}
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;

    for (let i = 0; i < this.totalMilestones; i++) {
      const data = this.milestonesData[i];
      if (!data) continue;

      const panel = document.getElementById(`build-milestone-${i}`);
      if (!panel) continue;

      const titleEl = panel.querySelector('.photo-caption-title');
      if (titleEl) titleEl.textContent = data.title[lang] || data.title.de;

      const textEl = panel.querySelector('.photo-caption-text');
      if (textEl) textEl.textContent = data.caption[lang] || data.caption.de;

      const stepBadge = panel.querySelector('.photo-card-step-badge');
      if (stepBadge) {
        const word = lang === 'de' ? 'Bauphase' : lang === 'en' ? 'Stage' : lang === 'ja' ? '工程' : '阶段';
        const ofWord = lang === 'de' ? 'von' : lang === 'en' ? 'of' : lang === 'ja' ? '/' : '/';
        stepBadge.textContent = `${word} ${i + 1} ${ofWord} ${this.totalMilestones}`;
      }

      const counterText = panel.querySelector('.tree-counter-text');
      if (counterText) counterText.textContent = data.phase[lang] || data.phase.de;
    }

    const playLabel = document.getElementById('build-play-label');
    if (playLabel) {
      if (this.isAutoplay) {
        playLabel.textContent = lang === 'de' ? 'Pause' :
                                lang === 'en' ? 'Pause' :
                                lang === 'ja' ? '一時停止' : '暂停';
      } else {
        playLabel.textContent = lang === 'de' ? 'Fotoreise abspielen' :
                                lang === 'en' ? 'Play Timelapse' :
                                lang === 'ja' ? 'タイムライン再生' : '播放纪录片';
      }
    }

    if (this.isStarted) {
      this.goToMilestone(this.currentMilestone);
    } else {
      this.updateControls(0);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.meuselwitzJourney = new RennerTransformationJourney();
  window.meuselwitzJourney.init();
});
