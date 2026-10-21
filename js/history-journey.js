/**
 * Louis Renner Presentation - Interactive Zeitstrahl (Timeline) Controller
 * Based strictly on https://www.louis-renner.de/ueber-renner/die-geschichte-renners/
 * Features:
 * - Central Horizontal Spine (Trunk) running across the screen center
 * - Vertical Tree Branches sprouting UP/DOWN to open each epoch
 * - Large authentic historical picture in primary focus (museum-grade gold frame)
 * - Ultra-compact, punchy narrative (1 sentence + key fact tag)
 * - Draggable central scrubber, autoplay documentary mode, and remote clicker
 * - 4-Language Localization: DE, EN, JA, ZH
 */

class RennerHistoryJourney {
  constructor() {
    this.currentMilestone = 0;
    this.currentLang = 'de';
    this.totalMilestones = 9;
    this.isAutoplay = false;
    this.autoplayDuration = 6000; // 6 seconds per epoch in documentary mode
    this.autoplayStartTime = null;
    this.autoplayRaf = null;
    this.animationTimeouts = [];
    this.isStarted = false;

    this.milestonesData = {
      0: {
        id: '1882',
        year: '1882',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Gründung', en: 'Founding', ja: '創業', zh: '工坊创立' },
        heading: {
          de: '1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik',
          en: '1882: Founded in Stuttgart – The Journey Begins with Piano Actions',
          ja: '1882年：シュトゥットガルト創業 — ピアノアクションから始まった旅',
          zh: '1882年：斯图加特匠心工坊创立 — 击弦机开启百年传奇'
        },
        sentence: {
          de: 'Im Oktober 1882 gründete Louis Renner seine Werkstatt in der Stuttgarter Heusteigstraße – mit dem Ziel, hochpräzise Klaviermechaniken als Herzstück des Instruments zu fertigen.',
          en: 'In October 1882, Louis Renner established his workshop on Heusteigstrasse in Stuttgart to handcraft high-precision piano actions as the heart of the instrument.',
          ja: '1882年10月、ルイス・レンナーはシュトゥットガルトに工房を開設し、ピアノの心臓部である高精度アクションの手作業製造を開始しました。',
          zh: '1882年10月，路易·雷诺在斯图加特设立手工工坊，专注打造作为钢琴传动心脏的高精度击弦机。'
        },
        bullets: {
          de: [
            '<strong>Feinmechanik im Fokus:</strong> Beginn der Fertigung höchstpräziser Klaviermechaniken.',
            '<strong>Historische Parallele:</strong> Zeitgleich zu Rönischs Panzerplatte setzt Renner den Präzisionsmaßstab.',
            '<strong>Wurzel von Meuselwitz:</strong> Grundstein der Tradition, die 1990 in Thüringen zusammenfloss.'
          ],
          en: [
            '<strong>Focus on Actions:</strong> Launch of high-precision upright piano actions.',
            '<strong>Historical Parallel:</strong> Alongside Rönisch\'s iron plate, Renner sets the precision benchmark.',
            '<strong>Root of Meuselwitz:</strong> Laying the foundation that united in Thuringia in 1990.'
          ],
          ja: [
            '<strong>精密アクションに特化：</strong> 最高精度のアップライト機構の製造を開始。',
            '<strong>歴史的革新との呼応：</strong> レーニッシュの総鉄骨と並び、究極の精度基準を確立。',
            '<strong>モイゼルヴィッツの起源：</strong> 1990年に統合される偉大な伝統の礎を構築。'
          ],
          zh: [
            '<strong>专注精工击弦机：</strong> 开启立式钢琴超精密击弦核心制造。',
            '<strong>百年历史呼应：</strong> 与罗尼施全铁板齐名，确立机械传动巅峰标准。',
            '<strong>莫伊瑟尔维茨之源：</strong> 奠定1990年汇聚图林根的百年工艺基石。'
          ]
        },
        fact: {
          de: '✦ Beginn mit Klaviermechaniken 1882 • Historische Wurzel von Meuselwitz',
          en: '✦ Journey Began with Piano Actions 1882 • Historic Roots of Meuselwitz',
          ja: '✦ 1882年アクション製造から始動 • モイゼルヴィッツ本社の歴史的ルーツ',
          zh: '✦ 1882年以击弦机启航 • 莫伊瑟尔维茨总部的历史之源'
        },
        quote: {
          de: '„Von der Stuttgarter Werkstatt 1882 bis zur Übernahme der Mechanik-Fertigung der Piano Union 1990: Unsere Meuselwitzer Wurzeln vereinen die großen Meilensteine deutscher Klavierbautradition.“',
          en: '“From the 1882 Stuttgart workshop to the 1990 acquisition of Piano Union\'s action facility: Our Meuselwitz roots unite the greatest milestones of German piano building heritage.”',
          ja: '「1882年のシュトゥットガルト創業から1990年のピアノ・ユニオン継承へ。モイゼルヴィッツの礎には、ドイツピアノ製造史の最高峰の結晶が息づいています。」',
          zh: '“从1882年斯图加特工坊到1990年收购钢琴联盟击弦机制造厂：我们莫伊瑟尔维茨的根基，凝聚着德国钢琴制造史两大传奇的最璀璨篇章。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik & Ursprung Meuselwitz',
          en: 'Louis Renner Chronicle & Origin of Meuselwitz',
          ja: 'ルイス・レンナー年代記 ＆ モイゼルヴィッツの起源',
          zh: '路易·雷诺原厂档案 · 莫伊瑟尔维茨起源纪事'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
          'Visuell/Bilder/01_Geschichte/01_1882_rohlfing_klaviermechanik_vintage.webp',
          'Visuell/Bilder/01_Geschichte/01_1882_werkstatt_stuttgart_illustration.png'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
        imageTag: { de: '1882 Gründung', en: '1882 Founding', ja: '1882年創業', zh: '1882年创立' },
        imageCaption: {
          de: 'Gründer: Louis Renner 1882',
          en: 'Founder: Louis Renner 1882',
          ja: '創業者：ルイス・レンナー（1882年）',
          zh: '创始人：路易·雷诺（1882年）'
        },
        imageCaptions: {
          de: [
            'Gründer: Louis Renner 1882',
            'Historische Klaviermechanik – Beginn der Reise',
            'Erste Werkstatt in der Heusteigstraße Stuttgart 1882'
          ],
          en: [
            'Founder: Louis Renner 1882',
            'Historical Piano Action – The Journey Begins',
            'First Workshop on Heusteigstrasse Stuttgart 1882'
          ],
          ja: [
            '創業者：ルイス・レンナー（1882年）',
            '歴史的アップライト・アクション — 旅の始まり',
            'シュトゥットガルト・ホイシュタイグ通りの初代工房（1882年）'
          ],
          zh: [
            '创始人：路易·雷诺（1882年）',
            '历史经典立式钢琴击弦机 — 传奇之旅的起点',
            '斯图加特霍伊施泰希街的第一代手工工坊（1882年）'
          ]
        },
        slide_interval: 3500
      },

      1: {
        id: '1906',
        year: '1906',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Hammer', en: 'Hammerheads', ja: '自社ハンマー', zh: '弦槌制造' },
        heading: {
          de: '1906: Aufnahme der anspruchsvollen Hammerkopffertigung',
          en: '1906: Launch of Dedicated Hammerhead Manufacturing',
          ja: '1906年：音色の魂「ハンマーヘッド」の自社製造開始',
          zh: '1906年：开启声学核心部件“弦槌”自主制造'
        },
        sentence: {
          de: 'Von Cristoforis erstem Hammerkopf (1700) zu Renners eigener Fertigung ab 1906: Der entscheidende Schritt, der später den unverwechselbaren Klang jedes Steinway-Flügels definierte.',
          en: 'From Cristofori’s first hammer in 1700 to Renner’s in-house production in 1906: The milestone that came to define the sound of every Steinway grand.',
          ja: '1700年のクリストフォリによる打弦機構から1906年のレンナー自社製造へ。後にすべてのスタインウェイの響きを決定づける歴史的一歩となりました。',
          zh: '从1700年克里斯托弗里首创弦槌到1906年雷诺自产：这一决定性一步，日后定义了每一架施坦威三角钢琴的传奇音色。'
        },
        bullets: {
          de: [
            '<strong>Cristoforis Impuls:</strong> Vom Ur-Hammerkopf (1700) zur ersten industriellen Perfektion.',
            '<strong>Eigene Spezialpressen:</strong> Entwicklung eigener Hochdruckpressen für maximale Dynamik.',
            '<strong>Globaler Klangstandard:</strong> Maßstab für Steinway und führende Flügelbauer weltweit.'
          ],
          en: [
            '<strong>Cristofori’s Legacy:</strong> From the early 1700 hammer to industrial perfection.',
            '<strong>Proprietary Presses:</strong> Custom high-pressure presses for unmatched acoustic dynamics.',
            '<strong>Global Tone Standard:</strong> Defining the sound of Steinway and premier pianos worldwide.'
          ],
          ja: [
            '<strong>クリストフォリの継承：</strong> 1700年の初頭ハンマーから工業的完成形へ。',
            '<strong>自社開発の高圧プレス：</strong> 圧倒的な打弦レスポンスを生む専用プレス機を開発。',
            '<strong>世界的トーン基準：</strong> スタインウェイをはじめ世界の銘器の響きを決定づける。'
          ],
          zh: [
            '<strong>传承克里斯托弗里：</strong> 从1700年原始弦槌跃升至工业级完美巅峰。',
            '<strong>自研高压成型机：</strong> 自主研发专用高压模具，赋予无与伦比的动态声学。',
            '<strong>全球顶级音色标准：</strong> 定义施坦威及全球名琴的标志性音色基准。'
          ]
        },
        fact: {
          de: '✦ Von Cristoforis Papierröllchen 1700 • Zum weltweiten Renner-Klangstandard ab 1906',
          en: '✦ From Cristofori’s Paper Roll in 1700 • To Renner’s Global Tone Standard from 1906',
          ja: '✦ 1700年クリストフォリの紙ロールから • 1906年以降の世界基準レンナートーンへ',
          zh: '✦ 从1700年克里斯托弗里的纸卷弦槌 • 到1906年雷诺开启的全球声学标准'
        },
        quote: {
          de: '„Vom lederbezogenen Papierröllchen Cristoforis zur perfekten Spannungsbalance: Der Hammerkopf ist die Seele des Klavierklangs.“',
          en: '“From Cristofori’s leather-covered paper roll to the perfect balance of tension: the hammerhead is the soul of the piano’s sound.”',
          ja: '「クリストフォリの革巻き紙ロールから完璧な張力バランスへ：ハンマーヘッドこそがピアノの魂である。」',
          zh: '“从克里斯托弗里皮革包裹的纸卷，到张力平衡的极致化境：弦槌正是钢琴音色的灵魂所在。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Manufaktur • Klangtradition seit 1906',
          en: 'Louis Renner Manufacture • Acoustic Heritage since 1906',
          ja: 'ルイス・レンナー製造所 • 1906年以来の音響の伝統',
          zh: '路易·雷诺制造工坊 • 自1906年传承至今的声学传奇'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1700_christofori_hammermechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1906_mechanikfertigung_historisch.png',
          'Visuell/Bilder/01_Geschichte/01_1906_hammerkopf_pressen_fertigung.png'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
        imageTag: { de: '1906 Hammer', en: '1906 Hammer', ja: '1906年ハンマー', zh: '1906年弦槌制造' },
        imageCaption: {
          de: 'Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)',
          en: 'Bartolomeo Cristofori (1655–1731) – Inventor of the Piano Action (1700)',
          ja: 'バルトロメオ・クリストフォリ（1655–1731）— ピアノアクションの発明者（1700年）',
          zh: '巴尔托洛梅奥·克里斯托弗里（1655–1731）— 钢琴击弦机发明先驱（1700年）'
        },
        imageCaptions: {
          de: [
            'Bartolomeo Cristofori (1655–1731) – Erfinder der Klaviermechanik (1700)',
            '1700: Erste Hammer-Mechanik von Bartolomeo Cristofori – Der Ursprung des Hammerkopfs',
            '1906: Beginn der eigenen Hammerkopffertigung mit eigens entwickelten Pressen',
            'Hammerkopfnieten im Halbautomaten'
          ],
          en: [
            'Bartolomeo Cristofori (1655–1731) – Inventor of the Piano Action (1700)',
            '1700: First Hammer Action by Bartolomeo Cristofori – Origin of the Hammerhead',
            'Historical Action Manufacturing: Handcrafted Precision at Louis Renner',
            '1906: Launch of Dedicated Hammerhead Manufacturing with Custom Presses'
          ],
          ja: [
            'バルトロメオ・クリストフォリ（1655–1731）— ピアノアクションの発明者（1700年）',
            '1700年：クリストフォリによる初のアクション機構 — ハンマーヘッドの起源',
            '歴史的アクション製造工程：ルイス・レンナーの手工業的精密工学',
            '1906年：独自開発の専用プレスによる自社ハンマーヘッド製造の開始'
          ],
          zh: [
            '巴尔托洛梅奥·克里斯托弗里（1655–1731）— 钢琴击弦机发明先驱（1700年）',
            '1700年：克里斯托弗里首创击弦机结构 — 现代弦槌与击弦机械之源',
            '雷诺早期手工击弦机精密制造车间：德国工艺精神的薪火相传',
            '1906年：自主研发专用冷压成型机开启自产弦槌新纪元'
          ]
        },
        slide_interval: 3500
      },

      2: {
        id: '1911',
        year: '1911',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Antriebe', en: 'Electrification', ja: '電化革命', zh: '单驱电化' },
        heading: {
          de: '1911: Oscar Renners Pioniertat – Einzelantriebe & Flügelprogramm',
          en: '1911: Oscar Renner’s Milestone – Individual Drives & Grand Actions',
          ja: '1911年：個別モーターによる電化革命とグランド機構',
          zh: '1911年：工业单驱电化革命与首批三角击弦机'
        },
        sentence: {
          de: '1911 erweiterte Oscar Renner das Programm um vollständige Konzert-Flügelmechaniken und trieb die Modernisierung mit hunderten elektrischen Einzelantrieben voran.',
          en: 'In 1911, Oscar Renner expanded production to complete concert grand actions and modernized the factory with hundreds of electric individual drives.',
          ja: '1911年、オスカー・レンナーはコンサート・グランド用アクションの自社製造を開始し、工場全体に数百基の独立電動モーターを導入しました。',
          zh: '1911年，奥斯卡·雷诺全面投产音乐会三角钢琴击弦机，并以数百台独立电动机实现工坊电气化升级。'
        },
        bullets: {
          de: [
            '<strong>Érard-Repetition:</strong> Doppelte Auslösung als Fundament moderner Flügelmechaniken.',
            '<strong>Konzertprogramm komplett:</strong> Flügel- und Klaviermechaniken aus einer Meisterhand.',
            '<strong>Hunderte Einzelmotoren:</strong> Wegweisende Umstellung von Transmissionen auf Elektro-Einzelantrieb.'
          ],
          en: [
            '<strong>Érard Repetition:</strong> Double repetition action as the foundation of modern grand pianos.',
            '<strong>Complete Concert Line:</strong> Grand and upright actions united under one master roof.',
            '<strong>Hundreds of Electric Motors:</strong> Pioneering switch from central belts to individual drive units.'
          ],
          ja: [
            '<strong>エラール機構の継承：</strong> 近代グランド演奏を支えるダブル・レペティションの完成。',
            '<strong>コンサートライン完備：</strong> アップライトとグランドの最高峰機構を自社完結。',
            '<strong>数百基の独立モーター：</strong> 駆動ベルトから振動のない個別電動モーターへ全館転換。'
          ],
          zh: [
            '<strong>埃拉尔复奏结构：</strong> 以双重脱落结构奠定现代三角琴演奏基石。',
            '<strong>音乐会全谱系齐备：</strong> 三角与立式击弦机完全实现自主研制闭环。',
            '<strong>数百台独立电机驱动：</strong> 彻底淘汰传统总轴，实现现代独立电驱革命。'
          ]
        },
        fact: {
          de: '✦ Érards Repetition als Fundament • 1911: Erste Renner-Flügelmechaniken & Hunderte Einzelmotoren',
          en: '✦ Érard’s Repetition as Foundation • 1911: First Renner Grand Actions & Electric Modernization',
          ja: '✦ エラールの機構を礎に • 1911年：初のレンナー・グランドアクションと電化革命',
          zh: '✦ 传承埃拉尔复奏基石 • 1911年：首批雷诺三角击弦机与工业电化革新'
        },
        quote: {
          de: '„Um alle Zweige der Herstellung von Klaviermechaniken in einer Hand zu vereinigen und dem Fabrikationsprogramm eine gewisse Abrundung zu geben, wurde jetzt auch die Fertigung von Flügelmechaniken aufgenommen.“',
          en: '“To unite all branches of piano action manufacturing under one roof and bring comprehensive rounded perfection to the manufacturing program, the production of grand piano actions was inaugurated.”',
          ja: '「ピアノアクション製造の全工程を自らの手で統合し、製造プログラムを完結させるため、グランドピアノ用アクションの製造に着手した。」',
          zh: '“为将钢琴机械制造的所有细分工艺凝聚于自主工序之中，并赋予产品谱系圆融的完整性，我们正式开启了三角钢琴击弦机的制造。”'
        },
        quoteAuthor: {
          de: 'Oscar Renner • Firmenchronik 1911',
          en: 'Oscar Renner • Company Chronicle 1911',
          ja: 'オスカー・レンナー • 社史（1911年）',
          zh: '奥斯卡·雷诺 • 企业历史档案（1911年）'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1808_erard_repetitionsmechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1911_renner_elektrifizierte_arbeitsumgebung.webp'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
        imageTag: { de: '1911 Antriebe', en: '1911 Drives', ja: '1911年電化', zh: '1911年单驱电化' },
        imageCaption: {
          de: 'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel',
          en: 'Sébastien Érard (1752–1831) – Inventor of the double escapement grand piano action',
          ja: 'セバスチャン・エラール（1752–1831）— グランドピアノ用ダブル・エスケープメント機構の発明者',
          zh: '塞巴斯蒂安·埃拉尔（1752–1831）— 三角钢琴双击弦机复奏机构发明先驱'
        },
        imageCaptions: {
          de: [
            'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik für Flügel',
            '1808 / 1821: Érard-Repetitionsmechanik – Das Fundament des modernen Flügelprogramms',
            'Hunderte elektrische Einzelantriebe: Technisierung unter Oscar Renner (1911)'
          ],
          en: [
            'Sébastien Érard (1752–1831) – Inventor of the double escapement grand piano action',
            '1808 / 1821: Érard repetition action – The foundation of modern grand piano actions',
            'Hundreds of electric individual drives: Modernization under Oscar Renner (1911)'
          ],
          ja: [
            'セバスチャン・エラール（1752–1831）— グランドピアノ用ダブル・エスケープメント機構の発明者',
            '1808年/1821年：エラールによるダブル・レペティション機構 — 現代グランドピアノの礎',
            '個別モーターによる振動なき高精度加工体制（1911年）'
          ],
          zh: [
            '塞巴斯蒂安·埃拉尔（1752–1831）— 三角钢琴双击弦机复奏机构发明先驱',
            '1808 / 1821年：埃拉尔复奏击弦机结构 — 现代三角钢琴全系制造的技术基石',
            '奥斯卡·雷诺时期的数百台独立电机高精加工车间（1911）'
          ]
        },
        slide_interval: 3500
      },

      3: {
        id: '1944',
        year: '1944',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Brandnacht', en: 'Destruction', ja: '戦禍の炎', zh: '浴火重生' },
        heading: {
          de: '1944: Zerstörung der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau',
          en: '1944: Factory Destruction & Indomitable Resolve to Rebuild',
          ja: '1944年：工場の全焼と不屈の再建意志',
          zh: '1944年：厂区遭遇空袭火灾与坚韧重建誓言'
        },
        sentence: {
          de: 'In der Stuttgarter Bombennacht vom 24./25. Juli 1944 brannten alle Renner-Gebäude nieder – doch der Wille zum sofortigen Wiederaufbau war ungebrochen.',
          en: 'During the devastating Stuttgart air raid on July 24/25, 1944, all Renner buildings burned down – yet the resolve to rebuild remained unshaken.',
          ja: '1944年7月24/25日のシュトゥットガルト空襲により全工場が全焼。しかし瓦礫の中から即座に再建への誓いが立ち上がりました。',
          zh: '1944年7月24/25日斯图加特大空袭中，雷诺全部厂房化为火海灰烬——但在废墟瓦砾之中，重建誓言坚不可摧。'
        },
        bullets: {
          de: [
            '<strong>Totalverlust im Feuersturm:</strong> Zerstörung der Stuttgarter Werke am 24./25. Juli 1944.',
            '<strong>Mut zur Zukunft:</strong> Sofortiger Entschluss zum Wiederaufbau noch in den Trümmern.',
            '<strong>Geschlossene Belegschaft:</strong> Gemeinsamer Wiederbeginn unter schwersten Bedingungen.'
          ],
          en: [
            '<strong>Total Loss in Firestorm:</strong> Complete destruction of Stuttgart plants on July 24/25, 1944.',
            '<strong>Courage to Rebuild:</strong> Immediate resolve to reconstruct directly amid the ruins.',
            '<strong>United Workforce:</strong> Together laying the foundation for rebirth against all odds.'
          ],
          ja: [
            '<strong>戦火による全焼：</strong> 1944年7月24/25日の空襲によりシュトゥットガルト工場が全焼。',
            '<strong>不屈の再建決意：</strong> 瓦礫の中で直ちに完全再建への不屈の決断を下す。',
            '<strong>結束した社員力：</strong> 最も過酷な状況下で全員が立ち上がり新たな未来を拓く。'
          ],
          zh: [
            '<strong>战火烈焰浩劫：</strong> 1944年7月24/25日斯图加特工厂毁于轰炸。',
            '<strong>废墟中浴火重生：</strong> 瓦砾未凉之际便毅然立下立即重建的坚定誓愿。',
            '<strong>全员同心聚力：</strong> 克服重重天堑，携手奠定重铸辉煌的基石。'
          ]
        },
        fact: {
          de: '✦ Bombennacht 24./25.07.1944 & Wiederaufbau',
          en: '✦ July 24/25, 1944 & Indomitable Rebuilding',
          ja: '✦ 1944年7月空襲と不屈の再興',
          zh: '✦ 1944年7月空袭浩劫与浴火重生'
        },
        quote: {
          de: '„Trotz Zerstörung, trotz unendlicher Hindernisse: Renner wird wieder aufgebaut!“',
          en: '“Despite destruction and immense obstacles: Renner will be rebuilt!”',
          ja: '「いかなる破壊や計り知れぬ困難があろうとも、レンナーは必ずや再興する！」',
          zh: '“纵使千难万险、满目疮痍，雷诺必将在废墟上重获新生！”'
        },
        quoteAuthor: {
          de: 'Wilhelm Megenhardt • Chronik 1944',
          en: 'Wilhelm Megenhardt • Chronicle 1944',
          ja: 'ヴィルヘルム・メーゲンハルト（1944年社史）',
          zh: '威廉·梅根哈特 • 1944年厂史文献'
        },
        image: 'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_1.jpg',
        imageTag: { de: '1944 Brandnacht', en: '1944 Rebuild', ja: '1944年再建', zh: '1944年重建' },
        imageCaption: {
          de: 'Historische Dokumente: Stuttgarter Bombennacht & Zerstörung 1944 vor dem Wiederaufbau',
          en: 'Historical archive: Stuttgart destruction & bombing raids 1944 before reconstruction',
          ja: '歴史的記録：1944年シュトゥットガルト空襲による戦災と不屈の再興',
          zh: '珍贵历史档案：1944年斯图加特空袭浩劫与废墟中的浴火重生'
        }
      },

      4: {
        id: '1951',
        year: '1951/1952',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Manfred Renner', en: 'Manfred Renner', ja: 'マンフレート・レンナー', zh: '曼弗雷德·雷诺' },
        heading: {
          de: '1951/1952: Dr. Manfred Renner & Vollendung des Wiederaufbaus',
          en: '1951/1952: Dr. Manfred Renner & Rebuilding Completed',
          ja: '1951/1952年：マンフレート・レンナー博士と本社の完全復興',
          zh: '1951/1952年：曼弗雷德·雷诺博士掌舵与全面重建完成'
        },
        sentence: {
          de: 'Mit Dr. Manfred Renner trat 1951 die 3. Generation an die Unternehmensspitze, vollendete den Wiederaufbau und führte Renner zu neuer internationaler Größe.',
          en: 'In 1951, Dr. Manfred Renner took leadership as the 3rd generation, completed the reconstruction, and ushered in a golden era of global growth.',
          ja: '1951年、創業家第3世代のマンフレート・レンナー博士が就任し、完全復興を成し遂げて世界基準の飛躍を牽引しました。',
          zh: '1951年，第三代传承人曼弗雷德·雷诺博士执掌帅印，圆满完成全面重建并带领企业迈向全球辉煌。'
        },
        bullets: {
          de: [
            '<strong>3. Generation am Ruder:</strong> Dr. Manfred Renner übernimmt die Unternehmensführung (1951).',
            '<strong>Neues Stammwerk (1955):</strong> Feierlicher Wiedereinzug in das Stuttgarter Hauptgebäude.',
            '<strong>Weltmarktführerschaft:</strong> Konsequente Qualitätsstandards festigen die Weltspitze.'
          ],
          en: [
            '<strong>3rd Generation Leadership:</strong> Dr. Manfred Renner takes the helm in 1951.',
            '<strong>New Headquarters (1955):</strong> Ceremonial return to the rebuilt Stuttgart main facility.',
            '<strong>Global Leadership:</strong> Rigorous quality standards cement worldwide market leadership.'
          ],
          ja: [
            '<strong>第3世代の就任：</strong> 1951年、マンフレート・レンナー博士が新経営トップへ。',
            '<strong>新社屋への復帰（1955年）：</strong> 完全再建されたシュトゥットガルト本拠地へ誇り高き帰還。',
            '<strong>世界市場の頂点へ：</strong> 徹底した品質管理で世界のピアノ界を席巻。'
          ],
          zh: [
            '<strong>第三代领航人：</strong> 1951年曼弗雷德·雷诺博士掌舵企业全面现代化。',
            '<strong>重返主厂区（1955年）：</strong> 隆重庆祝全新建成的斯图加特总部大楼启用。',
            '<strong>巩固全球领袖地位：</strong> 严苛至极的品控标准确立全球不可动摇的霸主地位。'
          ]
        },
        fact: {
          de: '✦ 1951/1952 • Manfred Renner & Wiederbezug 1955',
          en: '✦ 1951/1952 • Dr. Manfred Renner & 1955 Return',
          ja: '✦ 1951/1952年 マンフレート博士参画＆1955年本館復興',
          zh: '✦ 1951/1952 曼弗雷德博士掌舵与1955新总部落成'
        },
        quote: {
          de: '„Mit jugendlichem Eifer nahm er die Zügel in die Hand und ließ den Wiederaufbau bis zur ursprünglichen Ausdehnung durchführen.“',
          en: '“With youthful vigor he took the reins, guiding the full reconstruction back to its historic greatness.”',
          ja: '「若き情熱をもって舵を取り、工場の規模をかつての雄姿へと完全に復興させた。」',
          zh: '“他以年轻坚韧的进取魄力执掌大局，主导企业全面恢复至往昔的宏大规模。”'
        },
        quoteAuthor: {
          de: 'Renner Chronik • 1951/1952',
          en: 'Renner Chronicle • 1951/1952',
          ja: 'ルイス・レンナー社史（1951/1952年）',
          zh: '雷诺原厂档案（1951/1952年）'
        },
        image: 'Visuell/web_assets/herstellung-renermechanik.png',
        imageTag: { de: '1951/1952 Wiederaufbau', en: '1951/1952 Rebuild', ja: '1951/1952年 復興', zh: '1951/1952 重建乔迁' },
        imageCaption: {
          de: 'Vollendung des Wiederaufbaus und Wiedereinzug in das Stuttgarter Hauptgebäude (1955)',
          en: 'Completion of the reconstruction and return to the Stuttgart headquarters (1955)',
          ja: '工場の完全復興とシュトゥットガルト本社本館への帰還（1955年秋）',
          zh: '战后全面重建圆满竣工与重返斯图加特总部大楼（1955年秋）'
        }
      },

      5: {
        id: '1990',
        year: '1990',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Zeitenwende', en: 'Turning Point', ja: '時代の転換点', zh: '时代转折' },
        heading: {
          de: '1990: Mauerfall, Zeitenwende & Sicherung des Fortbestands',
          en: '1990: Fall of the Wall & Securing Renner’s Future',
          ja: '1990年：ベルリンの壁崩壊と存亡を賭けたツァイツ工場継承',
          zh: '1990年：柏林墙倒塌、时代转折与雷诺存续之战'
        },
        sentence: {
          de: '1990 nutzte Renner die historische Chance der Wiedervereinigung: Die Übernahme der Mechanikfertigung in Zeitz sicherte die Existenz des Unternehmens und legte die Basis für Meuselwitz.',
          en: 'In 1990, Renner seized the historic opportunity of reunification: Acquiring action manufacturing in Zeitz saved the company and laid the foundation for Meuselwitz.',
          ja: '1990年、ドイツ再統一の歴史的転換点において、ツァイツのアクション製造部門を継承。倒産危機を回避し、モイゼルヴィッツ拠点の礎を築きました。',
          zh: '1990年，雷诺抓住两德统一历史契机：收购蔡茨击弦机制造基地，化解生死危机并为莫伊瑟尔维茨奠定根基。'
        },
        bullets: {
          de: [
            '<strong>Chance der Einheit:</strong> Übernahme der Mechanik-Fertigung der Piano Union in Zeitz.',
            '<strong>Großkunde Schimmel gerettet:</strong> Sicherung der Kapazitäten für über 40 Klaviere pro Tag.',
            '<strong>Tor nach Meuselwitz:</strong> Entscheidende Weichenstellung für den heutigen Thüringer Hauptsitz.'
          ],
          en: [
            '<strong>Historic Opportunity:</strong> Acquiring the Piano Union action facility in Zeitz in 1990.',
            '<strong>Securing Customer Schimmel:</strong> Guaranteeing daily output for over 40 pianos.',
            '<strong>Gateway to Meuselwitz:</strong> Strategic turning point leading directly to our current HQ.'
          ],
          ja: [
            '<strong>東西統一の好機：</strong> 1990年、ツァイツのピアノ・ユニオン機構製造部門を買収。',
            '<strong>大口顧客シンメルを死守：</strong> 1日40台以上の生産キャパシティを確保し存亡の危機を打開。',
            '<strong>モイゼルヴィッツへの道：</strong> 現在のチューリンゲン世界本社へと直結する歴史的転換点。'
          ],
          zh: [
            '<strong>两德统一历史机遇：</strong> 1990年闪电收购蔡茨击弦机制造核心基地。',
            '<strong>力挽核心巨客户舒密尔：</strong> 确保日产逾40架钢琴的产能，打破生存困局。',
            '<strong>通往莫伊瑟尔维茨之路：</strong> 奠定当今图林根全球总部的关键转折点。'
          ]
        },
        fact: {
          de: '✦ 1990 • Wende, Schimmel-Partnerschaft & Zeitz',
          en: '✦ 1990 • German Unity, Schimmel Partnership & Zeitz',
          ja: '✦ 1990年 • ドイツ統一・シンメル社との絆・ツァイツ',
          zh: '✦ 1990 • 两德统一 · 舒密尔核心伙伴 · 蔡茨基地'
        },
        quote: {
          de: '„Die Übernahme der Mechanik-Fertigung in Zeitz war für Renner eine Frage des nackten Fortbestands – sie sicherte unseren größten Kunden Schimmel und schuf das Fundament unserer Zukunft.“',
          en: '“Acquiring the action manufacturing in Zeitz was a matter of sheer survival for Renner – it preserved our largest customer Schimmel and forged the foundation of our future.”',
          ja: '「ツァイツのアクション製造部門継承は、レンナーにとって生き残りを賭けた決断であった。それは最大顧客シンメルを守り、未来への礎を築いた。」',
          zh: '“接管蔡茨击弦机制造基地，是雷诺关乎生死存亡的关键之役——它保住了我们最大的客户舒密尔，铸就了通向未来的坚实基石。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • Das Wendejahr 1990',
          en: 'Louis Renner Chronicle • The Turning Point of 1990',
          ja: 'ルイス・レンナー年代記 • 1990年激動の記録',
          zh: '路易·雷诺原厂档案 · 1990转折之年'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
          'Visuell/Bilder/01_Geschichte/01_1990_piano_union_zeitz_mechanikfertigung.webp'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
        imageTag: { de: '1990 Wende & Zeitz', en: '1990 Unity & Zeitz', ja: '1990年 再統一とツァイツ', zh: '1990 蔡茨与两德统一' },
        imageCaption: {
          de: 'Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner',
          en: 'Fall of the Berlin Wall 1989 – The dawn of a new era for Germany and Louis Renner',
          ja: '1989年ベルリンの壁崩壊 — ドイツとルイス・レンナーの新時代への夜明け',
          zh: '1989年柏林墙倒塌 — 德国与路易·雷诺历史新纪元的拂晓'
        },
        imageCaptions: {
          de: [
            'Fall der Berliner Mauer 1989 – Beginn einer neuen Ära für Deutschland und Renner',
            'Historische Mechanik-Fertigung in Zeitz (Piano Union / Rönisch) – Die Rettung von Renners Zukunft'
          ],
          en: [
            'Fall of the Berlin Wall 1989 – The dawn of a new era for Germany and Louis Renner',
            'Historical action production in Zeitz (Piano Union / Rönisch) – Securing Renner\'s future'
          ],
          ja: [
            '1989年ベルリンの壁崩壊 — ドイツとルイス・レンナーの新時代への夜明け',
            'ツァイツの歴史的ピアノアクション製造拠点（ピアノ・ユニオン／レーニッシュの伝統）'
          ],
          zh: [
            '1989年柏林墙倒塌 — 德国与路易·雷诺历史新纪元的拂晓',
            '蔡茨历史悠久的钢琴击弦机生产厂区（罗尼施与钢琴联盟传承）— 拯救雷诺未来的关键之战'
          ]
        },
        slide_interval: 4000
      },

      6: {
        id: '2011',
        year: '2011',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Zwei Standorte', en: 'Two Sites', ja: '2拠点体制', zh: '双基地格局' },
        heading: {
          de: '2011: Zwei feste Standorte – Neubau Gärtringen & Kernfertigung Meuselwitz',
          en: '2011: Two Core Sites – Gärtringen & Meuselwitz',
          ja: '2011年：2大拠点体制 — ゲルトリンゲン新社屋とモイゼルヴィッツ中核工場',
          zh: '2011年：双核心基地格局 — 盖特林根新厂与莫伊瑟尔维茨核心工厂'
        },
        sentence: {
          de: 'Im Jahr 2011 bündelte Renner seine dezentralen Werke an zwei modernen Standorten: Gärtringen und Meuselwitz.',
          en: 'In 2011, Renner consolidated its dispersed production sites into two core centers of excellence: Gärtringen and Meuselwitz.',
          ja: '2011年、それまで分散していた拠点をゲルトリンゲンとモイゼルヴィッツの2大近代拠点へと集約統合しました。',
          zh: '2011年，雷诺将分散生产厂区正式合并归拢为两大现代化核心基地：盖特林根与莫伊瑟尔维茨。'
        },
        bullets: {
          de: [
            '<strong>Zwei feste Standorte:</strong> Umzug von Zeitz nach Meuselwitz und Neubau Gärtringen.',
            '<strong>Kernwerk Meuselwitz:</strong> 6.800 m² Großfertigung für Mechaniken, Hammerköpfe und Bauteile.',
            '<strong>Hauptsitz Gärtringen:</strong> Präzise Holzverarbeitung, Bohrwerkstätten und Verwaltung.'
          ],
          en: [
            '<strong>Two Dedicated Sites:</strong> Relocating from Zeitz to Meuselwitz alongside new Gärtringen site.',
            '<strong>Meuselwitz Core Facility:</strong> 6,800 m² for grand/upright actions, hammerheads, and parts.',
            '<strong>Gärtringen Headquarters:</strong> Precision woodworking, drilling workshops, and management.'
          ],
          ja: [
            '<strong>2拠点体制の確立：</strong> ツァイツからモイゼルヴィッツへの移転とゲルトリンゲン新社屋。',
            '<strong>モイゼルヴィッツ中核工場：</strong> 6,800㎡の最新施設で機構・ハンマー・精密パーツを生産。',
            '<strong>ゲルトリンゲン本社：</strong> 高度木工加工・CNC穴あけ・総合管理を統括。'
          ],
          zh: [
            '<strong>确立双基地格局：</strong> 蔡茨基地迁入莫伊瑟尔维茨，盖特灵根新厂拔地而起。',
            '<strong>莫伊瑟尔维茨核心工场：</strong> 6,800平米现代化超级车间专注击弦机、弦槌与核心部件。',
            '<strong>盖特灵根管理总部：</strong> 统辖超精密木工、数控钻孔及全球运营体系。'
          ]
        },
        fact: {
          de: '✦ 2011 • Zwei feste Standorte: Gärtringen & Meuselwitz (6.800 m²)',
          en: '✦ 2011 • Two Core Sites: Gärtringen & Meuselwitz (6,800 m²)',
          ja: '✦ 2011年 • 2大拠点体制：ゲルトリンゲン＆モイゼルヴィッツ（6,800㎡）',
          zh: '✦ 2011年 • 双核心基地：盖特林根与莫伊瑟尔维茨（6,800平方米）'
        },
        quote: {
          de: '„Im Jahr 2011 wurden die zuvor verstreuten Werke an zwei Standorten zusammengelegt: Meuselwitz und Gärtringen.“',
          en: '“In 2011, previously dispersed production facilities were consolidated into two core locations: Meuselwitz and Gärtringen.”',
          ja: '「2011年、分散していた製造体制はモイゼルヴィッツとゲルトリンゲンの2大拠点へと統合された。」',
          zh: '“2011年，此前分散的各个工厂正式整合为两大稳固基地：莫伊瑟尔维茨与盖特林根。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • Zwei Standorte 2011',
          en: 'Louis Renner Chronicle • Two Sites 2011',
          ja: 'ルイス・レンナー社史 • 2011年の2拠点体制',
          zh: '路易·雷诺官方厂史 • 2011双基地纪元'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
          'Visuell/Bilder/01_Geschichte/01_2011_standort_meuselwitz_vogelperspektive.jpg'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
        imageTag: { de: '2011 Standorte', en: '2011 Two Sites', ja: '2011年 2拠点体制', zh: '2011年 双基地' },
        imageCaption: {
          de: 'Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung',
          en: 'Gärtringen site: New building for woodworking, drilling workshops, and administration',
          ja: 'ゲルトリンゲン事業所：木工加工・穴あけ加工および総務管理の新社屋',
          zh: '盖特林根厂区：承担高精木工、数控钻孔及全球综合管理的新总部大楼'
        },
        imageCaptions: {
          de: [
            'Standort Gärtringen: Neubau für Holzbearbeitung, Bohrwerkstätten und Verwaltung',
            'Standort Meuselwitz aus der Vogelperspektive: Moderne Kernfertigung (6.800 m²) nach Umzug von Zeitz'
          ],
          en: [
            'Gärtringen site: New building for woodworking, drilling workshops, and administration',
            'Meuselwitz facility from above: Modern core manufacturing (6,800 m²) following relocation from Zeitz'
          ],
          ja: [
            'ゲルトリンゲン事業所：木工加工・穴あけ加工および総務管理の新社屋',
            '上空から見たモイゼルヴィッツ拠点：ツァイツ移転後の近代的コア製造工場（6,800㎡）'
          ],
          zh: [
            '盖特林根厂区：承担高精木工、数控钻孔及全球综合管理的新总部大楼',
            '鸟瞰莫伊瑟尔维茨生产基地：从蔡茨搬迁后的现代化核心制造基地（6,800平方米）'
          ]
        },
        slide_interval: 3500
      },

      7: {
        id: '2019',
        year: '2019',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Steinway & Sons', en: 'Steinway & Sons', ja: 'スタインウェイ', zh: '施坦威大家庭' },
        heading: {
          de: '2019: Steinway & Sons übernimmt Renner – 100% Eigenständigkeit',
          en: '2019: Steinway & Sons Acquires Renner – 100% Independence',
          ja: '2019年：スタインウェイ傘下へ — 完全な独立性の堅持',
          zh: '2019年：施坦威钢琴收购雷诺 — 恪守100%独立运营'
        },
        sentence: {
          de: '2019 entschied sich Inhaber Clemens von Arnim mit großer Weitsicht für Steinway & Sons – zum Schutz der Belegschaft und für die volle Unabhängigkeit von Renner.',
          en: 'In 2019, owner Clemens von Arnim chose Steinway & Sons with foresight – prioritizing the workforce and securing Renner’s full operational independence.',
          ja: '2019年、オーナーのクレメンス・フォン・アルニム氏は社員の雇用と事業の完全な独立を守るため、スタインウェイ傘下への参入を決断しました。',
          zh: '2019年，原控股股东克莱门斯·冯·阿尔尼姆以远见卓识选择施坦威——只为全方位保障员工权益与雷诺独立经营。'
        },
        bullets: {
          de: [
            '<strong>100% Eigenständigkeit:</strong> Steinway & Sons garantiert volle operative Unabhängigkeit.',
            '<strong>Verantwortung vor Profit:</strong> Clemens von Arnim lehnte höhere Gebote zum Schutz der Belegschaft ab.',
            '<strong>Ehrendes Gedenken († 2024):</strong> Tiefer Dank an Clemens von Arnim für seine visionäre Führung.'
          ],
          en: [
            '<strong>100% Autonomy:</strong> Steinway & Sons guarantees complete operational independence.',
            '<strong>People over Profit:</strong> Clemens von Arnim rejected higher bids to safeguard all jobs.',
            '<strong>In Memory († 2024):</strong> Profound gratitude to Clemens von Arnim for his visionary leadership.'
          ],
          ja: [
            '<strong>完全な事業独立性：</strong> スタインウェイが経営・製造の100%独立性を完全保証。',
            '<strong>社員を最優先：</strong> 故アルニム氏は従業員の雇用を守るため高額な買収提示を拒絶。',
            '<strong>心からの追悼（† 2024）：</strong> 崇高な先見性で未来を託した故人に深謝を捧ぐ。'
          ],
          zh: [
            '<strong>恪守100%自主运营：</strong> 施坦威郑重承诺雷诺享有完全独立的经营与制造主权。',
            '<strong>责任重于利润：</strong> 冯·阿尔尼姆先生拒绝更高出价，只为全力守护全体员工生计。',
            '<strong>深切缅怀（† 2024）：</strong> 由衷铭记冯·阿尔尼姆先生非凡的战略远见与奉献。'
          ]
        },
        fact: {
          de: '✦ 2019 • Steinway & In ehrendem Gedenken an Clemens von Arnim († 2024)',
          en: '✦ 2019 • Steinway & In Grateful Memory of Clemens von Arnim († 2024)',
          ja: '✦ 2019年 • スタインウェイ傘下＆故クレメンス・フォン・アルニム氏追悼',
          zh: '✦ 2019 • 施坦威集团加入与深切缅怀克莱门斯·冯·阿尔尼姆先生'
        },
        quote: {
          de: '„Ebenso wie wir verfügt Renner über eine sehr lange Tradition, ist führend in seinem Segment und beliefert Kunden weltweit mit hervorragender Qualität. Uns verbinden gleiche Werte – und es ist wichtig, dass Renner weiterhin unabhängig arbeiten wird.“',
          en: '“Renner boasts a rich heritage, leads its segment, and delivers superb quality worldwide. We share the same values – and Renner will continue to operate independently.”',
          ja: '「レンナー社は長い伝統と圧倒的品質を誇り、私たちと同じ価値観を共有しています。レンナーが引き続き独立して運営されることが不可欠です。」',
          zh: '“雷诺拥有极深厚的技术底蕴，在细分领域独占鳌头并向全球客户提供卓越品质。我们拥有相同的价值观，雷诺必将继续保持独立运营。”'
        },
        quoteAuthor: {
          de: 'Guido Zimmermann • President Steinway & Sons Hamburg',
          en: 'Guido Zimmermann • President Steinway & Sons Hamburg',
          ja: 'ギド・ツィンマーマン（スタインウェイ＆サンズ ハンブルク社長）',
          zh: '吉多·齐默尔曼 • 施坦威（Steinway & Sons）汉堡工厂总裁'
        },
        images: [
          'Visuell/Video/steinwayshort.mp4',
          'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg',
        imageTag: { de: '2019 Steinway', en: '2019 Steinway', ja: '2019年スタインウェイ', zh: '2019年施坦威' },
        imageCaption: {
          de: 'Historische Partnerschaft mit Steinway & Sons',
          en: 'Historic Partnership with Steinway & Sons and owner Clemens von Arnim in production († April 23, 2024)',
          ja: 'スタインウェイ＆サンズとの歴史的協業と製造現場の故クレメンス・フォン・アルニム氏（2024年4月23日逝去）',
          zh: '施坦威历史性携手与深入生产一线的原控股股东克莱门斯·冯·阿尔尼姆先生（2024年4月23日逝世）'
        },
        imageCaptions: {
          de: [
            'Historische Partnerschaft mit Steinway & Sons: 100% operative Eigenständigkeit',
            'Clemens von Arnim in der Fertigung: Schutz der Belegschaft & Zukunftssicherung'
          ],
          en: [
            'Historic Partnership with Steinway & Sons: 100% operational independence',
            'Clemens von Arnim on the factory floor: Protecting staff & securing the future'
          ],
          ja: [
            'スタインウェイ＆サンズとの歴史的協業：ルイス・レンナーの100%事業独立性を維持',
            '製造現場の故クレメンス・フォン・アルニム氏：従業員の保護と伝統の未来継承'
          ],
          zh: [
            '施坦威（Steinway & Sons）历史性携手：保障雷诺100%独立运营',
            '克莱门斯·冯·阿尔尼姆在生产一线：守护全体员工与百年品牌未来'
          ]
        },
        slide_interval: 4500
      },

      8: {
        id: 'heute',
        year: 'Heute',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Meuselwitz', en: 'Global HQ', ja: '統合世界本社', zh: '全球新总部' },
        heading: {
          de: 'Heute: Tradition bewahren. Zukunft gestalten.',
          en: 'Today: Preserving Tradition. Shaping the Future.',
          ja: '現在：伝統を守り、未来を創る',
          zh: '今日：恪守传统 · 塑造未来'
        },
        sentence: {
          de: 'Aus der kleinen Werkstatt von 1882 ist der globale Qualitätsmaßstab geworden. Heute bündelt Renner alle Kräfte am Welt-Hauptsitz Meuselwitz.',
          en: 'From a modest 1882 workshop to the global quality benchmark. Today, Renner unites all operations at its world headquarters in Meuselwitz.',
          ja: '1882年の小さな工房から世界的リーダーへ。今日、レンナーは全製造プロセスを統合世界本社モイゼルヴィッツへと集約しています。',
          zh: '从1882年工坊到全球第一品质标杆。今天，雷诺将全部力量汇聚于全球新总部莫伊瑟尔维茨。'
        },
        bullets: {
          de: [
            '<strong>Standortbündelung vollendet:</strong> Alle Fertigungsbereiche erfolgreich in Meuselwitz vereint.',
            '<strong>Dank an Team Gärtringen:</strong> Tiefste Anerkennung für jahrzehntelangen herausragenden Einsatz.',
            '<strong>Zukunft der Spitzenklasse:</strong> Konzentriertes Wissen sichert höchste Präzision für Generationen.'
          ],
          en: [
            '<strong>Consolidation Completed:</strong> All production branches successfully united in Meuselwitz.',
            '<strong>Gratitude to Team Gärtringen:</strong> Profound appreciation for decades of excellence.',
            '<strong>World-Class Future:</strong> Concentrated expertise securing highest precision for generations.'
          ],
          ja: [
            '<strong>統合の完全達成：</strong> 全製造部門をモイゼルヴィッツ世界本社へ完全に集約。',
            '<strong>ゲルトリンゲン社員へ感謝：</strong> 伝統を支え続けてくれた仲間たちに心からの敬意を。',
            '<strong>最高峰の未来へ：</strong> 結集した知見と最新設備で、次世代の完璧な品質を約束。'
          ],
          zh: [
            '<strong>全面整合圆满达成：</strong> 全部制造板块完整集聚于莫伊瑟尔维茨全球总部。',
            '<strong>致敬盖特灵根团队：</strong> 由衷铭记全体同仁数十年如一日的匠心奉献与付出。',
            '<strong>铸就传世顶级未来：</strong> 汇聚尖端工艺与最强产能，为未来世代锻造传世精密之作。'
          ]
        },
        fact: {
          de: '✦ Tradition bewahren • Zukunft gestalten',
          en: '✦ Preserving Tradition • Shaping the Future',
          ja: '✦ 伝統を守り • 未来を創る',
          zh: '✦ 恪守传统 • 塑造未来'
        },
        quote: {
          de: '„Erfahrung ist die Basis – Perfektion das Ziel.“',
          en: '“Experience is our foundation – perfection is our eternal goal.”',
          ja: '「経験が礎であり、完璧さこそが永遠の目標である。」',
          zh: '“深厚经验为立足之基，传世完美为至高之求。”'
        },
        quoteAuthor: {
          de: 'Clemens Kunert • Louis Renner Meuselwitz',
          en: 'Clemens Kunert • Louis Renner Meuselwitz',
          ja: 'クレメンス・クーナート（ルイス・レンナー モイゼルヴィッツ）',
          zh: '克莱门斯·库纳特 • 雷诺莫伊瑟尔维茨总部'
        },
        image: 'Visuell/Bilder/01_Geschichte/01_2026_standort_meuselwitz_hauptsitz.png',
        imageTag: { de: 'Meuselwitz 2026', en: 'Meuselwitz 2026', ja: 'モイゼルヴィッツ 2026', zh: '莫伊瑟尔维茨 2026' },
        imageCaption: {
          de: 'Welt-Hauptsitz Meuselwitz: Modernisierte Fertigungsstätte mit neuer zentraler Filter- & Absauganlage (2026)',
          en: 'World Headquarters Meuselwitz: Modernized production facility with central filtration & extraction system (2026)',
          ja: 'モイゼルヴィッツ世界統合本社：最新の集中集塵・排気フィルター設備を備えた製造工場（2026年）',
          zh: '莫伊瑟尔维茨全球总部：配备现代化中央过滤与环保吸附系统的核心生产基地（2026年）'
        }
      }
    };
  }

  init() {
    // 1. Central Timeline Spine Nodes
    const spineNodes = document.querySelectorAll('.tree-spine-node');
    spineNodes.forEach(node => {
      node.addEventListener('click', (e) => {
        this.stopAutoplay();
        const milestoneIdx = parseInt(node.getAttribute('data-milestone'), 10);
        const dir = milestoneIdx > this.currentMilestone ? 'future' : (milestoneIdx < this.currentMilestone ? 'past' : null);
        this.goToMilestone(milestoneIdx, dir);
      });
    });

    // 2. Header Stepping Buttons
    const prevBtn = document.getElementById('vox-prev-btn');
    const nextBtn = document.getElementById('vox-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.stopAutoplay();
        const moved = this.prevMilestone();
        if (!moved && window.presentation && typeof window.presentation.prevSlide === 'function') {
          window.presentation.prevSlide();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.stopAutoplay();
        const moved = this.nextMilestone();
        if (!moved && window.presentation && typeof window.presentation.goToSlide === 'function') {
          window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
        }
      });
    }

    // 3. Autoplay Video Documentary Button
    const playBtn = document.getElementById('vox-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.toggleAutoplay();
      });
    }

    // 4. In-Card Quick Stepping Buttons
    document.querySelectorAll('.hero-nav-arrow').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.stopAutoplay();
        const dir = btn.getAttribute('data-dir');
        if (dir === 'prev') {
          const moved = this.prevMilestone();
          if (!moved && window.presentation && typeof window.presentation.prevSlide === 'function') {
            window.presentation.prevSlide();
          }
        } else if (dir === 'next') {
          const moved = this.nextMilestone();
          if (!moved && window.presentation && typeof window.presentation.goToSlide === 'function') {
            window.presentation.goToSlide(window.presentation.currentSlideIndex + 1);
          }
        }
      });
    });

    // 5. Setup Viewport Gestures
    this.setupViewportGestures();

    // 6. Initialize Real Curved Comet Trail Canvas
    this.initCometCanvas();

    // 7. Set initial milestone state: always start dark!
    this.resetToDarkState();

    // 8. Initialize hero image slideshows (e.g. 1944 archive series)
    this.initHeroSlideshows();
  }

  initHeroSlideshows() {
    const slideshows = document.querySelectorAll('.hero-image-slideshow');
    slideshows.forEach(slideshow => {
      const mediaList = slideshow.querySelectorAll('.hero-slideshow-img');
      const dots = slideshow.querySelectorAll('.slideshow-dot');
      if (mediaList.length <= 1) return;

      let currentIdx = 0;
      const intervalMs = parseInt(slideshow.getAttribute('data-slide-interval') || '3500', 10);
      let timer = null;

      const stopTimer = () => {
        if (timer) {
          clearTimeout(timer);
          clearInterval(timer);
          timer = null;
        }
      };

      const startTimer = () => {
        stopTimer();
        const currentMedia = mediaList[currentIdx];
        if (currentMedia && currentMedia.tagName === 'VIDEO') {
          // Videos must play uninterrupted to the end; do not set a timeout
          return;
        }
        const panel = slideshow.closest('.tree-milestone-panel');
        const slide = slideshow.closest('.slide');
        // Only cycle when slide 3, milestone panel, and revealed card are all active
        if (slide && !slide.classList.contains('active')) return;
        if (panel && (!panel.classList.contains('active') || !panel.querySelector('.tree-hero-card.is-revealed'))) return;

        timer = setTimeout(() => {
          if (slide && !slide.classList.contains('active')) return;
          if (panel && (!panel.classList.contains('active') || !panel.querySelector('.tree-hero-card.is-revealed'))) return;
          updateSlide(currentIdx + 1, false, true);
        }, intervalMs);
      };

      const updateSlide = (idx, instant = false, autoStart = true) => {
        stopTimer();
        currentIdx = (idx + mediaList.length) % mediaList.length;

        mediaList.forEach((el, i) => {
          const isActive = i === currentIdx;
          if (instant) {
            el.style.transition = 'none';
          }
          el.classList.toggle('active', isActive);
          if (instant) {
            void el.offsetWidth;
            el.style.transition = '';
          }
          if (el.tagName === 'VIDEO') {
            el.loop = false;
            el.removeAttribute('loop');
            if (isActive && autoStart) {
              el.currentTime = 0;
              const playPromise = el.play();
              if (playPromise) playPromise.catch(() => {});
            } else {
              el.pause();
              if (isActive && !autoStart) {
                el.currentTime = 0;
              }
            }
          }
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIdx);
        });

        const currentMedia = mediaList[currentIdx];
        const captionEl = slideshow.closest('.hero-image-wrapper')?.querySelector('.hero-image-caption');
        if (captionEl && currentMedia) {
          const cap = currentMedia.getAttribute('data-caption');
          if (cap) {
            if (instant) {
              captionEl.style.transition = 'none';
              captionEl.textContent = cap;
              captionEl.style.opacity = '1';
              void captionEl.offsetWidth;
              captionEl.style.transition = '';
            } else if (captionEl.textContent !== cap) {
              captionEl.style.opacity = '0';
              setTimeout(() => {
                captionEl.textContent = cap;
                captionEl.style.opacity = '1';
              }, 250);
            }
          }
        }

        if (currentMedia && currentMedia.tagName === 'VIDEO') {
          currentMedia.onended = () => {
            const panel = slideshow.closest('.tree-milestone-panel');
            const slide = slideshow.closest('.slide');
            if (slide && !slide.classList.contains('active')) return;
            if (panel && (!panel.classList.contains('active') || !panel.querySelector('.tree-hero-card.is-revealed'))) return;
            updateSlide(currentIdx + 1, false, true);
          };
          currentMedia.onerror = () => {
            updateSlide(currentIdx + 1, false, true);
          };
        } else if (autoStart) {
          startTimer();
        }
      };

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlide(idx, false, true);
        });
      });

      slideshow._slideshowReset = (instant = true, andStart = false) => {
        stopTimer();
        updateSlide(0, instant, andStart);
      };

      slideshow._slideshowStart = () => {
        const currentMedia = mediaList[currentIdx];
        if (currentMedia && currentMedia.tagName === 'VIDEO') {
          currentMedia.currentTime = 0;
          const playPromise = currentMedia.play();
          if (playPromise) {
            playPromise.catch(() => {
              // Fallback if browser blocks video autoplay
              startTimer();
            });
          }
          return;
        }
        startTimer();
      };

      slideshow._slideshowStop = () => {
        stopTimer();
        mediaList.forEach(el => {
          if (el.tagName === 'VIDEO') {
            try { el.pause(); } catch(e) {}
          }
        });
      };

      // Initial state: reset to index 0 instantly, keep timer stopped until card is revealed
      slideshow._slideshowReset(true, false);
      stopTimer();
    });
  }

  setupSpineScrubber() {
    const spine = document.getElementById('tree-spine-guide');
    if (!spine) return;

    let isDragging = false;

    const getPosRatio = (clientX) => {
      const rect = spine.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      return rect.width > 0 ? (x / rect.width) : 0;
    };

    const handleScrub = (clientX) => {
      const ratio = getPosRatio(clientX);
      const targetIdx = Math.round(ratio * (this.totalMilestones - 1));
      if (targetIdx !== this.currentMilestone) {
        const dir = targetIdx > this.currentMilestone ? 'future' : 'past';
        this.goToMilestone(targetIdx, dir);
      }
    };

    const onPointerDown = (e) => {
      // Don't trigger if clicked directly on an interactive node button
      if (e.target.closest('.tree-spine-node')) return;
      this.stopAutoplay();
      isDragging = true;
      spine.classList.add('is-dragging');
      if (spine.setPointerCapture) {
        try { spine.setPointerCapture(e.pointerId); } catch (_) {}
      }
      handleScrub(e.clientX);
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      handleScrub(e.clientX);
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      spine.classList.remove('is-dragging');
      const pct = (this.currentMilestone / (this.totalMilestones - 1)) * 100;
      this.updateSpinePositions(pct);
    };

    spine.addEventListener('pointerdown', onPointerDown);
    spine.addEventListener('pointermove', onPointerMove);
    spine.addEventListener('pointerup', onPointerUp);
    spine.addEventListener('pointercancel', onPointerUp);
  }

  setupViewportGestures() {
    const viewport = document.getElementById('tree-viewport');
    if (!viewport) return;

    // Trackpad horizontal scroll over timeline: right = future, left = past
    let wheelCooldown = false;
    viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > 18) {
        e.preventDefault();
        this.stopAutoplay();
        if (!wheelCooldown) {
          wheelCooldown = true;
          if (e.deltaX > 0) {
            this.nextMilestone(); // Scrolling right into future
          } else {
            this.prevMilestone(); // Scrolling left into past
          }
          setTimeout(() => { wheelCooldown = false; }, 260);
        }
      }
    }, { passive: false });

    // Touch swipe gestures
    let touchStartX = null;
    let touchStartTime = null;

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      const elapsed = Date.now() - touchStartTime;

      if (Math.abs(diffX) > 35 && elapsed < 600) {
        this.stopAutoplay();
        if (diffX < 0) {
          this.nextMilestone(); // Swiping left advances right into future
        } else {
          this.prevMilestone();
        }
      }
      touchStartX = null;
    }, { passive: true });

    // Mouse / Pointer drag across timeline to travel through time
    let isPointerDragging = false;
    let pointerStartX = 0;
    let pointerStartTime = 0;

    viewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      isPointerDragging = true;
      pointerStartX = e.clientX;
      pointerStartTime = Date.now();
      try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    });

    viewport.addEventListener('pointerup', (e) => {
      if (!isPointerDragging) return;
      isPointerDragging = false;
      const diffX = e.clientX - pointerStartX;
      const elapsed = Date.now() - pointerStartTime;
      if (Math.abs(diffX) > 40 && elapsed < 800) {
        this.stopAutoplay();
        if (diffX < 0) {
          this.nextMilestone(); // Dragging left advances into future
        } else {
          this.prevMilestone(); // Dragging right returns into past
        }
      }
    });

    viewport.addEventListener('pointercancel', () => {
      isPointerDragging = false;
    });
  }

  /* Autoplay Video Documentary Mode */
  startAutoplay() {
    if (this.isAutoplay) return;
    this.isAutoplay = true;

    const playBtn = document.getElementById('vox-play-btn');
    const playIcon = document.getElementById('vox-play-icon');
    const playLabel = document.getElementById('vox-play-label');

    if (playBtn) playBtn.classList.add('is-playing');
    if (playIcon) playIcon.textContent = '⏸';
    if (playLabel) {
      playLabel.textContent = this.currentLang === 'de' ? 'Pause' :
                              this.currentLang === 'en' ? 'Pause' :
                              this.currentLang === 'ja' ? '一時停止' : '暂停';
    }

    this.autoplayStartTime = performance.now();
    this.runAutoplayLoop();
  }

  stopAutoplay() {
    if (!this.isAutoplay) return;
    this.isAutoplay = false;

    if (this.autoplayRaf) {
      cancelAnimationFrame(this.autoplayRaf);
      this.autoplayRaf = null;
    }

    const playBtn = document.getElementById('vox-play-btn');
    const playIcon = document.getElementById('vox-play-icon');
    const playLabel = document.getElementById('vox-play-label');
    const playProgress = document.getElementById('vox-play-progress');

    if (playBtn) playBtn.classList.remove('is-playing');
    if (playIcon) playIcon.textContent = '▶';
    if (playLabel) {
      playLabel.textContent = this.currentLang === 'de' ? 'Zeitreise abspielen' :
                              this.currentLang === 'en' ? 'Play Journey' :
                              this.currentLang === 'ja' ? 'タイムライン再生' : '播放时间轴';
    }
    if (playProgress) playProgress.style.width = '0%';
  }

  toggleAutoplay() {
    if (this.isAutoplay) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  runAutoplayLoop() {
    if (!this.isAutoplay) return;

    const now = performance.now();
    const elapsed = now - this.autoplayStartTime;
    const progressPct = Math.min(100, (elapsed / this.autoplayDuration) * 100);

    const playProgress = document.getElementById('vox-play-progress');
    if (playProgress) {
      playProgress.style.width = `${progressPct}%`;
    }

    if (elapsed >= this.autoplayDuration) {
      if (this.currentMilestone < this.totalMilestones - 1) {
        this.nextMilestone();
      } else {
        this.playSlideStartAnimation();
      }
      this.autoplayStartTime = performance.now();
    }

    this.autoplayRaf = requestAnimationFrame(() => this.runAutoplayLoop());
  }

  /* Clear any running animation timeouts to prevent race conditions */
  clearAnimationTimeouts() {
    if (this.animationTimeouts && this.animationTimeouts.length > 0) {
      this.animationTimeouts.forEach(t => clearTimeout(t));
      this.animationTimeouts = [];
    }
  }

  /* Initialize the real celestial comet trail canvas */
  initCometCanvas() {
    this.canvas = document.getElementById('comet-trail-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.trailPoints = [];
    this.stardustParticles = [];
    this.cometJourneyRaf = null;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  getMilestoneY(index) {
    if (!this.canvasHeight) {
      const container = document.getElementById('tree-timeline-container');
      this.canvasHeight = container ? container.clientHeight : 700;
    }
    const data = this.milestonesData[index >= 0 ? index : 0];
    if (!data) return this.canvasHeight * 0.9125;
    // Effektbereich um 30% reduziert (17.5% der Gesamthöhe, Inhalt 82.5%):
    // Inhalt oben (branch: up, oberes 82.5%) -> Punkt im unteren 17.5% (Zentrum: y ≈ 91.25% der Höhe)
    // Inhalt unten (branch: down, unteres 82.5%) -> Punkt im oberen 17.5% (Zentrum: y ≈ 8.75% der Höhe)
    return data.branch === 'up' ? (this.canvasHeight * 0.9125) : (this.canvasHeight * 0.0875);
  }

  /* Dynamisches horizontales Zentrum der Heldenkarte (orientiert an der Mitte vom Inhalt) */
  getMilestoneCenterX() {
    const container = document.getElementById('tree-timeline-container');
    const width = container ? container.clientWidth : (this.canvasWidth || 1200);
    this.canvasWidth = width;

    let marginRight = 36;
    let cardPadding = 72;
    if (width <= 900) {
      marginRight = 14;
      cardPadding = 28;
    } else if (width <= 1300) {
      marginRight = 24;
      cardPadding = 48;
    }

    const cardWidth = Math.min(1380, width - cardPadding);
    const cardRight = width - marginRight;
    return cardRight - (cardWidth / 2);
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const container = document.getElementById('tree-timeline-container');
    this.canvasWidth = container.clientWidth || 1892;
    this.canvasHeight = container.clientHeight || 800;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.canvasWidth * dpr);
    this.canvas.height = Math.round(this.canvasHeight * dpr);
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
    const cometEl = document.getElementById('flying-comet-traveler');
    if (cometEl && this.isStarted && cometEl.classList.contains('is-docked')) {
      cometEl.style.left = `${this.getMilestoneCenterX()}px`;
      cometEl.style.top = `${this.getMilestoneY(this.currentMilestone)}px`;
    }
  }

  clearCometTrail() {
    if (this.cometJourneyRaf) {
      cancelAnimationFrame(this.cometJourneyRaf);
      this.cometJourneyRaf = null;
    }
    this.trailPoints = [];
    this.stardustParticles = [];
    if (this.ctx && this.canvasWidth && this.canvasHeight) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  /* Render the organic, curved celestial comet tail along the exact flight trajectory */
  renderCometCanvas(now) {
    if (!this.ctx || !this.canvasWidth) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Max lifetime of tail points (fade away gracefully over ~850ms)
    const maxTrailDuration = 850;
    this.trailPoints = this.trailPoints.filter(pt => (now - pt.time) < maxTrailDuration);

    if (this.trailPoints.length >= 2) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Pass 1: Broad Gaseous Plasma Coma (Fein diffuses, geglättetes Gold-Glimmen)
      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p0 = this.trailPoints[i];
        const p1 = this.trailPoints[i + 1];
        // Guard against any gap / teleportation / wrap-around between phases
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        if (dx * dx + dy * dy > 3600) continue;

        const age = (now - p0.time) / maxTrailDuration;
        const life = Math.max(0, 1 - age);
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
        ctx.lineWidth = Math.max(0.8, 16 * Math.pow(life, 1.2));
        ctx.strokeStyle = `rgba(215, 140, 45, ${(0.16 * life).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Pass 2: Warm Saturated Golden Dust Streamer (Geglätteter mittlerer Schweif)
      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p0 = this.trailPoints[i];
        const p1 = this.trailPoints[i + 1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        if (dx * dx + dy * dy > 3600) continue;

        const age = (now - p0.time) / maxTrailDuration;
        const life = Math.max(0, 1 - age);
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
        ctx.lineWidth = Math.max(0.6, 7.5 * Math.pow(life, 1.35));
        ctx.strokeStyle = `rgba(255, 218, 110, ${(0.55 * life).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Pass 3: Pure Incandescent White-Hot Core Ion Filament (Hauchfeine Glühader)
      for (let i = 0; i < this.trailPoints.length - 1; i++) {
        const p0 = this.trailPoints[i];
        const p1 = this.trailPoints[i + 1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        if (dx * dx + dy * dy > 3600) continue;

        const age = (now - p0.time) / maxTrailDuration;
        const life = Math.max(0, 1 - age);
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
        ctx.lineWidth = Math.max(0.4, 2.0 * Math.pow(life, 1.6));
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.92 * life).toFixed(3)})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      ctx.restore();
    }

    // Pass 4: Feinkörniger Sternenstaub / Micro-Ember Particles im Kielwasser
    if (this.stardustParticles.length > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = this.stardustParticles.length - 1; i >= 0; i--) {
        const spark = this.stardustParticles[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          this.stardustParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, Math.max(0.3, spark.size * spark.alpha), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 170, ${spark.alpha.toFixed(3)})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(255, 220, 120, 0.8)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  /* Smoothly fade out remaining trail and particles when docked */
  dissolveCometTrail() {
    const fadeLoop = (now) => {
      this.renderCometCanvas(now);
      if (this.trailPoints.length > 0 || this.stardustParticles.length > 0) {
        this.cometJourneyRaf = requestAnimationFrame(fadeLoop);
      } else {
        if (this.ctx && this.canvasWidth && this.canvasHeight) {
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
        this.cometJourneyRaf = null;
      }
    };
    this.cometJourneyRaf = requestAnimationFrame(fadeLoop);
  }

  /* Reset Slide 3 to the pristine suspenseful dark state */
  resetToDarkState() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = false;
    this.currentMilestone = -1;

    const container = document.getElementById('tree-timeline-container');
    if (container) container.classList.add('is-dark-start');

    const cometEl = document.getElementById('flying-comet-traveler');
    if (cometEl) {
      cometEl.style.transition = 'none';
      cometEl.style.left = '0px';
      cometEl.style.top = `${this.getMilestoneY(0)}px`;
      cometEl.classList.remove('is-docked', 'is-igniting');
    }

    const branchRay = document.getElementById('comet-branch-ray');
    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
    }

    const panTrack = document.getElementById('tree-pan-track');
    if (panTrack) {
      panTrack.style.transition = 'none';
      panTrack.style.transform = 'translateX(0%)';
      void panTrack.offsetWidth;
      panTrack.style.transition = 'transform 1.8s cubic-bezier(0.25, 0.9, 0.3, 1)';
    }

    document.querySelectorAll('.tree-milestone-panel').forEach(panel => {
      panel.classList.remove('active');
      const card = panel.querySelector('.tree-hero-card');
      if (card) card.classList.remove('is-revealed');
      const pill = panel.querySelector('.tree-counter-pill');
      if (pill) pill.classList.remove('is-revealed');
      const year = panel.querySelector('.tree-watermark-year');
      if (year) year.classList.remove('is-revealed');
    });

    // Reset and stop all hero slideshows instantly
    document.querySelectorAll('.hero-image-slideshow').forEach(ss => {
      if (typeof ss._slideshowStop === 'function') ss._slideshowStop();
      if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
    });

    const m3 = document.getElementById('tree-milestone-3');
    if (m3) m3.classList.remove('fire-ignited');
    const m8 = document.getElementById('tree-milestone-8');
    if (m8) m8.classList.remove('sheen-ignited');

    // Update Header Controls for Dark Start
    const counterBadge = document.getElementById('vox-step-counter');
    const prevBtn = document.getElementById('vox-prev-btn');
    const nextBtn = document.getElementById('vox-next-btn');
    const nextLabel = document.getElementById('vox-next-label');

    if (counterBadge) counterBadge.textContent = '✦ Zeitreise starten';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.add('highlight');
    }
    if (nextLabel) {
      nextLabel.textContent = this.currentLang === 'de' ? 'Reise starten' :
                              this.currentLang === 'en' ? 'Start Journey' :
                              this.currentLang === 'ja' ? '開始' : '开始';
    }
  }

  /* Triggered on the FIRST press to the right:
     Light sphere with authentic curved comet tail glides majestically on a calm harmonic wave!
     Duration: ~3400ms (Faktor 3 ruhiger & Amplitude um die Hälfte reduziert)
  */
  startJourney() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = true;
    this.currentMilestone = 0;
    const data = this.milestonesData[0];
    if (!data) return;

    // Reset and stop all hero slideshows instantly before start flight
    document.querySelectorAll('.hero-image-slideshow').forEach(ss => {
      if (typeof ss._slideshowStop === 'function') ss._slideshowStop();
      if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
    });

    const m3Start = document.getElementById('tree-milestone-3');
    if (m3Start) m3Start.classList.remove('fire-ignited');
    const m8Start = document.getElementById('tree-milestone-8');
    if (m8Start) m8Start.classList.remove('sheen-ignited');

    const container = document.getElementById('tree-timeline-container');
    if (container) container.classList.remove('is-dark-start');

    const cometEl = document.getElementById('flying-comet-traveler');
    const branchRay = document.getElementById('comet-branch-ray');
    const cometHead = document.getElementById('comet-head-point');

    if (cometHead) cometHead.setAttribute('data-luminosity', '0');

    this.resizeCanvas();
    const startX = 0;
    const endX = this.getMilestoneCenterX();
    const targetY = this.getMilestoneY(0);

    if (cometEl) {
      cometEl.style.transition = 'none';
      cometEl.style.left = `${startX}px`;
      cometEl.style.top = `${targetY}px`;
      cometEl.classList.remove('is-docked');
      cometEl.classList.add('is-igniting');

      // Faktor 3 ruhiger: 3400ms majestätischer Gleitflug
      const duration = 3400;
      let startTime = null;

      const animateWaveJourney = (now) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const linearProgress = Math.min(1, elapsed / duration);

        // Seidenweiche Easing-Kurve
        const p = 1 - Math.pow(1 - linearProgress, 2.7);

        // Horizontale Flugposition
        const currentX = startX + (endX - startX) * p;

        // Sanft gedämpfte Welle für den reduzierten 17.5% Effektbereich
        const theta = 2 * Math.PI * (1.30 * p + 0.60 * p * p);
        const envelope = 10 * Math.sin(Math.PI * Math.pow(p, 0.5)) * Math.pow(1 - p, 0.75);
        const waveOffsetY = -envelope * Math.sin(theta);
        const currentY = targetY + waveOffsetY;

        // Positionierung des Kometenkopfes
        cometEl.style.left = `${currentX.toFixed(1)}px`;
        cometEl.style.top = `${currentY.toFixed(1)}px`;

        // Aufzeichnung der exakten gekrümmten Trajektorie
        this.trailPoints.unshift({
          x: currentX,
          y: currentY,
          time: now
        });

        // Feinkörniger Sternenstaub im Kielwasser (Partikelzahl um das Doppelte erhöht)
        if (linearProgress < 0.96) {
          const sparkCount = (1 + (Math.random() < 0.4 ? 1 : 0)) * 2;
          for (let s = 0; s < sparkCount; s++) {
            this.stardustParticles.push({
              x: currentX + (Math.random() - 0.5) * 4,
              y: currentY + (Math.random() - 0.5) * 4,
              vx: -0.22 - Math.random() * 0.45,
              vy: (Math.random() - 0.5) * 0.45,
              size: 0.5 + Math.random() * 1.3,
              alpha: 0.85 + Math.random() * 0.15,
              decay: 0.009 + Math.random() * 0.012
            });
          }
        }

        // Render auf Canvas
        this.renderCometCanvas(now);

        if (linearProgress < 1) {
          this.cometJourneyRaf = requestAnimationFrame(animateWaveJourney);
        } else {
          // Erhabenes Andocken an der Epoche (orientiert an der Mitte vom Inhalt)
          cometEl.style.left = `${endX}px`;
          cometEl.style.top = `${targetY}px`;
          cometEl.classList.remove('is-igniting');
          cometEl.classList.add('is-docked');

          // Strahl verzweigt sich vertikal nach oben zur 1882-Karte
          if (branchRay) {
            branchRay.classList.remove('branch-down');
            branchRay.classList.add('branch-up', 'is-active');
          }

          // Gründer-Karte erscheint ruhig an der Spitze des Strahls
          this.animationTimeouts.push(setTimeout(() => {
            const firstPanel = document.getElementById('tree-milestone-0');
            if (firstPanel) {
              firstPanel.classList.add('active');
              const card = firstPanel.querySelector('.tree-hero-card');
              if (card) card.classList.add('is-revealed');
              const pill = firstPanel.querySelector('.tree-counter-pill');
              if (pill) pill.classList.add('is-revealed');
              const year = firstPanel.querySelector('.tree-watermark-year');
              if (year) year.classList.add('is-revealed');

              const ss = firstPanel.querySelector('.hero-image-slideshow');
              if (ss) {
                if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
                if (typeof ss._slideshowStart === 'function') ss._slideshowStart();
              }
            }
          }, 380));

          this.dissolveCometTrail();
        }
      };

      this.cometJourneyRaf = requestAnimationFrame(animateWaveJourney);
    }

    this.updateControls(0);
  }

  // Alias for compatibility
  playSlideStartAnimation() {
    this.startJourney();
  }

  /* Traveling between epochs:
     Echtes Weiterfliegen & Reisen durch die Zeit!
     Phase 1: Komet fliegt vorwärts in den Zeitstrom (über den Rand).
     Phase 2: Komet fliegt aus der Weite auf der Welle in die neue Epoche ein und dockt sanft an.
  */
  goToMilestone(index, direction = null) {
    if (index < 0 || index >= this.totalMilestones) return;

    if (!this.isStarted) {
      if (index === 0) {
        this.startJourney();
        return;
      }
      this.isStarted = true;
      const container = document.getElementById('tree-timeline-container');
      if (container) container.classList.remove('is-dark-start');
    }

    if (!direction && index !== this.currentMilestone) {
      direction = index > this.currentMilestone ? 'future' : 'past';
    }

    this.clearAnimationTimeouts();
    this.clearCometTrail();
    const prevIndex = this.currentMilestone;
    this.currentMilestone = index;
    const data = this.milestonesData[index];
    if (!data) return;

    const cometEl = document.getElementById('flying-comet-traveler');
    const branchRay = document.getElementById('comet-branch-ray');
    const cometHead = document.getElementById('comet-head-point');
    const panTrack = document.getElementById('tree-pan-track');
    const viewport = document.getElementById('tree-viewport');

    // 1. Vorherigen Strahl einziehen & alte Karte ausblenden
    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
      branchRay.style.display = 'none';
    }

    const prevPanel = document.getElementById(`tree-milestone-${prevIndex}`);
    if (prevPanel) {
      const prevCard = prevPanel.querySelector('.tree-hero-card');
      if (prevCard) prevCard.classList.remove('is-revealed');
      const prevPill = prevPanel.querySelector('.tree-counter-pill');
      if (prevPill) prevPill.classList.remove('is-revealed');
      const prevYear = prevPanel.querySelector('.tree-watermark-year');
      if (prevYear) prevYear.classList.remove('is-revealed');
      const prevVideos = prevPanel.querySelectorAll('video');
      prevVideos.forEach(v => { try { v.pause(); } catch(e){} });

      const prevSs = prevPanel.querySelector('.hero-image-slideshow');
      if (prevSs) {
        if (typeof prevSs._slideshowStop === 'function') prevSs._slideshowStop();
        if (typeof prevSs._slideshowReset === 'function') prevSs._slideshowReset(true, false);
      }
    }

    // Instantly stop and reset target panel slideshow to index 0 before flight begins
    const targetPanel = document.getElementById(`tree-milestone-${index}`);
    if (targetPanel) {
      const targetSs = targetPanel.querySelector('.hero-image-slideshow');
      if (targetSs) {
        if (typeof targetSs._slideshowStop === 'function') targetSs._slideshowStop();
        if (typeof targetSs._slideshowReset === 'function') targetSs._slideshowReset(true, false);
      }
    }

    const m3Travel = document.getElementById('tree-milestone-3');
    if (m3Travel) m3Travel.classList.remove('fire-ignited');
    const m8Travel = document.getElementById('tree-milestone-8');
    if (m8Travel) m8Travel.classList.remove('sheen-ignited');

    // 2. Aktive Epochen-Klasse setzen
    document.querySelectorAll('.tree-milestone-panel').forEach((panel, idx) => {
      panel.classList.toggle('active', idx === index);
    });

    if (cometHead) {
      cometHead.setAttribute('data-luminosity', index);
    }

    this.resizeCanvas();
    const centerX = this.getMilestoneCenterX();
    const startY = this.getMilestoneY(prevIndex);
    const targetY = this.getMilestoneY(index);

    // 3. Panorama-Spur sanft mitbewegen
    if (viewport) {
      viewport.classList.add('is-time-traveling');
      this.animationTimeouts.push(setTimeout(() => {
        viewport.classList.remove('is-time-traveling');
      }, 3400));
    }

    if (panTrack) {
      panTrack.style.transition = 'transform 2.4s cubic-bezier(0.25, 0.9, 0.3, 1)';
      panTrack.style.transform = `translateX(-${index * 100}%)`;
    }

    if (!cometEl) {
      this.updateControls(index);
      return;
    }

    cometEl.classList.remove('is-docked');
    const isFuture = direction === 'future';

    // =========================================================================
    // PHASE 1: Beschleunigter Vorwärtsflug in den Zeitstrom (~1200ms)
    // =========================================================================
    const exitDuration = 1200;
    const exitTargetX = isFuture ? (this.canvasWidth + 50) : -50;
    let exitStartTime = null;

    const animateExitFlight = (now) => {
      if (!exitStartTime) exitStartTime = now;
      const elapsed = now - exitStartTime;
      const linearProgress = Math.min(1, elapsed / exitDuration);
      // Sanft ansteigende Beschleunigung in die Zukunft/Vergangenheit
      const p = Math.pow(linearProgress, 2.1);

      const currentX = centerX + (exitTargetX - centerX) * p;
      // Sanfter Kurswechsel vom vorherigen Bereich zum Ziel-Bereich (17.5% Effektkorridor)
      const currentBaseY = startY + (targetY - startY) * 0.40 * p;
      const waveY = -6 * Math.sin(Math.PI * linearProgress) * (isFuture ? 1 : -1);
      const currentY = currentBaseY + waveY;

      cometEl.style.left = `${currentX.toFixed(1)}px`;
      cometEl.style.top = `${currentY.toFixed(1)}px`;

      this.trailPoints.unshift({
        x: currentX,
        y: currentY,
        time: now
      });

      if (linearProgress < 0.92) {
        const sparkCount = 2; // Partikelzahl um das Doppelte erhöht
        for (let s = 0; s < sparkCount; s++) {
          this.stardustParticles.push({
            x: currentX + (Math.random() - 0.5) * 4,
            y: currentY + (Math.random() - 0.5) * 4,
            vx: (isFuture ? -0.25 : 0.25) - Math.random() * 0.3,
            vy: (Math.random() - 0.5) * 0.35,
            size: 0.5 + Math.random() * 1.3,
            alpha: 0.8 + Math.random() * 0.2,
            decay: 0.010 + Math.random() * 0.012
          });
        }
      }

      this.renderCometCanvas(now);

      if (linearProgress < 1) {
        this.cometJourneyRaf = requestAnimationFrame(animateExitFlight);
      } else {
        // =======================================================================
        // PHASE 2: Einflug in die neue Epoche mit echtem Kometenschweif (~2200ms)
        // =======================================================================
        startArrivalFlight();
      }
    };

    const startArrivalFlight = () => {
      // Clear previous exit points so no connecting chord line crosses the screen
      this.trailPoints = [];
      const enterStartX = isFuture ? -40 : (this.canvasWidth + 40);
      const arrivalDuration = 2200;
      let arrivalStartTime = null;

      // Positionieren am Eintrittsrand auf fließendem Kurs ins Ziel-Drittel
      const enterStartY = targetY - (targetY - startY) * 0.22;
      cometEl.style.left = `${enterStartX}px`;
      cometEl.style.top = `${enterStartY.toFixed(1)}px`;

      const animateArrivalFlight = (now) => {
        if (!arrivalStartTime) arrivalStartTime = now;
        const elapsed = now - arrivalStartTime;
        const linearProgress = Math.min(1, elapsed / arrivalDuration);

        // Seidenweiches Auslaufen ins Zentrum
        const p = 1 - Math.pow(1 - linearProgress, 2.6);

        const currentX = enterStartX + (centerX - enterStartX) * p;
        // Diagonale Wellentrajektorie ins Ziel-Drittel (entgegengesetzt zum Inhalt)
        const baseTrajectoryY = targetY - (targetY - startY) * 0.22 * Math.pow(1 - p, 1.6);
        const theta = 2 * Math.PI * (1.30 * p + 0.60 * p * p);
        const envelope = 10 * Math.sin(Math.PI * Math.pow(p, 0.5)) * Math.pow(1 - p, 0.75);
        const waveOffsetY = -envelope * Math.sin(theta) * (isFuture ? 1 : -1);
        const currentY = baseTrajectoryY + waveOffsetY;

        cometEl.style.left = `${currentX.toFixed(1)}px`;
        cometEl.style.top = `${currentY.toFixed(1)}px`;

        this.trailPoints.unshift({
          x: currentX,
          y: currentY,
          time: now
        });

        if (linearProgress < 0.94) {
          const sparkCount = (1 + (Math.random() < 0.35 ? 1 : 0)) * 2; // Partikelzahl um das Doppelte erhöht
          for (let s = 0; s < sparkCount; s++) {
            this.stardustParticles.push({
              x: currentX + (Math.random() - 0.5) * 4,
              y: currentY + (Math.random() - 0.5) * 4,
              vx: (isFuture ? -0.22 : 0.22) - Math.random() * 0.4,
              vy: (Math.random() - 0.5) * 0.4,
              size: 0.5 + Math.random() * 1.3,
              alpha: 0.85 + Math.random() * 0.15,
              decay: 0.009 + Math.random() * 0.012
            });
          }
        }

        this.renderCometCanvas(now);

        if (linearProgress < 1) {
          this.cometJourneyRaf = requestAnimationFrame(animateArrivalFlight);
        } else {
          // Erhabenes Andocken an der neuen Epoche (orientiert an der Mitte vom Inhalt)
          cometEl.style.left = `${centerX}px`;
          cometEl.style.top = `${targetY}px`;
          cometEl.classList.add('is-docked');

          if (branchRay) {
            branchRay.style.display = '';
            void branchRay.offsetWidth;
            branchRay.classList.remove('branch-up', 'branch-down');
            branchRay.classList.add('branch-' + data.branch, 'is-active');
          }

          // Folie 3 Meilenstein 9 (Blatt 9: Heute / Meuselwitz 2026):
          // Eleganter goldener Lichtschein genau 0,25s (250ms) BEVOR der Inhalt platziert wird!
          // Da der Inhalt bei 360ms platziert wird: 360ms - 250ms = 110ms
          if (index === 8) {
            this.animationTimeouts.push(setTimeout(() => {
              if (this.currentMilestone === 8) {
                const currentPanel = document.getElementById('tree-milestone-8');
                if (currentPanel && currentPanel.classList.contains('active')) {
                  currentPanel.classList.add('sheen-ignited');
                }
              }
            }, 110));
          }

          // Karte der neuen Epoche öffnet sich
          this.animationTimeouts.push(setTimeout(() => {
            const currentPanel = document.getElementById(`tree-milestone-${index}`);
            if (currentPanel) {
              const card = currentPanel.querySelector('.tree-hero-card');
              if (card) card.classList.add('is-revealed');
              const pill = currentPanel.querySelector('.tree-counter-pill');
              if (pill) pill.classList.add('is-revealed');
              const year = currentPanel.querySelector('.tree-watermark-year');
              if (year) year.classList.add('is-revealed');

              const ss = currentPanel.querySelector('.hero-image-slideshow');
              if (ss) {
                if (typeof ss._slideshowReset === 'function') {
                  ss._slideshowReset(true, false);
                }
                if (typeof ss._slideshowStart === 'function') {
                  ss._slideshowStart();
                }
              }

              // Folie 3 Blatt 4 (Meilenstein 1944 Brandnacht):
              // Flammen-Effekt erst mit 1 Sekunde Zeitversatz NACH Aufbau des Inhalts (550ms Reveal + 1000ms Versatz)
              if (index === 3) {
                this.animationTimeouts.push(setTimeout(() => {
                  if (this.currentMilestone === 3 && currentPanel.classList.contains('active')) {
                    currentPanel.classList.add('fire-ignited');
                  }
                }, 1550));
              }
            }
          }, 360));

          this.dissolveCometTrail();
        }
      };

      this.cometJourneyRaf = requestAnimationFrame(animateArrivalFlight);
    };

    // Phase 1 starten
    this.cometJourneyRaf = requestAnimationFrame(animateExitFlight);
    this.updateControls(index);
  }

  updateControls(index) {
    const data = this.milestonesData[index];
    if (!data) return;
    const lang = this.currentLang;

    // Header buttons
    const prevBtn = document.getElementById('vox-prev-btn');
    const nextBtn = document.getElementById('vox-next-btn');
    const nextLabel = document.getElementById('vox-next-label');
    const counterBadge = document.getElementById('vox-step-counter');

    if (prevBtn) {
      prevBtn.disabled = (index === 0 && !this.isStarted);
    }
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.toggle('highlight', index === this.totalMilestones - 1 || !this.isStarted);
    }
    if (nextLabel) {
      if (index === this.totalMilestones - 1) {
        nextLabel.textContent = lang === 'de' ? 'Zur Baudokumentation' :
                                lang === 'en' ? 'To Construction' :
                                lang === 'ja' ? '建設記録へ' : '前往施工记录';
      } else {
        nextLabel.textContent = lang === 'de' ? 'In die Zukunft' :
                                lang === 'en' ? 'Future' :
                                lang === 'ja' ? '未来へ' : '未来';
      }
    }
    if (counterBadge) {
      const word = lang === 'de' ? 'von' : lang === 'en' ? 'of' : lang === 'ja' ? '/' : '/';
      counterBadge.textContent = `${data.year} • ${index + 1} ${word} ${this.totalMilestones}`;
    }

    // In-Card Vorwärts-Pfeile immer aktiv halten
    document.querySelectorAll('.hero-nav-arrow.next').forEach(btn => {
      btn.disabled = false;
    });
  }

  nextMilestone() {
    if (!this.isStarted) {
      this.startJourney();
      return true;
    }
    if (this.currentMilestone < this.totalMilestones - 1) {
      this.goToMilestone(this.currentMilestone + 1, 'future');
      return true;
    }
    // Letzter Meilenstein ("Heute"): false signalisiert dem Aufrufer, dass das Ende erreicht ist
    return false;
  }

  prevMilestone() {
    if (!this.isStarted) return false;
    if (this.currentMilestone > 0) {
      this.goToMilestone(this.currentMilestone - 1, 'past');
      return true;
    }
    if (this.currentMilestone === 0) {
      this.resetToDarkState();
      return true;
    }
    return false; // Reached beginning of timeline
  }

  // Aliases for presentation navigation hooks
  nextEra() { return this.nextMilestone(); }
  prevEra() { return this.prevMilestone(); }

  setLanguage(lang) {
    this.currentLang = lang;

    // Update all 10 pre-rendered panels dynamically
    for (let i = 0; i < this.totalMilestones; i++) {
      const data = this.milestonesData[i];
      if (!data) continue;

      const panel = document.getElementById(`tree-milestone-${i}`);
      if (!panel) continue;

      const heading = panel.querySelector('.hero-title');
      if (heading) heading.textContent = data.heading[lang] || data.heading.de;

      const sentence = panel.querySelector('.hero-sentence');
      if (sentence) sentence.textContent = data.sentence[lang] || data.sentence.de;

      if (data.bullets) {
        const bulletList = panel.querySelector('.hero-bullet-list');
        const bData = data.bullets[lang] || data.bullets.de || data.bullets;
        if (bulletList && Array.isArray(bData)) {
          bulletList.innerHTML = bData.map(b => `<li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span>{b}</span></li>`.replace('{b}', b)).join('');
        }
      }

      const factTag = panel.querySelector('.hero-fact-tag');
      if (factTag) factTag.textContent = data.fact[lang] || data.fact.de;

      const imageBadge = panel.querySelector('.hero-image-badge');
      if (imageBadge) imageBadge.textContent = data.imageTag[lang] || data.imageTag.de;

      const imageCaption = panel.querySelector('.hero-image-caption');
      if (data.imageCaptions && data.imageCaptions[lang]) {
        const mediaList = panel.querySelectorAll('.hero-slideshow-img');
        mediaList.forEach((img, mIdx) => {
          if (data.imageCaptions[lang][mIdx]) {
            img.setAttribute('data-caption', data.imageCaptions[lang][mIdx]);
          }
        });
        const activeMedia = panel.querySelector('.hero-slideshow-img.active') || mediaList[0];
        const activeIdx = activeMedia ? parseInt(activeMedia.getAttribute('data-slide-index') || '0', 10) : 0;
        if (imageCaption && data.imageCaptions[lang][activeIdx]) {
          imageCaption.textContent = data.imageCaptions[lang][activeIdx];
        }
      } else {
        if (imageCaption) imageCaption.textContent = data.imageCaption[lang] || data.imageCaption.de;
      }

      const counterText = panel.querySelector('.tree-counter-text');
      if (counterText) counterText.textContent = data.quote[lang] || data.quote.de;

      const counterAuthor = panel.querySelector('.tree-counter-author');
      if (counterAuthor) counterAuthor.textContent = `• ${data.quoteAuthor[lang] || data.quoteAuthor.de}`;

      const cardStep = panel.querySelector('.hero-step-tag');
      if (cardStep) {
        const word = lang === 'de' ? 'Meilenstein' : lang === 'en' ? 'Milestone' : lang === 'ja' ? '節目' : '里程碑';
        const ofWord = lang === 'de' ? 'von' : lang === 'en' ? 'of' : lang === 'ja' ? '/' : '/';
        cardStep.textContent = `${word} ${i + 1} ${ofWord} ${this.totalMilestones}`;
      }
    }

    // Update Spine Node Tags
    document.querySelectorAll('.tree-spine-node').forEach((node, idx) => {
      const tagEl = node.querySelector('.node-tag');
      if (tagEl && this.milestonesData[idx]) {
        tagEl.textContent = this.milestonesData[idx].tag[lang] || this.milestonesData[idx].tag.de;
      }
    });

    // Update Header Counter and Autoplay Button Label
    const playLabel = document.getElementById('vox-play-label');
    if (playLabel) {
      if (this.isAutoplay) {
        playLabel.textContent = lang === 'de' ? 'Pause' : lang === 'en' ? 'Pause' : lang === 'ja' ? '一時停止' : '暂停';
      } else {
        playLabel.textContent = lang === 'de' ? 'Zeitreise abspielen' : lang === 'en' ? 'Play Journey' : lang === 'ja' ? 'タイムライン再生' : '播放时间轴';
      }
    }

    // Refresh active milestone display
    this.goToMilestone(this.currentMilestone);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.rennerHistory = new RennerHistoryJourney();
  window.rennerHistory.init();
});
