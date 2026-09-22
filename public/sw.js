/* ═══════════════════════════════════════════════════════════
   Keep 课程表 Service Worker —— 真正的离线可用
   ─────────────────────────────────────────────────────────
   策略（对这个纯静态课表最合适的组合）：
   · 安装时预缓存应用壳（页面 / 清单 / 图标）
   · 页面导航：网络优先 —— 在线时总能拿到发布后的新版，
     离线时回退到缓存的应用壳
   · 静态资源（带哈希的 JS/CSS）：缓存优先，未命中再取网络并写回，
     新版本资源随着新 index.html 自然进入缓存
   · 跨域请求（如 jsDelivr 的像素字体）不做拦截，交给浏览器，
     加载失败时页面自身已有等宽字体回退

   发布新版后请把 VERSION 改成新值，客户端会清掉旧缓存。
   ═══════════════════════════════════════════════════════════ */

const VERSION = 'keep-v2.2.0';
const SHELL_CACHE = `keep-shell-${VERSION}`;
const RUNTIME_CACHE = `keep-runtime-${VERSION}`;

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('sw.js')) return;

  /* 页面导航：网络优先，离线回退应用壳 */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE)
            .then((cache) => cache.put('./index.html', copy))
            .catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match('./index.html'))
        )
    );
    return;
  }

  /* 静态资源：缓存优先，未命中取网络并写回缓存 */
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => cache.put(req, copy))
            .catch(() => {});
        }
        return res;
      });
    })
  );
});
