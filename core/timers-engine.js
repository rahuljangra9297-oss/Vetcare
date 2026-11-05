// Vetcare AI OS - Session Lifecycle, 60m Inactivity Timer & 24h Free Trial Countdown Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var SESSION_DURATION_SECONDS = 3600; // 60 minutes
  var SESSION_WARNING_THRESHOLD_SECONDS = 300; // 5 minutes
  var TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours
  var THROTTLE_DELAY_MS = 2000; // Throttle user interaction listener to 2 seconds

  var Timers = {
    sessionStartEpoch: Date.now(),
    remainingSessionSec: SESSION_DURATION_SECONDS,
    trialEndTimestamp: 0,
    sessionIntervalId: null,
    trialIntervalId: null,
    warningFired: false,
    isTrialExpired: false,
    isSessionExpired: false,
    lastInteractionEpoch: Date.now(),
    lastThrottleCheck: 0
  };

  window.VetcareApp.Timers = Timers;

  // Safe localStorage Access Utilities
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare Timers] LocalStorage read access blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare Timers] LocalStorage write access blocked:', e);
    }
  }

  // Toast Notification Dispatcher
  function displayToast(message, type) {
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type);
    } else {
      console.log('[' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Format MM:SS for Session Timer
  function formatSessionTime(seconds) {
    var clampedSec = Math.max(0, Math.floor(seconds));
    var mins = Math.floor(clampedSec / 60);
    var secs = clampedSec % 60;
    var formattedMins = mins < 10 ? '0' + mins : mins;
    var formattedSecs = secs < 10 ? '0' + secs : secs;
    return 'सत्र: ' + formattedMins + ':' + formattedSecs;
  }

  // Format HH:MM:SS for Free Trial Countdown
  function formatTrialTime(remainingMs) {
    var totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    var hh = hours < 10 ? '0' + hours : hours;
    var mm = minutes < 10 ? '0' + minutes : minutes;
    var ss = seconds < 10 ? '0' + seconds : seconds;

    return 'ट्रायल: ' + hh + ':' + mm + ':' + ss;
  }

  // 2. 60-MINUTE SESSION & INACTIVITY CONTROLLER
  Timers.startSessionTimer = function () {
    if (Timers.sessionIntervalId) {
      clearInterval(Timers.sessionIntervalId);
    }

    Timers.isSessionExpired = false;
    Timers.sessionStartEpoch = Date.now();

    function updateSessionTick() {
      Timers.remainingSessionSec -= 1;

      // Update UI Navigation Badge
      var badge = document.getElementById('session-timer-badge');
      if (badge) {
        badge.textContent = formatSessionTime(Timers.remainingSessionSec);
      }

      // 5-Minute Warning Toast (300 Seconds)
      if (Timers.remainingSessionSec === SESSION_WARNING_THRESHOLD_SECONDS && !Timers.warningFired) {
        Timers.warningFired = true;
        displayToast('सत्र समाप्त होने में 5 मिनट शेष हैं!', 'warning');
      }

      // Session Expiry Handling
      if (Timers.remainingSessionSec <= 0) {
        Timers.remainingSessionSec = 0;
        Timers.isSessionExpired = true;
        clearInterval(Timers.sessionIntervalId);
        Timers.sessionIntervalId = null;

        if (badge) {
          badge.textContent = 'सत्र: 00:00 (समाप्त)';
        }

        displayToast('सत्र समाप्त हो गया है! कृपया पुनः लॉगिन करें।', 'error');

        // Execute system logout if available
        if (window.VetcareApp.Auth && typeof window.VetcareApp.Auth.logout === 'function') {
          window.VetcareApp.Auth.logout();
        } else {
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        }
      }
    }

    // Immediate initial sync
    var sessionBadge = document.getElementById('session-timer-badge');
    if (sessionBadge) {
      sessionBadge.textContent = formatSessionTime(Timers.remainingSessionSec);
    }

    Timers.sessionIntervalId = setInterval(updateSessionTick, 1000);
  };

  Timers.resetSessionTimer = function () {
    if (Timers.isSessionExpired) {
      return;
    }
    Timers.remainingSessionSec = SESSION_DURATION_SECONDS;
    Timers.warningFired = false;
    Timers.lastInteractionEpoch = Date.now();

    var badge = document.getElementById('session-timer-badge');
    if (badge) {
      badge.textContent = formatSessionTime(Timers.remainingSessionSec);
    }
  };

  // Throttled User Activity Handlers
  function handleUserInteraction() {
    var now = Date.now();
    if (now - Timers.lastThrottleCheck > THROTTLE_DELAY_MS) {
      Timers.lastThrottleCheck = now;
      Timers.resetSessionTimer();
    }
  }

  function bindInteractionListeners() {
    var events = ['mousemove', 'keydown', 'touchstart', 'scroll'];
    for (var i = 0; i < events.length; i++) {
      window.addEventListener(events[i], handleUserInteraction, { passive: true });
    }
  }

  // 3. 24-HOUR FREE TRIAL COUNTDOWN ENGINE
  function isTrialBypassed() {
    var activeSub = safeStorageGet('vetcare_subscription_active');
    var userRole = safeStorageGet('vetcare_user_role');

    if (activeSub === 'true') {
      return true;
    }

    if (userRole === 'admin') {
      return true;
    }

    if (window.VetcareApp.currentUser && window.VetcareApp.currentUser.role === 'admin') {
      return true;
    }

    return false;
  }

  function renderTrialExpiredModal() {
    var existingModal = document.getElementById('vetcare-trial-expired-modal');
    if (existingModal) {
      existingModal.style.display = 'flex';
      return;
    }

    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'vetcare-trial-expired-modal';
    modalOverlay.setAttribute(
      'style',
      'position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); ' +
      'display: flex; align-items: center; justify-content: center; z-index: 999999; padding: 20px; font-family: system-ui, -apple-system, sans-serif;'
    );

    var card = document.createElement('div');
    card.setAttribute(
      'style',
      'background: #ffffff; color: #0f172a; max-width: 500px; width: 100%; border-radius: 16px; ' +
      'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; text-align: center; border: 1px solid #e2e8f0;'
    );

    card.innerHTML =
      '<div style="width: 64px; height: 64px; margin: 0 auto 16px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="12" cy="12" r="10"></circle>' +
          '<polyline points="12 6 12 12 16 14"></polyline>' +
        '</svg>' +
      '</div>' +
      '<h2 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 10px; color: #1e293b;">निःशुल्क ट्रायल समाप्त (Trial Expired)</h2>' +
      '<p style="color: #64748b; font-size: 0.95rem; line-height: 1.5; margin: 0 0 24px;">' +
        'आपका 24 घंटे का Vetcare AI OS फ्री ट्रायल समाप्त हो गया है। AI डायग्नोस्टिक्स, ओपीडी (OPD) इंजन और अन्य उन्नत सुविधाओं का निरंतर उपयोग जारी रखने के लिए अपनी सदस्यता को अपग्रेड करें।' +
      '</p>' +
      '<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">' +
        '<button id="vetcare-btn-pricing" style="background: #2563eb; color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.2s;">' +
          'सब्सक्रिप्शन अपग्रेड करें (Upgrade Plan)' +
        '</button>' +
        '<button id="vetcare-btn-contact-support" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 20px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer;">' +
          'सहायता केंद्र (Contact)' +
        '</button>' +
      '</div>';

    modalOverlay.appendChild(card);
    document.body.appendChild(modalOverlay);

    var upgradeBtn = document.getElementById('vetcare-btn-pricing');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', function () {
        if (window.VetcareApp.Navigation && typeof window.VetcareApp.Navigation.navigate === 'function') {
          window.VetcareApp.Navigation.navigate('pricing');
        } else {
          window.location.hash = '#/pricing';
        }
      });
    }

    var supportBtn = document.getElementById('vetcare-btn-contact-support');
    if (supportBtn) {
      supportBtn.addEventListener('click', function () {
        displayToast('सपोर्ट टीम से संपर्क: support@vetcare.ai', 'info');
      });
    }
  }

  function applyFeatureRestrictions() {
    if (isTrialBypassed()) {
      return;
    }

    // Intercept clicks on premium AI tools and OPD diagnostic views
    var premiumSelectors = [
      '[data-feature="ai-diagnostics"]',
      '[data-feature="opd-engine"]',
      '.vetcare-premium-tool',
      '#btn-ai-diagnose',
      '#btn-opd-rx-generate'
    ];

    document.querySelectorAll(premiumSelectors.join(',')).forEach(function (el) {
      if (!el.dataset.trialGuarded) {
        el.dataset.trialGuarded = 'true';
        el.addEventListener('click', function (e) {
          if (Timers.isTrialExpired && !isTrialBypassed()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            renderTrialExpiredModal();
          }
        }, true);
      }
    });
  }

  Timers.checkTrialStatus = function () {
    var bypassed = isTrialBypassed();
    var now = Date.now();
    var remainingMs = Math.max(0, Timers.trialEndTimestamp - now);
    var isExpired = !bypassed && remainingMs <= 0;

    return {
      isExpired: isExpired,
      isBypassed: bypassed,
      remainingMs: remainingMs,
      formatted: bypassed ? 'प्रीमियम सक्रिय' : (isExpired ? 'ट्रायल समाप्त' : formatTrialTime(remainingMs))
    };
  };

  Timers.initTrialCountdown = function () {
    if (Timers.trialIntervalId) {
      clearInterval(Timers.trialIntervalId);
    }

    var storedStart = safeStorageGet('vetcare_trial_start');
    var storedEnd = safeStorageGet('vetcare_trial_end');
    var now = Date.now();

    if (!storedStart) {
      storedStart = now.toString();
      safeStorageSet('vetcare_trial_start', storedStart);
    }

    if (!storedEnd) {
      var calculatedEnd = parseInt(storedStart, 10) + TRIAL_DURATION_MS;
      storedEnd = calculatedEnd.toString();
      safeStorageSet('vetcare_trial_end', storedEnd);
    }

    Timers.trialEndTimestamp = parseInt(storedEnd, 10);

    function updateTrialTick() {
      var status = Timers.checkTrialStatus();
      var badge = document.getElementById('trial-timer-badge');

      if (status.isBypassed) {
        Timers.isTrialExpired = false;
        if (badge) {
          badge.textContent = 'सक्रिय लाइसेंस';
          badge.classList.remove('trial-warning', 'trial-expired');
          badge.classList.add('trial-bypassed');
        }
        return;
      }

      if (status.isExpired) {
        Timers.isTrialExpired = true;
        if (badge) {
          badge.textContent = 'ट्रायल समाप्त';
          badge.classList.add('trial-expired');
        }
        clearInterval(Timers.trialIntervalId);
        Timers.trialIntervalId = null;
        applyFeatureRestrictions();
        renderTrialExpiredModal();
        return;
      }

      Timers.isTrialExpired = false;
      if (badge) {
        badge.textContent = status.formatted;
      }
    }

    // Initial render
    updateTrialTick();

    // Guard dynamic interactive tools immediately
    applyFeatureRestrictions();

    // Run interval only if not already expired/bypassed
    var initialCheck = Timers.checkTrialStatus();
    if (!initialCheck.isExpired && !initialCheck.isBypassed) {
      Timers.trialIntervalId = setInterval(updateTrialTick, 1000);
    }
  };

  Timers.extendTrial = function (hours) {
    var validHours = parseFloat(hours);
    if (isNaN(validHours) || validHours <= 0) {
      console.error('[Vetcare Timers] Invalid extension duration provided.');
      return false;
    }

    var addedMs = validHours * 60 * 60 * 1000;
    var currentBase = Math.max(Date.now(), Timers.trialEndTimestamp);
    var updatedExpiry = currentBase + addedMs;

    Timers.trialEndTimestamp = updatedExpiry;
    safeStorageSet('vetcare_trial_end', updatedExpiry.toString());
    Timers.isTrialExpired = false;

    // Remove expired modal if currently rendered
    var existingModal = document.getElementById('vetcare-trial-expired-modal');
    if (existingModal) {
      existingModal.remove();
    }

    displayToast('ट्रायल को ' + validHours + ' घंटे बढ़ा दिया गया है।', 'success');

    // Restart countdown
    Timers.initTrialCountdown();
    return true;
  };

  // 4. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapTimersEngine() {
    Timers.startSessionTimer();
    Timers.initTrialCountdown();
    bindInteractionListeners();

    // Re-verify restrictions on dynamic DOM modifications
    if (window.MutationObserver) {
      var observer = new MutationObserver(function () {
        if (Timers.isTrialExpired && !isTrialBypassed()) {
          applyFeatureRestrictions();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapTimersEngine);
  } else {
    bootstrapTimersEngine();
  }

})(window, document);
