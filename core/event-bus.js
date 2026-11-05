// Vetcare AI OS - Publish/Subscribe Event Bus, Decoupled Messaging & System Event Dispatcher (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var MAX_HISTORY_SIZE = 50;
  var tokenCounter = 0;

  var SYSTEM_EVENTS = {
    AUTH_STATE_CHANGED: 'auth:state-changed',
    PREGNANCY_ALERT: 'clinical:pregnancy-alert',
    DOSAGE_CALCULATED: 'clinical:dosage-calculated',
    PATIENT_SELECTED: 'clinical:patient-selected',
    OFFLINE_TOGGLED: 'network:offline-toggled',
    DATA_SYNCED: 'sync:completed',
    THEME_CHANGED: 'theme:changed',
    LANGUAGE_CHANGED: 'i18n:language-changed'
  };

  var EventBus = {
    topics: {}, // Map of eventName -> Array of subscriber objects
    eventHistory: [], // Ring buffer of last 50 events
    debug: false,
    EVENTS: SYSTEM_EVENTS
  };

  window.VetcareApp.EventBus = EventBus;

  // Generate Unique Subscription Token
  function generateToken() {
    tokenCounter += 1;
    return 'sub_token_' + Date.now() + '_' + tokenCounter;
  }

  // 2. CORE PUB/SUB METHODS
  EventBus.on = function (eventName, callback, options) {
    if (!eventName || typeof eventName !== 'string') {
      console.error('[Vetcare EventBus] Subscription failed: Invalid eventName provided.');
      return null;
    }

    if (typeof callback !== 'function') {
      console.error('[Vetcare EventBus] Subscription failed: Callback must be a function.');
      return null;
    }

    var opts = options || {};
    var priority = typeof opts.priority === 'number' ? opts.priority : 0;
    var once = Boolean(opts.once);
    var token = generateToken();

    var subscriber = {
      token: token,
      callback: callback,
      priority: priority,
      once: once
    };

    if (!EventBus.topics[eventName]) {
      EventBus.topics[eventName] = [];
    }

    EventBus.topics[eventName].push(subscriber);

    // Sort subscribers in descending order of priority (higher numbers execute first)
    EventBus.topics[eventName].sort(function (a, b) {
      return b.priority - a.priority;
    });

    if (EventBus.debug) {
      console.log('[Vetcare EventBus] Subscribed:', eventName, '| Token:', token, '| Priority:', priority);
    }

    return token;
  };

  EventBus.once = function (eventName, callback, options) {
    var opts = Object.assign({}, options, { once: true });
    return EventBus.on(eventName, callback, opts);
  };

  EventBus.off = function (eventName, callbackOrToken) {
    if (!callbackOrToken) {
      // If only eventName provided, clear entire topic
      if (eventName && EventBus.topics[eventName]) {
        delete EventBus.topics[eventName];
        return true;
      }
      return false;
    }

    var targetTopic = eventName;

    // If eventName is omitted or null, search across all topics by token
    if (!targetTopic) {
      var found = false;
      var topicKeys = Object.keys(EventBus.topics);
      for (var k = 0; k < topicKeys.length; k++) {
        var key = topicKeys[k];
        var countBefore = EventBus.topics[key].length;
        EventBus.topics[key] = EventBus.topics[key].filter(function (sub) {
          return sub.token !== callbackOrToken && sub.callback !== callbackOrToken;
        });
        if (EventBus.topics[key].length < countBefore) {
          found = true;
          if (EventBus.topics[key].length === 0) {
            delete EventBus.topics[key];
          }
        }
      }
      return found;
    }

    if (!EventBus.topics[targetTopic]) {
      return false;
    }

    var initialLength = EventBus.topics[targetTopic].length;
    EventBus.topics[targetTopic] = EventBus.topics[targetTopic].filter(function (sub) {
      return sub.token !== callbackOrToken && sub.callback !== callbackOrToken;
    });

    var removed = EventBus.topics[targetTopic].length < initialLength;

    if (EventBus.topics[targetTopic].length === 0) {
      delete EventBus.topics[targetTopic];
    }

    if (EventBus.debug && removed) {
      console.log('[Vetcare EventBus] Unsubscribed from topic:', targetTopic, '| Identifier:', callbackOrToken);
    }

    return removed;
  };

  EventBus.emit = function (eventName, data) {
    if (!eventName || typeof eventName !== 'string') {
      console.error('[Vetcare EventBus] Dispatch failed: Invalid eventName provided.');
      return false;
    }

    var payload = data !== undefined ? data : {};
    var timestamp = Date.now();

    // 1. Record to internal audit ring buffer (maximum 50 entries)
    EventBus.eventHistory.push({
      eventName: eventName,
      data: payload,
      timestamp: timestamp
    });

    if (EventBus.eventHistory.length > MAX_HISTORY_SIZE) {
      EventBus.eventHistory.shift();
    }

    if (EventBus.debug) {
      console.log('[Vetcare EventBus] Dispatched event:', eventName, '| Payload:', payload);
    }

    // 2. Gather matching listeners (specific topic + wildcard '*')
    var directSubscribers = EventBus.topics[eventName] ? EventBus.topics[eventName].slice() : [];
    var wildcardSubscribers = EventBus.topics['*'] ? EventBus.topics['*'].slice() : [];
    var allSubscribers = directSubscribers.concat(wildcardSubscribers);

    var tokensToRemove = [];

    // 3. Sequential defensive execution
    for (var i = 0; i < allSubscribers.length; i++) {
      var sub = allSubscribers[i];
      try {
        sub.callback(payload, eventName);
      } catch (subscriberError) {
        console.error(
          '[Vetcare EventBus] Subscriber error caught on topic "' + eventName + '":',
          subscriberError
        );
      }

      if (sub.once) {
        tokensToRemove.push(sub.token);
      }
    }

    // 4. Clean up one-time subscribers
    for (var j = 0; j < tokensToRemove.length; j++) {
      EventBus.off(null, tokensToRemove[j]);
    }

    // 5. Also dispatch browser-native CustomEvent for modular external components
    if (typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent(eventName, {
          detail: payload
        }));
      } catch (ceErr) {
        // Fallback for legacy environments
        var legacyEvt = document.createEvent('CustomEvent');
        legacyEvt.initCustomEvent(eventName, false, false, payload);
        window.dispatchEvent(legacyEvt);
      }
    }

    return true;
  };

  // 3. DIAGNOSTICS & AUDIT UTILITIES
  EventBus.getEventHistory = function () {
    return EventBus.eventHistory.slice();
  };

  EventBus.clearListeners = function (eventName) {
    if (eventName && typeof eventName === 'string') {
      if (EventBus.topics[eventName]) {
        delete EventBus.topics[eventName];
        if (EventBus.debug) {
          console.log('[Vetcare EventBus] Cleared all listeners for topic:', eventName);
        }
        return true;
      }
      return false;
    }

    EventBus.topics = {};
    if (EventBus.debug) {
      console.log('[Vetcare EventBus] Cleared all listeners across all topics.');
    }
    return true;
  };

  EventBus.setDebug = function (enabled) {
    EventBus.debug = Boolean(enabled);
    console.log('[Vetcare EventBus] Debug mode set to:', EventBus.debug);
  };

  // 4. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapEventBus() {
    console.log(
      '[Vetcare EventBus] Core Reactive Messaging Engine Initialized | Active Topics:',
      Object.keys(EventBus.topics).length
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapEventBus);
  } else {
    bootstrapEventBus();
  }

})(window, document);
