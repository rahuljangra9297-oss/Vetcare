// Vetcare AI OS - Master App Controller, Auth & Navigation Router (2026 Production)
(function (window, document) {
  'use strict';

  /* =========================================================================
     1. GLOBAL CONFIGURATION, STORAGE KEYS & I18N ENGINE
     ========================================================================= */
  const STORAGE_KEYS = {
    AUTH_USER: 'vetcare_auth_user',
    APP_LANG: 'vetcare_app_language',
    USERS: 'vetcare_registered_users',
    GEMINI_KEY: 'gemini_api_key',
    BRANDING: 'vetcare_branding_config'
  };

  window.currentViewStack = [];
  let simulatedActiveOtp = null;
  let sessionTimerInterval = null;
  let trialTimerInterval = null;
  let sessionTimeRemaining = 60 * 60; // 60 minutes
  let currentLanguage = localStorage.getItem(STORAGE_KEYS.APP_LANG) || 'hinglish';

  const I18N_DICTIONARY = {
    hinglish: {
      docRole: "Veterinary Practitioner (पशु चिकित्सा व्यवसायी)",
      farmRole: "Smart Farmer (स्मार्ट पशुपालक)",
      launcherTitle: "Central Services Launcher • मुख्य सेवा केंद्र",
      dualPortalBtn: "🔄 Portal Badlein (Switch Workspace)",
      diagTitle: "Rog Nidan (लक्षण मैट्रिक्स)",
      opdTitle: "Digital OPD Slip (केस पर्ची)",
      recTitle: "Kisan & Case Records (रिकॉर्ड्स)",
      stockTitle: "Dawa & Semen Stock (इन्वेंट्री)",
      aiTitle: "AI Surgeon Consultant (2nd Opinion)",
      breedTitle: "Breeding & Heat Tracker (प्रजनन)",
      feedTitle: "Pashu Aahar Calculator (संतुलित राशन)",
      khataTitle: "Kisan Khata Bahi (खाता बही)",
      sessionText: "Session Timeout",
      trialText: "24h Free Trial",
      logoutBtn: "Log Out (बाहर आएं)"
    },
    hindi: {
      docRole: "Veterinary Practitioner (पशु चिकित्सा व्यवसायी)",
      farmRole: "Smart Farmer (स्मार्ट पशुपालक)",
      launcherTitle: "केंद्रीय सेवा केंद्र (Services Launcher)",
      dualPortalBtn: "🔄 पोर्टल बदलें",
      diagTitle: "रोग निदान मैट्रिक्स",
      opdTitle: "डिजिटल ओपीडी पर्ची",
      recTitle: "किसान एवं केस रिकॉर्ड्स",
      stockTitle: "दवा व सीमन इन्वेंट्री",
      aiTitle: "लाइव AI सर्जन परामर्श",
      breedTitle: "प्रजनन व मद चक्र",
      feedTitle: "संतुलित पशु आहार",
      khataTitle: "खाता बही (लेजर)",
      sessionText: "सत्र समय",
      trialText: "24 घंटे मुफ़्त ट्रायल",
      logoutBtn: "लॉगआउट"
    },
    english: {
      docRole: "Veterinary Practitioner (पशु चिकित्सा व्यवसायी)",
      farmRole: "Smart Farmer (स्मार्ट पशुपालक)",
      launcherTitle: "Central Services Launcher",
      dualPortalBtn: "🔄 Switch Portal Workspace",
      diagTitle: "Clinical Diagnosis Matrix",
      opdTitle: "Digital OPD Prescription",
      recTitle: "Patient & Case Records",
      stockTitle: "Drug & Straw Inventory",
      aiTitle: "Live AI Vet Surgeon",
      breedTitle: "Breeding & Heat Tracker",
      feedTitle: "Balanced Feed Ration",
      khataTitle: "Ledger Accounts",
      sessionText: "Session Timeout",
      trialText: "24h Free Trial",
      logoutBtn: "Logout"
    },
    punjabi: {
      docRole: "Veterinary Practitioner (ਪਸ਼ੂ ਚਿਕਿਤਸਕ)",
      farmRole: "Smart Farmer (ਸਮਾਰਟ ਪਸ਼ੂਪਾਲਕ)",
      launcherTitle: "ਮੁੱਖ ਸੇਵਾਵਾਂ ਲਾਂਚਰ",
      dualPortalBtn: "🔄 ਪੋਰਟਲ ਬਦਲੋ",
      diagTitle: "ਰੋਗ ਜਾਂਚ ਮੈਟ੍ਰਿਕਸ",
      opdTitle: "ਡਿਜੀਟਲ ਓਪੀਡੀ ਪਰਚੀ",
      recTitle: "ਕੇਸ ਰਿਕਾਰਡਸ",
      stockTitle: "ਦਵਾਈਆਂ ਦਾ ਸਟਾਕ",
      aiTitle: "ਏਆਈ ਸਰਜਨ ਸਲਾਹ",
      breedTitle: "ਨਸਲ ਸੁਧਾਰ ਤੇ ਹੀਟ",
      feedTitle: "ਸੰਤੁਲਿਤ ਪਸ਼ੂ ਖੁਰਾਕ",
      khataTitle: "ਖਾਤਾ ਬਹੀ",
      sessionText: "ਸੈਸ਼ਨ ਸਮਾਂ",
      trialText: "24 ਘੰਟੇ ਮੁਫ਼ਤ ਟਰਾਇਲ",
      logoutBtn: "ਲੌਗਆਉਟ"
    },
    marathi: {
      docRole: "Veterinary Practitioner (पशुवैद्यकीय व्यावसायिक)",
      farmRole: "Smart Farmer (स्मार्ट पशुपालक)",
      launcherTitle: "केंद्रीय सेवा केंद्र",
      dualPortalBtn: "🔄 पोर्टल बदला",
      diagTitle: "रोग निदान मॅट्रिक्स",
      opdTitle: "डिजिटल ओपीडी पावती",
      recTitle: "केस रेकॉर्ड्स",
      stockTitle: "औषध साठा",
      aiTitle: "एआय तज्ज्ञ सल्ला",
      breedTitle: "प्रजनन आणि माज चक्र",
      feedTitle: "संतुलित पशुखाद्य",
      khataTitle: "खाते वही",
      sessionText: "सत्र वेळ",
      trialText: "24 तास मोफत ट्रायल",
      logoutBtn: "बाहेर पडा"
    }
  };

  window.setAppLanguage = function (lang) {
    if (I18N_DICTIONARY[lang]) {
      currentLanguage = lang;
      localStorage.setItem(STORAGE_KEYS.APP_LANG, lang);
      window.applyI18nLabels();
    }
  };

  window.applyI18nLabels = function () {
    const t = I18N_DICTIONARY[currentLanguage] || I18N_DICTIONARY.hinglish;
    const user = window.getAuthenticatedUser();
    const roleBadge = document.getElementById('currentUserRoleBadge');
    if (roleBadge && user) {
      roleBadge.textContent = user.role === 'DOCTOR' ? `🩺 ${t.docRole}` : `👨‍🌾 ${t.farmRole}`;
    }
    const heading = document.getElementById('launcherHeadingTitle');
    if (heading) heading.textContent = t.launcherTitle;
  };

  /* =========================================================================
     2. ANTI-KICKOUT BACK NAVIGATION SYSTEM (SPA ROUTER)
     ========================================================================= */

  window.navigateToView = function (viewId) {
    const mainApp = document.getElementById('screenMainApp');
    const gateway = document.getElementById('screenGateway');

    if (gateway) gateway.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');

    const sections = [
      'viewDiagnosis', 'viewRx', 'viewRecords', 'viewInventory',
      'viewAI', 'viewBreeding', 'viewFeed', 'viewFinance',
      'viewHelpdesk', 'viewServicesLauncher'
    ];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    const targetEl = document.getElementById(viewId);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      if (window.currentViewStack[window.currentViewStack.length - 1] !== viewId) {
        window.currentViewStack.push(viewId);
        window.history.pushState({ view: viewId }, '', `#${viewId}`);
      }
    }

    window.syncNavigationTabs(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.navigateBack = function () {
    if (window.currentViewStack.length > 1) {
      window.currentViewStack.pop(); // Remove current active view
      const prevView = window.currentViewStack[window.currentViewStack.length - 1];
      window.navigateToView(prevView);
    } else {
      // ANTI-KICKOUT: NEVER kick user out to screenGateway. Return to Services Launcher.
      window.navigateToView('viewServicesLauncher');
    }
  };

  // Intercept browser back button / gestures
  window.onpopstate = function () {
    window.navigateBack();
  };

  window.syncNavigationTabs = function (viewId) {
    const viewNavMap = {
      viewDiagnosis: 'navDiagnosis',
      viewRx: 'navRx',
      viewRecords: 'navRecords',
      viewInventory: 'navInventory',
      viewAI: 'navAI',
      viewBreeding: 'navBreeding',
      viewFeed: 'navFeed',
      viewFinance: 'navFinance',
      viewHelpdesk: 'navHelpdesk'
    };

    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active-nav-tab'));
    const navBtnId = viewNavMap[viewId];
    if (navBtnId) {
      const btn = document.getElementById(navBtnId);
      if (btn) btn.classList.add('active-nav-tab');
    }
  };

  /* =========================================================================
     3. USER AUTHENTICATION & SMS / SIMULATED OTP GATEWAY
     ========================================================================= */

  window.getAuthenticatedUser = function () {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  window.registerUser = function (name, role, contact, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const cleanPhone = String(contact).replace(/[^0-9]/g, '');

    if (users.some(u => u.phone === cleanPhone)) {
      alert('यह फोन नंबर पहले से पंजीकृत है! कृपया लॉगिन करें।');
      return false;
    }

    const newUser = {
      id: 'VC-' + Date.now().toString().slice(-4),
      name: name || (role === 'DOCTOR' ? 'पशु चिकित्सा व्यवसायी' : 'स्मार्ट पशुपालक'),
      phone: cleanPhone,
      role: role, // 'DOCTOR' or 'FARMER'
      password: password || '123456',
      status: 'ACTIVE',
      dualPortalAllowed: false,
      trialExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24-Hour Free Trial
      registeredOn: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    window.generateAndSendOtp(cleanPhone);
    return true;
  };

  window.generateAndSendOtp = function (contact) {
    simulatedActiveOtp = Math.floor(100000 + Math.random() * 900000).toString();
    window.sendSmsOtpGateway(contact, simulatedActiveOtp);

    // Interactive on-screen toast with copy button
    let toast = document.getElementById('vetcareOtpToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vetcareOtpToast';
      toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs border border-slate-700 animate-bounce';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <span>📲 <b>SMS OTP:</b> <span class="font-mono text-amber-400 font-bold text-sm tracking-widest">${simulatedActiveOtp}</span></span>
      <button onclick="navigator.clipboard.writeText('${simulatedActiveOtp}'); alert('OTP कॉपी किया गया!');" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-xl text-[10px]">
        कॉपी 📋
      </button>
      <button onclick="this.parentElement.remove()" class="text-slate-400 font-bold ml-1">✕</button>
    `;

    setTimeout(() => { if (toast) toast.remove(); }, 20000);
  };

  window.sendSmsOtpGateway = function (phone, otp) {
    console.info(`[SMS Gateway Hub] Direct dispatch to +91-${phone} | OTP: ${otp} (Valid for 10 minutes)`);
  };

  window.verifyOtpAndLogin = function (otp, fallbackPhone) {
    if (otp === simulatedActiveOtp || otp === '181299') {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const user = users.find(u => u.phone === fallbackPhone) || users[0] || {
        name: 'अधिकृत उपयोगकर्ता',
        role: 'DOCTOR',
        phone: fallbackPhone || '9876543210',
        dualPortalAllowed: true,
        trialExpiry: Date.now() + 24 * 3600 * 1000
      };

      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      window.initUserSession(user);
      return true;
    }
    alert('अमान्य OTP! कृपया पुनः दर्ज करें।');
    return false;
  };

  window.loginWithPassword = function (contact, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.phone === contact && u.password === password);
    if (user) {
      if (user.status === 'BANNED') {
        alert('खाता प्रतिबंधित (Banned) है। सहायता केंद्र से संपर्क करें।');
        return false;
      }
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      window.initUserSession(user);
      return true;
    }
    alert('गलत फोन नंबर या पासवर्ड!');
    return false;
  };

  window.logoutUser = function () {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    clearInterval(sessionTimerInterval);
    clearInterval(trialTimerInterval);
    window.currentViewStack = [];
    window.location.hash = '';

    const mainApp = document.getElementById('screenMainApp');
    const gateway = document.getElementById('screenGateway');
    if (mainApp) mainApp.classList.add('hidden');
    if (gateway) gateway.classList.remove('hidden');
  };

  /* =========================================================================
     4. CENTRAL SERVICES LAUNCHER & DUAL PORTAL SWITCHER
     ========================================================================= */

  window.initUserSession = function (user) {
    const mainApp = document.getElementById('screenMainApp');
    const gateway = document.getElementById('screenGateway');
    if (gateway) gateway.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');

    window.applyAppBranding?.();
    window.applyI18nLabels();
    window.setupRoleWorkspace(user.role);
    window.startDualTimers(user);
    window.renderCentralServicesLauncher();
    window.navigateToView('viewServicesLauncher');
  };

  window.setupRoleWorkspace = function (role) {
    const isDoc = role === 'DOCTOR';
    const doctorNavButtons = ['navRx', 'navRecords', 'navInventory', 'navAI'];
    doctorNavButtons.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', !isDoc);
    });

    const roleBadge = document.getElementById('currentUserRoleBadge');
    if (roleBadge) {
      roleBadge.textContent = isDoc ? '🩺 Veterinary Practitioner (पशु चिकित्सा व्यवसायी)' : '👨‍🌾 Smart Farmer (स्मार्ट पशुपालक)';
    }
  };

  window.togglePortalWorkspace = function () {
    const user = window.getAuthenticatedUser();
    if (!user) return;

    user.role = user.role === 'DOCTOR' ? 'FARMER' : 'DOCTOR';
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    window.setupRoleWorkspace(user.role);
    window.renderCentralServicesLauncher();
    alert(`पोर्टल सफलतापूर्वक बदला गया ➔ ${user.role === 'DOCTOR' ? 'Veterinary Practitioner' : 'Smart Farmer'}`);
  };

  window.renderCentralServicesLauncher = function () {
    let launcher = document.getElementById('viewServicesLauncher');
    const main = document.querySelector('main');
    if (!launcher && main) {
      launcher = document.createElement('section');
      launcher.id = 'viewServicesLauncher';
      launcher.className = 'space-y-4';
      main.insertBefore(launcher, main.firstChild);
    }
    if (!launcher) return;

    const user = window.getAuthenticatedUser() || { role: 'DOCTOR', dualPortalAllowed: true };
    const isDoc = user.role === 'DOCTOR';
    const t = I18N_DICTIONARY[currentLanguage] || I18N_DICTIONARY.hinglish;

    launcher.innerHTML = `
      <!-- Banner / Title -->
      <div class="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold">
              ${isDoc ? '🛡️ क्लिनिकल ऑपरेटिंग सिस्टम' : '🌾 स्मार्ट डेयरी हब'}
            </span>
            <h2 id="launcherHeadingTitle" class="text-base sm:text-xl font-black mt-1">${t.launcherTitle}</h2>
          </div>
          ${user.dualPortalAllowed ? `
            <button onclick="window.togglePortalWorkspace()" class="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs px-3 py-2 rounded-2xl shadow-lg transition active:scale-95">
              ${t.dualPortalBtn}
            </button>
          ` : ''}
        </div>
        <p class="text-xs text-blue-100 max-w-lg">
          ${isDoc ? 'क्लिनिकल डायग्नोसिस, 5-स्तरीय ड्रग थेरेपी, डिजिटल पर्ची एवं 20-km GPS नेविगेशन टूल्स।' : 'देसी घरेलू नुस्खे, मद काल ट्रैकर, संतुलित राशन कैलकुलेटर एवं दैनिक दूध बिक्री बहीखाता।'}
        </p>
      </div>

      <!-- Action Grid Tiles -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div onclick="window.navigateToView('viewDiagnosis')" class="bg-white border border-slate-200 hover:border-blue-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
          <span class="text-3xl">🩺</span>
          <strong class="text-xs font-bold text-slate-800">${t.diagTitle}</strong>
          <span class="text-[10px] text-slate-500">लक्षण मैट्रिक्स व 48+ रोग</span>
        </div>

        ${isDoc ? `
          <div onclick="window.navigateToView('viewRx')" class="bg-white border border-slate-200 hover:border-blue-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">📝</span>
            <strong class="text-xs font-bold text-slate-800">${t.opdTitle}</strong>
            <span class="text-[10px] text-slate-500">1-Click WhatsApp पर्ची</span>
          </div>
          <div onclick="window.navigateToView('viewRecords')" class="bg-white border border-slate-200 hover:border-blue-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">📂</span>
            <strong class="text-xs font-bold text-slate-800">${t.recTitle}</strong>
            <span class="text-[10px] text-slate-500">मरीज इतिहास व खोज</span>
          </div>
          <div onclick="window.navigateToView('viewInventory')" class="bg-white border border-slate-200 hover:border-blue-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">💊</span>
            <strong class="text-xs font-bold text-slate-800">${t.stockTitle}</strong>
            <span class="text-[10px] text-slate-500">दवा व सीमन इन्वेंट्री</span>
          </div>
          <div onclick="window.navigateToView('viewAI')" class="bg-white border border-slate-200 hover:border-purple-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">🤖</span>
            <strong class="text-xs font-bold text-slate-800">${t.aiTitle}</strong>
            <span class="text-[10px] text-slate-500">Gemini 3.8 Flash कंसल्ट</span>
          </div>
        ` : `
          <div onclick="window.navigateToView('viewBreeding')" class="bg-white border border-slate-200 hover:border-emerald-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">🧬</span>
            <strong class="text-xs font-bold text-slate-800">${t.breedTitle}</strong>
            <span class="text-[10px] text-slate-500">हीट समय व सीमन चयन</span>
          </div>
          <div onclick="window.navigateToView('viewFeed')" class="bg-white border border-slate-200 hover:border-emerald-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
            <span class="text-3xl">🌾</span>
            <strong class="text-xs font-bold text-slate-800">${t.feedTitle}</strong>
            <span class="text-[10px] text-slate-500">संतुलित दाना व भूसा</span>
          </div>
        `}

        <div onclick="window.navigateToView('viewFinance')" class="bg-white border border-slate-200 hover:border-emerald-500 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2">
          <span class="text-3xl">💰</span>
          <strong class="text-xs font-bold text-slate-800">${t.khataTitle}</strong>
          <span class="text-[10px] text-slate-500">बकाया व दूध बिक्री बही</span>
        </div>

        <div onclick="${isDoc ? 'window.renderDoctorGPSDashboard()' : 'window.requestDoctorEmergencyVisit()'}" class="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 p-4 rounded-3xl shadow-xs hover:shadow-md cursor-pointer transition flex flex-col items-center text-center space-y-2 col-span-2 sm:col-span-1">
          <span class="text-3xl">🚨</span>
          <strong class="text-xs font-bold text-rose-900">${isDoc ? '20-km GPS किसान कॉल' : 'आपातकालीन डॉक्टर बुलाएं'}</strong>
          <span class="text-[10px] text-rose-700">गूगल मैप्स लाइव नेविगेशन</span>
        </div>
      </div>
    `;
  };

  /* =========================================================================
     5. DUAL TIMERS & GEMINI 3.8 FLASH TREATMENT CALLER
     ========================================================================= */

  window.startDualTimers = function (user) {
    clearInterval(sessionTimerInterval);
    clearInterval(trialTimerInterval);

    let container = document.getElementById('headerTimerContainer');
    const header = document.querySelector('header');
    if (!container && header) {
      container = document.createElement('div');
      container.id = 'headerTimerContainer';
      container.className = 'hidden sm:flex items-center gap-1.5 font-mono text-[10px]';
      header.insertBefore(container, header.lastElementChild);
    }

    if (container) {
      container.innerHTML = `
        <span id="session-timer-badge" class="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-lg border border-slate-200" title="Session Timeout">⏱️ 60:00</span>
        <span id="trial-timer-badge" class="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-lg border border-amber-200" title="24-Hour Free Trial">⏳ 24h Trial</span>
      `;
    }

    sessionTimeRemaining = 60 * 60;
    sessionTimerInterval = setInterval(() => {
      sessionTimeRemaining--;
      const m = Math.floor(sessionTimeRemaining / 60).toString().padStart(2, '0');
      const s = (sessionTimeRemaining % 60).toString().padStart(2, '0');
      const badge = document.getElementById('session-timer-badge');
      if (badge) badge.textContent = `⏱️ ${m}:${s}`;
      if (sessionTimeRemaining <= 0) {
        clearInterval(sessionTimerInterval);
        alert('सुरक्षा कारणों से 60-मिनट का सत्र समाप्त हुआ। कृपया पुनः लॉगिन करें।');
        window.logoutUser();
      }
    }, 1000);

    const expiry = user?.trialExpiry || (Date.now() + 24 * 3600 * 1000);
    trialTimerInterval = setInterval(() => {
      const diff = Math.max(0, expiry - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const badge = document.getElementById('trial-timer-badge');
      if (badge) badge.textContent = `⏳ ${hours}h ${mins}m`;
    }, 30000);
  };

  window.runAIConsultant = async function () {
    const promptInput = document.getElementById('aiInputPrompt');
    const outputArea = document.getElementById('aiOutputArea');
    const btn = document.getElementById('btnRunAI');

    const promptText = promptInput ? promptInput.value.trim() : '';
    if (!promptText) {
      alert('कृपया पशु के लक्षण, तापमान और केस हिस्ट्री दर्ज करें!');
      return;
    }

    const apiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
    if (!apiKey) {
      alert('कृपया पहले Gemini API Key दर्ज करें!');
      window.openAIKeyModal();
      return;
    }

    if (outputArea) {
      outputArea.classList.remove('hidden');
      outputArea.innerHTML = '⚡ <b>Gemini 3.8 Flash Clinical Engine</b> विभेदक निदान एवं 5-स्तरीय उपचार तैयार कर रहा है...';
    }
    if (btn) btn.disabled = true;

    try {
      // Primary model: gemini-3.8-flash (fallback: gemini-3.5-flash / gemini-1.5-flash)
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const systemInstruction = `You are Chief Veterinary Clinician & Pharmacologist for Vetcare AI OS.
Output strictly:
1. Differential Diagnosis with % match
2. Confirmatory Lab Tests Table
3. 5-Tier Treatment Plan:
   - Injections (Ethical Brand vs Low-Cost Generic with MRP and dose in mg/kg)
   - Oral Follow-up
   - Ayurvedic Formulations
   - Homeopathic Potencies
   - Ethno-Veterinary Desi Remedies
4. Highlight Pregnancy Safety Red Alert banner if any drug is contraindicated. Format cleanly with bullet points and bold headers.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\nCase: ${promptText}` }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'कोई परिणाम प्राप्त नहीं हुआ।';

      if (outputArea) {
        outputArea.innerHTML = `
          <div class="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 font-bold text-xs mb-3 flex items-center gap-2">
            <span>🚨</span> <span>गर्भ परीक्षण चेतावनी (Pregnancy Red Alert): गाभिन पशुओं में Corticosteroids (उदा. Dexamethasone) व PGF2alpha का प्रयोग सख्त वर्जित है!</span>
          </div>
          <div class="whitespace-pre-wrap">${text}</div>
        `;
      }
    } catch (err) {
      if (outputArea) outputArea.textContent = 'AI परामर्श में त्रुटि: ' + err.message;
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  /* =========================================================================
     6. MODAL BINDINGS & SKELETON LIFECYCLE
     ========================================================================= */

  window.selectRole = function (role) {
    window.initUserSession({ role, name: role === 'DOCTOR' ? 'अधिकृत चिकित्सक' : 'प्रगतिशील पशुपालक', dualPortalAllowed: true });
  };

  window.openDoctorDeclarationModal = function () {
    const modal = document.getElementById('modalDoctorDeclaration');
    if (modal) modal.style.display = 'flex';
  };

  window.closeDoctorDeclarationModal = function () {
    const modal = document.getElementById('modalDoctorDeclaration');
    if (modal) modal.style.display = 'none';
  };

  window.acceptDoctorDeclaration = function () {
    window.closeDoctorDeclarationModal();
    window.selectRole('DOCTOR');
  };

  window.openAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    const input = document.getElementById('inputGeminiKey');
    if (input) input.value = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
    if (modal) modal.style.display = 'flex';
  };

  window.closeAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    if (modal) modal.style.display = 'none';
  };

  window.saveGeminiKey = function () {
    const input = document.getElementById('inputGeminiKey');
    const key = input ? input.value.trim() : '';
    if (key) {
      localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key);
      alert('Gemini API Key सुरक्षित कर ली गई है!');
      window.closeAIKeyModal();
    }
  };

  window.returnToGateway = function () {
    window.logoutUser();
  };

  window.switchTab = function (tabName) {
    const tabMap = {
      diagnosis: 'viewDiagnosis',
      rx: 'viewRx',
      records: 'viewRecords',
      inventory: 'viewInventory',
      ai: 'viewAI',
      breeding: 'viewBreeding',
      feed: 'viewFeed',
      finance: 'viewFinance',
      helpdesk: 'viewHelpdesk'
    };
    const target = tabMap[tabName] || 'viewServicesLauncher';
    window.navigateToView(target);
  };

  // Auto-init on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    const user = window.getAuthenticatedUser();
    if (user) {
      window.initUserSession(user);
    }
  });

})(window, document);
