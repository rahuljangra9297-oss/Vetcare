// Vetcare AI OS - Doctor Clinical Engine & Pharmacology (2026 Production)
(function (window, document) {
  'use strict';

  // 1. SELF-CONTAINED RESILIENT ORGAN DATA (NEVER FREEZE UI)
  window.VETCARE_SYMPTOMS_BY_ORGAN = window.VETCARE_SYMPTOMS_BY_ORGAN || {
    eyes: ["सामान्य गुलाबी", "रक्त-संकुल लाल", "सफेद/फीका (एनीमिक)", "पीलिया पीला", "नीला"],
    skin: ["सामान्य", "गांठदार सूजन (Lumps)", "खुरदुरी/रूखी", "चकत्ते/घाव", "खुजली/बाल झड़ना"],
    udder: ["सामान्य", "गर्म व सूजा हुआ", "गांठ/कड़ापन", "फाइब्रोसिस/मकड़ी", "दूध में खून/छीछड़े"],
    urine: ["सामान्य", "लाल/कॉफी जैसा (Hemoglobinuria)", "गहरा पीला", "मटमैला/झागदार", "रुक-रुक कर दर्द"],
    dung: ["सामान्य", "पतला बदबूदार दस्त", "खूनी आंवयुक्त", "सूखा व सख्त काला", "अपचित दाना"],
    temp: ["हाइपोथर्मिया (<100°F)", "सामान्य (101-102.5°F)", "मध्यम ज्वर (103-104°F)", "अति-तीव्र ज्वर (>105°F)"],
    rumen: ["सामान्य 2-3 गति/2 मिनट", "सुस्त जुगाली", "पूर्ण बंद", "आफरा/झागदार"],
    respiration: ["सामान्य", "तेज हाँफना", "घरघराहट/खांसी", "मुंह खोलकर सांस लेना"]
  };

  // State tracker for Matrix selections
  let organSelections = {
    eyes: "सामान्य गुलाबी",
    skin: "सामान्य",
    udder: "सामान्य",
    urine: "सामान्य",
    dung: "सामान्य",
    temp: "सामान्य (101-102.5°F)",
    rumen: "सामान्य 2-3 गति/2 मिनट",
    respiration: "सामान्य"
  };

  /* =========================================================================
     2. VETERINARY DRUGS PHARMACOPEIA (30+ DRUGS WITH ETHICAL & GENERIC DATA)
     ========================================================================= */
  const PHARMACOPEIA_DB = [
    { id: "DRUG_01", name: "Ceftiofur Sodium", salt: "Ceftiofur 1g", cat: "ANTIBIOTIC", ethicalBrand: "Xyrofur 1g", genericOption: "Ceftiofur Inj", mrpEthical: 480, mrpGeneric: 210, doseMgKg: 1.5, concMgMl: 50, route: "IM", pregSafe: true },
    { id: "DRUG_02", name: "Ceftriaxone + Sulbactam", salt: "Ceftriaxone 3g + Sulbactam 1.5g", cat: "ANTIBIOTIC", ethicalBrand: "Intacef Tazo 4.5g", genericOption: "Ceftri-Sulbact 4.5g", mrpEthical: 520, mrpGeneric: 240, doseMgKg: 10, concMgMl: 150, route: "IV/IM", pregSafe: true },
    { id: "DRUG_03", name: "Enrofloxacin", salt: "Enrofloxacin 100mg/ml", cat: "ANTIBIOTIC", ethicalBrand: "Floxidin LA", genericOption: "Enrocin Inj", mrpEthical: 280, mrpGeneric: 110, doseMgKg: 5, concMgMl: 100, route: "IM", pregSafe: true },
    { id: "DRUG_04", name: "Amoxicillin + Sulbactam", salt: "Amoxicillin 3g + Sulbactam 1.5g", cat: "ANTIBIOTIC", ethicalBrand: "Amoxirum Forte 4.5g", genericOption: "Amoxi-Sulbact 4.5g", mrpEthical: 390, mrpGeneric: 180, doseMgKg: 10, concMgMl: 150, route: "IM", pregSafe: true },
    { id: "DRUG_05", name: "Oxytetracycline LA", salt: "Oxytetracycline 200mg/ml", cat: "ANTIBIOTIC", ethicalBrand: "Terramycin LA", genericOption: "Oxytetracycline LA", mrpEthical: 220, mrpGeneric: 90, doseMgKg: 20, concMgMl: 200, route: "Deep IM", pregSafe: false },
    { id: "DRUG_06", name: "Procaine Penicillin", salt: "Penicillin G 40 Lac IU", cat: "ANTIBIOTIC", ethicalBrand: "Pronapen", genericOption: "Procaine Penicillin", mrpEthical: 160, mrpGeneric: 75, doseMgKg: 20, concMgMl: 100, route: "IM", pregSafe: true },
    { id: "DRUG_07", name: "Gentamicin", salt: "Gentamicin Sulfate 40mg/ml", cat: "ANTIBIOTIC", ethicalBrand: "Gentacip 100ml", genericOption: "Gentamicin Inj", mrpEthical: 120, mrpGeneric: 50, doseMgKg: 4, concMgMl: 40, route: "IM/IV", pregSafe: true },
    { id: "DRUG_08", name: "Marbofloxacin", salt: "Marbofloxacin 100mg/ml", cat: "ANTIBIOTIC", ethicalBrand: "Marbocyl 10%", genericOption: "Marboflox Inj", mrpEthical: 650, mrpGeneric: 310, doseMgKg: 2, concMgMl: 100, route: "IM/SC", pregSafe: true },
    { id: "DRUG_09", name: "Meloxicam + Paracetamol", salt: "Meloxicam 5mg + Paracetamol 150mg/ml", cat: "NSAID", ethicalBrand: "Melonex Plus 100ml", genericOption: "Meloxi-P 100ml", mrpEthical: 180, mrpGeneric: 80, doseMgKg: 0.5, concMgMl: 5, route: "IM", pregSafe: true },
    { id: "DRUG_10", name: "Flunixin Meglumine", salt: "Flunixin 50mg/ml", cat: "NSAID", ethicalBrand: "Megludyne 50ml", genericOption: "Flunixin Inj 50ml", mrpEthical: 260, mrpGeneric: 110, doseMgKg: 2.2, concMgMl: 50, route: "IV/IM", pregSafe: true },
    { id: "DRUG_11", name: "Ketoprofen", salt: "Ketoprofen 100mg/ml", cat: "NSAID", ethicalBrand: "Neoprofen 100ml", genericOption: "Ketovet Inj", mrpEthical: 210, mrpGeneric: 95, doseMgKg: 3, concMgMl: 100, route: "IM/IV", pregSafe: true },
    { id: "DRUG_12", name: "Isoflupredone Acetate", salt: "Isoflupredone 2mg/ml", cat: "CORTICOSTEROID", ethicalBrand: "Predef 2X 10ml", genericOption: "Isoflupredone 10ml", mrpEthical: 320, mrpGeneric: 150, doseMgKg: 0.05, concMgMl: 2, route: "IM", pregSafe: true },
    { id: "DRUG_13", name: "Dexamethasone Sodium", salt: "Dexamethasone 4mg/ml", cat: "CORTICOSTEROID", ethicalBrand: "Dexona Vet 30ml", genericOption: "Dexa Inj 30ml", mrpEthical: 65, mrpGeneric: 28, doseMgKg: 0.1, concMgMl: 4, route: "IV/IM", pregSafe: false },
    { id: "DRUG_14", name: "Buparvaquone", salt: "Buparvaquone 50mg/ml", cat: "ANTIPROTOZOAL", ethicalBrand: "Butalex 20ml", genericOption: "Zubion / Bupavet 20ml", mrpEthical: 1250, mrpGeneric: 650, doseMgKg: 2.5, concMgMl: 50, route: "Deep IM", pregSafe: true },
    { id: "DRUG_15", name: "Diminazene Aceturate", salt: "Diminazene 70mg/ml", cat: "ANTIPROTOZOAL", ethicalBrand: "Berenil RTU 30ml", genericOption: "Diminazene Inj 30ml", mrpEthical: 190, mrpGeneric: 90, doseMgKg: 3.5, concMgMl: 70, route: "Deep IM", pregSafe: true },
    { id: "DRUG_16", name: "Ivermectin", salt: "Ivermectin 10mg/ml", cat: "ANTHELMINTIC", ethicalBrand: "Neomec / Ivomec", genericOption: "Iverchem 10ml", mrpEthical: 120, mrpGeneric: 50, doseMgKg: 0.2, concMgMl: 10, route: "SC Only", pregSafe: true },
    { id: "DRUG_17", name: "Fenbendazole Bolus", salt: "Fenbendazole 3g", cat: "ANTHELMINTIC", ethicalBrand: "Panacur 3g", genericOption: "Fenbendazole 3g Bolus", mrpEthical: 110, mrpGeneric: 45, doseMgKg: 7.5, concMgMl: 3000, route: "Oral", pregSafe: true },
    { id: "DRUG_18", name: "Toldimphos Sodium + B12", salt: "Toldimphos 200mg/ml", cat: "SUPPORTIVE", ethicalBrand: "Tonophosphan 30ml", genericOption: "Phosphovet 30ml", mrpEthical: 260, mrpGeneric: 120, doseMgKg: 2, concMgMl: 200, route: "IM/IV", pregSafe: true },
    { id: "DRUG_19", name: "Vitamin B-Complex + Liver Ext.", salt: "B1, B2, B6, Niacin, B12", cat: "SUPPORTIVE", ethicalBrand: "Tribivet 100ml", genericOption: "Belamyl 100ml", mrpEthical: 140, mrpGeneric: 60, doseMgKg: 0.05, concMgMl: 10, route: "IM", pregSafe: true },
    { id: "DRUG_20", name: "Calcium Borogluconate (CBG)", salt: "Calcium 25% + Mag + Phos", cat: "SUPPORTIVE", ethicalBrand: "Mifex 450ml", genericOption: "Calborol 450ml", mrpEthical: 380, mrpGeneric: 180, doseMgKg: 1, concMgMl: 250, route: "Slow IV", pregSafe: true },
    { id: "DRUG_21", name: "Dextrose 25%", salt: "Hypertonic Glucose 25%", cat: "SUPPORTIVE", ethicalBrand: "Dextrose 25% 500ml", genericOption: "D25 IV 500ml", mrpEthical: 90, mrpGeneric: 45, doseMgKg: 2, concMgMl: 250, route: "Fast IV", pregSafe: true },
    { id: "DRUG_22", name: "Chlorpheniramine Maleate (CPM)", salt: "CPM 10mg/ml", cat: "ANTIHISTAMINE", ethicalBrand: "Avil Vet 100ml", genericOption: "CPM Inj 100ml", mrpEthical: 90, mrpGeneric: 45, doseMgKg: 0.5, concMgMl: 10, route: "IM", pregSafe: true },
    { id: "DRUG_23", name: "Atropine Sulphate", salt: "Atropine 1mg/ml", cat: "ANTIDOTE", ethicalBrand: "Atropine Vet 100ml", genericOption: "Atropine Inj", mrpEthical: 75, mrpGeneric: 30, doseMgKg: 0.04, concMgMl: 1, route: "IV/SC", pregSafe: true },
    { id: "DRUG_24", name: "Cloprostenol Sodium", salt: "PGF2alpha 250mcg/ml", cat: "HORMONES", ethicalBrand: "Lutalyse / Juramate 2ml", genericOption: "Pragma 2ml", mrpEthical: 210, mrpGeneric: 110, doseMgKg: 0.001, concMgMl: 0.25, route: "IM", pregSafe: false },
    { id: "DRUG_25", name: "Buserelin Acetate", salt: "GnRH analogue 0.004mg/ml", cat: "HORMONES", ethicalBrand: "Receptal 10ml", genericOption: "Gynerich 10ml", mrpEthical: 420, mrpGeneric: 210, doseMgKg: 0.00005, concMgMl: 0.004, route: "IM", pregSafe: true },
    { id: "DRUG_26", name: "Oxytocin", salt: "Oxytocin 10 IU/ml", cat: "HORMONES", ethicalBrand: "Syntocinon 10ml", genericOption: "Oxytocin Inj 10ml", mrpEthical: 45, mrpGeneric: 20, doseMgKg: 0.1, concMgMl: 10, route: "IM", pregSafe: false },
    { id: "DRUG_27", name: "Furosemide", salt: "Furosemide 50mg/ml", cat: "SUPPORTIVE", ethicalBrand: "Lasix Vet 10ml", genericOption: "Salix Inj", mrpEthical: 60, mrpGeneric: 25, doseMgKg: 1, concMgMl: 50, route: "IV/IM", pregSafe: true },
    { id: "DRUG_28", name: "Dicyclomine + Diclofenac", salt: "Dicyclomine 10mg + Diclo 25mg", cat: "NSAID", ethicalBrand: "Spasmo-vet 30ml", genericOption: "Spasmodic Inj", mrpEthical: 95, mrpGeneric: 45, doseMgKg: 0.5, concMgMl: 35, route: "IM", pregSafe: true },
    { id: "DRUG_29", name: "Serratiopeptidase", salt: "Serratiopeptidase 30mg", cat: "ANTI_INFLAMMATORY", ethicalBrand: "Bioser 1 vial", genericOption: "Serratio Inj", mrpEthical: 210, mrpGeneric: 95, doseMgKg: 0.1, concMgMl: 30, route: "IM", pregSafe: true },
    { id: "DRUG_30", name: "Iron Dextran", salt: "Elemental Iron 100mg/ml", cat: "SUPPORTIVE", ethicalBrand: "Feritas / Imferon", genericOption: "Iron Dextran 10ml", mrpEthical: 180, mrpGeneric: 80, doseMgKg: 2, concMgMl: 100, route: "Deep IM", pregSafe: true }
  ];

  /* =========================================================================
     3. MULTI-ORGAN SYMPTOM MATRIX CONTROLLER
     ========================================================================= */

  window.populateSymptomDropdowns = function () {
    const container = document.getElementById('panelDiagMatrix');
    if (!container) return;

    let organContainer = document.getElementById('matrixOrganDropdownSection');
    if (!organContainer) {
      organContainer = document.createElement('div');
      organContainer.id = 'matrixOrganDropdownSection';
      organContainer.className = 'pt-2 border-t border-slate-100 space-y-3';
      container.appendChild(organContainer);
    }

    const organTitles = {
      temp: "🌡️ तापमान (Body Temp)",
      eyes: "👁️ आंखें व म्यूकस मेम्ब्रेन (Eyes/Mucosa)",
      skin: "🛡️ त्वचा व बाल (Skin/Coat)",
      udder: "🥛 अयन व थन (Udder/Teats)",
      urine: "💧 मूत्र का रंग व स्थिति (Urine)",
      dung: "💩 गोबर की स्थिति (Dung)",
      rumen: "🌾 रूमेन व पेट की आवाज (Rumen)",
      respiration: "🫁 श्वसन व सांस (Respiration)"
    };

    organContainer.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <span>🧬</span> 8-अंग क्लिनिकल सिम्पटम मैट्रिक्स (Organ Symptom Matrix)
        </span>
        <button onclick="window.resetOrganMatrix()" class="text-[11px] text-rose-600 hover:text-rose-700 font-bold">रीसेट ↺</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        ${Object.keys(window.VETCARE_SYMPTOMS_BY_ORGAN).map(organ => `
          <div>
            <label class="block text-[10px] font-bold text-slate-600 mb-1">${organTitles[organ] || organ}</label>
            <select onchange="window.handleOrganChange('${organ}', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium outline-none focus:border-blue-600">
              ${window.VETCARE_SYMPTOMS_BY_ORGAN[organ].map(opt => `
                <option value="${opt}" ${organSelections[organ] === opt ? 'selected' : ''}>${opt}</option>
              `).join('')}
            </select>
          </div>
        `).join('')}
      </div>
      <button onclick="window.calculateDiseaseProbability()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5">
        <span>⚡ क्लिनिकल संभावना (%) गणना व प्रयोगशाला विश्लेषण</span>
      </button>
    `;
  };

  window.handleOrganChange = function (organ, value) {
    organSelections[organ] = value;
  };

  window.resetOrganMatrix = function () {
    organSelections = {
      eyes: "सामान्य गुलाबी",
      skin: "सामान्य",
      udder: "सामान्य",
      urine: "सामान्य",
      dung: "सामान्य",
      temp: "सामान्य (101-102.5°F)",
      rumen: "सामान्य 2-3 गति/2 मिनट",
      respiration: "सामान्य"
    };
    window.populateSymptomDropdowns();
    window.calculateDiseaseProbability();
  };

  window.calculateDiseaseProbability = function () {
    const resultsContainer = document.getElementById('diseaseSearchResults');
    if (!resultsContainer) return;

    const db = window.VETCARE_DISEASE_DB || [];
    if (db.length === 0) {
      resultsContainer.innerHTML = `
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-medium">
          ⚠️ क्लिनिकल डेटाबेस लोड हो रहा है... कृपया 2 सेकंड प्रतीक्षा करें।
        </div>
      `;
      return;
    }

    // Mathematical matching score generator
    const scoredDiseases = db.map(d => {
      let score = 20; // baseline

      // Temperature weighting
      if (organSelections.temp.includes("अति-तीव्र") && d.tempRange.includes("105")) score += 25;
      if (organSelections.temp.includes("हाइपोथर्मिया") && (d.id === "DIS_MILK_FEVER" || d.tempRange.toLowerCase().includes("sub"))) score += 35;

      // Organ-specific matching heuristics
      if (organSelections.urine.includes("लाल") && (d.id === "DIS_BABESIOSIS" || d.id === "DIS_LEPTOSPIROSIS" || d.id === "DIS_PPH")) score += 40;
      if (organSelections.udder.includes("खून") && d.id === "DIS_MASTITIS") score += 45;
      if (organSelections.skin.includes("गांठदार") && d.id === "DIS_LSD") score += 45;
      if (organSelections.respiration.includes("घरघराहट") && d.id === "DIS_HS") score += 40;
      if (organSelections.rumen.includes("आफरा") && (d.id === "DIS_BLOAT" || d.id === "DIS_RUMEN_ACIDOSIS")) score += 45;
      if (organSelections.eyes.includes("पीलिया") && (d.id === "DIS_ANAPLASMOSIS" || d.id === "DIS_BABESIOSIS")) score += 30;

      // Bound probability percentage
      const finalPercent = Math.min(98, Math.max(12, score));
      return { disease: d, matchPercent: finalPercent };
    });

    scoredDiseases.sort((a, b) => b.matchPercent - a.matchPercent);
    const topResults = scoredDiseases.slice(0, 6);

    resultsContainer.innerHTML = `
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
          <span>वैज्ञानिक संभावना के आधार पर रोग रैंकिंग (${topResults.length} रोग संरेखित):</span>
          <span class="text-blue-600">शीर्ष मैच: ${topResults[0].matchPercent}%</span>
        </div>

        ${topResults.map((item, idx) => {
          const d = item.disease;
          const pct = item.matchPercent;
          const badgeColor = pct >= 80 ? 'bg-rose-600 text-white' : pct >= 50 ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white';

          return `
            <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 hover:border-blue-400 transition">
              <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-bold text-slate-400">#${idx + 1}</span>
                    <h3 class="text-base font-black text-slate-900">${d.nameHi}</h3>
                  </div>
                  <p class="text-[11px] text-slate-500 font-sans mt-0.5">${d.nameEn} • वर्ग: <span class="font-bold text-blue-700">${d.category}</span></p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-black px-2.5 py-1 rounded-xl shadow-xs ${badgeColor}">
                    ${pct}% संभावना
                  </span>
                  <span class="block text-[10px] text-slate-400 font-mono mt-1">तापमान: ${d.tempRange}</span>
                </div>
              </div>

              <!-- Cardinal Diagnostic Signs -->
              <div class="space-y-1.5">
                <span class="text-[11px] font-bold text-rose-700 flex items-center gap-1">🚨 प्रमुख विशिष्ट लक्षण (Cardinal Signs):</span>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                  ${(d.cardinalSigns || []).map(sign => `
                    <li class="flex items-center gap-1.5 bg-rose-50/50 p-1.5 rounded-lg border border-rose-100">
                      <span class="text-rose-500">•</span> <span>${sign}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Confirmatory Lab Test Table -->
              ${d.labTests && d.labTests.length > 0 ? `
                <div class="space-y-1.5">
                  <span class="text-[11px] font-bold text-indigo-700 flex items-center gap-1">🔬 पुष्टिकारक प्रयोगशाला परीक्षण (Confirmatory Lab Tests):</span>
                  <div class="overflow-x-auto rounded-xl border border-slate-200">
                    <table class="w-full text-left text-[11px]">
                      <thead class="bg-slate-50 font-bold text-slate-600 border-b border-slate-200">
                        <tr>
                          <th class="p-2">परीक्षण नाम</th>
                          <th class="p-2">नमूना</th>
                          <th class="p-2">अनुमानित शुल्क</th>
                          <th class="p-2">समय (TAT)</th>
                          <th class="p-2">पुष्टि कारक</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
                        ${d.labTests.map(t => `
                          <tr>
                            <td class="p-2 font-bold">${t.testName}</td>
                            <td class="p-2">${t.sampleType}</td>
                            <td class="p-2 font-bold text-emerald-700">₹${t.approxMrp}</td>
                            <td class="p-2 text-slate-500">${t.tat}</td>
                            <td class="p-2 text-indigo-900">${t.confirms}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}

              <!-- Inline Weight & Dosage Calculator Card -->
              <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span class="text-xs font-bold text-blue-900 flex items-center gap-1">
                    ⚖️ इनलाइन पशु वजन एवं सटीक डोज़ कैलकुलेटर
                  </span>
                  <span class="text-[10px] font-mono text-slate-500">सूत्र: (Girth² × Length) ÷ 300</span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label class="block text-[10px] font-bold text-slate-600 mb-0.5">सीना घेरा (Girth - इंच)</label>
                    <input id="calcGirth_${d.id}" type="number" value="65" oninput="window.runInlineDosageCalc('${d.id}')" class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-600 mb-0.5">लंबाई (Length - इंच)</label>
                    <input id="calcLength_${d.id}" type="number" value="55" oninput="window.runInlineDosageCalc('${d.id}')" class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-600 mb-0.5">गणना किया वजन</label>
                    <div id="calcWeightDisp_${d.id}" class="bg-blue-50 border border-blue-200 rounded-lg p-1.5 text-xs font-black text-blue-900 text-center">350 Kg</div>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-600 mb-0.5">औषधि चयन</label>
                    <select id="calcDrugSel_${d.id}" onchange="window.runInlineDosageCalc('${d.id}')" class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold outline-none">
                      ${PHARMACOPEIA_DB.map(drug => `
                        <option value="${drug.id}">${drug.name}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>

                <div id="calcDoseOutput_${d.id}" class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold flex items-center justify-between">
                  <span>अनुशंसित कुल डोज़: <strong class="text-sm font-black text-emerald-800">10.5 ml</strong></span>
                  <span class="text-[10px] font-normal text-emerald-700">सुरक्षित रूट: IM • गर्भ सुरक्षित: ✅</span>
                </div>
              </div>

              <!-- Action to Push to Digital Prescription Pad -->
              <div class="flex gap-2 pt-1">
                <button onclick="window.transferToPrescription('${d.id}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5">
                  <span>📝 इस रोग का उपचार सीधे OPD पर्ची पर जोड़ें</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Initialize dosage calculations for all rendered cards
    topResults.forEach(item => window.runInlineDosageCalc(item.disease.id));
  };

  /* =========================================================================
     4. INLINE WEIGHT & DOSAGE CALCULATOR CORE
     ========================================================================= */

  window.runInlineDosageCalc = function (diseaseId) {
    const girthIn = parseFloat(document.getElementById(`calcGirth_${diseaseId}`)?.value || 65);
    const lengthIn = parseFloat(document.getElementById(`calcLength_${diseaseId}`)?.value || 55);
    const drugId = document.getElementById(`calcDrugSel_${diseaseId}`)?.value || "DRUG_01";
    const weightDisp = document.getElementById(`calcWeightDisp_${diseaseId}`);
    const doseOutput = document.getElementById(`calcDoseOutput_${diseaseId}`);

    // Schaeffer's Formula: Weight in lbs = (Heart Girth² × Length) / 300
    // Weight in kg = lbs * 0.453592
    const weightLbs = (Math.pow(girthIn, 2) * lengthIn) / 300;
    const weightKg = Math.round(weightLbs * 0.453592);

    if (weightDisp) weightDisp.textContent = `${weightKg} Kg (${Math.round(weightLbs)} lbs)`;

    const drug = PHARMACOPEIA_DB.find(d => d.id === drugId) || PHARMACOPEIA_DB[0];
    
    // Formula: Total Dose (ml) = (Weight in Kg * Dose in mg/kg) / Concentration in mg/ml
    let doseMl = (weightKg * drug.doseMgKg) / drug.concMgMl;
    doseMl = Math.max(0.5, Math.round(doseMl * 10) / 10);

    if (doseOutput) {
      doseOutput.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
          <span>औषधि: <b>${drug.ethicalBrand}</b> (${drug.salt}) ➔ डोज़: <strong class="text-sm font-black text-emerald-800">${doseMl} ml</strong></span>
          <span class="text-[10px] text-emerald-700 font-mono">रूट: ${drug.route} | गर्भ सुरक्षित: ${drug.pregSafe ? '✅ हाँ' : '⚠️ वर्जित (Not Safe)'}</span>
        </div>
      `;
    }
  };

  /* =========================================================================
     5. PHARMACOPEIA CONTROLLER & UNLISTED AI SEARCH FALLBACK
     ========================================================================= */

  window.renderPharmacopeiaViewer = function (containerId) {
    const target = document.getElementById(containerId || 'viewDiagnosis');
    if (!target) return;

    let viewer = document.getElementById('pharmacopeiaViewerContainer');
    if (!viewer) {
      viewer = document.createElement('div');
      viewer.id = 'pharmacopeiaViewerContainer';
      viewer.className = 'bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4';
      target.appendChild(viewer);
    }

    viewer.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h2 class="text-base font-black text-slate-900 flex items-center gap-1.5">
            <span>💊</span> पशु चिकित्सा औषधि ज्ञानकोश (Veterinary Pharmacopeia)
          </h2>
          <p class="text-xs text-slate-500">30+ सत्यापित एलोपैथिक साल्ट, एथिकल बनाम जेनेरिक तुलना व AI असिस्टेंट</p>
        </div>
        <div class="flex gap-1.5 text-xs">
          <select id="pharmaCatFilter" onchange="window.filterPharmacopeia()" class="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold outline-none">
            <option value="ALL">सभी श्रेणियां</option>
            <option value="ANTIBIOTIC">एंटीबायोटिक</option>
            <option value="NSAID">दर्द व सूजन (NSAID)</option>
            <option value="ANTIPROTOZOAL">एंटीप्रोटोजोअल</option>
            <option value="CORTICOSTEROID">कॉर्टिकोस्टेरॉयड</option>
            <option value="ANTHELMINTIC">कृमिनाशक</option>
            <option value="SUPPORTIVE">पोषक व सपोर्टिव</option>
            <option value="HORMONES">प्रजनन हार्मोन</option>
          </select>
          <select id="pharmaSortFilter" onchange="window.filterPharmacopeia()" class="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold outline-none">
            <option value="NAME_ASC">नाम (A-Z)</option>
            <option value="NAME_DESC">नाम (Z-A)</option>
            <option value="PRICE_LOW">मूल्य (कम से अधिक)</option>
            <option value="PRICE_HIGH">मूल्य (अधिक से कम)</option>
          </select>
        </div>
      </div>

      <div class="flex gap-2">
        <input 
          id="pharmaSearchInput" 
          type="text" 
          placeholder="दवा का नाम अथवा साल्ट खोजें (उदा. Ceftiofur, Melonex, Berenil)..." 
          oninput="window.filterPharmacopeia()" 
          class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs outline-none font-medium focus:border-blue-600"
        />
      </div>

      <div id="pharmaDrugsList" class="space-y-2.5"></div>
      <div id="pharmaAIFallbackArea" class="hidden p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2"></div>
    `;

    window.filterPharmacopeia();
  };

  window.filterPharmacopeia = function () {
    const query = (document.getElementById('pharmaSearchInput')?.value || '').toLowerCase().trim();
    const cat = document.getElementById('pharmaCatFilter')?.value || 'ALL';
    const sort = document.getElementById('pharmaSortFilter')?.value || 'NAME_ASC';
    const listContainer = document.getElementById('pharmaDrugsList');
    const aiFallback = document.getElementById('pharmaAIFallbackArea');
    if (!listContainer) return;

    let filtered = PHARMACOPEIA_DB.filter(d => {
      const matchQuery = d.name.toLowerCase().includes(query) || d.salt.toLowerCase().includes(query) || d.ethicalBrand.toLowerCase().includes(query);
      const matchCat = (cat === 'ALL') || d.cat === cat;
      return matchQuery && matchCat;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sort === 'NAME_ASC') return a.name.localeCompare(b.name);
      if (sort === 'NAME_DESC') return b.name.localeCompare(a.name);
      if (sort === 'PRICE_LOW') return a.mrpGeneric - b.mrpGeneric;
      if (sort === 'PRICE_HIGH') return b.mrpEthical - a.mrpEthical;
      return 0;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = '';
      if (aiFallback) {
        aiFallback.classList.remove('hidden');
        aiFallback.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-900">🤖 स्थानीय ज्ञानकोश में '${query}' नहीं मिली!</span>
            <button onclick="window.queryGeminiForUnlistedDrug('${query}')" class="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs transition">
              ✨ Gemini AI से सटीक डोज़ व साल्ट विवरण पूछें
            </button>
          </div>
          <div id="aiPharmaResponseText" class="text-xs text-slate-700 pt-2 whitespace-pre-wrap"></div>
        `;
      }
      return;
    }

    if (aiFallback) aiFallback.classList.add('hidden');

    listContainer.innerHTML = filtered.map(d => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 hover:shadow-xs transition space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${d.name}</h4>
            <span class="text-[11px] text-slate-500 font-mono">${d.salt} • श्रेणी: <b>${d.cat}</b></span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${d.pregSafe ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
            ${d.pregSafe ? 'गाभिन सुरक्षित ✅' : 'गाभिन वर्जित ⚠️'}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs pt-1">
          <div class="bg-blue-50/50 p-2 rounded-xl border border-blue-100">
            <span class="text-[10px] text-blue-700 font-bold block">एथिकल ब्रांड (Ethical Option)</span>
            <strong class="text-slate-900">${d.ethicalBrand}</strong>
            <span class="block text-[11px] font-black text-blue-900">MRP: ₹${d.mrpEthical}</span>
          </div>
          <div class="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
            <span class="text-[10px] text-emerald-700 font-bold block">किफायती जेनेरिक (Generic Option)</span>
            <strong class="text-slate-900">${d.genericOption}</strong>
            <span class="block text-[11px] font-black text-emerald-800">MRP: ₹${d.mrpGeneric} (बचत)</span>
          </div>
        </div>

        <div class="text-[11px] text-slate-600 flex items-center justify-between border-t border-slate-100 pt-1.5 font-medium">
          <span>मानक दर: <b>${d.doseMgKg} mg/kg</b> (${d.route})</span>
          <button onclick="window.insertDrugToRx('${d.ethicalBrand}')" class="text-blue-600 hover:underline font-bold text-xs">
            + पर्ची में जोड़ें
          </button>
        </div>
      </div>
    `).join('');
  };

  window.queryGeminiForUnlistedDrug = async function (drugName) {
    const resBox = document.getElementById('aiPharmaResponseText');
    if (!resBox) return;
    resBox.textContent = 'Gemini AI से क्लिनिकल डेटा प्राप्त किया जा रहा है... कृपया प्रतीक्षा करें...';

    const apiKey = localStorage.getItem('gemini_api_key') || '';
    if (!apiKey) {
      resBox.innerHTML = '⚠️ कृपया पहले हेडर में दिए गए <b>⚙️ AI Key</b> बटन पर क्लिक करके अपनी Gemini API Key दर्ज करें।';
      return;
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `Act as an expert Veterinary Pharmacologist. Provide concise clinical dosage, indications, contraindications, and pregnancy safety for the animal drug: '${drugName}'. Language: Simple Hindi and English bullet points.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'कोई जानकारी नहीं मिल सकी।';
      resBox.textContent = answer;
    } catch (err) {
      resBox.textContent = 'AI कनेक्शन में त्रुटि: ' + err.message;
    }
  };

  window.transferToPrescription = function (diseaseId) {
    const db = window.VETCARE_DISEASE_DB || [];
    const disease = db.find(d => d.id === diseaseId);
    if (!disease) return;

    if (typeof window.switchTab === 'function') {
      window.switchTab('rx');
    }

    const diagField = document.getElementById('opdDiagnosis');
    if (diagField) diagField.value = `${disease.nameHi} (${disease.nameEn})`;

    const medField = document.getElementById('opdMedicine');
    if (medField && disease.treatment?.injections) {
      const rxLines = disease.treatment.injections.map((inj, i) => `${i + 1}. Inj. ${inj.ethicalBrand} - ${inj.dose} (${inj.route})`).join('\n');
      medField.value = rxLines;
    }
  };

  window.insertDrugToRx = function (drugName) {
    if (typeof window.switchTab === 'function') {
      window.switchTab('rx');
    }
    const medField = document.getElementById('opdMedicine');
    if (medField) {
      medField.value = (medField.value ? medField.value + '\n' : '') + `Inj. ${drugName}`;
    }
  };

  // Safe Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.populateSymptomDropdowns();
    });
  } else {
    window.populateSymptomDropdowns();
  }

})(window, document);
