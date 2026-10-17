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
    this.totalMilestones = 11;
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
          de: 'Phase 1: Hallenvorbereitung',
          en: 'Phase 1: Hall Preparation',
          ja: '第1フェーズ：工場棟整備',
          zh: '第一阶段：主车间整备'
        },
        title: {
          de: 'Start Bauvorhaben & Entkernung',
          en: 'Project Start & Site Handover',
          ja: '建設開始と内部解体',
          zh: '工程启动与车间整备'
        },
        caption: {
          de: 'Erste Begehung und Entkernung: Freilegung der tragenden Strukturen für das neue industrielle Produktionslayout.',
          en: 'Initial site handover and gutting: clearing of core structural lines for the new industrial production flow.',
          ja: 'モイゼルヴィッツ工場棟の引き渡しと内部解体：新製造ラインに合わせた構造クリアランスの確保。',
          zh: '新厂区交接与内部腾退，清理核心结构线，为高精生产线布局开辟开阔空间。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/01_20251103_152224.jpg'
      },
      {
        id: '2025-12',
        monthYear: '12.2025',
        branch: 'down',
        phase: {
          de: 'Phase 2: Fundamentierung',
          en: 'Phase 2: Foundations',
          ja: '第2フェーズ：基礎工事',
          zh: '第二阶段：重型地基浇筑'
        },
        title: {
          de: 'Schwerlastböden & Schwingungsentkopplung',
          en: 'Heavy-Duty Floors & Vibration Damping',
          ja: '免震高強度床・基礎工事',
          zh: '超重型隔震专用地坪施工'
        },
        caption: {
          de: 'Gießen der schwingungsentkoppelten Schwerlast-Betonböden für tonnenschwere Hammerkopf-Pressen und CNC-Fräsen.',
          en: 'Vibration-damped foundation slabs for metric-ton hammerhead hot-presses and high-speed CNC milling centers.',
          ja: 'トンの圧力をかけるハンマー熱成形プレス機とCNC用の免震コンクリート基礎工事。',
          zh: '为吨级热压成型机与数控铣床浇筑重型减震地基，确保微米级机械稳定性。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/14_20251201_135805.jpg'
      },
      {
        id: '2026-01',
        monthYear: '01.2026',
        branch: 'up',
        phase: {
          de: 'Phase 3: Hallenstruktur & Dämmung',
          en: 'Phase 3: Building Shell',
          ja: '第3フェーズ：外殻構造・断熱',
          zh: '第三阶段：外壳与保温工程'
        },
        title: {
          de: 'Hallenisolierung & Struktur-Modernisierung',
          en: 'Thermal Insulation & Structural Upgrade',
          ja: '高断熱パネルと構造改修',
          zh: '厂房高等级保温与结构更新'
        },
        caption: {
          de: 'Installation hochisolierter Wandpaneele und Vorbereitung des Reinraum-Deckenbereichs für gleichbleibendes Raumklima.',
          en: 'Installation of high-grade insulated wall panels and clean-air ceiling preparation for stable indoor climate.',
          ja: '高断熱壁面パネルの設置と、年間を通じた安定環境を保つクリーンシーリング構造の構築。',
          zh: '安装高等级保温墙板并构建洁净顶面，为全天候恒定微气候奠定外围护结构。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/18_20260106_135356.jpg'
      },
      {
        id: '2026-02',
        monthYear: '02.2026',
        branch: 'down',
        phase: {
          de: 'Phase 4: Präzisions-Klimatechnik',
          en: 'Phase 4: Climate Control',
          ja: '第4フェーズ：恒温恒湿空調',
          zh: '第四阶段：精密恒温恒湿系统'
        },
        title: {
          de: 'Computergestützte Klimaregelung (45–50% r.F.)',
          en: 'Digital Climate Control (45–50% RH)',
          ja: 'コンピュータ制御45〜50%恒湿システム',
          zh: '数字化恒温恒湿空调机组安装'
        },
        caption: {
          de: 'Einbau der zentralen Klimatisierung: Strikte 45–50 % Luftfeuchte schützen sensible Filze und Hölzer vor Verzug.',
          en: 'Central atmospheric HVAC installation: strict 45–50% relative humidity preserves acoustic felt and tonewood.',
          ja: '高精度空調の導入：響木と羊毛フェルトの変形を防ぐ厳格な45〜50%湿度管理を24時間実現。',
          zh: '中央环境控制机组进驻：严格维持45-50%相对湿度，杜绝音木与特选毛毡形变。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/23_20260227_074933.jpg'
      },
      {
        id: '2026-03',
        monthYear: '03.2026',
        branch: 'up',
        phase: {
          de: 'Phase 5: Energie & Infrastruktur',
          en: 'Phase 5: Power & Utilities',
          ja: '第5フェーズ：配管・電力インフラ',
          zh: '第五阶段：高压管网与电力母线'
        },
        title: {
          de: 'Stromschienen, Druckluft & Absaugtrassen',
          en: 'Busbar Power Trusses & Pneumatics',
          ja: '高圧電力母線と圧縮空気ネットワーク',
          zh: '电力母线桥架与高压气电网络'
        },
        caption: {
          de: 'Flächendeckende Decken-Trassen für Industriestrom, Druckluft und Feinstaubabsaugung über allen Maschinenpositionen.',
          en: 'Ceiling-mounted utility trusses providing high-amperage power, pneumatic loops, and clean dust extraction.',
          ja: '全マシンスポットをカバーする天井配線・圧縮空気配管および局所集塵ダクト網の敷設。',
          zh: '铺设全覆盖车间母线桥架、高压环形气动管路及粉尘负压集尘管道。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/25_20260320_090128.jpg'
      },
      {
        id: '2026-04',
        monthYear: '04.2026',
        branch: 'down',
        phase: {
          de: 'Phase 6: Schwertransport-Logistik',
          en: 'Phase 6: Relocation Convoy',
          ja: '第6フェーズ：精密重機移送',
          zh: '第六阶段：特种重载转运'
        },
        title: {
          de: 'Überführung der Gärtringer Spezialanlagen',
          en: 'Heavy Machine Transport from Gärtringen',
          ja: 'ゲルトリンゲンからの450km大型重機移送',
          zh: '原厂450公里重型特种车队启运'
        },
        caption: {
          de: 'Präzise getaktete Spezialtransporte über 450 km zur schadensfreien Überführung des Maschinenparks nach Meuselwitz.',
          en: 'Logistics coordination over 450 km: safeguarding irreplaceable proprietary presses and custom tooling.',
          ja: '南西ドイツから中部ドイツへ450km：かけがえのない専用機械と工具群を安全に護送。',
          zh: '跨越450公里严密护航：将雷诺无法替代的专用压机与高精工装安全转运至新厂。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/27_20260428_083959.jpg'
      },
      {
        id: '2026-05',
        monthYear: '05.2026',
        branch: 'up',
        phase: {
          de: 'Phase 7: Maschinenankunft',
          en: 'Phase 7: Machinery Delivery',
          ja: '第7フェーズ：設備到着',
          zh: '第七阶段：核心机械抵厂'
        },
        title: {
          de: 'Ankunft der Präzisionspressen & Sondermaschinen',
          en: 'Arrival of Precision Presses & Tooling',
          ja: '専用熱プレス機と特殊工作機械の到着',
          zh: '专用热压机与特种工装车队到厂'
        },
        caption: {
          de: 'Entladung der tonnenschweren Maschinenkörper und Baugruppen am Haupttor des modernisierten Werksgeländes.',
          en: 'Arrival and offloading of multi-ton press bodies, automated cutters, and sub-assemblies at factory gates.',
          ja: 'モイゼルヴィッツ新工場ゲートでの超重量マシン本体および精密ユニットの慎重な荷降ろし。',
          zh: '数吨重的核心热压机体与自动化切削模组陆续在新厂主大门卸车集结。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/34_20260521_144701.jpg'
      },
      {
        id: '2026-06',
        monthYear: '06.2026',
        branch: 'down',
        phase: {
          de: 'Phase 8: Halleneinbringung',
          en: 'Phase 8: Machine Rigging',
          ja: '第8フェーズ：館内精密搬入',
          zh: '第八阶段：车间内部平移就位'
        },
        title: {
          de: 'Schwerlast-Positionierung per Panzerrollen',
          en: 'Rigging & Air-Skate Placement',
          ja: '装軌台車によるミリ単位の館内据付',
          zh: '重型坦克轮与气垫微米平移'
        },
        caption: {
          de: 'Mit Spezialkränen und Panzerrollen werden die Anlagen zentimetergenau auf ihre vorbereiteten Fundamente gesetzt.',
          en: 'Industrial rigging crews maneuver massive machinery onto calibrated vibration pads with extreme precision.',
          ja: 'クレーンと専用ローラーを駆使し、ミリ単位で機械を事前に施工された基礎へと精密配置。',
          zh: '专业吊装与坦克轮团队协同，将庞大设备严丝合缝平移就位至隔震地坪。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/36_20260610_075535.jpg'
      },
      {
        id: '2026-07',
        monthYear: '07.2026',
        branch: 'up',
        phase: {
          de: 'Phase 9: Laser-Nivellierung',
          en: 'Phase 9: Laser Alignment',
          ja: '第9フェーズ：レーザー精密校正',
          zh: '第九阶段：激光干涉全轴校准'
        },
        title: {
          de: 'Lasergestützte Verankerung & Justierung',
          en: 'Laser Alignment & Zero-Torsion Anchoring',
          ja: 'レーザー水平校正と高剛性アンカー固定',
          zh: '激光干涉仪全轴水平与刚性地锚固化'
        },
        caption: {
          de: 'Optische Laservermessung stellt vollkommen verzugsfreie Maschinenbetten für kompromisslose Serienpräzision sicher.',
          en: 'Optical laser interferometry ensures zero torsion on all guide rails, guaranteeing micrometer tolerances.',
          ja: 'レーザー光学測定による完全な水平出し：ミクロン単位の再現性を生み出す完璧な機械台座。',
          zh: '激光干涉仪全程标定：确保导轨与机床底座零应变，奠定微米级加工一致性基石。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/38_20260708_120853.jpg'
      },
      {
        id: '2026-09',
        monthYear: '09.2026',
        branch: 'down',
        phase: {
          de: 'Phase 10: Meisterarbeitsplätze',
          en: 'Phase 10: Master Benches',
          ja: '第10フェーズ：マイスター作業台',
          zh: '第十阶段：大师装配工位设立'
        },
        title: {
          de: 'Einrichtung der Feinmontage & Absaugsysteme',
          en: 'Master Workstations & Cleanroom Lighting',
          ja: 'エルゴノミクス組立台と自然光LED照明',
          zh: '人体工学总装台与防尘照明系统'
        },
        caption: {
          de: 'Modernste Prüfvorrichtungen, ergonomische Werkbänke und Tageslichtbeleuchtung für ermüdungsfreie Montage.',
          en: 'High-CRI daylight LED illumination, ergonomic assembly benches, and automated inspection gauges installed.',
          ja: '自然光に近いCRI98照明と人間工学に基づく精密組立デスク：88鍵アクションの最終調律環境。',
          zh: '配备高显色自然光照与人体工学独立工位，为88键全套击弦机终检创造无疲劳作业空间。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/42_20260909_094559.jpg'
      },
      {
        id: '2026-10',
        monthYear: '10.2026',
        branch: 'up',
        phase: {
          de: 'Phase 11: Vollbetrieb & Welt-Hauptsitz',
          en: 'Phase 11: Production Launch',
          ja: '第11フェーズ：新工場全面稼働',
          zh: '第十一阶段：新总装生产线全面达产'
        },
        title: {
          de: 'Erfolgreiche Inbetriebnahme & Vollbetrieb',
          en: 'United Global Production in Full Swing',
          ja: '統合された新グローバル本社工場の全面稼働',
          zh: '全球整合新旗舰总部全面投产'
        },
        caption: {
          de: 'Vollständige Produktionsaufnahme: Renner fertigt Konzertmechaniken und Hammerköpfe am neuen globalen Hauptsitz Meuselwitz.',
          en: 'Full-scale manufacturing active: crafting world-class piano actions and hammerheads under one unified roof.',
          ja: 'フル生産開始：世界最高峰のコンサートグランド用アクションとハンマーヘッドが新拠点から世界へ。',
          zh: '全面合龙量产：雷诺音乐会级击弦机与弦槌全工序在莫伊瑟尔维茨全新旗舰总部扬帆起航。'
        },
        image: 'Visuell/Bilder/02_Umbau_und_Umzug/48_20261009_081342.jpg'
      }
    ];

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
    if (!container) return;
    const rect = container.getBoundingClientRect();
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
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
    });

    const counterBadge = document.getElementById('build-step-counter');
    const prevBtn = document.getElementById('build-prev-btn');
    const nextBtn = document.getElementById('build-next-btn');
    const nextLabel = document.getElementById('build-next-label');

    if (counterBadge) counterBadge.textContent = '✦ Fotoreise starten';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.add('highlight');
    }
    if (nextLabel) {
      nextLabel.textContent = this.currentLang === 'de' ? 'In die Zukunft' : 'Future';
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
    if (playLabel) playLabel.textContent = this.currentLang === 'de' ? 'Pause' : 'Pause';

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
        playLabel.textContent = lang === 'de' ? 'Pause' : 'Pause';
      } else {
        playLabel.textContent = lang === 'de' ? 'Fotoreise abspielen' : 'Play Timelapse';
      }
    }

    this.goToMilestone(this.currentMilestone);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.meuselwitzJourney = new RennerTransformationJourney();
  window.meuselwitzJourney.init();
});
