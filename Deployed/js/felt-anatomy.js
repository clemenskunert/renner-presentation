/**
 * Louis Renner Presentation - Slide 11 Conical Felt Anatomy & Fleece Backbone Controller
 * Visualizes the conical thickness profile built from shortened central fleece webs
 * enclosed by 2x6 continuous outer fleece webs, vs. outer fiber severance from sanding.
 */

class FeltAnatomySimulation {
  constructor() {
    this.container = null;
    this.mode = 'intact'; // 'intact' or 'sanded'
    this.isAutoPlay = true;
    this.autoTimer = null;
    this.autoDuration = 6000; // 6.0s per state

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
    this.stage = document.getElementById('felt-anatomy-stage');
    this.autoIcon = this.container.querySelector('.auto-toggle-icon');
    this.tensionVal = document.getElementById('felt-tension-val');
    this.tensionMeter = document.getElementById('felt-tension-meter');
    this.statusDot = document.getElementById('felt-status-dot');
    this.statusText = document.getElementById('felt-status-text');

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

    if (this.stage) {
      this.stage.addEventListener('click', (e) => {
        if (e.target.closest('#felt-auto-toggle-btn')) return;
        e.stopPropagation();
        this.stopAutoPlay();
        this.setMode(this.mode === 'intact' ? 'sanded' : 'intact');
      });
    }

    window.addEventListener('languageChanged', () => {
      this.updateTexts();
    });

    this.setMode('intact', false);
    this.initSlideObserver();
  }

  initSlideObserver() {
    const slide11 = (this.container && this.container.closest('.slide')) || document.querySelector('.slide[data-slide="10"]');
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

    if (slide11.classList.contains('active') && this.isAutoPlay) {
      this.startAutoPlay();
    }
  }

  getDict() {
    const lang = this.currentLang
      || (window.presentation && window.presentation.currentLang)
      || (window.translations && window.translations.currentLang)
      || document.documentElement.lang
      || 'de';
    return (window.translations && window.translations[lang])
      || (window.slideTranslations && window.slideTranslations[lang])
      || (window.TRANSLATIONS_DATA && window.TRANSLATIONS_DATA[lang])
      || null;
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.updateTexts();
  }

  updateTexts() {
    const dict = this.getDict();
    const isIntact = this.mode === 'intact';

    if (this.tensionVal) {
      const sNum = (this.container && this.container.closest('.slide') && this.container.closest('.slide').getAttribute('data-slide')) || '10';
      const stateKey = isIntact ? `s${sNum}_anim_state_intact` : `s${sNum}_anim_state_sanded`;
      const fallback = isIntact ? 'Geschlossen' : 'Durchtrennt';
      this.tensionVal.setAttribute('data-i18n', stateKey);
      this.tensionVal.textContent = (dict && dict[stateKey]) || fallback;
    }

    if (this.statusText) {
      const sNum2 = (this.container && this.container.closest('.slide') && this.container.closest('.slide').getAttribute('data-slide')) || '10';
      const statusKey = isIntact ? `s${sNum2}_anim_status_intact` : `s${sNum2}_anim_status_sanded`;
      const fallback = isIntact
        ? 'Ungeschliffen: 2×6 Deckbahnen umschließen die gekürzten Kernbahnen • Voller Spannungserhalt'
        : 'Geschliffen: Äußere Vliesbahnen durchtrennt • Fasern gleiten unter Biegezug auseinander';
      this.statusText.setAttribute('data-i18n', statusKey);
      this.statusText.textContent = (dict && dict[statusKey]) || fallback;
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (!this.container) return;

    const isIntact = mode === 'intact';

    this.container.classList.toggle('is-intact', isIntact);
    this.container.classList.toggle('is-sanded', !isIntact);

    if (this.btnIntact) this.btnIntact.classList.toggle('active', isIntact);
    if (this.btnSanded) this.btnSanded.classList.toggle('active', !isIntact);

    if (this.tensionVal) {
      this.tensionVal.style.color = isIntact ? '#a7f3d0' : '#fca5a5';
    }

    if (this.statusDot) {
      this.statusDot.className = isIntact
        ? 'status-indicator-dot green'
        : 'status-indicator-dot red pulse';
    }

    if (this.statusText) {
      this.statusText.style.color = isIntact ? '#e2e8f0' : '#fecaca';
    }

    this.updateTexts();
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
      this.setMode(nextMode);
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

window.feltAnatomySim = new FeltAnatomySimulation();
