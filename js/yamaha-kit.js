/**
 * Louis Renner Presentation - Yamaha Kit Interactive Features (Chapter 4)
 * Presentation-optimized interactive behaviors:
 * 1. Web Audio piano strike sound simulation (A4 = 440 Hz) with string vibration
 * 2. 88-Key range zone selector (Bass, Mid, Treble)
 * 3. Animated time comparison bars on Slide 28
 */

(function () {
  'use strict';

  // --- 1. Soundwave Acoustic Trigger (Slide 29) ---
  window.triggerSoundwavePulse = function () {
    const stringEl = document.getElementById('ykVibratingString');
    const container = document.getElementById('ykSoundwaveContainer');

    if (stringEl) {
      stringEl.classList.remove('vibrating');
      void stringEl.offsetWidth; // Force reflow
      stringEl.classList.add('vibrating');
      setTimeout(() => {
        stringEl.classList.remove('vibrating');
      }, 3200);
    }

    if (container) {
      const ripple = document.createElement('div');
      ripple.className = 'yk-dynamic-ripple';
      ripple.style.position = 'absolute';
      ripple.style.top = '42%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.borderRadius = '50%';
      ripple.style.border = '2px solid #00d4ff';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-expand 2.5s ease-out forwards';
      container.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 2600);
    }

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
      const gains = [0.45, 0.22, 0.12, 0.06, 0.02];

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
  function initKeyboardSelector() {
    const bar = document.getElementById('ykKeyboardBar');
    if (!bar) return;

    const zones = bar.querySelectorAll('.yk-keyboard-zone');
    const descBass = document.getElementById('ykZoneDescBass');
    const descMid = document.getElementById('ykZoneDescMid');
    const descTreble = document.getElementById('ykZoneDescTreble');

    zones.forEach(zone => {
      zone.addEventListener('click', function () {
        zones.forEach(z => z.classList.remove('active'));
        this.classList.add('active');

        const zType = this.getAttribute('data-zone');
        [descBass, descMid, descTreble].forEach(el => {
          if (el) {
            el.style.opacity = '0.4';
            el.style.transform = 'scale(0.98)';
            el.style.transition = 'all 0.25s ease';
          }
        });

        if (zType === 'bass' && descBass) {
          descBass.style.opacity = '1';
          descBass.style.transform = 'scale(1.02)';
        } else if (zType === 'mid' && descMid) {
          descMid.style.opacity = '1';
          descMid.style.transform = 'scale(1.02)';
        } else if (zType === 'treble' && descTreble) {
          descTreble.style.opacity = '1';
          descTreble.style.transform = 'scale(1.02)';
        }
      });
    });
  }

  // --- 3. Time Comparison Animation Observer (Slide 28) ---
  function initTimeComparisonAnimation() {
    const slide28 = document.querySelector('section[data-slide="28"]');
    if (!slide28) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.yk-bar-fill, .time-progress-bar');
          fills.forEach(bar => {
            bar.style.width = '0%';
            setTimeout(() => {
              if (bar.classList.contains('red')) {
                bar.style.width = '100%';
              } else if (bar.classList.contains('green')) {
                bar.style.width = '12.5%';
              }
            }, 250);
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(slide28);
  }

  // Attach button listener on Slide 29
  function initAudioButton() {
    const btn = document.getElementById('ykPlayAudioBtn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.triggerSoundwavePulse();
      });
    }
  }

  // DOM Ready
  function initAll() {
    initKeyboardSelector();
    initTimeComparisonAnimation();
    initAudioButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
