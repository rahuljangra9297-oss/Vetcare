// Vetcare AI OS - Master App Controller, Auth, SMS Gateway & AI Surgeon (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS - ARCHITECTURE & RUNTIME ENGINE
 * ============================================================================
 * Modules included:
 * 1. Global State Management & Persistence Store
 * 2. Multi-Language i18n Localization Engine (Hinglish, Hindi, English, Punjabi, Marathi)
 * 3. Dual Session (60m) & 24-Hour Free Trial Countdown Engine
 * 4. Dual Login & Registration System (Password + Fast2SMS OTP Gateway Hook + Fallback Toast)
 * 5. Anti-Kickout Navigation Stack & Launcher Switcher
 * 6. Live AI Veterinary Surgeon (gemini-3.8-flash & gemini-3.5-flash fallback)
 *    - Species Selector & Pre-filled Clinical Finding Chips
 *    - Standardized 5-Tier Pharmacology & Pregnancy Red Alert Banner
 *    - Ethical vs Generic Drug Costing Model
 * 7. Clinical OPD Pad, GPS Geotagging, WhatsApp Dispatcher & Case Storage
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STATE & STORAGE CONFIGURATION
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    SESSION_USER: 'vetcare_session_user',
    USERS_DB: 'vetcare_users_db',
    ACTIVE_ROLE: 'vetcare_active_role',
    LANGUAGE: 'vetcare_app_lang',
    GEMINI_KEY: 'vetcare_gemini_api_key',
    SMS_KEY: 'vetcare_sms_api_key',
    OPD_RECORDS: 'vetcare_opd_records',
    INVENTORY: 'vetcare_inventory_db',
    KHATA: 'vetcare_khata_db'
  };

  const VetcareState = {
    currentUser: null,
    currentRole: 'DOCTOR', // 'DOCTOR' | 'FARMER'
    currentLanguage: 'hinglish',
    activeTab: 'diagnosis',
    activeServiceMode: 'OPD', // 'OPD' | 'AI' | 'UTERINE' | 'VACCINATION'
    navigationStack: ['viewServicesLauncher'],
    sessionSeconds: 3600, // 60 minutes
    sessionTimerInterval: null,
    trialTimerInterval: null,
    pendingOtp: null,
    pendingOtpPhone: null,
    pendingOtpRole: 'doctor',
    aiSelectedSpecies: 'गाय',
    aiSelectedFindings: new Set()
  };

  // --------------------------------------------------------------------------
  // 2. I18N LOCALIZATION DICTIONARY
  // --------------------------------------------------------------------------
  const I18N_DICTIONARY = {
    hinglish: {
      appName: 'Vetcare AI OS',
      appTagline: 'Pashu Swasthya Nidan, 5-Tier Clinical Decision Engine & Smart Dairy Assistant',
      doctorRole: '🩺 Veterinary Practitioner (पशु चिकित्सा व्यवसायी)',
      farmerRole: '🌾 Smart Dairy Farmer (स्मार्ट पशुपालक)',
      backBtn: '← Wapas Jayein (Back to Services)',
      aiSurgeon: 'Live AI Veterinary Surgeon',
      otpSentToast: 'Aapka 6-Digit OTP hai: ',
      trialExpired: 'Aapka 24-Hour Free Trial Samapt Ho Gaya Hai!',
      sessionExpired: 'Security Session Timeout. Kripya punah login karein.',
      pregnancyAlert: '🚨 PREGNANCY RED ALERT: Yeh dawayein garbhavastha me contraindicated hain!',
      saveRecordSuccess: 'Case record safaltapoorvak safe ho gaya!'
    },
    hindi: {
      appName: 'वेटकेयर एआई ओएस',
      appTagline: 'पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान',
      doctorRole: '🩺 अधिकृत पशु चिकित्सा व्यवसायी (Doctor)',
      farmerRole: '🌾 प्रगतिशील स्मार्ट पशुपालक (Farmer)',
      backBtn: '← मुख्य सेवाओं पर वापस जाएं',
      aiSurgeon: 'लाइव एआई वेटरनरी सर्जन',
      otpSentToast: 'आपका 6-अंकीय ओटीपी कोड है: ',
      trialExpired: 'आपका 24 घंटे का निशुल्क ट्रायल समाप्त हो गया है!',
      sessionExpired: 'सुरक्षा सत्र समाप्त। कृपया दोबारा लॉगिन करें।',
      pregnancyAlert: '🚨 गर्भावस्‍था चेतावनी: यह दवाएं गाभिन पशु के लिए असुरक्षित हैं!',
      saveRecordSuccess: 'केस रिकॉर्ड सुरक्षित कर लिया गया है!'
    },
    english: {
      appName: 'Vetcare AI OS',
      appTagline: 'Veterinary Clinical Decision Support System & Smart Dairy Assistant',
      doctorRole: '🩺 Veterinary Practitioner',
      farmerRole: '🌾 Smart Dairy Farmer',
      backBtn: '← Back to Central Services',
      aiSurgeon: 'Live AI Veterinary Surgeon',
      otpSentToast: 'Your 6-Digit Vetcare OTP is: ',
      trialExpired: 'Your 24-Hour Trial Period has Expired!',
      sessionExpired: 'Security Session Timed Out. Please log in again.',
      pregnancyAlert: '🚨 PREGNANCY CONTRAINDICATION ALERT: Unsafe for pregnant dam!',
      saveRecordSuccess: 'Case record successfully saved to local vault!'
    },
    punjabi: {
      appName: 'ਵੈਟਕੇਅਰ ਏਆਈ ਓਐਸ',
      appTagline: 'ਪਸ਼ੂ ਸਿਹਤ ਨਿਦਾਨ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ ਸਹਾਇਕ',
      doctorRole: '🩺 ਵੈਟਰਨਰੀ ਪ੍ਰੈਕਟੀਸ਼ਨਰ (ਡਾਕਟਰ)',
      farmerRole: '🌾 ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ',
      backBtn: '← ਮੁੱਖ ਸੇਵਾਵਾਂ ਤੇ ਵਾਪਸ ਜਾਓ',
      aiSurgeon: 'ਲਾਈਵ ਏਆਈ ਵੈਟਰਨਰੀ ਸਰਜਨ',
      otpSentToast: 'ਤੁਹਾਡਾ 6-ਅੰਕੀ ਓਟੀਪੀ ਕੋਡ ਹੈ: ',
      trialExpired: 'ਤੁਹਾਡਾ 24 ਘੰਟੇ ਦਾ ਮੁਫ਼ਤ ਟਰਾਇਲ ਖ਼ਤਮ ਹੋ ਗਿਆ ਹੈ!',
      sessionExpired: 'ਸੈਸ਼ਨ ਖ਼ਤਮ ਹੋ ਗਿਆ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਲੌਗਇਨ ਕਰੋ।',
      pregnancyAlert: '🚨 ਗਰਭਵਤੀ ਪਸ਼ੂ ਚੇਤਾਵਨੀ: ਇਹ ਦਵਾਈਆਂ ਗੱਭਣ ਪਸ਼ੂ ਲਈ ਖ਼ਤਰਨਾਕ ਹਨ!',
      saveRecordSuccess: 'ਕੇਸ ਰਿਕਾਰਡ ਸੁਰੱਖਿਅਤ ਕਰ ਲਿਆ ਗਿਆ ਹੈ!'
    },
    marathi: {
      appName: 'वेटकेअर एआय ओएस',
      appTagline: 'पशु आरोग्य निदान, 5-स्तरीय क्लिनिकल निर्णय प्रणाली',
      doctorRole: '🩺 नोंदणीकृत पशुवैद्यकीय व्यावसायिक',
      farmerRole: '🌾 स्मार्ट दुग्ध उत्पादक शेतकरी',
      backBtn: '← मुख्य सेवांकडे परत जा',
      aiSurgeon: 'लाइव्ह एआय व्हेटर्नरी सर्जन',
      otpSentToast: 'तुमचा 6-अंकी ओटीपी कोड आहे: ',
      trialExpired: 'तुमची 24 तासांची मोफत चाचणी समाप्त झाली आहे!',
      sessionExpired: 'सुरक्षा सत्र समाप्त झाले आहे. कृपया पुन्हा लॉगिन करा.',
      pregnancyAlert: '🚨 गर्भधारणा धोक्याचा इशारा: ही औषधे गाभण जनावरांसाठी असुरक्षित आहेत!',
      saveRecordSuccess: 'केस रेकॉर्ड यशस्वीरित्या सेव्ह केले!'
    }
  };

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION & SMS GATEWAY
  // --------------------------------------------------------------------------
  window.showToast = function (message, type = 'info', duration = 4500) {
    const existing = document.getElementById('vetcare-live-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'vetcare-live-toast';
    toast.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-2xl shadow-2xl flex items-start gap-3 text-xs sm:text-sm font-bold border transition-all transform duration-300 ${
      type === 'error'
        ? 'bg-rose-900/95 text-white border-rose-500'
        : type === 'success'
        ? 'bg-emerald-900/95 text-white border-emerald-400'
        : 'bg-slate-900/95 text-white border-blue-400'
    }`;
    toast.innerHTML = `
      <div class="text-xl">${type === 'error' ? '⚠️' : type === 'success' ? '✅' : '🔔'}</div>
      <div class="flex-1">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white font-bold ml-2">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast && toast.parentElement) toast.remove();
    }, duration);
  };

  // Mandatory Fast2SMS Hook with Non-Blocking Fetch & Instant UI Fallback
  window.sendSmsOtpGateway = async function (phone, otp) {
    const apiKey = localStorage.getItem(STORAGE_KEYS.SMS_KEY) || 'YOUR_FAST2SMS_API_KEY';
    const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(
      apiKey
    )}&variables_values=${encodeURIComponent(otp)}&route=otp&numbers=${encodeURIComponent(cleanPhone)}`;

    try {
      await fetch(url, { method: 'GET', mode: 'no-cors' });
    } catch (e) {
      console.warn('Fast2SMS background dispatch bypassed:', e);
    }

    // Fail-safe visual Toast notification for instant OTP display
    const currentLang = VetcareState.currentLanguage || 'hinglish';
    const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY.hinglish;
    window.showToast(`📱 SMS Dispatch Triggered!\n${dict.otpSentToast} [ ${otp} ]`, 'info', 10000);
  };

  // --------------------------------------------------------------------------
  // 4. DUAL LOGIN & REGISTRATION CONTROLLER
  // --------------------------------------------------------------------------
  function getUsersDatabase() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsersDatabase(users) {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  }

  window.registerUser = function (name, role, contact, password) {
    if (!contact || contact.length < 10) {
      window.showToast('कृपया 10-अंकीय वैध मोबाइल नंबर दर्ज करें!', 'error');
      return null;
    }

    const users = getUsersDatabase();
    const cleanContact = contact.trim().toLowerCase();
    const existingIndex = users.findIndex((u) => u.contact === cleanContact);

    const now = Date.now();
    const newUser = {
      id: 'USR_' + now + '_' + Math.floor(Math.random() * 1000),
      name: name || (role.toLowerCase() === 'doctor' ? 'डॉ. प्रैक्टिशनर' : 'पशुपालक भाई'),
      role: role.toLowerCase() === 'doctor' ? 'doctor' : 'farmer',
      contact: cleanContact,
      password: password || '123456',
      trialStartTimestamp: now,
      registeredAt: now,
      verified: false
    };

    if (existingIndex >= 0) {
      users[existingIndex].name = newUser.name;
      users[existingIndex].role = newUser.role;
      users[existingIndex].password = newUser.password;
    } else {
      users.push(newUser);
    }

    saveUsersDatabase(users);

    // Generate 6-Digit OTP
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    VetcareState.pendingOtp = generatedOtp;
    VetcareState.pendingOtpPhone = cleanContact;
    VetcareState.pendingOtpRole = newUser.role;

    window.sendSmsOtpGateway(cleanContact, generatedOtp);
    return newUser;
  };

  window.verifyOtpAndLogin = function (otp, contact) {
    const cleanContact = String(contact).trim().toLowerCase();
    if (String(otp).trim() !== String(VetcareState.pendingOtp)) {
      window.showToast('गलत OTP! कृपया जांचकर पुनः प्रयास करें।', 'error');
      return false;
    }

    const users = getUsersDatabase();
    let user = users.find((u) => u.contact === cleanContact);
    if (!user) {
      user = {
        id: 'USR_' + Date.now(),
        name: VetcareState.pendingOtpRole === 'doctor' ? 'डॉक्टर' : 'पशुपालक',
        role: VetcareState.pendingOtpRole || 'doctor',
        contact: cleanContact,
        password: 'DEFAULT_PASSWORD',
        trialStartTimestamp: Date.now(),
        verified: true
      };
      users.push(user);
      saveUsersDatabase(users);
    } else {
      user.verified = true;
      saveUsersDatabase(users);
    }

    activateUserSession(user);
    window.showToast('सत्यापन सफल! Vetcare AI OS में आपका स्वागत है।', 'success');
    return true;
  };

  window.loginWithPassword = function (contact, password) {
    const cleanContact = String(contact).trim().toLowerCase();
    const users = getUsersDatabase();
    const user = users.find((u) => u.contact === cleanContact && u.password === password);

    if (!user) {
      window.showToast('मोबाइल नंबर अथवा पासवर्ड अमान्य है!', 'error');
      return false;
    }

    activateUserSession(user);
    window.showToast(`नमस्ते ${user.name}, स्वागत है!`, 'success');
    return true;
  };

  function activateUserSession(user) {
    VetcareState.currentUser = user;
    VetcareState.currentRole = user.role.toUpperCase() === 'DOCTOR' ? 'DOCTOR' : 'FARMER';
    localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, VetcareState.currentRole);

    renderDynamicAuthModal();
    launchApplicationWorkspace();
    startDualTimers();
  }

  window.logoutUser = function () {
    if (VetcareState.sessionTimerInterval) clearInterval(VetcareState.sessionTimerInterval);
    if (VetcareState.trialTimerInterval) clearInterval(VetcareState.trialTimerInterval);

    localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
    VetcareState.currentUser = null;

    const screenGateway = document.getElementById('screenGateway');
    const screenMainApp = document.getElementById('screenMainApp');
    if (screenGateway) screenGateway.classList.remove('hidden');
    if (screenMainApp) screenMainApp.classList.add('hidden');

    window.showToast('सफलतापूर्वक लॉगआउट किया गया।', 'info');
  };

  // --------------------------------------------------------------------------
  // 5. TIMERS (60-MIN SESSION & 24-HR TRIAL COUNTDOWN)
  // --------------------------------------------------------------------------
  function startDualTimers() {
    if (VetcareState.sessionTimerInterval) clearInterval(VetcareState.sessionTimerInterval);
    if (VetcareState.trialTimerInterval) clearInterval(VetcareState.trialTimerInterval);

    VetcareState.sessionSeconds = 3600; // 60 mins fresh session

    // Session Timer
    VetcareState.sessionTimerInterval = setInterval(() => {
      VetcareState.sessionSeconds--;
      const min = Math.floor(VetcareState.sessionSeconds / 60);
      const sec = VetcareState.sessionSeconds % 60;
      const formatted = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      
      const badge = document.getElementById('session-timer-badge');
      if (badge) badge.textContent = `⏱️ ${formatted}`;

      if (VetcareState.sessionSeconds <= 0) {
        clearInterval(VetcareState.sessionTimerInterval);
        window.showToast(I18N_DICTIONARY[VetcareState.currentLanguage].sessionExpired, 'error');
        window.logoutUser();
      }
    }, 1000);

    // 24-Hour Trial Countdown Timer
    VetcareState.trialTimerInterval = setInterval(() => {
      const user = VetcareState.currentUser;
      if (!user || !user.trialStartTimestamp) return;

      const trialEnd = user.trialStartTimestamp + 24 * 60 * 60 * 1000;
      const remainingMs = trialEnd - Date.now();
      const badge = document.getElementById('trial-timer-badge');

      if (remainingMs <= 0) {
        if (badge) badge.textContent = '⏳ Trial Expired';
        const banner = document.getElementById('app-announcement-banner');
        if (banner) {
          banner.innerHTML = `
            <div class="bg-rose-600 text-white p-2 text-center text-xs font-bold animate-pulse">
              ⚠️ आपका 24-घंटे का मुफ़्त क्लिनिकल ट्रायल समाप्त हो गया है। कृपया प्रीमियम एक्टिवेट करें!
            </div>
          `;
        }
      } else {
        const hrs = Math.floor(remainingMs / (1000 * 60 * 60));
        const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((remainingMs % (1000 * 60)) / 1000);
        if (badge) {
          badge.textContent = `⏳ ${hrs}h ${mins}m ${secs}s`;
        }
      }
    }, 1000);
  }

  // --------------------------------------------------------------------------
  // 6. ANTI-KICKOUT BACK NAVIGATION & WORKSPACE SWITCHER
  // --------------------------------------------------------------------------
  window.navigateToView = function (targetViewId) {
    if (!targetViewId) return;

    // Push to navigation stack if different
    const currentView = VetcareState.navigationStack[VetcareState.navigationStack.length - 1];
    if (currentView !== targetViewId) {
      VetcareState.navigationStack.push(targetViewId);
    }

    renderActiveView(targetViewId);
  };

  window.navigateBack = function () {
    // Never kick user out to gateway! Return to services launcher if at root.
    if (VetcareState.navigationStack.length > 1) {
      VetcareState.navigationStack.pop();
      const previousView = VetcareState.navigationStack[VetcareState.navigationStack.length - 1];
      renderActiveView(previousView);
    } else {
      renderActiveView('viewServicesLauncher');
      window.showToast('आप मुख्य सेवा केंद्र (Launcher Hub) पर हैं।', 'info');
    }
  };

  function renderActiveView(viewId) {
    const launcher = document.getElementById('services-launcher-container');
    const doctorWorkspace = document.getElementById('doctor-workspace');
    const farmerWorkspace = document.getElementById('farmer-workspace');

    // Hide all tab views within both workspaces
    const allViews = document.querySelectorAll(
      '#doctor-workspace > section, #farmer-workspace > section'
    );
    allViews.forEach((v) => v.classList.add('hidden'));

    if (viewId === 'viewServicesLauncher') {
      if (launcher) launcher.classList.remove('hidden');
      if (doctorWorkspace) doctorWorkspace.classList.add('hidden');
      if (farmerWorkspace) farmerWorkspace.classList.add('hidden');
      renderServicesLauncher();
      return;
    }

    if (launcher) launcher.classList.add('hidden');

    if (VetcareState.currentRole === 'DOCTOR') {
      if (doctorWorkspace) doctorWorkspace.classList.remove('hidden');
      if (farmerWorkspace) farmerWorkspace.classList.add('hidden');
    } else {
      if (farmerWorkspace) farmerWorkspace.classList.remove('hidden');
      if (doctorWorkspace) doctorWorkspace.classList.add('hidden');
    }

    const targetEl = document.getElementById(viewId);
    if (targetEl) {
      targetEl.classList.remove('hidden');
    }

    updateBottomNavUI(viewId);
  }

  window.switchTab = function (tabKey) {
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
    const target = tabMap[tabKey] || 'viewDiagnosis';
    window.navigateToView(target);
  };

  window.togglePortalWorkspace = function () {
    VetcareState.currentRole = VetcareState.currentRole === 'DOCTOR' ? 'FARMER' : 'DOCTOR';
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, VetcareState.currentRole);
    updateRoleBadges();
    window.navigateToView('viewServicesLauncher');
    window.showToast(`पोर्टल बदला गया: ${VetcareState.currentRole}`, 'info');
  };

  function updateRoleBadges() {
    const badge = document.getElementById('currentUserRoleBadge');
    const dict = I18N_DICTIONARY[VetcareState.currentLanguage] || I18N_DICTIONARY.hinglish;
    if (badge) {
      badge.textContent = VetcareState.currentRole === 'DOCTOR' ? dict.doctorRole : dict.farmerRole;
    }

    // Toggle bottom navigation tabs visibility per role
    const docOnlyTabs = ['navRx', 'navRecords', 'navInventory', 'navAI'];
    const farmerOnlyTabs = ['navBreeding', 'navFeed'];

    docOnlyTabs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (VetcareState.currentRole === 'DOCTOR') el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    farmerOnlyTabs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (VetcareState.currentRole === 'FARMER') el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });
  }

  function updateBottomNavUI(viewId) {
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach((btn) => btn.classList.remove('active-nav-tab'));

    const reverseMap = {
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

    const activeNavId = reverseMap[viewId];
    if (activeNavId) {
      const activeBtn = document.getElementById(activeNavId);
      if (activeBtn) activeBtn.classList.add('active-nav-tab');
    }
  }

  // --------------------------------------------------------------------------
  // 7. CENTRAL SERVICES LAUNCHER HUB
  // --------------------------------------------------------------------------
  function renderServicesLauncher() {
    const container = document.getElementById('services-launcher-container');
    if (!container) return;

    if (VetcareState.currentRole === 'DOCTOR') {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-3xl p-5 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">डॉक्टर क्लिनिकल कंसोल 🩺</span>
                <h2 class="text-lg sm:text-xl font-black mt-1">Veterinary Practitioner Services</h2>
                <p class="text-xs text-blue-100">48+ क्लिनिकल रोग मैट्रिक्स, 5-स्तरीय औषध विज्ञान व डिजिटल पर्ची</p>
              </div>
              <div class="text-4xl">💉</div>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div onclick="window.navigateToView('viewDiagnosis')" class="bg-white border-2 border-slate-100 hover:border-blue-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">🩺</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">3-Way रोग निदान</h3>
              <p class="text-[11px] text-slate-500">लक्षण मैट्रिक्स (%), त्वरित खोज व रोग डायरेक्टरी</p>
            </div>

            <div onclick="window.navigateToView('viewRx')" class="bg-white border-2 border-slate-100 hover:border-blue-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">📝</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">डिजिटल ओपीडी पैड</h3>
              <p class="text-[11px] text-slate-500">1-Click व्हाट्सएप पर्ची, गर्भाशय शोधन व A.I. मोड</p>
            </div>

            <div onclick="window.navigateToView('viewRecords')" class="bg-white border-2 border-slate-100 hover:border-blue-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">📂</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">केस रिकॉर्ड्स</h3>
              <p class="text-[11px] text-slate-500">20-km GPS किसान नेविगेशन व ऑफलाइन हिस्ट्री</p>
            </div>

            <div onclick="window.navigateToView('viewInventory')" class="bg-white border-2 border-slate-100 hover:border-blue-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">💊</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">दवा व सीमन स्टॉक</h3>
              <p class="text-[11px] text-slate-500">न्यूनतम स्टॉक अलर्ट, सीमन स्ट्रॉ व बोलस ट्रैकर</p>
            </div>

            <div onclick="window.navigateToView('viewAI')" class="bg-white border-2 border-purple-200 hover:border-purple-500 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2 col-span-2 sm:col-span-1">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">🤖</div>
              <h3 class="font-black text-purple-900 text-xs sm:text-sm">AI वेटरनरी सर्जन</h3>
              <p class="text-[11px] text-purple-700">Gemini 3.8 Flash, 5-Tier थेरेपी व जेनेरिक रेट कार्ड</p>
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-900 text-white rounded-3xl p-5 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">स्मार्ट डेयरी किसान कंसोल 🌾</span>
                <h2 class="text-lg sm:text-xl font-black mt-1">Smart Farmer Central Desk</h2>
                <p class="text-xs text-emerald-100">देसी सिद्ध नुस्खे, मद काल कैलकुलेटर व संतुलित राशन बहीखाता</p>
              </div>
              <div class="text-4xl">🐄</div>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div onclick="window.navigateToView('viewDiagnosis')" class="bg-white border-2 border-slate-100 hover:border-emerald-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">🌿</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">25 प्रमाणित देसी नुस्खे</h3>
              <p class="text-[11px] text-slate-500">शून्य इंजेक्शन, घर पर तैयार होने वाले आयुर्वेदिक उपचार</p>
            </div>

            <div onclick="window.navigateToView('viewBreeding')" class="bg-white border-2 border-slate-100 hover:border-emerald-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">⏱️</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">मद चक्र व A.I. समय</h3>
              <p class="text-[11px] text-slate-500">डिस्चार्ज की तार पहचानें, रिपीट ब्रीडिंग समाधान</p>
            </div>

            <div onclick="window.navigateToView('viewFeed')" class="bg-white border-2 border-slate-100 hover:border-emerald-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">🌾</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">संतुलित आहार गणना</h3>
              <p class="text-[11px] text-slate-500">दूध व वजन अनुसार 24 घंटे का दाना, भूसा व मिनरल</p>
            </div>

            <div onclick="window.navigateToView('viewFinance')" class="bg-white border-2 border-slate-100 hover:border-emerald-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">💰</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">दैनिक दूध व खाता बही</h3>
              <p class="text-[11px] text-slate-500">उधारी, जमा, फैट/SNF दूध मूल्य व मासिक लाभ</p>
            </div>

            <div onclick="window.navigateToView('viewHelpdesk')" class="bg-white border-2 border-slate-100 hover:border-emerald-400 p-4 rounded-3xl shadow-xs cursor-pointer transition active:scale-95 space-y-2">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">🎧</div>
              <h3 class="font-black text-slate-800 text-xs sm:text-sm">किसान हेल्पलाइन</h3>
              <p class="text-[11px] text-slate-500">सीधे पशु विशेषज्ञ से व्हाट्सएप सहायता व सवाल</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 8. LIVE AI VETERINARY SURGEON (GEMINI 3.8 & 3.5 FLASH)
  // --------------------------------------------------------------------------
  const AI_SPECIES_LIST = [
    { label: 'गाय (Cow)', val: 'गाय' },
    { label: 'भैंस (Buffalo)', val: 'भैंस' },
    { label: 'भेड़ (Sheep)', val: 'भेड़' },
    { label: 'बकरी (Goat)', val: 'बकरी' },
    { label: 'श्वान/कुत्ता (Canine)', val: 'श्वान' },
    { label: 'अश्व/घोड़ा (Equine)', val: 'अश्व' }
  ];

  const AI_FINDINGS_LIST = [
    'उच्च ज्वर (>104°F)',
    'सुस्त जुगाली',
    'थन में सूजन/खून',
    'लाल/कॉफी पेशाब',
    'बदबूदार दस्त',
    'मुंह से लार/जीभ बाहर',
    'सांस में घरघराहट',
    'नीचे गिरना (Recumbency)',
    'बार-बार रिपीट होना'
  ];

  function renderAISurgeonUI() {
    const aiSection = document.getElementById('viewAI');
    if (!aiSection) return;

    aiSection.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4 text-xs">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h2 class="text-sm sm:text-base font-black text-purple-800 flex items-center gap-1.5">
              <span>🤖</span> लाइव AI वेटरनरी सर्जन (Clinical Decision AI)
            </h2>
            <p class="text-[11px] text-slate-500">Powered by Gemini 3.8 Flash • 5-Tier थेरेपी व जेनेरिक मूल्य कार्ड</p>
          </div>
          <button onclick="window.openAIKeyModal()" class="text-xs bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-xl border border-purple-200 hover:bg-purple-100 transition">
            ⚙️ AI Key
          </button>
        </div>

        <!-- SPECIES SELECTOR CHIPS -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700">1. रोगी पशु की प्रजाति (Species):</label>
          <div class="flex flex-wrap gap-1.5" id="aiSpeciesChipsContainer">
            ${AI_SPECIES_LIST.map(
              (s) => `
              <button type="button" onclick="window.selectAISpecies('${s.val}', this)" class="ai-species-chip px-3 py-1.5 rounded-xl border font-bold text-xs transition ${
                s.val === VetcareState.aiSelectedSpecies
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
              }">${s.label}</button>
            `
            ).join('')}
          </div>
        </div>

        <!-- CLINICAL FINDINGS CHIPS -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700">2. प्रमुख क्लिनिकल लक्षण (Clinical Findings Quick Select):</label>
          <div class="flex flex-wrap gap-1.5" id="aiFindingsChipsContainer">
            ${AI_FINDINGS_LIST.map(
              (f) => `
              <button type="button" onclick="window.toggleAIFinding('${f}', this)" class="ai-finding-chip px-2.5 py-1 rounded-xl border text-[11px] font-medium transition ${
                VetcareState.aiSelectedFindings.has(f)
                  ? 'bg-purple-600 text-white border-purple-600 font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
              }">+ ${f}</button>
            `
            ).join('')}
          </div>
        </div>

        <!-- PREGNANCY STATUS SELECTION -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">गर्भकाल स्थिति (Pregnancy):</label>
            <select id="aiPregnancyStatus" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none text-slate-800">
              <option value="Non-Pregnant (खाली)">खाली (Non-Pregnant)</option>
              <option value="Pregnant (गाभिन - Caution)">गाभिन (Pregnant - High Risk)</option>
              <option value="Post-Partum (ताजा ब्याही)">ताजा ब्याही (Lactating Dam)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">शारीरिक तापमान (°F):</label>
            <input id="aiBodyTemp" type="text" placeholder="उदा. 105.4 °F" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono outline-none" />
          </div>
        </div>

        <!-- CASE HISTORY INPUT -->
        <div class="space-y-1">
          <label class="block font-bold text-slate-700">3. अतिरिक्त केस इतिहास व विवरण (History & Notes):</label>
          <textarea id="aiInputPrompt" rows="3" placeholder="उदा. 4 दिन से दूध में भारी गिरावट, गर्दन पर सूजन, जुगाली बिल्कुल बंद..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 outline-none font-sans"></textarea>
        </div>

        <button onclick="window.runAIConsultant()" id="btnRunAI" class="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2">
          <span>✨ 5-स्तरीय क्लिनिकल रिपोर्ट एवं थेरेपी प्राप्त करें</span>
        </button>

        <div id="aiOutputArea" class="hidden p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 leading-relaxed text-slate-900"></div>
      </div>
    `;
  }

  window.selectAISpecies = function (speciesVal, btn) {
    VetcareState.aiSelectedSpecies = speciesVal;
    document.querySelectorAll('.ai-species-chip').forEach((c) => {
      c.className =
        'ai-species-chip px-3 py-1.5 rounded-xl border font-bold text-xs transition bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300';
    });
    if (btn) {
      btn.className =
        'ai-species-chip px-3 py-1.5 rounded-xl border font-bold text-xs transition bg-purple-600 text-white border-purple-600 shadow-xs';
    }
  };

  window.toggleAIFinding = function (findingText, btn) {
    if (VetcareState.aiSelectedFindings.has(findingText)) {
      VetcareState.aiSelectedFindings.delete(findingText);
      if (btn) {
        btn.className =
          'ai-finding-chip px-2.5 py-1 rounded-xl border text-[11px] font-medium transition bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300';
        btn.textContent = `+ ${findingText}`;
      }
    } else {
      VetcareState.aiSelectedFindings.add(findingText);
      if (btn) {
        btn.className =
          'ai-finding-chip px-2.5 py-1 rounded-xl border text-[11px] font-medium transition bg-purple-600 text-white border-purple-600 font-bold';
        btn.textContent = `✓ ${findingText}`;
      }
    }
  };

  window.runAIConsultant = async function () {
    const apiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
    if (!apiKey) {
      window.showToast('कृपया पहले अपनी Gemini API Key दर्ज करें!', 'error');
      window.openAIKeyModal();
      return;
    }

    const species = VetcareState.aiSelectedSpecies;
    const findings = Array.from(VetcareState.aiSelectedFindings).join(', ');
    const pregnancy = document.getElementById('aiPregnancyStatus')?.value || 'Non-Pregnant';
    const temp = document.getElementById('aiBodyTemp')?.value || 'Not Measured';
    const promptNotes = document.getElementById('aiInputPrompt')?.value.trim() || '';

    if (!findings && !promptNotes) {
      window.showToast('कृपया कम से कम एक लक्षण अथवा केस विवरण दर्ज करें!', 'error');
      return;
    }

    const outputArea = document.getElementById('aiOutputArea');
    const runBtn = document.getElementById('btnRunAI');

    if (outputArea) {
      outputArea.classList.remove('hidden');
      outputArea.innerHTML = `
        <div class="flex items-center justify-center p-8 space-x-3 text-purple-700">
          <i class="fa-solid fa-spinner fa-spin text-2xl"></i>
          <span class="font-bold text-sm">Gemini 3.8 Flash क्लिनिकल डिसीजन इंजन विश्लेषण कर रहा है...</span>
        </div>
      `;
    }

    if (runBtn) {
      runBtn.disabled = true;
      runBtn.classList.add('opacity-50');
    }

    const fullPrompt = `
You are the Chief Veterinary Clinical Surgeon and Certified Large Animal Pharmacologist for Vetcare AI OS.
Patient Case Profile:
- Species: ${species}
- Body Temperature: ${temp}
- Pregnancy Status: ${pregnancy}
- Primary Cardinal & Secondary Findings: ${findings || 'None selected'}
- Clinical Case History & Remarks: ${promptNotes || 'None'}

TASK:
Provide an immediate, authoritative 5-Tier Treatment Plan and Differential Diagnosis.
Strictly format your response in clean HTML with Tailwind utility classes as follows:

1. <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl mb-3">
   <strong>🔬 Most Probable Clinical Diagnosis (% likelihood):</strong> with top 3 differential list.
   </div>

2. IF animal is pregnant AND any drug is contraindicated (like Corticosteroids, Quinolones, Prostaglandins, LA Oxytetracycline high doses), include:
   <div class="p-3 bg-rose-500 text-white font-black rounded-xl mb-3 border-2 border-rose-700 animate-pulse">
   ${I18N_DICTIONARY[VetcareState.currentLanguage].pregnancyAlert}
   <br><span class="text-xs font-normal">Mention strictly safe alternatives (e.g. Isoflupredone vs Dexamethasone, Ceftiofur vs Enrofloxacin).</span>
   </div>

3. Standardized 5-Tier Treatment Plan:
   - Tier 1: Emergency & Stabilization (Fluids, Antishock, Antihistaminic)
   - Tier 2: Primary Etiological Therapy (Specific Antibiotic/Antiprotozoal with exact dosage mg/kg and Route: IV/IM/SC)
   - Tier 3: Anti-inflammatory & Pain Management (NSAIDs, Anti-pyretic)
   - Tier 4: Supportive Care, Rumenotonics & Metabolic Balancers
   - Tier 5: Farmer Post-Treatment Advisory & Prevention

4. Ethical (Branded) vs Generic Drug Costing Comparison:
   A clean HTML table comparing 3 core drugs with: Drug Category, Ethical Brand Name & Est. Cost, Generic Name & Est. Cost, Potential Savings.

Keep tone strictly veterinary clinical, accurate, and easy to read. Hindi/Hinglish terminology supported for Indian field conditions.
`;

    try {
      let responseText = await callGeminiWithFallback(apiKey, fullPrompt);
      if (outputArea) {
        // Clean markdown formatting if model wrapped HTML in ```html ... ```
        let cleaned = responseText.replace(/```html/gi, '').replace(/```/g, '');
        outputArea.innerHTML = cleaned;
      }
    } catch (err) {
      if (outputArea) {
        outputArea.innerHTML = `
          <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
            <h4 class="font-bold">एआई सर्वर त्रुटि:</h4>
            <p class="text-xs mt-1">${err.message || 'Gemini API तक पहुँचने में असमर्थ।'}</p>
            <p class="text-[11px] text-slate-500 mt-2">कृपया अपनी Gemini API Key जांचें अथवा पुनः प्रयास करें।</p>
          </div>
        `;
      }
    } finally {
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.classList.remove('opacity-50');
      }
    }
  };

  async function callGeminiWithFallback(apiKey, prompt) {
    const primaryModel = 'gemini-3.8-flash';
    const fallbackModel = 'gemini-3.5-flash';

    async function executeCall(modelName) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048
        }
      };

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        throw new Error(`Model ${modelName} returned status ${resp.status}`);
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response received from AI model');
      return text;
    }

    try {
      return await executeCall(primaryModel);
    } catch (primaryErr) {
      console.warn(`Primary model ${primaryModel} failed. Falling back to ${fallbackModel}:`, primaryErr);
      return await executeCall(fallbackModel);
    }
  }

  // --------------------------------------------------------------------------
  // 9. DIGITAL OPD PAD, 1-CLICK WHATSAPP & CASE ARCHIVE
  // --------------------------------------------------------------------------
  window.setClinicalServiceMode = function (mode) {
    VetcareState.activeServiceMode = mode;
    const chips = ['btnServiceMode_OPD', 'btnServiceMode_AI', 'btnServiceMode_UTERINE', 'btnServiceMode_VACCINATION'];

    chips.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.className =
          'service-mode-chip py-1 px-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-[11px]';
      }
    });

    const activeEl = document.getElementById(`btnServiceMode_${mode}`);
    if (activeEl) {
      activeEl.className =
        'service-mode-chip py-1 px-2.5 rounded-xl bg-blue-600 text-white font-bold text-[11px] shadow-xs';
    }

    const modeFields = document.getElementById('modeSpecificFieldsArea');
    if (!modeFields) return;

    if (mode === 'AI') {
      modeFields.innerHTML = `
        <div class="grid grid-cols-2 gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs">
          <div>
            <label class="block font-bold text-rose-800">सीमन बुल / स्ट्रॉ सं. (Bull No.)</label>
            <input id="opdBullNo" type="text" placeholder="उदा. Murrah-1028 / HF-304" class="w-full bg-white p-2 rounded-xl border border-rose-200 outline-none" />
          </div>
          <div>
            <label class="block font-bold text-rose-800">मद काल समय (Heat Hour)</label>
            <input id="opdHeatHour" type="text" placeholder="उदा. 14 घंटे बाद (Mid-Heat)" class="w-full bg-white p-2 rounded-xl border border-rose-200 outline-none" />
          </div>
        </div>
      `;
    } else if (mode === 'UTERINE') {
      modeFields.innerHTML = `
        <div class="p-2.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs space-y-1">
          <label class="block font-bold text-indigo-900">गर्भाशय प्रक्षालन औषधि (Intrauterine Infusion)</label>
          <input id="opdIntrauterineDrug" type="text" placeholder="उदा. 30 ml Lixen IU + 20 ml Metrogyl" class="w-full bg-white p-2 rounded-xl border border-indigo-200 outline-none" />
        </div>
      `;
    } else if (mode === 'VACCINATION') {
      modeFields.innerHTML = `
        <div class="grid grid-cols-2 gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs">
          <div>
            <label class="block font-bold text-emerald-900">वैक्सीन का नाम (Vaccine)</label>
            <select id="opdVaccineName" class="w-full bg-white p-2 rounded-xl border border-emerald-200 outline-none">
              <option value="HS+BQ Combined">HS + BQ Combined (गलघोंटू-लंगड़ा)</option>
              <option value="FMD Raksha Ovac">FMD (खुरपका-मुंहपका)</option>
              <option value="Brucella S19">ब्रुसेला (Brucellosis)</option>
              <option value="PPR Goat Vaccine">PPR (बकरी प्लेग)</option>
              <option value="Anti-Rabies">एंटी-रेबीज (Post-Bite)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-emerald-900">बैच सं. (Batch No.)</label>
            <input id="opdVaccineBatch" type="text" placeholder="उदा. B-99801 Exp 2027" class="w-full bg-white p-2 rounded-xl border border-emerald-200 outline-none" />
          </div>
        </div>
      `;
    } else {
      modeFields.innerHTML = '';
    }
  };

  window.captureGPSLocation = function () {
    const gpsInput = document.getElementById('opdGPS');
    const gpsBtn = document.getElementById('btnGPS');

    if (!navigator.geolocation) {
      window.showToast('आपके डिवाइस में GPS उपलब्ध नहीं है।', 'error');
      return;
    }

    if (gpsBtn) gpsBtn.textContent = '⏳ लोकेट...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (gpsInput) gpsInput.value = coords;
        if (gpsBtn) gpsBtn.textContent = '📍 प्राप्त';
        window.showToast(`GPS प्राप्त: ${coords}`, 'success');
      },
      (err) => {
        if (gpsBtn) gpsBtn.textContent = '📍 GPS';
        window.showToast('GPS अनुमति अस्वीकृत अथवा सिग्नल कमजोर है।', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  window.clearRxField = function () {
    const rx = document.getElementById('opdMedicine');
    if (rx) rx.value = '';
  };

  window.calculateDue = function () {
    const total = parseFloat(document.getElementById('opdTotalFee')?.value) || 0;
    const paid = parseFloat(document.getElementById('opdPaidFee')?.value) || 0;
    const dueEl = document.getElementById('opdDueFee');
    if (dueEl) {
      dueEl.value = Math.max(0, total - paid);
    }
  };

  window.dispatchWhatsAppRx = function () {
    const farmerName = document.getElementById('opdFarmerName')?.value.trim();
    const phone = document.getElementById('opdFarmerPhone')?.value.trim();
    const animal = document.getElementById('opdAnimal')?.value || 'पशु';
    const diagnosis = document.getElementById('opdDiagnosis')?.value.trim();
    const medicines = document.getElementById('opdMedicine')?.value.trim();
    const total = document.getElementById('opdTotalFee')?.value || '0';
    const paid = document.getElementById('opdPaidFee')?.value || '0';
    const due = document.getElementById('opdDueFee')?.value || '0';
    const gps = document.getElementById('opdGPS')?.value || '';

    if (!farmerName || !phone || phone.length < 10) {
      window.showToast('कृपया किसान का नाम और 10-अंकीय फोन नंबर दर्ज करें!', 'error');
      return;
    }

    if (!diagnosis || !medicines) {
      window.showToast('कृपया निदान एवं औषधियां दर्ज करें!', 'error');
      return;
    }

    // Auto save record
    window.saveOfflineCaseDirectly(false);

    const docName = VetcareState.currentUser?.name || 'अधिकृत पशु चिकित्सक';
    const dateStr = new Date().toLocaleDateString('hi-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const msg = `📋 *VETCARE डिजिटल क्लिनिकल पर्ची (OPD Slip)*
------------------------------------
📅 दिनांक: ${dateStr}
👨‍⚕️ चिकित्सक: ${docName}
👨‍🌾 पशुपालक: ${farmerName} (${phone})
🐄 पशु प्रजाति: ${animal}
${gps ? `📍 लोकेशन GPS: https://maps.google.com/?q=${gps}\n` : ''}
🔬 प्रोविजनल निदान: *${diagnosis}*
------------------------------------
💊 *प्रिस्क्राइब की गई दवाएं व डोज़:*
${medicines}
------------------------------------
💰 *लेखा जोखा:*
कुल फीस: ₹${total} | जमा: ₹${paid} | *बकाया: ₹${due}*
------------------------------------
⚠️ *निर्देश:* डॉक्टर के परामर्श अनुसार ही दवा का प्रयोग करें। किसी भी आपातकाल में तुरंत संपर्क करें।
_Vetcare AI OS द्वारा सत्यापित_`;

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  window.saveOfflineCaseDirectly = function (showToastMessage = true) {
    const farmerName = document.getElementById('opdFarmerName')?.value.trim();
    const phone = document.getElementById('opdFarmerPhone')?.value.trim();
    const village = document.getElementById('opdVillage')?.value.trim() || 'गाँव';
    const animal = document.getElementById('opdAnimal')?.value || 'गाय';
    const tag = document.getElementById('opdTag')?.value.trim() || 'NA';
    const pregnancy = document.getElementById('opdPregnancy')?.value || 'खाली';
    const diagnosis = document.getElementById('opdDiagnosis')?.value.trim();
    const medicines = document.getElementById('opdMedicine')?.value.trim();
    const totalFee = parseFloat(document.getElementById('opdTotalFee')?.value) || 0;
    const paidFee = parseFloat(document.getElementById('opdPaidFee')?.value) || 0;
    const dueFee = Math.max(0, totalFee - paidFee);
    const gps = document.getElementById('opdGPS')?.value || '';

    if (!farmerName || !phone) {
      if (showToastMessage) window.showToast('कृपया किसान का नाम और फोन नंबर भरें!', 'error');
      return;
    }

    let records = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.OPD_RECORDS);
      records = stored ? JSON.parse(stored) : [];
    } catch (e) {
      records = [];
    }

    const newRecord = {
      id: 'OPD_' + Date.now(),
      farmerName,
      phone,
      village,
      animal,
      tag,
      pregnancy,
      diagnosis: diagnosis || 'सामान्य परीक्षण',
      medicines: medicines || 'सामान्य चिकित्सा',
      serviceMode: VetcareState.activeServiceMode,
      totalFee,
      paidFee,
      dueFee,
      gps,
      createdAt: Date.now()
    };

    records.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.OPD_RECORDS, JSON.stringify(records));

    if (showToastMessage) {
      window.showToast('केस रिकॉर्ड सफलतापूर्वक लोकल आर्काइव में सुरक्षित हुआ!', 'success');
    }

    renderSavedRecordsList();
  };

  window.printCurrentOPDSlip = function () {
    const printArea = document.getElementById('printableSlipArea');
    if (!printArea) return;

    const farmerName = document.getElementById('opdFarmerName')?.value || 'किसान';
    const phone = document.getElementById('opdFarmerPhone')?.value || '-';
    const village = document.getElementById('opdVillage')?.value || '-';
    const animal = document.getElementById('opdAnimal')?.value || 'पशु';
    const diagnosis = document.getElementById('opdDiagnosis')?.value || '-';
    const medicines = document.getElementById('opdMedicine')?.value || '-';
    const total = document.getElementById('opdTotalFee')?.value || '0';
    const paid = document.getElementById('opdPaidFee')?.value || '0';
    const due = document.getElementById('opdDueFee')?.value || '0';
    const docName = VetcareState.currentUser?.name || 'Veterinary Practitioner';

    printArea.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px;">
        <h2 style="font-size: 18px; margin: 0; font-weight: bold;">VETCARE AI OS - CLINICAL OPD SLIP</h2>
        <p style="margin: 2px 0; font-size: 11px;">अधिकृत पशु चिकित्सा परामर्श एवं प्रिस्क्रिप्शन पर्ची</p>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 11px;">
        <div>
          <strong>चिकित्सक:</strong> ${docName}<br>
          <strong>तारीख:</strong> ${new Date().toLocaleDateString('hi-IN')}
        </div>
        <div>
          <strong>पशुपालक:</strong> ${farmerName} (${phone})<br>
          <strong>गाँव:</strong> ${village} | <strong>पशु:</strong> ${animal}
        </div>
      </div>
      <div style="margin-top: 12px; border: 1px solid #ddd; padding: 8px; border-radius: 6px; font-size: 11px;">
        <strong>प्रोविजनल निदान (Diagnosis):</strong> ${diagnosis}
      </div>
      <div style="margin-top: 12px; border: 1px solid #ddd; padding: 8px; border-radius: 6px; font-size: 11px;">
        <strong>Rx औषधियां व इंजेक्शन:</strong>
        <pre style="white-space: pre-wrap; font-family: monospace; margin-top: 4px;">${medicines}</pre>
      </div>
      <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 11px; border-top: 1px dashed #aaa; padding-top: 6px;">
        <span>कुल फीस: ₹${total}</span>
        <span>जमा: ₹${paid}</span>
        <strong>बकाया राशि: ₹${due}</strong>
      </div>
      <div style="margin-top: 30px; display: flex; justify-content: space-between; font-size: 10px;">
        <span>हस्ताक्षर डॉक्टर: ____________________</span>
        <span>हस्ताक्षर किसान: ____________________</span>
      </div>
    `;

    window.print();
  };

  window.handleRecordSearch = function () {
    renderSavedRecordsList();
  };

  function renderSavedRecordsList() {
    const container = document.getElementById('recordsList');
    const badge = document.getElementById('recordTotalBadge');
    if (!container) return;

    let records = [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OPD_RECORDS);
      records = data ? JSON.parse(data) : [];
    } catch (e) {
      records = [];
    }

    if (badge) badge.textContent = `${records.length} केस सुरक्षित`;

    const query = document.getElementById('searchRecordsInput')?.value.toLowerCase().trim() || '';
    const filtered = records.filter(
      (r) =>
        r.farmerName.toLowerCase().includes(query) ||
        r.phone.includes(query) ||
        r.diagnosis.toLowerCase().includes(query) ||
        r.village.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">कोई केस रिकॉर्ड उपलब्ध नहीं है।</div>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        (rec) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1.5 text-xs">
          <div class="flex items-center justify-between">
            <div class="font-bold text-slate-800 text-sm">${rec.farmerName} <span class="text-xs text-slate-500 font-normal">(${rec.village})</span></div>
            <span class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">${rec.animal}</span>
          </div>
          <div class="text-slate-600"><strong>निदान:</strong> ${rec.diagnosis}</div>
          <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 text-slate-500">
            <span>📱 ${rec.phone}</span>
            <span class="font-bold ${rec.dueFee > 0 ? 'text-rose-600' : 'text-emerald-600'}">बकाया: ₹${rec.dueFee}</span>
            ${
              rec.gps
                ? `<a href="https://maps.google.com/?q=${rec.gps}" target="_blank" class="text-blue-600 font-bold hover:underline">📍 20-km GPS</a>`
                : ''
            }
          </div>
        </div>
      `
      )
      .join('');
  }

  // --------------------------------------------------------------------------
  // 10. AUTH MODAL TAB CONTROLLER & RENDERING
  // --------------------------------------------------------------------------
  function renderDynamicAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="document.getElementById('auth-modal').style.display='none'" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold">📲</div>
          <h3 id="authModalTitle" class="text-base font-black text-slate-900">Vetcare AI OS • प्रवेश</h3>
          <p class="text-[11px] text-slate-500">24-घंटे मुफ़्त क्लिनिकल ट्रायल एवं सत्यापन</p>
        </div>

        <!-- AUTH TABS: LOGIN vs REGISTER -->
        <div class="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold text-center">
          <button id="tabAuthLogin" onclick="window.switchAuthTab('LOGIN')" class="py-1.5 rounded-xl bg-white shadow-xs text-blue-700">लॉगिन करें (Login)</button>
          <button id="tabAuthRegister" onclick="window.switchAuthTab('REGISTER')" class="py-1.5 rounded-xl text-slate-600">नया पंजीकरण (Register)</button>
        </div>

        <!-- LOGIN CONTAINER -->
        <div id="containerAuthLogin" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-1">मोबाइल नंबर अथवा ईमेल</label>
            <input id="inputLoginContact" type="text" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono" />
          </div>

          <!-- Method 1: Password -->
          <div>
            <label class="block text-slate-700 font-bold mb-1">पासवर्ड</label>
            <input id="inputLoginPassword" type="password" placeholder="••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono" />
          </div>

          <button onclick="window.handlePasswordLoginSubmit()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition">
            पासवर्ड से तुरंत प्रवेश ➔
          </button>

          <div class="relative flex py-1 items-center">
            <div class="flex-grow border-t border-slate-200"></div>
            <span class="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase">या OTP द्वारा</span>
            <div class="flex-grow border-t border-slate-200"></div>
          </div>

          <!-- Method 2: OTP Trigger -->
          <button onclick="window.handleOtpLoginRequest()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-xs transition">
            6-अंकीय SMS OTP भेजें ⚡
          </button>
        </div>

        <!-- REGISTRATION CONTAINER -->
        <div id="containerAuthRegister" class="hidden space-y-2.5 text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-0.5">आपका नाम</label>
            <input id="inputRegisterName" type="text" placeholder="उदा. डॉ. अमित शर्मा" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-0.5">कार्य-क्षेत्र (Role)</label>
            <select id="inputRegisterRole" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-slate-800">
              <option value="doctor">🩺 Veterinary Practitioner (चिकित्सक)</option>
              <option value="farmer">🌾 Smart Dairy Farmer (पशुपालक)</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-0.5">मोबाइल नंबर (10 अंक)</label>
            <input id="inputRegisterPhone" type="tel" maxlength="10" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono font-bold" />
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-0.5">नया पासवर्ड बनाएं</label>
            <input id="inputRegisterPassword" type="password" placeholder="कम से कम 6 अंक" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono" />
          </div>

          <button onclick="window.handleRegisterSubmit()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition">
            रजिस्टर करें एवं OTP भेजें ➔
          </button>
        </div>

        <!-- COMMON OTP VERIFICATION INPUT -->
        <div id="authOtpSectionCommon" class="hidden space-y-2 pt-2 border-t border-slate-100 text-xs">
          <label class="block text-slate-700 font-bold">प्राप्त 6-अंकीय OTP कोड दर्ज करें</label>
          <input id="inputCommonAuthOtp" type="text" maxlength="6" placeholder="000000" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-center text-lg font-mono tracking-widest font-black outline-none" />
          <button onclick="window.handleCommonOtpVerification()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow-xs">
            सत्यापित कर प्रवेश करें ⚡
          </button>
        </div>
      </div>
    `;
  }

  window.switchAuthTab = function (tab) {
    const loginBtn = document.getElementById('tabAuthLogin');
    const regBtn = document.getElementById('tabAuthRegister');
    const loginBox = document.getElementById('containerAuthLogin');
    const regBox = document.getElementById('containerAuthRegister');

    if (tab === 'LOGIN') {
      if (loginBtn) loginBtn.className = 'py-1.5 rounded-xl bg-white shadow-xs text-blue-700';
      if (regBtn) regBtn.className = 'py-1.5 rounded-xl text-slate-600';
      if (loginBox) loginBox.classList.remove('hidden');
      if (regBox) regBox.classList.add('hidden');
    } else {
      if (regBtn) regBtn.className = 'py-1.5 rounded-xl bg-white shadow-xs text-emerald-700';
      if (loginBtn) loginBtn.className = 'py-1.5 rounded-xl text-slate-600';
      if (regBox) regBox.classList.remove('hidden');
      if (loginBox) loginBox.classList.add('hidden');
    }
  };

  window.handlePasswordLoginSubmit = function () {
    const contact = document.getElementById('inputLoginContact')?.value.trim();
    const pass = document.getElementById('inputLoginPassword')?.value.trim();

    if (!contact || !pass) {
      window.showToast('कृपया मोबाइल और पासवर्ड दोनों भरें!', 'error');
      return;
    }

    const success = window.loginWithPassword(contact, pass);
    if (success) {
      const modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'none';
    }
  };

  window.handleOtpLoginRequest = function () {
    const contact = document.getElementById('inputLoginContact')?.value.trim();
    if (!contact || contact.length < 10) {
      window.showToast('कृपया पहले 10-अंकीय मोबाइल नंबर दर्ज करें!', 'error');
      return;
    }

    const cleanContact = contact.toLowerCase();
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    VetcareState.pendingOtp = generatedOtp;
    VetcareState.pendingOtpPhone = cleanContact;

    window.sendSmsOtpGateway(cleanContact, generatedOtp);
    const otpSection = document.getElementById('authOtpSectionCommon');
    if (otpSection) otpSection.classList.remove('hidden');
  };

  window.handleRegisterSubmit = function () {
    const name = document.getElementById('inputRegisterName')?.value.trim();
    const role = document.getElementById('inputRegisterRole')?.value || 'doctor';
    const phone = document.getElementById('inputRegisterPhone')?.value.trim();
    const pass = document.getElementById('inputRegisterPassword')?.value.trim();

    if (!phone || phone.length < 10 || !pass) {
      window.showToast('कृपया मोबाइल एवं पासवर्ड अनिवार्य रूप से भरें!', 'error');
      return;
    }

    const user = window.registerUser(name, role, phone, pass);
    if (user) {
      const otpSection = document.getElementById('authOtpSectionCommon');
      if (otpSection) otpSection.classList.remove('hidden');
    }
  };

  window.handleCommonOtpVerification = function () {
    const otp = document.getElementById('inputCommonAuthOtp')?.value.trim();
    const phone = VetcareState.pendingOtpPhone;

    if (!otp) {
      window.showToast('कृपया 6-अंकीय OTP दर्ज करें!', 'error');
      return;
    }

    const success = window.verifyOtpAndLogin(otp, phone);
    if (success) {
      const modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'none';
    }
  };

  // --------------------------------------------------------------------------
  // 11. GEMINI KEY MODAL & GLOBAL INITIALIZATION
  // --------------------------------------------------------------------------
  window.openAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    const input = document.getElementById('inputGeminiKey');
    if (input) {
      input.value = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
    }
    if (modal) modal.style.display = 'flex';
  };

  window.closeAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    if (modal) modal.style.display = 'none';
  };

  window.saveGeminiKey = function () {
    const input = document.getElementById('inputGeminiKey');
    const key = input?.value.trim();
    if (!key) {
      window.showToast('कृपया एक वैध API Key दर्ज करें!', 'error');
      return;
    }
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key);
    window.closeAIKeyModal();
    window.showToast('Gemini API Key सुरक्षित कर ली गई!', 'success');
  };

  window.setAppLanguage = function (langCode) {
    if (!I18N_DICTIONARY[langCode]) langCode = 'hinglish';
    VetcareState.currentLanguage = langCode;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, langCode);

    const dict = I18N_DICTIONARY[langCode];
    const titleTag = document.getElementById('pageTitleTag');
    const headerTitle = document.getElementById('appHeaderTitle');
    if (titleTag) titleTag.textContent = `${dict.appName} | Clinical & Smart Dairy Assistant`;
    if (headerTitle) headerTitle.textContent = dict.appName;

    updateRoleBadges();
    window.showToast(`Language set to ${langCode.toUpperCase()}`, 'info');
  };

  function launchApplicationWorkspace() {
    const screenGateway = document.getElementById('screenGateway');
    const screenMainApp = document.getElementById('screenMainApp');

    if (screenGateway) screenGateway.classList.add('hidden');
    if (screenMainApp) screenMainApp.classList.remove('hidden');

    updateRoleBadges();
    renderAISurgeonUI();
    renderSavedRecordsList();
    window.navigateToView('viewServicesLauncher');
  }

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Check saved language
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'hinglish';
    VetcareState.currentLanguage = savedLang;

    // Check active session
    try {
      const sessionUser = localStorage.getItem(STORAGE_KEYS.SESSION_USER);
      if (sessionUser) {
        const user = JSON.parse(sessionUser);
        activateUserSession(user);
      } else {
        renderDynamicAuthModal();
      }
    } catch (e) {
      renderDynamicAuthModal();
    }
  });

})(window, document);
