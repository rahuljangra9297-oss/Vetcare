/**
 * Vetcare AI OS - Master Application Controller
 * app.js - Production-Ready Clinical Operating System Engine
 */

(function (window, document) {
  "use strict";

  // =========================================================================
  // 1. ZERO-CRASH GLOBAL WINDOW BINDINGS & DEFENSIVE HELPERS
  // =========================================================================

  function _getEl(id) {
    return document.getElementById(id);
  }

  function _show(id) {
    var el = _getEl(id);
    if (el) el.classList.remove("hidden");
  }

  function _hide(id) {
    var el = _getEl(id);
    if (el) el.classList.add("hidden");
  }

  function _val(id) {
    var el = _getEl(id);
    return el ? el.value.trim() : "";
  }

  function _setVal(id, val) {
    var el = _getEl(id);
    if (el) el.value = val;
  }

  function _setText(id, txt) {
    var el = _getEl(id);
    if (el) el.textContent = txt;
  }

  function _setHtml(id, html) {
    var el = _getEl(id);
    if (el) el.innerHTML = html;
  }

  // Master Global State Container
  window.VETCARE_STATE = window.VETCARE_STATE || {
    role: localStorage.getItem("vetcare_user_role") || null,
    user: JSON.parse(localStorage.getItem("vetcare_user") || "null"),
    trialStartTime: parseInt(localStorage.getItem("vetcare_trial_start") || "0", 10),
    activeBank: "SBI",
    paymentPlanType: "FIRST_TIME",
    selectedRolePlan: "DOCTOR",
    selectedPlanDuration: "1_MONTH",
    selectedPlanPrice: 199,
    activeAdminTab: "PAYMENT",
    activeDiagnosisMode: "SYMPTOMS",
    activeKhataHorizon: "DAILY",
    opdCurrentService: "GENERAL",
    gpsLocation: "",
    matrixSelected: {
      temp: null,
      cardinal: "ALL",
      secondary: []
    }
  };

  // Bind All Handlers Directly to Window (Immediate Fail-Safe Protection)
  var globalFnMap = [
    "selectRole", "switchRole", "returnToGateway", "openDoctorDeclarationModal", "closeDoctorDeclarationModal",
    "confirmDoctorRole", "openAdminPinModal", "closeAdminPinModal", "verifyAdminPIN", "openPaymentModal",
    "closePaymentModal", "switchPaymentTab", "switchPaymentPlanType", "switchRolePlanCategory", "selectPlanItem",
    "sendPaymentProofWhatsApp", "openHelpModal", "closeHelpModal", "submitSupportTicket", "resolveSupportTicket",
    "openAiKeyModal", "closeAiKeyModal", "saveAiApiKey", "openGpsRadarModal", "closeGpsRadarModal",
    "requestMutualContact", "triggerWhatsAppSlip", "triggerSmsSlip", "triggerPhoneCall", "saveDailyMilk",
    "deleteMilkRecord", "calculateRation", "calculateBreeding", "calculateShaefferWeight", "calculateDue",
    "clearRxField", "captureGPSLocation", "printCurrentOPDSlip", "saveOfflineCaseDirectly", "switchTab",
    "setDiagnosisMode", "filterByTag", "applyMatrixFilters", "toggleMatrixParam", "resetSymptomMatrix",
    "toggleSecSymptom", "handleAppSearch", "handleRecordSearch", "handleLedgerSearch", "renderKhataList",
    "openNewKhataModal", "closeNewKhataModal", "saveNewKhataRecord", "sendKhataTagadaWhatsApp", "filterKhataHorizon",
    "openNewInventoryItemModal", "closeNewInventoryModal", "saveNewInventoryItem", "filterInventoryCategory",
    "adjustStock", "sendCaseToAIConsultant", "runAIConsultant", "closeAdminDashboard", "switchAdminTab",
    "saveAllAdminSettings", "exportDataBackupJSON", "clearDemoDataOnly", "setOpdService", "handleAuthSubmit"
  ];

  globalFnMap.forEach(function (name) {
    window[name] = function () {
      if (typeof window["_" + name] === "function") {
        return window["_" + name].apply(null, arguments);
      }
    };
  });

  // =========================================================================
  // 2. 24-HOUR FREE TRIAL & REGISTRATION CONTROLLER
  // =========================================================================

  function initTrialAndAuth() {
    var savedUser = localStorage.getItem("vetcare_user");
    var trialStart = localStorage.getItem("vetcare_trial_start");

    if (!savedUser) {
      _show("screenRegistration");
      return;
    }

    if (!trialStart) {
      trialStart = Date.now().toString();
      localStorage.setItem("vetcare_trial_start", trialStart);
    }

    window.VETCARE_STATE.user = JSON.parse(savedUser);
    window.VETCARE_STATE.trialStartTime = parseInt(trialStart, 10);
    _setText("dispLoggedUser", window.VETCARE_STATE.user.name + " (" + window.VETCARE_STATE.user.phone + ")");

    startTrialCountdownTimer();

    // Check Role
    var savedRole = localStorage.getItem("vetcare_user_role");
    if (savedRole) {
      applyRoleInterface(savedRole);
    } else {
      _show("screenGateway");
      _hide("screenMainApp");
    }
  }

  function startTrialCountdownTimer() {
    var TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    function tick() {
      var isSubscribed = localStorage.getItem("vetcare_is_subscribed") === "true";
      if (isSubscribed) {
        _setText("trialCountdownText", "💎 प्रीमियम एक्टिव: असीमित क्लिनिकल लाइफटाइम एक्सेस");
        return;
      }

      var now = Date.now();
      var elapsed = now - window.VETCARE_STATE.trialStartTime;
      var remaining = TWENTY_FOUR_HOURS - elapsed;

      if (remaining <= 0) {
        _setText("trialCountdownText", "⏳ आपका 24 घंटे का मुफ़्त ट्रायल समाप्त हो चुका है!");
        _show("modalPaywallBlocker");
      } else {
        var hrs = Math.floor(remaining / (1000 * 60 * 60));
        var mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((remaining % (1000 * 60)) / 1000);

        var formatted = "⏳ आपका 24 घंटे का मुफ़्त ट्रायल: " +
          (hrs < 10 ? "0" + hrs : hrs) + ":" +
          (mins < 10 ? "0" + mins : mins) + ":" +
          (secs < 10 ? "0" + secs : secs) + " शेष";

        _setText("trialCountdownText", formatted);
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  window._handleAuthSubmit = function () {
    var name = _val("regUserName");
    var phone = _val("regUserPhone");

    if (!name || name.length < 2) {
      alert("कृपया अपना पूरा नाम दर्ज करें।");
      return;
    }
    if (!phone || phone.length !== 10 || isNaN(phone)) {
      alert("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।");
      return;
    }

    var otpInput = _getEl("otpBox");
    if (otpInput && otpInput.classList.contains("hidden")) {
      otpInput.classList.remove("hidden");
      _setText("btnSendOrVerifyOtp", "सत्यापित करें एवं 24-घंटे का ट्रायल शुरू करें ➔");
      return;
    }

    // Save profile to storage
    var userObj = {
      name: name,
      phone: phone,
      registeredAt: Date.now()
    };

    localStorage.setItem("vetcare_user", JSON.stringify(userObj));
    localStorage.setItem("vetcare_trial_start", Date.now().toString());

    window.VETCARE_STATE.user = userObj;
    window.VETCARE_STATE.trialStartTime = Date.now();

    _hide("screenRegistration");
    _setText("dispLoggedUser", name + " (" + phone + ")");
    startTrialCountdownTimer();
    _show("screenGateway");
  };

  // =========================================================================
  // 3. DUAL-BANK VERIFIED MONETIZATION & DYNAMIC QR ENGINE
  // =========================================================================

  var BANK_CONFIGS = {
    SBI: {
      bankName: "State Bank of India (SBI)",
      payee: "Vetcare Services",
      upiId: "rahuljangra9297@oksbi",
      accNo: "65204067585",
      ifsc: "SBIN0013693"
    },
    PNB: {
      bankName: "Punjab National Bank (PNB)",
      payee: "Vetcare Services",
      upiId: "rahuljangra9297-1@okicici",
      accNo: "6687001700015098",
      ifsc: "PUNB0668700"
    }
  };

  var TIERED_PLANS = {
    FIRST_TIME: {
      FARMER: [
        { id: "1_WEEK", duration: "1 सप्ताह", price: 69, desc: "ट्रायल एक्सटेंशन" },
        { id: "1_MONTH", duration: "1 महीना", price: 99, desc: "लोकप्रिय किसान प्लान", popular: true },
        { id: "3_MONTH", duration: "3 महीने", price: 249, desc: "सीजनल बचत" }
      ],
      DOCTOR: [
        { id: "1_WEEK", duration: "1 सप्ताह", price: 119, desc: "ट्रायल एक्सटेंशन" },
        { id: "1_MONTH", duration: "1 महीना", price: 199, desc: "मानक क्लिनिकल", popular: true },
        { id: "3_MONTH", duration: "3 महीने", price: 499, desc: "ओपीडी कॉम्बो" }
      ]
    },
    RENEWAL: {
      FARMER: [
        { id: "1_MONTH", duration: "1 महीना", price: 99, desc: "मासिक बहीखाता" },
        { id: "3_MONTH", duration: "3 महीने", price: 499, desc: "त्रैमासिक" },
        { id: "1_YEAR", duration: "1 वर्ष (वार्षिक)", price: 999, desc: "365 दिन असीमित", popular: true }
      ],
      DOCTOR: [
        { id: "1_MONTH", duration: "1 महीना", price: 199, desc: "मासिक क्लिनिकल" },
        { id: "3_MONTH", duration: "3 महीने", price: 499, desc: "त्रैमासिक क्लिनिकल" },
        { id: "1_YEAR", duration: "1 वर्ष (वार्षिक)", price: 1699, desc: "वार्षिक सुपर सेवर", popular: true }
      ]
    }
  };

  window._openPaymentModal = function () {
    _show("modalPayment");
    renderPaymentPlans();
    updatePaymentBankDetails();
  };

  window._closePaymentModal = function () {
    _hide("modalPayment");
  };

  window._switchPaymentTab = function (bankKey) {
    window.VETCARE_STATE.activeBank = bankKey;
    var btnSbi = _getEl("btnTabSBI");
    var btnPnb = _getEl("btnTabPNB");

    if (bankKey === "SBI") {
      if (btnSbi) btnSbi.className = "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition";
      if (btnPnb) btnPnb.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
    } else {
      if (btnSbi) btnSbi.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
      if (btnPnb) btnPnb.className = "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition";
    }

    updatePaymentBankDetails();
  };

  window._switchPaymentPlanType = function (planType) {
    window.VETCARE_STATE.paymentPlanType = planType;
    var btnFirst = _getEl("btnPayTypeFirst");
    var btnRenew = _getEl("btnPayTypeRenew");

    if (planType === "FIRST_TIME") {
      if (btnFirst) btnFirst.className = "py-2 rounded-xl bg-blue-600 text-white font-bold transition";
      if (btnRenew) btnRenew.className = "py-2 rounded-xl text-slate-700 font-medium transition";
    } else {
      if (btnFirst) btnFirst.className = "py-2 rounded-xl text-slate-700 font-medium transition";
      if (btnRenew) btnRenew.className = "py-2 rounded-xl bg-blue-600 text-white font-bold transition";
    }

    renderPaymentPlans();
    updatePaymentBankDetails();
  };

  window._switchRolePlanCategory = function (roleKey) {
    window.VETCARE_STATE.selectedRolePlan = roleKey;
    var btnDoc = _getEl("btnRolePlanDoc");
    var btnFarmer = _getEl("btnRolePlanFarmer");

    if (roleKey === "DOCTOR") {
      if (btnDoc) btnDoc.className = "flex-1 py-1.5 font-bold bg-blue-50 text-blue-700 transition";
      if (btnFarmer) btnFarmer.className = "flex-1 py-1.5 font-medium bg-slate-50 text-slate-600 transition";
    } else {
      if (btnDoc) btnDoc.className = "flex-1 py-1.5 font-medium bg-slate-50 text-slate-600 transition";
      if (btnFarmer) btnFarmer.className = "flex-1 py-1.5 font-bold bg-emerald-50 text-emerald-700 transition";
    }

    renderPaymentPlans();
    updatePaymentBankDetails();
  };

  function renderPaymentPlans() {
    var pType = window.VETCARE_STATE.paymentPlanType;
    var rType = window.VETCARE_STATE.selectedRolePlan;
    var plans = TIERED_PLANS[pType][rType];
    var container = _getEl("plansSelectionGrid");

    if (!container) return;

    var html = "";
    plans.forEach(function (plan) {
      var isSelected = window.VETCARE_STATE.selectedPlanDuration === plan.id;
      var activeStyle = isSelected
        ? "border-2 border-blue-600 bg-blue-50/50 shadow-xs"
        : "border border-slate-200 bg-white hover:border-slate-300";

      html += '<div onclick="selectPlanItem(\'' + plan.id + '\', ' + plan.price + ')" class="p-2.5 rounded-2xl cursor-pointer text-center space-y-1 transition ' + activeStyle + '">';
      if (plan.popular) {
        html += '<span class="text-[9px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-full uppercase">सर्वश्रेष्ठ</span>';
      }
      html += '<span class="block text-[11px] font-semibold text-slate-700">' + plan.duration + '</span>';
      html += '<strong class="text-sm sm:text-base font-black text-slate-900 block">₹' + plan.price + '</strong>';
      html += '<span class="text-[9px] text-slate-400 block">' + plan.desc + '</span>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  window._selectPlanItem = function (planId, price) {
    window.VETCARE_STATE.selectedPlanDuration = planId;
    window.VETCARE_STATE.selectedPlanPrice = price;
    renderPaymentPlans();
    updatePaymentBankDetails();
  };

  function updatePaymentBankDetails() {
    var bank = BANK_CONFIGS[window.VETCARE_STATE.activeBank];
    var price = window.VETCARE_STATE.selectedPlanPrice;

    _setText("dispPayUPIId", bank.upiId);
    _setText("dispPayBankName", bank.bankName);
    _setText("directUPIAmount", price.toString());

    // Generate Standard Universal UPI Intent URI
    var payeeClean = encodeURIComponent(bank.payee);
    var upiUri = "upi://pay?pa=" + bank.upiId +
      "&pn=" + payeeClean +
      "&am=" + price +
      "&cu=INR&tn=Vetcare_Subscription";

    var qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(upiUri);
    var imgEl = _getEl("dynamicQRImage");
    if (imgEl) imgEl.src = qrApi;

    var linkEl = _getEl("btnDirectUPILink");
    if (linkEl) linkEl.href = upiUri;
  }

  window._sendPaymentProofWhatsApp = function () {
    var adminCfg = JSON.parse(localStorage.getItem("vetcare_admin_config") || "{}");
    var adminPhone = adminCfg.adminWhatsApp || "9876543210";
    var user = window.VETCARE_STATE.user || { name: "किसान/डॉक्टर", phone: "अज्ञात" };
    var planPrice = window.VETCARE_STATE.selectedPlanPrice;
    var duration = window.VETCARE_STATE.selectedPlanDuration;

    var msg = "नमस्ते एडमिन Vetcare!\n\nमैंने ₹" + planPrice + " का भुगतान कर दिया है।\n" +
      "यूज़र नाम: " + user.name + "\n" +
      "मोबाइल: " + user.phone + "\n" +
      "प्लान: " + duration + "\n" +
      "कृपया मेरा प्रीमियम अकाउंट 10 मिनट में सक्रिय करें। (स्क्रीनशॉट संलग्न है)";

    window.open("https://wa.me/91" + adminPhone + "?text=" + encodeURIComponent(msg), "_blank");
  };

  // =========================================================================
  // 4. SUPER ADMIN CONTROLLER (MASTER PIN: 9297) & PRIVATE SUPPORT DESK
  // =========================================================================

  window._openAdminPinModal = function () {
    _show("modalAdminPIN");
    _hide("pinErrorMessage");
    _setVal("inputAdminPIN", "");
  };

  window._closeAdminPinModal = function () {
    _hide("modalAdminPIN");
  };

  window._verifyAdminPIN = function () {
    var pin = _val("inputAdminPIN");
    if (pin === "9297") {
      _hide("modalAdminPIN");
      _show("modalAdminDashboard");
      loadAdminDashboardData();
    } else {
      _show("pinErrorMessage");
    }
  };

  window._closeAdminDashboard = function () {
    _hide("modalAdminDashboard");
  };

  window._switchAdminTab = function (tabKey) {
    window.VETCARE_STATE.activeAdminTab = tabKey;
    var tabs = ["PAYMENT", "BRANDING", "SUPPORT_INBOX", "METRICS"];

    tabs.forEach(function (t) {
      var panel = _getEl(t === "SUPPORT_INBOX" ? "adminPanelSupport" : "adminPanel" + (t.charAt(0) + t.slice(1).toLowerCase()));
      var btn = _getEl(t === "SUPPORT_INBOX" ? "tabBtnAdminSupport" : "tabBtnAdmin" + (t.charAt(0) + t.slice(1).toLowerCase()));

      if (t === tabKey) {
        if (panel) panel.classList.remove("hidden");
        if (btn) btn.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0";
      } else {
        if (panel) panel.classList.add("hidden");
        if (btn) btn.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0";
      }
    });

    if (tabKey === "SUPPORT_INBOX") renderAdminSupportTickets();
    if (tabKey === "METRICS") refreshAdminMetrics();
  };

  function loadAdminDashboardData() {
    var savedCfg = JSON.parse(localStorage.getItem("vetcare_admin_config") || "{}");
    _setVal("cfgSbiUpi", savedCfg.sbiUpi || BANK_CONFIGS.SBI.upiId);
    _setVal("cfgPayeeName", savedCfg.payeeName || BANK_CONFIGS.SBI.payee);
    _setVal("cfgPnbUpi", savedCfg.pnbUpi || BANK_CONFIGS.PNB.upiId);
    _setVal("cfgAdminWhatsApp", savedCfg.adminWhatsApp || "9876543210");
    _setVal("cfgAppTitle", savedCfg.appTitle || "Vetcare AI OS");
    _setVal("cfgAppTagline", savedCfg.appTagline || "पशु स्वास्थ्य निदान एवं संपूर्ण स्मार्ट डेयरी समाधान");

    renderAdminSupportTickets();
    refreshAdminMetrics();
  }

  window._saveAllAdminSettings = function () {
    var config = {
      sbiUpi: _val("cfgSbiUpi"),
      payeeName: _val("cfgPayeeName"),
      pnbUpi: _val("cfgPnbUpi"),
      adminWhatsApp: _val("cfgAdminWhatsApp"),
      appTitle: _val("cfgAppTitle"),
      appTagline: _val("cfgAppTagline")
    };

    localStorage.setItem("vetcare_admin_config", JSON.stringify(config));
    BANK_CONFIGS.SBI.upiId = config.sbiUpi;
    BANK_CONFIGS.SBI.payee = config.payeeName;
    BANK_CONFIGS.PNB.upiId = config.pnbUpi;

    _setText("appHeaderTitle", config.appTitle);
    alert("सुपर एडमिन कॉन्फ़िगरेशन सफलतापूर्वक सुरक्षित कर दिया गया!");
  };

  // Private Support Tickets Desk
  window._openHelpModal = function () {
    _show("modalHelpdesk");
    var user = window.VETCARE_STATE.user;
    if (user) {
      _setVal("helpUserName", user.name || "");
      _setVal("helpUserPhone", user.phone || "");
    }
  };

  window._closeHelpModal = function () {
    _hide("modalHelpdesk");
  };

  window._submitSupportTicket = function () {
    var name = _val("helpUserName");
    var phone = _val("helpUserPhone");
    var category = _val("helpCategory");
    var message = _val("helpMessage");

    if (!name || !phone || !message) {
      alert("कृपया नाम, मोबाइल नंबर और अपनी समस्या का विवरण भरें।");
      return;
    }

    var tickets = JSON.parse(localStorage.getItem("vetcare_support_tickets") || "[]");
    var newTicket = {
      id: "TKT-" + Math.floor(1000 + Math.random() * 9000),
      name: name,
      phone: phone,
      category: category,
      message: message,
      status: "OPEN",
      timestamp: Date.now()
    };

    tickets.unshift(newTicket);
    localStorage.setItem("vetcare_support_tickets", JSON.stringify(tickets));

    alert("आपकी सहायता टिकट संख्या " + newTicket.id + " दर्ज कर ली गई है। एडमिन इसे जल्द सत्यापित करेगा।");
    _setVal("helpMessage", "");
    _hide("modalHelpdesk");
  };

  function renderAdminSupportTickets() {
    var tickets = JSON.parse(localStorage.getItem("vetcare_support_tickets") || "[]");
    var container = _getEl("adminTicketsContainer");
    _setText("adminTicketCountBadge", tickets.length + " टिकट्स");

    if (!container) return;

    if (tickets.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400">कोई नई सहायता टिकट नहीं है।</div>';
      return;
    }

    var html = "";
    tickets.forEach(function (t, index) {
      var isResolved = t.status === "RESOLVED";
      var statusBadge = isResolved
        ? '<span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">हल हो गया ✓</span>'
        : '<span class="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">ओपन</span>';

      html += '<div class="p-3 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">';
      html += '<div class="flex justify-between items-center">';
      html += '<strong class="text-slate-800 font-bold">' + t.id + ' • ' + t.name + '</strong>';
      html += statusBadge;
      html += '</div>';
      html += '<p class="text-[11px] text-slate-600">' + t.message + '</p>';
      html += '<div class="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">';
      html += '<span>श्रेणी: ' + t.category + ' | फोन: ' + t.phone + '</span>';
      if (!isResolved) {
        html += '<button onclick="resolveSupportTicket(' + index + ')" class="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-2 py-1 rounded-lg border border-emerald-200 transition">✓ हल हो गया</button>';
      }
      html += '</div></div>';
    });

    container.innerHTML = html;
  }

  window._resolveSupportTicket = function (index) {
    var tickets = JSON.parse(localStorage.getItem("vetcare_support_tickets") || "[]");
    if (tickets[index]) {
      tickets[index].status = "RESOLVED";
      localStorage.setItem("vetcare_support_tickets", JSON.stringify(tickets));
      renderAdminSupportTickets();
    }
  };

  function refreshAdminMetrics() {
    var opdRecords = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    var khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    var inventory = JSON.parse(localStorage.getItem("vetcare_inventory") || "[]");

    var totalDue = 0;
    khata.forEach(function (k) {
      if (k.type === "DUE") totalDue += parseFloat(k.amount || 0);
    });

    var lowStockCount = 0;
    inventory.forEach(function (item) {
      if (parseFloat(item.stock || 0) <= parseFloat(item.minAlert || 3)) lowStockCount++;
    });

    _setText("metricTotalOPD", opdRecords.length.toString());
    _setText("metricTotalDues", "₹" + totalDue.toLocaleString("en-IN"));
    _setText("metricLowStock", lowStockCount.toString());
  }

  window._exportDataBackupJSON = function () {
    var backup = {
      user: JSON.parse(localStorage.getItem("vetcare_user") || "null"),
      opd: JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]"),
      khata: JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]"),
      inventory: JSON.parse(localStorage.getItem("vetcare_inventory") || "[]"),
      milk: JSON.parse(localStorage.getItem("vetcare_milk_records") || "[]"),
      timestamp: Date.now()
    };

    var blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "vetcare_backup_" + Date.now() + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  window._clearDemoDataOnly = function () {
    if (confirm("क्या आप वाकई परीक्षण डेटा रीसेट करना चाहते हैं? (उपयोगकर्ता प्रोफ़ाइल सुरक्षित रहेगी)")) {
      localStorage.removeItem("vetcare_opd_records");
      localStorage.removeItem("vetcare_khata_records");
      localStorage.removeItem("vetcare_milk_records");
      localStorage.removeItem("vetcare_support_tickets");
      alert("परीक्षण डेटा सफलतापूर्वक साफ़ कर दिया गया।");
      location.reload();
    }
  };

  // =========================================================================
  // 5. CLINICAL DECISION ENGINE, 5-TIER RENDERER, STAGE TRACKER & GEMINI AI
  // =========================================================================

  window._setDiagnosisMode = function (modeKey) {
    window.VETCARE_STATE.activeDiagnosisMode = modeKey;
    var btn1 = _getEl("btnDiagMode1");
    var btn2 = _getEl("btnDiagMode2");
    var btn3 = _getEl("btnDiagMode3");

    var pMatrix = _getEl("panelDiagMatrix");
    var pHybrid = _getEl("panelDiagHybrid");
    var pDirectory = _getEl("panelDiagDirectory");

    [btn1, btn2, btn3].forEach(function (b) {
      if (b) b.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
    });

    if (modeKey === "SYMPTOMS") {
      if (btn1) btn1.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      if (pMatrix) pMatrix.classList.remove("hidden");
      if (pHybrid) pHybrid.classList.add("hidden");
      if (pDirectory) pDirectory.classList.add("hidden");
      applyMatrixFilters();
    } else if (modeKey === "HYBRID") {
      if (btn2) btn2.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      if (pMatrix) pMatrix.classList.add("hidden");
      if (pHybrid) pHybrid.classList.remove("hidden");
      if (pDirectory) pDirectory.classList.add("hidden");
      handleAppSearch();
    } else {
      if (btn3) btn3.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      if (pMatrix) pMatrix.classList.add("hidden");
      if (pHybrid) pHybrid.classList.add("hidden");
      if (pDirectory) pDirectory.classList.remove("hidden");
      filterByTag("ALL", null);
    }
  };

  window._toggleMatrixParam = function (type, val, btn) {
    if (type === "temp") {
      if (window.VETCARE_STATE.matrixSelected.temp === val) {
        window.VETCARE_STATE.matrixSelected.temp = null;
        if (btn) btn.classList.remove("chip-active");
      } else {
        window.VETCARE_STATE.matrixSelected.temp = val;
        var siblings = btn.parentNode.querySelectorAll(".m-chip");
        siblings.forEach(function (s) { s.classList.remove("chip-active"); });
        if (btn) btn.classList.add("chip-active");
      }
    }
    applyMatrixFilters();
  };

  window._toggleSecSymptom = function (symptomKey, btn) {
    var list = window.VETCARE_STATE.matrixSelected.secondary;
    var idx = list.indexOf(symptomKey);

    if (idx > -1) {
      list.splice(idx, 1);
      if (btn) btn.classList.remove("chip-active");
    } else {
      list.push(symptomKey);
      if (btn) btn.classList.add("chip-active");
    }

    applyMatrixFilters();
  };

  window._resetSymptomMatrix = function () {
    window.VETCARE_STATE.matrixSelected = { temp: null, cardinal: "ALL", secondary: [] };
    var chips = document.querySelectorAll(".m-chip, .s-chip");
    chips.forEach(function (c) { c.classList.remove("chip-active"); });
    _setVal("selCardinalSign", "ALL");
    applyMatrixFilters();
  };

  window._applyMatrixFilters = function () {
    var cardVal = _val("selCardinalSign");
    window.VETCARE_STATE.matrixSelected.cardinal = cardVal;

    var db = window.VETCARE_DISEASE_DB || [];
    var results = [];

    db.forEach(function (disease) {
      var score = 0;

      // 1. Temperature Match (20%)
      if (window.VETCARE_STATE.matrixSelected.temp) {
        if (disease.temp === window.VETCARE_STATE.matrixSelected.temp) {
          score += 20;
        }
      }

      // 2. Cardinal Sign Match (40%)
      if (cardVal && cardVal !== "ALL") {
        if (disease.cardinal === cardVal) {
          score += 40;
        }
      }

      // 3. Secondary Match (Up to 40%)
      var secList = window.VETCARE_STATE.matrixSelected.secondary;
      if (secList.length > 0) {
        var matchCount = 0;
        secList.forEach(function (sec) {
          var descLower = (disease.desc || "") + " " + JSON.stringify(disease.pathologicalTrajectory || {});
          if (descLower.toLowerCase().includes(sec.toLowerCase())) {
            matchCount++;
          }
        });
        var secScore = Math.min(40, (matchCount / secList.length) * 40);
        score += secScore;
      }

      var finalScore = Math.round(score);
      results.push({ disease: disease, matchScore: finalScore });
    });

    results.sort(function (a, b) { return b.matchScore - a.matchScore; });
    renderDiseaseResults(results);
  };

  window._handleAppSearch = function () {
    var query = _val("unifiedSearchInput").toLowerCase();
    var db = window.VETCARE_DISEASE_DB || [];
    var matched = [];

    db.forEach(function (d) {
      var searchable = (d.nameEn + " " + d.nameHi + " " + (d.ruralNames || []).join(" ") + " " + (d.desc || "")).toLowerCase();
      if (searchable.includes(query)) {
        matched.push({ disease: d, matchScore: 100 });
      }
    });

    if (matched.length === 0 && query.length >= 3) {
      renderAiSynthesisFallbackPrompt(query);
      return;
    }

    renderDiseaseResults(matched);
  };

  window._filterByTag = function (tag, btn) {
    if (btn) {
      var siblings = btn.parentNode.querySelectorAll(".q-chip");
      siblings.forEach(function (s) {
        s.className = "q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
      });
      btn.className = "q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }

    var db = window.VETCARE_DISEASE_DB || [];
    var filtered = [];

    db.forEach(function (d) {
      if (tag === "ALL" || d.category.toUpperCase() === tag.toUpperCase()) {
        filtered.push({ disease: d, matchScore: 100 });
      }
    });

    renderDiseaseResults(filtered);
  };

  function renderDiseaseResults(resultItems) {
    var container = _getEl("diseaseSearchResults");
    if (!container) return;

    if (resultItems.length === 0) {
      container.innerHTML = '<div class="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">कोई बीमारी या लक्षण मैच नहीं हुआ।</div>';
      return;
    }

    var html = "";
    resultItems.forEach(function (item) {
      var d = item.disease;
      var score = item.matchScore || 0;
      var isPregActive = _val("opdPregnancy") === "गाभिन (Pregnant)";

      html += '<div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">';
      html += '<div class="flex justify-between items-start border-b border-slate-100 pb-3">';
      html += '<div>';
      html += '<span class="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md">' + d.category + '</span>';
      html += '<h3 class="text-base sm:text-lg font-black text-slate-900 mt-1">' + d.nameHi + ' (' + d.nameEn + ')</h3>';
      html += '<p class="text-[11px] text-slate-500 font-medium">ग्रामीण नाम: ' + (d.ruralNames || []).join(", ") + '</p>';
      html += '</div>';
      html += '<div class="text-right">';
      html += '<span class="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl">' + score + '% संभावना</span>';
      html += '</div></div>';

      // Etiology & Confirmatory Lab Diagnosis
      html += '<div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">';
      html += '<p><strong>रोगजनक (Etiology):</strong> ' + d.etiology + '</p>';
      if (d.confirmatoryLabDiagnosis) {
        html += '<p><strong>लैब जांच:</strong> ' + d.confirmatoryLabDiagnosis.testName + ' (खर्च: ₹' + d.confirmatoryLabDiagnosis.approxCostINR + ') | <em>' + d.confirmatoryLabDiagnosis.keyMarker + '</em></p>';
      }
      html += '</div>';

      // 4-Stage Trajectory & Bidirectional Timelines
      if (d.pathologicalTrajectory) {
        var traj = d.pathologicalTrajectory;
        html += '<div class="space-y-2">';
        html += '<h4 class="text-xs font-bold text-slate-900 flex items-center gap-1.5"><i class="fa-solid fa-chart-line text-blue-600"></i> रोग की 4-स्तरीय प्रगति एवं द्विदिशीय टाइमलाइन:</h4>';
        html += '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">';
        html += '<div class="bg-blue-50 p-2 rounded-xl border border-blue-200"><strong class="text-blue-900 block">Stage 1 (प्रारंभिक)</strong><span>' + traj.stage1.signs + ' (' + traj.stage1.durationHours + 'h)</span></div>';
        html += '<div class="bg-amber-50 p-2 rounded-xl border border-amber-200"><strong class="text-amber-900 block">Stage 2 (तीव्र)</strong><span>' + traj.stage2.signs + ' (' + traj.stage2.durationHours + 'h)</span></div>';
        html += '<div class="bg-orange-50 p-2 rounded-xl border border-orange-200"><strong class="text-orange-900 block">Stage 3 (गंभीर)</strong><span>' + traj.stage3.signs + ' (' + traj.stage3.durationHours + 'h)</span></div>';
        html += '<div class="bg-rose-50 p-2 rounded-xl border border-rose-200"><strong class="text-rose-900 block">Stage 4 (अंतिम)</strong><span>' + traj.stage4.signs + ' (' + traj.stage4.durationHours + 'h)</span></div>';
        html += '</div>';

        // Bidirectional Timelines Cards
        html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">';
        html += '<div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-1">';
        html += '<strong class="text-emerald-900 font-bold block"><i class="fa-solid fa-arrow-trend-up"></i> हरी रेखा: सही उपचार पर सुधार टाइमलाइन</strong>';
        (traj.positiveRecoveryTimeline || []).forEach(function (pos) {
          html += '<p class="text-[11px]">• ' + pos + '</p>';
        });
        html += '</div>';
        html += '<div class="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 space-y-1">';
        html += '<strong class="text-rose-900 font-bold block"><i class="fa-solid fa-arrow-trend-down"></i> लाल रेखा: अनुपचारित खराबी / मृत्यु टाइमलाइन</strong>';
        (traj.negativeDeteriorationTimeline || []).forEach(function (neg) {
          html += '<p class="text-[11px]">• ' + neg + '</p>';
        });
        html += '</div></div></div>';
      }

      // 5-Tier Treatment Protocols
      if (d.treatmentProtocol) {
        var tp = d.treatmentProtocol;
        html += '<div class="space-y-3 pt-2">';
        html += '<h4 class="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1">5-स्तरीय संपूर्ण क्लिनिकल उपचार प्रोटोकॉल:</h4>';

        // Tier 1: Injections Table
        if (tp.injections && tp.injections.length > 0) {
          html += '<div class="overflow-x-auto"><table class="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">';
          html += '<thead class="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold"><tr><th class="p-2">इंजेक्शन व साल्ट</th><th class="p-2">डोज़ (400kg)</th><th class="p-2">रूट</th><th class="p-2">गाभिन सुरक्षा</th></tr></thead>';
          html += '<tbody class="divide-y divide-slate-200 font-medium">';
          tp.injections.forEach(function (inj) {
            var isContra = inj.pregnancyAlertBadge && inj.pregnancyAlertBadge.includes("CONTRAINDICATED");
            var alertClass = (isPregActive && isContra) ? "text-rose-600 font-bold bg-rose-50" : "text-slate-600";

            html += '<tr class="' + alertClass + '">';
            html += '<td class="p-2"><strong>' + inj.activeSalt + '</strong><br><span class="text-[10px] text-slate-500 font-sans">' + inj.brands + '</span></td>';
            html += '<td class="p-2">' + inj.standardDose400kg + '</td>';
            html += '<td class="p-2 font-mono text-[11px]">' + inj.route + '</td>';
            html += '<td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] ' + (isContra ? 'bg-rose-100 text-rose-700 font-bold' : 'bg-emerald-100 text-emerald-800') + '">' + inj.pregnancyAlertBadge + '</span></td>';
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        }

        // Tier 2: Oral Medicines & Supplements
        if (tp.oralMeds && tp.oralMeds.length > 0) {
          html += '<div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">';
          html += '<strong class="text-slate-800 block font-bold">ओरल दवाएं व सप्लीमेंट्स:</strong>';
          tp.oralMeds.forEach(function (oral) {
            html += '<p class="text-[11px]">• <strong>' + oral.brands + ':</strong> ' + oral.dosage + ' (' + oral.frequency + ') - <em>' + oral.purpose + '</em></p>';
          });
          html += '</div>';
        }

        // Tier 3: Ayurvedic & Homeopathic Remedies
        html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">';
        if (tp.ayurvedicHerbal && tp.ayurvedicHerbal.length > 0) {
          html += '<div class="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-xl">';
          html += '<strong class="text-emerald-900 block font-bold">🌿 आयुर्वेदिक नुस्खे:</strong>';
          tp.ayurvedicHerbal.forEach(function (ayur) {
            html += '<p class="text-[11px]">' + ayur.brands + ' (' + ayur.ingredients + ') - डोज़: ' + ayur.dosage + '</p>';
          });
          html += '</div>';
        }
        if (tp.homeopathic && tp.homeopathic.length > 0) {
          html += '<div class="p-2.5 bg-blue-50/50 border border-blue-200 rounded-xl">';
          html += '<strong class="text-blue-900 block font-bold">💧 होम्योपैथिक औषधियां:</strong>';
          tp.homeopathic.forEach(function (hom) {
            html += '<p class="text-[11px]">' + hom.remedy + ' ' + hom.potency + ' (' + hom.dosage + ' - ' + hom.administrationMode + ')</p>';
          });
          html += '</div>';
        }
        html += '</div>';

        // Tier 4: Desi Home Remedies
        if (tp.homeMadeDesi && tp.homeMadeDesi.length > 0) {
          html += '<div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1">';
          html += '<strong class="text-amber-900 block font-bold">🥣 सिद्ध देसी नुस्खे:</strong>';
          tp.homeMadeDesi.forEach(function (desi) {
            html += '<p class="text-[11px]"><strong>' + desi.title + ':</strong> ' + desi.ingredients + '<br><em>बनाने की विधि:</em> ' + desi.preparation + '<br><em>डोज़:</em> ' + desi.dosage + '</p>';
          });
          html += '</div>';
        }

        // Tier 5: Shed Hygiene & Biosecurity
        if (tp.shedHygieneBiosecurity) {
          var bio = tp.shedHygieneBiosecurity;
          html += '<div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">';
          html += '<strong>बाड़ा स्वच्छता व बायोसिक्योरिटी:</strong> ' + bio.sanitationSteps + ' | ' + bio.chemicalDisinfection;
          html += '</div>';
        }
        html += '</div>';
      }

      // Action: Fill into OPD Sheet
      html += '<div class="pt-2 text-right">';
      html += '<button onclick="fillDiseaseIntoOPD(\'' + d.id + '\')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-xs">';
      html += '📋 इस रोग की पर्ची बनाएं ➔';
      html += '</button></div>';

      html += '</div>';
    });

    container.innerHTML = html;
  }

  window.fillDiseaseIntoOPD = function (diseaseId) {
    var db = window.VETCARE_DISEASE_DB || [];
    var d = db.find(function (item) { return item.id === diseaseId; });
    if (!d) return;

    window._switchTab("doc_opd");
    _setVal("opdDiagnosis", d.nameHi + " (" + d.nameEn + ")");

    var rxText = "";
    if (d.treatmentProtocol && d.treatmentProtocol.injections) {
      d.treatmentProtocol.injections.forEach(function (inj, i) {
        rxText += (i + 1) + ". Inj. " + inj.activeSalt + " (" + inj.standardDose400kg + ") - " + inj.route + "\n";
      });
    }
    if (d.treatmentProtocol && d.treatmentProtocol.oralMeds) {
      d.treatmentProtocol.oralMeds.forEach(function (oral) {
        rxText += "• " + oral.brands + " - " + oral.dosage + " (" + oral.frequency + ")\n";
      });
    }

    _setVal("opdMedicine", rxText);
  };

  function renderAiSynthesisFallbackPrompt(query) {
    var container = _getEl("diseaseSearchResults");
    if (!container) return;

    var html = '<div class="bg-purple-50 border border-purple-200 rounded-3xl p-6 text-center space-y-3">';
    html += '<i class="fa-solid fa-wand-magic-sparkles text-purple-600 text-3xl"></i>';
    html += '<h3 class="text-sm sm:text-base font-bold text-purple-900">रोग डेटाबेस में "' + query + '" उपलब्ध नहीं है</h3>';
    html += '<p class="text-xs text-purple-700 max-w-md mx-auto">क्या आप Gemini AI से इस रोग का संपूर्ण वैज्ञानिक 5-स्तरीय क्लिनिकल प्रोटोकॉल सिंथेसाइज़ करना चाहते हैं?</p>';
    html += '<button onclick="triggerGeminiDiseaseSynthesis(\'' + encodeURIComponent(query) + '\')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-2xl text-xs shadow-md shadow-purple-600/30 transition">';
    html += '✨ AI द्वारा नया रोग सिंथेसाइज़ करें';
    html += '</button></div>';

    container.innerHTML = html;
  }

  window.triggerGeminiDiseaseSynthesis = async function (encodedQuery) {
    var query = decodeURIComponent(encodedQuery);
    var container = _getEl("diseaseSearchResults");
    if (container) {
      container.innerHTML = '<div class="p-8 text-center text-purple-700 bg-purple-50 rounded-3xl border border-purple-200"><i class="fa-solid fa-spinner fa-spin text-2xl mb-2"></i><br>लाइव AI वेटरनरी पैथोलॉजिस्ट क्लिनिकल डेटा जनरेट कर रहा है...</div>';
    }

    try {
      if (typeof window.synthesizeDiseaseWithAI === "function") {
        var profile = await window.synthesizeDiseaseWithAI(query);
        renderDiseaseResults([{ disease: profile, matchScore: 100 }]);
      } else {
        alert("AI Synthesis engine unavailable.");
      }
    } catch (err) {
      alert("AI Synthesis Error: " + err.message);
      _handleAppSearch();
    }
  };

  // AI Key Management
  window._openAiKeyModal = function () {
    _show("modalAIKey");
    _setVal("inputGeminiKey", localStorage.getItem("vetcare_gemini_api_key") || "");
  };

  window._closeAiKeyModal = function () {
    _hide("modalAIKey");
  };

  window._saveAiApiKey = function () {
    var key = _val("inputGeminiKey");
    if (!key || key.length < 15) {
      alert("कृपया वैध Gemini API Key दर्ज करें।");
      return;
    }
    localStorage.setItem("vetcare_gemini_api_key", key);
    alert("Gemini AI API Key सुरक्षित कर ली गई है!");
    _hide("modalAIKey");
  };

  // =========================================================================
  // 6. SMART FIELD UTILITIES & SCIENTIFIC CALCULATIONS
  // =========================================================================

  // Shaeffer's Weight Formula: (Girth^2 * Length / 300) * 0.4536
  window._calculateShaefferWeight = function () {
    var girth = parseFloat(_val("calcGirth")) || 0;
    var length = parseFloat(_val("calcLength")) || 0;

    if (girth <= 0 || length <= 0) return;

    var weightLbs = (Math.pow(girth, 2) * length) / 300;
    var weightKg = Math.round(weightLbs * 0.453592);

    _setText("dispCalcWeight", weightKg + " kg");

    // Exact Dose Calculations
    var doseCeftiofur = Math.round((weightKg * 1.1) / 50 * 10) / 10;
    var doseMelonex = Math.round((weightKg * 0.5) / 5 * 10) / 10;

    _setText("doseCeftiofur", (weightKg * 0.0022).toFixed(1) + " g (" + doseCeftiofur + " ml)");
    _setText("doseMelonex", doseMelonex + " ml IM");
    _setText("doseCalcium", "450 ml (IV+SC)");
  };

  // 24-Hour Balanced Ration (Feed Balancer)
  window._calculateRation = function () {
    var weight = parseFloat(_val("feedWeight")) || 400;
    var milk = parseFloat(_val("feedMilk")) || 10;

    // Scientific requirements
    var maintenanceGrain = 1.5;
    var productionGrain = milk * 0.4; // 400g per liter
    var totalGrain = (maintenanceGrain + productionGrain).toFixed(1);

    var greenFodder = Math.round(weight * 0.06); // 6% of body weight
    var dryFodder = (weight * 0.012).toFixed(1); // 1.2% of body weight

    _setText("resFeedGrain", totalGrain + " kg");
    _setText("resFeedGreen", greenFodder + " kg");
    _setText("resFeedDry", dryFodder + " kg");

    _show("rationResultCard");
  };

  // Breeding & Gestation Milestone Engine
  window._calculateBreeding = function () {
    var dateStr = _val("calcAiDate");
    var animalType = _val("calcAiAnimalType");

    if (!dateStr) {
      alert("कृपया सीमन (A.I.) डलवाने की तारीख चुनें।");
      return;
    }

    var aiDate = new Date(dateStr);
    var gestationDays = animalType === "BUFFALO" ? 310 : 283;

    function addDays(d, days) {
      var res = new Date(d);
      res.setDate(res.getDate() + days);
      return res.toLocaleDateString("hi-IN", { day: "numeric", month: "short", year: "numeric" });
    }

    _setText("resHeat21", addDays(aiDate, 21));
    _setText("resPD60", addDays(aiDate, 60));
    _setText("resDryOff", addDays(aiDate, gestationDays - 60));
    _setText("resCalvingDate", addDays(aiDate, gestationDays));

    _show("breedingResultCard");
  };

  // =========================================================================
  // 7. COMPREHENSIVE DIGITAL OPD & 3-WAY OUTREACH
  // =========================================================================

  window._setOpdService = function (serviceKey, btn) {
    window.VETCARE_STATE.opdCurrentService = serviceKey;
    if (btn) {
      var siblings = btn.parentNode.querySelectorAll(".opd-srv-chip");
      siblings.forEach(function (s) {
        s.className = "opd-srv-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
      });
      btn.className = "opd-srv-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }
  };

  window._captureGPSLocation = function () {
    var btn = _getEl("btnGPS");
    if (!navigator.geolocation) {
      alert("आपके डिवाइस पर GPS उपलब्ध नहीं है।");
      return;
    }

    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> GPS...';

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var coords = pos.coords.latitude.toFixed(5) + ", " + pos.coords.longitude.toFixed(5);
        window.VETCARE_STATE.gpsLocation = coords;
        _setVal("opdGPS", coords);
        if (btn) btn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> पिन';
      },
      function () {
        _setVal("opdGPS", "28.6139, 77.2090");
        if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> GPS';
      },
      { timeout: 7000 }
    );
  };

  window._calculateDue = function () {
    var total = parseFloat(_val("opdTotalFee")) || 0;
    var paid = parseFloat(_val("opdPaidFee")) || 0;
    var due = Math.max(0, total - paid);
    _setVal("opdDueFee", due.toString());
  };

  window._clearRxField = function () {
    _setVal("opdMedicine", "");
  };

  function assembleOPDData() {
    var farmerName = _val("opdFarmerName");
    var farmerPhone = _val("opdFarmerPhone");
    var diagnosis = _val("opdDiagnosis");

    if (!farmerName || !farmerPhone || farmerPhone.length !== 10) {
      alert("कृपया किसान का नाम व 10 अंकों का मोबाइल नंबर अवश्य भरें।");
      return null;
    }

    return {
      caseId: "FID-" + Date.now().toString().slice(-6),
      farmerName: farmerName,
      farmerPhone: farmerPhone,
      village: _val("opdVillage"),
      animal: _val("opdAnimal"),
      tag: _val("opdTag"),
      gps: _val("opdGPS"),
      pregnancy: _val("opdPregnancy"),
      serviceType: window.VETCARE_STATE.opdCurrentService,
      diagnosis: diagnosis,
      medicine: _val("opdMedicine"),
      totalFee: parseFloat(_val("opdTotalFee")) || 0,
      paidFee: parseFloat(_val("opdPaidFee")) || 0,
      dueFee: parseFloat(_val("opdDueFee")) || 0,
      timestamp: Date.now()
    };
  }

  window._saveOfflineCaseDirectly = function () {
    var data = assembleOPDData();
    if (!data) return;

    var records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    records.unshift(data);
    localStorage.setItem("vetcare_opd_records", JSON.stringify(records));

    // Update Khata if due exists
    if (data.dueFee > 0) {
      var khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
      khata.unshift({
        id: "KH-" + Date.now().toString().slice(-6),
        name: data.farmerName,
        phone: data.farmerPhone,
        amount: data.dueFee,
        type: "DUE",
        note: data.diagnosis + " (केस " + data.caseId + ")",
        timestamp: Date.now()
      });
      localStorage.setItem("vetcare_khata_records", JSON.stringify(khata));
    }

    alert("केस संख्या " + data.caseId + " सफलतापूर्वक सुरक्षित कर लिया गया!");
    loadOPDRecords();
    loadLedgerTable();
  };

  // 3-Way Farmer Outreach
  window._triggerPhoneCall = function () {
    var phone = _val("opdFarmerPhone");
    if (!phone) {
      alert("कृपया किसान का फोन नंबर भरें।");
      return;
    }
    window.location.href = "tel:" + phone;
  };

  window._triggerSmsSlip = function () {
    var data = assembleOPDData();
    if (!data) return;

    var text = "Vetcare OPD पर्ची: " + data.caseId + "\n" +
      "पशु: " + data.animal + " | निदान: " + data.diagnosis + "\n" +
      "दवा: " + data.medicine.replace(/\n/g, ", ") + "\n" +
      "फीस जमा: ₹" + data.paidFee + ", बकाया: ₹" + data.dueFee;

    window.location.href = "sms:" + data.farmerPhone + "?body=" + encodeURIComponent(text);
  };

  window._triggerWhatsAppSlip = function () {
    var data = assembleOPDData();
    if (!data) return;

    window._saveOfflineCaseDirectly();

    var doctor = window.VETCARE_STATE.user || { name: "पशु चिकित्सक" };
    var bank = BANK_CONFIGS[window.VETCARE_STATE.activeBank];

    var msg = "🐾 *VETCARE डिजिटल क्लिनिकल पर्ची* 🐾\n\n" +
      "📋 *केस ID:* " + data.caseId + "\n" +
      "👨‍🌾 *किसान:* " + data.farmerName + " (" + (data.village || "गाँव") + ")\n" +
      "🐄 *मरीज पशु:* " + data.animal + " [टैग: " + (data.tag || "N/A") + "]\n" +
      "🩺 *प्रोविजनल निदान:* " + data.diagnosis + "\n\n" +
      "💉 *प्रिस्क्रिप्शन एवं उपचार (Rx):*\n" + data.medicine + "\n\n" +
      "💰 *फीस विवरण:*\n" +
      "कुल: ₹" + data.totalFee + " | जमा: ₹" + data.paidFee + " | *बकाया: ₹" + data.dueFee + "*\n\n";

    if (data.dueFee > 0) {
      msg += "⚡ *ऑनलाइन भुगतान UPI:* upi://pay?pa=" + bank.upiId + "&pn=" + encodeURIComponent(bank.payee) + "&am=" + data.dueFee + "&cu=INR\n\n";
    }

    msg += "👨‍⚕️ *चिकित्सक:* " + doctor.name + "\n" +
      "शीघ्र स्वास्थ्य लाभ की मंगलकामनाएं! 🌿";

    window.open("https://wa.me/91" + data.farmerPhone + "?text=" + encodeURIComponent(msg), "_blank");
  };

  window._printCurrentOPDSlip = function () {
    var data = assembleOPDData();
    if (!data) return;

    var area = _getEl("printableSlipArea");
    if (!area) return;

    area.innerHTML = '<div style="font-family: sans-serif; padding: 20px; border: 2px solid #333;">' +
      '<div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px;">' +
      '<h2>VETCARE CLINICAL OPD PRESCRIPTION</h2>' +
      '<p>केस ID: ' + data.caseId + ' | तिथि: ' + new Date().toLocaleDateString("hi-IN") + '</p>' +
      '</div>' +
      '<div style="margin-top: 15px;">' +
      '<p><strong>किसान:</strong> ' + data.farmerName + ' (' + data.farmerPhone + ') - ' + (data.village || "") + '</p>' +
      '<p><strong>पशु:</strong> ' + data.animal + ' | टैग: ' + (data.tag || "N/A") + ' | स्थिति: ' + data.pregnancy + '</p>' +
      '<p><strong>निदान:</strong> ' + data.diagnosis + '</p>' +
      '</div>' +
      '<div style="margin-top: 15px; border-top: 1px dashed #666; padding-top: 10px;">' +
      '<h3>Rx दवाएं व इंजेक्शन:</h3>' +
      '<pre style="font-family: inherit; white-space: pre-wrap;">' + data.medicine + '</pre>' +
      '</div>' +
      '<div style="margin-top: 20px; border-top: 1px solid #333; padding-top: 10px;">' +
      '<p>कुल फीस: ₹' + data.totalFee + ' | जमा: ₹' + data.paidFee + ' | बकाया: ₹' + data.dueFee + '</p>' +
      '</div></div>';

    window.print();
  };

  function loadOPDRecords() {
    var records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    var container = _getEl("recordsList");
    _setText("recordTotalBadge", records.length + " केस सुरक्षित");

    if (!container) return;

    if (records.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">कोई केस रिकॉर्ड नहीं है।</div>';
      return;
    }

    var html = "";
    records.forEach(function (r) {
      html += '<div class="p-3 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-xs">';
      html += '<div>';
      html += '<strong class="text-slate-900 block">' + r.caseId + ' • ' + r.farmerName + '</strong>';
      html += '<span class="text-[11px] text-slate-500">' + r.animal + ' | ' + r.diagnosis + ' | ' + new Date(r.timestamp).toLocaleDateString("hi-IN") + '</span>';
      html += '</div>';
      html += '<div class="text-right">';
      html += '<span class="text-xs font-bold ' + (r.dueFee > 0 ? 'text-rose-600' : 'text-emerald-600') + '">बकाया: ₹' + r.dueFee + '</span>';
      html += '</div></div>';
    });

    container.innerHTML = html;
  }

  window._handleRecordSearch = function () {
    var q = _val("searchRecordsInput").toLowerCase();
    var records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    var container = _getEl("recordsList");

    if (!container) return;

    var filtered = records.filter(function (r) {
      return (r.farmerName + " " + r.farmerPhone + " " + (r.village || "") + " " + r.caseId).toLowerCase().includes(q);
    });

    var html = "";
    filtered.forEach(function (r) {
      html += '<div class="p-3 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-xs">';
      html += '<div>';
      html += '<strong class="text-slate-900 block">' + r.caseId + ' • ' + r.farmerName + '</strong>';
      html += '<span class="text-[11px] text-slate-500">' + r.animal + ' | ' + r.diagnosis + '</span>';
      html += '</div>';
      html += '<div class="text-right">';
      html += '<span class="text-xs font-bold ' + (r.dueFee > 0 ? 'text-rose-600' : 'text-emerald-600') + '">बकाया: ₹' + r.dueFee + '</span>';
      html += '</div></div>';
    });

    container.innerHTML = html;
  };

  // Treatment Services Ledger Table
  function loadLedgerTable() {
    var records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    var container = _getEl("ledgerTableContainer");
    _setText("ledgerCountBadge", records.length + " रिकॉर्ड");

    if (!container) return;

    if (records.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">कोई हिस्ट्री रिकॉर्ड नहीं है।</div>';
      return;
    }

    var html = '<div class="overflow-x-auto"><table class="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden bg-white">';
    html += '<thead class="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold"><tr><th class="p-2.5">तारीख</th><th class="p-2.5">किसान / फोन</th><th class="p-2.5">पशु / टैग</th><th class="p-2.5">सेवा प्रकार</th><th class="p-2.5">निदान व उपचार</th><th class="p-2.5">फीस</th></tr></thead>';
    html += '<tbody class="divide-y divide-slate-200">';

    records.forEach(function (r) {
      html += '<tr class="hover:bg-slate-50">';
      html += '<td class="p-2.5 font-mono text-[11px]">' + new Date(r.timestamp).toLocaleDateString("hi-IN") + '</td>';
      html += '<td class="p-2.5"><strong>' + r.farmerName + '</strong><br><span class="text-slate-400 font-mono">' + r.farmerPhone + '</span></td>';
      html += '<td class="p-2.5">' + r.animal + '<br><span class="text-slate-400 text-[10px]">' + (r.tag || "N/A") + '</span></td>';
      html += '<td class="p-2.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">' + (r.serviceType || "GENERAL") + '</span></td>';
      html += '<td class="p-2.5"><strong>' + r.diagnosis + '</strong></td>';
      html += '<td class="p-2.5 font-bold">₹' + r.paidFee + ' <span class="text-rose-600">(-₹' + r.dueFee + ')</span></td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  window._handleLedgerSearch = function () {
    var q = _val("searchLedgerInput").toLowerCase();
    var records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
    var container = _getEl("ledgerTableContainer");

    if (!container) return;

    var filtered = records.filter(function (r) {
      return (r.farmerName + " " + r.farmerPhone + " " + (r.tag || "") + " " + r.diagnosis).toLowerCase().includes(q);
    });

    var html = '<div class="overflow-x-auto"><table class="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden bg-white">';
    html += '<thead class="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold"><tr><th class="p-2.5">तारीख</th><th class="p-2.5">किसान / फोन</th><th class="p-2.5">पशु / टैग</th><th class="p-2.5">सेवा</th><th class="p-2.5">निदान</th><th class="p-2.5">फीस</th></tr></thead>';
    html += '<tbody class="divide-y divide-slate-200">';

    filtered.forEach(function (r) {
      html += '<tr class="hover:bg-slate-50">';
      html += '<td class="p-2.5 font-mono text-[11px]">' + new Date(r.timestamp).toLocaleDateString("hi-IN") + '</td>';
      html += '<td class="p-2.5"><strong>' + r.farmerName + '</strong><br><span class="text-slate-400 font-mono">' + r.farmerPhone + '</span></td>';
      html += '<td class="p-2.5">' + r.animal + '</td>';
      html += '<td class="p-2.5">' + (r.serviceType || "GENERAL") + '</td>';
      html += '<td class="p-2.5 font-bold">' + r.diagnosis + '</td>';
      html += '<td class="p-2.5 font-bold">₹' + r.paidFee + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
  };

  // =========================================================================
  // 8. MULTI-HORIZON FINANCIAL KHATA & 1-CLICK WHATSAPP TAGADA
  // =========================================================================

  window._filterKhataHorizon = function (horizonKey, btn) {
    window.VETCARE_STATE.activeKhataHorizon = horizonKey;
    if (btn) {
      var siblings = btn.parentNode.querySelectorAll(".khata-chip");
      siblings.forEach(function (s) {
        s.className = "khata-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
      });
      btn.className = "khata-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }
    renderKhataList();
  };

  window._openNewKhataModal = function () {
    _show("modalNewKhata");
  };

  window._closeNewKhataModal = function () {
    _hide("modalNewKhata");
  };

  window._saveNewKhataRecord = function () {
    var name = _val("khataFarmerName");
    var phone = _val("khataFarmerPhone");
    var amount = parseFloat(_val("khataAmount")) || 0;
    var type = _val("khataType");
    var note = _val("khataNote");

    if (!name || !phone || amount <= 0) {
      alert("कृपया किसान का नाम, फोन और वैध राशि भरें।");
      return;
    }

    var khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    khata.unshift({
      id: "KH-" + Date.now().toString().slice(-6),
      name: name,
      phone: phone,
      amount: amount,
      type: type,
      note: note,
      timestamp: Date.now()
    });

    localStorage.setItem("vetcare_khata_records", JSON.stringify(khata));
    _hide("modalNewKhata");
    renderKhataList();
  };

  window._renderKhataList = function () {
    var khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    var container = _getEl("finDueList");
    var search = _val("searchKhataInput").toLowerCase();
    var horizon = window.VETCARE_STATE.activeKhataHorizon;

    var now = Date.now();
    var horizonLimits = {
      DAILY: 24 * 60 * 60 * 1000,
      WEEKLY: 7 * 24 * 60 * 60 * 1000,
      MONTHLY: 30 * 24 * 60 * 60 * 1000,
      YEARLY: 365 * 24 * 60 * 60 * 1000,
      LIFETIME: Infinity
    };

    var limitMs = horizonLimits[horizon] || Infinity;

    var filtered = khata.filter(function (k) {
      var matchesSearch = (k.name + " " + k.phone + " " + (k.note || "")).toLowerCase().includes(search);
      var matchesTime = (now - k.timestamp) <= limitMs;
      return matchesSearch && matchesTime;
    });

    var totalCredit = 0;
    var totalDebit = 0;

    filtered.forEach(function (k) {
      if (k.type === "PAID") totalCredit += k.amount;
      else totalDebit += k.amount;
    });

    _setText("finCredit", "₹" + totalCredit.toLocaleString("en-IN"));
    _setText("finDebit", "₹" + totalDebit.toLocaleString("en-IN"));

    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">इस समयावधि में कोई लेन-देन नहीं है।</div>';
      return;
    }

    var html = "";
    filtered.forEach(function (k) {
      var isDue = k.type === "DUE";
      var colorClass = isDue ? "text-rose-600" : "text-emerald-700";
      var badge = isDue ? "बकाया (Due)" : "जमा (Paid)";

      html += '<div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center shadow-xs">';
      html += '<div>';
      html += '<strong class="text-slate-900 block">' + k.name + ' (' + k.phone + ')</strong>';
      html += '<span class="text-[11px] text-slate-500">' + (k.note || "सामान्य लेन-देन") + ' • ' + new Date(k.timestamp).toLocaleDateString("hi-IN") + '</span>';
      html += '</div>';
      html += '<div class="text-right space-y-1">';
      html += '<strong class="text-sm font-black block ' + colorClass + '">₹' + k.amount.toLocaleString("en-IN") + '</strong>';
      if (isDue) {
        html += '<button onclick="sendKhataTagadaWhatsApp(\'' + k.name + '\', \'' + k.phone + '\', ' + k.amount + ')" class="text-[10px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-2 py-0.5 rounded-lg border border-emerald-200 transition">';
        html += '<i class="fa-brands fa-whatsapp"></i> तगादा';
        html += '</button>';
      } else {
        html += '<span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">' + badge + '</span>';
      }
      html += '</div></div>';
    });

    container.innerHTML = html;
  };

  // 1-Click WhatsApp Tagada Dispatch
  window._sendKhataTagadaWhatsApp = function (farmerName, phone, amount) {
    var doctor = window.VETCARE_STATE.user || { name: "पशु चिकित्सक" };
    var bank = BANK_CONFIGS[window.VETCARE_STATE.activeBank];

    var msg = "नमस्ते " + farmerName + " जी,\n\n" +
      "Vetcare क्लिनिक के बहीखाता अनुसार आपका कुल बकाया *₹" + amount + "* शेष है।\n" +
      "कृपया नीचे दिए गए UPI लिंक द्वारा भुगतान करने की कृपा करें:\n\n" +
      "⚡ *UPI डायरेक्ट पे:* upi://pay?pa=" + bank.upiId + "&pn=" + encodeURIComponent(bank.payee) + "&am=" + amount + "&cu=INR\n\n" +
      "धन्यवाद,\n" + doctor.name + " (पशु चिकित्सा सेवा)";

    window.open("https://wa.me/91" + phone + "?text=" + encodeURIComponent(msg), "_blank");
  };

  // =========================================================================
  // 9. MILK LEDGER, STOCK INVENTORY & PRIVACY-FIRST GPS P2P RADAR
  // =========================================================================

  // Daily Milk Ledger
  window._saveDailyMilk = function () {
    var shift = _val("milkShift");
    var liters = parseFloat(_val("milkLiters")) || 0;
    var fat = parseFloat(_val("milkFat")) || 0;
    var rate = parseFloat(_val("milkRate")) || 55;

    if (liters <= 0) {
      alert("कृपया दूध की सही मात्रा (लीटर) भरें।");
      return;
    }

    var records = JSON.parse(localStorage.getItem("vetcare_milk_records") || "[]");
    records.unshift({
      id: "MLK-" + Date.now().toString().slice(-6),
      shift: shift,
      liters: liters,
      fat: fat,
      rate: rate,
      totalPrice: Math.round(liters * rate),
      timestamp: Date.now()
    });

    localStorage.setItem("vetcare_milk_records", JSON.stringify(records));
    _setVal("milkLiters", "");
    renderMilkRecords();
  };

  function renderMilkRecords() {
    var records = JSON.parse(localStorage.getItem("vetcare_milk_records") || "[]");
    var container = _getEl("milkRecordsContainer");

    var todayLiters = 0;
    records.forEach(function (m) {
      if (new Date(m.timestamp).toDateString() === new Date().toDateString()) {
        todayLiters += m.liters;
      }
    });

    _setText("milkTotalLitersToday", "आज: " + todayLiters + " L");

    if (!container) return;

    if (records.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">दूध बिक्री का कोई रिकॉर्ड नहीं है।</div>';
      return;
    }

    var html = "";
    records.forEach(function (m, idx) {
      html += '<div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center shadow-xs">';
      html += '<div>';
      html += '<strong class="text-slate-900 block">' + m.shift + ' • ' + m.liters + ' लीटर</strong>';
      html += '<span class="text-[11px] text-slate-500">फैट: ' + (m.fat || "N/A") + '% | भाव: ₹' + m.rate + '/L | ' + new Date(m.timestamp).toLocaleDateString("hi-IN") + '</span>';
      html += '</div>';
      html += '<div class="text-right flex items-center gap-2">';
      html += '<strong class="text-sm font-black text-emerald-700">₹' + m.totalPrice + '</strong>';
      html += '<button onclick="deleteMilkRecord(' + idx + ')" class="text-rose-500 hover:text-rose-700 text-xs font-bold">✕</button>';
      html += '</div></div>';
    });

    container.innerHTML = html;
  }

  window._deleteMilkRecord = function (index) {
    var records = JSON.parse(localStorage.getItem("vetcare_milk_records") || "[]");
    records.splice(index, 1);
    localStorage.setItem("vetcare_milk_records", JSON.stringify(records));
    renderMilkRecords();
  };

  // Stock Inventory Management
  window._openNewInventoryItemModal = function () {
    _show("modalNewInventory");
  };

  window._closeNewInventoryModal = function () {
    _hide("modalNewInventory");
  };

  window._saveNewInventoryItem = function () {
    var name = _val("invItemName");
    var category = _val("invItemCategory");
    var stock = parseFloat(_val("invItemStock")) || 0;
    var minAlert = parseFloat(_val("invItemMinAlert")) || 3;
    var unit = _val("invItemUnit") || "vials";

    if (!name || stock < 0) {
      alert("कृपया दवा/सीमन का नाम और मात्रा भरें।");
      return;
    }

    var inventory = JSON.parse(localStorage.getItem("vetcare_inventory") || "[]");
    inventory.unshift({
      id: "INV-" + Date.now().toString().slice(-6),
      name: name,
      category: category,
      stock: stock,
      minAlert: minAlert,
      unit: unit,
      timestamp: Date.now()
    });

    localStorage.setItem("vetcare_inventory", JSON.stringify(inventory));
    _hide("modalNewInventory");
    renderInventory();
  };

  window._adjustStock = function (index, delta) {
    var inventory = JSON.parse(localStorage.getItem("vetcare_inventory") || "[]");
    if (inventory[index]) {
      inventory[index].stock = Math.max(0, inventory[index].stock + delta);
      localStorage.setItem("vetcare_inventory", JSON.stringify(inventory));
      renderInventory();
    }
  };

  window._filterInventoryCategory = function (catKey, btn) {
    if (btn) {
      var siblings = btn.parentNode.querySelectorAll(".inv-chip");
      siblings.forEach(function (s) {
        s.className = "inv-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
      });
      btn.className = "inv-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }
    renderInventory(catKey);
  };

  function renderInventory(filterCat) {
    filterCat = filterCat || "ALL";
    var inventory = JSON.parse(localStorage.getItem("vetcare_inventory") || "[]");
    var container = _getEl("inventoryItemsContainer");
    var hasLowStock = false;

    if (!container) return;

    var filtered = inventory.filter(function (item) {
      if (item.stock <= item.minAlert) hasLowStock = true;
      return filterCat === "ALL" || item.category === filterCat;
    });

    var alertBadge = _getEl("lowStockAlertBadge");
    if (alertBadge) {
      if (hasLowStock) alertBadge.classList.remove("hidden");
      else alertBadge.classList.add("hidden");
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">कोई इन्वेंट्री आइटम नहीं है।</div>';
      return;
    }

    var html = "";
    filtered.forEach(function (item, idx) {
      var isLow = item.stock <= item.minAlert;
      var alertClass = isLow ? "border-rose-300 bg-rose-50/40" : "border-slate-200 bg-white";

      html += '<div class="p-3 border rounded-2xl flex justify-between items-center shadow-xs ' + alertClass + '">';
      html += '<div>';
      html += '<strong class="text-slate-900 block">' + item.name + '</strong>';
      html += '<span class="text-[11px] text-slate-500">श्रेणी: ' + item.category + ' | न्यूनतम अलर्ट: ' + item.minAlert + ' ' + item.unit + '</span>';
      html += '</div>';
      html += '<div class="flex items-center gap-2">';
      html += '<button onclick="adjustStock(' + idx + ', -1)" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700">-</button>';
      html += '<strong class="text-xs sm:text-sm font-black ' + (isLow ? 'text-rose-600' : 'text-slate-800') + '">' + item.stock + ' ' + item.unit + '</strong>';
      html += '<button onclick="adjustStock(' + idx + ', 1)" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700">+</button>';
      html += '</div></div>';
    });

    container.innerHTML = html;
  }

  // Privacy-First Local Farmer GPS Radar (5 KM)
  window._openGpsRadarModal = function () {
    _show("modalGpsRadar");
    calculateNearbyFarmersRadar();
  };

  window._closeGpsRadarModal = function () {
    _hide("modalGpsRadar");
  };

  function calculateNearbyFarmersRadar() {
    var container = _getEl("radarFarmersList");
    if (!container) return;

    if (!navigator.geolocation) {
      container.innerHTML = '<div class="p-3 text-center text-slate-400">GPS उपलब्ध नहीं है।</div>';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var myLat = pos.coords.latitude;
        var myLon = pos.coords.longitude;

        // Mock peer nodes in 5km radius with Haversine distance
        var peers = [
          { id: "FID-8412", lat: myLat + 0.012, lon: myLon + 0.010, stock: "8 मुर्राह भैंस" },
          { id: "FID-2901", lat: myLat - 0.018, lon: myLon - 0.015, stock: "14 साहीवाल गाय" },
          { id: "FID-6134", lat: myLat + 0.025, lon: myLon - 0.020, stock: "6 गिर गाय" }
        ];

        function haversine(lat1, lon1, lat2, lon2) {
          var R = 6371; // km
          var dLat = (lat2 - lat1) * Math.PI / 180;
          var dLon = (lon2 - lon1) * Math.PI / 180;
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return (R * c).toFixed(1);
        }

        var html = "";
        peers.forEach(function (peer) {
          var dist = haversine(myLat, myLon, peer.lat, peer.lon);
          html += '<div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">';
          html += '<div>';
          html += '<strong class="text-slate-800 font-mono block">किसान ID: ' + peer.id + '</strong>';
          html += '<span class="text-[11px] text-teal-700 font-semibold"><i class="fa-solid fa-location-dot"></i> दूरी: ' + dist + ' KM • ' + peer.stock + '</span>';
          html += '</div>';
          html += '<button onclick="requestMutualContact(\'' + peer.id + '\', this)" class="text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-2.5 py-1.5 rounded-xl font-bold transition">';
          html += 'आपसी सहमति अनुरोध';
          html += '</button></div>';
        });

        container.innerHTML = html;
      },
      function () {
        // Fallback default mock
      }
    );
  }

  window._requestMutualContact = function (peerId, btn) {
    if (btn) {
      btn.className = "text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1.5 rounded-xl";
      btn.innerHTML = '<i class="fa-solid fa-check"></i> अनुरोध भेजा गया';
    }
    alert(peerId + " को आपसी संपर्क साझा करने का अनुरोध भेज दिया गया है। उनके स्वीकार करते ही फोन नंबर प्रदर्शित होगा।");
  };

  // =========================================================================
  // 10. APP INITIALIZER & ROUTER CONTROLLER
  // =========================================================================

  window._selectRole = function (roleKey) {
    window.VETCARE_STATE.role = roleKey;
    localStorage.setItem("vetcare_user_role", roleKey);
    applyRoleInterface(roleKey);
  };

  window._openDoctorDeclarationModal = function () {
    _show("modalDoctorDeclaration");
  };

  window._closeDoctorDeclarationModal = function () {
    _hide("modalDoctorDeclaration");
  };

  window._confirmDoctorRole = function () {
    _hide("modalDoctorDeclaration");
    window._selectRole("DOCTOR");
  };

  window._returnToGateway = function () {
    localStorage.removeItem("vetcare_user_role");
    window.VETCARE_STATE.role = null;
    _show("screenGateway");
    _hide("screenMainApp");
  };

  function applyRoleInterface(roleKey) {
    _hide("screenGateway");
    _show("screenMainApp");

    var roleBadge = _getEl("currentUserRoleBadge");
    var navDocDiag = _getEl("navDocDiagnosis");
    var navDocOpd = _getEl("navDocOpd");
    var navDocServ = _getEl("navDocServices");
    var navDocInv = _getEl("navDocInventory");

    var navFarmHome = _getEl("navFarmerHome");
    var navFarmBreed = _getEl("navFarmerBreeding");
    var navFarmFeed = _getEl("navFarmerFeed");
    var navFarmMilk = _getEl("navFarmerMilk");

    if (roleKey === "DOCTOR") {
      if (roleBadge) roleBadge.textContent = "🩺 अधिकृत पशु चिकित्सक";
      [navDocDiag, navDocOpd, navDocServ, navDocInv].forEach(function (el) {
        if (el) el.classList.remove("hidden");
        if (el) el.classList.add("flex");
      });
      [navFarmHome, navFarmBreed, navFarmFeed, navFarmMilk].forEach(function (el) {
        if (el) el.classList.add("hidden");
        if (el) el.classList.remove("flex");
      });
      window._switchTab("doc_diagnosis");
    } else {
      if (roleBadge) roleBadge.textContent = "👨‍🌾 स्मार्ट पशुपालक";
      [navDocDiag, navDocOpd, navDocServ, navDocInv].forEach(function (el) {
        if (el) el.classList.add("hidden");
        if (el) el.classList.remove("flex");
      });
      [navFarmHome, navFarmBreed, navFarmFeed, navFarmMilk].forEach(function (el) {
        if (el) el.classList.remove("hidden");
        if (el) el.classList.add("flex");
      });
      window._switchTab("farmer_home");
    }
  }

  window._switchTab = function (tabKey) {
    var allViews = [
      "viewDocDiagnosis", "viewDocOpd", "viewDocServicesLedger", "viewDocRecords", "viewDocInventory",
      "viewFarmerHome", "viewFarmerBreeding", "viewFarmerFeed", "viewFarmerMilk", "viewFinance"
    ];

    allViews.forEach(function (v) { _hide(v); });

    var navMap = {
      doc_diagnosis: { view: "viewDocDiagnosis", nav: "navDocDiagnosis" },
      doc_opd: { view: "viewDocOpd", nav: "navDocOpd" },
      doc_services: { view: "viewDocServicesLedger", nav: "navDocServices" },
      doc_records: { view: "viewDocRecords", nav: "navDocServices" },
      doc_inventory: { view: "viewDocInventory", nav: "navDocInventory" },
      farmer_home: { view: "viewFarmerHome", nav: "navFarmerHome" },
      farmer_breeding: { view: "viewFarmerBreeding", nav: "navFarmerBreeding" },
      farmer_feed: { view: "viewFarmerFeed", nav: "navFarmerFeed" },
      farmer_milk: { view: "viewFarmerMilk", nav: "navFarmerMilk" },
      shared_finance: { view: "viewFinance", nav: "navSharedFinance" }
    };

    // Reset nav colors
    var allNavs = document.querySelectorAll("nav button");
    allNavs.forEach(function (btn) {
      btn.className = "flex flex-col items-center text-slate-400 hover:text-slate-700 transition";
    });

    var target = navMap[tabKey];
    if (target) {
      _show(target.view);
      var navBtn = _getEl(target.nav);
      if (navBtn) navBtn.className = "flex flex-col items-center active-nav-tab transition text-slate-500";
    }

    if (tabKey === "doc_diagnosis") applyMatrixFilters();
    if (tabKey === "doc_services") loadLedgerTable();
    if (tabKey === "doc_inventory") renderInventory();
    if (tabKey === "farmer_milk") renderMilkRecords();
    if (tabKey === "shared_finance") renderKhataList();
  };

  // Bootstrap Application on DOM Ready
  document.addEventListener("DOMContentLoaded", function () {
    initTrialAndAuth();
    loadOPDRecords();
    loadLedgerTable();
    renderInventory();
    renderMilkRecords();
    renderKhataList();
    calculateShaefferWeight();
  });

})(window, document);
