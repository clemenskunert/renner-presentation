/**
 * Louis Renner Meuselwitz Construction Animated Timelapse Engine (09.2025 - 10.2026)
 * Continuous scrubbing, multi-speed playback, Ken-Burns effect, multi-language data.
 */

class MeuselwitzTimelapse {
  constructor() {
    this.currentIndex = 0;
    this.isPlaying = false;
    this.playInterval = null;
    this.playbackSpeed = 1.0; // 0.5x, 1x, 2x, 5x
    this.baseIntervalMs = 1800; // ms per frame at 1x
    this.isKenBurnsActive = true;
    this.currentLang = 'de';

    // 26 Milestones from 09.2025 to 10.2026
    this.milestones = [
      {
        month: "09.2025",
        phase: { de: "Phase 1: Start Bauvorhaben", en: "Phase 1: Project Kickoff", ja: "第1フェーズ：建設開始", zh: "第一阶段：建设工程启动" },
        title: { de: "Start des Bauvorhabens & Bestandsaufnahme", en: "Project Start & Site Assessment", ja: "建設プロジェクト開始と現地調査", zh: "工程启动与现场勘测规划" },
        desc: { de: "Erste Begehung und Übergabe des Hallenkomplexes in Meuselwitz für die Zusammenlegung.", en: "Initial site handover and survey of the factory hall complex in Meuselwitz for consolidation.", ja: "拠点統合に向けたモイゼルヴィッツ工場棟の初期引き渡しと構造調査。", zh: "莫伊瑟尔维茨厂区交接与前期测绘，拉开双厂合并大幕。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/00_meuselwitz_bauvorhaben_start_2025.jpg"
      },
      {
        month: "11.2025",
        phase: { de: "Phase 1: Hallenvorbereitung", en: "Phase 1: Hall Preparation", ja: "第1フェーズ：工場棟整備", zh: "第一阶段：主车间整备" },
        title: { de: "Vorbereitung der großen Fertigungshalle", en: "Preparation of the Main Production Hall", ja: "メイン製造フロアの準備と清掃", zh: "主制造车间空间腾退与布局优化" },
        desc: { de: "Entkernung und Freilegung der tragenden Strukturen für neue Industrie-Layouts.", en: "Gutting and clearing of core structural lines for the new industrial production flow.", ja: "新たな製造ライン設計に合わせた内部解体と構造クリアランスの確保。", zh: "清理核心结构线，为雷诺高精生产线预留开阔空间。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/01_meuselwitz_werkshalle_vorbereitung.jpg"
      },
      {
        month: "12.2025",
        phase: { de: "Phase 2: Fundamentierung", en: "Phase 2: Foundations", ja: "第2フェーズ：基礎工事", zh: "第二阶段：重型地基浇筑" },
        title: { de: "Schwerlastböden & Fundamentierungsarbeiten", en: "Heavy-Duty Floor & Foundation Engineering", ja: "超重量級マシン用の高強度床・基礎工事", zh: "超重型设备专用地坪与减震基础施工" },
        desc: { de: "Spezielle Schwingungsentkopplung für tonnenschwere Hammerkopf-Pressen und CNC-Fräsen.", en: "Vibration-damped foundation slabs for metric-ton hammerhead presses and CNC mills.", ja: "トンの圧力をかけるハンマーヘッド熱成形プレス機とCNC用の免震基礎。", zh: "为吨级热压成型机与数控铣床定制高承重隔震地基。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/02_meuselwitz_bodenarbeiten_fundament.jpg"
      },
      {
        month: "02.2026",
        phase: { de: "Phase 2: Infrastruktur", en: "Phase 2: Infrastructure", ja: "第2フェーズ：インフラ整備", zh: "第二阶段：基础设施与恒温系统" },
        title: { de: "Klimasystem, Elektrik & Druckluftnetze", en: "Climate Control, Power & Pneumatics", ja: "空調恒温恒湿システムと配管・電気工事", zh: "恒温恒湿空调机组与高压气电管网" },
        desc: { de: "Einbau der hochpräzisen Klimatisierung (strikte 45–50 % Luftfeuchtigkeit für Tonholz und Filz).", en: "Installation of precision climate control (strict 45–50% humidity for acoustic tonewood and felt).", ja: "響木と羊毛フェルトの品質を完璧に維持する45〜50%恒温恒湿空調の導入。", zh: "引入严格控制在45-50%湿度的环境控制系统，确保木材与毛毡极高稳定性。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/03_meuselwitz_infrastruktur_elektrik_klima.jpg"
      },
      {
        month: "04.2026",
        phase: { de: "Phase 3: Umzugslogistik", en: "Phase 3: Relocation Logistics", ja: "第3フェーズ：移転ロジスティクス", zh: "第三阶段：设备搬迁物流规划" },
        title: { de: "Schwertransport-Logistik & Auslagerung Gärtringen", en: "Heavy Machinery Transport from Gärtringen", ja: "ゲルトリンゲン工場からの大型機械移送準備", zh: "盖特林根原厂重型精密机床启运筹备" },
        desc: { de: "Präzise Taktung der Spezialtransporte über 450 km von Baden-Württemberg nach Thüringen.", en: "Precision scheduling of convoy transports across 450 km from southwest to central Germany.", ja: "450kmの距離を超過積載許可車両で運搬する精密重機移送計画。", zh: "跨越450公里的精密机械护航车队组织与时序推演。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/04_meuselwitz_transport_schwertransport.jpg"
      },
      {
        month: "06.2026",
        phase: { de: "Phase 3: Anlieferung", en: "Phase 3: Arrival", ja: "第3フェーズ：機械搬入", zh: "第三阶段：首批设备到厂" },
        title: { de: "Ankunft der Schwertransporte in Meuselwitz", en: "Arrival of Machine Convoys in Meuselwitz", ja: "モイゼルヴィッツ工場への重機コンボイ到着", zh: "重载特种车队抵达莫伊瑟尔维茨新厂" },
        desc: { de: "Die ersten Kernmaschinen und Fertigungsstraßen erreichen das neue Hauptgelände.", en: "The primary manufacturing lines and custom presses arrive at the new facility gates.", ja: "レンナーを支える基幹機械群が新本社工場のゲートに次々と到着。", zh: "雷诺传奇机床与自动化线首批入驻新厂区大门。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/05_meuselwitz_anlieferung_maschinen.jpg"
      },
      {
        month: "06.2026",
        phase: { de: "Phase 3: Einbringung", en: "Phase 3: Rigging", ja: "第3フェーズ：工場内搬入", zh: "第三阶段：厂内重装就位" },
        title: { de: "Einbringung der Großanlagen in die Hallen", en: "Rigging & Heavy Equipment Placement", ja: "クレーンと装軌台車による館内精密搬入", zh: "重型吊装与坦克轮精密平移进厅" },
        desc: { de: "Spezialkräne und Schwerlast-Panzerrollen bugsieren die Maschinen auf die Positionen.", en: "Industrial cranes and air-skates maneuver the multi-ton equipment onto designated floor spots.", ja: "ミリ単位の精度で重機を所定位置へと運び込む熟練の吊り上げ作業。", zh: "工业吊臂与精密气垫搬运车将数吨设备精准送至基位。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/06_meuselwitz_einbringung_halle.jpg"
      },
      {
        month: "07.2026",
        phase: { de: "Phase 4: Maschinenaufstellung", en: "Phase 4: Installation", ja: "第4フェーズ：機械設置", zh: "第四阶段：机床地脚锚定" },
        title: { de: "Aufstellung & Fundamentverankerung", en: "Machinery Alignment & Ground Anchoring", ja: "フロアへの機械固定と基礎アンカー施工", zh: "激光水平校正与高抗拉地脚螺栓固化" },
        desc: { de: "Lasergestützte Nivellierung sorgt für vollkommen verzugsfreie Maschinenbetten.", en: "Laser leveling guarantees zero-torsion machine beds for extreme mechanical repeatability.", ja: "レーザー水平器による完全な平行度確保とねじれ防止のアンカー固定。", zh: "激光测量确保床身零扭曲，奠定微米级加工公差基础。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/07_meuselwitz_maschinenaufstellung_start.jpg"
      },
      {
        month: "07.2026",
        phase: { de: "Phase 4: Montage", en: "Phase 4: Assembly", ja: "第4フェーズ：ライン組み立て", zh: "第四阶段：高精组件拼装" },
        title: { de: "Montage der Spezial-Präzisionsanlagen", en: "Reassembly of Custom Precision Units", ja: "専用精密加工ユニットの再構築と接続", zh: "专用精密工装与自动化机械总装" },
        desc: { de: "Spezialwerkzeuge, Roboterführungen und Zuführungen werden millimetergenau zusammengefügt.", en: "Custom robotics, guides, and feed systems are reassembled with sub-millimeter precision.", ja: "ロボットガイドレールや特殊工具群のミリ単位での再組み立て。", zh: "机器人导轨与专用夹具按最高德系工程标准组装。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/08_meuselwitz_montage_praezisionsanlagen.jpg"
      },
      {
        month: "08.2026",
        phase: { de: "Phase 4: Justierung", en: "Phase 4: Calibration", ja: "第4フェーズ：精密校正", zh: "第四阶段：多轴精密标定" },
        title: { de: "Optische & Mechanische Achsenjustierung", en: "Optical & Mechanical Axis Calibration", ja: "光学・機械軸のアライメント精密校正", zh: "光学与机械多轴高精校准" },
        desc: { de: "Kalibrierung aller Führungen für maximale Repetiergenauigkeit und Oberflächengüte.", en: "Calibration of all travel axes for maximum repeat accuracy and superior surface finishes.", ja: "反復精度と極上の切削面を実現するための全軸キャリブレーション。", zh: "校准全部运动轴向，确保机械动作极其细腻一致。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/09_meuselwitz_maschinen_justierung.jpg"
      },
      {
        month: "08.2026",
        phase: { de: "Phase 5: Mechanikmontage", en: "Phase 5: Action Assembly", ja: "第5フェーズ：アクション組立", zh: "第五阶段：击弦机装配区设立" },
        title: { de: "Montagebereich für Klaviermechaniken", en: "Grand Piano Action Assembly Area", ja: "グランドピアノ・アクション組立セクション", zh: "三角钢琴高端击弦机装配区" },
        desc: { de: "Ergonomische Arbeitsplätze mit modernster Prüftechnik für 88-Tasten-Mechaniken.", en: "Ergonomic master benches equipped with advanced test fixtures for 88-note piano actions.", ja: "88鍵アクションの最終調律と組み立てを行うエルゴノミクス作業台。", zh: "为88键全套击弦机装调配备人体工学与现代质检工作台。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/10_meuselwitz_montagebereich_mechanik.jpg"
      },
      {
        month: "08.2026",
        phase: { de: "Phase 5: Holzverarbeitung", en: "Phase 5: Wood Processing", ja: "第5フェーズ：木工加工", zh: "第五阶段：音响木材精加工" },
        title: { de: "Aufbau der Tonholz-Frässtationen", en: "Tonewood Milling Stations Installation", ja: "トーンウッド（響木）専用フライス加工ライン", zh: "白桦木与胡桃木核心数控铣削站" },
        desc: { de: "Hochpräzise Fräsmaschinen für Hammerkerne, Kapseln und Mechanikschenkel.", en: "High-precision milling machines dedicated to hammer cores, flanges, and shanks.", ja: "ハンマーウッドコア、フレンジ、シャンクを削り出す高精度切削ステーション。", zh: "针对弦槌芯木、轴架与槌柄的高速微米级铣削站。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/11_meuselwitz_holzverarbeitung_anlagen.jpg"
      },
      {
        month: "08.2026",
        phase: { de: "Phase 5: Hammerkopf-Pressen", en: "Phase 5: Hammer Presses", ja: "第5フェーズ：熱成形プレス", zh: "第五阶段：弦槌高温热压机区" },
        title: { de: "Installation der Hammerkopf-Heißpressen", en: "Installation of Hammerhead Hot-Press Lines", ja: "ハンマーヘッド高圧熱成形プレスの設置", zh: "雷诺核心高压热固化成形压机区" },
        desc: { de: "Die legendären Renner-Pressbänke werden mit moderner Temperatur- und Drucksensorik verbunden.", en: "Renner's legendary hot-press benches fitted with upgraded digital pressure & heat telemetry.", ja: "デジタル温調・圧力センサーを備えた伝統のレンナー熱プレス群。", zh: "经典雷诺加压机台与数字化温控传感器全面接轨。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/12_meuselwitz_hammerkopf_pressen_bereich.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 6: Rohstofflager", en: "Phase 6: Materials Storage", ja: "第6フェーズ：資材保管", zh: "第六阶段：恒温原料仓" },
        title: { de: "Vollklimatisierte Holzlager & FFW-Filzlager", en: "Climate-Controlled Tonewood & FFW Felt Vaults", ja: "恒温恒湿木材倉庫とFFW特選フェルト保管室", zh: "恒温恒湿音木仓与FFW伍尔岑毛毡库" },
        desc: { de: "Mehrjährige Ruhezeiten des Holzes bei exakt überwachter Feuchte und schonender Belüftung.", en: "Multi-year wood resting cycles maintained under strictly automated atmospheric controls.", ja: "自動調湿管理下で何年も休ませ熟成される最高級木材と純毛フェルト。", zh: "多年自然陈化木材与德国老牌FFW纯羊毛毡在理想气候下储存。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/13_meuselwitz_klimatisierte_lagerraeume.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 6: CNC-Zentrum", en: "Phase 6: CNC Center", ja: "第6フェーズ：CNCセンター", zh: "第六阶段：数控精密加工岛" },
        title: { de: "CNC-Fertigungszentrum für Leistenkonditionierung", en: "CNC Machining Center for Hammer Bars", ja: "ハンマーヘッドバー・CNC精密加工センター", zh: "弦槌整条CNC加工与精密成形岛" },
        desc: { de: "Diamant-Trennschnitt-Anlagen und Mehrachsen-Fräszentren für individuelle Formen.", en: "Diamond-tipped slicing saws and multi-axis machining centers for custom hammer designs.", ja: "ダイヤモンド精密ブレードと多軸CNCによる個別ハンマーヘッドの分割・成形。", zh: "金刚石切削刃与多轴数控联动，实现定制弦槌快速精准切割。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/14_meuselwitz_cnc_fertigungsbereich.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 6: Qualitätskontrolle", en: "Phase 6: Quality Control", ja: "第6フェーズ：品質管理", zh: "第六阶段：光电全检质控站" },
        title: { de: "Optoelektronischer Qualitätsprüfplatz", en: "Optoelectronic Quality Inspection Station", ja: "光電子・デジタル自動品質検査ステーション", zh: "光电多维智能公差检测站" },
        desc: { de: "3D-Messoptik prüft Bohrungsabstände, Winkel und Gewichte jedes einzelnen Hammerkopfs.", en: "3D optical scanning verifies bore coordinates, angles, and weight profiles for every piece.", ja: "3Dスキャンにより全数穴あけ角・寸法・重量プロファイルを自動検証。", zh: "三维光学扫描全面复核打孔倾角、克重及各段几何尺寸。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/15_meuselwitz_qualitaetspruefplatz.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 6: Arbeitsplätze", en: "Phase 6: Workstations", ja: "第6フェーズ：ワークステーション", zh: "第六阶段：技师专业工位" },
        title: { de: "Einrichtung der Meisterarbeitsplätze", en: "Master Craftsmen Workstation Outfitting", ja: "ピアノマイスター専用クラフトマンデスクの配置", zh: "德国高级技师独立调装工位" },
        desc: { de: "Traditionelle Handwerkskunst trifft auf State-of-the-Art Ergonomie und Beleuchtung.", en: "Centuries-old German piano craftsmanship meets cutting-edge ergonomic engineering.", ja: "140年の伝統手工業と最先端の人間工学・照明技術の融合。", zh: "百年手作温度与人体工学光照系统在全新工位完美融合。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/16_meuselwitz_montagetische_einrichtung.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 6: Umwelt & Luft", en: "Phase 6: Environmental", ja: "第6フェーズ：環境設備", zh: "第六阶段：吸尘与照明系统" },
        title: { de: "Zentrale Absaugung & Tageslicht-LED-System", en: "Central Dust Extraction & CRI 98+ Daylight LEDs", ja: "中央集塵システムと自然光LEDライティング", zh: "中央负压防尘与高显色自然光照明" },
        desc: { de: "Staubfreie Werkshalle und reflexionsfreie Beleuchtung für ermüdungsfreie Präzisionsarbeit.", en: "Dust-free clean factory atmosphere and true-color lighting for flawless finishing.", ja: "粉塵を徹底除去し自然光に近い環境でミクロの狂いも見逃さない環境づくり。", zh: "零粉尘回流与98+显色指数自然光，助力大师极致微观装配。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/17_meuselwitz_neue_beleuchtung_absaugung.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 7: Gesamtanlage", en: "Phase 7: Integrated Line", ja: "第7フェーズ：総合統合", zh: "第七阶段：流水线全面合龙" },
        title: { de: "Vernetzung der Gesamt-Produktionslinie", en: "Fully Integrated Production Flow Commissioning", ja: "全製造ラインの統合デジタルネットワーク化", zh: "全工序数字协同线全面贯通" },
        desc: { de: "Vom Rohholzzuschnitt bis zum fertigen Yamaha-Kit: Kürzeste Wege und maximale Effizienz.", en: "From raw lumber to the finished Yamaha Kit: shortest material paths and highest efficiency.", ja: "原木加工から完成版ヤマハキットまで、最短動線と最高効率を実現。", zh: "从原木初切到雅马哈套件总成，工艺链路实现极致短距高效闭环。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/18_meuselwitz_produktionslinie_aufbau.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 7: Probeläufe", en: "Phase 7: Trial Runs", ja: "第7フェーズ：試運転", zh: "第七阶段：实况试运行与标定" },
        title: { de: "Maschinentestläufe & Feinkalibrierungen", en: "Full-Speed Machine Test Runs & Validations", ja: "全設備の実負荷テスト運転と最終キャリブレーション", zh: "全速载荷试运行与批次一致性验证" },
        desc: { de: "Erste Vorserien-Hammerköpfe durchlaufen die neue Roboter-Schneid- und Leimstation.", en: "First pilot runs of hammerheads processed through the new robotic cutting & press cells.", ja: "新設ロボット裁断と熱プレス機によるパイロット版ハンマーの試作・試験。", zh: "首批试验批次弦槌通过机器人裁断与压合单元，力学指标超预期。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/19_meuselwitz_testlaeufe_maschinen.jpg"
      },
      {
        month: "09.2026",
        phase: { de: "Phase 7: Hallenabnahme", en: "Phase 7: Ready for Launch", ja: "第7フェーズ：引き渡し完了", zh: "第七阶段：主工厂验收就绪" },
        title: { de: "Fertigungshalle in vollem Glanz bereit", en: "State-of-the-Art Factory Floor Complete", ja: "完成した新世代モイゼルヴィッツ工場の全貌", zh: "全新现代化莫伊瑟尔维茨总厂全景落成" },
        desc: { de: "Helle, saubere und vollklimatisierte Industriehalle – bereit für den Produktionsstart.", en: "Bright, pristine, climate-stabilized production hall ready for full manufacturing launch.", ja: "明るく清潔で完全空調された、未来を切り拓くレンナー新拠点。", zh: "通透、洁净、恒温恒湿，全球钢琴击弦机新标杆生产基地正式整装待发。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/20_meuselwitz_fertigungshalle_gesamtansicht.jpg"
      },
      {
        month: "10.2026",
        phase: { de: "Phase 8: Erstproduktion", en: "Phase 8: First Batches", ja: "第8フェーズ：初期ロット完成", zh: "第八阶段：首批量产下线" },
        title: { de: "Erste Serienfertigung von Klaviermechaniken", en: "First Mass-Production Actions Completed", ja: "新工場製グランドピアノ・アクションの第1号ロット完成", zh: "新总部首批量产三角钢琴击弦机顺利下线" },
        desc: { de: "Perfektes Spielgefühl und makellose Toleranzen bestätigen den Erfolg der Modernisierung.", en: "Flawless repetition and micro-tolerances validate the resounding success of the facility move.", ja: "卓越したタッチ感と完璧な寸法精度が移転プロジェクトの完全な成功を証明。", zh: "丝滑如一的触键反馈与严苛公差证明了现代化工厂整合的巨大成功。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/21_meuselwitz_fertige_mechanikmontage.jpg"
      },
      {
        month: "10.2026",
        phase: { de: "Phase 8: Das Team", en: "Phase 8: The Renner Team", ja: "第8フェーズ：新生チーム", zh: "第八阶段：融合精英团队" },
        title: { de: "Vereintes Know-how: Das Renner-Team in Meuselwitz", en: "United Expertise: The Renner Team in Meuselwitz", ja: "伝統の技を結集したレンナー・マイスターチーム", zh: "聚势合流：雷诺新总部全体精英工匠" },
        desc: { de: "Erfahrene Klavierbauspezialisten beider bisheriger Standorte arbeiten nun gemeinsam.", en: "Master technicians and engineers from both prior factories now united under one roof.", ja: "ゲルトリンゲンとモイゼルヴィッツの熟練ピアノ技術者が一つに結集。", zh: "原两座基地的资深钢琴制作专家齐聚新总部，合力书写传奇。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/22_meuselwitz_neuer_hauptsitz_team_arbeit.jpg"
      },
      {
        month: "10.2026",
        phase: { de: "Phase 8: Vollbetrieb", en: "Phase 8: Full Production", ja: "第8フェーズ：全面稼働", zh: "第八阶段：全线全面达产" },
        title: { de: "Präzisionsfertigung im vollen Regelbetrieb", en: "Precision Manufacturing in Full Swing", ja: "フル稼働を迎えた世界最高峰の精密製造ライン", zh: "世界顶级击弦机与弦槌生产全面进入常规高负荷运转" },
        desc: { de: "Tägliche Produktion von weltberühmten Konzertmechaniken und dem neuen Yamaha-Kit.", en: "Daily crafting of world-renowned concert actions and the groundbreaking Yamaha Kit series.", ja: "世界各国のコンサートグランド向けアクションと革新的ヤマハキットの本格量産。", zh: "源源不断向全球顶级音乐厅与音乐家供应雷诺传奇产品及全新雅马哈套件。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/23_meuselwitz_praezisionsfertigung_in_betrieb.jpg"
      },
      {
        month: "10.2026",
        phase: { de: "Phase 8: Neuer Hauptsitz", en: "Phase 8: Global HQ", ja: "第8フェーズ：グローバル新本社", zh: "第八阶段：全球新旗舰总部" },
        title: { de: "Der neue globale Hauptsitz Meuselwitz", en: "The New Global Headquarters Meuselwitz", ja: "ルイス・レンナー社 新グローバル本社（モイゼルヴィッツ）", zh: "德国雷诺全球新总部——莫伊瑟尔维茨" },
        desc: { de: "Moderne Industriearchitektur und über 140 Jahre Tradition unter einem gemeinsamen Dach.", en: "Modern architectural efficiency merged with over 140 years of uncompromised German pedigree.", ja: "140年を超えるドイツ工芸の誇りと現代産業建築が高次元で融合。", zh: "当代精益制造理念与140余年德系弦槌泰斗地位的恢弘交融。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/24_meuselwitz_moderner_hauptsitz_aussen_innen.jpg"
      },
      {
        month: "10.2026",
        phase: { de: "Phase 8: Zukunft", en: "Phase 8: The Future", ja: "第8フェーズ：未来への展望", zh: "第八阶段：奔向百年新纪元" },
        title: { de: "Zukunft & Innovation: Louis Renner GmbH", en: "Future & Innovation: Louis Renner GmbH", ja: "未来と革新：ルイス・レンナーの新たな百年", zh: "创新与未来：德国雷诺谱写全新篇章" },
        desc: { de: "Für die besten Klaviere der Welt: Höchste Präzision, Zuverlässigkeit und Klangkultur.", en: "Dedicated to the world's finest pianos: maximum precision, stability, and acoustic culture.", ja: "世界最高峰のピアノのために：究極の精度、安定性、そして豊かな音楽文化の継承。", zh: "为全世界顶尖钢琴打造：不可替代的极高精度、机械耐久度与崇高音响艺术。" },
        file: "Visuell/Bilder/02_Meuselwitz_Umbau/25_meuselwitz_zukunft_renner_meuselwitz.jpg"
      }
    ];
  }

  init() {
    this.stageImg = document.getElementById('timelapse-main-img');
    this.scrubber = document.getElementById('timelapse-scrubber');
    this.playBtn = document.getElementById('timelapse-play-btn');
    this.dateBadge = document.getElementById('timelapse-date-badge');
    this.phaseBadge = document.getElementById('timelapse-phase-badge');
    this.titleEl = document.getElementById('timelapse-title-text');
    this.descEl = document.getElementById('timelapse-desc-text');
    this.counterEl = document.getElementById('timelapse-counter-tag');

    if (!this.stageImg || !this.scrubber) return;

    this.scrubber.max = this.milestones.length - 1;
    this.scrubber.value = 0;

    // Attach event listeners
    this.scrubber.addEventListener('input', (e) => {
      this.pause();
      this.goToIndex(parseInt(e.target.value, 10));
    });

    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Speed buttons
    document.querySelectorAll('.timelapse-speed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const spd = parseFloat(e.target.getAttribute('data-speed'));
        this.setSpeed(spd);
      });
    });

    // Ken-Burns toggle
    const kbBtn = document.getElementById('timelapse-kb-btn');
    if (kbBtn) {
      kbBtn.addEventListener('click', () => {
        this.isKenBurnsActive = !this.isKenBurnsActive;
        kbBtn.classList.toggle('active', this.isKenBurnsActive);
        if (this.stageImg) {
          this.stageImg.classList.toggle('ken-burns', this.isKenBurnsActive);
        }
      });
    }

    // Milestone tick buttons
    document.querySelectorAll('.milestone-tick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        this.pause();
        this.goToIndex(idx);
      });
    });

    // Initial render
    this.goToIndex(0);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.updateUI();
  }

  goToIndex(index) {
    if (index < 0 || index >= this.milestones.length) return;
    this.currentIndex = index;

    if (this.scrubber) this.scrubber.value = index;

    const item = this.milestones[index];
    if (this.stageImg && item) {
      // Soft crossfade
      this.stageImg.style.opacity = '0.2';
      setTimeout(() => {
        this.stageImg.src = item.file;
        this.stageImg.style.opacity = '1';
        if (this.isKenBurnsActive) {
          this.stageImg.classList.remove('ken-burns');
          void this.stageImg.offsetWidth; // trigger reflow
          this.stageImg.classList.add('ken-burns');
        }
      }, 80);
    }

    this.updateUI();

    // Sync gallery thumbs if on screen
    document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
      if (i === index) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Sync milestone ticks
    document.querySelectorAll('.milestone-tick-btn').forEach(btn => {
      const bIdx = parseInt(btn.getAttribute('data-index'), 10);
      btn.classList.toggle('active', Math.abs(bIdx - index) <= 1);
    });
  }

  updateUI() {
    const item = this.milestones[this.currentIndex];
    if (!item) return;

    const lang = this.currentLang;

    if (this.dateBadge) {
      this.dateBadge.innerHTML = `📅 <span>${item.month}</span>`;
    }
    if (this.phaseBadge) {
      this.phaseBadge.textContent = item.phase[lang] || item.phase.de;
    }
    if (this.titleEl) {
      this.titleEl.textContent = item.title[lang] || item.title.de;
    }
    if (this.descEl) {
      this.descEl.textContent = item.desc[lang] || item.desc.de;
    }
    if (this.counterEl) {
      this.counterEl.textContent = `${this.currentIndex + 1} / ${this.milestones.length}`;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.playBtn) {
      this.playBtn.innerHTML = `⏸ <span data-i18n="pause_animation">Pause</span>`;
      this.playBtn.style.background = '#a83232';
    }

    if (this.currentIndex >= this.milestones.length - 1) {
      this.goToIndex(0);
    }

    const interval = Math.max(350, Math.round(this.baseIntervalMs / this.playbackSpeed));

    if (this.playInterval) clearInterval(this.playInterval);
    this.playInterval = setInterval(() => {
      if (this.currentIndex < this.milestones.length - 1) {
        this.goToIndex(this.currentIndex + 1);
      } else {
        this.pause();
      }
    }, interval);
  }

  pause() {
    this.isPlaying = false;
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
    if (this.playBtn) {
      this.playBtn.innerHTML = `▶ <span data-i18n="play_animation">Animation starten</span>`;
      this.playBtn.style.background = 'var(--renner-green)';
    }
  }

  setSpeed(speed) {
    this.playbackSpeed = speed;
    document.querySelectorAll('.timelapse-speed-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.getAttribute('data-speed')) === speed);
    });
    if (this.isPlaying) {
      this.play(); // restart interval with new speed
    }
  }
}

// Global instance
window.meuselwitzTimelapse = new MeuselwitzTimelapse();
