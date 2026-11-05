// Vetcare AI OS - Offline Cache Manager, Static Asset Vault & Network Resilience Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var CACHE_NAME = 'vetcare-static-v2026.4.1';
  var STORAGE_FLAG = 'vetcare_offline_cached';
  var STORAGE_VERSION_FLAG = 'vetcare_cache_version';

  var CORE_STATIC_ASSETS = [
    './',
    'index.html',
    'manifest.json',
    'core/timers-engine.js',
    'core/i18n-languages.js',
    'core/api-key-manager.js',
    'core/offline-cache.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  var OfflineCache = {
    cacheVersion: CACHE_NAME,
    status: 'idle', // 'idle' | 'caching' | 'cached' | 'error'
    isOnline: typeof navigator.onLine === 'boolean' ? navigator.onLine : true,
    storageStats: {
      usedMb: 0,
      totalMb: 0,
      percent: 0
    }
  };

  window.VetcareApp.OfflineCache = OfflineCache;

  // Safe localStorage Utilities
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare Cache] LocalStorage read blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare Cache] LocalStorage write blocked:', e);
    }
  }

  function safeStorageRemove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn('[Vetcare Cache] LocalStorage remove blocked:', e);
    }
  }

  // Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = duration || 3500;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[Cache ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Visual Styles for Network Badge & Indicators
  function injectCacheStyles() {
    if (document.getElementById('vetcare-cache-styles')) return;
    var style = document.createElement('style');
    style.id = 'vetcare-cache-styles';
    style.textContent =
      '#network-status-badge {' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  gap: 6px;' +
      '  padding: 4px 10px;' +
      '  border-radius: 9999px;' +
      '  font-size: 0.78rem;' +
      '  font-weight: 600;' +
      '  transition: all 0.3s ease-in-out;' +
      '}' +
      '.vetcare-net-online {' +
      '  background-color: #dcfce7 !important;' +
      '  color: #15803d !important;' +
      '  border: 1px solid #bbf7d0 !important;' +
      '}' +
      '.vetcare-net-offline {' +
      '  background-color: #fef3c7 !important;' +
      '  color: #b45309 !important;' +
      '  border: 1px solid #fde68a !important;' +
      '  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4) !important;' +
      '}';
    document.head.appendChild(style);
  }

  // 2. NETWORK CONNECTIVITY & RESILIENCE ENGINE
  function updateNetworkUI(online) {
    var badge = document.getElementById('network-status-badge');
    if (!badge) return;

    badge.classList.remove('vetcare-net-online', 'vetcare-net-offline');

    if (online) {
      badge.classList.add('vetcare-net-online');
      badge.textContent = '🟢 ऑनलाइन';
      badge.setAttribute('title', 'क्लाउड सिंक सक्रिय - इंटरनेट उपलब्ध है');
      badge.setAttribute('aria-label', 'System Online');
    } else {
      badge.classList.add('vetcare-net-offline');
      badge.textContent = '📶 ऑफ़लाइन मोड सक्रिय (100% डेटा सुरक्षित)';
      badge.setAttribute('title', 'ऑफ़लाइन मोड: सभी रिकॉर्ड्स लोकल स्टोरेज में सुरक्षित रहेंगे');
      badge.setAttribute('aria-label', 'System Offline');
    }
  }

  function handleOnlineEvent() {
    OfflineCache.isOnline = true;
    updateNetworkUI(true);
    displayToast('इंटरनेट पुनः कनेक्ट हो गया! डेटा सिंक चालू है।', 'success', 3000);

    // Notify Sync Engine if active
    if (window.VetcareApp.Sync && typeof window.VetcareApp.Sync.triggerAutoSync === 'function') {
      window.VetcareApp.Sync.triggerAutoSync();
    }

    // Trigger Custom Event
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('vetcare:network-online', { detail: { timestamp: Date.now() } }));
    }
  }

  function handleOfflineEvent() {
    OfflineCache.isOnline = false;
    updateNetworkUI(false);
    displayToast('इंटरनेट बंद है। ऐप 100% ऑफ़लाइन मोड में सुरक्षित चल रहा है।', 'warning', 4000);

    // Trigger Custom Event
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('vetcare:network-offline', { detail: { timestamp: Date.now() } }));
    }
  }

  function bindNetworkListeners() {
    window.addEventListener('online', handleOnlineEvent);
    window.addEventListener('offline', handleOfflineEvent);
  }

  // 3. ASSET VAULT & PRE-CACHING ENGINE
  OfflineCache.preCacheCoreAssets = function () {
    if (!('caches' in window)) {
      console.warn('[Vetcare Cache] Cache API is not supported in this browser environment.');
      OfflineCache.status = 'error';
      return Promise.resolve(false);
    }

    OfflineCache.status = 'caching';

    return window.caches.open(CACHE_NAME)
      .then(function (cache) {
        var fetchPromises = CORE_STATIC_ASSETS.map(function (assetUrl) {
          var request = new Request(assetUrl, { mode: assetUrl.indexOf('http') === 0 ? 'no-cors' : 'same-origin' });

          return window.fetch(request)
            .then(function (response) {
              if (response.status === 200 || response.type === 'opaque') {
                return cache.put(request, response);
              } else {
                console.warn('[Vetcare Cache] Resource skipped (non-200 status): ' + assetUrl + ' (' + response.status + ')');
                return Promise.resolve();
              }
            })
            .catch(function (fetchErr) {
              console.warn('[Vetcare Cache] Non-blocking asset fetch error for ' + assetUrl + ':', fetchErr.message);
              return Promise.resolve();
            });
        });

        return Promise.all(fetchPromises).then(function () {
          return cache;
        });
      })
      .then(function () {
        OfflineCache.status = 'cached';
        safeStorageSet(STORAGE_FLAG, 'true');
        safeStorageSet(STORAGE_VERSION_FLAG, CACHE_NAME);
        console.log('[Vetcare Cache] All core assets cached successfully in: ' + CACHE_NAME);
        OfflineCache.getCacheStorageEstimate();
        return true;
      })
      .catch(function (err) {
        OfflineCache.status = 'error';
        console.error('[Vetcare Cache] Pre-caching encountered an error:', err);
        return false;
      });
  };

  // 4. CACHE MANAGEMENT & DIAGNOSTICS
  OfflineCache.getCacheStorageEstimate = function () {
    if (navigator.storage && typeof navigator.storage.estimate === 'function') {
      return navigator.storage.estimate().then(function (estimate) {
        var usedBytes = estimate.usage || 0;
        var totalBytes = estimate.quota || 0;
        var usedMb = (usedBytes / (1024 * 1024)).toFixed(2);
        var totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
        var percent = totalBytes > 0 ? ((usedBytes / totalBytes) * 100).toFixed(1) : 0;

        OfflineCache.storageStats = {
          usedMb: parseFloat(usedMb),
          totalMb: parseFloat(totalMb),
          percent: parseFloat(percent)
        };

        return OfflineCache.storageStats;
      }).catch(function (e) {
        console.warn('[Vetcare Cache] Storage estimate query failed:', e);
        return OfflineCache.storageStats;
      });
    }

    return Promise.resolve(OfflineCache.storageStats);
  };

  OfflineCache.clearOfflineCache = function () {
    if (!('caches' in window)) {
      displayToast('कस्टम कैशे समर्थित नहीं है।', 'warning');
      return Promise.resolve(false);
    }

    return window.caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name.indexOf('vetcare-') === 0) {
            console.log('[Vetcare Cache] Purging cache vault: ' + name);
            return window.caches.delete(name);
          }
          return Promise.resolve();
        })
      );
    }).then(function () {
      safeStorageRemove(STORAGE_FLAG);
      safeStorageRemove(STORAGE_VERSION_FLAG);
      OfflineCache.status = 'idle';
      OfflineCache.storageStats = { usedMb: 0, totalMb: 0, percent: 0 };
      displayToast('ऑफ़लाइन कैशे सफलतापूर्वक साफ़ कर दिया गया।', 'info');
      return true;
    }).catch(function (err) {
      console.error('[Vetcare Cache] Cache clear failed:', err);
      displayToast('कैशे साफ़ करने में विफल।', 'error');
      return false;
    });
  };

  OfflineCache.refreshOfflineAssets = function () {
    if (!OfflineCache.isOnline) {
      displayToast('कैशे रिफ्रेश करने के लिए इंटरनेट कनेक्शन आवश्यक है।', 'warning');
      return Promise.resolve(false);
    }

    displayToast('नवीनतम रिसोर्स डाउनलोड किए जा रहे हैं...', 'info', 2500);

    return OfflineCache.clearOfflineCache().then(function () {
      return OfflineCache.preCacheCoreAssets();
    }).then(function (success) {
      if (success) {
        displayToast('सभी ऑफ़लाइन रिसोर्स सफलतापूर्वक अपडेट हो गए!', 'success');
      }
      return success;
    });
  };

  // 5. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapOfflineCache() {
    injectCacheStyles();
    bindNetworkListeners();

    // Sync current initial network state
    OfflineCache.isOnline = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
    updateNetworkUI(OfflineCache.isOnline);

    // Run Cache verification & Pre-caching in the background
    var isCached = safeStorageGet(STORAGE_FLAG) === 'true';
    var cachedVersion = safeStorageGet(STORAGE_VERSION_FLAG);

    if (!isCached || cachedVersion !== CACHE_NAME) {
      if (OfflineCache.isOnline) {
        OfflineCache.preCacheCoreAssets();
      }
    } else {
      OfflineCache.status = 'cached';
      OfflineCache.getCacheStorageEstimate();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapOfflineCache);
  } else {
    bootstrapOfflineCache();
  }

})(window, document);
