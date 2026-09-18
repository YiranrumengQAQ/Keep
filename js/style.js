/* ═══════════════════════════════════════════════════════════
   界面风格控制
   ═══════════════════════════════════════════════════════════ */
'use strict';
function applyStyle(style, persist) {
  if (VALID_STYLE.indexOf(style) < 0) style = 'flat';
  prefs.style = style;
  root.dataset.style = style;

  for (var i = 0; i < styleButtons.length; i++) {
    var active = styleButtons[i].dataset.ui === style;
    styleButtons[i].setAttribute('aria-checked', active ? 'true' : 'false');
  }

  if (persist !== false) savePrefs();
}
