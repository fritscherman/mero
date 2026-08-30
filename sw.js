// Service Worker für den Mero Diving Tauchfoto Enhancer.
// Strategie: Netz zuerst, Cache nur als Offline-Fallback. Online bekommt man
// dadurch immer den neuesten Stand; offline läuft die zuletzt geladene Version.
// Bei Änderungen an den App-Dateien VERSION hochzählen – die Seite zeigt dann
// einen "Aktualisieren"-Hinweis, sobald die neue Version installiert ist.
const VERSION = 'mero-v12';
const SHELL = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/i18n.js',
  'assets/logo.png',
  'assets/header.jpg',
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
      try {
        const res = await fetch(req, {cache: 'no-cache'});
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch {
        const cached = await cache.match(req, {ignoreSearch: req.mode === 'navigate'});
        if (cached) return cached;
        if (req.mode === 'navigate') { const shell = await cache.match('index.html'); if (shell) return shell; }
        throw new Error('offline und nicht im Cache: ' + req.url);
      }
    })
  );
});
