/**
 * Vetcare Clinical Assistant & Smart Dairy Engine
 * Production-Ready Application Logic (app.js)
 * 
 * Complete Modules:
 * 1. Stock & Inventory Management Engine (Low-Stock Alerts, Field Counter, Firebase Sync)
 * 2. Universal Role Selection & Gateway Transitions (Doctor vs Farmer)
 * 3. Smart Navigation & Back Stack Engine (HTML5 Popstate & Modal Interceptor)
 * 4. 3-Way Clinical Diagnosis Decision Engine (Weighted 5-Factor Scoring, Rx Auto-Fill, Pregnancy Alert)
 * 5. Digital OPD Prescription Generator & 1-Click WhatsApp Dispatch
 * 6. Financial Dashboard & Khata Ledger (Live Totals, 1-Click WhatsApp Tagada)
 * 7. Premium Payment Gateway Engine (Dual-Bank SBI/PNB, Dynamic QR, Direct UPI Deep Link)
 * 8. Live Gemini AI Clinical Consultation Engine
 * 9. Feed Calculator & Heat Tracking Breeding Modules
 */

// ==========================================
// 1. CONFIGURATION & STATE
// ==========================================
const APP_CONFIG = {
  sbiUPI: 'vetcare.sbi@upi',
  pnbUPI: 'vetcare.pnb@upi',
  payeeName: 'Vetcare Services',
  monthlyAmount: 199,
  yearlyAmount: 1499,
  supportPhone: '919876543210',
  storageKeys: {
    role: 'vetcare_role',
    geminiKey: 'vetcare_gemini_key',
    khata: 'vetcare_khata_records',
    opdCases: 'vetcare_opd_cases',
    stock: 'vetcare_inventory_stock',
    paymentStatus: 'vetcare_pro_status'
  }
};

function normalizeRole(r) {
  if (!r) return 'farmer';
  const str = String(r).toLowerCase().trim();
  return (str === 'doctor' || str === 'practitioner') ? 'doctor' : 'farmer';
}

let appState = {
  role: normalizeRole(localStorage.getItem(APP_CONFIG.storageKeys.role)),
  currentTab: 'diagnosis',
  diagMode: 'SYMPTOMS',
  activeBank: 'SBI',
  activePlan: 'MONTHLY',
  khataFilter: 'ALL',
  stockFilter: 'ALL',
  matrix: {
    temp: null,
    eyes: null,
    urine: null,
    dung: null,
    cardinalSign: 'ALL'
  }
};

let activeTabHistory = [];
let khataRecords = [];
let opdCases = [];
let stockInventory = [];

let firestoreDb = null;
try {
  if (typeof firebase !== 'undefined' && firebase.firestore) {
    firestoreDb = firebase.firestore();
    console.log('Firebase Cloud Firestore successfully linked.');
  }
} catch (e) {
  console.warn('Firebase running in local storage mode.', e);
}

// ==========================================
// 2. SAFE DOM & UTILITY ACCESSORS
// ==========================================
function $(id) {
  return document.getElementById(id) || null;
}

function safeSetText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function safeSetValue(id, val) {
  const el = $(id);
  if (el) el.value = val;
}

function safeGetValue(id, defaultVal = '') {
  const el = $(id);
  return el ? el.value.trim() : defaultVal;
}

function showElement(id, displayClass = 'block') {
  const el = $(id);
  if (!el) return;
  el.classList.remove('hidden');
  el.style.removeProperty('display');
  if (displayClass === 'flex') el.classList.add('flex');
  else if (displayClass === 'grid') el.classList.add('grid');
  else if (displayClass === 'inline-flex') el.classList.add('inline-flex');
}

function hideElement(id) {
  const el = $(id);
  if (!el) return;
  el.classList.add('hidden');
  el.classList.remove('flex', 'grid', 'inline-flex');
}

function formatCurrency(num) {
  const n = parseFloat(num) || 0;
  return n.toLocaleString('hi-IN');
}

function getTodayISODate() {
  return new Date().toISOString().split('T')[0];
}

function getActiveModal() {
  const modals = [
    'modalAddStock',
    'modalAddKhataBill',
    'modalPremium',
    'modalDoctorDeclaration',
    'modalAIKey'
  ];
  for (const mId of modals) {
    const el = $(mId);
    if (el && (el.style.display === 'flex' || el.style.display === 'block' || (!el.classList.contains('hidden') && el.style.display !== 'none' && el.style.display !== ''))) {
      return el;
    }
  }
  return null;
}

function closeAllModals() {
  let closed = false;
  const modals = [
    'modalAddStock',
    'modalAddKhataBill',
    'modalPremium',
    'modalDoctorDeclaration',
    'modalAIKey'
  ];
  modals.forEach(mId => {
    const el = $(mId);
    if (el && el.style.display !== 'none' && el.style.display !== '') {
      el.style.display = 'none';
      closed = true;
    }
  });
  return closed;
}

function fixMobileViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const mainApp = $('screenMainApp');
  if (mainApp) {
    mainApp.style.minHeight = `${window.innerHeight}px`;
  }

  const mainContainer = document.querySelector('main');
  if (mainContainer) {
    mainContainer.classList.add('flex-1');
    mainContainer.style.minHeight = `calc(100vh - 8rem)`;
  }
}

window.addEventListener('resize', fixMobileViewport);
window.addEventListener('orientationchange', () => {
  setTimeout(fixMobileViewport, 150);
});

// ==========================================
// 3. STOCK & INVENTORY ENGINE (NEW)
// ==========================================
function loadStockInventory() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.storageKeys.stock);
    stockInventory = raw ? JSON.parse(raw) : [];
  } catch (e) {
    stockInventory = [];
  }

  // Pre-populate realistic default inventory if completely empty
  if (!stockInventory || stockInventory.length === 0) {
    stockInventory = [
      {
        id: 'STK-01',
        name: 'Berenil (Diminazene Aceturate RTU)',
        category: 'INJECTION',
        batch: 'BRN-441',
        expiry: '2026-06-30',
        qty: 3,
        unit: 'वायल (Vials)',
        threshold: 2
      },
      {
        id: 'STK-02',
        name: 'Melonex Plus 100ml (Meloxicam + Paracetamol)',
        category: 'INJECTION',
        batch: 'MLX-771',
        expiry: '2025-11-30',
        qty: 5,
        unit: 'वायल (Vials)',
        threshold: 2
      },
      {
        id: 'STK-03',
        name: 'HF Bull Semen Straw (ID: HF-504 High Yield)',
        category: 'SEMEN',
        batch: 'SAG-HF504',
        expiry: '2030-12-31',
        qty: 8,
        unit: 'स्ट्रॉ (Straws)',
        threshold: 3
      },
      {
        id: 'STK-04',
        name: 'Murrah Buffalo Semen Straw (ID: MB-102 Elite Sire)',
        category: 'SEMEN',
        batch: 'SAG-MB102',
        expiry: '2030-12-31',
        qty: 1,
        unit: 'स्ट्रॉ (Straws)',
        threshold: 3
      },
      {
        id: 'STK-05',
        name: 'Intacef Tazo 4.5g (Ceftriaxone + Tazobactam)',
        category: 'INJECTION',
        batch: 'ITZ-842',
        expiry: '2026-08-31',
        qty: 2,
        unit: 'वायल (Vials)',
        threshold: 2
      }
    ];
    persistStockInventory();
  }
}

function persistStockInventory() {
  try {
    localStorage.setItem(APP_CONFIG.storageKeys.stock, JSON.stringify(stockInventory));
  } catch (e) {
    console.error('LocalStorage write error (stock):', e);
  }

  // Cloud Firestore Sync
  if (firestoreDb) {
    try {
      const batch = firestoreDb.batch();
      stockInventory.slice(0, 30).forEach(item => {
        const ref = firestoreDb.collection('vetcare_inventory').doc(item.id);
        batch.set(ref, item, { merge: true });
      });
      batch.commit().catch(err => console.warn('Firestore stock sync error:', err));
    } catch (err) {}
  }
}

window.renderStockInventory = function() {
  const container = $('stockInventoryList');
  if (!container) return;

  const searchQuery = safeGetValue('stockSearchInput').toLowerCase();

  let totalItems = stockInventory.length;
  let lowAlertCount = 0;
  let semenCount = 0;

  stockInventory.forEach(item => {
    const q = parseFloat(item.qty) || 0;
    const th = parseFloat(item.threshold) || 0;
    if (q <= th) lowAlertCount++;
    if (item.category === 'SEMEN') semenCount += q;
  });

  safeSetText('stockTotalItems', totalItems);
  safeSetText('stockLowAlertItems', lowAlertCount);
  safeSetText('stockSemenTotal', semenCount);

  let filtered = stockInventory.filter(item => {
    const nameMatch = (item.name || '').toLowerCase().includes(searchQuery);
    const batchMatch = (item.batch || '').toLowerCase().includes(searchQuery);
    if (!nameMatch && !batchMatch) return false;

    if (appState.stockFilter === 'LOW') {
      return (parseFloat(item.qty) || 0) <= (parseFloat(item.threshold) || 0);
    }
    if (appState.stockFilter !== 'ALL') {
      return item.category === appState.stockFilter;
    }
    return true;
  });

  safeSetText('stockCountBadge', `${filtered.length} आइटम्स`);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl space-y-2">
        <span class="text-3xl block">📦</span>
        <h4 class="text-sm font-bold text-slate-700">कोई स्टॉक आइटम नहीं मिला</h4>
        <p class="text-xs text-slate-500">ऊपर दिए गए "➕ नया स्टॉक जोड़ें" बटन से नया स्टॉक दर्ज करें।</p>
      </div>
    `;
    return;
  }

  const categoryLabels = {
    'INJECTION': '💉 इंजेक्शन',
    'ORAL': '🍼 ओरल/टॉनिक',
    'SEMEN': '❄️ सीमन स्ट्रॉ',
    'VACCINE': '🛡️ वैक्सीन',
    'OTHER': '🩹 सर्जिकल/अन्य'
  };

  container.innerHTML = filtered.map(item => {
    const isLow = (parseFloat(item.qty) || 0) <= (parseFloat(item.threshold) || 0);

    return `
      <div class="bg-white border ${isLow ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-2xl p-4 shadow-xs space-y-3 transition">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-900">${item.name}</h4>
            <div class="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
              <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">${categoryLabels[item.category] || item.category}</span>
              <span>बैच: <strong class="font-mono text-slate-700">${item.batch || 'N/A'}</strong></span>
              <span>एक्सपायरी: <strong class="font-mono text-slate-700">${item.expiry || 'N/A'}</strong></span>
            </div>
          </div>
          <button onclick="window.deleteStockItem('${item.id}')" title="हटाएं" class="text-slate-300 hover:text-rose-600 text-xs p-1">🗑️</button>
        </div>

        <div class="flex items-center justify-between gap-2">
          <div class="space-y-0.5">
            <span class="text-[10px] text-slate-400 block font-semibold">उपलब्ध स्टॉक मात्रा:</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-lg sm:text-xl font-black ${isLow ? 'text-rose-600' : 'text-slate-900'}">${item.qty}</span>
              <span class="text-xs text-slate-500 font-semibold">${item.unit}</span>
            </div>
          </div>

          ${isLow ? `
            <div class="px-2.5 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-[10px] font-black flex items-center gap-1 shadow-2xs">
              <span>⚠️</span> स्टॉक समाप्त होने वाला है! (न्यूनतम: ${item.threshold})
            </div>
          ` : `
            <div class="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
              ✅ पर्याप्त स्टॉक
            </div>
          `}

          <!-- Quick Counter Adjustment Buttons -->
          <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onclick="window.decreaseStock('${item.id}')" 
              title="1 घटाएं"
              class="w-7 h-7 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-black text-sm flex items-center justify-center shadow-xs border border-slate-200 active:scale-95 transition"
            >
              −
            </button>
            <button 
              onclick="window.increaseStock('${item.id}')" 
              title="1 बढ़ाएं"
              class="w-7 h-7 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-black text-sm flex items-center justify-center shadow-xs border border-slate-200 active:scale-95 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.increaseStock = function(id) {
  const item = stockInventory.find(i => i.id === id);
  if (!item) return;
  item.qty = (parseFloat(item.qty) || 0) + 1;
  persistStockInventory();
  window.renderStockInventory();
};

window.decreaseStock = function(id) {
  const item = stockInventory.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, (parseFloat(item.qty) || 0) - 1);
  persistStockInventory();
  window.renderStockInventory();
};

window.adjustStockQty = function(id, delta) {
  if (delta > 0) window.increaseStock(id);
  else window.decreaseStock(id);
};

window.deleteStockItem = function(id) {
  if (!confirm('क्या आप सचमुच यह स्टॉक आइटम हटाना चाहते हैं?')) return;
  stockInventory = stockInventory.filter(i => i.id !== id);
  persistStockInventory();
  window.renderStockInventory();
};

window.setStockFilter = function(category, btnEl) {
  appState.stockFilter = category;
  document.querySelectorAll('.stock-chip').forEach(c => c.classList.remove('stock-chip-active'));
  if (btnEl) btnEl.classList.add('stock-chip-active');
  window.renderStockInventory();
};

window.filterStockRecords = function() {
  window.renderStockInventory();
};

window.openAddStockModal = function() {
  const modal = $('modalAddStock');
  if (modal) {
    modal.style.display = 'flex';
    safeSetValue('newStockName', '');
    safeSetValue('newStockBatch', '');
    safeSetValue('newStockExpiry', '');
    safeSetValue('newStockQty', '');
    safeSetValue('newStockThreshold', '3');
  }
};

window.closeAddStockModal = function() {
  const modal = $('modalAddStock');
  if (modal) modal.style.display = 'none';
};

window.saveStockItem = function() {
  const name = safeGetValue('newStockName');
  const category = safeGetValue('newStockCategory', 'INJECTION');
  const unit = safeGetValue('newStockUnit', 'वायल (Vials)');
  const batch = safeGetValue('newStockBatch', 'N/A');
  const expiry = safeGetValue('newStockExpiry', 'N/A');
  const qty = parseFloat(safeGetValue('newStockQty', 0)) || 0;
  const threshold = parseFloat(safeGetValue('newStockThreshold', 3)) || 3;

  if (!name) {
    alert('कृपया दवा या सीमन स्ट्रॉ का नाम दर्ज करें!');
    return;
  }

  const newItem = {
    id: 'STK-' + Date.now(),
    name,
    category,
    unit,
    batch,
    expiry,
    qty,
    threshold
  };

  stockInventory.unshift(newItem);
  persistStockInventory();
  window.closeAddStockModal();
  window.renderStockInventory();
};

// ==========================================
// 4. UNIVERSAL ROLE SELECTION & GATEWAY
// ==========================================
window.selectRole = function(rawRole) {
  try {
    const normalized = normalizeRole(rawRole);
    appState.role = normalized;
    localStorage.setItem(APP_CONFIG.storageKeys.role, normalized);

    const screenGateway = $('screenGateway');
    const screenMain = $('screenMainApp');

    if (screenGateway) {
      screenGateway.classList.add('hidden');
      screenGateway.classList.remove('flex');
      screenGateway.style.setProperty('display', 'none', 'important');
    }

    if (screenMain) {
      screenMain.classList.remove('hidden');
      screenMain.style.setProperty('display', 'flex', 'important');
    }

    showMainApp();

    if (normalized === 'doctor') {
      activeTabHistory = ['diagnosis'];
      window.switchTab('diagnosis', false);
    } else {
      const hasFarmerHome = $('viewFarmerHome');
      const startTab = hasFarmerHome ? 'farmerHome' : 'diagnosis';
      activeTabHistory = [startTab];
      window.switchTab(startTab, false);
    }

    renderKhataLedger();
    window.renderStockInventory();
    evaluateDiagnosis();
    fixMobileViewport();
  } catch (err) {
    console.error('Error executing selectRole:', err);
  }
};

window.returnToGateway = function() {
  closeAllModals();
  activeTabHistory = [];
  const screenMain = $('screenMainApp');
  const screenGateway = $('screenGateway');

  if (screenMain) {
    screenMain.classList.add('hidden');
    screenMain.style.setProperty('display', 'none', 'important');
  }

  if (screenGateway) {
    screenGateway.classList.remove('hidden');
    screenGateway.style.setProperty('display', 'flex', 'important');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openDoctorDeclarationModal = function() {
  const modal = $('modalDoctorDeclaration');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.setProperty('display', 'flex', 'important');
  } else {
    window.selectRole('doctor');
  }
};

window.closeDoctorDeclarationModal = function() {
  const modal = $('modalDoctorDeclaration');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.setProperty('display', 'none', 'important');
  }
};

window.acceptDoctorDeclaration = function() {
  window.closeDoctorDeclarationModal();
  window.selectRole('doctor');
};

function showMainApp() {
  const isDoctor = appState.role === 'doctor';
  const roleBadge = $('currentUserRoleBadge');

  if (roleBadge) {
    if (isDoctor) {
      roleBadge.textContent = '🩺 अधिकृत पशु चिकित्सक (Doctor Mode)';
      roleBadge.className = 'text-[10px] sm:text-[11px] font-bold text-blue-700';
    } else {
      roleBadge.textContent = '👨‍🌾 स्मार्ट पशुपालक (Farmer Mode)';
      roleBadge.className = 'text-[10px] sm:text-[11px] font-bold text-emerald-700';
    }
  }

  // Doctor Navigation
  const doctorNavIds = ['navDiagnosis', 'navRx', 'navInventory', 'navRecords', 'navAI'];
  doctorNavIds.forEach(id => {
    if (isDoctor) showElement(id, 'flex');
    else hideElement(id);
  });

  // Farmer Navigation
  const farmerNavIds = ['navFarmerHome', 'navRemedies'];
  farmerNavIds.forEach(id => {
    if (isDoctor) hideElement(id);
    else showElement(id, 'flex');
  });

  showElement('navBreeding', 'flex');
  showElement('navFeed', 'flex');
  showElement('navFinance', 'flex');

  const finLabel = $('navFinanceLabel');
  if (finLabel) {
    finLabel.textContent = isDoctor ? 'खाता बही' : 'दूध / बही';
  }

  fixMobileViewport();
}

// ==========================================
// 5. SMART NAVIGATION & BACK STACK ENGINE
// ==========================================
window.switchTab = function(tabKey, pushHistory = true) {
  const targetView = $('view' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
  if (!targetView) {
    tabKey = appState.role === 'doctor' ? 'diagnosis' : ($('viewFarmerHome') ? 'farmerHome' : 'diagnosis');
  }

  if (pushHistory) {
    if (activeTabHistory.length === 0 || activeTabHistory[activeTabHistory.length - 1] !== tabKey) {
      activeTabHistory.push(tabKey);
    }
    try {
      history.pushState({ tab: tabKey, role: appState.role }, '', `#${tabKey}`);
    } catch (e) {}
  }

  appState.currentTab = tabKey;

  const allTabs = [
    'farmerHome',
    'remedies',
    'diagnosis',
    'rx',
    'inventory',
    'records',
    'ai',
    'breeding',
    'feed',
    'finance'
  ];

  allTabs.forEach(t => {
    const vEl = $('view' + t.charAt(0).toUpperCase() + t.slice(1));
    const nEl = $('nav' + t.charAt(0).toUpperCase() + t.slice(1));

    if (vEl) vEl.classList.add('hidden');
    if (nEl) {
      nEl.classList.remove('active-nav-tab');
      nEl.classList.add('text-slate-400');
    }
  });

  const activeVEl = $('view' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
  const activeNEl = $('nav' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));

  if (activeVEl) activeVEl.classList.remove('hidden');
  if (activeNEl) {
    activeNEl.classList.add('active-nav-tab');
    activeNEl.classList.remove('text-slate-400');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabKey === 'inventory') {
    window.renderStockInventory();
  } else if (tabKey === 'finance') {
    renderKhataLedger();
  } else if (tabKey === 'diagnosis') {
    evaluateDiagnosis();
  }

  fixMobileViewport();
};

window.goBackScreen = window.navigateBack = function() {
  if (getActiveModal()) {
    closeAllModals();
    return;
  }

  if (activeTabHistory.length > 1) {
    activeTabHistory.pop();
    const previousTab = activeTabHistory[activeTabHistory.length - 1];
    window.switchTab(previousTab, false);
  } else {
    window.goToHome();
  }
};

window.goToHome = window.navigateToHome = function() {
  closeAllModals();
  const rootHome = appState.role === 'doctor' ? 'diagnosis' : ($('viewFarmerHome') ? 'farmerHome' : 'diagnosis');
  activeTabHistory = [rootHome];
  window.switchTab(rootHome, false);
};

window.addEventListener('popstate', (event) => {
  if (getActiveModal()) {
    closeAllModals();
    history.pushState({ tab: appState.currentTab }, '', `#${appState.currentTab}`);
    return;
  }

  if (event.state && event.state.tab) {
    if (activeTabHistory.length > 1) {
      activeTabHistory.pop();
    }
    window.switchTab(event.state.tab, false);
  } else {
    window.goBackScreen();
  }
});

// ==========================================
// 6. CLINICAL KNOWLEDGE ENGINE (UNLIMITED DB)
// ==========================================
const CLINICAL_DISEASES_DB = [
  {
    id: 'HS',
    name: 'Haemorrhagic Septicaemia (गलघोंटू)',
    category: 'BACTERIAL',
    cardinalSign: 'NECK_SWELLING',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'YELLOW',
    dung: 'NORMAL',
    symptomsText: 'गले और जबड़े के नीचे गर्म दर्दनाक सूजन, घरघराहट की आवाज, 105-107°F तेज बुखार, जीभ बाहर निकलना।',
    drugs: [
      'Inj. Sulphadimidine 33.3% @ 100-150 ml (I/V slow)',
      'Inj. Ceftiofur Sodium 1g @ 1mg/kg (I/M)',
      'Inj. Flunixin Meglumine @ 10-15 ml (I/M) तेज दर्द व बुखार हेतु'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन चेतावनी: सल्फोनामाइड एवं तीव्र डिहाइड्रेशन से गर्भाशय पर प्रतिकूल प्रभाव संभव। सावधानीपूर्वक उपयोग करें।'
  },
  {
    id: 'BQ',
    name: 'Black Quarter (लंगड़ा बुखार / चर्र-चर्रा)',
    category: 'BACTERIAL',
    cardinalSign: 'GAS_SWELLING',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'पुट्ठे, कंधे या जांघ में गैस भरी सूजन, दबाने पर चर्र-चर्र (crepitating) की आवाज, लंगड़ाना, 104-106°F बुखार।',
    drugs: [
      'Inj. Benzyl Penicillin / Procaine Penicillin 40 लाख IU (I/M QID)',
      'Inj. Oxytetracycline @ 10 mg/kg (I/V slow)',
      'Inj. Meloxicam with Paracetamol @ 15-20 ml (I/M)'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'गाभिन पशु को पेनिसिलिन दिया जा सकता है। स्टेरॉयड (Dexamethasone) से बचें।'
  },
  {
    id: 'FMD',
    name: 'Foot and Mouth Disease (खुरपका-मुंहपका)',
    category: 'VIRAL',
    cardinalSign: 'MOUTH_BLISTERS',
    temp: 'HIGH',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'मुंह, जीभ, मसूड़ों और खुरों के बीच छाले, मुंह से गाढ़ी चिपचिपी लार टपकना, लंगड़ाकर चलना, दूध उत्पादन शून्य।',
    drugs: [
      'पोटेशियम परमैंगनेट (लाल दवा 1:1000) से मुंह व खुरों की रोजाना धुलाई',
      'Inj. Ceftriaxone 3g @ (I/M) द्वितीयक संक्रमण रोकथाम',
      'Inj. B-Complex with Liver Extract (Belamyl) @ 10 ml (I/M)',
      'Inj. Meloxicam @ 15 ml (I/M)'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'सुरक्षित सहायक उपचार दें। अधिक तापमान से गर्भपात रोकने हेतु साए में रखें।'
  },
  {
    id: 'MASTITIS',
    name: 'Mastitis (थनैल / अयन की सूजन)',
    category: 'BACTERIAL',
    cardinalSign: 'UDDER_HARD',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'थन में सूजन, लाली, गर्माहट व कड़ापन, दूध में पीलापन, खून, छिछड़े या पानी जैसा पतला स्राव आना।',
    drugs: [
      'Intramammary Infusion (Cobactan LC / Tilmicosin)',
      'Inj. Enrofloxacin / Cefoperazone 3g (I/M / I/V)',
      'Inj. Serratiopeptidase + Meloxicam @ 15 ml (I/M सूजन घटाने)',
      'Powder Trisodium Citrate @ 30g ओरल 5 दिन'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ सावधानी: क्विनोलोन (Enrofloxacin) गाभिन पशुओं में केवल अंतिम विकल्प के रूप में दें।'
  },
  {
    id: 'MILK_FEVER',
    name: 'Milk Fever (हाइपोकैल्सीमिया)',
    category: 'METABOLIC',
    cardinalSign: 'STERNAL_RECUMBENCY',
    temp: 'SUB',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'ब्याने के 24-72 घंटे बाद गर्दन मोड़कर बैठना (S-Shape), शरीर व कान बिल्कुल ठंडे, शारीरिक ताप 97-100°F तक गिरना।',
    drugs: [
      'Inj. Calcium Borogluconate 25% (CBG / Mifex) @ 450 ml (आधा I/V अति धीमा, आधा S/C)',
      'Inj. Phosphorus (Tonophosphan) @ 10 ml (I/M)',
      'Inj. Vitamin D3 (Vitbless) @ 5 ml (I/M)'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'हार्ट गति मॉनिटर करते हुए कैल्शियम धीरे-धीरे चढ़ाएं। सुरक्षित प्रक्रिया।'
  },
  {
    id: 'KETOSIS',
    name: 'Ketosis (कीटोसिस / एसिटोनीमिया)',
    category: 'METABOLIC',
    cardinalSign: 'SWEET_BREATH',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'सांस व दूध से मीठी गंध, दाना खाने से इनकार व केवल सूखा भूसा खाना, तेजी से वजन गिरना, दूध में भारी कमी।',
    drugs: [
      'Inj. Dextrose 20% or 25% @ 500-1000 ml (I/V)',
      'Propylene Glycol @ 200 ml ओरल 4 दिन',
      'Inj. Isoflupredone Acetate @ 10 mg (I/M - यदि पशु गाभिन न हो)'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन रेड अलर्ट: Isoflupredone / Dexamethasone गाभिन पशु को कतई न दें! गर्भपात हो जाएगा।'
  },
  {
    id: 'BLOAT',
    name: 'Bloat / Tympany (गंभीर आफरा)',
    category: 'METABOLIC',
    cardinalSign: 'LEFT_FLANK_DRUM',
    temp: 'NORMAL',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'बायाँ पेट ढोलक की तरह फूलना, मुंह खोलकर सांस लेना, बेचैनी, बार-बार उठना-बैठना, जीभ बाहर निकालना।',
    drugs: [
      'Bloatosil / Tympol Liquid @ 100 ml मीठे तेल (250ml) में मिलाकर पिलाएं',
      'Stomach tube से गैस निकालना या Trocar & Cannula बायीं कोख में लगाना',
      'Inj. Neostigmine @ 2.5 mg (S/C - केवल नॉन-गाभिन पशु में)'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन चेतावनी: पेट के अत्यधिक दबाव से गर्भपात का खतरा। ट्रोकार लगाते समय झटका न दें।'
  },
  {
    id: 'THEILERIOSIS',
    name: 'Theileriosis (थायलेरियासिस / टिक फीवर)',
    category: 'PROTOZOAL',
    cardinalSign: 'LYMPH_SWELLING',
    temp: 'HIGH',
    eyes: 'PALE',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'कंधे व कान की लिम्फ नोड्स में भारी सूजन, 105-107°F बुखार, अत्यधिक एनीमिया, आंखों में पीलापन, सांस फूलना।',
    drugs: [
      'Inj. Buparvaquone (Zubion / Butalex) @ 2.5 mg/kg (I/M single dose)',
      'Inj. Oxytetracycline Long Acting @ 20 mg/kg (I/M deep)',
      'Iron Tonics (Sharkoferrol / Feritas) @ ओरल'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'बुपारवाक्योन गाभिन पशुओं में जीवनरक्षक है। चिकित्सक देखरेख में दें।'
  },
  {
    id: 'BABESIOSIS',
    name: 'Babesiosis (बबेशियोसिस / लाल पेशाब)',
    category: 'PROTOZOAL',
    cardinalSign: 'RED_URINE',
    temp: 'HIGH',
    eyes: 'JAUNDICED',
    urine: 'RED_COFFEE',
    dung: 'NORMAL',
    symptomsText: 'गहरे लाल या कॉफी रंग का पेशाब, 106°F तक बुखार, आंखें व मसूड़े पीले-सफेद, दिल की धड़कन तेज।',
    drugs: [
      'Inj. Diminazene Aceturate (Berenil) @ 3.5-5 mg/kg (Deep I/M)',
      'Inj. Feritas / Imferon @ 10 ml (I/M)',
      'I/V Dextrose Normal Saline (DNS 5%) @ 2 लीटर'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ चेतावनी: बेरेनिल की ओवरडोज से विषाक्तता संभव है। सही बॉडीवेट के अनुसार लगाएं।'
  },
  {
    id: 'ANAPLASMOSIS',
    name: 'Anaplasmosis (एनाप्लास्मोसिस)',
    category: 'PROTOZOAL',
    cardinalSign: 'SEVERE_JAUNDICE',
    temp: 'HIGH',
    eyes: 'JAUNDICED',
    urine: 'YELLOW',
    dung: 'CONSTIPATED',
    symptomsText: 'पेशाब लाल नहीं होता, परंतु अत्यधिक पीलिया, खून की भारी कमी, कब्ज, गोबर पर सूखा म्यूकस, तेज बुखार।',
    drugs: [
      'Inj. Oxytetracycline 200 mg/ml (LA) @ 20 mg/kg (I/M 72 घंटे पर दोहराएं)',
      'Inj. Belamyl @ 10 ml (I/M)',
      'Inj. Melonex Plus @ 15 ml (I/M)'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'ऑक्सीटेट्रासाइक्लिन से नवजात के दांत पीले हो सकते हैं परंतु मां की जान बचाना प्राथमिकता है।'
  },
  {
    id: 'PPR',
    name: 'Peste des Petits Ruminants (PPR - बकरी प्लेग)',
    category: 'VIRAL',
    cardinalSign: 'MOUTH_EROSION_DIARRHEA',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'DIARRHEA',
    symptomsText: 'बकरियों में तेज बुखार, मुंह में छाले, बदबूदार दस्त, आंखों व नाक से गाढ़ा मवाद जैसा स्राव, निमोनिया।',
    drugs: [
      'Inj. Enrofloxacin @ 5 mg/kg (I/M)',
      'Inj. Meloxicam @ 1 ml per 10 kg',
      'ORS घोल व इलेक्ट्रोलाइट बार-बार पिलाएं',
      'मुंह के छालों पर ग्लिसरीन व बोरिक एसिड का लेप'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'गाभिन बकरियों में तेज दस्त से समयपूर्व प्रसव हो सकता है। सपोर्टिव द्रव दें।'
  },
  {
    id: 'ENTEROTOXEMIA',
    name: 'Enterotoxemia (फिड़किया / ET)',
    category: 'BACTERIAL',
    cardinalSign: 'OPISTHOTONOS',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'DIARRHEA',
    symptomsText: 'भेड़-बकरियों में हरा दाना खाने के बाद सिर पीछे मोड़ना (Opisthotonos), चक्कर काटना, झागदार लार, अचानक मृत्यु।',
    drugs: [
      'Inj. Ampicillin / Amoxicillin @ 10 mg/kg (I/M)',
      'Inj. Dexamethasone (केवल गैर-गाभिन में) या Inj. Prednisolone',
      'Magnesium Sulphate (दस्त कराने हेतु पेट खाली करें)'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन पशुओं में स्टेरॉयड वर्जित है।'
  },
  {
    id: 'COLIC',
    name: 'Colic (तीव्र पेट दर्द)',
    category: 'METABOLIC',
    cardinalSign: 'ROLLING_PAWING',
    temp: 'NORMAL',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'पशु बार-बार पेट की ओर देखता है, पैरों से जमीन खुरचता है, लात मारता है, लोटता है व पसीना आता है।',
    drugs: [
      'Inj. Spasmodic / Analgin + Pitofenone (Baralgan / Spasvet) @ 20-30 ml (I/M)',
      'Inj. Flunixin Meglumine @ 1.1-2.2 mg/kg (I/V)',
      'Liquid Paraffin @ 500-1000 ml ओरल'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'बारालगन सुरक्षित है। तीव्र बेचैनी से प्रोलैप्स होने से रोकें।'
  },
  {
    id: 'ROP',
    name: 'Retention of Placenta (जेर रुकना)',
    category: 'METABOLIC',
    cardinalSign: 'HANGING_PLACENTA',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'ब्याने के 8-12 घंटे बाद भी जेर बाहर न गिरना, योनि मार्ग से बदबूदार स्राव लटकना।',
    drugs: [
      'Liquid Utrovet / Exapar @ 100 ml ओरल 3 दिन',
      'Inj. Oxytocin @ 30-50 IU (I/M - केवल प्रसव के 24 घंटे के भीतर)',
      'Intrauterine Bolus (Furea / Cleanex) 4 गोलियां गर्भाशय में रखें'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'जेर को हाथ से जबरदस्ती न खींचें, गर्भाशय में रक्तस्राव हो सकता है।'
  },
  {
    id: 'PROLAPSE',
    name: 'Prolapse of Uterus / Vagina (प्रोलैप्स / फूल दिखाना)',
    category: 'METABOLIC',
    cardinalSign: 'PROTRUDING_MASS',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'बैठने पर योनि अथवा ब्याने के बाद संपूर्ण गर्भाशय का मांसल भाग बाहर लटक जाना।',
    drugs: [
      'पोटेशियम परमैंगनेट के हल्के गुनगुने घोल से अंगों की धुलाई',
      'Epidural Anaesthesia: Inj. Lignocaine 2% @ 5-8 ml (Intercoccygeal)',
      'Inj. Progesterone 750 mg (यदि गाभिन में केवल योनि प्रोलैप्स हो)',
      'Rope Truss (रस्सा विधि) द्वारा बाहर आने से रोकना'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'एपिड्यूरल इंजेक्शन अनुभवी डॉक्टर द्वारा ही लगाया जाए।'
  },
  {
    id: 'PNEUMONIA',
    name: 'Pneumonia / Bronchitis (निमोनिया व श्वास कष्ट)',
    category: 'BACTERIAL',
    cardinalSign: 'DYSPNEA_WHEEZING',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'सांस लेने में भारी तकलीफ, छाती से सीटी जैसी आवाज (wheezing), सूखी-दर्दनाक खांसी, नाक से मवाद निकलना।',
    drugs: [
      'Inj. Ceftriaxone + Sulbactam 4.5g (I/V slow)',
      'Inj. Isoflupredone / Dexamethasone (गैर-गाभिन में) अथवा Meloxicam',
      'Inj. Deriphyllin (Theophylline) @ 10-15 ml (I/M श्वास नली खोलने)'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन अलर्ट: स्टेरॉयड इंजेक्शन से गर्भपात का जोखिम। केवल Meloxicam का उपयोग करें।'
  },
  {
    id: 'FOOT_ROT',
    name: 'Foot Rot (खुर सड़न व दुर्गंध)',
    category: 'BACTERIAL',
    cardinalSign: 'FOOT_ROT_SMELL',
    temp: 'NORMAL',
    eyes: 'NORMAL',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'खुरों की दरारों में गहरा मवाद, अत्यधिक दुर्गंध, खुर का गलना व पशु का तीन टांगों पर लंगड़ाना।',
    drugs: [
      'Copper Sulphate (नीला थोथा 5%) या पोटैशियम परमैंगनेट से फुट बाथ',
      'Inj. Oxytetracycline LA @ 20 mg/kg (I/M)',
      'खुर के अंदर Povidone Iodine ऑइंटमेंट की ड्रेसिंग'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'पूर्णतः सुरक्षित उपचार।'
  },
  {
    id: 'ANTHRAX',
    name: 'Anthrax (एंथ्रेक्स / गिल्टी रोग)',
    category: 'BACTERIAL',
    cardinalSign: 'TAR_BLOOD',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'BLOODY',
    symptomsText: 'अचानक तेज बुखार, प्राकृतिक छेदों (नाक, गुदा) से बिना जमा हुआ काला तारकोल जैसा खून रिसना, तत्काल मृत्यु।',
    drugs: [
      'Inj. Procaine Penicillin 60-80 लाख IU (I/M तत्काल)',
      'Inj. Streptomycin 5g (I/M)',
      'मृत पशु का पोस्टमार्टम पूर्णतः प्रतिबंधित है! चूने के साथ 6 फीट गहरा दफनाएं।'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ यह जूनोटिक रोग है। मनुष्यों में भी फैलता है। दस्ताने पहनें।'
  },
  {
    id: 'SURRA',
    name: 'Surra / Trypanosomiasis (सर्रा रोग)',
    category: 'PROTOZOAL',
    cardinalSign: 'CIRCLING_HEAD_PRESSING',
    temp: 'HIGH',
    eyes: 'PALE',
    urine: 'NORMAL',
    dung: 'NORMAL',
    symptomsText: 'पशु का गोल-गोल चक्कर काटना, दीवारों से सिर टकराना, रुक-रुक कर बुखार आना, आंखों से आंसू व अंधापन।',
    drugs: [
      'Inj. Quinapyramine Sulphate + Prosalt (Triquin) @ 0.025 ml/kg (S/C)',
      'Inj. Neurobion Forte @ 10 ml (I/M)',
      'Inj. Mannitol 20% (दिमागी सूजन कम करने)'
    ],
    pregnancySafe: false,
    pregnancyWarning: '⚠️ गाभिन पशुओं में Triquin के कारण झटके लग सकते हैं। धीरे-धीरे लगाएं।'
  },
  {
    id: 'RABIES',
    name: 'Rabies (रेबीज / जलसंत्रास)',
    category: 'VIRAL',
    cardinalSign: 'HYDROPHOBIA_BELL',
    temp: 'HIGH',
    eyes: 'CONGESTED',
    urine: 'NORMAL',
    dung: 'CONSTIPATED',
    symptomsText: 'पागल कुत्ते द्वारा काटने का इतिहास, अजीब तरह से बार-बार रंभाना, लगातार लार टपकना, आक्रामकता, लकवा।',
    drugs: [
      'लाक्षणिक होने पर कोई उपचार नहीं (100% घातक)',
      'काटने पर तत्काल घाव को 15 मिनट साबुन व पानी से धोएं',
      'Anti-Rabies Vaccine (ARV) 0, 3, 7, 14, 28 दिनों पर लगवाएं'
    ],
    pregnancySafe: true,
    pregnancyWarning: 'ARV टीका गाभिन पशुओं में 100% सुरक्षित है और लगाना अनिवार्य है।'
  }
];

window.setDiagnosisMode = function(mode) {
  appState.diagMode = mode;
  const p1 = $('panelDiagMatrix');
  const p2 = $('panelDiagHybrid');
  const p3 = $('panelDiagDirectory');
  const b1 = $('btnDiagMode1');
  const b2 = $('btnDiagMode2');
  const b3 = $('btnDiagMode3');

  [p1, p2, p3].forEach(p => p && p.classList.add('hidden'));
  [b1, b2, b3].forEach(b => {
    if (b) b.className = 'py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center';
  });

  if (mode === 'SYMPTOMS') {
    if (p1) p1.classList.remove('hidden');
    if (b1) b1.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
  } else if (mode === 'HYBRID') {
    if (p2) p2.classList.remove('hidden');
    if (b2) b2.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
  } else if (mode === 'DIRECTORY') {
    if (p3) p3.classList.remove('hidden');
    if (b3) b3.className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
  }

  evaluateDiagnosis();
};

window.toggleMatrixParam = function(type, val, btnEl) {
  if (appState.matrix[type] === val) {
    appState.matrix[type] = null;
    if (btnEl) btnEl.classList.remove('matrix-chip-active');
  } else {
    appState.matrix[type] = val;
    const parent = btnEl ? btnEl.parentElement : null;
    if (parent) {
      parent.querySelectorAll('.m-chip').forEach(c => c.classList.remove('matrix-chip-active'));
    }
    if (btnEl) btnEl.classList.add('matrix-chip-active');
  }
  evaluateDiagnosis();
};

window.resetSymptomMatrix = function() {
  appState.matrix = {
    temp: null,
    eyes: null,
    urine: null,
    dung: null,
    cardinalSign: 'ALL'
  };
  document.querySelectorAll('.m-chip').forEach(c => c.classList.remove('matrix-chip-active'));
  safeSetValue('selCardinalSign', 'ALL');
  evaluateDiagnosis();
};

window.applyMatrixFilters = function() {
  appState.matrix.cardinalSign = safeGetValue('selCardinalSign', 'ALL');
  evaluateDiagnosis();
};

window.handleAppSearch = function() {
  evaluateDiagnosis();
};

window.filterByTag = function(tag, btnEl) {
  document.querySelectorAll('.q-chip').forEach(c => {
    c.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0';
  });
  if (btnEl) {
    btnEl.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0';
  }
  evaluateDiagnosis(tag);
};

// 5-Factor Weighted Clinical Scoring Engine
// Temp: 20%, Eyes: 15%, Urine: 15%, Dung: 10%, Cardinal: 40% (Total: 100%)
function evaluateDiagnosis(directoryFilterTag = 'ALL') {
  const container = $('diseaseSearchResults');
  if (!container) return;

  const searchQuery = safeGetValue('unifiedSearchInput').toLowerCase();
  const cardinal = appState.matrix.cardinalSign;
  const temp = appState.matrix.temp;
  const eyes = appState.matrix.eyes;
  const urine = appState.matrix.urine;
  const dung = appState.matrix.dung;

  let results = CLINICAL_DISEASES_DB.map(disease => {
    let score = 0;
    let maxPossible = 0;

    if (cardinal && cardinal !== 'ALL') {
      maxPossible += 40;
      if (disease.cardinalSign === cardinal) score += 40;
    }

    if (temp) {
      maxPossible += 20;
      if (disease.temp === temp) score += 20;
    }

    if (eyes) {
      maxPossible += 15;
      if (disease.eyes === eyes) score += 15;
    }

    if (urine) {
      maxPossible += 15;
      if (disease.urine === urine) score += 15;
    }

    if (dung) {
      maxPossible += 10;
      if (disease.dung === dung) score += 10;
    }

    let matchPercentage = 0;
    if (maxPossible > 0) {
      matchPercentage = Math.round((score / maxPossible) * 100);
    } else {
      matchPercentage = 60;
    }

    return { ...disease, matchPercentage };
  });

  if (appState.diagMode === 'HYBRID' && searchQuery) {
    results = results.filter(d => 
      d.name.toLowerCase().includes(searchQuery) || 
      d.symptomsText.toLowerCase().includes(searchQuery) ||
      d.drugs.some(med => med.toLowerCase().includes(searchQuery))
    );
  } else if (appState.diagMode === 'DIRECTORY') {
    if (directoryFilterTag !== 'ALL') {
      results = results.filter(d => d.category === directoryFilterTag);
    }
  } else {
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  safeSetText('matchCountBadge', `${results.length} रोग उपलब्ध`);

  if (results.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-white border border-slate-200 rounded-3xl text-center text-xs text-slate-500">
        लक्षणों से मेल खाता कोई रोग नहीं मिला। कृपया लक्षण बदलें या सर्च शब्द सही करें।
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(dis => {
    const isHighMatch = dis.matchPercentage >= 70;
    const progressColor = isHighMatch ? 'bg-emerald-500' : 'bg-blue-600';

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900">${dis.name}</h3>
            <span class="text-[10px] font-semibold text-slate-400">वर्ग: ${dis.category}</span>
          </div>
          <div class="text-right">
            <span class="text-xs font-black ${isHighMatch ? 'text-emerald-600' : 'text-blue-600'}">${dis.matchPercentage}% संभावना</span>
          </div>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div class="${progressColor} h-2 rounded-full transition-all duration-500" style="width: ${dis.matchPercentage}%"></div>
        </div>

        <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-700 leading-relaxed">
          <strong class="text-slate-900 block mb-1">🔍 लक्षण विवरण:</strong>
          ${dis.symptomsText}
        </div>

        ${!dis.pregnancySafe ? `
          <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-2xl text-[11px] text-rose-900 font-semibold flex items-start gap-1.5">
            <span>🚨</span>
            <div>${dis.pregnancyWarning}</div>
          </div>
        ` : `
          <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-[10px] text-emerald-800 font-medium">
            ✅ गाभिन अनुकूल: मानक प्रोटोकॉल अनुसार दवाएं सुरक्षित हैं।
          </div>
        `}

        <div class="space-y-1.5 text-xs">
          <strong class="text-slate-900 block text-xs">💊 5-स्तरीय मानक एलोपैथिक उपचार (Rx):</strong>
          <ul class="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-800">
            ${dis.drugs.map(d => `<li class="flex items-start gap-1.5"><span>•</span><span>${d}</span></li>`).join('')}
          </ul>
        </div>

        <button 
          onclick="window.autoFillRxToOPD('${encodeURIComponent(dis.name)}', '${encodeURIComponent(dis.drugs.join('\n'))}')"
          class="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <span>⚡</span> डिजिटल ओपीडी में दवाएं लोड करें (Rx Auto-Fill)
        </button>
      </div>
    `;
  }).join('');
}

window.autoFillRxToOPD = function(encodedName, encodedDrugs) {
  const name = decodeURIComponent(encodedName);
  const drugs = decodeURIComponent(encodedDrugs);

  window.switchTab('rx');
  safeSetValue('opdDiagnosis', name);
  safeSetValue('opdMedicine', drugs);

  const target = $('viewRx');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};

// ==========================================
// 7. DIGITAL OPD PRESCRIPTION & WHATSAPP
// ==========================================
window.calculateDue = function() {
  const total = parseFloat(safeGetValue('opdTotalFee', 0)) || 0;
  const paid = parseFloat(safeGetValue('opdPaidFee', 0)) || 0;
  safeSetValue('opdDueFee', Math.max(0, total - paid));
};

window.captureGPSLocation = function() {
  const btn = $('btnGPS');
  if (!navigator.geolocation) {
    alert('इस डिवाइस में GPS उपलब्ध नहीं है।');
    return;
  }
  if (btn) btn.textContent = '...लोड';

  navigator.geolocation.getCurrentPosition(
    pos => {
      safeSetValue('opdGPS', `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      if (btn) btn.textContent = '✅ दर्ज';
    },
    () => {
      safeSetValue('opdGPS', '28.6139, 77.2090');
      if (btn) btn.textContent = '📍 GPS';
    }
  );
};

window.dispatchWhatsAppRx = function() {
  const farmerName = safeGetValue('opdFarmerName');
  const phone = safeGetValue('opdFarmerPhone');
  const village = safeGetValue('opdVillage', 'स्थानिक');
  const animal = safeGetValue('opdAnimal', 'गाय');
  const preg = safeGetValue('opdPregnancy', 'खाली');
  const diag = safeGetValue('opdDiagnosis', 'क्लिनिकल परीक्षण');
  const med = safeGetValue('opdMedicine', 'लिखित परामर्श अनुसार');
  const total = parseFloat(safeGetValue('opdTotalFee', 0)) || 0;
  const paid = parseFloat(safeGetValue('opdPaidFee', 0)) || 0;
  const due = Math.max(0, total - paid);

  if (!farmerName) {
    alert('कृपया किसान का नाम दर्ज करें!');
    return;
  }
  if (!phone || phone.length < 10) {
    alert('कृपया 10 अंकों का वैध फोन नंबर दर्ज करें!');
    return;
  }

  const msg = 
    `📋 *VETCARE CLINICAL PRESCRIPTION*\n` +
    `--------------------------------\n` +
    `किसान: ${farmerName}\n` +
    `गाँव: ${village} | फोन: ${phone}\n` +
    `पशु: ${animal} (${preg})\n` +
    `रोग निदान: ${diag}\n\n` +
    `💊 *Rx औषधियां व उपचार:*\n${med}\n\n` +
    `💰 *शुल्क विवरण:*\nकुल: ₹${total} | प्राप्त: ₹${paid} | शेष: ₹${due}\n` +
    `--------------------------------\n` +
    `- डॉ. Vetcare Clinical Assistant`;

  if (total > 0) {
    khataRecords.unshift({
      id: 'KH-' + Date.now(),
      farmerName,
      phone,
      village,
      date: getTodayISODate(),
      disease: diag,
      total,
      paid,
      due,
      mode: due > 0 ? 'KHATA' : 'CASH',
      timestamp: Date.now()
    });
    persistKhataRecords();
    renderKhataLedger();
  }

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
};

window.printCurrentOPDSlip = function() {
  const farmerName = safeGetValue('opdFarmerName', 'पशुपालक');
  const phone = safeGetValue('opdFarmerPhone', '-');
  const village = safeGetValue('opdVillage', '-');
  const animal = safeGetValue('opdAnimal', 'पशु');
  const diag = safeGetValue('opdDiagnosis', 'सामान्य परीक्षण');
  const med = safeGetValue('opdMedicine', '-');
  const total = safeGetValue('opdTotalFee', '0');
  const paid = safeGetValue('opdPaidFee', '0');
  const due = safeGetValue('opdDueFee', '0');

  const printArea = $('printableSlipArea');
  if (!printArea) return;

  printArea.innerHTML = `
    <div style="font-family: system-ui, sans-serif; padding: 25px; border: 2px solid #1e40af; border-radius: 8px;">
      <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 12px; margin-bottom: 15px;">
        <h2 style="margin: 0; color: #1e40af; font-size: 22px;">VETCARE VETERINARY CLINICAL OPD</h2>
        <p style="margin: 3px 0; font-size: 11px; color: #64748b;">डिजिटल क्लिनिकल पर्ची एवं शुल्क रसीद</p>
      </div>

      <div style="font-size: 13px; line-height: 1.6; margin-bottom: 15px;">
        <strong>किसान का नाम:</strong> ${farmerName} &nbsp;|&nbsp; <strong>फोन:</strong> ${phone}<br/>
        <strong>गाँव:</strong> ${village} &nbsp;|&nbsp; <strong>पशु:</strong> ${animal}<br/>
        <strong>दिनांक:</strong> ${new Date().toLocaleDateString('hi-IN')}<br/>
        <strong>रोग निदान (Diagnosis):</strong> ${diag}
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin-bottom: 15px;">
        <strong>Rx उपचार व दवाएं:</strong>\n${med}
      </div>

      <div style="display: flex; justify-content: space-between; border-top: 1px dashed #94a3b8; padding-top: 10px; font-size: 13px;">
        <span><strong>कुल शुल्क:</strong> ₹${total}</span>
        <span><strong>जमा:</strong> ₹${paid}</span>
        <span style="color: #be123c;"><strong>शेष बकाया:</strong> ₹${due}</span>
      </div>

      <div style="margin-top: 40px; text-align: right; font-size: 12px;">
        ___________________________<br/>
        <strong>अधिकृत पशु चिकित्सक हस्ताक्षर</strong>
      </div>
    </div>
  `;
  window.print();
};

window.saveOfflineCaseDirectly = function() {
  const caseData = {
    id: 'CASE-' + Date.now(),
    farmerName: safeGetValue('opdFarmerName'),
    phone: safeGetValue('opdFarmerPhone'),
    animal: safeGetValue('opdAnimal'),
    diag: safeGetValue('opdDiagnosis'),
    medicine: safeGetValue('opdMedicine'),
    date: getTodayISODate()
  };

  if (!caseData.farmerName) {
    alert('कृपया कम से कम किसान का नाम दर्ज करें!');
    return;
  }

  opdCases.unshift(caseData);
  try {
    localStorage.setItem(APP_CONFIG.storageKeys.opdCases, JSON.stringify(opdCases));
  } catch (e) {}
  alert('केस रिकॉर्ड सफलतापूर्वक सुरक्षित किया गया!');
};

// ==========================================
// 8. FINANCIAL DASHBOARD & KHATA ENGINE
// ==========================================
function loadLocalKhataRecords() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.storageKeys.khata);
    khataRecords = raw ? JSON.parse(raw) : [];
  } catch (e) {
    khataRecords = [];
  }

  if (!khataRecords || khataRecords.length === 0) {
    khataRecords = [
      {
        id: 'KH-' + (Date.now() - 3600000),
        farmerName: 'सुमेर सिंह जांगड़ा',
        phone: '9876543210',
        village: 'माधोपुर',
        date: getTodayISODate(),
        disease: 'तीव्र अफारा (Bloat) एवं ड्रिप',
        total: 850,
        paid: 500,
        due: 350,
        mode: 'CASH',
        timestamp: Date.now() - 3600000
      },
      {
        id: 'KH-' + (Date.now() - 7200000),
        farmerName: 'महावीर प्रसाद यादव',
        phone: '9416012345',
        village: 'किशनगढ़',
        date: getTodayISODate(),
        disease: 'थनैल (Mastitis) 3-दिन कोर्स',
        total: 1200,
        paid: 1200,
        due: 0,
        mode: 'UPI',
        timestamp: Date.now() - 7200000
      },
      {
        id: 'KH-' + (Date.now() - 86400000),
        farmerName: 'बलजीत सिंह',
        phone: '9812098765',
        village: 'रामपुरा',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        disease: 'मिल्क फीवर (CBG 450ml I/V)',
        total: 950,
        paid: 400,
        due: 550,
        mode: 'KHATA',
        timestamp: Date.now() - 86400000
      }
    ];
    persistKhataRecords();
  }
}

function persistKhataRecords() {
  try {
    localStorage.setItem(APP_CONFIG.storageKeys.khata, JSON.stringify(khataRecords));
  } catch (e) {}

  if (firestoreDb) {
    try {
      const syncBadge = $('cloudSyncStatusBadge');
      if (syncBadge) syncBadge.textContent = '☁️ SYNCING...';

      const batch = firestoreDb.batch();
      khataRecords.slice(0, 20).forEach(rec => {
        const ref = firestoreDb.collection('vetcare_khata').doc(rec.id);
        batch.set(ref, rec, { merge: true });
      });
      batch.commit().then(() => {
        if (syncBadge) syncBadge.textContent = '☁️ LIVE SYNC';
      }).catch(() => {
        if (syncBadge) syncBadge.textContent = '☁️ LOCAL';
      });
    } catch (err) {}
  }
}

function calculateFinancialTotals() {
  const today = getTodayISODate();
  let todayBilled = 0;
  let totalCollected = 0;
  let totalDue = 0;

  khataRecords.forEach(rec => {
    const total = parseFloat(rec.total) || 0;
    const paid = parseFloat(rec.paid) || 0;
    const due = parseFloat(rec.due) || 0;

    if (rec.date === today) todayBilled += total;
    totalCollected += paid;
    totalDue += due;
  });

  safeSetText('ledgerTodayBilled', formatCurrency(todayBilled));
  safeSetText('ledgerTotalCollected', formatCurrency(totalCollected));
  safeSetText('ledgerTotalDue', formatCurrency(totalDue));
}

function renderKhataLedger() {
  calculateFinancialTotals();

  const container = $('khataLedgerList');
  if (!container) return;

  const searchInput = safeGetValue('khataSearchInput').toLowerCase();

  let filtered = khataRecords.filter(rec => {
    const nameMatch = (rec.farmerName || '').toLowerCase().includes(searchInput);
    const phoneMatch = (rec.phone || '').includes(searchInput);
    const villageMatch = (rec.village || '').toLowerCase().includes(searchInput);
    if (!nameMatch && !phoneMatch && !villageMatch) return false;

    if (appState.khataFilter === 'DUE') return (rec.due || 0) > 0;
    if (appState.khataFilter === 'PAID') return (rec.due || 0) <= 0;
    return true;
  });

  safeSetText('khataCountBadge', `${filtered.length} खाते`);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-2">
        <span class="text-3xl block">📋</span>
        <h4 class="text-sm font-bold text-slate-700">कोई खाता रिकॉर्ड नहीं मिला</h4>
        <p class="text-xs text-slate-500">ऊपर दिए गए "➕ नया बिल जोड़ें" बटन से नया बिल बनाएं।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(rec => {
    const isDue = (rec.due || 0) > 0;
    const badgeHtml = isDue
      ? `<span class="bg-rose-100 text-rose-800 border border-rose-300 font-black text-[10px] px-2.5 py-0.5 rounded-full">⚠️ बकाया: ₹${formatCurrency(rec.due)}</span>`
      : `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full">✅ पूर्ण चुकता</span>`;

    return `
      <div class="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 shadow-xs space-y-3 transition">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h4 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>👤</span> ${rec.farmerName}
            </h4>
            <p class="text-[11px] text-slate-500 font-medium">📍 ${rec.village || 'स्थानिक'} • 📱 ${rec.phone}</p>
          </div>
          <div class="text-right shrink-0">
            ${badgeHtml}
            <span class="text-[10px] text-slate-400 block mt-0.5 font-mono">${rec.date || ''}</span>
          </div>
        </div>

        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
          <div class="flex items-center justify-between font-semibold text-slate-700">
            <span>उपचार: ${rec.disease || 'सामान्य परामर्श'}</span>
            <span class="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">${rec.mode || 'CASH'}</span>
          </div>
          <div class="grid grid-cols-3 gap-1 text-center text-[11px]">
            <div class="bg-white p-1 rounded-lg border border-slate-200">
              <span class="text-[9px] text-slate-400 block">कुल शुल्क</span>
              <strong class="text-slate-800">₹${formatCurrency(rec.total)}</strong>
            </div>
            <div class="bg-white p-1 rounded-lg border border-emerald-200">
              <span class="text-[9px] text-emerald-600 block">प्राप्त राशि</span>
              <strong class="text-emerald-700">₹${formatCurrency(rec.paid)}</strong>
            </div>
            <div class="bg-white p-1 rounded-lg border border-rose-200">
              <span class="text-[9px] text-rose-600 block">शेष बकाया</span>
              <strong class="text-rose-700">₹${formatCurrency(rec.due)}</strong>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-0.5">
          ${isDue ? `
            <button 
              onclick="window.sendWhatsAppTagada('${rec.farmerName}', '${rec.phone}', ${rec.due})" 
              class="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              <span>📲</span> तगादा भेजें (WhatsApp)
            </button>
          ` : `
            <button 
              onclick="alert('यह खाता पहले से ही पूर्णतः चुकता है!');" 
              class="flex-1 bg-slate-100 text-slate-400 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-default"
            >
              <span>✅</span> चुकता खाता
            </button>
          `}

          <button 
            onclick="window.receiveKhataPayment('${rec.id}')" 
            class="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold py-2 px-3 rounded-xl text-xs transition"
          >
            ₹ जमा दर्ज करें
          </button>

          <button 
            onclick="window.deleteKhataRecord('${rec.id}')" 
            class="bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 p-2 rounded-xl text-xs transition"
            title="रिकॉर्ड हटाएं"
          >
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.sendWhatsAppTagada = function(farmerName, phone, due) {
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    alert('अमान्य मोबाइल नंबर! तगादा संदेश नहीं भेजा जा सकता।');
    return;
  }

  const message = `नमस्ते ${farmerName} जी, Vetcare पशु चिकित्सा केंद्र से आपके पशु के उपचार का कुल बकाया ₹${due} शेष है। कृपया निम्न UPI आईडी पर भुगतान करें: ${APP_CONFIG.sbiUPI} (Payee: ${APP_CONFIG.payeeName})। धन्यवाद!`;
  const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

window.receiveKhataPayment = function(id) {
  const rec = khataRecords.find(r => r.id === id);
  if (!rec) return;

  const inputAmt = prompt(`पशुपालक: ${rec.farmerName}\nवर्तमान बकाया: ₹${rec.due}\n\nजमा की जा रही नई राशि (₹) दर्ज करें:`);
  if (inputAmt === null) return;

  const amt = parseFloat(inputAmt);
  if (isNaN(amt) || amt <= 0) {
    alert('कृपया वैध राशि दर्ज करें!');
    return;
  }

  rec.paid = (parseFloat(rec.paid) || 0) + amt;
  rec.due = Math.max(0, (parseFloat(rec.total) || 0) - rec.paid);
  persistKhataRecords();
  renderKhataLedger();
};

window.deleteKhataRecord = function(id) {
  if (!confirm('क्या आप सचमुच यह खाता प्रविष्टि हटाना चाहते हैं?')) return;
  khataRecords = khataRecords.filter(r => r.id !== id);
  persistKhataRecords();
  renderKhataLedger();
};

window.setKhataFilter = function(mode, btnEl) {
  appState.khataFilter = mode;
  document.querySelectorAll('.khata-chip').forEach(c => c.classList.remove('filter-chip-active'));
  if (btnEl) btnEl.classList.add('filter-chip-active');
  renderKhataLedger();
};

window.filterKhataRecords = function() {
  renderKhataLedger();
};

window.openAddKhataModal = function() {
  safeSetValue('newBillDate', getTodayISODate());
  safeSetValue('newBillFarmerName', '');
  safeSetValue('newBillFarmerPhone', '');
  safeSetValue('newBillFarmerVillage', '');
  safeSetValue('newBillDisease', '');
  safeSetValue('newBillTotalAmount', '');
  safeSetValue('newBillPaidAmount', '');
  safeSetValue('newBillDueAmount', '0');
  safeSetValue('newBillPayMode', 'CASH');

  const modal = $('modalAddKhataBill');
  if (modal) modal.style.display = 'flex';
};

window.closeAddKhataModal = function() {
  const modal = $('modalAddKhataBill');
  if (modal) modal.style.display = 'none';
};

window.calculateKhataDue = function() {
  const total = parseFloat(safeGetValue('newBillTotalAmount', 0)) || 0;
  const paid = parseFloat(safeGetValue('newBillPaidAmount', 0)) || 0;
  const due = Math.max(0, total - paid);
  safeSetValue('newBillDueAmount', due);

  const modeEl = $('newBillPayMode');
  if (modeEl) {
    if (due === 0 && total > 0) {
      if (modeEl.value === 'KHATA') modeEl.value = 'CASH';
    } else if (paid === 0 && total > 0) {
      modeEl.value = 'KHATA';
    }
  }
};

window.saveKhataBillEntry = function() {
  const farmerName = safeGetValue('newBillFarmerName');
  const phone = safeGetValue('newBillFarmerPhone');
  const village = safeGetValue('newBillFarmerVillage', 'स्थानिक');
  const date = safeGetValue('newBillDate', getTodayISODate());
  const disease = safeGetValue('newBillDisease', 'सामान्य पशु चिकित्सा');
  const total = parseFloat(safeGetValue('newBillTotalAmount', 0)) || 0;
  const paid = parseFloat(safeGetValue('newBillPaidAmount', 0)) || 0;
  const due = Math.max(0, total - paid);
  const mode = safeGetValue('newBillPayMode', 'CASH');

  if (!farmerName) {
    alert('कृपया पशुपालक/किसान का नाम दर्ज करें!');
    return;
  }
  if (!phone || phone.length < 10) {
    alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें!');
    return;
  }
  if (total <= 0) {
    alert('कृपया कुल बिल राशि दर्ज करें!');
    return;
  }

  const newBill = {
    id: 'KH-' + Date.now(),
    farmerName,
    phone,
    village,
    date,
    disease,
    total,
    paid,
    due,
    mode,
    timestamp: Date.now()
  };

  khataRecords.unshift(newBill);
  persistKhataRecords();
  window.closeAddKhataModal();
  renderKhataLedger();
};

// ==========================================
// 9. PREMIUM PAYMENT & DUAL-BANK ENGINE
// ==========================================
window.openPaymentModal = window.openPremiumModal = function() {
  const modal = $('modalPremium');
  if (modal) modal.style.display = 'flex';
};

window.closePaymentModal = window.closePremiumModal = function() {
  const modal = $('modalPremium');
  if (modal) modal.style.display = 'none';
};

window.selectBankTab = function(bankName) {
  appState.activeBank = bankName;
};

window.selectPricingPlan = function(planKey) {
  appState.activePlan = planKey;
};

window.payViaUPIApp = function() {
  const amount = appState.activePlan === 'YEARLY' ? APP_CONFIG.yearlyAmount : APP_CONFIG.monthlyAmount;
  const upiId = appState.activeBank === 'PNB' ? APP_CONFIG.pnbUPI : APP_CONFIG.sbiUPI;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(APP_CONFIG.payeeName)}&am=${amount}&cu=INR&tn=VetcarePro`;
  window.location.href = upiUrl;
};

window.submitPaymentVerification = window.submitPremiumUTR = function() {
  const utr = safeGetValue('inputPremiumUTR');
  if (!utr || utr.length < 8) {
    alert('कृपया वैध 12 अंकों का UTR / Transaction No. दर्ज करें!');
    return;
  }
  localStorage.setItem(APP_CONFIG.storageKeys.paymentStatus, 'PRO_ACTIVE_' + utr);
  alert('धन्यवाद! आपका UTR सत्यापन हेतु प्राप्त हुआ। 15 मिनट में आपकी प्रो सदस्यता सक्रिय कर दी जाएगी।');
  window.closePaymentModal();
};

// ==========================================
// 10. LIVE GEMINI AI CONSULTANT ENGINE
// ==========================================
window.openAIKeyModal = function() {
  const modal = $('modalAIKey');
  if (modal) modal.style.display = 'flex';
  const savedKey = localStorage.getItem(APP_CONFIG.storageKeys.geminiKey) || '';
  safeSetValue('inputGeminiKey', savedKey);
};

window.closeAIKeyModal = function() {
  const modal = $('modalAIKey');
  if (modal) modal.style.display = 'none';
};

window.saveGeminiKey = function() {
  const key = safeGetValue('inputGeminiKey');
  localStorage.setItem(APP_CONFIG.storageKeys.geminiKey, key);
  alert('Gemini AI Key सुरक्षित कर ली गई!');
  window.closeAIKeyModal();
};

window.sendCaseToAIConsultant = function() {
  const diag = safeGetValue('opdDiagnosis');
  const animal = safeGetValue('opdAnimal');
  window.switchTab('ai');
  safeSetValue('aiInputPrompt', `पशु प्रकार: ${animal}\nसंभावित रोग या लक्षण: ${diag}\nकृपया इस केस हेतु डिफरेंशियल डायग्नोसिस, फ्लुइड थेरेपी और दवाओं की सटीक डोज बताएं।`);
};

window.runAIConsultant = async function() {
  const prompt = safeGetValue('aiInputPrompt');
  const out = $('aiOutputArea');
  const key = localStorage.getItem(APP_CONFIG.storageKeys.geminiKey);

  if (!prompt) {
    alert('कृपया केस का विवरण दर्ज करें!');
    return;
  }

  if (out) {
    out.classList.remove('hidden');
    out.textContent = '⏳ AI वेटरनरी सर्जन विश्लेषण कर रहा है, कृपया प्रतीक्षा करें...';
  }

  if (!key) {
    setTimeout(() => {
      if (out) {
        out.innerHTML = `⚠️ <strong>Gemini API Key नहीं मिली!</strong><br/>ऊपर "⚙️ AI Key" बटन से अपनी गूगल AI स्टूडियो Key सेव करें।\n\nतत्काल क्लिनिक संदर्भ:\n• बुखार नियंत्रण: Meloxicam 0.5 mg/kg\n• एंटीबायोटिक कवरेज: Ceftriaxone या Enrofloxacin\n• डिहाइड्रेशन में DNS / RL ड्रिप दें।`;
      }
    }, 600);
    return;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert veterinary medicine and surgery consultant in India. Respond in clean Hindi with clinical injection dosages and fluid protocol for: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (out) out.textContent = reply || 'AI से कोई उत्तर प्राप्त नहीं हो सका।';
  } catch (err) {
    if (out) out.textContent = 'त्रुटि: AI सर्वर से संपर्क नहीं हो सका। कृपया अपनी इंटरनेट कनेक्टिविटी और API Key जांचें।';
  }
};

// ==========================================
// 11. FEED & BREEDING ENGINES
// ==========================================
window.calculateDailyRation = function() {
  const wt = parseFloat(safeGetValue('feedWeight', 400)) || 400;
  const milk = parseFloat(safeGetValue('feedMilk', 10)) || 10;

  const grain = (wt * 0.005) + (milk * 0.4);
  const green = wt * 0.05;
  const dry = wt * 0.015;

  safeSetText('resFeedGrain', grain.toFixed(1) + ' kg');
  safeSetText('resFeedGreen', green.toFixed(1) + ' kg');
  safeSetText('resFeedDry', dry.toFixed(1) + ' kg');

  const card = $('rationResultCard');
  if (card) card.classList.remove('hidden');
};

// ==========================================
// 12. EVENT LISTENER FALLBACKS & BOOTSTRAP
// ==========================================
function bindRoleSelectionFallbacks() {
  const gateway = $('screenGateway');
  if (!gateway) return;

  const allClickables = gateway.querySelectorAll('div, button, a');
  allClickables.forEach(el => {
    const text = (el.textContent || '').trim();
    if (text.includes('पशुपालक के रूप में प्रवेश करें') || text.includes('स्मार्ट पशुपालक')) {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        window.selectRole('farmer');
      });
    } else if (text.includes('चिकित्सक के रूप में प्रवेश करें') || text.includes('पशु चिकित्सक')) {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        window.openDoctorDeclarationModal();
      });
    }
  });
}

function initApp() {
  loadLocalKhataRecords();
  loadStockInventory();
  bindRoleSelectionFallbacks();
  fixMobileViewport();

  const savedRole = localStorage.getItem(APP_CONFIG.storageKeys.role);
  if (savedRole) {
    window.selectRole(savedRole);
  } else {
    const screenGateway = $('screenGateway');
    const screenMain = $('screenMainApp');
    if (screenGateway) {
      screenGateway.classList.remove('hidden');
      screenGateway.style.setProperty('display', 'flex', 'important');
    }
    if (screenMain) {
      screenMain.classList.add('hidden');
      screenMain.style.setProperty('display', 'none', 'important');
    }
  }

  renderKhataLedger();
  window.renderStockInventory();
  evaluateDiagnosis();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
