/**
 * Louis Renner Masterclass Presentation
 * Slide 15 (Chapter 3): Optimal Hammerhead Weight Relative to String Weight Across All Registers
 * - Ratio of String Weight (Saitengewicht m_S) to Hammerhead Weight (Hammerkopfgewicht m_H)
 * - Equilibrium between Contact Time (Kontaktzeit τc) and String Deflection (Saitenauslenkung)
 * - Authentic Renner Hammerhead Mass Curve:
 *     • Starts in Bass (A0) at ~15.0 g and holds bass hammer weight high as long as possible (15.0 -> 13.0 g)
 *     • Deliberate -1.0 g weight step (13.0 -> 12.0 g) at the transition from copper-wound bass to plain steel in the middle
 *     • Tapers smoothly down to 5.0 g at the last treble hammer (C8)
 * - Interactive 88-Key String Weight & Hammer Weight Curve + Live Strike Physics Simulation + Web Audio Preview
 * - Full 4-Language Localization (DE, EN, JA, ZH) + Desktop Mouse & iPad Touch Support
 */

(function () {
  'use strict';

  const NOTE_NAMES_DE = ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'B', 'H'];
  const NOTE_NAMES_INT = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

  const SUBSCRIPTS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈'];

  // Critical engineering zone definitions (1-based piano key numbers 1..88)
  const ZONES = {
    overview: { keyDefault: 40, startKey: 1,  endKey: 88 }, // C4 reference in full-register view
    bass:     { keyDefault: 4,  startKey: 1,  endKey: 23 }, // Copper-wound Bass (A0..G2), default C1 (key 4)
    break:    { keyDefault: 24, startKey: 20, endKey: 28 }, // Copper -> Plain Steel transition (E2..C3), default G#2 (key 24)
    treble:   { keyDefault: 76, startKey: 64, endKey: 88 }  // Last 2 Octaves Treble (C6..C8), default C7 (key 76)
  };

  // Precompute authentic 88-key string weight & Renner hammerhead weight scale (A0 = key 1 .. C8 = key 88)
  const KEYS_DATA = [];
  for (let k = 1; k <= 88; k++) {
    const midi = k + 20; // A0 = 21, C8 = 108
    const octave = Math.floor((midi - 12) / 12);
    const pitchIdx = (midi - 12) % 12;
    const freq = 440 * Math.pow(2, (k - 49) / 12);
    const periodMs = 1000 / freq;
    const halfPeriodMs = periodMs * 0.5;

    const isCopper = k <= 23; // Keys 1..23 copper-wound bass (1..8 monochord, 9..23 bichord), 24..88 plain steel trichord
    const choirs = k <= 8 ? 1 : (k <= 23 ? 2 : 3);

    // Speaking String Choir Weight m_S (g) & Single String Weight m_1 (g):
    // - Copper-wound bass (keys 1..23): 1-choir A0 (~210 g) down to 2-choir G2 (~90 g = 2 × 45 g)
    // - Plain steel Blankbezug (keys 24..88, ALWAYS 3 strings per note!):
    //   Single string m_1 drops from ~10.2 g (G#2, key 24) -> ~3.95 g (C4) -> ~0.91 g (C6) -> ~0.205 g (C8),
    //   so the 3-string choir m_S = 3 × m_1 is ~30.6 g (G#2) -> ~11.8 g (C4) -> ~2.7 g (C6) -> ~0.62 g (C8)!
    let singleStringG;
    let stringWeightG;
    if (k <= 23) {
      const u = (k - 1) / 22;
      stringWeightG = 210 * Math.pow(90 / 210, Math.pow(u, 0.90));
      singleStringG = stringWeightG / choirs;
    } else {
      const u = (k - 24) / 64;
      singleStringG = 10.2 * Math.pow(0.205 / 10.2, Math.pow(u, 1.02));
      stringWeightG = singleStringG * 3;
    }

    // Optimal Renner Hammerhead Weight Curve m_H (g):
    // - Starts at ~15.0 g in the Bass (A0, key 1) — structurally always lighter than the 90..210 g bass string!
    // - Bass weight is deliberately held high as long as possible across keys 1..23 (convex plateau: 15.0 g -> 13.0 g)
    // - At the Copper -> 3-choir Plain Steel transition (key 23 -> 24): deliberate -1.0 g weight step (13.0 g -> 12.0 g)
    // - Tapers smoothly from 12.0 g (key 24) down to 5.0 g at the last treble hammer (C8, key 88)
    let optWeightG;
    if (k <= 23) {
      const uBass = (k - 1) / 22;
      optWeightG = 15.0 - 2.0 * Math.pow(uBass, 1.85);
    } else {
      const uSteel = (k - 24) / 64;
      optWeightG = 5.0 + 7.0 * Math.pow(1 - uSteel, 1.15);
    }

    const massRatio = optWeightG / stringWeightG;

    // Optimal contact time τc (ms) in equilibrium (stays safely below T/2 especially in treble)
    const uAll = (k - 1) / 87;
    const optTauMs = 0.34 + 3.45 * Math.pow(1 - uAll, 1.65);

    KEYS_DATA.push({
      k,
      midi,
      octave,
      pitchIdx,
      sub: SUBSCRIPTS[octave] || String(octave),
      noteDe: NOTE_NAMES_DE[pitchIdx] + (SUBSCRIPTS[octave] || octave),
      noteInt: NOTE_NAMES_INT[pitchIdx] + (SUBSCRIPTS[octave] || octave),
      freq,
      periodMs,
      halfPeriodMs,
      isCopper,
      choirs,
      singleStringG,
      stringWeightG,
      optWeightG,
      massRatio,
      optTauMs
    });
  }

  const I18N = {
    de: {
      axisLeft: 'Gemeinsame Masseskala (g) — Chor mₛ & Hammer mₕ',
      axisRight: 'Hammer-Zielwerte mₕ',
      matCopper: 'Kupferumsponnen (Bass · Taste 1–23)',
      matSteel: 'Blankbezug: 3 Saiten pro Ton (3-chörig · Taste 24–88)',
      zone1Short: '1 · Bass (~15 → 13 g)',
      zone1Sub: 'Gewicht lange hoch gehalten',
      zone2Short: '2 · Übergang (−1 g)',
      zone2Sub: 'Kupfer → Blankstahl',
      zone3Short: '3 · Letzte 2 Okt. Diskant',
      zone3Sub: 'Auslauf bis 5,0 g (C₈)',
      legStrW: 'Saitenchor mₛ (Blankbezug = 3× Saite)',
      legSingleW: '1× Einzelsaite',
      legOptW: 'Hammerkopf mₕ (15 → 5 g)',
      bassGapNote: 'Bass: Hammer (15 g) leichter als Saite (90–210 g)',
      bassHoldNote: 'Bass-Gewicht lange hoch gehalten',
      stepBadge: '−1,0 g Sprung',
      startBadge: '~15 g',
      endBadge: '5 g',
      roKey: (k, note, f, mat) => `Taste ${k} · ${note} (${f} Hz · ${mat})`,
      roMatCu: (c) => `Kupfer · ${c}-chörig`,
      roMatSt: 'Blankbezug · 3 Saiten/Ton',
      roScale: (mS, mOpt, mSim, diffPct) =>
        diffPct === 0
          ? `Saite mₛ ≈ ${mS} g  |  Hammer mₕ = ${mOpt} g (Ideal)`
          : `Saite mₛ ≈ ${mS} g  |  mₕ = ${mSim} g (${diffPct > 0 ? '+' : ''}${diffPct} % ggü. ${mOpt} g)`,
      physLeftBadgeOptimal: '⚖️ GLEICHGEWICHT IM ANSCHLAG',
      physLeftBadgeLight: '🪶 ZU LEICHT — WENIG AUSLENKUNG',
      physLeftBadgeHeavy: '⚓ ZU SCHWER — SELBSTBEDÄMPFUNG',
      stringLabelCu: (c) => c === 1 ? '1× schwere Kupfer-Basssaite' : '2× Kupfer-Basschor (2 Saiten)',
      stringLabelSt: '3× Blankbezug-Chor (3 Stahlsaiten pro Ton)',
      crownLabel: 'Scheitel',
      flankRef: '½ Flanke',
      rivetRef: 'T-Niete',
      reboundFast: 'Schneller Rückprall',
      reboundIdeal: 'Sauberer Rückprall (τc < ½ T)',
      reboundSlow: 'Träger Rückprall → dämpft Saite!',
      deflectionLbl: 'Saitenauslenkung',
      bar1Title: 'Kontaktzeit τc am Scheitel',
      bar2Title: 'Saitenauslenkung (Energie)',
      bar3Title: 'Klangfülle & Obertonfreiheit',
      idealWindow: 'Ideal',
      tauStatusOk: 'Ideal abgestimmt',
      tauStatusShort: 'Zu kurz (wenig Schub)',
      tauStatusLong: 'Zu lang (dämpft Saite!)',
      ampStatusOk: 'Tragfähige Auslenkung',
      ampStatusLow: 'Zu gering (dünner Ton)',
      ampStatusHigh: 'Stark, aber abgewürgt',
      toneStatusOk: 'Volles Spektrum & Tragkraft',
      toneStatusLight: 'Dünn, glasig, wenig Kern',
      toneStatusHeavy: 'Dumpf, Obertöne bedämpft',
      wValOptimal: '0 % · Optimales Gleichgewicht',
      wValLight: (p) => `${p} % · Zu leichter Hammerkopf`,
      wValHeavy: (p) => `+${p} % · Zu schwerer Hammerkopf`,
      kpiTauSub: (tHalf) => `½ Saitenperiode: ${tHalf} ms`,
      kpiAmpOpt: '100 % Auslenkung',
      kpiAmpVal: (pct) => `${pct} % Auslenkung`,
      kpiBalOpt: 'Gleichgewicht',
      kpiBalLight: 'Untergewicht',
      kpiBalHeavy: 'Übergewicht',
      kpiBalSubOpt: 'Kontaktzeit ↔ Auslenkung ideal',
      kpiBalSubLight: 'Zu wenig Impuls',
      kpiBalSubHeavy: 'Bremst Schwingung',
      zones: {
        overview: {
          badge: '✦ GEWICHTSABSTIMMUNG ÜBER ALLE 88 TASTEN',
          title: 'Von ca. 15 g im Bass über den 1-g-Sprung bis 5 g im Diskant',
          body: 'Entscheidend ist das Gleichgewicht zwischen Saitengewicht und Hammerkopfgewicht: Im Bass wird das Hammergewicht möglichst lange hoch gehalten (ca. 15 → 13 g), springt am Übergang auf Blankstahl um −1 g und endet bei 5 g im Diskant.',
          solution: '<strong>Renner-Konstruktion:</strong> Gezielte Kernholzwahl (z. B. Weißbuche bis leichter US-Nussbaum), konischer Weickert-Filz, präzise Kernprofilierung und gezielte Schweifung am Hammerschwanz.'
        },
        bass: {
          badge: '① TIEFER BASS & BASSVERLAUF (CA. 15,0 → 13,0 G)',
          title: 'Hohes Saitengewicht — Bass-Hammer möglichst lange hoch halten',
          body: 'Kupferumsponnene Basssaiten wiegen 90 bis über 200 g – der Hammerkopf (ca. 15 → 13 g) ist im Bass im Verhältnis zur Saite daher immer etwas zu leicht. Deshalb wird das Hammergewicht im Bass so lange wie möglich hoch gehalten.',
          solution: '<strong>Renner-Lösung:</strong> Tragfähiges Bass-Profil (15,0 → 13,0 g) mit starkem, gespanntem Wurzen-Filz und gezielter Schweifung, damit die Kontaktzeit trotz hoher Masse kontrolliert bleibt.'
        },
        break: {
          badge: '② ÜBERGANG KUPFER → BLANKSTAHL (−1,0 G SPRUNG)',
          title: '1 g Gewichtssprung beim Wechsel auf blanke Stahlsaiten',
          body: 'Beim Wechsel auf den 3-chörigen Blankbezug (je 3 Stahlsaiten pro Ton, zusammen ca. 31 g statt 90 g im Bass) sinkt die Chormasse abrupt. Da der Bass-Hammer lange hoch gehalten wurde (13 g), erfolgt hier ein gezielter Sprung von −1 g auf 12 g.',
          solution: '<strong>Renner-Lösung:</strong> Präzise abgestimmter 1-g-Sprung (13,0 → 12,0 g) direkt am Übergang zur Mittellage, kombiniert mit angepasster Unterfilz- und Scheitel-Elastizität für nahtlose Klangfarbe.'
        },
        treble: {
          badge: '③ LETZTE 2 OKTAVEN DISKANT (AUSLAUF BIS 5,0 G)',
          title: 'Leichter 3er-Saitenchor (< 3 g) bis zum 5-g-Diskanthammer',
          body: 'Selbst als 3er-Chor sinkt die Masse im hohen Diskant von 2,7 g (C₆) bis ca. 0,6 g (C₈; Einzelsaite ~0,2 g) bei extrem kurzer Schwingzeit (½T < 0,5 ms). Ein zu schwerer Hammer würde den leichten Saitenchor sofort selbst bedämpfen.',
          solution: '<strong>Renner-Lösung:</strong> Kontinuierliche Gewichtsreduktion bis auf 5,0 g beim letzten Hammer im Diskant (C₈) mit leichtem, langfaserigem Kernholz (z. B. US-Nussbaum) und straff gespanntem Scheitel für schnellen Rückprall.'
        }
      },
      warnLight: '⚠ <strong>Zu leicht simuliert:</strong> Der Hammerkopf prallt zu früh ab – geringe Saitenauslenkung, dünner Ton.',
      warnHeavy: '⚠ <strong>Zu schwer simuliert:</strong> Zu lange Kontaktzeit an der Saite – Obertöne ersticken, dumpfer Ton.'
    },

    en: {
      axisLeft: 'Unified Mass Scale (g) — Choir mₛ & Hammer mₕ',
      axisRight: 'Hammer Targets mₕ',
      matCopper: 'Copper-Wound (Bass · Keys 1–23)',
      matSteel: 'Plain Wire: 3 Strings per Note (Trichord · Keys 24–88)',
      zone1Short: '1 · Bass (~15 → 13 g)',
      zone1Sub: 'Weight held high',
      zone2Short: '2 · Break (−1 g)',
      zone2Sub: 'Copper → Steel',
      zone3Short: '3 · Last 2 Oct. Treble',
      zone3Sub: 'Tapers to 5.0 g (C₈)',
      legStrW: 'String Choir mₛ (Plain = 3× wire)',
      legSingleW: '1× single wire',
      legOptW: 'Hammerhead mₕ (15 → 5 g)',
      bassGapNote: 'Bass: Hammer (15 g) lighter than string (90–210 g)',
      bassHoldNote: 'Bass weight held high as long as possible',
      stepBadge: '−1.0 g Step',
      startBadge: '~15 g',
      endBadge: '5 g',
      roKey: (k, note, f, mat) => `Key ${k} · ${note} (${f} Hz · ${mat})`,
      roMatCu: (c) => `Copper · ${c}-choir`,
      roMatSt: 'Plain Wire · 3 strings/note',
      roScale: (mS, mOpt, mSim, diffPct) =>
        diffPct === 0
          ? `String mₛ ≈ ${mS} g  |  Hammerhead mₕ = ${mOpt} g (Ideal)`
          : `String mₛ ≈ ${mS} g  |  mₕ = ${mSim} g (${diffPct > 0 ? '+' : ''}${diffPct}% vs. ${mOpt} g)`,
      physLeftBadgeOptimal: '⚖️ STRIKE EQUILIBRIUM',
      physLeftBadgeLight: '🪶 TOO LIGHT — WEAK DEFLECTION',
      physLeftBadgeHeavy: '⚓ TOO HEAVY — SELF-DAMPING',
      stringLabelCu: (c) => c === 1 ? '1× Heavy Copper Bass String' : '2× Copper Bass Bichord (2 strings)',
      stringLabelSt: '3× Plain Steel Trichord (3 strings per note)',
      crownLabel: 'Crown',
      flankRef: '½ Flank',
      rivetRef: 'T-Rivet',
      reboundFast: 'Fast Rebound (low energy)',
      reboundIdeal: 'Clean Rebound (τc < ½ T)',
      reboundSlow: 'Sluggish Rebound → damps string!',
      deflectionLbl: 'String Deflection',
      bar1Title: 'Crown Contact Time τc',
      bar2Title: 'String Deflection (Energy)',
      bar3Title: 'Tonal Fullness & Overtone Freedom',
      idealWindow: 'Ideal',
      tauStatusOk: 'Optimal balance',
      tauStatusShort: 'Too short (low drive)',
      tauStatusLong: 'Too long (damps string!)',
      ampStatusOk: 'Full singing deflection',
      ampStatusLow: 'Too shallow (thin tone)',
      ampStatusHigh: 'Strong push, choked rebound',
      toneStatusOk: 'Full spectrum & projection',
      toneStatusLight: 'Thin, glassy, weak core',
      toneStatusHeavy: 'Muffled, upper partials damped',
      wValOptimal: '0% · Optimal Equilibrium',
      wValLight: (p) => `${p}% · Hammerhead Too Light`,
      wValHeavy: (p) => `+${p}% · Hammerhead Too Heavy`,
      kpiTauSub: (tHalf) => `½ String period: ${tHalf} ms`,
      kpiAmpOpt: '100% Deflection',
      kpiAmpVal: (pct) => `${pct}% Deflection`,
      kpiBalOpt: 'Equilibrium',
      kpiBalLight: 'Underweight',
      kpiBalHeavy: 'Overweight',
      kpiBalSubOpt: 'τc ↔ deflection ideal',
      kpiBalSubLight: 'Low strike momentum',
      kpiBalSubHeavy: 'Chokes vibration',
      zones: {
        overview: {
          badge: '✦ MASS MATCHING ACROSS ALL 88 KEYS',
          title: 'From ~15 g in the Bass Across the 1 g Break Step to 5 g in Treble',
          body: 'Hammerhead weight must balance actual string weight: bass hammers start around 15 g and are held high as long as possible (15 → 13 g), step down by 1 g onto plain steel in the middle, and finish at 5 g in the treble.',
          solution: '<strong>Renner Engineering:</strong> Targeted moulding tonewoods (hornbeam to lightweight American walnut), conical Weickert felt taper, precision moulding profiling, and contoured tail shaping.'
        },
        bass: {
          badge: '① DEEP BASS & BASS SECTION (~15.0 → 13.0 G)',
          title: 'Heavy Copper Winding — Keeping Bass Hammer Weight High',
          body: 'Copper-wound bass strings weigh 90 to over 200 g—so in the bass, the hammerhead (~15 → 13 g) is always comparatively light relative to the string. Bass hammer weight is therefore held high as long as possible.',
          solution: '<strong>Renner Solution:</strong> Substantial bass profile (15.0 → 13.0 g) with thick, tension-preserved Wurzen felt and targeted tail relief so contact time stays controlled despite high mass.'
        },
        break: {
          badge: '② COPPER → PLAIN STEEL TRANSITION (−1.0 G STEP)',
          title: '1 g Hammer Weight Step onto Plain Steel Middle Strings',
          body: 'Entering the 3-string plain steel section (3 wires per note, ~31 g combined vs. 90 g in bass), total choir mass drops sharply. Because bass hammers were held high (13 g), a deliberate −1 g step to 12 g restores balance.',
          solution: '<strong>Renner Solution:</strong> Calibrated −1.0 g weight step (13.0 → 12.0 g) right at the transition, paired with matched underfelt and crown elasticity for an even tonal bridge.'
        },
        treble: {
          badge: '③ LAST 2 OCTAVES IN TREBLE (DOWN TO 5.0 G)',
          title: 'Light 3-String Choir (< 3 g) Down to the 5 g Treble Hammer',
          body: 'Even across all three strings per note, high-treble choir mass drops from 2.7 g (C₆) to ~0.6 g (C₈; ~0.2 g per wire) with ½T < 0.5 ms. Excess hammer mass prolongs contact and immediately self-damps the trichord.',
          solution: '<strong>Renner Solution:</strong> Smooth taper down to 5.0 g on the final treble hammer (C₈) with lightweight, long-fibered moulding wood (e.g., American walnut) and a firm, pointed crown for instant rebound.'
        }
      },
      warnLight: '⚠ <strong>Simulated Too Light:</strong> Hammerhead rebounds too early – low string deflection, thin tone.',
      warnHeavy: '⚠ <strong>Simulated Too Heavy:</strong> Excess contact time on the string – overtones are damped, dull tone.'
    },

    ja: {
      axisLeft: '共通質量スケール (g) — 弦総重量 mₛ & ハンマー mₕ',
      axisRight: 'ハンマー基準値 mₕ',
      matCopper: '銅巻線（低音 · 1〜23鍵）',
      matSteel: 'スチール裸線：1音あたり3本弦（24〜88鍵）',
      zone1Short: '1 · 低音域 (~15→13 g)',
      zone1Sub: '高重量を長く維持',
      zone2Short: '2 · 移行部 (−1 g段差)',
      zone2Sub: '銅巻線 → スチール裸線',
      zone3Short: '3 · 最高音2オクターブ',
      zone3Sub: '最終C₈で 5.0 g へ',
      legStrW: '同音弦総重量 mₛ（裸線は3本合計）',
      legSingleW: '1本弦換算',
      legOptW: 'ハンマー mₕ (15 → 5 g)',
      bassGapNote: '低音：ハンマー(15 g)は弦(90〜210 g)に対し常に軽量',
      bassHoldNote: '低音ハンマーヘッド重量を可能な限り高く維持',
      stepBadge: '−1.0 g 段差',
      startBadge: '約15 g',
      endBadge: '5 g',
      roKey: (k, note, f, mat) => `第${k}鍵 · ${note} (${f} Hz · ${mat})`,
      roMatCu: (c) => `銅巻線 · ${c}本弦`,
      roMatSt: 'スチール裸線 · 3本弦',
      roScale: (mS, mOpt, mSim, diffPct) =>
        diffPct === 0
          ? `弦重量 mₛ ≈ ${mS} g  |  ハンマーヘッド mₕ = ${mOpt} g（最適均衡）`
          : `弦重量 mₛ ≈ ${mS} g  |  mₕ = ${mSim} g (${diffPct > 0 ? '+' : ''}${diffPct}% / 基準 ${mOpt} g)`,
      physLeftBadgeOptimal: '⚖️ 打弦の理想的な均衡（バランス）',
      physLeftBadgeLight: '🪶 軽すぎる — 弦の振幅不足',
      physLeftBadgeHeavy: '⚓ 重すぎる — 自己減衰（音詰まり）',
      stringLabelCu: (c) => c === 1 ? '銅巻線バス単弦 (1本)' : '銅巻線バス複弦 (2本)',
      stringLabelSt: 'スチール裸線トリプルストリング (3本弦)',
      crownLabel: 'クラウン（打弦点）',
      flankRef: '½ フランク',
      rivetRef: 'Tリベット',
      reboundFast: '速すぎる離脱（エネルギー不足）',
      reboundIdeal: '理想的な離脱 (τc < ½ T)',
      reboundSlow: '離脱遅れ → 弦振動を自ら減衰！',
      deflectionLbl: '弦の振幅（変位）',
      bar1Title: '接触時間 τc（クラウン）',
      bar2Title: '弦の振幅・エネルギー伝達',
      bar3Title: '音の豊かさと倍音の伸び',
      idealWindow: '理想域',
      tauStatusOk: '理想的な接触時間',
      tauStatusShort: '短すぎる（駆動力不足）',
      tauStatusLong: '長すぎる（弦を自己減衰！）',
      ampStatusOk: '豊かな弦振幅',
      ampStatusLow: '振幅不足（細い音）',
      ampStatusHigh: '強い押込みだが離脱遅れ',
      toneStatusOk: '豊かな倍音と遠達性',
      toneStatusLight: '細く硬質・芯が弱い',
      toneStatusHeavy: 'こもった音・高次倍音が減衰',
      wValOptimal: '0% · 最適な重量バランス',
      wValLight: (p) => `${p}% · ハンマーヘッドが軽すぎる`,
      wValHeavy: (p) => `+${p}% · ハンマーヘッドが重すぎる`,
      kpiTauSub: (tHalf) => `弦の半周期 ½T = ${tHalf} ms`,
      kpiAmpOpt: '100% 理想振幅',
      kpiAmpVal: (pct) => `${pct}% 弦振幅`,
      kpiBalOpt: '最適均衡',
      kpiBalLight: '重量不足',
      kpiBalHeavy: '重量過多',
      kpiBalSubOpt: '接触時間と弦振幅が完全調和',
      kpiBalSubLight: '弦を十分に揺らす運動量が不足',
      kpiBalSubHeavy: '接触時間が長すぎ振動を阻害',
      zones: {
        overview: {
          badge: '✦ 全88鍵にわたる弦重量とハンマーヘッド重量の均衡',
          title: '低音 約15 g から移行部の 1 g 段差を経て最高音 5 g へ',
          body: '鍵となるのは「弦の重量」に対する「ハンマーヘッド重量」の均衡です。低音は約15 gで始まり可能な限り高い重量を維持（15→13 g）、中音の裸線への移行部で 1 g 軽くなり、最高音端の 5 g で終えます。',
          solution: '<strong>レンナーの設計解：</strong>ウッドコア樹種（シデ材〜軽量アメリカンウォルナット）の選定、円錐状ヴァイケルト・フェルト、コア形状とテール加工の精密な組み合わせ。'
        },
        bass: {
          badge: '① 低音域（約15.0 → 13.0 g・高重量維持）',
          title: '重い銅巻線に対し、低音ハンマー重量を長く高く保つ',
          body: '銅巻線の低音弦は非常に大きな質量（最大200 g超）を持ちます。約15 gから始まるバスハンマーは、豊かな基音振幅を得るため移行部直前まで可能な限り重く維持されます。',
          solution: '<strong>レンナーの解決策：</strong>十分な質量（15.0→13.0 g）と内部張力を保った厚いヴルツェンフェルト、テール軽量化により重い弦を力強く弾きつつ接触時間を制御。'
        },
        break: {
          badge: '② 銅巻線 → スチール裸線の移行部（−1.0 g の重量段差）',
          title: '裸線への切り替わりに合わせた 1 g のハンマー重量ステップ',
          body: '低音の銅巻線から中音のスチール裸線へ移ると弦の重量が急減します。低音ハンマーを高重量（13 g）のまま維持してきたため、ここで意図的に 1 g 軽くする段差（13.0→12.0 g）を設けて均衡を保ちます。',
          solution: '<strong>レンナーの解決策：</strong>移行部での精密な −1.0 g 重量ステップと、アンダーフェルトおよびクラウン弾性の調整により音色の繋がりを均一化。'
        },
        treble: {
          badge: '③ 最高音2オクターブ（最終 5.0 g まで減量）',
          title: '極小の弦重量（2 g未満）に合わせる 5 g 高音ハンマー',
          body: '最高音2オクターブでは弦の重量が2 g未満〜約0.5 gまで軽くなり、半周期も0.5 ms未満となります。ハンマーが重すぎると接触時間が長引き、軽い弦を自ら止めてしまいます。',
          solution: '<strong>レンナーの解決策：</strong>最高音端（C₈）の 5.0 g まで滑らかに軽量化し、高剛性コアと張りのあるクラウンで瞬時の離脱と輝きを実現。'
        }
      },
      warnLight: '⚠ <strong>軽すぎシミュレーション：</strong>ハンマーヘッドが早期に跳ね返り、弦の振幅が不足して音が痩せます。',
      warnHeavy: '⚠ <strong>重すぎシミュレーション：</strong>接触時間が長すぎ、弦の振動と倍音を抑え込んで音がこもります。'
    },

    zh: {
      axisLeft: '统一质量标尺 (g) — 同音弦组 mₛ 与弦槌 mₕ',
      axisRight: '弦槌目标值 mₕ',
      matCopper: '紫铜缠弦（低音区 · 第1–23键）',
      matSteel: '裸钢弦区：每音3根同音弦（第24–88键）',
      zone1Short: '1 · 低音区 (~15→13 g)',
      zone1Sub: '尽可能长久保持高槌重',
      zone2Short: '2 · 过渡区 (−1 g阶跃)',
      zone2Sub: '铜缠弦 → 中音裸钢弦',
      zone3Short: '3 · 最高音2个八度',
      zone3Sub: '递减至最末槌 5.0 g',
      legStrW: '同音弦组总重 mₛ（裸弦区=3根总和）',
      legSingleW: '单根钢弦',
      legOptW: '弦槌重量 mₕ (15 → 5 g)',
      bassGapNote: '低音区：弦槌(15 g)相对于重弦(90–210 g)始终偏轻',
      bassHoldNote: '低音弦槌重量尽可能长久保持高位',
      stepBadge: '−1.0 g 阶跃',
      startBadge: '约15 g',
      endBadge: '5 g',
      roKey: (k, note, f, mat) => `第${k}键 · ${note} (${f} Hz · ${mat})`,
      roMatCu: (c) => `紫铜缠弦 · ${c}根同音弦`,
      roMatSt: '裸钢弦 · 3根同音弦',
      roScale: (mS, mOpt, mSim, diffPct) =>
        diffPct === 0
          ? `琴弦重量 mₛ ≈ ${mS} g  |  槌重 mₕ = ${mOpt} g（最佳平衡）`
          : `琴弦重量 mₛ ≈ ${mS} g  |  mₕ = ${mSim} g (${diffPct > 0 ? '+' : ''}${diffPct}% 对比 ${mOpt} g)`,
      physLeftBadgeOptimal: '⚖️ 击弦瞬间的最佳动态平衡',
      physLeftBadgeLight: '🪶 弦槌过轻 — 琴弦振幅不足',
      physLeftBadgeHeavy: '⚓ 弦槌过重 — 接触过久自我阻尼',
      stringLabelCu: (c) => c === 1 ? '单根紫铜缠绕低音弦' : '双根紫铜缠绕低音弦组',
      stringLabelSt: '三根同音裸钢弦组（每音3弦）',
      crownLabel: '槌冠',
      flankRef: '½ 侧翼',
      rivetRef: 'T型铆钉',
      reboundFast: '回弹过快（动能不足）',
      reboundIdeal: '利落回弹 (τc < ½ T)',
      reboundSlow: '回弹迟滞 → 压制琴弦振动！',
      deflectionLbl: '琴弦振幅',
      bar1Title: '槌冠接触时间 τc',
      bar2Title: '琴弦振幅（能量传递）',
      bar3Title: '音色饱满度与泛音释放',
      idealWindow: '理想区',
      tauStatusOk: '接触时间理想',
      tauStatusShort: '过短（推力不足）',
      tauStatusLong: '过长（扼杀琴弦振动！）',
      ampStatusOk: '振幅充沛且具穿透力',
      ampStatusLow: '振幅过小（音色单薄）',
      ampStatusHigh: '推力虽大但回弹受阻',
      toneStatusOk: '基音浑厚 · 泛音通透',
      toneStatusLight: '单薄发飘 · 缺乏核心',
      toneStatusHeavy: '沉闷发木 · 高次泛音衰减',
      wValOptimal: '0% · 最佳质量平衡',
      wValLight: (p) => `${p}% · 弦槌过轻`,
      wValHeavy: (p) => `+${p}% · 弦槌过重`,
      kpiTauSub: (tHalf) => `琴弦半周期 ½T = ${tHalf} ms`,
      kpiAmpOpt: '100% 理想振幅',
      kpiAmpVal: (pct) => `${pct}% 琴弦振幅`,
      kpiBalOpt: '最佳平衡',
      kpiBalLight: '重量偏轻',
      kpiBalHeavy: '重量偏重',
      kpiBalSubOpt: '接触时间与琴弦振幅完美兼顾',
      kpiBalSubLight: '击弦动量不足以充分激发琴弦',
      kpiBalSubHeavy: '接触时间超限导致弦槌自我阻尼',
      zones: {
        overview: {
          badge: '✦ 贯穿88键的琴弦重量与弦槌配重平衡',
          title: '从低音约 15 g 经 1 g 过渡阶跃直至高音最末槌 5 g',
          body: '核心在于弦槌重量与琴弦重量的匹配：低音槌从约 15 g 起步并尽可能长久保持高重量（15→13 g），在进入中音裸钢弦时产生 1 g 的减重阶跃（13→12 g），最终在高音末端降至 5 g。',
          solution: '<strong>雷诺结构方案：</strong>定向匹配木芯树种（鹅耳枥至极轻美国黑胡桃木）、锥形Weickert毛毡厚度过渡、木芯轮廓与槌尾精细修型。'
        },
        bass: {
          badge: '① 低音区配重（约 15.0 → 13.0 g · 长久保持高位）',
          title: '厚重紫铜缠弦 —— 尽可能长久保持低音弦槌高重量',
          body: '紫铜缠绕低音弦具有极大的振动质量（最高逾200 g）。低音弦槌从约 15 g 起步，并在整个低音区尽可能长久保持高重量，以充分激发浑厚深沉的基音振幅。',
          solution: '<strong>雷诺解决方案：</strong>饱满低音槌体（15.0→13.0 g）配合高内张力乌尔岑毛毡及槌尾修型，在赋予充沛推力的同时精准控制接触时间。'
        },
        break: {
          badge: '② 紫铜缠弦 → 裸钢弦过渡区（−1.0 g 重量阶跃）',
          title: '由铜缠弦切换至中音裸钢弦时的 1 g 重量阶跃',
          body: '从低音紫铜缠弦过渡到中音裸钢弦时，琴弦重量骤然下降。由于低音弦槌重量一直保持在高位（13 g），此处必须设计 1 g 的减重阶跃（13.0→12.0 g）以重新匹配较轻的钢弦。',
          solution: '<strong>雷诺解决方案：</strong>在换码过渡处精准设定 −1.0 g 重量阶跃，结合底毡与槌顶弹性的精细过渡实现自然均衡的音区衔接。'
        },
        treble: {
          badge: '③ 最高音2个八度（平滑递减至 5.0 g）',
          title: '极轻裸钢弦（< 2 g）直至最末 5 g 高音弦槌',
          body: '在最高音两个八度，裸钢弦重量降至2 g以下直至约0.5 g（半周期不足0.5 ms）。弦槌一旦偏重，接触时间便会过长并瞬间压死极轻的琴弦。',
          solution: '<strong>雷诺解决方案：</strong>采用高刚性木芯将弦槌重量平滑递减至最末键（C₈）的 5.0 g，配合紧致槌顶实现瞬时回弹与通透穿透力。'
        }
      },
      warnLight: '⚠ <strong>模拟过轻：</strong>弦槌过早弹回导致琴弦振幅不足，音色单薄乏力。',
      warnHeavy: '⚠ <strong>模拟过重：</strong>接触时间过长抑制琴弦振动与泛音，音色沉闷。'
    }
  };

  class HammerWeightBalanceController {
    constructor() {
      this.selectedKey = 40;       // 1..88 (default C4 in overview)
      this.activeZone = 'overview'; // 'overview' | 'bass' | 'break' | 'treble'
      this.weightOffset = 0;       // -100 .. +100 (% slider, maps to -30% .. +26% hammer weight)
      this.lang = 'de';
      this.draggingCurve = false;

      // Strike animation state
      this.animPhase = 1.0;        // 0..1 strike progress (1 = resting/steady oscillation preview)
      this.animRaf = null;
      this.animStartTs = 0;
      this.waveTime = 0;
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

    getKeyData(k = this.selectedKey) {
      const idx = Math.max(1, Math.min(88, Math.round(k))) - 1;
      return KEYS_DATA[idx];
    }

    computePhysicsForKey(kd, weightOffset = this.weightOffset) {
      // Weight multiplier: -100 -> 0.70x (-30%), 0 -> 1.00x, +100 -> 1.26x (+26%)
      // Fits cleanly inside the 3.0 g .. 19.0 g chart range (15.0 * 1.26 = 18.9 g, 5.0 * 0.70 = 3.5 g)
      const wFrac = weightOffset < 0 ? (weightOffset / 100) * 0.30 : (weightOffset / 100) * 0.26;
      const simWeightG = kd.optWeightG * (1 + wFrac);
      const diffPct = Math.round(wFrac * 100);

      // Sensitivity is noticeably higher in the three critical zones!
      let zoneSens = 1.0;
      if (kd.k <= 23) zoneSens = 1.22;
      if (kd.k >= 20 && kd.k <= 28) zoneSens = 1.32;
      else if (kd.k >= 64) zoneSens = 1.52; // extreme sensitivity against light treble strings!

      // Contact time τc scales with hammer-to-string mass ratio, amplified in high treble
      const tauRatio = Math.pow(1 + wFrac, 0.68 * zoneSens);
      const simTauMs = kd.optTauMs * tauRatio;

      // Normalized contact time bar position (0.50 = center of Ideal Window [0.36..0.64])
      const tauNorm = Math.max(0.08, Math.min(0.96, 0.50 + wFrac * 1.05 * zoneSens));

      // Effective musical string deflection:
      // - Underweight: drops sharply because hammer momentum p = m*v is too small against string weight
      // - Optimal (0): 1.00 (100% ideal musical deflection)
      // - Overweight: initial push rises slightly, then self-damping during prolonged contact robs free vibration amplitude
      let deflectionPct;
      if (wFrac < 0) {
        deflectionPct = Math.max(38, Math.round(100 * Math.pow(1 + wFrac, 1.02 * zoneSens)));
      } else {
        const rawPush = 1 + wFrac * 0.26;
        const selfDamp = 1 - Math.pow(wFrac * zoneSens, 1.38) * 0.72;
        deflectionPct = Math.max(46, Math.min(108, Math.round(100 * rawPush * selfDamp)));
      }
      const ampNorm = Math.max(0.10, Math.min(0.95, (deflectionPct - 25) / 100));

      // Overall tonal projection & harmonic freedom score (peaks at 100% in equilibrium)
      const penalty = Math.pow(Math.abs(wFrac) * zoneSens, 1.32) * 145;
      const toneScore = Math.max(24, Math.min(100, Math.round(100 - penalty)));
      const toneNorm = toneScore / 100;

      return {
        simWeightG,
        diffPct,
        wFrac,
        zoneSens,
        simTauMs,
        tauNorm,
        deflectionPct,
        ampNorm,
        toneScore,
        toneNorm
      };
    }

    detectZoneForKey(k) {
      if (k >= 20 && k <= 28) return 'break';
      if (k < 20) return 'bass';
      if (k >= 64) return 'treble';
      return 'overview';
    }

    init() {
      this.slideEl = document.querySelector('.slide.hwb-slide');
      if (!this.slideEl) return;

      this.lang = document.documentElement.lang || 'de';

      // Zone buttons (both top toolbar and right column cards)
      this.slideEl.querySelectorAll('[data-hwb-zone]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const z = btn.getAttribute('data-hwb-zone') || 'overview';
          this.activeZone = z;
          if (ZONES[z]) {
            this.selectedKey = ZONES[z].keyDefault;
          }
          this.triggerStrikeAnimation(false);
          this.updateUI();
        });
      });

      // Weight preset buttons (-75 = light, 0 = optimal, +75 = heavy)
      this.slideEl.querySelectorAll('[data-hwb-weight]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const val = parseInt(btn.getAttribute('data-hwb-weight') || '0', 10);
          this.weightOffset = val;
          const sl = document.getElementById('hwb-slider-weight');
          if (sl) sl.value = String(val);
          this.triggerStrikeAnimation(false);
          this.updateUI();
        });
      });

      const slWeight = document.getElementById('hwb-slider-weight');
      if (slWeight) {
        slWeight.addEventListener('input', () => {
          this.weightOffset = parseInt(slWeight.value, 10) || 0;
          this.updateUI();
        });
      }

      const btnStrike = document.getElementById('hwb-btn-strike');
      if (btnStrike) {
        btnStrike.addEventListener('click', () => {
          this.triggerStrikeAnimation(true);
        });
      }

      // Interactive 88-key curve canvas pointer/touch scrubbing
      const curveCanvas = document.getElementById('hwb-canvas-curve');
      if (curveCanvas) {
        const pickKeyAtClientX = (clientX) => {
          const rect = curveCanvas.getBoundingClientRect();
          if (!rect.width || !this.curvePlotRect) return;
          const x = (clientX - rect.left) * (curveCanvas.clientWidth / rect.width);
          const { x0, w } = this.curvePlotRect;
          const u = Math.max(0, Math.min(1, (x - x0) / Math.max(1, w)));
          const k = Math.max(1, Math.min(88, Math.round(1 + u * 87)));
          if (k !== this.selectedKey) {
            this.selectedKey = k;
            this.activeZone = this.detectZoneForKey(k);
            this.updateUI();
          }
        };

        curveCanvas.addEventListener('mousedown', (e) => {
          this.draggingCurve = true;
          pickKeyAtClientX(e.clientX);
          this.triggerStrikeAnimation(false);
        });
        window.addEventListener('mousemove', (e) => {
          if (this.draggingCurve) pickKeyAtClientX(e.clientX);
        });
        window.addEventListener('mouseup', () => {
          this.draggingCurve = false;
        });
        curveCanvas.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) {
            this.draggingCurve = true;
            pickKeyAtClientX(e.touches[0].clientX);
            this.triggerStrikeAnimation(false);
          }
        }, { passive: true });
        curveCanvas.addEventListener('touchmove', (e) => {
          if (this.draggingCurve && e.touches && e.touches[0]) {
            pickKeyAtClientX(e.touches[0].clientX);
          }
        }, { passive: true });
        curveCanvas.addEventListener('touchend', () => {
          this.draggingCurve = false;
        }, { passive: true });
      }

      const physCanvas = document.getElementById('hwb-canvas-physics');
      if (physCanvas) {
        physCanvas.addEventListener('click', () => this.triggerStrikeAnimation(true));
      }

      // Observe slide activation & resize
      const obs = new MutationObserver(() => {
        if (this.slideEl.classList.contains('active')) {
          requestAnimationFrame(() => {
            this.updateUI();
            this.triggerStrikeAnimation(false);
          });
          setTimeout(() => this.updateUI(), 50);
        }
      });
      obs.observe(this.slideEl, { attributes: true, attributeFilter: ['class'] });

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (this.slideEl.classList.contains('active')) {
            this.drawCurveCanvas();
            this.drawPhysicsCanvas();
          }
        });
        this.slideEl.querySelectorAll('.hwb-canvas-wrap').forEach((w) => ro.observe(w));
      }

      window.addEventListener('resize', () => {
        if (this.slideEl.classList.contains('active')) this.updateUI();
      }, { passive: true });

      window.addEventListener('languageChanged', (e) => {
        this.lang = (e.detail && e.detail.lang) ? e.detail.lang : (document.documentElement.lang || 'de');
        this.updateUI();
      });

      this.updateUI();
    }

    triggerStrikeAnimation(playAudio = false) {
      if (playAudio) {
        this.playSimulatedNote();
      }
      if (this.animRaf) cancelAnimationFrame(this.animRaf);
      this.animStartTs = performance.now();
      const durationMs = 1050;

      const btn = document.getElementById('hwb-btn-strike');
      if (btn && playAudio) {
        btn.classList.add('striking');
        setTimeout(() => btn.classList.remove('striking'), 550);
      }

      const step = (now) => {
        const elapsed = now - this.animStartTs;
        this.animPhase = Math.min(1, elapsed / durationMs);
        this.waveTime = elapsed * 0.018;
        this.drawPhysicsCanvas();
        if (this.animPhase < 1) {
          this.animRaf = requestAnimationFrame(step);
        } else {
          this.animRaf = null;
        }
      };
      this.animRaf = requestAnimationFrame(step);
    }

    playSimulatedNote() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.audioCtx) this.audioCtx = new AudioCtx();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const kd = this.getKeyData();
        const phys = this.computePhysicsForKey(kd);
        const now = this.audioCtx.currentTime;

        const master = this.audioCtx.createGain();
        const peakGain = this.weightOffset < -18 ? 0.11 : (this.weightOffset > 18 ? 0.17 : 0.22);
        const decaySec = Math.max(0.32, Math.min(1.65, 1.35 * Math.pow(110 / Math.max(55, kd.freq), 0.32)));

        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(peakGain, now + 0.008);
        master.gain.exponentialRampToValueAtTime(0.0008, now + decaySec);
        master.connect(this.audioCtx.destination);

        const maxPartials = kd.freq > 1200 ? 3 : (kd.freq > 400 ? 5 : 7);
        for (let n = 1; n <= maxPartials; n++) {
          const pf = kd.freq * n;
          if (pf > 10500) break;
          const osc = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pf, now);

          let amp = 1 / Math.pow(n, 1.35);
          if (this.weightOffset < -15) {
            if (n <= 2) amp *= 0.42;
            else amp *= 0.85;
          } else if (this.weightOffset > 15) {
            amp *= Math.exp(-0.55 * (n - 1) * phys.zoneSens);
          }

          g.gain.setValueAtTime(amp * 0.45, now);
          osc.connect(g);
          g.connect(master);
          osc.start(now);
          osc.stop(now + decaySec + 0.04);
        }
      } catch (e) {
        // Ignore WebAudio restrictions cleanly
      }
    }

    formatGram(val) {
      const decSep = this.lang === 'de' ? ',' : '.';
      if (val >= 20) return String(Math.round(val));
      return val.toFixed(1).replace('.', decSep);
    }

    updateUI() {
      if (!this.slideEl) return;
      const tr = this.t();
      const kd = this.getKeyData();
      const phys = this.computePhysicsForKey(kd);
      const noteLabel = this.lang === 'de' ? kd.noteDe : kd.noteInt;
      const decSep = this.lang === 'de' ? ',' : '.';

      // Sync zone buttons
      this.slideEl.querySelectorAll('[data-hwb-zone]').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-hwb-zone') === this.activeZone);
      });

      // Sync weight preset buttons
      const wState = this.weightOffset < -18 ? 'light' : (this.weightOffset > 18 ? 'heavy' : 'optimal');
      this.slideEl.querySelectorAll('[data-hwb-weight]').forEach((btn) => {
        const target = parseInt(btn.getAttribute('data-hwb-weight') || '0', 10);
        const match = (wState === 'light' && target < 0) ||
                      (wState === 'optimal' && target === 0) ||
                      (wState === 'heavy' && target > 0);
        btn.classList.toggle('active', match);
      });

      // Top Curve Readout Strip
      const roKeyEl = document.getElementById('hwb-ro-key');
      const roScaleEl = document.getElementById('hwb-ro-scale');
      if (roKeyEl) {
        const matTxt = kd.isCopper ? tr.roMatCu(kd.choirs) : tr.roMatSt;
        const fStr = kd.freq < 100 ? kd.freq.toFixed(1).replace('.', decSep) : Math.round(kd.freq).toString();
        roKeyEl.textContent = tr.roKey(kd.k, noteLabel, fStr, matTxt);
      }
      if (roScaleEl) {
        const mSingleStr = this.formatGram(kd.singleStringG);
        const mTotalStr = this.formatGram(kd.stringWeightG);
        const mSstr = kd.choirs > 1 ? `${mTotalStr} (${kd.choirs}×${mSingleStr})` : mTotalStr;
        const mOptStr = kd.optWeightG.toFixed(1).replace('.', decSep);
        const mSimStr = phys.simWeightG.toFixed(1).replace('.', decSep);
        roScaleEl.textContent = tr.roScale(mSstr, mOptStr, mSimStr, phys.diffPct);
        roScaleEl.style.color = wState === 'optimal' ? '#4ade80' : (wState === 'light' ? '#38bdf8' : '#fb923c');
      }

      // Weight Slider Label
      const lblWeight = document.getElementById('hwb-lbl-weight');
      if (lblWeight) {
        if (wState === 'optimal') {
          lblWeight.textContent = tr.wValOptimal;
          lblWeight.style.color = '#4ade80';
        } else if (wState === 'light') {
          lblWeight.textContent = tr.wValLight(phys.diffPct);
          lblWeight.style.color = '#38bdf8';
        } else {
          lblWeight.textContent = tr.wValHeavy(phys.diffPct);
          lblWeight.style.color = '#fb923c';
        }
      }

      // 3 KPI Cards
      const kpiTau = document.getElementById('hwb-kpi-tau');
      const kpiTauSub = document.getElementById('hwb-kpi-tau-sub');
      const kpiAmp = document.getElementById('hwb-kpi-amp');
      const kpiAmpSub = document.getElementById('hwb-kpi-amp-sub');
      const kpiBal = document.getElementById('hwb-kpi-bal');
      const kpiBalSub = document.getElementById('hwb-kpi-bal-sub');

      const fmtMs = (v) => (v < 1 ? v.toFixed(2) : v.toFixed(1)).replace('.', decSep);

      if (kpiTau) {
        kpiTau.textContent = `τc ≈ ${fmtMs(phys.simTauMs)} ms`;
        kpiTau.style.color = wState === 'heavy' ? '#fb923c' : (wState === 'light' ? '#38bdf8' : '#f8fafc');
      }
      if (kpiTauSub) kpiTauSub.textContent = tr.kpiTauSub(fmtMs(kd.halfPeriodMs));

      if (kpiAmp) {
        kpiAmp.textContent = wState === 'optimal' ? tr.kpiAmpOpt : tr.kpiAmpVal(phys.deflectionPct);
        kpiAmp.style.color = wState === 'light' ? '#38bdf8' : (wState === 'heavy' ? '#fbbf24' : '#4ade80');
      }
      if (kpiAmpSub) {
        kpiAmpSub.textContent = wState === 'optimal' ? tr.ampStatusOk : (wState === 'light' ? tr.ampStatusLow : tr.ampStatusHigh);
      }

      if (kpiBal) {
        kpiBal.textContent = wState === 'optimal' ? tr.kpiBalOpt : (wState === 'light' ? tr.kpiBalLight : tr.kpiBalHeavy);
        kpiBal.style.color = wState === 'optimal' ? '#4ade80' : (wState === 'light' ? '#38bdf8' : '#f87171');
      }
      if (kpiBalSub) {
        kpiBalSub.textContent = wState === 'optimal' ? tr.kpiBalSubOpt : (wState === 'light' ? tr.kpiBalSubLight : tr.kpiBalSubHeavy);
      }

      // Dynamic Engineering Callout Box
      const zInfo = tr.zones[this.activeZone] || tr.zones.overview;
      const expBadge = document.getElementById('hwb-exp-badge');
      const expTitle = document.getElementById('hwb-exp-title');
      const expBody = document.getElementById('hwb-exp-body');
      const expSol = document.getElementById('hwb-exp-solution');

      if (expBadge) {
        expBadge.textContent = zInfo.badge;
        expBadge.className = 'bento-badge ' + (this.activeZone === 'treble' ? 'green' : 'gold');
      }
      if (expTitle) expTitle.textContent = zInfo.title;
      if (expBody) {
        if (wState === 'light') {
          expBody.innerHTML = tr.warnLight;
        } else if (wState === 'heavy') {
          expBody.innerHTML = tr.warnHeavy;
        } else {
          expBody.innerHTML = zInfo.body;
        }
      }
      if (expSol) expSol.innerHTML = zInfo.solution;

      this.drawCurveCanvas();
      this.drawPhysicsCanvas();
    }

    setupCanvas(canvas) {
      if (!canvas) return null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(260, canvas.clientWidth || 640);
      const h = Math.max(120, canvas.clientHeight || 240);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w, h };
    }

    drawCurveCanvas() {
      const canvas = document.getElementById('hwb-canvas-curve');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const tr = this.t();
      const decSep = this.lang === 'de' ? ',' : '.';

      ctx.clearRect(0, 0, w, h);

      const padL = 56;
      const padR = 54;
      const padT = 30;
      const padB = 42;
      const plotW = Math.max(120, w - padL - padR);
      const plotH = Math.max(80, h - padT - padB);
      this.curvePlotRect = { x0: padL, y0: padT, w: plotW, h: plotH };

      const xForKey = (k) => padL + ((k - 1) / 87) * plotW;

      // UNIFIED MONOTONIC GRAM SCALE (0.18 g .. 260 g) shared by BOTH String Choir m_S AND Hammerhead m_H!
      // Ensures 90–210 g bass strings sit unmistakably ABOVE the 15 g bass hammer, while keeping generous
      // vertical resolution across the 5–15 g hammer band so the 15->13 g plateau & -1 g break step stay crisp.
      const GRAM_KNOTS = [0.18, 0.5, 1.5, 5.0, 10.0, 15.0, 30.0, 90.0, 220.0, 260.0];
      const FRAC_KNOTS = [0.00, 0.055, 0.13, 0.24, 0.37, 0.47, 0.59, 0.72, 0.83, 0.86];
      const LOG_KNOTS = GRAM_KNOTS.map((v) => Math.log(v));
      const yForGram = (g) => {
        const clamped = Math.max(GRAM_KNOTS[0], Math.min(GRAM_KNOTS[GRAM_KNOTS.length - 1], g));
        const lg = Math.log(clamped);
        let idx = 0;
        while (idx < LOG_KNOTS.length - 2 && lg > LOG_KNOTS[idx + 1]) idx++;
        const t = (lg - LOG_KNOTS[idx]) / Math.max(1e-6, LOG_KNOTS[idx + 1] - LOG_KNOTS[idx]);
        const frac = FRAC_KNOTS[idx] + t * (FRAC_KNOTS[idx + 1] - FRAC_KNOTS[idx]);
        return padT + plotH * (1 - frac);
      };
      const yForStrW = yForGram;
      const yForHammerW = yForGram;

      // 1. Highlight Bands for the 3 Key Engineering Zones
      const zoneBands = [
        { id: 'bass',   k1: 1,  k2: 18.4, fill: 'rgba(217, 119, 6, 0.10)',  activeFill: 'rgba(217, 119, 6, 0.22)',  stroke: '#f59e0b', title: tr.zone1Short, sub: tr.zone1Sub },
        { id: 'break',  k1: 19, k2: 29,   fill: 'rgba(239, 68, 68, 0.10)',  activeFill: 'rgba(239, 68, 68, 0.22)',  stroke: '#f87171', title: tr.zone2Short, sub: tr.zone2Sub },
        { id: 'treble', k1: 64, k2: 88,   fill: 'rgba(56, 189, 248, 0.10)', activeFill: 'rgba(56, 189, 248, 0.22)', stroke: '#38bdf8', title: tr.zone3Short, sub: tr.zone3Sub }
      ];

      zoneBands.forEach((zb) => {
        const bx1 = xForKey(zb.k1);
        const bx2 = xForKey(zb.k2);
        const bw = Math.max(16, bx2 - bx1);
        const isAct = this.activeZone === zb.id;

        ctx.fillStyle = isAct ? zb.activeFill : zb.fill;
        ctx.fillRect(bx1, padT, bw, plotH);

        ctx.strokeStyle = isAct ? zb.stroke : 'rgba(255,255,255,0.14)';
        ctx.lineWidth = isAct ? 1.8 : 1;
        ctx.strokeRect(bx1 + 0.5, padT + 0.5, bw - 1, plotH - 1);

        // Top label inside each zone band
        const cx = (bx1 + bx2) * 0.5;
        ctx.font = `${isAct ? '700' : '600'} 11.0px "Inter", "Roboto", sans-serif`;
        ctx.fillStyle = isAct ? '#ffffff' : zb.stroke;
        ctx.textAlign = zb.id === 'bass' ? 'left' : (zb.id === 'treble' ? 'right' : 'center');
        const tx = zb.id === 'bass' ? bx1 + 6 : (zb.id === 'treble' ? bx2 - 6 : cx);
        ctx.fillText(zb.title, tx, padT + 13);

        ctx.font = '500 9.8px "Inter", "Roboto", sans-serif';
        ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
        ctx.fillText(zb.sub, tx, padT + 25);
      });

      // 2. Unified Horizontal Grid Lines + Left Y-Axis (0,5 .. 220 g) & Right Hammer Reference Ticks (15, 12, 5 g)
      const leftTicks = [
        { g: 220, lbl: '220 g' },
        { g: 90,  lbl: '90 g' },
        { g: 30,  lbl: '30 g' },
        { g: 15,  lbl: '15 g' },
        { g: 5,   lbl: '5 g' },
        { g: 0.5, lbl: `0${decSep}5 g` }
      ];
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.075)';
      ctx.lineWidth = 1;
      leftTicks.forEach((tk) => {
        const gy = yForGram(tk.g);
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(padL + plotW, gy);
        ctx.stroke();

        ctx.font = '600 10.0px "JetBrains Mono", monospace';
        ctx.fillStyle = (tk.g === 15 || tk.g === 5) ? '#fde68a' : 'rgba(203, 213, 225, 0.84)';
        ctx.textAlign = 'right';
        ctx.fillText(tk.lbl, padL - 7, gy + 3.5);
      });

      // Right-axis direct Hammerhead anchor ticks on the exact same unified gram scale (15 g, 12 g, 8 g, 5 g)
      [15, 12, 8, 5].forEach((hg) => {
        const gy = yForGram(hg);
        ctx.font = '600 10.0px "JetBrains Mono", monospace';
        ctx.fillStyle = hg === 15 ? '#fde68a' : 'rgba(230, 200, 130, 0.92)';
        ctx.textAlign = 'left';
        ctx.fillText(`${hg} g`, padL + plotW + 7, gy + 3.5);
      });

      // Axis titles at top corners
      ctx.font = '700 10.5px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.textAlign = 'left';
      ctx.fillText(tr.axisLeft, 6, 15);

      ctx.fillStyle = '#e6c882';
      ctx.textAlign = 'right';
      ctx.fillText(tr.axisRight, w - 6, 15);

      // 2b. Shaded Bass Mass Deficit Band (Keys 1..23): visually proves Hammer (15->13 g) < Bass String (210->90 g)!
      ctx.save();
      const gapGrad = ctx.createLinearGradient(0, yForGram(210), 0, yForGram(13));
      gapGrad.addColorStop(0, 'rgba(251, 146, 60, 0.19)');
      gapGrad.addColorStop(1, 'rgba(230, 200, 130, 0.07)');
      ctx.fillStyle = gapGrad;
      ctx.beginPath();
      for (let i = 0; i < 23; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k), y = yForGram(kd.stringWeightG);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      for (let i = 22; i >= 0; i--) {
        const kd = KEYS_DATA[i];
        ctx.lineTo(xForKey(kd.k), yForGram(kd.optWeightG));
      }
      ctx.closePath();
      ctx.fill();

      // Double-headed vertical comparison indicator at Key 9 showing m_H < m_S in Bass
      const xGap = xForKey(9);
      const yTopGap = yForGram(KEYS_DATA[8].stringWeightG) + 4;
      const yBotGap = yForGram(KEYS_DATA[8].optWeightG) - 4;
      ctx.strokeStyle = 'rgba(253, 186, 116, 0.65)';
      ctx.setLineDash([2.5, 2.5]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xGap, yTopGap);
      ctx.lineTo(xGap, yBotGap);
      ctx.stroke();
      ctx.setLineDash([]);
      if (tr.bassGapNote) {
        ctx.font = '600 9.6px "Inter", "Roboto", sans-serif';
        const gnW = ctx.measureText(tr.bassGapNote).width + 10;
        const gnX = padL + 5;
        const gnY = Math.round((yTopGap + yBotGap) * 0.5) - 8;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.84)';
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(gnX, gnY, gnW, 16, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fed7aa';
        ctx.textAlign = 'left';
        ctx.fillText(tr.bassGapNote, gnX + 5, gnY + 11.2);
      }
      ctx.restore();

      // 2c. Dotted Single-Wire Reference Curve (1x m_1) in Plain Steel (Keys 24..88) to contrast with 3x Trichord!
      ctx.save();
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.52)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 23; i < 88; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k);
        const y = yForGram(kd.singleStringG);
        if (i === 23) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      if (tr.legSingleW) {
        const kdMid = KEYS_DATA[54];
        ctx.font = '500 9.4px "Inter", "Roboto", sans-serif';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.82)';
        ctx.textAlign = 'left';
        ctx.fillText(tr.legSingleW, xForKey(kdMid.k), yForGram(kdMid.singleStringG) + 11);
      }
      ctx.restore();

      // 3. Speaking String Choir Weight Curve m_S(k): Copper (1..23) + Drop Step + 3-Choir Plain Steel (24..88)
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      for (let i = 0; i < 23; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k);
        const y = yForStrW(kd.stringWeightG);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // String weight drop connector at Copper -> Steel transition (Key 23 -> Key 24)
      const x23 = xForKey(23), yStr23 = yForStrW(KEYS_DATA[22].stringWeightG);
      const x24 = xForKey(24), yStr24 = yForStrW(KEYS_DATA[23].stringWeightG);
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(248, 113, 113, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(x23, yStr23);
      ctx.lineTo(x24, yStr24);
      ctx.stroke();
      ctx.restore();

      // Plain steel string weight segment (24..88)
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 23; i < 88; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k);
        const y = yForStrW(kd.stringWeightG);
        if (i === 23) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // String weight transition dots at Key 23 & Key 24
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.arc(x23, yStr23, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.arc(x24, yStr24, 3.4, 0, Math.PI * 2);
      ctx.fill();

      // 4. Optimal Renner Hammerhead Weight Curve m_H(k):
      //    - Bass high-held segment (1..23: 15.0 -> 13.0 g)
      //    - Deliberate -1.0 g step at transition (23 -> 24: 13.0 -> 12.0 g)
      //    - Plain steel middle-to-treble segment (24..88: 12.0 -> 5.0 g)
      ctx.save();
      ctx.shadowColor = 'rgba(230, 200, 130, 0.45)';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#e6c882';
      ctx.lineWidth = 3.2;

      // Bass high-held curve (keys 1..23)
      ctx.beginPath();
      for (let i = 0; i < 23; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k);
        const y = yForHammerW(kd.optWeightG);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Middle & Treble curve (keys 24..88)
      ctx.beginPath();
      for (let i = 23; i < 88; i++) {
        const kd = KEYS_DATA[i];
        const x = xForKey(kd.k);
        const y = yForHammerW(kd.optWeightG);
        if (i === 23) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Crisp -1.0 g Weight Step highlight at Key 23 -> Key 24 (13.0 g -> 12.0 g)
      const yHam23 = yForHammerW(KEYS_DATA[22].optWeightG);
      const yHam24 = yForHammerW(KEYS_DATA[23].optWeightG);
      ctx.save();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(x23, yHam23);
      ctx.lineTo(x24, yHam24);
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(x23, yHam23, 4.0, 0, Math.PI * 2);
      ctx.arc(x24, yHam24, 4.0, 0, Math.PI * 2);
      ctx.fill();

      // Compact pill callout right next to the -1.0 g step
      ctx.font = '700 10.5px "Inter", "Roboto", sans-serif';
      const stepTxt = tr.stepBadge;
      const stW = ctx.measureText(stepTxt).width + 12;
      const pillX = x24 + 7;
      const pillY = yHam24 + 4;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.72)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, stW, 18, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.textAlign = 'left';
      ctx.fillText(stepTxt, pillX + 6, pillY + 12.5);

      // Start (~15 g) & End (5 g) weight labels on the Hammerhead curve
      const yHam1 = yForHammerW(KEYS_DATA[0].optWeightG);
      const x88 = xForKey(88), yHam88 = yForHammerW(KEYS_DATA[87].optWeightG);
      ctx.font = '700 10.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fde68a';
      ctx.textAlign = 'left';
      ctx.fillText(tr.startBadge, xForKey(6), yHam1 - 6);
      ctx.textAlign = 'right';
      ctx.fillText(tr.endBadge, x88 - 4, yHam88 - 7);
      ctx.restore();

      // 5. If Weight Slider is non-zero, draw Simulated Shifted Hammer Weight Curve (also preserving the break!)
      if (Math.abs(this.weightOffset) >= 3) {
        const isLight = this.weightOffset < 0;
        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = isLight ? '#38bdf8' : '#f97316';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let i = 0; i < 88; i++) {
          const kd = KEYS_DATA[i];
          const phys = this.computePhysicsForKey(kd);
          const x = xForKey(kd.k);
          const y = yForHammerW(phys.simWeightG);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 6. Bottom Material Strip (Copper 1..23 vs Plain Steel 24..88) + Octave Ticks
      const stripY = padT + plotH + 4;
      const stripH = 14;
      const xBreakMid = (x23 + x24) * 0.5;

      ctx.fillStyle = 'rgba(217, 119, 6, 0.30)';
      ctx.fillRect(padL, stripY, xBreakMid - padL, stripH);
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(padL + 0.5, stripY + 0.5, xBreakMid - padL - 1, stripH - 1);

      ctx.fillStyle = 'rgba(148, 163, 184, 0.20)';
      ctx.fillRect(xBreakMid, stripY, padL + plotW - xBreakMid, stripH);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
      ctx.strokeRect(xBreakMid + 0.5, stripY + 0.5, padL + plotW - xBreakMid - 1, stripH - 1);

      ctx.font = '700 9.8px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = '#fed7aa';
      ctx.textAlign = 'center';
      ctx.fillText(tr.matCopper, (padL + xBreakMid) * 0.5, stripY + 10.5);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(tr.matSteel, (xBreakMid + padL + plotW) * 0.5, stripY + 10.5);

      // Octave Key Markers along very bottom
      const tickKeys = [
        { k: 1, lbl: 'A₀' }, { k: 4, lbl: 'C₁' }, { k: 16, lbl: 'C₂' },
        { k: 24, lbl: 'G#₂' }, { k: 28, lbl: 'C₃' }, { k: 40, lbl: 'C₄' },
        { k: 52, lbl: 'C₅' }, { k: 64, lbl: 'C₆' }, { k: 76, lbl: 'C₇' }, { k: 88, lbl: 'C₈' }
      ];
      ctx.font = '600 10.2px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      tickKeys.forEach((tk) => {
        const tx = xForKey(tk.k);
        ctx.fillStyle = tk.k === 24 ? '#fca5a5' : 'rgba(226, 232, 240, 0.84)';
        const lblTxt = (tk.k === 24 && this.lang === 'de') ? 'Gis₂' : tk.lbl;
        ctx.fillText(lblTxt, tx, stripY + stripH + 13);
      });

      // 7. Compact Legend in Upper-Center Clear Space
      const legY = 14;
      const legCenter = padL + plotW * 0.50;
      ctx.font = '600 10.5px "Inter", "Roboto", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.90)';
      ctx.fillText(`● ${tr.legStrW}    ◆ ${tr.legOptW}`, legCenter, legY);

      // 8. Selected Key Vertical Cursor + Highlighted Points
      const selKd = this.getKeyData();
      const selPhys = this.computePhysicsForKey(selKd);
      const sx = xForKey(selKd.k);
      const syStr = yForStrW(selKd.stringWeightG);
      const syW = yForHammerW(selPhys.simWeightG);

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sx, padT);
      ctx.lineTo(sx, padT + plotH);
      ctx.stroke();
      ctx.restore();

      // String weight point
      ctx.fillStyle = selKd.isCopper ? '#fb923c' : '#60a5fa';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx, syStr, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hammer weight point
      ctx.fillStyle = Math.abs(this.weightOffset) > 18 ? (this.weightOffset < 0 ? '#38bdf8' : '#f97316') : '#e6c882';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx, syW, 6.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    drawPhysicsCanvas() {
      const canvas = document.getElementById('hwb-canvas-physics');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const tr = this.t();
      const kd = this.getKeyData();
      const phys = this.computePhysicsForKey(kd);
      const wState = this.weightOffset < -18 ? 'light' : (this.weightOffset > 18 ? 'heavy' : 'optimal');

      ctx.clearRect(0, 0, w, h);

      // Split into Left Mechanical Strike View (50%) and Right Equilibrium Meter Bars (50%)
      const splitX = Math.round(w * 0.50);

      // Subtle technical grid across stage for cohesive Renner Masterclass look
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.028)';
      ctx.lineWidth = 1;
      for (let gx = 36; gx < splitX - 8; gx += 44) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 32; gy < h; gy += 44) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(splitX - 4, gy); ctx.stroke();
      }
      ctx.restore();

      // Subtle vertical divider with champagne-gold center fade
      const divGrad = ctx.createLinearGradient(splitX, 8, splitX, h - 8);
      divGrad.addColorStop(0, 'rgba(200, 163, 86, 0.04)');
      divGrad.addColorStop(0.5, 'rgba(200, 163, 86, 0.28)');
      divGrad.addColorStop(1, 'rgba(200, 163, 86, 0.04)');
      ctx.strokeStyle = divGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(splitX, 8);
      ctx.lineTo(splitX, h - 8);
      ctx.stroke();

      // =========================================================================
      // LEFT SIDE: Live Mechanical Cross-Section (String + Unified Folie 27 Renner Hammerhead)
      // =========================================================================
      const leftPad = 14;
      const strYBase = Math.max(54, Math.round(h * 0.245));
      const strX1 = leftPad + 8;
      const strX2 = splitX - 16;
      const strikeX = Math.round((strX1 + strX2) * 0.49);

      // Top status glass pill on left stage
      const badgeTxt = wState === 'optimal' ? tr.physLeftBadgeOptimal : (wState === 'light' ? tr.physLeftBadgeLight : tr.physLeftBadgeHeavy);
      const badgeCol = wState === 'optimal' ? '#4ade80' : (wState === 'light' ? '#38bdf8' : '#fb923c');
      const badgeBg = wState === 'optimal'
        ? 'rgba(16, 48, 36, 0.78)'
        : (wState === 'light' ? 'rgba(14, 38, 58, 0.78)' : 'rgba(58, 26, 16, 0.80)');
      const badgeBorder = wState === 'optimal'
        ? 'rgba(74, 222, 128, 0.48)'
        : (wState === 'light' ? 'rgba(56, 189, 248, 0.48)' : 'rgba(251, 146, 60, 0.52)');
      ctx.save();
      ctx.font = '700 11px "Inter", "Roboto", sans-serif';
      const bpW = ctx.measureText(badgeTxt).width + 18;
      ctx.fillStyle = badgeBg;
      ctx.strokeStyle = badgeBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(leftPad, 7, bpW, 20, 10);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = badgeCol;
      ctx.textAlign = 'left';
      ctx.fillText(badgeTxt, leftPad + 9, 20.5);
      ctx.restore();

      // Compute visual string deflection envelope & hammer crown position
      const ampScale = (phys.deflectionPct / 100) * 14.0;
      let envDecay = 1.0;
      let hammerGap = 8.5;
      let isContacting = false;
      let squashFrac = 0;

      if (this.animPhase < 1.0) {
        const p = this.animPhase;
        const contactEnd = wState === 'heavy' ? 0.42 : (wState === 'light' ? 0.16 : 0.24);
        if (p < 0.10) {
          const u = p / 0.10;
          hammerGap = 20 * (1 - u);
          envDecay = u * 0.4;
        } else if (p < contactEnd) {
          isContacting = true;
          const u = (p - 0.10) / Math.max(0.04, contactEnd - 0.10);
          squashFrac = Math.sin(u * Math.PI);
          hammerGap = -ampScale * 0.48;
          envDecay = 1.0;
        } else {
          const u = (p - contactEnd) / (1 - contactEnd);
          const reboundSpeed = wState === 'heavy' ? 0.65 : (wState === 'light' ? 1.35 : 1.0);
          hammerGap = -ampScale * 0.35 * Math.max(0, 1 - u * 3.2 * reboundSpeed) + 13 * Math.min(1, u * 1.6 * reboundSpeed);
          envDecay = wState === 'heavy' ? Math.max(0.22, 1 - u * 0.85) : Math.max(0.55, 1 - u * 0.35);
        }
      }

      const activeAmp = ampScale * envDecay;
      const phaseOsc = this.animPhase < 1.0 ? Math.cos(this.waveTime * 2.6) : 1.0;

      // Impact shockwave halo during contact
      if (isContacting && squashFrac > 0.08) {
        ctx.save();
        const flashR = 22 + squashFrac * 14;
        const flashGrad = ctx.createRadialGradient(strikeX, strYBase, 2, strikeX, strYBase, flashR);
        flashGrad.addColorStop(0, wState === 'heavy' ? 'rgba(251, 146, 60, 0.52)' : 'rgba(254, 240, 138, 0.56)');
        flashGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(strikeX, strYBase, flashR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw shaded standing-wave vibration envelope (Saitenauslenkung!)
      ctx.save();
      ctx.fillStyle = wState === 'optimal'
        ? 'rgba(74, 222, 128, 0.15)'
        : (wState === 'light' ? 'rgba(56, 189, 248, 0.14)' : 'rgba(251, 146, 60, 0.15)');
      ctx.beginPath();
      const steps = 36;
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = strX1 + u * (strX2 - strX1);
        const y = strYBase - Math.sin(u * Math.PI) * activeAmp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = steps; i >= 0; i--) {
        const u = i / steps;
        const x = strX1 + u * (strX2 - strX1);
        const y = strYBase + Math.sin(u * Math.PI) * activeAmp * 0.68;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Dashed upper envelope boundary
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = badgeCol;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = strX1 + u * (strX2 - strX1);
        const y = strYBase - Math.sin(u * Math.PI) * activeAmp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Draw vibrating string choir: 1x/2x copper-wound in Bass (Keys 1..23), 3x plain steel trichord in Blankbezug (Keys 24..88)!
      const strThick = kd.isCopper ? 4.2 : Math.max(1.4, 2.3 - (kd.k - 24) * 0.012);
      const strGrad = ctx.createLinearGradient(strX1, 0, strX2, 0);
      if (kd.isCopper) {
        strGrad.addColorStop(0, '#ea580c');
        strGrad.addColorStop(0.5, '#fdba74');
        strGrad.addColorStop(1, '#ea580c');
      } else {
        strGrad.addColorStop(0, 'rgba(200, 163, 86, 0.60)');
        strGrad.addColorStop(0.5, 'rgba(255, 244, 204, 0.98)');
        strGrad.addColorStop(1, 'rgba(200, 163, 86, 0.60)');
      }
      const choirOffsets = kd.choirs === 3 ? [-4.2, 0, 4.2] : (kd.choirs === 2 ? [-2.6, 2.6] : [0]);
      choirOffsets.forEach((yOff, cIdx) => {
        ctx.save();
        ctx.globalAlpha = (kd.choirs === 3 && cIdx !== 1) ? 0.68 : (kd.choirs === 2 && cIdx === 0 ? 0.78 : 1.0);
        ctx.strokeStyle = strGrad;
        ctx.lineWidth = strThick;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const x = strX1 + u * (strX2 - strX1);
          const y = (strYBase + yOff * 0.45) - Math.sin(u * Math.PI) * activeAmp * phaseOsc * 0.85;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Copper winding visual hatch marks if in bass
      if (kd.isCopper) {
        ctx.strokeStyle = 'rgba(254, 215, 170, 0.68)';
        ctx.lineWidth = 1;
        for (let x = strX1 + 6; x < strX2 - 6; x += 5) {
          const u = (x - strX1) / (strX2 - strX1);
          const cy = strYBase - Math.sin(u * Math.PI) * activeAmp * phaseOsc * 0.85;
          ctx.beginPath();
          ctx.moveTo(x - 1, cy - 2.5);
          ctx.lineTo(x + 1, cy + 2.5);
          ctx.stroke();
        }
      }

      // End supports (Agraffe & Bridge pins)
      ctx.fillStyle = '#e6c882';
      ctx.beginPath();
      ctx.arc(strX1, strYBase, 3.5, 0, Math.PI * 2);
      ctx.arc(strX2, strYBase, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Deflection indicator on right of string
      const arrowX = strX2 - 20;
      const topDefY = strYBase - Math.max(5, activeAmp * 0.92);
      ctx.strokeStyle = '#e6c882';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(arrowX, strYBase);
      ctx.lineTo(arrowX, topDefY);
      ctx.stroke();
      ctx.font = '600 9.8px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = '#fde68a';
      ctx.textAlign = 'right';
      ctx.fillText(`↕ ${tr.deflectionLbl}`, strX2, topDefY - 4);

      // =========================================================================
      // Authentic Louis Renner Hammerhead Cross-Section (1:1 Proportions from Folie 27 "Renner")
      // Scales cleanly with actual hammer weight (15 g -> 5 g) & simulated offset!
      // =========================================================================
      const S_REF = 0.52;
      const FELT_TO_TOTAL = 0.785;
      const SHOULDER_HW_RATIO = 0.495 - 0.105 * S_REF;  // 0.4404
      const SHOULDER_Y_RATIO = 0.385 - 0.045 * S_REF;   // 0.3616
      const CROWN_CTRL_RATIO = 0.57 - 0.20 * S_REF;     // 0.4660

      const massScale = (kd.optWeightG - 5.0) / 10.0;   // 1.0 at A0 (15 g) .. 0.0 at C8 (5 g)
      const simScale = Math.min(1.13, Math.max(0.84, 1 + phys.wFrac * 0.20));
      const availH = Math.max(78, h - strYBase - 40);
      const maxRefH = Math.min(156, availH);
      const totalH = Math.min(availH + 2, maxRefH * (0.67 + 0.33 * massScale) * simScale);
      const feltH = totalH * FELT_TO_TOTAL;

      const squashPx = isContacting ? (4.5 + 3.5 * massScale) * squashFrac : 0;
      const flankFlexPx = squashPx * 0.55;

      const baseY0 = strYBase + Math.max(-activeAmp * 0.62, hammerGap);
      const crownTopY = isContacting
        ? Math.max(strYBase - activeAmp * 0.55 + 2, baseY0 - squashPx * 0.48)
        : baseY0;

      const shoulderHW = feltH * SHOULDER_HW_RATIO + flankFlexPx;
      const feltEndY = baseY0 + feltH;
      const woodBotY = baseY0 + totalH;
      const shoulderY = crownTopY + (feltEndY - crownTopY) * SHOULDER_Y_RATIO;
      const topSpan = Math.max(12, shoulderY - crownTopY);
      const botSpan = Math.max(16, feltEndY - shoulderY);

      // Hornbeam / Resonance Wooden Core (Hammerkern)
      const coreTipY = baseY0 + feltH * 0.34;
      const coreNoseHW = feltH * 0.088;
      const coreDomeY = coreTipY + coreNoseHW * 1.10;
      const coreWaistHW = feltH * 0.072;
      const coreFootHW = feltH * 0.098;

      // Crimson Underfelt (Unterfilz)
      const ufTipY = coreTipY - feltH * 0.062;
      const ufOuterHW = coreNoseHW + feltH * 0.045;
      const ufEndY = baseY0 + feltH * 0.675;
      const ufDomeY = coreDomeY - 1;
      const coreHWAtUfEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((ufEndY - coreDomeY) / Math.max(1, feltEndY - coreDomeY));

      const evalCubic = (p0, p1, p2, p3, t) => {
        const mt = 1 - t;
        return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
      };

      const lowX0 = shoulderHW;
      const lowX1 = shoulderHW;
      const lowX2 = coreWaistHW + (shoulderHW - coreWaistHW) * 0.35;
      const lowX3 = coreWaistHW + 0.6;
      const lowY0 = shoulderY;
      const lowY1 = shoulderY + botSpan * 0.41;
      const lowY2 = feltEndY - botSpan * 0.17;
      const lowY3 = feltEndY;

      const tRivet = 0.76;
      const rivetY = evalCubic(lowY0, lowY1, lowY2, lowY3, tRivet);
      const rivetOuterHW = evalCubic(lowX0, lowX1, lowX2, lowX3, tRivet);

      // Unloaded ghost silhouette at rest when animating strike
      if (this.animPhase < 1.0) {
        const restY0 = strYBase + 8.5;
        const restShHW = feltH * SHOULDER_HW_RATIO;
        const restFeltEndY = restY0 + feltH;
        const restShY = restY0 + feltH * SHOULDER_Y_RATIO;
        const restTopSpan = restShY - restY0;
        const restBotSpan = restFeltEndY - restShY;
        const restCrownCtrl = restShHW * CROWN_CTRL_RATIO;
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(strikeX, restY0);
        ctx.bezierCurveTo(strikeX + restCrownCtrl, restY0, strikeX + restShHW, restShY - restTopSpan * 0.53, strikeX + restShHW, restShY);
        ctx.bezierCurveTo(strikeX + restShHW, restShY + restBotSpan * 0.41, strikeX + coreWaistHW + (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17, strikeX + coreWaistHW + 0.6, restFeltEndY);
        ctx.moveTo(strikeX, restY0);
        ctx.bezierCurveTo(strikeX - restCrownCtrl, restY0, strikeX - restShHW, restShY - restTopSpan * 0.53, strikeX - restShHW, restShY);
        ctx.bezierCurveTo(strikeX - restShHW, restShY + restBotSpan * 0.41, strikeX - coreWaistHW - (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17, strikeX - coreWaistHW - 0.6, restFeltEndY);
        ctx.stroke();
        ctx.restore();
      }

      // 1. Hornbeam Wooden Core (Hammerkern) with flared Renner foot
      const woodPath = new Path2D();
      woodPath.moveTo(strikeX, coreTipY);
      woodPath.bezierCurveTo(strikeX + coreNoseHW * 0.58, coreTipY, strikeX + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, strikeX + coreNoseHW, coreDomeY);
      woodPath.lineTo(strikeX + coreWaistHW, feltEndY);
      woodPath.bezierCurveTo(strikeX + coreWaistHW * 0.94, feltEndY + (woodBotY - feltEndY) * 0.38, strikeX + coreFootHW, woodBotY - (woodBotY - feltEndY) * 0.24, strikeX + coreFootHW, woodBotY);
      woodPath.lineTo(strikeX - coreFootHW, woodBotY);
      woodPath.bezierCurveTo(strikeX - coreFootHW, woodBotY - (woodBotY - feltEndY) * 0.24, strikeX - coreWaistHW * 0.94, feltEndY + (woodBotY - feltEndY) * 0.38, strikeX - coreWaistHW, feltEndY);
      woodPath.lineTo(strikeX - coreNoseHW, coreDomeY);
      woodPath.bezierCurveTo(strikeX - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, strikeX - coreNoseHW * 0.58, coreTipY, strikeX, coreTipY);
      woodPath.closePath();

      ctx.save();
      const woodGrad = ctx.createLinearGradient(strikeX - coreFootHW, coreTipY, strikeX + coreFootHW, woodBotY);
      woodGrad.addColorStop(0, '#f3d9b1');
      woodGrad.addColorStop(0.50, '#d6a86e');
      woodGrad.addColorStop(1, '#a8743d');
      ctx.fillStyle = woodGrad;
      ctx.fill(woodPath);

      ctx.clip(woodPath);
      ctx.fillStyle = 'rgba(115, 64, 22, 0.28)';
      for (let wy = coreTipY + 5; wy < woodBotY - 3; wy += 7) {
        const off = ((Math.round(wy) % 14) === 0) ? -2.8 : 2.2;
        ctx.fillRect(strikeX + off - 0.8, wy, 1.4, 3.4);
        ctx.fillRect(strikeX - off * 1.15, wy + 2.8, 1.2, 2.8);
      }
      ctx.strokeStyle = 'rgba(92, 50, 16, 0.32)';
      ctx.setLineDash([2.5, 2.5]);
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(strikeX, feltEndY + 3);
      ctx.lineTo(strikeX, woodBotY);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(243, 217, 177, 0.52)';
      ctx.lineWidth = 0.95;
      ctx.stroke(woodPath);
      ctx.restore();

      // 2. Crimson/Magenta Underfelt Horseshoe Cap (Unterfilz)
      const ufPath = new Path2D();
      ufPath.moveTo(strikeX, ufTipY);
      ufPath.bezierCurveTo(strikeX + ufOuterHW * 0.60, ufTipY, strikeX + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, strikeX + ufOuterHW, ufDomeY);
      ufPath.bezierCurveTo(strikeX + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, strikeX + coreHWAtUfEnd + 1.8, ufEndY - (ufEndY - ufDomeY) * 0.22, strikeX + coreHWAtUfEnd + 0.3, ufEndY);
      ufPath.lineTo(strikeX + coreNoseHW, coreDomeY);
      ufPath.bezierCurveTo(strikeX + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, strikeX + coreNoseHW * 0.58, coreTipY, strikeX, coreTipY);
      ufPath.bezierCurveTo(strikeX - coreNoseHW * 0.58, coreTipY, strikeX - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, strikeX - coreNoseHW, coreDomeY);
      ufPath.lineTo(strikeX - coreHWAtUfEnd - 0.3, ufEndY);
      ufPath.bezierCurveTo(strikeX - coreHWAtUfEnd - 1.8, ufEndY - (ufEndY - ufDomeY) * 0.22, strikeX - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, strikeX - ufOuterHW, ufDomeY);
      ufPath.bezierCurveTo(strikeX - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, strikeX - ufOuterHW * 0.60, ufTipY, strikeX, ufTipY);
      ufPath.closePath();

      ctx.save();
      const ufGrad = ctx.createLinearGradient(strikeX, ufTipY, strikeX, ufEndY);
      ufGrad.addColorStop(0, '#db2777');
      ufGrad.addColorStop(0.65, '#be185d');
      ufGrad.addColorStop(1, '#831843');
      ctx.fillStyle = ufGrad;
      ctx.fill(ufPath);
      ctx.restore();

      // 3. Merino Oberfilz Cloak & Compaction Profile
      const flatHW = isContacting ? Math.min(shoulderHW * 0.36, squashPx * 0.72) : 0;
      const crownCtrlX = flatHW + (shoulderHW - flatHW) * CROWN_CTRL_RATIO;

      const feltCloak = new Path2D();
      feltCloak.moveTo(strikeX - flatHW, crownTopY);
      if (flatHW > 0.4) feltCloak.lineTo(strikeX + flatHW, crownTopY);
      feltCloak.bezierCurveTo(strikeX + crownCtrlX, crownTopY, strikeX + shoulderHW, shoulderY - topSpan * 0.53, strikeX + shoulderHW, shoulderY);
      feltCloak.bezierCurveTo(strikeX + lowX1, lowY1, strikeX + lowX2, lowY2, strikeX + lowX3, lowY3);
      feltCloak.lineTo(strikeX + coreHWAtUfEnd + 0.3, ufEndY);
      feltCloak.bezierCurveTo(strikeX + coreHWAtUfEnd + 1.8, ufEndY - (ufEndY - ufDomeY) * 0.22, strikeX + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, strikeX + ufOuterHW, ufDomeY);
      feltCloak.bezierCurveTo(strikeX + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, strikeX + ufOuterHW * 0.60, ufTipY, strikeX, ufTipY);
      feltCloak.bezierCurveTo(strikeX - ufOuterHW * 0.60, ufTipY, strikeX - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, strikeX - ufOuterHW, ufDomeY);
      feltCloak.bezierCurveTo(strikeX - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, strikeX - coreHWAtUfEnd - 1.8, ufEndY - (ufEndY - ufDomeY) * 0.22, strikeX - coreHWAtUfEnd - 0.3, ufEndY);
      feltCloak.lineTo(strikeX - lowX3, lowY3);
      feltCloak.bezierCurveTo(strikeX - lowX2, lowY2, strikeX - lowX1, lowY1, strikeX - shoulderHW, shoulderY);
      feltCloak.bezierCurveTo(strikeX - shoulderHW, shoulderY - topSpan * 0.53, strikeX - crownCtrlX, crownTopY, strikeX - flatHW, crownTopY);
      feltCloak.closePath();

      ctx.save();
      ctx.clip(feltCloak);
      ctx.fillStyle = '#131e2f';
      ctx.fillRect(strikeX - shoulderHW - 16, crownTopY - 8, shoulderHW * 2 + 32, feltH + 24);

      const shFrac = Math.max(0.24, Math.min(0.55, (shoulderY - crownTopY) / Math.max(1, feltH)));
      const axialGrad = ctx.createLinearGradient(strikeX, crownTopY, strikeX, feltEndY);
      axialGrad.addColorStop(0, wState === 'heavy' ? 'rgba(249, 115, 22, 0.72)' : (wState === 'light' ? 'rgba(56, 189, 248, 0.52)' : 'rgba(249, 115, 22, 0.58)'));
      axialGrad.addColorStop(shFrac * 0.58, 'rgba(234, 179, 8, 0.42)');
      axialGrad.addColorStop(shFrac, 'rgba(20, 184, 166, 0.38)');
      axialGrad.addColorStop(Math.min(0.88, shFrac + 0.34), 'rgba(56, 189, 248, 0.28)');
      axialGrad.addColorStop(1, 'rgba(251, 191, 36, 0.30)');
      ctx.fillStyle = axialGrad;
      ctx.fillRect(strikeX - shoulderHW - 16, crownTopY - 8, shoulderHW * 2 + 32, feltH + 24);

      // Merino Wool Fiber Loops anchored into lower glue zone (matching Folie 27)
      ctx.strokeStyle = 'rgba(255, 250, 235, 0.24)';
      ctx.lineWidth = 0.95;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        const fTopY = ufTipY - (ufTipY - crownTopY) * f;
        const fShHW = ufOuterHW + (shoulderHW - ufOuterHW) * f;
        const fShY = ufDomeY + (shoulderY - ufDomeY) * f;
        const fEndY = ufEndY + (feltEndY - ufEndY) * f;
        const fEndHW = coreWaistHW + 0.8 + (1 - f) * 1.4;
        const fTopSpan = Math.max(6, fShY - fTopY);
        const fBotSpan = Math.max(8, fEndY - fShY);
        ctx.beginPath();
        ctx.moveTo(strikeX - fEndHW, fEndY);
        ctx.bezierCurveTo(strikeX - fEndHW - (fShHW - fEndHW) * 0.35, fEndY - fBotSpan * 0.17, strikeX - fShHW, fShY + fBotSpan * 0.41, strikeX - fShHW, fShY);
        ctx.bezierCurveTo(strikeX - fShHW, fShY - fTopSpan * 0.53, strikeX - fShHW * 0.48, fTopY, strikeX, fTopY);
        ctx.bezierCurveTo(strikeX + fShHW * 0.48, fTopY, strikeX + fShHW, fShY - fTopSpan * 0.53, strikeX + fShHW, fShY);
        ctx.bezierCurveTo(strikeX + fShHW, fShY + fBotSpan * 0.41, strikeX + fEndHW + (fShHW - fEndHW) * 0.35, fEndY - fBotSpan * 0.17, strikeX + fEndHW, fEndY);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Glue Seam (Klebstoff) & 3D Brass T-Rivet (t = 0.76)
      ctx.save();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.88)';
      ctx.lineWidth = 1.6;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(strikeX + side * (coreHWAtUfEnd + 0.4), ufEndY);
        ctx.lineTo(strikeX + side * (coreWaistHW + 0.4), feltEndY);
        ctx.stroke();
      }

      const rivSpanHW = Math.max(coreWaistHW + 2.5, rivetOuterHW - 0.6);
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.72)';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(strikeX - rivSpanHW, rivetY);
      ctx.lineTo(strikeX + rivSpanHW, rivetY);
      ctx.stroke();

      const rivGrad = ctx.createLinearGradient(strikeX - rivSpanHW, rivetY - 1.5, strikeX + rivSpanHW, rivetY + 1.5);
      rivGrad.addColorStop(0, '#f59e0b');
      rivGrad.addColorStop(0.5, '#fef08a');
      rivGrad.addColorStop(1, '#d97706');
      ctx.strokeStyle = rivGrad;
      ctx.lineWidth = 1.9;
      ctx.beginPath();
      ctx.moveTo(strikeX - rivSpanHW, rivetY);
      ctx.lineTo(strikeX + rivSpanHW, rivetY);
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 0.8;
      for (const rx of [strikeX - rivSpanHW, strikeX + rivSpanHW]) {
        ctx.beginPath();
        ctx.arc(rx, rivetY, 2.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // 5. Glowing Outer Tension Membrane (Spannungsmembran)
      const memCol = wState === 'optimal' ? '#2ecc71' : (wState === 'light' ? '#38bdf8' : '#fb923c');
      ctx.save();
      ctx.strokeStyle = memCol;
      ctx.lineWidth = isContacting ? 2.8 : 2.2;
      ctx.shadowColor = memCol;
      ctx.shadowBlur = isContacting ? 12 : 6;
      ctx.beginPath();
      ctx.moveTo(strikeX - lowX3, lowY3);
      ctx.bezierCurveTo(strikeX - lowX2, lowY2, strikeX - lowX1, lowY1, strikeX - shoulderHW, shoulderY);
      ctx.bezierCurveTo(strikeX - shoulderHW, shoulderY - topSpan * 0.53, strikeX - crownCtrlX, crownTopY, strikeX - flatHW, crownTopY);
      if (flatHW > 0.4) ctx.lineTo(strikeX + flatHW, crownTopY);
      ctx.bezierCurveTo(strikeX + crownCtrlX, crownTopY, strikeX + shoulderHW, shoulderY - topSpan * 0.53, strikeX + shoulderHW, shoulderY);
      ctx.bezierCurveTo(strikeX + lowX1, lowY1, strikeX + lowX2, lowY2, strikeX + lowX3, lowY3);
      ctx.stroke();
      ctx.restore();

      // If overweight, draw self-damping warning arcs at the crown
      if (wState === 'heavy') {
        ctx.save();
        ctx.strokeStyle = 'rgba(248, 113, 113, 0.88)';
        ctx.lineWidth = 1.7;
        for (let r = 8; r <= 15; r += 7) {
          ctx.beginPath();
          ctx.arc(strikeX, crownTopY + 1, r, Math.PI * 1.12, Math.PI * 1.88);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Live Hammer Weight floating glass pill beside the shoulder
      const decSep = this.lang === 'de' ? ',' : '.';
      const wBadge = `mₕ = ${phys.simWeightG.toFixed(1).replace('.', decSep)} g`;
      ctx.save();
      ctx.font = '700 11.2px "JetBrains Mono", monospace';
      const wbW = ctx.measureText(wBadge).width + 16;
      const wbX = Math.min(splitX - wbW - 10, strikeX + shoulderHW + 12);
      const wbY = Math.round(shoulderY - 10);
      ctx.fillStyle = 'rgba(8, 13, 24, 0.88)';
      ctx.strokeStyle = badgeBorder;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(wbX, wbY, wbW, 20, 6);
      ctx.fill();
      ctx.stroke();
      // Leader line to shoulder
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(strikeX + shoulderHW + 2, shoulderY);
      ctx.lineTo(wbX, wbY + 10);
      ctx.stroke();
      ctx.fillStyle = badgeCol;
      ctx.textAlign = 'left';
      ctx.fillText(wBadge, wbX + 8, wbY + 14);
      ctx.restore();

      // Subtle left anatomical reference ticks (1/2 Flanke & Niete)
      if (strikeX - shoulderHW > leftPad + 74) {
        ctx.save();
        ctx.font = '600 9.8px "Inter", "Roboto", sans-serif';
        ctx.textAlign = 'left';
        const flankTxt = tr.flankRef || '½ Flanke';
        const rivetTxt = tr.rivetRef || 'T-Niete';

        ctx.fillStyle = 'rgba(125, 211, 252, 0.86)';
        ctx.fillText(flankTxt, leftPad + 2, shoulderY + 3);
        const flankLineStart = leftPad + 2 + ctx.measureText(flankTxt).width + 5;
        if (strikeX - shoulderHW - 3 > flankLineStart + 4) {
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.25)';
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(flankLineStart, shoulderY);
          ctx.lineTo(strikeX - shoulderHW - 3, shoulderY);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
        ctx.fillText(rivetTxt, leftPad + 2, rivetY + 3);
        const rivetLineStart = leftPad + 2 + ctx.measureText(rivetTxt).width + 5;
        if (strikeX - rivSpanHW - 4 > rivetLineStart + 4) {
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.24)';
          ctx.beginPath();
          ctx.moveTo(rivetLineStart, rivetY);
          ctx.lineTo(strikeX - rivSpanHW - 4, rivetY);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Clean bottom caption strip on Left Stage (String type + Rebound behavior)
      const reboundTxt = wState === 'optimal' ? tr.reboundIdeal : (wState === 'light' ? tr.reboundFast : tr.reboundSlow);
      const strTypeTxt = kd.isCopper ? (typeof tr.stringLabelCu === 'function' ? tr.stringLabelCu(kd.choirs) : tr.stringLabelCu) : tr.stringLabelSt;
      ctx.save();
      ctx.fillStyle = 'rgba(8, 12, 22, 0.82)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(leftPad, h - 27, splitX - leftPad - 12, 21, 6);
      ctx.fill();
      ctx.stroke();
      ctx.font = '600 10.2px "Inter", "Roboto", sans-serif';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.90)';
      ctx.textAlign = 'left';
      ctx.fillText(strTypeTxt, leftPad + 8, h - 13);
      ctx.fillStyle = badgeCol;
      ctx.textAlign = 'right';
      ctx.fillText(reboundTxt, splitX - 20, h - 13);
      ctx.restore();

      // =========================================================================
      // RIGHT SIDE: 3 Recessed Glass Equilibrium Meter Cards (τc, Deflection, Tone)
      // =========================================================================
      const rx0 = splitX + 14;
      const rw = Math.max(120, w - rx0 - 14);
      const bars = [
        {
          title: tr.bar1Title,
          valNorm: phys.tauNorm,
          idealStart: 0.36,
          idealEnd: 0.64,
          status: wState === 'optimal' ? tr.tauStatusOk : (wState === 'light' ? tr.tauStatusShort : tr.tauStatusLong),
          color: wState === 'optimal' ? '#4ade80' : (wState === 'light' ? '#38bdf8' : '#f97316')
        },
        {
          title: tr.bar2Title,
          valNorm: phys.ampNorm,
          idealStart: 0.62,
          idealEnd: 0.88,
          status: wState === 'optimal' ? tr.ampStatusOk : (wState === 'light' ? tr.ampStatusLow : tr.ampStatusHigh),
          color: wState === 'optimal' ? '#4ade80' : (wState === 'light' ? '#38bdf8' : '#fbbf24')
        },
        {
          title: tr.bar3Title,
          valNorm: phys.toneNorm,
          idealStart: 0.78,
          idealEnd: 1.00,
          status: wState === 'optimal' ? tr.toneStatusOk : (wState === 'light' ? tr.toneStatusLight : tr.toneStatusHeavy),
          color: wState === 'optimal' ? '#e6c882' : (wState === 'light' ? '#38bdf8' : '#f87171')
        }
      ];

      const cardGap = 9;
      const topPadR = 10;
      const botPadR = 10;
      const cardH = Math.max(46, Math.floor((h - topPadR - botPadR - cardGap * 2) / 3));

      bars.forEach((b, idx) => {
        const cy = topPadR + idx * (cardH + cardGap);

        // Recessed glass card container
        ctx.save();
        const cardGrad = ctx.createLinearGradient(rx0, cy, rx0, cy + cardH);
        cardGrad.addColorStop(0, 'rgba(18, 26, 42, 0.78)');
        cardGrad.addColorStop(1, 'rgba(9, 14, 24, 0.88)');
        ctx.fillStyle = cardGrad;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.085)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(rx0, cy, rw, cardH, 9);
        ctx.fill();
        ctx.stroke();

        // Colored left accent bar
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(rx0, cy + 6, 3, cardH - 12, 1.5);
        ctx.fill();

        const innerX = rx0 + 12;
        const innerW = rw - 22;
        const textY = cy + Math.min(20, Math.round(cardH * 0.36));

        ctx.font = '700 11.4px "Inter", "Roboto", sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'left';
        ctx.fillText(b.title, innerX, textY);

        ctx.font = '600 10.6px "Inter", "Roboto", sans-serif';
        ctx.fillStyle = b.color;
        ctx.textAlign = 'right';
        ctx.fillText(b.status, innerX + innerW, textY);

        const trackH = 11;
        const trackY = cy + cardH - trackH - Math.max(8, Math.round(cardH * 0.19));

        // Dark recessed track well
        ctx.fillStyle = 'rgba(4, 7, 14, 0.85)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(innerX, trackY, innerW, trackH, 5.5);
        ctx.fill();
        ctx.stroke();

        // Ideal target zone window
        const ix = innerX + b.idealStart * innerW;
        const iw = (b.idealEnd - b.idealStart) * innerW;
        ctx.fillStyle = 'rgba(46, 204, 113, 0.18)';
        ctx.fillRect(ix, trackY + 1, iw, trackH - 2);
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.62)';
        ctx.lineWidth = 1;
        ctx.strokeRect(ix + 0.5, trackY + 0.5, iw - 1, trackH - 1);

        // Active value fill + glow
        const mx = innerX + Math.max(0.03, Math.min(1, b.valNorm)) * innerW;
        const barFillGrad = ctx.createLinearGradient(innerX, 0, mx, 0);
        barFillGrad.addColorStop(0, 'rgba(200, 163, 86, 0.45)');
        barFillGrad.addColorStop(1, b.color);

        if (idx === 0) {
          ctx.fillStyle = barFillGrad;
          ctx.beginPath();
          ctx.roundRect(innerX + 1.5, trackY + 2, Math.max(6, mx - innerX - 1.5), trackH - 4, 3.5);
          ctx.fill();

          ctx.shadowColor = b.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(mx, trackY + trackH * 0.5, 5.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          const fw = Math.max(8, mx - innerX - 2);
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = barFillGrad;
          ctx.beginPath();
          ctx.roundRect(innerX + 1.5, trackY + 1.8, fw, trackH - 3.6, 4);
          ctx.fill();
        }
        ctx.restore();
      });
    }
  }

  window.HammerWeightBalanceController = new HammerWeightBalanceController();
})();
