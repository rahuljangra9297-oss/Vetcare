// Vetcare AI OS - Doctor Clinical Engine & Pharmacology (2026 Production)

(function (root) {
  "use strict";

  /* =========================================================================
     1. GLOBAL STATE & CLINICAL CASE BUFFER
     ========================================================================= */
  root.currentClinicalCase = {
    selectedSymptoms: {
      eyes: "NONE",
      skin: "NONE",
      udder: "NONE",
      urine: "NONE",
      dung: "NONE",
      temperature: "NORMAL",
      rumen: "NONE",
      respiration: "NONE"
    },
    attachedPhotoBase64: null,
    calculatedWeightKg: 400,
    selectedDisease: null
  };

  /* =========================================================================
     2. MULTI-ORGAN SYMPTOM MATRIX & PROBABILITY CALCULATOR
     ========================================================================= */

  root.renderDiagnosisMatrixUI = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sym = root.VETCARE_SYMPTOMS_BY_ORGAN || {};

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-5 font-sans text-slate-800">
        
        <!-- HEADER -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">🧬</span>
            <div>
              <h2 class="text-sm sm:text-base font-black text-slate-900 leading-tight">वैज्ञानिक अंग-आधारित रोग निदान इंजन</h2>
              <p class="text-[11px] text-slate-500">Multi-Organ Weighted Clinical Differential Engine</p>
            </div>
          </div>
          <button onclick="window.resetMatrixSelections()" class="text-xs text-rose-600 hover:text-rose-700 font-bold">रीसेट ↺</button>
        </div>

        <!-- 8 ORGAN DROPDOWNS GRID -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <!-- 1. EYES -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">👁️ आंख / श्लेष्मा (Eyes & Sclera)</label>
            <select id="selMatrixEyes" onchange="window.updateMatrixParam('eyes', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- सामान्य आंखें (Normal) --</option>
              ${(sym.eyes || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 2. SKIN & COAT -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">🛡️ त्वचा व शरीर (Skin & Swelling)</label>
            <select id="selMatrixSkin" onchange="window.updateMatrixParam('skin', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- सामान्य त्वचा (Normal) --</option>
              ${(sym.skin_coat || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 3. UDDER & TEATS -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">🥛 अयन / थन व दूध (Udder & Milk)</label>
            <select id="selMatrixUdder" onchange="window.updateMatrixParam('udder', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- स्वस्थ अयन/दूध (Normal) --</option>
              ${(sym.udder_teats || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 4. URINE -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">💧 मूत्र लक्षण (Urine Color & Stream)</label>
            <select id="selMatrixUrine" onchange="window.updateMatrixParam('urine', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- सामान्य पेशाब (Clear Straw) --</option>
              ${(sym.urine || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 5. DUNG / FECES -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">💩 गोबर लक्षण (Dung Consistency)</label>
            <select id="selMatrixDung" onchange="window.updateMatrixParam('dung', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- सामान्य बंधा गोबर (Normal) --</option>
              ${(sym.dung || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 6. BODY TEMPERATURE -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">🌡️ शारीरिक तापमान (Temperature)</label>
            <select id="selMatrixTemp" onchange="window.updateMatrixParam('temperature', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NORMAL">सामान्य ताप (101.0°F - 102.5°F)</option>
              <option value="MODERATE">मध्यम बुखार (103.0°F - 104.8°F)</option>
              <option value="HIGH">अति तीव्र ज्वर (105.0°F - 108.0°F)</option>
              <option value="SUBNORMAL">सब-नॉर्मल / ठंडा शरीर (&lt;100.0°F)</option>
            </select>
          </div>

          <!-- 7. RUMEN & ABDOMEN -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">🌾 रूमेन / पेट (Rumen & Flank)</label>
            <select id="selMatrixRumen" onchange="window.updateMatrixParam('rumen', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- नियमित जुगाली (Normal) --</option>
              ${(sym.rumen_abdomen || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

          <!-- 8. RESPIRATION -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 text-[11px]">🫁 श्वसन गति (Respiration & Sounds)</label>
            <select id="selMatrixRespiration" onchange="window.updateMatrixParam('respiration', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800 focus:border-blue-500">
              <option value="NONE">-- सामान्य श्वसन (15-30/min) --</option>
              ${(sym.respiration || []).map(o => `<option value="${o.id}">${o.hi}</option>`).join("")}
            </select>
          </div>

        </div>

        <!-- PHOTO UPLOAD & DIAGNOSIS BUTTON -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100">
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label class="cursor-pointer bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs">
              <span>📷</span> <span>थर्मामीटर / घाव की फोटो जोड़ें</span>
              <input type="file" accept="image/*" class="hidden" onchange="window.handleClinicalPhotoUpload(event)" />
            </label>
            <span id="photoUploadStatus" class="text-[11px] text-slate-500 font-medium">कोई फोटो संलग्न नहीं</span>
          </div>

          <button onclick="window.calculateDiseaseProbability()" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md shadow-blue-600/20 transition active:scale-98 flex items-center justify-center gap-2">
            <span>⚡ क्लिनिकल संभावना गणना करें</span>
          </button>
        </div>

        <!-- RESULTS INJECTION TARGET -->
        <div id="diseaseProbabilityResultsArea" class="space-y-4 pt-2"></div>
      </div>
    `;
  };

  root.updateMatrixParam = function (key, value) {
    root.currentClinicalCase.selectedSymptoms[key] = value;
  };

  root.resetMatrixSelections = function () {
    root.currentClinicalCase.selectedSymptoms = {
      eyes: "NONE",
      skin: "NONE",
      udder: "NONE",
      urine: "NONE",
      dung: "NONE",
      temperature: "NORMAL",
      rumen: "NONE",
      respiration: "NONE"
    };
    root.currentClinicalCase.attachedPhotoBase64 = null;
    const ids = ["selMatrixEyes", "selMatrixSkin", "selMatrixUdder", "selMatrixUrine", "selMatrixDung", "selMatrixRumen", "selMatrixRespiration"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "NONE";
    });
    const tempEl = document.getElementById("selMatrixTemp");
    if (tempEl) tempEl.value = "NORMAL";
    const statusEl = document.getElementById("photoUploadStatus");
    if (statusEl) statusEl.textContent = "कोई फोटो संलग्न नहीं";
    const resultsArea = document.getElementById("diseaseProbabilityResultsArea");
    if (resultsArea) resultsArea.innerHTML = "";
  };

  root.handleClinicalPhotoUpload = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      root.currentClinicalCase.attachedPhotoBase64 = e.target.result;
      const statusEl = document.getElementById("photoUploadStatus");
      if (statusEl) {
        statusEl.innerHTML = `✅ फोटो सुरक्षित (${(file.size / 1024).toFixed(0)} KB) <button onclick="window.previewAttachedPhoto()" class="text-blue-600 underline ml-1 font-bold">देखें</button>`;
      }
    };
    reader.readAsDataURL(file);
  };

  root.previewAttachedPhoto = function () {
    if (!root.currentClinicalCase.attachedPhotoBase64) return;
    const win = window.open("");
    win.document.write(`<img src="${root.currentClinicalCase.attachedPhotoBase64}" style="max-width:100%; height:auto;" />`);
  };

  /* PROBABILITY ENGINE MATHEMATICAL MATCHER */
  root.calculateDiseaseProbability = function () {
    const diseases = root.VETCARE_DISEASE_DB || [];
    const syms = root.currentClinicalCase.selectedSymptoms;
    const resultsArea = document.getElementById("diseaseProbabilityResultsArea");
    if (!resultsArea) return;

    const activeUserTokens = Object.values(syms).filter(v => v !== "NONE" && v !== "NORMAL");

    if (activeUserTokens.length === 0 && syms.temperature === "NORMAL") {
      resultsArea.innerHTML = `
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-semibold text-center">
          ⚠️ कृपया कम से कम 1 या 2 विशिष्ट लक्षण अथवा तापमान चुनें ताकि विभेदक निदान गणना हो सके।
        </div>
      `;
      return;
    }

    const ranked = diseases.map(dis => {
      let score = 0;
      let totalWeight = 0;
      const matchedSigns = [];

      // Cardinal signs matching (40% weight per match)
      (dis.cardinalSigns || []).forEach(sign => {
        totalWeight += 40;
        if (activeUserTokens.includes(sign)) {
          score += 40;
          matchedSigns.push(sign);
        }
      });

      // Temperature profile matching (20% weight)
      totalWeight += 20;
      const isHighTempDis = dis.tempRange.includes("105") || dis.tempRange.includes("Hyperpyrexia");
      const isSubnormalDis = dis.tempRange.includes("Subnormal") || dis.tempRange.includes("Hypothermia") || dis.tempRange.includes("96");

      if (syms.temperature === "HIGH" && isHighTempDis) {
        score += 20;
      } else if (syms.temperature === "SUBNORMAL" && isSubnormalDis) {
        score += 20;
      } else if (syms.temperature === "NORMAL" && !isHighTempDis && !isSubnormalDis) {
        score += 15;
      } else if (syms.temperature === "MODERATE" && dis.tempRange.includes("103")) {
        score += 20;
      }

      // Calculate percentage
      const probability = totalWeight > 0 ? Math.min(98, Math.round((score / totalWeight) * 100)) : 10;

      return {
        disease: dis,
        probability: Math.max(5, probability),
        matchedSigns: matchedSigns
      };
    });

    ranked.sort((a, b) => b.probability - a.probability);
    const topMatches = ranked.filter(r => r.probability >= 20).slice(0, 5);

    if (topMatches.length === 0) {
      resultsArea.innerHTML = `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-xs text-center font-medium">
          कोई सीधा मेल नहीं मिला। कृपया लक्षणों का पुनः परीक्षण करें या AI वेटरनरी सर्जन से परामर्श लें।
        </div>
      `;
      return;
    }

    resultsArea.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <span>🎯</span> संभावित विभेदक निदान तालिका (Differential Diagnosis):
          </h3>
          <span class="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            ${topMatches.length} रोग पाए गए
          </span>
        </div>

        <div class="space-y-3">
          ${topMatches.map((item, idx) => root.renderSuspectedDiseaseCard(item, idx === 0)).join("")}
        </div>
      </div>
    `;
  };

  root.renderSuspectedDiseaseCard = function (item, isTopMatch) {
    const d = item.disease;
    const probBadgeColor = item.probability >= 70
      ? "bg-rose-600 text-white"
      : (item.probability >= 45 ? "bg-amber-500 text-white" : "bg-blue-600 text-white");

    return `
      <div class="bg-white border ${isTopMatch ? 'border-blue-400 ring-2 ring-blue-500/10' : 'border-slate-200'} rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 transition">
        
        <!-- CARD HEADER -->
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-black text-slate-900">${d.nameHi}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg ${probBadgeColor}">
                ${item.probability}% संभावना
              </span>
            </div>
            <div class="text-[11px] font-mono text-slate-500">${d.nameEn} • [${d.category}]</div>
          </div>
          <button onclick="window.selectDiseaseForOPD('${d.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs">
            + पर्ची में जोड़ें
          </button>
        </div>

        <!-- LAB TESTS CONFIRMATORY TABLE -->
        ${d.labTests && d.labTests.length > 0 ? `
          <div class="space-y-1.5">
            <span class="text-[11px] font-bold text-blue-900 block">🔬 पुष्टिकरण प्रयोगशाला जांच (Confirmatory Lab Tests):</span>
            <div class="overflow-x-auto border border-slate-200 rounded-2xl">
              <table class="w-full text-left text-[11px] border-collapse bg-slate-50/50">
                <thead>
                  <tr class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th class="p-2">क्र.सं.</th>
                    <th class="p-2">जांच का नाम</th>
                    <th class="p-2">नमूना (Sample)</th>
                    <th class="p-2">अनुमानित MRP</th>
                    <th class="p-2">TAT (समय)</th>
                    <th class="p-2">पुष्टिकरण निष्कर्ष</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${d.labTests.map(t => `
                    <tr>
                      <td class="p-2 font-mono">${t.sNo}</td>
                      <td class="p-2 font-bold text-slate-800">${t.testName}</td>
                      <td class="p-2 text-slate-600">${t.sampleType}</td>
                      <td class="p-2 font-bold text-blue-700 font-mono">₹${t.approxMrp}</td>
                      <td class="p-2 text-slate-600">${t.tat}</td>
                      <td class="p-2 text-emerald-800 font-medium">${t.confirms}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- INLINE WEIGHT & DOSAGE CALCULATOR (Directly Embedded in Active Disease) -->
        <div class="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 rounded-2xl p-3.5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
            <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <span>⚖️</span> शेफर्स फॉर्मूला (Shaeffer's Weight & Dosage Calculator)
            </span>
            <span class="text-[11px] text-blue-700 font-bold font-mono" id="weightDisplay_${d.id}">वजन: 400 Kg</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 mb-0.5">सीने का घेरा (Girth - इंच)</label>
              <input type="number" id="girth_${d.id}" value="72" oninput="window.recalculateShaefferWeight('${d.id}')"
                class="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 mb-0.5">शरीर की लंबाई (Length - इंच)</label>
              <input type="number" id="length_${d.id}" value="60" oninput="window.recalculateShaefferWeight('${d.id}')"
                class="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold outline-none" />
            </div>
            <div class="col-span-2">
              <label class="block text-[10px] font-bold text-slate-600 mb-0.5">दवा चुनें (औषधि डोज़ कैलकुलेशन)</label>
              <select id="drugSelect_${d.id}" onchange="window.recalculateDrugDose('${d.id}')" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium outline-none">
                ${(d.treatment?.injections || []).map((inj, i) => `<option value="${i}">${inj.name} (${inj.salt})</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- COMPUTED DOSE BOX -->
          <div id="computedDoseBox_${d.id}" class="p-2.5 bg-blue-100/50 rounded-xl border border-blue-200 text-xs flex items-center justify-between">
            <span class="font-bold text-blue-900">सटीक चिकित्सीय मात्रा (Recommended Dose):</span>
            <strong id="computedDoseVal_${d.id}" class="text-blue-800 font-mono text-sm">गणना हेतु दवा चुनें</strong>
          </div>
        </div>

        <!-- 5-STAGE TREATMENT PROTOCOL SUMMARY -->
        <div class="space-y-2 text-xs">
          <span class="font-bold text-slate-800 block">💉 अनुशंसित एलोपैथिक इंजेक्शन तालिका:</span>
          <div class="grid grid-cols-1 gap-2">
            ${(d.treatment?.injections || []).map(inj => `
              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <div class="font-bold text-slate-900">${inj.name}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${inj.salt} • रूट: ${inj.route}</div>
                  <div class="text-[10px] ${inj.pregnancySafe ? 'text-emerald-700' : 'text-rose-600'} font-bold">
                    ${inj.pregnancySafe ? '✓ गाभिन सुरक्षित (Pregnancy Safe)' : '⚠️ गाभिन में असुरक्षित / सावधानी'}
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <div class="font-bold text-blue-700">${inj.ethicalBrand}</div>
                  <div class="text-[10px] text-slate-500">MRP: ₹${inj.mrpEthical}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;
  };

  /* =========================================================================
     3. SHAEFFER'S WEIGHT & DOSE CALCULATION CORE
     ========================================================================= */

  root.recalculateShaefferWeight = function (diseaseId) {
    const girthEl = document.getElementById(`girth_${diseaseId}`);
    const lengthEl = document.getElementById(`length_${diseaseId}`);
    const dispEl = document.getElementById(`weightDisplay_${diseaseId}`);

    if (!girthEl || !lengthEl || !dispEl) return;

    const girth = parseFloat(girthEl.value) || 0;
    const length = parseFloat(lengthEl.value) || 0;

    // Shaeffer's Formula: Weight in lbs = (Girth in inches)^2 * (Length in inches) / 300
    // Weight in kg = lbs * 0.453592
    const weightLbs = (girth * girth * length) / 300;
    const weightKg = Math.round(weightLbs * 0.45359237);

    root.currentClinicalCase.calculatedWeightKg = weightKg;
    dispEl.textContent = `वजन: ${weightKg} Kg (${Math.round(weightLbs)} lbs)`;

    root.recalculateDrugDose(diseaseId);
  };

  root.recalculateDrugDose = function (diseaseId) {
    const disease = (root.VETCARE_DISEASE_DB || []).find(d => d.id === diseaseId);
    if (!disease || !disease.treatment?.injections) return;

    const drugSelect = document.getElementById(`drugSelect_${diseaseId}`);
    const doseBox = document.getElementById(`computedDoseVal_${diseaseId}`);
    if (!drugSelect || !doseBox) return;

    const selectedIdx = parseInt(drugSelect.value, 10) || 0;
    const drug = disease.treatment.injections[selectedIdx];
    if (!drug) return;

    const weightKg = root.currentClinicalCase.calculatedWeightKg || 400;

    // Automated dosage logic based on drug dose string heuristics
    let calculatedDoseString = drug.dose;

    if (drug.dose.includes("mg/kg")) {
      const match = drug.dose.match(/([\d\.]+)\s*mg\/kg/);
      if (match) {
        const mgPerKg = parseFloat(match[1]);
        const totalMg = Math.round(mgPerKg * weightKg);
        calculatedDoseString = `${totalMg} mg कुल मात्रा (भार: ${weightKg} kg के अनुसार)`;
      }
    } else if (drug.dose.includes("IU/kg")) {
      const match = drug.dose.match(/([\d\,]+)\s*IU\/kg/);
      if (match) {
        const iu = parseFloat(match[1].replace(",", ""));
        const totalIU = Math.round((iu * weightKg) / 100000);
        calculatedDoseString = `${totalIU} लाख IU (${weightKg} kg भार हेतु)`;
      }
    } else if (drug.dose.includes("ml/kg") || drug.dose.includes("ml per")) {
      calculatedDoseString = `${drug.dose} • भार: ${weightKg} Kg`;
    }

    doseBox.textContent = calculatedDoseString;
  };

  root.selectDiseaseForOPD = function (diseaseId) {
    const disease = (root.VETCARE_DISEASE_DB || []).find(d => d.id === diseaseId);
    if (!disease) return;

    const opdDiagInput = document.getElementById("opdDiagnosis");
    const opdMedInput = document.getElementById("opdMedicine");

    if (opdDiagInput) {
      opdDiagInput.value = disease.nameHi;
    }

    if (opdMedInput) {
      const rxLines = (disease.treatment?.injections || []).map((inj, idx) => {
        return `${idx + 1}. Inj. ${inj.ethicalBrand} (${inj.dose}) - रूट: ${inj.route}`;
      }).join("\n");

      opdMedInput.value = rxLines;
    }

    // Switch to OPD tab if switchTab function exists
    if (typeof root.switchTab === "function") {
      root.switchTab("rx");
    }

    alert(`'${disease.nameHi}' का उपचार डिजिटल पर्ची में सफलतापूर्वक जोड़ दिया गया है।`);
  };

  /* =========================================================================
     4. ADVANCED VETERINARY DRUGS PHARMACOPEIA (दवा ज्ञानकोश)
     ========================================================================= */

  root.renderMedicinesPharmacopeia = function (category = "ALL", type = "ALL", sort = "NAME_ASC", query = "") {
    const container = document.getElementById("pharmacopeiaContainer");
    if (!container) return;

    let drugs = root.VETCARE_MEDICINES_DB || [];
    const q = (query || "").toLowerCase().trim();

    // 1. Filter by category
    if (category !== "ALL") {
      drugs = drugs.filter(d => d.category.toUpperCase().includes(category.toUpperCase()));
    }

    // 2. Filter by search query
    if (q) {
      drugs = drugs.filter(d => {
        const saltMatch = (d.salt || "").toLowerCase().includes(q);
        const ethMatch = (d.ethicalBrand?.name || "").toLowerCase().includes(q) || (d.ethicalBrand?.company || "").toLowerCase().includes(q);
        const genMatch = (d.genericOption?.name || "").toLowerCase().includes(q);
        const indMatch = (d.indications || []).some(ind => ind.toLowerCase().includes(q));
        return saltMatch || ethMatch || genMatch || indMatch;
      });
    }

    // 3. Sorting
    drugs.sort((a, b) => {
      if (sort === "NAME_ASC") return (a.ethicalBrand?.name || "").localeCompare(b.ethicalBrand?.name || "");
      if (sort === "NAME_DESC") return (b.ethicalBrand?.name || "").localeCompare(a.ethicalBrand?.name || "");
      if (sort === "PRICE_LOW") return (a.ethicalBrand?.approxMrp || 0) - (b.ethicalBrand?.approxMrp || 0);
      if (sort === "PRICE_HIGH") return (b.ethicalBrand?.approxMrp || 0) - (a.ethicalBrand?.approxMrp || 0);
      return 0;
    });

    // 4. Render or Fallback to Gemini 2.5 Flash
    if (drugs.length === 0 && q) {
      container.innerHTML = `
        <div class="bg-purple-50 border border-purple-200 rounded-3xl p-6 text-center space-y-4">
          <div class="w-12 h-12 bg-purple-600 text-white rounded-2xl mx-auto flex items-center justify-center text-xl shadow-md">🤖</div>
          <div>
            <h3 class="text-sm sm:text-base font-black text-purple-950">'${query}' स्थानीय दवा सूची में उपलब्ध नहीं है</h3>
            <p class="text-xs text-purple-700 mt-1">क्या आप वेटरनरी AI फार्माकोलॉजिस्ट से इसका संपूर्ण क्लिनिकल प्रोफाइल जानना चाहते हैं?</p>
          </div>
          <button onclick="window.fetchUnlistedDrugAI('${query}')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-purple-600/20 transition active:scale-98">
            ⚡ AI से '${query}' की संपूर्ण फार्माकोलॉजी जानें
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>कुल दवाएं: ${drugs.length}</span>
          <span>प्रकार: ${type === 'ETHICAL' ? 'केवल एथिकल' : (type === 'GENERIC' ? 'केवल जेनेरिक' : 'एथिकल व जेनेरिक दोनों')}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${drugs.map(drug => root.renderDrugCard(drug, type)).join("")}
        </div>
      </div>
    `;
  };

  root.renderDrugCard = function (drug, typeFilter) {
    const showEthical = typeFilter === "ALL" || typeFilter === "ETHICAL";
    const showGeneric = typeFilter === "ALL" || typeFilter === "GENERIC";

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5 hover:shadow-md transition">
        
        <!-- CARD HEADER -->
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <span class="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md border border-blue-200 uppercase">${drug.category}</span>
            <h3 class="text-sm font-black text-slate-900 mt-1">${drug.salt}</h3>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded ${drug.pregnancySafe ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
            ${drug.pregnancySafe ? '✓ गाभिन सुरक्षित' : '⚠️ गाभिन में वर्जित'}
          </span>
        </div>

        <!-- PRICING & BRANDS (DUAL ETHICAL vs GENERIC) -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          ${showEthical ? `
            <div class="p-2.5 bg-blue-50/40 border border-blue-200 rounded-2xl">
              <span class="text-[10px] font-bold text-blue-700 block">एथिकल (Branded)</span>
              <strong class="text-slate-900 block">${drug.ethicalBrand?.name || 'N/A'}</strong>
              <span class="text-[10px] text-slate-500 block">${drug.ethicalBrand?.company || ''}</span>
              <span class="text-xs font-black text-blue-900 font-mono mt-1 block">₹${drug.ethicalBrand?.approxMrp || 0}</span>
            </div>
          ` : ''}

          ${showGeneric ? `
            <div class="p-2.5 bg-emerald-50/40 border border-emerald-200 rounded-2xl">
              <span class="text-[10px] font-bold text-emerald-700 block">जेनेरिक (Low Cost)</span>
              <strong class="text-slate-900 block">${drug.genericOption?.name || 'N/A'}</strong>
              <span class="text-[10px] text-slate-500 block">गुणवत्ता जेनेरिक साल्ट</span>
              <span class="text-xs font-black text-emerald-900 font-mono mt-1 block">₹${drug.genericOption?.approxMrp || 0}</span>
            </div>
          ` : ''}
        </div>

        <!-- CLINICAL DOSAGE & WITHDRAWAL -->
        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between text-slate-700">
            <span class="font-bold">डोज़ रेट:</span>
            <span class="font-mono font-medium">${drug.doseRate}</span>
          </div>
          <div class="flex justify-between text-slate-700">
            <span class="font-bold">रूट:</span>
            <span class="font-medium">${drug.route}</span>
          </div>
          <div class="flex justify-between text-slate-700">
            <span class="font-bold">दूध निकासी (Withdrawal):</span>
            <span class="font-medium text-amber-800">${drug.withdrawalPeriod?.milk || 'Zero'}</span>
          </div>
        </div>

        <!-- INDICATIONS CHIPS -->
        <div class="flex flex-wrap gap-1 pt-1">
          ${(drug.indications || []).map(ind => `
            <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">${ind}</span>
          `).join("")}
        </div>

      </div>
    `;
  };

  /* =========================================================================
     5. UNLISTED DRUG AI FALLBACK (GEMINI FLASH INTEGRATION)
     ========================================================================= */

  root.fetchUnlistedDrugAI = async function (drugQuery) {
    const container = document.getElementById("pharmacopeiaContainer");
    if (!container) return;

    const apiKey = localStorage.getItem("gemini_api_key");
    if (!apiKey) {
      alert("कृपया पहले सेटिंग्स से अपनी Google Gemini API Key दर्ज करें!");
      if (typeof root.openAIKeyModal === "function") root.openAIKeyModal();
      return;
    }

    container.innerHTML = `
      <div class="p-8 text-center space-y-3 bg-white border border-slate-200 rounded-3xl">
        <div class="inline-block animate-spin text-3xl">⏳</div>
        <p class="text-xs font-bold text-slate-700">Gemini AI से '${drugQuery}' की वेटरनरी फार्माकोलॉजी तैयार की जा रही है...</p>
      </div>
    `;

    const systemPrompt = `You are a Principal Veterinary Pharmacologist. For the requested veterinary drug query: "${drugQuery}", return ONLY a strict valid JSON object (no markdown, no backticks, no wrap text) with this exact schema:
    {
      "salt": "Full Chemical Salt Name with strength",
      "category": "Antibiotic | NSAID | Antiprotozoal | Hormone | Supportive | Anthelmintic",
      "ethicalBrand": { "name": "Leading Indian Brand", "company": "Manufacturer Name", "approxMrp": 250 },
      "genericOption": { "name": "Generic Brand Equivalent", "approxMrp": 95 },
      "doseRate": "Accurate veterinary dose in mg/kg",
      "route": "I/M, I/V, S/C or Oral",
      "pregnancySafe": true or false,
      "withdrawalPeriod": { "milk": "X days", "meat": "Y days" },
      "indications": ["Indication 1", "Indication 2", "Indication 3"],
      "contraindications": ["Contraindication 1", "Contraindication 2"]
    }`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }]
        })
      });

      const resData = await response.json();
      let text = resData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const parsedDrug = JSON.parse(text);

      container.innerHTML = `
        <div class="space-y-3">
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center justify-between">
            <span>✨ AI द्वारा जनरेटेड क्लिनिकल फार्माकोलॉजी</span>
            <button onclick="window.saveAIDrugToLocal(${JSON.stringify(parsedDrug).replace(/"/g, '&quot;')})" class="bg-emerald-600 text-white px-3 py-1 rounded-xl text-[11px]">
              + ज्ञानकोश में सुरक्षित करें
            </button>
          </div>
          ${root.renderDrugCard(parsedDrug, "ALL")}
        </div>
      `;
    } catch (err) {
      console.error("Gemini Drug Fetch Error:", err);
      container.innerHTML = `
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-medium text-center">
          AI से जानकारी प्राप्त करने में त्रुटि: ${err.message || 'API कुंजी या नेटवर्क जांचें'}
        </div>
      `;
    }
  };

  root.saveAIDrugToLocal = function (drugObj) {
    if (!root.VETCARE_MEDICINES_DB) root.VETCARE_MEDICINES_DB = [];
    drugObj.id = "DRUG_AI_" + Date.now();
    root.VETCARE_MEDICINES_DB.unshift(drugObj);
    alert(`'${drugObj.salt}' को ज्ञानकोश में सुरक्षित कर लिया गया है।`);
    root.renderMedicinesPharmacopeia("ALL", "ALL", "NAME_ASC", "");
  };

})(typeof window !== "undefined" ? window : global);
