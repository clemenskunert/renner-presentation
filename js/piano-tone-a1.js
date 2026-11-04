/**
 * Louis Renner Masterclass Presentation
 * Slide 33 (Chapter 5 Opening): Interactive Piano Tone Partial Structure on A1 (55 Hz)
 * - Partials H1..H12 (55 Hz - 660 Hz) in dB and signed ΔdB
 * - Tonal Hardness (Felt Elasticity & Contact Time τc)
 * - Hammer Strike Point x0 / L (Young-Helmholtz Standing Wave & Node Suppression)
 * - Real-time Web Audio Additive Synthesis of A1 (55 Hz)
 * - Full 4-Language Localization (DE, EN, JA, ZH) + Desktop & iPad Touch Support
 */

(function () {
  'use strict';

  const STRING_LENGTH_MM = 1560; // Speaking length of concert grand A1 (~156 cm)
  const REF_ALPHA = 0.125;       // 1/8 L concert grand reference strike point

  const PARTIALS_BASE = [
    { n: 1,  noteDe: 'A1',    noteInt: 'A1',    freq: 55,  dissonant: false, baseDb:  4.5 },
    { n: 2,  noteDe: 'A2',    noteInt: 'A2',    freq: 110, dissonant: false, baseDb:  1.1 },
    { n: 3,  noteDe: 'E3',    noteInt: 'E3',    freq: 165, dissonant: false, baseDb: -2.2 },
    { n: 4,  noteDe: 'A3',    noteInt: 'A3',    freq: 220, dissonant: false, baseDb: -5.0 },
    { n: 5,  noteDe: 'Cis4',  noteInt: 'C#4',   freq: 275, dissonant: false, baseDb: -7.5 },
    { n: 6,  noteDe: 'E4',    noteInt: 'E4',    freq: 330, dissonant: false, baseDb: -9.8 },
    { n: 7,  noteDe: 'G4−',   noteInt: 'G4−',   freq: 385, dissonant: true,  baseDb: -12.0 },
    { n: 8,  noteDe: 'A4',    noteInt: 'A4',    freq: 440, dissonant: false, baseDb: -10.8 },
    { n: 9,  noteDe: 'H4',    noteInt: 'B4',    freq: 495, dissonant: true,  baseDb: -14.5 },
    { n: 10, noteDe: 'Cis5',  noteInt: 'C#5',   freq: 550, dissonant: false, baseDb: -18.0 },
    { n: 11, noteDe: 'Dis5−', noteInt: 'D#5−',  freq: 605, dissonant: true,  baseDb: -20.5 },
    { n: 12, noteDe: 'E5',    noteInt: 'E5',    freq: 660, dissonant: false, baseDb: -22.5 }
  ];

  const I18N = {
    de: {
      intervals: [
        'Grundton', '1. Okt.', 'Duodezime', '2. Okt.',
        'Gr. Terz', 'Quinte', '7. Sept.', '3. Okt.',
        'Gr. Sek.', 'Gr. Terz', '11. Teilt.', 'Quinte'
      ],
      roles: [
        'Fundament & Tragkraft', 'Volumen, Wärme & Körper', 'Sonorer Kern & Fülle', 'Klarer Oktavglanz',
        'Cantabile & edle Klangfarbe', 'Brillanz & Projektion', 'Reibungston (rau / unrein)', 'Strahlkraft & Präsenz',
        'Metallische Schärfe', 'Heller Obertonglanz', 'Scharfer Zwischen-Teilton', 'Feine Attack-Spitze'
      ],
      legendAbs: '--- Konzert-Ideal  |  Grün: H₁–H₄ Fundament  |  Gold: Konsonante Obertöne  |  Bernstein: Reibungstöne (H₇, H₉, H₁₁)',
      legendDelta: 'Orange (+dB): Teilton-Zunahme ggü. Konzert-Ideal  |  Hellblau (−dB): Teilton-Abnahme / Knoten-Dämpfung',
      agraffe: 'Agraffe (0)',
      bridge: 'Basssteg (L = 1.560 mm)',
      hitNode: (n, db) => `● Trifft Knoten von H${n} (${db})`,
      hitAntinode: (n) => `▲ Trifft Schwingungsbauch von H${n} (maximal)`,
      hitPartial: (n, db) => `◐ Teil-Anregung von H${n} (${db})`,
      hConcert: 'Konzert-Ideal',
      hSoft: (p) => `Tonlich weich (${p} %)`,
      hSlightlySoft: (p) => `Leicht weich (${p} %)`,
      hHard: (p) => `Tonlich hart (+${p} %)`,
      hSlightlyHard: (p) => `Leicht brillant (+${p} %)`,
      roRefCur: (r, c) => `Ref ${r} → ${c}`,
      roDelta: (tot, felt, str) => `Δ ${tot} (Filz ${felt} | x₀ ${str})`,
      waveLbl: (n) => `H${n} (${n} ${n === 1 ? 'Bauch' : 'Bäuche'})`,
      dampedSub: (note, freq) => `${note} (${freq} Hz) gedämpft`,
      expTitleSoft: 'Tonlich weicher Klang: Lange Kontaktzeit dämpft hohe Teiltöne',
      expBodySoft: (tau, mb) =>
        `Der elastischere Filz federt tiefer ein (<strong>τc ≈ ${tau} ms</strong>): Die Obertöne H₆–H₁₂ nehmen im Mittel um <strong>${mb}</strong> ab, während Grundton H₁ und Oktave H₂ warm und lang ausschwingend hervortreten.`,
      expTitleHard: 'Tonlich harter Klang: Kurzer Kraftimpuls hebt hohe Teiltöne stark an',
      expBodyHard: (tau, mb, h12) =>
        `Der stark verdichtete Scheitel prallt kurz ab (<strong>τc ≈ ${tau} ms</strong>): Hohe Teiltöne H₆–H₁₂ steigen im Mittel um <strong>${mb}</strong> (Spitze H₁₂: <strong>${h12}</strong>) — der Ton wird lauter und metallischer, schwingt aber kürzer aus.`,
      expTitleConcert: 'Konzert-Balance: Tragfähiger Kern mit kontrollierter Obertonkrone',
      expBodyConcert: (tau) =>
        `Ausgewogene Hammerelastizität (<strong>τc ≈ ${tau} ms</strong>): Volles Bassfundament (H₁–H₄) verbindet sich mit der singenden großen Terz H₅ (275 Hz) und Quinte H₆ (330 Hz) ohne metallische Härte.`,
      strikeNear: (mm, ratio, d1) =>
        `<strong>Anschlagspunkt nah an der Agraffe (${mm} mm · 1/${ratio} L):</strong> Grundton H₁ verliert <strong>${d1}</strong> an Hebelarm, während hohe Teiltöne stark hervortreten — das Klangbild wirkt dünner und drahtig.`,
      strike9: (mm) =>
        `<strong>Anschlagspunkt ≈ 1/9 L (${mm} mm):</strong> Löscht gezielt den scharfen <strong>9. Teilton H₉ (Sekunde, 495 Hz)</strong> im Knoten aus und öffnet H₅–H₈ für klare Projektion.`,
      strike8: (mm, loss8) =>
        `<strong>Klassischer Anschlagspunkt 1/8 L (${mm} mm):</strong> Legt einen Knoten auf <strong>H₈ (${loss8})</strong> und dämpft zugleich die reibenden Nachbarn <strong>H₇ (Septime)</strong> und <strong>H₉ (Sekunde)</strong> harmonisch ab.`,
      strike7: (mm, loss7) =>
        `<strong>Helmholtz-Anschlagspunkt 1/7 L (${mm} mm):</strong> Unterdrückt gezielt die unreine <strong>Naturseptime H₇ (385 Hz, ${loss7})</strong> im Schwingungsknoten für maximale Milde und Grundtonfülle.`,
      strikeCenter: (mm, ratio, d5) =>
        `<strong>Anschlagspunkt Richtung Saitenmitte (${mm} mm · 1/${ratio} L):</strong> Löscht die klangentscheidende <strong>Dur-Terz H₅ (275 Hz, ${d5})</strong> aus — der Ton verliert seinen Glanz und klingt hohl.`,
      strikeCustom: (mm, ratio, n, note, loss) =>
        `<strong>Anschlagspunkt ${mm} mm (1/${ratio} L):</strong> Stärkste Knoten-Dämpfung liegt aktuell bei <strong>H${n} (${note}, ${loss})</strong>; verschieben Sie den Hammer für den direkten Knoten-Vergleich.`
    },

    en: {
      intervals: [
        'Fundam.', '1st Oct', 'Twelfth', '2nd Oct',
        'Maj 3rd', 'Perf 5th', 'Harm 7th', '3rd Oct',
        'Maj 2nd', 'Maj 3rd', '11th Part.', 'Perf 5th'
      ],
      roles: [
        'Foundation & Projection', 'Warmth, Body & Volume', 'Sonorous Core & Richness', 'Clear Octave Sheen',
        'Cantabile & Singing Color', 'Brilliance & Carry', 'Roughness Partial (unpure)', 'Presence & Radiance',
        'Metallic Edge', 'Bright Overtone Shimmer', 'Sharp Inter-Harmonic', 'Crisp Attack Tip'
      ],
      legendAbs: '--- Concert Ideal  |  Green: H₁–H₄ Foundation  |  Gold: Consonant Overtones  |  Amber: Roughness (H₇, H₉, H₁₁)',
      legendDelta: 'Orange (+dB): Partial Gain vs. Concert Ideal  |  Sky Blue (−dB): Partial Loss / Node Suppression',
      agraffe: 'Agraffe (0)',
      bridge: 'Bass Bridge (L = 1,560 mm)',
      hitNode: (n, db) => `● Hits Node of H${n} (${db})`,
      hitAntinode: (n) => `▲ Hits Antinode of H${n} (max)`,
      hitPartial: (n, db) => `◐ Partial Excitation of H${n} (${db})`,
      hConcert: 'Concert Ideal',
      hSoft: (p) => `Tonally Soft (${p}%)`,
      hSlightlySoft: (p) => `Slightly Soft (${p}%)`,
      hHard: (p) => `Tonally Hard (+${p}%)`,
      hSlightlyHard: (p) => `Slightly Bright (+${p}%)`,
      roRefCur: (r, c) => `Ref ${r} → ${c}`,
      roDelta: (tot, felt, str) => `Δ ${tot} (Felt ${felt} | x₀ ${str})`,
      waveLbl: (n) => `H${n} (${n} ${n === 1 ? 'antinode' : 'antinodes'})`,
      dampedSub: (note, freq) => `${note} (${freq} Hz) suppressed`,
      expTitleSoft: 'Tonally Soft Sound: Longer Contact Time Attenuates Upper Partials',
      expBodySoft: (tau, mb) =>
        `More elastic felt cushions deeper (<strong>τc ≈ ${tau} ms</strong>): Upper partials H₆–H₁₂ drop by <strong>${mb}</strong> on average, while fundamental H₁ and octave H₂ bloom warmly with longer sustain.`,
      expTitleHard: 'Tonally Hard Sound: Short Impulse Strongly Boosts Upper Partials',
      expBodyHard: (tau, mb, h12) =>
        `A heavily compressed crown rebounds fast (<strong>τc ≈ ${tau} ms</strong>): Upper partials H₆–H₁₂ rise by <strong>${mb}</strong> (peak H₁₂: <strong>${h12}</strong>) — sounding louder and brighter, but with shorter sustain.`,
      expTitleConcert: 'Concert Balance: Carrying Core with Controlled Harmonic Crown',
      expBodyConcert: (tau) =>
        `Balanced hammer elasticity (<strong>τc ≈ ${tau} ms</strong>): Full bass foundation (H₁–H₄) blends with the singing major third H₅ (275 Hz) and fifth H₆ (330 Hz) without metallic harshness.`,
      strikeNear: (mm, ratio, d1) =>
        `<strong>Strike Point Near Agraffe (${mm} mm · 1/${ratio} L):</strong> Fundamental H₁ loses <strong>${d1}</strong> of leverage while upper partials dominate — producing a thin, wiry timbre.`,
      strike9: (mm) =>
        `<strong>Strike Point ≈ 1/9 L (${mm} mm):</strong> Cancels the sharp <strong>9th partial H₉ (major 2nd, 495 Hz)</strong> at its node while opening H₅–H₈ for clear projection.`,
      strike8: (mm, loss8) =>
        `<strong>Classic Strike Point 1/8 L (${mm} mm):</strong> Places a node on <strong>H₈ (${loss8})</strong> and simultaneously tames neighboring dissonant partials <strong>H₇ (7th)</strong> and <strong>H₉ (2nd)</strong>.`,
      strike7: (mm, loss7) =>
        `<strong>Helmholtz Strike Point 1/7 L (${mm} mm):</strong> Suppresses the unpure <strong>natural seventh H₇ (385 Hz, ${loss7})</strong> at its node for maximum warmth and smoothness.`,
      strikeCenter: (mm, ratio, d5) =>
        `<strong>Strike Point Toward String Center (${mm} mm · 1/${ratio} L):</strong> Cancels the vital <strong>major third H₅ (275 Hz, ${d5})</strong> — stripping singing color and leaving a hollow tone.`,
      strikeCustom: (mm, ratio, n, note, loss) =>
        `<strong>Strike Point ${mm} mm (1/${ratio} L):</strong> Strongest node suppression is currently at <strong>H${n} (${note}, ${loss})</strong>; drag the hammer along the string to compare nodes.`
    },

    ja: {
      intervals: [
        '基音', '第1Oct', '12度（5度）', '第2Oct',
        '長3度', '完全5度', '自然7度', '第3Oct',
        '長2度', '長3度', '第11倍音', '完全5度'
      ],
      roles: [
        '重厚な土台と遠達性', '温かみと豊かな響き', '充実した音の芯', '澄んだオクターブの輝き',
        'カンタービレと色彩感', 'ブリリアンスと投射力', 'うなり・粗さ成分', '存在感と輝き',
        '金属的な鋭さ', '明るい高次倍音', '鋭い中間倍音', '繊細なアタック成分'
      ],
      legendAbs: '--- 白破線 = コンサート基準  |  緑: H₁–H₄ 基音土台  |  金: 協和倍音  |  琥珀: 不協和倍音 (H₇, H₉, H₁₁)',
      legendDelta: 'オレンジ (+dB): 基準からの倍音増加  |  水色 (−dB): 倍音減少・節（ノード）減衰',
      agraffe: 'アグラフ (0)',
      bridge: '低音駒 (L = 1,560 mm)',
      hitNode: (n, db) => `● H${n} の節（ノード）を打弦 (${db})`,
      hitAntinode: (n) => `▲ H${n} の腹（最大振幅）を打弦`,
      hitPartial: (n, db) => `◐ H${n} を部分励起 (${db})`,
      hConcert: 'コンサート基準',
      hSoft: (p) => `柔らかい音色 (${p}%)`,
      hSlightlySoft: (p) => `やや柔らかめ (${p}%)`,
      hHard: (p) => `硬い音色 (+${p}%)`,
      hSlightlyHard: (p) => `やや華やか (+${p}%)`,
      roRefCur: (r, c) => `基準 ${r} → ${c}`,
      roDelta: (tot, felt, str) => `Δ ${tot} (硬度 ${felt} | x₀ ${str})`,
      waveLbl: (n) => `H${n}（腹 ${n} 個）`,
      dampedSub: (note, freq) => `${note} (${freq} Hz) を抑制`,
      expTitleSoft: '柔らかい音色：長い接触時間が高次倍音を穏やかに減衰',
      expBodySoft: (tau, mb) =>
        `弾性に富むフェルトが深く沈み込み（<strong>τc ≈ ${tau} ms</strong>）、高次倍音 H₆–H₁₂ は平均 <strong>${mb}</strong> 減少。基音 H₁ と H₂ が温かく長い余韻で響きます。`,
      expTitleHard: '硬い音色：短い打撃インパルスが高次倍音を強力に増幅',
      expBodyHard: (tau, mb, h12) =>
        `高密度のクラウンが素早く反発（<strong>τc ≈ ${tau} ms</strong>）：高次倍音 H₆–H₁₂ が平均 <strong>${mb}</strong> 上昇（H₁₂ 最大: <strong>${h12}</strong>）し、金属的で鋭いアタックになります。`,
      expTitleConcert: 'コンサート・バランス：豊かな基音と制御された倍音の冠',
      expBodyConcert: (tau) =>
        `理想的なハンマー弾性（<strong>τc ≈ ${tau} ms</strong>）：重厚な低音土台（H₁–H₄）に歌うような長3度 H₅（275 Hz）と完全5度 H₆（330 Hz）が調和します。`,
      strikeNear: (mm, ratio, d1) =>
        `<strong>アグラフに近い打弦点 (${mm} mm · 1/${ratio} L)：</strong> 基音 H₁ が <strong>${d1}</strong> 低下し高次倍音が際立つため、細く硬質な響きになります。`,
      strike9: (mm) =>
        `<strong>打弦点 ≈ 1/9 L (${mm} mm)：</strong> 鋭い<strong>第9倍音 H₉（長2度・495 Hz）</strong>を節で打ち消し、H₅–H₈ の明瞭な遠達性を引き出します。`,
      strike8: (mm, loss8) =>
        `<strong>標準打弦点 1/8 L (${mm} mm)：</strong> <strong>H₈ (${loss8})</strong> の節を突きつつ、隣接する不協和成分 <strong>H₇（自然7度）</strong>と <strong>H₉（長2度）</strong>もバランス良く抑えます。`,
      strike7: (mm, loss7) =>
        `<strong>ヘルムホルツ打弦点 1/7 L (${mm} mm)：</strong> 不純な<strong>自然7度 H₇（385 Hz, ${loss7}）</strong>を振動の節で抑制し、最もまろやかな響きを生みます。`,
      strikeCenter: (mm, ratio, d5) =>
        `<strong>弦中央寄りの打弦点 (${mm} mm · 1/${ratio} L)：</strong> 音色の要である<strong>長3度 H₅（275 Hz, ${d5}）</strong>を消失させ、空虚な響きになります。`,
      strikeCustom: (mm, ratio, n, note, loss) =>
        `<strong>打弦点 ${mm} mm (1/${ratio} L)：</strong> 現在の最大ノード減衰は <strong>H${n} (${note}, ${loss})</strong> です。ハンマーをドラッグして節の位置を比較できます。`
    },

    zh: {
      intervals: [
        '基音', '第一八度', '十二度', '第二八度',
        '大三度', '纯五度', '自然七度', '第三八度',
        '大二度', '大三度', '第11泛音', '纯五度'
      ],
      roles: [
        '低音根基与穿透力', '温暖度与共鸣腔体', '浑厚音芯与饱满度', '清澈八度光泽',
        '如歌旋律色彩', '辉煌感与大厅投射', '粗糙摩擦泛音（不协和）', '临场感与光辉度',
        '金属锐利感', '明亮高次泛音', '尖锐中高频泛音', '瞬态起音锋芒'
      ],
      legendAbs: '--- 白色虚线 = 音乐会基准  |  绿: H₁–H₄ 低音根基  |  金: 协和泛音  |  琥珀: 不协和摩擦泛音 (H₇, H₉, H₁₁)',
      legendDelta: '橙色 (+dB): 相对基准泛音增强  |  天蓝 (−dB): 泛音衰减 / 波节抵消',
      agraffe: '压弦纽 Agraffe (0)',
      bridge: '低音码桥 (L = 1,560 mm)',
      hitNode: (n, db) => `● 击中 H${n} 波节 (${db})`,
      hitAntinode: (n) => `▲ 击中 H${n} 波腹（最大激发）`,
      hitPartial: (n, db) => `◐ 部分激发 H${n} (${db})`,
      hConcert: '音乐会理想基准',
      hSoft: (p) => `音色偏柔 (${p}%)`,
      hSlightlySoft: (p) => `略微柔和 (${p}%)`,
      hHard: (p) => `音色偏硬 (+${p}%)`,
      hSlightlyHard: (p) => `略微明亮 (+${p}%)`,
      roRefCur: (r, c) => `基准 ${r} → ${c}`,
      roDelta: (tot, felt, str) => `Δ ${tot} (硬度 ${felt} | x₀ ${str})`,
      waveLbl: (n) => `H${n}（${n} 个波腹）`,
      dampedSub: (note, freq) => `${note} (${freq} Hz) 波节抑制`,
      expTitleSoft: '音色偏柔：较长弦槌接触时间显著衰减高次泛音',
      expBodySoft: (tau, mb) =>
        `高弹性毛毡缓冲更深（<strong>τc ≈ ${tau} ms</strong>）：高次泛音 H₆–H₁₂ 平均衰减 <strong>${mb}</strong>，基音 H₁ 与八度 H₂ 温暖柔和、延音悠长。`,
      expTitleHard: '音色偏硬：短促冲击脉冲大幅拉升高次泛音',
      expBodyHard: (tau, mb, h12) =>
        `高密压实槌冠快速弹离（<strong>τc ≈ ${tau} ms</strong>）：高次泛音 H₆–H₁₂ 平均提升 <strong>${mb}</strong>（H₁₂ 峰值 <strong>${h12}</strong>），起音刚猛金属感强但延音缩短。`,
      expTitleConcert: '音乐会黄金平衡：浑厚音芯与可控泛音光泽',
      expBodyConcert: (tau) =>
        `理想的雷诺弦槌弹性（<strong>τc ≈ ${tau} ms</strong>）：深沉基频（H₁–H₄）与歌唱性的大三度 H₅（275 Hz）、纯五度 H₆（330 Hz）完美交融而无金属燥感。`,
      strikeNear: (mm, ratio, d1) =>
        `<strong>靠近压弦纽击弦 (${mm} mm · 1/${ratio} L)：</strong> 基音 H₁ 损失 <strong>${d1}</strong> 杠杆力矩，高频泛音突出，音色偏薄偏细。`,
      strike9: (mm) =>
        `<strong>击弦点 ≈ 1/9 L (${mm} mm)：</strong> 在波节处精准抵消尖锐的<strong>第9泛音 H₉（大二度，495 Hz）</strong>，充分释放 H₅–H₈ 投射力。`,
      strike8: (mm, loss8) =>
        `<strong>音乐会标准击弦点 1/8 L (${mm} mm)：</strong> 波节精准落在 <strong>H₈ (${loss8})</strong>，同时柔和抑制两侧不协和的 <strong>H₇（自然七度）</strong>与 <strong>H₉（大二度）</strong>。`,
      strike7: (mm, loss7) =>
        `<strong>亥姆霍兹击弦点 1/7 L (${mm} mm)：</strong> 在波节处抑制不纯的<strong>自然七度 H₇（385 Hz, ${loss7}）</strong>，获得最温润醇厚的低音质感。`,
      strikeCenter: (mm, ratio, d5) =>
        `<strong>偏向琴弦中部击弦 (${mm} mm · 1/${ratio} L)：</strong> 抵消决定色彩的<strong>大三度 H₅（275 Hz, ${d5}）</strong>，导致音色发空失去光泽。`,
      strikeCustom: (mm, ratio, n, note, loss) =>
        `<strong>当前击弦点 ${mm} mm (1/${ratio} L)：</strong> 最强波节抑制位于 <strong>H${n} (${note}, ${loss})</strong>；可直接拖动弦槌对比各泛音波节。`
    }
  };

  class PianoToneA1Controller {
    constructor() {
      this.lang = 'de';
      this.hardness = 0.0;      // -1.0 (soft) .. 0.0 (concert ideal) .. +1.0 (hard)
      this.alpha = 0.125;       // Strike point x0 / L (0.080 .. 0.205)
      this.displayMode = 'abs'; // 'abs' | 'delta'
      this.selectedN = 8;       // Selected partial 1..12
      this.audioCtx = null;
      this.barHitRegions = [];
      this.draggingHammer = false;

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    t() {
      return I18N[this.lang] || I18N.de;
    }

    fmtNum(num, digits = 1) {
      const s = Number(num).toFixed(digits);
      return this.lang === 'de' ? s.replace('.', ',') : s;
    }

    fmtSignedDb(v) {
      const r = Math.abs(v) < 0.05 ? 0 : v;
      const sign = r > 0 ? '+' : (r < 0 ? '−' : '±');
      return sign + this.fmtNum(Math.abs(r), 1) + ' dB';
    }

    fmtDb(v) {
      const sign = v < -0.05 ? '−' : (v > 0.05 ? '+' : '');
      return sign + this.fmtNum(Math.abs(v), 1) + ' dB';
    }

    getContactWidthRatio(h) {
      return 0.0155 - 0.0055 * h;
    }

    strikeFactor(n, alpha, w) {
      const arg = n * Math.PI * alpha;
      const s = Math.sin(arg);
      const c = Math.cos(arg);
      const smear = 0.42 * n * Math.PI * w;
      return Math.sqrt(s * s + (smear * smear) * (c * c));
    }

    feltDeltaDb(n, h) {
      if (Math.abs(h) < 1e-4) return 0;
      if (n === 1) return -1.3 * h;
      if (n === 2) return -0.4 * h;
      const slope = h < 0 ? 1.72 : 1.52;
      return h * slope * Math.pow(n - 2, 1.06);
    }

    computeSpectrum() {
      const wRef = this.getContactWidthRatio(0);
      const wCur = this.getContactWidthRatio(this.hardness);
      const dict = this.t();

      return PARTIALS_BASE.map((p, idx) => {
        const eRef = this.strikeFactor(p.n, REF_ALPHA, wRef);
        const eCur = this.strikeFactor(p.n, this.alpha, wCur);
        const ePosOnly = this.strikeFactor(p.n, this.alpha, wRef);

        const refLevel = p.baseDb + 20 * Math.log10(eRef);
        const dStrike = 20 * Math.log10(ePosOnly / eRef);
        const dTotalStrikeAndWidth = 20 * Math.log10(eCur / eRef);
        const dFelt = this.feltDeltaDb(p.n, this.hardness) + (dTotalStrikeAndWidth - dStrike);
        const curLevel = refLevel + dStrike + dFelt;
        const dTotal = curLevel - refLevel;
        const nodeLossDb = 20 * Math.log10(eCur);

        return {
          n: p.n,
          note: this.lang === 'de' ? p.noteDe : p.noteInt,
          freq: p.freq,
          dissonant: p.dissonant,
          interval: dict.intervals[idx],
          role: dict.roles[idx],
          refDb: refLevel,
          curDb: curLevel,
          deltaDb: dTotal,
          deltaFeltDb: dFelt,
          deltaStrikeDb: dStrike,
          nodeLossDb
        };
      });
    }

    prepareCanvas(canvas) {
      if (!canvas) return null;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch || cw < 50 || ch < 50) return null;
      const W = Math.round(cw);
      const H = Math.round(ch);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
      }
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);
      return { ctx, W, H };
    }

    drawSpectrum() {
      const prep = this.prepareCanvas(document.getElementById('pta-canvas-spectrum'));
      if (!prep) return;
      const { ctx, W, H } = prep;
      const spec = this.computeSpectrum();
      const dict = this.t();

      const padL = 74, padR = 18, padT = 35, padB = 58;
      const pw = W - padL - padR;
      const ph = H - padT - padB;
      this.barHitRegions = [];

      if (this.displayMode === 'abs') {
        const dbMax = 6, dbMin = -46;
        const mapY = db => padT + ((dbMax - Math.max(dbMin, Math.min(dbMax, db))) / (dbMax - dbMin)) * ph;

        ctx.font = '600 14.7px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        [0, -10, -20, -30, -40].forEach(db => {
          const y = mapY(db);
          ctx.strokeStyle = db === 0 ? 'rgba(200, 163, 86, 0.30)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.setLineDash(db === 0 ? [] : [3, 3]);
          ctx.beginPath();
          ctx.moveTo(padL, y);
          ctx.lineTo(padL + pw, y);
          ctx.stroke();
          ctx.fillStyle = '#94a3b8';
          ctx.fillText((db === 0 ? '0' : '−' + Math.abs(db)) + ' dB', padL - 8, y + 5);
        });
        ctx.setLineDash([]);

        const slotW = pw / 12;
        const barW = Math.min(46, slotW * 0.62);

        spec.forEach((p, i) => {
          const cx = padL + slotW * (i + 0.5);
          const x = cx - barW / 2;
          const yCur = mapY(p.curDb);
          const yRef = mapY(p.refDb);
          const yBot = padT + ph;
          const barH = Math.max(4, yBot - yCur);

          this.barHitRegions.push({ n: p.n, x1: padL + slotW * i, x2: padL + slotW * (i + 1) });

          if (p.n === this.selectedN) {
            ctx.fillStyle = 'rgba(200, 163, 86, 0.11)';
            ctx.fillRect(padL + slotW * i + 2, padT - 20, slotW - 4, ph + 68);
          }

          if (Math.abs(p.deltaDb) >= 0.25) {
            const topDiff = Math.min(yCur, yRef);
            const hDiff = Math.abs(yCur - yRef);
            ctx.fillStyle = p.deltaDb > 0 ? 'rgba(249, 115, 22, 0.22)' : 'rgba(56, 189, 248, 0.20)';
            ctx.fillRect(x, topDiff, barW, hDiff);
          }

          const grad = ctx.createLinearGradient(0, yCur, 0, yBot);
          if (p.dissonant) {
            grad.addColorStop(0, p.deltaDb > 1.5 ? '#fb7185' : '#f59e0b');
            grad.addColorStop(1, 'rgba(180, 83, 9, 0.35)');
          } else if (p.n <= 4) {
            grad.addColorStop(0, '#2ecc71');
            grad.addColorStop(1, 'rgba(20, 110, 83, 0.38)');
          } else {
            grad.addColorStop(0, '#e6c882');
            grad.addColorStop(1, 'rgba(140, 107, 40, 0.35)');
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, yCur, barW, barH, [6, 6, 0, 0]);
          ctx.fill();

          ctx.strokeStyle = p.n === this.selectedN ? '#ffffff' : 'rgba(255,255,255,0.22)';
          ctx.lineWidth = p.n === this.selectedN ? 1.8 : 1;
          ctx.stroke();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(x - 4, yRef);
          ctx.lineTo(x + barW + 4, yRef);
          ctx.stroke();
          ctx.setLineDash([]);

          const dAbs = Math.abs(p.deltaDb);
          const labelY = Math.max(padT - 8, Math.min(yCur, yRef) - 7);
          ctx.font = '700 14.7px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          if (dAbs < 0.15) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
            ctx.fillText(this.fmtDb(p.curDb), cx, labelY);
          } else {
            ctx.fillStyle = p.deltaDb > 0 ? '#fdba74' : '#7dd3fc';
            const sgn = p.deltaDb > 0 ? '+' : '−';
            ctx.fillText(sgn + this.fmtNum(dAbs, 1) + ' dB', cx, labelY);
          }

          const xNote = p.n >= 10 ? ('H' + p.n + '·' + p.note) : ('H' + p.n + ' · ' + p.note);
          ctx.font = p.n === this.selectedN
            ? (p.n >= 10 ? '800 14.5px Roboto, sans-serif' : '800 15.7px Roboto, sans-serif')
            : (p.n >= 10 ? '700 14.2px Roboto, sans-serif' : '700 15.2px Roboto, sans-serif');
          ctx.fillStyle = p.dissonant ? '#fcd34d' : '#ffffff';
          ctx.fillText(xNote, cx, yBot + 22);

          ctx.font = '600 14.2px JetBrains Mono, monospace';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(p.freq + ' Hz', cx, yBot + 42);
        });

        ctx.font = '600 14.7px Roboto, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.fillText(dict.legendAbs, padL + pw, 18);
      } else {
        const dMax = 20, dMin = -20;
        const mapY = d => padT + ((dMax - Math.max(dMin, Math.min(dMax, d))) / (dMax - dMin)) * ph;
        const yZero = mapY(0);

        ctx.font = '600 14.7px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        [15, 10, 5, 0, -5, -10, -15].forEach(d => {
          const y = mapY(d);
          ctx.strokeStyle = d === 0 ? 'rgba(230, 200, 130, 0.65)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = d === 0 ? 1.6 : 1;
          ctx.setLineDash(d === 0 ? [] : [3, 3]);
          ctx.beginPath();
          ctx.moveTo(padL, y);
          ctx.lineTo(padL + pw, y);
          ctx.stroke();
          ctx.fillStyle = d === 0 ? '#e6c882' : '#94a3b8';
          const lbl = d > 0 ? '+' + d + ' dB' : (d < 0 ? '−' + Math.abs(d) + ' dB' : '0 dB');
          ctx.fillText(lbl, padL - 8, y + 5);
        });
        ctx.setLineDash([]);

        const slotW = pw / 12;
        const barW = Math.min(46, slotW * 0.62);

        spec.forEach((p, i) => {
          const cx = padL + slotW * (i + 0.5);
          const x = cx - barW / 2;
          const yVal = mapY(p.deltaDb);
          this.barHitRegions.push({ n: p.n, x1: padL + slotW * i, x2: padL + slotW * (i + 1) });

          if (p.n === this.selectedN) {
            ctx.fillStyle = 'rgba(200, 163, 86, 0.11)';
            ctx.fillRect(padL + slotW * i + 2, padT - 20, slotW - 4, ph + 68);
          }

          const top = Math.min(yZero, yVal);
          const h = Math.max(3, Math.abs(yVal - yZero));
          ctx.fillStyle = p.deltaDb >= 0 ? 'rgba(249, 115, 22, 0.85)' : 'rgba(56, 189, 248, 0.85)';
          ctx.beginPath();
          ctx.roundRect(x, top, barW, h, 5);
          ctx.fill();

          ctx.font = '700 14.7px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = p.deltaDb >= 0 ? '#fdba74' : '#7dd3fc';
          const ty = p.deltaDb >= 0 ? top - 7 : top + h + 16;
          ctx.fillText(this.fmtSignedDb(p.deltaDb), cx, ty);

          const yBot = padT + ph;
          const xNote = p.n >= 10 ? ('H' + p.n + '·' + p.note) : ('H' + p.n + ' · ' + p.note);
          ctx.font = p.n === this.selectedN
            ? (p.n >= 10 ? '800 14.5px Roboto, sans-serif' : '800 15.7px Roboto, sans-serif')
            : (p.n >= 10 ? '700 14.2px Roboto, sans-serif' : '700 15.2px Roboto, sans-serif');
          ctx.fillStyle = p.dissonant ? '#fcd34d' : '#ffffff';
          ctx.fillText(xNote, cx, yBot + 22);
          ctx.font = '600 14.2px JetBrains Mono, monospace';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(p.freq + ' Hz', cx, yBot + 42);
        });

        ctx.font = '600 14.7px Roboto, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.fillText(dict.legendDelta, padL + pw, 18);
      }

      ctx.restore();
    }

    drawStringModel() {
      const prep = this.prepareCanvas(document.getElementById('pta-canvas-string'));
      if (!prep) return;
      const { ctx, W, H } = prep;
      const spec = this.computeSpectrum();
      const sel = spec[this.selectedN - 1] || spec[7];
      const dict = this.t();

      const padL = 66, padR = 66;
      const strY = Math.round(H * 0.42);
      const strW = W - padL - padR;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      [1 / 12, 1 / 9, 1 / 8, 1 / 7, 1 / 5].forEach(frac => {
        const x = padL + frac * strW;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 14);
        ctx.lineTo(x, H - 12);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      const n = sel.n;
      const wCur = this.getContactWidthRatio(this.hardness);
      const excite = this.strikeFactor(n, this.alpha, wCur);
      const waveAmp = Math.max(5, Math.min(H * 0.28, (H * 0.27) * (0.22 + 0.78 * excite)));

      for (const dir of [1, -1]) {
        ctx.beginPath();
        for (let px = 0; px <= strW; px += 3) {
          const u = px / strW;
          const y = strY + dir * waveAmp * Math.sin(n * Math.PI * u);
          if (px === 0) ctx.moveTo(padL + px, y);
          else ctx.lineTo(padL + px, y);
        }
        ctx.strokeStyle = dir === 1 ? 'rgba(46, 204, 113, 0.88)' : 'rgba(46, 204, 113, 0.42)';
        ctx.lineWidth = dir === 1 ? 2.4 : 1.6;
        ctx.stroke();
      }

      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(padL, strY);
      ctx.lineTo(padL + strW, strY);
      ctx.stroke();

      for (let k = 1; k < n; k++) {
        const kx = padL + (k / n) * strW;
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(kx, strY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.fillStyle = '#e6c882';
      ctx.beginPath();
      ctx.moveTo(padL - 7, strY - 16);
      ctx.lineTo(padL + 7, strY - 16);
      ctx.lineTo(padL, strY - 2);
      ctx.closePath();
      ctx.fill();
      ctx.font = '700 15.2px Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#e6c882';
      ctx.fillText(dict.agraffe, Math.max(8, padL - 28), 18);

      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(padL + strW - 8, strY + 18);
      ctx.lineTo(padL + strW + 8, strY + 18);
      ctx.lineTo(padL + strW, strY + 2);
      ctx.closePath();
      ctx.fill();
      ctx.textAlign = 'right';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(dict.bridge, padL + strW + 32, 18);

      const hx = padL + this.alpha * strW;
      const crownHalfPx = Math.round(13 - 4.5 * this.hardness);
      const headTopY = strY + 5;
      const headH = Math.min(44, H - headTopY - 18);

      ctx.fillStyle = this.hardness > 0.25
        ? 'rgba(249, 115, 22, 0.35)'
        : (this.hardness < -0.25 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(46, 204, 113, 0.35)');
      ctx.fillRect(hx - crownHalfPx - 3, strY - 8, (crownHalfPx + 3) * 2, 16);

      ctx.fillStyle = this.hardness > 0.3 ? '#fef3c7' : (this.hardness < -0.3 ? '#e0f2fe' : '#f8fafc');
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(hx - crownHalfPx, headTopY + 8);
      ctx.quadraticCurveTo(hx, headTopY - 3, hx + crownHalfPx, headTopY + 8);
      ctx.lineTo(hx + 16, headTopY + headH);
      ctx.lineTo(hx - 16, headTopY + headH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(hx - 8, headTopY + headH);
      ctx.quadraticCurveTo(hx, headTopY + headH * 0.48, hx + 8, headTopY + headH);
      ctx.closePath();
      ctx.fill();

      const mm = Math.round(this.alpha * STRING_LENGTH_MM);
      const ratioDen = this.fmtNum(1 / this.alpha, 1);
      const hitPhase = Math.abs(Math.sin(n * Math.PI * this.alpha));
      const hitStatus = hitPhase < 0.22
        ? dict.hitNode(n, this.fmtDb(sel.nodeLossDb))
        : (hitPhase > 0.82 ? dict.hitAntinode(n) : dict.hitPartial(n, this.fmtDb(sel.nodeLossDb)));

      ctx.font = '700 15.7px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      const infoX = Math.min(W - 435, hx + 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`x₀ = ${mm} mm (1/${ratioDen} L)`, infoX, strY + 25);
      ctx.fillStyle = hitPhase < 0.22 ? '#7dd3fc' : '#86efac';
      ctx.fillText(hitStatus, infoX, strY + 47);

      ctx.restore();
    }

    updateUI() {
      const slideEl = document.querySelector('.slide.pta-slide');
      if (!slideEl) return;

      const dict = this.t();
      const spec = this.computeSpectrum();
      const sel = spec[this.selectedN - 1] || spec[7];

      const tauMs = this.fmtNum(2.4 - 1.25 * this.hardness + 0.15 * this.hardness * this.hardness, 1);
      const hPct = Math.round(this.hardness * 100);
      let hWord = dict.hConcert;
      if (hPct <= -25) hWord = dict.hSoft(hPct);
      else if (hPct < -5) hWord = dict.hSlightlySoft(hPct);
      else if (hPct >= 25) hWord = dict.hHard(hPct);
      else if (hPct > 5) hWord = dict.hSlightlyHard(hPct);

      const lblHard = document.getElementById('pta-lbl-hardness');
      if (lblHard) lblHard.textContent = `${hWord} · τc ≈ ${tauMs} ms`;

      const ratio = this.fmtNum(1 / this.alpha, 1);
      const pct = this.fmtNum(this.alpha * 100, 1);
      const mm = Math.round(this.alpha * STRING_LENGTH_MM);
      const lblStrike = document.getElementById('pta-lbl-strike');
      if (lblStrike) lblStrike.textContent = `1/${ratio} L (${pct} % · ${mm} mm)`;

      const btnSoft = document.getElementById('btn-preset-soft');
      const btnConcert = document.getElementById('btn-preset-concert');
      const btnHard = document.getElementById('btn-preset-hard');
      if (btnSoft) btnSoft.classList.toggle('active', this.hardness <= -0.65);
      if (btnConcert) btnConcert.classList.toggle('active', Math.abs(this.hardness) <= 0.08 && Math.abs(this.alpha - 0.125) <= 0.004);
      if (btnHard) btnHard.classList.toggle('active', this.hardness >= 0.65);

      slideEl.querySelectorAll('.strike-preset').forEach(btn => {
        const a = parseInt(btn.getAttribute('data-alpha'), 10) / 1000;
        btn.classList.toggle('active', Math.abs(this.alpha - a) < 0.004);
      });

      const roPartial = document.getElementById('pta-ro-partial');
      const roLevels = document.getElementById('pta-ro-levels');
      const roDelta = document.getElementById('pta-ro-delta');
      if (roPartial) roPartial.textContent = `H${sel.n} · ${sel.note} (${sel.freq} Hz · ${sel.interval})`;
      if (roLevels) roLevels.textContent = dict.roRefCur(this.fmtDb(sel.refDb), this.fmtDb(sel.curDb));
      if (roDelta) {
        roDelta.textContent = dict.roDelta(
          this.fmtSignedDb(sel.deltaDb),
          this.fmtSignedDb(sel.deltaFeltDb),
          this.fmtSignedDb(sel.deltaStrikeDb)
        );
        roDelta.style.color = Math.abs(sel.deltaDb) < 0.15 ? '#2ecc71' : (sel.deltaDb > 0 ? '#fdba74' : '#7dd3fc');
      }

      const waveLbl = document.getElementById('pta-string-wave-lbl');
      if (waveLbl) waveLbl.textContent = dict.waveLbl(sel.n, sel.role);

      const meanWarm = (spec[0].deltaDb + spec[1].deltaDb + spec[2].deltaDb + spec[3].deltaDb) / 4;
      const elWarm = document.getElementById('pta-kpi-warmth');
      if (elWarm) {
        elWarm.textContent = this.fmtSignedDb(meanWarm);
        elWarm.style.color = meanWarm >= -0.2 ? '#86efac' : '#7dd3fc';
      }

      const upper = spec.slice(5);
      const meanBright = upper.reduce((s, p) => s + p.deltaDb, 0) / upper.length;
      const elBright = document.getElementById('pta-kpi-bright');
      if (elBright) {
        elBright.textContent = this.fmtSignedDb(meanBright);
        elBright.style.color = meanBright > 1.5 ? '#fdba74' : (meanBright < -1.5 ? '#7dd3fc' : '#e6c882');
      }

      let minNodeP = spec[1];
      spec.slice(1).forEach(p => {
        if (p.nodeLossDb < minNodeP.nodeLossDb) minNodeP = p;
      });
      const elNode = document.getElementById('pta-kpi-node');
      const elNodeSub = document.getElementById('pta-kpi-node-sub');
      if (elNode) elNode.textContent = `H${minNodeP.n} (${this.fmtDb(minNodeP.nodeLossDb)})`;
      if (elNodeSub) elNodeSub.textContent = dict.dampedSub(minNodeP.note, minNodeP.freq);

      const titleEl = document.getElementById('pta-exp-title');
      const bodyEl = document.getElementById('pta-exp-body');
      const strikeEl = document.getElementById('pta-exp-strike');

      if (titleEl && bodyEl) {
        if (this.hardness <= -0.35) {
          titleEl.textContent = dict.expTitleSoft;
          bodyEl.innerHTML = dict.expBodySoft(tauMs, this.fmtSignedDb(meanBright));
        } else if (this.hardness >= 0.35) {
          titleEl.textContent = dict.expTitleHard;
          bodyEl.innerHTML = dict.expBodyHard(tauMs, this.fmtSignedDb(meanBright), this.fmtSignedDb(spec[11].deltaDb));
        } else {
          titleEl.textContent = dict.expTitleConcert;
          bodyEl.innerHTML = dict.expBodyConcert(tauMs);
        }
      }

      if (strikeEl) {
        if (this.alpha < 0.098) {
          strikeEl.innerHTML = dict.strikeNear(mm, ratio, this.fmtSignedDb(spec[0].deltaStrikeDb));
        } else if (Math.abs(this.alpha - 1 / 9) < 0.008) {
          strikeEl.innerHTML = dict.strike9(mm);
        } else if (Math.abs(this.alpha - 1 / 8) < 0.009) {
          strikeEl.innerHTML = dict.strike8(mm, this.fmtDb(spec[7].nodeLossDb));
        } else if (Math.abs(this.alpha - 1 / 7) < 0.010) {
          strikeEl.innerHTML = dict.strike7(mm, this.fmtDb(spec[6].nodeLossDb));
        } else if (this.alpha > 0.175) {
          strikeEl.innerHTML = dict.strikeCenter(mm, ratio, this.fmtSignedDb(spec[4].deltaStrikeDb));
        } else {
          strikeEl.innerHTML = dict.strikeCustom(mm, ratio, minNodeP.n, minNodeP.note, this.fmtDb(minNodeP.nodeLossDb));
        }
      }

      this.drawSpectrum();
      this.drawStringModel();
    }

    playA1Tone() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const spec = this.computeSpectrum();

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.32, now);
      master.connect(ctx.destination);

      const noiseLen = Math.floor(ctx.sampleRate * 0.035);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const nf = ctx.createBiquadFilter();
      nf.type = 'bandpass';
      nf.frequency.value = 900 + (this.hardness + 1) * 950;
      nf.Q.value = 1.6;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.08 + Math.max(0, this.hardness) * 0.14, now);
      ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      noise.connect(nf);
      nf.connect(ng);
      ng.connect(master);
      noise.start(now);

      const baseSustain = 3.2 - 0.65 * this.hardness;
      const B = 0.00012;

      spec.forEach(p => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        const realFreq = p.n * 55.0 * Math.sqrt(1 + B * p.n * p.n);
        osc.frequency.setValueAtTime(realFreq, now);

        const linAmp = Math.pow(10, p.curDb / 20);
        const attack = Math.max(0.003, 0.010 - 0.004 * this.hardness);
        const decay = Math.max(0.45, baseSustain / (1 + (p.n - 1) * 0.24));

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(Math.min(0.65, linAmp * 0.42), now + attack);
        g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + decay + 0.05);
      });

      const btn = document.getElementById('btn-play-a1');
      if (btn) {
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 550);
      }
    }

    init() {
      const slideEl = document.querySelector('.slide.pta-slide');
      if (!slideEl) return;

      this.lang = document.documentElement.lang || 'de';

      const slHard = document.getElementById('pta-slider-hardness');
      const slStrike = document.getElementById('pta-slider-strike');

      if (slHard) {
        slHard.addEventListener('input', e => {
          this.hardness = parseFloat(e.target.value) / 100;
          this.updateUI();
        });
      }

      if (slStrike) {
        slStrike.addEventListener('input', e => {
          this.alpha = parseFloat(e.target.value) / 1000;
          this.updateUI();
        });
      }

      const btnSoft = document.getElementById('btn-preset-soft');
      const btnConcert = document.getElementById('btn-preset-concert');
      const btnHard = document.getElementById('btn-preset-hard');

      if (btnSoft) {
        btnSoft.addEventListener('click', () => {
          this.hardness = -0.85;
          if (slHard) slHard.value = -85;
          this.updateUI();
          this.playA1Tone();
        });
      }

      if (btnConcert) {
        btnConcert.addEventListener('click', () => {
          this.hardness = 0.0;
          this.alpha = 0.125;
          if (slHard) slHard.value = 0;
          if (slStrike) slStrike.value = 125;
          this.updateUI();
          this.playA1Tone();
        });
      }

      if (btnHard) {
        btnHard.addEventListener('click', () => {
          this.hardness = 0.85;
          if (slHard) slHard.value = 85;
          this.updateUI();
          this.playA1Tone();
        });
      }

      const btnModeAbs = document.getElementById('btn-mode-abs');
      const btnModeDelta = document.getElementById('btn-mode-delta');

      if (btnModeAbs && btnModeDelta) {
        btnModeAbs.addEventListener('click', () => {
          this.displayMode = 'abs';
          btnModeAbs.classList.add('active');
          btnModeDelta.classList.remove('active');
          this.updateUI();
        });

        btnModeDelta.addEventListener('click', () => {
          this.displayMode = 'delta';
          btnModeDelta.classList.add('active');
          btnModeAbs.classList.remove('active');
          this.updateUI();
        });
      }

      slideEl.querySelectorAll('.strike-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = parseInt(btn.getAttribute('data-alpha'), 10);
          this.alpha = val / 1000;
          if (slStrike) slStrike.value = val;
          if (val === 111) this.selectedN = 9;
          else if (val === 125) this.selectedN = 8;
          else if (val === 143) this.selectedN = 7;
          else if (val === 200) this.selectedN = 5;
          else if (val === 83) this.selectedN = 1;
          this.updateUI();
          this.playA1Tone();
        });
      });

      const specCanvas = document.getElementById('pta-canvas-spectrum');
      if (specCanvas) {
        const pickPartialAtClientX = (clientX) => {
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
        specCanvas.addEventListener('click', e => pickPartialAtClientX(e.clientX));
        specCanvas.addEventListener('mousemove', e => {
          if (e.buttons === 1) pickPartialAtClientX(e.clientX);
        });
        specCanvas.addEventListener('touchstart', e => {
          if (e.touches && e.touches[0]) pickPartialAtClientX(e.touches[0].clientX);
        }, { passive: true });
        specCanvas.addEventListener('touchmove', e => {
          if (e.touches && e.touches[0]) pickPartialAtClientX(e.touches[0].clientX);
        }, { passive: true });
      }

      const strCanvas = document.getElementById('pta-canvas-string');
      if (strCanvas) {
        const dragHammerAtClientX = (clientX) => {
          const rect = strCanvas.getBoundingClientRect();
          if (!rect.width) return;
          const x = (clientX - rect.left) * (strCanvas.clientWidth / rect.width);
          const padL = 62, padR = 62;
          const strW = Math.max(100, strCanvas.clientWidth - padL - padR);
          const u = Math.max(0.080, Math.min(0.205, (x - padL) / strW));
          this.alpha = u;
          if (slStrike) slStrike.value = Math.round(u * 1000);
          this.updateUI();
        };
        strCanvas.addEventListener('mousedown', e => {
          this.draggingHammer = true;
          dragHammerAtClientX(e.clientX);
        });
        window.addEventListener('mousemove', e => {
          if (this.draggingHammer) dragHammerAtClientX(e.clientX);
        });
        window.addEventListener('mouseup', () => {
          this.draggingHammer = false;
        });
        strCanvas.addEventListener('touchstart', e => {
          if (e.touches && e.touches[0]) {
            this.draggingHammer = true;
            dragHammerAtClientX(e.touches[0].clientX);
          }
        }, { passive: true });
        strCanvas.addEventListener('touchmove', e => {
          if (this.draggingHammer && e.touches && e.touches[0]) {
            dragHammerAtClientX(e.touches[0].clientX);
          }
        }, { passive: true });
        strCanvas.addEventListener('touchend', () => {
          this.draggingHammer = false;
        }, { passive: true });
      }

      const btnPlay = document.getElementById('btn-play-a1');
      if (btnPlay) {
        btnPlay.addEventListener('click', () => this.playA1Tone());
      }

      // Redraw cleanly whenever Slide 33 becomes active
      const obs = new MutationObserver(() => {
        if (slideEl.classList.contains('active')) {
          requestAnimationFrame(() => this.updateUI());
          setTimeout(() => this.updateUI(), 40);
        }
      });
      obs.observe(slideEl, { attributes: true, attributeFilter: ['class'] });

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (slideEl.classList.contains('active')) {
            this.drawSpectrum();
            this.drawStringModel();
          }
        });
        slideEl.querySelectorAll('.pta-canvas-wrap').forEach(w => ro.observe(w));
      }

      window.addEventListener('resize', () => {
        if (slideEl.classList.contains('active')) {
          this.updateUI();
        }
      }, { passive: true });

      window.addEventListener('languageChanged', (e) => {
        this.lang = (e.detail && e.detail.lang) ? e.detail.lang : (document.documentElement.lang || 'de');
        this.updateUI();
      });

      this.updateUI();
    }
  }

  window.PianoToneA1Controller = new PianoToneA1Controller();
})();

