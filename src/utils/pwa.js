/* ═══════════════════════════════════════════════════════════
   PWA：注册 Service Worker（应用壳预缓存，离线可用）
   apple-touch-icon 已改为 index.html 里的静态声明（iOS 不支持
   SVG 触屏图标，改用 PNG），无需再运行时注入。
   ═══════════════════════════════════════════════════════════ */
export function initPwa() {
  if (!('serviceWorker' in navigator)) return;

  /* Service Worker 仅在安全上下文（HTTPS 或本机调试）可用 */
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (location.protocol !== 'https:' && !isLocal) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* 静态托管未带上 sw.js 时静默降级，不影响页面功能 */
    });
  });
}
