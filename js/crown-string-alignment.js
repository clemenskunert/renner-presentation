/**
 * Louis Renner Masterclass Presentation
 * Slide 29 (Chapter 5): Aligning Hammerhead Crown (Scheitel) & 3-String Plane (Saitenebene)
 * - 90°-Rotated Hammerhead Front/Crown View (pure wool felt, zero visible core, strings parallel to felt grain)
 * - Live Wave Superposition & Phase Shift (S1 + S2 + S3 -> Sum Wave Σ, Constructive vs. Cancellation / Auslöschung)
 * - Direct Effect on Partial Structure H1..H12 (Comb-Filter Cancellation Notches in dB)
 * - Real-time 3-String Time-Delayed Web Audio Unison Synthesizer (A3 = 220 Hz, 3-choir plain steel)
 * - Full 4-Language Localization (DE, EN, JA, ZH) + Desktop Mouse & iPad Touch Support
 */

(function () {
  'use strict';

  const F0_HZ = 220;            // A3 (220 Hz) — classic 3-choir plain steel unison register
  const CHOIR_HALF_SPAN_MM = 4.2; // S1 = -4.2 mm, S2 = 0.0 mm, S3 = +4.2 mm (8.4 mm total choir width)
  const EFF_STRIKE_VEL = 0.90;  // Effective crown contact approach velocity (mm / ms) in mp-mf check

  const PARTIALS_BASE = [
    { n: 1,  noteDe: 'A₃',    noteInt: 'A₃',    freq: 220,  baseDb:  4.0 },
    { n: 2,  noteDe: 'A₄',    noteInt: 'A₄',    freq: 440,  baseDb:  1.2 },
    { n: 3,  noteDe: 'E₅',    noteInt: 'E₅',    freq: 660,  baseDb: -1.8 },
    { n: 4,  noteDe: 'A₅',    noteInt: 'A₅',    freq: 880,  baseDb: -4.4 },
    { n: 5,  noteDe: 'Cis₆',  noteInt: 'C#₆',   freq: 1100, baseDb: -6.8 },
    { n: 6,  noteDe: 'E₆',    noteInt: 'E₆',    freq: 1320, baseDb: -9.0 },
    { n: 7,  noteDe: 'G₆−',   noteInt: 'G₆−',   freq: 1540, baseDb: -11.5 },
    { n: 8,  noteDe: 'A₆',    noteInt: 'A₆',    freq: 1760, baseDb: -10.8 },
    { n: 9,  noteDe: 'H₆',    noteInt: 'B₆',    freq: 1980, baseDb: -14.0 },
    { n: 10, noteDe: 'Cis₇',  noteInt: 'C#₇',   freq: 2200, baseDb: -16.8 },
    { n: 11, noteDe: 'Dis₇−', noteInt: 'D#₇−',  freq: 2420, baseDb: -19.2 },
    { n: 12, noteDe: 'E₇',    noteInt: 'E₇',    freq: 2640, baseDb: -21.0 }
  ];

  const PRESETS = {
    ideal:   { tiltDeg: 0.0, planeMm: 0.00, hollowMm: 0.00, preferredN: 6 },
    tilted:  { tiltDeg: 2.3, planeMm: 0.00, hollowMm: 0.00, preferredN: 8 },
    uneven:  { tiltDeg: 0.0, planeMm: 0.34, hollowMm: 0.00, preferredN: 6 },
    hollow:  { tiltDeg: 0.0, planeMm: 0.00, hollowMm: 0.32, preferredN: 6 }
  };

  const I18N = {
    de: {
      geoTitle: 'Frontansicht (90°): Scheitel ↔ 3er-Chor',
      planeRef: 'Saitenebene (Soll)',
      strNames: ['S₁ Links', 'S₂ Mitte', 'S₃ Rechts'],
      crownLbl: 'Hammerkopf-Scheitel',
      feltGrainLbl: '↑ Filzverlauf ∥ Saitenverlauf',
      syncHit: '✓ Simultaner Kontakt (Δt = 0,00 ms)',
      asyncHit: (dt) => `✕ Zeitversatz Δt = ${dt} ms`,
      waveBadgeSync: '✓ PHASENGLEICH (KONSTRUKTIV)',
      waveBadgeCancel: (phi) => `✕ PHASENVERSCHOBEN (bis ${phi}°)`,
      sumWaveLbl: 'Summenwelle Σ (S₁+S₂+S₃)',
      idealEnvLbl: 'Ideal (3× in Phase)',
      indivLbl: 'Einzelsaiten S₁ · S₂ · S₃',
      phasorLbl: 'Phasenlage',
      ampRetained: (pct) => `Summen-Amplitude: ${pct} %`,
      specLegend: '--- Ideal (0° Phase)   |   Grün: Phasenrein   |   Orange/Rot: Phasen-Auslöschung (ΔdB)',
      roSelected: (n, note, f, phiMax) => `H${n} · ${note} (${f} Hz) · Phasenversatz Δφ = ${phiMax}°`,
      roLossSync: '±0,0 dB · Konstruktive Addition (100 % Σ)',
      roLossVal: (db, pct) => `${db} dB Auslöschung (${pct} % Restamplitude)`,
      tiltValZero: '0,0° · Parallel zur Saitenebene',
      tiltVal: (deg) => `${deg > 0 ? '+' : ''}${deg}° · Schiefer Scheitel`,
      planeValZero: '0,00 mm · Chor exakt nivelliert',
      planeValUneven: (mm) => `${mm} mm · Saite S₃ steht höher`,
      planeValHollow: (mm) => `${mm} mm · Hohlkehle (S₂ später)`,
      kpiDtZero: '0,00 ms',
      kpiDtSubOk: 'Alle 3 Saiten gleichzeitig',
      kpiDtSubBad: 'Gestaffelter Saitenkontakt',
      kpiCancelNone: 'Keine (0,0 dB)',
      kpiCancelSubOk: 'Kein Kammfilter-Einbruch',
      kpiCancelVal: (n, db) => `H${n} (${db} dB)`,
      kpiCancelSubBad: 'Destruktive Wellenüberlagerung',
      kpiCohSubOk: '3× Einzelwelle in Phase',
      kpiCohSubBad: 'Energieverlust & Schwebung',
      states: {
        ideal: {
          badge: '✦ SOLL-ZUSTAND • PLAN & PARALLEL',
          title: 'Alle 3 Chorsaiten starten exakt in Phase (Δt = 0 ms, Δφ = 0°)',
          body: 'Treffen abgezogener Scheitel und nivellierter 3er-Saitenchor exakt parallel aufeinander, addieren sich alle drei Wellen konstruktiv zur 3-fachen Amplitude.',
          rule: '<strong>Klangwirkung:</strong> Tragendes Fundament (H₁–H₄) und strahlendes Obertonspektrum ohne Kammfilter-Kerben.'
        },
        tilted: {
          badge: '✕ FEHLERBILD 1 • SCHIEFER SCHEITEL',
          title: 'Gestaffelter Anschlag (S₁ → S₂ → S₃) löscht Obertöne aus',
          body: 'Ein schiefer Scheitel regt S₁ → S₂ → S₃ zeitversetzt an. Bei höheren Teiltönen erreicht Δφ 120°–240°: Wellenberg trifft auf Wellental!',
          rule: '<strong>Folge &amp; Abhilfe:</strong> Metallisches Sirren &amp; Obertonlöcher. Erst Hammerflucht richten und Scheitel plan abziehen!'
        },
        uneven: {
          badge: '✕ FEHLERBILD 2 • UNGLEICHE SAITENEBENE IM CHOR',
          title: 'Eine versetzte Saite arbeitet in Gegenphase (180°) gegen den Chor',
          body: 'Steht eine Saite an Agraffe oder Steg nur 0,2–0,3 mm höher/tiefer, schwingt sie verzögert und löscht bei Δφ ≈ 180° die Nachbarsaiten aus.',
          rule: '<strong>Folge &amp; Abhilfe:</strong> Hohler Ton &amp; falsche Schwebungen trotz reiner Stimmung. Erst Saiten an Agraffen und Stegstiften nivellieren!'
        },
        hollow: {
          badge: '✕ FEHLERBILD 3 • HOHLKEHLE / EINGESPIELTE RILLEN',
          title: 'Äußere Saiten führen — Mittelsaite hinkt phasenverschoben nach',
          body: 'Randsaiten S₁ und S₃ klingen zuerst, Mittelsaite S₂ folgt verspätet und schwach — fällt im pp aus und löscht im Forte gegenphasig aus.',
          rule: '<strong>Goldene Regel:</strong> Keine Nadel heilt Phasenauslöschung — erst den Scheitel sauber abziehen (Körnung 320–400)!'
        }
      }
    },

    en: {
      geoTitle: 'Front View (90°): Crown ↔ 3-String Choir',
      planeRef: 'String Plane (Target)',
      strNames: ['S₁ Left', 'S₂ Center', 'S₃ Right'],
      crownLbl: 'Hammerhead Crown',
      feltGrainLbl: '↑ Felt grain ∥ string direction',
      syncHit: '✓ Simultaneous Contact (Δt = 0.00 ms)',
      asyncHit: (dt) => `✕ Strike Delay Δt = ${dt} ms`,
      waveBadgeSync: '✓ IN PHASE (CONSTRUCTIVE)',
      waveBadgeCancel: (phi) => `✕ PHASE SHIFTED (up to ${phi}°)`,
      sumWaveLbl: 'Sum Wave Σ (S₁+S₂+S₃)',
      idealEnvLbl: 'Ideal (3× In-Phase)',
      indivLbl: 'Individual Strings S₁ · S₂ · S₃',
      phasorLbl: 'Phase Vectors',
      ampRetained: (pct) => `Summed Amplitude: ${pct}%`,
      specLegend: '--- Ideal (0° Phase)   |   Green: Coherent   |   Orange/Red: Phase Cancellation (ΔdB)',
      roSelected: (n, note, f, phiMax) => `H${n} · ${note} (${f} Hz) · Phase Shift Δφ = ${phiMax}°`,
      roLossSync: '±0.0 dB · Full Constructive Sum (100% Σ)',
      roLossVal: (db, pct) => `${db} dB phase cancellation (${pct}% Σ amplitude)`,
      tiltValZero: '0.0° · Parallel to string plane',
      tiltVal: (deg) => `${deg > 0 ? '+' : ''}${deg}° · Tilted Crown`,
      planeValZero: '0.00 mm · Unison perfectly leveled',
      planeValUneven: (mm) => `${mm} mm · String S₃ sits offset`,
      planeValHollow: (mm) => `${mm} mm · Hollow Crown (S₂ delayed)`,
      kpiDtZero: '0.00 ms',
      kpiDtSubOk: 'All 3 strings excited at once',
      kpiDtSubBad: 'Staggered string contact',
      kpiCancelNone: 'None (0.0 dB)',
      kpiCancelSubOk: 'Zero comb-filter notches',
      kpiCancelVal: (n, db) => `H${n} (${db} dB)`,
      kpiCancelSubBad: 'Destructive wave interference',
      kpiCohSubOk: '3× single wave in phase',
      kpiCohSubBad: 'Energy loss & false beats',
      states: {
        ideal: {
          badge: '✦ TARGET STATE • FLAT & PARALLEL',
          title: 'All 3 Unison Strings Launch Exactly in Phase (Δt = 0 ms, Δφ = 0°)',
          body: 'When a cleanly filed crown meets a level 3-string unison squarely, all three string waves add constructively to 3× total amplitude.',
          rule: '<strong>Tonal Effect:</strong> Carrying fundamental core (H₁–H₄) and a radiant harmonic spectrum with zero comb-filter notches.'
        },
        tilted: {
          badge: '✕ FAULT 1 • TILTED CROWN',
          title: 'Staggered Contact (S₁ → S₂ → S₃) Cancels Upper Partials',
          body: 'A tilted crown strikes S₁ → S₂ → S₃ sequentially. On upper partials, Δφ reaches 120°–240°: wave crests cancel wave troughs!',
          rule: '<strong>Effect &amp; Remedy:</strong> Metallic buzz &amp; spectral notches. Square hammer travel and file the crown parallel first!'
        },
        uneven: {
          badge: '✕ FAULT 2 • UNLEVELED STRING PLANE',
          title: 'One Offset String Fights the Unison at 180° Out of Phase',
          body: 'If one string sits just 0.2–0.3 mm high or low at the agraffe or bridge, it launches late and subtracts energy at Δφ ≈ 180°.',
          rule: '<strong>Effect &amp; Remedy:</strong> Hollow tone &amp; false beats despite pure tuning. Level strings at agraffes and seat bridge pins first!'
        },
        hollow: {
          badge: '✕ FAULT 3 • HOLLOW CROWN / WORN GROOVES',
          title: 'Outer Strings Lead While Center String Lags Out of Phase',
          body: 'Outer strings S₁ and S₃ speak early while center string S₂ lags weakly—dropping out in pp and canceling out of phase in forte.',
          rule: '<strong>Golden Rule:</strong> No needling can fix phase cancellation—file and shape the crown (320–400 grit) first!'
        }
      }
    },

    ja: {
      geoTitle: '正面図 (90°)：クラウン ↔ 3本同音弦',
      planeRef: '基準弦面（水平）',
      strNames: ['S₁ 左弦', 'S₂ 中弦', 'S₃ 右弦'],
      crownLbl: 'ハンマークラウン',
      feltGrainLbl: '↑ フェルト走行 ∥ 弦方向',
      syncHit: '✓ 3本同時打弦 (Δt = 0.00 ms)',
      asyncHit: (dt) => `✕ 打弦時間差 Δt = ${dt} ms`,
      waveBadgeSync: '✓ 同位相（強め合う合成波）',
      waveBadgeCancel: (phi) => `✕ 位相ずれ（最大 ${phi}°）`,
      sumWaveLbl: '合成波 Σ (S₁+S₂+S₃)',
      idealEnvLbl: '理想合成振幅（3倍）',
      indivLbl: '各弦の波形 S₁ · S₂ · S₃',
      phasorLbl: '位相ベクトル',
      ampRetained: (pct) => `合成振幅：${pct}%`,
      specLegend: '--- 理想同位相 (0°)   |   緑：位相一致   |   橙/赤：位相差による打ち消し (ΔdB)',
      roSelected: (n, note, f, phiMax) => `第${n}倍音 H${n} · ${note} (${f} Hz) · 最大位相差 Δφ = ${phiMax}°`,
      roLossSync: '±0.0 dB · 完全な同位相合成 (100%)',
      roLossVal: (db, pct) => `干渉減衰 ${db} dB（残存振幅 ${pct}%）`,
      tiltValZero: '0.0° · 弦面に対して完全に平行',
      tiltVal: (deg) => `${deg > 0 ? '+' : ''}${deg}° · クラウンの傾き（片当たり）`,
      planeValZero: '0.00 mm · 3本弦が同一平面に整列',
      planeValUneven: (mm) => `${mm} mm · 右弦 S₃ の高さ不揃い`,
      planeValHollow: (mm) => `${mm} mm · 中凹みクラウン（中弦 S₂ 遅れ）`,
      kpiDtZero: '0.00 ms',
      kpiDtSubOk: '3本すべて同時に励起',
      kpiDtSubBad: '時間差を伴う打弦接触',
      kpiCancelNone: 'なし (0.0 dB)',
      kpiCancelSubOk: 'コムフィルタ減衰なし',
      kpiCancelVal: (n, db) => `H${n} (${db} dB)`,
      kpiCancelSubBad: '逆位相による波の打ち消し',
      kpiCohSubOk: '単弦の3倍の合成エネルギー',
      kpiCohSubBad: 'エネルギー損失と偽うなり',
      states: {
        ideal: {
          badge: '✦ 理想状態 • 平面クラウン＆水平弦面',
          title: '3本の同音弦が完全同位相で発音 (Δt = 0 ms, Δφ = 0°)',
          body: 'ファイリングされたクラウンと水平な3本同音弦が平行に同時接触すると、3本の波が同位相で重なり3倍の合成振幅を生みます。',
          rule: '<strong>音響効果：</strong>豊かな基音（H₁–H₄）と、位相キャンセルのない透明で伸びやかな倍音スペクトル。'
        },
        tilted: {
          badge: '✕ 不良1 • クラウンの傾き（片当たり）',
          title: '時間差打弦（S₁ → S₂ → S₃）が高次倍音を打ち消す',
          body: 'クラウンが傾くと S₁ → S₂ → S₃ が時間差で発音。高次倍音で位相差が 120°〜240° に達し、山と谷が打ち消し合います。',
          rule: '<strong>影響と対策：</strong>金属的な濁りと倍音欠落。針刺し前にハンマーの傾き修正とファイリング（整形）を実施！'
        },
        uneven: {
          badge: '✕ 不良2 • 3本弦の弦面レベル不揃い',
          title: '高さのずれた1本が逆位相（180°）で他の2本を打ち消す',
          body: 'アグラフや駒で1本がわずか 0.2〜0.3 mm ずれると発音が遅れ、Δφ ≈ 180° の倍音で他2本のエネルギーを打ち消します。',
          rule: '<strong>影響と対策：</strong>調律が合っていても芯のない偽うなり音に。必ずアグラフと駒ピンで弦面を揃えてから整音！'
        },
        hollow: {
          badge: '✕ 不良3 • クラウンの中凹み・深い弦溝',
          title: '両端の弦が先行し、中央弦 S₂ が遅れて位相干渉を起こす',
          body: '両端の S₁・S₃ が先行し、中弦 S₂ が遅れて弱く発音。pp では中弦が抜け、f では逆位相干渉で音が痩せます。',
          rule: '<strong>鉄則：</strong>針刺しでは位相キャンセルは直せません — まず #320–400 でクラウンをファイリング（整形）！'
        }
      }
    },

    zh: {
      geoTitle: '正面视图 (90°)：槌冠 ↔ 三弦平面',
      planeRef: '标准琴弦平面',
      strNames: ['S₁ 左弦', 'S₂ 中弦', 'S₃ 右弦'],
      crownLbl: '槌冠（击弦点）',
      feltGrainLbl: '↑ 毛毡走向 ∥ 琴弦方向',
      syncHit: '✓ 三弦完全同步激发 (Δt = 0.00 ms)',
      asyncHit: (dt) => `✕ 击弦时间差 Δt = ${dt} ms`,
      waveBadgeSync: '✓ 同相叠加（相长干涉）',
      waveBadgeCancel: (phi) => `✕ 相位偏移（最大 ${phi}°）`,
      sumWaveLbl: '合成声波 Σ (S₁+S₂+S₃)',
      idealEnvLbl: '理想同相振幅 (3×)',
      indivLbl: '单根琴弦波形 S₁ · S₂ · S₃',
      phasorLbl: '相位矢量',
      ampRetained: (pct) => `合成波幅：${pct}%`,
      specLegend: '--- 理想同相 (0°)   |   绿色：相位一致   |   橙/红：相位抵消凹陷 (ΔdB)',
      roSelected: (n, note, f, phiMax) => `第${n}泛音 H${n} · ${note} (${f} Hz) · 最大相位差 Δφ = ${phiMax}°`,
      roLossSync: '±0.0 dB · 三弦完美同相叠加 (100%)',
      roLossVal: (db, pct) => `相位干涉衰减 ${db} dB（剩余波幅 ${pct}%）`,
      tiltValZero: '0.0° · 与琴弦平面完全平行',
      tiltVal: (deg) => `${deg > 0 ? '+' : ''}${deg}° · 槌冠倾斜`,
      planeValZero: '0.00 mm · 三弦同音弦组完全平齐',
      planeValUneven: (mm) => `${mm} mm · 右弦 S₃ 高度偏移`,
      planeValHollow: (mm) => `${mm} mm · 槌冠中凹（中弦延迟）`,
      kpiDtZero: '0.00 ms',
      kpiDtSubOk: '三根同音弦同一瞬间起振',
      kpiDtSubBad: '先后错位接触琴弦',
      kpiCancelNone: '无抵消 (0.0 dB)',
      kpiCancelSubOk: '泛音列完整无梳状凹陷',
      kpiCancelVal: (n, db) => `H${n} (${db} dB)`,
      kpiCancelSubBad: '波峰遇波谷发生相消干涉',
      kpiCohSubOk: '3倍单弦能量同相输出',
      kpiCohSubBad: '声能内耗与虚假拍音',
      states: {
        ideal: {
          badge: '✦ 理想基准 • 槌冠平正且弦面齐平',
          title: '三根同音弦严格同相起振 (Δt = 0 ms, Δφ = 0°)',
          body: '当打磨平正的槌冠与齐平的三弦同音弦组平行同步接触时，三根弦同相叠加，输出 3 倍饱满振幅。',
          rule: '<strong>声学效应：</strong>基音（H₁–H₄）浑厚扎实，高次泛音通透连贯，无任何梳状抵消凹陷。'
        },
        tilted: {
          badge: '✕ 缺陷1 • 槌冠倾斜',
          title: '先后击弦（S₁ → S₂ → S₃）引发高次泛音相消抵消',
          body: '槌冠倾斜导致 S₁ → S₂ → S₃ 依次错位起振。高次泛音相位差达 120°–240°，波峰与波谷相互抵消！',
          rule: '<strong>后果与对策：</strong>双重击弦杂音与高音塌陷。针刺前必须先校准弦槌角度并将槌冠打磨整形！'
        },
        uneven: {
          badge: '✕ 缺陷2 • 三弦平面高低不齐',
          title: '单根错位琴弦以 180° 反相吞噬同音弦组能量',
          body: '若弦枕栓或弦码处有一根弦高低偏差 0.2–0.3 mm，起振即滞后，并在 Δφ ≈ 180° 处反向吞噬其余两弦能量。',
          rule: '<strong>后果与对策：</strong>同度调准仍发空并伴随假拍音。针刺前务必先在弦枕栓与码钉处找平弦面！'
        },
        hollow: {
          badge: '✕ 缺陷3 • 槌冠中凹 / 弦沟过深',
          title: '两侧外弦先行起振 — 中间弦滞后造成相位塌陷',
          body: '两侧 S₁、S₃ 先行发声，中弦 S₂ 滞后微弱 —— 极弱音（pp）时中弦失声，强奏时反相干涉掏空音色。',
          rule: '<strong>黄金准则：</strong>任何针刺都无法修复相位抵消 —— 必须先用 320–400 目砂板对槌冠打磨整形！'
        }
      }
    }
  };

  class CrownStringAlignmentController {
    constructor() {
      // Start on 'tilted' (2.3°) to immediately visualize phase cancellation vs. ideal
      this.activePreset = 'tilted';
      this.tiltDeg = 2.3;          // -3.5 .. +3.5 deg
      this.planeMm = 0.00;         // 0.00 .. 0.45 mm (S3 vertical offset)
      this.hollowMm = 0.00;        // 0.00 .. 0.40 mm (S2 hollow crown recess)
      this.selectedN = 8;          // Selected partial H1..H12 for wave superposition view
      this.lang = 'de';

      this.barHitRegions = [];
      this.waveAnimPhase = 0;
      this.animRaf = null;
      this.strikeProgress = 1.0;
      this.audioCtx = null;

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    t() {
      return I18N[this.lang] || I18N.de;
    }

    computeAlignmentPhysics() {
      const tiltRad = (this.tiltDeg * Math.PI) / 180;
      // Contact distances (mm) between crown surface and each of the 3 strings:
      // Positive z_i means string i is contacted LATER as hammer rises upward
      const xCoords = [-CHOIR_HALF_SPAN_MM, 0, CHOIR_HALF_SPAN_MM];
      const rawZ = [
        xCoords[0] * Math.tan(tiltRad),
        xCoords[1] * Math.tan(tiltRad) + this.hollowMm,
        xCoords[2] * Math.tan(tiltRad) + this.planeMm
      ];
      const minZ = Math.min(rawZ[0], rawZ[1], rawZ[2]);
      const deltaZ = rawZ.map((z) => z - minZ); // mm >= 0
      const delaysMs = deltaZ.map((dz) => dz / EFF_STRIKE_VEL);
      const maxDtMs = Math.max(delaysMs[0], delaysMs[1], delaysMs[2]);

      // Individual string excitation amplitudes (1.0 when synchronous; slightly weaker for delayed string)
      const strAmps = delaysMs.map((dt, idx) => {
        let a = Math.max(0.42, 1.0 - dt * 0.52);
        if (idx === 1 && this.hollowMm > 0.02) {
          a = Math.max(0.35, a - this.hollowMm * 0.45);
        }
        return a;
      });

      let worstN = 1;
      let worstDeltaDb = 0;

      const partials = PARTIALS_BASE.map((p) => {
        const phasesRad = delaysMs.map((dt) => 2 * Math.PI * p.freq * (dt * 0.001));
        const phasesDeg = phasesRad.map((r) => Math.round((r * 180) / Math.PI));
        const maxPhaseDeg = Math.max(phasesDeg[0], phasesDeg[1], phasesDeg[2]);

        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < 3; i++) {
          sumX += strAmps[i] * Math.cos(phasesRad[i]);
          sumY += strAmps[i] * Math.sin(phasesRad[i]);
        }
        const sumAmp = Math.sqrt(sumX * sumX + sumY * sumY); // 0 .. 3.0
        const ratio = Math.max(0.07, sumAmp / 3.0);
        const deltaDb = 20 * Math.log10(ratio);
        const curDb = p.baseDb + deltaDb;

        if (deltaDb < worstDeltaDb) {
          worstDeltaDb = deltaDb;
          worstN = p.n;
        }

        return {
          ...p,
          phasesRad,
          phasesDeg,
          maxPhaseDeg,
          sumAmp,
          sumRatioPct: Math.round((sumAmp / 3.0) * 100),
          deltaDb,
          curDb,
          sumPhaseRad: Math.atan2(sumY, sumX)
        };
      });

      // Overall broadband coherent energy retention (%)
      let eIdeal = 0;
      let eActual = 0;
      partials.forEach((p) => {
        const w = Math.pow(10, p.baseDb / 10);
        eIdeal += w;
        eActual += w * Math.pow(p.sumAmp / 3.0, 2);
      });
      const coherentPct = Math.max(15, Math.min(100, Math.round((eActual / Math.max(1e-6, eIdeal)) * 100)));

      return {
        rawZ,
        deltaZ,
        delaysMs,
        maxDtMs,
        strAmps,
        partials,
        worstN,
        worstDeltaDb,
        coherentPct,
        isIdeal: maxDtMs < 0.015
      };
    }

    detectStateKey() {
      if (Math.abs(this.tiltDeg) < 0.15 && this.planeMm < 0.02 && this.hollowMm < 0.02) {
        return 'ideal';
      }
      if (this.hollowMm >= 0.08 && this.hollowMm >= this.planeMm && Math.abs(this.tiltDeg) < 0.8) {
        return 'hollow';
      }
      if (this.planeMm >= 0.06 && Math.abs(this.tiltDeg) < 0.6) {
        return 'uneven';
      }
      return 'tilted';
    }

    init() {
      this.slideEl = document.querySelector('.slide.csa-slide');
      if (!this.slideEl) return;

      this.lang = document.documentElement.lang || 'de';

      // Preset buttons
      this.slideEl.querySelectorAll('[data-csa-preset]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-csa-preset') || 'ideal';
          const pr = PRESETS[key] || PRESETS.ideal;
          this.activePreset = key;
          this.tiltDeg = pr.tiltDeg;
          this.planeMm = pr.planeMm;
          this.hollowMm = pr.hollowMm;
          this.selectedN = pr.preferredN;

          const slTilt = document.getElementById('csa-slider-tilt');
          const slPlane = document.getElementById('csa-slider-plane');
          if (slTilt) slTilt.value = String(Math.round(this.tiltDeg * 10));
          if (slPlane) slPlane.value = String(Math.round((this.hollowMm > 0 ? this.hollowMm : this.planeMm) * 100));

          this.triggerStrikeAnim(false);
          this.updateUI();
        });
      });

      // Slider 1: Crown Tilt (-3.5° .. +3.5°)
      const slTilt = document.getElementById('csa-slider-tilt');
      if (slTilt) {
        slTilt.addEventListener('input', () => {
          this.tiltDeg = (parseInt(slTilt.value, 10) || 0) / 10;
          if (Math.abs(this.tiltDeg) > 0.2) this.hollowMm = 0;
          this.activePreset = this.detectStateKey();
          const phys = this.computeAlignmentPhysics();
          if (!phys.isIdeal && phys.worstN >= 2) this.selectedN = phys.worstN;
          this.updateUI();
        });
      }

      // Slider 2: String Plane Offset Δz (0.00 .. 0.45 mm)
      const slPlane = document.getElementById('csa-slider-plane');
      if (slPlane) {
        slPlane.addEventListener('input', () => {
          const valMm = (parseInt(slPlane.value, 10) || 0) / 100;
          if (this.activePreset === 'hollow') {
            this.hollowMm = valMm;
            this.planeMm = 0;
          } else {
            this.planeMm = valMm;
            this.hollowMm = 0;
          }
          this.activePreset = this.detectStateKey();
          const phys = this.computeAlignmentPhysics();
          if (!phys.isIdeal && phys.worstN >= 2) this.selectedN = phys.worstN;
          this.updateUI();
        });
      }

      // Play 3-Choir Unison Audio Button
      const btnPlay = document.getElementById('csa-btn-play');
      if (btnPlay) {
        btnPlay.addEventListener('click', () => {
          this.triggerStrikeAnim(true);
        });
      }

      // Interactive Partial Selection on Bottom Spectrum Canvas
      const specCanvas = document.getElementById('csa-canvas-spectrum');
      if (specCanvas) {
        const pickBar = (clientX) => {
          const rect = specCanvas.getBoundingClientRect();
          if (!rect.width) return;
          const x = (clientX - rect.left) * (specCanvas.clientWidth / rect.width);
          for (const reg of this.barHitRegions) {
            if (x >= reg.x1 && x <= reg.x2) {
              if (this.selectedN !== reg.n) {
                this.selectedN = reg.n;
                this.updateUI();
              }
              break;
            }
          }
        };
        specCanvas.addEventListener('click', (e) => pickBar(e.clientX));
        specCanvas.addEventListener('mousemove', (e) => {
          if (e.buttons === 1) pickBar(e.clientX);
        });
        specCanvas.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) pickBar(e.touches[0].clientX);
        }, { passive: true });
        specCanvas.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) pickBar(e.touches[0].clientX);
        }, { passive: true });
      }

      const geoCanvas = document.getElementById('csa-canvas-geo');
      if (geoCanvas) {
        geoCanvas.addEventListener('click', () => this.play3ChoirAudio());
      }

      // Observe slide visibility & resize
      const obs = new MutationObserver(() => {
        if (this.slideEl.classList.contains('active')) {
          requestAnimationFrame(() => {
            this.updateUI();
          });
          setTimeout(() => this.updateUI(), 50);
        }
      });
      obs.observe(this.slideEl, { attributes: true, attributeFilter: ['class'] });

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (this.slideEl.classList.contains('active')) {
            this.drawGeoCanvas();
            this.drawWavesCanvas();
            this.drawSpectrumCanvas();
          }
        });
        this.slideEl.querySelectorAll('.csa-canvas-wrap').forEach((w) => ro.observe(w));
      }

      window.addEventListener('resize', () => {
        if (this.slideEl.classList.contains('active')) this.updateUI();
      }, { passive: true });

      window.addEventListener('languageChanged', (e) => {
        this.lang = (e.detail && e.detail.lang) ? e.detail.lang : (document.documentElement.lang || 'de');
        this.updateUI();
      });

      // Sync initial sliders to initial state
      if (slTilt) slTilt.value = String(Math.round(this.tiltDeg * 10));
      if (slPlane) slPlane.value = String(Math.round(this.planeMm * 100));
      this.updateUI();
    }

    triggerStrikeAnim(playAudio = false) {
      if (playAudio) this.play3ChoirAudio();
      if (this.animRaf) cancelAnimationFrame(this.animRaf);
      const t0 = performance.now();
      const dur = 950;

      const btn = document.getElementById('csa-btn-play');
      if (btn && playAudio) {
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 650);
      }

      const loop = (now) => {
        const u = Math.min(1, (now - t0) / dur);
        this.strikeProgress = 1.0;
        this.waveAnimPhase = (now - t0) * 0.012;
        this.drawWavesCanvas();
        if (u < 1) {
          this.animRaf = requestAnimationFrame(loop);
        } else {
          this.waveAnimPhase = 0;
          this.animRaf = null;
          this.drawWavesCanvas();
        }
      };
      this.animRaf = requestAnimationFrame(loop);
    }

    play3ChoirAudio() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.audioCtx) this.audioCtx = new AudioCtx();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const phys = this.computeAlignmentPhysics();
        const now = this.audioCtx.currentTime + 0.01;
        const decay = 1.45;

        const master = this.audioCtx.createGain();
        master.gain.setValueAtTime(0.20, now);
        master.gain.exponentialRampToValueAtTime(0.0008, now + decay);
        master.connect(this.audioCtx.destination);

        // Synthesize all 3 individual strings with their exact physical arrival delays (delaysMs)
        // so WebAudio performs real acoustic wave superposition & comb-filtering in the air!
        for (let s = 0; s < 3; s++) {
          const startT = now + phys.delaysMs[s] * 0.001;
          const strGain = phys.strAmps[s] / 3.0;
          // Slight realistic micro-detuning (0.15 cents) when misaligned adds authentic bridge roughness
          const detuneHz = phys.isIdeal ? 0 : (s - 1) * 0.35;

          PARTIALS_BASE.forEach((p) => {
            const osc = this.audioCtx.createOscillator();
            const g = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime((F0_HZ + detuneHz) * p.n, startT);

            const linAmp = Math.pow(10, (p.baseDb - 4.0) / 20) * strGain * 0.55;
            const pDecay = Math.max(0.25, decay / Math.pow(p.n, 0.42));

            g.gain.setValueAtTime(0.0001, now);
            g.gain.setValueAtTime(0.0001, startT);
            g.gain.linearRampToValueAtTime(linAmp, startT + 0.003);
            g.gain.exponentialRampToValueAtTime(0.0001, startT + pDecay);

            osc.connect(g);
            g.connect(master);
            osc.start(startT);
            osc.stop(startT + pDecay + 0.03);
          });
        }
      } catch (e) {
        // Ignore audio context autoplay limits cleanly
      }
    }

    updateUI() {
      if (!this.slideEl) return;
      const tr = this.t();
      const phys = this.computeAlignmentPhysics();
      const stateKey = this.detectStateKey();
      const dec = this.lang === 'de' ? ',' : '.';
      const fmt = (num, d = 1) => num.toFixed(d).replace('.', dec);

      // Sync preset buttons
      this.slideEl.querySelectorAll('[data-csa-preset]').forEach((btn) => {
        const k = btn.getAttribute('data-csa-preset');
        btn.classList.toggle('active', k === stateKey);
      });

      // Control readouts
      const lblTilt = document.getElementById('csa-val-tilt');
      if (lblTilt) {
        if (Math.abs(this.tiltDeg) < 0.08) {
          lblTilt.textContent = tr.tiltValZero;
          lblTilt.style.color = '#4ade80';
        } else {
          lblTilt.textContent = tr.tiltVal(fmt(this.tiltDeg, 1));
          lblTilt.style.color = '#fb923c';
        }
      }

      const lblPlane = document.getElementById('csa-val-plane');
      if (lblPlane) {
        if (this.hollowMm >= 0.02) {
          lblPlane.textContent = tr.planeValHollow(fmt(this.hollowMm, 2));
          lblPlane.style.color = '#f59e0b';
        } else if (this.planeMm >= 0.02) {
          lblPlane.textContent = tr.planeValUneven(fmt(this.planeMm, 2));
          lblPlane.style.color = '#fb923c';
        } else {
          lblPlane.textContent = tr.planeValZero;
          lblPlane.style.color = '#4ade80';
        }
      }

      // Selected Partial Readout Strip
      const selP = phys.partials[Math.max(0, Math.min(11, this.selectedN - 1))];
      const roPart = document.getElementById('csa-ro-partial');
      const roLoss = document.getElementById('csa-ro-loss');
      if (roPart && selP) {
        const noteStr = this.lang === 'de' ? selP.noteDe : selP.noteInt;
        roPart.textContent = tr.roSelected(selP.n, noteStr, selP.freq, selP.maxPhaseDeg);
      }
      if (roLoss && selP) {
        if (phys.isIdeal || Math.abs(selP.deltaDb) < 0.15) {
          roLoss.textContent = tr.roLossSync;
          roLoss.style.color = '#4ade80';
        } else {
          const dbStr = (selP.deltaDb > 0 ? '+' : '') + fmt(selP.deltaDb, 1);
          roLoss.textContent = tr.roLossVal(dbStr, selP.sumRatioPct);
          roLoss.style.color = selP.deltaDb < -4.0 ? '#f87171' : '#fbbf24';
        }
      }

      // 3 KPIs
      const kpiDt = document.getElementById('csa-kpi-dt');
      const kpiDtSub = document.getElementById('csa-kpi-dt-sub');
      const kpiCancel = document.getElementById('csa-kpi-cancel');
      const kpiCancelSub = document.getElementById('csa-kpi-cancel-sub');
      const kpiCoh = document.getElementById('csa-kpi-coh');
      const kpiCohSub = document.getElementById('csa-kpi-coh-sub');

      if (kpiDt) {
        kpiDt.textContent = phys.isIdeal ? tr.kpiDtZero : `${fmt(phys.maxDtMs, 2)} ms`;
        kpiDt.style.color = phys.isIdeal ? '#4ade80' : '#38bdf8';
      }
      if (kpiDtSub) kpiDtSub.textContent = phys.isIdeal ? tr.kpiDtSubOk : tr.kpiDtSubBad;

      if (kpiCancel) {
        if (phys.isIdeal || phys.worstDeltaDb > -0.4) {
          kpiCancel.textContent = tr.kpiCancelNone;
          kpiCancel.style.color = '#4ade80';
        } else {
          kpiCancel.textContent = tr.kpiCancelVal(phys.worstN, fmt(phys.worstDeltaDb, 1));
          kpiCancel.style.color = '#f87171';
        }
      }
      if (kpiCancelSub) kpiCancelSub.textContent = phys.isIdeal ? tr.kpiCancelSubOk : tr.kpiCancelSubBad;

      if (kpiCoh) {
        kpiCoh.textContent = `${phys.coherentPct} %`;
        kpiCoh.style.color = phys.coherentPct >= 95 ? '#4ade80' : (phys.coherentPct >= 75 ? '#fbbf24' : '#f87171');
      }
      if (kpiCohSub) kpiCohSub.textContent = phys.isIdeal ? tr.kpiCohSubOk : tr.kpiCohSubBad;

      // Dynamic Explanation Box
      const stInfo = tr.states[stateKey] || tr.states.ideal;
      const expBadge = document.getElementById('csa-exp-badge');
      const expTitle = document.getElementById('csa-exp-title');
      const expBody = document.getElementById('csa-exp-body');
      const expRule = document.getElementById('csa-exp-rule');

      if (expBadge) {
        expBadge.textContent = stInfo.badge;
        expBadge.className = 'bento-badge ' + (stateKey === 'ideal' ? 'green' : 'red-alert');
      }
      if (expTitle) expTitle.textContent = stInfo.title;
      if (expBody) expBody.innerHTML = stInfo.body;
      if (expRule) expRule.innerHTML = stInfo.rule;

      this.drawGeoCanvas();
      this.drawWavesCanvas();
      this.drawSpectrumCanvas();
    }

    setupCanvas(canvas) {
      if (!canvas) return null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(200, canvas.clientWidth || 420);
      const h = Math.max(120, canvas.clientHeight || 220);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w, h };
    }

    // =========================================================================
    // CANVAS 1 (Top-Left): Clean 2D Felt-Colored Rectangle & 3 Strings as Points
    // - Upright narrow 2D wool-felt rectangle modeled after DSC05665.jpg
    // - No wooden shank, no core, no 3D perspective, no hammer bounce animation
    // - 3 unison strings rendered cleanly as 2D points above the crown
    // =========================================================================
    drawGeoCanvas() {
      const canvas = document.getElementById('csa-canvas-geo');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const tr = this.t();
      const phys = this.computeAlignmentPhysics();
      const dec = this.lang === 'de' ? ',' : '.';

      ctx.clearRect(0, 0, w, h);

      const cx = Math.round(w * 0.50);
      const planeY = Math.round(h * 0.36);

      // Authentic proportions matching DSC05665.jpg:
      // 3-string choir span (~8.4 mm) inside a narrow, upright ~11 mm 2D felt rectangle
      const strSpacingPx = Math.min(26, Math.round(w * 0.068));
      const strX = [cx - strSpacingPx, cx, cx + strSpacingPx];
      const strColors = ['#38bdf8', '#4ade80', '#fbbf24'];
      const strShort = ['S₁', 'S₂', 'S₃'];
      const strR = 4.6;

      // Visual amplification so tenth-millimeter offsets & crown tilt are clearly readable
      const mmToPx = 36;
      const grooveRecessPx = this.hollowMm * mmToPx;

      // Top Status Banner + Compact per-string delay readout
      ctx.font = '700 11.2px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = phys.isIdeal ? '#4ade80' : '#fb923c';
      ctx.textAlign = 'left';
      ctx.fillText(
        phys.isIdeal ? tr.syncHit : tr.asyncHit(phys.maxDtMs.toFixed(2).replace('.', dec)),
        12,
        17
      );

      // Per-string delay summary row (cleanly separated at top)
      ctx.font = '600 9.8px "JetBrains Mono", monospace';
      for (let i = 0; i < 3; i++) {
        const dt = phys.delaysMs[i];
        const dtTxt = dt < 0.015 ? '0,00 ms'.replace(',', dec) : `+${dt.toFixed(2).replace('.', dec)} ms`;
        const colX = 12 + i * Math.min(118, Math.round((w - 24) / 3.1));
        ctx.fillStyle = strColors[i];
        ctx.textAlign = 'left';
        ctx.fillText(`${strShort[i]}:`, colX, 33);
        ctx.fillStyle = dt < 0.015 ? '#86efac' : '#fca5a5';
        ctx.fillText(dtTxt, colX + 21, 33);
      }

      // Reference Horizontal String Plane Line (Saitenebene)
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = 'rgba(230, 200, 130, 0.50)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(14, planeY);
      ctx.lineTo(w - 14, planeY);
      ctx.stroke();
      ctx.restore();

      ctx.font = '600 9.8px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = 'rgba(230, 200, 130, 0.88)';
      ctx.textAlign = 'right';
      ctx.fillText(tr.planeRef, w - 12, planeY - 6);

      // 2D Felt-Colored Rectangle dimensions (narrow & upright like DSC05665.jpg, NO shank!)
      const headHalfW = Math.round(strSpacingPx * 1.34); // ~68-70 px total width
      const rectH = Math.min(148, Math.max(112, Math.round(h - planeY - 22)));
      const visualTiltRad = (this.tiltDeg * 2.2 * Math.PI) / 180;

      // Top edge profile y(x) of the 2D felt rectangle (flat = 0; concave dip > 0 for Hohlkehle)
      const crownLocalY = (x) => {
        const u = Math.max(-1, Math.min(1, x / headHalfW));
        if (grooveRecessPx > 0.6 && Math.abs(u) < 0.88) {
          const c = Math.cos((u / 0.88) * Math.PI * 0.5);
          return grooveRecessPx * 1.55 * c * c;
        }
        return 0;
      };

      // Exact screen Y of each string point & tangent placement of the 2D felt rectangle
      const strSy = [
        planeY,
        planeY,
        planeY - this.planeMm * mmToPx
      ];
      let baseCrownCenterY = -Infinity;
      for (let i = 0; i < 3; i++) {
        const dx = strX[i] - cx;
        const locY = crownLocalY(dx);
        const rotDy = dx * Math.sin(visualTiltRad) + locY * Math.cos(visualTiltRad);
        const neededCenterY = strSy[i] + strR + 1.4 - rotDy;
        if (neededCenterY > baseCrownCenterY) baseCrownCenterY = neededCenterY;
      }

      // -----------------------------------------------------------------------
      // DRAW PURE 2D FELT-COLORED RECTANGLE (No shank, no core, no 3D, no anim)
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.translate(cx, baseCrownCenterY);
      ctx.rotate(visualTiltRad);

      const steps = 28;
      // Natural Merino wool-felt tone inspired directly by DSC05665.jpg
      const feltGrad = ctx.createLinearGradient(0, 0, 0, rectH);
      feltGrad.addColorStop(0, '#faf6ec');
      feltGrad.addColorStop(0.18, '#f3ede0');
      feltGrad.addColorStop(0.75, '#eae2d2');
      feltGrad.addColorStop(1, '#dfd6c3');
      ctx.fillStyle = feltGrad;

      ctx.beginPath();
      ctx.moveTo(-headHalfW, rectH);
      for (let s = 0; s <= steps; s++) {
        const x = -headHalfW + (2 * headHalfW * s) / steps;
        ctx.lineTo(x, crownLocalY(x));
      }
      ctx.lineTo(headHalfW, rectH);
      ctx.closePath();
      ctx.fill();

      // Subtle clean wool-felt border on left, bottom, right
      ctx.strokeStyle = 'rgba(214, 203, 184, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Crisp top Scheitel contact edge highlight (green = flat/parallel, orange = tilted/hollow)
      ctx.strokeStyle = phys.isIdeal ? '#22c55e' : '#f97316';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const x = -headHalfW + (2 * headHalfW * s) / steps;
        const y = crownLocalY(x);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // -----------------------------------------------------------------------
      // DRAW THE 3 UNISON STRINGS SIMPLY AS 2D POINTS (● ● ●)
      // -----------------------------------------------------------------------
      for (let i = 0; i < 3; i++) {
        const sx = strX[i];
        const sy = strSy[i];

        // Vertical contact gap indicator (Δz) between string point & top of felt rectangle if delayed
        if (phys.deltaZ[i] > 0.015) {
          const dx = sx - cx;
          const locY = crownLocalY(dx);
          const crownScreenY = baseCrownCenterY + dx * Math.sin(visualTiltRad) + locY * Math.cos(visualTiltRad);
          const gapTop = sy + strR + 1.2;
          const gapBot = Math.max(gapTop + 2.5, crownScreenY - 1.2);

          ctx.save();
          ctx.strokeStyle = '#f87171';
          ctx.lineWidth = 1.6;
          ctx.setLineDash([2.5, 2]);
          ctx.beginPath();
          ctx.moveTo(sx, gapTop);
          ctx.lineTo(sx, gapBot);
          ctx.stroke();
          ctx.restore();
        }

        // Crisp 2D string point
        ctx.fillStyle = strColors[i];
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(sx, sy, strR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Compact S₁ / S₂ / S₃ label directly above each point
        ctx.font = '700 10px "Inter", "Roboto", sans-serif';
        ctx.fillStyle = strColors[i];
        ctx.textAlign = 'center';
        ctx.fillText(strShort[i], sx, sy - 9);
      }
    }

    // =========================================================================
    // CANVAS 2 (Top-Right): 3-String Wave Superposition & Phase Cancellation
    // =========================================================================
    drawWavesCanvas() {
      const canvas = document.getElementById('csa-canvas-waves');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const tr = this.t();
      const phys = this.computeAlignmentPhysics();
      const selP = phys.partials[Math.max(0, Math.min(11, this.selectedN - 1))];

      ctx.clearRect(0, 0, w, h);

      // Right side hosts a compact Phasor Circle (82 px wide), left side plots 2.5 wave cycles
      const phasorR = Math.min(30, h * 0.16);
      const phasorCx = w - phasorR - 18;
      const phasorCy = Math.round(h * 0.56);

      const plotX0 = 14;
      const plotW = Math.max(120, phasorCx - phasorR - plotX0 - 20);
      const upperCy = Math.round(h * 0.34); // Individual waves S1, S2, S3
      const lowerCy = Math.round(h * 0.74); // Summed wave Σ vs 3x Ideal

      // Top status badge + Partial tag
      ctx.font = '700 11px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = selP.maxPhaseDeg < 20 ? '#4ade80' : (selP.deltaDb < -4 ? '#f87171' : '#fbbf24');
      ctx.textAlign = 'left';
      ctx.fillText(
        selP.maxPhaseDeg < 15 ? tr.waveBadgeSync : tr.waveBadgeCancel(selP.maxPhaseDeg),
        plotX0,
        16
      );

      const noteStr = this.lang === 'de' ? selP.noteDe : selP.noteInt;
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#e6c882';
      ctx.textAlign = 'right';
      ctx.fillText(`H${selP.n} · ${noteStr} (${selP.freq} Hz)`, w - 12, 16);

      // Center zero-lines for Upper (Individual) and Lower (Sum) tracks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plotX0, upperCy);
      ctx.lineTo(plotX0 + plotW, upperCy);
      ctx.moveTo(plotX0, lowerCy);
      ctx.lineTo(plotX0 + plotW, lowerCy);
      ctx.stroke();

      // Track labels
      ctx.font = '600 10px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.82)';
      ctx.textAlign = 'left';
      ctx.fillText(tr.indivLbl, plotX0, upperCy - 24);
      ctx.fillStyle = '#fde68a';
      ctx.fillText(`${tr.sumWaveLbl}  —  ${tr.ampRetained(selP.sumRatioPct)}`, plotX0, lowerCy - 28);

      // 1. Plot the 3 Individual String Sine Waves (S1 Blue, S2 Green, S3 Amber)
      const indivAmpPx = Math.min(19, h * 0.105);
      const strColors = ['#38bdf8', '#4ade80', '#fbbf24'];
      const cycles = 2.5;
      const samples = 110;

      for (let s = 0; s < 3; s++) {
        ctx.strokeStyle = strColors[s];
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        for (let i = 0; i <= samples; i++) {
          const u = i / samples;
          const x = plotX0 + u * plotW;
          const theta = u * cycles * Math.PI * 2 - selP.phasesRad[s] - this.waveAnimPhase;
          const y = upperCy - Math.sin(theta) * indivAmpPx * phys.strAmps[s];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. Plot Ideal 3x Coherent Reference Wave (dashed subtle gold) on Lower Track
      const sumMaxPx = Math.min(25, h * 0.14);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(230, 200, 130, 0.36)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const x = plotX0 + u * plotW;
        const theta = u * cycles * Math.PI * 2 - this.waveAnimPhase;
        const y = lowerCy - Math.sin(theta) * sumMaxPx;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 3. Plot Actual Resulting Summed Wave Σ = S1 + S2 + S3
      const sumCol = selP.sumRatioPct >= 88 ? '#4ade80' : (selP.sumRatioPct >= 55 ? '#fbbf24' : '#f87171');
      ctx.save();
      ctx.shadowColor = sumCol + '66';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = sumCol;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const x = plotX0 + u * plotW;
        let val = 0;
        for (let s = 0; s < 3; s++) {
          const theta = u * cycles * Math.PI * 2 - selP.phasesRad[s] - this.waveAnimPhase;
          val += Math.sin(theta) * phys.strAmps[s];
        }
        const y = lowerCy - (val / 3.0) * sumMaxPx;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 4. Draw Phasor Circle (S1, S2, S3 Phase Vectors) on the Right
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(phasorCx, phasorCy, phasorR, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs (0° top/right, 180° opposite)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(phasorCx - phasorR, phasorCy);
      ctx.lineTo(phasorCx + phasorR, phasorCy);
      ctx.moveTo(phasorCx, phasorCy - phasorR);
      ctx.lineTo(phasorCx, phasorCy + phasorR);
      ctx.stroke();

      // Individual string phase vectors
      for (let s = 0; s < 3; s++) {
        const ang = -Math.PI * 0.5 + selP.phasesRad[s];
        const vr = phasorR * 0.88 * phys.strAmps[s];
        const vx = phasorCx + Math.cos(ang) * vr;
        const vy = phasorCy + Math.sin(ang) * vr;

        ctx.strokeStyle = strColors[s];
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(phasorCx, phasorCy);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        ctx.fillStyle = strColors[s];
        ctx.beginPath();
        ctx.arc(vx, vy, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = '600 9.8px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText(tr.phasorLbl, phasorCx, phasorCy - phasorR - 8);
      ctx.font = '700 10.2px "JetBrains Mono", monospace';
      ctx.fillStyle = sumCol;
      ctx.fillText(`${selP.sumRatioPct}%`, phasorCx, phasorCy + phasorR + 13);
    }

    // =========================================================================
    // CANVAS 3 (Bottom Full-Width): Effect on Partial Spectrum H1..H12 (dB & ΔdB)
    // =========================================================================
    drawSpectrumCanvas() {
      const canvas = document.getElementById('csa-canvas-spectrum');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const tr = this.t();
      const phys = this.computeAlignmentPhysics();
      const dec = this.lang === 'de' ? ',' : '.';

      ctx.clearRect(0, 0, w, h);

      const padL = 44;
      const padR = 16;
      const padT = 24;
      const padB = 34;
      const plotW = Math.max(160, w - padL - padR);
      const plotH = Math.max(70, h - padT - padB);

      // Top legend line
      ctx.font = '600 10.4px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.82)';
      ctx.textAlign = 'right';
      ctx.fillText(tr.specLegend, w - padR, 14);

      // dB scale: +9.5 dB down to -42 dB (headroom above H1 for ΔdB labels)
      const maxDb = 9.5;
      const minDb = -42;
      const yForDb = (db) => {
        const clamped = Math.max(minDb, Math.min(maxDb, db));
        return padT + ((maxDb - clamped) / (maxDb - minDb)) * plotH;
      };

      // Grid lines
      [0, -12, -24, -36].forEach((db) => {
        const gy = yForDb(db);
        ctx.strokeStyle = db === 0 ? 'rgba(230, 200, 130, 0.25)' : 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(padL + plotW, gy);
        ctx.stroke();

        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.78)';
        ctx.textAlign = 'right';
        ctx.fillText(`${db} dB`, padL - 6, gy + 3.5);
      });

      this.barHitRegions = [];
      const slotW = plotW / 12;
      const barW = Math.min(44, slotW * 0.62);
      const bottomY = padT + plotH;

      phys.partials.forEach((p, idx) => {
        const cx = padL + (idx + 0.5) * slotW;
        const bx = cx - barW * 0.5;
        const yIdeal = yForDb(p.baseDb);
        const yCur = yForDb(p.curDb);
        const isSel = p.n === this.selectedN;

        this.barHitRegions.push({ n: p.n, x1: padL + idx * slotW, x2: padL + (idx + 1) * slotW });

        // Selected bar highlight column
        if (isSel) {
          ctx.fillStyle = 'rgba(230, 200, 130, 0.11)';
          ctx.fillRect(padL + idx * slotW + 2, padT, slotW - 4, plotH);
        }

        // Ghost loss region between Ideal (0° phase) and Actual cancelled level
        if (p.deltaDb < -0.3) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
          ctx.fillRect(bx, yIdeal, barW, Math.max(2, yCur - yIdeal));
        }

        // Actual partial bar
        const barCol = p.deltaDb > -1.2
          ? '#2ecc71'
          : (p.deltaDb > -5.5 ? '#f59e0b' : '#ef4444');
        const grad = ctx.createLinearGradient(bx, yCur, bx, bottomY);
        grad.addColorStop(0, barCol);
        grad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');

        ctx.fillStyle = grad;
        ctx.strokeStyle = isSel ? '#ffffff' : barCol;
        ctx.lineWidth = isSel ? 2.0 : 1.1;
        ctx.beginPath();
        ctx.roundRect(bx, yCur, barW, Math.max(4, bottomY - yCur), [4, 4, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Dashed Ideal Reference Cap
        ctx.save();
        ctx.setLineDash([3, 2]);
        ctx.strokeStyle = '#e6c882';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(bx - 2, yIdeal);
        ctx.lineTo(bx + barW + 2, yIdeal);
        ctx.stroke();
        ctx.restore();

        // ΔdB label above bar when cancelled (or ±0,0 dB when selected)
        if (p.deltaDb < -0.4 || isSel) {
          const dTxt = Math.abs(p.deltaDb) < 0.15
            ? '0 dB'
            : `${p.deltaDb.toFixed(1).replace('.', dec)} dB`;
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.fillStyle = p.deltaDb < -4.0 ? '#fca5a5' : (p.deltaDb < -0.4 ? '#fde68a' : '#86efac');
          ctx.textAlign = 'center';
          ctx.fillText(dTxt, cx, Math.max(padT + 10, yIdeal - 5));
        }

        // X-Axis Labels: H1..H12 + Note Name
        ctx.font = `${isSel ? '800' : '700'} 11px "Inter", "Roboto", sans-serif`;
        ctx.fillStyle = isSel ? '#fde68a' : '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText(`H${p.n}`, cx, bottomY + 14);

        const noteLbl = this.lang === 'de' ? p.noteDe : p.noteInt;
        ctx.font = '500 9.8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.78)';
        ctx.fillText(noteLbl, cx, bottomY + 27);
      });
    }
  }

  window.CrownStringAlignmentController = new CrownStringAlignmentController();
})();
