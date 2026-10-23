/**
 * Louis Renner Presentation - Yamaha Kit Stage Controller (Slide 27)
 * Implements the interactive stage layout matching Folie 5 (FFW History):
 * - Epoch/Topic tabs navigation
 * - Milestone stage panels with fade transition
 * - Stepper controls (Prev, Next, Step Counter)
 * - Autoplay tour with progress indicator
 * - Macro texture/product zoom viewer on right spotlight card
 */

class YamahaKitStage {
  constructor() {
    this.currentMilestone = 0;
    this.totalMilestones = 5;
    this.isAutoplay = false;
    this.autoplayDuration = 6000; // 6s per panel in autoplay
    this.autoplayRaf = null;
    this.autoplayStartTime = null;
    this.isZoomed = false;

    this.slideEl = null;
    this.tabs = [];
    this.panels = [];
    this.prevBtn = null;
    this.nextBtn = null;
    this.playBtn = null;
    this.playProgressBar = null;
    this.stepCounter = null;
    this.textureViewer = null;
    this.zoomBtn = null;
    this.textureImg = null;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.slideEl = document.querySelector('.slide[data-slide="27"]');
    if (!this.slideEl) return;

    this.tabs = Array.from(this.slideEl.querySelectorAll('#yk-epoch-tabs .ffw-epoch-tab'));
    this.panels = Array.from(this.slideEl.querySelectorAll('#yk-stage-card .ffw-milestone-panel'));
    this.prevBtn = this.slideEl.querySelector('#yk-prev-btn');
    this.nextBtn = this.slideEl.querySelector('#yk-next-btn');
    this.playBtn = this.slideEl.querySelector('#yk-play-btn');
    this.playProgressBar = this.slideEl.querySelector('#yk-play-progress');
    this.stepCounter = this.slideEl.querySelector('#yk-step-counter');
    this.textureViewer = this.slideEl.querySelector('#yk-texture-viewer');
    this.zoomBtn = this.slideEl.querySelector('#yk-zoom-toggle-btn');
    this.textureImg = this.slideEl.querySelector('#yk-texture-img');

    // Tab click listeners
    this.tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        this.stopAutoplay();
        this.goToMilestone(idx);
      });
    });

    // Prev / Next button listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.stopAutoplay();
        this.prevMilestone();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.stopAutoplay();
        this.nextMilestone();
      });
    }

    // Play / Autoplay button
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.toggleAutoplay();
      });
    }

    // Macro zoom viewer on right card
    if (this.textureViewer) {
      this.textureViewer.addEventListener('click', (e) => {
        this.toggleZoom(e);
      });

      this.textureViewer.addEventListener('mousemove', (e) => {
        if (!this.isZoomed || !this.textureImg) return;
        const rect = this.textureViewer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.textureImg.style.transformOrigin = `${x}% ${y}%`;
      });

      this.textureViewer.addEventListener('mouseleave', () => {
        if (this.textureImg) {
          this.textureImg.style.transformOrigin = 'center center';
        }
      });
    }

    if (this.zoomBtn) {
      this.zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleZoom(e);
      });
    }

    // Initial state
    this.updateUI();
  }

  goToMilestone(index) {
    if (index < 0 || index >= this.totalMilestones) return;
    this.currentMilestone = index;
    this.updateUI();
  }

  nextMilestone() {
    if (this.currentMilestone < this.totalMilestones - 1) {
      this.goToMilestone(this.currentMilestone + 1);
    } else if (this.isAutoplay) {
      this.stopAutoplay();
    }
  }

  prevMilestone() {
    if (this.currentMilestone > 0) {
      this.goToMilestone(this.currentMilestone - 1);
    }
  }

  updateUI() {
    // 1. Update Tabs
    this.tabs.forEach((tab, idx) => {
      const isActive = idx === this.currentMilestone;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // 2. Update Panels with animation
    this.panels.forEach((panel, idx) => {
      const isActive = idx === this.currentMilestone;
      panel.classList.toggle('active', isActive);
    });

    // 3. Update Step Counter
    if (this.stepCounter) {
      this.stepCounter.textContent = `${this.currentMilestone + 1} / ${this.totalMilestones}`;
    }

    // 4. Update Prev/Next buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentMilestone === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentMilestone === this.totalMilestones - 1;
    }
  }

  toggleAutoplay() {
    if (this.isAutoplay) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  startAutoplay() {
    this.isAutoplay = true;
    if (this.playBtn) {
      this.playBtn.classList.add('playing');
      const icon = this.playBtn.querySelector('.ffw-play-icon');
      if (icon) icon.textContent = '⏸';
    }
    this.runAutoplayStep();
  }

  stopAutoplay() {
    this.isAutoplay = false;
    if (this.autoplayRaf) {
      cancelAnimationFrame(this.autoplayRaf);
      this.autoplayRaf = null;
    }
    if (this.playProgressBar) {
      this.playProgressBar.style.width = '0%';
    }
    if (this.playBtn) {
      this.playBtn.classList.remove('playing');
      const icon = this.playBtn.querySelector('.ffw-play-icon');
      if (icon) icon.textContent = '▶';
    }
  }

  runAutoplayStep() {
    if (!this.isAutoplay) return;
    this.autoplayStartTime = performance.now();

    const loop = (now) => {
      if (!this.isAutoplay) return;
      const elapsed = now - this.autoplayStartTime;
      const progress = Math.min(100, (elapsed / this.autoplayDuration) * 100);

      if (this.playProgressBar) {
        this.playProgressBar.style.width = `${progress}%`;
      }

      if (elapsed >= this.autoplayDuration) {
        if (this.currentMilestone < this.totalMilestones - 1) {
          this.nextMilestone();
          this.runAutoplayStep();
        } else {
          this.stopAutoplay();
        }
      } else {
        this.autoplayRaf = requestAnimationFrame(loop);
      }
    };

    this.autoplayRaf = requestAnimationFrame(loop);
  }

  toggleZoom(e) {
    if (e) e.preventDefault();
    this.isZoomed = !this.isZoomed;

    if (this.textureViewer) {
      this.textureViewer.classList.toggle('zoomed', this.isZoomed);
    }
    if (this.textureImg) {
      this.textureImg.style.transform = this.isZoomed ? 'scale(2.2)' : 'scale(1)';
      if (!this.isZoomed) {
        this.textureImg.style.transformOrigin = 'center center';
      }
    }
    if (this.zoomBtn) {
      this.zoomBtn.textContent = this.isZoomed ? '✕ Schließen' : '🔍 Detail-Lupe';
    }
  }
}

// Global initialization
window.YamahaKitController = new YamahaKitStage();
