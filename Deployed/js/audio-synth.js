/**
 * Louis Renner Piano Sound & Overtone Synthesizer
 * Uses Web Audio API to demonstrate the harmonic spectrum differences
 * between unvoiced, concert voiced, and soft hammerheads.
 */

class RennerAudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.canvas = null;
    this.canvasCtx = null;
    this.animationId = null;
    this.currentProfile = 'concert'; // 'soft', 'concert', 'hard'
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    if (this.canvas) {
      this.canvasCtx = this.canvas.getContext('2d');
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play a simulated grand piano note (A4 = 440Hz or C4 = 261.63Hz)
   * with overtone distributions shaped by hammer felt stiffness.
   */
  playNote(profile = this.currentProfile, fundamental = 261.63) {
    this.ensureContext();
    this.currentProfile = profile;

    // Harmonic weight distributions based on hammerhead felt density:
    let harmonics;
    let decayTime = 2.5;

    if (profile === 'hard') {
      // Unvoiced / hard hammer: very bright, prominent 4th to 9th harmonics, harsh attack
      harmonics = [1.0, 0.85, 0.75, 0.70, 0.65, 0.55, 0.45, 0.35, 0.30];
      decayTime = 2.0;
    } else if (profile === 'soft') {
      // Over-voiced / soft felt: weak high overtones, muted attack, mostly fundamental
      harmonics = [1.0, 0.45, 0.20, 0.08, 0.03, 0.01];
      decayTime = 2.2;
    } else {
      // Renner Concert Standard (optimum balance): singing, rich 2nd-5th harmonics, sustained bloom
      harmonics = [1.0, 0.70, 0.55, 0.40, 0.30, 0.20, 0.12, 0.06];
      decayTime = 3.2;
    }

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.connect(this.analyser);

    // Initial percussive strike pulse (woody strike sound)
    const noiseBuffer = this.createHammerStrikeNoise();
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = profile === 'hard' ? 3200 : profile === 'soft' ? 900 : 1800;
    noiseFilter.Q.value = 1.8;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(profile === 'hard' ? 0.35 : 0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(now);

    // Additive harmonic oscillators for string vibrations
    harmonics.forEach((amp, idx) => {
      const harmFreq = fundamental * (idx + 1);
      if (harmFreq > 14000) return;

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      // Slight acoustic inharmonicity for piano strings
      const inharmonicity = 1 + (idx * idx * 0.0004);
      osc.frequency.setValueAtTime(harmFreq * inharmonicity, now);

      // Volume envelope: rapid attack, singing decay
      const harmAmp = amp * (0.35 / (idx * 0.4 + 1));
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(harmAmp, now + 0.005);

      // Higher harmonics decay faster than the fundamental
      const harmDecay = Math.max(0.6, decayTime / (idx * 0.5 + 1));
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + harmDecay);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decayTime + 0.1);
    });

    this.startVisualizer();
  }

  createHammerStrikeNoise() {
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  startVisualizer() {
    if (!this.canvas || !this.canvasCtx || !this.analyser) return;
    if (this.animationId) cancelAnimationFrame(this.animationId);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      const width = this.canvas.width;
      const height = this.canvas.height;
      this.canvasCtx.clearRect(0, 0, width, height);

      // Gradient background
      this.canvasCtx.fillStyle = 'rgba(10, 12, 16, 0.4)';
      this.canvasCtx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.9;

        // Color based on profile
        if (this.currentProfile === 'hard') {
          this.canvasCtx.fillStyle = `rgb(${180 + dataArray[i]/3}, 70, 70)`;
        } else if (this.currentProfile === 'soft') {
          this.canvasCtx.fillStyle = `rgb(60, 130, ${160 + dataArray[i]/3})`;
        } else {
          // Renner Concert Green & Gold
          this.canvasCtx.fillStyle = `rgb(31, ${164 + dataArray[i]/4}, 124)`;
        }

        this.canvasCtx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };
    draw();
  }
}

// Global instance
window.rennerAudio = new RennerAudioEngine();
