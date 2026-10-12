/**
 * Louis Renner Presentation - Authentic History Journey Controller
 * Based strictly on https://www.louis-renner.de/ueber-renner/die-geschichte-renners/
 * Provides interactive era switching, authentic historical photos, and 4-language support (DE, EN, JA, ZH).
 */

class RennerHistoryJourney {
  constructor() {
    this.currentEra = 0;
    this.currentLang = 'de';
    this.totalEras = 4;

    this.erasData = {
      0: {
        id: '1882-1902',
        yearRange: '1882–1902',
        label: {
          de: 'Gründung',
          en: 'Founding',
          ja: '創業と工房',
          zh: '创立与首家工坊'
        },
        badge: {
          de: 'Epoche 1: 1882 – 1902 • Der Beginn in Stuttgart',
          en: 'Epoch 1: 1882 – 1902 • The Stuttgart Beginning',
          ja: '時代1：1882〜1902年 • シュトゥットガルトでの創業',
          zh: '纪元一：1882 – 1902 • 斯图加特的传奇起点'
        },
        heading: {
          de: 'Die Vision von Louis Renner in der Heusteigstraße',
          en: 'The Vision of Louis Renner on Heusteigstrasse',
          ja: 'ホイシュタイグ通りの工房から始まったルイス・レンナーの志',
          zh: '路易·雷诺在霍伊施泰希街的创立愿景'
        },
        description: {
          de: 'Im Oktober 1882 eröffnete Louis Renner nach reiflicher Überlegung in der Stuttgarter Heusteigstraße seine erste Werkstatt. Angetrieben von dem Grundsatz, nur beste Qualität zu akzeptieren und zu liefern, begründete er den Weltruf der Renner-Klaviermechaniken.',
          en: 'In October 1882, after careful consideration, Louis Renner opened his first workshop on Heusteigstrasse in Stuttgart. Driven by the philosophy to only accept and deliver the finest quality, he laid the cornerstone for Renner\'s world renown.',
          ja: '1882年10月中旬、創業者ルイス・レンナーは熟慮の末、シュトゥットガルトのホイシュタイグ通りに最初の工房を開設。「最高品質のみを受け入れ、最高品質のみを届ける」という信念のもと、世界最高峰のアクション製造の歴史が幕を開けました。',
          zh: '1882年10月中旬，路易·雷诺在深思熟虑后于斯图加特霍伊施泰希街设立了第一间手工工坊。秉持“只接受并交付无可挑剔之最高品质”的立厂之本，开启了雷诺机械享誉世界的传奇篇章。'
        },
        bullets: {
          de: [
            { highlight: 'Mitte Oktober 1882:', text: 'Beginn der handwerklichen Herstellung von Klaviermechaniken in Stuttgart. Höchste Präzision und kompromisslose Materialauslese als Fundament.' },
            { highlight: '1902 – Neuer Fabrikbau & Generationenwechsel:', text: 'Auf 35 Köpfe angewachsen. Umzug an die Fritz-Reuter-Straße. Übergabe an Sohn Oscar Renner (Technik) & Wilhelm Megenhardt (Kaufmännisch).' }
          ],
          en: [
            { highlight: 'Mid-October 1882:', text: 'Handcrafted production of piano actions begins in Stuttgart. Absolute precision and uncompromising material selection.' },
            { highlight: '1902 – New Factory & Succession:', text: 'Team expands to 35 specialists. Relocation to Fritz-Reuter-Strasse. Succession to Oscar Renner (technical) & Wilhelm Megenhardt (commercial).' }
          ],
          ja: [
            { highlight: '1882年10月：', text: 'ピアノアクションの手工業生産を開始。妥協なき素材選別とミクロン単位の精度を追求。' },
            { highlight: '1902年 フリッツ・ロイター通り新工場：', text: '職人35名へ拡大し近代工場へ移転。オスカー・レンナー（技術）とヴィルヘルム・メーゲンハルト（経営）へ事業承継。' }
          ],
          zh: [
            { highlight: '1882年10月中旬：', text: '正式开启钢琴机械的手工制造。以严苛的天然木材筛选与微米级组装为立足基石。' },
            { highlight: '1902年 迁入弗里茨-路透街新厂：', text: '匠人团队扩展至35人。新工厂拔地而起，路易·雷诺将管理权移交其子奥斯卡·雷诺（技术总监）与威廉·梅根哈特（商务总监）。' }
          ]
        },
        quote: {
          de: '„Bescheiden waren die Anfänge, groß die Erfindungsgabe und kühn die Bestrebungen des Gründers und seiner Nachfahren, beispiellos und umfassend der Welterfolg des Unternehmens.“',
          en: '“Modest were the beginnings, great the inventive genius, and bold the aspirations of the founder and his successors, unparalleled and far-reaching the worldwide success.”',
          ja: '「慎ましい始まり、偉大なる創意工夫、そして創業者一族の果敢な挑戦が、世界的な成功を築き上げた。」',
          zh: '“起步虽为简朴，发明之智卓然，创立者及其后代之抱负宏远，终铸举世瞩目之辉煌成就。”'
        },
        quoteAuthor: {
          de: 'Louis Renner Chronik • Heusteigstraße Stuttgart 1882',
          en: 'Louis Renner Chronicle • Stuttgart 1882',
          ja: 'ルイス・レンナー年代記（1882年）',
          zh: '雷诺原厂档案 • 1882年斯图加特'
        },
        image: 'Visuell/web_assets/werkstatt-renner.png',
        imageTag: {
          de: '1882 Gründung',
          en: '1882 Founding',
          ja: '1882年創業',
          zh: '1882年创立'
        },
        imageCaption: {
          de: 'Historische Werkstatt Louis Renner, Heusteigstraße Stuttgart (1882)',
          en: 'Historical Workshop of Louis Renner, Heusteigstrasse Stuttgart (1882)',
          ja: 'ルイス・レンナー創業当時の歴史的工房（シュトゥットガルト・ホイシュタイグ通り）',
          zh: '路易·雷诺在斯图加特霍伊施泰希街的第一代历史手工作坊（1882）'
        }
      },

      1: {
        id: '1906-1928',
        yearRange: '1906–1928',
        label: {
          de: 'Hammerköpfe',
          en: 'Hammerheads',
          ja: 'ハンマー製造',
          zh: '弦槌生产'
        },
        badge: {
          de: 'Epoche 2: 1906 – 1928 • Hammerköpfe & Technisierung',
          en: 'Epoch 2: 1906 – 1928 • Hammerheads & Electrification',
          ja: '時代2：1906〜1928年 • ハンマーヘッド自社製と電化',
          zh: '纪元二：1906 – 1928 • 弦槌自主生产与工业化'
        },
        heading: {
          de: 'Aufnahme der Hammerkopffertigung & Oscar Renners Pioniertat',
          en: 'In-House Hammerhead Production & Technological Pioneering',
          ja: 'ハンマーヘッド製造の開始とオスカー・レンナーの技術革新',
          zh: '弦槌自主制造启航与奥斯卡·雷诺的工业化先驱革新'
        },
        description: {
          de: '1906 erweiterte Renner die Fertigung um das anspruchsvollste Bauteil des Klaviers: die Hammerköpfe. Oscar Renner trieb die Modernisierung voran und stellte als Industriepionier von starren Transmissionen auf Hunderte elektrische Einzelantriebe um.',
          en: 'In 1906, Renner expanded into the most demanding component of the piano: hammerheads. Oscar Renner pioneered industrial electrification, replacing rigid transmission shafts with hundreds of individual electric motors.',
          ja: '1906年、ピアノの音色を決定づける最重要部品「ハンマーヘッド」の自社製造を開始。オスカー・レンナーは動力伝達軸を廃止し、数百台の独立モーター駆動へ転換する先進的近代化を成し遂げました。',
          zh: '1906年，雷诺正式涉足决定整琴音色灵魂的最核心部件——弦槌制造。奥斯卡·雷诺作为工业先锋，彻底摒弃旧式总轴皮带传动，引入数百台独立电机单驱，大幅提升加工精度与一致性。'
        },
        bullets: {
          de: [
            { highlight: 'ab 1906 – Eigene Hammerkopf-Fertigung:', text: 'Aufnahme der anspruchsvollen Fabrikation mit eigenentwickelten Spezialmaschinen. Grundstein des weltberühmten Renner-Klangs.' },
            { highlight: 'ab 1911 – Flügelmechaniken & Einzelantriebe:', text: 'Umstellung von Transmissionen auf Hunderte von Elektromotoren. Aufnahme von Flügelmechaniken, um alle Zweige aus einer Hand zu bieten.' }
          ],
          en: [
            { highlight: 'From 1906 – Dedicated Hammerhead Manufacturing:', text: 'Specially designed tooling and presses establish the iconic, singing Renner tone across the globe.' },
            { highlight: 'From 1911 – Grand Actions & Single Drives:', text: 'Full grand piano action production introduced alongside hundreds of individual electric drives for unprecedented precision.' }
          ],
          ja: [
            { highlight: '1906年より ハンマーヘッド自社生産開始：', text: '独自の成形・圧着設備を開発し、世界で愛される豊かで伸びやかなレンナー・トーンを確立。' },
            { highlight: '1911年より グランド用アクションと電動化：', text: 'グランド用アクションの生産を開始し、全工程を完全自社製へ。個別モーター導入による驚異的な精度向上。' }
          ],
          zh: [
            { highlight: '1906年起 弦槌自主制造：', text: '自主研发专用模具与压力成型机，奠定雷诺醇厚、丰富泛音的标志性德系声音美学。' },
            { highlight: '1911年起 三角钢琴击弦机与全面电化：', text: '正式将三角钢琴击弦机纳入自主制造，实现立式与三角全系列自研自产，装配数百台独立电机。' }
          ]
        },
        quote: {
          de: '„Um alle Zweige der Herstellung von Klaviermechaniken in einer Hand zu vereinigen und dem Fabrikationsprogramm eine gewisse Abrundung zu geben.“',
          en: '“To unite all branches of piano action manufacturing under one roof and bring the manufacturing program to complete perfection.”',
          ja: '「ピアノアクション製造の全工程を自らの手に統合し、製品体系を完璧なものへと昇華させる。」',
          zh: '“将钢琴机械制造的每一个细分领域凝聚于自主工序之中，赋予生产谱系无可挑剔的完备性。”'
        },
        quoteAuthor: {
          de: 'Oscar Renner • Technischer Leiter & Industriepionier',
          en: 'Oscar Renner • Technical Director & Pioneer',
          ja: 'オスカー・レンナー（技術責任者・革新者）',
          zh: '奥斯卡·雷诺 • 技术总裁与工业先驱'
        },
        image: 'Visuell/web_assets/arbeitsumgebung-renner.png',
        imageTag: {
          de: '1911 Technisierung',
          en: '1911 Electrification',
          ja: '1911年電動化',
          zh: '1911年全面电化'
        },
        imageCaption: {
          de: 'Hunderte elektrische Einzelantriebe: Technisierung unter Oscar Renner (1911)',
          en: 'Hundreds of individual electric drives: Electrification under Oscar Renner (1911)',
          ja: '数百基の独立モーターによる電化：オスカー・レンナー時代の最新鋭機械室（1911年）',
          zh: '引入数百台独立电动机：奥斯卡·雷诺领导下的机械加工现代化车间（1911）'
        }
      },

      2: {
        id: '1944-1977',
        yearRange: '1944–1977',
        label: {
          de: 'Wiederaufbau',
          en: 'Rebirth',
          ja: '復興と発展',
          zh: '浴火重生'
        },
        badge: {
          de: 'Epoche 3: 1944 – 1977 • Brandnacht, Wiederaufbau & Weltweiter Service',
          en: 'Epoch 3: 1944 – 1977 • Bombing Night, Rebirth & Global Service',
          ja: '時代3：1944〜1977年 • 戦災焼失、不屈の復興と世界最高峰パーツ体制',
          zh: '纪元三：1944 – 1977 • 战火浩劫、浴火重生与全球服务体系'
        },
        heading: {
          de: 'Die Brandnacht 1944, heroischer Wiederaufbau & der Renner-Katalog',
          en: 'The 1944 Bombing, Heroic Reconstruction & the Legendary Renner Catalog',
          ja: '1944年の戦災焼失、不屈の復興と世界最高峰パーツカタログの誕生',
          zh: '1944年战火浩劫、浴火重生与划时代雷诺原厂配件大全'
        },
        description: {
          de: 'In der Kriegsnacht vom 24./25. Juli 1944 brannte die Stuttgarter Fabrik lichterloh nieder. Alles schien verloren. Doch mit unbändigem Willen bauten Wilhelm Megenhardt und Enkel Dr. Manfred Renner die Werke wieder auf. 1977 begründete Rudolf Genger den legendären weltweiten Ersatzteilservice.',
          en: 'On the night of July 24/25, 1944, the Stuttgart factories were destroyed by fire. Everything seemed lost. Yet through indomitable spirit, Wilhelm Megenhardt and Dr. Manfred Renner rebuilt the enterprise. In 1977, Rudolf Genger founded the worldwide spare parts division and catalog.',
          ja: '1944年7月24日深夜の空襲でシュトゥットガルト工場は全焼し、灰燼に帰しました。しかしヴィルヘルム・メーゲンハルトと創業者孫マンフレート・レンナー博士は不屈の意志で再建。1977年にはルドルフ・ゲンガーが伝説的パーツ供給体制を確立しました。',
          zh: '1944年7月24日深夜，斯图加特工厂在战火中彻底被焚毁，百年基业几近化为灰烬。威廉·梅根哈特与创始人孙辈曼弗雷德·雷诺博士以百折不挠的坚韧带领全体匠人重建工厂。1977年鲁道夫·根格尔建立全球配件中心并发布举世瞩目的雷诺图册。'
        },
        bullets: {
          de: [
            { highlight: '24./25. Juli 1944 – Brand & Wiederaufbau:', text: 'Stuttgart in Flammen, totale Zerstörung. Durch unendliche Kleinarbeit gelingt der Wiederaufbau (Wiederbezug Fritz-Reuter-Straße 1955).' },
            { highlight: '1960 Östringen & 1977 Genger-Katalog:', text: 'Zweigbetrieb Östringen für Vorfertigung (50 Mitarbeiter). Rudolf Genger baut das weltweite Großlager auf und veröffentlicht den legendären Renner-Katalog.' }
          ],
          en: [
            { highlight: 'July 1944 – Fire & Reconstruction:', text: 'Total devastation in WWII. Through extraordinary perseverance, the main factory was completely restored and re-occupied by 1955.' },
            { highlight: '1960 Östringen & 1977 Genger Catalog:', text: 'Östringen plant established (50 specialists). Rudolf Genger expands worldwide parts service and launches the acclaimed Renner Catalog.' }
          ],
          ja: [
            { highlight: '1944年7月 空襲と復興：', text: '全施設が全焼するも職人たちが結集。1955年にはフリッツ・ロイター通り本社工場を完全復旧。' },
            { highlight: '1960年 エストリンゲン工場 & 1977年 ゲンガー・カタログ：', text: 'ハンマー予備成形のため工場増設。世界中の調律技術者が頼る総合補修パーツカタログを発刊。' }
          ],
          zh: [
            { highlight: '1944年7月 战火与重建：', text: '厂房毁于烈火，水泵干涸无援。历经十年艰辛重建，1955年弗里茨-路透街总部大楼全面复工。' },
            { highlight: '1960年 厄斯特林根分厂 & 1977年 根格尔图册：', text: '建立厄斯特林根分厂（50名专职匠人）。鲁道夫·根格尔构建全球维修配件仓储并出版雷诺配件大典。' }
          ]
        },
        quote: {
          de: '„Trotz Zerstörung, trotz unendlicher Hindernisse entstand durch Handwerkskunst ein stärkeres, moderneres Haus Renner als je zuvor.“',
          en: '“Despite devastation and endless hardship, Renner rose from the ashes stronger and more modern than ever.”',
          ja: '「壊滅的破壊を乗り越え、比類なき情熱と職人技によって、レンナーはより強固な最高峰メーカーへと蘇った。」',
          zh: '“面对摧毁一切的劫难，凭借世代相承的匠心与坚韧，雷诺不仅涅槃重生，更成长为更为强大现代的世界翘楚。”'
        },
        quoteAuthor: {
          de: 'Wilhelm Megenhardt & Dr. Manfred Renner',
          en: 'Wilhelm Megenhardt & Dr. Manfred Renner',
          ja: 'ヴィルヘルム・メーゲンハルト ＆ M. レンナー博士',
          zh: '威廉·梅根哈特 与 曼弗雷德·雷诺博士'
        },
        image: 'Visuell/web_assets/auto-renner-werk.png',
        imageTag: {
          de: 'Wiederaufbau',
          en: 'Reconstruction',
          ja: '復興と展開',
          zh: '浴火重生'
        },
        imageCaption: {
          de: 'Historisches Renner Firmenfahrzeug vor dem wiederaufgebauten Stuttgarter Fabrikgebäude',
          en: 'Historical Renner delivery truck in front of the rebuilt factory building in Stuttgart',
          ja: '再建されたシュトゥットガルト本社工場とレンナー社専用の歴史的配送車両',
          zh: '战后全面重建的斯图加特厂区前，雷诺历史官方专属货物配送厢式车'
        }
      },

      3: {
        id: '2001-heute',
        yearRange: '2001–Heute',
        label: {
          de: 'Moderne & Steinway',
          en: 'Modern Era',
          ja: '現代とスタインウェイ',
          zh: '现代与施坦威'
        },
        badge: {
          de: 'Epoche 4: 2001 – Heute • Moderne, Meuselwitz & Steinway & Sons',
          en: 'Epoch 4: 2001 – Present • Modernity, Meuselwitz & Steinway & Sons',
          ja: '時代4：2001年〜現在 • ゲルトリンゲン・モイゼルヴィッツ・スタインウェイ',
          zh: '纪元四：2001 – 至今 • 现代跨越、莫伊瑟尔维茨与施坦威大家庭'
        },
        heading: {
          de: 'Gärtringen, das Werk Meuselwitz & die Steinway & Sons Familie',
          en: 'Gärtringen, Meuselwitz Facility & the Steinway & Sons Family',
          ja: 'ゲルトリンゲン移転、モイゼルヴィッツ集約、そしてスタインウェイ傘下へ',
          zh: '盖特林根新厂、莫伊瑟尔维茨基地与施坦威大家庭'
        },
        description: {
          de: 'Im Jahr 2001 bezog Renner das hochmoderne Werk in Gärtringen. 2011 erfolgte die Bündelung im 6.000 m² Werk Meuselwitz. 2019 trat Renner als eigenständiges Unternehmen der Steinway & Sons Familie bei – bevor 2025/2026 alle Kräfte am neuen Hauptsitz Meuselwitz vereint wurden.',
          en: 'In 2001, Renner moved to a state-of-the-art facility in Gärtringen. In 2011, the 6,000 m² Meuselwitz plant was established. In 2019, Renner joined the Steinway & Sons family as an independent company, paving the way for the unified headquarters in Meuselwitz.',
          ja: '2001年に環境基準を満たすゲルトリンゲン新工場を開設。2011年には6,000m²のモイゼルヴィッツ工場へ中核製造を集約。2019年、長年のパートナーであるスタインウェイ＆サンズのグループに参入し、完全独立性を保ちながら世界中のピアノメーカーを支え続けています。',
          zh: '2001年，雷诺迁入盖特林根全新环保现代化工厂。2011年，6000平方米的莫伊瑟尔维茨基地拔地而起，成为机械总装与弦槌生产核心。2019年，雷诺正式加入施坦威（Steinway & Sons）大家庭，并保持完全独立运营，为全球整个钢琴制造行业提供无与伦比的核心部件。'
        },
        bullets: {
          de: [
            { highlight: '2001 Gärtringen & 2011 Meuselwitz:', text: 'Verlagerung aus Stuttgart nach Gärtringen. Meuselwitz wird zur Kernproduktionsstätte für Vor- und Endmontage und Hammerkopffertigung.' },
            { highlight: '2019 – Partnerschaft mit Steinway & Sons:', text: 'Steinway übernimmt Renner als eigenständiges, unabhängiges Kompetenzzentrum für die gesamte weltweite Klavierbranche.' }
          ],
          en: [
            { highlight: '2001 Gärtringen & 2011 Meuselwitz:', text: 'Relocation from Stuttgart to Gärtringen. Meuselwitz established as the central production powerhouse for actions and hammerheads.' },
            { highlight: '2019 – Joining Steinway & Sons:', text: 'Steinway acquires Renner as an independent craft center, continuing to supply all world-class manufacturers without restriction.' }
          ],
          ja: [
            { highlight: '2001年 ゲルトリンゲン & 2011年 モイゼルヴィッツ：', text: 'シュトゥットガルトから郊外へ。モイゼルヴィッツがアクション組立とハンマーヘッド製造の中心へ。' },
            { highlight: '2019年 スタインウェイ・ファミリーへ：', text: 'スタインウェイがレンナーを買収。独立した最高峰マニュファクチュールとして、世界中のあらゆるブランドへの供給を継続。' }
          ],
          zh: [
            { highlight: '2001年 盖特林根 & 2011年 莫伊瑟尔维茨：', text: '从斯图加特市区全面外迁升级。莫伊瑟尔维茨发展成为弦槌与击弦机核心制造基地。' },
            { highlight: '2019年 施坦威战略并购：', text: '施坦威正式将雷诺纳入旗下，保持其100%独立运作，持续为全球所有顶级名琴制造商无差别供应德国原装高品质配件。' }
          ]
        },
        quote: {
          de: '„Wir freuen uns sehr, dass die Firma Renner jetzt zu unserer Firmengruppe gehört. Uns verbinden gleiche Werte und höchste Qualität. Renner arbeitet weiterhin vollkommen unabhängig für die weltweite Branche.“',
          en: '“We are delighted that Renner is part of our group. We share the same values and highest quality. Renner will continue to operate completely independently for the entire piano industry.”',
          ja: '「レンナー社が私たちのグループに加わったことを心から歓迎します。私たちは同じ価値観と最高品質を共有しています。レンナーは今後も全世界のピアノ業界に向けて完全に独立して事業を展開します。」',
          zh: '“我们非常欣喜雷诺加入施坦威集团。我们拥有深厚底蕴并共享对至臻品质的崇高追求。雷诺将继续保持完全独立，一如既往地服务于全球整个钢琴制造行业。”'
        },
        quoteAuthor: {
          de: 'Guido Zimmermann • President Steinway & Sons Hamburg (2019)',
          en: 'Guido Zimmermann • President Steinway & Sons Hamburg (2019)',
          ja: 'ギド・ツィンマーマン（スタインウェイ＆サンズ ハンブルク社長 2019年）',
          zh: '吉多·齐默尔曼 • 施坦威汉堡工厂总裁 (2019)'
        },
        image: 'Visuell/web_assets/renner-ga-okt-2018-scaled.jpg',
        imageTag: {
          de: 'Steinway & Meuselwitz',
          en: 'Steinway & Meuselwitz',
          ja: 'スタインウェイと新体制',
          zh: '施坦威与新发展'
        },
        imageCaption: {
          de: 'Standort Gärtringen vor der Bündelung aller Fertigungsbereiche am neuen Hauptsitz Meuselwitz',
          en: 'The Gärtringen facility prior to the full consolidation at the new Meuselwitz global headquarters',
          ja: 'モイゼルヴィッツ新本社への全面統合を前に木工を担ったゲルトリンゲン事業所',
          zh: '在2025/2026年全面整合迁往莫伊瑟尔维茨新总部前负责高精木工的盖特林根厂区'
        }
      }
    };
  }

  init() {
    this.bindEvents();
    this.renderEra(0);
  }

  bindEvents() {
    // Era nav buttons in header
    const eraBtns = document.querySelectorAll('.history-era-btn');
    eraBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eraIdx = parseInt(btn.getAttribute('data-era'), 10);
        this.goToEra(eraIdx);
      });
    });

    // Step buttons in left column
    const prevBtn = document.getElementById('history-prev-btn');
    const nextBtn = document.getElementById('history-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevEra());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextEra());
    }

    // Filmstrip thumbnails
    const thumbBtns = document.querySelectorAll('.filmstrip-thumb-btn');
    thumbBtns.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.getAttribute('data-src');
        const caption = thumb.getAttribute('data-caption');
        const tag = thumb.getAttribute('data-tag');
        this.selectPhoto(src, caption, tag, thumb);
      });
    });
  }

  goToEra(index) {
    if (index < 0 || index >= this.totalEras) return;
    this.currentEra = index;
    this.renderEra(index);
  }

  nextEra() {
    if (this.currentEra < this.totalEras - 1) {
      this.goToEra(this.currentEra + 1);
      return true;
    }
    return false; // Already at last era
  }

  prevEra() {
    if (this.currentEra > 0) {
      this.goToEra(this.currentEra - 1);
      return true;
    }
    return false; // Already at first era
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.renderEra(this.currentEra);
  }

  selectPhoto(src, caption, tag, activeThumbEl) {
    const featuredImg = document.getElementById('history-featured-img');
    const captionEl = document.getElementById('history-media-caption');
    const tagEl = document.getElementById('history-media-tag');

    if (featuredImg) {
      featuredImg.style.opacity = '0.4';
      setTimeout(() => {
        featuredImg.src = src;
        featuredImg.style.opacity = '1';
      }, 150);
    }

    if (captionEl && caption) captionEl.textContent = caption;
    if (tagEl && tag) tagEl.textContent = tag;

    // Update active state on thumb buttons
    document.querySelectorAll('.filmstrip-thumb-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    if (activeThumbEl) {
      activeThumbEl.classList.add('active');
    }
  }

  renderEra(index) {
    const data = this.erasData[index];
    if (!data) return;

    const lang = this.currentLang;

    // Update Era nav buttons
    document.querySelectorAll('.history-era-btn').forEach(btn => {
      const eraIdx = parseInt(btn.getAttribute('data-era'), 10);
      btn.classList.toggle('active', eraIdx === index);
      const labelEl = btn.querySelector('.era-label');
      if (labelEl && this.erasData[eraIdx]) {
        labelEl.textContent = this.erasData[eraIdx].label[lang] || this.erasData[eraIdx].label.de;
      }
    });

    // Update badge & heading
    const badgeText = document.getElementById('history-era-badge-text');
    if (badgeText) {
      badgeText.textContent = data.badge[lang] || data.badge.de;
    }

    const heading = document.getElementById('history-era-heading');
    if (heading) {
      heading.textContent = data.heading[lang] || data.heading.de;
    }

    const pDesc = document.getElementById('history-era-p');
    if (pDesc) {
      pDesc.textContent = data.description[lang] || data.description.de;
    }

    // Bullets
    const bulletsList = document.getElementById('history-bullets');
    if (bulletsList) {
      const bullets = data.bullets[lang] || data.bullets.de;
      bulletsList.innerHTML = bullets.map(b => `
        <li class="bullet-item">
          <span class="bullet-dot"></span>
          <div>
            <strong class="bullet-highlight">${b.highlight}</strong> ${b.text}
          </div>
        </li>
      `).join('');
    }

    // Quote
    const quoteText = document.getElementById('history-quote-text');
    const quoteAuthor = document.getElementById('history-quote-author');
    if (quoteText) {
      quoteText.textContent = data.quote[lang] || data.quote.de;
    }
    if (quoteAuthor) {
      quoteAuthor.textContent = data.quoteAuthor[lang] || data.quoteAuthor.de;
    }

    // Prev / Next button states & step indicator
    const prevBtn = document.getElementById('history-prev-btn');
    const nextBtn = document.getElementById('history-next-btn');
    const indicator = document.getElementById('history-step-indicator');

    if (prevBtn) {
      prevBtn.disabled = index === 0;
      prevBtn.textContent = lang === 'de' ? '← Vorherige Epoche' :
                           lang === 'en' ? '← Previous Epoch' :
                           lang === 'ja' ? '← 前の時代' : '← 上一纪元';
    }
    if (nextBtn) {
      nextBtn.disabled = index === this.totalEras - 1;
      nextBtn.textContent = lang === 'de' ? 'Nächste Epoche →' :
                           lang === 'en' ? 'Next Epoch →' :
                           lang === 'ja' ? '次の時代 →' : '下一纪元 →';
    }
    if (indicator) {
      const eraWord = lang === 'de' ? 'Epoche' : lang === 'en' ? 'Epoch' : lang === 'ja' ? '時代' : '纪元';
      indicator.textContent = `${index + 1} / ${this.totalEras} ${eraWord}`;
    }

    // Update image and caption
    const imageTagText = data.imageTag[lang] || data.imageTag.de;
    const imageCaptionText = data.imageCaption[lang] || data.imageCaption.de;

    const featuredImg = document.getElementById('history-featured-img');
    const captionEl = document.getElementById('history-media-caption');
    const tagEl = document.getElementById('history-media-tag');

    if (featuredImg) {
      featuredImg.style.opacity = '0.3';
      setTimeout(() => {
        featuredImg.src = data.image;
        featuredImg.style.opacity = '1';
      }, 150);
    }
    if (captionEl) captionEl.textContent = imageCaptionText;
    if (tagEl) tagEl.textContent = imageTagText;

    // Highlight corresponding thumb if exists
    document.querySelectorAll('.filmstrip-thumb-btn').forEach(thumb => {
      const src = thumb.getAttribute('data-src');
      thumb.classList.toggle('active', src === data.image);
    });
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.rennerHistory = new RennerHistoryJourney();
  window.rennerHistory.init();
});
