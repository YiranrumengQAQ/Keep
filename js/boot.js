/* ============================================================
   首屏前置：读取偏好，锁定主题与风格，避免闪烁
   ============================================================ */
(function () {
  var KEY = 'med-lab-ct-prefs-v3';
  var prefs = { theme: 'system', style: 'flat', range: 'all' };

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object') {
        if (p.theme === 'light' || p.theme === 'dark' || p.theme === 'system') prefs.theme = p.theme;
        if (p.style === 'flat' || p.style === 'clay' || p.style === 'neobrutal' || p.style === 'glass') prefs.style = p.style;
        if (p.range === 'all' || p.range === 'today') prefs.range = p.range;
      }
    }
  } catch (e) { /* 隐私模式忽略 */ }

  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var dark = prefs.theme === 'dark' || (prefs.theme === 'system' && mq && mq.matches);

  var root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.style = prefs.style;
  root.dataset.range = prefs.range;
})();
