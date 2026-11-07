const THEMES = {
  CLINICAL_LIGHT: "light",
  SUNLIGHT_HIGH_CONTRAST: "sunlight",
  CLINICAL_MUTED: "clinical-muted"
};

const CLINICAL_PALETTE = {
  canvas: "#f8fafc",            // Clean hospital room background
  canvasMuted: "#f1f5f9",       // Recessed clinical surfaces
  surface: "#ffffff",           // Pure elevated examination white
  surfaceElevated: "#ffffff",   // Diagnostic cards & modals
  surfaceGlass: "rgba(255, 255, 255, 0.94)",
  border: "#e2e8f0",            // Clean sterile division lines
  borderSubtle: "#cbd5e1",      // Interactive input bounds
  borderStrong: "#94a3b8",      // Focused clinical boundaries

  // Medical & Clinical Signaling Colors
  primaryCyan: "#0284c7",       // Medical Cyan Primary (Active tools)
  primaryHover: "#0369a1",      // Deep Medical Cyan
  primaryDeep: "#0f172a",       // Sapphire Medical Deep Slate
  primarySoft: "#e0f2fe",       // Cyan Wash Tint (Highlights)

  accentEmerald: "#059669",     // Healthy vitals / Normal ECG green
  accentEmeraldSoft: "#d1fae5", // Vitals badge background
  accentCrimson: "#dc2626",     // Emergency Triage / Steroid red alert
  accentCrimsonSoft: "#fee2e2", // Emergency badge background
  accentAmber: "#d97706",       // Clinical caution / Observation amber
  accentAmberSoft: "#fef3c7",   // Caution badge background
  accentPurple: "#7c3aed",      // High genetics / Specialty diagnostics
  accentPurpleSoft: "#ede9fe",  // Specialty badge background

  // Crisp Ultra-Contrast Typography
  textHeading: "#0f172a",       // Ultra-dark clinical slate for headers
  textBody: "#334155",          // Crisp readability for pathology & dosages
  textMuted: "#64748b",         // Secondary clinical metadata & units
  textInverted: "#ffffff",      // Contrast text for solid primary buttons

  // Shadows & Depths
  shadowCard: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
  shadowElevated: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
  shadowModal: "0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)"
};

// -------------------------------------------------------------
// IMMEDIATE ANTI-FLASH EXECUTION (ZERO-LATENCY ENFORCEMENT)
// -------------------------------------------------------------
// Strip initial 'dark' class from index.html instantly before repaint
if (document.documentElement.classList.contains("dark")) {
  document.documentElement.classList.remove("dark");
}
document.documentElement.classList.add("light");
document.documentElement.setAttribute("data-theme", "light");
document.documentElement.style.colorScheme = "light";

// -------------------------------------------------------------
// DYNAMIC CLINICAL STYLESHEET INJECTION
// -------------------------------------------------------------
function injectClinicalStyles() {
  const styleId = "vetcare-clinical-theme-stylesheet";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = `
    /* ==========================================================================
       CLINICAL DESIGN SYSTEM TOKENS (PERMANENT HOSPITAL LIGHT PALETTE)
       ========================================================================== */
    :root, html.light {
      --vet-canvas: ${CLINICAL_PALETTE.canvas};
      --vet-canvas-muted: ${CLINICAL_PALETTE.canvasMuted};
      --vet-surface: ${CLINICAL_PALETTE.surface};
      --vet-surface-elevated: ${CLINICAL_PALETTE.surfaceElevated};
      --vet-surface-glass: ${CLINICAL_PALETTE.surfaceGlass};
      --vet-border: ${CLINICAL_PALETTE.border};
      --vet-border-subtle: ${CLINICAL_PALETTE.borderSubtle};
      --vet-border-strong: ${CLINICAL_PALETTE.borderStrong};

      --vet-primary: ${CLINICAL_PALETTE.primaryCyan};
      --vet-primary-hover: ${CLINICAL_PALETTE.primaryHover};
      --vet-primary-deep: ${CLINICAL_PALETTE.primaryDeep};
      --vet-primary-soft: ${CLINICAL_PALETTE.primarySoft};

      --vet-emerald: ${CLINICAL_PALETTE.accentEmerald};
      --vet-emerald-soft: ${CLINICAL_PALETTE.accentEmeraldSoft};
      --vet-crimson: ${CLINICAL_PALETTE.accentCrimson};
      --vet-crimson-soft: ${CLINICAL_PALETTE.accentCrimsonSoft};
      --vet-amber: ${CLINICAL_PALETTE.accentAmber};
      --vet-amber-soft: ${CLINICAL_PALETTE.accentAmberSoft};
      --vet-purple: ${CLINICAL_PALETTE.accentPurple};
      --vet-purple-soft: ${CLINICAL_PALETTE.accentPurpleSoft};

      --vet-text-heading: ${CLINICAL_PALETTE.textHeading};
      --vet-text-body: ${CLINICAL_PALETTE.textBody};
      --vet-text-muted: ${CLINICAL_PALETTE.textMuted};
      --vet-text-white: ${CLINICAL_PALETTE.textInverted};

      --vet-shadow-card: ${CLINICAL_PALETTE.shadowCard};
      --vet-shadow-elevated: ${CLINICAL_PALETTE.shadowElevated};
      --vet-shadow-modal: ${CLINICAL_PALETTE.shadowModal};
    }

    /* Enforce Hospital Light Canvas across Root Body */
    body {
      background-color: var(--vet-canvas) !important;
      color: var(--vet-text-body) !important;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    /* Seamless Clinical Card Reskinning over Dark Tailwind Base */
    html.light .bg-slate-900,
    html.light .bg-slate-950,
    html.light .bg-slate-900\\/70,
    html.light .bg-slate-900\\/90,
    html.light .bg-slate-900\\/80,
    html.light .bg-slate-900\\/60,
    html.light .bg-slate-800,
    html.light .bg-slate-800\\/80 {
      background-color: var(--vet-surface) !important;
      color: var(--vet-text-body) !important;
    }

    /* Clinical Card Elevation & Crisp Sterile Borders */
    html.light .border-slate-800,
    html.light .border-slate-800\\/80,
    html.light .border-slate-700,
    html.light .border-slate-700\\/60,
    html.light .border-slate-700\\/80 {
      border-color: var(--vet-border) !important;
    }

    html.light .shadow-xl,
    html.light .shadow-2xl {
      box-shadow: var(--vet-shadow-elevated) !important;
    }

    /* Navigation Glass Bar in Clean Hospital Slate */
    html.light .glass-nav {
      background: var(--vet-surface-glass) !important;
      border-bottom: 1px solid var(--vet-border) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
    }

    /* Clinical Heading Typography Contrast */
    html.light h1, 
    html.light h2, 
    html.light h3, 
    html.light h4, 
    html.light .text-white, 
    html.light .sunlight-text {
      color: var(--vet-text-heading) !important;
    }

    html.light p, 
    html.light .text-slate-300, 
    html.light .text-slate-200 {
      color: var(--vet-text-body) !important;
    }

    html.light .text-slate-400, 
    html.light .sunlight-muted {
      color: var(--vet-text-muted) !important;
    }

    /* Interactive Clinical Inputs */
    html.light input,
    html.light select,
    html.light textarea {
      background-color: #ffffff !important;
      border-color: var(--vet-border-subtle) !important;
      color: var(--vet-text-heading) !important;
    }

    html.light input:focus,
    html.light select:focus,
    html.light textarea:focus {
      border-color: var(--vet-primary) !important;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15) !important;
    }

    /* Clinical Modal Panels */
    html.light #apiKeyModal > div,
    html.light #adminAuthModal > div,
    html.light #otpResetModal > div,
    html.light #sideDrawer {
      background-color: #ffffff !important;
      border-color: var(--vet-border) !important;
      box-shadow: var(--vet-shadow-modal) !important;
    }

    /* Telemetry & Secondary Button Elements */
    html.light button.bg-slate-800 {
      background-color: var(--vet-canvas-muted) !important;
      color: var(--vet-text-heading) !important;
      border-color: var(--vet-border) !important;
    }
    html.light button.bg-slate-800:hover {
      background-color: #e2e8f0 !important;
    }

    /* Primary Clinical Call-to-Actions */
    html.light .bg-gradient-to-r.from-emerald-600.to-teal-600 {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%) !important;
      color: #ffffff !important;
    }
    html.light .bg-gradient-to-r.from-amber-600.to-yellow-600 {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%) !important;
      color: #ffffff !important;
    }
    html.light .bg-gradient-to-r.from-cyan-600.to-blue-600 {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;
      color: #ffffff !important;
    }

    /* High-Definition Clinical Scrollbars */
    .custom-scrollbar::-webkit-scrollbar-track {
      background: var(--vet-canvas-muted) !important;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1 !important;
      border-radius: 9999px !important;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8 !important;
    }
  `;
}

// -------------------------------------------------------------
// AUDIO NOTIFIER INTEGRATION
// -------------------------------------------------------------
function playThemeChime(mode) {
  if (window.VetcareApp.TimersEngine && typeof window.VetcareApp.TimersEngine.playCueTone === "function") {
    if (mode === "sunlight") {
      window.VetcareApp.TimersEngine.playCueTone(1046.5, "triangle", 0.12);
    } else {
      window.VetcareApp.TimersEngine.playCueTone(523.25, "sine", 0.08);
    }
  }
}

// -------------------------------------------------------------
// NOTIFICATION BRIDGE
// -------------------------------------------------------------
function notifyThemeChange(message, type = "info") {
  if (typeof window.VetcareApp.showToast === "function") {
    window.VetcareApp.showToast(message, type);
  }
}

// -------------------------------------------------------------
// CORE METHODS
// -------------------------------------------------------------

/**
 * Enforces hospital clinical white theme as permanently standard.
 */
function applyClinicalTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  document.documentElement.setAttribute("data-theme", "light");
  document.body.classList.remove("sunlight-mode");

  localStorage.setItem(THEME_STORAGE_KEY, THEMES.CLINICAL_LIGHT);
  localStorage.setItem(SUNLIGHT_STORAGE_KEY, "false");

  updateSunlightButtonUI(false);
}

/**
 * Toggles Field Sunlight (Outdoor 100% contrast) mode.
 */
function toggleSunlightMode() {
  const isCurrentlySunlight = document.body.classList.contains("sunlight-mode");
  const targetState = !isCurrentlySunlight;

  if (targetState) {
    document.body.classList.add("sunlight-mode");
    localStorage.setItem(SUNLIGHT_STORAGE_KEY, "true");
    playThemeChime("sunlight");
    notifyThemeChange("धूप मोड (Outdoor High-Contrast) सक्रिय", "warning");
  } else {
    document.body.classList.remove("sunlight-mode");
    localStorage.setItem(SUNLIGHT_STORAGE_KEY, "false");
    playThemeChime("light");
    notifyThemeChange("प्राथमिक क्लिनिकल व्हाइट मोड सक्रिय", "success");
  }

  updateSunlightButtonUI(targetState);
  return targetState;
}

function isSunlightMode() {
  return document.body.classList.contains("sunlight-mode");
}

function updateSunlightButtonUI(isActive) {
  const btn = document.getElementById("btnToggleSunlight");
  if (!btn) return;

  if (isActive) {
    btn.classList.add("ring-2", "ring-amber-500", "bg-amber-100", "text-amber-900");
    btn.classList.remove("bg-slate-800", "text-amber-400");
  } else {
    btn.classList.remove("ring-2", "ring-amber-500", "bg-amber-100", "text-amber-900");
    btn.classList.add("bg-slate-800", "text-amber-400");
  }
}

/**
 * Prevents operating system preferences (prefers-color-scheme: dark)
 * from overriding hospital diagnostic standards.
 */
function blockSystemDarkModeOverride() {
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = function () {
      // Re-enforce clinical white regardless of OS events
      if (!isSunlightMode()) {
        applyClinicalTheme();
      }
    };

    try {
      colorSchemeQuery.addEventListener("change", handler);
    } catch (e) {
      try {
        colorSchemeQuery.addListener(handler);
      } catch (err) {}
    }
  }
}

/**
 * Initialize theme state and listeners.
 */
function init() {
  injectClinicalStyles();
  blockSystemDarkModeOverride();

  // Check saved sunlight state
  const savedSunlight = localStorage.getItem(SUNLIGHT_STORAGE_KEY) === "true";
  if (savedSunlight) {
    document.body.classList.add("sunlight-mode");
    updateSunlightButtonUI(true);
  } else {
    applyClinicalTheme();
  }

  // Sync existing toggle button if present in DOM
  const btnSunlight = document.getElementById("btnToggleSunlight");
  if (btnSunlight) {
    btnSunlight.onclick = function (e) {
      e.preventDefault();
      toggleSunlightMode();
    };
  }
}

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// -------------------------------------------------------------
// Public API Surface
// -------------------------------------------------------------
return {
  init: init,
  applyClinicalTheme: applyClinicalTheme,
  toggleSunlightMode: toggleSunlightMode,
  isSunlightMode: isSunlightMode,
  getPaletteTokens: function () {
    return Object.assign({}, CLINICAL_PALETTE);
  },
  getCurrentTheme: function () {
    return isSunlightMode() ? THEMES.SUNLIGHT_HIGH_CONTRAST : THEMES.CLINICAL_LIGHT;
  }
};
