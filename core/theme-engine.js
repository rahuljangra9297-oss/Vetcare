// Vetcare AI OS - Theme Engine, Dynamic Branding & Outdoor High-Contrast UI (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE & STATE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};

  const Theme = {
    branding: {
      appName: "Vetcare AI OS",
      version: "2026.4.1",
      subtitle: "Clinical Veterinary Intelligence & Farmer Hub",
      organization: "National Veterinary Tele-Health Systems",
      copyrightYear: 2026,
      storageKeys: {
        theme: "vetcare_theme_mode",
        sunlight: "vetcare_sunlight_mode",
        audio: "vetcare_audio_cues"
      }
    },
    state: {
      activeTheme: "dark", // 'dark' | 'light'
      isSunlightMode: false,
      isAudioEnabled: true,
      audioContext: null
    },
    selectors: {
      sunlightToggleButtons: [
        "#btnToggleSunlight",
        "[data-action='toggle-sunlight']",
        ".btn-sunlight-toggle"
      ],
      themeToggleButtons: [
        "#btnToggleTheme",
        "[data-action='toggle-theme']",
        ".btn-theme-toggle"
      ],
      toastContainerId: "toastContainer"
    }
  };

  // Safely assign to root app namespace
  window.VetcareApp.Theme = Theme;

  // 2. DYNAMIC CSS VARIABLES & HIGH-CONTRAST SUNLIGHT INJECTION
  Theme.injectThemeStyles = function () {
    const existingStyle = document.getElementById("vetcare-theme-variables");
    if (existingStyle) {
      return;
    }

    const styleEl = document.createElement("style");
    styleEl.id = "vetcare-theme-variables";
    styleEl.type = "text/css";
    styleEl.textContent = `
      :root {
        --primary: #059669;
        --primary-dark: #047857;
        --accent: #f59e0b;
        --surface-bg: #0f172a;
        --surface-card: #1e293b;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --border-color: #334155;
        --danger: #ef4444;
        --info: #0284c7;
        --success: #10b981;
        --warning: #f59e0b;
        --toast-bg: rgba(30, 41, 59, 0.96);
        --toast-border: #334155;
        --toast-text: #f8fafc;
        --app-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --app-font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        --app-font-mono: 'JetBrains Mono', monospace;
      }

      body.theme-light {
        --primary: #059669;
        --primary-dark: #047857;
        --accent: #d97706;
        --surface-bg: #f8fafc;
        --surface-card: #ffffff;
        --text-main: #0f172a;
        --text-muted: #64748b;
        --border-color: #cbd5e1;
        --toast-bg: rgba(255, 255, 255, 0.98);
        --toast-border: #cbd5e1;
        --toast-text: #0f172a;
      }

      /* ULTRA-HIGH CONTRAST OUTDOOR SUNLIGHT MODE (RURAL FIELD OPERATION) */
      body.sunlight-mode {
        --primary: #005a2b !important;
        --primary-dark: #003619 !important;
        --accent: #b45309 !important;
        --surface-bg: #ffffff !important;
        --surface-card: #ffffff !important;
        --text-main: #000000 !important;
        --text-muted: #111827 !important;
        --border-color: #000000 !important;
        --danger: #990000 !important;
        --info: #003366 !important;
        --success: #006600 !important;
        --warning: #994d00 !important;
        --toast-bg: #ffffff !important;
        --toast-border: #000000 !important;
        --toast-text: #000000 !important;
        background-color: #ffffff !important;
        color: #000000 !important;
      }

      body.sunlight-mode * {
        text-shadow: none !important;
      }

      body.sunlight-mode .card,
      body.sunlight-mode .sunlight-card,
      body.sunlight-mode [class*="bg-slate-9"],
      body.sunlight-mode [class*="bg-slate-8"] {
        background-color: #ffffff !important;
        border-color: #000000 !important;
        color: #000000 !important;
        box-shadow: 0 0 0 2px #000000 !important;
      }

      body.sunlight-mode button,
      body.sunlight-mode input,
      body.sunlight-mode select,
      body.sunlight-mode textarea {
        border-color: #000000 !important;
        color: #000000 !important;
        font-weight: 700 !important;
      }

      body.sunlight-mode button:not([class*="bg-transparent"]) {
        border: 2px solid #000000 !important;
      }

      body.sunlight-mode .badge,
      body.sunlight-mode [class*="badge-"] {
        background-color: #000000 !important;
        color: #ffff00 !important;
        border: 1px solid #000000 !important;
        font-weight: 900 !important;
      }

      /* TOAST NOTIFICATION STYLING & ANIMATION */
      .vetcare-toast-enter {
        animation: toastSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .vetcare-toast-exit {
        animation: toastSlideOut 0.25s cubic-bezier(0.7, 0, 0.84, 0) forwards;
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateY(-16px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes toastSlideOut {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateY(-12px) scale(0.92);
        }
      }
    `;

    document.head.appendChild(styleEl);
  };

  // 3. SYNTHESIZED WEB AUDIO API CUES
  Theme.playAudioCue = function (type) {
    if (!Theme.state.isAudioEnabled) {
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }

      if (!Theme.state.audioContext) {
        Theme.state.audioContext = new AudioContextClass();
      }

      if (Theme.state.audioContext.state === "suspended") {
        Theme.state.audioContext.resume().catch(function () {});
      }

      const ctx = Theme.state.audioContext;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "success") {
        // High ascending melodic chime (C5 -> E5 -> G5)
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === "error") {
        // Harsh buzz descending alert
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260.0, now);
        osc.frequency.linearRampToValueAtTime(140.0, now + 0.22);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "warning") {
        // Double pulse alert tone
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440.0, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        gain.gain.setValueAtTime(0.1, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        // Subtle informative ping (E6)
        osc.type = "sine";
        osc.frequency.setValueAtTime(1318.51, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio autoplay policy fallback or headless run
    }
  };

  // 4. FLOATING TOAST & BANNER ENGINE
  Theme.ensureToastContainer = function () {
    let container = document.getElementById(Theme.selectors.toastContainerId);
    if (!container) {
      container = document.createElement("div");
      container.id = Theme.selectors.toastContainerId;
      container.className = "fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-md w-full px-4 sm:px-0";
      document.body.appendChild(container);
    }
    return container;
  };

  Theme.showToast = function (message, type, durationMs) {
    type = type || "info";
    durationMs = typeof durationMs === "number" ? durationMs : 4000;

    const container = Theme.ensureToastContainer();
    const toast = document.createElement("div");

    let borderColor = "#334155";
    let iconClass = "fa-solid fa-circle-info text-cyan-400";
    let bgStyle = "background-color: var(--toast-bg);";
    let textColor = "color: var(--toast-text);";

    if (type === "success") {
      borderColor = "var(--success)";
      iconClass = "fa-solid fa-circle-check text-emerald-400";
    } else if (type === "error") {
      borderColor = "var(--danger)";
      iconClass = "fa-solid fa-circle-xmark text-rose-500";
    } else if (type === "warning") {
      borderColor = "var(--warning)";
      iconClass = "fa-solid fa-triangle-exclamation text-amber-400";
    } else {
      borderColor = "var(--info)";
      iconClass = "fa-solid fa-circle-info text-sky-400";
    }

    toast.className = "vetcare-toast-enter pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all";
    toast.style.cssText = `${bgStyle} ${textColor} border-color: ${borderColor}; min-width: 280px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);`;

    toast.innerHTML = `
      <div class="flex items-start gap-2.5 flex-1">
        <i class="${iconClass} text-base mt-0.5 flex-shrink-0"></i>
        <div class="flex flex-col">
          <span style="font-family: var(--app-font-sans); font-size: 13px; font-weight: 600; line-height: 1.4;">${message}</span>
          <span style="font-family: var(--app-font-mono); font-size: 9px; opacity: 0.7; margin-top: 2px;">VETCARE AI OS • ${Theme.branding.version}</span>
        </div>
      </div>
      <button type="button" aria-label="Close Notification" style="background:none; border:none; color:inherit; cursor:pointer; opacity:0.6; padding:0 4px; font-size:14px;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    // Close button event
    const closeBtn = toast.querySelector("button");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        Theme.dismissToast(toast);
      });
    }

    container.appendChild(toast);
    Theme.playAudioCue(type);

    // Auto-dismiss timer
    if (durationMs > 0) {
      setTimeout(function () {
        Theme.dismissToast(toast);
      }, durationMs);
    }

    return toast;
  };

  Theme.dismissToast = function (toastElement) {
    if (!toastElement || toastElement.getAttribute("data-dismissed") === "true") {
      return;
    }
    toastElement.setAttribute("data-dismissed", "true");
    toastElement.classList.remove("vetcare-toast-enter");
    toastElement.classList.add("vetcare-toast-exit");
    setTimeout(function () {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 250);
  };

  // Expose global shorthand as specified
  window.showAppToast = function (message, type, durationMs) {
    return Theme.showToast(message, type, durationMs);
  };

  // 5. HIGH-CONTRAST OUTDOOR SUNLIGHT ENGINE
  Theme.setSunlightMode = function (enabled, persist) {
    Theme.state.isSunlightMode = !!enabled;

    if (Theme.state.isSunlightMode) {
      document.body.classList.add("sunlight-mode");
    } else {
      document.body.classList.remove("sunlight-mode");
    }

    if (persist !== false) {
      try {
        localStorage.setItem(Theme.branding.storageKeys.sunlight, Theme.state.isSunlightMode ? "true" : "false");
      } catch (err) {
        console.warn("Storage write failure for sunlight mode", err);
      }
    }

    Theme.syncToggleButtonsUI();
  };

  Theme.toggleSunlightMode = function () {
    const newState = !Theme.state.isSunlightMode;
    Theme.setSunlightMode(newState, true);
    Theme.showToast(
      newState ? "धूप मोड (Outdoor High-Contrast) सक्रिय" : "सामान्य डिस्प्ले मोड सक्रिय",
      newState ? "warning" : "info",
      2500
    );
    return newState;
  };

  // 6. THEME SWITCHING (DARK / LIGHT)
  Theme.setTheme = function (themeName, persist) {
    themeName = themeName === "light" ? "light" : "dark";
    Theme.state.activeTheme = themeName;

    if (themeName === "light") {
      document.body.classList.add("theme-light");
      document.documentElement.classList.remove("dark");
    } else {
      document.body.classList.remove("theme-light");
      document.documentElement.classList.add("dark");
    }

    if (persist !== false) {
      try {
        localStorage.setItem(Theme.branding.storageKeys.theme, themeName);
      } catch (err) {
        console.warn("Storage write failure for theme mode", err);
      }
    }

    Theme.syncToggleButtonsUI();
  };

  Theme.toggleTheme = function () {
    const newTheme = Theme.state.activeTheme === "dark" ? "light" : "dark";
    Theme.setTheme(newTheme, true);
    Theme.showToast("थीम परिवर्तित: " + newTheme.toUpperCase(), "info", 2000);
    return newTheme;
  };

  // 7. UI SYNCHRONIZATION & BRANDING ATTACHMENT
  Theme.syncToggleButtonsUI = function () {
    Theme.selectors.sunlightToggleButtons.forEach(function (selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(function (btn) {
        const textSpan = btn.querySelector("span");
        if (Theme.state.isSunlightMode) {
          btn.classList.add("bg-amber-400", "text-slate-950", "border-black");
          btn.classList.remove("bg-slate-800", "text-amber-400");
          if (textSpan) {
            textSpan.textContent = "धूप मोड (ON)";
          }
        } else {
          btn.classList.remove("bg-amber-400", "text-slate-950", "border-black");
          btn.classList.add("bg-slate-800", "text-amber-400");
          if (textSpan) {
            textSpan.textContent = "धूप मोड";
          }
        }
      });
    });
  };

  Theme.applyBrandingElements = function () {
    // Inject dynamic text to marked elements
    const appNameEls = document.querySelectorAll("[data-branding='app-name']");
    appNameEls.forEach(function (el) {
      el.textContent = Theme.branding.appName;
    });

    const versionEls = document.querySelectorAll("[data-branding='version']");
    versionEls.forEach(function (el) {
      el.textContent = Theme.branding.version;
    });

    const subtitleEls = document.querySelectorAll("[data-branding='subtitle']");
    subtitleEls.forEach(function (el) {
      el.textContent = Theme.branding.subtitle;
    });
  };

  Theme.bindActionListeners = function () {
    // Bind sunlight toggle buttons
    Theme.selectors.sunlightToggleButtons.forEach(function (selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(function (btn) {
        if (!btn.getAttribute("data-bound-sunlight")) {
          btn.setAttribute("data-bound-sunlight", "true");
          btn.addEventListener("click", function (evt) {
            evt.preventDefault();
            Theme.toggleSunlightMode();
          });
        }
      });
    });

    // Bind general theme toggle buttons
    Theme.selectors.themeToggleButtons.forEach(function (selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(function (btn) {
        if (!btn.getAttribute("data-bound-theme")) {
          btn.setAttribute("data-bound-theme", "true");
          btn.addEventListener("click", function (evt) {
            evt.preventDefault();
            Theme.toggleTheme();
          });
        }
      });
    });
  };

  // 8. LIFECYCLE INITIALIZER
  Theme.init = function () {
    Theme.injectThemeStyles();

    // Read stored preferences
    let savedTheme = "dark";
    let savedSunlight = false;

    try {
      savedTheme = localStorage.getItem(Theme.branding.storageKeys.theme) || "dark";
      savedSunlight = localStorage.getItem(Theme.branding.storageKeys.sunlight) === "true";
      const savedAudio = localStorage.getItem(Theme.branding.storageKeys.audio);
      if (savedAudio !== null) {
        Theme.state.isAudioEnabled = savedAudio === "true";
      }
    } catch (err) {
      console.warn("Storage read failure during Theme.init", err);
    }

    Theme.setTheme(savedTheme, false);
    Theme.setSunlightMode(savedSunlight, false);
    Theme.applyBrandingElements();
    Theme.bindActionListeners();
  };

  // Self-initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Theme.init();
    });
  } else {
    Theme.init();
  }

})(window, document);
