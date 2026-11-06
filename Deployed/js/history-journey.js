/**
 * Louis Renner Presentation - Interactive Zeitstrahl (Timeline) Controller
 * Based on https://www.louis-renner.de/ueber-renner/die-geschichte-renners/
 * Features:
 * - GPU-accelerated continuous S-arc light sphere & world-space C1 B-spline comet ribbon
 * - Frame-locked horizontal camera tracking with interrupt-safe transitions
 * - Vertical branching light ray opening each milestone card
 * - 4-Language Localization: DE, EN, JA, ZH (including localized epoch labels)
 */

class RennerHistoryJourney {
  constructor() {
    this.currentMilestone = 0;
    this.currentLang = 'de';
    this.totalMilestones = 9;
    this.isAutoplay = false;
    this.autoplayDuration = 6000;
    this.autoplayStartTime = null;
    this.autoplayRaf = null;
    this.animationTimeouts = [];
    this.isStarted = false;

    // World-space & screen-space motion state for seamless, interrupt-safe flight
    this.currentCamWorldX = 0;
    this.cometWorldX = 0;
    this.cometScreenX = 0;
    this.cometY = 0;
    this.isFlying = false;
    this.lastFlightSampleTime = 0;
    this.lastRenderTime = 0;

    this.milestonesData = {
      0: {
        id: '1882',
        year: '1882',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Gründung', en: 'Founding', ja: '創業', zh: '工坊创立' },
        heading: {
          de: '1882: Gründung in Stuttgart – Beginn mit der Klaviermechanik',
          en: '1882: Founded in Stuttgart – Starting with Piano Actions',
          ja: '1882年：シュトゥットガルト創業 — ピアノアクション製造の開始',
          zh: '1882年：斯图加特创立 — 从钢琴击弦机起步'
        },
        sentence: {
          de: 'Im Oktober 1882 gründete Louis Renner seine Werkstatt in der Stuttgarter Heusteigstraße, um präzise Klaviermechaniken als spezialisierter Zulieferer zu fertigen.',
          en: 'In October 1882, Louis Renner founded his workshop on Heusteigstrasse in Stuttgart as a dedicated supplier of precision piano actions.',
          ja: '1882年10月、ルイス・レンナーはシュトゥットガルトのホイシュタイグ通りに工房を開き、高精度なピアノアクションの専門製造を開始しました。',
          zh: '1882年10月，路易·雷诺在斯图加特霍伊施泰希街创立工坊，专注于精密钢琴击弦机的专业化制造。'
        },
        bullets: {
          de: [
            '<strong>Spezialisierte Feinmechanik:</strong> Fokus auf passgenaue Mechaniken für Klaviere.',
            '<strong>Historische Wurzel:</strong> Grundstein der Tradition, die seit 1990 in Thüringen fortgeführt wird.'
          ],
          en: [
            '<strong>Specialized Precision:</strong> Focus on precisely fitted piano actions.',
            '<strong>Historic Root:</strong> Foundation of the manufacturing heritage united in Thuringia since 1990.'
          ],
          ja: [
            '<strong>精密機構への特化：</strong> ピアノ用高精度アクションの専門製造に注力。',
            '<strong>モイゼルヴィッツの原点：</strong> 1990年以降チューリンゲンへと受け継がれる伝統の出発点。'
          ],
          zh: [
            '<strong>专注精密机械：</strong> 专注于高精度钢琴击弦机的定制匹配与制造。',
            '<strong>历史传承起点：</strong> 铸就自1990年起汇聚于图林根州的制琴工艺根基。'
          ]
        },
        fact: {
          de: '✦ Oktober 1882 • Gründung der Stuttgarter Mechanik-Werkstatt',
          en: '✦ October 1882 • Founding of the Stuttgart Action Workshop',
          ja: '✦ 1882年10月 • シュトゥットガルトにてアクション工房を創業',
          zh: '✦ 1882年10月 • 斯图加特击弦机工坊正式创立'
        },
        quote: {
          de: '„Von der Stuttgarter Werkstatt 1882 bis zur Übernahme der Mechanikfertigung 1990 vereint Meuselwitz die großen Linien des deutschen Mechanikbaus.“',
          en: '“From the 1882 Stuttgart workshop to the 1990 acquisition of action manufacturing, Meuselwitz unites the major lines of German action making.”',
          ja: '「1882年のシュトゥットガルト工房から1990年のアクション工場継承まで、モイゼルヴィッツにはドイツ機構製造の伝統が結集しています。」',
          zh: '“从1882年斯图加特工坊到1990年接管击弦机厂，莫伊塞尔维茨汇聚了德国击弦机制造的核心传承。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik',
          en: 'Louis Renner Chronicle',
          ja: 'ルイス・レンナー社史',
          zh: '路易·雷诺厂史档案'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
          'Visuell/Bilder/01_Geschichte/01_1882_rohlfing_klaviermechanik_vintage.webp',
          'Visuell/Bilder/01_Geschichte/01_1882_werkstatt_stuttgart_illustration.png'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1882_gruendung_stuttgart_renner_werkstatt.jpg',
        imageTag: { de: '1882 Gründung', en: '1882 Founding', ja: '1882年 創業', zh: '1882年 创立' },
        imageCaption: {
          de: 'Gründer: Louis Renner (1882)',
          en: 'Founder: Louis Renner (1882)',
          ja: '創業者：ルイス・レンナー（1882年）',
          zh: '创始人：路易·雷诺（1882年）'
        },
        imageCaptions: {
          de: [
            'Gründer: Louis Renner (1882)',
            'Historische Klaviermechanik aus der Gründerzeit',
            'Erste Werkstatt in der Heusteigstraße in Stuttgart (1882)'
          ],
          en: [
            'Founder: Louis Renner (1882)',
            'Historical upright piano action from the founding era',
            'First workshop on Heusteigstrasse in Stuttgart (1882)'
          ],
          ja: [
            '創業者：ルイス・レンナー（1882年）',
            '創業期の歴史的なアップライト・ピアノアクション',
            'シュトゥットガルト・ホイシュタイグ通りの初代工房（1882年）'
          ],
          zh: [
            '创始人：路易·雷诺（1882年）',
            '创立时期的历史立式钢琴击弦机',
            '斯图加特霍伊施泰希街的初代工坊（1882年）'
          ]
        },
        slide_interval: 3500
      },

      1: {
        id: '1906',
        year: '1906',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Hammerköpfe', en: 'Hammerheads', ja: '自社ハンマー', zh: '弦槌制造' },
        heading: {
          de: '1906: Beginn der eigenen Hammerkopffertigung',
          en: '1906: Launch of In-House Hammerhead Manufacturing',
          ja: '1906年：ハンマーヘッドの自社製造を開始',
          zh: '1906年：启动弦槌自主制造'
        },
        sentence: {
          de: 'Ab 1906 fertigte Renner eigene Hammerköpfe – exakt abgestimmt auf die Geometrie und Masse der eigenen Klavier- und Flügelmechaniken.',
          en: 'Starting in 1906, Renner produced its own hammerheads — precisely matched to the geometry and mass of its piano actions.',
          ja: '1906年よりレンナーは自社アクションの設計と質量に厳密に適合させたハンマーヘッドの自社製造を開始しました。',
          zh: '自1906年起，雷诺开始自主生产弦槌，使其与自家击弦机的几何结构及质量配比精准匹配。'
        },
        bullets: {
          de: [
            '<strong>Systemabstimmung:</strong> Hammerkopf und Mechanik entstehen erstmals perfekt aufeinander abgestimmt im selben Haus.',
            '<strong>Eigene Spezialpressen:</strong> Selbst entwickelte Verleimpressen sichern gleichmäßige Filzspannung.',
            '<strong>Internationaler Referenzklang:</strong> Späterer Standard für Steinway & Sons und führende Konzertflügelbauer.'
          ],
          en: [
            '<strong>Matched System:</strong> Hammerheads and actions engineered together under one roof for the first time.',
            '<strong>Custom Presses:</strong> In-house gluing presses ensure consistent felt hoop tension across every set.',
            '<strong>Concert Benchmark:</strong> Later adopted by Steinway & Sons and leading grand piano makers worldwide.'
          ],
          ja: [
            '<strong>一貫した音響設計：</strong> アクションとハンマーヘッドを自社内で最適に調和させて設計・製造。',
            '<strong>独自開発プレス機：</strong> 均一なフェルト張力を実現する専用接着プレスを自社開発。',
            '<strong>国際的コンサート基準：</strong> スタインウェイをはじめ世界の主要ピアノメーカーに採用。'
          ],
          zh: [
            '<strong>系统级协同匹配：</strong> 首次在同一工厂内实现弦槌与击弦机的协同设计与匹配。',
            '<strong>自研专用压机：</strong> 自主研发胶合压力机，确保每套弦槌拥有均匀一致的毛毡张力。',
            '<strong>国际音乐会标准：</strong> 日后成为施坦威及全球知名三角钢琴制造商的标准配置。'
          ]
        },
        fact: {
          de: '✦ Seit 1906 • Eigene Hammerkopffertigung mit Spezialpressen',
          en: '✦ Since 1906 • In-House Hammerhead Production with Custom Presses',
          ja: '✦ 1906年以降 • 独自プレス機による自社ハンマーヘッド製造',
          zh: '✦ 始于1906年 • 采用自研专用压机的弦槌自主制造'
        },
        quote: {
          de: '„Vom lederbezogenen Röllchen Cristoforis (1700) zum präzise gespannten Filzhammer: Der Hammerkopf formt unmittelbar den Klavierklang.“',
          en: '“From Cristofori’s leather-capped roll (1700) to the tensioned felt hammer: the hammerhead directly shapes the piano’s tone.”',
          ja: '「1700年のクリストフォリによる革巻きロールから精密張力フェルトハンマーへ。ハンマーヘッドは音色を直接形づくります。」',
          zh: '“从1700年克里斯托弗里的皮革纸卷到精密张力毛毡弦槌，弦槌直接塑造着钢琴的音色。”'
        },
        quoteAuthor: {
          de: 'Louis Renner • Hammerkopffertigung seit 1906',
          en: 'Louis Renner • Hammerhead Production since 1906',
          ja: 'ルイス・レンナー • 1906年からのハンマー製造',
          zh: '路易·雷诺 • 自1906年起的弦槌制造'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1700_christofori_hammermechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1906_mechanikfertigung_historisch.png',
          'Visuell/Bilder/01_Geschichte/01_1906_hammerkopf_pressen_fertigung.png'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1700_bartolomeo_cristofori_portrait.jpg',
        imageTag: { de: '1906 Hammerköpfe', en: '1906 Hammerheads', ja: '1906年 ハンマー製造', zh: '1906年 弦槌制造' },
        imageCaption: {
          de: 'Bartolomeo Cristofori (1655–1731) – Erfinder der Hammermechanik (um 1700)',
          en: 'Bartolomeo Cristofori (1655–1731) – Inventor of the hammer action (c. 1700)',
          ja: 'バルトロメオ・クリストフォリ（1655–1731）— 打弦アクションの発明者（1700年頃）',
          zh: '巴尔托洛梅奥·克里斯托弗里（1655–1731）— 钢琴击弦机发明者（约1700年）'
        },
        imageCaptions: {
          de: [
            'Bartolomeo Cristofori (1655–1731) – Erfinder der Hammermechanik (um 1700)',
            'Um 1700: Erste Hammermechanik von Bartolomeo Cristofori',
            'Historische Mechanikfertigung bei Louis Renner um die Jahrhundertwende',
            '1906: Eigene Hammerkopffertigung mit Spezialpressen und Nietautomaten'
          ],
          en: [
            'Bartolomeo Cristofori (1655–1731) – Inventor of the hammer action (c. 1700)',
            'c. 1700: First hammer action designed by Bartolomeo Cristofori',
            'Historical piano action manufacturing at Louis Renner around 1900',
            '1906: In-house hammerhead manufacturing with custom presses and riveting machines'
          ],
          ja: [
            'バルトロメオ・クリストフォリ（1655–1731）— 打弦アクションの発明者（1700年頃）',
            '1700年頃：クリストフォリによる最初のハンマーアクション機構',
            '1900年頃のルイス・レンナーにおける歴史的アクション製造現場',
            '1906年：独自開発の専用プレスとリベット機による自社ハンマー製造'
          ],
          zh: [
            '巴尔托洛梅奥·克里斯托弗里（1655–1731）— 钢琴击弦机发明者（约1700年）',
            '约1700年：克里斯托弗里设计的首款击弦机结构',
            '20世纪初路易·雷诺的历史击弦机制造车间',
            '1906年：采用自研专用压机与铆接设备的弦槌制造车间'
          ]
        },
        slide_interval: 3500
      },

      2: {
        id: '1911',
        year: '1911',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Flügel & Antriebe', en: 'Grand Actions', ja: '電化とグランド機構', zh: '电化与三角击弦机' },
        heading: {
          de: '1911: Elektrische Einzelantriebe & Beginn des Flügelprogramms',
          en: '1911: Individual Electric Drives & Grand Piano Actions',
          ja: '1911年：個別電動モーター導入とグランド用アクション開始',
          zh: '1911年：独立电机驱动升级与投产三角琴击弦机'
        },
        sentence: {
          de: '1911 nahm Oscar Renner die Fertigung kompletter Flügelmechaniken auf und rüstete die Maschinen von Transmissionsriemen auf hunderte elektrische Einzelantriebe um.',
          en: 'In 1911, Oscar Renner launched complete grand piano action manufacturing and converted machinery from belt shafts to hundreds of individual electric motors.',
          ja: '1911年、オスカー・レンナーはグランドピアノ用アクションの製造を開始し、工場の動力をベルト駆動から数百基の個別電動モーターへと転換しました。',
          zh: '1911年，奥斯卡·雷诺正式投产三角钢琴击弦机，并将车间设备由天轴皮带传动升级为数百台独立电机驱动。'
        },
        bullets: {
          de: [
            '<strong>Érard-Repetitionsprinzip:</strong> Doppelte Auslösung als konstruktive Basis moderner Flügelmechaniken.',
            '<strong>Volles Sortiment:</strong> Flügel- und Klaviermechaniken sowie Hammerköpfe aus einer Hand.',
            '<strong>Präzision durch Einzelantrieb:</strong> Vibrationsärmerer Maschinenlauf durch direkte Elektromotoren.'
          ],
          en: [
            '<strong>Érard Repetition Principle:</strong> Double escapement as the engineering basis of modern grand actions.',
            '<strong>Complete Portfolio:</strong> Grand actions, upright actions, and hammerheads from a single source.',
            '<strong>Direct Electric Drives:</strong> Reduced machine vibration and higher repeatability via individual motors.'
          ],
          ja: [
            '<strong>エラールのレペティション原理：</strong> 近代グランド機構の基礎となるダブル・エスケープメントを採用。',
            '<strong>一貫生産体制の確立：</strong> グランド用・アップライト用アクションとハンマーを自社で一貫供給。',
            '<strong>個別モーター駆動の精度：</strong> 振動を抑えた直接駆動により木工・穴あけ精度を大幅に向上。'
          ],
          zh: [
            '<strong>埃拉尔复奏原理：</strong> 以双重复奏结构作为现代三角钢琴击弦机的工程基础。',
            '<strong>完整产品体系：</strong> 实现三角琴击弦机、立式琴击弦机与弦槌的一站式自主生产。',
            '<strong>独立电驱提升精度：</strong> 直接电机驱动大幅降低机床振动，提高钻孔与木工一致性。'
          ]
        },
        fact: {
          de: '✦ 1911 • Erste Renner-Flügelmechaniken & Umstellung auf Einzelmotoren',
          en: '✦ 1911 • First Renner Grand Actions & Individual Electric Drives',
          ja: '✦ 1911年 • グランド用アクション製造開始＆個別モーター化',
          zh: '✦ 1911年 • 首批雷诺三角琴击弦机投产并普及独立电机驱动'
        },
        quote: {
          de: '„Um alle Zweige der Herstellung von Klaviermechaniken in einer Hand zu vereinigen, wurde 1911 auch die Fertigung von Flügelmechaniken aufgenommen.“',
          en: '“To unite all branches of piano action manufacturing in one hand, the production of grand piano actions was launched in 1911.”',
          ja: '「ピアノアクション製造のすべての分野を一社に統合するため、1911年にグランドピアノ用アクションの製造を開始した。」',
          zh: '“为将钢琴击弦机制造的各个分支汇聚于同一体系，工厂于1911年正式启动三角钢琴击弦机生产。”'
        },
        quoteAuthor: {
          de: 'Oscar Renner • Firmenchronik 1911',
          en: 'Oscar Renner • Company Chronicle 1911',
          ja: 'オスカー・レンナー • 社史（1911年）',
          zh: '奥斯卡·雷诺 • 企业档案（1911年）'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
          'Visuell/Bilder/01_Geschichte/01_1808_erard_repetitionsmechanik.jpg',
          'Visuell/Bilder/01_Geschichte/01_1911_renner_elektrifizierte_arbeitsumgebung.webp'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1808_sebastien_erard_portrait.jpg',
        imageTag: { de: '1911 Flügel & Antriebe', en: '1911 Grand Actions', ja: '1911年 電化と機構', zh: '1911年 电化升级' },
        imageCaption: {
          de: 'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik',
          en: 'Sébastien Érard (1752–1831) – Inventor of the double escapement action',
          ja: 'セバスチャン・エラール（1752–1831）— ダブル・エスケープメント機構の発明者',
          zh: '塞巴斯蒂安·埃拉尔（1752–1831）— 双重复奏击弦机发明者'
        },
        imageCaptions: {
          de: [
            'Sébastien Érard (1752–1831) – Erfinder der doppelten Repetitionsmechanik',
            '1808 / 1821: Érard-Repetitionsmechanik als Basis moderner Flügelmechaniken',
            'Elektrifizierte Fertigung mit Einzelantrieben unter Oscar Renner (1911)'
          ],
          en: [
            'Sébastien Érard (1752–1831) – Inventor of the double escapement action',
            '1808 / 1821: Érard repetition action — foundation of modern grand piano actions',
            'Electrified workshop with individual machine drives under Oscar Renner (1911)'
          ],
          ja: [
            'セバスチャン・エラール（1752–1831）— ダブル・エスケープメント機構の発明者',
            '1808 / 1821年：近代グランドピアノ機構の礎となったエラールのレペティション機構',
            'オスカー・レンナーのもとで個別電動モーターを導入した製造現場（1911年）'
          ],
          zh: [
            '塞巴斯蒂安·埃拉尔（1752–1831）— 双重复奏击弦机发明者',
            '1808 / 1821年：奠定现代三角钢琴击弦机基础的埃拉尔复奏结构',
            '1911年奥斯卡·雷诺时期配备独立电机的电气化生产车间'
          ]
        },
        slide_interval: 3500
      },

      3: {
        id: '1944',
        year: '1944',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Zerstörung', en: 'Destruction', ja: '戦災と再建', zh: '战损与重建' },
        heading: {
          de: '1944: Kriegszerstörung in Stuttgart & Beginn des Wiederaufbaus',
          en: '1944: Wartime Destruction in Stuttgart & Start of Reconstruction',
          ja: '1944年：シュトゥットガルト工場の焼失と再建の開始',
          zh: '1944年：斯图加特厂房战火损毁与启动重建'
        },
        sentence: {
          de: 'Bei den Luftangriffen vom 24./25. Juli 1944 brannten die Stuttgarter Werksgebäude vollständig nieder; unmittelbar danach begann die Belegschaft mit dem Wiederaufbau.',
          en: 'During the air raids of July 24/25, 1944, the Stuttgart factory buildings burned down completely; right afterward, the workforce began rebuilding.',
          ja: '1944年7月24〜25日の空襲によりシュトゥットガルトの全工場が焼失しましたが、直後に社員一丸となって再建へと踏み出しました。',
          zh: '在1944年7月24日至25日的空袭中，斯图加特全部厂房被烧毁；此后全体员工立即着手原址重建。'
        },
        bullets: {
          de: [
            '<strong>Juli 1944:</strong> Vollständige Zerstörung des Stuttgarter Stammwerks und des Maschinenparks.',
            '<strong>Sofortiger Neubeginn:</strong> Sicherung nutzbarer Werkzeuge und schrittweiser Neuaufbau der Werkstätten.',
            '<strong>Erfahrene Belegschaft:</strong> Das Fachwissen der Mitarbeiter sichert das Überleben der Manufaktur.'
          ],
          en: [
            '<strong>July 1944:</strong> Complete loss of the Stuttgart main plant and production machinery.',
            '<strong>Immediate Restart:</strong> Salvaging usable tooling and rebuilding workshops step by step.',
            '<strong>Skilled Workforce:</strong> Retained craftsmanship ensured the survival of precision production.'
          ],
          ja: [
            '<strong>1944年7月：</strong> シュトゥットガルト本社工場および機械設備が全焼。',
            '<strong>迅速な復旧着手：</strong> 残された治具や機械を修復し、段階的に製造現場を再建。',
            '<strong>熟練職人の結束：</strong> 社員に受け継がれた技術力が精密製造の再出発を支える。'
          ],
          zh: [
            '<strong>1944年7月：</strong> 斯图加特总厂厂房与生产设备在空袭中尽数损毁。',
            '<strong>即刻着手恢复：</strong> 抢修可用工装模具，分阶段重建生产车间。',
            '<strong>技师团队坚守：</strong> 员工传承的核心技艺保障了精密制造的延续。'
          ]
        },
        fact: {
          de: '✦ 24./25. Juli 1944 • Zerstörung des Stammwerks & Wiederaufbau',
          en: '✦ July 24/25, 1944 • Destruction of Main Plant & Rebuilding',
          ja: '✦ 1944年7月24/25日 • 本社工場の焼失と再建への歩み',
          zh: '✦ 1944年7月24/25日 • 总厂损毁与战后重建起步'
        },
        quote: {
          de: '„Trotz Zerstörung und großer Hindernisse: Renner wird wieder aufgebaut.“',
          en: '“Despite destruction and great obstacles: Renner will be rebuilt.”',
          ja: '「破壊と多くの困難を乗り越え、レンナーは再び立ち上がる。」',
          zh: '“尽管遭受损毁与重重困难，雷诺必将完成重建。”'
        },
        quoteAuthor: {
          de: 'Wilhelm Megenhardt • Chronik 1944',
          en: 'Wilhelm Megenhardt • Chronicle 1944',
          ja: 'ヴィルヘルム・メーゲンハルト（1944年社史）',
          zh: '威廉·梅根哈特 • 1944年厂史记录'
        },
        image: 'Visuell/Bilder/01_Geschichte/01_1944_stuttgart_brandnacht_zerstoerung_1.jpg',
        imageTag: { de: '1944 Stuttgart', en: '1944 Stuttgart', ja: '1944年 戦災記録', zh: '1944年 历史档案' },
        imageCaption: {
          de: 'Historische Aufnahme: Zerstörtes Stuttgarter Werk im Juli 1944 vor dem Wiederaufbau',
          en: 'Historical photo: Destroyed Stuttgart plant in July 1944 prior to reconstruction',
          ja: '歴史記録：再建前の焼失したシュトゥットガルト工場（1944年7月）',
          zh: '历史照片：1944年7月重建前受损的斯图加特厂房'
        }
      },

      4: {
        id: '1951',
        year: '1951/1952',
        branch: 'up',
        arrow: '▲',
        tag: { de: '3. Generation', en: '3rd Generation', ja: '第3世代と復興', zh: '第三代与重建竣工' },
        heading: {
          de: '1951–1955: Dr. Manfred Renner & Abschluss des Wiederaufbaus',
          en: '1951–1955: Dr. Manfred Renner & Reconstruction Completed',
          ja: '1951〜1955年：マンフレート・レンナー博士と本社再建の完了',
          zh: '1951–1955年：曼弗雷德·雷诺博士接任与重建竣工'
        },
        sentence: {
          de: '1951 übernahm Dr. Manfred Renner in dritter Generation die Unternehmensleitung, schloss bis 1955 den Wiederaufbau ab und baute das internationale Exportgeschäft aus.',
          en: 'In 1951, Dr. Manfred Renner assumed 3rd-generation leadership, completed rebuilding by 1955, and expanded international exports.',
          ja: '1951年に第3世代のマンフレート・レンナー博士が経営を引き継ぎ、1955年に本社再建を完了して国際輸出を大きく拡大しました。',
          zh: '1951年，第三代传承人曼弗雷德·雷诺博士接任管理，于1955年完成厂房重建并大力拓展国际出口业务。'
        },
        bullets: {
          de: [
            '<strong>3. Generation (1951):</strong> Dr. Manfred Renner übernimmt die Führung des Familienunternehmens.',
            '<strong>Wiedereinzug (1955):</strong> Vollständige Inbetriebnahme des neu errichteten Stuttgarter Stammwerks.',
            '<strong>Internationaler Ausbau:</strong> Belieferung führender Klavier- und Flügelhersteller weltweit.'
          ],
          en: [
            '<strong>3rd Generation (1951):</strong> Dr. Manfred Renner takes over management of the family company.',
            '<strong>Return to HQ (1955):</strong> Full commissioning of the newly rebuilt Stuttgart main factory.',
            '<strong>International Growth:</strong> Supplying premier upright and grand piano makers worldwide.'
          ],
          ja: [
            '<strong>第3世代の承継（1951年）：</strong> マンフレート・レンナー博士が同族経営を継承。',
            '<strong>新社屋稼働（1955年）：</strong> 再建されたシュトゥットガルト本社工場へ全面復帰。',
            '<strong>国際展開の拡大：</strong> 世界各国の主要ピアノメーカーへ精密機構・ハンマーを供給。'
          ],
          zh: [
            '<strong>第三代接棒（1951年）：</strong> 曼弗雷德·雷诺博士接掌家族企业经营管理。',
            '<strong>迁回主厂区（1955年）：</strong> 重建落成的斯图加特总部工厂全面投产。',
            '<strong>拓展全球供应：</strong> 为世界各地知名立式与三角钢琴制造商供应核心部件。'
          ]
        },
        fact: {
          de: '✦ 1951–1955 • Dr. Manfred Renner & Wiedereinzug in Stuttgart',
          en: '✦ 1951–1955 • Dr. Manfred Renner & Rebuilt Stuttgart HQ',
          ja: '✦ 1951〜1955年 • マンフレート・レンナー博士と本社完全復興',
          zh: '✦ 1951–1955年 • 曼弗雷德·雷诺博士与斯图加特新厂启用'
        },
        quote: {
          de: '„Bis 1955 wurde der Wiederaufbau des Stuttgarter Werks auf die volle ursprüngliche Ausdehnung vollendet.“',
          en: '“By 1955, reconstruction of the Stuttgart plant was completed to its full historic scale.”',
          ja: '「1955年までに、シュトゥットガルト工場はかつての規模へと完全に再建された。」',
          zh: '“至1955年，斯图加特工厂全面恢复至原有规模并正式投产。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • 1955',
          en: 'Louis Renner Chronicle • 1955',
          ja: 'ルイス・レンナー社史（1955年）',
          zh: '路易·雷诺厂史档案（1955年）'
        },
        image: 'Visuell/web_assets/herstellung-renermechanik.png',
        imageTag: { de: '1951–1955 Aufbau', en: '1951–1955 Rebuild', ja: '1951–1955年 復興', zh: '1951–1955年 重建' },
        imageCaption: {
          de: 'Präzisionsfertigung nach dem Wiedereinzug in das Stuttgarter Hauptgebäude (1955)',
          en: 'Precision manufacturing after returning to the rebuilt Stuttgart headquarters (1955)',
          ja: '再建されたシュトゥットガルト本社工場での精密製造（1955年）',
          zh: '1955年迁回重建后的斯图加特总部大楼开展精密生产'
        }
      },

      5: {
        id: '1990',
        year: '1990',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Wiedervereinigung', en: 'Reunification', ja: '東西統一とツァイツ', zh: '两德统一与蔡茨厂' },
        heading: {
          de: '1990: Wiedervereinigung & Übernahme der Mechanikfertigung Zeitz',
          en: '1990: German Reunification & Acquisition of the Zeitz Action Plant',
          ja: '1990年：ドイツ再統一とツァイツ・アクション工場の取得',
          zh: '1990年：两德统一与收购蔡茨击弦机厂'
        },
        sentence: {
          de: '1990 übernahm Renner die Mechanikfertigung der Piano Union in Zeitz – sicherte damit Fachkräfte sowie Produktionskapazitäten und legte den Grundstein für Meuselwitz.',
          en: 'In 1990, Renner acquired Piano Union’s action plant in Zeitz — securing skilled specialists and production capacity while laying the foundation for Meuselwitz.',
          ja: '1990年、レンナーはツァイツのピアノ・ユニオン機構製造工場を取得し、熟練技術者と生産能力を確保して現在のモイゼルヴィッツ拠点の礎を築きました。',
          zh: '1990年，雷诺收购蔡茨钢琴联盟（Piano Union）旗下的击弦机厂，稳固了专业技师与产能，并为莫伊塞尔维茨基地奠定根基。'
        },
        bullets: {
          de: [
            '<strong>Übernahme in Zeitz (1990):</strong> Integration der erfahrenen Mechanikfertigung der ehemaligen Piano Union.',
            '<strong>Kapazität für Großkunden:</strong> Zuverlässige Versorgung u. a. der Firma Schimmel (über 40 Klaviere täglich).',
            '<strong>Weg nach Mitteldeutschland:</strong> Direkter Vorläufer des späteren Werks in Meuselwitz.'
          ],
          en: [
            '<strong>Zeitz Acquisition (1990):</strong> Integration of the experienced Piano Union action workforce.',
            '<strong>Major OEM Capacity:</strong> Reliable supply for key customers including Schimmel (>40 pianos/day).',
            '<strong>Central German Base:</strong> Direct predecessor to today’s Meuselwitz headquarters.'
          ],
          ja: [
            '<strong>ツァイツ工場の統合（1990年）：</strong> 旧ピアノ・ユニオンの熟練アクション製造部門を継承。',
            '<strong>主要顧客への安定供給：</strong> 日産40台超のシンメル社など大口顧客の供給体制を維持。',
            '<strong>中部ドイツ拠点の確立：</strong> 後のモイゼルヴィッツ本社工場へとつながる重要な布石。'
          ],
          zh: [
            '<strong>整合蔡茨工厂（1990年）：</strong> 吸纳原钢琴联盟经验丰富的击弦机制造团队。',
            '<strong>保障大客户产能：</strong> 稳定供应日产逾40架钢琴的舒密尔（Schimmel）等核心客户。',
            '<strong>扎根德国中部：</strong> 成为日后迁建莫伊塞尔维茨现代化工厂的直接前身。'
          ]
        },
        fact: {
          de: '✦ 1990 • Übernahme in Zeitz & Sicherung der Wettbewerbsfähigkeit',
          en: '✦ 1990 • Zeitz Acquisition & Long-Term Competitiveness',
          ja: '✦ 1990年 • ツァイツ工場継承と生産競争力の確保',
          zh: '✦ 1990年 • 收购蔡茨工厂并稳固长期制造竞争力'
        },
        quote: {
          de: '„Die Entscheidung für den Standort Zeitz im Jahr 1990 sicherte unsere wichtigsten Abnehmer und eröffnete die Zukunft in Mitteldeutschland.“',
          en: '“Choosing the Zeitz site in 1990 secured our key piano-making partners and opened our future in Central Germany.”',
          ja: '「1990年のツァイツ拠点継承は主要顧客を守り抜き、中部ドイツにおける未来を切り拓いた。」',
          zh: '“1990年接管蔡茨基地保障了核心钢琴厂合作伙伴，并开启了我们在德国中部的发展篇章。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • 1990',
          en: 'Louis Renner Chronicle • 1990',
          ja: 'ルイス・レンナー社史（1990年）',
          zh: '路易·雷诺厂史档案（1990年）'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
          'Visuell/Bilder/01_Geschichte/01_1990_piano_union_zeitz_mechanikfertigung.webp'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_1989_mauerfall_zeitenwende.jpg',
        imageTag: { de: '1990 Wiedervereinigung', en: '1990 Reunification', ja: '1990年 再統一とツァイツ', zh: '1990年 蔡茨与统一' },
        imageCaption: {
          de: 'Historische Wende 1989/1990 – Neue Perspektiven für den deutschen Klavierbau',
          en: '1989/1990 Reunification – New perspectives for German piano manufacturing',
          ja: '1989/1990年の歴史的転換 — ドイツピアノ製造業の新たな展望',
          zh: '1989/1990年历史转折——德国钢琴制造业迎来整合契机'
        },
        imageCaptions: {
          de: [
            'Historische Wende 1989/1990 – Neue Perspektiven für den deutschen Klavierbau',
            'Mechanikfertigung in Zeitz (1990) – Basis des heutigen Standorts Meuselwitz'
          ],
          en: [
            '1989/1990 Reunification – New perspectives for German piano manufacturing',
            'Action manufacturing in Zeitz (1990) – Foundation for today’s Meuselwitz plant'
          ],
          ja: [
            '1989/1990年の歴史的転換 — ドイツピアノ製造業の新たな展望',
            'ツァイツでのアクション製造（1990年）— 現在のモイゼルヴィッツ工場の基盤'
          ],
          zh: [
            '1989/1990年历史转折——德国钢琴制造业迎来整合契机',
            '1990年蔡茨击弦机生产车间——当今莫伊塞尔维茨工厂的前身基础'
          ]
        },
        slide_interval: 4000
      },

      6: {
        id: '2011',
        year: '2011',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Zwei Standorte', en: 'Two Core Sites', ja: '2拠点集約', zh: '双基地整合' },
        heading: {
          de: '2011: Bündelung an zwei Standorten – Gärtringen & Meuselwitz',
          en: '2011: Consolidation into Two Core Sites – Gärtringen & Meuselwitz',
          ja: '2011年：ゲルトリンゲンとモイゼルヴィッツの2拠点へ集約',
          zh: '2011年：整合为盖特林根与莫伊塞尔维茨两大基地'
        },
        sentence: {
          de: '2011 führte Renner seine zuvor verteilten Betriebsstätten an zwei modernen Standorten zusammen: dem Neubau in Gärtringen und dem Werk in Meuselwitz.',
          en: 'In 2011, Renner consolidated its previously dispersed workshops into two modern facilities: Gärtringen and Meuselwitz.',
          ja: '2011年、分散していた製造拠点をゲルトリンゲン新社屋とモイゼルヴィッツ工場の近代的な2拠点へと集約しました。',
          zh: '2011年，雷诺将原先分散的多个厂区整合为两座现代化基地：盖特林根新厂与莫伊塞尔维茨工厂。'
        },
        bullets: {
          de: [
            '<strong>Umzug nach Meuselwitz:</strong> Verlagerung von Zeitz in eine moderne 6.800-m²-Fertigungshalle.',
            '<strong>Werk Meuselwitz:</strong> Serien- und Manufakturfertigung für Mechaniken, Hammerköpfe und Einzelteile.',
            '<strong>Neubau Gärtringen:</strong> Spezialisierte Holzbearbeitung und Verwaltung.'
          ],
          en: [
            '<strong>Move to Meuselwitz:</strong> Relocation from Zeitz into a modern 6,800 m² production hall.',
            '<strong>Meuselwitz Plant:</strong> Manufacturing of grand/upright actions, hammerheads, and components.',
            '<strong>Gärtringen Facility:</strong> Specialized woodworking and administration.'
          ],
          ja: [
            '<strong>モイゼルヴィッツ移転：</strong> ツァイツから6,800㎡の近代的な製造ホールへ拡張移転。',
            '<strong>モイゼルヴィッツ工場：</strong> アクション、ハンマーヘッド、精密部品の主力製造を担当。',
            '<strong>ゲルトリンゲン新社屋：</strong> 専門木工加工および本社管理部門を集約。'
          ],
          zh: [
            '<strong>迁入莫伊塞尔维茨：</strong> 由蔡茨迁入占地 6,800 平方米的现代化生产厂房。',
            '<strong>莫伊塞尔维茨工厂：</strong> 承担击弦机、弦槌及精密零部件的主力生产。',
            '<strong>盖特林根新厂：</strong> 集中专业木工加工与行政管理部门。'
          ]
        },
        fact: {
          de: '✦ 2011 • Zwei moderne Werke: Gärtringen & Meuselwitz (6.800 m²)',
          en: '✦ 2011 • Two Modern Plants: Gärtringen & Meuselwitz (6,800 m²)',
          ja: '✦ 2011年 • ゲルトリンゲン＆モイゼルヴィッツ（6,800㎡）の2拠点体制',
          zh: '✦ 2011年 • 盖特林根与莫伊塞尔维茨（6,800 m²）双基地运行'
        },
        quote: {
          de: '„Im Jahr 2011 wurden die zuvor verstreuten Werke an zwei leistungsfähigen Standorten zusammengelegt: Meuselwitz und Gärtringen.“',
          en: '“In 2011, previously dispersed facilities were consolidated into two efficient locations: Meuselwitz and Gärtringen.”',
          ja: '「2011年、それまで分散していた工場はモイゼルヴィッツとゲルトリンゲンの2拠点へと統合された。」',
          zh: '“2011年，原先分散的各个厂区正式整合为莫伊塞尔维茨与盖特林根两大高效基地。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • 2011',
          en: 'Louis Renner Chronicle • 2011',
          ja: 'ルイス・レンナー社史（2011年）',
          zh: '路易·雷诺厂史档案（2011年）'
        },
        images: [
          'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
          'Visuell/Bilder/01_Geschichte/01_2011_standort_meuselwitz_vogelperspektive.jpg'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_2011_standort_gaertringen_neubau.webp',
        imageTag: { de: '2011 Zwei Standorte', en: '2011 Two Sites', ja: '2011年 2拠点体制', zh: '2011年 双基地' },
        imageCaption: {
          de: 'Neubau Gärtringen (2011): Spezialisierte Holzbearbeitung und Verwaltung',
          en: 'Gärtringen new building (2011): Specialized woodworking and administration',
          ja: 'ゲルトリンゲン新社屋（2011年）：専門木工加工および管理部門',
          zh: '盖特林根新厂房（2011年）：专业木工加工与行政管理中心'
        },
        imageCaptions: {
          de: [
            'Neubau Gärtringen (2011): Spezialisierte Holzbearbeitung und Verwaltung',
            'Luftaufnahme Werk Meuselwitz: 6.800 m² Fertigungsfläche nach dem Umzug aus Zeitz'
          ],
          en: [
            'Gärtringen new building (2011): Specialized woodworking and administration',
            'Aerial view of Meuselwitz plant: 6,800 m² production hall following relocation from Zeitz'
          ],
          ja: [
            'ゲルトリンゲン新社屋（2011年）：専門木工加工および管理部門',
            '上空から見たモイゼルヴィッツ工場：ツァイツ移転後の6,800㎡製造拠点'
          ],
          zh: [
            '盖特林根新厂房（2011年）：专业木工加工与行政管理中心',
            '莫伊塞尔维茨工厂航拍：自蔡茨迁入后的 6,800 平方米核心生产基地'
          ]
        },
        slide_interval: 3500
      },

      7: {
        id: '2019',
        year: '2019',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Steinway & Sons', en: 'Steinway & Sons', ja: 'スタインウェイ', zh: '加入施坦威集团' },
        heading: {
          de: '2019: Übernahme durch Steinway & Sons bei voller Eigenständigkeit',
          en: '2019: Acquisition by Steinway & Sons with Full Operational Autonomy',
          ja: '2019年：スタインウェイ傘下への参画と独立経営の維持',
          zh: '2019年：并入施坦威集团并保持独立运营'
        },
        sentence: {
          de: '2019 übergab Inhaber Clemens von Arnim das Unternehmen an Steinway & Sons – um Arbeitsplätze, Qualitätsmaßstäbe und die Belieferung aller Klavierbauer langfristig zu sichern.',
          en: 'In 2019, owner Clemens von Arnim entrusted Renner to Steinway & Sons — safeguarding jobs, quality standards, and open supply to piano makers worldwide.',
          ja: '2019年、オーナーのクレメンス・フォン・アルニム氏は雇用と品質基準、そして世界中のピアノメーカーへの供給を守るため、スタインウェイへの継承を決断しました。',
          zh: '2019年，企业主克莱门斯·冯·阿尔尼姆将雷诺托付予施坦威集团，以长远保障员工岗位、品质标准及对全球各品牌钢琴厂的独立供应。'
        },
        bullets: {
          de: [
            '<strong>Operative Unabhängigkeit:</strong> Renner beliefert weiterhin alle Klavier- und Flügelhersteller weltweit.',
            '<strong>Standort- & Beschäftigungsschutz:</strong> Langfristige Perspektive statt kurzfristigem Finanzverkauf.',
            '<strong>Ehrendes Gedenken († 2024):</strong> Dank an Clemens von Arnim für seine verantwortungsvolle Weichenstellung.'
          ],
          en: [
            '<strong>Operational Autonomy:</strong> Renner continues to supply all upright and grand piano makers worldwide.',
            '<strong>Safeguarding Staff:</strong> Long-term industrial stewardship chosen over higher financial bids.',
            '<strong>In Grateful Memory († 2024):</strong> Honoring Clemens von Arnim for his responsible leadership.'
          ],
          ja: [
            '<strong>事業独立性の維持：</strong> 世界のあらゆるピアノメーカーへのオープンな供給体制を継続。',
            '<strong>雇用と技術の保護：</strong> 短期的な売却益よりも従業員と製造拠点の長期的安定を優先。',
            '<strong>故アルニム氏への追悼（† 2024）：</strong> 誠実な決断で未来を託した功績に深い感謝を捧ぐ。'
          ],
          zh: [
            '<strong>保持独立供应：</strong> 雷诺继续面向全球所有立式与三角钢琴制造商开放供货。',
            '<strong>守护员工与工艺：</strong> 拒绝短期高价财务收购，优先保障工厂与团队的长期稳定。',
            '<strong>深切缅怀（† 2024）：</strong> 铭记克莱门斯·冯·阿尔尼姆先生富有远见的责任担当。'
          ]
        },
        fact: {
          de: '✦ 2019 • Steinway & Sons & Gedenken an Clemens von Arnim († 2024)',
          en: '✦ 2019 • Steinway & Sons & In Memory of Clemens von Arnim († 2024)',
          ja: '✦ 2019年 • スタインウェイ参画＆故クレメンス・フォン・アルニム氏追悼',
          zh: '✦ 2019年 • 加入施坦威集团并缅怀克莱门斯·冯·阿尔尼姆（† 2024）'
        },
        quote: {
          de: '„Uns verbinden gleiche Qualitätswerte – und es ist entscheidend, dass Renner weiterhin eigenständig für Kunden in aller Welt arbeitet.“',
          en: '“We share the same commitment to quality — and it is essential that Renner continues to operate independently for customers worldwide.”',
          ja: '「私たちは同じ品質理念を共有しており、レンナーが今後も世界中の顧客のために独立して事業を続けることが重要です。」',
          zh: '“我们秉持相同的品质价值观，雷诺继续面向全球客户保持独立运营至关重要。”'
        },
        quoteAuthor: {
          de: 'Guido Zimmermann • Steinway & Sons Europe',
          en: 'Guido Zimmermann • Steinway & Sons Europe',
          ja: 'ギド・ツィンマーマン（スタインウェイ・ヨーロッパ社長）',
          zh: '吉多·齐默尔曼 • 施坦威欧洲总裁'
        },
        images: [
          'Visuell/Video/steinwayshort.mp4',
          'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg'
        ],
        image: 'Visuell/Bilder/01_Geschichte/01_2019_clemens_von_arnim_produktion.jpg',
        imageTag: { de: '2019 Steinway', en: '2019 Steinway', ja: '2019年 スタインウェイ', zh: '2019年 施坦威' },
        imageCaption: {
          de: 'Partnerschaft mit Steinway & Sons – Inhaber Clemens von Arnim in der Fertigung († 23.04.2024)',
          en: 'Partnership with Steinway & Sons – Owner Clemens von Arnim in production († April 23, 2024)',
          ja: 'スタインウェイとの協業 — 製造現場の故クレメンス・フォン・アルニム氏（2024年4月23日逝去）',
          zh: '携手施坦威集团——深入生产一线的克莱门斯·冯·阿尔尼姆先生（2024年4月23日逝世）'
        },
        imageCaptions: {
          de: [
            'Partnerschaft mit Steinway & Sons bei voller operativer Eigenständigkeit',
            'Clemens von Arnim in der Fertigung († 23.04.2024): Verantwortung für Belegschaft & Qualität'
          ],
          en: [
            'Partnership with Steinway & Sons with full operational independence',
            'Clemens von Arnim in production († April 23, 2024): Stewardship for staff & quality'
          ],
          ja: [
            '完全な事業独立性を維持したスタインウェイ＆サンズとのパートナーシップ',
            '製造現場の故クレメンス・フォン・アルニム氏（2024年4月23日逝去）：社員と品質への責任'
          ],
          zh: [
            '携手施坦威集团并保持100%独立业务运营',
            '克莱门斯·冯·阿尔尼姆在生产车间（† 2024.04.23）：守护员工与品质传承'
          ]
        },
        slide_interval: 4500
      },

      8: {
        id: 'heute',
        year: 'Heute',
        yearLabel: { de: 'Heute', en: 'Today', ja: '現在', zh: '今日' },
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Stammwerk Meuselwitz', en: 'Meuselwitz HQ', ja: 'モイゼルヴィッツ本社', zh: '莫伊塞尔维茨总部' },
        heading: {
          de: 'Heute: Alle Fertigungsprozesse vereint im Stammwerk Meuselwitz',
          en: 'Today: All Manufacturing United at the Meuselwitz Headquarters',
          ja: '現在：モイゼルヴィッツ本社工場への全製造工程の集約',
          zh: '今日：全部制造工序汇聚于莫伊塞尔维茨总部工厂'
        },
        sentence: {
          de: 'Nach dem Projektstart im Oktober 2025 sind heute Mechanik-, Holz- und Hammerkopffertigung vollständig unter einem vollklimatisierten Dach in Meuselwitz gebündelt.',
          en: 'Following project launch in October 2025, action, woodworking, and hammerhead production are now fully united under one climate-controlled roof in Meuselwitz.',
          ja: '2025年10月の統合プロジェクト始動を経て、アクション・木工・ハンマーヘッドの全製造工程が空調完備のモイゼルヴィッツ本社工場に集約されました。',
          zh: '自2025年10月启动整合项目以来，击弦机、精密木工与弦槌制造现已全面汇集于莫伊塞尔维茨恒温恒湿总部厂房。'
        },
        bullets: {
          de: [
            '<strong>Kurze Wege, ein Dach:</strong> Vom Holzzuschnitt bis zum fertigen Hammerkopf und zur kompletten Mechanik.',
            '<strong>Moderne Infrastruktur:</strong> Neue zentrale Filter- und Absauganlage sowie ganzjährige Hallenklimatisierung.',
            '<strong>Dank an Gärtringen:</strong> Große Anerkennung an das Gärtringer Team für den Wissenstransfer und jahrzehntelange Präzisionsarbeit.'
          ],
          en: [
            '<strong>Short Paths Under One Roof:</strong> From timber cutting to finished hammerheads and complete piano actions.',
            '<strong>Modern Infrastructure:</strong> New central dust filtration plant and year-round hall climate control.',
            '<strong>Gratitude to Gärtringen:</strong> Deep appreciation to the Gärtringen team for decades of precision work and knowledge transfer.'
          ],
          ja: [
            '<strong>一拠点での一貫生産：</strong> 木材加工から完成ハンマーヘッド・アクション組立までを最短動線で直結。',
            '<strong>最新インフラ完備：</strong> 新設の集中集塵フィルター設備と通年安定した全館空調システム。',
            '<strong>ゲルトリンゲンへの感謝：</strong> 長年の精密技術と円滑な技術継承を支えたチームに深く敬意を表します。'
          ],
          zh: [
            '<strong>同一屋檐下全流程贯通：</strong> 从实木开料直至成品弦槌与整套击弦机总成无缝衔接。',
            '<strong>现代化基础设施：</strong> 配备全新中央除尘过滤系统与全年恒温恒湿车间控制。',
            '<strong>致敬盖特林根团队：</strong> 衷心感谢盖特林根同仁数十年的精密制造贡献与技术传承。'
          ]
        },
        fact: {
          de: '✦ Stammwerk Meuselwitz • Mechanik & Hammerkopf unter einem Dach',
          en: '✦ Meuselwitz Headquarters • Actions & Hammerheads Under One Roof',
          ja: '✦ モイゼルヴィッツ本社工場 • アクションとハンマーの一貫製造',
          zh: '✦ 莫伊塞尔维茨总部工厂 • 击弦机与弦槌一体化制造基地'
        },
        quote: {
          de: '„Erfahrung ist unsere Basis – reproduzierbare Präzision unser Anspruch für jedes Instrument.“',
          en: '“Experience is our foundation — reproducible precision is our commitment to every instrument.”',
          ja: '「経験が私たちの礎であり、再現性の高い精密さこそが一台一台への約束です。」',
          zh: '“深厚经验是我们的根基，稳定可重复的精密品质是我们对每一台钢琴的承诺。”'
        },
        quoteAuthor: {
          de: 'Clemens Kunert • Louis Renner Meuselwitz',
          en: 'Clemens Kunert • Louis Renner Meuselwitz',
          ja: 'クレメンス・クーナート（ルイス・レンナー モイゼルヴィッツ）',
          zh: '克莱门斯·库纳特 • 路易·雷诺莫伊塞尔维茨总部'
        },
        image: 'Visuell/Video/LouisRennerMeuselwitzAussen.mp4',
        video: 'Visuell/Video/LouisRennerMeuselwitzAussen.mp4',
        imageTag: { de: 'Meuselwitz 2026', en: 'Meuselwitz 2026', ja: 'モイゼルヴィッツ 2026', zh: '莫伊塞尔维茨 2026' },
        imageCaption: {
          de: 'Stammwerk Meuselwitz (2026): Drohnenaufnahme des modernisierten Werks mit neuer zentraler Filteranlage',
          en: 'Meuselwitz Headquarters (2026): Drone footage of the modernized plant with new central filtration unit',
          ja: 'モイゼルヴィッツ本社工場（2026年）：新設の集中集塵設備を備えた工場空撮映像',
          zh: '莫伊塞尔维茨总部工厂（2026年）：配备全新中央过滤除尘系统的现代化厂区航拍'
        }
      }
    };
  }

  getYearDisplay(data, lang = this.currentLang) {
    if (!data) return '';
    if (data.yearLabel) return data.yearLabel[lang] || data.yearLabel.de || data.year;
    return data.year;
  }

  init() {
    // 1. Central Timeline Spine Nodes
    const spineNodes = document.querySelectorAll('.tree-spine-node');
    spineNodes.forEach(node => {
      node.addEventListener('click', () => {
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
      btn.addEventListener('click', () => {
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

    // 4b. Video Interaction: Click to play / pause standalone hero videos & auto-veil removal
    document.querySelectorAll('.hero-video-media').forEach(vid => {
      vid.addEventListener('click', (e) => {
        e.stopPropagation();
        if (vid.paused) {
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      });

      const removeVeil = () => {
        const parentCard = vid.closest('.tree-hero-card');
        if (parentCard) {
          const shimmer = parentCard.querySelector('.video-buffer-shimmer');
          if (shimmer) shimmer.classList.add('shimmer-hidden');
        }
      };
      vid.addEventListener('playing', removeVeil);
      vid.addEventListener('timeupdate', () => {
        if (vid.currentTime > 0.05) removeVeil();
      });
    });

    // 4c. Milestone 8 video preloads on demand (when reaching milestone >= 6 on Slide 3)

    // 5. Setup Viewport Gestures
    this.setupViewportGestures();

    // 6. Initialize GPU Comet Canvas & Glow Sprite
    this.initCometCanvas();

    // 7. Apply initial German texts cleanly & reset to dark start
    this.setLanguage(this.currentLang);
    this.resetToDarkState();

    // 8. Initialize hero image slideshows
    this.initHeroSlideshows();
  }

  primeMilestone8Video() {
    const m8Video = document.querySelector('#tree-milestone-8 video');
    if (!m8Video) return;
    try {
      m8Video.preload = 'auto';
      if (m8Video.readyState < 2) {
        m8Video.load();
      }
    } catch (e) { }
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
          return;
        }
        const panel = slideshow.closest('.tree-milestone-panel');
        const slide = slideshow.closest('.slide');
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
              if (playPromise) playPromise.catch(() => { });
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
              }, 220);
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
            try { el.pause(); } catch (e) { }
          }
        });
      };

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
      if (e.target.closest('.tree-spine-node')) return;
      this.stopAutoplay();
      isDragging = true;
      spine.classList.add('is-dragging');
      if (spine.setPointerCapture) {
        try { spine.setPointerCapture(e.pointerId); } catch (_) { }
      }
      handleScrub(e.clientX);
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      handleScrub(e.clientX);
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      spine.classList.remove('is-dragging');
    };

    spine.addEventListener('pointerdown', onPointerDown);
    spine.addEventListener('pointermove', onPointerMove);
    spine.addEventListener('pointerup', onPointerUp);
    spine.addEventListener('pointercancel', onPointerUp);
  }

  setupViewportGestures() {
    const viewport = document.getElementById('tree-viewport');
    if (!viewport) return;

    let wheelCooldown = false;
    viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > 18) {
        e.preventDefault();
        this.stopAutoplay();
        if (!wheelCooldown) {
          wheelCooldown = true;
          if (e.deltaX > 0) {
            this.nextMilestone();
          } else {
            this.prevMilestone();
          }
          setTimeout(() => { wheelCooldown = false; }, 260);
        }
      }
    }, { passive: false });

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
          this.nextMilestone();
        } else {
          this.prevMilestone();
        }
      }
      touchStartX = null;
    }, { passive: true });

    let isPointerDragging = false;
    let pointerStartX = 0;
    let pointerStartTime = 0;

    viewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      isPointerDragging = true;
      pointerStartX = e.clientX;
      pointerStartTime = Date.now();
      try { viewport.setPointerCapture(e.pointerId); } catch (_) { }
    });

    viewport.addEventListener('pointerup', (e) => {
      if (!isPointerDragging) return;
      isPointerDragging = false;
      const diffX = e.clientX - pointerStartX;
      const elapsed = Date.now() - pointerStartTime;
      if (Math.abs(diffX) > 40 && elapsed < 800) {
        this.stopAutoplay();
        if (diffX < 0) {
          this.nextMilestone();
        } else {
          this.prevMilestone();
        }
      }
    });

    viewport.addEventListener('pointercancel', () => {
      isPointerDragging = false;
    });
  }

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

    if (!this.isStarted) {
      this.startJourney();
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
        this.goToMilestone(0, 'past');
      }
      this.autoplayStartTime = performance.now();
    }

    this.autoplayRaf = requestAnimationFrame(() => this.runAutoplayLoop());
  }

  clearAnimationTimeouts() {
    if (this.animationTimeouts && this.animationTimeouts.length > 0) {
      this.animationTimeouts.forEach(t => clearTimeout(t));
      this.animationTimeouts = [];
    }
  }

  /* Pre-render radial glow sprite once on offscreen canvas (eliminates per-particle shadowBlur) */
  buildSparkSprite() {
    const size = 32;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    const half = size / 2;
    const grad = octx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.22, 'rgba(255, 242, 190, 0.92)');
    grad.addColorStop(0.52, 'rgba(235, 185, 78, 0.42)');
    grad.addColorStop(1.0, 'rgba(200, 140, 40, 0.0)');
    octx.fillStyle = grad;
    octx.fillRect(0, 0, size, size);
    return off;
  }

  initCometCanvas() {
    this.canvas = document.getElementById('comet-trail-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: true }) : null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.trailPoints = [];
    this.stardustParticles = [];
    this.cometJourneyRaf = null;
    this.sparkSprite = this.buildSparkSprite();

    // Continuous prefix B-spline layers from outer diffused amber coma to incandescent white core
    this.tailLayers = [
      { maxAge: 1.00, width: 20.0, r: 205, g: 135, b: 42, alpha: 0.032 },
      { maxAge: 0.86, width: 16.0, r: 218, g: 152, b: 52, alpha: 0.045 },
      { maxAge: 0.72, width: 12.5, r: 232, g: 172, b: 68, alpha: 0.062 },
      { maxAge: 0.58, width: 9.5, r: 245, g: 194, b: 88, alpha: 0.085 },
      { maxAge: 0.45, width: 7.0, r: 255, g: 214, b: 112, alpha: 0.120 },
      { maxAge: 0.33, width: 5.0, r: 255, g: 230, b: 148, alpha: 0.165 },
      { maxAge: 0.22, width: 3.4, r: 255, g: 244, b: 195, alpha: 0.240 },
      { maxAge: 0.13, width: 2.1, r: 255, g: 252, b: 238, alpha: 0.380 },
      { maxAge: 0.06, width: 1.3, r: 255, g: 255, b: 255, alpha: 0.520 }
    ];

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /* Pure GPU transform positioning — zero DOM layout thrashing */
  setCometScreenPos(cometEl, screenX, y) {
    this.cometScreenX = screenX;
    this.cometY = y;
    if (cometEl) {
      cometEl.style.transform = `translate3d(${screenX.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }
  }

  getMilestoneY(index) {
    if (!this.canvasHeight) {
      const container = document.getElementById('tree-timeline-container');
      this.canvasHeight = container ? container.clientHeight : 760;
    }
    const data = this.milestonesData[index >= 0 ? index : 0];
    if (!data) return this.canvasHeight * 0.9125;
    return data.branch === 'up' ? (this.canvasHeight * 0.9125) : (this.canvasHeight * 0.0875);
  }

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
    if (!container) return;
    const w = container.clientWidth || 1892;
    const h = container.clientHeight || 800;
    this.canvasWidth = w;
    this.canvasHeight = h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
      if (this.ctx) {
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    const cometEl = document.getElementById('flying-comet-traveler');
    if (cometEl && this.isStarted && !this.isFlying) {
      const cx = this.getMilestoneCenterX();
      const cy = this.getMilestoneY(this.currentMilestone);
      this.currentCamWorldX = this.currentMilestone * w;
      this.cometWorldX = this.currentCamWorldX + cx;
      this.setCometScreenPos(cometEl, cx, cy);
    }
  }

  clearCometTrail() {
    if (this.cometJourneyRaf) {
      cancelAnimationFrame(this.cometJourneyRaf);
      this.cometJourneyRaf = null;
    }
    this.isFlying = false;
    this.trailPoints = [];
    this.stardustParticles = [];
    if (this.ctx && this.canvasWidth && this.canvasHeight) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  /* Smooth asymmetric C1 degree-4 Bernstein ease: zero start jerk, responsive surge, soft landing */
  easeOrganic(u, k = 0.82) {
    const inv = 1 - u;
    return 6 * k * (u * u) * (inv * inv) + 4 * (u * u * u) * inv + (u * u * u * u);
  }

  spawnWakeParticles(wx, y, vwx, vy, count) {
    if (this.stardustParticles.length > 110) return;
    const speed = Math.hypot(vwx, vy);
    if (speed < 35) return;
    const dirX = -vwx / speed;
    const dirY = -vy / speed;
    const perpX = -dirY;
    const perpY = dirX;

    for (let s = 0; s < count; s++) {
      const spread = (Math.random() - 0.5) * 10;
      const drift = 12 + Math.random() * 42;
      const sideVel = (Math.random() - 0.5) * 34;
      this.stardustParticles.push({
        wx: wx + perpX * spread * 0.45,
        y: y + perpY * spread * 0.45,
        vwx: dirX * drift + perpX * sideVel,
        vy: dirY * drift + perpY * sideVel,
        radius: 3.2 + Math.random() * 5.2,
        age: 0,
        maxLife: 0.42 + Math.random() * 0.36,
        peakAlpha: 0.50 + Math.random() * 0.38
      });
    }
  }

  /* Build interpolated screen-space polyline up to targetAge for C1 midpoint quadratic B-spline */
  tracePrefixSpline(ctx, pts, maxAge) {
    const sub = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      if (curr.age <= maxAge) {
        sub.push(curr);
      } else {
        const span = curr.age - prev.age;
        if (span > 1e-4 && maxAge > prev.age) {
          const t = (maxAge - prev.age) / span;
          sub.push({
            x: prev.x + (curr.x - prev.x) * t,
            y: prev.y + (curr.y - prev.y) * t,
            age: maxAge
          });
        }
        break;
      }
    }

    if (sub.length < 2) return false;

    ctx.beginPath();
    ctx.moveTo(sub[0].x, sub[0].y);
    if (sub.length === 2) {
      ctx.lineTo(sub[1].x, sub[1].y);
      return true;
    }

    const m0x = (sub[0].x + sub[1].x) * 0.5;
    const m0y = (sub[0].y + sub[1].y) * 0.5;
    ctx.lineTo(m0x, m0y);

    for (let i = 1; i < sub.length - 1; i++) {
      const p = sub[i];
      const next = sub[i + 1];
      const mx = (p.x + next.x) * 0.5;
      const my = (p.y + next.y) * 0.5;
      ctx.quadraticCurveTo(p.x, p.y, mx, my);
    }

    const last = sub[sub.length - 1];
    ctx.lineTo(last.x, last.y);
    return true;
  }

  /* Render continuous gap-free, bead-free C1 comet ribbon + sprite stardust in world space */
  renderCometCanvas(now) {
    if (!this.ctx || !this.canvasWidth) return;
    const ctx = this.ctx;
    const dt = this.lastRenderTime ? Math.min(0.05, Math.max(0.001, (now - this.lastRenderTime) * 0.001)) : 0.016;
    this.lastRenderTime = now;

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const maxTrailDuration = 680;
    this.trailPoints = this.trailPoints.filter(pt => (now - pt.time) < maxTrailDuration);

    const camX = this.currentCamWorldX;

    if (this.trailPoints.length >= 2) {
      // Convert world-space trail to screen space & decimate sub-pixel micro-clusters near rest
      const screenPts = [];
      for (let i = 0; i < this.trailPoints.length; i++) {
        const pt = this.trailPoints[i];
        const sx = pt.wx - camX;
        const sy = pt.y;
        const age = Math.max(0, (now - pt.time) / maxTrailDuration);
        if (screenPts.length > 0 && i < this.trailPoints.length - 1) {
          const prev = screenPts[screenPts.length - 1];
          const dx = sx - prev.x;
          const dy = sy - prev.y;
          if (dx * dx + dy * dy < 2.2) continue;
        }
        screenPts.push({ x: sx, y: sy, age });
      }

      if (screenPts.length >= 2) {
        // Global dissolve envelope when comet has docked and stopped emitting new points
        const headAge = screenPts[0].age;
        const globalFade = Math.max(0, 1 - headAge * 1.15);

        if (globalFade > 0.01) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let l = 0; l < this.tailLayers.length; l++) {
            const layer = this.tailLayers[l];
            if (headAge >= layer.maxAge) continue;
            if (this.tracePrefixSpline(ctx, screenPts, layer.maxAge)) {
              ctx.lineWidth = layer.width;
              ctx.strokeStyle = `rgba(${layer.r}, ${layer.g}, ${layer.b}, ${(layer.alpha * globalFade).toFixed(4)})`;
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      }
    }

    // Stardust bokeh wake using pre-rendered radial glow sprite (zero shadowBlur)
    if (this.stardustParticles.length > 0 && this.sparkSprite) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = this.stardustParticles.length - 1; i >= 0; i--) {
        const sp = this.stardustParticles[i];
        sp.age += dt;
        if (sp.age >= sp.maxLife) {
          this.stardustParticles.splice(i, 1);
          continue;
        }
        sp.wx += sp.vwx * dt;
        sp.y += sp.vy * dt;
        sp.vwx *= 0.96;
        sp.vy *= 0.96;

        const lifeRatio = 1 - (sp.age / sp.maxLife);
        const alpha = sp.peakAlpha * lifeRatio * lifeRatio;
        const sx = sp.wx - camX;
        if (sx < -30 || sx > this.canvasWidth + 30) continue;

        const r = sp.radius * (0.55 + 0.45 * lifeRatio);
        ctx.globalAlpha = alpha;
        ctx.drawImage(this.sparkSprite, sx - r, sp.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  dissolveCometTrail() {
    this.isFlying = false;
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

  resetToDarkState() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = false;
    this.currentMilestone = -1;
    this.currentCamWorldX = 0;

    const container = document.getElementById('tree-timeline-container');
    if (container) container.classList.add('is-dark-start');

    const y0 = this.getMilestoneY(0);
    this.cometWorldX = -28;
    const cometEl = document.getElementById('flying-comet-traveler');
    if (cometEl) {
      cometEl.style.transition = 'none';
      this.setCometScreenPos(cometEl, -28, y0);
      cometEl.classList.remove('is-docked', 'is-igniting');
    }

    const branchRay = document.getElementById('comet-branch-ray');
    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
    }

    const panTrack = document.getElementById('tree-pan-track');
    if (panTrack) {
      panTrack.style.transition = 'none';
      panTrack.style.transform = 'translate3d(0%, 0, 0)';
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

    document.querySelectorAll('.hero-image-slideshow').forEach(ss => {
      if (typeof ss._slideshowStop === 'function') ss._slideshowStop();
      if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
    });

    const m3 = document.getElementById('tree-milestone-3');
    if (m3) m3.classList.remove('fire-ignited');
    const m8 = document.getElementById('tree-milestone-8');
    if (m8) {
      m8.classList.remove('sheen-ignited', 'loading-frequency-active', 'loading-frequency-complete');
      const shimmer = m8.querySelector('.video-buffer-shimmer');
      if (shimmer) shimmer.classList.remove('shimmer-hidden');
    }
    const cometHeadDark = document.getElementById('comet-head-point');
    if (cometHeadDark) cometHeadDark.classList.remove('frequency-pulse-active');

    const counterBadge = document.getElementById('vox-step-counter');
    const prevBtn = document.getElementById('vox-prev-btn');
    const nextBtn = document.getElementById('vox-next-btn');
    const nextLabel = document.getElementById('vox-next-label');

    const startLabels = {
      de: '✦ Zeitreise starten',
      en: '✦ Start Timeline',
      ja: '✦ 年表を開始',
      zh: '✦ 开启时间轴'
    };
    if (counterBadge) counterBadge.textContent = startLabels[this.currentLang] || startLabels.de;
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

  /* Calm, graceful single-arc entrance into 1882 (~1,650 ms, zero robotic sine wobble) */
  startJourney() {
    this.clearAnimationTimeouts();
    this.clearCometTrail();
    this.isStarted = true;
    this.currentMilestone = 0;
    const data = this.milestonesData[0];
    if (!data) return;

    document.querySelectorAll('.hero-image-slideshow').forEach(ss => {
      if (typeof ss._slideshowStop === 'function') ss._slideshowStop();
      if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
    });

    const m3Start = document.getElementById('tree-milestone-3');
    if (m3Start) m3Start.classList.remove('fire-ignited');
    const m8Start = document.getElementById('tree-milestone-8');
    if (m8Start) {
      m8Start.classList.remove('sheen-ignited', 'loading-frequency-active', 'loading-frequency-complete');
      const shimmer = m8Start.querySelector('.video-buffer-shimmer');
      if (shimmer) shimmer.classList.remove('shimmer-hidden');
    }

    const container = document.getElementById('tree-timeline-container');
    if (container) container.classList.remove('is-dark-start');

    const panTrack = document.getElementById('tree-pan-track');
    if (panTrack) {
      panTrack.style.transition = 'none';
      panTrack.style.transform = 'translate3d(0px, 0, 0)';
    }

    document.querySelectorAll('.tree-milestone-panel').forEach((panel, idx) => {
      panel.classList.toggle('active', idx === 0);
    });

    const cometEl = document.getElementById('flying-comet-traveler');
    const branchRay = document.getElementById('comet-branch-ray');
    const cometHead = document.getElementById('comet-head-point');

    if (cometHead) {
      cometHead.classList.remove('frequency-pulse-active');
      cometHead.setAttribute('data-luminosity', '0');
    }
    if (branchRay) {
      branchRay.classList.remove('is-active', 'branch-up', 'branch-down');
    }

    this.resizeCanvas();
    this.currentCamWorldX = 0;
    const startX = -28;
    const endX = this.getMilestoneCenterX();
    const targetY = this.getMilestoneY(0);
    const h = this.canvasHeight || 800;

    // Gentle tangential cubic Bezier landing (dy/dp = 0 at p = 1)
    const y0 = targetY - h * 0.13;
    const y1 = targetY - h * 0.18;
    const y2 = targetY;
    const y3 = targetY;

    if (cometEl) {
      this.isFlying = true;
      this.lastRenderTime = 0;
      this.setCometScreenPos(cometEl, startX, y0);
      this.cometWorldX = startX;
      cometEl.classList.remove('is-docked');
      cometEl.classList.add('is-igniting');

      const duration = 1620;
      let startTime = null;
      let prevWX = startX;
      let prevY = y0;
      let prevTime = 0;

      const animateEntrance = (now) => {
        if (!startTime) {
          startTime = now;
          prevTime = now;
        }
        const elapsed = now - startTime;
        const u = Math.min(1, elapsed / duration);
        const p = 1 - Math.pow(1 - u, 2.75);
        const inv = 1 - p;

        const currentX = startX + (endX - startX) * p;
        const currentY = (inv * inv * inv) * y0 +
          3 * (inv * inv) * p * y1 +
          3 * inv * (p * p) * y2 +
          (p * p * p) * y3;

        const dtSec = Math.max(0.004, (now - prevTime) * 0.001);
        const vwx = (currentX - prevWX) / dtSec;
        const vy = (currentY - prevY) / dtSec;
        prevWX = currentX;
        prevY = currentY;
        prevTime = now;

        this.cometWorldX = currentX;
        this.setCometScreenPos(cometEl, currentX, currentY);

        this.trailPoints.unshift({ wx: currentX, y: currentY, time: now });
        if (u < 0.94) {
          this.spawnWakeParticles(currentX, currentY, vwx, vy, Math.random() < 0.65 ? 2 : 1);
        }

        this.renderCometCanvas(now);

        if (u < 1) {
          this.cometJourneyRaf = requestAnimationFrame(animateEntrance);
        } else {
          this.cometWorldX = endX;
          this.setCometScreenPos(cometEl, endX, targetY);
          cometEl.classList.remove('is-igniting');
          cometEl.classList.add('is-docked');

          if (branchRay) {
            branchRay.classList.remove('branch-down');
            branchRay.classList.add('branch-up', 'is-active');
          }

          this.revealMilestonePanel(0, 170);
          this.dissolveCometTrail();
        }
      };

      this.cometJourneyRaf = requestAnimationFrame(animateEntrance);
    }

    this.updateControls(0);
  }

  playSlideStartAnimation() {
    this.startJourney();
  }

  revealMilestonePanel(index, delayMs = 170) {
    if (index === 8) {
      const currentPanel = document.getElementById('tree-milestone-8');
      const cometHead = document.getElementById('comet-head-point');
      const m8Video = currentPanel ? currentPanel.querySelector('video') : null;

      if (currentPanel) currentPanel.classList.add('loading-frequency-active');
      if (cometHead) cometHead.classList.add('frequency-pulse-active');

      this.animationTimeouts.push(setTimeout(() => {
        if (this.currentMilestone === 8 && currentPanel && currentPanel.classList.contains('active')) {
          currentPanel.classList.add('sheen-ignited');
        }
      }, 80));

      this.animationTimeouts.push(setTimeout(() => {
        if (this.currentMilestone === 8 && m8Video) {
          try {
            m8Video.currentTime = 0;
            const p = m8Video.play();
            if (p) p.catch(() => { });
          } catch (e) { }
        }
      }, 140));

      this.animationTimeouts.push(setTimeout(() => {
        if (this.currentMilestone === 8 && currentPanel && currentPanel.classList.contains('active')) {
          currentPanel.classList.remove('loading-frequency-active');
          currentPanel.classList.add('loading-frequency-complete');
          if (cometHead) cometHead.classList.remove('frequency-pulse-active');

          const card = currentPanel.querySelector('.tree-hero-card');
          if (card) card.classList.add('is-revealed');
          const pill = currentPanel.querySelector('.tree-counter-pill');
          if (pill) pill.classList.add('is-revealed');
          const year = currentPanel.querySelector('.tree-watermark-year');
          if (year) year.classList.add('is-revealed');

          if (m8Video && m8Video.paused) {
            try {
              const p = m8Video.play();
              if (p) p.catch(() => { });
            } catch (e) { }
          }

          const shimmer = currentPanel.querySelector('.video-buffer-shimmer');
          if (shimmer) shimmer.classList.add('shimmer-hidden');
        }
      }, 720));
      return;
    }

    this.animationTimeouts.push(setTimeout(() => {
      if (this.currentMilestone !== index) return;
      const currentPanel = document.getElementById(`tree-milestone-${index}`);
      if (!currentPanel) return;

      const card = currentPanel.querySelector('.tree-hero-card');
      if (card) card.classList.add('is-revealed');
      const pill = currentPanel.querySelector('.tree-counter-pill');
      if (pill) pill.classList.add('is-revealed');
      const year = currentPanel.querySelector('.tree-watermark-year');
      if (year) year.classList.add('is-revealed');

      const ss = currentPanel.querySelector('.hero-image-slideshow');
      if (ss) {
        if (typeof ss._slideshowReset === 'function') ss._slideshowReset(true, false);
        if (typeof ss._slideshowStart === 'function') ss._slideshowStart();
      }

      const standaloneVideos = currentPanel.querySelectorAll('video.hero-video-media, video.hero-image');
      standaloneVideos.forEach(v => {
        try {
          v.currentTime = 0;
          const p = v.play();
          if (p) p.catch(() => { });
        } catch (e) { }
      });

      // Milestone 1944 (index 3): ignite fire backdrop 1 second after card reveal
      if (index === 3) {
        this.animationTimeouts.push(setTimeout(() => {
          if (this.currentMilestone === 3 && currentPanel.classList.contains('active')) {
            currentPanel.classList.add('fire-ignited');
          }
        }, 1250));
      }
    }, delayMs));
  }

  /* Continuous, natural S-curve glide synchronized frame-for-frame with camera pan (~1,220 ms) */
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

    const prevIndex = this.currentMilestone;
    if (index === prevIndex && !this.isFlying) {
      this.updateControls(index);
      return;
    }

    if (!direction) {
      direction = index >= prevIndex ? 'future' : 'past';
    }

    this.clearAnimationTimeouts();
    if (this.cometJourneyRaf) {
      cancelAnimationFrame(this.cometJourneyRaf);
      this.cometJourneyRaf = null;
    }

    this.currentMilestone = index;
    const data = this.milestonesData[index];
    if (!data) return;

    const cometEl = document.getElementById('flying-comet-traveler');
    const branchRay = document.getElementById('comet-branch-ray');
    const cometHead = document.getElementById('comet-head-point');
    const panTrack = document.getElementById('tree-pan-track');
    const viewport = document.getElementById('tree-viewport');

    // Retract branching ray smoothly via CSS opacity/scale (no abrupt display:none snap)
    if (branchRay) {
      branchRay.classList.remove('is-active');
    }

    // Hide revealed cards on non-target panels & pause media cleanly
    document.querySelectorAll('.tree-milestone-panel').forEach((panel, idx) => {
      if (idx !== index) {
        const card = panel.querySelector('.tree-hero-card');
        if (card) card.classList.remove('is-revealed');
        const pill = panel.querySelector('.tree-counter-pill');
        if (pill) pill.classList.remove('is-revealed');
        const year = panel.querySelector('.tree-watermark-year');
        if (year) year.classList.remove('is-revealed');
        panel.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) { } });
        const ss = panel.querySelector('.hero-image-slideshow');
        if (ss && typeof ss._slideshowStop === 'function') ss._slideshowStop();
      }
      panel.classList.toggle('active', idx === index);
    });

    const targetPanel = document.getElementById(`tree-milestone-${index}`);
    if (targetPanel) {
      const targetSs = targetPanel.querySelector('.hero-image-slideshow');
      if (targetSs) {
        if (typeof targetSs._slideshowStop === 'function') targetSs._slideshowStop();
        if (typeof targetSs._slideshowReset === 'function') targetSs._slideshowReset(true, false);
      }
    }

    const m3Travel = document.getElementById('tree-milestone-3');
    if (m3Travel && index !== 3) m3Travel.classList.remove('fire-ignited');
    const m8Travel = document.getElementById('tree-milestone-8');
    if (m8Travel) {
      m8Travel.classList.remove('sheen-ignited', 'loading-frequency-active', 'loading-frequency-complete');
      const shimmer = m8Travel.querySelector('.video-buffer-shimmer');
      if (shimmer) shimmer.classList.remove('shimmer-hidden');
    }
    if (cometHead) {
      cometHead.classList.remove('frequency-pulse-active');
      cometHead.setAttribute('data-luminosity', String(index));
    }

    if (index >= 6) {
      this.primeMilestone8Video();
    }

    this.resizeCanvas();
    const w = this.canvasWidth || 1892;
    const centerX = this.getMilestoneCenterX();

    // Start seamlessly from live world/screen coordinates (interrupt-safe!)
    const startCamWX = this.isFlying ? this.currentCamWorldX : (Math.max(0, prevIndex) * w);
    const targetCamWX = index * w;

    const startCometWX = this.isFlying ? this.cometWorldX : (startCamWX + centerX);
    const targetCometWX = targetCamWX + centerX;

    const startY = this.isFlying ? this.cometY : this.getMilestoneY(Math.max(0, prevIndex));
    const targetY = this.getMilestoneY(index);
    const sameCorridor = Math.abs(targetY - startY) < 20;
    const archDir = data.branch === 'up' ? -1 : 1;

    const stepSpan = Math.max(1, Math.abs(targetCamWX - startCamWX) / w);
    const duration = Math.min(1650, Math.round(1180 + (stepSpan - 1) * 140));
    const travelSign = targetCometWX >= startCometWX ? 1 : -1;

    if (viewport) {
      viewport.classList.add('is-time-traveling');
    }
    if (panTrack) {
      panTrack.style.transition = 'none';
    }

    if (!cometEl) {
      if (panTrack) panTrack.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
      this.updateControls(index);
      return;
    }

    this.isFlying = true;
    this.lastRenderTime = 0;
    cometEl.classList.remove('is-docked', 'is-igniting');

    let startTime = null;
    let prevWX = startCometWX;
    let prevY = startY;
    let prevTime = 0;

    const animateGlide = (now) => {
      if (!startTime) {
        startTime = now;
        prevTime = now;
      }
      const elapsed = now - startTime;
      const u = Math.min(1, elapsed / duration);

      // Camera glides on smooth organic S-curve; sphere leads gracefully and settles into centerX
      const pCam = this.easeOrganic(u, 0.74);
      const camWX = startCamWX + (targetCamWX - startCamWX) * pCam;
      this.currentCamWorldX = camWX;

      if (panTrack) {
        panTrack.style.transform = `translate3d(${(-camWX).toFixed(2)}px, 0, 0)`;
      }

      // Organic horizontal lead wave in screen space (peaks ~115px ahead at u≈0.35, lands softly at 0)
      const leadEnvelope = Math.sin(Math.PI * Math.pow(u, 0.78)) * (1 - u * 0.35);
      const screenLeadX = travelSign * 118 * leadEnvelope;
      const screenX = centerX + screenLeadX;
      const cometWX = camWX + screenX;

      // Single pure S-curve across vertical corridor (zero multi-sine oscillation)
      const pY = this.easeOrganic(u, 0.80);
      let currentY = startY + (targetY - startY) * pY;
      if (sameCorridor) {
        currentY += archDir * 34 * Math.sin(Math.PI * pY);
      }

      const dtSec = Math.max(0.004, (now - prevTime) * 0.001);
      const vwx = (cometWX - prevWX) / dtSec;
      const vy = (currentY - prevY) / dtSec;
      prevWX = cometWX;
      prevY = currentY;
      prevTime = now;

      this.cometWorldX = cometWX;
      this.setCometScreenPos(cometEl, screenX, currentY);

      this.trailPoints.unshift({ wx: cometWX, y: currentY, time: now });
      if (u < 0.94) {
        this.spawnWakeParticles(cometWX, currentY, vwx, vy, Math.random() < 0.6 ? 2 : 1);
      }

      this.renderCometCanvas(now);

      if (u < 1) {
        this.cometJourneyRaf = requestAnimationFrame(animateGlide);
      } else {
        this.currentCamWorldX = targetCamWX;
        this.cometWorldX = targetCometWX;
        if (panTrack) {
          panTrack.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
        }
        if (viewport) {
          viewport.classList.remove('is-time-traveling');
        }

        this.setCometScreenPos(cometEl, centerX, targetY);
        cometEl.classList.add('is-docked');

        if (branchRay) {
          branchRay.classList.remove('branch-up', 'branch-down');
          branchRay.classList.add('branch-' + data.branch, 'is-active');
        }

        this.revealMilestonePanel(index, 150);
        this.dissolveCometTrail();
      }
    };

    this.cometJourneyRaf = requestAnimationFrame(animateGlide);
    this.updateControls(index);
  }

  updateControls(index) {
    const data = this.milestonesData[index];
    if (!data) return;
    const lang = this.currentLang;

    const prevBtn = document.getElementById('vox-prev-btn');
    const nextBtn = document.getElementById('vox-next-btn');
    const nextLabel = document.getElementById('vox-next-label');
    const counterBadge = document.getElementById('vox-step-counter');

    if (prevBtn) {
      prevBtn.disabled = (index === 0 && !this.isStarted);
    }
    if (!this.isStarted) {
      if (counterBadge) {
        const startLabels = {
          de: '✦ Zeitreise starten',
          en: '✦ Start Timeline',
          ja: '✦ 年表を開始',
          zh: '✦ 开启时间轴'
        };
        counterBadge.textContent = startLabels[lang] || startLabels.de;
      }
      if (nextLabel) {
        nextLabel.textContent = lang === 'de' ? 'Reise starten' :
          lang === 'en' ? 'Start Journey' :
            lang === 'ja' ? '開始' : '开始';
      }
      return;
    }
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.toggle('highlight', index === this.totalMilestones - 1 || !this.isStarted);
    }
    if (nextLabel) {
      if (index === this.totalMilestones - 1) {
        nextLabel.textContent = lang === 'de' ? 'Zur Baudokumentation' :
          lang === 'en' ? 'To Construction' :
            lang === 'ja' ? '建設記録へ' : '前往建设纪实';
      } else {
        nextLabel.textContent = lang === 'de' ? 'In die Zukunft' :
          lang === 'en' ? 'Next Era' :
            lang === 'ja' ? '次の時代へ' : '下一阶段';
      }
    }
    if (counterBadge) {
      const word = lang === 'de' ? 'von' : lang === 'en' ? 'of' : '/';
      const yr = this.getYearDisplay(data, lang);
      counterBadge.textContent = `${yr} • ${index + 1} ${word} ${this.totalMilestones}`;
    }

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
    return false;
  }

  nextEra() { return this.nextMilestone(); }
  prevEra() { return this.prevMilestone(); }

  setLanguage(lang) {
    this.currentLang = lang;

    for (let i = 0; i < this.totalMilestones; i++) {
      const data = this.milestonesData[i];
      if (!data) continue;

      const panel = document.getElementById(`tree-milestone-${i}`);
      if (!panel) continue;

      const yrDisplay = this.getYearDisplay(data, lang);
      const yearPill = panel.querySelector('.hero-year-pill');
      if (yearPill) yearPill.textContent = yrDisplay;
      const watermarkYear = panel.querySelector('.tree-watermark-year');
      if (watermarkYear) watermarkYear.textContent = yrDisplay;

      const heading = panel.querySelector('.hero-title');
      if (heading) heading.textContent = data.heading[lang] || data.heading.de;

      const sentence = panel.querySelector('.hero-sentence');
      if (sentence) sentence.textContent = data.sentence[lang] || data.sentence.de;

      if (data.bullets) {
        const bulletList = panel.querySelector('.hero-bullet-list');
        const bData = data.bullets[lang] || data.bullets.de || data.bullets;
        if (bulletList && Array.isArray(bData)) {
          bulletList.innerHTML = bData.map(b => `<li class="hero-bullet-item"><span class="hero-bullet-dot"></span><span>${b}</span></li>`).join('');
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
      } else if (imageCaption && data.imageCaption) {
        imageCaption.textContent = data.imageCaption[lang] || data.imageCaption.de;
      }

      const counterText = panel.querySelector('.tree-counter-text');
      if (counterText) counterText.textContent = data.quote[lang] || data.quote.de;

      const counterAuthor = panel.querySelector('.tree-counter-author');
      if (counterAuthor) counterAuthor.textContent = `• ${data.quoteAuthor[lang] || data.quoteAuthor.de}`;

      const cardStep = panel.querySelector('.hero-step-tag');
      if (cardStep) {
        const word = lang === 'de' ? 'Meilenstein' : lang === 'en' ? 'Milestone' : lang === 'ja' ? '節目' : '里程碑';
        const ofWord = lang === 'de' ? 'von' : lang === 'en' ? 'of' : '/';
        cardStep.textContent = `${word} ${i + 1} ${ofWord} ${this.totalMilestones}`;
      }
    }

    document.querySelectorAll('.tree-spine-node').forEach((node, idx) => {
      const tagEl = node.querySelector('.node-tag');
      if (tagEl && this.milestonesData[idx]) {
        tagEl.textContent = this.milestonesData[idx].tag[lang] || this.milestonesData[idx].tag.de;
      }
    });

    const playLabel = document.getElementById('vox-play-label');
    if (playLabel) {
      if (this.isAutoplay) {
        playLabel.textContent = lang === 'de' ? 'Pause' : lang === 'en' ? 'Pause' : lang === 'ja' ? '一時停止' : '暂停';
      } else {
        playLabel.textContent = lang === 'de' ? 'Zeitreise abspielen' : lang === 'en' ? 'Play Journey' : lang === 'ja' ? 'タイムライン再生' : '播放时间轴';
      }
    }

    // Update controls in-place without re-flying the comet!
    this.updateControls(this.isStarted ? this.currentMilestone : 0);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.rennerHistory = new RennerHistoryJourney();
  window.rennerHistory.init();
});
