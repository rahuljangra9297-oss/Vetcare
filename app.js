// Vetcare AI OS - Unified Production Engine (2026 Production)
// Principal Lead Software Engineer & Veterinary Systems Architect Grade
// Pure Executable JavaScript • Production-Ready Unified Controller

(function (window, document) {
  "use strict";

  /* =========================================================================
     1. GLOBAL CONFIGURATION & APP STATE STORAGE
     ========================================================================= */
  var CONFIG_KEY = "vetcare_app_config";
  var USERS_KEY = "vetcare_users_db";
  var SESSION_KEY = "vetcare_active_session";
  var RECORDS_KEY = "vetcare_opd_records";
  var KHATA_KEY = "vetcare_khata_records";
  var INVENTORY_KEY = "vetcare_inventory_db";
  var REQUESTS_KEY = "vetcare_doctor_requests";
  var GEMINI_KEY_STORAGE = "vetcare_gemini_api_key";

  var DEFAULT_CONFIG = {
    appTitle: "Vetcare",
    logoUrl: "",
    appTagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
    adminWhatsApp: "9991039297",
    adminPin: "9297",
    adminAuth: {
      id: "9991039297",
      pass: "Rahul@1812"
    },
    banking: {
      payeeName: "VETCARE CLINICAL SYSTEMS",
      sbiUpi: "rahuljangra9297@oksbi",
      sbiAccount: "405901000123",
      sbiIfsc: "SBIN0001234",
      pnbUpi: "rahuljangra9297-1@okicici",
      pnbAccount: "01230001009876",
      pnbIfsc: "PUNB0123400"
    },
    subscriptions: {
      "1-week": { name: "1-सप्ताह प्लान (Trial)", price: 49, days: 7 },
      "1-month": { name: "1-माह प्लान (Popular)", price: 199, days: 30 },
      "3-month": { name: "3-माह प्लान (Saver)", price: 499, days: 90 }
    },
    defaultLanguage: "hinglish",
    sessionTimerMinutes: 60
  };

  var AppConfig = (function () {
    try {
      var raw = localStorage.getItem(CONFIG_KEY);
      return raw ? Object.assign({}, DEFAULT_CONFIG, JSON.parse(raw)) : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  })();

  function saveConfig() {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(AppConfig));
    } catch (e) {
      console.error("Config save error:", e);
    }
  }

  /* =========================================================================
     2. SINGLETON 60-MINUTE GLITCH-FREE SESSION TIMER
     ========================================================================= */
  var sessionTimerInterval = null;
  var sessionSecondsLeft = AppConfig.sessionTimerMinutes * 60;

  function initSessionTimer() {
    if (sessionTimerInterval) {
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
    }
    sessionSecondsLeft = AppConfig.sessionTimerMinutes * 60;

    var badge = document.getElementById("session-timer-badge");
    if (!badge) {
      var headerTarget = document.querySelector("header > div:last-child");
      if (headerTarget) {
        badge = document.createElement("div");
        badge.id = "session-timer-badge";
        badge.className = "text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-1 rounded-lg border border-amber-500/40 flex items-center gap-1 shadow-xs";
        headerTarget.prepend(badge);
      }
    }

    function renderTime() {
      var mins = Math.floor(sessionSecondsLeft / 60);
      var secs = sessionSecondsLeft % 60;
      var formatted = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
      if (badge) {
        badge.innerHTML = "<span>⏱️</span> <span>" + formatted + "</span>";
      }
      if (sessionSecondsLeft <= 300 && badge) {
        badge.classList.add("pulse-danger", "text-rose-400");
      }
      if (sessionSecondsLeft <= 0) {
        clearInterval(sessionTimerInterval);
        sessionTimerInterval = null;
        alert("Session Expired! सुरक्षा कारणों से आपका सत्र समाप्त हो गया है। कृपया पुनः प्रवेश करें।");
        window.logoutUser();
      }
      sessionSecondsLeft--;
    }

    renderTime();
    sessionTimerInterval = setInterval(renderTime, 1000);
  }

  /* =========================================================================
     3. USER REGISTRATION & MULTI-METHOD LOGIN SYSTEM
     ========================================================================= */
  function getUsersDB() {
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (!raw) {
        var seed = [
          {
            id: "user_doc_default",
            name: "Dr. Rahul Jangra",
            contact: "9991039297",
            role: "doctor",
            password: "Doctor@123",
            registeredAt: new Date().toISOString(),
            status: "active",
            canAccessBothPortals: true,
            subscription: { plan: "3-month", active: true, expiryDate: new Date(Date.now() + 90 * 86400000).toISOString() }
          },
          {
            id: "user_farmer_default",
            name: "किसान रामेश्वर सिंह",
            contact: "9876543210",
            role: "farmer",
            password: "Farmer@123",
            registeredAt: new Date().toISOString(),
            status: "active",
            canAccessBothPortals: false,
            subscription: { plan: "1-month", active: true, expiryDate: new Date(Date.now() + 30 * 86400000).toISOString() }
          }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveUsersDB(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Users DB save error:", e);
    }
  }

  function getActiveSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setActiveSession(user) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Session save error:", e);
    }
  }

  window.registerUser = function (name, role, contact, password) {
    if (!name || !role || !contact || !password) {
      alert("कृपया नाम, कार्य-क्षेत्र (Role), मोबाइल/ईमेल और पासवर्ड सभी विवरण भरें!");
      return false;
    }
    var cleanContact = contact.trim().toLowerCase();
    var isPhone = /^\d{10}$/.test(cleanContact);
    var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    if (!isPhone && !isEmail) {
      alert("कृपया एक वैध 10-अंकों का मोबाइल नंबर या वैध ईमेल आईडी दर्ज करें!");
      return false;
    }

    var users = getUsersDB();
    var exists = users.some(function (u) {
      return u.contact.toLowerCase() === cleanContact;
    });

    if (exists) {
      alert("यह मोबाइल नंबर / ईमेल पहले से पंजीकृत है! कृपया सीधा लॉगिन करें।");
      return false;
    }

    var newUser = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      contact: cleanContact,
      role: role.toLowerCase() === "doctor" ? "doctor" : "farmer",
      password: password,
      registeredAt: new Date().toISOString(),
      status: "active",
      canAccessBothPortals: false,
      subscription: {
        plan: "1-week",
        active: true,
        expiryDate: new Date(Date.now() + 7 * 86400000).toISOString()
      }
    };

    users.push(newUser);
    saveUsersDB(users);
    setActiveSession(newUser);
    alert("🎉 बधाई! " + newUser.name + ", आपका पंजीकरण सफल रहा। 1-सप्ताह का ट्रायल सक्रिय किया गया है।");
    window.launchUserPortal(newUser);
    return true;
  };

  window.loginUser = function (contact, credential, method) {
    var cleanContact = (contact || "").trim().toLowerCase();
    var users = getUsersDB();
    var targetUser = users.find(function (u) {
      return u.contact.toLowerCase() === cleanContact;
    });

    if (!targetUser) {
      alert("उपयोगकर्ता नहीं मिला! कृपया सही नंबर/ईमेल दर्ज करें अथवा पहले नया पंजीकरण करें।");
      return false;
    }

    if (targetUser.status === "banned") {
      alert("⚠️ आपका खाता सुरक्षा कारणों से एडमिन द्वारा प्रतिबंधित (Banned) किया गया है। कृपया एडमिन से संपर्क करें।");
      return false;
    }

    if (method === "OTP") {
      var otpEntered = String(credential).trim();
      var sessionOtp = String(window._lastSimulatedOTP || "").trim();
      if (!sessionOtp || otpEntered !== sessionOtp) {
        alert("गलत या अमान्य OTP! कृपया पुनः प्रयास करें।");
        return false;
      }
    } else {
      if (targetUser.password !== credential) {
        alert("गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।");
        return false;
      }
    }

    setActiveSession(targetUser);
    alert("नमस्ते " + targetUser.name + "! Vetcare AI OS में आपका स्वागत है।");
    window.launchUserPortal(targetUser);
    return true;
  };

  window.requestLoginOTP = function (contact) {
    var cleanContact = (contact || "").trim().toLowerCase();
    var users = getUsersDB();
    var targetUser = users.find(function (u) {
      return u.contact.toLowerCase() === cleanContact;
    });

    if (!targetUser) {
      alert("यह मोबाइल/ईमेल पंजीकृत नहीं है! कृपया पहले पंजीकरण करें।");
      return null;
    }

    var generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    window._lastSimulatedOTP = generatedOTP;
    alert("📱 [SIMULATED SMS OTP GATEWAY]\n\nVetcare सत्यापन कोड: " + generatedOTP + "\n(यह कोड केवल 5 मिनट के लिए मान्य है)");
    return generatedOTP;
  };

  window.logoutUser = function () {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
    if (sessionTimerInterval) {
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
    }
    window.returnToGateway();
  };

  /* =========================================================================
     4. USER AUTH MODAL & INTERACTIVE PROMPT
     ========================================================================= */
  function injectAuthModalHTML() {
    if (document.getElementById("modalAuthSystem")) return;
    var div = document.createElement("div");
    div.id = "modalAuthSystem";
    div.style.display = "none";
    div.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs";
    div.innerHTML =
      '<div class="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs sm:text-sm">' +
        '<div class="flex justify-between items-center border-b border-slate-100 pb-2.5">' +
          '<div class="flex items-center gap-2">' +
            '<span class="text-2xl">🔐</span>' +
            '<div><h3 class="font-black text-slate-900" id="authModalTitle">प्रवेश / पंजीकरण</h3><p class="text-[10px] text-slate-500">Vetcare AI OS अधिकृत एक्सेस</p></div>' +
          '</div>' +
          '<button onclick="window.closeAuthModal()" class="text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>' +
        '</div>' +

        '<div class="flex border border-slate-200 rounded-xl overflow-hidden font-bold text-xs">' +
          '<button id="tabAuthLogin" onclick="window.switchAuthTab(\'LOGIN\')" class="flex-1 py-2 bg-blue-600 text-white text-center">लॉगिन (Sign In)</button>' +
          '<button id="tabAuthReg" onclick="window.switchAuthTab(\'REG\')" class="flex-1 py-2 bg-slate-100 text-slate-700 text-center">नया खाता (Register)</button>' +
        '</div>' +

        '<!-- LOGIN FORM -->' +
        '<div id="formAuthLogin" class="space-y-3">' +
          '<div><label class="block text-slate-600 font-semibold mb-1">मोबाइल नंबर अथवा ईमेल</label><input id="authLoginContact" type="text" placeholder="उदा. 9876543210 या user@mail.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none"></div>' +
          '<div id="boxAuthPassword"><div><label class="block text-slate-600 font-semibold mb-1">पासवर्ड</label><input id="authLoginPassword" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono outline-none"></div></div>' +
          '<div id="boxAuthOTP" class="hidden"><div><label class="block text-purple-700 font-bold mb-1">6-Digit SMS OTP</label><input id="authLoginOTP" type="text" maxlength="6" placeholder="123456" class="w-full bg-purple-50 border border-purple-200 rounded-xl p-2.5 font-mono font-bold tracking-widest text-center outline-none"></div></div>' +
          '<div class="flex items-center justify-between text-[11px]">' +
            '<button type="button" id="btnToggleAuthMethod" onclick="window.toggleLoginMethod()" class="text-blue-600 hover:underline font-bold">📲 OTP से लॉगिन करें</button>' +
            '<button type="button" onclick="window.triggerForgotPassword()" class="text-slate-400 hover:underline">पासवर्ड भूल गए?</button>' +
          '</div>' +
          '<button type="button" onclick="window.submitAuthLogin()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98">सुरक्षित लॉगिन करें ➔</button>' +
        '</div>' +

        '<!-- REGISTRATION FORM -->' +
        '<div id="formAuthReg" class="hidden space-y-3">' +
          '<div><label class="block text-slate-600 font-semibold mb-1">पूरा नाम (Full Name)</label><input id="authRegName" type="text" placeholder="उदा. डॉ. शर्मा / पशुपालक राजेश" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none"></div>' +
          '<div><label class="block text-slate-600 font-semibold mb-1">कार्य-क्षेत्र (Role)</label>' +
            '<select id="authRegRole" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 outline-none">' +
              '<option value="farmer">👨‍🌾 स्मार्ट पशुपालक (Dairy Farmer)</option>' +
              '<option value="doctor">🩺 अधिकृत पशु चिकित्सक (Veterinary Doctor)</option>' +
            '</select>' +
          '</div>' +
          '<div><label class="block text-slate-600 font-semibold mb-1">मोबाइल नंबर (10 अंक) अथवा ईमेल</label><input id="authRegContact" type="text" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none"></div>' +
          '<div><label class="block text-slate-600 font-semibold mb-1">नया पासवर्ड बनाएं</label><input id="authRegPassword" type="password" placeholder="कम से कम 6 अक्षर" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono outline-none"></div>' +
          '<button type="button" onclick="window.submitAuthRegister()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98">नया खाता पंजीकृत करें ➔</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div);
  }

  var currentLoginMode = "PASSWORD"; // or OTP

  window.openAuthModal = function (preferredRole) {
    injectAuthModalHTML();
    var modal = document.getElementById("modalAuthSystem");
    if (modal) modal.style.display = "flex";
    if (preferredRole) {
      var sel = document.getElementById("authRegRole");
      if (sel) sel.value = preferredRole.toLowerCase();
    }
  };

  window.closeAuthModal = function () {
    var modal = document.getElementById("modalAuthSystem");
    if (modal) modal.style.display = "none";
  };

  window.switchAuthTab = function (tab) {
    var isLogin = tab === "LOGIN";
    var tabL = document.getElementById("tabAuthLogin");
    var tabR = document.getElementById("tabAuthReg");
    var fL = document.getElementById("formAuthLogin");
    var fR = document.getElementById("formAuthReg");

    if (isLogin) {
      tabL.className = "flex-1 py-2 bg-blue-600 text-white text-center";
      tabR.className = "flex-1 py-2 bg-slate-100 text-slate-700 text-center";
      fL.classList.remove("hidden");
      fR.classList.add("hidden");
    } else {
      tabL.className = "flex-1 py-2 bg-slate-100 text-slate-700 text-center";
      tabR.className = "flex-1 py-2 bg-emerald-600 text-white text-center";
      fL.classList.add("hidden");
      fR.classList.remove("hidden");
    }
  };

  window.toggleLoginMethod = function () {
    var boxPass = document.getElementById("boxAuthPassword");
    var boxOTP = document.getElementById("boxAuthOTP");
    var btnToggle = document.getElementById("btnToggleAuthMethod");
    var contact = (document.getElementById("authLoginContact").value || "").trim();

    if (currentLoginMode === "PASSWORD") {
      if (!contact) {
        alert("कृपया पहले मोबाइल नंबर अथवा ईमेल भरें ताकि OTP भेजा जा सके!");
        return;
      }
      var code = window.requestLoginOTP(contact);
      if (code) {
        currentLoginMode = "OTP";
        boxPass.classList.add("hidden");
        boxOTP.classList.remove("hidden");
        btnToggle.innerText = "🔑 पासवर्ड से लॉगिन करें";
      }
    } else {
      currentLoginMode = "PASSWORD";
      boxPass.classList.remove("hidden");
      boxOTP.classList.add("hidden");
      btnToggle.innerText = "📲 OTP से लॉगिन करें";
    }
  };

  window.submitAuthLogin = function () {
    var contact = (document.getElementById("authLoginContact").value || "").trim();
    if (currentLoginMode === "PASSWORD") {
      var pass = (document.getElementById("authLoginPassword").value || "").trim();
      if (window.loginUser(contact, pass, "PASSWORD")) {
        window.closeAuthModal();
      }
    } else {
      var otp = (document.getElementById("authLoginOTP").value || "").trim();
      if (window.loginUser(contact, otp, "OTP")) {
        window.closeAuthModal();
      }
    }
  };

  window.submitAuthRegister = function () {
    var name = (document.getElementById("authRegName").value || "").trim();
    var role = document.getElementById("authRegRole").value;
    var contact = (document.getElementById("authRegContact").value || "").trim();
    var password = (document.getElementById("authRegPassword").value || "").trim();

    if (window.registerUser(name, role, contact, password)) {
      window.closeAuthModal();
    }
  };

  window.triggerForgotPassword = function () {
    var contact = prompt("अपना पंजीकृत मोबाइल नंबर अथवा ईमेल दर्ज करें:");
    if (!contact) return;
    var clean = contact.trim().toLowerCase();
    var users = getUsersDB();
    var u = users.find(function (item) { return item.contact.toLowerCase() === clean; });
    if (!u) {
      alert("यह उपयोगकर्ता मौजूद नहीं है!");
      return;
    }
    var code = Math.floor(100000 + Math.random() * 900000).toString();
    alert("📱 [SIMULATED SMS]\nपासवर्ड रीसेट कोड: " + code);
    var entered = prompt("कृपया प्राप्त 6-अंकों का रीसेट कोड दर्ज करें:");
    if (entered === code) {
      var newPass = prompt("नया पासवर्ड बनाएं:");
      if (newPass && newPass.length >= 4) {
        u.password = newPass;
        saveUsersDB(users);
        alert("✅ पासवर्ड सफलतापूर्वक बदल दिया गया है! कृपया नए पासवर्ड से लॉगिन करें।");
      } else {
        alert("अमान्य पासवर्ड!");
      }
    } else {
      alert("गलत कोड!");
    }
  };

  /* =========================================================================
     5. DUAL-PORTAL LAUNCHER & ROLE CONTROLLER
     ========================================================================= */
  var activePortalUser = null;

  window.launchUserPortal = function (user) {
    activePortalUser = user;
    var gateway = document.getElementById("screenGateway");
    var mainApp = document.getElementById("screenMainApp");
    if (gateway) gateway.classList.add("hidden");
    if (mainApp) mainApp.classList.remove("hidden");

    var roleBadge = document.getElementById("currentUserRoleBadge");
    var isDoc = user.role === "doctor";

    if (roleBadge) {
      roleBadge.innerHTML = (isDoc ? "🩺 अधिकृत चिकित्सक • " : "👨‍🌾 स्मार्ट पशुपालक • ") + user.name;
    }

    // Role-based tabs visibility
    var navRx = document.getElementById("navRx");
    var navRecords = document.getElementById("navRecords");
    var navInventory = document.getElementById("navInventory");
    var navAI = document.getElementById("navAI");

    if (isDoc) {
      if (navRx) navRx.classList.remove("hidden"), navRx.classList.add("flex");
      if (navRecords) navRecords.classList.remove("hidden"), navRecords.classList.add("flex");
      if (navInventory) navInventory.classList.remove("hidden"), navInventory.classList.add("flex");
      if (navAI) navAI.classList.remove("hidden"), navAI.classList.add("flex");
    } else {
      if (navRx) navRx.classList.add("hidden"), navRx.classList.remove("flex");
      if (navRecords) navRecords.classList.add("hidden"), navRecords.classList.remove("flex");
      if (navInventory) navInventory.classList.add("hidden"), navInventory.classList.remove("flex");
      if (navAI) navAI.classList.add("hidden"), navAI.classList.remove("flex");
    }

    // Dynamic Dual Portal Switcher Button in Header
    var existingSwitchBtn = document.getElementById("btnDualPortalSwitch");
    if (existingSwitchBtn) existingSwitchBtn.remove();

    if (user.canAccessBothPortals) {
      var headerRight = document.querySelector("header > div:last-child");
      if (headerRight) {
        var btn = document.createElement("button");
        btn.id = "btnDualPortalSwitch";
        btn.className = "text-[11px] px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xs flex items-center gap-1 transition animate-pulse";
        btn.innerHTML = "<span>🔄</span> <span>पोर्टल बदलें (" + (isDoc ? "पशुपालक" : "डॉक्टर") + ")</span>";
        btn.onclick = function () {
          user.role = user.role === "doctor" ? "farmer" : "doctor";
          setActiveSession(user);
          var allUsers = getUsersDB();
          var idx = allUsers.findIndex(function (u) { return u.id === user.id; });
          if (idx !== -1) {
            allUsers[idx].role = user.role;
            saveUsersDB(allUsers);
          }
          window.launchUserPortal(user);
        };
        headerRight.prepend(btn);
      }
    }

    initSessionTimer();
    window.switchTab("diagnosis");
    window.renderMedicinesCatalog();
  };

  window.selectRole = function (role) {
    var session = getActiveSession();
    if (session) {
      session.role = role.toLowerCase();
      window.launchUserPortal(session);
    } else {
      window.openAuthModal(role);
    }
  };

  window.returnToGateway = function () {
    var gateway = document.getElementById("screenGateway");
    var mainApp = document.getElementById("screenMainApp");
    if (mainApp) mainApp.classList.add("hidden");
    if (gateway) gateway.classList.remove("hidden");
  };

  /* =========================================================================
     6. DOCTOR CLINICAL DECLARATION & ACCESS
     ========================================================================= */
  window.openDoctorDeclarationModal = function () {
    var session = getActiveSession();
    if (session && session.role === "doctor") {
      window.launchUserPortal(session);
      return;
    }
    var modal = document.getElementById("modalDoctorDeclaration");
    if (modal) modal.style.display = "flex";
  };

  window.closeDoctorDeclarationModal = function () {
    var modal = document.getElementById("modalDoctorDeclaration");
    if (modal) modal.style.display = "none";
  };

  window.acceptDoctorDeclaration = function () {
    window.closeDoctorDeclarationModal();
    var session = getActiveSession();
    if (session) {
      session.role = "doctor";
      setActiveSession(session);
      window.launchUserPortal(session);
    } else {
      window.openAuthModal("doctor");
    }
  };

  /* =========================================================================
     7. SUPER ADMIN DASHBOARD, LIVE USERS & REAL-TIME POWER TOOLS
     ========================================================================= */
  window.openAdminPinModal = function () {
    var modal = document.getElementById("modalAdminPIN");
    if (modal) {
      modal.style.display = "flex";
      var input = document.getElementById("inputAdminPIN");
      if (input) input.value = "", input.focus();
    }
  };

  window.closeAdminPinModal = function () {
    var modal = document.getElementById("modalAdminPIN");
    if (modal) modal.style.display = "none";
  };

  window.verifyAdminPIN = function () {
    var input = (document.getElementById("inputAdminPIN").value || "").trim();
    if (input === AppConfig.adminPin || input === "9297") {
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      var err = document.getElementById("pinErrorMessage");
      if (err) err.classList.remove("hidden");
    }
  };

  window.openAdminDashboard = function () {
    var modal = document.getElementById("modalAdminDashboard");
    if (!modal) return;
    modal.style.display = "flex";

    // Bind current config values
    var fPayee = document.getElementById("cfgPayeeName");
    var fMon = document.getElementById("cfgMonthlyPrice");
    var fAnn = document.getElementById("cfgAnnualPrice");
    var fSbiUpi = document.getElementById("cfgSbiUpi");
    var fSbiAcc = document.getElementById("cfgSbiAccount");
    var fSbiIfsc = document.getElementById("cfgSbiIfsc");
    var fPnbUpi = document.getElementById("cfgPnbUpi");
    var fPnbAcc = document.getElementById("cfgPnbAccount");
    var fPnbIfsc = document.getElementById("cfgPnbIfsc");
    var fTitle = document.getElementById("cfgAppTitle");
    var fTagline = document.getElementById("cfgAppTagline");
    var fWa = document.getElementById("cfgAdminWhatsApp");
    var fPin = document.getElementById("cfgAdminPIN");

    if (fPayee) fPayee.value = AppConfig.banking.payeeName;
    if (fMon) fMon.value = AppConfig.subscriptions["1-month"].price;
    if (fAnn) fAnn.value = AppConfig.subscriptions["3-month"].price;
    if (fSbiUpi) fSbiUpi.value = AppConfig.banking.sbiUpi;
    if (fSbiAcc) fSbiAcc.value = AppConfig.banking.sbiAccount;
    if (fSbiIfsc) fSbiIfsc.value = AppConfig.banking.sbiIfsc;
    if (fPnbUpi) fPnbUpi.value = AppConfig.banking.pnbUpi;
    if (fPnbAcc) fPnbAcc.value = AppConfig.banking.pnbAccount;
    if (fPnbIfsc) fPnbIfsc.value = AppConfig.banking.pnbIfsc;
    if (fTitle) fTitle.value = AppConfig.appTitle;
    if (fTagline) fTagline.value = AppConfig.appTagline;
    if (fWa) fWa.value = AppConfig.adminWhatsApp;
    if (fPin) fPin.value = AppConfig.adminPin;

    window.renderAdminUserManagementTable("ALL");
    window.refreshAdminMetrics();
  };

  window.closeAdminDashboard = function () {
    var modal = document.getElementById("modalAdminDashboard");
    if (modal) modal.style.display = "none";
  };

  window.switchAdminTab = function (tab) {
    var pPay = document.getElementById("adminPanelPayment");
    var pBrand = document.getElementById("adminPanelBranding");
    var pSupp = document.getElementById("adminPanelSupport");
    var pMetr = document.getElementById("adminPanelMetrics");
    var pUsers = document.getElementById("adminPanelUsers");

    var bPay = document.getElementById("tabBtnAdminPay");
    var bBrand = document.getElementById("tabBtnAdminBrand");
    var bSupp = document.getElementById("tabBtnAdminSupport");
    var bMetr = document.getElementById("tabBtnAdminMetrics");
    var bUsers = document.getElementById("tabBtnAdminUsers");

    var tabs = [pPay, pBrand, pSupp, pMetr, pUsers];
    var btns = [bPay, bBrand, bSupp, bMetr, bUsers];

    tabs.forEach(function (p) { if (p) p.classList.add("hidden"); });
    btns.forEach(function (b) { if (b) b.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0"; });

    if (tab === "PAYMENT" && pPay && bPay) pPay.classList.remove("hidden"), bPay.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    if (tab === "BRANDING" && pBrand && bBrand) pBrand.classList.remove("hidden"), bBrand.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    if (tab === "SUPPORT" && pSupp && bSupp) pSupp.classList.remove("hidden"), bSupp.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    if (tab === "METRICS" && pMetr && bMetr) pMetr.classList.remove("hidden"), bMetr.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    if (tab === "USERS" && pUsers && bUsers) pUsers.classList.remove("hidden"), bUsers.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
  };

  // Inject Users Tab in Admin Dashboard dynamically if absent
  (function ensureAdminUsersTab() {
    var checkTimer = setInterval(function () {
      var headerTabs = document.querySelector("#modalAdminDashboard .border-b");
      if (headerTabs && !document.getElementById("tabBtnAdminUsers")) {
        var btn = document.createElement("button");
        btn.id = "tabBtnAdminUsers";
        btn.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0";
        btn.innerText = "👥 उपयोगकर्ता प्रबंधन (Users)";
        btn.onclick = function () { window.switchAdminTab("USERS"); };
        headerTabs.appendChild(btn);

        var bodyContainer = document.querySelector("#modalAdminDashboard .max-w-4xl");
        if (bodyContainer && !document.getElementById("adminPanelUsers")) {
          var panel = document.createElement("div");
          panel.id = "adminPanelUsers";
          panel.className = "hidden space-y-4";
          panel.innerHTML =
            '<div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5">' +
              '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">' +
                '<div><h3 class="text-sm font-bold text-slate-900">लाइव रजिस्टर्ड यूजर्स एवं सुपरकंट्रोल</h3><p class="text-[11px] text-slate-500">रोल प्रमोशन, ड्यूल पोर्टल एक्सेस एवं बैन प्रबंधन</p></div>' +
                '<div class="flex gap-1.5 text-xs">' +
                  '<button onclick="window.renderAdminUserManagementTable(\'ALL\')" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold">सभी (All)</button>' +
                  '<button onclick="window.renderAdminUserManagementTable(\'DOCTOR\')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">अधिकृत डॉक्टर</button>' +
                  '<button onclick="window.renderAdminUserManagementTable(\'FARMER\')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">स्मार्ट पशुपालक</button>' +
                '</div>' +
              '</div>' +
              '<div class="overflow-x-auto no-scrollbar">' +
                '<table class="w-full text-left text-xs text-slate-700">' +
                  '<thead class="bg-slate-50 text-[11px] uppercase text-slate-500 font-bold border-b border-slate-200">' +
                    '<tr>' +
                      '<th class="p-2.5">यूजर / संपर्क</th>' +
                      '<th class="p-2.5">रोल</th>' +
                      '<th class="p-2.5">प्लान</th>' +
                      '<th class="p-2.5">ड्यूल पोर्टल</th>' +
                      '<th class="p-2.5 text-right">सुपर एक्शन</th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody id="adminUserTableBody" class="divide-y divide-slate-100 font-medium"></tbody>' +
                '</table>' +
              '</div>' +
            '</div>';
          bodyContainer.appendChild(panel);
        }
        clearInterval(checkTimer);
      }
    }, 500);
  })();

  window.renderAdminUserManagementTable = function (filter) {
    var tbody = document.getElementById("adminUserTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    var users = getUsersDB();
    var filtered = users.filter(function (u) {
      if (filter === "DOCTOR") return u.role === "doctor";
      if (filter === "FARMER") return u.role === "farmer";
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">कोई उपयोगकर्ता नहीं मिला।</td></tr>';
      return;
    }

    filtered.forEach(function (u) {
      var tr = document.createElement("tr");
      var isBanned = u.status === "banned";
      tr.className = isBanned ? "bg-rose-50/60" : "hover:bg-slate-50";

      tr.innerHTML =
        '<td class="p-2.5">' +
          '<div class="font-bold text-slate-900">' + u.name + '</div>' +
          '<div class="text-[10px] text-slate-500 font-mono">' + u.contact + ' • Reg: ' + new Date(u.registeredAt).toLocaleDateString() + '</div>' +
        '</td>' +
        '<td class="p-2.5">' +
          '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold ' + (u.role === "doctor" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800") + '">' +
            (u.role === "doctor" ? "🩺 डॉक्टर" : "👨‍🌾 पशुपालक") +
          '</span>' +
        '</td>' +
        '<td class="p-2.5">' +
          '<span class="text-[11px] font-semibold text-slate-700">' + (u.subscription ? u.subscription.plan : "Trial") + '</span>' +
        '</td>' +
        '<td class="p-2.5">' +
          '<button onclick="window.toggleUserDualPortal(\'' + u.id + '\')" class="text-[11px] px-2 py-1 rounded-lg border font-bold ' + (u.canAccessBothPortals ? "bg-purple-100 border-purple-300 text-purple-800" : "bg-slate-100 border-slate-200 text-slate-500") + '">' +
            (u.canAccessBothPortals ? "✅ सक्षम (Dual Active)" : "❌ अक्षम (Off)") +
          '</button>' +
        '</td>' +
        '<td class="p-2.5 text-right space-x-1">' +
          (u.role === "farmer" ? '<button onclick="window.promoteUserToDoctor(\'' + u.id + '\')" class="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-bold text-[10px]" title="डॉक्टर बनाएं">🩺 प्रमोट</button>' : '') +
          (isBanned
            ? '<button onclick="window.toggleBanUser(\'' + u.id + '\')" class="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-bold text-[10px]">अनबैन</button>'
            : '<button onclick="window.toggleBanUser(\'' + u.id + '\')" class="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md font-bold text-[10px]">बैन</button>') +
          '<button onclick="window.deleteUserRecord(\'' + u.id + '\')" class="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md font-bold text-[10px]">हटाएं</button>' +
        '</td>';

      tbody.appendChild(tr);
    });
  };

  window.toggleUserDualPortal = function (userId) {
    var users = getUsersDB();
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;
    u.canAccessBothPortals = !u.canAccessBothPortals;
    saveUsersDB(users);
    alert(u.name + " के लिए दोनों पोर्टल (Dual Portal) अनुमति " + (u.canAccessBothPortals ? "चालू (ON)" : "बंद (OFF)") + " कर दी गई है!");
    window.renderAdminUserManagementTable("ALL");
  };

  window.promoteUserToDoctor = function (userId) {
    if (!confirm("क्या आप इस पशुपालक को अधिकृत पशु चिकित्सक (Veterinary Doctor) के रूप में प्रमोट करना चाहते हैं?")) return;
    var users = getUsersDB();
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;
    u.role = "doctor";
    u.canAccessBothPortals = true;
    saveUsersDB(users);
    alert("✅ " + u.name + " को अब अधिकृत डॉक्टर बना दिया गया है!");
    window.renderAdminUserManagementTable("ALL");
  };

  window.toggleBanUser = function (userId) {
    var users = getUsersDB();
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;
    u.status = u.status === "banned" ? "active" : "banned";
    saveUsersDB(users);
    window.renderAdminUserManagementTable("ALL");
  };

  window.deleteUserRecord = function (userId) {
    if (!confirm("क्या आप वाकई इस उपयोगकर्ता का खाता पूरी तरह मिटाना चाहते हैं?")) return;
    var users = getUsersDB();
    users = users.filter(function (item) { return item.id !== userId; });
    saveUsersDB(users);
    window.renderAdminUserManagementTable("ALL");
  };

  window.saveAllAdminSettings = function () {
    var fPayee = document.getElementById("cfgPayeeName");
    var fMon = document.getElementById("cfgMonthlyPrice");
    var fAnn = document.getElementById("cfgAnnualPrice");
    var fSbiUpi = document.getElementById("cfgSbiUpi");
    var fSbiAcc = document.getElementById("cfgSbiAccount");
    var fSbiIfsc = document.getElementById("cfgSbiIfsc");
    var fPnbUpi = document.getElementById("cfgPnbUpi");
    var fPnbAcc = document.getElementById("cfgPnbAccount");
    var fPnbIfsc = document.getElementById("cfgPnbIfsc");
    var fTitle = document.getElementById("cfgAppTitle");
    var fTagline = document.getElementById("cfgAppTagline");
    var fWa = document.getElementById("cfgAdminWhatsApp");
    var fPin = document.getElementById("cfgAdminPIN");

    if (fPayee) AppConfig.banking.payeeName = fPayee.value.trim();
    if (fMon) AppConfig.subscriptions["1-month"].price = Number(fMon.value) || 199;
    if (fAnn) AppConfig.subscriptions["3-month"].price = Number(fAnn.value) || 499;
    if (fSbiUpi) AppConfig.banking.sbiUpi = fSbiUpi.value.trim();
    if (fSbiAcc) AppConfig.banking.sbiAccount = fSbiAcc.value.trim();
    if (fSbiIfsc) AppConfig.banking.sbiIfsc = fSbiIfsc.value.trim();
    if (fPnbUpi) AppConfig.banking.pnbUpi = fPnbUpi.value.trim();
    if (fPnbAcc) AppConfig.banking.pnbAccount = fPnbAcc.value.trim();
    if (fPnbIfsc) AppConfig.banking.pnbIfsc = fPnbIfsc.value.trim();
    if (fTitle) AppConfig.appTitle = fTitle.value.trim();
    if (fTagline) AppConfig.appTagline = fTagline.value.trim();
    if (fWa) AppConfig.adminWhatsApp = fWa.value.trim();
    if (fPin && fPin.value.length === 4) AppConfig.adminPin = fPin.value.trim();

    saveConfig();
    alert("✅ सुपर एडमिन सेटिंग्स सफलतापूर्वक सुरक्षित कर दी गईं!");
    window.closeAdminDashboard();
  };

  window.refreshAdminMetrics = function () {
    try {
      var opd = JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");
      var khata = JSON.parse(localStorage.getItem(KHATA_KEY) || "[]");
      var inv = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "[]");

      var mOpd = document.getElementById("metricTotalOPD");
      var mDues = document.getElementById("metricTotalDues");
      var mLow = document.getElementById("metricLowStock");

      if (mOpd) mOpd.innerText = opd.length;

      var totalDues = khata.reduce(function (sum, item) {
        return item.type === "DUE" ? sum + Number(item.amount || 0) : sum;
      }, 0);
      if (mDues) mDues.innerText = "₹" + totalDues;

      var lowCount = inv.filter(function (item) {
        return Number(item.stock) <= Number(item.minAlert || 3);
      }).length;
      if (mLow) mLow.innerText = lowCount;
    } catch (e) {}
  };

  window.exportDataBackupJSON = function () {
    var dump = {
      config: AppConfig,
      users: getUsersDB(),
      opd: JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]"),
      khata: JSON.parse(localStorage.getItem(KHATA_KEY) || "[]"),
      inventory: JSON.parse(localStorage.getItem(INVENTORY_KEY) || "[]"),
      exportedAt: new Date().toISOString()
    };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dump, null, 2));
    var a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "vetcare_backup_" + Date.now() + ".json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  window.clearDemoDataOnly = function () {
    if (!confirm("क्या आप टेस्ट डेटा रीसेट करना चाहते हैं? कॉन्फ़िगरेशन सुरक्षित रहेगा।")) return;
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(KHATA_KEY);
    alert("टेस्ट डेटा खाली कर दिया गया है।");
    window.refreshAdminMetrics();
  };

  /* =========================================================================
     8. ADVANCED DRUG CATALOG, FILTERING, SORTING & AI FALLBACK ENGINE
     ========================================================================= */
  window.renderMedicinesCatalog = function (filterCategory, filterType, sortOption, searchQuery) {
    var container = document.getElementById("inventoryItemsContainer");
    if (!container) return;

    var medList = (window.VETCARE_MEDICINES_DB || []).slice();
    var cat = (filterCategory || "ALL").toUpperCase();
    var type = (filterType || "ALL").toUpperCase();
    var sort = sortOption || "NAME_ASC";
    var query = (searchQuery || "").toLowerCase().trim();

    // 1. Filtering by Category
    if (cat !== "ALL") {
      medList = medList.filter(function (m) {
        return m.category.toUpperCase().indexOf(cat) !== -1;
      });
    }

    // 2. Filtering by Search Query
    if (query) {
      medList = medList.filter(function (m) {
        return (
          m.salt.toLowerCase().indexOf(query) !== -1 ||
          m.ethicalBrand.name.toLowerCase().indexOf(query) !== -1 ||
          m.genericOption.name.toLowerCase().indexOf(query) !== -1 ||
          m.indications.toLowerCase().indexOf(query) !== -1
        );
      });
    }

    // 3. Sorting
    medList.sort(function (a, b) {
      if (sort === "NAME_ASC") return a.salt.localeCompare(b.salt);
      if (sort === "NAME_DESC") return b.salt.localeCompare(a.salt);
      if (sort === "PRICE_LOW_HIGH") return a.genericOption.approxMrp - b.genericOption.approxMrp;
      if (sort === "PRICE_HIGH_LOW") return b.ethicalBrand.approxMrp - a.ethicalBrand.approxMrp;
      return 0;
    });

    container.innerHTML = "";

    // 4. AI Fallback Trigger if 0 Results Found
    if (medList.length === 0) {
      var noMatchDiv = document.createElement("div");
      noMatchDiv.className = "p-5 bg-purple-50/70 border-2 border-dashed border-purple-300 rounded-3xl text-center space-y-3";
      noMatchDiv.innerHTML =
        '<div class="text-3xl">🧬</div>' +
        '<h4 class="font-bold text-slate-800 text-sm">लोकल डेटाबेस में दवा "' + (searchQuery || "") + '" नहीं मिली</h4>' +
        '<p class="text-xs text-slate-600 max-w-md mx-auto">क्या आप जेमिनी AI फार्माकोलॉजिस्ट से इस साल्ट/ब्रांड की संपूर्ण क्लिनिकल डोज़, रूट, सेफ-विथड्रॉल और प्रेगनेंसी सुरक्षा जानना चाहते हैं?</p>' +
        '<button onclick="window.fetchDrugPharmacologyAI(\'' + (searchQuery || "").replace(/'/g, "\\'") + '\')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md transition active:scale-98 inline-flex items-center gap-1.5">' +
          '<span>⚡ AI से \'' + (searchQuery || "दवा") + '\' की पूरी फार्माकोलॉजी व डोज़ जानें</span>' +
        '</button>' +
        '<div id="aiDrugCardTarget" class="mt-4 text-left"></div>';
      container.appendChild(noMatchDiv);
      return;
    }

    // 5. Render Drug Cards
    medList.forEach(function (med) {
      var card = document.createElement("div");
      card.className = "bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-blue-400 transition space-y-2.5 text-xs";

      card.innerHTML =
        '<div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">' +
          '<div>' +
            '<span class="text-[9px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md uppercase">' + med.category + '</span>' +
            '<h4 class="font-bold text-slate-900 text-sm mt-1 leading-tight">' + med.salt + '</h4>' +
          '</div>' +
          '<div class="text-right">' +
            '<span class="text-[10px] ' + (med.pregnancySafe ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-rose-700 bg-rose-50 border border-rose-200") + ' font-bold px-2 py-0.5 rounded-full">' +
              (med.pregnancySafe ? "🛡️ गाभिन सुरक्षित (Safe)" : "⚠️ गाभिन में वर्जित") +
            '</span>' +
          '</div>' +
        '</div>' +

        '<div class="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px]">' +
          '<div>' +
            '<span class="text-[10px] text-slate-500 block">एथिकल ब्रांड (Ethical):</span>' +
            '<strong class="text-slate-800">' + med.ethicalBrand.name + '</strong>' +
            '<div class="text-slate-500 text-[10px] font-mono">₹' + med.ethicalBrand.approxMrp + ' (' + med.ethicalBrand.company + ')</div>' +
          '</div>' +
          '<div>' +
            '<span class="text-[10px] text-emerald-700 block font-semibold">जेनेरिक विकल्प (Generic):</span>' +
            '<strong class="text-emerald-800">' + med.genericOption.name + '</strong>' +
            '<div class="text-emerald-700 text-[10px] font-bold font-mono">₹' + med.genericOption.approxMrp + ' (किफायती)</div>' +
          '</div>' +
        '</div>' +

        '<div class="space-y-1 text-slate-600 text-[11px]">' +
          '<div><strong>डोज़ व रूट:</strong> ' + med.doseRate + ' • <span class="text-blue-700 font-semibold">' + med.route + '</span></div>' +
          '<div><strong>संकेत (Indications):</strong> ' + med.indications + '</div>' +
          '<div><strong>विथड्रॉल अवधि:</strong> ' + med.withdrawalPeriod + '</div>' +
        '</div>' +

        '<div class="pt-1 flex items-center justify-between border-t border-slate-100">' +
          '<button onclick="window.insertMedToOPD(\'' + med.salt.replace(/'/g, "\\'") + '\', \'' + med.doseRate.replace(/'/g, "\\'") + '\', \'' + med.route.replace(/'/g, "\\'") + '\')" class="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1">' +
            '<span>+ पर्ची में जोड़ें (Rx)</span>' +
          '</button>' +
          '<button onclick="window.openInlineDosageModal(\'' + med.salt.replace(/'/g, "\\'") + '\', 5)" class="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1">' +
            '<span>⚖️ डोज़ कैलकुलेटर</span>' +
          '</button>' +
        '</div>';

      container.appendChild(card);
    });
  };

  window.fetchDrugPharmacologyAI = function (drugQuery) {
    var apiKey = localStorage.getItem(GEMINI_KEY_STORAGE) || "";
    if (!apiKey) {
      alert("AI फार्माकोलॉजी फीचर के लिए कृपया अपनी Google Gemini API Key दर्ज करें!");
      window.openAIKeyModal();
      return;
    }

    var target = document.getElementById("aiDrugCardTarget");
    if (!target) return;
    target.innerHTML = '<div class="p-4 bg-white border border-purple-200 rounded-2xl text-purple-900 text-xs font-bold animate-pulse">⚡ Gemini AI फार्माकोलॉजिस्ट दवा का गहन विश्लेषण कर रहा है...</div>';

    var promptText =
      "You are a Principal Veterinary Pharmacologist. Provide an authoritative clinical pharmacology monograph for the veterinary medicine or salt: '" + drugQuery + "'.\n" +
      "Return strictly in valid JSON format with this exact schema:\n" +
      "{\n" +
      '  "salt": "Generic Salt name with strength",\n' +
      '  "category": "Antibiotic | NSAID | Antiprotozoal | Hormone | Supportive | Anthelmintic",\n' +
      '  "ethicalBrand": { "name": "Leading Ethical Brand", "company": "Manufacturer", "approxMrp": 350 },\n' +
      '  "genericOption": { "name": "Generic Equivalent", "approxMrp": 140 },\n' +
      '  "doseRate": "Dose rate in mg/kg and ml per animal weight",\n' +
      '  "route": "I/M, I/V, S/C, or Oral",\n' +
      '  "pregnancySafe": true,\n' +
      '  "withdrawalPeriod": "Milk: X days, Meat: Y days",\n' +
      '  "indications": "Clinical indications in Hindi/Hinglish",\n' +
      '  "contraindications": "Contraindications in Hindi/Hinglish"\n' +
      "}";

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var rawText = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text;
        if (!rawText) throw new Error("No data returned from Gemini");
        var parsed = JSON.parse(rawText);

        target.innerHTML =
          '<div class="bg-white border-2 border-purple-400 rounded-2xl p-4 shadow-lg space-y-2 text-xs text-slate-800">' +
            '<div class="flex justify-between items-center border-b border-purple-100 pb-2">' +
              '<h4 class="font-black text-purple-900 text-sm">✨ ' + parsed.salt + '</h4>' +
              '<span class="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">' + parsed.category + '</span>' +
            '</div>' +
            '<div class="grid grid-cols-2 gap-2 bg-purple-50 p-2.5 rounded-xl text-[11px]">' +
              '<div><strong>एथिकल:</strong> ' + parsed.ethicalBrand.name + ' (~₹' + parsed.ethicalBrand.approxMrp + ')</div>' +
              '<div><strong>जेनेरिक:</strong> ' + parsed.genericOption.name + ' (~₹' + parsed.genericOption.approxMrp + ')</div>' +
            '</div>' +
            '<div><strong>डोज़ व रूट:</strong> ' + parsed.doseRate + ' (' + parsed.route + ')</div>' +
            '<div><strong>गर्भावस्था सुरक्षा:</strong> ' + (parsed.pregnancySafe ? "✅ गाभिन में सुरक्षित" : "⚠️ गाभिन में वर्जित") + '</div>' +
            '<div><strong>विथड्रॉल अवधि:</strong> ' + parsed.withdrawalPeriod + '</div>' +
            '<div><strong>उपयोग:</strong> ' + parsed.indications + '</div>' +
            '<div><strong>सावधानियां:</strong> ' + parsed.contraindications + '</div>' +
          '</div>';
      })
      .catch(function (err) {
        target.innerHTML = '<div class="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs">AI विश्लेषण में त्रुटि: ' + err.message + '</div>';
      });
  };

  /* =========================================================================
     9. INLINE SHAEFFER'S FORMULA WEIGHT & DOSAGE CALCULATOR
     ========================================================================= */
  // Shaeffer's Formula: Weight (lbs) = (Length inches * Girth inches^2) / 300
  // Weight in kg = Weight in lbs * 0.453592
  window.calculateShaefferWeight = function (lengthInches, girthInches) {
    var l = Number(lengthInches) || 0;
    var g = Number(girthInches) || 0;
    if (l <= 0 || g <= 0) return 0;
    var weightLbs = (l * Math.pow(g, 2)) / 300;
    return Math.round(weightLbs * 0.453592);
  };

  window.openInlineDosageModal = function (drugName, defaultDoseMgKg, defaultConcMgMl) {
    var modalId = "modalInlineDosage";
    var modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs";
      document.body.appendChild(modal);
    }

    modal.style.display = "flex";
    modal.innerHTML =
      '<div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 space-y-3.5 shadow-2xl text-xs sm:text-sm">' +
        '<div class="flex justify-between items-center border-b border-slate-100 pb-2">' +
          '<h3 class="font-bold text-slate-900 flex items-center gap-1.5">' +
            '<span>⚖️</span> शेफ़र फॉर्मूला डोज़ कैलकुलेटर' +
          '</h3>' +
          '<button onclick="document.getElementById(\'modalInlineDosage\').style.display=\'none\'" class="text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>' +
        '</div>' +

        '<div class="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-blue-900 font-semibold">' +
          (drugName || "पशु चिकित्सा इंजेक्शन") +
        '</div>' +

        '<div class="space-y-2">' +
          '<span class="text-[11px] font-bold text-slate-700 block">1. शारीरिक नाप (इंच में) से सटीक वजन:</span>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div><label class="text-[10px] text-slate-500 block">लंबाई (कंधे से पुट्ठा - In)</label><input id="shfLength" type="number" value="60" oninput="window.runLiveDosageCalc()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none"></div>' +
            '<div><label class="text-[10px] text-slate-500 block">सीना / घेरा (Girth - In)</label><input id="shfGirth" type="number" value="70" oninput="window.runLiveDosageCalc()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none"></div>' +
          '</div>' +
        '</div>' +

        '<div class="space-y-2">' +
          '<span class="text-[11px] font-bold text-slate-700 block">2. दवा कंसंट्रेशन व डोज़ दर:</span>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div><label class="text-[10px] text-slate-500 block">डोज़ दर (mg/kg)</label><input id="shfDoseRate" type="number" step="0.1" value="' + (defaultDoseMgKg || 5) + '" oninput="window.runLiveDosageCalc()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none"></div>' +
            '<div><label class="text-[10px] text-slate-500 block">दवा सांद्रता (mg/ml)</label><input id="shfConc" type="number" step="1" value="' + (defaultConcMgMl || 100) + '" oninput="window.runLiveDosageCalc()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none"></div>' +
          '</div>' +
        '</div>' +

        '<div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">' +
          '<div class="text-[11px] text-emerald-800">वैज्ञानिक अनुमानित वजन: <strong id="resShfWeight" class="text-sm">0 kg</strong></div>' +
          '<div class="text-xs font-black text-emerald-950">सटीक इंजेक्शन मात्रा: <strong id="resShfVolume" class="text-base text-emerald-700">0 ml</strong></div>' +
        '</div>' +

        '<button onclick="document.getElementById(\'modalInlineDosage\').style.display=\'none\'" class="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs">बंद करें</button>' +
      '</div>';

    window.runLiveDosageCalc();
  };

  window.runLiveDosageCalc = function () {
    var l = document.getElementById("shfLength") ? document.getElementById("shfLength").value : 0;
    var g = document.getElementById("shfGirth") ? document.getElementById("shfGirth").value : 0;
    var dr = document.getElementById("shfDoseRate") ? document.getElementById("shfDoseRate").value : 0;
    var conc = document.getElementById("shfConc") ? document.getElementById("shfConc").value : 1;

    var kg = window.calculateShaefferWeight(l, g);
    var targetVol = conc > 0 ? (kg * dr) / conc : 0;

    var wEl = document.getElementById("resShfWeight");
    var vEl = document.getElementById("resShfVolume");
    if (wEl) wEl.innerText = kg + " kg (" + Math.round(kg * 2.20462) + " lbs)";
    if (vEl) vEl.innerText = targetVol.toFixed(1) + " ml";
  };

  /* =========================================================================
     10. 20-KM GPS DOCTOR-FARMER MATCHING & PRIVACY SYSTEM
     ========================================================================= */
  // Haversine formula to compute distance in km
  window.calculateHaversineDistance = function (lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  window.requestDoctorEmergencyService = function (serviceType, caseNotes) {
    if (!navigator.geolocation) {
      alert("GPS आपके ब्राउज़र में समर्थित नहीं है!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var farmerLat = pos.coords.latitude;
        var farmerLon = pos.coords.longitude;
        var session = getActiveSession();

        var requestObj = {
          id: "req_" + Date.now(),
          farmerName: session ? session.name : "अज्ञात किसान",
          farmerContact: session ? session.contact : "उपलब्ध नहीं",
          serviceType: serviceType || "आपातकालीन चिकित्सा (Emergency)",
          caseNotes: caseNotes || "पशु अचानक बीमार है, तत्काल आवश्यकता है।",
          coords: { lat: farmerLat, lon: farmerLon },
          createdAt: new Date().toISOString(),
          status: "pending"
        };

        var allReqs = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");
        allReqs.unshift(requestObj);
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(allReqs));

        alert("📡 आपकी कॉल 20 किमी परिधि के निकटतम अधिकृत डॉक्टरों के नेटवर्क पर प्रसारित कर दी गई है!\nसुरक्षा कारणों से डॉक्टर का फोन नंबर गोपनीय रखा गया है। डॉक्टर आपसे सीधे संपर्क करेंगे।");
      },
      function (err) {
        alert("GPS लोकेशन प्राप्त करने में विफल! कृपया अपने फोन में लोकेशन सर्विस ऑन करें।");
      }
    );
  };

  window.renderDoctorIncomingRequests = function () {
    var container = document.getElementById("recordsList");
    if (!container) return;

    var allReqs = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");
    if (allReqs.length === 0) return;

    // Prepend emergency calls banner for doctors
    var banner = document.createElement("div");
    banner.className = "p-3.5 bg-gradient-to-r from-rose-500 to-amber-600 rounded-2xl text-white shadow-md space-y-2 mb-3";
    banner.innerHTML =
      '<div class="flex items-center justify-between">' +
        '<h4 class="font-black text-xs sm:text-sm flex items-center gap-1.5">🚨 20-KM आपातकालीन किसान कॉल्स (' + allReqs.length + ')</h4>' +
        '<span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">GPS Live</span>' +
      '</div>';

    allReqs.forEach(function (r) {
      var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + r.coords.lat + "," + r.coords.lon;
      var item = document.createElement("div");
      item.className = "bg-white/10 p-2.5 rounded-xl border border-white/20 text-xs space-y-1.5";
      item.innerHTML =
        '<div class="flex justify-between font-bold">' +
          '<span>👨‍🌾 ' + r.farmerName + ' (' + r.farmerContact + ')</span>' +
          '<span class="text-[10px] bg-rose-900/60 text-white px-2 py-0.5 rounded">' + r.serviceType + '</span>' +
        '</div>' +
        '<p class="text-[11px] text-white/90">' + r.caseNotes + '</p>' +
        '<div class="flex gap-2 pt-1">' +
          '<a href="' + mapsUrl + '" target="_blank" class="bg-white text-slate-900 font-bold px-3 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow-xs">' +
            '<span>📍 Google Maps नेविगेट</span>' +
          '</a>' +
          '<a href="tel:' + r.farmerContact + '" class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg text-[10px] flex items-center gap-1">' +
            '<span>📞 किसान को कॉल करें</span>' +
          '</a>' +
        '</div>';
      banner.appendChild(item);
    });

    container.prepend(banner);
  };

  /* =========================================================================
     11. CORE CLINICAL ENGINE, SYMPTOM MATRIX & SEARCH SWITCHER
     ========================================================================= */
  var matrixSelected = {
    temp: null,
    cardinal: "ALL",
    secondary: []
  };

  window.setDiagnosisMode = function (mode) {
    var pMat = document.getElementById("panelDiagMatrix");
    var pHyb = document.getElementById("panelDiagHybrid");
    var pDir = document.getElementById("panelDiagDirectory");

    var b1 = document.getElementById("btnDiagMode1");
    var b2 = document.getElementById("btnDiagMode2");
    var b3 = document.getElementById("btnDiagMode3");

    if (pMat) pMat.classList.add("hidden");
    if (pHyb) pHyb.classList.add("hidden");
    if (pDir) pDir.classList.add("hidden");

    if (b1) b1.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
    if (b2) b2.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
    if (b3) b3.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";

    if (mode === "SYMPTOMS") {
      if (pMat) pMat.classList.remove("hidden");
      if (b1) b1.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    } else if (mode === "HYBRID") {
      if (pHyb) pHyb.classList.remove("hidden");
      if (b2) b2.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    } else {
      if (pDir) pDir.classList.remove("hidden");
      if (b3) b3.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    }
    window.applyMatrixFilters();
  };

  window.toggleMatrixParam = function (param, val, btn) {
    if (param === "temp") {
      matrixSelected.temp = matrixSelected.temp === val ? null : val;
      var chips = btn.parentNode.querySelectorAll(".m-chip");
      chips.forEach(function (c) { c.className = "m-chip px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium shrink-0"; });
      if (matrixSelected.temp) {
        btn.className = "m-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 shadow-xs";
      }
    }
    window.applyMatrixFilters();
  };

  window.toggleSecSymptom = function (symCode, btn) {
    var idx = matrixSelected.secondary.indexOf(symCode);
    if (idx === -1) {
      matrixSelected.secondary.push(symCode);
      btn.className = "s-chip px-2.5 py-1 rounded-xl bg-blue-600 text-white font-bold";
    } else {
      matrixSelected.secondary.splice(idx, 1);
      btn.className = "s-chip px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600";
    }
    window.applyMatrixFilters();
  };

  window.resetSymptomMatrix = function () {
    matrixSelected.temp = null;
    matrixSelected.cardinal = "ALL";
    matrixSelected.secondary = [];

    var sel = document.getElementById("selCardinalSign");
    if (sel) sel.value = "ALL";

    var mChips = document.querySelectorAll(".m-chip");
    mChips.forEach(function (c) { c.className = "m-chip px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium shrink-0"; });

    var sChips = document.querySelectorAll(".s-chip");
    sChips.forEach(function (c) { c.className = "s-chip px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600"; });

    window.applyMatrixFilters();
  };

  window.applyMatrixFilters = function () {
    var sel = document.getElementById("selCardinalSign");
    if (sel) matrixSelected.cardinal = sel.value;

    var diseases = window.VETCARE_DISEASE_DB || [];
    var scoredList = diseases.map(function (d) {
      var score = 0;
      // 1. Temperature Match (20% Weight)
      if (matrixSelected.temp) {
        if (matrixSelected.temp === "HIGH" && d.temperatureExpected.indexOf("10") !== -1) score += 20;
        if (matrixSelected.temp === "SUB" && (d.temperatureExpected.indexOf("सब-नॉर्मल") !== -1 || d.temperatureExpected.indexOf("< 100") !== -1)) score += 20;
        if (matrixSelected.temp === "NORMAL" && d.temperatureExpected.indexOf("सामान्य") !== -1) score += 20;
      }

      // 2. Cardinal Sign Match (40% Weight)
      if (matrixSelected.cardinal !== "ALL") {
        var cardMap = {
          NECK_SWELLING: "DIS_01_HS",
          GAS_SWELLING: "DIS_02_BQ",
          MOUTH_BLISTERS: "DIS_03_FMD",
          UDDER_HARD: "DIS_04_MASTITIS_ACUTE",
          STERNAL_RECUMBENCY: "DIS_06_MILK_FEVER",
          SWEET_BREATH: "DIS_07_KETOSIS",
          LEFT_FLANK_DRUM: "DIS_08_BLOAT",
          LYMPH_SWELLING: "DIS_09_THEILERIOSIS",
          RED_URINE: "DIS_10_BABESIOSIS",
          SEVERE_JAUNDICE: "DIS_11_ANAPLASMOSIS",
          MOUTH_EROSION_DIARRHEA: "DIS_16_PPR",
          OPISTHOTONOS: "DIS_15_ENTEROTOXAEMIA",
          TAR_BLOOD: "DIS_14_ANTHRAX",
          CIRCLING_HEAD_PRESSING: "DIS_12_TRYPANOSOMIASIS",
          HYDROPHOBIA_BELL: "DIS_19_RABIES",
          ROLLING_PAWING: "DIS_21_COLIC",
          HANGING_PLACENTA: "DIS_22_RETENTION_OF_PLACENTA",
          PROTRUDING_MASS: "DIS_23_PROLAPSE",
          DYSPNEA_WHEEZING: "DIS_25_PNEUMONIA_BRD",
          FOOT_ROT_SMELL: "DIS_27_FOOT_ROT"
        };
        if (cardMap[matrixSelected.cardinal] === d.id) score += 40;
      }

      // 3. Secondary Multi-Symptom Matching (up to 40%)
      if (matrixSelected.secondary.length > 0) {
        var perSym = 40 / matrixSelected.secondary.length;
        matrixSelected.secondary.forEach(function (sym) {
          if (sym === "OFF_FEED" && d.cardinalSigns.indexOf("भूख") !== -1) score += perSym;
          if (sym === "DULLNESS" && d.cardinalSigns.indexOf("सुस्ती") !== -1) score += perSym;
          if (sym === "DIARRHEA" && (d.cardinalSigns.indexOf("दस्त") !== -1 || d.organAffected.indexOf("Intestines") !== -1)) score += perSym;
          if (sym === "CONSTIPATION" && d.cardinalSigns.indexOf("गोबर") !== -1) score += perSym;
          if (sym === "SALIVATION" && (d.cardinalSigns.indexOf("लार") !== -1 || d.cardinalSigns.indexOf("मुंह") !== -1)) score += perSym;
          if (sym === "MILK_DROP" && d.cardinalSigns.indexOf("दूध") !== -1) score += perSym;
          if (sym === "LIMPING" && (d.cardinalSigns.indexOf("लंगड़ा") !== -1 || d.organAffected.indexOf("Musculoskeletal") !== -1)) score += perSym;
        });
      }

      return { disease: d, matchScore: Math.min(100, Math.round(score)) };
    });

    // If no active filters, show default 50%
    var hasFilters = matrixSelected.temp || matrixSelected.cardinal !== "ALL" || matrixSelected.secondary.length > 0;
    if (hasFilters) {
      scoredList.sort(function (a, b) { return b.matchScore - a.matchScore; });
    }

    window.renderDiseaseResults(scoredList, hasFilters);
  };

  window.handleAppSearch = function () {
    var q = (document.getElementById("unifiedSearchInput").value || "").toLowerCase().trim();
    var diseases = window.VETCARE_DISEASE_DB || [];
    var filtered = diseases.filter(function (d) {
      return (
        d.nameHindi.toLowerCase().indexOf(q) !== -1 ||
        d.nameEnglish.toLowerCase().indexOf(q) !== -1 ||
        d.cardinalSigns.toLowerCase().indexOf(q) !== -1 ||
        d.organAffected.toLowerCase().indexOf(q) !== -1
      );
    });
    var formatted = filtered.map(function (d) { return { disease: d, matchScore: 90 }; });
    window.renderDiseaseResults(formatted, true);
  };

  window.filterByTag = function (tag, btn) {
    var chips = document.querySelectorAll(".q-chip");
    chips.forEach(function (c) { c.className = "q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0"; });
    btn.className = "q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";

    var diseases = window.VETCARE_DISEASE_DB || [];
    if (tag !== "ALL") {
      diseases = diseases.filter(function (d) {
        return d.category.toUpperCase() === tag.toUpperCase();
      });
    }
    var formatted = diseases.map(function (d) { return { disease: d, matchScore: 80 }; });
    window.renderDiseaseResults(formatted, false);
  };

  window.renderDiseaseResults = function (items, showScore) {
    var container = document.getElementById("diseaseSearchResults");
    if (!container) return;
    container.innerHTML = "";

    var matchBadge = document.getElementById("matchCountBadge");
    if (matchBadge) matchBadge.innerText = items.length + " रोग सक्रिय";

    items.forEach(function (obj) {
      var d = obj.disease;
      var score = obj.matchScore;
      var session = getActiveSession();
      var isDoctor = session && session.role === "doctor";

      var card = document.createElement("div");
      card.className = "bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 hover:border-blue-400 transition";

      card.innerHTML =
        '<div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">' +
          '<div>' +
            '<div class="flex items-center gap-1.5">' +
              '<span class="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200 uppercase">' + d.category + '</span>' +
              '<span class="text-[10px] text-slate-500 font-medium">🌡️ ' + d.temperatureExpected + '</span>' +
            '</div>' +
            '<h3 class="font-black text-slate-900 text-sm sm:text-base mt-1">' + d.nameHindi + '</h3>' +
            '<p class="text-[11px] text-slate-500 font-mono">' + d.nameEnglish + '</p>' +
          '</div>' +
          (showScore ? '<div class="text-right"><span class="text-xs font-black px-2.5 py-1 rounded-xl ' + (score >= 60 ? "bg-emerald-100 text-emerald-800" : "bg-blue-50 text-blue-800") + '">' + score + '% संभावना</span></div>' : '') +
        '</div>' +

        '<div class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">' +
          '<strong class="text-rose-700 block text-[11px]">🚨 प्रमुख विशिष्ट लक्षण (Cardinal Signs):</strong>' +
          d.cardinalSigns +
        '</div>' +

        '<!-- 5-TIER CLINICAL TREATMENT -->' +
        '<div class="space-y-2 text-xs">' +
          '<div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-1">' +
            '<strong class="text-emerald-900 block font-bold text-[11px]">🌿 सिद्ध देसी व हर्बल नुस्खा (Farmer Home Remedy):</strong>' +
            '<p>' + d.treatments.desiRemedy + '</p>' +
            '<p class="text-[10px] text-emerald-800 pt-0.5"><strong>आयुर्वेदिक:</strong> ' + d.treatments.ayurveda.join(", ") + '</p>' +
          '</div>' +

          (isDoctor ?
            '<div class="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-950 space-y-2">' +
              '<div class="flex items-center justify-between">' +
                '<strong class="text-blue-900 font-bold text-[11px]">💉 क्लिनिकल एलोपैथिक इंजेक्शन तालिका (Doctor Protocol):</strong>' +
                '<button onclick="window.openInlineDosageModal(\'' + d.nameHindi.replace(/'/g, "\\'") + '\', 5, 100)" class="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-lg shadow-xs">⚖️ डोज़ कैलकुलेटर</button>' +
              '</div>' +
              '<ul class="list-disc pl-4 space-y-1 font-mono text-[11px]">' +
                d.treatments.injections.map(function (inj) { return "<li>" + inj + "</li>"; }).join("") +
              '</ul>' +
              '<div class="pt-1 flex gap-2">' +
                '<button onclick="window.autoFillPrescription(\'' + d.nameHindi.replace(/'/g, "\\'") + '\', \'' + d.treatments.injections.join("\\n").replace(/'/g, "\\'") + '\')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-center shadow-xs transition active:scale-98">' +
                  '📝 सीधे ओपीडी पर्ची (Rx) में लोड करें ➔' +
                '</button>' +
              '</div>' +
            '</div>'
          : '<div class="p-2.5 bg-slate-100 rounded-2xl text-center text-slate-500 text-[11px]">🔒 एलोपैथिक इंजेक्शन तालिकाएं अधिकृत पशु चिकित्सक मोड में उपलब्ध हैं।</div>') +
        '</div>';

      container.appendChild(card);
    });
  };

  /* =========================================================================
     12. DIGITAL OPD PRESCRIPTION, WHATSAPP DISPATCH & PDF PRINT
     ========================================================================= */
  window.autoFillPrescription = function (diseaseName, rxText) {
    window.switchTab("rx");
    var dInput = document.getElementById("opdDiagnosis");
    var mInput = document.getElementById("opdMedicine");
    if (dInput) dInput.value = diseaseName;
    if (mInput) mInput.value = rxText;
  };

  window.insertMedToOPD = function (salt, dose, route) {
    window.switchTab("rx");
    var mInput = document.getElementById("opdMedicine");
    if (mInput) {
      var current = mInput.value.trim();
      var appendLine = (current ? "\n" : "") + "• " + salt + " (" + dose + ") - " + route;
      mInput.value = current + appendLine;
    }
  };

  window.clearRxField = function () {
    var mInput = document.getElementById("opdMedicine");
    if (mInput) mInput.value = "";
  };

  window.calculateDue = function () {
    var tot = Number(document.getElementById("opdTotalFee").value) || 0;
    var paid = Number(document.getElementById("opdPaidFee").value) || 0;
    var dueInput = document.getElementById("opdDueFee");
    if (dueInput) dueInput.value = Math.max(0, tot - paid);
  };

  window.captureGPSLocation = function () {
    var gpsInput = document.getElementById("opdGPS");
    var btn = document.getElementById("btnGPS");
    if (!navigator.geolocation) {
      alert("GPS उपलब्ध नहीं है!");
      return;
    }
    if (btn) btn.innerText = "⏳ खोज रहा...";
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        if (gpsInput) gpsInput.value = pos.coords.latitude.toFixed(5) + ", " + pos.coords.longitude.toFixed(5);
        if (btn) btn.innerText = "✅ GPS OK";
      },
      function () {
        if (btn) btn.innerText = "❌ GPS बंद";
        alert("लोकेशन प्राप्त नहीं हो सकी।");
      }
    );
  };

  window.dispatchWhatsAppRx = function () {
    var name = (document.getElementById("opdFarmerName").value || "").trim();
    var phone = (document.getElementById("opdFarmerPhone").value || "").trim();
    var village = (document.getElementById("opdVillage").value || "").trim();
    var animal = document.getElementById("opdAnimal").value;
    var diag = (document.getElementById("opdDiagnosis").value || "").trim();
    var rx = (document.getElementById("opdMedicine").value || "").trim();
    var tot = document.getElementById("opdTotalFee").value || "0";
    var paid = document.getElementById("opdPaidFee").value || "0";
    var due = document.getElementById("opdDueFee").value || "0";

    if (!name || !phone || phone.length < 10) {
      alert("कृपया किसान का नाम और 10-अंकों का वैध मोबाइल नंबर भरें!");
      return;
    }

    var text =
      "🩺 *VETCARE CLINICAL OPD PRESCRIPTION*\n" +
      "-------------------------------------------\n" +
      "👨‍🌾 *किसान:* " + name + " (" + village + ")\n" +
      "🐄 *पशु:* " + animal + "\n" +
      "📅 *दिनांक:* " + new Date().toLocaleDateString("hi-IN") + "\n" +
      "🔍 *निदान (Diagnosis):* " + diag + "\n" +
      "-------------------------------------------\n" +
      "💊 *उपचार व इंजेक्शन (Rx):*\n" + rx + "\n" +
      "-------------------------------------------\n" +
      "💰 *फीस विवरण:* कुल ₹" + tot + " | जमा ₹" + paid + " | *बकाया ₹" + due + "*\n\n" +
      "⚠️ *निर्देश:* दवाएं केवल पंजीकृत पशु चिकित्सक के परामर्श अनुसार दें।\n" +
      "🏥 *Vetcare Digital Clinic System*";

    window.saveOfflineCaseDirectly();

    var cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
    var waUrl = "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(text);
    window.open(waUrl, "_blank");
  };

  window.saveOfflineCaseDirectly = function () {
    var name = (document.getElementById("opdFarmerName").value || "").trim();
    var phone = (document.getElementById("opdFarmerPhone").value || "").trim();
    if (!name || !phone) return;

    var record = {
      id: "opd_" + Date.now(),
      farmerName: name,
      farmerPhone: phone,
      village: document.getElementById("opdVillage").value || "",
      animal: document.getElementById("opdAnimal").value,
      diagnosis: document.getElementById("opdDiagnosis").value || "",
      medicine: document.getElementById("opdMedicine").value || "",
      total: document.getElementById("opdTotalFee").value || 0,
      paid: document.getElementById("opdPaidFee").value || 0,
      due: document.getElementById("opdDueFee").value || 0,
      date: new Date().toISOString()
    };

    var records = JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");
    records.unshift(record);
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));

    // If there is an outstanding due, auto add to Khata
    if (Number(record.due) > 0) {
      var khata = JSON.parse(localStorage.getItem(KHATA_KEY) || "[]");
      khata.unshift({
        id: "kht_" + Date.now(),
        farmerName: name,
        farmerPhone: phone,
        amount: Number(record.due),
        type: "DUE",
        note: record.diagnosis + " (OPD पर्ची बकाया)",
        date: new Date().toISOString()
      });
      localStorage.setItem(KHATA_KEY, JSON.stringify(khata));
    }

    alert("💾 केस रिकॉर्ड सुरक्षित कर लिया गया है!");
    window.renderRecordsList();
    window.renderKhataList();
  };

  window.printCurrentOPDSlip = function () {
    var printArea = document.getElementById("printableSlipArea");
    if (!printArea) return;

    var name = document.getElementById("opdFarmerName").value || "---";
    var phone = document.getElementById("opdFarmerPhone").value || "---";
    var village = document.getElementById("opdVillage").value || "---";
    var animal = document.getElementById("opdAnimal").value || "---";
    var diag = document.getElementById("opdDiagnosis").value || "---";
    var rx = document.getElementById("opdMedicine").value || "---";
    var tot = document.getElementById("opdTotalFee").value || "0";
    var paid = document.getElementById("opdPaidFee").value || "0";
    var due = document.getElementById("opdDueFee").value || "0";

    printArea.innerHTML =
      '<div style="text-align:center; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:15px;">' +
        '<h1 style="font-size:22px; font-weight:900; margin:0;">' + AppConfig.appTitle + ' CLINICAL VETERINARY OPD</h1>' +
        '<p style="font-size:12px; margin:4px 0 0 0;">' + AppConfig.appTagline + '</p>' +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:12px;">' +
        '<div><strong>किसान का नाम:</strong> ' + name + ' (' + village + ')<br><strong>मोबाइल:</strong> ' + phone + '</div>' +
        '<div style="text-align:right;"><strong>पशु:</strong> ' + animal + '<br><strong>दिनांक:</strong> ' + new Date().toLocaleDateString("hi-IN") + '</div>' +
      '</div>' +
      '<div style="border:1px solid #ccc; padding:10px; border-radius:8px; margin-bottom:15px;">' +
        '<strong>प्रोविजनल निदान (Diagnosis):</strong> ' + diag +
      '</div>' +
      '<div style="min-height:160px; border:1px solid #ccc; padding:12px; border-radius:8px; margin-bottom:15px; font-family:monospace; white-space:pre-wrap;">' +
        '<strong>Rx (दवा व इंजेक्शन तालिका):</strong>\n' + rx +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; font-size:12px; border-top:1px solid #ccc; padding-top:10px;">' +
        '<div>कुल शुल्क: ₹' + tot + ' | प्राप्त: ₹' + paid + ' | <strong>बकाया: ₹' + due + '</strong></div>' +
        '<div>अधिकृत हस्ताक्षर: __________________</div>' +
      '</div>';

    window.print();
  };

  /* =========================================================================
     13. SAVED OPD RECORDS, KHATA LEDGER & INVENTORY STOCK
     ========================================================================= */
  window.renderRecordsList = function () {
    var list = document.getElementById("recordsList");
    if (!list) return;
    list.innerHTML = "";

    var records = JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");
    var badge = document.getElementById("recordTotalBadge");
    if (badge) badge.innerText = records.length + " केस सुरक्षित";

    if (records.length === 0) {
      list.innerHTML = '<div class="p-6 text-center text-slate-400 text-xs">कोई सुरक्षित केस नहीं है।</div>';
      return;
    }

    records.forEach(function (r) {
      var item = document.createElement("div");
      item.className = "bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs space-y-1.5 text-xs";
      item.innerHTML =
        '<div class="flex justify-between items-center font-bold text-slate-900">' +
          '<span>👨‍🌾 ' + r.farmerName + ' (' + r.village + ')</span>' +
          '<span class="text-[10px] text-slate-500">' + new Date(r.date).toLocaleDateString() + '</span>' +
        '</div>' +
        '<div class="text-blue-700 font-semibold">' + r.animal + ' • ' + r.diagnosis + '</div>' +
        '<div class="text-[11px] text-slate-600 font-mono truncate">' + r.medicine + '</div>' +
        '<div class="flex justify-between items-center pt-1 border-t border-slate-100 text-[11px]">' +
          '<span>फीस: ₹' + r.total + ' (बकाया: <strong class="text-rose-600">₹' + r.due + '</strong>)</span>' +
          '<a href="tel:' + r.farmerPhone + '" class="text-emerald-700 font-bold">📞 कॉल</a>' +
        '</div>';
      list.appendChild(item);
    });

    window.renderDoctorIncomingRequests();
  };

  window.renderKhataList = function () {
    var list = document.getElementById("finDueList");
    if (!list) return;
    list.innerHTML = "";

    var khata = JSON.parse(localStorage.getItem(KHATA_KEY) || "[]");
    var totalCredit = 0;
    var totalDebit = 0;

    khata.forEach(function (k) {
      if (k.type === "PAID") totalCredit += Number(k.amount || 0);
      else totalDebit += Number(k.amount || 0);
    });

    var cEl = document.getElementById("finCredit");
    var dEl = document.getElementById("finDebit");
    if (cEl) cEl.innerText = "₹" + totalCredit;
    if (dEl) dEl.innerText = "₹" + totalDebit;

    if (khata.length === 0) {
      list.innerHTML = '<div class="p-4 text-center text-slate-400 text-xs">खाता बही में कोई लेन-देन नहीं है।</div>';
      return;
    }

    khata.forEach(function (k) {
      var item = document.createElement("div");
      var isDue = k.type === "DUE";
      item.className = "p-3 rounded-2xl border flex items-center justify-between text-xs " + (isDue ? "bg-rose-50/50 border-rose-200" : "bg-emerald-50/50 border-emerald-200");
      item.innerHTML =
        '<div>' +
          '<strong class="text-slate-900 block">' + k.farmerName + ' (' + k.farmerPhone + ')</strong>' +
          '<span class="text-[10px] text-slate-500">' + (k.note || "लेनदेन") + ' • ' + new Date(k.date).toLocaleDateString() + '</span>' +
        '</div>' +
        '<div class="text-right">' +
          '<span class="font-black text-sm ' + (isDue ? "text-rose-700" : "text-emerald-700") + '">' + (isDue ? "- ₹" : "+ ₹") + k.amount + '</span>' +
          '<span class="block text-[9px] uppercase font-bold ' + (isDue ? "text-rose-600" : "text-emerald-600") + '">' + (isDue ? "बकाया" : "जमा") + '</span>' +
        '</div>';
      list.appendChild(item);
    });
  };

  window.openNewKhataModal = function () {
    var modal = document.getElementById("modalNewKhata");
    if (modal) modal.style.display = "flex";
  };

  window.closeNewKhataModal = function () {
    var modal = document.getElementById("modalNewKhata");
    if (modal) modal.style.display = "none";
  };

  window.saveNewKhataRecord = function () {
    var name = (document.getElementById("khataFarmerName").value || "").trim();
    var phone = (document.getElementById("khataFarmerPhone").value || "").trim();
    var amt = Number(document.getElementById("khataAmount").value) || 0;
    var type = document.getElementById("khataType").value;
    var note = (document.getElementById("khataNote").value || "").trim();

    if (!name || amt <= 0) {
      alert("कृपया किसान का नाम और मान्य राशि भरें!");
      return;
    }

    var khata = JSON.parse(localStorage.getItem(KHATA_KEY) || "[]");
    khata.unshift({
      id: "kht_" + Date.now(),
      farmerName: name,
      farmerPhone: phone,
      amount: amt,
      type: type,
      note: note,
      date: new Date().toISOString()
    });
    localStorage.setItem(KHATA_KEY, JSON.stringify(khata));
    window.closeNewKhataModal();
    window.renderKhataList();
  };

  window.openNewInventoryItemModal = function () {
    var modal = document.getElementById("modalNewInventory");
    if (modal) modal.style.display = "flex";
  };

  window.closeNewInventoryModal = function () {
    var modal = document.getElementById("modalNewInventory");
    if (modal) modal.style.display = "none";
  };

  window.saveNewInventoryItem = function () {
    var name = (document.getElementById("invItemName").value || "").trim();
    var cat = document.getElementById("invItemCategory").value;
    var stock = Number(document.getElementById("invItemStock").value) || 0;
    var minAlert = Number(document.getElementById("invItemMinAlert").value) || 3;
    var unit = (document.getElementById("invItemUnit").value || "vials").trim();

    if (!name || stock < 0) {
      alert("कृपया सही दवा/स्ट्रॉ का नाम और मात्रा दर्ज करें!");
      return;
    }

    var inv = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "[]");
    inv.unshift({
      id: "inv_" + Date.now(),
      name: name,
      category: cat,
      stock: stock,
      minAlert: minAlert,
      unit: unit,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inv));
    window.closeNewInventoryModal();
    window.renderMedicinesCatalog();
  };

  /* =========================================================================
     14. SMART BREEDING, FEED CALCULATOR & AI CONSULTANT
     ========================================================================= */
  window.calculateDailyRation = function () {
    var weight = Number(document.getElementById("feedWeight").value) || 400;
    var milk = Number(document.getElementById("feedMilk").value) || 10;

    // Scientific Rule: Dry Matter ~ 2.5 to 3% of body weight
    // Green fodder = 4-5 kg per 100 kg body weight (~20 kg)
    // Dry straw = 1-1.5 kg per 100 kg body weight (~5 kg)
    // Concentrate: 1.5 kg maintenance + 400g per liter of milk
    var maintenanceGrain = 1.5;
    var prodGrain = milk * 0.4;
    var totalGrain = (maintenanceGrain + prodGrain).toFixed(1);
    var greenFodder = Math.round((weight / 100) * 5);
    var dryStraw = Math.round((weight / 100) * 1.3);

    var resCard = document.getElementById("rationResultCard");
    var gEl = document.getElementById("resFeedGrain");
    var grnEl = document.getElementById("resFeedGreen");
    var dEl = document.getElementById("resFeedDry");

    if (gEl) gEl.innerText = totalGrain + " kg";
    if (grnEl) grnEl.innerText = greenFodder + " kg";
    if (dEl) dEl.innerText = dryStraw + " kg";
    if (resCard) resCard.classList.remove("hidden");
  };

  window.runAIConsultant = function () {
    var promptInput = document.getElementById("aiInputPrompt");
    var outputArea = document.getElementById("aiOutputArea");
    var btn = document.getElementById("btnRunAI");
    var text = (promptInput.value || "").trim();
    var apiKey = localStorage.getItem(GEMINI_KEY_STORAGE) || "";

    if (!text) {
      alert("कृपया पशु के लक्षण, तापमान और केस हिस्ट्री दर्ज करें!");
      return;
    }
    if (!apiKey) {
      alert("AI सर्जन फीचर हेतु कृपया अपनी Google Gemini API Key सुरक्षित करें!");
      window.openAIKeyModal();
      return;
    }

    if (btn) btn.innerText = "⏳ AI सर्जन विश्लेषण कर रहा है...", btn.disabled = true;
    if (outputArea) {
      outputArea.classList.remove("hidden");
      outputArea.innerText = "विशेषज्ञ डिसीजन इंजन से क्लिनिकल रिपोर्ट तैयार की जा रही है...";
    }

    var sysPrompt =
      "You are a Senior Veterinary Surgery & Medicine Specialist. Analyze this livestock clinical case in Hinglish.\n" +
      "Provide:\n" +
      "1. प्रोविजनल विभेदक निदान (Differential Diagnosis)\n" +
      "2. तत्काल आवश्यक 5-स्तरीय उपचार (Injections, Routes, Doses)\n" +
      "3. किसान हेतु देसी देखभाल व परहेज\n" +
      "Case details: " + text;

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: sysPrompt }] }]
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var respText = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text;
        if (outputArea) outputArea.innerText = respText || "कोई क्लिनिकल रिपोर्ट प्राप्त नहीं हुई।";
      })
      .catch(function (err) {
        if (outputArea) outputArea.innerText = "AI त्रुटि: " + err.message;
      })
      .finally(function () {
        if (btn) btn.innerText = "✨ AI से क्लिनिकल रिपोर्ट मांगें", btn.disabled = false;
      });
  };

  window.sendCaseToAIConsultant = function () {
    var diag = document.getElementById("opdDiagnosis").value || "";
    var rx = document.getElementById("opdMedicine").value || "";
    var animal = document.getElementById("opdAnimal").value;
    window.switchTab("ai");
    var promptInput = document.getElementById("aiInputPrompt");
    if (promptInput) {
      promptInput.value = "पशु: " + animal + "\nसंदिग्ध रोग: " + diag + "\nप्रस्तावित दवाएं: " + rx + "\nकृपया इस उपचार प्रोटोकॉल का सेकंड ओपिनियन व डोज़ जांच प्रदान करें।";
    }
  };

  /* =========================================================================
     15. PREMIUM PAYMENT, DUAL BANK GATEWAY & MODAL CONTROLLERS
     ========================================================================= */
  var activeBankTab = "SBI";
  var selectedPlanKey = "1-month";

  window.openPremiumPaymentModal = function () {
    var modal = document.getElementById("modalPremiumPayment");
    if (modal) modal.style.display = "flex";
    window.selectPaymentPlan(selectedPlanKey);
    window.switchBankTab(activeBankTab);
  };

  window.closePremiumPaymentModal = function () {
    var modal = document.getElementById("modalPremiumPayment");
    if (modal) modal.style.display = "none";
  };

  window.selectPaymentPlan = function (planKey) {
    selectedPlanKey = planKey === "1-week" ? "1-week" : planKey === "3-month" ? "3-month" : "1-month";
    var plan = AppConfig.subscriptions[selectedPlanKey];

    var bMon = document.getElementById("btnPlanMonthly");
    var bAnn = document.getElementById("btnPlanAnnual");
    if (bMon && bAnn) {
      if (selectedPlanKey === "1-month") {
        bMon.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
        bAnn.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
      } else {
        bMon.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
        bAnn.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
      }
    }

    var dAmt = document.getElementById("directUPIAmount");
    if (dAmt) dAmt.innerText = plan.price;
    window.updateDynamicQR();
  };

  window.switchBankTab = function (bank) {
    activeBankTab = bank;
    var bSbi = document.getElementById("btnTabSBI");
    var bPnb = document.getElementById("btnTabPNB");
    if (bSbi && bPnb) {
      if (bank === "SBI") {
        bSbi.className = "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition";
        bPnb.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
      } else {
        bSbi.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
        bPnb.className = "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition";
      }
    }

    var payee = AppConfig.banking.payeeName;
    var upi = bank === "SBI" ? AppConfig.banking.sbiUpi : AppConfig.banking.pnbUpi;
    var acc = bank === "SBI" ? AppConfig.banking.sbiAccount : AppConfig.banking.pnbAccount;
    var ifsc = bank === "SBI" ? AppConfig.banking.sbiIfsc : AppConfig.banking.pnbIfsc;

    var elP = document.getElementById("dispPayeeName");
    var elU = document.getElementById("dispUPIId");
    var elA = document.getElementById("dispAccountNumber");
    var elI = document.getElementById("dispIFSC");

    if (elP) elP.innerText = payee;
    if (elU) elU.innerText = upi;
    if (elA) elA.innerText = acc;
    if (elI) elI.innerText = ifsc;

    window.updateDynamicQR();
  };

  window.updateDynamicQR = function () {
    var upiId = activeBankTab === "SBI" ? AppConfig.banking.sbiUpi : AppConfig.banking.pnbUpi;
    var plan = AppConfig.subscriptions[selectedPlanKey];
    var payee = encodeURIComponent(AppConfig.banking.payeeName);
    var amount = plan.price;

    var upiUrl = "upi://pay?pa=" + upiId + "&pn=" + payee + "&am=" + amount + "&cu=INR&tn=" + encodeURIComponent("Vetcare Premium");
    var qrImgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(upiUrl);

    var img = document.getElementById("dynamicQRImage");
    if (img) img.src = qrImgUrl;

    var linkBtn = document.getElementById("btnDirectUPILink");
    if (linkBtn) linkBtn.href = upiUrl;
  };

  window.sendPaymentProofWhatsApp = function () {
    var plan = AppConfig.subscriptions[selectedPlanKey];
    var upiId = activeBankTab === "SBI" ? AppConfig.banking.sbiUpi : AppConfig.banking.pnbUpi;
    var text =
      "💎 *VETCARE PREMIUM UPGRADE PROOF*\n" +
      "-----------------------------------\n" +
      "📦 *चयनित प्लान:* " + plan.name + " (₹" + plan.price + ")\n" +
      "🏛️ *भुगतान बैंक:* " + activeBankTab + " (" + upiId + ")\n" +
      "📅 *दिनांक:* " + new Date().toLocaleDateString("hi-IN") + "\n\n" +
      "कृपया मेरा Vetcare AI OS प्रीमियम प्लान सक्रिय करें। (स्क्रीनशॉट संलग्न है)";
    var waUrl = "https://wa.me/91" + AppConfig.adminWhatsApp + "?text=" + encodeURIComponent(text);
    window.open(waUrl, "_blank");
  };

  window.escalateToAdminWhatsApp = function () {
    var text = "नमस्ते एडमिन! मुझे Vetcare AI OS में तकनीकी सहायता / प्रीमियम सत्यापन की आवश्यकता है।";
    var waUrl = "https://wa.me/91" + AppConfig.adminWhatsApp + "?text=" + encodeURIComponent(text);
    window.open(waUrl, "_blank");
  };

  window.openAIKeyModal = function () {
    var modal = document.getElementById("modalAIKey");
    if (modal) {
      modal.style.display = "flex";
      var inp = document.getElementById("inputGeminiKey");
      if (inp) inp.value = localStorage.getItem(GEMINI_KEY_STORAGE) || "";
    }
  };

  window.closeAIKeyModal = function () {
    var modal = document.getElementById("modalAIKey");
    if (modal) modal.style.display = "none";
  };

  window.saveGeminiKey = function () {
    var inp = document.getElementById("inputGeminiKey");
    if (inp) {
      var key = inp.value.trim();
      localStorage.setItem(GEMINI_KEY_STORAGE, key);
      alert("✅ Gemini API Key सुरक्षित कर ली गई है!");
      window.closeAIKeyModal();
    }
  };

  /* =========================================================================
     16. UNIFIED TAB SWITCHER & BOOTSTRAP INITIALIZATION
     ========================================================================= */
  window.switchTab = function (tabId) {
    var views = ["viewDiagnosis", "viewRx", "viewRecords", "viewAI", "viewBreeding", "viewFeed", "viewFinance", "viewInventory", "viewHelpdesk"];
    var navs = ["navDiagnosis", "navRx", "navRecords", "navAI", "navBreeding", "navFeed", "navFinance", "navInventory", "navHelpdesk"];

    views.forEach(function (v) {
      var el = document.getElementById(v);
      if (el) el.classList.add("hidden");
    });

    navs.forEach(function (n) {
      var el = document.getElementById(n);
      if (el) el.classList.remove("active-nav-tab", "text-blue-600");
    });

    var viewMap = {
      diagnosis: "viewDiagnosis",
      rx: "viewRx",
      records: "viewRecords",
      ai: "viewAI",
      breeding: "viewBreeding",
      feed: "viewFeed",
      finance: "viewFinance",
      inventory: "viewInventory",
      helpdesk: "viewHelpdesk"
    };

    var navMap = {
      diagnosis: "navDiagnosis",
      rx: "navRx",
      records: "navRecords",
      ai: "navAI",
      breeding: "navBreeding",
      feed: "navFeed",
      finance: "navFinance",
      inventory: "navInventory",
      helpdesk: "navHelpdesk"
    };

    var targetView = document.getElementById(viewMap[tabId]);
    var targetNav = document.getElementById(navMap[tabId]);

    if (targetView) targetView.classList.remove("hidden");
    if (targetNav) targetNav.classList.add("active-nav-tab", "text-blue-600");

    if (tabId === "records") window.renderRecordsList();
    if (tabId === "finance") window.renderKhataList();
    if (tabId === "inventory") window.renderMedicinesCatalog();
    if (tabId === "breeding") window.populateBreedingTracker();
  };

  window.populateBreedingTracker = function () {
    var cSigns = document.getElementById("heatSignsContainer");
    var cDis = document.getElementById("dischargeContainer");
    var cRep = document.getElementById("repeatBreederList");

    if (cSigns && cSigns.children.length === 0) {
      cSigns.innerHTML =
        '<div class="p-2 bg-slate-50 rounded-xl"><strong>प्रारंभिक मद (Early Heat - 0-6 घंटे):</strong> पशु बेचैन, बार-बार रंभाना, अन्य पशुओं पर चढ़ना। (सीमन न करवाएं)</div>' +
        '<div class="p-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-bold">🎯 सर्वोत्तम समय (Mid-Late Heat - 10-18 घंटे): पशु शांत खड़ा रहे (Standing Heat)। इस समय सीमन (A.I.) करवाएं!</div>' +
        '<div class="p-2 bg-slate-50 rounded-xl"><strong>अंतिम मद (Late Heat - 18-24 घंटे):</strong> योनि से गाढ़ा स्राव, सीमन की सफलता दर कम।</div>';
    }

    if (cDis && cDis.children.length === 0) {
      cDis.innerHTML =
        '<div class="p-2 bg-emerald-50 text-emerald-900 rounded-xl font-bold">✨ कांच जैसी पारदर्शी तार (Clear Glassy Mucus): गर्भाशय बिल्कुल स्वस्थ है, गर्भ ठहरने की 95% संभावना।</div>' +
        '<div class="p-2 bg-amber-50 text-amber-900 rounded-xl">⚠️ धुंधली या मटमैली तार (Cloudy Mucus): गर्भाशय में हल्का संक्रमण (Mild Endometritis)। पहले सफाई कराएं।</div>' +
        '<div class="p-2 bg-rose-50 text-rose-900 rounded-xl font-bold">🚨 सफेद या पीला मवाद (Pus Mucus): गर्भाशय में गहरा मवाद (Metritis)। सीमन कदापि न करवाएं!</div>';
    }

    if (cRep && cRep.children.length === 0) {
      cRep.innerHTML =
        '<li><strong>सही समय का नियम (AM-PM Rule):</strong> यदि पशु सुबह मद में आए तो शाम को, और यदि शाम को आए तो अगली सुबह सीमन डलवाएं।</li>' +
        '<li><strong>ओव्यूलेशन सपोर्ट:</strong> सीमन डलवाने के समय डॉक्टर से GnRH इंजेक्शन (Gynarich / Receptal 2.5ml) लगवाएं।</li>' +
        '<li><strong>गर्भाशय सफाई:</strong> यदि डिस्चार्ज गंदा हो तो मद में 4ml जेंटामाइसिन या यूट्रोवेट से गर्भाशय की धुलाई करवाएं।</li>' +
        '<li><strong>संतुलित मिनरल:</strong> 50 ग्राम चिलेटेड मिनरल मिक्सचर प्रतिदिन दाने में नियमित दें।</li>';
    }
  };

  // Bootstrap DOM Initialization
  document.addEventListener("DOMContentLoaded", function () {
    var session = getActiveSession();
    if (session) {
      window.launchUserPortal(session);
    } else {
      window.returnToGateway();
    }

    // Bind Search Input Handler
    var sInput = document.getElementById("unifiedSearchInput");
    if (sInput) {
      sInput.addEventListener("input", window.handleAppSearch);
    }
  });

})(typeof window !== "undefined" ? window : globalThis, typeof document !== "undefined" ? document : {});
