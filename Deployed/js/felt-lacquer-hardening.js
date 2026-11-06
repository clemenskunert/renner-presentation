/**
 * Louis Renner Masterclass Presentation
 * Slide 32 (Chapter 5): Interaktives Tränken (Lackbasis), Zeit-Nachverdichtung & Gewichtssteuerung
 *
 * Acoustic & Mechanical Principles (Clemens Kunert / Louis Renner Meuselwitz):
 * 1. Bereich der Niete (T-Vernietung):
 *    - Verstärkt das Fundament des Hammerkopfs (H1–H4 ↑, Korpusstabilität).
 *    - Kann abhängig vom verwendeten Lack auch die Filzspannung heben.
 * 2. Seitlich appliziert oberhalb des Hammerkerns:
 *    - Gezielt/sparsam: Verstärkt die hohen Teiltöne (H7–H12 ↑), Flankenfeder bleibt frei.
 *    - Zu viel Lack: Verklebt die Verbindung zur Flanke -> komplexe Federfunktion wird gestört!
 * 3. Direkt auf dem Scheitel (12:00 Uhr):
 *    - Unbedingt vermeiden! Erzeugt eine glasige, nasale Härte und kann den Hammerkopf dauerhaft schädigen.
 * 4. Zeitfaktor (Nachverdichtung):
 *    - Bei ALLEN Applikationen oberhalb des Hammerkerns verdichtet sich der Bereich über die Spielzeit weiter!
 * 5. Grundtönigkeit & Durchschlag steigern (Masse-Prinzip statt Übertränken):
 *    - Mitte bis Bass: Hammerkopfgewicht steigern (+m -> sattere Grundtönigkeit & mehr Energieeintrag).
 *    - Richtung Diskant: Hammerkopfgewicht reduzieren (-m -> schnellere Beschleunigung & kürzere Kontaktzeit für klaren Durchschlag).
 */

(function () {
  'use strict';

  const ZONES = ['rivet', 'lateral_ok', 'lateral_over', 'crown'];

  const ZONE_CONFIG = {
    rivet: {
      aboveCore: false,
      color: '#eab308',
      stroke: '#fde047',
      springFresh: 98,
      springAged: 96,
      // H1..H12 dB shifts relative to untreated exhausted head
      deltasFresh: [3.4, 3.1, 2.6, 2.0, 1.3, 0.8, 0.4, 0.2, 0.1, 0.0, 0.0, 0.0],
      deltasAged:  [3.5, 3.2, 2.7, 2.1, 1.4, 0.9, 0.5, 0.3, 0.1, 0.0, 0.0, 0.0],
      isDanger: false,
      isWarning: false
    },
    lateral_ok: {
      aboveCore: true,
      color: '#38bdf8',
      stroke: '#7dd3fc',
      springFresh: 92,
      springAged: 74,
      deltasFresh: [0.3, 0.5, 0.8, 1.2, 1.8, 2.5, 3.2, 3.6, 3.8, 3.7, 3.5, 3.3],
      deltasAged:  [-0.4, -0.2, 0.3, 0.9, 2.1, 3.1, 4.1, 4.6, 4.9, 4.8, 4.5, 4.2],
      isDanger: false,
      isWarning: false
    },
    lateral_over: {
      aboveCore: true,
      color: '#f97316',
      stroke: '#fdba74',
      springFresh: 38,
      springAged: 22,
      deltasFresh: [-2.8, -2.4, -1.6, -0.5, 1.4, 2.9, 3.4, 3.1, 2.2, 1.2, 0.4, -0.3],
      deltasAged:  [-3.8, -3.3, -2.2, -0.8, 2.0, 3.8, 4.5, 4.1, 3.0, 1.8, 0.8, 0.0],
      isDanger: true,
      isWarning: true
    },
    crown: {
      aboveCore: true,
      color: '#ef4444',
      stroke: '#fca5a5',
      springFresh: 28,
      springAged: 15,
      // Nasal-glassy spike in H5..H10 + hollow fundamental loss
      deltasFresh: [-3.6, -3.0, -1.8, 0.6, 3.8, 5.2, 5.6, 5.1, 4.4, 3.8, 3.1, 2.5],
      deltasAged:  [-4.6, -3.9, -2.4, 0.9, 4.6, 6.1, 6.5, 6.0, 5.2, 4.5, 3.8, 3.1],
      isDanger: true,
      isWarning: false
    }
  };

  const I18N = {
    de: {
      cvString: 'Saite · Anschlag (12:00)',
      cvCrownLbl: 'Scheitel (12:00)',
      cvAboveCoreLbl: 'Oberhalb Hammerkern',
      cvFlankL: 'Flanke',
      cvFlankR: 'Flanke',
      cvCoreLbl: 'Hammerkern',
      cvRivetLbl: 'T-Niete',
      cvClickHint: 'Zone im Querschnitt anklicken',
      cvPipetteRivet: 'Lack an der Niete',
      cvPipetteLatOk: 'Sparsam von der Seite',
      cvPipetteLatOver: '✕ Zu viel Lack!',
      cvPipetteCrown: '✕ Direkt am Scheitel!',
      cvTensionLift: 'Spannung σ ↑ (lackabh.)',
      cvFoundationBoost: 'Fundament verstärkt',
      cvSpringFree: '✓ Flanke frei · Feder aktiv',
      cvFlankGlued: '✕ Flanke verklebt · Feder gestört!',
      cvCrownDamage: '✕ Glasig-nasal · Dauerschaden!',
      cvAgedTag: '⏱️ Nachverdichtet im Spielbetrieb!',
      specLow: 'H₁–H₄ Fundament',
      specMid: 'H₅–H₈ Präsenz / Nasal',
      specHigh: 'H₉–H₁₂ Hohe Teiltöne',
      specSpringLbl: (pct) => `Feder: ${pct} %`,
      timeBtnFresh: '⏱️ Frisch appliziert',
      timeBtnAged: '⏱️ Nachverdichtet (+Zeit)',
      zones: {
        rivet: {
          roZone: '🟡 Niete',
          roSpring: '✓ Feder frei · σ ↑',
          roEffect: 'H₁–H₄ +3,4 dB',
          kpi1Val: 'Fundament ↑',
          kpi1Sub: 'Stärkt Basis & Grundton',
          kpi2Val: 'Spannung ↑',
          kpi2Sub: 'Lackabhängig · Feder frei',
          kpi3Val: '✓ Unkritisch',
          kpi3Sub: 'Unterhalb Kern: stabil',
          badge: '✦ EMPFEHLUNG FÜR BASIS • BEREICH DER NIETE',
          title: 'Lack an der Niete stärkt das Fundament und hebt je nach Lack die Spannung',
          body: 'Im Schenkelbereich an der Niete versteift das Tränkmittel die Basis des Hammerkopfs und hebt abhängig vom Lack die Mantelspannung – ohne die Flankenfeder zu verkleben.',
          rule: '✓ <strong>Vorteil:</strong> Liegt unterhalb des Hammerkerns – die elastische Anschlagzone bleibt geschützt.'
        },
        lateral_ok: {
          roZone: '🟠 Seitlich',
          roSpring: (aged) => aged ? '⚠️ Verdichtet 74%' : '✓ Feder frei 92%',
          roEffect: (aged) => aged ? 'H₉–H₁₂ +4,9 dB' : 'H₉–H₁₂ +3,8 dB',
          kpi1Val: 'Hohe Teiltöne ↑',
          kpi1Sub: 'Gezielter Obertonschub',
          kpi2Val: (aged) => aged ? '74 % Reserve' : '✓ Feder intakt',
          kpi2Sub: (aged) => aged ? 'Straffer nach Spielzeit' : 'Flankenverbindung frei',
          kpi3Val: '⏱️ Verdichtet nach',
          kpi3Sub: 'Verdichtet über die Zeit',
          badge: '✦ OBERHALB HAMMERKERN • SEITLICHE DOSIERUNG',
          title: 'Seitlich oberhalb des Kerns verstärkt hohe Teiltöne – verdichtet aber nach!',
          body: 'Sparsam von der Seite oberhalb des Hammerkerns appliziert, stützt verdünnter Lack die obere Brücke und verstärkt die hohen Teiltöne (H₇–H₁₂), solange die Flanke frei federt.',
          rule: '⏱️ <strong>Zeitfaktor:</strong> Alle Applikationen oberhalb des Kerns verdichten sich über die Zeit weiter!'
        },
        lateral_over: {
          roZone: '⚠️ Zu viel',
          roSpring: '✕ Flanke verklebt',
          roEffect: 'H₁–H₄ −3,8 dB',
          kpi1Val: '✕ Eng & steif',
          kpi1Sub: 'Grundton bricht weg',
          kpi2Val: '✕ Feder gestört',
          kpi2Sub: 'Verbindung verklebt!',
          kpi3Val: '⚠️ Verhärtet weiter',
          kpi3Sub: 'Verhärtet über Spielzeit',
          badge: '⚠️ DOSIERFEHLER • ZU VIEL LACK VON DER SEITE',
          title: 'Überdosierung verklebt die Verbindung zur Flanke und stört die Federfunktion!',
          body: 'Bei zu viel Lack kriecht die Lösung aus der Zone oberhalb des Kerns bis in die Flanke. Die Wollfaserschichten verkleben – der Hammerkopf verliert seine komplexe Federwirkung.',
          rule: '✕ <strong>Folge:</strong> Gestörte Federfunktion, verlorene Dynamik und weitere Verhärtung über die Zeit!'
        },
        crown: {
          roZone: '🔴 Scheitel',
          roSpring: '✕ Dauerschaden!',
          roEffect: 'Nasal +6,0 dB',
          kpi1Val: '✕ Glasig-nasal',
          kpi1Sub: 'Scharfe Härte (H₅–H₉)',
          kpi2Val: '✕ Dauerschaden',
          kpi2Sub: 'Elastizität zerstört',
          kpi3Val: '✕ Irreversibel',
          kpi3Sub: 'Verdichtet beim Spielen',
          badge: '🚫 STRIKT VERMEIDEN • LACK DIREKT AUF DEM SCHEITEL',
          title: 'Lack direkt am Scheitel erzeugt glasige, nasale Härte und schädigt dauerhaft!',
          body: 'Tränkmittel direkt auf dem Anschlagspunkt (12:00 Uhr) bildet eine spröde Lackkruste in der Kontaktzone. Das Polster fällt aus und verdichtet sich mit jedem Schlag weiter.',
          rule: '🚫 <strong>Praxisregel:</strong> Scheitel niemals tränken – Gefahr dauerhafter Schädigung des Hammerkopfs!'
        }
      },
      weight: {
        bassTitle: 'Mitte bis Bass → Gewicht steigern (+m):',
        bassBody: 'Höhere Hammerkopfmasse überträgt mehr Energie in schwere Saiten und steigert Grundtönigkeit sowie kraftvollen Durchschlag.',
        trebleTitle: 'Richtung Diskant → Gewicht reduzieren (−m):',
        trebleBody: 'Geringere Masse beschleunigt schneller und verkürzt die Kontaktzeit an kurzen Saiten – für klaren, tragenden Durchschlag ohne Selbstbedämpfung.'
      }
    },

    en: {
      cvString: 'String · Strike (12:00)',
      cvCrownLbl: 'Crown (12:00)',
      cvAboveCoreLbl: 'Above Moulding',
      cvFlankL: 'Flank',
      cvFlankR: 'Flank',
      cvCoreLbl: 'Moulding',
      cvRivetLbl: 'T-Rivet',
      cvClickHint: 'Click any zone on cross-section',
      cvPipetteRivet: 'Lacquer at rivet zone',
      cvPipetteLatOk: 'Light lateral dose',
      cvPipetteLatOver: '✕ Excess lacquer!',
      cvPipetteCrown: '✕ Direct on crown!',
      cvTensionLift: 'Tension σ ↑ (lacquer-dep.)',
      cvFoundationBoost: 'Foundation reinforced',
      cvSpringFree: '✓ Flank free · Spring active',
      cvFlankGlued: '✕ Flank glued · Spring disrupted!',
      cvCrownDamage: '✕ Glassy-nasal · Permanent damage!',
      cvAgedTag: '⏱️ Compacts further over time!',
      specLow: 'H₁–H₄ Foundation',
      specMid: 'H₅–H₈ Presence / Nasal',
      specHigh: 'H₉–H₁₂ High Partials',
      specSpringLbl: (pct) => `Spring: ${pct}%`,
      timeBtnFresh: '⏱️ Freshly Applied',
      timeBtnAged: '⏱️ Compacted (+Time)',
      zones: {
        rivet: {
          roZone: '🟡 Rivet',
          roSpring: '✓ Spring free · σ ↑',
          roEffect: 'H₁–H₄ +3.4 dB',
          kpi1Val: 'Foundation ↑',
          kpi1Sub: 'Reinforces body & bass',
          kpi2Val: 'Tension ↑',
          kpi2Sub: 'Lacquer-dep. · Spring free',
          kpi3Val: '✓ Stable',
          kpi3Sub: 'Below moulding: stable',
          badge: '✦ FOUNDATION SUPPORT • RIVET AREA',
          title: 'Lacquer at the rivet reinforces the foundation and can lift felt tension',
          body: 'Applied in the rivet area, lacquer stiffens the lower hammer body and—depending on lacquer type—lifts felt tension while leaving flank elasticity untouched.',
          rule: '✓ <strong>Advantage:</strong> Located below the hammer moulding — the elastic impact arch stays protected.'
        },
        lateral_ok: {
          roZone: '🟠 Lateral',
          roSpring: (aged) => aged ? '⚠️ Compacted · 74%' : '✓ Flank free · 92%',
          roEffect: (aged) => aged ? 'H₉–H₁₂ +4.9 dB' : 'H₉–H₁₂ +3.8 dB',
          kpi1Val: 'High Partials ↑',
          kpi1Sub: 'Targeted harmonic boost',
          kpi2Val: (aged) => aged ? '74% Reserve' : '✓ Spring Intact',
          kpi2Sub: (aged) => aged ? 'Firmer after playing-in' : 'Flank link stays open',
          kpi3Val: '⏱️ Compacts!',
          kpi3Sub: 'Above moulding: densifies',
          badge: '✦ ABOVE HAMMER MOULDING • LATERAL APPLICATION',
          title: 'Lateral dosing above the moulding boosts high partials — and compacts over time!',
          body: 'Lightly applied from the sides above the hammer moulding, diluted lacquer reinforces the upper bridge to boost high partials (H₇–H₁₂) while keeping the outer flank free to flex.',
          rule: '⏱️ <strong>Time Factor:</strong> Every application above the hammer moulding compacts further over time during play — always leave a safety margin!'
        },
        lateral_over: {
          roZone: '⚠️ Excess',
          roSpring: '✕ Flank glued!',
          roEffect: 'H₁–H₄ −3.8 dB',
          kpi1Val: '✕ Stiff & Choked',
          kpi1Sub: 'Fundamental drops out',
          kpi2Val: '✕ Spring Blocked',
          kpi2Sub: 'Link to flank glued shut!',
          kpi3Val: '⚠️ Hardens More',
          kpi3Sub: 'Compaction worsens lock',
          badge: '⚠️ OVERDOSE ERROR • EXCESS LATERAL LACQUER',
          title: 'Too much lacquer glues the connection to the flank and disrupts spring action!',
          body: 'When over-applied above the hammer moulding, lacquer wicks outward into the flank and glues wool layers together — locking up the hammerhead’s complex spring mechanism.',
          rule: '✕ <strong>Result:</strong> Disrupted spring function, lost dynamic range, and progressive hardening over time!'
        },
        crown: {
          roZone: '🔴 Crown',
          roSpring: '✕ Permanent damage!',
          roEffect: 'Nasal +6.0 dB',
          kpi1Val: '✕ Glassy-Nasal',
          kpi1Sub: 'Harsh nasal glare (H₅–H₉)',
          kpi2Val: '✕ Crown Damaged',
          kpi2Sub: 'Micro-cushion destroyed',
          kpi3Val: '✕ Irreversible',
          kpi3Sub: 'Compacts harder in play',
          badge: '🚫 STRICTLY AVOID • LACQUER DIRECTLY ON CROWN',
          title: 'Lacquer on the crown creates glassy, nasal hardness and permanent damage!',
          body: 'Applying hardener directly to the 12:00 strike crown forms a brittle crust in the string contact zone, destroying surface elasticity while progressive strike compaction worsens the glare.',
          rule: '🚫 <strong>Workshop Rule:</strong> Avoid lacquer on the crown — risk of permanent hammerhead damage!'
        }
      },
      weight: {
        bassTitle: 'Middle to Bass → Increase Weight (+m):',
        bassBody: 'Higher hammerhead mass drives greater energy into heavy strings, boosting fundamental fullness and punch.',
        trebleTitle: 'Toward Treble → Reduce Weight (−m):',
        trebleBody: 'Lower mass accelerates faster and shortens contact time on short treble strings for clear, carrying projection.'
      }
    },

    ja: {
      cvString: '弦・打弦点 (12:00)',
      cvCrownLbl: 'クラウン頂点',
      cvAboveCoreLbl: 'ウッドコア上部',
      cvFlankL: 'フランク',
      cvFlankR: 'フランク',
      cvCoreLbl: 'ウッドコア',
      cvRivetLbl: 'リベット',
      cvClickHint: '断面図のゾーンをクリック',
      cvPipetteRivet: 'リベット周辺へ塗布',
      cvPipetteLatOk: '側面から少量塗布',
      cvPipetteLatOver: '✕ 塗布しすぎ！',
      cvPipetteCrown: '✕ クラウン直塗りは厳禁！',
      cvTensionLift: '張力 σ ↑（塗料依存）',
      cvFoundationBoost: '基音・土台を強化',
      cvSpringFree: '✓ フランク自由・弾性維持',
      cvFlankGlued: '✕ フランク固着・バネ機能阻害！',
      cvCrownDamage: '✕ ガラス質で鼻にかかった硬さ・損傷！',
      cvAgedTag: '⏱️ 経時でさらに圧縮・硬化！',
      specLow: 'H₁–H₄ 基音・土台',
      specMid: 'H₅–H₈ 鼻音域・中域',
      specHigh: 'H₉–H₁₂ 高次倍音',
      specSpringLbl: (pct) => `バネ: ${pct}%`,
      timeBtnFresh: '⏱️ 塗布直後',
      timeBtnAged: '⏱️ 経時変化（+圧縮）',
      zones: {
        rivet: {
          roZone: '🟡 リベット',
          roSpring: '✓ バネ自由・σ ↑',
          roEffect: 'H₁–H₄ +3.4 dB',
          kpi1Val: '土台・基音 ↑',
          kpi1Sub: '基礎とH₁–H₄を強化',
          kpi2Val: '張力 ↑',
          kpi2Sub: '塗料により張力も上昇',
          kpi3Val: '✓ 安定',
          kpi3Sub: 'コア下部：圧縮影響なし',
          badge: '✦ 土台の強化 • リベット周辺への塗布',
          title: 'リベット周辺の塗布は土台を強め、塗料によってはフェルト張力も高める',
          body: 'リベット周辺の脚部を補強するとハンマーの土台が安定して豊かな基音を支え、塗料によっては硬化収縮で張力も高まります。',
          rule: '✓ <strong>利点：</strong>ウッドコアより下部のため、打弦部の弾性アーチを安全に保てます。'
        },
        lateral_ok: {
          roZone: '🟠 側面適量',
          roSpring: (aged) => aged ? '⚠️ 経時圧縮・74%' : '✓ フランク自由・92%',
          roEffect: (aged) => aged ? 'H₉–H₁₂ +4.9 dB' : 'H₉–H₁₂ +3.8 dB',
          kpi1Val: '高次倍音 ↑',
          kpi1Sub: 'きらびやかな倍音を増強',
          kpi2Val: (aged) => aged ? '予備弾性 74%' : '✓ バネ機能維持',
          kpi2Sub: (aged) => aged ? '弾き込みでさらに締まる' : 'フランク連結部は自由',
          kpi3Val: '⏱️ 経時圧縮あり',
          kpi3Sub: 'コア上部は経時で締まる',
          badge: '✦ ウッドコア上部 • 側面からの適量塗布',
          title: 'コア上部への側面塗布は高次倍音を強めるが、経時でさらに圧縮される',
          body: 'ウッドコアより上の領域へ側面からごく少量塗布すると、フランクの弾性を残したまま高次倍音（H₇–H₁₂）を効果的に強められます。',
          rule: '⏱️ <strong>経時変化に注意：</strong>ウッドコアより上の塗布はすべて、演奏を重ねるうちにさらに圧縮・硬化するため控えめに行います。'
        },
        lateral_over: {
          roZone: '⚠️ 塗布過多',
          roSpring: '✕ フランク固着！',
          roEffect: 'H₁–H₄ −3.8 dB',
          kpi1Val: '✕ 硬直・詰まり',
          kpi1Sub: '基音が痩せ硬い打撃音に',
          kpi2Val: '✕ バネ機能阻害',
          kpi2Sub: 'フランク連結部が固着！',
          kpi3Val: '⚠️ さらに硬化',
          kpi3Sub: '経時圧縮で固着が進行',
          badge: '⚠️ 過量エラー • 側面からの塗布過多',
          title: '塗布しすぎるとフランクとの連結部が固着し、バネ機能が損なわれる！',
          body: 'ラッカーが多すぎるとコア上部からフランク側まで浸透して羊毛層を接着してしまい、ハンマー本来の複合バネ機能が働かなくなります。',
          rule: '✕ <strong>結果：</strong>バネ機能の阻害、ダイナミクスの喪失、さらに経時圧縮で硬直が悪化します。'
        },
        crown: {
          roZone: '🔴 頂点直塗り',
          roSpring: '✕ 恒久的損傷！',
          roEffect: '鼻音化 +6.0 dB',
          kpi1Val: '✕ ガラス質・鼻音',
          kpi1Sub: '耳障りで鼻にかかった音',
          kpi2Val: '✕ 恒久的損傷',
          kpi2Sub: '頂点の弾性層が破壊',
          kpi3Val: '✕ 回復不能',
          kpi3Sub: '打弦でさらに圧縮・劣化',
          badge: '🚫 厳禁・回避 • クラウン頂点への直接塗布',
          title: 'クラウン直塗りはガラス質で鼻にかかった硬さを生み、恒久的に損傷させる！',
          body: '打弦点（12時位置）に直接塗布すると脆い硬化殻ができ、ガラス質で鼻にかかった異質な硬さが生じます。ハンマーを恒久的に傷めるため避けるべきです。',
          rule: '🚫 <strong>鉄則：</strong>クラウン頂点への直塗りは厳禁 — ハンマーヘッドに回復不能な損傷を与えます！'
        }
      },
      weight: {
        bassTitle: '中音〜低音 → 重量を増やす (+m)：',
        bassBody: 'ハンマー重量を増やすことで太い弦へ十分なエネルギーが伝わり、豊かな基音と音の芯（遠達性）が高まります。',
        trebleTitle: '高音域へ向けて → 重量を減らす (−m)：',
        trebleBody: '重量を軽くすることで加速が速まり接触時間が短縮され、短い高音弦で澄んだ抜けの良い打弦音が得られます。'
      }
    },

    zh: {
      cvString: '琴弦 · 击弦点 (12:00)',
      cvCrownLbl: '槌尖 (12:00)',
      cvAboveCoreLbl: '木芯上方区域',
      cvFlankL: '侧翼',
      cvFlankR: '侧翼',
      cvCoreLbl: '木芯',
      cvRivetLbl: 'T型铆钉',
      cvClickHint: '点击剖面图中的任意区域',
      cvPipetteRivet: '铆钉区域涂覆',
      cvPipetteLatOk: '侧面微量涂覆',
      cvPipetteLatOver: '✕ 用量过多！',
      cvPipetteCrown: '✕ 切勿直涂槌尖！',
      cvTensionLift: '张力 σ ↑（视漆液而定）',
      cvFoundationBoost: '增强基音根基',
      cvSpringFree: '✓ 侧翼自由 · 弹簧功能完好',
      cvFlankGlued: '✕ 侧翼粘连 · 弹簧功能受阻！',
      cvCrownDamage: '✕ 玻璃般鼻音硬脆感 · 永久损伤！',
      cvAgedTag: '⏱️ 随弹奏时间进一步压实！',
      specLow: 'H₁–H₄ 基音根基',
      specMid: 'H₅–H₈ 中频 / 鼻音区',
      specHigh: 'H₉–H₁₂ 高次泛音',
      specSpringLbl: (pct) => `弹簧: ${pct}%`,
      timeBtnFresh: '⏱️ 刚涂覆状态',
      timeBtnAged: '⏱️ 长期弹奏后（+压实）',
      zones: {
        rivet: {
          roZone: '🟡 铆钉区',
          roSpring: '✓ 弹簧自由 · σ ↑',
          roEffect: 'H₁–H₄ +3.4 dB',
          kpi1Val: '根基增强 ↑',
          kpi1Sub: '稳固底座与基音厚度',
          kpi2Val: '张力提升 ↑',
          kpi2Sub: '视漆液种类提升张力',
          kpi3Val: '✓ 长期稳定',
          kpi3Sub: '木芯下方：无压实风险',
          badge: '✦ 稳固根基 • 铆钉区域浸渍',
          title: '铆钉区涂覆可增强弦槌根基，并视漆液特性提升毛毡张力',
          body: '在铆钉附近的下部区域施用硬化剂可强化弦槌底座与基音支撑；视所用的漆基配方，固化收缩还能提升外层毛毡张力，且不会粘连侧翼弹簧区。',
          rule: '✓ <strong>优势：</strong>位于木芯下方——上部弹性击弦弓保持完好自由。'
        },
        lateral_ok: {
          roZone: '🟠 侧面微量',
          roSpring: (aged) => aged ? '⚠️ 继续压实 · 74%' : '✓ 侧翼自由 · 92%',
          roEffect: (aged) => aged ? 'H₉–H₁₂ +4.9 dB' : 'H₉–H₁₂ +3.8 dB',
          kpi1Val: '高次泛音 ↑',
          kpi1Sub: '针对性增强明亮泛音',
          kpi2Val: (aged) => aged ? '74% 弹性余量' : '✓ 弹簧完好',
          kpi2Sub: (aged) => aged ? '弹奏后明显变紧变硬' : '与侧翼连接保持畅通',
          kpi3Val: '⏱️ 后续压实',
          kpi3Sub: '木芯上方随时间压实',
          badge: '✦ 木芯上方区域 • 侧面微量点涂',
          title: '木芯上方侧面点涂可增强高次泛音——但会随时间进一步压实！',
          body: '在木芯上方从侧面微量点涂稀释漆液，可在不封死外侧翼的前提下支撑上部毡桥，精准增强高次泛音（H₇–H₁₂）。',
          rule: '⏱️ <strong>时间因素：</strong>所有在木芯上方的涂覆都会随长期弹奏进一步压实变硬，因此必须预留弹性余量！'
        },
        lateral_over: {
          roZone: '⚠️ 用量过多',
          roSpring: '✕ 侧翼粘死！',
          roEffect: 'H₁–H₄ −3.8 dB',
          kpi1Val: '✕ 僵硬发紧',
          kpi1Sub: '基音流失，触弦生硬',
          kpi2Val: '✕ 弹簧受阻',
          kpi2Sub: '通往侧翼连接被粘死！',
          kpi3Val: '⚠️ 持续硬化',
          kpi3Sub: '时间压实加剧锁死',
          badge: '⚠️ 过量失误 • 侧面漆液渗入侧翼',
          title: '用量过多会粘死与侧翼的连接，严重破坏弦槌弹簧功能！',
          body: '若侧面点涂过量，漆液会从木芯上方扩散粘连至侧翼毡层，阻碍弦槌的复合弹簧回弹机制。',
          rule: '✕ <strong>后果：</strong>弹簧功能受阻、动态丧失，且随弹奏时间进一步硬化恶化！'
        },
        crown: {
          roZone: '🔴 直涂槌尖',
          roSpring: '✕ 永久损伤！',
          roEffect: '鼻音感 +6.0 dB',
          kpi1Val: '✕ 玻璃鼻音感',
          kpi1Sub: '刺耳发脆的鼻音硬度',
          kpi2Val: '✕ 永久损伤',
          kpi2Sub: '槌尖弹性缓冲彻底受损',
          kpi3Val: '✕ 不可逆转',
          kpi3Sub: '击弦冲击下继续恶化',
          badge: '🚫 严禁操作 • 直接涂覆于槌尖顶面',
          title: '槌尖直涂会产生玻璃般的鼻音硬度，并对弦槌造成永久损伤！',
          body: '将漆液直接涂在12点钟击弦槌尖会形成脆硬外壳，产生如玻璃般发紧的鼻音化硬度，且每次击弦都会令其继续压实，导致不可逆损坏。',
          rule: '🚫 <strong>工艺铁律：</strong>切勿直接在槌尖涂漆——极易永久毁坏弦槌！'
        }
      },
      weight: {
        bassTitle: '中音至低音区 → 增加弦槌重量 (+m)：',
        bassBody: '更大的弦槌质量可将更充沛的能量注入粗重琴弦，显著增强基音厚度与穿透力。',
        trebleTitle: '向高音区过渡 → 减轻弦槌重量 (−m)：',
        trebleBody: '减轻质量可加快击弦加速并缩短触弦时间，使短弦高音获得清脆、通透的穿透力。'
      }
    }
  };

  class FeltLacquerHardeningSim {
    constructor() {
      this.zone = 'rivet';
      this.aged = false; // Nachverdichtung über die Zeit
      this.weightReg = 'bass'; // 'bass' (Mitte bis Bass +m) | 'treble' (Richtung Diskant -m)
      this.lang = 'de';
      this.audioCtx = null;
      this.animId = null;
      this.pulsePhase = 0;
      this.strikeFlash = 0;
      this.hoverZone = null;
      this.hitRegions = [];
    }

    init() {
      this.root = document.querySelector('.s32-hardening-slide');
      if (!this.root) return;

      this.headCanvas = document.getElementById('flh-canvas-head');
      this.specCanvas = document.getElementById('flh-canvas-spec');

      // Zone buttons
      this.zoneBtns = Array.from(this.root.querySelectorAll('[data-flh-zone]'));
      this.zoneBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const z = btn.getAttribute('data-flh-zone');
          if (z && ZONE_CONFIG[z]) {
            this.setZone(z, true);
          }
        });
      });

      // Time compaction toggle
      this.timeBtn = document.getElementById('flh-btn-aged');
      if (this.timeBtn) {
        this.timeBtn.addEventListener('click', () => {
          this.aged = !this.aged;
          this.updateUI();
          this.triggerStrike(true);
        });
      }

      // Tone preview strike button
      this.strikeBtn = document.getElementById('flh-btn-strike');
      if (this.strikeBtn) {
        this.strikeBtn.addEventListener('click', () => {
          this.triggerStrike(true);
        });
      }

      // Weight principle register buttons (Bass/Mid +m vs Treble -m)
      this.weightBtns = Array.from(this.root.querySelectorAll('[data-flh-weight]'));
      this.weightBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const reg = btn.getAttribute('data-flh-weight');
          if (reg === 'bass' || reg === 'treble') {
            this.weightReg = reg;
            this.updateWeightUI();
            this.playWeightPreview(reg);
          }
        });
      });

      // Interactive canvas hit testing (click + hover)
      if (this.headCanvas) {
        const getCoords = (ev) => {
          const r = this.headCanvas.getBoundingClientRect();
          const clientX = ev.touches && ev.touches[0] ? ev.touches[0].clientX : ev.clientX;
          const clientY = ev.touches && ev.touches[0] ? ev.touches[0].clientY : ev.clientY;
          return { x: clientX - r.left, y: clientY - r.top };
        };

        this.headCanvas.addEventListener('mousemove', (ev) => {
          const pt = getCoords(ev);
          const hit = this.pickHitZone(pt.x, pt.y);
          if (hit !== this.hoverZone) {
            this.hoverZone = hit;
            this.headCanvas.style.cursor = hit ? 'pointer' : 'default';
            this.renderCanvases();
          }
        });

        this.headCanvas.addEventListener('mouseleave', () => {
          if (this.hoverZone) {
            this.hoverZone = null;
            this.headCanvas.style.cursor = 'default';
            this.renderCanvases();
          }
        });

        this.headCanvas.addEventListener('click', (ev) => {
          const pt = getCoords(ev);
          const hit = this.pickHitZone(pt.x, pt.y);
          if (hit) {
            // Clicking lateral zone again toggles between dosed (lateral_ok) and overdose (lateral_over)
            if (hit === 'lateral_ok' && this.zone === 'lateral_ok') {
              this.setZone('lateral_over', true);
            } else {
              this.setZone(hit, true);
            }
          }
        });
      }

      // Language change listener
      window.addEventListener('languageChanged', (e) => {
        const newLang = (e && e.detail && e.detail.lang) || document.documentElement.lang || 'de';
        this.setLanguage(newLang);
      });

      if (window.ResizeObserver && this.headCanvas) {
        this.ro = new ResizeObserver(() => {
          if (this.isSlideActive()) this.renderCanvases();
        });
        this.ro.observe(this.headCanvas);
        if (this.specCanvas) this.ro.observe(this.specCanvas);
      }

      // Slide activation observer so canvas animates smoothly only when Slide 32 is visible
      const mutObs = new MutationObserver(() => {
        if (this.isSlideActive()) {
          this.updateUI();
          this.startLoop();
        } else {
          this.stopLoop();
        }
      });
      mutObs.observe(this.root, { attributes: true, attributeFilter: ['class'] });

      this.lang = (window.presentation && window.presentation.currentLang) || document.documentElement.lang || 'de';
      this.updateUI();
      this.updateWeightUI();
      if (this.isSlideActive()) {
        this.startLoop();
      } else {
        requestAnimationFrame(() => this.renderCanvases());
      }
    }

    isSlideActive() {
      return !!(this.root && this.root.classList.contains('active'));
    }

    dict() {
      return I18N[this.lang] || I18N.de;
    }

    setLanguage(lang) {
      this.lang = I18N[lang] ? lang : 'de';
      this.updateUI();
      this.updateWeightUI();
    }

    setZone(z, playSound = false) {
      this.zone = z;
      this.updateUI();
      if (playSound) {
        this.triggerStrike(true);
      }
    }

    pickHitZone(x, y) {
      for (let i = 0; i < this.hitRegions.length; i++) {
        const reg = this.hitRegions[i];
        const dx = (x - reg.cx) / reg.rx;
        const dy = (y - reg.cy) / reg.ry;
        if (dx * dx + dy * dy <= 1.0) {
          return reg.zone;
        }
      }
      return null;
    }

    startLoop() {
      if (this.animId) return;
      const step = (now) => {
        if (!this.isSlideActive()) {
          this.animId = null;
          return;
        }
        this.pulsePhase = (now * 0.0028) % (Math.PI * 2);
        if (this.strikeFlash > 0.005) {
          this.strikeFlash *= 0.90;
        } else {
          this.strikeFlash = 0;
        }
        this.renderCanvases();
        this.animId = requestAnimationFrame(step);
      };
      this.animId = requestAnimationFrame(step);
    }

    stopLoop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }

    triggerStrike(playAudio = true) {
      this.strikeFlash = 1.0;
      if (this.strikeBtn) {
        this.strikeBtn.classList.add('is-striking');
        setTimeout(() => this.strikeBtn && this.strikeBtn.classList.remove('is-striking'), 320);
      }
      if (playAudio) this.playLacquerTone();
      if (!this.animId && this.isSlideActive()) {
        this.startLoop();
      } else {
        this.renderCanvases();
      }
    }

    playLacquerTone() {
      try {
        const AudioContextCls = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextCls) return;
        if (!this.audioCtx) this.audioCtx = new AudioContextCls();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const cfg = ZONE_CONFIG[this.zone];
        const deltas = this.aged ? cfg.deltasAged : cfg.deltasFresh;
        const f0 = 220; // A3 reference piano tone

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(0.20, now + 0.005);
        const decaySec = this.zone === 'crown' ? 0.65 : (this.zone === 'lateral_over' ? 0.72 : 1.45);
        master.gain.exponentialRampToValueAtTime(0.0008, now + decaySec);
        master.connect(ctx.destination);

        const baseWeights = [1.0, 0.74, 0.54, 0.40, 0.30, 0.22, 0.16, 0.12, 0.09, 0.07, 0.05, 0.038];
        for (let i = 0; i < 12; i++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const n = i + 1;
          const B = 0.00018;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f0 * n * Math.sqrt(1 + B * n * n), now);

          const lin = baseWeights[i] * Math.pow(10, deltas[i] / 20) * 0.26;
          const partDecay = Math.max(0.12, decaySec / (1 + i * (this.zone === 'crown' ? 0.14 : 0.24)));
          g.gain.setValueAtTime(Math.max(0.0001, lin), now);
          g.gain.exponentialRampToValueAtTime(0.00005, now + partDecay);

          osc.connect(g);
          g.connect(master);
          osc.start(now);
          osc.stop(now + partDecay + 0.04);
        }
      } catch (_) {}
    }

    playWeightPreview(reg) {
      try {
        const AudioContextCls = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextCls) return;
        if (!this.audioCtx) this.audioCtx = new AudioContextCls();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const isBass = reg === 'bass';
        const f0 = isBass ? 98.0 : 1046.5; // G2 (Mitte/Bass) vs C6 (Diskant)

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(isBass ? 0.23 : 0.17, now + 0.004);
        const decaySec = isBass ? 1.75 : 0.95;
        master.gain.exponentialRampToValueAtTime(0.0008, now + decaySec);
        master.connect(ctx.destination);

        const weights = isBass
          ? [1.0, 0.88, 0.68, 0.50, 0.34, 0.22, 0.14, 0.09]
          : [1.0, 0.62, 0.42, 0.28, 0.18, 0.11, 0.06, 0.03];

        for (let i = 0; i < weights.length; i++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const n = i + 1;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f0 * n * Math.sqrt(1 + 0.0002 * n * n), now);
          g.gain.setValueAtTime(weights[i] * 0.24, now);
          g.gain.exponentialRampToValueAtTime(0.00005, now + Math.max(0.14, decaySec / (1 + i * 0.28)));
          osc.connect(g);
          g.connect(master);
          osc.start(now);
          osc.stop(now + decaySec + 0.05);
        }
      } catch (_) {}
    }

    updateUI() {
      const d = this.dict();
      const zText = d.zones[this.zone];
      const cfg = ZONE_CONFIG[this.zone];

      this.zoneBtns.forEach((btn) => {
        const active = btn.getAttribute('data-flh-zone') === this.zone;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (this.timeBtn) {
        this.timeBtn.classList.toggle('is-active', this.aged);
        this.timeBtn.setAttribute('aria-pressed', this.aged ? 'true' : 'false');
        const lbl = this.timeBtn.querySelector('.flh-time-lbl') || this.timeBtn;
        lbl.textContent = this.aged ? d.timeBtnAged : d.timeBtnFresh;
      }

      const resolveVal = (v) => (typeof v === 'function' ? v(this.aged) : v);

      const setTxt = (id, val, color) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = resolveVal(val);
        if (color) el.style.color = color;
      };

      const statusCol = cfg.isDanger ? '#f87171' : (this.aged && cfg.aboveCore ? '#fbbf24' : '#34d399');
      setTxt('flh-ro-zone', zText.roZone, cfg.stroke);
      setTxt('flh-ro-spring', zText.roSpring, statusCol);
      setTxt('flh-ro-effect', zText.roEffect, cfg.isDanger ? '#fca5a5' : '#fde68a');

      setTxt('flh-kpi1-val', zText.kpi1Val, cfg.isDanger ? '#f87171' : '#fde68a');
      setTxt('flh-kpi1-sub', zText.kpi1Sub);
      setTxt('flh-kpi2-val', zText.kpi2Val, statusCol);
      setTxt('flh-kpi2-sub', zText.kpi2Sub);
      setTxt('flh-kpi3-val', zText.kpi3Val, cfg.aboveCore ? '#fbbf24' : '#34d399');
      setTxt('flh-kpi3-sub', zText.kpi3Sub);

      const badgeEl = document.getElementById('flh-exp-badge');
      if (badgeEl) {
        badgeEl.textContent = zText.badge;
        badgeEl.className = 'flh-exp-pill ' + (cfg.isDanger ? 'is-danger' : (cfg.aboveCore ? 'is-caution' : 'is-safe'));
      }
      const springPct = this.aged ? cfg.springAged : cfg.springFresh;
      const springPillEl = document.getElementById('flh-spring-pill');
      if (springPillEl) {
        springPillEl.textContent = d.specSpringLbl(springPct);
        springPillEl.className = 'flh-spring-pill ' + (springPct >= 85 ? 'is-safe' : (springPct >= 65 ? 'is-caution' : 'is-danger'));
      }
      setTxt('flh-exp-title', zText.title);
      setTxt('flh-exp-body', zText.body);
      const ruleEl = document.getElementById('flh-exp-rule');
      if (ruleEl) {
        ruleEl.innerHTML = zText.rule;
        ruleEl.className = 'flh-exp-rule ' + (cfg.isDanger ? 'is-danger' : (cfg.aboveCore ? 'is-caution' : 'is-safe'));
      }

      this.renderCanvases();
    }

    updateWeightUI() {
      const d = this.dict();
      const isBass = this.weightReg === 'bass';
      this.weightBtns.forEach((btn) => {
        const active = btn.getAttribute('data-flh-weight') === this.weightReg;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      const titleEl = document.getElementById('flh-weight-detail-title');
      const bodyEl = document.getElementById('flh-weight-detail-body');
      const boxEl = document.getElementById('flh-weight-detail-box');
      if (titleEl) titleEl.textContent = isBass ? d.weight.bassTitle : d.weight.trebleTitle;
      if (bodyEl) bodyEl.textContent = isBass ? d.weight.bassBody : d.weight.trebleBody;
      if (boxEl) {
        boxEl.classList.toggle('is-bass', isBass);
        boxEl.classList.toggle('is-treble', !isBass);
      }
    }

    setupCanvas(canvas) {
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(200, rect.width || 380);
      const h = Math.max(100, rect.height || 240);
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

    renderCanvases() {
      this.drawHeadCrossSection();
      this.drawSpectrumEffect();
    }

    drawArrow(ctx, x1, y1, x2, y2, color, lw = 2.0, head = 6.5) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      if (len < 2) return;
      const ux = dx / len;
      const uy = dy / len;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = lw;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 - ux * head * 0.5, y2 - uy * head * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ux * head - uy * head * 0.55, y2 - uy * head + ux * head * 0.55);
      ctx.lineTo(x2 - ux * head + uy * head * 0.55, y2 - uy * head - ux * head * 0.55);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    drawPillLabel(ctx, x, y, text, bg, border, fg, font = '700 12.2px Inter, sans-serif') {
      ctx.save();
      ctx.font = font;
      const padX = 10;
      const tw = ctx.measureText(text).width + padX * 2;
      const th = 23;
      const rx = x - tw / 2;
      const ry = y - th / 2;
      ctx.fillStyle = bg;
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(rx, ry, tw, th, 6.5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = fg;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y + 0.5);
      ctx.restore();
    }

    drawPipette(ctx, tipX, tipY, angleRad, accentColor, isRightSide) {
      ctx.save();
      ctx.translate(tipX, tipY);
      if (isRightSide) ctx.scale(-1, 1);
      ctx.rotate(angleRad);
      // Needle nozzle pointing to (0,0)
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-18, -2.6);
      ctx.lineTo(-18, 2.6);
      ctx.closePath();
      ctx.fill();
      // Glass barrel
      ctx.fillStyle = 'rgba(203, 213, 225, 0.88)';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-54, -4.5, 37, 9, 3.5);
      ctx.fill();
      ctx.stroke();
      // Lacquer fluid inside barrel
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(-48, -2.8, 28, 5.6, 2);
      ctx.fill();
      // Bulb
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(-67, -6, 15, 12, 4.5);
      ctx.fill();
      ctx.restore();
    }

    drawHeadCrossSection() {
      const setup = this.setupCanvas(this.headCanvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const d = this.dict();
      const pulse = 0.5 + 0.5 * Math.sin(this.pulsePhase);

      ctx.clearRect(0, 0, w, h);

      // Subtle technical grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.032)';
      ctx.lineWidth = 1;
      for (let gx = 24; gx < w; gx += 30) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 22; gy < h; gy += 30) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }
      ctx.restore();

      const cx = w * 0.5;
      const statusPillY = 19;

      // Exact 1:1 Louis Renner Hammerhead Proportions from Slide 27 ("Renner", Konzert preset S = 0.52)
      const S_REF = 0.52;
      const FELT_TO_TOTAL = 0.785;
      const SHOULDER_HW_RATIO = 0.495 - 0.105 * S_REF; // 0.4404
      const SHOULDER_Y_RATIO = 0.385 - 0.045 * S_REF;  // 0.3616
      const CROWN_CTRL_RATIO = 0.57 - 0.20 * S_REF;    // 0.4660

      // Reserve side margin for pipettes (67px) and bottom margin for pills/hint so aspect ratio NEVER distorts
      const maxShoulderHW = Math.max(56, w * 0.5 - 76);
      const maxTotalHHoriz = maxShoulderHW / (FELT_TO_TOTAL * SHOULDER_HW_RATIO);
      const availH = Math.max(168, h - 54 - 46);
      const totalH = Math.min(258, availH, maxTotalHHoriz);

      const crownBaseY = Math.round(Math.max(52, 50 + (availH - totalH) * 0.40));
      const stringY = crownBaseY - 13;

      // Elastic strike motion when user clicks "Klangprobe"
      const isSpringFree = (this.zone === 'rivet' || this.zone === 'lateral_ok');
      const strikeLift = this.strikeFlash * 7.5;
      const squashPx = this.strikeFlash * (isSpringFree ? 3.2 : 1.3);
      const flankFlexPx = isSpringFree ? (squashPx * (this.aged && this.zone === 'lateral_ok' ? 0.30 : 0.58)) : 0;

      const baseY0 = crownBaseY - strikeLift;
      const crownTopY = baseY0 + squashPx * 0.42;
      const feltH = totalH * FELT_TO_TOTAL;
      const feltEndY = baseY0 + feltH;
      const woodBotY = baseY0 + totalH;

      const shoulderHW = (feltH * SHOULDER_HW_RATIO) + flankFlexPx;
      const shoulderY = crownTopY + (feltEndY - crownTopY) * SHOULDER_Y_RATIO;
      const topSpan = Math.max(18, shoulderY - crownTopY);
      const botSpan = Math.max(24, feltEndY - shoulderY);

      // Hornbeam Wooden Core & Crimson Underfelt geometry (1:1 with Slide 27 drawModernHammer)
      const coreTipY = baseY0 + feltH * 0.34;
      const coreNoseHW = feltH * 0.088;
      const coreDomeY = coreTipY + coreNoseHW * 1.10;
      const coreWaistHW = feltH * 0.072;
      const coreFootHW = feltH * 0.098;

      const ufTipY = coreTipY - feltH * 0.062;
      const ufOuterHW = coreNoseHW + feltH * 0.045;
      const ufEndY = baseY0 + feltH * 0.675;
      const ufDomeY = coreDomeY - 1;
      const coreHWAtUfEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((ufEndY - coreDomeY) / Math.max(1, feltEndY - coreDomeY));
      const aboveCoreLineY = ufTipY - 3;

      const evalCubic = (p0, p1, p2, p3, t) => {
        const mt = 1 - t;
        return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
      };

      const crownCtrlX = shoulderHW * CROWN_CTRL_RATIO;
      const lowX0 = shoulderHW, lowY0 = shoulderY;
      const lowX1 = shoulderHW, lowY1 = shoulderY + botSpan * 0.41;
      const lowX2 = coreWaistHW + (shoulderHW - coreWaistHW) * 0.35, lowY2 = feltEndY - botSpan * 0.17;
      const lowX3 = coreWaistHW + 0.6, lowY3 = feltEndY;

      const evalUpperX = (t) => evalCubic(0, crownCtrlX, shoulderHW, shoulderHW, t);
      const evalUpperY = (t) => evalCubic(crownTopY, crownTopY, shoulderY - topSpan * 0.53, shoulderY, t);

      // Brass T-Rivet sits at t = 0.76 along the lower tapered felt-on-wood zone (1:1 with Slide 27)
      const tRivet = 0.76;
      const rivetY = evalCubic(lowY0, lowY1, lowY2, lowY3, tRivet);
      const rivetOuterHW = evalCubic(lowX0, lowX1, lowX2, lowX3, tRivet);

      // Save clickable regions for direct mouse/touch interaction on anatomy
      this.hitRegions = [
        { zone: 'crown', cx, cy: crownTopY + 14, rx: shoulderHW * 0.48, ry: 18 },
        { zone: 'lateral_ok', cx: cx - shoulderHW * 0.56, cy: (crownTopY + aboveCoreLineY) * 0.58, rx: shoulderHW * 0.44, ry: 22 },
        { zone: 'lateral_ok', cx: cx + shoulderHW * 0.56, cy: (crownTopY + aboveCoreLineY) * 0.58, rx: shoulderHW * 0.44, ry: 22 },
        { zone: 'rivet', cx, cy: rivetY, rx: rivetOuterHW + 24, ry: 24 }
      ];

      // 0. Piano String at top (12:00 strike reference)
      ctx.save();
      const strVib = this.strikeFlash * Math.sin(this.pulsePhase * 8) * 2.5;
      ctx.strokeStyle = this.strikeFlash > 0.1 ? '#fde68a' : 'rgba(226, 232, 240, 0.55)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(cx - shoulderHW * 1.45, stringY);
      ctx.quadraticCurveTo(cx, stringY - strVib, cx + shoulderHW * 1.45, stringY);
      ctx.stroke();
      ctx.font = '600 11.5px Inter, sans-serif';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.86)';
      ctx.textAlign = 'right';
      ctx.fillText(d.cvString, w - 10, stringY + 14);
      ctx.restore();

      // Unloaded rest ghost silhouette (1:1 visual cue from Slide 27)
      if (this.strikeFlash > 0.04) {
        const restShHW = feltH * SHOULDER_HW_RATIO;
        const restFeltEndY = crownBaseY + feltH;
        const restShY = crownBaseY + feltH * SHOULDER_Y_RATIO;
        const restTopSpan = restShY - crownBaseY;
        const restBotSpan = restFeltEndY - restShY;
        const restCrownCtrl = restShHW * CROWN_CTRL_RATIO;
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        ctx.moveTo(cx, crownBaseY);
        ctx.bezierCurveTo(cx + restCrownCtrl, crownBaseY, cx + restShHW, restShY - restTopSpan * 0.53, cx + restShHW, restShY);
        ctx.bezierCurveTo(cx + restShHW, restShY + restBotSpan * 0.41, cx + coreWaistHW + (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17, cx + coreWaistHW + 0.6, restFeltEndY);
        ctx.moveTo(cx, crownBaseY);
        ctx.bezierCurveTo(cx - restCrownCtrl, crownBaseY, cx - restShHW, restShY - restTopSpan * 0.53, cx - restShHW, restShY);
        ctx.bezierCurveTo(cx - restShHW, restShY + restBotSpan * 0.41, cx - coreWaistHW - (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17, cx - coreWaistHW - 0.6, restFeltEndY);
        ctx.stroke();
        ctx.restore();
      }

      // 1. Hornbeam Wooden Hammer Core (Hammerkern — 1:1 with Slide 27)
      const woodPath = new Path2D();
      woodPath.moveTo(cx, coreTipY);
      woodPath.bezierCurveTo(
        cx + coreNoseHW * 0.58, coreTipY,
        cx + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44,
        cx + coreNoseHW, coreDomeY
      );
      woodPath.lineTo(cx + coreWaistHW, feltEndY);
      woodPath.bezierCurveTo(
        cx + coreWaistHW * 0.94, feltEndY + (woodBotY - feltEndY) * 0.38,
        cx + coreFootHW, woodBotY - (woodBotY - feltEndY) * 0.24,
        cx + coreFootHW, woodBotY
      );
      woodPath.lineTo(cx - coreFootHW, woodBotY);
      woodPath.bezierCurveTo(
        cx - coreFootHW, woodBotY - (woodBotY - feltEndY) * 0.24,
        cx - coreWaistHW * 0.94, feltEndY + (woodBotY - feltEndY) * 0.38,
        cx - coreWaistHW, feltEndY
      );
      woodPath.lineTo(cx - coreNoseHW, coreDomeY);
      woodPath.bezierCurveTo(
        cx - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44,
        cx - coreNoseHW * 0.58, coreTipY,
        cx, coreTipY
      );
      woodPath.closePath();

      ctx.save();
      const woodGrad = ctx.createLinearGradient(cx - coreFootHW, coreTipY, cx + coreFootHW, woodBotY);
      woodGrad.addColorStop(0, '#f3d9b1');
      woodGrad.addColorStop(0.50, '#d6a86e');
      woodGrad.addColorStop(1, '#a8743d');
      ctx.fillStyle = woodGrad;
      ctx.fill(woodPath);

      ctx.clip(woodPath);
      ctx.fillStyle = 'rgba(115, 64, 22, 0.30)';
      for (let wy = coreTipY + 6; wy < woodBotY - 4; wy += 8) {
        const off = ((Math.round(wy) % 16) === 0) ? -4.2 : 3.2;
        ctx.fillRect(cx + off - 1, wy, 1.8, 4.2);
        ctx.fillRect(cx - off * 1.25, wy + 3.5, 1.5, 3.6);
      }
      ctx.strokeStyle = 'rgba(92, 50, 16, 0.32)';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(cx, feltEndY + 4);
      ctx.lineTo(cx, woodBotY);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(243, 217, 177, 0.55)';
      ctx.lineWidth = 1.05;
      ctx.stroke(woodPath);
      ctx.restore();

      // 2. Crimson/Magenta Underfelt Horseshoe Cap (Unterfilz — 1:1 with Slide 27)
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
      ufGrad.addColorStop(0, '#db2777');
      ufGrad.addColorStop(0.65, '#be185d');
      ufGrad.addColorStop(1, '#831843');
      ctx.fillStyle = ufGrad;
      ctx.fill(ufPath);
      ctx.restore();

      // 3. Merino Oberfilz Cloak & Interactive Lacquer Impregnation Zones
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

      // Base dark Merino felt tone (matching Slide 27)
      ctx.fillStyle = '#131e2f';
      ctx.fillRect(cx - shoulderHW - 24, crownTopY - 12, shoulderHW * 2 + 48, feltH + 34);

      // Subtle Slide-27 baseline elastic flank belly glow when flanks remain free
      if (this.zone === 'rivet' || this.zone === 'lateral_ok') {
        const flankAlpha = (this.zone === 'lateral_ok' && this.aged) ? 0.20 : 0.32;
        for (const dir of [-1, 1]) {
          const fx = cx + dir * (ufOuterHW + (shoulderHW - ufOuterHW) * 0.56);
          const fy = shoulderY + botSpan * 0.05;
          const flankGlow = ctx.createRadialGradient(fx, fy, 2, fx, fy, shoulderHW * 0.50);
          flankGlow.addColorStop(0, `rgba(56, 189, 248, ${flankAlpha})`);
          flankGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = flankGlow;
          ctx.fillRect(cx - shoulderHW - 20, crownTopY, shoulderHW * 2 + 40, feltH + 20);
        }
      }

      // ACTIVE LACQUER IMPREGNATION DIFFUSION ZONES (clipped strictly inside feltCloak!)
      const ageBoost = this.aged ? 1.22 : 1.0;

      if (this.zone === 'rivet') {
        // Warm amber-gold reinforcement soaking lower legs around Brass T-Rivet (below core!)
        [-1, 1].forEach((side) => {
          const gx = cx + side * (coreWaistHW + (rivetOuterHW - coreWaistHW) * 0.62);
          const gy = rivetY - 2;
          const r = Math.max(26, feltH * 0.165) + pulse * 3.5;
          const rg = ctx.createRadialGradient(gx, gy, 2, gx, gy, r);
          rg.addColorStop(0, 'rgba(250, 204, 21, 0.86)');
          rg.addColorStop(0.55, 'rgba(217, 119, 6, 0.50)');
          rg.addColorStop(1, 'rgba(217, 119, 6, 0)');
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (this.zone === 'lateral_ok') {
        // Controlled lateral impregnation ABOVE core tip (leaving 9:00-3:00 outer flanks free!)
        const spread = (Math.max(18, shoulderHW * 0.28) + pulse * 2.2) * (this.aged ? 1.16 : 1.0);
        [-1, 1].forEach((side) => {
          const gx = cx + side * (shoulderHW * 0.56);
          const gy = (crownTopY + aboveCoreLineY) * 0.56 + (this.aged ? 2 : 0);
          const rg = ctx.createRadialGradient(gx, gy, 2, gx, gy, spread);
          rg.addColorStop(0, this.aged ? 'rgba(245, 158, 11, 0.88)' : 'rgba(56, 189, 248, 0.82)');
          rg.addColorStop(0.62, this.aged ? 'rgba(217, 119, 6, 0.50)' : 'rgba(14, 165, 233, 0.42)');
          rg.addColorStop(1, 'rgba(14, 165, 233, 0)');
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.ellipse(gx, gy, spread * 1.05, spread * 0.76, side * 0.25, 0, Math.PI * 2);
          ctx.fill();

          if (this.aged) {
            ctx.strokeStyle = 'rgba(253, 224, 71, 0.72)';
            ctx.lineWidth = 1.35;
            ctx.setLineDash([3, 2]);
            ctx.beginPath();
            ctx.ellipse(gx, gy, spread * 0.72, spread * 0.50, side * 0.25, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      } else if (this.zone === 'lateral_over') {
        // Decoupled lower-flank dimming mask + diagonal hatch (matching Slide 27 blocked state!)
        const dimGrad = ctx.createLinearGradient(cx, shoulderY - 6, cx, shoulderY + 26);
        dimGrad.addColorStop(0, 'rgba(7, 11, 20, 0)');
        dimGrad.addColorStop(1, 'rgba(7, 11, 20, 0.62)');
        ctx.fillStyle = dimGrad;
        ctx.fillRect(cx - shoulderHW - 24, shoulderY - 6, shoulderHW * 2 + 48, botSpan + 24);

        ctx.strokeStyle = 'rgba(148, 163, 184, 0.20)';
        ctx.lineWidth = 1.0;
        for (let hy = shoulderY + 4; hy < feltEndY + 20; hy += 11) {
          ctx.beginPath();
          ctx.moveTo(cx - shoulderHW - 10, hy);
          ctx.lineTo(cx - shoulderHW + 34, hy - 20);
          ctx.moveTo(cx + shoulderHW + 10, hy);
          ctx.lineTo(cx + shoulderHW - 34, hy - 20);
          ctx.stroke();
        }

        // OVERDOSE: Lacquer bleeds from above core ALL THE WAY down into both flanks, gluing fiber layers!
        const spreadX = shoulderHW * 0.60 * ageBoost;
        const spreadY = feltH * 0.30 * ageBoost;
        [-1, 1].forEach((side) => {
          const gx = cx + side * (shoulderHW * 0.62);
          const gy = shoulderY - 4;
          const rg = ctx.createRadialGradient(gx, gy, 4, gx, gy, Math.max(spreadX, spreadY));
          rg.addColorStop(0, 'rgba(234, 88, 12, 0.88)');
          rg.addColorStop(0.58, 'rgba(249, 115, 22, 0.56)');
          rg.addColorStop(1, 'rgba(249, 115, 22, 0)');
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.ellipse(gx, gy, spreadX, spreadY, side * 0.12, 0, Math.PI * 2);
          ctx.fill();

          // Cross-linked resin bridges locking flank layers
          ctx.strokeStyle = 'rgba(254, 215, 170, 0.68)';
          ctx.lineWidth = 1.65;
          for (let k = -2; k <= 2; k++) {
            const ly = shoulderY + k * 9.5;
            ctx.beginPath();
            ctx.moveTo(cx + side * (ufOuterHW + (shoulderHW - ufOuterHW) * 0.28), ly - 3.5);
            ctx.lineTo(cx + side * (shoulderHW * 0.92), ly + 3.5);
            ctx.stroke();
          }
        });
      } else if (this.zone === 'crown') {
        // TABOO CROWN: Hard brittle red lacquer crust right at 12:00 strike zone
        const crustR = shoulderHW * 0.56 * (this.aged ? 1.16 : 1.0);
        const rg = ctx.createRadialGradient(cx, crownTopY + 7, 2, cx, crownTopY + 11, crustR);
        rg.addColorStop(0, 'rgba(239, 68, 68, 0.92)');
        rg.addColorStop(0.55, 'rgba(220, 38, 38, 0.56)');
        rg.addColorStop(1, 'rgba(220, 38, 38, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.ellipse(cx, crownTopY + 9, crustR, 24 * ageBoost, 0, 0, Math.PI * 2);
        ctx.fill();

        // Micro-fracture / brittle crust hatch in 12:00 strike zone
        ctx.strokeStyle = 'rgba(254, 202, 202, 0.75)';
        ctx.lineWidth = 1.4;
        for (const dx of [-14, -5, 5, 14]) {
          ctx.beginPath();
          ctx.moveTo(cx + dx, crownTopY + 1);
          ctx.lineTo(cx + dx * 0.72, crownTopY + 12);
          ctx.stroke();
        }
      }

      // Reference dashed horizontal line at "Oberhalb Hammerkern" + Widest Flank ticks (Slide 27 style)
      ctx.save();
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.52)';
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(cx - shoulderHW, aboveCoreLineY);
      ctx.lineTo(cx + shoulderHW, aboveCoreLineY);
      ctx.stroke();

      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = this.zone === 'lateral_over' ? 'rgba(248, 113, 113, 0.48)' : 'rgba(125, 211, 252, 0.48)';
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(cx - shoulderHW + 2, shoulderY);
      ctx.lineTo(cx - ufOuterHW - 2, shoulderY);
      ctx.moveTo(cx + ufOuterHW + 2, shoulderY);
      ctx.lineTo(cx + shoulderHW - 2, shoulderY);
      ctx.stroke();
      ctx.restore();

      // Continuous Merino Fiber Trajectories (5 Vliesbahnen — 1:1 with Slide 27)
      for (let i = 1; i <= 5; i++) {
        const frac = i / 6;
        const topYi = crownTopY + (ufTipY - crownTopY) * frac * 0.88;
        const shHWi = shoulderHW - (shoulderHW - ufOuterHW * 1.04) * frac * 0.90;
        const shYi = shoulderY + (ufDomeY - shoulderY) * frac * 0.82;
        const topSpani = Math.max(8, shYi - topYi);
        const endYi = feltEndY - frac * (feltEndY - ufEndY) * 0.86;
        const botSpani = Math.max(12, endYi - shYi);
        const woodHWAtEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((endYi - coreDomeY) / Math.max(1, feltEndY - coreDomeY));
        const endXOff = woodHWAtEnd + 0.5;
        const lowCtrlX2 = endXOff + (shHWi - endXOff) * 0.35;
        const crownCtrlXi = shHWi * (0.56 - 0.18 * S_REF);

        const baseAlpha = (0.42 - i * 0.054) * (this.zone === 'lateral_over' ? 0.72 : 1.0);
        ctx.strokeStyle = `rgba(255, 248, 225, ${baseAlpha})`;
        ctx.lineWidth = i === 1 ? 1.5 : 1.15;
        ctx.beginPath();
        ctx.moveTo(cx - endXOff, endYi);
        ctx.bezierCurveTo(cx - lowCtrlX2, endYi - botSpani * 0.17, cx - shHWi, shYi + botSpani * 0.41, cx - shHWi, shYi);
        ctx.bezierCurveTo(cx - shHWi, shYi - topSpani * 0.53, cx - crownCtrlXi, topYi, cx, topYi);
        ctx.bezierCurveTo(cx + crownCtrlXi, topYi, cx + shHWi, shYi - topSpani * 0.53, cx + shHWi, shYi);
        ctx.bezierCurveTo(cx + shHWi, shYi + botSpani * 0.41, cx + lowCtrlX2, endYi - botSpani * 0.17, cx + endXOff, endYi);
        ctx.stroke();
      }

      // Hover highlight ring if hovering another region
      if (this.hoverZone && this.hoverZone !== this.zone) {
        this.hitRegions.filter((r) => r.zone === this.hoverZone).forEach((r) => {
          ctx.save();
          ctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.ellipse(r.cx, r.cy, r.rx * 0.72, r.ry * 0.72, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        });
      }

      ctx.restore(); // End Felt Clip

      // 4. Glue Fixation Seam (Klebstoff — 1:1 with Slide 27)
      ctx.save();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.6;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(251, 191, 36, 0.72)';
      ctx.shadowBlur = 7;
      for (const dir of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(cx + dir * (coreHWAtUfEnd + 0.5), ufEndY + 1);
        ctx.lineTo(cx + dir * (coreWaistHW + 0.5), feltEndY - 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Outer Surface-Tension Membrane Arc (1:1 with Slide 27)
      const outerTensionArc = new Path2D();
      outerTensionArc.moveTo(cx - lowX3, lowY3);
      outerTensionArc.bezierCurveTo(cx - lowX2, lowY2, cx - lowX1, lowY1, cx - shoulderHW, shoulderY);
      outerTensionArc.bezierCurveTo(cx - shoulderHW, shoulderY - topSpan * 0.53, cx - crownCtrlX, crownTopY, cx, crownTopY);
      outerTensionArc.bezierCurveTo(cx + crownCtrlX, crownTopY, cx + shoulderHW, shoulderY - topSpan * 0.53, cx + shoulderHW, shoulderY);
      outerTensionArc.bezierCurveTo(cx + lowX1, lowY1, cx + lowX2, lowY2, cx + lowX3, lowY3);

      ctx.save();
      const isBlocked = this.zone === 'lateral_over';
      const isCrownBad = this.zone === 'crown';
      const skinCol = (this.zone === 'lateral_ok' && this.aged) ? '#f59e0b' : '#2ecc71';
      ctx.strokeStyle = (isBlocked || isCrownBad) ? 'rgba(148, 163, 184, 0.52)' : skinCol;
      ctx.lineWidth = this.strikeFlash > 0.1 ? 3.5 : 2.9;
      ctx.shadowColor = (isBlocked || isCrownBad) ? 'transparent' : skinCol;
      ctx.shadowBlur = (isBlocked || isCrownBad) ? 0 : 8;
      ctx.stroke(outerTensionArc);

      if (isBlocked) {
        // Stiffened outer-contour red highlight (1:1 with Slide 27 blocked contour)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3.8;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.85)';
        ctx.shadowBlur = 10;
        for (const dir of [-1, 1]) {
          ctx.beginPath();
          for (let s = 0; s <= 16; s++) {
            const t = 0.20 + 0.68 * (s / 16);
            const px = cx + dir * evalUpperX(t);
            const py = evalUpperY(t);
            if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      } else if (isCrownBad) {
        // Glassy brittle red crust highlight across 12:00 crown
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4.2;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.90)';
        ctx.shadowBlur = 11;
        ctx.beginPath();
        for (let s = -12; s <= 12; s++) {
          const t = Math.abs(s) / 28;
          const px = cx + Math.sign(s) * evalUpperX(t);
          const py = evalUpperY(t);
          if (s === -12) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Widest Flank outer caliper ticks at shoulderY (Slide 27 detail)
      ctx.save();
      ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.65)' : 'rgba(56, 189, 248, 0.72)';
      ctx.lineWidth = 1.4;
      for (const dir of [-1, 1]) {
        const wx = cx + dir * (shoulderHW + 5);
        ctx.beginPath();
        ctx.moveTo(wx, shoulderY - 4);
        ctx.lineTo(wx, shoulderY + 4);
        ctx.moveTo(wx - dir * 3, shoulderY);
        ctx.lineTo(wx + dir * 2, shoulderY);
        ctx.stroke();
      }
      ctx.restore();

      // 6. 3D Horizontal Brass T-Rivet (Messing-Niete — 1:1 with Slide 27)
      ctx.save();
      if (this.zone === 'rivet') {
        ctx.shadowColor = 'rgba(250, 204, 21, 0.85)';
        ctx.shadowBlur = 9;
      }
      const brassGrad = ctx.createLinearGradient(cx, rivetY - 2.5, cx, rivetY + 2.5);
      brassGrad.addColorStop(0, '#fef08a');
      brassGrad.addColorStop(0.5, '#eab308');
      brassGrad.addColorStop(1, '#854d0e');

      ctx.fillStyle = brassGrad;
      ctx.strokeStyle = '#422006';
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.roundRect(cx - rivetOuterHW - 1.2, rivetY - 1.8, (rivetOuterHW + 1.2) * 2, 3.6, 1.2);
      ctx.fill();
      ctx.stroke();

      for (const dir of [-1, 1]) {
        const hx = cx + dir * (rivetOuterHW + 0.6);
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.roundRect(hx - 1.4, rivetY - 4.2, 2.8, 8.4, 1.2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // 7. Mechanical Spring / Tension Arrows + Pipette Applicators per Zone
      const latPipetteT = 0.46;
      const latContX = evalUpperX(latPipetteT);
      const latContY = evalUpperY(latPipetteT);

      if (this.zone === 'rivet') {
        // Pipettes directed precisely at lower felt run-out around the T-rivet
        this.drawPipette(ctx, cx - rivetOuterHW - 7, rivetY + 1, -0.16, '#eab308', false);
        this.drawPipette(ctx, cx + rivetOuterHW + 7, rivetY + 1, -0.16, '#eab308', true);
        // Upward mantle tension lift arrows along lower flanks
        this.drawArrow(ctx, cx - rivetOuterHW - 11, rivetY - 10, cx - shoulderHW - 11, shoulderY + 8, '#facc15', 2.2);
        this.drawArrow(ctx, cx + rivetOuterHW + 11, rivetY - 10, cx + shoulderHW + 11, shoulderY + 8, '#facc15', 2.2);
        this.drawPillLabel(ctx, cx, statusPillY, d.cvSpringFree, 'rgba(6, 78, 59, 0.90)', '#34d399', '#a7f3d0');
        this.drawPillLabel(ctx, cx, Math.min(h - 34, woodBotY + 15), d.cvTensionLift, 'rgba(30, 24, 10, 0.92)', '#eab308', '#fef08a');
      } else if (this.zone === 'lateral_ok') {
        // Pipettes from the side ABOVE the wood core along exact upper Bezier contour
        this.drawPipette(ctx, cx - latContX - 5, latContY, 0.22, '#38bdf8', false);
        this.drawPipette(ctx, cx + latContX + 5, latContY, 0.22, '#38bdf8', true);
        // Intact elastic spring arrows on outer flanks
        const spCol = this.aged ? '#fbbf24' : '#34d399';
        this.drawArrow(ctx, cx - shoulderHW - 13, shoulderY - 14, cx - shoulderHW - 13, shoulderY + 20, spCol, 2.0, 5.5);
        this.drawArrow(ctx, cx - shoulderHW - 13, shoulderY + 20, cx - shoulderHW - 13, shoulderY - 14, spCol, 2.0, 5.5);
        this.drawArrow(ctx, cx + shoulderHW + 13, shoulderY - 14, cx + shoulderHW + 13, shoulderY + 20, spCol, 2.0, 5.5);
        this.drawArrow(ctx, cx + shoulderHW + 13, shoulderY + 20, cx + shoulderHW + 13, shoulderY - 14, spCol, 2.0, 5.5);
        this.drawPillLabel(
          ctx,
          cx,
          statusPillY,
          this.aged ? d.cvAgedTag : d.cvSpringFree,
          this.aged ? 'rgba(69, 26, 3, 0.92)' : 'rgba(6, 78, 59, 0.90)',
          this.aged ? '#f59e0b' : '#34d399',
          this.aged ? '#fde68a' : '#a7f3d0'
        );
      } else if (this.zone === 'lateral_over') {
        this.drawPipette(ctx, cx - latContX - 5, latContY + 2, 0.25, '#f97316', false);
        this.drawPipette(ctx, cx + latContX + 5, latContY + 2, 0.25, '#f97316', true);
        // Red blockade markers (✕) on locked flanks (matching Slide 27!)
        [-1, 1].forEach((s) => {
          const mx = cx + s * (shoulderHW + 15);
          const my = shoulderY + 2;
          ctx.save();
          ctx.fillStyle = '#991b1b';
          ctx.strokeStyle = '#fca5a5';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(mx, my, 6.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          ctx.moveTo(mx - 3, my - 3); ctx.lineTo(mx + 3, my + 3);
          ctx.moveTo(mx + 3, my - 3); ctx.lineTo(mx - 3, my + 3);
          ctx.stroke();
          ctx.restore();
        });
        this.drawPillLabel(ctx, cx, statusPillY, d.cvFlankGlued, 'rgba(69, 10, 10, 0.94)', '#f87171', '#fecaca');
      } else if (this.zone === 'crown') {
        // Pipette angled onto 12:00 crown
        this.drawPipette(ctx, cx - 12, crownTopY + 2, 0.24, '#ef4444', false);
        this.drawPillLabel(ctx, cx, statusPillY, d.cvCrownDamage, 'rgba(69, 10, 10, 0.95)', '#ef4444', '#fecaca');
      }

      // 8. Anatomical Dark-Theme Pills ("Oberhalb Hammerkern", "Hammerkern", Click Hint)
      ctx.save();
      ctx.textAlign = 'center';

      // "Oberhalb Hammerkern" dark glass pill right above the dashed reference line
      ctx.font = '700 11.2px Inter, sans-serif';
      const acW = ctx.measureText(d.cvAboveCoreLbl).width + 14;
      ctx.fillStyle = 'rgba(10, 15, 28, 0.90)';
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
      ctx.lineWidth = 1.05;
      ctx.beginPath();
      ctx.roundRect(cx - acW / 2, aboveCoreLineY - 20, acW, 17.5, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(d.cvAboveCoreLbl, cx, aboveCoreLineY - 7.5);

      // "Hammerkern" subtle dark pill over central hornbeam core
      ctx.font = '700 11.0px Inter, sans-serif';
      const coreTagW = ctx.measureText(d.cvCoreLbl).width + 12;
      const coreTagY = (coreDomeY + ufEndY) * 0.52;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = 'rgba(243, 217, 177, 0.60)';
      ctx.beginPath();
      ctx.roundRect(cx - coreTagW / 2, coreTagY - 8.5, coreTagW, 17, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fde68a';
      ctx.fillText(d.cvCoreLbl, cx, coreTagY + 3.5);

      ctx.fillStyle = 'rgba(203, 213, 225, 0.88)';
      ctx.font = '600 11.8px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('👆 ' + d.cvClickHint, 10, h - 8);
      ctx.restore();
    }

    drawSpectrumEffect() {
      const setup = this.setupCanvas(this.specCanvas);
      if (!setup) return;
      const { ctx, w, h } = setup;
      const d = this.dict();
      const cfg = ZONE_CONFIG[this.zone];
      const deltas = this.aged ? cfg.deltasAged : cfg.deltasFresh;

      ctx.clearRect(0, 0, w, h);

      const padL = 42;
      const padR = 10;
      const padT = 25;
      const padB = 22;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;
      const zeroY = padT + plotH * 0.54;
      const maxPosDb = 6.8;
      const maxNegDb = 5.2;

      // Zone background bands (H1-H4, H5-H8, H9-H12)
      const bandW = plotW / 3;
      const bands = [
        { lbl: d.specLow, col: 'rgba(234, 179, 8, 0.065)' },
        { lbl: d.specMid, col: 'rgba(248, 113, 113, 0.055)' },
        { lbl: d.specHigh, col: 'rgba(56, 189, 248, 0.065)' }
      ];
      bands.forEach((b, idx) => {
        const bx = padL + idx * bandW;
        ctx.fillStyle = b.col;
        ctx.fillRect(bx, padT, bandW - 2, plotH);
        ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
        ctx.font = '700 11.6px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.lbl, bx + bandW / 2, 14);
      });

      // Zero dB baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(padL, zeroY);
      ctx.lineTo(w - padR, zeroY);
      ctx.stroke();

      ctx.fillStyle = 'rgba(186, 199, 218, 0.86)';
      ctx.font = '600 11px ui-monospace, SFMono-Regular, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('+6 dB', padL - 6, padT + 9);
      ctx.fillText('0 dB', padL - 6, zeroY + 3.5);
      ctx.fillText('-4 dB', padL - 6, padT + plotH - 2);

      // 12 Partial Bars (H1..H12)
      const stepX = plotW / 12;
      const barW = Math.max(12, stepX * 0.58);
      const useComma = this.lang === 'de';

      for (let i = 0; i < 12; i++) {
        const val = deltas[i];
        const bx = padL + i * stepX + (stepX - barW) / 2;
        const barH = val >= 0
          ? (Math.min(maxPosDb, val) / maxPosDb) * (plotH * 0.40)
          : (Math.min(maxNegDb, Math.abs(val)) / maxNegDb) * (plotH * 0.30);
        const by = val >= 0 ? zeroY - barH : zeroY;

        let barCol = '#38bdf8';
        if (this.zone === 'rivet') {
          barCol = val >= 0 ? '#eab308' : '#64748b';
        } else if (this.zone === 'lateral_ok') {
          barCol = this.aged && i >= 6 ? '#f59e0b' : '#38bdf8';
        } else if (this.zone === 'lateral_over') {
          barCol = val < 0 ? '#ef4444' : '#f97316';
        } else if (this.zone === 'crown') {
          barCol = val < 0 ? '#ef4444' : '#fb7185';
        }

        ctx.fillStyle = barCol;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, Math.max(2, barH), 3.5);
        ctx.fill();

        // Signed dB value label (matched to Slide 27/28)
        if (Math.abs(val) >= 0.1) {
          const numStr = (val > 0 ? '+' : '') + (useComma ? val.toFixed(1).replace('.', ',') : val.toFixed(1));
          ctx.fillStyle = val < 0 ? '#fca5a5' : '#fef08a';
          ctx.font = '700 10.2px ui-monospace, SFMono-Regular, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(numStr, bx + barW / 2, val >= 0 ? Math.max(padT + 9, by - 4) : Math.min(padT + plotH - 3, by + barH + 10));
        }

        // H1..H12 X-axis label
        ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
        ctx.font = '700 11.2px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`H${i + 1}`, bx + barW / 2, h - 5);
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.feltLacquerHardening = new FeltLacquerHardeningSim();
    window.feltLacquerHardening.init();
  });
})();
