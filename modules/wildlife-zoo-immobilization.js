// Vetcare AI OS - Wildlife Restraint, Darting Dosages & Chemical Immobilization Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standardized Chemical Immobilization Protocols (Wildlife Institute of India / IUCN Standards)
  window.VetcareApp.ClinicalData.WildlifeProtocols = {
    SPECIES_DATABASE: {
      tiger: {
        id: 'tiger',
        commonNameEn: 'Royal Bengal Tiger (Panthera tigris tigris)',
        commonNameHi: 'रॉयल बंगाल टाइगर (बाघ)',
        typicalWeightRangeKg: [120, 240],
        defaultWeightKg: 180,
        primaryDrug: 'Ketamine HCl (100 mg/ml)',
        primaryDrugConc: 100.0,
        primaryDoseMgKg: 4.0, // 3-5 mg/kg
        secondaryDrug: 'Medetomidine HCl (20 mg/ml - Wildlife Spec)',
        secondaryDrugConc: 20.0,
        secondaryDoseMgKg: 0.07, // 0.05-0.08 mg/kg
        reversalDrug: 'Atipamezole HCl (20 mg/ml)',
        reversalRatioMultiplier: 5.0, // 5 mg Atipamezole per 1 mg Medetomidine
        reversalRoute: 'Half IV (saphenous/cephalic), Half IM',
        dartNeedleType: '14 Gauge, 2.0 Inch Wire-Barbed with Gelatin Collar',
        targetDartSite: 'Heavy rump musculature (Semitendinosus/Gluteal) or Triceps',
        myopathyRisk: 'MODERATE_HYPERTHERMIC',
        maxDownTimeMinutes: 60
      },
      leopard: {
        id: 'leopard',
        commonNameEn: 'Indian Leopard (Panthera pardus fusca)',
        commonNameHi: 'भारतीय तेंदुआ (तेंदुआ)',
        typicalWeightRangeKg: [40, 75],
        defaultWeightKg: 55,
        primaryDrug: 'Ketamine HCl (100 mg/ml)',
        primaryDrugConc: 100.0,
        primaryDoseMgKg: 5.0,
        secondaryDrug: 'Medetomidine HCl (10 mg/ml)',
        secondaryDrugConc: 10.0,
        secondaryDoseMgKg: 0.08,
        reversalDrug: 'Atipamezole HCl (5 mg/ml)',
        reversalRatioMultiplier: 5.0,
        reversalRoute: 'Half IV, Half IM',
        dartNeedleType: '16 Gauge, 1.5 Inch Gelatin-Collared Needle',
        targetDartSite: 'Gluteal / Caudal thigh muscles',
        myopathyRisk: 'HIGH_CAPTURE_STRESS',
        maxDownTimeMinutes: 45
      },
      elephant: {
        id: 'elephant',
        commonNameEn: 'Asian Elephant (Elephas maximus)',
        commonNameHi: 'एशियाई हाथी (हाथी)',
        typicalWeightRangeKg: [2500, 4800],
        defaultWeightKg: 3500,
        primaryDrug: 'Etorphine HCl / M99 (9.8 mg/ml)',
        primaryDrugConc: 9.8,
        primaryDoseMgKg: 0.0012, // ~3.5 to 4.5 mg total for cow, 4.5-6.5 mg for adult bull
        secondaryDrug: 'Acepromazine (10 mg/ml) or Azaperone',
        secondaryDrugConc: 10.0,
        secondaryDoseMgKg: 0.0035, // ~10-15 mg total
        reversalDrug: 'Diprenorphine / M5050 or Naltrexone (50 mg/ml)',
        reversalRatioMultiplier: 15.0, // 15x Etorphine dose in mg
        reversalRoute: 'Ear vein (IV bolus strictly; recovery within 2-4 minutes)',
        dartNeedleType: '12 Gauge, 3.0 Inch Heavy-Duty Collared Dart Needle',
        targetDartSite: 'Ear base, neck muscle mass, or shoulder (Avoid thick pelvic hide)',
        myopathyRisk: 'SEVERE_STERNAL_COLLAPSE_ANOXIA',
        maxDownTimeMinutes: 30
      },
      sloth_bear: {
        id: 'sloth_bear',
        commonNameEn: 'Sloth Bear (Melursus ursinus)',
        commonNameHi: 'भालू / रीछ (स्लॉथ बेयर)',
        typicalWeightRangeKg: [80, 140],
        defaultWeightKg: 100,
        primaryDrug: 'Tiletamine-Zolazepam / Zoletil 100 (100 mg/ml)',
        primaryDrugConc: 100.0,
        primaryDoseMgKg: 5.5,
        secondaryDrug: 'Medetomidine HCl (10 mg/ml)',
        secondaryDrugConc: 10.0,
        secondaryDoseMgKg: 0.04,
        reversalDrug: 'Atipamezole HCl (5 mg/ml - for Medetomidine)',
        reversalRatioMultiplier: 5.0,
        reversalRoute: 'IM / SC',
        dartNeedleType: '14 Gauge, 1.5 Inch Barbed Dart Needle',
        targetDartSite: 'Shoulder or triceps (Thick shaggy coat requires proper needle length)',
        myopathyRisk: 'MODERATE',
        maxDownTimeMinutes: 50
      },
      sambar_deer: {
        id: 'sambar_deer',
        commonNameEn: 'Sambar Deer (Rusa unicolor)',
        commonNameHi: 'सांभर हिरण',
        typicalWeightRangeKg: [150, 300],
        defaultWeightKg: 200,
        primaryDrug: 'Ketamine HCl (100 mg/ml)',
        primaryDrugConc: 100.0,
        primaryDoseMgKg: 3.5,
        secondaryDrug: 'Xylazine HCl (100 mg/ml - Large Animal)',
        secondaryDrugConc: 100.0,
        secondaryDoseMgKg: 1.8,
        reversalDrug: 'Yohimbine HCl (5 mg/ml) or Tolazoline',
        reversalRatioMultiplier: 0.15, // mg/kg basis
        reversalRoute: 'Slow IV in Jugular vein',
        dartNeedleType: '14 Gauge, 1.5 Inch Gelatin-Collared Needle',
        targetDartSite: 'Gluteal hindquarter',
        myopathyRisk: 'CRITICAL_LETHAL_CAPTURE_MYOPATHY',
        maxDownTimeMinutes: 30
      },
      nilgai: {
        id: 'nilgai',
        commonNameEn: 'Nilgai / Blue Bull (Boselaphus tragocamelus)',
        commonNameHi: 'नीलगाय (रोज़)',
        typicalWeightRangeKg: [160, 280],
        defaultWeightKg: 220,
        primaryDrug: 'Ketamine HCl (100 mg/ml)',
        primaryDrugConc: 100.0,
        primaryDoseMgKg: 3.8,
        secondaryDrug: 'Xylazine HCl (100 mg/ml)',
        secondaryDrugConc: 100.0,
        secondaryDoseMgKg: 2.0,
        reversalDrug: 'Yohimbine HCl (5 mg/ml)',
        reversalRatioMultiplier: 0.15,
        reversalRoute: 'Jugular IV or deep IM',
        dartNeedleType: '14 Gauge, 1.5 Inch Wire-Barbed Needle',
        targetDartSite: 'Rump or neck musculature',
        myopathyRisk: 'CRITICAL_LETHAL_CAPTURE_MYOPATHY',
        maxDownTimeMinutes: 25
      }
    },

    CAPTURE_MYOPATHY_INTERVENTIONS: [
      {
        step: 1,
        title: 'आक्रामक कूलिंग एवं ताप नियमन (Immediate Cooling)',
        desc: 'रेक्टल तापमान 104°F (40°C) से अधिक होते ही पशु के सिर, कानों एवं पेट पर ठंडा पानी डालें। पाद तलों (Paws/Hooves) पर एल्कोहल रब करें।'
      },
      {
        step: 2,
        title: 'लैक्टिक एसिडोसिस बफर (Metabolic Buffer)',
        desc: 'सोडियम बाइकार्बोनेट (Sodium Bicarbonate 8.4%): 1-2 mEq/kg IV सलाइन ड्रिप में धीमी गति से दें ताकि मायोसाइट्स से स्रावित लैक्टिक एसिड निष्प्रभावी हो।'
      },
      {
        step: 3,
        title: 'एंटी-ऑक्सीडेंट एवं मायो-प्रोटेक्शन (Muscle Protection)',
        desc: 'विटामिन E एवं सेलेनियम (0.05 mg/kg Se) IM दें, साथ में डेक्सामेथासोन या फ्लूनिक्सिन मेग्लुमाइन (1.1 mg/kg IV) एंडोटॉक्सिक शॉक रोकने हेतु दें।'
      },
      {
        step: 4,
        title: 'रक्त प्रवाह संवर्धन एवं रीनल फ्लशिंग (Diuresis)',
        desc: 'मायोग्लोबिन्यूरिक रीनल फेल्योर (Myoglobinuria / Black Urine) से गुर्दों को बचाने हेतु भरपूर आईवी नॉर्मल सलाइन व मेनिटोल (20% @ 0.5g/kg IV) दें।'
      }
    ]
  };

  // 2. INTERNAL STATE MANAGEMENT
  const State = {
    activeTab: 'wildlife_darting_calculator',
    activeEncounterId: 'ENC-WII-2026-001',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,
    stopwatchInterval: null,
    stopwatchSeconds: 0,
    isStopwatchRunning: false,

    wildlifeEncounters: [],

    // Active Formulation Engine Parameters
    activeSpeciesKey: 'tiger',
    estimatedWeightKg: 180,
    excitementLevel: 'ALERT', // 'CALM' (1.0x), 'ALERT' (1.1x), 'AGGRESSIVE_FRENZY' (1.25x)

    // Seed Data (Hydrated if storage is empty)
    seedData: [
      {
        encounterId: 'ENC-WII-2026-001',
        incidentDate: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
        species: 'tiger',
        speciesCommon: 'Royal Bengal Tiger',
        animalIdentifier: 'T-104 (Male, approx 6.5 yrs)',
        sex: 'M',
        estimatedWeightKg: 195,
        physicalCondition: 'EXCELLENT',
        locationGps: { lat: '29.5312° N', lng: '78.9465° E' },
        forestDivision: 'Corbett Tiger Reserve, Ramnagar Division',
        conflictType: 'RADIO_COLLARING',
        dartingDetails: {
          drugFormula: 'Ketamine (780mg) + Medetomidine (13.6mg)',
          dartVolumeMl: 8.5,
          downTimeMinutes: 11,
          reversalAdministered: 'Atipamezole 68 mg (Half IV / Half IM)',
          recoveryTimeMinutes: 7,
          collarFrequency: 'VHF/GPS 148.520 MHz'
        },
        status: 'RELEASED'
      },
      {
        encounterId: 'ENC-WII-2026-002',
        incidentDate: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        species: 'leopard',
        speciesCommon: 'Indian Leopard',
        animalIdentifier: 'Leopard #L-42 (Female, Snare Rescue)',
        sex: 'F',
        estimatedWeightKg: 52,
        physicalCondition: 'SNARED',
        locationGps: { lat: '30.3165° N', lng: '78.0322° E' },
        forestDivision: 'Rajaji Tiger Reserve / Haridwar Range',
        conflictType: 'RESCUE',
        dartingDetails: {
          drugFormula: 'Ketamine (260mg) + Medetomidine (4.2mg)',
          dartVolumeMl: 3.0,
          downTimeMinutes: 8,
          reversalAdministered: 'Atipamezole 21 mg IM post-snare release',
          recoveryTimeMinutes: 5,
          collarFrequency: 'N/A'
        },
        status: 'RELEASED'
      },
      {
        encounterId: 'ENC-WII-2026-003',
        incidentDate: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
        species: 'elephant',
        speciesCommon: 'Asian Elephant',
        animalIdentifier: 'Rogue Tusker "Makna" (Male Bull)',
        sex: 'M',
        estimatedWeightKg: 3800,
        physicalCondition: 'GOOD',
        locationGps: { lat: '26.8467° N', lng: '89.3842° E' },
        forestDivision: 'Buxa Tiger Reserve, West Bengal',
        conflictType: 'HUMAN_CONFLICT',
        dartingDetails: {
          drugFormula: 'Etorphine M99 (5.2mg) + Acepromazine (15mg)',
          dartVolumeMl: 2.5,
          downTimeMinutes: 18,
          reversalAdministered: 'Diprenorphine M5050 (7.0mg IV in ear vein)',
          recoveryTimeMinutes: 3,
          collarFrequency: 'Radio Satellite Collar ID-9941'
        },
        status: 'MONITORING'
      }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const StorageAdapter = {
    DB_NAME: 'VetcareWildlifeDB',
    DB_VERSION: 1,
    STORE_NAME: 'wildlife_immobilization_logs',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[WildlifeEngine] IndexedDB unavailable, using LocalStorage fallback.');
          resolve(null);
          return;
        }

        const req = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        req.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'encounterId' });
          }
        };

        req.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        req.onerror = (event) => {
          console.error('[WildlifeEngine] DB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async saveEncounter(record) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put(record);
            tx.oncomplete = () => resolve(true);
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
      let list = [];
      try {
        const raw = localStorage.getItem('VETCARE_WILDLIFE_LOGS');
        list = raw ? JSON.parse(raw) : [];
      } catch (e) {
        list = [];
      }
      const idx = list.findIndex(r => r.encounterId === record.encounterId);
      if (idx >= 0) list[idx] = record;
      else list.unshift(record);
      localStorage.setItem('VETCARE_WILDLIFE_LOGS', JSON.stringify(list));
    },

    async loadAllEncounters() {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => {
              let res = req.result || [];
              if (res.length === 0) res = StorageAdapter.loadFallback();
              resolve(res);
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
        const raw = localStorage.getItem('VETCARE_WILDLIFE_LOGS');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }
  };

  // 4. SCIENTIFIC CHEMICAL DARTING CALCULATOR & MYOPATHY ENGINES
  const WildlifeMath = {
    // Calculates exact mg, mL, dart chamber volume, and reversal antagonist doses
    calculateDartingRecipe(speciesKey, weightKg, excitementLevel) {
      const spec = window.VetcareApp.ClinicalData.WildlifeProtocols.SPECIES_DATABASE[speciesKey] ||
                   window.VetcareApp.ClinicalData.WildlifeProtocols.SPECIES_DATABASE.tiger;

      let multiplier = 1.0;
      if (excitementLevel === 'ALERT') multiplier = 1.1; // +10% for alert wild animal
      if (excitementLevel === 'AGGRESSIVE_FRENZY') multiplier = 1.25; // +25% for snared / charging adrenaline rush

      const effectiveWeight = parseFloat(weightKg) || spec.defaultWeightKg;

      // 1. Primary Drug Calculations
      const primaryMg = effectiveWeight * spec.primaryDoseMgKg * multiplier;
      const primaryMl = primaryMg / spec.primaryDrugConc;

      // 2. Secondary Drug Calculations
      const secondaryMg = effectiveWeight * spec.secondaryDoseMgKg * multiplier;
      const secondaryMl = secondaryMg / spec.secondaryDrugConc;

      const totalDartVolumeMl = Math.round((primaryMl + secondaryMl) * 100) / 100;

      // Recommended Dart Chamber Size (1.5ml, 3.0ml, 5.0ml, 10.0ml)
      let recommendedDartSizeMl = 3.0;
      if (totalDartVolumeMl <= 1.5) recommendedDartSizeMl = 1.5;
      else if (totalDartVolumeMl <= 3.0) recommendedDartSizeMl = 3.0;
      else if (totalDartVolumeMl <= 5.0) recommendedDartSizeMl = 5.0;
      else recommendedDartSizeMl = 10.0;

      // 3. Reversal Antagonist Calculations
      let reversalMg = 0;
      if (spec.primaryDrug.includes('Etorphine')) {
        // Elephant: 15x Etorphine dose
        reversalMg = primaryMg * spec.reversalRatioMultiplier;
      } else if (spec.secondaryDrug.includes('Xylazine')) {
        // Yohimbine: 0.15 mg/kg
        reversalMg = effectiveWeight * spec.reversalRatioMultiplier;
      } else {
        // Felids/Bears: Atipamezole = 5x Medetomidine dose in mg
        reversalMg = secondaryMg * spec.reversalRatioMultiplier;
      }

      const reversalConc = spec.reversalDrug.includes('20 mg/ml') ? 20.0 : (spec.reversalDrug.includes('50 mg/ml') ? 50.0 : 5.0);
      const reversalMl = Math.round((reversalMg / reversalConc) * 10) / 10;

      return {
        speciesCommon: spec.commonNameHi,
        speciesEn: spec.commonNameEn,
        effectiveWeight,
        multiplier,
        primaryDrug: spec.primaryDrug,
        primaryMg: Math.round(primaryMg * 10) / 10,
        primaryMl: Math.round(primaryMl * 100) / 100,
        secondaryDrug: spec.secondaryDrug,
        secondaryMg: Math.round(secondaryMg * 100) / 100,
        secondaryMl: Math.round(secondaryMl * 100) / 100,
        totalDartVolumeMl,
        recommendedDartSizeMl,
        dartNeedleType: spec.dartNeedleType,
        targetDartSite: spec.targetDartSite,
        myopathyRisk: spec.myopathyRisk,
        maxDownTimeMinutes: spec.maxDownTimeMinutes,
        reversalDrug: spec.reversalDrug,
        reversalMg: Math.round(reversalMg * 10) / 10,
        reversalMl,
        reversalRoute: spec.reversalRoute
      };
    },

    // Computes aggregate telemetry metrics
    computeConsoleMetrics() {
      const logs = State.wildlifeEncounters;
      let highRisk = 0;
      let activeMonitoring = 0;
      let releasedCount = 0;

      logs.forEach(l => {
        if (l.species === 'tiger' || l.species === 'elephant' || l.species === 'leopard') {
          highRisk++;
        }
        if (l.status === 'MONITORING') activeMonitoring++;
        if (l.status === 'RELEASED') releasedCount++;
      });

      return {
        totalEncounters: logs.length,
        highRisk,
        activeMonitoring,
        releasedCount
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[WildlifeEngine ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const m = WildlifeMath.computeConsoleMetrics();
      const currentRecipe = WildlifeMath.calculateDartingRecipe(State.activeSpeciesKey, State.estimatedWeightKg, State.excitementLevel);

      return `
        <div class="wildlife-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP KPI & WILDLIFE OPERATIONS RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Metric 1: Wildlife Operations Logged -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">कुल वन्यजीव बचाव / डार्टिंग ऑपरेशन</span>
                  <div class="text-2xl font-black font-display text-white mt-1">
                    ${m.totalEncounters} <span class="text-xs font-normal text-slate-400 font-sans">मिशन</span>
                  </div>
                  <div class="text-[11px] text-emerald-400 font-mono mt-0.5">
                    सफलतापूर्वक विमुक्त: <strong>${m.releasedCount}</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-solid fa-paw"></i>
                </div>
              </div>
            </div>

            <!-- Metric 2: High-Risk Apex Predator Dartings -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">उच्च जोखिम वन्यजीव (High-Risk Apex)</span>
                  <div class="text-2xl font-black font-display text-amber-400 mt-1">
                    ${m.highRisk} <span class="text-xs font-normal text-slate-400 font-sans">ऑपरेशन</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    बाघ • तेंदुआ • जंगली हाथी
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-shield-cat"></i>
                </div>
              </div>
            </div>

            <!-- Metric 3: Active Radio-Collar Monitoring -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">सक्रिय रेडियो-कॉलर / सैटेलाइट सर्विलांस</span>
                  <div class="text-2xl font-black font-display text-cyan-400 mt-1">
                    ${m.activeMonitoring} <span class="text-xs font-normal text-slate-400 font-sans">पशु</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    GPS / VHF 148-150 MHz
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
              </div>
            </div>

            <!-- Metric 4: Capture Myopathy Prevention Index -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">मायोपैथी रोकथाम प्रोटोकॉल</span>
                  <div class="text-2xl font-black font-display text-purple-400 mt-1">
                    100% OK
                  </div>
                  <div class="text-[11px] text-emerald-400 font-mono mt-0.5">
                    सोडियम बाइकार्ब + विट-E तैयार
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-heart-pulse"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="wildlife_darting_calculator" class="wild-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'wildlife_darting_calculator' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-crosshairs"></i>
                <span>१. डार्टिंग खुराक व एंटीडोट कैलकुलेटर</span>
              </button>
              <button type="button" data-tab="immobilization_log" class="wild-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'immobilization_log' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-clipboard-list"></i>
                <span>२. फील्ड रेस्क्यू व ट्रैंकुलाइजेशन लॉग</span>
              </button>
              <button type="button" data-tab="capture_myopathy_protocol" class="wild-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'capture_myopathy_protocol' ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-temperature-arrow-down"></i>
                <span>३. कैप्चर मायोपैथी आपातकाल गाइड</span>
              </button>
              <button type="button" data-tab="rescue_release_dossier" class="wild-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'rescue_release_dossier' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-file-shield"></i>
                <span>४. वन विभाग रिलीज मेनिफेस्ट</span>
              </button>
            </div>

            <!-- Action Button: Log New Field Capture -->
            <button type="button" id="btnOpenNewEncounterModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
              <i class="fa-solid fa-plus-circle"></i>
              <span>नया रेस्क्यू मिशन दर्ज करें</span>
            </button>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="wildlifeTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="wildlifeModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Scientific Wildlife Darting Calculator
    renderDartingCalculatorTab() {
      const db = window.VetcareApp.ClinicalData.WildlifeProtocols.SPECIES_DATABASE;
      const rec = WildlifeMath.calculateDartingRecipe(State.activeSpeciesKey, State.estimatedWeightKg, State.excitementLevel);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  WII / CZA APPROVED CHEMICAL IMMOBILIZATION PROTOCOL
                </span>
                <h3 class="text-xl font-bold text-white mt-1">वन्यजीव रासायनिक अचेतन (Dart Formulation Engine)</h3>
                <div class="text-xs text-slate-400 font-mono">चयनित प्रजाति: <strong class="text-amber-400">${rec.speciesCommon}</strong> (${rec.speciesEn})</div>
              </div>

              <!-- Reversal Ready Box Highlight -->
              <div class="p-3 bg-slate-950 border border-rose-500/60 rounded-xl text-right">
                <span class="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  <i class="fa-solid fa-triangle-exclamation mr-1"></i> एंटीडोट रिवर्सल रेडी-बॉक्स
                </span>
                <span class="text-sm font-mono font-black text-white">${rec.reversalDrug}</span>
                <div class="text-xs font-mono font-bold text-emerald-400 mt-0.5">${rec.reversalMl} mL (${rec.reversalMg} mg) • ${rec.reversalRoute}</div>
              </div>
            </div>

            <!-- Species Silhouettes Selector Grid -->
            <div class="space-y-2">
              <label class="block text-xs font-mono uppercase text-amber-400 font-bold">१. लक्षित वन्यजीव प्रजाति चुनें (Target Species):</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                ${Object.values(db).map(s => {
                  const isSelected = s.id === State.activeSpeciesKey;
                  let icon = s.id === 'tiger' || s.id === 'leopard' ? '<i class="fa-solid fa-shield-cat"></i>' :
                             s.id === 'elephant' ? '<i class="fa-solid fa-cubes-stacked"></i>' :
                             s.id === 'sloth_bear' ? '<i class="fa-solid fa-paw"></i>' : '<i class="fa-solid fa-horse"></i>';

                  return `
                    <button type="button" data-species-select="${s.id}" class="species-select-btn p-3 rounded-xl border text-center transition-all ${isSelected ? 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/50' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}">
                      <div class="text-2xl mb-1 ${isSelected ? 'text-amber-400' : 'text-slate-400'}">${icon}</div>
                      <div class="text-xs font-bold text-white leading-tight">${s.commonNameHi.split('(')[0]}</div>
                      <div class="text-[10px] font-mono text-slate-500 mt-0.5">${s.typicalWeightRangeKg[0]}-${s.typicalWeightRangeKg[1]} kg</div>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Parameters Grid: Weight & Excitement Slider -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              
              <!-- Body Weight -->
              <div class="space-y-2">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-300 font-bold">अनुमानित शारीरिक वजन (Estimated Weight):</span>
                  <span id="weightDisplayValue" class="text-lg font-black text-amber-400">${State.estimatedWeightKg} kg</span>
                </div>
                <input type="range" id="inp_dartWeight" min="${db[State.activeSpeciesKey].typicalWeightRangeKg[0]}" max="${db[State.activeSpeciesKey].typicalWeightRangeKg[1]}" step="5" value="${State.estimatedWeightKg}" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                <div class="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>न्यूनतम: ${db[State.activeSpeciesKey].typicalWeightRangeKg[0]} kg</span>
                  <span>अधिकतम: ${db[State.activeSpeciesKey].typicalWeightRangeKg[1]} kg</span>
                </div>
              </div>

              <!-- Excitement / Adrenaline Surge -->
              <div class="space-y-2">
                <label class="block text-xs font-mono text-slate-300 font-bold">उत्तेजना व तनाव स्तर (Adrenaline Compensation):</label>
                <select id="inp_dartExcitement" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                  <option value="CALM" ${State.excitementLevel === 'CALM' ? 'selected' : ''}>शांत / पिंजरे में (Calm - 1.0x Baseline)</option>
                  <option value="ALERT" ${State.excitementLevel === 'ALERT' ? 'selected' : ''}>सतर्क / घेराबंदी में (Alert - 1.1x Compensated)</option>
                  <option value="AGGRESSIVE_FRENZY" ${State.excitementLevel === 'AGGRESSIVE_FRENZY' ? 'selected' : ''}>उग्र / तार में फंसा (Snared / Charging - 1.25x Adrenaline)</option>
                </select>
                <span class="text-[10px] text-slate-500 block">एड्रेनालिन रश के कारण रिसेप्टर्स ब्लॉक होते हैं; उच्च उत्तेजना में खुराक 25% बढ़ाई जाती है</span>
              </div>

            </div>

            <!-- Formulation & Dart Technical Specifications Output Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Drug Doses Breakdown -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="text-amber-400 font-bold uppercase">डार्ट सिरिंज में भरी जाने वाली औषधियां</span>
                  <span class="text-slate-400">कुल आयतन: <strong class="text-white text-sm">${rec.totalDartVolumeMl} mL</strong></span>
                </div>

                <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <div class="flex justify-between">
                    <span class="text-slate-300">१. प्राथमिक एनेस्थेटिक:</span>
                    <strong class="text-white">${rec.primaryDrug}</strong>
                  </div>
                  <div class="flex justify-between text-emerald-400">
                    <span>आवश्यक मात्रा:</span>
                    <strong>${rec.primaryMl} mL (${rec.primaryMg} mg)</strong>
                  </div>
                </div>

                <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <div class="flex justify-between">
                    <span class="text-slate-300">२. सिडेटिव / ट्रेंकुलाइज़र:</span>
                    <strong class="text-white">${rec.secondaryDrug}</strong>
                  </div>
                  <div class="flex justify-between text-cyan-400">
                    <span>आवश्यक मात्रा:</span>
                    <strong>${rec.secondaryMl} mL (${rec.secondaryMg} mg)</strong>
                  </div>
                </div>
              </div>

              <!-- Ballistic & Needle Hardware Specifications -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="text-cyan-400 font-bold uppercase">डार्ट सिरिंज व सुई स्पेसिफिकेशन</span>
                  <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">CO2 / Air Projector</span>
                </div>

                <div class="space-y-2 text-slate-300">
                  <div class="flex justify-between">
                    <span class="text-slate-500">अनुशंसित डार्ट चेंबर:</span>
                    <strong class="text-amber-300">${rec.recommendedDartSizeMl} mL चेंबर सिरिंज</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">सुई का आकार व बार्ब:</span>
                    <strong class="text-white">${rec.dartNeedleType}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">सर्वोत्तम निशाना (Target Site):</span>
                    <strong class="text-emerald-400">${rec.targetDartSite}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">अधिकतम डाउन-टाइम सीमा:</span>
                    <strong class="text-rose-400">${rec.maxDownTimeMinutes} मिनट (रिवर्सल अनिवार्य)</strong>
                  </div>
                </div>

                <div class="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200 font-sans">
                  <strong>प्रोजेक्टर प्रेशर गाइड:</strong> 25-35 मीटर दूरी हेतु 12-14 bar CO2 दबाव रखें। हड्डी पर सीधे प्रहार से बचने हेतु भारी कूल्हे की मांसपेशियों पर ही फायर करें।
                </div>
              </div>

            </div>

            <!-- LIVE INDUCTION & DOWN-TIME CHRONOMETER WIDGET -->
            <div class="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
                  <i class="fa-solid fa-stopwatch"></i>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">फील्ड इंडक्शन एवं डाउन-टाइम स्टॉपवॉच</h4>
                  <p class="text-xs text-slate-400">डार्ट लगने से लेकर पशु के पूरी तरह बैठने और आंख की पुतली स्थिर होने तक का सटीक समय</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div id="stopwatchDisplay" class="text-3xl font-mono font-black text-cyan-400 tracking-wider">
                  00:00
                </div>
                <button type="button" id="btnToggleStopwatch" class="px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${State.isStopwatchRunning ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}">
                  ${State.isStopwatchRunning ? 'रोकें (Stop)' : 'प्रारंभ (Start Dart Timer)'}
                </button>
                <button type="button" id="btnResetStopwatch" class="px-3 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300">
                  रीसेट
                </button>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 2: Wildlife Immobilization & Rescue Log View
    renderImmobilizationLogTab() {
      const logs = State.wildlifeEncounters;

      const rows = logs.map(l => {
        let statusBadge = l.status === 'RELEASED' ?
          '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">जंगल में विमुक्त (RELEASED)</span>' :
          '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">निगरानी में (MONITORING)</span>';

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4 font-mono text-xs">
              <span class="font-bold text-amber-400">${l.encounterId}</span>
              <div class="text-[10px] text-slate-400">${l.incidentDate}</div>
            </td>
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm">${l.animalIdentifier}</div>
              <div class="text-[11px] text-slate-400 font-mono">${l.speciesCommon} (${l.sex}, ${l.estimatedWeightKg} kg)</div>
            </td>
            <td class="py-3 px-4 text-xs font-mono">
              <div class="text-slate-200">${l.forestDivision}</div>
              <div class="text-[10px] text-cyan-400"><i class="fa-solid fa-location-crosshairs mr-1"></i>${l.locationGps.lat}, ${l.locationGps.lng}</div>
            </td>
            <td class="py-3 px-4 text-xs font-mono">
              <div class="text-slate-300 font-bold">${l.dartingDetails.drugFormula}</div>
              <div class="text-[10px] text-emerald-400">डाउन-टाइम: ${l.dartingDetails.downTimeMinutes} min | रिवर्सल: OK</div>
            </td>
            <td class="py-3 px-4">
              ${statusBadge}
            </td>
            <td class="py-3 px-4 text-right">
              <button type="button" data-action="print_dossier" data-id="${l.encounterId}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 transition-colors">
                <i class="fa-solid fa-print mr-1"></i> रेस्क्यू मेनिफेस्ट
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-clipboard-check text-cyan-400"></i>
                <span>वन्यजीव रासायनिक अचेतन एवं बचाव मिशन पंजी (Field Rescue Registry)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">जीपीएस लोकेशन, प्रयुक्त औषधियां, डाउन-टाइम एवं विमुक्ति स्थिति का आधिकारिक अभिलेख</p>
            </div>
            <span class="text-xs font-mono text-cyan-400 font-bold">${logs.length} मिशन दर्ज</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">मिशन क्रमांक / तिथि</th>
                  <th class="py-3 px-4">वन्यजीव पहचान एवं वजन</th>
                  <th class="py-3 px-4">वन प्रभाग एवं GPS लोकेशन</th>
                  <th class="py-3 px-4">डार्टिंग फॉर्मूलेशन व डाउन-टाइम</th>
                  <th class="py-3 px-4">वर्तमान स्थिति</th>
                  <th class="py-3 px-4 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                ${logs.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">कोई रेस्क्यू लॉग उपलब्ध नहीं है।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 3: Capture Myopathy Emergency Protocol Guide
    renderCaptureMyopathyTab() {
      const steps = window.VetcareApp.ClinicalData.WildlifeProtocols.CAPTURE_MYOPATHY_INTERVENTIONS;

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="border-b border-slate-800 pb-3">
              <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                LETHAL HYPERTHERMIA EMERGENCY PROTOCOL
              </span>
              <h3 class="text-xl font-bold text-white mt-1">कैप्चर मायोपैथी (Capture Myopathy / Exertional Rhabdomyolysis) रोकथाम</h3>
              <p class="text-xs text-slate-400 mt-0.5">
                जंगली हिरणों, नीलगाय व बड़े फेलिड्स में अत्यधिक भाग-दौड़ से उत्पन्न घातक लैक्टिक एसिडोसिस व मायोसाइट नेक्रोसिस की जीवन-रक्षक चिकित्सा
              </p>
            </div>

            <!-- Pathophysiological Risk Indicators -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 rounded-xl bg-slate-950 border border-rose-500/40 space-y-1 text-xs">
                <span class="font-bold text-rose-400 font-mono uppercase block">१. कोर तापमान संकट (&gt;104°F)</span>
                <p class="text-slate-300">हाइपरथर्मिया से सेरेब्रल एडिमा व एंजाइम विकृति। तापमान 106°F पार होते ही मृत्यु की आशंका 80% बढ़ जाती है।</p>
              </div>
              <div class="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1 text-xs">
                <span class="font-bold text-amber-400 font-mono uppercase block">२. मेटाबोलिक लैक्टिक एसिडोसिस</span>
                <p class="text-slate-300">मांसपेशियों में एनारोबिक ग्लाइकोलाइसिस से अत्यधिक लैक्टेट निर्माण; रक्त पीएच 7.0 से नीचे गिरना।</p>
              </div>
              <div class="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1 text-xs">
                <span class="font-bold text-purple-400 font-mono uppercase block">३. मायोग्लोबिन्यूरिक रीनल फेल्योर</span>
                <p class="text-slate-300">क्षतिग्रस्त मांसपेशियों से निकला मायोग्लोबिन गुर्दे की नलिकाओं को अवरुद्ध कर गहरा भूरा/काला पेशाब उत्पन्न करता है।</p>
              </div>
            </div>

            <!-- Step by Step Intervention Checklist -->
            <div class="space-y-3">
              <h4 class="text-xs font-mono uppercase text-cyan-400 font-bold">आपातकालीन 4-चरणीय क्लिनिकल एक्शन चेकलिस्ट:</h4>
              <div class="space-y-3">
                ${steps.map(s => `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3.5 text-xs">
                    <span class="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-black flex items-center justify-center flex-shrink-0 font-mono">
                      ${s.step}
                    </span>
                    <div class="space-y-1">
                      <div class="font-bold text-white text-sm">${s.title}</div>
                      <p class="text-slate-300 leading-relaxed">${s.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: Rescue, Collaring & Release Dossier Preview
    renderReleaseDossierTab() {
      const activeEncounter = State.wildlifeEncounters.find(e => e.encounterId === State.activeEncounterId) || State.wildlifeEncounters[0];

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-file-shield text-emerald-400"></i>
                  <span>वन्यजीव विमुक्ति एवं रेडियो-कॉलर मेनिफेस्ट (Official Release Dossier)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">वन प्रभाग, एनटीसीए (NTCA) एवं चिड़ियाघर प्राधिकरण हेतु विधिक प्रमाण-पत्र</p>
              </div>
              <button type="button" id="btnPrintDossierAction" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i>
                <span>आधिकारिक मेनिफेस्ट प्रिंट करें (A4)</span>
              </button>
            </div>

            <!-- Dossier Preview Document Card -->
            <div class="p-8 rounded-2xl bg-white text-slate-950 border-4 border-slate-900 shadow-2xl max-w-2xl mx-auto space-y-5 font-sans">
              <div class="text-center border-b-2 border-slate-900 pb-4">
                <div class="text-lg font-black uppercase text-slate-900 tracking-tight">वन एवं वन्यजीव संरक्षण विभाग • STATE FOREST DEPARTMENT</div>
                <div class="text-[10px] text-slate-600 font-mono font-bold">WILDLIFE TRANSLOCATION, IMMOBILIZATION & HEALTH CLEARANCE CERTIFICATE</div>
                <div class="text-xs font-bold text-emerald-800 mt-1">प्रमाण-पत्र क्रमांक: ${activeEncounter.encounterId}</div>
              </div>

              <!-- Animal Identification Grid -->
              <table class="w-full text-left text-xs border-collapse">
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100 w-1/3">वन्यजीव पहचान / नाम</th>
                  <td class="p-2 font-bold">${activeEncounter.animalIdentifier}</td>
                </tr>
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100">प्रजाति एवं लिंग</th>
                  <td class="p-2">${activeEncounter.speciesCommon} (${activeEncounter.sex === 'M' ? 'नर / Male' : 'मादा / Female'}, वजन: ${activeEncounter.estimatedWeightKg} kg)</td>
                </tr>
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100">रेस्क्यू / कैप्चर स्थल</th>
                  <td class="p-2">${activeEncounter.forestDivision} (GPS: ${activeEncounter.locationGps.lat}, ${activeEncounter.locationGps.lng})</td>
                </tr>
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100">प्रयुक्त केमिकल फॉर्मूलेशन</th>
                  <td class="p-2 font-mono">${activeEncounter.dartingDetails.drugFormula}</td>
                </tr>
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100">एंटीडोट रिवर्सल एवं रिकवरी</th>
                  <td class="p-2 font-mono">${activeEncounter.dartingDetails.reversalAdministered}</td>
                </tr>
                <tr class="border-b border-slate-200">
                  <th class="p-2 bg-slate-100">रेडियो-कॉलर फ्रीक्वेंसी</th>
                  <td class="p-2 font-mono font-bold">${activeEncounter.dartingDetails.collarFrequency}</td>
                </tr>
              </table>

              <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-slate-800 leading-relaxed">
                <strong>विमुक्ति प्रमाणीकरण:</strong> प्रमाणित किया जाता है कि उपरोक्त वन्यजीव का रासायनिक अचेतन एनटीसीए/सीजेडए मानक प्रोटोकॉल अनुसार सुरक्षित संपन्न हुआ। पशु में कैप्चर मायोपैथी, डिहाइड्रेशन या फ्रैक्चर के कोई लक्षण नहीं हैं। शारीरिक तापमान 101.4°F सामान्य होने एवं चेतना पूर्णतः लौटने के उपरांत इसे प्राकृतिक पर्यावास में सुरक्षित विमुक्त किया गया।
              </div>

              <div class="pt-8 border-t-2 border-slate-900 flex justify-between items-end text-xs">
                <div>
                  <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center text-[9px] font-mono text-slate-400 text-center p-1">
                    [ FOREST EMBOSS SEAL ]
                  </div>
                </div>
                <div class="text-center font-bold">
                  हस्ताक्षर अधिकृत वन्यजीव पशु चिकित्सक<br />
                  (Authorized Wildlife Veterinary Officer / WII)
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }
  };

  // 7. MODAL CONTROLLERS (ADD NEW RESCUE MISSION)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('wildlifeModalContainer');
      if (container) container.innerHTML = '';
    },

    openNewEncounterModal() {
      const container = document.getElementById('wildlifeModalContainer');
      if (!container) return;

      const encId = 'ENC-WII-2026-' + Math.floor(100 + Math.random() * 900);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <i class="fa-solid fa-paw"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया वन्यजीव बचाव मिशन दर्ज करें</h3>
              </div>
              <button type="button" id="btnModalCloseEncounter" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewEncounter" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मिशन आईडी*</label>
                  <input type="text" id="ne_id" value="${encId}" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-mono font-bold" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दिनांक*</label>
                  <input type="date" id="ne_date" value="${new Date().toISOString().split('T')[0]}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वन्यजीव प्रजाति*</label>
                  <select id="ne_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="tiger">रॉयल बंगाल टाइगर (Tiger)</option>
                    <option value="leopard">भारतीय तेंदुआ (Leopard)</option>
                    <option value="elephant">एशियाई हाथी (Elephant)</option>
                    <option value="sloth_bear">स्लॉथ बेयर (Bear)</option>
                    <option value="sambar_deer">सांभर हिरण (Sambar)</option>
                    <option value="nilgai">नीलगाय (Nilgai)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशु पहचान / कोड*</label>
                  <input type="text" id="ne_identifier" required placeholder="उदा. T-112 (Female, Subadult)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लिंग*</label>
                  <select id="ne_sex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="M">नर (Male)</option>
                    <option value="F">मादा (Female)</option>
                    <option value="UNKNOWN">अज्ञात</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वजन (kg)*</label>
                  <input type="number" id="ne_weight" value="150" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">ऑपरेशन प्रकार*</label>
                  <select id="ne_conflict" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="RESCUE">बचाव (Rescue)</option>
                    <option value="RADIO_COLLARING">रेडियो-कॉलरिंग</option>
                    <option value="HUMAN_CONFLICT">मानव-संघर्ष नियंत्रण</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वन प्रभाग / रेंज (Forest Division)*</label>
                <input type="text" id="ne_division" required placeholder="उदा. कॉर्बेट टाइगर रिजर्व, ढिकाला रेंज" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अक्षांश (Latitude)*</label>
                  <input type="text" id="ne_lat" value="29.5312° N" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">देशांतर (Longitude)*</label>
                  <input type="text" id="ne_lng" value="78.9465° E" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelEncounterModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">मिशन सुरक्षित करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseEncounter').onclick = ModalController.closeModal;
      document.getElementById('btnCancelEncounterModal').onclick = ModalController.closeModal;

      document.getElementById('formAddNewEncounter').onsubmit = async (e) => {
        e.preventDefault();
        const idVal = document.getElementById('ne_id').value;
        const dateVal = document.getElementById('ne_date').value;
        const specVal = document.getElementById('ne_species').value;
        const identVal = document.getElementById('ne_identifier').value.trim();
        const sexVal = document.getElementById('ne_sex').value;
        const wtVal = parseFloat(document.getElementById('ne_weight').value);
        const confVal = document.getElementById('ne_conflict').value;
        const divVal = document.getElementById('ne_division').value.trim();
        const latVal = document.getElementById('ne_lat').value.trim();
        const lngVal = document.getElementById('ne_lng').value.trim();

        const specData = window.VetcareApp.ClinicalData.WildlifeProtocols.SPECIES_DATABASE[specVal];

        const newRecord = {
          encounterId: idVal,
          incidentDate: dateVal,
          species: specVal,
          speciesCommon: specData.commonNameHi,
          animalIdentifier: identVal,
          sex: sexVal,
          estimatedWeightKg: wtVal,
          physicalCondition: 'GOOD',
          locationGps: { lat: latVal, lng: lngVal },
          forestDivision: divVal,
          conflictType: confVal,
          dartingDetails: {
            drugFormula: `${specData.primaryDrug.split('(')[0]} + ${specData.secondaryDrug.split('(')[0]}`,
            dartVolumeMl: 4.5,
            downTimeMinutes: 12,
            reversalAdministered: `${specData.reversalDrug} administered OK`,
            recoveryTimeMinutes: 5,
            collarFrequency: confVal === 'RADIO_COLLARING' ? 'GPS Collar Active' : 'N/A'
          },
          status: 'RELEASED'
        };

        State.wildlifeEncounters.unshift(newRecord);
        State.activeEncounterId = idVal;
        await StorageAdapter.saveEncounter(newRecord);

        ModalController.closeModal();
        notify(`मिशन ${idVal} (${identVal}) सफलतापूर्वक दर्ज हुआ।`, 'success');
        window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.wild-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
        }
        return;
      }

      // 2. Species Silhouettes Selector
      const specBtn = e.target.closest('.species-select-btn');
      if (specBtn) {
        const sKey = specBtn.getAttribute('data-species-select');
        if (sKey && sKey !== State.activeSpeciesKey) {
          State.activeSpeciesKey = sKey;
          State.estimatedWeightKg = window.VetcareApp.ClinicalData.WildlifeProtocols.SPECIES_DATABASE[sKey].defaultWeightKg;
          window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
        }
        return;
      }

      // 3. Print Dossier Action
      const printBtn = e.target.closest('button[data-action="print_dossier"]') || e.target.closest('#btnPrintDossierAction');
      if (printBtn) {
        const encId = printBtn.getAttribute('data-id') || State.activeEncounterId;
        window.VetcareApp.Modules.WildlifeZooImmobilization.printTranslocationCertificate(encId);
        return;
      }

      // 4. Open New Encounter Modal
      if (e.target.closest('#btnOpenNewEncounterModal')) {
        ModalController.openNewEncounterModal();
        return;
      }

      // 5. Stopwatch Actions
      if (e.target.closest('#btnToggleStopwatch')) {
        toggleStopwatch();
        return;
      }

      if (e.target.closest('#btnResetStopwatch')) {
        resetStopwatch();
        return;
      }
    });

    // Weight Slider Input
    container.addEventListener('input', (e) => {
      if (e.target.id === 'inp_dartWeight') {
        State.estimatedWeightKg = parseFloat(e.target.value);
        const disp = document.getElementById('weightDisplayValue');
        if (disp) disp.textContent = `${State.estimatedWeightKg} kg`;
        // Fast re-render of recipe
        window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
      }
    });

    // Excitement Dropdown Change
    container.addEventListener('change', (e) => {
      if (e.target.id === 'inp_dartExcitement') {
        State.excitementLevel = e.target.value;
        window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
      }
    });

    function toggleStopwatch() {
      if (State.isStopwatchRunning) {
        clearInterval(State.stopwatchInterval);
        State.isStopwatchRunning = false;
      } else {
        State.isStopwatchRunning = true;
        State.stopwatchInterval = setInterval(() => {
          State.stopwatchSeconds++;
          const mins = String(Math.floor(State.stopwatchSeconds / 60)).padStart(2, '0');
          const secs = String(State.stopwatchSeconds % 60).padStart(2, '0');
          const disp = document.getElementById('stopwatchDisplay');
          if (disp) disp.textContent = `${mins}:${secs}`;
        }, 1000);
      }
      window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
    }

    function resetStopwatch() {
      clearInterval(State.stopwatchInterval);
      State.isStopwatchRunning = false;
      State.stopwatchSeconds = 0;
      const disp = document.getElementById('stopwatchDisplay');
      if (disp) disp.textContent = '00:00';
      window.VetcareApp.Modules.WildlifeZooImmobilization.refreshView();
    }

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.WildlifeZooImmobilization = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedEncounters = await StorageAdapter.loadAllEncounters();
        State.wildlifeEncounters = Array.isArray(savedEncounters) && savedEncounters.length > 0 ? savedEncounters : State.seedData;

        if (State.wildlifeEncounters.length > 0 && !State.activeEncounterId) {
          State.activeEncounterId = State.wildlifeEncounters[0].encounterId;
        }

        console.log('[WildlifeEngine] Module initialized with', State.wildlifeEncounters.length, 'encounters.');
      } catch (err) {
        console.error('[WildlifeEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[WildlifeEngine] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const contentPanel = State.containerElement.querySelector('#wildlifeTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'wildlife_darting_calculator') {
        contentPanel.innerHTML = UIEngine.renderDartingCalculatorTab();
      } else if (State.activeTab === 'immobilization_log') {
        contentPanel.innerHTML = UIEngine.renderImmobilizationLogTab();
      } else if (State.activeTab === 'capture_myopathy_protocol') {
        contentPanel.innerHTML = UIEngine.renderCaptureMyopathyTab();
      } else if (State.activeTab === 'rescue_release_dossier') {
        contentPanel.innerHTML = UIEngine.renderReleaseDossierTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.stopwatchInterval) {
        clearInterval(State.stopwatchInterval);
        State.stopwatchInterval = null;
      }
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[WildlifeEngine] Module destroyed cleanly.');
    },

    // Official Forest Division A4 Wildlife Translocation & Release Certificate
    printTranslocationCertificate(encounterId) {
      const enc = State.wildlifeEncounters.find(e => e.encounterId === encounterId);
      if (!enc) {
        notify('मिशन रिकॉर्ड अप्राप्य है।', 'error');
        return;
      }

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const certHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Wildlife Translocation Certificate - ${enc.encounterId}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Times New Roman', Times, serif; color: #111; line-height: 1.4; padding: 10px; font-size: 12px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 15px; }
            .crest { font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .subcrest { font-size: 11px; text-transform: uppercase; color: #333; font-weight: bold; }
            .title { font-size: 15px; font-weight: bold; margin-top: 6px; text-decoration: underline; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 12px; }
            th, td { border: 1px solid #333; padding: 6px 8px; font-size: 11px; text-align: left; }
            th { background-color: #f2f2f2; width: 32%; }
            .box { border: 2px solid #000; padding: 10px; margin-top: 15px; background: #fafafa; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 50px; }
            .sign-box { border-top: 1px solid #000; width: 230px; text-align: center; padding-top: 5px; font-size: 11px; font-weight: bold; }
            .qr-token { border: 1px dashed #000; padding: 8px; width: 140px; text-align: center; font-family: monospace; font-size: 9px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">STATE FOREST DEPARTMENT • वन्यजीव संरक्षण प्रभाग</div>
            <div class="subcrest">NATIONAL TIGER CONSERVATION AUTHORITY (NTCA) & CENTRAL ZOO AUTHORITY COMPLIANT</div>
            <div class="title">वन्यजीव रासायनिक अचेतन, उपचार एवं विमुक्ति प्रमाण-पत्र</div>
          </div>

          <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px;">
            <span>मिशन क्रमांक: <u>${enc.encounterId}</u></span>
            <span>तारीख: <u>${enc.incidentDate}</u></span>
            <span>प्रभाग: <u>${enc.forestDivision}</u></span>
          </div>

          <table>
            <tr>
              <th>१. वन्यजीव प्रजाति एवं पहचान</th>
              <td><strong>${enc.animalIdentifier}</strong> (${enc.speciesCommon})</td>
            </tr>
            <tr>
              <th>२. लिंग एवं अनुमानित शारीरिक वजन</th>
              <td>लिंग: ${enc.sex} | वजन: <strong>${enc.estimatedWeightKg} kg</strong></td>
            </tr>
            <tr>
              <th>३. स्थल एवं जीपीएस निर्देशांक</th>
              <td>${enc.forestDivision} (GPS: ${enc.locationGps.lat}, ${enc.locationGps.lng})</td>
            </tr>
            <tr>
              <th>४. ऑपरेशन का उद्देश्य (Conflict Type)</th>
              <td><strong>${enc.conflictType}</strong> (Physical Condition: ${enc.physicalCondition})</td>
            </tr>
            <tr>
              <th>५. प्रयुक्त रासायनिक डार्टिंग औषधियां</th>
              <td style="font-family: monospace;"><strong>${enc.dartingDetails.drugFormula}</strong></td>
            </tr>
            <tr>
              <th>६. डाउन-टाइम एवं एंटीडोट रिवर्सल</th>
              <td>डाउन-टाइम: ${enc.dartingDetails.downTimeMinutes} मिनट | रिवर्सल: <strong>${enc.dartingDetails.reversalAdministered}</strong></td>
            </tr>
            <tr>
              <th>७. रेडियो-कॉलर / ट्रांसपोंडर आवृत्ति</th>
              <td style="font-family: monospace;">${enc.dartingDetails.collarFrequency}</td>
            </tr>
          </table>

          <div class="box">
            <strong>अधिकृत वन्यजीव चिकित्सक की विधिक घोषणा:</strong>
            <p style="margin: 4px 0 0 0; text-align: justify;">
              प्रमाणित किया जाता है कि उपरोक्त वन्यजीव का रासायनिक अचेतन (Chemical Immobilization) सुरक्षित रूप से संपन्न किया गया। पशु को कैप्चर मायोपैथी (Capture Myopathy) से बचाने हेतु इलेक्ट्रोलाइट व मेटाबोलिक बफर प्रदान किए गए। पशु के सभी रिफ्लेक्स सामान्य पाए गए तथा उसे सुरक्षित रूप से 
              <strong>${enc.status === 'RELEASED' ? 'प्राकृतिक पर्यावास में विमुक्त किया गया।' : 'गहन पशु चिकित्सा निगरानी में रखा गया है।'}</strong>
            </p>
          </div>

          <div class="footer-sign">
            <div class="qr-token">
              [ OFFICIAL RESCUE ]<br />
              WII-${enc.encounterId}<br />
              NTCA PROTOCOL OK
            </div>

            <div class="sign-box">
              प्रभागीय वनाधिकारी / रेंज ऑफिसर<br />
              (Divisional Forest Officer / DFO)
            </div>

            <div class="sign-box">
              हस्ताक्षर अधिकृत वन्यजीव पशु चिकित्सक<br />
              (Wildlife Veterinary Officer)<br />
              पंजीकरण संख्या एवं मुहर
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(certHtml);
      printWindow.document.close();
    }
  };

})(window, document);
