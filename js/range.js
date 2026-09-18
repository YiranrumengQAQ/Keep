/* ═══════════════════════════════════════════════════════════
   显示范围控制
   ═══════════════════════════════════════════════════════════ */
'use strict';
function applyRange(range, persist) {
  if (VALID_RANGE.indexOf(range) < 0) range = 'all';
  prefs.range = range;
  root.dataset.range = range;

  for (var i = 0; i < rangeButtons.length; i++) {
    var active = rangeButtons[i].dataset.range === range;
    rangeButtons[i].classList.toggle('is-active', active);
    rangeButtons[i].setAttribute('aria-checked', active ? 'true' : 'false');
  }

  /* 切到「仅今天」时自动跳到今天所在周 */
  if (range === 'today' && todayInfo) {
    activeWeek = todayInfo.wi;
  }

  renderWeekTabs();
  renderWeekGrid();

  if (persist !== false) savePrefs();
}
