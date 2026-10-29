// Global State
let currentDiagnosisMode = 'SYMPTOMS'; // 'SYMPTOMS', 'HYBRID', 'DISEASE_NAME'
let activeMatrixParams = {
  temp: null,
  eyes: null,
  urine: null,
  dung: null,
  cardinalSign: null
};
let currentHybridTempFilter = 'ALL';
let currentEtiologyFilter = 'ALL';

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  applyMatrixFilters();
  renderSavedRecords();
  initPWA();
});

// PWA Service Worker
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('PWA Service Worker Active'))
      .catch((err) => console.error('SW Error:', err));
  }
}

// ==================== 3 DIAGNOSIS MODES SWITCHER ====================
function setDiagnosisMode(mode) {
  currentDiagnosisMode = mode;
  ['Symptoms', 'Hybrid', 'Name'].forEach(m => {
    document.getElementById(`btnMode${m}`).className = 'py-2 px-1 rounded-xl text-slate-400 font-medium transition text-center flex flex-col items-center gap-0.5';
    document.getElementById(`panelMode${m}`).classList.add('hidden');
  });

  if (mode === 'SYMPTOMS') {
    document.getElementById('btnModeSymptoms').className = 'mode-tab-active py-2 px-1 rounded-xl font-semibold transition text-center flex flex-col items-center gap-0.5';
    document.getElementById('panelModeSymptoms').classList.remove('hidden');
    applyMatrixFilters();
  } else if (mode === 'HYBRID') {
    document.getElementById('btnModeHybrid').className = 'mode-tab-active py-2 px-1 rounded-xl font-semibold transition text-center flex flex-col items-center gap-0.5';
    document.getElementById('panelModeHybrid').classList.remove('hidden');
    handleOmniSearch();
  } else if (mode === 'DISEASE_NAME') {
    document.getElementById('btnModeName').className = 'mode-tab-active py-2 px-1 rounded-xl font-semibold transition text-center flex flex-col items-center gap-0.5';
    document.getElementById('panelModeName').classList.remove('hidden');
    filterByEtiology(currentEtiologyFilter);
  }
}

// ==================== MODE 1: SYMPTOM MATRIX ENGINE ====================
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
  document.getElementById('selCardinalSign').value = 'ALL';
  applyMatrixFilters();
}

function applyMatrixFilters() {
  const selectedCardinal = document.getElementById('selCardinalSign') ? document.getElementById('selCardinalSign').value : 'ALL';
  activeMatrixParams.cardinalSign = selectedCardinal !== 'ALL' ? selectedCardinal : null;

  // Active traits count
  const activeKeys = Object.keys(activeMatrixParams).filter(k => activeMatrixParams[k] !== null);

  if (activeKeys.length === 0) {
    document.getElementById('matchScoreText').innerText = 'लक्षण चुनें ➔ सर्वाधिक संभावित रोग स्वतः ऊपर आएंगे';
    document.getElementById('matchCountBadge').innerText = `${CLINICAL_DATABASE.length} रोग`;
    renderDiseaseList(CLINICAL_DATABASE, false);
    return;
  }

  // Score each disease based on matched traits
  const scoredList = CLINICAL_DATABASE.map(d => {
    let score = 0;
    activeKeys.forEach(k => {
      if (k === 'cardinalSign') {
        if (d.traits.cardinalSign === activeMatrixParams[k]) score += 3; // Cardinal sign gets highest weight
      } else if (d.traits[k] === activeMatrixParams[k]) {
        score += 1;
      }
    });
    return { ...d, matchScore: score };
  });

  // Filter only those with at least 1 match, sorted descending
  const matchedList = scoredList.filter(d => d.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);

  document.getElementById('matchScoreText').innerText = `🎯 ${activeKeys.length} लक्षण सक्रिय: ${matchedList.length} संभावित रोग पाए गए`;
  document.getElementById('matchCountBadge').innerText = `${matchedList.length} मैच`;

  renderDiseaseList(matchedList, true);
}

// ==================== MODE 2: HYBRID SEARCH ====================
function handleOmniSearch() {
  const q = document.getElementById('omniSearch').value.toLowerCase().trim();
  document.getElementById('clearSearchBtn').classList.toggle('hidden', q.length === 0);

  const filtered = CLINICAL_DATABASE.filter(d => {
    const matchesQ = !q ||
      d.name.toLowerCase().includes(q) ||
      d.cardinal.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.rx.toLowerCase().includes(q) ||
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

// ==================== MODE 3: DISEASE DIRECTORY BY NAME/ETIOLOGY ====================
function filterByEtiology(etio, btn) {
  currentEtiologyFilter = etio;
  if (btn) {
    document.querySelectorAll('.etio-chip').forEach(c => c.classList.remove('chip-active'));
    btn.classList.add('chip-active');
  }
  const filtered = etio === 'ALL' ? CLINICAL_DATABASE : CLINICAL_DATABASE.filter(d => d.etiologyType === etio);
  renderDiseaseList(filtered, false);
}

// ==================== RENDER DISEASE CARDS ====================
function renderDiseaseList(list, showMatchBadge) {
  const container = document.getElementById('diseaseContainer');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 bg-slate-800/60 rounded-2xl border border-slate-700">
        <div class="text-2xl mb-1">🔍</div>
        <p class="font-semibold text-slate-300">कोई बीमारी या लक्षण मेल नहीं खाया</p>
        <p class="text-xs text-slate-400 mt-1">कृपया लक्षण बदलें या फ़िल्टर रीसेट करें।</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const badgeStyle = d.category === 'HIGH' 
      ? 'bg-rose-950 text-rose-300 border-rose-800' 
      : d.category === 'SUB' 
      ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
      : 'bg-slate-700 text-slate-300 border-slate-600';

    return `
      <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-md space-y-3 transition hover:border-emerald-600/60">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="text-sm font-bold text-emerald-300 leading-snug">${d.id}. ${d.name}</h3>
            <span class="text-[10px] text-slate-400 font-mono">मूल कारण: ${d.etiologyName}</span>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border ${badgeStyle} shrink-0">${d.temp}</span>
            ${showMatchBadge && d.matchScore ? `<span class="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">★ ${d.matchScore} लक्षण मैच</span>` : ''}
          </div>
        </div>

        <div class="bg-rose-950/30 border border-rose-900/40 rounded-xl p-2.5 text-xs">
          <span class="font-bold text-rose-300 flex items-center gap-1 mb-0.5">🚨 प्रमुख व विशिष्ट लक्षण (Cardinal Sign):</span>
          <p class="text-slate-200 leading-relaxed">${d.cardinal}</p>
        </div>

        <div class="text-xs text-slate-300 space-y-1">
          <p><strong class="text-slate-400">अन्य लक्षण:</strong> ${d.symptoms}</p>
          <p><strong class="text-amber-400">गर्भ सुरक्षा:</strong> ${d.pregnancy}</p>
        </div>

        <div class="bg-slate-900 rounded-xl p-3 border border-slate-700/60 space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>💊 मानक क्लिनिकल उपचार (Rx):</span>
            <button onclick="transferToRx('${d.name.replace(/'/g, "\\'")}', '${d.rx.replace(/'/g, "\\'")}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] active:scale-95 transition">
              + पर्चे में जोड़ें
            </button>
          </div>
          <p class="text-[11px] font-mono text-slate-300 leading-relaxed">${d.rx}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Transfer Disease into Prescription OPD
function transferToRx(diseaseName, rxTreatment) {
  document.getElementById('opdDiagnosis').value = diseaseName;
  document.getElementById('opdMedicine').value = rxTreatment;
  navigateToTab('rx');
}

// Tab Navigation
function navigateToTab(tabName) {
  const tabs = ['clinical', 'rx', 'records', 'profile'];
  tabs.forEach(t => {
    const sec = document.getElementById(`view${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (sec) sec.classList.add('hidden');
    if (btn) {
      btn.classList.remove('text-emerald-400', 'font-bold');
      btn.classList.add('text-slate-400');
    }
  });

  const activeSec = document.getElementById(`view${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  const activeBtn = document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('text-emerald-400', 'font-bold');
    activeBtn.classList.remove('text-slate-400');
  }

  if (tabName === 'records') renderSavedRecords();
}

// 1-Click WhatsApp Slip Dispatch
function dispatchWhatsAppRx() {
  const name = document.getElementById('opdFarmerName').value.trim();
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  const village = document.getElementById('opdVillage').value.trim() || 'स्थानीय';
  const animal = document.getElementById('opdAnimal').value;
  const tag = document.getElementById('opdTag').value.trim() || 'N/A';
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const med = document.getElementById('opdMedicine').value.trim();
  const advice = document.getElementById('opdAdvice').value.trim() || 'नियमित देखभाल व साफ़ पानी दें।';

  if (!name || !phone || !diag || !med) {
    alert('कृपया किसान का नाम, मोबाइल नंबर, डायग्नोसिस और दवा विवरण अवश्य भरें!');
    return;
  }

  const fid = 'FID-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('hi-IN');

  const slipMessage = 
`🐾 *पशु चिकित्सा सेवा पर्ची (Pashu Seva Pro)*
━━━━━━━━━━━━━━━━━━━━
🆔 *FID संख्या:* ${fid}
📅 *दिनांक:* ${dateStr}
👤 *किसान का नाम:* ${name} (${village})
📱 *मोबाइल:* ${phone}
🐄 *पशु:* ${animal} (टैग: ${tag})
━━━━━━━━━━━━━━━━━━━━
🩺 *पहचाना गया रोग (Diagnosis):*
${diag}

💊 *उपचार व दवा निर्देश (Rx):*
${med}

💡 *पशुपालक को सलाह:*
${advice}
━━━━━━━━━━━━━━━━━━━━
⚠️ *वैधानिक चेतावनी:* दवा की खुराक किसी पंजीकृत पशु चिकित्सक/पैरावेट के प्रत्यक्ष परामर्श अनुसार ही दें।
_डिजिटल पशु चिकित्सा क्लिनिकल सेवा_`;

  saveLocalCase({ fid, date: dateStr, name, phone, village, animal, tag, diag, med, advice });

  const cleanPhone = phone.replace(/\D/g, '');
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(slipMessage)}`;
  window.open(waUrl, '_blank');
}

// Local Case Storage
function saveLocalCase(item) {
  let records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  records.unshift(item);
  localStorage.setItem('vetcare_opd_cases', JSON.stringify(records));
}

function handleSaveOfflineCase() {
  const name = document.getElementById('opdFarmerName').value.trim();
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const med = document.getElementById('opdMedicine').value.trim();

  if (!name || !phone || !diag) {
    alert('कृपया कम से कम किसान का नाम, मोबाइल नंबर व रोग दर्ज करें!');
    return;
  }

  const item = {
    fid: 'FID-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('hi-IN'),
    name,
    phone,
    village: document.getElementById('opdVillage').value.trim() || 'स्थानीय',
    animal: document.getElementById('opdAnimal').value,
    tag: document.getElementById('opdTag').value.trim() || 'N/A',
    diag,
    med,
    advice: document.getElementById('opdAdvice').value.trim() || 'सामान्य देखभाल'
  };

  saveLocalCase(item);
  alert('केस सफलतापूर्वक सुरक्षित कर लिया गया!');
  navigateToTab('records');
}

function renderSavedRecords() {
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  const countBadge = document.getElementById('recordTotalBadge');
  if (countBadge) countBadge.innerText = `${records.length} केस सुरक्षित`;

  const container = document.getElementById('recordsList');
  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-slate-800/60 rounded-2xl border border-slate-700">अभी कोई ओपीडी केस दर्ज नहीं है।</div>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3.5 space-y-2 text-xs">
      <div class="flex items-center justify-between border-b border-slate-700 pb-1.5 font-mono text-[11px]">
        <span class="text-emerald-400 font-bold">${r.fid}</span>
        <span class="text-slate-400">${r.date}</span>
      </div>
      <div class="text-slate-200">
        <strong>${r.name}</strong> (${r.village}) • <span class="text-slate-300">${r.phone}</span>
      </div>
      <div class="text-slate-300">पशु: ${r.animal} ${r.tag !== 'N/A' ? `(टैग: ${r.tag})` : ''}</div>
      <div class="text-amber-300"><strong>डायग्नोसिस:</strong> ${r.diag}</div>
      <div class="text-slate-300 text-[11px] font-mono bg-slate-900 p-2 rounded-lg border border-slate-700/50">Rx: ${r.med}</div>
    </div>
  `).join('');
}
