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

    // Country color theme ('de', 'ja', 'zh', 'en')
    this.currentTheme = 'de';
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
    
    // Set initial slide and country theme
    this.setCountryTheme(this.currentTheme);
    this.goToSlide(0);
    this.updateLanguage(this.currentLang);

    // Ensure every slide has the official Renner corner watermark logo at bottom right
    this.slides.forEach((slide) => {
      if (!slide.querySelector('.slide-corner-watermark')) {
        const wm = document.createElement('div');
        wm.className = 'slide-corner-watermark';
        wm.innerHTML = '<div class="brand-logo-container corner-variant"><img src="Visuell/web_assets/renner_logo_weiss_schatten.png" alt="Louis Renner" class="slide-corner-logo"><div class="brand-logo-light-sheen" aria-hidden="true"></div></div>';
        slide.appendChild(wm);
      }
    });

    // Initialize audio canvas if present
    const canvas = document.getElementById('sound-spectrum-canvas');
    if (canvas && window.rennerAudio) {
      window.rennerAudio.init(canvas);
    }

    // Initialize Meuselwitz Construction Timelapse Player
    if (window.meuselwitzTimelapse) {
      window.meuselwitzTimelapse.init();
      window.meuselwitzTimelapse.setLanguage(this.currentLang);
    }

    // Initialize instant live translation sync (dynamically reloads slides_content.json on edit/focus/heartbeat)
    this.initLiveTranslationSync();
  }

  initLiveTranslationSync() {
    this.lastTranslationVersion = 0;

    // Standalone & Offline Support: Immediately apply pre-compiled translations from translations-data.js
    if (typeof window !== 'undefined' && window.slideTranslations && typeof translations !== 'undefined') {
      for (const lang of ['de', 'en', 'ja', 'zh']) {
        if (window.slideTranslations[lang]) {
          translations[lang] = translations[lang] || {};
          Object.assign(translations[lang], window.slideTranslations[lang]);
        }
      }
      this.updateLanguage(this.currentLang);
    }

    // Helper: merge fresh JSON from slides_content.json directly into translations
    this.applySlideContentData = (data) => {
      if (!data) return;
      if (data._meta && data._meta.title) {
        document.title = data._meta.title;
      }
      if (!data.slides) return;
      
      const flat = { de: {}, en: {}, ja: {}, zh: {} };
      
      for (const [sKey, s] of Object.entries(data.slides)) {
        const num = s.slide_number;
        for (const lang of ['de', 'en', 'ja', 'zh']) {
          if (s.category && s.category[lang]) flat[lang][`s${num}_category`] = s.category[lang];
          if (s.title && s.title[lang]) flat[lang][`s${num}_title`] = s.title[lang];
          if (s.subtitle && s.subtitle[lang]) flat[lang][`s${num}_subtitle`] = s.subtitle[lang];
          if (s.kicker && s.kicker[lang]) flat[lang][`s${num}_kicker`] = s.kicker[lang];
          if (s.notes && s.notes[lang]) flat[lang][`s${num}_notes`] = s.notes[lang];
          if (s.elements) {
            for (const [elKey, elDict] of Object.entries(s.elements)) {
              if (elDict && elDict[lang]) flat[lang][elKey] = elDict[lang];
            }
          }
        }
      }

      if (data.ui) {
        for (const [uiKey, uiDict] of Object.entries(data.ui)) {
          for (const lang of ['de', 'en', 'ja', 'zh']) {
            if (uiDict && uiDict[lang]) flat[lang][uiKey] = uiDict[lang];
          }
        }
      }

      for (const lang of ['de', 'en', 'ja', 'zh']) {
        if (typeof translations !== 'undefined') {
          translations[lang] = translations[lang] || {};
          Object.assign(translations[lang], flat[lang]);
        }
      }

      this.updateLanguage(this.currentLang);
    };

    // Live fetcher (only active in local development over HTTP/HTTPS to prevent CORS/file errors)
    const isDevHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    this.refreshTranslationsLive = async () => {
      if (!isDevHost || !window.location.protocol.startsWith('http')) return;
      try {
        const res = await fetch(`translations/slides_content.json?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          this.applySlideContentData(data);
        }
      } catch (e) {
        // Offline / file protocol fallback
      }
    };

    // 1. Initial live fetch only in dev
    if (isDevHost) {
      this.refreshTranslationsLive();

      // 2. Window focus trigger: whenever user switches back to browser tab from editor
      window.addEventListener('focus', () => {
        this.refreshTranslationsLive();
      });

      // 3. Heartbeat check every 1.5 seconds for instant hot-reload (dev server only)
      if (window.location.protocol.startsWith('http')) {
        setInterval(async () => {
          try {
            const res = await fetch(`api/translation-version?t=${Date.now()}`, { cache: 'no-store' });
            if (res.ok) {
              const json = await res.json();
              if (json.version && json.version !== this.lastTranslationVersion) {
                this.lastTranslationVersion = json.version;
                await this.refreshTranslationsLive();
              }
            }
          } catch (e) {
            // quiet fallback
          }
        }, 1500);
      }
    }
  }


  setupEventListeners() {
    // Navigation buttons
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Jump to Slide 2 (Modules / Agenda) buttons
    const headerJumpSlide2Btn = document.getElementById('header-jump-slide2-btn');
    if (headerJumpSlide2Btn) {
      headerJumpSlide2Btn.addEventListener('click', () => this.goToSlide(1));
    }
    const hudJumpSlide2Btn = document.getElementById('hud-jump-slide2-btn');
    if (hudJumpSlide2Btn) {
      hudJumpSlide2Btn.addEventListener('click', () => this.goToSlide(1));
    }

    // Delegated click handler for any element with data-target-slide="X"
    document.addEventListener('click', (e) => {
      const targetEl = e.target.closest('[data-target-slide]');
      if (targetEl) {
        const val = targetEl.getAttribute('data-target-slide');
        const matchIdx = this.slides.findIndex(s => s.getAttribute('data-slide') === val);
        if (matchIdx !== -1) {
          e.preventDefault();
          this.goToSlide(matchIdx);
        } else {
          const targetSlide = parseInt(val, 10);
          if (!isNaN(targetSlide) && targetSlide >= 1 && targetSlide <= this.totalSlides) {
            e.preventDefault();
            this.goToSlide(targetSlide - 1);
          }
        }
      }
    });

    // Delegated Enter/Space keyboard accessibility for [data-target-slide]
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const targetEl = document.activeElement && document.activeElement.closest('[data-target-slide]');
        if (targetEl && !['INPUT', 'TEXTAREA', 'SELECT'].includes(targetEl.tagName)) {
          const val = targetEl.getAttribute('data-target-slide');
          const matchIdx = this.slides.findIndex(s => s.getAttribute('data-slide') === val);
          if (matchIdx !== -1) {
            e.preventDefault();
            this.goToSlide(matchIdx);
          } else {
            const targetSlide = parseInt(val, 10);
            if (!isNaN(targetSlide) && targetSlide >= 1 && targetSlide <= this.totalSlides) {
              e.preventDefault();
              this.goToSlide(targetSlide - 1);
            }
          }
        }
      }
    });

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        if (lang) this.setLanguage(lang);
      });
    });

    // Country Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const theme = e.currentTarget.getAttribute('data-theme');
        if (theme) this.setCountryTheme(theme);
      });
    });

    // Header Menu Toggle Button & Dropdown
    const menuBtn = document.getElementById('header-menu-btn');
    const menuDropdown = document.getElementById('header-menu-dropdown');
    const menuCloseBtn = document.getElementById('header-menu-close-btn');

    this.toggleMenu = (force) => {
      if (!menuDropdown || !menuBtn) return;
      const isOpen = force !== undefined ? force : !menuDropdown.classList.contains('is-open');
      menuDropdown.classList.toggle('is-open', isOpen);
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuDropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    };

    if (menuBtn) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });
    }

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu(false);
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menuDropdown && menuDropdown.classList.contains('is-open')) {
        if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
          this.toggleMenu(false);
        }
      }
    });

    // Header action buttons
    const gridBtn = document.getElementById('toggle-grid-btn');
    if (gridBtn) gridBtn.addEventListener('click', () => {
      this.toggleMenu(false);
      this.toggleGridModal();
    });

    const notesBtn = document.getElementById('toggle-notes-btn');
    if (notesBtn) notesBtn.addEventListener('click', () => {
      this.toggleMenu(false);
      this.toggleNotes();
    });

    const laserBtn = document.getElementById('toggle-laser-btn');
    if (laserBtn) laserBtn.addEventListener('click', () => {
      this.toggleMenu(false);
      this.toggleLaserPointer();
    });

    const soundBtn = document.getElementById('toggle-sound-btn');
    if (soundBtn) soundBtn.addEventListener('click', () => {
      this.toggleMenu(false);
      this.toggleSoundModal();
    });

    const fullscreenBtn = document.getElementById('toggle-fullscreen-btn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => {
      this.toggleMenu(false);
      this.toggleFullscreen();
    });

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

        case '2':
        case 'a':
        case 'A':
          e.preventDefault();
          this.goToSlide(1); // Jump to Slide 2 (Agenda / Modules)
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

        case 'm':
        case 'M':
          e.preventDefault();
          if (this.toggleMenu) this.toggleMenu();
          break;

        case 'Escape':
          document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
          if (this.isNotesOpen) this.toggleNotes();
          if (this.toggleMenu) this.toggleMenu(false);
          break;
      }
    });
  }

  setupTouchGestures() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.touchStartTime = 0;

    window.addEventListener('touchstart', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;
      this.touchStartTime = Date.now();
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;

      const target = e.target;
      if (target && target.closest && target.closest('button, a, input, select, textarea, .timelapse-track, .timelapse-thumb, .history-journey-modal, .interactive-el, .sound-modal, .header-menu-dropdown, .slide-grid-overlay, .audio-key, .voicing-slider')) {
        return;
      }

      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 45;
    const diffX = this.touchEndX - this.touchStartX;
    const diffY = this.touchEndY - this.touchStartY;
    const elapsed = Date.now() - (this.touchStartTime || 0);

    // Only recognize intentional horizontal swipes: under 800ms, >45px, predominantly horizontal
    if (elapsed < 800 && Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX < 0) {
        this.nextSlide(); // Swipe left -> next
      } else {
        this.prevSlide(); // Swipe right -> prev
      }
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

      // Pause timelapse if leaving slide 5
      if (this.currentSlideIndex === 4 && window.meuselwitzTimelapse) {
        window.meuselwitzTimelapse.pause();
      }

      // Stop slideshows if leaving history slide 3
      if (previousSlide.querySelector('#history-slide-body')) {
        previousSlide.querySelectorAll('.hero-image-slideshow').forEach(ss => {
          if (typeof ss._slideshowStop === 'function') ss._slideshowStop();
        });
      }
    }


    const fromIndex = this.currentSlideIndex;
    this.currentSlideIndex = index;
    const currentSlide = this.slides[this.currentSlideIndex];
    if (currentSlide) {
      currentSlide.classList.add('active');

      // Synchronize history timeline if entering slide 3
      if (currentSlide.querySelector('#history-slide-body') && window.rennerHistory) {
        if (fromIndex > index) {
          // Navigating backwards into history slide: position at final milestone
          window.rennerHistory.isStarted = true;
          window.rennerHistory.goToMilestone(window.rennerHistory.totalMilestones - 1);
        } else if (fromIndex < index) {
          // Navigating forwards into history slide: start completely dark!
          window.rennerHistory.resetToDarkState();
        }
      }

      // Synchronize Meuselwitz transformation journey if entering Umbau slide
      if (currentSlide.querySelector('#build-slide-body') && window.meuselwitzJourney) {
        if (fromIndex > index) {
          // Navigating backwards into transformation slide: position at final milestone
          window.meuselwitzJourney.isStarted = true;
          window.meuselwitzJourney.goToMilestone(window.meuselwitzJourney.totalMilestones - 1);
        } else if (fromIndex < index) {
          // Navigating forwards: fließender Übergang direkt zum ersten Meilenstein des Umbaus
          window.meuselwitzJourney.resetToDarkState();
          setTimeout(() => {
            if (this.currentSlideIndex === index && window.meuselwitzJourney && !window.meuselwitzJourney.isStarted) {
              window.meuselwitzJourney.startJourney();
            }
          }, 350);
        }
      }

      // Autoplay or prepare video if on slide
      const activeVideos = currentSlide.querySelectorAll('video');
      activeVideos.forEach(v => {
        const milestonePanel = v.closest('.tree-milestone-panel');
        if (milestonePanel && !milestonePanel.classList.contains('active')) return;
        if (v.classList.contains('hero-slideshow-video') && !v.classList.contains('active')) return;
        v.currentTime = 0;
        v.play().catch(() => {}); // Allow autoplay or user gesture
      });
    }

    this.updateHUD();
    this.updateNotes();
  }

  nextSlide() {
    const activeSlide = this.slides[this.currentSlideIndex];
    if (activeSlide && activeSlide.querySelector('#history-slide-body') && window.rennerHistory) {
      if (!window.rennerHistory.isStarted) {
        window.rennerHistory.startJourney();
        return;
      }
      if (window.rennerHistory.nextEra()) {
        return;
      }
    }
    if (activeSlide && activeSlide.querySelector('#build-slide-body') && window.meuselwitzJourney) {
      if (!window.meuselwitzJourney.isStarted) {
        window.meuselwitzJourney.startJourney();
        return;
      }
      if (window.meuselwitzJourney.nextEra()) {
        return;
      }
    }
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    const activeSlide = this.slides[this.currentSlideIndex];
    if (activeSlide && activeSlide.querySelector('#history-slide-body') && window.rennerHistory) {
      if (window.rennerHistory.isStarted && window.rennerHistory.currentMilestone === 0) {
        window.rennerHistory.resetToDarkState();
        return;
      }
      if (window.rennerHistory.prevEra()) {
        return;
      }
    }
    if (activeSlide && activeSlide.querySelector('#build-slide-body') && window.meuselwitzJourney) {
      if (window.meuselwitzJourney.isStarted && window.meuselwitzJourney.currentMilestone === 0) {
        window.meuselwitzJourney.resetToDarkState();
        return;
      }
      if (window.meuselwitzJourney.prevEra()) {
        return;
      }
    }
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
      const titleEl = currentSlide.querySelector('.slide-title') || currentSlide.querySelector('.hero-main-title');
      const breadcrumbEl = document.getElementById('slide-name-breadcrumb');
      if (breadcrumbEl && titleEl) {
        breadcrumbEl.textContent = titleEl.textContent;
      }
    }

    // Highlight active in grid modal
    document.querySelectorAll('.slide-grid-thumb').forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === this.currentSlideIndex);
    });

    // Highlight Slide 2 buttons if on Slide 2
    const isSlide2 = this.currentSlideIndex === 1;
    const headerModulesBtn = document.getElementById('header-jump-slide2-btn');
    if (headerModulesBtn) headerModulesBtn.classList.toggle('is-active-slide', isSlide2);
    const hudModulesBtn = document.getElementById('hud-jump-slide2-btn');
    if (hudModulesBtn) hudModulesBtn.classList.toggle('is-active-slide', isSlide2);
  }

  setCountryTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-country-theme', theme);
    document.body.setAttribute('data-country-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
  }

  setLanguage(lang, syncTheme = true) {
    this.currentLang = lang;
    document.documentElement.lang = lang;
    document.body.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Automatically synchronize country color theme unless overridden
    if (syncTheme) {
      this.setCountryTheme(lang);
    }

    this.updateLanguage(lang);
  }

  updateLanguage(lang) {
    const dict = translations[lang] || translations.de;
    
    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        if (typeof dict[key] === 'string' && dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update slide specific multi-language contents
    document.querySelectorAll(`[data-lang-content]`).forEach(el => {
      const elLang = el.getAttribute('data-lang-content');
      el.style.display = elLang === lang ? '' : 'none';
    });

    if (window.meuselwitzTimelapse) {
      window.meuselwitzTimelapse.setLanguage(lang);
    }

    if (window.rennerHistory) {
      window.rennerHistory.setLanguage(lang);
    }

    if (window.meuselwitzJourney) {
      window.meuselwitzJourney.setLanguage(lang);
    }

    this.updateHUD();
    this.updateNotes();
    this.setupSlideGrid();
  }


  setupSlideGrid() {
    const gridContainer = document.getElementById('slides-grid-view');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    this.slides.forEach((slide, idx) => {
      const titleEl = slide.querySelector('.slide-title') || slide.querySelector('.hero-main-title');
      const categoryEl = slide.querySelector('.slide-category');
      const title = titleEl ? titleEl.textContent : `Slide ${idx + 1}`;
      const category = categoryEl ? categoryEl.textContent : (idx === 0 ? 'Titelfolie' : '');

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

    zoneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const zone = btn.getAttribute('data-zone');
        zoneBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Trigger corresponding sound profile in audio synth
        if (window.rennerAudio) {
          if (zone === 'red' || zone === 'strike') window.rennerAudio.playNote('hard');
          else if (zone === 'purple') window.rennerAudio.playNote('soft');
          else if (zone === 'orange') window.rennerAudio.playNote('warm');
          else if (zone === 'green' || zone === 'shoulder') window.rennerAudio.playNote('concert');
          else if (zone === 'blue' || zone === 'cushion') window.rennerAudio.playNote('soft');
        }
      });
    });
  }

  setupNotesData() {
    // Detailed speaker notes for Clemens Kunert in 4 languages (DE, EN, JA, ZH)
    // Citing Renner Academy 2025 Masterclass Technical Principles & louis-renner.de History
    this.notesData = {
      0: {
        de: "Begrüßung des Publikums in Beijing / Toyohashi. Vorstellung von Clemens Kunert und der Louis Renner GmbH. Betonen Sie: 2025/2026 ist ein historischer Meilenstein durch die Konsolidierung aller Fertigungsschritte am hochmodernen Hauptsitz in Meuselwitz.",
        en: "Welcome the audience in Beijing / Toyohashi. Introduction of Clemens Kunert and Louis Renner GmbH. Emphasize that 2025/2026 marks a historic milestone with the consolidated modern headquarters in Meuselwitz.",
        ja: "北京・豊橋カンファレンスの皆様にご挨拶。クレメンス・クーネルトとルイス・レンナー社の紹介。モイゼルヴィッツ新本社への全工程統合という歴史的変革を強調。",
        zh: "欢迎各位北京与丰桥钢琴业界的贵宾。主讲人克莱门斯·库内特介绍德国雷诺公司。强调2025/2026年雷诺新总部在莫伊瑟尔维茨全面整合的划时代意义。"
      },
      1: {
        de: "Überblick über die 6 Kernmodule der Renner Masterclass 2025 geben: 1. Historie & Hauptsitz Meuselwitz, 2. Filzherstellung (FFW Wurzen seit 1783), 3. Hammerkopf-Fertigung & Roboterzuschnitt, 4. Musterteilekoffer & Stiele, 5. Maßblätter & Geometrie (Bohrwinkel in Gon), 6. Hohe Schule der Intonation (Uhrenmodell & 4 Keile).",
        en: "Provide an overview of the 6 core modules of the Renner Masterclass 2025: 1. History & Meuselwitz Headquarters, 2. Felt Manufacturing (FFW Wurzen since 1783), 3. Hammerhead Manufacturing & Robot Cutting, 4. Sample Parts Case & Shanks, 5. Measurement Sheets & Geometry (Drill Angles in Gon), 6. High Art of Voicing (Clock Model & 4 Wedges).",
        ja: "レンナー・マスタークラス2025の6つの主要モジュールの概要を説明：1. 歴史とモイゼルヴィッツ本社、2. フェルト製造（1783年創業FFWヴルツェン）、3. ハンマーヘッド製造とロボット切断、4. サンプルパーツケースとシャンク、5. 寸法図面と幾何学（グラード/Gon角度）、6. 整音の極意（時計文字盤モデルと4つのウェッジ）。",
        zh: "简要介绍2025年雷诺大师课的6大核心培训模块：1. 历史与莫伊瑟尔维茨新总部、2. 羊毛毡制造（源自1783年FFW乌尔岑）、3. 弦槌生产与机器人裁切、4. 样件箱与弦槌柄、5. 测量图纸与几何尺寸（Gon角度分度法）、6. 整音高等艺术（时钟模型与4大楔形区域）。"
      },
      2: {
        de: "140+ Jahre Historie (louis-renner.de): Heusteigstraße 1882 (schlaflose Nächte Louis Renners), Oscar Renner & Wilhelm Megenhardt 1902, 1906 Beginn der Hammerkopffertigung, 1911 Pioniertat mit Hunderten Einzel-Elektromotoren. Brandnacht 24./25. Juli 1944 und heroischer Wiederaufbau, Zweigwerk Östringen 1960, Rudolf Genger und der weltberühmte Renner-Katalog 1977, Gärtringen 2001, Meuselwitz 2011 und 2019 Steinway & Sons. Sie können mit den Epochentasten oder weiterklicken, um die 4 Epochen nacheinander vorzustellen.",
        en: "140+ Years of History (louis-renner.de): Heusteigstrasse 1882, Oscar Renner & Wilhelm Megenhardt 1902, in-house hammerhead production 1906, pioneer electrification with individual motors 1911. Bombing night July 1944 and heroic reconstruction, Östringen 1960, Rudolf Genger and the acclaimed Renner Catalog 1977, Gärtringen 2001, Meuselwitz 2011, and Steinway & Sons in 2019. Advance through the 4 epochs seamlessly via clicker or tabs.",
        ja: "創業140余年の歴史（louis-renner.de公式記録）：1882年ホイシュタイグ通りでの創業、1902年オスカー・レンナーへの継承、1906年ハンマーヘッド自社生産開始、1911年個別モーターによる電化革命。1944年7月の戦災全焼と不屈の復興、1960年エストリンゲン工場、1977年ルドルフ・ゲンガーによる世界標準パーツカタログ発刊、ゲルトリンゲン移転、2011年モイゼルヴィッツ、そして2019年スタインウェイ参入。4つの時代を順に解説。",
        zh: "雷诺140余年辉煌征程（官网权威档案）：1882年霍伊施泰希街创业，1902年奥斯卡·雷诺与威廉·梅根哈特接棒，1906年开启弦槌自主制造，1911年引入数百台独立电机单驱开创工业先河。1944年7月斯图加特大火浩劫与艰苦重建，1960年厄斯特林根分厂，1977年鲁道夫·根格尔创立全球配件中心与雷诺图册，2001年盖特林根，2011年莫伊瑟尔维茨核心基地，2019年加入施坦威。通过4个历史纪元娓娓道来。"
      },
      3: {
        de: "Zusammenlegung Gärtringen & Meuselwitz: Bisher Holzbearbeitung in Gärtringen und Montage in Meuselwitz. Nun ist alles unter einem voll klimatisierten Dach vereint. Bessere Qualitätskontrolle, schnellere Durchlaufzeiten und Ausbau der weltweiten Kapazitäten.",
        en: "Consolidation Gärtringen & Meuselwitz: Previously woodworking in Gärtringen and assembly in Meuselwitz. Now unified under one state-of-the-art climate-controlled roof. Optimized quality control and enhanced global capacity.",
        ja: "ゲルトリンゲンとモイゼルヴィッツの拠点統合：木工加工と組み立てを完全気候制御された新拠点に統合。品質管理とリードタイムの大幅な向上、世界供給能力の拡大。",
        zh: "盖特林根与莫伊瑟尔维茨两厂合并：以往木工粗加工与总装分离，现统一在全恒温恒湿新总部，实现最高质控标准、极速交付周期与全球产能扩充。"
      },
      5: {
        de: "Weickert-Filz & FFW Wurzen (Slide 6): 1783 von J.D. Weickert in Leipzig gegründet, 1847 erster Hammerkopffilz in Wurzen. Ausschließlich 100% Merinowolle ohne Säurekarbonisierung. Im Werk Meuselwitz ruhen alle Filzplatten im klimatisierten Feuchtelager.",
        en: "Weickert Felt & FFW Wurzen (Slide 6): Founded in 1783 by J.D. Weickert in Leipzig, 1847 first hammerhead felt in Wurzen. 100% Merino wool without acid carbonization. All felt boards stored in Meuselwitz humidity-controlled buffer.",
        ja: "ヴァイケルト・フェルトとFFWヴルツェン（スライド6）：1783年ライプツィヒで創業、1847年に世界基準のハンマーフェルトを開発。酸処理を行わない100%純メリノウール。モイゼルヴィッツ新工場の調湿保管庫で管理。",
        zh: "魏克特羊毛毡与FFW乌尔岑（第6页）：1783年创立于莱比锡，1847年制成首款现代标准钢琴羊毛毡。坚持纯物理梳理无强酸碳化。莫伊瑟尔维茨恒温恒湿缓冲库严格控制平衡含水率。"
      },
      8: {
        de: "Roboter-Zuschnitt (Slide 9 / Video 1): Weisen Sie auf den scherspannungsfreien Schnitt hin! Das Spezialmesser gleitet durch den dicken Filz, ohne die Faserrichtung zu stauchen. Perfekter Trapezwinkel für gleichmäßige Dehnung beim Pressen.",
        en: "Robot Felt Cutting (Slide 9 / Video 1): Emphasize the zero shear-stress cut! The knife slices through the felt without compressing fiber direction. Perfect trapezoidal angle for uniform tension during pressing.",
        ja: "ロボットフェルト切断（スライド9 / 動画1）：剪断応力ゼロの精密カットを強調。刃が繊維方向を潰さずスムーズに切断。プレス時に均一な張力を生み出す完璧な台形角。",
        zh: "机器人羊毛毡裁切（第9页 / 视频1）：强调无剪切应力的高精度裁切！刀刃平滑切过厚毡，绝不破坏毛鳞片排列与纤维取向，为后续压弯提供完美的梯形侧边。"
      },
      10: {
        de: "Holzkern Tonholzarten (Slide 11 / Video 3): Erläutern Sie die Dichtetabelle: Weißbuche (800-860 kg/m³, harter Anschlag, dynamische Obertöne) vs. Walnuss (590-680 kg/m³, warme Grundtönigkeit, geringe Trägheit für schnelle Repetition) und Mahagoni (490-750 kg/m³).",
        en: "Tonewood Selection (Slide 11 / Video 3): Explain specific weights: Hornbeam (800-860 kg/m³, brilliant overtones, concert grand standard) vs. Walnut (590-680 kg/m³, warm tone, low inertia for agile repetition) and Mahogany (490-750 kg/m³).",
        ja: "木芯材のトーンウッド分類（スライド11 / 動画3）：比重の違いを解説。白ブナ（800-860 kg/m³、明瞭な倍音、コンサート標準）対ウォルナット（590-680 kg/m³、温かい基音、低慣性による高速連打性能）、マホガニー（490-750 kg/m³）。",
        zh: "弦槌木芯选材（第11页 / 视频3）：详解密度参数：白山毛榉（800-860 kg/m³，坚硬透亮，大型音乐厅标配）对比胡桃木（590-680 kg/m³，基音浑厚，超低转动惯量赋予极速灵敏复奏），以及桃花心木（490-750 kg/m³）。"
      },
      16: {
        de: "Bohrungsberechnung & 90°-Gesetz (Slide 17): Betonen Sie die Renner Academy Formel: Bohrungslänge = (Saitenebene - Stielachse) - 3 mm Überstand! Der Hammer MUSS im 90°-Winkel treffen. Die 3 mm leiten Trägheit zum Steg. Winkel < 90° keilt zur Agraffe -> Saitenbruch!",
        en: "Boring Length Formula & 90° Rule (Slide 17): Highlight the Renner Academy formula: Boring Length = (String Plane - Shank Axis) - 3 mm overhang! Hammer MUST strike at 90°. 3 mm directs inertia into the bridge. Angle < 90° wedges to agraffe -> broken strings!",
        ja: "ボウリング長計算と90度打弦の法則（スライド17）：レンナー公式を強調。ボウリング長＝（弦面高－シャンク軸高）－3mmオーバーハング。必ず90度直角で打弦。3mmの突き出しが駒方向へ慣性伝達。90度未満はアグラフに突っ込み断線原因に！",
        zh: "钻孔计算与90°击弦定律（第17页）：强调雷诺学院官方计算公式：钻孔有效长度 =（弦平面高度 - 槌柄轴中心高度）- 3mm外伸量！弦槌必须以绝对90°角击弦，3mm外伸量引导冲量直达音桥，小于90°会向压弦条卡死并导致断弦！"
      },
      17: {
        de: "Musterteilekoffer MTK & 5 Tage Reifelagerung (Slide 18): 15 Hebeglieder, 12 Reiter, 16 Stiele, 15 Kapseln passend für alle Klaviere weltweit. Highlight: Im Werk Meuselwitz werden alle Stiele 5 Tage im Klimapuffer gelagert, um Eigenspannungen und Kapselreibung dauerhaft einzufrieren!",
        en: "Sample Part Case MTK & 5-Day Setting Storage (Slide 18): 15 whippens, 12 saddles, 16 shanks, 15 flanges for all pianos worldwide. Crucial quality step: Every shank assembly rests 5 days in Meuselwitz climate storage to eliminate stress and stabilize friction!",
        ja: "MTKサンプルケースと5日間調湿保管（スライド18）：世界中の全メーカーに対応する15種ウィッペン、12種サドル、16種シャンク。モイゼルヴィッツ工場では組み立て後、全品を5日間気候制御室で熟成保管し、内部応力を完全に除去！",
        zh: "MTK原厂样本箱与5天应力释放（第18页）：适配全球几乎所有品牌的15种联动杆、12种鞍座、16种槌柄。核心质控：在莫伊瑟尔维茨总装后，所有槌柄必须在恒温房静置5天，彻底释放木材与粘合应力，永久锁定微米级摩擦系数！"
      },
      18: {
        de: "Das RENNER YAMAHA-KIT (HIGHLIGHT! Slide 19): Fertig eingeleimt, 91°-Winkel kalibriert, Schweifung vollendet, FFW-Filz vorkonditioniert. Vorintonation entfällt komplett! Alte Schrauben lösen, Renner-Kit festschrauben – sofort spielbereit in Konzertqualität.",
        en: "The RENNER YAMAHA KIT (HIGHLIGHT! Slide 19): Fully pre-glued, 91° angle aligned, tails profiled, FFW felt pre-conditioned. Pre-voicing completely eliminated! Direct screw-in drop-in replacement in 45-60 min.",
        ja: "レンナー・ヤマハキット（最大のハイライト！スライド19）：完全接着済み、91度角度調整済み、テール成形済み、FFWフェルト予備整音済み。面倒な事前整音は不要！ボルトオンで即座にドイツ最高峰の響きへ。",
        zh: "雷诺雅马哈专用套件（全场核心亮点！第19页）：出厂预先胶合、91°倾角精准规整、槌尾CNC成形并打磨、FFW顶级毛毡预先活化。彻底免去数小时繁琐预整音！直接上螺丝锁紧，45分钟完成德系音乐厅级音色蜕变。"
      },
      19: {
        de: "Vergleich 20-Schritte vs. Yamaha-Kit (Slide 20): Traditionell: Handreibahle 1:50 (#43-0003409), 91°-Lehre (#43-0005650), Heißleimtopf, Japansäge, 3-Stufen-Schweifung = 4-6 Std. schwere Werkstattarbeit. Yamaha-Kit: 45 Min. absolut fehlerfrei!",
        en: "20-Step Benchwork vs. Yamaha Kit (Slide 20): Traditional: 1:50 reamer (#43-0003409), 91° gauge (#43-0005650), glue pot, Japanese saw, tail profiling = 4-6 hours benchwork. Yamaha Kit: 45 minutes of flawless precision drop-in!",
        ja: "20工程の手作業 vs ヤマハキット（スライド20）：従来はテーパーリーマー（#43-0003409）、91度ゲージ（#43-0005650）、膠鍋、胴付鋸、テール成形等4〜6時間の大作業。ヤマハキットならわずか45分で完璧な仕上がり！",
        zh: "20步传统繁复工艺 vs 雅马哈专用套件（第20页）：传统更换需用1:50锥度铰刀（#43-0003409）、91°倾角规（#43-0005650）、电热胶锅、日本细齿锯、3阶段槌尾打磨，耗时4-6小时且极易失误。雷诺套件仅需45分钟，零风险完美即装即用！"
      },
      20: {
        de: "Intonation Philosophie & Kruse-Axiom (Slide 21): Zitat Kruse: »Keine saubere Intonation ohne gute Regulierung!« Erklären Sie, dass Auslösung, Steigung und Tastentiefe exakt stimmen müssen, bevor die Intoniernadel zum Einsatz kommt.",
        en: "Voicing Philosophy & Kruse Axiom (Slide 21): Quote Kruse: 'No clean voicing without good regulation!' Explain that let-off, blow distance, and key dip must be perfectly regulated before applying needles.",
        ja: "整音の哲学とクルーゼの黄金律（スライド21）：「精密な整調なくして真の整音なし！」レットオフ、打弦距離、鍵盤深さが完璧に整って初めて針入れが効果を発揮することを力説。",
        zh: "整音哲学与克鲁泽黄金法则（第21页）：引述克鲁泽名言：“没有精密的整调，就没有纯正的整音！”开针之前，脱进距离、击弦行程与开键深度必须经过严苛整调，方能释放毛毡的内在张力。"
      },
      21: {
        de: "Uhrenmodell & 5 Dynamik-Keile (Slide 22): 12:00 Uhr Scheitel (Rote Zone = Niemals tief stechen!). Violett (pp), Orange (p), Grün (f), Blau (ff Tiefenvorintonation). 90°-Stichregel: Immer senkrecht zur Faserlage stechen, niemals hebeln!",
        en: "Clock Model & 5 Dynamic Wedges (Slide 22): 12:00 Crown (Red Zone = Never stitch deeply!). Purple (pp), Orange (p), Green (f), Blue (ff deep pre-voicing). 90° Rule: Always stitch perpendicular to felt layers, never pry!",
        ja: "時計モデルと5つのダイナミックウェッジ（スライド22）：12時打弦点（レッドゾーン＝絶対に深針厳禁！）。紫（pp）、橙（p）、緑（f）、青（ff深部予備整音）。90度ルール：常にフェルト層に対し垂直に刺し、決してこねないこと！",
        zh: "时钟分区模型与五大动态楔区（第22页）：12点槌顶（红色禁区＝绝不可深扎！）。紫色（极弱音pp）、橙色（弱音p）、绿色（强音f）、蓝色（极强音ff深层预整音）。90度垂直法则：针尖必须永远垂直于羊毛层理进针，切勿挑撬！"
      },
      22: {
        de: "Mechanische Vorbereitung vor Intonation (Slide 23): Saiten auf Steg- & Anhangstifte aufklopfen (bei 440 Hz+, Messing-Setzer, voller Saitensitz!), Saitennivellierung in der Agraffe, Hämmer mit Feilleiste auf Saiten abziehen (Hohlkehlen beseitigen).",
        en: "Mechanical Preparation before Voicing (Slide 23): String seating on bridge & hitch pins (at 440 Hz+, brass chisel, solid seating!), string leveling in agraffe, fine filing crowns to match unison strings.",
        ja: "整音前の機械的準備（スライド23）：駒ピン・ヒッチピンへの弦の密着打ち込み（440Hz以上、真鍮セッター使用）、アグラフ内での3本弦水平レベル出し、ヤスリによるクラウンの密着面均し（中凹みの修正）。",
        zh: "整音前的机械预备工序（第23页）：音桥销与挂弦销紧密击实沉底（音高440Hz以上，铜冲子与轻锤，确保无任何悬空！）、压弦条内同音弦组绝对水平找平、用砂纸板精细打磨槌顶弧度（消除中空或歪斜偏冠）。"
      },
      23: {
        de: "Mid-Voicing & Verschiebung (Slide 24): Chromatische Kontrolle aller 88 Töne. Kruse-Tipp für Verschiebung (Una Corda): Die linke Kante des Scheitels ganz leicht mit feiner Feile anfasen, um Geräusche zu eliminieren und den samtigen Una-Corda-Farbeffekt freizugeben!",
        en: "Mid-Voicing & Shift Pedal (Slide 24): Chromatic check across all 88 notes. Kruse's Pro Tip for Shift Pedal (Una Corda): Slightly break the left crown edge with fine sandpaper file to prevent noises and create a velvety una corda timbre!",
        ja: "中整音とシフトペダル整音（スライド24）：88鍵すべての半音階チェック。クルーゼ直伝・シフトペダル（ウナ・コルダ）の極意：クラウン左端のエッジを微細ヤスリで僅かに面取りすることで、雑音を防ぎ神秘的でビロードのような音色変化を実現！",
        zh: "半音平衡与左踏板（弱音踏板）整音（第24页）：88键半音阶逐音色调平衡。克鲁泽独门大师秘籍：用细砂纸轻微倒掉弦槌顶端左侧棱角，彻底消除踏板移动时的杂音，释放如丝绒般纯净神秘的Una Corda色彩变化！"
      }
    };
  }

  updateNotes() {
    const notesContent = document.getElementById('speaker-notes-content');
    if (!notesContent) return;

    const currentSlide = this.slides[this.currentSlideIndex];
    const slideNum = currentSlide ? currentSlide.getAttribute('data-slide') : (this.currentSlideIndex + 1);
    const dict = (typeof translations !== 'undefined' && translations[this.currentLang]) ? translations[this.currentLang] : (translations ? translations.de : {});

    // 1. Check translations dictionary: `s${slideNum}_notes`
    const noteKey = `s${slideNum}_notes`;
    if (dict && dict[noteKey]) {
      notesContent.innerHTML = `<p>${dict[noteKey]}</p>`;
      return;
    }

    // 2. Check legacy slide notes
    const slideNotes = this.notesData ? this.notesData[this.currentSlideIndex] : null;
    if (slideNotes) {
      const text = slideNotes[this.currentLang] || slideNotes.de;
      notesContent.innerHTML = `<p>${text}</p>`;
      return;
    }

    // 3. Fallback default
    const defaultText = {
      de: `Folie ${slideNum}: Präsentieren Sie die Inhalte und betonen Sie die deutsche Präzisionsfertigung von Louis Renner.`,
      en: `Slide ${slideNum}: Present the key highlights and emphasize Louis Renner's German precision craftsmanship.`,
      ja: `スライド ${slideNum}: ルイス・レンナー社のドイツ精密製造技術と品質の優位性を解説してください。`,
      zh: `第 ${slideNum} 页：向嘉宾介绍核心要点，重点阐述德国雷诺不可替代的高精机械与音色标准。`
    };
    notesContent.innerHTML = `<p>${defaultText[this.currentLang] || defaultText.de}</p>`;
  }
}

// Instantiate and initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
  window.presentation.init();
});
