// Service Worker für den Mero Diving Tauchfoto Enhancer.
// Strategie: Netz zuerst, Cache nur als Offline-Fallback. Online bekommt man
// dadurch immer den neuesten Stand; offline läuft die zuletzt geladene Version.
// Bei Änderungen an den App-Dateien VERSION hochzählen – die Seite zeigt dann
// einen "Aktualisieren"-Hinweis, sobald die neue Version installiert ist.
const VERSION = 'mero-v27';
const SHELL = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/i18n.js',
  'assets/logo.png',
  'assets/header-mobile.jpg',
  'assets/roboto-slab-700.woff2',
  'assets/tiles/editor.jpg',
  'assets/tiles/spots.jpg',
  'assets/tiles/pack.jpg',
  'assets/tiles/safety.jpg',
  'assets/tiles/contact.jpg',
  'assets/tiles/web.jpg',
  'assets/tiles/training.jpg',
  'assets/tiles/prices.jpg',
  'assets/fauna/mero.jpg',
  'assets/fauna/oktopus.jpg',
  'assets/fauna/sepia.jpg',
  'assets/fauna/fadenschnecke.jpg',
  'assets/fauna/barrakudas.jpg',
  'assets/fauna/baerenkrebs.jpg',
  'assets/fauna/drachenkopf.jpg',
  'assets/spots/lliteras.jpg',
  'assets/spots/maria.jpg',
  'assets/spots/kkaese.jpg',
  'assets/spots/capfreu.jpg',
  'assets/spots/gkaese.jpg',
  'assets/spots/leuchtturm.jpg',
  'assets/spots/loewenkopf.jpg',
  'assets/spots/kathedrale.jpg',
  'assets/spots/maria-oben.jpg',
  'assets/spots/kkaese-oben.jpg',
  'assets/spots/capfreu-oben.jpg',
  'assets/spots/gkaese-oben.jpg',
  'assets/spots/loewenkopf-oben.jpg',
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
