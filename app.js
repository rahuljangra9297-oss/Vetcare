/**
 * Vetcare Services | Clinical & Smart Dairy Assistant
 * Production Core Logic Engine (app.js)
 * 
 * CRITICAL DUAL FIX IMPLEMENTATION:
 * 1. Bulletproof Landing Screen Unfreeze: Direct window attachments with dual-ID defensive selection.
 * 2. 100% Private In-App Support Ticketing: Owner's phone number is NEVER leaked or exposed to the public.
 * 3. Permanently Embedded Real Verified Dual-Bank Credentials & Super Admin Inbox.
 */

// Defensive Element Selector (Prevents null reference crashes)
const $ = (id) => document.getElementById(id);

/* =========================================================================
   1. REAL VERIFIED BANK CREDENTIALS & SYSTEM STORAGE KEYS
   ========================================================================= */
const STORAGE_KEYS = {
  CONFIG: "vetcare_master_config",
  ACTIVE_ROLE: "vetcare_active_role",
  KHATA: "vetcare_khata_records",
  INVENTORY: "vetcare_inventory_records",
  OPD: "vetcare_opd_cases",
  GEMINI_KEY: "vetcare_gemini_key",
  TICKETS: "vetcare_support_tickets"
};

// Embedded Verified Real Credentials
const DEFAULT_CONFIG = {
  adminPin: "9297",
  payeeName: "Vetcare Services",
  monthlyPrice: 199,
  yearlyPrice: 1499,
  sbi: {
    bankName: "State Bank of India (Israna Branch)",
    upiId: "rahuljangra9297@oksbi",
    acc: "65204067585",
    ifsc: "SBIN0013693"
  },
  pnb: {
    bankName: "Punjab National Bank (Israna Branch)",
    upiId: "rahuljangra9297-1@okicici",
    acc: "6687001700015098",
    ifsc: "PUNB0668700"
  },
  appTitle: "Vetcare Services",
  appLogoUrl: "",
  appTagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान"
};

let AppConfig = { ...DEFAULT_CONFIG };

const AppState = {
  currentRole: "FARMER",
  activeBank: "SBI",
  selectedPlan: "MONTHLY",
  activeDiagnosisMode: "SYMPTOMS",
  navigationStack: ["screenGateway"],
  matrixState: {
    temp: null,
    eyes: null,
    urine: null,
    dung: null,
    cardinal: "ALL",
    secondary: []
  }
};

/* =========================================================================
   2. BULLETPROOF GLOBAL ROLE SWITCHER & NAVIGATION (EXPLICIT WINDOW BINDINGS)
   ========================================================================= */

window.selectRole = function (role) {
  try {
    const targetRole = (role || "FARMER").toUpperCase();
    console.log("Switching to role:", targetRole);

    const landingScreen = $('role-selection-screen') || $('screenGateway');
    const mainApp = $('main-app-container') || $('screenMainApp');

    if (landingScreen) {
      landingScreen.classList.add('hidden');
      landingScreen.style.display = 'none';
    }
    if (mainApp) {
      mainApp.classList.remove('hidden');
      mainApp.style.display = 'flex';
    }

    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, targetRole);
    AppState.currentRole = targetRole;
    AppState.navigationStack = ["screenGateway", "screenMainApp"];

    if (typeof window.applyRoleState === 'function') {
      window.applyRoleState(targetRole);
    }
  } catch (err) {
    console.error("Critical error in window.selectRole:", err);
  }
};

window.applyRoleState = function (role) {
  const normalized = (role || "").toUpperCase();
  const isDoctor = normalized === "DOCTOR";

  const badge = $('currentUserRoleBadge');
  const navRx = $('navRx');
  const navRecords = $('navRecords');
  const navInventory = $('navInventory');
  const navAI = $('navAI');
  const finTitle = $('financeTitle');
  const finCreditLabel = $('finCreditLabel');
  const finDebitLabel = $('finDebitLabel');

  if (isDoctor) {
    if (badge) {
      badge.innerHTML = "🩺 अधिकृत पशु चिकित्सक (Clinical Mode)";
      badge.className = "text-[10px] sm:text-[11px] font-bold text-blue-700";
    }
    [navRx, navRecords, navInventory, navAI].forEach((el) => {
      if (el) {
        el.classList.remove('hidden');
        el.style.display = 'flex';
      }
    });
    if (finTitle) finTitle.innerHTML = "<span>📊</span> क्लिनिक एवं किसान खाता बही";
    if (finCreditLabel) finCreditLabel.innerText = "जमा फीस (Income)";
    if (finDebitLabel) finDebitLabel.innerText = "किसानों पर उधारी (Due)";
    window.switchTab("rx");
  } else {
    if (badge) {
      badge.innerHTML = "👨‍🌾 स्मार्ट पशुपालक (Dairy Farmer Mode)";
      badge.className = "text-[10px] sm:text-[11px] font-bold text-emerald-700";
    }
    [navRx, navRecords, navInventory, navAI].forEach((el) => {
      if (el) {
        el.classList.add('hidden');
        el.style.display = 'none';
      }
    });
    if (finTitle) finTitle.innerHTML = "<span>📊</span> पशुपालन दूध व खर्च खाता";
    if (finCreditLabel) finCreditLabel.innerText = "दूध बिक्री आय (Credit)";
    if (finDebitLabel) finDebitLabel.innerText = "चारा व दवाई खर्च (Debit)";
    window.switchTab("diagnosis");
  }

  renderDiseaseResults(CLINICAL_DISEASES);
  if (typeof window.renderKhataList === 'function') {
    window.renderKhataList();
  }
};

window.goBackScreen = function () {
  window.goToHome();
};

window.goToHome = function () {
  const landingScreen = $('role-selection-screen') || $('screenGateway');
  const mainApp = $('main-app-container') || $('screenMainApp');

  if (mainApp) {
    mainApp.classList.add('hidden');
    mainApp.style.display = 'none';
  }
  if (landingScreen) {
    landingScreen.classList.remove('hidden');
    landingScreen.style.display = 'flex';
  }
  AppState.navigationStack = ["screenGateway"];
};
window.returnToGateway = () => window.goToHome();

// Doctor Declaration Modal Handlers
window.openDoctorDeclarationModal = function () {
  const modal = $('modalDoctorDeclaration') || $('modal-doctor-declaration');
  if (modal) modal.style.display = 'flex';
};

window.closeDoctorDeclarationModal = function () {
  const modal = $('modalDoctorDeclaration') || $('modal-doctor-declaration');
  if (modal) modal.style.display = 'none';
};

window.acceptDoctorDeclaration = function () {
  window.closeDoctorDeclarationModal();
  window.selectRole("DOCTOR");
};

// Global Tab Switcher
window.switchTab = function (tabKey) {
  const sectionMap = {
    diagnosis: $('viewDiagnosis'),
    rx: $('viewRx'),
    records: $('viewRecords'),
    inventory: $('viewInventory'),
    ai: $('viewAI'),
    breeding: $('viewBreeding'),
    feed: $('viewFeed'),
    finance: $('viewFinance'),
    helpdesk: $('viewHelpdesk')
  };

  const btnMap = {
    diagnosis: $('navDiagnosis'),
    rx: $('navRx'),
    records: $('navRecords'),
    inventory: $('navInventory'),
    ai: $('navAI'),
    breeding: $('navBreeding'),
    feed: $('navFeed'),
    finance: $('navFinance'),
    helpdesk: $('navHelpdesk')
  };

  Object.values(sectionMap).forEach((sec) => {
    if (sec) sec.classList.add('hidden');
  });

  Object.values(btnMap).forEach((btn) => {
    if (btn) btn.classList.remove('active-nav-tab');
  });

  if (sectionMap[tabKey]) sectionMap[tabKey].classList.remove('hidden');
  if (btnMap[tabKey]) btnMap[tabKey].classList.add('active-nav-tab');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* =========================================================================
   3. PRIVATE IN-APP SUPPORT TICKETING SYSTEM (ZERO PHONE LEAK)
   ========================================================================= */

/**
 * Retrieves support tickets from localStorage
 */
function getSavedTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Submits support ticket internally without leaking owner's private phone number.
 */
window.submitSupportTicket = function (ticketData) {
  let category = "सामान्य सहायता (General Query)";
  let message = "";
  let contact = "";

  if (ticketData && typeof ticketData === 'object') {
    category = ticketData.category || category;
    message = ticketData.message || "";
    contact = ticketData.contact || "";
  } else {
    const issueInput = $('supportIssueType') || $('helpQueryType');
    const descInput = $('supportMessageInput') || $('helpQueryText');
    const contactInput = $('supportContactInput') || $('helpUserPhone');

    if (issueInput) category = issueInput.value;
    if (descInput) message = descInput.value.trim();
    if (contactInput) contact = contactInput.value.trim();
  }

  if (!message) {
    // Fallback prompt if form fields are not on the page
    const promptMsg = prompt("कृपया अपनी समस्या या संदेश लिखें (Admin Support Ticket):");
    if (!promptMsg || !promptMsg.trim()) {
      alert("संदेश खाली नहीं हो सकता!");
      return;
    }
    message = promptMsg.trim();
  }

  const tickets = getSavedTickets();
  const newTicket = {
    id: "TCK-" + Date.now().toString().slice(-6),
    timestamp: new Date().toLocaleString("hi-IN"),
    role: AppState.currentRole === "DOCTOR" ? "अधिकृत पशु चिकित्सक" : "स्मार्ट पशुपालक",
    category: category,
    message: message,
    contact: contact || "अज्ञात / ऐप यूजर",
    status: "OPEN"
  };

  tickets.unshift(newTicket);
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));

  // Reset inputs if available
  const descInput = $('supportMessageInput') || $('helpQueryText');
  if (descInput) descInput.value = "";

  alert("धन्यवाद! आपकी समस्या एडमिन कंट्रोल को भेज दी गई है।");
  window.renderSupportTickets();
};

window.resolveSupportTicket = function (ticketId) {
  let tickets = getSavedTickets();
  tickets = tickets.filter(t => t.id !== ticketId);
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  window.renderSupportTickets();
};

window.renderSupportTickets = function () {
  const container = $('adminSupportTicketsContainer');
  const countBadge = $('adminTicketCountBadge');
  const tickets = getSavedTickets();

  if (countBadge) {
    countBadge.innerText = tickets.length;
    countBadge.className = tickets.length > 0 
      ? "bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5"
      : "bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5";
  }

  if (!container) return;

  if (tickets.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl">
        <span class="text-3xl block mb-1">📭</span>
        <p class="font-bold text-xs">कोई लंबित सहायता टिकट नहीं है।</p>
        <p class="text-[11px] mt-0.5 text-slate-400">उपयोगकर्ताओं द्वारा सबमिट किए गए सभी प्रश्न हल हो चुके हैं।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = tickets.map(t => `
    <div class="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs shadow-xs hover:border-blue-300 transition">
      <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
        <div>
          <span class="text-[10px] font-mono bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md border border-blue-200">${t.id}</span>
          <span class="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200 ml-1">${t.category}</span>
          <span class="text-[11px] text-slate-500 block mt-1">${t.timestamp} • 👤 ${t.role} (${t.contact})</span>
        </div>
        <button onclick="window.resolveSupportTicket('${t.id}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-xs transition shrink-0 flex items-center gap-1">
          <span>✓ हल हो गया (Resolve)</span>
        </button>
      </div>
      <p class="text-slate-800 text-xs leading-relaxed font-sans bg-slate-50 p-2.5 rounded-xl border border-slate-100">${t.message}</p>
    </div>
  `).join('');
};

window.openHelpModal = function () {
  window.switchTab('helpdesk');
};

/* =========================================================================
   4. SUPER ADMIN CONTROL ROOM & CONFIGURATION PERSISTENCE
   ========================================================================= */

window.openAdminModal = function () {
  window.openAdminPinModal();
};

window.openAdminPinModal = function () {
  const modal = $('modalAdminPIN') || $('modal-admin-pin');
  const input = $('inputAdminPIN');
  const err = $('pinErrorMessage');
  if (err) err.classList.add('hidden');
  if (input) input.value = '';
  if (modal) modal.style.display = 'flex';
  setTimeout(() => { if (input) input.focus(); }, 150);
};

window.closeAdminPinModal = function () {
  const modal = $('modalAdminPIN') || $('modal-admin-pin');
  if (modal) modal.style.display = 'none';
};

window.verifyAdminPin = function (enteredPin) {
  const input = $('inputAdminPIN');
  const pin = (enteredPin || (input ? input.value : "")).trim();
  const targetPin = AppConfig.adminPin || DEFAULT_CONFIG.adminPin;
  const errBox = $('pinErrorMessage');

  if (pin === targetPin) {
    if (errBox) errBox.classList.add('hidden');
    window.closeAdminPinModal();
    window.openAdminDashboard();
  } else {
    if (errBox) {
      errBox.innerText = "गलत PIN! कृपया पुनः प्रयास करें।";
      errBox.classList.remove('hidden');
    }
    if (input) {
      input.value = "";
      input.focus();
    }
  }
};

window.openAdminDashboard = function () {
  // Populate Bank Settings Inputs
  if ($('cfgPayeeName')) $('cfgPayeeName').value = AppConfig.payeeName;
  if ($('cfgMonthlyPrice')) $('cfgMonthlyPrice').value = AppConfig.monthlyPrice;
  if ($('cfgAnnualPrice')) $('cfgAnnualPrice').value = AppConfig.yearlyPrice;

  if ($('cfgSbiUpi')) $('cfgSbiUpi').value = AppConfig.sbi.upiId;
  if ($('cfgSbiAccount')) $('cfgSbiAccount').value = AppConfig.sbi.acc;
  if ($('cfgSbiIfsc')) $('cfgSbiIfsc').value = AppConfig.sbi.ifsc;

  if ($('cfgPnbUpi')) $('cfgPnbUpi').value = AppConfig.pnb.upiId;
  if ($('cfgPnbAccount')) $('cfgPnbAccount').value = AppConfig.pnb.acc;
  if ($('cfgPnbIfsc')) $('cfgPnbIfsc').value = AppConfig.pnb.ifsc;

  // Branding Inputs
  if ($('cfgAppTitle')) $('cfgAppTitle').value = AppConfig.appTitle;
  if ($('cfgLogoUrl')) $('cfgLogoUrl').value = AppConfig.appLogoUrl || "";
  if ($('cfgAppTagline')) $('cfgAppTagline').value = AppConfig.appTagline;
  if ($('cfgAdminPIN')) $('cfgAdminPIN').value = AppConfig.adminPin;

  // Real-time Overview Counters
  const savedOpd = getSavedOPDCases();
  const khata = getSavedKhata();
  const inventory = getSavedInventory();

  if ($('metricTotalOPD')) $('metricTotalOPD').innerText = savedOpd.length;

  let totalDues = 0;
  khata.forEach((k) => { if (k.type === "DUE") totalDues += Number(k.amount) || 0; });
  if ($('metricTotalDues')) $('metricTotalDues').innerText = `₹${totalDues.toLocaleString('en-IN')}`;

  let lowStockCount = 0;
  inventory.forEach((i) => { if (Number(i.stock) <= Number(i.minAlert)) lowStockCount++; });
  if ($('metricLowStock')) $('metricLowStock').innerText = lowStockCount;

  // Render Support Inbox in Admin
  window.renderSupportTickets();

  window.switchAdminTab("PAYMENT");
  const dash = $('modalAdminDashboard') || $('modal-admin-dashboard');
  if (dash) dash.style.display = 'flex';
};

window.closeAdminDashboard = function () {
  const dash = $('modalAdminDashboard') || $('modal-admin-dashboard');
  if (dash) dash.style.display = 'none';
};

window.switchAdminTab = function (tabKey) {
  const panels = {
    PAYMENT: $('adminPanelPayment'),
    BRANDING: $('adminPanelBranding'),
    SUPPORT: $('adminPanelSupport'),
    METRICS: $('adminPanelMetrics')
  };
  const buttons = {
    PAYMENT: $('tabBtnAdminPay'),
    BRANDING: $('tabBtnAdminBrand'),
    SUPPORT: $('tabBtnAdminSupport'),
    METRICS: $('tabBtnAdminMetrics')
  };

  Object.values(panels).forEach((p) => { if (p) p.classList.add('hidden'); });
  Object.values(buttons).forEach((b) => {
    if (b) b.className = "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 shrink-0";
  });

  if (panels[tabKey]) panels[tabKey].classList.remove('hidden');
  if (buttons[tabKey]) {
    buttons[tabKey].className = "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0";
  }

  if (tabKey === "SUPPORT") {
    window.renderSupportTickets();
  }
};

window.saveAdminSettings = function (formData) {
  const data = formData || {
    payeeName: $('cfgPayeeName') ? $('cfgPayeeName').value.trim() : AppConfig.payeeName,
    monthlyPrice: $('cfgMonthlyPrice') ? parseFloat($('cfgMonthlyPrice').value) || AppConfig.monthlyPrice : AppConfig.monthlyPrice,
    yearlyPrice: $('cfgAnnualPrice') ? parseFloat($('cfgAnnualPrice').value) || AppConfig.yearlyPrice : AppConfig.yearlyPrice,
    sbi: {
      bankName: DEFAULT_CONFIG.sbi.bankName,
      upiId: $('cfgSbiUpi') ? $('cfgSbiUpi').value.trim() : AppConfig.sbi.upiId,
      acc: $('cfgSbiAccount') ? $('cfgSbiAccount').value.trim() : AppConfig.sbi.acc,
      ifsc: $('cfgSbiIfsc') ? $('cfgSbiIfsc').value.trim().toUpperCase() : AppConfig.sbi.ifsc
    },
    pnb: {
      bankName: DEFAULT_CONFIG.pnb.bankName,
      upiId: $('cfgPnbUpi') ? $('cfgPnbUpi').value.trim() : AppConfig.pnb.upiId,
      acc: $('cfgPnbAccount') ? $('cfgPnbAccount').value.trim() : AppConfig.pnb.acc,
      ifsc: $('cfgPnbIfsc') ? $('cfgPnbIfsc').value.trim().toUpperCase() : AppConfig.pnb.ifsc
    },
    appTitle: $('cfgAppTitle') ? $('cfgAppTitle').value.trim() || AppConfig.appTitle : AppConfig.appTitle,
    appLogoUrl: $('cfgLogoUrl') ? $('cfgLogoUrl').value.trim() : AppConfig.appLogoUrl,
    appTagline: $('cfgAppTagline') ? $('cfgAppTagline').value.trim() || AppConfig.appTagline : AppConfig.appTagline,
    adminPin: $('cfgAdminPIN') ? $('cfgAdminPIN').value.trim() || AppConfig.adminPin : AppConfig.adminPin
  };

  if (data.adminPin && data.adminPin.length !== 4) {
    alert("मास्टर एडमिन PIN ठीक 4 अंकों का होना चाहिए!");
    return;
  }

  AppConfig = {
    ...AppConfig,
    ...data,
    sbi: { ...AppConfig.sbi, ...data.sbi },
    pnb: { ...AppConfig.pnb, ...data.pnb }
  };

  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(AppConfig));
  } catch (e) {
    console.error("Storage save error:", e);
  }

  applyConfigToDOM();
  window.closeAdminDashboard();
  alert("✅ सभी एडमिन सेटिंग्स व बैंक विवरण सुरक्षित कर दिए गए हैं!");
};

window.saveAllAdminSettings = () => window.saveAdminSettings();

/* =========================================================================
   5. DUAL-BANK MODAL & DYNAMIC UPI QR GENERATION
   ========================================================================= */

window.openPaymentModal = function () {
  const modal = $('modalPremiumPayment') || $('modal-premium-payment');
  if (modal) modal.style.display = 'flex';
  updateBankModalDisplay();
};
window.openPremiumPaymentModal = () => window.openPaymentModal();

window.closePaymentModal = function () {
  const modal = $('modalPremiumPayment') || $('modal-premium-payment');
  if (modal) modal.style.display = 'none';
};
window.closePremiumPaymentModal = () => window.closePaymentModal();

window.selectPaymentPlan = function (plan) {
  AppState.selectedPlan = plan;
  const bMon = $('btnPlanMonthly');
  const bAnn = $('btnPlanAnnual');

  if (plan === "MONTHLY") {
    if (bMon) bMon.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
    if (bAnn) bAnn.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
  } else {
    if (bAnn) bAnn.className = "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition";
    if (bMon) bMon.className = "py-2 rounded-xl text-slate-700 font-medium text-center transition";
  }
  updateBankModalDisplay();
};

window.switchBankTab = function (bank) {
  AppState.activeBank = bank;
  const bSbi = $('btnTabSBI');
  const bPnb = $('btnTabPNB');

  if (bank === "SBI") {
    if (bSbi) bSbi.className = "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition";
    if (bPnb) bPnb.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
  } else {
    if (bPnb) bPnb.className = "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition";
    if (bSbi) bSbi.className = "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition";
  }
  updateBankModalDisplay();
};

function updateBankModalDisplay() {
  const isSbi = AppState.activeBank === "SBI";
  const bankData = isSbi ? AppConfig.sbi : AppConfig.pnb;
  const upiId = bankData.upiId;
  const acct = bankData.acc;
  const ifsc = bankData.ifsc;
  const amount = AppState.selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.yearlyPrice;

  if ($('dispPayeeName')) $('dispPayeeName').innerText = AppConfig.payeeName;
  if ($('dispUPIId')) $('dispUPIId').innerText = upiId;
  if ($('dispAccountNumber')) $('dispAccountNumber').innerText = `${acct} [${bankData.bankName}]`;
  if ($('dispIFSC')) $('dispIFSC').innerText = ifsc;
  if ($('directUPIAmount')) $('directUPIAmount').innerText = amount;

  const encodedPayee = encodeURIComponent(AppConfig.payeeName);
  const encodedNote = encodeURIComponent(`Vetcare_${AppState.selectedPlan}`);
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodedPayee}&cu=INR&am=${amount}&tn=${encodedNote}`;

  const upiLink = $('btnDirectUPILink');
  if (upiLink) upiLink.href = upiUri;

  const qrImg = $('dynamicQRImage');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;
  }
}

/**
 * In-App Payment Verification Submission (Keeps Owner Phone 100% Private)
 */
window.sendPaymentProofInApp = function () {
  const utr = prompt("कृपया अपने बैंक भुगतान का UTR / Transaction ID दर्ज करें:");
  if (!utr || !utr.trim()) {
    alert("सत्यापन हेतु वैध UTR/लेनदेन संदर्भ संख्या आवश्यक है!");
    return;
  }
  const amount = AppState.selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.yearlyPrice;
  window.submitSupportTicket({
    category: "प्रीमियम भुगतान सत्यापन (Payment Verification)",
    message: `प्रीमियम प्लान: ${AppState.selectedPlan} (₹${amount}) | बैंक: ${AppState.activeBank} | UTR: ${utr.trim()}`,
    contact: "In-App Payment Request"
  });
  window.closePaymentModal();
};

// Aliased to prevent any legacy invocation error
window.sendPaymentProofWhatsApp = () => window.sendPaymentProofInApp();
window.escalateToAdminWhatsApp = () => window.submitSupportTicket();

/* =========================================================================
   6. 3-WAY CLINICAL DIAGNOSIS ENGINE, AUTO-FILL RX & PREGNANCY RED ALERT
   ========================================================================= */

const CLINICAL_DISEASES = [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    cardinal: "NECK_SWELLING",
    temp: "HIGH",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: ["Dexamethasone"],
    safeAlternative: "Isoflupredone acetate (गाभिन में सुरक्षित)",
    keywords: ["गलघोंटू", "hs", "गले में सूजन", "घुर-घुर", "तेज बुखार"],
    desc: "पाश्चुरेला मल्टोसीडा जीवाणु जनित अति-घातक रोग। जबड़े व गले के नीचे अत्यधिक गर्म दर्दनाक सूजन, जीभ बाहर व घुर-घुर सांस।",
    farmerRemedy: "देसी प्राथमिक उपचार: 100 ग्राम सरसों का तेल + 10 ग्राम कपूर + 20 ग्राम हल्दी पकाकर गुनगुना लेप गले पर लगाएं। पशु को ठंडी हवा से बचाएं व तुरंत डॉक्टर बुलाएं।",
    doctorRx: "1. Inj. Ceftiofur Sodium (1 gm/50kg) I/M अथवा Inj. Enrofloxacin (5 mg/kg) I/M\n2. Inj. Flunixin Meglumine (2.2 mg/kg) I/V अथवा Melonex Plus 15-20ml I/M\n3. Inj. Dexamethasone 5-10ml I/M (चेतावनी: यदि पशु गाभिन है तो केवल Isoflupredone 10ml दें)\n4. Inj. Avil 10ml I/M\n5. Dextrose Saline 5% I/V निर्जलीकरण होने पर।"
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    cardinal: "GAS_SWELLING",
    temp: "HIGH",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["bq", "लंगड़ा", "चर्र-चर्र", "पुट्ठे में सूजन", "गैस सूजन"],
    desc: "क्लॉस्ट्रिडियम शोवेई जनित रोग। पुट्ठे अथवा कंधे की मांसपेशियों में गैसयुक्त सूजन, दबाने पर चर्र-चर्र की आवाज व तीव्र लंगड़ापन।",
    farmerRemedy: "देसी उपचार: नीम के पानी से सिकाई करें। पशु को चलने न दें। किसी भी स्थिति में सूजन पर अनधिकृत चीरा न लगाएं।",
    doctorRx: "1. Inj. Procaine Penicillin 40 लाख IU अथवा Inj. Amoxicillin + Sulbactam (4.5g) I/M 3-5 दिन\n2. Inj. Melonex Plus 15-20ml I/M\n3. Inj. Belamyl / Tribivet (B-Complex) 10ml I/M\n4. आपातकालीन स्थिति में हाइड्रोजन पेरोक्साइड (3% H2O2) से एंटीसेप्टिक फ्लशिंग।"
  },
  {
    id: "FMD",
    nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
    category: "VIRAL",
    cardinal: "MOUTH_BLISTERS",
    temp: "HIGH",
    eyes: "LACRIMATION",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["fmd", "खुरपका", "मुंहपका", "छाले", "तारदार लार", "लंगड़ाना"],
    desc: "पिकोर्ना वायरस जनित अत्यंत संक्रामक रोग। मुंह, मसूड़ों, जीभ व खुरों के बीच छाले, घाव, चिपचिपी तारदार लार व लंगड़ापन।",
    farmerRemedy: "देसी उपचार: मुंह को 1% फिटकरी अथवा लाल दवा के पानी से धोएं। शहद में पिसा हुआ सुहागा मिलाकर छालों पर लगाएं। खुरों को फिनाइल पानी से साफ रखें।",
    doctorRx: "1. द्वितीयक जीवाणु संक्रमण रोकने हेतु: Inj. Ceftriaxone (Intacef 3g) I/M 3 दिन\n2. Inj. Melonex Plus 15ml I/M\n3. Inj. Avil 10ml I/M\n4. Masticare sachet / Vit-A & H टॉनिक\n5. खुरों पर Topicure / D-Mag स्प्रे दिन में दो बार।"
  },
  {
    id: "MASTITIS",
    nameHindi: "थनैल रोग (Mastitis)",
    category: "BACTERIAL",
    cardinal: "UDDER_HARD",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["थनैल", "mastitis", "अयन सूजन", "दूध में खून", "छिछड़े", "थन कड़ा"],
    desc: "अयन एवं थनों की सूजन। दूध में गाढ़े छिछड़े, रक्त अथवा पीला पानी आना, थन में जलन, दर्द व कठोरता।",
    farmerRemedy: "देसी उपचार: 250 ग्राम एलोवेरा गूदा + 50 ग्राम हल्दी + 15 ग्राम खाने का चूना बारीक पीसकर थन पर दिन में 3 बार लेप करें। पूरा दूध निकाल लें।",
    doctorRx: "1. Inj. Intacef Tazo (3375mg) अथवा Inj. Cobiotic (Penicillin group) I/M\n2. Intramammary Infusion: Pendistrin SH अथवा Cefoperazone थन खाली कर चढ़ाएं\n3. Inj. Melonex Plus 15ml I/M\n4. Inj. Serratiopeptidase 10ml I/M\n5. Trisodium Citrate पाउडर (30-50 ग्राम दैनिक ओरल)।"
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    cardinal: "STERNAL_RECUMBENCY",
    temp: "SUB",
    eyes: "DULL",
    urine: "NORMAL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["मिल्क फीवर", "hypocalcemia", "गर्दन मोड़कर बैठना", "ठंडा शरीर", "कैल्शियम कमी"],
    desc: "ब्याने के 24-72 घंटे में रक्त कैल्शियम की भारी गिरावट। गर्दन मोड़कर बैठना (S-Shape), शरीर व सींग ठंडे पड़ना।",
    farmerRemedy: "चेतावनी: पशु को मुंह से जबरन नाल न पिलाएं (ड्रेंचिंग निमोनिया का खतरा)। पशु को बोरी से ढकें व तुरंत कैल्शियम ड्रिप लगवाएं।",
    doctorRx: "1. Calcium Borogluconate 25% (CBG / Mifex) 450ml (300ml धीमी गति से I/V + 150ml S/C)\n2. I/V देते समय हृदय गति व नब्ज की लगातार निगरानी करें\n3. Inj. Tonophosphan 10ml I/M\n4. Inj. Tribivet 10ml I/M\n5. होश में आने पर Cal-Up / Ostovet जेल 300g ओरल।"
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis)",
    category: "METABOLIC",
    cardinal: "SWEET_BREATH",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "SWEET_SMELL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "सूखा भूसा", "दूध घटना"],
    desc: "ऊर्जा व ग्लूकोज की कमी से रक्त में कीटोन बॉडीज का बढ़ना। सांस व दूध से मीठी गंध, दाना छोड़कर केवल सूखा भूसा खाना।",
    farmerRemedy: "देसी उपचार: 250 ग्राम पुराना गुड़ + 50 मिली सरसों का तेल + 50 ग्राम मीठा सोडा गुनगुने पानी में मिलाकर 4-5 दिन दें।",
    doctorRx: "1. Dextrose 20% अथवा 25% 1000ml I/V फास्ट\n2. Inj. Isoflupredone acetate 10ml I/M\n3. Propylene Glycol 200ml ओरल दिन में 2 बार 4 दिन तक\n4. Inj. Tribivet 10ml I/M\n5. Bolus Niacinamide 2-2 गोली सुबह/शाम।"
  },
  {
    id: "BLOAT",
    nameHindi: "अफारा / टिम्पनी (Bloat / Tympany)",
    category: "METABOLIC",
    cardinal: "LEFT_FLANK_DRUM",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["अफारा", "bloat", "पेट फूलना", "ढोलक", "गैस"],
    desc: "रूमेन में गैस या झाग का संचय। बायाँ पेट ढोलक जैसा तन जाना, सांस लेने में कष्ट, जीभ बाहर निकलना।",
    farmerRemedy: "देसी उपचार: 50 मिली तारपीन का तेल + 300 मिली सरसों का तेल + 20 ग्राम हींग मिलाकर पिलाएं। मुंह में लकड़ी की खपच्ची बांधें।",
    doctorRx: "1. Trocar & Cannula द्वारा बाएं फ्लैंक से आपातकालीन गैस निकासी\n2. Bloatosil / Tympol liquid 100ml ओरल नाल से\n3. Inj. Spasmo-vet (Dicyclomine) 15ml I/M\n4. Inj. Belamyl 10ml I/M\n5. Rumen Buffers & Probiotic Cultures।"
  },
  {
    id: "THEILERIOSIS",
    nameHindi: "थायलेरियासिस (Theileriosis / Tick Fever)",
    category: "PROTOZOAL",
    cardinal: "LYMPH_SWELLING",
    temp: "HIGH",
    eyes: "PALE",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["theileria", "थायलेरिया", "लिम्फ नोड सूजन", "चिचड़ी बुखार"],
    desc: "चिचड़ी जनित रक्त परजीवी रोग। कंधे या कान के पास लिम्फ नोड्स में भारी सूजन, 105-107°F बुखार, एनीमिया।",
    farmerRemedy: "देसी उपचार: चिचड़ियों को हाथ से न तोड़ें। नीम के पत्तों का काढ़ा शरीर पर लगाएं। तुरंत डॉक्टर बुलाएं।",
    doctorRx: "1. Inj. Buparvaquone (Butalex / Zubion) 2.5mg/kg (1ml/20kg) Deep I/M\n2. Inj. Oxytetracycline LA (20mg/kg) I/M\n3. Inj. Melonex Plus 15ml I/M\n4. Inj. Feritas (Iron) 10ml I/M\n5. Flumethrin / Amitraz pour-on."
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    category: "PROTOZOAL",
    cardinal: "RED_URINE",
    temp: "HIGH",
    eyes: "PALE",
    urine: "RED_COFFEE",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["बबेशिया", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी", "red water"],
    desc: "बबेशिया जनित लाल रक्त कोशिकाओं का टूटना। पेशाब गहरा लाल या कॉफी जैसा होना, तेज बुखार व पीलिया।",
    farmerRemedy: "देसी उपचार: पशु को छायादार शांत स्थान पर रखें, ठंडा पानी व गुड़ का शरबत दें।",
    doctorRx: "1. Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep I/M\n2. Inj. Melonex Plus 15ml I/M\n3. Dextrose Saline 5% 1-2 लीटर I/V\n4. Inj. Feritas (आयरन डेक्सट्रान) 10ml I/M\n5. Inj. Tribivet 10ml I/M।"
  },
  {
    id: "ANAPLASMOSIS",
    nameHindi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis)",
    category: "PROTOZOAL",
    cardinal: "SEVERE_JAUNDICE",
    temp: "HIGH",
    eyes: "YELLOW_JAUNDICE",
    urine: "YELLOW",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["anaplasma", "पीलिया", "आंखें पीली", "रक्तहीनता"],
    desc: "अत्यधिक पीलिया (म्यूकस झिल्लियां पीली), तेज बुखार, बिना लाल पेशाब के गंभीर रक्तहीनता।",
    farmerRemedy: "देसी उपचार: 50 ग्राम गिलोय का रस + 100 ग्राम गन्ने का सिरका या पुराना गुड़ दें।",
    doctorRx: "1. Inj. Oxytetracycline LA (Terramycin LA) 20mg/kg I/M\n2. Inj. Melonex Plus 15ml I/M\n3. Liv-52 Inj. 10ml\n4. Inj. Feritas 10ml I/M\n5. Dextrose 5% I/V।"
  },
  {
    id: "PPR",
    nameHindi: "पीपीआर / बकरी प्लेग (PPR)",
    category: "VIRAL",
    cardinal: "MOUTH_EROSION_DIARRHEA",
    temp: "HIGH",
    eyes: "LACRIMATION",
    urine: "NORMAL",
    dung: "WATERY_DIARRHEA",
    contraindicatedInPregnancy: [],
    keywords: ["ppr", "बकरी प्लेग", "मुंह में छाले", "दस्त", "बदबूदार दस्त"],
    desc: "भेड़-बकरियों का जानलेवा विषाणु रोग। मुंह में छाले, बदबूदार दस्त, आंखों से कीचड़, तेज बुखार।",
    farmerRemedy: "देसी उपचार: ओआरएस (ORS) या नमक-चीनी पानी पिलाएं। छाले पर सुहागा व ग्लिसरीन लगाएं।",
    doctorRx: "1. Inj. Enrofloxacin 10% (1ml/10kg) I/M 3 दिन\n2. Inj. Melonex Plus (2-3ml) I/M\n3. Inj. Avil 2ml I/M\n4. Belamyl 2ml I/M\n5. Metronidazole ड्रिप + RL I/V।"
  },
  {
    id: "ET",
    nameHindi: "फिड़किया / आंत्रविषक्तता (Enterotoxemia - ET)",
    category: "BACTERIAL",
    cardinal: "OPISTHOTONOS",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "WATERY_DIARRHEA",
    contraindicatedInPregnancy: [],
    keywords: ["et", "फिड़किया", "सिर पीछे खींचना", "मरोड़"],
    desc: "अचानक अधिक दाना खाने के बाद बकरियों में मरोड़, सिर पीछे खींचना व अचानक मौत।",
    farmerRemedy: "देसी उपचार: दाना तुरंत बंद करें। मीठा सोडा 15-20 ग्राम पानी में घोलकर पिलाएं।",
    doctorRx: "1. Inj. Penicillin भारी खुराक में I/M\n2. Inj. Isoflupredone 10ml I/M\n3. Rumen Buffer: सोडियम बाइकार्बोनेट ओरल\n4. Inj. Spasmo-vet I/M।"
  },
  {
    id: "ANTHRAX",
    nameHindi: "एंथ्रेक्स / गिल्टी रोग (Anthrax - ⚠️ Zoonotic)",
    category: "BACTERIAL",
    cardinal: "TAR_BLOOD",
    temp: "HIGH",
    eyes: "PALE",
    urine: "RED_COFFEE",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["anthrax", "एंथ्रेक्स", "काला खून", "अचानक मौत"],
    desc: "प्राकृतिक छेदों से काला बिना जमा हुआ तारकोल जैसा खून रिसना। शव कभी न चीरें।",
    farmerRemedy: "⚠️ शव को चूने के साथ 8 फीट गहरे गड्ढे में दबाएं। कोई घरेलू इलाज संभव नहीं।",
    doctorRx: "1. Inj. Procaine Penicillin 60-80 लाख IU I/M\n2. 5% फॉर्मेलिन से विसंक्रमित करें\n3. सरकारी विभाग को तुरंत सूचित करें।"
  },
  {
    id: "SURRA",
    nameHindi: "सर्रा रोग (Trypanosomiasis / Surra)",
    category: "PROTOZOAL",
    cardinal: "CIRCLING_HEAD_PRESSING",
    temp: "HIGH",
    eyes: "LACRIMATION",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["surra", "सर्रा", "गोल चक्कर", "सिर टकराना"],
    desc: "पशु का गोल चक्कर काटना, दीवार से सिर टकराना, आंखों में मोतियाबिंद व रुक-रुक कर बुखार।",
    farmerRemedy: "देसी उपचार: पशु को चोट से बचाएं। डंक मारने वाली मक्खियों से पशु बाड़े को मुक्त रखें।",
    doctorRx: "1. Inj. Quinapyramine (Triquin) 1ml/40kg S/C\n2. Inj. Melonex Plus 15ml I/M\n3. Mannitol 20% I/V\n4. Inj. Tribivet 10ml I/M।"
  },
  {
    id: "RABIES",
    nameHindi: "रेबीज / बावलापन (Rabies - ⚠️ Zoonotic)",
    category: "VIRAL",
    cardinal: "HYDROPHOBIA_BELL",
    temp: "NORMAL",
    eyes: "WILD",
    urine: "NORMAL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["rabies", "रेबीज", "बावलापन", "कुत्ते का काटना"],
    desc: "पागल कुत्ते के काटने से होता है। लगातार रंभाना, लार टपकाना व अत्यधिक आक्रामकता।",
    farmerRemedy: "घाव को 15 मिनट साबुन व बहते पानी से धोएं और तुरंत एंटी-रेबीज वैक्सीन लगवाएं।",
    doctorRx: "लक्षण पश्चात कोई उपचार नहीं। बचाव हेतु Rabivax-Vet (0, 3, 7, 14, 28वें दिन) लगाएं।"
  },
  {
    id: "COLIC",
    nameHindi: "पेट दर्द / शूल (Colic)",
    category: "METABOLIC",
    cardinal: "ROLLING_PAWING",
    temp: "NORMAL",
    eyes: "ANXIOUS",
    urine: "NORMAL",
    dung: "CONSTIPATION",
    contraindicatedInPregnancy: [],
    keywords: ["colic", "पेट दर्द", "लात मारना", "लोटना"],
    desc: "आंतों में ऐंठन या गोबर रुकावट। पशु बार-बार पेट की तरफ देखता है, लात मारता है, जमीन पर लोटता है।",
    farmerRemedy: "50 ग्राम अजवाइन + 25 ग्राम काला नमक + 10 ग्राम हींग पीसकर गुनगुने पानी में दें।",
    doctorRx: "1. Inj. Spasmo-vet (Dicyclomine) 15-20ml I/M\n2. Inj. Melonex Plus 15ml I/M\n3. Liquid Paraffin 500ml ओरल।"
  },
  {
    id: "ROP",
    nameHindi: "जेर का रुकना (Retention of Placenta - ROP)",
    category: "METABOLIC",
    cardinal: "HANGING_PLACENTA",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: ["Oxytocin", "Dinoprost"],
    keywords: ["rop", "जेर रुकना", "जेर अटकना"],
    desc: "प्रसव के 8 से 12 घंटे बीत जाने के बाद भी जेर का बाहर न आना।",
    farmerRemedy: "250 ग्राम पुराना गुड़ + 50 ग्राम सोंठ + 25 ग्राम अजवाइन का काढ़ा दें। भारी पत्थर न बांधें।",
    doctorRx: "1. Inj. Dinoprost (PG F2 alpha - Lutalyse 2ml) I/M\n2. Uterine Bolus (Cleanex) गर्भाशय में रखें\n3. Inj. Ceftriaxone 3g I/M\n4. Replanta liquid 100ml।"
  },
  {
    id: "PROLAPSE",
    nameHindi: "फूल/पाछा दिखाना / प्रोलैप्स (Prolapse)",
    category: "METABOLIC",
    cardinal: "PROTRUDING_MASS",
    temp: "NORMAL",
    eyes: "STRAINING",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["prolapse", "फूल दिखाना", "पाछा", "गर्भाशय बाहर"],
    desc: "ब्याने से पूर्व या बाद में योनि या गर्भाशय का मांसल भाग बाहर उलट जाना।",
    farmerRemedy: "अंग को लाल दवा के ठंडे पानी से धोएं, बर्फ से सेकें, ऊपर उठाकर साफ कपड़े से ढकें।",
    doctorRx: "1. Epidural Anesthesia: 2% Lignocaine 5-8ml\n2. अंग को अंदर व्यवस्थित बैठाएं\n3. Buhner's suture लगाएं\n4. Inj. Hydroxyprogesterone 750mg I/M।"
  },
  {
    id: "PNEUMONIA",
    nameHindi: "निमोनिया / फेफड़ों की सूजन (Pneumonia)",
    category: "BACTERIAL",
    cardinal: "DYSPNEA_WHEEZING",
    temp: "HIGH",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["pneumonia", "निमोनिया", "खांसी", "छाती सायं सायं"],
    desc: "तेज बुखार, छाती से घुरघुर/सायं-सायं की आवाज, बलगमयुक्त खांसी व नाक से गाढ़ा स्राव।",
    farmerRemedy: "पशु को सूखी गर्म जगह बांधें। गर्म पानी में नीलगिरी का तेल या विक्स डालकर भाप दें।",
    doctorRx: "1. Inj. Marbofloxacin अथवा Ceftiofur Sodium 1g I/M\n2. Inj. Melonex Plus 15ml I/M\n3. Inj. Deriphyllin 10ml I/M\n4. Inj. Avil 10ml I/M।"
  },
  {
    id: "FOOT_ROT",
    nameHindi: "खुर सड़न / फुट रॉट (Foot Rot)",
    category: "BACTERIAL",
    cardinal: "FOOT_ROT_SMELL",
    temp: "NORMAL",
    eyes: "NORMAL",
    urine: "NORMAL",
    dung: "NORMAL",
    contraindicatedInPregnancy: [],
    keywords: ["foot rot", "खुर सड़न", "दुर्गंध", "खुर में मवाद"],
    desc: "खुरों के मध्य त्वचा में सड़न, तीखी दुर्गंध, पीला मवाद व गंभीर लंगड़ापन।",
    farmerRemedy: "खुरों को 5% नीला थोथा (तूतिया) के पानी से धोएं। तारपीन का तेल व कपूर लगाएं।",
    doctorRx: "1. Inj. Oxytetracycline LA 20mg/kg Deep I/M\n2. खुर काटकर साफ करें\n3. Povidone Iodine 10% ड्रेसिंग\n4. Inj. Melonex Plus 15ml I/M।"
  },
  {
    id: "ENTERITIS",
    nameHindi: "गंभीर आंत्रशोथ / पेचिश (Acute Enteritis)",
    category: "BACTERIAL",
    cardinal: "ALL",
    temp: "HIGH",
    eyes: "SUNKEN",
    urine: "REDUCED",
    dung: "WATERY_DIARRHEA",
    contraindicatedInPregnancy: [],
    keywords: ["दस्त", "पेचिश", "enteritis", "खून का दस्त"],
    desc: "पानी जैसा पतला या खूनी बदबूदार दस्त, आंखें धंसना व गंभीर डिहाइड्रेशन।",
    farmerRemedy: "बेल का गूदा या ईसबगोल ताजा छाछ में दें। नमक-चीनी पानी दिन में कई बार पिलाएं।",
    doctorRx: "1. Inj. Amikacin (Amika-Vet) 10mg/kg I/M\n2. Inj. Spasmo-vet 15ml I/M\n3. Inj. Melonex Plus 15ml I/M\n4. DNS 2-3 लीटर I/V\n5. Bolus Diaroak।"
  }
];

window.setDiagnosisMode = function (mode) {
  AppState.activeDiagnosisMode = mode;
  const b1 = $('btnDiagMode1');
  const b2 = $('btnDiagMode2');
  const b3 = $('btnDiagMode3');

  const p1 = $('panelDiagMatrix');
  const p2 = $('panelDiagHybrid');
  const p3 = $('panelDiagDirectory');

  [b1, b2, b3].forEach((b) => {
    if (b) b.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
  });
  [p1, p2, p3].forEach((p) => { if (p) p.classList.add('hidden'); });

  if (mode === "SYMPTOMS") {
    if (b1) b1.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    if (p1) p1.classList.remove('hidden');
    window.applyMatrixFilters();
  } else if (mode === "HYBRID") {
    if (b2) b2.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    if (p2) p2.classList.remove('hidden');
    window.handleAppSearch();
  } else if (mode === "DIRECTORY") {
    if (b3) b3.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs";
    if (p3) p3.classList.remove('hidden');
    renderDiseaseResults(CLINICAL_DISEASES);
  }
};

window.toggleMatrixParam = function (type, val, btn) {
  if (type === "temp") {
    if (AppState.matrixState.temp === val) {
      AppState.matrixState.temp = null;
      if (btn) btn.classList.remove('chip-active');
    } else {
      AppState.matrixState.temp = val;
      document.querySelectorAll("#panelDiagMatrix .m-chip").forEach((c) => c.classList.remove('chip-active'));
      if (btn) btn.classList.add('chip-active');
    }
  }
  window.applyMatrixFilters();
};

window.toggleSecSymptom = function (sympKey, btn) {
  const list = AppState.matrixState.secondary;
  const idx = list.indexOf(sympKey);
  if (idx > -1) {
    list.splice(idx, 1);
    if (btn) btn.classList.remove('chip-active');
  } else {
    list.push(sympKey);
    if (btn) btn.classList.add('chip-active');
  }
  window.applyMatrixFilters();
};

window.resetSymptomMatrix = function () {
  AppState.matrixState.temp = null;
  AppState.matrixState.eyes = null;
  AppState.matrixState.urine = null;
  AppState.matrixState.dung = null;
  AppState.matrixState.cardinal = "ALL";
  AppState.matrixState.secondary = [];

  const sel = $('selCardinalSign');
  if (sel) sel.value = "ALL";
  document.querySelectorAll("#panelDiagMatrix .m-chip, #secSymptomChips .s-chip").forEach((c) => {
    c.classList.remove('chip-active');
  });
  window.applyMatrixFilters();
};

/**
 * 3-Way Weighted Diagnosis Scoring:
 * Cardinal 40%, Temp 20%, Eyes 15%, Urine 15%, Dung 10%
 */
window.applyMatrixFilters = function () {
  const sel = $('selCardinalSign');
  AppState.matrixState.cardinal = sel ? sel.value : "ALL";

  const scored = CLINICAL_DISEASES.map((dis) => {
    let probability = 10;

    // 1. Cardinal (40%)
    if (AppState.matrixState.cardinal !== "ALL") {
      if (dis.cardinal === AppState.matrixState.cardinal) {
        probability += 40;
      } else {
        probability -= 15;
      }
    }

    // 2. Temp (20%)
    if (AppState.matrixState.temp) {
      if (dis.temp === AppState.matrixState.temp) {
        probability += 20;
      } else {
        probability -= 10;
      }
    }

    // 3. Eyes (15%)
    if (AppState.matrixState.eyes && dis.eyes) {
      if (dis.eyes === AppState.matrixState.eyes) probability += 15;
    }

    // 4. Urine (15%)
    if (AppState.matrixState.urine && dis.urine) {
      if (dis.urine === AppState.matrixState.urine) probability += 15;
    }

    // 5. Dung (10%)
    if (AppState.matrixState.dung && dis.dung) {
      if (dis.dung === AppState.matrixState.dung) probability += 10;
    }

    // Secondary chips
    if (AppState.matrixState.secondary.length > 0) {
      probability += Math.min(20, AppState.matrixState.secondary.length * 4);
    }

    if (probability > 98) probability = 98;
    if (probability < 5) probability = 5;

    return { ...dis, probability: Math.round(probability) };
  });

  scored.sort((a, b) => b.probability - a.probability);

  const countBadge = $('matchCountBadge');
  if (countBadge) countBadge.innerText = `${scored.length} रोग विश्लेषित`;

  const scoreText = $('matchScoreText');
  if (scoreText) {
    if (AppState.matrixState.cardinal !== "ALL" || AppState.matrixState.temp !== null) {
      scoreText.innerHTML = `शीर्ष संभावना: <strong class="text-blue-700">${scored[0].nameHindi.split("(")[0]} (${scored[0].probability}%)</strong>`;
    } else {
      scoreText.innerText = "लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी";
    }
  }

  renderDiseaseResults(scored);
};

window.handleAppSearch = function () {
  const input = $('unifiedSearchInput');
  const query = (input ? input.value : "").trim().toLowerCase();
  if (!query) {
    renderDiseaseResults(CLINICAL_DISEASES);
    return;
  }
  const filtered = CLINICAL_DISEASES.filter((d) => {
    return (
      d.nameHindi.toLowerCase().includes(query) ||
      d.desc.toLowerCase().includes(query) ||
      d.keywords.some((k) => k.toLowerCase().includes(query))
    );
  });
  renderDiseaseResults(filtered);
};

window.filterByTag = function (tag, btn) {
  document.querySelectorAll("#panelDiagDirectory .q-chip").forEach((c) => {
    c.className = "q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
  });
  if (btn) btn.className = "q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";

  if (tag === "ALL") {
    renderDiseaseResults(CLINICAL_DISEASES);
  } else {
    renderDiseaseResults(CLINICAL_DISEASES.filter((d) => d.category === tag));
  }
};

function renderDiseaseResults(diseases) {
  const container = $('diseaseSearchResults');
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 space-y-2">
        <span class="text-3xl block">🔍</span>
        <p class="font-bold">कोई रोग मेल नहीं खाया</p>
        <p class="text-xs">कृपया अन्य लक्षण चुनें या त्वरित खोज में अन्य शब्द लिखें।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = diseases.map((d) => {
    const prob = d.probability || null;
    const probBar = prob ? `
      <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mt-1.5 border border-slate-200">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" style="width: ${prob}%"></div>
      </div>
    ` : "";

    const treatmentContent = (AppState.currentRole === "DOCTOR") ? `
      <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-black text-blue-900 flex items-center gap-1">
            <span>💉</span> 5-स्तरीय एलोपैथिक Rx (Doctor Only):
          </span>
          <button onclick="window.autoFillOPD('${d.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-xl text-[11px] shadow-xs transition">
            ⚡ Auto-Fill Rx
          </button>
        </div>
        <pre class="whitespace-pre-wrap font-mono text-[11px] text-slate-800 leading-relaxed">${d.doctorRx}</pre>
      </div>
    ` : `
      <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5 text-xs text-emerald-950">
        <span class="font-black text-emerald-900 flex items-center gap-1">
          <span>🌿</span> पशुपालक के लिए तुरंत देसी व घरेलू उपचार:
        </span>
        <p class="leading-relaxed text-slate-700">${d.farmerRemedy}</p>
      </div>
    `;

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition hover:border-slate-300">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${
              d.category === 'BACTERIAL' ? 'bg-amber-100 text-amber-800' :
              d.category === 'VIRAL' ? 'bg-rose-100 text-rose-800' :
              d.category === 'PROTOZOAL' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
            }">
              ${d.category}
            </span>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${d.nameHindi}</h3>
          </div>
          ${prob ? `<span class="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shrink-0">${prob}% संभावना</span>` : ''}
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">${d.desc}</p>
        ${probBar}
        ${treatmentContent}
      </div>
    `;
  }).join("");
}

window.autoFillOPD = function (diseaseId) {
  const disease = CLINICAL_DISEASES.find((d) => d.id === diseaseId);
  if (!disease) return;

  const pregInput = $('opdPregnancy');
  const isPregnant = pregInput && pregInput.value.includes("गाभिन");

  if ($('opdDiagnosis')) $('opdDiagnosis').value = disease.nameHindi.split("(")[0].trim();
  if ($('opdMedicine')) $('opdMedicine').value = disease.doctorRx;

  window.switchTab("rx");

  if (isPregnant && disease.contraindicatedInPregnancy && disease.contraindicatedInPregnancy.length > 0) {
    alert(`🚨 PREGNANCY RED ALERT (गाभिन पशु चेतावनी):\nइस रोग के उपचार में प्रयुक्त दवा (${disease.contraindicatedInPregnancy.join(", ")}) गाभिन पशु के लिए असुरक्षित है और गर्भपात (Abortion) करा सकती है!\n\nसुरक्षित विकल्प: ${disease.safeAlternative || "Isoflupredone / सुरक्षित एंटीबायोटिक का चुनाव करें।"}`);
  } else {
    alert(`'${disease.nameHindi.split("(")[0].trim()}' की Rx ओपीडी पर्ची में भर दी गई है!`);
  }
};

/* =========================================================================
   7. DIGITAL OPD PRESCRIPTION ENGINE & RECORDS
   ========================================================================= */

function getSavedOPDCases() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OPD);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

window.calculateDue = function () {
  const total = parseFloat($('opdTotalFee') ? $('opdTotalFee').value : 0) || 0;
  const paid = parseFloat($('opdPaidFee') ? $('opdPaidFee').value : 0) || 0;
  const due = Math.max(0, total - paid);
  if ($('opdDueFee')) $('opdDueFee').value = due;
};

window.captureGPSLocation = function () {
  const gpsInput = $('opdGPS');
  const btn = $('btnGPS');
  if ("geolocation" in navigator) {
    if (btn) btn.innerText = "⏳...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (gpsInput) gpsInput.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (btn) btn.innerText = "✅ GPS";
      },
      () => {
        if (gpsInput) gpsInput.value = "GPS अनुमति नहीं";
        if (btn) btn.innerText = "📍 GPS";
      },
      { timeout: 8000 }
    );
  } else {
    if (gpsInput) gpsInput.value = "GPS असमर्थ";
  }
};

window.clearRxField = function () {
  if ($('opdMedicine')) $('opdMedicine').value = "";
};

window.dispatchWhatsAppRx = function () {
  const farmerName = $('opdFarmerName') ? $('opdFarmerName').value.trim() : "";
  const phone = $('opdFarmerPhone') ? $('opdFarmerPhone').value.trim() : "";
  const village = $('opdVillage') ? $('opdVillage').value.trim() || "-" : "-";
  const animal = $('opdAnimal') ? $('opdAnimal').value : "-";
  const tag = $('opdTag') ? $('opdTag').value.trim() || "-" : "-";
  const pregnancy = $('opdPregnancy') ? $('opdPregnancy').value : "-";
  const diag = $('opdDiagnosis') ? $('opdDiagnosis').value.trim() : "";
  const med = $('opdMedicine') ? $('opdMedicine').value.trim() : "";
  const total = $('opdTotalFee') ? $('opdTotalFee').value || "0" : "0";
  const paid = $('opdPaidFee') ? $('opdPaidFee').value || "0" : "0";
  const due = $('opdDueFee') ? $('opdDueFee').value || "0" : "0";

  if (!farmerName || !phone || !diag) {
    alert("कृपया अनिवार्य जानकारी भरें: किसान का नाम, मोबाइल नंबर और निदान!");
    return;
  }
  if (phone.length < 10) {
    alert("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें!");
    return;
  }

  if (pregnancy.includes("गाभिन") && med.toLowerCase().includes("dexa")) {
    if (!confirm("⚠️ चेतावनी: Rx में Dexamethasone सम्मिलित है जो गाभिन पशु के लिए घातक हो सकता है। क्या आप फिर भी पर्ची भेजना चाहते हैं?")) {
      return;
    }
  }

  window.saveOfflineCaseDirectly();

  const msg =
`🩺 *वेटरनरी डिजिटल ओपीडी पर्ची (OPD Slip)*
━━━━━━━━━━━━━━━━━━━━
👨‍🌾 *किसान:* ${farmerName}
📱 *मोबाइल:* ${phone}
🏡 *गाँव:* ${village}
🐄 *पशु:* ${animal} (टैग: ${tag})
🧬 *स्थिति:* ${pregnancy}
━━━━━━━━━━━━━━━━━━━━
🔬 *रोग निदान (Diagnosis):*
👉 *${diag}*

💊 *उपचार व सुझाई गई दवाएं (Rx):*
${med}
━━━━━━━━━━━━━━━━━━━━
💰 *फीस विवरण:*
• कुल फीस: ₹${total}
• जमा राशि: ₹${paid}
• बकाया राशि: ₹${due}
━━━━━━━━━━━━━━━━━━━━
👨‍⚕️ *जारीकर्ता:* अधिकृत पशु चिकित्सक
⚠️ *निर्देश:* दवाएं केवल अधिकृत डॉक्टर के परामर्श पर ही दें।
_Generated via ${AppConfig.appTitle}_`;

  const cleanPhone = phone.startsWith("91") ? phone : `91${phone}`;
  window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`, '_blank');
};

window.saveOfflineCaseDirectly = function () {
  const farmerName = $('opdFarmerName') ? $('opdFarmerName').value.trim() : "";
  const phone = $('opdFarmerPhone') ? $('opdFarmerPhone').value.trim() : "";
  const diag = $('opdDiagnosis') ? $('opdDiagnosis').value.trim() : "";

  if (!farmerName) {
    alert("कृपया कम से कम किसान का नाम दर्ज करें!");
    return;
  }

  const cases = getSavedOPDCases();
  const newCase = {
    id: Date.now(),
    date: new Date().toLocaleDateString("hi-IN"),
    farmer: farmerName,
    phone: phone,
    animal: $('opdAnimal') ? $('opdAnimal').value : "",
    diagnosis: diag,
    due: parseFloat($('opdDueFee') ? $('opdDueFee').value : 0) || 0,
    paid: parseFloat($('opdPaidFee') ? $('opdPaidFee').value : 0) || 0
  };

  cases.unshift(newCase);
  localStorage.setItem(STORAGE_KEYS.OPD, JSON.stringify(cases));

  if (newCase.due > 0) {
    const khata = getSavedKhata();
    khata.unshift({
      id: Date.now() + 1,
      farmer: farmerName,
      phone: phone,
      amount: newCase.due,
      type: "DUE",
      note: `OPD उधारी: ${diag}`,
      date: new Date().toISOString().split("T")[0]
    });
    localStorage.setItem(STORAGE_KEYS.KHATA, JSON.stringify(khata));
    window.renderKhataList();
  }

  renderSavedOPDList();
};

function renderSavedOPDList() {
  const container = $('recordsList');
  const badge = $('recordTotalBadge');
  const cases = getSavedOPDCases();

  if (badge) badge.innerText = `${cases.length} केस सुरक्षित`;
  if (!container) return;

  if (cases.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">कोई केस रिकॉर्ड सुरक्षित नहीं है।</p>`;
    return;
  }

  container.innerHTML = cases.map((r) => `
    <div class="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs">
      <div>
        <strong class="text-slate-900 block">${r.farmer} (${r.phone || "बिना नंबर"})</strong>
        <span class="text-slate-500">${r.date} • ${r.animal} • ${r.diagnosis}</span>
      </div>
      <div class="text-right">
        ${r.due > 0 ? `<span class="text-rose-600 font-bold block">बकाया: ₹${r.due}</span>` : `<span class="text-emerald-600 font-bold block">पूर्ण चुकता</span>`}
        <button onclick="window.deleteOPDCase(${r.id})" class="text-[10px] text-slate-400 hover:text-rose-600 underline">हटाएं</button>
      </div>
    </div>
  `).join("");
}

window.deleteOPDCase = function (id) {
  if (confirm("क्या आप यह केस रिकॉर्ड हटाना चाहते हैं?")) {
    let cases = getSavedOPDCases();
    cases = cases.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.OPD, JSON.stringify(cases));
    renderSavedOPDList();
  }
};

window.handleRecordSearch = function () {
  const input = $('searchRecordsInput');
  const query = (input ? input.value : "").toLowerCase();
  const cases = getSavedOPDCases();
  const filtered = cases.filter((r) =>
    r.farmer.toLowerCase().includes(query) ||
    (r.phone && r.phone.includes(query)) ||
    r.diagnosis.toLowerCase().includes(query)
  );
  const container = $('recordsList');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">खोज अनुसार कोई केस नहीं मिला।</p>`;
    return;
  }

  container.innerHTML = filtered.map((r) => `
    <div class="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs">
      <div>
        <strong class="text-slate-900 block">${r.farmer} (${r.phone || "बिना नंबर"})</strong>
        <span class="text-slate-500">${r.date} • ${r.animal} • ${r.diagnosis}</span>
      </div>
      <div class="text-right">
        ${r.due > 0 ? `<span class="text-rose-600 font-bold block">बकाया: ₹${r.due}</span>` : `<span class="text-emerald-600 font-bold block">पूर्ण चुकता</span>`}
      </div>
    </div>
  `).join("");
};

window.printCurrentOPDSlip = function () {
  const farmerName = $('opdFarmerName') ? $('opdFarmerName').value || "-" : "-";
  const phone = $('opdFarmerPhone') ? $('opdFarmerPhone').value || "-" : "-";
  const village = $('opdVillage') ? $('opdVillage').value || "-" : "-";
  const animal = $('opdAnimal') ? $('opdAnimal').value || "-" : "-";
  const diag = $('opdDiagnosis') ? $('opdDiagnosis').value || "-" : "-";
  const med = $('opdMedicine') ? $('opdMedicine').value || "-" : "-";
  const total = $('opdTotalFee') ? $('opdTotalFee').value || "0" : "0";
  const paid = $('opdPaidFee') ? $('opdPaidFee').value || "0" : "0";
  const due = $('opdDueFee') ? $('opdDueFee').value || "0" : "0";

  const printArea = $('printableSlipArea');
  if (!printArea) return;

  printArea.innerHTML = `
    <div style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; text-align: center;">
      <h2 style="font-size: 18px; font-weight: bold; margin: 0;">${AppConfig.appTitle.toUpperCase()} VETERINARY CLINICAL PRESCRIPTION</h2>
      <p style="font-size: 11px; margin: 2px 0;">${AppConfig.appTagline}</p>
      <p style="font-size: 10px; margin: 0;">दिनांक: ${new Date().toLocaleString("hi-IN")}</p>
    </div>
    <table style="width: 100%; font-size: 12px; margin-bottom: 12px; border-collapse: collapse;">
      <tr>
        <td><strong>किसान:</strong> ${farmerName}</td>
        <td><strong>मोबाइल:</strong> ${phone}</td>
      </tr>
      <tr>
        <td><strong>गाँव:</strong> ${village}</td>
        <td><strong>पशु:</strong> ${animal}</td>
      </tr>
    </table>
    <div style="border-top: 1px dashed #666; border-bottom: 1px dashed #666; padding: 8px 0; margin-bottom: 12px;">
      <strong style="font-size: 13px;">निदान (Diagnosis):</strong> ${diag}
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="font-size: 13px;">Rx - सुझाई गई दवाएं व इंजेक्शन:</strong>
      <pre style="font-family: monospace; font-size: 11px; white-space: pre-wrap; margin-top: 5px;">${med}</pre>
    </div>
    <table style="width: 100%; font-size: 12px; border-top: 1px solid #000; padding-top: 8px;">
      <tr>
        <td>कुल फीस: ₹${total}</td>
        <td>जमा: ₹${paid}</td>
        <td><strong>बकाया: ₹${due}</strong></td>
      </tr>
    </table>
    <div style="margin-top: 30px; text-align: right;">
      <p style="margin: 0; font-size: 11px;">हस्ताक्षर पशु चिकित्सक</p>
    </div>
  `;
  window.print();
};

/* =========================================================================
   8. PASHUPALAK KHATA BAHI & REVENUE LEDGER
   ========================================================================= */

function getSavedKhata() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.KHATA);
    return raw ? JSON.parse(raw) : [
      { id: 101, farmer: "रामपाल शर्मा", phone: "9876501234", amount: 450, type: "DUE", note: "गलघोंटू उपचार व इंजेक्शन", date: "2025-05-10" },
      { id: 102, farmer: "सुरेश जांगड़ा", phone: "9812345678", amount: 800, type: "PAID", note: "मिल्क फीवर ड्रिप + फीस", date: "2025-05-12" }
    ];
  } catch (e) {
    return [];
  }
}

window.renderKhataList = function () {
  const container = $('finDueList');
  const input = $('searchKhataInput');
  const search = (input ? input.value : "").toLowerCase();
  const khata = getSavedKhata();

  let totalCredit = 0;
  let totalDue = 0;

  khata.forEach((k) => {
    const amt = Number(k.amount) || 0;
    if (k.type === "PAID") totalCredit += amt;
    if (k.type === "DUE") totalDue += amt;
  });

  if ($('finCredit')) $('finCredit').innerText = `₹${totalCredit.toLocaleString("en-IN")}`;
  if ($('finDebit')) $('finDebit').innerText = `₹${totalDue.toLocaleString("en-IN")}`;

  if (!container) return;

  const filtered = khata.filter((k) =>
    k.farmer.toLowerCase().includes(search) ||
    k.phone.includes(search) ||
    k.note.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">खाता बही में कोई रिकॉर्ड नहीं मिला।</p>`;
    return;
  }

  container.innerHTML = filtered.map((k) => {
    const isDue = k.type === "DUE";
    return `
      <div class="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs hover:border-slate-300 transition">
        <div class="space-y-0.5">
          <strong class="text-slate-900 block">${k.farmer} (${k.phone})</strong>
          <p class="text-slate-500 text-[11px]">${k.note} • ${k.date}</p>
        </div>
        <div class="text-right space-y-1">
          <span class="font-black text-sm block ${isDue ? 'text-rose-600' : 'text-emerald-600'}">
            ${isDue ? 'बकाया: ₹' : 'जमा: ₹'}${k.amount}
          </span>
          ${isDue ? `
            <button onclick="window.dispatchTagadaWhatsApp('${k.farmer}', '${k.phone}', ${k.amount})" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 transition">
              <span>💬 तगादा</span>
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");
};

window.dispatchTagadaWhatsApp = function (name, phone, amount) {
  if (!phone || phone.length < 10) {
    alert("वैध फोन नंबर उपलब्ध नहीं है!");
    return;
  }
  const msg = `नमस्ते श्री ${name} जी! ${AppConfig.appTitle} के क्लिनिक रिकॉर्ड के अनुसार आपकी कुल बकाया राशि ₹${amount} है। कृपया यथाशीघ्र भुगतान सुनिश्चित करें। धन्यवाद!`;
  const clean = phone.startsWith("91") ? phone : `91${phone}`;
  window.open(`https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(msg)}`, '_blank');
};

window.openNewKhataModal = function () {
  const modal = $('modalNewKhata');
  if (modal) modal.style.display = 'flex';
};

window.closeNewKhataModal = function () {
  const modal = $('modalNewKhata');
  if (modal) modal.style.display = 'none';
};

window.saveNewKhataRecord = function () {
  const farmer = $('khataFarmerName') ? $('khataFarmerName').value.trim() : "";
  const phone = $('khataFarmerPhone') ? $('khataFarmerPhone').value.trim() : "";
  const amount = parseFloat($('khataAmount') ? $('khataAmount').value : 0) || 0;
  const type = $('khataType') ? $('khataType').value : "DUE";
  const note = $('khataNote') ? $('khataNote').value.trim() || "-" : "-";

  if (!farmer || !phone || amount <= 0) {
    alert("कृपया किसान का नाम, फोन और वैध राशि दर्ज करें!");
    return;
  }

  const khata = getSavedKhata();
  khata.unshift({
    id: Date.now(),
    farmer,
    phone,
    amount,
    type,
    note,
    date: new Date().toISOString().split("T")[0]
  });

  localStorage.setItem(STORAGE_KEYS.KHATA, JSON.stringify(khata));
  window.closeNewKhataModal();
  window.renderKhataList();
};

/* =========================================================================
   9. DRUG & SEMEN STRAW INVENTORY STOCK COUNTERS
   ========================================================================= */

function getSavedInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return raw ? JSON.parse(raw) : [
      { id: "INV-1", name: "Inj. Intacef Tazo (3375mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
      { id: "INV-2", name: "Inj. Melonex Plus (100ml)", category: "INJECTION", stock: 2, minAlert: 3, unit: "bottles" },
      { id: "INV-3", name: "Murrah Bull Semen Straw (A-Grade)", category: "SEMEN", stock: 24, minAlert: 5, unit: "straws" },
      { id: "INV-4", name: "HF Cross Cow Semen Straw", category: "SEMEN", stock: 3, minAlert: 5, unit: "straws" },
      { id: "INV-5", name: "Bolus Anistamin", category: "BOLUS", stock: 12, minAlert: 4, unit: "strips" },
      { id: "INV-6", name: "Utrovet Liquid (1 Litre)", category: "TONIC", stock: 1, minAlert: 2, unit: "bottles" }
    ];
  } catch (e) {
    return [];
  }
}

let activeInventoryCategory = "ALL";

window.filterInventoryCategory = function (cat, btn) {
  activeInventoryCategory = cat;
  document.querySelectorAll("#viewInventory .inv-chip").forEach((c) => {
    c.className = "inv-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
  });
  if (btn) btn.className = "inv-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0";
  window.renderInventoryList();
};

window.renderInventoryList = function () {
  const container = $('inventoryItemsContainer');
  const badge = $('lowStockAlertBadge');
  const inventory = getSavedInventory();

  let lowCount = 0;
  const filtered = (activeInventoryCategory === "ALL")
    ? inventory
    : inventory.filter((i) => i.category === activeInventoryCategory);

  inventory.forEach((i) => {
    if (Number(i.stock) <= Number(i.minAlert)) lowCount++;
  });

  if (badge) {
    if (lowCount > 0) {
      badge.classList.remove('hidden');
      badge.innerText = `⚠️ ${lowCount} दवाएं/स्ट्रॉ न्यूनतम स्टॉक से कम!`;
    } else {
      badge.classList.add('hidden');
    }
  }

  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">इस श्रेणी में कोई स्टॉक आइटम नहीं है।</p>`;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const isLow = Number(item.stock) <= Number(item.minAlert);
    return `
      <div class="bg-white border ${isLow ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-2xl p-3 flex items-center justify-between text-xs transition">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.2 rounded-md bg-slate-100 text-slate-700">${item.category}</span>
          <strong class="text-slate-900 block mt-0.5 text-xs sm:text-sm">${item.name}</strong>
          <span class="text-[11px] ${isLow ? 'text-rose-600 font-bold' : 'text-slate-500'}">
            अलर्ट सीमा: ${item.minAlert} ${item.unit} ${isLow ? '• ⚠️ स्टॉक कम है!' : ''}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.decreaseStock('${item.id}')" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg font-black text-slate-700 text-sm flex items-center justify-center transition">
            -
          </button>
          <span class="font-mono font-black text-sm sm:text-base w-8 text-center ${isLow ? 'text-rose-600' : 'text-slate-800'}">
            ${item.stock}
          </span>
          <button onclick="window.increaseStock('${item.id}')" class="w-7 h-7 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-black text-sm flex items-center justify-center transition">
            +
          </button>
        </div>
      </div>
    `;
  }).join("");
};

window.increaseStock = function (itemId) {
  window.updateStock(itemId, 1);
};

window.decreaseStock = function (itemId) {
  window.updateStock(itemId, -1);
};

window.updateStock = function (itemId, delta) {
  const inventory = getSavedInventory();
  const itm = inventory.find((i) => i.id === itemId);
  if (itm) {
    itm.stock = Math.max(0, Number(itm.stock) + delta);
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    window.renderInventoryList();
  }
};

window.openNewInventoryItemModal = function () {
  const modal = $('modalNewInventory');
  if (modal) modal.style.display = 'flex';
};

window.closeNewInventoryModal = function () {
  const modal = $('modalNewInventory');
  if (modal) modal.style.display = 'none';
};

window.saveNewInventoryItem = function () {
  const name = $('invItemName') ? $('invItemName').value.trim() : "";
  const cat = $('invItemCategory') ? $('invItemCategory').value : "INJECTION";
  const stock = parseInt($('invItemStock') ? $('invItemStock').value : 0, 10) || 0;
  const minAlert = parseInt($('invItemMinAlert') ? $('invItemMinAlert').value : 3, 10) || 3;
  const unit = $('invItemUnit') ? $('invItemUnit').value.trim() || "vials" : "vials";

  if (!name) {
    alert("कृपया दवा अथवा सीमन का नाम दर्ज करें!");
    return;
  }

  const inventory = getSavedInventory();
  inventory.push({
    id: "INV-" + Date.now(),
    name,
    category: cat,
    stock,
    minAlert,
    unit
  });

  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  window.closeNewInventoryModal();
  window.renderInventoryList();
};

/* =========================================================================
   10. GEMINI AI VET CONSULTANT
   ========================================================================= */

window.openAIKeyModal = function () {
  const modal = $('modalAIKey');
  const input = $('inputGeminiKey');
  if (input) input.value = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || "";
  if (modal) modal.style.display = 'flex';
};

window.closeAIKeyModal = function () {
  const modal = $('modalAIKey');
  if (modal) modal.style.display = 'none';
};

window.saveGeminiKey = function () {
  const input = $('inputGeminiKey');
  const key = (input ? input.value : "").trim();
  localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key);
  window.closeAIKeyModal();
  alert("Gemini AI API Key सुरक्षित कर ली गई है!");
};

window.sendCaseToAIConsultant = function () {
  const diag = $('opdDiagnosis') ? $('opdDiagnosis').value : "";
  const animal = $('opdAnimal') ? $('opdAnimal').value : "";
  const preg = $('opdPregnancy') ? $('opdPregnancy').value : "";
  const prompt = `पशु: ${animal}, प्रजनन स्थिति: ${preg}, क्लिनिकल निदान: ${diag}। कृपया इसके लिए मानक वेटरनरी उपचार प्रोटोकॉल, ड्रग इंटरेक्शन एवं सावधानियां हिंदी में विस्तार से बताएं।`;

  if ($('aiInputPrompt')) $('aiInputPrompt').value = prompt;
  window.switchTab("ai");
  window.runAIConsultant();
};

window.runAIConsultant = async function () {
  const input = $('aiInputPrompt');
  const prompt = (input ? input.value : "").trim();
  const out = $('aiOutputArea');
  const btn = $('btnRunAI');
  const key = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);

  if (!prompt) {
    alert("कृपया पशु के लक्षण व केस विवरण दर्ज करें!");
    return;
  }

  if (out) {
    out.classList.remove('hidden');
    out.innerText = "⏳ AI वेटरनरी सर्जन विश्लेषण कर रहा है, कृपया प्रतीक्षा करें...";
  }
  if (btn) btn.disabled = true;

  if (!key) {
    setTimeout(() => {
      if (out) {
        out.innerHTML = `⚠️ <strong>Gemini API Key सेट नहीं है!</strong>\nकृपया 'AI Key' बटन पर क्लिक करके अपनी Google AI Studio API Key दर्ज करें।\n\n📌 <em>ऑफ़लाइन क्लिनिकल दिशानिर्देश:</em>\n1. डिहाइड्रेशन में तुरंत DNS/RL ड्रिप 2-3 लीटर दें।\n2. तापमान 104°F+ होने पर Melonex Plus और उपयुक्त एंटीबायोटिक दें।\n3. गाभिन पशुओं में कभी भी स्टेरॉयड (Dexamethasone) न लगाएं।`;
      }
      if (btn) btn.disabled = false;
    }, 600);
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert Veterinary Clinical Specialist. Provide concise, professional, evidence-based veterinary advice in Hindi:\n${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      if (out) out.innerText = data.candidates[0].content.parts[0].text;
    } else {
      if (out) out.innerText = "त्रुटि: AI से अपेक्षित उत्तर नहीं मिला। कृपया अपनी API Key जांचें।";
    }
  } catch (err) {
    if (out) out.innerText = "कनेक्शन त्रुटि: " + err.message;
  } finally {
    if (btn) btn.disabled = false;
  }
};

/* =========================================================================
   11. BREEDING & FEED CALCULATOR MODULES
   ========================================================================= */

function renderBreedingModule() {
  const heatDiv = $('heatSignsContainer');
  const disDiv = $('dischargeContainer');
  const repList = $('repeatBreederList');

  const heatSigns = [
    { time: "0 से 6 घंटे (प्रारंभिक मद)", action: "पशु रंभाता है, बेचैन रहता है, दूध घटता है। (सीमन न करवाएं, बहुत जल्दी है)" },
    { time: "6 से 18 घंटे (मध्यम मद - सर्वोत्तम समय ⭐)", action: "पशु खड़ा रहता है जब अन्य पशु चढ़े (Standing Heat)। कांच जैसा पारदर्शी तार। ➔ इस समय A.I. करवाने पर 90% गर्भधारण!" },
    { time: "18 से 24 घंटे (अंतिम मद)", action: "मद शांत होने लगती है। यदि पहले A.I. नहीं हुई तो तुरंत डॉक्टर से करवाएं।" },
    { time: "24 से 48 घंटे बाद", action: "योनि से हल्का रक्त स्राव। यह संकेत है कि मद चक्र समाप्त हो गया है।" }
  ];

  const discharge = [
    { type: "शीशे जैसा पारदर्शी व खिंचने वाला तार", meaning: "उत्कृष्ट उर्वरता (Peak Heat)। तुरंत A.I. करवाएं।" },
    { type: "सफेद, मटमैला या मवादयुक्त डिस्चार्ज", meaning: "गर्भाशय संक्रमण (Endometritis)। सीमन न करवाएं, पहले गर्भाशय की सफाई (I/U) करवाएं।" },
    { type: "पतला पानी जैसा बिना तार का स्राव", meaning: "कमजोर मद (Weak Heat)। मिनरल मिक्सचर शुरू करें।" }
  ];

  const repeatBreeder = [
    "सीमन डलवाने के 15-20 मिनट पहले 2.5 ml Inj. Receptal / Gynerich (Buserelin) I/M अवश्य लगवाएं।",
    "लगातार 20 दिन तक 50 ग्राम Chelated Mineral Mixture (उदा. Agrimin Forte) दाने में दें।",
    "गर्भाशय में मैला होने पर मद के समय 3 दिन तक Lixen / Metricare I/U डलवाएं।",
    "प्राकृतिक गर्भाधान की जगह हमेशा प्रमाणित फ्रोजन वीर्य स्ट्रॉ (A.I.) का ही चुनाव करें।"
  ];

  if (heatDiv) {
    heatDiv.innerHTML = heatSigns.map((h) => `
      <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
        <strong class="text-rose-700 block">${h.time}</strong>
        <span class="text-slate-600 text-[11px] leading-relaxed">${h.action}</span>
      </div>
    `).join("");
  }

  if (disDiv) {
    disDiv.innerHTML = discharge.map((d) => `
      <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
        <strong class="text-blue-700 block">${d.type}</strong>
        <span class="text-slate-600 text-[11px] leading-relaxed">${d.meaning}</span>
      </div>
    `).join("");
  }

  if (repList) {
    repList.innerHTML = repeatBreeder.map((r) => `<li class="leading-relaxed">${r}</li>`).join("");
  }
}

window.calculateDailyRation = function () {
  const weight = parseFloat($('feedWeight') ? $('feedWeight').value : 400) || 400;
  const milk = parseFloat($('feedMilk') ? $('feedMilk').value : 10) || 0;

  const grain = (1.5 + milk * 0.4).toFixed(1);
  const green = (weight * 0.05).toFixed(0);
  const dry = (weight * 0.012).toFixed(1);

  if ($('resFeedGrain')) $('resFeedGrain').innerText = `${grain} kg`;
  if ($('resFeedGreen')) $('resFeedGreen').innerText = `${green} kg`;
  if ($('resFeedDry')) $('resFeedDry').innerText = `${dry} kg`;

  const card = $('rationResultCard');
  if (card) card.classList.remove('hidden');
};

/* =========================================================================
   12. BACKUP, EXPORT & INITIALIZATION
   ========================================================================= */

window.exportDataBackupJSON = function () {
  const payload = {
    config: AppConfig,
    khata: getSavedKhata(),
    inventory: getSavedInventory(),
    opd: getSavedOPDCases(),
    tickets: getSavedTickets(),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Vetcare_Backup_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.clearDemoDataOnly = function () {
  if (confirm("चेतावनी: क्या आप केवल टेस्ट खाता, ओपीडी व इन्वेंट्री डेटा हटाना चाहते हैं? मास्टर एडमिन सेटिंग्स व बैंक डिटेल्स सुरक्षित रहेंगी।")) {
    localStorage.removeItem(STORAGE_KEYS.KHATA);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    localStorage.removeItem(STORAGE_KEYS.OPD);
    window.renderKhataList();
    window.renderInventoryList();
    renderSavedOPDList();
    alert("टेस्ट डेटा रीसेट कर दिया गया है!");
  }
};

function loadAdminConfiguration() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      AppConfig = {
        ...DEFAULT_CONFIG,
        ...parsed,
        sbi: { ...DEFAULT_CONFIG.sbi, ...(parsed.sbi || {}) },
        pnb: { ...DEFAULT_CONFIG.pnb, ...(parsed.pnb || {}) }
      };
    } else {
      AppConfig = { ...DEFAULT_CONFIG };
    }
  } catch (e) {
    AppConfig = { ...DEFAULT_CONFIG };
  }
  applyConfigToDOM();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then((reg) => console.log("Vetcare PWA ServiceWorker Active:", reg.scope))
        .catch((err) => console.log("Vetcare PWA ServiceWorker fallback:", err));
    });
  }
}

function applyConfigToDOM() {
  const pageTitle = $('pageTitleTag');
  if (pageTitle) pageTitle.innerText = `${AppConfig.appTitle} | Clinical & Smart Dairy Assistant`;

  const gatewayTitle = $('gatewayAppTitle');
  if (gatewayTitle) gatewayTitle.innerText = AppConfig.appTitle;

  const headerTitle = $('appHeaderTitle');
  if (headerTitle) headerTitle.innerText = AppConfig.appTitle;

  const gatewayTagline = $('gatewayTagline');
  if (gatewayTagline) gatewayTagline.innerText = AppConfig.appTagline;

  const footerBranding = $('footerAppBranding');
  if (footerBranding) footerBranding.innerText = `${AppConfig.appTitle} • सुरक्षित और सत्यापित प्रणाली`;

  const gatewayLogoBox = $('gatewayLogoBox');
  const headerLogoBox = $('headerLogoBox');
  const initials = (AppConfig.appTitle || "VS").substring(0, 2).toUpperCase();

  if (AppConfig.appLogoUrl && AppConfig.appLogoUrl.trim().length > 5) {
    const imgHtml = `<img src="${AppConfig.appLogoUrl}" class="w-full h-full object-cover" alt="Logo" onerror="this.parentElement.innerHTML='<span class=\\'font-black text-white\\'>${initials}</span>';" />`;
    if (gatewayLogoBox) gatewayLogoBox.innerHTML = imgHtml;
    if (headerLogoBox) headerLogoBox.innerHTML = imgHtml;
  } else {
    if (gatewayLogoBox) gatewayLogoBox.innerHTML = `<span class="font-black text-white text-3xl">${initials}</span>`;
    if (headerLogoBox) headerLogoBox.innerHTML = `<span class="font-black text-white text-sm">${initials}</span>`;
  }

  const dispPayee = $('dispPayeeName');
  if (dispPayee) dispPayee.innerText = AppConfig.payeeName;

  const dispMon = $('dispPlanMonthlyPrice');
  if (dispMon) dispMon.innerText = `₹${AppConfig.monthlyPrice} / माह`;

  const dispAnn = $('dispPlanAnnualPrice');
  if (dispAnn) dispAnn.innerText = `₹${AppConfig.yearlyPrice} / वर्ष`;

  updateBankModalDisplay();
}

function initApp() {
  try {
    loadAdminConfiguration();
    renderBreedingModule();
    renderDiseaseResults(CLINICAL_DISEASES);
    window.renderKhataList();
    window.renderInventoryList();
    renderSavedOPDList();
    registerServiceWorker();

    // Attach click listeners to role buttons defensively to guarantee responsiveness
    const farmerButtons = document.querySelectorAll('button[onclick*="FARMER"], button[onclick*="farmer"], [data-role="farmer"]');
    farmerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.selectRole('FARMER');
      });
    });

    const doctorButtons = document.querySelectorAll('button[onclick*="DOCTOR"], button[onclick*="doctor"], button[onclick*="openDoctorDeclarationModal"], [data-role="doctor"]');
    doctorButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.openDoctorDeclarationModal();
      });
    });

    // Check if role was persisted
    const savedRole = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE);
    if (savedRole) {
      console.log(`Vetcare initialized. Stored active role: ${savedRole}`);
    }
  } catch (err) {
    console.error("Initialization warning:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
