// Vetcare AI OS - Global Reactive State Manager, Store Reducer & Session Cache (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var MAX_ACTION_HISTORY = 30;
  var STORAGE_USER_KEY = 'vetcare_state_user';
  var STORAGE_SYSTEM_KEY = 'vetcare_state_system';

  // Comprehensive Default Blueprints
  var INITIAL_USER = {
    role: 'guest', // 'guest' | 'doctor' | 'farmer' | 'admin'
    phone: '',
    token: null,
    isAuthenticated: false,
    profile: {}
  };

  var INITIAL_PATIENT = {
    id: null,
    species: 'bovine', // 'bovine' | 'buffalo' | 'caprine' | 'ovine' | 'canine' | 'equine'
    breed: '',
    ageMonths: 0,
    weightKg: 0,
    isPregnant: false,
    pregnancyTrimester: null, // 1 | 2 | 3 | null
    tempFahrenheit: 101.5,
    ownerName: '',
    ownerPhone: ''
  };

  var INITIAL_ACTIVE_CASE = {
    caseId: null,
    symptoms: [],
    vitalSigns: {},
    suspectedDiseases: [],
    prescribedDrugs: [],
    clinicalNotes: '',
    labTests: [],
    images: [],
    voiceNoteUrl: null,
    createdAt: null
  };

  var INITIAL_SYSTEM = {
    isOnline: typeof navigator.onLine === 'boolean' ? navigator.onLine : true,
    isDataSaver: false,
    currentLang: 'hi',
    currentTheme: 'dark', // 'light' | 'dark'
    sunlightMode: false,
    paperSize: 'A4'
  };

  // Internal Immutable State Tree
  var _state = {
    user: Object.assign({}, INITIAL_USER),
    patient: Object.assign({}, INITIAL_PATIENT),
    activeCase: Object.assign({}, INITIAL_ACTIVE_CASE),
    system: Object.assign({}, INITIAL_SYSTEM)
  };

  var _subscribers = [];
  var _actionHistory = [];

  // Deep Clone Utility to Guarantee Immutability
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      console.warn('[Vetcare State] JSON clone fallback triggered:', e);
      var copy = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = deepClone(obj[key]);
        }
      }
      return copy;
    }
  }

  // Deep Merge Utility for Deterministic State Reductions
  function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;

    var output = Object.assign({}, target);
    var keys = Object.keys(source);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var sourceVal = source[key];
      var targetVal = target[key];

      if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
        output[key] = deepMerge(targetVal && typeof targetVal === 'object' ? targetVal : {}, sourceVal);
      } else {
        output[key] = deepClone(sourceVal);
      }
    }

    return output;
  }

  // Safe localStorage Wrappers
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare State] LocalStorage read blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare State] LocalStorage write blocked:', e);
    }
  }

  // Automatically Persist Core Slices to LocalStorage
  function persistCoreState() {
    safeStorageSet(STORAGE_USER_KEY, JSON.stringify(_state.user));
    safeStorageSet(STORAGE_SYSTEM_KEY, JSON.stringify(_state.system));
  }

  // Restore Slices on Startup
  function restorePersistedState() {
    var storedUser = safeStorageGet(STORAGE_USER_KEY);
    if (storedUser) {
      try {
        var parsedUser = JSON.parse(storedUser);
        _state.user = deepMerge(INITIAL_USER, parsedUser);
      } catch (err) {
        console.error('[Vetcare State] Corrupt user storage ignored:', err);
      }
    }

    var storedSystem = safeStorageGet(STORAGE_SYSTEM_KEY);
    if (storedSystem) {
      try {
        var parsedSystem = JSON.parse(storedSystem);
        _state.system = deepMerge(INITIAL_SYSTEM, parsedSystem);
      } catch (err2) {
        console.error('[Vetcare State] Corrupt system storage ignored:', err2);
      }
    }

    // Refresh live network flag
    _state.system.isOnline = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
  }

  // 2. CORE REACTIVE STORE API
  var State = {};

  State.getState = function () {
    return deepClone(_state);
  };

  State.setState = function (partialStateOrUpdater, actionName) {
    var action = actionName || 'ANONYMOUS_UPDATE';
    var nextPartial = null;

    if (typeof partialStateOrUpdater === 'function') {
      try {
        nextPartial = partialStateOrUpdater(deepClone(_state));
      } catch (err) {
        console.error('[Vetcare State] Reducer function threw an exception:', err);
        return State.getState();
      }
    } else if (partialStateOrUpdater && typeof partialStateOrUpdater === 'object') {
      nextPartial = partialStateOrUpdater;
    } else {
      console.warn('[Vetcare State] setState called with invalid payload:', partialStateOrUpdater);
      return State.getState();
    }

    if (!nextPartial) {
      return State.getState();
    }

    // Compute Next Deterministic State Tree
    _state = deepMerge(_state, nextPartial);

    // Record Action to Audit Log
    _actionHistory.push({
      action: action,
      timestamp: Date.now(),
      diffKeys: Object.keys(nextPartial)
    });

    if (_actionHistory.length > MAX_ACTION_HISTORY) {
      _actionHistory.shift();
    }

    // Automatic Storage Persistence
    persistCoreState();

    var currentStateSnapshot = State.getState();

    // 1. Notify Internal Reactive Subscribers
    for (var i = 0; i < _subscribers.length; i++) {
      try {
        _subscribers[i](currentStateSnapshot, action);
      } catch (subErr) {
        console.error('[Vetcare State] Subscriber notification failed:', subErr);
      }
    }

    // 2. Notify Global EventBus if available
    if (window.VetcareApp.EventBus && typeof window.VetcareApp.EventBus.emit === 'function') {
      window.VetcareApp.EventBus.emit('state:changed', {
        state: currentStateSnapshot,
        action: action
      });
    }

    // 3. Dispatch native CustomEvent for modular external components
    if (typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('vetcare:state-changed', {
          detail: { state: currentStateSnapshot, action: action }
        }));
      } catch (e) {}
    }

    return currentStateSnapshot;
  };

  State.subscribe = function (subscriberFn) {
    if (typeof subscriberFn !== 'function') {
      console.error('[Vetcare State] Subscriber must be a callable function.');
      return function () {};
    }

    _subscribers.push(subscriberFn);

    // Immediately trigger with current state snapshot upon subscription
    try {
      subscriberFn(State.getState(), 'INITIAL_SUBSCRIPTION');
    } catch (err) {
      console.error('[Vetcare State] Error in initial subscriber callback:', err);
    }

    // Return unsubscription teardown function
    return function unsubscribe() {
      _subscribers = _subscribers.filter(function (fn) {
        return fn !== subscriberFn;
      });
    };
  };

  // 3. SPECIALIZED DOMAIN ACTIONS
  State.setPatient = function (patientData) {
    var cleanPatient = deepMerge(INITIAL_PATIENT, patientData || {});

    // Automatically flag pregnancy clinical alerts
    if (cleanPatient.isPregnant && window.VetcareApp.EventBus) {
      window.VetcareApp.EventBus.emit('clinical:pregnancy-alert', {
        patientId: cleanPatient.id,
        species: cleanPatient.species,
        pregnancyTrimester: cleanPatient.pregnancyTrimester
      });
    }

    return State.setState({ patient: cleanPatient }, 'SET_PATIENT');
  };

  State.resetPatient = function () {
    return State.setState({ patient: deepClone(INITIAL_PATIENT) }, 'RESET_PATIENT');
  };

  State.updateActiveCase = function (caseUpdate) {
    var currentCase = deepClone(_state.activeCase);
    var updated = deepMerge(currentCase, caseUpdate || {});

    // Handle array appends if explicitly requested
    if (caseUpdate && Array.isArray(caseUpdate.appendSymptoms)) {
      var mergedSymptoms = (currentCase.symptoms || []).concat(caseUpdate.appendSymptoms);
      updated.symptoms = Array.from(new Set(mergedSymptoms));
    }

    if (caseUpdate && Array.isArray(caseUpdate.appendDrugs)) {
      updated.prescribedDrugs = (currentCase.prescribedDrugs || []).concat(caseUpdate.appendDrugs);
    }

    if (caseUpdate && Array.isArray(caseUpdate.appendImages)) {
      updated.images = (currentCase.images || []).concat(caseUpdate.appendImages);
    }

    if (!updated.createdAt) {
      updated.createdAt = Date.now();
    }

    return State.setState({ activeCase: updated }, 'UPDATE_ACTIVE_CASE');
  };

  State.resetActiveCase = function () {
    return State.setState({ activeCase: deepClone(INITIAL_ACTIVE_CASE) }, 'RESET_ACTIVE_CASE');
  };

  State.setUser = function (userData) {
    var mergedUser = deepMerge(INITIAL_USER, userData || {});
    return State.setState({ user: mergedUser }, 'SET_USER');
  };

  State.logoutUser = function () {
    safeStorageSet(STORAGE_USER_KEY, JSON.stringify(INITIAL_USER));
    return State.setState({ user: deepClone(INITIAL_USER) }, 'LOGOUT_USER');
  };

  State.setSystem = function (systemUpdate) {
    var mergedSystem = deepMerge(_state.system, systemUpdate || {});
    return State.setState({ system: mergedSystem }, 'SET_SYSTEM');
  };

  State.getActionHistory = function () {
    return deepClone(_actionHistory);
  };

  // Expose to Global Namespace
  window.VetcareApp.State = State;

  // 4. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapGlobalState() {
    restorePersistedState();

    // Synchronize network changes automatically into state.system
    window.addEventListener('online', function () {
      State.setSystem({ isOnline: true });
    });

    window.addEventListener('offline', function () {
      State.setSystem({ isOnline: false });
    });

    // Listen to DataSaver events from NetworkMonitor if available
    window.addEventListener('vetcare:data-saver-toggle', function (e) {
      if (e.detail && typeof e.detail.active === 'boolean') {
        State.setSystem({ isDataSaver: e.detail.active });
      }
    });

    console.log(
      '[Vetcare State] Global Reactive State Initialized | Role:',
      _state.user.role,
      '| Online:',
      _state.system.isOnline
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapGlobalState);
  } else {
    bootstrapGlobalState();
  }

})(window, document);
