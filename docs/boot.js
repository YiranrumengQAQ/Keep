/* ============================================================
   首屏前置：读取偏好，锁定主题/风格/范围/字体，避免闪烁。
   与 src/store/prefs.js 使用同一存储键；此处必须保持零依赖
   纯原生实现（早于模块加载执行）。校验逻辑与 store 保持一致。
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'med-lab-ct-prefs-v4';
  var LEGACY = 'med-lab-ct-prefs-v3';

  var VALID = {
    theme: ['light', 'dark', 'system'],
    style: ['flat', 'clay', 'neobrutal', 'glass', 'terminal', 'paper', 'pixel', 'skeuo'],
    range: ['all', 'today'],
    font: ['system', 'serif', 'rounded', 'mono', 'kai'],
    fontSize: ['s', 'm', 'l', 'xl'],
    smoothing: ['auto', 'smooth', 'sharp']
  };

  var FACTORY = {
    theme: 'system', style: 'flat', range: 'all',
    font: 'system', fontSize: 'm', smoothing: 'auto', customCSS: ''
  };

  /* 与 src/utils/sanitizeCss.js 保持一致的消毒规则（此处为独立副本） */
  function sanitizeCss(input) {
    var css = String(input == null ? '' : input);
    if (css.length > 40000) css = css.slice(0, 40000);
    css = css.replace(/</g, '');
    css = css
      .replace(/@import[^;}]*/gi, '/* blocked */')
      .replace(/@charset[^;}]*/gi, '/* blocked */')
      .replace(/expression\s*\([^)]*\)/gi, '/* blocked */')
      .replace(/javascript\s*:/gi, 'blocked:')
      .replace(/vbscript\s*:/gi, 'blocked:')
      .replace(/-moz-binding\s*:[^;}]+/gi, '/* blocked */')
      .replace(/\bbehavior\s*:[^;}]+/gi, '/* blocked */');
    return css;
  }

  function readPrefs() {
    var raw = null;
    try {
      raw = localStorage.getItem(KEY);
      if (!raw) raw = localStorage.getItem(LEGACY);
    } catch (e) { return null; }
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function sanitizePrefs(p) {
    var out = {};
    for (var k in FACTORY) out[k] = FACTORY[k];
    if (!p || typeof p !== 'object') return out;
    for (var key in VALID) {
      if (VALID[key].indexOf(p[key]) >= 0) out[key] = p[key];
    }
    if (typeof p.customCSS === 'string') out.customCSS = p.customCSS.slice(0, 40000);
    return out;
  }

  var prefs = sanitizePrefs(readPrefs());

  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var dark = prefs.theme === 'dark' || (prefs.theme === 'system' && mq && mq.matches);

  var root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.style = prefs.style;
  root.dataset.range = prefs.range;
  root.dataset.font = prefs.font;
  root.dataset.size = prefs.fontSize;
  root.dataset.smoothing = prefs.smoothing;

  /* 自定义 CSS 提前注入，保证首屏即生效；React 启动后接管同步 */
  if (prefs.customCSS) {
    var el = document.createElement('style');
    el.id = 'custom-css';
    el.textContent = sanitizeCss(prefs.customCSS);
    document.head.appendChild(el);
  }
})();
