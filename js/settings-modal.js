/* ═══════════════════════════════════════════════════════════
   设置面板开关
   ═══════════════════════════════════════════════════════════ */
'use strict';
var lastFocused = null;

function openSettings() {
  lastFocused = document.activeElement;
  modalEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  var closeBtn = document.getElementById('closeSettings');
  if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus();
}

function closeSettings() {
  modalEl.classList.remove('is-open');
  document.body.style.overflow = '';
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

function isSettingsOpen() {
  return modalEl.classList.contains('is-open');
}
