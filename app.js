/**
 * ============================================================================
 * VETCARE AI OS - PRODUCTION SYSTEM CONTROLLER (app.js)
 * Architecture: Instant Zero-Delay Window Bindings & Real-Time Security Heartbeat
 * Version: 5.0.0-PROD (Real-Time Synchronized)
 * ============================================================================
 */

/* ============================================================================
 * 1. IMMEDIATE TOP-LEVEL WINDOW BINDINGS (LINE 1 ZERO-DELAY BRIDGE)
 * ============================================================================ */

window.openFarmerDeclarationModal = function () {
  console.log("[Vetcare] Opening Farmer Declaration Modal...");
  const modal = document.getElementById("farmer-declaration-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  } else {
    window.selectRole("FARMER");
  }
};

window.closeFarmerDeclarationModal = function () {
  const modal = document.getElementById("farmer-declaration-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.openDoctorDeclarationModal = function () {
  console.log("[Vetcare] Opening Doctor Declaration Modal...");
  const modal = document.getElementById("doctor-declaration-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  } else {
    window.selectRole("DOCTOR");
  }
};

window.closeDoctorDeclarationModal = function () {
  const modal = document.getElementById("doctor-declaration-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.confirmFarmerRole = function () {
  window.closeFarmerDeclarationModal();
  window.selectRole("FARMER");
};

window.confirmDoctorRole = function () {
  window.closeDoctorDeclarationModal();
  window.selectRole("DOCTOR");
};

window.acceptDoctorDeclaration = function () {
  const regInput = document.getElementById("docRegNumber");
  const mobileInput = document.getElementById("docMobileNumber");
  const agreeCheck = document.getElementById("docAgreementCheckbox");

  if (agreeCheck && !agreeCheck.checked) {
    alert("कृपया IVC Act वैधानिक घोषणा चेकबॉक्स स्वीकार करें।");
    return;
  }
  const regNo = regInput ? regInput.value.trim() : "";
  const phone = mobileInput ? mobileInput.value.trim() : "";

  if (!regNo) {
    alert("कृपया अपनी वैध पशु चिकित्सा परिषद पंजीकरण संख्या (VCI Reg No.) दर्ज करें।");
    if (regInput) regInput.focus();
    return;
  }
  if (!phone || phone.length < 10) {
    alert("कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।");
    if (mobileInput) mobileInput.focus();
    return;
  }

  localStorage.setItem("vetcare_registered_role", "DOCTOR");
  localStorage.setItem("vetcare_user_phone", phone);
  localStorage.setItem("vetcare_doc_reg", regNo);
  localStorage.setItem("vetcare_disclaimer_accepted_doctor", "true");

  window.closeDoctorDeclarationModal();
  window.selectRole("DOCTOR");
};

window.acceptFarmerDeclaration = function () {
  const nameInput = document.getElementById("farmerNameInput");
  const mobileInput = document.getElementById("farmerMobileInput");
  const agreeCheck = document.getElementById("farmerAgreementCheckbox");

  if (agreeCheck && !agreeCheck.checked) {
    alert("कृपया पशुपालक सुरक्षा एवं मार्गदर्शन निर्देश स्वीकार करें।");
    return;
  }
  const name = nameInput ? nameInput.value.trim() : "";
  const phone = mobileInput ? mobileInput.value.trim() : "";

  if (!name) {
    alert("कृपया अपना शुभ नाम दर्ज करें।");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone || phone.length < 10) {
    alert("कृपया 10 अंकों का सक्रिय मोबाइल नंबर दर्ज करें।");
    if (mobileInput) mobileInput.focus();
    return;
  }

  localStorage.setItem("vetcare_registered_role", "FARMER");
  localStorage.setItem("vetcare_farmer_name", name);
  localStorage.setItem("vetcare_user_phone", phone);
  localStorage.setItem("vetcare_disclaimer_accepted_farmer", "true");

  window.closeFarmerDeclarationModal();
  window.selectRole("FARMER");
};

window.selectRole = function (role) {
  const normalizedRole = (role || "").toUpperCase();
  localStorage.setItem("vetcare_registered_role", normalizedRole);

  // Synchronize start timestamp
  if (!localStorage.getItem("vetcare_session_start")) {
    localStorage.setItem("vetcare_session_start", Date.now().toString());
  }

  const landingScreen =
    document.getElementById("screenGateway") ||
    document.getElementById("role-selection-screen");
  const mainAppContainer =
    document.getElementById("screenMainApp") ||
    document.getElementById("main-app-container");

  if (landingScreen) {
    landingScreen.classList.add("hidden");
    landingScreen.style.display = "none";
  }
  if (mainAppContainer) {
    mainAppContainer.classList.remove("hidden");
    mainAppContainer.style.display = "flex";
  }

  if (window.applyRoleState) {
    window.applyRoleState(normalizedRole);
  }
};

/* ============================================================================
 * 2. 60-MINUTE REAL-TIME COUNTDOWN TIMER (IMMEDIATE HEARTBEAT)
 * ============================================================================ */

(function initImmediateSessionHeartbeat() {
  const SESSION_DURATION_SECONDS = 3600; // 60 minutes
  let startTimestamp = localStorage.getItem("vetcare_session_start");

  if (!startTimestamp) {
    startTimestamp = Date.now().toString();
    localStorage.setItem("vetcare_session_start", startTimestamp);
  }

  function tickSession() {
    const start = parseInt(
      localStorage.getItem("vetcare_session_start") || Date.now().toString(),
      10
    );
    const elapsedSeconds = Math.floor((Date.now() - start) / 1000);
    const remainingSeconds = Math.max(0, SESSION_DURATION_SECONDS - elapsedSeconds);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formatted =
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    // Update all potential display IDs in DOM
    const timerDisplay = document.getElementById("sessionTimerDisplay");
    const timerBadge = document.getElementById("session-timer-badge");

    if (timerDisplay) timerDisplay.textContent = formatted;
    if (timerBadge && !timerDisplay) timerBadge.textContent = "⏱️ सत्र: " + formatted + " शेष";

    // 5-minute warning modal
    if (remainingSeconds <= 300 && remainingSeconds > 0) {
      const warnModal = document.getElementById("modalSessionWarning");
      if (warnModal && warnModal.style.display !== "flex") {
        warnModal.classList.remove("hidden");
        warnModal.style.display = "flex";
      }
    }

    // Auto-logout upon expiration
    if (remainingSeconds <= 0) {
      window.logoutUser(true);
    }
  }

  setInterval(tickSession, 1000);
  tickSession();
})();

window.extendSession = function () {
  localStorage.setItem("vetcare_session_start", Date.now().toString());
  const warnModal = document.getElementById("modalSessionWarning");
  if (warnModal) {
    warnModal.classList.add("hidden");
    warnModal.style.display = "none";
  }
};

window.closeLogoutWarningModal = function () {
  const warnModal = document.getElementById("modalSessionWarning");
  if (warnModal) {
    warnModal.classList.add("hidden");
    warnModal.style.display = "none";
  }
};

window.logoutUser = function (isTimeout) {
  localStorage.removeItem("vetcare_session_start");

  const landingScreen =
    document.getElementById("screenGateway") ||
    document.getElementById("role-selection-screen");
  const mainAppContainer =
    document.getElementById("screenMainApp") ||
    document.getElementById("main-app-container");
  const warnModal = document.getElementById("modalSessionWarning");

  if (warnModal) {
    warnModal.classList.add("hidden");
    warnModal.style.display = "none";
  }
  if (mainAppContainer) {
    mainAppContainer.classList.add("hidden");
    mainAppContainer.style.display = "none";
  }
  if (landingScreen) {
    landingScreen.classList.remove("hidden");
    landingScreen.style.display = "flex";
  }

  if (isTimeout) {
    alert(
      "सत्र समाप्त (Session Expired)! 60 मिनट पूर्ण होने पर सुरक्षा कारणों से आपको लॉगआउट कर दिया गया है।"
    );
  }
};

window.handleManualLogout = function () {
  if (confirm("क्या आप वाकई Vetcare OS से लॉगआउट करना चाहते हैं?")) {
    window.logoutUser(false);
  }
};

/* ============================================================================
 * 3. VERIFIED MASTER BANK & SYSTEM CREDENTIALS
 * ============================================================================ */

const MASTER_CONFIG = {
  payeeName: "Vetcare Services",
  payeeOwner: "Mr. Rahul",
  masterPin: "9297",
  pricing: {
    monthly: 199,
    annual: 1499
  },
  sbiPrimary: {
    bankName: "State Bank of India (SBI)",
    upiId: "rahuljangra9297@oksbi",
    accountNumber: "65204067585",
    ifsc: "SBIN0013693"
  },
  pnbBackup: {
    bankName: "Punjab National Bank (PNB)",
    upiId: "rahuljangra9297-1@okicici",
    accountNumber: "6687001700015098",
    ifsc: "PUNB0668700"
  },
  adminWhatsApp: "9876543210"
};

/* ============================================================================
 * 4. ROLE STATE ENFORCEMENT & INTERFACE SWITCHER
 * ============================================================================ */

window.applyRoleState = function (role) {
  const isDoctor = role === "DOCTOR";

  // Elements accessible only to authorized veterinary doctors
  const docElements = ["navRx", "navRecords", "navInventory", "navAI"];
  docElements.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      if (isDoctor) {
        el.classList.remove("hidden");
        el.style.display = "flex";
      } else {
        el.classList.add("hidden");
        el.style.display = "none";
      }
    }
  });

  const roleBadge = document.getElementById("currentUserRoleBadge");
  if (roleBadge) {
    roleBadge.textContent = isDoctor
      ? "🩺 अधिकृत पशु चिकित्सक"
      : "👨‍🌾 स्मार्ट पशुपालक";
  }

  const finLabel = document.getElementById("navFinanceLabel");
  if (finLabel) {
    finLabel.textContent = isDoctor ? "क्लिनिक खाता" : "डेयरी बहीखाता";
  }

  window.switchTab("diagnosis");
  if (window.applyMatrixFilters) window.applyMatrixFilters();
  if (window.renderKhataList) window.renderKhataList();
  if (window.renderInventory) window.renderInventory();
  if (window.renderBreedingGuides) window.renderBreedingGuides();
};

window.switchRole = function () {
  const registeredRole = localStorage.getItem("vetcare_registered_role");
  if (registeredRole) {
    window.openRoleChangeModal(registeredRole);
  } else {
    const landingScreen =
      document.getElementById("screenGateway") ||
      document.getElementById("role-selection-screen");
    const mainAppContainer =
      document.getElementById("screenMainApp") ||
      document.getElementById("main-app-container");
    if (mainAppContainer) {
      mainAppContainer.classList.add("hidden");
      mainAppContainer.style.display = "none";
    }
    if (landingScreen) {
      landingScreen.classList.remove("hidden");
      landingScreen.style.display = "flex";
    }
  }
};

window.returnToGateway = window.switchRole;

window.openRoleChangeModal = function (currentRole) {
  const roleNameEl = document.getElementById("lockedCurrentRoleName");
  if (roleNameEl) {
    roleNameEl.textContent =
      currentRole === "DOCTOR"
        ? "अधिकृत पशु चिकित्सक (Doctor)"
        : "स्मार्ट पशुपालक (Farmer)";
  }
  const modal = document.getElementById("role-change-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeRoleChangeModal = function () {
  const modal = document.getElementById("role-change-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.submitRoleChangeRequest = function () {
  const reasonInput = document.getElementById("roleChangeReason");
  const reason = reasonInput ? reasonInput.value.trim() : "";
  if (!reason) {
    alert("कृपया रोल परिवर्तन का कारण दर्ज करें।");
    return;
  }

  const currentRole = localStorage.getItem("vetcare_registered_role") || "UNKNOWN";
  const phone = localStorage.getItem("vetcare_user_phone") || "N/A";
  const requests = JSON.parse(
    localStorage.getItem("vetcare_role_change_requests") || "[]"
  );

  requests.push({
    id: "REQ_" + Date.now(),
    phone: phone,
    currentRole: currentRole,
    requestedRole: currentRole === "DOCTOR" ? "FARMER" : "DOCTOR",
    reason: reason,
    timestamp: new Date().toLocaleString(),
    status: "PENDING"
  });

  localStorage.setItem("vetcare_role_change_requests", JSON.stringify(requests));
  alert("✅ आपका अनुरोध सुपर एडमिन को प्रेषित कर दिया गया है।");
  if (reasonInput) reasonInput.value = "";
  window.closeRoleChangeModal();
};

/* ============================================================================
 * 5. TAB CONTROLLER & NAVIGATION
 * ============================================================================ */

const TABS = [
  "diagnosis",
  "rx",
  "records",
  "ai",
  "breeding",
  "feed",
  "finance",
  "inventory",
  "helpdesk"
];

window.switchTab = function (targetTab) {
  TABS.forEach(function (tab) {
    const view = document.getElementById(
      "view" + tab.charAt(0).toUpperCase() + tab.slice(1)
    );
    const navBtn = document.getElementById(
      "nav" + tab.charAt(0).toUpperCase() + tab.slice(1)
    );

    if (view) {
      if (tab === targetTab) {
        view.classList.remove("hidden");
        view.style.display = "block";
      } else {
        view.classList.add("hidden");
        view.style.display = "none";
      }
    }

    if (navBtn) {
      if (tab === targetTab) {
        navBtn.classList.add("active-nav-tab");
        navBtn.classList.remove("text-slate-400");
      } else {
        navBtn.classList.remove("active-nav-tab");
        navBtn.classList.add("text-slate-400");
      }
    }
  });

  if (targetTab === "records" && window.renderCaseRecords) window.renderCaseRecords();
  if (targetTab === "inventory" && window.renderInventory) window.renderInventory();
  if (targetTab === "finance" && window.renderKhataList) window.renderKhataList();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ============================================================================
 * 6. 3-WAY CLINICAL DIAGNOSIS ENGINE
 * ============================================================================ */

const MatrixState = {
  temp: null,
  cardinal: "ALL",
  secondary: []
};

window.setDiagnosisMode = function (mode) {
  const panelMatrix = document.getElementById("panelDiagMatrix");
  const panelHybrid = document.getElementById("panelDiagHybrid");
  const panelDirectory = document.getElementById("panelDiagDirectory");

  if (panelMatrix) panelMatrix.style.display = mode === "SYMPTOMS" ? "block" : "none";
  if (panelHybrid) panelHybrid.style.display = mode === "HYBRID" ? "block" : "none";
  if (panelDirectory) panelDirectory.style.display = mode === "DIRECTORY" ? "block" : "none";

  ["btnDiagMode1", "btnDiagMode2", "btnDiagMode3"].forEach(function (btnId, idx) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const modes = ["SYMPTOMS", "HYBRID", "DIRECTORY"];
    if (modes[idx] === mode) {
      btn.className =
        "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs cursor-pointer";
    } else {
      btn.className =
        "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center cursor-pointer";
    }
  });

  if (mode === "DIRECTORY") {
    window.renderDiseaseCards(window.VETCARE_DISEASE_DB || window.CORE_DISEASE_DB || []);
  } else {
    window.applyMatrixFilters();
  }
};

window.toggleMatrixParam = function (param, val, btnElem) {
  if (param === "temp") {
    MatrixState.temp = MatrixState.temp === val ? null : val;
    if (btnElem && btnElem.parentElement) {
      Array.from(btnElem.parentElement.children).forEach(function (c) {
        c.classList.remove("chip-active");
      });
      if (MatrixState.temp === val) {
        btnElem.classList.add("chip-active");
      }
    }
  }
  window.applyMatrixFilters();
};

window.toggleSecSymptom = function (sym, btnElem) {
  const idx = MatrixState.secondary.indexOf(sym);
  if (idx > -1) {
    MatrixState.secondary.splice(idx, 1);
    if (btnElem) btnElem.classList.remove("chip-active");
  } else {
    MatrixState.secondary.push(sym);
    if (btnElem) btnElem.classList.add("chip-active");
  }
  window.applyMatrixFilters();
};

window.resetSymptomMatrix = function () {
  MatrixState.temp = null;
  MatrixState.cardinal = "ALL";
  MatrixState.secondary = [];

  const cardinalSelect = document.getElementById("selCardinalSign");
  if (cardinalSelect) cardinalSelect.value = "ALL";

  document.querySelectorAll(".m-chip, .s-chip").forEach(function (c) {
    c.classList.remove("chip-active");
  });
  window.applyMatrixFilters();
};

window.applyMatrixFilters = function () {
  const cardinalSelect = document.getElementById("selCardinalSign");
  if (cardinalSelect) MatrixState.cardinal = cardinalSelect.value;

  const db = window.VETCARE_DISEASE_DB || window.CORE_DISEASE_DB || [];
  const scoredList = db.map(function (disease) {
    let score = 0;
    if (MatrixState.temp && disease.temp === MatrixState.temp) score += 20;
    if (MatrixState.cardinal !== "ALL" && disease.cardinal === MatrixState.cardinal) {
      score += 40;
    }
    if (MatrixState.secondary.length > 0) {
      score += Math.min(40, MatrixState.secondary.length * 10);
    }
    return Object.assign({}, disease, { matchScore: Math.min(100, score) });
  });

  scoredList.sort(function (a, b) {
    return b.matchScore - a.matchScore;
  });

  const isFiltered =
    MatrixState.temp !== null ||
    MatrixState.cardinal !== "ALL" ||
    MatrixState.secondary.length > 0;

  const badge = document.getElementById("matchCountBadge");
  const scoreText = document.getElementById("matchScoreText");

  if (isFiltered) {
    if (scoreText) {
      scoreText.textContent =
        "शीर्ष निदान: " + scoredList[0].nameHindi + " (" + scoredList[0].matchScore + "% संभावना)";
    }
    if (badge) badge.textContent = scoredList.length + " विश्लेषित";
    window.renderDiseaseCards(scoredList);
  } else {
    if (scoreText) {
      scoreText.textContent = "लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी";
    }
    if (badge) badge.textContent = db.length + " रोग एक्टिव";
    window.renderDiseaseCards(db);
  }
};

window.handleAppSearch = function () {
  const input = document.getElementById("unifiedSearchInput");
  const query = input ? input.value.trim().toLowerCase() : "";
  const db = window.VETCARE_DISEASE_DB || window.CORE_DISEASE_DB || [];

  if (!query) {
    window.renderDiseaseCards(db);
    return;
  }

  const filtered = db.filter(function (d) {
    const keywords = (d.keywords || []).join(" ").toLowerCase();
    return (
      d.nameHindi.toLowerCase().includes(query) ||
      (d.desc && d.desc.toLowerCase().includes(query)) ||
      keywords.includes(query)
    );
  });
  window.renderDiseaseCards(filtered);
};

window.filterByTag = function (tag, btn) {
  document.querySelectorAll(".q-chip").forEach(function (c) {
    c.className =
      "q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0 cursor-pointer";
  });
  if (btn) {
    btn.className =
      "q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 cursor-pointer";
  }

  const db = window.VETCARE_DISEASE_DB || window.CORE_DISEASE_DB || [];
  if (tag === "ALL") {
    window.renderDiseaseCards(db);
  } else {
    window.renderDiseaseCards(
      db.filter(function (d) {
        return d.category === tag;
      })
    );
  }
};

window.renderDiseaseCards = function (diseases) {
  const container = document.getElementById("diseaseSearchResults");
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    container.innerHTML =
      '<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">कोई रोग मेल नहीं खाया।</div>';
    return;
  }

  const isDoc = localStorage.getItem("vetcare_registered_role") === "DOCTOR";
  let html = "";

  diseases.forEach(function (d) {
    const scoreBadge =
      typeof d.matchScore !== "undefined" && d.matchScore > 0
        ? '<span class="text-xs font-black px-2.5 py-1 rounded-xl ' +
          (d.matchScore > 60 ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700") +
          '">' +
          d.matchScore +
          "% संभावना</span>"
        : "";

    html += '<div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">';
    html += '  <div class="flex justify-between items-start gap-2">';
    html += '    <div>';
    html += '      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">' + (d.category || "GENERAL") + "</span>";
    html += '      <h3 class="text-sm sm:text-base font-black text-slate-900 leading-tight">' + d.nameHindi + "</h3>";
    html += "    </div>";
    html += scoreBadge;
    html += "  </div>";
    html += '  <p class="text-xs text-slate-600 leading-relaxed">' + (d.desc || "") + "</p>";

    if (d.pregnancyWarning) {
      html += '  <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs font-semibold leading-relaxed">';
      html += d.pregnancyWarning;
      html += "  </div>";
    }

    if (!isDoc && d.farmerRemedy) {
      html += '  <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-emerald-950 text-xs space-y-1">';
      html += '    <h4 class="font-bold text-emerald-900">🌿 प्राथमिक देसी व घरेलू उपचार:</h4>';
      html += '    <p class="leading-relaxed">' + d.farmerRemedy + "</p>";
      html += "  </div>";
    }

    if (isDoc && d.doctorRx) {
      html += '  <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 text-blue-950 text-xs space-y-1.5 font-mono">';
      html += '    <div class="flex justify-between items-center font-sans border-b border-blue-200/60 pb-1">';
      html += '      <h4 class="font-bold text-blue-900">💉 क्लिनिकल Rx इंजेक्शन व दवाएं:</h4>';
      html += '      <button onclick="window.loadRxToOpdSlip(\'' + escape(d.nameHindi) + "', '" + escape(d.doctorRx) + '\')" class="text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold px-2 py-0.5 rounded-lg transition cursor-pointer">+ पर्ची में भरें</button>';
      html += "    </div>";
      html += '    <pre class="whitespace-pre-wrap leading-relaxed text-[11px] font-mono text-slate-800">' + d.doctorRx + "</pre>";
      html += "  </div>";
    }

    html += "</div>";
  });

  container.innerHTML = html;
};

window.loadRxToOpdSlip = function (escapedName, escapedRx) {
  const diagInput = document.getElementById("opdDiagnosis");
  const medInput = document.getElementById("opdMedicine");

  if (diagInput) diagInput.value = unescape(escapedName);
  if (medInput) medInput.value = unescape(escapedRx);

  window.switchTab("rx");
};

/* ============================================================================
 * 7. BALANCED FEED & BREEDING CALCULATORS
 * ============================================================================ */

window.calculateDailyRation = function () {
  const weightInput = document.getElementById("feedWeight");
  const milkInput = document.getElementById("feedMilk");

  const weight = parseFloat(weightInput ? weightInput.value : "400") || 400;
  const milk = parseFloat(milkInput ? milkInput.value : "10") || 10;

  // Dry Matter: 2.8% of body weight
  const totalDM = weight * 0.028;
  const concentrateKg = Math.round((1.5 + milk / 2.5) * 10) / 10;
  const remainingDM = Math.max(0, totalDM - concentrateKg * 0.9);
  const dryStrawKg = Math.round(remainingDM * 0.4 * 10) / 10;
  const greenFodderKg = Math.round(((remainingDM * 0.6) / 0.2) * 10) / 10;

  const resGrain = document.getElementById("resFeedGrain");
  const resGreen = document.getElementById("resFeedGreen");
  const resDry = document.getElementById("resFeedDry");
  const resCard = document.getElementById("rationResultCard");

  if (resGrain) resGrain.textContent = concentrateKg + " kg";
  if (resGreen) resGreen.textContent = greenFodderKg + " kg";
  if (resDry) resDry.textContent = dryStrawKg + " kg";
  if (resCard) {
    resCard.classList.remove("hidden");
    resCard.style.display = "block";
  }
};

window.renderBreedingGuides = function () {
  const heatContainer = document.getElementById("heatSignsContainer");
  const dischContainer = document.getElementById("dischargeContainer");
  const repeatContainer = document.getElementById("repeatBreederList");

  if (heatContainer) {
    heatContainer.innerHTML =
      '<div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl"><strong>1. प्रारंभिक मद (0-6 घंटे):</strong> रंभाना, बेचैनी। (A.I. न कराएं)</div>' +
      '<div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl"><strong>2. मध्य मद (6-18 घंटे):</strong> Standing Heat, पारदर्शी डिस्चार्ज। (A.I. का सही समय - AM/PM नियम)</div>' +
      '<div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl"><strong>3. अंतिम मद (18-24 घंटे):</strong> डिस्चार्ज गाढ़ा होना।</div>';
  }

  if (dischContainer) {
    dischContainer.innerHTML =
      '<div class="p-2 bg-emerald-50 rounded-xl border border-emerald-200"><strong>✅ कांच जैसा साफ, लम्बा तार:</strong> गर्भाशय स्वस्थ है। तुरंत सीमन कराएं।</div>' +
      '<div class="p-2 bg-amber-50 rounded-xl border border-amber-200"><strong>⚠️ मटमैला या सफेद मवाद:</strong> मेट्राइटिस का संक्रमण है। पहले गर्भाशय की सफाई (I/U) कराएं।</div>';
  }

  if (repeatContainer) {
    repeatContainer.innerHTML =
      "<li>सीमन कराने के समय 2.5 ml Inj. Receptal (Buserelin) I/M लगाएं।</li>" +
      "<li>गर्भाशय सफाई (I/U Therapy) Lixen अथवा Metrogyl से 2 चक्रों में कराएं।</li>" +
      "<li>चेलेटेड मिनरल मिक्सचर 50 ग्राम प्रतिदिन 60 दिनों तक खिलाएं।</li>";
  }
};

/* ============================================================================
 * 8. DIGITAL OPD PRESCRIPTION ENGINE
 * ============================================================================ */

window.captureGPSLocation = function () {
  const gpsInput = document.getElementById("opdGPS");
  const btn = document.getElementById("btnGPS");

  if (!navigator.geolocation) {
    alert("GPS समर्थित नहीं है।");
    return;
  }
  if (btn) btn.textContent = "⏳...";
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      if (gpsInput) {
        gpsInput.value =
          pos.coords.latitude.toFixed(5) + ", " + pos.coords.longitude.toFixed(5);
      }
      if (btn) btn.textContent = "✅ GPS";
    },
    function () {
      alert("GPS लोकेशन प्राप्त करने में विफल।");
      if (btn) btn.textContent = "📍 GPS";
    }
  );
};

window.clearRxField = function () {
  const rx = document.getElementById("opdMedicine");
  if (rx) rx.value = "";
};

window.calculateDue = function () {
  const total = parseFloat((document.getElementById("opdTotalFee") || {}).value || "0") || 0;
  const paid = parseFloat((document.getElementById("opdPaidFee") || {}).value || "0") || 0;
  const dueEl = document.getElementById("opdDueFee");
  if (dueEl) dueEl.value = Math.max(0, total - paid);
};

window.dispatchWhatsAppRx = function () {
  const name = (document.getElementById("opdFarmerName") || {}).value || "";
  const phone = (document.getElementById("opdFarmerPhone") || {}).value || "";
  const diag = (document.getElementById("opdDiagnosis") || {}).value || "";
  const rx = (document.getElementById("opdMedicine") || {}).value || "";

  if (!name || !phone || !diag || !rx) {
    alert("कृपया किसान का नाम, 10-अंकीय मोबाइल नंबर, रोग निदान व दवा विवरण भरें।");
    return;
  }

  const village = (document.getElementById("opdVillage") || {}).value || "";
  const animal = (document.getElementById("opdAnimal") || {}).value || "पशु";
  const total = (document.getElementById("opdTotalFee") || {}).value || "0";
  const paid = (document.getElementById("opdPaidFee") || {}).value || "0";
  const due = (document.getElementById("opdDueFee") || {}).value || "0";
  const docReg = localStorage.getItem("vetcare_doc_reg") || "VCI-REGISTERED";

  let msg = "🐾 *डिजिटल पशु चिकित्सा पर्ची (OPD Rx Slip)* 🐾\n";
  msg += "━━━━━━━━━━━━━━━━━━━━\n";
  msg += "👨‍⚕️ *पंजीकृत चिकित्सक (VCI Reg):* " + docReg + "\n";
  msg += "📅 *दिनांक:* " + new Date().toLocaleDateString("hi-IN") + "\n";
  msg += "👤 *पशुपालक:* " + name + " (" + village + ")\n";
  msg += "🐄 *रोगी पशु:* " + animal + "\n";
  msg += "🩺 *डायग्नोसिस (निदान):* " + diag + "\n";
  msg += "━━━━━━━━━━━━━━━━━━━━\n";
  msg += "💊 *औषधियां एवं खुराक (Rx):*\n" + rx + "\n";
  msg += "━━━━━━━━━━━━━━━━━━━━\n";
  msg += "💰 *फीस विवरण:* कुल ₹" + total + " | जमा: ₹" + paid + " | बकाया: ₹" + due + "\n";
  msg += "🚀 *Powered by Vetcare AI OS*";

  // Auto-save case
  const cases = JSON.parse(localStorage.getItem("vetcare_opd_cases") || "[]");
  cases.unshift({
    id: "CASE_" + Date.now(),
    farmerName: name,
    phone: phone,
    village: village,
    animal: animal,
    diagnosis: diag,
    medicine: rx,
    totalFee: total,
    paidFee: paid,
    dueFee: due,
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem("vetcare_opd_cases", JSON.stringify(cases));

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const targetPhone = cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone;
  window.open("https://wa.me/" + targetPhone + "?text=" + encodeURIComponent(msg), "_blank");
};

window.saveOfflineCaseDirectly = function () {
  const name = (document.getElementById("opdFarmerName") || {}).value || "";
  const phone = (document.getElementById("opdFarmerPhone") || {}).value || "";
  const diag = (document.getElementById("opdDiagnosis") || {}).value || "";

  if (!name || !phone || !diag) {
    alert("कृपया आवश्यक विवरण भरें।");
    return;
  }

  const cases = JSON.parse(localStorage.getItem("vetcare_opd_cases") || "[]");
  cases.unshift({
    id: "CASE_" + Date.now(),
    farmerName: name,
    phone: phone,
    village: (document.getElementById("opdVillage") || {}).value || "",
    animal: (document.getElementById("opdAnimal") || {}).value || "पशु",
    diagnosis: diag,
    medicine: (document.getElementById("opdMedicine") || {}).value || "",
    totalFee: (document.getElementById("opdTotalFee") || {}).value || "0",
    paidFee: (document.getElementById("opdPaidFee") || {}).value || "0",
    dueFee: (document.getElementById("opdDueFee") || {}).value || "0",
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem("vetcare_opd_cases", JSON.stringify(cases));
  alert("✅ केस रिकॉर्ड स्थानीय रूप से सुरक्षित कर लिया गया है।");
};

window.printCurrentOPDSlip = function () {
  const printArea = document.getElementById("printableSlipArea");
  if (!printArea) return;

  const name = (document.getElementById("opdFarmerName") || {}).value || "-";
  const phone = (document.getElementById("opdFarmerPhone") || {}).value || "-";
  const diag = (document.getElementById("opdDiagnosis") || {}).value || "-";
  const rx = (document.getElementById("opdMedicine") || {}).value || "-";
  const docReg = localStorage.getItem("vetcare_doc_reg") || "VCI-REGISTERED";

  printArea.innerHTML =
    '<div style="border: 2px solid #000; padding: 20px; font-family: sans-serif;">' +
    '  <h2 style="text-align: center; margin: 0;">VETCARE CLINICAL OPD PRESCRIPTION</h2>' +
    '  <p style="text-align: center; margin: 4px 0; font-size: 11px;">Reg. No: ' + docReg + ' | Date: ' + new Date().toLocaleDateString("hi-IN") + "</p>" +
    "  <hr/>" +
    "  <p><strong>किसान:</strong> " + name + " | <strong>फोन:</strong> " + phone + "</p>" +
    "  <p><strong>निदान:</strong> " + diag + "</p>" +
    '  <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;"><pre style="font-family: monospace;">' + rx + "</pre></div>" +
    '  <p style="text-align: right; margin-top: 40px;">हस्ताक्षर: ___________________________</p>' +
    "</div>";

  window.print();
};

/* ============================================================================
 * 9. SAVED CASE RECORDS
 * ============================================================================ */

window.renderCaseRecords = function (filteredCases) {
  const list = document.getElementById("recordsList");
  const badge = document.getElementById("recordTotalBadge");
  if (!list) return;

  const cases = filteredCases || JSON.parse(localStorage.getItem("vetcare_opd_cases") || "[]");
  if (badge) badge.textContent = cases.length + " केस सुरक्षित";

  if (cases.length === 0) {
    list.innerHTML =
      '<div class="p-4 text-center text-slate-400 bg-white border border-slate-200 rounded-xl text-xs">कोई रिकॉर्ड नहीं मिला।</div>';
    return;
  }

  let html = "";
  cases.forEach(function (c) {
    html += '<div class="bg-white border border-slate-200 rounded-2xl p-3 space-y-1.5 shadow-xs text-xs">';
    html += '  <div class="flex justify-between font-bold text-slate-900">';
    html += "    <span>" + c.farmerName + " (" + (c.animal || "पशु") + ")</span>";
    html += '    <span class="text-rose-600">बकाया: ₹' + (c.dueFee || "0") + "</span>";
    html += "  </div>";
    html += '  <p class="text-slate-500 text-[11px] font-mono">' + c.diagnosis + " • " + c.timestamp + "</p>";
    html += "</div>";
  });
  list.innerHTML = html;
};

window.handleRecordSearch = function () {
  const query = (document.getElementById("searchRecordsInput") || {}).value || "";
  const cases = JSON.parse(localStorage.getItem("vetcare_opd_cases") || "[]");
  const filtered = cases.filter(function (c) {
    return (
      c.farmerName.toLowerCase().includes(query.toLowerCase()) ||
      (c.phone && c.phone.includes(query))
    );
  });
  window.renderCaseRecords(filtered);
};

/* ============================================================================
 * 10. AI VET CONSULTANT (GEMINI FLASH INTEGRATION)
 * ============================================================================ */

window.openAIKeyModal = function () {
  const key = localStorage.getItem("vetcare_gemini_api_key") || "";
  const input = document.getElementById("inputGeminiKey");
  if (input) input.value = key;
  const modal = document.getElementById("modalAIKey");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeAIKeyModal = function () {
  const modal = document.getElementById("modalAIKey");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.saveGeminiKey = function () {
  const input = document.getElementById("inputGeminiKey");
  const key = input ? input.value.trim() : "";
  if (!key) {
    alert("कृपया वैध Gemini API Key दर्ज करें।");
    return;
  }
  localStorage.setItem("vetcare_gemini_api_key", key);
  alert("✅ Gemini API Key सुरक्षित कर ली गई है।");
  window.closeAIKeyModal();
};

window.sendCaseToAIConsultant = function () {
  const diag = (document.getElementById("opdDiagnosis") || {}).value || "";
  const rx = (document.getElementById("opdMedicine") || {}).value || "";
  const prompt = "निदान: " + diag + "\nवर्तमान दवाएं: " + rx + "\nकृपया इस केस पर सेकंड ओपिनियन दें।";

  const aiInput = document.getElementById("aiInputPrompt");
  if (aiInput) aiInput.value = prompt;
  window.switchTab("ai");
};

window.runAIConsultant = function () {
  const promptInput = document.getElementById("aiInputPrompt");
  const outArea = document.getElementById("aiOutputArea");
  const btn = document.getElementById("btnRunAI");
  const apiKey = localStorage.getItem("vetcare_gemini_api_key");

  const prompt = promptInput ? promptInput.value.trim() : "";
  if (!prompt) {
    alert("कृपया केस हिस्ट्री व लक्षण विवरण दर्ज करें।");
    return;
  }
  if (!apiKey) {
    alert("कृपया पहले अपनी Gemini API Key दर्ज करें।");
    window.openAIKeyModal();
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ AI विश्लेषण जारी है...";
  }
  if (outArea) {
    outArea.classList.remove("hidden");
    outArea.style.display = "block";
    outArea.textContent = "AI वेटरनरी विशेषज्ञ विश्लेषण कर रहे हैं...";
  }

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "You are a Senior Veterinary Clinical Specialist. Provide scientifically accurate clinical advice in Hindi.\n\nCase:\n" +
                  prompt
              }
            ]
          }
        ]
      })
    }
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
      }
      const reply =
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts[0].text
          ? data.candidates[0].content.parts[0].text
          : "AI उत्तर प्राप्त नहीं हो सका।";
      if (outArea) outArea.textContent = reply;
    })
    .catch(function (err) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
      }
      if (outArea) outArea.textContent = "त्रुटि: " + err.message;
    });
};

/* ============================================================================
 * 11. KHATA BAHI (LEDGER) & INVENTORY STOCK
 * ============================================================================ */

window.openNewKhataModal = function () {
  const modal = document.getElementById("modalNewKhata");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeNewKhataModal = function () {
  const modal = document.getElementById("modalNewKhata");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.saveNewKhataRecord = function () {
  const name = (document.getElementById("khataFarmerName") || {}).value || "";
  const amt = parseFloat((document.getElementById("khataAmount") || {}).value || "0") || 0;
  const type = (document.getElementById("khataType") || {}).value || "DUE";

  if (!name || amt <= 0) {
    alert("कृपया वैध नाम और राशि भरें।");
    return;
  }

  const records = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  records.unshift({
    id: "KH_" + Date.now(),
    farmerName: name,
    phone: (document.getElementById("khataFarmerPhone") || {}).value || "",
    amount: amt,
    type: type,
    note: (document.getElementById("khataNote") || {}).value || "",
    timestamp: new Date().toLocaleDateString()
  });
  localStorage.setItem("vetcare_khata_records", JSON.stringify(records));

  window.closeNewKhataModal();
  window.renderKhataList();
};

window.renderKhataList = function () {
  const list = document.getElementById("finDueList");
  const creditEl = document.getElementById("finCredit");
  const debitEl = document.getElementById("finDebit");
  if (!list) return;

  const records = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  let credit = 0;
  let debit = 0;

  records.forEach(function (r) {
    if (r.type === "PAID") credit += r.amount;
    else debit += r.amount;
  });

  if (creditEl) creditEl.textContent = "₹" + credit.toLocaleString();
  if (debitEl) debitEl.textContent = "₹" + debit.toLocaleString();

  if (records.length === 0) {
    list.innerHTML =
      '<div class="p-4 text-center text-slate-400 bg-slate-50 rounded-xl text-xs">कोई लेन-देन नहीं है।</div>';
    return;
  }

  let html = "";
  records.forEach(function (r) {
    const isPaid = r.type === "PAID";
    html += '<div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">';
    html += "  <div><strong>" + r.farmerName + "</strong><span class='block text-slate-400 text-[10px]'>" + r.timestamp + "</span></div>";
    html += '  <span class="font-bold ' + (isPaid ? "text-emerald-700" : "text-rose-700") + '">';
    html += (isPaid ? "+ ₹" : "- ₹") + r.amount;
    html += "  </span>";
    html += "</div>";
  });
  list.innerHTML = html;
};

window.openNewInventoryItemModal = function () {
  const modal = document.getElementById("modalNewInventory");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeNewInventoryModal = function () {
  const modal = document.getElementById("modalNewInventory");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.saveNewInventoryItem = function () {
  const name = (document.getElementById("invItemName") || {}).value || "";
  const stock = parseFloat((document.getElementById("invItemStock") || {}).value || "0") || 0;

  if (!name) {
    alert("कृपया नाम भरें।");
    return;
  }

  const items = JSON.parse(
    localStorage.getItem("vetcare_inventory_stock") ||
      JSON.stringify([
        { id: "1", name: "Inj. Intacef Tazo (3375mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
        { id: "2", name: "Murrah Buffalo Semen Straw (M-29)", category: "SEMEN", stock: 15, minAlert: 5, unit: "straws" }
      ])
  );

  items.unshift({
    id: "INV_" + Date.now(),
    name: name,
    category: (document.getElementById("invItemCategory") || {}).value || "INJECTION",
    stock: stock,
    minAlert: parseFloat((document.getElementById("invItemMinAlert") || {}).value || "3") || 3,
    unit: (document.getElementById("invItemUnit") || {}).value || "vials"
  });
  localStorage.setItem("vetcare_inventory_stock", JSON.stringify(items));

  window.closeNewInventoryModal();
  window.renderInventory();
};

window.renderInventory = function () {
  const container = document.getElementById("inventoryItemsContainer");
  if (!container) return;

  const items = JSON.parse(
    localStorage.getItem("vetcare_inventory_stock") ||
      JSON.stringify([
        { id: "1", name: "Inj. Intacef Tazo (3375mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
        { id: "2", name: "Murrah Buffalo Semen Straw (M-29)", category: "SEMEN", stock: 15, minAlert: 5, unit: "straws" }
      ])
  );

  let html = "";
  items.forEach(function (item) {
    html += '<div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">';
    html += "  <div><strong>" + item.name + "</strong><span class='block text-slate-400 text-[10px]'>" + item.category + "</span></div>";
    html += "  <div class='flex items-center gap-2'>";
    html += '    <button onclick="window.updateStockQty(\'' + item.id + '\', -1)" class="w-6 h-6 bg-white border rounded font-bold cursor-pointer">-</button>';
    html += "    <strong class='font-mono'>" + item.stock + "</strong>";
    html += '    <button onclick="window.updateStockQty(\'' + item.id + '\', 1)" class="w-6 h-6 bg-white border rounded font-bold cursor-pointer">+</button>';
    html += "  </div>";
    html += "</div>";
  });
  container.innerHTML = html;
};

window.updateStockQty = function (id, delta) {
  const items = JSON.parse(localStorage.getItem("vetcare_inventory_stock") || "[]");
  const item = items.find(function (i) {
    return i.id === id;
  });
  if (item) {
    item.stock = Math.max(0, item.stock + delta);
    localStorage.setItem("vetcare_inventory_stock", JSON.stringify(items));
    window.renderInventory();
  }
};

window.filterInventoryCategory = function (cat) {
  window.renderInventory();
};

/* ============================================================================
 * 12. DUAL BANK MONETIZATION & QR GENERATOR
 * ============================================================================ */

let currentSelectedPlan = "MONTHLY";
let currentSelectedBank = "SBI";

window.openPremiumPaymentModal = function () {
  window.selectPaymentPlan(currentSelectedPlan);
  const modal = document.getElementById("modalPremiumPayment");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closePremiumPaymentModal = function () {
  const modal = document.getElementById("modalPremiumPayment");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.selectPaymentPlan = function (plan) {
  currentSelectedPlan = plan;
  const isMonthly = plan === "MONTHLY";
  const price = isMonthly ? MASTER_CONFIG.pricing.monthly : MASTER_CONFIG.pricing.annual;

  const btnM = document.getElementById("btnPlanMonthly");
  const btnA = document.getElementById("btnPlanAnnual");
  if (btnM && btnA) {
    btnM.className = isMonthly
      ? "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition cursor-pointer"
      : "py-2 rounded-xl text-slate-700 font-medium text-center transition cursor-pointer";
    btnA.className = isMonthly
      ? "py-2 rounded-xl text-slate-700 font-medium text-center transition cursor-pointer"
      : "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition cursor-pointer";
  }

  const directAmt = document.getElementById("directUPIAmount");
  if (directAmt) directAmt.textContent = price;

  window.updatePaymentQR(price);
};

window.switchBankTab = function (bank) {
  currentSelectedBank = bank;
  const isSbi = bank === "SBI";
  const bankObj = isSbi ? MASTER_CONFIG.sbiPrimary : MASTER_CONFIG.pnbBackup;

  const btnS = document.getElementById("btnTabSBI");
  const btnP = document.getElementById("btnTabPNB");
  if (btnS && btnP) {
    btnS.className = isSbi
      ? "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition cursor-pointer"
      : "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition cursor-pointer";
    btnP.className = isSbi
      ? "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition cursor-pointer"
      : "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition cursor-pointer";
  }

  if (document.getElementById("dispPayeeName")) {
    document.getElementById("dispPayeeName").textContent = MASTER_CONFIG.payeeName;
  }
  if (document.getElementById("dispUPIId")) {
    document.getElementById("dispUPIId").textContent = bankObj.upiId;
  }
  if (document.getElementById("dispAccountNumber")) {
    document.getElementById("dispAccountNumber").textContent = bankObj.accountNumber;
  }
  if (document.getElementById("dispIFSC")) {
    document.getElementById("dispIFSC").textContent = bankObj.ifsc;
  }

  const price =
    currentSelectedPlan === "MONTHLY"
      ? MASTER_CONFIG.pricing.monthly
      : MASTER_CONFIG.pricing.annual;
  window.updatePaymentQR(price);
};

window.updatePaymentQR = function (amount) {
  const bankObj =
    currentSelectedBank === "SBI" ? MASTER_CONFIG.sbiPrimary : MASTER_CONFIG.pnbBackup;
  const upiUri =
    "upi://pay?pa=" +
    bankObj.upiId +
    "&pn=" +
    encodeURIComponent(MASTER_CONFIG.payeeName) +
    "&am=" +
    amount +
    "&cu=INR&tn=Vetcare%20Premium";

  const qrImg = document.getElementById("dynamicQRImage");
  if (qrImg) {
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
      encodeURIComponent(upiUri);
  }

  const directLink = document.getElementById("btnDirectUPILink");
  if (directLink) directLink.href = upiUri;
};

window.sendPaymentProofWhatsApp = function () {
  const price =
    currentSelectedPlan === "MONTHLY"
      ? MASTER_CONFIG.pricing.monthly
      : MASTER_CONFIG.pricing.annual;
  const phone = localStorage.getItem("vetcare_user_phone") || "नया यूजर";
  const msg =
    "नमस्ते एडमिन! मैंने Vetcare AI OS प्रीमियम प्लान हेतु ₹" +
    price +
    " का भुगतान कर दिया है।\nमोबाइल: " +
    phone +
    "\nकृपया खाता सक्रिय करें।";

  window.open(
    "https://wa.me/91" + MASTER_CONFIG.adminWhatsApp + "?text=" + encodeURIComponent(msg),
    "_blank"
  );
};

window.escalateToAdminWhatsApp = function () {
  window.open("https://wa.me/91" + MASTER_CONFIG.adminWhatsApp, "_blank");
};

/* ============================================================================
 * 13. ADMIN CONTROL & SETTINGS
 * ============================================================================ */

window.openAdminPinModal = function () {
  const pinInput = document.getElementById("inputAdminPIN");
  if (pinInput) pinInput.value = "";
  const err = document.getElementById("pinErrorMessage");
  if (err) {
    err.classList.add("hidden");
    err.style.display = "none";
  }
  const modal = document.getElementById("modalAdminPIN");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeAdminPinModal = function () {
  const modal = document.getElementById("modalAdminPIN");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.verifyAdminPIN = function () {
  const pin = (document.getElementById("inputAdminPIN") || {}).value || "";
  if (pin === MASTER_CONFIG.masterPin) {
    window.closeAdminPinModal();
    const dash = document.getElementById("modalAdminDashboard");
    if (dash) {
      dash.classList.remove("hidden");
      dash.style.display = "flex";
    }
    window.populateAdminDashboard();
  } else {
    const err = document.getElementById("pinErrorMessage");
    if (err) {
      err.classList.remove("hidden");
      err.style.display = "block";
    }
  }
};

window.closeAdminDashboard = function () {
  const dash = document.getElementById("modalAdminDashboard");
  if (dash) {
    dash.classList.add("hidden");
    dash.style.display = "none";
  }
};

window.populateAdminDashboard = function () {
  if (document.getElementById("cfgPayeeName")) {
    document.getElementById("cfgPayeeName").value = MASTER_CONFIG.payeeName;
  }
  if (document.getElementById("cfgMonthlyPrice")) {
    document.getElementById("cfgMonthlyPrice").value = MASTER_CONFIG.pricing.monthly;
  }
  if (document.getElementById("cfgAnnualPrice")) {
    document.getElementById("cfgAnnualPrice").value = MASTER_CONFIG.pricing.annual;
  }
  if (document.getElementById("cfgSbiUpi")) {
    document.getElementById("cfgSbiUpi").value = MASTER_CONFIG.sbiPrimary.upiId;
  }
  if (document.getElementById("cfgSbiAccount")) {
    document.getElementById("cfgSbiAccount").value = MASTER_CONFIG.sbiPrimary.accountNumber;
  }
  if (document.getElementById("cfgSbiIfsc")) {
    document.getElementById("cfgSbiIfsc").value = MASTER_CONFIG.sbiPrimary.ifsc;
  }
  if (document.getElementById("cfgPnbUpi")) {
    document.getElementById("cfgPnbUpi").value = MASTER_CONFIG.pnbBackup.upiId;
  }
  if (document.getElementById("cfgPnbAccount")) {
    document.getElementById("cfgPnbAccount").value = MASTER_CONFIG.pnbBackup.accountNumber;
  }
  if (document.getElementById("cfgPnbIfsc")) {
    document.getElementById("cfgPnbIfsc").value = MASTER_CONFIG.pnbBackup.ifsc;
  }
  if (document.getElementById("cfgAdminWhatsApp")) {
    document.getElementById("cfgAdminWhatsApp").value = MASTER_CONFIG.adminWhatsApp;
  }
  if (document.getElementById("cfgAdminPIN")) {
    document.getElementById("cfgAdminPIN").value = MASTER_CONFIG.masterPin;
  }
};

window.switchAdminTab = function (tab) {
  ["PAYMENT", "BRANDING", "SUPPORT", "METRICS"].forEach(function (t) {
    const panel = document.getElementById("adminPanel" + t.charAt(0) + t.slice(1).toLowerCase());
    if (panel) panel.style.display = t === tab ? "block" : "none";
  });
};

window.saveAllAdminSettings = function () {
  if (document.getElementById("cfgPayeeName")) {
    MASTER_CONFIG.payeeName = document.getElementById("cfgPayeeName").value.trim();
  }
  if (document.getElementById("cfgMonthlyPrice")) {
    MASTER_CONFIG.pricing.monthly =
      parseFloat(document.getElementById("cfgMonthlyPrice").value) || 199;
  }
  if (document.getElementById("cfgAnnualPrice")) {
    MASTER_CONFIG.pricing.annual =
      parseFloat(document.getElementById("cfgAnnualPrice").value) || 1499;
  }
  if (document.getElementById("cfgSbiUpi")) {
    MASTER_CONFIG.sbiPrimary.upiId = document.getElementById("cfgSbiUpi").value.trim();
  }
  if (document.getElementById("cfgSbiAccount")) {
    MASTER_CONFIG.sbiPrimary.accountNumber = document.getElementById("cfgSbiAccount").value.trim();
  }
  if (document.getElementById("cfgSbiIfsc")) {
    MASTER_CONFIG.sbiPrimary.ifsc = document.getElementById("cfgSbiIfsc").value.trim();
  }
  if (document.getElementById("cfgPnbUpi")) {
    MASTER_CONFIG.pnbBackup.upiId = document.getElementById("cfgPnbUpi").value.trim();
  }
  if (document.getElementById("cfgPnbAccount")) {
    MASTER_CONFIG.pnbBackup.accountNumber = document.getElementById("cfgPnbAccount").value.trim();
  }
  if (document.getElementById("cfgPnbIfsc")) {
    MASTER_CONFIG.pnbBackup.ifsc = document.getElementById("cfgPnbIfsc").value.trim();
  }
  if (document.getElementById("cfgAdminWhatsApp")) {
    MASTER_CONFIG.adminWhatsApp = document.getElementById("cfgAdminWhatsApp").value.trim();
  }
  if (document.getElementById("cfgAdminPIN")) {
    const pin = document.getElementById("cfgAdminPIN").value.trim();
    if (pin.length === 4) MASTER_CONFIG.masterPin = pin;
  }

  alert("✅ सुपर एडमिन सेटिंग्स सुरक्षित कर ली गई हैं।");
  window.closeAdminDashboard();
};

window.exportDataBackupJSON = function () {
  const data = {
    cases: JSON.parse(localStorage.getItem("vetcare_opd_cases") || "[]"),
    khata: JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]"),
    inventory: JSON.parse(localStorage.getItem("vetcare_inventory_stock") || "[]")
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "vetcare_backup.json";
  a.click();
};

window.clearDemoDataOnly = function () {
  if (confirm("क्या आप टेस्ट डेटा साफ़ करना चाहते हैं?")) {
    localStorage.removeItem("vetcare_opd_cases");
    localStorage.removeItem("vetcare_khata_records");
    window.renderCaseRecords();
    window.renderKhataList();
    alert("✅ टेस्ट डेटा साफ़ कर दिया गया है।");
  }
};

/* ============================================================================
 * 14. MULTI-LANGUAGE (i18n) ENGINE
 * ============================================================================ */

window.openLanguageModal = function () {
  const modal = document.getElementById("modalLanguageSelector");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
};

window.closeLanguageModal = function () {
  const modal = document.getElementById("modalLanguageSelector");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.setLanguage = function (langCode) {
  localStorage.setItem("vetcare_lang", langCode);
  const dict = (window.VETCARE_TRANSLATIONS || {})[langCode];

  if (dict) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  const labelEl = document.getElementById("currentLangLabel");
  if (labelEl) {
    const map = {
      en: "English",
      hi: "हिन्दी",
      hinglish: "Hinglish",
      pa: "ਪੰਜਾਬੀ",
      mr: "मराठी",
      gu: "ગુજરાતી",
      bn: "বাংলা"
    };
    labelEl.textContent = map[langCode] || "हिन्दी";
  }

  window.closeLanguageModal();
};

/* ============================================================================
 * 15. BOOTSTRAP INITIALIZATION
 * ============================================================================ */

(function autoBootstrapSystem() {
  function boot() {
    console.log("[Vetcare OS] Core engine initialized.");
    const savedLang = localStorage.getItem("vetcare_lang") || "hi";
    if (window.setLanguage) window.setLanguage(savedLang);

    const savedRole = localStorage.getItem("vetcare_registered_role");
    if (savedRole) {
      window.selectRole(savedRole);
    } else {
      const landing =
        document.getElementById("screenGateway") ||
        document.getElementById("role-selection-screen");
      const mainApp =
        document.getElementById("screenMainApp") ||
        document.getElementById("main-app-container");
      if (landing) {
        landing.classList.remove("hidden");
        landing.style.display = "flex";
      }
      if (mainApp) {
        mainApp.classList.add("hidden");
        mainApp.style.display = "none";
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
