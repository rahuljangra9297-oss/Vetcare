// Vetcare AI OS - Multi-Species Veterinary Clinical Calculators, Fluid Therapy & CRI Workbench (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Clinical Reference Formularies & Pharmacometric Standards
  window.VetcareApp.ClinicalData.CalculatorStandards = {
    FLUID_MAINTENANCE: {
      canine: { linearPerKg: 60, exponentialExp: 0.75, exponentialFactor: 132 },
      feline: { linearPerKg: 45, exponentialExp: 0.75, exponentialFactor: 80 },
      bovine: { linearPerKg: 50, exponentialExp: 0.75, exponentialFactor: 100 },
      equine: { linearPerKg: 50, exponentialExp: 0.75, exponentialFactor: 100 },
      caprine: { linearPerKg: 50, exponentialExp: 0.75, exponentialFactor: 90 },
      ovine: { linearPerKg: 50, exponentialExp: 0.75, exponentialFactor: 90 }
    },

    BLOOD_VOLUME_FACTORS: {
      canine: 90, // ml/kg
      feline: 60,
      bovine: 70,
      equine: 80,
      caprine: 65,
      ovine: 65
    },

    CRI_DRUG_LIBRARY: {
      Lidocaine: {
        name: 'Lidocaine 2% (20 mg/ml)',
        stockConcentrationMgMl: 20.0,
        defaultDoseUnit: 'mcg/kg/min',
        defaultDose: 30.0,
        minDose: 20.0,
        maxDose: 50.0,
        contraindicatedSpecies: ['feline'],
        indication: 'Ventricular arrhythmias, visceral analgesia, prokinetic in dogs'
      },
      Ketamine: {
        name: 'Ketamine HCl (100 mg/ml)',
        stockConcentrationMgMl: 100.0,
        defaultDoseUnit: 'mcg/kg/min',
        defaultDose: 5.0,
        minDose: 2.0,
        maxDose: 10.0,
        contraindicatedSpecies: [],
        indication: 'NMDA receptor antagonism, wind-up pain prevention'
      },
      Morphine: {
        name: 'Morphine Sulphate (10 mg/ml)',
        stockConcentrationMgMl: 10.0,
        defaultDoseUnit: 'mg/kg/hr',
        defaultDose: 0.15,
        minDose: 0.05,
        maxDose: 0.3,
        contraindicatedSpecies: [],
        indication: 'Pure mu-opioid severe somatic & visceral analgesia'
      },
      Metoclopramide: {
        name: 'Metoclopramide (5 mg/ml)',
        stockConcentrationMgMl: 5.0,
        defaultDoseUnit: 'mg/kg/24hr',
        defaultDose: 1.5,
        minDose: 1.0,
        maxDose: 2.0,
        contraindicatedSpecies: [],
        indication: 'Upper GI prokinetic, antiemetic, reflux oesophagitis'
      },
      Dobutamine: {
        name: 'Dobutamine (12.5 mg/ml / 250mg in 20ml)',
        stockConcentrationMgMl: 12.5,
        defaultDoseUnit: 'mcg/kg/min',
        defaultDose: 5.0,
        minDose: 2.0,
        maxDose: 15.0,
        contraindicatedSpecies: [],
        indication: 'Positive inotropic support during cardiogenic shock/hypotension'
      },
      Fentanyl: {
        name: 'Fentanyl Citrate (50 mcg/ml = 0.05 mg/ml)',
        stockConcentrationMgMl: 0.05,
        defaultDoseUnit: 'mcg/kg/hr',
        defaultDose: 4.0,
        minDose: 2.0,
        maxDose: 8.0,
        contraindicatedSpecies: [],
        indication: 'Potent short-acting opioid infusion for critical surgical care'
      }
    }
  };

  // 2. INTERNAL REACTIVE STATE
  const State = {
    activeTool: 'fluid_therapy',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    patientContext: {
      patientId: 'PT-AUTO-2026',
      patientName: 'Sheru',
      species: 'canine',
      bodyWeightKg: 15.0,
      ageMonths: 36,
      isPediatric: false
    },

    toolOutputs: {},
    calculationHistory: []
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcareCalculatorsDB',
    DB_VERSION: 1,
    STORE_NAME: 'clinical_calculations',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[CalculatorsWorkbench] IndexedDB not available, reverting to LocalStorage.');
          resolve(null);
          return;
        }

        const request = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'id' });
          }
        };

        request.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        request.onerror = (event) => {
          console.error('[CalculatorsWorkbench] DB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async saveCalculation(record) {
      record.id = 'CALC-' + Date.now();
      record.timestamp = new Date().toISOString();

      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put(record);
            tx.oncomplete = () => {
              State.calculationHistory.unshift(record);
              resolve(true);
            };
            tx.onerror = () => {
              StorageAdapter.saveFallback(record);
              resolve(true);
            };
          } catch (e) {
            StorageAdapter.saveFallback(record);
            resolve(true);
          }
        });
      } else {
        StorageAdapter.saveFallback(record);
        return Promise.resolve(true);
      }
    },

    saveFallback(record) {
      State.calculationHistory.unshift(record);
      try {
        localStorage.setItem('VETCARE_CALC_HIST', JSON.stringify(State.calculationHistory.slice(0, 30)));
      } catch (e) {
        // Safe storage boundary
      }
    },

    async loadHistory() {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => {
              const list = req.result || [];
              list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
              State.calculationHistory = list;
              resolve(list);
            };
            req.onerror = () => resolve(StorageAdapter.loadFallback());
          } catch (e) {
            resolve(StorageAdapter.loadFallback());
          }
        });
      } else {
        return Promise.resolve(StorageAdapter.loadFallback());
      }
    },

    loadFallback() {
      try {
        const raw = localStorage.getItem('VETCARE_CALC_HIST');
        State.calculationHistory = raw ? JSON.parse(raw) : [];
        return State.calculationHistory;
      } catch (e) {
        return [];
      }
    }
  };

  // 4. SCIENTIFIC PHARMACOMETRIC & CRITICAL CARE MATHEMATICS
  const ClinicalMath = {
    // 1. ADVANCED FLUID THERAPY & INFUSION RATE
    computeFluidTherapy(params) {
      const bw = parseFloat(params.bodyWeightKg) || 1.0;
      const dehyPct = parseFloat(params.dehydrationPercent) || 0.0;
      const species = params.species || 'canine';
      const hoursToReplace = parseFloat(params.replacementHours) || 24.0;
      const ongoingLossesMl = parseFloat(params.ongoingLossesMl) || 0.0;
      const dripFactorGttMl = parseInt(params.dripFactor, 10) || 15; // 15, 20, 60 (micro)

      // Dehydration Deficit (ml) = BW (kg) * (% / 100) * 1000
      const deficitMl = bw * (dehyPct / 100.0) * 1000.0;

      // 24h Maintenance Calculation
      const maintStd = window.VetcareApp.ClinicalData.CalculatorStandards.FLUID_MAINTENANCE[species] ||
                       window.VetcareApp.ClinicalData.CalculatorStandards.FLUID_MAINTENANCE.canine;
      
      let maintenance24hMl = 0;
      if (params.maintenanceFormula === 'exponential') {
        // Allometric formula: Factor * (BW ^ 0.75)
        maintenance24hMl = maintStd.exponentialFactor * Math.pow(bw, maintStd.exponentialExp);
      } else {
        // Standard linear clinical rate: e.g. 60 ml/kg/day
        maintenance24hMl = bw * maintStd.linearPerKg;
      }

      // Maintenance scaled to target replacement period
      const scaledMaintenance = (maintenance24hMl / 24.0) * hoursToReplace;
      const totalVolumeMl = deficitMl + scaledMaintenance + ongoingLossesMl;
      const rateMlHr = totalVolumeMl / hoursToReplace;
      const dropsPerMinute = (rateMlHr * dripFactorGttMl) / 60.0;
      const secondsPerDrop = dropsPerMinute > 0 ? (60.0 / dropsPerMinute) : 0;

      return {
        deficitMl: Math.round(deficitMl),
        dailyMaintenanceMl: Math.round(maintenance24hMl),
        ongoingLossesMl: Math.round(ongoingLossesMl),
        totalVolumeMl: Math.round(totalVolumeMl),
        replacementHours: hoursToReplace,
        rateMlHr: Math.round(rateMlHr * 10) / 10,
        dripFactorGttMl: dripFactorGttMl,
        dropsPerMinute: Math.round(dropsPerMinute),
        secondsPerDrop: Math.round(secondsPerDrop * 10) / 10
      };
    },

    // 2. CONSTANT RATE INFUSION (CRI) MASTER ENGINE
    computeCRI(params) {
      const bw = parseFloat(params.bodyWeightKg) || 1.0;
      const drugKey = params.drugKey || 'Lidocaine';
      const drug = window.VetcareApp.ClinicalData.CalculatorStandards.CRI_DRUG_LIBRARY[drugKey];
      const dose = parseFloat(params.prescribedDose) || drug.defaultDose;
      const ivBagVolumeMl = parseFloat(params.ivBagVolumeMl) || 500.0;
      const fluidRateMlHr = parseFloat(params.fluidRateMlHr) || 30.0;

      // Convert dose to Total mg/hr based on unit
      let doseMgHr = 0;
      if (drug.defaultDoseUnit === 'mcg/kg/min') {
        doseMgHr = (dose * bw * 60.0) / 1000.0;
      } else if (drug.defaultDoseUnit === 'mcg/kg/hr') {
        doseMgHr = (dose * bw) / 1000.0;
      } else if (drug.defaultDoseUnit === 'mg/kg/hr') {
        doseMgHr = dose * bw;
      } else if (drug.defaultDoseUnit === 'mg/kg/24hr') {
        doseMgHr = (dose * bw) / 24.0;
      }

      // Time duration for the IV bag to empty at fluidRateMlHr
      const bagDurationHours = fluidRateMlHr > 0 ? (ivBagVolumeMl / fluidRateMlHr) : 0;
      const totalDrugMgNeededInBag = doseMgHr * bagDurationHours;
      const drugVolumeMlToAdd = totalDrugMgNeededInBag / drug.stockConcentrationMgMl;

      return {
        drugName: drug.name,
        prescribedDose: dose,
        doseUnit: drug.defaultDoseUnit,
        doseMgHr: Math.round(doseMgHr * 100) / 100,
        bagDurationHours: Math.round(bagDurationHours * 10) / 10,
        totalDrugMgInBag: Math.round(totalDrugMgNeededInBag * 10) / 10,
        drugVolumeMlToAdd: Math.round(drugVolumeMlToAdd * 100) / 100,
        fluidVolumeToRemoveMl: Math.round(drugVolumeMlToAdd * 10) / 10,
        finalBagVolumeMl: ivBagVolumeMl
      };
    },

    // 3. WHOLE BLOOD TRANSFUSION VOLUME
    computeBloodTransfusion(params) {
      const bw = parseFloat(params.bodyWeightKg) || 1.0;
      const species = params.species || 'canine';
      const currentPcv = parseFloat(params.currentPcv) || 12.0;
      const targetPcv = parseFloat(params.targetPcv) || 25.0;
      const donorPcv = parseFloat(params.donorPcv) || 45.0;

      const bloodFactor = window.VetcareApp.ClinicalData.CalculatorStandards.BLOOD_VOLUME_FACTORS[species] || 90;
      
      // Volume of donor blood (ml) = [BW (kg) * Blood Factor] * [(Target PCV - Current PCV) / Donor PCV]
      let volumeNeededMl = (bw * bloodFactor) * ((targetPcv - currentPcv) / donorPcv);
      volumeNeededMl = Math.max(0, volumeNeededMl);

      // Safe infusion rates
      const testRateMlHr = (0.5 * bw); // 0.25 - 0.5 ml/kg/hr for first 30 mins
      const standardRateMlHr = (volumeNeededMl / 4.0); // Transfusion should finish within 4 hours

      return {
        speciesFactorApplied: `${bloodFactor} ml/kg (${species.toUpperCase()})`,
        deficitPcvPoints: Math.max(0, targetPcv - currentPcv),
        transfusionVolumeMl: Math.round(volumeNeededMl),
        initialTestRateMlHr: Math.round(testRateMlHr * 10) / 10,
        mainInfusionRateMlHr: Math.round(standardRateMlHr * 10) / 10,
        maxSafeTransfusionHours: 4.0
      };
    },

    // 4. RESTING ENERGY REQUIREMENT (RER) & MER
    computeCaloricNeeds(params) {
      const bw = parseFloat(params.bodyWeightKg) || 1.0;
      const lifestageFactor = parseFloat(params.lifestageMultiplier) || 1.2;

      // RER = 70 * (BW ^ 0.75)
      const rerKcalDay = 70.0 * Math.pow(bw, 0.75);
      const merKcalDay = rerKcalDay * lifestageFactor;

      // Enteral Diet Volume (Assuming standard 1 kcal/ml veterinary recovery liquid diet e.g. Royal Canin Recovery / EmerAid)
      const kcalPerMlDiet = parseFloat(params.dietCaloricDensity) || 1.0;
      const totalDailyDietMl = merKcalDay / kcalPerMlDiet;
      const stomachCapacityMl = bw * 40.0; // ~40 ml/kg max gastric capacity
      const recommendedDailyFeedings = Math.max(3, Math.ceil(totalDailyDietMl / (stomachCapacityMl * 0.75)));
      const volumePerFeedingMl = totalDailyDietMl / recommendedDailyFeedings;

      return {
        rerKcalDay: Math.round(rerKcalDay),
        merKcalDay: Math.round(merKcalDay),
        totalDietMlDay: Math.round(totalDailyDietMl),
        stomachCapacityMaxMl: Math.round(stomachCapacityMl),
        recommendedFeedings: recommendedDailyFeedings,
        volumePerFeedingMl: Math.round(volumePerFeedingMl)
      };
    },

    // 5. SCHAEFFER'S FORMULA (WEIGHT ESTIMATOR FOR LARGE ANIMALS)
    computeSchaeffersWeight(params) {
      const heartGirthInches = parseFloat(params.heartGirthInches) || 60.0;
      const bodyLengthInches = parseFloat(params.bodyLengthInches) || 50.0;
      const animalType = params.largeAnimalType || 'cattle';

      // Schaeffer's Formula: Weight (lbs) = (Girth^2 * Length) / 300
      let divisor = 300.0;
      if (animalType === 'horse') divisor = 330.0;
      if (animalType === 'buffalo') divisor = 310.0;

      const weightLbs = (Math.pow(heartGirthInches, 2) * bodyLengthInches) / divisor;
      const weightKg = weightLbs * 0.45359237;

      return {
        weightKg: Math.round(weightKg * 10) / 10,
        weightLbs: Math.round(weightLbs),
        divisorUsed: divisor,
        heartGirthInches: heartGirthInches,
        bodyLengthInches: bodyLengthInches
      };
    },

    // 6. DRUG DILUTION & COMPOUNDING (C1V1 = C2V2)
    computeDilution(params) {
      const stockConc = parseFloat(params.stockConcentration) || 50.0; // C1 (%)
      const targetConc = parseFloat(params.targetConcentration) || 5.0; // C2 (%)
      const targetVol = parseFloat(params.targetVolumeMl) || 500.0; // V2 (ml)

      if (targetConc >= stockConc) {
        return { error: 'Target concentration (C2) must be less than stock concentration (C1).' };
      }

      // V1 = (C2 * V2) / C1
      const stockVolumeMl = (targetConc * targetVol) / stockConc;
      const diluentVolumeMl = targetVol - stockVolumeMl;

      return {
        stockVolumeMl: Math.round(stockVolumeMl * 10) / 10,
        diluentVolumeMl: Math.round(diluentVolumeMl * 10) / 10,
        targetVolumeMl: targetVol,
        targetConcentration: targetConc,
        stockConcentration: stockConc
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[CalculatorsWorkbench ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const p = State.patientContext;

      return `
        <div class="calculators-workbench-wrapper max-w-7xl mx-auto space-y-6">

          <!-- TOP PATIENT CONTEXT BAR -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-lg font-bold text-white">क्लिनिकल कैलकुलेटर व गणितीय वर्कबेंच</h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">CRITICAL CARE PHARMACOMETRICS</span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5 font-mono">
                  रिफ़्यूज़न फ़्लूइड दर, सतत नसों की दवा (CRI), रक्त आधान, व बर्न कैलोरी गणना
                </p>
              </div>
            </div>

            <!-- Global Patient Telemetry Modifiers -->
            <div class="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div class="flex items-center gap-1.5 px-2">
                <span class="text-slate-400">प्रजाति:</span>
                <select id="wbSpeciesSelect" class="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono">
                  <option value="canine" ${p.species === 'canine' ? 'selected' : ''}>श्वान (Canine)</option>
                  <option value="feline" ${p.species === 'feline' ? 'selected' : ''}>बिल्ली (Feline)</option>
                  <option value="bovine" ${p.species === 'bovine' ? 'selected' : ''}>गाय/भैंस (Bovine)</option>
                  <option value="equine" ${p.species === 'equine' ? 'selected' : ''}>घोड़ा (Equine)</option>
                  <option value="caprine" ${p.species === 'caprine' ? 'selected' : ''}>बकरी/भेड़ (Small Ruminant)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 px-2">
                <span class="text-slate-400">वजन:</span>
                <input type="number" step="0.5" id="wbBodyWeightInput" value="${p.bodyWeightKg}" class="w-20 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono text-center font-bold" />
                <span class="text-slate-400">kg</span>
              </div>
              <button type="button" id="btnSyncPatientToAll" class="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md">
                लागू करें
              </button>
            </div>
          </div>

          <!-- WORKBENCH GRID (SIDEBAR NAVIGATION + COMPUTATION CANVAS) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Navigation Sidebar -->
            <div class="lg:col-span-3 space-y-2">
              <div class="p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
                
                <button type="button" data-tool="fluid_therapy" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'fluid_therapy' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-droplet text-cyan-400 ${State.activeTool === 'fluid_therapy' ? 'text-slate-950' : ''}"></i>
                    <span>१. ड्रिप व सलाइन दर (Fluids)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

                <button type="button" data-tool="cri_calculator" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'cri_calculator' ? 'bg-rose-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-syringe text-rose-400 ${State.activeTool === 'cri_calculator' ? 'text-slate-950' : ''}"></i>
                    <span>२. सतत नसों की दवा (CRI Engine)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

                <button type="button" data-tool="blood_transfusion" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'blood_transfusion' ? 'bg-red-600 text-white shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-heart-pulse text-red-400 ${State.activeTool === 'blood_transfusion' ? 'text-white' : ''}"></i>
                    <span>३. रक्त आधान (Blood Transfusion)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

                <button type="button" data-tool="caloric_requirements" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'caloric_requirements' ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-fire-flame-curved text-amber-400 ${State.activeTool === 'caloric_requirements' ? 'text-slate-950' : ''}"></i>
                    <span>४. कैलोरी व पोषण (RER / MER)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

                <button type="button" data-tool="weight_estimator" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'weight_estimator' ? 'bg-purple-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-ruler-combined text-purple-400 ${State.activeTool === 'weight_estimator' ? 'text-slate-950' : ''}"></i>
                    <span>५. शेफर्स वजन सूत्र (Schaeffer)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

                <button type="button" data-tool="drug_dilution" class="tool-nav-btn w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${State.activeTool === 'drug_dilution' ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800'}">
                  <span class="flex items-center gap-2.5">
                    <i class="fa-solid fa-vial text-emerald-400 ${State.activeTool === 'drug_dilution' ? 'text-slate-950' : ''}"></i>
                    <span>६. सांद्रता पतला करना (C1V1 = C2V2)</span>
                  </span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>

              </div>

              <!-- Quick Prescription Exporter Action Card -->
              <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span class="text-[10px] font-mono text-slate-400 uppercase font-bold block">प्रिस्क्रिप्शन EMR सिंक</span>
                <p class="text-[11px] text-slate-400">सक्रिय कैलकुलेशन का विवरण तुरंत केस शीट या क्लिपबोर्ड में कॉपी करें।</p>
                <div class="flex gap-2 pt-1">
                  <button type="button" id="btnCopyActiveResult" class="flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-copy text-cyan-400"></i>
                    <span>कॉपी करें</span>
                  </button>
                  <button type="button" id="btnSaveToHistory" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700" title="इतिहास में सहेजें">
                    <i class="fa-solid fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Main Calculation Dynamic Canvas -->
            <div class="lg:col-span-9">
              <div id="calculatorActiveCanvas"></div>
            </div>

          </div>

          <!-- CALCULATION HISTORY AUDIT LOG -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 class="text-xs font-bold font-mono text-slate-300 uppercase flex items-center gap-2">
                <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i>
                <span>हाल की क्लिनिकल गणनाएं (Recent History Audit Log)</span>
              </h3>
              <span class="text-[10px] font-mono text-slate-400">${State.calculationHistory.length} रिकॉर्ड</span>
            </div>
            
            <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
              ${State.calculationHistory.length > 0 ? State.calculationHistory.slice(0, 5).map(h => `
                <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span class="font-bold text-emerald-400">${h.toolTitle}</span>
                    <span class="text-slate-400 text-[11px] ml-2">(${h.species}, ${h.bodyWeightKg}kg)</span>
                    <div class="text-[11px] text-slate-300 mt-0.5">${h.summaryText}</div>
                  </div>
                  <span class="text-[10px] text-slate-400">${new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              `).join('') : '<div class="text-xs text-slate-400 font-mono p-4 text-center">कोई पूर्व गणना रिकॉर्ड मौजूद नहीं है।</div>'}
            </div>
          </div>

        </div>
      `;
    },

    // 1. TOOL: FLUID THERAPY CANVAS
    renderFluidTherapyCanvas() {
      const p = State.patientContext;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-droplet text-cyan-400"></i>
              <span>फ्लूइड थेरेपी एवं ड्रिप इन्फ्यूजन दर कैलकुलेटर (Fluid Deficit + Maintenance)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              निर्जलीकरण घाटा (Dehydration Deficit), दैनिक संधारण (Maintenance) एवं निरंतर तरल हानि का वैज्ञानिक समायोजन
            </p>
          </div>

          <!-- Inputs Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">निर्जलीकरण प्रतिशत (Dehydration %)*</label>
              <select id="fl_dehydration" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="0">0% - कोई निर्जलीकरण नहीं (Normal)</option>
                <option value="5">5% - हल्का सूखा श्लेष्मा (Mild)</option>
                <option value="7" selected>7% - त्वचा लचीलापन कम, CRT 2-3s (Moderate)</option>
                <option value="10">10% - धंसी हुई आंखें, त्वचा टेंटिंग (Severe)</option>
                <option value="12">12% - हाइपोवोलेमिक शॉक संकट (Critical)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">घाटा पूर्ति अवधि (Replacement Period)*</label>
              <select id="fl_hours" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="6">6 घंटे (तीव्र डिहाइड्रेशन सुधार)</option>
                <option value="12">12 घंटे (त्वरित पुनर्जलीकरण)</option>
                <option value="24" selected>24 घंटे (मानक संतुलित दर)</option>
                <option value="48">48 घंटे (कार्डियक/रीनल सतर्क दर)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">निरंतर द्रव हानि (Ongoing Losses in mL)</label>
              <input type="number" id="fl_losses" value="150" placeholder="उल्टी / दस्त अनुमान (mL)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">IV सेट ड्रिप कैलिब्रेशन (IV Drip Factor)*</label>
              <select id="fl_dripFactor" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="15" selected>15 Drops/mL (मानक एडल्ट मैक्रो-ड्रिप IV सेट)</option>
                <option value="20">20 Drops/mL (मानक 20-gtt मैक्रो-ड्रिप सेट)</option>
                <option value="60">60 Drops/mL (माइक्रो-ड्रिप / बाल चिकित्सा / पपी सेट)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">संधारण गणना मॉडल (Maintenance Model)</label>
              <select id="fl_maintenanceFormula" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="linear" selected>लीनियर मानक (60 ml/kg/day श्वान / 50 ml/kg लार्ज)</option>
                <option value="exponential">एलोमेट्रिक घातीय सूत्र (132 × BW^0.75 Canine)</option>
              </select>
            </div>
          </div>

          <!-- Output Dashboard Card -->
          <div id="fluidTherapyResultCard" class="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateFluidTherapy() -->
          </div>
        </div>
      `;
    },

    // 2. TOOL: CRI CALCULATOR CANVAS
    renderCRICanvas() {
      const p = State.patientContext;
      const drugList = Object.keys(window.VetcareApp.ClinicalData.CalculatorStandards.CRI_DRUG_LIBRARY);

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-syringe text-rose-400"></i>
              <span>कांस्टेंट रेट इन्फ्यूजन (CRI Master Pharmacometric Engine)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              IV बोतल में मिलाई जाने वाली शुद्ध औषधि मात्रा (mL) की सटीक स्वचालित गणना
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">औषधि का चयन (CRI Drug)*</label>
              <select id="cri_drugSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                ${drugList.map(k => `<option value="${k}">${k}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रिस्क्राइब्ड डोज़ (Prescribed Dose)*</label>
              <div class="flex gap-2">
                <input type="number" step="0.05" id="cri_doseInput" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
                <span id="cri_unitBadge" class="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 whitespace-nowrap">mcg/kg/min</span>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">IV बैग का आकार (Bag Size mL)*</label>
              <select id="cri_bagVolume" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="100">100 mL IV Bag / Buret</option>
                <option value="250">250 mL IV Bag</option>
                <option value="500" selected>500 mL IV Bottle (मानक सलाइन)</option>
                <option value="1000">1000 mL (1 Litre) IV Bag</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">IV फ्लूइड इन्फ्यूजन दर (Fluid Rate mL/Hr)*</label>
            <input type="number" step="1" id="cri_fluidRate" value="30" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
            <span class="text-[10px] text-slate-400">यह वह दर है जिस पर IV इन्फ्यूजन पंप अथवा ड्रिप सेट रोगी को द्रव देगा।</span>
          </div>

          <!-- Dynamic Output Card -->
          <div id="criResultCard" class="p-4 rounded-xl bg-slate-950 border border-rose-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateCRI() -->
          </div>
        </div>
      `;
    },

    // 3. TOOL: BLOOD TRANSFUSION CANVAS
    renderBloodTransfusionCanvas() {
      const p = State.patientContext;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-heart-pulse text-red-500"></i>
              <span>पूर्ण रक्त आधान मात्रा कैलकुलेटर (Whole Blood Transfusion Volume)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              रोगी एवं दाता के पैक्ड सेल वॉल्यूम (PCV) आधार पर आवश्यक डोनर रक्त मात्रा एवं सुरक्षित इन्फ्यूजन गति
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">रोगी का वर्तमान PCV (%)*</label>
              <input type="number" step="1" id="bt_currentPcv" value="12" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-rose-400 font-mono font-bold" />
              <span class="text-[10px] text-slate-400">&lt; 15% Canine / &lt; 12% Feline रक्त आधान संकेत</span>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लक्ष्य PCV (%) [Target]*</label>
              <input type="number" step="1" id="bt_targetPcv" value="25" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold" />
              <span class="text-[10px] text-slate-400">अनुशंसित लक्ष्य: 25% to 30%</span>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दाता पशु का PCV (%) [Donor]*</label>
              <input type="number" step="1" id="bt_donorPcv" value="45" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">स्वस्थ डोनर सामान्यतः 40% - 50%</span>
            </div>
          </div>

          <div id="btResultCard" class="p-4 rounded-xl bg-slate-950 border border-red-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateBloodTransfusion() -->
          </div>
        </div>
      `;
    },

    // 4. TOOL: CALORIC REQUIREMENTS CANVAS
    renderCaloricCanvas() {
      const p = State.patientContext;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-fire-flame-curved text-amber-400"></i>
              <span>ऊर्जा एवं कैलोरी आवश्यकता कैलकुलेटर (RER & MER Feeding Engine)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              क्रिटिकल केयर, फीडिंग ट्यूब प्रबंधन, व रुग्ण पशुओं हेतु वैज्ञानिक आहार योजना (70 × BW^0.75)
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">जीवन-अवस्था एवं रोग स्थिति (Lifestage / Condition)*</label>
              <select id="cal_lifestage" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="1.0">1.0 × RER: आईसीयू केज रेस्ट / क्रिटिकल इलनेस (Day 1 Feeding)</option>
                <option value="1.2" selected>1.2 × RER: वयस्क संधारण / सामान्य इनपेशेंट (Maintenance)</option>
                <option value="1.5">1.5 × RER: सर्जरी उपरांत रिकवरी / वूंड हीलिंग</option>
                <option value="2.0">2.0 × RER: पपी / किटन तीव्र विकास अवस्था (Growth)</option>
                <option value="3.0">3.0 × RER: दुग्धपान करा रही मादा (Peak Lactation)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लिक्विड डाइट का कैलोरी घनत्व (kcal/mL)</label>
              <input type="number" step="0.1" id="cal_density" value="1.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              <span class="text-[10px] text-slate-400">मानक क्लिनिकल लिक्विड डाइट = 1.0 kcal/mL</span>
            </div>
          </div>

          <div id="caloricResultCard" class="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateCaloricNeeds() -->
          </div>
        </div>
      `;
    },

    // 5. TOOL: SCHAEFFER'S FORMULA CANVAS
    renderSchaeffersCanvas() {
      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-ruler-combined text-purple-400"></i>
              <span>शेफर्स शारीरिक वजन मापन सूत्र (Schaeffer's Biometric Weight Formula)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              फील्ड पशु चिकित्सा में तराजू के बिना सीने के घेरे (Heart Girth) और लंबाई से सटीक वजन आकलन: (G² × L) / 300
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशु का प्रकार (Species Factor)*</label>
              <select id="sch_animalType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="cattle" selected>गाय / बैल (Cattle - Divisor 300)</option>
                <option value="buffalo">मुर्रा भैंस (Buffalo - Divisor 310)</option>
                <option value="horse">घोड़ा (Horse / Equine - Divisor 330)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">सीने का घेरा (Heart Girth in Inches)*</label>
              <input type="number" step="0.5" id="sch_girth" value="65.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">कंधे के ठीक पीछे सीने के चारों ओर का माप</span>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शरीर की लंबाई (Body Length in Inches)*</label>
              <input type="number" step="0.5" id="sch_length" value="54.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">कंधे के जोड़ से पिन-बोन (Pin Bone) तक</span>
            </div>
          </div>

          <div id="schaeffersResultCard" class="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateSchaeffers() -->
          </div>
        </div>
      `;
    },

    // 6. TOOL: DRUG DILUTION CANVAS
    renderDilutionCanvas() {
      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-vial text-emerald-400"></i>
              <span>औषधि सांद्रता तनुकरण कैलकुलेटर (Drug Dilution: C1 × V1 = C2 × V2)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              उच्च सांद्रता वाले स्टॉक सोल्यूशन (जैसे 50% डेक्सट्रोज) से अभीष्ट सांद्रता (जैसे 5% या 2.5%) तैयार करने की गणना
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">स्टॉक सांद्रता (Stock Conc. C1 %)*</label>
              <input type="number" step="0.1" id="dil_c1" value="50.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">उदा. 50% Dextrose या 10% Baytril</span>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वांछित लक्ष्य सांद्रता (Target Conc. C2 %)*</label>
              <input type="number" step="0.1" id="dil_c2" value="5.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">उदा. 5% Dextrose या 2.5% Injection</span>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अंतिम कुल आयतन (Final Volume V2 in mL)*</label>
              <input type="number" step="10" id="dil_v2" value="500" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold" />
              <span class="text-[10px] text-slate-400">जितना कुल घोल तैयार करना है</span>
            </div>
          </div>

          <div id="dilutionResultCard" class="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
            <!-- Dynamically Populated by recalculateDilution() -->
          </div>
        </div>
      `;
    }
  };

  // 7. CALCULATION RECALCULATION & LIVE DISPATCH
  const CalculationOrchestrator = {
    updateFluidTherapy() {
      const dehy = document.getElementById('fl_dehydration')?.value;
      const hours = document.getElementById('fl_hours')?.value;
      const losses = document.getElementById('fl_losses')?.value;
      const drip = document.getElementById('fl_dripFactor')?.value;
      const formula = document.getElementById('fl_maintenanceFormula')?.value;

      if (!dehy) return;

      const res = ClinicalMath.computeFluidTherapy({
        bodyWeightKg: State.patientContext.bodyWeightKg,
        species: State.patientContext.species,
        dehydrationPercent: dehy,
        replacementHours: hours,
        ongoingLossesMl: losses,
        dripFactor: drip,
        maintenanceFormula: formula
      });

      State.toolOutputs.fluid_therapy = res;

      const container = document.getElementById('fluidTherapyResultCard');
      if (container) {
        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-cyan-400 font-bold">फ्लूइड इन्फ्यूजन परिणाम (Infusion Prescription)</span>
            <span class="text-xs font-mono text-slate-300">अवधि: <strong>${res.replacementHours} घंटे</strong></span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span class="text-[10px] text-slate-400 block">निर्जलीकरण घाटा:</span>
              <span class="text-white font-bold text-sm">${res.deficitMl} mL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">दैनिक संधारण:</span>
              <span class="text-white font-bold text-sm">${res.dailyMaintenanceMl} mL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">कुल आवश्यक द्रव:</span>
              <span class="text-cyan-400 font-black text-base">${res.totalVolumeMl} mL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">इन्फ्यूजन दर (Rate):</span>
              <span class="text-emerald-400 font-black text-base">${res.rateMlHr} mL/hr</span>
            </div>
          </div>

          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-stopwatch text-amber-400"></i>
              <span>ड्रिप गति (${res.dripFactorGttMl} gtt/mL):</span>
              <strong class="text-amber-300 text-sm">${res.dropsPerMinute} Drops/Min</strong>
            </div>
            <div class="text-slate-300">
              (लगभग <strong>प्रत्येक ${res.secondsPerDrop} सेकंड</strong> में १ बूंद)
            </div>
          </div>
        `;
      }
    },

    updateCRI() {
      const drug = document.getElementById('cri_drugSelect')?.value;
      const dose = document.getElementById('cri_doseInput')?.value;
      const bag = document.getElementById('cri_bagVolume')?.value;
      const rate = document.getElementById('cri_fluidRate')?.value;

      if (!drug) return;

      const res = ClinicalMath.computeCRI({
        bodyWeightKg: State.patientContext.bodyWeightKg,
        drugKey: drug,
        prescribedDose: dose,
        ivBagVolumeMl: bag,
        fluidRateMlHr: rate
      });

      State.toolOutputs.cri_calculator = res;

      const container = document.getElementById('criResultCard');
      if (container) {
        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-rose-400 font-bold">CRI औषधि गणना परिणाम (${res.drugName})</span>
            <span class="text-xs font-mono text-slate-300">बैग चलने का समय: <strong>${res.bagDurationHours} घंटे</strong></span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span class="text-[10px] text-slate-400 block">रोगी को प्रति घंटा औषधि:</span>
              <span class="text-white font-bold text-sm">${res.doseMgHr} mg/hr</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">बैग हेतु कुल सक्रिय ड्रग:</span>
              <span class="text-white font-bold text-sm">${res.totalDrugMgInBag} mg</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">IV बैग में डालने योग्य आयतन:</span>
              <span class="text-rose-400 font-black text-base">${res.drugVolumeMlToAdd} mL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">पहले बैग से निकाला जाने वाला द्रव:</span>
              <span class="text-amber-400 font-black text-sm">${res.fluidVolumeToRemoveMl} mL</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
            <strong class="text-rose-400">नर्सिंग निर्देश:</strong> ${res.finalBagVolumeMl} mL के IV बैग में से सिरिंज द्वारा पहले ${res.fluidVolumeToRemoveMl} mL सलाइन निकालकर फेंक दें। तत्पश्चात ठीक <strong>${res.drugVolumeMlToAdd} mL</strong> औषधि उस बैग में मिलाकर अच्छी तरह हिलाएं और इन्फ्यूजन पंप को <strong>${document.getElementById('cri_fluidRate')?.value} mL/hr</strong> पर सेट करें।
          </div>
        `;
      }
    },

    updateBloodTransfusion() {
      const cur = document.getElementById('bt_currentPcv')?.value;
      const tgt = document.getElementById('bt_targetPcv')?.value;
      const don = document.getElementById('bt_donorPcv')?.value;

      if (!cur) return;

      const res = ClinicalMath.computeBloodTransfusion({
        bodyWeightKg: State.patientContext.bodyWeightKg,
        species: State.patientContext.species,
        currentPcv: cur,
        targetPcv: tgt,
        donorPcv: don
      });

      State.toolOutputs.blood_transfusion = res;

      const container = document.getElementById('btResultCard');
      if (container) {
        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-red-400 font-bold">रक्त आधान आवश्यकता विश्लेषण</span>
            <span class="text-xs font-mono text-slate-300">रक्त आयतन स्थिरांक: <strong>${res.speciesFactorApplied}</strong></span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <span class="text-[10px] text-slate-400 block">कुल दाता रक्त मात्रा (Whole Blood):</span>
              <span class="text-red-400 font-black text-lg">${res.transfusionVolumeMl} mL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">प्रारम्भिक 30 मिनट टेस्ट दर:</span>
              <span class="text-amber-300 font-bold text-sm">${res.initialTestRateMlHr} mL/hr</span>
              <span class="text-[9px] text-slate-400 block">(0.5 ml/kg/hr - शॉक परीक्षण)</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">मुख्य आधान दर (4 घंटे अवधि):</span>
              <span class="text-emerald-400 font-bold text-sm">${res.mainInfusionRateMlHr} mL/hr</span>
              <span class="text-[9px] text-slate-400 block">(अधिकतम 4 घंटे के भीतर पूर्ण करें)</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <strong class="text-red-400">सुरक्षा चेतावनी:</strong> रक्त को हमेशा 170-260 माइक्रोन क्लॉट फिल्टर वाले ब्लड एडमिनिस्ट्रेशन सेट से दें। रक्त आधान के साथ कभी भी कैल्शियम युक्त द्रव (जैसे Ringer's Lactate) न मिलाएं, अन्यथा सिट्रेटेड रक्त में थक्के जम सकते हैं।
          </div>
        `;
      }
    },

    updateCaloricNeeds() {
      const mult = document.getElementById('cal_lifestage')?.value;
      const dens = document.getElementById('cal_density')?.value;

      if (!mult) return;

      const res = ClinicalMath.computeCaloricNeeds({
        bodyWeightKg: State.patientContext.bodyWeightKg,
        lifestageMultiplier: mult,
        dietCaloricDensity: dens
      });

      State.toolOutputs.caloric_requirements = res;

      const container = document.getElementById('caloricResultCard');
      if (container) {
        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-amber-400 font-bold">कैलोरी एवं फीडिंग ट्यूब योजना</span>
            <span class="text-xs font-mono text-slate-300">RER सूत्र: 70 × BW^0.75</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span class="text-[10px] text-slate-400 block">रेस्टिंग आवश्यकता (RER):</span>
              <span class="text-white font-bold text-sm">${res.rerKcalDay} kcal/दिन</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">दैनिक लक्ष्य संधारण (MER):</span>
              <span class="text-amber-400 font-black text-base">${res.merKcalDay} kcal/दिन</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">कुल लिक्विड डाइट आयतन:</span>
              <span class="text-cyan-400 font-black text-base">${res.totalDietMlDay} mL/दिन</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">प्रति फीडिंग खुराक:</span>
              <span class="text-emerald-400 font-black text-base">${res.volumePerFeedingMl} mL</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            दैनिक कुल आहार को दिन में <strong>${res.recommendedFeedings} विभाजित खुराक</strong> में दें। आमाशय की अधिकतम क्षमता ${res.stomachCapacityMaxMl} mL है; रीगलिंग व उल्टी से बचाव हेतु एक बार में कभी भी क्षमता से अधिक आहार न दें।
          </div>
        `;
      }
    },

    updateSchaeffers() {
      const type = document.getElementById('sch_animalType')?.value;
      const girth = document.getElementById('sch_girth')?.value;
      const len = document.getElementById('sch_length')?.value;

      if (!girth) return;

      const res = ClinicalMath.computeSchaeffersWeight({
        largeAnimalType: type,
        heartGirthInches: girth,
        bodyLengthInches: len
      });

      State.toolOutputs.weight_estimator = res;

      const container = document.getElementById('schaeffersResultCard');
      if (container) {
        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-purple-400 font-bold">आकलित शारीरिक वजन परिणाम</span>
            <span class="text-xs font-mono text-slate-300">डिवीज़र स्थिरांक: <strong>${res.divisorUsed}</strong></span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block uppercase">मीट्रिक वजन (Kilograms)</span>
              <span class="text-3xl font-black text-purple-400 mt-1 block">${res.weightKg} kg</span>
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block uppercase">इम्पीरियल वजन (Pounds)</span>
              <span class="text-3xl font-black text-white mt-1 block">${res.weightLbs} lbs</span>
            </div>
          </div>

          <div class="text-[11px] text-slate-400 font-mono">
            गणना: (${res.heartGirthInches}² × ${res.bodyLengthInches}) / ${res.divisorUsed} = ${res.weightLbs} lbs &times; 0.4536 = <strong>${res.weightKg} kg</strong>
          </div>
        `;
      }
    },

    updateDilution() {
      const c1 = document.getElementById('dil_c1')?.value;
      const c2 = document.getElementById('dil_c2')?.value;
      const v2 = document.getElementById('dil_v2')?.value;

      if (!c1) return;

      const res = ClinicalMath.computeDilution({
        stockConcentration: c1,
        targetConcentration: c2,
        targetVolumeMl: v2
      });

      State.toolOutputs.drug_dilution = res;

      const container = document.getElementById('dilutionResultCard');
      if (container) {
        if (res.error) {
          container.innerHTML = `<div class="text-xs text-rose-400 font-mono font-bold">${res.error}</div>`;
          return;
        }

        container.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-xs font-mono uppercase text-emerald-400 font-bold">तनुकरण अनुपात परिणाम (C1V1 = C2V2)</span>
            <span class="text-xs font-mono text-slate-300">लक्ष्य: <strong>${res.targetConcentration}% (${res.targetVolumeMl} mL)</strong></span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-slate-400 text-[10px] block uppercase">स्टॉक सोल्यूशन की मात्रा (C1: ${res.stockConcentration}%):</span>
              <span class="text-2xl font-black text-emerald-400 mt-1 block">${res.stockVolumeMl} mL</span>
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-slate-400 text-[10px] block uppercase">मिलाने योग्य तनुकारक / स्टेराइल सलाइन:</span>
              <span class="text-2xl font-black text-cyan-400 mt-1 block">${res.diluentVolumeMl} mL</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <strong>विधि:</strong> एक स्टेराइल कंटेनर में पहले <strong>${res.stockVolumeMl} mL</strong> स्टॉक सोल्यूशन लें और उसमें ठीक <strong>${res.diluentVolumeMl} mL</strong> स्टेराइल वाटर या नॉर्मल सलाइन मिलाकर कुल <strong>${res.targetVolumeMl} mL</strong> का ${res.targetConcentration}% घोल तैयार करें।
          </div>
        `;
      }
    }
  };

  // 8. EVENT BINDINGS & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    // 1. Tool Switcher Navigation
    container.addEventListener('click', (e) => {
      const navBtn = e.target.closest('.tool-nav-btn');
      if (navBtn) {
        const tool = navBtn.getAttribute('data-tool');
        if (tool && tool !== State.activeTool) {
          State.activeTool = tool;
          window.VetcareApp.Modules.ClinicalCalculatorsWorkbench.refreshCanvas();
        }
        return;
      }

      // Sync Global Patient Weight & Species
      if (e.target.closest('#btnSyncPatientToAll')) {
        const sp = document.getElementById('wbSpeciesSelect')?.value;
        const wt = parseFloat(document.getElementById('wbBodyWeightInput')?.value);
        if (sp && !isNaN(wt) && wt > 0) {
          State.patientContext.species = sp;
          State.patientContext.bodyWeightKg = wt;
          notify(`रोगी संदर्भ अद्यतन: ${sp.toUpperCase()}, ${wt} kg`, 'success');
          window.VetcareApp.Modules.ClinicalCalculatorsWorkbench.refreshCanvas();
        }
        return;
      }

      // Copy Active Calculation Note
      if (e.target.closest('#btnCopyActiveResult')) {
        const output = State.toolOutputs[State.activeTool];
        if (!output) {
          notify('कॉपी करने हेतु कोई सक्रिय परिणाम उपलब्ध नहीं है।', 'warning');
          return;
        }

        const textSummary = `[Vetcare AI OS Calculators] Tool: ${State.activeTool.toUpperCase()} | Patient: ${State.patientContext.species} (${State.patientContext.bodyWeightKg}kg)\n` + JSON.stringify(output, null, 2);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textSummary);
          notify('क्लिनिकल नोट क्लिपबोर्ड में कॉपी किया गया!', 'success');
        } else {
          prompt('गणना परिणाम कॉपी करें:', textSummary);
        }
        return;
      }

      // Save Calculation to Audit History
      if (e.target.closest('#btnSaveToHistory')) {
        const output = State.toolOutputs[State.activeTool];
        if (!output) return;

        const summaryItem = {
          toolTitle: State.activeTool.replace('_', ' ').toUpperCase(),
          species: State.patientContext.species,
          bodyWeightKg: State.patientContext.bodyWeightKg,
          summaryText: JSON.stringify(output).substring(0, 80) + '...',
          details: output
        };

        StorageAdapter.saveCalculation(summaryItem).then(() => {
          notify('गणना ऑडिट इतिहास में सहेजी गई!', 'success');
          window.VetcareApp.Modules.ClinicalCalculatorsWorkbench.refreshCanvas();
        });
        return;
      }
    });

    // 2. Real-time Reactive Input Change Listeners
    container.addEventListener('input', (e) => {
      if (State.activeTool === 'fluid_therapy') CalculationOrchestrator.updateFluidTherapy();
      if (State.activeTool === 'cri_calculator') CalculationOrchestrator.updateCRI();
      if (State.activeTool === 'blood_transfusion') CalculationOrchestrator.updateBloodTransfusion();
      if (State.activeTool === 'caloric_requirements') CalculationOrchestrator.updateCaloricNeeds();
      if (State.activeTool === 'weight_estimator') CalculationOrchestrator.updateSchaeffers();
      if (State.activeTool === 'drug_dilution') CalculationOrchestrator.updateDilution();
    });

    container.addEventListener('change', (e) => {
      // Handle CRI Drug Dropdown Change to update unit badge & default dose
      if (e.target.id === 'cri_drugSelect') {
        const drugKey = e.target.value;
        const drug = window.VetcareApp.ClinicalData.CalculatorStandards.CRI_DRUG_LIBRARY[drugKey];
        const doseInput = document.getElementById('cri_doseInput');
        const unitBadge = document.getElementById('cri_unitBadge');
        if (drug && doseInput && unitBadge) {
          doseInput.value = drug.defaultDose;
          unitBadge.textContent = drug.defaultDoseUnit;
        }
        CalculationOrchestrator.updateCRI();
        return;
      }

      if (State.activeTool === 'fluid_therapy') CalculationOrchestrator.updateFluidTherapy();
      if (State.activeTool === 'cri_calculator') CalculationOrchestrator.updateCRI();
      if (State.activeTool === 'blood_transfusion') CalculationOrchestrator.updateBloodTransfusion();
      if (State.activeTool === 'caloric_requirements') CalculationOrchestrator.updateCaloricNeeds();
      if (State.activeTool === 'weight_estimator') CalculationOrchestrator.updateSchaeffers();
      if (State.activeTool === 'drug_dilution') CalculationOrchestrator.updateDilution();
    });

    // 3. Global Event Bus Listener for Cross-Module EMR Patient Sync
    window.addEventListener('vetcare:patient_selected', (event) => {
      if (event && event.detail) {
        const d = event.detail;
        if (d.species) State.patientContext.species = d.species.toLowerCase();
        if (d.bodyWeightKg) State.patientContext.bodyWeightKg = parseFloat(d.bodyWeightKg);
        if (d.patientId) State.patientContext.patientId = d.patientId;
        console.log('[CalculatorsWorkbench] Synchronized Patient from Event Bus:', State.patientContext);
        window.VetcareApp.Modules.ClinicalCalculatorsWorkbench.refreshCanvas();
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.ClinicalCalculatorsWorkbench = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();
        await StorageAdapter.loadHistory();
        console.log('[CalculatorsWorkbench] Initialized. Loaded calculation records:', State.calculationHistory.length);
      } catch (err) {
        console.error('[CalculatorsWorkbench] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[CalculatorsWorkbench] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshCanvas();
      bindDOMEvents(container);
    },

    // Fast View Refresh
    refreshCanvas() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const canvas = State.containerElement.querySelector('#calculatorActiveCanvas');
      if (!canvas) return;

      if (State.activeTool === 'fluid_therapy') {
        canvas.innerHTML = UIEngine.renderFluidTherapyCanvas();
        CalculationOrchestrator.updateFluidTherapy();
      } else if (State.activeTool === 'cri_calculator') {
        canvas.innerHTML = UIEngine.renderCRICanvas();
        // Initialize default CRI dose input
        const drug = window.VetcareApp.ClinicalData.CalculatorStandards.CRI_DRUG_LIBRARY['Lidocaine'];
        const doseInput = document.getElementById('cri_doseInput');
        if (doseInput && drug) doseInput.value = drug.defaultDose;
        CalculationOrchestrator.updateCRI();
      } else if (State.activeTool === 'blood_transfusion') {
        canvas.innerHTML = UIEngine.renderBloodTransfusionCanvas();
        CalculationOrchestrator.updateBloodTransfusion();
      } else if (State.activeTool === 'caloric_requirements') {
        canvas.innerHTML = UIEngine.renderCaloricCanvas();
        CalculationOrchestrator.updateCaloricNeeds();
      } else if (State.activeTool === 'weight_estimator') {
        canvas.innerHTML = UIEngine.renderSchaeffersCanvas();
        CalculationOrchestrator.updateSchaeffers();
      } else if (State.activeTool === 'drug_dilution') {
        canvas.innerHTML = UIEngine.renderDilutionCanvas();
        CalculationOrchestrator.updateDilution();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[CalculatorsWorkbench] Module destroyed cleanly.');
    },

    // Direct API Invocation Helper for External Modules
    calculateFluidTherapy(params) {
      return ClinicalMath.computeFluidTherapy(params);
    },

    calculateCRI(params) {
      return ClinicalMath.computeCRI(params);
    },

    calculateBloodTransfusion(params) {
      return ClinicalMath.computeBloodTransfusion(params);
    }
  };

})(window, document);
