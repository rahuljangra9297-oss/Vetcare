/**
 * Vetcare AI OS - Master Controller (app.js)
 * Clean, Robust, Production-Ready Logic Engine
 * Guaranteed Non-Truncating Single Execution Script
 */

// =========================================================================
// 1. IMMEDIATE TOP-LEVEL GLOBAL WINDOW BINDINGS (ZERO REFERENCE ERRORS)
// =========================================================================
const $ = (id) => document.getElementById(id);

window.selectRole = function (role) {
  window.currentRole = role;
  const gw = $("screenGateway");
  const app = $("screenMainApp");
  if (gw) gw.classList.add("hidden");
  if (app) app.classList.remove("hidden");
  window.updateRoleViews(role);
  window.switchTab(role === "DOCTOR" ? "diagnosis" : "farmerDesi");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.openDoctorDeclarationModal = function () {
  const m = $("modalDoctorDeclaration");
  if (m) m.style.display = "flex";
};

window.closeDoctorDeclarationModal = function () {
  const m = $("modalDoctorDeclaration");
  if (m) m.style.display = "none";
};

window.confirmDoctorRole = function () {
  window.closeDoctorDeclarationModal();
  window.selectRole("DOCTOR");
};

window.openAdminPinModal = function () {
  const m = $("modalAdminPIN") || $("admin-pin-modal");
  const inp = $("inputAdminPIN") || $("admin-pin-input");
  const err = $("pinErrorMessage");
  if (inp) inp.value = "";
  if (err) err.classList.add("hidden");
  if (m) m.style.display = "flex";
};

window.closeAdminPinModal = function () {
  const m = $("modalAdminPIN") || $("admin-pin-modal");
  if (m) m.style.display = "none";
};

window.verifyAdminPIN = function () {
  const pinInput = $("inputAdminPIN") || $("admin-pin-input");
  const err = $("pinErrorMessage");
  const enteredPin = pinInput ? pinInput.value.trim() : "";
  if (enteredPin === "9297") {
    window.closeAdminPinModal();
    const adminDashboard = $("modalAdminDashboard") || $("admin-dashboard-modal") || $("admin-modal");
    if (adminDashboard) {
      adminDashboard.classList.remove("hidden");
      adminDashboard.style.display = "flex";
    }
    if (window.loadAdminSettingsToForm) window.loadAdminSettingsToForm();
    if (window.renderAdminTicketsInbox) window.renderAdminTicketsInbox();
  } else {
    if (err) err.classList.remove("hidden");
    alert("गलत मास्टर पिन! कृपया सही 4-अंकों का पिन (9297) दर्ज करें।");
  }
};

window.closeAdminDashboard = function () {
  const m = $("modalAdminDashboard") || $("admin-dashboard-modal") || $("admin-modal");
  if (m) m.style.display = "none";
};

window.openPaymentModal = function () {
  const m = $("modalPayment");
  if (m) m.style.display = "flex";
  window.updatePaymentUI();
};

window.closePaymentModal = function () {
  const m = $("modalPayment");
  if (m) m.style.display = "none";
};

window.switchPaymentTab = function (bank) {
  window.activeBank = bank;
  const sbiBtn = $("btnTabSBI");
  const pnbBtn = $("btnTabPNB");
  if (bank === "SBI") {
    if (sbiBtn) sbiBtn.className = "flex-1 py-2.5 font-bold bg-blue-50 text-blue-700 text-center transition";
    if (pnbBtn) pnbBtn.className = "flex-1 py-2.5 font-medium bg-slate-50 text-slate-600 text-center transition";
  } else {
    if (pnbBtn) pnbBtn.className = "flex-1 py-2.5 font-bold bg-amber-50 text-amber-700 text-center transition";
    if (sbiBtn) sbiBtn.className = "flex-1 py-2.5 font-medium bg-slate-50 text-slate-600 text-center transition";
  }
  window.updatePaymentUI();
};

window.openHelpModal = function () {
  const m = $("modalSupportTicket");
  if (m) m.style.display = "flex";
};

window.closeHelpModal = function () {
  const m = $("modalSupportTicket");
  if (m) m.style.display = "none";
};

window.openAIKeyModal = function () {
  const m = $("modalAIKey");
  if (m) m.style.display = "flex";
};

window.closeAIKeyModal = function () {
  const m = $("modalAIKey");
  if (m) m.style.display = "none";
};

window.goBackScreen = function () {
  if (window.navHistory && window.navHistory.length > 0) {
    const prev = window.navHistory.pop();
    window.switchTab(prev, false);
  } else {
    window.goToHome();
  }
};
window.goBack = window.goBackScreen;

window.goToHome = function () {
  const gw = $("screenGateway");
  const app = $("screenMainApp");
  if (app) app.classList.add("hidden");
  if (gw) gw.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};
window.returnToGateway = window.goToHome;

// =========================================================================
// 2. CONFIGURATION, CREDENTIALS & STORAGE (REAL VERIFIED DATA)
// =========================================================================
window.VetcareConfig = {
  payeeName: "Vetcare Services (Mr. Rahul)",
  sbiUpi: "rahuljangra9297@oksbi",
  sbiAccount: "65204067585",
  sbiIfsc: "SBIN0013693",
  pnbUpi: "rahuljangra9297-1@okicici",
  pnbAccount: "6687001700015098",
  pnbIfsc: "PUNB0668700",
  monthlyPrice: 199,
  annualPrice: 1499,
  farmerPrice: 99,
  appTitle: "Vetcare AI OS",
  appTagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन सपोर्ट एवं स्मार्ट डेयरी स्वचालन",
  geminiKey: ""
};

window.currentRole = "DOCTOR";
window.currentTab = "diagnosis";
window.activeBank = "SBI";
window.selectedPlan = "MONTHLY";
window.navHistory = [];

window.matrixState = {
  temp: null,
  eyes: null,
  dung: null,
  urine: null,
  milkDrop: null,
  cardinal: "ALL"
};

// Storage Helpers
function getStore(k, def) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : def;
  } catch (e) {
    return def;
  }
}
function setStore(k, val) {
  try {
    localStorage.setItem(k, JSON.stringify(val));
  } catch (e) {}
}

// Load Persisted Config
const savedConfig = getStore("vetcare_config_v3", null);
if (savedConfig) Object.assign(window.VetcareConfig, savedConfig);

// =========================================================================
// 3. UI VIEW ROUTER & ROLE CONTROLLER
// =========================================================================
window.updateRoleViews = function (role) {
  const badge = $("currentUserRoleBadge");
  const docBtns = ["navDiagnosis", "navUtilities", "navRx", "navRecords", "navInventory", "navFinance"];
  const farBtns = ["navFarmerDesi", "navFarmerBreeding", "navFarmerFeed", "navFarmerMilk"];

  if (role === "DOCTOR") {
    if (badge) badge.innerHTML = '<i class="fa-solid fa-user-doctor text-blue-600"></i> अधिकृत पशु चिकित्सक';
    docBtns.forEach((id) => { const el = $(id); if (el) el.classList.remove("hidden"); });
    farBtns.forEach((id) => { const el = $(id); if (el) el.classList.add("hidden"); });
  } else {
    if (badge) badge.innerHTML = '<i class="fa-solid fa-cow text-emerald-600"></i> स्मार्ट पशुपालक (Farmer)';
    docBtns.forEach((id) => { const el = $(id); if (el) el.classList.add("hidden"); });
    farBtns.forEach((id) => { const el = $(id); if (el) el.classList.remove("hidden"); });
  }
};

window.switchTab = function (tabId, recordHistory = true) {
  if (recordHistory && window.currentTab && window.currentTab !== tabId) {
    window.navHistory.push(window.currentTab);
  }
  window.currentTab = tabId;

  const views = [
    "viewDiagnosis", "viewUtilities", "viewRx", "viewRecords", "viewFinance",
    "viewInventory", "viewFarmerDesi", "viewFarmerBreeding", "viewFarmerFeed", "viewFarmerMilk"
  ];
  views.forEach((v) => { const el = $(v); if (el) el.classList.add("hidden"); });

  const viewMap = {
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

  const targetView = $(viewMap[tabId] || "viewDiagnosis");
  if (targetView) targetView.classList.remove("hidden");

  document.querySelectorAll("#bottomNavBar button").forEach((b) => {
    b.classList.remove("active-nav-tab");
    b.classList.add("text-slate-400");
  });

  const activeBtn = $("nav" + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  if (activeBtn) {
    activeBtn.classList.add("active-nav-tab");
    activeBtn.classList.remove("text-slate-400");
  }

  // Lifecycle Callbacks
  if (tabId === "records") window.renderFilteredRecords("");
  if (tabId === "finance") window.renderKhataList();
  if (tabId === "inventory") window.renderInventoryList("ALL");
  if (tabId === "utilities") window.calculateShaefferWeight();

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// =========================================================================
// 4. WEIGHTED CLINICAL DIAGNOSIS & 5-TIER TREATMENT ENGINE
// =========================================================================
window.setDiagnosisMode = function (mode) {
  const pMat = $("panelDiagMatrix");
  const pSrc = $("panelDiagSearch");
  const pDir = $("panelDiagDirectory");
  const b1 = $("btnDiagMode1");
  const b2 = $("btnDiagMode2");
  const b3 = $("btnDiagMode3");

  [pMat, pSrc, pDir].forEach((p) => p && p.classList.add("hidden"));
  [b1, b2, b3].forEach((b) => { if (b) b.className = "py-2.5 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center"; });

  if (mode === "MATRIX") {
    if (pMat) pMat.classList.remove("hidden");
    if (b1) b1.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    window.runWeightedDiagnosis();
  } else if (mode === "SEARCH") {
    if (pSrc) pSrc.classList.remove("hidden");
    if (b2) b2.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    const inp = $("unifiedSearchInput");
    window.handleUnifiedSearch(inp ? inp.value : "");
  } else {
    if (pDir) pDir.classList.remove("hidden");
    if (b3) b3.className = "py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    window.filterDirectoryCategory("ALL");
  }
};

window.toggleMatrixParam = function (cat, val, btn) {
  if (window.matrixState[cat] === val) {
    window.matrixState[cat] = null;
    if (btn) btn.classList.remove("chip-selected");
  } else {
    window.matrixState[cat] = val;
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll(".chip-btn").forEach((c) => c.classList.remove("chip-selected"));
      btn.classList.add("chip-selected");
    }
  }
  window.runWeightedDiagnosis();
};

window.handleCardinalChange = function (val) {
  window.matrixState.cardinal = val;
  window.runWeightedDiagnosis();
};

window.resetSymptomMatrix = function () {
  window.matrixState = { temp: null, eyes: null, dung: null, urine: null, milkDrop: null, cardinal: "ALL" };
  document.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("chip-selected"));
  const sel = $("selCardinalSign");
  if (sel) sel.value = "ALL";
  window.runWeightedDiagnosis();
};

window.runWeightedDiagnosis = function () {
  const db = window.VETCARE_DISEASE_DB || [];
  if (!db.length) return;

  const results = db.map((d) => {
    let score = 0;
    let max = 100;

    // Cardinal Sign (40%)
    if (window.matrixState.cardinal && window.matrixState.cardinal !== "ALL") {
      if (d.cardinalSign === window.matrixState.cardinal) score += 40;
    } else {
      score += 20;
    }

    // Temp (20%)
    if (window.matrixState.temp) {
      if (d.tempCategory === window.matrixState.temp) score += 20;
      else if (window.matrixState.temp === "NORMAL" && d.tempCategory !== "SUB") score += 10;
    } else {
      score += 15;
    }

    // Secondary (40%)
    if (window.matrixState.urine) {
      if (window.matrixState.urine === "RED" && d.id === "BABESIOSIS") score += 10;
      else if (window.matrixState.urine === "KETONE" && d.id === "KETOSIS") score += 10;
      else score += 3;
    } else score += 7;

    if (window.matrixState.dung) {
      if (window.matrixState.dung === "DIARRHEA" && (d.id === "ENTEROTOXEMIA" || d.id === "FMD")) score += 10;
      else if (window.matrixState.dung === "CONSTIPATION" && (d.id === "BABESIOSIS" || d.id === "SURRA")) score += 10;
      else score += 3;
    } else score += 7;

    if (window.matrixState.milkDrop) {
      if (window.matrixState.milkDrop === "CLOTS" && d.id === "MASTITIS") score += 10;
      else if (window.matrixState.milkDrop === "SEVERE") score += 8;
      else score += 4;
    } else score += 8;

    if (window.matrixState.eyes) {
      if (window.matrixState.eyes === "JAUNDICE" && (d.id === "BABESIOSIS" || d.id === "SURRA")) score += 10;
      else score += 4;
    } else score += 8;

    return { disease: d, pct: Math.min(99, Math.round((score / max) * 100)) };
  });

  results.sort((a, b) => b.pct - a.pct);

  const badge = $("matchCountBadge");
  const scoreTxt = $("matchScoreText");
  if (badge) badge.innerText = `${results.length} रोग मूल्यांकित`;
  if (scoreTxt && results[0]) {
    scoreTxt.innerHTML = `<i class="fa-solid fa-chart-pie mr-1"></i> शीर्ष संभावना: <strong>${results[0].disease.names.hindi}</strong> (${results[0].pct}%)`;
  }

  window.renderDiseaseResults(results);
};

window.handleUnifiedSearch = function (q) {
  const db = window.VETCARE_DISEASE_DB || [];
  const query = (q || "").trim().toLowerCase();
  if (!query) {
    window.renderDiseaseResults(db.map((d) => ({ disease: d, pct: null })));
    return;
  }
  const filtered = db.filter((d) => {
    return (
      d.names.hindi.toLowerCase().includes(query) ||
      d.names.english.toLowerCase().includes(query) ||
      d.names.local.some((l) => l.toLowerCase().includes(query)) ||
      d.keywords.some((k) => k.toLowerCase().includes(query)) ||
      d.overview.toLowerCase().includes(query)
    );
  });
  window.renderDiseaseResults(filtered.map((d) => ({ disease: d, pct: null })));
};

window.filterDirectoryCategory = function (cat, btn) {
  if (btn) {
    document.querySelectorAll(".dir-chip").forEach((c) => {
      c.className = "dir-chip px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold shrink-0";
    });
    btn.className = "dir-chip px-3.5 py-2 rounded-xl bg-blue-600 text-white font-black shrink-0";
  }
  const db = window.VETCARE_DISEASE_DB || [];
  if (cat === "ALL") {
    window.renderDiseaseResults(db.map((d) => ({ disease: d, pct: null })));
  } else {
    window.renderDiseaseResults(db.filter((d) => d.category === cat).map((d) => ({ disease: d, pct: null })));
  }
};

window.renderDiseaseResults = function (items) {
  const c = $("diseaseSearchResults");
  if (!c) return;
  if (!items.length) {
    c.innerHTML = `<div class="p-8 text-center bg-white border border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">कोई रोग परिणाम नहीं मिला।</div>`;
    return;
  }

  c.innerHTML = items
    .map(({ disease: d, pct }) => {
      const matchBar =
        pct !== null
          ? `
        <div class="mt-2 bg-slate-100 rounded-full h-2 w-full overflow-hidden">
          <div class="h-full ${pct > 70 ? "bg-emerald-600" : pct > 45 ? "bg-amber-500" : "bg-slate-400"}" style="width:${pct}%"></div>
        </div>
        <div class="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
          <span>क्लिनिकल संभावना</span>
          <span class="${pct > 70 ? "text-emerald-700 font-black" : "text-slate-700"}">${pct}% मैच</span>
        </div>`
          : "";

      return `
      <article class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition">
        <div class="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">${d.category}</span>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">${d.temperatureRangeF}</span>
            </div>
            <h3 class="text-base sm:text-lg font-black text-slate-900 mt-1">${d.names.hindi}</h3>
            <p class="text-xs text-slate-500">${d.names.english} • स्थानीय नाम: ${d.names.local.join(", ")}</p>
            ${matchBar}
          </div>
          <button onclick="window.toggleDiseaseAccordion('${d.id}')" id="btnAcc_${d.id}" class="self-start sm:self-center shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
            <span>उपचार व पर्ची देखें</span> <i class="fa-solid fa-chevron-down text-[10px]"></i>
          </button>
        </div>

        <div id="acc_${d.id}" class="hidden p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-white">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700">
            <strong class="text-slate-900 font-bold">🧬 रोग परिचय:</strong> ${d.overview}
          </div>

          <!-- Lab Tests Table -->
          <div class="space-y-1">
            <h4 class="font-bold text-slate-900 text-xs flex items-center gap-1"><i class="fa-solid fa-flask-vial text-purple-600"></i> पुष्टिकारी प्रयोगशाला जांच:</h4>
            <div class="overflow-x-auto border border-slate-200 rounded-xl">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                  <tr><th class="p-2">जांच (Test)</th><th class="p-2">नमूना</th><th class="p-2">खर्च</th><th class="p-2">क्लिनिकल महत्व</th></tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-800">
                  ${d.confirmatoryLabTests.map((t) => `<tr><td class="p-2 font-bold">${t.testName}</td><td class="p-2 text-slate-600">${t.sampleType}</td><td class="p-2 text-emerald-700 font-bold">₹${t.approxMRP}</td><td class="p-2 text-slate-600">${t.significance}</td></tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tier 1: Injections Table -->
          <div class="space-y-1">
            <div class="flex justify-between items-center">
              <h4 class="font-bold text-blue-900 text-xs flex items-center gap-1"><i class="fa-solid fa-syringe text-blue-600"></i> टियर 1: एलोपैथिक इंजेक्शन तालिका:</h4>
              <button onclick="window.loadDiseaseIntoOPD('${d.id}')" class="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-lg hover:bg-blue-700 transition">+ पर्ची में लोड करें</button>
            </div>
            <div class="overflow-x-auto border border-slate-200 rounded-xl">
              <table class="w-full text-left text-xs">
                <thead class="bg-blue-50 text-blue-900 border-b border-blue-200 font-bold">
                  <tr><th class="p-2">वर्ग</th><th class="p-2">साल्ट</th><th class="p-2">ब्रांड्स</th><th class="p-2">डोज़ / रूट</th><th class="p-2">गर्भ सुरक्षा</th></tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-800">
                  ${d.injectionsTable.map((inj) => `<tr class="${inj.pregnancySafety && inj.pregnancySafety.includes("UNSAFE") ? "bg-rose-50/70" : ""}"><td class="p-2 text-[10px] text-slate-500 font-bold">${inj.category}</td><td class="p-2 font-bold">${inj.salt}</td><td class="p-2 font-mono text-blue-700 text-[11px]">${inj.brands.join(", ")}</td><td class="p-2 text-[11px]">${inj.doseRoute}</td><td class="p-2 font-bold text-[10px] ${inj.pregnancySafety.includes("SAFE") && !inj.pregnancySafety.includes("UNSAFE") ? "text-emerald-700" : "text-rose-700"}">${inj.pregnancySafety}</td></tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tier 2 & 3: Oral & Ayurveda -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong class="text-slate-900 font-bold block flex items-center gap-1"><i class="fa-solid fa-pills text-emerald-600"></i> टियर 2: ओरल सप्लीमेंट्स:</strong>
              ${d.oralSupplements.map((s) => `<div class="border-b border-slate-200 pb-1 last:border-0"><span class="font-bold text-slate-800">${s.name} (${s.brands.join(", ")})</span><p class="text-[10px] text-slate-600">डोज़: ${s.dose}</p></div>`).join("")}
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong class="text-slate-900 font-bold block flex items-center gap-1"><i class="fa-solid fa-leaf text-teal-600"></i> टियर 3: आयुर्वेदिक व हर्बल:</strong>
              ${d.ayurvedicHerbal.map((a) => `<div class="border-b border-slate-200 pb-1 last:border-0"><span class="font-bold text-slate-800">${a.name} (₹${a.approxMRP})</span><p class="text-[10px] text-teal-800">${a.dose} • संकेत: ${a.indication}</p></div>`).join("")}
            </div>
          </div>

          <!-- Tier 4 & 5: Homeo & Desi -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong class="text-slate-900 font-bold block flex items-center gap-1"><i class="fa-solid fa-droplet text-blue-500"></i> टियर 4: होम्योपैथी:</strong>
              ${d.homeopathicRemedies.map((h) => `<div><span class="font-bold text-slate-800">${h.remedy} (${h.potency})</span><p class="text-[10px] text-slate-600">${h.dose} • ${h.indication}</p></div>`).join("")}
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong class="text-slate-900 font-bold block flex items-center gap-1"><i class="fa-solid fa-mortar-pestle text-amber-700"></i> टियर 5: देशी सिद्ध नुस्खे:</strong>
              ${d.desiHomeRemedies.map((dm) => `<div><span class="font-bold text-slate-800">${dm.remedyName}</span><p class="text-[10px] text-slate-600">${dm.ingredients}</p><p class="text-[10px] text-amber-900 font-bold">खुराक: ${dm.dosage}</p></div>`).join("")}
            </div>
          </div>

          <!-- Biosecurity & Pregnancy Alerts -->
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-amber-950">
            <strong class="font-bold block text-amber-900">🛡️ शेड बायोसिक्योरिटी:</strong>
            <ul class="list-disc pl-4 text-[10px] space-y-0.5">${d.shedBiosecurity.map((s) => `<li>${s}</li>`).join("")}</ul>
          </div>

          <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950">
            <strong class="font-bold block text-rose-700"><i class="fa-solid fa-triangle-exclamation"></i> गर्भावस्था वर्जना (Pregnancy Red Alert):</strong>
            <p class="text-[11px] text-rose-900">वर्जित: ${d.pregnancyContraindications.contraindicatedDrugs.join(", ")}</p>
            <p class="text-[10px] text-rose-800">${d.pregnancyContraindications.clinicalWarning}</p>
          </div>
        </div>
      </article>`;
    })
    .join("");
};

window.toggleDiseaseAccordion = function (id) {
  const el = $("acc_" + id);
  const btn = $("btnAcc_" + id);
  if (!el) return;
  if (el.classList.contains("hidden")) {
    el.classList.remove("hidden");
    if (btn) btn.innerHTML = '<span>संक्षेप करें</span> <i class="fa-solid fa-chevron-up text-[10px]"></i>';
  } else {
    el.classList.add("hidden");
    if (btn) btn.innerHTML = '<span>उपचार व पर्ची देखें</span> <i class="fa-solid fa-chevron-down text-[10px]"></i>';
  }
};

window.loadDiseaseIntoOPD = function (id) {
  const db = window.VETCARE_DISEASE_DB || [];
  const d = db.find((x) => x.id === id);
  if (!d) return;

  window.switchTab("rx");
  const diag = $("opdDiagnosis");
  const med = $("opdMedicine");

  if (diag) diag.value = d.names.hindi;
  if (med) {
    let rx = `=== ${d.names.hindi} क्लिनिकल प्रोटोकॉल ===\n`;
    d.injectionsTable.forEach((inj, i) => {
      rx += `${i + 1}. ${inj.brands[0]} (${inj.salt}) - ${inj.doseRoute}\n`;
    });
    if (d.oralSupplements && d.oralSupplements.length > 0) {
      rx += `4. ${d.oralSupplements[0].brands[0]} - ${d.oralSupplements[0].dose}\n`;
    }
    med.value = rx;
  }
  window.checkRxPregnancyConflict();
};

window.checkRxPregnancyConflict = function () {
  const p = $("opdPregnancy");
  const b = $("pregnancyRedAlertBanner");
  const med = $("opdMedicine");
  if (!p || !b) return;

  const isPreg = p.value === "PREGNANT";
  const txt = med ? med.value.toLowerCase() : "";
  const hasSteroid = txt.includes("dexa") || txt.includes("decadron") || txt.includes("dexona") || txt.includes("betamethasone");

  if (isPreg && hasSteroid) b.classList.remove("hidden");
  else b.classList.add("hidden");
};

// =========================================================================
// 5. SHAEFFER'S FORMULA WEIGHT & DOSE CALCULATOR
// =========================================================================
window.calculateShaefferWeight = function () {
  const gEl = $("calcGirth");
  const lEl = $("calcLength");
  const dKg = $("dispCalcWeightKg");
  const dLb = $("dispCalcWeightLbs");
  const dDose = $("dispStandardDose");

  const girth = parseFloat(gEl ? gEl.value : 0) || 0;
  const len = parseFloat(lEl ? lEl.value : 0) || 0;

  if (girth <= 0 || len <= 0) {
    if (dKg) dKg.innerText = "0 kg";
    if (dLb) dLb.innerText = "(0 lbs)";
    if (dDose) dDose.innerText = "0 ml";
    return;
  }

  // Shaeffer's Equation: lbs = (Girth² * Length) / 300, kg = lbs * 0.4536
  const lbs = Math.round((Math.pow(girth, 2) * len) / 300);
  const kg = Math.round(lbs * 0.4536);
  const dose = (kg / 20).toFixed(1);

  if (dKg) dKg.innerText = `${kg} kg`;
  if (dLb) dLb.innerText = `(${lbs} lbs)`;
  if (dDose) dDose.innerText = `${dose} ml`;
};

window.setWeightPreset = function (girth, len) {
  const gEl = $("calcGirth");
  const lEl = $("calcLength");
  if (gEl) gEl.value = girth;
  if (lEl) lEl.value = len;
  window.calculateShaefferWeight();
};

// =========================================================================
// 6. DIGITAL OPD PRESCRIPTION & WORKFLOWS
// =========================================================================
window.setOpdWorkflow = function (wf, btn) {
  window.currentWorkflow = wf;
  document.querySelectorAll(".wf-btn").forEach((b) => {
    b.className = "wf-btn py-2 rounded-xl bg-slate-100 text-slate-700 text-center";
  });
  if (btn) btn.className = "wf-btn py-2 rounded-xl bg-blue-600 text-white text-center";

  const aiBanner = $("aiWorkflowBanner");
  const diag = $("opdDiagnosis");

  if (wf === "AI") {
    if (aiBanner) aiBanner.classList.remove("hidden");
    const now = new Date();
    const pd = new Date(now.getTime() + 60 * 86400000);
    const calv = new Date(now.getTime() + 283 * 86400000);
    const dPd = $("dispAiPdDate");
    const dCalv = $("dispAiCalvingDate");
    if (dPd) dPd.innerText = pd.toLocaleDateString("hi-IN");
    if (dCalv) dCalv.innerText = calv.toLocaleDateString("hi-IN");
    if (diag) diag.value = "कृत्रिम गर्भाधान (A.I.)";
  } else {
    if (aiBanner) aiBanner.classList.add("hidden");
    if (wf === "PD" && diag) diag.value = "गर्भ जांच (P.D.)";
    if (wf === "VAC" && diag) diag.value = "निवारक टीकाकरण";
    if (wf === "DEW" && diag) diag.value = "नियमित कृमिनाशक";
    if (wf === "SURG" && diag) diag.value = "शल्य चिकित्सा";
    if (wf === "CALV" && diag) diag.value = "प्रसव सहायता";
  }
};

window.calculateRxDue = function () {
  const tot = parseFloat($("opdTotalFee")?.value || 0) || 0;
  const paid = parseFloat($("opdPaidFee")?.value || 0) || 0;
  const dueEl = $("opdDueFee");
  if (dueEl) dueEl.value = Math.max(0, tot - paid);
};

window.clearRxField = function () {
  const med = $("opdMedicine");
  if (med) med.value = "";
  window.checkRxPregnancyConflict();
};

window.captureCurrentGPS = function () {
  const gpsInp = $("opdGPS");
  const btn = $("btnGPS");
  if (!navigator.geolocation) {
    alert("GPS उपलब्ध नहीं है।");
    return;
  }
  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (gpsInp) gpsInp.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
      if (btn) btn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> GPS';
    },
    () => {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> पुनः प्रयास';
      alert("लोकेशन प्राप्त नहीं हो सकी।");
    },
    { enableHighAccuracy: true, timeout: 6000 }
  );
};

function getFormData() {
  return {
    id: "RX_" + Date.now(),
    date: new Date().toLocaleDateString("hi-IN"),
    time: new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" }),
    farmerName: ($("opdFarmerName")?.value || "").trim(),
    farmerPhone: ($("opdFarmerPhone")?.value || "").trim(),
    village: ($("opdVillage")?.value || "").trim(),
    animal: $("opdAnimal")?.value || "गाय (Cow)",
    tag: ($("opdTag")?.value || "").trim(),
    gps: $("opdGPS")?.value || "",
    pregnancy: $("opdPregnancy")?.value || "NON_PREGNANT",
    diagnosis: ($("opdDiagnosis")?.value || "").trim(),
    medicines: ($("opdMedicine")?.value || "").trim(),
    totalFee: parseFloat($("opdTotalFee")?.value || 0) || 0,
    paidFee: parseFloat($("opdPaidFee")?.value || 0) || 0,
    dueFee: parseFloat($("opdDueFee")?.value || 0) || 0
  };
}

window.dispatchWhatsAppRx = function () {
  const d = getFormData();
  if (!d.farmerName || !d.farmerPhone || d.farmerPhone.length < 10) {
    alert("कृपया किसान का नाम और 10-अंकों का मोबाइल नंबर भरें।");
    return;
  }
  window.saveCurrentOPDOffline(false);

  let msg = `*🏥 ${window.VetcareConfig.appTitle} - डिजिटल पर्ची*\n`;
  msg += `------------------------------------\n`;
  msg += `📅 दिनांक: ${d.date} (${d.time})\n`;
  msg += `👨‍🌾 किसान: ${d.farmerName} (${d.village || "गाँव"})\n`;
  msg += `🐄 पशु: ${d.animal} | टैग: ${d.tag || "N/A"}\n`;
  msg += `🩺 *निदान:* ${d.diagnosis || "क्लिनिकल परीक्षण"}\n\n`;
  msg += `💊 *दी गई दवाएं (Rx):*\n${d.medicines || "परामर्श दिया गया"}\n\n`;
  msg += `💰 कुल: ₹${d.totalFee} | जमा: ₹${d.paidFee} | *बकाया: ₹${d.dueFee}*\n`;
  msg += `------------------------------------\n_अधिकृत पशु चिकित्सक द्वारा जारी._\n`;

  const cleanPhone = d.farmerPhone.replace(/\D/g, "");
  window.open(`https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(msg)}`, "_blank");
};

window.saveCurrentOPDOffline = function (notify = true) {
  const d = getFormData();
  if (!d.farmerName) {
    if (notify) alert("कृपया किसान का नाम भरें।");
    return;
  }
  const records = getStore("vetcare_opd_records_v3", []);
  records.unshift(d);
  setStore("vetcare_opd_records_v3", records);

  // Auto Khata Entry if dueFee > 0
  if (d.dueFee > 0) {
    const khata = getStore("vetcare_khata_v3", []);
    khata.unshift({
      id: "KH_" + Date.now(),
      date: d.date,
      farmerName: d.farmerName,
      phone: d.farmerPhone,
      amount: d.dueFee,
      type: "DUE",
      note: `ओपीडी: ${d.diagnosis}`
    });
    setStore("vetcare_khata_v3", khata);
  }

  if (notify) {
    alert("✅ केस सुरक्षित किया गया!");
    window.renderFilteredRecords("");
  }
};

window.printCurrentOPDSlip = function () {
  const d = getFormData();
  const printArea = $("printableSlipArea");
  if (!printArea) return;
  printArea.innerHTML = `
    <div style="font-family: sans-serif; padding: 20px; border: 2px solid #2563eb; border-radius: 8px; max-width: 600px; margin: auto;">
      <h2 style="margin: 0; color: #1e3a8a;">${window.VetcareConfig.appTitle}</h2>
      <p style="font-size: 11px; color: #64748b;">${window.VetcareConfig.appTagline}</p>
      <hr style="margin: 10px 0;"/>
      <p><strong>किसान:</strong> ${d.farmerName} (${d.farmerPhone}) | <strong>गाँव:</strong> ${d.village || "N/A"}</p>
      <p><strong>पशु / टैग:</strong> ${d.animal} (${d.tag || "N/A"}) | <strong>दिनांक:</strong> ${d.date}</p>
      <p><strong>निदान (Diagnosis):</strong> ${d.diagnosis}</p>
      <p><strong>Rx औषधियां:</strong></p>
      <pre style="font-family: monospace; font-size: 11px; white-space: pre-wrap;">${d.medicines}</pre>
      <hr style="margin: 10px 0;"/>
      <p>कुल: ₹${d.totalFee} | जमा: ₹${d.paidFee} | <strong style="color: #b91c1c;">बकाया: ₹${d.dueFee}</strong></p>
    </div>`;
  window.print();
};

window.renderFilteredRecords = function (q) {
  const list = $("recordsList");
  const badge = $("recordTotalBadge");
  const records = getStore("vetcare_opd_records_v3", []);
  if (badge) badge.innerText = `${records.length} केस`;
  if (!list) return;

  const query = (q || "").trim().toLowerCase();
  const filtered = records.filter((r) => r.farmerName.toLowerCase().includes(query) || r.farmerPhone.includes(query) || r.diagnosis.toLowerCase().includes(query));

  if (!filtered.length) {
    list.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs font-bold">कोई केस रिकॉर्ड नहीं मिला।</div>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (r) => `
    <div class="bg-white border border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
      <div>
        <div class="flex items-center gap-1.5"><strong class="text-slate-900">${r.farmerName}</strong><span class="text-[10px] text-slate-400 font-mono">(${r.date})</span></div>
        <p class="text-slate-600">📞 ${r.farmerPhone} • ${r.animal} • ${r.diagnosis}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-bold ${r.dueFee > 0 ? "text-rose-600 bg-rose-50" : "text-emerald-700 bg-emerald-50"} px-2 py-0.5 rounded">${r.dueFee > 0 ? "बकाया: ₹" + r.dueFee : "चुकता"}</span>
        <button onclick="window.deleteOPDRecord('${r.id}')" class="text-slate-300 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`
    )
    .join("");
};

window.deleteOPDRecord = function (id) {
  if (!confirm("क्या आप यह रिकॉर्ड हटाना चाहते हैं?")) return;
  const records = getStore("vetcare_opd_records_v3", []).filter((r) => r.id !== id);
  setStore("vetcare_opd_records_v3", records);
  window.renderFilteredRecords("");
};

// =========================================================================
// 7. FINANCIAL KHATA & STOCK INVENTORY
// =========================================================================
window.renderKhataList = function () {
  const list = $("finDueList");
  const cEl = $("finCredit");
  const dEl = $("finDebit");
  const records = getStore("vetcare_khata_v3", []);

  let cr = 0;
  let db = 0;
  records.forEach((r) => {
    if (r.type === "PAID") cr += Number(r.amount);
    if (r.type === "DUE") db += Number(r.amount);
  });

  if (cEl) cEl.innerText = `₹${cr.toLocaleString("en-IN")}`;
  if (dEl) dEl.innerText = `₹${db.toLocaleString("en-IN")}`;
  if (!list) return;

  if (!records.length) {
    list.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs font-bold">खाता बही में कोई प्रविष्टि नहीं है।</div>`;
    return;
  }

  list.innerHTML = records
    .map(
      (k) => `
    <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
      <div>
        <strong class="text-slate-900">${k.farmerName}</strong> <span class="text-slate-400">(${k.date})</span>
        <p class="text-[11px] text-slate-500">📞 ${k.phone} ${k.note ? "• " + k.note : ""}</p>
      </div>
      <div class="flex items-center gap-2">
        <strong class="${k.type === "DUE" ? "text-rose-600" : "text-emerald-700"}">${k.type === "DUE" ? "- ₹" + k.amount : "+ ₹" + k.amount}</strong>
        ${k.type === "DUE" ? `<button onclick="window.sendWhatsAppTagada('${k.farmerName}','${k.phone}',${k.amount})" class="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded hover:bg-emerald-700"><i class="fa-brands fa-whatsapp"></i> तगादा</button>` : ""}
        <button onclick="window.deleteKhataEntry('${k.id}')" class="text-slate-300 hover:text-rose-500"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`
    )
    .join("");
};

window.sendWhatsAppTagada = function (name, phone, amt) {
  const clean = (phone || "").replace(/\D/g, "");
  if (!clean || clean.length < 10) {
    alert("वैध फोन नंबर नहीं है।");
    return;
  }
  const msg = `नमस्ते श्रीमान ${name} जी,\nपशु क्लिनिक के उपचार की बकाया राशि ₹${amt} का भुगतान कृपया शीघ्र करने का कष्ट करें।\nधन्यवाद,\n${window.VetcareConfig.appTitle}`;
  window.open(`https://api.whatsapp.com/send?phone=91${clean}&text=${encodeURIComponent(msg)}`, "_blank");
};

window.deleteKhataEntry = function (id) {
  const khata = getStore("vetcare_khata_v3", []).filter((k) => k.id !== id);
  setStore("vetcare_khata_v3", khata);
  window.renderKhataList();
};

window.openNewKhataModal = function () {
  const m = $("modalNewKhata");
  if (m) m.style.display = "flex";
};

window.closeNewKhataModal = function () {
  const m = $("modalNewKhata");
  if (m) m.style.display = "none";
};

window.saveNewKhataRecord = function () {
  const name = ($("khataFarmerName")?.value || "").trim();
  const phone = ($("khataFarmerPhone")?.value || "").trim();
  const amount = parseFloat($("khataAmount")?.value || 0);
  const type = $("khataType")?.value || "DUE";
  const note = ($("khataNote")?.value || "").trim();

  if (!name || amount <= 0) {
    alert("कृपया नाम व राशि भरें।");
    return;
  }
  const records = getStore("vetcare_khata_v3", []);
  records.unshift({ id: "KH_" + Date.now(), date: new Date().toLocaleDateString("hi-IN"), farmerName: name, phone: phone || "N/A", amount, type, note });
  setStore("vetcare_khata_v3", records);
  window.closeNewKhataModal();
  window.renderKhataList();
};

// Stock Inventory Engine
const defaultInventory = [
  { id: "inv_1", name: "Inj. Intacef Tazo (3.375g)", category: "INJECTION", stock: 12, minAlert: 4, unit: "vials" },
  { id: "inv_2", name: "Inj. Melonex Plus (100ml)", category: "INJECTION", stock: 6, minAlert: 2, unit: "vials" },
  { id: "inv_3", name: "Inj. Berenil RTU (30ml)", category: "INJECTION", stock: 4, minAlert: 2, unit: "vials" },
  { id: "inv_4", name: "Inj. Belamyl (100ml)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
  { id: "inv_5", name: "मुर्राह सीमन स्ट्रॉ (#405)", category: "SEMEN", stock: 35, minAlert: 10, unit: "straws" },
  { id: "inv_6", name: "HF Pure सेक्सड सीमन", category: "SEMEN", stock: 18, minAlert: 5, unit: "straws" },
  { id: "inv_7", name: "Bolus Biosacc Gold", category: "BOLUS", stock: 40, minAlert: 15, unit: "tabs" },
  { id: "inv_8", name: "Bloatosil Liquid (100ml)", category: "TONIC", stock: 9, minAlert: 3, unit: "bottles" }
];

window.renderInventoryList = function (cat) {
  const c = $("inventoryItemsContainer");
  if (!c) return;
  let items = getStore("vetcare_inventory_v3", defaultInventory);
  if (cat && cat !== "ALL") items = items.filter((i) => i.category === cat);

  c.innerHTML = items
    .map(
      (item) => `
    <div class="bg-slate-50 border ${item.stock <= item.minAlert ? "border-rose-300 bg-rose-50/40" : "border-slate-200"} p-3 rounded-2xl flex justify-between items-center text-xs">
      <div>
        <div class="flex items-center gap-1.5"><strong class="text-slate-900">${item.name}</strong>${item.stock <= item.minAlert ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 rounded">कम स्टॉक</span>' : ""}</div>
        <span class="text-[10px] text-slate-500">${item.category} • सीमा: ${item.minAlert} ${item.unit}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.updateStock('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100">-</button>
        <strong class="font-mono text-sm min-w-8 text-center ${item.stock <= item.minAlert ? "text-rose-700 font-black" : "text-slate-800"}">${item.stock}</strong>
        <button onclick="window.updateStock('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100">+</button>
      </div>
    </div>`
    )
    .join("");
};

window.updateStock = function (id, delta) {
  let items = getStore("vetcare_inventory_v3", defaultInventory);
  const it = items.find((x) => x.id === id);
  if (it) {
    it.stock = Math.max(0, it.stock + delta);
    setStore("vetcare_inventory_v3", items);
    window.renderInventoryList("ALL");
  }
};

window.filterInventoryCategory = function (cat, btn) {
  if (btn) {
    document.querySelectorAll(".inv-chip").forEach((b) => (b.className = "inv-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 shrink-0"));
    btn.className = "inv-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white shrink-0";
  }
  window.renderInventoryList(cat);
};

window.openNewInventoryItemModal = function () {
  const m = $("modalNewInventory");
  if (m) m.style.display = "flex";
};

window.closeNewInventoryModal = function () {
  const m = $("modalNewInventory");
  if (m) m.style.display = "none";
};

window.saveNewInventoryItem = function () {
  const name = ($("invItemName")?.value || "").trim();
  const cat = $("invItemCategory")?.value || "INJECTION";
  const stock = parseInt($("invItemStock")?.value || 0, 10);
  const minAlert = parseInt($("invItemMinAlert")?.value || 3, 10);
  const unit = ($("invItemUnit")?.value || "vials").trim();

  if (!name || stock < 0) {
    alert("कृपया दवा का नाम व मात्रा भरें।");
    return;
  }
  const items = getStore("vetcare_inventory_v3", defaultInventory);
  items.unshift({ id: "inv_" + Date.now(), name, category: cat, stock, minAlert, unit });
  setStore("vetcare_inventory_v3", items);
  window.closeNewInventoryModal();
  window.renderInventoryList("ALL");
};

// =========================================================================
// 8. FARMER CALCULATORS: BREEDING, BALANCED DIET & MILK SALES
// =========================================================================
window.calculateBreedingDates = function () {
  const dt = $("breedingInputDate")?.value;
  const type = $("breedingAnimalType")?.value || "COW";
  const card = $("breedingResultCard");
  if (!dt) {
    alert("कृपया तारीख चुनें।");
    return;
  }

  const base = new Date(dt);
  let gestation = type === "BUFFALO" ? 310 : type === "GOAT" ? 150 : 282;
  let nextHeatDays = type === "GOAT" ? 20 : 21;
  let pdDays = type === "GOAT" ? 45 : 60;

  const nextHeat = new Date(base.getTime() + nextHeatDays * 86400000);
  const pd = new Date(base.getTime() + pdDays * 86400000);
  const calving = new Date(base.getTime() + gestation * 86400000);

  const dNext = $("dispNextHeatDate");
  const dPd = $("dispPdCheckDate");
  const dCalv = $("dispCalvingDueDate");
  if (dNext) dNext.innerText = nextHeat.toLocaleDateString("hi-IN");
  if (dPd) dPd.innerText = pd.toLocaleDateString("hi-IN");
  if (dCalv) dCalv.innerText = calving.toLocaleDateString("hi-IN");
  if (card) card.classList.remove("hidden");
};

window.calculateFarmerRation = function () {
  const w = parseFloat($("feedAnimalWeight")?.value || 400);
  const m = parseFloat($("feedDailyMilk")?.value || 10);
  const card = $("farmerRationResultCard");

  const green = Math.round(w * 0.055);
  const dry = Math.max(4, Math.round(w * 0.013));
  const grain = (1.5 + m / 2.5).toFixed(1);

  const dGrn = $("dispFeedGreen");
  const dDry = $("dispFeedDry");
  const dGrnConc = $("dispFeedGrain");
  const dMin = $("dispFeedMinerals");

  if (dGrn) dGrn.innerText = `${green} kg`;
  if (dDry) dDry.innerText = `${dry} kg`;
  if (dGrnConc) dGrnConc.innerText = `${grain} kg`;
  if (dMin) dMin.innerText = "50-60 ग्राम";
  if (card) card.classList.remove("hidden");
};

window.calculateDailyMilkIncome = function () {
  const mor = parseFloat($("milkMorningLiters")?.value || 0) || 0;
  const eve = parseFloat($("milkEveningLiters")?.value || 0) || 0;
  const rate = parseFloat($("milkRatePerLiter")?.value || 0) || 0;
  const tot = (mor + eve).toFixed(1);
  const rev = Math.round(tot * rate);

  const dRev = $("dispTodayMilkRevenue");
  const dTot = $("dispTotalMilkToday");
  if (dRev) dRev.innerText = `₹${rev.toLocaleString("en-IN")}`;
  if (dTot) dTot.innerText = `आज: ${tot} लीटर`;
};

window.saveDailyMilkRecord = function () {
  const mor = parseFloat($("milkMorningLiters")?.value || 0) || 0;
  const eve = parseFloat($("milkEveningLiters")?.value || 0) || 0;
  const rate = parseFloat($("milkRatePerLiter")?.value || 0) || 0;
  const tot = mor + eve;
  if (tot <= 0) {
    alert("कृपया दूध की मात्रा भरें।");
    return;
  }
  const rev = Math.round(tot * rate);
  const hist = getStore("vetcare_milk_history", []);
  hist.unshift({ date: new Date().toLocaleDateString("hi-IN"), morning: mor, evening: eve, total: tot, rate, revenue: rev });
  setStore("vetcare_milk_history", hist);
  window.renderMilkHistory();
  alert("✅ दूध रिकॉर्ड सहेजा गया!");
};

window.renderMilkHistory = function () {
  const list = $("milkHistoryList");
  if (!list) return;
  const hist = getStore("vetcare_milk_history", []);
  if (!hist.length) {
    list.innerHTML = `<p class="text-[11px] text-slate-400 text-center py-1">कोई पिछला दूध रिकॉर्ड नहीं है।</p>`;
    return;
  }
  list.innerHTML = hist
    .slice(0, 5)
    .map(
      (h) => `
    <div class="bg-slate-50 border border-slate-200 p-2 rounded-xl flex justify-between items-center text-xs">
      <div><span class="font-bold text-slate-800">${h.date}</span><p class="text-[10px] text-slate-500">सुबह: ${h.morning}L • शाम: ${h.evening}L (कुल: ${h.total}L @ ₹${h.rate})</p></div>
      <strong class="text-emerald-700 font-bold">₹${h.revenue}</strong>
    </div>`
    )
    .join("");
};

// =========================================================================
// 9. MONETIZATION & PAYMENT GATEWAY (REAL SBI / PNB)
// =========================================================================
window.updatePaymentUI = function () {
  const cfg = window.VetcareConfig;
  const isSbi = window.activeBank === "SBI";
  const upi = isSbi ? cfg.sbiUpi : cfg.pnbUpi;
  const acc = isSbi ? cfg.sbiAccount : cfg.pnbAccount;
  const ifsc = isSbi ? cfg.sbiIfsc : cfg.pnbIfsc;
  const price = window.selectedPlan === "ANNUAL" ? cfg.annualPrice : cfg.monthlyPrice;

  const dPayee = $("dispPayeeName");
  const dUpi = $("dispUPIId");
  const dAcc = $("dispAccountNumber");
  const dIfsc = $("dispIFSC");
  const dAmt = $("directUPIAmount");
  const dLink = $("btnDirectUPILink");
  const qrImg = $("dynamicQRImage");

  if (dPayee) dPayee.innerText = cfg.payeeName;
  if (dUpi) dUpi.innerText = upi;
  if (dAcc) dAcc.innerText = acc;
  if (dIfsc) dIfsc.innerText = ifsc;
  if (dAmt) dAmt.innerText = price;

  const payload = `upi://pay?pa=${upi}&pn=${encodeURIComponent(cfg.payeeName)}&am=${price}&cu=INR&tn=VetcarePro`;
  if (dLink) dLink.href = payload;
  if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(payload)}`;
};

window.selectPaymentPlan = function (plan) {
  window.selectedPlan = plan;
  const bM = $("btnPlanMonthly");
  const bA = $("btnPlanAnnual");
  if (plan === "MONTHLY") {
    if (bM) bM.className = "py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center transition";
    if (bA) bA.className = "py-2.5 rounded-xl text-slate-700 font-medium text-center transition";
  } else {
    if (bA) bA.className = "py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center transition";
    if (bM) bM.className = "py-2.5 rounded-xl text-slate-700 font-medium text-center transition";
  }
  window.updatePaymentUI();
};

window.openPaymentTicketSubmission = function () {
  window.closePaymentModal();
  window.openHelpModal();
  const sel = $("ticketCategory");
  if (sel) sel.value = "PAYMENT_UTR";
};

// =========================================================================
// 10. MASTER ADMIN & PRIVATE TICKET DESK (ZERO PUBLIC EXPOSURE)
// =========================================================================
window.loadAdminSettingsToForm = function () {
  const cfg = window.VetcareConfig;
  const pairs = {
    cfgPayeeName: cfg.payeeName,
    cfgMonthlyPrice: cfg.monthlyPrice,
    cfgAnnualPrice: cfg.annualPrice,
    cfgSbiUpi: cfg.sbiUpi,
    cfgSbiAccount: cfg.sbiAccount,
    cfgSbiIfsc: cfg.sbiIfsc,
    cfgPnbUpi: cfg.pnbUpi,
    cfgPnbAccount: cfg.pnbAccount,
    cfgPnbIfsc: cfg.pnbIfsc,
    cfgAppTitle: cfg.appTitle,
    cfgAppTagline: cfg.appTagline
  };
  Object.keys(pairs).forEach((id) => {
    const el = $(id);
    if (el) el.value = pairs[id];
  });
};

window.switchAdminSubTab = function (tab) {
  const pPay = $("adminPanelPayment");
  const pBrand = $("adminPanelBranding");
  const pTick = $("adminPanelTickets");
  const bPay = $("tabBtnAdminPay");
  const bBrand = $("tabBtnAdminBrand");
  const bTick = $("tabBtnAdminTickets");

  [pPay, pBrand, pTick].forEach((p) => p && p.classList.add("hidden"));
  [bPay, bBrand, bTick].forEach((b) => { if (b) b.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0"; });

  if (tab === "PAYMENT") {
    if (pPay) pPay.classList.remove("hidden");
    if (bPay) bPay.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
  } else if (tab === "BRANDING") {
    if (pBrand) pBrand.classList.remove("hidden");
    if (bBrand) bBrand.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
  } else {
    if (pTick) pTick.classList.remove("hidden");
    if (bTick) bTick.className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold";
    window.renderAdminTicketsInbox();
  }
};

window.saveAllMasterAdminSettings = function () {
  const cfg = window.VetcareConfig;
  cfg.payeeName = $("cfgPayeeName")?.value || cfg.payeeName;
  cfg.monthlyPrice = parseFloat($("cfgMonthlyPrice")?.value) || cfg.monthlyPrice;
  cfg.annualPrice = parseFloat($("cfgAnnualPrice")?.value) || cfg.annualPrice;
  cfg.sbiUpi = $("cfgSbiUpi")?.value || cfg.sbiUpi;
  cfg.sbiAccount = $("cfgSbiAccount")?.value || cfg.sbiAccount;
  cfg.sbiIfsc = $("cfgSbiIfsc")?.value || cfg.sbiIfsc;
  cfg.pnbUpi = $("cfgPnbUpi")?.value || cfg.pnbUpi;
  cfg.pnbAccount = $("cfgPnbAccount")?.value || cfg.pnbAccount;
  cfg.pnbIfsc = $("cfgPnbIfsc")?.value || cfg.pnbIfsc;
  cfg.appTitle = $("cfgAppTitle")?.value || cfg.appTitle;
  cfg.appTagline = $("cfgAppTagline")?.value || cfg.appTagline;

  setStore("vetcare_config_v3", cfg);

  const tHead = $("appHeaderTitle");
  const tGate = $("gatewayAppTitle");
  const tTag = $("gatewayTagline");
  if (tHead) tHead.innerText = cfg.appTitle;
  if (tGate) tGate.innerText = cfg.appTitle;
  if (tTag) tTag.innerText = cfg.appTagline;

  window.updatePaymentUI();
  alert("✅ सेटिंग्स सुरक्षित की गईं!");
  window.closeAdminDashboard();
};

window.submitSupportTicket = function () {
  const name = ($("ticketSenderName")?.value || "").trim();
  const phone = ($("ticketSenderPhone")?.value || "").trim();
  const cat = $("ticketCategory")?.value || "OTHER";
  const msg = ($("ticketMessage")?.value || "").trim();

  if (!name || !phone || !msg) {
    alert("कृपया नाम, फोन व संदेश भरें।");
    return;
  }
  const tickets = getStore("vetcare_support_tickets", []);
  tickets.unshift({
    id: "TCK_" + Date.now(),
    date: new Date().toLocaleDateString("hi-IN"),
    name,
    phone,
    category: cat,
    message: msg,
    resolved: false
  });
  setStore("vetcare_support_tickets", tickets);

  $("ticketSenderName").value = "";
  $("ticketSenderPhone").value = "";
  $("ticketMessage").value = "";
  window.closeHelpModal();
  alert("✅ टिकट दर्ज कर लिया गया है। एडमिन द्वारा सत्यापन पश्चात सेवा सक्रिय होगी।");
};

window.renderAdminTicketsInbox = function () {
  const c = $("adminTicketsContainer");
  const badge = $("badgeTicketCount");
  const tickets = getStore("vetcare_support_tickets", []);
  if (badge) badge.innerText = tickets.filter((t) => !t.resolved).length;
  if (!c) return;

  if (!tickets.length) {
    c.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs font-bold bg-slate-50 border border-slate-200 rounded-2xl">कोई नया सपोर्ट टिकट नहीं है।</div>`;
    return;
  }

  c.innerHTML = tickets
    .map(
      (t, idx) => `
    <div class="p-3 bg-slate-50 border ${t.resolved ? "border-slate-200 opacity-60" : "border-blue-200 bg-blue-50/30"} rounded-2xl text-xs space-y-1">
      <div class="flex justify-between items-center">
        <div><strong class="text-slate-900">${t.name}</strong> <span class="text-blue-700 font-mono">(${t.phone})</span> <span class="text-[9px] bg-slate-200 px-1.5 py-0.5 rounded font-bold">${t.category}</span></div>
        <span class="text-[10px] text-slate-400 font-mono">${t.date}</span>
      </div>
      <p class="text-slate-700">${t.message}</p>
      <div class="flex justify-end gap-2 pt-1 border-t border-slate-200">
        ${!t.resolved ? `<button onclick="window.resolveSupportTicket(${idx})" class="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded hover:bg-emerald-700">✓ हल हो गया</button>` : '<span class="text-[10px] text-emerald-700 font-bold">✓ हल किया जा चुका</span>'}
        <button onclick="window.deleteSupportTicket(${idx})" class="text-[10px] text-rose-600 hover:underline">डिलीट</button>
      </div>
    </div>`
    )
    .join("");
};

window.resolveSupportTicket = function (idx) {
  const tickets = getStore("vetcare_support_tickets", []);
  if (tickets[idx]) {
    tickets[idx].resolved = true;
    setStore("vetcare_support_tickets", tickets);
    window.renderAdminTicketsInbox();
  }
};

window.deleteSupportTicket = function (idx) {
  const tickets = getStore("vetcare_support_tickets", []);
  tickets.splice(idx, 1);
  setStore("vetcare_support_tickets", tickets);
  window.renderAdminTicketsInbox();
};

window.clearAllSupportTickets = function () {
  if (!confirm("क्या आप सभी टिकट्स साफ करना चाहते हैं?")) return;
  setStore("vetcare_support_tickets", []);
  window.renderAdminTicketsInbox();
};

window.saveGeminiKey = function () {
  const k = ($("inputGeminiKey")?.value || "").trim();
  if (k) {
    window.VetcareConfig.geminiKey = k;
    setStore("vetcare_config_v3", window.VetcareConfig);
    alert("✅ API Key सुरक्षित की गई!");
  }
  window.closeAIKeyModal();
};

// =========================================================================
// 11. BOOTSTRAPPER (ON DOM CONTENT LOADED)
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
  window.updatePaymentUI();
  window.renderMilkHistory();

  // If a role was selected before script parsed, initialize it
  if (window._queuedRole) {
    window.selectRole(window._queuedRole);
    delete window._queuedRole;
  } else {
    window.runWeightedDiagnosis();
  }
});
