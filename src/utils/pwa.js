/* ═══════════════════════════════════════════════════════════
   PWA：apple-touch-icon 注入 + Service Worker（存在则注册，失败静默）
   ═══════════════════════════════════════════════════════════ */
export function initPwa() {
  try {
    const link = document.createElement('link');
    link.rel = 'apple-touch-icon';
    link.href = './icon.svg';
    document.head.appendChild(link);
  } catch (e) { /* 忽略 */ }

  if ('serviceWorker' in navigator &&
      (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      /* 未部署 sw.js 时静默忽略，不影响页面功能 */
    });
  }
}
