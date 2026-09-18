/* ═══════════════════════════════════════════════════════════
   PWA：动态注入 Manifest + 数据图标 + 尝试注册 SW
   ═══════════════════════════════════════════════════════════ */
'use strict';
(function initPWA() {
  var ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
      '<rect width="512" height="512" rx="112" fill="#2563eb"/>' +
      '<rect x="106" y="132" width="300" height="260" rx="34" fill="#ffffff"/>' +
      '<path d="M106 166a34 34 0 0 1 34-34h232a34 34 0 0 1 34 34v46H106z" fill="#1d4ed8"/>' +
      '<rect x="152" y="238" width="58" height="46" rx="13" fill="#bfdbfe"/>' +
      '<rect x="227" y="238" width="58" height="46" rx="13" fill="#bfdbfe"/>' +
      '<rect x="302" y="238" width="58" height="46" rx="13" fill="#bfdbfe"/>' +
      '<rect x="152" y="306" width="58" height="46" rx="13" fill="#bfdbfe"/>' +
      '<rect x="227" y="306" width="58" height="46" rx="13" fill="#93c5fd"/>' +
      '<rect x="302" y="306" width="58" height="46" rx="13" fill="#bfdbfe"/>' +
    '</svg>';

  var iconUrl = 'data:image/svg+xml,' + encodeURIComponent(ICON_SVG);

  var manifest = {
    name: '医学检验技术2025级1班课程表',
    short_name: '课程表',
    description: '2025级医学检验技术专业（1）班 2026年秋季学期课程表',
    start_url: './app.html',
    scope: './',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#f4f6fb',
    theme_color: '#2563eb',
    lang: 'zh-CN',
    icons: [
      { src: iconUrl, sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
      { src: iconUrl, sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' }
    ]
  };

  var manifestUrl = '';

  try {
    var blob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
    manifestUrl = URL.createObjectURL(blob);

    var link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestUrl;
    document.head.appendChild(link);
  } catch (e) { /* Blob 不可用时忽略 */ }

  try {
    var apple = document.createElement('link');
    apple.rel = 'apple-touch-icon';
    apple.href = iconUrl;
    document.head.appendChild(apple);
  } catch (e) { /* 忽略 */ }

  /* 页面真正卸载时回收 Blob URL */
  window.addEventListener('pagehide', function (e) {
    if (e.persisted) return;
    if (manifestUrl) {
      try { URL.revokeObjectURL(manifestUrl); } catch (err) { /* 忽略 */ }
      manifestUrl = '';
    }
  }, { signal: signal });

  /* Service Worker：仅在 http(s) 下尝试，失败静默降级 */
  if ('serviceWorker' in navigator &&
      (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('sw.js').catch(function () {
      /* 未部署 sw.js 时静默忽略，不影响页面功能 */
    });
  }
})();
