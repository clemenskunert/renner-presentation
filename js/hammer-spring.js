/**
 * Louis Renner Masterclass Presentation
 * Slide 34 (Chapter 5): Die komplexe Feder Hammerkopf — Von Cristofori zur Zonen-Balance
 * - 1. Cristofori-Röllchen (1700) vs. 2. Renner-Spannungsfeder
 * - 2:1 Compaction Gradient (Scheitel -> 1/2 Flanke) & Outer-Contour Force Transfer
 * - 5-Stage Parameter Toggle Bars + Resulting Playable Dynamics (pp - ff)
 * - Partial Structure Shift H1..H12 (ΔdB & Level + ΔdB) + Web Audio Synthesis
 * - Full 4-Language Localization (DE, EN, JA, ZH) & Active-Slide Lifecycle Management
 */

(function () {
      'use strict';

      const I18N = {
        de: {
          prvSub: 'INTERAKTIVE VORSCHAU • DIE KOMPLEXE FEDER HAMMERKOPF',
          cat: 'Teil 5: Intonation • Federphysik, Verdichtungszonen & Dynamikgrenzen',
          title: 'Die komplexe Feder Hammerkopf: Von Cristofori zur Zonen-Balance',
          subtitle: 'Wie Elastizität, 2:1-Verdichtung (Scheitel → ½ Flanke) und der Übergang den Dynamikumfang (pp bis ff) bestimmen',
          m1: '📜 1. Cristofori-Röllchen (1700)',
          m2: '🎹 2. Renner-Spannungsfeder',
          loopOn: '⏸ Bounce aktiv',
          loopOff: '▶ Auto-Bounce',
          reset: '↺ Ideal',
          strikeBtn: 'Anschlag & Ton',
          curveBadge: 'TEILTONSTRUKTUR',
          curveTitle: 'Änderung der Teiltonstruktur (H1–H12 in dB)',
          specBtnDelta: 'ΔdB-Änderung',
          specBtnAbs: 'Pegel + ΔdB',
          specZone1: 'H1–H3 Fundament & Fülle',
          specZone2: 'H4–H7 Klangkern (Cantabile)',
          specZone3: 'H8–H12 Brillanz & Schärfe',
          specStatusOk: (tau) => `τc = ${tau} ms · Obertöne frei`,
          specStatusNoPp: '⚠ H5–H12 zu stark → kein pp!',
          specStatusNoFf: (tau) => `⚠ τc = ${tau} ms ↑ → Obertöne gedämpft`,
          specStatusBlock: (tau) => `⚠ H1–H3 ↓ · H4–H6 hart · τc = ${tau} ms ↑`,
          specRoles: ['Grundton', 'Oktave', 'Quinte', '2. Okt.', 'Gr. Terz', 'Quinte', '7. Sept.', '3. Okt.', 'Sekunde', 'Gr. Terz', '11. Teilt.', 'Duodez.'],
          c1: '1. Filz-Elastizität & Oberflächenspannung',
          steps1: ['1 · Träge', '2 · Schwach', '3 · Mittel', '4 · Elastisch', '5 · Max.'],
          c2: '2. Hammerkopf-Form (Scheitelradius)',
          steps2: ['1 · Breit', '2 · Rund', '3 · Konzert', '4 · Schlank', '5 · Spitz'],
          c3: '3. Scheitel-Verdichtung (Flanke = ½)',
          steps3: ['1 · Weich', '2 · Sanft', '3 · Ideal', '4 · Fest', '5 · Zu hart'],
          c3ValR: (ap, fl) => `Scheitel ${ap} % · Flanke ${fl} %`,
          c3ValC: (d) => `Wicklung ${d} %`,
          c4: '4. Übergang Scheitel → Flanke (Außenkontur)',
          steps4: ['1 · Frei', '2 · Offen', '3 · Fest', '4 · Steif', '5 · Sperrt ✕'],
          c4Open: (pct) => `Kraftfluss frei (${pct} % Flanke)`,
          c4Mid: (pct) => `Teil-Sperre (${pct} % Flanke)`,
          c4Block: (pct) => `Blockiert! (${pct} % Flanke)`,
          dynLbl: 'Spielbare Dynamik (Ergebnis)',
          dynFull: '✓ Volles Spektrum (pp – ff)',
          dynNoPp: '⚠ Kein pp (Ansatz zu hart)',
          dynNoFf: '⚠ Kein ff (τc verlängert)',
          dynNone: '✕ Kein pp & kein ff!',
          dynNotePpOk: '✓ pp frei (weicher Ansatz)',
          dynNotePpWarn: '△ pp erschwert (Scheitel fest)',
          dynNotePpNo: '✕ Kein pp: Scheitel/Übergang zu hart',
          dynNoteFfOk: '✓ ff frei (kurze τc · elastisch)',
          dynNoteFfWarn: '△ ff begrenzt (τc steigt)',
          dynNoteFfNo: '✕ Kein ff: Zu steif → τc verlängert',
          kpi1: 'Rückstellkraft',
          kpi2: 'Kontaktzeit τc',
          kpi3: 'Toncharakter',
          hystSub: (loss) => `${loss} % Hysterese-Verlust`,
          tauFast: 'Schneller Ring-Abprall',
          tauIdeal: 'Kurze τc · ff entfaltet frei',
          tauWarn: '△ τc steigt · ff begrenzt',
          tauSlow: '⚠ Verlängert → kein ff!',
          toneSoft: 'Samtig-weich (feines pp)',
          toneIdeal: 'Singend (pp bis ff)',
          toneCrisp: 'Silbrig-klar (piano & forte)',
          toneHardNoPp: 'Hart im Ansatz (kein pp!)',
          toneStiffNoFf: 'Matt & gedämpft (kein ff!)',
          toneBlocked: 'Hart & abgedämpft (kein pp/ff)',
          cvForceVec: 'F_Feder',
          cvString: '3-chörige Stahlsaite (Anschlagspunkt)',
          cvCristoforiTop: 'Hirschleder-Polster (Kontaktzone)',
          cvCristoforiRing: 'Pergament-Röhrchen (Oberflächenspannung σ)',
          cvCristoforiHollow: 'Hohler Federkern (0 tote Masse)',
          cvZoneCrown: 'SCHEITEL',
          cvZoneFlank: 'FLANKE',
          cvCallCrown: (ap) => `Scheitel: höchste Dichte (${ap} %)`,
          cvCallContourOpen: 'Übergang (Scheitel→Flanke): Kraftfluss frei',
          cvCallContourBlock: '⚠ Zu steifer Übergang: sperrt Flanke & pp!',
          cvCallFlankOpen: (fl) => `Breiteste Flanke: ½ Dichte (${fl} %) · federt`,
          cvCallFlankBlock: (fl) => `Untere Flanke (${fl} % = ½): abgekoppelt!`,
          cvRennerFix: 'Faser-Auslauf auf Holz · Klebstoff + Niete',
          cvFlowOpen: (pct) => `✓ Kraftfluss → Flanke (${pct} %)`,
          cvFlowBlock: '✕ Flanke gesperrt · τc ↑',
          phRest: 'Ruhelage · Vorgespannter Federbogen',
          phApproach: '① Anflug: Hammer-Impuls ↑ zur Saite',
          phCompressC: '② Einfederung: Ovalisierung ↔ & Ring-Zug σ',
          phCompressR: '② Einfederung: Scheitel → Flanke (½) federt ↔ bis zur Niete',
          phCompressBlock: '② Einfederung: ⚠ Zu steifer Filz sperrt Flanke & verlängert τc!',
          phPushoff: '③ Scheitelpunkt: Impuls ↑ Saite · Rückstoß ↓ beginnt',
          phRebound: '④ Elastischer Rückprall: F_Bounce ↓ von der Saite weg',
          cvFiberTitle: 'Zonen- & Faser-Lupe',
          cvFiberCristofori: 'Leder + gespanntes Pergament',
          cvLoupeCrown: (ap) => `Scheitel (${ap}%): hochverdichtet`,
          cvLoupeFlank: (fl) => `Flanke (${fl}% = ½): elastisch`,
          cvLoupeFooterOpen: 'Elastisch · pp bis ff offen',
          cvLoupeFooterNoPp: '⚠ Zu hart: kein pp möglich!',
          cvLoupeFooterNoFf: '⚠ Unelastisch: τc ↑ · kein ff!',
          cvLoupeFooterBlock: '⚠ Zu steif: kein pp / kein ff!',
          cvLeftPlot: 'Federkennlinie F(x) & Hysterese',
          cvRightPlot: 'Kraftimpuls F(t) & Kontaktzeit τc',
          cvCurveNoPp: '⚠ Harter Ansatz → kein pp',
          cvCurveKink: '⚠ Flanke sperrt → Hysterese ↑',
          cvPulseLongTau: '⚠ τc verlängert → kein ff!',
          cvAxisX: 'Einfederung x (mm)',
          cvAxisT: 'Kontaktzeit t (ms)',
          roPrinC: 'Ringfeder + Hirschleder (1700)',
          roPrinR: (ap, fl) => `Scheitel ${ap} % → Flanke ${fl} % (½) · pp–ff`,
          roPrinNoPp: (ap) => `⚠ Scheitel (${ap} %) zu hart → kein pp`,
          roPrinNoFf: (tau) => `⚠ Unelastisch → τc = ${tau} ms (kein ff)`,
          roPrinBlock: '⚠ Übergang sperrt → τc verlängert',
          roDef: (dz, fmax) => `Δz: ${dz} mm · F_max: ${fmax} N`,
          roTone: (lbl, db) => `${lbl} (${db})`,
          expBadgeC: '✦ CRISTOFORIS UR-PRINZIP (1700)',
          expTitleC: 'Das belederte Röllchen: Maximale Elastizität für „col piano e forte“',
          expBodyC: (reb, tau) =>
            `Bartolomeo Cristoforis <strong>beledertes Pergament-Röllchen</strong> nutzt die <strong>Oberflächenspannung</strong> des hohlen Rings: Sanftes Hirschleder formt das <em>piano</em>, während <strong>${reb} % Rückstellkraft</strong> (<strong>τc ≈ ${tau} ms</strong>) das Röhrchen blitzschnell von der Saite löst.`,
          expBulletC:
            `<strong>Schlüssel-Erkenntnis:</strong> Nur echte <strong>Elastizität durch Spannung</strong> hält die Kontaktzeit kurz — bloße starre Steifigkeit ohne Federweg würde die Saite abdämpfen.`,
          expBadgeR: '✦ ZONEN-BALANCE FÜR VOLLES DYNAMIKFENSTER (pp ↔ ff)',
          expTitleR: 'Geschmeidiger Scheitel-Übergang für pp — elastische ½-Flanke für ff',
          expBodyR: (reb, tau, hardDb, ap, fl) =>
            `Der harmonische Übergang vom <strong>Scheitel (${ap} %)</strong> in die halb so dichte <strong>Flanke (${fl} % = ½)</strong> ermöglicht feinstes <em>Pianissimo</em>; zugleich sorgt hohe Filz-Elastizität (<strong>${reb} % Bounce</strong>) für kurze <strong>τc ≈ ${tau} ms</strong> und volles <em>Fortissimo</em> (<strong>${hardDb}</strong>).`,
          expBulletR:
            `<strong>Warum Dynamik kein freier Regler ist:</strong> Nur wenn Anfangsnachgiebigkeit (für <em>pp</em>) und elastischer Flanken-Rückprall (für <em>ff</em>) zusammenspielen, steht die gesamte Dynamikspanne offen.`,
          expBadgeNoPp: '⚠️ DYNAMIKVERLUST OBEN: KEIN PIANISSIMO (pp)',
          expTitleNoPp: 'Zu harter Scheitel & Übergang lassen kein zartes Pianissimo zu!',
          expBodyNoPp: (ap, tau, hardDb) =>
            `Bei einem zu harten <strong>Scheitel (${ap} %)</strong> bzw. verhärtetem Übergang zur Flanke fehlt das feine Anfangspolster: Selbst sanftester Anschlag prallt sofort auf eine harte Schale (<strong>${hardDb}</strong>, <strong>τc ≈ ${tau} ms</strong>) — <strong>ein Pianissimo kann nicht entstehen</strong>.`,
          expBulletNoPp:
            `<strong>Intonations-Abhilfe:</strong> Behutsames Lockern der Übergangszone nach dem Scheitel stellt die feine Anfangsnachgiebigkeit für das <em>pp</em> wieder her, ohne den Kern zu schwächen.`,
          expBadgeNoFf: '⚠️ VERLÄNGERTE KONTAKTZEIT: KEIN FORTISSIMO (ff)',
          expTitleNoFf: 'Unzureichende Elastizität durch steifen/trägen Filz verlängert τc!',
          expBodyNoFf: (reb, tau) =>
            `Fehlt dem Filz die elastische Rückstellkraft (nur <strong>${reb} % Bounce</strong>), federt der Hammerkopf nicht schnell genug zurück: Die <strong>Kontaktzeit verlängert sich auf τc ≈ ${tau} ms</strong>, der Hammer dämpft die schwingende Saite ab — <strong>ein Fortissimo kann nicht entstehen</strong>.`,
          expBulletNoFf:
            `<strong>Physik-Kernpunkt:</strong> Für tragfähiges <em>ff</em> braucht der Hammerkopf maximale innere <strong>Spannungs-Elastizität</strong> statt träger Masse oder steifer Reibung.`,
          expBadgeBlock: '⚠️ DOPPEL-SPERRE: WEDER PIANISSIMO NOCH FORTISSIMO',
          expTitleBlock: 'Zu harter Übergang sperrt pp — fehlende Flanken-Elastizität verhindert ff!',
          expBodyBlock: (flankPct, tau) =>
            `Der zu steife Übergang nach dem Scheitel verhindert jedes weiche <strong>Pianissimo</strong>; gleichzeitig koppelt er die elastische ½-Flanke ab (nur <strong>${flankPct} % aktiv</strong>). Durch die unzureichende Elastizität <strong>verlängert sich τc auf ${tau} ms</strong> und würgt das <strong>Fortissimo</strong> ab.`,
          expBulletBlock:
            `<strong>Intonations-Diagnose:</strong> Gezieltes Öffnen der steifen Außenkontur zwischen Scheitel und Flanke gibt sowohl den sanften <em>pp</em>-Ansatz als auch die schnelle Flankenfederung für <em>ff</em> frei.`
        },
        en: {
          prvSub: 'INTERACTIVE PREVIEW • THE HAMMERHEAD AS A COMPLEX SPRING',
          cat: 'Part 5: Voicing • Spring Physics, Compaction Zones & Dynamic Limits',
          title: 'The Hammerhead as a Complex Spring: From Cristofori to Zone Balance',
          subtitle: 'How elasticity, 2:1 crown-to-flank compaction, and transition stiffness govern playable dynamics (pp to ff)',
          m1: '📜 1. Cristofori Roll (1700)',
          m2: '🎹 2. Renner Tension Spring',
          loopOn: '⏸ Bounce Active',
          loopOff: '▶ Auto-Bounce',
          reset: '↺ Ideal',
          strikeBtn: 'Strike & Tone',
          curveBadge: 'PARTIAL STRUCTURE',
          curveTitle: 'Change in Partial Structure (H1–H12 in dB)',
          specBtnDelta: 'ΔdB Shift',
          specBtnAbs: 'Level + ΔdB',
          specZone1: 'H1–H3 Fundamental & Warmth',
          specZone2: 'H4–H7 Singing Core (Cantabile)',
          specZone3: 'H8–H12 Brilliance & Edge',
          specStatusOk: (tau) => `τc = ${tau} ms · overtones open`,
          specStatusNoPp: '⚠ H5–H12 excessive → no pp!',
          specStatusNoFf: (tau) => `⚠ τc = ${tau} ms ↑ → overtones damped`,
          specStatusBlock: (tau) => `⚠ H1–H3 ↓ · H4–H6 harsh · τc = ${tau} ms ↑`,
          specRoles: ['Fundam.', 'Octave', '5th', '2nd Oct', 'Maj 3rd', '5th', '7th', '3rd Oct', 'Maj 2nd', 'Maj 3rd', '11th', '12th'],
          c1: '1. Felt Elasticity & Surface Tension',
          steps1: ['1 · Dead', '2 · Weak', '3 · Medium', '4 · Elastic', '5 · Max'],
          c2: '2. Hammerhead Shape (Crown Radius)',
          steps2: ['1 · Wide', '2 · Round', '3 · Concert', '4 · Slender', '5 · Pointed'],
          c3: '3. Crown Compaction (Flank = ½)',
          steps3: ['1 · Soft', '2 · Gentle', '3 · Ideal', '4 · Firm', '5 · Too Hard'],
          c3ValR: (ap, fl) => `Crown ${ap}% · Flank ${fl}%`,
          c3ValC: (d) => `Roll Winding ${d}%`,
          c4: '4. Crown → Flank Transition (Outer Contour)',
          steps4: ['1 · Open', '2 · Supple', '3 · Firm', '4 · Stiff', '5 · Locked ✕'],
          c4Open: (pct) => `Open Flow (${pct}% Flank)`,
          c4Mid: (pct) => `Partial Block (${pct}% Flank)`,
          c4Block: (pct) => `Blocked! (${pct}% Flank)`,
          dynLbl: 'Playable Dynamics (Outcome)',
          dynFull: '✓ Full Range (pp – ff)',
          dynNoPp: '⚠ No pp (Crown/Transition Hard)',
          dynNoFf: '⚠ No ff (τc Prolonged)',
          dynNone: '✕ Neither pp nor ff!',
          dynNotePpOk: '✓ pp open (supple crown)',
          dynNotePpWarn: '△ pp restricted (hard crown)',
          dynNotePpNo: '✕ No pp: crown/transition too hard',
          dynNoteFfOk: '✓ ff open (short τc · elastic)',
          dynNoteFfWarn: '△ ff capped (τc rising)',
          dynNoteFfNo: '✕ No ff: too stiff → τc prolonged',
          kpi1: 'Restoring Force',
          kpi2: 'Contact Time τc',
          kpi3: 'Tonal Character',
          hystSub: (loss) => `${loss}% hysteresis loss`,
          tauFast: 'Crisp hollow-ring rebound',
          tauIdeal: 'Short τc · free ff bloom',
          tauWarn: '△ τc rising · ff capped',
          tauSlow: '⚠ Prolonged → chokes ff!',
          toneSoft: 'Velvety soft (delicate pp)',
          toneIdeal: 'Singing (full pp to ff)',
          toneCrisp: 'Silvery-clear (piano & forte)',
          toneHardNoPp: 'Harsh onset (no pp!)',
          toneStiffNoFf: 'Dull & choked (no ff!)',
          toneBlocked: 'Harsh & choked (no pp/ff)',
          cvForceVec: 'F_Spring',
          cvString: 'Tri-chord steel string (strike point)',
          cvCristoforiTop: 'Deer-leather pad (contact zone)',
          cvCristoforiRing: 'Parchment tube (surface tension σ)',
          cvCristoforiHollow: 'Hollow spring core (0 dead mass)',
          cvZoneCrown: 'CROWN',
          cvZoneFlank: 'FLANK',
          cvCallCrown: (ap) => `Crown: peak compaction (${ap}%)`,
          cvCallContourOpen: 'Transition (Crown→Flank): force flow open',
          cvCallContourBlock: '⚠ Stiff transition: blocks flank & pp!',
          cvCallFlankOpen: (fl) => `Widest flank: ½ density (${fl}%) · flexes`,
          cvCallFlankBlock: (fl) => `Lower flank (${fl}% = ½): decoupled!`,
          cvRennerFix: 'Fibers taper onto wood · Glue + rivet',
          cvFlowOpen: (pct) => `✓ Force Flow → Flank (${pct}%)`,
          cvFlowBlock: '✕ Flank Locked · τc ↑',
          phRest: 'At Rest · Pre-tensioned spring arch',
          phApproach: '① Approach: Hammer impulse ↑ toward string',
          phCompressC: '② Compression: Ovalization ↔ & ring tension σ',
          phCompressR: '② Compression: Crown → ½ Flank flexes ↔ down to rivet',
          phCompressBlock: '② Compression: ⚠ Stiff felt locks flank & prolongs τc!',
          phPushoff: '③ Peak Load: Impulse ↑ to string · Rebound ↓ starts',
          phRebound: '④ Elastic Rebound: F_Bounce ↓ away from string',
          cvFiberTitle: 'Zone & Fiber Zoom',
          cvFiberCristofori: 'Leather + tensioned parchment',
          cvLoupeCrown: (ap) => `Crown (${ap}%): peak density`,
          cvLoupeFlank: (fl) => `Flank (${fl}% = ½): elastic`,
          cvLoupeFooterOpen: 'Elastic · full pp to ff open',
          cvLoupeFooterNoPp: '⚠ Too hard: no pp possible!',
          cvLoupeFooterNoFf: '⚠ Inelastic: τc ↑ · no ff!',
          cvLoupeFooterBlock: '⚠ Too stiff: no pp / no ff!',
          cvLeftPlot: 'Spring Curve F(x) & Hysteresis',
          cvRightPlot: 'Force Impulse F(t) & Contact Time τc',
          cvCurveNoPp: '⚠ Hard onset → no pp',
          cvCurveKink: '⚠ Flank locked → hysteresis ↑',
          cvPulseLongTau: '⚠ τc prolonged → no ff!',
          cvAxisX: 'Deflection x (mm)',
          cvAxisT: 'Contact time t (ms)',
          roPrinC: 'Hollow parchment ring-spring + leather (1700)',
          roPrinR: (ap, fl) => `Crown ${ap}% → Flank ${fl}% (½) · pp–ff open`,
          roPrinNoPp: (ap) => `⚠ Crown (${ap}%) / transition too hard → no pp`,
          roPrinNoFf: (tau) => `⚠ Inelastic felt → τc = ${tau} ms (no ff)`,
          roPrinBlock: '⚠ Stiff felt/transition → τc prolonged',
          roDef: (dz, fmax) => `Δz: ${dz} mm · F_max: ${fmax} N`,
          roTone: (lbl, db) => `${lbl} (${db})`,
          expBadgeC: '✦ CRISTOFORI’S ORIGINAL PRINCIPLE (1700)',
          expTitleC: 'The Leathered Roll: Surface-Tension Elasticity for “col piano e forte”',
          expBodyC: (reb, tau) =>
            `Cristofori’s <strong>leathered hollow parchment roll</strong> harnesses circumferential <strong>surface tension</strong>: supple deer leather shapes <em>piano</em>, while <strong>${reb}% restoring force</strong> keeps contact time short (<strong>τc ≈ ${tau} ms</strong>) for crisp release.`,
          expBulletC:
            `<strong>Core Insight:</strong> True <strong>tensioned elasticity</strong> keeps contact time short — dead stiffness without elastic rebound lingers on the string and smothers tone.`,
          expBadgeR: '✦ ZONE BALANCE FOR FULL DYNAMIC RANGE (pp ↔ ff)',
          expTitleR: 'Supple Crown Transition for pp — Elastic ½-Flank Rebound for ff',
          expBodyR: (reb, tau, hardDb, ap, fl) =>
            `A smooth handoff from the <strong>Crown (${ap}%)</strong> into the half-compacted <strong>Flank (${fl}% = ½)</strong> enables delicate <em>pianissimo</em>, while high felt elasticity (<strong>${reb}% bounce</strong>) keeps <strong>τc ≈ ${tau} ms</strong> short for powerful <em>fortissimo</em> (<strong>${hardDb}</strong>).`,
          expBulletR:
            `<strong>Why Dynamics Are an Outcome:</strong> Playable <em>pp</em> to <em>ff</em> is never an arbitrary setting — it emerges only when gentle crown compliance and fast flank elasticity work together.`,
          expBadgeNoPp: '⚠️ LOSS OF PIANISSIMO (NO pp)',
          expTitleNoPp: 'Overly Hard Crown & Transition Prevent Delicate Pianissimo!',
          expBodyNoPp: (ap, tau, hardDb) =>
            `When the <strong>Crown (${ap}%)</strong> and transition to the flank are too hard, gentle initial compliance vanishes: even the lightest touch hits an unyielding shell (<strong>${hardDb}</strong>, <strong>τc ≈ ${tau} ms</strong>) — <strong>no pianissimo can form</strong>.`,
          expBulletNoPp:
            `<strong>Voicing Remedy:</strong> Carefully relieving the stiffened transition behind the crown restores supple initial cushioning for <em>pp</em> without sacrificing core support.`,
          expBadgeNoFf: '⚠️ PROLONGED CONTACT TIME (NO ff)',
          expTitleNoFf: 'Insufficient Elasticity from Stiff/Sluggish Felt Prolongs τc!',
          expBodyNoFf: (reb, tau) =>
            `With insufficient felt elasticity (only <strong>${reb}% bounce</strong>), the hammer fails to snap off the string: <strong>contact time lengthens to τc ≈ ${tau} ms</strong>, damping the vibrating string so <strong>no fortissimo can develop</strong>.`,
          expBulletNoFf:
            `<strong>Acoustic Law:</strong> True carrying <em>ff</em> requires rapid elastic energy return — an overly stiff, inelastic hammer lingers on the string and chokes its own output.`,
          expBadgeBlock: '⚠️ DOUBLE DYNAMIC COLLAPSE: NEITHER pp NOR ff',
          expTitleBlock: 'Hard Transition Kills pp — Stiff Felt Prolongs τc and Chokes ff!',
          expBodyBlock: (flankPct, tau) =>
            `An overly hard crown-to-flank transition blocks delicate <strong>pianissimo</strong>, while locking out the ½-flank (only <strong>${flankPct}% active</strong>) robs the head of elasticity: <strong>τc lengthens to ${tau} ms</strong>, smothering the string and preventing <strong>fortissimo</strong>.`,
          expBulletBlock:
            `<strong>Voicing Diagnosis:</strong> Opening the stiff outer-contour bridge between crown and flank restores both gentle <em>pp</em> touch and fast elastic flank rebound for <em>ff</em>.`
        },
        ja: {
          prvSub: 'インタラクティブ試写 • 複合スプリングとしてのハンマーヘッド',
          cat: '第5部：整音技術 • ばね物理・圧縮ゾーンとダイナミクス限界',
          title: '複合スプリングとしてのハンマーヘッド：クリストフォリからゾーン均衡へ',
          subtitle: '弾性・2:1密度分布（クラウン→½フランク）・移行帯の硬さが演奏可能な pp〜ff 幅を決定する',
          m1: '📜 1. クリストフォリの革巻きロール (1700)',
          m2: '🎹 2. レンナー張力スプリング',
          loopOn: '⏸ バウンス中',
          loopOff: '▶ 自動バウンス',
          reset: '↺ 基準値',
          strikeBtn: '打弦と音色',
          curveBadge: '倍音構造の変化',
          curveTitle: '倍音構造の増減変化 (H1–H12 · dB)',
          specBtnDelta: 'ΔdB 増減',
          specBtnAbs: 'レベル + ΔdB',
          specZone1: 'H1–H3 基音・豊かさ',
          specZone2: 'H4–H7 歌唱核 (Cantabile)',
          specZone3: 'H8–H12 輝かしさ・鋭さ',
          specStatusOk: (tau) => `τc = ${tau} ms · 倍音開放`,
          specStatusNoPp: '⚠ H5–H12 過多 → pp 不可!',
          specStatusNoFf: (tau) => `⚠ τc = ${tau} ms ↑ → 高次倍音減衰`,
          specStatusBlock: (tau) => `⚠ H1–H3 ↓ · H4–H6 過硬 · τc = ${tau} ms ↑`,
          specRoles: ['基音', '8度', '5度', '2Oct', '長3度', '5度', '7倍音', '3Oct', '長2度', '長3度', '11倍音', '12度'],
          c1: '1. フェルト弾性と表面張力',
          steps1: ['1 · 鈍重', '2 · 低弾性', '3 · 中程度', '4 · 高弾性', '5 · 最大'],
          c2: '2. ハンマー形状（クラウン曲率半径）',
          steps2: ['1 · 広角', '2 · 丸型', '3 · 標準', '4 · 細身', '5 · 鋭角'],
          c3: '3. クラウン圧縮密度（フランク＝½）',
          steps3: ['1 · 柔軟', '2 · 穏やか', '3 · 最適', '4 · 硬め', '5 · 過硬'],
          c3ValR: (ap, fl) => `クラウン ${ap}% · フランク ${fl}%`,
          c3ValC: (d) => `ロール巻密度 ${d}%`,
          c4: '4. クラウン→フランク移行帯（外周輪郭）',
          steps4: ['1 · 開放', '2 · 柔軟', '3 · やや硬', '4 · 硬直', '5 · 遮断 ✕'],
          c4Open: (pct) => `伝達良好 (フランク ${pct}%)`,
          c4Mid: (pct) => `一部遮断 (フランク ${pct}%)`,
          c4Block: (pct) => `伝達遮断! (フランク ${pct}%)`,
          dynLbl: '演奏可能なダイナミクス（結果）',
          dynFull: '✓ 全ダイナミクス開放 (pp – ff)',
          dynNoPp: '⚠ pp 不可（先端・移行帯が過硬）',
          dynNoFf: '⚠ ff 不可（τc 延長・弦減衰）',
          dynNone: '✕ pp も ff も成立不可！',
          dynNotePpOk: '✓ pp 可能（柔軟な初期応答）',
          dynNotePpWarn: '△ pp 困難（クラウン過硬）',
          dynNotePpNo: '✕ pp 不可：クラウン／移行帯が硬すぎる',
          dynNoteFfOk: '✓ ff 可能（短い τc・高弾性）',
          dynNoteFfWarn: '△ ff 頭打ち（τc 増加）',
          dynNoteFfNo: '✕ ff 不可：過硬で弾性不足 → τc 延長',
          kpi1: '弾性復元力',
          kpi2: '接触時間 τc',
          kpi3: '音色と応答',
          hystSub: (loss) => `ヒステリシス損失 ${loss}%`,
          tauFast: '素早い中空リング離弦',
          tauIdeal: '短い τc・豊かな ff 開放',
          tauWarn: '△ τc やや増加・ff 頭打ち',
          tauSlow: '⚠ 接触延長 → ff 減衰！',
          toneSoft: 'ビロードの柔らかさ (pp)',
          toneIdeal: '歌うような響き (pp〜ff)',
          toneCrisp: '銀色の透明感 (piano & forte)',
          toneHardNoPp: '立ち上がり過硬 (pp 不可!)',
          toneStiffNoFf: '鈍く詰まる音 (ff 不可!)',
          toneBlocked: '硬く詰まった音 (pp/ff 不可)',
          cvForceVec: 'F_弾性',
          cvString: '3本同音スチール弦（打弦点）',
          cvCristoforiTop: '鹿革パッド（接触ゾーン）',
          cvCristoforiRing: '羊皮紙ロール（外周の表面張力 σ）',
          cvCristoforiHollow: '中空スプリング核（死荷重ゼロ）',
          cvZoneCrown: 'クラウン',
          cvZoneFlank: 'フランク',
          cvCallCrown: (ap) => `クラウン：最高圧縮密度 (${ap}%)`,
          cvCallContourOpen: '移行帯（クラウン→フランク）：力の伝達良好',
          cvCallContourBlock: '⚠ 過硬な移行帯：フランク遮断・pp 喪失！',
          cvCallFlankOpen: (fl) => `最広部フランク：½密度 (${fl}%)・弾性変形`,
          cvCallFlankBlock: (fl) => `フランク下部 (${fl}% = ½)：力から孤立！`,
          cvRennerFix: '木芯への繊維終端・接着剤＋リベット固定',
          cvFlowOpen: (pct) => `✓ フランク伝達 (${pct}%)`,
          cvFlowBlock: '✕ フランク遮断・τc 延長↑',
          phRest: '静止状態・予張力スプリング構造',
          phApproach: '① 打弦接近：弦へ向かう上向き運動量 ↑',
          phCompressC: '② 圧縮変形：楕円化 ↔ と外周表面張力 σ',
          phCompressR: '② 圧縮変形：クラウン → ½フランクが弾性膨張 ↔',
          phCompressBlock: '② 圧縮変形：⚠ 硬直フェルトが弾性を奪い τc を延長！',
          phPushoff: '③ 最大圧縮：弦への推進力 ↑・離弦反発 ↓ 開始',
          phRebound: '④ 弾性リバウンド：下向き復元力 F_Bounce ↓',
          cvFiberTitle: 'ゾーン＆繊維拡大図',
          cvFiberCristofori: '鹿革＋張力巻き羊皮紙',
          cvLoupeCrown: (ap) => `クラウン (${ap}%)：高密度`,
          cvLoupeFlank: (fl) => `フランク (${fl}% = ½)：柔軟弾性`,
          cvLoupeFooterOpen: '高弾性・pp〜ff 全域開放',
          cvLoupeFooterNoPp: '⚠ 先端過硬：pp 成立不可！',
          cvLoupeFooterNoFf: '⚠ 弾性不足：τc 延長・ff 不可！',
          cvLoupeFooterBlock: '⚠ 過硬・低弾性：pp/ff 喪失！',
          cvLeftPlot: 'ばね特性曲線 F(x) とヒステリシス',
          cvRightPlot: '打撃パルス F(t) と接触時間 τc',
          cvCurveNoPp: '⚠ 初期過硬 → pp 不可',
          cvCurveKink: '⚠ フランク遮断 → 損失増大',
          cvPulseLongTau: '⚠ τc 延長 → ff 不可！',
          cvAxisX: '圧縮変位 x (mm)',
          cvAxisT: '接触時間 t (ms)',
          roPrinC: '中空羊皮紙リングばね＋鹿革 (1700年)',
          roPrinR: (ap, fl) => `クラウン ${ap}% → フランク ${fl}% (½) · pp–ff 開放`,
          roPrinNoPp: (ap) => `⚠ クラウン (${ap}%)／移行帯が過硬 → pp 不可`,
          roPrinNoFf: (tau) => `⚠ 弾性不足フェルト → τc = ${tau} ms (ff 不可)`,
          roPrinBlock: '⚠ 過硬フェルト／移行帯 → 接触時間 τc が延長',
          roDef: (dz, fmax) => `Δz: ${dz} mm · F_max: ${fmax} N`,
          roTone: (lbl, db) => `${lbl} (${db})`,
          expBadgeC: '✦ クリストフォリの原点原理 (1700)',
          expTitleC: '革巻きロール：「ピアノとフォルテ」を生んだ表面張力弾性',
          expBodyC: (reb, tau) =>
            `クリストフォリの<strong>革巻き中空ロール</strong>は外周全体の<strong>表面張力</strong>を活用。柔らかい鹿革が <em>piano</em> を支え、<strong>復元力 ${reb}%</strong>（<strong>τc ≈ ${tau} ms</strong>）の素早い離弦が響きを解放します。`,
          expBulletC:
            `<strong>本質的洞察：</strong> 接触時間を短く保つのは単なる硬さではなく<strong>張力による真の弾性</strong>です。弾性を欠く硬直したフェルトは弦を止めてしまいます。`,
          expBadgeR: '✦ 全ダイナミクス (pp ↔ ff) を開くゾーン均衡',
          expTitleR: 'しなやかな移行帯が pp を生み、½フランク弾性が ff を解き放つ',
          expBodyR: (reb, tau, hardDb, ap, fl) =>
            `<strong>クラウン (${ap}%)</strong> から半分の密度の<strong>フランク (${fl}% = ½)</strong> への滑らかな移行が繊細な <em>pp</em> を可能にし、高いフェルト弾性（<strong>復元 ${reb}%</strong>）が短い <strong>τc ≈ ${tau} ms</strong> で力強い <em>ff</em> を実現します（<strong>${hardDb}</strong>）。`,
          expBulletR:
            `<strong>なぜダイナミクスは結果なのか：</strong> 優しい初期クッション（<em>pp</em>）と素早いフランク復元（<em>ff</em>）の両立によってはじめて全表現幅が生まれます。`,
          expBadgeNoPp: '⚠️ ピアニッシモの喪失（pp 不可）',
          expTitleNoPp: '硬すぎるクラウンと移行帯では繊細な pp は生まれない！',
          expBodyNoPp: (ap, tau, hardDb) =>
            `<strong>クラウン (${ap}%)</strong> やフランクへの移行帯が硬すぎると初期の柔軟なクッションが失われ、最弱打でも硬い殻に衝突します（<strong>${hardDb}</strong>、<strong>τc ≈ ${tau} ms</strong>）— <strong>ピアニッシモは成立しません</strong>。`,
          expBulletNoPp:
            `<strong>整音による改善：</strong> クラウン直後の移行帯を丁寧にほぐすことで、芯を保ったまま <em>pp</em> の繊細な立ち上がりを回復できます。`,
          expBadgeNoFf: '⚠️ 接触時間 τc の延長（ff 不可）',
          expTitleNoFf: '硬直したフェルトによる弾性不足が接触時間を延ばし ff を阻む！',
          expBodyNoFf: (reb, tau) =>
            `硬すぎるフェルト等で十分な弾性が失われると（<strong>復元 ${reb}%</strong>）、ハンマーが素早く跳ね返らず<strong>接触時間が τc ≈ ${tau} ms へ延長</strong>し、弦振動自らを抑え込んで <strong>ff が出なくなります</strong>。`,
          expBulletNoFf:
            `<strong>音響物理の核心：</strong> 伸びやかな <em>ff</em> には硬直ではなく高い弾性復元力による迅速な離弦が不可欠です。`,
          expBadgeBlock: '⚠️ 二重のダイナミクス崩壊：pp も ff も出ない状態',
          expTitleBlock: '硬すぎる移行帯が pp を奪い、フランク遮断による τc 延長が ff を潰す！',
          expBodyBlock: (flankPct, tau) =>
            `クラウンからフランクへの過硬な移行帯が <strong>pp</strong> を阻み、同時に½フランクの弾性を遮断（稼働 <strong>${flankPct}%</strong>）。弾性不足により<strong>接触時間 τc が ${tau} ms に延び</strong>、弦を減衰させて <strong>ff も成立しません</strong>。`,
          expBulletBlock:
            `<strong>整音診断の要点：</strong> 外周移行ゾーンの硬化を解くことで、柔らかな <em>pp</em> と素早い弾性離弦による <em>ff</em> が同時に蘇ります。`
        },
        zh: {
          prvSub: '交互式预览 • 复杂弹簧系统：钢琴弦槌',
          cat: '第五部分：整音艺术 • 弹簧物理、压实分区与动态范围边界',
          title: '复杂弹簧系统——弦槌：从克里斯托弗里到分区张力平衡',
          subtitle: '毛毡弹性、2:1压实梯度（槌冠→½侧翼）与过渡带刚度如何决定可奏出的 pp 至 ff 动态跨度',
          m1: '📜 1. 克里斯托弗里皮包纸卷 (1700)',
          m2: '🎹 2. 雷诺复合张力弹簧弦槌',
          loopOn: '⏸ 回弹演示中',
          loopOff: '▶ 自动回弹',
          reset: '↺ 理想基准',
          strikeBtn: '击弦与音色',
          curveBadge: '泛音结构变化',
          curveTitle: '泛音结构增减变化 (H1–H12 · dB)',
          specBtnDelta: 'ΔdB 增减',
          specBtnAbs: '电平 + ΔdB',
          specZone1: 'H1–H3 基音与丰满度',
          specZone2: 'H4–H7 歌唱核心区',
          specZone3: 'H8–H12 辉煌度与锐度',
          specStatusOk: (tau) => `τc = ${tau} ms · 泛音开放`,
          specStatusNoPp: '⚠ H5–H12 过强 → 无 pp！',
          specStatusNoFf: (tau) => `⚠ τc = ${tau} ms ↑ → 高频衰减`,
          specStatusBlock: (tau) => `⚠ H1–H3 ↓ · H4–H6 生硬 · τc = ${tau} ms ↑`,
          specRoles: ['基音', '八度', '五度', '双八度', '大三度', '五度', '七泛音', '三八度', '大二度', '大三度', '十一音', '十二度'],
          c1: '1. 毛毡弹性与外层表面张力',
          steps1: ['1 · 迟滞', '2 · 偏弱', '3 · 中等', '4 · 高弹', '5 · 最大'],
          c2: '2. 弦槌几何形状（槌冠曲率半径）',
          steps2: ['1 · 宽平', '2 · 圆润', '3 · 音乐会', '4 · 修长', '5 · 尖窄'],
          c3: '3. 槌冠压实度（侧翼最宽处 ＝ ½）',
          steps3: ['1 · 偏软', '2 · 柔和', '3 · 理想', '4 · 偏硬', '5 · 过硬'],
          c3ValR: (ap, fl) => `槌冠 ${ap}% · 侧翼 ${fl}%`,
          c3ValC: (d) => `纸卷紧密度 ${d}%`,
          c4: '4. 槌冠→侧翼过渡区（外轮廓刚度）',
          steps4: ['1 · 贯通', '2 · 柔顺', '3 · 偏紧', '4 · 僵硬', '5 · 锁死 ✕'],
          c4Open: (pct) => `力流贯通 (侧翼 ${pct}%)`,
          c4Mid: (pct) => `部分受阻 (侧翼 ${pct}%)`,
          c4Block: (pct) => `力流中断! (侧翼 ${pct}%)`,
          dynLbl: '可奏出的动态范围（物理结果）',
          dynFull: '✓ 完整音乐会动态 (pp – ff)',
          dynNoPp: '⚠ 无法奏出 pp（槌冠/过渡过硬）',
          dynNoFf: '⚠ 无法奏出 ff（τc 延长闷弦）',
          dynNone: '✕ 既无 pp 也无 ff！',
          dynNotePpOk: '✓ pp 自如（表层柔顺缓冲）',
          dynNotePpWarn: '△ pp 受限（槌冠偏硬）',
          dynNotePpNo: '✕ 无 pp：槌冠与过渡带过硬',
          dynNoteFfOk: '✓ ff 充沛（短 τc · 高弹性）',
          dynNoteFfWarn: '△ ff 受抑（τc 变长）',
          dynNoteFfNo: '✕ 无 ff：毛毡过硬失弹 → τc 延长',
          kpi1: '弹性回弹力',
          kpi2: '接触时间 τc',
          kpi3: '音色与动态',
          hystSub: (loss) => `迟滞能量损耗 ${loss}%`,
          tauFast: '空心环瞬时弹离',
          tauIdeal: '短促 τc · ff 自由绽放',
          tauWarn: '△ τc 略增 · ff 受抑',
          tauSlow: '⚠ 接触延长 → 闷死 ff！',
          toneSoft: '丝绒柔和（细腻 pp）',
          toneIdeal: '如歌穿透（pp 至 ff）',
          toneCrisp: '银亮清澈（弱音与强音）',
          toneHardNoPp: '音头生硬（失去 pp！）',
          toneStiffNoFf: '沉闷憋塞（失去 ff！）',
          toneBlocked: '生硬且闷滞（无 pp/ff）',
          cvForceVec: 'F_弹力',
          cvString: '三弦组钢丝琴弦（击弦点）',
          cvCristoforiTop: '鹿皮缓冲垫（接触区）',
          cvCristoforiRing: '羊皮纸圆筒（圆周表面张力 σ）',
          cvCristoforiHollow: '中空弹簧芯（零死重）',
          cvZoneCrown: '槌冠',
          cvZoneFlank: '侧翼',
          cvCallCrown: (ap) => `槌冠：最高压实密度 (${ap}%)`,
          cvCallContourOpen: '过渡区（槌冠→侧翼）：力流顺畅贯通',
          cvCallContourBlock: '⚠ 过渡区过硬：锁死侧翼并扼杀 pp！',
          cvCallFlankOpen: (fl) => `最宽侧翼：½压实度 (${fl}%) · 弹性鼓张`,
          cvCallFlankBlock: (fl) => `下部侧翼 (${fl}% = ½)：力流断绝失活！`,
          cvRennerFix: '纤维渐窄收尾于木芯 · 胶合 + 铆钉锁紧',
          cvFlowOpen: (pct) => `✓ 力流直达侧翼 (${pct}%)`,
          cvFlowBlock: '✕ 侧翼锁死 · τc 延长↑',
          phRest: '静止状态 · 预张力复合弹簧弓',
          phApproach: '① 击弦上升：槌头向上冲量 ↑',
          phCompressC: '② 触弦压缩：横向椭圆化 ↔ 与圆周张力 σ',
          phCompressR: '② 触弦压缩：槌冠 → ½侧翼弹性外扩 ↔ 直达铆钉',
          phCompressBlock: '② 触弦压缩：⚠ 毛毡过硬失弹，锁死侧翼并延长 τc！',
          phPushoff: '③ 压缩峰值：琴弦获能 ↑ · 回弹推力 ↓ 启动',
          phRebound: '④ 弹性回弹：向下回弹合力 F_Bounce ↓',
          cvFiberTitle: '分区与纤维显微镜',
          cvFiberCristofori: '鹿皮 + 紧绷羊皮纸卷',
          cvLoupeCrown: (ap) => `槌冠 (${ap}%)：高密压实`,
          cvLoupeFlank: (fl) => `侧翼 (${fl}% = ½)：柔韧弹性`,
          cvLoupeFooterOpen: '高弹性 · pp 至 ff 全贯通',
          cvLoupeFooterNoPp: '⚠ 起音过硬：无法奏出 pp！',
          cvLoupeFooterNoFf: '⚠ 弹性不足：τc 延长 · 无 ff！',
          cvLoupeFooterBlock: '⚠ 过硬失弹：失去 pp 与 ff！',
          cvLeftPlot: '弹簧特性曲线 F(x) 与迟滞损耗',
          cvRightPlot: '冲击脉冲 F(t) 与接触时间 τc',
          cvCurveNoPp: '⚠ 起音过硬 → 无 pp',
          cvCurveKink: '⚠ 侧翼锁死 → 迟滞剧增',
          cvPulseLongTau: '⚠ τc 延长 → 无法产生 ff！',
          cvAxisX: '压缩变形量 x (mm)',
          cvAxisT: '接触时间 t (ms)',
          roPrinC: '中空羊皮纸圆筒弹簧 + 鹿皮垫 (1700)',
          roPrinR: (ap, fl) => `槌冠 ${ap}% → 侧翼 ${fl}% (½) · pp–ff 全开`,
          roPrinNoPp: (ap) => `⚠ 槌冠 (${ap}%) / 过渡过硬 → 无法产生 pp`,
          roPrinNoFf: (tau) => `⚠ 毛毡弹性不足 → τc = ${tau} ms (无 ff)`,
          roPrinBlock: '⚠ 毛毡/过渡过硬失弹 → 接触时间 τc 被延长',
          roDef: (dz, fmax) => `Δz: ${dz} mm · F_max: ${fmax} N`,
          roTone: (lbl, db) => `${lbl} (${db})`,
          expBadgeC: '✦ 克里斯托弗里的原始智慧 (1700)',
          expTitleC: '皮包纸卷弦槌：造就“弱音与强音”的表面张力弹性',
          expBodyC: (reb, tau) =>
            `克里斯托弗里的<strong>鹿皮包裹空心纸卷</strong>利用圆周<strong>表面张力</strong>：表层柔顺鹿皮塑造轻柔 <em>piano</em>，而 <strong>${reb}% 回弹力</strong>使接触时间保持极短（<strong>τc ≈ ${tau} ms</strong>），迅速脱弦。`,
          expBulletC:
            `<strong>核心物理启示：</strong> 保持短接触时间靠的是<strong>高张力弹性</strong>而非死硬；缺乏弹性的僵硬毛毡反而会滞留弦上闷死琴音。`,
          expBadgeR: '✦ 解锁完整动态跨度 (pp ↔ ff) 的分区平衡',
          expTitleR: '柔顺槌冠过渡成就 pp —— ½压实弹性侧翼释放澎湃 ff',
          expBodyR: (reb, tau, hardDb, ap, fl) =>
            `从<strong>槌冠 (${ap}%)</strong> 到减半压实<strong>侧翼 (${fl}% = ½)</strong> 的柔顺过渡赋予细腻的 <em>pp</em>；同时充沛的毛毡弹性（<strong>${reb}% 回弹</strong>）保持短促 <strong>τc ≈ ${tau} ms</strong>，支撑辉煌 <em>ff</em>（<strong>${hardDb}</strong>）。`,
          expBulletR:
            `<strong>为何动态不是独立旋钮：</strong> 唯有槌冠初始柔顺度（决定 <em>pp</em>）与侧翼快速回弹力（决定 <em>ff</em>）协同平衡，才能奏出完整动态。`,
          expBadgeNoPp: '⚠️ 弱音丧失：无法产生极弱音 (pp)',
          expTitleNoPp: '槌冠及向侧翼过渡区过硬，彻底扼杀细腻 pp！',
          expBodyNoPp: (ap, tau, hardDb) =>
            `当<strong>槌冠 (${ap}%)</strong> 与侧翼过渡带过硬时，表层初始缓冲消失：即便极轻触键也会直接撞击硬壳（<strong>${hardDb}</strong>，<strong>τc ≈ ${tau} ms</strong>）——<strong>根本无法产生柔美的 pp</strong>。`,
          expBulletNoPp:
            `<strong>整音对策：</strong> 轻柔释放槌冠后方过渡区的僵硬张力，即可在不伤内核的前提下恢复细腻 <em>pp</em> 触感。`,
          expBadgeNoFf: '⚠️ 接触时间延长：无法产生极强音 (ff)',
          expTitleNoFf: '毛毡过硬导致弹性不足，延长接触时间 τc 并闷死 ff！',
          expBodyNoFf: (reb, tau) =>
            `当过硬或松弛毛毡缺乏弹性（仅 <strong>${reb}% 回弹</strong>）时，弦槌无法迅速弹离琴弦：<strong>接触时间被延长至 τc ≈ ${tau} ms</strong>，反过来扼制琴弦振动——<strong>无法产生真正的 ff</strong>。`,
          expBulletNoFf:
            `<strong>声学铁律：</strong> 饱满的 <em>ff</em> 依赖充沛弹性带来的快速脱弦，绝非靠僵硬毛毡死顶琴弦。`,
          expBadgeBlock: '⚠️ 双重动态崩塌：既无 pp 也无 ff',
          expTitleBlock: '过硬过渡带扼杀 pp —— 侧翼断流失弹延长 τc 并闷死 ff！',
          expBodyBlock: (flankPct, tau) =>
            `槌冠后方过硬的过渡带阻断了轻柔 <strong>pp</strong>，同时切断 ½ 密度弹性侧翼（仅 <strong>${flankPct}% 参与</strong>）。由于弹性不足，<strong>接触时间 τc 延长至 ${tau} ms</strong> 闷住琴弦，<strong>同样无法产生 ff</strong>。`,
          expBulletBlock:
            `<strong>整音诊断关键：</strong> 精准疏通槌冠至侧翼的外轮廓硬桥，才能同时找回细腻 <em>pp</em> 与澎湃的侧翼弹性 <em>ff</em>。`
        }
      };

      const MODE_PRESETS = {
        cristofori: { tension: 95, shape: 72, density: 40, contourStiff: 12 },
        renner:     { tension: 95, shape: 52, density: 61, contourStiff: 12 }
      };

      class HammerSpringController {
        constructor() {
          this.lang = 'de';
          this.mode = 'cristofori'; // Start directly with Cristofori's leathered roll!
          this.specMode = 'delta';  // 'delta' (ΔdB-Änderung) | 'abs' (Pegel + ΔdB)
          this.tension = 95;        // 5-stage toggle: [28, 46, 62, 82, 95]
          this.shape = 72;          // 5-stage toggle: [10, 30, 52, 72, 94]
          this.density = 40;        // 5-stage toggle: [13, 40, 61, 78, 92] (Crown -> 1/2 Flank)
          this.contourStiff = 12;   // 5-stage toggle: [12, 34, 49, 68, 90] (Crown -> Flank transition)
          this.autoLoop = true;     // Continuous calm slow-motion bounce animation by default
          this.strikeStartMs = performance.now();
          this.isStriking = true;
          this.animId = null;
          this.audioCtx = null;

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
          } else {
            this.init();
          }
        }

        isSlideActive() {
          const slideEl = document.querySelector('.slide.hsp-slide');
          return Boolean(slideEl && slideEl.classList.contains('active'));
        }

        t() {
          return I18N[this.lang] || I18N.de;
        }

        fmt(num, d = 1) {
          const s = Number(num).toFixed(d);
          return this.lang === 'de' ? s.replace('.', ',') : s;
        }

        fmtSignedDb(v) {
          const r = Math.abs(v) < 0.05 ? 0 : v;
          const sign = r > 0 ? '+' : (r < 0 ? '−' : '±');
          return sign + this.fmt(Math.abs(r), 1) + ' dB';
        }

        computePhysics() {
          const T = this.tension / 100;       // 0.2 .. 1.0 (Elasticity & surface tension)
          const S = this.shape / 100;         // 0.0 .. 1.0 (Crown curvature)
          const D = this.density / 100;       // 0.0 .. 1.0 (Crown compaction; Flank = exact 1/2!)
          const C = this.contourStiff / 100;  // 0.0 .. 1.0 (Crown -> Flank transition stiffness)
          const V = 0.60;                     // Fixed concert reference strike (dynamics is now an OUTCOME!)
          const v0 = 2.65;                    // m/s reference test velocity

          // Exact 2:1 Crown-to-Flank Compaction Profile:
          // Even integer at Crown (52 % .. 98 %) -> exact integer half at widest Flank (26 % .. 49 %)
          const rhoApexPct = 2 * Math.round(26 + 23 * D);
          const rhoFlankPct = rhoApexPct / 2;
          const rhoApex = rhoApexPct / 100;
          const rhoFlank = rhoFlankPct / 100; // = 0.5 * rhoApex

          // Force-Interruption Factor along Outer Contour (Crown -> Flank):
          const rawBlock = Math.max(0, (C - 0.22) / 0.78);
          const blockFactor = rawBlock * rawBlock * (3 - 2 * rawBlock); // 0.0 (open) .. 1.0 (blocked)
          const flankEngagement = this.mode === 'renner'
            ? (1 - 0.88 * blockFactor)
            : (1 - 0.50 * blockFactor);
          const flankActivePct = Math.round(flankEngagement * 100);

          // 1) Pianissimo Loss Index (ppLoss):
          // Too hard Crown (D high) and/or too stiff Crown->Flank transition (blockFactor) eliminates soft initial cushion -> NO pp!
          const crownTooHard = Math.max(0, (D - 0.68) / 0.32);
          const sharpTipBoost = Math.max(0, (S - 0.68) / 0.32) * 0.26;
          const ppLoss = Math.min(1, 0.86 * crownTooHard + 0.88 * blockFactor + sharpTipBoost * (0.4 + 0.6 * D));
          const noPp = ppLoss >= 0.44;

          // 2) Insufficient Elasticity / Stiff-Felt Index (ffLoss):
          // Overly stiff felt (stiff transition blocking 1/2-flank, over-compaction, or low fiber tension) lacks elasticity,
          // which PROLONGS contact time tau_c, damps the vibrating string, and prevents fortissimo -> NO ff!
          const lackElasticity = Math.max(0, (0.80 - T) / 0.60);
          const stiffFlankLoss = this.mode === 'renner' ? blockFactor : blockFactor * 0.68;
          const overCompactedStiff = Math.max(0, (D - 0.82) / 0.18) * 0.62;
          const ffLoss = Math.min(1, 0.86 * lackElasticity + 0.85 * stiffFlankLoss + overCompactedStiff);
          const noFf = ffLoss >= 0.44;

          let pExp, kStiff, reboundPct, massG, baseTau;
          if (this.mode === 'cristofori') {
            const ringLock = 1 + 0.35 * blockFactor;
            pExp = 1.48 + 0.32 * D + 0.20 * S + 0.28 * blockFactor;
            kStiff = (24 + 34 * T + 20 * S + 18 * D) * ringLock;
            reboundPct = Math.round(Math.max(50, Math.min(96, 95 - 36 * ffLoss - (1 - T) * 8)));
            massG = 1.6;
            baseTau = 1.62 - 0.16 * (S - 0.5) - 0.14 * (D - 0.5);
          } else {
            // Authentic Renner Two-Zone Compound Spring:
            const kCrown = 54 + 78 * D + 34 * S + 38 * T;
            const kFlank = 24 + 28 * (0.5 * D) + 28 * T;
            const seriesCompliance = (0.44 / kCrown) + (0.56 * flankEngagement) / kFlank + (0.10 * (1 - flankEngagement)) / kCrown;
            kStiff = 1 / seriesCompliance;
            pExp = 2.08 + 0.62 * D + 0.32 * S + 0.22 * T + 0.72 * blockFactor;
            reboundPct = Math.round(Math.max(50, Math.min(95, 94 - 36 * ffLoss - (1 - T) * 7)));
            massG = 8.4;
            // Healthy elastic contact time ~2.06 ms (shorter for tighter R / firmer elastic crown, gently longer for soft crown)
            baseTau = 2.18 - 0.42 * (D - 0.5) - 0.26 * (S - 0.5);
          }

          // Contact time tau_c (ms):
          // Insufficient elasticity due to overly stiff/dead felt PROLONGS contact time (hammer lingers & damps string -> no ff)!
          const inelasticProlongMs = (this.mode === 'cristofori' ? 1.65 : 2.15) * Math.pow(ffLoss, 1.10);
          const tauMs = Math.max(1.15, Math.min(4.75, baseTau + inelasticProlongMs));

          // Peak indentation xMax (mm) and Peak effective acoustic force Fmax (N)
          const energyJ = 0.5 * (massG / 1000) * v0 * v0;
          const xMaxMm = Math.max(0.18, Math.min(2.05, Math.pow((energyJ * 1000 * (pExp + 1)) / kStiff, 1 / (pExp + 1))));
          const kneeBoost = (this.mode === 'renner' && blockFactor > 0.05) ? (1 + 0.24 * blockFactor) : 1.0;
          const fMaxN = kStiff * Math.pow(xMaxMm, pExp) * kneeBoost;

          // Tonal attack hardness vs. slack dulling (dB)
          const crownHardness = (D - 0.55) * 4.8 + (S - 0.50) * 2.4 + blockFactor * 2.5;
          const slackDulling = lackElasticity * (1 - 0.65 * blockFactor) * (1 - 0.55 * D) * 3.8;
          const modeBright = this.mode === 'cristofori' ? 2.6 : 0.35;
          const hardnessDb = Math.max(-4.8, Math.min(5.4, modeBright + crownHardness - slackDulling));

          // 3) Resulting Partial Structure H1..H12 (refDb, deltaDb, curDb):
          // Directly shows how elasticity, 2:1 compaction, crown shape, and transition stiffness reshape overtones!
          const REF_DB = [0.0, -2.4, -5.0, -7.6, -10.2, -12.8, -16.8, -17.5, -20.8, -22.8, -25.5, -27.8];
          const partials = [];
          const shellTilt = (D - 0.61) * 1.95 + (S - 0.52) * 1.05;
          const inelasticDamp = Math.max(0, lackElasticity * 1.15 + stiffFlankLoss * 0.92);

          for (let n = 1; n <= 12; n++) {
            const refDb = REF_DB[n - 1];
            let delta = 0;
            if (this.mode === 'cristofori') {
              // Lightweight 1.6 g hollow parchment roll: leaner H1–H3 bass mass, silvery-fast H5–H12 overtones
              const lowMass = n === 1 ? -5.2 : (n === 2 ? -3.0 : (n === 3 ? -1.1 : (n === 4 ? 0.2 : 0)));
              const ringBright = n >= 5 ? (0.54 * (n - 3.6) * (1 - 0.45 * ffLoss)) : 0;
              const shapeDens = n >= 4 ? (((D - 0.50) * 0.85 + (S - 0.58) * 0.55) * Math.pow(n - 3, 0.85)) : 0;
              const stiffSpike = blockFactor > 0.05 ? (2.8 * blockFactor * Math.exp(-Math.pow((n - 5.3) / 1.8, 2))) : 0;
              const tauDamp = (n >= 4 ? 1.15 * inelasticDamp * Math.pow(n - 3.0, 0.92) : 0) + 1.1 * lackElasticity;
              delta = lowMass + ringBright + shapeDens + stiffSpike - tauDamp;
            } else {
              // Renner 2-Zone Spring:
              // - Active 1/2-Flanke feeds warm H1–H3 fundamental + singing H3–H6 Cantabile arch
              // - Hard Crown/Shape boosts H4–H12 progressively (+3..+7 dB -> harsh attack, no pp!)
              // - Blocked outer contour robs H1–H3 fundamental (-4.5 dB), creates harsh H4–H6 shell spike (+3 dB, no pp),
              //   while prolonged tau_c damps H8–H12 brilliance (-7 dB, no ff)!
              const flankFund = n <= 3
                ? (0.95 * flankEngagement * (1 - 0.55 * lackElasticity)
                   - (5.2 - 1.50 * (n - 1)) * blockFactor
                   - 1.45 * lackElasticity
                   - 0.65 * crownTooHard * (4 - n))
                : 0;
              const cantabileArch = 0.72 * flankEngagement * (1 - 0.65 * ffLoss) * Math.exp(-Math.pow((n - 4.2) / 2.4, 2));
              const crownOvertoneTilt = n >= 4
                ? (shellTilt * Math.pow(n - 2.6, 0.88) * (shellTilt > 0 ? (1 - 0.55 * stiffFlankLoss - 0.45 * lackElasticity) : 1.0))
                : 0;
              const contourHardHump = blockFactor > 0.05
                ? (4.2 * blockFactor * Math.exp(-Math.pow((n - 5.1) / 1.55, 2)))
                : 0;
              const tauLowpassLoss = (n >= 7 ? (1.18 * stiffFlankLoss * Math.pow(n - 6.2, 1.05)) : 0)
                + (n >= 4 ? (1.28 * lackElasticity * Math.pow(n - 2.8, 0.90)) : 0);
              delta = flankFund + cantabileArch + crownOvertoneTilt + contourHardHump - tauLowpassLoss;
            }
            const deltaDb = Math.max(-9.6, Math.min(9.2, delta));
            partials.push({
              n,
              dissonant: (n === 7 || n === 9 || n === 11),
              refDb,
              deltaDb,
              curDb: refDb + deltaDb
            });
          }

          return {
            T, S, D, C, V, v0, pExp, kStiff,
            rhoApexPct,
            rhoFlankPct,
            rhoApex,
            rhoFlank,
            blockFactor,
            flankEngagement,
            flankActivePct,
            ppLoss,
            ffLoss,
            noPp,
            noFf,
            reboundPct,
            hystLossPct: 100 - reboundPct,
            xMaxMm,
            fMaxN,
            tauMs,
            hardnessDb,
            partials
          };
        }

        prepareCanvas(id) {
          const canvas = document.getElementById(id);
          if (!canvas) return null;
          const cw = canvas.clientWidth;
          const ch = canvas.clientHeight;
          if (!cw || !ch) return null;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
            canvas.width = Math.round(cw * dpr);
            canvas.height = Math.round(ch * dpr);
          }
          const ctx = canvas.getContext('2d');
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, cw, ch);
          return { ctx, W: cw, H: ch };
        }

        drawArrow(ctx, x1, y1, x2, y2, color, lw = 2.4, headScale = 1.0) {
          const dx = x2 - x1, dy = y2 - y1;
          const len = Math.hypot(dx, dy);
          if (len < 5) return;
          const ux = dx / len, uy = dy / len;
          const hLen = (8.5 + lw * 1.15) * headScale;
          const hWid = (4.8 + lw * 0.65) * headScale;
          const shaftEndX = x2 - ux * (hLen * 0.55);
          const shaftEndY = y2 - uy * (hLen * 0.55);

          ctx.save();
          ctx.lineCap = 'round';
          // Dark contrast halo underneath so force directions stand out clearly over bright felt/parchment
          ctx.strokeStyle = 'rgba(6, 10, 18, 0.72)';
          ctx.lineWidth = lw + 2.4;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(shaftEndX, shaftEndY);
          ctx.stroke();

          ctx.fillStyle = 'rgba(6, 10, 18, 0.72)';
          ctx.beginPath();
          ctx.moveTo(x2 + ux * 1.4, y2 + uy * 1.4);
          ctx.lineTo(x2 - ux * (hLen + 1.2) - uy * (hWid + 1.2), y2 - uy * (hLen + 1.2) + ux * (hWid + 1.2));
          ctx.lineTo(x2 - ux * (hLen + 1.2) + uy * (hWid + 1.2), y2 - uy * (hLen + 1.2) - ux * (hWid + 1.2));
          ctx.closePath();
          ctx.fill();

          // Crisp colored vector shaft + arrowhead
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(shaftEndX, shaftEndY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x2 - ux * hLen - uy * hWid, y2 - uy * hLen + ux * hWid);
          ctx.lineTo(x2 - ux * hLen + uy * hWid, y2 - uy * hLen - ux * hWid);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        computeBounceState(phys, nowMs = performance.now()) {
          // Rest state when paused & no single-shot strike running
          const restGap = 7;
          const idleState = {
            active: false,
            inContact: false,
            forcePhase: 'rest',
            forceMag: 0,
            yOffset: restGap,
            squashPx: 0,
            prolatePx: 0,
            stringLiftPx: 0,
            stringWaveAmp: 0,
            stringWavePhase: 0,
            shockAlpha: 0,
            shockRadius: 0,
            reboundFlash: 0,
            curvePhase: -1
          };
          if (!this.isStriking && !this.autoLoop) {
            return idleState;
          }

          // Didactic slow-motion timing so every force direction (Kraftrichtung) is clearly readable!
          const approachMs = 480;
          const contactMs = 760 + (phys.tauMs - 1.0) * 180; // ~850-1000 ms slow-motion contact window
          const reboundMs = 1650;                          // calm slow-motion rebound & settle
          const activeDur = approachMs + contactMs + reboundMs;
          const fullCycle = activeDur + 540;               // calm rest pause before next cycle

          let elapsed = nowMs - this.strikeStartMs;
          if (this.autoLoop) {
            elapsed = ((elapsed % fullCycle) + fullCycle) % fullCycle;
          } else if (elapsed >= activeDur) {
            this.isStriking = false;
            return idleState;
          }

          if (elapsed > activeDur) {
            return idleState;
          }

          // ~40% gentler bounce & compression amplitudes (0.60x of previous high-amplitude catapult)
          const rebGain = 0.26 + 0.90 * Math.pow(phys.reboundPct / 95, 1.95);
          const peakSquash = (13.2 + phys.xMaxMm * 10.5) * (0.82 + 0.30 * phys.V);
          const peakStringLift = 9.0 + 12.6 * phys.V;

          // Stage 1: Smooth slow-motion upward approach toward the string (~480 ms)
          if (elapsed < approachMs) {
            const u = elapsed / approachMs;
            const throwDist = 50; // 40% gentler approach travel
            return {
              active: true,
              inContact: false,
              forcePhase: 'approach',
              forceMag: 0.45 + 0.55 * u,
              yOffset: throwDist * Math.pow(1 - u, 1.85),
              squashPx: 0,
              prolatePx: 2.6 * u,
              stringLiftPx: 0,
              stringWaveAmp: 0,
              stringWavePhase: 0,
              shockAlpha: 0,
              shockRadius: 0,
              reboundFlash: 0,
              curvePhase: 0
            };
          }

          // Stage 2: Slow-motion string contact, compression & restoring-force build-up (~880 ms)
          if (elapsed < approachMs + contactMs) {
            const u = (elapsed - approachMs) / contactMs; // 0 -> 1
            const s = Math.sin(u * Math.PI);
            const squashPx = peakSquash * s;
            const shockU = Math.min(1, u * 1.25);
            const isPushoff = u >= 0.52;
            return {
              active: true,
              inContact: true,
              forcePhase: isPushoff ? 'pushoff' : 'compress',
              forceMag: s,
              yOffset: -squashPx * 0.48,
              squashPx,
              prolatePx: 0,
              stringLiftPx: peakStringLift * s,
              stringWaveAmp: 3.4 * u,
              stringWavePhase: elapsed * 0.045,
              shockAlpha: Math.sin(shockU * Math.PI) * (0.42 + 0.32 * rebGain),
              shockRadius: 12 + shockU * 58,
              reboundFlash: isPushoff ? ((u - 0.52) / 0.48) * rebGain : 0,
              curvePhase: u // 0..0.5 loading, 0.5..1 unloading
            };
          }

          // Stage 3: 40% gentler, slow-motion elastic bounce & graceful C1-smooth settle (~1650 ms)
          const u = (elapsed - approachMs - contactMs) / reboundMs; // 0 -> 1
          const peakDrop = 12 + 42 * rebGain; // ~56-60 px max drop (40% weaker than ~100 px)
          let yOffset;
          if (u < 0.38) {
            // Smooth, clearly readable downward rebound away from the string (~625 ms)
            const w = u / 0.38;
            yOffset = Math.sin(w * Math.PI * 0.5) * peakDrop;
          } else {
            // Calm, smooth return to rest with one gentle elastic cushion
            const w = (u - 0.38) / 0.62;
            const env = 0.5 * (1 + Math.cos(w * Math.PI));
            const gentleWave = 0.36 + 0.64 * Math.cos(w * Math.PI * (0.85 + 0.45 * rebGain));
            yOffset = Math.max(4, restGap + (peakDrop - restGap) * env * gentleWave);
          }

          // Calm, slow elastic prolate recovery (40% gentler & slower frequency)
          const prolatePx = peakSquash * 0.34 * rebGain * Math.cos(u * Math.PI * 3.0) * Math.exp(-u * 3.6);

          // Slow-motion string standing-wave shimmer
          const decayRate = 2.8 - 1.35 * Math.min(1.15, rebGain);
          const stringWaveAmp = (6.2 + 8.2 * phys.V) * Math.min(1.18, rebGain) * Math.exp(-u * decayRate);

          return {
            active: true,
            inContact: false,
            forcePhase: u < 0.72 ? 'rebound' : 'rest',
            forceMag: Math.max(0, 1 - u / 0.72),
            yOffset,
            squashPx: 0,
            prolatePx,
            stringLiftPx: stringWaveAmp * 0.34 * Math.cos(elapsed * 0.042),
            stringWaveAmp,
            stringWavePhase: elapsed * 0.055,
            shockAlpha: u < 0.22 ? (1 - u / 0.22) * 0.34 * rebGain : 0,
            shockRadius: 58 + u * 44,
            reboundFlash: Math.max(0, 1 - u / 0.72) * rebGain,
            curvePhase: -1
          };
        }

        drawHeadCanvas(phys) {
          const prep = this.prepareCanvas('hsp-canvas-head');
          if (!prep) return;
          const { ctx, W, H } = prep;
          const dict = this.t();
          const dyn = this.computeBounceState(phys);

          // Subtle technical grid
          ctx.strokeStyle = 'rgba(255,255,255,0.035)';
          ctx.lineWidth = 1;
          for (let gx = 40; gx < W; gx += 48) {
            ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
          }
          for (let gy = 36; gy < H; gy += 48) {
            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
          }

          const cx = W * 0.49;
          const stringBaseY = 44;
          const stringMidY = stringBaseY - dyn.stringLiftPx;

          // 1. Impact Shockwave Halo at String Contact Point
          if (dyn.shockAlpha > 0.02) {
            ctx.save();
            const shockCol = phys.T > 0.62 ? `rgba(46, 204, 113, ${dyn.shockAlpha})` : `rgba(251, 191, 36, ${dyn.shockAlpha})`;
            ctx.strokeStyle = shockCol;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.ellipse(cx, stringMidY + 2, dyn.shockRadius * 1.35, dyn.shockRadius * 0.52, 0, 0, Math.PI * 2);
            ctx.stroke();

            const flashGrad = ctx.createRadialGradient(cx, stringMidY + 2, 2, cx, stringMidY + 2, 28);
            flashGrad.addColorStop(0, `rgba(254, 240, 138, ${dyn.shockAlpha * 0.80})`);
            flashGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
            ctx.fillStyle = flashGrad;
            ctx.beginPath();
            ctx.arc(cx, stringMidY + 2, 28, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // 2. Draw 3-chörige Stahlsaite with realistic upward push & multi-harmonic shimmer
          ctx.save();
          if (dyn.stringWaveAmp > 0.35) {
            for (const dir of [-1, 1]) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(0.52, dyn.stringWaveAmp * 0.045)})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              for (let i = 0; i <= 48; i++) {
                const u = i / 48;
                const sx = 26 + u * (W - 52);
                const env = Math.sin(u * Math.PI);
                const harm = (
                  Math.sin(u * Math.PI) * Math.sin(dyn.stringWavePhase) +
                  0.42 * Math.sin(u * Math.PI * 2) * Math.cos(dyn.stringWavePhase * 1.7) +
                  0.24 * Math.sin(u * Math.PI * 3) * Math.sin(dyn.stringWavePhase * 2.6)
                );
                const sy = stringBaseY - dyn.stringLiftPx * env + dir * dyn.stringWaveAmp * 0.72 * env + harm * dyn.stringWaveAmp * 0.25;
                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
              }
              ctx.stroke();
            }
          }

          const strGlow = ctx.createLinearGradient(30, 0, W - 30, 0);
          strGlow.addColorStop(0, 'rgba(200,163,86,0.28)');
          strGlow.addColorStop(0.49, 'rgba(255,240,185,0.98)');
          strGlow.addColorStop(1, 'rgba(200,163,86,0.28)');
          ctx.strokeStyle = strGlow;
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(26, stringBaseY);
          ctx.quadraticCurveTo(cx, stringBaseY - dyn.stringLiftPx * 1.65, W - 26, stringBaseY);
          ctx.stroke();

          ctx.fillStyle = '#e6c882';
          ctx.font = '700 13px Roboto, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(dict.cvString, 28, 22);

          // Live Force-Direction Phase Pill at Top-Right of Canvas
          let phLabel = dict.phRest;
          let phColor = '#cbd5e1';
          let phBorder = 'rgba(203, 213, 225, 0.28)';
          if (dyn.forcePhase === 'approach') {
            phLabel = dict.phApproach;
            phColor = '#fde047';
            phBorder = 'rgba(253, 224, 71, 0.55)';
          } else if (dyn.forcePhase === 'compress') {
            if (this.mode === 'cristofori') {
              phLabel = dict.phCompressC;
              phColor = '#fb923c';
              phBorder = 'rgba(251, 146, 60, 0.62)';
            } else if (phys.blockFactor >= 0.35) {
              phLabel = dict.phCompressBlock;
              phColor = '#fca5a5';
              phBorder = 'rgba(239, 68, 68, 0.78)';
            } else {
              phLabel = dict.phCompressR;
              phColor = '#fb923c';
              phBorder = 'rgba(251, 146, 60, 0.62)';
            }
          } else if (dyn.forcePhase === 'pushoff') {
            phLabel = dict.phPushoff;
            phColor = '#38bdf8';
            phBorder = 'rgba(56, 189, 248, 0.62)';
          } else if (dyn.forcePhase === 'rebound') {
            phLabel = dict.phRebound;
            phColor = '#4ade80';
            phBorder = 'rgba(74, 222, 128, 0.65)';
          }
          ctx.font = '700 12px Roboto, sans-serif';
          const pillW = ctx.measureText(phLabel).width + 20;
          const pillX = W - pillW - 18;
          ctx.fillStyle = 'rgba(8, 12, 22, 0.88)';
          ctx.strokeStyle = phBorder;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(pillX, 6, pillW, 23, 11.5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = phColor;
          ctx.textAlign = 'right';
          ctx.fillText(phLabel, W - 28, 21);
          ctx.restore();

          if (this.mode === 'cristofori') {
            this.drawCristoforiRoll(ctx, W, H, cx, stringBaseY, dyn, phys, dict);
          } else {
            this.drawModernHammer(ctx, W, H, cx, stringBaseY, dyn, phys, dict);
          }

          // Fiber / Surface Micro-Zoom Inset on Right Side of Main Canvas
          this.drawFiberLoupe(ctx, W, H, phys, dict);
        }

        drawCristoforiRoll(ctx, W, H, cx, stringBaseY, dyn, phys, dict) {
          // Pure leathered parchment roll (no shank / no wooden saddle) with calm slow-motion bounce & clear force vectors
          const baseR = Math.min(H * 0.30, 84) * (1.12 - 0.24 * phys.S);
          const rx = baseR + dyn.squashPx * 0.78 - dyn.prolatePx * 0.48;
          const ry = Math.max(30, baseR - dyn.squashPx * 0.56 + dyn.prolatePx * 0.55);

          const stringContactY = stringBaseY - dyn.stringLiftPx + 3;
          const cy = dyn.inContact
            ? stringContactY + ry + 3
            : stringBaseY + dyn.yOffset + baseR + 4;

          // Subtle rebound motion guide lines
          if (dyn.forcePhase === 'rebound') {
            ctx.save();
            ctx.strokeStyle = `rgba(46, 204, 113, ${0.18 + dyn.forceMag * 0.35})`;
            ctx.lineWidth = 1.8;
            ctx.setLineDash([5, 5]);
            for (const dx of [-rx * 0.42, rx * 0.42]) {
              ctx.beginPath();
              ctx.moveTo(cx + dx, stringBaseY + 10);
              ctx.lineTo(cx + dx, Math.max(stringBaseY + 14, cy - ry - 6));
              ctx.stroke();
            }
            ctx.restore();
          }

          // Outer glow showing surface tension energy around the cylinder
          const glowAlpha = (0.14 + 0.22 * phys.T) + (dyn.inContact ? 0.20 : 0);
          const ringGlow = ctx.createRadialGradient(cx, cy, ry * 0.45, cx, cy, Math.max(rx, ry) * 1.38);
          ringGlow.addColorStop(0, 'rgba(46, 204, 113, 0.04)');
          ringGlow.addColorStop(0.75, `rgba(230, 200, 130, ${glowAlpha})`);
          ringGlow.addColorStop(1, 'rgba(230, 200, 130, 0)');
          ctx.fillStyle = ringGlow;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx * 1.38, ry * 1.38, 0, 0, Math.PI * 2);
          ctx.fill();

          // Unloaded ghost circle at rest height so bounce & ovalization are crystal clear!
          const restCy = stringBaseY + 7 + baseR + 4;
          ctx.save();
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = 'rgba(255,255,255,0.24)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(cx, restCy, baseR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Hollow Parchment Cylinder Wall (Spiral multi-turn parchment roll)
          const wallThick = 12 + 8.5 * phys.D;
          const parchGrad = ctx.createRadialGradient(cx, cy, Math.max(10, ry - wallThick), cx, cy, Math.max(rx, ry));
          parchGrad.addColorStop(0, '#b58d52');
          parchGrad.addColorStop(0.55, '#ebd3a7');
          parchGrad.addColorStop(1, '#c59b57');

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.ellipse(cx, cy, Math.max(14, rx - wallThick), Math.max(14, ry - wallThick), 0, 0, Math.PI * 2, true);
          ctx.fillStyle = parchGrad;
          ctx.fill('evenodd');

          // Draw spiral parchment winding lines inside the tube wall
          ctx.strokeStyle = 'rgba(92, 58, 22, 0.58)';
          ctx.lineWidth = 1.15;
          for (let layer = 1; layer <= 4; layer++) {
            const f = layer / 5;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx - wallThick * f, ry - wallThick * f, 0, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Glowing outer surface-tension membrane ring around full circumference!
          const ringCol = phys.T > 0.65 ? '#2ecc71' : '#f59e0b';
          ctx.strokeStyle = ringCol;
          ctx.lineWidth = dyn.inContact ? 3.6 : 2.8;
          ctx.shadowColor = ringCol;
          ctx.shadowBlur = dyn.inContact ? 14 : 6;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx + 1.5, ry + 1.5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Soft Deer-Leather Cap (Belederung) wrapping top strike zone of the roll
          ctx.save();
          ctx.strokeStyle = '#f8fafc';
          ctx.lineWidth = 7.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx + 4.8, ry + 4.8, 0, -Math.PI * 0.85, -Math.PI * 0.15);
          ctx.stroke();
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx + 8.3, ry + 8.3, 0, -Math.PI * 0.83, -Math.PI * 0.17);
          ctx.stroke();
          ctx.restore();

          // --- Clear Phase-Synchronized Force Directions (Kraftrichtungen) ---
          const arrowCol = phys.T > 0.65 ? '#2ecc71' : '#f59e0b';
          // Circumferential Surface Tension Arrows around the hollow tube
          this.drawArrow(ctx, cx - rx - 12, cy - 22, cx - rx - 12, cy + 22, arrowCol, 2.4, 1.05);
          this.drawArrow(ctx, cx - rx - 12, cy + 22, cx - rx - 12, cy - 22, arrowCol, 2.4, 1.05);
          this.drawArrow(ctx, cx + rx + 12, cy - 22, cx + rx + 12, cy + 22, arrowCol, 2.4, 1.05);
          this.drawArrow(ctx, cx + rx + 12, cy + 22, cx + rx + 12, cy - 22, arrowCol, 2.4, 1.05);

          if (dyn.forcePhase === 'compress') {
            // 1) String counter-force pressing down onto crown + lateral ovalization arrows (<- ->)
            this.drawArrow(ctx, cx, Math.max(8, stringContactY - 22), cx, stringContactY - 1, '#fb923c', 3.0, 1.1);
            this.drawArrow(ctx, cx - 14, cy, cx - rx + wallThick + 4, cy, '#fb923c', 2.7, 1.05);
            this.drawArrow(ctx, cx + 14, cy, cx + rx - wallThick - 4, cy, '#fb923c', 2.7, 1.05);
            // 2) Upward elastic restoring force building inside the ring
            this.drawArrow(ctx, cx, cy + ry * 0.45, cx, cy - ry + wallThick + 6, '#fbbf24', 3.8, 1.2);
          } else if (dyn.forcePhase === 'pushoff' || dyn.forcePhase === 'rebound') {
            // 1) Stretched ring squeezing back inward (-> <-) via surface tension!
            this.drawArrow(ctx, cx - rx - 28, cy, cx - rx - 4, cy, '#4ade80', 2.9, 1.1);
            this.drawArrow(ctx, cx + rx + 28, cy, cx + rx + 4, cy, '#4ade80', 2.9, 1.1);
            if (dyn.forcePhase === 'pushoff') {
              // Upward energy transfer into steel string
              this.drawArrow(ctx, cx, stringContactY - 2, cx, Math.max(6, stringContactY - 25), '#38bdf8', 3.0, 1.1);
            }
            // 2) Bold unmistakable DOWNWARD Bounce Force Vector!
            this.drawArrow(ctx, cx, cy - ry * 0.42, cx, cy + ry * 0.48, '#2ecc71', 4.2, 1.28);
          } else {
            // Approach or Rest: clear upward primary force vector
            this.drawArrow(ctx, cx - 22, cy + ry + 11, cx + 22, cy + ry + 11, arrowCol, 2.1, 1.0);
            this.drawArrow(ctx, cx + 22, cy + ry + 11, cx - 22, cy + ry + 11, arrowCol, 2.1, 1.0);
            this.drawArrow(ctx, cx, cy + ry * 0.44, cx, cy - ry + 10, '#fbbf24', 3.6, 1.18);
          }

          // High-contrast floating force badge to the right of the Cristofori roll (zero inner-wall overlap!)
          ctx.save();
          const isDownBounce = (dyn.forcePhase === 'pushoff' || dyn.forcePhase === 'rebound');
          ctx.font = '700 11.5px JetBrains Mono, monospace';
          const vecTag = isDownBounce
            ? `F_Bounce ↓ (${phys.reboundPct}%)`
            : `${dict.cvForceVec} ↑ (${phys.reboundPct}%)`;
          const bw = ctx.measureText(vecTag).width + 14;
          const bx = cx + rx + 20;
          const by = cy - ry * 0.42;
          ctx.fillStyle = 'rgba(8, 16, 24, 0.88)';
          ctx.strokeStyle = isDownBounce ? 'rgba(46, 204, 113, 0.72)' : 'rgba(251, 191, 36, 0.65)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(bx, by - 12, bw, 19, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = isDownBounce ? '#4ade80' : '#fef08a';
          ctx.textAlign = 'left';
          ctx.fillText(vecTag, bx + 7, by + 1);

          // Callout lines & labels anchored cleanly on left (pointing to reference geometry)
          const refTopY = stringBaseY + 26;
          const refMidY = restCy;
          const refLowY = restCy + baseR * 0.62;

          ctx.textAlign = 'left';
          ctx.font = '700 13px Roboto, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(dict.cvCristoforiTop, 26, refTopY);
          const xTopStart = Math.min(cx - rx * 0.65, 26 + ctx.measureText(dict.cvCristoforiTop).width + 8);
          ctx.strokeStyle = 'rgba(248,250,252,0.34)';
          ctx.beginPath(); ctx.moveTo(xTopStart, refTopY - 3); ctx.lineTo(cx - rx * 0.56, cy - ry - 2); ctx.stroke();

          ctx.fillStyle = '#4ade80';
          ctx.fillText(dict.cvCristoforiRing, 26, refMidY);
          const xRingStart = Math.min(cx - rx - 18, 26 + ctx.measureText(dict.cvCristoforiRing).width + 8);
          ctx.strokeStyle = 'rgba(74,222,128,0.32)';
          ctx.beginPath(); ctx.moveTo(xRingStart, refMidY - 3); ctx.lineTo(cx - rx - 14, cy); ctx.stroke();

          ctx.fillStyle = '#93c5fd';
          ctx.fillText(dict.cvCristoforiHollow, 26, refLowY);
          const xHolStart = Math.min(cx - rx * 0.42, 26 + ctx.measureText(dict.cvCristoforiHollow).width + 8);
          ctx.strokeStyle = 'rgba(147,197,253,0.30)';
          ctx.beginPath(); ctx.moveTo(xHolStart, refLowY - 3); ctx.lineTo(cx - rx * 0.35, cy + ry * 0.25); ctx.stroke();
          ctx.restore();
        }

        drawModernHammer(ctx, W, H, cx, stringBaseY, dyn, phys, dict) {
          // Authentic Louis Renner Grand Hammerhead Cross-Section with Real Compaction & Force-Transfer Zones:
          // 1) Crown (Scheitel, 12:00): Peak compaction (rhoApexPct, 100 %rel)
          // 2) Widest Flank (Flanke, 9:00 / 3:00): Half compaction of the Crown (rhoFlankPct = 1/2 * rhoApexPct) -> acts as elastic spring belly
          // 3) Outer-Contour Transition Zone (between Scheitel & Flanke along outer contour):
          //    - Supple: uninterrupted force flow into lower flank & rivet (full flank flexing)
          //    - Too stiff: interrupts force transfer into lower flank (flank freezes & dims, steep F(x) kink)
          const totalH = Math.min(H - stringBaseY - 76, 232);
          const feltH = totalH * 0.785;
          const isBlocked = phys.blockFactor >= 0.35;

          const baseY0 = stringBaseY + dyn.yOffset + 2; // Rigid wooden core reference Y
          const stringContactY = stringBaseY - dyn.stringLiftPx + 3;
          const crownTopY = dyn.inContact
            ? Math.max(stringContactY, baseY0 - dyn.squashPx * (0.56 - 0.14 * phys.blockFactor))
            : baseY0 - dyn.prolatePx * 0.68 * phys.flankEngagement;

          // Flank elastic flexing scales directly with flankEngagement:
          // Open force flow -> 1/2-density flank breathes & widens elastically; Blocked -> flank stays rigid!
          const flankFlexPx = (dyn.squashPx * 0.66 - dyn.prolatePx * 0.36) * phys.flankEngagement;
          const shoulderHW = (feltH * (0.495 - 0.105 * phys.S)) + flankFlexPx;
          const feltEndY = baseY0 + feltH;        // Exact point where tapered felt fibers feather out onto wood
          const woodBotY = baseY0 + totalH;       // Bottom foot of wooden core molding
          const shoulderY = crownTopY + (feltEndY - crownTopY) * (0.385 - 0.045 * phys.S);

          const topSpan = Math.max(18, shoulderY - crownTopY);
          const botSpan = Math.max(24, feltEndY - shoulderY);

          // Hornbeam Wooden Core (Hainbuchen-Holzkern): smooth rounded dome + gentle neck taper + classic Renner foot
          const coreTipY = baseY0 + feltH * 0.34;
          const coreNoseHW = feltH * 0.088;
          const coreDomeY = coreTipY + coreNoseHW * 1.10;
          const coreWaistHW = feltH * 0.072;      // Slender wooden neck where felt runs out & glue + rivet fix it
          const coreFootHW = feltH * 0.098;       // Classic Renner flared tail molding below the felt

          // Crimson Underfelt (Unterfilz): rounded horseshoe cap ending cleanly above glue/rivet zone
          const ufTipY = coreTipY - feltH * 0.062;
          const ufOuterHW = coreNoseHW + feltH * 0.045;
          const ufEndY = baseY0 + feltH * 0.675;

          // Cubic Bezier evaluator
          const evalCubic = (p0, p1, p2, p3, t) => {
            const mt = 1 - t;
            return (
              mt * mt * mt * p0 +
              3 * mt * mt * t * p1 +
              3 * mt * t * t * p2 +
              t * t * t * p3
            );
          };

          // Control points for right lower convex taper: (shoulderHW, shoulderY) -> (coreWaistHW + 0.6, feltEndY)
          const lowX0 = shoulderHW;
          const lowX1 = shoulderHW;
          const lowX2 = coreWaistHW + (shoulderHW - coreWaistHW) * 0.35;
          const lowX3 = coreWaistHW + 0.6;
          const lowY0 = shoulderY;
          const lowY1 = shoulderY + botSpan * 0.41;
          const lowY2 = feltEndY - botSpan * 0.17;
          const lowY3 = feltEndY;

          // Rivet sits at t = 0.76 along the lower tapered felt-on-wood zone
          const tRivet = 0.76;
          const rivetY = evalCubic(lowY0, lowY1, lowY2, lowY3, tRivet);
          const rivetOuterHW = evalCubic(lowX0, lowX1, lowX2, lowX3, tRivet);

          // Kinetic bounce trail streaks when rebounding off string
          if (dyn.reboundFlash > 0.06 && !dyn.inContact) {
            ctx.save();
            ctx.strokeStyle = `rgba(46, 204, 113, ${Math.min(0.75, dyn.reboundFlash * 0.68)})`;
            ctx.lineWidth = 2.4;
            ctx.setLineDash([6, 5]);
            for (const dx of [-shoulderHW * 0.46, 0, shoulderHW * 0.46]) {
              ctx.beginPath();
              ctx.moveTo(cx + dx, stringBaseY + 8);
              ctx.lineTo(cx + dx, Math.max(stringBaseY + 12, crownTopY - 5));
              ctx.stroke();
            }
            ctx.restore();
          }

          // Unloaded ghost silhouette at rest
          const restY0 = stringBaseY + 9;
          const restShHW = feltH * (0.495 - 0.105 * phys.S);
          const restFeltEndY = restY0 + feltH;
          const restShY = restY0 + feltH * (0.385 - 0.045 * phys.S);
          const restTopSpan = restShY - restY0;
          const restBotSpan = restFeltEndY - restShY;
          const restCrownCtrl = restShHW * (0.57 - 0.20 * phys.S);
          ctx.save();
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = 'rgba(255,255,255,0.20)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx, restY0);
          ctx.bezierCurveTo(
            cx + restCrownCtrl, restY0,
            cx + restShHW, restShY - restTopSpan * 0.53,
            cx + restShHW, restShY
          );
          ctx.bezierCurveTo(
            cx + restShHW, restShY + restBotSpan * 0.41,
            cx + coreWaistHW + (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17,
            cx + coreWaistHW + 0.6, restFeltEndY
          );
          ctx.moveTo(cx, restY0);
          ctx.bezierCurveTo(
            cx - restCrownCtrl, restY0,
            cx - restShHW, restShY - restTopSpan * 0.53,
            cx - restShHW, restShY
          );
          ctx.bezierCurveTo(
            cx - restShHW, restShY + restBotSpan * 0.41,
            cx - coreWaistHW - (restShHW - coreWaistHW) * 0.35, restFeltEndY - restBotSpan * 0.17,
            cx - coreWaistHW - 0.6, restFeltEndY
          );
          ctx.stroke();
          ctx.restore();

          // --- 1. Draw Hornbeam Wooden Hammer Core (Hammerkern) ---
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

          // --- 2. Draw Crimson/Magenta Underfelt Horseshoe Cap (Unterfilz) ---
          const ufDomeY = coreDomeY - 1;
          const coreHWAtUfEnd = coreNoseHW - (coreNoseHW - coreWaistHW) * ((ufEndY - coreDomeY) / Math.max(1, feltEndY - coreDomeY));
          const ufPath = new Path2D();
          ufPath.moveTo(cx, ufTipY);
          ufPath.bezierCurveTo(
            cx + ufOuterHW * 0.60, ufTipY,
            cx + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46,
            cx + ufOuterHW, ufDomeY
          );
          ufPath.bezierCurveTo(
            cx + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45,
            cx + coreHWAtUfEnd + 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22,
            cx + coreHWAtUfEnd + 0.3, ufEndY
          );
          ufPath.lineTo(cx + coreNoseHW, coreDomeY);
          ufPath.bezierCurveTo(
            cx + coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44,
            cx + coreNoseHW * 0.58, coreTipY,
            cx, coreTipY
          );
          ufPath.bezierCurveTo(
            cx - coreNoseHW * 0.58, coreTipY,
            cx - coreNoseHW, coreTipY + (coreDomeY - coreTipY) * 0.44,
            cx - coreNoseHW, coreDomeY
          );
          ufPath.lineTo(cx - coreHWAtUfEnd - 0.3, ufEndY);
          ufPath.bezierCurveTo(
            cx - coreHWAtUfEnd - 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22,
            cx - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45,
            cx - ufOuterHW, ufDomeY
          );
          ufPath.bezierCurveTo(
            cx - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46,
            cx - ufOuterHW * 0.60, ufTipY,
            cx, ufTipY
          );
          ufPath.closePath();

          ctx.save();
          const ufGrad = ctx.createLinearGradient(cx, ufTipY, cx, ufEndY);
          ufGrad.addColorStop(0, '#db2777');
          ufGrad.addColorStop(0.65, '#be185d');
          ufGrad.addColorStop(1, '#831843');
          ctx.fillStyle = ufGrad;
          ctx.fill(ufPath);
          ctx.restore();

          // --- 3. Build Smooth Convex Egg/Pear Oberfilz Cloak & Compaction Zones ---
          const flatHW = dyn.inContact ? Math.min(shoulderHW * 0.42, dyn.squashPx * 0.78) : 0;
          const crownCtrlX = flatHW + (shoulderHW - flatHW) * (0.57 - 0.20 * phys.S);

          // Helper for upper outer contour (t = 0 at Crown -> t = 1 at widest Flank shoulderY)
          const evalUpperX = (t) => evalCubic(flatHW, crownCtrlX, shoulderHW, shoulderHW, t);
          const evalUpperY = (t) => evalCubic(crownTopY, crownTopY, shoulderY - topSpan * 0.53, shoulderY, t);

          const feltCloak = new Path2D();
          feltCloak.moveTo(cx - flatHW, crownTopY);
          if (flatHW > 0.5) {
            feltCloak.lineTo(cx + flatHW, crownTopY);
          }
          feltCloak.bezierCurveTo(
            cx + crownCtrlX, crownTopY,
            cx + shoulderHW, shoulderY - topSpan * 0.53,
            cx + shoulderHW, shoulderY
          );
          feltCloak.bezierCurveTo(
            cx + lowX1, lowY1,
            cx + lowX2, lowY2,
            cx + lowX3, lowY3
          );
          feltCloak.lineTo(cx + coreHWAtUfEnd + 0.3, ufEndY);
          feltCloak.bezierCurveTo(
            cx + coreHWAtUfEnd + 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22,
            cx + ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45,
            cx + ufOuterHW, ufDomeY
          );
          feltCloak.bezierCurveTo(
            cx + ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46,
            cx + ufOuterHW * 0.60, ufTipY,
            cx, ufTipY
          );
          feltCloak.bezierCurveTo(
            cx - ufOuterHW * 0.60, ufTipY,
            cx - ufOuterHW, ufTipY + (ufDomeY - ufTipY) * 0.46,
            cx - ufOuterHW, ufDomeY
          );
          feltCloak.bezierCurveTo(
            cx - ufOuterHW, ufDomeY + (ufEndY - ufDomeY) * 0.45,
            cx - coreHWAtUfEnd - 2.2, ufEndY - (ufEndY - ufDomeY) * 0.22,
            cx - coreHWAtUfEnd - 0.3, ufEndY
          );
          feltCloak.lineTo(cx - lowX3, lowY3);
          feltCloak.bezierCurveTo(
            cx - lowX2, lowY2,
            cx - lowX1, lowY1,
            cx - shoulderHW, shoulderY
          );
          feltCloak.bezierCurveTo(
            cx - shoulderHW, shoulderY - topSpan * 0.53,
            cx - crownCtrlX, crownTopY,
            cx - flatHW, crownTopY
          );
          feltCloak.closePath();

          ctx.save();
          ctx.clip(feltCloak);

          // 3a) Base Merino Felt Tone
          ctx.fillStyle = '#131e2f';
          ctx.fillRect(cx - shoulderHW - 24, crownTopY - 12, shoulderHW * 2 + 48, feltH + 34);

          // 3b) Real Axial Compaction Profile:
          //     Peak compaction at SCHEITEL (crownTopY, warm amber-orange) -> HALF compaction at widest FLANKE (shoulderY, elastic cyan-teal)
          const shFrac = Math.max(0.24, Math.min(0.55, (shoulderY - crownTopY) / Math.max(1, feltH)));
          const axialGrad = ctx.createLinearGradient(cx, crownTopY, cx, feltEndY);
          axialGrad.addColorStop(0, `rgba(249, 115, 22, ${0.42 + 0.48 * phys.D})`);
          axialGrad.addColorStop(shFrac * 0.58, `rgba(234, 179, 8, ${0.34 + 0.34 * phys.D})`);
          axialGrad.addColorStop(shFrac, `rgba(20, 184, 166, ${0.30 + 0.18 * phys.D})`);
          axialGrad.addColorStop(Math.min(0.88, shFrac + 0.34), `rgba(56, 189, 248, ${0.24 + 0.14 * phys.D})`);
          axialGrad.addColorStop(1, 'rgba(251, 191, 36, 0.28)');
          ctx.fillStyle = axialGrad;
          ctx.fillRect(cx - shoulderHW - 24, crownTopY - 12, shoulderHW * 2 + 48, feltH + 34);

          // Concentrated Scheitel High-Compaction Core Glow (100 %rel at Crown)
          const crownGlow = ctx.createRadialGradient(
            cx, crownTopY + topSpan * 0.28, 3,
            cx, crownTopY + topSpan * 0.34, Math.max(26, shoulderHW * 0.78)
          );
          crownGlow.addColorStop(0, `rgba(251, 146, 60, ${0.46 + 0.44 * phys.D + (dyn.inContact ? 0.14 : 0)})`);
          crownGlow.addColorStop(0.52, `rgba(245, 158, 11, ${0.22 + 0.24 * phys.D})`);
          crownGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = crownGlow;
          ctx.fillRect(cx - shoulderHW - 20, crownTopY - 10, shoulderHW * 2 + 40, topSpan * 1.45);

          // Symmetric 1/2-Compacted Elastic Flank Belly Cushions at Widest Cross-Section (shoulderY)
          for (const dir of [-1, 1]) {
            const fx = cx + dir * (ufOuterHW + (shoulderHW - ufOuterHW) * 0.56);
            const fy = shoulderY + botSpan * 0.05;
            const flankGlow = ctx.createRadialGradient(fx, fy, 2, fx, fy, shoulderHW * 0.52);
            flankGlow.addColorStop(0, `rgba(56, 189, 248, ${(0.34 + 0.16 * phys.D) * phys.flankEngagement})`);
            flankGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
            ctx.fillStyle = flankGlow;
            ctx.fillRect(cx - shoulderHW - 20, crownTopY, shoulderHW * 2 + 40, feltH + 20);
          }

          // 3c) Decoupled Lower-Flank Dimming Mask when Stiff Outer Contour Interrupts Force Transfer!
          if (phys.blockFactor > 0.12) {
            const dimGrad = ctx.createLinearGradient(cx, shoulderY - 8, cx, shoulderY + 26);
            dimGrad.addColorStop(0, 'rgba(7, 11, 20, 0)');
            dimGrad.addColorStop(1, `rgba(7, 11, 20, ${0.68 * phys.blockFactor})`);
            ctx.fillStyle = dimGrad;
            ctx.fillRect(cx - shoulderHW - 24, shoulderY - 8, shoulderHW * 2 + 48, botSpan + 24);

            // Subtle diagonal inactive hatch in decoupled lower flank
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.22 * phys.blockFactor})`;
            ctx.lineWidth = 1.0;
            for (let hy = shoulderY + 4; hy < feltEndY + 24; hy += 11) {
              ctx.beginPath();
              ctx.moveTo(cx - shoulderHW - 10, hy);
              ctx.lineTo(cx - shoulderHW + 38, hy - 22);
              ctx.moveTo(cx + shoulderHW + 10, hy);
              ctx.lineTo(cx + shoulderHW - 38, hy - 22);
              ctx.stroke();
            }
          }

          // 3d) Explicit Outer-Contour Transition Zone Band (between Scheitel & Flanke along Außenkontur, t = 0.20 .. 0.88)
          const tBandStart = 0.20;
          const tBandEnd = 0.88;
          for (const dir of [-1, 1]) {
            ctx.save();
            ctx.beginPath();
            for (let s = 0; s <= 16; s++) {
              const t = tBandStart + (tBandEnd - tBandStart) * (s / 16);
              const px = cx + dir * evalUpperX(t);
              const py = evalUpperY(t);
              if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            // Clipped by feltCloak so half of 22px (= 11px) forms an exact uniform inner contour band!
            if (phys.blockFactor < 0.22) {
              ctx.strokeStyle = 'rgba(46, 204, 113, 0.28)';
            } else if (phys.blockFactor < 0.35) {
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.44)';
            } else {
              ctx.strokeStyle = `rgba(239, 68, 68, ${0.46 + 0.42 * phys.blockFactor})`;
            }
            ctx.lineWidth = 22;
            ctx.lineCap = 'butt';
            ctx.stroke();

            // Hardening cross-ticks inside the outer contour zone when stiffened
            if (phys.blockFactor >= 0.28) {
              ctx.strokeStyle = `rgba(254, 202, 202, ${0.40 + 0.45 * phys.blockFactor})`;
              ctx.lineWidth = 1.35;
              for (const tk of [0.28, 0.41, 0.54, 0.67, 0.80]) {
                const xOut = evalUpperX(tk);
                const yOut = evalUpperY(tk);
                const dxT = evalUpperX(tk + 0.03) - evalUpperX(tk - 0.03);
                const dyT = evalUpperY(tk + 0.03) - evalUpperY(tk - 0.03);
                const lenT = Math.max(0.001, Math.hypot(dxT, dyT));
                // Inward normal pointing into felt
                const nx = -dyT / lenT;
                const ny = dxT / lenT;
                ctx.beginPath();
                ctx.moveTo(cx + dir * xOut, yOut);
                ctx.lineTo(cx + dir * (xOut + nx * 10.5), yOut + ny * 10.5);
                ctx.stroke();
              }
            }
            ctx.restore();
          }

          // 3e) Zone Divider Arcs & Widest Cross-Section Reference Line (Flanke = 1/2 Scheitel)
          ctx.save();
          ctx.setLineDash([3, 3]);
          // Crown zone lower boundary arc
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.42)';
          ctx.lineWidth = 1.1;
          const yCrownZone = crownTopY + topSpan * 0.42;
          ctx.beginPath();
          ctx.moveTo(cx - shoulderHW, yCrownZone + 4);
          ctx.quadraticCurveTo(cx, yCrownZone - 6, cx + shoulderHW, yCrownZone + 4);
          ctx.stroke();

          // Widest Flank reference line at shoulderY (where compaction = exact 1/2 of Crown)
          ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.48)' : 'rgba(125, 211, 252, 0.52)';
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(cx - shoulderHW + 2, shoulderY);
          ctx.lineTo(cx - ufOuterHW - 2, shoulderY);
          ctx.moveTo(cx + ufOuterHW + 2, shoulderY);
          ctx.lineTo(cx + shoulderHW - 2, shoulderY);
          ctx.stroke();
          ctx.restore();

          // 3f) Continuous Merino Fiber Trajectories (2x6 Vliesbahnen) running out onto wood flanks!
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
            const crownCtrlXi = shHWi * (0.56 - 0.18 * phys.S);

            const baseAlpha = (0.44 - i * 0.058) * (1 - 0.32 * phys.blockFactor);
            ctx.strokeStyle = `rgba(255, 248, 225, ${baseAlpha})`;
            ctx.lineWidth = i === 1 ? 1.6 : 1.2;
            ctx.beginPath();
            ctx.moveTo(cx - endXOff, endYi);
            ctx.bezierCurveTo(
              cx - lowCtrlX2, endYi - botSpani * 0.17,
              cx - shHWi, shYi + botSpani * 0.41,
              cx - shHWi, shYi
            );
            ctx.bezierCurveTo(
              cx - shHWi, shYi - topSpani * 0.53,
              cx - crownCtrlXi, topYi,
              cx, topYi
            );
            ctx.bezierCurveTo(
              cx + crownCtrlXi, topYi,
              cx + shHWi, shYi - topSpani * 0.53,
              cx + shHWi, shYi
            );
            ctx.bezierCurveTo(
              cx + shHWi, shYi + botSpani * 0.41,
              cx + lowCtrlX2, endYi - botSpani * 0.17,
              cx + endXOff, endYi
            );
            ctx.stroke();
          }
          ctx.restore();

          // --- 4. Highlight Glue Fixation Seam (Klebstoff) Along Wood-Felt Run-Out ---
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

          // --- 5. Outer Surface-Tension Membrane Arc + Stiffened Outer-Contour Highlight ---
          const outerTensionArc = new Path2D();
          outerTensionArc.moveTo(cx - lowX3, lowY3);
          outerTensionArc.bezierCurveTo(
            cx - lowX2, lowY2,
            cx - lowX1, lowY1,
            cx - shoulderHW, shoulderY
          );
          outerTensionArc.bezierCurveTo(
            cx - shoulderHW, shoulderY - topSpan * 0.53,
            cx - crownCtrlX, crownTopY,
            cx - flatHW, crownTopY
          );
          if (flatHW > 0.5) outerTensionArc.lineTo(cx + flatHW, crownTopY);
          outerTensionArc.bezierCurveTo(
            cx + crownCtrlX, crownTopY,
            cx + shoulderHW, shoulderY - topSpan * 0.53,
            cx + shoulderHW, shoulderY
          );
          outerTensionArc.bezierCurveTo(
            cx + lowX1, lowY1,
            cx + lowX2, lowY2,
            cx + lowX3, lowY3
          );

          ctx.save();
          const skinCol = phys.T > 0.62 ? '#2ecc71' : '#f59e0b';
          ctx.strokeStyle = isBlocked ? 'rgba(148, 163, 184, 0.52)' : skinCol;
          ctx.lineWidth = dyn.inContact ? 3.6 : 2.9;
          ctx.shadowColor = isBlocked ? 'transparent' : skinCol;
          ctx.shadowBlur = isBlocked ? 0 : (dyn.inContact ? 14 : 7);
          ctx.stroke(outerTensionArc);

          // If blocked, keep upper crown green/amber and glow the stiff outer-contour segments crimson-red!
          if (phys.blockFactor >= 0.25) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 4.0;
            ctx.shadowColor = 'rgba(239, 68, 68, 0.85)';
            ctx.shadowBlur = 11;
            for (const dir of [-1, 1]) {
              ctx.beginPath();
              for (let s = 0; s <= 16; s++) {
                const t = tBandStart + (tBandEnd - tBandStart) * (s / 16);
                const px = cx + dir * evalUpperX(t);
                const py = evalUpperY(t);
                if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
              }
              ctx.stroke();
            }
          }
          ctx.restore();

          // Widest Flank outer caliper ticks at shoulderY
          ctx.save();
          ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.65)' : 'rgba(56, 189, 248, 0.72)';
          ctx.lineWidth = 1.5;
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

          // --- 6. Draw Horizontal Brass T-Rivet (Messing-Niete) ---
          ctx.save();
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

          // --- 7. Force Directions (Kraftrichtungen) & Force-Interruption Markers (✕) ---
          const axUp0 = evalUpperX(0.24) + 10;
          const ayUp0 = evalUpperY(0.24) - 3;
          const axUpStop = evalUpperX(0.76) + 10;
          const ayUpStop = evalUpperY(0.76) - 2;
          const xStopMark = evalUpperX(0.88) + 2;
          const yStopMark = evalUpperY(0.88);

          const axStart = evalCubic(lowX0, lowX1, lowX2, lowX3, 0.16) + 12;
          const ayStart = evalCubic(lowY0, lowY1, lowY2, lowY3, 0.16);
          const axEnd = rivetOuterHW + 11;
          const ayEnd = rivetY - 1;

          if (isBlocked) {
            // Draw faded dashed decoupled paths along the lower flank down to the rivet!
            ctx.save();
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
            ctx.lineWidth = 2.0;
            for (const dir of [-1, 1]) {
              ctx.beginPath();
              ctx.moveTo(cx + dir * axStart, ayStart + 2);
              ctx.lineTo(cx + dir * axEnd, ayEnd);
              ctx.stroke();
            }
            ctx.restore();

            // Upper contour force vectors slam into the stiffened outer contour & halt at ✕!
            this.drawArrow(ctx, cx - axUp0, ayUp0, cx - axUpStop, ayUpStop, '#f87171', 2.7, 1.06);
            this.drawArrow(ctx, cx + axUp0, ayUp0, cx + axUpStop, ayUpStop, '#f87171', 2.7, 1.06);

            // Crisp red Stop/Blockade Markers (✕) right between stiff outer contour and widest Flanke!
            ctx.save();
            for (const dir of [-1, 1]) {
              const mx = cx + dir * (xStopMark + 6);
              const my = yStopMark;
              ctx.fillStyle = '#991b1b';
              ctx.strokeStyle = '#fca5a5';
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.arc(mx, my, 7.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();

              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 1.8;
              ctx.beginPath();
              ctx.moveTo(mx - 3.0, my - 3.0); ctx.lineTo(mx + 3.0, my + 3.0);
              ctx.moveTo(mx + 3.0, my - 3.0); ctx.lineTo(mx - 3.0, my + 3.0);
              ctx.stroke();
            }
            ctx.restore();

            if (dyn.forcePhase === 'compress') {
              this.drawArrow(ctx, cx, Math.max(8, stringContactY - 22), cx, crownTopY - 2, '#fb923c', 3.0, 1.1);
              this.drawArrow(ctx, cx, ufTipY + 8, cx, crownTopY + 7, '#f87171', 3.6, 1.16);
            } else if (dyn.forcePhase === 'pushoff' || dyn.forcePhase === 'rebound') {
              if (dyn.forcePhase === 'pushoff') {
                this.drawArrow(ctx, cx, stringContactY - 2, cx, Math.max(6, stringContactY - 25), '#fb923c', 3.0, 1.1);
              }
              this.drawArrow(ctx, cx, crownTopY + 26, cx, ufEndY + 2, '#fb923c', 3.8, 1.22);
            } else {
              const upStartY = dyn.forcePhase === 'approach' ? coreDomeY + 14 : ufTipY + 4;
              this.drawArrow(ctx, cx, upStartY, cx, crownTopY + 8, '#fbbf24', 3.3, 1.12);
            }
          } else {
            // OPEN FORCE FLOW: Uninterrupted transmission from Scheitel -> Außenkontur -> 1/2-Flanke -> Klebstoff + Niete!
            if (dyn.forcePhase === 'compress') {
              this.drawArrow(ctx, cx, Math.max(8, stringContactY - 22), cx, crownTopY - 2, '#fb923c', 3.0, 1.1);
              // Smooth continuous force arrows passing through outer contour into widest Flanke & rivet
              this.drawArrow(ctx, cx - axUp0, ayUp0, cx - axStart + 1, ayStart - 4, '#fbbf24', 2.6, 1.08);
              this.drawArrow(ctx, cx + axUp0, ayUp0, cx + axStart - 1, ayStart - 4, '#fbbf24', 2.6, 1.08);
              this.drawArrow(ctx, cx - axStart, ayStart, cx - axEnd, ayEnd, skinCol, 2.9, 1.15);
              this.drawArrow(ctx, cx + axStart, ayStart, cx + axEnd, ayEnd, skinCol, 2.9, 1.15);
              // Elastic outward flank-belly flex vectors at widest cross-section (1/2 density!)
              this.drawArrow(ctx, cx - shoulderHW + 15, shoulderY, cx - shoulderHW - 6, shoulderY, '#38bdf8', 2.3, 0.98);
              this.drawArrow(ctx, cx + shoulderHW - 15, shoulderY, cx + shoulderHW + 6, shoulderY, '#38bdf8', 2.3, 0.98);
              // Deep compound restoring spring vector
              this.drawArrow(ctx, cx, coreDomeY + 10, cx, crownTopY + 7, '#fbbf24', 3.9, 1.20);
            } else if (dyn.forcePhase === 'pushoff' || dyn.forcePhase === 'rebound') {
              if (dyn.forcePhase === 'pushoff') {
                this.drawArrow(ctx, cx, stringContactY - 2, cx, Math.max(6, stringContactY - 25), '#38bdf8', 3.0, 1.1);
              }
              this.drawArrow(ctx, cx - axEnd, ayEnd, cx - axStart, ayStart, '#4ade80', 2.8, 1.12);
              this.drawArrow(ctx, cx + axEnd, ayEnd, cx + axStart, ayStart, '#4ade80', 2.8, 1.12);
              this.drawArrow(ctx, cx, crownTopY + 26, cx, ufEndY + 4, '#2ecc71', 4.2, 1.30);
            } else {
              this.drawArrow(ctx, cx - axUp0, ayUp0, cx - axStart + 1, ayStart - 4, 'rgba(74, 222, 128, 0.78)', 2.1, 1.0);
              this.drawArrow(ctx, cx + axUp0, ayUp0, cx + axStart - 1, ayStart - 4, 'rgba(74, 222, 128, 0.78)', 2.1, 1.0);
              this.drawArrow(ctx, cx - axStart, ayStart, cx - axEnd, ayEnd, skinCol, 2.3, 1.05);
              this.drawArrow(ctx, cx + axStart, ayStart, cx + axEnd, ayEnd, skinCol, 2.3, 1.05);
              const upStartY = dyn.forcePhase === 'approach' ? coreDomeY + 16 : ufTipY + 2;
              this.drawArrow(ctx, cx, upStartY, cx, crownTopY + 8, '#fbbf24', 3.5, 1.16);
            }
          }

          // Right-Side Diagnostic Badges (Force Flow Status + Rebound Force)
          ctx.save();
          ctx.font = '700 11.5px JetBrains Mono, monospace';
          const flowTxt = isBlocked ? dict.cvFlowBlock : dict.cvFlowOpen(phys.flankActivePct);
          const flowW = ctx.measureText(flowTxt).width + 14;
          const flowX = cx + shoulderHW + 16;
          const flowY = Math.max(54, shoulderY - 15);
          ctx.fillStyle = isBlocked ? 'rgba(42, 10, 16, 0.92)' : 'rgba(8, 18, 26, 0.88)';
          ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.82)' : 'rgba(56, 189, 248, 0.62)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(flowX, flowY - 12, flowW, 19, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = isBlocked ? '#fca5a5' : '#7dd3fc';
          ctx.textAlign = 'left';
          ctx.fillText(flowTxt, flowX + 7, flowY + 1);

          if (dyn.forcePhase === 'pushoff' || dyn.forcePhase === 'rebound') {
            const bTxt = `F_Bounce ↓ (${phys.reboundPct}%)`;
            const bw = ctx.measureText(bTxt).width + 14;
            const by = flowY + 24;
            ctx.fillStyle = 'rgba(8, 16, 24, 0.88)';
            ctx.strokeStyle = isBlocked ? 'rgba(251, 146, 60, 0.72)' : 'rgba(46, 204, 113, 0.72)';
            ctx.beginPath();
            ctx.roundRect(flowX, by - 12, bw, 19, 6);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = isBlocked ? '#fdba74' : '#4ade80';
            ctx.fillText(bTxt, flowX + 7, by + 1);
          }
          ctx.restore();

          // --- 8. Crisp On-Head Compaction Zone Pills (SCHEITEL 100%rel vs. FLANKE = 1/2) ---
          ctx.save();
          ctx.textAlign = 'center';
          // Crown Pill (Scheitel = Peak Compaction)
          const crownTag = `${dict.cvZoneCrown} ${phys.rhoApexPct}%`;
          ctx.font = '700 11px JetBrains Mono, monospace';
          const cwTag = ctx.measureText(crownTag).width + 10;
          const cyTag = crownTopY + 17;
          ctx.fillStyle = 'rgba(10, 14, 24, 0.82)';
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.62)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.roundRect(cx - cwTag / 2, cyTag - 10, cwTag, 14, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#fef08a';
          ctx.fillText(crownTag, cx, cyTag);

          // Left & Right Widest Flank Pills (Flanke = exact 1/2 Compaction of Crown!)
          const flankTag = `½ (${phys.rhoFlankPct}%)`;
          ctx.font = '700 10.5px JetBrains Mono, monospace';
          const fwTag = ctx.measureText(flankTag).width + 8;
          const flankCenterOff = ufOuterHW + (shoulderHW - ufOuterHW) * 0.54;
          if (shoulderHW - ufOuterHW > fwTag * 0.62) {
            for (const dir of [-1, 1]) {
              const fx = cx + dir * flankCenterOff;
              const fy = shoulderY + 3;
              ctx.fillStyle = 'rgba(8, 13, 24, 0.82)';
              ctx.strokeStyle = isBlocked ? 'rgba(148, 163, 184, 0.45)' : 'rgba(56, 189, 248, 0.65)';
              ctx.beginPath();
              ctx.roundRect(fx - fwTag / 2, fy - 9.5, fwTag, 13.5, 4);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = isBlocked ? '#94a3b8' : '#7dd3fc';
              ctx.fillText(flankTag, fx, fy);
            }
          }

          // --- 9. Clean Left Zone Callouts With Measured Leader Lines (Zero Overlap!) ---
          const yLbl1 = stringBaseY + 26;
          const yLbl2 = restY0 + feltH * 0.35;
          const yLbl3 = restY0 + feltH * 0.63;
          const yLbl4 = restY0 + feltH * 0.90;

          ctx.textAlign = 'left';
          ctx.font = '600 12.5px Roboto, sans-serif';

          // Callout 1: Scheitel (Peak Compaction)
          const txt1 = dict.cvCallCrown(phys.rhoApexPct);
          ctx.fillStyle = '#fde047';
          ctx.fillText(txt1, 22, yLbl1);
          const x1 = Math.min(cx - shoulderHW * 0.55, 22 + ctx.measureText(txt1).width + 8);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.40)';
          ctx.lineWidth = 1.15;
          ctx.beginPath(); ctx.moveTo(x1, yLbl1 - 3); ctx.lineTo(cx - flatHW - 12, crownTopY + 12); ctx.stroke();

          // Callout 2: Outer-Contour Transition Zone (Scheitel -> Flanke)
          const txt2 = isBlocked ? dict.cvCallContourBlock : dict.cvCallContourOpen;
          ctx.fillStyle = isBlocked ? '#f87171' : '#4ade80';
          ctx.fillText(txt2, 22, yLbl2);
          const xContourTarget = cx - evalUpperX(0.56);
          const yContourTarget = evalUpperY(0.56);
          const x2 = Math.min(xContourTarget - 14, 22 + ctx.measureText(txt2).width + 8);
          ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.55)' : 'rgba(74, 222, 128, 0.38)';
          ctx.beginPath(); ctx.moveTo(x2, yLbl2 - 3); ctx.lineTo(xContourTarget - 3, yContourTarget); ctx.stroke();

          // Callout 3: Widest Flank (1/2 Compaction) & Lower Flank Spring Belly
          const txt3 = isBlocked ? dict.cvCallFlankBlock(phys.rhoFlankPct) : dict.cvCallFlankOpen(phys.rhoFlankPct);
          ctx.fillStyle = isBlocked ? '#fca5a5' : '#38bdf8';
          ctx.fillText(txt3, 22, yLbl3);
          const x3 = Math.min(cx - shoulderHW - 12, 22 + ctx.measureText(txt3).width + 8);
          ctx.strokeStyle = isBlocked ? 'rgba(252, 165, 165, 0.45)' : 'rgba(56, 189, 248, 0.42)';
          ctx.beginPath(); ctx.moveTo(x3, yLbl3 - 3); ctx.lineTo(cx - shoulderHW + 4, shoulderY + 4); ctx.stroke();

          // Callout 4: Fiber Run-Out on Wood + Glue + Brass Rivet
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(dict.cvRennerFix, 22, yLbl4);
          const x4 = Math.min(cx - rivetOuterHW - 14, 22 + ctx.measureText(dict.cvRennerFix).width + 8);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
          ctx.beginPath(); ctx.moveTo(x4, yLbl4 - 3); ctx.lineTo(cx - rivetOuterHW - 4, rivetY); ctx.stroke();
          ctx.restore();
        }

        drawFiberLoupe(ctx, W, H, phys, dict) {
          const boxW = Math.min(238, W * 0.285);
          const boxH = Math.min(152, H * 0.55);
          const bx = W - boxW - 16;
          const by = H - boxH - 14;
          const isBlocked = this.mode === 'renner' && phys.blockFactor >= 0.35;

          ctx.save();
          ctx.fillStyle = 'rgba(8, 12, 22, 0.92)';
          ctx.strokeStyle = isBlocked ? 'rgba(248, 113, 113, 0.55)' : 'rgba(200, 163, 86, 0.44)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(bx, by, boxW, boxH, 10);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#e6c882';
          ctx.font = '700 11.5px Roboto, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('🔍 ' + dict.cvFiberTitle.toUpperCase(), bx + 10, by + 16);

          if (this.mode === 'cristofori') {
            const midY = by + boxH * 0.54;
            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(bx + 14, midY - 16);
            ctx.quadraticCurveTo(bx + boxW / 2, midY - 26, bx + boxW - 14, midY - 16);
            ctx.stroke();

            for (let r = 0; r < 3; r++) {
              ctx.strokeStyle = r === 0 ? '#2ecc71' : '#d4af37';
              ctx.lineWidth = r === 0 ? 2.2 : 1.5;
              ctx.beginPath();
              ctx.moveTo(bx + 14, midY - 6 + r * 9);
              ctx.quadraticCurveTo(bx + boxW / 2, midY - 16 + r * 9, bx + boxW - 14, midY - 6 + r * 9);
              ctx.stroke();
            }
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '500 11.5px Roboto, sans-serif';
            ctx.fillText(dict.cvFiberCristofori, bx + 10, by + boxH - 9);
          } else {
            // Split 2-Zone Micro-Comparison: Top = Dense Scheitel (100%rel) vs. Bottom = 1/2-Dense Flanke!
            const crimpAmp = 2.7 - phys.T * 0.9;

            // 1) Top Half: High-Compaction Scheitel (tightly packed fibers)
            ctx.fillStyle = '#fde047';
            ctx.font = '600 11px Roboto, sans-serif';
            ctx.fillText(dict.cvLoupeCrown(phys.rhoApexPct), bx + 10, by + 31);

            const crownSpacing = 5.4 - phys.D * 1.4; // Tighter spacing as Crown density rises!
            for (let r = 0; r < 3; r++) {
              ctx.strokeStyle = r === 0 ? '#fb923c' : '#fbbf24';
              ctx.lineWidth = r === 0 ? 1.8 : 1.35;
              ctx.beginPath();
              const y0 = by + 39 + r * crownSpacing;
              for (let x = 0; x <= boxW - 24; x += 4) {
                const py = y0 + Math.sin(x * 0.34 + r) * (crimpAmp * 0.72);
                if (x === 0) ctx.moveTo(bx + 12 + x, py); else ctx.lineTo(bx + 12 + x, py);
              }
              ctx.stroke();
            }

            // Divider line between Scheitel & Flanke micro-zones
            ctx.strokeStyle = isBlocked ? 'rgba(239, 68, 68, 0.75)' : 'rgba(255, 255, 255, 0.14)';
            ctx.setLineDash(isBlocked ? [4, 3] : []);
            ctx.lineWidth = isBlocked ? 1.4 : 1.0;
            ctx.beginPath();
            ctx.moveTo(bx + 10, by + 61);
            ctx.lineTo(bx + boxW - 10, by + 61);
            ctx.stroke();
            ctx.setLineDash([]);

            // 2) Bottom Half: Half-Compaction Flanke (2x wider elastic spacing!)
            ctx.fillStyle = isBlocked ? '#94a3b8' : '#7dd3fc';
            ctx.font = '600 11px Roboto, sans-serif';
            ctx.fillText(dict.cvLoupeFlank(phys.rhoFlankPct), bx + 10, by + 75);

            const flankSpacing = crownSpacing * 2.0; // Visually 2x wider spacing = 1/2 density!
            for (let r = 0; r < 3; r++) {
              ctx.strokeStyle = isBlocked
                ? 'rgba(148, 163, 184, 0.38)'
                : (r === 0 ? '#2ecc71' : '#38bdf8');
              ctx.lineWidth = r === 0 ? 1.7 : 1.3;
              ctx.beginPath();
              const y0 = by + 85 + r * Math.min(10.5, flankSpacing);
              for (let x = 0; x <= boxW - 24; x += 4) {
                const py = y0 + Math.sin(x * 0.24 + r * 1.4) * (crimpAmp * 1.15);
                if (x === 0) ctx.moveTo(bx + 12 + x, py); else ctx.lineTo(bx + 12 + x, py);
              }
              ctx.stroke();
            }

            let loupeFootTxt = dict.cvLoupeFooterOpen;
            let loupeFootCol = '#86efac';
            if (isBlocked || (phys.noPp && phys.noFf)) {
              loupeFootTxt = dict.cvLoupeFooterBlock;
              loupeFootCol = '#fca5a5';
            } else if (phys.noPp) {
              loupeFootTxt = dict.cvLoupeFooterNoPp;
              loupeFootCol = '#fdba74';
            } else if (phys.noFf) {
              loupeFootTxt = dict.cvLoupeFooterNoFf;
              loupeFootCol = '#fca5a5';
            }
            ctx.fillStyle = loupeFootCol;
            ctx.font = '600 11px Roboto, sans-serif';
            ctx.fillText(loupeFootTxt, bx + 10, by + boxH - 8);
          }
          ctx.restore();
        }

        drawCurvesCanvas(phys) {
          const prep = this.prepareCanvas('hsp-canvas-curves');
          if (!prep) return;
          const { ctx, W, H } = prep;
          const dict = this.t();
          const isBlocked = this.mode === 'renner' && phys.blockFactor >= 0.35;
          const dyn = this.computeBounceState(phys);
          const shimmer = dyn.inContact ? 1.0 : Math.min(1, dyn.stringWaveAmp / 8.0);

          const padL = 62, padR = 18, padT = 36, padB = 38;
          const pw = W - padL - padR;
          const ph = H - padT - padB;
          const slotW = pw / 12;
          const barW = Math.min(40, slotW * 0.56);
          const yb = padT + ph;

          ctx.save();

          // 1) Subtle Acoustic Register Zone Tints & Dividers (H1–H3 | H4–H7 | H8–H12)
          const xZ1 = padL;
          const xZ2 = padL + slotW * 3;
          const xZ3 = padL + slotW * 7;
          ctx.fillStyle = isBlocked ? 'rgba(239, 68, 68, 0.045)' : 'rgba(56, 189, 248, 0.035)';
          ctx.fillRect(xZ1, padT - 8, slotW * 3, ph + 8);
          ctx.fillStyle = 'rgba(200, 163, 86, 0.035)';
          ctx.fillRect(xZ2, padT - 8, slotW * 4, ph + 8);
          ctx.fillStyle = phys.noFf ? 'rgba(239, 68, 68, 0.045)' : 'rgba(46, 204, 113, 0.03)';
          ctx.fillRect(xZ3, padT - 8, slotW * 5, ph + 8);

          ctx.save();
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.13)';
          ctx.lineWidth = 1;
          for (const xd of [xZ2, xZ3]) {
            ctx.beginPath();
            ctx.moveTo(xd, padT - 8);
            ctx.lineTo(xd, yb);
            ctx.stroke();
          }
          ctx.restore();

          // Top Register Zone Labels + Live tau_c Spectral Status Pill
          ctx.font = '700 11.5px Roboto, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillStyle = isBlocked ? '#fca5a5' : '#7dd3fc';
          ctx.fillText(dict.specZone1, xZ1 + 4, 15);
          ctx.fillStyle = '#e6c882';
          ctx.fillText(dict.specZone2, xZ2 + 6, 15);
          ctx.fillStyle = phys.noFf ? '#fca5a5' : (phys.noPp ? '#fdba74' : '#86efac');
          ctx.fillText(dict.specZone3, xZ3 + 6, 15);
          const z3End = xZ3 + 6 + ctx.measureText(dict.specZone3).width;

          let stTxt = dict.specStatusOk(this.fmt(phys.tauMs, 2));
          let stCol = '#4ade80';
          let stBrd = 'rgba(74, 222, 128, 0.45)';
          if (isBlocked || (phys.noPp && phys.noFf)) {
            stTxt = dict.specStatusBlock(this.fmt(phys.tauMs, 2));
            stCol = '#fca5a5';
            stBrd = 'rgba(248, 113, 113, 0.65)';
          } else if (phys.noFf) {
            stTxt = dict.specStatusNoFf(this.fmt(phys.tauMs, 2));
            stCol = '#fca5a5';
            stBrd = 'rgba(248, 113, 113, 0.65)';
          } else if (phys.noPp) {
            stTxt = dict.specStatusNoPp;
            stCol = '#fdba74';
            stBrd = 'rgba(251, 146, 60, 0.65)';
          }
          ctx.font = '700 11px JetBrains Mono, monospace';
          const stW = ctx.measureText(stTxt).width + 14;
          if (W - padR - stW > z3End + 10) {
            const sx = W - padR - stW;
            ctx.fillStyle = 'rgba(8, 12, 22, 0.90)';
            ctx.strokeStyle = stBrd;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.roundRect(sx, 3.5, stW, 17, 6);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = stCol;
            ctx.textAlign = 'right';
            ctx.fillText(stTxt, W - padR - 7, 15);
          }

          // Helper for bar coloring by acoustic condition
          const getBarColor = (p) => {
            if (p.deltaDb >= 0) {
              if ((phys.noPp || isBlocked) && p.n >= 4 && p.deltaDb > 1.0) {
                return p.deltaDb > 3.5 ? '#ef4444' : '#fb923c';
              }
              return p.n <= 4 ? '#2ecc71' : (p.dissonant ? '#f59e0b' : '#e6c882');
            }
            if ((isBlocked && p.n <= 3) || (phys.noFf && p.n >= 4)) {
              return '#f87171';
            }
            return '#38bdf8';
          };

          if (this.specMode === 'delta') {
            // --- DEFAULT VIEW: Bipolar Change in Partial Structure (ΔdB vs. Reference) ---
            const maxAbsDb = 11.5;
            const mapY = (d) => padT + ((maxAbsDb - Math.max(-maxAbsDb, Math.min(maxAbsDb, d))) / (2 * maxAbsDb)) * ph;
            const y0 = mapY(0);

            // Horizontal dB Gridlines (+8, +4, 0, -4, -8 dB)
            ctx.font = '600 11px JetBrains Mono, monospace';
            ctx.textAlign = 'right';
            for (const g of [8, 4, 0, -4, -8]) {
              const yg = mapY(g);
              ctx.save();
              if (g === 0) {
                ctx.strokeStyle = 'rgba(230, 200, 130, 0.72)';
                ctx.lineWidth = 1.4;
                ctx.setLineDash([5, 4]);
              } else {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
                ctx.lineWidth = 1;
              }
              ctx.beginPath();
              ctx.moveTo(padL, yg);
              ctx.lineTo(padL + pw, yg);
              ctx.stroke();
              ctx.restore();

              ctx.fillStyle = g === 0 ? '#fef08a' : '#94a3b8';
              const gLbl = g > 0 ? `+${g} dB` : (g < 0 ? `−${Math.abs(g)} dB` : '0 dB');
              ctx.fillText(gLbl, padL - 6, yg + 3.5);
            }

            // Draw Bipolar ΔdB Bars + Labels
            const curvePts = [];
            phys.partials.forEach((p, i) => {
              const cx = padL + slotW * (i + 0.5);
              const bx = cx - barW / 2;
              const yv = mapY(p.deltaDb);
              curvePts.push({ x: cx, y: yv });

              const barTop = Math.min(y0, yv);
              const barH = Math.max(2.5, Math.abs(yv - y0));
              const col = getBarColor(p);

              ctx.save();
              if (shimmer > 0.08) {
                ctx.shadowColor = col;
                ctx.shadowBlur = 8 * shimmer;
              }
              const grad = ctx.createLinearGradient(0, barTop, 0, barTop + barH);
              if (p.deltaDb >= 0) {
                grad.addColorStop(0, col);
                grad.addColorStop(1, col + '55');
              } else {
                grad.addColorStop(0, col + '55');
                grad.addColorStop(1, col);
              }
              ctx.fillStyle = grad;
              ctx.strokeStyle = col;
              ctx.lineWidth = 1.15;
              ctx.beginPath();
              ctx.roundRect(bx, barTop, barW, barH, 4);
              ctx.fill();
              ctx.stroke();
              ctx.restore();

              // Signed ΔdB label above/below bar
              ctx.font = '700 11px JetBrains Mono, monospace';
              ctx.textAlign = 'center';
              const absV = Math.abs(p.deltaDb);
              const signStr = absV < 0.05 ? '±' : (p.deltaDb > 0 ? '+' : '−');
              const valTxt = `${signStr}${this.fmt(absV, 1)}`;
              ctx.fillStyle = p.deltaDb >= 0
                ? ((phys.noPp && p.n >= 4 && p.deltaDb > 1.0) ? '#fdba74' : '#fef08a')
                : (((isBlocked && p.n <= 3) || (phys.noFf && p.n >= 4)) ? '#fca5a5' : '#7dd3fc');
              const lblY = p.deltaDb >= 0
                ? Math.max(padT + 4, barTop - 4.5)
                : Math.min(yb - 2, barTop + barH + 10.5);
              ctx.fillText(valTxt, cx, lblY);
            });

            // Smooth Spectral Envelope Curve connecting H1..H12 ΔdB tips
            ctx.save();
            ctx.strokeStyle = (isBlocked || phys.noFf) ? 'rgba(248, 113, 113, 0.82)' : (phys.noPp ? 'rgba(251, 146, 60, 0.85)' : 'rgba(254, 240, 138, 0.78)');
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            curvePts.forEach((pt, idx) => {
              if (idx === 0) ctx.moveTo(pt.x, pt.y);
              else {
                const prev = curvePts[idx - 1];
                const midX = (prev.x + pt.x) * 0.5;
                ctx.bezierCurveTo(midX, prev.y, midX, pt.y, pt.x, pt.y);
              }
            });
            ctx.stroke();
            curvePts.forEach(pt => {
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
              ctx.fill();
            });
            ctx.restore();
          } else {
            // --- SECONDARY VIEW: Absolute Partial Level (dB) + Dashed Reference + ΔdB ---
            const maxD = 8, minD = -38;
            const mapY = (d) => padT + ((maxD - Math.max(minD, Math.min(maxD, d))) / (maxD - minD)) * ph;

            ctx.font = '600 11px JetBrains Mono, monospace';
            ctx.textAlign = 'right';
            for (const g of [0, -10, -20, -30]) {
              const yg = mapY(g);
              ctx.strokeStyle = g === 0 ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.08)';
              ctx.setLineDash(g === 0 ? [] : [3, 3]);
              ctx.beginPath();
              ctx.moveTo(padL, yg);
              ctx.lineTo(padL + pw, yg);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = '#94a3b8';
              ctx.fillText(g === 0 ? '0 dB' : `−${Math.abs(g)} dB`, padL - 6, yg + 3.5);
            }

            phys.partials.forEach((p, i) => {
              const cx = padL + slotW * (i + 0.5);
              const bx = cx - barW / 2;
              const yc = mapY(p.curDb);
              const yr = mapY(p.refDb);
              const col = getBarColor(p);

              // Shaded loss zone when current level drops below concert reference
              if (p.deltaDb < -0.2) {
                ctx.fillStyle = 'rgba(248, 113, 113, 0.18)';
                ctx.fillRect(bx, yr, barW, Math.max(1, yc - yr));
              }

              const barGrad = ctx.createLinearGradient(0, yc, 0, yb);
              barGrad.addColorStop(0, col);
              barGrad.addColorStop(1, col + '38');
              ctx.fillStyle = barGrad;
              ctx.strokeStyle = col;
              ctx.lineWidth = 1.1;
              ctx.beginPath();
              ctx.roundRect(bx, yc, barW, Math.max(3, yb - yc), [4, 4, 0, 0]);
              ctx.fill();
              ctx.stroke();

              // White dashed Concert Reference line per partial (identical visual language to Slide 33!)
              ctx.save();
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 1.8;
              ctx.setLineDash([4, 3]);
              ctx.beginPath();
              ctx.moveTo(bx - 3, yr);
              ctx.lineTo(bx + barW + 3, yr);
              ctx.stroke();
              ctx.restore();

              ctx.font = '700 11px JetBrains Mono, monospace';
              ctx.textAlign = 'center';
              const absV = Math.abs(p.deltaDb);
              const signStr = absV < 0.05 ? '±' : (p.deltaDb > 0 ? '+' : '−');
              ctx.fillStyle = p.deltaDb >= 0 ? '#fef08a' : '#7dd3fc';
              ctx.fillText(`${signStr}${this.fmt(absV, 1)}`, cx, Math.max(padT + 5, Math.min(yc, yr) - 5));
            });
          }

          // Bottom X-Axis Labels: H1..H12 + Musical Interval Role
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(padL, yb);
          ctx.lineTo(padL + pw, yb);
          ctx.stroke();

          const roles = dict.specRoles || [];
          phys.partials.forEach((p, i) => {
            const cx = padL + slotW * (i + 0.5);
            ctx.textAlign = 'center';
            ctx.font = '700 11.5px JetBrains Mono, monospace';
            ctx.fillStyle = p.dissonant ? '#fcd34d' : '#f8fafc';
            ctx.fillText(`H${p.n}`, cx, yb + 14);

            ctx.font = '500 10.5px Roboto, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(roles[i] || '', cx, yb + 26);
          });

          ctx.restore();
        }

        startAnimLoop() {
          if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
          }
          if (!this.isSlideActive()) return;
          const tick = () => {
            if (!this.isSlideActive()) {
              this.animId = null;
              return;
            }
            const phys = this.computePhysics();
            this.drawHeadCanvas(phys);
            this.drawCurvesCanvas(phys);
            if (this.autoLoop || this.isStriking) {
              this.animId = requestAnimationFrame(tick);
            } else {
              this.animId = null;
            }
          };
          this.animId = requestAnimationFrame(tick);
        }

        triggerStrike(playAudio = true) {
          this.strikeStartMs = performance.now();
          this.isStriking = true;
          const btn = document.getElementById('hsp-btn-strike');
          if (btn) {
            btn.classList.add('striking');
            setTimeout(() => btn.classList.remove('striking'), 380);
          }
          this.startAnimLoop();
          if (playAudio) this.playSpringTone();
        }

        toggleAutoLoop() {
          this.autoLoop = !this.autoLoop;
          if (this.autoLoop) {
            this.strikeStartMs = performance.now();
            this.isStriking = true;
            this.startAnimLoop();
          } else {
            this.isStriking = false;
          }
          this.updateUI();
        }

        playSpringTone() {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (!AudioCtx) return;
          if (!this.audioCtx) this.audioCtx = new AudioCtx();
          if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

          const phys = this.computePhysics();
          const ctx = this.audioCtx;
          const now = ctx.currentTime;
          const f0 = 220.0; // A3 (220 Hz)

          // Prolonged contact (ffLoss) chokes peak acoustic power (no ff!) and damps sustain!
          const master = ctx.createGain();
          const ffChoke = 1 - 0.42 * phys.ffLoss;
          const velGain = 0.29 * ffChoke;
          master.gain.setValueAtTime(velGain, now);
          master.connect(ctx.destination);

          const isBlocked = this.mode === 'renner' && phys.blockFactor >= 0.35;
          const sustain = this.mode === 'cristofori'
            ? (1.85 - 0.55 * phys.ffLoss)
            : (2.85 - 1.15 * phys.ffLoss);
          const B = this.mode === 'cristofori' ? 0.00006 : 0.00018;

          for (let n = 1; n <= 12; n++) {
            const p = phys.partials[n - 1];
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(n * f0 * Math.sqrt(1 + B * n * n), now);

            const amp = Math.min(0.60, Math.pow(10, p.curDb / 20) * 0.50);
            const decay = Math.max(0.20, sustain / (1 + (n - 1) * (this.mode === 'cristofori' ? 0.34 : 0.22)));

            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(amp, now + Math.max(0.002, phys.tauMs / 1000));
            g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

            osc.connect(g);
            g.connect(master);
            osc.start(now);
            osc.stop(now + decay + 0.04);
          }
        }

        applyLanguageTexts() {
          const d = this.t();
          const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
          };

          setTxt('hsp-mode-cristofori', d.m1);
          setTxt('hsp-mode-renner', d.m2);
          setTxt('hsp-btn-reset', d.reset);
          setTxt('hsp-lbl-strike-btn', d.strikeBtn);
          setTxt('hsp-curve-badge', d.curveBadge);
          setTxt('hsp-curve-title', d.curveTitle);
          setTxt('hsp-spec-delta', d.specBtnDelta);
          setTxt('hsp-spec-abs', d.specBtnAbs);
          setTxt('hsp-lbl-c1', d.c1);
          setTxt('hsp-lbl-c2', d.c2);
          setTxt('hsp-lbl-c3', d.c3);
          setTxt('hsp-lbl-c4', d.c4);
          const setSteps = (grpId, labels) => {
            const grp = document.getElementById(grpId);
            if (!grp || !labels) return;
            grp.querySelectorAll('.hsp-step-btn').forEach((btn, idx) => {
              if (labels[idx]) btn.textContent = labels[idx];
            });
          };
          setSteps('hsp-grp-tension', d.steps1);
          setSteps('hsp-grp-shape', d.steps2);
          setSteps('hsp-grp-density', d.steps3);
          setSteps('hsp-grp-contour', d.steps4);
          setTxt('hsp-lbl-dyn', d.dynLbl);
          setTxt('hsp-kpi1-lbl', d.kpi1);
          setTxt('hsp-kpi2-lbl', d.kpi2);
          setTxt('hsp-kpi3-lbl', d.kpi3);
        }

        syncStepGroups() {
          const syncGrp = (grpId, currentVal) => {
            const grp = document.getElementById(grpId);
            if (!grp) return;
            const btns = Array.from(grp.querySelectorAll('.hsp-step-btn'));
            if (!btns.length) return;
            let bestBtn = btns[0];
            let bestDist = Infinity;
            btns.forEach(btn => {
              const v = parseInt(btn.getAttribute('data-val'), 10);
              const dist = Math.abs(v - currentVal);
              if (dist < bestDist) {
                bestDist = dist;
                bestBtn = btn;
              }
            });
            btns.forEach(btn => {
              const isAct = btn === bestBtn;
              btn.classList.toggle('active', isAct);
              btn.setAttribute('aria-pressed', isAct ? 'true' : 'false');
            });
          };
          syncGrp('hsp-grp-tension', this.tension);
          syncGrp('hsp-grp-shape', this.shape);
          syncGrp('hsp-grp-density', this.density);
          syncGrp('hsp-grp-contour', this.contourStiff);
        }

        updateUI() {
          const d = this.t();
          const phys = this.computePhysics();
          const isBlocked = this.mode === 'renner' && phys.blockFactor >= 0.35;
          const hasAlert = isBlocked || phys.noPp || phys.noFf;

          this.syncStepGroups();

          // Mode, Spec-View & Loop buttons
          document.getElementById('hsp-mode-cristofori').classList.toggle('active', this.mode === 'cristofori');
          document.getElementById('hsp-mode-renner').classList.toggle('active', this.mode === 'renner');
          const btnDelta = document.getElementById('hsp-spec-delta');
          const btnAbs = document.getElementById('hsp-spec-abs');
          if (btnDelta) btnDelta.classList.toggle('active', this.specMode === 'delta');
          if (btnAbs) btnAbs.classList.toggle('active', this.specMode === 'abs');
          const loopBtn = document.getElementById('hsp-btn-loop');
          if (loopBtn) {
            loopBtn.classList.toggle('active', this.autoLoop);
            loopBtn.textContent = this.autoLoop ? d.loopOn : d.loopOff;
          }

          // 4 Hammerhead Parameter Slider Readouts
          document.getElementById('hsp-val-c1').textContent = `${this.tension} %`;
          const rMm = this.fmt(16.5 - phys.S * 7.5, 1);
          document.getElementById('hsp-val-c2').textContent = `R ≈ ${rMm} mm`;

          document.getElementById('hsp-val-c3').textContent =
            this.mode === 'cristofori'
              ? d.c3ValC(this.density)
              : d.c3ValR(phys.rhoApexPct, phys.rhoFlankPct);

          const elValC4 = document.getElementById('hsp-val-c4');
          const elBlockC4 = document.getElementById('hsp-block-contour');
          if (phys.blockFactor < 0.20) {
            elValC4.textContent = d.c4Open(phys.flankActivePct);
            elValC4.style.color = '#4ade80';
          } else if (phys.blockFactor < 0.35) {
            elValC4.textContent = d.c4Mid(phys.flankActivePct);
            elValC4.style.color = '#fbbf24';
          } else {
            elValC4.textContent = d.c4Block(phys.flankActivePct);
            elValC4.style.color = '#f87171';
          }
          if (elBlockC4) elBlockC4.classList.toggle('warn-contour', isBlocked);

          // Live Resulting Playable Dynamic Window (pp <-> ff)
          const dynPanel = document.getElementById('hsp-dyn-panel');
          const valDyn = document.getElementById('hsp-val-dyn');
          const noteL = document.getElementById('hsp-dyn-note-l');
          const noteR = document.getElementById('hsp-dyn-note-r');
          const setSeg = (id, label, state) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = state === 'blocked' ? `✕ ${label}` : label;
            el.classList.toggle('seg-blocked', state === 'blocked');
            el.classList.toggle('seg-limit', state === 'limit');
          };

          setSeg('hsp-seg-pp', 'pp', phys.noPp ? 'blocked' : (phys.ppLoss >= 0.24 ? 'limit' : 'ok'));
          setSeg('hsp-seg-mp', 'mp', phys.ppLoss >= 0.72 ? 'limit' : 'ok');
          setSeg('hsp-seg-mf', 'mf', (phys.noPp && phys.noFf) ? 'limit' : 'ok');
          setSeg('hsp-seg-f',  'f',  phys.ffLoss >= 0.72 ? 'limit' : 'ok');
          setSeg('hsp-seg-ff', 'ff', phys.noFf ? 'blocked' : (phys.ffLoss >= 0.24 ? 'limit' : 'ok'));

          if (dynPanel) dynPanel.classList.toggle('dyn-warn', phys.noPp || phys.noFf);
          if (valDyn) {
            if (phys.noPp && phys.noFf) {
              valDyn.textContent = d.dynNone;
              valDyn.style.color = '#f87171';
            } else if (phys.noPp) {
              valDyn.textContent = d.dynNoPp;
              valDyn.style.color = '#fb923c';
            } else if (phys.noFf) {
              valDyn.textContent = d.dynNoFf;
              valDyn.style.color = '#f87171';
            } else {
              valDyn.textContent = d.dynFull;
              valDyn.style.color = '#4ade80';
            }
          }
          if (noteL) {
            if (phys.noPp) {
              noteL.textContent = d.dynNotePpNo;
              noteL.style.color = '#fca5a5';
            } else if (phys.ppLoss >= 0.24) {
              noteL.textContent = d.dynNotePpWarn;
              noteL.style.color = '#fde047';
            } else {
              noteL.textContent = d.dynNotePpOk;
              noteL.style.color = '#4ade80';
            }
          }
          if (noteR) {
            if (phys.noFf) {
              noteR.textContent = d.dynNoteFfNo;
              noteR.style.color = '#fca5a5';
            } else if (phys.ffLoss >= 0.24) {
              noteR.textContent = d.dynNoteFfWarn;
              noteR.style.color = '#fde047';
            } else {
              noteR.textContent = d.dynNoteFfOk;
              noteR.style.color = '#4ade80';
            }
          }

          // KPIs
          const elReb = document.getElementById('hsp-kpi-rebound');
          elReb.textContent = `${phys.reboundPct} %`;
          elReb.style.color = phys.reboundPct >= 85 ? '#2ecc71' : (phys.reboundPct >= 72 ? '#fbbf24' : '#f87171');
          document.getElementById('hsp-kpi-rebound-sub').textContent = d.hystSub(phys.hystLossPct);

          const elTau = document.getElementById('hsp-kpi-tau');
          elTau.textContent = `${this.fmt(phys.tauMs, 2)} ms`;
          elTau.style.color = phys.noFf ? '#f87171' : (phys.ffLoss >= 0.24 ? '#fbbf24' : '#ffffff');
          const elTauSub = document.getElementById('hsp-kpi-tau-sub');
          if (phys.noFf) {
            elTauSub.textContent = d.tauSlow;
            elTauSub.style.color = '#fca5a5';
          } else if (phys.ffLoss >= 0.24) {
            elTauSub.textContent = d.tauWarn;
            elTauSub.style.color = '#fde047';
          } else if (this.mode === 'cristofori' && phys.tauMs < 1.75) {
            elTauSub.textContent = d.tauFast;
            elTauSub.style.color = 'rgba(255,255,255,0.74)';
          } else {
            elTauSub.textContent = d.tauIdeal;
            elTauSub.style.color = 'rgba(255,255,255,0.74)';
          }

          let toneDesc = d.toneIdeal;
          let toneCol = '#2ecc71';
          if (isBlocked || (phys.noPp && phys.noFf)) {
            toneDesc = d.toneBlocked; toneCol = '#f87171';
          } else if (phys.noPp) {
            toneDesc = d.toneHardNoPp; toneCol = '#fb923c';
          } else if (phys.noFf) {
            toneDesc = d.toneStiffNoFf; toneCol = '#f87171';
          } else if (this.mode === 'cristofori' || phys.hardnessDb >= 1.5) {
            toneDesc = d.toneCrisp; toneCol = '#e6c882';
          } else if (phys.hardnessDb <= -1.4) {
            toneDesc = d.toneSoft; toneCol = '#7dd3fc';
          }

          const elHard = document.getElementById('hsp-kpi-hardness');
          elHard.textContent = this.fmtSignedDb(phys.hardnessDb);
          elHard.style.color = toneCol;
          document.getElementById('hsp-kpi-hardness-sub').textContent = toneDesc;

          // Readout strip
          const elRoPrin = document.getElementById('hsp-ro-principle');
          if (isBlocked || (phys.noPp && phys.noFf)) {
            elRoPrin.textContent = d.roPrinBlock;
            elRoPrin.style.color = '#fca5a5';
          } else if (phys.noPp) {
            elRoPrin.textContent = d.roPrinNoPp(phys.rhoApexPct);
            elRoPrin.style.color = '#fdba74';
          } else if (phys.noFf) {
            elRoPrin.textContent = d.roPrinNoFf(this.fmt(phys.tauMs, 2));
            elRoPrin.style.color = '#fca5a5';
          } else if (this.mode === 'cristofori') {
            elRoPrin.textContent = d.roPrinC;
            elRoPrin.style.color = 'var(--gold-light)';
          } else {
            elRoPrin.textContent = d.roPrinR(phys.rhoApexPct, phys.rhoFlankPct);
            elRoPrin.style.color = 'var(--gold-light)';
          }
          document.getElementById('hsp-ro-deform').textContent =
            d.roDef(this.fmt(phys.xMaxMm, 2), this.fmt(phys.fMaxN, 1));
          const roTone = document.getElementById('hsp-ro-tone');
          roTone.textContent = d.roTone(toneDesc, this.fmtSignedDb(phys.hardnessDb));
          roTone.style.color = toneCol;

          // Dynamic explanation card
          const expBox = document.getElementById('hsp-exp-box');
          const badge = document.getElementById('hsp-exp-badge');
          const title = document.getElementById('hsp-exp-title');
          const body = document.getElementById('hsp-exp-body');
          const bullet = document.getElementById('hsp-exp-bullet');

          if (expBox) expBox.classList.toggle('blocked-alert', hasAlert);
          if (badge) {
            badge.classList.toggle('red-alert', hasAlert);
            badge.classList.toggle('gold', !hasAlert);
          }

          if (isBlocked || (phys.noPp && phys.noFf)) {
            badge.textContent = d.expBadgeBlock;
            title.textContent = d.expTitleBlock;
            body.innerHTML = d.expBodyBlock(phys.flankActivePct, this.fmt(phys.tauMs, 2));
            bullet.innerHTML = d.expBulletBlock;
          } else if (phys.noPp) {
            badge.textContent = d.expBadgeNoPp;
            title.textContent = d.expTitleNoPp;
            body.innerHTML = d.expBodyNoPp(phys.rhoApexPct, this.fmt(phys.tauMs, 2), this.fmtSignedDb(phys.hardnessDb));
            bullet.innerHTML = d.expBulletNoPp;
          } else if (phys.noFf) {
            badge.textContent = d.expBadgeNoFf;
            title.textContent = d.expTitleNoFf;
            body.innerHTML = d.expBodyNoFf(phys.reboundPct, this.fmt(phys.tauMs, 2));
            bullet.innerHTML = d.expBulletNoFf;
          } else if (this.mode === 'cristofori') {
            badge.textContent = d.expBadgeC;
            title.textContent = d.expTitleC;
            body.innerHTML = d.expBodyC(phys.reboundPct, this.fmt(phys.tauMs, 2));
            bullet.innerHTML = d.expBulletC;
          } else {
            badge.textContent = d.expBadgeR;
            title.textContent = d.expTitleR;
            body.innerHTML = d.expBodyR(
              phys.reboundPct,
              this.fmt(phys.tauMs, 2),
              this.fmtSignedDb(phys.hardnessDb),
              phys.rhoApexPct,
              phys.rhoFlankPct
            );
            bullet.innerHTML = d.expBulletR;
          }

          this.drawHeadCanvas(phys);
          this.drawCurvesCanvas(phys);
        }

        setMode(mode, play = true) {
          this.mode = mode;
          const p = MODE_PRESETS[mode];
          this.tension = p.tension;
          this.shape = p.shape;
          this.density = p.density;
          this.contourStiff = p.contourStiff;

          this.updateUI();
          this.triggerStrike(play);
        }

        init() {
          const slideEl = document.querySelector('.slide.hsp-slide');
          if (!slideEl) return;
          document.getElementById('hsp-mode-cristofori').addEventListener('click', () => this.setMode('cristofori', true));
          document.getElementById('hsp-mode-renner').addEventListener('click', () => this.setMode('renner', true));

          const loopBtn = document.getElementById('hsp-btn-loop');
          if (loopBtn) loopBtn.addEventListener('click', () => this.toggleAutoLoop());

          document.getElementById('hsp-btn-reset').addEventListener('click', () => this.setMode(this.mode, false));
          document.getElementById('hsp-btn-strike').addEventListener('click', () => this.triggerStrike(true));
          document.getElementById('hsp-canvas-head').addEventListener('click', () => this.triggerStrike(true));
          document.getElementById('hsp-canvas-curves').addEventListener('click', () => this.triggerStrike(true));

          const btnDelta = document.getElementById('hsp-spec-delta');
          const btnAbs = document.getElementById('hsp-spec-abs');
          if (btnDelta) btnDelta.addEventListener('click', () => { this.specMode = 'delta'; this.updateUI(); });
          if (btnAbs) btnAbs.addEventListener('click', () => { this.specMode = 'abs'; this.updateUI(); });

          const bindStepGroup = (grpId, prop) => {
            const grp = document.getElementById(grpId);
            if (!grp) return;
            grp.querySelectorAll('.hsp-step-btn').forEach(btn => {
              btn.addEventListener('click', () => {
                const v = parseInt(btn.getAttribute('data-val'), 10);
                if (!Number.isNaN(v)) {
                  this[prop] = v;
                  this.updateUI();
                  if (!this.autoLoop) this.triggerStrike(false);
                }
              });
            });
          };
          bindStepGroup('hsp-grp-tension', 'tension');
          bindStepGroup('hsp-grp-shape', 'shape');
          bindStepGroup('hsp-grp-density', 'density');
          bindStepGroup('hsp-grp-contour', 'contourStiff');

          // Presentation Deck Lifecycle: Pause rAF when Slide 34 is inactive, resume cleanly when active
          const obs = new MutationObserver(() => {
            if (this.isSlideActive()) {
              this.lang = document.documentElement.lang || this.lang || 'de';
              this.strikeStartMs = performance.now();
              if (this.autoLoop) this.isStriking = true;
              requestAnimationFrame(() => {
                this.applyLanguageTexts();
                this.updateUI();
                this.startAnimLoop();
              });
              setTimeout(() => {
                this.updateUI();
                this.startAnimLoop();
              }, 45);
            } else if (this.animId) {
              cancelAnimationFrame(this.animId);
              this.animId = null;
            }
          });
          obs.observe(slideEl, { attributes: true, attributeFilter: ['class'] });

          if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(() => {
              if (this.isSlideActive()) {
                const phys = this.computePhysics();
                this.drawHeadCanvas(phys);
                this.drawCurvesCanvas(phys);
              }
            });
            slideEl.querySelectorAll('.hsp-canvas-wrap').forEach(w => ro.observe(w));
          }

          window.addEventListener('resize', () => {
            if (this.isSlideActive()) this.updateUI();
          }, { passive: true });

          window.addEventListener('languageChanged', (e) => {
            this.lang = (e.detail && e.detail.lang) ? e.detail.lang : (document.documentElement.lang || 'de');
            this.applyLanguageTexts();
            this.updateUI();
          });

          this.lang = document.documentElement.lang || 'de';
          this.applyLanguageTexts();
          this.updateUI();
          if (this.isSlideActive()) this.startAnimLoop();
        }
      }

      window.HammerSpringController = new HammerSpringController();
    })();
