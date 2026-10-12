/**
 * Louis Renner Presentation Engine
 * Slide Navigation, Video Synchronization, Multi-Language, Interactive Widgets
 */

class PresentationController {
  constructor() {
    this.currentSlideIndex = 0;
    this.slides = [];
    this.totalSlides = 0;
    this.currentLang = 'de';
    this.isLaserActive = false;
    this.isNotesOpen = false;
    this.isGridOpen = false;
    this.isSoundModalOpen = false;
    
    // Touch tracking
    this.touchStartX = 0;
    this.touchEndX = 0;

    // Speaker notes registry
    this.notesData = {};
  }

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    
    this.setupNotesData();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.setupTouchGestures();
    this.setupLaserPointer();
    this.setupGallery();
    this.setupVoicingWidget();
    this.setupSlideGrid();
    
    // Set initial slide
    this.goToSlide(0);
    this.updateLanguage(this.currentLang);

    // Initialize audio canvas if present
    const canvas = document.getElementById('sound-spectrum-canvas');
    if (canvas && window.rennerAudio) {
      window.rennerAudio.init(canvas);
    }
  }

  setupEventListeners() {
    // Navigation buttons
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        if (lang) this.setLanguage(lang);
      });
    });

    // Header action buttons
    const gridBtn = document.getElementById('toggle-grid-btn');
    if (gridBtn) gridBtn.addEventListener('click', () => this.toggleGridModal());

    const notesBtn = document.getElementById('toggle-notes-btn');
    if (notesBtn) notesBtn.addEventListener('click', () => this.toggleNotes());

    const laserBtn = document.getElementById('toggle-laser-btn');
    if (laserBtn) laserBtn.addEventListener('click', () => this.toggleLaserPointer());

    const soundBtn = document.getElementById('toggle-sound-btn');
    if (soundBtn) soundBtn.addEventListener('click', () => this.toggleSoundModal());

    const fullscreenBtn = document.getElementById('toggle-fullscreen-btn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Close buttons for modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      });
    });

    // Close modal on background click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't intercept if inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // Space
          e.preventDefault();
          this.nextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          this.prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;

        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          this.toggleNotes();
          break;

        case 'g':
        case 'G':
        case 'o':
        case 'O':
          e.preventDefault();
          this.toggleGridModal();
          break;

        case 'l':
        case 'L':
          e.preventDefault();
          this.toggleLaserPointer();
          break;

        case 's':
        case 'S':
          e.preventDefault();
          this.toggleSoundModal();
          break;

        case 'Escape':
          document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
          if (this.isNotesOpen) this.toggleNotes();
          break;
      }
    });
  }

  setupTouchGestures() {
    window.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    if (this.touchEndX < this.touchStartX - swipeThreshold) {
      this.nextSlide(); // Swipe left -> next
    }
    if (this.touchEndX > this.touchStartX + swipeThreshold) {
      this.prevSlide(); // Swipe right -> prev
    }
  }

  setupLaserPointer() {
    const pointer = document.getElementById('laser-pointer');
    if (!pointer) return;

    window.addEventListener('mousemove', (e) => {
      if (this.isLaserActive) {
        pointer.style.left = `${e.clientX}px`;
        pointer.style.top = `${e.clientY}px`;
      }
    });
  }

  toggleLaserPointer() {
    this.isLaserActive = !this.isLaserActive;
    const pointer = document.getElementById('laser-pointer');
    const laserBtn = document.getElementById('toggle-laser-btn');
    if (pointer) pointer.style.display = this.isLaserActive ? 'block' : 'none';
    if (laserBtn) laserBtn.classList.toggle('active', this.isLaserActive);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  toggleNotes() {
    this.isNotesOpen = !this.isNotesOpen;
    const drawer = document.getElementById('speaker-notes-drawer');
    const notesBtn = document.getElementById('toggle-notes-btn');
    if (drawer) drawer.classList.toggle('open', this.isNotesOpen);
    if (notesBtn) notesBtn.classList.toggle('active', this.isNotesOpen);
  }

  toggleGridModal() {
    const modal = document.getElementById('slides-grid-modal');
    if (modal) {
      modal.classList.toggle('open');
      this.isGridOpen = modal.classList.contains('open');
    }
  }

  toggleSoundModal() {
    const modal = document.getElementById('sound-simulator-modal');
    if (modal) {
      modal.classList.toggle('open');
      this.isSoundModalOpen = modal.classList.contains('open');
      if (this.isSoundModalOpen && window.rennerAudio) {
        const canvas = document.getElementById('sound-spectrum-canvas');
        if (canvas) window.rennerAudio.init(canvas);
      }
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    const previousSlide = this.slides[this.currentSlideIndex];
    if (previousSlide) {
      // Pause any running videos in the previous slide
      const videos = previousSlide.querySelectorAll('video');
      videos.forEach(v => v.pause());
      previousSlide.classList.remove('active');
    }

    this.currentSlideIndex = index;
    const currentSlide = this.slides[this.currentSlideIndex];
    if (currentSlide) {
      currentSlide.classList.add('active');

      // Autoplay or prepare video if on slide
      const activeVideos = currentSlide.querySelectorAll('video');
      activeVideos.forEach(v => {
        v.currentTime = 0;
        v.play().catch(() => {}); // Allow autoplay or user gesture
      });
    }

    this.updateHUD();
    this.updateNotes();
  }

  nextSlide() {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  updateHUD() {
    // Update counter
    const counterEl = document.getElementById('slide-counter');
    if (counterEl) {
      counterEl.textContent = `${this.currentSlideIndex + 1} / ${this.totalSlides}`;
    }

    // Update progress bar
    const progressEl = document.getElementById('progress-bar-fill');
    if (progressEl) {
      const pct = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
      progressEl.style.width = `${pct}%`;
    }

    // Update breadcrumb
    const currentSlide = this.slides[this.currentSlideIndex];
    if (currentSlide) {
      const titleEl = currentSlide.querySelector('.slide-title');
      const breadcrumbEl = document.getElementById('slide-name-breadcrumb');
      if (breadcrumbEl && titleEl) {
        breadcrumbEl.textContent = titleEl.textContent;
      }
    }

    // Highlight active in grid modal
    document.querySelectorAll('.slide-grid-thumb').forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === this.currentSlideIndex);
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    this.updateLanguage(lang);
  }

  updateLanguage(lang) {
    const dict = translations[lang] || translations.de;
    
    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update slide specific multi-language contents
    document.querySelectorAll(`[data-lang-content]`).forEach(el => {
      const elLang = el.getAttribute('data-lang-content');
      el.style.display = elLang === lang ? '' : 'none';
    });

    this.updateHUD();
    this.updateNotes();
  }

  setupSlideGrid() {
    const gridContainer = document.getElementById('slides-grid-view');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    this.slides.forEach((slide, idx) => {
      const titleEl = slide.querySelector('.slide-title');
      const categoryEl = slide.querySelector('.slide-category');
      const title = titleEl ? titleEl.textContent : `Slide ${idx + 1}`;
      const category = categoryEl ? categoryEl.textContent : '';

      const thumb = document.createElement('div');
      thumb.className = `slide-grid-thumb ${idx === this.currentSlideIndex ? 'active' : ''}`;
      thumb.innerHTML = `
        <div class="grid-thumb-number">Folie ${idx + 1} • ${category}</div>
        <div class="grid-thumb-title">${title}</div>
      `;
      thumb.addEventListener('click', () => {
        this.goToSlide(idx);
        this.toggleGridModal();
      });
      gridContainer.appendChild(thumb);
    });
  }

  setupGallery() {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const mainImg = document.getElementById('gallery-main-img');
    const captionTitle = document.getElementById('gallery-caption-title');
    const captionPhase = document.getElementById('gallery-caption-phase');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const fullSrc = thumb.getAttribute('data-full');
        const title = thumb.getAttribute('data-title');
        const phase = thumb.getAttribute('data-phase');

        if (mainImg) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = fullSrc;
            mainImg.style.opacity = '1';
          }, 150);
        }
        if (captionTitle) captionTitle.textContent = title;
        if (captionPhase) captionPhase.textContent = phase;
      });
    });
  }

  setupVoicingWidget() {
    const zoneBtns = document.querySelectorAll('.voicing-zone-btn');
    const zoneDetails = document.querySelectorAll('.zone-detail-panel');

    zoneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const zone = btn.getAttribute('data-zone');
        zoneBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        zoneDetails.forEach(panel => {
          panel.style.display = panel.getAttribute('data-zone') === zone ? 'block' : 'none';
        });

        // Trigger corresponding sound profile in audio synth
        if (window.rennerAudio) {
          if (zone === 'strike') window.rennerAudio.playNote('hard');
          else if (zone === 'shoulder') window.rennerAudio.playNote('concert');
          else if (zone === 'cushion') window.rennerAudio.playNote('soft');
        }
      });
    });
  }

  setupNotesData() {
    // Detailed speaker notes for Clemens Kunert in 4 languages
    this.notesData = {
      0: {
        de: "Begrüßung des Publikums in Tokio / Shanghai. Vorstellung von Clemens Kunert und der Louis Renner GmbH. Betonung: 2025/2026 ist ein historischer Meilenstein für Renner durch die Neueröffnung und Konsolidierung des Hauptsitzes in Meuselwitz.",
        en: "Welcome the audience in Tokyo / Shanghai. Introduction of Clemens Kunert and Louis Renner GmbH. Emphasize that 2025/2026 marks a historic milestone with the consolidated modern headquarters in Meuselwitz.",
        ja: "東京・上海カンファレンスの皆様にご挨拶。クレメンス・クーネルトとルイス・レンナー社の紹介。モイゼルヴィッツ新本社統合という歴史的変革を強調。",
        zh: "欢迎各位东京与上海钢琴业界的贵宾。主讲人克莱门斯·库内特介绍德国雷诺公司。强调2025/2026年雷诺新总部在莫伊瑟尔维茨落成整合的里程碑意义。"
      },
      3: {
        de: "Zusammenlegung Gärtringen & Meuselwitz: Erklären Sie, dass bisher Holzbearbeitung in Gärtringen und Montage in Meuselwitz stattfand. Nun ist alles unter einem hochmodernen, voll klimatisierten Dach vereint. Bessere Qualitätskontrolle, schnellere Durchlaufzeiten.",
        en: "Consolidation Gärtringen & Meuselwitz: Explain that woodworking was previously in Gärtringen and assembly in Meuselwitz. Now unified under one state-of-the-art climate-controlled roof.",
        ja: "ゲルトリンゲンとモイゼルヴィッツの拠点統合：木工加工と組み立てを完全気候制御された新拠点に統合。品質管理とリードタイムの大幅な向上。",
        zh: "盖特林根与莫伊瑟尔维茨两厂合并：以往木工粗加工与总装分离，现统一在全恒温恒湿新总部，实现最高质控标准与更快交付周期。"
      },
      8: {
        de: "Roboter-Zuschnitt (Video 1): Zeigen Sie das Video! Weisen Sie darauf hin, dass der Roboter den Filz exakt trapezförmig schneidet, ohne die Faserstruktur durch Scherspannung zu stauchen. Weltweit einzigartige Präzision.",
        en: "Robot Felt Cutting (Video 1): Play the video! Point out that the robot cuts the felt with zero shear stress, preserving fiber direction perfectly.",
        ja: "ロボットフェルト切断（動画1）：動画を再生。ロボットが高精度台形カットを実施し、繊維方向を崩さず完璧に切断する世界最高峰の技術を解説。",
        zh: "机器人羊毛毡裁切（视频1）：播放视频！重点介绍工业机器人无剪切应力的高精度梯形裁切，完美保护原始羊毛纤维排列。"
      },
      18: {
        de: "Das RENNER YAMAHA-KIT (HIGHLIGHT!): Heben Sie hervor: Fertig eingeleimt, ausgereichtet und vordefiniert. Klavierbauer müssen nicht mehr stundenlang Leimvorrichtungen justieren. Vorintonation entfällt komplett! Sofort einbauen und losspielen.",
        en: "The RENNER YAMAHA KIT (HIGHLIGHT!): Emphasize: Fully pre-glued, aligned, and matched. Technicians save hours of glue fixture adjustments. Pre-voicing is completely eliminated! Direct drop-in concert quality.",
        ja: "レンナー・ヤマハキット（最大のハイライト！）：完全接着済み、精密アライメント調整済み。接着治具の調整や面倒な予備整音は一切不要。ボルトオンで即座に演奏可能！",
        zh: "雷诺雅马哈专用套件（全场核心亮点！）：出厂预胶合调直，彻底免去传统数小时的夹具调校与繁重预整音工序！直接螺丝锁紧，即刻拥有纯正雷诺音乐厅音色。"
      },
      21: {
        de: "Intonation Zonen: Erläutern Sie die 3 Zonen. Scheitel (nur minimal touchieren für Attack), Schultern (Klangfarbe/Obertöne), Flanken (Klangfülle & Fortissimo).",
        en: "Voicing Zones: Explain the 3 zones. Strike point (minimal touch for attack), Shoulders (timbre and overtone bloom), Flanks/Base (volume and power).",
        ja: "整音ゾーンの極意：3つのゾーンを解説。打弦点（アタック音）、ショルダー部（倍音と音色の輝き）、側面ベース部（音量とフォルテシモの持続）。",
        zh: "整音核心分区秘籍：讲解三级区域。击弦点（仅微调触弦质感），槌肩（掌控泛音与丰满度），侧翼腰部（掌控强奏共鸣与基音厚度）。"
      }
    };
  }

  updateNotes() {
    const notesContent = document.getElementById('speaker-notes-content');
    if (!notesContent) return;

    const slideNotes = this.notesData[this.currentSlideIndex];
    if (slideNotes) {
      const text = slideNotes[this.currentLang] || slideNotes.de;
      notesContent.innerHTML = `<p>${text}</p>`;
    } else {
      const defaultText = {
        de: `Folie ${this.currentSlideIndex + 1}: Präsentieren Sie die Inhalte und betonen Sie die deutsche Präzisionsfertigung von Louis Renner.`,
        en: `Slide ${this.currentSlideIndex + 1}: Present the key highlights and emphasize Louis Renner's German precision craftsmanship.`,
        ja: `スライド ${this.currentSlideIndex + 1}: ルイス・レンナー社のドイツ精密製造技術と品質の優位性を解説してください。`,
        zh: `第 ${this.currentSlideIndex + 1} 页：向嘉宾介绍核心要点，重点阐述德国雷诺不可替代的高精机械与音色标准。`
      };
      notesContent.innerHTML = `<p>${defaultText[this.currentLang] || defaultText.de}</p>`;
    }
  }
}

// Instantiate and initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
  window.presentation.init();
});
