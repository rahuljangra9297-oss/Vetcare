const CACHE_NAME = 'vetcare-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './clinical-db.js',
  './app.js',
  'https://cdn.tailwindcss.com'
];

// Install Service Worker & Precache Assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate & Cleanup Stale Caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// Cache-First Strategy with Network Fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
