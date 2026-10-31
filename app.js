/**
 * Vetcare AI OS - Enterprise Clinical & Smart Dairy Assistant
 * Core Application Controller (app.js)
 * Strict Role-Based Separation, Gemini AI Engine & Financial Ledger
 */

// ============================================================================
// 1. GLOBAL ENTERPRISE CONFIGURATION & VERIFIED FINANCIALS
// ============================================================================
const VETCARE_CONFIG = {
  version: "4.2.0",
  adminPin: "9297",
  payeeName: "Vetcare Services",
  beneficiary: "Mr. Rahul",
  sbi: {
    bankName: "भारतीय स्टेट बैंक (SBI)",
    upiId: "rahuljangra9297@oksbi",
    account: "65204067585",
    ifsc: "SBIN0013693"
  },
  pnb: {
    bankName: "पंजाब नेशनल बैंक (PNB)",
    upiId: "rahuljangra9297-1@okicici",
    account: "6687001700015098",
    ifsc: "PUNB0668700"
  },
  aiModels: {
    primary: "gemini-2.5-flash",
    fallback: "gemini-2.0-flash"
  }
};

// ============================================================================
// 2. MULTI-LANGUAGE LOCALIZATION ENGINE
// ============================================================================
const I18N_STRINGS = {
  hi: {
    docRoleTitle: "🩺 क्लीनिकल मोड (अधिकृत पशु चिकित्सक)",
    farmerRoleTitle: "👨‍🌾 स्मार्ट पशुपालक (डेयरी मोड)",
    sessionText: "⏱️ सत्र",
    remainingText: "शेष",
    switchRole: "🔄 रोल बदलें",
    searchPlaceholder: "लक्षण या रोग खोजें (उदा. गलघोंटू, थनैल, अफारा)...",
    confirmDelete: "क्या आप इस रिकॉर्ड को हटाना चाहते हैं?",
    sendTagada: "व्हाट्सएप तगादा भेजें"
  },
  en: {
    docRoleTitle: "🩺 Clinical Mode (Registered Vet Practitioner)",
    farmerRoleTitle: "👨‍🌾 Smart Dairy Farmer (Farmer Mode)",
    sessionText: "⏱️ Session",
    remainingText: "left",
    switchRole: "🔄 Switch Role",
    searchPlaceholder: "Search symptoms or diseases (e.g. HS, Mastitis, Bloat)...",
    confirmDelete: "Are you sure you want to delete this record?",
    sendTagada: "Send WhatsApp Payment Reminder"
  },
  hinglish: {
    docRoleTitle: "🩺 Clinical Mode (Registered Vet Doctor)",
    farmerRoleTitle: "👨‍🌾 Smart Pashupalak (Dairy Mode)",
    sessionText: "⏱️ Session",
    remainingText: "baki",
    switchRole: "🔄 Role Badlein",
    searchPlaceholder: "Lakshan ya bimari khojein (Galghontu, Thanaila, Afara)...",
    confirmDelete: "Kya aap is entry ko delete karna chahte hain?",
    sendTagada: "WhatsApp Tagada Bhejein"
  },
  pa: {
    docRoleTitle: "🩺 ਕਲੀਨਿਕਲ ਮੋਡ (ਡਾਕਟਰ)",
    farmerRoleTitle: "👨‍🌾 ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ (ਪਸ਼ੂ ਪਾਲਕ)",
    sessionText: "⏱️ ਸੈਸ਼ਨ",
    remainingText: "ਬਾਕੀ",
    switchRole: "🔄 ਰੋਲ ਬਦਲੋ",
    searchPlaceholder: "ਲੱਛਣ ਜਾਂ ਬਿਮਾਰੀ ਖੋਜੋ...",
    confirmDelete: "ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    sendTagada: "ਵਟਸਐਪ ਤਗਾਦਾ ਭੇਜੋ"
  },
  mr: {
    docRoleTitle: "🩺 क्लिनिकल मोड (पशुवैद्यकीय डॉक्टर)",
    farmerRoleTitle: "👨‍🌾 स्मार्ट दुग्ध उत्पादक (शेतकरी मोड)",
    sessionText: "⏱️ सत्र",
    remainingText: "शिल्लक",
    switchRole: "🔄 भूमिका बदला",
    searchPlaceholder: "लक्षणे किंवा रोग शोधा...",
    confirmDelete: "तुम्हाला हे हटवायचे आहे का?",
    sendTagada: "व्हॉट्सॲप स्मरणपत्र पाठवा"
  },
  gu: {
    docRoleTitle: "🩺 ક્લિનિકલ મોડ (વેટરનરી ડૉક્ટર)",
    farmerRoleTitle: "👨‍🌾 સ્માર્ટ પશુપાલક (ખેડૂત મોડ)",
    sessionText: "⏱️ સત્ર",
    remainingText: "બાકી",
    switchRole: "🔄 રોલ બદલો",
    searchPlaceholder: "લક્ષણો અથવા રોગ શોધો...",
    confirmDelete: "શું તમે આ કાઢી નાખવા માંગો છો?",
    sendTagada: "વોટ્સએપ રીમાઇન્ડર મોકલો"
  },
  bn: {
    docRoleTitle: "🩺 ক্লিনিক্যাল মোড (ভেটেরিনারি ডাক্তার)",
    farmerRoleTitle: "👨‍🌾 স্মার্ট দুগ্ধ খামারী (কৃষক মোড)",
    sessionText: "⏱️ সেশন",
    remainingText: "বাকি",
    switchRole: "🔄 ভূমিকা পরিবর্তন",
    searchPlaceholder: "লক্ষণ বা রোগ অনুসন্ধান করুন...",
    confirmDelete: "আপনি কি এটি মুছে ফেলতে চান?",
    sendTagada: "হোয়াটসঅ্যাপ তাগাদা পাঠান"
  }
};

let currentLang = localStorage.getItem("vetcare_lang") || "hi";

// ============================================================================
// 3. MASTER EVIDENCE-BASED CLINICAL & DESI REPOSITORY
// ============================================================================
const CLINICAL_REPO = [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    temp: "105 - 107°F (अति तीव्र ज्वर)",
    cardinal: "गले व जबड़े के नीचे अत्यंत दर्दनाक सूजन, घर्र-घर्र की श्वास ध्वनि, आंखें लाल",
    keywords: ["गलघोंटू", "hs", "गले में सूजन", "घर्र-घर्र", "तेज बुखार", "hemorrhagic"],
    tier1: "Inj. Ceftiofur Sodium (1 gm/50kg) Deep I/M अथवा Inj. Enrofloxacin (10%) 5 mg/kg I/M 3 दिन",
    tier2: "Inj. Flunixin Meglumine (2.2 mg/kg) I/V अथवा Inj. Melonex Plus (15-20 ml) I/M",
    tier3: "Inj. Avil (10-15 ml) I/M + Dextrose Saline 5% (1-2 L) I/V निर्जलीकरण होने पर",
    tier4: "100 ग्राम सरसों तेल में 10 ग्राम कपूर व 25 ग्राम हल्दी उबालकर गुनगुना लेप गले की सूजन पर लगाएं।",
    tier5: "गाभिन पशुओं में Dexamethasone बिल्कुल न दें (गर्भपात का खतरा)। Isoflupredone 10ml I/M सुरक्षित विकल्प है।"
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    temp: "104 - 106°F",
    cardinal: "कंधे अथवा पुट्ठे के भारी मांस में गैस युक्त सूजन, हाथ से दबाने पर चर्र-चर्र (Crepitation) ध्वनि",
    keywords: ["लंगड़ा", "चरचरा", "bq", "black quarter", "चर्र-चर्र", "पुट्ठा सूजन"],
    tier1: "Inj. Procaine Penicillin 40 लाख IU I/M अथवा Inj. Amoxicillin + Sulbactam (4.5 gm) I/M",
    tier2: "Inj. Melonex Plus (15-20 ml) I/M दैनिक",
    tier3: "Inj. Tribivet / Belamyl (B-Complex) 10-12 ml I/M",
    tier4: "सूजन वाले स्थान को गर्म पानी व नीम की पत्तियों से सेकें। पशु को चलने न दें।",
    tier5: "सूजन वाले स्थान पर चीरा लगाकर 3% H2O2 से ड्रेन केवल अधिकृत चिकित्सक की देखरेख में करें।"
  },
  {
    id: "MASTITIS",
    nameHindi: "थनैल रोग (Clinical Mastitis)",
    category: "BACTERIAL",
    temp: "102 - 104°F",
    cardinal: "अयन/थन में कड़ापन, लाली, भीषण दर्द, दूध में रक्त अथवा गाढ़े पीले छिछड़े आना",
    keywords: ["थनैल", "mastitis", "अयन", "थन कड़ा", "दूध में खून", "छिछड़े"],
    tier1: "Inj. Intacef Tazo (3375 mg) I/V या I/M 3 दिन अथवा Inj. Marbofloxacin (10%) 2 mg/kg",
    tier2: "Inj. Melonex Plus (15 ml) I/M + Inj. Serratiopeptidase (एंटी-फाइब्रिनोलिटिक)",
    tier3: "Intramammary Infusion: Mastilep / Tilmicosin ट्यूब थन को पूरी तरह खाली कर चढ़ाएं",
    tier4: "250g घृतकुमारी (एलोवेरा) + 50g हल्दी + 15g चूना पीसकर गाढ़ा लेप बनाएं व थन पर दिन में 3 बार लगाएं।",
    tier5: "दूध निकालने के बाद थन की नाल को 15 मिनट तक जमीन या कीचड़ के संपर्क में न आने दें।"
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    temp: "कम तापमान (<100°F / Subnormal Hypothermia)",
    cardinal: "ब्याने के 24-72 घंटे बाद गर्दन मोड़कर बैठना, शरीर व कान ठंडे, पुतलियां फैली हुई",
    keywords: ["मिल्क फीवर", "hypocalcemia", "गर्दन मोड़ना", "ठंडा शरीर", "milk fever"],
    tier1: "Calcium Borogluconate 25% (CBG / Mifex) 450 ml (300ml धीमी I/V + 150ml S/C)",
    tier2: "Inj. Tonophosphan (10 ml) I/M फॉस्फोरस आपूर्ति हेतु",
    tier3: "Inj. Tribivet (10 ml) I/M + Cal-Up जेल ओरल (होश आने पर)",
    tier4: "पशु के शरीर को तुरंत गर्म बोरी व कम्बल से ढंकें। पैर व कान की मालिश करें।",
    tier5: "गंभीर चेतावनी: कैल्शियम ड्रिप अति धीमी गति से दें और हृदय गति लगातार जांचें। जबरन नाल न पिलाएं।"
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Bovine Ketosis)",
    category: "METABOLIC",
    temp: "101.5°F (सामान्य)",
    cardinal: "सांस, पेशाब व दूध से मीठी एसीटोन गंध, दाना छोड़कर केवल सूखा भूसा खाना, अचानक दूध घटना",
    keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "aceto", "दूध गिरना", "भूसा खाना"],
    tier1: "Dextrose 20% or 25% 1000 ml तीव्र गति से I/V",
    tier2: "Inj. Isoflupredone acetate (10 ml) I/M (ग्लूकोनियोजेनेसिस उत्तेजक)",
    tier3: "Propylene Glycol 200 ml ओरल दिन में 2 बार 4 दिनों तक",
    tier4: "250 ग्राम पुराना गुड़ + 50 मिली कच्ची घानी सरसों तेल मिलाकर 5 दिन दें।",
    tier5: "पशु को अचानक अत्यधिक सूखा दाना न दें, ऊर्जा व रेशे का अनुपात बनाए रखें।"
  },
  {
    id: "BLOAT",
    nameHindi: "अफारा / रूमेन टिम्पनी (Bloat / Tympany)",
    category: "METABOLIC",
    temp: "101.5 - 102°F",
    cardinal: "बायां पेट ढोलक की तरह तन जाना, जीभ बाहर निकालना, भीषण छटपटाहट व सांस फूलना",
    keywords: ["अफारा", "bloat", "पेट फूलना", "tympany", "ढोलक पेट", "गैस"],
    tier1: "Bloatosil / Tympol Liquid (100 ml) ओरल नाल द्वारा सीधे पेट में",
    tier2: "Inj. Spasmovet / Melonex Plus (10-15 ml) I/M पेट दर्द व मरोड़ में",
    tier3: "Himalayan Batisa (50g) + Bioboost बोलस 2 गोली सुबह-शाम",
    tier4: "50 मिली तारपीन का तेल + 300 मिली मीठा तेल + 20 ग्राम शुद्ध हींग मिलाकर नाल से दें।",
    tier5: "अति-आपातकाल में बाएं फ्लैंक के केंद्र में Trocar & Cannula द्वारा तुरंत गैस निकालें।"
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Red Water Disease)",
    category: "PROTOZOAL",
    temp: "105 - 107°F (तेज चिचड़ी बुखार)",
    cardinal: "गहरा लाल या कॉफी जैसा पेशाब (Hemoglobinuria), अत्यधिक दुर्बलता, एनीमिया",
    keywords: ["बबेशिया", "babesiosis", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी बुखार"],
    tier1: "Inj. Diminazene Aceturate (Berenil) 3.5 - 5 mg/kg Deep I/M सिंगल डोज़",
    tier2: "Inj. Melonex Plus (15 ml) I/M बुखार व दर्द नियंत्रण हेतु",
    tier3: "Inj. Feritas / Imferon (Iron Sorbitol) 10 ml I/M + Dextrose Saline 5% (1 L) I/V",
    tier4: "पशु को ठंडे व छायादार स्थान पर बांधें। ताज़ा ठंडा पानी व गुड़-शर्बत पिलाएं।",
    tier5: "Flumethrin अथवा Amitraz द्वारा शरीर से चिचड़ियों का संपूर्ण खात्मा तुरंत करें।"
  }
];

// ============================================================================
// 4. PERSISTENT APPLICATION STATE & LOCAL STORAGE WRAPPERS
// ============================================================================
let AppState = {
  activeRole: null, // 'doctor' | 'farmer'
  currentTab: null,
  sessionRemaining: 3600, // 60 minutes
  timerInterval: null,
  khataRecords: [],
  clinicStock: [],
  geminiKey: ""
};

// Safe LocalStorage Reader
function loadStorageData() {
  try {
    AppState.geminiKey = localStorage.getItem("vetcare_gemini_key") || "";
    AppState.khataRecords = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    AppState.clinicStock = JSON.parse(localStorage.getItem("vetcare_clinic_stock") || "[]");

    if (AppState.clinicStock.length === 0) {
      // Default stock entries for doctors
      AppState.clinicStock = [
        { id: 1, name: "Inj. Intacef Tazo 3375mg", category: "INJECTION", qty: 12, unit: "vials", minAlert: 5 },
        { id: 2, name: "Inj. Melonex Plus 100ml", category: "INJECTION", qty: 4, unit: "vials", minAlert: 2 },
        { id: 3, name: "Inj. Avil 100ml", category: "INJECTION", qty: 6, unit: "vials", minAlert: 2 },
        { id: 4, name: "Mifex (CBG 450ml)", category: "INJECTION", qty: 8, unit: "bottles", minAlert: 3 },
        { id: 5, name: "Murrah Bull Semen Straws", category: "SEMEN", qty: 45, unit: "straws", minAlert: 15 }
      ];
      localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
    }
  } catch (err) {
    console.error("Storage load error:", err);
    AppState.khataRecords = [];
    AppState.clinicStock = [];
  }
}

function persistKhata() {
  localStorage.setItem("vetcare_khata_records", JSON.stringify(AppState.khataRecords));
}

function persistStock() {
  localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
}

// ============================================================================
// 5. 60-MINUTE SESSION COUNTDOWN ENGINE
// ============================================================================
function initSessionCountdown() {
  if (AppState.timerInterval) clearInterval(AppState.timerInterval);

  const timerBadge = document.getElementById("session-timer-badge");

  function updateTimerDisplay() {
    const mins = Math.floor(AppState.sessionRemaining / 60);
    const secs = AppState.sessionRemaining % 60;
    const formatted = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    const strings = I18N_STRINGS[currentLang] || I18N_STRINGS.hi;

    if (timerBadge) {
      timerBadge.innerText = `${strings.sessionText}: ${formatted} ${strings.remainingText}`;
    }

    if (AppState.sessionRemaining <= 0) {
      AppState.sessionRemaining = 3600; // Auto-renew session seamlessly
    } else {
      AppState.sessionRemaining--;
    }
  }

  updateTimerDisplay();
  AppState.timerInterval = setInterval(updateTimerDisplay, 1000);
}

// ============================================================================
// 6. STRICT ROLE SEPARATION & DYNAMIC BOTTOM NAVIGATION
// ============================================================================
window.selectRole = function(role) {
  localStorage.setItem("vetcare_registered_role", role);
  applyRoleState(role);
};

window.applyRoleState = function(role) {
  AppState.activeRole = role;
  const strings = I18N_STRINGS[currentLang] || I18N_STRINGS.hi;

  // 1. Update Landing & Main View Shells
  const landingScreen = document.getElementById("role-selection-screen");
  const mainApp = document.getElementById("main-app-container");
  const roleBadge = document.getElementById("current-user-role-badge");

  if (landingScreen) {
    landingScreen.style.display = "none";
  }
  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.style.display = "block";
  }

  // 2. Setup Dynamic Role Title
  if (roleBadge) {
    roleBadge.innerText = role === "doctor" ? strings.docRoleTitle : strings.farmerRoleTitle;
    roleBadge.className = role === "doctor"
      ? "text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200"
      : "text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200";
  }

  // 3. Render Role-Exclusive Bottom Navigation Bar
  renderRoleSpecificNavbar(role);

  // 4. Ensure Dynamic Containers Exist in Main DOM
  mountMissingViewContainers();

  // 5. Hide/Show Role-Exclusive Sections and Default View
  if (role === "doctor") {
    // Hide farmer-only sections
    hideElement("viewBreeding");
    hideElement("viewFeed");
    hideElement("viewFarmerRemedies");
    hideElement("viewFarmerHelpdesk");

    // Default to Clinical Diagnosis
    window.switchTab("diagnosis");
  } else {
    // Hide doctor-only sections
    hideElement("viewRx");
    hideElement("viewWeightCalc");
    hideElement("viewInventory");
    hideElement("viewDiagnosis");

    // Default to Farmer Remedies
    window.switchTab("farmer_remedies");
  }
};

function renderRoleSpecificNavbar(role) {
  const navContainer = document.querySelector("#main-app-container nav");
  if (!navContainer) return;

  if (role === "doctor") {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('diagnosis')" id="navDiagnosis" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">🩺</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">रोग निदान</span>
      </button>
      <button onclick="window.switchTab('weight')" id="navWeight" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">⚖️</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">वजन व खुराक</span>
      </button>
      <button onclick="window.switchTab('rx')" id="navRx" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">📋</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">ओपीडी पर्चा</span>
      </button>
      <button onclick="window.switchTab('inventory')" id="navInventory" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">📦</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दवा स्टॉक</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">📒</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">क्लिनिक खाता</span>
      </button>
    `;
  } else {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('farmer_remedies')" id="navFarmerRemedies" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">🌿</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">देसी उपचार</span>
      </button>
      <button onclick="window.switchTab('feed')" id="navFeed" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">🌾</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">संतुलित आहार</span>
      </button>
      <button onclick="window.switchTab('breeding')" id="navBreeding" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">⏳</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">प्रजनन चक्र</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">🥛</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दूध बहीखाता</span>
      </button>
      <button onclick="window.switchTab('farmer_helpdesk')" id="navFarmerHelpdesk" class="flex flex-col items-center text-slate-500 transition py-1">
        <span class="text-base sm:text-lg">💬</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">डॉक्टर सहायता</span>
      </button>
    `;
  }
}

function mountMissingViewContainers() {
  const main = document.querySelector("#main-app-container main");
  if (!main) return;

  // 1. Inventory View for Doctor
  if (!document.getElementById("viewInventory")) {
    const invSection = document.createElement("section");
    invSection.id = "viewInventory";
    invSection.className = "hidden space-y-4";
    invSection.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 text-xs sm:text-sm">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2.5">
          <div>
            <h2 class="font-black text-slate-900 flex items-center gap-1.5 text-sm sm:text-base">
              <span>📦</span> दवा व सीमन स्ट्रॉ स्टॉक इन्वेंट्री (Clinic Stock)
            </h2>
            <p class="text-[11px] text-slate-500">कम स्टॉक की दवाओं पर ऑटोमैटिक अलर्ट</p>
          </div>
          <button onclick="openNewStockModal()" class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-bold transition">
            + नया स्टॉक
          </button>
        </div>
        <div id="stockListContainer" class="space-y-2"></div>
      </div>
    `;
    main.appendChild(invSection);
  }

  // 2. Safe Herbal Remedies View for Farmer
  if (!document.getElementById("viewFarmerRemedies")) {
    const remediesSection = document.createElement("section");
    remediesSection.id = "viewFarmerRemedies";
    remediesSection.className = "hidden space-y-4";
    remediesSection.innerHTML = `
      <div class="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-5 text-white shadow-md space-y-2">
        <h2 class="text-base sm:text-lg font-bold flex items-center gap-1.5">
          <span>🌿</span> सिद्ध आयुर्वेदिक व सुरक्षित देसी उपचार (Zero Injections)
        </h2>
        <p class="text-xs text-emerald-100 leading-relaxed">
          पशुपालक भाइयों के लिए घर पर उपलब्ध सुरक्षित जड़ी-बूटियों एवं परखे हुए घरेलू काढ़े। बिना किसी सुई/इंजेक्शन के प्राथमिक राहत।
        </p>
        <input 
          type="text" 
          placeholder="रोग खोजें (उदा. थनैल, अफारा, खुरपका, जुकाम, बुखार)..."
          oninput="handleFarmerRemedySearch(this.value)"
          class="w-full bg-white text-slate-900 placeholder-slate-400 rounded-2xl px-4 py-2.5 text-xs sm:text-sm outline-none font-medium mt-2 shadow-sm"
        />
      </div>
      <div id="farmerRemediesContainer" class="space-y-3"></div>
    `;
    main.appendChild(remediesSection);
  }

  // 3. Private Support Ticket & Helpdesk View for Farmer
  if (!document.getElementById("viewFarmerHelpdesk")) {
    const helpdeskSection = document.createElement("section");
    helpdeskSection.id = "viewFarmerHelpdesk";
    helpdeskSection.className = "hidden space-y-4";
    helpdeskSection.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 text-xs sm:text-sm">
        <div class="border-b border-slate-100 pb-2">
          <h2 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span>💬</span> डॉक्टर व एडमिन सहायता (Direct Support)
          </h2>
          <p class="text-xs text-slate-500">पशु की गंभीर समस्या अथवा भुगतान सहायता हेतु सीधे संपर्क करें</p>
        </div>
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
          <strong class="text-emerald-900 font-bold block">पशु स्वास्थ्य इमरजेंसी हेल्पलाइन:</strong>
          <p class="text-emerald-800 text-xs">यदि पशु की हालत गंभीर है तो तुरंत अधिकृत डॉक्टर से परामर्श लें या हमारे आपातकालीन व्हाट्सएप पर केस हिस्ट्री भेजें।</p>
          <button onclick="dispatchEmergencySupportWhatsApp()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
            <span>🚨 डॉक्टर को व्हाट्सएप पर केस भेजें</span>
          </button>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 font-mono text-xs text-slate-700">
          <div class="flex justify-between font-sans">
            <span class="text-slate-500">लाभार्थी / Payee:</span>
            <span class="font-bold text-slate-900">${VETCARE_CONFIG.payeeName} (${VETCARE_CONFIG.beneficiary})</span>
          </div>
          <div class="flex justify-between">
            <span class="font-sans text-slate-500">SBI UPI:</span>
            <span class="font-bold text-blue-700">${VETCARE_CONFIG.sbi.upiId}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-sans text-slate-500">PNB UPI:</span>
            <span class="font-bold text-amber-800">${VETCARE_CONFIG.pnb.upiId}</span>
          </div>
        </div>
      </div>
    `;
    main.appendChild(helpdeskSection);
  }
}

function hideElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

function showElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

// Global Tab Switcher
window.switchTab = function(tabId) {
  AppState.currentTab = tabId;

  const allViews = [
    "viewDiagnosis",
    "viewWeightCalc",
    "viewRx",
    "viewBreeding",
    "viewFeed",
    "viewFinance",
    "viewInventory",
    "viewFarmerRemedies",
    "viewFarmerHelpdesk"
  ];

  allViews.forEach(v => hideElement(v));

  // Remove active styling on all nav buttons
  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active-nav-tab", "text-blue-600", "text-emerald-600");
    btn.classList.add("text-slate-500");
  });

  const targetMap = {
    diagnosis: { view: "viewDiagnosis", nav: "navDiagnosis" },
    weight: { view: "viewWeightCalc", nav: "navWeight" },
    rx: { view: "viewRx", nav: "navRx" },
    inventory: { view: "viewInventory", nav: "navInventory" },
    breeding: { view: "viewBreeding", nav: "navBreeding" },
    feed: { view: "viewFeed", nav: "navFeed" },
    finance: { view: "viewFinance", nav: "navFinance" },
    farmer_remedies: { view: "viewFarmerRemedies", nav: "navFarmerRemedies" },
    farmer_helpdesk: { view: "viewFarmerHelpdesk", nav: "navFarmerHelpdesk" }
  };

  const target = targetMap[tabId];
  if (target) {
    showElement(target.view);
    const navBtn = document.getElementById(target.nav);
    if (navBtn) {
      navBtn.classList.remove("text-slate-500");
      navBtn.classList.add("active-nav-tab");
      if (AppState.activeRole === "doctor") {
        navBtn.classList.add("text-blue-600");
      } else {
        navBtn.classList.add("text-emerald-600");
      }
    }
  }

  // Trigger content renderers
  if (tabId === "diagnosis") renderClinicalDiseases(CLINICAL_REPO);
  if (tabId === "farmer_remedies") renderFarmerSafeRemedies(CLINICAL_REPO);
  if (tabId === "inventory") renderClinicStock();
  if (tabId === "finance") renderKhataLedger();
};

// ============================================================================
// 7. CLINICAL VS FARMER VIEW RENDERERS (ZERO CROSS-CONTAMINATION)
// ============================================================================
function renderClinicalDiseases(diseases) {
  const container = document.getElementById("diseaseResultsContainer");
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">कोई रोग मेल नहीं खाया।</div>`;
    return;
  }

  container.innerHTML = diseases.map(d => `
    <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      <div class="flex justify-between items-start gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">${d.category}</span>
          <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${d.nameHindi}</h3>
        </div>
        <span class="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-xl shrink-0">🌡️ ${d.temp}</span>
      </div>

      <p class="text-xs text-slate-700 leading-relaxed"><strong class="text-slate-900">🚨 कार्डिनल लक्षण:</strong> ${d.cardinal}</p>

      <!-- 5-Tier Scientific Protocol Table -->
      <div class="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200 font-sans">
        <div class="p-2 bg-white rounded-xl border border-blue-200">
          <span class="text-[10px] font-black text-blue-700 uppercase block tracking-wider">Tier 1: ड्रग ऑफ चॉइस / मुख्य एंटीबायोटिक</span>
          <p class="text-slate-800 font-bold mt-0.5">${d.tier1}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-emerald-200">
          <span class="text-[10px] font-black text-emerald-700 uppercase block tracking-wider">Tier 2: दर्द व सूजन निवारक (NSAID)</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier2}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-purple-200">
          <span class="text-[10px] font-black text-purple-700 uppercase block tracking-wider">Tier 3: एंटीहिस्टामिनिक व सपोर्टिव फ्लूइड</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier3}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-amber-200">
          <span class="text-[10px] font-black text-amber-700 uppercase block tracking-wider">Tier 4: घरेलू हर्बल व सहायक नुस्खा</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier4}</p>
        </div>
        <div class="p-2 bg-rose-50 rounded-xl border border-rose-200">
          <span class="text-[10px] font-black text-rose-700 uppercase block tracking-wider">Tier 5: क्लिनिकल सावधानियां व मतभेद (Contraindications)</span>
          <p class="text-rose-900 font-bold mt-0.5">${d.tier5}</p>
        </div>
      </div>

      <div class="flex gap-2 pt-1">
        <button onclick="window.loadIntoOPDSlip('${d.nameHindi}', '${d.tier1}\\n${d.tier2}\\n${d.tier3}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
          <span>📝 ओपीडी पर्चे में भरें</span> <span>→</span>
        </button>
        <button onclick="window.consultGeminiDifferential('${d.nameHindi}', '${d.cardinal}')" class="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold border border-purple-200 px-3 py-2.5 rounded-xl text-xs transition" title="AI सेकंड ओपिनियन">
          🤖 AI कंसल्ट
        </button>
      </div>
    </div>
  `).join("");
}

function renderFarmerSafeRemedies(diseases) {
  const container = document.getElementById("farmerRemediesContainer");
  if (!container) return;

  container.innerHTML = diseases.map(d => `
    <div class="bg-white border-2 border-emerald-100 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      <div class="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
          <span>🌿</span> ${d.nameHindi}
        </h3>
        <span class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">प्राकृतिक उपचार</span>
      </div>

      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
        <strong class="text-emerald-950 text-xs block mb-1">🍵 सिद्ध देसी काढ़ा व घरेलू लेप:</strong>
        <p class="text-xs text-emerald-900 leading-relaxed">${d.tier4}</p>
      </div>

      <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
        <strong class="text-amber-950 text-xs block mb-1">⚠️ पशुपालक ध्यान दें (सुरक्षा नियम):</strong>
        <p class="text-xs text-amber-900 leading-relaxed">${d.tier5}</p>
      </div>
    </div>
  `).join("");
}

function handleFarmerRemedySearch(query) {
  const q = (query || "").toLowerCase().trim();
  const filtered = CLINICAL_REPO.filter(d => {
    return (d.nameHindi || "").toLowerCase().includes(q) ||
           (d.tier4 || "").toLowerCase().includes(q) ||
           d.keywords.some(k => (k || "").toLowerCase().includes(q));
  });
  renderFarmerSafeRemedies(filtered);
}

// ============================================================================
// 8. SHAEFFER'S WEIGHT & ACCURATE DRUG ML DOSAGE CALCULATOR
// ============================================================================
window.calculateShaefferDosage = function() {
  const lenInput = document.getElementById("calcLengthInches");
  const girthInput = document.getElementById("calcGirthInches");

  const length = parseFloat(lenInput ? lenInput.value : 60) || 60;
  const girth = parseFloat(girthInput ? girthInput.value : 70) || 70;

  // Formula: Body Weight (kg) = (Length in inches * Girth in inches^2) / 660
  const weightKg = Math.round((length * Math.pow(girth, 2)) / 660);
  const weightLbs = Math.round(weightKg * 2.20462);

  const kgEl = document.getElementById("computedWeightKg");
  const lbsEl = document.getElementById("computedWeightLbs");
  if (kgEl) kgEl.innerText = weightKg;
  if (lbsEl) lbsEl.innerText = weightLbs;

  // Exact ml and dosage mapping
  const cefEl = document.getElementById("doseCeftriaxone");
  const melEl = document.getElementById("doseMeloxicam");
  const avilEl = document.getElementById("doseAvil");
  const iverEl = document.getElementById("doseIvermectin");

  if (cefEl) cefEl.innerText = `${((weightKg * 10) / 1000).toFixed(1)} gm (I/M or I/V)`;
  if (melEl) melEl.innerText = `${((weightKg * 0.5) / 10 * 2).toFixed(1)} ml (I/M)`;
  if (avilEl) avilEl.innerText = `${Math.min(22, Math.max(8, Math.round(weightKg * 0.03)))} ml (I/M)`;
  if (iverEl) iverEl.innerText = `${(weightKg / 50).toFixed(1)} ml (S/C strictly)`;
};

// ============================================================================
// 9. DIGITAL OPD PRESCRIPTION & 1-CLICK WHATSAPP DISPATCH
// ============================================================================
window.loadIntoOPDSlip = function(diseaseName, drugText) {
  const diagInput = document.getElementById("opdDiagnosis");
  const medInput = document.getElementById("opdMedicine");

  if (diagInput) diagInput.value = diseaseName;
  if (medInput) medInput.value = drugText;

  window.switchTab("rx");
};

window.dispatchOPDWhatsApp = function() {
  const farmerName = (document.getElementById("opdFarmerName")?.value || "").trim();
  const phone = (document.getElementById("opdFarmerPhone")?.value || "").trim().replace(/\D/g, "");
  const animal = document.getElementById("opdAnimal")?.value || "पशु";
  const diagnosis = (document.getElementById("opdDiagnosis")?.value || "").trim();
  const rx = (document.getElementById("opdMedicine")?.value || "").trim();
  const total = document.getElementById("opdTotalFee")?.value || "0";
  const paid = document.getElementById("opdPaidFee")?.value || "0";
  const due = document.getElementById("opdDueFee")?.value || "0";

  if (!farmerName || phone.length < 10 || !diagnosis) {
    alert("कृपया किसान का नाम, 10 अंकों का फोन नंबर व निदान अवश्य भरें!");
    return;
  }

  const msg = `*🩺 VETCARE CLINICAL OPD PRESCRIPTION*\n` +
              `*दिनांक:* ${new Date().toLocaleDateString("hi-IN")}\n` +
              `-----------------------------------------\n` +
              `👤 *किसान:* ${farmerName}\n` +
              `🐾 *पशु:* ${animal}\n` +
              `🚨 *क्लिनिकल निदान:* ${diagnosis}\n` +
              `-----------------------------------------\n` +
              `💊 *Rx सुझाई गई दवाएं व इंजेक्शन:*\n${rx}\n` +
              `-----------------------------------------\n` +
              `💰 *फीस:* कुल ₹${total} | जमा ₹${paid} | *बकाया ₹${due}*\n\n` +
              `🏛️ *बैंक भुगतान विवरण (UPI):*\n` +
              `Payee: ${VETCARE_CONFIG.payeeName}\n` +
              `SBI UPI: ${VETCARE_CONFIG.sbi.upiId}\n` +
              `PNB UPI: ${VETCARE_CONFIG.pnb.upiId}\n\n` +
              `_Vetcare AI OS द्वारा निर्गत डिजिटल पर्चा_`;

  const fullNumber = phone.length === 10 ? `91${phone}` : phone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 10. CLINIC INVENTORY COUNTER
// ============================================================================
function renderClinicStock() {
  const container = document.getElementById("stockListContainer");
  if (!container) return;

  if (AppState.clinicStock.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">कोई स्टॉक आइटम मौजूद नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.clinicStock.map((item, idx) => {
    const isLow = item.qty <= item.minAlert;
    return `
      <div class="flex items-center justify-between p-3 rounded-2xl border ${isLow ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'}">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-xs font-black text-slate-900">${item.name}</strong>
            ${isLow ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">कम स्टॉक</span>' : ''}
          </div>
          <span class="text-[11px] text-slate-500">${item.category} • अलर्ट सीमा: ${item.minAlert} ${item.unit}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="adjustStockQty(${idx}, -1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700">-</button>
          <span class="text-xs font-black w-8 text-center">${item.qty}</span>
          <button onclick="adjustStockQty(${idx}, 1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700">+</button>
        </div>
      </div>
    `;
  }).join("");
}

window.adjustStockQty = function(index, delta) {
  if (AppState.clinicStock[index]) {
    AppState.clinicStock[index].qty = Math.max(0, AppState.clinicStock[index].qty + delta);
    persistStock();
    renderClinicStock();
  }
};

window.openNewStockModal = function() {
  const name = prompt("दवा अथवा सीमन स्ट्रॉ का नाम:");
  if (!name) return;
  const qty = parseInt(prompt("वर्तमान स्टॉक मात्रा:") || "10", 10);
  AppState.clinicStock.unshift({
    id: Date.now(),
    name: name,
    category: "INJECTION",
    qty: isNaN(qty) ? 10 : qty,
    unit: "vials",
    minAlert: 3
  });
  persistStock();
  renderClinicStock();
};

// ============================================================================
// 11. KHATA LEDGER & 1-CLICK WHATSAPP TAGADA
// ============================================================================
function renderKhataLedger() {
  const container = document.getElementById("khataListContainer");
  if (!container) return;

  let totalPaid = 0;
  let totalDue = 0;

  AppState.khataRecords.forEach(item => {
    if (item.type === "PAID") totalPaid += item.amount;
    else totalDue += item.amount;
  });

  const paidEl = document.getElementById("khataTotalPaid");
  const dueEl = document.getElementById("khataTotalDues");
  if (paidEl) paidEl.innerText = `₹${totalPaid}`;
  if (dueEl) dueEl.innerText = `₹${totalDue}`;

  const strings = I18N_STRINGS[currentLang] || I18N_STRINGS.hi;

  if (AppState.khataRecords.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">खाते में कोई प्रविष्टि नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.khataRecords.map((item, idx) => `
    <div class="flex items-center justify-between p-3.5 rounded-2xl border ${item.type === 'PAID' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}">
      <div>
        <strong class="text-xs font-black text-slate-900 block">${item.farmerName}</strong>
        <span class="text-[11px] text-slate-600 font-mono">${item.phone || '-'}</span>
        <p class="text-[10px] text-slate-500 mt-0.5">${item.note || ''} • ${item.date}</p>
      </div>
      <div class="text-right space-y-1">
        <span class="text-xs font-black block ${item.type === 'PAID' ? 'text-emerald-700' : 'text-rose-700'}">
          ${item.type === 'PAID' ? '+ ₹' : '- ₹'}${item.amount}
        </span>
        <div class="flex items-center gap-1 justify-end">
          ${item.type === 'DUE' && item.phone && item.phone.length >= 10 ? `
            <button onclick="sendKhataWhatsAppTagada(${idx})" class="text-[10px] bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-0.5 rounded-md shadow-xs">
              तगादा 💬
            </button>
          ` : ''}
          <button onclick="removeKhataRecord(${idx})" class="text-[10px] text-slate-400 hover:text-rose-600 font-bold ml-1">✕</button>
        </div>
      </div>
    </div>
  `).join("");
}

window.sendKhataWhatsAppTagada = function(index) {
  const item = AppState.khataRecords[index];
  if (!item) return;

  const cleanPhone = (item.phone || "").replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    alert("वैध 10 अंकों का फोन नंबर उपलब्ध नहीं है!");
    return;
  }

  const msg = `*📢 VETCARE क्लिनिक भुगतान स्मरण पत्र*\n\n` +
              `नमस्ते *${item.farmerName}* जी,\n` +
              `आपके क्लिनिक/डेयरी खाते का कुल बकाया *₹${item.amount}* है (${item.note || 'पशु उपचार/दवा'})।\n\n` +
              `कृपया निम्न अधिकृत खाते में शीघ्र भुगतान करने की कृपा करें:\n` +
              `🏛️ *Payee:* ${VETCARE_CONFIG.payeeName} (${VETCARE_CONFIG.beneficiary})\n` +
              `🔹 *SBI UPI:* ${VETCARE_CONFIG.sbi.upiId}\n` +
              `🔹 *PNB UPI:* ${VETCARE_CONFIG.pnb.upiId}\n` +
              `🔹 *SBI A/C:* ${VETCARE_CONFIG.sbi.account} (IFSC: ${VETCARE_CONFIG.sbi.ifsc})\n\n` +
              `धन्यवाद, Vetcare क्लिनिकल सपोर्ट।`;

  const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.removeKhataRecord = function(index) {
  const strings = I18N_STRINGS[currentLang] || I18N_STRINGS.hi;
  if (confirm(strings.confirmDelete)) {
    AppState.khataRecords.splice(index, 1);
    persistKhata();
    renderKhataLedger();
  }
};

// ============================================================================
// 12. GEMINI AI CLINICAL CONSULTANT (GEMINI 2.5 & 2.0 FLASH WITH FALLBACK)
// ============================================================================
window.consultGeminiDifferential = async function(diseaseName, symptoms) {
  const apiKey = localStorage.getItem("vetcare_gemini_key") || "";
  if (!apiKey) {
    alert("कृपया ऊपर दिए गए ⚙️ AI Key बटन पर क्लिक करके Google AI Studio से प्राप्त Gemini API Key दर्ज करें!");
    return;
  }

  const prompt = `Act as an expert Veterinary Surgeon and differential diagnosis consultant.
Analyze this case:
Disease suspected: ${diseaseName}
Key clinical symptoms: ${symptoms}

Please provide:
1. Top 2 Differential Diagnoses to rule out.
2. Immediate emergency allopathic drug lines with doses.
3. Crucial lab tests (blood smear, milk test, or urinalysis).
4. Direct instructions in concise bullet points in clean Hindi and English mix.`;

  const models = [VETCARE_CONFIG.aiModels.primary, VETCARE_CONFIG.aiModels.fallback];
  let responseText = null;

  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) break;
      }
    } catch (e) {
      console.warn(`Model ${model} failed, trying next...`, e);
    }
  }

  if (responseText) {
    alert(`🤖 AI क्लिनिकल सेकंड ओपिनियन:\n\n${responseText}`);
  } else {
    alert("Gemini AI से संपर्क स्थापित नहीं हो सका। कृपया अपनी API Key की जांच करें।");
  }
};

window.dispatchEmergencySupportWhatsApp = function() {
  const msg = `*🚨 आपातकालीन पशु स्वास्थ्य परामर्श अनुरोध*\n\n` +
              `नमस्ते डॉक्टर साहब, मुझे अपने पशु के संबंध में आपातकालीन क्लिनिकल सहायता की आवश्यकता है।\n` +
              `ऐप: Vetcare AI OS`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 13. LANGUAGE ENGINE HOOK
// ============================================================================
window.changeLanguage = function(lang) {
  currentLang = lang;
  localStorage.setItem("vetcare_lang", lang);
  if (AppState.activeRole) {
    applyRoleState(AppState.activeRole);
  }
};

// ============================================================================
// 14. BOOTSTRAPPER & INITIAL LOAD GUARD
// ============================================================================
function initApp() {
  loadStorageData();
  initSessionCountdown();

  // Attach search listeners defensively
  const searchInput = document.getElementById("unifiedDiseaseSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      const q = (e.target.value || "").toLowerCase().trim();
      const filtered = CLINICAL_REPO.filter(item => {
        return (item.nameHindi || "").toLowerCase().includes(q) ||
               (item.cardinal || "").toLowerCase().includes(q) ||
               item.keywords.some(k => (k || "").toLowerCase().includes(q));
      });
      renderClinicalDiseases(filtered);
    });
  }

  // Check persistent role on initial load
  const savedRole = localStorage.getItem("vetcare_registered_role");
  if (savedRole === "doctor" || savedRole === "farmer") {
    applyRoleState(savedRole);
  } else {
    // Show role selection screen
    const landing = document.getElementById("role-selection-screen");
    const mainApp = document.getElementById("main-app-container");
    if (landing) landing.style.display = "flex";
    if (mainApp) mainApp.style.display = "none";
  }
}

// Fire when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
