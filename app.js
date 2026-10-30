/**
 * Vetcare - Clinical Decision Support, Smart Dairy & Digital OPD
 * Production Application Core (app.js)
 * Fully featured with:
 *  - Interactive Support Chatbot & WhatsApp Escalation
 *  - 3-Way Weighted Diagnosis Engine (with Pregnancy Alert & Auto-Fill Rx)
 *  - Digital OPD Prescription Generator (WhatsApp 1-Click + Print Slip)
 *  - Khata Ledger (Dual Credit/Debit, WhatsApp Tagada)
 *  - Real-Time Stock Inventory (Low-Stock Badges & Counters)
 *  - Daily Scientific Feed & Breeding Calculator
 *  - Gemini AI Second Opinion Consultant
 */

// =============================================================================
// GLOBAL CONFIGURATION & APP STATE
// =============================================================================
const VETCARE_CONFIG = {
  ADMIN_SUPPORT_PHONE: "919297000000", // Default Admin WhatsApp support number
  APP_VERSION: "4.8.0-PRO",
  DEFAULT_CURRENCY: "₹",
  STORAGE_KEYS: {
    ROLE: "vc_user_role",
    RECORDS: "vc_saved_cases",
    FINANCE: "vc_finance_ledger",
    STOCK: "vc_stock_inventory",
    GEMINI_KEY: "vc_gemini_api_key",
    PREMIUM_STATUS: "vc_premium_active"
  }
};

let appState = {
  currentRole: "FARMER", // 'FARMER' | 'DOCTOR'
  activeTab: "diagnosis",
  diagnosisMode: "SYMPTOMS", // 'SYMPTOMS' | 'HYBRID' | 'DIRECTORY'
  matrixState: {
    temp: null,      // 'HIGH' | 'NORMAL' | 'SUB'
    cardinal: "ALL", // Selected Cardinal Sign
    urine: "NORMAL", // 'NORMAL' | 'RED_COFFEE' | 'YELLOW'
    eyes: "NORMAL",  // 'NORMAL' | 'PALE_WHITE' | 'JAUNDICE_YELLOW' | 'CONGESTED_RED'
    dung: "NORMAL"   // 'NORMAL' | 'WATERY_DIARRHEA' | 'BLOODY_FETID' | 'CONSTIPATED'
  },
  selectedTag: "ALL",
  navigationHistory: []
};

// =============================================================================
// 1. HELP DESK SUPPORT ENGINE & WHATSAPP ESCALATION
// =============================================================================
const HELPDESK_KNOWLEDGE_BASE = {
  PAYMENT: {
    title: "💳 पेमेंट व 12-अंकों का UTR नंबर सहायता",
    points: [
      "<strong>SBI vs PNB खाता:</strong> यदि एक बैंक के सर्वर में देरी हो, तो दूसरे बैंक UPI आईडी (उदा. vetcare@sbi अथवा vetcare@pnb) पर भुगतान करें।",
      "<strong>12-अंकों का UTR कैसे खोजें?</strong>",
      "• <em>PhonePe:</em> हिस्ट्री खोलें ➔ पेमेंट पर टैप करें ➔ <strong>'UTR / Bank Reference No.'</strong> (12 अंक) कॉपी करें।",
      "• <em>Google Pay:</em> लेन-देन खोलें ➔ नीचे स्क्रॉल करें ➔ <strong>'UPI transaction ID'</strong> खोजें।",
      "• <em>Paytm:</em> पासबुक ➔ पेमेंट डिटेल ➔ <strong>'UPI Ref No.'</strong> (12 डिजिट)।",
      "<strong>सक्रियता समय:</strong> UTR सबमिट करने के बाद 15 मिनट से कम समय में बैकएंड द्वारा आपका प्रो सब्सक्रिप्शन एक्टिव कर दिया जाता है।"
    ]
  },
  OPD: {
    title: "📋 ओपीडी पर्ची व WhatsApp प्रेषण सहायता",
    points: [
      "<strong>पॉपअप ब्लॉकर रीसेट:</strong> यदि WhatsApp स्वतः नहीं खुलता, तो ब्राउज़र में 'Popups Allowed' अनुमति दें।",
      "<strong>मोबाइल नंबर फॉर्मेट:</strong> किसान का केवल 10 अंकों का मोबाइल नंबर दर्ज करें (शुरुआत में +91 या 0 लगाने की आवश्यकता नहीं है)।",
      "<strong>पर्ची प्रिंट:</strong> सीधे वायरलेस प्रिंटर से 58mm/80mm थर्मल या A4 साइज़ पर्ची निकालने हेतु '🖨️ पर्ची प्रिंट' बटन दबाएं।"
    ]
  },
  KHATA: {
    title: "💰 खाता बही, उधारी व 1-क्लिक तकादा",
    points: [
      "<strong>ऑटोमैटिक कैलकुलेशन:</strong> जब आप ओपीडी पर्ची में कुल फीस व जमा फीस भरते हैं, शेष उधारी स्वतः किसान के बहीखाते में दर्ज हो जाती है।",
      "<strong>1-क्लिक तकादा:</strong> उधारी लिस्ट में किसान के नाम के आगे <strong>'📲 तकादा'</strong> दबाते ही एक विनम्र एवं पेशेवर भुगतान तकादा WhatsApp पर प्रेषित हो जाता है।",
      "<strong>एंट्री सुधारें:</strong> '+ नया खर्च/एंट्री' द्वारा आप कभी भी मैनुअल डेबिट/क्रेडिट जोड़ सकते हैं।"
    ]
  },
  SYNC: {
    title: "🔄 ऑफलाइन मोड, PWA व क्लाउड बैकअप",
    points: [
      "<strong>100% ऑफलाइन कार्यक्षमता:</strong> Vetcare बिना इंटरनेट के भी सभी केस, गणना व नुस्खे आपके मोबाइल स्टोरेज में सुरक्षित रखता है।",
      "<strong>क्लाउड ऑटो-सिंक:</strong> जैसे ही आपके फोन को नेटवर्क मिलता है, हेडर का <strong>'☁️ SYNC'</strong> बैज स्वतः डेटाबेस को सुरक्षित रिमोट सर्वर पर भेज देता है।",
      "<strong>डेटा सुरक्षा:</strong> फोन बदलने से पूर्व अपने केस रिकॉर्ड्स का बैकअप 'केस रिकॉर्ड' टैब से सुरक्षित कर लें।"
    ]
  }
};

window.openHelpdeskModal = function () {
  const modal = document.getElementById("modalHelpdesk");
  if (modal) {
    modal.style.display = "flex";
  }
};

window.closeHelpdeskModal = function () {
  const modal = document.getElementById("modalHelpdesk");
  if (modal) {
    modal.style.display = "none";
  }
};

window.handleHelpdeskTopic = function (topicKey) {
  const data = HELPDESK_KNOWLEDGE_BASE[topicKey];
  const chatBody = document.getElementById("helpdeskChatBody");
  if (!chatBody) return;

  if (!data) {
    renderHelpdeskMessage("assistant", "कृपया नीचे अपनी समस्या लिखें ताकि हमारी टीम तुरंत सहायता कर सके।");
    return;
  }

  // Render User Selection
  renderHelpdeskMessage("user", data.title);

  // Render Bot Response
  setTimeout(() => {
    let html = `<div class="font-bold text-blue-900 border-b border-blue-100 pb-1 mb-1.5">${data.title}</div>`;
    html += `<ul class="space-y-1 text-slate-700">`;
    data.points.forEach((pt) => {
      html += `<li>${pt}</li>`;
    });
    html += `</ul>`;
    renderHelpdeskMessage("assistant", html);
  }, 220);
};

function renderHelpdeskMessage(sender, htmlContent) {
  const chatBody = document.getElementById("helpdeskChatBody");
  if (!chatBody) return;

  const wrapper = document.createElement("div");
  if (sender === "user") {
    wrapper.className = "flex justify-end";
    wrapper.innerHTML = `
      <div class="bg-blue-600 text-white rounded-2xl rounded-br-xs p-2.5 max-w-[85%] text-xs shadow-xs">
        ${htmlContent}
      </div>
    `;
  } else {
    wrapper.className = "flex items-start gap-2";
    wrapper.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">VC</div>
      <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3 max-w-[85%] text-slate-800 leading-relaxed text-xs shadow-xs">
        ${htmlContent}
      </div>
    `;
  }
  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

window.escalateToWhatsAppSupport = function (optionalIssue) {
  const inputEl = document.getElementById("helpdeskCustomQuery");
  const typedIssue = inputEl ? inputEl.value.trim() : "";
  const finalIssue = optionalIssue || typedIssue || "मुझे पेमेंट एक्टिवेशन अथवा तकनीकी सहायता की आवश्यकता है।";

  const userTypeStr = appState.currentRole === "DOCTOR" ? "अधिकृत पशु चिकित्सक (Doctor Mode)" : "स्मार्ट पशुपालक (Farmer Mode)";
  const now = new Date();
  const timeStr = `${now.toLocaleDateString("hi-IN")} | ${now.toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })}`;

  const message =
`🚨 *Vetcare तकनीकी सहायता अनुरोध*
----------------------------------------
👤 *उपयोगकर्ता प्रकार:* ${userTypeStr}
🕒 *समय:* ${timeStr}
📌 *समस्या विवरण:* ${finalIssue}
----------------------------------------
कृपया इस संबंध में तुरंत सहायता मार्गदर्शन प्रदान करें।`;

  const encodedUrl = `https://wa.me/${VETCARE_CONFIG.ADMIN_SUPPORT_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");

  if (inputEl) inputEl.value = "";
  closeHelpdeskModal();
};

// =============================================================================
// 2. ROLE SELECTION, NAVIGATION & SECURITY DECLARATION
// =============================================================================
window.selectRole = function (role) {
  const sanitized = String(role).toUpperCase();
  appState.currentRole = (sanitized === "DOCTOR" || sanitized === "PRACTITIONER") ? "DOCTOR" : "FARMER";
  localStorage.setItem(VETCARE_CONFIG.STORAGE_KEYS.ROLE, appState.currentRole);

  const screenGateway = document.getElementById("screenGateway");
  const screenMainApp = document.getElementById("screenMainApp");
  const roleBadge = document.getElementById("currentUserRoleBadge");

  if (screenGateway) screenGateway.classList.add("hidden");
  if (screenMainApp) screenMainApp.classList.remove("hidden");

  if (roleBadge) {
    if (appState.currentRole === "DOCTOR") {
      roleBadge.innerHTML = "🩺 अधिकृत पशु चिकित्सक (Doctor)";
      roleBadge.className = "text-[9px] sm:text-[11px] font-bold text-blue-700";
    } else {
      roleBadge.innerHTML = "👨‍🌾 स्मार्ट पशुपालक (Smart Farmer)";
      roleBadge.className = "text-[9px] sm:text-[11px] font-bold text-emerald-700";
    }
  }

  applyRoleUIVisibility();
  switchTab("diagnosis");
};

function applyRoleUIVisibility() {
  const isDoc = appState.currentRole === "DOCTOR";

  const doctorNavElements = ["navRx", "navStock", "navRecords"];
  doctorNavElements.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (isDoc) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    }
  });

  const financeLabel = document.getElementById("navFinanceLabel");
  if (financeLabel) {
    financeLabel.innerText = isDoc ? "क्लिनिक खाता" : "दूध बहीखाता";
  }

  // Refresh UI data for role
  refreshDiagnosisList();
  renderFinanceLedger();
}

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
  selectRole("DOCTOR");
};

window.returnToGateway = function () {
  const screenGateway = document.getElementById("screenGateway");
  const screenMainApp = document.getElementById("screenMainApp");
  if (screenGateway) screenGateway.classList.remove("hidden");
  if (screenMainApp) screenMainApp.classList.add("hidden");
};

window.goBackScreen = function () {
  if (appState.navigationHistory.length > 1) {
    appState.navigationHistory.pop();
    const prev = appState.navigationHistory.pop();
    switchTab(prev);
  } else {
    returnToGateway();
  }
};

window.goToHome = function () {
  returnToGateway();
};

window.switchTab = function (tabKey) {
  const tabs = [
    { key: "diagnosis", viewId: "viewDiagnosis", navId: "navDiagnosis" },
    { key: "rx", viewId: "viewRx", navId: "navRx" },
    { key: "finance", viewId: "viewFinance", navId: "navFinance" },
    { key: "stock", viewId: "viewStock", navId: "navStock" },
    { key: "breeding", viewId: "viewBreeding", navId: "navBreeding" },
    { key: "feed", viewId: "viewFeed", navId: "navFeed" },
    { key: "records", viewId: "viewRecords", navId: "navRecords" },
    { key: "ai", viewId: "viewAI", navId: "navAI" }
  ];

  tabs.forEach((t) => {
    const vEl = document.getElementById(t.viewId);
    const nEl = document.getElementById(t.navId);
    if (vEl) {
      if (t.key === tabKey) {
        vEl.classList.remove("hidden");
      } else {
        vEl.classList.add("hidden");
      }
    }
    if (nEl) {
      if (t.key === tabKey) {
        nEl.classList.add("active-nav-tab");
        nEl.classList.remove("text-slate-400");
      } else {
        nEl.classList.remove("active-nav-tab");
        nEl.classList.add("text-slate-400");
      }
    }
  });

  appState.activeTab = tabKey;
  appState.navigationHistory.push(tabKey);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// =============================================================================
// 3. CLINICAL 3-WAY DIAGNOSIS ENGINE (WEIGHTED SCORING + AUTO-FILL RX)
// =============================================================================
/**
 * Clinical weightage formula:
 * 1. Cardinal / Pathognomonic Sign = 40%
 * 2. Temperature Correlation      = 20%
 * 3. Eye / Mucous Membrane Sign   = 15%
 * 4. Urine Consistency / Color    = 15%
 * 5. Dung / Fecal Pattern         = 10%
 * Total Potential Score           = 100%
 */

window.setDiagnosisMode = function (mode) {
  appState.diagnosisMode = mode;
  const p1 = document.getElementById("panelDiagMatrix");
  const p2 = document.getElementById("panelDiagHybrid");
  const p3 = document.getElementById("panelDiagDirectory");

  const b1 = document.getElementById("btnDiagMode1");
  const b2 = document.getElementById("btnDiagMode2");
  const b3 = document.getElementById("btnDiagMode3");

  const modeButtons = [b1, b2, b3];
  modeButtons.forEach((b) => {
    if (b) {
      b.className = "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center";
    }
  });

  if (p1) p1.classList.add("hidden");
  if (p2) p2.classList.add("hidden");
  if (p3) p3.classList.add("hidden");

  if (mode === "SYMPTOMS") {
    if (p1) p1.classList.remove("hidden");
    if (b1) b1.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center";
  } else if (mode === "HYBRID") {
    if (p2) p2.classList.remove("hidden");
    if (b2) b2.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center";
    const inp = document.getElementById("unifiedSearchInput");
    if (inp) inp.focus();
  } else {
    if (p3) p3.classList.remove("hidden");
    if (b3) b3.className = "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center";
  }

  refreshDiagnosisList();
};

window.toggleMatrixParam = function (param, val, btnEl) {
  if (appState.matrixState[param] === val) {
    appState.matrixState[param] = null;
    if (btnEl) btnEl.classList.remove("matrix-chip-active");
  } else {
    appState.matrixState[param] = val;
    const parent = btnEl.parentElement;
    if (parent) {
      Array.from(parent.children).forEach((c) => c.classList.remove("matrix-chip-active"));
    }
    if (btnEl) btnEl.classList.add("matrix-chip-active");
  }
  applyMatrixFilters();
};

window.applyMatrixFilters = function () {
  const selCard = document.getElementById("selCardinalSign");
  if (selCard) {
    appState.matrixState.cardinal = selCard.value;
  }
  refreshDiagnosisList();
};

window.resetSymptomMatrix = function () {
  appState.matrixState = {
    temp: null,
    cardinal: "ALL",
    urine: "NORMAL",
    eyes: "NORMAL",
    dung: "NORMAL"
  };

  document.querySelectorAll(".m-chip").forEach((btn) => btn.classList.remove("matrix-chip-active"));
  const sel = document.getElementById("selCardinalSign");
  if (sel) sel.value = "ALL";

  refreshDiagnosisList();
};

function calculateDiseaseProbability(disease) {
  let score = 0;
  const m = appState.matrixState;

  // 1. Cardinal Match (40 pts)
  if (m.cardinal && m.cardinal !== "ALL") {
    if (disease.cardinalSignKey === m.cardinal || (disease.symptoms && disease.symptoms.includes(m.cardinal))) {
      score += 40;
    }
  } else {
    score += 15; // Baseline prior
  }

  // 2. Temperature Match (20 pts)
  if (m.temp) {
    if (m.temp === "HIGH" && disease.expectedTemp === "HIGH") score += 20;
    else if (m.temp === "NORMAL" && disease.expectedTemp === "NORMAL") score += 20;
    else if (m.temp === "SUB" && disease.expectedTemp === "SUB") score += 20;
    else score += 2; // minor mismatch penalty
  } else {
    score += 10;
  }

  // 3. Eye Sign Match (15 pts)
  if (m.eyes && m.eyes !== "NORMAL") {
    if (disease.eyeSign === m.eyes) score += 15;
  } else {
    score += 8;
  }

  // 4. Urine Sign Match (15 pts)
  if (m.urine && m.urine !== "NORMAL") {
    if (disease.urineSign === m.urine) score += 15;
  } else {
    score += 8;
  }

  // 5. Dung Sign Match (10 pts)
  if (m.dung && m.dung !== "NORMAL") {
    if (disease.dungSign === m.dung) score += 10;
  } else {
    score += 5;
  }

  return Math.min(score, 99);
}

function getDatabaseDiseases() {
  if (typeof CLINICAL_DISEASE_DB !== "undefined" && Array.isArray(CLINICAL_DISEASE_DB)) {
    return CLINICAL_DISEASE_DB;
  }
  // Robust Fallback Database in case external script has network latency
  return [
    {
      id: "HS",
      name: "गलाघोंटू (Hemorrhagic Septicemia - HS)",
      type: "BACTERIAL",
      expectedTemp: "HIGH",
      cardinalSignKey: "NECK_SWELLING",
      symptoms: "गले में गर्म दर्दनाक सूजन, घर्र-घर्र की आवाज, 105-107°F तेज बुखार, जीभ बाहर लटकना।",
      isPregnantSafeRx: false,
      doctorRx: "1. Inj. Cefquinome (1 mg/kg) or Inj. Oxytetracycline 200mg/ml @ 10mg/kg IV\n2. Inj. Flunixin Meglumine 2.2mg/kg IV\n3. Inj. Dexamethasone 10ml IM (Non-pregnant only!)",
      farmerDesiRx: "तत्काल नजदीकी डॉक्टर को बुलाएं। सहायता हेतु गले पर गुनगुने पानी की सिकाई व सरसों तेल में कपूर घिसकर लगाएं।"
    },
    {
      id: "BQ",
      name: "लंगड़ा बुखार / जहरबाद (Black Quarter - BQ)",
      type: "BACTERIAL",
      expectedTemp: "HIGH",
      cardinalSignKey: "GAS_SWELLING",
      symptoms: "कंधे या पुट्ठे पर गर्म सूजन जिसे दबाने पर चर्र-चर्र (Crepitation) की आवाज आती है। लंगड़ा कर चलना।",
      isPregnantSafeRx: true,
      doctorRx: "1. Inj. Penicillin 40 Lakh IU IM twice daily\n2. Inj. Meloxicam with Paracetamol 15-20ml IM\n3. H2O2 से सूजन की चीरा लगाकर ड्रेसिंग (Early stage)",
      farmerDesiRx: "सूजन वाले स्थान को ठंडे पानी से धोएं, पशु को अन्य स्वस्थ पशुओं से तुरंत पृथक बांधें।"
    },
    {
      id: "FMD",
      name: "खुरपका-मुंहपका (Foot & Mouth Disease - FMD)",
      type: "VIRAL",
      expectedTemp: "HIGH",
      cardinalSignKey: "MOUTH_BLISTERS",
      symptoms: "मुंह व खुरों के बीच छाले, मुंह से लार टपकना, पशु लंगड़ाता है, चारा खाना बंद।",
      isPregnantSafeRx: true,
      doctorRx: "1. Inj. Ceftriaxone 3g/4g IM for 3-5 days (Secondary infection)\n2. Inj. Meloxicam 15ml IM\n3. Mouth wash: 1% Potassium Permanganate (KMNO4)",
      farmerDesiRx: "मुंह के छालों को फिटकरी के पानी (1%) अथवा सुहागा शहद में मिलाकर लगाएं। खुरों को फिनाइल के पानी से साफ रखें।"
    },
    {
      id: "MILK_FEVER",
      name: "मिल्क फीवर (Hypocalcemia / Milk Fever)",
      type: "METABOLIC",
      expectedTemp: "SUB",
      cardinalSignKey: "STERNAL_RECUMBENCY",
      symptoms: "ब्याने के 24-48 घंटे बाद पशु बैठ जाता है, गर्दन मोड़कर पुट्ठे पर रखता है। शरीर और कान ठंडे हो जाते हैं (Sub-normal temp)।",
      isPregnantSafeRx: true,
      doctorRx: "1. Infusion Calcium Borogluconate (CBG 450ml): 1/2 IV slowly, 1/2 Sub-Cutaneous\n2. Inj. Mifex / Calup 450ml IV over 20-30 mins\n⚠️ Heart auscultation is mandatory during IV!",
      farmerDesiRx: "पशु को बैठने पर पेट के बल रखें (Sternal position)। तुरंत डॉक्टर से कैल्शियम बोतल नस में लगवाएं, मुंह से कुछ न पिलाएं।"
    },
    {
      id: "KETOSIS",
      name: "कीटोसिस / एसीटोनेमिया (Ketosis)",
      type: "METABOLIC",
      expectedTemp: "NORMAL",
      cardinalSignKey: "SWEET_BREATH",
      symptoms: "सांस व दूध से मीठी गंध (Acetone smell), दाना-खली छोड़ केवल सूखा भूसा खाना, दूध अचानक घट जाना।",
      isPregnantSafeRx: true,
      doctorRx: "1. Dextrose 20% or 25% 1000ml IV\n2. Inj. Isoflupredone Acetate 10mg IM\n3. Oral Propylene Glycol 200ml twice daily for 3 days",
      farmerDesiRx: "पशु को मीठा दलिया, गुड़ 250 ग्राम प्रतिदिन दें व निकोटिनिक एसिड युक्त ओरल एनर्जी बूस्टर पिलाएं।"
    },
    {
      id: "MASTITIS",
      name: "थनैल / मस्टाइटिस (Clinical Mastitis)",
      type: "BACTERIAL",
      expectedTemp: "NORMAL",
      cardinalSignKey: "UDDER_HARD",
      symptoms: "अयन/थन में सूजन, कड़ापन, थन गर्म, दूध में खून, पीले छिछड़े या मवाद आना।",
      isPregnantSafeRx: true,
      doctorRx: "1. Inj. Cefoperazone + Sulbactam 4.5g IV/IM\n2. Inj. Serratiopeptidase + Meloxicam 15ml IM\n3. Intramammary infusion: Pendistrin-SH / Tilmicosin",
      farmerDesiRx: "नींबू का रस (100ml) और मीठा सोडा (50g) मिलाकर दिन में दो बार दें। थन को पोटाश पानी से धोकर एलोवेरा व हल्दी लेप लगाएं।"
    },
    {
      id: "BLOAT",
      name: "आफरा / गैस भरना (Tympanitis / Bloat)",
      type: "METABOLIC",
      expectedTemp: "NORMAL",
      cardinalSignKey: "LEFT_FLANK_DRUM",
      symptoms: "बायाँ पेट ढोलक की तरह फूल जाना, सांस लेने में अत्यधिक तकलीफ, मुंह खोलकर हांफना।",
      isPregnantSafeRx: true,
      doctorRx: "1. Stomach tube / Trocar & Canula in Left paralumbar fossa (Emergency)\n2. Inj. Atropine Sulphate / Simethicone\n3. Oral Blotasil / Tympol 100ml in warm oil",
      farmerDesiRx: "तारपीन का तेल (30ml) + सरसों का तेल (250ml) मिलाकर नाल द्वारा पिलाएं। पशु को लगातार चलाएं, बैठने न दें।"
    },
    {
      id: "BABESIOSIS",
      name: "बबेशियोसिस / लाल पेशाब (Red Water / Babesiosis)",
      type: "PROTOZOAL",
      expectedTemp: "HIGH",
      cardinalSignKey: "RED_URINE",
      symptoms: "गहरे लाल या कॉफी के रंग का पेशाब, 105°F+ तेज बुखार, चीचड़ों (Ticks) का प्रकोप, अत्यधिक कमजोरी।",
      isPregnantSafeRx: true,
      doctorRx: "1. Inj. Diminazene Aceturate (Berenil) @ 3.5-5 mg/kg deep IM\n2. Inj. Imidocarb Diproprionate @ 1.2 mg/kg SC\n3. Supportive: Liver extract with B-complex + Iron tonics",
      farmerDesiRx: "पशु को तुरंत छायादार व ठंडी जगह बांधें। चीचड़ नाशक दवा लगाएं व डॉक्टर से इंजेक्शन लगवाएं।"
    }
  ];
}

function refreshDiagnosisList() {
  const container = document.getElementById("diseaseSearchResults");
  const countBadge = document.getElementById("matchCountBadge");
  const scoreText = document.getElementById("matchScoreText");
  if (!container) return;

  const allDiseases = getDatabaseDiseases();
  let filtered = [];

  if (appState.diagnosisMode === "SYMPTOMS") {
    // Weighted scoring
    filtered = allDiseases.map((d) => {
      const prob = calculateDiseaseProbability(d);
      return { ...d, probability: prob };
    });
    filtered.sort((a, b) => b.probability - a.probability);

    if (scoreText) {
      scoreText.innerHTML = `लक्षण विश्लेषण पूर्ण ➔ <strong>${filtered[0]?.name || "रोग"}</strong> की सर्वाधिक संभावना`;
    }
  } else if (appState.diagnosisMode === "DIRECTORY") {
    if (appState.selectedTag === "ALL") {
      filtered = allDiseases;
    } else {
      filtered = allDiseases.filter((d) => d.type === appState.selectedTag);
    }
  } else {
    // Hybrid Search Mode
    const query = (document.getElementById("unifiedSearchInput")?.value || "").toLowerCase().trim();
    if (!query) {
      filtered = allDiseases;
    } else {
      filtered = allDiseases.filter((d) => {
        return (
          d.name.toLowerCase().includes(query) ||
          d.symptoms.toLowerCase().includes(query) ||
          (d.doctorRx && d.doctorRx.toLowerCase().includes(query)) ||
          (d.farmerDesiRx && d.farmerDesiRx.toLowerCase().includes(query))
        );
      });
    }
  }

  if (countBadge) countBadge.innerText = `${filtered.length} रोग उपलब्ध`;
  renderDiseaseCards(filtered, container);
}

function renderDiseaseCards(diseases, container) {
  container.innerHTML = "";
  const isDoctor = appState.currentRole === "DOCTOR";

  if (diseases.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-xs">
        कोई रोग रिकॉर्ड नहीं मिला। कृपया अन्य लक्षण या खोज शब्द दर्ज करें।
      </div>
    `;
    return;
  }

  diseases.forEach((dis) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3";

    const probVal = dis.probability !== undefined ? dis.probability : 75;
    let probColor = "bg-blue-600";
    if (probVal >= 70) probColor = "bg-rose-600";
    else if (probVal >= 45) probColor = "bg-amber-500";

    const encodedDisease = encodeURIComponent(JSON.stringify(dis));

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
            dis.type === "BACTERIAL" ? "bg-amber-100 text-amber-800" :
            dis.type === "VIRAL" ? "bg-indigo-100 text-indigo-800" :
            dis.type === "PROTOZOAL" ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
          }">${dis.type}</span>
          <h3 class="text-xs sm:text-sm font-bold text-slate-900 mt-1">${dis.name}</h3>
        </div>
        ${
          appState.diagnosisMode === "SYMPTOMS"
            ? `
          <div class="text-right">
            <span class="text-[10px] font-bold text-slate-400 block">क्लिनिकल संभावना</span>
            <span class="text-sm font-black ${probVal >= 70 ? "text-rose-600" : "text-blue-700"}">${probVal}%</span>
          </div>`
            : ""
        }
      </div>

      <!-- Probability Bar -->
      ${
        appState.diagnosisMode === "SYMPTOMS"
          ? `
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="${probColor} h-1.5 rounded-full transition-all duration-500" style="width: ${probVal}%"></div>
        </div>`
          : ""
      }

      <!-- Symptoms & Signs -->
      <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
        <strong class="text-slate-800 text-[11px] block">🔍 पहचान के लक्षण:</strong>
        <p class="text-slate-600 leading-relaxed">${dis.symptoms}</p>
      </div>

      <!-- Role-Based Clinical Treatment Protocol -->
      ${
        isDoctor
          ? `
        <div class="p-3 bg-blue-50/60 border border-blue-200 rounded-2xl text-xs space-y-2">
          <div class="flex items-center justify-between">
            <strong class="text-blue-900 flex items-center gap-1 font-bold">
              <span>🩺</span> एलोपैथिक इंजेक्शन व डोज़ (Doctor Only)
            </strong>
            ${
              dis.isPregnantSafeRx === false
                ? `<span class="text-[9px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full animate-pulse-subtle">⚠️ गाभिन पशु को सावधानी (Abortion Risk)</span>`
                : `<span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">✓ गाभिन-सुरक्षित Rx</span>`
            }
          </div>
          <pre class="font-mono text-[11px] text-blue-950 whitespace-pre-wrap leading-relaxed">${dis.doctorRx}</pre>
          
          <div class="pt-1 flex gap-2">
            <button onclick="autoFillPrescription('${encodedDisease}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs shadow-xs transition active:scale-98">
              📝 ओपीडी पर्चे में स्वतः भरें (Auto-Fill Rx)
            </button>
          </div>
        </div>`
          : `
        <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1.5">
          <strong class="text-emerald-900 flex items-center gap-1 font-bold">
            <span>🌿</span> देसी घरेलू उपचार व प्राथमिक देखभाल (Farmer Guide)
          </strong>
          <p class="text-emerald-950 leading-relaxed">${dis.farmerDesiRx || "पशु को तुरंत नजदीकी डॉक्टर से जांच करवाएं।"}</p>
        </div>`
      }
    `;

    container.appendChild(card);
  });
}

window.handleAppSearch = function () {
  refreshDiagnosisList();
};

window.filterByTag = function (tag, btnEl) {
  appState.selectedTag = tag;
  const parent = btnEl ? btnEl.parentElement : null;
  if (parent) {
    Array.from(parent.children).forEach((c) => {
      c.className = "q-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
    });
    btnEl.className = "q-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0";
  }
  refreshDiagnosisList();
};

// =============================================================================
// 4. AUTO-FILL RX & DIGITAL OPD PRESCRIPTION ENGINE
// =============================================================================
window.autoFillPrescription = function (encodedDisease) {
  try {
    const dis = JSON.parse(decodeURIComponent(encodedDisease));
    switchTab("rx");

    const diagInput = document.getElementById("opdDiagnosis");
    const medInput = document.getElementById("opdMedicine");

    if (diagInput) diagInput.value = dis.name;
    if (medInput) medInput.value = dis.doctorRx || "";

    // Pregnancy check
    const pregSelect = document.getElementById("opdPregnancy");
    if (pregSelect && pregSelect.value.includes("Pregnant") && dis.isPregnantSafeRx === false) {
      alert("⚠️ ध्यान दें: इस रोग की कुछ दवाएं गाभिन पशु के लिए प्रतिबंधित हैं। कृपया कॉर्टिकोस्टेरॉइड्स व संबंधित दवाओं का उपयोग न करें!");
    }
  } catch (err) {
    console.error("Auto-Fill Error:", err);
  }
};

window.calculateDue = function () {
  const tot = parseFloat(document.getElementById("opdTotalFee")?.value || 0);
  const paid = parseFloat(document.getElementById("opdPaidFee")?.value || 0);
  const due = Math.max(0, tot - paid);
  const dueInput = document.getElementById("opdDueFee");
  if (dueInput) dueInput.value = due.toFixed(0);
};

window.captureGPSLocation = function () {
  const gpsInput = document.getElementById("opdGPS");
  const btn = document.getElementById("btnGPS");

  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में GPS उपलब्ध नहीं है।");
    return;
  }

  if (btn) btn.innerText = "खोज रहे हैं...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      if (gpsInput) gpsInput.value = coords;
      if (btn) btn.innerText = "✓ GPS सेट";
    },
    (err) => {
      alert("GPS लोकेशन प्राप्त करने में असमर्थ। कृपया लोकेशन अनुमति दें।");
      if (btn) btn.innerText = "📍 GPS";
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};

window.dispatchWhatsAppRx = function () {
  const farmerName = document.getElementById("opdFarmerName")?.value.trim();
  const phone = document.getElementById("opdFarmerPhone")?.value.trim();
  const village = document.getElementById("opdVillage")?.value.trim() || "-";
  const animal = document.getElementById("opdAnimal")?.value || "गाय/भैंस";
  const tag = document.getElementById("opdTag")?.value.trim() || "N/A";
  const preg = document.getElementById("opdPregnancy")?.value || "-";
  const diagnosis = document.getElementById("opdDiagnosis")?.value.trim();
  const medicine = document.getElementById("opdMedicine")?.value.trim();
  const total = document.getElementById("opdTotalFee")?.value || "0";
  const paid = document.getElementById("opdPaidFee")?.value || "0";
  const due = document.getElementById("opdDueFee")?.value || "0";

  if (!farmerName) {
    alert("कृपया किसान का नाम दर्ज करें।");
    return;
  }
  if (!phone || phone.length < 10) {
    alert("कृपया 10-अंकों का वैध व्हाट्सएप मोबाइल नंबर दर्ज करें।");
    return;
  }
  if (!diagnosis) {
    alert("कृपया रोग का नाम दर्ज करें।");
    return;
  }

  const dateStr = new Date().toLocaleDateString("hi-IN");

  const message =
`📋 *डिजिटल पशु चिकित्सा पर्ची (Vetcare OPD)*
----------------------------------------
👨‍🌾 *पशुपालक:* ${farmerName} | 🏡 *गाँव:* ${village}
📞 *मोबाइल:* ${phone}
🐄 *पशु:* ${animal} (टैग: ${tag}) | *स्थिति:* ${preg}
📅 *दिनांक:* ${dateStr}
----------------------------------------
🩺 *जांच उपरांत रोग (Diagnosis):*
👉 *${diagnosis}*

💊 *उपचार व दी गई दवाइयां (Rx):*
${medicine || "क्लिनिकल परीक्षण अनुसार"}
----------------------------------------
💰 *फीस विवरण:*
• कुल फीस: ₹${total}
• जमा राशि: ₹${paid}
• बकाया (Due): *₹${due}*
----------------------------------------
⚠️ *निर्देश:* दवा का कोर्स पूरा करें। कोई समस्या होने पर तुरंत डॉक्टर से संपर्क करें।`;

  // Clean phone number
  const cleanPhone = phone.replace(/\D/g, "");
  const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");

  // Save Record automatically
  saveRecordLocally({
    farmerName,
    phone,
    village,
    animal,
    tag,
    diagnosis,
    total: parseFloat(total),
    paid: parseFloat(paid),
    due: parseFloat(due),
    date: new Date().toISOString()
  });
};

function saveRecordLocally(record) {
  try {
    const raw = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.RECORDS);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(record);
    localStorage.setItem(VETCARE_CONFIG.STORAGE_KEYS.RECORDS, JSON.stringify(list));
    renderSavedRecordsList();
    renderFinanceLedger();
  } catch (err) {
    console.error("Local save error:", err);
  }
}

window.saveOfflineCaseDirectly = function () {
  const farmerName = document.getElementById("opdFarmerName")?.value.trim();
  const phone = document.getElementById("opdFarmerPhone")?.value.trim() || "-";
  const diagnosis = document.getElementById("opdDiagnosis")?.value.trim() || "सामान्य परीक्षण";
  const total = parseFloat(document.getElementById("opdTotalFee")?.value || 0);
  const paid = parseFloat(document.getElementById("opdPaidFee")?.value || 0);
  const due = parseFloat(document.getElementById("opdDueFee")?.value || 0);

  if (!farmerName) {
    alert("कृपया कम से कम किसान का नाम दर्ज करें।");
    return;
  }

  saveRecordLocally({
    farmerName,
    phone,
    village: document.getElementById("opdVillage")?.value || "",
    animal: document.getElementById("opdAnimal")?.value || "",
    tag: document.getElementById("opdTag")?.value || "",
    diagnosis,
    total,
    paid,
    due,
    date: new Date().toISOString()
  });

  alert("केस सफलतापूर्वक स्थानीय स्टोरेज में सुरक्षित कर लिया गया है!");
};

window.printCurrentOPDSlip = function () {
  const area = document.getElementById("printableSlipArea");
  if (!area) return;

  const fName = document.getElementById("opdFarmerName")?.value || "पशुपालक";
  const fPhone = document.getElementById("opdFarmerPhone")?.value || "-";
  const animal = document.getElementById("opdAnimal")?.value || "-";
  const diag = document.getElementById("opdDiagnosis")?.value || "-";
  const med = document.getElementById("opdMedicine")?.value || "-";
  const total = document.getElementById("opdTotalFee")?.value || "0";
  const paid = document.getElementById("opdPaidFee")?.value || "0";
  const due = document.getElementById("opdDueFee")?.value || "0";

  area.innerHTML = `
    <div style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; text-align: center;">
      <h2 style="font-size: 18px; font-weight: bold; margin: 0;">पशु चिकित्सालय / OPD पर्ची</h2>
      <p style="font-size: 11px; margin: 2px 0;">Vetcare Clinical Assistant • दिनांक: ${new Date().toLocaleDateString("hi-IN")}</p>
    </div>
    <div style="font-size: 12px; margin-bottom: 8px;">
      <p><strong>किसान का नाम:</strong> ${fName} | <strong>मोबाइल:</strong> ${fPhone}</p>
      <p><strong>पशु:</strong> ${animal} | <strong>निदान (Diagnosis):</strong> ${diag}</p>
    </div>
    <div style="font-size: 12px; border-top: 1px dashed #666; border-bottom: 1px dashed #666; padding: 8px 0; margin-bottom: 8px;">
      <strong>उपचार विवरण (Rx):</strong>
      <pre style="font-family: inherit; margin: 4px 0; white-space: pre-wrap;">${med}</pre>
    </div>
    <div style="font-size: 12px;">
      <p>कुल फीस: ₹${total} | जमा: ₹${paid} | <strong>बकाया: ₹${due}</strong></p>
    </div>
  `;
  window.print();
};

// =============================================================================
// 5. KHATA LEDGER, REAL-TIME MATH & 1-CLICK WHATSAPP TAGADA
// =============================================================================
function renderFinanceLedger(filterOnlyDue = false, searchQuery = "") {
  const creditEl = document.getElementById("finCredit");
  const debitEl = document.getElementById("finDebit");
  const listContainer = document.getElementById("finDueList");

  const raw = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.RECORDS);
  const records = raw ? JSON.parse(raw) : [];

  let totalCredit = 0;
  let totalDebit = 0;

  records.forEach((r) => {
    totalCredit += Number(r.paid || 0);
    totalDebit += Number(r.due || 0);
  });

  if (creditEl) creditEl.innerText = `₹${totalCredit.toLocaleString("en-IN")}`;
  if (debitEl) debitEl.innerText = `₹${totalDebit.toLocaleString("en-IN")}`;

  if (!listContainer) return;
  listContainer.innerHTML = "";

  let displayRecords = records;

  if (filterOnlyDue) {
    displayRecords = displayRecords.filter((r) => Number(r.due || 0) > 0);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayRecords = displayRecords.filter((r) => {
      return (r.farmerName && r.farmerName.toLowerCase().includes(q)) || (r.phone && r.phone.includes(q));
    });
  }

  if (displayRecords.length === 0) {
    listContainer.innerHTML = `
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
        कोई रिकॉर्ड उपलब्ध नहीं है।
      </div>
    `;
    return;
  }

  displayRecords.forEach((rec, idx) => {
    const item = document.createElement("div");
    item.className = "p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs";

    const hasDue = Number(rec.due || 0) > 0;

    item.innerHTML = `
      <div class="space-y-0.5">
        <div class="flex items-center gap-2">
          <strong class="text-slate-800">${rec.farmerName}</strong>
          ${
            hasDue
              ? `<span class="text-[9px] bg-rose-100 text-rose-700 font-bold px-2 py-0.2 rounded-full">बकाया: ₹${rec.due}</span>`
              : `<span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">पूर्ण चुकता</span>`
          }
        </div>
        <p class="text-[10px] text-slate-500">${rec.phone} • ${rec.diagnosis || "केस"}</p>
      </div>

      <div class="flex items-center gap-1.5">
        ${
          hasDue
            ? `
          <button onclick="sendWhatsAppTagada('${rec.farmerName}', '${rec.phone}', ${rec.due})" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] shadow-xs active:scale-95 transition flex items-center gap-1">
            <span>📲</span> तकादा
          </button>`
            : ""
        }
      </div>
    `;
    listContainer.appendChild(item);
  });
}

window.sendWhatsAppTagada = function (farmerName, phone, dueAmount) {
  if (!phone || phone.length < 10) {
    alert("किसान का मोबाइल नंबर अनुपलब्ध है।");
    return;
  }

  const message =
`आदरणीय ${farmerName} जी,
नमस्कार! 

आपके पशु के इलाज/दवाइयों की बकाया राशि *₹${dueAmount}* शेष है। 
कृपया सुविधानुसार यह राशि चुकाने की कृपा करें ताकि आपकी सेवा अनवरत जारी रहे।

धन्यवाद!
_Vetcare पशु स्वास्थ्य सेवा_`;

  const cleanPhone = phone.replace(/\D/g, "");
  const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const url = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

window.handleFinanceSearch = function () {
  const query = document.getElementById("finSearchInput")?.value || "";
  renderFinanceLedger(false, query);
};

window.filterOnlyDueLedger = function () {
  renderFinanceLedger(true);
};

window.addExpensePrompt = function () {
  const desc = prompt("खर्च अथवा लेन-देन का विवरण लिखें (उदा. दवा खरीद, पेट्रोल, आदि):");
  if (!desc) return;
  const amt = parseFloat(prompt("रकम (₹) दर्ज करें:") || "0");
  if (isNaN(amt) || amt <= 0) return;

  saveRecordLocally({
    farmerName: `[खर्च] ${desc}`,
    phone: "-",
    diagnosis: "क्लिनिक/फार्म व्यय",
    total: amt,
    paid: 0,
    due: amt,
    date: new Date().toISOString()
  });
};

// =============================================================================
// 6. SAVED CASE RECORDS RENDERER
// =============================================================================
function renderSavedRecordsList(query = "") {
  const container = document.getElementById("recordsList");
  const badge = document.getElementById("recordTotalBadge");
  if (!container) return;

  const raw = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.RECORDS);
  const records = raw ? JSON.parse(raw) : [];

  if (badge) badge.innerText = `${records.length} केस सुरक्षित`;

  let filtered = records;
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((r) => {
      return (r.farmerName && r.farmerName.toLowerCase().includes(q)) || (r.phone && r.phone.includes(q));
    });
  }

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
        कोई केस रिकॉर्ड सुरक्षित नहीं है।
      </div>
    `;
    return;
  }

  filtered.forEach((r) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1 text-xs";
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <strong class="text-slate-900">${r.farmerName}</strong>
        <span class="text-[10px] text-slate-400">${new Date(r.date).toLocaleDateString("hi-IN")}</span>
      </div>
      <p class="text-slate-600 text-[11px]">${r.animal || "पशु"} • रोग: <strong>${r.diagnosis}</strong></p>
      <div class="flex justify-between items-center text-[11px] pt-1 border-t border-slate-100">
        <span>फीस: ₹${r.total} (जमा: ₹${r.paid})</span>
        <span class="text-rose-600 font-bold">बकाया: ₹${r.due}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

window.handleRecordSearch = function () {
  const q = document.getElementById("searchRecordsInput")?.value || "";
  renderSavedRecordsList(q);
};

// =============================================================================
// 7. STOCK INVENTORY CONTROLLERS
// =============================================================================
window.filterStockCategory = function (category, btnEl) {
  const parent = btnEl ? btnEl.parentElement : null;
  if (parent) {
    Array.from(parent.children).forEach((c) => {
      c.className = "stock-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0";
    });
    btnEl.className = "stock-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0";
  }

  const container = document.getElementById("stockListContainer");
  if (!container) return;

  const items = container.querySelectorAll(".p-3");
  items.forEach((it) => {
    if (category === "ALL") {
      it.style.display = "flex";
    } else {
      const txt = it.innerText.toUpperCase();
      if (
        (category === "ANTIBIOTIC" && txt.includes("एंटीबायोटिक")) ||
        (category === "SEMEN" && txt.includes("सीमन")) ||
        (category === "TONIC" && txt.includes("टॉनिक")) ||
        (category === "DISPOSABLE" && (txt.includes("सुई") || txt.includes("सिरिंज")))
      ) {
        it.style.display = "flex";
      } else {
        it.style.display = "none";
      }
    }
  });
};

window.increaseStock = function (btn) {
  updateStockCount(btn, 1);
};

window.decreaseStock = function (btn) {
  updateStockCount(btn, -1);
};

// =============================================================================
// 8. DAILY FEED RATION & SMART BREEDING ENGINE
// =============================================================================
window.calculateDailyRation = function () {
  const weight = parseFloat(document.getElementById("feedWeight")?.value || "400");
  const milk = parseFloat(document.getElementById("feedMilk")?.value || "10");
  const card = document.getElementById("rationResultCard");

  if (isNaN(weight) || weight <= 0) {
    alert("कृपया पशु का सही वजन दर्ज करें।");
    return;
  }

  // ICAR Standard: Dry Matter (DM) = 2.5 - 3.0 kg per 100 kg body weight
  const maintenanceDM = (weight / 100) * 2.5;
  const productionGrain = milk * 0.4; // 400g concentrate per litre milk
  const maintenanceGrain = 1.2;       // 1.2 kg maintenance concentrate

  const totalGrain = (maintenanceGrain + productionGrain).toFixed(1);
  const greenFodder = Math.round((weight * 0.05) + (milk * 0.5)); // ~5-6% body weight in greens
  const dryStraw = ((maintenanceDM * 0.4)).toFixed(1);           // ~40% of DM from dry straw

  const gEl = document.getElementById("resFeedGrain");
  const grEl = document.getElementById("resFeedGreen");
  const dEl = document.getElementById("resFeedDry");

  if (gEl) gEl.innerText = `${totalGrain} kg`;
  if (grEl) grEl.innerText = `${greenFodder} kg`;
  if (dEl) dEl.innerText = `${dryStraw} kg`;

  if (card) card.classList.remove("hidden");
};

// =============================================================================
// 9. GEMINI AI SECOND OPINION CONSULTANT
// =============================================================================
window.openAIKeyModal = function () {
  const m = document.getElementById("modalAIKey");
  const input = document.getElementById("inputGeminiKey");
  if (input) {
    input.value = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.GEMINI_KEY) || "";
  }
  if (m) m.style.display = "flex";
};

window.closeAIKeyModal = function () {
  const m = document.getElementById("modalAIKey");
  if (m) m.style.display = "none";
};

window.saveGeminiKey = function () {
  const key = document.getElementById("inputGeminiKey")?.value.trim();
  if (!key) {
    alert("कृपया API Key दर्ज करें।");
    return;
  }
  localStorage.setItem(VETCARE_CONFIG.STORAGE_KEYS.GEMINI_KEY, key);
  closeAIKeyModal();
  alert("Gemini AI API Key सुरक्षित कर ली गई है!");
};

window.sendCaseToAIConsultant = function () {
  const diag = document.getElementById("opdDiagnosis")?.value || "";
  const animal = document.getElementById("opdAnimal")?.value || "पशु";
  const med = document.getElementById("opdMedicine")?.value || "";
  const promptInput = document.getElementById("aiInputPrompt");

  switchTab("ai");
  if (promptInput) {
    promptInput.value = `मरीज: ${animal}\nलक्षण/रोग: ${diag}\nवर्तमान उपचार: ${med}\n\nकृपया इस केस पर अपना डिफरेंशियल डायग्नोसिस (Second Opinion) व सटीक एंटीबायोटिक सुझाव हिंदी में प्रदान करें।`;
  }
};

window.runAIConsultant = async function () {
  const prompt = document.getElementById("aiInputPrompt")?.value.trim();
  const out = document.getElementById("aiOutputArea");
  const btn = document.getElementById("btnRunAI");
  const apiKey = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.GEMINI_KEY);

  if (!prompt) {
    alert("कृपया पशु के लक्षण व केस विवरण लिखें।");
    return;
  }

  if (!apiKey) {
    alert("कृपया पहले अपनी Gemini API Key कॉन्फ़िगर करें।");
    openAIKeyModal();
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerText = "⏳ AI सर्जन विश्लेषण कर रहा है...";
  }

  if (out) {
    out.classList.remove("hidden");
    out.innerText = "AI क्लिनिकल विश्लेषण जारी है, कृपया प्रतीक्षा करें...";
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert veterinary surgeon and clinical consultant. Respond in practical, easy-to-understand Hindi for livestock field veterinarians in India.\n\nCase: ${prompt}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI से उत्तर प्राप्त करने में असमर्थ।";

    if (out) {
      out.innerText = reply;
    }
  } catch (err) {
    if (out) {
      out.innerText = "⚠️ कनेक्शन त्रुटि: API Key की पुष्टि करें अथवा इंटरनेट जांचें।";
    }
    console.error("AI Consultant Error:", err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
    }
  }
};

// =============================================================================
// 10. SYSTEM INITIALIZATION & EVENT LISTENERS
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Check stored role
  const savedRole = localStorage.getItem(VETCARE_CONFIG.STORAGE_KEYS.ROLE);
  if (savedRole) {
    selectRole(savedRole);
  }

  // Populate Saved Records & Finance
  renderSavedRecordsList();
  renderFinanceLedger();

  // Initialize offline sync detector
  const syncBadge = document.getElementById("cloudSyncStatusBadge");
  window.addEventListener("online", () => {
    if (syncBadge) {
      syncBadge.innerText = "☁️ LIVE SYNC";
      syncBadge.className = "text-[9px] bg-emerald-50 text-emerald-700 font-mono font-bold px-1.5 py-0.2 rounded border border-emerald-300";
    }
  });

  window.addEventListener("offline", () => {
    if (syncBadge) {
      syncBadge.innerText = "⚡ OFFLINE";
      syncBadge.className = "text-[9px] bg-amber-50 text-amber-700 font-mono font-bold px-1.5 py-0.2 rounded border border-amber-300";
    }
  });

  console.info(`Vetcare Clinical Core Engine initialized [v${VETCARE_CONFIG.APP_VERSION}]`);
});
