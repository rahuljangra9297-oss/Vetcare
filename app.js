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
});

// PWA Service Worker
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((err) => console.error('SW Error:', err));
  }
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
    appTitle: "Pashu Seva Pro",
    appSubtitle: "3-Way क्लिनिकल रोग निदान, ओपीडी व वित्तीय खाता बही",
    tabMode1: "1. केवल लक्षण (%)",
    tabMode2: "2. लक्षण + नाम",
    tabMode3: "3. केवल रोग नाम",
    navClinical: "रोग पहचान",
    navRx: "पर्चा बनाएं",
    navRecords: "केस रिकॉर्ड",
    navLedger: "खाता बही",
    navProfile: "प्रोफ़ाइल"
  },
  EN: {
    appTitle: "Pashu Seva Pro",
    appSubtitle: "3-Way Clinical Diagnosis, OPD & Financial Khata",
    tabMode1: "1. Symptoms Only (%)",
    tabMode2: "2. Symptom + Name",
    tabMode3: "3. Disease Directory",
    navClinical: "Diagnosis",
    navRx: "Prescription",
    navRecords: "Records",
    navLedger: "Ledger",
    navProfile: "Profile"
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
    if (btn) btn.className = 'py-2 px-1 rounded-xl text-slate-400 font-medium transition text-center flex flex-col items-center gap-0.5';
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
    if (bge) bge.innerText = `${CLINICAL_DATABASE.length} रोग सूची`;
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
      d.drugs.generic.toLowerCase().includes(q) ||
      d.drugs.ethical.toLowerCase().includes(q) ||
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

// ==================== 4. RENDER CLINICAL CARDS ====================
function renderDiseaseList(list, showPercentage) {
  const container = document.getElementById('diseaseContainer');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div class="text-3xl mb-2">🔍</div>
        <p class="font-bold text-slate-200">कोई बीमारी या लक्षण मेल नहीं खाया</p>
        <p class="text-xs text-slate-400 mt-1">भिन्न लक्षण चुनें या रीसेट करें।</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const isHigh = d.probability >= 80;
    const isMed = d.probability >= 50 && d.probability < 80;
    const badgeColor = isHigh ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : (isMed ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-700/40 text-slate-300 border-slate-600/50');
    const barColor = isHigh ? 'bg-emerald-400' : (isMed ? 'bg-amber-400' : 'bg-blue-400');

    return `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 transition hover:border-slate-700">
        
        <!-- Header -->
        <div class="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div>
            <h3 class="text-sm font-bold text-slate-100 leading-snug">${d.id}. ${d.name}</h3>
            <p class="text-[11px] text-cyan-400 font-medium">देसी नाम: ${d.localName}</p>
            <p class="text-[10px] text-slate-400 font-mono mt-0.5">${d.etiologyName}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <span class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${d.category === 'HIGH' ? 'bg-rose-950/80 text-rose-300 border-rose-800' : (d.category === 'SUB' ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800' : 'bg-slate-800 text-slate-300 border-slate-700')}">${d.temp}</span>
            ${showPercentage ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded-lg border ${badgeColor}">★ ${d.probability}% संभावना</span>` : ''}
          </div>
        </div>

        ${showPercentage ? `
          <div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div class="${barColor} h-1.5 rounded-full transition-all duration-500" style="width: ${d.probability}%"></div>
          </div>
        ` : ''}

        <!-- Cardinal Sign -->
        <div class="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 text-xs">
          <span class="font-bold text-rose-400 flex items-center gap-1 mb-1">🚨 प्रमुख कार्डिनल लक्षण (Cardinal Sign):</span>
          <p class="text-slate-200 leading-relaxed font-medium">${d.cardinal}</p>
        </div>

        <!-- On-Site Corroborative Confirmation -->
        <div class="bg-cyan-950/20 border border-cyan-900/40 rounded-xl p-2.5 text-xs">
          <span class="font-bold text-cyan-300 flex items-center gap-1 mb-0.5">🔍 मौके पर ही रोग पुष्टिकरण संकेत (On-Site Confirmation):</span>
          <p class="text-slate-300 text-[11px] leading-relaxed">${d.onSiteConfirm}</p>
        </div>

        <!-- Staging & Trajectory Accordion -->
        <details class="bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <summary class="p-2.5 font-bold text-slate-300 cursor-pointer flex justify-between items-center">
            <span>⏱️ रोग की अवस्थाएं व प्रोग्नोसिस (Staging & Trajectory)</span>
            <span class="text-cyan-400 text-[10px]">विस्तार ▼</span>
          </summary>
          <div class="p-3 pt-0 space-y-2 border-t border-slate-800/60 mt-1 text-[11px]">
            <div class="space-y-1">
              <p class="text-slate-400 font-semibold">रोग के चरण (Stages):</p>
              <p class="text-slate-300">• ${d.stages.s1}</p>
              <p class="text-slate-300">• ${d.stages.s2}</p>
              ${d.stages.s3 ? `<p class="text-slate-300">• ${d.stages.s3}</p>` : ''}
            </div>
            <div class="space-y-1 pt-1 border-t border-slate-800/40">
              <p class="text-emerald-400 font-semibold">📈 सही दवा से सकारात्मक मार्ग (+ve):</p>
              <p class="text-slate-300">${d.trajectories.positive}</p>
              <p class="text-rose-400 font-semibold mt-1">📉 गलत दवा/विलंब पर नकारात्मक मार्ग (-ve):</p>
              <p class="text-slate-300">${d.trajectories.negative}</p>
            </div>
          </div>
        </details>

        <!-- Ethical vs Generic Drugs -->
        <div class="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
          <div class="flex items-center justify-between font-bold text-cyan-400">
            <span>💊 औषधियां (Ethical Brands vs Generic Salts):</span>
            <button onclick="transferToRx('${d.name.replace(/'/g, "\\'")}', '${d.drugs.generic.replace(/'/g, "\\'")}')" class="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold active:scale-95 transition">
              + पर्चे में लोड करें
            </button>
          </div>
          <div class="text-[11px] space-y-1.5 font-mono">
            <p><strong class="text-slate-400">जेनेरिक साल्ट:</strong> ${d.drugs.generic}</p>
            <p><strong class="text-cyan-300">एथिकल ब्रांड्स (MRP):</strong> ${d.drugs.ethical}</p>
            <p class="text-emerald-400/90 font-sans"><strong class="text-emerald-300">दवा का प्रभाव:</strong> ${d.drugs.correctEffect}</p>
            <p class="text-rose-400/90 font-sans"><strong class="text-rose-300">गलत दवा का दुष्परिणाम:</strong> ${d.drugs.hazardWrong}</p>
          </div>
        </div>

        <!-- Separated Doctor vs Farmer Protocol -->
        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div class="bg-blue-950/20 border border-blue-900/30 p-2 rounded-xl space-y-0.5">
            <span class="font-bold text-blue-300">🩺 डॉक्टर प्रोटोकॉल:</span>
            <p class="text-slate-300 leading-tight">${d.protocols.doctor}</p>
          </div>
          <div class="bg-amber-950/20 border border-amber-900/30 p-2 rounded-xl space-y-0.5">
            <span class="font-bold text-amber-300">👨‍🌾 किसान देखभाल:</span>
            <p class="text-slate-300 leading-tight">${d.protocols.farmer}</p>
          </div>
        </div>

        <!-- Pregnancy Alert -->
        <p class="p-2 rounded-lg bg-amber-950/20 border border-amber-900/30 text-amber-200 text-[11px]">
          <strong>🤰 गर्भ सुरक्षा:</strong> ${d.pregnancy}
        </p>

        <!-- Lab Test Footer -->
        <div class="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <span>🔬 लैब: <strong>${d.labTest.name}</strong> (${d.labTest.cost})</span>
          <span class="text-rose-400 font-semibold">खतरा: ${d.redFlags}</span>
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
  const tabs = ['clinical', 'rx', 'records', 'ledger', 'profile'];
  tabs.forEach(t => {
    const sec = document.getElementById(`view${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (sec) sec.classList.add('hidden');
    if (btn) {
      btn.classList.remove('text-cyan-400', 'font-bold');
      btn.classList.add('text-slate-400');
    }
  });

  const activeSec = document.getElementById(`view${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  const activeBtn = document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('text-cyan-400', 'font-bold');
    activeBtn.classList.remove('text-slate-400');
  }

  if (tabName === 'records') renderSavedRecords();
  if (tabName === 'ledger') updateLedgerAnalytics();
}

// ==================== 6. GPS LOCATION & OPD CASE LOGIC ====================
function captureGPSLocation() {
  const btn = document.getElementById('btnGPS');
  if (!navigator.geolocation) {
    alert('आपके ब्राउज़र में GPS सपोर्ट नहीं है।');
    return;
  }
  btn.innerText = '📍 प्राप्त कर रहे हैं...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      document.getElementById('opdGPS').value = `${lat}, ${lon}`;
      btn.innerText = '✅ GPS सुरक्षित';
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
    badge.className = 'text-[11px] font-bold text-emerald-400';
  } else if (paid > 0 && due > 0) {
    badge.innerText = `आंशिक जमा (₹${due} बकाया)`;
    badge.className = 'text-[11px] font-bold text-amber-400';
  } else if (total > 0 && paid === 0) {
    badge.innerText = `पूर्ण उधार (₹${due} बाकी)`;
    badge.className = 'text-[11px] font-bold text-rose-400';
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
`🐾 *पशु चिकित्सा सेवा पर्ची (Pashu Seva Pro)*
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
  const smsText = `PashuSevaPro: FID ${c.fid}. Kisan: ${c.name}, Rog: ${c.diag}, Dawa: ${c.med}, Kul: Rs.${c.totalFee}, Bakaya: Rs.${c.dueFee}. Call doctor for help.`;
  saveLocalCase(c);
  window.open(`sms:${c.phone}?body=${encodeURIComponent(smsText)}`, '_blank');
}

function directPhoneCall() {
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  if (!phone) { alert('पहले किसान का मोबाइल नंबर दर्ज करें!'); return; }
  window.open(`tel:${phone}`, '_self');
}

function handleSaveOfflineCase() {
  const c = generateCaseDataFromForm();
  if (!c) return;
  saveLocalCase(c);
  alert('केस सफलता से सुरक्षित कर लिया गया!');
  navigateToTab('records');
}

function saveLocalCase(item) {
  let records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  records.unshift(item);
  localStorage.setItem('vetcare_opd_cases', JSON.stringify(records));
  updateLedgerAnalytics();
}

// ==================== 7. UNIVERSAL CASE SEARCH & REGISTRY ====================
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
    container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">अभी कोई रिकॉर्ड दर्ज नहीं है।</div>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-[11px]">
        <span class="text-cyan-400 font-bold">${r.fid}</span>
        <span class="text-slate-400">${r.date}</span>
      </div>
      <div class="text-slate-200 flex justify-between">
        <span><strong>${r.name}</strong> (${r.village}) • ${r.phone}</span>
        <a href="tel:${r.phone}" class="text-blue-400 font-bold">📞 कॉल</a>
      </div>
      <div class="text-slate-300">टैग: <strong class="text-cyan-300">${r.tag}</strong> • पशु: ${r.animal} (${r.preg})</div>
      ${r.gps !== 'N/A' ? `<div class="text-[10px] text-slate-400"><a href="https://maps.google.com/?q=${r.gps}" target="_blank" class="text-blue-400 underline">📍 मैप पर घर देखें (${r.gps})</a></div>` : ''}
      <div class="text-amber-300 font-semibold">डायग्नोसिस: ${r.diag}</div>
      <div class="text-slate-300 text-[11px] font-mono bg-slate-950 p-2 rounded-xl border border-slate-800">Rx: ${r.med}</div>
      <div class="flex items-center justify-between pt-1 text-[11px]">
        <span class="text-slate-400">कुल: ₹${r.totalFee} | जमा: ₹${r.paidFee}</span>
        <span class="font-bold ${r.dueFee > 0 ? 'text-rose-400' : 'text-emerald-400'}">
          ${r.dueFee > 0 ? `बकाया: ₹${r.dueFee}` : 'पूर्ण चुकता'}
        </span>
      </div>
    </div>
  `).join('');
}

// ==================== 8. GRANULAR FINANCE & DEBIT/CREDIT KHATA ====================
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

  // Expenses from storage
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

  // Render Khata list
  const dueListContainer = document.getElementById('ledgerDueList');
  if (!dueListContainer) return;

  const dueRecords = records.filter(r => (r.dueFee || 0) > 0);

  if (dueRecords.length === 0) {
    dueListContainer.innerHTML = `<div class="p-6 text-center text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800">बाज़ार में कोई बकाया राशि नहीं है। सभी खाते चुकता हैं।</div>`;
    return;
  }

  dueListContainer.innerHTML = dueRecords.map(r => `
    <div class="bg-slate-900 border border-rose-950/60 rounded-xl p-3 flex items-center justify-between text-xs">
      <div>
        <div class="font-bold text-slate-100">${r.name} (${r.village})</div>
        <div class="text-[11px] text-slate-400">${r.phone} • ${r.diag}</div>
        <div class="text-rose-400 font-bold mt-0.5">बकाया: ₹${r.dueFee} (कुल: ₹${r.totalFee})</div>
      </div>
      <button onclick="sendDueReminder('${r.name}', '${r.phone}', ${r.dueFee}, '${r.fid}')" class="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md active:scale-95 transition">
        💬 तगादा भेजें
      </button>
    </div>
  `).join('');
}

function addClinicExpense() {
  const desc = prompt("खर्च का विवरण (उदा. पेट्रोल, दवाई खरीद, कॉटन):");
  if (!desc) return;
  const amt = parseFloat(prompt("खर्च की राशि (₹):"));
  if (!amt || isNaN(amt)) return;

  let expenses = JSON.parse(localStorage.getItem('vetcare_expenses') || '[]');
  expenses.push({ desc, amount: amt, date: new Date().toLocaleDateString('hi-IN') });
  localStorage.setItem('vetcare_expenses', JSON.stringify(expenses));
  alert('खर्च सफलता से दर्ज हुआ!');
  updateLedgerAnalytics();
}

function sendDueReminder(name, phone, dueFee, fid) {
  const msg = 
`नमस्कार ${name} जी, 
पशु चिकित्सा सेवा पर्ची (*${fid}*) का आपका ₹${dueFee} का उपचार शुल्क बकाया है। 
कृपया सुविधानुसार यह बकाया राशि PhonePe/GPay या नकद द्वारा चुकता करने का कष्ट करें। 
_पशु सेवा क्लिनिकल एकाउंट्स_`;

  const cleanPhone = phone.replace(/\D/g, '');
  window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==================== 9. SUBSCRIPTION & TRIAL COUNTDOWN ====================
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
        badge.className = 'text-[10px] text-amber-400 font-mono font-bold';
      }
    }
  }, 1000);
}

function openSubscriptionModal() {
  const m = document.getElementById('modalSubscription');
  if (m) m.classList.remove('hidden');
}

function closeSubscriptionModal() {
  const m = document.getElementById('modalSubscription');
  if (m) m.classList.add('hidden');
}

function openLoginModal() {
  const m = document.getElementById('modalLogin');
  if (m) m.classList.remove('hidden');
}

function closeLoginModal() {
  const m = document.getElementById('modalLogin');
  if (m) m.classList.add('hidden');
}
