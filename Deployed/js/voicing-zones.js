/**
 * Louis Renner Masterclass Presentation
 * Slide 35 (Chapter 5): Intonations-Zonen & Stichwirkung — Das Renner-Uhrenmodell
 * Based on Jens-Sören Kruse (Renner Academy 2025: "Voicing the Renner Hammerhead")
 * and Burkard Olbrich ("Intonieren — Geheimnis & Rätsel", 2012).
 *
 * Interactive Features:
 * - Authentic Renner hammerhead cross-section with Clock-Face reference axes (12:00, 9:00–3:00, Underfelt line)
 * - 5 clickable Dynamic Voicing Zones (Blue ff, Green f, Orange p, Purple pp ≤2mm, Red 12:00 Taboo Core)
 * - 3-stage Stitch Technique toggle (1 · Unbehandelt | 2 · ✓ 90° Drücken | 3 · ✕ Quer / Hacken)
 * - Animated needle holder showing stitch angle, depth & fiber-tension transfer
 * - Partial-Tone Spectrum Shift (H1–H12 ΔdB) & Dynamic Response Profile (pp–ff)
 * - Web Audio harmonic strike synthesis reflecting zone & stitch technique
 * - Full 4-language localization (DE, EN, JA, ZH)
 */

(function () {
  'use strict';

  const ZONE_KEYS = ['blue', 'green', 'orange', 'purple', 'red'];

  const ZONE_META = {
    blue: {
      color: '#38bdf8',
      fillRgba: 'rgba(56, 189, 248, 0.34)',
      activeRgba: 'rgba(56, 189, 248, 0.62)',
      stroke: '#7dd3fc',
      angMinDeg: 61,
      angMaxDeg: 108,
      depthFrac: 0.84, // deep up to just before underfelt
      needles: 3,
      tauIdeal: 1.78,
      sigmaIdeal: 98,
      deltaIdeal: [3.2, 3.0, 2.6, 2.1, 1.5, 0.9, 0.3, -0.2, -0.5, -0.7, -0.8, -0.9],
      dynIdeal: [74, 80, 86, 94, 98],
      kpiVal: '+3,2 dB',
      kpiCol: '#38bdf8'
    },
    green: {
      color: '#2ecc71',
      fillRgba: 'rgba(46, 204, 113, 0.32)',
      activeRgba: 'rgba(46, 204, 113, 0.60)',
      stroke: '#86efac',
      angMinDeg: 34,
      angMaxDeg: 61,
      depthFrac: 0.56, // medium 4-6 mm
      needles: 3,
      tauIdeal: 1.84,
      sigmaIdeal: 95,
      deltaIdeal: [1.4, 1.7, 2.2, 2.4, 2.0, 1.4, -0.6, -1.5, -2.1, -2.5, -2.7, -2.8],
      dynIdeal: [78, 84, 93, 96, 91],
      kpiVal: '+2,4 dB',
      kpiCol: '#4ade80'
    },
    orange: {
      color: '#fb923c',
      fillRgba: 'rgba(251, 146, 60, 0.32)',
      activeRgba: 'rgba(251, 146, 60, 0.60)',
      stroke: '#fdba74',
      angMinDeg: 13.5,
      angMaxDeg: 34,
      depthFrac: 0.36, // shallow-medium 2.5-4 mm
      needles: 2,
      tauIdeal: 1.92,
      sigmaIdeal: 93,
      deltaIdeal: [0.6, 0.8, 1.0, 0.7, 0.1, -0.8, -1.9, -2.8, -3.5, -4.0, -4.3, -4.5],
      dynIdeal: [86, 95, 92, 87, 84],
      kpiVal: '−3,8 dB',
      kpiCol: '#fbbf24'
    },
    purple: {
      color: '#c084fc',
      fillRgba: 'rgba(192, 132, 252, 0.38)',
      activeRgba: 'rgba(192, 132, 252, 0.72)',
      stroke: '#e9d5ff',
      angMinDeg: 0,
      angMaxDeg: 13.5,
      depthFrac: 0.17, // surface max 2 mm!
      needles: 1,
      tauIdeal: 1.96,
      sigmaIdeal: 96,
      deltaIdeal: [0.1, 0.2, 0.2, 0.0, -0.3, -0.9, -1.8, -2.9, -4.1, -4.9, -5.4, -5.8],
      dynIdeal: [98, 94, 89, 86, 85],
      kpiVal: '−5,1 dB',
      kpiCol: '#d8b4fe'
    },
    red: {
      color: '#ef4444',
      fillRgba: 'rgba(239, 68, 68, 0.28)',
      activeRgba: 'rgba(239, 68, 68, 0.58)',
      stroke: '#fca5a5',
      angMinDeg: 0,
      angMaxDeg: 13.5,
      depthFrac: 0.78, // destructive deep central prick!
      needles: 2,
      tauIdeal: 3.15,
      sigmaIdeal: 34,
      deltaIdeal: [-3.8, -4.2, -4.8, -5.5, -6.2, -6.8, -7.4, -8.0, -8.5, -8.9, -9.2, -9.5],
      dynIdeal: [42, 46, 44, 35, 24],
      kpiVal: '−6,8 dB ✕',
      kpiCol: '#f87171'
    }
  };

  const I18N = {
    de: {
      pillBlue: '🔵 Blau (ff)',
      pillGreen: '🟢 Grün (f)',
      pillOrange: '🟠 Orange (p)',
      pillPurple: '🟣 Violett (pp)',
      pillRed: '🔴 12:00 Tabu',
      loopOn: '⏸ Nadel-Impuls',
      loopOff: '▶ Nadel-Impuls',
      strikeBtn: 'Stich & Klang',
      specDelta: 'ΔdB Sticheffekt',
      specDyn: 'Dynamik pp–ff',
      techRawVal: '0 Stiche · Werksspannung',
      techIdealVal: '✓ 90° radial · σ intakt',
      techWrongVal: '✕ Faserschnitt · σ zerstört',
      techRedVal: '✕ TABU: Scheitelkern zerstört',
      cvString: 'Stahlsaite · Anschlag (12:00)',
      cvAxis12: '12:00 Achse',
      cvAxisCheekL: '9:00 Flanke',
      cvAxisCheekR: 'Flanke 3:00',
      cvAxisUf: 'Oberkante Unterfilz',
      cvGlueRivet: 'Klebstoff + Niete',
      cvTransferUp: 'Spannung ↑ in f-Keil',
      cvBetweenGrooves: 'Nur zw. Saitenrillen (≤ 2 mm)!',
      cvTabooWarn: '✕ TABU: > 2 mm zerstört σ!',
      cvWrongWarn: '✕ Querstich zerschneidet Fasern!',
      cvRawHint: 'Werkszustand (0 Stiche)',
      cvClickHint: 'Keil anklicken',
      specZone1: 'H1–H4 Fundament',
      specZone2: 'H5–H8 Gesangskern',
      specZone3: 'H9–H12 Brillanz',
      dynTitle: 'Spielbare Ansprache nach Dynamik (pp → ff)',
      dynBefore: 'Vorher',
      dynAfter: 'Nach Stich',
      dynLabels: ['pp', 'p', 'mf', 'f', 'ff'],
      zones: {
        blue: {
          roZone: '🔵 Blauer ff-Keil (9–10 / 2–3h)',
          roDepth: '7–9 mm (vor UF) · 90°',
          roEffect: 'H1–H4 +3,2 dB · freies ff',
          kpi1Num: '7–9 mm',
          kpi1Sub: '3er-Halter · Nadel Nr. 7',
          kpi2Sub: '✓ Fasern geteilt, σ intakt',
          kpi3Num: '+3,2 dB',
          kpi3Sub: 'H1–H4 ↑ · ff frei',
          badge: '✦ VORINTONATION • BLAUER FF-KEIL (9–10 / 2–3H)',
          title: 'Tiefe 90°-Stiche lösen Werkshärte und speisen den f-Keil',
          body: 'Ruhiges Eindrücken bis <strong>kurz vor den Unterfilz</strong> leitet Elastizität <strong>aufwärts in den grünen Keil</strong> und öffnet das <em>Fortissimo</em>.',
          bullet: '<strong>Effekt:</strong> Mehr Grundtonfülle (<strong>H1–H4 +3,2 dB</strong>), Krone bleibt stabil.'
        },
        green: {
          roZone: '🟢 Grüner f-Keil (10–11 / 1–2h)',
          roDepth: '4–6 mm · 90° radial',
          roEffect: 'Kern +2,4 dB · Schärfe −2,5 dB',
          kpi1Num: '4–6 mm',
          kpi1Sub: 'Mid-Voicing · 90° radial',
          kpi2Sub: '✓ Kraftfluss frei',
          kpi3Num: '+2,4 dB',
          kpi3Sub: 'Singendes mf–f (H3–H6 ↑)',
          badge: '✦ MID-VOICING • GRÜNER F-KEIL (10–11 / 1–2H)',
          title: 'Öffnet den Übergang zwischen Scheitel und ½-Flanke',
          body: '<strong>90°-Stiche (4–6 mm)</strong> entspannen die Außenkontur: Die Flanke federt frei mit und formt einen tragenden <strong>Cantabile-Kern</strong>.',
          bullet: '<strong>Effekt:</strong> Fließendes <em>mf–f</em>, scharfe Obertöne sinken (<strong>−2,5 dB</strong>).'
        },
        orange: {
          roZone: '🟠 Oranger p-Keil (11–12 / 12–1h)',
          roDepth: '2,5–4 mm · 90° radial',
          roEffect: 'H8–H12 −3,8 dB · warmer p-Ton',
          kpi1Num: '2,5–4 mm',
          kpi1Sub: 'Feine Nadel · Kronenflanke',
          kpi2Sub: '✓ Kerndruck intakt',
          kpi3Num: '−3,8 dB',
          kpi3Sub: 'Warmer p-Ton',
          badge: '✦ AUSGLEICH • ORANGER P-KEIL (11–12 / 12–1H)',
          title: 'Feine Stiche neben der Krone formen warmen Gesangston',
          body: '<strong>2,5–4 mm Stiche (90°)</strong> seitlich der Krone dämpfen glasige Obertöne im <em>Piano</em>, ohne die <em>Forte</em>-Spannung zu schwächen.',
          bullet: '<strong>Effekt:</strong> Ausgeglichene Klangfarbe über 88 Tasten (<strong>H8–H12 −3,8 dB</strong>).'
        },
        purple: {
          roZone: '🟣 Violetter pp-Keil (Krone)',
          roDepth: '≤ 2 mm · zw. Saitenrillen',
          roEffect: 'H9–H12 −5,1 dB · samtiges pp',
          kpi1Num: '≤ 2,0 mm',
          kpi1Sub: '1er-Nadel · zw. Rillen',
          kpi2Sub: '✓ 96 % Kernspannung intakt',
          kpi3Num: '−5,1 dB',
          kpi3Sub: 'H9–H12 sanft · edles pp',
          badge: '✦ FEININTONATION • VIOLETTER PP-KEIL (≤ 2 MM)',
          title: 'Minimale Oberflächenstiche schaffen ein Samtpolster für pp',
          body: 'Kurze Einzelnadel <strong>max. 1–2 mm tief</strong> und <strong>nur zwischen den Saitenrillen</strong>: Der tragende Scheitelkern bleibt unberührt.',
          bullet: '<strong>Regel:</strong> Nie in die Saitenrillen und nie tiefer als <strong>2 mm</strong>!'
        },
        red: {
          roZone: '🔴 Sperrzone (12:00 Kern)',
          roDepth: '✕ TABU: > 2 mm verboten!',
          roEffect: '⚠ σ 34 % · τc 3,15 ms · Ton tot!',
          kpi1Num: '✕ TABU',
          kpi1Sub: 'Nie > 2 mm bei 12:00!',
          kpi2Sub: '✕ Spannung zerstört!',
          kpi3Num: '−6,8 dB',
          kpi3Sub: 'Hohl & leblos',
          badge: '⚠️ SPERRZONE 12:00 • TIEFER SCHEITELKERN',
          title: 'Tiefe Scheitelstiche zerstören die Spannung irreversibel!',
          body: 'Stiche <strong>> 2 mm in das rote Scheiteldreieck</strong> durchtrennen das Zuggewölbe: Rückstellkraft bricht ein, <strong>τc steigt auf 3,15 ms</strong>.',
          bullet: '<strong>Folge:</strong> Der Ton wird <strong>hohl und tot</strong> — kein <em>p</em> und kein <em>ff</em> mehr!'
        }
      },
      wrongOverride: {
        roDepth: '✕ FEHLER: Quer-/Hackstich!',
        roEffect: '⚠ Fasern zerschnitten · τc ↑',
        kpi2Sub: '✕ Zugfasern durchtrennt!',
        badge: '⚠️ STICHFEHLER • QUER STECHEN / HACKEN',
        title: 'Schrägstiche und Hacken zerschneiden tragende Wolllagen!',
        body: 'Schräges Stechen durchtrennt gespannte Faserbrücken statt sie im <strong>90°-Winkel</strong> zu teilen: Kraftfluss reißt ab, <strong>τc steigt</strong>.',
        bullet: '<strong>Grundgesetz:</strong> Immer <strong>90° zur Kontur</strong> ruhig <strong>drücken statt hacken</strong>!'
      },
      rawOverride: {
        roDepth: '0 Stiche · Werkszustand',
        roEffect: '0,0 dB · Werksspannung',
        kpi2Sub: '100 % Werksspannung',
        badge: '✦ WERKSZUSTAND • VOR DEM NADELN',
        title: 'Hohe Werksvorspannung benötigt gezielte Zonen-Balance',
        body: 'Wählen Sie <strong>„2 · ✓ 90° Drücken“</strong>, um zu sehen, wie jede Uhrzeit-Zone Teiltonspektrum und Dynamik formt.',
        bullet: '<strong>Ablauf:</strong> Mechanik &amp; Saitensitz → <strong>Blau</strong> → <strong>Grün/Orange</strong> → <strong>Violett (≤ 2 mm)</strong>.'
      }
    },

    en: {
      pillBlue: '🔵 Blue (ff)',
      pillGreen: '🟢 Green (f)',
      pillOrange: '🟠 Orange (p)',
      pillPurple: '🟣 Purple (pp)',
      pillRed: '🔴 12:00 Taboo',
      loopOn: '⏸ Needle Pulse',
      loopOff: '▶ Needle Pulse',
      strikeBtn: 'Stitch & Tone',
      specDelta: 'ΔdB Stitch Effect',
      specDyn: 'Dynamics pp–ff',
      techRawVal: '0 Stitches · Factory Tension',
      techIdealVal: '✓ 90° radial · σ intact',
      techWrongVal: '✕ Fibers cut · σ ruined',
      techRedVal: '✕ TABOO: Crown core ruined',
      cvString: 'Steel string · Strike (12:00)',
      cvAxis12: '12:00 Axis',
      cvAxisCheekL: '9:00 Flank',
      cvAxisCheekR: 'Flank 3:00',
      cvAxisUf: 'Top Edge Underfelt',
      cvGlueRivet: 'Glue + T-Rivet',
      cvTransferUp: 'Tension ↑ to f-wedge',
      cvBetweenGrooves: 'Between grooves only (≤ 2 mm)!',
      cvTabooWarn: '✕ TABOO: > 2 mm ruins σ!',
      cvWrongWarn: '✕ Cross-cut severs outer fibers!',
      cvRawHint: 'Factory state (0 stitches)',
      cvClickHint: 'Click wedge',
      specZone1: 'H1–H4 Foundation',
      specZone2: 'H5–H8 Singing Core',
      specZone3: 'H9–H12 Brilliance',
      dynTitle: 'Playable Response Across Dynamics (pp → ff)',
      dynBefore: 'Before',
      dynAfter: 'After Stitch',
      dynLabels: ['pp', 'p', 'mf', 'f', 'ff'],
      zones: {
        blue: {
          roZone: '🔵 Blue ff-Wedge (9–10 / 2–3h)',
          roDepth: '7–9 mm (pre-UF) · 90°',
          roEffect: 'H1–H4 +3.2 dB · open ff',
          kpi1Num: '7–9 mm',
          kpi1Sub: '3-needle · No. 7',
          kpi2Sub: '✓ Fibers parted, σ intact',
          kpi3Num: '+3.2 dB',
          kpi3Sub: 'H1–H4 ↑ · free ff',
          badge: '✦ PRE-NEEDLING • BLUE FF-WEDGE (9–10 / 2–3H)',
          title: 'Deep 90° stitches release factory rigidity into the f-wedge',
          body: 'Pressing smoothly up to <strong>just before the underfelt</strong> channels elasticity <strong>upward into the green wedge</strong> for resonant <em>ff</em>.',
          bullet: '<strong>Effect:</strong> Boosts bass fullness (<strong>H1–H4 +3.2 dB</strong>) while keeping the crown intact.'
        },
        green: {
          roZone: '🟢 Green f-Wedge (10–11 / 1–2h)',
          roDepth: '4–6 mm · 90° radial',
          roEffect: 'Core +2.4 dB · edge −2.5 dB',
          kpi1Num: '4–6 mm',
          kpi1Sub: 'Mid-voicing · 90° radial',
          kpi2Sub: '✓ Flank flow open',
          kpi3Num: '+2.4 dB',
          kpi3Sub: 'Singing mf–f (H3–H6 ↑)',
          badge: '✦ MID-VOICING • GREEN F-WEDGE (10–11 / 1–2H)',
          title: 'Opens the transition bridge between crown and ½-flank',
          body: '<strong>90° stitches (4–6 mm)</strong> relax stiff outer contours so the flank flexes freely, building a rich <strong>cantabile core</strong>.',
          bullet: '<strong>Effect:</strong> Smooth <em>mf → f</em> growth and softer upper glare (<strong>−2.5 dB</strong>).'
        },
        orange: {
          roZone: '🟠 Orange p-Wedge (11–12 / 12–1h)',
          roDepth: '2.5–4 mm · 90° radial',
          roEffect: 'H8–H12 −3.8 dB · warm piano',
          kpi1Num: '2.5–4 mm',
          kpi1Sub: 'Fine needle · crown flank',
          kpi2Sub: '✓ Core arch intact',
          kpi3Num: '−3.8 dB',
          kpi3Sub: 'Warm piano tone',
          badge: '✦ BALANCE • ORANGE P-WEDGE (11–12 / 12–1H)',
          title: 'Shallow stitches beside the crown shape a warm lyrical tone',
          body: '<strong>2.5–4 mm stitches (90°)</strong> flanking the crown cushion glassy <em>piano</em> partials while keeping deep <em>forte</em> support.',
          bullet: '<strong>Effect:</strong> Evens tone color across 88 keys (<strong>H8–H12 −3.8 dB</strong>).'
        },
        purple: {
          roZone: '🟣 Purple pp-Wedge (Crown)',
          roDepth: '≤ 2 mm · btw grooves',
          roEffect: 'H9–H12 −5.1 dB · velvety pp',
          kpi1Num: '≤ 2.0 mm',
          kpi1Sub: 'Short 1-needle · btw grooves',
          kpi2Sub: '✓ 96% core tension intact',
          kpi3Num: '−5.1 dB',
          kpi3Sub: 'Silky H9–H12 · pure pp',
          badge: '✦ FINE VOICING • PURPLE PP-WEDGE (≤ 2 MM)',
          title: 'Micro-surface stitches create a velvet cushion for pp',
          body: 'Short single needle <strong>max. 1–2 mm deep</strong> and <strong>strictly between string grooves</strong> leaves the core arch untouched.',
          bullet: '<strong>Rule:</strong> Never prick in the grooves and never exceed <strong>2 mm</strong>!'
        },
        red: {
          roZone: '🔴 Red Taboo (12:00 Core)',
          roDepth: '✕ TABOO: > 2 mm forbidden!',
          roEffect: '⚠ σ 34% · τc 3.15 ms · dead!',
          kpi1Num: '✕ TABOO',
          kpi1Sub: 'Never > 2 mm at 12:00!',
          kpi2Sub: '✕ Tension arch severed!',
          kpi3Num: '−6.8 dB',
          kpi3Sub: 'Hollow & lifeless',
          badge: '⚠️ TABOO ZONE 12:00 • DEEP CROWN CORE',
          title: 'Deep crown stitches destroy surface tension irreversibly!',
          body: 'Needling <strong>> 2 mm into the red core triangle</strong> severs the tension arch: rebound collapses and <strong>τc jumps to 3.15 ms</strong>.',
          bullet: '<strong>Damage:</strong> Tone turns <strong>hollow and dead</strong> — losing both <em>p</em> and <em>ff</em>!'
        }
      },
      wrongOverride: {
        roDepth: '✕ ERROR: Cross-cut / chop!',
        roEffect: '⚠ Fibers severed · τc ↑',
        kpi2Sub: '✕ Tension webs severed!',
        badge: '⚠️ NEEDLING ERROR • CROSS-CUT / CHOPPING',
        title: 'Oblique stitches and chopping slice tensioned wool layers!',
        body: 'Jabbing obliquely cuts fiber bridges instead of parting them at <strong>90°</strong>, severing flank force flow and <strong>prolonging τc</strong>.',
        bullet: '<strong>Core Law:</strong> Always align <strong>90° to the contour</strong> and <strong>press smoothly</strong>!'
      },
      rawOverride: {
        roDepth: '0 Stitches · Factory state',
        roEffect: '0.0 dB · factory tension',
        kpi2Sub: '100% factory tension',
        badge: '✦ FACTORY BASELINE • BEFORE NEEDLING',
        title: 'High factory pre-tension awaits targeted zone balance',
        body: 'Select <strong>“2 · ✓ 90° Press”</strong> to compare how each clock-face wedge shapes partial spectrum and dynamics.',
        bullet: '<strong>Sequence:</strong> Regulate &amp; seat strings → <strong>Blue</strong> → <strong>Green/Orange</strong> → <strong>Purple (≤ 2 mm)</strong>.'
      }
    },

    ja: {
      pillBlue: '🔵 青 (ff)',
      pillGreen: '🟢 緑 (f)',
      pillOrange: '🟠 橙 (p)',
      pillPurple: '🟣 紫 (pp)',
      pillRed: '🔴 12時禁区',
      loopOn: '⏸ 針モーション',
      loopOff: '▶ 針モーション',
      strikeBtn: '刺針＆試聴',
      specDelta: 'ΔdB 整音効果',
      specDyn: 'ダイナミクス pp–ff',
      techRawVal: '0刺 · 出荷張力',
      techIdealVal: '✓ 90°垂直押し · σ維持',
      techWrongVal: '✕ 繊維切断 · σ崩壊',
      techRedVal: '✕ 厳禁：深部破壊',
      cvString: 'スチール弦 · 打弦点 (12:00)',
      cvAxis12: '12:00 軸',
      cvAxisCheekL: '9:00 フランク',
      cvAxisCheekR: 'フランク 3:00',
      cvAxisUf: 'アンダーフェルト上端',
      cvGlueRivet: '接着＋リベット',
      cvTransferUp: '弾性が緑のf領域へ ↑',
      cvBetweenGrooves: '弦溝の間のみ（≤2mm）！',
      cvTabooWarn: '✕ 深刺し厳禁（>2mmでσ崩壊）',
      cvWrongWarn: '✕ 斜め・叩き刺しは繊維切断！',
      cvRawHint: '未整音状態（0刺）',
      cvClickHint: 'ゾーンを選択',
      specZone1: 'H1–H4 基音・土台',
      specZone2: 'H5–H8 歌唱コア',
      specZone3: 'H9–H12 輝き・鋭さ',
      dynTitle: 'ダイナミクス別の発音レスポンス (pp → ff)',
      dynBefore: '整音前',
      dynAfter: '刺針後',
      dynLabels: ['pp', 'p', 'mf', 'f', 'ff'],
      zones: {
        blue: {
          roZone: '🔵 青のffウェッジ (9–10 / 2–3時)',
          roDepth: '7–9 mm (UF手前) · 90°',
          roEffect: '基音 +3.2 dB · 豊かなff',
          kpi1Num: '7–9 mm',
          kpi1Sub: '3本針 · 7番針',
          kpi2Sub: '✓ 繊維を分けσ維持',
          kpi3Num: '+3.2 dB',
          kpi3Sub: 'H1–H4 ↑ · ff解放',
          badge: '✦ 予備整音 • 青のFFウェッジ (9–10 / 2–3時)',
          title: '深い90°刺針が初期硬さを解きfウェッジへ弾性を送る',
          body: '<strong>アンダーフェルト手前まで</strong>垂直に押し込み、弾性を<strong>緑のフォルテ領域へ上昇</strong>させて豊かな<em>ff</em>を開放します。',
          bullet: '<strong>効果：</strong>頂点を弱めずに基音の厚みを増強（<strong>H1–H4 +3.2 dB</strong>）。'
        },
        green: {
          roZone: '🟢 緑のfウェッジ (10–11 / 1–2時)',
          roDepth: '4–6 mm · 90°放射状',
          roEffect: '歌唱核 +2.4 dB · 鋭さ −2.5 dB',
          kpi1Num: '4–6 mm',
          kpi1Sub: '中整音 · 90°放射状',
          kpi2Sub: '✓ フランク伝達開放',
          kpi3Num: '+2.4 dB',
          kpi3Sub: '歌うmf–f (H3–H6 ↑)',
          badge: '✦ 中整音 • 緑のFウェッジ (10–11 / 1–2時)',
          title: 'クラウンと½フランクを結ぶ移行帯をしなやかに解放',
          body: '<strong>90°刺針（4–6 mm）</strong>が外輪郭の硬さを解き、フランク弾性と伸びやかな<strong>カンタービレ核</strong>を引き出します。',
          bullet: '<strong>効果：</strong><em>mf〜f</em>を滑らかに繋ぎ、硬い倍音（<strong>−2.5 dB</strong>）を緩和。'
        },
        orange: {
          roZone: '🟠 橙のpウェッジ (11–12 / 12–1時)',
          roDepth: '2.5–4 mm · 90°放射状',
          roEffect: 'H8–H12 −3.8 dB · 温かいp',
          kpi1Num: '2.5–4 mm',
          kpi1Sub: '細針 · クラウン脇',
          kpi2Sub: '✓ 深部アーチ保持',
          kpi3Num: '−3.8 dB',
          kpi3Sub: '温かいp音色',
          badge: '✦ バランス整音 • 橙のPウェッジ (11–12 / 12–1時)',
          title: 'クラウン脇への浅い90°刺針が温かい弱音を形成',
          body: '打弦点脇への<strong>2.5–4 mm刺針</strong>が<em>p〜mp</em>のガラス質な硬さを和らげ、深部の<em>f</em>支持力は保ちます。',
          bullet: '<strong>効果：</strong>鋭い高次倍音（<strong>H8–H12 −3.8 dB</strong>）を抑え88鍵を均一化。'
        },
        purple: {
          roZone: '🟣 紫のppウェッジ (頂点表層)',
          roDepth: '≤ 2 mm · 弦溝の間のみ',
          roEffect: 'H9–H12 −5.1 dB · 繊細なpp',
          kpi1Num: '≤ 2.0 mm',
          kpi1Sub: '短単針 · 弦溝の間',
          kpi2Sub: '✓ 96%深部張力維持',
          kpi3Num: '−5.1 dB',
          kpi3Sub: 'H9–H12抑制 · 極上pp',
          badge: '✦ 仕上げ整音 • 紫のPP表層 (≤ 2 MM)',
          title: '弦溝の間への極浅刺針が繊細なppクッションを作る',
          body: '短い単針で<strong>1〜2 mm以内・弦溝の間のみ</strong>を浅く整え、下層の支持コアは無傷に保ちます。',
          bullet: '<strong>鉄則：</strong>弦溝内には刺さず、頂点では<strong>深さ2 mm</strong>を絶対厳守！'
        },
        red: {
          roZone: '🔴 赤の禁止ゾーン (12時深部)',
          roDepth: '✕ 厳禁: > 2 mm 不可！',
          roEffect: '⚠ σ 34% · τc 3.15 ms · 死音！',
          kpi1Num: '✕ 厳禁',
          kpi1Sub: '12時 > 2mm禁止！',
          kpi2Sub: '✕ 張力アーチ断裂！',
          kpi3Num: '−6.8 dB',
          kpi3Sub: '空疎で死んだ音',
          badge: '⚠️ 12:00 禁止ゾーン • クラウン深部コア',
          title: '12時深部への刺針は表面張力を不可逆的に破壊する！',
          body: '<strong>赤い中央三角ゾーンへ2 mm超</strong>の刺針は張力アーチを切断し、接触時間が<strong>τc ≈ 3.15 ms</strong>へ急増します。',
          bullet: '<strong>損傷：</strong>音は<strong>空洞で死んだ響き</strong>となり<em>p</em>も<em>ff</em>も失われます！'
        }
      },
      wrongOverride: {
        roDepth: '✕ エラー: 斜め・叩き刺し！',
        roEffect: '⚠ 繊維切断 · τc増大',
        kpi2Sub: '✕ 張力繊維切断！',
        badge: '⚠️ 刺針エラー • 斜め刺し・叩き刺し',
        title: '斜め刺しや叩き刺しは張力を担う羊毛層を切断する！',
        body: '輪郭へ<strong>90°垂直</strong>に押し分けず斜めに突くと羊毛網が切れ、フランク伝達と反発力が失われます。',
        bullet: '<strong>鉄則：</strong>常に<strong>輪郭へ90°直角</strong>に当て、静かに<strong>押し込む</strong>こと！'
      },
      rawOverride: {
        roDepth: '0刺 · 出荷状態',
        roEffect: '0.0 dB · 初期張力',
        kpi2Sub: '100% 出荷張力',
        badge: '✦ 基準状態 • 針入れ前のハンマー',
        title: '高い初期張力を時計モデルのゾーン整音で最適化する',
        body: '<strong>「2 · ✓ 90°垂直押し」</strong>に切り替え、各ゾーンの刺針が倍音とダイナミクスを整える様子を確認してください。',
        bullet: '<strong>手順：</strong>整調・弦密着 → <strong>青(ff)</strong> → <strong>緑・橙</strong> → <strong>紫(≤2 mm)</strong>。'
      }
    },

    zh: {
      pillBlue: '🔵 蓝区 (ff)',
      pillGreen: '🟢 绿区 (f)',
      pillOrange: '🟠 橙区 (p)',
      pillPurple: '🟣 紫区 (pp)',
      pillRed: '🔴 12点禁区',
      loopOn: '⏸ 进针演示',
      loopOff: '▶ 进针演示',
      strikeBtn: '扎针试听',
      specDelta: 'ΔdB 整音效果',
      specDyn: '动态响应 pp–ff',
      techRawVal: '0针 · 出厂张力',
      techIdealVal: '✓ 90°静压 · σ完好',
      techWrongVal: '✕ 割断纤维 · σ崩塌',
      techRedVal: '✕ 禁区：槌心损毁',
      cvString: '钢弦 · 击弦点 (12:00)',
      cvAxis12: '12:00 轴',
      cvAxisCheekL: '9:00 侧翼',
      cvAxisCheekR: '侧翼 3:00',
      cvAxisUf: '底毡上沿',
      cvGlueRivet: '胶层 + 铆钉',
      cvTransferUp: '张力向上导入绿区 ↑',
      cvBetweenGrooves: '仅限弦沟间 (≤ 2 mm)！',
      cvTabooWarn: '✕ 严禁深扎 (>2 mm 毁坏σ)！',
      cvWrongWarn: '✕ 横刺劈扎割断外层纤维！',
      cvRawHint: '出厂原始状态 (0针)',
      cvClickHint: '点击楔区',
      specZone1: 'H1–H4 基音厚度',
      specZone2: 'H5–H8 歌唱核心',
      specZone3: 'H9–H12 明亮度',
      dynTitle: '各力度下的触键响应 (pp → ff)',
      dynBefore: '整音前',
      dynAfter: '扎针后',
      dynLabels: ['pp', 'p', 'mf', 'f', 'ff'],
      zones: {
        blue: {
          roZone: '🔵 蓝色ff楔区 (9–10 / 2–3点)',
          roDepth: '7–9 mm (底毡前) · 90°',
          roEffect: '基音 +3.2 dB · 通透ff',
          kpi1Num: '7–9 mm',
          kpi1Sub: '3针柄 · 7号针',
          kpi2Sub: '✓ 拨开纤维，σ完好',
          kpi3Num: '+3.2 dB',
          kpi3Sub: 'H1–H4 ↑ · ff全开',
          badge: '✦ 预整音 • 蓝色FF楔区 (9–10 / 2–3点)',
          title: '深层90°静压化解出厂死硬，将弹性导入f楔区',
          body: '平稳深压至<strong>底毡前缘</strong>，使弹性<strong>向上传至绿色强音区</strong>，瞬间打开浑厚<em>ff</em>。',
          bullet: '<strong>效果：</strong>增强基音延音（<strong>H1–H4 +3.2 dB</strong>），不伤槌顶。'
        },
        green: {
          roZone: '🟢 绿色f楔区 (10–11 / 1–2点)',
          roDepth: '4–6 mm · 90°径向',
          roEffect: '核心 +2.4 dB · 燥感 −2.5 dB',
          kpi1Num: '4–6 mm',
          kpi1Sub: '中整音 · 90°径向',
          kpi2Sub: '✓ 侧翼力流畅通',
          kpi3Num: '+2.4 dB',
          kpi3Sub: '如歌mf–f (H3–H6 ↑)',
          badge: '✦ 中度整音 • 绿色F楔区 (10–11 / 1–2点)',
          title: '打通槌顶至½侧翼过渡带，塑造歌唱性核心',
          body: '<strong>90°中深进针（4–6 mm）</strong>柔化外轮廓，恢复侧翼协同弹性与<strong>如歌中频核心</strong>。',
          bullet: '<strong>效果：</strong><em>mf→f</em>衔接顺滑，柔化刺耳泛音（<strong>−2.5 dB</strong>）。'
        },
        orange: {
          roZone: '🟠 橙色p楔区 (11–12 / 12–1点)',
          roDepth: '2.5–4 mm · 90°径向',
          roEffect: 'H8–H12 −3.8 dB · 温暖弱音',
          kpi1Num: '2.5–4 mm',
          kpi1Sub: '细针 · 槌冠两侧',
          kpi2Sub: '✓ 内部张力拱保留',
          kpi3Num: '−3.8 dB',
          kpi3Sub: '温暖圆润p',
          badge: '✦ 均衡整音 • 橙色P楔区 (11–12 / 12–1点)',
          title: '槌冠两侧精细浅扎，雕琢温暖柔和弱音',
          body: '槌冠两侧<strong>90°浅扎2.5–4 mm</strong>，缓冲<em>p–mp</em>尖硬玻璃声，完整保留深层<em>f</em>支撑。',
          bullet: '<strong>效果：</strong>衰减高频毛刺（<strong>H8–H12 −3.8 dB</strong>），统一88键音色。'
        },
        purple: {
          roZone: '🟣 紫色pp楔区 (槌顶表层)',
          roDepth: '≤ 2 mm · 弦沟之间',
          roEffect: 'H9–H12 −5.1 dB · 丝绒pp',
          kpi1Num: '≤ 2.0 mm',
          kpi1Sub: '短单针 · 弦沟之间',
          kpi2Sub: '✓ 96%核心张力完好',
          kpi3Num: '−5.1 dB',
          kpi3Sub: '滤除杂音 · 纯净pp',
          badge: '✦ 精微整音 • 紫色PP表层 (≤ 2 MM)',
          title: '弦沟间微表层轻刺（≤2 mm），铺就丝绒pp触感',
          body: '短单针<strong>严控1–2 mm</strong>且<strong>仅扎在弦沟之间</strong>，仅柔化表层而不伤承重槌心。',
          bullet: '<strong>铁律：</strong>绝不刺入弦沟内，槌顶严禁超过<strong>2 mm</strong>！'
        },
        red: {
          roZone: '🔴 红色禁区 (12点槌心)',
          roDepth: '✕ 严禁深扎 (> 2 mm)！',
          roEffect: '⚠ σ 34% · τc 3.15 ms · 枯死！',
          kpi1Num: '✕ 禁区',
          kpi1Sub: '12点禁超2mm！',
          kpi2Sub: '✕ 张力拱断裂！',
          kpi3Num: '−6.8 dB',
          kpi3Sub: '空洞无力',
          badge: '⚠️ 12:00 绝对禁区 • 深层击弦核心',
          title: '深刺槌顶核心将不可逆地摧毁表面张力拱！',
          body: '<strong>超过2 mm刺入红色中心区</strong>会切断受拉拱梁，回弹瓦解且<strong>τc暴增至3.15 ms</strong>。',
          bullet: '<strong>后果：</strong>音色<strong>空洞枯死</strong>，彻底丧失<em>p</em>与<em>ff</em>！'
        }
      },
      wrongOverride: {
        roDepth: '✕ 错误: 横刺 / 劈扎！',
        roEffect: '⚠ 割断纤维 · τc延长',
        kpi2Sub: '✕ 羊毛层被切断！',
        badge: '⚠️ 整音大忌 • 横刺或猛扎',
        title: '斜向横刺或猛烈劈扎会割断受拉羊毛纤维桥！',
        body: '违背<strong>90°垂直</strong>分纤原理，横刺会割断外层高张力毛网，阻断侧翼力流并<strong>延长τc</strong>。',
        bullet: '<strong>铁律：</strong>永远<strong>90°垂直于外轮廓</strong>，平稳<strong>静压而非猛戳</strong>！'
      },
      rawOverride: {
        roDepth: '0针 · 出厂状态',
        roEffect: '0.0 dB · 出厂预张力',
        kpi2Sub: '100% 出厂张力',
        badge: '✦ 出厂基准 • 施针前弦槌',
        title: '出厂高预张力需借时钟五区整音释放潜能',
        body: '切换至<strong>“2 · ✓ 90°静压”</strong>，对比各时钟楔区如何塑造泛音与动态范围。',
        bullet: '<strong>流程：</strong>整调与压弦 → <strong>蓝区</strong> → <strong>绿/橙区</strong> → <strong>紫区(≤2 mm)</strong>。'
      }
    }
  };

  class VoicingZonesController {
    constructor() {
      this.zone = 'blue';      // 'blue' | 'green' | 'orange' | 'purple' | 'red'
      this.tech = 'ideal';     // 'raw' | 'ideal' | 'wrong'
      this.chartMode = 'delta'; // 'delta' | 'dyn'
      this.autoPulse = true;
      this.lang = 'de';
      this.animId = null;
      this.startMs = performance.now();
      this.strikeFlash = 0;
      this.hoverZone = null;
      this.cachedGeom = null;
      this.audioCtx = null;

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    dict() {
      return I18N[this.lang] || I18N.de;
    }

    isSlideActive() {
      const slideEl = document.querySelector('.slide.vzn-slide');
      if (!slideEl) return false;
      return slideEl.classList.contains('active');
    }

    fmt(num, dec = 1) {
      const s = Number(num).toFixed(dec);
      return this.lang === 'de' ? s.replace('.', ',') : s;
    }

    fmtSignedDb(val) {
      const sign = val > 0.04 ? '+' : (val < -0.04 ? '−' : '±');
      return `${sign}${this.fmt(Math.abs(val), 1)} dB`;
    }

    computeState() {
      const zm = ZONE_META[this.zone];
      let deltas;
      let dynAfter;
      let sigmaPct;
      let tauMs;
      let isAlert = false;

      if (this.tech === 'raw') {
        deltas = new Array(12).fill(0);
        dynAfter = [54, 62, 72, 76, 68];
        sigmaPct = 100;
        tauMs = 1.72;
      } else if (this.zone === 'red') {
        isAlert = true;
        const mult = this.tech === 'wrong' ? 1.15 : 1.0;
        deltas = zm.deltaIdeal.map((v) => Math.max(-10, v * mult));
        dynAfter = [36, 42, 40, 31, 20];
        sigmaPct = this.tech === 'wrong' ? 24 : zm.sigmaIdeal;
        tauMs = this.tech === 'wrong' ? 3.38 : zm.tauIdeal;
      } else if (this.tech === 'wrong') {
        isAlert = true;
        // Cross-cutting outer fibers destroys tension arch & projection regardless of zone
        const baseDrop = this.zone === 'purple' ? -4.2 : -3.4;
        deltas = [
          baseDrop + 0.6, baseDrop + 0.3, baseDrop, baseDrop - 0.5,
          baseDrop - 1.1, baseDrop - 1.6, baseDrop - 2.2, baseDrop - 2.7,
          baseDrop - 3.2, baseDrop - 3.6, baseDrop - 4.0, baseDrop - 4.3
        ];
        dynAfter = [48, 52, 50, 40, 29];
        sigmaPct = this.zone === 'blue' ? 52 : 44;
        tauMs = 2.86;
      } else {
        deltas = zm.deltaIdeal.slice();
        dynAfter = zm.dynIdeal.slice();
        sigmaPct = zm.sigmaIdeal;
        tauMs = zm.tauIdeal;
      }

      const dynBefore = [54, 62, 72, 76, 68];
      return { zm, deltas, dynBefore, dynAfter, sigmaPct, tauMs, isAlert };
    }

    playZoneTone() {
      try {
        const AudioContextCls = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextCls) return;
        if (!this.audioCtx) this.audioCtx = new AudioContextCls();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const st = this.computeState();
        const f0 = 220; // A3 concert voicing check register
        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(0.22, now + 0.006);
        const decaySec = st.isAlert ? 0.55 : (this.zone === 'blue' ? 1.65 : 1.35);
        master.gain.exponentialRampToValueAtTime(0.0008, now + decaySec);
        master.connect(ctx.destination);

        const baseWeights = [1.0, 0.72, 0.52, 0.38, 0.28, 0.21, 0.15, 0.11, 0.08, 0.06, 0.045, 0.032];
        for (let i = 0; i < 12; i++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const n = i + 1;
          // Slight piano string inharmonicity B
          const B = 0.00018;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f0 * n * Math.sqrt(1 + B * n * n), now);

          const dbShift = st.deltas[i];
          const linGain = baseWeights[i] * Math.pow(10, dbShift / 20) * 0.28;
          const partDecay = Math.max(0.14, decaySec / (1 + i * (st.isAlert ? 0.42 : 0.22)));
          g.gain.setValueAtTime(Math.max(0.0001, linGain), now);
          g.gain.exponentialRampToValueAtTime(0.00005, now + partDecay);

          osc.connect(g);
          g.connect(master);
          osc.start(now);
          osc.stop(now + partDecay + 0.04);
        }
      } catch (_) {
        // Ignore Web Audio autoplay restrictions
      }
    }

    triggerStrike(playAudio = true) {
      this.strikeFlash = 1.0;
      this.startMs = performance.now();
      const btn = document.getElementById('vzn-btn-strike');
      if (btn) {
        btn.classList.add('striking');
        setTimeout(() => btn.classList.remove('striking'), 360);
      }
      if (playAudio) this.playZoneTone();
      if (!this.animId && this.isSlideActive()) this.startAnimLoop();
    }

    setupCanvas(canvas) {
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(240, rect.width || 640);
      const h = Math.max(110, rect.height || 260);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const tw = Math.round(w * dpr);
      const th = Math.round(h * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
      }
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w, h };
    }

    drawArrow(ctx, x1, y1, x2, y2, color, width = 2.2, headScale = 1.0) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      if (len < 2) return;
      const ux = dx / len;
      const uy = dy / len;
      const hs = 7.5 * headScale;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 - ux * hs * 0.55, y2 - uy * hs * 0.55);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ux * hs - uy * hs * 0.52, y2 - uy * hs + ux * hs * 0.52);
      ctx.lineTo(x2 - ux * hs + uy * hs * 0.52, y2 - uy * hs - ux * hs * 0.52);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    drawHeadCanvas(st, nowMs) {
      const canvas = document.getElementById('vzn-canvas-head');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const d = this.dict();

      ctx.clearRect(0, 0, w, h);

      // Subtle technical grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let gx = 28; gx < w; gx += 34) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 24; gy < h; gy += 34) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }
      ctx.restore();

      const cx = w * 0.50;
      const stringY = 38;
      const crownTopY = 55;
      const feltH = Math.max(146, Math.min(h - 78, h * 0.70));
      const feltEndY = crownTopY + feltH;
      const woodBotY = h - 7;

      const shoulderY = crownTopY + feltH * 0.43; // 9:00 - 3:00 clock pivot!
      const shoulderHW = Math.min(w * 0.195, feltH * 0.53);
      const topSpan = shoulderY - crownTopY;
      const botSpan = feltEndY - shoulderY;

      // Underfelt & Hornbeam Core geometry (matching Slide 34 Renner Hammerhead)
      const ufTipY = crownTopY + topSpan * 0.66;
      const coreTipY = ufTipY + Math.max(9, feltH * 0.068);
      const coreDomeY = shoulderY + botSpan * 0.16;
      const ufDomeY = coreDomeY - 1;
      const ufEndY = shoulderY + botSpan * 0.54;
      const coreNoseHW = shoulderHW * 0.25;
      const ufOuterHW = coreNoseHW + Math.max(8, shoulderHW * 0.115);
      const coreWaistHW = shoulderHW * 0.135;
      const coreFootHW = shoulderHW * 0.235;
      const rivetY = feltEndY - botSpan * 0.14;

      const evalCubic = (p0, p1, p2, p3, t) => {
        const mt = 1 - t;
        return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
      };

      const crownCtrlX = shoulderHW * 0.52;
      const lowX0 = shoulderHW, lowY0 = shoulderY;
      const lowX1 = shoulderHW, lowY1 = shoulderY + botSpan * 0.42;
      const lowX2 = coreWaistHW + (shoulderHW - coreWaistHW) * 0.36, lowY2 = feltEndY - botSpan * 0.16;
      const lowX3 = coreWaistHW + 0.8, lowY3 = feltEndY;

      const evalOuterHalf = (thetaRad) => {
        // Ray from clock center (cx, shoulderY) at angle thetaRad from 12:00 (0 = up, pi/2 = 3:00)
        // Find intersection with right outer contour by binary search / lookup
        const sinT = Math.sin(thetaRad);
        const cosT = Math.cos(thetaRad);
        let bestR = shoulderHW;
        let bestDiff = 1e9;
        for (let s = 0; s <= 80; s++) {
          let px, py;
          if (s <= 45) {
            const t = s / 45;
            px = evalCubic(0, crownCtrlX, shoulderHW, shoulderHW, t);
            py = evalCubic(crownTopY, crownTopY, shoulderY - topSpan * 0.53, shoulderY, t);
          } else {
            const t = (s - 45) / 35;
            px = evalCubic(lowX0, lowX1, lowX2, lowX3, t);
            py = evalCubic(lowY0, lowY1, lowY2, lowY3, t);
          }
          const dx = px;
          const dy = shoulderY - py;
          const ang = Math.atan2(dx, dy);
          const diff = Math.abs(ang - thetaRad);
          if (diff < bestDiff) {
            bestDiff = diff;
            bestR = Math.hypot(dx, dy);
          }
        }
        return {
          r: bestR,
          x: sinT * bestR,
          y: shoulderY - cosT * bestR
        };
      };

      // Cache geometry for interactive canvas click/hover hit-testing
      this.cachedGeom = {
        cx, shoulderY, crownTopY, ufTipY, feltEndY, shoulderHW, topSpan, botSpan
      };

      // --- 0. Tri-chord Steel String at 12:00 Strike Point ---
      ctx.save();
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(cx - shoulderHW * 1.55, stringY);
      ctx.lineTo(cx + shoulderHW * 1.55, stringY);
      ctx.stroke();

      for (const sx of [-11, 0, 11]) {
        ctx.fillStyle = sx === 0 ? '#f8fafc' : '#cbd5e1';
        ctx.beginPath();
        ctx.arc(cx + sx, stringY, 3.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = '600 12.4px Roboto, sans-serif';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
      ctx.textAlign = 'left';
      ctx.fillText(d.cvString, 12, 20);
      ctx.restore();

      // --- 1. Hornbeam Wood Core (Weißbuche-Holzkern) ---
      const coreHWAtUfEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((ufEndY - coreDomeY) / Math.max(1, feltEndY - coreDomeY));
      const woodPath = new Path2D();
      woodPath.moveTo(cx, coreTipY);
      woodPath.bezierCurveTo(cx + coreNoseHW * 0.58, coreTipY, cx + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, cx + coreNoseHW, coreDomeY);
      woodPath.lineTo(cx + coreWaistHW, feltEndY);
      woodPath.lineTo(cx + coreFootHW, woodBotY);
      woodPath.lineTo(cx - coreFootHW, woodBotY);
      woodPath.lineTo(cx - coreWaistHW, feltEndY);
      woodPath.lineTo(cx - coreNoseHW, coreDomeY);
      woodPath.bezierCurveTo(cx - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, cx - coreNoseHW * 0.58, coreTipY, cx, coreTipY);
      woodPath.closePath();

      ctx.save();
      const woodGrad = ctx.createLinearGradient(cx - coreNoseHW, coreTipY, cx + coreNoseHW, woodBotY);
      woodGrad.addColorStop(0, '#e7c697');
      woodGrad.addColorStop(0.5, '#cfa065');
      woodGrad.addColorStop(1, '#9a6832');
      ctx.fillStyle = woodGrad;
      ctx.fill(woodPath);
      ctx.strokeStyle = 'rgba(254, 243, 199, 0.55)';
      ctx.lineWidth = 1.1;
      ctx.stroke(woodPath);
      ctx.restore();

      // --- 2. Crimson Underfelt Horseshoe Cap (Unterfilz) ---
      const ufPath = new Path2D();
      ufPath.moveTo(cx, ufTipY);
      ufPath.bezierCurveTo(cx + ufOuterHW * 0.60, ufTipY, cx + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, cx + ufOuterHW, ufDomeY);
      ufPath.bezierCurveTo(cx + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, cx + coreHWAtUfEnd + 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22, cx + coreHWAtUfEnd + 0.3, ufEndY);
      ufPath.lineTo(cx + coreNoseHW, coreDomeY);
      ufPath.bezierCurveTo(cx + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, cx + coreNoseHW * 0.58, coreTipY, cx, coreTipY);
      ufPath.bezierCurveTo(cx - coreNoseHW * 0.58, coreTipY, cx - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44, cx - coreNoseHW, coreDomeY);
      ufPath.lineTo(cx - coreHWAtUfEnd - 0.3, ufEndY);
      ufPath.bezierCurveTo(cx - coreHWAtUfEnd - 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22, cx - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, cx - ufOuterHW, ufDomeY);
      ufPath.bezierCurveTo(cx - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, cx - ufOuterHW * 0.60, ufTipY, cx, ufTipY);
      ufPath.closePath();

      ctx.save();
      const ufGrad = ctx.createLinearGradient(cx, ufTipY, cx, ufEndY);
      ufGrad.addColorStop(0, '#ec4899');
      ufGrad.addColorStop(0.65, '#be185d');
      ufGrad.addColorStop(1, '#831843');
      ctx.fillStyle = ufGrad;
      ctx.fill(ufPath);
      ctx.restore();

      // --- 3. Oberfilz Cloak & 5 Colored Voicing Wedges ---
      const feltCloak = new Path2D();
      feltCloak.moveTo(cx, crownTopY);
      feltCloak.bezierCurveTo(cx + crownCtrlX, crownTopY, cx + shoulderHW, shoulderY - topSpan * 0.53, cx + shoulderHW, shoulderY);
      feltCloak.bezierCurveTo(cx + lowX1, lowY1, cx + lowX2, lowY2, cx + lowX3, lowY3);
      feltCloak.lineTo(cx + coreHWAtUfEnd + 0.3, ufEndY);
      feltCloak.bezierCurveTo(cx + coreHWAtUfEnd + 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22, cx + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, cx + ufOuterHW, ufDomeY);
      feltCloak.bezierCurveTo(cx + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, cx + ufOuterHW * 0.60, ufTipY, cx, ufTipY);
      feltCloak.bezierCurveTo(cx - ufOuterHW * 0.60, ufTipY, cx - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46, cx - ufOuterHW, ufDomeY);
      feltCloak.bezierCurveTo(cx - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45, cx - coreHWAtUfEnd - 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22, cx - coreHWAtUfEnd - 0.3, ufEndY);
      feltCloak.lineTo(cx - lowX3, lowY3);
      feltCloak.bezierCurveTo(cx - lowX2, lowY2, cx - lowX1, lowY1, cx - shoulderHW, shoulderY);
      feltCloak.bezierCurveTo(cx - shoulderHW, shoulderY - topSpan * 0.53, cx - crownCtrlX, crownTopY, cx, crownTopY);
      feltCloak.closePath();

      ctx.save();
      ctx.clip(feltCloak);

      // Base dark Merino felt tone
      ctx.fillStyle = '#152033';
      ctx.fillRect(cx - shoulderHW - 20, crownTopY - 10, shoulderHW * 2 + 40, feltH + 24);

      // Helper to fill symmetric angular sector from clock pivot (cx, shoulderY)
      const fillSymmetricSector = (deg1, deg2, fillStyle, strokeStyle, lineW = 1.2) => {
        const rBig = Math.max(shoulderHW, feltH) * 1.45;
        for (const dir of [-1, 1]) {
          const a1 = -Math.PI / 2 + dir * (deg1 * Math.PI / 180);
          const a2 = -Math.PI / 2 + dir * (deg2 * Math.PI / 180);
          ctx.beginPath();
          ctx.moveTo(cx, shoulderY);
          ctx.arc(cx, shoulderY, rBig, Math.min(a1, a2), Math.max(a1, a2));
          ctx.closePath();
          ctx.fillStyle = fillStyle;
          ctx.fill();
          if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineW;
            ctx.stroke();
          }
        }
      };

      // Draw Blue, Green, Orange wedges
      for (const zk of ['blue', 'green', 'orange']) {
        const zm = ZONE_META[zk];
        const isSel = this.zone === zk;
        const isHov = this.hoverZone === zk;
        fillSymmetricSector(
          zm.angMinDeg,
          zm.angMaxDeg,
          isSel ? zm.activeRgba : (isHov ? 'rgba(255,255,255,0.22)' : zm.fillRgba),
          isSel ? '#ffffff' : 'rgba(255,255,255,0.22)',
          isSel ? 1.8 : 1.0
        );
      }

      // Draw Central Crown Sector (-13.5° .. +13.5°):
      // Split into RED Taboo Core (below 2 mm surface line) and PURPLE pp Surface Cap (outermost ~2 mm!)
      const surfaceCapPx = Math.max(9.5, (ufTipY - crownTopY) * 0.21);
      const degCrown = ZONE_META.purple.angMaxDeg * Math.PI / 180;
      const rBig = Math.max(shoulderHW, feltH) * 1.45;

      // 3a) Red Taboo Core first (entire central wedge, then Purple cap painted on outer 2 mm rim)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, shoulderY);
      ctx.arc(cx, shoulderY, rBig, -Math.PI / 2 - degCrown, -Math.PI / 2 + degCrown);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = this.zone === 'red' ? ZONE_META.red.activeRgba : ZONE_META.red.fillRgba;
      ctx.fillRect(cx - shoulderHW, crownTopY + surfaceCapPx, shoulderHW * 2, ufTipY - crownTopY);

      // Diagonal taboo warning hatch inside Red Zone
      ctx.strokeStyle = this.zone === 'red' ? 'rgba(254, 202, 202, 0.55)' : 'rgba(248, 113, 113, 0.30)';
      ctx.lineWidth = 1.15;
      for (let hy = crownTopY + surfaceCapPx - 14; hy < ufTipY + 18; hy += 7.5) {
        ctx.beginPath();
        ctx.moveTo(cx - 34, hy);
        ctx.lineTo(cx + 34, hy - 22);
        ctx.stroke();
      }

      // 3b) Purple Pianissimo Surface Cap (max 2 mm outer layer!)
      ctx.fillStyle = this.zone === 'purple' ? ZONE_META.purple.activeRgba : ZONE_META.purple.fillRgba;
      ctx.fillRect(cx - shoulderHW, crownTopY - 4, shoulderHW * 2, surfaceCapPx + 4);

      // Crisp 2 mm boundary arc between Purple cap and Red core
      ctx.strokeStyle = this.zone === 'purple' ? '#ffffff' : '#e9d5ff';
      ctx.lineWidth = this.zone === 'purple' ? 2.1 : 1.3;
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(cx - 36, crownTopY + surfaceCapPx);
      ctx.quadraticCurveTo(cx, crownTopY + surfaceCapPx - 2.5, cx + 36, crownTopY + surfaceCapPx);
      ctx.stroke();
      ctx.restore();

      // Continuous Merino wool fiber trajectories (5 subtle arcs running down to wood flanks)
      ctx.setLineDash([]);
      for (let i = 1; i <= 4; i++) {
        const frac = i / 5;
        const topYi = crownTopY + (ufTipY - crownTopY) * frac * 0.88;
        const shHWi = shoulderHW - (shoulderHW - ufOuterHW * 1.05) * frac * 0.88;
        const shYi = shoulderY + (ufDomeY - shoulderY) * frac * 0.80;
        const topSpani = Math.max(8, shYi - topYi);
        const endYi = feltEndY - frac * (feltEndY - ufEndY) * 0.85;
        const botSpani = Math.max(10, endYi - shYi);
        const woodHWAtEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((endYi - coreDomeY) / Math.max(1, feltEndY - coreDomeY));
        const endXOff = woodHWAtEnd + 0.6;
        const lowCtrlX2 = endXOff + (shHWi - endXOff) * 0.35;

        ctx.strokeStyle = 'rgba(255, 250, 235, 0.19)';
        ctx.lineWidth = 1.05;
        ctx.beginPath();
        ctx.moveTo(cx - endXOff, endYi);
        ctx.bezierCurveTo(cx - lowCtrlX2, endYi - botSpani * 0.17, cx - shHWi, shYi + botSpani * 0.41, cx - shHWi, shYi);
        ctx.bezierCurveTo(cx - shHWi, shYi - topSpani * 0.53, cx - shHWi * 0.52, topYi, cx, topYi);
        ctx.bezierCurveTo(cx + shHWi * 0.52, topYi, cx + shHWi, shYi - topSpani * 0.53, cx + shHWi, shYi);
        ctx.bezierCurveTo(cx + shHWi, shYi + botSpani * 0.41, cx + lowCtrlX2, endYi - botSpani * 0.17, cx + endXOff, endYi);
        ctx.stroke();
      }

      // --- 3c. Draw Needle Stitch Channels inside Active Zone (when tech !== 'raw') ---
      const pulse = this.autoPulse ? (0.5 + 0.5 * Math.sin((nowMs - this.startMs) * 0.0042)) : 0.82;
      if (this.tech !== 'raw') {
        const zm = ZONE_META[this.zone];
        const midDeg = (zm.angMinDeg + zm.angMaxDeg) * 0.5;
        const dirs = (this.zone === 'purple' || this.zone === 'red') ? [1] : [-1, 1];

        for (const dir of dirs) {
          const nCount = zm.needles;
          for (let ni = 0; ni < nCount; ni++) {
            const spreadDeg = (ni - (nCount - 1) / 2) * (this.zone === 'purple' ? 6.0 : 5.2);
            const theta = ((this.zone === 'purple' || this.zone === 'red') ? spreadDeg : dir * (midDeg + spreadDeg)) * Math.PI / 180;
            const pt = evalOuterHalf(Math.abs(theta));
            const sx = cx + Math.sign(theta || dir) * pt.x;
            const sy = pt.y;

            // Inward radial unit vector (90° to contour / toward clock center) vs Wrong oblique vector
            let inX, inY;
            if (this.zone === 'purple' || this.zone === 'red') {
              inX = (this.tech === 'wrong') ? 0.82 : 0;
              inY = (this.tech === 'wrong') ? 0.57 : 1;
            } else if (this.tech === 'wrong') {
              // Oblique flat cross-cut across outer contour layers!
              inX = -dir * 0.34;
              inY = 0.94;
            } else {
              const vx = cx - sx;
              const vy = (this.zone === 'blue' ? shoulderY - 6 : shoulderY) - sy;
              const vl = Math.max(1, Math.hypot(vx, vy));
              inX = vx / vl;
              inY = vy / vl;
            }

            // Compute stitch depth in px stopping safely before underfelt
            const maxLocalThickness = Math.max(14, pt.r - ufOuterHW * 0.95);
            const depthPx = this.zone === 'purple'
              ? surfaceCapPx * 0.82
              : (this.zone === 'red' ? (ufTipY - crownTopY) * 0.84 : maxLocalThickness * zm.depthFrac);

            const curDepth = depthPx * (0.72 + 0.28 * pulse);
            const ex = sx + inX * curDepth;
            const ey = sy + inY * curDepth;

            ctx.save();
            ctx.strokeStyle = st.isAlert ? '#fecaca' : '#ffffff';
            ctx.lineWidth = st.isAlert ? 2.1 : 1.75;
            ctx.setLineDash(this.tech === 'wrong' ? [3, 2] : []);
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Special tension transfer arrows for Blue ff-Wedge -> Green f-Wedge (Kruse Page 13!)
        if (this.zone === 'blue' && this.tech === 'ideal') {
          for (const dir of [-1, 1]) {
            const pFrom = evalOuterHalf(76 * Math.PI / 180);
            const pTo = evalOuterHalf(46 * Math.PI / 180);
            this.drawArrow(
              ctx,
              cx + dir * (pFrom.x * 0.76),
              shoulderY - (shoulderY - pFrom.y) * 0.76,
              cx + dir * (pTo.x * 0.76),
              shoulderY - (shoulderY - pTo.y) * 0.76,
              '#fde047',
              2.5,
              1.05
            );
          }
        }
      }

      ctx.restore(); // end feltCloak clip

      // --- 4. Glue Seam + Brass T-Rivet + Outer Surface-Tension Arch (σ) ---
      ctx.save();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.4;
      for (const dir of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(cx + dir * (coreHWAtUfEnd + 0.5), ufEndY + 1);
        ctx.lineTo(cx + dir * (coreWaistHW + 0.5), feltEndY - 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // Brass T-rivet
      const rivetOuterHW = coreWaistHW + (shoulderHW - coreWaistHW) * 0.24;
      ctx.save();
      ctx.fillStyle = '#eab308';
      ctx.strokeStyle = '#422006';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(cx - rivetOuterHW, rivetY - 1.7, rivetOuterHW * 2, 3.4, 1.2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Outer Surface-Tension Membrane Arc (σ)
      const outerArc = new Path2D();
      outerArc.moveTo(cx - lowX3, lowY3);
      outerArc.bezierCurveTo(cx - lowX2, lowY2, cx - lowX1, lowY1, cx - shoulderHW, shoulderY);
      outerArc.bezierCurveTo(cx - shoulderHW, shoulderY - topSpan * 0.53, cx - crownCtrlX, crownTopY, cx, crownTopY);
      outerArc.bezierCurveTo(cx + crownCtrlX, crownTopY, cx + shoulderHW, shoulderY - topSpan * 0.53, cx + shoulderHW, shoulderY);
      outerArc.bezierCurveTo(cx + lowX1, lowY1, cx + lowX2, lowY2, cx + lowX3, lowY3);

      ctx.save();
      const archBroken = st.isAlert;
      ctx.strokeStyle = archBroken ? '#ef4444' : '#2ecc71';
      ctx.lineWidth = archBroken ? 2.6 : 3.1;
      if (archBroken) ctx.setLineDash([6, 4]);
      ctx.shadowColor = archBroken ? 'rgba(239,68,68,0.65)' : 'rgba(46,204,113,0.55)';
      ctx.shadowBlur = 9;
      ctx.stroke(outerArc);
      ctx.restore();

      // --- 5. Kruse's 3 Clock-Face Reference Lines & Hour Labels ---
      ctx.save();
      // 5a) Vertical 12:00 Central Energy Axis
      ctx.strokeStyle = 'rgba(230, 200, 130, 0.58)';
      ctx.lineWidth = 1.25;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, stringY + 5);
      ctx.lineTo(cx, woodBotY - 2);
      ctx.stroke();

      // 5b) Horizontal 9:00 - 3:00 Widest Cheek Axis (Clock Pivot)
      const axisSpanX = shoulderHW + 38;
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.62)';
      ctx.beginPath();
      ctx.moveTo(cx - axisSpanX, shoulderY);
      ctx.lineTo(cx + axisSpanX, shoulderY);
      ctx.stroke();

      // 5c) Upper Horizontal Reference Line at Top Edge of Underfelt (ufTipY)
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.55)';
      ctx.beginPath();
      ctx.moveTo(cx - shoulderHW * 0.92, ufTipY);
      ctx.lineTo(cx + shoulderHW * 0.92, ufTipY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Clock Pivot Dot at (cx, shoulderY)
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(cx, shoulderY, 3.6, 0, Math.PI * 2);
      ctx.fill();

      // Precompute External Needle Holder Segment so right-side clock labels stay 100% clear
      const zm = ZONE_META[this.zone];
      const needleDeg = this.zone === 'blue' ? 74 : (zm.angMinDeg + zm.angMaxDeg) * 0.5;
      const midRad = needleDeg * Math.PI / 180;
      const isTop = (this.zone === 'purple' || this.zone === 'red');
      const nPt = isTop ? { x: 0, y: crownTopY, r: shoulderY - crownTopY } : evalOuterHalf(midRad);
      const contactX = isTop ? cx : cx + nPt.x;
      const contactY = isTop ? crownTopY : nPt.y;

      let outX, outY;
      if (isTop) {
        outX = this.tech === 'wrong' ? -0.78 : 0.0;
        outY = this.tech === 'wrong' ? -0.62 : -1.0;
      } else if (this.tech === 'wrong') {
        outX = 0.38;
        outY = -0.92;
      } else {
        const vx = contactX - cx;
        const vy = contactY - (this.zone === 'blue' ? shoulderY - 6 : shoulderY);
        const vl = Math.max(1, Math.hypot(vx, vy));
        outX = vx / vl;
        outY = vy / vl;
      }

      const retractPx = this.tech === 'raw' ? 11 : (1.5 + (1 - pulse) * 6.5);
      const tipBaseX = contactX + outX * retractPx;
      const tipBaseY = contactY + outY * retractPx;
      const needleLen = isTop ? 16 : 20;
      const handleLen = isTop ? 22 : 32;
      const hx0 = tipBaseX + outX * needleLen;
      const hy0 = tipBaseY + outY * needleLen;
      const hx1 = hx0 + outX * handleLen;
      const hy1 = hy0 + outY * handleLen;

      // Clock Hour Ticks around the outer contour (9:00, 10:00, 11:00, 1:00, 2:00, 3:00)
      const clockTicks = [
        { lbl: '9:00', deg: -90 },
        { lbl: '10:00', deg: -61 },
        { lbl: '11:00', deg: -34 },
        { lbl: '1:00', deg: 34 },
        { lbl: '2:00', deg: 61 },
        { lbl: '3:00', deg: 90 }
      ];
      ctx.font = '700 12.1px JetBrains Mono, monospace';
      for (const tk of clockTicks) {
        const rad = Math.abs(tk.deg) * Math.PI / 180;
        const pt = evalOuterHalf(rad);
        const sgn = Math.sign(tk.deg);
        const ox = cx + sgn * (pt.x + (Math.abs(tk.deg) === 90 ? 18 : 15));
        const oy = pt.y + (tk.deg === 90 ? 15 : (tk.deg === -90 ? -8 : -4));

        // Skip drawing right-side label if needle handle or chuck passes right over it
        if (sgn > 0) {
          const dMid = Math.hypot((ox + 16) - (tipBaseX + hx1) * 0.5, (oy - 4) - (tipBaseY + hy1) * 0.5);
          const dEnd = Math.hypot((ox + 16) - hx1, (oy - 4) - hy1);
          if (dMid < 26 || dEnd < 26) continue;
        }
        ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
        ctx.textAlign = sgn < 0 ? 'right' : 'left';
        ctx.fillText(tk.lbl, ox, oy);
      }
      ctx.restore();

      // --- 6. Animated External Voicing Needle Holder (Right Side or Top Crown) ---
      {
        const perpX = -outY;
        const perpY = outX;

        ctx.save();
        // Steel needles
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.65;
        for (let ni = 0; ni < zm.needles; ni++) {
          const off = (ni - (zm.needles - 1) / 2) * 4.2;
          ctx.beginPath();
          ctx.moveTo(tipBaseX + perpX * off, tipBaseY + perpY * off);
          ctx.lineTo(tipBaseX + perpX * off + outX * needleLen, tipBaseY + perpY * off + outY * needleLen);
          ctx.stroke();
        }

        // Brass chuck + hardwood handle
        ctx.strokeStyle = st.isAlert ? '#f87171' : '#eab308';
        ctx.lineWidth = 7.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(hx0, hy0);
        ctx.lineTo(hx0 + outX * 7.5, hy0 + outY * 7.5);
        ctx.stroke();

        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 9.0;
        ctx.beginPath();
        ctx.moveTo(hx0 + outX * 7.5, hy0 + outY * 7.5);
        ctx.lineTo(hx1, hy1);
        ctx.stroke();

        // 90° Right-Angle Badge next to needle entry when ideal!
        if (this.tech === 'ideal' && !st.isAlert) {
          const bx = isTop ? (cx + 22) : (hx1 + 12);
          const by = isTop ? Math.max(18, crownTopY - 26) : Math.max(24, Math.min(h - 32, hy1));
          ctx.font = '700 12.2px JetBrains Mono, monospace';
          const bTxt = '90° ✓';
          const bw = ctx.measureText(bTxt).width + 13;
          ctx.fillStyle = 'rgba(16, 46, 34, 0.94)';
          ctx.strokeStyle = '#4ade80';
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.roundRect(bx, by - 11, bw, 20, 5.5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#bbf7d0';
          ctx.textAlign = 'left';
          ctx.fillText(bTxt, bx + 6.5, by + 3.5);
        }
        ctx.restore();
      }

      // --- 7. Crisp Left & Right Diagnostic Callouts (No Clipping) ---
      ctx.save();
      const padX = 12;

      // Top-Left: Underfelt reference label
      ctx.font = '600 12.5px Roboto, sans-serif';
      ctx.fillStyle = '#f9a8d4';
      ctx.textAlign = 'left';
      ctx.fillText(d.cvAxisUf, padX, ufTipY - 5);
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.42)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padX + ctx.measureText(d.cvAxisUf).width + 6, ufTipY - 8);
      ctx.lineTo(cx - shoulderHW * 0.90, ufTipY);
      ctx.stroke();

      // Mid-Left: 9:00 Widest Cheek label
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText(d.cvAxisCheekL, padX, shoulderY + 17);

      // Bottom-Left: Glue + T-Rivet label
      ctx.fillStyle = '#fde68a';
      ctx.fillText(d.cvGlueRivet, padX, rivetY + 4);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.40)';
      ctx.beginPath();
      ctx.moveTo(padX + ctx.measureText(d.cvGlueRivet).width + 6, rivetY);
      ctx.lineTo(cx - rivetOuterHW - 4, rivetY);
      ctx.stroke();

      // Bottom-Right: Click hint pill
      ctx.font = '600 12.1px Roboto, sans-serif';
      const hintTxt = `🖱 ${d.cvClickHint}`;
      const hw = ctx.measureText(hintTxt).width + 14;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.86)';
      ctx.strokeStyle = 'rgba(200, 163, 86, 0.42)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(w - hw - 10, h - 28, hw, 20.5, 5.5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'rgba(230, 200, 130, 0.94)';
      ctx.textAlign = 'right';
      ctx.fillText(hintTxt, w - 17, h - 13.5);

      // Contextual Status Banner at Bottom-Left
      let statusBanner = '';
      let bannerBg = 'rgba(14, 36, 28, 0.92)';
      let bannerBorder = '#4ade80';
      let bannerTextCol = '#bbf7d0';

      if (this.tech === 'raw') {
        statusBanner = d.cvRawHint;
        bannerBg = 'rgba(15, 23, 42, 0.92)';
        bannerBorder = '#94a3b8';
        bannerTextCol = '#e2e8f0';
      } else if (this.zone === 'red') {
        statusBanner = d.cvTabooWarn;
        bannerBg = 'rgba(69, 10, 10, 0.94)';
        bannerBorder = '#f87171';
        bannerTextCol = '#fecaca';
      } else if (this.tech === 'wrong') {
        statusBanner = d.cvWrongWarn;
        bannerBg = 'rgba(69, 10, 10, 0.94)';
        bannerBorder = '#f87171';
        bannerTextCol = '#fecaca';
      } else if (this.zone === 'blue') {
        statusBanner = d.cvTransferUp;
        bannerBg = 'rgba(12, 34, 54, 0.92)';
        bannerBorder = '#38bdf8';
        bannerTextCol = '#bae6fd';
      } else if (this.zone === 'purple') {
        statusBanner = d.cvBetweenGrooves;
        bannerBg = 'rgba(46, 16, 101, 0.92)';
        bannerBorder = '#c084fc';
        bannerTextCol = '#f3e8ff';
      }

      if (statusBanner) {
        ctx.font = '700 12.6px Roboto, sans-serif';
        const sw = Math.min(w * 0.46, ctx.measureText(statusBanner).width + 16);
        const sx = 10;
        const sy = h - 29;
        ctx.fillStyle = bannerBg;
        ctx.strokeStyle = bannerBorder;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, 21.5, 5.5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = bannerTextCol;
        ctx.textAlign = 'left';
        ctx.fillText(statusBanner, sx + 8, sy + 15, sw - 14);
      }

      ctx.restore();
    }

    drawEffectCanvas(st) {
      const canvas = document.getElementById('vzn-canvas-effect');
      const setup = this.setupCanvas(canvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const d = this.dict();

      ctx.clearRect(0, 0, w, h);

      if (this.chartMode === 'dyn') {
        // --- MODE 2: Dynamic Response Profile (pp, p, mf, f, ff) Before vs. After ---
        const padL = 44, padR = 18, padT = 30, padB = 30;
        const pw = w - padL - padR;
        const ph = h - padT - padB;

        ctx.save();
        ctx.font = '700 12.9px Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.90)';
        ctx.textAlign = 'left';
        ctx.fillText(d.dynTitle, padL, 18);

        // Legend on top right
        ctx.font = '600 12.1px Roboto, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = st.isAlert ? '#f87171' : st.zm.color;
        ctx.fillText(`■ ${d.dynAfter}`, w - padR, 18);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
        ctx.fillText(`□ ${d.dynBefore}`, w - padR - ctx.measureText(`■ ${d.dynAfter}`).width - 14, 18);

        // Grid lines (0%, 50%, 100%)
        ctx.font = '600 11.6px JetBrains Mono, monospace';
        for (const pct of [0, 50, 100]) {
          const gy = padT + ph * (1 - pct / 100);
          ctx.strokeStyle = 'rgba(255,255,255,0.09)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(padL, gy);
          ctx.lineTo(w - padR, gy);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.62)';
          ctx.textAlign = 'right';
          ctx.fillText(`${pct}%`, padL - 7, gy + 4);
        }

        const slotW = pw / 5;
        for (let i = 0; i < 5; i++) {
          const cxBar = padL + slotW * (i + 0.5);
          const bw = Math.min(34, slotW * 0.30);

          const vBef = st.dynBefore[i];
          const vAft = st.dynAfter[i];
          const hBef = (vBef / 100) * ph;
          const hAft = (vAft / 100) * ph;

          // Before bar
          ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.62)';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.roundRect(cxBar - bw - 2, padT + ph - hBef, bw, hBef, [4, 4, 0, 0]);
          ctx.fill();
          ctx.stroke();

          // After bar
          const barCol = st.isAlert ? '#ef4444' : st.zm.color;
          ctx.fillStyle = barCol;
          ctx.beginPath();
          ctx.roundRect(cxBar + 2, padT + ph - hAft, bw, hAft, [4, 4, 0, 0]);
          ctx.fill();

          // Value label on After bar
          ctx.font = '700 11.8px JetBrains Mono, monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(`${vAft}%`, cxBar + 2 + bw / 2, Math.max(padT + 10, padT + ph - hAft - 4));

          // X-axis label
          ctx.font = '700 12.5px Roboto, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.92)';
          ctx.fillText(d.dynLabels[i], cxBar, h - 8);
        }
        ctx.restore();
        return;
      }

      // --- MODE 1 (Default): Partial-Tone ΔdB Shift Chart (H1..H12) ---
      const padL = 52, padR = 14, padT = 27, padB = 27;
      const pw = w - padL - padR;
      const ph = h - padT - padB;
      const maxDb = 6.0;
      const minDb = -10.0;
      const rangeDb = maxDb - minDb;
      const zeroY = padT + (maxDb / rangeDb) * ph;

      // 3 Spectral Zone Bands (H1-H4, H5-H8, H9-H12)
      const bandCols = [
        { s: 0, e: 4, bg: 'rgba(56, 189, 248, 0.06)', col: '#7dd3fc', lbl: d.specZone1 },
        { s: 4, e: 8, bg: 'rgba(46, 204, 113, 0.06)', col: '#86efac', lbl: d.specZone2 },
        { s: 8, e: 12, bg: 'rgba(251, 146, 60, 0.06)', col: '#fdba74', lbl: d.specZone3 }
      ];
      ctx.save();
      for (const b of bandCols) {
        const bx = padL + (b.s / 12) * pw;
        const bw = ((b.e - b.s) / 12) * pw;
        ctx.fillStyle = b.bg;
        ctx.fillRect(bx, padT, bw, ph);
        ctx.font = '700 12.0px Roboto, sans-serif';
        ctx.fillStyle = b.col;
        ctx.textAlign = 'center';
        ctx.fillText(b.lbl, bx + bw / 2, 16, bw - 8);
      }

      // Horizontal dB gridlines (+4, 0, -4, -8 dB)
      ctx.font = '600 11.6px JetBrains Mono, monospace';
      for (const gv of [4, 0, -4, -8]) {
        const gy = padT + ((maxDb - gv) / rangeDb) * ph;
        ctx.strokeStyle = gv === 0 ? 'rgba(230, 200, 130, 0.65)' : 'rgba(255,255,255,0.09)';
        ctx.lineWidth = gv === 0 ? 1.5 : 1.0;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(w - padR, gy);
        ctx.stroke();

        ctx.fillStyle = gv === 0 ? '#fde68a' : 'rgba(255,255,255,0.65)';
        ctx.textAlign = 'right';
        ctx.fillText(`${gv > 0 ? '+' : ''}${gv} dB`, padL - 7, gy + 4);
      }

      // Draw H1..H12 ΔdB Bars
      const slotW = pw / 12;
      const barW = Math.min(34, slotW * 0.62);

      for (let i = 0; i < 12; i++) {
        const val = st.deltas[i];
        const cxBar = padL + slotW * (i + 0.5);
        const valY = padT + ((maxDb - val) / rangeDb) * ph;
        const topY = Math.min(zeroY, valY);
        const barH = Math.max(2.5, Math.abs(valY - zeroY));

        let fillCol;
        if (Math.abs(val) < 0.08) {
          fillCol = 'rgba(148, 163, 184, 0.55)';
        } else if (st.isAlert) {
          fillCol = '#ef4444';
        } else if (val > 0) {
          fillCol = i < 4 ? '#38bdf8' : '#2ecc71';
        } else {
          fillCol = this.zone === 'purple' ? '#c084fc' : '#fb923c';
        }

        ctx.fillStyle = fillCol;
        ctx.beginPath();
        ctx.roundRect(cxBar - barW / 2, topY, barW, barH, 4);
        ctx.fill();

        // Numeric ΔdB label above/below bar
        if (Math.abs(val) >= 0.15) {
          ctx.font = '700 11.4px JetBrains Mono, monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          const lblTxt = `${val > 0 ? '+' : '−'}${this.fmt(Math.abs(val), 1)}`;
          const ly = val >= 0 ? Math.max(padT + 10, topY - 4) : Math.min(padT + ph - 3, topY + barH + 11);
          ctx.fillText(lblTxt, cxBar, ly);
        }

        // H1..H12 X-axis label
        ctx.font = '700 12.1px JetBrains Mono, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.90)';
        ctx.textAlign = 'center';
        ctx.fillText(`H${i + 1}`, cxBar, h - 8);
      }
      ctx.restore();
    }

    hitTestWedge(clientX, clientY) {
      const canvas = document.getElementById('vzn-canvas-head');
      if (!canvas || !this.cachedGeom) return null;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const { cx, shoulderY, crownTopY, ufTipY, feltEndY, shoulderHW } = this.cachedGeom;

      if (y < crownTopY - 12 || y > feltEndY + 8 || Math.abs(x - cx) > shoulderHW + 22) {
        return null;
      }

      const dx = Math.abs(x - cx);
      const dy = shoulderY - y; // positive above 9:00-3:00 line
      const deg = Math.atan2(dx, dy) * 180 / Math.PI;

      if (deg <= ZONE_META.purple.angMaxDeg) {
        const surfaceSplitY = crownTopY + Math.max(12, (ufTipY - crownTopY) * 0.26);
        return y <= surfaceSplitY ? 'purple' : 'red';
      }
      if (deg <= ZONE_META.orange.angMaxDeg) return 'orange';
      if (deg <= ZONE_META.green.angMaxDeg) return 'green';
      if (deg <= 118) return 'blue';
      return null;
    }

    updateUI() {
      const slideEl = document.querySelector('.slide.vzn-slide');
      if (!slideEl) return;

      const d = this.dict();
      const st = this.computeState();
      const zd = d.zones[this.zone];

      // Toolbar pills
      ZONE_KEYS.forEach((zk) => {
        const pill = document.getElementById(`vzn-pill-${zk}`);
        if (pill) {
          pill.classList.toggle('active', this.zone === zk);
          const mapKey = 'pill' + zk.charAt(0).toUpperCase() + zk.slice(1);
          if (d[mapKey]) pill.textContent = d[mapKey];
        }
      });

      const loopBtn = document.getElementById('vzn-btn-loop');
      if (loopBtn) {
        loopBtn.classList.toggle('active', this.autoPulse);
        loopBtn.textContent = this.autoPulse ? d.loopOn : d.loopOff;
      }
      const strikeLbl = document.getElementById('vzn-lbl-strike');
      if (strikeLbl) strikeLbl.textContent = d.strikeBtn;

      const btnDelta = document.getElementById('vzn-spec-delta');
      const btnDyn = document.getElementById('vzn-spec-dyn');
      if (btnDelta) {
        btnDelta.classList.toggle('active', this.chartMode === 'delta');
        btnDelta.textContent = d.specDelta;
      }
      if (btnDyn) {
        btnDyn.classList.toggle('active', this.chartMode === 'dyn');
        btnDyn.textContent = d.specDyn;
      }

      // 3-Stage Technique Toggle
      const techGrp = document.getElementById('vzn-grp-tech');
      if (techGrp) {
        techGrp.querySelectorAll('.hsp-step-btn').forEach((btn) => {
          const active = btn.getAttribute('data-tech') === this.tech;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }
      const techVal = document.getElementById('vzn-val-tech');
      if (techVal) {
        if (this.tech === 'raw') {
          techVal.textContent = d.techRawVal;
          techVal.style.color = '#cbd5e1';
        } else if (this.zone === 'red') {
          techVal.textContent = d.techRedVal;
          techVal.style.color = '#f87171';
        } else if (this.tech === 'wrong') {
          techVal.textContent = d.techWrongVal;
          techVal.style.color = '#f87171';
        } else {
          techVal.textContent = d.techIdealVal;
          techVal.style.color = '#4ade80';
        }
      }

      // Right-column 5 Zone Rows active highlight
      slideEl.querySelectorAll('.vzn-zone-item').forEach((row) => {
        const active = row.getAttribute('data-zone') === this.zone;
        row.classList.toggle('active', active);
        row.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      // Readout strip
      const roZone = document.getElementById('vzn-ro-zone');
      const roDepth = document.getElementById('vzn-ro-depth');
      const roEffect = document.getElementById('vzn-ro-effect');
      if (roZone) {
        roZone.textContent = zd.roZone;
        roZone.style.color = st.isAlert ? '#fca5a5' : st.zm.stroke;
      }
      if (roDepth) {
        roDepth.textContent = this.tech === 'raw' ? d.rawOverride.roDepth : (this.tech === 'wrong' && this.zone !== 'red' ? d.wrongOverride.roDepth : zd.roDepth);
      }
      if (roEffect) {
        roEffect.textContent = this.tech === 'raw' ? d.rawOverride.roEffect : (this.tech === 'wrong' && this.zone !== 'red' ? d.wrongOverride.roEffect : zd.roEffect);
        roEffect.style.color = st.isAlert ? '#fca5a5' : '#e6c882';
      }

      // 3 KPIs
      const kpi1Num = document.getElementById('vzn-kpi1-num');
      const kpi1Sub = document.getElementById('vzn-kpi1-sub');
      const kpi2Num = document.getElementById('vzn-kpi2-num');
      const kpi2Sub = document.getElementById('vzn-kpi2-sub');
      const kpi3Num = document.getElementById('vzn-kpi3-num');
      const kpi3Sub = document.getElementById('vzn-kpi3-sub');

      if (kpi1Num) {
        kpi1Num.textContent = this.tech === 'raw' ? '0 mm' : zd.kpi1Num;
        kpi1Num.style.color = this.zone === 'red' && this.tech !== 'raw' ? '#f87171' : '#ffffff';
      }
      if (kpi1Sub) kpi1Sub.textContent = zd.kpi1Sub;

      if (kpi2Num) {
        kpi2Num.textContent = `${st.sigmaPct} % · ${this.fmt(st.tauMs, 2)} ms`;
        kpi2Num.style.color = st.isAlert ? '#f87171' : '#2ecc71';
      }
      if (kpi2Sub) {
        kpi2Sub.textContent = this.tech === 'raw'
          ? d.rawOverride.kpi2Sub
          : (this.tech === 'wrong' && this.zone !== 'red' ? d.wrongOverride.kpi2Sub : zd.kpi2Sub);
      }

      if (kpi3Num) {
        kpi3Num.textContent = this.tech === 'raw' ? '0,0 dB' : (this.tech === 'wrong' && this.zone !== 'red' ? '−4,5 dB ✕' : zd.kpi3Num);
        kpi3Num.style.color = st.isAlert ? '#f87171' : (this.tech === 'raw' ? '#cbd5e1' : st.zm.kpiCol);
      }
      if (kpi3Sub) {
        kpi3Sub.textContent = this.tech === 'raw'
          ? d.rawOverride.roEffect.split('·')[1]?.trim() || zd.kpi3Sub
          : (this.tech === 'wrong' && this.zone !== 'red' ? d.wrongOverride.kpi2Sub : zd.kpi3Sub);
      }

      // Explanation Box
      const expBox = document.getElementById('vzn-exp-box');
      const expBadge = document.getElementById('vzn-exp-badge');
      const expTitle = document.getElementById('vzn-exp-title');
      const expBody = document.getElementById('vzn-exp-body');
      const expBullet = document.getElementById('vzn-exp-bullet');

      const src = this.tech === 'raw'
        ? d.rawOverride
        : (this.tech === 'wrong' && this.zone !== 'red' ? d.wrongOverride : zd);

      if (expBox) expBox.classList.toggle('blocked-alert', st.isAlert);
      if (expBadge) {
        expBadge.classList.toggle('red-alert', st.isAlert);
        expBadge.classList.toggle('gold', !st.isAlert);
        expBadge.textContent = src.badge;
      }
      if (expTitle) expTitle.textContent = src.title;
      if (expBody) expBody.innerHTML = src.body;
      if (expBullet) expBullet.innerHTML = src.bullet;

      const nowMs = performance.now();
      this.drawHeadCanvas(st, nowMs);
      this.drawEffectCanvas(st);
    }

    startAnimLoop() {
      if (this.animId) cancelAnimationFrame(this.animId);
      const tick = (nowMs) => {
        if (!this.isSlideActive()) {
          this.animId = null;
          return;
        }
        const st = this.computeState();
        this.drawHeadCanvas(st, nowMs);
        if (this.autoPulse || this.strikeFlash > 0.01) {
          this.strikeFlash *= 0.92;
          this.animId = requestAnimationFrame(tick);
        } else {
          this.animId = null;
        }
      };
      this.animId = requestAnimationFrame(tick);
    }

    selectZone(zk, play = true) {
      if (!ZONE_META[zk]) return;
      this.zone = zk;
      // When clicking a zone in 'raw' state, switch automatically to 'ideal' so the stitch effect is immediately visible!
      if (this.tech === 'raw') this.tech = 'ideal';
      this.updateUI();
      this.triggerStrike(play);
    }

    init() {
      const slideEl = document.querySelector('.slide.vzn-slide');
      if (!slideEl) return;

      // Toolbar quick pills
      ZONE_KEYS.forEach((zk) => {
        const pill = document.getElementById(`vzn-pill-${zk}`);
        if (pill) pill.addEventListener('click', () => this.selectZone(zk, true));
      });

      // Right-column zone rows
      slideEl.querySelectorAll('.vzn-zone-item').forEach((row) => {
        row.addEventListener('click', () => {
          const zk = row.getAttribute('data-zone');
          if (zk) this.selectZone(zk, true);
        });
        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const zk = row.getAttribute('data-zone');
            if (zk) this.selectZone(zk, true);
          }
        });
      });

      // 3-Stage Technique Toggle
      const techGrp = document.getElementById('vzn-grp-tech');
      if (techGrp) {
        techGrp.querySelectorAll('.hsp-step-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const t = btn.getAttribute('data-tech');
            if (t) {
              this.tech = t;
              this.updateUI();
              this.triggerStrike(true);
            }
          });
        });
      }

      // Loop & Strike buttons
      const loopBtn = document.getElementById('vzn-btn-loop');
      if (loopBtn) {
        loopBtn.addEventListener('click', () => {
          this.autoPulse = !this.autoPulse;
          this.updateUI();
          if (this.autoPulse) this.startAnimLoop();
        });
      }
      const strikeBtn = document.getElementById('vzn-btn-strike');
      if (strikeBtn) strikeBtn.addEventListener('click', () => this.triggerStrike(true));

      // Chart view toggle
      const btnDelta = document.getElementById('vzn-spec-delta');
      const btnDyn = document.getElementById('vzn-spec-dyn');
      if (btnDelta) btnDelta.addEventListener('click', () => { this.chartMode = 'delta'; this.updateUI(); });
      if (btnDyn) btnDyn.addEventListener('click', () => { this.chartMode = 'dyn'; this.updateUI(); });

      // Direct Canvas Wedge Click & Pointer Hover
      const headCanvas = document.getElementById('vzn-canvas-head');
      if (headCanvas) {
        headCanvas.addEventListener('mousemove', (e) => {
          const hz = this.hitTestWedge(e.clientX, e.clientY);
          if (hz !== this.hoverZone) {
            this.hoverZone = hz;
            headCanvas.style.cursor = hz ? 'pointer' : 'default';
            if (!this.autoPulse) {
              const st = this.computeState();
              this.drawHeadCanvas(st, performance.now());
            }
          }
        });
        headCanvas.addEventListener('mouseleave', () => {
          this.hoverZone = null;
          if (!this.autoPulse) {
            const st = this.computeState();
            this.drawHeadCanvas(st, performance.now());
          }
        });
        headCanvas.addEventListener('click', (e) => {
          const hz = this.hitTestWedge(e.clientX, e.clientY);
          if (hz) {
            this.selectZone(hz, true);
          } else {
            this.triggerStrike(true);
          }
        });
      }

      const effectCanvas = document.getElementById('vzn-canvas-effect');
      if (effectCanvas) {
        effectCanvas.addEventListener('click', () => this.triggerStrike(true));
      }

      // Active-slide lifecycle observer
      const obs = new MutationObserver(() => {
        if (this.isSlideActive()) {
          this.lang = document.documentElement.lang || this.lang || 'de';
          this.startMs = performance.now();
          requestAnimationFrame(() => {
            this.updateUI();
            if (this.autoPulse) this.startAnimLoop();
          });
          setTimeout(() => {
            this.updateUI();
            if (this.autoPulse) this.startAnimLoop();
          }, 50);
        } else if (this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = null;
        }
      });
      obs.observe(slideEl, { attributes: true, attributeFilter: ['class'] });

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (this.isSlideActive()) this.updateUI();
        });
        slideEl.querySelectorAll('.hsp-canvas-wrap').forEach((w) => ro.observe(w));
      }

      window.addEventListener('resize', () => {
        if (this.isSlideActive()) this.updateUI();
      }, { passive: true });

      window.addEventListener('languageChanged', (e) => {
        this.lang = (e.detail && e.detail.lang) ? e.detail.lang : (document.documentElement.lang || 'de');
        this.updateUI();
      });

      this.lang = document.documentElement.lang || 'de';
      this.updateUI();
      if (this.isSlideActive() && this.autoPulse) this.startAnimLoop();
    }
  }

  window.voicingZones = new VoicingZonesController();
})();
