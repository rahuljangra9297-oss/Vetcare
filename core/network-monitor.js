// Vetcare AI OS - Network Speed Monitor, Ping Telemetry & Rural Low-Bandwidth Data-Saver Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var TELEMETRY_INTERVAL_MS = 30000; // 30 seconds periodic health telemetry
  var PING_TIMEOUT_MS = 6000;
  var STORAGE_DATA_SAVER_KEY = 'vetcare_data_saver_preference';

  var NetworkMonitor = {
    connectionSpeed: '4g', // '4g' | '3g' | '2g' | 'slow-2g' | 'offline'
    pingMs: 0,
    isDataSaverActive: false,
    downLinkMbps: 10,
    rttMs: 50,
    healthRating: 'उत्कृष्ट (Fast)',
    telemetryIntervalId: null,
    lastPingTimestamp: null,
    manualDataSaverOverride: null // true | false | null
  };

  window.VetcareApp.NetworkMonitor = NetworkMonitor;

  // Safe localStorage Wrappers
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare Network] LocalStorage read blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare Network] LocalStorage write blocked:', e);
    }
  }

  // Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3500;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[Network ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Inject UI Styles for Badges & Telemetry Modal
  function injectNetworkStyles() {
    if (document.getElementById('vetcare-network-monitor-styles')) return;

    var style = document.createElement('style');
    style.id = 'vetcare-network-monitor-styles';
    style.textContent =
      '#network-speed-badge {' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  gap: 6px;' +
      '  padding: 4px 10px;' +
      '  border-radius: 9999px;' +
      '  font-size: 0.76rem;' +
      '  font-weight: 600;' +
      '  cursor: pointer;' +
      '  user-select: none;' +
      '  transition: all 0.25s ease-in-out;' +
      '  border: 1px solid transparent;' +
      '}' +
      '.vetcare-speed-4g {' +
      '  background-color: #ecfdf5 !important;' +
      '  color: #065f46 !important;' +
      '  border-color: #a7f3d0 !important;' +
      '}' +
      '.vetcare-speed-3g {' +
      '  background-color: #fefce8 !important;' +
      '  color: #854d0e !important;' +
      '  border-color: #fef08a !important;' +
      '}' +
      '.vetcare-speed-2g {' +
      '  background-color: #fff7ed !important;' +
      '  color: #9a3412 !important;' +
      '  border-color: #fed7aa !important;' +
      '}' +
      '.vetcare-speed-offline {' +
      '  background-color: #fef2f2 !important;' +
      '  color: #991b1b !important;' +
      '  border-color: #fecaca !important;' +
      '}' +
      '.vetcare-datasaver-active {' +
      '  box-shadow: 0 0 8px rgba(249, 115, 22, 0.4) !important;' +
      '}';

    document.head.appendChild(style);
  }

  // 2. NETWORK INFORMATION API & TELEMETRY INFERENCE
  function getNetworkConnectionObject() {
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  }

  function syncHardwareNetworkInfo() {
    if (!navigator.onLine) {
      NetworkMonitor.connectionSpeed = 'offline';
      NetworkMonitor.downLinkMbps = 0;
      NetworkMonitor.rttMs = 0;
      NetworkMonitor.healthRating = 'ऑफ़लाइन (Offline)';
      return;
    }

    var conn = getNetworkConnectionObject();
    if (conn) {
      if (conn.effectiveType) {
        NetworkMonitor.connectionSpeed = conn.effectiveType; // '4g', '3g', '2g', 'slow-2g'
      }
      if (typeof conn.downlink === 'number') {
        NetworkMonitor.downLinkMbps = conn.downlink;
      }
      if (typeof conn.rtt === 'number') {
        NetworkMonitor.rttMs = conn.rtt;
      }
      if (conn.saveData === true && NetworkMonitor.manualDataSaverOverride === null) {
        NetworkMonitor.isDataSaverActive = true;
      }
    }
  }

  // 3. ACTIVE PING MEASUREMENT (FIELD TELEMETRY ENGINE)
  NetworkMonitor.measurePing = function () {
    if (!navigator.onLine) {
      NetworkMonitor.connectionSpeed = 'offline';
      NetworkMonitor.pingMs = 0;
      NetworkMonitor.healthRating = 'ऑफ़लाइन (Offline)';
      evaluateDataSaverPolicy();
      NetworkMonitor.updateUIBadge();
      return Promise.resolve(0);
    }

    var startTime = (window.performance && window.performance.now)
      ? window.performance.now()
      : Date.now();

    // Use current origin ping target with cache-busting timestamp
    var pingUrl = window.location.origin + window.location.pathname + '?_telemetry_ping=' + Date.now();

    var controller = null;
    var signal = null;
    if (typeof window.AbortController === 'function') {
      controller = new window.AbortController();
      signal = controller.signal;
      setTimeout(function () {
        controller.abort();
      }, PING_TIMEOUT_MS);
    }

    return window.fetch(pingUrl, {
      method: 'HEAD',
      cache: 'no-store',
      mode: 'same-origin',
      signal: signal
    }).then(function () {
      var endTime = (window.performance && window.performance.now)
        ? window.performance.now()
        : Date.now();

      var latency = Math.max(1, Math.round(endTime - startTime));
      NetworkMonitor.pingMs = latency;
      NetworkMonitor.lastPingTimestamp = Date.now();

      // Classify health based on round-trip time (RTT)
      if (latency < 150) {
        NetworkMonitor.healthRating = 'उत्कृष्ट (Fast)';
        if (!getNetworkConnectionObject()) {
          NetworkMonitor.connectionSpeed = '4g';
        }
      } else if (latency <= 600) {
        NetworkMonitor.healthRating = 'मध्यम (Fair)';
        if (!getNetworkConnectionObject()) {
          NetworkMonitor.connectionSpeed = '3g';
        }
      } else {
        NetworkMonitor.healthRating = 'कमज़ोर (Poor)';
        if (!getNetworkConnectionObject()) {
          NetworkMonitor.connectionSpeed = '2g';
        }
      }

      evaluateDataSaverPolicy();
      NetworkMonitor.updateUIBadge();
      return latency;
    }).catch(function (error) {
      console.warn('[Vetcare Network] Ping fetch failed or timed out:', error.message);

      if (!navigator.onLine) {
        NetworkMonitor.connectionSpeed = 'offline';
        NetworkMonitor.pingMs = 0;
        NetworkMonitor.healthRating = 'ऑफ़लाइन (Offline)';
      } else {
        NetworkMonitor.pingMs = 999;
        NetworkMonitor.healthRating = 'कमज़ोर (Poor)';
        NetworkMonitor.connectionSpeed = 'slow-2g';
      }

      evaluateDataSaverPolicy();
      NetworkMonitor.updateUIBadge();
      return NetworkMonitor.pingMs;
    });
  };

  // 4. LOW-BANDWIDTH DATA-SAVER AUTO-SWITCH
  function evaluateDataSaverPolicy() {
    var previousState = NetworkMonitor.isDataSaverActive;

    // Check manual override first
    if (NetworkMonitor.manualDataSaverOverride !== null) {
      NetworkMonitor.isDataSaverActive = NetworkMonitor.manualDataSaverOverride;
    } else {
      // Auto-switch based on real-time rural network telemetry
      var is2G = NetworkMonitor.connectionSpeed === '2g' || NetworkMonitor.connectionSpeed === 'slow-2g';
      var isHighLatency = NetworkMonitor.pingMs > 800;
      var isLowBandwidth = NetworkMonitor.downLinkMbps < 0.5 && NetworkMonitor.downLinkMbps > 0;

      NetworkMonitor.isDataSaverActive = Boolean(is2G || isHighLatency || isLowBandwidth);
    }

    // Trigger state transition actions
    if (NetworkMonitor.isDataSaverActive !== previousState) {
      if (NetworkMonitor.isDataSaverActive) {
        displayToast('कमज़ोर नेटवर्क: डेटा-सेवर मोड स्वतः चालू हो गया है।', 'info', 3500);
      } else {
        displayToast('हाई-स्पीड नेटवर्क: डेटा-सेवर मोड निष्क्रिय किया गया।', 'success', 2500);
      }

      if (typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('vetcare:data-saver-toggle', {
          detail: {
            active: NetworkMonitor.isDataSaverActive,
            speed: NetworkMonitor.connectionSpeed,
            pingMs: NetworkMonitor.pingMs
          }
        }));
      }
    }
  }

  NetworkMonitor.toggleDataSaver = function (forceState) {
    if (typeof forceState === 'boolean') {
      NetworkMonitor.manualDataSaverOverride = forceState;
    } else {
      NetworkMonitor.manualDataSaverOverride = !NetworkMonitor.isDataSaverActive;
    }

    safeStorageSet(STORAGE_DATA_SAVER_KEY, NetworkMonitor.manualDataSaverOverride.toString());
    evaluateDataSaverPolicy();
    NetworkMonitor.updateUIBadge();

    return NetworkMonitor.isDataSaverActive;
  };

  NetworkMonitor.resetDataSaverAutoMode = function () {
    NetworkMonitor.manualDataSaverOverride = null;
    try {
      window.localStorage.removeItem(STORAGE_DATA_SAVER_KEY);
    } catch (e) {
      console.warn('[Vetcare Network] Storage remove blocked:', e);
    }
    evaluateDataSaverPolicy();
    NetworkMonitor.updateUIBadge();
  };

  // 5. UI INDICATORS & BADGE SYNCHRONIZATION
  NetworkMonitor.updateUIBadge = function () {
    var badge = document.getElementById('network-speed-badge');
    if (!badge) return;

    badge.classList.remove(
      'vetcare-speed-4g',
      'vetcare-speed-3g',
      'vetcare-speed-2g',
      'vetcare-speed-offline',
      'vetcare-datasaver-active'
    );

    var speed = NetworkMonitor.connectionSpeed;
    var ping = NetworkMonitor.pingMs;
    var isSaver = NetworkMonitor.isDataSaverActive;

    if (!navigator.onLine || speed === 'offline') {
      badge.classList.add('vetcare-speed-offline');
      badge.textContent = '🔴 ऑफ़लाइन';
      badge.setAttribute('title', 'नेटवर्क अनुपलब्ध: ऑफ़लाइन मोड सक्रिय');
      return;
    }

    if (isSaver) {
      badge.classList.add('vetcare-speed-2g', 'vetcare-datasaver-active');
      badge.textContent = '🟠 ' + speed.toUpperCase() + ' (सेवर मोड)';
      badge.setAttribute('title', 'डेटा-सेवर सक्रिय | पिंग: ' + ping + 'ms | रेटिंग: ' + NetworkMonitor.healthRating);
      return;
    }

    if (speed === '4g') {
      badge.classList.add('vetcare-speed-4g');
      badge.textContent = '🟢 4G | ' + ping + 'ms';
      badge.setAttribute('title', 'नेटवर्क: 4G फास्ट | पिंग: ' + ping + 'ms');
    } else if (speed === '3g') {
      badge.classList.add('vetcare-speed-3g');
      badge.textContent = '🟡 3G | ' + ping + 'ms';
      badge.setAttribute('title', 'नेटवर्क: 3G सामान्य | पिंग: ' + ping + 'ms');
    } else {
      badge.classList.add('vetcare-speed-2g');
      badge.textContent = '🟠 2G | ' + ping + 'ms';
      badge.setAttribute('title', 'नेटवर्क: 2G धीमा | पिंग: ' + ping + 'ms');
    }
  };

  // Detailed Telemetry Modal Engine
  NetworkMonitor.openTelemetryModal = function () {
    var existingModal = document.getElementById('vetcare-telemetry-modal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'vetcare-telemetry-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute(
      'style',
      'position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); ' +
      'z-index: 1000003; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: system-ui, sans-serif;'
    );

    var conn = getNetworkConnectionObject();
    var connType = conn && conn.type ? conn.type : 'cellular/wifi';

    modal.innerHTML =
      '<div style="background: #ffffff; color: #0f172a; width: 100%; max-width: 440px; border-radius: 16px; ' +
      'box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); border: 1px solid #e2e8f0; overflow: hidden;">' +
        '<div style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">' +
          '<h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b;">नेटवर्क व टेलीमेट्री स्थिति</h3>' +
          '<button id="btn-close-telemetry" style="background: none; border: none; font-size: 1.5rem; line-height: 1; cursor: pointer; color: #64748b;">&times;</button>' +
        '</div>' +
        '<div style="padding: 20px;">' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">' +
            '<div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' +
              '<div style="font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">कनेक्शन गति</div>' +
              '<div style="font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase;">' + NetworkMonitor.connectionSpeed + '</div>' +
            '</div>' +
            '<div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' +
              '<div style="font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">पिंग लेटेंसी (Ping)</div>' +
              '<div style="font-size: 1.1rem; font-weight: 700; color: #0f172a;">' + NetworkMonitor.pingMs + ' ms</div>' +
            '</div>' +
            '<div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' +
              '<div style="font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">बैंडविड्थ (Downlink)</div>' +
              '<div style="font-size: 1.1rem; font-weight: 700; color: #0f172a;">' + NetworkMonitor.downLinkMbps + ' Mbps</div>' +
            '</div>' +
            '<div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">' +
              '<div style="font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">नेटवर्क रेटिंग</div>' +
              '<div style="font-size: 0.95rem; font-weight: 600; color: #2563eb;">' + NetworkMonitor.healthRating + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="background: #f1f5f9; padding: 14px; border-radius: 10px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">' +
            '<div>' +
              '<div style="font-size: 0.88rem; font-weight: 600; color: #1e293b;">ग्रामीण डेटा-सेवर मोड</div>' +
              '<div style="font-size: 0.75rem; color: #64748b;">ऑडियो ऑटो-प्ले रोकें और डेटा बचाएं</div>' +
            '</div>' +
            '<button id="btn-toggle-datasaver-modal" style="padding: 6px 14px; border-radius: 6px; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: none; ' +
              (NetworkMonitor.isDataSaverActive ? 'background: #ea580c; color: #ffffff;' : 'background: #cbd5e1; color: #334155;') + '">' +
              (NetworkMonitor.isDataSaverActive ? 'सक्रिय (ON)' : 'बंद (OFF)') +
            '</button>' +
          '</div>' +
          '<button id="btn-retest-ping" style="width: 100%; background: #2563eb; color: #ffffff; border: none; padding: 10px; border-radius: 8px; font-size: 0.88rem; font-weight: 600; cursor: pointer;">' +
            '🔄 पुनः गति जांचें (Test Ping Now)' +
          '</button>' +
        '</div>';

    document.body.appendChild(modal);

    modal.querySelector('#btn-close-telemetry').addEventListener('click', function () {
      modal.remove();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector('#btn-toggle-datasaver-modal').addEventListener('click', function () {
      NetworkMonitor.toggleDataSaver();
      NetworkMonitor.openTelemetryModal(); // Refresh modal view
    });

    modal.querySelector('#btn-retest-ping').addEventListener('click', function () {
      this.textContent = 'जांच जारी है...';
      this.disabled = true;
      NetworkMonitor.measurePing().then(function () {
        NetworkMonitor.openTelemetryModal();
      });
    });
  };

  NetworkMonitor.getConnectionMetrics = function () {
    return {
      speed: NetworkMonitor.connectionSpeed,
      pingMs: NetworkMonitor.pingMs,
      downLinkMbps: NetworkMonitor.downLinkMbps,
      rttMs: NetworkMonitor.rttMs,
      isDataSaverActive: NetworkMonitor.isDataSaverActive,
      healthRating: NetworkMonitor.healthRating,
      lastPingTimestamp: NetworkMonitor.lastPingTimestamp
    };
  };

  // 6. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapNetworkMonitor() {
    injectNetworkStyles();

    // Restore user manual preference if saved
    var savedPreference = safeStorageGet(STORAGE_DATA_SAVER_KEY);
    if (savedPreference !== null) {
      NetworkMonitor.manualDataSaverOverride = savedPreference === 'true';
    }

    syncHardwareNetworkInfo();
    evaluateDataSaverPolicy();

    // Listen to Network Information Hardware changes
    var conn = getNetworkConnectionObject();
    if (conn && typeof conn.addEventListener === 'function') {
      conn.addEventListener('change', function () {
        syncHardwareNetworkInfo();
        evaluateDataSaverPolicy();
        NetworkMonitor.updateUIBadge();
      });
    }

    // Window connectivity listeners
    window.addEventListener('online', function () {
      syncHardwareNetworkInfo();
      NetworkMonitor.measurePing();
    });

    window.addEventListener('offline', function () {
      syncHardwareNetworkInfo();
      evaluateDataSaverPolicy();
      NetworkMonitor.updateUIBadge();
    });

    // Badge click opens detailed telemetry modal
    document.addEventListener('click', function (e) {
      var badge = e.target.closest ? e.target.closest('#network-speed-badge') : null;
      if (badge) {
        e.preventDefault();
        NetworkMonitor.openTelemetryModal();
      }
    });

    // Initial ping measurement
    NetworkMonitor.measurePing();

    // Periodic telemetry polling: 30 seconds
    if (NetworkMonitor.telemetryIntervalId) {
      clearInterval(NetworkMonitor.telemetryIntervalId);
    }
    NetworkMonitor.telemetryIntervalId = setInterval(function () {
      NetworkMonitor.measurePing();
    }, TELEMETRY_INTERVAL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapNetworkMonitor);
  } else {
    bootstrapNetworkMonitor();
  }

})(window, document);
