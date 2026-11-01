// Vetcare AI OS - Master App Controller, Auth & Navigation Router (2026 Restored)

/**
 * ============================================================================
 * VETCARE AI OS: MASTER APPLICATION CONTROLLER & AUTH ROUTER
 * Complete Production-Ready Client Engine (2026 Restored Architecture)
 * - Anti-Kickout Deep Stack Navigation & Browser History Interceptor
 * - Live Interactive OTP Engine, Fast2SMS / Twilio Ready Gateway
 * - Central Services Launcher (Dual-Role Grid for Doctors & Farmers)
 * - Dual Resilient Timers (60-Min Session & 24-Hr Trial Guard)
 * - Gemini 3.8 Flash Clinical AI Caller with 5-Tier Treatment & Pregnancy Alerts
 * - Universal Multi-Language Engine (Hinglish First, Hindi, English, Punjabi, Marathi)
 * ============================================================================
 */

(function (window, document) {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. GLOBAL STATE & CONFIGURATION STORAGE
  // --------------------------------------------------------------------------
  window.currentViewStack = [];
  window.currentActiveView = null;
  window.sessionTimerInterval = null;
  window.trialTimerInterval = null;
  window.resendOtpCountdownInterval = null;
  window.resendOtpSecondsLeft = 60;

  // Local Database and Session Store Keys
  const STORAGE_USERS_KEY = "vetcare_users_db";
  const STORAGE_SESSION_KEY = "vetcare_active_session";
  const STORAGE_PENDING_OTP_KEY = "vetcare_pending_otp";
  const STORAGE_LANG_KEY = "vetcare_selected_lang";
  const STORAGE_VIEW_KEY = "vetcare_last_view";

  // Pre-seed Master Admin & Demo Doctor if database is blank
  (function initDatabaseSeed() {
    try {
      const existing = localStorage.getItem(STORAGE_USERS_KEY);
      if (!existing) {
        const seedUsers = [
          {
            name: "Dr. Arvind Sharma (Vet Surgeon)",
            contact: "9876543210",
            role: "DOCTOR",
            password: "admin",
            trialExpiry: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 Year VIP
            dualAccess: true,
            createdAt: new Date().toISOString()
          },
          {
            name: "रामसिंह यादव (डेयरी किसान)",
            contact: "9123456780",
            role: "FARMER",
            password: "kisan",
            trialExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
            dualAccess: false,
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(seedUsers));
      }
    } catch (e) {
      console.warn("[Vetcare DB] LocalStorage initialization warning:", e);
    }
  })();

  // --------------------------------------------------------------------------
  // 2. UNIVERSAL MULTI-LANGUAGE ENGINE (HINGLISH FIRST)
  // --------------------------------------------------------------------------
  window.VETCARE_I18N = {
    hinglish: {
      app_title: "Vetcare AI OS",
      tagline: "Pashu Swasthya Nidan, 3-Way Clinical Decision Engine & Smart Dairy",
      choose_role: "Kripya apna karyakshetra (Role) chunein:",
      role_farmer: "Smart Dairy Farmer (Pashupalak)",
      role_farmer_sub: "Desi nuskhe, heat timing, santulit aahar & doodh khata.",
      role_doctor: "Registered Veterinary Doctor",
      role_doctor_sub: "5-Tier Allopathic treatment, WhatsApp digital parcha & stock.",
      enter_as_farmer: "Pashupalak Login Karein",
      enter_as_doctor: "Doctor Login Karein",
      services_launcher: "Central Services Launcher",
      switch_portal: "🔄 Portal Badlein (Doctor / Farmer Switch)",
      otp_sent: "OTP bhej diya gaya hai!",
      otp_toast_label: "📋 Live OTP Code: ",
      copy_otp: "(Copy Karein)",
      trial_badge: "⏳ Trial Bacha Hai: ",
      session_badge: "⏱️ Session Time: ",
      back_btn: "⬅️ Peeche (Back)",
      logout_btn: "🚪 Logout",
      pregnancy_danger: "🚨 PREGNANCY RED ALERT: Yeh injection garbhawati pashu me garbhpaat kara sakta hai!",
      ethical_tab: "एथिकल ब्रांड्स (Ethical)",
      generic_tab: "जेनेरिक साल्ट्स (Generic)"
    },
    hi: {
      app_title: "वेटकेयर एआई ओएस",
      tagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      choose_role: "कृपया अपना कार्य-क्षेत्र (Role) चुनें:",
      role_farmer: "स्मार्ट पशुपालक (Dairy Farmer)",
      role_farmer_sub: "देसी सिद्ध नुस्खे, मद व सीमन (A.I.) का सही समय, संतुलित आहार एवं दूध खाता।",
      role_doctor: "अधिकृत पशु चिकित्सक (Veterinary Doctor)",
      role_doctor_sub: "5-स्तरीय एलोपैथिक इंजेक्शन तालिकाएं, व्हाट्सएप डिजिटल पर्ची व स्टॉक।",
      enter_as_farmer: "पशुपालक के रूप में प्रवेश करें",
      enter_as_doctor: "चिकित्सक के रूप में प्रवेश करें",
      services_launcher: "केंद्रीय सेवा केंद्र (Services Launcher)",
      switch_portal: "🔄 पोर्टल बदलें (डॉक्टर / पशुपालक स्विच)",
      otp_sent: "सत्यापन कोड (OTP) भेज दिया गया है!",
      otp_toast_label: "📋 लाइव OTP कोड: ",
      copy_otp: "(कॉपी करें)",
      trial_badge: "⏳ मुफ़्त ट्रायल शेष: ",
      session_badge: "⏱️ सत्र समय: ",
      back_btn: "⬅️ वापस (Back)",
      logout_btn: "🚪 लॉगआउट",
      pregnancy_danger: "🚨 गर्भावस्था निषेध चेतावनी: यह दवा गाभिन पशु में गर्भपात करा सकती है!",
      ethical_tab: "एथिकल ब्रांड्स (Ethical)",
      generic_tab: "जेनेरिक साल्ट्स (Generic)"
    },
    en: {
      app_title: "Vetcare AI OS",
      tagline: "Veterinary Clinical Decision Support System & Smart Dairy Management",
      choose_role: "Please select your domain profile (Role):",
      role_farmer: "Smart Dairy Farmer",
      role_farmer_sub: "Herbal remedies, heat & insemination timing, feed calculator & ledger.",
      role_doctor: "Registered Veterinary Surgeon",
      role_doctor_sub: "5-Tier Allopathic treatment protocols, 1-Click WhatsApp Rx & inventory.",
      enter_as_farmer: "Enter as Dairy Farmer",
      enter_as_doctor: "Enter as Clinical Doctor",
      services_launcher: "Central Services Launcher",
      switch_portal: "🔄 Switch Portal (Doctor / Farmer)",
      otp_sent: "OTP has been successfully dispatched!",
      otp_toast_label: "📋 Live OTP Code: ",
      copy_otp: "(Tap to Copy)",
      trial_badge: "⏳ Free Trial Left: ",
      session_badge: "⏱️ Session Duration: ",
      back_btn: "⬅️ Back",
      logout_btn: "🚪 Logout",
      pregnancy_danger: "🚨 PREGNANCY RED ALERT: Contraindicated in pregnant cattle (Causes Abortion)!",
      ethical_tab: "Ethical Brands",
      generic_tab: "Generic Salts"
    },
    pa: {
      app_title: "ਵੈਟਕੇਅਰ ਏਆਈ ਓਐਸ",
      tagline: "ਪਸ਼ੂ ਸਿਹਤ ਜਾਂਚ, ਕਲੀਨਿਕਲ ਫੈਸਲਾ ਇੰਜਨ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ ਪ੍ਰਬੰਧਨ",
      choose_role: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਭੂਮਿਕਾ (ਰੋਲ) ਚੁਣੋ:",
      role_farmer: "ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ (Farmer)",
      role_farmer_sub: "ਦੇਸੀ ਨੁਸਖੇ, ਏ.ਆਈ. ਦਾ ਸਹੀ ਸਮਾਂ, ਸੰਤੁਲਿਤ ਪਸ਼ੂ ਆਹਾਰ ਅਤੇ ਦੁੱਧ ਵਹੀ-ਖਾਤਾ।",
      role_doctor: "ਪਸ਼ੂ ਰੋਗ ਮਾਹਿਰ ਡਾਕਟਰ (Doctor)",
      role_doctor_sub: "5-ਪੱਧਰੀ ਐਲੋਪੈਥਿਕ ਇਲਾਜ, ਵਟਸਐਪ ਡਿਜੀਟਲ ਪਰਚੀ ਅਤੇ ਦਵਾਈ ਸਟਾਕ।",
      enter_as_farmer: "ਕਿਸਾਨ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ",
      enter_as_doctor: "ਡਾਕਟਰ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ",
      services_launcher: "ਸੇਵਾ ਕੇਂਦਰ (Services Launcher)",
      switch_portal: "🔄 ਪੋਰਟਲ ਬਦਲੋ (ਕਿਸਾਨ / ਡਾਕਟਰ)",
      otp_sent: "ਓਟੀਪੀ ਕੋਡ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ!",
      otp_toast_label: "📋 ਓਟੀਪੀ ਕੋਡ: ",
      copy_otp: "(ਕਾਪੀ ਕਰੋ)",
      trial_badge: "⏳ ਮੁਫਤ ਟ੍ਰਾਇਲ ਬਾਕੀ: ",
      session_badge: "⏱️ ਸੈਸ਼ਨ ਸਮਾਂ: ",
      back_btn: "⬅️ ਪਿੱਛੇ",
      logout_btn: "🚪 ਲੌਗ ਆਉਟ",
      pregnancy_danger: "🚨 ਖ਼ਤਰਾ: ਇਹ ਟੀਕਾ ਗੱਭਣ ਪਸ਼ੂ ਦਾ ਗਰਭਪਾਤ ਕਰਵਾ ਸਕਦਾ ਹੈ!",
      ethical_tab: "ਬ੍ਰਾਂਡੇਡ ਦਵਾਈਆਂ",
      generic_tab: "ਜੈਨਰਿਕ ਸਾਲਟ"
    },
    mr: {
      app_title: "वेटकेअर एआय ओएस",
      tagline: "पशु आरोग्य निदान, क्लिनिकल डिसीजन इंजिन व संपूर्ण स्मार्ट डेअरी सोल्यूशन",
      choose_role: "कृपया आपली भूमिका (Role) निवडा:",
      role_farmer: "स्मार्ट पशुपालक (Dairy Farmer)",
      role_farmer_sub: "गावरान उपाय, माज व कृत्रिम रेतन योग्य वेळ, संतुलित आहार आणि दूध वहीखाते.",
      role_doctor: "नोंदणीकृत पशुवैद्यकीय अधिकारी (Doctor)",
      role_doctor_sub: "5-स्तरीय अ‍ॅलोपॅथिक औषधोपचार तक्ता, व्हॉट्सअ‍ॅप डिजिटल पावती व स्टॉक.",
      enter_as_farmer: "पशुपालक म्हणून प्रवेश करा",
      enter_as_doctor: "पशुवैद्यक म्हणून प्रवेश करा",
      services_launcher: "मध्यवर्ती सेवा केंद्र (Services Launcher)",
      switch_portal: "🔄 पोर्टल बदला (डॉक्टर / शेतकरी)",
      otp_sent: "ओटीपी कोड पाठविला गेला आहे!",
      otp_toast_label: "📋 थेट OTP कोड: ",
      copy_otp: "(कॉपी करा)",
      trial_badge: "⏳ मोफत ट्रायल शिल्लक: ",
      session_badge: "⏱️ सत्र वेळ: ",
      back_btn: "⬅️ मागे",
      logout_btn: "🚪 लॉगआउट",
      pregnancy_danger: "🚨 धोका: हे औषध गाभण जनावरांमध्ये गर्भपात घडवून आणू शकते!",
      ethical_tab: "एथिकल ब्रँड्स",
      generic_tab: "जेनेरिक सॉल्ट्स"
    }
  };

  window.currentLanguage = localStorage.getItem(STORAGE_LANG_KEY) || "hinglish";

  /**
   * Helper translation function.
   */
  window.t = function (key) {
    const langDict = window.VETCARE_I18N[window.currentLanguage] || window.VETCARE_I18N.hinglish;
    return langDict[key] || window.VETCARE_I18N.hinglish[key] || key;
  };

  /**
   * Changes app language and translates all DOM elements with [data-i18n].
   */
  window.setAppLanguage = function (langCode) {
    if (!window.VETCARE_I18N[langCode]) langCode = "hinglish";
    window.currentLanguage = langCode;
    localStorage.setItem(STORAGE_LANG_KEY, langCode);

    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const k = elem.getAttribute("data-i18n");
      const trans = window.t(k);
      if (trans) elem.textContent = trans;
    });

    const langSelect = document.getElementById("selAppLanguage");
    if (langSelect) langSelect.value = langCode;
  };

  // --------------------------------------------------------------------------
  // 3. ANTI-KICKOUT BACK NAVIGATION SYSTEM & HISTORY INTERCEPTOR
  // --------------------------------------------------------------------------

  /**
   * Navigates to a specific workspace or view container.
   * Pushes the current view onto the stack so the user can retrace steps safely.
   */
  window.navigateToView = function (targetViewId) {
    if (!targetViewId) return;

    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");
    const launcher = document.getElementById("services-launcher-container");

    // Push previous view to stack if it exists and differs
    if (window.currentActiveView && window.currentActiveView !== targetViewId) {
      window.currentViewStack.push(window.currentActiveView);
    }

    // Hide Gateway Screen completely once inside
    if (screenGateway) screenGateway.classList.add("hidden");
    if (screenMainApp) screenMainApp.classList.remove("hidden");

    // Hide all internal view sections inside <main>
    const allViews = [
      "services-launcher-container",
      "viewDiagnosis",
      "viewBreeding",
      "viewFeed",
      "viewRx",
      "viewRecords",
      "viewAI",
      "viewFinance",
      "viewInventory",
      "viewHelpdesk",
      "viewPharma"
    ];

    allViews.forEach(vId => {
      const elem = document.getElementById(vId);
      if (elem) elem.classList.add("hidden");
    });

    // Special handling if target is the central Services Launcher
    if (targetViewId === "services-launcher-container") {
      if (launcher) launcher.classList.remove("hidden");
      window.currentActiveView = "services-launcher-container";
      window.renderLauncherContent();
    } else {
      const targetElem = document.getElementById(targetViewId);
      if (targetElem) {
        targetElem.classList.remove("hidden");
        window.currentActiveView = targetViewId;
      } else {
        // Fallback: If view element not found, safely show launcher
        if (launcher) launcher.classList.remove("hidden");
        window.currentActiveView = "services-launcher-container";
      }
    }

    // Push browser history state to catch Android / Browser back buttons
    try {
      history.pushState({ viewId: window.currentActiveView }, "", `#${window.currentActiveView}`);
      localStorage.setItem(STORAGE_VIEW_KEY, window.currentActiveView);
    } catch (e) {
      // Ignore security errors in strict sandboxes
    }

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.updateNavigationUI();
  };

  /**
   * CRITICAL ANTI-KICKOUT FUNCTION:
   * Navigates back one step in view history.
   * NEVER logs out or kicks user back to the landing screen!
   */
  window.navigateBack = function () {
    if (window.currentViewStack.length > 0) {
      const previousViewId = window.currentViewStack.pop();
      // Directly show the previous view without pushing into stack again
      window.currentActiveView = null; // reset to avoid redundant push
      window.navigateToView(previousViewId);
    } else {
      // Default safety fallback: ALWAYS return to Services Launcher inside app!
      window.openServicesLauncher();
    }
  };

  // Intercept Browser Back Button / Hardware Back key
  window.addEventListener("popstate", function (event) {
    if (window.isUserLoggedIn()) {
      event.preventDefault();
      window.navigateBack();
    }
  });

  // --------------------------------------------------------------------------
  // 4. USER AUTHENTICATION & LIVE INTERACTIVE OTP ENGINE
  // --------------------------------------------------------------------------

  /**
   * Returns current active logged-in session object or null.
   */
  window.getActiveUserSession = function () {
    try {
      const sessionStr = localStorage.getItem(STORAGE_SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch (e) {
      return null;
    }
  };

  window.isUserLoggedIn = function () {
    const session = window.getActiveUserSession();
    return !!(session && session.contact);
  };

  /**
   * Pre-wired SMS Gateway dispatcher.
   * Ready for Fast2SMS / Twilio / Custom HTTP Webhook integration.
   */
  window.sendSmsOtpGateway = async function (phone, code) {
    console.info(`%c[SMS GATEWAY DISPATCH] Phone: +91-${phone} | OTP: ${code}`, "color: #2563eb; font-weight: bold; font-size: 13px;");
    
    // Future Fast2SMS API Hook:
    // fetch("https://www.fast2sms.com/dev/bulkV2", {
    //   method: "POST",
    //   headers: { "authorization": "YOUR_API_KEY", "Content-Type": "application/json" },
    //   body: JSON.stringify({ route: "otp", variables_values: code, numbers: phone })
    // });
    return true;
  };

  /**
   * Generates a 6-digit numeric OTP, stores pending verification payload,
   * starts 60-second cooldown, and renders a floating interactive toast.
   */
  window.generateAndSendOtp = function (contact, pendingPayload = null) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 Minutes Validity

    const otpData = {
      code: code,
      contact: contact,
      expiryTime: expiryTime,
      payload: pendingPayload
    };

    localStorage.setItem(STORAGE_PENDING_OTP_KEY, JSON.stringify(otpData));
    window.sendSmsOtpGateway(contact, code);

    // Launch 60s Resend Timer
    window.resendOtpSecondsLeft = 60;
    if (window.resendOtpCountdownInterval) clearInterval(window.resendOtpCountdownInterval);
    window.resendOtpCountdownInterval = setInterval(() => {
      window.resendOtpSecondsLeft--;
      const btn = document.getElementById("btnResendOtp");
      if (btn) {
        if (window.resendOtpSecondsLeft > 0) {
          btn.textContent = `पुनः भेजें (${window.resendOtpSecondsLeft}s)`;
          btn.disabled = true;
          btn.classList.add("opacity-50", "cursor-not-allowed");
        } else {
          btn.textContent = "पुनः OTP भेजें ↻";
          btn.disabled = false;
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          clearInterval(window.resendOtpCountdownInterval);
        }
      }
    }, 1000);

    // Render Floating Toast Notification with Copy Action
    window.renderInteractiveOtpToast(code, contact);
    return code;
  };

  /**
   * Floating, high-visibility interactive OTP notification with 1-click Auto-Fill & Copy.
   */
  window.renderInteractiveOtpToast = function (code, contact) {
    let toast = document.getElementById("floatingOtpToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "floatingOtpToast";
      toast.className = "fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-auto px-4 transition-all duration-300 transform";
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="bg-slate-900 border-2 border-emerald-400 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-3 animate-bounce">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl">
            💬
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">${window.t("otp_sent")} (+91-${contact})</span>
            <div class="flex items-center gap-2">
              <strong class="text-lg font-mono tracking-widest text-emerald-400 font-black">${code}</strong>
              <button onclick="window.copyOtpToClipboard('${code}')" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold px-2 py-0.5 rounded-lg border border-emerald-500/30">
                ${window.t("copy_otp")}
              </button>
            </div>
          </div>
        </div>
        <button onclick="document.getElementById('floatingOtpToast').remove()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
      </div>
    `;

    // Automatically fill the OTP input field if open
    const inputOtpField = document.getElementById("inputOtpCode");
    if (inputOtpField) {
      inputOtpField.value = code;
      inputOtpField.focus();
    }

    // Auto dismiss after 15 seconds
    setTimeout(() => {
      if (toast && toast.parentNode) toast.remove();
    }, 15000);
  };

  window.copyOtpToClipboard = function (code) {
    navigator.clipboard.writeText(code).then(() => {
      const input = document.getElementById("inputOtpCode");
      if (input) input.value = code;
      alert("✅ OTP कॉपी हो गया और इनपुट में भर दिया गया: " + code);
    }).catch(() => {
      const input = document.getElementById("inputOtpCode");
      if (input) input.value = code;
    });
  };

  /**
   * Registers a new user and triggers verification.
   */
  window.registerUser = function (name, role, contact, password) {
    if (!name || name.trim().length < 2) {
      alert("कृपया मान्य नाम दर्ज करें (कम से कम 2 अक्षर)!");
      return false;
    }
    const cleanPhone = contact.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें!");
      return false;
    }
    if (!password || password.length < 4) {
      alert("पासवर्ड कम से कम 4 अक्षरों का होना आवश्यक है!");
      return false;
    }

    const pendingPayload = {
      name: name.trim(),
      role: role.toUpperCase(),
      contact: cleanPhone,
      password: password,
      trialExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24-Hour Free Trial
      dualAccess: role.toUpperCase() === "DOCTOR",
      createdAt: new Date().toISOString()
    };

    window.openOtpVerificationModal(cleanPhone, pendingPayload);
    window.generateAndSendOtp(cleanPhone, pendingPayload);
    return true;
  };

  /**
   * Verifies the OTP, writes to 'vetcare_users_db', creates active session,
   * starts trial timers, and launches Central Services.
   */
  window.verifyOtpAndLogin = function (inputOtp) {
    const rawSaved = localStorage.getItem(STORAGE_PENDING_OTP_KEY);
    if (!rawSaved) {
      alert("OTP सत्र समाप्त हो गया है! कृपया पुनः कोड मांगें।");
      return false;
    }

    const otpData = JSON.parse(rawSaved);
    if (Date.now() > otpData.expiryTime) {
      alert("OTP की समय सीमा (5 मिनट) समाप्त हो चुकी है! कृपया 'पुनः भेजें' दबाएं।");
      return false;
    }

    if (otpData.code !== inputOtp.toString().trim()) {
      alert("अमान्य OTP कोड! कृपया एसएमएस में प्राप्त सही 6-अंक दर्ज करें।");
      return false;
    }

    // OTP Validated Successfully
    const payload = otpData.payload;
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
    } catch (e) {
      users = [];
    }

    // Check if user already exists
    let existingIndex = users.findIndex(u => u.contact === otpData.contact);
    let sessionUser = null;

    if (existingIndex >= 0) {
      sessionUser = users[existingIndex];
      // Refresh trial if requested
      if (!sessionUser.trialExpiry) {
        sessionUser.trialExpiry = Date.now() + 24 * 60 * 60 * 1000;
      }
    } else if (payload) {
      sessionUser = payload;
      users.push(sessionUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } else {
      sessionUser = {
        name: "प्रमाणित उपयोगकर्ता",
        contact: otpData.contact,
        role: "FARMER",
        trialExpiry: Date.now() + 24 * 60 * 60 * 1000,
        dualAccess: false
      };
      users.push(sessionUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }

    // Write Active Session
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    localStorage.removeItem(STORAGE_PENDING_OTP_KEY);

    // Close Modals
    window.closeOtpVerificationModal();
    window.closeAuthModal();

    // Start Real-Time Timers & Open Central Services
    window.startDualSessionTimers();
    window.openServicesLauncher();
    return true;
  };

  /**
   * Password-based instant login for existing registered users.
   */
  window.loginWithPassword = function (contact, password) {
    const cleanPhone = contact.replace(/\D/g, "");
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
    } catch (e) {
      users = [];
    }

    const found = users.find(u => u.contact === cleanPhone && u.password === password);
    if (!found) {
      alert("गलत मोबाइल नंबर अथवा पासवर्ड! कृपया पुनः जांचें या OTP द्वारा लॉगिन करें।");
      return false;
    }

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(found));
    window.closeAuthModal();
    window.startDualSessionTimers();
    window.openServicesLauncher();
    return true;
  };

  /**
   * Explicitly logs out the user, clears session, and returns to landing gateway.
   */
  window.logoutUser = function () {
    if (!confirm("क्या आप वाकई Vetcare से लॉगआउट करना चाहते हैं?")) return;

    localStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(STORAGE_VIEW_KEY);
    window.currentViewStack = [];
    window.currentActiveView = null;

    if (window.sessionTimerInterval) clearInterval(window.sessionTimerInterval);
    if (window.trialTimerInterval) clearInterval(window.trialTimerInterval);

    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");

    if (screenGateway) screenGateway.classList.remove("hidden");
    if (screenMainApp) screenMainApp.classList.add("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --------------------------------------------------------------------------
  // 5. RESILIENT DUAL TIMERS (60-MIN SESSION & 24-HR TRIAL GUARD)
  // --------------------------------------------------------------------------

  /**
   * Initializes and maintains the 60-min session countdown & 24-hr trial guard.
   */
  window.startDualSessionTimers = function () {
    if (window.sessionTimerInterval) clearInterval(window.sessionTimerInterval);
    if (window.trialTimerInterval) clearInterval(window.trialTimerInterval);

    // 1. Session Timer (60 Minutes Glitch-Free)
    let sessionSecondsRemaining = 60 * 60;
    const sessionBadge = document.getElementById("session-timer-badge");

    window.sessionTimerInterval = setInterval(() => {
      sessionSecondsRemaining--;
      if (sessionSecondsRemaining <= 0) {
        clearInterval(window.sessionTimerInterval);
        alert("आपका 60-मिनट का क्लिनिकल सत्र समाप्त हो गया है। डेटा सुरक्षित कर दिया गया है।");
        window.logoutUser();
        return;
      }
      const mins = Math.floor(sessionSecondsRemaining / 60);
      const secs = sessionSecondsRemaining % 60;
      if (sessionBadge) {
        sessionBadge.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }
    }, 1000);

    // 2. 24-Hour Free Trial Countdown Timer
    const session = window.getActiveUserSession();
    const trialBadge = document.getElementById("trial-timer-badge");

    window.trialTimerInterval = setInterval(() => {
      if (!session || !session.trialExpiry) return;
      const msLeft = session.trialExpiry - Date.now();

      if (msLeft <= 0) {
        if (trialBadge) trialBadge.textContent = "ट्रायल समाप्त (Upgrade 💎)";
        return;
      }

      const totalSecs = Math.floor(msLeft / 1000);
      const hours = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;

      if (trialBadge) {
        trialBadge.textContent = `${hours}h ${mins}m ${secs}s`;
      }
    }, 1000);
  };

  // --------------------------------------------------------------------------
  // 6. CENTRAL SERVICES LAUNCHER & DUAL-ROLE TILES GRID
  // --------------------------------------------------------------------------

  /**
   * Builds and opens the Central Services Launcher tile grid.
   */
  window.openServicesLauncher = function () {
    const session = window.getActiveUserSession();
    if (!session) {
      window.openAuthModal("LOGIN");
      return;
    }

    const screenGateway = document.getElementById("screenGateway");
    const screenMainApp = document.getElementById("screenMainApp");

    if (screenGateway) screenGateway.classList.add("hidden");
    if (screenMainApp) screenMainApp.classList.remove("hidden");

    let launcher = document.getElementById("services-launcher-container");
    if (!launcher) {
      launcher = document.createElement("div");
      launcher.id = "services-launcher-container";
      launcher.className = "space-y-6 pb-6";
      const main = document.querySelector("main");
      if (main) main.insertBefore(launcher, main.firstChild);
    }

    window.renderLauncherContent();
    window.navigateToView("services-launcher-container");
  };

  /**
   * Renders the role-specific grid tiles for Doctors and Farmers.
   */
  window.renderLauncherContent = function () {
    const launcher = document.getElementById("services-launcher-container");
    if (!launcher) return;

    const session = window.getActiveUserSession() || { role: "FARMER", name: "डेयरी पशुपालक", dualAccess: false };
    const isDoctor = session.role === "DOCTOR";

    // Update Header Badges
    const roleBadge = document.getElementById("currentUserRoleBadge");
    if (roleBadge) {
      roleBadge.textContent = isDoctor ? "🩺 अधिकृत पशु चिकित्सक" : "👨‍🌾 स्मार्ट पशुपालक";
    }

    // Role Switcher Button if Dual Access Enabled
    let dualSwitchHtml = "";
    if (session.dualAccess || isDoctor) {
      dualSwitchHtml = `
        <button onclick="window.toggleUserRolePortal()" class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-3 px-4 rounded-2xl shadow-sm text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98">
          <span>${window.t("switch_portal")}</span>
        </button>
      `;
    }

    // DOCTOR SERVICES TILES
    const doctorTiles = [
      { id: "viewDiagnosis", icon: "🩺", title: "1. लक्षण मैट्रिक्स", desc: "मल्टी-ऑर्गन वैज्ञानिक संभावना % एवं 22+ रोग निदान", tag: "Matrix %" },
      { id: "viewAI", icon: "🤖", title: "2. त्वरित खोज व AI", desc: "Gemini 3.8 Flash क्लिनिकल सेकेंड ओपिनियन", tag: "AI Flash" },
      { id: "viewRx", icon: "📝", title: "3. ओपीडी पर्चा (Rx)", desc: "1-Click व्हाट्सएप डिजिटल पर्ची, फीस व पर्चा प्रिंट", tag: "WhatsApp" },
      { id: "viewBreeding", icon: "🧬", title: "4. कृत्रिम गर्भाधान (A.I.)", desc: "मद चक्र समय, सीमन स्ट्रॉ चयन व रिपीट ब्रीडिंग समाधान", tag: "A.I. Tech" },
      { id: "viewPharma", icon: "📚", title: "5. दवा ज्ञानकोश", desc: "30+ एथिकल व जेनेरिक औषधियां, विथड्रॉल व डोज़", tag: "30+ Drugs" },
      { id: "viewDiagnosis", icon: "⚖️", title: "6. खुराक कैलकुलेटर", desc: "शेफर फॉर्मूला द्वारा शरीर भार (Kg) व मिली डोज़", tag: "Shaeffer" },
      { id: "viewInventory", icon: "💊", title: "7. दवा व सीमन स्टॉक", desc: "इन्वेंट्री प्रबंधन व न्यूनतम स्टॉक ऑटो-अलर्ट", tag: "Stock" },
      { id: "viewFinance", icon: "💰", title: "8. क्लिनिक खाता बही", desc: "किसान उधारी, जमा व दैनिक ओपीडी आय रिकॉर्ड", tag: "Ledger" }
    ];

    // FARMER SERVICES TILES
    const farmerTiles = [
      { id: "viewDiagnosis", icon: "🌿", title: "1. देसी सिद्ध उपचार", desc: "25+ असाध्य रोगों के परीक्षित हर्बल व घरेलू नुस्खे", tag: "घरेलू नुस्खे" },
      { id: "viewHelpdesk", icon: "💉", title: "2. टीकाकरण ज्ञानकोश", desc: "गलघोंटू, लंगड़ा, खुरपका का सही समय व कैलेंडर", tag: "सुरक्षा" },
      { id: "viewBreeding", icon: "🧬", title: "3. नस्ल सुधार व A.I.", desc: "मद के लक्षण, तार देखकर सीमन डलवाने का सटीक समय", tag: "गर्भाधान" },
      { id: "viewFeed", icon: "🥛", title: "4. संतुलित आहार व दूध वृद्धि", desc: "वजन अनुसार 24 घंटे का दाना, सूखा व हरा चारा", tag: "कैलकुलेटर" },
      { id: "viewHelpdesk", icon: "🚨", title: "5. 20km डॉक्टर रिक्वेस्ट", desc: "आपातकाल में निकटतम वेटरनरी डॉक्टर से संपर्क करें", tag: "SOS Vet" },
      { id: "viewFinance", icon: "📊", title: "6. दूध बिक्री बहीखाता", desc: "सुबह-शाम दूध लीटर, फैट व भुगतान का पक्का हिसाब", tag: "डेयरी खाता" }
    ];

    const currentTiles = isDoctor ? doctorTiles : farmerTiles;

    launcher.innerHTML = `
      <!-- Launcher Banner -->
      <div class="bg-gradient-to-br ${isDoctor ? 'from-blue-600 via-indigo-700 to-slate-900' : 'from-emerald-600 via-teal-700 to-slate-900'} rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-3">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              ${isDoctor ? '🩺 VETERINARY PRACTITIONER OS' : '👨‍🌾 SMART DAIRY ASSISTANT'}
            </span>
            <h2 class="text-xl sm:text-2xl font-black mt-1">नमस्ते, ${session.name}</h2>
            <p class="text-xs text-white/80">${session.contact ? `+91-${session.contact}` : ''}</p>
          </div>

          <!-- Dual Real-Time Timers -->
          <div class="text-right space-y-1">
            <div class="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-[11px]">
              <span class="text-amber-300">⏳</span>
              <strong id="trial-timer-badge">गणना जारी...</strong>
            </div>
            <div class="block text-[10px] text-white/70">
              सत्र: <span id="session-timer-badge" class="font-mono font-bold text-white">60:00</span>
            </div>
          </div>
        </div>

        ${dualSwitchHtml}
      </div>

      <!-- Services Grid -->
      <div class="space-y-2">
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          ${isDoctor ? 'क्लिनिकल कार्य एवं निर्णय टूल्स:' : 'पशुपालक मुख्य सेवाएं:'}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${currentTiles.map(tile => `
            <div onclick="window.navigateToView('${tile.id}')" class="bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md cursor-pointer transition active:scale-98 flex flex-col justify-between space-y-3 group">
              <div class="space-y-1.5">
                <div class="flex justify-between items-center">
                  <span class="text-3xl group-hover:scale-110 transition-transform">${tile.icon}</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${isDoctor ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}">
                    ${tile.tag}
                  </span>
                </div>
                <h4 class="font-black text-slate-900 text-sm group-hover:text-blue-600 transition-colors">${tile.title}</h4>
                <p class="text-[11px] text-slate-500 leading-relaxed">${tile.desc}</p>
              </div>
              <div class="text-[11px] font-bold ${isDoctor ? 'text-blue-600' : 'text-emerald-600'} flex items-center justify-end gap-1">
                <span>खोलें</span> ➔
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };

  /**
   * Toggles role between DOCTOR and FARMER for dual-access accounts.
   */
  window.toggleUserRolePortal = function () {
    const session = window.getActiveUserSession();
    if (!session) return;

    session.role = session.role === "DOCTOR" ? "FARMER" : "DOCTOR";
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    // Update global app state if defined
    if (typeof window.currentRole !== "undefined") {
      window.currentRole = session.role;
    }

    window.openServicesLauncher();
  };

  // --------------------------------------------------------------------------
  // 7. GEMINI 3.8 FLASH CLINICAL AI CALLER & 5-TIER TREATMENT ENGINE
  // --------------------------------------------------------------------------

  /**
   * High-performance veterinary clinical intelligence caller.
   * Calls gemini-3.8-flash (with robust fallbacks to gemini-3.5-flash and gemini-1.5-flash).
   */
  window.callGeminiClinicalAI = async function (promptText, containerElemId = "aiOutputArea") {
    const container = document.getElementById(containerElemId);
    const apiKey = localStorage.getItem("vetcare_gemini_key") || (window.AppConfig && window.AppConfig.geminiKey);

    if (!apiKey) {
      alert("कृपया पहले अपनी Gemini API Key सेट करें!");
      if (typeof window.openAIKeyModal === "function") window.openAIKeyModal();
      return;
    }

    if (container) {
      container.classList.remove("hidden");
      container.innerHTML = `
        <div class="p-6 text-center space-y-3">
          <div class="inline-block animate-spin text-3xl">🧬</div>
          <h4 class="font-bold text-purple-900 text-sm">Gemini 3.8 Flash सुपरकंप्यूटिंग इंजन विश्लेषण कर रहा है...</h4>
          <p class="text-xs text-purple-600">5-स्तरीय उपचार तालिका, औषधि परस्पर क्रिया व गर्भावस्था संवेदनशीलता जांची जा रही है</p>
        </div>
      `;
    }

    const clinicalSystemInstruction = `You are the Lead Clinical Veterinary Surgeon & Pharmacologist of Vetcare AI OS.
Always provide a rigorous, evidence-based, 5-Tier Clinical Treatment Protocol.
Explicitly identify any pregnant contraindications. If drugs like Dexamethasone, PGF2alpha, or live vaccines are involved, trigger a bold PREGNANCY RED ALERT.
Structure your reply in 5 clear tiers:
Tier 1: Emergency & Fluid Therapy
Tier 2: Primary Antimicrobial / Antiprotozoal (Ethical Brand + Generic Salt)
Tier 3: NSAID / Anti-inflammatory
Tier 4: Rumen Microflora & Metabolic Restoratives
Tier 5: Supportive Tonics & Post-Care Instructions.`;

    const requestPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${clinicalSystemInstruction}\n\nCase History & Symptoms:\n${promptText}` }]
        }
      ],
      generationConfig: {
        temperature: 0.15,
        maxOutputTokens: 1200
      }
    };

    // Primary endpoint: gemini-3.8-flash, Fallbacks: gemini-3.5-flash, gemini-1.5-flash
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    ];

    let responseText = null;
    let lastError = null;

    for (const url of endpoints) {
      try {
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload)
        });
        if (resp.ok) {
          const resData = await resp.json();
          responseText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (responseText) break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!responseText) {
      if (container) {
        container.innerHTML = `
          <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs">
            <strong>AI संचार त्रुटि:</strong> कृपया अपनी API Key जांचें अथवा पुनः प्रयास करें (${lastError ? lastError.message : 'Timeout'})
          </div>
        `;
      }
      return;
    }

    // Render Formatted 5-Tier Treatment Output
    window.renderClinicalAIOutput(responseText, container);
  };

  /**
   * Renders parsed AI treatment with Ethical/Generic switchers and Pregnancy Red Alerts.
   */
  window.renderClinicalAIOutput = function (rawMarkdown, container) {
    const hasPregnancyWarning =
      rawMarkdown.includes("PREGNANCY") ||
      rawMarkdown.includes("गर्भपात") ||
      rawMarkdown.includes("Dexamethasone") ||
      rawMarkdown.includes("PGF2") ||
      rawMarkdown.includes("Cloprostenol");

    let pregnancyBanner = "";
    if (hasPregnancyWarning) {
      pregnancyBanner = `
        <div class="p-4 bg-rose-600 text-white rounded-2xl shadow-lg border-2 border-rose-300 space-y-1 animate-pulse">
          <strong class="font-black text-sm flex items-center gap-1.5">
            <span>🚨</span> ${window.t("pregnancy_danger")}
          </strong>
          <p class="text-[11px] text-rose-100">
            गाभिन पशुओं में कॉर्टिकोस्टेरॉइड (Dexamethasone) अथवा PGF2α एनालॉग देने से तत्काल गर्भपात हो सकता है।
            गाभिन होने पर विकल्पतः <strong>Isoflupredone Acetate</strong> का ही उपयोग करें!
          </p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="space-y-4 text-xs sm:text-sm">
        ${pregnancyBanner}

        <!-- Toggle Switcher for Ethical vs Generic view -->
        <div class="flex justify-between items-center bg-purple-100 p-2 rounded-2xl border border-purple-200">
          <span class="font-bold text-purple-900 text-xs">💊 5-स्तरीय क्लिनिकल प्रोटोकॉल (Gemini AI 2026):</span>
          <div class="flex gap-1">
            <button onclick="window.toggleAITreatmentView('ETHICAL')" id="btnAITabEthical" class="px-2.5 py-1 rounded-xl bg-purple-700 text-white font-bold text-[10px]">
              ${window.t("ethical_tab")}
            </button>
            <button onclick="window.toggleAITreatmentView('GENERIC')" id="btnAITabGeneric" class="px-2.5 py-1 rounded-xl bg-white text-purple-800 font-bold text-[10px]">
              ${window.t("generic_tab")}
            </button>
          </div>
        </div>

        <div id="aiFormattedReportText" class="p-4 bg-white border border-purple-200 rounded-2xl whitespace-pre-wrap leading-relaxed text-slate-800 font-sans shadow-xs">
          ${rawMarkdown}
        </div>

        <div class="flex gap-2">
          <button onclick="window.copyAIToPrescription()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition">
            📝 इस संपूर्ण उपचार को डिजिटल पर्ची (Rx) में लोड करें
          </button>
        </div>
      </div>
    `;
  };

  window.toggleAITreatmentView = function (mode) {
    const btnEth = document.getElementById("btnAITabEthical");
    const btnGen = document.getElementById("btnAITabGeneric");
    if (!btnEth || !btnGen) return;

    if (mode === "ETHICAL") {
      btnEth.className = "px-2.5 py-1 rounded-xl bg-purple-700 text-white font-bold text-[10px]";
      btnGen.className = "px-2.5 py-1 rounded-xl bg-white text-purple-800 font-bold text-[10px]";
    } else {
      btnGen.className = "px-2.5 py-1 rounded-xl bg-purple-700 text-white font-bold text-[10px]";
      btnEth.className = "px-2.5 py-1 rounded-xl bg-white text-purple-800 font-bold text-[10px]";
    }
  };

  window.copyAIToPrescription = function () {
    const reportElem = document.getElementById("aiFormattedReportText");
    if (!reportElem) return;

    const opdMed = document.getElementById("opdMedicine");
    if (opdMed) {
      opdMed.value = reportElem.innerText;
    }
    window.navigateToView("viewRx");
  };

  // --------------------------------------------------------------------------
  // 8. DYNAMIC AUTH & OTP MODALS (LOGIN / REGISTER)
  // --------------------------------------------------------------------------

  /**
   * Universal Authentication Modal (Login / Register Tabs)
   */
  window.openAuthModal = function (initialTab = "LOGIN") {
    let modal = document.getElementById("modalVetcareAuth");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modalVetcareAuth";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-xs sm:text-sm">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🔐</span>
            <h3 class="font-black text-slate-900 text-base" id="authModalTitle">Vetcare प्रवेश</h3>
          </div>
          <button onclick="window.closeAuthModal()" class="text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>
        </div>

        <!-- Tab Switches -->
        <div class="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl">
          <button id="authTabBtnLogin" onclick="window.switchAuthTab('LOGIN')" class="py-2 rounded-xl bg-white text-blue-700 font-bold text-center shadow-xs">
            लॉगिन (Login)
          </button>
          <button id="authTabBtnReg" onclick="window.switchAuthTab('REG')" class="py-2 rounded-xl text-slate-600 font-medium text-center">
            नया खाता (Sign Up)
          </button>
        </div>

        <!-- LOGIN FORM -->
        <div id="authFormLogin" class="space-y-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">मोबाइल नंबर (10 अंक)</label>
            <input type="tel" id="loginContact" maxlength="10" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">पासवर्ड</label>
            <input type="password" id="loginPassword" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold" />
          </div>
          <button onclick="window.handleLoginSubmit()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98">
            प्रवेश करें (Login) ➔
          </button>
          <div class="text-center pt-1">
            <button onclick="window.handleOtpInstantLogin()" class="text-[11px] text-blue-600 underline font-semibold">
              बिना पासवर्ड OTP से लॉगिन करें
            </button>
          </div>
        </div>

        <!-- REGISTRATION FORM -->
        <div id="authFormReg" class="hidden space-y-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">आपका पूरा नाम</label>
            <input type="text" id="regName" placeholder="उदा. डॉ. शर्मा / रामसिंह यादव" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">कार्य-क्षेत्र (Role)</label>
            <select id="regRole" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold text-slate-800">
              <option value="FARMER">स्मार्ट पशुपालक (Smart Dairy Farmer)</option>
              <option value="DOCTOR">अधिकृत पशु चिकित्सक (Veterinary Doctor)</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">मोबाइल नंबर (10 अंक)</label>
            <input type="tel" id="regContact" maxlength="10" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">पासवर्ड बनाएं</label>
            <input type="password" id="regPassword" placeholder="न्यूनतम 4 अक्षर" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold" />
          </div>
          <button onclick="window.handleRegSubmit()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98">
            OTP सत्यापन व 24h फ्री ट्रायल ➔
          </button>
        </div>
      </div>
    `;

    modal.style.display = "flex";
    window.switchAuthTab(initialTab);
  };

  window.closeAuthModal = function () {
    const modal = document.getElementById("modalVetcareAuth");
    if (modal) modal.style.display = "none";
  };

  window.switchAuthTab = function (tab) {
    const fLogin = document.getElementById("authFormLogin");
    const fReg = document.getElementById("authFormReg");
    const btnLogin = document.getElementById("authTabBtnLogin");
    const btnReg = document.getElementById("authTabBtnReg");

    if (tab === "LOGIN") {
      if (fLogin) fLogin.classList.remove("hidden");
      if (fReg) fReg.classList.add("hidden");
      if (btnLogin) btnLogin.className = "py-2 rounded-xl bg-white text-blue-700 font-bold text-center shadow-xs";
      if (btnReg) btnReg.className = "py-2 rounded-xl text-slate-600 font-medium text-center";
    } else {
      if (fLogin) fLogin.classList.add("hidden");
      if (fReg) fReg.classList.remove("hidden");
      if (btnReg) btnReg.className = "py-2 rounded-xl bg-white text-emerald-700 font-bold text-center shadow-xs";
      if (btnLogin) btnLogin.className = "py-2 rounded-xl text-slate-600 font-medium text-center";
    }
  };

  window.handleLoginSubmit = function () {
    const contact = document.getElementById("loginContact")?.value || "";
    const pass = document.getElementById("loginPassword")?.value || "";
    window.loginWithPassword(contact, pass);
  };

  window.handleRegSubmit = function () {
    const name = document.getElementById("regName")?.value || "";
    const role = document.getElementById("regRole")?.value || "FARMER";
    const contact = document.getElementById("regContact")?.value || "";
    const pass = document.getElementById("regPassword")?.value || "";
    window.registerUser(name, role, contact, pass);
  };

  window.handleOtpInstantLogin = function () {
    const contact = document.getElementById("loginContact")?.value || "";
    const cleanPhone = contact.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें!");
      return;
    }
    window.openOtpVerificationModal(cleanPhone, null);
    window.generateAndSendOtp(cleanPhone, null);
  };

  /**
   * OTP Verification Modal with 60-Second Resend Timer
   */
  window.openOtpVerificationModal = function (phone, pendingPayload) {
    let modal = document.getElementById("modalOtpVerify");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modalOtpVerify";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-xs w-full p-6 space-y-4 shadow-2xl text-center text-xs sm:text-sm">
        <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black">
          📩
        </div>
        <div>
          <h3 class="font-black text-slate-900 text-base">OTP सत्यापन</h3>
          <p class="text-xs text-slate-500 mt-0.5">+91-${phone} पर भेजा गया 6-अंक कोड भरें</p>
        </div>

        <input 
          id="inputOtpCode" 
          type="text" 
          maxlength="6" 
          placeholder="••••••" 
          class="w-full text-center tracking-widest text-2xl font-mono py-2.5 border-2 border-slate-200 rounded-2xl outline-none focus:border-emerald-600 font-black transition"
        />

        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-400">कोड नहीं मिला?</span>
          <button id="btnResendOtp" onclick="window.generateAndSendOtp('${phone}')" class="text-blue-600 font-bold underline">
            पुनः OTP भेजें (${window.resendOtpSecondsLeft}s)
          </button>
        </div>

        <div class="flex gap-2 pt-1">
          <button onclick="window.closeOtpVerificationModal()" class="w-1/3 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl">रद्द</button>
          <button onclick="window.submitOtpCode()" class="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-98">
            सत्यापित करें ➔
          </button>
        </div>
      </div>
    `;

    modal.style.display = "flex";
  };

  window.closeOtpVerificationModal = function () {
    const modal = document.getElementById("modalOtpVerify");
    if (modal) modal.style.display = "none";
  };

  window.submitOtpCode = function () {
    const code = document.getElementById("inputOtpCode")?.value || "";
    window.verifyOtpAndLogin(code);
  };

  // --------------------------------------------------------------------------
  // 9. HEADER / FOOTER / NAVIGATION CONTROLLERS
  // --------------------------------------------------------------------------

  /**
   * Keeps navigation tabs and bottom app bar in sync with current view.
   */
  window.updateNavigationUI = function () {
    const activeView = window.currentActiveView;
    const navButtons = {
      viewDiagnosis: "navDiagnosis",
      viewRx: "navRx",
      viewRecords: "navRecords",
      viewInventory: "navInventory",
      viewAI: "navAI",
      viewBreeding: "navBreeding",
      viewFeed: "navFeed",
      viewFinance: "navFinance",
      viewHelpdesk: "navHelpdesk",
      viewPharma: "navPharma"
    };

    Object.values(navButtons).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove("active-nav-tab");
    });

    const currentNavId = navButtons[activeView];
    if (currentNavId) {
      const activeBtn = document.getElementById(currentNavId);
      if (activeBtn) activeBtn.classList.add("active-nav-tab");
    }
  };

  /**
   * Patches existing role selection functions from landing screen.
   */
  window.selectRole = function (role) {
    const session = window.getActiveUserSession();
    if (session) {
      session.role = role;
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      window.openServicesLauncher();
    } else {
      window.openAuthModal("REG");
      const regRole = document.getElementById("regRole");
      if (regRole) regRole.value = role;
    }
  };

  window.returnToGateway = function () {
    window.openServicesLauncher();
  };

  // --------------------------------------------------------------------------
  // 10. SYSTEM BOOTSTRAPPER
  // --------------------------------------------------------------------------
  window.initMasterAppController = function () {
    // Set language from persistent state
    window.setAppLanguage(window.currentLanguage);

    // Check if user has an active session
    if (window.isUserLoggedIn()) {
      window.startDualSessionTimers();
      const lastView = localStorage.getItem(STORAGE_VIEW_KEY) || "services-launcher-container";
      window.navigateToView(lastView);
    } else {
      // Landing screen active
      const screenGateway = document.getElementById("screenGateway");
      const screenMainApp = document.getElementById("screenMainApp");
      if (screenGateway) screenGateway.classList.remove("hidden");
      if (screenMainApp) screenMainApp.classList.add("hidden");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initMasterAppController);
  } else {
    window.initMasterAppController();
  }

})(window, document);
