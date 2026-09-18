/* ═══════════════════════════════════════════════════════════
   统一事件委托：单一监听器，减少内存占用
   ═══════════════════════════════════════════════════════════ */
'use strict';
document.addEventListener('click', function (event) {
  var target = event.target;
  if (!target || typeof target.closest !== 'function') return;

  var tab = target.closest('.week-tab');
  if (tab) {
    selectWeek(Number(tab.dataset.week), false);
    return;
  }

  var themeBtn = target.closest('.theme-btn');
  if (themeBtn) {
    applyTheme(themeBtn.dataset.pref);
    return;
  }

  var styleBtn = target.closest('.style-btn');
  if (styleBtn) {
    applyStyle(styleBtn.dataset.ui);
    return;
  }

  var rangeBtn = target.closest('.range-btn');
  if (rangeBtn) {
    applyRange(rangeBtn.dataset.range);
    return;
  }

  var jump = target.closest('[data-action="jump-today"]');
  if (jump && todayInfo) {
    if (prefs.range === 'today') {
      renderWeekGrid();
    } else {
      selectWeek(todayInfo.wi, true);
    }
    return;
  }

  if (target.closest('#settingsBtn')) {
    openSettings();
    return;
  }

  if (target.closest('#closeSettings')) {
    closeSettings();
    return;
  }

  if (target === modalEl) {
    closeSettings();
  }
}, { signal: signal });

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && isSettingsOpen()) {
    event.preventDefault();
    closeSettings();
  }
}, { signal: signal });

/* 设置面板焦点循环 */
modalEl.addEventListener('keydown', function (event) {
  if (event.key !== 'Tab') return;

  var focusables = modalEl.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusables.length === 0) return;

  var first = focusables[0];
  var last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}, { signal: signal });
