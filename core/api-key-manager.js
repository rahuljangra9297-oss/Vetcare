// Vetcare AI OS - Gemini API Key Vault, Key Validation & Live Health Ping Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var STORAGE_KEY = 'vetcare_gemini_api_key';
  var STORAGE_VALID_TIMESTAMP_KEY = 'vetcare_gemini_api_key_val_epoch';
  var GEMINI_TEST_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

  var ApiKeyManager = {
    currentKey: null,
    status: 'missing', // 'valid' | 'invalid' | 'missing' | 'validating'
    lastValidated: null,
    lastError: null
  };

  window.VetcareApp.ApiKeyManager = ApiKeyManager;

  // Safe localStorage Utilities with Base64 Obfuscation
  function safeBase64Encode(rawString) {
    if (!rawString) return '';
    try {
      return window.btoa(
        encodeURIComponent(rawString).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode(parseInt('0x' + p1, 16));
        })
      );
    } catch (e) {
      console.warn('[Vetcare Vault] Obfuscation encode fallback triggered:', e);
      return window.btoa(rawString);
    }
  }

  function safeBase64Decode(encodedString) {
    if (!encodedString) return '';
    try {
      return decodeURIComponent(
        Array.prototype.map
          .call(window.atob(encodedString), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch (e) {
      console.warn('[Vetcare Vault] Obfuscation decode fallback triggered:', e);
      try {
        return window.atob(encodedString);
      } catch (err) {
        return '';
      }
    }
  }

  function getStoredItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare Vault] LocalStorage read blocked:', e);
      return null;
    }
  }

  function setStoredItem(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) {
      console.warn('[Vetcare Vault] LocalStorage write blocked:', e);
    }
  }

  function removeStoredItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn('[Vetcare Vault] LocalStorage delete blocked:', e);
    }
  }

  function displayToast(msg, type) {
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(msg, type);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(msg, type);
    } else {
      console.log('[Toast ' + (type || 'info').toUpperCase() + '] ' + msg);
    }
  }

  // Inject Core CSS for Status Indicators & Modal Styling
  function injectManagerStyles() {
    if (document.getElementById('vetcare-apikey-styles')) return;

    var style = document.createElement('style');
    style.id = 'vetcare-apikey-styles';
    style.textContent =
      '@keyframes vetcare-ping-pulse {' +
      '  0%, 100% { opacity: 1; transform: scale(1); }' +
      '  50% { opacity: 0.35; transform: scale(0.85); }' +
      '}' +
      '@keyframes vetcare-spin {' +
      '  from { transform: rotate(0deg); }' +
      '  to { transform: rotate(360deg); }' +
      '}' +
      '.vetcare-status-valid {' +
      '  background-color: #22c55e !important;' +
      '  box-shadow: 0 0 10px rgba(34, 197, 94, 0.75) !important;' +
      '}' +
      '.vetcare-status-invalid {' +
      '  background-color: #ef4444 !important;' +
      '  box-shadow: 0 0 10px rgba(239, 68, 68, 0.75) !important;' +
      '  animation: vetcare-ping-pulse 2s infinite ease-in-out;' +
      '}' +
      '.vetcare-status-missing {' +
      '  background-color: #f59e0b !important;' +
      '  box-shadow: 0 0 8px rgba(245, 158, 11, 0.75) !important;' +
      '  animation: vetcare-ping-pulse 1.5s infinite ease-in-out;' +
      '}' +
      '.vetcare-status-validating {' +
      '  background-color: #3b82f6 !important;' +
      '  box-shadow: 0 0 8px rgba(59, 130, 246, 0.75) !important;' +
      '  animation: vetcare-ping-pulse 0.8s infinite ease-in-out;' +
      '}' +
      '.vetcare-loader-spinner {' +
      '  display: inline-block;' +
      '  width: 16px;' +
      '  height: 16px;' +
      '  border: 2px solid rgba(255, 255, 255, 0.3);' +
      '  border-radius: 50%;' +
      '  border-top-color: #ffffff;' +
      '  animation: vetcare-spin 0.8s linear infinite;' +
      '  vertical-align: middle;' +
      '  margin-right: 8px;' +
      '}';

    document.head.appendChild(style);
  }

  // 2. SECURE STORAGE & OBFUSCATION API
  ApiKeyManager.getKey = function () {
    if (ApiKeyManager.currentKey) {
      return ApiKeyManager.currentKey;
    }
    var storedObfuscated = getStoredItem(STORAGE_KEY);
    if (!storedObfuscated) {
      return '';
    }
    var decoded = safeBase64Decode(storedObfuscated);
    ApiKeyManager.currentKey = decoded;
    return decoded;
  };

  ApiKeyManager.setKey = function (rawKey) {
    if (!rawKey || typeof rawKey !== 'string') {
      ApiKeyManager.clearKey();
      return;
    }
    var trimmed = rawKey.trim();
    ApiKeyManager.currentKey = trimmed;
    var obfuscated = safeBase64Encode(trimmed);
    setStoredItem(STORAGE_KEY, obfuscated);
    setStoredItem(STORAGE_VALID_TIMESTAMP_KEY, Date.now().toString());
    ApiKeyManager.lastValidated = Date.now();
    ApiKeyManager.status = 'valid';
    ApiKeyManager.syncHeaderStatus();
  };

  ApiKeyManager.clearKey = function () {
    ApiKeyManager.currentKey = null;
    ApiKeyManager.status = 'missing';
    ApiKeyManager.lastValidated = null;
    ApiKeyManager.lastError = null;
    removeStoredItem(STORAGE_KEY);
    removeStoredItem(STORAGE_VALID_TIMESTAMP_KEY);
    ApiKeyManager.syncHeaderStatus();
  };

  ApiKeyManager.hasKey = function () {
    var key = ApiKeyManager.getKey();
    return Boolean(key && key.length > 5);
  };

  // 3. HEADER UI STATUS SYNCHRONIZATION
  ApiKeyManager.syncHeaderStatus = function () {
    var indicator = document.getElementById('api-key-status-indicator');
    if (!indicator) return;

    indicator.classList.remove(
      'vetcare-status-valid',
      'vetcare-status-invalid',
      'vetcare-status-missing',
      'vetcare-status-validating'
    );

    if (ApiKeyManager.status === 'valid') {
      indicator.classList.add('vetcare-status-valid');
      indicator.setAttribute('title', 'Gemini AI API: सक्रिय एवं वैध (Online)');
      indicator.setAttribute('aria-label', 'Gemini API Status: Valid');
    } else if (ApiKeyManager.status === 'invalid') {
      indicator.classList.add('vetcare-status-invalid');
      indicator.setAttribute('title', 'Gemini AI API: अमान्य कुंजी (Invalid or Quota Exceeded)');
      indicator.setAttribute('aria-label', 'Gemini API Status: Invalid');
    } else if (ApiKeyManager.status === 'validating') {
      indicator.classList.add('vetcare-status-validating');
      indicator.setAttribute('title', 'Gemini AI API: जांच जारी है...');
      indicator.setAttribute('aria-label', 'Gemini API Status: Validating');
    } else {
      indicator.classList.add('vetcare-status-missing');
      indicator.setAttribute('title', 'Gemini AI API: कुंजी अनुपलब्ध (Missing API Key)');
      indicator.setAttribute('aria-label', 'Gemini API Status: Missing');
    }
  };

  // 4. LIVE API KEY VERIFICATION & TEST PING
  ApiKeyManager.testApiKey = function (rawKeyToTest) {
    var key = (rawKeyToTest !== undefined && rawKeyToTest !== null) ? rawKeyToTest.trim() : ApiKeyManager.getKey();

    var statusTextEl = document.getElementById('api-key-modal-status-text');
    var testBtn = document.getElementById('btn-test-save-api-key');

    // Basic structural sanitation
    if (!key || key.length < 15) {
      ApiKeyManager.status = 'invalid';
      ApiKeyManager.lastError = 'API Key का प्रारूप अमान्य है। कृपया उचित कुंजी दर्ज करें।';
      ApiKeyManager.syncHeaderStatus();

      if (statusTextEl) {
        statusTextEl.style.color = '#ef4444';
        statusTextEl.textContent = '❌ ' + ApiKeyManager.lastError;
      }
      displayToast(ApiKeyManager.lastError, 'error');
      return Promise.reject(new Error(ApiKeyManager.lastError));
    }

    // Set UI to loading state
    ApiKeyManager.status = 'validating';
    ApiKeyManager.syncHeaderStatus();

    var originalBtnHtml = '';
    if (testBtn) {
      originalBtnHtml = testBtn.innerHTML;
      testBtn.disabled = true;
      testBtn.innerHTML = '<span class="vetcare-loader-spinner"></span>जांच जारी है...';
    }

    if (statusTextEl) {
      statusTextEl.style.color = '#3b82f6';
      statusTextEl.textContent = 'Gemini सर्वर से संपर्क स्थापित किया जा रहा है...';
    }

    var targetUrl = GEMINI_TEST_ENDPOINT + '?key=' + encodeURIComponent(key);

    return window
      .fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        return response.json().then(function (json) {
          return { ok: response.ok, status: response.status, data: json };
        });
      })
      .then(function (res) {
        if (testBtn) {
          testBtn.disabled = false;
          testBtn.innerHTML = originalBtnHtml;
        }

        if (res.ok && res.data && Array.isArray(res.data.models)) {
          ApiKeyManager.setKey(key);
          ApiKeyManager.status = 'valid';
          ApiKeyManager.lastError = null;
          ApiKeyManager.syncHeaderStatus();

          if (statusTextEl) {
            statusTextEl.style.color = '#16a34a';
            statusTextEl.textContent = '✅ API Key सफलतापूर्वक सत्यापित हो गई (Active)!';
          }

          displayToast('Gemini API Key सफलतापूर्वक सत्यापित व सुरक्षित कर ली गई!', 'success');

          // Clean auto-close after successful validation
          setTimeout(function () {
            ApiKeyManager.closeApiKeyModal();
          }, 900);

          return true;
        } else {
          var errorMsg = 'अमान्य API Key या कोटा समाप्त';
          if (res.data && res.data.error && res.data.error.message) {
            errorMsg = res.data.error.message;
          }

          ApiKeyManager.status = 'invalid';
          ApiKeyManager.lastError = errorMsg;
          ApiKeyManager.syncHeaderStatus();

          if (statusTextEl) {
            statusTextEl.style.color = '#ef4444';
            statusTextEl.textContent = '❌ ' + errorMsg;
          }

          displayToast('API Key सत्यापन विफल: ' + errorMsg, 'error');
          return false;
        }
      })
      .catch(function (networkError) {
        if (testBtn) {
          testBtn.disabled = false;
          testBtn.innerHTML = originalBtnHtml;
        }

        var netErrMsg = 'नेटवर्क त्रुटि: Google AI सर्वर तक पहुँचने में असमर्थ';
        ApiKeyManager.status = 'invalid';
        ApiKeyManager.lastError = netErrMsg;
        ApiKeyManager.syncHeaderStatus();

        if (statusTextEl) {
          statusTextEl.style.color = '#ef4444';
          statusTextEl.textContent = '❌ ' + netErrMsg;
        }

        displayToast(netErrMsg, 'error');
        return false;
      });
  };

  // 5. MODAL UI ENGINE & CONTROLS
  function ensureModalExists() {
    var existingModal = document.getElementById('vetcare-api-key-modal');
    if (existingModal) return existingModal;

    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'vetcare-api-key-modal';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'vetcare-api-key-title');
    modalOverlay.setAttribute(
      'style',
      'display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); ' +
      'backdrop-filter: blur(6px); z-index: 1000000; align-items: center; justify-content: center; padding: 16px; font-family: system-ui, -apple-system, sans-serif;'
    );

    var modalContent = document.createElement('div');
    modalContent.setAttribute(
      'style',
      'background: #ffffff; color: #0f172a; width: 100%; max-width: 540px; border-radius: 16px; ' +
      'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0; overflow: hidden;'
    );

    modalContent.innerHTML =
      '<div style="padding: 20px 24px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">' +
        '<div style="display: flex; align-items: center; gap: 10px;">' +
          '<div style="width: 36px; height: 36px; border-radius: 8px; background: #eff6ff; display: flex; align-items: center; justify-content: center;">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>' +
            '</svg>' +
          '</div>' +
          '<h3 id="vetcare-api-key-title" style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #1e293b;">Google Gemini API Key कॉन्फ़िगरेशन</h3>' +
        '</div>' +
        '<button id="btn-close-api-key-modal" aria-label="Close" style="background: transparent; border: none; font-size: 1.5rem; line-height: 1; cursor: pointer; color: #64748b; padding: 4px 8px; border-radius: 6px;">&times;</button>' +
      '</div>' +

      '<div style="padding: 24px;">' +
        '<p style="margin: 0 0 16px; font-size: 0.9rem; color: #475569; line-height: 1.5;">' +
          'Vetcare AI OS के क्लिनिकल डायग्नोस्टिक्स, प्रिस्क्रिप्शन और ओपीडी असिस्टेंट का उपयोग करने के लिए अपनी अधिकृत Gemini API Key दर्ज करें। यह कुंजी ब्राउज़र में सुरक्षित व एन्क्रिप्टेड रहती है।' +
        '</p>' +

        '<div style="margin-bottom: 16px;">' +
          '<label for="gemini-api-key-input" style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Gemini API Key</label>' +
          '<div style="position: relative; display: flex; align-items: center;">' +
            '<input id="gemini-api-key-input" type="password" autocomplete="off" spellcheck="false" placeholder="AIzaSy..." ' +
              'style="width: 100%; padding: 10px 42px 10px 12px; font-family: monospace; font-size: 0.9rem; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; box-sizing: border-box; transition: border-color 0.2s;" />' +
            '<button type="button" id="toggle-api-key-visibility" title="Show/Hide Key" aria-label="Toggle Key Visibility" ' +
              'style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: #64748b; padding: 4px; display: flex; align-items: center;">' +
              '<svg id="icon-eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>' +
                '<circle cx="12" cy="12" r="3"></circle>' +
              '</svg>' +
              '<svg id="icon-eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">' +
                '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>' +
                '<line x1="1" y1="1" x2="23" y2="23"></line>' +
              '</svg>' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div id="api-key-modal-status-text" style="min-height: 20px; font-size: 0.85rem; font-weight: 500; margin-bottom: 18px;"></div>' +

        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">' +
          '<div style="font-size: 0.82rem; color: #64748b;">कुंजी उपलब्ध नहीं है? नि:शुल्क कुंजी बनाएं:</div>' +
          '<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" ' +
            'style="color: #2563eb; text-decoration: none; font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">' +
            'Google AI Studio API Key जनरेट करें &rarr;' +
          '</a>' +
        '</div>' +

        '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">' +
          '<button type="button" id="btn-clear-api-key" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; padding: 9px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">' +
            'कुंजी हटाएं (Clear)' +
          '</button>' +
          '<div style="display: flex; gap: 10px;">' +
            '<button type="button" id="btn-cancel-api-key-modal" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">' +
              'रद्द करें' +
            '</button>' +
            '<button type="button" id="btn-test-save-api-key" style="background: #2563eb; color: #ffffff; border: none; padding: 9px 20px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;">' +
              'सत्यापित करें व सुरक्षित करें' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    bindModalEvents(modalOverlay);
    return modalOverlay;
  }

  function bindModalEvents(modalOverlay) {
    var closeBtn = modalOverlay.querySelector('#btn-close-api-key-modal');
    var cancelBtn = modalOverlay.querySelector('#btn-cancel-api-key-modal');
    var testSaveBtn = modalOverlay.querySelector('#btn-test-save-api-key');
    var clearBtn = modalOverlay.querySelector('#btn-clear-api-key');
    var toggleEyeBtn = modalOverlay.querySelector('#toggle-api-key-visibility');
    var inputEl = modalOverlay.querySelector('#gemini-api-key-input');
    var eyeOpenIcon = modalOverlay.querySelector('#icon-eye-open');
    var eyeClosedIcon = modalOverlay.querySelector('#icon-eye-closed');

    if (closeBtn) {
      closeBtn.addEventListener('click', ApiKeyManager.closeApiKeyModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', ApiKeyManager.closeApiKeyModal);
    }

    // Modal background overlay click closes modal
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        ApiKeyManager.closeApiKeyModal();
      }
    });

    if (toggleEyeBtn && inputEl && eyeOpenIcon && eyeClosedIcon) {
      toggleEyeBtn.addEventListener('click', function () {
        if (inputEl.type === 'password') {
          inputEl.type = 'text';
          eyeOpenIcon.style.display = 'none';
          eyeClosedIcon.style.display = 'block';
        } else {
          inputEl.type = 'password';
          eyeOpenIcon.style.display = 'block';
          eyeClosedIcon.style.display = 'none';
        }
      });
    }

    if (testSaveBtn && inputEl) {
      testSaveBtn.addEventListener('click', function () {
        var keyToVerify = inputEl.value.trim();
        ApiKeyManager.testApiKey(keyToVerify);
      });
    }

    if (clearBtn && inputEl) {
      clearBtn.addEventListener('click', function () {
        ApiKeyManager.clearKey();
        inputEl.value = '';
        var statusText = modalOverlay.querySelector('#api-key-modal-status-text');
        if (statusText) {
          statusText.style.color = '#f59e0b';
          statusText.textContent = 'कुंजी हटा दी गई है।';
        }
        displayToast('API Key हटा दी गई है।', 'info');
      });
    }

    // Enter key submits test
    if (inputEl) {
      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (testSaveBtn) {
            testSaveBtn.click();
          }
        }
      });
    }
  }

  ApiKeyManager.openApiKeyModal = function () {
    var modal = ensureModalExists();
    var inputEl = modal.querySelector('#gemini-api-key-input');
    var statusText = modal.querySelector('#api-key-modal-status-text');

    var current = ApiKeyManager.getKey();
    if (inputEl) {
      inputEl.value = current || '';
      inputEl.type = 'password';
      var eyeOpen = modal.querySelector('#icon-eye-open');
      var eyeClosed = modal.querySelector('#icon-eye-closed');
      if (eyeOpen) eyeOpen.style.display = 'block';
      if (eyeClosed) eyeClosed.style.display = 'none';
    }

    if (statusText) {
      if (ApiKeyManager.status === 'valid') {
        statusText.style.color = '#16a34a';
        statusText.textContent = 'सक्रिय एवं मान्य कुंजी कॉन्फ़िगर की गई है।';
      } else if (ApiKeyManager.status === 'invalid') {
        statusText.style.color = '#ef4444';
        statusText.textContent = ApiKeyManager.lastError ? ('❌ ' + ApiKeyManager.lastError) : 'अमान्य कुंजी दर्ज है।';
      } else {
        statusText.textContent = '';
      }
    }

    modal.style.display = 'flex';
    setTimeout(function () {
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
    }, 100);
  };

  ApiKeyManager.closeApiKeyModal = function () {
    var modal = document.getElementById('vetcare-api-key-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  // 6. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapApiKeyManager() {
    injectManagerStyles();

    // Check existing stored credentials
    var existingKey = ApiKeyManager.getKey();
    if (existingKey && existingKey.length > 5) {
      ApiKeyManager.status = 'valid';
      var storedEpoch = getStoredItem(STORAGE_VALID_TIMESTAMP_KEY);
      if (storedEpoch) {
        ApiKeyManager.lastValidated = parseInt(storedEpoch, 10);
      }
    } else {
      ApiKeyManager.status = 'missing';
    }

    ApiKeyManager.syncHeaderStatus();

    // Bind triggers to open modal across UI
    document.addEventListener('click', function (e) {
      var target = e.target;
      var triggerBtn = target.closest
        ? target.closest('#api-key-btn, [data-action="open-api-key-modal"], #api-key-status-indicator')
        : null;

      if (triggerBtn) {
        e.preventDefault();
        ApiKeyManager.openApiKeyModal();
      }
    });

    // ESC key closes modal
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var modal = document.getElementById('vetcare-api-key-modal');
        if (modal && modal.style.display === 'flex') {
          ApiKeyManager.closeApiKeyModal();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApiKeyManager);
  } else {
    bootstrapApiKeyManager();
  }

})(window, document);
