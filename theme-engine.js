// Vetcare AI OS - Dynamic Theme & Graphics Engine (2026 Production)
(function (window, document) {
  'use strict';

  /**
   * Storage Key and Canonical Theme Defaults
   * Primary: Forest Emerald (#059669) - Clinical vitality & dairy resonance
   * Accent: Royal Cobalt (#2563eb) - Precision veterinary clinical decision support
   */
  const THEME_STORAGE_KEY = 'vetcare_branding_config';
  const BANNER_DOM_ID = 'vetcareGlobalNotificationBanner';
  const DYNAMIC_STYLE_ID = 'vetcareDynamicThemeStyles';

  const DEFAULT_BRANDING = {
    appTitle: 'Vetcare AI OS',
    appSubtitle: 'पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान',
    logoUrl: '',
    primaryColor: '#059669',
    accentColor: '#2563eb',
    fontScale: '100%',
    bannerNotice: ''
  };

  /**
   * Safe JSON Parser and Storage Retreival with Fail-Safe Recovery
   */
  function getStoredBranding() {
    try {
      const raw = localStorage.getItem(THEME_STORAGE_KEY);
      if (!raw) return { ...DEFAULT_BRANDING };
      const parsed = JSON.parse(raw);
      return Object.assign({}, DEFAULT_BRANDING, parsed);
    } catch (err) {
      console.warn('[ThemeEngine] Corrupt branding configuration detected. Restoring defaults.', err);
      return { ...DEFAULT_BRANDING };
    }
  }

  /**
   * Color Math Utilities for Derived Dynamic Shades
   */
  function hexToRgb(hex) {
    let cleanHex = hex.replace(/^#/, '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function adjustBrightness(hex, percent) {
    try {
      const { r, g, b } = hexToRgb(hex);
      const factor = 1 + percent / 100;
      const clamp = val => Math.min(255, Math.max(0, Math.round(val * factor)));
      const toHex = val => clamp(val).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } catch (e) {
      return hex;
    }
  }

  /**
   * Dynamic CSS Variable & Interactive Class Injector
   */
  function injectDynamicStyles(config) {
    let styleTag = document.getElementById(DYNAMIC_STYLE_ID);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = DYNAMIC_STYLE_ID;
      document.head.appendChild(styleTag);
    }

    const primary = config.primaryColor || DEFAULT_BRANDING.primaryColor;
    const accent = config.accentColor || DEFAULT_BRANDING.accentColor;
    const primaryHover = adjustBrightness(primary, -12);
    const accentHover = adjustBrightness(accent, -12);
    const primaryLight = adjustBrightness(primary, 85);
    const accentLight = adjustBrightness(accent, 85);

    styleTag.innerHTML = `
      :root {
        --vetcare-primary: ${primary};
        --vetcare-primary-hover: ${primaryHover};
        --vetcare-primary-light: ${primaryLight};
        --vetcare-accent: ${accent};
        --vetcare-accent-hover: ${accentHover};
        --vetcare-accent-light: ${accentLight};
        --vetcare-font-scale: ${config.fontScale || '100%'};
      }

      html {
        font-size: ${config.fontScale || '100%'};
      }

      /* Dynamically overridden utility aliases */
      .theme-bg-primary { background-color: var(--vetcare-primary) !important; }
      .theme-text-primary { color: var(--vetcare-primary) !important; }
      .theme-border-primary { border-color: var(--vetcare-primary) !important; }
      .theme-bg-accent { background-color: var(--vetcare-accent) !important; }
      .theme-text-accent { color: var(--vetcare-accent) !important; }
      .theme-border-accent { border-color: var(--vetcare-accent) !important; }

      /* Dynamic Brand Header & Buttons overrides */
      #gatewayLogoBox, #headerLogoBox {
        background-color: var(--vetcare-primary) !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px ${primaryLight} !important;
      }
      .active-nav-tab {
        color: var(--vetcare-primary) !important;
      }
      .chip-active {
        background-color: var(--vetcare-primary) !important;
        border-color: var(--vetcare-primary) !important;
        color: #ffffff !important;
      }
    `;
  }

  /**
   * Global Dynamic Top Announcement / Clinical Alert Banner
   */
  function renderGlobalBanner(bannerText) {
    let existingBanner = document.getElementById(BANNER_DOM_ID);
    if (!bannerText || bannerText.trim() === '') {
      if (existingBanner) existingBanner.remove();
      return;
    }

    if (!existingBanner) {
      existingBanner = document.createElement('div');
      existingBanner.id = BANNER_DOM_ID;
      existingBanner.className = 'w-full max-w-4xl mx-auto z-50 px-3 py-1.5 text-xs font-bold text-center flex items-center justify-between transition-all duration-300';
      const mainShell = document.getElementById('screenMainApp');
      if (mainShell) {
        mainShell.parentNode.insertBefore(existingBanner, mainShell);
      } else {
        document.body.insertBefore(existingBanner, document.body.firstChild);
      }
    }

    existingBanner.style.backgroundColor = '#fef3c7';
    existingBanner.style.color = '#92400e';
    existingBanner.style.borderBottom = '1px solid #fde68a';
    existingBanner.innerHTML = `
      <div class="flex-1 flex items-center justify-center gap-1.5 truncate">
        <span>📢</span>
        <span class="truncate">${bannerText.trim()}</span>
      </div>
      <button onclick="window.dismissAppBanner()" class="ml-2 text-amber-900 hover:text-black font-black px-1.5 text-xs focus:outline-none" title="Dismiss">✕</button>
    `;
  }

  /**
   * Helper to derive a 2-Letter Monogram from Title
   */
  function extractInitials(title) {
    if (!title) return 'VC';
    const clean = title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return title.substring(0, 2).toUpperCase();
  }

  /**
   * Core Visual Branding Synchronizer
   * Evaluates all brand-aware nodes in both Gateway and Main App shells.
   */
  window.applyAppBranding = function () {
    const config = getStoredBranding();

    // 1. Injected CSS Variables and Typography Scale
    injectDynamicStyles(config);

    // 2. Titles and Subtitles
    const title = config.appTitle || DEFAULT_BRANDING.appTitle;
    const subtitle = config.appSubtitle || DEFAULT_BRANDING.appSubtitle;

    const pageTitleNode = document.getElementById('pageTitleTag');
    if (pageTitleNode) {
      pageTitleNode.textContent = `${title} | Smart Veterinary OS`;
    }

    const appHeaderTitle = document.getElementById('appHeaderTitle');
    if (appHeaderTitle) {
      appHeaderTitle.textContent = title;
    }

    const gatewayAppTitle = document.getElementById('gatewayAppTitle');
    if (gatewayAppTitle) {
      gatewayAppTitle.textContent = title;
    }

    const gatewayTagline = document.getElementById('gatewayTagline');
    if (gatewayTagline) {
      gatewayTagline.textContent = subtitle;
    }

    const footerAppBranding = document.getElementById('footerAppBranding');
    if (footerAppBranding) {
      footerAppBranding.textContent = `${title} Clinical Assistant • सुरक्षित, सटीक एवं सत्यापित ऑपरेटिंग सिस्टम`;
    }

    // 3. Dynamic Logo Boxes (Monogram vs. Custom Graphics / URL)
    const initials = extractInitials(title);
    const logoContainers = [
      { boxId: 'gatewayLogoBox', textId: 'gatewayLogoText' },
      { boxId: 'headerLogoBox', textId: 'headerLogoText' }
    ];

    logoContainers.forEach(({ boxId, textId }) => {
      const boxNode = document.getElementById(boxId);
      if (!boxNode) return;

      if (config.logoUrl && config.logoUrl.trim() !== '') {
        boxNode.innerHTML = `
          <img src="${config.logoUrl.trim()}" alt="${title}" class="w-full h-full object-cover rounded-2xl" onerror="this.onerror=null; this.parentElement.innerHTML='<span id=\\'${textId}\\'>${initials}</span>';" />
        `;
      } else {
        boxNode.innerHTML = `<span id="${textId}">${initials}</span>`;
      }
    });

    // 4. Global Alert / Notification Banner
    renderGlobalBanner(config.bannerNotice);

    // 5. Synchronize Form Inputs if Admin Panel is Active
    const adminTitleInput = document.getElementById('cfgAppTitle');
    if (adminTitleInput && document.activeElement !== adminTitleInput) {
      adminTitleInput.value = config.appTitle;
    }
    const adminLogoInput = document.getElementById('cfgLogoUrl');
    if (adminLogoInput && document.activeElement !== adminLogoInput) {
      adminLogoInput.value = config.logoUrl;
    }
    const adminTaglineInput = document.getElementById('cfgAppTagline');
    if (adminTaglineInput && document.activeElement !== adminTaglineInput) {
      adminTaglineInput.value = config.appSubtitle;
    }

    // Dispatch event for other modular systems
    window.dispatchEvent(new CustomEvent('vetcare:branding-applied', { detail: config }));
  };

  /**
   * Admin API: Persist & Propagate Updated Branding
   */
  window.updateAppBranding = function (newConfig) {
    if (!newConfig || typeof newConfig !== 'object') {
      console.error('[ThemeEngine] Invalid branding configuration payload.');
      return false;
    }

    const current = getStoredBranding();
    const updated = {
      appTitle: (newConfig.appTitle !== undefined) ? String(newConfig.appTitle).trim() : current.appTitle,
      appSubtitle: (newConfig.appSubtitle !== undefined) ? String(newConfig.appSubtitle).trim() : current.appSubtitle,
      logoUrl: (newConfig.logoUrl !== undefined) ? String(newConfig.logoUrl).trim() : current.logoUrl,
      primaryColor: newConfig.primaryColor || current.primaryColor,
      accentColor: newConfig.accentColor || current.accentColor,
      fontScale: newConfig.fontScale || current.fontScale,
      bannerNotice: (newConfig.bannerNotice !== undefined) ? String(newConfig.bannerNotice).trim() : current.bannerNotice
    };

    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
      window.applyAppBranding();
      return true;
    } catch (err) {
      console.error('[ThemeEngine] Storage write failed:', err);
      return false;
    }
  };

  /**
   * Dismiss Global Alert Banner
   */
  window.dismissAppBanner = function () {
    const existing = document.getElementById(BANNER_DOM_ID);
    if (existing) existing.remove();
    const current = getStoredBranding();
    current.bannerNotice = '';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(current));
    } catch (e) {}
  };

  /**
   * Reset App Branding to Default Factory Baseline
   */
  window.resetAppBranding = function () {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
      window.applyAppBranding();
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Utility for Admin File Uploader: Convert Uploaded Logo Image to Base64
   */
  window.handleLogoFileUpload = function (fileInput, callback) {
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    if (!file.type.startsWith('image/')) {
      alert('कृपया केवल वैध इमेज फाइल (PNG, JPG, SVG) चुनें।');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('लोगो फाइल का आकार 2MB से कम होना चाहिए।');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Data = e.target.result;
      if (typeof callback === 'function') {
        callback(base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  /**
   * Self-Healing Lifecycle Initialization
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.applyAppBranding);
  } else {
    window.applyAppBranding();
  }

})(window, document);
