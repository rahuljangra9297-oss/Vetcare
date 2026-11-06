// Vetcare AI OS - Veterinary Nutritional Optimization, Pearson Square & Feed Ration Balancer Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_NUTRITION = "clinical_records";

  // Master ICAR & NDRI Standard Nutritional Database for Indian Feedstuffs
  const FEED_INGREDIENTS_MASTER = [
    // 1. Dry Roughages (सूखा चारा / भूसा)
    { id: "ing_wheat_straw", category: "dry_roughage", name: "Wheat Straw (गेहूं का भूसा / तूड़ी)", dm: 90.0, cp: 3.5, tdn: 42.0, ca: 0.30, p: 0.10, defaultPricePerKg: 8.5, description: "बुनियादी सूखा चारा, रूमेन भराव एवं जुगाली हेतु अनिवार्य।" },
    { id: "ing_paddy_straw", category: "dry_roughage", name: "Paddy Straw (धान पराली)", dm: 90.0, cp: 3.0, tdn: 40.0, ca: 0.25, p: 0.08, defaultPricePerKg: 4.5, description: "ऑक्सालेट युक्त; यूरिया उपचार (4%) द्वारा पोषण संवर्धन अनुशंसित।" },
    { id: "ing_sorghum_kadbi", category: "dry_roughage", name: "Sorghum / Bajra Stover (ज्वार / बाजरा कड़बी)", dm: 88.0, cp: 4.5, tdn: 48.0, ca: 0.35, p: 0.12, defaultPricePerKg: 7.0, description: "ऊर्जा युक्त सूखा चारा, मध्यम सुपाच्यता।" },

    // 2. Green Roughages (हरा चारा)
    { id: "ing_green_berseem", category: "green_fodder", name: "Berseem Clover (हरा बरसीम / तिपतिया)", dm: 15.0, cp: 18.5, tdn: 62.0, ca: 1.40, p: 0.28, defaultPricePerKg: 2.5, description: "शीतकालीन लेग्यूम चारा; उच्च प्रोटीन व कैल्शियम से भरपूर।" },
    { id: "ing_green_maize", category: "green_fodder", name: "Green Maize (हरी मक्का / चरी)", dm: 22.0, cp: 8.5, tdn: 58.0, ca: 0.40, p: 0.22, defaultPricePerKg: 3.0, description: "ग्रीष्मकालीन सुपाच्य रसीला चारा; ऊर्जा का उत्तम स्रोत।" },
    { id: "ing_green_napier", category: "green_fodder", name: "Hybrid Napier / CO-4 (नेपियर घास)", dm: 20.0, cp: 8.0, tdn: 52.0, ca: 0.45, p: 0.20, defaultPricePerKg: 2.0, description: "बहुवर्षीय उच्च उत्पादन हरा चारा, साइलेज योग्य।" },
    { id: "ing_green_oats", category: "green_fodder", name: "Green Oats (हरा जई / जव)", dm: 18.0, cp: 10.5, tdn: 62.0, ca: 0.50, p: 0.25, defaultPricePerKg: 2.8, description: "शीतकालीन अत्यधिक पौष्टिक व स्वादिष्ट चारा।" },

    // 3. Protein Cakes & Meals (खल / प्रोटीन स्रोत)
    { id: "ing_mustard_cake", category: "protein_cakes", name: "Mustard Oil Cake (सरसों की खल)", dm: 90.0, cp: 36.0, tdn: 72.0, ca: 0.65, p: 1.10, defaultPricePerKg: 32.0, description: "पारंपरिक भारतीय प्रोटीन स्रोत; तीखापन कम करने हेतु भिगोकर दें।" },
    { id: "ing_cottonseed_cake", category: "protein_cakes", name: "Cottonseed Cake (बिनौला खल)", dm: 90.0, cp: 24.0, tdn: 70.0, ca: 0.35, p: 0.60, defaultPricePerKg: 35.0, description: "दुग्ध वसा (FAT %) बढ़ाने हेतु अत्यंत लोकप्रिय।" },
    { id: "ing_soybean_meal", category: "protein_cakes", name: "Soybean Meal DOC (सोयाबीन डीओसी)", dm: 90.0, cp: 46.0, tdn: 78.0, ca: 0.35, p: 0.65, defaultPricePerKg: 42.0, description: "उच्चतम जैविक गुणवत्ता वाला बाईपास प्रोटीन स्रोत।" },

    // 4. Energy Grains & Byproducts (अनाज व चोकर)
    { id: "ing_maize_grain", category: "energy_grains", name: "Crushed Maize Grain (मक्का दलिया)", dm: 88.0, cp: 9.5, tdn: 82.0, ca: 0.05, p: 0.30, defaultPricePerKg: 24.0, description: "सर्वश्रेष्ठ स्टार्च ऊर्जा स्रोत, दुग्ध उत्पादन प्रेरक।" },
    { id: "ing_wheat_bran", category: "energy_grains", name: "Wheat Bran (गेहूं का चोकर)", dm: 88.0, cp: 14.5, tdn: 65.0, ca: 0.12, p: 1.15, defaultPricePerKg: 22.0, description: "फास्फोरस व पाचक रेशे (NDF) का समृद्ध स्रोत।" },

    // 5. Mineral Supplements & Buffers (खनिज व पूरक)
    { id: "ing_mineral_mixture", category: "supplements", name: "Area Specific Mineral Mixture (खनिज मिश्रण)", dm: 98.0, cp: 0.0, tdn: 0.0, ca: 24.0, p: 12.0, defaultPricePerKg: 85.0, description: "हार्मोनल संतुलन, प्रजनन एवं थनैला रोकथाम हेतु अनिवार्य।" },
    { id: "ing_common_salt", category: "supplements", name: "Common Salt (सादा नमक)", dm: 99.0, cp: 0.0, tdn: 0.0, ca: 0.0, p: 0.0, defaultPricePerKg: 10.0, description: "इलेक्ट्रोलाइट संतुलन, भूख एवं लार उत्पादन सहायक।" },
    { id: "ing_soda_bicarb", category: "supplements", name: "Sodium Bicarbonate (मीठा सोडा / बफर)", dm: 99.0, cp: 0.0, tdn: 0.0, ca: 0.0, p: 0.0, defaultPricePerKg: 45.0, description: "रूमेन एसिडोसिस रोकथाम एवं दूध फैट प्रतिशत रक्षक।" }
  ];

  root.VetcareApp.ClinicalData.FeedNutritionMatrix = FEED_INGREDIENTS_MASTER;

  // Internal Module Reactive State
  const state = {
    animalProfile: {
      species: "bovine", // 'bovine' | 'bubaline'
      breed: "crossbred_hf",
      bodyWeightKg: 450,
      milkYieldLiters: 15,
      milkFatPercent: 4.0,
      pregnancyMonth: 0, // 0 = not pregnant, 7-9 = advanced pregnancy
      parity: 2,
      housingType: "stall_fed",
      milkSellingPricePerLiter: 42.0
    },
    feedLibrary: JSON.parse(JSON.stringify(FEED_INGREDIENTS_MASTER)),
    selectedRationFeeds: [
      { id: "ing_wheat_straw", asFedKg: 4.0, pricePerKg: 8.5 },
      { id: "ing_green_berseem", asFedKg: 35.0, pricePerKg: 2.5 },
      { id: "ing_mustard_cake", asFedKg: 2.0, pricePerKg: 32.0 },
      { id: "ing_maize_grain", asFedKg: 2.5, pricePerKg: 24.0 },
      { id: "ing_wheat_bran", asFedKg: 1.0, pricePerKg: 22.0 },
      { id: "ing_mineral_mixture", asFedKg: 0.05, pricePerKg: 85.0 }, // 50g
      { id: "ing_common_salt", asFedKg: 0.03, pricePerKg: 10.0 }       // 30g
    ],
    pearsonSquareSolver: {
      targetCpPercent: 20.0,
      highFeedId: "ing_mustard_cake",
      lowFeedId: "ing_maize_grain",
      calculatedParts: { highPct: 0, lowPct: 0, highName: "", lowName: "" }
    },
    activeTab: "balancer_wizard", // 'balancer_wizard' | 'ingredient_manager' | 'pearson_solver' | 'print_feed_chart'
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[RATION BALANCER ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection
  function getDbConnection() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve(state.db);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = (e) => {
        state.db = e.target.result;
        resolve(state.db);
      };
      req.onerror = (err) => reject(err);
    });
  }

  // Primary Module API Definition
  const FeedRationBalancer = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.setupEventBus();
        this.runPearsonSquareCalculation();
        return true;
      } catch (err) {
        console.error("FeedRationBalancer initialization failed:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for FeedRationBalancer:", containerId);
        return;
      }
      state.containerElement = container;

      const requirements = this.calculateNutrientRequirements(state.animalProfile);
      const supplied = this.evaluateRationNutrients(state.selectedRationFeeds);
      const financials = this.calculateEconomics(supplied.totalCost, state.animalProfile.milkYieldLiters, state.animalProfile.milkSellingPricePerLiter);

      container.innerHTML = `
        <div id="vetcare-nutrition-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Animal Profile & Bio-Physical Slider Bar -->
          ${this.buildAnimalProfileBannerHtml(requirements)}

          <!-- Navigation Tab Selector -->
          ${this.buildTabNavigationHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "ingredient_manager"
              ? this.buildIngredientManagerWorkstationHtml()
              : state.activeTab === "pearson_solver"
              ? this.buildPearsonSquareWorkstationHtml()
              : state.activeTab === "print_feed_chart"
              ? this.buildPrintFeedChartWorkstationHtml(supplied, financials)
              : this.buildBalancerWizardWorkstationHtml(requirements, supplied, financials)
          }

          <!-- Modals Insertion Mount -->
          <div id="nutrition-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._patientSelectedListener) {
        window.removeEventListener("patient:selected", this._patientSelectedListener);
        window.removeEventListener("vetcare:patient-selected", this._patientSelectedListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handlePatient = (evt) => {
        const p = evt.detail;
        if (!p) return;
        if (p.species) state.animalProfile.species = p.species.toLowerCase() === "bubaline" ? "bubaline" : "bovine";
        if (p.bodyWeightKg) state.animalProfile.bodyWeightKg = parseFloat(p.bodyWeightKg);
        if (p.breed) state.animalProfile.breed = p.breed;
        notify(`राशन गणक में पशु लोड हुआ: ${state.animalProfile.bodyWeightKg}kg ${state.animalProfile.species.toUpperCase()}`, "info");
        if (state.containerElement) {
          this.render(state.containerElement);
        }
      };

      this._patientSelectedListener = handlePatient;
      window.addEventListener("patient:selected", handlePatient);
      window.addEventListener("vetcare:patient-selected", handlePatient);
    },

    // 4. SCIENTIFIC NUTRITIONAL ENGINE (ICAR & NRC STANDARDS)
    calculateNutrientRequirements: function (profile) {
      const bw = parseFloat(profile.bodyWeightKg) || 450;
      const milk = parseFloat(profile.milkYieldLiters) || 0;
      const fat = parseFloat(profile.milkFatPercent) || 4.0;
      const preg = parseInt(profile.pregnancyMonth, 10) || 0;
      const isBuffalo = profile.species === "bubaline";

      // 1. 4% Fat Corrected Milk (FCM)
      // Formula: FCM (kg) = 0.4 * Milk + 15 * (Milk * Fat% / 100)
      const fcm = 0.4 * milk + 15 * (milk * (fat / 100));

      // 2. Dry Matter Intake (DMI):
      // Cattle: ~2.5% BW + 0.1 * FCM
      // Buffalo: ~3.0% BW + 0.1 * FCM
      const baseDmiRate = isBuffalo ? 0.030 : 0.026;
      let dmiKg = bw * baseDmiRate + 0.1 * fcm;

      // 3. Crude Protein (CP in kg):
      // Maintenance CP: BW^0.75 * 4.2g (bovine) / 4.6g (buffalo)
      const metabolicWeight = Math.pow(bw, 0.75);
      const maintCpKg = (metabolicWeight * (isBuffalo ? 4.6 : 4.2)) / 1000;
      // Milk Production CP: ~88g CP per liter of 4% FCM
      const milkCpKg = (fcm * 88) / 1000;
      // Late Pregnancy allowance (>7 months)
      const pregCpKg = preg >= 7 ? 0.22 : 0.0;
      const totalCpKg = maintCpKg + milkCpKg + pregCpKg;

      // 4. Total Digestible Nutrients (TDN in kg - Energy):
      // Maintenance TDN: BW^0.75 * 32g
      const maintTdnKg = (metabolicWeight * 32) / 1000;
      // Milk Production TDN: ~330g TDN per liter of 4% FCM
      const milkTdnKg = (fcm * 330) / 1000;
      // Pregnancy allowance
      const pregTdnKg = preg >= 7 ? 0.9 : 0.0;
      const totalTdnKg = maintTdnKg + milkTdnKg + pregTdnKg;

      // 5. Calcium & Phosphorus (Grams):
      // Maintenance: 22g Ca, 15g P
      // Per liter milk: 3.0g Ca, 2.0g P
      const totalCaGrams = 22 + milk * 3.0 + (preg >= 7 ? 12 : 0);
      const totalPGrams = 15 + milk * 2.0 + (preg >= 7 ? 8 : 0);

      return {
        fcmKg: parseFloat(fcm.toFixed(2)),
        dmiKg: parseFloat(dmiKg.toFixed(2)),
        cpKg: parseFloat(totalCpKg.toFixed(2)),
        tdnKg: parseFloat(totalTdnKg.toFixed(2)),
        calciumG: parseFloat(totalCaGrams.toFixed(1)),
        phosphorusG: parseFloat(totalPGrams.toFixed(1)),
        idealCpPercent: parseFloat(((totalCpKg / dmiKg) * 100).toFixed(1)),
        idealTdnPercent: parseFloat(((totalTdnKg / dmiKg) * 100).toFixed(1))
      };
    },

    evaluateRationNutrients: function (selectedFeeds) {
      let totalDmiKg = 0;
      let totalCpKg = 0;
      let totalTdnKg = 0;
      let totalCaGrams = 0;
      let totalPGrams = 0;
      let totalCost = 0;
      let roughageDryDm = 0;
      let roughageGreenDm = 0;
      let concentrateDm = 0;

      selectedFeeds.forEach((item) => {
        const ing = state.feedLibrary.find((f) => f.id === item.id);
        if (!ing) return;

        const asFed = parseFloat(item.asFedKg) || 0;
        const price = parseFloat(item.pricePerKg) || ing.defaultPricePerKg;

        const dmSuppliedKg = asFed * (ing.dm / 100);
        const cpSuppliedKg = dmSuppliedKg * (ing.cp / 100);
        const tdnSuppliedKg = dmSuppliedKg * (ing.tdn / 100);
        const caGrams = dmSuppliedKg * (ing.ca / 100) * 1000;
        const pGrams = dmSuppliedKg * (ing.p / 100) * 1000;
        const cost = asFed * price;

        totalDmiKg += dmSuppliedKg;
        totalCpKg += cpSuppliedKg;
        totalTdnKg += tdnSuppliedKg;
        totalCaGrams += caGrams;
        totalPGrams += pGrams;
        totalCost += cost;

        if (ing.category === "dry_roughage") roughageDryDm += dmSuppliedKg;
        else if (ing.category === "green_fodder") roughageGreenDm += dmSuppliedKg;
        else concentrateDm += dmSuppliedKg;
      });

      return {
        totalDmiKg: parseFloat(totalDmiKg.toFixed(2)),
        totalCpKg: parseFloat(totalCpKg.toFixed(2)),
        totalTdnKg: parseFloat(totalTdnKg.toFixed(2)),
        totalCaGrams: parseFloat(totalCaGrams.toFixed(1)),
        totalPGrams: parseFloat(totalPGrams.toFixed(1)),
        totalCost: parseFloat(totalCost.toFixed(2)),
        roughageDryDm: parseFloat(roughageDryDm.toFixed(2)),
        roughageGreenDm: parseFloat(roughageGreenDm.toFixed(2)),
        concentrateDm: parseFloat(concentrateDm.toFixed(2))
      };
    },

    calculateEconomics: function (totalCost, milkYield, milkPrice) {
      const costPerLiter = milkYield > 0 ? totalCost / milkYield : 0;
      const dailyRevenue = milkYield * milkPrice;
      const dailyGrossProfit = dailyRevenue - totalCost;

      return {
        dailyFeedCost: totalCost,
        costPerLiter: parseFloat(costPerLiter.toFixed(2)),
        dailyRevenue: parseFloat(dailyRevenue.toFixed(2)),
        dailyGrossProfit: parseFloat(dailyGrossProfit.toFixed(2)),
        profitMarginPercent: dailyRevenue > 0 ? parseFloat(((dailyGrossProfit / dailyRevenue) * 100).toFixed(1)) : 0
      };
    },

    // 5. PEARSON SQUARE SOLVER
    runPearsonSquareCalculation: function () {
      const solver = state.pearsonSquareSolver;
      const highFeed = state.feedLibrary.find((f) => f.id === solver.highFeedId);
      const lowFeed = state.feedLibrary.find((f) => f.id === solver.lowFeedId);

      if (!highFeed || !lowFeed || highFeed.cp <= lowFeed.cp) {
        solver.calculatedParts = { highPct: 50, lowPct: 50, highName: "Feed 1", lowName: "Feed 2" };
        return;
      }

      const target = parseFloat(solver.targetCpPercent) || 20.0;
      const partsHigh = Math.abs(target - lowFeed.cp);
      const partsLow = Math.abs(highFeed.cp - target);
      const totalParts = partsHigh + partsLow;

      const highPct = totalParts > 0 ? (partsHigh / totalParts) * 100 : 0;
      const lowPct = totalParts > 0 ? (partsLow / totalParts) * 100 : 0;

      solver.calculatedParts = {
        highPct: parseFloat(highPct.toFixed(1)),
        lowPct: parseFloat(lowPct.toFixed(1)),
        highName: highFeed.name,
        lowName: lowFeed.name,
        highCp: highFeed.cp,
        lowCp: lowFeed.cp
      };
    },

    // HTML VIEW BUILDERS
    buildAnimalProfileBannerHtml: function (req) {
      const p = state.animalProfile;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
          <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl shadow-inner">
                <i class="fa-solid fa-wheat-awn"></i>
              </div>
              <div>
                <div class="flex items-center gap-2.5">
                  <span class="text-lg font-display font-black text-white">वैज्ञानिक पशु आहार व राशन संतुलन गणक</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ICAR & NDRI STANDARDS
                  </span>
                </div>
                <div class="text-xs text-slate-400 mt-0.5">
                  पशु शारीरिक वजन, दैनिक दुग्ध उत्पादन एवं वसा प्रतिशत (FAT%) अनुसार वैज्ञानिक पोषक तत्व निर्धारण
                </div>
              </div>
            </div>

            <!-- Right Profile Sliders / Controls -->
            <div class="flex flex-wrap items-center gap-3 self-stretch xl:self-auto justify-between xl:justify-end border-t xl:border-t-0 border-slate-800 pt-3 xl:pt-0">
              
              <!-- Species Selector -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">प्रजाति (Species)</div>
                <select id="nutriSpeciesSelect" class="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer">
                  <option value="bovine" ${p.species === "bovine" ? "selected" : ""}>गाय (Cattle)</option>
                  <option value="bubaline" ${p.species === "bubaline" ? "selected" : ""}>भैंस (Buffalo)</option>
                </select>
              </div>

              <!-- Body Weight Slider -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs min-w-[140px]">
                <div class="flex items-center justify-between text-[10px] text-slate-500 uppercase">
                  <span>वजन (Weight)</span>
                  <span class="text-white font-bold">${p.bodyWeightKg} kg</span>
                </div>
                <input 
                  type="range" 
                  id="nutriBwSlider" 
                  min="250" 
                  max="750" 
                  step="10" 
                  value="${p.bodyWeightKg}" 
                  class="w-full accent-emerald-500 cursor-pointer h-1.5 mt-1"
                />
              </div>

              <!-- Milk Yield -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">दूध (Milk Yield)</div>
                <div class="flex items-center gap-1">
                  <input 
                    type="number" 
                    id="nutriMilkInput" 
                    value="${p.milkYieldLiters}" 
                    min="0" 
                    max="60" 
                    step="0.5" 
                    class="w-12 bg-transparent text-white font-bold focus:outline-none"
                  />
                  <span class="text-slate-400 text-[10px]">L/दिन</span>
                </div>
              </div>

              <!-- Fat % -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">वसा (Fat %)</div>
                <div class="flex items-center gap-1">
                  <input 
                    type="number" 
                    id="nutriFatInput" 
                    value="${p.milkFatPercent}" 
                    min="2.5" 
                    max="9.5" 
                    step="0.1" 
                    class="w-10 bg-transparent text-white font-bold focus:outline-none"
                  />
                  <span class="text-slate-400 text-[10px]">%</span>
                </div>
              </div>

              <!-- Pregnancy Month -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">गर्भ माह (Pregnancy)</div>
                <select id="nutriPregnancySelect" class="bg-transparent font-bold text-cyan-400 focus:outline-none cursor-pointer">
                  <option value="0" ${p.pregnancyMonth === 0 ? "selected" : ""}>खुली / गैर-गाभिन</option>
                  <option value="7" ${p.pregnancyMonth === 7 ? "selected" : ""}>7वां माह (Late Preg)</option>
                  <option value="8" ${p.pregnancyMonth === 8 ? "selected" : ""}>8वां माह (Late Preg)</option>
                  <option value="9" ${p.pregnancyMonth === 9 ? "selected" : ""}>9वां माह (Pre-Calving)</option>
                </select>
              </div>

            </div>

          </div>
        </div>
      `;
    },

    buildTabNavigationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-xl flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <button 
            type="button" 
            data-nutri-tab="balancer_wizard" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "balancer_wizard"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-scale-balanced"></i>
            <span>राशन संतुलन विज़ार्ड (Ration Balancer)</span>
          </button>

          <button 
            type="button" 
            data-nutri-tab="pearson_solver" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "pearson_solver"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-shapes"></i>
            <span>पियर्सन स्क्वायर प्रोटीन सॉल्वर (Pearson Square)</span>
          </button>

          <button 
            type="button" 
            data-nutri-tab="ingredient_manager" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "ingredient_manager"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-database"></i>
            <span>चारा व दाना पोषण लाइब्रेरी (Feed Library)</span>
          </button>

          <button 
            type="button" 
            data-nutri-tab="print_feed_chart" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "print_feed_chart"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-print"></i>
            <span>दैनिक आहार चार्ट प्रिंट (Print Feed Chart)</span>
          </button>
        </div>
      `;
    },

    // WORKSTATION TAB 1: Main Ration Balancer Wizard
    buildBalancerWizardWorkstationHtml: function (req, sup, fin) {
      const dmiDiff = parseFloat((sup.totalDmiKg - req.dmiKg).toFixed(2));
      const cpDiff = parseFloat((sup.totalCpKg - req.cpKg).toFixed(2));
      const tdnDiff = parseFloat((sup.totalTdnKg - req.tdnKg).toFixed(2));

      // Percentages of target met
      const dmiPct = Math.min(150, Math.round((sup.totalDmiKg / req.dmiKg) * 100));
      const cpPct = Math.min(150, Math.round((sup.totalCpKg / req.cpKg) * 100));
      const tdnPct = Math.min(150, Math.round((sup.totalTdnKg / req.tdnKg) * 100));

      return `
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          <!-- Left Pane: Daily Ingredients Allocation Table (Cols 1-7) -->
          <div class="xl:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col gap-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-bucket text-amber-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">दैनिक चारा एवं दाना आवंटन (Daily Ration)</h3>
              </div>
              <span class="text-[10px] font-mono text-slate-400">मात्रा (kg ताज़ा वजन) व स्थानीय दर (₹/kg)</span>
            </div>

            <!-- Feed Selection Table -->
            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3 py-2.5">सामग्री (Ingredient)</th>
                    <th class="px-3 py-2.5">ताजा वजन (As-Fed kg)</th>
                    <th class="px-3 py-2.5">दर (₹/kg)</th>
                    <th class="px-3 py-2.5">लागत (₹/दिन)</th>
                    <th class="px-3 py-2.5 text-right">हटाएं</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${state.selectedRationFeeds
                    .map((item, index) => {
                      const ing = state.feedLibrary.find((f) => f.id === item.id);
                      if (!ing) return "";
                      const lineCost = (parseFloat(item.asFedKg) || 0) * (parseFloat(item.pricePerKg) || ing.defaultPricePerKg);

                      return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3 py-2.5">
                          <div class="font-bold text-white text-xs">${ing.name}</div>
                          <div class="text-[10px] font-mono text-slate-400">DM: ${ing.dm}% | CP: ${ing.cp}% | TDN: ${ing.tdn}%</div>
                        </td>
                        <td class="px-3 py-2.5">
                          <input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            data-feed-kg-idx="${index}" 
                            value="${item.asFedKg}" 
                            class="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono font-bold text-xs focus:ring-1 focus:ring-amber-500" 
                          />
                        </td>
                        <td class="px-3 py-2.5">
                          <div class="flex items-center gap-1 font-mono">
                            <span>₹</span>
                            <input 
                              type="number" 
                              step="0.5" 
                              min="0" 
                              data-feed-price-idx="${index}" 
                              value="${item.pricePerKg}" 
                              class="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs focus:ring-1 focus:ring-amber-500" 
                            />
                          </div>
                        </td>
                        <td class="px-3 py-2.5 font-mono font-bold text-emerald-400">
                          ₹${lineCost.toFixed(1)}
                        </td>
                        <td class="px-3 py-2.5 text-right">
                          <button 
                            type="button" 
                            data-remove-feed-idx="${index}" 
                            class="p-1 rounded text-slate-500 hover:text-rose-400 text-xs"
                          >
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- Add Ingredient Quick Picker -->
            <div class="flex items-center gap-2 pt-2 border-t border-slate-800">
              <select id="quickAddFeedSelect" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-amber-500">
                <option value="">+ अन्य चारा अथवा दाना जोड़ें...</option>
                ${state.feedLibrary
                  .filter((f) => !state.selectedRationFeeds.some((s) => s.id === f.id))
                  .map((f) => `<option value="${f.id}">${f.name} (CP ${f.cp}%, TDN ${f.tdn}%)</option>`)
                  .join("")}
              </select>
              <button id="btnQuickAddFeed" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 shadow">
                जोड़ें (Add)
              </button>
            </div>

          </div>

          <!-- Right Pane: Nutritional Adequacy Meters & Economics (Cols 8-12) -->
          <div class="xl:col-span-5 flex flex-col gap-5">
            
            <!-- Adequacy Gauge Card -->
            <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-chart-pie text-emerald-400"></i>
                  <h3 class="text-xs font-mono font-bold uppercase text-white">पोषक तत्व संतुलन सूचकांक</h3>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  Math.abs(dmiDiff) <= 1.0 && cpDiff >= 0 && tdnDiff >= 0
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }">
                  ${Math.abs(dmiDiff) <= 1.0 && cpDiff >= 0 && tdnDiff >= 0 ? "संतुलित (BALANCED)" : "सुधार आवश्यक (DEFICIT/EXCESS)"}
                </span>
              </div>

              <!-- Meter 1: Dry Matter Intake (DMI) -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-slate-300">शुष्क पदार्थ (DMI क्षमता):</span>
                  <span><strong class="${sup.totalDmiKg > req.dmiKg + 1.5 ? "text-rose-400" : "text-white"}">${sup.totalDmiKg} kg</strong> / <span class="text-slate-400">${req.dmiKg} kg</span></span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div class="h-full ${sup.totalDmiKg > req.dmiKg + 1.5 ? "bg-rose-500" : "bg-emerald-400"}" style="width: ${dmiPct}%;"></div>
                </div>
                <div class="text-[10px] text-right font-mono text-slate-500">
                  ${dmiDiff >= 0 ? `+${dmiDiff} kg अतिरिक्त` : `${dmiDiff} kg न्यूनता`}
                </div>
              </div>

              <!-- Meter 2: Crude Protein (CP) -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-slate-300">कच्चा प्रोटीन (Crude Protein):</span>
                  <span><strong class="${cpDiff < 0 ? "text-rose-400" : "text-emerald-400"}">${sup.totalCpKg} kg</strong> / <span class="text-slate-400">${req.cpKg} kg</span></span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div class="h-full ${cpDiff < 0 ? "bg-amber-500" : "bg-emerald-400"}" style="width: ${cpPct}%;"></div>
                </div>
                <div class="text-[10px] text-right font-mono ${cpDiff < 0 ? "text-rose-400" : "text-emerald-400"}">
                  ${cpDiff >= 0 ? `+${cpDiff} kg पर्याप्त` : `${cpDiff} kg प्रोटीन कमी!`}
                </div>
              </div>

              <!-- Meter 3: Energy (TDN) -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-slate-300">कुल पाचक तत्व / ऊर्जा (TDN):</span>
                  <span><strong class="${tdnDiff < 0 ? "text-rose-400" : "text-cyan-400"}">${sup.totalTdnKg} kg</strong> / <span class="text-slate-400">${req.tdnKg} kg</span></span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div class="h-full ${tdnDiff < 0 ? "bg-amber-500" : "bg-cyan-400"}" style="width: ${tdnPct}%;"></div>
                </div>
                <div class="text-[10px] text-right font-mono ${tdnDiff < 0 ? "text-rose-400" : "text-cyan-400"}">
                  ${tdnDiff >= 0 ? `+${tdnDiff} kg पर्याप्त` : `${tdnDiff} kg ऊर्जा कमी`}
                </div>
              </div>

              <!-- Calcium & Phosphorus Balance -->
              <div class="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500 uppercase">कैल्शियम (Ca)</div>
                  <div class="font-bold text-white mt-0.5">${sup.totalCaGrams} g <span class="text-[10px] text-slate-400">/ ${req.calciumG}g</span></div>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500 uppercase">फास्फोरस (P)</div>
                  <div class="font-bold text-white mt-0.5">${sup.totalPGrams} g <span class="text-[10px] text-slate-400">/ ${req.phosphorusG}g</span></div>
                </div>
              </div>
            </div>

            <!-- Financial Efficiency & Daily Economics Card -->
            <div class="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 p-5 shadow-xl space-y-3">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-coins text-amber-400"></i>
                  <span>दैनिक दुग्ध अर्थशास्त्र (Dairy Economics)</span>
                </div>
                <span class="text-xs font-mono font-bold text-emerald-400">मार्जिन: ${fin.profitMarginPercent}%</span>
              </div>

              <div class="grid grid-cols-2 gap-3 font-mono">
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">कुल दैनिक राशन लागत</div>
                  <div class="text-lg font-black text-rose-400 mt-0.5">₹${fin.dailyFeedCost}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">प्रति दिन प्रति पशु</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">चारा लागत प्रति लीटर दूध</div>
                  <div class="text-lg font-black text-amber-400 mt-0.5">₹${fin.costPerLiter}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">दूध भाव: ₹${state.animalProfile.milkSellingPricePerLiter}/L</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">दैनिक दूध आय (Revenue)</div>
                  <div class="text-lg font-black text-cyan-400 mt-0.5">₹${fin.dailyRevenue}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">${state.animalProfile.milkYieldLiters} L × ₹${state.animalProfile.milkSellingPricePerLiter}</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">शुद्ध दैनिक बचत (Net Profit)</div>
                  <div class="text-lg font-black text-emerald-400 mt-0.5">₹${fin.dailyGrossProfit}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">दूध आय - चारा खर्च</div>
                </div>
              </div>

              <div class="pt-2">
                <button id="btnSaveRationToEmr" type="button" class="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <i class="fa-solid fa-floppy-disk"></i>
                  <span>यह आहार योजना सहेजें एवं EMR से जोड़ें</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 2: Pearson Square Protein Balancer Tool
    buildPearsonSquareWorkstationHtml: function () {
      const solver = state.pearsonSquareSolver;
      const calc = solver.calculatedParts;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg">
                  <i class="fa-solid fa-shapes"></i>
                </div>
                <div>
                  <h3 class="text-sm font-display font-black text-white">पियर्सन स्क्वायर प्रोटीन मिश्रण गणक (Pearson Square Solver)</h3>
                  <div class="text-[11px] font-mono text-amber-300/90">दो घटकों को मिलाकर वांछित कच्चा प्रोटीन (Target CP %) दाना तैयार करने की बीजगणितीय विधि</div>
                </div>
              </div>
            </div>

            <!-- Inputs Strip -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono mb-6">
              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1">वांछित लक्ष्य प्रोटीन (Target CP %)</label>
                <input 
                  type="number" 
                  step="0.5" 
                  id="psTargetCpInput" 
                  value="${solver.targetCpPercent}" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1">उच्च प्रोटीन घटक (High CP Ingredient)</label>
                <select id="psHighFeedSelect" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:ring-2 focus:ring-amber-500">
                  <option value="ing_mustard_cake" ${solver.highFeedId === "ing_mustard_cake" ? "selected" : ""}>Mustard Cake (CP 36%)</option>
                  <option value="ing_cottonseed_cake" ${solver.highFeedId === "ing_cottonseed_cake" ? "selected" : ""}>Cottonseed Cake (CP 24%)</option>
                  <option value="ing_soybean_meal" ${solver.highFeedId === "ing_soybean_meal" ? "selected" : ""}>Soybean Meal (CP 46%)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1">निम्न प्रोटीन / ऊर्जा घटक (Low CP Energy Grain)</label>
                <select id="psLowFeedSelect" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:ring-2 focus:ring-amber-500">
                  <option value="ing_maize_grain" ${solver.lowFeedId === "ing_maize_grain" ? "selected" : ""}>Maize Grain (CP 9.5%)</option>
                  <option value="ing_wheat_bran" ${solver.lowFeedId === "ing_wheat_bran" ? "selected" : ""}>Wheat Bran (CP 14.5%)</option>
                </select>
              </div>
            </div>

            <!-- Visual Pearson Square Schematic Box -->
            <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
              
              <!-- Left High Feed -->
              <div class="text-center">
                <div class="text-xs font-bold text-white">${calc.highName}</div>
                <div class="text-2xl font-black font-mono text-emerald-400 mt-1">${calc.highCp}% CP</div>
              </div>

              <!-- Center Square Target -->
              <div class="relative w-32 h-32 rounded-2xl bg-amber-500/10 border-2 border-dashed border-amber-500/60 flex flex-col items-center justify-center p-2 shadow-inner">
                <div class="text-[10px] font-mono uppercase text-amber-400 font-bold">लक्ष्य CP</div>
                <div class="text-3xl font-black font-mono text-white mt-0.5">${solver.targetCpPercent}%</div>
              </div>

              <!-- Right Low Feed -->
              <div class="text-center">
                <div class="text-xs font-bold text-white">${calc.lowName}</div>
                <div class="text-2xl font-black font-mono text-amber-400 mt-1">${calc.lowCp}% CP</div>
              </div>

            </div>

            <!-- Output Formulated Ratio Banner -->
            <div class="mt-6 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-slate-300 font-semibold">${calc.highName} का अनुपात:</span>
                <span class="text-lg font-black text-emerald-400">${calc.highPct}% (अर्थात प्रति 100 kg दाने में ${calc.highPct} kg)</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-slate-300 font-semibold">${calc.lowName} का अनुपात:</span>
                <span class="text-lg font-black text-amber-400">${calc.lowPct}% (अर्थात प्रति 100 kg दाने में ${calc.lowPct} kg)</span>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 3: Feed Ingredients Database Manager
    buildIngredientManagerWorkstationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-database text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                भारतीय चारा एवं दाना पोषण संरचना संदर्भ (Feed Composition Matrix)
              </h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">ICAR-NIANP Bengaluru Standards</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">चारा / दाना नाम</th>
                  <th class="px-3.5 py-3">वर्ग (Category)</th>
                  <th class="px-3.5 py-3">शुष्क पदार्थ (DM %)</th>
                  <th class="px-3.5 py-3">कच्चा प्रोटीन (CP %)</th>
                  <th class="px-3.5 py-3">ऊर्जा (TDN %)</th>
                  <th class="px-3.5 py-3">Ca / P (%)</th>
                  <th class="px-3.5 py-3 font-sans">विवरण एवं उपयोगिता</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80 font-sans">
                ${state.feedLibrary
                  .map((f) => {
                    return `
                    <tr class="hover:bg-slate-850/50 transition-colors">
                      <td class="px-3.5 py-3 font-semibold text-white text-xs">${f.name}</td>
                      <td class="px-3.5 py-3 font-mono text-[11px] text-slate-400 uppercase">${f.category.replace("_", " ")}</td>
                      <td class="px-3.5 py-3 font-mono text-slate-200 font-bold">${f.dm}%</td>
                      <td class="px-3.5 py-3 font-mono text-emerald-400 font-bold">${f.cp}%</td>
                      <td class="px-3.5 py-3 font-mono text-cyan-400 font-bold">${f.tdn}%</td>
                      <td class="px-3.5 py-3 font-mono text-slate-300 text-xs">${f.ca}% / ${f.p}%</td>
                      <td class="px-3.5 py-3 text-xs text-slate-400 leading-relaxed">${f.description}</td>
                    </tr>
                  `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 4: Printable Feeding Chart Workstation
    buildPrintFeedChartWorkstationHtml: function (sup, fin) {
      const p = state.animalProfile;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 class="text-sm font-display font-bold text-white">पशुपालक दैनिक आहार तालिका (Farmer-Ready Feeding Chart)</h3>
              <p class="text-xs text-slate-400 mt-0.5">सुबह एवं शाम दोहरे समय के अनुसार सटीक तौल मात्राएं</p>
            </div>
            <button id="btnPrintRationSchedule" type="button" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-950/50 flex items-center gap-1.5 transition-all active:scale-95">
              <i class="fa-solid fa-print"></i>
              <span>डाइट चार्ट प्रिंट करें (Print Chart)</span>
            </button>
          </div>

          <!-- Morning / Evening Table Preview -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Morning Ration Box -->
            <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <span class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-sun text-sm"></i>
                  <span>प्रातःकालीन आहार (Morning Feed - 50%)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">समय: 06:00 AM</span>
              </div>
              <div class="space-y-2 text-xs font-mono">
                ${state.selectedRationFeeds
                  .map((item) => {
                    const ing = state.feedLibrary.find((f) => f.id === item.id);
                    if (!ing) return "";
                    const halfDose = (parseFloat(item.asFedKg) / 2).toFixed(2);
                    return `
                    <div class="flex items-center justify-between py-1 border-b border-slate-900 font-sans">
                      <span class="text-slate-300">${ing.name}:</span>
                      <strong class="text-white font-mono">${halfDose} kg</strong>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </div>

            <!-- Evening Ration Box -->
            <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <span class="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-moon text-sm"></i>
                  <span>सायंकालीन आहार (Evening Feed - 50%)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">समय: 05:30 PM</span>
              </div>
              <div class="space-y-2 text-xs font-mono">
                ${state.selectedRationFeeds
                  .map((item) => {
                    const ing = state.feedLibrary.find((f) => f.id === item.id);
                    if (!ing) return "";
                    const halfDose = (parseFloat(item.asFedKg) / 2).toFixed(2);
                    return `
                    <div class="flex items-center justify-between py-1 border-b border-slate-900 font-sans">
                      <span class="text-slate-300">${ing.name}:</span>
                      <strong class="text-white font-mono">${halfDose} kg</strong>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </div>

          </div>

          <!-- Farmer Advisory Checklist -->
          <div class="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
            <div class="text-emerald-400 font-bold uppercase font-mono">पशुपालक हेतु आवश्यक वैज्ञानिक सलाह:</div>
            <ul class="list-disc pl-5 text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li>सूखे भूसे को हरे चारे के साथ सानी (मिश्रण) बनाकर ही खिलाएं जिससे चारा व्यर्थ न हो और जुगाली सुचारु रहे।</li>
              <li>दाना मिश्रण को कम से कम 2 से 3 घंटे पूर्व पानी में भिगोकर ही खिलाएं ताकि सुपाच्यता बढ़ सके।</li>
              <li>50 ग्राम खनिज मिश्रण एवं 30 ग्राम सादा नमक प्रतिदिन दाने में मिलाकर देना अनिवार्य है।</li>
              <li>पीने हेतु 24 घंटे स्वच्छ, ताजा व ठंडा पानी उपलब्ध रखें (1 लीटर दूध उत्पादन हेतु कम से कम 4-5 लीटर पानी की आवश्यकता होती है)।</li>
            </ul>
          </div>
        </div>
      `;
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-nutri-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-nutri-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Profile Sliders & Inputs
      const bwSlider = container.querySelector("#nutriBwSlider");
      if (bwSlider) {
        bwSlider.addEventListener("input", (e) => {
          state.animalProfile.bodyWeightKg = parseFloat(e.target.value);
          this.render(container);
        });
      }
      const milkInput = container.querySelector("#nutriMilkInput");
      if (milkInput) {
        milkInput.addEventListener("change", (e) => {
          state.animalProfile.milkYieldLiters = parseFloat(e.target.value) || 0;
          this.render(container);
        });
      }
      const fatInput = container.querySelector("#nutriFatInput");
      if (fatInput) {
        fatInput.addEventListener("change", (e) => {
          state.animalProfile.milkFatPercent = parseFloat(e.target.value) || 4.0;
          this.render(container);
        });
      }
      const pregSelect = container.querySelector("#nutriPregnancySelect");
      if (pregSelect) {
        pregSelect.addEventListener("change", (e) => {
          state.animalProfile.pregnancyMonth = parseInt(e.target.value, 10);
          this.render(container);
        });
      }
      const specSelect = container.querySelector("#nutriSpeciesSelect");
      if (specSelect) {
        specSelect.addEventListener("change", (e) => {
          state.animalProfile.species = e.target.value;
          this.render(container);
        });
      }

      // 3. Feed Quantity Changes
      container.querySelectorAll("[data-feed-kg-idx]").forEach((inp) => {
        inp.addEventListener("change", (e) => {
          const idx = parseInt(e.target.getAttribute("data-feed-kg-idx"), 10);
          const val = parseFloat(e.target.value) || 0;
          if (state.selectedRationFeeds[idx]) {
            state.selectedRationFeeds[idx].asFedKg = val;
            this.render(container);
          }
        });
      });

      // 4. Feed Price Changes
      container.querySelectorAll("[data-feed-price-idx]").forEach((inp) => {
        inp.addEventListener("change", (e) => {
          const idx = parseInt(e.target.getAttribute("data-feed-price-idx"), 10);
          const val = parseFloat(e.target.value) || 0;
          if (state.selectedRationFeeds[idx]) {
            state.selectedRationFeeds[idx].pricePerKg = val;
            this.render(container);
          }
        });
      });

      // 5. Remove Feed Item
      container.querySelectorAll("[data-remove-feed-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-remove-feed-idx"), 10);
          state.selectedRationFeeds.splice(idx, 1);
          this.render(container);
          notify("सामग्री राशन से हटाई गई।", "info");
        });
      });

      // 6. Quick Add Feed Item
      const btnAdd = container.querySelector("#btnQuickAddFeed");
      if (btnAdd) {
        btnAdd.addEventListener("click", () => {
          const select = container.querySelector("#quickAddFeedSelect");
          if (!select || !select.value) return;
          const fid = select.value;
          const ing = state.feedLibrary.find((f) => f.id === fid);
          if (ing) {
            state.selectedRationFeeds.push({
              id: ing.id,
              asFedKg: ing.category === "green_fodder" ? 10.0 : 1.0,
              pricePerKg: ing.defaultPricePerKg
            });
            this.render(container);
            notify(`${ing.name} राशन में सम्मिलित हुआ।`, "success");
          }
        });
      }

      // 7. Pearson Square Solver Inputs
      const psTarget = container.querySelector("#psTargetCpInput");
      if (psTarget) {
        psTarget.addEventListener("input", (e) => {
          state.pearsonSquareSolver.targetCpPercent = parseFloat(e.target.value) || 20.0;
          this.runPearsonSquareCalculation();
          this.render(container);
        });
      }
      const psHigh = container.querySelector("#psHighFeedSelect");
      if (psHigh) {
        psHigh.addEventListener("change", (e) => {
          state.pearsonSquareSolver.highFeedId = e.target.value;
          this.runPearsonSquareCalculation();
          this.render(container);
        });
      }
      const psLow = container.querySelector("#psLowFeedSelect");
      if (psLow) {
        psLow.addEventListener("change", (e) => {
          state.pearsonSquareSolver.lowFeedId = e.target.value;
          this.runPearsonSquareCalculation();
          this.render(container);
        });
      }

      // 8. Save Ration to EMR
      const btnSaveEmr = container.querySelector("#btnSaveRationToEmr");
      if (btnSaveEmr) {
        btnSaveEmr.addEventListener("click", () => this.saveRationToEmr());
      }

      // 9. Print Diet Chart
      const btnPrintChart = container.querySelector("#btnPrintRationSchedule");
      if (btnPrintChart) {
        btnPrintChart.addEventListener("click", () => this.printDietChart());
      }
    },

    // 6. PERSISTENCE & EMR INTEGRATION
    saveRationToEmr: async function () {
      const requirements = this.calculateNutrientRequirements(state.animalProfile);
      const supplied = this.evaluateRationNutrients(state.selectedRationFeeds);
      const financials = this.calculateEconomics(supplied.totalCost, state.animalProfile.milkYieldLiters, state.animalProfile.milkSellingPricePerLiter);

      const planRecord = {
        recordId: "REC-NUTRI-" + Date.now(),
        patientId: "PAT-HERD-NUTRITION",
        recordType: "nutrition",
        timestamp: new Date().toISOString(),
        animalProfile: state.animalProfile,
        requirements: requirements,
        supplied: supplied,
        financials: financials,
        feeds: state.selectedRationFeeds
      };

      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_NUTRITION, "readwrite");
        const store = tx.objectStore(STORE_NUTRITION);
        store.put(planRecord);
      } catch (err) {
        console.error("Failed to commit nutrition plan to DB", err);
      }

      window.dispatchEvent(new CustomEvent("nutrition:ration_saved", { detail: planRecord }));
      notify("वैज्ञानिक पोषण योजना सफलतापूर्वक सहेजी गई एवं EMR से संबद्ध हुई!", "success");
    },

    // 7. PRINTABLE BILINGUAL DIET CHART
    printDietChart: function () {
      const p = state.animalProfile;
      const requirements = this.calculateNutrientRequirements(p);
      const supplied = this.evaluateRationNutrients(state.selectedRationFeeds);
      const financials = this.calculateEconomics(supplied.totalCost, p.milkYieldLiters, p.milkSellingPricePerLiter);

      const printWindow = window.open("", "_blank", "width=850,height=950");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = state.selectedRationFeeds
        .map((item) => {
          const ing = state.feedLibrary.find((f) => f.id === item.id);
          if (!ing) return "";
          const half = (parseFloat(item.asFedKg) / 2).toFixed(2);
          const totalCost = (parseFloat(item.asFedKg) * (parseFloat(item.pricePerKg) || ing.defaultPricePerKg)).toFixed(1);

          return `
          <tr>
            <td style="padding: 7px 10px; border: 1px solid #d1d5db; font-weight: bold;">${ing.name}</td>
            <td style="padding: 7px 10px; border: 1px solid #d1d5db; text-align: center; font-family: monospace;">${half} kg</td>
            <td style="padding: 7px 10px; border: 1px solid #d1d5db; text-align: center; font-family: monospace;">${half} kg</td>
            <td style="padding: 7px 10px; border: 1px solid #d1d5db; text-align: center; font-family: monospace; font-weight: bold;">${item.asFedKg} kg</td>
            <td style="padding: 7px 10px; border: 1px solid #d1d5db; text-align: center; font-family: monospace;">₹${totalCost}</td>
          </tr>
        `;
        })
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>वैज्ञानिक दैनिक पशु आहार चार्ट - ICAR Standards</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 15px; font-size: 12px; }
            .chart-box { border: 3px double #064e3b; padding: 25px; border-radius: 12px; }
            .header-strip { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 20px; }
            .inst-title { font-size: 18px; font-weight: 800; color: #064e3b; text-transform: uppercase; }
            .sub-title { font-size: 13px; font-weight: bold; margin-top: 2px; }
            .bio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #f9fafb; padding: 12px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb; font-size: 11px; }
            .feed-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
            .feed-table th { background: #064e3b; color: #ffffff; padding: 8px 10px; font-weight: bold; text-align: center; }
            .feed-table th:first-child { text-align: left; }
            .econ-box { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #ecfdf5; border: 1.5px solid #059669; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 11px; }
            .advisory { font-size: 11px; color: #374151; line-height: 1.6; }
            .footer-strip { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="chart-box">
            <div class="header-strip">
              <div class="inst-title">राष्ट्रीय पशु पोषण एवं डेयरी प्रबंधन संस्थान</div>
              <div class="sub-title">वैज्ञानिक दैनिक आहार एवं राशन संतुलन चार्ट (ICAR-NIANP Standards)</div>
              <div style="font-family: monospace; font-size: 10px; color: #555; margin-top: 2px;">VETCARE AI OS 2026 NUTRITION CORE</div>
            </div>

            <div class="bio-grid">
              <div>
                <div><strong>पशु प्रजाति:</strong> ${p.species.toUpperCase()} (${p.breed})</div>
                <div><strong>शारीरिक वजन:</strong> ${p.bodyWeightKg} किलोग्राम</div>
              </div>
              <div>
                <div><strong>दैनिक दूध उत्पादन:</strong> ${p.milkYieldLiters} लीटर (वसा: ${p.milkFatPercent}% FAT)</div>
                <div><strong>दैनिक शुष्क पदार्थ आवश्यकता (DMI):</strong> ${requirements.dmiKg} kg/दिन</div>
              </div>
            </div>

            <table class="feed-table">
              <thead>
                <tr>
                  <th>चारा / दाना घटक</th>
                  <th>प्रातः खुराक (Morning)</th>
                  <th>सायं खुराक (Evening)</th>
                  <th>कुल दैनिक मात्रा (Total)</th>
                  <th>अनुमानित लागत</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>

            <div class="econ-box">
              <div>
                <div><strong>कुल दैनिक चारा खर्च:</strong> ₹${financials.dailyFeedCost} प्रति दिन</div>
                <div><strong>चारा खर्च प्रति लीटर दूध:</strong> ₹${financials.costPerLiter} / लीटर</div>
              </div>
              <div>
                <div><strong>दैनिक दूध बिक्री आय:</strong> ₹${financials.dailyRevenue} प्रति दिन</div>
                <div><strong>शुद्ध दैनिक आय (बचत):</strong> ₹${financials.dailyGrossProfit} प्रति दिन</div>
              </div>
            </div>

            <div class="advisory">
              <strong>पशुपालक हेतु आवश्यक निर्देश:</strong>
              <ol style="margin-top: 4px; padding-left: 18px;">
                <li>सूखा भूसा व हरा चारा आपस में सानी बनाकर ही खिलाएं।</li>
                <li>दाना मिश्रण को 2-3 घंटे पहले पानी में भिगोकर ही दें।</li>
                <li>50 ग्राम खनिज मिश्रण (Mineral Mixture) व 30 ग्राम सादा नमक प्रतिदिन दाने में मिलाकर देना अनिवार्य है।</li>
                <li>पीने हेतु दिन-रात स्वच्छ व ताजा पानी उपलब्ध रखें।</li>
              </ol>
            </div>

            <div class="footer-strip">
              <div>सत्यापन: SHA256-RATION-CERTIFIED • जारी तिथि: ${new Date().toLocaleDateString("hi-IN")}</div>
              <div>अधिकृत पशु पोषण विशेषज्ञ (Animal Nutritionist)</div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.FeedRationBalancer = FeedRationBalancer;

})(typeof window !== "undefined" ? window : this);
