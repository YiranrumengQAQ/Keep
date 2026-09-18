/* ═══════════════════════════════════════════════════════════
   偏好设置
   ═══════════════════════════════════════════════════════════ */
'use strict';
var STORAGE_KEY = 'med-lab-ct-prefs-v3';
var VALID_THEME = ['light', 'dark', 'system'];
var VALID_STYLE = ['flat', 'clay', 'neobrutal', 'glass'];
var VALID_RANGE = ['all', 'today'];

var prefs = { theme: 'system', style: 'flat', range: 'all' };

(function loadPrefs() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    var p = JSON.parse(raw);
    if (!p || typeof p !== 'object') return;
    if (VALID_THEME.indexOf(p.theme) >= 0) prefs.theme = p.theme;
    if (VALID_STYLE.indexOf(p.style) >= 0) prefs.style = p.style;
    if (VALID_RANGE.indexOf(p.range) >= 0) prefs.range = p.range;
  } catch (e) { /* 忽略损坏数据 */ }
})();

function savePrefs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) { /* 存储不可用时静默 */ }
}
