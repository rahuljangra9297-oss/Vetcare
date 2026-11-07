// Vetcare AI OS - No-Code Appearance & Template Customizer (2026 Production)
(function (window, document) { "use strict";

// Ensure application global namespace window.VetcareApp = window.VetcareApp ||
{};

/**

  - AppearanceCustomizer Module
  - Enterprise-grade visual appearance engine allowing administrators to
    redesign
  - colors, typography, component elevations, and clinic branding without
    coding. */ const AppearanceCustomizer = (function () { const STORAGE_KEY =
    "vetcare_appearance_settings"; const STYLE_TAG_ID =
    "vetcare-dynamic-appearance-vars";

// -------------------------------------------------------------
// FACTORY DEFAULT CONFIGURATION (Hospital Clean White)
// -------------------------------------------------------------
const DEFAULT_CONFIG = {
  presetId: "hospital_clean",
  primaryColor: "#0284c7",
  primaryHover: "#0369a1",
  primarySoft: "#e0f2fe",
  accentColor: "#10b981",
  accentSoft: "#d1fae5",
  canvasTone: "#f8fafc",
  surfaceTone: "#ffffff",
  textHeading: "#0f172a",
  textBody: "#334155",
  fontFamily: "'Inter', sans-serif",
  fontFamilyName: "Inter",
  baseFontSize: "16px",
  headingWeight: "800",
  borderRadius: "16px",
  cardElevation: "subtle", // subtle | crisp | heavy | flat
  headerLayout: "classic", // classic | centered | minimal
  branding: {
    clinicName: "VETCARE",
    clinicSubtitle: "Veterinary Informatic Core",
    contactNumber: "1800-VET-CARE",
    logoUrl: "",
    emergencyNotice: "ISO-VET 2026 CLINICAL PROTOCOLS"
  }
};

// -------------------------------------------------------------
// PRESET CLINICAL THEMES
// -------------------------------------------------------------
const PRESETS = {
  hospital_clean: {
    name: "Hospital Clean White",
    primaryColor: "#0284c7",
    primaryHover: "#0369a1",
    primarySoft: "#e0f2fe",
    accentColor: "#10b981",
    accentSoft: "#d1fae5",
    canvasTone: "#f8fafc",
    surfaceTone: "#ffffff",
    textHeading: "#0f172a",
    textBody: "#334155",
    borderRadius: "16px",
    cardElevation: "subtle"
  },
  emerald_agro: {
    name: "Emerald Agro-Veterinary",
    primaryColor: "#059669",
    primaryHover: "#047857",
    primarySoft: "#d1fae5",
    accentColor: "#16a34a",
    accentSoft: "#dcfce7",
    canvasTone: "#f0fdf4",
    surfaceTone: "#ffffff",
    textHeading: "#064e3b",
    textBody: "#1e3a1e",
    borderRadius: "18px",
    cardElevation: "subtle"
  },
  royal_sapphire: {
    name: "Royal Sapphire Medical",
    primaryColor: "#1d4ed8",
    primaryHover: "#1e40af",
    primarySoft: "#dbeafe",
    accentColor: "#0ea5e9",
    accentSoft: "#e0f2fe",
    canvasTone: "#f8fafc",
    surfaceTone: "#ffffff",
    textHeading: "#0f172a",
    textBody: "#1e293b",
    borderRadius: "12px",
    cardElevation: "heavy"
  },
  warm_amber: {
    name: "Warm Amber Rural Clinic",
    primaryColor: "#d97706",
    primaryHover: "#b45309",
    primarySoft: "#fef3c7",
    accentColor: "#b45309",
    accentSoft: "#ffedd5",
    canvasTone: "#fffbeb",
    surfaceTone: "#ffffff",
    textHeading: "#451a03",
    textBody: "#292524",
    borderRadius: "14px",
    cardElevation: "crisp"
  },
  high_contrast_mono: {
    name: "High-Contrast Monochrome",
    primaryColor: "#000000",
    primaryHover: "#1f2937",
    primarySoft: "#e5e7eb",
    accentColor: "#000000",
    accentSoft: "#f3f4f6",
    canvasTone: "#ffffff",
    surfaceTone: "#ffffff",
    textHeading: "#000000",
    textBody: "#000000",
    borderRadius: "4px",
    cardElevation: "crisp"
  }
};

// Color Swatch Matrix for Quick Picker
const PALETTE_SWATCHES = [
  "#0284c7", // Cyan
  "#059669", // Emerald
  "#1d4ed8", // Sapphire
  "#4f46e5", // Indigo
  "#d97706", // Amber
  "#e11d48", // Rose
  "#0d9488", // Teal
  "#334155"  // Slate
];

// Current Active In-Memory Configuration
let activeConfig = Object.assign({}, DEFAULT_CONFIG);

// -------------------------------------------------------------
// CSS VARIABLE & INJECTION ENGINE
// -------------------------------------------------------------
function generateCssRules(cfg) {
  let shadowCss = "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)";
  let borderCss = "1px solid #e2e8f0";

  if (cfg.cardElevation === "flat") {
    shadowCss = "none";
    borderCss = "1px solid #cbd5e1";
  } else if (cfg.cardElevation === "crisp") {
    shadowCss = "0 0 0 1px rgba(15, 23, 42, 0.08), 0 4px 6px -1px rgba(15, 23, 42, 0.08)";
    borderCss = "2px solid #cbd5e1";
  } else if (cfg.cardElevation === "heavy") {
    shadowCss = "0 14px 28px rgba(15, 23, 42, 0.12), 0 10px 10px rgba(15, 23, 42, 0.06)";
    borderCss = "1px solid #e2e8f0";
  }

  return `
    :root {
      --vet-primary: ${cfg.primaryColor};
      --vet-primary-hover: ${cfg.primaryHover};
      --vet-primary-soft: ${cfg.primarySoft};
      --vet-accent: ${cfg.accentColor};
      --vet-accent-soft: ${cfg.accentSoft};
      --vet-canvas: ${cfg.canvasTone};
      --vet-surface: ${cfg.surfaceTone};
      --vet-text-heading: ${cfg.textHeading};
      --vet-text-body: ${cfg.textBody};
      --vet-font-family: ${cfg.fontFamily};
      --vet-font-size-base: ${cfg.baseFontSize};
      --vet-font-weight-heading: ${cfg.headingWeight};
      --vet-border-radius: ${cfg.borderRadius};
      --vet-card-shadow: ${shadowCss};
      --vet-card-border: ${borderCss};
    }

    body {
      background-color: var(--vet-canvas) !important;
      color: var(--vet-text-body) !important;
      font-family: var(--vet-font-family) !important;
      font-size: var(--vet-font-size-base) !important;
    }

    h1, h2, h3, h4, .text-contrast {
      color: var(--vet-text-heading) !important;
      font-weight: var(--vet-font-weight-heading) !important;
    }

    .clinical-card, .rounded-3xl, .rounded-2xl {
      border-radius: var(--vet-border-radius) !important;
    }

    .clinical-card {
      box-shadow: var(--vet-card-shadow) !important;
      border: var(--vet-card-border) !important;
      background-color: var(--vet-surface) !important;
    }

    .bg-sky-600, .bg-sky-500 {
      background-color: var(--vet-primary) !important;
    }

    .hover\\:bg-sky-500:hover, .hover\\:bg-sky-700:hover {
      background-color: var(--vet-primary-hover) !important;
    }

    .text-sky-600, .text-sky-700 {
      color: var(--vet-primary) !important;
    }

    .border-sky-200, .border-sky-300 {
      border-color: var(--vet-primary-soft) !important;
    }

    .bg-sky-50, .bg-sky-100 {
      background-color: var(--vet-primary-soft) !important;
    }
  `;
}

function injectStyleElement(cssText) {
  let tag = document.getElementById(STYLE_TAG_ID);
  if (!tag) {
    tag = document.createElement("style");
    tag.id = STYLE_TAG_ID;
    document.head.appendChild(tag);
  }
  tag.textContent = cssText;
}

// -------------------------------------------------------------
// LIVE DOM BRANDING SYNCHRONIZER
// -------------------------------------------------------------
function updateDomBranding(branding) {
  if (!branding) return;

  // Update Clinic Name in Header Brand Box
  const brandNameNodes = document.querySelectorAll("#brandLogoHomeBtn span.font-black, .clinic-brand-name");
  brandNameNodes.forEach(function (el) {
    el.textContent = branding.clinicName || "VETCARE";
  });

  // Update Subtitle
  const subtitleNodes = document.querySelectorAll("#brandLogoHomeBtn span.font-mono, .clinic-brand-subtitle");
  subtitleNodes.forEach(function (el) {
    el.textContent = branding.clinicSubtitle || "Veterinary Informatic Core";
  });

  // Update Emergency Notice / Protocol Badges
  const emergencyNodes = document.querySelectorAll(".clinic-emergency-badge, #heroBannerTitle + p");
  if (branding.emergencyNotice) {
    document.querySelectorAll(".clinic-protocol-tag").forEach(function (el) {
      el.textContent = branding.emergencyNotice;
    });
  }

  // Update Logo URL if valid
  if (branding.logoUrl && branding.logoUrl.trim().length > 4) {
    const logoHolders = document.querySelectorAll("#brandLogoHomeBtn div, .clinic-logo-container");
    logoHolders.forEach(function (holder) {
      holder.innerHTML = `<img src="${branding.logoUrl}" alt="Logo" class="w-full h-full object-contain rounded-xl p-0.5" />`;
    });
  }
}

// -------------------------------------------------------------
// STATE PERSISTENCE & APPLICATION
// -------------------------------------------------------------
function applySettings(config, shouldPersist = true) {
  if (!config) return;

  activeConfig = Object.assign({}, activeConfig, config);
  const css = generateCssRules(activeConfig);
  injectStyleElement(css);
  updateDomBranding(activeConfig.branding);

  if (shouldPersist) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeConfig));
      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("अपीयरेंस सेटिंग्स सुरक्षित की गईं!", "success");
      }
    } catch (e) {
      console.error("[AppearanceCustomizer] Failed to save settings to localStorage:", e);
    }
  }
}

function loadSavedSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      activeConfig = Object.assign({}, DEFAULT_CONFIG, parsed);
    }
  } catch (e) {
    console.warn("[AppearanceCustomizer] Error parsing saved config, using default:", e);
    activeConfig = Object.assign({}, DEFAULT_CONFIG);
  }
  applySettings(activeConfig, false);
}

function resetToDefault() {
  activeConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  applySettings(activeConfig, true);
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("फ़ैक्टरी क्लीनिकल थीम पुनर्स्थापित की गई!", "info");
  }
}

// -------------------------------------------------------------
// INTERACTIVE GUI: CUSTOMIZER MODAL RENDERER
// -------------------------------------------------------------
function closeModal() {
  const modal = document.getElementById("vetcare-appearance-modal");
  if (modal && modal.parentNode) {
    modal.parentNode.removeChild(modal);
  }
}

function renderCustomizerModal() {
  closeModal();

  const modalContainer = document.getElementById("modal-root") || document.body;
  const modal = document.createElement("div");
  modal.id = "vetcare-appearance-modal";
  modal.className = "fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[999] flex items-center justify-center p-3 sm:p-5";

  modal.innerHTML = `
    <div class="bg-white border-2 border-slate-200 rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col justify-between overflow-hidden">
      
      <!-- Top Header Bar -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center text-lg shadow-sm">
            <i class="fa-solid fa-palette"></i>
          </div>
          <div>
            <h3 class="font-display font-black text-lg sm:text-xl text-slate-900 leading-tight">
              अपीयरेंस व टेम्पलेट कस्टमाइज़र (Visual Theme Studio)
            </h3>
            <span class="text-[11px] font-mono text-slate-500 font-semibold uppercase">No-Code Live Customizer • 2026 Engine</span>
          </div>
        </div>
        <button type="button" id="btnCloseCustomizer" class="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Scrollable Configuration Stages -->
      <div class="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar text-xs">
        
        <!-- SECTION 1: PRESET CLINICAL THEMES -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label class="block font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
            1. त्वरित क्लीनिकल थीम्स (One-Click Presets)
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            ${Object.keys(PRESETS).map(key => {
              const p = PRESETS[key];
              const isSelected = activeConfig.presetId === key;
              return `
                <button type="button" data-preset="${key}" class="preset-btn p-2.5 rounded-xl border text-left transition-all ${isSelected ? 'border-sky-500 bg-white shadow-sm ring-2 ring-sky-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <span class="w-3.5 h-3.5 rounded-full" style="background:${p.primaryColor};"></span>
                    <span class="w-3.5 h-3.5 rounded-full" style="background:${p.accentColor};"></span>
                  </div>
                  <div class="font-bold text-[11px] text-slate-800 truncate">${p.name}</div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- SECTION 2: PALETTE & COLOR CONTROLS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Primary Brand Color Picker -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label class="block font-bold text-slate-800 mb-1.5 font-mono uppercase">
              प्राथमिक ब्रांड रंग (Primary Brand Color)
            </label>
            <div class="flex items-center gap-3 mb-3">
              <input type="color" id="inputPrimaryColor" value="${activeConfig.primaryColor}" class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 p-0.5 bg-white" />
              <input type="text" id="inputPrimaryHex" value="${activeConfig.primaryColor}" class="font-mono text-xs uppercase bg-white border border-slate-200 px-3 py-2 rounded-xl w-28 text-slate-800 font-bold" />
            </div>
            <div class="flex flex-wrap items-center gap-2">
              ${PALETTE_SWATCHES.map(hex => `
                <button type="button" data-swatch-primary="${hex}" class="w-6 h-6 rounded-lg border border-slate-300 hover:scale-110 transition-transform" style="background:${hex};" title="${hex}"></button>
              `).join('')}
            </div>
          </div>

          <!-- Secondary Accent & Canvas Tones -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label class="block font-bold text-slate-800 mb-1.5 font-mono uppercase">
              एक्सेन्ट व कैनवास बैकग्राउंड (Canvas & Accent)
            </label>
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span class="block text-[11px] text-slate-500 mb-1">Accent Color</span>
                <input type="color" id="inputAccentColor" value="${activeConfig.accentColor}" class="w-full h-9 rounded-xl cursor-pointer border border-slate-300 bg-white" />
              </div>
              <div>
                <span class="block text-[11px] text-slate-500 mb-1">Canvas Background</span>
                <select id="selectCanvasTone" class="w-full bg-white border border-slate-200 rounded-xl px-2 py-2 font-semibold">
                  <option value="#ffffff" ${activeConfig.canvasTone === '#ffffff' ? 'selected' : ''}>Pure White (#ffffff)</option>
                  <option value="#f8fafc" ${activeConfig.canvasTone === '#f8fafc' ? 'selected' : ''}>Hospital Slate (#f8fafc)</option>
                  <option value="#f0fdf4" ${activeConfig.canvasTone === '#f0fdf4' ? 'selected' : ''}>Pasture Green (#f0fdf4)</option>
                  <option value="#fffbeb" ${activeConfig.canvasTone === '#fffbeb' ? 'selected' : ''}>Warm Amber (#fffbeb)</option>
                  <option value="#f1f5f9" ${activeConfig.canvasTone === '#f1f5f9' ? 'selected' : ''}>Soft Gray (#f1f5f9)</option>
                </select>
              </div>
            </div>
            <div>
              <span class="block text-[11px] text-slate-500 mb-1">Card Border & Shadow Elevation</span>
              <select id="selectCardElevation" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold">
                <option value="subtle" ${activeConfig.cardElevation === 'subtle' ? 'selected' : ''}>Subtle Soft Shadow (Clean)</option>
                <option value="crisp" ${activeConfig.cardElevation === 'crisp' ? 'selected' : ''}>Crisp Solid Border (Outdoor)</option>
                <option value="heavy" ${activeConfig.cardElevation === 'heavy' ? 'selected' : ''}>Heavy Elevated Lift (Modern)</option>
                <option value="flat" ${activeConfig.cardElevation === 'flat' ? 'selected' : ''}>Flat Sterile Borders (Minimal)</option>
              </select>
            </div>
          </div>

        </div>

        <!-- SECTION 3: TYPOGRAPHY & READABILITY -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label class="block font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
            3. टाइपोग्राफी व पठनीयता (Typography & Components)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span class="block text-[11px] text-slate-500 mb-1">Font Family</span>
              <select id="selectFontFamily" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold">
                <option value="'Inter', sans-serif" ${activeConfig.fontFamilyName === 'Inter' ? 'selected' : ''}>Inter (Modern Healthcare)</option>
                <option value="'Noto Sans Devanagari', sans-serif" ${activeConfig.fontFamilyName === 'Noto' ? 'selected' : ''}>Noto Sans Devanagari (हिन्दी स्पष्ट)</option>
                <option value="system-ui, -apple-system, sans-serif" ${activeConfig.fontFamilyName === 'System' ? 'selected' : ''}>System Native UI</option>
              </select>
            </div>
            <div>
              <span class="block text-[11px] text-slate-500 mb-1">Base Font Scale</span>
              <select id="selectBaseFontSize" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold">
                <option value="14px" ${activeConfig.baseFontSize === '14px' ? 'selected' : ''}>Compact OPD (14px)</option>
                <option value="16px" ${activeConfig.baseFontSize === '16px' ? 'selected' : ''}>Standard Hospital (16px)</option>
                <option value="18px" ${activeConfig.baseFontSize === '18px' ? 'selected' : ''}>Large Tablet / Mobile (18px)</option>
              </select>
            </div>
            <div>
              <span class="block text-[11px] text-slate-500 mb-1">Corner Radius (Curves)</span>
              <select id="selectBorderRadius" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold">
                <option value="0px" ${activeConfig.borderRadius === '0px' ? 'selected' : ''}>Sharp Hospital (0px)</option>
                <option value="8px" ${activeConfig.borderRadius === '8px' ? 'selected' : ''}>Classic Rounded (8px)</option>
                <option value="16px" ${activeConfig.borderRadius === '16px' ? 'selected' : ''}>Curved Modern (16px)</option>
                <option value="24px" ${activeConfig.borderRadius === '24px' ? 'selected' : ''}>Ultra Capsule (24px)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SECTION 4: CLINIC BRANDING EDITOR -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label class="block font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
            4. क्लिनिक ब्रांडिंग व पहचान संपादक (Hospital Branding Editor)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">चिकित्सालय / संस्था नाम (Clinic Name)</label>
              <input type="text" id="brandInputClinicName" value="${activeConfig.branding.clinicName}" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800" placeholder="VETCARE" />
            </div>
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">उपनाम / टैगलाइन (Subtitle)</label>
              <input type="text" id="brandInputSubtitle" value="${activeConfig.branding.clinicSubtitle}" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700" placeholder="Veterinary Informatic Core" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">आपातकालीन हेल्पलाइन नंबर</label>
              <input type="text" id="brandInputContact" value="${activeConfig.branding.contactNumber}" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-slate-800" placeholder="1800-VET-CARE" />
            </div>
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">लोगो इमेज URL (वैकल्पिक)</label>
              <input type="url" id="brandInputLogoUrl" value="${activeConfig.branding.logoUrl}" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-slate-800" placeholder="https://example.com/logo.png" />
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Action Buttons -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button type="button" id="btnCustomizerResetDefault" class="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all">
          <i class="fa-solid fa-rotate-left mr-1"></i> फ़ैक्टरी रीसेट (Reset)
        </button>
        <div class="flex items-center gap-2">
          <button type="button" id="btnCustomizerCloseBottom" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold">
            रद्द करें
          </button>
          <button type="button" id="btnCustomizerSave" class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md shadow-slate-900/20 transition-all">
            <i class="fa-solid fa-floppy-disk mr-1"></i> सुरक्षित सहेजें (Save Theme)
          </button>
        </div>
      </div>

    </div>
  `;

  modalContainer.appendChild(modal);

  // -------------------------------------------------------------
  // EVENT BINDINGS FOR LIVE PREVIEW
  // -------------------------------------------------------------
  const closeTop = document.getElementById("btnCloseCustomizer");
  const closeBottom = document.getElementById("btnCustomizerCloseBottom");
  if (closeTop) closeTop.onclick = closeModal;
  if (closeBottom) closeBottom.onclick = closeModal;

  // Preset Click Handlers
  modal.querySelectorAll("[data-preset]").forEach(btn => {
    btn.onclick = function () {
      const key = this.getAttribute("data-preset");
      if (PRESETS[key]) {
        const p = PRESETS[key];
        activeConfig.presetId = key;
        activeConfig.primaryColor = p.primaryColor;
        activeConfig.primaryHover = p.primaryHover;
        activeConfig.primarySoft = p.primarySoft;
        activeConfig.accentColor = p.accentColor;
        activeConfig.accentSoft = p.accentSoft;
        activeConfig.canvasTone = p.canvasTone;
        activeConfig.surfaceTone = p.surfaceTone;
        activeConfig.textHeading = p.textHeading;
        activeConfig.textBody = p.textBody;
        activeConfig.borderRadius = p.borderRadius;
        activeConfig.cardElevation = p.cardElevation;

        applySettings(activeConfig, false);
        renderCustomizerModal(); // Re-render to sync UI controls
      }
    };
  });

  // Primary Color Input
  const primaryInput = document.getElementById("inputPrimaryColor");
  const primaryHex = document.getElementById("inputPrimaryHex");
  if (primaryInput && primaryHex) {
    primaryInput.oninput = function () {
      primaryHex.value = this.value;
      activeConfig.primaryColor = this.value;
      activeConfig.primaryHover = this.value;
      applySettings(activeConfig, false);
    };
    primaryHex.onchange = function () {
      if (/^#[0-9A-F]{6}$/i.test(this.value)) {
        primaryInput.value = this.value;
        activeConfig.primaryColor = this.value;
        activeConfig.primaryHover = this.value;
        applySettings(activeConfig, false);
      }
    };
  }

  // Swatch Clicks
  modal.querySelectorAll("[data-swatch-primary]").forEach(swatch => {
    swatch.onclick = function () {
      const val = this.getAttribute("data-swatch-primary");
      if (primaryInput) primaryInput.value = val;
      if (primaryHex) primaryHex.value = val;
      activeConfig.primaryColor = val;
      activeConfig.primaryHover = val;
      applySettings(activeConfig, false);
    };
  });

  // Accent Color Input
  const accentInput = document.getElementById("inputAccentColor");
  if (accentInput) {
    accentInput.oninput = function () {
      activeConfig.accentColor = this.value;
      applySettings(activeConfig, false);
    };
  }

  // Canvas Background Tone Select
  const canvasSelect = document.getElementById("selectCanvasTone");
  if (canvasSelect) {
    canvasSelect.onchange = function () {
      activeConfig.canvasTone = this.value;
      applySettings(activeConfig, false);
    };
  }

  // Card Elevation Select
  const elevationSelect = document.getElementById("selectCardElevation");
  if (elevationSelect) {
    elevationSelect.onchange = function () {
      activeConfig.cardElevation = this.value;
      applySettings(activeConfig, false);
    };
  }

  // Font Family Select
  const fontSelect = document.getElementById("selectFontFamily");
  if (fontSelect) {
    fontSelect.onchange = function () {
      activeConfig.fontFamily = this.value;
      activeConfig.fontFamilyName = this.options[this.selectedIndex].text.split(" ")[0];
      applySettings(activeConfig, false);
    };
  }

  // Base Font Size Select
  const fontSizeSelect = document.getElementById("selectBaseFontSize");
  if (fontSizeSelect) {
    fontSizeSelect.onchange = function () {
      activeConfig.baseFontSize = this.value;
      applySettings(activeConfig, false);
    };
  }

  // Border Radius Select
  const radiusSelect = document.getElementById("selectBorderRadius");
  if (radiusSelect) {
    radiusSelect.onchange = function () {
      activeConfig.borderRadius = this.value;
      applySettings(activeConfig, false);
    };
  }

  // Live Branding Inputs
  const clinicNameInput = document.getElementById("brandInputClinicName");
  if (clinicNameInput) {
    clinicNameInput.oninput = function () {
      activeConfig.branding.clinicName = this.value;
      updateDomBranding(activeConfig.branding);
    };
  }

  const subtitleInput = document.getElementById("brandInputSubtitle");
  if (subtitleInput) {
    subtitleInput.oninput = function () {
      activeConfig.branding.clinicSubtitle = this.value;
      updateDomBranding(activeConfig.branding);
    };
  }

  const contactInput = document.getElementById("brandInputContact");
  if (contactInput) {
    contactInput.oninput = function () {
      activeConfig.branding.contactNumber = this.value;
    };
  }

  const logoUrlInput = document.getElementById("brandInputLogoUrl");
  if (logoUrlInput) {
    logoUrlInput.onchange = function () {
      activeConfig.branding.logoUrl = this.value.trim();
      updateDomBranding(activeConfig.branding);
    };
  }

  // Save & Persist Button
  const saveBtn = document.getElementById("btnCustomizerSave");
  if (saveBtn) {
    saveBtn.onclick = function () {
      applySettings(activeConfig, true);
      closeModal();
    };
  }

  // Reset Button
  const resetBtn = document.getElementById("btnCustomizerResetDefault");
  if (resetBtn) {
    resetBtn.onclick = function () {
      resetToDefault();
      closeModal();
    };
  }
}

// Auto-Mount on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadSavedSettings);
} else {
  loadSavedSettings();
}

// -------------------------------------------------------------
// Public API Surface
// -------------------------------------------------------------
return {
  renderCustomizerModal: renderCustomizerModal,
  applySettings: applySettings,
  loadSavedSettings: loadSavedSettings,
  resetToDefault: resetToDefault,
  getActiveConfig: function () {
    return Object.assign({}, activeConfig);
  },
  closeModal: closeModal
};

})();

// Expose to App namespace window.VetcareApp.AppearanceCustomizer =
AppearanceCustomizer;

})(window, document);
