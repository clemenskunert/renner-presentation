/**
 * Louis Renner Presentation - Yamaha Kit Interactive Features (Chapter 4)
 * Provides interactive soundwave visualization, time-comparison toggle,
 * and 88-key range explorer.
 */

(function () {
  'use strict';

  // --- 1. Soundwave Acoustic Trigger (Slide 29) ---
  window.triggerSoundwavePulse = function () {
    const container = document.querySelector('.soundwave-hero-container');
    if (!container) return;

    // Trigger visual pulse animation
    container.classList.remove('pulse-active');
    void container.offsetWidth; // Force reflow
    container.classList.add('pulse-active');

    // Create dynamic acoustic ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'soundwave-ripple-wave dynamic';
    ripple.style.width = '30px';
    ripple.style.height = '12px';
    ripple.style.borderColor = '#00d4ff';
    container.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 2500);

    // Audio synth trigger: Play warm piano note A4 (440Hz) with harmonics if AudioContext is available
    playYamahaConcertTone();
  };

  function playYamahaConcertTone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = window._rennerAudioCtx || new AudioCtx();
      window._rennerAudioCtx = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Fundamental A4 (440Hz) + Warm Piano Harmonics
      const freqs = [440, 880, 1320, 1760, 2200];
      const gains = [0.4, 0.22, 0.12, 0.06, 0.02];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[idx], now);
        // Exponential decay simulating piano hammer strike
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.2);
      });
    } catch (e) {
      console.warn('[YAMAHA-KIT] Audio synthesis note failed:', e);
    }
  }

  // --- 2. 88-Key Range Explorer (Slide 31) ---
  const ZONE_DATA = {
    bass: {
      range: 'Noten 1 – 26 (Subkontra A bis h)',
      title: 'Bassbereich: Maximale Masse & Resonanz',
      desc: 'Breite Nussbaumkerne mit speziellem Schrägwinkel zur Saitenebene. Großvolumiger Wurzen-Filz erzeugt ein warmes, tragfähiges Bassfundament.',
      specs: 'Kernbreite: 11,2 mm · Schrägwinkel: 7° – 9° · Röllchenabstand: 17,0 mm'
    },
    mid: {
      range: 'Noten 27 – 59 (c bis d\'\'\')',
      title: 'Mittellage: Homogener Registerübergang',
      desc: 'Fließende Verjüngung der Kernholzbreite und kontinuierliche Abstufung der Filzelastizität. Garantiert bruchlosen Übergang ohne klangliche Brüche.',
      specs: 'Kernbreite: 10,5 mm – 10,0 mm · Schrägwinkel: 0° (gerade) · Röllchenabstand: 17,0 mm'
    },
    treble: {
      range: 'Noten 60 – 88 (dis\'\'\' bis c\'\'\'\')',
      title: 'Diskant: Silbrige Glockenbrillanz',
      desc: 'Schlanke Hammerform mit maximaler Faserdichte an der Krone. Kurze Anschlagzeit und minimale Dämpfung für perlende, langanhaltende Obertöne.',
      specs: 'Kernbreite: 9,5 mm – 9,0 mm · Maximale Walkhärte · Röllchenabstand: 17,0 mm'
    }
  };

  window.selectRangeZone = function (zoneKey, btnEl) {
    const data = ZONE_DATA[zoneKey];
    if (!data) return;

    // Update active button state
    document.querySelectorAll('.range-zone-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    // Update display panel
    const titleEl = document.getElementById('range-zone-display-title');
    const descEl = document.getElementById('range-zone-display-desc');
    const specsEl = document.getElementById('range-zone-display-specs');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (specsEl) specsEl.textContent = data.specs;
  };

  // --- 3. Time Comparison Animation Observer (Slide 28) ---
  function initTimeComparisonAnimation() {
    const slide28 = document.querySelector('section[data-slide="28"]');
    if (!slide28) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.time-progress-bar');
          bars.forEach(bar => {
            bar.style.width = '0%';
            setTimeout(() => {
              if (bar.classList.contains('red')) {
                bar.style.width = '100%';
              } else if (bar.classList.contains('green')) {
                bar.style.width = '12.5%';
              }
            }, 200);
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(slide28);
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeComparisonAnimation);
  } else {
    initTimeComparisonAnimation();
  }
})();
