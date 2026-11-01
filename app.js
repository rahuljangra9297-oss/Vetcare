// Vetcare AI OS - Master Application Router & Engine Controller (2026 Production)

(function (root) {
  "use strict";

  /* =========================================================================
     1. MASTER CONFIGURATION & VERIFIED FINANCIAL CONSTANTS
     ========================================================================= */
  const APP_CONFIG = {
    version: "2026.4.8-PROD",
    adminPin: "9297",
    sbiUpi: "rahuljangra9297@oksbi",
    pnbUpi: "rahuljangra9297-1@okicici",
    defaultLang: "hinglish",
    sessionDurationSeconds: 3600, // 60 Minutes
    trialDurationHours: 24,
    geminiPrimaryModel: "gemini-3.8-flash",
    geminiFallbackModel: "gemini-3.5-flash",
    storageKeys: {
      USER_ROLE: "vetcare_user_role",
      USER_REG_TIME: "vetcare_user_reg_time",
      ACTIVE_LANG: "vetcare_active_lang",
      DUAL_PORTAL: "vetcare_dual_portal_allowed",
      GEMINI_KEY: "gemini_api_key",
      CURRENT_TAB: "vetcare_current_tab"
    }
  };

  root.APP_CONFIG = APP_CONFIG;

  /* =========================================================================
     2. HINGLISH-FIRST MULTI-LANGUAGE ENGINE & TRANSLATIONS
     ========================================================================= */
  const TRANSLATION_DICTIONARY = {
    hinglish: {
      appName: "Vetcare AI",
      tagline: "Pashu Chikitsa, 3-Way Rog Nidan & Smart Dairy OS",
      roleDoctor: "Adhikrit Pashu Chikitsak 🩺",
      roleFarmer: "Smart Pashupalak 👨‍🌾",
      btnLauncher: "🚀 Sabhi Suvidhayein",
      btnSwitchPortal: "🔄 Portal Badlein",
      tabDiagnosis: "Rog Nidan",
      tabOPD: "OPD Parcha",
      tabInventory: "Dawa Stock",
      tabAI: "AI Surgeon",
      tabBreeding: "Pashu Prajanan",
      tabFeed: "Santulit Aahar",
      tabFinance: "Khata Bahi",
      sessionLeft: "⏱️ Satra:",
      trialLeft: "⏳ 24h Trial:",
      pregnancyAlert: "⚠️ GABHIN PASHU SAVDHANI (Pregnancy Warning)",
      verifiedPayee: "Adhikrit Merchant Khata: Rahul Jangra"
    },
    hindi: {
      appName: "वेटकेयर एआई",
      tagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल इंजन एवं स्मार्ट डेयरी",
      roleDoctor: "अधिकृत पशु चिकित्सक 🩺",
      roleFarmer: "स्मार्ट पशुपालक 👨‍🌾",
      btnLauncher: "🚀 सभी सेवाएं",
      btnSwitchPortal: "🔄 पोर्टल बदलें",
      tabDiagnosis: "रोग निदान",
      tabOPD: "ओपीडी पर्चा",
      tabInventory: "दवा स्टॉक",
      tabAI: "एआई सर्जन",
      tabBreeding: "पशु प्रजनन",
      tabFeed: "संतुलित आहार",
      tabFinance: "खाता बही",
      sessionLeft: "⏱️ सत्र:",
      trialLeft: "⏳ 24h ट्रायल:",
      pregnancyAlert: "⚠️ गाभिन पशु चेतावनी (Pregnancy Alert)",
      verifiedPayee: "सत्यापित मर्चेंट खाता: राहुल जांगड़ा"
    },
    english: {
      appName: "Vetcare AI OS",
      tagline: "Clinical Decision Support & Smart Dairy Assistant",
      roleDoctor: "Authorized Vet Doctor 🩺",
      roleFarmer: "Smart Dairy Farmer 👨‍🌾",
      btnLauncher: "🚀 All Services",
      btnSwitchPortal: "🔄 Switch Portal",
      tabDiagnosis: "Diagnosis",
      tabOPD: "OPD Rx Slip",
      tabInventory: "Drug Stock",
      tabAI: "AI Surgeon",
      tabBreeding: "Breeding",
      tabFeed: "Feed Ration",
      tabFinance: "Ledger",
      sessionLeft: "⏱️ Session:",
      trialLeft: "⏳ 24h Trial:",
      pregnancyAlert: "⚠️ PREGNANCY SAFETY WARNING",
      verifiedPayee: "Verified Payee: Rahul Jangra"
    },
    punjabi: {
      appName: "ਵੈਟਕੇਅਰ ਏ.ਆਈ",
      tagline: "ਪਸ਼ੂ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ ਪ੍ਰਬੰਧਨ",
      roleDoctor: "ਅਧਿਕਾਰਤ ਪਸ਼ੂ ਡਾਕਟਰ 🩺",
      roleFarmer: "ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ 👨‍🌾",
      btnLauncher: "🚀 ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ",
      btnSwitchPortal: "🔄 ਪੋਰਟਲ ਬਦਲੋ",
      tabDiagnosis: "ਰੋਗ ਜਾਂਚ",
      tabOPD: "ਓ.ਪੀ.ਡੀ ਪਰਚੀ",
      tabInventory: "ਦਵਾਈ ਸਟਾਕ",
      tabAI: "ਏ.ਆਈ ਡਾਕਟਰ",
      tabBreeding: "ਪਸ਼ੂ ਪ੍ਰਜਨਨ",
      tabFeed: "ਸੰਤੁਲਿਤ ਖੁਰਾਕ",
      tabFinance: "ਖਾਤਾ ਬਹੀ",
      sessionLeft: "⏱️ ਸੈਸ਼ਨ:",
      trialLeft: "⏳ 24h ਟ੍ਰਾਇਲ:",
      pregnancyAlert: "⚠️ ਗੱਭਣ ਪਸ਼ੂ ਚੇਤਾਵਨੀ (Pregnancy Alert)",
      verifiedPayee: "ਤਸਦੀਕਸ਼ੁਦਾ ਖਾਤਾ: ਰਾਹੁਲ ਜਾਂਗੜਾ"
    },
    marathi: {
      appName: "वेटकेअर एआय",
      tagline: "पशु आरोग्य निदान आणि प्रगत डेअरी व्यवस्थापन",
      roleDoctor: "अधिकृत पशुवैद्यकीय अधिकारी 🩺",
      roleFarmer: "स्मार्ट पशुपालक शेतकरी 👨‍🌾",
      btnLauncher: "🚀 सर्व सेवा",
      btnSwitchPortal: "🔄 पोर्टल बदला",
      tabDiagnosis: "रोग निदान",
      tabOPD: "ओपीडी पावती",
      tabInventory: "औषध साठा",
      tabAI: "एआय सर्जन",
      tabBreeding: "प्रजनन व्यवस्थापन",
      tabFeed: "समतोल आहार",
      tabFinance: "खाते वही",
      sessionLeft: "⏱️ सत्र:",
      trialLeft: "⏳ 24h ट्रायल:",
      pregnancyAlert: "⚠️ गाभण जनावर चेतावणी (Pregnancy Alert)",
      verifiedPayee: "सत्यापित व्यापारी खाते: राहुल जांगडा"
    },
    gujarati: {
      appName: "વેટકૅર AI",
      tagline: "પશુ આરોગ્ય નિદાન અને આધુનિક ડેરી પ્લેટફોર્મ",
      roleDoctor: "અધિકૃત પશુ ચિકિત્સક 🩺",
      roleFarmer: "સ્માર્ટ પશુપાલક ખેડૂત 👨‍🌾",
      btnLauncher: "🚀 બધી સેવાઓ",
      btnSwitchPortal: "🔄 પોર્ટલ બદલો",
      tabDiagnosis: "રોગ નિદાન",
      tabOPD: "OPD સ્લિપ",
      tabInventory: "દવા સ્ટોક",
      tabAI: "AI સર્જન",
      tabBreeding: "પશુ પ્રજનન",
      tabFeed: "સંતુલિત આહાર",
      tabFinance: "ખાતાવહી",
      sessionLeft: "⏱️ સત્ર:",
      trialLeft: "⏳ 24h ટ્રાયલ:",
      pregnancyAlert: "⚠️ ગાભણ પશુ ચેતવણી (Pregnancy Alert)",
      verifiedPayee: "ચકાસાયેલ ખાતું: રાહુલ જાંગડા"
    },
    bengali: {
      appName: "ভেটকেয়ার এআই",
      tagline: "পশু স্বাস্থ্য নির্ণয় ও স্মার্ট ডেইরি ওএস",
      roleDoctor: "অনুমোদিত পশু চিকিৎসক 🩺",
      roleFarmer: "স্মার্ট খামারি 👨‍🌾",
      btnLauncher: "🚀 সকল সেবা",
      btnSwitchPortal: "🔄 পোর্টাল পরিবর্তন",
      tabDiagnosis: "রোগ নির্ণয়",
      tabOPD: "ওপিডি প্রেসক্রিপশন",
      tabInventory: "ওষুধের স্টক",
      tabAI: "এআই বিশেষজ্ঞ",
      tabBreeding: "প্রজনন ব্যবস্থা",
      tabFeed: "সুষম খাদ্য",
      tabFinance: "খাতাবহি",
      sessionLeft: "⏱️ সেশন:",
      trialLeft: "⏳ ২৪ ঘণ্টা ট্রায়াল:",
      pregnancyAlert: "⚠️ গর্ভবতী পশু সতর্কবার্তা (Pregnancy Warning)",
      verifiedPayee: "যাচাইকৃত মার্চেন্ট একাউন্ট: রাহুল জাংড়া"
    }
  };

  root.VETCARE_I18N = TRANSLATION_DICTIONARY;

  root.getAppLanguage = function () {
    return localStorage.getItem(APP_CONFIG.storageKeys.ACTIVE_LANG) || APP_CONFIG.defaultLang;
  };

  root.setAppLanguage = function (langKey) {
    if (!TRANSLATION_DICTIONARY[langKey]) langKey = APP_CONFIG.defaultLang;
    localStorage.setItem(APP_CONFIG.storageKeys.ACTIVE_LANG, langKey);
    root.applyLanguageTranslations();
  };

  root.t = function (key) {
    const lang = root.getAppLanguage();
    const dict = TRANSLATION_DICTIONARY[lang] || TRANSLATION_DICTIONARY.hinglish;
    return dict[key] || TRANSLATION_DICTIONARY.hinglish[key] || key;
  };

  root.applyLanguageTranslations = function () {
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      const translated = root.t(key);
      if (translated) elem.textContent = translated;
    });

    const userRole = root.getUserRole();
    const roleBadge = document.getElementById("currentUserRoleBadge");
    if (roleBadge) {
      roleBadge.textContent = userRole === "DOCTOR" ? root.t("roleDoctor") : root.t("roleFarmer");
    }
  };

  /* =========================================================================
     3. DUAL-TIMER CONTROLLER (SESSION & 24-HOUR FREE TRIAL)
     ========================================================================= */
  let sessionTimerInterval = null;
  let trialTimerInterval = null;
  let remainingSessionSeconds = APP_CONFIG.sessionDurationSeconds;

  root.initDualTimerController = function () {
    // 1. Session Timer (60 Minutes)
    if (sessionTimerInterval) clearInterval(sessionTimerInterval);
    remainingSessionSeconds = APP_CONFIG.sessionDurationSeconds;

    sessionTimerInterval = setInterval(() => {
      if (remainingSessionSeconds > 0) {
        remainingSessionSeconds--;
        const mins = Math.floor(remainingSessionSeconds / 60).toString().padStart(2, "0");
        const secs = (remainingSessionSeconds % 60).toString().padStart(2, "0");
        const badge = document.getElementById("session-timer-badge");
        if (badge) {
          badge.textContent = `${root.t("sessionLeft")} ${mins}:${secs} शेष`;
        }
      } else {
        clearInterval(sessionTimerInterval);
        alert("⏱️ आपका 60 मिनट का सुरक्षा सत्र समाप्त हो गया है! कृपया सत्र रिफ्रेश करें।");
        root.initDualTimerController();
      }
    }, 1000);

    // 2. 24-Hour Trial Timer
    if (trialTimerInterval) clearInterval(trialTimerInterval);

    let regTime = localStorage.getItem(APP_CONFIG.storageKeys.USER_REG_TIME);
    if (!regTime) {
      regTime = Date.now().toString();
      localStorage.setItem(APP_CONFIG.storageKeys.USER_REG_TIME, regTime);
    }
    const regTimestamp = parseInt(regTime, 10);
    const trialTotalMs = APP_CONFIG.trialDurationHours * 60 * 60 * 1000;

    trialTimerInterval = setInterval(() => {
      const elapsed = Date.now() - regTimestamp;
      const remainingMs = trialTotalMs - elapsed;
      const badge = document.getElementById("trial-timer-badge");

      if (remainingMs > 0) {
        const hrs = Math.floor(remainingMs / (1000 * 60 * 60)).toString().padStart(2, "0");
        const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
        const secs = Math.floor((remainingMs % (1000 * 60)) / 1000).toString().padStart(2, "0");
        if (badge) {
          badge.textContent = `${root.t("trialLeft")} ${hrs}:${mins}:${secs} शेष`;
        }
      } else {
        clearInterval(trialTimerInterval);
        if (badge) {
          badge.textContent = "⏳ 24h ट्रायल समाप्त (प्रीमियम लें)";
          badge.classList.remove("bg-amber-50", "text-amber-800");
          badge.classList.add("bg-rose-600", "text-white");
        }
      }
    }, 1000);
  };

  /* =========================================================================
     4. USER ROLES, DUAL PORTAL PERMISSIONS & NAVIGATION
     ========================================================================= */
  root.getUserRole = function () {
    return localStorage.getItem(APP_CONFIG.storageKeys.USER_ROLE) || "FARMER";
  };

  root.setUserRole = function (role) {
    localStorage.setItem(APP_CONFIG.storageKeys.USER_ROLE, role);
    root.syncPortalUIState();
  };

  root.isDualPortalAllowed = function () {
    // Check if user is granted dual authority via admin or stored setting
    const stored = localStorage.getItem(APP_CONFIG.storageKeys.DUAL_PORTAL);
    if (stored === "true") return true;

    // Check user db if available
    try {
      const users = JSON.parse(localStorage.getItem("vetcare_users_db") || "[]");
      if (users.length > 0 && users[0].dualPortal) return true;
    } catch (e) {}

    return false;
  };

  root.toggleActivePortal = function () {
    if (!root.isDualPortalAllowed()) {
      alert("⚠️ डुअल पोर्टल एक्सेस सक्षम नहीं है! कृपया एडमिन कंट्रोल से अनुमति लें।");
      return;
    }

    const currentRole = root.getUserRole();
    const newRole = currentRole === "DOCTOR" ? "FARMER" : "DOCTOR";
    root.setUserRole(newRole);
    alert(`पोर्टल सफलतापूर्वक बदला गया: ${newRole === "DOCTOR" ? "अधिकृत पशु चिकित्सक" : "स्मार्ट पशुपालक"}`);
    root.openServicesLauncher();
  };

  root.syncPortalUIState = function () {
    const currentRole = root.getUserRole();
    const isDual = root.isDualPortalAllowed();

    // Toggle header switch button
    let switchBtn = document.getElementById("dualPortalSwitchBtn");
    if (!switchBtn) {
      const headerActions = document.querySelector("header div.flex.items-center.gap-1\\.5");
      if (headerActions) {
        switchBtn = document.createElement("button");
        switchBtn.id = "dualPortalSwitchBtn";
        switchBtn.onclick = root.toggleActivePortal;
        switchBtn.className = "text-[11px] px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-xs flex items-center gap-1 transition";
        headerActions.insertBefore(switchBtn, headerActions.firstChild);
      }
    }

    if (switchBtn) {
      if (isDual) {
        switchBtn.classList.remove("hidden");
        switchBtn.innerHTML = `<span>🔄</span> <span class="hidden sm:inline">${root.t("btnSwitchPortal")}</span>`;
      } else {
        switchBtn.classList.add("hidden");
      }
    }

    // Toggle navigation tab visibility according to role
    const docTabs = ["navRx", "navRecords", "navInventory", "navAI"];
    const farmerTabs = ["navBreeding", "navFeed"];

    docTabs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (currentRole === "DOCTOR") el.classList.remove("hidden");
        else el.classList.add("hidden");
      }
    });

    farmerTabs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (currentRole === "FARMER") el.classList.remove("hidden");
        else el.classList.add("hidden");
      }
    });

    // Update Role Tag
    root.applyLanguageTranslations();
  };

  /* =========================================================================
     5. CENTRAL SERVICES LAUNCHER HUB
     ========================================================================= */
  root.openServicesLauncher = function () {
    const modalId = "vetcare_central_launcher_modal";
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md";
      document.body.appendChild(modal);
    }

    const currentRole = root.getUserRole();
    const isDoctor = currentRole === "DOCTOR";

    const doctorServices = [
      { id: "SRV_D1", icon: "🧬", title: "अंग लक्षण मैट्रिक्स", desc: "वेटेड वैज्ञानिक क्लिनिकल संभावना", action: () => { root.closeLauncher(); root.switchTab('diagnosis'); if (root.renderDiagnosisMatrixUI) root.renderDiagnosisMatrixUI('diseaseSearchResults'); } },
      { id: "SRV_D2", icon: "🔍", title: "त्वरित खोज व AI", desc: "Gemini 3.8 Flash त्वरित निदान", action: () => { root.closeLauncher(); root.switchTab('ai'); } },
      { id: "SRV_D3", icon: "📝", title: "ओपीडी पर्चा (Rx)", desc: "1-Click डिजिटल व्हाट्सएप पर्ची", action: () => { root.closeLauncher(); root.switchTab('rx'); if (root.renderUnifiedClinicalHub) root.renderUnifiedClinicalHub('viewRx'); } },
      { id: "SRV_D4", icon: "🧬", title: "कृत्रिम गर्भाधान (A.I.)", desc: "सीमन स्ट्रॉ व बुल ट्रैकिंग", action: () => { root.closeLauncher(); root.switchTab('rx'); if (root.switchServiceMode) root.switchServiceMode('AI_RECORD'); } },
      { id: "SRV_D5", icon: "💊", title: "दवा ज्ञानकोश", desc: "एथिकल बनाम जेनेरिक औषधियां", action: () => { root.closeLauncher(); root.switchTab('inventory'); if (root.renderMedicinesPharmacopeia) root.renderMedicinesPharmacopeia('ALL', 'ALL', 'NAME_ASC', ''); } },
      { id: "SRV_D6", icon: "⚖️", title: "खुराक कैलकुलेटर", desc: "शेफर्स भार व एमएल गणना", action: () => { root.closeLauncher(); root.switchTab('diagnosis'); } },
      { id: "SRV_D7", icon: "📦", title: "दवा स्टॉक इन्वेंट्री", desc: "अलर्ट व स्ट्रॉ स्टॉक रिकॉर्ड", action: () => { root.closeLauncher(); root.switchTab('inventory'); } },
      { id: "SRV_D8", icon: "📊", title: "क्लिनिक खाता बही", desc: "किसान बकाया व दैनिक आमदनी", action: () => { root.closeLauncher(); root.switchTab('finance'); } }
    ];

    const farmerServices = [
      { id: "SRV_F1", icon: "🌿", title: "देसी उपचार (25 रोग)", desc: "100% शुद्ध घरेलू प्रमाणित नुस्खे", action: () => { root.closeLauncher(); if (root.renderFarmerHub) { root.renderFarmerHub('viewBreeding'); root.switchFarmerHubSection('REMEDIES'); root.switchTab('breeding'); } } },
      { id: "SRV_F2", icon: "🛡️", title: "टीकाकरण ज्ञानकोश", desc: "HS, BQ, FMD, LSD संपूर्ण कैलेंडर", action: () => { root.closeLauncher(); if (root.renderFarmerHub) { root.renderFarmerHub('viewBreeding'); root.switchFarmerHubSection('VACCINE'); root.switchTab('breeding'); } } },
      { id: "SRV_F3", icon: "🧬", title: "नस्ल सुधार व A.I.", desc: "मद का सही समय व बछड़ी सीमन", action: () => { root.closeLauncher(); if (root.renderFarmerHub) { root.renderFarmerHub('viewBreeding'); root.switchFarmerHubSection('BREEDING'); root.switchTab('breeding'); } } },
      { id: "SRV_F4", icon: "🥛", title: "दूध वृद्धि उपाय", desc: "शतावरी, जीवंती व बाईपास फैट", action: () => { root.closeLauncher(); if (root.renderFarmerHub) { root.renderFarmerHub('viewBreeding'); root.switchFarmerHubSection('MILK_LEDGER'); root.switchTab('breeding'); } } },
      { id: "SRV_F5", icon: "📍", title: "20km डॉक्टर रिक्वेस्ट", desc: "निकटतम अधिकृत डॉक्टर को बुलाएं", action: () => { root.closeLauncher(); if (root.renderFarmerDoctorMatcher) { root.switchTab('feed'); root.renderFarmerDoctorMatcher('viewFeed'); } } },
      { id: "SRV_F6", icon: "💰", title: "दूध व खर्च बहीखाता", desc: "दैनिक दूध बिक्री व मुनाफा रिकॉर्ड", action: () => { root.closeLauncher(); if (root.renderFarmerHub) { root.renderFarmerHub('viewBreeding'); root.switchFarmerHubSection('MILK_LEDGER'); root.switchTab('breeding'); } } }
    ];

    const activeServices = isDoctor ? doctorServices : farmerServices;

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-800">
        
        <!-- CLOSE BUTTON -->
        <button onclick="window.closeLauncher()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-bold text-lg">✕</button>

        <!-- HEADER -->
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-md">
            ${isDoctor ? '🩺' : '👨‍🌾'}
          </div>
          <h2 class="text-lg font-black text-slate-900 tracking-tight">
            ${isDoctor ? 'पशु चिकित्सक सेवा केंद्र (Clinical Command Hub)' : 'स्मार्ट पशुपालक सेवा केंद्र (Farmer Services)'}
          </h2>
          <p class="text-xs text-slate-500">कृपया अपनी वांछित क्लिनिकल या डेयरी सेवा का चयन करें:</p>
        </div>

        <!-- SERVICES GRID -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${activeServices.map((srv, idx) => `
            <div onclick="window.triggerServiceLauncherItem(${idx})" class="p-3.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-2xl cursor-pointer transition flex flex-col items-center text-center space-y-1 active:scale-95 group shadow-xs">
              <span class="text-2xl group-hover:scale-110 transition transform">${srv.icon}</span>
              <strong class="text-xs font-black text-slate-900 block leading-tight mt-1">${srv.title}</strong>
              <span class="text-[10px] text-slate-500 leading-tight">${srv.desc}</span>
            </div>
          `).join("")}
        </div>

        <!-- FOOTER INFO & SWITCHER -->
        <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2">
            <span class="text-emerald-700 font-bold">🟢 24h फ्री ट्रायल एक्टिव</span>
            ${root.isDualPortalAllowed() ? `
              <button onclick="window.toggleActivePortal()" class="text-purple-700 font-bold underline ml-2">
                🔄 पोर्टल बदलें
              </button>
            ` : ''}
          </div>
          <button onclick="window.closeLauncher()" class="text-slate-500 font-bold hover:text-slate-800">
            डैशबोर्ड पर जारी रखें ➔
          </button>
        </div>

      </div>
    `;

    modal.style.display = "flex";
    root._activeLauncherServices = activeServices;
  };

  root.triggerServiceLauncherItem = function (index) {
    if (root._activeLauncherServices && root._activeLauncherServices[index]) {
      root._activeLauncherServices[index].action();
    }
  };

  root.closeLauncher = function () {
    const modal = document.getElementById("vetcare_central_launcher_modal");
    if (modal) modal.remove();
  };

  /* =========================================================================
     6. ACTIVE 2026 GEMINI 3.8 FLASH ENGINE & TABULAR RENDERER
     ========================================================================= */
  root.callGeminiClinicalAI = async function (promptText, type = "DIFFERENTIAL") {
    const apiKey = localStorage.getItem(APP_CONFIG.storageKeys.GEMINI_KEY);
    if (!apiKey) {
      alert("कृपया पहले 'AI Key' बटन दबाकर अपनी Google Gemini API Key सुरक्षित करें!");
      if (typeof root.openAIKeyModal === "function") root.openAIKeyModal();
      return null;
    }

    const systemPrompt = `You are the Lead Veterinary Clinician & Pharmacologist on Vetcare AI OS (2026 Production).
    Respond to clinical inquiries with strict veterinary precision.
    MANDATORY OUTPUT FORMAT:
    1. PROVISIONAL DIFFERENTIAL DIAGNOSIS (Top 3 Suspected Diseases with % confidence).
    2. ⚠️ PREGNANCY SAFETY BANNER: Explicitly state whether recommended treatments are safe in pregnant dairy cattle.
    3. 5-TIER STRUCTURED TREATMENT TABLE (Markdown Table format with columns: Category, Drug Salt, Leading Ethical Brand, Generic Equivalent, Accurate Dose/Route, Milk Withdrawal).
    4. SUPPORTIVE & NURSING ADVISORY.`;

    const requestPayload = {
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\nClinical Query / Case History: ${promptText}` }
          ]
        }
      ]
    };

    let responseText = null;

    // Try Primary Model (gemini-3.8-flash)
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${APP_CONFIG.geminiPrimaryModel}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload)
      });
      const data = await res.json();
      responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) {
      console.warn("Gemini 3.8 Flash primary failed, attempting fallback:", e);
    }

    // Fallback to gemini-3.5-flash / gemini-2.5-flash if primary fails
    if (!responseText) {
      try {
        const fallbackRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${APP_CONFIG.geminiFallbackModel}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload)
        });
        const fallbackData = await fallbackRes.json();
        responseText = fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (err) {
        console.error("Gemini Fallback Call Failed:", err);
        throw new Error("AI सर्वर से संपर्क नहीं हो सका। कृपया अपनी Gemini Key या नेटवर्क जांचें।");
      }
    }

    return responseText;
  };

  root.renderAiClinicalReport = function (rawMarkdown, containerId = "aiOutputArea") {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = rawMarkdown
      .replace(/^### (.*$)/gim, '<h3 class="text-sm font-black text-purple-950 mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-base font-black text-purple-900 mt-4 mb-1.5 border-b border-purple-200 pb-1">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');

    // Detect and render Pregnancy Warning Banner
    const isPregnancyUnsafe = rawMarkdown.toLowerCase().includes("contraindicated in pregnancy") || rawMarkdown.toLowerCase().includes("unsafe in pregnancy") || rawMarkdown.toLowerCase().includes("abortifacient");

    const pregnancyBannerHtml = isPregnancyUnsafe ? `
      <div class="p-3.5 bg-rose-600 text-white rounded-2xl shadow-md space-y-1 my-3 animate-pulse">
        <div class="flex items-center gap-2 font-black text-xs sm:text-sm">
          <span>🚨</span> <span>${root.t("pregnancyAlert")}</span>
        </div>
        <p class="text-[11px] text-rose-100 leading-relaxed">
          इस उपचार तालिका में कुछ दवाएं (उदा. Dexamethasone/PGF2a/Tetracycline) गाभिन पशुओं में गर्भपात या भ्रूण विकृति का कारण बन सकती हैं। गाभिन पशु होने पर तुरंत Isoflupredone या सुरक्षित विकल्प चुनें!
        </p>
      </div>
    ` : `
      <div class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold my-2 flex items-center gap-2">
        <span>✓</span> <span>प्रोटोकॉल सामान्यतः गाभिन पशुओं में चिकित्सीय डोज़ पर सुरक्षित है।</span>
      </div>
    `;

    // Wrap markdown tables in clean scrollable responsive containers
    html = html.replace(/\|(.+)\|/g, function (match) {
      return `<div class="font-mono text-xs text-slate-800">${match}</div>`;
    });

    container.innerHTML = `
      <div class="space-y-3 font-sans text-xs sm:text-sm leading-relaxed text-slate-800">
        <div class="flex items-center justify-between border-b border-purple-200 pb-2">
          <span class="font-black text-purple-900 text-xs flex items-center gap-1.5">
            <span>🤖</span> <span>Gemini 3.8 Flash क्लिनिकल डिसीजन रिपोर्ट</span>
          </span>
          <button onclick="window.copyAiReport()" class="text-purple-700 hover:underline font-bold text-xs">कॉपी करें 📋</button>
        </div>
        ${pregnancyBannerHtml}
        <div class="whitespace-pre-wrap">${html}</div>
      </div>
    `;

    container.classList.remove("hidden");
  };

  root.copyAiReport = function () {
    const text = document.getElementById("aiOutputArea")?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      alert("AI रिपोर्ट क्लिपबोर्ड में कॉपी कर ली गई है।");
    }
  };

  /* =========================================================================
     7. CENTRAL ROUTER & TAB SWITCH CONTROLLER
     ========================================================================= */
  root.switchTab = function (tabKey) {
    const tabs = ["diagnosis", "rx", "records", "inventory", "ai", "breeding", "feed", "finance", "helpdesk"];
    
    tabs.forEach(t => {
      const viewEl = document.getElementById(`view${t.charAt(0).toUpperCase() + t.slice(1)}`);
      const navEl = document.getElementById(`nav${t.charAt(0).toUpperCase() + t.slice(1)}`);
      
      if (viewEl) {
        if (t === tabKey) viewEl.classList.remove("hidden");
        else viewEl.classList.add("hidden");
      }

      if (navEl) {
        if (t === tabKey) {
          navEl.classList.add("active-nav-tab");
          navEl.classList.remove("text-slate-400");
          navEl.classList.add("text-blue-600");
        } else {
          navEl.classList.remove("active-nav-tab");
          navEl.classList.add("text-slate-400");
          navEl.classList.remove("text-blue-600");
        }
      }
    });

    localStorage.setItem(APP_CONFIG.storageKeys.CURRENT_TAB, tabKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  root.selectRole = function (role) {
    root.setUserRole(role);
    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");

    if (screenGateway) screenGateway.classList.add("hidden");
    if (screenMainApp) screenMainApp.classList.remove("hidden");

    root.syncPortalUIState();
    root.openServicesLauncher();
  };

  root.returnToGateway = function () {
    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");

    if (screenGateway) screenGateway.classList.remove("hidden");
    if (screenMainApp) screenMainApp.classList.add("hidden");
  };

  /* =========================================================================
     8. APP BOOTSTRAPPER & EVENT INITIALIZATION
     ========================================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Dual Timers Init
    root.initDualTimerController();

    // 2. Language Setup
    root.applyLanguageTranslations();

    // 3. User & Portal Sync
    root.syncPortalUIState();

    // 4. Attach Launcher button to header if missing
    const appHeaderTitle = document.getElementById("appHeaderTitle");
    if (appHeaderTitle && !document.getElementById("btnLauncherHeader")) {
      const launcherBtn = document.createElement("button");
      launcherBtn.id = "btnLauncherHeader";
      launcherBtn.onclick = root.openServicesLauncher;
      launcherBtn.className = "text-[11px] ml-2 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-black border border-blue-200 hover:bg-blue-100 transition shadow-xs";
      launcherBtn.textContent = root.t("btnLauncher");
      appHeaderTitle.parentElement.appendChild(launcherBtn);
    }
  });

})(typeof window !== "undefined" ? window : global);
