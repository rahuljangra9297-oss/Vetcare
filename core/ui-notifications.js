// Vetcare AI OS - Silent Clinical Notification Engine (2026 Production)
(function (window, document) {
  "use strict";

  // Ensure Root Namespace
  window.VetcareApp = window.VetcareApp || {};
  const App = window.VetcareApp;

  // Configuration Constants
  const CONFIG = {
    CONTAINER_ID: "vetcareToastHost",
    DEFAULT_DURATION_MS: 2500,
    FADE_TRANSITION_MS: 220,
    MAX_CONCURRENT_TOASTS: 1, // Enforce single mobile-first clinical toast
    SWIPE_THRESHOLD_PX: 25
  };

  // Blacklist of internal telemetry, module initialization, and background lifecycle tokens
  // Any message containing these tokens is routed strictly to console.debug and NEVER shown on UI.
  const SILENT_PATTERNS = [
    /सक्रिय/i,
    /loaded/i,
    /initialized/i,
    /सफलतापूर्वक\s*लोड/i,
    /module\s*ready/i,
    /persisted/i,
    /indexed-?db/i,
    /steroid\s*guard/i,
    /telemetry/i,
    /background\s*sync/i,
    /online\s*node/i,
    /audit\s*trail\s*secured/i,
    /ready:\s*/i,
    /init:\s*/i,
    /mounted/i,
    /pwa\s*offline/i,
    /offline-first/i,
    /gps:\s*/i,
    /sha-256/i
  ];

  // Active Instance Tracking
  let currentActiveToast = null;
  let activeDismissTimer = null;

  /**
   * Evaluates if a given message is background noise/telemetry spam.
   * @param {string} message - Message text to test
   * @returns {boolean} True if message must be silenced
   */
  function isSpam(message) {
    if (!message || typeof message !== "string") return true;
    const cleanMsg = message.trim();
    if (cleanMsg.length === 0) return true;

    for (let i = 0; i < SILENT_PATTERNS.length; i++) {
      if (SILENT_PATTERNS[i].test(cleanMsg)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Retrieves or constructs the high-contrast bottom-center toast anchor container.
   * @returns {HTMLElement} Container host
   */
  function getOrCreateContainer() {
    let container = document.getElementById(CONFIG.CONTAINER_ID);
    if (!container) {
      container = document.createElement("div");
      container.id = CONFIG.CONTAINER_ID;
      container.setAttribute("role", "status");
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");

      // Mobile-First Bottom-Center Floating Tactical Stack
      container.className = "fixed bottom-5 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none w-full max-w-[390px] px-3 flex flex-col items-center justify-end transition-all";
      container.style.paddingBottom = "env(safe-area-inset-bottom, 0px)";
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Immediately clears any active onscreen toast with smooth exit transitions.
   */
  function dismissActiveToast() {
    if (activeDismissTimer) {
      clearTimeout(activeDismissTimer);
      activeDismissTimer = null;
    }

    if (currentActiveToast && currentActiveToast.parentNode) {
      const toastEl = currentActiveToast;
      currentActiveToast = null;

      toastEl.style.transform = "translate3d(0, 16px, 0) scale(0.96)";
      toastEl.style.opacity = "0";

      setTimeout(function () {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      }, CONFIG.FADE_TRANSITION_MS);
    }
  }

  /**
   * Constructs visual configuration according to clinical alert severity.
   * @param {string} type - 'success' | 'error' | 'warning' | 'info'
   * @returns {object} Visual styles & icon definitions
   */
  function getTypeMeta(type) {
    switch (type) {
      case "success":
        return {
          dotBg: "bg-emerald-500",
          iconClass: "fa-solid fa-circle-check text-emerald-600",
          ringColor: "ring-emerald-500/20",
          textColor: "text-slate-900",
          badgeBorder: "border-slate-200/90"
        };
      case "error":
        return {
          dotBg: "bg-rose-500",
          iconClass: "fa-solid fa-circle-exclamation text-rose-600",
          ringColor: "ring-rose-500/20",
          textColor: "text-slate-900",
          badgeBorder: "border-rose-200"
        };
      case "warning":
        return {
          dotBg: "bg-amber-500",
          iconClass: "fa-solid fa-triangle-exclamation text-amber-600",
          ringColor: "ring-amber-500/20",
          textColor: "text-slate-900",
          badgeBorder: "border-amber-200"
        };
      case "info":
      default:
        return {
          dotBg: "bg-sky-500",
          iconClass: "fa-solid fa-circle-info text-sky-600",
          ringColor: "ring-sky-500/20",
          textColor: "text-slate-900",
          badgeBorder: "border-slate-200/90"
        };
    }
  }

  /**
   * Renders the interactive single-unit clinical toast.
   * @param {string} message - Toast message text
   * @param {string} type - Toast type
   * @param {number} duration - Lifespan in milliseconds
   */
  function displayToast(message, type, duration) {
    const container = getOrCreateContainer();
    const meta = getTypeMeta(type);
    const lifeDuration = typeof duration === "number" && duration > 0 ? duration : CONFIG.DEFAULT_DURATION_MS;

    // Remove any active toast before rendering the new one
    dismissActiveToast();

    // Outer Toast Card
    const card = document.createElement("div");
    card.className = "pointer-events-auto relative w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-white/98 text-slate-800 text-xs font-semibold shadow-[0_12px_28px_-4px_rgba(15,23,42,0.18),0_4px_8px_-2px_rgba(15,23,42,0.06)] border border-slate-200/90 backdrop-blur-md cursor-pointer select-none transition-all duration-200 ease-out transform translate-y-4 opacity-0";
    card.style.webkitTapHighlightColor = "transparent";

    // Inner Structural HTML
    card.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <span class="flex-shrink-0 w-2 h-2 rounded-full ${meta.dotBg} ring-4 ${meta.ringColor}"></span>
        <i class="${meta.iconClass} text-sm flex-shrink-0"></i>
        <span class="truncate-2-lines text-[12px] leading-tight font-medium ${meta.textColor}"></span>
      </div>
      <button type="button" aria-label="Dismiss Alert" class="flex-shrink-0 p-1 -mr-1 text-slate-400 hover:text-slate-700 active:scale-95 transition-transform focus:outline-none">
        <i class="fa-solid fa-xmark text-xs"></i>
      </button>
    `;

    // Safe Text Assignment (Prevent XSS injections)
    const textSpan = card.querySelector(".truncate-2-lines");
    if (textSpan) {
      textSpan.textContent = message;
    }

    container.appendChild(card);
    currentActiveToast = card;

    // Trigger Entrance Animation
    requestAnimationFrame(function () {
      card.classList.remove("translate-y-4", "opacity-0");
      card.classList.add("translate-y-0", "opacity-100");
    });

    // Tap/Click to Dismiss
    card.addEventListener("click", function (e) {
      e.stopPropagation();
      dismissActiveToast();
    });

    // Touch Swipe-to-Dismiss Handler (Mobile Friendly)
    let touchStartY = 0;
    card.addEventListener("touchstart", function (e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener("touchend", function (e) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > CONFIG.SWIPE_THRESHOLD_PX) {
        dismissActiveToast();
      }
    }, { passive: true });

    // Auto Dismiss Timer
    activeDismissTimer = setTimeout(function () {
      dismissActiveToast();
    }, lifeDuration);
  }

  /**
   * Core public dispatcher with intelligent spam filtering.
   */
  function showToast(message, type = "info", duration = CONFIG.DEFAULT_DURATION_MS) {
    if (isSpam(message)) {
      console.debug("[Vetcare Telemetry Silenced]:", message);
      return;
    }
    displayToast(message, type, duration);
  }

  // UINotifications Public Module Interface
  const UINotifications = {
    version: "2026.PROD.2.4",

    showToast: function (message, type, duration) {
      showToast(message, type, duration);
    },

    success: function (message, duration) {
      showToast(message, "success", duration);
    },

    error: function (message, duration) {
      showToast(message, "error", duration);
    },

    warning: function (message, duration) {
      showToast(message, "warning", duration);
    },

    info: function (message, duration) {
      showToast(message, "info", duration);
    },

    dismissAll: function () {
      dismissActiveToast();
    },

    isSuppressed: function (message) {
      return isSpam(message);
    }
  };

  // Expose to Global Namespace
  App.UINotifications = UINotifications;

  // Intercept and sanitize standard window.VetcareApp.showToast to route via clinical engine
  App.showToast = function (message, type, duration) {
    UINotifications.showToast(message, type, duration);
  };

  // Wire up EventBus Listener safely
  function attachEventBusListener() {
    if (App.EventBus && typeof App.EventBus.on === "function") {
      App.EventBus.on("notify:toast", function (payload) {
        if (!payload) return;
        if (typeof payload === "string") {
          showToast(payload, "info");
        } else if (typeof payload === "object" && payload.message) {
          showToast(payload.message, payload.type || "info", payload.duration);
        }
      });
      return true;
    }
    return false;
  }

  // Immediate or deferred EventBus binding
  if (!attachEventBusListener()) {
    const bindInterval = setInterval(function () {
      if (attachEventBusListener()) {
        clearInterval(bindInterval);
      }
    }, 100);

    setTimeout(function () {
      clearInterval(bindInterval);
    }, 10000);
  }

})(window, document);
