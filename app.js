/**
 * Vetcare AI OS - Master Application Controller (app.js)
 * Production-Ready Clinical Decision Support System & Smart Dairy Assistant
 * Version 3.5 Pro - High Performance & Defensive Execution Engine
 */

(function () {
  "use strict";

  /* =========================================================================
     1. GLOBAL CONFIGURATION & SECURE VERIFIED CREDENTIALS
     ========================================================================= */
  const MASTER_PIN = "9297";

  const DEFAULT_CONFIG = {
    payeeName: "Vetcare Services (Mr. Rahul)",
    monthlyPrice: 199,
    annualPrice: 1499,
    farmerPrice: 99,
    // Real verified SBI Credentials
    sbiUpi: "rahuljangra9297@oksbi",
    sbiAccount: "65204067585",
    sbiIfsc: "SBIN0013693",
    // Real verified Backup PNB Credentials
    pnbUpi: "rahuljangra9297-1@okicici",
    pnbAccount: "6687001700015098",
    pnbIfsc: "PUNB0668700",
    appTitle: "Vetcare AI OS",
    appTagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन सपोर्ट एवं स्मार्ट डेयरी स्वचालन",
    geminiKey: ""
  };

  // State Management
  let AppConfig = { ...DEFAULT_CONFIG };
  let currentRole = "DOCTOR"; // 'DOCTOR' | 'FARMER'
  let currentTab = "diagnosis";
  let activePaymentBank = "SBI";
  let selectedPlan = "MONTHLY";
  let currentWorkflow = "OPD";
  let activeDiagMode = "MATRIX"; // 'MATRIX' | 'SEARCH' | 'DIRECTORY'

  // Multi-symptom Matrix Selection State
  let matrixFilters = {
    temp: null,
    eyes: null,
    dung: null,
    urine: null,
    milkDrop: null,
    cardinal: "ALL"
  };

  // Navigation History Stack
  let navHistory = [];

  /* =========================================================================
     2. DEFENSIVE STORAGE & INITIALIZATION
     ========================================================================= */
  function loadStoredConfig() {
    try {
      const stored = localStorage.getItem("vetcare_config_v3");
      if (stored) {
        AppConfig = { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Config load error:", e);
    }
  }

  function saveConfigToStorage() {
    try {
      localStorage.setItem("vetcare_config_v3", JSON.stringify(AppConfig));
    } catch (e) {
      console.warn("Config save error:", e);
    }
  }

  function getTickets() {
    try {
      return JSON.parse(localStorage.getItem("vetcare_tickets_v3") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveTickets(tickets) {
    try {
      localStorage.setItem("vetcare_tickets_v3", JSON.stringify(tickets));
    } catch (e) {
      console.warn("Ticket save error:", e);
    }
  }

  function getOPDRecords() {
    try {
      return JSON.parse(localStorage.getItem("vetcare_opd_records_v3") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveOPDRecords(records) {
    try {
      localStorage.setItem("vetcare_opd_records_v3", JSON.stringify(records));
    } catch (e) {
      console.warn("OPD save error:", e);
    }
  }

  function getKhataRecords() {
    try {
      return JSON.parse(localStorage.getItem("vetcare_khata_v3") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveKhataRecords(records) {
    try {
      localStorage.setItem("vetcare_khata_v3", JSON.stringify(records));
    } catch (e) {
      console.warn("Khata save error:", e);
    }
  }

  function getInventoryItems() {
    try {
      const items = localStorage.getItem("vetcare_inventory_v3");
      if (items) return JSON.parse(items);
    } catch (e) {
      console.warn("Inventory read error:", e);
    }

    // Default Clinical Drug & Semen Straw Stock
    return [
      { id: "inv_1", name: "Inj. Intacef Tazo (3.375g)", category: "INJECTION", stock: 12, minAlert: 4, unit: "vials" },
      { id: "inv_2", name: "Inj. Melonex Plus (100ml)", category: "INJECTION", stock: 6, minAlert: 2, unit: "vials" },
      { id: "inv_3", name: "Inj. Berenil RTU (30ml)", category: "INJECTION", stock: 4, minAlert: 2, unit: "vials" },
      { id: "inv_4", name: "Inj. Belamyl (100ml)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
      { id: "inv_5", name: "मुर्राह सीमन स्ट्रॉ (Top Bull #405)", category: "SEMEN", stock: 35, minAlert: 10, unit: "straws" },
      { id: "inv_6", name: "HF Pure सीमन स्ट्रॉ (90% Sexed)", category: "SEMEN", stock: 18, minAlert: 5, unit: "straws" },
      { id: "inv_7", name: "Bolus Biosacc Gold", category: "BOLUS", stock: 40, minAlert: 15, unit: "tabs" },
      { id: "inv_8", name: "Bloatosil Liquid (100ml)", category: "TONIC", stock: 9, minAlert: 3, unit: "bottles" }
    ];
  }

  function saveInventoryItems(items) {
    try {
      localStorage.setItem("vetcare_inventory_v3", JSON.stringify(items));
    } catch (e) {
      console.warn("Inventory save error:", e);
    }
  }

  /* =========================================================================
     3. ROLE GATEWAY & NAVIGATION STACK
     ========================================================================= */
  function selectRole(role) {
    currentRole = role;
    navHistory = [];

    const gateway = document.getElementById("screenGateway");
    const mainApp = document.getElementById("screenMainApp");
    const roleBadge = document.getElementById("currentUserRoleBadge");

    if (gateway) gateway.classList.add("hidden");
    if (mainApp) mainApp.classList.remove("hidden");

    // Configure Navigation Bars and Badges based on Role
    updateRoleUI();

    if (role === "DOCTOR") {
      switchTab("diagnosis");
    } else {
      switchTab("farmerDesi");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateRoleUI() {
    const roleBadge = document.getElementById("currentUserRoleBadge");
    const doctorNavBtns = ["navDiagnosis", "navUtilities", "navRx", "navRecords", "navInventory", "navFinance"];
    const farmerNavBtns = ["navFarmerDesi", "navFarmerBreeding", "navFarmerFeed", "navFarmerMilk"];

    if (currentRole === "DOCTOR") {
      if (roleBadge) {
        roleBadge.innerHTML = '<i class="fa-solid fa-user-doctor text-blue-600"></i> अधिकृत पशु चिकित्सक';
      }
      doctorNavBtns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("hidden");
      });
      farmerNavBtns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });
    } else {
      if (roleBadge) {
        roleBadge.innerHTML = '<i class="fa-solid fa-cow text-emerald-600"></i> स्मार्ट पशुपालक (Farmer)';
      }
      doctorNavBtns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });
      farmerNavBtns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("hidden");
      });
    }
  }

  function switchTab(tabId) {
    const views = [
      "viewDiagnosis",
      "viewUtilities",
      "viewRx",
      "viewRecords",
      "viewFinance",
      "viewInventory",
      "viewFarmerDesi",
      "viewFarmerBreeding",
      "viewFarmerFeed",
      "viewFarmerMilk"
    ];

    if (currentTab !== tabId) {
      navHistory.push(currentTab);
      currentTab = tabId;
    }

    // Hide all view sections
    views.forEach((v) => {
      const el = document.getElementById(v);
      if (el) el.classList.add("hidden");
    });

    // Show targeted view
    const targetViewMap = {
      diagnosis: "viewDiagnosis",
      utilities: "viewUtilities",
      rx: "viewRx",
      records: "viewRecords",
      finance: "viewFinance",
      inventory: "viewInventory",
      farmerDesi: "viewFarmerDesi",
      farmerBreeding: "viewFarmerBreeding",
      farmerFeed: "viewFarmerFeed",
      farmerMilk: "viewFarmerMilk"
    };

    const activeViewId = targetViewMap[tabId] || "viewDiagnosis";
    const activeViewEl = document.getElementById(activeViewId);
    if (activeViewEl) activeViewEl.classList.remove("hidden");

    // Highlight bottom navigation button
    const allNavButtons = document.querySelectorAll("#bottomNavBar button");
    allNavButtons.forEach((btn) => {
      btn.classList.remove("active-nav-tab");
      btn.classList.add("text-slate-400");
    });

    const activeNavBtnId = "nav" + tabId.charAt(0).toUpperCase() + tabId.slice(1);
    const activeNavBtn = document.getElementById(activeNavBtnId);
    if (activeNavBtn) {
      activeNavBtn.classList.add("active-nav-tab");
      activeNavBtn.classList.remove("text-slate-400");
    }

    // Specific on-tab activations
    if (tabId === "records") renderFilteredRecords("");
    if (tabId === "finance") renderKhataList();
    if (tabId === "inventory") renderInventoryList("ALL");
    if (tabId === "utilities") calculateShaefferWeight();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleGoBack() {
    if (navHistory.length > 0) {
      const prevTab = navHistory.pop();
      switchTab(prevTab);
    } else {
      window.returnToGateway();
    }
  }

  /* =========================================================================
     4. CLINICAL DIAGNOSIS ENGINE & 5-TIER TREATMENT PROTOCOLS
     ========================================================================= */
  function setDiagnosisMode(mode) {
    activeDiagMode = mode;
    const panelMatrix = document.getElementById("panelDiagMatrix");
    const panelSearch = document.getElementById("panelDiagSearch");
    const panelDir = document.getElementById("panelDiagDirectory");

    const btn1 = document.getElementById("btnDiagMode1");
    const btn2 = document.getElementById("btnDiagMode2");
    const btn3 = document.getElementById("btnDiagMode3");

    [panelMatrix, panelSearch, panelDir].forEach((p) => p && p.classList.add("hidden"));
    [btn1, btn2, btn3].forEach((b) => {
      if (b) {
        b.className = "py-2.5 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
      }
    });

    if (mode === "MATRIX") {
      if (panelMatrix) panelMatrix.classList.remove("hidden");
      if (btn1) btn1.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      runWeightedMatrixEvaluation();
    } else if (mode === "SEARCH") {
      if (panelSearch) panelSearch.classList.remove("hidden");
      if (btn2) btn2.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      const input = document.getElementById("unifiedSearchInput");
      handleUnifiedSearch(input ? input.value : "");
    } else if (mode === "DIRECTORY") {
      if (panelDir) panelDir.classList.remove("hidden");
      if (btn3) btn3.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
      filterDirectoryCategory("ALL");
    }
  }

  function toggleMatrixParam(category, value, btnEl) {
    if (matrixFilters[category] === value) {
      matrixFilters[category] = null;
      if (btnEl) btnEl.classList.remove("chip-selected");
    } else {
      matrixFilters[category] = value;
      // Remove selection from siblings
      const parent = btnEl ? btnEl.parentElement : null;
      if (parent) {
        parent.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("chip-selected"));
      }
      if (btnEl) btnEl.classList.add("chip-selected");
    }
    runWeightedMatrixEvaluation();
  }

  function handleCardinalChange(cardinalVal) {
    matrixFilters.cardinal = cardinalVal;
    runWeightedMatrixEvaluation();
  }

  function resetSymptomMatrix() {
    matrixFilters = {
      temp: null,
      eyes: null,
      dung: null,
      urine: null,
      milkDrop: null,
      cardinal: "ALL"
    };

    document.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("chip-selected"));
    const sel = document.getElementById("selCardinalSign");
    if (sel) sel.value = "ALL";

    runWeightedMatrixEvaluation();
  }

  function runWeightedMatrixEvaluation() {
    if (!window.VETCARE_DISEASE_DB || !Array.isArray(window.VETCARE_DISEASE_DB)) {
      console.warn("Disease DB not ready");
      return;
    }

    const db = window.VETCARE_DISEASE_DB;
    const scoredList = [];

    db.forEach((disease) => {
      let score = 0;
      let maxScore = 0;

      // 1. Cardinal Sign Weight (40%)
      maxScore += 40;
      if (matrixFilters.cardinal && matrixFilters.cardinal !== "ALL") {
        if (disease.cardinalSign === matrixFilters.cardinal) {
          score += 40;
        }
      } else {
        score += 20; // neutral base when no cardinal selected
      }

      // 2. Temperature Weight (20%)
      maxScore += 20;
      if (matrixFilters.temp) {
        if (disease.tempCategory === matrixFilters.temp) {
          score += 20;
        } else if (matrixFilters.temp === "NORMAL" && disease.tempCategory !== "SUB") {
          score += 5;
        }
      } else {
        score += 15;
      }

      // 3. Multi-Symptom Secondary Weights (10% each = 40%)
      // Dung
      maxScore += 10;
      if (matrixFilters.dung) {
        if (matrixFilters.dung === "DIARRHEA" && (disease.id === "ENTEROTOXEMIA" || disease.id === "FMD")) score += 10;
        else if (matrixFilters.dung === "CONSTIPATION" && (disease.id === "BABESIOSIS" || disease.id === "SURRA")) score += 10;
        else score += 2;
      } else {
        score += 7;
      }

      // Urine
      maxScore += 10;
      if (matrixFilters.urine) {
        if (matrixFilters.urine === "RED" && disease.id === "BABESIOSIS") score += 10;
        else if (matrixFilters.urine === "KETONE" && disease.id === "KETOSIS") score += 10;
        else score += 2;
      } else {
        score += 7;
      }

      // Eyes
      maxScore += 10;
      if (matrixFilters.eyes) {
        if (matrixFilters.eyes === "JAUNDICE" && (disease.id === "BABESIOSIS" || disease.id === "SURRA")) score += 10;
        else if (matrixFilters.eyes === "SUNKEN" && (disease.id === "HS" || disease.id === "BLOAT")) score += 10;
        else score += 2;
      } else {
        score += 7;
      }

      // Milk Drop
      maxScore += 10;
      if (matrixFilters.milkDrop) {
        if (matrixFilters.milkDrop === "CLOTS" && disease.id === "MASTITIS") score += 10;
        else if (matrixFilters.milkDrop === "SEVERE" && (disease.id === "FMD" || disease.id === "HS" || disease.id === "KETOSIS")) score += 10;
        else score += 3;
      } else {
        score += 7;
      }

      const matchPct = Math.min(99, Math.round((score / maxScore) * 100));
      scoredList.push({ disease, matchPct });
    });

    // Sort descending by calculated probability
    scoredList.sort((a, b) => b.matchPct - a.matchPct);

    // Update status badge
    const badge = document.getElementById("matchCountBadge");
    const scoreText = document.getElementById("matchScoreText");
    if (badge) badge.innerText = `${scoredList.length} रोग मूल्यांकित`;
    if (scoreText) {
      const top = scoredList[0];
      scoreText.innerHTML = `<i class="fa-solid fa-chart-pie mr-1"></i> शीर्ष संभावना: <strong>${top.disease.names.hindi}</strong> (${top.matchPct}%)`;
    }

    renderDiseaseResults(scoredList);
  }

  function handleUnifiedSearch(query) {
    if (!window.VETCARE_DISEASE_DB) return;
    const q = (query || "").trim().toLowerCase();

    if (!q) {
      renderDiseaseResults(window.VETCARE_DISEASE_DB.map((d) => ({ disease: d, matchPct: null })));
      return;
    }

    const filtered = window.VETCARE_DISEASE_DB.filter((d) => {
      const matchHindi = d.names.hindi.toLowerCase().includes(q);
      const matchEng = d.names.english.toLowerCase().includes(q);
      const matchLocal = d.names.local.some((l) => l.toLowerCase().includes(q));
      const matchKeyword = d.keywords.some((k) => k.toLowerCase().includes(q));
      const matchDesc = d.overview.toLowerCase().includes(q);
      return matchHindi || matchEng || matchLocal || matchKeyword || matchDesc;
    });

    renderDiseaseResults(filtered.map((d) => ({ disease: d, matchPct: null })));
  }

  function filterDirectoryCategory(cat, btnEl) {
    if (btnEl) {
      document.querySelectorAll(".dir-chip").forEach((c) => {
        c.className = "dir-chip px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold shrink-0";
      });
      btnEl.className = "dir-chip px-3.5 py-2 rounded-xl bg-blue-600 text-white font-black shrink-0";
    }

    if (!window.VETCARE_DISEASE_DB) return;
    if (cat === "ALL") {
      renderDiseaseResults(window.VETCARE_DISEASE_DB.map((d) => ({ disease: d, matchPct: null })));
    } else {
      const filtered = window.VETCARE_DISEASE_DB.filter((d) => d.category === cat);
      renderDiseaseResults(filtered.map((d) => ({ disease: d, matchPct: null })));
    }
  }

  function renderDiseaseResults(items) {
    const container = document.getElementById("diseaseSearchResults");
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-2 text-slate-500">
          <i class="fa-solid fa-magnifying-glass text-3xl text-slate-300"></i>
          <p class="text-xs font-bold">कोई रोग रिकॉर्ड नहीं मिला। कृपया लक्षण बदलें।</p>
        </div>
      `;
      return;
    }

    let html = "";
    items.forEach(({ disease, matchPct }, index) => {
      const matchBar =
        matchPct !== null
          ? `
          <div class="mt-2 bg-slate-100 rounded-full h-2 w-full overflow-hidden">
            <div class="h-full ${matchPct > 70 ? "bg-emerald-600" : matchPct > 45 ? "bg-amber-500" : "bg-slate-400"}" style="width: ${matchPct}%"></div>
          </div>
          <div class="flex justify-between items-center text-[10px] text-slate-500 font-bold mt-1">
            <span>क्लिनिकल मिलान प्रायिकता</span>
            <span class="${matchPct > 70 ? "text-emerald-700 font-black" : "text-slate-700"}">${matchPct}% संभावना</span>
          </div>
        `
          : "";

      html += `
        <article class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition">
          <!-- CARD HEADER -->
          <div class="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">${disease.category}</span>
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">${disease.temperatureRangeF}</span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-slate-900 mt-1">${disease.names.hindi}</h3>
              <p class="text-xs text-slate-500 font-medium">${disease.names.english} • स्थानीय नाम: ${disease.names.local.join(", ")}</p>
              ${matchBar}
            </div>
            <button onclick="toggleDiseaseDetail('${disease.id}')" id="btnToggle_${disease.id}" class="self-start sm:self-center shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
              <span>उपचार व पर्ची देखें</span>
              <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
          </div>

          <!-- CARD BODY (EXPANDABLE) -->
          <div id="detail_${disease.id}" class="hidden p-4 sm:p-6 space-y-5 text-xs sm:text-sm bg-white">
            
            <!-- OVERVIEW -->
            <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 leading-relaxed">
              <strong class="text-slate-900 block font-bold mb-0.5">🧬 पैथोजेनेसिस एवं अवलोकन:</strong>
              ${disease.overview}
            </div>

            <!-- LAB TESTS TABLE -->
            <div class="space-y-2">
              <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <i class="fa-solid fa-flask-vial text-purple-600"></i> पुष्टि कारक प्रयोगशाला परीक्षण (Confirmatory Lab Tests):
              </h4>
              <div class="overflow-x-auto border border-slate-200 rounded-2xl">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                    <tr>
                      <th class="p-2.5">जांच का नाम (Test)</th>
                      <th class="p-2.5">नमूना प्रकार (Sample)</th>
                      <th class="p-2.5">खर्च (₹)</th>
                      <th class="p-2.5">क्लिनिकल महत्व</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
                    ${disease.confirmatoryLabTests
                      .map(
                        (t) => `
                      <tr>
                        <td class="p-2.5 font-bold">${t.testName}</td>
                        <td class="p-2.5 text-slate-600">${t.sampleType}</td>
                        <td class="p-2.5 font-mono text-emerald-700">₹${t.approxMRP}</td>
                        <td class="p-2.5 text-slate-600">${t.significance}</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TIER 1: ALLOPATHIC INJECTIONS TABLE -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
                  <i class="fa-solid fa-syringe text-blue-600"></i> टियर 1: एलोपैथिक इंजेक्शन तालिका (Injections Table):
                </h4>
                <button onclick="autoFillOPDFromDisease('${disease.id}')" class="text-[10px] bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-blue-700 transition">
                  + ओपीडी पर्ची में लोड करें
                </button>
              </div>
              <div class="overflow-x-auto border border-slate-200 rounded-2xl">
                <table class="w-full text-left text-xs">
                  <thead class="bg-blue-50 text-blue-900 border-b border-blue-200 font-bold">
                    <tr>
                      <th class="p-2.5">वर्ग</th>
                      <th class="p-2.5">ड्रग / साल्ट (Generic)</th>
                      <th class="p-2.5">प्रमुख ब्रांड्स</th>
                      <th class="p-2.5">डोज़ एवं रूट</th>
                      <th class="p-2.5">गर्भ सुरक्षा</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-slate-800">
                    ${disease.injectionsTable
                      .map(
                        (inj) => `
                      <tr class="${inj.pregnancySafety && inj.pregnancySafety.includes("UNSAFE") ? "bg-rose-50/70" : ""}">
                        <td class="p-2.5 text-slate-500 text-[11px] font-bold">${inj.category}</td>
                        <td class="p-2.5 font-bold text-slate-900">${inj.salt}</td>
                        <td class="p-2.5 font-mono text-blue-700 text-[11px]">${inj.brands.join(", ")}</td>
                        <td class="p-2.5 text-[11px] leading-tight">${inj.doseRoute}</td>
                        <td class="p-2.5 font-bold text-[10px] ${inj.pregnancySafety.includes("SAFE") && !inj.pregnancySafety.includes("UNSAFE") ? "text-emerald-700" : "text-rose-700"}">
                          ${inj.pregnancySafety}
                        </td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TIER 2 & 3: ORAL SUPPLEMENTS & AYURVEDA -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <strong class="text-slate-900 font-bold block flex items-center gap-1.5">
                  <i class="fa-solid fa-pills text-emerald-600"></i> टियर 2: ओरल सप्लीमेंट्स:
                </strong>
                ${disease.oralSupplements
                  .map(
                    (s) => `
                  <div class="border-b border-slate-200 pb-1.5 last:border-0 last:pb-0">
                    <span class="font-bold text-slate-800">${s.name} (${s.brands.join(", ")})</span>
                    <p class="text-[11px] text-slate-600">डोज़: ${s.dose}</p>
                    <p class="text-[10px] text-slate-500">उद्देश्य: ${s.purpose}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <strong class="text-slate-900 font-bold block flex items-center gap-1.5">
                  <i class="fa-solid fa-leaf text-teal-600"></i> टियर 3: आयुर्वेदिक व हर्बल:
                </strong>
                ${disease.ayurvedicHerbal
                  .map(
                    (a) => `
                  <div class="border-b border-slate-200 pb-1.5 last:border-0 last:pb-0">
                    <span class="font-bold text-slate-800">${a.name} (₹${a.approxMRP})</span>
                    <p class="text-[11px] text-slate-600">घटक: ${a.keyIngredients}</p>
                    <p class="text-[10px] text-teal-800">डोज़: ${a.dose} • संकेत: ${a.indication}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- TIER 4 & 5: HOMEOPATHY & DESI REMEDIES -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <strong class="text-slate-900 font-bold block flex items-center gap-1.5">
                  <i class="fa-solid fa-droplet text-blue-500"></i> टियर 4: होम्योपैथिक विकल्प:
                </strong>
                ${disease.homeopathicRemedies
                  .map(
                    (h) => `
                  <div class="border-b border-slate-200 pb-1.5 last:border-0 last:pb-0">
                    <span class="font-bold text-slate-800">${h.remedy} (${h.potency})</span>
                    <p class="text-[11px] text-slate-600">खुराक: ${h.dose}</p>
                    <p class="text-[10px] text-slate-500">लक्षण: ${h.indication}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <strong class="text-slate-900 font-bold block flex items-center gap-1.5">
                  <i class="fa-solid fa-mortar-pestle text-amber-700"></i> टियर 5: घरेलू देशी नुस्खे:
                </strong>
                ${disease.desiHomeRemedies
                  .map(
                    (d) => `
                  <div>
                    <span class="font-bold text-slate-800">${d.remedyName}</span>
                    <p class="text-[11px] text-slate-600">सामग्री: ${d.ingredients}</p>
                    <p class="text-[11px] text-slate-600">विधि: ${d.preparation}</p>
                    <p class="text-[10px] text-amber-900 font-bold">खुराक: ${d.dosage}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- SHED BIOSECURITY & PREGNANCY WARNING -->
            <div class="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl space-y-1 text-xs text-amber-950">
              <strong class="font-bold block flex items-center gap-1 text-amber-900">
                <i class="fa-solid fa-shield-halved"></i> शेड बायोसिक्योरिटी व प्रबंधन:
              </strong>
              <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900">
                ${disease.shedBiosecurity.map((s) => `<li>${s}</li>`).join("")}
              </ul>
            </div>

            <!-- PREGNANCY WARNING BOX -->
            <div class="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-1 text-xs text-rose-950">
              <strong class="font-bold block text-rose-700 flex items-center gap-1">
                <i class="fa-solid fa-triangle-exclamation"></i> गर्भावस्था वर्जना (Pregnancy Warning):
              </strong>
              <p class="text-[11px]"><strong>वर्जित दवाएं:</strong> ${disease.pregnancyContraindications.contraindicatedDrugs.join(", ")}</p>
              <p class="text-[11px] text-rose-900"><strong>चेतावनी:</strong> ${disease.pregnancyContraindications.clinicalWarning}</p>
            </div>

          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  function toggleDiseaseDetail(diseaseId) {
    const detail = document.getElementById("detail_" + diseaseId);
    const btn = document.getElementById("btnToggle_" + diseaseId);
    if (!detail) return;

    if (detail.classList.contains("hidden")) {
      detail.classList.remove("hidden");
      if (btn) btn.innerHTML = '<span>संक्षेप में समेटें</span> <i class="fa-solid fa-chevron-up text-[10px]"></i>';
    } else {
      detail.classList.add("hidden");
      if (btn) btn.innerHTML = '<span>उपचार व पर्ची देखें</span> <i class="fa-solid fa-chevron-down text-[10px]"></i>';
    }
  }

  function autoFillOPDFromDisease(diseaseId) {
    if (!window.VETCARE_DISEASE_DB) return;
    const disease = window.VETCARE_DISEASE_DB.find((d) => d.id === diseaseId);
    if (!disease) return;

    switchTab("rx");

    const diagInput = document.getElementById("opdDiagnosis");
    const medInput = document.getElementById("opdMedicine");

    if (diagInput) diagInput.value = disease.names.hindi;

    if (medInput) {
      let rxText = `=== ${disease.names.hindi} क्लिनिकल प्रोटोकॉल ===\n`;
      disease.injectionsTable.forEach((inj, idx) => {
        rxText += `${idx + 1}. ${inj.brands[0]} (${inj.salt}) - ${inj.doseRoute}\n`;
      });
      if (disease.oralSupplements && disease.oralSupplements.length > 0) {
        rxText += `4. ${disease.oralSupplements[0].brands[0]} - ${disease.oralSupplements[0].dose}\n`;
      }
      medInput.value = rxText;
    }

    checkRxPregnancyConflict();
  }

  function checkRxPregnancyConflict() {
    const pregSelect = document.getElementById("opdPregnancy");
    const banner = document.getElementById("pregnancyRedAlertBanner");
    const medInput = document.getElementById("opdMedicine");
    if (!pregSelect || !banner) return;

    const isPregnant = pregSelect.value === "PREGNANT";
    const text = medInput ? medInput.value.toLowerCase() : "";

    const hasContraindicatedSteroid =
      text.includes("dexa") ||
      text.includes("dexamethasone") ||
      text.includes("decadron") ||
      text.includes("dexona") ||
      text.includes("betamethasone");

    if (isPregnant && hasContraindicatedSteroid) {
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }
  }

  /* =========================================================================
     5. SMART FIELD UTILITIES: WEIGHT, DOSE & TOXIC TRIAGE
     ========================================================================= */
  function calculateShaefferWeight() {
    const girthEl = document.getElementById("calcGirth");
    const lenEl = document.getElementById("calcLength");
    const dispKg = document.getElementById("dispCalcWeightKg");
    const dispLbs = document.getElementById("dispCalcWeightLbs");
    const dispDose = document.getElementById("dispStandardDose");

    const girth = parseFloat(girthEl ? girthEl.value : 0) || 0;
    const len = parseFloat(lenEl ? lenEl.value : 0) || 0;

    if (girth <= 0 || len <= 0) {
      if (dispKg) dispKg.innerText = "0 kg";
      if (dispLbs) dispLbs.innerText = "(0 lbs)";
      if (dispDose) dispDose.innerText = "0 ml";
      return;
    }

    // Shaeffer's Equation: Weight in lbs = (Girth² in inches * Length in inches) / 300
    // Weight in kg = lbs * 0.45359237
    const weightLbs = Math.round((Math.pow(girth, 2) * len) / 300);
    const weightKg = Math.round(weightLbs * 0.45359237);

    // Standard dose 1 ml per 20 kg
    const standardDose = (weightKg / 20).toFixed(1);

    if (dispKg) dispKg.innerText = `${weightKg} kg`;
    if (dispLbs) dispLbs.innerText = `(${weightLbs} lbs)`;
    if (dispDose) dispDose.innerText = `${standardDose} ml`;
  }

  function setWeightPreset(girth, len) {
    const girthEl = document.getElementById("calcGirth");
    const lenEl = document.getElementById("calcLength");
    if (girthEl) girthEl.value = girth;
    if (lenEl) lenEl.value = len;
    calculateShaefferWeight();
  }

  /* =========================================================================
     6. DIGITAL OPD PRESCRIPTION & 7 SERVICE WORKFLOWS
     ========================================================================= */
  function setOpdWorkflow(wf, btnEl) {
    currentWorkflow = wf;
    document.querySelectorAll(".wf-btn").forEach((b) => {
      b.className = "wf-btn py-2 rounded-xl bg-slate-100 text-slate-700 text-center";
    });
    if (btnEl) {
      btnEl.className = "wf-btn py-2 rounded-xl bg-blue-600 text-white text-center";
    }

    const aiBanner = document.getElementById("aiWorkflowBanner");
    const diagInput = document.getElementById("opdDiagnosis");

    if (wf === "AI") {
      if (aiBanner) aiBanner.classList.remove("hidden");
      const today = new Date();
      const pdDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
      const calvingDate = new Date(today.getTime() + 283 * 24 * 60 * 60 * 1000);

      const dispPd = document.getElementById("dispAiPdDate");
      const dispCalv = document.getElementById("dispAiCalvingDate");
      if (dispPd) dispPd.innerText = pdDate.toLocaleDateString("hi-IN");
      if (dispCalv) dispCalv.innerText = calvingDate.toLocaleDateString("hi-IN");
      if (diagInput) diagInput.value = "कृत्रिम गर्भाधान (Artificial Insemination - A.I.)";
    } else {
      if (aiBanner) aiBanner.classList.add("hidden");
      if (wf === "PD" && diagInput) diagInput.value = "गर्भ जांच (Pregnancy Diagnosis - P.D.)";
      if (wf === "VAC" && diagInput) diagInput.value = "निवारक टीकाकरण (Preventive Vaccination)";
      if (wf === "DEW" && diagInput) diagInput.value = "नियमित कृमिनाशक (Deworming)";
      if (wf === "SURG" && diagInput) diagInput.value = "शल्य चिकित्सा / ब्यांत सहायता";
      if (wf === "CALV" && diagInput) diagInput.value = "प्रसव सहायता / जेर सफाई";
      if (wf === "OPD" && diagInput && diagInput.value.includes("A.I.")) diagInput.value = "";
    }
  }

  function calculateRxDue() {
    const totalEl = document.getElementById("opdTotalFee");
    const paidEl = document.getElementById("opdPaidFee");
    const dueEl = document.getElementById("opdDueFee");

    const total = parseFloat(totalEl ? totalEl.value : 0) || 0;
    const paid = parseFloat(paidEl ? paidEl.value : 0) || 0;
    const due = Math.max(0, total - paid);

    if (dueEl) dueEl.value = due;
  }

  function clearRxField() {
    const medInput = document.getElementById("opdMedicine");
    if (medInput) medInput.value = "";
    checkRxPregnancyConflict();
  }

  function captureCurrentGPS() {
    const gpsInput = document.getElementById("opdGPS");
    const btn = document.getElementById("btnGPS");

    if (!navigator.geolocation) {
      alert("आपके ब्राउज़र में GPS सुविधा उपलब्ध नहीं है।");
      return;
    }

    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> प्राप्त कर रहे...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (gpsInput) gpsInput.value = coords;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> GPS OK';
      },
      (err) => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> पुनः प्रयास';
        alert("GPS लोकेशन प्राप्त करने में विफल। कृपया लोकेशन अनुमति (Permission) दें।");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function getOPDFormData() {
    return {
      id: "RX_" + Date.now(),
      date: new Date().toLocaleDateString("hi-IN"),
      time: new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" }),
      farmerName: (document.getElementById("opdFarmerName")?.value || "").trim(),
      farmerPhone: (document.getElementById("opdFarmerPhone")?.value || "").trim(),
      village: (document.getElementById("opdVillage")?.value || "").trim(),
      animal: document.getElementById("opdAnimal")?.value || "गाय (Cow)",
      tag: (document.getElementById("opdTag")?.value || "").trim(),
      gps: document.getElementById("opdGPS")?.value || "",
      pregnancy: document.getElementById("opdPregnancy")?.value || "NON_PREGNANT",
      workflow: currentWorkflow,
      diagnosis: (document.getElementById("opdDiagnosis")?.value || "").trim(),
      medicines: (document.getElementById("opdMedicine")?.value || "").trim(),
      totalFee: parseFloat(document.getElementById("opdTotalFee")?.value || 0) || 0,
      paidFee: parseFloat(document.getElementById("opdPaidFee")?.value || 0) || 0,
      dueFee: parseFloat(document.getElementById("opdDueFee")?.value || 0) || 0
    };
  }

  function dispatchWhatsAppRx() {
    const d = getOPDFormData();
    if (!d.farmerName) {
      alert("कृपया किसान का नाम दर्ज करें।");
      return;
    }
    if (!d.farmerPhone || d.farmerPhone.length < 10) {
      alert("कृपया 10-अंकों का वैध व्हाट्सएप मोबाइल नंबर दर्ज करें।");
      return;
    }

    // Auto save to offline records
    saveCurrentOPDOffline(false);

    // Format WhatsApp prescription message
    let msg = `*🏥 ${AppConfig.appTitle} - डिजिटल ओपीडी पर्ची*\n`;
    msg += `------------------------------------\n`;
    msg += `📅 दिनांक: ${d.date} (${d.time})\n`;
    msg += `👨‍🌾 किसान: ${d.farmerName} (${d.village || "गाँव"})\n`;
    msg += `🐄 पशु: ${d.animal} | टैग: ${d.tag || "N/A"}\n`;
    msg += `🧬 अवस्था: ${d.pregnancy === "PREGNANT" ? "गाभिन (Pregnant)" : "खाली / सामान्य"}\n`;
    if (d.gps) msg += `📍 GPS लोकेशन: https://maps.google.com/?q=${d.gps}\n`;
    msg += `------------------------------------\n`;
    msg += `🩺 *निदान (Diagnosis):* ${d.diagnosis || "क्लिनिकल परीक्षण"}\n\n`;
    msg += `💊 *दी गई दवाएं व इंजेक्शन (Rx):*\n${d.medicines || "परामर्श दिया गया"}\n\n`;
    msg += `------------------------------------\n`;
    msg += `💰 कुल फीस: ₹${d.totalFee} | जमा: ₹${d.paidFee} | *बकाया: ₹${d.dueFee}*\n`;
    msg += `------------------------------------\n`;
    msg += `_अधिकृत पशु चिकित्सक द्वारा जारी की गई प्रमाणित पर्ची._\n`;

    const cleanPhone = d.farmerPhone.replace(/\D/g, "");
    const waUrl = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  }

  function saveCurrentOPDOffline(notify = true) {
    const d = getOPDFormData();
    if (!d.farmerName) {
      if (notify) alert("कृपया कम से कम किसान का नाम दर्ज करें।");
      return;
    }

    const records = getOPDRecords();
    records.unshift(d);
    saveOPDRecords(records);

    // If there is due amount, automatically log into Khata
    if (d.dueFee > 0) {
      const khata = getKhataRecords();
      khata.unshift({
        id: "KH_" + Date.now(),
        date: d.date,
        farmerName: d.farmerName,
        phone: d.farmerPhone,
        amount: d.dueFee,
        type: "DUE",
        note: `ओपीडी पर्ची: ${d.diagnosis}`
      });
      saveKhataRecords(khata);
    }

    if (notify) {
      alert("✅ केस सफलतापूर्वक सहेजा गया!");
      renderFilteredRecords("");
    }
  }

  function printCurrentOPDSlip() {
    const d = getOPDFormData();
    const printArea = document.getElementById("printableSlipArea");
    if (!printArea) return;

    printArea.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid #2563eb; border-radius: 12px; max-width: 600px; margin: auto;">
        <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          <h2 style="margin: 0; color: #1e3a8a; font-size: 22px;">${AppConfig.appTitle}</h2>
          <p style="margin: 4px 0 0; font-size: 11px; color: #64748b;">${AppConfig.appTagline}</p>
          <p style="margin: 4px 0 0; font-size: 12px; font-weight: bold; color: #0284c7;">डिजिटल ओपीडी पर्ची (Veterinary Rx)</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 12px;">
          <div>
            <strong>किसान:</strong> ${d.farmerName}<br/>
            <strong>गाँव:</strong> ${d.village || "N/A"}<br/>
            <strong>फोन:</strong> ${d.farmerPhone}
          </div>
          <div style="text-align: right;">
            <strong>दिनांक:</strong> ${d.date}<br/>
            <strong>पशु / टैग:</strong> ${d.animal} (${d.tag || "N/A"})<br/>
            <strong>गर्भ स्थिति:</strong> ${d.pregnancy}
          </div>
        </div>

        <div style="margin-top: 15px; padding: 8px; background-color: #f1f5f9; border-radius: 6px; font-size: 12px;">
          <strong>पहचाना गया रोग (Diagnosis):</strong> ${d.diagnosis}
        </div>

        <div style="margin-top: 15px;">
          <strong style="font-size: 12px; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">औषधियां एवं खुराक (Prescription):</strong>
          <pre style="font-family: monospace; font-size: 11px; white-space: pre-wrap; margin-top: 6px; line-height: 1.6;">${d.medicines}</pre>
        </div>

        <div style="margin-top: 20px; border-top: 1px dashed #94a3b8; padding-top: 10px; display: flex; justify-content: space-between; font-size: 12px;">
          <div>
            कुल शुल्क: ₹${d.totalFee} | जमा: ₹${d.paidFee} | <strong style="color: #b91c1c;">बकाया: ₹${d.dueFee}</strong>
          </div>
          <div>
            हस्ताक्षर अधिकृत पशु चिकित्सक
          </div>
        </div>
      </div>
    `;

    window.print();
  }

  function renderFilteredRecords(query) {
    const list = document.getElementById("recordsList");
    const badge = document.getElementById("recordTotalBadge");
    if (!list) return;

    const records = getOPDRecords();
    if (badge) badge.innerText = `${records.length} केस सुरक्षित`;

    const q = (query || "").trim().toLowerCase();
    const filtered = records.filter((r) => {
      return (
        r.farmerName.toLowerCase().includes(q) ||
        r.farmerPhone.includes(q) ||
        r.village.toLowerCase().includes(q) ||
        r.diagnosis.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="p-6 text-center bg-white border border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">
          कोई केस रिकॉर्ड नहीं मिला।
        </div>
      `;
      return;
    }

    list.innerHTML = filtered
      .map(
        (r, idx) => `
      <div class="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-xs">
        <div>
          <div class="flex items-center gap-2">
            <strong class="text-slate-900 text-sm font-black">${r.farmerName}</strong>
            <span class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold">${r.animal}</span>
            <span class="text-[10px] text-slate-400 font-mono">${r.date}</span>
          </div>
          <p class="text-xs text-slate-600 mt-0.5">📞 ${r.farmerPhone} • 📍 ${r.village || "N/A"} • 🏷️ टैग: ${r.tag || "N/A"}</p>
          <p class="text-xs text-blue-800 font-bold mt-1">रोग: ${r.diagnosis}</p>
        </div>
        <div class="flex items-center gap-2 self-end sm:self-center">
          <span class="text-xs font-black ${r.dueFee > 0 ? "text-rose-600 bg-rose-50 border border-rose-200" : "text-emerald-700 bg-emerald-50"} px-2.5 py-1 rounded-lg">
            ${r.dueFee > 0 ? "बकाया: ₹" + r.dueFee : "पूर्ण चुकता"}
          </span>
          <button onclick="deleteOPDRecord('${r.id}')" class="text-slate-400 hover:text-rose-600 text-xs p-1">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  function deleteOPDRecord(id) {
    if (!confirm("क्या आप इस केस रिकॉर्ड को हटाना चाहते हैं?")) return;
    let records = getOPDRecords().filter((r) => r.id !== id);
    saveOPDRecords(records);
    renderFilteredRecords("");
  }

  /* =========================================================================
     7. FINANCIAL KHATA LEDGER & INVENTORY ENGINE
     ========================================================================= */
  function renderKhataList() {
    const list = document.getElementById("finDueList");
    const creditEl = document.getElementById("finCredit");
    const debitEl = document.getElementById("finDebit");

    const records = getKhataRecords();
    let totalCredit = 0;
    let totalDebit = 0;

    records.forEach((r) => {
      if (r.type === "PAID") totalCredit += Number(r.amount);
      if (r.type === "DUE") totalDebit += Number(r.amount);
    });

    if (creditEl) creditEl.innerText = `₹${totalCredit.toLocaleString("en-IN")}`;
    if (debitEl) debitEl.innerText = `₹${totalDebit.toLocaleString("en-IN")}`;

    if (!list) return;
    if (records.length === 0) {
      list.innerHTML = `
        <div class="p-6 text-center text-slate-400 text-xs font-bold">
          खाता बही में कोई लेन-देन दर्ज नहीं है।
        </div>
      `;
      return;
    }

    list.innerHTML = records
      .map(
        (k) => `
      <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-slate-900 font-bold">${k.farmerName}</strong>
            <span class="text-[10px] text-slate-400 font-mono">(${k.date})</span>
          </div>
          <p class="text-[11px] text-slate-500">📞 ${k.phone} ${k.note ? "• " + k.note : ""}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-black ${k.type === "DUE" ? "text-rose-600" : "text-emerald-700"}">
            ${k.type === "DUE" ? "- ₹" + k.amount : "+ ₹" + k.amount}
          </span>
          ${
            k.type === "DUE"
              ? `
            <button onclick="sendWhatsAppPaymentTagada('${k.farmerName}', '${k.phone}', ${k.amount})" class="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded-lg hover:bg-emerald-700 transition" title="तगादा भेजें">
              <i class="fa-brands fa-whatsapp"></i> तगादा
            </button>
          `
              : ""
          }
          <button onclick="deleteKhataItem('${k.id}')" class="text-slate-300 hover:text-rose-500">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  function sendWhatsAppPaymentTagada(name, phone, amount) {
    if (!phone || phone.length < 10) {
      alert("वैध मोबाइल नंबर नहीं है।");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    const msg = `नमस्ते श्रीमान ${name} जी,\n\nपशु क्लिनिक उपचार की बकाया राशि ₹${amount} का भुगतान कृपया शीघ्र करने का कष्ट करें।\n\nधन्यवाद,\n${AppConfig.appTitle}`;
    window.open(`https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(msg)}`, "_blank");
  }

  function deleteKhataItem(id) {
    let khata = getKhataRecords().filter((k) => k.id !== id);
    saveKhataRecords(khata);
    renderKhataList();
  }

  function openNewKhataModal() {
    const m = document.getElementById("modalNewKhata");
    if (m) m.style.display = "flex";
  }

  function closeNewKhataModal() {
    const m = document.getElementById("modalNewKhata");
    if (m) m.style.display = "none";
  }

  function saveNewKhataRecord() {
    const name = (document.getElementById("khataFarmerName")?.value || "").trim();
    const phone = (document.getElementById("khataFarmerPhone")?.value || "").trim();
    const amount = parseFloat(document.getElementById("khataAmount")?.value || 0);
    const type = document.getElementById("khataType")?.value || "DUE";
    const note = (document.getElementById("khataNote")?.value || "").trim();

    if (!name || amount <= 0) {
      alert("कृपया किसान का नाम और वैध राशि दर्ज करें।");
      return;
    }

    const records = getKhataRecords();
    records.unshift({
      id: "KH_" + Date.now(),
      date: new Date().toLocaleDateString("hi-IN"),
      farmerName: name,
      phone: phone || "N/A",
      amount: amount,
      type: type,
      note: note
    });

    saveKhataRecords(records);
    closeNewKhataModal();
    renderKhataList();
  }

  // Stock Inventory Quick Counter
  function renderInventoryList(category) {
    const container = document.getElementById("inventoryItemsContainer");
    if (!container) return;

    let items = getInventoryItems();
    if (category && category !== "ALL") {
      items = items.filter((i) => i.category === category);
    }

    container.innerHTML = items
      .map(
        (item) => `
      <div class="bg-slate-50 border ${item.stock <= item.minAlert ? "border-rose-300 bg-rose-50/40" : "border-slate-200"} p-3 rounded-2xl flex justify-between items-center text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-slate-900 font-bold">${item.name}</strong>
            ${item.stock <= item.minAlert ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">कम स्टॉक</span>' : ""}
          </div>
          <span class="text-[10px] text-slate-500">${item.category} • अलर्ट सीमा: ${item.minAlert} ${item.unit}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="updateStock('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center">-</button>
          <strong class="font-mono text-sm min-w-8 text-center ${item.stock <= item.minAlert ? "text-rose-700 font-black" : "text-slate-800"}">${item.stock}</strong>
          <button onclick="updateStock('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center">+</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  function updateStock(itemId, delta) {
    let items = getInventoryItems();
    const item = items.find((i) => i.id === itemId);
    if (item) {
      item.stock = Math.max(0, item.stock + delta);
      saveInventoryItems(items);
      renderInventoryList("ALL");
    }
  }

  function filterInventoryCategory(cat, btnEl) {
    if (btnEl) {
      document.querySelectorAll(".inv-chip").forEach((b) => {
        b.className = "inv-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 shrink-0";
      });
      btnEl.className = "inv-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white shrink-0";
    }
    renderInventoryList(cat);
  }

  function openNewInventoryItemModal() {
    const m = document.getElementById("modalNewInventory");
    if (m) m.style.display = "flex";
  }

  function closeNewInventoryModal() {
    const m = document.getElementById("modalNewInventory");
    if (m) m.style.display = "none";
  }

  function saveNewInventoryItem() {
    const name = (document.getElementById("invItemName")?.value || "").trim();
    const category = document.getElementById("invItemCategory")?.value || "INJECTION";
    const stock = parseInt(document.getElementById("invItemStock")?.value || 0, 10);
    const minAlert = parseInt(document.getElementById("invItemMinAlert")?.value || 3, 10);
    const unit = (document.getElementById("invItemUnit")?.value || "vials").trim();

    if (!name || stock < 0) {
      alert("कृपया दवा/सीमन का नाम और सही मात्रा दर्ज करें।");
      return;
    }

    const items = getInventoryItems();
    items.unshift({
      id: "inv_" + Date.now(),
      name,
      category,
      stock,
      minAlert,
      unit
    });

    saveInventoryItems(items);
    closeNewInventoryModal();
    renderInventoryList("ALL");
  }

  /* =========================================================================
     8. SMART FARMER CALCULATORS: BREEDING, RATION & MILK SALES
     ========================================================================= */
  function calculateBreedingDates() {
    const dateInput = document.getElementById("breedingInputDate");
    const animalType = document.getElementById("breedingAnimalType")?.value || "COW";
    const resultCard = document.getElementById("breedingResultCard");

    if (!dateInput || !dateInput.value) {
      alert("कृपया मद या सीमन की तारीख चुनें।");
      return;
    }

    const baseDate = new Date(dateInput.value);
    if (isNaN(baseDate.getTime())) {
      alert("अमान्य तारीख!");
      return;
    }

    // Days configurations
    let gestationDays = 282; // Cow
    let nextHeatDays = 21;
    let pdDays = 60;

    if (animalType === "BUFFALO") {
      gestationDays = 310;
      nextHeatDays = 21;
    } else if (animalType === "GOAT") {
      gestationDays = 150;
      nextHeatDays = 20;
      pdDays = 45;
    }

    const nextHeat = new Date(baseDate.getTime() + nextHeatDays * 24 * 60 * 60 * 1000);
    const pdCheck = new Date(baseDate.getTime() + pdDays * 24 * 60 * 60 * 1000);
    const calvingDue = new Date(baseDate.getTime() + gestationDays * 24 * 60 * 60 * 1000);

    const dispNext = document.getElementById("dispNextHeatDate");
    const dispPd = document.getElementById("dispPdCheckDate");
    const dispCalv = document.getElementById("dispCalvingDueDate");

    if (dispNext) dispNext.innerText = nextHeat.toLocaleDateString("hi-IN");
    if (dispPd) dispPd.innerText = pdCheck.toLocaleDateString("hi-IN");
    if (dispCalv) dispCalv.innerText = calvingDue.toLocaleDateString("hi-IN");

    if (resultCard) resultCard.classList.remove("hidden");
  }

  function calculateFarmerRation() {
    const weightEl = document.getElementById("feedAnimalWeight");
    const milkEl = document.getElementById("feedDailyMilk");
    const card = document.getElementById("farmerRationResultCard");

    const weight = parseFloat(weightEl ? weightEl.value : 0) || 400;
    const milk = parseFloat(milkEl ? milkEl.value : 0) || 10;

    // Scientific Balanced Ration Equations:
    // Green fodder = 5% of body weight (~20-25 kg for 400-500kg)
    // Dry roughage = 1.25% of body weight (~5-6 kg)
    // Concentrate (Grain) = 1.5 kg (Maintenance) + (Milk in L / 2.5) kg
    const greenFodder = Math.round(weight * 0.055);
    const dryFodder = Math.max(4, Math.round(weight * 0.013));
    const grain = (1.5 + milk / 2.5).toFixed(1);

    const dispGreen = document.getElementById("dispFeedGreen");
    const dispDry = document.getElementById("dispFeedDry");
    const dispGrain = document.getElementById("dispFeedGrain");
    const dispMin = document.getElementById("dispFeedMinerals");

    if (dispGreen) dispGreen.innerText = `${greenFodder} kg`;
    if (dispDry) dispDry.innerText = `${dryFodder} kg`;
    if (dispGrain) dispGrain.innerText = `${grain} kg`;
    if (dispMin) dispMin.innerText = "50-60 ग्राम";

    if (card) card.classList.remove("hidden");
  }

  function calculateDailyMilkIncome() {
    const morning = parseFloat(document.getElementById("milkMorningLiters")?.value || 0) || 0;
    const evening = parseFloat(document.getElementById("milkEveningLiters")?.value || 0) || 0;
    const rate = parseFloat(document.getElementById("milkRatePerLiter")?.value || 0) || 0;

    const totalLiters = (morning + evening).toFixed(1);
    const revenue = Math.round(totalLiters * rate);

    const dispRev = document.getElementById("dispTodayMilkRevenue");
    const dispTot = document.getElementById("dispTotalMilkToday");

    if (dispRev) dispRev.innerText = `₹${revenue.toLocaleString("en-IN")}`;
    if (dispTot) dispTot.innerText = `आज: ${totalLiters} लीटर`;
  }

  function saveDailyMilkRecord() {
    const morning = parseFloat(document.getElementById("milkMorningLiters")?.value || 0) || 0;
    const evening = parseFloat(document.getElementById("milkEveningLiters")?.value || 0) || 0;
    const rate = parseFloat(document.getElementById("milkRatePerLiter")?.value || 0) || 0;
    const total = morning + evening;

    if (total <= 0) {
      alert("कृपया दूध की मात्रा दर्ज करें।");
      return;
    }

    const revenue = Math.round(total * rate);
    const history = JSON.parse(localStorage.getItem("vetcare_milk_history") || "[]");

    history.unshift({
      date: new Date().toLocaleDateString("hi-IN"),
      morning,
      evening,
      total,
      rate,
      revenue
    });

    localStorage.setItem("vetcare_milk_history", JSON.stringify(history));
    renderMilkHistory();
    alert("✅ आज का दूध रिकॉर्ड सुरक्षित किया गया!");
  }

  function renderMilkHistory() {
    const list = document.getElementById("milkHistoryList");
    if (!list) return;

    const history = JSON.parse(localStorage.getItem("vetcare_milk_history") || "[]");
    if (history.length === 0) {
      list.innerHTML = `<p class="text-[11px] text-slate-400 text-center py-2">कोई पिछला दूध रिकॉर्ड नहीं है।</p>`;
      return;
    }

    list.innerHTML = history
      .slice(0, 7)
      .map(
        (h) => `
      <div class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex justify-between items-center text-xs">
        <div>
          <span class="font-bold text-slate-800">${h.date}</span>
          <p class="text-[10px] text-slate-500">सुबह: ${h.morning}L • शाम: ${h.evening}L (कुल: ${h.total}L @ ₹${h.rate})</p>
        </div>
        <strong class="text-emerald-700 font-black">₹${h.revenue}</strong>
      </div>
    `
      )
      .join("");
  }

  /* =========================================================================
     9. MONETIZATION & REAL SBI / PNB DUAL PAYMENT GATEWAY
     ========================================================================= */
  function updatePaymentModalUI() {
    const isSbi = activePaymentBank === "SBI";
    const upiId = isSbi ? AppConfig.sbiUpi : AppConfig.pnbUpi;
    const account = isSbi ? AppConfig.sbiAccount : AppConfig.pnbAccount;
    const ifsc = isSbi ? AppConfig.sbiIfsc : AppConfig.pnbIfsc;

    let price = AppConfig.monthlyPrice;
    if (selectedPlan === "ANNUAL") price = AppConfig.annualPrice;
    if (selectedPlan === "FARMER") price = AppConfig.farmerPrice;

    // Update Elements
    const dispPayee = document.getElementById("dispPayeeName");
    const dispUpi = document.getElementById("dispUPIId");
    const dispAcc = document.getElementById("dispAccountNumber");
    const dispIfsc = document.getElementById("dispIFSC");
    const dispDirectAmt = document.getElementById("directUPIAmount");
    const directLink = document.getElementById("btnDirectUPILink");
    const qrImg = document.getElementById("dynamicQRImage");

    if (dispPayee) dispPayee.innerText = AppConfig.payeeName;
    if (dispUpi) dispUpi.innerText = upiId;
    if (dispAcc) dispAcc.innerText = account;
    if (dispIfsc) dispIfsc.innerText = ifsc;
    if (dispDirectAmt) dispDirectAmt.innerText = price;

    // Standardized UPI Intent Payload
    const payeeEncoded = encodeURIComponent(AppConfig.payeeName);
    const upiPayload = `upi://pay?pa=${upiId}&pn=${payeeEncoded}&am=${price}&cu=INR&tn=VetcarePremium`;

    if (directLink) directLink.href = upiPayload;

    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiPayload)}`;
    }
  }

  function selectPaymentPlan(plan) {
    selectedPlan = plan;
    const btnM = document.getElementById("btnPlanMonthly");
    const btnA = document.getElementById("btnPlanAnnual");

    if (plan === "MONTHLY") {
      if (btnM) btnM.className = "py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center transition";
      if (btnA) btnA.className = "py-2.5 rounded-xl text-slate-700 font-medium text-center transition";
    } else {
      if (btnA) btnA.className = "py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center transition";
      if (btnM) btnM.className = "py-2.5 rounded-xl text-slate-700 font-medium text-center transition";
    }

    updatePaymentModalUI();
  }

  function switchPaymentBank(bank) {
    activePaymentBank = bank;
    const btnS = document.getElementById("btnTabSBI");
    const btnP = document.getElementById("btnTabPNB");

    if (bank === "SBI") {
      if (btnS) btnS.className = "flex-1 py-2.5 font-bold bg-blue-50 text-blue-700 text-center transition";
      if (btnP) btnP.className = "flex-1 py-2.5 font-medium bg-slate-50 text-slate-600 text-center transition";
    } else {
      if (btnP) btnP.className = "flex-1 py-2.5 font-bold bg-amber-50 text-amber-700 text-center transition";
      if (btnS) btnS.className = "flex-1 py-2.5 font-medium bg-slate-50 text-slate-600 text-center transition";
    }

    updatePaymentModalUI();
  }

  function openPaymentTicketSubmission() {
    window.closePaymentModal();
    window.openHelpModal();
    const sel = document.getElementById("ticketCategory");
    if (sel) sel.value = "PAYMENT_UTR";
  }

  /* =========================================================================
     10. MASTER ADMIN ENGINE (PIN: 9297) & PRIVATE TICKET DESK
     ========================================================================= */
  function verifyAdminPIN() {
    const pinInput = document.getElementById("inputAdminPIN");
    const errMsg = document.getElementById("pinErrorMessage");
    const pin = (pinInput ? pinInput.value : "").trim();

    if (pin === MASTER_PIN) {
      window.closeAdminPinModal();
      openAdminDashboard();
    } else {
      if (errMsg) errMsg.classList.remove("hidden");
      if (pinInput) pinInput.value = "";
    }
  }

  function openAdminDashboard() {
    const modal = document.getElementById("modalAdminDashboard");
    if (modal) modal.style.display = "flex";

    // Populate current configurations in fields
    const map = {
      cfgPayeeName: AppConfig.payeeName,
      cfgMonthlyPrice: AppConfig.monthlyPrice,
      cfgAnnualPrice: AppConfig.annualPrice,
      cfgSbiUpi: AppConfig.sbiUpi,
      cfgSbiAccount: AppConfig.sbiAccount,
      cfgSbiIfsc: AppConfig.sbiIfsc,
      cfgPnbUpi: AppConfig.pnbUpi,
      cfgPnbAccount: AppConfig.pnbAccount,
      cfgPnbIfsc: AppConfig.pnbIfsc,
      cfgAppTitle: AppConfig.appTitle,
      cfgAppTagline: AppConfig.appTagline
    };

    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = map[id];
    });

    renderAdminTicketsInbox();
  }

  function closeAdminDashboard() {
    const modal = document.getElementById("modalAdminDashboard");
    if (modal) modal.style.display = "none";
  }

  function switchAdminSubTab(tab) {
    const pPay = document.getElementById("adminPanelPayment");
    const pBrand = document.getElementById("adminPanelBranding");
    const pTick = document.getElementById("adminPanelTickets");

    const bPay = document.getElementById("tabBtnAdminPay");
    const bBrand = document.getElementById("tabBtnAdminBrand");
    const bTick = document.getElementById("tabBtnAdminTickets");

    [pPay, pBrand, pTick].forEach((p) => p && p.classList.add("hidden"));
    [bPay, bBrand, bTick].forEach((b) => {
      if (b) b.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0";
    });

    if (tab === "PAYMENT") {
      if (pPay) pPay.classList.remove("hidden");
      if (bPay) bPay.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    } else if (tab === "BRANDING") {
      if (pBrand) pBrand.classList.remove("hidden");
      if (bBrand) bBrand.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    } else if (tab === "TICKETS") {
      if (pTick) pTick.classList.remove("hidden");
      if (bTick) bTick.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
      renderAdminTicketsInbox();
    }
  }

  function saveAllMasterAdminSettings() {
    AppConfig.payeeName = document.getElementById("cfgPayeeName")?.value || AppConfig.payeeName;
    AppConfig.monthlyPrice = parseFloat(document.getElementById("cfgMonthlyPrice")?.value) || AppConfig.monthlyPrice;
    AppConfig.annualPrice = parseFloat(document.getElementById("cfgAnnualPrice")?.value) || AppConfig.annualPrice;

    AppConfig.sbiUpi = document.getElementById("cfgSbiUpi")?.value || AppConfig.sbiUpi;
    AppConfig.sbiAccount = document.getElementById("cfgSbiAccount")?.value || AppConfig.sbiAccount;
    AppConfig.sbiIfsc = document.getElementById("cfgSbiIfsc")?.value || AppConfig.sbiIfsc;

    AppConfig.pnbUpi = document.getElementById("cfgPnbUpi")?.value || AppConfig.pnbUpi;
    AppConfig.pnbAccount = document.getElementById("cfgPnbAccount")?.value || AppConfig.pnbAccount;
    AppConfig.pnbIfsc = document.getElementById("cfgPnbIfsc")?.value || AppConfig.pnbIfsc;

    AppConfig.appTitle = document.getElementById("cfgAppTitle")?.value || AppConfig.appTitle;
    AppConfig.appTagline = document.getElementById("cfgAppTagline")?.value || AppConfig.appTagline;

    saveConfigToStorage();

    // Instant DOM Live Updates without reload
    const appHeadTitle = document.getElementById("appHeaderTitle");
    const gateTitle = document.getElementById("gatewayAppTitle");
    const gateTagline = document.getElementById("gatewayTagline");
    const pageTitle = document.getElementById("pageTitleTag");

    if (appHeadTitle) appHeadTitle.innerText = AppConfig.appTitle;
    if (gateTitle) gateTitle.innerText = AppConfig.appTitle;
    if (gateTagline) gateTagline.innerText = AppConfig.appTagline;
    if (pageTitle) pageTitle.innerText = `${AppConfig.appTitle} | Clinical Assistant`;

    updatePaymentModalUI();
    alert("✅ सुपर एडमिन सेटिंग्स सफलतापूर्वक अपडेट की गईं!");
    closeAdminDashboard();
  }

  // Support Tickets System (Zero Public Exposure)
  function submitSupportTicket() {
    const name = (document.getElementById("ticketSenderName")?.value || "").trim();
    const phone = (document.getElementById("ticketSenderPhone")?.value || "").trim();
    const category = document.getElementById("ticketCategory")?.value || "OTHER";
    const message = (document.getElementById("ticketMessage")?.value || "").trim();

    if (!name || !phone || !message) {
      alert("कृपया नाम, फोन व अपनी समस्या का विवरण पूरा लिखें।");
      return;
    }

    const tickets = getTickets();
    tickets.unshift({
      id: "TCK_" + Date.now(),
      date: new Date().toLocaleDateString("hi-IN") + " " + new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" }),
      name,
      phone,
      category,
      message,
      resolved: false
    });

    saveTickets(tickets);

    // Reset and close
    document.getElementById("ticketSenderName").value = "";
    document.getElementById("ticketSenderPhone").value = "";
    document.getElementById("ticketMessage").value = "";
    window.closeHelpModal();

    alert("✅ आपका टिकट सफलतापूर्वक दर्ज हो गया है! एडमिन द्वारा सत्यापन पश्चात सेवा सक्रिय कर दी जाएगी।");
  }

  function renderAdminTicketsInbox() {
    const container = document.getElementById("adminTicketsContainer");
    const badge = document.getElementById("badgeTicketCount");
    const tickets = getTickets();

    if (badge) badge.innerText = tickets.filter((t) => !t.resolved).length;
    if (!container) return;

    if (tickets.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center text-slate-400 text-xs font-bold bg-slate-50 border border-slate-200 rounded-2xl">
          इनबॉक्स में कोई नया सपोर्ट टिकट नहीं है।
        </div>
      `;
      return;
    }

    container.innerHTML = tickets
      .map(
        (t) => `
      <div class="p-3.5 bg-slate-50 border ${t.resolved ? "border-slate-200 opacity-60" : "border-blue-200 bg-blue-50/30"} rounded-2xl space-y-1.5 text-xs">
        <div class="flex justify-between items-center">
          <div>
            <strong class="text-slate-900 font-bold">${t.name}</strong> 
            <span class="text-blue-700 font-mono font-bold">(${t.phone})</span>
            <span class="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.2 rounded ml-1 font-semibold">${t.category}</span>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${t.date}</span>
        </div>
        <p class="text-slate-700 font-medium">${t.message}</p>
        <div class="flex justify-end gap-2 pt-1 border-t border-slate-200">
          ${
            !t.resolved
              ? `
            <button onclick="resolveTicket('${t.id}')" class="text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg transition">
              ✓ हल हो गया (Resolve)
            </button>
          `
              : '<span class="text-[11px] text-emerald-700 font-bold">✓ हल किया जा चुका है</span>'
          }
          <button onclick="deleteTicket('${t.id}')" class="text-[11px] text-rose-600 hover:underline">
            डिलीट
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  function resolveTicket(ticketId) {
    let tickets = getTickets();
    const t = tickets.find((x) => x.id === ticketId);
    if (t) {
      t.resolved = true;
      saveTickets(tickets);
      renderAdminTicketsInbox();
    }
  }

  function deleteTicket(ticketId) {
    let tickets = getTickets().filter((x) => x.id !== ticketId);
    saveTickets(tickets);
    renderAdminTicketsInbox();
  }

  function clearAllSupportTickets() {
    if (!confirm("क्या आप सभी टिकट्स साफ करना चाहते हैं?")) return;
    saveTickets([]);
    renderAdminTicketsInbox();
  }

  function saveGeminiKey() {
    const input = document.getElementById("inputGeminiKey");
    const key = (input ? input.value : "").trim();
    if (key) {
      AppConfig.geminiKey = key;
      saveConfigToStorage();
      alert("✅ Gemini API Key सुरक्षित कर ली गई!");
    }
    window.closeAIKeyModal();
  }

  /* =========================================================================
     11. TOP-LEVEL GLOBAL WINDOW BINDINGS (ZERO REFERENCE ERRORS)
     ========================================================================= */
  window.VetcareApp = {
    selectRole,
    handleGoBack
  };

  // Direct Window Bindings
  window.selectRole = selectRole;
  window.confirmDoctorRole = function () {
    window.closeDoctorDeclarationModal();
    selectRole("DOCTOR");
  };
  window.switchTab = switchTab;
  window.goBack = handleGoBack;
  window.setDiagnosisMode = setDiagnosisMode;
  window.toggleMatrixParam = toggleMatrixParam;
  window.handleCardinalChange = handleCardinalChange;
  window.resetSymptomMatrix = resetSymptomMatrix;
  window.handleUnifiedSearch = handleUnifiedSearch;
  window.filterDirectoryCategory = filterDirectoryCategory;
  window.toggleDiseaseDetail = toggleDiseaseDetail;
  window.autoFillOPDFromDisease = autoFillOPDFromDisease;
  window.checkRxPregnancyConflict = checkRxPregnancyConflict;

  // Smart Field Utilities
  window.calculateShaefferWeight = calculateShaefferWeight;
  window.setWeightPreset = setWeightPreset;

  // Digital OPD
  window.setOpdWorkflow = setOpdWorkflow;
  window.calculateRxDue = calculateRxDue;
  window.clearRxField = clearRxField;
  window.captureCurrentGPS = captureCurrentGPS;
  window.dispatchWhatsAppRx = dispatchWhatsAppRx;
  window.printCurrentOPDSlip = printCurrentOPDSlip;
  window.saveCurrentOPDOffline = saveCurrentOPDOffline;
  window.renderFilteredRecords = renderFilteredRecords;
  window.deleteOPDRecord = deleteOPDRecord;

  // Khata & Stock
  window.openNewKhataModal = openNewKhataModal;
  window.closeNewKhataModal = closeNewKhataModal;
  window.saveNewKhataRecord = saveNewKhataRecord;
  window.sendWhatsAppPaymentTagada = sendWhatsAppPaymentTagada;
  window.deleteKhataItem = deleteKhataItem;
  window.filterInventoryCategory = filterInventoryCategory;
  window.updateStock = updateStock;
  window.openNewInventoryItemModal = openNewInventoryItemModal;
  window.closeNewInventoryModal = closeNewInventoryModal;
  window.saveNewInventoryItem = saveNewInventoryItem;

  // Farmer Calculators
  window.calculateBreedingDates = calculateBreedingDates;
  window.calculateFarmerRation = calculateFarmerRation;
  window.calculateDailyMilkIncome = calculateDailyMilkIncome;
  window.saveDailyMilkRecord = saveDailyMilkRecord;

  // Monetization & Modals
  window.selectPaymentPlan = selectPaymentPlan;
  window.switchPaymentBank = switchPaymentBank;
  window.openPaymentTicketSubmission = openPaymentTicketSubmission;

  // Master Admin
  window.verifyAdminPIN = verifyAdminPIN;
  window.openAdminDashboard = openAdminDashboard;
  window.closeAdminDashboard = closeAdminDashboard;
  window.switchAdminSubTab = switchAdminSubTab;
  window.saveAllMasterAdminSettings = saveAllMasterAdminSettings;
  window.submitSupportTicket = submitSupportTicket;
  window.resolveTicket = resolveTicket;
  window.deleteTicket = deleteTicket;
  window.clearAllSupportTickets = clearAllSupportTickets;
  window.saveGeminiKey = saveGeminiKey;

  /* =========================================================================
     12. DOM READY BOOTSTRAPPER
     ========================================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    loadStoredConfig();
    updatePaymentModalUI();
    renderMilkHistory();

    // Check for queued role from early clicks before app.js parsed
    if (window._queuedRole) {
      selectRole(window._queuedRole);
      delete window._queuedRole;
    } else {
      // Default: evaluate database if disease results container exists
      runWeightedMatrixEvaluation();
    }
  });
})();
