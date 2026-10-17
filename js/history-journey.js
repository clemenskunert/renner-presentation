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
          de: '1882: Gründung in Stuttgart – Die Reise beginnt mit der Klaviermechanik',
          en: '1882: Founded in Stuttgart – The Journey Begins with Piano Actions',
          ja: '1882年：シュトゥットガルト創業 — ピアノアクションから始まった栄光の旅',
          zh: '1882年：斯图加特匠心工坊创立 — 击弦机开启百年传奇之旅'
        },
        sentence: {
          de: 'Im Jahre 1882 hatte sich nach reiflicher Überlegung, vielem Nachdenken und so mancher schlaflosen Nacht für Louis Renner die Erkenntnis aufgetan, dass die Technik im Bau von Musikinstrumenten, in diesem Fall besonders von Klavieren, eine erfolgreiche Zukunft vor sich haben könnte. So richtete er ohne viele Worte in der Stuttgarter Heusteigstraße eine Werkstatt ein und begann an einem Herbsttag Mitte Oktober ganz bewusst mit der handwerklichen Herstellung von Klaviermechaniken – dem sensiblen Herzstück des Instruments.',
          en: 'In 1882, after careful reflection, deep contemplation, and many a sleepless night, Louis Renner recognized that the engineering of musical instruments—especially pianos—held a promising future. Without unnecessary words, he established a workshop on Heusteigstrasse in Stuttgart and, on an autumn day in mid-October, deliberately began crafting upright piano actions: the delicate, beating heart of the instrument.',
          ja: '1882年、熟慮と数多の苦悩の夜を経て、ルイス・レンナーは楽器製造、とりわけピアノの機構工学に豊かな未来があることを見出しました。言葉少なく、彼はシュトゥットガルトのホイシュタイグ通りに工房を構え、10月中旬の秋の日、ピアノの心臓部であるアクションの手工業製造からその偉大な旅を歩み始めました。',
          zh: '1882年，在深思熟虑、反复求索并度过无数个不眠之夜后，路易·雷诺敏锐洞察到乐器制造工艺、尤其是钢琴工程技术的广阔前景。无需过多赘言，他在斯图加特霍伊施泰希街设立了第一间手工工坊，并在金秋10月中旬毅然以钢琴击弦机——这一乐器最精密的“传动心脏”为起点，开启了雷诺波澜壮阔的手工制造传奇。'
        },
        bullets: {
          de: [
            '<strong>Beginn mit Klaviermechaniken (1882):</strong> Louis Renner startete seine unternehmerische Reise ganz gezielt mit der Konstruktion und Fertigung hochpräziser Klaviermechaniken in der Heusteigstraße, um dem aufstrebenden Klavierbau neue dynamische Maßstäbe zu verleihen.',
            '<strong>Historische Parallele zu Carl Rönisch:</strong> Während sächsische Pioniere wie Carl Rönisch (gegr. 1845 in Dresden) mit der Erfindung der Voll-Panzerplatte (1866) die klangliche Stabilität revolutionierten, schuf Louis Renner in Stuttgart den maßgebenden mechanischen Präzisionsstandard.',
            '<strong>Entscheidende Wegekreuzung & Wurzel von Meuselwitz:</strong> 1990 sollten sich beide Traditionslinien schicksalhaft vereinen: Nach der Wiedervereinigung übernahm Renner die renommierte Mechanik-Produktion der aus Rönisch hervorgegangenen Piano Union – der Ursprung und die Wurzel unseres heutigen Hauptsitzes in Meuselwitz!'
          ],
          en: [
            '<strong>The Journey Begins with Piano Actions (1882):</strong> Louis Renner deliberately embarked on his journey with the design and precision craft of upright piano actions on Heusteigstrasse, establishing a new benchmark of touch and response for the piano world.',
            '<strong>Historical Parallel to Carl Rönisch:</strong> While Saxon pioneers like Carl Rönisch (founded 1845 in Dresden) revolutionized acoustic resonance with inventions like the full cast-iron plate (1866), Louis Renner set out in Stuttgart to establish the ultimate mechanical precision standard.',
            '<strong>Decisive Crossroads & the Roots of Meuselwitz:</strong> In 1990, both historic lineages converged: Following German reunification, Renner acquired the renowned piano action production of Piano Union (which originated from Rönisch)—becoming the origin and true root of our today\'s headquarters in Meuselwitz!'
          ],
          ja: [
            '<strong>ピアノアクションからの幕開け（1882年）：</strong> ルイス・レンナーは、タッチと表現力を決定づける最高精度のアップライトピアノ・アクション製作を創業の原点に定め、世界のピアノ界に新たな機構基準を打ち立てました。',
            '<strong>カール・レーニッシュとの歴史的呼応：</strong> ザクセンの先駆者カール・レーニッシュ（1845年ドレスデン創業）が総鉄骨フレーム（1866年）で音響構造の革新を成し遂げたのと呼応するように、レンナーはシュトゥットガルトで最高峰の機械精度基準を確立しました。',
            '<strong>運命の交差点・モイゼルヴィッツの起源：</strong> 1990年の東西ドイツ再統一後、両者の系譜は劇的に結実します。レンナーはレーニッシュの流れを汲むピアノ・ユニオン（Piano Union）の伝統あるアクション製造部門を継承 — これこそが現在の統合世界本社モイゼルヴィッツの真のルーツとなりました。'
          ],
          zh: [
            '<strong>以钢琴击弦机开启传奇之旅（1882年）：</strong> 路易·雷诺将高精度立式击弦机的设计与纯手工制作作为企业立业之本，为整架钢琴的触感灵敏度树立了全新的技术标杆。',
            '<strong>与卡尔·罗尼施（Rönisch）的历史共鸣：</strong> 正如萨克森先驱卡尔·罗尼施（1845年创立于德累斯顿）以全铸铁铠装音板（1866年）颠覆声学稳定性一样，雷诺在斯图加特树立了无可企及的精密机械制造标杆。',
            '<strong>命运的历史交汇与莫伊瑟尔维茨之源：</strong> 两大德国传统于1990年两德统一后迎来命运交汇：雷诺正式收购了由罗尼施发展而来的德国钢琴联盟（Piano Union）击弦机制造基地——这正是雷诺莫伊瑟尔维茨基地与今日全球总部的深厚根基！'
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
          'Visuell/Bilder/01_Geschichte/1882_renner.jpg',
          'Visuell/Bilder/01_Geschichte/rohlfing_klaviermechanik_vintage_bw.webp',
          'Visuell/Bilder/01_Geschichte/01_historische_renner_werkstatt_1882.png'
        ],
        image: 'Visuell/Bilder/01_Geschichte/1882_renner.jpg',
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
        }
      },

      1: {
        id: '1906',
        year: '1906',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Hammer', en: 'Hammerheads', ja: '自社ハンマー', zh: '弦槌制造' },
        heading: {
          de: 'Aufnahme der anspruchsvollen Hammerkopffertigung',
          en: 'Inception of Dedicated Hammerhead Manufacturing',
          ja: 'ピアノの魂「ハンマーヘッド」の自社製造開始',
          zh: '开启声学核心部件“弦槌”自主生产'
        },
        sentence: {
          de: 'Mit eigens entwickelten Pressen übernimmt Renner die vollkommene Kontrolle über das akustische Herzstück des Klaviers.',
          en: 'With proprietary custom presses, Renner takes full control of the acoustic soul and singing tone of the piano.',
          ja: '独自開発の専用プレスにより、ピアノの音響の魂であるハンマーヘッドの完全自社製造を確立。',
          zh: '凭借自主研发的专用压力模具，雷诺全面掌控决定钢琴音色灵魂的声学核心。'
        },
        fact: {
          de: '✦ Der Ursprung des Renner-Klangs',
          en: '✦ Origin of the Renner Sound',
          ja: '✦ 響き渡るレンナー・トーンの起源',
          zh: '✦ 雷诺之声的诞生基石'
        },
        quote: {
          de: '„Volle Kontrolle über Filz, Kernholz und Saite.“',
          en: '“Complete harmonic mastery over felt, wooden core, and string.”',
          ja: '「フェルト、木芯、弦の織りなす音響の完全掌握。」',
          zh: '“全面掌控羊毛毡、木芯与琴弦之间的声学共振。”'
        },
        quoteAuthor: {
          de: 'Unternehmenschronik • louis-renner.de',
          en: 'Company Chronicle • louis-renner.de',
          ja: '公式年代記（louis-renner.de）',
          zh: '雷诺官方历史档案'
        },
        image: 'Visuell/web_assets/hammerkopf-fertigun.png',
        imageTag: { de: '1906 Hammer', en: '1906 Hammer', ja: '1906年ハンマー', zh: '1906年弦槌制造' },
        imageCaption: {
          de: 'Aufnahme der eigenen Spezialfabrikation von Hammerköpfen (ab 1906)',
          en: 'Dedicated specialized manufacturing of piano hammerheads (from 1906)',
          ja: '独自の専用プレス設備によるハンマーヘッド専門製造の開始（1906年）',
          zh: '雷诺自1906年开启的高难度弦槌专用成型加工历史图景'
        }
      },

      2: {
        id: '1911',
        year: '1911',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Antriebe', en: 'Electrification', ja: '電化革命', zh: '单驱电化' },
        heading: {
          de: 'Oscar Renners Pioniertat: Einzelantriebe & Flügelprogramm',
          en: 'Pioneering Electrification & Grand Piano Actions',
          ja: '個別モーターによる電化革命とグランド機構',
          zh: '工业独立单驱电化革命与三角击弦机'
        },
        sentence: {
          de: 'Hunderte vibrationsfreie Elektromotoren revolutionieren die Präzision, ergänzt durch die Fertigung von Flügelmechaniken.',
          en: 'Hundreds of individual electric drives revolutionize precision, complemented by complete grand piano action production.',
          ja: '数百基の独立電動モーターが加工精度を革新し、グランドピアノ用アクションの本格生産を開始。',
          zh: '数百台独立电机单驱革新了加工精度，三角钢琴击弦机的全谱系生产同步开启。'
        },
        fact: {
          de: '✦ Hunderte Einzelmotoren & Flügelbau',
          en: '✦ Hundreds of Drives & Grand Actions',
          ja: '✦ 独立モーター電化とグランド機構',
          zh: '✦ 独立电驱与三角琴全系覆盖'
        },
        quote: {
          de: '„Alle Zweige der Mechanikherstellung in einer Hand.“',
          en: '“Uniting all branches of piano action manufacturing under one roof.”',
          ja: '「ピアノアクション製造の全工程を自らの手に統合する。」',
          zh: '“将钢琴机械制造的每一个细分门类凝聚于自主工序之中。”'
        },
        quoteAuthor: {
          de: 'Oscar Renner 1911',
          en: 'Oscar Renner 1911',
          ja: 'オスカー・レンナー（1911年）',
          zh: '奥斯卡·雷诺（1911年）'
        },
        image: 'Visuell/web_assets/arbeitsumgebung-renner.png',
        imageTag: { de: '1911 Antriebe', en: '1911 Drives', ja: '1911年電化', zh: '1911年单驱电化' },
        imageCaption: {
          de: 'Hunderte elektrische Einzelantriebe: Technisierung unter Oscar Renner (1911)',
          en: 'Hundreds of electric individual drives: Modernization under Oscar Renner (1911)',
          ja: '個別モーターによる振動なき高精度加工体制（1911年）',
          zh: '奥斯卡·雷诺时期的数百台独立电机高精加工车间（1911）'
        }
      },

      3: {
        id: '1944',
        year: '1944',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Brandnacht', en: 'Destruction', ja: '戦禍の炎', zh: '浴火重生' },
        heading: {
          de: 'Brand der Fabrikanlagen & Unbändiger Wille zum Wiederaufbau',
          en: 'Total Plant Fire & The Indomitable Spirit to Rebuild',
          ja: 'シュトゥットガルト空襲の惨禍と不屈の再建意志',
          zh: '厂区遭遇空袭火灾与坚韧不拔的重建决心'
        },
        sentence: {
          de: 'Wilhelm Megenhardt steuerte das Unternehmen mit sicherer Hand durch Weltwirtschaftskrise und Kriegswirren, ehe die Stuttgarter Brandnacht das Werk traf:',
          en: 'Wilhelm Megenhardt steered the company with a steady hand through the Great Depression and wartime turmoil before the firestorm struck:',
          ja: 'ヴィルヘルム・メーゲンハルトは世界恐慌と大戦の荒波の中、確固たる手腕で会社を舵取りしましたが、1944年7月の爆撃が工場を襲いました。',
          zh: '威廉·梅根哈特以沉稳坚毅的手腕带领雷诺度过大萧条与战时艰难岁月，直至1944年7月斯图加特大空袭降临：'
        },
        bullets: {
          de: [
            '<strong>Verheerender Großangriff (24./25. Juli 1944):</strong> Über 600 RAF-Bomber warfen Hunderttausende Stabbrand- und Phosphorbomben ab – ein gigantischer Feuersturm erfasste Stuttgart.',
            '<strong>Totalverlust aller Gebäude:</strong> Das städtische Löschwassernetz brach zusammen; alle Renner-Gebäude brannten lichterloh nieder, nichts schien gerettet werden zu können.',
            '<strong>Wiederaufbau noch in den Ruinen:</strong> Trotz totaler Zerstörung und unendlicher Hindernisse beschloss Megenhardt sofort den Wiederaufbau in schwierigster Kleinarbeit.'
          ],
          en: [
            '<strong>Major Raid (July 24/25, 1944):</strong> Over 600 heavy bombers dropped hundreds of thousands of incendiaries – igniting a firestorm across Stuttgart.',
            '<strong>Total Loss of Premises:</strong> The city water supply collapsed entirely; all Renner buildings burned down and all seemed lost.',
            '<strong>Rebuilding from Ruins:</strong> Undeterred by ruin, Megenhardt resolved on the spot to rebuild through tireless, meticulous effort.'
          ],
          ja: [
            '<strong>1944年7月24/25日の大空襲:</strong> 600機以上の大型爆撃機が数十万発の焼夷弾を投下、シュトゥットガルト市街は猛烈な火災旋風に包まれました。',
            '<strong>工場の全焼と断水:</strong> 消火用水道網が完全に破壊され、レンナーの全工場建物が全焼。すべてが灰燼に帰したかに見えました。',
            '<strong>焦土からの再起:</strong> 壊滅的な打撃にも屈せず、メーゲンハルトは瓦礫の山の中で直ちに地道で不屈の再建を開始しました。'
          ],
          zh: [
            '<strong>1944年7月24/25日大空袭:</strong> 600余架重型轰炸机倾泻数十万枚燃烧弹，烈焰风暴席卷斯图加特全城。',
            '<strong>厂房全部化为灰烬:</strong> 城市供水管网彻底瘫痪，雷诺全部厂房陷入火海燃烧殆尽，一切看似化为乌有。',
            '<strong>废墟上的钢铁誓言:</strong> 面对毁灭性浩劫，梅根哈特率领团队毅然在瓦砾堆中誓师，以顽强细致的韧劲开启全面重建。'
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
        image: 'Visuell/Bilder/01_Geschichte/Stuttgart_destruction_-_codingdavinci_-_9200_F_45857.jpg',
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
          de: 'Dr. Manfred Renner & Einzug in das Hauptgebäude nach Wiederaufbau',
          en: 'Dr. Manfred Renner & Return to Rebuilt Headquarters',
          ja: 'マンフレート・レンナー博士の参画と本社本館の復興・帰還',
          zh: '曼弗雷德·雷诺博士加入与战后重建新总部乔迁'
        },
        sentence: {
          de: 'Inmitten von Hochkonjunktur und nötiger Werkerweiterung trat 1951 die 3. Generation an die Spitze und vollendete den Wiederaufbau:',
          en: 'Amid soaring demand and required factory expansion, the 3rd generation took the helm in 1951 to complete the reconstruction:',
          ja: '受注急増に伴う工場拡張の最中、1951年に創業家第3世代が経営陣に参画し、本社の完全復興を成し遂げました：',
          zh: '在订单激增与急需扩产的关键时期，第三代传承人于1951年执掌技术大局，顺利完成全面重建：'
        },
        bullets: {
          de: [
            '<strong>Einstieg der 3. Generation (1951):</strong> Dr. Manfred Renner, Enkel des Gründers und Sohn von Oscar Renner, tritt nach Studium und praktischer Ausbildung in die Firma ein.',
            '<strong>Technische Leitung (Sommer 1952):</strong> Als geschäftsführender Gesellschafter übernimmt er die Leitung und forciert tatkräftig die betriebliche Modernisierung.',
            '<strong>Einzug in das Hauptgebäude (Herbst 1955):</strong> Mit jugendlichem Eifer vollendet er den Wiederaufbau auf ursprüngliche Größe; das Stuttgarter Stammwerk in der Fritz-Reuter-Straße wird bezogen.'
          ],
          en: [
            '<strong>Entry of the 3rd Generation (1951):</strong> Dr. Manfred Renner, grandson of the founder and son of Oscar Renner, joins the company after studies and practical training.',
            '<strong>Technical Leadership (Summer 1952):</strong> As managing partner, he assumes operational leadership and vigorously drives plant modernization.',
            '<strong>Return to Headquarters (Autumn 1955):</strong> Restoring the plant to full original scale, the rebuilt main facility on Fritz-Reuter-Strasse is triumphantly reoccupied.'
          ],
          ja: [
            '<strong>第3世代の参画（1951年）:</strong> 創業者の孫であり早逝したオスカー・レンナーの長男、マンフレート・レンナー博士が学業と実務修業を経て入社。',
            '<strong>技術経営の指揮（1952年夏）:</strong> 共同代表役員として工場の技術統括に就任し、若き情熱をもって生産近代化を力強く推進。',
            '<strong>本社本館への復帰（1955年秋）:</strong> 工場を戦前と同等の規模へ完全復興させ、フリッツ・ロイター通りの本社本館へ誇り高く帰還を果たしました。'
          ],
          zh: [
            '<strong>第三代传承入局（1951年）:</strong> 创始人孙辈、英年早逝的奥斯卡·雷诺之子——曼弗雷德·雷诺博士学成并完成实操深造后正式加入企业。',
            '<strong>统领技术大局（1952年夏）:</strong> 作为新任执行董事合伙人全面掌舵技术与运营，以青年企业家的魄力大刀阔斧推进现代化。',
            '<strong>新总部大楼落成乔迁（1955年秋）:</strong> 全面恢复战前原有宏大规模，弗里茨-路透街斯图加特总部大楼圆满落成并正式重新入驻。'
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
          de: '1990: Mauerfall, Zeitenwende & Rettung des Fortbestands',
          en: '1990: Fall of the Wall, Historic Crossroads & Securing the Future',
          ja: '1990年：ベルリンの壁崩壊、歴史的転換点、そしてレンナー存続の危機',
          zh: '1990年：柏林墙倒塌、世纪大转折与雷诺生死存亡之战'
        },
        sentence: {
          de: 'Der Fall der Berliner Mauer und die deutsche Wiedervereinigung 1990 brachten für Louis Renner die entscheidende historische Wende: Die Übernahme der Mechanik-Fertigung der Piano Union in Zeitz vereinte nicht nur zwei stolze Klavierbautraditionen, sondern sicherte in einer existenziellen Krise den Fortbestand des gesamten Unternehmens.',
          en: 'The fall of the Berlin Wall and German Reunification in 1990 marked an epochal turning point for Louis Renner: acquiring the piano action manufacturing operations of Piano Union in Zeitz not only united two storied piano lineages, but secured the very survival of the company in a make-or-break crisis.',
          ja: '1990年のベルリンの壁崩壊とドイツ再統一は、ルイス・レンナーにとって会社の存亡を賭けた最大の転換点となりました。ツァイツ（Zeitz）のピアノ・ユニオン（Piano Union）アクション製造部門の継承は、東西二大伝統の融合であると同時に、レンナーの倒産危機を救う決断でした。',
          zh: '1990年柏林墙的倒塌与两德统一，成为路易·雷诺历史上关乎生死存亡的关键转折点：接管蔡茨（Zeitz）德国钢琴联盟（Piano Union）击弦机制造厂，不仅汇聚了两大百年名门传统，更在千钧一发之际拯救了雷诺的存续与未来。'
        },
        bullets: {
          de: [
            '<strong>Mauerfall & Hohe Klavierbautradition in Mitteldeutschland:</strong> Mit der Öffnung der Grenzen 1989/1990 erschloss sich für Renner das historische Herzland des deutschen Klavierbaus. In Zeitz und Leipzig lebte in der Piano Union – hervorgegangen aus Weltmarken wie Carl Rönisch – ein unschätzbares Erbe an handwerklicher Präzision und Fachwissen.',
            '<strong>Existenzfrage im Wettbewerb mit tschechischen Herstellern:</strong> Der Schritt war für Renner eine reine Überlebensfrage: Gegen die aufstrebenden tschechischen Mechanik-Hersteller drohte Renner im internationalen Kosten- und Kapazitätswettbewerb zu unterliegen.',
            '<strong>Rettung des Großkunden Schimmel (>40 Klaviere/Tag):</strong> Ohne die neuen Fertigungskapazitäten in Zeitz hätte Renner seinen wichtigsten Großkunden verloren: die Firma Schimmel, die damals über 40 Klaviere pro Tag fertigte. Die Übernahme der Piano-Union-Mechanik sicherte Schimmel, rettete Renners Marktführerschaft und legte die Wurzel für den späteren Welt-Hauptsitz Meuselwitz.'
          ],
          en: [
            '<strong>Fall of the Wall & Rich Piano Heritage:</strong> The opening of the borders in 1989/1990 reconnected Renner with the historic heartland of German piano-making. In Zeitz and Leipzig, Piano Union—rooted in historic brands like Carl Rönisch—preserved generations of master woodworking and action-crafting expertise.',
            '<strong>Existential Pressure from Czech Manufacturers:</strong> For Renner, entering Zeitz was a matter of sheer survival: intense competition and cost pressure from emerging Czech action manufacturers threatened to undermine Renner\'s position in Europe.',
            '<strong>Saving Major Client Schimmel (>40 Pianos/Day):</strong> Without Zeitz\'s expanded production capacity, Renner risked losing its largest customer: the Schimmel piano company, which built over 40 pianos daily. The Zeitz acquisition secured Schimmel, safeguarded Renner\'s global leadership, and established the deep root of today\'s Meuselwitz headquarters.'
          ],
          ja: [
            '<strong>壁の崩壊と中部ドイツ・ピアノ製造の至宝：</strong> 1989/90年の国境開放により、ドイツピアノ製造の発祥の地が再び結ばれました。名門カール・レーニッシュの流れを汲むツァイツとライプツィヒのピアノ・ユニオンには、世界最高峰の木工精度と職人技が息づいていました。',
            '<strong>チェコ製アクション台頭による存亡の危機：</strong> 当時、台頭するチェコ製アクションメーカーとの激しい価格・供給力競争に晒され、レンナーは単独では太刀打ちできない危機的状況にありました。',
            '<strong>最大顧客シンメル（1日40台以上生産）の維持：</strong> ツァイツの生産拠点を獲得しなければ、当時1日40台以上のピアノを生産していたレンナー最大の顧客・シンメル（Schimmel）を失う寸前でした。この買収がシンメルとの絆を守り、レンナーの世界一の座と将来のモイゼルヴィッツ本社への道を切り拓きました。'
          ],
          zh: [
            '<strong>柏林墙倒塌与中德百年造琴底蕴：</strong> 1989/1990年边界开放，让雷诺得以重新拥抱德国钢琴制造业的历史摇篮。蔡茨厂区承袭自声名显赫的卡尔·罗尼施（Carl Rönisch）名门，积淀着极为深厚的精密木工与击弦机制造传统。',
            '<strong>面临捷克击弦机厂商竞争的存亡危机：</strong> 当时捷克击弦机制造商迅速崛起，凭借巨大的成本和产能优势对雷诺形成巨大冲击，雷诺若不扩产降本将难以为继。',
            '<strong>挽救第一大客户舒密尔（Schimmel，日产逾40架）：</strong> 若没有蔡茨的新产能支撑，雷诺将彻底失去其最大的核心客户——当时每日出厂超过40架钢琴的德国舒密尔。收购蔡茨击弦机业务成功稳固了舒密尔合作，捍卫了雷诺全球领先地位，并筑牢了日后莫伊瑟尔维茨全球总部的坚实根基。'
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
          'Visuell/Bilder/01_Geschichte/1989_mauerfall_brandenburger_tor.jpg',
          'Visuell/Bilder/01_Geschichte/ZeitzGeschichte.webp'
        ],
        image: 'Visuell/Bilder/01_Geschichte/1989_mauerfall_brandenburger_tor.jpg',
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
        id: '2001',
        year: '2001',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Gärtringen', en: 'Modern Plants', ja: '近代2拠点', zh: '两厂协同' },
        heading: {
          de: 'Umzug nach Gärtringen & Produktionszentrum Meuselwitz',
          en: 'Relocation to Gärtringen & Meuselwitz Center',
          ja: 'ゲルトリンゲン移転とモイゼルヴィッツ生産拠点',
          zh: '盖特林根新厂落成与莫伊瑟尔维茨生产中心'
        },
        sentence: {
          de: 'Umzug der Holzbearbeitung nach Gärtringen und Ausbau des 6.000 m² Werks Meuselwitz für Montage und Hammerköpfe.',
          en: 'Woodworking moves to Gärtringen alongside the expansion of the 6,000 m² Meuselwitz plant for assembly and hammerheads.',
          ja: '木工拠点をゲルトリンゲンへ、組立とハンマー拠点を6,000㎡のモイゼルヴィッツへ展開。',
          zh: '精密木工业务迁入盖特林根，同时将总装与弦槌生产拓展至6,000平米的莫伊瑟尔维茨基地。'
        },
        fact: {
          de: '✦ Über 3 Millionen Klaviermechaniken',
          en: '✦ Over 3 Million Actions Produced',
          ja: '✦ 累計300万台以上の納入実績',
          zh: '✦ 累计生产超300万台精密机械'
        },
        quote: {
          de: '„Über 8.800 Präzisionsteile bilden eine Mechanik.“',
          en: '“Over 8,800 individual precision components form a single grand action.”',
          ja: '「1台のメカニズムを構成する8,800点以上の超精密部品。」',
          zh: '“一台高品质大钢琴击弦机由超过8,800个精密零件精密咬合而成。”'
        },
        quoteAuthor: {
          de: 'louis-renner.de • Klaviermechanik',
          en: 'louis-renner.de • Piano Actions',
          ja: '公式解説（louis-renner.de）',
          zh: '雷诺官网技术白皮书'
        },
        image: 'Visuell/web_assets/renner-ga-okt-2018-scaled.jpg',
        imageTag: { de: '2001 Gärtringen', en: '2001 Gärtringen', ja: '2001年ゲルトリンゲン', zh: '2001年盖特林根' },
        imageCaption: {
          de: 'Standort Gärtringen vor der Bündelung aller Fertigungsbereiche am neuen Hauptsitz Meuselwitz',
          en: 'The Gärtringen facility prior to the full consolidation at the new Meuselwitz headquarters',
          ja: 'モイゼルヴィッツ新本社への全面統合を前に木工を担ったゲルトリンゲン事業所',
          zh: '在全面整合迁往莫伊瑟尔维茨新总部前负责高精木工的盖特林根厂区'
        }
      },

      7: {
        id: '2019',
        year: '2019',
        branch: 'down',
        arrow: '▼',
        tag: { de: 'Steinway & Sons', en: 'Steinway & Sons', ja: 'スタインウェイ', zh: '施坦威大家庭' },
        heading: {
          de: 'Neuer Firmeneigentümer: Steinway & Sons übernimmt Renner',
          en: 'New Ownership: Steinway & Sons Acquires Renner',
          ja: '新株主：スタインウェイ＆サンズによるレンナー買収と独立性の堅持',
          zh: '新控股股东：施坦威钢琴（Steinway & Sons）收购雷诺并恪守独立运营'
        },
        sentence: {
          de: '2019 stellte Inhaber Clemens von Arnim die Weichen für die Zukunft: Trotz höherer Kaufangebote anderer Bieter entschied er sich mit großer Weitsicht für Steinway & Sons – zum Schutz der Belegschaft und für die langfristige Eigenständigkeit von Renner.',
          en: 'In 2019, owner Clemens von Arnim set the course for Renner’s future: Despite higher competing bids, he chose Steinway & Sons with visionary leadership – prioritizing the workforce and long-term independence:',
          ja: '2019年、オーナーのクレメンス・フォン・アルニム氏は未来を見据えた英断を下しました。他社からより高額な買収提示があったにもかかわらず、社員の雇用とレンナーの独立を守るためスタインウェイを選択：',
          zh: '2019年，雷诺原控股股东克莱门斯·冯·阿尔尼姆（Clemens von Arnim）以非凡远见奠定百年基石：面对出价更高的竞争买家，他毅然选择施坦威——只为全力保障员工权益与雷诺品牌的独立未来：'
        },
        bullets: {
          de: [
            '<strong>Historische Partnerschaft & 100% Unabhängigkeit:</strong> Steinway & Sons (Hamburg & New York) garantiert Renner vollständige operative Eigenständigkeit; Renner beliefert unverändert alle führenden Klavierbauer weltweit.',
            '<strong>Verantwortung vor Profit – Clemens von Arnim:</strong> Es gab Bieter, die mehr geboten hatten – doch er entschloss sich aus tiefer Verbundenheit für Louis Renner und die Belegschaft für Steinway, denn dadurch waren die Arbeitsplätze und die Zukunft gesichert.',
            '<strong>In ehrendem Gedenken († 23.04.2024):</strong> Unser tiefster Dank gilt Clemens von Arnim für seine Weitsicht und Führung. Tragischerweise verstarb er viel zu früh am 23. April 2024, ohne seinen wohlverdienten Ruhestand voll auskosten zu können.'
          ],
          en: [
            '<strong>Historic Partnership & 100% Independence:</strong> Steinway & Sons (Hamburg & New York) guarantees complete operational autonomy, ensuring Renner continues supplying premier piano makers worldwide.',
            '<strong>Responsibility over Profit – Clemens von Arnim:</strong> Despite higher financial offers from other bidders, von Arnim consciously chose Steinway out of deep loyalty to secure jobs and the Renner legacy.',
            '<strong>In Grateful Memory († April 23, 2024):</strong> Our profound gratitude goes to Clemens von Arnim for his foresight and devotion. Tragically, he passed away far too early on April 23, 2024, before he could enjoy his well-deserved retirement.'
          ],
          ja: [
            '<strong>歴史的協業と100%独立性の堅持:</strong> スタインウェイ（ハンブルク・NY）は完全な事業独立性を確約。世界中の名門ピアノメーカーへの最高品質供給をそのまま維持。',
            '<strong>利益より社員の未来を優先（C. v. アルニム氏の英断）:</strong> 高額な競合入札を退け、従業員の生活とブランドの魂を守るため、スタインウェイ傘下への参入を決断。',
            '<strong>深き感謝と追悼（2024年4月23日逝去）:</strong> その崇高な功績と先見性に心から感謝を捧げます。惜しむらくは、待望の余生を過ごす間もなく、2024年4月23日に若くして旅立たれました。'
          ],
          zh: [
            '<strong>世纪战略联姻与100%独立运营:</strong> 施坦威（汉堡/纽约）郑重承诺雷诺享有完全独立的经营自主权，一如既往向全球所有名琴厂商供应顶级击弦机与弦槌。',
            '<strong>员工福祉重于一切（冯·阿尔尼姆先生的仁厚抉择）:</strong> 尽管有其他买方开出更高报价，他毅然为全体员工的稳定生计与雷诺匠心精神的长久延续选择了施坦威。',
            '<strong>深切缅怀与由衷敬意（2024年4月23日逝世）:</strong> 我们由衷感谢冯·阿尔尼姆先生的远见卓识与卓越奉献。令人无比痛惜的是，他在步入应享的天伦退休生活前夕，于2024年4月23日英年早逝。'
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
          'Visuell/Bilder/01_Geschichte/ClemensVonArnimProduktion.jpg'
        ],
        image: 'Visuell/Bilder/01_Geschichte/ClemensVonArnimProduktion.jpg',
        imageTag: { de: '2019 Steinway', en: '2019 Steinway', ja: '2019年スタインウェイ', zh: '2019年施坦威' },
        imageCaption: {
          de: 'Historische Partnerschaft mit Steinway & Sons und Inhaber Clemens von Arnim in der Produktion († 23.04.2024)',
          en: 'Historic Partnership with Steinway & Sons and owner Clemens von Arnim in production († April 23, 2024)',
          ja: 'スタインウェイ＆サンズとの歴史的協業と製造現場の故クレメンス・フォン・アルニム氏（2024年4月23日逝去）',
          zh: '施坦威历史性携手与深入生产一线的原控股股东克莱门斯·冯·阿尔尼姆先生（2024年4月23日逝世）'
        }
      },

      8: {
        id: 'heute',
        year: 'Heute',
        branch: 'up',
        arrow: '▲',
        tag: { de: 'Meuselwitz', en: 'Global HQ', ja: '統合世界本社', zh: '全球新总部' },
        heading: {
          de: 'Tradition bewahren. Zukunft gestalten: Von 1882 bis heute',
          en: 'Preserving Tradition. Shaping the Future: From 1882 to Today',
          ja: '伝統を守り、未来を創る：1882年から現在へ',
          zh: '恪守传统 · 塑造未来：从1882年走向今日'
        },
        sentence: {
          de: 'Aus der kleinen Werkstätte von 1882 ist in über 140 Jahren ein Weltmarktführer entstanden. Unser Leitgedanke ist damals wie heute derselbe: Renner-Mechaniken in denkbar bester Qualität zu liefern und durch neueste praktische sowie musikwissenschaftliche Erkenntnisse stetig zu perfektionieren.',
          en: 'From a modest workshop founded in 1882, Louis Renner has grown over 140+ years into the global market leader. Our guiding principle remains unchanged: to deliver Renner actions of unsurpassed quality, continuously perfected through modern manufacturing and musicological insights.',
          ja: '1882年の小さな工房から始まったルイス・レンナーは、140年以上の歳月を経て世界市場の頂点へと成長しました。創業から今日に至るまで変わらぬ信念は、最高峰品質のレンナー・アクションを届けるとともに、最新の製造技術と音楽音響学の知見により絶え間なく完成度を高め続けることです。',
          zh: '从1882年创立的手工工坊，到历经140余载砥砺前行，雷诺已成长为全球钢琴击弦机市场的领航者。历久弥新的初心始终如一：打造无出其右的雷诺机械传动核心，并依托前沿工艺与乐器声学最新成果实现精益求精。'
        },
        bullets: {
          de: [
            '<strong>Wegweisende Standortbündelung:</strong> Um dieser Mission und unserer Geschichte auch in Zukunft gerecht zu werden, haben wir eine wegweisende Entscheidung getroffen: Die Bündelung unserer gesamten Kompetenz an einem zentralen Standort. Mit der Verlagerung von Gärtringen nach Meuselwitz schreiben wir die Renner-Erfolgsgeschichte konzentriert fort.',
            '<strong>Dank an das Team Gärtringen:</strong> Unser besonderer Dank gilt dabei unseren treuen Mitarbeiterinnen und Mitarbeitern in Gärtringen für ihren herausragenden Einsatz bis zum letzten Tag.',
            '<strong>Meilenstein vollendet:</strong> Nach dem Projektstart im Oktober 2025 ist dieser Meilenstein heute erreicht: Alle Prozesse wurden erfolgreich nach Meuselwitz überführt.'
          ],
          en: [
            '<strong>Pioneering Consolidation:</strong> To honor our mission and heritage in the future, we made a landmark decision: consolidating our entire expertise at a single central facility. Relocating from Gärtringen to Meuselwitz enables us to write the next chapter of Renner\'s success story in concentrated form.',
            '<strong>Gratitude to the Gärtringen Team:</strong> We extend our heartfelt gratitude to our loyal employees in Gärtringen for their extraordinary dedication and commitment up to the very last day.',
            '<strong>Milestone Achieved:</strong> Following the project launch in October 2025, this milestone is accomplished today: all processes have been successfully transferred to Meuselwitz.'
          ],
          ja: [
            '<strong>先駆的な拠点統合：</strong> この使命と歴史を未来へ受け継ぐため、全知見・技術を単一拠点に集約するという英断を下しました。ゲルトリンゲンからモイゼルヴィッツへの移転統合により、レンナーの成功の軌跡をさらに力強く前進させます。',
            '<strong>ゲルトリンゲン社員への感謝：</strong> 最終日まで惜しみない情熱と卓越した技術で貢献してくださったゲルトリンゲンの全スタッフに、心より深甚なる感謝を捧げます。',
            '<strong>マイルストーン達成：</strong> 2025年10月のプロジェクト始動を経て、本日この節目を達成：全製造プロセスがモイゼルヴィッツへ完全に移管・統合されました。'
          ],
          zh: [
            '<strong>开创性总部聚合：</strong> 为在未来持续践行使命与荣耀传承，我们做出了里程碑式的重大决策：将全部专业力量汇聚于同一现代化中心。随着盖特灵根厂区向莫伊瑟尔维茨总部的整体迁徙，雷诺传奇篇章得以更为集中地续写。',
            '<strong>感恩盖特灵根团队：</strong> 我们向盖特灵根所有兢兢业业的忠实员工致以最由衷的感谢，深切铭记大家直至最后一刻的卓越奉献。',
            '<strong>里程碑圆满达成：</strong> 历经2025年10月启动的项目攻坚，这一宏伟目标于今日圆满达成：全部生产体系与工艺流程均已顺利移交莫伊瑟尔维茨。'
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
        image: 'Visuell/Bilder/02_Meuselwitz_Umbau/24_meuselwitz_moderner_hauptsitz_aussen_innen.jpg',
        imageTag: { de: 'Meuselwitz 2025', en: 'Meuselwitz 2025', ja: 'モイゼルヴィッツ 2025', zh: '莫伊瑟尔维茨 2025' },
        imageCaption: {
          de: 'Der neue vereinte Louis Renner Welt-Hauptsitz in Meuselwitz (Thüringen)',
          en: 'The new consolidated Louis Renner World Headquarters in Meuselwitz (Thuringia)',
          ja: 'テューリンゲン州モイゼルヴィッツに誕生したレンナー新世界統合本社',
          zh: '位于图林根州莫伊瑟尔维茨的一体化雷诺全球新总部'
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
      const intervalMs = parseInt(slideshow.getAttribute('data-slide-interval') || '5000', 10);
      let timer = null;

      const stopTimer = () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };

      const startTimer = () => {
        stopTimer();
        timer = setInterval(() => {
          const panel = slideshow.closest('.tree-milestone-panel');
          const slide = slideshow.closest('.slide');
          // Only cycle when slide 3 and the milestone panel are active
          if (slide && !slide.classList.contains('active')) return;
          if (panel && !panel.classList.contains('active')) return;

          updateSlide(currentIdx + 1);
        }, intervalMs);
      };

      const updateSlide = (idx) => {
        currentIdx = (idx + mediaList.length) % mediaList.length;
        stopTimer();

        mediaList.forEach((el, i) => {
          const isActive = i === currentIdx;
          el.classList.toggle('active', isActive);
          if (el.tagName === 'VIDEO') {
            el.loop = false;
            el.removeAttribute('loop');
            if (isActive) {
              el.currentTime = 0;
              const playPromise = el.play();
              if (playPromise) playPromise.catch(() => {});
            } else {
              el.pause();
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
          if (cap && captionEl.textContent !== cap) {
            captionEl.style.opacity = '0';
            setTimeout(() => {
              captionEl.textContent = cap;
              captionEl.style.opacity = '1';
            }, 350);
          }
        }

        if (currentMedia && currentMedia.tagName === 'VIDEO') {
          currentMedia.onended = () => {
            const panel = slideshow.closest('.tree-milestone-panel');
            const slide = slideshow.closest('.slide');
            if (slide && !slide.classList.contains('active')) return;
            if (panel && !panel.classList.contains('active')) return;
            updateSlide(currentIdx + 1);
          };
          currentMedia.onerror = () => {
            updateSlide(currentIdx + 1);
          };
        } else {
          startTimer();
        }
      };

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlide(idx);
        });
      });

      slideshow._slideshowReset = () => {
        updateSlide(0);
      };

      updateSlide(0);
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
    if (!container) return;
    const rect = container.getBoundingClientRect();
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
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
    }

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
              if (ss && typeof ss._slideshowReset === 'function') {
                ss._slideshowReset();
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
