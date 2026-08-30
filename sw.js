// Service Worker für den Mero Diving Tauchfoto Enhancer.
// Precache der App-Shell, danach stale-while-revalidate: offline läuft die
// zuletzt gecachte Version, online wird der Cache im Hintergrund erneuert.
// Bei Änderungen an den App-Dateien VERSION hochzählen.
const VERSION = 'mero-v1';
const SHELL = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'assets/logo.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon-maskable-512.png',
  'assets/icon-180.png',
  'manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(req, {ignoreSearch: req.mode === 'navigate'});
      const refresh = fetch(req)
        .then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => cached);
      return cached || refresh;
    })
  );
});
