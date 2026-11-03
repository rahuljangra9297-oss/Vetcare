// Vetcare AI OS - Smart Farmer Execution Engine & Desi Knowledge Hub (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. STATE & CONSTANTS (STRICT FARMER ROLE ISOLATION)
  // =========================================================================
  let currentOrganFilter = 'सभी';
  let diseaseSearchKeyword = '';
  let activeFarmerTab = 'diseases'; // 'diseases' | 'bulls' | 'ledger' | 'schemes' | 'doctorSos'

  const ORGAN_CATEGORIES = [
    'सभी',
    'बच्चादानी व प्रजनन',
    'अयन व थन',
    'पेट व पाचन',
    'खुर व पैर',
    'पोषण व संक्रामक'
  ];

  // Verified Central & Haryana Government Dairy Schemes
  const GOVT_SCHEMES_DB = [
    {
      id: "SCH_01",
      title: "पशु किसान क्रेडिट कार्ड योजना (Pashu KCC)",
      authority: "केंद्र एवं हरियाणा राज्य सरकार",
      target: "गाय, भैंस, भेड़, बकरी व मुर्गी पालक",
      benefits: "प्रति गाय ₹40,783 एवं प्रति भैंस ₹60,249 तक का कार्यशील पूंजी ऋण। ₹1.60 लाख तक शून्य बंधक (No Collateral) ऋण मात्र 4% रियायती ब्याज दर पर।",
      eligibility: "पशु का स्वास्थ्य प्रमाण पत्र, आधार कार्ड, बैंक पासबुक व जमीन/पशु प्रमाण।",
      howToApply: "अपने नजदीकी सरकारी बैंक शाखा अथवा कॉमन सर्विस सेंटर (CSC) पर आवेदन करें।"
    },
    {
      id: "SCH_02",
      title: "हरियाणा मुर्राह दुग्ध प्रोत्साहन योजना (Cash Reward)",
      authority: "पशुपालन एवं डेयरी विभाग, हरियाणा सरकार",
      target: "उच्च दुग्ध उत्पादक मुर्राह भैंस पालक",
      benefits: "19 से 25+ किलोग्राम दैनिक दूध देने वाली मुर्राह भैंसों पर ₹15,000 से लेकर ₹30,000 तक का एकमुश्त नकद पुरस्कार व प्रमाण-पत्र।",
      eligibility: "हरियाणा का मूल निवासी, शुद्ध मुर्राह भैंस, विभागीय टीम द्वारा तीन समय की दुग्ध तुलाई में पात्रता।",
      howToApply: "नजदीकी राजकीय पशु चिकित्सालय के डॉक्टर (GVD) से संपर्क कर दुग्ध मापन हेतु पंजीकरण कराएं।"
    },
    {
      id: "SCH_03",
      title: "राष्ट्रीय गोकुल मिशन (Rashtriya Gokul Mission)",
      authority: "पशुपालन और डेयरी विभाग, भारत सरकार",
      target: "देशी गोवंश एवं महिष संवर्धन",
      benefits: "सॉर्टेड सेक्सड सीमन (Sexed Semen) पर भारी सरकारी सब्सिडी (मात्र ₹100-₹200 प्रति स्ट्रॉ), कृत्रिम गर्भाधान तकनीशियनों द्वारा नि:शुल्क/सस्ती डोरस्टेप ए.आई.।",
      eligibility: "समस्त पशुपालक जो देशी नस्लों (साहीवाल, गिर, थारपारकर, मुर्राह) का पालन करते हैं।",
      howToApply: "सरकारी ए.आई. वर्कर अथवा पशु अस्पताल के माध्यम से सेक्सड सीमन का अनुरोध करें।"
    },
    {
      id: "SCH_04",
      title: "राष्ट्रीय पशुधन मिशन (NLM - National Livestock Mission)",
      authority: "केंद्र सरकार (DAHD)",
      target: "बकरी पालन, भेड़ पालन, कुक्कुट व साइलेज (हरा चारा) बैंक",
      benefits: "50% तक पूंजीगत सीधी सब्सिडी (बकरी/भेड़ फार्मिंग यूनिट पर ₹50 लाख तक तथा साइलेज मेकिंग यूनिट पर 50 लाख पर 25 लाख अनुदान)।",
      eligibility: "किसान, उद्यमी, स्वयं सहायता समूह (SHG) व FPO। विस्तृत प्रोजेक्ट रिपोर्ट (DPR) अनिवार्य।",
      howToApply: "भारत सरकार के nlm.udyamimitra.in पोर्टल पर ऑनलाइन आवेदन जमा करें।"
    },
    {
      id: "SCH_05",
      title: "पं. दीन दयाल उपाध्याय पशुधन सुरक्षा बीमा योजना",
      authority: "हरियाणा पशुधन विकास बोर्ड (HLDB)",
      target: "समस्त दुधारू पशुधन",
      benefits: "मात्र ₹100 प्रीमियम (अनुसूचित जाति हेतु 100% मुफ़्त) पर बड़े पशु का ₹60,000 से ₹80,000 तक का व्यापक मृत्यु बीमा कवरेज।",
      eligibility: "पशु का स्वस्थ होना व कान में 12-अंकीय RFID टैग लगा होना अनिवार्य।",
      howToApply: "ग्राम पशु चिकित्सक या HLDB अधिकृत बीमा एजेंट द्वारा स्वास्थ्य प्रमाण पत्र बनवाकर।"
    }
  ];

  // =========================================================================
  // 2. MASTER INITIALIZATION (window.initFarmerDashboard)
  // =========================================================================
  window.initFarmerDashboard = function () {
    // 1. Strict Isolation: Hide Doctor Workspace & View Containers
    const doctorWorkspace = document.getElementById('doctor-workspace');
    if (doctorWorkspace) doctorWorkspace.style.display = 'none';

    // 2. Ensure Farmer Workspace is visible
    const farmerWorkspace = document.getElementById('farmer-workspace');
    if (!farmerWorkspace) return;
    farmerWorkspace.style.display = 'block';

    // 3. Clear doctor-only UI artifacts
    const doctorPrescriptionPad = document.getElementById('viewRx');
    if (doctorPrescriptionPad) doctorPrescriptionPad.classList.add('hidden');

    // 4. Update Role Badge in top header
    const roleBadge = document.getElementById('currentUserRoleBadge');
    if (roleBadge) {
      roleBadge.textContent = '🌾 Smart Farmer (स्मार्ट पशुपालक)';
      roleBadge.className = 'text-[10px] sm:text-[11px] font-bold text-emerald-700';
    }

    // 5. Hide Doctor Bottom Nav Buttons
    const navRx = document.getElementById('navRx');
    const navRecords = document.getElementById('navRecords');
    const navInventory = document.getElementById('navInventory');
    const navAI = document.getElementById('navAI');
    if (navRx) navRx.classList.add('hidden');
    if (navRecords) navRecords.classList.add('hidden');
    if (navInventory) navInventory.classList.add('hidden');
    if (navAI) navAI.classList.add('hidden');

    // 6. Build and inject Farmer Hub
    buildFarmerHubContainer(farmerWorkspace);

    // 7. Render default Organ Disease cards
    window.renderFarmerDiseasesByOrgan('सभी');

    // 8. Auto-render Ledger & Schemes data
    renderDailyLedgerUI();
    renderGovtSchemesUI();

    // 9. Attach Bull Directory if script loaded
    if (typeof window.initBullDirectory === 'function') {
      window.initBullDirectory('farmerBullMountSection');
    }
  };

  // =========================================================================
  // 3. BUILD COMPLETE 5-TOOL FARMER HUB CONTAINER
  // =========================================================================
  function buildFarmerHubContainer(parentEl) {
    let container = document.getElementById('farmerHubUnifiedRoot');
    if (!container) {
      container = document.createElement('div');
      container.id = 'farmerHubUnifiedRoot';
      container.className = 'w-full space-y-4';
      parentEl.prepend(container);
    }

    container.innerHTML = `
      <!-- TOP 5 CLEAN TOOLS SWITCHER BAR -->
      <div class="bg-white border border-slate-200 rounded-3xl p-2.5 sm:p-3 shadow-xs">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold" id="farmerToolNavTabs">
          <button type="button" onclick="window.switchFarmerToolTab('diseases')" id="fTabBtn_diseases" class="px-3 py-2 rounded-2xl bg-emerald-600 text-white shadow-xs shrink-0 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-stethoscope"></i> <span>1. 🩺 22 देसी रोग व नुस्खे</span>
          </button>
          <button type="button" onclick="window.switchFarmerToolTab('bulls')" id="fTabBtn_bulls" class="px-3 py-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-dna"></i> <span>2. 🐂 बुल डायरेक्टरी व A.I.</span>
          </button>
          <button type="button" onclick="window.switchFarmerToolTab('ledger')" id="fTabBtn_ledger" class="px-3 py-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-wallet"></i> <span>3. 🥛 दूध व चारा बहीखाता</span>
          </button>
          <button type="button" onclick="window.switchFarmerToolTab('schemes')" id="fTabBtn_schemes" class="px-3 py-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-landmark"></i> <span>4. 📜 सरकारी योजनाएं</span>
          </button>
          <button type="button" onclick="window.switchFarmerToolTab('doctorSos')" id="fTabBtn_doctorSos" class="px-3 py-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-truck-medical"></i> <span>5. 📍 20km डॉक्टर अनुरोध</span>
          </button>
        </div>
      </div>

      <!-- TOOL 1: ORGAN-BASED DISEASE RENDERER SECTION -->
      <section id="fToolSection_diseases" class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white rounded-3xl p-4 sm:p-6 shadow-md relative overflow-hidden">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-[10px] bg-white/20 text-emerald-100 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">शून्य इंजेक्शन • 100% प्राकृतिक उपचार</span>
              <h2 class="text-base sm:text-lg font-black mt-1">अंग-वार 22 प्रमाणित देसी रोग निदान व घरेलू नुस्खे</h2>
              <p class="text-[11px] text-emerald-100 mt-0.5">ICAR, NDDB व तंजौर विश्वविद्यालय (TDU) द्वारा सत्यापित पारंपरिक पशु चिकित्सा ज्ञान</p>
            </div>
            <div class="text-[11px] font-mono bg-emerald-900/60 border border-emerald-400/30 px-3 py-1.5 rounded-2xl shrink-0 self-start sm:self-auto text-emerald-200">
              🌱 सुरक्षित व विष-मुक्त
            </div>
          </div>
        </div>

        <!-- Organ Filter Buttons & Search -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="farmerOrganFilterButtons">
            ${renderOrganButtonsHtml()}
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
              type="text" 
              id="farmerDiseaseSearchInput" 
              placeholder="रोग का नाम, अंग अथवा लक्षण खोजें (उदा. थनैला, आफरा, रिपीट ब्रीडर, बुखार)..." 
              oninput="window.handleFarmerDiseaseSearch(this.value)"
              class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2.5 text-xs outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        <!-- DISEASE CARDS CONTAINER -->
        <div id="farmerDiseaseCardsGrid" class="space-y-3.5"></div>
      </section>

      <!-- TOOL 2: BULL DIRECTORY SECTION -->
      <section id="fToolSection_bulls" class="hidden space-y-4">
        <div id="farmerBullMountSection"></div>
      </section>

      <!-- TOOL 3: MILK & EXPENSE LEDGER SECTION -->
      <section id="fToolSection_ledger" class="hidden space-y-4">
        <div id="farmerLedgerMountSection"></div>
      </section>

      <!-- TOOL 4: GOVERNMENT SCHEMES SECTION -->
      <section id="fToolSection_schemes" class="hidden space-y-4">
        <div id="farmerSchemesMountSection"></div>
      </section>

      <!-- TOOL 5: 20KM DOCTOR REQUEST / SOS DISPATCH SECTION -->
      <section id="fToolSection_doctorSos" class="hidden space-y-4">
        <div id="farmerDoctorSosMountSection">${renderDoctorSosHtml()}</div>
      </section>
    `;
  }

  function renderOrganButtonsHtml() {
    return ORGAN_CATEGORIES.map(cat => {
      const active = (cat === currentOrganFilter);
      const cls = active 
        ? 'bg-emerald-600 text-white font-bold shadow-xs' 
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium';
      return `
        <button 
          type="button" 
          onclick="window.renderFarmerDiseasesByOrgan('${cat}')" 
          class="px-3 py-1.5 rounded-xl transition shrink-0 text-[11px] ${cls}"
        >
          ${cat}
        </button>
      `;
    }).join('');
  }

  // =========================================================================
  // 4. ORGAN-BASED DISEASE RENDERER (window.renderFarmerDiseasesByOrgan)
  // =========================================================================
  window.renderFarmerDiseasesByOrgan = function (organ) {
    currentOrganFilter = organ || 'सभी';

    // Update filter buttons appearance
    const btnContainer = document.getElementById('farmerOrganFilterButtons');
    if (btnContainer) {
      btnContainer.innerHTML = renderOrganButtonsHtml();
    }

    const grid = document.getElementById('farmerDiseaseCardsGrid');
    if (!grid) return;

    const db = window.VETCARE_FARMER_DISEASE_DB || [];
    if (!db || db.length === 0) {
      grid.innerHTML = `
        <div class="p-6 text-center bg-white border border-slate-200 rounded-3xl text-xs text-slate-500">
          ⚠️ देसी रोग डाटाबेस लोड हो रहा है, कृपया 1 सेकंड प्रतीक्षा करें...
        </div>
      `;
      return;
    }

    const filtered = db.filter(item => {
      const matchCat = (currentOrganFilter === 'सभी') || (item.organCategory === currentOrganFilter);
      const matchSearch = !diseaseSearchKeyword || (
        item.nameHi.toLowerCase().includes(diseaseSearchKeyword) ||
        item.organCategory.toLowerCase().includes(diseaseSearchKeyword) ||
        item.causes.toLowerCase().includes(diseaseSearchKeyword) ||
        item.identificationSigns.toLowerCase().includes(diseaseSearchKeyword)
      );
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="p-8 text-center bg-white border border-dashed border-slate-300 rounded-3xl space-y-2 text-xs">
          <div class="text-3xl">🌾</div>
          <p class="font-bold text-slate-700">इस श्रेणी में कोई रोग नहीं मिला।</p>
          <p class="text-slate-400">कृपया अन्य श्रेणी चुनें या सर्च बॉक्स खाली करें।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(disease => {
      const stagesHtml = (disease.stagesTimeline || []).map(st => `
        <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-[11px] space-y-1">
          <div class="font-bold text-slate-800 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>${st.stage}</span>
          </div>
          <div class="text-slate-600 pl-3"><strong>लक्षण:</strong> ${st.signs}</div>
          <div class="text-emerald-800 pl-3 font-semibold"><strong>कार्रवाई:</strong> ${st.action}</div>
        </div>
      `).join('');

      const remediesHtml = (disease.desiRemedies || []).map((rem, idx) => `
        <div class="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3.5 space-y-2 text-xs text-slate-800">
          <div class="font-black text-emerald-900 flex items-center gap-1.5 text-xs sm:text-sm">
            <span>🌿 देसी नुस्खा #${idx + 1}:</span>
            <span>${rem.remedyName}</span>
          </div>
          <div class="text-[11px] space-y-1">
            <p><strong class="text-slate-700">आवश्यक सामग्री:</strong> <span class="font-medium text-emerald-950">${rem.ingredients}</span></p>
            <p><strong class="text-slate-700">तैयार करने व देने की विधि:</strong> <span class="font-medium text-slate-800">${rem.method}</span></p>
            <p class="text-amber-800"><strong class="text-amber-900">⚠️ जरूरी सावधानी:</strong> ${rem.precautions}</p>
          </div>
        </div>
      `).join('');

      return `
        <div class="bg-white border-2 border-slate-200/80 hover:border-emerald-500 rounded-3xl p-4 sm:p-5 shadow-xs transition space-y-3.5">
          <!-- TOP HEADER -->
          <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-lg border border-emerald-200">
                  ${disease.organCategory}
                </span>
                <span class="text-[10px] font-mono text-slate-400">${disease.id}</span>
              </div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">
                ${disease.nameHi}
              </h3>
            </div>
            <span class="text-2xl">🌱</span>
          </div>

          <!-- CAUSES & SIGNS -->
          <div class="space-y-1.5 text-xs">
            <p class="text-slate-700 leading-relaxed">
              <strong class="text-slate-900">कारण:</strong> ${disease.causes}
            </p>
            <p class="text-slate-700 leading-relaxed bg-amber-50/40 p-2.5 rounded-2xl border border-amber-100">
              <strong class="text-amber-950">पहचान के मुख्य लक्षण:</strong> ${disease.identificationSigns}
            </p>
          </div>

          <!-- STAGES TIMELINE ACCORDION -->
          <div class="space-y-1.5">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">रोग के चरण व तत्काल कार्रवाई:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${stagesHtml}
            </div>
          </div>

          <!-- EXPANDABLE FULL REMEDY SECTION (CLICK TO EXPAND) -->
          <div class="pt-1">
            <button 
              type="button" 
              onclick="window.toggleDesiRemedyDrawer('${disease.id}')"
              class="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-4 rounded-2xl text-xs border border-emerald-200 transition flex items-center justify-between shadow-xs active:scale-98"
            >
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-mortar-pestle text-emerald-600"></i>
                <span>प्रमाणित 100% देसी नुस्खे व खुराक देखें (Zero Injection)</span>
              </span>
              <i id="iconRemedy_${disease.id}" class="fa-solid fa-chevron-down text-emerald-600 transition-transform"></i>
            </button>

            <div id="drawerRemedy_${disease.id}" class="hidden pt-3 space-y-3">
              ${remediesHtml}

              <!-- WHEN TO CALL DOCTOR WARNING -->
              <div class="bg-rose-50 border border-rose-200 rounded-2xl p-3 text-xs text-rose-900 flex items-start gap-2">
                <i class="fa-solid fa-triangle-exclamation text-rose-600 text-sm mt-0.5 shrink-0"></i>
                <div>
                  <strong class="text-rose-950">कब डॉक्टर को तुरंत बुलाएं?</strong>
                  <p class="text-[11px] text-rose-800 mt-0.5 leading-relaxed">${disease.whenToCallDoctor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  window.toggleDesiRemedyDrawer = function (diseaseId) {
    const drawer = document.getElementById(`drawerRemedy_${diseaseId}`);
    const icon = document.getElementById(`iconRemedy_${diseaseId}`);
    if (!drawer) return;
    if (drawer.classList.contains('hidden')) {
      drawer.classList.remove('hidden');
      if (icon) icon.className = 'fa-solid fa-chevron-up text-emerald-600 transition-transform';
    } else {
      drawer.classList.add('hidden');
      if (icon) icon.className = 'fa-solid fa-chevron-down text-emerald-600 transition-transform';
    }
  };

  window.handleFarmerDiseaseSearch = function (keyword) {
    diseaseSearchKeyword = (keyword || '').trim().toLowerCase();
    window.renderFarmerDiseasesByOrgan(currentOrganFilter);
  };

  // =========================================================================
  // 5. TOOL SWITCHER LOGIC
  // =========================================================================
  window.switchFarmerToolTab = function (tabId) {
    activeFarmerTab = tabId;
    const tabs = ['diseases', 'bulls', 'ledger', 'schemes', 'doctorSos'];

    tabs.forEach(t => {
      const sec = document.getElementById(`fToolSection_${t}`);
      const btn = document.getElementById(`fTabBtn_${t}`);
      if (sec) {
        if (t === tabId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      }
      if (btn) {
        if (t === tabId) {
          btn.className = 'px-3 py-2 rounded-2xl bg-emerald-600 text-white shadow-xs shrink-0 flex items-center gap-1.5 transition font-bold';
        } else {
          btn.className = 'px-3 py-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5 transition font-medium';
        }
      }
    });

    if (tabId === 'bulls' && typeof window.initBullDirectory === 'function') {
      window.initBullDirectory('farmerBullMountSection');
    }
    if (tabId === 'ledger') {
      renderDailyLedgerUI();
    }
    if (tabId === 'schemes') {
      renderGovtSchemesUI();
    }
  };

  // =========================================================================
  // 6. TOOL 3: DAILY MILK & CATTLE FEED EXPENSE LEDGER
  // =========================================================================
  const LEDGER_STORAGE_KEY = 'vetcare_farmer_milk_ledger';

  function getLedgerData() {
    try {
      return JSON.parse(localStorage.getItem(LEDGER_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLedgerData(records) {
    localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(records));
  }

  function renderDailyLedgerUI() {
    const mountEl = document.getElementById('farmerLedgerMountSection');
    if (!mountEl) return;

    const records = getLedgerData();
    const todayStr = new Date().toISOString().split('T')[0];

    // Compute Totals
    const totalMilkAll = records.reduce((acc, r) => acc + (parseFloat(r.totalMilk) || 0), 0);
    const totalIncomeAll = records.reduce((acc, r) => acc + (parseFloat(r.revenue) || 0), 0);
    const totalExpenseAll = records.reduce((acc, r) => acc + (parseFloat(r.totalExpense) || 0), 0);
    const totalProfitAll = totalIncomeAll - totalExpenseAll;

    mountEl.innerHTML = `
      <div class="space-y-4">
        <!-- LEDGER HEADER BANNER -->
        <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-3xl p-4 sm:p-6 shadow-md">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-[10px] bg-white/20 text-blue-100 font-bold px-2.5 py-0.5 rounded-full uppercase">दैनिक डेयरी हिसाब-किताब</span>
              <h2 class="text-base sm:text-lg font-black mt-1">दूध उत्पादन, फैट, दाना-चारा खर्च व शुद्ध मुनाफा बहीखाता</h2>
              <p class="text-[11px] text-blue-100 mt-0.5">अपने डेयरी फार्म की प्रतिदिन की सटीक आमदनी व बचत ट्रैक करें</p>
            </div>
            <!-- TOTAL PROFIT PILL -->
            <div class="bg-white/10 border border-white/20 rounded-2xl p-3 text-right">
              <span class="text-[10px] text-blue-200 block">कुल संचित शुद्ध लाभ:</span>
              <span class="text-base sm:text-lg font-black text-emerald-300">₹${totalProfitAll.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- NEW ENTRY INPUT FORM -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5 text-xs">
          <h3 class="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <i class="fa-solid fa-plus-circle text-blue-600"></i>
            <span>आज का नया दूध व खर्च रिकॉर्ड दर्ज करें:</span>
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div>
              <label class="block text-slate-600 font-bold mb-1">दिनांक (Date)</label>
              <input id="ledgDate" type="date" value="${todayStr}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">सुबह का दूध (लीटर)</label>
              <input id="ledgMorning" type="number" step="0.5" placeholder="उदा. 12.5" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">शाम का दूध (लीटर)</label>
              <input id="ledgEvening" type="number" step="0.5" placeholder="उदा. 11.0" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">औसत फैट % (Fat)</label>
              <input id="ledgFat" type="number" step="0.1" placeholder="उदा. 6.8" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="block text-slate-600 font-bold mb-1">दूध भाव प्रति लीटर (₹)</label>
              <input id="ledgRate" type="number" step="1" placeholder="उदा. 60" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-blue-700" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">दाना-खल-फीड खर्च (₹)</label>
              <input id="ledgFeedExpense" type="number" step="1" placeholder="उदा. 450" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-rose-600" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">अन्य/तूड़ा-चारा खर्च (₹)</label>
              <input id="ledgOtherExpense" type="number" step="1" placeholder="उदा. 150" oninput="window.calcLedgerPreview()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-rose-600" />
            </div>
          </div>

          <!-- DYNAMIC PREVIEW BOX -->
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-slate-700 font-semibold">
            <div>कुल दूध: <span id="prevTotalMilk" class="font-bold text-slate-900">0 L</span></div>
            <div>दूध बिक्री: <span id="prevRevenue" class="font-bold text-blue-700">₹0</span></div>
            <div>कुल खर्च: <span id="prevExpense" class="font-bold text-rose-600">₹0</span></div>
            <div class="text-xs sm:text-sm">शुद्ध मुनाफा: <span id="prevProfit" class="font-black text-emerald-700 text-sm sm:text-base">₹0</span></div>
          </div>

          <button 
            type="button" 
            onclick="window.saveFarmerLedgerEntry()" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98 flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            <span>बहीखाते में सुरक्षित करें</span>
          </button>
        </div>

        <!-- RECENT RECORDS TABLE -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 class="font-bold text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-clock-rotate-left text-slate-500"></i>
              <span>हाल के बहीखाता रिकॉर्ड्स (कुल: ${records.length} दिन)</span>
            </h3>
            <button onclick="window.clearLedgerHistory()" class="text-[10px] text-rose-600 hover:underline font-bold">
              इतिहास साफ करें
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr class="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <th class="p-2">दिनांक</th>
                  <th class="p-2">कुल दूध</th>
                  <th class="p-2">फैट %</th>
                  <th class="p-2">भाव (₹)</th>
                  <th class="p-2">बिक्री (₹)</th>
                  <th class="p-2">खर्च (₹)</th>
                  <th class="p-2 text-right">शुद्ध लाभ (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${renderLedgerTableRows(records)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function renderLedgerTableRows(records) {
    if (!records || records.length === 0) {
      return `
        <tr>
          <td colspan="7" class="p-4 text-center text-slate-400">अभी तक कोई दैनिक रिकॉर्ड दर्ज नहीं किया गया है।</td>
        </tr>
      `;
    }

    return records.slice(-15).reverse().map(rec => {
      const isPositive = rec.netProfit >= 0;
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50">
          <td class="p-2 font-mono font-semibold">${rec.date}</td>
          <td class="p-2 font-bold">${rec.totalMilk} L</td>
          <td class="p-2">${rec.fat ? rec.fat + '%' : '-'}</td>
          <td class="p-2">₹${rec.rate}</td>
          <td class="p-2 font-bold text-blue-700">₹${rec.revenue}</td>
          <td class="p-2 text-rose-600">₹${rec.totalExpense}</td>
          <td class="p-2 text-right font-black ${isPositive ? 'text-emerald-700' : 'text-rose-700'}">
            ₹${rec.netProfit}
          </td>
        </tr>
      `;
    }).join('');
  }

  window.calcLedgerPreview = function () {
    const m = parseFloat(document.getElementById('ledgMorning')?.value) || 0;
    const e = parseFloat(document.getElementById('ledgEvening')?.value) || 0;
    const rate = parseFloat(document.getElementById('ledgRate')?.value) || 0;
    const feed = parseFloat(document.getElementById('ledgFeedExpense')?.value) || 0;
    const other = parseFloat(document.getElementById('ledgOtherExpense')?.value) || 0;

    const totalMilk = (m + e);
    const revenue = Math.round(totalMilk * rate);
    const totalExp = Math.round(feed + other);
    const netProfit = Math.round(revenue - totalExp);

    const prevMilk = document.getElementById('prevTotalMilk');
    const prevRev = document.getElementById('prevRevenue');
    const prevExp = document.getElementById('prevExpense');
    const prevProf = document.getElementById('prevProfit');

    if (prevMilk) prevMilk.textContent = `${totalMilk.toFixed(1)} L`;
    if (prevRev) prevRev.textContent = `₹${revenue}`;
    if (prevExp) prevExp.textContent = `₹${totalExp}`;
    if (prevProf) {
      prevProf.textContent = `₹${netProfit}`;
      prevProf.className = netProfit >= 0 ? 'font-black text-emerald-700 text-sm sm:text-base' : 'font-black text-rose-700 text-sm sm:text-base';
    }
  };

  window.saveFarmerLedgerEntry = function () {
    const date = document.getElementById('ledgDate')?.value || new Date().toISOString().split('T')[0];
    const m = parseFloat(document.getElementById('ledgMorning')?.value) || 0;
    const e = parseFloat(document.getElementById('ledgEvening')?.value) || 0;
    const fat = document.getElementById('ledgFat')?.value || '';
    const rate = parseFloat(document.getElementById('ledgRate')?.value) || 0;
    const feed = parseFloat(document.getElementById('ledgFeedExpense')?.value) || 0;
    const other = parseFloat(document.getElementById('ledgOtherExpense')?.value) || 0;

    const totalMilk = parseFloat((m + e).toFixed(1));
    if (totalMilk <= 0 || rate <= 0) {
      alert('कृपया वैध दूध मात्रा और प्रति लीटर भाव दर्ज करें!');
      return;
    }

    const revenue = Math.round(totalMilk * rate);
    const totalExpense = Math.round(feed + other);
    const netProfit = Math.round(revenue - totalExpense);

    const newRecord = {
      id: 'REC_' + Date.now(),
      date,
      morning: m,
      evening: e,
      totalMilk,
      fat,
      rate,
      feedExpense: feed,
      otherExpense: other,
      totalExpense,
      revenue,
      netProfit
    };

    const records = getLedgerData();
    records.push(newRecord);
    saveLedgerData(records);

    alert(`✅ ${date} का बहीखाता सुरक्षित किया गया!\nदूध: ${totalMilk}L • शुद्ध मुनाफा: ₹${netProfit}`);
    renderDailyLedgerUI();
  };

  window.clearLedgerHistory = function () {
    if (confirm('क्या आप सचमुच सारा बहीखाता इतिहास हटाना चाहते हैं?')) {
      localStorage.removeItem(LEDGER_STORAGE_KEY);
      renderDailyLedgerUI();
    }
  };

  // =========================================================================
  // 7. TOOL 4: GOVERNMENT SCHEMES SECTION
  // =========================================================================
  function renderGovtSchemesUI() {
    const mountEl = document.getElementById('farmerSchemesMountSection');
    if (!mountEl) return;

    mountEl.innerHTML = `
      <div class="space-y-4">
        <!-- SCHEMES BANNER -->
        <div class="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-900 text-white rounded-3xl p-4 sm:p-6 shadow-md">
          <span class="text-[10px] bg-white/20 text-amber-100 font-bold px-2.5 py-0.5 rounded-full uppercase">सरकारी अनुदान व सहायता</span>
          <h2 class="text-base sm:text-lg font-black mt-1">हरियाणा व भारत सरकार की प्रमुख पशुपालन योजनाएं</h2>
          <p class="text-[11px] text-amber-100 mt-0.5">पशु किसान क्रेडिट कार्ड, नकद पुरस्कार, सब्सिडी व बीमा योजनाओं की अधिकृत जानकारी</p>
        </div>

        <!-- SCHEMES GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          ${GOVT_SCHEMES_DB.map(sc => `
            <div class="bg-white border-2 border-slate-200/80 hover:border-amber-500 rounded-3xl p-4 sm:p-5 shadow-xs transition space-y-3 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    ${sc.authority}
                  </span>
                  <span class="text-[10px] text-slate-400 font-mono">${sc.id}</span>
                </div>
                <h3 class="text-sm font-black text-slate-900 leading-tight">
                  ${sc.title}
                </h3>
                <p class="text-[11px] font-semibold text-emerald-800">
                  🎯 <strong>लक्षित लाभार्थी:</strong> ${sc.target}
                </p>
                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-[11px] space-y-1 text-slate-700">
                  <p><strong class="text-slate-900">प्रमुख लाभ:</strong> ${sc.benefits}</p>
                  <p><strong class="text-slate-900">पात्रता:</strong> ${sc.eligibility}</p>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100 text-[11px] flex items-center justify-between">
                <span class="text-slate-500"><strong>आवेदन:</strong> ${sc.howToApply}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- HELPLINE CARD -->
        <div class="bg-amber-50 border border-amber-300 rounded-3xl p-4 text-xs text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="space-y-0.5 text-center sm:text-left">
            <span class="font-bold flex items-center justify-center sm:justify-start gap-1">
              <i class="fa-solid fa-phone-volume text-amber-700"></i> राष्ट्रीय पशुपालन हेल्पलाइन:
            </span>
            <p class="text-[11px] text-amber-800">किसी भी योजना की जानकारी अथवा समस्या हेतु टोल-फ्री कॉल करें: <strong>1962 (पशु एम्बुलेंस व सहायता)</strong></p>
          </div>
          <a href="tel:1962" class="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-2xl text-xs shrink-0 shadow-sm transition">
            📞 1962 पर कॉल करें
          </a>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 8. TOOL 5: 20KM DOCTOR REQUEST / SOS DISPATCH (ZERO ALLOPATHIC DOSAGES)
  // =========================================================================
  function renderDoctorSosHtml() {
    return `
      <div class="space-y-4">
        <!-- SOS BANNER -->
        <div class="bg-gradient-to-r from-rose-700 via-red-800 to-rose-900 text-white rounded-3xl p-4 sm:p-6 shadow-md">
          <span class="text-[10px] bg-white/20 text-rose-100 font-bold px-2.5 py-0.5 rounded-full uppercase">तत्काल पशु चिकित्सा संबल</span>
          <h2 class="text-base sm:text-lg font-black mt-1">निकटतम 20-km पशु चिकित्सक / वीएलडीए से तुरंत संपर्क</h2>
          <p class="text-[11px] text-rose-100 mt-0.5">आपातकालीन स्थिति में अपनी GPS लोकेशन सहित 1-क्लिक व्हाट्सएप संदेश भेजें</p>
        </div>

        <!-- REQUEST FORM -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="block text-slate-700 font-bold mb-1">आपका नाम व गांव *</label>
              <input id="sosFarmerName" type="text" placeholder="उदा. रामपाल जी, गांव - सालवन" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium" />
            </div>
            <div>
              <label class="block text-slate-700 font-bold mb-1">पशु का प्रकार व पहचान</label>
              <select id="sosAnimalType" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold">
                <option value="मुर्राह भैंस">मुर्राह भैंस</option>
                <option value="देशी गाय (साहीवाल/गिर)">देशी गाय (साहीवाल/गिर)</option>
                <option value="एचएफ/जर्सी क्रॉस गाय">एचएफ/जर्सी क्रॉस गाय</option>
                <option value="बकरी/भेड़">बकरी/भेड़</option>
                <option value="बछड़ा/कटड़ा">बछड़ा/कटड़ा</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="block text-slate-700 font-bold mb-1">आपातकाल स्तर (Emergency Level)</label>
              <select id="sosEmergencyLevel" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold text-rose-700">
                <option value="अति-गंभीर (आफरा / मिल्क फीवर / ब्याने में रुकावट)">🔴 अति-गंभीर (आफरा / मिल्क फीवर / ब्याने में रुकावट)</option>
                <option value="मध्यम (तीव्र बुखार / थनैला / खूनी दस्त)">🟡 मध्यम (तीव्र बुखार / थनैला / खूनी दस्त)</option>
                <option value="सामान्य (हीट / ए.आई. सीमन / चेकअप)">🟢 सामान्य (हीट / ए.आई. सीमन / चेकअप)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-700 font-bold mb-1">GPS लोकेशन (सटीक नेविगेशन हेतु)</label>
              <div class="flex gap-1.5">
                <input id="sosGpsCoordinates" type="text" placeholder="GPS लोकेशन प्राप्त करें" readonly class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono" />
                <button type="button" onclick="window.captureSosGps()" class="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-2 rounded-xl text-xs font-bold shrink-0">
                  📍 GPS लें
                </button>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-slate-700 font-bold mb-1">रोग के मुख्य लक्षण (Problem Details)</label>
            <textarea id="sosProblemText" rows="3" placeholder="उदा. भैंस सुबह से पेट फुलाकर बैठी है, गर्दन मुड़ी हुई है और कान ठंडे पड़ रहे हैं..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none font-medium"></textarea>
          </div>

          <div>
            <label class="block text-slate-700 font-bold mb-1">क्षेत्रीय वेटरनरी डॉक्टर / वीएलडीए का मोबाइल नंबर *</label>
            <input id="sosDoctorPhone" type="tel" maxlength="10" placeholder="10-अंकीय डॉक्टर मोबाइल नंबर" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono font-bold" />
            <p class="text-[10px] text-slate-400 mt-1">अपने नजदीकी सरकारी या निजी पशु चिकित्सक का नंबर दर्ज करें।</p>
          </div>

          <button 
            type="button" 
            onclick="window.dispatchDoctorSosWhatsApp()" 
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition active:scale-98 flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>व्हाट्सएप पर तुरंत डॉक्टर को SOS अनुरोध भेजें (1-Click)</span>
          </button>
        </div>
      </div>
    `;
  }

  window.captureSosGps = function () {
    const input = document.getElementById('sosGpsCoordinates');
    if (!navigator.geolocation) {
      alert('आपके ब्राउज़र में GPS सुविधा उपलब्ध नहीं है।');
      return;
    }
    input.value = "GPS खोज जारी...";
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        input.value = coords;
      },
      err => {
        input.value = "";
        alert('लोकेशन प्राप्त नहीं हो सकी: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  window.dispatchDoctorSosWhatsApp = function () {
    const farmerName = document.getElementById('sosFarmerName')?.value.trim();
    const animal = document.getElementById('sosAnimalType')?.value;
    const level = document.getElementById('sosEmergencyLevel')?.value;
    const gps = document.getElementById('sosGpsCoordinates')?.value.trim();
    const problem = document.getElementById('sosProblemText')?.value.trim();
    const docPhone = document.getElementById('sosDoctorPhone')?.value.trim();

    if (!farmerName) {
      alert('कृपया अपना नाम व गांव दर्ज करें!');
      return;
    }
    if (!docPhone || docPhone.length < 10) {
      alert('कृपया डॉक्टर का वैध 10-अंकीय मोबाइल नंबर दर्ज करें!');
      return;
    }

    let mapLink = gps ? `https://maps.google.com/?q=${gps.replace(/\s+/g, '')}` : 'उपलब्ध नहीं';

    const msg = `🚨 *आपातकालीन पशु चिकित्सा अनुरोध (Vetcare AI OS)* 🚨\n\n` +
      `👤 *किसान का नाम:* ${farmerName}\n` +
      `🐾 *पशु:* ${animal}\n` +
      `⚠️ *आपातकाल स्तर:* ${level}\n` +
      `📝 *रोग के लक्षण:* ${problem || 'तत्काल परीक्षण आवश्यक'}\n` +
      `📍 *लाइव GPS मैप लोकेशन:* ${mapLink}\n\n` +
      `_कृपया शीघ्र अति शीघ्र संपर्क करने या पहुंचने की कृपा करें।_`;

    const cleanPhone = docPhone.replace(/\D/g, '').slice(-10);
    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  // =========================================================================
  // 9. AUTOMATIC BOOTSTRAPPING FOR SMART FARMER
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      // If landing state is already authenticated as farmer, trigger initialization
      const userStr = localStorage.getItem('vetcare_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.role === 'farmer') {
            window.initFarmerDashboard();
          }
        } catch (e) {}
      }
    });
  } else {
    const userStr = localStorage.getItem('vetcare_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === 'farmer') {
          window.initFarmerDashboard();
        }
      } catch (e) {}
    }
  }

})();
