/* ═══════════════════════════════════════════════════════════
   初始化
   ═══════════════════════════════════════════════════════════ */
'use strict';
function init() {
  renderTodayPanel();
  renderTeachers();

  applyTheme(prefs.theme, false);
  applyStyle(prefs.style, false);

  renderWeekTabs();
  applyRange(prefs.range, false);
}

init();
