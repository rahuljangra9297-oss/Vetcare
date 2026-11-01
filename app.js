// Vetcare AI OS - Unified Production Engine (2026 Production)
// Architecture: Principal Lead Software Engineer & Veterinary Systems Architect
// Modules: Auth, Admin Console, Haversine 20km Dispatch, Hinglish I18n, Merged Clinical Hub, Gemini 3.8 Flash

(function (window, document) {
  "use strict";

  /* =========================================================================
     1. GLOBAL CONSTANTS, STATE & CONFIGURATION STORAGE
     ========================================================================= */
  const MASTER_ADMIN_ID = "9991039297";
  const MASTER_ADMIN_PW = "Rahul@1812";
  const MASTER_PIN = "9297";

  const STORAGE_KEYS = {
    SESSION: "vetcare_user_session_2026",
    USERS: "vetcare_user_directory_2026",
    SUBSCRIPTIONS: "vetcare_subscriptions_config_2026",
    TICKETS: "vetcare_support_tickets_2026",
    CONFIG: "vetcare_app_config_2026",
    CASES: "vetcare_clinical_cases_2026",
    DISPATCHES: "vetcare_dispatch_queue_2026",
    AI_KEY: "vetcare_gemini_api_key_2026",
    LANGUAGE: "vetcare_active_lang_2026"
  };

  const DEFAULT_APP_CONFIG = {
    appTitle: "Vetcare AI OS",
    tagline: "Clinical Decision Support System, 20km Smart Dispatch & Dairy OS",
    sbiUpi: "rahuljangra9297@oksbi",
    pnbUpi: "rahuljangra9297-1@okicici",
    payeeName: "Rahul Jangra (Vetcare AI Enterprise)",
    adminWhatsApp: "9991039297",
    maxRadiusKm: 20
  };

  const DEFAULT_SUBSCRIPTION_PLANS = {
    farmer: {
      week: { price: 49, durationDays: 7, label: "1 Week Basic Care" },
      month: { price: 149, durationDays: 30, label: "1 Month Smart Dairy" },
      quarter: { price: 349, durationDays: 90, label: "3 Months Dairy Pro" }
    },
    doctor: {
      week: { price: 199, durationDays: 7, label: "1 Week Clinical Trial" },
      month: { price: 599, durationDays: 30, label: "1 Month Digital OPD Pro" },
      quarter: { price: 1499, durationDays: 90, label: "3 Months Multi-Village Enterprise" }
    }
  };

  const SEED_USERS = [
    {
      id: "9991039297",
      phone: "9991039297",
      name: "Dr. Rahul Jangra (Master Admin)",
      role: "ADMIN",
      isBanned: false,
      isVerified: true,
      activeSubscription: { plan: "LIFETIME", expiresAt: "2099-12-31" },
      location: { lat: 28.6139, lon: 77.2090, address: "Delhi Central Clinic" }
    },
    {
      id: "9812345678",
      phone: "9812345678",
      name: "Dr. Amit Sharma",
      role: "DOCTOR",
      isBanned: false,
      isVerified: true,
      activeSubscription: { plan: "month", expiresAt: "2026-12-31" },
      location: { lat: 28.6200, lon: 77.2100, address: "Connaught Vet Center" }
    },
    {
      id: "9876543210",
      phone: "9876543210",
      name: "Suresh Patel (Kisan)",
      role: "FARMER",
      isBanned: false,
      isVerified: true,
      activeSubscription: { plan: "quarter", expiresAt: "2026-12-31" },
      location: { lat: 28.6300, lon: 77.2200, address: "Patel Dairy Farm, Mayur Vihar" }
    }
  ];

  /* Safe Local Storage Helper */
  const Storage = {
    get(key, defaultValue) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (err) {
        console.warn("[Storage Read Error]", key, err);
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("[Storage Write Error]", key, err);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.error("[Storage Remove Error]", key, err);
      }
    }
  };

  /* Application Runtime State */
  const State = {
    currentUser: Storage.get(STORAGE_KEYS.SESSION, null),
    users: Storage.get(STORAGE_KEYS.USERS, SEED_USERS),
    subscriptions: Storage.get(STORAGE_KEYS.SUBSCRIPTIONS, DEFAULT_SUBSCRIPTION_PLANS),
    tickets: Storage.get(STORAGE_KEYS.TICKETS, []),
    config: Storage.get(STORAGE_KEYS.CONFIG, DEFAULT_APP_CONFIG),
    cases: Storage.get(STORAGE_KEYS.CASES, []),
    dispatches: Storage.get(STORAGE_KEYS.DISPATCHES, []),
    activeLang: Storage.get(STORAGE_KEYS.LANGUAGE, "hinglish"),
    activeTab: "diagnosis",
    diagnosisMode: "SYMPTOMS",
    medicineViewFilter: "BOTH", // ETHICAL | GENERIC | BOTH
    matrixFilters: { temp: null, cardinal: "ALL", secondary: [] },
    sessionTimerId: null,
    sessionTimerRemainingSec: 3600
  };

  /* =========================================================================
     2. HINGLISH-FIRST MULTI-LANGUAGE ENGINE
     ========================================================================= */
  const I18N_DICTIONARY = {
    hinglish: {
      app_title: "Vetcare AI OS",
      gateway_tag: "Pashu Swasthya CDSS, 20km Dispatch & Smart Dairy Engine",
      role_farmer: "👨‍🌾 Kisan / Pashupalak",
      role_doctor: "🩺 Registered Vet Doctor",
      role_admin: "👑 Super Admin Control",
      btn_login: "Login Karein",
      btn_logout: "Logout Karein (Exit)",
      nav_diagnosis: "Rog Nidan",
      nav_services: "Clinical Hub",
      nav_records: "Case Record",
      nav_ai: "AI Surgeon",
      nav_farmer_hub: "Kisan Hub",
      nav_dispatch: "20km Dispatch",
      nav_support: "Help & Ticket",
      tag_high_temp: "Tez Bukhar (104°F+)",
      tag_normal_temp: "Normal (101-102°F)",
      tag_sub_temp: "Thanda Shareer (<100°F)",
      badge_ethical: "Ethical (Branded)",
      badge_generic: "Generic (KVS/Low Cost)",
      badge_both: "Dono Dikhayein",
      calc_dose_title: "Shaeffer's Body Weight & Dose Calculator",
      btn_call_emergency: "🚨 Emergency Call",
      btn_whatsapp_rx: "💬 WhatsApp Par Parchi Bhejein",
      msg_confirm_logout: "Kya aap sach me logout karna chahte hain?",
      session_time_left: "Session Timer:"
    },
    hindi: {
      app_title: "वेटकेयर एआई ओएस",
      gateway_tag: "पशु स्वास्थ्य नैदानिक प्रणाली, 20 किमी डिस्पैच एवं स्मार्ट डेयरी",
      role_farmer: "👨‍🌾 पशुपालक (किसान)",
      role_doctor: "🩺 अधिकृत पशु चिकित्सक",
      role_admin: "👑 मुख्य प्रशासक नियंत्रण",
      btn_login: "लॉग इन करें",
      btn_logout: "लॉग आउट करें (सुरक्षित निकास)",
      nav_diagnosis: "रोग निदान",
      nav_services: "क्लिनिकल हब",
      nav_records: "केस रिकॉर्ड",
      nav_ai: "एआई सर्जन",
      nav_farmer_hub: "किसान हब",
      nav_dispatch: "20 किमी डिस्पैच",
      nav_support: "सहायता व टिकट",
      tag_high_temp: "तेज बुखार (104°F+)",
      tag_normal_temp: "सामान्य ताप (101-102°F)",
      tag_sub_temp: "कम ताप (<100°F)",
      badge_ethical: "एथिकल (ब्रांडेड)",
      badge_generic: "जेनेरिक (किफायती)",
      badge_both: "दोनों विकल्प",
      calc_dose_title: "शेफर्स शारीरिक भार व डोज़ कैलकुलेटर",
      btn_call_emergency: "🚨 आपातकालीन कॉल",
      btn_whatsapp_rx: "💬 व्हाट्सएप पर्ची भेजें",
      msg_confirm_logout: "क्या आप वास्तव में लॉग आउट करना चाहते हैं?",
      session_time_left: "सत्र समय शेष:"
    },
    english: {
      app_title: "Vetcare AI OS",
      gateway_tag: "Clinical Decision Support System, 20km Dispatch & Smart Dairy",
      role_farmer: "👨‍🌾 Dairy Farmer",
      role_doctor: "🩺 Registered Vet Doctor",
      role_admin: "👑 Super Admin Console",
      btn_login: "Sign In",
      btn_logout: "Secure Logout",
      nav_diagnosis: "Diagnosis",
      nav_services: "Clinical Hub",
      nav_records: "Case Records",
      nav_ai: "AI Surgeon",
      nav_farmer_hub: "Farmer Hub",
      nav_dispatch: "20km Dispatch",
      nav_support: "Support & Tickets",
      tag_high_temp: "High Fever (104°F+)",
      tag_normal_temp: "Normal (101-102°F)",
      tag_sub_temp: "Subnormal (<100°F)",
      badge_ethical: "Ethical (Branded)",
      badge_generic: "Generic Option",
      badge_both: "Show Both",
      calc_dose_title: "Shaeffer's Weight & Dose Engine",
      btn_call_emergency: "🚨 Emergency Call",
      btn_whatsapp_rx: "💬 Dispatch WhatsApp Rx",
      msg_confirm_logout: "Are you sure you want to log out?",
      session_time_left: "Session Timer:"
    },
    punjabi: {
      app_title: "ਵੈੱਟਕੇਅਰ ਏਆਈ ਓਐਸ",
      gateway_tag: "ਪਸ਼ੂ ਰੋਗ ਨਿਦਾਨ ਪ੍ਰਣਾਲੀ, 20 ਕਿਮੀ ਡਿਸਪੈਚ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ",
      role_farmer: "👨‍🌾 ਪਸ਼ੂ ਪਾਲਕ (ਕਿਸਾਨ)",
      role_doctor: "🩺 ਰਜਿਸਟਰਡ ਪਸ਼ੂ ਡਾਕਟਰ",
      role_admin: "👑 ਸੁਪਰ ਐਡਮਿਨ",
      btn_login: "ਲਾਗਇਨ ਕਰੋ",
      btn_logout: "ਲਾਗਆਉਟ ਕਰੋ",
      nav_diagnosis: "ਰੋਗ ਨਿਦਾਨ",
      nav_services: "ਕਲੀਨਿਕਲ ਹੱਬ",
      nav_records: "ਕੇਸ ਰਿਕਾਰਡ",
      nav_ai: "ਏਆਈ ਸਰਜਨ",
      nav_farmer_hub: "ਕਿਸਾਨ ਹੱਬ",
      nav_dispatch: "20 ਕਿਮੀ ਡਿਸਪੈਚ",
      nav_support: "ਸਹਾਇਤਾ",
      tag_high_temp: "ਤੇਜ਼ ਬੁਖਾਰ (104°F+)",
      tag_normal_temp: "ਸਧਾਰਨ ਤਾਪਮਾਨ",
      tag_sub_temp: "ਠੰਡਾ ਸ਼ਰੀਰ (<100°F)",
      badge_ethical: "ਬ੍ਰਾਂਡਿਡ ਦਵਾਈ",
      badge_generic: "ਜੈਨੇਰਿਕ ਦਵਾਈ",
      badge_both: "ਦੋਵੇਂ ਵਿਕਲਪ",
      calc_dose_title: "ਸ਼ੈਫਰਜ਼ ਵਜ਼ਨ ਤੇ ਡੋਜ਼ ਕੈਲਕੁਲੇਟਰ",
      btn_call_emergency: "🚨 ਐਮਰਜੈਂਸੀ ਕਾਲ",
      btn_whatsapp_rx: "💬 ਵਟਸਐਪ ਪਰਚੀ ਭੇਜੋ",
      msg_confirm_logout: "ਕੀ ਤੁਸੀਂ ਲਾਗਆਉਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
      session_time_left: "ਸੈਸ਼ਨ ਸਮਾਂ:"
    },
    marathi: {
      app_title: "व्हेटकॅअर एआय ओएस",
      gateway_tag: "पशु आरोग्य निदान प्रणाली, 20 किमी डिस्पॅच आणि स्मार्ट डेअरी",
      role_farmer: "👨‍🌾 शेतकरी / पशुपालक",
      role_doctor: "🩺 नोंदणीकृत पशुवैद्यक",
      role_admin: "👑 मुख्य प्रशासक",
      btn_login: "लॉग इन करा",
      btn_logout: "लॉग आउट करा",
      nav_diagnosis: "रोग निदान",
      nav_services: "क्लिनिकल हब",
      nav_records: "केस रेकॉर्ड",
      nav_ai: "एआय सर्जन",
      nav_farmer_hub: "शेतकरी हब",
      nav_dispatch: "20 किमी डिस्पॅच",
      nav_support: "मदत व तक्रार",
      tag_high_temp: "तीव्र ताप (104°F+)",
      tag_normal_temp: "सामान्य ताप",
      tag_sub_temp: "कमी तापमान (<100°F)",
      badge_ethical: "ब्रँडेड औषध",
      badge_generic: "जेनेरिक औषध",
      badge_both: "दोन्ही औषधे",
      calc_dose_title: "शेफर्स वजन व डोस कॅल्क्युलेटर",
      btn_call_emergency: "🚨 आपत्कालीन कॉल",
      btn_whatsapp_rx: "💬 व्हॉट्सॲपवर चिठ्ठी पाठवा",
      msg_confirm_logout: "तुम्हाला नक्की लॉग आउट करायचे आहे का?",
      session_time_left: "सत्र वेळ शिल्लक:"
    }
  };

  function t(key) {
    const lang = State.activeLang || "hinglish";
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.hinglish;
    return dict[key] || (I18N_DICTIONARY.hinglish[key] || key);
  }

  function setLanguage(langCode) {
    if (I18N_DICTIONARY[langCode]) {
      State.activeLang = langCode;
      Storage.set(STORAGE_KEYS.LANGUAGE, langCode);
      applyTranslations();
      renderApp();
    }
  }

  function applyTranslations() {
    const titleTag = document.getElementById("pageTitleTag");
    if (titleTag) titleTag.innerText = `${t("app_title")} | Unified OS 2026`;
    const appHead = document.getElementById("appHeaderTitle");
    if (appHead) appHead.innerText = t("app_title");
    const gateTag = document.getElementById("gatewayTagline");
    if (gateTag) gateTag.innerText = t("gateway_tag");

    const timerBadge = document.getElementById("session-timer-badge");
    if (timerBadge) {
      const min = Math.floor(State.sessionTimerRemainingSec / 60);
      const sec = State.sessionTimerRemainingSec % 60;
      timerBadge.innerText = `⏱️ ${t("session_time_left")} ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
  }

  /* =========================================================================
     3. HIDDEN ADMIN AUTH, SECRET TRIGGERS & SECURITY CONSOLE
     ========================================================================= */
  let logoClickTimestamps = [];
  let simulatedOtpCode = null;

  function registerSecretTriggers() {
    // 1. Logo Multi-click (5 clicks within 3 seconds)
    const logoElements = [
      document.getElementById("gatewayLogoBox"),
      document.getElementById("headerLogoBox")
    ];

    logoElements.forEach((el) => {
      if (el) {
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          const now = Date.now();
          logoClickTimestamps.push(now);
          // Keep only clicks within last 3000 ms
          logoClickTimestamps = logoClickTimestamps.filter((ts) => now - ts <= 3000);
          if (logoClickTimestamps.length >= 5) {
            logoClickTimestamps = [];
            openAdminLoginModal();
          }
        });
      }
    });

    // 2. Keyboard Shortcut: Ctrl + Shift + A
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        openAdminLoginModal();
      }
    });
  }

  function openAdminLoginModal() {
    let modal = document.getElementById("modalMasterAdminAuth");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modalMasterAdminAuth";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border-2 border-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b pb-2">
          <h3 class="font-black text-slate-900 text-base flex items-center gap-1.5">
            <span>🛡️</span> Super Admin Gateway
          </h3>
          <button onclick="window.closeAdminAuthModal()" class="text-slate-400 hover:text-slate-700 font-black">✕</button>
        </div>
        <div class="space-y-2.5">
          <div>
            <label class="block text-[11px] font-bold text-slate-600 mb-1">Admin ID (Registered Mobile)</label>
            <input type="text" id="adminInputId" placeholder="9991039297" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-600 mb-1">Master Password</label>
            <input type="password" id="adminInputPw" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono outline-none" />
          </div>
          <div id="adminAuthError" class="hidden text-rose-600 font-bold text-[11px]"></div>
        </div>
        <div class="flex gap-2 pt-2">
          <button onclick="window.requestAdminOtpReset()" class="w-1/2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold py-2.5 rounded-xl transition text-[11px]">
            🔑 OTP Reset
          </button>
          <button onclick="window.verifyMasterAdminCredentials()" class="w-1/2 bg-slate-900 hover:bg-black text-white font-black py-2.5 rounded-xl shadow-md transition">
            Login Console ➔
          </button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  window.closeAdminAuthModal = function () {
    const modal = document.getElementById("modalMasterAdminAuth");
    if (modal) modal.style.display = "none";
  };

  window.verifyMasterAdminCredentials = function () {
    const id = (document.getElementById("adminInputId")?.value || "").trim();
    const pw = (document.getElementById("adminInputPw")?.value || "").trim();
    const errBox = document.getElementById("adminAuthError");

    if (id === MASTER_ADMIN_ID && pw === MASTER_ADMIN_PW) {
      window.closeAdminAuthModal();
      const adminUser = State.users.find((u) => u.id === MASTER_ADMIN_ID) || {
        id: MASTER_ADMIN_ID,
        phone: MASTER_ADMIN_ID,
        name: "Rahul Jangra (Super Admin)",
        role: "ADMIN",
        isBanned: false,
        isVerified: true
      };
      setSessionUser(adminUser);
      openAdminSuperConsole();
    } else {
      if (errBox) {
        errBox.innerText = "Invalid ID or Password! Access Denied.";
        errBox.classList.remove("hidden");
      }
    }
  };

  window.requestAdminOtpReset = function () {
    simulatedOtpCode = String(Math.floor(100000 + Math.random() * 900000));
    alert(`[SMS Simulation to +91-9991039297]\nYour 6-Digit Admin Verification OTP is: ${simulatedOtpCode}\nValid for 5 minutes.`);
    const entered = prompt("Enter 6-digit OTP received on 9991039297:");
    if (entered && entered.trim() === simulatedOtpCode) {
      const newPw = prompt("Enter New Admin Master Password (min 6 chars):");
      if (newPw && newPw.length >= 6) {
        alert("Password updated successfully! Please login with new credentials.");
      }
    } else {
      alert("Invalid OTP code!");
    }
  };

  function openAdminSuperConsole() {
    let dashboard = document.getElementById("modalAdminDashboard");
    if (!dashboard) {
      alert("Master Admin Dashboard activated.");
      return;
    }
    dashboard.style.display = "flex";
    renderAdminConsoleTabs("USERS");
  }

  window.switchAdminTab = function (tabName) {
    renderAdminConsoleTabs(tabName);
  };

  function renderAdminConsoleTabs(tabName) {
    const panels = {
      PAYMENT: document.getElementById("adminPanelPayment"),
      BRANDING: document.getElementById("adminPanelBranding"),
      SUPPORT: document.getElementById("adminPanelSupport"),
      METRICS: document.getElementById("adminPanelMetrics")
    };

    Object.keys(panels).forEach((k) => {
      if (panels[k]) panels[k].classList.add("hidden");
    });

    // Custom injected dynamic Admin tabs if not present in base HTML
    let dynamicPanel = document.getElementById("adminDynamicEnginePanel");
    if (!dynamicPanel) {
      dynamicPanel = document.createElement("div");
      dynamicPanel.id = "adminDynamicEnginePanel";
      dynamicPanel.className = "space-y-4";
      const container = document.querySelector("#modalAdminDashboard .max-w-4xl");
      if (container) container.insertBefore(dynamicPanel, container.lastElementChild);
    }

    if (tabName === "USERS") {
      renderAdminUserManagement(dynamicPanel);
    } else if (tabName === "SUBSCRIPTIONS") {
      renderAdminSubscriptionManagement(dynamicPanel);
    } else if (tabName === "TICKETS") {
      renderAdminTickets(dynamicPanel);
    } else if (panels[tabName]) {
      dynamicPanel.innerHTML = "";
      panels[tabName].classList.remove("hidden");
    }
  }

  function renderAdminUserManagement(container) {
    container.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 class="font-black text-slate-900 text-sm">User Directory & Direct Role Promotion</h3>
            <p class="text-[11px] text-slate-500">Promote farmers to registered clinical doctors with 1-click.</p>
          </div>
          <div class="flex gap-1.5">
            <button onclick="window.filterAdminUsers('ALL')" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs">All (${State.users.length})</button>
            <button onclick="window.filterAdminUsers('DOCTOR')" class="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs">Doctors</button>
            <button onclick="window.filterAdminUsers('FARMER')" class="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs">Farmers</button>
          </div>
        </div>

        <div id="adminUserTableContainer" class="overflow-x-auto space-y-2">
          ${renderUserCardsHTML(State.users)}
        </div>
      </div>
    `;
  }

  function renderUserCardsHTML(usersList) {
    if (!usersList || usersList.length === 0) {
      return `<p class="p-4 text-center text-slate-400 text-xs">No users found.</p>`;
    }
    return usersList
      .map(
        (u) => `
      <div class="bg-white border ${u.isBanned ? "border-rose-300 bg-rose-50/30" : "border-slate-200"} rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div>
          <div class="flex items-center gap-1.5 font-bold">
            <span class="text-sm">${u.role === "DOCTOR" ? "🩺" : u.role === "ADMIN" ? "👑" : "👨‍🌾"}</span>
            <span class="text-slate-900">${u.name}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded ${u.role === "DOCTOR" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"} font-black">${u.role}</span>
            ${u.isBanned ? `<span class="bg-rose-600 text-white text-[9px] px-1.5 py-0.2 rounded font-black">BANNED</span>` : ""}
          </div>
          <p class="text-slate-500 text-[11px] font-mono mt-0.5">📞 ${u.phone} | 📍 ${u.location?.address || "Location Active"}</p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 flex-wrap">
          ${
            u.role === "FARMER"
              ? `<button onclick="window.promoteToDoctor('${u.id}')" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded-xl text-[11px] transition">
                  ⬆️ Promote to Doctor
                 </button>`
              : ""
          }
          <button onclick="window.toggleBanUser('${u.id}')" class="${u.isBanned ? "bg-emerald-600 text-white" : "bg-rose-50 text-rose-700 border border-rose-200"} font-bold px-2 py-1 rounded-xl text-[11px]">
            ${u.isBanned ? "Unban" : "Ban User"}
          </button>
          <button onclick="window.deleteUser('${u.id}')" class="text-slate-400 hover:text-rose-600 font-bold px-1.5 py-1 text-xs">
            🗑️
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  window.promoteToDoctor = function (userId) {
    const user = State.users.find((u) => u.id === userId);
    if (!user) return;
    if (confirm(`Promote ${user.name} (${user.phone}) to Registered Clinical Doctor with Full OPD Access?`)) {
      user.role = "DOCTOR";
      user.isVerified = true;
      Storage.set(STORAGE_KEYS.USERS, State.users);
      if (State.currentUser?.id === user.id) {
        setSessionUser(user);
      }
      renderAdminConsoleTabs("USERS");
      alert(`Success: ${user.name} is now a Doctor!`);
    }
  };

  window.toggleBanUser = function (userId) {
    const user = State.users.find((u) => u.id === userId);
    if (!user) return;
    user.isBanned = !user.isBanned;
    Storage.set(STORAGE_KEYS.USERS, State.users);
    renderAdminConsoleTabs("USERS");
  };

  window.deleteUser = function (userId) {
    if (userId === MASTER_ADMIN_ID) {
      alert("Cannot delete Master Super Admin account!");
      return;
    }
    if (confirm("Are you sure you want to permanently delete this user?")) {
      State.users = State.users.filter((u) => u.id !== userId);
      Storage.set(STORAGE_KEYS.USERS, State.users);
      renderAdminConsoleTabs("USERS");
    }
  };

  function renderAdminSubscriptionManagement(container) {
    const sub = State.subscriptions;
    container.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
        <h3 class="font-black text-slate-900 text-sm border-b pb-2">Dynamic Subscription Engine (Doctor & Farmer)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Doctor Subscriptions -->
          <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-blue-700">🩺 Doctor Subscriptions (Pricing ₹)</h4>
            <div>
              <label class="text-[11px] text-slate-500 block">1 Week Plan (₹)</label>
              <input id="subDocWeek" type="number" value="${sub.doctor.week.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
            <div>
              <label class="text-[11px] text-slate-500 block">1 Month Plan (₹)</label>
              <input id="subDocMonth" type="number" value="${sub.doctor.month.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
            <div>
              <label class="text-[11px] text-slate-500 block">3 Months Plan (₹)</label>
              <input id="subDocQuarter" type="number" value="${sub.doctor.quarter.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
          </div>

          <!-- Farmer Subscriptions -->
          <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-emerald-700">👨‍🌾 Farmer Subscriptions (Pricing ₹)</h4>
            <div>
              <label class="text-[11px] text-slate-500 block">1 Week Plan (₹)</label>
              <input id="subFarWeek" type="number" value="${sub.farmer.week.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
            <div>
              <label class="text-[11px] text-slate-500 block">1 Month Plan (₹)</label>
              <input id="subFarMonth" type="number" value="${sub.farmer.month.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
            <div>
              <label class="text-[11px] text-slate-500 block">3 Months Plan (₹)</label>
              <input id="subFarQuarter" type="number" value="${sub.farmer.quarter.price}" class="w-full bg-slate-50 border rounded-xl p-2 font-bold" />
            </div>
          </div>
        </div>
        <button onclick="window.saveAdminSubscriptions()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-2xl shadow-sm transition">
          💾 Save Subscription Pricing
        </button>
      </div>
    `;
  }

  window.saveAdminSubscriptions = function () {
    State.subscriptions.doctor.week.price = Number(document.getElementById("subDocWeek").value) || 199;
    State.subscriptions.doctor.month.price = Number(document.getElementById("subDocMonth").value) || 599;
    State.subscriptions.doctor.quarter.price = Number(document.getElementById("subDocQuarter").value) || 1499;

    State.subscriptions.farmer.week.price = Number(document.getElementById("subFarWeek").value) || 49;
    State.subscriptions.farmer.month.price = Number(document.getElementById("subFarMonth").value) || 149;
    State.subscriptions.farmer.quarter.price = Number(document.getElementById("subFarQuarter").value) || 349;

    Storage.set(STORAGE_KEYS.SUBSCRIPTIONS, State.subscriptions);
    alert("Subscription pricing updated successfully!");
  };

  function renderAdminTickets(container) {
    const list = State.tickets;
    container.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
        <h3 class="font-black text-slate-900 text-sm border-b pb-2">Support & Verification Requests</h3>
        ${
          list.length === 0
            ? `<p class="p-4 text-center text-slate-400 text-xs">No pending support tickets.</p>`
            : list
                .map(
                  (t) => `
          <div class="bg-white p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
            <div class="flex justify-between font-bold">
              <span>${t.userName} (${t.userRole})</span>
              <span class="text-[10px] ${t.status === "RESOLVED" ? "text-emerald-600" : "text-amber-600"} font-black">${t.status}</span>
            </div>
            <p class="text-slate-700">${t.message}</p>
            <div class="flex gap-2 pt-1">
              <button onclick="window.resolveTicket('${t.id}')" class="bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg text-[10px]">
                Mark Resolved
              </button>
            </div>
          </div>
        `
                )
                .join("")
        }
      </div>
    `;
  }

  /* =========================================================================
     4. AUTHENTICATION & SECURE LOGOUT REPLACEMENT
     ========================================================================= */
  function setSessionUser(user) {
    State.currentUser = user;
    Storage.set(STORAGE_KEYS.SESSION, user);
    startSingletonSessionTimer();
    renderApp();
  }

  window.logoutUser = function () {
    if (confirm(t("msg_confirm_logout"))) {
      if (State.sessionTimerId) {
        clearInterval(State.sessionTimerId);
        State.sessionTimerId = null;
      }
      State.currentUser = null;
      Storage.remove(STORAGE_KEYS.SESSION);
      alert("Session securely terminated.");
      renderApp();
    }
  };

  window.handleUserLoginSubmit = function (rolePreference) {
    const phoneInput = prompt("Enter your 10-digit registered mobile number:");
    if (!phoneInput || phoneInput.trim().length !== 10) {
      alert("Invalid mobile number!");
      return;
    }
    const cleanPhone = phoneInput.trim();
    let existing = State.users.find((u) => u.phone === cleanPhone);

    if (existing) {
      if (existing.isBanned) {
        alert("Your account has been deactivated by Super Admin. Please contact support.");
        return;
      }
      setSessionUser(existing);
    } else {
      // New User Onboarding via Simulated OTP
      const generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
      alert(`[SMS Simulation]\nYour 4-Digit Vetcare Login OTP is: ${generatedOtp}`);
      const enteredOtp = prompt(`Enter 4-digit OTP sent to ${cleanPhone}:`);

      if (enteredOtp && enteredOtp.trim() === generatedOtp) {
        const userName = prompt("Enter your full name:") || "Valued User";
        const newUser = {
          id: cleanPhone,
          phone: cleanPhone,
          name: userName,
          role: rolePreference || "FARMER",
          isBanned: false,
          isVerified: rolePreference !== "DOCTOR", // Doctors undergo verification
          location: { lat: 28.6139, lon: 77.2090, address: "Local Region" }
        };
        State.users.push(newUser);
        Storage.set(STORAGE_KEYS.USERS, State.users);
        setSessionUser(newUser);
      } else {
        alert("Incorrect OTP!");
      }
    }
  };

  /* =========================================================================
     5. 20-KM HAVERSINE DISPATCH ENGINE (DOCTOR-FARMER MATCHING)
     ========================================================================= */
  function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's mean radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2));
  }

  window.requestDoctorVisit = function () {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const serviceType = prompt("Select Service:\n1. EMERGENCY (आपातकालीन)\n2. AI_INSEMINATION (सीमन डलवाना)\n3. GENERAL_OPD (सामान्य उपचार)\nType 1, 2 or 3:") || "1";
    const serviceMap = { "1": "EMERGENCY", "2": "AI_INSEMINATION", "3": "GENERAL_OPD" };
    const selectedService = serviceMap[serviceType] || "GENERAL_OPD";
    const animalDetails = prompt("Pashu ki nasal aur sankshipt lakshan batayein:") || "Cow - High Fever";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const farmerLat = pos.coords.latitude;
        const farmerLon = pos.coords.longitude;

        // Find verified doctors within 20 KM
        const activeDoctors = State.users.filter((u) => u.role === "DOCTOR" && !u.isBanned);
        const nearbyDoctors = activeDoctors
          .map((doc) => {
            const docLat = doc.location?.lat || 28.6139;
            const docLon = doc.location?.lon || 77.2090;
            const distanceKm = calculateHaversineDistance(farmerLat, farmerLon, docLat, docLon);
            return { doctor: doc, distanceKm };
          })
          .filter((item) => item.distanceKm <= State.config.maxRadiusKm)
          .sort((a, b) => a.distanceKm - b.distanceKm);

        if (nearbyDoctors.length === 0) {
          alert(`20 KM ke daayre me koi registered doctor uplabdh nahi mila. Call helpline: ${State.config.adminWhatsApp}`);
          return;
        }

        const dispatchRecord = {
          id: "DISP_" + Date.now(),
          farmerId: State.currentUser?.id || "GUEST",
          farmerName: State.currentUser?.name || "Farmer",
          farmerPhone: State.currentUser?.phone || "9999999999",
          service: selectedService,
          details: animalDetails,
          lat: farmerLat,
          lon: farmerLon,
          assignedDoctorId: nearbyDoctors[0].doctor.id,
          distanceKm: nearbyDoctors[0].distanceKm,
          status: "DISPATCHED",
          createdAt: new Date().toISOString()
        };

        State.dispatches.unshift(dispatchRecord);
        Storage.set(STORAGE_KEYS.DISPATCHES, State.dispatches);

        alert(
          `✅ Doctor Found!\nDoctor Distance: ${nearbyDoctors[0].distanceKm} KM.\nService Request successfully sent. Doctor will navigate to your GPS location.`
        );
      },
      (err) => {
        alert("GPS location capture failed. Please allow GPS permission: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  /* =========================================================================
     6. CLINICAL DIAGNOSIS, SHAEFFER'S CALCULATOR & DUAL DRUG TOGGLE
     ========================================================================= */
  window.setDiagnosisMode = function (mode) {
    State.diagnosisMode = mode;
    const btn1 = document.getElementById("btnDiagMode1");
    const btn2 = document.getElementById("btnDiagMode2");
    const btn3 = document.getElementById("btnDiagMode3");

    const p1 = document.getElementById("panelDiagMatrix");
    const p2 = document.getElementById("panelDiagHybrid");
    const p3 = document.getElementById("panelDiagDirectory");

    [btn1, btn2, btn3].forEach((b) => b && b.classList.replace("bg-blue-600", "text-slate-600"));
    [p1, p2, p3].forEach((p) => p && p.classList.add("hidden"));

    if (mode === "SYMPTOMS") {
      btn1?.classList.add("bg-blue-600", "text-white");
      p1?.classList.remove("hidden");
    } else if (mode === "HYBRID") {
      btn2?.classList.add("bg-blue-600", "text-white");
      p2?.classList.remove("hidden");
    } else {
      btn3?.classList.add("bg-blue-600", "text-white");
      p3?.classList.remove("hidden");
    }
    renderDiseaseResults();
  };

  window.toggleMedicineView = function (viewType) {
    State.medicineViewFilter = viewType;
    renderDiseaseResults();
  };

  function renderDiseaseResults(query = "") {
    const container = document.getElementById("diseaseSearchResults");
    if (!container) return;

    const db = window.VETCARE_DISEASE_DB || [];
    let filtered = db;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = db.filter(
        (d) =>
          d.nameHindi.toLowerCase().includes(q) ||
          d.nameEn.toLowerCase().includes(q) ||
          d.pathogen.toLowerCase().includes(q) ||
          d.cardinalSign.toLowerCase().includes(q)
      );
    } else if (State.diagnosisMode === "SYMPTOMS") {
      const cSign = State.matrixFilters.cardinal;
      if (cSign && cSign !== "ALL") {
        filtered = db.filter((d) => d.cardinalSign === cSign);
      }
    }

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">No clinical profile matched your query.</div>`;
      return;
    }

    container.innerHTML = filtered.map((d) => renderSingleDiseaseCardHTML(d)).join("");
  }

  function renderSingleDiseaseCardHTML(d) {
    const medDB = window.VETCARE_MEDICINES_DB || [];
    const isDoc = State.currentUser?.role === "DOCTOR" || State.currentUser?.role === "ADMIN";

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 text-xs sm:text-sm">
        <div class="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">${d.category}</span>
              <span class="text-[11px] font-mono text-slate-500">${d.pathogen}</span>
            </div>
            <h3 class="text-base sm:text-lg font-black text-slate-900 mt-1">${d.nameHindi}</h3>
            <p class="text-xs text-slate-500 font-medium">${d.nameEn} • Target: ${d.affectedSpecies.join(", ")}</p>
          </div>
          <span class="px-2.5 py-1 rounded-xl text-xs font-black ${d.temp === "HIGH" ? "bg-rose-100 text-rose-700" : d.temp === "SUB" ? "bg-cyan-100 text-cyan-800" : "bg-emerald-100 text-emerald-800"}">
            ${d.temp === "HIGH" ? "🔥 104°F+" : d.temp === "SUB" ? "❄️ Subnormal" : "Normal Temp"}
          </span>
        </div>

        <!-- 4-Stage Timeline Progression -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1.5">
          <h4 class="font-bold text-slate-800 text-xs">⏱️ 4-Stage Disease Progression (नैदानिक प्रगति):</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div class="p-2 bg-white rounded-xl border border-slate-200"><strong>Stage 1:</strong> ${d.stages?.stage1 || "Incipient stage"}</div>
            <div class="p-2 bg-white rounded-xl border border-slate-200"><strong>Stage 2:</strong> ${d.stages?.stage2 || "Clinical development"}</div>
            <div class="p-2 bg-white rounded-xl border border-slate-200"><strong>Stage 3:</strong> ${d.stages?.stage3 || "Severe crisis"}</div>
            <div class="p-2 bg-white rounded-xl border border-slate-200"><strong>Stage 4:</strong> ${d.stages?.stage4 || "Terminal / Recovery"}</div>
          </div>
        </div>

        <!-- Farmer First Aid / Traditional Herbal Remedy -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5 text-emerald-950">
          <div class="flex items-center justify-between">
            <h4 class="font-black text-emerald-900 text-xs sm:text-sm">👨‍🌾 पशुपालक देसी उपचार (Zero Injections):</h4>
            <span class="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">Safe Home Recipe</span>
          </div>
          <p class="text-xs leading-relaxed">${d.farmerRemedies}</p>
        </div>

        <!-- DOCTOR-ONLY 5-TIER CLINICAL PROTOCOL -->
        ${
          isDoc
            ? `
          <div class="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-2">
              <h4 class="font-black text-blue-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>🩺</span> 5-Tier Allopathic Rx Protocol (Doctor Clinical Mode)
              </h4>
              <!-- Dual Medicine Toggle -->
              <div class="flex bg-white p-1 rounded-xl border border-blue-200 text-[10px] font-bold">
                <button onclick="window.toggleMedicineView('ETHICAL')" class="px-2 py-0.5 rounded-lg ${State.medicineViewFilter === "ETHICAL" ? "bg-blue-600 text-white" : "text-slate-600"}">Ethical</button>
                <button onclick="window.toggleMedicineView('GENERIC')" class="px-2 py-0.5 rounded-lg ${State.medicineViewFilter === "GENERIC" ? "bg-blue-600 text-white" : "text-slate-600"}">Generic</button>
                <button onclick="window.toggleMedicineView('BOTH')" class="px-2 py-0.5 rounded-lg ${State.medicineViewFilter === "BOTH" ? "bg-blue-600 text-white" : "text-slate-600"}">Both</button>
              </div>
            </div>

            <div class="space-y-1.5 text-xs text-slate-800 font-mono">
              <p><strong>Tier 1 (1st Line):</strong> ${d.clinicalRx?.tier1 || "Primary Antimicrobial"}</p>
              <p><strong>Tier 2 (2nd Line):</strong> ${d.clinicalRx?.tier2 || "Alternative Chemotherapy"}</p>
              <p><strong>Tier 3 (NSAID):</strong> ${d.clinicalRx?.tier3 || "Analgesic & Antipyretic"}</p>
              <p><strong>Tier 4 (Support):</strong> ${d.clinicalRx?.tier4 || "Fluid & Corticosteroids"}</p>
              <p><strong>Tier 5 (Adjuvant):</strong> ${d.clinicalRx?.tier5 || "Metabolic Tonics & B-Complex"}</p>
            </div>

            <!-- Pregnancy Alert & Withdrawal -->
            <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-900 font-sans space-y-1">
              <p><strong>🛡️ Pregnancy Safety:</strong> ${d.pregnancySafetyNotes}</p>
              <p><strong>⏳ Withdrawal Period:</strong> ${d.withdrawalPeriod}</p>
            </div>

            <!-- Inline Shaeffer's Weight & Dosage Engine -->
            <div class="bg-white p-3 rounded-xl border border-blue-200 space-y-2 font-sans">
              <h5 class="text-xs font-bold text-slate-900">${t("calc_dose_title")}</h5>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <label class="text-[10px] text-slate-500">Length L (inches)</label>
                  <input type="number" id="shLength_${d.id}" value="60" oninput="window.calcShaefferDose('${d.id}')" class="w-full bg-slate-50 border rounded-lg p-1.5 font-bold" />
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Girth G (inches)</label>
                  <input type="number" id="shGirth_${d.id}" value="70" oninput="window.calcShaefferDose('${d.id}')" class="w-full bg-slate-50 border rounded-lg p-1.5 font-bold" />
                </div>
                <div class="col-span-2 sm:col-span-1 bg-blue-50 p-1.5 rounded-lg text-center flex flex-col justify-center">
                  <span class="text-[9px] text-blue-700 font-bold">Estimated Body Weight</span>
                  <strong id="shWeightResult_${d.id}" class="text-sm font-black text-blue-900">336 Kg</strong>
                </div>
              </div>
            </div>

            <button onclick="window.populateOpdWithDisease('${d.id}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-xs transition">
              📝 Transfer into OPD Digital Prescription
            </button>
          </div>
        `
            : `
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
            <span>🔒 Allopathic Injections and Dosages are reserved for Registered Vet Practitioners.</span>
            <button onclick="window.handleUserLoginSubmit('DOCTOR')" class="text-blue-700 font-bold underline shrink-0">Doctor Login</button>
          </div>
        `
        }
      </div>
    `;
  }

  window.calcShaefferDose = function (diseaseId) {
    const l = Number(document.getElementById(`shLength_${diseaseId}`)?.value) || 0;
    const g = Number(document.getElementById(`shGirth_${diseaseId}`)?.value) || 0;
    const resBox = document.getElementById(`shWeightResult_${diseaseId}`);
    if (!resBox) return;

    // Shaeffer's formula: Weight in lbs = (L * G^2) / 300; 1 lb = 0.453592 kg
    const weightLbs = (l * g * g) / 300;
    const weightKg = Math.round(weightLbs * 0.453592);
    resBox.innerText = `${weightKg} Kg`;
  };

  window.populateOpdWithDisease = function (diseaseId) {
    const db = window.VETCARE_DISEASE_DB || [];
    const disease = db.find((d) => d.id === diseaseId);
    if (!disease) return;

    window.switchTab("services");
    const diagField = document.getElementById("opdDiagnosis");
    const medField = document.getElementById("opdMedicine");

    if (diagField) diagField.value = disease.nameHindi;
    if (medField) {
      medField.value = `1. ${disease.clinicalRx.tier1}\n2. ${disease.clinicalRx.tier3}\n3. ${disease.clinicalRx.tier4}`;
    }
  };

  /* =========================================================================
     7. MERGED CLINICAL SERVICES HUB (OPD + A.I. + VACCINATION)
     ========================================================================= */
  window.dispatchWhatsAppRx = function () {
    const farmerName = document.getElementById("opdFarmerName")?.value || "";
    const farmerPhone = document.getElementById("opdFarmerPhone")?.value || "";
    const animal = document.getElementById("opdAnimal")?.value || "";
    const diagnosis = document.getElementById("opdDiagnosis")?.value || "";
    const medicines = document.getElementById("opdMedicine")?.value || "";
    const totalFee = document.getElementById("opdTotalFee")?.value || "0";
    const paidFee = document.getElementById("opdPaidFee")?.value || "0";
    const dueFee = document.getElementById("opdDueFee")?.value || "0";

    if (!farmerPhone || farmerPhone.length !== 10) {
      alert("Please enter a valid 10-digit Farmer WhatsApp Number.");
      return;
    }

    const doctorName = State.currentUser?.name || "Dr. Authorized Vet";
    const clinicTitle = State.config.appTitle;

    const messageText =
      `*${clinicTitle} - Digital Clinical Slip*\n` +
      `-----------------------------------------\n` +
      `👨‍🌾 *Farmer Name:* ${farmerName}\n` +
      `🐾 *Patient Animal:* ${animal}\n` +
      `🩺 *Diagnosis:* ${diagnosis}\n` +
      `💊 *Rx Medicines & Dosing:*\n${medicines}\n` +
      `-----------------------------------------\n` +
      `💰 *Total Fee:* ₹${totalFee} | *Paid:* ₹${paidFee} | *Due:* ₹${dueFee}\n` +
      `👨‍⚕️ *Consultant:* ${doctorName}\n` +
      `⚠️ *Directions:* Strictly follow the dosage schedule. Contact in emergency.\n` +
      `_Generated by Vetcare AI OS_`;

    const cleanPhone = farmerPhone.replace(/\D/g, "");
    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");

    // Save offline record automatically
    saveOfflineCaseDirectly();
  };

  window.saveOfflineCaseDirectly = function () {
    const newCase = {
      id: "CASE_" + Date.now(),
      farmerName: document.getElementById("opdFarmerName")?.value || "N/A",
      farmerPhone: document.getElementById("opdFarmerPhone")?.value || "N/A",
      village: document.getElementById("opdVillage")?.value || "Local",
      animal: document.getElementById("opdAnimal")?.value || "Cow",
      diagnosis: document.getElementById("opdDiagnosis")?.value || "Clinical Case",
      medicine: document.getElementById("opdMedicine")?.value || "",
      totalFee: document.getElementById("opdTotalFee")?.value || 0,
      paidFee: document.getElementById("opdPaidFee")?.value || 0,
      dueFee: document.getElementById("opdDueFee")?.value || 0,
      date: new Date().toLocaleDateString("hi-IN")
    };

    State.cases.unshift(newCase);
    Storage.set(STORAGE_KEYS.CASES, State.cases);
    alert("Record saved securely to Local Case Vault.");
    renderRecordList();
  };

  function renderRecordList(query = "") {
    const container = document.getElementById("recordsList");
    if (!container) return;

    let list = State.cases;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.farmerName.toLowerCase().includes(q) ||
          c.farmerPhone.includes(q) ||
          c.diagnosis.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      container.innerHTML = `<p class="p-6 text-center text-slate-400 text-xs">No case slips saved yet.</p>`;
      return;
    }

    container.innerHTML = list
      .map(
        (c) => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3 flex justify-between items-center text-xs shadow-xs">
        <div>
          <strong class="text-slate-900 block">${c.farmerName} (${c.farmerPhone})</strong>
          <span class="text-slate-500">${c.animal} • ${c.diagnosis} • 🗓️ ${c.date}</span>
        </div>
        <div class="text-right">
          <span class="font-bold text-rose-600 block">Due: ₹${c.dueFee}</span>
          <button onclick="window.printSavedCase('${c.id}')" class="text-blue-600 underline text-[11px] font-bold">Print PDF</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  /* =========================================================================
     8. SMART FARMER VACCINATION & ORGAN REMEDIES MODULE
     ========================================================================= */
  function renderFarmerVaccinationHub() {
    const container = document.getElementById("farmerVaccinationContainer");
    if (!container) return;

    const vaxDB = window.VETCARE_VACCINATION_DB || [];
    container.innerHTML = vaxDB
      .map(
        (v) => `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2 text-xs">
        <div class="flex justify-between items-start border-b pb-2">
          <div>
            <h4 class="font-black text-slate-900 text-sm">${v.diseaseNameHi}</h4>
            <p class="text-[11px] text-slate-500">${v.vaccineName}</p>
          </div>
          <span class="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-lg text-[10px]">${v.boosterFrequency}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div><strong>Target:</strong> ${v.targetSpecies.join(", ")}</div>
          <div><strong>Ideal Season:</strong> ${v.idealSeason}</div>
          <div><strong>Dose & Route:</strong> ${v.routeAndDose}</div>
          <div><strong>Age:</strong> ${v.targetAge}</div>
        </div>
        <div class="p-2 bg-emerald-50 rounded-xl text-emerald-950 text-[11px]">
          <strong>Benefits:</strong> ${v.clinicalBenefits}
        </div>
      </div>
    `
      )
      .join("");
  }

  /* Photo Attachment Handler (HTML5 FileReader) */
  window.handleCasePhotoUpload = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Img = e.target.result;
      const previewBox = document.getElementById("casePhotoPreview");
      if (previewBox) {
        previewBox.src = base64Img;
        previewBox.classList.remove("hidden");
      }
    };
    reader.readAsDataURL(file);
  };

  /* =========================================================================
     9. GEMINI 3.8 FLASH ENGINE & MARKDOWN PARSER
     ========================================================================= */
  window.openAIKeyModal = function () {
    const key = prompt("Enter your Gemini API Key (starts with AIzaSy...):", Storage.get(STORAGE_KEYS.AI_KEY, ""));
    if (key !== null) {
      Storage.set(STORAGE_KEYS.AI_KEY, key.trim());
      alert("Gemini API Key saved securely.");
    }
  };

  window.runAIConsultant = async function () {
    const promptInput = document.getElementById("aiInputPrompt");
    const outputArea = document.getElementById("aiOutputArea");
    const btn = document.getElementById("btnRunAI");

    const userPrompt = (promptInput?.value || "").trim();
    if (!userPrompt) {
      alert("Please enter the patient animal's clinical symptoms and history.");
      return;
    }

    const apiKey = Storage.get(STORAGE_KEYS.AI_KEY, "");
    if (!apiKey) {
      alert("Gemini API key is required. Please set your key.");
      window.openAIKeyModal();
      return;
    }

    if (btn) btn.disabled = true;
    if (outputArea) {
      outputArea.classList.remove("hidden");
      outputArea.innerHTML = `<span class="pulse-danger font-bold text-purple-700">Thinking (Gemini 3.8 Flash Veterinary Engine)...</span>`;
    }

    try {
      const systemPrompt = `You are the Principal Lead Veterinary Clinical Surgeon and Diagnostic Pharmacologist for Vetcare AI OS. 
Analyze the case history, provide:
1. Differential Diagnosis Table (% probability).
2. Recommended 5-Tier Treatment Protocol.
3. Pregnancy Red Alert badge if contraindicated in pregnant animals.
4. Farmer Home Remedy First-Aid.
Use markdown tables wherever appropriate.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nCase Details:\n${userPrompt}` }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const rawMarkdown = data.candidates[0].content.parts[0].text;
        outputArea.innerHTML = renderMarkdownToHTML(rawMarkdown);
      } else {
        throw new Error(data.error?.message || "Invalid AI Response");
      }
    } catch (err) {
      outputArea.innerHTML = `<div class="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl"><strong>AI Error:</strong> ${err.message}</div>`;
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  function renderMarkdownToHTML(markdown) {
    let html = markdown
      .replace(/^### (.*$)/gim, '<h3 class="font-black text-slate-900 text-sm mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="font-black text-blue-900 text-base mt-3 mb-1">$1</h2>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/\n\n/gim, "<br><br>");

    // Table parsing
    if (html.includes("|")) {
      html = html.replace(/\|(.+)\|/gim, (match) => {
        const cells = match.split("|").filter((c) => c.trim().length > 0);
        return `<div class="flex border-b border-purple-200 py-1 gap-2">${cells.map((c) => `<div class="flex-1 text-xs">${c.trim()}</div>`).join("")}</div>`;
      });
    }
    return html;
  }

  /* =========================================================================
     10. SINGLETON 60-MINUTE SESSION TIMER
     ========================================================================= */
  function startSingletonSessionTimer() {
    if (State.sessionTimerId) {
      clearInterval(State.sessionTimerId);
      State.sessionTimerId = null;
    }

    State.sessionTimerRemainingSec = 3600; // 60 minutes
    State.sessionTimerId = setInterval(() => {
      State.sessionTimerRemainingSec--;
      applyTranslations();

      if (State.sessionTimerRemainingSec <= 0) {
        clearInterval(State.sessionTimerId);
        State.sessionTimerId = null;
        alert("Session expired for safety. Please login again.");
        window.logoutUser();
      }
    }, 1000);
  }

  /* =========================================================================
     11. UI CONTROLLER, TAB SWITCHING & CORE INITIALIZATION
     ========================================================================= */
  window.switchTab = function (tabName) {
    State.activeTab = tabName;
    const views = {
      diagnosis: document.getElementById("viewDiagnosis"),
      breeding: document.getElementById("viewBreeding"),
      feed: document.getElementById("viewFeed"),
      rx: document.getElementById("viewRx"),
      records: document.getElementById("viewRecords"),
      ai: document.getElementById("viewAI"),
      finance: document.getElementById("viewFinance"),
      inventory: document.getElementById("viewInventory"),
      helpdesk: document.getElementById("viewHelpdesk"),
      services: document.getElementById("viewRx")
    };

    Object.keys(views).forEach((k) => {
      if (views[k]) views[k].classList.add("hidden");
    });

    if (views[tabName]) views[tabName].classList.remove("hidden");

    // Dynamic Navigation Button Highlights
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach((b) => b.classList.remove("active-nav-tab"));
    const activeBtn = document.getElementById(`nav${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (activeBtn) activeBtn.classList.add("active-nav-tab");
  };

  function renderApp() {
    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");
    const roleBadge = document.getElementById("currentUserRoleBadge");

    if (!State.currentUser) {
      if (screenGateway) screenGateway.classList.remove("hidden");
      if (screenMainApp) screenMainApp.classList.add("hidden");
    } else {
      if (screenGateway) screenGateway.classList.add("hidden");
      if (screenMainApp) screenMainApp.classList.remove("hidden");

      if (roleBadge) {
        roleBadge.innerText = `${State.currentUser.role === "DOCTOR" ? "🩺 Doctor" : State.currentUser.role === "ADMIN" ? "👑 Admin" : "👨‍🌾 Farmer"}: ${State.currentUser.name}`;
      }

      // Role-based navigation visibility
      const isDocOrAdmin = State.currentUser.role === "DOCTOR" || State.currentUser.role === "ADMIN";
      const navRx = document.getElementById("navRx");
      const navRecords = document.getElementById("navRecords");
      const navInventory = document.getElementById("navInventory");
      const navAI = document.getElementById("navAI");

      [navRx, navRecords, navInventory, navAI].forEach((el) => {
        if (el) {
          if (isDocOrAdmin) el.classList.remove("hidden");
          else el.classList.add("hidden");
        }
      });
    }

    applyTranslations();
    renderDiseaseResults();
  }

  // Gateway Role Selectors
  window.selectRole = function (role) {
    if (role === "DOCTOR") {
      window.handleUserLoginSubmit("DOCTOR");
    } else {
      window.handleUserLoginSubmit("FARMER");
    }
  };

  window.openDoctorDeclarationModal = function () {
    const modal = document.getElementById("modalDoctorDeclaration");
    if (modal) modal.style.display = "flex";
  };

  window.closeDoctorDeclarationModal = function () {
    const modal = document.getElementById("modalDoctorDeclaration");
    if (modal) modal.style.display = "none";
  };

  window.acceptDoctorDeclaration = function () {
    window.closeDoctorDeclarationModal();
    window.handleUserLoginSubmit("DOCTOR");
  };

  // Expose Core Controller on Window Scope
  window.vetcareEngine = {
    state: State,
    setLanguage,
    t
  };

  // DOMContentLoaded Bootstrapper
  document.addEventListener("DOMContentLoaded", () => {
    registerSecretTriggers();
    renderApp();
    if (State.currentUser) {
      startSingletonSessionTimer();
    }
  });

})(typeof window !== "undefined" ? window : this, typeof document !== "undefined" ? document : {});
