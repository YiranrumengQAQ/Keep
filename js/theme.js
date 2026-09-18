/* ═══════════════════════════════════════════════════════════
   主题控制
   ═══════════════════════════════════════════════════════════ */
'use strict';
var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
var metaTheme = document.querySelector('meta[name="theme-color"]');

function applyTheme(pref, persist) {
  if (VALID_THEME.indexOf(pref) < 0) pref = 'system';
  prefs.theme = pref;

  var resolved = pref === 'system'
    ? ((mq && mq.matches) ? 'dark' : 'light')
    : pref;

  root.dataset.theme = resolved;

  for (var i = 0; i < themeButtons.length; i++) {
    var active = themeButtons[i].dataset.pref === pref;
    themeButtons[i].classList.toggle('is-active', active);
    themeButtons[i].setAttribute('aria-checked', active ? 'true' : 'false');
  }

  if (metaTheme) {
    metaTheme.setAttribute('content', resolved === 'dark' ? '#0a0f1a' : '#f4f6fb');
  }

  if (persist !== false) savePrefs();
}

if (mq && typeof mq.addEventListener === 'function') {
  mq.addEventListener('change', function () {
    if (prefs.theme === 'system') applyTheme('system', false);
  }, { signal: signal });
}
