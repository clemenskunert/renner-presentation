/**
 * Louis Renner Presentation - Slide 11 Felt Anatomy & Sanding Damage Controller
 * Demonstrates the 2x6 continuous fleece webs (structural backbone) and the
 * destructive effect of grinding/sanding on felt pre-tension.
 */

class FeltAnatomySimulation {
  constructor() {
    this.container = null;
    this.mode = 'intact'; // 'intact' or 'sanded'
    this.isAutoPlay = true;
    this.autoTimer = null;
    this.autoDuration = 5500; // 5.5s per state
    
    // Auto-init on DOMContentLoaded or immediately if ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.container = document.getElementById('s11-felt-anatomy');
    if (!this.container) return;

    this.btnIntact = document.getElementById('felt-btn-intact');
    this.btnSanded = document.getElementById('felt-btn-sanded');
    this.btnAuto = document.getElementById('felt-auto-toggle-btn');
    this.autoIcon = this.container.querySelector('.auto-toggle-icon');
    this.tensionVal = document.getElementById('felt-tension-val');
    this.tensionMeter = document.getElementById('felt-tension-meter');
    this.statusDot = document.getElementById('felt-status-dot');
    this.statusText = document.getElementById('felt-status-text');
    this.damageOverlay = document.getElementById('svg-sanding-damage');
    this.topVliesGroup = document.getElementById('svg-vlies-top');
    this.tensionVectors = document.getElementById('svg-tension-vectors');

    // Event Listeners
    if (this.btnIntact) {
      this.btnIntact.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.setMode('intact');
      });
    }

    if (this.btnSanded) {
      this.btnSanded.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopAutoPlay();
        this.setMode('sanded');
      });
    }

    if (this.btnAuto) {
      this.btnAuto.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleAutoPlay();
      });
    }

    // Set initial mode
    this.setMode('intact', false);

    // Slide Visibility Observer (start autoplay when Slide 11 is active)
    this.initSlideObserver();
  }

  initSlideObserver() {
    const slide11 = document.querySelector('.slide[data-slide="11"]');
    if (!slide11) return;

    const observer = new MutationObserver(() => {
      const isActive = slide11.classList.contains('active');
      if (isActive) {
        if (this.isAutoPlay && !this.autoTimer) {
          this.startAutoPlay();
        }
      } else {
        this.clearTimer();
      }
    });

    observer.observe(slide11, { attributes: true, attributeFilter: ['class'] });

    // Initial check if slide 11 is currently active
    if (slide11.classList.contains('active') && this.isAutoPlay) {
      this.startAutoPlay();
    }
  }

  setMode(mode, userInteraction = true) {
    this.mode = mode;
    if (!this.container) return;

    const isIntact = mode === 'intact';

    // Toggle container classes
    this.container.classList.toggle('is-intact', isIntact);
    this.container.classList.toggle('is-sanded', !isIntact);

    // Toggle button active states
    if (this.btnIntact) this.btnIntact.classList.toggle('active', isIntact);
    if (this.btnSanded) this.btnSanded.classList.toggle('active', !isIntact);

    // Get current language from translations if available
    const lang = (window.translations && window.translations.currentLang) || 'de';
    const tData = window.TRANSLATIONS_DATA && window.TRANSLATIONS_DATA[lang];

    if (isIntact) {
      // 1. Tension KPI
      if (this.tensionVal) {
        this.tensionVal.textContent = '100%';
        this.tensionVal.style.color = '#86efac';
      }
      if (this.tensionMeter) {
        this.tensionMeter.style.width = '100%';
        this.tensionMeter.style.background = 'linear-gradient(90deg, #10b981, #22c55e)';
        this.tensionMeter.style.boxShadow = '0 0 10px rgba(34, 197, 94, 0.6)';
      }

      // 2. Status Dot & Text
      if (this.statusDot) {
        this.statusDot.className = 'status-indicator-dot green';
      }
      if (this.statusText) {
        const text = (tData && tData.s11_anim_status_intact) ||
          '✓ 2×6 Vliesbahnen intakt: Strukturelles Rückgrat sichert volle Biegespannung';
        this.statusText.textContent = text;
        this.statusText.style.color = '#e2e8f0';
      }

      // 3. SVG Elements
      if (this.damageOverlay) {
        this.damageOverlay.style.opacity = '0';
        this.damageOverlay.style.pointerEvents = 'none';
      }
      if (this.topVliesGroup) {
        this.topVliesGroup.classList.remove('is-cut');
      }
      if (this.tensionVectors) {
        this.tensionVectors.classList.remove('is-broken');
      }

    } else {
      // Sanded / Damaged mode
      // 1. Tension KPI (Drop from 100% to 20%)
      if (this.tensionVal) {
        this.tensionVal.textContent = '20%';
        this.tensionVal.style.color = '#f87171';
      }
      if (this.tensionMeter) {
        this.tensionMeter.style.width = '20%';
        this.tensionMeter.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        this.tensionMeter.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.7)';
      }

      // 2. Status Dot & Text
      if (this.statusDot) {
        this.statusDot.className = 'status-indicator-dot red pulse';
      }
      if (this.statusText) {
        const text = (tData && tData.s11_anim_status_sanded) ||
          '✗ Vliesbahnen gekappt: Zerstörung des Rückgrats • Totaler Spannungsverlust!';
        this.statusText.textContent = text;
        this.statusText.style.color = '#fca5a5';
      }

      // 3. SVG Elements
      if (this.damageOverlay) {
        this.damageOverlay.style.opacity = '1';
        this.damageOverlay.style.pointerEvents = 'auto';
      }
      if (this.topVliesGroup) {
        this.topVliesGroup.classList.add('is-cut');
      }
      if (this.tensionVectors) {
        this.tensionVectors.classList.add('is-broken');
      }
    }
  }

  toggleAutoPlay() {
    if (this.isAutoPlay) {
      this.stopAutoPlay();
    } else {
      this.isAutoPlay = true;
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.clearTimer();
    this.isAutoPlay = true;
    if (this.btnAuto) {
      this.btnAuto.classList.add('active');
      if (this.autoIcon) this.autoIcon.textContent = '⏸';
    }

    this.autoTimer = setInterval(() => {
      const nextMode = this.mode === 'intact' ? 'sanded' : 'intact';
      this.setMode(nextMode, false);
    }, this.autoDuration);
  }

  stopAutoPlay() {
    this.clearTimer();
    this.isAutoPlay = false;
    if (this.btnAuto) {
      this.btnAuto.classList.remove('active');
      if (this.autoIcon) this.autoIcon.textContent = '▶';
    }
  }

  clearTimer() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }
}

// Global instance
window.feltAnatomySim = new FeltAnatomySimulation();
