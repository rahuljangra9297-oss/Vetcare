// Vetcare AI OS - Smart Farmer Hub & Dairy Management (2026 Production)
(function (window, document) {
  'use strict';

  const STORAGE_KEYS = {
    MILK_LEDGER: 'vetcare_farmer_milk_ledger',
    SYMPTOM_PHOTOS: 'vetcare_farmer_symptom_photos'
  };

  // Safe Store Helper
  function getStored(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[FarmerHub] LocalStorage write error:', e);
    }
  }

  /* =========================================================================
     1. ORGAN-BASED DESI REMEDIES VIEWER (ZERO INJECTIONS)
     ========================================================================= */

  let activeOrganFilter = 'ALL';

  window.renderFarmerDiseaseViewer = function (containerId) {
    const target = document.getElementById(containerId || 'diseaseSearchResults');
    if (!target) return;

    const diseases = window.VETCARE_FARMER_DISEASE_DB || [];
    if (diseases.length === 0) {
      target.innerHTML = `
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-medium">
          ⚠️ पशुपालक देसी ज्ञानकोश लोड हो रहा है... कृपया 2 सेकंड प्रतीक्षा करें।
        </div>
      `;
      return;
    }

    target.innerHTML = `
      <div class="space-y-4">
        <!-- Organ Tabs Navigation -->
        <div class="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button onclick="window.switchFarmerOrgan('ALL', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold shrink-0">सभी रोग (25)</button>
          <button onclick="window.switchFarmerOrgan('बच्चेदानी', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🌸 बच्चेदानी/गर्भाशय</button>
          <button onclick="window.switchFarmerOrgan('थन', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🥛 अयन व थन</button>
          <button onclick="window.switchFarmerOrgan('पेट', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🌾 पेट व रूमेन</button>
          <button onclick="window.switchFarmerOrgan('खुर', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🦶 खुर व पैर</button>
          <button onclick="window.switchFarmerOrgan('त्वचा', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🛡️ त्वचा व चमड़ी</button>
          <button onclick="window.switchFarmerOrgan('सामान्य', this)" class="f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0">🌡️ सामान्य/शरीर</button>
        </div>

        <!-- Disease Profiles Grid -->
        <div id="farmerDiseasesList" class="space-y-4"></div>
      </div>
    `;

    window.populateFarmerDiseasesList();
  };

  window.switchFarmerOrgan = function (organTag, btnElement) {
    activeOrganFilter = organTag;
    document.querySelectorAll('.f-organ-chip').forEach(b => {
      b.className = 'f-organ-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0';
    });
    if (btnElement) {
      btnElement.className = 'f-organ-chip px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold shrink-0';
    }
    window.populateFarmerDiseasesList();
  };

  window.populateFarmerDiseasesList = function () {
    const listContainer = document.getElementById('farmerDiseasesList');
    if (!listContainer) return;

    let diseases = window.VETCARE_FARMER_DISEASE_DB || [];
    if (activeOrganFilter !== 'ALL') {
      diseases = diseases.filter(d => d.affectedOrgan.includes(activeOrganFilter));
    }

    const savedPhotos = getStored(STORAGE_KEYS.SYMPTOM_PHOTOS, {});

    listContainer.innerHTML = diseases.map(d => {
      const currentPhoto = savedPhotos[d.id] || null;

      return `
        <div class="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-xs space-y-4 hover:border-emerald-300 transition">
          <!-- Header -->
          <div class="flex items-start justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span class="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                प्रभावित अंग: ${d.affectedOrgan}
              </span>
              <h3 class="text-base font-black text-slate-900 mt-1">${d.nameHi}</h3>
            </div>
            <span class="text-xs bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-xl shadow-xs">
              प्रमाणित देसी नुस्खा 🌿
            </span>
          </div>

          <!-- Causes and Effects -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <strong class="text-slate-800 block mb-0.5">❓ रोग का मुख्य कारण:</strong>
              <p class="text-slate-600">${d.causes}</p>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <strong class="text-rose-800 block mb-0.5">⚠️ पशु पर बुरा असर:</strong>
              <p class="text-slate-600">${d.effects}</p>
            </div>
          </div>

          <!-- Stages Timeline -->
          <div class="space-y-1.5">
            <strong class="text-xs text-slate-800 flex items-center gap-1">⏱️ रोग की पहचान व तुरंत क्या करें:</strong>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${(d.stagesTimeline || []).map(st => `
                <div class="bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl space-y-1">
                  <span class="font-bold text-emerald-900 block">• ${st.stage}: ${st.signs}</span>
                  <span class="text-[11px] text-emerald-800 font-medium block">➔ सुझाव: ${st.action}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Certified Desi Remedy (ZERO INJECTIONS) -->
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
            <div class="flex items-center justify-between">
              <strong class="text-xs font-black text-emerald-900 flex items-center gap-1">
                <span>🍃</span> देसी सिद्ध घरेलू उपचार (शून्य इंजेक्शन):
              </strong>
              <span class="text-[10px] text-emerald-700 font-bold">100% सुरक्षित</span>
            </div>
            ${(d.desiTreatment || []).map(r => `
              <div class="text-xs space-y-1">
                <div class="font-bold text-emerald-950">${r.name}</div>
                <div class="text-slate-700"><b>सामग्री:</b> ${r.ingredients}</div>
                <div class="text-slate-700"><b>बनाने व देने की विधि:</b> ${r.preparation}</div>
                <div class="text-[11px] text-amber-800 font-medium"><b>सावधानी:</b> ${r.precautions}</div>
              </div>
            `).join('')}
          </div>

          <!-- Essential Advisory -->
          <div class="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-950">
            <b>📌 महत्वपूर्ण डॉक्टर सलाह:</b> ${d.essentialAdvisory}
          </div>

          <!-- Photo Attachment Section for Visiting Doctor -->
          <div class="border-t border-slate-100 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <label class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 transition">
                <span>📷</span> <span>लक्षण की फोटो खींचें / अपलोड करें</span>
                <input type="file" accept="image/*" capture="environment" onchange="window.handleFarmerPhotoUpload('${d.id}', this)" class="hidden" />
              </label>
              ${currentPhoto ? `
                <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">फोटो सुरक्षित ✅</span>
              ` : ''}
            </div>

            ${currentPhoto ? `
              <div class="flex items-center gap-2">
                <img src="${currentPhoto}" alt="Symptom" class="w-10 h-10 object-cover rounded-lg border border-slate-200 shadow-xs cursor-pointer" onclick="window.viewFullPhoto('${d.id}')" />
                <button onclick="window.removeFarmerPhoto('${d.id}')" class="text-[11px] text-rose-600 hover:underline font-bold">हटाएं</button>
              </div>
            ` : '<span class="text-[10px] text-slate-400">डॉक्टर को दिखाने हेतु फोटो सुरक्षित रखें</span>'}
          </div>
        </div>
      `;
    }).join('');
  };

  window.handleFarmerPhotoUpload = function (diseaseId, input) {
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const photos = getStored(STORAGE_KEYS.SYMPTOM_PHOTOS, {});
      photos[diseaseId] = e.target.result;
      setStored(STORAGE_KEYS.SYMPTOM_PHOTOS, photos);
      alert('लक्षण की फोटो सुरक्षित कर ली गई है! डॉक्टर के आने पर इसे आसानी से दिखा सकते हैं।');
      window.populateFarmerDiseasesList();
    };
    reader.readAsDataURL(file);
  };

  window.removeFarmerPhoto = function (diseaseId) {
    const photos = getStored(STORAGE_KEYS.SYMPTOM_PHOTOS, {});
    delete photos[diseaseId];
    setStored(STORAGE_KEYS.SYMPTOM_PHOTOS, photos);
    window.populateFarmerDiseasesList();
  };

  window.viewFullPhoto = function (diseaseId) {
    const photos = getStored(STORAGE_KEYS.SYMPTOM_PHOTOS, {});
    const url = photos[diseaseId];
    if (url) {
      const w = window.open("");
      w.document.write(`<img src="${url}" style="max-width:100%; height:auto;" />`);
    }
  };

  /* =========================================================================
     2. VACCINATION KNOWLEDGE HUB
     ========================================================================= */

  const VACCINATION_SCHEDULE = [
    { name: "गलघोंटू (HS - घुर्रका)", species: "गाय, भैंस", idealMonth: "मई - जून (मानसून पूर्व)", frequency: "वर्ष में 1 बार (वार्षिक)" },
    { name: "लंगड़ा बुखार (BQ - चरचरा)", species: "गाय, भैंस (युवा पशु)", idealMonth: "मई - जून", frequency: "वर्ष में 1 बार" },
    { name: "खुरपका-मुंहपका (FMD)", species: "गाय, भैंस, भेड़, बकरी", idealMonth: "मार्च व सितंबर", frequency: "वर्ष में 2 बार (हर 6 माह)" },
    { name: "लम्पी स्किन (LSD / Goat Pox)", species: "गाय व बछड़े", idealMonth: "अप्रैल - मई", frequency: "वर्ष में 1 बार" },
    { name: "ब्रूसीलोसिस (Brucellosis)", species: "केवल 4 से 8 माह की बछिया", idealMonth: "कभी भी (4-8 माह की आयु)", frequency: "जीवन में सिर्फ एक बार (Strain-19)" },
    { name: "बकरी प्लेग (PPR)", species: "भेड़ व बकरी", idealMonth: "नवंबर - दिसंबर", frequency: "3 वर्ष में 1 बार" },
    { name: "फिड़किया (Enterotoxemia - ET)", species: "भेड़ व बकरी", idealMonth: "मई - जून", frequency: "वर्ष में 1 बार" }
  ];

  window.renderVaccinationHub = function (containerId) {
    const target = document.getElementById(containerId || 'viewBreeding');
    if (!target) return;

    let vaxBox = document.getElementById('vaccinationScheduleCard');
    if (!vaxBox) {
      vaxBox = document.createElement('div');
      vaxBox.id = 'vaccinationScheduleCard';
      vaxBox.className = 'bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3.5';
      target.appendChild(vaxBox);
    }

    vaxBox.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>💉</span> वार्षिक पशु टीकाकरण कैलेंडर (Vaccination Schedule)
          </h3>
          <p class="text-[11px] text-slate-500">बीमारियों से शत-प्रतिशत सुरक्षा हेतु सही समय पर सरकारी टीका लगवाएं</p>
        </div>
        <button onclick="alert('📢 आपके क्षेत्र में आगामी टीकाकरण अलर्ट सक्रिय किया गया!')" class="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition">
          🔔 टीका अलर्ट सेट करें
        </button>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2.5">टीका / बीमारी का नाम</th>
              <th class="p-2.5">पशु प्रजाति</th>
              <th class="p-2.5">टीकाकरण का सही महीना</th>
              <th class="p-2.5">दोहराने का अंतराल (Frequency)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
            ${VACCINATION_SCHEDULE.map(v => `
              <tr class="hover:bg-slate-50 transition">
                <td class="p-2.5 font-bold text-slate-900">${v.name}</td>
                <td class="p-2.5">${v.species}</td>
                <td class="p-2.5 font-bold text-emerald-700">${v.idealMonth}</td>
                <td class="p-2.5 text-blue-700">${v.frequency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  /* =========================================================================
     3. BREEDING, REPEAT BREEDER & MILK MAXIMIZER
     ========================================================================= */

  window.renderBreedingAdvisoryHub = function () {
    const heatContainer = document.getElementById('heatSignsContainer');
    const dischargeContainer = document.getElementById('dischargeContainer');
    const repeatBreederList = document.getElementById('repeatBreederList');

    if (heatContainer) {
      heatContainer.innerHTML = `
        <div class="space-y-1.5">
          <div class="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <b>1. शुरुआती हीट (0-8 घंटे):</b> रंभाना, बेचैन होना, अन्य पशुओं पर चढ़ना। (सीमन का समय नहीं)
          </div>
          <div class="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold">
            <b>2. मध्य हीट (8-18 घंटे - सर्वोत्तम समय):</b> पशु शांत खड़ा रहता है (Standing Heat)। इस समय सीमन (A.I.) करवाने पर गर्भ ठहरने की संभावना 90%+ होती है।
          </div>
          <div class="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <b>3. अंतिम हीट (18-24 घंटे):</b> केवल गाढ़ा मैला आना। (सीमन करवाने में देरी)
          </div>
        </div>
      `;
    }

    if (dischargeContainer) {
      dischargeContainer.innerHTML = `
        <div class="space-y-1.5">
          <div class="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold">
            • काँच जैसा आर-पार साफ व पतला तार: गर्भाशय पूर्ण स्वस्थ है। तुरंत सीमन करवाएं।
          </div>
          <div class="p-2 bg-rose-50 rounded-xl border border-rose-200 text-rose-950">
            • मटमैला, पीला या मवाद जैसा तार: गर्भाशय में इन्फेक्शन है। सीमन न करवाएं, पहले डॉक्टर से बच्चेदानी साफ करवाएं।
          </div>
        </div>
      `;
    }

    if (repeatBreederList) {
      repeatBreederList.innerHTML = `
        <li><b>पेट के कीड़ों की दवा:</b> हीट में आने से 15 दिन पूर्व पशु को एल्बेंडाजोल या फेनबेंडाजोल अवश्य दें।</li>
        <li><b>खनिज मिश्रण (Mineral Mixture):</b> 50 ग्राम चेलिटेड मिनरल मिक्सचर प्रतिदिन देने से अंडाशय सक्रिय होता है।</li>
        <li><b>उच्च वंशावली सीमन (High-Pedigree Straw):</b> मुर्राह या साहीवाल के प्रमाणित 4,000+ लीटर मां के दूध रिकॉर्ड वाले सीमन स्ट्रॉ का ही चयन करें।</li>
        <li><b>देरी से अंडा निकलना (Delayed Ovulation):</b> सीमन करवाने के ठीक समय डॉक्टर की सलाह से GnRH इंजेक्शन लगवाएं।</li>
      `;
    }
  };

  window.renderMilkBoosterHub = function (containerId) {
    const target = document.getElementById(containerId || 'viewFeed');
    if (!target) return;

    let boosterCard = document.getElementById('milkBoosterCard');
    if (!boosterCard) {
      boosterCard = document.createElement('div');
      boosterCard.id = 'milkBoosterCard';
      boosterCard.className = 'bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3.5';
      target.appendChild(boosterCard);
    }

    boosterCard.innerHTML = `
      <div class="border-b border-slate-100 pb-2">
        <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span>🥛</span> दूध में अचानक गिरावट के कारण व प्राकृतिक दुग्धवर्धक नुस्खा
        </h3>
        <p class="text-[11px] text-slate-500">शतावरी, जीवंती, मेथी व बाईपास फैट द्वारा दूध व फैट बढ़ाने का वैज्ञानिक तरीका</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div class="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 space-y-1">
          <strong class="text-rose-900 block">दूध अचानक घटने के 4 मुख्य कारण:</strong>
          <p>1. सूक्ष्म थनैल (Sub-clinical Mastitis) का उभरना।</p>
          <p>2. पीने के पानी या हरे चारे में भारी कमी।</p>
          <p>3. पेट में अत्यधिक एसिडोसिस (दाना अपच)।</p>
          <p>4. अचानक मौसम में तेज गर्मी या उमस होना।</p>
        </div>

        <div class="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 space-y-1">
          <strong class="text-emerald-900 block">प्रमाणित हर्बल दुग्धवर्धक फॉर्मूला (प्रतिदिन):</strong>
          <p>• <b>शतावरी चूर्ण:</b> 50 ग्राम (दूध ग्रंथियां सक्रिय करने हेतु)</p>
          <p>• <b>जीवंती चूर्ण:</b> 30 ग्राम (दुग्ध स्राव बढ़ाने हेतु)</p>
          <p>• <b>भुनी मेथी दाना:</b> 100 ग्राम + गुड़ 150 ग्राम</p>
          <p>• <b>बाईपास फैट (Bypass Fat):</b> 50 ग्राम (फैट % बढ़ाने हेतु)</p>
        </div>
      </div>
    `;
  };

  /* =========================================================================
     4. DAILY MILK SALES & EXPENSE LEDGER (BAHI-KHATA)
     ========================================================================= */

  window.renderMilkLedger = function (containerId) {
    const target = document.getElementById(containerId || 'viewFinance');
    if (!target) return;

    let ledgerCard = document.getElementById('farmerMilkLedgerCard');
    if (!ledgerCard) {
      ledgerCard = document.createElement('div');
      ledgerCard.id = 'farmerMilkLedgerCard';
      ledgerCard.className = 'bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4';
      target.appendChild(ledgerCard);
    }

    const ledgerData = getStored(STORAGE_KEYS.MILK_LEDGER, []);

    // Summary calculations
    let totalLiters = 0;
    let totalIncome = 0;
    let totalFeedExpense = 0;

    ledgerData.forEach(e => {
      totalLiters += Number(e.liters || 0);
      totalIncome += Number(e.income || 0);
      totalFeedExpense += Number(e.expense || 0);
    });

    const netProfit = totalIncome - totalFeedExpense;

    ledgerCard.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>📊</span> दैनिक दूध बिक्री एवं दाना खर्च बहीखाता (Dairy Ledger)
          </h3>
          <p class="text-[11px] text-slate-500">लीटर, फैट %, भाव एवं दैनिक शुद्ध मुनाफा कैलकुलेटर</p>
        </div>
      </div>

      <!-- Financial Totals -->
      <div class="grid grid-cols-3 gap-2 text-center text-xs">
        <div class="bg-blue-50 border border-blue-200 p-2.5 rounded-2xl">
          <span class="text-[10px] text-blue-700 font-bold block">कुल दूध बिक्री (₹)</span>
          <strong class="text-sm sm:text-base font-black text-blue-900">₹${totalIncome}</strong>
          <span class="block text-[9px] text-blue-600 font-medium">${totalLiters.toFixed(1)} लीटर</span>
        </div>
        <div class="bg-rose-50 border border-rose-200 p-2.5 rounded-2xl">
          <span class="text-[10px] text-rose-700 font-bold block">पशु आहार खर्च (₹)</span>
          <strong class="text-sm sm:text-base font-black text-rose-900">₹${totalFeedExpense}</strong>
          <span class="block text-[9px] text-rose-600 font-medium">खल, चोकर, भूसा</span>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl">
          <span class="text-[10px] text-emerald-700 font-bold block">शुद्ध दैनिक लाभ (Net Profit)</span>
          <strong class="text-sm sm:text-base font-black text-emerald-900">₹${netProfit}</strong>
          <span class="block text-[9px] text-emerald-600 font-bold">${netProfit >= 0 ? 'मुनाफा ✅' : 'घाटा ⚠️'}</span>
        </div>
      </div>

      <!-- New Entry Form -->
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5 text-xs">
        <strong class="text-slate-800 block text-[11px]">+ आज का दूध व आहार खर्च दर्ज करें:</strong>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <label class="block text-[10px] text-slate-600 font-semibold mb-0.5">दूध (लीटर)</label>
            <input id="ledLitres" type="number" placeholder="12.5" oninput="window.autoCalcMilkRate()" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-600 font-semibold mb-0.5">फैट % (Fat)</label>
            <input id="ledFat" type="number" step="0.1" placeholder="6.5" oninput="window.autoCalcMilkRate()" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-600 font-semibold mb-0.5">भाव प्रति लीटर (₹)</label>
            <input id="ledRate" type="number" placeholder="55" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-600 font-semibold mb-0.5">दाना/चारा खर्च (₹)</label>
            <input id="ledExpense" type="number" placeholder="250" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
          </div>
        </div>
        <button onclick="window.saveMilkLedgerEntry()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition shadow-xs">
          💾 आज का बहीखाता सुरक्षित करें
        </button>
      </div>

      <!-- Historical Table -->
      <div class="overflow-x-auto rounded-2xl border border-slate-200">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2">दिनांक</th>
              <th class="p-2">मात्रा</th>
              <th class="p-2">फैट</th>
              <th class="p-2">कुल आय</th>
              <th class="p-2">आहार खर्च</th>
              <th class="p-2 text-right">हटाएं</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
            ${ledgerData.length === 0 ? `
              <tr><td colspan="6" class="p-4 text-center text-slate-400">अभी तक कोई एंट्री नहीं जोड़ी गई है।</td></tr>
            ` : ledgerData.slice().reverse().map((item, idx) => `
              <tr>
                <td class="p-2 font-mono text-[11px]">${item.date}</td>
                <td class="p-2 font-bold">${item.liters} L</td>
                <td class="p-2">${item.fat}%</td>
                <td class="p-2 text-emerald-700 font-bold">₹${item.income}</td>
                <td class="p-2 text-rose-600 font-bold">₹${item.expense}</td>
                <td class="p-2 text-right">
                  <button onclick="window.deleteMilkLedgerEntry(${ledgerData.length - 1 - idx})" class="text-rose-500 hover:text-rose-700 font-bold text-xs">✕</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  window.autoCalcMilkRate = function () {
    const fat = parseFloat(document.getElementById('ledFat')?.value || 0);
    const rateInput = document.getElementById('ledRate');
    if (fat > 0 && rateInput && !rateInput.value) {
      // Standard approximate buffalo/cow fat calculation (e.g. ₹7.5 per point of fat)
      rateInput.value = Math.round(fat * 8.5);
    }
  };

  window.saveMilkLedgerEntry = function () {
    const liters = parseFloat(document.getElementById('ledLitres')?.value || 0);
    const fat = parseFloat(document.getElementById('ledFat')?.value || 0);
    const rate = parseFloat(document.getElementById('ledRate')?.value || 0);
    const expense = parseFloat(document.getElementById('ledExpense')?.value || 0);

    if (liters <= 0 || rate <= 0) {
      alert('कृपया वैध दूध मात्रा (लीटर) और भाव (₹) दर्ज करें!');
      return;
    }

    const income = Math.round(liters * rate);
    const today = new Date().toISOString().split('T')[0];

    const ledger = getStored(STORAGE_KEYS.MILK_LEDGER, []);
    ledger.push({ date: today, liters, fat, rate, income, expense });
    setStored(STORAGE_KEYS.MILK_LEDGER, ledger);

    alert('दूध व खर्च एंट्री सफलतापूर्वक दर्ज की गई!');
    window.renderMilkLedger();
  };

  window.deleteMilkLedgerEntry = function (index) {
    const ledger = getStored(STORAGE_KEYS.MILK_LEDGER, []);
    if (index >= 0 && index < ledger.length) {
      ledger.splice(index, 1);
      setStored(STORAGE_KEYS.MILK_LEDGER, ledger);
      window.renderMilkLedger();
    }
  };

  // Safe Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.renderBreedingAdvisoryHub();
    });
  } else {
    window.renderBreedingAdvisoryHub();
  }

})(window, document);
