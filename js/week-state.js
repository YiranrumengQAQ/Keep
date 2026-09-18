/* ═══════════════════════════════════════════════════════════
   周次状态
   ═══════════════════════════════════════════════════════════ */
'use strict';
var activeWeek = 0;

(function pickInitialWeek() {
  if (todayInfo) {
    activeWeek = todayInfo.wi;
    return;
  }
  var first = WEEKS[0].days[0].d;
  var lastDays = WEEKS[WEEKS.length - 1].days;
  var last = lastDays[lastDays.length - 1].d;

  if (todayISO < first) activeWeek = 0;
  else if (todayISO > last) activeWeek = WEEKS.length - 1;
  else activeWeek = 0;
})();

function selectWeek(index, shouldScroll) {
  if (index < 0 || index >= WEEKS.length) return;
  activeWeek = index;

  var tabs = tabsEl.querySelectorAll('.week-tab');
  for (var i = 0; i < tabs.length; i++) {
    var on = i === index;
    tabs[i].classList.toggle('is-active', on);
    tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
  }

  renderWeekGrid();

  if (shouldScroll) scrollToTodayCard();
}

function scrollToTodayCard() {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(function () {
    rafId = 0;
    var el = gridEl.querySelector('.day-card.is-today');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });
}
