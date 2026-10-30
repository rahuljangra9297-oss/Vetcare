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
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      console.warn('Firestore Persistence Note:', err.code);
    });
  }
} catch (err) {
  console.error('Firebase Init Error:', err);
}

// ==================== GLOBAL APP STATE ====================
let userRole = localStorage.getItem('vetcare_active_role') || null;
let currentDiagnosisMode = 'SYMPTOMS';
let currentTagFilter = 'ALL';
let activeMatrixParams = { temp: null, cardinalSign: null };
const TRAIT_WEIGHTS = { cardinalSign: 40, temp: 20 };

window.addEventListener('DOMContentLoaded', () => {
  if (userRole) {
    showMainApp();
  } else {
    showGateway();
  }
  initBreedingModule();
  initCloudRealtimeSync();
  initPWA();
});

function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW:', err));
  }
}

// ==================== REALTIME CLOUD SYNC ====================
function initCloudRealtimeSync() {
  if (!db) return;
  const statusBadge = document.getElementById('cloudSyncStatusBadge');

  db.collection('opd_cases').onSnapshot((snapshot) => {
    let cloudCases = [];
    snapshot.forEach((doc) => cloudCases.push(doc.data()));

    if (cloudCases.length > 0) {
      let localRecords = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
      const map = new Map();
      localRecords.forEach(item => map.set(item.fid, item));
      cloudCases.forEach(item => map.set(item.fid, item));
      
      const merged = Array.from(map.values()).sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
      localStorage.setItem('vetcare_opd_cases', JSON.stringify(merged));
      renderRecordsArray(merged);
      updateFinanceAnalytics();
    }
    if (statusBadge) {
      statusBadge.innerText = '☁️ LIVE SYNC';
      statusBadge.className = 'text-[9px] bg-emerald-50 text-emerald-700 font-mono font-bold px-1.5 py-0.2 rounded border border-emerald-300';
    }
  }, (err) => {
    console.warn('Offline sync mode active');
    if (statusBadge) {
      statusBadge.innerText = '⚡ OFFLINE';
      statusBadge.className = 'text-[9px] bg-slate-100 text-slate-600 font-mono font-medium px-1.5 py-0.2 rounded border border-slate-200';
    }
  });

  db.collection('expenses').onSnapshot((snapshot) => {
    let cloudExpenses = [];
    snapshot.forEach(doc => cloudExpenses.push(doc.data()));
    if (cloudExpenses.length > 0) {
      localStorage.setItem('vetcare_expenses', JSON.stringify(cloudExpenses));
      updateFinanceAnalytics();
    }
  });
}

function syncCaseToCloud(item) {
  if (!db) return;
  db.collection('opd_cases').doc(item.fid).set(item).catch(err => console.warn('Offline queued:', err));
}

function syncExpenseToCloud(expItem) {
  if (!db) return;
  db.collection('expenses').doc('EXP-' + Date.now()).set(expItem).catch(err => console.warn('Offline queued:', err));
}

// ==================== GATEWAY & ROLE CONTROL ====================
function showGateway() {
  document.getElementById('screenGateway').classList.remove('hidden');
  document.getElementById('screenMainApp').classList.add('hidden');
}

function showMainApp() {
  document.getElementById('screenGateway').classList.add('hidden');
  document.getElementById('screenMainApp').classList.remove('hidden');
  applyRoleUI();
  setDiagnosisMode('SYMPTOMS');
  updateFinanceAnalytics();
}

function selectRole(role) {
  userRole = role;
  localStorage.setItem('vetcare_active_role', role);
  showMainApp();
}

function returnToGateway() {
  if (confirm('क्या आप प्रवेश द्वार पर लौटकर अपना रोल बदलना चाहते हैं?')) {
    localStorage.removeItem('vetcare_active_role');
    userRole = null;
    showGateway();
  }
}

function openDoctorDeclarationModal() {
  const modal = document.getElementById('modalDoctorDeclaration');
  if (modal) modal.style.display = 'flex';
}

function closeDoctorDeclarationModal() {
  const modal = document.getElementById('modalDoctorDeclaration');
  if (modal) modal.style.display = 'none';
}

function acceptDoctorDeclaration() {
  closeDoctorDeclarationModal();
  selectRole('DOCTOR');
}

// ==================== UI ROLE ADAPTATION ====================
function applyRoleUI() {
  const badge = document.getElementById('currentUserRoleBadge');
  const navRx = document.getElementById('navRx');
  const navRecords = document.getElementById('navRecords');
  const navAI = document.getElementById('navAI');
  const navBreeding = document.getElementById('navBreeding');
  const navFeed = document.getElementById('navFeed');
  const navFinanceLabel = document.getElementById('navFinanceLabel');
  const finTitle = document.getElementById('financeTitle');
  const finCreditLabel = document.getElementById('finCreditLabel');
  const finDebitLabel = document.getElementById('finDebitLabel');

  if (userRole === 'DOCTOR') {
    badge.innerText = '🩺 अधिकृत पशु चिकित्सक (Doctor)';
    badge.className = 'text-[10px] sm:text-xs text-blue-600 font-bold';
    if (navRx) navRx.classList.remove('hidden');
    if (navRecords) navRecords.classList.remove('hidden');
    if (navAI) navAI.classList.remove('hidden');
    if (navBreeding) navBreeding.classList.add('hidden');
    if (navFeed) navFeed.classList.add('hidden');
    if (navFinanceLabel) navFinanceLabel.innerText = 'क्लिनिक खाता';
    if (finTitle) finTitle.innerText = '📊 क्लिनिकल ओपीडी खाता बही';
    if (finCreditLabel) finCreditLabel.innerText = 'कुल क्लिनिक आय';
    if (finDebitLabel) finDebitLabel.innerText = 'क्लिनिक खर्च';
  } else {
    badge.innerText = '👨‍🌾 स्मार्ट पशुपालक (Farmer)';
    badge.className = 'text-[10px] sm:text-xs text-emerald-600 font-bold';
    if (navRx) navRx.classList.add('hidden');
    if (navRecords) navRecords.classList.add('hidden');
    if (navAI) navAI.classList.add('hidden');
    if (navBreeding) navBreeding.classList.remove('hidden');
    if (navFeed) navFeed.classList.remove('hidden');
    if (navFinanceLabel) navFinanceLabel.innerText = 'डेयरी खाता';
    if (finTitle) finTitle.innerText = '🥛 डेयरी दूध व पशु खर्च खाता';
    if (finCreditLabel) finCreditLabel.innerText = 'दूध बिक्री आय';
    if (finDebitLabel) finDebitLabel.innerText = 'चारा व दाना खर्च';
  }
}

// ==================== 3-WAY DIAGNOSIS ENGINE ====================
function setDiagnosisMode(mode) {
  currentDiagnosisMode = mode;
  ['Matrix', 'Hybrid', 'Directory'].forEach(p => {
    document.getElementById(`panelDiag${p}`).classList.add('hidden');
  });
  ['1', '2', '3'].forEach(b => {
    document.getElementById(`btnDiagMode${b}`).className = 'py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center';
  });

  if (mode === 'SYMPTOMS') {
    document.getElementById('panelDiagMatrix').classList.remove('hidden');
    document.getElementById('btnDiagMode1').className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
    applyMatrixFilters();
  } else if (mode === 'HYBRID') {
    document.getElementById('panelDiagHybrid').classList.remove('hidden');
    document.getElementById('btnDiagMode2').className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
    handleAppSearch();
  } else if (mode === 'DIRECTORY') {
    document.getElementById('panelDiagDirectory').classList.remove('hidden');
    document.getElementById('btnDiagMode3').className = 'py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center';
    filterByTag(currentTagFilter);
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
  activeMatrixParams = { temp: null, cardinalSign: null };
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
    document.getElementById('matchScoreText').innerText = 'लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी';
    document.getElementById('matchCountBadge').innerText = `${CLINICAL_DATABASE.length} रोग`;
    renderDiseaseCards(CLINICAL_DATABASE, false);
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

  document.getElementById('matchScoreText').innerText = `🎯 ${activeKeys.length} लक्षण सक्रिय: सर्वाधिक संभावित रोग शीर्ष पर`;
  document.getElementById('matchCountBadge').innerText = `${matchedList.length} संभावित`;

  renderDiseaseCards(matchedList, true);
}

function handleAppSearch() {
  const q = (document.getElementById('unifiedSearchInput')?.value || '').toLowerCase().trim();
  const results = CLINICAL_DATABASE.filter(d => {
    return !q || 
      d.name.toLowerCase().includes(q) || 
      d.localName.toLowerCase().includes(q) || 
      d.cardinal.toLowerCase().includes(q);
  });
  renderDiseaseCards(results, false);
}

function filterByTag(tag, btn) {
  currentTagFilter = tag;
  if (btn) {
    document.querySelectorAll('.q-chip').forEach(c => c.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0');
    btn.className = 'q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 shadow-xs';
  }
  const filtered = tag === 'ALL' ? CLINICAL_DATABASE : CLINICAL_DATABASE.filter(d => d.etiologyType === tag);
  renderDiseaseCards(filtered, false);
}

// ==================== RENDER DISEASE CARDS (DOCTOR VS FARMER) ====================
function renderDiseaseCards(list, showPercentage) {
  const container = document.getElementById('diseaseSearchResults');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
        🔍 कोई बीमारी या लक्षण नहीं मिला।
      </div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const isHigh = d.probability >= 80;
    const badgeColor = isHigh ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200';

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5 transition">
        
        <div class="flex justify-between items-start border-b border-slate-100 pb-2.5">
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900">${d.id}. ${d.name}</h3>
            <p class="text-xs text-blue-600 font-semibold">देसी नाम: ${d.localName}</p>
            <p class="text-[10px] text-slate-400 font-mono">${d.etiologyName}</p>
          </div>
          <div class="flex flex-col items-end gap-1 shrink-0">
            <span class="text-[10px] sm:text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">${d.temp}</span>
            ${showPercentage ? `<span class="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-xl border ${badgeColor}">★ ${d.probability}% मैच</span>` : ''}
          </div>
        </div>

        <div class="bg-rose-50/80 border border-rose-200 rounded-2xl p-3 text-xs sm:text-sm text-rose-950">
          <strong class="text-rose-700 block mb-0.5">🚨 प्रमुख मुख्य लक्षण (Cardinal Sign):</strong>
          ${d.cardinal}
        </div>

        <div class="bg-blue-50/60 border border-blue-200 rounded-2xl p-2.5 text-xs">
          <strong class="text-blue-800 block mb-0.5">🔍 मौके पर पुष्टिकरण संकेत:</strong>
          <p class="text-slate-700 text-[11px]">${d.onSiteConfirm}</p>
        </div>

        <details class="bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <summary class="p-3 font-bold text-slate-800 cursor-pointer flex justify-between items-center select-none">
            <span>⏱️ रोग की अवस्थाएं व प्रोग्नोसिस टाइमलाइन</span>
            <span class="text-blue-600 text-[10px]">विस्तार ▼</span>
          </summary>
          <div class="p-3 pt-0 space-y-2 border-t border-slate-200/60 mt-1 text-[11px]">
            <p><strong class="text-slate-700">चरण:</strong> ${d.stages.s1} ➔ ${d.stages.s2} ➔ ${d.stages.s3}</p>
            <p class="text-emerald-700"><strong>📈 सकारात्मक मार्ग (+ve):</strong> ${d.trajectories.positive}</p>
            <p class="text-rose-700"><strong>📉 नकारात्मक मार्ग (-ve):</strong> ${d.trajectories.negative}</p>
          </div>
        </details>

        <!-- DOCTOR INJECTIONS TABLE vs FARMER SHIELD -->
        ${userRole === 'DOCTOR' ? `
          <div class="space-y-2 pt-1">
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-bold text-blue-900 flex items-center gap-1">💉 एलोपैथिक इंजेक्शन तालिका:</span>
              <button onclick="loadToRx('${d.name}')" class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl font-bold shadow-xs active:scale-95 transition">+ पर्चे में लें</button>
            </div>
            
            <div class="overflow-x-auto border border-slate-200 rounded-2xl">
              <table class="w-full text-left text-[11px] sm:text-xs text-slate-700 divide-y divide-slate-200">
                <thead class="bg-slate-50 text-slate-900 font-bold">
                  <tr>
                    <th class="p-2.5">वर्ग</th>
                    <th class="p-2.5">जेनेरिक साल्ट</th>
                    <th class="p-2.5">एथिकल ब्रांड (MRP)</th>
                    <th class="p-2.5">डोज़ व रूट</th>
                    <th class="p-2.5">गर्भ सुरक्षा</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${d.injections.map(inj => `
                    <tr>
                      <td class="p-2.5 font-semibold text-slate-900">${inj.category}</td>
                      <td class="p-2.5 font-mono text-slate-600">${inj.generic}</td>
                      <td class="p-2.5 text-blue-700 font-semibold">${inj.ethical}</td>
                      <td class="p-2.5 font-mono">${inj.dose} (${inj.route})</td>
                      <td class="p-2.5 font-bold">${inj.pregSafe}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs sm:text-sm text-emerald-950 flex items-center gap-3">
            <span class="text-2xl">🛡️</span>
            <div>
              <strong>किसान सुरक्षा नियम:</strong>
              <p class="text-xs text-emerald-800 leading-tight mt-0.5">एंटीबायोटिक इंजेक्शन केवल अधिकृत पशु चिकित्सक से ही लगवाएं। नीचे दिए गए काढ़े, ओरल टॉनिक व घरेलू उपचार सुरक्षित हैं।</p>
            </div>
          </div>
        `}

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1.5 text-xs sm:text-sm">
          <strong class="text-slate-800 block text-xs">🍼 ओरल सप्लीमेंट्स व टॉनिक:</strong>
          ${d.oralSupplements.map(sup => `
            <div class="border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
              <span class="font-bold text-blue-700">• ${sup.name}:</span> ${sup.formulation} (${sup.dose})
              <p class="text-[11px] text-slate-500">${sup.note}</p>
            </div>
          `).join('')}
        </div>

        <div class="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3 space-y-1 text-xs sm:text-sm">
          <strong class="text-emerald-900 block text-xs">🌿 होम्योपैथिक औषधियां:</strong>
          ${d.homeopathy.map(hom => `
            <div class="text-emerald-950">
              <strong>• ${hom.drug}</strong>: ${hom.dose} <span class="text-slate-500 text-xs">(${hom.indication})</span>
            </div>
          `).join('')}
        </div>

        <div class="bg-amber-50/50 border border-amber-200 rounded-2xl p-3 space-y-1 text-xs sm:text-sm">
          <strong class="text-amber-900 block text-xs">🥣 सिद्ध देहाती घरेलू नुस्खे:</strong>
          ${d.homeRemedies.map(rem => `
            <div class="text-amber-950">
              <strong>• ${rem.remedy}</strong>: ${rem.method}
            </div>
          `).join('')}
        </div>

        <div class="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex justify-between items-center">
          <span>🔬 लैब टेस्ट: <strong>${d.labTest.name}</strong> (${d.labTest.cost})</span>
          <span class="text-rose-600 font-semibold">खतरा: ${d.redFlags}</span>
        </div>

      </div>
    `;
  }).join('');
}

function loadToRx(name) {
  document.getElementById('opdDiagnosis').value = name;
  const disease = CLINICAL_DATABASE.find(d => d.name === name);
  if (disease && disease.injections.length > 0) {
    const rxText = disease.injections.map(i => `${i.generic} (${i.dose}) - ${i.route}`).join('\n');
    document.getElementById('opdMedicine').value = rxText;
  }
  switchTab('rx');
}

// ==================== BREEDING & FEED ====================
function initBreedingModule() {
  const heatDiv = document.getElementById('heatSignsContainer');
  const disDiv = document.getElementById('dischargeContainer');
  const repList = document.getElementById('repeatBreederList');

  if (heatDiv && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    heatDiv.innerHTML = BREEDING_GUIDE_DATA.heatSigns.map(h => `
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
        <strong class="text-rose-600">${h.stage}</strong>
        <p class="text-slate-700 text-xs">${h.signs}</p>
        <span class="text-xs font-bold text-blue-700">${h.action}</span>
      </div>
    `).join('');
  }

  if (disDiv && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    disDiv.innerHTML = BREEDING_GUIDE_DATA.dischargeTypes.map(d => `
      <div class="p-3 rounded-xl border ${d.safe ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}">
        <strong>${d.type}</strong>
        <p class="text-xs mt-0.5">${d.meaning}</p>
      </div>
    `).join('');
  }

  if (repList && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    repList.innerHTML = BREEDING_GUIDE_DATA.repeatBreederSolutions.map(s => `<li>• ${s}</li>`).join('');
  }
}

function calculateDailyRation() {
  const wt = parseFloat(document.getElementById('feedWeight').value) || 400;
  const milk = parseFloat(document.getElementById('feedMilk').value) || 0;

  const dm = (wt * 2.5) / 100;
  const conc = (1.5 + (milk * 0.4)).toFixed(1);
  const green = (wt * 0.04).toFixed(1);
  const dry = (dm * 0.5).toFixed(1);

  document.getElementById('resFeedGrain').innerText = `${conc} kg`;
  document.getElementById('resFeedGreen').innerText = `${green} kg`;
  document.getElementById('resFeedDry').innerText = `${dry} kg`;
  document.getElementById('rationResultCard').classList.remove('hidden');
}

// ==================== NAVIGATION ====================
function switchTab(tabId) {
  ['diagnosis', 'rx', 'records', 'ai', 'breeding', 'feed', 'finance'].forEach(t => {
    const sec = document.getElementById(`view${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const btn = document.getElementById(`nav${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (sec) sec.classList.add('hidden');
    if (btn) {
      btn.classList.remove('active-nav-tab');
      btn.classList.add('text-slate-400');
    }
  });

  const activeSec = document.getElementById(`view${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  const activeBtn = document.getElementById(`nav${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('active-nav-tab');
    activeBtn.classList.remove('text-slate-400');
  }

  if (tabId === 'records') renderSavedRecords();
  if (tabId === 'finance') updateFinanceAnalytics();
}

// ==================== OPD CASE LOGIC & DISPATCH ====================
function captureGPSLocation() {
  const btn = document.getElementById('btnGPS');
  if (!navigator.geolocation) {
    alert('GPS समर्थित नहीं है।');
    return;
  }
  btn.innerText = '📍 प्राप्त हो रहा...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById('opdGPS').value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
      btn.innerText = '✅ प्राप्त';
    },
    () => {
      alert('GPS अनुमति अस्वीकृत हुई।');
      btn.innerText = '📍 GPS';
    }
  );
}

function calculateDue() {
  const tot = parseFloat(document.getElementById('opdTotalFee').value) || 0;
  const paid = parseFloat(document.getElementById('opdPaidFee').value) || 0;
  document.getElementById('opdDueFee').value = Math.max(0, tot - paid);
}

function generateCaseDataFromForm() {
  const name = document.getElementById('opdFarmerName').value.trim();
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  const village = document.getElementById('opdVillage').value.trim() || 'स्थानीय';
  const gps = document.getElementById('opdGPS').value.trim() || 'N/A';
  const animal = document.getElementById('opdAnimal').value;
  const tag = document.getElementById('opdTag').value.trim() || 'AID-' + Math.floor(1000 + Math.random() * 9000);
  const preg = document.getElementById('opdPregnancy').value;
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const med = document.getElementById('opdMedicine').value.trim();
  const totalFee = parseFloat(document.getElementById('opdTotalFee').value) || 0;
  const paidFee = parseFloat(document.getElementById('opdPaidFee').value) || 0;
  const dueFee = Math.max(0, totalFee - paidFee);

  if (!name || !phone || !diag) {
    alert('कृपया किसान का नाम, मोबाइल नंबर और बीमारी अवश्य भरें!');
    return null;
  }

  const fid = 'FID-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('hi-IN');
  const timestamp = new Date().toISOString();

  return { fid, date: dateStr, timestamp, name, phone, village, gps, animal, tag, preg, diag, med, totalFee, paidFee, dueFee };
}

function dispatchWhatsAppRx() {
  const c = generateCaseDataFromForm();
  if (!c) return;

  const slip = 
`🐾 *Vetcare पशु चिकित्सा पर्ची*
━━━━━━━━━━━━━━━━━━━━
🆔 *FID:* ${c.fid} | *टैग:* ${c.tag}
📅 *दिनांक:* ${c.date}
👤 *किसान:* ${c.name} (${c.village}) | 📱 ${c.phone}
🐄 *पशु:* ${c.animal} (${c.preg})
━━━━━━━━━━━━━━━━━━━━
🩺 *संभावित रोग (Diagnosis):*
${c.diag}

💊 *उपचार व दवाइयां (Rx):*
${c.med}
━━━━━━━━━━━━━━━━━━━━
💰 *शुल्क विवरण:*
• कुल: ₹${c.totalFee} | जमा: ₹${c.paidFee}
• बकाया: ₹${c.dueFee} ${c.dueFee > 0 ? '(⚠️ शीघ्र चुकता करें)' : '(✅ पूर्ण चुकता)'}
━━━━━━━━━━━━━━━━━━━━
_डिजिटल पशु चिकित्सा क्लिनिकल ओपीडी_`;

  saveLocalCase(c);
  window.open(`https://wa.me/91${c.phone.replace(/\D/g, '')}?text=${encodeURIComponent(slip)}`, '_blank');
}

function saveOfflineCaseDirectly() {
  const c = generateCaseDataFromForm();
  if (!c) return;
  saveLocalCase(c);
  alert('केस सफलता से सुरक्षित हुआ!');
  switchTab('records');
}

function saveLocalCase(item) {
  let records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  records.unshift(item);
  localStorage.setItem('vetcare_opd_cases', JSON.stringify(records));
  syncCaseToCloud(item);
  updateFinanceAnalytics();
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
      <div><strong>पहचाना गया रोग:</strong> ${c.diag}</div>
      <div style="margin-top: 4px;"><strong>उपचार व दवाइयां (Rx):</strong></div>
      <pre style="font-family: monospace; background: #f8fafc; padding: 6px; border-radius: 4px; margin-top: 4px;">${c.med}</pre>
    </div>
    <div style="font-size: 12px; border-top: 1px dashed #cbd5e1; padding-top: 8px; display: flex; justify-content: space-between;">
      <span>कुल: ₹${c.totalFee}</span>
      <span>जमा: ₹${c.paidFee}</span>
      <span style="font-weight: bold; color: ${c.dueFee > 0 ? '#b91c1c' : '#15803d'}">बकाया: ₹${c.dueFee}</span>
    </div>
  `;
  window.print();
}

// ==================== RECORDS REGISTRY ====================
function handleRecordSearch() {
  const q = document.getElementById('searchRecordsInput').value.toLowerCase().trim();
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  const filtered = records.filter(r => 
    r.name.toLowerCase().includes(q) ||
    r.phone.includes(q) ||
    r.fid.toLowerCase().includes(q)
  );
  renderRecordsArray(filtered);
}

function renderSavedRecords() {
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  renderRecordsArray(records);
}

function renderRecordsArray(records) {
  const badge = document.getElementById('recordTotalBadge');
  if (badge) badge.innerText = `${records.length} केस सुरक्षित`;

  const container = document.getElementById('recordsList');
  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">कोई केस रिकॉर्ड दर्ज नहीं है।</div>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="bg-white border border-slate-200 rounded-3xl p-4 space-y-2 text-xs shadow-xs">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2 font-mono text-[11px]">
        <span class="text-blue-700 font-bold">${r.fid}</span>
        <span class="text-slate-400">${r.date}</span>
      </div>
      <div class="text-slate-800 flex justify-between items-center">
        <span><strong>${r.name}</strong> (${r.village}) • ${r.phone}</span>
        <a href="tel:${r.phone}" class="text-blue-600 font-bold">📞 कॉल</a>
      </div>
      <div class="text-slate-600">पशु: ${r.animal} (${r.preg}) • टैग: ${r.tag}</div>
      <div class="text-amber-700 font-semibold">रोग: ${r.diag}</div>
      <div class="text-slate-700 text-[11px] font-mono bg-slate-50 p-2 rounded-xl border border-slate-200">${r.med}</div>
      <div class="flex items-center justify-between pt-1 text-[11px]">
        <span class="text-slate-500">कुल: ₹${r.totalFee} | जमा: ₹${r.paidFee}</span>
        <span class="font-bold ${r.dueFee > 0 ? 'text-rose-600' : 'text-emerald-600'}">
          ${r.dueFee > 0 ? `बकाया: ₹${r.dueFee}` : 'पूर्ण चुकता'}
        </span>
      </div>
    </div>
  `).join('');
}

// ==================== LIVE GEMINI AI CONSULTANT ====================
function openAIKeyModal() {
  document.getElementById('modalAIKey').style.display = 'flex';
  document.getElementById('inputGeminiKey').value = localStorage.getItem('vetcare_gemini_key') || '';
}

function closeAIKeyModal() {
  document.getElementById('modalAIKey').style.display = 'none';
}

function saveGeminiKey() {
  const key = document.getElementById('inputGeminiKey').value.trim();
  if (!key) return;
  localStorage.setItem('vetcare_gemini_key', key);
  alert('Gemini API Key सुरक्षित!');
  closeAIKeyModal();
}

function sendCaseToAIConsultant() {
  const diag = document.getElementById('opdDiagnosis').value;
  const med = document.getElementById('opdMedicine').value;
  const animal = document.getElementById('opdAnimal').value;
  document.getElementById('aiInputPrompt').value = `पशु: ${animal}\nसंदेहास्पद रोग: ${diag}\nलक्षण/दवा विवरण: ${med}`;
  switchTab('ai');
}

async function runAIConsultant() {
  const prompt = document.getElementById('aiInputPrompt').value.trim();
  if (!prompt) { alert('विवरण लिखें!'); return; }

  const key = localStorage.getItem('vetcare_gemini_key');
  if (!key) { openAIKeyModal(); return; }

  const btn = document.getElementById('btnRunAI');
  const out = document.getElementById('aiOutputArea');

  btn.disabled = true;
  btn.innerText = '⏳ AI सर्जन विश्लेषण कर रहे हैं...';
  out.classList.remove('hidden');
  out.innerText = 'क्लिनिकल केस शीट का विश्लेषण जारी है...';

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Role: Senior Veterinary Surgeon\nAnalyze clinical case:\n${prompt}` }] }]
      })
    });
    const data = await res.json();
    out.innerText = data.candidates[0].content.parts[0].text;
  } catch (err) {
    out.innerText = 'त्रुटि: ' + err.message;
  } finally {
    btn.disabled = false;
    btn.innerText = '✨ AI से क्लिनिकल रिपोर्ट मांगें';
  }
}

// ==================== FINANCE & KHATA ====================
function updateFinanceAnalytics() {
  const records = JSON.parse(localStorage.getItem('vetcare_opd_cases') || '[]');
  const expenses = JSON.parse(localStorage.getItem('vetcare_expenses') || '[]');

  let totalCredit = 0;
  let totalDues = 0;
  records.forEach(r => {
    totalCredit += (r.paidFee || 0);
    totalDues += (r.dueFee || 0);
  });

  const totalDebit = expenses.reduce((acc, x) => acc + (x.amount || 0), 0);

  document.getElementById('finCredit').innerText = `₹${totalCredit}`;
  document.getElementById('finDebit').innerText = `₹${totalDebit}`;

  const dueList = document.getElementById('finDueList');
  if (!dueList) return;

  const dueRecords = records.filter(r => (r.dueFee || 0) > 0);
  if (dueRecords.length === 0) {
    dueList.innerHTML = `<div class="p-4 text-center text-slate-500 bg-slate-50 rounded-2xl">कोई बकाया उधारी नहीं है।</div>`;
    return;
  }

  dueList.innerHTML = dueRecords.map(r => `
    <div class="bg-rose-50/60 border border-rose-200 rounded-2xl p-3 flex justify-between items-center text-xs">
      <div>
        <div class="font-bold text-slate-900">${r.name} (${r.village})</div>
        <div class="text-rose-700 font-bold mt-0.5">बकाया: ₹${r.dueFee} (कुल: ₹${r.totalFee})</div>
      </div>
      <button onclick="sendDueReminder('${r.name}', '${r.phone}', ${r.dueFee}, '${r.fid}')" class="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-xl text-xs font-semibold">
        💬 तगादा
      </button>
    </div>
  `).join('');
}

function sendDueReminder(name, phone, dueFee, fid) {
  const msg = `नमस्कार ${name} जी, Vetcare पर्ची (${fid}) का ₹${dueFee} उपचार शुल्क बकाया है। कृपया PhonePe/GPay या नकद द्वारा चुकता करें।`;
  window.open(`https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
}

function addExpensePrompt() {
  const desc = prompt("खर्च का विवरण (उदा. चारा, पेट्रोल, दवा खरीद):");
  if (!desc) return;
  const amt = parseFloat(prompt("खर्च की राशि (₹):"));
  if (!amt || isNaN(amt)) return;

  const expItem = { desc, amount: amt, date: new Date().toLocaleDateString('hi-IN'), timestamp: new Date().toISOString() };
  let expenses = JSON.parse(localStorage.getItem('vetcare_expenses') || '[]');
  expenses.push(expItem);
  localStorage.setItem('vetcare_expenses', JSON.stringify(expenses));
  syncExpenseToCloud(expItem);
  alert('खर्च दर्ज हुआ!');
  updateFinanceAnalytics();
}
