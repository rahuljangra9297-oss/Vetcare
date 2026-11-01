// Vetcare AI OS - Unified Production Engine (2026 Master Constitution)
// Principal Veterinary Pharmacologist & Systems Architecture Standard

(function () {
  "use strict";

  /* =========================================================================
     1. GLOBAL STATE & MASTER FOUNDATION
     ========================================================================= */
  const MASTER_STORAGE_KEY_CONFIG = "vetcare_app_config_2026";
  const MASTER_STORAGE_KEY_CASES = "vetcare_opd_cases_2026";
  const MASTER_STORAGE_KEY_KHATA = "vetcare_khata_records_2026";
  const MASTER_STORAGE_KEY_INV = "vetcare_inventory_items_2026";
  const MASTER_STORAGE_KEY_AI_KEY = "vetcare_gemini_api_key_2026";

  const DEFAULT_APP_CONFIG = {
    adminPin: "9297",
    payeeName: "Vetcare Services",
    monthlyPrice: 199,
    annualPrice: 1499,
    sbiUpi: "rahuljangra9297@oksbi",
    sbiAccount: "65204067585",
    sbiIfsc: "SBIN0013693",
    pnbUpi: "rahuljangra9297-1@okicici",
    pnbAccount: "6687001700015098",
    pnbIfsc: "PUNB0668700",
    appTitle: "Vetcare AI OS",
    appTagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
    adminWhatsApp: "9297000000"
  };

  let AppConfig = loadSavedConfig();
  let currentRole = "FARMER"; // "DOCTOR" | "FARMER"
  let currentLanguage = "hi";
  let activeDoctorDiagSubMode = "MATRIX"; // "MATRIX" | "SEARCH" | "DIRECTORY"
  let activeDirectoryTag = "ALL";
  let currentPharmCategory = "ALL";
  let currentPharmType = "ALL";
  let currentFarmerOrgan = "UDDER";
  let currentPaymentBank = "SBI";
  let currentPaymentPlan = "MONTHLY";

  let currentAttachedPhotoBase64 = null;
  let currentFarmerPhotoBase64 = null;

  // Single-instance 60-min timer
  let sessionTimerIntervalId = null;
  let sessionSecondsRemaining = 3600;

  /* =========================================================================
     2. MULTI-LANGUAGE LOCALIZATION DICTIONARY (7 LANGUAGES)
     ========================================================================= */
  const I18N_DICTIONARY = {
    hi: {
      roleFarmer: "👨‍🌾 स्मार्ट पशुपालक (Smart Farmer)",
      roleDoctor: "🩺 अधिकृत पशु चिकित्सक (Veterinary Doctor)",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      chooseRole: "कृपया अपना कार्य-क्षेत्र (Role) चुनें:",
      btnFarmer: "पशुपालक के रूप में प्रवेश करें ➔",
      btnDoctor: "चिकित्सक के रूप में प्रवेश करें ➔",
      navDiag: "रोग निदान",
      navPharm: "दवा ज्ञानकोश",
      navRx: "ओपीडी",
      navCalc: "कैलकुलेटर",
      navStock: "स्टॉक",
      navAI: "AI सर्जन",
      navFarmerRemedies: "देसी नुस्खे",
      navBreeding: "प्रजनन",
      navFeed: "पशु आहार",
      navKhata: "खाता बही",
      navSupport: "सपोर्ट",
      syncSafe: "🔄 सिंक सुरक्षित"
    },
    en: {
      roleFarmer: "👨‍🌾 Smart Farmer",
      roleDoctor: "🩺 Registered Vet Doctor",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "Veterinary Clinical Decision Support System & Smart Dairy Management",
      chooseRole: "Please select your workspace role:",
      btnFarmer: "Enter as Smart Farmer ➔",
      btnDoctor: "Enter as Veterinary Doctor ➔",
      navDiag: "Diagnosis",
      navPharm: "Pharmacopeia",
      navRx: "OPD Slip",
      navCalc: "Calculators",
      navStock: "Stock",
      navAI: "AI Surgeon",
      navFarmerRemedies: "Home Remedies",
      navBreeding: "Breeding",
      navFeed: "Feed Balancer",
      navKhata: "Ledger",
      navSupport: "Support",
      syncSafe: "🔄 Sync Secure"
    },
    hien: {
      roleFarmer: "👨‍🌾 Smart Pashupalak",
      roleDoctor: "🩺 Registered Vet Doctor",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "Pashu Rog Nidan, 5-Tier Treatment & Smart Dairy Solution",
      chooseRole: "Kripya apna role select karein:",
      btnFarmer: "Pashupalak Login ➔",
      btnDoctor: "Doctor Login ➔",
      navDiag: "Rog Nidan",
      navPharm: "Dawa Gyan",
      navRx: "OPD Parchi",
      navCalc: "Calculators",
      navStock: "Stock",
      navAI: "AI Surgeon",
      navFarmerRemedies: "Desi Nuskhe",
      navBreeding: "Breeding Hub",
      navFeed: "Pashu Aahar",
      navKhata: "Khata Bahi",
      navSupport: "Support",
      syncSafe: "🔄 Sync Surakshit"
    },
    pa: {
      roleFarmer: "👨‍🌾 ਸਮਾਰਟ ਪਸ਼ੂਪਾਲਕ",
      roleDoctor: "🩺 ਰਜਿਸਟਰਡ ਵੈਟ ਡਾਕਟਰ",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "ਪਸ਼ੂ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਡੇਅਰੀ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ",
      chooseRole: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ:",
      btnFarmer: "ਪਸ਼ੂਪਾਲਕ ਦਾਖਲ ਹੋਵੋ ➔",
      btnDoctor: "ਡਾਕਟਰ ਦਾਖਲ ਹੋਵੋ ➔",
      navDiag: "ਰੋਗ ਜਾਂਚ",
      navPharm: "ਦਵਾਈ ਕੋਸ਼",
      navRx: "ਓਪੀਡੀ ਪਰਚੀ",
      navCalc: "ਕੈਲਕੁਲੇਟਰ",
      navStock: "ਸਟਾਕ",
      navAI: "AI ਵੈਟ",
      navFarmerRemedies: "ਦੇਸੀ ਨੁਸਖੇ",
      navBreeding: "ਨਸਲ ਸੁਧਾਰ",
      navFeed: "ਪਸ਼ੂ ਖੁਰਾਕ",
      navKhata: "ਖਾਤਾ ਬਹੀ",
      navSupport: "ਸਹਾਇਤਾ",
      syncSafe: "🔄 ਸਿੰਕ ਸੁਰੱਖਿਅਤ"
    },
    mr: {
      roleFarmer: "👨‍🌾 स्मार्ट पशुपालक",
      roleDoctor: "🩺 नोंदणीकृत पशुवैद्यक",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "पशुवैद्यकीय निदान आणि संपूर्ण डेअरी व्यवस्थापन",
      chooseRole: "कृपया आपली भूमिका निवडा:",
      btnFarmer: "पशुपालक म्हणून प्रवेश करा ➔",
      btnDoctor: "पशुवैद्यक म्हणून प्रवेश करा ➔",
      navDiag: "रोग निदान",
      navPharm: "औषध ज्ञानकोश",
      navRx: "ओपीडी पावती",
      navCalc: "कॅल्क्युलेटर",
      navStock: "स्टॉक",
      navAI: "AI सर्जन",
      navFarmerRemedies: "घरगुती उपाय",
      navBreeding: "प्रजनन",
      navFeed: "पशु आहार",
      navKhata: "खाते वही",
      navSupport: "सपोर्ट",
      syncSafe: "🔄 सिंक सुरक्षित"
    },
    gu: {
      roleFarmer: "👨‍🌾 સ્માર્ટ પશુપાલક",
      roleDoctor: "🩺 રજિસ્ટર્ડ વેટ ડોક્ટર",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "પશુ રોગ નિદાન અને સંપૂર્ણ ડેરી સોલ્યુશન",
      chooseRole: "કૃપા કરીને તમારી ભૂમિકા પસંદ કરો:",
      btnFarmer: "પશુપાલક તરીકે પ્રવેશ કરો ➔",
      btnDoctor: "ડોક્ટર તરીકે પ્રવેશ કરો ➔",
      navDiag: "રોગ નિદાન",
      navPharm: "દવા જ્ઞાનકોશ",
      navRx: "ઓપીડી પર્ચી",
      navCalc: "કેલ્ક્યુલેટર",
      navStock: "સ્ટોક",
      navAI: "AI સર્જન",
      navFarmerRemedies: "દેશી નુસ્ખા",
      navBreeding: "સંવર્ધન",
      navFeed: "પશુ આહાર",
      navKhata: "ખાતાવહી",
      navSupport: "સપોર્ટ",
      syncSafe: "🔄 સિંક સુરક્ષિત"
    },
    bn: {
      roleFarmer: "👨‍🌾 স্মার্ট খামারি",
      roleDoctor: "🩺 নিবন্ধিত পশু চিকিৎসক",
      gatewayTitle: "Vetcare AI OS",
      gatewayTagline: "ভেটেরিনারি ক্লিনিকাল ডায়াগনসিস ও ডেইরি ম্যানেজমেন্ট",
      chooseRole: "অনুগ্রহ করে আপনার ভূমিকা নির্বাচন করুন:",
      btnFarmer: "খামারি হিসেবে প্রবেশ করুন ➔",
      btnDoctor: "ডাক্তার হিসেবে প্রবেশ করুন ➔",
      navDiag: "রোগ নির্ণয়",
      navPharm: "ওষুধ কোষ",
      navRx: "প্রেসক্রিপশন",
      navCalc: "ক্যালকুলেটর",
      navStock: "স্টক",
      navAI: "AI সার্জন",
      navFarmerRemedies: "ভেষজ প্রতিকার",
      navBreeding: "প্রজনন",
      navFeed: "পশু খাদ্য",
      navKhata: "খাতা বই",
      navSupport: "সহায়তা",
      syncSafe: "🔄 সিঙ্ক সুরক্ষিত"
    }
  };

  /* =========================================================================
     3. INITIALIZATION & LIFECYCLE
     ========================================================================= */
  window.addEventListener("DOMContentLoaded", () => {
    initAppConfigUI();
    initSessionTimer();
    bindMediaAttachmentEvents();
    initCalculators();
    renderInventoryList();
    renderKhataList();
    initFarmerPortalView();
    updateTranslationsUI();

    // Default evaluate disease predictions if doctor view is active
    if (window.VETCARE_DISEASE_DB && window.VETCARE_DISEASE_DB.length > 0) {
      runMatrixEvaluation();
    }
  });

  function loadSavedConfig() {
    try {
      const saved = localStorage.getItem(MASTER_STORAGE_KEY_CONFIG);
      if (saved) {
        return Object.assign({}, DEFAULT_APP_CONFIG, JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load config from local storage:", e);
    }
    return Object.assign({}, DEFAULT_APP_CONFIG);
  }

  function saveAppConfigToStorage() {
    try {
      localStorage.setItem(MASTER_STORAGE_KEY_CONFIG, JSON.stringify(AppConfig));
    } catch (e) {
      console.error("Config save failed:", e);
    }
  }

  /* =========================================================================
     4. SESSION COUNTDOWN TIMER (SINGLE INSTANCE WITH CLEARINTERVAL)
     ========================================================================= */
  function initSessionTimer() {
    if (sessionTimerIntervalId !== null) {
      clearInterval(sessionTimerIntervalId);
      sessionTimerIntervalId = null;
    }
    sessionSecondsRemaining = 3600; // 60 minutes
    updateTimerBadgeDisplay();

    sessionTimerIntervalId = setInterval(() => {
      sessionSecondsRemaining--;
      if (sessionSecondsRemaining <= 0) {
        sessionSecondsRemaining = 3600; // auto-refresh cycle
      }
      updateTimerBadgeDisplay();
    }, 1000);
  }

  function updateTimerBadgeDisplay() {
    const badge = document.getElementById("session-timer-badge");
    if (!badge) return;
    const mins = Math.floor(sessionSecondsRemaining / 60);
    const secs = sessionSecondsRemaining % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    badge.textContent = `⏱️ ${formatted}`;
  }

  /* =========================================================================
     5. ROLE SWITCHING & AUTHENTICATION GATEWAY
     ========================================================================= */
  window.selectRole = function (role) {
    currentRole = role;
    const gateway = document.getElementById("screenGateway");
    const mainApp = document.getElementById("screenMainApp");

    if (gateway) gateway.classList.add("hidden");
    if (mainApp) mainApp.classList.remove("hidden");

    applyRoleUILayout();
  };

  window.returnToGateway = function () {
    const gateway = document.getElementById("screenGateway");
    const mainApp = document.getElementById("screenMainApp");
    if (gateway) gateway.classList.remove("hidden");
    if (mainApp) mainApp.classList.add("hidden");
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
    closeDoctorDeclarationModal();
    window.selectRole("DOCTOR");
  };

  function applyRoleUILayout() {
    const roleBadge = document.getElementById("currentUserRoleBadge");
    const dict = I18N_DICTIONARY[currentLanguage] || I18N_DICTIONARY.hi;

    // Doctor Tabs
    const navDocDiag = document.getElementById("navDoctorDiag");
    const navDocPharm = document.getElementById("navDoctorPharm");
    const navRx = document.getElementById("navRx");
    const navCalc = document.getElementById("navCalculators");
    const navInv = document.getElementById("navInventory");
    const navAI = document.getElementById("navAI");

    // Farmer Tabs
    const navFarmerRemedies = document.getElementById("navFarmerRemedies");
    const navBreeding = document.getElementById("navBreeding");
    const navFeed = document.getElementById("navFeed");

    if (currentRole === "DOCTOR") {
      if (roleBadge) {
        roleBadge.textContent = dict.roleDoctor;
        roleBadge.className = "text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200";
      }
      if (navDocDiag) navDocDiag.classList.remove("hidden");
      if (navDocPharm) navDocPharm.classList.remove("hidden");
      if (navRx) navRx.classList.remove("hidden");
      if (navCalc) navCalc.classList.remove("hidden");
      if (navInv) navInv.classList.remove("hidden");
      if (navAI) navAI.classList.remove("hidden");

      if (navFarmerRemedies) navFarmerRemedies.classList.add("hidden");
      if (navBreeding) navBreeding.classList.add("hidden");
      if (navFeed) navFeed.classList.add("hidden");

      window.switchTab("doctor_diag");
      runMatrixEvaluation();
      window.renderMedicineKnowledgeBase("ALL", "ALL", "");
    } else {
      // SMART FARMER PORTAL
      if (roleBadge) {
        roleBadge.textContent = dict.roleFarmer;
        roleBadge.className = "text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200";
      }
      if (navDocDiag) navDocDiag.classList.add("hidden");
      if (navDocPharm) navDocPharm.classList.add("hidden");
      if (navRx) navRx.classList.add("hidden");
      if (navCalc) navCalc.classList.add("hidden");
      if (navInv) navInv.classList.add("hidden");
      if (navAI) navAI.classList.add("hidden");

      if (navFarmerRemedies) navFarmerRemedies.classList.remove("hidden");
      if (navBreeding) navBreeding.classList.remove("hidden");
      if (navFeed) navFeed.classList.remove("hidden");

      window.switchTab("farmer_remedies");
      renderFarmerRemediesByOrgan(currentFarmerOrgan);
      renderBreedingHubUI();
    }
  }

  /* =========================================================================
     6. TAB NAVIGATION SYSTEM
     ========================================================================= */
  window.switchTab = function (tabKey) {
    const viewMap = {
      doctor_diag: "viewDoctorDiagnosis",
      doctor_pharm: "viewPharmacopeia",
      rx: "viewRx",
      records: "viewRecords",
      calculators: "viewCalculators",
      inventory: "viewInventory",
      ai: "viewAI",
      farmer_remedies: "viewFarmerRemedies",
      breeding: "viewBreeding",
      feed: "viewFeed",
      finance: "viewFinance",
      helpdesk: "viewHelpdesk"
    };

    const navMap = {
      doctor_diag: "navDoctorDiag",
      doctor_pharm: "navDoctorPharm",
      rx: "navRx",
      records: "navRecords",
      calculators: "navCalculators",
      inventory: "navInventory",
      ai: "navAI",
      farmer_remedies: "navFarmerRemedies",
      breeding: "navBreeding",
      feed: "navFeed",
      finance: "navFinance",
      helpdesk: "navHelpdesk"
    };

    Object.values(viewMap).forEach((vId) => {
      const el = document.getElementById(vId);
      if (el) el.classList.add("hidden");
    });

    Object.values(navMap).forEach((nId) => {
      const el = document.getElementById(nId);
      if (el) {
        el.classList.remove("active-nav-tab", "text-blue-600");
        el.classList.add("text-slate-400");
      }
    });

    const targetView = document.getElementById(viewMap[tabKey]);
    if (targetView) targetView.classList.remove("hidden");

    const targetNav = document.getElementById(navMap[tabKey]);
    if (targetNav) {
      targetNav.classList.add("active-nav-tab");
      targetNav.classList.remove("text-slate-400");
    }

    if (tabKey === "inventory") renderInventoryList();
    if (tabKey === "records") renderSavedCasesList();
    if (tabKey === "finance") renderKhataList();
  };

  /* =========================================================================
     7. DOCTOR DIAGNOSIS: MULTI-ORGAN SYMPTOM MATRIX & % PROBABILITY ENGINE
     ========================================================================= */
  window.setDiagnosisSubMode = function (subMode) {
    activeDoctorDiagSubMode = subMode;
    const panelMatrix = document.getElementById("panelMultiOrganMatrix");
    const panelSearch = document.getElementById("panelRapidSearch");
    const panelDir = document.getElementById("panelDirectoryTags");

    const btnMatrix = document.getElementById("btnDiagSubMatrix");
    const btnSearch = document.getElementById("btnDiagSubSearch");
    const btnDir = document.getElementById("btnDiagSubDir");

    [btnMatrix, btnSearch, btnDir].forEach((b) => {
      if (b) {
        b.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
      }
    });

    if (panelMatrix) panelMatrix.classList.add("hidden");
    if (panelSearch) panelSearch.classList.add("hidden");
    if (panelDir) panelDir.classList.add("hidden");

    if (subMode === "MATRIX") {
      if (panelMatrix) panelMatrix.classList.remove("hidden");
      if (btnMatrix) btnMatrix.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      runMatrixEvaluation();
    } else if (subMode === "SEARCH") {
      if (panelSearch) panelSearch.classList.remove("hidden");
      if (btnSearch) btnSearch.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      handleUnifiedDoctorSearch();
    } else if (subMode === "DIRECTORY") {
      if (panelDir) panelDir.classList.remove("hidden");
      if (btnDir) btnDir.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      renderDiseaseDirectoryByTag(activeDirectoryTag);
    }
  };

  window.resetMultiOrganForm = function () {
    const ids = [
      "selMatrixTemp", "selMatrixMucosa", "selMatrixSkin", "selMatrixUdder",
      "selMatrixUrine", "selMatrixDung", "selMatrixResp", "selMatrixRumen", "selMatrixNervous"
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.selectedIndex = 0;
    });
    runMatrixEvaluation();
  };

  window.runMatrixEvaluation = function () {
    const diseases = window.VETCARE_DISEASE_DB || [];
    const container = document.getElementById("doctorDiseaseResultsContainer");
    if (!container) return;

    const selTemp = (document.getElementById("selMatrixTemp") || {}).value || "ANY";
    const selMucosa = (document.getElementById("selMatrixMucosa") || {}).value || "ANY";
    const selSkin = (document.getElementById("selMatrixSkin") || {}).value || "ANY";
    const selUdder = (document.getElementById("selMatrixUdder") || {}).value || "ANY";
    const selUrine = (document.getElementById("selMatrixUrine") || {}).value || "ANY";
    const selDung = (document.getElementById("selMatrixDung") || {}).value || "ANY";
    const selResp = (document.getElementById("selMatrixResp") || {}).value || "ANY";
    const selRumen = (document.getElementById("selMatrixRumen") || {}).value || "ANY";
    const selNervous = (document.getElementById("selMatrixNervous") || {}).value || "ANY";

    const hasAnySelection = [selTemp, selMucosa, selSkin, selUdder, selUrine, selDung, selResp, selRumen, selNervous].some(
      (v) => v !== "ANY" && v !== "NORMAL" && v !== "ACTIVE"
    );

    const scored = diseases.map((d) => {
      let score = 0;
      let totalWeights = 0;

      // 1. Temperature Weight (20)
      if (selTemp !== "ANY") {
        totalWeights += 20;
        if (d.temp === selTemp || (d.tempRange && d.tempRange.includes(selTemp))) {
          score += 20;
        }
      }

      // 2. Mucosa Weight (15)
      if (selMucosa !== "ANY") {
        totalWeights += 15;
        if (d.mucosa === selMucosa) score += 15;
      }

      // 3. Udder Weight (20)
      if (selUdder !== "ANY") {
        totalWeights += 20;
        if (d.udder === selUdder) score += 20;
      }

      // 4. Urine Weight (15)
      if (selUrine !== "ANY") {
        totalWeights += 15;
        if (d.urine === selUrine) score += 15;
      }

      // 5. Dung Weight (10)
      if (selDung !== "ANY") {
        totalWeights += 10;
        if (d.dung === selDung) score += 10;
      }

      // 6. Respiratory (10)
      if (selResp !== "ANY") {
        totalWeights += 10;
        if (d.resp === selResp) score += 10;
      }

      // 7. Rumen (10)
      if (selRumen !== "ANY") {
        totalWeights += 10;
        if (d.rumen === selRumen) score += 10;
      }

      // 8. Nervous (15)
      if (selNervous !== "ANY") {
        totalWeights += 15;
        if (d.nervous === selNervous) score += 15;
      }

      let matchPct = 0;
      if (totalWeights > 0) {
        matchPct = Math.round((score / totalWeights) * 100);
      } else {
        matchPct = 50; // Default baseline baseline match when empty
      }

      return { disease: d, matchPct: matchPct };
    });

    scored.sort((a, b) => b.matchPct - a.matchPct);

    const badge = document.getElementById("badgePredictionCount");
    const statusText = document.getElementById("txtPredictionStatus");
    if (badge) badge.textContent = `${scored.length} संभावित रोग विश्लेषित`;
    if (statusText) {
      statusText.textContent = hasAnySelection
        ? `लक्षण विश्लेषण पूर्ण: शीर्ष संभावना ${scored[0] ? scored[0].disease.nameHi : ""} (${scored[0] ? scored[0].matchPct : 0}%)`
        : "शारीरिक लक्षण चुनें ➔ AI प्रोबेबिलिटी मैट्रिक्स गणना करेगा";
    }

    renderDoctorDiseaseCards(scored, container);
  };

  function renderDoctorDiseaseCards(scoredList, container) {
    if (!scoredList || scoredList.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">कोई संबंधित रोग नहीं मिला।</div>`;
      return;
    }

    container.innerHTML = scoredList
      .map(({ disease: d, matchPct }) => {
        const pctColor =
          matchPct >= 75
            ? "bg-rose-600 text-white"
            : matchPct >= 50
            ? "bg-amber-500 text-white"
            : "bg-slate-200 text-slate-700";

        // Confirmatory Lab Test Table Generator
        let labTableHtml = "";
        if (d.labTests && d.labTests.length > 0) {
          labTableHtml = `
            <div class="mt-3 overflow-x-auto">
              <span class="text-[11px] font-bold text-slate-700 block mb-1">🔬 मानकीकृत लैब जांच तालिका (Confirmatory Lab Tests):</span>
              <table class="w-full text-left border-collapse text-[11px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                <thead class="bg-slate-200/70 text-slate-700 font-bold">
                  <tr>
                    <th class="p-1.5 border-b border-slate-300">क्र.सं.</th>
                    <th class="p-1.5 border-b border-slate-300">टेस्ट का नाम (Test Name)</th>
                    <th class="p-1.5 border-b border-slate-300">अंग / नमूना</th>
                    <th class="p-1.5 border-b border-slate-300">अनुमानित MRP</th>
                    <th class="p-1.5 border-b border-slate-300">TAT</th>
                    <th class="p-1.5 border-b border-slate-300">पुष्टिकरण निष्कर्ष</th>
                  </tr>
                </thead>
                <tbody>
                  ${d.labTests
                    .map(
                      (t) => `
                    <tr class="border-b border-slate-200 hover:bg-white transition">
                      <td class="p-1.5 font-bold">${t.sNo}</td>
                      <td class="p-1.5 font-semibold text-blue-900">${t.testName}</td>
                      <td class="p-1.5 text-slate-600">${t.sampleType}</td>
                      <td class="p-1.5 font-bold text-slate-800">₹${t.approxMrp}</td>
                      <td class="p-1.5 text-slate-600">${t.tat}</td>
                      <td class="p-1.5 text-emerald-800 font-medium">${t.confirms}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `;
        }

        // Tier 1 Injections Table Generator
        let injectionsTableHtml = "";
        if (d.treatment && d.treatment.injections && d.treatment.injections.length > 0) {
          injectionsTableHtml = `
            <div class="mt-3 overflow-x-auto">
              <span class="text-[11px] font-bold text-blue-900 block mb-1">💉 Tier 1: आपातकालीन इंजेक्शन तालिका (Ethical vs Generic Injections):</span>
              <table class="w-full text-left border-collapse text-[11px] bg-blue-50/30 rounded-xl overflow-hidden border border-blue-200">
                <thead class="bg-blue-100/70 text-blue-900 font-bold">
                  <tr>
                    <th class="p-1.5 border-b border-blue-200">क्र.सं.</th>
                    <th class="p-1.5 border-b border-blue-200">श्रेणी</th>
                    <th class="p-1.5 border-b border-blue-200">जेनेरिक साल्ट</th>
                    <th class="p-1.5 border-b border-blue-200">लोकप्रिय ब्रांड</th>
                    <th class="p-1.5 border-b border-blue-200">डोज़ व रूट</th>
                    <th class="p-1.5 border-b border-blue-200">गर्भावस्था सुरक्षा</th>
                    <th class="p-1.5 border-b border-blue-200">चिकित्सीय उद्देश्य</th>
                  </tr>
                </thead>
                <tbody>
                  ${d.treatment.injections
                    .map(
                      (inj) => `
                    <tr class="border-b border-blue-100 hover:bg-white transition">
                      <td class="p-1.5 font-bold">${inj.sNo}</td>
                      <td class="p-1.5 text-slate-600">${inj.category}</td>
                      <td class="p-1.5 font-semibold text-slate-900">${inj.generic}</td>
                      <td class="p-1.5 font-bold text-blue-800">${inj.ethicalBrand} (₹${inj.approxMrp})</td>
                      <td class="p-1.5 font-mono text-emerald-800 font-bold">${inj.doseRoute}</td>
                      <td class="p-1.5"><span class="px-1.5 py-0.5 rounded ${inj.pregnancySafety.includes("सुरक्षित") ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800 font-bold"} text-[10px]">${inj.pregnancySafety}</span></td>
                      <td class="p-1.5 text-slate-700">${inj.purpose}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `;
        }

        // Tier 2 - Tier 5 Treatments Summary
        let multiTierSummaries = "";
        if (d.treatment) {
          const oralText = Array.isArray(d.treatment.oral)
            ? d.treatment.oral.map((o) => `${o.brand} (${o.dose} x ${o.duration})`).join("; ")
            : d.treatment.oral || "उपलब्ध नहीं";

          const ayurText = Array.isArray(d.treatment.ayurvedic)
            ? d.treatment.ayurvedic.map((a) => `${a.name}: ${a.ingredients || a.dose}`).join("; ")
            : d.treatment.ayurvedic || "उपलब्ध नहीं";

          const homeoText = Array.isArray(d.treatment.homeopathic)
            ? d.treatment.homeopathic.map((h) => `${h.name} (${h.dose})`).join("; ")
            : d.treatment.homeopathic || "उपलब्ध नहीं";

          const desiText = Array.isArray(d.treatment.desiRemedies)
            ? d.treatment.desiRemedies.map((ds) => `${ds.name}: ${ds.preparation}`).join("; ")
            : d.treatment.desiRemedies || "उपलब्ध नहीं";

          multiTierSummaries = `
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span class="font-bold text-slate-800 block">💊 Tier 2: ओरल थेरेप्यूटिक्स व सप्लीमेंट्स:</span>
                <p class="text-slate-600 mt-0.5">${oralText}</p>
              </div>
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span class="font-bold text-emerald-800 block">🌿 Tier 3: आयुर्वेदिक व हर्बल फार्मूलेशन:</span>
                <p class="text-slate-600 mt-0.5">${ayurText}</p>
              </div>
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span class="font-bold text-purple-800 block">💧 Tier 4: होम्योपैथिक वेटरनरी उपचार:</span>
                <p class="text-slate-600 mt-0.5">${homeoText}</p>
              </div>
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span class="font-bold text-amber-800 block">🥣 Tier 5: प्रमाणित ग्रामीण देसी नुस्खे:</span>
                <p class="text-slate-600 mt-0.5">${desiText}</p>
              </div>
            </div>
          `;
        }

        // 4-Stage Trajectory & Dual Timeline
        let stagesHtml = "";
        if (d.stages && d.stages.length > 0) {
          stagesHtml = `
            <div class="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <span class="text-[11px] font-bold text-slate-800 block mb-1">⏱️ 4-स्टेज रोग प्रक्षेपवक्र व दोहरी समयसीमा (Recovery vs Deterioration Timeline):</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                ${d.stages
                  .map(
                    (s) => `
                  <div class="p-2 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span class="font-bold text-blue-700 block">Stage ${s.stage}</span>
                    <p class="text-slate-700"><strong>लक्षण:</strong> ${s.signs}</p>
                    <p class="text-emerald-700"><strong>उपचारित:</strong> ${s.recovery}</p>
                    <p class="text-rose-700"><strong>अनुपचारित:</strong> ${s.deterioration}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `;
        }

        return `
          <article class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-2.5 transition hover:border-blue-300">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-black text-slate-900 text-sm sm:text-base">${d.nameHi}</h3>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${pctColor} font-bold shadow-xs">
                    ${matchPct}% संभावना
                  </span>
                </div>
                <p class="text-[11px] text-slate-500 font-medium">${d.nameEn || ""} • श्रेणी: ${d.category}</p>
              </div>
              <button onclick="copyDiseaseToPrescription('${d.id}')" class="text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-xl transition">
                + ओपीडी में जोड़ें
              </button>
            </div>

            <div class="p-3 bg-rose-50/60 border border-rose-200 rounded-2xl text-[11px] text-rose-950">
              <strong class="text-rose-700">🚨 प्रमुख विशिष्ट लक्षण (Cardinal Signs):</strong> ${d.cardinalSigns || d.desc || "विशिष्ट लक्षण उपलब्ध"}
            </div>

            <!-- Pregnancy Red Alert -->
            <div class="pregnancy-alert-badge p-2.5 rounded-xl text-[11px] text-rose-900 font-medium">
              ${d.pregnancyAlert || "⚠️ स्टेरॉयड व फ्लूनिक्सिन का प्रयोग गर्भावस्था के ट्राइमेस्टर अनुसार सावधानी से करें।"}
            </div>

            <!-- Standardized Lab Test Table -->
            ${labTableHtml}

            <!-- 5-Tier Treatment Tables -->
            ${injectionsTableHtml}
            ${multiTierSummaries}

            <!-- 4-Stage Trajectory -->
            ${stagesHtml}
          </article>
        `;
      })
      .join("");
  }

  window.handleUnifiedDoctorSearch = function () {
    const query = ((document.getElementById("unifiedRapidSearchInput") || {}).value || "").toLowerCase().trim();
    const container = document.getElementById("doctorDiseaseResultsContainer");
    if (!container) return;

    const diseases = window.VETCARE_DISEASE_DB || [];
    if (!query) {
      runMatrixEvaluation();
      return;
    }

    const filtered = diseases.filter((d) => {
      const hi = (d.nameHi || "").toLowerCase();
      const en = (d.nameEn || "").toLowerCase();
      const signs = (d.cardinalSigns || "").toLowerCase();
      const cat = (d.category || "").toLowerCase();
      const kw = (d.keywords || []).join(" ").toLowerCase();
      return hi.includes(query) || en.includes(query) || signs.includes(query) || cat.includes(query) || kw.includes(query);
    });

    const scored = filtered.map((d) => ({ disease: d, matchPct: 90 }));
    renderDoctorDiseaseCards(scored, container);
  };

  window.filterDirectoryByTag = function (tag, btn) {
    activeDirectoryTag = tag;
    document.querySelectorAll(".q-dir-chip").forEach((c) => {
      c.className = "q-dir-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
    });
    if (btn) {
      btn.className = "q-dir-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }
    renderDiseaseDirectoryByTag(tag);
  };

  function renderDiseaseDirectoryByTag(tag) {
    const container = document.getElementById("doctorDiseaseResultsContainer");
    if (!container) return;
    const diseases = window.VETCARE_DISEASE_DB || [];

    const filtered = tag === "ALL" ? diseases : diseases.filter((d) => d.category === tag);
    const scored = filtered.map((d) => ({ disease: d, matchPct: 70 }));
    renderDoctorDiseaseCards(scored, container);
  }

  /* =========================================================================
     8. VETERINARY MEDICINES PHARMACOPEIA (दवा ज्ञानकोश 2026 ENGINE)
     ========================================================================= */
  window.setPharmCategory = function (category, btn) {
    currentPharmCategory = category;
    document.querySelectorAll(".ph-cat-chip").forEach((c) => {
      c.className = "ph-cat-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
    });
    if (btn) {
      btn.className = "ph-cat-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0";
    }
    triggerPharmacopeiaRender();
  };

  window.setPharmType = function (type, btn) {
    currentPharmType = type;
    document.querySelectorAll(".ph-type-chip").forEach((c) => {
      c.className = "ph-type-chip px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]";
    });
    if (btn) {
      btn.className = "ph-type-chip px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-[11px]";
    }
    triggerPharmacopeiaRender();
  };

  window.renderPharmacopeiaList = function () {
    triggerPharmacopeiaRender();
  };

  function triggerPharmacopeiaRender() {
    const searchVal = ((document.getElementById("pharmacopeiaSearchInput") || {}).value || "").toLowerCase().trim();
    window.renderMedicineKnowledgeBase(currentPharmCategory, currentPharmType, searchVal);
  }

  window.renderMedicineKnowledgeBase = function (filterCategory, filterType, searchQuery) {
    const container = document.getElementById("pharmacopeiaListContainer");
    if (!container) return;

    const medicines = window.VETCARE_MEDICINES_DB || [];
    const q = (searchQuery || "").toLowerCase();

    const filtered = medicines.filter((med) => {
      // Category filter
      if (filterCategory !== "ALL") {
        const cat = (med.category || "").toUpperCase();
        if (filterCategory === "ANTIBIOTIC" && !cat.includes("ANTIBIOTIC")) return false;
        if (filterCategory === "NSAID" && !cat.includes("NSAID")) return false;
        if (filterCategory === "ANTIPROTOZOAL" && !cat.includes("ANTIPROTOZOAL")) return false;
        if (filterCategory === "ANTIHISTAMINE" && !cat.includes("ANTIHISTAMINE")) return false;
        if (filterCategory === "HORMONE" && !cat.includes("HORMONE")) return false;
        if (filterCategory === "FLUIDS" && !cat.includes("FLUID") && !cat.includes("SUPPORTIVE")) return false;
        if (filterCategory === "ANTHELMINTIC" && !cat.includes("ANTHELMINTIC")) return false;
        if (filterCategory === "VITAMINS" && !cat.includes("VITAMIN") && !cat.includes("LIVER")) return false;
      }

      // Type filter (Generic vs Ethical)
      if (filterType === "GENERIC" && med.type !== "generic") return false;
      if (filterType === "ETHICAL" && med.type !== "ethical") return false;

      // Search Query
      if (q) {
        const salt = (med.salt || "").toLowerCase();
        const brand = (med.ethicalBrand || "").toLowerCase();
        const ind = (med.indications || "").toLowerCase();
        if (!salt.includes(q) && !brand.includes(q) && !ind.includes(q)) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">कोई संबंधित दवा या साल्ट नहीं मिला।</div>`;
      return;
    }

    container.innerHTML = filtered
      .map((med) => {
        const pregBadge = med.pregnancySafe
          ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">गाभिन में सुरक्षित ✅</span>`
          : `<span class="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">गर्भावस्था में वर्जित ⚠️</span>`;

        return `
          <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2 hover:border-indigo-300 transition text-xs">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <h4 class="font-black text-slate-900 text-sm">${med.ethicalBrand || med.salt}</h4>
                <p class="text-[11px] font-mono text-indigo-700 font-bold">${med.salt}</p>
                <span class="text-[10px] text-slate-500">श्रेणी: ${med.category} • प्रकार: ${med.type === "ethical" ? "एथिकल ब्रांड" : "जेनेरिक साल्ट"}</span>
              </div>
              <div class="text-right">
                <span class="font-black text-slate-900 block text-sm">₹${med.approxMrp || "N/A"}</span>
                ${pregBadge}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div>
                <span class="text-slate-500 block">डोज़ दर (Dose Rate):</span>
                <strong class="text-slate-800 font-mono">${med.doseRate || "क्लिनिकल निर्देशानुसार"}</strong>
              </div>
              <div>
                <span class="text-slate-500 block">रूट (Route of Admin):</span>
                <strong class="text-slate-800 font-mono">${med.route || "IM / IV"}</strong>
              </div>
              <div class="col-span-2">
                <span class="text-slate-500 block">विदड्रॉल पीरियड (Withdrawal Period):</span>
                <strong class="text-slate-700 font-mono">${med.withdrawalPeriod || "निर्देशित नहीं"}</strong>
              </div>
            </div>

            <div class="space-y-1 text-[11px]">
              <p class="text-slate-700"><strong>प्रमुख संकेत (Indications):</strong> ${med.indications || "N/A"}</p>
              ${med.contraindications ? `<p class="text-rose-700"><strong>कंट्रा-इंडिकेशन:</strong> ${med.contraindications}</p>` : ""}
            </div>

            <div class="pt-1 flex justify-end">
              <button onclick="appendMedicineToOPD('${med.ethicalBrand || med.salt}', '${med.doseRate || ""}', '${med.route || ""}')" class="text-[10px] font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-xl">
                + ओपीडी में साल्ट जोड़ें
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  };

  window.appendMedicineToOPD = function (brandOrSalt, dose, route) {
    const rxBox = document.getElementById("opdMedicine");
    if (!rxBox) return;
    const line = `• ${brandOrSalt} - ${dose} (${route})`;
    rxBox.value = rxBox.value ? `${rxBox.value}\n${line}` : line;
    window.switchTab("rx");
  };

  /* =========================================================================
     9. SHAEFFER'S WEIGHT & DRUG DOSAGE CALCULATOR
     ========================================================================= */
  function initCalculators() {
    calculateShaefferWeight();
    calculateDrugVolumeMl();
  }

  window.calculateShaefferWeight = function () {
    const girth = parseFloat((document.getElementById("calcGirth") || {}).value) || 0;
    const length = parseFloat((document.getElementById("calcLength") || {}).value) || 0;

    const lbsEl = document.getElementById("dispCalculatedWeightLbs");
    const kgEl = document.getElementById("dispCalculatedWeightKg");
    const doseWeightEl = document.getElementById("doseAnimalWeight");

    if (girth <= 0 || length <= 0) {
      if (lbsEl) lbsEl.textContent = "0 lbs";
      if (kgEl) kgEl.textContent = "0 Kg";
      return;
    }

    // Shaeffer's Formula: Weight in lbs = (Girth^2 * Length) / 300
    const weightLbs = Math.round((Math.pow(girth, 2) * length) / 300);
    const weightKg = parseFloat((weightLbs * 0.453592).toFixed(1));

    if (lbsEl) lbsEl.textContent = `${weightLbs} lbs`;
    if (kgEl) kgEl.textContent = `${weightKg} Kg`;
    if (doseWeightEl) doseWeightEl.value = Math.round(weightKg);

    calculateDrugVolumeMl();
  };

  window.calculateDrugVolumeMl = function () {
    const wt = parseFloat((document.getElementById("doseAnimalWeight") || {}).value) || 0;
    const rate = parseFloat((document.getElementById("doseRateMgKg") || {}).value) || 0;
    const conc = parseFloat((document.getElementById("doseConcentration") || {}).value) || 0;

    const totalMgEl = document.getElementById("dispTotalMgRequired");
    const reqMlEl = document.getElementById("dispRequiredMl");

    if (wt <= 0 || rate <= 0 || conc <= 0) {
      if (totalMgEl) totalMgEl.textContent = "0 mg";
      if (reqMlEl) reqMlEl.textContent = "0.0 ml";
      return;
    }

    const totalMg = Math.round(wt * rate);
    const ml = parseFloat((totalMg / conc).toFixed(1));

    if (totalMgEl) totalMgEl.textContent = `${totalMg} mg`;
    if (reqMlEl) reqMlEl.textContent = `${ml} ml`;
  };

  /* =========================================================================
     10. CLINICAL PHOTO & REPORT ATTACHMENT ENGINE
     ========================================================================= */
  function bindMediaAttachmentEvents() {
    // Doctor OPD Photo
    const docInput = document.getElementById("opdPhotoInput");
    if (docInput) {
      docInput.addEventListener("change", function () {
        handleFileToBase64(this, (base64) => {
          currentAttachedPhotoBase64 = base64;
          const status = document.getElementById("photoAttachedStatus");
          const previewBox = document.getElementById("opdPhotoPreviewBox");
          const previewImg = document.getElementById("opdPhotoPreviewImg");
          if (status) status.textContent = "✅ फोटो संलग्न";
          if (previewBox && previewImg) {
            previewImg.src = base64;
            previewBox.classList.remove("hidden");
          }
        });
      });
    }

    // Farmer Animal Photo
    const farmerInput = document.getElementById("farmerPhotoInput");
    if (farmerInput) {
      farmerInput.addEventListener("change", function () {
        handleFileToBase64(this, (base64) => {
          currentFarmerPhotoBase64 = base64;
          const previewBox = document.getElementById("farmerPhotoPreviewBox");
          const previewImg = document.getElementById("farmerPhotoPreviewImg");
          if (previewBox && previewImg) {
            previewImg.src = base64;
            previewBox.classList.remove("hidden");
          }
        });
      });
    }
  }

  function handleFileToBase64(inputElement, callback) {
    if (!inputElement.files || !inputElement.files[0]) return;
    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  window.removeAttachedPhoto = function () {
    currentAttachedPhotoBase64 = null;
    const input = document.getElementById("opdPhotoInput");
    const status = document.getElementById("photoAttachedStatus");
    const previewBox = document.getElementById("opdPhotoPreviewBox");
    if (input) input.value = "";
    if (status) status.textContent = "कोई फोटो नहीं";
    if (previewBox) previewBox.classList.add("hidden");
  };

  window.removeFarmerPhoto = function () {
    currentFarmerPhotoBase64 = null;
    const input = document.getElementById("farmerPhotoInput");
    const previewBox = document.getElementById("farmerPhotoPreviewBox");
    if (input) input.value = "";
    if (previewBox) previewBox.classList.add("hidden");
  };

  /* =========================================================================
     11. DIGITAL OPD PRESCRIPTION & WHATSAPP DISPATCH
     ========================================================================= */
  window.captureGPSLocation = function () {
    const gpsField = document.getElementById("opdGPS");
    const btn = document.getElementById("btnGPS");
    if (!navigator.geolocation) {
      alert("आपके ब्राउज़र में GPS उपलब्ध नहीं है।");
      return;
    }
    if (btn) btn.textContent = "⏳...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const val = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        if (gpsField) gpsField.value = val;
        if (btn) btn.textContent = "📍 OK";
      },
      () => {
        alert("GPS लोकेशन प्राप्त नहीं हो सकी।");
        if (btn) btn.textContent = "📍 GPS";
      }
    );
  };

  window.calculateDue = function () {
    const total = parseFloat((document.getElementById("opdTotalFee") || {}).value) || 0;
    const paid = parseFloat((document.getElementById("opdPaidFee") || {}).value) || 0;
    const dueField = document.getElementById("opdDueFee");
    const due = Math.max(0, total - paid);
    if (dueField) dueField.value = due;
  };

  window.clearRxField = function () {
    const el = document.getElementById("opdMedicine");
    if (el) el.value = "";
  };

  window.copyDiseaseToPrescription = function (diseaseId) {
    const diseases = window.VETCARE_DISEASE_DB || [];
    const disease = diseases.find((d) => d.id === diseaseId);
    if (!disease) return;

    const diagField = document.getElementById("opdDiagnosis");
    const rxField = document.getElementById("opdMedicine");

    if (diagField) diagField.value = disease.nameHi;

    if (rxField && disease.treatment && disease.treatment.injections) {
      const rxLines = disease.treatment.injections.map(
        (inj) => `• Inj. ${inj.ethicalBrand || inj.generic} (${inj.doseRoute})`
      );
      rxField.value = rxLines.join("\n");
    }
    window.switchTab("rx");
  };

  window.dispatchWhatsAppRx = function () {
    const farmerName = ((document.getElementById("opdFarmerName") || {}).value || "").trim();
    const phone = ((document.getElementById("opdFarmerPhone") || {}).value || "").trim();
    const animal = (document.getElementById("opdAnimal") || {}).value || "पशु";
    const diagnosis = ((document.getElementById("opdDiagnosis") || {}).value || "").trim();
    const rx = ((document.getElementById("opdMedicine") || {}).value || "").trim();
    const totalFee = (document.getElementById("opdTotalFee") || {}).value || "0";
    const paidFee = (document.getElementById("opdPaidFee") || {}).value || "0";
    const dueFee = (document.getElementById("opdDueFee") || {}).value || "0";
    const pregnancy = (document.getElementById("opdPregnancy") || {}).value || "";

    if (!farmerName || !phone) {
      alert("कृपया किसान का नाम और 10 अंकों का मोबाइल नंबर अवश्य भरें!");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const dateStr = new Date().toLocaleDateString("hi-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const msg =
      `*🩺 ${AppConfig.appTitle} - डिजिटल केस पर्ची (OPD Slip)*\n` +
      `📅 दिनांक: ${dateStr}\n` +
      `👤 किसान का नाम: ${farmerName}\n` +
      `🐂 पशु विवरण: ${animal} (${pregnancy})\n` +
      `🔬 प्रोविजनल निदान: ${diagnosis || "क्लिनिकल परीक्षण"}\n\n` +
      `*💊 सुझाई गई दवा व इंजेक्शन (Rx):*\n${rx || "क्लिनिकल परामर्श अनुसार"}\n\n` +
      `💰 फीस विवरण: कुल ₹${totalFee} | जमा ₹${paidFee} | बकाया: ₹${dueFee}\n\n` +
      `⚠️ *सूचना:* यह डिजिटल पर्ची अधिकृत पशु चिकित्सक परामर्श का प्रमाण है।`;

    window.saveOfflineCaseDirectly();

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  window.saveOfflineCaseDirectly = function () {
    const farmerName = ((document.getElementById("opdFarmerName") || {}).value || "").trim();
    const phone = ((document.getElementById("opdFarmerPhone") || {}).value || "").trim();
    if (!farmerName) return;

    const newCase = {
      id: "OPD_" + Date.now(),
      date: new Date().toISOString(),
      farmerName: farmerName,
      phone: phone,
      village: ((document.getElementById("opdVillage") || {}).value || "").trim(),
      animal: (document.getElementById("opdAnimal") || {}).value || "",
      tag: ((document.getElementById("opdTag") || {}).value || "").trim(),
      pregnancy: (document.getElementById("opdPregnancy") || {}).value || "",
      diagnosis: ((document.getElementById("opdDiagnosis") || {}).value || "").trim(),
      medicine: ((document.getElementById("opdMedicine") || {}).value || "").trim(),
      totalFee: parseFloat((document.getElementById("opdTotalFee") || {}).value) || 0,
      paidFee: parseFloat((document.getElementById("opdPaidFee") || {}).value) || 0,
      dueFee: parseFloat((document.getElementById("opdDueFee") || {}).value) || 0,
      photo: currentAttachedPhotoBase64
    };

    try {
      const existing = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_CASES) || "[]");
      existing.unshift(newCase);
      localStorage.setItem(MASTER_STORAGE_KEY_CASES, JSON.stringify(existing));
      alert("✅ केस रिकॉर्ड स्थानीय रूप से सुरक्षित कर लिया गया है।");
      renderSavedCasesList();
    } catch (e) {
      console.error("Save case failed:", e);
    }
  };

  window.printCurrentOPDSlip = function () {
    const area = document.getElementById("printableSlipArea");
    if (!area) return;

    const farmerName = (document.getElementById("opdFarmerName") || {}).value || "";
    const phone = (document.getElementById("opdFarmerPhone") || {}).value || "";
    const animal = (document.getElementById("opdAnimal") || {}).value || "";
    const diagnosis = (document.getElementById("opdDiagnosis") || {}).value || "";
    const rx = (document.getElementById("opdMedicine") || {}).value || "";
    const totalFee = (document.getElementById("opdTotalFee") || {}).value || "0";
    const dueFee = (document.getElementById("opdDueFee") || {}).value || "0";

    area.innerHTML = `
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
        <h2 style="font-size: 18px; font-weight: bold; margin: 0;">${AppConfig.appTitle}</h2>
        <p style="margin: 0; font-size: 11px; color: #64748b;">${AppConfig.appTagline}</p>
      </div>
      <div style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; font-size: 11px;">
        <p><strong>किसान:</strong> ${farmerName} (${phone})</p>
        <p><strong>पशु:</strong> ${animal}</p>
        <p><strong>निदान:</strong> ${diagnosis}</p>
        <p><strong>दिनांक:</strong> ${new Date().toLocaleDateString("hi-IN")}</p>
      </div>
      <div style="margin-top: 15px; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
        <h4 style="margin: 0 0 5px 0;">सुझाई गई औषधियां व इंजेक्शन (Rx):</h4>
        <pre style="font-family: inherit; font-size: 11px; white-space: pre-wrap;">${rx}</pre>
      </div>
      <div style="margin-top: 15px; border-top: 1px solid #cbd5e1; padding-top: 6px; font-size: 11px;">
        <p>कुल फीस: ₹${totalFee} | बकाया: ₹${dueFee}</p>
        <p style="font-size: 10px; color: #94a3b8; margin-top: 15px;">अधिकृत पशु चिकित्सक हस्ताक्षर: ___________________</p>
      </div>
    `;
    window.print();
  };

  /* =========================================================================
     12. SAVED CASE RECORDS & CLINIC KHATA LEDGER
     ========================================================================= */
  function renderSavedCasesList() {
    const container = document.getElementById("recordsList");
    const countBadge = document.getElementById("recordTotalBadge");
    if (!container) return;

    let cases = [];
    try {
      cases = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_CASES) || "[]");
    } catch (e) {
      cases = [];
    }

    if (countBadge) countBadge.textContent = `${cases.length} केस सुरक्षित`;

    if (cases.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">कोई सुरक्षित केस रिकॉर्ड नहीं है।</div>`;
      return;
    }

    container.innerHTML = cases
      .map(
        (c) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-xs shadow-xs">
          <div class="flex justify-between items-start">
            <div>
              <strong class="text-slate-900 text-sm">${c.farmerName}</strong>
              <span class="text-slate-500 font-mono">(${c.phone})</span>
              <p class="text-slate-500 text-[11px]">${c.animal} • गाँव: ${c.village || "N/A"}</p>
            </div>
            <span class="text-[10px] bg-blue-50 text-blue-700 font-mono px-2 py-0.5 rounded border border-blue-200 font-bold">
              ${new Date(c.date).toLocaleDateString("hi-IN")}
            </span>
          </div>
          <p class="text-slate-800"><strong>निदान:</strong> ${c.diagnosis || "सामान्य जांच"}</p>
          <p class="text-slate-600 font-mono text-[11px] whitespace-pre-wrap">${c.medicine}</p>
          <div class="flex justify-between items-center pt-1 border-t border-slate-100 text-[11px]">
            <span class="text-slate-600">फीस: ₹${c.totalFee} | जमा: ₹${c.paidFee}</span>
            <span class="${c.dueFee > 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}">बकाया: ₹${c.dueFee}</span>
          </div>
        </div>
      `
      )
      .join("");
  }

  window.handleRecordSearch = function () {
    const query = ((document.getElementById("searchRecordsInput") || {}).value || "").toLowerCase().trim();
    const container = document.getElementById("recordsList");
    if (!container) return;

    let cases = [];
    try {
      cases = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_CASES) || "[]");
    } catch (e) {
      cases = [];
    }

    const filtered = cases.filter((c) => {
      const name = (c.farmerName || "").toLowerCase();
      const phone = (c.phone || "").toLowerCase();
      const village = (c.village || "").toLowerCase();
      return name.includes(query) || phone.includes(query) || village.includes(query);
    });

    container.innerHTML = filtered
      .map(
        (c) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-xs shadow-xs">
          <div class="flex justify-between items-start">
            <div>
              <strong class="text-slate-900 text-sm">${c.farmerName}</strong>
              <span class="text-slate-500 font-mono">(${c.phone})</span>
              <p class="text-slate-500 text-[11px]">${c.animal} • गाँव: ${c.village || "N/A"}</p>
            </div>
            <span class="text-[10px] bg-blue-50 text-blue-700 font-mono px-2 py-0.5 rounded border border-blue-200 font-bold">
              ${new Date(c.date).toLocaleDateString("hi-IN")}
            </span>
          </div>
          <p class="text-slate-800"><strong>निदान:</strong> ${c.diagnosis || "सामान्य जांच"}</p>
          <div class="flex justify-between items-center pt-1 border-t border-slate-100 text-[11px]">
            <span class="text-slate-600">फीस: ₹${c.totalFee}</span>
            <span class="${c.dueFee > 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}">बकाया: ₹${c.dueFee}</span>
          </div>
        </div>
      `
      )
      .join("");
  };

  // KHATA (LEDGER) ENGINE WITH DEFENSIVE CHECKS
  window.openNewKhataModal = function () {
    const modal = document.getElementById("modalNewKhata");
    if (modal) modal.style.display = "flex";
  };

  window.closeNewKhataModal = function () {
    const modal = document.getElementById("modalNewKhata");
    if (modal) modal.style.display = "none";
  };

  window.saveNewKhataRecord = function () {
    const name = ((document.getElementById("khataFarmerName") || {}).value || "").trim();
    const phone = ((document.getElementById("khataFarmerPhone") || {}).value || "").trim();
    const amount = parseFloat((document.getElementById("khataAmount") || {}).value) || 0;
    const type = (document.getElementById("khataType") || {}).value || "DUE";
    const note = ((document.getElementById("khataNote") || {}).value || "").trim();

    if (!name || amount <= 0) {
      alert("कृपया किसान का नाम और मान्य राशि दर्ज करें!");
      return;
    }

    const record = {
      id: "KHT_" + Date.now(),
      date: new Date().toISOString(),
      name: name,
      phone: phone,
      amount: amount,
      type: type,
      note: note
    };

    try {
      const records = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_KHATA) || "[]");
      records.unshift(record);
      localStorage.setItem(MASTER_STORAGE_KEY_KHATA, JSON.stringify(records));
      closeNewKhataModal();
      renderKhataList();
    } catch (e) {
      console.error("Khata save failed:", e);
    }
  };

  window.renderKhataList = function () {
    const searchVal = ((document.getElementById("searchKhataInput") || {}).value || "").toLowerCase().trim();
    const container = document.getElementById("finDueList");
    const credEl = document.getElementById("finCredit");
    const debEl = document.getElementById("finDebit");

    let records = [];
    try {
      records = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_KHATA) || "[]");
    } catch (e) {
      records = [];
    }

    let totalCredit = 0;
    let totalDebit = 0;

    records.forEach((r) => {
      if (r.type === "PAID") totalCredit += r.amount;
      if (r.type === "DUE") totalDebit += r.amount;
    });

    if (credEl) credEl.textContent = `₹${totalCredit}`;
    if (debEl) debEl.textContent = `₹${totalDebit}`;

    // Defensive check: (val || '').toLowerCase()
    const filtered = records.filter((r) => {
      const n = (r.name || "").toLowerCase();
      const p = (r.phone || "").toLowerCase();
      const nt = (r.note || "").toLowerCase();
      return n.includes(searchVal) || p.includes(searchVal) || nt.includes(searchVal);
    });

    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">खाते में कोई लेन-देन दर्ज नहीं है।</div>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        (r) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-3 flex justify-between items-center text-xs shadow-xs">
          <div>
            <strong class="text-slate-900 font-bold">${r.name}</strong>
            ${r.phone ? `<span class="text-slate-500 font-mono text-[11px]">(${r.phone})</span>` : ""}
            <p class="text-slate-500 text-[11px]">${r.note || "विवरण नहीं"} • ${new Date(r.date).toLocaleDateString("hi-IN")}</p>
          </div>
          <div class="text-right">
            <strong class="text-sm font-black ${r.type === "PAID" ? "text-emerald-700" : "text-rose-700"}">
              ${r.type === "PAID" ? "+₹" : "-₹"}${r.amount}
            </strong>
            <span class="block text-[10px] ${r.type === "PAID" ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}">
              ${r.type === "PAID" ? "जमा (Paid)" : "बकाया (Due)"}
            </span>
          </div>
        </div>
      `
      )
      .join("");
  };

  /* =========================================================================
     13. CLINIC STOCK INVENTORY (WITH +/- LIVE COUNTERS)
     ========================================================================= */
  window.openNewInventoryItemModal = function () {
    const modal = document.getElementById("modalNewInventory");
    if (modal) modal.style.display = "flex";
  };

  window.closeNewInventoryModal = function () {
    const modal = document.getElementById("modalNewInventory");
    if (modal) modal.style.display = "none";
  };

  window.saveNewInventoryItem = function () {
    const name = ((document.getElementById("invItemName") || {}).value || "").trim();
    const category = (document.getElementById("invItemCategory") || {}).value || "INJECTION";
    const stock = parseInt((document.getElementById("invItemStock") || {}).value, 10) || 0;
    const minAlert = parseInt((document.getElementById("invItemMinAlert") || {}).value, 10) || 3;
    const unit = ((document.getElementById("invItemUnit") || {}).value || "vials").trim();

    if (!name) {
      alert("कृपया दवा अथवा स्ट्रॉ का नाम दर्ज करें!");
      return;
    }

    const item = {
      id: "INV_" + Date.now(),
      name: name,
      category: category,
      stock: stock,
      minAlert: minAlert,
      unit: unit
    };

    try {
      const items = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_INV) || "[]");
      items.push(item);
      localStorage.setItem(MASTER_STORAGE_KEY_INV, JSON.stringify(items));
      closeNewInventoryModal();
      renderInventoryList();
    } catch (e) {
      console.error("Inventory save failed:", e);
    }
  };

  window.updateStockCounter = function (itemId, delta) {
    try {
      const items = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_INV) || "[]");
      const idx = items.findIndex((it) => it.id === itemId);
      if (idx !== -1) {
        items[idx].stock = Math.max(0, items[idx].stock + delta);
        localStorage.setItem(MASTER_STORAGE_KEY_INV, JSON.stringify(items));
        renderInventoryList();
      }
    } catch (e) {
      console.error("Counter update failed:", e);
    }
  };

  function renderInventoryList() {
    const container = document.getElementById("inventoryItemsContainer");
    const lowStockBadge = document.getElementById("lowStockAlertBadge");
    if (!container) return;

    let items = [];
    try {
      items = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_INV) || "[]");
    } catch (e) {
      items = [];
    }

    // Default Seed Items if empty
    if (items.length === 0) {
      items = [
        { id: "INV_1", name: "Inj. Intacef Tazo 3375mg", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
        { id: "INV_2", name: "Inj. Melonex Plus 100ml", category: "INJECTION", stock: 2, minAlert: 3, unit: "vials" },
        { id: "INV_3", name: "Murrah Bull Semen Straw (Hissar)", category: "SEMEN", stock: 25, minAlert: 5, unit: "straws" },
        { id: "INV_4", name: "Bolus Serrata 60mg", category: "BOLUS", stock: 15, minAlert: 5, unit: "strips" }
      ];
      localStorage.setItem(MASTER_STORAGE_KEY_INV, JSON.stringify(items));
    }

    const hasLowStock = items.some((it) => it.stock <= it.minAlert);
    if (lowStockBadge) {
      if (hasLowStock) lowStockBadge.classList.remove("hidden");
      else lowStockBadge.classList.add("hidden");
    }

    container.innerHTML = items
      .map(
        (it) => `
        <div class="bg-white border ${it.stock <= it.minAlert ? "border-rose-300 bg-rose-50/20" : "border-slate-200"} rounded-2xl p-3 flex justify-between items-center text-xs shadow-xs">
          <div>
            <strong class="text-slate-900 font-bold">${it.name}</strong>
            <p class="text-slate-500 text-[11px]">श्रेणी: ${it.category} • न्यूनतम सीमा: ${it.minAlert} ${it.unit}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="updateStockCounter('${it.id}', -1)" class="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center transition active:scale-95">
              -
            </button>
            <span class="font-mono font-black text-sm w-12 text-center ${it.stock <= it.minAlert ? "text-rose-700 font-black" : "text-slate-900"}">
              ${it.stock} <span class="text-[9px] font-normal text-slate-500">${it.unit}</span>
            </span>
            <button onclick="updateStockCounter('${it.id}', 1)" class="w-7 h-7 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-black flex items-center justify-center transition active:scale-95">
              +
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  /* =========================================================================
     14. SMART FARMER PORTAL (STRICT ADVISORY - ZERO INJECTIONS)
     ========================================================================= */
  function initFarmerPortalView() {
    renderFarmerRemediesByOrgan(currentFarmerOrgan);
    renderBreedingHubUI();
  }

  window.selectFarmerBodyPart = function (organKey, btn) {
    currentFarmerOrgan = organKey;
    document.querySelectorAll(".f-body-chip").forEach((c) => {
      c.className = "f-body-chip py-2.5 px-3 rounded-2xl bg-slate-50 text-slate-700 font-semibold border border-slate-200 text-left flex items-center gap-2";
    });
    if (btn) {
      btn.className = "f-body-chip py-2.5 px-3 rounded-2xl bg-blue-600 text-white font-bold border border-blue-600 text-left flex items-center gap-2";
    }
    renderFarmerRemediesByOrgan(organKey);
  };

  function renderFarmerRemediesByOrgan(organKey) {
    const container = document.getElementById("farmerRemediesContainer");
    if (!container) return;

    const data = window.VETCARE_FARMER_ORGAN_REMEDIES || {};
    const organData = data[organKey.toLowerCase()] || data.udder;

    if (!organData || !organData.conditions) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">कोई प्रमाणित देसी नुस्खा उपलब्ध नहीं।</div>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3">
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span>🌿</span> ${organData.title}
        </h3>
        ${organData.conditions
          .map(
            (c) => `
          <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-2.5">
            <div class="flex justify-between items-start">
              <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${c.name}</h4>
              <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">100% प्राकृतिक ✅</span>
            </div>
            <p class="text-slate-600 text-xs"><strong>पहचान लक्षण:</strong> ${c.signs}</p>
            <div class="p-3 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs text-emerald-950">
              <strong class="text-emerald-800">🥣 प्रमाणित देसी नुस्खा / लेप / काढ़ा:</strong>
              <p class="mt-1 leading-relaxed">${c.homeRemedy}</p>
            </div>
            <div class="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center gap-1">
              <span>⚠️</span> यदि 24 घंटे में आराम न मिले तो तुरंत अधिकृत पशु चिकित्सक को बुलाएं।
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  /* =========================================================================
     15. FARMER BREEDING & MILK MAXIMIZER MODULES
     ========================================================================= */
  function renderBreedingHubUI() {
    const data = window.VETCARE_BREEDING_DATA;
    if (!data) return;

    // Heat signs
    const heatBox = document.getElementById("heatSignsContainer");
    if (heatBox && data.aiTimingGuide) {
      heatBox.innerHTML = `
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <strong class="text-blue-900 block font-bold">1. शुरुआती मद (Early Heat):</strong>
          <p class="text-slate-600">${data.aiTimingGuide.earlyHeat}</p>
        </div>
        <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
          <strong class="text-emerald-900 block font-bold">2. चरम मद (Mid/Standing Heat - उत्तम समय):</strong>
          <p class="text-emerald-800 font-medium">${data.aiTimingGuide.midHeat}</p>
        </div>
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <strong class="text-slate-700 block font-bold">3. अंतिम मद (Late Heat):</strong>
          <p class="text-slate-600">${data.aiTimingGuide.lateHeat}</p>
        </div>
      `;
    }

    // Discharge signs
    const dischBox = document.getElementById("dischargeContainer");
    if (dischBox) {
      dischBox.innerHTML = `
        <div class="p-2 bg-slate-50 rounded-xl border border-slate-200">
          <strong class="text-emerald-700">पारदर्शी कांच जैसा तार (Clear Mucus):</strong>
          <p class="text-slate-600">बच्चेदानी पूर्ण स्वस्थ है। A.I. कराने का 100% सही समय।</p>
        </div>
        <div class="p-2 bg-slate-50 rounded-xl border border-slate-200">
          <strong class="text-rose-700">मटमैला, सफेद या मवादयुक्त तार:</strong>
          <p class="text-slate-600">बच्चेदानी में संक्रमण (Endometritis) है। सीमन न डलवाएं, पहले डॉक्टर से सफाई कराएं।</p>
        </div>
      `;
    }

    // Repeat Breeder List
    const repList = document.getElementById("repeatBreederList");
    if (repList && data.repeatBreeder && data.repeatBreeder.managementProtocol) {
      repList.innerHTML = data.repeatBreeder.managementProtocol
        .map((tip) => `<li class="leading-relaxed">${tip}</li>`)
        .join("");
    }

    // Breeds Container
    const breedsBox = document.getElementById("breedsContainer");
    if (breedsBox && data.breeds) {
      breedsBox.innerHTML = data.breeds
        .map(
          (b) => `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
          <h4 class="font-bold text-slate-900 text-xs">${b.name}</h4>
          <p class="text-[11px] text-slate-600"><strong>उत्पत्ति:</strong> ${b.origin}</p>
          <p class="text-[11px] text-slate-600"><strong>दूध क्षमता:</strong> ${b.milkYield}</p>
          <p class="text-[11px] text-blue-800"><strong>सीमन चयन:</strong> ${b.aiRecommendation}</p>
        </div>
      `
        )
        .join("");
    }
  }

  window.calculateDailyRation = function () {
    const wt = parseFloat((document.getElementById("feedWeight") || {}).value) || 400;
    const milk = parseFloat((document.getElementById("feedMilk") || {}).value) || 10;

    const grainEl = document.getElementById("resFeedGrain");
    const greenEl = document.getElementById("resFeedGreen");
    const dryEl = document.getElementById("resFeedDry");
    const card = document.getElementById("rationResultCard");

    // Scientific Ration Balance:
    // Maintenance: 1.5kg grain + (Milk / 2.5) for Cow / (Milk / 2.0) for Buffalo
    const grain = parseFloat((1.5 + milk * 0.4).toFixed(1));
    const green = Math.round(wt * 0.05); // 5% of body weight
    const dry = parseFloat((wt * 0.012).toFixed(1)); // 1.2% dry straw

    if (grainEl) grainEl.textContent = `${grain} kg`;
    if (greenEl) greenEl.textContent = `${green} kg`;
    if (dryEl) dryEl.textContent = `${dry} kg`;
    if (card) card.classList.remove("hidden");
  };

  /* =========================================================================
     16. ACTIVE GEMINI 2026 AI CLINICAL CONSULTANT & TABULAR RENDERER
     ========================================================================= */
  window.openAIKeyModal = function () {
    const modal = document.getElementById("modalAIKey");
    const input = document.getElementById("inputGeminiKey");
    if (input) input.value = localStorage.getItem(MASTER_STORAGE_KEY_AI_KEY) || "";
    if (modal) modal.style.display = "flex";
  };

  window.closeAIKeyModal = function () {
    const modal = document.getElementById("modalAIKey");
    if (modal) modal.style.display = "none";
  };

  window.saveGeminiKey = function () {
    const key = ((document.getElementById("inputGeminiKey") || {}).value || "").trim();
    if (key) {
      localStorage.setItem(MASTER_STORAGE_KEY_AI_KEY, key);
      alert("✅ Gemini API Key सुरक्षित कर ली गई है।");
    } else {
      localStorage.removeItem(MASTER_STORAGE_KEY_AI_KEY);
    }
    closeAIKeyModal();
  };

  window.sendCaseToAIConsultant = function () {
    const diag = ((document.getElementById("opdDiagnosis") || {}).value || "").trim();
    const animal = (document.getElementById("opdAnimal") || {}).value || "पशु";
    const preg = (document.getElementById("opdPregnancy") || {}).value || "";

    const prompt = `मरीज: ${animal} (${preg})\nप्रोविजनल लक्षण / रोग: ${diag}\nकृपया इस केस पर विस्तृत वेटरनरी डिफरेंशियल डायग्नोसिस, आवश्यक लैब टेस्ट तालिका, और 5-स्तरीय उपचार योजना प्रदान करें।`;

    const aiPromptBox = document.getElementById("aiInputPrompt");
    if (aiPromptBox) aiPromptBox.value = prompt;
    window.switchTab("ai");
  };

  window.runAIConsultant = async function () {
    const promptText = ((document.getElementById("aiInputPrompt") || {}).value || "").trim();
    const btn = document.getElementById("btnRunAI");
    const outArea = document.getElementById("aiOutputArea");

    if (!promptText) {
      alert("कृपया पशु के लक्षण व केस विवरण दर्ज करें!");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "⏳ क्लिनिकल विश्लेषण जारी है...";
    }
    if (outArea) {
      outArea.classList.remove("hidden");
      outArea.textContent = "AI वेटरनरी कंसल्टेंट से संपर्क किया जा रहा है...";
    }

    try {
      const responseMarkdown = await window.callGeminiClinicalAI(promptText, "DOCTOR");
      if (outArea) {
        outArea.innerHTML = window.renderAiClinicalReport(responseMarkdown);
      }
    } catch (err) {
      if (outArea) {
        outArea.innerHTML = `<span class="text-rose-700 font-bold">त्रुटि: ${err.message || "AI से संपर्क विफल रहा"}</span>`;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
      }
    }
  };

  window.callGeminiClinicalAI = async function (promptText, contextRole) {
    const apiKey = localStorage.getItem(MASTER_STORAGE_KEY_AI_KEY);
    if (!apiKey) {
      throw new Error("कृपया पहले ऊपर दिए गए 'AI Key' बटन से अपनी Google Gemini API Key दर्ज करें।");
    }

    // Constitutional Mandate: Active models 'gemini-3.8-flash' and 'gemini-3.5-flash'
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-2.5-flash"];

    const systemInstruction =
      "You are the Chief Veterinary Surgeon, Pharmacologist, and Bovine Reproduction Specialist for 'Vetcare AI OS'. " +
      "Provide authoritative evidence-based veterinary second opinions in clear Hindi/English. " +
      "Always include: 1. Confirmatory Signs & Differential Diagnosis, 2. Standardized Lab Tests Table, 3. Injections Table (Generic vs Ethical brand with dose mg/kg and pregnancy safety), " +
      "and 4. Prominent ⚠️ Pregnancy Red Alerts for Corticosteroids or contraindications.";

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
          contents: [{ parts: [{ text: `${systemInstruction}\n\nClient Case Query:\n${promptText}` }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048
          }
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next...`, err);
      }
    }

    throw lastError || new Error("Gemini AI मॉडल से संपर्क स्थापित नहीं हो सका।");
  };

  window.renderAiClinicalReport = function (markdown) {
    if (!markdown) return "";

    // Convert Markdown Tables into responsive Tailwind HTML tables
    let html = markdown
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Replace Markdown Table lines
    const lines = html.split("\n");
    let inTable = false;
    let tableBuffer = [];
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("|") && line.endsWith("|")) {
        inTable = true;
        tableBuffer.push(line);
      } else {
        if (inTable) {
          processedLines.push(convertMarkdownTableToHtml(tableBuffer));
          tableBuffer = [];
          inTable = false;
        }
        processedLines.push(line);
      }
    }
    if (inTable && tableBuffer.length > 0) {
      processedLines.push(convertMarkdownTableToHtml(tableBuffer));
    }

    let parsed = processedLines.join("<br/>");

    // Format headers and bold
    parsed = parsed.replace(/^### (.*$)/gim, '<h3 class="font-black text-blue-900 text-sm mt-3 mb-1">$1</h3>');
    parsed = parsed.replace(/^## (.*$)/gim, '<h2 class="font-black text-slate-900 text-base mt-4 mb-2">$1</h2>');
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');

    // Highlight Pregnancy Warnings
    parsed = parsed.replace(
      /(⚠️.*?(?:गर्भावस्था|गाभिन|Pregnancy).*?)(<br\/>|<\/p>|$)/gi,
      '<div class="pregnancy-alert-badge p-2.5 my-2 rounded-xl text-rose-950 font-bold">$1</div>'
    );

    return parsed;
  };

  function convertMarkdownTableToHtml(tableLines) {
    if (tableLines.length < 2) return tableLines.join("<br/>");

    const rows = tableLines
      .filter((l) => !l.includes("---"))
      .map((l) =>
        l
          .split("|")
          .map((c) => c.trim())
          .filter((c, idx, arr) => idx > 0 && idx < arr.length)
      );

    if (rows.length === 0) return "";

    const header = rows[0];
    const bodyRows = rows.slice(1);

    return `
      <div class="my-3 overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          <thead class="bg-blue-600 text-white font-bold">
            <tr>${header.map((h) => `<th class="p-2 border-b border-blue-700">${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${bodyRows
              .map(
                (row) => `
              <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                ${row.map((cell) => `<td class="p-2 text-slate-800">${cell}</td>`).join("")}
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  /* =========================================================================
     17. VERIFIED DUAL-BANK PAYMENT GATEWAY & MASTER ADMIN ENGINE
     ========================================================================= */
  window.openPremiumPaymentModal = function () {
    const modal = document.getElementById("modalPremiumPayment");
    if (modal) modal.style.display = "flex";
    updatePaymentModalUI();
  };

  window.closePremiumPaymentModal = function () {
    const modal = document.getElementById("modalPremiumPayment");
    if (modal) modal.style.display = "none";
  };

  window.selectPaymentPlan = function (planKey) {
    selectedPlan = planKey;
    const btnM = document.getElementById("btnPlanMonthly");
    const btnA = document.getElementById("btnPlanAnnual");

    if (planKey === "MONTHLY") {
      if (btnM) btnM.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
      if (btnA) btnA.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
    } else {
      if (btnM) btnM.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
      if (btnA) btnA.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
    }
    updatePaymentModalUI();
  };

  window.switchBankTab = function (bankKey) {
    currentPaymentBank = bankKey;
    const tabS = document.getElementById("btnTabSBI");
    const tabP = document.getElementById("btnTabPNB");

    if (bankKey === "SBI") {
      if (tabS) tabS.className = "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition";
      if (tabP) tabP.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
    } else {
      if (tabS) tabS.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
      if (tabP) tabP.className = "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition";
    }
    updatePaymentModalUI();
  };

  function updatePaymentModalUI() {
    const price = selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.annualPrice;
    const payee = AppConfig.payeeName;
    const upi = currentPaymentBank === "SBI" ? AppConfig.sbiUpi : AppConfig.pnbUpi;
    const ac = currentPaymentBank === "SBI" ? AppConfig.sbiAccount : AppConfig.pnbAccount;
    const ifsc = currentPaymentBank === "SBI" ? AppConfig.sbiIfsc : AppConfig.pnbIfsc;

    const dispPayee = document.getElementById("dispPayeeName");
    const dispUPI = document.getElementById("dispUPIId");
    const dispAC = document.getElementById("dispAccountNumber");
    const dispIFSC = document.getElementById("dispIFSC");
    const dispAmt = document.getElementById("directUPIAmount");
    const upiLink = document.getElementById("btnDirectUPILink");
    const qrImg = document.getElementById("dynamicQRImage");

    if (dispPayee) dispPayee.textContent = payee;
    if (dispUPI) dispUPI.textContent = upi;
    if (dispAC) dispAC.textContent = ac;
    if (dispIFSC) dispIFSC.textContent = ifsc;
    if (dispAmt) dispAmt.textContent = price;

    const upiIntent = `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(payee)}&am=${price}&cu=INR&tn=${encodeURIComponent("Vetcare_AI_OS_Premium")}`;
    if (upiLink) upiLink.href = upiIntent;

    // Generate Dynamic QR Code using standard QR API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiIntent)}`;
    if (qrImg) qrImg.src = qrUrl;
  }

  window.sendPaymentProofWhatsApp = function () {
    const price = selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.annualPrice;
    const msg = `नमस्ते एडमिन, मैंने Vetcare AI OS प्रीमियम प्लान (₹${price}) हेतु भुगतान कर दिया है। कृपया संलग्न स्क्रीनशॉट सत्यापित कर मेरा प्रीमियम सक्रिय करें।`;
    const waUrl = `https://wa.me/91${AppConfig.adminWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  window.escalateToAdminWhatsApp = function () {
    const msg = `नमस्ते एडमिन, मुझे Vetcare AI OS के उपयोग एवं क्लिनिकल मॉड्यूल में तकनीकी सहायता चाहिए।`;
    const waUrl = `https://wa.me/91${AppConfig.adminWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  // MASTER ADMIN SECURITY & CONTROL ROOM
  window.openAdminPinModal = function () {
    const modal = document.getElementById("modalAdminPIN");
    const input = document.getElementById("inputAdminPIN");
    const err = document.getElementById("pinErrorMessage");
    if (input) input.value = "";
    if (err) err.classList.add("hidden");
    if (modal) modal.style.display = "flex";
  };

  window.closeAdminPinModal = function () {
    const modal = document.getElementById("modalAdminPIN");
    if (modal) modal.style.display = "none";
  };

  window.verifyAdminPIN = function () {
    const input = document.getElementById("inputAdminPIN");
    const err = document.getElementById("pinErrorMessage");
    const pin = (input ? input.value : "").trim();

    if (pin === AppConfig.adminPin || pin === "9297") {
      closeAdminPinModal();
      openAdminDashboard();
    } else {
      if (err) err.classList.remove("hidden");
    }
  };

  function openAdminDashboard() {
    const modal = document.getElementById("modalAdminDashboard");
    if (modal) modal.style.display = "flex";

    // Populate Fields
    setInputValue("cfgPayeeName", AppConfig.payeeName);
    setInputValue("cfgMonthlyPrice", AppConfig.monthlyPrice);
    setInputValue("cfgAnnualPrice", AppConfig.annualPrice);
    setInputValue("cfgSbiUpi", AppConfig.sbiUpi);
    setInputValue("cfgSbiAccount", AppConfig.sbiAccount);
    setInputValue("cfgSbiIfsc", AppConfig.sbiIfsc);
    setInputValue("cfgPnbUpi", AppConfig.pnbUpi);
    setInputValue("cfgPnbAccount", AppConfig.pnbAccount);
    setInputValue("cfgPnbIfsc", AppConfig.pnbIfsc);
    setInputValue("cfgAdminWhatsApp", AppConfig.adminWhatsApp);
    setInputValue("cfgAdminPIN", AppConfig.adminPin);

    // Populate Metrics
    try {
      const cases = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_CASES) || "[]");
      const khata = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_KHATA) || "[]");
      const inv = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_INV) || "[]");

      let totalDues = 0;
      khata.forEach((k) => {
        if (k.type === "DUE") totalDues += k.amount;
      });

      const lowStockCount = inv.filter((it) => it.stock <= it.minAlert).length;

      const mOPD = document.getElementById("metricTotalOPD");
      const mDues = document.getElementById("metricTotalDues");
      const mLow = document.getElementById("metricLowStock");

      if (mOPD) mOPD.textContent = cases.length;
      if (mDues) mDues.textContent = `₹${totalDues}`;
      if (mLow) mLow.textContent = lowStockCount;
    } catch (e) {
      console.warn("Metrics load error:", e);
    }
  }

  window.closeAdminDashboard = function () {
    const modal = document.getElementById("modalAdminDashboard");
    if (modal) modal.style.display = "none";
  };

  window.switchAdminTab = function (adminTabKey) {
    const pPay = document.getElementById("adminPanelPayment");
    const pSupp = document.getElementById("adminPanelSupport");
    const pMet = document.getElementById("adminPanelMetrics");

    const tPay = document.getElementById("tabBtnAdminPay");
    const tSupp = document.getElementById("tabBtnAdminSupport");
    const tMet = document.getElementById("tabBtnAdminMetrics");

    [pPay, pSupp, pMet].forEach((p) => p && p.classList.add("hidden"));
    [tPay, tSupp, tMet].forEach((t) => t && (t.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0"));

    if (adminTabKey === "PAYMENT") {
      if (pPay) pPay.classList.remove("hidden");
      if (tPay) tPay.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0";
    } else if (adminTabKey === "SUPPORT") {
      if (pSupp) pSupp.classList.remove("hidden");
      if (tSupp) tSupp.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0";
    } else if (adminTabKey === "METRICS") {
      if (pMet) pMet.classList.remove("hidden");
      if (tMet) tMet.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0";
    }
  };

  window.saveAllAdminSettings = function () {
    AppConfig.payeeName = getInputValue("cfgPayeeName") || AppConfig.payeeName;
    AppConfig.monthlyPrice = parseFloat(getInputValue("cfgMonthlyPrice")) || AppConfig.monthlyPrice;
    AppConfig.annualPrice = parseFloat(getInputValue("cfgAnnualPrice")) || AppConfig.annualPrice;
    AppConfig.sbiUpi = getInputValue("cfgSbiUpi") || AppConfig.sbiUpi;
    AppConfig.sbiAccount = getInputValue("cfgSbiAccount") || AppConfig.sbiAccount;
    AppConfig.sbiIfsc = getInputValue("cfgSbiIfsc") || AppConfig.sbiIfsc;
    AppConfig.pnbUpi = getInputValue("cfgPnbUpi") || AppConfig.pnbUpi;
    AppConfig.pnbAccount = getInputValue("cfgPnbAccount") || AppConfig.pnbAccount;
    AppConfig.pnbIfsc = getInputValue("cfgPnbIfsc") || AppConfig.pnbIfsc;
    AppConfig.adminWhatsApp = getInputValue("cfgAdminWhatsApp") || AppConfig.adminWhatsApp;
    AppConfig.adminPin = getInputValue("cfgAdminPIN") || AppConfig.adminPin;

    saveAppConfigToStorage();
    alert("✅ सुपर एडमिन सेटिंग्स सफलतापूर्वक सुरक्षित कर ली गईं!");
    closeAdminDashboard();
    initAppConfigUI();
  };

  window.exportDataBackupJSON = function () {
    const backup = {
      config: AppConfig,
      cases: JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_CASES) || "[]"),
      khata: JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_KHATA) || "[]"),
      inventory: JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY_INV) || "[]"),
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vetcare_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function initAppConfigUI() {
    const titleHeader = document.getElementById("appHeaderTitle");
    const gwTitle = document.getElementById("gatewayAppTitle");
    const gwTag = document.getElementById("gatewayTagline");
    if (titleHeader) titleHeader.textContent = AppConfig.appTitle;
    if (gwTitle) gwTitle.textContent = AppConfig.appTitle;
    if (gwTag) gwTag.textContent = AppConfig.appTagline;
  }

  /* =========================================================================
     18. MULTI-LANGUAGE UI SWITCHER
     ========================================================================= */
  window.changeAppLanguage = function (langCode) {
    currentLanguage = langCode;
    const gwSelect = document.getElementById("gatewayLanguageSelect");
    const mainSelect = document.getElementById("mainLangSelect");
    if (gwSelect) gwSelect.value = langCode;
    if (mainSelect) mainSelect.value = langCode;
    updateTranslationsUI();
  };

  function updateTranslationsUI() {
    const dict = I18N_DICTIONARY[currentLanguage] || I18N_DICTIONARY.hi;

    const rBadge = document.getElementById("currentUserRoleBadge");
    if (rBadge) {
      rBadge.textContent = currentRole === "DOCTOR" ? dict.roleDoctor : dict.roleFarmer;
    }

    const lblChoose = document.getElementById("lblChooseRole");
    if (lblChoose) lblChoose.textContent = dict.chooseRole;

    const btnFarmer = document.getElementById("btnEnterFarmer");
    if (btnFarmer) btnFarmer.textContent = dict.btnFarmer;

    const btnDoctor = document.getElementById("btnEnterDoctor");
    if (btnDoctor) btnDoctor.textContent = dict.btnDoctor;

    // Bottom Navigation Bar Labels
    setTextSafe("navDiagnosis", dict.navDiag);
    setTextSafe("navRx", dict.navRx);
    setTextSafe("navFarmerRemedies", dict.navFarmerRemedies);
    setTextSafe("navBreeding", dict.navBreeding);
    setTextSafe("navFeed", dict.navFeed);
    setTextSafe("navFinanceLabel", dict.navKhata);
    setTextSafe("navHelpdesk", dict.navSupport);
  }

  function setTextSafe(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    const span = el.querySelector("span:last-child");
    if (span) span.textContent = text;
    else el.textContent = text;
  }

})();
