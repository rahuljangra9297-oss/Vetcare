// Global State
let currentFilter = 'ALL';

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  renderDiseases(CLINICAL_DATABASE);
  renderSavedRecords();
  initPWA();
});

// PWA Service Worker Registration
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('PWA Service Worker Active'))
      .catch((err) => console.error('SW Error:', err));
  }
}

// Render Disease Cards
function renderDiseases(list) {
  const container = document.getElementById('diseaseContainer');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-slate-800/60 rounded-2xl border border-slate-700/80">कोई बीमारी या लक्षण नहीं मिला।</div>`;
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
          <h3 class="text-sm font-bold text-emerald-300 leading-snug">${d.id}. ${d.name}</h3>
          <span class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle} shrink-0">${d.temp}</span>
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

// Omni Search Handler
function handleOmniSearch() {
  const q = document.getElementById('omniSearch').value.toLowerCase().trim();
  document.getElementById('clearSearchBtn').classList.toggle('hidden', q.length === 0);

  const filtered = CLINICAL_DATABASE.filter(d => {
    const matchesQuery = !q || 
      d.name.toLowerCase().includes(q) || 
      d.cardinal.toLowerCase().includes(q) || 
      d.symptoms.toLowerCase().includes(q) || 
      d.rx.toLowerCase().includes(q);
    const matchesFilter = currentFilter === 'ALL' || d.category === currentFilter;
    return matchesQuery && matchesFilter;
  });

  renderDiseases(filtered);
}

function clearOmniSearch() {
  document.getElementById('omniSearch').value = '';
  handleOmniSearch();
}

// Temperature Chip Filter
function applyTempFilter(category, btnElement) {
  currentFilter = category;
  document.querySelectorAll('.temp-chip').forEach(c => c.classList.remove('chip-active'));
  btnElement.classList.add('chip-active');
  handleOmniSearch();
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
