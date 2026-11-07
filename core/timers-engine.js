let consultationTimer = {
  id: null,
  consultationId: null,
  startTime: 0,
  elapsedSeconds: 0,
  running: false,
  intervalRef: null,
  callbacks: new Set()
};

let autoSaveConfig = {
  intervalRef: null,
  intervalMs: 30000,
  syncHandler: null,
  lastSyncTimestamp: null,
  isSyncing: false
};

// -------------------------------------------------------------
// Audio Notification Synthesizer (Zero External Dependencies)
// -------------------------------------------------------------
const AudioNotifier = {
  playTone: function (frequency = 880, type = "sine", duration = 0.15) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);

      setTimeout(function () {
        if (audioCtx.state !== "closed") {
          audioCtx.close().catch(function () {});
        }
      }, Math.ceil((duration + 0.1) * 1000));
    } catch (e) {
      // Audio cues gracefully degrade if hardware or permissions are restricted
    }
  },

  alertPulse: function () {
    this.playTone(880, "sine", 0.12);
    setTimeout(() => this.playTone(1174.66, "sine", 0.18), 140);
  },

  warningPulse: function () {
    this.playTone(523.25, "triangle", 0.2);
    setTimeout(() => this.playTone(493.88, "triangle", 0.3), 220);
  }
};

// -------------------------------------------------------------
// SECTION 1: PERMANENT LIFETIME ACCESS & TRIAL EXCLUSION ENGINE
// -------------------------------------------------------------

/**
 * Permanent License & Access Controller
 * Ensures zero trial barriers, bypasses trial expiry checks,
 * and renders blocker elements inert.
 */
function isTrialExpired() {
  return false;
}

function getRemainingDays() {
  return Infinity;
}

function getLicenseStatus() {
  return {
    status: "LIFETIME_ACTIVE",
    tier: "ENTERPRISE_UNLIMITED_2026",
    isExpired: false,
    daysRemaining: Infinity,
    clinicalAllowed: true,
    farmerSuiteAllowed: true,
    vaultAccessAllowed: true,
    expiryTimestamp: null
  };
}

/**
 * Strips and neutralizes any trial expiration modals or modal backdrops.
 * Returns null immediately and refuses DOM injection.
 */
function renderTrialExpiredModal() {
  const existingModal = document.getElementById("vetcare-trial-expired-modal");
  if (existingModal && existingModal.parentNode) {
    existingModal.parentNode.removeChild(existingModal);
  }

  const existingBackdrop = document.getElementById("vetcare-trial-expired-backdrop");
  if (existingBackdrop && existingBackdrop.parentNode) {
    existingBackdrop.parentNode.removeChild(existingBackdrop);
  }

  return null;
}

/**
 * Passive guardian to ensure trial lock elements are immediately purged
 * if injected into the active document.
 */
function sanitizeAccessState() {
  const modalElements = document.querySelectorAll(
    "#vetcare-trial-expired-modal, #vetcare-trial-expired-backdrop, .trial-expired-gate"
  );
  modalElements.forEach(function (el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  document.body.classList.remove("trial-locked", "gate-blocked");
}

// -------------------------------------------------------------
// SECTION 2: CLINICAL CONSULTATION STOPWATCH ENGINE
// -------------------------------------------------------------

function startConsultation(consultationId, onTickCallback) {
  if (consultationTimer.running) {
    stopConsultation();
  }

  consultationTimer.consultationId = consultationId || "CASE-" + Date.now();
  consultationTimer.startTime = Date.now() - (consultationTimer.elapsedSeconds * 1000);
  consultationTimer.running = true;

  if (typeof onTickCallback === "function") {
    consultationTimer.callbacks.add(onTickCallback);
  }

  AudioNotifier.playTone(659.25, "sine", 0.08);

  consultationTimer.intervalRef = setInterval(function () {
    consultationTimer.elapsedSeconds++;
    const formatted = formatSeconds(consultationTimer.elapsedSeconds);

    consultationTimer.callbacks.forEach(function (cb) {
      try {
        cb({
          consultationId: consultationTimer.consultationId,
          seconds: consultationTimer.elapsedSeconds,
          formatted: formatted
        });
      } catch (err) {
        console.error("[Vetcare Timers Engine] Tick callback error:", err);
      }
    });
  }, 1000);

  activeIntervals.set("CONSULTATION_MAIN", consultationTimer.intervalRef);

  return {
    consultationId: consultationTimer.consultationId,
    started: true
  };
}

function pauseConsultation() {
  if (!consultationTimer.running) return;

  if (consultationTimer.intervalRef) {
    clearInterval(consultationTimer.intervalRef);
    consultationTimer.intervalRef = null;
    activeIntervals.delete("CONSULTATION_MAIN");
  }
  consultationTimer.running = false;
  AudioNotifier.playTone(440, "sine", 0.06);
}

function resumeConsultation() {
  if (consultationTimer.running) return;
  if (!consultationTimer.consultationId) {
    startConsultation(null, null);
    return;
  }

  consultationTimer.running = true;
  consultationTimer.intervalRef = setInterval(function () {
    consultationTimer.elapsedSeconds++;
    const formatted = formatSeconds(consultationTimer.elapsedSeconds);

    consultationTimer.callbacks.forEach(function (cb) {
      try {
        cb({
          consultationId: consultationTimer.consultationId,
          seconds: consultationTimer.elapsedSeconds,
          formatted: formatted
        });
      } catch (err) {
        console.error("[Vetcare Timers Engine] Tick callback error:", err);
      }
    });
  }, 1000);

  activeIntervals.set("CONSULTATION_MAIN", consultationTimer.intervalRef);
  AudioNotifier.playTone(880, "sine", 0.06);
}

function stopConsultation() {
  if (consultationTimer.intervalRef) {
    clearInterval(consultationTimer.intervalRef);
    consultationTimer.intervalRef = null;
    activeIntervals.delete("CONSULTATION_MAIN");
  }

  const summary = {
    consultationId: consultationTimer.consultationId,
    totalSeconds: consultationTimer.elapsedSeconds,
    formattedDuration: formatSeconds(consultationTimer.elapsedSeconds),
    completedAt: new Date().toISOString()
  };

  consultationTimer.consultationId = null;
  consultationTimer.elapsedSeconds = 0;
  consultationTimer.running = false;
  consultationTimer.callbacks.clear();

  AudioNotifier.playTone(440, "sine", 0.1);

  return summary;
}

function getConsultationTime() {
  return {
    running: consultationTimer.running,
    consultationId: consultationTimer.consultationId,
    seconds: consultationTimer.elapsedSeconds,
    formatted: formatSeconds(consultationTimer.elapsedSeconds)
  };
}

function formatSeconds(totalSecs) {
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const pad = (n) => String(n).padStart(2, "0");
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

// -------------------------------------------------------------
// SECTION 3: CLINICAL MEDICATION & MONITORING ALARMS
// -------------------------------------------------------------

/**
 * Registers a recurring clinical reminder (e.g. vital check, anaesthesia depth).
 * @param {string} reminderKey - Unique identifier.
 * @param {number} intervalMinutes - Interval in minutes (e.g., 5, 10, 15).
 * @param {string} label - Display message/label for the clinician.
 * @param {Function} onTrigger - Custom function invoked on expiration.
 */
function registerClinicalAlarm(reminderKey, intervalMinutes, label, onTrigger) {
  clearClinicalAlarm(reminderKey);

  const ms = Math.max(1, intervalMinutes) * 60 * 1000;
  const targetTime = Date.now() + ms;

  const timerData = {
    key: reminderKey,
    label: label || "Clinical Milestone",
    intervalMinutes: intervalMinutes,
    targetTime: targetTime,
    intervalRef: null,
    callback: onTrigger
  };

  timerData.intervalRef = setInterval(function () {
    AudioNotifier.alertPulse();
    if (typeof window.VetcareApp.showToast === "function") {
      window.VetcareApp.showToast(`[क्लिनिकल अलार्म] ${timerData.label}`, "warning");
    }

    if (typeof timerData.callback === "function") {
      try {
        timerData.callback({
          key: reminderKey,
          label: timerData.label,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error("[Vetcare Timers Engine] Alarm callback failed:", e);
      }
    }
  }, ms);

  activeIntervals.set(`ALARM_${reminderKey}`, timerData.intervalRef);
  reminders.set(reminderKey, timerData);

  return {
    key: reminderKey,
    registered: true,
    nextRunAt: new Date(targetTime).toLocaleTimeString()
  };
}

function clearClinicalAlarm(reminderKey) {
  if (reminders.has(reminderKey)) {
    const data = reminders.get(reminderKey);
    if (data.intervalRef) {
      clearInterval(data.intervalRef);
    }
    activeIntervals.delete(`ALARM_${reminderKey}`);
    reminders.delete(reminderKey);
    return true;
  }
  return false;
}

/**
 * Special preset for Anaesthesia monitoring (5, 10, or 15 minute cycle).
 */
function startAnaesthesiaMonitoring(patientId, intervalMinutes = 5) {
  const alarmKey = `ANAESTHESIA_${patientId || "GENERAL"}`;
  const label = `पशु निगरानी (Patient: ${patientId || "General"}) - वाइटल्स / श्वसन जांच`;
  return registerClinicalAlarm(alarmKey, intervalMinutes, label, function (data) {
    console.warn(`[VETCARE ANAESTHESIA CHECK] ${data.label} at ${data.timestamp}`);
  });
}

function stopAnaesthesiaMonitoring(patientId) {
  const alarmKey = `ANAESTHESIA_${patientId || "GENERAL"}`;
  return clearClinicalAlarm(alarmKey);
}

/**
 * Calculates IV drip drop-rate timings.
 * @param {number} totalVolumeMl - Fluid volume in ml.
 * @param {number} durationHours - Infusion duration in hours.
 * @param {number} dropFactor - Drops per ml (macro=15/20, micro=60).
 */
function calculateInfusionRate(totalVolumeMl, durationHours, dropFactor = 20) {
  if (!totalVolumeMl || !durationHours || durationHours <= 0) {
    return { dropsPerMinute: 0, mlPerHour: 0, secondsPerDrop: 0 };
  }

  const totalMinutes = durationHours * 60;
  const totalDrops = totalVolumeMl * dropFactor;
  const dropsPerMinute = Math.round(totalDrops / totalMinutes);
  const mlPerHour = parseFloat((totalVolumeMl / durationHours).toFixed(2));
  const secondsPerDrop = dropsPerMinute > 0 ? parseFloat((60 / dropsPerMinute).toFixed(2)) : 0;

  return {
    totalVolumeMl: totalVolumeMl,
    durationHours: durationHours,
    dropFactor: dropFactor,
    mlPerHour: mlPerHour,
    dropsPerMinute: dropsPerMinute,
    secondsPerDrop: secondsPerDrop
  };
}

// -------------------------------------------------------------
// SECTION 4: AUTO-SAVE DEBOUNCE & EMR SYNCHRONIZATION ENGINE
// -------------------------------------------------------------

/**
 * Standard functional debounce wrapper.
 */
function debounce(func, delayMs = 300) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
      timer = null;
    }, delayMs);
  };
}

/**
 * Starts background auto-save cycle for EMR/IndexedDB.
 * @param {Function} syncHandler - Async or sync execution unit to trigger.
 * @param {number} intervalMs - Execution period (default 30,000ms = 30s).
 */
function startAutoSave(syncHandler, intervalMs = 30000) {
  stopAutoSave();

  if (typeof syncHandler !== "function") {
    throw new TypeError("[Vetcare Timers Engine] AutoSave requires a valid sync callback.");
  }

  autoSaveConfig.syncHandler = syncHandler;
  autoSaveConfig.intervalMs = Math.max(5000, intervalMs);

  autoSaveConfig.intervalRef = setInterval(async function () {
    if (autoSaveConfig.isSyncing) return;

    autoSaveConfig.isSyncing = true;
    try {
      await autoSaveConfig.syncHandler();
      autoSaveConfig.lastSyncTimestamp = new Date().toISOString();
    } catch (err) {
      console.error("[Vetcare Timers Engine] AutoSave synchronization failed:", err);
    } finally {
      autoSaveConfig.isSyncing = false;
    }
  }, autoSaveConfig.intervalMs);

  activeIntervals.set("AUTOSAVE_ROUTINE", autoSaveConfig.intervalRef);

  return {
    enabled: true,
    intervalMs: autoSaveConfig.intervalMs
  };
}

function stopAutoSave() {
  if (autoSaveConfig.intervalRef) {
    clearInterval(autoSaveConfig.intervalRef);
    autoSaveConfig.intervalRef = null;
    activeIntervals.delete("AUTOSAVE_ROUTINE");
  }
  autoSaveConfig.isSyncing = false;
}

async function triggerInstantSave() {
  if (typeof autoSaveConfig.syncHandler === "function" && !autoSaveConfig.isSyncing) {
    autoSaveConfig.isSyncing = true;
    try {
      await autoSaveConfig.syncHandler();
      autoSaveConfig.lastSyncTimestamp = new Date().toISOString();
      return { success: true, timestamp: autoSaveConfig.lastSyncTimestamp };
    } catch (err) {
      console.error("[Vetcare Timers Engine] Manual trigger save failed:", err);
      return { success: false, error: err };
    } finally {
      autoSaveConfig.isSyncing = false;
    }
  }
  return { success: false, reason: "NO_HANDLER_OR_BUSY" };
}

// -------------------------------------------------------------
// SECTION 5: SYSTEM LIFECYCLE & TEARDOWN SAFEGUARDS
// -------------------------------------------------------------

function destroy() {
  // Clear all active intervals
  activeIntervals.forEach(function (ref) {
    clearInterval(ref);
  });
  activeIntervals.clear();

  // Clear all active timeouts
  activeTimeouts.forEach(function (ref) {
    clearTimeout(ref);
  });
  activeTimeouts.clear();

  // Clear alarms
  reminders.forEach(function (alarm) {
    if (alarm.intervalRef) clearInterval(alarm.intervalRef);
  });
  reminders.clear();

  // Reset stopwatch state
  if (consultationTimer.intervalRef) {
    clearInterval(consultationTimer.intervalRef);
  }
  consultationTimer.intervalRef = null;
  consultationTimer.callbacks.clear();
  consultationTimer.running = false;

  // Reset autosave
  if (autoSaveConfig.intervalRef) {
    clearInterval(autoSaveConfig.intervalRef);
  }
  autoSaveConfig.intervalRef = null;
  autoSaveConfig.syncHandler = null;
}

// Self-initialize cleanup of any legacy gate elements upon script execution
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", sanitizeAccessState);
} else {
  sanitizeAccessState();
}

// -------------------------------------------------------------
// Public API Surface
// -------------------------------------------------------------
return {
  // Access & Licensing
  isTrialExpired: isTrialExpired,
  getRemainingDays: getRemainingDays,
  getLicenseStatus: getLicenseStatus,
  renderTrialExpiredModal: renderTrialExpiredModal,
  sanitizeAccessState: sanitizeAccessState,

  // Audio & Cues
  playCueTone: AudioNotifier.playTone.bind(AudioNotifier),
  playAlertTone: AudioNotifier.alertPulse.bind(AudioNotifier),

  // Clinical Stopwatch
  startConsultation: startConsultation,
  pauseConsultation: pauseConsultation,
  resumeConsultation: resumeConsultation,
  stopConsultation: stopConsultation,
  getConsultationTime: getConsultationTime,

  // Clinical Reminders & Alarms
  registerClinicalAlarm: registerClinicalAlarm,
  clearClinicalAlarm: clearClinicalAlarm,
  startAnaesthesiaMonitoring: startAnaesthesiaMonitoring,
  stopAnaesthesiaMonitoring: stopAnaesthesiaMonitoring,
  calculateInfusionRate: calculateInfusionRate,

  // AutoSave & Async Utilities
  debounce: debounce,
  startAutoSave: startAutoSave,
  stopAutoSave: stopAutoSave,
  triggerInstantSave: triggerInstantSave,

  // Lifecycle
  destroy: destroy
};
