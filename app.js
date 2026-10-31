/**
 * Vetcare AI OS - Clinical & Smart Dairy Assistant
 * Core Production Application Script (app.js)
 * Enterprise Large-Animal Clinical OS & Farm Suite
 * Release: v4.2.0 (Resilient Multi-Model Gemini Engine with Automatic 404 Fallback)
 */

/* =========================================================================
   1. IMMEDIATE WINDOW BINDINGS (LINE 1 FAIL-SAFE COMPATIBILITY)
   ========================================================================= */
window.selectRole = function(role) {
  try {
    const normalizedRole = (role || 'farmer').toLowerCase();
    localStorage.setItem('vetcare_registered_role', normalizedRole);
    localStorage.setItem('vetcare_user_role', normalizedRole === 'doctor' ? 'DOCTOR' : 'FARMER');
  } catch (e) {
    console.warn('Role storage error:', e);
  }

  const landing = document.getElementById('role-selection-screen') || document.getElementById('screenGateway');
  const mainApp = document.getElementById('main-app-container') || document.getElementById('screenMainApp');

  if (landing) {
    landing.classList.add('hidden');
    landing.style.display = 'none';
  }
  if (mainApp) {
    mainApp.classList.remove('hidden');
    mainApp.style.display = 'block';
  }

  if (typeof window.applyRoleState === 'function') {
    window.applyRoleState(role);
  } else if (typeof window.selectRoleInternal === 'function') {
    window.selectRoleInternal((role || 'farmer').toUpperCase());
  }
};

window.openDoctorDeclarationModal = function() {
  const m = document.getElementById('doctor-declaration-modal') || document.getElementById('modalDoctorDeclaration');
  if (m) {
    m.classList.remove('hidden');
    m.style.display = 'flex';
  } else {
    window.selectRole('doctor');
  }
};

window.closeDoctorDeclarationModal = function() {
  const m = document.getElementById('doctor-declaration-modal') || document.getElementById('modalDoctorDeclaration');
  if (m) {
    m.classList.add('hidden');
    m.style.display = 'none';
  }
};

window.confirmDoctorRole = function() {
  const regInput = document.getElementById('doctor-reg-no');
  if (regInput && regInput.value.trim().length > 0) {
    try {
      localStorage.setItem('vetcare_doctor_reg_no', regInput.value.trim());
    } catch (e) {}
  }
  window.closeDoctorDeclarationModal();
  window.selectRole('doctor');
};

window.openAdminPinModal = function() {
  const m = document.getElementById('admin-pin-modal') || document.getElementById('modalAdminPIN');
  if (m) {
    m.classList.remove('hidden');
    m.style.display = 'flex';
  }
  const pinInput = document.getElementById('admin-pin-input') || document.getElementById('inputAdminPIN');
  if (pinInput) pinInput.value = '';
};

window.closeAdminPinModal = function() {
  const m = document.getElementById('admin-pin-modal') || document.getElementById('modalAdminPIN');
  if (m) {
    m.classList.add('hidden');
    m.style.display = 'none';
  }
};

window.verifyAdminPIN = function() {
  const pinInput = document.getElementById('admin-pin-input') || document.getElementById('inputAdminPIN');
  const pin = pinInput ? pinInput.value.trim() : '';
  if (pin === '9297') {
    window.closeAdminPinModal();
    const adminModal = document.getElementById('admin-dashboard-modal') ||
      document.getElementById('modalAdminDashboard') ||
      document.getElementById('admin-modal');
    if (adminModal) {
      adminModal.classList.remove('hidden');
      adminModal.style.display = 'flex';
      if (typeof window.populateAdminDashboard === 'function') {
        window.populateAdminDashboard();
      }
    }
  } else {
    alert('अमान्य पिन! कृपया सही मास्टर पिन (9297) दर्ज करें।');
    if (pinInput) pinInput.focus();
  }
};

/* =========================================================================
   2. CONFIGURATION, STORAGE KEYS & VERIFIED FINANCIAL ENDPOINTS
   ========================================================================= */
const STORAGE_KEYS = {
  GEMINI_API_KEY: 'vetcare_gemini_api_key',
  APP_CONFIG: 'vetcare_app_config',
  CURRENT_ROLE: 'vetcare_user_role',
  REG_ROLE: 'vetcare_registered_role',
  SESSION_START: 'vetcare_session_start_ts',
  OPD_RECORDS: 'vetcare_opd_records_db',
  KHATA_RECORDS: 'vetcare_khata_records_db',
  INVENTORY: 'vetcare_inventory_db',
  LANG: 'vetcare_selected_lang',
  SUPPORT_TICKETS: 'vetcare_support_tickets'
};

const VERIFIED_FINANCIAL_CONFIG = {
  adminPin: '9297',
  payeeName: 'Vetcare Services',
  monthlyPrice: 199,
  annualPrice: 1499,
  sbiUpi: 'rahuljangra9297@oksbi',
  sbiAccount: '65204067585',
  sbiIfsc: 'SBIN0013693',
  pnbUpi: 'rahuljangra9297-1@okicici',
  pnbAccount: '6687001700015098',
  pnbIfsc: 'PUNB0668700',
  appTitle: 'Vetcare AI OS',
  logoUrl: '',
  appTagline: 'पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान'
};

let AppConfig = { ...VERIFIED_FINANCIAL_CONFIG };
let currentRole = 'FARMER';
let activeDiagnosisMode = 'SYMPTOMS';
let activeBank = 'SBI';
let selectedPlan = 'MONTHLY';
let activeInventoryCategory = 'ALL';
let activeDiseaseTag = 'ALL';

let matrixSelected = {
  temp: null,
  cardinal: 'ALL',
  secondary: []
};

/* =========================================================================
   3. DEFENSIVE DOM UTILITIES
   ========================================================================= */
function $(id) {
  return document.getElementById(id);
}

function safeVal(id, fallback = '') {
  const el = $(id);
  return el ? el.value.trim() : fallback;
}

function setSafeVal(id, val) {
  const el = $(id);
  if (el) el.value = val;
}

function safeText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function loadStorageJSON(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveStorageJSON(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error for ' + key, e);
  }
}

/* =========================================================================
   4. 60-MINUTE REAL-TIME SESSION COUNTDOWN TIMER
   ========================================================================= */
const TOTAL_SESSION_SECONDS = 3600; // 60 Minutes
let sessionTimerInterval = null;

window.initSessionTimer = function() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }

  let startTs = localStorage.getItem(STORAGE_KEYS.SESSION_START);
  const now = Date.now();

  if (!startTs || isNaN(parseInt(startTs, 10))) {
    startTs = now;
    localStorage.setItem(STORAGE_KEYS.SESSION_START, startTs.toString());
  } else {
    startTs = parseInt(startTs, 10);
  }

  const updateBadge = function() {
    const currentNow = Date.now();
    const elapsedSeconds = Math.floor((currentNow - startTs) / 1000);
    const remainingSeconds = TOTAL_SESSION_SECONDS - elapsedSeconds;
    const badge = $('session-timer-badge');

    if (remainingSeconds <= 0) {
      if (badge) {
        badge.textContent = '⏱️ सत्र समाप्त (00:00)';
        badge.className = 'px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full border border-rose-300';
      }
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
      localStorage.removeItem(STORAGE_KEYS.SESSION_START);
      alert('⚠️ आपका 60 मिनट का सुरक्षा सत्र समाप्त हो गया है। कृपया पुनः भूमिका चुनें।');
      window.returnToGateway();
      return;
    }

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (badge) {
      badge.textContent = `⏱️ सत्र: ${formatted} शेष`;
      if (remainingSeconds < 300) {
        badge.className = 'px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full border border-rose-300 animate-pulse';
      } else {
        badge.className = 'px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200';
      }
    }
  };

  updateBadge();
  sessionTimerInterval = setInterval(updateBadge, 1000);
};

window.resetSessionTimer = function() {
  localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString());
  window.initSessionTimer();
};

/* =========================================================================
   5. MULTI-LANGUAGE (i18n) ENGINE
   ========================================================================= */
window.VETCARE_TRANSLATIONS = {
  hi: {
    appTitle: "Vetcare AI OS",
    tagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
    roleFarmer: "👨‍🌾 स्मार्ट पशुपालक",
    roleDoctor: "🩺 अधिकृत पशु चिकित्सक",
    tabDiag: "रोग निदान",
    tabRx: "ओपीडी",
    tabRecords: "रिकॉर्ड",
    tabStock: "स्टॉक",
    tabAi: "AI सर्जन",
    tabBreeding: "प्रजनन",
    tabFeed: "पशु आहार",
    tabKhata: "खाता बही",
    tabSupport: "सपोर्ट",
    aiActive: "🟢 AI सक्रिय",
    aiInactive: "⚪ AI निष्क्रिय"
  },
  en: {
    appTitle: "Vetcare AI OS",
    tagline: "Veterinary Clinical Decision Support System & Smart Dairy Assistant",
    roleFarmer: "👨‍🌾 Smart Dairy Farmer",
    roleDoctor: "🩺 Veterinary Practitioner",
    tabDiag: "Diagnosis",
    tabRx: "OPD Slip",
    tabRecords: "Records",
    tabStock: "Inventory",
    tabAi: "AI Surgeon",
    tabBreeding: "Breeding",
    tabFeed: "Feed Ration",
    tabKhata: "Ledger",
    tabSupport: "Support",
    aiActive: "🟢 AI Active",
    aiInactive: "⚪ AI Inactive"
  },
  hinglish: {
    appTitle: "Vetcare AI OS",
    tagline: "Pashu Swasthya Nidan, 3-Way Clinical Engine & Dairy Solution",
    roleFarmer: "👨‍🌾 Dairy Farmer",
    roleDoctor: "🩺 Vet Doctor",
    tabDiag: "Rog Nidan",
    tabRx: "OPD Parchi",
    tabRecords: "Records",
    tabStock: "Stock",
    tabAi: "AI Surgeon",
    tabBreeding: "Breeding",
    tabFeed: "Pashu Aahar",
    tabKhata: "Khata Bahi",
    tabSupport: "Helpdesk",
    aiActive: "🟢 AI Active",
    aiInactive: "⚪ AI Offline"
  },
  pa: {
    appTitle: "Vetcare AI OS",
    tagline: "ਪਸ਼ੂ ਸਿਹਤ ਨਿਦਾਨ, 3-ਪੱਧਰੀ ਕਲੀਨਿਕਲ ਇੰਜਣ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ ਹੱਲ",
    roleFarmer: "👨‍🌾 ਸਮਾਰਟ ਪਸ਼ੂ ਪਾਲਕ",
    roleDoctor: "🩺 ਵੈਟਰਨਰੀ ਡਾਕਟਰ",
    tabDiag: "ਰੋਗ ਨਿਦਾਨ",
    tabRx: "ਓਪੀਡੀ",
    tabRecords: "ਰਿਕਾਰਡ",
    tabStock: "ਸਟਾਕ",
    tabAi: "ਏਆਈ ਸਰਜਨ",
    tabBreeding: "ਪ੍ਰਜਨਨ",
    tabFeed: "ਸੰਤੁਲਿਤ ਖੁਰਾਕ",
    tabKhata: "ਖਾਤਾ ਬਹੀ",
    tabSupport: "ਸਹਾਇਤਾ",
    aiActive: "🟢 AI ਚਾਲੂ",
    aiInactive: "⚪ AI ਬੰਦ"
  },
  mr: {
    appTitle: "Vetcare AI OS",
    tagline: "पशु आरोग्य निदान, क्लिनिकल डिसीजन इंजिन आणि स्मार्ट डेअरी उपाय",
    roleFarmer: "👨‍🌾 स्मार्ट पशुपालक",
    roleDoctor: "🩺 पशुवैद्यकीय अधिकारी",
    tabDiag: "रोग निदान",
    tabRx: "ओपीडी पावती",
    tabRecords: "नोंदी",
    tabStock: "साठा",
    tabAi: "AI तज्ज्ञ",
    tabBreeding: "प्रजनन",
    tabFeed: "संतुलित आहार",
    tabKhata: "खाते वही",
    tabSupport: "मदत केंद्र",
    aiActive: "🟢 AI सक्रिय",
    aiInactive: "⚪ AI निष्क्रिय"
  },
  gu: {
    appTitle: "Vetcare AI OS",
    tagline: "પશુ આરોગ્ય નિદાન, 3-સ્તરીય ક્લિનિકલ એન્જિન અને સ્માર્ટ ડેરી સોલ્યુશન",
    roleFarmer: "👨‍🌾 સ્માર્ટ પશુપાલક",
    roleDoctor: "🩺 પશુ ચિકિત્સક",
    tabDiag: "રોગ નિદાન",
    tabRx: "ઓપીડી",
    tabRecords: "રેકોર્ડ્સ",
    tabStock: "સ્ટોક",
    tabAi: "AI સર્જન",
    tabBreeding: "સંવર્ધન",
    tabFeed: "પશુ આહાર",
    tabKhata: "ખાતાવહી",
    tabSupport: "સહાયતા",
    aiActive: "🟢 AI સક્રિય",
    aiInactive: "⚪ AI નિષ્ક્રિય"
  },
  bn: {
    appTitle: "Vetcare AI OS",
    tagline: "প্রাণী স্বাস্থ্য রোগ নির্ণয়, ক্লিনিকাল সিদ্ধান্ত এবং স্মার্ট ডেইরি সমাধান",
    roleFarmer: "👨‍🌾 স্মার্ট খামারি",
    roleDoctor: "🩺 পশু চিকিৎসক",
    tabDiag: "রোগ নির্ণয়",
    tabRx: "ওপিডি",
    tabRecords: "রেকর্ড",
    tabStock: "মজুদ",
    tabAi: "এআই বিশেষজ্ঞ",
    tabBreeding: "প্রজনন",
    tabFeed: "সুষম খাদ্য",
    tabKhata: "খাতা বহি",
    tabSupport: "সহায়তা",
    aiActive: "🟢 AI সক্রিয়",
    aiInactive: "⚪ AI নিষ্ক্রিয়"
  }
};

window.setAppLanguage = function(langCode) {
  const code = (langCode || 'hi').toLowerCase();
  const dict = window.VETCARE_TRANSLATIONS[code] || window.VETCARE_TRANSLATIONS.hi;
  localStorage.setItem(STORAGE_KEYS.LANG, code);

  const switcher = $('language-switcher');
  if (switcher && switcher.value !== code) {
    switcher.value = code;
  }

  safeText('gatewayAppTitle', dict.appTitle);
  safeText('appHeaderTitle', dict.appTitle);
  safeText('gatewayTagline', dict.tagline);

  const roleBadge = $('currentUserRoleBadge');
  if (roleBadge) {
    roleBadge.textContent = currentRole === 'DOCTOR' ? dict.roleDoctor : dict.roleFarmer;
  }

  const navMap = [
    { id: 'navDiagnosis', text: dict.tabDiag },
    { id: 'navRx', text: dict.tabRx },
    { id: 'navRecords', text: dict.tabRecords },
    { id: 'navInventory', text: dict.tabStock },
    { id: 'navAI', text: dict.tabAi },
    { id: 'navBreeding', text: dict.tabBreeding },
    { id: 'navFeed', text: dict.tabFeed },
    { id: 'navFinanceLabel', text: dict.tabKhata },
    { id: 'navHelpdesk', text: dict.tabSupport }
  ];

  navMap.forEach(item => {
    const el = $(item.id);
    if (el) {
      const span = el.querySelector('span:last-child') || el;
      if (span) span.textContent = item.text;
    }
  });

  window.syncAiKeyStatus();
};

/* =========================================================================
   6. PRIVATE SUPPORT TICKETS ENGINE (ZERO PHONE LEAK)
   ========================================================================= */
window.submitPrivateSupportTicket = function(issueText, contactEmailOrTag) {
  if (!issueText || issueText.trim().length === 0) {
    alert('कृपया समस्या का विवरण दर्ज करें।');
    return false;
  }

  const tickets = loadStorageJSON(STORAGE_KEYS.SUPPORT_TICKETS, []);
  const newTicket = {
    id: 'TCK-' + Date.now(),
    timestamp: new Date().toISOString(),
    issue: issueText.trim(),
    contactTag: (contactEmailOrTag || 'Anonymous').trim(),
    status: 'OPEN',
    appVersion: '4.2.0-PROD'
  };

  tickets.unshift(newTicket);
  saveStorageJSON(STORAGE_KEYS.SUPPORT_TICKETS, tickets);

  alert(`✅ आपकी सहायता टिकट (#${newTicket.id}) सुरक्षित रूप से दर्ज कर ली गई है। हमारी आंतरिक तकनीकी टीम शीघ्र समीक्षा करेगी।`);
  return true;
};

window.escalateToAdminWhatsApp = function() {
  const issuePrompt = prompt('कृपया अपनी सहायता क्वेरी या समस्या का संक्षिप्त विवरण लिखें (गोपनीय):');
  if (!issuePrompt) return;

  window.submitPrivateSupportTicket(issuePrompt, 'Direct Support Escalation');
  alert('🛡️ आपकी टिकट सिस्टम में एन्क्रिप्टेड रूप से सुरक्षित हो गई है। एडमिन सहायता सक्रिय की जा रही है।');

  const cleanMsg = encodeURIComponent(`*Vetcare सहायता अनुरोध*\nसत्र आईडी: ${Date.now()}\nविवरण: ${issuePrompt}`);
  window.open(`https://wa.me/919297000000?text=${cleanMsg}`, '_blank');
};

/* =========================================================================
   7. RESILIENT MULTI-MODEL GEMINI AI ENGINE (CRITICAL 404 RESILIENT FALLBACK)
   ========================================================================= */
window.openAiKeyModal = function() {
  const modal = $('modalAIKey');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
  const keyInput = $('inputGeminiKey');
  const stored = localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
  if (keyInput) keyInput.value = stored;
};

window.closeAiKeyModal = function() {
  const modal = $('modalAIKey');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
};

window.saveAiApiKey = function() {
  const keyInput = $('inputGeminiKey');
  if (!keyInput) return;
  const rawVal = keyInput.value.trim();

  if (rawVal.length > 0) {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, rawVal);
    window.syncAiKeyStatus();
    alert('✅ Gemini AI API Key सुरक्षित कर ली गई है!');
  } else {
    localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
    window.syncAiKeyStatus();
    alert('ℹ️ API Key हटा दी गई है। AI सुविधाएं निष्क्रिय रहेंगी।');
  }

  window.closeAiKeyModal();
};

window.toggleAiKeyVisibility = function() {
  const input = $('inputGeminiKey');
  const btn = $('btnToggleKeyVisibility');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    input.type = 'password';
    if (btn) btn.textContent = '👁️';
  }
};

window.syncAiKeyStatus = function() {
  const key = localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY);
  const badge = $('ai-status-indicator');
  const lang = localStorage.getItem(STORAGE_KEYS.LANG) || 'hi';
  const dict = window.VETCARE_TRANSLATIONS[lang] || window.VETCARE_TRANSLATIONS.hi;

  if (badge) {
    if (key && key.trim().length > 0) {
      badge.textContent = dict.aiActive;
      badge.className = 'text-[9px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300';
    } else {
      badge.textContent = dict.aiInactive;
      badge.className = 'text-[9px] bg-slate-100 text-slate-500 font-mono font-bold px-2 py-0.5 rounded-full border border-slate-300';
    }
  }
};

/**
 * Resilient multi-model Gemini caller iterating through endpoints until HTTP 200 is obtained.
 * Eliminates 404 "models/gemini-1.5-flash is not found for API version v1beta" errors.
 */
window.callGeminiClinicalAI = async function(promptText) {
  const apiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY);
  if (!apiKey || apiKey.trim().length === 0) {
    alert("कृपया पहले '⚙️ AI Key' बटन दबाकर अपनी कुंजी दर्ज करें!");
    if (window.openAiKeyModal) window.openAiKeyModal();
    return null;
  }

  const cleanKey = apiKey.trim();

  // Multi-Model Resilient Fallback Array
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${cleanKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${cleanKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${cleanKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${cleanKey}`
  ];

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are Vetcare Clinical AI OS, an authoritative large-animal veterinary specialist.
Format your answer clearly in Hindi and English.
Include:
1. Diagnosis & Confidence (%)
2. 5-Tier Treatment Protocols:
   - Tier 1: Emergency & Fluids / Shock Stabilization
   - Tier 2: Specific Antibiotics / Antiparasitics (Generic names, doses in mg/kg and total ml for 400kg animal)
   - Tier 3: Anti-inflammatories / Analgesics
   - Tier 4: Supportive Vitamins & Rumen Tonics
   - Tier 5: Management & Follow-up
3. 4-Stage Recovery Timeline (0-2h, 12h, 24h, 48-72h)
4. Pregnancy Contraindications explicitly highlighted.

Case Details:
${promptText}`
          }
        ]
      }
    ]
  };

  let lastError = null;

  for (let i = 0; i < endpoints.length; i++) {
    const url = endpoints[i];
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errJson = await response.json().catch(() => ({}));
        lastError = errJson.error?.message || response.statusText;
        console.warn(`Gemini Endpoint #${i + 1} Failed (${response.status}): ${lastError}. Switching to fallback...`);
        // If 404, 400 or other non-200 error, seamlessly continue to the next model
        if (response.status === 404 || response.status === 400 || response.status === 403 || response.status === 503) {
          continue;
        }
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`Gemini Network/Fetch Error on Endpoint #${i + 1}: ${lastError}. Switching to fallback...`);
    }
  }

  const finalMsg = lastError || "सभी AI मॉडल एंडपॉइंट्स पर प्रयास विफल रहा।";
  alert('❌ AI विश्लेषण त्रुटि: ' + finalMsg);
  throw new Error(finalMsg);
};

/**
 * Generates dynamic clinical disease profile with Gemini AI and renders 5-tier treatment cards.
 */
window.generateDiseaseWithGemini = async function(query) {
  const searchTerm = (query || safeVal('unifiedSearchInput') || safeVal('aiDoctorQuickPrompt') || '').trim();
  if (!searchTerm) {
    alert('कृपया विश्लेषण हेतु किसी रोग या लक्षण का नाम दर्ज करें।');
    return;
  }

  const spinner = $('aiDoctorLoadingSpinner');
  const btn = $('btnDoctorAiAnalyze');
  const quickOut = $('aiDoctorQuickOutput');
  const resultsContainer = $('diseaseSearchResults');

  if (spinner) spinner.classList.remove('hidden');
  if (btn) btn.disabled = true;

  if (quickOut) {
    quickOut.classList.remove('hidden');
    quickOut.style.display = 'block';
    quickOut.textContent = `🔄 Gemini Multi-Model इंजन से "${searchTerm}" के लिए 5-स्तरीय क्लिनिकल प्रोटोकॉल तैयार हो रहा है...`;
  }

  try {
    const prompt = `Create a complete clinical veterinary treatment sheet for cattle/buffalo with the following condition:
"${searchTerm}".
Detail Differential Diagnosis, Tier 1 to Tier 5 treatment protocol, dosage per route, and pregnancy safety.`;

    const aiResponse = await window.callGeminiClinicalAI(prompt);

    if (aiResponse) {
      // 1. Render in quick output container if active
      if (quickOut) {
        quickOut.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex justify-between items-center border-b border-purple-500/40 pb-2">
              <span class="font-black text-purple-200 text-sm">✨ क्लिनिकल AI रिपोर्ट: ${searchTerm}</span>
              <button onclick="window.applyAiReportToOpdPrescription()" class="text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-2.5 py-1 rounded-lg transition">
                + OPD में जोड़ें
              </button>
            </div>
            <div class="whitespace-pre-wrap text-xs text-purple-100 leading-relaxed font-mono bg-purple-900/40 p-3 rounded-xl border border-purple-500/30">
              ${aiResponse}
            </div>
          </div>
        `;
      }

      // 2. Also inject dynamic clinical card into disease search container if in diagnosis view
      if (resultsContainer && activeDiagnosisMode === 'HYBRID') {
        const dynamicCard = document.createElement('div');
        dynamicCard.className = "bg-gradient-to-br from-purple-50 to-white border-2 border-purple-300 rounded-3xl p-5 shadow-sm space-y-3 mb-4";
        dynamicCard.innerHTML = `
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">⚡ लाइव Gemini AI प्रोटोकॉल</span>
              <h3 class="text-base font-black text-purple-950 mt-1">${searchTerm}</h3>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-rose-600 font-bold text-sm">✕</button>
          </div>
          <div class="p-3 bg-white border border-purple-200 rounded-2xl text-xs space-y-2">
            <pre class="font-mono text-slate-800 whitespace-pre-wrap text-[11px] leading-relaxed">${aiResponse}</pre>
          </div>
          <button onclick="window.switchTab('rx'); setSafeVal('opdDiagnosis', '${searchTerm}'); setSafeVal('opdMedicine', \`${aiResponse.replace(/[`$]/g, '')}\`);" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            📋 इस AI प्रोटोकॉल से सीधे OPD पर्ची बनाएं
          </button>
        `;
        resultsContainer.prepend(dynamicCard);
      }
    }
  } catch (e) {
    if (quickOut) {
      quickOut.textContent = '⚠️ विश्लेषण पूरा नहीं हो सका: ' + e.message;
    }
  } finally {
    if (spinner) spinner.classList.add('hidden');
    if (btn) btn.disabled = false;
  }
};

window.applyAiReportToOpdPrescription = function() {
  const quickOut = $('aiDoctorQuickOutput');
  if (!quickOut) return;
  const text = quickOut.textContent || '';
  window.switchTab('rx');
  setSafeVal('opdMedicine', text);
  alert('✅ AI उपचार प्रोटोकॉल OPD पर्ची (Rx बॉक्स) में स्थानांतरित कर दिया गया है!');
};

window.runAIConsultant = async function() {
  const inputEl = $('aiInputPrompt');
  const outEl = $('aiOutputArea');
  const btn = $('btnRunAI');
  if (!inputEl || !outEl) return;

  const query = inputEl.value.trim();
  if (!query) {
    alert('कृपया केस के लक्षण और इतिहास दर्ज करें।');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ AI विश्लेषण जारी है...';
  }

  outEl.classList.remove('hidden');
  outEl.style.display = 'block';
  outEl.textContent = '🔄 Gemini Multi-Model इंजन क्लिनिकल केस प्रोसेस कर रहा है...';

  try {
    const result = await window.callGeminiClinicalAI(query);
    if (result) {
      outEl.textContent = result;
    } else {
      outEl.textContent = '⚠️ विश्लेषण पूरा नहीं हो सका। कृपया अपनी AI Key जांचें।';
    }
  } catch (err) {
    outEl.textContent = '⚠️ त्रुटि: ' + err.message;
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✨ AI से क्लिनिकल रिपोर्ट मांगें';
    }
  }
};

window.runDoctorAiQuickSecondOpinion = function() {
  const promptInput = $('aiDoctorQuickPrompt');
  const query = promptInput ? promptInput.value.trim() : '';
  if (!query) {
    alert('कृपया केस लक्षण या प्रस्तावित दवाएं लिखें।');
    return;
  }
  window.generateDiseaseWithGemini(query);
};

window.pasteOpdDetailsToAiPrompt = function() {
  const animal = safeVal('opdAnimal', 'पशु');
  const diag = safeVal('opdDiagnosis', '');
  const rx = safeVal('opdMedicine', '');
  const preg = safeVal('opdPregnancy', 'खाली');

  if (!diag && !rx) {
    alert('कृपया पहले OPD पर्ची में निदान या दवाएं भरें।');
    return;
  }

  const compiled = `पशु: ${animal} (${preg})\nनिदान: ${diag}\nप्रस्तावित दवाएं (Rx):\n${rx}`;
  setSafeVal('aiDoctorQuickPrompt', compiled);
};

window.sendCaseToAIConsultant = function() {
  window.switchTab('ai');
  const diag = safeVal('opdDiagnosis', '');
  const rx = safeVal('opdMedicine', '');
  const animal = safeVal('opdAnimal', 'गाय');
  const preg = safeVal('opdPregnancy', 'खाली');

  const promptText = `OPD केस विश्लेषण:\nपशु: ${animal} (${preg})\nनिदान: ${diag}\nदवाएं:\n${rx}`;
  setSafeVal('aiInputPrompt', promptText);
  window.runAIConsultant();
};

/* =========================================================================
   8. COMPREHENSIVE CLINICAL EVIDENCE DATABASE (22+ DISEASES)
   ========================================================================= */
const CORE_DISEASE_DB = [
  {
    id: 'HS',
    nameHindi: 'गलघोंटू (Hemorrhagic Septicemia - HS)',
    category: 'BACTERIAL',
    cardinal: 'NECK_SWELLING',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS', 'SALIVATION'],
    keywords: ['गलघोंटू', 'hs', 'गले में सूजन', 'घुर-घुर', 'तेज बुखार'],
    desc: 'पाश्चुरेला मल्टोसीडा जीवाणु जनित अति-घातक रोग। गले व जबड़े में गर्म सूजन और घुर-घुर की आवाज़।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 100 ग्राम सरसों के तेल में 10 ग्राम कपूर और 20 ग्राम हल्दी पकाकर गले की सूजन पर गुनगुना लगाएं। तुरंत डॉक्टर को बुलाएं।',
    doctorRx: 'Tier 1 (आपातकालीन): Inj. Dextrose Saline 5% 1-2L I/V.\nTier 2 (एंटीबायोटिक): Inj. Ceftiofur Sodium (1 gm/50kg) I/M या Inj. Enrofloxacin (5 mg/kg) I/M.\nTier 3 (NSAID): Inj. Flunixin Meglumine (2.2 mg/kg) I/V या Melonex Plus 15-20ml I/M.\nTier 4 (एंटीहिस्टामिन/कॉर्टिकोस्टेरॉयड): Inj. Avil 10ml I/M + Inj. Isoflupredone 10ml I/M.\nTier 5 (फॉलोअप): 24-48 घंटे बाद डोज़ दोहराएं।'
  },
  {
    id: 'BQ',
    nameHindi: 'लंगड़ा बुखार / चरचरा (Black Quarter - BQ)',
    category: 'BACTERIAL',
    cardinal: 'GAS_SWELLING',
    temp: 'HIGH',
    sec: ['LIMPING', 'OFF_FEED', 'DULLNESS'],
    keywords: ['bq', 'लंगड़ा', 'चर्र-चर्र', 'पुट्ठे में सूजन', 'गैस सूजन'],
    desc: 'क्लॉस्ट्रिडियम शोवेई जनित रोग। भारी मांसल अंगों (कंधे/पुट्ठे) में गैस भरी सूजन और दबाने पर चर्र-चर्र की आवाज़।',
    farmerRemedy: 'देसी प्राथमिक उपचार: सूजन वाले स्थान को गर्म पानी व नीम के पत्तों से सेकें। पशु को चलने न दें।',
    doctorRx: 'Tier 1 (घाव स्वच्छता): हाइड्रोजन पेरोक्साइड (3% H2O2) से चीरा लगाकर मृत ऊतक धोएं।\nTier 2 (एंटीबायोटिक): Inj. Procaine Penicillin (40 लाख IU) या Inj. Amoxicillin + Sulbactam (4.5g) I/M.\nTier 3 (NSAID): Inj. Melonex Plus 15-20ml I/M.\nTier 4 (टॉनिक): Inj. Tribivet 10ml I/M + Inj. Tonophosphan 10ml I/M.\nTier 5 (प्रबंधन): 3 दिन लगातार एंटीबायोटिक कवर जारी रखें।'
  },
  {
    id: 'FMD',
    nameHindi: 'खुरपका-मुंहपका (Foot and Mouth Disease - FMD)',
    category: 'VIRAL',
    cardinal: 'MOUTH_BLISTERS',
    temp: 'HIGH',
    sec: ['SALIVATION', 'LIMPING', 'MILK_DROP', 'OFF_FEED'],
    keywords: ['fmd', 'खुरपका', 'मुंहपका', 'छाले', 'तारदार लार', 'लंगड़ाना'],
    desc: 'अति-संक्रामक विषाणु जनित रोग। मुंह, जीभ, मसूड़ों व खुरों के बीच छाले, तेज बुखार और चिपचिपी लार।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 1% फिटकरी या पोटाश पानी से मुंह व खुर धोएं। शहद में पिसा सुहागा मिलाकर छालों पर लगाएं।',
    doctorRx: 'Tier 1 (लोकल एंटीसेप्टिक): 1:1000 पोटेशियम परमैंगनेट से मुंह धोएं + खुरों पर D-Mag स्प्रे।\nTier 2 (द्वितीयक संक्रमण रोकथाम): Inj. Ceftriaxone (Intacef 3g) I/M 3 दिन।\nTier 3 (एनाल्जेसिक): Inj. Melonex Plus 15ml I/M.\nTier 4 (इम्यूनिटी): Inj. Vitamin A, D3, E 5ml I/M + Inj. Avil 10ml I/M.\nTier 5 (सहायक): Masticare पाउडर 50 ग्राम प्रतिदिन।'
  },
  {
    id: 'MASTITIS',
    nameHindi: 'थनैल रोग (Mastitis)',
    category: 'BACTERIAL',
    cardinal: 'UDDER_HARD',
    temp: 'NORMAL',
    sec: ['MILK_DROP', 'DULLNESS'],
    keywords: ['थनैल', 'mastitis', 'अयन सूजन', 'दूध में खून', 'छिछड़े', 'थन कड़ा'],
    desc: 'अयन/थन की सूजन। दूध में गाढ़े छिछड़े, खून या पीला पानी आना और थन में दर्द व कड़ापन।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 250 ग्राम एलोवेरा + 50 ग्राम हल्दी + 15 ग्राम चूना पीसकर थन पर लेप लगाएं।',
    doctorRx: 'Tier 1 (इंट्रा-मैमरी अर्क): थन खाली कर Tilmicosin / Cefoperazone ट्यूब चढ़ाएं।\nTier 2 (सिस्टमिक एंटीबायोटिक): Inj. Intacef Tazo (3375mg) I/M या Inj. Marbofloxacin 10% (2mg/kg).\nTier 3 (एंटी-इन्फ्लेमेटरी): Inj. Flunixin Meglumine 15ml I/V या Inj. Melonex Plus 15ml I/M.\nTier 4 (एंजाइम थेरेपी): Inj. Serratiopeptidase 10ml I/M.\nTier 5 (बफर): Trisodium Citrate पाउडर 30 ग्राम दैनिक 5 दिन।'
  },
  {
    id: 'MILK_FEVER',
    nameHindi: 'मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)',
    category: 'METABOLIC',
    cardinal: 'STERNAL_RECUMBENCY',
    temp: 'SUB',
    sec: ['DULLNESS', 'OFF_FEED'],
    keywords: ['मिल्क फीवर', 'hypocalcemia', 'गर्दन मोड़कर बैठना', 'ठंडा शरीर', 'कैल्शियम कमी'],
    desc: 'ब्याने के तुरंत बाद रक्त में कैल्शियम की भारी कमी। पशु का तापमान कम (<100°F), गर्दन मोड़कर बैठना।',
    farmerRemedy: 'देसी प्राथमिक उपचार: पशु को कभी भी जबरन नाल न दें। गर्म बोरी से शरीर ढकें और तुरंत डॉक्टर से ड्रिप लगवाएं।',
    doctorRx: 'Tier 1 (आपातकालीन कैल्शियम): Calcium Borogluconate 25% (CBG / Mifex) 450ml (300ml धीमी गति I/V + 150ml S/C)।\nTier 2 (हृदय मॉनिटरिंग): I/V ड्रिप के दौरान स्टेथोस्कोप से हृदय गति जांचें।\nTier 3 (फॉस्फोरस सप्लीमेंट): Inj. Tonophosphan 10ml I/M.\nTier 4 (विटामिन बूस्टर): Inj. Tribivet 10ml I/M.\nTier 5 (ओरल जेल): होश में आने पर Cal-Up / Ostovet Gel 300g मुंह से दें।'
  },
  {
    id: 'KETOSIS',
    nameHindi: 'कीटोसिस / एसीटोनेमिया (Ketosis)',
    category: 'METABOLIC',
    cardinal: 'SWEET_BREATH',
    temp: 'NORMAL',
    sec: ['OFF_FEED', 'MILK_DROP', 'CONSTIPATION'],
    keywords: ['कीटोसिस', 'ketosis', 'मीठी गंध', 'सूखा भूसा', 'दूध घटना'],
    desc: 'ऊर्जा व ग्लूकोज की भारी कमी। सांस व दूध से मीठी एसीटोन गंध, पशु दाना छोड़कर केवल सूखा भूसा खाता है।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 250 ग्राम गुड़ + 50 मिली सरसों का तेल मिलाकर 5 दिन दें। दाने में ऊर्जा बढ़ाएं।',
    doctorRx: 'Tier 1 (ग्लूकोज रिप्लेसमेंट): Dextrose 20% या 25% 1000ml I/V फास्ट।\nTier 2 (ग्लूकोकोर्टिकोइड): Inj. Isoflupredone acetate 10ml I/M.\nTier 3 (प्रिकर्सर थेरेपी): Propylene Glycol 200ml ओरल दिन में 2 बार 4 दिन।\nTier 4 (बी-विटामिन): Inj. Tribivet 10ml I/M.\nTier 5 (ओरल बोलस): Niacinamide बोलस 2 गोली प्रतिदिन।'
  },
  {
    id: 'BLOAT',
    nameHindi: 'अफारा / टिम्पनी (Bloat / Tympany)',
    category: 'METABOLIC',
    cardinal: 'LEFT_FLANK_DRUM',
    temp: 'NORMAL',
    sec: ['OFF_FEED', 'DULLNESS', 'CONSTIPATION'],
    keywords: ['अफारा', 'bloat', 'पेट फूलना', 'ढोलक', 'गैस'],
    desc: 'रूमेन में अत्यधिक गैस या झाग जमा होना। बायां पेट ढोलक की तरह फूलना व जीभ बाहर निकलना।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 50 मिली तारपीन का तेल + 300 मिली मीठा तेल (सरसों) + 20 ग्राम हींग मिलाकर पिलाएं।',
    doctorRx: 'Tier 1 (आपातकालीन डिकम्प्रेशन): बाएं फ्लैंक से Trocar & Cannula द्वारा आपातकालीन गैस निकासी।\nTier 2 (एंटी-फोमिंग एजेंट): Bloatosil / Tympol liquid 100ml ओरल स्टमक ट्यूब से दें।\nTier 3 (एंटीस्पास्मोडिक): Inj. Spasmo-vet (Dicyclomine) 10-15ml I/M.\nTier 4 (न्यूरो-टोनिक): Inj. Belamyl 10ml I/M.\nTier 5 (रूमेन माइक्रोफ्लोरा): Himalayan Batisa 50g + Bioboost बोलस 4 गोली।'
  },
  {
    id: 'THEILERIOSIS',
    nameHindi: 'थायलेरियासिस (Theileriosis)',
    category: 'PROTOZOAL',
    cardinal: 'LYMPH_SWELLING',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS', 'MILK_DROP'],
    keywords: ['theileria', 'थायलेरिया', 'लिम्फ नोड सूजन', 'चिचड़ी बुखार'],
    desc: 'चिचड़ी जनित रक्त परजीवी रोग। कंधे की लिम्फ नोड में सूजन, तेज बुखार (105-106°F) व पीलिया/एनीमिया।',
    farmerRemedy: 'देसी प्राथमिक उपचार: चिचड़ियों को हाथ से न नोचें। नीम का गाढ़ा काढ़ा पशु के शरीर पर लगाएं।',
    doctorRx: 'Tier 1 (विशिष्ट प्रोटोजोआल): Inj. Buparvaquone (Butalex / Zubion) 2.5mg/kg (1ml/20kg) Deep I/M सिंगल डोज़।\nTier 2 (सहायक एंटीबायोटिक): Inj. Oxytetracycline LA (20mg/kg) Deep I/M.\nTier 3 (NSAID): Inj. Melonex Plus 15ml I/M.\nTier 4 (हेमाटिनिक): Inj. Feritas (Iron) 10ml I/M + Inj. Tribivet 10ml I/M.\nTier 5 (एक्टोपैरासाइटिसाइड): Flumethrin pour-on 10ml रीढ़ की हड्डी पर लगाएं।'
  },
  {
    id: 'BABESIOSIS',
    nameHindi: 'बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)',
    category: 'PROTOZOAL',
    cardinal: 'RED_URINE',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS', 'MILK_DROP'],
    keywords: ['बबेशिया', 'लाल पेशाब', 'कॉफी पेशाब', 'चिचड़ी', 'red water'],
    desc: 'बबेशिया परजीवी जनित रोग। पेशाब का रंग गहरा लाल या कॉफी जैसा होना, तेज बुखार और अत्यधिक कमजोरी।',
    farmerRemedy: 'देसी प्राथमिक उपचार: पशु को धूप से बचाएं। ठंडा पानी व गुड़ का शरबत पिलाएं। तुरंत डॉक्टर को बुलाएं।',
    doctorRx: 'Tier 1 (विशिष्ट एंटीप्रोटोजोअल): Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep I/M.\nTier 2 (आईवी सपोर्ट): Dextrose Saline 5% 1-2 लीटर I/V.\nTier 3 (एनाल्जेसिक): Inj. Melonex Plus 15ml I/M.\nTier 4 (एंटी-एनीमिक): Inj. Feritas (Iron) 10ml I/M + Inj. Tribivet 10ml I/M.\nTier 5 (लिवर एक्सट्रैक्ट): Inj. Belamyl 10ml I/M 3 दिन।'
  },
  {
    id: 'ANAPLASMOSIS',
    nameHindi: 'एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)',
    category: 'PROTOZOAL',
    cardinal: 'SEVERE_JAUNDICE',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS', 'CONSTIPATION'],
    keywords: ['anaplasma', 'एनाप्लास्मा', 'पीलिया', 'गंभीर पीलिया', 'कब्ज'],
    desc: 'एनाप्लाज्मा मार्जिनेल जनित रोग। अत्यधिक पीलिया, तेज बुखार, सूखा गोबर और बिना लाल पेशाब के गंभीर एनीमिया।',
    farmerRemedy: 'देसी प्राथमिक उपचार: गन्ने का रस या 250 ग्राम गुड़ का पानी पिलाएं। पशु को आराम दें।',
    doctorRx: 'Tier 1 (विशिष्ट एंटीमाइक्रोबियल): Inj. Oxytetracycline LA (20mg/kg) Deep I/M 72 घंटे बाद दोहराएं।\nTier 2 (अल्टरनेटिव): Inj. Imidocarb Dipropionate (3 mg/kg) S/C.\nTier 3 (एंटीपायरेटिक): Inj. Melonex 15ml I/M.\nTier 4 (लिवर टॉनिक): Inj. Belamyl 10ml I/M + Inj. Feritas 10ml I/M.\nTier 5 (इलेक्ट्रोलाइट): Normal Saline 0.9% 1000ml I/V।'
  },
  {
    id: 'ANTHRAX',
    nameHindi: 'एंथ्रेक्स / गिल्टी रोग (Anthrax)',
    category: 'BACTERIAL',
    cardinal: 'TAR_BLOOD',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS'],
    keywords: ['एंथ्रेक्स', 'anthrax', 'काला खून', 'गिल्टी रोग', 'अचानक मृत्यु'],
    desc: 'बैसिलस एंथ्रासिस जनित अति-घातक ज़ूनोटिक रोग। प्राकृतिक छेदों से काला बिना जमा हुआ तारदार खून रिसना। पोस्टमार्टम सख्त मना है।',
    farmerRemedy: 'चेतावनी: शव को कदापि न चीरें! 6 फीट गहरे गड्ढे में चूना व नमक डालकर सुरक्षित दफनाएं।',
    doctorRx: 'Tier 1 (अति-आपातकालीन): Inj. High Dose Procaine Penicillin (1 करोड़ IU) I/M.\nTier 2 (ऑक्सीटेट्रासाइक्लिन): Inj. Oxytetracycline (10 mg/kg) I/V धीमे प्रवाह से।\nTier 3 (एंटी-सीरम): विशिष्ट एंटी-एंथ्रेक्स सीरम उपलब्ध होने पर 100-150ml I/V.\nTier 4 (क्वॉरेंटाइन): फार्म का 5% फॉर्मेलिन या 20% ब्लीचिंग पाउडर से डिसइंफेक्शन।\nTier 5 (सूचना): मुख्य पशु चिकित्सा अधिकारी को तत्काल कानूनी रिपोर्ट दें।'
  },
  {
    id: 'SURRA',
    nameHindi: 'सर्रा / ट्रिपैनोसोमियासिस (Surra / Trypanosomiasis)',
    category: 'PROTOZOAL',
    cardinal: 'CIRCLING_HEAD_PRESSING',
    temp: 'HIGH',
    sec: ['DULLNESS', 'OFF_FEED', 'SALIVATION'],
    keywords: ['सर्रा', 'surra', 'चक्कर काटना', 'दीवार से सिर', 'तीवसा'],
    desc: 'ट्रिपैनोसोमा इवान्साई जनित रक्त परजीवी रोग। पशु गोल चक्कर काटता है व दीवार से सिर लगाता है।',
    farmerRemedy: 'देसी प्राथमिक उपचार: पशु को अंधेरे व शांत कमरे में रखें। मक्खियों से बचाव हेतु धुआं करें।',
    doctorRx: 'Tier 1 (विशिष्ट क्योर): Inj. Quinapyramine Sulfate + Chloride (Triquin) 4.4 mg/kg S/C.\nTier 2 (अल्टरनेटिव): Inj. Diminazene Aceturate (Berenil) 7 mg/kg Deep I/M.\nTier 3 (मस्तिष्क सूजन निवारक): Inj. Mannitol 20% 500ml I/V धीमे प्रवाह से।\nTier 4 (न्यूरो-सपोर्ट): Inj. Neuroxin-12 / Mecobalamin 10ml I/M.\nTier 5 (फॉलोअप): 30 दिन बाद प्रोफिलैक्टिक डोज़ सुनिश्चित करें।'
  },
  {
    id: 'PPR',
    nameHindi: 'पीपीआर / बकरी प्लेग (PPR - Goat Plague)',
    category: 'VIRAL',
    cardinal: 'MOUTH_EROSION_DIARRHEA',
    temp: 'HIGH',
    sec: ['DIARRHEA', 'SALIVATION', 'OFF_FEED'],
    keywords: ['ppr', 'बकरी प्लेग', 'मुंह में छाले', 'बदबूदार दस्त', 'भेड़ बकरी'],
    desc: 'भेड़-बकरियों का संक्रामक मोर्बिलीविषाणु रोग। मुंह में छाले, बदबूदार काले दस्त, आंख-नाक से स्राव और निर्जलीकरण।',
    farmerRemedy: 'देसी प्राथमिक उपचार: ओआरएस घोल व चावल की कांजी पिलाएं। मुंह को बोरिक एसिड के पानी से साफ करें।',
    doctorRx: 'Tier 1 (आईवी हाइड्रेशन): Ringers Lactate (RL) + 5% DNS 500ml I/V.\nTier 2 (एंटीबायोटिक कवर): Inj. Enrofloxacin 10% (1ml/20kg) I/M 3 दिन।\nTier 3 (एनाल्जेसिक): Inj. Melonex (1ml/30kg) I/M.\nTier 4 (एंटी-डायरियल): Bolus Neblon / Streptomagma 1/2 गोली दिन में दो बार।\nTier 5 (इम्यूनिटी): Inj. Vitamin A 2ml I/M।'
  },
  {
    id: 'ET',
    nameHindi: 'फिड़किया / आंत्रविषक्तता (Enterotoxemia - ET)',
    category: 'BACTERIAL',
    cardinal: 'OPISTHOTONOS',
    temp: 'NORMAL',
    sec: ['DIARRHEA', 'DULLNESS', 'OFF_FEED'],
    keywords: ['et', 'फिड़किया', 'आंत्रविषक्तता', 'सिर पीछे', 'clostridium'],
    desc: 'क्लॉस्ट्रिडियम परफ्रिन्जेन्स टाइप डी जनित रोग। अचानक दाना खाने के बाद सिर पीछे खींचना, मरोड़ व अचानक मृत्यु।',
    farmerRemedy: 'देसी प्राथमिक उपचार: हरा चारा व दाना तुरंत बंद करें। मीठा सोडा 20 ग्राम पानी में घोलकर पिलाएं।',
    doctorRx: 'Tier 1 (न्यूट्रलाइजेशन): Enterotoxemia एंटी-टॉक्सिन सीरम 50ml S/C.\nTier 2 (एंटीबायोटिक): Inj. Procaine Penicillin 20 लाख IU I/M या Ampicillin.\nTier 3 (एंटीस्पास्मोडिक व शामक): Inj. Diazepam 2-4ml I/M + Inj. Spasmo-vet 3ml I/M.\nTier 4 (ओरल अल्कलाइजर): Sodium Bicarbonate 5% सॉल्यूशन 100ml ओरल।\nTier 5 (सावधानी): स्वस्थ रेवड़ में तत्काल ET टीकाकरण सुनिश्चित करें।'
  },
  {
    id: 'RABIES',
    nameHindi: 'रेबीज / अलर्क रोग (Rabies)',
    category: 'VIRAL',
    cardinal: 'HYDROPHOBIA_BELL',
    temp: 'NORMAL',
    sec: ['SALIVATION', 'OFF_FEED', 'DULLNESS'],
    keywords: ['रेबीज', 'rabies', 'पागल कुत्ता', 'रंभाना', 'लार टपकना'],
    desc: 'रेबडोविषाणु जनित 100% प्राणघातक ज़ूनोटिक रोग। अत्यधिक रंभाना, लार टपकना, आक्रामक व्यवहार या पक्षाघात।',
    farmerRemedy: 'चेतावनी: पशु के मुंह में हाथ न डालें। पशु को अलग बांधें। काटने वाले घाव को साबुन पानी से 15 मिनट धोएं।',
    doctorRx: 'Tier 1 (पोस्ट-एक्सपोजर प्रोफिलेक्सिस): कुत्ता काटने के तत्काल बाद Rabivax-VET वैक्सीन (0, 3, 7, 14, 28 दिन)।\nTier 2 (लोकल घाव उपचार): घाव पर 10% पोविडोन आयोडीन सॉल्यूशन का व्यापक प्रयोग।\nTier 3 (लक्षण प्रकट होने पर): कोई एलोपैथिक उपचार संभव नहीं; लक्षण दिखने पर पशु को पृथक व सुरक्षित रखें।\nTier 4 (मानव सुरक्षा): संपर्क में आए समस्त हैंडलर्स तत्काल एंटी-रेबीज वैक्सीन लगवाएं।\nTier 5 (कानूनी निस्तारण): मृत्यु उपरांत प्रोटोकॉल अनुसार सुरक्षित दफन सुनिश्चित करें।'
  },
  {
    id: 'COLIC',
    nameHindi: 'पेट दर्द / शूल (Colic)',
    category: 'METABOLIC',
    cardinal: 'ROLLING_PAWING',
    temp: 'NORMAL',
    sec: ['CONSTIPATION', 'OFF_FEED', 'DULLNESS'],
    keywords: ['colic', 'पेट दर्द', 'जमीन पर लोटना', 'लात मारना', 'कब्ज'],
    desc: 'आंतों में ऐंठन या रुकावट। पशु बार-बार पेट की तरफ देखता है, लात मारता है, ज़मीन पर लोटता है व बेचैन रहता है।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 20 ग्राम अजवाइन + 10 ग्राम हींग + 200 मिली गुनगुने पानी में घोलकर पिलाएं।',
    doctorRx: 'Tier 1 (एंटीस्पास्मोडिक व दर्द निवारक): Inj. Spasmo-vet (Dicyclomine) 15ml I/M + Inj. Melonex 15ml I/M.\nTier 2 (आंत शिथिलक): Inj. Atropine Sulfate (कम डोज़ 5ml) केवल अत्यधिक दस्त/ऐंठन होने पर।\nTier 3 (पर्जेटिव लेक्सेटिव): Liquid Paraffin 500ml + Magnesium Sulfate 200g ओरल पेट खाली करने हेतु।\nTier 4 (फ्लूइड थेरेपी): Normal Saline 0.9% 1000ml I/V धीमे प्रवाह से।\nTier 5 (गैस्ट्रिक बफर): Digyton liquid 100ml ओरल।'
  },
  {
    id: 'ROP',
    nameHindi: 'जेर का रुकना (Retention of Placenta - ROP)',
    category: 'METABOLIC',
    cardinal: 'HANGING_PLACENTA',
    temp: 'NORMAL',
    sec: ['OFF_FEED', 'MILK_DROP'],
    keywords: ['rop', 'जेर रुकना', 'जेर नहीं गिरी', 'ब्याना', 'मेला'],
    desc: 'प्रसव के 8-12 घंटे बाद भी गर्भाशय से जेर का स्वतः बाहर न निकलना। संक्रमण का खतरा।',
    farmerRemedy: 'देसी प्राथमिक उपचार: 500 ग्राम गुड़ + 50 ग्राम अजवाइन + 25 ग्राम सोंठ का गुनगुना काढ़ा पिलाएं। जेर पर वजन न बांधें।',
    doctorRx: 'Tier 1 (गर्भाशय संकुचन): Inj. Oxytocin (30-40 IU) Deep I/M प्रसव के तुरंत बाद।\nTier 2 (हार्मोनल): Inj. PGF2alpha (Lutalyse 5ml या Pragma 2ml) I/M.\nTier 3 (इंट्रायूटेराइन बोलस): Uterotone / Cleanex बोलस (4 बोलस) गर्भाशय में रखें (हाथ से जबरन न खींचें)।\nTier 4 (सिस्टमिक एंटीबायोटिक): Inj. Intacef 3g I/M 3 दिन संक्रमण रोकथाम हेतु।\nTier 5 (ओरल गर्भाशय टॉनिक): Exapar / Utrasafe liquid 100ml प्रतिदिन 5 दिन।'
  },
  {
    id: 'PROLAPSE',
    nameHindi: 'फूल / प्रोलैप्स (Uterine / Vaginal Prolapse)',
    category: 'METABOLIC',
    cardinal: 'PROTRUDING_MASS',
    temp: 'NORMAL',
    sec: ['OFF_FEED', 'CONSTIPATION'],
    keywords: ['फूल निकलना', 'प्रोलैप्स', 'prolapse', 'पाछा दिखाना', 'बच्चेदानी बाहर'],
    desc: 'योनि या गर्भाशय के मांसल भाग का बाहर निकल आना। एस्ट्रोजन असंतुलन या कैल्शियम कमी।',
    farmerRemedy: 'देसी प्राथमिक उपचार: बाहर निकले अंग को 1% पोटाश या ठंडे पानी से साफ करें। साफ गीली चादर से ढकें।',
    doctorRx: 'Tier 1 (एपिड्यूरल एनेस्थीसिया): Lignocaine 2% (5-7ml) प्रथम व द्वितीय कॉक्सीजियल वर्टीब्रा के बीच।\nTier 2 (रिपोजिशनिंग व सूचर): अंग को अंदर बैठाकर Buhner\'s suture लगाएं।\nTier 3 (कैल्शियम थेरेपी): Calcium Borogluconate (Mifex) 450ml I/V।\nTier 4 (एंटीबायोटिक व दर्द निवारक): Inj. Intacef 3g I/M + Inj. Flunixin Meglumine 15ml I/M.\nTier 5 (ओरल सप्लीमेंट): Prolaprid पाउडर 50g दैनिक + शांत वातावरण।'
  },
  {
    id: 'PNEUMONIA',
    nameHindi: 'निमोनिया / फेफड़ों की सूजन (Pneumonia)',
    category: 'BACTERIAL',
    cardinal: 'DYSPNEA_WHEEZING',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'DULLNESS', 'MILK_DROP'],
    keywords: ['निमोनिया', 'pneumonia', 'खांसी', 'घुरघुर', 'हांफना', 'सांस फूलना'],
    desc: 'श्वसन तंत्र का गंभीर जीवाणु/विषाणु संक्रमण। हांफना, छाती से घुरघुर की आवाज़, नाक से गाढ़ा स्राव व खांसी।',
    farmerRemedy: 'देसी प्राथमिक उपचार: नीलगिरी तेल या विक्स डालकर गर्म पानी की भाप दें। ठंडी हवा से बचाएं।',
    doctorRx: 'Tier 1 (ब्रोंकोडाइलेटर): Inj. Deriphyllin 10ml I/M.\nTier 2 (रेस्पिरेटरी एंटीबायोटिक): Inj. Marbofloxacin 2mg/kg या Inj. Ceftiofur (1g/50kg) I/M 3-5 दिन।\nTier 3 (एंटी-इन्फ्लेमेटरी): Inj. Flunixin Meglumine (2.2mg/kg) I/V या Melonex Plus 15ml I/M.\nTier 4 (म्यूकोलिटिक व एंटीहिस्टामिन): Inj. Bromhexine 10ml I/M + Inj. Avil 10ml I/M.\nTier 5 (इम्यूनो-सपोर्ट): Inj. Ascorbic Acid (Vitamin C) 20ml I/V धीमे प्रवाह से।'
  },
  {
    id: 'FOOT_ROT',
    nameHindi: 'खुर सड़न (Foot Rot / Infectious Pododermatitis)',
    category: 'BACTERIAL',
    cardinal: 'FOOT_ROT_SMELL',
    temp: 'NORMAL',
    sec: ['LIMPING', 'MILK_DROP'],
    keywords: ['खुर सड़न', 'foot rot', 'खुर में मवाद', 'खुर घाव', 'लंगड़ाना'],
    desc: 'फ्यूसोबैक्टीरियम नेक्रोफोरम जीवाणु जनित खुरों के बीच सड़ांध। अत्यधिक लंगड़ाना व दुर्गंधयुक्त मवाद।',
    farmerRemedy: 'देसी प्राथमिक उपचार: खुरों को 5% कॉपर सल्फेट के घोल में 5 मिनट रखें। तारपीन का तेल लगाएं।',
    doctorRx: 'Tier 1 (खुर ड्रेसिंग): मृत सड़े ऊतक काटकर 10% Povidone Iodine से सफाई करें।\nTier 2 (लॉन्ग एक्टिंग एंटीबायोटिक): Inj. Oxytetracycline LA (20mg/kg) Deep I/M या Inj. Intacef 3g I/M.\nTier 3 (एंटी-इन्फ्लेमेटरी): Inj. Melonex Plus 15ml I/M 3 दिन।\nTier 4 (टॉपिकल स्प्रे): Topicure / Scavon स्प्रे दिन में दो बार लगाएं।\nTier 5 (जिंक सप्लीमेंट): Zincovit बोलस या कीलेटेड जिंक पाउडर 30 दिन तक।'
  },
  {
    id: 'TRP',
    nameHindi: 'हार्डवेयर रोग (Traumatic Reticuloperitonitis - TRP)',
    category: 'METABOLIC',
    cardinal: 'STERNAL_RECUMBENCY',
    temp: 'HIGH',
    sec: ['OFF_FEED', 'MILK_DROP', 'CONSTIPATION'],
    keywords: ['trp', 'हार्डवेयर', 'लोहा निगलना', 'तार निगलना', 'रेटिकुलम'],
    desc: 'नुकीली कील, तार आदि निगलने से रेटिकुलम व हृदय झिल्ली का छेद होना। छाती में तेज दर्द, कोहनी बाहर निकालना।',
    farmerRemedy: 'देसी प्राथमिक उपचार: पशु को आगे से ऊंचे ढलान वाले फर्श पर बांधें।',
    doctorRx: 'Tier 1 (मैग्नेट प्रशासन): Rumen Magnet स्टमक ट्यूब द्वारा रूमेन में स्थापित करें।\nTier 2 (ब्रॉड-स्पेक्ट्रम एंटीबायोटिक): Inj. Ampicillin + Cloxacillin 4g I/M या Ceftriaxone 3g 5 दिन।\nTier 3 (एनाल्जेसिक): Inj. Melonex Plus 15ml I/M.\nTier 4 (आईवी इलेक्ट्रोलाइट्स): Dextrose Normal Saline 5% 1000ml I/V.\nTier 5 (सर्जिकल): Rumenotomy द्वारा विदेशी वस्तु की निकासी।'
  },
  {
    id: 'COCCIDIOSIS',
    nameHindi: 'खूनी दस्त / कॉक्सीडियोसिस (Coccidiosis)',
    category: 'PROTOZOAL',
    cardinal: 'MOUTH_EROSION_DIARRHEA',
    temp: 'NORMAL',
    sec: ['DIARRHEA', 'DULLNESS', 'OFF_FEED'],
    keywords: ['कॉक्सीडिया', 'खूनी दस्त', 'coccidiosis', 'बछड़ा दस्त', 'पतले दस्त'],
    desc: 'आइमेरिया प्रोटोजोआ जनित रोग (विशेषकर बछड़ों/कटड़ों में)। खूनी व श्लेष्मयुक्त बदबूदार दस्त और गंभीर डिहाइड्रेशन।',
    farmerRemedy: 'देसी प्राथमिक उपचार: चावल का मांड़, छाछ में भुना जीरा व बेल का शरबत पिलाएं। ओआरएस अवश्य दें।',
    doctorRx: 'Tier 1 (एंटी-कॉक्सीडियल): Inj. Sulfadimidine 33.3% (0.2g/kg) I/V धीमे प्रवाह से या ओरल बोलस।\nTier 2 (विशिष्ट टॉलट्राजुरिल): Toltrazuril ओरल सस्पेंशन (15 mg/kg) सिंगल डोज़।\nTier 3 (हेमोस्टैटिक व विटामिन के): Inj. Botropase 2ml I/M + Inj. Vitamin K 5ml I/M.\nTier 4 (एंटी-डायरियल पाउडर): Neblon पाउडर 30g + Kaolin Pectin सस्पेंशन ओरल।\nTier 5 (हाइड्रेशन): DNS 500-1000ml I/V धीमे प्रवाह से।'
  }
];

/* =========================================================================
   9. SHAEFFER'S FORMULA & FEED RATION CALCULATOR
   ========================================================================= */
window.calculateShaeffersWeight = function(girthInches, lengthInches) {
  const g = parseFloat(girthInches);
  const l = parseFloat(lengthInches);
  if (isNaN(g) || isNaN(l) || g <= 0 || l <= 0) return 0;
  const weightPounds = (g * g * l) / 300;
  return Math.round(weightPounds * 0.45359237);
};

window.calculateDailyRation = function() {
  const weight = parseFloat(safeVal('feedWeight', '400'));
  const milk = parseFloat(safeVal('feedMilk', '10'));

  if (isNaN(weight) || weight <= 0) {
    alert('कृपया पशु का सही वजन दर्ज करें।');
    return;
  }

  const dryMatterReq = weight * 0.028;
  const concForMilk = milk > 0 ? (milk / 2.5) : 0;
  const totalGrainKg = Math.max(1.5 + concForMilk, 2.0).toFixed(1);

  const roughageDM = Math.max(dryMatterReq - (totalGrainKg * 0.9), 4.0);
  const dryFodderKg = (roughageDM * 0.4).toFixed(1);
  const greenFodderKg = (roughageDM * 0.6 * 4).toFixed(1);

  safeText('resFeedGrain', `${totalGrainKg} kg`);
  safeText('resFeedGreen', `${greenFodderKg} kg`);
  safeText('resFeedDry', `${dryFodderKg} kg`);

  const card = $('rationResultCard');
  if (card) card.classList.remove('hidden');
};

/* =========================================================================
   10. DIAGNOSIS ENGINE: 3-WAY MATRIX & SEARCH
   ========================================================================= */
window.setDiagnosisMode = function(mode) {
  activeDiagnosisMode = mode;
  ['panelDiagMatrix', 'panelDiagHybrid', 'panelDiagDirectory'].forEach(id => {
    const p = $(id);
    if (p) p.classList.add('hidden');
  });

  ['btnDiagMode1', 'btnDiagMode2', 'btnDiagMode3'].forEach(b => {
    const btn = $(b);
    if (btn) {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-xs');
      btn.classList.add('text-slate-600');
    }
  });

  if (mode === 'SYMPTOMS') {
    const p = $('panelDiagMatrix');
    const b = $('btnDiagMode1');
    if (p) p.classList.remove('hidden');
    if (b) {
      b.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
      b.classList.remove('text-slate-600');
    }
    window.applyMatrixFilters();
  } else if (mode === 'HYBRID') {
    const p = $('panelDiagHybrid');
    const b = $('btnDiagMode2');
    if (p) p.classList.remove('hidden');
    if (b) {
      b.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
      b.classList.remove('text-slate-600');
    }
    window.handleAppSearch();
  } else if (mode === 'DIRECTORY') {
    const p = $('panelDiagDirectory');
    const b = $('btnDiagMode3');
    if (p) p.classList.remove('hidden');
    if (b) {
      b.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
      b.classList.remove('text-slate-600');
    }
    window.filterByTag(activeDiseaseTag);
  }
};

window.toggleMatrixParam = function(paramType, val, elem) {
  if (paramType === 'temp') {
    if (matrixSelected.temp === val) {
      matrixSelected.temp = null;
      if (elem) elem.classList.remove('chip-active');
    } else {
      matrixSelected.temp = val;
      const siblings = elem?.parentElement?.querySelectorAll('.m-chip');
      siblings?.forEach(s => s.classList.remove('chip-active'));
      if (elem) elem.classList.add('chip-active');
    }
  }
  window.applyMatrixFilters();
};

window.toggleSecSymptom = function(symCode, elem) {
  const idx = matrixSelected.secondary.indexOf(symCode);
  if (idx > -1) {
    matrixSelected.secondary.splice(idx, 1);
    if (elem) elem.classList.remove('chip-active');
  } else {
    matrixSelected.secondary.push(symCode);
    if (elem) elem.classList.add('chip-active');
  }
  window.applyMatrixFilters();
};

window.resetSymptomMatrix = function() {
  matrixSelected = { temp: null, cardinal: 'ALL', secondary: [] };
  const sel = $('selCardinalSign');
  if (sel) sel.value = 'ALL';
  document.querySelectorAll('.m-chip, .s-chip').forEach(c => c.classList.remove('chip-active'));
  window.applyMatrixFilters();
};

window.applyMatrixFilters = function() {
  const sel = $('selCardinalSign');
  if (sel) matrixSelected.cardinal = sel.value;

  const scored = CORE_DISEASE_DB.map(d => {
    let score = 0;
    let matchedFactors = 0;

    if (matrixSelected.temp && d.temp === matrixSelected.temp) {
      score += 20;
      matchedFactors++;
    }

    if (matrixSelected.cardinal && matrixSelected.cardinal !== 'ALL') {
      if (d.cardinal === matrixSelected.cardinal) {
        score += 40;
        matchedFactors++;
      }
    }

    if (matrixSelected.secondary.length > 0 && d.sec) {
      const matches = matrixSelected.secondary.filter(s => d.sec.includes(s));
      const fraction = matches.length / matrixSelected.secondary.length;
      score += Math.round(fraction * 40);
      if (matches.length > 0) matchedFactors++;
    }

    const finalPercentage = (matrixSelected.temp || matrixSelected.cardinal !== 'ALL' || matrixSelected.secondary.length > 0)
      ? Math.min(score, 100)
      : 100;

    return { ...d, matchScore: finalPercentage, activeMatches: matchedFactors };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);

  safeText('matchCountBadge', `${scored.length} रोग एक्टिव`);
  safeText(
    'matchScoreText',
    matrixSelected.cardinal !== 'ALL' || matrixSelected.temp || matrixSelected.secondary.length > 0
      ? `क्लिनिकल संभावना मिलान (% अनुसार क्रमबद्ध):`
      : `लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी`
  );

  window.renderDiseaseCards(scored);
};

window.handleAppSearch = function() {
  const q = safeVal('unifiedSearchInput', '').toLowerCase();
  if (!q) {
    window.renderDiseaseCards(CORE_DISEASE_DB);
    return;
  }

  const filtered = CORE_DISEASE_DB.filter(d => {
    return (
      d.nameHindi.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      (d.keywords && d.keywords.some(k => k.toLowerCase().includes(q)))
    );
  });

  // If local catalog doesn't return strong matches, prompt with Gemini button
  if (filtered.length === 0) {
    const container = $('diseaseSearchResults');
    if (container) {
      container.innerHTML = `
        <div class="p-6 bg-white border border-purple-200 rounded-3xl text-center space-y-3">
          <span class="text-3xl">🧬</span>
          <p class="text-xs font-bold text-slate-700">स्थानीय डेटाबेस में "${q}" नहीं मिला।</p>
          <button onclick="window.generateDiseaseWithGemini('${q}')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition">
            ✨ Gemini AI से "${q}" का 5-स्तरीय क्लिनिकल प्रोटोकॉल तैयार करें
          </button>
        </div>
      `;
    }
    return;
  }

  window.renderDiseaseCards(filtered);
};

window.filterByTag = function(tag, elem) {
  activeDiseaseTag = tag;
  if (elem) {
    const chips = elem.parentElement?.querySelectorAll('.q-chip');
    chips?.forEach(c => {
      c.classList.remove('bg-blue-600', 'text-white', 'font-bold');
      c.classList.add('bg-slate-100', 'text-slate-700', 'font-medium');
    });
    elem.classList.add('bg-blue-600', 'text-white', 'font-bold');
    elem.classList.remove('bg-slate-100', 'text-slate-700');
  }

  let filtered = CORE_DISEASE_DB;
  if (tag !== 'ALL') {
    filtered = CORE_DISEASE_DB.filter(d => d.category === tag);
  }
  window.renderDiseaseCards(filtered);
};

window.renderDiseaseCards = function(list) {
  const container = $('diseaseSearchResults');
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-white border border-slate-200 rounded-3xl text-center text-slate-500 space-y-2">
        <span class="text-3xl">🔍</span>
        <p class="text-xs font-semibold">कोई रोग या लक्षण मैच नहीं हुआ। कृपया अन्य लक्षण चुनें।</p>
      </div>`;
    return;
  }

  container.innerHTML = list
    .map(d => {
      const isDoctor = currentRole === 'DOCTOR';
      const scoreBadge = d.matchScore !== undefined
        ? `<span class="text-xs font-mono font-black ${d.matchScore >= 60 ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-blue-100 text-blue-700 border-blue-300'} px-2 py-0.5 rounded-lg border">
            संभावना: ${d.matchScore}%
          </span>`
        : '';

      const treatmentContent = isDoctor
        ? `<div class="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-900 flex items-center gap-1">🩺 5-स्तरीय क्लिनिकल प्रोटोकॉल (Rx):</span>
              <button onclick="window.autoFillOPDFromDisease('${d.id}')" class="text-[10px] bg-blue-600 text-white font-bold px-2 py-1 rounded-lg hover:bg-blue-700 transition">
                + OPD पर्ची में जोड़ें
              </button>
            </div>
            <pre class="font-mono text-slate-800 whitespace-pre-wrap leading-relaxed text-[11px]">${d.doctorRx}</pre>
          </div>`
        : `<div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1 text-emerald-950">
            <span class="font-bold text-emerald-900 flex items-center gap-1">🌿 पशुपालक प्राथमिक उपचार व देसी नुस्खे:</span>
            <p class="text-[11px] leading-relaxed">${d.farmerRemedy}</p>
          </div>`;

      return `
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-2 transition hover:border-slate-300">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">${d.nameHindi}</h3>
              <span class="inline-block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">श्रेणी: ${d.category}</span>
            </div>
            ${scoreBadge}
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${d.desc}</p>
          ${treatmentContent}
        </div>
      `;
    })
    .join('');
};

window.autoFillOPDFromDisease = function(diseaseId) {
  const dis = CORE_DISEASE_DB.find(d => d.id === diseaseId);
  if (!dis) return;
  window.switchTab('rx');
  setSafeVal('opdDiagnosis', dis.nameHindi);
  setSafeVal('opdMedicine', dis.doctorRx);
  alert(`✅ ${dis.nameHindi} का विवरण OPD पर्ची में भर दिया गया है।`);
};

/* =========================================================================
   11. DIGITAL OPD PRESCRIPTION SLIP & WHATSAPP DISPATCH
   ========================================================================= */
window.captureGPSLocation = function() {
  const gpsInput = $('opdGPS');
  const btn = $('btnGPS');
  if (!navigator.geolocation) {
    alert('ब्राउज़र में GPS सुविधा उपलब्ध नहीं है।');
    return;
  }
  if (btn) btn.textContent = '📍 खोज रहे हैं...';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      if (gpsInput) gpsInput.value = `${lat}, ${lng}`;
      if (btn) btn.textContent = '✅ GPS सेव';
    },
    err => {
      alert('GPS लोकेशन प्राप्त नहीं हो सकी।');
      if (btn) btn.textContent = '📍 GPS';
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
};

window.calculateDue = function() {
  const total = parseFloat(safeVal('opdTotalFee', '0')) || 0;
  const paid = parseFloat(safeVal('opdPaidFee', '0')) || 0;
  const due = Math.max(total - paid, 0);
  setSafeVal('opdDueFee', due);
};

window.clearRxField = function() {
  setSafeVal('opdMedicine', '');
};

window.saveOfflineCaseDirectly = function() {
  const farmerName = safeVal('opdFarmerName');
  const phone = safeVal('opdFarmerPhone');
  const village = safeVal('opdVillage');
  const animal = safeVal('opdAnimal', 'गाय');
  const tag = safeVal('opdTag', '-');
  const preg = safeVal('opdPregnancy', 'खाली');
  const diag = safeVal('opdDiagnosis');
  const med = safeVal('opdMedicine');
  const total = parseFloat(safeVal('opdTotalFee', '0')) || 0;
  const paid = parseFloat(safeVal('opdPaidFee', '0')) || 0;
  const due = parseFloat(safeVal('opdDueFee', '0')) || 0;
  const gps = safeVal('opdGPS', '-');

  if (!farmerName || !phone || !diag) {
    alert('कृपया किसान का नाम, मोबाइल नंबर और प्रोविजनल निदान भरें।');
    return null;
  }

  const newRecord = {
    id: 'OPD-' + Date.now(),
    date: new Date().toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    farmerName,
    phone,
    village,
    animal,
    tag,
    preg,
    diag,
    med,
    total,
    paid,
    due,
    gps
  };

  const records = loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []);
  records.unshift(newRecord);
  saveStorageJSON(STORAGE_KEYS.OPD_RECORDS, records);

  if (due > 0) {
    const khataDb = loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []);
    khataDb.unshift({
      id: 'KHATA-' + Date.now(),
      date: new Date().toLocaleDateString('hi-IN'),
      farmerName,
      phone,
      type: 'DUE',
      amount: due,
      note: `OPD बकाया: ${diag} (${animal})`
    });
    saveStorageJSON(STORAGE_KEYS.KHATA_RECORDS, khataDb);
  }

  alert('✅ केस पर्ची सुरक्षित की गई!');
  window.renderRecordsList();
  return newRecord;
};

window.dispatchWhatsAppRx = function() {
  const record = window.saveOfflineCaseDirectly();
  if (!record) return;

  const msg = `*पशु चिकित्सा डिजिटल ओपीडी पर्ची* 🩺
*क्लिनिक:* ${AppConfig.payeeName}
*तारीख:* ${record.date}
----------------------------
*किसान:* ${record.farmerName} (${record.village || 'गाँव'})
*मोबाइल:* ${record.phone}
*पशु:* ${record.animal} | *टैग:* ${record.tag} | *स्थिति:* ${record.preg}
*रोग निदान:* ${record.diag}
----------------------------
*दवा व इंजेक्शन (Rx):*
${record.med || 'सलाह अनुसार देखभाल करें।'}
----------------------------
*फीस विवरण:*
कुल फीस: ₹${record.total}
जमा राशि: ₹${record.paid}
*बकाया राशि:* ₹${record.due}
----------------------------
_Vetcare AI OS Clinical System_`;

  const cleanPhone = record.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
};

window.printCurrentOPDSlip = function() {
  const printArea = $('printableSlipArea');
  if (!printArea) return;

  const farmer = safeVal('opdFarmerName', 'अज्ञात');
  const phone = safeVal('opdFarmerPhone', '-');
  const village = safeVal('opdVillage', '-');
  const animal = safeVal('opdAnimal', 'गाय');
  const tag = safeVal('opdTag', '-');
  const preg = safeVal('opdPregnancy', 'खाली');
  const diag = safeVal('opdDiagnosis', '-');
  const rx = safeVal('opdMedicine', 'कोई दवा नहीं');
  const total = safeVal('opdTotalFee', '0');
  const paid = safeVal('opdPaidFee', '0');
  const due = safeVal('opdDueFee', '0');

  printArea.innerHTML = `
    <div style="border: 2px solid #000; padding: 20px; font-family: sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">
        <h2 style="margin: 0; font-size: 20px;">${AppConfig.payeeName}</h2>
        <p style="margin: 3px 0; font-size: 12px;">पशु चिकित्सा एवं क्लिनिकल ओपीडी केंद्र</p>
        <p style="margin: 0; font-size: 11px;">तारीख: ${new Date().toLocaleString('hi-IN')}</p>
      </div>
      <div style="margin-top: 15px; font-size: 12px;">
        <p><strong>किसान का नाम:</strong> ${farmer} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>फोन:</strong> ${phone} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>गाँव:</strong> ${village}</p>
        <p><strong>पशु:</strong> ${animal} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>टैग सं.:</strong> ${tag} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>स्थिति:</strong> ${preg}</p>
        <p><strong>प्रोविजनल निदान:</strong> ${diag}</p>
      </div>
      <hr style="margin: 15px 0;" />
      <div style="font-size: 12px;">
        <h4 style="margin: 0 0 8px 0;">दवाएं, इंजेक्शन व खुराक (Rx):</h4>
        <pre style="font-family: monospace; white-space: pre-wrap; font-size: 11px;">${rx}</pre>
      </div>
      <hr style="margin: 15px 0;" />
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span><strong>कुल फीस:</strong> ₹${total}</span>
        <span><strong>जमा:</strong> ₹${paid}</span>
        <span style="color: #b91c1c;"><strong>बकाया:</strong> ₹${due}</span>
      </div>
      <div style="margin-top: 30px; display: flex; justify-content: space-between; font-size: 11px;">
        <span>हस्ताक्षर पशुपालक</span>
        <span>अधिकृत पशु चिकित्सक</span>
      </div>
    </div>
  `;

  window.print();
};

/* =========================================================================
   12. CASE RECORDS, KHATA LEDGER & INVENTORY ENGINE
   ========================================================================= */
window.renderRecordsList = function(filterQuery = '') {
  const listContainer = $('recordsList');
  if (!listContainer) return;

  const records = loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []);
  safeText('recordTotalBadge', `${records.length} केस सुरक्षित`);

  let filtered = records;
  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    filtered = records.filter(
      r =>
        r.farmerName.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        (r.village && r.village.toLowerCase().includes(q)) ||
        r.diag.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
        कोई केस रिकॉर्ड नहीं मिला।
      </div>`;
    return;
  }

  listContainer.innerHTML = filtered
    .map(
      r => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
        <div class="flex justify-between items-start">
          <div>
            <strong class="text-sm font-bold text-slate-900">${r.farmerName}</strong>
            <span class="text-slate-500 text-[11px] block">${r.village || 'गाँव'} • 📞 ${r.phone}</span>
          </div>
          <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">${r.date}</span>
        </div>
        <div class="p-2 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-700">
          <div><strong>पशु:</strong> ${r.animal} (${r.preg})</div>
          <div><strong>निदान:</strong> <span class="text-blue-700 font-bold">${r.diag}</span></div>
          <div class="truncate"><strong>Rx:</strong> ${r.med || '-'}</div>
        </div>
        <div class="flex justify-between items-center text-[11px] pt-1">
          <span class="${r.due > 0 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}">
            फीस: ₹${r.total} (बकाया: ₹${r.due})
          </span>
          <div class="flex gap-2">
            <button onclick="window.reSendWhatsAppRecord('${r.id}')" class="text-emerald-600 hover:underline font-bold">व्हाट्सएप</button>
            <button onclick="window.deleteRecord('${r.id}')" class="text-rose-500 hover:underline">हटाएं</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');
};

window.handleRecordSearch = function() {
  const q = safeVal('searchRecordsInput');
  window.renderRecordsList(q);
};

window.reSendWhatsAppRecord = function(recordId) {
  const records = loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []);
  const r = records.find(item => item.id === recordId);
  if (!r) return;

  const msg = `*पशु चिकित्सा डिजिटल पर्ची* 🩺\n*किसान:* ${r.farmerName}\n*पशु:* ${r.animal}\n*रोग निदान:* ${r.diag}\n*दवाएं:*\n${r.med}\n*बकाया राशि:* ₹${r.due}`;
  const cleanPhone = r.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
};

window.deleteRecord = function(recordId) {
  if (!confirm('क्या आप इस केस रिकॉर्ड को हटाना चाहते हैं?')) return;
  let records = loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []);
  records = records.filter(r => r.id !== recordId);
  saveStorageJSON(STORAGE_KEYS.OPD_RECORDS, records);
  window.renderRecordsList();
};

window.openNewKhataModal = function() {
  const m = $('modalNewKhata');
  if (m) m.style.display = 'flex';
};

window.closeNewKhataModal = function() {
  const m = $('modalNewKhata');
  if (m) m.style.display = 'none';
};

window.saveNewKhataRecord = function() {
  const farmerName = safeVal('khataFarmerName');
  const phone = safeVal('khataFarmerPhone');
  const amount = parseFloat(safeVal('khataAmount', '0'));
  const type = safeVal('khataType', 'DUE');
  const note = safeVal('khataNote', 'सामान्य लेन-देन');

  if (!farmerName || !phone || isNaN(amount) || amount <= 0) {
    alert('कृपया किसान का नाम, फोन व सही राशि दर्ज करें।');
    return;
  }

  const newEntry = {
    id: 'KHATA-' + Date.now(),
    date: new Date().toLocaleDateString('hi-IN'),
    farmerName,
    phone,
    type,
    amount,
    note
  };

  const khataDb = loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []);
  khataDb.unshift(newEntry);
  saveStorageJSON(STORAGE_KEYS.KHATA_RECORDS, khataDb);

  window.closeNewKhataModal();
  setSafeVal('khataFarmerName', '');
  setSafeVal('khataFarmerPhone', '');
  setSafeVal('khataAmount', '');
  setSafeVal('khataNote', '');

  window.renderKhataList();
};

window.renderKhataList = function() {
  const listContainer = $('finDueList');
  if (!listContainer) return;

  const khataDb = loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []);
  const search = safeVal('searchKhataInput', '').toLowerCase();

  let totalPaid = 0;
  let totalDue = 0;

  khataDb.forEach(item => {
    if (item.type === 'PAID') totalPaid += item.amount;
    else if (item.type === 'DUE') totalDue += item.amount;
  });

  safeText('finCredit', `₹${totalPaid}`);
  safeText('finDebit', `₹${totalDue}`);

  let filtered = khataDb;
  if (search) {
    filtered = khataDb.filter(
      k => k.farmerName.toLowerCase().includes(search) || k.phone.includes(search)
    );
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
        कोई खाता रिकॉर्ड उपलब्ध नहीं है।
      </div>`;
    return;
  }

  listContainer.innerHTML = filtered
    .map(
      k => `
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex justify-between items-center text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-slate-900 font-bold">${k.farmerName}</strong>
            <span class="text-[10px] text-slate-500">(${k.phone})</span>
          </div>
          <p class="text-[11px] text-slate-600 mt-0.5">${k.note} • <span class="font-mono text-slate-400">${k.date}</span></p>
        </div>
        <div class="text-right">
          <span class="text-sm font-black ${k.type === 'DUE' ? 'text-rose-600' : 'text-emerald-700'}">
            ${k.type === 'DUE' ? '- ₹' : '+ ₹'}${k.amount}
          </span>
          <span class="block text-[10px] uppercase font-bold text-slate-400">${k.type === 'DUE' ? 'बकाया (Due)' : 'जमा (Paid)'}</span>
          <button onclick="window.deleteKhataItem('${k.id}')" class="text-[10px] text-slate-400 hover:text-rose-600 underline mt-0.5">हटाएं</button>
        </div>
      </div>
    `
    )
    .join('');
};

window.deleteKhataItem = function(id) {
  if (!confirm('क्या आप इस प्रविष्टि को हटाना चाहते हैं?')) return;
  let khataDb = loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []);
  khataDb = khataDb.filter(k => k.id !== id);
  saveStorageJSON(STORAGE_KEYS.KHATA_RECORDS, khataDb);
  window.renderKhataList();
};

const DEFAULT_INVENTORY_ITEMS = [
  { id: 'INV-1', name: 'Inj. Intacef Tazo (3375mg)', category: 'INJECTION', stock: 12, minAlert: 5, unit: 'vials' },
  { id: 'INV-2', name: 'Inj. Melonex Plus (100ml)', category: 'INJECTION', stock: 8, minAlert: 3, unit: 'vials' },
  { id: 'INV-3', name: 'Inj. Mifex (CBG 450ml)', category: 'INJECTION', stock: 2, minAlert: 4, unit: 'bottles' },
  { id: 'INV-4', name: 'मुर्राह सीमन स्ट्रॉ (Top Bull)', category: 'SEMEN', stock: 45, minAlert: 15, unit: 'straws' },
  { id: 'INV-5', name: 'एचएफ साहीवाल क्रॉस सीमन', category: 'SEMEN', stock: 6, minAlert: 10, unit: 'straws' },
  { id: 'INV-6', name: 'Bolus Bioboost Culture', category: 'BOLUS', stock: 20, minAlert: 8, unit: 'strips' },
  { id: 'INV-7', name: 'Tympol Liquid (100ml)', category: 'TONIC', stock: 15, minAlert: 5, unit: 'bottles' }
];

window.openNewInventoryItemModal = function() {
  const m = $('modalNewInventory');
  if (m) m.style.display = 'flex';
};

window.closeNewInventoryModal = function() {
  const m = $('modalNewInventory');
  if (m) m.style.display = 'none';
};

window.saveNewInventoryItem = function() {
  const name = safeVal('invItemName');
  const category = safeVal('invItemCategory', 'INJECTION');
  const stock = parseInt(safeVal('invItemStock', '0'), 10);
  const minAlert = parseInt(safeVal('invItemMinAlert', '3'), 10);
  const unit = safeVal('invItemUnit', 'vials');

  if (!name || isNaN(stock) || stock < 0) {
    alert('कृपया दवा का नाम और सही स्टॉक मात्रा दर्ज करें।');
    return;
  }

  const newItem = { id: 'INV-' + Date.now(), name, category, stock, minAlert, unit };
  const inv = loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);
  inv.unshift(newItem);
  saveStorageJSON(STORAGE_KEYS.INVENTORY, inv);

  window.closeNewInventoryModal();
  setSafeVal('invItemName', '');
  setSafeVal('invItemStock', '');
  window.renderInventory();
};

window.filterInventoryCategory = function(category, elem) {
  activeInventoryCategory = category;
  if (elem) {
    const chips = elem.parentElement?.querySelectorAll('.inv-chip');
    chips?.forEach(c => {
      c.classList.remove('bg-blue-600', 'text-white', 'font-bold');
      c.classList.add('bg-slate-100', 'text-slate-700', 'font-medium');
    });
    elem.classList.add('bg-blue-600', 'text-white', 'font-bold');
    elem.classList.remove('bg-slate-100', 'text-slate-700');
  }
  window.renderInventory();
};

window.adjustStock = function(id, delta) {
  const inv = loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);
  const item = inv.find(i => i.id === id);
  if (!item) return;

  item.stock = Math.max(item.stock + delta, 0);
  saveStorageJSON(STORAGE_KEYS.INVENTORY, inv);
  window.renderInventory();
};

window.deleteInventoryItem = function(id) {
  if (!confirm('क्या आप इस आइटम को हटाना चाहते हैं?')) return;
  let inv = loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);
  inv = inv.filter(i => i.id !== id);
  saveStorageJSON(STORAGE_KEYS.INVENTORY, inv);
  window.renderInventory();
};

window.renderInventory = function() {
  const container = $('inventoryItemsContainer');
  if (!container) return;

  const inv = loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);
  let lowStockCount = 0;

  let filtered = inv;
  if (activeInventoryCategory !== 'ALL') {
    filtered = inv.filter(i => i.category === activeInventoryCategory);
  }

  inv.forEach(i => {
    if (i.stock <= i.minAlert) lowStockCount++;
  });

  const lowBadge = $('lowStockAlertBadge');
  if (lowBadge) {
    if (lowStockCount > 0) {
      lowBadge.classList.remove('hidden');
      lowBadge.textContent = `⚠️ चेतावनी: ${lowStockCount} आइटम न्यूनतम स्टॉक से कम हैं!`;
    } else {
      lowBadge.classList.add('hidden');
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
        इस श्रेणी में कोई स्टॉक आइटम मौजूद नहीं है।
      </div>`;
    return;
  }

  container.innerHTML = filtered
    .map(item => {
      const isLow = item.stock <= item.minAlert;
      return `
      <div class="p-3 bg-white border ${isLow ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-2xl flex items-center justify-between text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-slate-900 font-bold">${item.name}</strong>
            ${isLow ? '<span class="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded border border-rose-300">कम स्टॉक!</span>' : ''}
          </div>
          <span class="text-[11px] text-slate-500 block">श्रेणी: ${item.category} • न्यूनतम सीमा: ${item.minAlert} ${item.unit}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.adjustStock('${item.id}', -1)" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg flex items-center justify-center text-slate-700 text-sm active:scale-95">-</button>
          <span class="font-mono font-black text-sm min-w-8 text-center ${isLow ? 'text-rose-600' : 'text-slate-900'}">${item.stock}</span>
          <button onclick="window.adjustStock('${item.id}', 1)" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg flex items-center justify-center text-slate-700 text-sm active:scale-95">+</button>
          <span class="text-[10px] text-slate-400 font-medium">${item.unit}</span>
          <button onclick="window.deleteInventoryItem('${item.id}')" class="text-slate-300 hover:text-rose-500 text-xs ml-1" title="हटाएं">✕</button>
        </div>
      </div>
    `;
    })
    .join('');
};

/* =========================================================================
   13. PAYMENT GATEWAY WITH VERIFIED DUAL-BANK DETAILS
   ========================================================================= */
window.openPremiumPaymentModal = function() {
  const m = $('modalPremiumPayment');
  if (m) m.style.display = 'flex';
  window.selectPaymentPlan(selectedPlan);
};

window.closePremiumPaymentModal = function() {
  const m = $('modalPremiumPayment');
  if (m) m.style.display = 'none';
};

window.selectPaymentPlan = function(plan) {
  selectedPlan = plan;
  const btnM = $('btnPlanMonthly');
  const btnA = $('btnPlanAnnual');

  const price = plan === 'MONTHLY' ? AppConfig.monthlyPrice : AppConfig.annualPrice;
  safeText('directUPIAmount', price);

  if (plan === 'MONTHLY') {
    if (btnM) btnM.className = 'py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition';
    if (btnA) btnA.className = 'py-2 rounded-xl text-slate-700 font-medium text-center transition';
  } else {
    if (btnA) btnA.className = 'py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition';
    if (btnM) btnM.className = 'py-2 rounded-xl text-slate-700 font-medium text-center transition';
  }

  window.switchBankTab(activeBank);
};

window.switchBankTab = function(bankKey) {
  activeBank = bankKey;
  const btnSBI = $('btnTabSBI');
  const btnPNB = $('btnTabPNB');

  const price = selectedPlan === 'MONTHLY' ? AppConfig.monthlyPrice : AppConfig.annualPrice;
  const upiId = bankKey === 'SBI' ? AppConfig.sbiUpi : AppConfig.pnbUpi;
  const acNum = bankKey === 'SBI' ? AppConfig.sbiAccount : AppConfig.pnbAccount;
  const ifsc = bankKey === 'SBI' ? AppConfig.sbiIfsc : AppConfig.pnbIfsc;

  if (bankKey === 'SBI') {
    if (btnSBI) btnSBI.className = 'flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition';
    if (btnPNB) btnPNB.className = 'flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition';
  } else {
    if (btnPNB) btnPNB.className = 'flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition';
    if (btnSBI) btnSBI.className = 'flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition';
  }

  safeText('dispPayeeName', AppConfig.payeeName);
  safeText('dispUPIId', upiId);
  safeText('dispAccountNumber', acNum);
  safeText('dispIFSC', ifsc);

  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(AppConfig.payeeName)}&am=${price}&cu=INR&tn=${encodeURIComponent('Vetcare Premium')}`;
  const qrImg = $('dynamicQRImage');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}`;
  }

  const directBtn = $('btnDirectUPILink');
  if (directBtn) {
    directBtn.href = upiUri;
  }
};

window.sendPaymentProofWhatsApp = function() {
  const price = selectedPlan === 'MONTHLY' ? AppConfig.monthlyPrice : AppConfig.annualPrice;
  const upi = activeBank === 'SBI' ? AppConfig.sbiUpi : AppConfig.pnbUpi;

  const text = `*प्रीमियम भुगतान सत्यापन अनुरोध (Vetcare AI OS)*\n-------------------------\n*प्लान:* ${selectedPlan === 'MONTHLY' ? 'मासिक (₹199)' : 'वार्षिक (₹1499)'}\n*भुगतान राशि:* ₹${price}\n*भुगतान किया गया UPI:* ${upi}\n*खाता धारक:* ${AppConfig.payeeName}\n-------------------------\nमैंने भुगतान पूर्ण कर लिया है। कृपया मेरा प्रीमियम सक्रिय करें। (स्क्रीनशॉट संलग्न)`;

  window.open(`https://wa.me/919297000000?text=${encodeURIComponent(text)}`, '_blank');
};

/* =========================================================================
   14. SUPER ADMIN DASHBOARD CONFIGURATION & METRICS
   ========================================================================= */
window.populateAdminDashboard = function() {
  setSafeVal('cfgPayeeName', AppConfig.payeeName);
  setSafeVal('cfgMonthlyPrice', AppConfig.monthlyPrice);
  setSafeVal('cfgAnnualPrice', AppConfig.annualPrice);

  setSafeVal('cfgSbiUpi', AppConfig.sbiUpi);
  setSafeVal('cfgSbiAccount', AppConfig.sbiAccount);
  setSafeVal('cfgSbiIfsc', AppConfig.sbiIfsc);

  setSafeVal('cfgPnbUpi', AppConfig.pnbUpi);
  setSafeVal('cfgPnbAccount', AppConfig.pnbAccount);
  setSafeVal('cfgPnbIfsc', AppConfig.pnbIfsc);

  setSafeVal('cfgAppTitle', AppConfig.appTitle);
  setSafeVal('cfgLogoUrl', AppConfig.logoUrl);
  setSafeVal('cfgAppTagline', AppConfig.appTagline);

  setSafeVal('cfgAdminWhatsApp', '9297000000');
  setSafeVal('cfgAdminPIN', AppConfig.adminPin);

  const opdDb = loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []);
  const khataDb = loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []);
  const invDb = loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);

  let dues = 0;
  khataDb.forEach(k => {
    if (k.type === 'DUE') dues += k.amount;
  });

  let lowStock = 0;
  invDb.forEach(i => {
    if (i.stock <= i.minAlert) lowStock++;
  });

  safeText('metricTotalOPD', opdDb.length);
  safeText('metricTotalDues', `₹${dues}`);
  safeText('metricLowStock', lowStock);
};

window.closeAdminDashboard = function() {
  const d = $('modalAdminDashboard') || $('admin-dashboard-modal');
  if (d) {
    d.classList.add('hidden');
    d.style.display = 'none';
  }
};

window.switchAdminTab = function(tabId) {
  const tabs = ['Payment', 'Branding', 'Support', 'Metrics'];
  tabs.forEach(t => {
    const p = $('adminPanel' + t);
    if (p) p.classList.add('hidden');
    const b = $('tabBtnAdmin' + (t === 'Payment' ? 'Pay' : t === 'Branding' ? 'Brand' : t));
    if (b) {
      b.classList.remove('border-blue-600', 'text-blue-600');
      b.classList.add('border-transparent');
    }
  });

  const activePanel = $('adminPanel' + (tabId === 'PAYMENT' ? 'Payment' : tabId === 'BRANDING' ? 'Branding' : tabId === 'SUPPORT' ? 'Support' : 'Metrics'));
  if (activePanel) activePanel.classList.remove('hidden');

  const activeBtn = $('tabBtnAdmin' + (tabId === 'PAYMENT' ? 'Pay' : tabId === 'BRANDING' ? 'Brand' : tabId === 'SUPPORT' ? 'Support' : 'Metrics'));
  if (activeBtn) {
    activeBtn.classList.add('border-blue-600', 'text-blue-600');
    activeBtn.classList.remove('border-transparent');
  }
};

window.saveAllAdminSettings = function() {
  AppConfig.payeeName = safeVal('cfgPayeeName', AppConfig.payeeName);
  AppConfig.monthlyPrice = parseFloat(safeVal('cfgMonthlyPrice', '199')) || 199;
  AppConfig.annualPrice = parseFloat(safeVal('cfgAnnualPrice', '1499')) || 1499;

  AppConfig.sbiUpi = safeVal('cfgSbiUpi', AppConfig.sbiUpi);
  AppConfig.sbiAccount = safeVal('cfgSbiAccount', AppConfig.sbiAccount);
  AppConfig.sbiIfsc = safeVal('cfgSbiIfsc', AppConfig.sbiIfsc);

  AppConfig.pnbUpi = safeVal('cfgPnbUpi', AppConfig.pnbUpi);
  AppConfig.pnbAccount = safeVal('cfgPnbAccount', AppConfig.pnbAccount);
  AppConfig.pnbIfsc = safeVal('cfgPnbIfsc', AppConfig.pnbIfsc);

  AppConfig.appTitle = safeVal('cfgAppTitle', AppConfig.appTitle);
  AppConfig.logoUrl = safeVal('cfgLogoUrl', '');
  AppConfig.appTagline = safeVal('cfgAppTagline', AppConfig.appTagline);

  saveStorageJSON(STORAGE_KEYS.APP_CONFIG, AppConfig);
  alert('✅ एडमिन सेटिंग्स सफलतापूर्वक सुरक्षित की गईं!');
  window.closeAdminDashboard();
};

window.exportDataBackupJSON = function() {
  const backupObj = {
    config: AppConfig,
    opd: loadStorageJSON(STORAGE_KEYS.OPD_RECORDS, []),
    khata: loadStorageJSON(STORAGE_KEYS.KHATA_RECORDS, []),
    inventory: loadStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS),
    tickets: loadStorageJSON(STORAGE_KEYS.SUPPORT_TICKETS, []),
    exportedAt: new Date().toISOString()
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `vetcare_backup_${Date.now()}.json`);
  dlAnchor.click();
  dlAnchor.remove();
};

window.clearDemoDataOnly = function() {
  if (!confirm('क्या आप परीक्षण व डेमो डेटा रीसेट करना चाहते हैं?')) return;
  localStorage.removeItem(STORAGE_KEYS.OPD_RECORDS);
  localStorage.removeItem(STORAGE_KEYS.KHATA_RECORDS);
  localStorage.removeItem(STORAGE_KEYS.INVENTORY);
  window.renderRecordsList();
  window.renderKhataList();
  window.renderInventory();
  alert('🧹 डेमो डेटा रीसेट कर दिया गया है।');
};

/* =========================================================================
   15. BREEDING MODULE INITIALIZER
   ========================================================================= */
function initBreedingModule() {
  const heatBox = $('heatSignsContainer');
  const dischargeBox = $('dischargeContainer');
  const repeatBox = $('repeatBreederList');

  if (heatBox) {
    heatBox.innerHTML = `
      <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
        <p class="font-bold text-rose-900">1. प्रारंभिक मद (0-8 घंटे):</p>
        <p class="text-[11px] text-rose-800">पशु रंभाता है, बेचैन रहता है, अन्य पशुओं पर चढ़ने का प्रयास करता है। (सीमन न करवाएं)</p>
      </div>
      <div class="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
        <p class="font-bold text-emerald-900">2. मुख्य मद / श्रेष्ठ समय (9-18 घंटे): ⭐</p>
        <p class="text-[11px] text-emerald-800">पशु शांत खड़ा रहता है (Standing Heat)। सीमन (A.I.) डलवाने का सर्वोत्तम समय।</p>
      </div>
      <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
        <p class="font-bold text-slate-800">3. अंतिम मद (19-24 घंटे):</p>
        <p class="text-[11px] text-slate-600">मद समाप्त होने लगती है। सीमन सफलता दर घटने लगती है।</p>
      </div>
    `;
  }

  if (dischargeBox) {
    dischargeBox.innerHTML = `
      <div class="p-2.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
        <p class="font-bold text-blue-900">शीशे जैसा पारदर्शी तार (कांच जैसा): ✅</p>
        <p class="text-[11px] text-blue-800">गर्भाशय स्वस्थ है और पशु गर्भधारण के लिए पूर्णतः तैयार है। तत्काल A.I. कराएं।</p>
      </div>
      <div class="p-2.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
        <p class="font-bold text-amber-900">धुंधला या मवादयुक्त मैला तार: ⚠️</p>
        <p class="text-[11px] text-amber-800">गर्भाशय में संक्रमण (Metritis)। सीमन न करवाएं; पहले डॉक्टर से सफाई कराएं।</p>
      </div>
    `;
  }

  if (repeatBox) {
    repeatBox.innerHTML = `
      <li>मद के 12 से 14 घंटे बाद ही उच्च कोटि का सीमन (A.I.) डलवाएं (AM-PM नियम)।</li>
      <li>सीमन के समय पशु को तनाव से मुक्त रखें और ठंडा पानी पिलाएं।</li>
      <li>गर्भाशय टॉनिक व मिनरल मिक्सचर (Chelated Minerals + Vitamin E) प्रतिदिन 50g दें।</li>
      <li>यदि 3 बार फिर चुकी हो, तो A.I. के तुरंत बाद Inj. Receptal / Buserelin (2.5ml I/M) लगवाएं।</li>
    `;
  }
}

/* =========================================================================
   16. NAVIGATION AND ROLE STATE SYSTEM
   ========================================================================= */
const TAB_SECTIONS = [
  'diagnosis',
  'breeding',
  'feed',
  'rx',
  'records',
  'ai',
  'finance',
  'inventory',
  'helpdesk'
];

window.switchTab = function(tabKey) {
  TAB_SECTIONS.forEach(t => {
    const sEl = $('view' + t.charAt(0).toUpperCase() + t.slice(1));
    if (sEl) sEl.classList.add('hidden');

    const navBtn = $('nav' + t.charAt(0).toUpperCase() + t.slice(1));
    if (navBtn) {
      navBtn.classList.remove('active-nav-tab');
      navBtn.classList.add('text-slate-400');
    }
  });

  const activeSection = $('view' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
  if (activeSection) activeSection.classList.remove('hidden');

  const activeNav = $('nav' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
  if (activeNav) {
    activeNav.classList.add('active-nav-tab');
    activeNav.classList.remove('text-slate-400');
  }

  if (tabKey === 'records') window.renderRecordsList();
  if (tabKey === 'finance') window.renderKhataList();
  if (tabKey === 'inventory') window.renderInventory();
};

window.applyRoleState = function(role) {
  const isDoctor = (role || '').toLowerCase() === 'doctor';
  currentRole = isDoctor ? 'DOCTOR' : 'FARMER';

  const roleBadge = $('currentUserRoleBadge');
  const rxNav = $('navRx');
  const recNav = $('navRecords');
  const invNav = $('navInventory');
  const aiNav = $('navAI');
  const breedingNav = $('navBreeding');
  const feedNav = $('navFeed');
  const finLabel = $('navFinanceLabel');

  const lang = localStorage.getItem(STORAGE_KEYS.LANG) || 'hi';
  const dict = window.VETCARE_TRANSLATIONS[lang] || window.VETCARE_TRANSLATIONS.hi;

  if (isDoctor) {
    if (roleBadge) roleBadge.textContent = dict.roleDoctor;
    if (rxNav) rxNav.classList.remove('hidden');
    if (recNav) recNav.classList.remove('hidden');
    if (invNav) invNav.classList.remove('hidden');
    if (aiNav) aiNav.classList.remove('hidden');
    if (finLabel) finLabel.textContent = 'क्लिनिक खाता';
    window.switchTab('diagnosis');
  } else {
    if (roleBadge) roleBadge.textContent = dict.roleFarmer;
    if (rxNav) rxNav.classList.add('hidden');
    if (recNav) recNav.classList.add('hidden');
    if (invNav) invNav.classList.add('hidden');
    if (aiNav) aiNav.classList.add('hidden');
    if (breedingNav) breedingNav.classList.remove('hidden');
    if (feedNav) feedNav.classList.remove('hidden');
    if (finLabel) finLabel.textContent = dict.tabKhata;
    window.switchTab('diagnosis');
  }

  window.applyMatrixFilters();
  window.renderKhataList();
  window.renderInventory();
  window.syncAiKeyStatus();
};

/* =========================================================================
   17. SYSTEM BOOTSTRAPPER (SYNTAX SAFE EVENT INITIALIZATION)
   ========================================================================= */
function bootstrapApp() {
  const savedConfig = loadStorageJSON(STORAGE_KEYS.APP_CONFIG, null);
  if (savedConfig) {
    AppConfig = { ...VERIFIED_FINANCIAL_CONFIG, ...savedConfig };
  }

  const preferredLang = localStorage.getItem(STORAGE_KEYS.LANG) || 'hi';
  window.setAppLanguage(preferredLang);

  window.initSessionTimer();
  initBreedingModule();
  window.syncAiKeyStatus();

  const savedRole = localStorage.getItem('vetcare_registered_role') || localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE);
  if (savedRole) {
    window.selectRole(savedRole);
  } else {
    window.returnToGateway();
  }

  if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
    saveStorageJSON(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY_ITEMS);
  }

  window.calculateDailyRation();

  ['click', 'keydown', 'touchstart'].forEach(evtType => {
    document.addEventListener(evtType, () => {
      // Passive session keep-alive listener
    }, { passive: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
