/**
 * ============================================================================
 * VETCARE CLINICAL OS & SMART DAIRY ASSISTANT - APPLICATION CONTROLLER ENGINE
 * File: app.js
 * ============================================================================
 */

// ============================================================================
// 1. TOP-OF-FILE GLOBAL BINDINGS & DEFENSIVE ATTACHMENTS (LINE 1 COMPLIANCE)
// ============================================================================
window.selectRole = window.selectRole || function(role) {
  try { localStorage.setItem('vetcare_active_role', role); } catch (e) {}
  var landing = document.getElementById('role-selection-screen');
  var mainApp = document.getElementById('main-app-container');
  if (landing) { landing.classList.add('hidden'); landing.style.display = 'none'; }
  if (mainApp) { mainApp.classList.remove('hidden'); mainApp.style.display = 'block'; }
  if (typeof window.applyRoleState === 'function') {
    window.applyRoleState(role);
  }
};

window.openDoctorDeclarationModal = window.openDoctorDeclarationModal || function() {
  var m = document.getElementById('doctor-declaration-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
  else { window.selectRole('doctor'); }
};

window.closeDoctorDeclarationModal = window.closeDoctorDeclarationModal || function() {
  var m = document.getElementById('doctor-declaration-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
};

window.confirmDoctorRole = window.confirmDoctorRole || function() {
  window.closeDoctorDeclarationModal();
  window.selectRole('doctor');
};

window.openAdminPinModal = window.openAdminPinModal || function() {
  var m = document.getElementById('admin-pin-modal');
  var err = document.getElementById('pinErrorMessage');
  var inp = document.getElementById('inputAdminPIN');
  if (err) err.classList.add('hidden');
  if (inp) { inp.value = ''; setTimeout(function() { inp.focus(); }, 150); }
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
};

window.closeAdminPinModal = window.closeAdminPinModal || function() {
  var m = document.getElementById('admin-pin-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
};

window.openPaymentModal = window.openPaymentModal || function() {
  var m = document.getElementById('payment-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
  if (typeof window.updatePaymentUI === 'function') window.updatePaymentUI();
};

window.closePaymentModal = window.closePaymentModal || function() {
  var m = document.getElementById('payment-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
};

window.openHelpdeskTicketModal = window.openHelpdeskTicketModal || function() {
  var m = document.getElementById('helpdesk-ticket-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
};

window.closeHelpdeskTicketModal = window.closeHelpdeskTicketModal || function() {
  var m = document.getElementById('helpdesk-ticket-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
};

// ============================================================================
// 2. VERIFIED CREDENTIALS & CONSTANTS
// ============================================================================
const VETCARE_CONFIG = {
  MASTER_PIN: "9297",
  PAYEE_NAME: "Vetcare Services (Mr. Rahul)",
  BANKS: {
    SBI: {
      name: "State Bank of India (Israna Branch)",
      upiId: "rahuljangra9297@oksbi",
      accountNumber: "65204067585",
      ifsc: "SBIN0013693"
    },
    PNB: {
      name: "Punjab National Bank (Israna Branch)",
      upiId: "rahuljangra9297-1@okicici",
      accountNumber: "6687001700015098",
      ifsc: "PUNB0668700"
    }
  },
  PLANS: {
    MONTHLY: { name: "मासिक प्लान", amount: 199, label: "₹199 / माह" },
    ANNUAL: { name: "वार्षिक प्लान (बचत)", amount: 1499, label: "₹1,499 / वर्ष" }
  }
};

// Application State Store
let appState = {
  role: 'farmer',
  activeBank: 'SBI',
  selectedPlan: 'MONTHLY',
  activeDiagnosisMode: 'SYMPTOMS',
  matrixSelected: {
    temp: null,
    cardinal: 'ALL',
    secondary: []
  }
};

// ============================================================================
// 3. CLINICAL KNOWLEDGE ENGINE & PREGNANCY PHARMA SAFETY DB
// ============================================================================
const DEFAULT_DISEASE_DB = [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    cardinal: "NECK_SWELLING",
    temp: "HIGH",
    contraindicatedInPregnancy: ["Dexamethasone"],
    safeSteroidSub: "Isoflupredone Acetate",
    desc: "पाश्चुरेला मल्टोसीडा जीवाणु जनित अति-घातक रोग। गले व निचले जबड़े में गर्म दर्दनाक सूजन, जीभ बाहर लटकना व घुर-घुर सांस।",
    farmerRemedy: "देसी प्राथमिक उपचार: 100 ग्राम सरसों के तेल में 10 ग्राम कपूर और 20 ग्राम हल्दी पकाकर गले की सूजन पर गुनगुना लेप करें। तुरंत चिकित्सक से संपर्क करें।",
    doctorRx: "1. Inj. Ceftiofur Sodium (1 gm/50kg) I/M अथवा Inj. Enrofloxacin (5 mg/kg) I/M\n2. Inj. Flunixin Meglumine (2.2 mg/kg) I/V\n3. Inj. Isoflupredone (गाभिन सुरक्षित) 10ml I/M\n4. Inj. Chlorpheniramine Maleate (Avil) 10ml I/M\n5. Dextrose Saline 5% I/V यदि निर्जलीकरण हो।"
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    cardinal: "GAS_SWELLING",
    temp: "HIGH",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "क्लॉस्ट्रिडियम शोवेई जनित रोग। पुट्ठे या कंधे की भारी मांसपेशियों में गैस भरी सूजन जिसे दबाने पर चर्र-चर्र की आवाज़ आती है।",
    farmerRemedy: "देसी प्राथमिक उपचार: सूजन वाले अंग को गर्म पानी और नीम के काढ़े से सेकें। पशु को चलने न दें। तुरंत पेनिसिलिन इंजेक्शन लगवाएं।",
    doctorRx: "1. Inj. Penicillin 40 लाख IU I/M (प्रथम 24 घंटे में दो बार)\n2. Inj. Melonex Plus (Meloxicam + Paracetamol) 20ml I/M\n3. Inj. Tribivet (B-Complex) 10ml I/M\n4. सूजन स्थल पर चीरा लगाकर 3% H2O2 से सफाई।"
  },
  {
    id: "MASTITIS",
    nameHindi: "थनैल रोग (Mastitis)",
    category: "BACTERIAL",
    cardinal: "UDDER_HARD",
    temp: "NORMAL",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "अयन व थन में सूजन, कड़ापन, दूध में पीलापन, खून या दही जैसे छिछड़े आना। छूने पर थन गर्म व अत्यधिक दर्दनाक होना।",
    farmerRemedy: "देसी प्राथमिक उपचार: 250 ग्राम एलोवेरा गूदा + 50 ग्राम हल्दी + 15 ग्राम चूना बारीक पीसकर लेप बनाएं। थन खाली करके दिन में 3 बार लगाएं।",
    doctorRx: "1. Inj. Intacef Tazo (3375 mg) I/V\n2. Intramammary Infusion (उदा. Pendistrin-SH / Cefoperazone) थन खाली कर चढ़ाएं\n3. Inj. Melonex Plus 15ml I/M\n4. Inj. Serratiopeptidase\n5. Trisodium Citrate पाउडर 30-50 ग्राम दैनिक 4 दिन।"
  },
  {
    id: "FMD",
    nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
    category: "VIRAL",
    cardinal: "MOUTH_BLISTERS",
    temp: "HIGH",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "अति-संक्रामक विषाणु रोग। मुंह, जीभ व खुरों के बीच छाले, अत्यधिक तारदार लार गिरना, लंगड़ाना व चारा न खा पाना।",
    farmerRemedy: "देसी उपचार: मुंह को 1% फिटकरी या लाल दवा (KMNO4) के घोल से धोएं। छालों पर शहद में सुहागा भूनकर लगाएं। खुरों को नीम के पानी से साफ रखें।",
    doctorRx: "1. द्वितीयक संक्रमण रोकथाम: Inj. Ceftriaxone (Intacef 3g) I/M 3 दिन\n2. Inj. Melonex Plus 15ml I/M\n3. Inj. Avil 10ml I/M\n4. Vitamin A/E टॉनिक 10ml I/M\n5. खुरों पर D-Mag या Topicure स्प्रे।"
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    cardinal: "STERNAL_RECUMBENCY",
    temp: "SUB",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "ब्याने के 24-72 घंटे के भीतर रक्त में कैल्शियम की भारी कमी। शरीर व कान ठंडे, गर्दन पेट की तरफ मोड़कर बैठना।",
    farmerRemedy: "सावधानी: पशु को मुंह से जबरन कभी नाल न दें, दवा फेफड़ों में जा सकती है। पशु को गर्म बोरी से ढंकें और तुरंत कैल्शियम ड्रिप लगवाएं।",
    doctorRx: "1. Calcium Borogluconate 25% (CBG / Mifex) 450ml (300ml धीमी गति से I/V + 150ml S/C)\n2. I/V देते समय हृदय गति की लगातार जांच करें\n3. Inj. Tonophosphan 10ml I/M\n4. Inj. Tribivet 10ml I/M\n5. होश में आने पर Cal-Up जेल ओरल दें।"
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis)",
    category: "METABOLIC",
    cardinal: "SWEET_BREATH",
    temp: "NORMAL",
    contraindicatedInPregnancy: ["Dexamethasone"],
    safeSteroidSub: "Isoflupredone Acetate",
    desc: "ऊर्जा की कमी से उत्पन्न उपापचयी रोग। सांस व दूध से मीठी गंध, पशु केवल सूखा भूसा खाता है और दाना छोड़ देता है।",
    farmerRemedy: "देसी उपचार: 250 ग्राम पुराना गुड़ + 50 मिली सरसों का तेल 4-5 दिन लगातार दें। दाने में चोकर की मात्रा बढ़ाएं।",
    doctorRx: "1. Dextrose 20% or 25% 1000ml I/V फास्ट\n2. Inj. Isoflupredone 10ml I/M\n3. Propylene Glycol 200ml ओरल दिन में दो बार\n4. Inj. Tribivet 10ml I/M\n5. Niacinamide बोलस 2 गोली दैनिक।"
  },
  {
    id: "BLOAT",
    nameHindi: "अफारा / पेट फूलना (Tympany / Bloat)",
    category: "METABOLIC",
    cardinal: "LEFT_FLANK_DRUM",
    temp: "NORMAL",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "रूमेन में अत्यधिक गैस या झाग जमा होना। बायां पेट ढोल की तरह फूलना, सांस लेने में तकलीफ और बेचैनी।",
    farmerRemedy: "देसी उपचार: 50 मिली तारपीन का तेल + 300 मिली मीठा तेल (सरसों) + 15 ग्राम हींग घोलकर पिलाएं। मुंह में लकड़ी की खपच्ची बांधें।",
    doctorRx: "1. Trocar & Cannula द्वारा बाएं फ्लैंक से आपातकालीन गैस निकासी\n2. Bloatosil / Tympol liquid 100ml ओरल नाल से\n3. Inj. Spasmo-vet 10ml I/M\n4. Inj. Belamyl 10ml I/M\n5. Rumen FS पाउडर / Bioboost बोलस।"
  },
  {
    id: "THEILERIOSIS",
    nameHindi: "थायलेरियासिस (Theileriosis)",
    category: "PROTOZOAL",
    cardinal: "LYMPH_SWELLING",
    temp: "HIGH",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "चिचड़ी जनित रक्त परजीवी रोग। कंधे या कान की लिम्फ ग्रंथि में कठोर सूजन, 105-106°F बुखार, गंभीर रक्ताल्पता (एनीमिया)।",
    farmerRemedy: "देसी उपचार: चिचड़ियों को हाथ से न नोचें। नीम का काढ़ा बनाकर पशु के शरीर पर छिड़कें। तुरंत पशु चिकित्सक से विशिष्ट दवा लगवाएं।",
    doctorRx: "1. Inj. Buparvaquone (Butalex / Zubion) 2.5mg/kg Deep I/M सिंगल डोज़\n2. Inj. Oxytetracycline LA 20mg/kg I/M\n3. Inj. Melonex Plus 15ml I/M\n4. Inj. Feritas (आयरन) 10ml I/M\n5. Flumethrin / Amitraz pour-on दवा।"
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    category: "PROTOZOAL",
    cardinal: "RED_URINE",
    temp: "HIGH",
    contraindicatedInPregnancy: [],
    safeSteroidSub: "",
    desc: "रक्त परजीवी द्वारा लाल रक्त कोशिकाओं का टूटना। पेशाब गहरा लाल या कॉफी जैसा होना, तेज बुखार और कमजोरी।",
    farmerRemedy: "देसी देखभाल: पशु को छायादार व ठंडी जगह बांधें। ठंडा पानी व गुड़ का शरबत पिलाएं। तुरंत डॉक्टर को बुलाएं।",
    doctorRx: "1. Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep I/M\n2. Inj. Melonex Plus 15ml I/M\n3. Dextrose Normal Saline 1-2 लीटर I/V\n4. Inj. Feritas 10ml I/M\n5. Inj. Tribivet 10ml I/M।"
  }
];

// Combine with window.CORE_DISEASE_DB if provided externally
function getActiveDiseaseDB() {
  if (Array.isArray(window.CORE_DISEASE_DB) && window.CORE_DISEASE_DB.length > 0) {
    return window.CORE_DISEASE_DB;
  }
  return DEFAULT_DISEASE_DB;
}

// ============================================================================
// 4. STORAGE HELPERS
// ============================================================================
const StorageHelper = {
  get: function(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: function(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }
};

// ============================================================================
// 5. ROLE CONTROLLER & LIFECYCLE
// ============================================================================
window.applyRoleState = function(role) {
  appState.role = (role || 'farmer').toLowerCase();
  
  const isDoc = (appState.role === 'doctor');
  const roleBadge = document.getElementById('currentUserRoleBadge');
  if (roleBadge) {
    roleBadge.textContent = isDoc ? '🩺 अधिकृत पशु चिकित्सक' : '👨‍🌾 स्मार्ट पशुपालक';
  }

  // Doctor-only and Farmer-only elements visibility
  const docTabIds = ['navRx', 'navInventory', 'navRecords'];
  docTabIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (isDoc) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });

  const financeLabel = document.getElementById('navFinanceLabel');
  if (financeLabel) {
    financeLabel.textContent = isDoc ? 'क्लिनिक खाता' : 'दूध खाता बही';
  }

  // Auto-switch to landing tab
  window.switchTab(isDoc ? 'rx' : 'diagnosis');

  // Trigger re-renders
  renderKhataList();
  renderInventoryList();
  renderSavedRecords();
  renderMatrixDiagnosis();
};

window.switchTab = function(tabId) {
  const tabs = ['diagnosis', 'rx', 'breeding', 'feed', 'finance', 'inventory', 'records', 'helpdesk'];
  tabs.forEach(t => {
    const view = document.getElementById('view' + t.charAt(0).toUpperCase() + t.slice(1));
    const btn = document.getElementById('nav' + t.charAt(0).toUpperCase() + t.slice(1));
    if (view) view.classList.add('hidden');
    if (btn) {
      btn.classList.remove('active-nav-tab');
      btn.classList.add('text-slate-400');
    }
  });

  const activeView = document.getElementById('view' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  const activeBtn = document.getElementById('nav' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  if (activeView) activeView.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('active-nav-tab');
    activeBtn.classList.remove('text-slate-400');
  }
};

// ============================================================================
// 6. 3-WAY CLINICAL DIAGNOSIS & WEIGHTED SCORING ENGINE
// ============================================================================
window.setDiagnosisMode = function(mode) {
  appState.activeDiagnosisMode = mode;
  const pMatrix = document.getElementById('panelDiagMatrix');
  const pHybrid = document.getElementById('panelDiagHybrid');
  const pDir = document.getElementById('panelDiagDirectory');

  const b1 = document.getElementById('btnDiagMode1');
  const b2 = document.getElementById('btnDiagMode2');
  const b3 = document.getElementById('btnDiagMode3');

  [b1, b2, b3].forEach(b => {
    if (b) {
      b.className = 'py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center';
    }
  });

  if (pMatrix) pMatrix.classList.add('hidden');
  if (pHybrid) pHybrid.classList.add('hidden');
  if (pDir) pDir.classList.add('hidden');

  if (mode === 'SYMPTOMS') {
    if (pMatrix) pMatrix.classList.remove('hidden');
    if (b1) b1.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs';
    renderMatrixDiagnosis();
  } else if (mode === 'HYBRID') {
    if (pHybrid) pHybrid.classList.remove('hidden');
    if (b2) b2.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs';
    window.handleAppSearch();
  } else {
    if (pDir) pDir.classList.remove('hidden');
    if (b3) b3.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs';
    window.filterByTag('ALL');
  }
};

window.toggleMatrixParam = function(type, value, btnElem) {
  if (type === 'temp') {
    if (appState.matrixSelected.temp === value) {
      appState.matrixSelected.temp = null;
      btnElem.classList.remove('chip-active');
    } else {
      appState.matrixSelected.temp = value;
      const chips = document.querySelectorAll('.m-chip');
      chips.forEach(c => c.classList.remove('chip-active'));
      btnElem.classList.add('chip-active');
    }
  }
  renderMatrixDiagnosis();
};

window.applyMatrixFilters = function() {
  const sel = document.getElementById('selCardinalSign');
  if (sel) {
    appState.matrixSelected.cardinal = sel.value;
  }
  renderMatrixDiagnosis();
};

window.toggleSecSymptom = function(code, btnElem) {
  const idx = appState.matrixSelected.secondary.indexOf(code);
  if (idx > -1) {
    appState.matrixSelected.secondary.splice(idx, 1);
    btnElem.classList.remove('chip-active');
  } else {
    appState.matrixSelected.secondary.push(code);
    btnElem.classList.add('chip-active');
  }
  renderMatrixDiagnosis();
};

window.resetSymptomMatrix = function() {
  appState.matrixSelected = { temp: null, cardinal: 'ALL', secondary: [] };
  const sel = document.getElementById('selCardinalSign');
  if (sel) sel.value = 'ALL';
  document.querySelectorAll('.m-chip, .s-chip').forEach(c => c.classList.remove('chip-active'));
  renderMatrixDiagnosis();
};

function calculateDiseaseScore(disease) {
  let score = 0;
  let maxPossible = 0;

  // Temperature (Weight: 20%)
  if (appState.matrixSelected.temp) {
    maxPossible += 20;
    if (disease.temp === appState.matrixSelected.temp) {
      score += 20;
    }
  }

  // Cardinal Sign (Weight: 40%)
  if (appState.matrixSelected.cardinal && appState.matrixSelected.cardinal !== 'ALL') {
    maxPossible += 40;
    if (disease.cardinal === appState.matrixSelected.cardinal) {
      score += 40;
    }
  }

  // Secondary Signs (Weight: 40%)
  if (appState.matrixSelected.secondary.length > 0) {
    maxPossible += 40;
    const secCount = appState.matrixSelected.secondary.length;
    let secMatches = 0;
    const diseaseText = (disease.desc + ' ' + (disease.keywords ? disease.keywords.join(' ') : '')).toLowerCase();
    
    appState.matrixSelected.secondary.forEach(s => {
      if (s === 'OFF_FEED' && (diseaseText.includes('चारा') || diseaseText.includes('भूसा') || diseaseText.includes('feed'))) secMatches++;
      if (s === 'DULLNESS' && (diseaseText.includes('सुस्त') || diseaseText.includes('कमजोरी') || diseaseText.includes('बैठ'))) secMatches++;
      if (s === 'DIARRHEA' && (diseaseText.includes('दस्त') || diseaseText.includes('गोबर'))) secMatches++;
      if (s === 'CONSTIPATION' && (diseaseText.includes('कब्ज') || diseaseText.includes('सूखा'))) secMatches++;
      if (s === 'SALIVATION' && (diseaseText.includes('लार') || diseaseText.includes('मुंह'))) secMatches++;
      if (s === 'MILK_DROP' && (diseaseText.includes('दूध') || diseaseText.includes('अयन'))) secMatches++;
      if (s === 'LIMPING' && (diseaseText.includes('लंगड़ा') || diseaseText.includes('खुर'))) secMatches++;
    });

    score += Math.min(40, Math.round((secMatches / secCount) * 40));
  }

  if (maxPossible === 0) return 100; // No filter applied
  return Math.round((score / maxPossible) * 100);
}

function renderMatrixDiagnosis() {
  const container = document.getElementById('diseaseSearchResults');
  if (!container) return;

  const db = getActiveDiseaseDB();
  const scored = db.map(d => {
    return { ...d, probability: calculateDiseaseScore(d) };
  });

  // Filter out zero probability if filters are active
  const hasFilter = appState.matrixSelected.temp || 
                    (appState.matrixSelected.cardinal && appState.matrixSelected.cardinal !== 'ALL') || 
                    appState.matrixSelected.secondary.length > 0;

  const results = hasFilter ? scored.filter(s => s.probability > 25).sort((a,b) => b.probability - a.probability) : scored;

  const countBadge = document.getElementById('matchCountBadge');
  if (countBadge) countBadge.textContent = results.length + " रोग सक्रिय";

  renderDiseaseCards(results, container);
}

window.handleAppSearch = function() {
  const query = (document.getElementById('unifiedSearchInput')?.value || '').trim().toLowerCase();
  const container = document.getElementById('diseaseSearchResults');
  if (!container) return;

  const db = getActiveDiseaseDB();
  if (!query) {
    renderDiseaseCards(db, container);
    return;
  }

  const filtered = db.filter(d => {
    const inName = d.nameHindi.toLowerCase().includes(query);
    const inDesc = d.desc.toLowerCase().includes(query);
    const inKw = d.keywords && d.keywords.some(k => k.toLowerCase().includes(query));
    return inName || inDesc || inKw;
  });

  renderDiseaseCards(filtered, container);
};

window.filterByTag = function(tag, btnElem) {
  if (btnElem) {
    document.querySelectorAll('.q-chip').forEach(c => {
      c.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0';
    });
    btnElem.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0';
  }

  const container = document.getElementById('diseaseSearchResults');
  if (!container) return;

  const db = getActiveDiseaseDB();
  if (tag === 'ALL') {
    renderDiseaseCards(db, container);
    return;
  }

  const filtered = db.filter(d => d.category === tag);
  renderDiseaseCards(filtered, container);
};

function renderDiseaseCards(diseases, container) {
  if (!container) return;

  if (diseases.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-2">
        <span class="text-3xl">🔍</span>
        <p class="font-bold text-slate-800 text-sm">कोई मिलान रोग नहीं मिला</p>
        <p class="text-xs text-slate-500">कृपया लक्षणों का चयन बदलें या सामान्य नाम खोजें।</p>
      </div>`;
    return;
  }

  const isDoc = (appState.role === 'doctor');

  container.innerHTML = diseases.map(d => {
    const probBadge = (d.probability !== undefined && d.probability < 100) ? `
      <span class="text-xs font-black px-2.5 py-1 rounded-xl ${d.probability >= 70 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
        संभावना: ${d.probability}%
      </span>` : '';

    return `
      <div class="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-4 sm:p-5 shadow-xs transition space-y-3">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">${d.nameHindi}</h3>
            <span class="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md mt-1 inline-block">
              ${d.category}
            </span>
          </div>
          ${probBadge}
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">${d.desc}</p>

        <!-- Farmer Remedial View -->
        <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
          <strong class="text-emerald-900 flex items-center gap-1 font-bold">🌿 सिद्ध देसी उपचार व देखभाल:</strong>
          <p class="text-[11px] leading-relaxed text-emerald-900">${d.farmerRemedy}</p>
        </div>

        <!-- Doctor Clinical View -->
        ${isDoc ? `
          <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-1.5 font-mono text-slate-800">
            <strong class="text-blue-900 font-sans flex items-center justify-between font-bold">
              <span>🩺 एलोपैथिक इंजेक्शन व चिकित्सा प्रोटोकॉल:</span>
              <button onclick="autoFillRxFromDisease('${d.id}')" class="text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold px-2 py-1 rounded-lg shadow-xs transition">
                + ओपीडी पर्ची में भरें
              </button>
            </strong>
            <p class="text-[11px] leading-relaxed whitespace-pre-line text-blue-950 font-sans">${d.doctorRx}</p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// ============================================================================
// 7. DIGITAL OPD PRESCRIPTION & PREGNANCY PHARMA SAFETY ENGINE
// ============================================================================
window.autoFillRxFromDisease = function(diseaseId) {
  const db = getActiveDiseaseDB();
  const disease = db.find(d => d.id === diseaseId);
  if (!disease) return;

  const diagInput = document.getElementById('opdDiagnosis');
  const rxInput = document.getElementById('opdMedicine');
  const pregInput = document.getElementById('opdPregnancy');

  if (diagInput) diagInput.value = disease.nameHindi;
  if (rxInput) {
    let rxText = disease.doctorRx;
    // Check pregnancy safety
    const isPregnant = pregInput && pregInput.value.includes('गाभिन');
    if (isPregnant && disease.contraindicatedInPregnancy && disease.contraindicatedInPregnancy.length > 0) {
      disease.contraindicatedInPregnancy.forEach(drug => {
        if (rxText.includes(drug)) {
          rxText = rxText.replace(new RegExp(drug, 'g'), `${disease.safeSteroidSub} [⚠️ ${drug} गाभिन में निषेध!]`);
        }
      });
      alert(`⚠️ गर्भावस्था चेतावनी: ${disease.nameHindi} में ${disease.contraindicatedInPregnancy.join(', ')} का प्रयोग न करें। इसे सुरक्षित विकल्प (${disease.safeSteroidSub}) से प्रतिस्थापित किया गया है।`);
    }
    rxInput.value = rxText;
  }

  window.switchTab('rx');
};

window.calculateDue = function() {
  const total = parseFloat(document.getElementById('opdTotalFee')?.value) || 0;
  const paid = parseFloat(document.getElementById('opdPaidFee')?.value) || 0;
  const due = Math.max(0, total - paid);
  const dueInput = document.getElementById('opdDueFee');
  if (dueInput) dueInput.value = due;
};

window.dispatchWhatsAppRx = function() {
  const farmerName = document.getElementById('opdFarmerName')?.value.trim();
  const phone = document.getElementById('opdFarmerPhone')?.value.trim();
  const village = document.getElementById('opdVillage')?.value.trim();
  const animal = document.getElementById('opdAnimal')?.value;
  const tag = document.getElementById('opdTag')?.value.trim();
  const pregnancy = document.getElementById('opdPregnancy')?.value;
  const diagnosis = document.getElementById('opdDiagnosis')?.value.trim();
  const medicine = document.getElementById('opdMedicine')?.value.trim();
  const total = document.getElementById('opdTotalFee')?.value || '0';
  const paid = document.getElementById('opdPaidFee')?.value || '0';
  const due = document.getElementById('opdDueFee')?.value || '0';

  if (!farmerName || !phone || !diagnosis) {
    alert('कृपया कम से कम किसान का नाम, 10-अंकों का मोबाइल नंबर एवं प्रोविजनल निदान अवश्य भरें!');
    return;
  }

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    alert('कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें!');
    return;
  }

  // Check Pregnancy alert
  if (pregnancy.includes('गाभिन') && (medicine.toLowerCase().includes('dexamethasone') || medicine.toLowerCase().includes('dexa'))) {
    const confirmSend = confirm('⚠️ गंभीर चेतावनी: पर्ची में Dexamethasone लिखा हुआ प्रतीत हो रहा है जो गाभिन पशु में गर्भपात करा सकता है! क्या आप फिर भी पर्ची भेजना चाहते हैं?');
    if (!confirmSend) return;
  }

  const message = 
`*🩺 वेटरनरी डिजिटल क्लिनिकल पर्ची (OPD Slip)*
---------------------------------
*किसान का नाम:* ${farmerName}
*गाँव:* ${village || 'N/A'} | *मोबाइल:* ${cleanPhone}
*पशु प्रकार:* ${animal} (टैग सं: ${tag || 'N/A'})
*गर्भ स्थिति:* ${pregnancy}
*निदान (Diagnosis):* ${diagnosis}
---------------------------------
*दवा व उपचार प्रोटोकॉल (Rx):*
${medicine || 'दवा निर्देश अनुसार सेवन कराएं।'}
---------------------------------
*कुल परामर्श फीस:* ₹${total}
*प्राप्त राशि:* ₹${paid}
*बकाया राशि:* ₹${due}
---------------------------------
_सत्यापित पशु चिकित्सा सेवा • Vetcare Clinical OS_`;

  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');

  // Also auto-save case
  saveOfflineCaseDirectly(false);
};

window.saveOfflineCaseDirectly = function(showAlert = true) {
  const farmerName = document.getElementById('opdFarmerName')?.value.trim();
  const phone = document.getElementById('opdFarmerPhone')?.value.trim();
  const diagnosis = document.getElementById('opdDiagnosis')?.value.trim();

  if (!farmerName || !diagnosis) {
    if (showAlert) alert('कृपया किसान का नाम और निदान दर्ज करें!');
    return;
  }

  const newRecord = {
    id: 'RX-' + Date.now(),
    date: new Date().toLocaleDateString('hi-IN'),
    farmerName: farmerName,
    phone: phone,
    village: document.getElementById('opdVillage')?.value.trim() || '',
    animal: document.getElementById('opdAnimal')?.value || '',
    tag: document.getElementById('opdTag')?.value.trim() || '',
    pregnancy: document.getElementById('opdPregnancy')?.value || '',
    diagnosis: diagnosis,
    medicine: document.getElementById('opdMedicine')?.value.trim() || '',
    total: parseFloat(document.getElementById('opdTotalFee')?.value) || 0,
    paid: parseFloat(document.getElementById('opdPaidFee')?.value) || 0,
    due: parseFloat(document.getElementById('opdDueFee')?.value) || 0
  };

  const records = StorageHelper.get('vetcare_opd_records', []);
  records.unshift(newRecord);
  StorageHelper.set('vetcare_opd_records', records);

  // If due > 0, auto-record in Khata
  if (newRecord.due > 0) {
    const khata = StorageHelper.get('vetcare_khata_records', []);
    khata.unshift({
      id: 'KHATA-' + Date.now(),
      farmerName: newRecord.farmerName,
      phone: newRecord.phone,
      amount: newRecord.due,
      type: 'DUE',
      note: `ओपीडी बकाया: ${newRecord.diagnosis}`,
      date: newRecord.date
    });
    StorageHelper.set('vetcare_khata_records', khata);
    renderKhataList();
  }

  renderSavedRecords();
  if (showAlert) alert('केस रिकॉर्ड सफलतापूर्वक सुरक्षित कर लिया गया है!');
};

window.printCurrentOPDSlip = function() {
  const printArea = document.getElementById('printableSlipArea');
  if (!printArea) return;

  const farmerName = document.getElementById('opdFarmerName')?.value || 'N/A';
  const phone = document.getElementById('opdFarmerPhone')?.value || 'N/A';
  const village = document.getElementById('opdVillage')?.value || 'N/A';
  const animal = document.getElementById('opdAnimal')?.value || 'N/A';
  const tag = document.getElementById('opdTag')?.value || 'N/A';
  const pregnancy = document.getElementById('opdPregnancy')?.value || 'N/A';
  const diagnosis = document.getElementById('opdDiagnosis')?.value || 'N/A';
  const medicine = document.getElementById('opdMedicine')?.value || 'N/A';
  const total = document.getElementById('opdTotalFee')?.value || '0';
  const paid = document.getElementById('opdPaidFee')?.value || '0';
  const due = document.getElementById('opdDueFee')?.value || '0';

  printArea.innerHTML = `
    <div style="border:2px solid #334155; padding:20px; font-family:sans-serif;">
      <div style="text-align:center; border-bottom:2px solid #334155; padding-bottom:10px;">
        <h1 style="margin:0; font-size:22px; font-weight:bold;">VETCARE CLINICAL ASSISTANT</h1>
        <p style="margin:2px; font-size:12px;">पशु चिकित्सालय एवं डिजिटल ओपीडी पर्ची</p>
      </div>
      <div style="margin-top:15px; font-size:12px; line-height:1.6;">
        <p><strong>दिनांक:</strong> ${new Date().toLocaleDateString('hi-IN')}</p>
        <p><strong>किसान का नाम:</strong> ${farmerName} | <strong>मोबाइल:</strong> ${phone}</p>
        <p><strong>गाँव:</strong> ${village} | <strong>पशु:</strong> ${animal} (टैग: ${tag})</p>
        <p><strong>गर्भ स्थिति:</strong> ${pregnancy}</p>
        <p><strong>पहचाना गया रोग (Diagnosis):</strong> <u>${diagnosis}</u></p>
        <hr style="border:0.5px dashed #64748b; margin:10px 0;">
        <p><strong>उपचार व औषधियां (Rx Injections & Medicines):</strong></p>
        <pre style="font-family:sans-serif; white-space:pre-wrap; background:#f8fafc; padding:8px;">${medicine}</pre>
        <hr style="border:0.5px dashed #64748b; margin:10px 0;">
        <p><strong>कुल फीस:</strong> ₹${total} | <strong>जमा:</strong> ₹${paid} | <strong>बकाया:</strong> ₹${due}</p>
      </div>
      <div style="text-align:right; margin-top:30px; font-size:11px;">
        <p>अधिकृत पशु चिकित्सक हस्ताक्षर</p>
      </div>
    </div>
  `;

  window.print();
};

function renderSavedRecords() {
  const container = document.getElementById('recordsList');
  const badge = document.getElementById('recordTotalBadge');
  if (!container) return;

  const records = StorageHelper.get('vetcare_opd_records', []);
  if (badge) badge.textContent = `${records.length} केस सुरक्षित`;

  if (records.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">कोई केस रिकॉर्ड उपलब्ध नहीं है।</p>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
      <div>
        <p class="font-bold text-slate-900">${r.farmerName} (${r.animal}) - <span class="text-blue-700">${r.diagnosis}</span></p>
        <p class="text-[10px] text-slate-500">दिनांक: ${r.date} | मो: ${r.phone} | गाँव: ${r.village || 'N/A'}</p>
        <p class="text-[10px] text-slate-600 font-mono">फीस: ₹${r.total} (बकाया: ₹${r.due})</p>
      </div>
      <button onclick="deleteCaseRecord('${r.id}')" class="text-rose-500 hover:text-rose-700 font-bold text-[11px] px-2 py-1">
        हटाएं ✕
      </button>
    </div>
  `).join('');
}

window.deleteCaseRecord = function(id) {
  if (!confirm('क्या आप इस केस रिकॉर्ड को हटाना चाहते हैं?')) return;
  let records = StorageHelper.get('vetcare_opd_records', []);
  records = records.filter(r => r.id !== id);
  StorageHelper.set('vetcare_opd_records', records);
  renderSavedRecords();
};

window.handleRecordSearch = function() {
  const q = (document.getElementById('searchRecordsInput')?.value || '').toLowerCase().trim();
  const container = document.getElementById('recordsList');
  if (!container) return;

  const records = StorageHelper.get('vetcare_opd_records', []);
  const filtered = records.filter(r => 
    r.farmerName.toLowerCase().includes(q) ||
    r.phone.includes(q) ||
    r.diagnosis.toLowerCase().includes(q) ||
    (r.village && r.village.toLowerCase().includes(q))
  );

  container.innerHTML = filtered.map(r => `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
      <div>
        <p class="font-bold text-slate-900">${r.farmerName} (${r.animal}) - <span class="text-blue-700">${r.diagnosis}</span></p>
        <p class="text-[10px] text-slate-500">दिनांक: ${r.date} | मो: ${r.phone}</p>
      </div>
      <button onclick="deleteCaseRecord('${r.id}')" class="text-rose-500 font-bold text-[11px]">हटाएं</button>
    </div>
  `).join('');
};

// ============================================================================
// 8. KHATA LEDGER (पशुपालक / क्लिनिक खाता बही)
// ============================================================================
window.saveNewKhataRecord = function() {
  const name = document.getElementById('khataFarmerName')?.value.trim();
  const phone = document.getElementById('khataFarmerPhone')?.value.trim();
  const amount = parseFloat(document.getElementById('khataAmount')?.value) || 0;
  const type = document.getElementById('khataType')?.value || 'DUE';
  const note = document.getElementById('khataNote')?.value.trim() || 'सामान्य लेन-देन';

  if (!name || amount <= 0) {
    alert('कृपया किसान का नाम और मान्य राशि दर्ज करें!');
    return;
  }

  const khata = StorageHelper.get('vetcare_khata_records', []);
  khata.unshift({
    id: 'K-' + Date.now(),
    farmerName: name,
    phone: phone || 'N/A',
    amount: amount,
    type: type,
    note: note,
    date: new Date().toLocaleDateString('hi-IN')
  });

  StorageHelper.set('vetcare_khata_records', khata);
  window.closeNewKhataModal();
  renderKhataList();
};

function renderKhataList() {
  const container = document.getElementById('finDueList');
  const creditEl = document.getElementById('finCredit');
  const debitEl = document.getElementById('finDebit');
  if (!container) return;

  const khata = StorageHelper.get('vetcare_khata_records', []);
  const q = (document.getElementById('searchKhataInput')?.value || '').toLowerCase().trim();

  let totalCredit = 0;
  let totalDebit = 0;

  const filtered = khata.filter(item => {
    if (item.type === 'PAID') totalCredit += item.amount;
    else totalDebit += item.amount;

    if (!q) return true;
    return item.farmerName.toLowerCase().includes(q) || item.phone.includes(q);
  });

  if (creditEl) creditEl.textContent = `₹${totalCredit}`;
  if (debitEl) debitEl.textContent = `₹${totalDebit}`;

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">खाता बही में कोई प्रविष्टि नहीं है।</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
      <div>
        <p class="font-bold text-slate-900">${item.farmerName} <span class="text-[10px] text-slate-500">(${item.phone})</span></p>
        <p class="text-[11px] text-slate-600">${item.note}</p>
        <p class="text-[9px] text-slate-400">${item.date}</p>
      </div>
      <div class="text-right">
        <span class="font-bold text-sm ${item.type === 'PAID' ? 'text-emerald-700' : 'text-rose-600'}">
          ${item.type === 'PAID' ? '+₹' : '-₹'}${item.amount}
        </span>
        <div class="mt-1">
          <button onclick="deleteKhataItem('${item.id}')" class="text-[10px] text-slate-400 hover:text-rose-600">हटाएं ✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.deleteKhataItem = function(id) {
  let khata = StorageHelper.get('vetcare_khata_records', []);
  khata = khata.filter(k => k.id !== id);
  StorageHelper.set('vetcare_khata_records', khata);
  renderKhataList();
};

// ============================================================================
// 9. STOCK INVENTORY MODULE (+/- COUNTERS & LOW ALERT)
// ============================================================================
const DEFAULT_INVENTORY = [
  { id: "INV-1", name: "Inj. Intacef Tazo (3375mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
  { id: "INV-2", name: "Inj. Melonex Plus 100ml", category: "INJECTION", stock: 4, minAlert: 2, unit: "vials" },
  { id: "INV-3", name: "Murrah Bull Semen Straw (No. 4059)", category: "SEMEN", stock: 15, minAlert: 5, unit: "straws" },
  { id: "INV-4", name: "Inj. Avil (Chlorpheniramine) 33ml", category: "INJECTION", stock: 2, minAlert: 3, unit: "vials" },
  { id: "INV-5", name: "Bolus Bioboost (Rumen Probiotic)", category: "BOLUS", stock: 20, minAlert: 6, unit: "tabs" }
];

window.saveNewInventoryItem = function() {
  const name = document.getElementById('invItemName')?.value.trim();
  const cat = document.getElementById('invItemCategory')?.value || 'INJECTION';
  const stock = parseInt(document.getElementById('invItemStock')?.value) || 0;
  const minAlert = parseInt(document.getElementById('invItemMinAlert')?.value) || 3;
  const unit = document.getElementById('invItemUnit')?.value.trim() || 'vials';

  if (!name || stock < 0) {
    alert('कृपया दवा का नाम और स्टॉक मात्रा दर्ज करें!');
    return;
  }

  const items = StorageHelper.get('vetcare_inventory_items', DEFAULT_INVENTORY);
  items.unshift({
    id: 'INV-' + Date.now(),
    name: name,
    category: cat,
    stock: stock,
    minAlert: minAlert,
    unit: unit
  });

  StorageHelper.set('vetcare_inventory_items', items);
  window.closeNewInventoryModal();
  renderInventoryList();
};

window.adjustStock = function(id, delta) {
  let items = StorageHelper.get('vetcare_inventory_items', DEFAULT_INVENTORY);
  const item = items.find(i => i.id === id);
  if (item) {
    item.stock = Math.max(0, item.stock + delta);
    StorageHelper.set('vetcare_inventory_items', items);
    renderInventoryList();
  }
};

let currentInvFilter = 'ALL';
window.filterInventoryCategory = function(cat, btnElem) {
  currentInvFilter = cat;
  if (btnElem) {
    document.querySelectorAll('.inv-chip').forEach(c => {
      c.className = 'inv-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0';
    });
    btnElem.className = 'inv-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0';
  }
  renderInventoryList();
};

function renderInventoryList() {
  const container = document.getElementById('inventoryItemsContainer');
  if (!container) return;

  const items = StorageHelper.get('vetcare_inventory_items', DEFAULT_INVENTORY);
  const filtered = (currentInvFilter === 'ALL') ? items : items.filter(i => i.category === currentInvFilter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">इस श्रेणी में कोई दवा या सीमन स्ट्रॉ उपलब्ध नहीं है।</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isLow = item.stock <= item.minAlert;
    return `
      <div class="p-3 bg-slate-50 border ${isLow ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'} rounded-2xl flex items-center justify-between text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-900">${item.name}</span>
            ${isLow ? '<span class="text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">कम स्टॉक</span>' : ''}
          </div>
          <p class="text-[10px] text-slate-500">श्रेणी: ${item.category} | न्यूनतम अलर्ट सीमा: ${item.minAlert} ${item.unit}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="adjustStock('${item.id}', -1)" class="w-7 h-7 rounded-xl bg-slate-200 hover:bg-slate-300 font-black text-slate-800 flex items-center justify-center transition active:scale-95">-</button>
          <span class="font-bold text-sm w-8 text-center ${isLow ? 'text-rose-600 font-black' : 'text-slate-800'}">${item.stock}</span>
          <button onclick="adjustStock('${item.id}', 1)" class="w-7 h-7 rounded-xl bg-blue-100 hover:bg-blue-200 font-black text-blue-800 flex items-center justify-center transition active:scale-95">+</button>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// 10. PRIVATE IN-APP SUPPORT SYSTEM (ZERO PUBLIC EXPOSURE)
// ============================================================================
window.submitHelpdeskTicket = function() {
  const name = document.getElementById('ticketName')?.value.trim();
  const phone = document.getElementById('ticketPhone')?.value.trim();
  const category = document.getElementById('ticketCategory')?.value || 'GENERAL';
  const desc = document.getElementById('ticketDesc')?.value.trim();

  if (!name || !phone || !desc) {
    alert('कृपया अपना नाम, 10 अंकों का फोन नंबर एवं समस्या का विवरण दर्ज करें!');
    return;
  }

  const tickets = StorageHelper.get('vetcare_support_tickets', []);
  const newTicket = {
    id: 'TCK-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toLocaleString('hi-IN'),
    name: name,
    phone: phone,
    category: category,
    desc: desc,
    status: 'OPEN'
  };

  tickets.unshift(newTicket);
  StorageHelper.set('vetcare_support_tickets', tickets);

  // Clear inputs
  if (document.getElementById('ticketName')) document.getElementById('ticketName').value = '';
  if (document.getElementById('ticketPhone')) document.getElementById('ticketPhone').value = '';
  if (document.getElementById('ticketDesc')) document.getElementById('ticketDesc').value = '';

  window.closeHelpdeskTicketModal();
  alert(`धन्यवाद ${name}! आपकी टिकट (#${newTicket.id}) सुरक्षित रूप से दर्ज कर ली गई है। हमारी आंतरिक तकनीकी टीम शीघ्र ऐप में संज्ञान लेगी।`);
};

// ============================================================================
// 11. DUAL-BANK PAYMENT ENGINE & QR GENERATOR (SBI & PNB)
// ============================================================================
window.selectPaymentPlan = function(plan) {
  appState.selectedPlan = plan;
  window.updatePaymentUI();
};

window.switchBankTab = function(bank) {
  appState.activeBank = bank;
  window.updatePaymentUI();
};

window.updatePaymentUI = function() {
  const bankInfo = VETCARE_CONFIG.BANKS[appState.activeBank];
  const planInfo = VETCARE_CONFIG.PLANS[appState.selectedPlan];

  // Tab & Buttons UI update
  const tabSBI = document.getElementById('btnTabSBI');
  const tabPNB = document.getElementById('btnTabPNB');
  if (tabSBI && tabPNB) {
    if (appState.activeBank === 'SBI') {
      tabSBI.className = 'flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition';
      tabPNB.className = 'flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition';
    } else {
      tabPNB.className = 'flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition';
      tabSBI.className = 'flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition';
    }
  }

  const btnM = document.getElementById('btnPlanMonthly');
  const btnA = document.getElementById('btnPlanAnnual');
  if (btnM && btnA) {
    if (appState.selectedPlan === 'MONTHLY') {
      btnM.className = 'py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition';
      btnA.className = 'py-2 rounded-xl text-slate-700 font-medium text-center transition';
    } else {
      btnA.className = 'py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition';
      btnM.className = 'py-2 rounded-xl text-slate-700 font-medium text-center transition';
    }
  }

  // Text values
  const payeeEl = document.getElementById('dispPayeeName');
  const upiEl = document.getElementById('dispUPIId');
  const accEl = document.getElementById('dispAccountNumber');
  const ifscEl = document.getElementById('dispIFSC');
  const amountEl = document.getElementById('directUPIAmount');
  const upiLinkBtn = document.getElementById('btnDirectUPILink');
  const qrImage = document.getElementById('dynamicQRImage');

  if (payeeEl) payeeEl.textContent = VETCARE_CONFIG.PAYEE_NAME;
  if (upiEl) upiEl.textContent = bankInfo.upiId;
  if (accEl) accEl.textContent = bankInfo.accountNumber;
  if (ifscEl) ifscEl.textContent = bankInfo.ifsc;
  if (amountEl) amountEl.textContent = planInfo.amount;

  const upiUrl = `upi://pay?pa=${bankInfo.upiId}&pn=${encodeURIComponent(VETCARE_CONFIG.PAYEE_NAME)}&am=${planInfo.amount}&cu=INR&tn=${encodeURIComponent('Vetcare ' + planInfo.name)}`;
  if (upiLinkBtn) upiLinkBtn.href = upiUrl;

  if (qrImage) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;
  }
};

window.sendPaymentProofWhatsApp = function() {
  const planInfo = VETCARE_CONFIG.PLANS[appState.selectedPlan];
  const bankInfo = VETCARE_CONFIG.BANKS[appState.activeBank];
  const ref = prompt("कृपया अपने बैंक भुगतान की UTR / UPI Reference संख्या दर्ज करें:");
  if (!ref) return;

  const tickets = StorageHelper.get('vetcare_support_tickets', []);
  tickets.unshift({
    id: 'PAY-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toLocaleString('hi-IN'),
    name: 'प्रीमियम भुगतान सत्यापन',
    phone: 'In-App',
    category: 'PAYMENT',
    desc: `प्लान: ${planInfo.name} (₹${planInfo.amount}) | बैंक: ${bankInfo.name} | UTR / Ref: ${ref}`,
    status: 'OPEN'
  });
  StorageHelper.set('vetcare_support_tickets', tickets);
  alert('भुगतान संदर्भ संख्या सफलतापूर्वक पंजीकृत कर ली गई है! सत्यापन उपरांत आपका खाता सक्रिय कर दिया जाएगा।');
  window.closePaymentModal();
};

// ============================================================================
// 12. MASTER SUPER ADMIN PANEL & SECURITY VERIFICATION
// ============================================================================
window.verifyAdminPIN = function() {
  const inputPin = document.getElementById('inputAdminPIN')?.value.trim();
  const err = document.getElementById('pinErrorMessage');

  if (inputPin === VETCARE_CONFIG.MASTER_PIN) {
    window.closeAdminPinModal();
    openAdminDashboard();
  } else {
    if (err) err.classList.remove('hidden');
  }
};

function openAdminDashboard() {
  // Render or create the admin dashboard modal dynamically if not present in DOM
  let modal = document.getElementById('admin-dashboard-fullscreen');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-dashboard-fullscreen';
    modal.className = 'fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto text-slate-800';
    document.body.appendChild(modal);
  }

  const tickets = StorageHelper.get('vetcare_support_tickets', []);
  const khata = StorageHelper.get('vetcare_khata_records', []);
  const opd = StorageHelper.get('vetcare_opd_records', []);

  modal.innerHTML = `
    <div class="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-5 sm:p-6 space-y-5 my-auto text-xs sm:text-sm">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5">
            <span>🛡️</span> Vetcare मास्टर एडमिन कंट्रोल रूम (Admin Panel)
          </h2>
          <p class="text-[11px] text-slate-500">सुरक्षित आंतरिक प्रणाली प्रबंधन • Master PIN: ${VETCARE_CONFIG.MASTER_PIN}</p>
        </div>
        <button onclick="document.getElementById('admin-dashboard-fullscreen').classList.add('hidden')" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 font-bold text-slate-600 flex items-center justify-center">✕</button>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
          <span class="text-[10px] text-blue-700 block font-bold">ओपीडी केस</span>
          <strong class="text-base sm:text-lg font-black text-blue-900">${opd.length}</strong>
        </div>
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
          <span class="text-[10px] text-amber-700 block font-bold">खुली टिकटें</span>
          <strong class="text-base sm:text-lg font-black text-amber-900">${tickets.filter(t => t.status === 'OPEN').length}</strong>
        </div>
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <span class="text-[10px] text-emerald-700 block font-bold">खाता लेन-देन</span>
          <strong class="text-base sm:text-lg font-black text-emerald-900">${khata.length}</strong>
        </div>
      </div>

      <!-- Private Support Tickets Admin Resolver -->
      <div class="space-y-2 border-t border-slate-100 pt-3">
        <h3 class="font-bold text-slate-900 flex items-center justify-between">
          <span>🎫 इन-ऐप सपोर्ट टिकट प्रबंधन (Private Resolution)</span>
          <span class="text-[11px] text-slate-500">${tickets.length} कुल प्राप्त</span>
        </h3>
        <div class="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          ${tickets.length === 0 ? '<p class="text-slate-400 text-xs py-3 text-center">कोई लंबित सपोर्ट टिकट नहीं है।</p>' : ''}
          ${tickets.map(t => `
            <div class="p-3 border ${t.status === 'OPEN' ? 'border-amber-300 bg-amber-50/60' : 'border-slate-200 bg-slate-50'} rounded-2xl space-y-1">
              <div class="flex justify-between items-start">
                <div>
                  <span class="font-bold text-slate-900 text-xs">${t.name}</span>
                  <span class="text-[10px] text-slate-500 font-mono">(${t.phone}) - ${t.timestamp}</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${t.status === 'OPEN' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'}">
                  ${t.status === 'OPEN' ? 'समीक्षाधीन' : 'निस्तारित ✅'}
                </span>
              </div>
              <p class="text-[11px] text-slate-700"><strong>[${t.category}]</strong> ${t.desc}</p>
              <div class="flex justify-end gap-2 pt-1">
                ${t.status === 'OPEN' ? `
                  <button onclick="resolveAdminTicket('${t.id}')" class="text-[10px] bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg">
                    हल किया (Mark Resolved)
                  </button>
                ` : ''}
                <button onclick="deleteAdminTicket('${t.id}')" class="text-[10px] text-rose-600 hover:un
