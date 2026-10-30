/**
 * Vetcare PWA Service Worker
 * Cache Name: vetcare-v2-cache
 * Strategy: Cache-First with Network Fallback for seamless offline clinical operations
 */

const CACHE_NAME = 'vetcare-v2-cache';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './clinical-db.js',
  './manifest.json'
];

// 1. INSTALL EVENT: Pre-cache critical core application assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.warn('Vetcare Service Worker precache failed:', error);
      })
  );
});

// 2. ACTIVATE EVENT: Clear outdated legacy caches and claim active clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT: Cache-First with Network Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle HTTP/HTTPS GET requests (bypasses Gemini API POSTs, Firebase websockets, extension schemes)
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached asset immediately if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network, cache a clone for future offline use, and return
        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              })
              .catch((err) => {
                console.warn('Failed to cache fetch request:', err);
              });

            return networkResponse;
          })
          .catch(() => {
            // Offline fallback for HTML page navigations
            if (request.mode === 'navigate') {
              return caches.match('./index.html') || caches.match('./');
            }
          });
      })
      .catch((error) => {
        console.error('Service Worker fetch handler error:', error);
      })
  );
});
