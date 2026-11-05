// Vetcare AI OS - Progressive Web App (PWA) Service Worker, Install Prompt & Offline Cache Engine (2026 Production)

(function () {
  'use strict';

  var CACHE_NAME = 'vetcare-pwa-v2026.4.1';

  var SHELL_ASSETS = [
    './',
    'index.html',
    'manifest.json',
    'core/timers-engine.js',
    'core/i18n-languages.js',
    'core/api-key-manager.js',
    'core/offline-cache.js',
    'core/camera-uploader.js',
    'core/audio-recorder.js',
    'core/sync-engine.js',
    'core/storage-indexeddb.js',
    'core/network-monitor.js',
    'core/crypto-security.js',
    'core/print-engine.js',
    'core/pwa-service-worker.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-regular-400.woff2',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  var isServiceWorker = typeof ServiceWorkerGlobalScope !== 'undefined' && self instanceof ServiceWorkerGlobalScope;
  var isWindowContext = typeof window !== 'undefined' && typeof document !== 'undefined';

  // =========================================================================
  // ENVIRONMENT 1: SERVICE WORKER THREAD CONTEXT (self)
  // =========================================================================
  if (isServiceWorker) {

    // 1. Install Event - Cache Core Application Shell
    self.addEventListener('install', function (event) {
      event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          var cachePromises = SHELL_ASSETS.map(function (assetUrl) {
            var isExternal = assetUrl.indexOf('http://') === 0 || assetUrl.indexOf('https://') === 0;
            var request = new Request(assetUrl, { mode: isExternal ? 'no-cors' : 'same-origin' });

            return fetch(request).then(function (response) {
              if (response.status === 200 || response.type === 'opaque') {
                return cache.put(request, response);
              }
              return Promise.resolve();
            }).catch(function (fetchErr) {
              console.warn('[Vetcare SW] Pre-caching skipped for:', assetUrl, fetchErr.message);
              return Promise.resolve();
            });
          });

          return Promise.all(cachePromises);
        }).then(function () {
          console.log('[Vetcare SW] Application shell pre-cached in vault:', CACHE_NAME);
          return self.skipWaiting();
        })
      );
    });

    // 2. Activate Event - Clean Legacy Caches & Claim Clients
    self.addEventListener('activate', function (event) {
      event.waitUntil(
        caches.keys().then(function (cacheKeys) {
          return Promise.all(
            cacheKeys.map(function (key) {
              if (key !== CACHE_NAME && key.indexOf('vetcare-') === 0) {
                console.log('[Vetcare SW] Decommissioning legacy cache:', key);
                return caches.delete(key);
              }
              return Promise.resolve();
            })
          );
        }).then(function () {
          console.log('[Vetcare SW] Claiming control of open clients.');
          return self.clients.claim();
        })
      );
    });

    // 3. Fetch Event - Resilient Hybrid Caching Strategy
    self.addEventListener('fetch', function (event) {
      var request = event.request;

      // Only handle GET requests
      if (request.method !== 'GET') {
        return;
      }

      var url = new URL(request.url);

      // Bypass non-app background analytics and chrome-extension protocols
      if (url.protocol.indexOf('http') !== 0) {
        return;
      }

      // STRATEGY A: Network-First with Cache Fallback for Navigation / HTML Pages
      if (request.mode === 'navigate' || request.destination === 'document') {
        event.respondWith(
          fetch(request).then(function (networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              var responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          }).catch(function () {
            return caches.match(request).then(function (cachedResponse) {
              if (cachedResponse) {
                return cachedResponse;
              }
              return caches.match('index.html').then(function (fallbackIndex) {
                if (fallbackIndex) {
                  return fallbackIndex;
                }
                return new Response(
                  '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Vetcare Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>ऑफ़लाइन मोड (Offline Mode)</h2><p>इंटरनेट उपलब्ध नहीं है। Vetcare AI OS स्थानीय कैशे से लोड हो रहा है।</p></body></html>',
                  { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
                );
              });
            });
          })
        );
        return;
      }

      // STRATEGY B: Cache-First with Network Fallback for Static Assets (CSS, JS, Fonts, Images)
      event.respondWith(
        caches.match(request).then(function (cachedResponse) {
          if (cachedResponse) {
            // Background update (stale-while-revalidate pattern for static assets)
            fetch(request).then(function (freshResponse) {
              if (freshResponse && (freshResponse.status === 200 || freshResponse.type === 'opaque')) {
                caches.open(CACHE_NAME).then(function (cache) {
                  cache.put(request, freshResponse);
                });
              }
            }).catch(function () {
              // Network silent failure during background update
            });
            return cachedResponse;
          }

          // Fetch from network if not in cache
          return fetch(request).then(function (networkResponse) {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              var responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          }).catch(function (fetchError) {
            // Graceful fallbacks for assets when offline
            if (request.destination === 'image') {
              // 1x1 transparent SVG fallback
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f1f5f9"/><text x="50" y="50" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#94a3b8">ऑफ़लाइन</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
            throw fetchError;
          });
        })
      );
    });

    // 4. Push Notification Click Handler
    self.addEventListener('notificationclick', function (event) {
      event.notification.close();
      var targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : './';

      event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url.indexOf(self.location.origin) !== -1 && 'focus' in client) {
              return client.focus();
            }
          }
          if (self.clients.openWindow) {
            return self.clients.openWindow(targetUrl);
          }
        })
      );
    });

    // 5. Background Sync Handler
    self.addEventListener('sync', function (event) {
      if (event.tag === 'sync-clinical-records') {
        event.waitUntil(
          self.clients.matchAll({ type: 'window' }).then(function (clientList) {
            clientList.forEach(function (client) {
              client.postMessage({ type: 'TRIGGER_BACKGROUND_SYNC', tag: event.tag });
            });
          })
        );
      }
    });

    // 6. Direct Message Handler
    self.addEventListener('message', function (event) {
      if (event.data && event.data.action === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });
  }

  // =========================================================================
  // ENVIRONMENT 2: MAIN BROWSER WINDOW CONTEXT (window)
  // =========================================================================
  if (isWindowContext) {

    window.VetcareApp = window.VetcareApp || {};

    var PWA = {
      deferredPrompt: null,
      isInstalled: false,
      swRegistration: null,
      updateAvailable: false
    };

    window.VetcareApp.PWA = PWA;

    // Toast Notification Dispatcher
    function displayToast(message, type, duration) {
      var toastDuration = typeof duration === 'number' ? duration : 3500;
      if (typeof window.showAppToast === 'function') {
        window.showAppToast(message, type, toastDuration);
      } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
        window.VetcareApp.UI.showToast(message, type, toastDuration);
      } else {
        console.log('[PWA ' + (type || 'info').toUpperCase() + '] ' + message);
      }
    }

    // Check Standalone / Installed Display Mode
    function checkInstalledStatus() {
      var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.indexOf('android-app://') !== -1;

      PWA.isInstalled = isStandalone;

      var installButtons = document.querySelectorAll('#pwa-install-btn, [data-pwa-install-btn]');
      installButtons.forEach(function (btn) {
        if (PWA.isInstalled) {
          btn.style.display = 'none';
        }
      });

      return isStandalone;
    }

    // Trigger Native Installation Dialog
    PWA.triggerPwaInstall = function () {
      if (!PWA.deferredPrompt) {
        displayToast('ऐप पहले से इंस्टॉल है या ब्राउज़र में सीधे उपलब्ध है।', 'info');
        return Promise.resolve({ outcome: 'not_applicable' });
      }

      var promptEvent = PWA.deferredPrompt;
      promptEvent.prompt();

      return promptEvent.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          console.log('[Vetcare PWA] User accepted installation prompt.');
          displayToast('Vetcare AI OS इंस्टॉल किया जा रहा है...', 'success');
        } else {
          console.log('[Vetcare PWA] User dismissed installation prompt.');
        }
        PWA.deferredPrompt = null;
        checkInstalledStatus();
        return choiceResult;
      });
    };

    // Register Service Worker from Window Thread
    function registerServiceWorker() {
      if (!('serviceWorker' in navigator)) {
        console.warn('[Vetcare PWA] Service Workers are not supported in this browser.');
        return;
      }

      var swScriptPath = './core/pwa-service-worker.js';

      navigator.serviceWorker.register(swScriptPath)
        .then(function (registration) {
          PWA.swRegistration = registration;
          console.log('[Vetcare PWA] Service Worker registered with scope:', registration.scope);

          // Check for background updates
          registration.onupdatefound = function () {
            var installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.onstatechange = function () {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  PWA.updateAvailable = true;
                  console.log('[Vetcare PWA] New version detected.');
                  displayToast('नया अपडेट उपलब्ध है! रीफ्रेश करें।', 'info', 6000);

                  if (typeof window.dispatchEvent === 'function') {
                    window.dispatchEvent(new CustomEvent('vetcare:pwa-update-available'));
                  }
                } else {
                  console.log('[Vetcare PWA] Application ready for offline execution.');
                  displayToast('ऐप ऑफ़लाइन उपयोग के लिए पूरी तरह तैयार है!', 'success', 3000);
                }
              }
            };
          };
        })
        .catch(function (error) {
          console.warn('[Vetcare PWA] Registration at ' + swScriptPath + ' failed, trying relative root:', error.message);
          // Fallback registration path if hosted from a different subfolder
          navigator.serviceWorker.register('./pwa-service-worker.js').then(function (fallbackReg) {
            PWA.swRegistration = fallbackReg;
            console.log('[Vetcare PWA] Fallback registration successful:', fallbackReg.scope);
          }).catch(function (fallbackErr) {
            console.error('[Vetcare PWA] All Service Worker registrations failed:', fallbackErr);
          });
        });

      // Handle controller reload change
      var refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (!refreshing) {
          refreshing = true;
          console.log('[Vetcare PWA] Controller changed, updating view.');
          window.location.reload();
        }
      });
    }

    // Bind Window Listeners for Install Prompt
    function bindPwaWindowEvents() {
      checkInstalledStatus();

      // Capture native beforeinstallprompt event
      window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        PWA.deferredPrompt = e;

        var installButtons = document.querySelectorAll('#pwa-install-btn, [data-pwa-install-btn]');
        installButtons.forEach(function (btn) {
          btn.style.display = 'inline-flex';
        });

        console.log('[Vetcare PWA] Captured beforeinstallprompt event.');
      });

      // App successfully installed listener
      window.addEventListener('appinstalled', function () {
        PWA.isInstalled = true;
        PWA.deferredPrompt = null;
        checkInstalledStatus();
        displayToast('Vetcare AI OS सफलतापूर्वक इंस्टॉल हो गया है!', 'success', 4000);
      });

      // Click delegation for install buttons
      document.addEventListener('click', function (e) {
        var installBtn = e.target.closest ? e.target.closest('#pwa-install-btn, [data-pwa-install-btn]') : null;
        if (installBtn) {
          e.preventDefault();
          PWA.triggerPwaInstall();
        }
      });
    }

    // Bootstrap PWA Registrar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        bindPwaWindowEvents();
        registerServiceWorker();
      });
    } else {
      bindPwaWindowEvents();
      registerServiceWorker();
    }
  }

})();
