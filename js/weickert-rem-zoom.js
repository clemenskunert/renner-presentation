/**
 * Louis Renner Masterclass Presentation
 * Slide 12 (Chapter 3): Interactive STFI Scanning Electron Microscope (REM) Zoom Viewer
 * - "Weickert Special" Merino Wool Felt Microstructure (STFI Prüfbericht P2024 0903, M. Kermer)
 * - 1x Overview: REM_Filz.png (STFI Mik59_24 Aufnahme 5, HFW = 4.14 mm, Scale = 1 mm) -> 56 % Fulling Density
 * - 10x Fiber Detail: REM_FilzDetail.png (STFI Mik59_24 Aufnahme 1, HFW = 414 µm, Scale = 100 µm) -> Cuticle & Lanolin
 * - Up to 25x Deep Cuticle Zoom with Drag-to-Pan, Mouse-Wheel Zoom, Smooth Animated Transitions & Live 10x Loupe
 * - Optional Macro View: Batch-coded Weickert Special Top-Felt Strips (W 1512 K)
 * - Full 4-Language Localization (DE, EN, JA, ZH) + Desktop Mouse & iPad Touch Support
 */

(function () {
  'use strict';

  const LOG_MAX = Math.log(25); // Continuous logarithmic zoom slider mapping 0..1000 -> 1x..25x

  const DYNAMIC_I18N = {
    de: {
      hfwMm: (v) => `Bildfeld ${v.toFixed(2).replace('.', ',')} mm`,
      hfwUm: (v) => `Bildfeld ${Math.round(v)} µm`,
      zoomFmt: (z) => `${z < 10 ? z.toFixed(1).replace('.', ',') : Math.round(z)}× REM`,
      macroBadge: 'MAKRO • W 1512 K',
      scaleLbl: (txt) => `Maßstab: ${txt}`,
      loupeTag: '10× • 100 µm',
      hint1xLoupe: 'Maus bewegen für 10× Live-Lupe • Klicken oder Mausrad für Zoom',
      hint1xPlain: 'Klicken oder Mausrad zum Hineinzoomen (1× → 25×)',
      hintZoomed: 'Ziehen zum Verschieben • Mausrad / Regler für 1×–25× Zoom',
      hint10x: 'Klicken für 22× Schuppen-Zoom • Mausrad für stufenlosen Zoom',
      hintMacro: 'Chargencodierte Weickert-Special-Deckfilzstreifen (W 1512 K)',
      cap1x: 'REM-Übersicht (STFI Mik59_24 • 1 mm): Hochverdichteter 3D-Faserverbund mit 56 % maximaler Verwalkdichte.',
      cap10x: 'REM-Detail 10× (STFI Mik59_24 • 100 µm): Merinofasern mit intakter Schuppenschicht und +38 % höherem Restfettanteil (0,36 %).',
      cap22x: 'REM-Tiefenzoom (>18×): Dachziegelartige Epicuticula-Schuppen und lanolingeschütztes Keratin sichern Traktion & Klimastabilität.',
      capMacro: 'Makro-Ansicht: Zugeschnittene und chargencodierte Weickert-Special-Deckfilzstreifen vor dem Verpressen.'
    },
    en: {
      hfwMm: (v) => `Field ${v.toFixed(2)} mm`,
      hfwUm: (v) => `Field ${Math.round(v)} µm`,
      zoomFmt: (z) => `${z < 10 ? z.toFixed(1) : Math.round(z)}× SEM`,
      macroBadge: 'MACRO • W 1512 K',
      scaleLbl: (txt) => `Scale: ${txt}`,
      loupeTag: '10× • 100 µm',
      hint1xLoupe: 'Move cursor for 10× live loupe • Click or scroll to zoom',
      hint1xPlain: 'Click or scroll wheel to zoom in (1× → 25×)',
      hintZoomed: 'Drag to pan • Scroll wheel or slider for 1×–25× zoom',
      hint10x: 'Click for 22× cuticle zoom • Scroll for continuous zoom',
      hintMacro: 'Batch-coded Weickert Special top-felt strips (W 1512 K)',
      cap1x: 'SEM Overview (STFI Mik59_24 • 1 mm): Ultra-dense 3D fiber interlock with 56% maximum fulling density.',
      cap10x: 'SEM Detail 10× (STFI Mik59_24 • 100 µm): Merino fibers with intact cuticle scales and +38% higher residual wool grease (0.36%).',
      cap22x: 'SEM Deep Zoom (>18×): Overlapping epicuticle scales and lanolin-protected keratin ensure fiber traction & climate stability.',
      capMacro: 'Macro View: Cut and batch-coded Weickert Special top-felt strips prior to hammerhead pressing.'
    },
    ja: {
      hfwMm: (v) => `視野幅 ${v.toFixed(2)} mm`,
      hfwUm: (v) => `視野幅 ${Math.round(v)} µm`,
      zoomFmt: (z) => `${z < 10 ? z.toFixed(1) : Math.round(z)}× SEM`,
      macroBadge: 'マクロ • W 1512 K',
      scaleLbl: (txt) => `スケール: ${txt}`,
      loupeTag: '10× • 100 µm',
      hint1xLoupe: 'マウス移動で10倍ルーペ • クリック／ホイールで拡大',
      hint1xPlain: 'クリックまたはホイールで拡大 (1× → 25×)',
      hintZoomed: 'ドラッグで移動 • ホイール／スライダーで 1×–25× 拡大',
      hint10x: 'クリックで22倍キューティクル拡大 • ホイールで連続ズーム',
      hintMacro: 'ロット印字されたヴァイケルト・スペシャルのトップフェルト帯 (W 1512 K)',
      cap1x: 'SEM全体像 (STFI Mik59_24 • 1 mm)：最大縮絨密度56%を誇る高密度3次元メリノ繊維ネットワーク。',
      cap10x: 'SEM拡大 10× (STFI Mik59_24 • 100 µm)：健全な鱗状表皮と+38%高い残留羊毛脂（0.36%）を保持した繊維表面。',
      cap22x: 'SEM超拡大 (>18×)：鱗状のエピキューティクルとラノリン保護層が高い繊維牽引力と耐湿安定性を実現。',
      capMacro: 'マクロ表示：プレス工程前に裁断・ロット印字されたヴァイケルト・スペシャルのトップフェルト帯。'
    },
    zh: {
      hfwMm: (v) => `视野宽 ${v.toFixed(2)} mm`,
      hfwUm: (v) => `视野宽 ${Math.round(v)} µm`,
      zoomFmt: (z) => `${z < 10 ? z.toFixed(1) : Math.round(z)}× 电镜`,
      macroBadge: '宏观 • W 1512 K',
      scaleLbl: (txt) => `标尺: ${txt}`,
      loupeTag: '10× • 100 µm',
      hint1xLoupe: '移动光标查看10×实时放大镜 • 点击或滚轮缩放',
      hint1xPlain: '点击画面或滚动滚轮无级放大 (1× → 25×)',
      hintZoomed: '拖拽平移画面 • 滚轮或滑块无级缩放 1×–25×',
      hint10x: '点击放大至22×鳞片细节 • 滚轮连续缩放',
      hintMacro: '已分切并喷印批次编码的 Weickert Special 面毡条 (W 1512 K)',
      cap1x: '电镜全景 (STFI Mik59_24 • 1 mm)：高达 56% 最大缩绒密度的三维紧密交织美利奴羊毛网络。',
      cap10x: '电镜细节 10× (STFI Mik59_24 • 100 µm)：鳞片层完整且保留 +38% 更高残脂率（0.36%）的单根羊毛纤维。',
      cap22x: '电镜深层放大 (>18×)：覆瓦状表皮鳞片与羊毛脂保护膜赋予毛毡卓越牵引力与耐湿稳定性。',
      capMacro: '宏观视图：热压成型前已完成分切与批次编码的 Weickert Special 专属面毡条。'
    }
  };

  function getLang() {
    const l = (document.documentElement.lang || (window.presentation && window.presentation.currentLang) || 'de').slice(0, 2).toLowerCase();
    return DYNAMIC_I18N[l] ? l : 'de';
  }

  function zoomToSlider(z) {
    const clamped = Math.max(1, Math.min(25, z));
    return Math.round((Math.log(clamped) / LOG_MAX) * 1000);
  }

  function sliderToZoom(val) {
    const t = Math.max(0, Math.min(1000, Number(val) || 0)) / 1000;
    return Math.exp(t * LOG_MAX);
  }

  function initWeickertRemViewer() {
    const slide = document.querySelector('.slide.s12-rem-slide');
    if (!slide || slide._remViewerInitialized) return;
    slide._remViewerInitialized = true;

    const stage = slide.querySelector('[data-s12-stage]');
    const canvasWrap = slide.querySelector('[data-s12-canvas]');
    const imgOverview = slide.querySelector('[data-s12-img="overview"]');
    const imgDetail = slide.querySelector('[data-s12-img="detail"]');
    const imgMacro = slide.querySelector('[data-s12-img="macro"]');
    const reticle = slide.querySelector('[data-s12-reticle]');
    const loupe = slide.querySelector('[data-s12-loupe]');
    const loupeImg = slide.querySelector('[data-s12-loupe-img]');
    const loupeTag = slide.querySelector('[data-s12-loupe-tag]');
    const slider = slide.querySelector('[data-s12-slider]');
    const zoomBadge = slide.querySelector('[data-s12-zoom-badge]');
    const hfwBadge = slide.querySelector('[data-s12-hfw-badge]');
    const dynScaleWrap = slide.querySelector('[data-s12-dyn-scale]');
    const dynScaleBar = slide.querySelector('[data-s12-dyn-bar]');
    const dynScaleLbl = slide.querySelector('[data-s12-dyn-lbl]');
    const hintEl = slide.querySelector('[data-s12-hint]');
    const captionEl = slide.querySelector('[data-s12-caption]');
    const loupeBtn = slide.querySelector('[data-s12-loupe-toggle]');
    const zoomOutBtn = slide.querySelector('[data-s12-step="-1"]');
    const zoomInBtn = slide.querySelector('[data-s12-step="1"]');
    const resetBtn = slide.querySelector('[data-s12-reset]');
    const presetBtns = Array.from(slide.querySelectorAll('[data-s12-preset]'));
    const leftCards = Array.from(slide.querySelectorAll('[data-s12-focus]'));

    if (!stage || !canvasWrap || !imgOverview || !imgDetail) return;

    const state = {
      mode: 'rem',       // 'rem' | 'macro'
      zoom: 1.0,         // 1.0 .. 25.0
      panX: 0,           // normalized -0.5 .. +0.5 of stage width
      panY: 0,           // normalized -0.5 .. +0.5 of stage height
      loupeEnabled: true,
      loupeVisible: false,
      pointerNormX: 0.52,
      pointerNormY: 0.46,
      isDragging: false,
      dragMoved: false,
      dragStartX: 0,
      dragStartY: 0,
      dragOriginPanX: 0,
      dragOriginPanY: 0,
      animFrame: null
    };

    function cancelAnim() {
      if (state.animFrame) {
        cancelAnimationFrame(state.animFrame);
        state.animFrame = null;
      }
    }

    function getEffectiveScaleForCurrentLayer(z) {
      // Layer 1 (overview) scales from 1x up to 10x; Layer 2 (detail, native 10x) scales from 1.0x at z=10 up to 2.5x at z=25
      if (z < 6.2) {
        return z;
      }
      if (z >= 10) {
        return z / 10;
      }
      // Transition zone 6.2x .. 10x: smooth handoff to 1.0x detail frame
      const t = (z - 6.2) / (10 - 6.2);
      return 1 + (1 - t) * 0.35;
    }

    function clampPan() {
      if (state.mode === 'macro') {
        state.panX = 0;
        state.panY = 0;
        return;
      }
      let activeScale = 1;
      if (state.zoom < 8.5) {
        activeScale = state.zoom;
      } else if (state.zoom > 10.02) {
        activeScale = state.zoom / 10;
      } else {
        activeScale = 1;
      }
      if (activeScale <= 1.02) {
        state.panX = 0;
        state.panY = 0;
        return;
      }
      const maxOffset = Math.min(0.42, (activeScale - 1) / (2 * activeScale));
      state.panX = Math.max(-maxOffset, Math.min(maxOffset, state.panX));
      state.panY = Math.max(-maxOffset, Math.min(maxOffset, state.panY));
    }

    function updateDynamicScaleBar(tDict, hfwMm, stageWidthPx, stageHeightPx) {
      if (!dynScaleWrap || !dynScaleBar || !dynScaleLbl) return;
      if (state.mode === 'macro') {
        dynScaleWrap.classList.add('is-hidden');
        return;
      }

      const isNativeUncropped =
        state.mode === 'rem' &&
        ((Math.abs(state.zoom - 1) < 0.04) || (Math.abs(state.zoom - 10) < 0.18)) &&
        Math.abs(state.panX) < 0.01 &&
        Math.abs(state.panY) < 0.01;

      dynScaleWrap.classList.toggle('is-subtle', isNativeUncropped);
      dynScaleWrap.classList.remove('is-hidden');

      // Because REM PNGs (842x596) use object-fit: contain, calibrate directly to the rendered micrograph width!
      const renderedImgW = Math.min(stageWidthPx, stageHeightPx * (842 / 596));
      const hfwUm = hfwMm * 1000;
      const candidatesUm = [1000, 500, 200, 100, 50, 25];
      let chosenUm = 100;
      for (const c of candidatesUm) {
        const px = (c / hfwUm) * renderedImgW;
        if (px >= 68 && px <= 225) {
          chosenUm = c;
          break;
        }
      }
      const barPx = Math.max(44, Math.min(230, Math.round((chosenUm / hfwUm) * renderedImgW)));
      dynScaleBar.style.width = `${barPx}px`;
      const unitStr = chosenUm >= 1000 ? `${chosenUm / 1000} mm` : `${chosenUm} µm`;
      dynScaleLbl.textContent = tDict.scaleLbl(unitStr);
    }

    function updateLoupeDOM(tDict) {
      if (!loupe || !loupeImg) return;
      const show =
        state.mode === 'rem' &&
        state.loupeEnabled &&
        state.loupeVisible &&
        state.zoom <= 1.35 &&
        !state.isDragging;

      loupe.classList.toggle('is-visible', show);
      if (loupeTag) loupeTag.textContent = tDict.loupeTag;
      if (!show) return;

      const rect = stage.getBoundingClientRect();
      const scaleFactor = window.__presentationScale || 1;
      const stageW = rect.width / scaleFactor || stage.clientWidth || 900;
      const stageH = rect.height / scaleFactor || stage.clientHeight || 620;

      // Keep loupe within stage bounds (avoid covering bottom STFI bar when possible)
      const nx = Math.max(0.11, Math.min(0.89, state.pointerNormX));
      const ny = Math.max(0.13, Math.min(0.84, state.pointerNormY));

      loupe.style.left = `${(nx * stageW).toFixed(1)}px`;
      loupe.style.top = `${(ny * stageH).toFixed(1)}px`;

      // Map pointer across the 100 µm REM_FilzDetail micrograph (excluding bottom 9% STFI bar so loupe shows pure wool fibers!)
      const imgSpanW = 540;
      const imgSpanH = 382;
      const loupeSize = 204;
      const offsetX = -(nx * (imgSpanW - loupeSize));
      const offsetY = -(ny * (imgSpanH * 0.90 - loupeSize));
      loupeImg.style.width = `${imgSpanW}px`;
      loupeImg.style.height = `${imgSpanH}px`;
      loupeImg.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
    }

    function render() {
      const lang = getLang();
      const tDict = DYNAMIC_I18N[lang];
      clampPan();

      const rect = stage.getBoundingClientRect();
      const scaleFactor = window.__presentationScale || 1;
      const stageW = rect.width / scaleFactor || stage.clientWidth || 900;
      const stageH = rect.height / scaleFactor || stage.clientHeight || 620;

      if (state.mode === 'macro') {
        stage.setAttribute('data-rem-state', 'macro');
        if (imgMacro) imgMacro.classList.add('is-visible');
        imgOverview.style.opacity = '0';
        imgDetail.style.opacity = '0';
        if (reticle) reticle.classList.add('is-hidden');
        if (loupe) loupe.classList.remove('is-visible');

        if (zoomBadge) zoomBadge.textContent = tDict.macroBadge;
        if (hfwBadge) hfwBadge.textContent = 'FFW Wurzen';
        if (hintEl) hintEl.textContent = tDict.hintMacro;
        if (captionEl) captionEl.textContent = tDict.capMacro;
        updateDynamicScaleBar(tDict, 4.14, stageW, stageH);

        presetBtns.forEach((b) => {
          b.classList.toggle('is-active', b.getAttribute('data-s12-preset') === 'macro');
        });
        if (loupeBtn) loupeBtn.classList.remove('is-active');
        return;
      }

      if (imgMacro) imgMacro.classList.remove('is-visible');

      const z = state.zoom;
      const hfwMm = 4.14 / z;

      // Crossfade blend between Overview (REM_Filz.png, 1x) and Detail (REM_FilzDetail.png, 10x)
      // - z <= 4.2: pure Overview zoomed by z
      // - 4.2 < z < 9.6: smooth crossfade from zoomed Overview into Detail
      // - z >= 9.6: pure Detail zoomed by (z / 10)
      let detailAlpha = 0;
      if (z <= 4.2) {
        detailAlpha = 0;
      } else if (z >= 9.6) {
        detailAlpha = 1;
      } else {
        const u = (z - 4.2) / (9.6 - 4.2);
        detailAlpha = u * u * (3 - 2 * u);
      }

      const overviewScale = Math.min(10, z);
      const detailScale = z < 9.6 ? (0.72 + 0.28 * detailAlpha) : (z / 10);

      const txOverview = state.panX * stageW * overviewScale;
      const tyOverview = state.panY * stageH * overviewScale;
      const txDetail = state.panX * stageW * detailScale;
      const tyDetail = state.panY * stageH * detailScale;

      imgOverview.style.opacity = (1 - detailAlpha).toFixed(3);
      imgOverview.style.transform = `translate3d(${txOverview.toFixed(1)}px, ${tyOverview.toFixed(1)}px, 0) scale(${overviewScale.toFixed(4)})`;

      imgDetail.style.opacity = detailAlpha.toFixed(3);
      imgDetail.style.transform = `translate3d(${txDetail.toFixed(1)}px, ${tyDetail.toFixed(1)}px, 0) scale(${detailScale.toFixed(4)})`;

      // Reticle target box only visible near 1x overview
      if (reticle) {
        reticle.classList.toggle('is-hidden', z > 1.25);
      }

      // Cursor state
      const canPan = (z > 1.05 && z < 9.6) || z > 10.15;
      stage.classList.toggle('can-pan', canPan);
      stage.classList.toggle('is-dragging', state.isDragging);

      // Slider sync
      if (slider) {
        const sVal = zoomToSlider(z);
        if (Math.abs(Number(slider.value) - sVal) > 1) {
          slider.value = String(sVal);
        }
      }

      // Readouts
      if (zoomBadge) zoomBadge.textContent = tDict.zoomFmt(z);
      if (hfwBadge) {
        hfwBadge.textContent = hfwMm >= 1.0 ? tDict.hfwMm(hfwMm) : tDict.hfwUm(hfwMm * 1000);
      }

      updateDynamicScaleBar(tDict, hfwMm, stageW, stageH);
      updateLoupeDOM(tDict);

      // Active preset highlight
      let activePreset = '';
      if (z < 2.2) activePreset = '1';
      else if (z >= 7.5 && z <= 14.5) activePreset = '10';
      else if (z > 14.5) activePreset = '22';

      presetBtns.forEach((b) => {
        b.classList.toggle('is-active', b.getAttribute('data-s12-preset') === activePreset);
      });

      if (loupeBtn) {
        loupeBtn.classList.toggle('is-active', state.loupeEnabled && z <= 1.35);
      }

      // Contextual hint & caption
      if (hintEl) {
        if (z <= 1.25) {
          hintEl.textContent = state.loupeEnabled ? tDict.hint1xLoupe : tDict.hint1xPlain;
        } else if (Math.abs(z - 10) < 0.35) {
          hintEl.textContent = tDict.hint10x;
        } else {
          hintEl.textContent = tDict.hintZoomed;
        }
      }

      if (captionEl) {
        if (z < 5.5) {
          captionEl.textContent = tDict.cap1x;
        } else if (z < 16.5) {
          captionEl.textContent = tDict.cap10x;
        } else {
          captionEl.textContent = tDict.cap22x;
        }
      }
    }

    function animateTo(targetZoom, targetPanX = 0, targetPanY = 0, durationMs = 460) {
      cancelAnim();
      state.mode = 'rem';
      const startZoom = state.zoom;
      const startPanX = state.panX;
      const startPanY = state.panY;
      const clampedTargetZoom = Math.max(1, Math.min(25, targetZoom));

      if (Math.abs(clampedTargetZoom - startZoom) < 0.02 && Math.abs(targetPanX - startPanX) < 0.005 && Math.abs(targetPanY - startPanY) < 0.005) {
        state.zoom = clampedTargetZoom;
        state.panX = targetPanX;
        state.panY = targetPanY;
        render();
        return;
      }

      const t0 = performance.now();
      const logStart = Math.log(startZoom);
      const logEnd = Math.log(clampedTargetZoom);

      function step(now) {
        const p = Math.min(1, (now - t0) / durationMs);
        // Smooth cubic ease-out
        const ease = 1 - Math.pow(1 - p, 3);
        state.zoom = Math.exp(logStart + (logEnd - logStart) * ease);
        state.panX = startPanX + (targetPanX - startPanX) * ease;
        state.panY = startPanY + (targetPanY - startPanY) * ease;
        render();
        if (p < 1) {
          state.animFrame = requestAnimationFrame(step);
        } else {
          state.animFrame = null;
          state.zoom = clampedTargetZoom;
          state.panX = targetPanX;
          state.panY = targetPanY;
          render();
        }
      }
      state.animFrame = requestAnimationFrame(step);
    }

    // Preset buttons
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const preset = btn.getAttribute('data-s12-preset');
        if (preset === 'macro') {
          cancelAnim();
          state.mode = 'macro';
          render();
        } else if (preset === '1') {
          animateTo(1.0, 0, 0, 440);
        } else if (preset === '10') {
          animateTo(10.0, 0, 0, 480);
        } else if (preset === '22') {
          // Center slightly on the prominent curved Merino wool fiber showing crisp cuticle scales
          animateTo(22.0, -0.04, -0.05, 520);
        }
      });
    });

    // Left-hand bullet / KPI interactive linkage: clicking a lab KPI or bullet jumps to the matching REM magnification!
    leftCards.forEach((item) => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-s12-focus');
        if (target === '1') animateTo(1.0, 0, 0, 440);
        else if (target === '10') animateTo(10.0, 0, 0, 480);
        else if (target === '22') animateTo(22.0, -0.04, -0.05, 520);
      });
    });

    // Loupe toggle button
    if (loupeBtn) {
      loupeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.mode === 'macro' || state.zoom > 1.35) {
          state.loupeEnabled = true;
          state.loupeVisible = true;
          animateTo(1.0, 0, 0, 420);
        } else {
          state.loupeEnabled = !state.loupeEnabled;
          render();
        }
      });
    }

    // Continuous slider
    if (slider) {
      slider.addEventListener('input', (e) => {
        e.stopPropagation();
        cancelAnim();
        state.mode = 'rem';
        state.zoom = sliderToZoom(slider.value);
        render();
      });
    }

    // +/- step & reset buttons
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextZ = state.zoom < 9.5 ? Math.min(10, state.zoom * 1.65) : Math.min(25, state.zoom * 1.35);
        animateTo(nextZ, state.panX, state.panY, 260);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextZ = state.zoom > 10.5 ? Math.max(10, state.zoom / 1.35) : Math.max(1, state.zoom / 1.65);
        animateTo(nextZ, nextZ <= 1.05 || Math.abs(nextZ - 10) < 0.2 ? 0 : state.panX, nextZ <= 1.05 || Math.abs(nextZ - 10) < 0.2 ? 0 : state.panY, 260);
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        animateTo(1.0, 0, 0, 400);
      });
    }

    // Pointer hover (live loupe) + drag-to-pan + click-to-step-zoom on stage
    function updatePointerNorm(clientX, clientY) {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      state.pointerNormX = (clientX - rect.left) / rect.width;
      state.pointerNormY = (clientY - rect.top) / rect.height;
    }

    stage.addEventListener('pointerenter', (e) => {
      updatePointerNorm(e.clientX, e.clientY);
      state.loupeVisible = true;
      render();
    });

    stage.addEventListener('pointerleave', () => {
      if (!state.isDragging) {
        state.loupeVisible = false;
        render();
      }
    });

    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.stopPropagation();
      cancelAnim();
      updatePointerNorm(e.clientX, e.clientY);
      state.isDragging = true;
      state.dragMoved = false;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      state.dragOriginPanX = state.panX;
      state.dragOriginPanY = state.panY;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch (_) {}
      render();
    });

    stage.addEventListener('pointermove', (e) => {
      updatePointerNorm(e.clientX, e.clientY);
      state.loupeVisible = true;

      if (state.isDragging && state.mode === 'rem') {
        const dx = e.clientX - state.dragStartX;
        const dy = e.clientY - state.dragStartY;
        if (Math.hypot(dx, dy) > 5) {
          state.dragMoved = true;
        }
        const rect = stage.getBoundingClientRect();
        const activeScale = state.zoom < 9.6 ? state.zoom : state.zoom / 10;
        if (activeScale > 1.04 && rect.width > 0 && rect.height > 0) {
          state.panX = state.dragOriginPanX + dx / (rect.width * activeScale);
          state.panY = state.dragOriginPanY + dy / (rect.height * activeScale);
        }
      }
      render();
    });

    function finishPointer(e) {
      if (!state.isDragging) return;
      state.isDragging = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // If user clicked without dragging, step smartly through 1x -> 10x -> 22x -> 1x!
      if (!state.dragMoved) {
        if (state.mode === 'macro') {
          animateTo(1.0, 0, 0, 420);
        } else if (state.zoom < 3.5) {
          animateTo(10.0, 0, 0, 480);
        } else if (state.zoom < 16.0) {
          animateTo(22.0, -0.04, -0.05, 480);
        } else {
          animateTo(1.0, 0, 0, 460);
        }
        return;
      }
      render();
    }

    stage.addEventListener('pointerup', finishPointer);
    stage.addEventListener('pointercancel', () => {
      state.isDragging = false;
      render();
    });

    // Mouse-wheel / trackpad pinch zoom directly over REM stage
    stage.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        cancelAnim();
        if (state.mode === 'macro') {
          state.mode = 'rem';
        }
        updatePointerNorm(e.clientX, e.clientY);
        const delta = -e.deltaY;
        const factor = Math.exp(delta * 0.0022);
        state.zoom = Math.max(1, Math.min(25, state.zoom * factor));
        render();
      },
      { passive: false }
    );

    // Re-render when presentation language changes or window resizes
    const langObserver = new MutationObserver(() => render());
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setTimeout(render, 30));
    });
    window.addEventListener('resize', () => render(), { passive: true });

    // Initial render
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeickertRemViewer);
  } else {
    initWeickertRemViewer();
  }
})();
