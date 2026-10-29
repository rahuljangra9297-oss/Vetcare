// ==================== FIREBASE CLOUD CONFIGURATION ====================
const firebaseConfig = {
  apiKey: "AIzaSyC3v_iCbTFYm7bcGns7MBC0i06fOW6ePg8",
  authDomain: "vetcare-9981e.firebaseapp.com",
  projectId: "vetcare-9981e",
  storageBucket: "vetcare-9981e.firebasestorage.app",
  messagingSenderId: "830031070631",
  appId: "1:830031070631:web:3aee25429c11fd75eee282"
};

let db = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    // Enable offline local cache for Firestore
    db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
      console.warn('Firestore offline persistence note:', err.code);
    });
    console.log('Firebase Cloud Firestore Connected Successfully!');
  }
} catch (err) {
  console.error('Firebase Initialization Error:', err);
}

// Global Application State
let currentDiagnosisMode = 'SYMPTOMS';
let currentLanguage = localStorage.getItem('vetcare_lang') || 'HI';
let activeMatrixParams = { temp: null, eyes: null, urine: null, dung: null, cardinalSign: null };
let currentHybridTempFilter = 'ALL';
let currentEtiologyFilter = 'ALL';
let currentLedgerFilter = 'ALL';

// Initialize Everything
window.addEventListener('DOMContentLoaded', () => {
  checkWelcomeDisclaimer();
  applyLanguageUI();
  applyMatrixFilters();
  renderSavedRecords();
  updateLedgerAnalytics();
  initTrialCountdown();
  initPWA();
  initCloudRealtimeSync();
});

// PWA Service Worker
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker Active (v5 Light)'))
      .catch((err) => console.error('SW Error:', err));
  }
}

// ==================== REALTIME CLOUD SYNC ENGINE ====================
function initCloudRealtimeSync() {
  if (!db) return;

  const statusBadge = document.getElementById('cloudSyncStatusBadge');

  // Realtime Sync for OPD Cases
  db.collection('opd_cases').onSnapshot((snapshot) => {
    let cloudCases = [];
    snapshot.forEach((doc) => cloudCases.push(doc.data()));

    if (cloudCases.length > 0) {
      let localRecords = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
      
      // Merge unique by FID
      const map = new Map();
      localRecords.forEach(item => map.set(item.fid, item));
      cloudCases.forEach(item => map.set(item.fid, item));
      
      const merged = Array.from(map.values()).sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
      localStorage.setItem('vetcare_opd_cases', JSON.stringify(merged));
      
      renderSavedRecords();
      updateLedgerAnalytics();
    }

    if (statusBadge) {
      statusBadge.innerText = '☁️ LIVE SYNC';
      statusBadge.className = 'text-[9px] bg-emerald-50 text-emerald-700 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-300';
    }
  }, (error) => {
    console.warn('Realtime sync offline mode active:', error);
    if (statusBadge) {
      statusBadge.innerText = '⚡ OFFLINE';
      statusBadge.className = 'text-[9px] bg-slate-100 text-slate-600 font-mono font-medium px-1.5 py-0.5 rounded border border-slate-200';
    }
  });

  // Realtime Sync for Expenses
  db.collection('expenses').onSnapshot((snapshot) => {
    let cloudExpenses = [];
    snapshot.forEach(doc => cloudExpenses.push(doc.data()));
    if (cloudExpenses.length > 0) {
      localStorage.setItem('vetcare_expenses', JSON.stringify(cloudExpenses));
      updateLedgerAnalytics();
    }
  });
}

function syncCaseToCloud(item) {
  if (!db) return;
  db.collection('opd_cases').doc(item.fid).set(item)
    .then(() => console.log('Case synced to Firebase Cloud:', item.fid))
    .catch((err) => console.warn('Offline: queued for cloud sync when online:', err));
}

function syncExpenseToCloud(expItem) {
  if (!db) return;
  const expId = 'EXP-' + Date.now();
  db.collection('expenses').doc(expId).set(expItem)
    .then(() => console.log('Expense synced to Cloud:', expId))
    .catch((err) => console.warn('Expense queued locally:', err));
}

// ==================== 1. WELCOME DISCLAIMER ====================
function checkWelcomeDisclaimer() {
  const accepted = localStorage.getItem('vetcare_disclaimer_accepted');
  const modal = document.getElementById('modalDisclaimer');
  if (!accepted && modal) {
    modal.classList.remove('hidden');
  }
}

function acceptDisclaimer() {
  localStorage.setItem('vetcare_disclaimer_accepted', 'true');
  const modal = document.getElementById('modalDisclaimer');
  if (modal) modal.classList.add('hidden');
}

// ==================== 2. MULTILINGUAL ENGINE ====================
const I18N = {
  HI: {
    tabMode1: "1. केवल लक्षण (%)",
    tabMode2: "2. लक्षण + नाम",
    tabMode3: "3. केवल रोग नाम"
  },
  EN: {
    tabMode1: "1. Symptoms Only (%)",
    tabMode2: "2. Symptom + Name",
    tabMode3: "3. Disease Directory"
  }
};

function toggleLanguage() {
  currentLanguage = currentLanguage === 'HI' ? 'EN' : 'HI';
  localStorage.setItem('vetcare_lang', currentLanguage);
  applyLanguageUI();
}

function applyLanguageUI() {
  const langData = I18N[currentLanguage];
  const langBtn = document.getElementById('btnLangToggle');
  if (langBtn) langBtn.innerText = currentLanguage === 'HI' ? 'English' : 'हिन्दी';

  const tMode1 = document.getElementById('lblMode1');
  const tMode2 = document.getElementById('lblMode2');
  const tMode3 = document.getElementById('lblMode3');
  if (tMode1) tMode1.innerText = langData.tabMode1;
  if (tMode2) tMode2.innerText = langData.tabMode2;
  if (tMode3) tMode3.innerText = langData.tabMode3;
}

// ==================== 3. 3-WAY DIAGNOSIS ENGINE (WEIGHTED %) ====================
const TRAIT_WEIGHTS = { cardinalSign: 40, temp: 20, eyes: 15, urine: 15, dung: 10 };

function setDiagnosisMode(mode) {
  currentDiagnosisMode = mode;
  ['Symptoms', 'Hybrid', 'Name'].forEach(m => {
    const btn = document.getElementById(`btnMode${m}`);
    const panel = document.getElementById(`panelMode${m}`);
    if (btn) btn.className = 'py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center gap-0.5 hover:text-slate-900';
    if (panel) panel.classList.add('hidden');
  });

  if (mode === 'SYMPTOMS') {
    document.getElementById('btnModeSymptoms').className = 'mode-tab-active py-2 px-1 rounded-xl font-bold transition text-center flex flex-col items-center gap-0.5 text-white';
    document.getElementById('panelModeSymptoms').classList.remove('hidden');
    applyMatrixFilters();
  } else if (mode === 'HYBRID') {
    document.getElementById('btnModeHybrid').className = 'mode-tab-active py-2 px-1 rounded-xl font-bold transition text-center flex flex-col items-center gap-0.5 text-white';
    document.getElementById('panelModeHybrid').classList.remove('hidden');
    handleOmniSearch();
  } else if (mode === 'DISEASE_NAME') {
    document.getElementById('btnModeName').className = 'mode-tab-active py-2 px-1 rounded-xl font-bold transition text-center flex flex-col items-center gap-0.5 text-white';
    document.getElementById('panelModeName').classList.remove('hidden');
    filterByEtiology(currentEtiologyFilter);
  }
}

function toggleMatrixParam(traitKey, traitValue, btnElement) {
  if (activeMatrixParams[traitKey] === traitValue) {
    activeMatrixParams[traitKey] = null;
    btnElement.classList.remove('matrix-chip-active');
  } else {
    activeMatrixParams[traitKey] = traitValue;
    btnElement.parentElement.querySelectorAll('.m-chip').forEach(b => b.classList.remove('matrix-chip-active'));
    btnElement.classList.add('matrix-chip-active');
  }
  applyMatrixFilters();
}

function resetSymptomMatrix() {
  activeMatrixParams = { temp: null, eyes: null, urine: null, dung: null, cardinalSign: null };
  document.querySelectorAll('.m-chip').forEach(b => b.classList.remove('matrix-chip-active'));
  const sel = document.getElementById('selCardinalSign');
  if (sel) sel.value = 'ALL';
  applyMatrixFilters();
}

function applyMatrixFilters() {
  const sel = document.getElementById('selCardinalSign');
  const selectedCardinal = sel ? sel.value : 'ALL';
  activeMatrixParams.cardinalSign = selectedCardinal !== 'ALL' ? selectedCardinal : null;

  const activeKeys = Object.keys(activeMatrixParams).filter(k => activeMatrixParams[k] !== null);

  if (activeKeys.length === 0) {
    const txt = document.getElementById('matchScoreText');
    const bge = document.getElementById('matchCountBadge');
    if (txt) txt.innerText = 'लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी';
    if (bge) bge.innerText = `${CLINICAL_DATABASE.length} रोग`;
    renderDiseaseList(CLINICAL_DATABASE, false);
    return;
  }

  const totalSelectedWeight = activeKeys.reduce((acc, k) => acc + TRAIT_WEIGHTS[k], 0);

  const scoredList = CLINICAL_DATABASE.map(d => {
    let earnedWeight = 0;
    activeKeys.forEach(k => {
      if (k === 'cardinalSign') {
        if (d.traits.cardinalSign === activeMatrixParams[k]) earnedWeight += TRAIT_WEIGHTS.cardinalSign;
      } else if (d.traits[k] === activeMatrixParams[k]) {
        earnedWeight += TRAIT_WEIGHTS[k];
      }
    });
    const probability = totalSelectedWeight > 0 ? Math.round((earnedWeight / totalSelectedWeight) * 100) : 0;
    return { ...d, probability };
  });

  const matchedList = scoredList.filter(d => d.probability > 0).sort((a, b) => b.probability - a.probability);

  const txt = document.getElementById('matchScoreText');
  const bge = document.getElementById('matchCountBadge');
  if (txt) txt.innerText = `🎯 ${activeKeys.length} लक्षण सक्रिय: सर्वाधिक संभावित रोग शीर्ष पर`;
  if (bge) bge.innerText = `${matchedList.length} संभावित`;

  renderDiseaseList(matchedList, true);
}

function handleOmniSearch() {
  const q = document.getElementById('omniSearch').value.toLowerCase().trim();
  const clr = document.getElementById('clearSearchBtn');
  if (clr) clr.classList.toggle('hidden', q.length === 0);

  const filtered = CLINICAL_DATABASE.filter(d => {
    const matchesQ = !q ||
      d.name.toLowerCase().includes(q) ||
      d.localName.toLowerCase().includes(q) ||
      d.cardinal.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      (d.drugs && d.drugs.generic && d.drugs.generic.toLowerCase().includes(q)) ||
      (d.drugs && d.drugs.ethical && d.drugs.ethical.toLowerCase().includes(q)) ||
      d.etiologyName.toLowerCase().includes(q);
    const matchesTemp = currentHybridTempFilter === 'ALL' || d.category === currentHybridTempFilter;
    return matchesQ && matchesTemp;
  });

  renderDiseaseList(filtered, false);
}

function clearOmniSearch() {
  document.getElementById('omniSearch').value = '';
  handleOmniSearch();
}

function applyTempFilter(cat, btn) {
  currentHybridTempFilter = cat;
  document.querySelectorAll('.temp-chip').forEach(c => c.classList.remove('chip-active'));
  if (btn) btn.classList.add('chip-active');
  handleOmniSearch();
}

function filterByEtiology(etio, btn) {
  currentEtiologyFilter = etio;
  if (btn) {
    document.querySelectorAll('.etio-chip').forEach(c => c.classList.remove('chip-active'));
    btn.classList.add('chip-active');
  }
  const filtered = etio === 'ALL' ? CLINICAL_DATABASE : CLINICAL_DATABASE.filter(d => d.etiologyType === etio);
  renderDiseaseList(filtered, false);
}

// ==================== 4. RENDER CRISP LIGHT CLINICAL CARDS ====================
function renderDiseaseList(list, showPercentage) {
  const container = document.getElementById('diseaseContainer');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div class="text-3xl mb-2">🔍</div>
        <p class="font-bold text-slate-800">कोई बीमारी या लक्षण मेल नहीं खाया</p>
        <p class="text-xs text-slate-500 mt-1">भिन्न लक्षण चुनें या रीसेट करें।</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const isHigh = d.probability >= 80;
    const isMed = d.probability >= 50 && d.probability < 80;
    const badgeColor = isHigh ? 'bg-blue-50 text-blue-700 border-blue-200' : (isMed ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200');
    const barGradient = isHigh ? 'from-blue-600 to-cyan-500' : (isMed ? 'from-amber-500 to-amber-600' : 'from-slate-400 to-slate-500');

    return `
      <div class="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5 transition hover:border-slate-300">
        
        <!-- Header -->
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug tracking-tight">${d.id}. ${d.name}</h3>
            <p class="text-xs text-blue-600 font-semibold mt-0.5">देसी नाम: ${d.localName}</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${d.etiologyName}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <span class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${d.category === 'HIGH' ? 'bg-rose-50 text-rose-700 border-rose-200' : (d.category === 'SUB' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' : 'bg-slate-100 text-slate-700 border-slate-200')}">${d.temp}</span>
            ${showPercentage ? `<span class="text-[11px] font-bold px-2.5 py-0.5 rounded-xl border ${badgeColor}">★ ${d.probability}% संभावना</span>` : ''}
          </div>
        </div>

        ${showPercentage ? `
          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div class="bg-gradient-to-r ${barGradient} h-2 rounded-full transition-all duration-500" style="width: ${d.probability}%"></div>
          </div>
        ` : ''}

        <!-- Cardinal Sign -->
        <div class="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3 text-xs">
          <span class="font-bold text-rose-700 flex items-center gap-1.5 mb-1">
            <span>🚨</span> प्रमुख कार्डिनल लक्षण (Cardinal Sign):
          </span>
          <p class="text-slate-800 leading-relaxed font-medium">${d.cardinal}</p>
        </div>

        <!-- On-Site Confirmation -->
        <div class="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-2.5 text-xs">
          <span class="font-bold text-blue-800 flex items-center gap-1.5 mb-0.5">
            <span>🔍</span> मौके पर ही रोग पुष्टिकरण संकेत (On-Site Confirmation):
          </span>
          <p class="text-slate-700 text-[11px] leading-relaxed">${d.onSiteConfirm || 'क्लीनिकल इतिहास व शारीरिक लक्षणों से पुष्टि करें।'}</p>
        </div>

        <!-- Staging & Trajectory Accordion -->
        <details class="bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <summary class="p-3 font-bold text-slate-800 cursor-pointer flex justify-between items-center select-none">
            <span class="flex items-center gap-1.5">⏱️ रोग की अवस्थाएं व प्रोग्नोसिस (Staging & Trajectory)</span>
            <span class="text-blue-600 text-[10px]">विस्तार ▼</span>
          </summary>
          <div class="p-3.5 pt-0 space-y-2.5 border-t border-slate-200/60 mt-1 text-[11px]">
            <div class="space-y-1">
              <p class="text-slate-600 font-semibold">रोग के चरण (Stages):</p>
              <p class="text-slate-700">• ${d.stages ? d.stages.s1 : 'प्रारंभिक लक्षण'}</p>
              <p class="text-slate-700">• ${d.stages ? d.stages.s2 : 'तीव्र अवस्था'}</p>
              ${d.stages && d.stages.s3 ? `<p class="text-slate-700">• ${d.stages.s3}</p>` : ''}
            </div>
            <div class="space-y-1 pt-1.5 border-t border-slate-200">
              <p class="text-blue-700 font-semibold">📈 सही दवा से सकारात्मक मार्ग (+ve):</p>
              <p class="text-slate-700">${d.trajectories ? d.trajectories.positive : 'समय पर दवा मिलने पर 3-5 दिन में स्वास्थ्य लाभ।'}</p>
              <p class="text-rose-700 font-semibold mt-1">📉 गलत दवा/विलंब पर नकारात्मक मार्ग (-ve):</p>
              <p class="text-slate-700">${d.trajectories ? d.trajectories.negative : 'उपेक्षा होने पर स्थिति अति-गंभीर होना निश्चित।'}</p>
            </div>
          </div>
        </details>

        <!-- Ethical vs Generic Drugs -->
        <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2 text-xs">
          <div class="flex items-center justify-between font-bold text-blue-900">
            <span>💊 औषधियां (Ethical Brands vs Generic Salts):</span>
            <button onclick="transferToRx('${d.name.replace(/'/g, "\\'")}', '${(d.drugs ? d.drugs.generic : d.rxInjections).replace(/'/g, "\\'")}')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-[11px] font-semibold active:scale-95 transition shadow-sm">
              + पर्चे में लोड करें
            </button>
          </div>
          <div class="text-[11px] space-y-1.5 font-mono">
            <p><strong class="text-slate-600">जेनेरिक साल्ट:</strong> ${d.drugs ? d.drugs.generic : d.rxInjections}</p>
            <p><strong class="text-blue-700">एथिकल ब्रांड्स (MRP):</strong> ${d.drugs ? d.drugs.ethical : 'मानक वेट ब्रांड्स उपलब्ध हैं'}</p>
            <p class="text-slate-700 font-sans"><strong class="text-slate-600">दवा का प्रभाव:</strong> ${d.drugs ? d.drugs.correctEffect : 'रोग निवारक'}</p>
            <p class="text-rose-700 font-sans"><strong class="text-rose-700">गलत दवा का दुष्परिणाम:</strong> ${d.drugs ? d.drugs.hazardWrong : 'रोग की तीव्रता बढ़ना'}</p>
          </div>
        </div>

        <!-- Separated Doctor vs Farmer Protocol -->
        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div class="bg-blue-50/50 border border-blue-200 p-2.5 rounded-2xl space-y-0.5">
            <span class="font-bold text-blue-800">🩺 डॉक्टर प्रोटोकॉल:</span>
            <p class="text-slate-700 leading-tight">${d.protocols ? d.protocols.doctor : 'खुराक व तापमान मॉनिटर करें।'}</p>
          </div>
          <div class="bg-amber-50/50 border border-amber-200 p-2.5 rounded-2xl space-y-0.5">
            <span class="font-bold text-amber-800">👨‍🌾 किसान देखभाल:</span>
            <p class="text-slate-700 leading-tight">${d.protocols ? d.protocols.farmer : 'सूखा बाड़ा व सुपाच्य दलिया दें।'}</p>
          </div>
        </div>

        <!-- Pregnancy Alert -->
        <p class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
          <strong>🤰 गर्भ सुरक्षा:</strong> ${d.pregnancy}
        </p>

        <!-- Lab Test Footer -->
        <div class="pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
          <span>🔬 लैब टेस्ट: <strong>${d.labTest.name}</strong> (${d.labTest.cost})</span>
          <span class="text-rose-600 font-semibold">खतरा: ${d.redFlags}</span>
        </div>

      </div>
    `;
  }).join('');
}

function transferToRx(diseaseName, rxTreatment) {
  document.getElementById('opdDiagnosis').value = diseaseName;
  document.getElementById('opdMedicine').value = rxTreatment;
  navigateToTab('rx');
}

// ==================== 5. NAVIGATION ====================
function navigateToTab(tabName) {
  const tabs = ['clinical', 'rx', 'ai', 'records', 'ledger'];
  tabs.forEach(t => {
    const sec = document.getElementById(`view${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (sec) sec.classList.add('hidden');
    if (btn) {
      btn.classList.remove('text-blue-600', 'font-bold');
      btn.classList.add('text-slate-400');
    }
  });

  const activeSec = document.getElementById(`view${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  const activeBtn = document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('text-blue-600', 'font-bold');
    activeBtn.classList.remove('text-slate-400');
  }

  const modeDock = document.getElementById('dockModeSelector');
  if (modeDock) modeDock.classList.toggle('hidden', tabName !== 'clinical');

  if (tabName === 'records') renderSavedRecords();
  if (tabName === 'ledger') updateLedgerAnalytics();
}

// ==================== 6. GPS LOCATION & OPD CASE LOGIC ====================
function captureGPSLocation() {
  const btn = document.getElementById('btnGPS');
  if (!navigator.geolocation) {
    alert('आपके डिवाइस में GPS सपोर्ट नहीं है।');
    return;
  }
  btn.innerText = '📍 प्राप्त हो रहा...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      document.getElementById('opdGPS').value = `${lat}, ${lon}`;
      btn.innerText = '✅ GPS प्राप्त';
    },
    (err) => {
      alert('GPS अनुमति अस्वीकृत हुई। कृपया मैन्युअली पता भरें।');
      btn.innerText = '📍 GPS लें';
    }
  );
}

function calculateDueAmount() {
  const total = parseFloat(document.getElementById('opdTotalFee').value) || 0;
  const paid = parseFloat(document.getElementById('opdPaidFee').value) || 0;
  const due = Math.max(0, total - paid);
  document.getElementById('opdDueFee').value = due;
  const badge = document.getElementById('opdPaymentStatusBadge');
  if (due === 0 && total > 0) {
    badge.innerText = 'पूर्ण चुकता (Paid)';
    badge.className = 'text-[11px] font-bold text-emerald-600';
  } else if (paid > 0 && due > 0) {
    badge.innerText = `आंशिक जमा (₹${due} बकाया)`;
    badge.className = 'text-[11px] font-bold text-amber-600';
  } else if (total > 0 && paid === 0) {
    badge.innerText = `पूर्ण उधार (₹${due} बाकी)`;
    badge.className = 'text-[11px] font-bold text-rose-600';
  } else {
    badge.innerText = '--';
  }
}

function generateCaseDataFromForm() {
  const name = document.getElementById('opdFarmerName').value.trim();
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  const village = document.getElementById('opdVillage').value.trim() || 'स्थानीय';
  const gps = document.getElementById('opdGPS').value.trim() || 'N/A';
  const animal = document.getElementById('opdAnimal').value;
  const tag = document.getElementById('opdTag').value.trim() || 'AID-' + Math.floor(1000 + Math.random() * 9000);
  const preg = document.getElementById('opdPregnancy').value;
  const drop = document.getElementById('opdMilkDrop').value.trim() || '0%';
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const med = document.getElementById('opdMedicine').value.trim();
  const totalFee = parseFloat(document.getElementById('opdTotalFee').value) || 0;
  const paidFee = parseFloat(document.getElementById('opdPaidFee').value) || 0;
  const dueFee = Math.max(0, totalFee - paidFee);

  if (!name || !phone || !diag || !med) {
    alert('कृपया किसान का नाम, मोबाइल नंबर, बीमारी और दवा विवरण अवश्य भरें!');
    return null;
  }

  const fid = 'FID-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('hi-IN');
  const timestamp = new Date().toISOString();

  return { fid, date: dateStr, timestamp, name, phone, village, gps, animal, tag, preg, drop, diag, med, totalFee, paidFee, dueFee };
}

function dispatchWhatsAppRx() {
  const c = generateCaseDataFromForm();
  if (!c) return;

  const slip = 
`🐾 *पशु चिकित्सा सेवा पर्ची (Vetcare)*
━━━━━━━━━━━━━━━━━━━━
🆔 *FID:* ${c.fid} | *टैग सं:* ${c.tag}
📅 *दिनांक:* ${c.date}
👤 *किसान:* ${c.name} (${c.village})
📱 *संपर्क:* ${c.phone}
📍 *लोकेशन:* ${c.gps}
🐄 *पशु:* ${c.animal} (स्थिति: ${c.preg} | दूध गिरावट: ${c.drop})
━━━━━━━━━━━━━━━━━━━━
🩺 *संभावित रोग (Diagnosis):*
${c.diag}

💊 *दवा व प्राथमिक उपचार (Rx):*
${c.med}
━━━━━━━━━━━━━━━━━━━━
💰 *बिल व भुगतान विवरण:*
• कुल उपचार शुल्क: ₹${c.totalFee}
• प्राप्त राशि: ₹${c.paidFee}
• शेष बकाया राशि: ₹${c.dueFee} ${c.dueFee > 0 ? '(⚠️ कृपया शीघ्र चुकता करें)' : '(✅ पूर्ण चुकता)'}
━━━━━━━━━━━━━━━━━━━━
⚠️ *वैधानिक चेतावनी:* दवा की खुराक किसी पंजीकृत पशु चिकित्सक के प्रत्यक्ष परामर्श अनुसार ही दें।
_डिजिटल पशु चिकित्सा क्लिनिकल ओपीडी_`;

  saveLocalCase(c);
  const cleanPhone = c.phone.replace(/\D/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(slip)}`, '_blank');
}

function dispatchNativeSMS() {
  const c = generateCaseDataFromForm();
  if (!c) return;
  const smsText = `Vetcare: FID ${c.fid}. Kisan: ${c.name}, Rog: ${c.diag}, Dawa: ${c.med}, Kul: Rs.${c.totalFee}, Bakaya: Rs.${c.dueFee}. Call doctor for help.`;
  saveLocalCase(c);
  window.open(`sms:${c.phone}?body=${encodeURIComponent(smsText)}`, '_blank');
}

function directPhoneCall() {
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  if (!phone) { alert('पहले किसान का मोबाइल नंबर दर्ज करें!'); return; }
  window.open(`tel:${phone}`, '_self');
}

function printCurrentOPDSlip() {
  const c = generateCaseDataFromForm();
  if (!c) return;

  const printArea = document.getElementById('printableSlipArea');
  printArea.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px;">
      <h2 style="font-size: 18px; font-weight: bold; margin: 0;">VETCARE CLINICAL ASSISTANT</h2>
      <p style="font-size: 11px; color: #475569; margin: 2px 0 0 0;">डिजिटल पशु चिकित्सा ओपीडी पर्ची</p>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
      <span><strong>FID:</strong> ${c.fid}</span>
      <span><strong>दिनांक:</strong> ${c.date}</span>
    </div>
    <div style="font-size: 12px; line-height: 1.5; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;">
      <div><strong>किसान:</strong> ${c.name} (${c.village}) | <strong>फ़ोन:</strong> ${c.phone}</div>
      <div><strong>पशु:</strong> ${c.animal} | <strong>टैग सं:</strong> ${c.tag} | <strong>गर्भ स्थिति:</strong> ${c.preg}</div>
    </div>
    <div style="font-size: 12px; margin-bottom: 10px;">
      <div><strong>पहचाना गया रोग (Diagnosis):</strong> ${c.diag}</div>
      <div style="margin-top: 4px;"><strong>उपचार व दवाइयां (Rx):</strong></div>
      <div style="font-family: monospace; background: #f8fafc; padding: 6px; border-radius: 4px; margin-top: 4px;">${c.med}</div>
    </div>
    <div style="font-size: 12px; border-top: 1px dashed #cbd5e1; padding-top: 8px; display: flex; justify-content: space-between;">
      <span>कुल शुल्क: ₹${c.totalFee}</span>
      <span>प्राप्त: ₹${c.paidFee}</span>
      <span style="font-weight: bold; color: ${c.dueFee > 0 ? '#b91c1c' : '#15803d'}">बकाया: ₹${c.dueFee}</span>
    </div>
    <div style="font-size: 9px; color: #64748b; text-align: center; margin-top: 14px;">
      * वैधानिक सूचना: दवा का प्रयोग पंजीकृत पशु चिकित्सक की देखरेख में ही करें।
    </div>
  `;
  window.print();
}

function handleSaveOfflineCase() {
  const c = generateCaseDataFromForm();
  if (!c) return;
  saveLocalCase(c);
  alert('केस सफलता से सुरक्षित कर लिया गया (Local + Cloud Sync)!');
  navigateToTab('records');
}

function saveLocalCase(item) {
  let records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  records.unshift(item);
  localStorage.setItem('vetcare_opd_cases', JSON.stringify(records));
  syncCaseToCloud(item);
  updateLedgerAnalytics();
}

// ==================== 7. LIVE GEMINI AI VETERINARY CONSULTANT ====================
function openAIKeyModal() {
  const modal = document.getElementById('modalAIKey');
  const storedKey = localStorage.getItem('vetcare_gemini_key') || '';
  document.getElementById('inputGeminiKey').value = storedKey;
  if (modal) modal.classList.remove('hidden');
}

function closeAIKeyModal() {
  const modal = document.getElementById('modalAIKey');
  if (modal) modal.classList.add('hidden');
}

function saveGeminiKey() {
  const key = document.getElementById('inputGeminiKey').value.trim();
  if (!key) { alert('कृपया मान्य API Key दर्ज करें!'); return; }
  localStorage.setItem('vetcare_gemini_key', key);
  alert('Gemini API Key सुरक्षित कर ली गई!');
  closeAIKeyModal();
}

function sendCaseToAIConsultant() {
  const animal = document.getElementById('opdAnimal').value;
  const preg = document.getElementById('opdPregnancy').value;
  const drop = document.getElementById('opdMilkDrop').value.trim() || 'N/A';
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const notes = document.getElementById('opdMedicine').value.trim();

  const casePrompt = `पशु प्रकार: ${animal}, गर्भ स्थिति: ${preg}, दूध में गिरावट: ${drop}\nप्राथमिक संदेहास्पद रोग: ${diag || 'अज्ञात'}\nनैदानिक लक्षण / दवा इतिहास: ${notes || 'खाना-पीना बंद, सुस्ती, तेज़ बुखार'}`;
  
  document.getElementById('aiInputPrompt').value = casePrompt;
  navigateToTab('ai');
}

async function runAIConsultant() {
  const promptText = document.getElementById('aiInputPrompt').value.trim();
  if (!promptText) {
    alert('कृपया विश्लेषण हेतु पशु के लक्षण दर्ज करें!');
    return;
  }

  const apiKey = localStorage.getItem('vetcare_gemini_key');
  if (!apiKey) {
    alert('कृपया पहले ऊपर "🤖 AI Key" बटन दबाकर अपनी Google Gemini API Key दर्ज करें!');
    openAIKeyModal();
    return;
  }

  const btn = document.getElementById('btnRunAI');
  const outArea = document.getElementById('aiOutputArea');
  const outText = document.getElementById('aiOutputText');

  btn.disabled = true;
  btn.innerHTML = `<span class="animate-spin">⏳</span> AI सर्जन विश्लेषण कर रहे हैं...`;
  outArea.classList.remove('hidden');
  outText.innerHTML = `क्लिनिकल केस शीट का सूक्ष्म विश्लेषण जारी है...`;

  const systemInstruction = 
`Role: आप एक Senior Veterinary Surgeon (वरिष्ठ पशु चिकित्सक) व Lab Specialist हैं।
नीचे दिए गए पशु के लक्षणों का गहन वैज्ञानिक विश्लेषण कर निम्नलिखित 5 खंडों में स्पष्ट समाधान प्रदान करें:
1. रोग के संभावित नाम (English, Hindi, Local Rural Names)
2. रोग का मूल कारण व संचरण (Bacteria, Virus, Protozoa, Metabolic)
3. पुष्टिकरण लैब जांच व अनुमानित खर्च (₹)
4. संपूर्ण उपचार योजना (आपातकालीन इंजेक्शन mg/kg, ओरल टॉनिक, देसी नुस्खे, व गर्भावस्था लाल चेतावनी)
5. समग्र पूर्वानुमान (Prognosis) व ठीक होने के न्यूनतम/अधिकतम दिन।
भाषा: मुख्य रूप से हिंदी (Bilingual)।`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nमरीज पशु का विवरण:\n${promptText}` }] }
        ]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiResult = data.candidates[0].content.parts[0].text;
    outText.innerText = aiResult;
  } catch (err) {
    outText.innerHTML = `<span class="text-rose-600 font-bold">त्रुटि: ${err.message}</span>\nकृपया अपनी API Key या इंटरनेट कनेक्शन की जांच करें।`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>✨</span> AI से संपूर्ण क्लिनिकल रिपोर्ट मांगें`;
  }
}

function clearAIOutput() {
  document.getElementById('aiInputPrompt').value = '';
  document.getElementById('aiOutputArea').classList.add('hidden');
  document.getElementById('aiOutputText').innerText = '';
}

function transferAIToRx() {
  const text = document.getElementById('aiOutputText').innerText;
  if (!text) return;
  document.getElementById('opdMedicine').value = text.slice(0, 500) + '...';
  navigateToTab('rx');
}

// ==================== 8. UNIVERSAL CASE SEARCH & REGISTRY ====================
function handleUniversalRecordSearch() {
  const q = document.getElementById('searchRecordsInput').value.toLowerCase().trim();
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');

  const filtered = records.filter(r => 
    r.name.toLowerCase().includes(q) ||
    r.phone.includes(q) ||
    r.tag.toLowerCase().includes(q) ||
    r.village.toLowerCase().includes(q) ||
    r.fid.toLowerCase().includes(q)
  );

  renderRecordsArray(filtered);
}

function renderSavedRecords() {
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  renderRecordsArray(records);
}

function renderRecordsArray(records) {
  const countBadge = document.getElementById('recordTotalBadge');
  if (countBadge) countBadge.innerText = `${records.length} केस सुरक्षित`;

  const container = document.getElementById('recordsList');
  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">अभी कोई रिकॉर्ड दर्ज नहीं है।</div>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="bg-white border border-slate-200 rounded-3xl p-4 space-y-2 text-xs shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2 font-mono text-[11px]">
        <span class="text-blue-700 font-bold">${r.fid}</span>
        <span class="text-slate-400">${r.date}</span>
      </div>
      <div class="text-slate-800 flex justify-between items-center">
        <span><strong>${r.name}</strong> (${r.village}) • ${r.phone}</span>
        <a href="tel:${r.phone}" class="text-blue-600 hover:text-blue-700 font-bold">📞 कॉल</a>
      </div>
      <div class="text-slate-600">टैग: <strong class="text-slate-900">${r.tag}</strong> • पशु: ${r.animal} (${r.preg})</div>
      ${r.gps !== 'N/A' ? `<div class="text-[10px] text-slate-500"><a href="https://maps.google.com/?q=${r.gps}" target="_blank" class="text-blue-600 underline">📍 मैप पर घर देखें (${r.gps})</a></div>` : ''}
      <div class="text-amber-700 font-semibold">डायग्नोसिस: ${r.diag}</div>
      <div class="text-slate-700 text-[11px] font-mono bg-slate-50 p-2 rounded-xl border border-slate-200">Rx: ${r.med}</div>
      <div class="flex items-center justify-between pt-1 text-[11px]">
        <span class="text-slate-500">कुल: ₹${r.totalFee} | जमा: ₹${r.paidFee}</span>
        <span class="font-bold ${r.dueFee > 0 ? 'text-rose-600' : 'text-emerald-600'}">
          ${r.dueFee > 0 ? `बकाया: ₹${r.dueFee}` : 'पूर्ण चुकता'}
        </span>
      </div>
    </div>
  `).join('');
}

// ==================== 9. GRANULAR FINANCE & DEBIT/CREDIT KHATA ====================
function setLedgerTimeFilter(filterType, btn) {
  currentLedgerFilter = filterType;
  document.querySelectorAll('.ledger-time-chip').forEach(c => c.classList.remove('chip-active'));
  if (btn) btn.classList.add('chip-active');
  updateLedgerAnalytics();
}

function updateLedgerAnalytics() {
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  const now = new Date();

  const filteredRecords = records.filter(r => {
    if (currentLedgerFilter === 'ALL') return true;
    const rDate = new Date(r.timestamp || r.date);
    if (currentLedgerFilter === 'DAILY') {
      return rDate.toDateString() === now.toDateString();
    } else if (currentLedgerFilter === 'WEEKLY') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return rDate >= oneWeekAgo;
    } else if (currentLedgerFilter === 'MONTHLY') {
      return rDate.getMonth() === now.getMonth() && rDate.getFullYear() === now.getFullYear();
    } else if (currentLedgerFilter === 'YEARLY') {
      return rDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  let totalCredit = 0;
  let totalCollected = 0;
  let totalDues = 0;

  filteredRecords.forEach(r => {
    totalCredit += (r.totalFee || 0);
    totalCollected += (r.paidFee || 0);
    totalDues += (r.dueFee || 0);
  });

  const expenses = JSON.parse(localStorage.getItem('vetcare_expenses') || '[]');
  const totalDebit = expenses.reduce((acc, x) => acc + (x.amount || 0), 0);
  const netProfit = totalCollected - totalDebit;

  const revEl = document.getElementById('ledgerTotalRevenue');
  const collEl = document.getElementById('ledgerTotalCollected');
  const duesEl = document.getElementById('ledgerTotalDues');
  const debitEl = document.getElementById('ledgerTotalDebit');
  const profitEl = document.getElementById('ledgerNetProfit');

  if (revEl) revEl.innerText = `₹${totalCredit}`;
  if (collEl) collEl.innerText = `₹${totalCollected}`;
  if (duesEl) duesEl.innerText = `₹${totalDues}`;
  if (debitEl) debitEl.innerText = `₹${totalDebit}`;
  if (profitEl) profitEl.innerText = `₹${netProfit}`;

  const dueListContainer = document.getElementById('ledgerDueList');
  if (!dueListContainer) return;

  const dueRecords = records.filter(r => (r.dueFee || 0) > 0);

  if (dueRecords.length === 0) {
    dueListContainer.innerHTML = `<div class="p-6 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">बाज़ार में कोई बकाया राशि नहीं है। सभी खाते चुकता हैं।</div>`;
    return;
  }

  dueListContainer.innerHTML = dueRecords.map(r => `
    <div class="bg-rose-50/40 border border-rose-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
      <div>
        <div class="font-bold text-slate-900">${r.name} (${r.village})</div>
        <div class="text-[11px] text-slate-500">${r.phone} • ${r.diag}</div>
        <div class="text-rose-700 font-bold mt-0.5">बकाया: ₹${r.dueFee} (कुल: ₹${r.totalFee})</div>
      </div>
      <button onclick="sendDueReminder('${r.name}', '${r.phone}', ${r.dueFee}, '${r.fid}')" class="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm active:scale-95 transition">
        💬 तगादा भेजें
      </button>
    </div>
  `).join('');
}

function addClinicExpense() {
  const desc = prompt("खर्च का विवरण (उदा. पेट्रोल, दवा खरीद, कॉटन):");
  if (!desc) return;
  const amt = parseFloat(prompt("खर्च की राशि (₹):"));
  if (!amt || isNaN(amt)) return;

  const expItem = { desc, amount: amt, date: new Date().toLocaleDateString('hi-IN'), timestamp: new Date().toISOString() };
  let expenses = JSON.parse(localStorage.getItem('vetcare_expenses') || '[]');
  expenses.push(expItem);
  localStorage.setItem('vetcare_expenses', JSON.stringify(expenses));
  syncExpenseToCloud(expItem);
  alert('खर्च सफलता से दर्ज हुआ!');
  updateLedgerAnalytics();
}

function sendDueReminder(name, phone, dueFee, fid) {
  const msg = 
`नमस्कार ${name} जी, 
पशु चिकित्सा सेवा पर्ची (*${fid}*) का आपका ₹${dueFee} का उपचार शुल्क बकाया है। 
कृपया सुविधानुसार यह बकाया राशि PhonePe/GPay या नकद द्वारा चुकता करने का कष्ट करें। 
_Vetcare क्लिनिकल एकाउंट्स_`;

  const cleanPhone = phone.replace(/\D/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==================== 10. TRIAL COUNTDOWN ====================
function initTrialCountdown() {
  let trialStart = localStorage.getItem('vetcare_trial_start');
  if (!trialStart) {
    trialStart = new Date().getTime();
    localStorage.setItem('vetcare_trial_start', trialStart);
  }

  const badge = document.getElementById('trialTimerBadge');
  setInterval(() => {
    const now = new Date().getTime();
    const elapsed = now - parseInt(trialStart, 10);
    const totalTrial = 24 * 60 * 60 * 1000;
    const remaining = totalTrial - elapsed;

    if (remaining > 0) {
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      if (badge) badge.innerText = `ट्रायल: ${hours}h ${mins}m शेष`;
    } else {
      if (badge) {
        badge.innerText = `ट्रायल समाप्त (Basic Mode)`;
        badge.className = 'text-[10px] text-amber-600 font-mono font-bold';
      }
    }
  }, 1000);
}
