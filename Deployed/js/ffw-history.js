/**
 * Louis Renner Presentation - FFW Wurzen Firmengeschichte (Slide 5 Controller)
 * Manages interactive milestones, autoplay timeline, and felt texture macro zoom.
 */

class FFWFirmengeschichte {
  constructor() {
    this.currentMilestone = 0;
    this.totalMilestones = 6;
    this.isAutoplay = false;
    this.autoplayDuration = 6000; // 6s per milestone in autoplay
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

    // Auto-init on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.slideEl = document.querySelector('.slide[data-slide="5"]');
    if (!this.slideEl) return;

    this.tabs = Array.from(this.slideEl.querySelectorAll('.ffw-epoch-tab'));
    this.panels = Array.from(this.slideEl.querySelectorAll('.ffw-milestone-panel'));
    this.prevBtn = this.slideEl.querySelector('#ffw-prev-btn');
    this.nextBtn = this.slideEl.querySelector('#ffw-next-btn');
    this.playBtn = this.slideEl.querySelector('#ffw-play-btn');
    this.playProgressBar = this.slideEl.querySelector('#ffw-play-progress');
    this.stepCounter = this.slideEl.querySelector('#ffw-step-counter');
    this.textureViewer = this.slideEl.querySelector('#ffw-texture-viewer');
    this.zoomBtn = this.slideEl.querySelector('#ffw-zoom-toggle-btn');
    this.textureImg = this.slideEl.querySelector('#ffw-texture-img');

    // Tab clicks
    this.tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        this.stopAutoplay();
        this.goToMilestone(idx);
      });
    });

    // Step buttons
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

    // Autoplay button
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.toggleAutoplay();
      });
    }

    // Macro zoom toggle on felt texture
    if (this.textureViewer) {
      this.textureViewer.addEventListener('click', (e) => {
        // Prevent click if clicking zoom button specifically handled
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
        this.toggleZoom();
      });
    }

    // Initial state
    this.goToMilestone(0);
  }

  goToMilestone(index) {
    if (index < 0 || index >= this.totalMilestones) return;
    this.currentMilestone = index;

    // Update tabs
    this.tabs.forEach((tab, idx) => {
      const isActive = idx === this.currentMilestone;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update panels
    this.panels.forEach((panel, idx) => {
      const isActive = idx === this.currentMilestone;
      panel.classList.toggle('active', isActive);
    });

    // Update counter
    if (this.stepCounter) {
      this.stepCounter.textContent = `${this.currentMilestone + 1} / ${this.totalMilestones}`;
    }

    // Update nav button disabled states
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentMilestone === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentMilestone === this.totalMilestones - 1;
    }
  }

  nextMilestone() {
    if (this.currentMilestone < this.totalMilestones - 1) {
      this.goToMilestone(this.currentMilestone + 1);
    } else if (this.isAutoplay) {
      // Loop back to start in autoplay
      this.goToMilestone(0);
    }
  }

  nextMilestoneWithResult() {
    if (this.currentMilestone < this.totalMilestones - 1) {
      this.stopAutoplay();
      this.goToMilestone(this.currentMilestone + 1);
      return true;
    }
    return false;
  }

  prevMilestone() {
    if (this.currentMilestone > 0) {
      this.goToMilestone(this.currentMilestone - 1);
    }
  }

  prevMilestoneWithResult() {
    if (this.currentMilestone > 0) {
      this.stopAutoplay();
      this.goToMilestone(this.currentMilestone - 1);
      return true;
    }
    return false;
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
    this.autoplayStartTime = performance.now();
    this.runAutoplayLoop();
  }

  stopAutoplay() {
    this.isAutoplay = false;
    if (this.autoplayRaf) {
      cancelAnimationFrame(this.autoplayRaf);
      this.autoplayRaf = null;
    }
    if (this.playBtn) {
      this.playBtn.classList.remove('playing');
      const icon = this.playBtn.querySelector('.ffw-play-icon');
      if (icon) icon.textContent = '▶';
    }
    if (this.playProgressBar) {
      this.playProgressBar.style.width = '0%';
    }
  }

  runAutoplayLoop() {
    if (!this.isAutoplay) return;

    const step = (now) => {
      if (!this.isAutoplay) return;
      const elapsed = now - this.autoplayStartTime;
      const progress = Math.min(1, elapsed / this.autoplayDuration);

      if (this.playProgressBar) {
        this.playProgressBar.style.width = `${progress * 100}%`;
      }

      if (progress >= 1) {
        this.nextMilestone();
        this.autoplayStartTime = performance.now();
      }

      this.autoplayRaf = requestAnimationFrame(step);
    };

    this.autoplayRaf = requestAnimationFrame(step);
  }

  toggleZoom(e) {
    this.isZoomed = !this.isZoomed;
    if (this.textureViewer) {
      this.textureViewer.classList.toggle('is-zoomed', this.isZoomed);
    }
    if (this.zoomBtn) {
      this.zoomBtn.classList.toggle('active', this.isZoomed);
      this.zoomBtn.textContent = this.isZoomed ? '✕ Normal' : '🔍 Faser-Lupe';
    }
    if (this.textureImg && !this.isZoomed) {
      this.textureImg.style.transformOrigin = 'center center';
    }
  }
}

// Global instance
window.ffwHistory = new FFWFirmengeschichte();
