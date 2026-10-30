// ==================== ROLE-BASED ACCESS CONTROL (RBAC) ====================
let userRole = localStorage.getItem('vetcare_active_role') || 'FARMER';
let currentTagFilter = 'ALL';

// Master Admin Security PIN (Only you know this to approve practitioners)
const ADMIN_MASTER_PIN = "VETCARE99";

window.addEventListener('DOMContentLoaded', () => {
  applySecurityUI();
  handleAppSearch();
  initBreedingModule();
  updateFinanceAnalytics();
  initPWA();
});

function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW:', err));
  }
}

// ==================== AUTHENTICATION & APPROVAL GATE ====================
function openDoctorAuthModal() {
  const modal = document.getElementById('modalDoctorAuth');
  if (modal) modal.classList.remove('hidden');
}

function closeDoctorAuthModal() {
  const modal = document.getElementById('modalDoctorAuth');
  if (modal) modal.classList.add('hidden');
}

function verifyDoctorPasscode() {
  const enteredPin = document.getElementById('inputAdminPasscode').value.trim();
  if (enteredPin === ADMIN_MASTER_PIN) {
    userRole = 'DOCTOR';
    localStorage.setItem('vetcare_active_role', 'DOCTOR');
    alert('✅ डॉक्टर सत्यापन सफल! क्लिनिकल इंजेक्शन तालिका व ओपीडी अनलॉक हो गई है।');
    closeDoctorAuthModal();
    applySecurityUI();
    handleAppSearch();
  } else {
    alert('❌ अमान्य अप्रूवल कोड! आप केवल किसान मोड में ही ऐप का उपयोग कर सकते हैं।');
  }
}

function lockBackToFarmer() {
  if (confirm('क्या आप डॉक्टर मोड से बाहर आकर किसान मोड में लौटना चाहते हैं?')) {
    userRole = 'FARMER';
    localStorage.setItem('vetcare_active_role', 'FARMER');
    applySecurityUI();
    handleAppSearch();
  }
}

function applySecurityUI() {
  const badge = document.getElementById('currentUserRoleBadge');
  const actionSlot = document.getElementById('practitionerActionSlot');
  const navRx = document.getElementById('navRx');
  const navBreeding = document.getElementById('navBreeding');
  const navFeed = document.getElementById('navFeed');
  const navFinanceLabel = document.getElementById('navFinanceLabel');
  const finTitle = document.getElementById('financeTitle');
  const finCreditLabel = document.getElementById('finCreditLabel');
  const finDebitLabel = document.getElementById('finDebitLabel');

  if (userRole === 'DOCTOR') {
    badge.innerText = '🩺 अधिकृत पशु चिकित्सक (Doctor)';
    badge.className = 'text-[10px] text-blue-600 font-bold';
    actionSlot.innerHTML = `
      <button onclick="lockBackToFarmer()" class="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-xl font-bold hover:bg-rose-100">
        🔒 लॉगआउट
      </button>
    `;
    if (navRx) navRx.classList.remove('hidden');
    if (navBreeding) navBreeding.classList.add('hidden');
    if (navFeed) navFeed.classList.add('hidden');
    if (navFinanceLabel) navFinanceLabel.innerText = 'क्लिनिक खाता';
    if (finTitle) finTitle.innerText = '📊 क्लिनिकल ओपीडी खाता बही';
    if (finCreditLabel) finCreditLabel.innerText = 'कुल क्लिनिक आय';
    if (finDebitLabel) finDebitLabel.innerText = 'क्लिनिक खर्च';
  } else {
    badge.innerText = '👨‍🌾 स्मार्ट पशुपालक (Farmer)';
    badge.className = 'text-[10px] text-emerald-600 font-bold';
    actionSlot.innerHTML = `
      <button onclick="openDoctorAuthModal()" class="text-[11px] px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold hover:bg-blue-100 transition flex items-center gap-1 shadow-xs">
        <span>🩺</span> डॉक्टर लॉगिन
      </button>
    `;
    if (navRx) navRx.classList.add('hidden');
    if (navBreeding) navBreeding.classList.remove('hidden');
    if (navFeed) navFeed.classList.remove('hidden');
    if (navFinanceLabel) navFinanceLabel.innerText = 'डेयरी खाता';
    if (finTitle) finTitle.innerText = '🥛 डेयरी दूध व पशु खर्च खाता';
    if (finCreditLabel) finCreditLabel.innerText = 'दूध बिक्री आय';
    if (finDebitLabel) finDebitLabel.innerText = 'चारा व दाना खर्च';
  }
}

// ==================== SEARCH & DISEASE DISPLAY ====================
function handleAppSearch() {
  const q = (document.getElementById('unifiedSearchInput')?.value || '').toLowerCase().trim();
  const container = document.getElementById('diseaseSearchResults');
  if (!container) return;

  const results = CLINICAL_DATABASE.filter(d => {
    const matchTag = currentTagFilter === 'ALL' || d.etiologyType === currentTagFilter;
    const matchQ = !q || 
      d.name.toLowerCase().includes(q) || 
      d.localName.toLowerCase().includes(q) || 
      d.cardinal.toLowerCase().includes(q);
    return matchTag && matchQ;
  });

  if (results.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
        🔍 कोई बीमारी या लक्षण नहीं मिला।
      </div>`;
    return;
  }

  container.innerHTML = results.map(d => `
    <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3 transition">
      
      <!-- Card Header -->
      <div class="flex justify-between items-start border-b border-slate-100 pb-2.5">
        <div>
          <h3 class="text-sm font-bold text-slate-900">${d.id}. ${d.name}</h3>
          <p class="text-[11px] text-blue-600 font-semibold">देसी नाम: ${d.localName}</p>
        </div>
        <span class="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">${d.temp}</span>
      </div>

      <!-- Cardinal Sign -->
      <div class="bg-rose-50/80 border border-rose-200 rounded-2xl p-2.5 text-xs text-rose-950">
        <strong class="text-rose-700 block mb-0.5">🚨 प्रमुख मुख्य लक्षण:</strong>
        ${d.cardinal}
      </div>

      <!-- MEDICINE SECTION: DOCTOR (TABLE) vs FARMER (LOCKED) -->
      ${userRole === 'DOCTOR' ? `
        <!-- PRACTITIONER VIEW: INJECTIONS TABLE -->
        <div class="space-y-1.5 pt-1">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-blue-900 flex items-center gap-1">💉 एलोपैथिक इंजेक्शन तालिका:</span>
            <button onclick="loadToRx('${d.name}')" class="text-[10px] bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-bold shadow-xs">+ पर्चे में लें</button>
          </div>
          
          <div class="overflow-x-auto border border-slate-200 rounded-2xl">
            <table class="w-full text-left text-[10px] text-slate-700 divide-y divide-slate-200">
              <thead class="bg-slate-50 text-slate-900 font-bold">
                <tr>
                  <th class="p-2">वर्ग</th>
                  <th class="p-2">जेनेरिक साल्ट</th>
                  <th class="p-2">एथिकल ब्रांड (MRP)</th>
                  <th class="p-2">डोज़ व रूट</th>
                  <th class="p-2">गर्भ सुरक्षा</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                ${d.injections.map(inj => `
                  <tr>
                    <td class="p-2 font-semibold text-slate-900">${inj.category}</td>
                    <td class="p-2 font-mono text-slate-600">${inj.generic}</td>
                    <td class="p-2 text-blue-700 font-semibold">${inj.ethical}</td>
                    <td class="p-2 font-mono">${inj.dose} (${inj.route})</td>
                    <td class="p-2 font-bold">${inj.pregSafe}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <!-- FARMER VIEW: FRIENDLY SAFETY SHIELD -->
        <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 flex items-center gap-2.5">
          <span class="text-xl">🛡️</span>
          <div>
            <strong>किसान सुरक्षा नियम:</strong>
            <p class="text-[10px] text-emerald-800 leading-tight mt-0.5">एंटीबायोटिक इंजेक्शन केवल अधिकृत पशु चिकित्सक से ही लगवाएं। नीचे दिए गए काढ़े, ओरल टॉनिक व घरेलू उपचार सुरक्षित हैं।</p>
          </div>
        </div>
      `}

      <!-- 2. ORAL SUPPLEMENTS -->
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 space-y-1.5 text-xs">
        <strong class="text-slate-800 block text-[11px]">🍼 ओरल सप्लीमेंट्स व टॉनिक:</strong>
        ${d.oralSupplements.map(sup => `
          <div class="border-b border-slate-200/60 pb-1 last:border-0 last:pb-0 text-[11px]">
            <span class="font-bold text-blue-700">• ${sup.name}:</span> ${sup.formulation} (${sup.dose})
            <p class="text-[10px] text-slate-500">${sup.note}</p>
          </div>
        `).join('')}
      </div>

      <!-- 3. HOMEOPATHY -->
      <div class="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-2.5 space-y-1 text-xs">
        <strong class="text-emerald-900 block text-[11px]">🌿 होम्योपैथिक औषधियां:</strong>
        ${d.homeopathy.map(hom => `
          <div class="text-[11px] text-emerald-950">
            <strong>• ${hom.drug}</strong>: ${hom.dose} <span class="text-slate-500">(${hom.indication})</span>
          </div>
        `).join('')}
      </div>

      <!-- 4. HOME REMEDIES -->
      <div class="bg-amber-50/50 border border-amber-200 rounded-2xl p-2.5 space-y-1 text-xs">
        <strong class="text-amber-900 block text-[11px]">🥣 सिद्ध देहाती घरेलू नुस्खे:</strong>
        ${d.homeRemedies.map(rem => `
          <div class="text-[11px] text-amber-950">
            <strong>• ${rem.remedy}</strong>: ${rem.method}
          </div>
        `).join('')}
      </div>

    </div>
  `).join('');
}

function filterByTag(tag, btn) {
  currentTagFilter = tag;
  document.querySelectorAll('.q-chip').forEach(c => {
    c.className = 'q-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0';
  });
  if (btn) btn.className = 'q-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 shadow-xs';
  handleAppSearch();
}

function loadToRx(name) {
  document.getElementById('opdDiagnosis').value = name;
  switchTab('rx');
}

// ==================== BREEDING & HEAT MODULE ====================
function initBreedingModule() {
  const heatDiv = document.getElementById('heatSignsContainer');
  const disDiv = document.getElementById('dischargeContainer');
  const repList = document.getElementById('repeatBreederList');

  if (heatDiv && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    heatDiv.innerHTML = BREEDING_GUIDE_DATA.heatSigns.map(h => `
      <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
        <strong class="text-rose-600">${h.stage}</strong>
        <p class="text-slate-700 text-[11px]">${h.signs}</p>
        <span class="text-[10px] font-bold text-blue-700">${h.action}</span>
      </div>
    `).join('');
  }

  if (disDiv && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    disDiv.innerHTML = BREEDING_GUIDE_DATA.dischargeTypes.map(d => `
      <div class="p-2.5 rounded-xl border ${d.safe ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}">
        <strong>${d.type}</strong>
        <p class="text-[11px] mt-0.5">${d.meaning}</p>
      </div>
    `).join('');
  }

  if (repList && typeof BREEDING_GUIDE_DATA !== 'undefined') {
    repList.innerHTML = BREEDING_GUIDE_DATA.repeatBreederSolutions.map(s => `<li>• ${s}</li>`).join('');
  }
}

// ==================== FEED CALCULATOR ====================
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
  ['diagnosis', 'rx', 'breeding', 'feed', 'finance'].forEach(t => {
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
}

// ==================== OPD & FINANCE HELPERS ====================
function calculateDue() {
  const tot = parseFloat(document.getElementById('opdTotalFee').value) || 0;
  const paid = parseFloat(document.getElementById('opdPaidFee').value) || 0;
  document.getElementById('opdDueFee').value = Math.max(0, tot - paid);
}

function dispatchWhatsAppRx() {
  const name = document.getElementById('opdFarmerName').value.trim();
  const phone = document.getElementById('opdFarmerPhone').value.trim();
  const diag = document.getElementById('opdDiagnosis').value.trim();
  const med = document.getElementById('opdMedicine').value.trim();
  const tot = document.getElementById('opdTotalFee').value || 0;
  const due = document.getElementById('opdDueFee').value || 0;

  if (!name || !phone) { alert('कृपया किसान का नाम व मोबाइल नंबर भरें!'); return; }

  const msg = `🐾 *Vetcare डिजिटल पर्ची*\n👤 किसान: ${name}\n🩺 रोग: ${diag}\n💊 Rx: ${med}\n💰 कुल: ₹${tot} | बकाया: ₹${due}`;
  window.open(`https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
}

function updateFinanceAnalytics() {
  if (userRole === 'DOCTOR') {
    document.getElementById('finCredit').innerText = '₹3,400';
    document.getElementById('finDebit').innerText = '₹650';
  } else {
    document.getElementById('finCredit').innerText = '₹12,800';
    document.getElementById('finDebit').innerText = '₹4,200';
  }
}

function addFinanceEntryPrompt() {
  alert('खर्च प्रविष्टि दर्ज करने का विकल्प सक्रिय है।');
}
