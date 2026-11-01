// Vetcare AI OS - Smart Farmer Hub & Dairy Management (2026 Production)

(function (root) {
  "use strict";

  /* =========================================================================
     1. STORAGE KEYS & STATE BUFFER
     ========================================================================= */
  const STORAGE_KEYS = {
    LEDGER: "vetcare_farmer_ledger",
    SAVED_PHOTO: "vetcare_farmer_saved_photo"
  };

  let activeOrganTab = "ALL";
  let activeHubSection = "REMEDIES"; // REMEDIES | VACCINE | BREEDING | MILK_LEDGER

  function getStoredLedger() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEDGER);
      return data ? JSON.parse(data) : [
        { id: "TX_101", date: "2026-03-01", type: "INCOME", category: "दूध बिक्री", amount: 650, note: "सुबह व शाम 13 लीटर @ ₹50" },
        { id: "TX_102", date: "2026-03-01", type: "EXPENSE", category: "दाना/खल", amount: 220, note: "संतुलित पशुआहार 5 kg" }
      ];
    } catch (e) {
      console.error("Ledger storage error:", e);
      return [];
    }
  }

  function setStoredLedger(entries) {
    try {
      localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(entries));
    } catch (e) {
      console.error("Ledger write error:", e);
    }
  }

  /* =========================================================================
     2. MASTER FARMER HUB RENDERER
     ========================================================================= */
  root.renderFarmerHub = function (containerId = "screenMainApp") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-5 font-sans text-slate-800 pb-16">
        
        <!-- HUB TOP BANNER -->
        <div class="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
          <div class="relative z-10 space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-3xl">👨‍🌾</span>
              <h1 class="text-lg sm:text-xl font-black tracking-tight">स्मार्ट पशुपालक एवं आधुनिक डेयरी केंद्र</h1>
            </div>
            <p class="text-xs sm:text-sm text-emerald-100 max-w-xl">
              रोगों के सिद्ध घरेलू देसी नुस्खे, टीकाकरण कैलेंडर, नस्ल सुधार परामर्श एवं दैनिक दूध-खर्च बहीखाता।
            </p>
          </div>
          <div class="absolute -right-6 -bottom-6 text-8xl text-white/5 select-none font-black pointer-events-none">FARM</div>
        </div>

        <!-- 4 MAIN HUB NAVIGATION BUTTONS -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
          <button onclick="window.switchFarmerHubSection('REMEDIES')" class="py-3 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-1 shadow-xs ${activeHubSection === 'REMEDIES' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
            <span class="text-xl">🌿</span>
            <span>देसी उपचार (24 रोग)</span>
          </button>
          
          <button onclick="window.switchFarmerHubSection('VACCINE')" class="py-3 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-1 shadow-xs ${activeHubSection === 'VACCINE' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
            <span class="text-xl">🛡️</span>
            <span>टीकाकरण कैलेंडर</span>
          </button>

          <button onclick="window.switchFarmerHubSection('BREEDING')" class="py-3 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-1 shadow-xs ${activeHubSection === 'BREEDING' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
            <span class="text-xl">🧬</span>
            <span>नस्ल सुधार व A.I.</span>
          </button>

          <button onclick="window.switchFarmerHubSection('MILK_LEDGER')" class="py-3 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-1 shadow-xs ${activeHubSection === 'MILK_LEDGER' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
            <span class="text-xl">🥛</span>
            <span>दूध वृद्धि व बहीखाता</span>
          </button>
        </div>

        <!-- DYNAMIC SECTION CONTENT -->
        <div id="farmerHubActiveContent" class="space-y-4"></div>
      </div>
    `;

    root.renderActiveFarmerSection();
  };

  root.switchFarmerHubSection = function (sectionName) {
    activeHubSection = sectionName;
    root.renderActiveFarmerSection();
  };

  root.renderActiveFarmerSection = function () {
    const target = document.getElementById("farmerHubActiveContent");
    if (!target) return;

    if (activeHubSection === "REMEDIES") {
      root.renderOrganRemediesViewer(target);
    } else if (activeHubSection === "VACCINE") {
      root.renderFarmerVaccinationHub(target);
    } else if (activeHubSection === "BREEDING") {
      root.renderBreedingAdvisoryHub(target);
    } else if (activeHubSection === "MILK_LEDGER") {
      root.renderMilkMaximizerHub(target);
    }
  };

  /* =========================================================================
     3. SECTION 1: ORGAN-BASED HOME REMEDIES VIEWER (NO ALLOPATHIC INJECTIONS)
     ========================================================================= */
  root.renderOrganRemediesViewer = function (container) {
    const diseases = root.VETCARE_FARMER_DISEASE_DB || [];
    
    // Organ tab options
    const organTabs = [
      { id: "ALL", label: "सभी रोग" },
      { id: "बच्चेदानी", label: "🌸 बच्चेदानी" },
      { id: "थन", label: "🥛 थन व दूध" },
      { id: "पेट", label: "🌾 पेट व हाजमा" },
      { id: "खुर", label: "🦶 खुर व पैर" },
      { id: "त्वचा", label: "🛡️ त्वचा व शरीर" },
      { id: "सामान्य", label: "⚡ सामान्य रोग" }
    ];

    let filtered = diseases;
    if (activeOrganTab !== "ALL") {
      filtered = diseases.filter(d => d.affectedOrgan === activeOrganTab);
    }

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- ORGAN SELECTION TABS -->
        <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          ${organTabs.map(tab => `
            <button onclick="window.switchFarmerOrganTab('${tab.id}')" class="px-3.5 py-2 rounded-2xl shrink-0 font-bold transition shadow-xs ${activeOrganTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
              ${tab.label}
            </button>
          `).join("")}
        </div>

        <!-- CAMERA ATTACHMENT BOX FOR VISITING DOCTOR -->
        <div class="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📸</span>
            <div>
              <strong class="text-emerald-950 block">लक्षण / गोबर / थन की फोटो खींचें</strong>
              <span class="text-[11px] text-emerald-800">यह फोटो आपके फोन में सुरक्षित रहेगी ताकि डॉक्टर को स्थिति दिखाई जा सके।</span>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label class="cursor-pointer w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-center transition">
              <span>फोटो लें / अपलोड करें</span>
              <input type="file" accept="image/*" class="hidden" onchange="window.captureFarmerPhoto(event)" />
            </label>
            <span id="farmerPhotoStatus" class="text-[10px] text-slate-500 font-mono"></span>
          </div>
        </div>

        <!-- DISEASE CARDS LIST -->
        <div class="space-y-4">
          ${filtered.map(dis => root.renderFarmerDiseaseCard(dis)).join("")}
        </div>

      </div>
    `;
  };

  root.switchFarmerOrganTab = function (organ) {
    activeOrganTab = organ;
    const target = document.getElementById("farmerHubActiveContent");
    if (target) root.renderOrganRemediesViewer(target);
  };

  root.renderFarmerDiseaseCard = function (dis) {
    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 hover:shadow-md transition">
        
        <!-- CARD HEADER -->
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span class="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
              प्रभावित अंग: ${dis.affectedOrgan}
            </span>
            <h2 class="text-base sm:text-lg font-black text-slate-900 mt-1">${dis.nameHi}</h2>
          </div>
          <span class="text-2xl">🌿</span>
        </div>

        <!-- CAUSE & EFFECTS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
            <strong class="text-slate-800 block mb-0.5 font-bold">🔍 बीमारी का मुख्य कारण:</strong>
            <p class="text-slate-600 leading-relaxed">${dis.causes}</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
            <strong class="text-slate-800 block mb-0.5 font-bold">⚠️ पशु पर इसका प्रभाव:</strong>
            <p class="text-slate-600 leading-relaxed">${dis.effects}</p>
          </div>
        </div>

        <!-- CURRENT STATUS SIGNS -->
        <div class="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs">
          <strong class="text-blue-900 block mb-0.5 font-bold">👀 वर्तमान स्थिति की पहचान (लक्षण):</strong>
          <p class="text-blue-800 leading-relaxed">${dis.currentStatusSigns}</p>
        </div>

        <!-- 2-STAGE TIMELINE -->
        <div class="space-y-1.5 text-xs">
          <strong class="text-slate-800 block font-bold">⏱️ रोग की अवस्थाएं व तुरंत कदम:</strong>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${(dis.stagesTimeline || []).map(st => `
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span class="font-black text-slate-900 text-[11px] block text-emerald-700">● ${st.stage}</span>
                <p class="text-slate-600 text-[11px]"><strong>लक्षण:</strong> ${st.signs}</p>
                <p class="text-slate-700 text-[11px] font-bold"><strong>कदम:</strong> ${st.action}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- CERTIFIED DESI TREATMENT BOX (STRICTLY NO INJECTIONS) -->
        <div class="p-4 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-300 rounded-2xl space-y-2.5 text-xs">
          <div class="flex items-center gap-1.5 text-emerald-900 font-black text-xs sm:text-sm">
            <span>🍵</span> <span>प्रमाणित घरेलू देसी नुस्खा (Ethno-Veterinary Recipe):</span>
          </div>

          ${(dis.desiTreatment || []).map(t => `
            <div class="space-y-1 pt-1 border-t border-emerald-200/60 first:border-0 first:pt-0">
              <div class="font-bold text-emerald-950">${t.name}</div>
              <div class="text-slate-700"><strong>सामग्री:</strong> ${t.ingredients}</div>
              <div class="text-slate-700 leading-relaxed"><strong>बनाने व देने की विधि:</strong> ${t.preparation}</div>
              <div class="text-amber-900 font-bold text-[11px]">⚠️ सावधानी: ${t.precautions}</div>
            </div>
          `).join("")}
        </div>

        <!-- ESSENTIAL DOCTOR ADVISORY -->
        <div class="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs flex items-start gap-2">
          <span class="text-base shrink-0">🚨</span>
          <div>
            <strong>डॉक्टर को कब बुलाना अनिवार्य है:</strong>
            <p class="mt-0.5 leading-relaxed text-[11px]">${dis.essentialAdvisory}</p>
          </div>
        </div>

      </div>
    `;
  };

  root.captureFarmerPhoto = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem(STORAGE_KEYS.SAVED_PHOTO, e.target.result);
      const statusEl = document.getElementById("farmerPhotoStatus");
      if (statusEl) {
        statusEl.textContent = `✓ फोटो सुरक्षित (${(file.size / 1024).toFixed(0)} KB)`;
      }
      alert("फोटो आपके फोन में सुरक्षित कर ली गई है। जब डॉक्टर आएं, तो उन्हें यह फोटो अवश्य दिखाएं।");
    };
    reader.readAsDataURL(file);
  };

  /* =========================================================================
     4. SECTION 2: EXHAUSTIVE VACCINATION KNOWLEDGE HUB
     ========================================================================= */
  root.renderFarmerVaccinationHub = function (container) {
    const vaxList = root.VETCARE_VACCINATION_DB || [];

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-3xl space-y-1.5 text-xs text-blue-950">
          <h2 class="text-sm font-black text-blue-900 flex items-center gap-1.5">
            <span>🛡️</span> समय पर टीका लगाएं, पशु का जीवन और दूध बचाएं
          </h2>
          <p class="text-blue-800 leading-relaxed">
            टीकाकरण हमेशा स्वस्थ पशु को लगाया जाता है ताकि बीमारी आने ही न पाए। टीका लगने के 15 से 21 दिन बाद पशु के शरीर में सुरक्षा कवच (रोग प्रतिरोधक क्षमता) तैयार होता है।
          </p>
          <div class="pt-1 flex items-center gap-2 text-[11px] font-bold text-blue-900">
            <span>💡 सुनहरा नियम: टीका लगवाने से 10 दिन पूर्व पेट के कीड़े (पेट के कीड़े की दवा / Deworming) अवश्य दें।</span>
          </div>
        </div>

        <!-- VACCINATION CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${vaxList.map(vax => `
            <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
              <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <span class="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                    ${vax.idealAge}
                  </span>
                  <h3 class="text-sm font-black text-slate-900 mt-1">${vax.diseaseHi}</h3>
                </div>
                <span class="text-xl">💉</span>
              </div>

              <div class="space-y-1.5 text-xs text-slate-700">
                <div class="flex justify-between">
                  <span class="font-bold text-slate-500">टीके का नाम:</span>
                  <span class="font-medium text-slate-900 text-right text-[11px]">${vax.vaccineName}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-slate-500">लगाने का सर्वोत्तम महीना:</span>
                  <strong class="text-emerald-700 font-bold">${vax.season}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-slate-500">खुराक व लगाने का स्थान:</span>
                  <span class="font-medium">${vax.dose} (${vax.route})</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-slate-500">दोहराने का अंतराल (बूस्टर):</span>
                  <span class="font-medium text-blue-800 font-bold">${vax.boosterFrequency}</span>
                </div>
              </div>

              <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
                <strong>विशेष सावधानी:</strong> ${vax.precautions}
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    `;
  };

  /* =========================================================================
     5. SECTION 3: BREED IMPROVEMENT & REPEAT BREEDER ADVISORY HUB
     ========================================================================= */
  root.renderBreedingAdvisoryHub = function (container) {
    container.innerHTML = `
      <div class="space-y-4 text-xs sm:text-sm">
        
        <!-- HEADER -->
        <div class="p-4 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-3xl space-y-1.5 text-rose-950">
          <h2 class="text-sm sm:text-base font-black text-rose-900 flex items-center gap-1.5">
            <span>🧬</span> वैज्ञानिक नस्ल सुधार एवं बार-बार फिरने (Repeat Breeding) का समाधान
          </h2>
          <p class="text-rose-800 text-xs leading-relaxed">
            अच्छी नस्ल ही अधिक दूध और अधिक मुनाफे की कुंजी है। साधारण सीमन के बजाय हमेशा उच्च गुणवत्ता वाले प्रमाणित सीमन (High Genetic Merit Straws) का ही चयन करें।
          </p>
        </div>

        <!-- AM-PM RULE FOR PERFECT A.I. TIMING -->
        <div class="bg-white border-2 border-blue-300 rounded-3xl p-5 shadow-xs space-y-3">
          <div class="flex items-center gap-2 text-blue-900 font-black text-sm">
            <span>⏱️</span> <span>सीमन (A.I.) करवाने का विश्व-प्रसिद्ध 'सुबह-शाम नियम' (AM-PM Rule):</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
              <span class="font-black text-blue-900 text-xs block">1. सुबह मद (गर्मी) शुरू हो तो:</span>
              <p class="text-slate-700">यदि गाय-भैंस सुबह के समय रंभाना या साफ तार गिराना शुरू करे, तो उसी दिन <strong>शाम 4 से 7 बजे</strong> के बीच सीमन डलवाएं।</p>
            </div>

            <div class="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1">
              <span class="font-black text-amber-900 text-xs block">2. शाम को मद शुरू हो तो:</span>
              <p class="text-slate-700">यदि पशु शाम या रात को गर्मी में आए, तो अगली सुबह <strong>7 से 10 बजे</strong> के बीच कृत्रिम गर्भाधान (A.I.) करवाएं।</p>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 italic">
            * मद शुरू होने के 12 से 18 घंटे के बीच गर्भधारण की संभावना 90% तक सर्वाधिक होती है।
          </p>
        </div>

        <!-- 4 GOLDEN RULES TO CURE REPEAT BREEDING -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
          <h3 class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <span>🏆</span> बार-बार फिरने (Repeat Breeding) से बचने के 4 अचूक वैज्ञानिक नियम:
          </h3>

          <div class="space-y-2 text-xs">
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <div>
                <strong class="text-slate-900 block font-bold">खनिज मिश्रण (Mineral Mixture) की निरंतर खुराक:</strong>
                <p class="text-slate-600 text-[11px] mt-0.5">शरीर में फॉस्फोरस और कॉपर की कमी से अंडा समय पर नहीं फूटता। प्रतिदिन 50 ग्राम एगमार्क खनिज मिश्रण चारे में नियमित दें।</p>
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <div>
                <strong class="text-slate-900 block font-bold">पेट के कीड़े की दवा (Deworming Schedule):</strong>
                <p class="text-slate-600 text-[11px] mt-0.5">हर 3 माह में पशु को पेट के कीड़े की दवा बदल-बदल कर दें। कृमिग्रस्त पशु कभी भी आसानी से गर्भ नहीं ठहरा पाता।</p>
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <div>
                <strong class="text-slate-900 block font-bold">डिस्चार्ज (तार) की शुद्धता जांचें:</strong>
                <p class="text-slate-600 text-[11px] mt-0.5">सीमन केवल तभी करवाएं जब योनि से बिल्कुल पारदर्शी शीशे जैसा साफ और लचकदार तार गिर रहा हो। यदि तार में सफेद कफ या मैला हो, तो पहले डॉक्टर से गर्भाशय साफ करवाएं।</p>
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
              <div>
                <strong class="text-slate-900 block font-bold">सेक्स सॉर्टेड सीमन (Sexed Semen) का प्रयोग:</strong>
                <p class="text-slate-600 text-[11px] mt-0.5">केवल बछड़ी पैदा करने वाले सॉर्टेड सीमन का उपयोग करें ताकि अनुपयोगी नर बछड़ों की समस्या न रहे और डेयरी का दूध उत्पादन दोगुना हो सके।</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  };

  /* =========================================================================
     6. SECTION 4: MILK PRODUCTION MAXIMIZER & KHATA LEDGER
     ========================================================================= */
  root.renderMilkMaximizerHub = function (container) {
    const ledger = getStoredLedger();

    // Calculate totals
    const totalIncome = ledger.filter(l => l.type === "INCOME").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = ledger.filter(l => l.type === "EXPENSE").reduce((acc, curr) => acc + curr.amount, 0);
    const netProfit = totalIncome - totalExpense;

    container.innerHTML = `
      <div class="space-y-5 text-xs sm:text-sm">
        
        <!-- SECTION A: CERTIFIED GALACTAGOGUE DIET RECIPES -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
          <div class="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <span class="text-2xl">🥛</span>
            <div>
              <h2 class="font-black text-slate-900 text-sm sm:text-base">दूध उत्पादन बढ़ाने के सिद्ध देशी पौष्टिक फार्मूले</h2>
              <p class="text-[11px] text-slate-500">दूध बढ़ाने वाली प्राकृतिक जड़ी-बूटियां व संतुलित ऊर्जा राशन</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-1.5">
              <strong class="text-emerald-950 font-bold block text-xs">🌿 1. शतावरी, जीवंती व मेथी दुग्धवर्धक चूर्ण:</strong>
              <p class="text-slate-700 leading-relaxed text-[11px]">
                <strong>सामग्री:</strong> पीली शतावरी (50 ग्राम), जीवंती चूर्ण (30 ग्राम), भुनी मेथी दाना (50 ग्राम), सफेद मूसली (20 ग्राम)।
                <br><strong>विधि:</strong> बारीक कूटकर शाम के दाने में 500 ग्राम गुड़ के साथ मिलाकर ब्याने के 15 दिन बाद से लगातार 20 दिन तक खिलाएं।
              </p>
            </div>

            <div class="p-3.5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-1.5">
              <strong class="text-blue-950 font-bold block text-xs">⚡ 2. बाईपास फैट (Bypass Fat) व बिनौला खल:</strong>
              <p class="text-slate-700 leading-relaxed text-[11px]">
                उच्च दुग्ध उत्पादन वाली गाय-भैंसों को 100 ग्राम बाईपास फैट और 1 से 1.5 किग्रा उबली बिनौला खल दें। इससे दूध का फैट और एसएनएफ (SNF) तुरंत बढ़ता है।
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION B: DAILY MILK SALES & EXPENSE LEDGER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h2 class="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                <span>📊</span> किसान दैनिक दूध बिक्री व खर्च बहीखाता (Khata)
              </h2>
              <p class="text-[11px] text-slate-500">अपनी डेयरी के नफे-नुकसान का पूरा डिजिटल हिसाब रखें</p>
            </div>
            <button onclick="window.openNewLedgerEntryForm()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-xs">
              + नया हिसाब जोड़ें
            </button>
          </div>

          <!-- FINANCIAL KPI CARDS -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span class="text-slate-500 block text-[10px] sm:text-xs">कुल दूध बिक्री आय</span>
              <strong class="text-emerald-700 font-black text-sm sm:text-base font-mono">₹${totalIncome}</strong>
            </div>
            <div class="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <span class="text-slate-500 block text-[10px] sm:text-xs">कुल दाना/दवा खर्च</span>
              <strong class="text-rose-700 font-black text-sm sm:text-base font-mono">₹${totalExpense}</strong>
            </div>
            <div class="p-3 bg-blue-50 rounded-2xl border border-blue-200">
              <span class="text-slate-500 block text-[10px] sm:text-xs">शुद्ध डेयरी मुनाफा</span>
              <strong class="text-blue-700 font-black text-sm sm:text-base font-mono">₹${netProfit}</strong>
            </div>
          </div>

          <!-- NEW ENTRY FORM (COLLAPSIBLE) -->
          <div id="newLedgerEntryFormContainer" class="hidden p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h3 class="font-bold text-xs text-slate-900">नया लेन-देन दर्ज करें:</h3>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <input id="ledDate" type="date" value="${new Date().toISOString().split('T')[0]}" class="bg-white border border-slate-200 rounded-xl p-2 font-medium" />
              <select id="ledType" class="bg-white border border-slate-200 rounded-xl p-2 font-bold">
                <option value="INCOME">दूध बिक्री (आय +)</option>
                <option value="EXPENSE">दाना / चारा / दवा (खर्च -)</option>
              </select>
              <input id="ledAmount" type="number" placeholder="राशि (₹) *" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
              <input id="ledCategory" type="text" placeholder="श्रेणी (उदा. दूध, खल, तूड़ा)" class="bg-white border border-slate-200 rounded-xl p-2" />
            </div>
            <input id="ledNote" type="text" placeholder="विवरण (उदा. सुबह 12 लीटर @ ₹52)" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs" />
            <div class="flex justify-end gap-2">
              <button onclick="document.getElementById('newLedgerEntryFormContainer').classList.add('hidden')" class="px-3 py-1.5 rounded-xl bg-slate-200 font-bold text-xs text-slate-700">रद्द करें</button>
              <button onclick="window.saveNewFarmerLedgerEntry()" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs">सुरक्षित करें ➔</button>
            </div>
          </div>

          <!-- TRANSACTIONS LIST -->
          <div class="space-y-2">
            ${ledger.length === 0 ? `
              <div class="text-center py-6 text-slate-400 text-xs">अभी तक कोई एंट्री नहीं जोड़ी गई है।</div>
            ` : ledger.map(item => `
              <div class="p-3 rounded-2xl border flex items-center justify-between text-xs transition ${item.type === 'INCOME' ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}">
                <div>
                  <div class="font-bold text-slate-900 flex items-center gap-2">
                    <span>${item.category}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
                  </div>
                  <div class="text-slate-600 text-[11px] mt-0.5">${item.note || ''}</div>
                </div>
                <div class="flex items-center gap-2">
                  <strong class="font-mono text-sm ${item.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-700'}">
                    ${item.type === 'INCOME' ? '+' : '-'}₹${item.amount}
                  </strong>
                  <button onclick="window.deleteFarmerLedgerEntry('${item.id}')" class="text-slate-400 hover:text-rose-600 p-1 font-bold text-xs" title="हटाएं">✕</button>
                </div>
              </div>
            `).join("")}
          </div>

        </div>

      </div>
    `;
  };

  root.openNewLedgerEntryForm = function () {
    const el = document.getElementById("newLedgerEntryFormContainer");
    if (el) el.classList.remove("hidden");
  };

  root.saveNewFarmerLedgerEntry = function () {
    const date = document.getElementById("ledDate").value;
    const type = document.getElementById("ledType").value;
    const amount = parseFloat(document.getElementById("ledAmount").value);
    const category = document.getElementById("ledCategory").value.trim() || (type === "INCOME" ? "दूध बिक्री" : "दाना/खर्च");
    const note = document.getElementById("ledNote").value.trim();

    if (!amount || amount <= 0) {
      alert("कृपया वैध राशि (₹) दर्ज करें!");
      return;
    }

    const ledger = getStoredLedger();
    ledger.unshift({
      id: "TX_" + Date.now(),
      date,
      type,
      category,
      amount,
      note
    });

    setStoredLedger(ledger);
    const target = document.getElementById("farmerHubActiveContent");
    if (target) root.renderMilkMaximizerHub(target);
  };

  root.deleteFarmerLedgerEntry = function (entryId) {
    if (!confirm("क्या आप इस लेन-देन को हटाना चाहते हैं?")) return;
    let ledger = getStoredLedger();
    ledger = ledger.filter(l => l.id !== entryId);
    setStoredLedger(ledger);
    const target = document.getElementById("farmerHubActiveContent");
    if (target) root.renderMilkMaximizerHub(target);
  };

})(typeof window !== "undefined" ? window : global);
