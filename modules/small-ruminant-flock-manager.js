// Vetcare AI OS - Sheep & Goat Flock Health, FAMACHA Anemia Scoring & Targeted Selective Treatment Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Comprehensive Small Ruminant Parasitology, FAMACHA & Anthelmintic Pharmacopeia
  window.VetcareApp.ClinicalData.DewormingProtocols = {
    FAMACHA_SCORING_MATRIX: {
      1: {
        score: 1,
        colorName: 'Optimal Red (इष्टतम लाल)',
        hexColor: '#b91c1c',
        estimatedPcv: '> 28%',
        clinicalStatus: 'Non-Anemic (स्वस्थ)',
        actionRequired: 'DO_NOT_DEWORM',
        actionLabel: 'कीड़ा दवा न दें (No Treatment)',
        treatmentProtocol: 'पशु में बारबर्स पोल वर्म (Haemonchus) का संक्रमण नगण्य है। रिफ्यूजियों (Refugia) को संरक्षित रखने हेतु दवा निषेध है।'
      },
      2: {
        score: 2,
        colorName: 'Acceptable Red-Pink (स्वीकार्य लाल-गुलाबी)',
        hexColor: '#e11d48',
        estimatedPcv: '23% - 27%',
        clinicalStatus: 'Acceptable (सामान्य)',
        actionRequired: 'DO_NOT_DEWORM',
        actionLabel: 'कीड़ा दवा न दें (Do Not Deworm)',
        treatmentProtocol: 'संतोषजनक हीमोग्लोबिन स्तर। 14 दिनों पश्चात पुनः म्यूकोसा परीक्षण करें।'
      },
      3: {
        score: 3,
        colorName: 'Borderline Pink (सीमांत गुलाबी)',
        hexColor: '#fb7185',
        estimatedPcv: '18% - 22%',
        clinicalStatus: 'Borderline (सीमांत रक्ताल्पता)',
        actionRequired: 'SELECTIVE_DEWORM',
        actionLabel: 'सशर्त चयनात्मक दवा (Selective Treatment)',
        treatmentProtocol: 'केवल तभी कृमिनाशक दें यदि पशु गाभिन हो, दूध दे रहा हो, कमज़ोर हो (BCS < 2.5), अथवा 6 माह से कम उम्र का मेमना/पाठी हो।'
      },
      4: {
        score: 4,
        colorName: 'Dangerous Pink-White (खतरनाक फीका गुलाबी-सफेद)',
        hexColor: '#fecdd3',
        estimatedPcv: '13% - 17%',
        clinicalStatus: 'Anemic Alert (गंभीर रक्ताल्पता)',
        actionRequired: 'MANDATORY_DEWORM',
        actionLabel: 'अनिवार्य कृमिनाशक दें (Mandatory Deworming)',
        treatmentProtocol: 'तत्काल क्लोसेंटेल (Closantel 10mg/kg) अथवा लेवामिसोल (Levamisole) दें। लौह लवण (Iron Dextran 2ml IM) व बी-कॉम्प्लेक्स पूरक अनिवार्य।'
      },
      5: {
        score: 5,
        colorName: 'Fatal Ghost White (घातक चाक जैसा सफेद)',
        hexColor: '#ffffff',
        borderHex: '#cbd5e1',
        estimatedPcv: '< 13%',
        clinicalStatus: 'Critical / Fatal Collapse (प्राणघातक रक्ताल्पता / जबड़े की सूजन)',
        actionRequired: 'EMERGENCY_INTERVENTION',
        actionLabel: 'आपातकालीन गहन चिकित्सा (Emergency Life Support)',
        treatmentProtocol: 'अत्यंत गंभीर हीमोलिटिक संकट व बॉटल जॉ (Bottle Jaw)। क्लोसेंटेल + फेनबेंडाजोल डोज़ दें, साथ में 3-5ml आयरन डेक्सट्रान, कॉर्टिकोस्टेरॉइड-मुक्त सपोर्टिव सलाइन ड्रिप, व रक्त आधान (Blood Transfusion) पर विचार करें।'
      }
    },

    ANTHELMINTIC_FORMULARY: {
      'Closantel (15% w/v Oral Suspension)': {
        targetParasite: 'Adult & Immature Haemonchus contortus, Fasciola gigantica, Oestrus ovis',
        sheepDoseMgKg: 10.0,
        goatDoseMgKg: 10.0,
        mlPer10Kg: 0.67,
        route: 'Oral / SC',
        meatWithdrawalDays: 28,
        milkWithdrawalDays: 7,
        notes: 'बाध्यकारी कृमिनाशक - लंबे समय (4-6 सप्ताह) तक रक्त-चूसक परजीवियों के विरुद्ध सुरक्षा प्रदान करता है।'
      },
      'Levamisole HCl (3% w/v)': {
        targetParasite: 'Nematodes, Lungworms (Dictyocaulus filaria)',
        sheepDoseMgKg: 7.5,
        goatDoseMgKg: 12.0, // Goats require 1.5x - 1.6x sheep dose due to faster hepatic clearance
        mlPer10Kg: 2.5,
        route: 'Oral / SC',
        meatWithdrawalDays: 3,
        milkWithdrawalDays: 3,
        notes: 'बकरियों में तेज यकृत चयापचय (Hepatic metabolism) होने के कारण भेड़ों की तुलना में 1.5 गुना खुराक आवश्यक है।'
      },
      'Fenbendazole (2.5% Micronized Suspension)': {
        targetParasite: 'Roundworms, Tapeworms (Moniezia), Arrested Larvae',
        sheepDoseMgKg: 5.0,
        goatDoseMgKg: 10.0, // Goats require 2x standard sheep dose
        mlPer10Kg: 2.0, // For sheep: 2ml/10kg; For goats: 4ml/10kg
        route: 'Oral Drench',
        meatWithdrawalDays: 8,
        milkWithdrawalDays: 4,
        notes: 'बकरियों में 10 mg/kg खुराक दें। व्यापक स्पेक्ट्रम व गाभिन अवस्था में पूर्णतः सुरक्षित।'
      },
      'Ivermectin (0.2% Oral Liquid)': {
        targetParasite: 'Gastrointestinal nematodes, Sarcoptic mange, Sucking lice',
        sheepDoseMgKg: 0.2,
        goatDoseMgKg: 0.4, // Goats require double dose
        mlPer10Kg: 1.0,
        route: 'Oral / Subcutaneous',
        meatWithdrawalDays: 14,
        milkWithdrawalDays: 14,
        notes: 'बाह्य व आंतरिक परजीवी नाशक। लगातार प्रयोग से प्रतिरोध उत्पन्न हो सकता है।'
      }
    },

    BCS_SCALE_DESCRIPTIONS: {
      1.0: 'अत्यंत दुर्बल (Emaciated): रीढ़ की हड्डी (Spinous process) तेज धारदार उभरी हुई, उंगलियों से आसानी से महसूस, पीठ पर वसा शून्य।',
      2.0: 'पतला (Thin): रीढ़ की हड्डियां गोल किंतु स्पष्ट महसूस होती हैं, अनुप्रस्थ उभार (Transverse processes) स्पष्ट, न्यूनतम मांसपेशी वसा।',
      3.0: 'मध्यम / इष्टतम (Ideal / Optimal): रीढ़ की हड्डियां चिकनी और गोल, दृढ़ दबाव से ही महसूस होती हैं, लम्बर मांसपेशियां भरी हुई।',
      4.0: 'मोटा / हृष्ट-पुष्ट (Fat): रीढ़ की हड्डियां केवल गहरे दबाव पर महसूस होती हैं, पीठ चौड़ी और चपटी, पर्याप्त वसा संचय।',
      5.0: 'अत्यधिक स्थूल (Obese): रीढ़ की हड्डी बिल्कुल महसूस नहीं होती, रीढ़ के दोनों ओर वसा की मोटी परत, पूंछ के आधार पर भारी चर्बी।'
    }
  };

  // 2. INTERNAL STATE MANAGEMENT
  const State = {
    activeTab: 'flock_census',
    activeFilter: 'all',
    searchQuery: '',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    flockAnimals: [],
    famachaAuditHistory: [],

    // Seed Dataset (Hydrated if storage is empty)
    seedData: [
      {
        id: 'SR-2026-001',
        tagNo: 'IN-RJ-2026-8801',
        species: 'caprine',
        breed: 'Sirohi Pure',
        sex: 'doe',
        ageMonths: 24,
        bodyWeightKg: 44.5,
        bcs: 3.5,
        famachaScore: 2,
        lastDewormedDate: new Date(Date.now() - 95 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        reproductiveStage: 'PREGNANT',
        breedingDate: new Date(Date.now() - 118 * 86400000).toISOString().split('T')[0],
        estimatedDueDate: new Date(Date.now() + 32 * 86400000).toISOString().split('T')[0],
        kidsBornCount: 2,
        notes: 'उच्च दुग्ध क्षमता, जुड़वां मेमने देने का इतिहास।'
      },
      {
        id: 'SR-2026-002',
        tagNo: 'IN-UP-2026-3312',
        species: 'caprine',
        breed: 'Barbari Dairy',
        sex: 'doe',
        ageMonths: 18,
        bodyWeightKg: 26.0,
        bcs: 2.0,
        famachaScore: 4,
        lastDewormedDate: new Date(Date.now() - 140 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date().toISOString().split('T')[0],
        reproductiveStage: 'LACTATING',
        breedingDate: '',
        estimatedDueDate: '',
        kidsBornCount: 2,
        notes: 'तीव्र कृमि संक्रमण, हल्का जबड़े का शोथ (Mild submandibular oedema)।'
      },
      {
        id: 'SR-2026-003',
        tagNo: 'IN-RJ-2026-9904',
        species: 'ovine',
        breed: 'Marwari Wool',
        sex: 'ewe',
        ageMonths: 32,
        bodyWeightKg: 36.5,
        bcs: 1.5,
        famachaScore: 5,
        lastDewormedDate: new Date(Date.now() - 180 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date().toISOString().split('T')[0],
        reproductiveStage: 'OPEN',
        breedingDate: '',
        estimatedDueDate: '',
        kidsBornCount: 1,
        notes: 'प्राणघातक रक्ताल्पता! बॉटल जॉ स्पष्ट, चारा त्याग दिया है। आपातकालीन क्लोसेंटेल दिया गया।'
      },
      {
        id: 'SR-2026-004',
        tagNo: 'IN-MP-2026-1140',
        species: 'caprine',
        breed: 'Jamnapari Stud',
        sex: 'buck',
        ageMonths: 36,
        bodyWeightKg: 72.0,
        bcs: 3.5,
        famachaScore: 1,
        lastDewormedDate: new Date(Date.now() - 60 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
        reproductiveStage: 'OPEN',
        breedingDate: '',
        estimatedDueDate: '',
        kidsBornCount: 0,
        notes: 'ब्रीडिंग बक - उत्कृष्ट लाल श्लेष्मा झिल्ली, कोई परजीवी लक्षण नहीं।'
      },
      {
        id: 'SR-2026-005',
        tagNo: 'IN-AP-2026-7721',
        species: 'ovine',
        breed: 'Nellore Meat',
        sex: 'ram',
        ageMonths: 20,
        bodyWeightKg: 46.0,
        bcs: 3.0,
        famachaScore: 2,
        lastDewormedDate: new Date(Date.now() - 40 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        reproductiveStage: 'OPEN',
        breedingDate: '',
        estimatedDueDate: '',
        kidsBornCount: 0,
        notes: 'सामान्य झुंड नर, चारागाह चरने हेतु फिट।'
      },
      {
        id: 'SR-2026-006',
        tagNo: 'IN-RJ-2026-8845',
        species: 'caprine',
        breed: 'Sirohi Pure',
        sex: 'doe',
        ageMonths: 15,
        bodyWeightKg: 31.0,
        bcs: 3.0,
        famachaScore: 3,
        lastDewormedDate: new Date(Date.now() - 110 * 86400000).toISOString().split('T')[0],
        lastFamachaDate: new Date().toISOString().split('T')[0],
        reproductiveStage: 'PREGNANT',
        breedingDate: new Date(Date.now() - 138 * 86400000).toISOString().split('T')[0],
        estimatedDueDate: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0],
        kidsBornCount: 0,
        notes: 'अंतिम तिमाही गर्भ (Late gestation), स्कोर 3 होने के कारण चयनात्मक सुरक्षित कृमिनाशक आवश्यक।'
      }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE SAFETY)
  const StorageAdapter = {
    DB_NAME: 'VetcareSmallRuminantDB',
    DB_VERSION: 1,
    STORE_NAME: 'small_ruminant_records',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[SmallRuminant] IndexedDB unavailable, using LocalStorage fallback.');
          resolve(null);
          return;
        }

        const req = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        req.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'key' });
          }
        };

        req.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        req.onerror = (event) => {
          console.error('[SmallRuminant] DB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async setItem(key, data) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put({ key: key, value: data, updatedAt: Date.now() });
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              localStorage.setItem('VETCARE_SR_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_SR_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_SR_' + key, JSON.stringify(data));
        return Promise.resolve(true);
      }
    },

    async getItem(key) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => {
              if (req.result && req.result.value) {
                resolve(req.result.value);
              } else {
                const ls = localStorage.getItem('VETCARE_SR_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_SR_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_SR_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_SR_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. SCIENTIFIC CLINICAL SCORING & TARGETED SELECTIVE TREATMENT ENGINES
  const ParasitologyEngine = {
    // Evaluates Targeted Selective Treatment (TST) recommendation for an animal
    evaluateTstRecommendation(animal) {
      const score = parseInt(animal.famachaScore, 10);
      const bcs = parseFloat(animal.bcs);
      const isPregnantOrLactating = animal.reproductiveStage === 'PREGNANT' || animal.reproductiveStage === 'LACTATING';
      const isYoung = animal.ageMonths < 8;

      if (score === 1 || score === 2) {
        return {
          shouldDeworm: false,
          category: 'REFUGIA_PRESERVED',
          badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          recommendationText: 'उपचार अनावश्यक (No Deworming Required)',
          rationale: 'रिफ्यूजियों (Refugia) संरक्षण हेतु दवा न दें। स्वस्थ लाल श्लेष्मा झिल्ली।'
        };
      }

      if (score === 3) {
        if (isPregnantOrLactating || bcs < 2.5 || isYoung) {
          return {
            shouldDeworm: true,
            category: 'CONDITIONAL_TREATMENT',
            badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            recommendationText: 'सशर्त चयनात्मक उपचार (Selective Deworming)',
            rationale: `स्कोर 3 के साथ उच्च जोखिम कारक उपस्थित: ${isPregnantOrLactating ? 'गाभिन/दुधारू' : ''} ${bcs < 2.5 ? 'कमजोर BCS (' + bcs + ')' : ''} ${isYoung ? 'अल्पवयस्क मेमना' : ''}`
          };
        }
        return {
          shouldDeworm: false,
          category: 'REFUGIA_PRESERVED',
          badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          recommendationText: 'निगरानी में रखें (Withhold Dewormer)',
          rationale: 'स्कोर 3 किंतु अच्छा शारीरिक वजन (BCS ' + bcs + ') व सामान्य अवस्था। दवा रोकी जाए।'
        };
      }

      if (score === 4) {
        return {
          shouldDeworm: true,
          category: 'MANDATORY_TREATMENT',
          badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          recommendationText: 'अनिवार्य कृमिनाशक (Mandatory Treatment)',
          rationale: 'गंभीर रक्ताल्पता (PCV 13-17%)। क्लोसेंटेल अथवा लेवामिसोल उपचार अनिवार्य है।'
        };
      }

      if (score === 5) {
        return {
          shouldDeworm: true,
          category: 'EMERGENCY_CRITICAL',
          badgeClass: 'bg-rose-600 text-white font-bold animate-pulse',
          recommendationText: 'आपातकालीन गहन चिकित्सा (Emergency Life Threat)',
          rationale: 'प्राणघातक रक्ताल्पता (PCV < 13%) व जबड़े की सूजन (Bottle Jaw)। संयुक्त उपचार दें।'
        };
      }

      return { shouldDeworm: false, category: 'UNKNOWN', badgeClass: 'bg-slate-800 text-slate-400', recommendationText: 'अनिर्धारित', rationale: '' };
    },

    // Calculates weight-adjusted drug dosage accounting for species metabolic variance (Goat vs Sheep)
    calculateExactDose(drugName, bodyWeightKg, species = 'caprine') {
      const drug = window.VetcareApp.ClinicalData.DewormingProtocols.ANTHELMINTIC_FORMULARY[drugName] ||
                   window.VetcareApp.ClinicalData.DewormingProtocols.ANTHELMINTIC_FORMULARY['Closantel (15% w/v Oral Suspension)'];

      const isGoat = species.toLowerCase() === 'caprine';
      const targetMgKg = isGoat ? drug.goatDoseMgKg : drug.sheepDoseMgKg;
      const totalMgRequired = Math.round(targetMgKg * bodyWeightKg);

      let mlDose = 0;
      if (drugName.includes('Closantel')) {
        // 15% w/v = 150 mg/ml
        mlDose = (totalMgRequired / 150).toFixed(1);
      } else if (drugName.includes('Levamisole')) {
        // 3% w/v = 30 mg/ml
        mlDose = (totalMgRequired / 30).toFixed(1);
      } else if (drugName.includes('Fenbendazole')) {
        // 2.5% w/v = 25 mg/ml
        mlDose = (totalMgRequired / 25).toFixed(1);
      } else if (drugName.includes('Ivermectin')) {
        // 0.2% w/v = 2 mg/ml
        mlDose = (totalMgRequired / 2).toFixed(1);
      } else {
        mlDose = ((bodyWeightKg / 10) * drug.mlPer10Kg).toFixed(1);
      }

      return {
        drugName: drugName,
        speciesFactorApplied: isGoat ? 'बकरी चयापचय (1.5x - 2.0x Goats Factor)' : 'भेड़ मानक खुराक (Sheep Standard)',
        targetMgKg: targetMgKg,
        totalMg: totalMgRequired,
        mlDose: Math.max(0.5, parseFloat(mlDose)),
        meatWithdrawalDays: drug.meatWithdrawalDays,
        milkWithdrawalDays: drug.milkWithdrawalDays
      };
    },

    // Computes aggregate flock KPIs & Refugia Metrics
    computeFlockSummary() {
      const animals = State.flockAnimals;
      const totalCount = animals.length;

      if (totalCount === 0) {
        return {
          totalCount: 0,
          criticalAnemicCount: 0,
          refugiaIndexPercent: 100,
          dueForDewormingCount: 0,
          lateGestationCount: 0,
          avgBcs: 0,
          caprineCount: 0,
          ovineCount: 0
        };
      }

      let criticalCount = 0; // Scores 4 & 5
      let toDewormCount = 0;
      let lateGestationCount = 0;
      let totalBcs = 0;
      let caprineCount = 0;
      let ovineCount = 0;

      animals.forEach(a => {
        totalBcs += parseFloat(a.bcs);
        if (a.species === 'caprine') caprineCount++;
        else ovineCount++;

        const score = parseInt(a.famachaScore, 10);
        if (score === 4 || score === 5) {
          criticalCount++;
        }

        const tst = ParasitologyEngine.evaluateTstRecommendation(a);
        if (tst.shouldDeworm) {
          toDewormCount++;
        }

        if (a.reproductiveStage === 'PREGNANT' && a.estimatedDueDate) {
          const daysToDue = Math.ceil((new Date(a.estimatedDueDate) - new Date()) / (1000 * 60 * 60 * 24));
          if (daysToDue <= 30 && daysToDue >= -5) {
            lateGestationCount++;
          }
        }
      });

      // Refugia Index: Percentage of flock intentionally left UNTREATED to maintain drug sensitivity
      const untreatedCount = Math.max(0, totalCount - toDewormCount);
      const refugiaIndexPercent = Math.round((untreatedCount / totalCount) * 100);
      const avgBcs = (totalBcs / totalCount).toFixed(1);

      return {
        totalCount,
        criticalAnemicCount: criticalCount,
        refugiaIndexPercent,
        dueForDewormingCount: toDewormCount,
        lateGestationCount,
        avgBcs,
        caprineCount,
        ovineCount
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[SmallRuminant ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const summary = ParasitologyEngine.computeFlockSummary();
      const refugiaColor = summary.refugiaIndexPercent >= 75 ? 'text-emerald-400' : (summary.refugiaIndexPercent >= 50 ? 'text-amber-400' : 'text-rose-400');

      return `
        <div class="small-ruminant-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP KPI RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- KPI 1: Flock Census -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">कुल झुंड गणना (Flock Census)</span>
                  <div class="text-2xl font-black font-display text-white mt-1">
                    ${summary.totalCount} <span class="text-xs font-normal text-slate-400 font-sans">पशु</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    बकरियां: <strong class="text-cyan-400">${summary.caprineCount}</strong> | भेड़ें: <strong class="text-purple-400">${summary.ovineCount}</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-sheep"></i>
                </div>
              </div>
            </div>

            <!-- KPI 2: FAMACHA Critical Anemia Alert -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">रक्ताल्पता चेतावनी (Scores 4 & 5)</span>
                  <div class="text-2xl font-black font-display ${summary.criticalAnemicCount > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'} mt-1">
                    ${summary.criticalAnemicCount} <span class="text-xs font-normal text-slate-400 font-sans">गंभीर पशु</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    ${summary.criticalAnemicCount > 0 ? 'तत्काल क्लोसेंटेल उपचार आवश्यक' : 'झुंड में सभी हीमोग्लोबिन सुरक्षित'}
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl">
                  <i class="fa-solid fa-eye-dropper"></i>
                </div>
              </div>
            </div>

            <!-- KPI 3: TST Refugia Index -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">रिफ्यूजियों सुरक्षा इंडेक्स (Refugia %)</span>
                  <div class="text-2xl font-black font-display ${refugiaColor} mt-1">
                    ${summary.refugiaIndexPercent}%
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    दवा-मुक्त पशु: <strong>${summary.totalCount - summary.dueForDewormingCount}</strong> (लक्ष्य: &gt;75%)
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-solid fa-shield-virus"></i>
                </div>
              </div>
            </div>

            <!-- KPI 4: Gestation & Kidding Due -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">ब्याने योग्य बकरियां/भेड़ें</span>
                  <div class="text-2xl font-black font-display text-amber-400 mt-1">
                    ${summary.lateGestationCount} <span class="text-xs font-normal text-slate-400 font-sans">पशु</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    औसत BCS: <strong class="text-amber-300">${summary.avgBcs}/5.0</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-baby-carriage"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="flock_census" class="sr-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'flock_census' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-list-ol"></i>
                <span>१. झुंड गणना व स्वास्थ्य पंजी</span>
              </button>
              <button type="button" data-tab="famacha_scoring_guide" class="sr-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'famacha_scoring_guide' ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-palette"></i>
                <span>२. FAMACHA© आंख म्यूकोसा चार्ट</span>
              </button>
              <button type="button" data-tab="targeted_selective_treatment" class="sr-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'targeted_selective_treatment' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-syringe"></i>
                <span>३. चयनात्मक कृमिनाशक (TST Engine)</span>
              </button>
              <button type="button" data-tab="breeding_kidding_log" class="sr-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'breeding_kidding_log' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-seedling"></i>
                <span>४. गर्भधारण व मेमना प्रसव (Kidding)</span>
              </button>
            </div>

            <!-- Action Trigger Strip -->
            <div class="flex items-center gap-2">
              <button type="button" id="btnOpenAddAnimalModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया पशु जोड़ें</span>
              </button>
              <button type="button" id="btnPrintFlockManifest" class="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                <i class="fa-solid fa-print text-amber-400"></i>
                <span>झुंड रिपोर्ट प्रिंट</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="srTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION CONTAINER -->
          <div id="srModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Flock Census & Screening Registry
    renderFlockCensusTab() {
      let animals = State.flockAnimals;

      // Filter Evaluation
      if (State.activeFilter === 'famacha_critical_4_5') {
        animals = animals.filter(a => a.famachaScore === 4 || a.famachaScore === 5);
      } else if (State.activeFilter === 'deworming_due') {
        animals = animals.filter(a => ParasitologyEngine.evaluateTstRecommendation(a).shouldDeworm);
      } else if (State.activeFilter === 'kidding_due') {
        animals = animals.filter(a => a.reproductiveStage === 'PREGNANT');
      } else if (State.activeFilter === 'low_bcs') {
        animals = animals.filter(a => a.bcs <= 2.0);
      }

      // Search Query Filter
      if (State.searchQuery.trim()) {
        const q = State.searchQuery.toLowerCase().trim();
        animals = animals.filter(a => a.tagNo.toLowerCase().includes(q) || a.breed.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
      }

      const rows = animals.map(a => {
        const famachaData = window.VetcareApp.ClinicalData.DewormingProtocols.FAMACHA_SCORING_MATRIX[a.famachaScore] || {};
        const tst = ParasitologyEngine.evaluateTstRecommendation(a);

        let speciesIcon = a.species === 'caprine' ?
          '<span class="text-cyan-400 font-bold"><i class="fa-solid fa-head-side-cough mr-1"></i>बकरी (Goat)</span>' :
          '<span class="text-purple-400 font-bold"><i class="fa-solid fa-sheep mr-1"></i>भेड़ (Sheep)</span>';

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm font-mono">${a.tagNo}</div>
              <div class="text-[11px] text-slate-400">${speciesIcon} • ${a.breed} (${a.sex === 'doe' || a.sex === 'ewe' ? 'मादा' : 'नर'})</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-slate-200">वजन: <strong class="text-white">${a.bodyWeightKg} kg</strong></div>
              <div class="text-slate-400 text-[11px]">आयु: ${a.ageMonths} माह | BCS: <strong class="text-amber-400">${a.bcs}/5.0</strong></div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full border border-slate-700 shadow-sm flex-shrink-0" style="background-color: ${famachaData.hexColor};"></span>
                <span class="font-mono font-bold text-xs text-white">स्कोर ${a.famachaScore}</span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">${famachaData.estimatedPcv || ''}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${tst.badgeClass}">
                ${tst.recommendationText}
              </span>
              <div class="text-[10px] text-slate-400 mt-1 truncate max-w-xs" title="${tst.rationale}">${tst.rationale}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-slate-200">${a.reproductiveStage}</div>
              <div class="text-[10px] text-slate-400">अंतिम कृमिनाशक: ${a.lastDewormedDate || 'अज्ञात'}</div>
            </td>
            <td class="py-3 px-4 text-right space-x-1">
              <button type="button" data-action="quick_screen" data-id="${a.id}" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 transition-colors" title="FAMACHA व खुराक जांचें">
                <i class="fa-solid fa-eye-dropper"></i> जांच
              </button>
              <button type="button" data-action="edit_animal" data-id="${a.id}" class="px-2 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="space-y-4">
          
          <!-- SEARCH & QUICK FILTER PILLS BAR -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="relative flex-1 max-w-md">
              <input type="text" id="srSearchInput" value="${State.searchQuery}" placeholder="टैग संख्या अथवा नस्ल से खोजें..." class="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono" />
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
            </div>

            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
              <button type="button" data-filter="all" class="sr-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                सभी (${State.flockAnimals.length})
              </button>
              <button type="button" data-filter="famacha_critical_4_5" class="sr-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'famacha_critical_4_5' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-rose-300 hover:bg-slate-700'}">
                गंभीर रक्ताल्पता (Scores 4&5)
              </button>
              <button type="button" data-filter="deworming_due" class="sr-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'deworming_due' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'}">
                दवा योग्य (TST Due)
              </button>
              <button type="button" data-filter="kidding_due" class="sr-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'kidding_due' ? 'bg-purple-500 text-white font-bold' : 'bg-slate-800 text-purple-300 hover:bg-slate-700'}">
                गाभिन पशु (Pregnant)
              </button>
              <button type="button" data-filter="low_bcs" class="sr-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'low_bcs' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                कमजोर (BCS &le; 2.0)
              </button>
            </div>
          </div>

          <!-- ANIMAL TABLE CARD -->
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">टैग संख्या / प्रजाति व नस्ल</th>
                    <th class="py-3 px-4">वजन / आयु / BCS</th>
                    <th class="py-3 px-4">FAMACHA© म्यूकोसा स्कोर</th>
                    <th class="py-3 px-4">TST निर्णय (Recommendation)</th>
                    <th class="py-3 px-4">प्रजनन स्थिति / अंतिम दवा</th>
                    <th class="py-3 px-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${animals.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">कोई पशु इस फिल्टर में उपलब्ध नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      `;
    },

    // TAB 2: Visual FAMACHA Color Chart & Clinical Reference
    renderFamachaGuideTab() {
      const matrix = window.VetcareApp.ClinicalData.DewormingProtocols.FAMACHA_SCORING_MATRIX;

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-palette text-rose-400"></i>
                <span>FAMACHA© नेत्र श्लेष्मा रक्ताल्पता स्कोरिंग प्रणाली (Eye Mucous Membrane Evaluation)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                भेड़-बकरियों में बारबर्स पोल वर्म (Haemonchus contortus) द्वारा रक्त चूसने के कारण उत्पन्न रक्ताल्पता का रंग-आधारित त्वरित निदान
              </p>
            </div>

            <!-- FAMACHA 5-Color Strip Grid -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
              ${Object.values(matrix).map(item => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg relative overflow-hidden">
                  <div class="h-3 w-full rounded-full" style="background-color: ${item.hexColor}; ${item.borderHex ? 'border: 1px solid ' + item.borderHex : ''}"></div>
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-black font-mono text-white">स्कोर ${item.score}</span>
                      <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">${item.estimatedPcv}</span>
                    </div>
                    <div class="text-xs font-bold text-slate-200 mt-1">${item.colorName}</div>
                    <div class="text-[11px] text-slate-400 font-mono mt-0.5">${item.clinicalStatus}</div>
                  </div>
                  <div class="pt-2 border-t border-slate-800/80">
                    <span class="text-[10px] font-mono uppercase block font-bold text-amber-400">${item.actionLabel}</span>
                    <p class="text-[11px] text-slate-300 mt-1 leading-snug">${item.treatmentProtocol}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Standard Inspection Method Guidelines -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-circle-info text-cyan-400"></i>
                <span>वैज्ञानिक परीक्षण विधि (COVER, PUSH, PULL, POP Protocol):</span>
              </div>
              <ol class="list-decimal pl-5 space-y-1 text-slate-300 leading-relaxed">
                <li><strong>COVER:</strong> ऊपरी पलक को आंख की पुतली पर हल्के से नीचे दबाएं।</li>
                <li><strong>PUSH:</strong> आंख के ऊपरी गोले पर धीरे से दबाव बनाएं ताकि निचली पलक की म्यूकोसा बाहर की ओर उभरे।</li>
                <li><strong>PULL:</strong> निचली पलक को नीचे की ओर खींचें।</li>
                <li><strong>POP:</strong> आंतरिक गुलाबी-लाल श्लेष्मा झिल्ली स्पष्ट दिखेगी। इसकी तुलना पूर्ण सूर्य के प्रकाश में FAMACHA कार्ड के रंग से करें।</li>
              </ol>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Targeted Selective Treatment (TST) Engine & Formulary
    renderTstEngineTab() {
      const summary = ParasitologyEngine.computeFlockSummary();
      const formulary = window.VetcareApp.ClinicalData.DewormingProtocols.ANTHELMINTIC_FORMULARY;

      return `
        <div class="space-y-6">
          
          <!-- Scientific Philosophy Banner -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl space-y-2">
            <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono tracking-wider">
              <i class="fa-solid fa-dna"></i>
              <span>रिफ्यूजियों परिकल्पना एवं परजीवी दवा प्रतिरोध नियंत्रण (Preserving Worm Refugia)</span>
            </div>
            <h3 class="text-base font-bold text-white">चयनात्मक उपचार रणनीति (Targeted Selective Treatment - TST)</h3>
            <p class="text-xs text-slate-300 max-w-3xl leading-relaxed">
              पूरे झुंड को एक साथ कीड़ा दवा देने से दवा-प्रतिरोधी (Drug Resistant) कीड़े चारागाह पर हावी हो जाते हैं। TST रणनीति के तहत केवल अस्वस्थ व रक्ताल्पता वाले 20-25% पशुओं को ही दवा दी जाती है, जिससे 75-80% संवेदनशील कीड़ों की नस्ल (Refugia) चारागाह पर जीवित रहती है और दवा की प्रभावशीलता दशकों तक बनी रहती है।
            </p>
          </div>

          <!-- Anthelmintic Formulary Cards -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-flask-vial text-cyan-400"></i>
              <span>लघु जुगाली पशु कृमिनाशक फॉर्मूलरी एवं बकरियों हेतु खुराक संशोधन</span>
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${Object.entries(formulary).map(([drugName, d]) => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 shadow-md">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xs font-bold text-amber-300">${drugName}</h5>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${d.route}</span>
                  </div>
                  <div class="text-[11px] text-slate-300">
                    <strong class="text-slate-400">लक्षित परजीवी:</strong> ${d.targetParasite}
                  </div>
                  <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span class="text-slate-400 text-[10px] block">भेड़ खुराक (Sheep):</span>
                      <span class="text-white font-bold">${d.sheepDoseMgKg} mg/kg</span>
                    </div>
                    <div>
                      <span class="text-cyan-400 text-[10px] block font-bold">बकरी खुराक (Goat 1.5x-2x):</span>
                      <span class="text-cyan-300 font-bold">${d.goatDoseMgKg} mg/kg</span>
                    </div>
                  </div>
                  <div class="text-[11px] text-slate-400 leading-snug">
                    <strong class="text-emerald-400">विशेष नोट:</strong> ${d.notes}
                  </div>
                  <div class="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                    निकासी काल (Withdrawal): मांस ${d.meatWithdrawalDays} दिन | दूध ${d.milkWithdrawalDays} दिन
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      `;
    },

    // TAB 4: Lambing / Kidding Registry & Gestation Tracker
    renderBreedingKiddingTab() {
      const pregnantAnimals = State.flockAnimals.filter(a => a.reproductiveStage === 'PREGNANT');

      const rows = pregnantAnimals.map(a => {
        const daysToDue = a.estimatedDueDate ? Math.ceil((new Date(a.estimatedDueDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;
        let urgencyBadge = '';
        if (daysToDue <= 7 && daysToDue >= 0) {
          urgencyBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">अति-आसन्न प्रसव (&le;7 दिन)</span>';
        } else if (daysToDue <= 21) {
          urgencyBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">3 सप्ताह शेष</span>';
        } else {
          urgencyBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">मध्यम गर्भकाल</span>';
        }

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm font-mono">${a.tagNo}</div>
              <div class="text-[11px] text-slate-400">${a.species === 'caprine' ? 'बकरी' : 'भेड़'} • ${a.breed}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-slate-200">गर्भधान तिथि: ${a.breedingDate || 'दर्ज नहीं'}</div>
              <div class="text-cyan-400 font-bold">अनुमानित प्रसव: ${a.estimatedDueDate || 'N/A'}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-amber-400 font-bold">${daysToDue > 0 ? daysToDue + ' दिन शेष' : 'प्रसव समय पूर्ण'}</div>
              <div class="mt-1">${urgencyBadge}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs text-slate-300">
              <div>पूर्व प्रसव बच्चे: ${a.kidsBornCount} मेमने</div>
              <div class="text-[10px] text-slate-400">BCS: ${a.bcs}/5.0 | FAMACHA: ${a.famachaScore}</div>
            </td>
            <td class="py-3 px-4 text-right">
              <button type="button" data-action="log_birth" data-id="${a.id}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-colors">
                <i class="fa-solid fa-baby mr-1"></i> प्रसव दर्ज करें
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-seedling text-purple-400"></i>
                  <span>गर्भधारण निगरानी एवं मेमना प्रसव पंजी (Gestation 150 Days Tracker)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">बकरी/भेड़ का औसत गर्भकाल 145-155 दिन। प्रसव पूर्व खीस (Colostrum) व टीटनेस प्रबंधन</p>
              </div>
              <span class="text-xs font-mono text-purple-400 font-bold">${pregnantAnimals.length} गाभिन पशु दर्ज</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">टैग संख्या / नस्ल</th>
                    <th class="py-3 px-4">गर्भधान व अपेक्षित प्रसव</th>
                    <th class="py-3 px-4">शेष दिन (Days to Due)</th>
                    <th class="py-3 px-4">इतिहास व स्वास्थ्य</th>
                    <th class="py-3 px-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${pregnantAnimals.length > 0 ? rows : '<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-mono">वर्तमान में कोई पशु गाभिन दर्ज नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }
  };

  // 7. MODAL DIALOGS ENGINE (FAST TOUCH SCREENING CONSOLE & DOSE CALCULATOR)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('srModalContainer');
      if (container) container.innerHTML = '';
    },

    // Fast Touch Screening Console (FAMACHA + BCS + Live Drug Calculation)
    openScreeningModal(animalId) {
      const animal = State.flockAnimals.find(a => a.id === animalId);
      if (!animal) return;

      const container = document.getElementById('srModalContainer');
      if (!container) return;

      const calcDose = ParasitologyEngine.calculateExactDose('Closantel (15% w/v Oral Suspension)', animal.bodyWeightKg, animal.species);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <i class="fa-solid fa-eye-dropper"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">त्वरित पशु स्वास्थ्य एवं FAMACHA© जांच</h3>
                  <div class="text-[10px] font-mono text-cyan-400">${animal.tagNo} (${animal.species === 'caprine' ? 'बकरी' : 'भेड़'} • ${animal.breed})</div>
                </div>
              </div>
              <button type="button" id="btnModalCloseScreen" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formScreenAnimal" class="space-y-4">
              
              <!-- FAMACHA 5-Score Picker -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-2">नेत्र श्लेष्मा स्कोर (FAMACHA Grade 1 to 5)*</label>
                <div class="grid grid-cols-5 gap-2">
                  ${[1, 2, 3, 4, 5].map(s => {
                    const item = window.VetcareApp.ClinicalData.DewormingProtocols.FAMACHA_SCORING_MATRIX[s];
                    const isSelected = animal.famachaScore === s;
                    return `
                      <label class="cursor-pointer">
                        <input type="radio" name="m_famacha" value="${s}" ${isSelected ? 'checked' : ''} class="sr-only famacha-radio-input" />
                        <div class="p-2.5 rounded-xl border text-center transition-all ${isSelected ? 'border-cyan-400 bg-slate-800 ring-2 ring-cyan-500/50' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}">
                          <div class="w-6 h-6 rounded-full mx-auto shadow-sm mb-1" style="background-color: ${item.hexColor}; ${item.borderHex ? 'border: 1px solid ' + item.borderHex : ''}"></div>
                          <span class="text-xs font-bold font-mono text-white block">ग्रेड ${s}</span>
                        </div>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Body Weight & BCS Slider -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शारीरिक वजन (Weight in Kg)*</label>
                  <input type="number" step="0.5" id="m_weight" value="${animal.bodyWeightKg}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शारीरिक स्वास्थ्य स्कोर (BCS 1-5)*</label>
                  <select id="m_bcs" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="1.0" ${animal.bcs === 1.0 ? 'selected' : ''}>1.0 - अत्यधिक दुर्बल (Emaciated)</option>
                    <option value="1.5" ${animal.bcs === 1.5 ? 'selected' : ''}>1.5 - कमजोर (Very Thin)</option>
                    <option value="2.0" ${animal.bcs === 2.0 ? 'selected' : ''}>2.0 - पतला (Thin)</option>
                    <option value="2.5" ${animal.bcs === 2.5 ? 'selected' : ''}>2.5 - मध्यम-कम (Fair)</option>
                    <option value="3.0" ${animal.bcs === 3.0 ? 'selected' : ''}>3.0 - इष्टतम / आदर्श (Ideal)</option>
                    <option value="3.5" ${animal.bcs === 3.5 ? 'selected' : ''}>3.5 - हृष्ट-पुष्ट (Good)</option>
                    <option value="4.0" ${animal.bcs === 4.0 ? 'selected' : ''}>4.0 - स्थूल (Fat)</option>
                    <option value="5.0" ${animal.bcs === 5.0 ? 'selected' : ''}>5.0 - अत्यधिक मोटा (Obese)</option>
                  </select>
                </div>
              </div>

              <!-- Drug Selection & Live Dose Output -->
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono uppercase text-cyan-400 font-bold">अनुशंसित कृमिनाशक खुराक गणना:</span>
                  <span class="text-[10px] font-mono text-slate-400">${calcDose.speciesFactorApplied}</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">कृमिनाशक औषधि चुनें</label>
                    <select id="m_drugSelect" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white">
                      <option value="Closantel (15% w/v Oral Suspension)" selected>Closantel 15% (10 mg/kg)</option>
                      <option value="Levamisole HCl (3% w/v)">Levamisole 3% (12 mg/kg Goats)</option>
                      <option value="Fenbendazole (2.5% Micronized Suspension)">Fenbendazole 2.5% (10 mg/kg Goats)</option>
                      <option value="Ivermectin (0.2% Oral Liquid)">Ivermectin 0.2% (0.4 mg/kg Goats)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">सटीक तरल खुराक (Dose in mL)</label>
                    <div id="liveDoseDisplay" class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm font-mono font-black text-emerald-400">
                      ${calcDose.mlDose} mL <span class="text-[11px] font-normal text-slate-400">(${calcDose.totalMg} mg)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नैदानिक टिप्पणी व लक्षण (Clinical Observations)</label>
                <textarea id="m_notes" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">${animal.notes || ''}</textarea>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelScreenModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">जांच परिणाम सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseScreen').onclick = ModalController.closeModal;
      document.getElementById('btnCancelScreenModal').onclick = ModalController.closeModal;

      // Dynamic Dose Recalculation on Drug or Weight Change
      const updateLiveDose = () => {
        const drug = document.getElementById('m_drugSelect')?.value;
        const wt = parseFloat(document.getElementById('m_weight')?.value) || animal.bodyWeightKg;
        const display = document.getElementById('liveDoseDisplay');
        if (drug && display) {
          const res = ParasitologyEngine.calculateExactDose(drug, wt, animal.species);
          display.innerHTML = `${res.mlDose} mL <span class="text-[11px] font-normal text-slate-400">(${res.totalMg} mg)</span>`;
        }
      };

      document.getElementById('m_drugSelect')?.addEventListener('change', updateLiveDose);
      document.getElementById('m_weight')?.addEventListener('input', updateLiveDose);

      document.getElementById('formScreenAnimal').onsubmit = async (e) => {
        e.preventDefault();
        const selectedFamacha = parseInt(document.querySelector('input[name="m_famacha"]:checked')?.value || animal.famachaScore, 10);
        const weightVal = parseFloat(document.getElementById('m_weight').value);
        const bcsVal = parseFloat(document.getElementById('m_bcs').value);
        const notesVal = document.getElementById('m_notes').value.trim();

        animal.famachaScore = selectedFamacha;
        animal.bodyWeightKg = weightVal;
        animal.bcs = bcsVal;
        animal.lastFamachaDate = new Date().toISOString().split('T')[0];
        animal.notes = notesVal;

        const tst = ParasitologyEngine.evaluateTstRecommendation(animal);
        if (tst.shouldDeworm) {
          animal.lastDewormedDate = new Date().toISOString().split('T')[0];
        }

        await StorageAdapter.setItem('flockAnimals', State.flockAnimals);
        ModalController.closeModal();
        notify(`पशु ${animal.tagNo} का FAMACHA स्कोर (${selectedFamacha}) सफलतापूर्वक अद्यतन किया गया।`, 'success');
        window.VetcareApp.Modules.SmallRuminantFlockManager.refreshView();
      };
    },

    // New Animal Registration Modal
    openAddAnimalModal(editId = null) {
      const container = document.getElementById('srModalContainer');
      if (!container) return;

      let animal = {
        id: 'SR-' + Date.now().toString().slice(-4),
        tagNo: 'IN-RJ-2026-' + Math.floor(1000 + Math.random() * 9000),
        species: 'caprine',
        breed: 'Sirohi Pure',
        sex: 'doe',
        ageMonths: 18,
        bodyWeightKg: 35.0,
        bcs: 3.0,
        famachaScore: 2,
        lastDewormedDate: new Date().toISOString().split('T')[0],
        reproductiveStage: 'OPEN',
        breedingDate: '',
        estimatedDueDate: '',
        kidsBornCount: 0,
        notes: ''
      };

      if (editId) {
        const found = State.flockAnimals.find(a => a.id === editId);
        if (found) animal = JSON.parse(JSON.stringify(found));
      }

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 class="font-display font-bold text-base text-white">${editId ? 'पशु विवरण संपादित करें' : 'नया भेड़/बकरी पशु पंजीकृत करें'}</h3>
              <button type="button" id="btnModalCloseAdd" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddAnimal" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कान का टैग नंबर (Ear Tag)*</label>
                <input type="text" id="sr_tag" value="${animal.tagNo}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजाति (Species)*</label>
                  <select id="sr_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="caprine" ${animal.species === 'caprine' ? 'selected' : ''}>बकरी (Caprine / Goat)</option>
                    <option value="ovine" ${animal.species === 'ovine' ? 'selected' : ''}>भेड़ (Ovine / Sheep)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लिंग (Sex)*</label>
                  <select id="sr_sex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="doe" ${animal.sex === 'doe' ? 'selected' : ''}>मादा बकरी (Doe)</option>
                    <option value="buck" ${animal.sex === 'buck' ? 'selected' : ''}>नर बकरा (Buck)</option>
                    <option value="ewe" ${animal.sex === 'ewe' ? 'selected' : ''}>मादा भेड़ (Ewe)</option>
                    <option value="ram" ${animal.sex === 'ram' ? 'selected' : ''}>नर मेंढा (Ram)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नस्ल (Breed)*</label>
                  <input type="text" id="sr_breed" value="${animal.breed}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आयु (Months)*</label>
                  <input type="number" id="sr_age" value="${animal.ageMonths}" min="1" max="150" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वजन (Kg)*</label>
                  <input type="number" step="0.5" id="sr_weight" value="${animal.bodyWeightKg}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजनन अवस्था*</label>
                  <select id="sr_repro" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="OPEN" ${animal.reproductiveStage === 'OPEN' ? 'selected' : ''}>खाली (Open)</option>
                    <option value="PREGNANT" ${animal.reproductiveStage === 'PREGNANT' ? 'selected' : ''}>गाभिन (Pregnant)</option>
                    <option value="LACTATING" ${animal.reproductiveStage === 'LACTATING' ? 'selected' : ''}>दूध दे रही (Lactating)</option>
                  </select>
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelAddModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">पशु सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseAdd').onclick = ModalController.closeModal;
      document.getElementById('btnCancelAddModal').onclick = ModalController.closeModal;

      document.getElementById('formAddAnimal').onsubmit = async (e) => {
        e.preventDefault();
        const tag = document.getElementById('sr_tag').value.trim();
        const species = document.getElementById('sr_species').value;
        const sex = document.getElementById('sr_sex').value;
        const breed = document.getElementById('sr_breed').value.trim();
        const age = parseInt(document.getElementById('sr_age').value, 10);
        const weight = parseFloat(document.getElementById('sr_weight').value);
        const repro = document.getElementById('sr_repro').value;

        const updated = {
          id: animal.id,
          tagNo: tag,
          species: species,
          sex: sex,
          breed: breed,
          ageMonths: age,
          bodyWeightKg: weight,
          bcs: animal.bcs || 3.0,
          famachaScore: animal.famachaScore || 2,
          lastDewormedDate: animal.lastDewormedDate || '',
          lastFamachaDate: new Date().toISOString().split('T')[0],
          reproductiveStage: repro,
          breedingDate: repro === 'PREGNANT' ? (animal.breedingDate || new Date().toISOString().split('T')[0]) : '',
          estimatedDueDate: repro === 'PREGNANT' ? (animal.estimatedDueDate || new Date(Date.now() + 150 * 86400000).toISOString().split('T')[0]) : '',
          kidsBornCount: animal.kidsBornCount || 0,
          notes: animal.notes || ''
        };

        const existingIdx = State.flockAnimals.findIndex(a => a.id === animal.id);
        if (existingIdx >= 0) {
          State.flockAnimals[existingIdx] = updated;
        } else {
          State.flockAnimals.unshift(updated);
        }

        await StorageAdapter.setItem('flockAnimals', State.flockAnimals);
        ModalController.closeModal();
        notify(`पशु ${tag} सफलतापूर्वक सुरक्षित हुआ।`, 'success');
        window.VetcareApp.Modules.SmallRuminantFlockManager.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', async (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.sr-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.SmallRuminantFlockManager.refreshView();
        }
        return;
      }

      // 2. Filter Pills Clicks
      const filterBtn = e.target.closest('.sr-filter-btn');
      if (filterBtn) {
        State.activeFilter = filterBtn.getAttribute('data-filter');
        window.VetcareApp.Modules.SmallRuminantFlockManager.refreshView();
        return;
      }

      // 3. Open Add Animal Modal
      if (e.target.closest('#btnOpenAddAnimalModal')) {
        ModalController.openAddAnimalModal();
        return;
      }

      // 4. Print Manifest
      if (e.target.closest('#btnPrintFlockManifest')) {
        window.VetcareApp.Modules.SmallRuminantFlockManager.exportFlockHealthReport();
        return;
      }

      // 5. Quick Screen Action
      const screenBtn = e.target.closest('button[data-action="quick_screen"]');
      if (screenBtn) {
        const aId = screenBtn.getAttribute('data-id');
        ModalController.openScreeningModal(aId);
        return;
      }

      // 6. Edit Animal Action
      const editBtn = e.target.closest('button[data-action="edit_animal"]');
      if (editBtn) {
        const aId = editBtn.getAttribute('data-id');
        ModalController.openAddAnimalModal(aId);
        return;
      }

      // 7. Log Birth Action
      const birthBtn = e.target.closest('button[data-action="log_birth"]');
      if (birthBtn) {
        const aId = birthBtn.getAttribute('data-id');
        const animal = State.flockAnimals.find(a => a.id === aId);
        if (animal) {
          const count = prompt(`पशु ${animal.tagNo} ने कितने मेमनों को जन्म दिया? (1, 2, 3)`, '2');
          if (count !== null) {
            animal.kidsBornCount += parseInt(count, 10) || 1;
            animal.reproductiveStage = 'LACTATING';
            animal.breedingDate = '';
            animal.estimatedDueDate = '';
            await StorageAdapter.setItem('flockAnimals', State.flockAnimals);
            notify(`प्रसव दर्ज हुआ: ${count} नवजात मेमने! खीस (Colostrum) 2 घंटे में अवश्य पिलाएं।`, 'success');
            window.VetcareApp.Modules.SmallRuminantFlockManager.refreshView();
          }
        }
        return;
      }
    });

    // Search Query Real-time Input
    container.addEventListener('input', (e) => {
      if (e.target.id === 'srSearchInput') {
        State.searchQuery = e.target.value;
        const panel = State.containerElement.querySelector('#srTabContentPanel');
        if (panel && State.activeTab === 'flock_census') {
          panel.innerHTML = UIEngine.renderFlockCensusTab();
        }
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.SmallRuminantFlockManager = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedAnimals = await StorageAdapter.getItem('flockAnimals');
        State.flockAnimals = Array.isArray(savedAnimals) && savedAnimals.length > 0 ? savedAnimals : State.seedData;

        console.log('[SmallRuminant] Module initialized with', State.flockAnimals.length, 'head of sheep/goats.');
      } catch (err) {
        console.error('[SmallRuminant] Init failed:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[SmallRuminant] Container ${containerId} not found.`);
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
      const contentPanel = State.containerElement.querySelector('#srTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'flock_census') {
        contentPanel.innerHTML = UIEngine.renderFlockCensusTab();
      } else if (State.activeTab === 'famacha_scoring_guide') {
        contentPanel.innerHTML = UIEngine.renderFamachaGuideTab();
      } else if (State.activeTab === 'targeted_selective_treatment') {
        contentPanel.innerHTML = UIEngine.renderTstEngineTab();
      } else if (State.activeTab === 'breeding_kidding_log') {
        contentPanel.innerHTML = UIEngine.renderBreedingKiddingTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[SmallRuminant] Module destroyed cleanly.');
    },

    // Official Flock Health Manifest & Deworming Audit Report
    exportFlockHealthReport() {
      const summary = ParasitologyEngine.computeFlockSummary();
      const animals = State.flockAnimals;

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const reportHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Small Ruminant Health & TST Manifest - Vetcare AI OS</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 15px; font-size: 11px; }
            .header { text-align: center; border-bottom: 3px double #0f766e; padding-bottom: 8px; margin-bottom: 12px; }
            .crest { font-size: 20px; font-weight: 900; color: #0f766e; }
            .subcrest { font-size: 10px; text-transform: uppercase; color: #555; font-weight: bold; }
            .title { font-size: 14px; font-weight: bold; margin-top: 5px; text-decoration: underline; color: #0d9488; }
            .kpi-row { display: flex; justify-content: space-between; background: #f0fdfa; border: 1px solid #ccfbf1; padding: 10px; border-radius: 6px; margin-bottom: 12px; }
            .kpi-box { text-align: center; }
            .kpi-box .val { font-size: 16px; font-weight: bold; color: #115e59; }
            .kpi-box .lbl { font-size: 9px; color: #0d9488; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #cbd5e1; padding: 5px 7px; font-size: 10px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 45px; }
            .sign-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">VETCARE AI OS • NATIONAL SMALL RUMINANT INFORMATICS NETWORK</div>
            <div class="subcrest">Pastoralist Parasitology Control & Targeted Selective Treatment (TST) Audit (2026 Core)</div>
            <div class="title">भेड़-बकरी झुंड स्वास्थ्य, FAMACHA© स्कोरिंग एवं कृमिनाशक उपचार मेनिफेस्ट</div>
          </div>

          <div class="kpi-row">
            <div class="kpi-box">
              <div class="val">${summary.totalCount}</div>
              <div class="lbl">कुल पशु गणना</div>
            </div>
            <div class="kpi-box">
              <div class="val" style="color: #b91c1c;">${summary.criticalAnemicCount}</div>
              <div class="lbl">गंभीर रक्ताल्पता (Scores 4&5)</div>
            </div>
            <div class="kpi-box">
              <div class="val">${summary.refugiaIndexPercent}%</div>
              <div class="lbl">रिफ्यूजियों इंडेक्स (दवा-मुक्त)</div>
            </div>
            <div class="kpi-box">
              <div class="val">${summary.dueForDewormingCount}</div>
              <div class="lbl">दवा प्राप्त करने वाले पशु</div>
            </div>
            <div class="kpi-box">
              <div class="val">${summary.lateGestationCount}</div>
              <div class="lbl">प्रसव आसन्न गाभिन पशु</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>टैग सं.</th>
                <th>प्रजाति / नस्ल</th>
                <th>लिंग / आयु</th>
                <th>वजन (kg)</th>
                <th>BCS (1-5)</th>
                <th>FAMACHA©</th>
                <th>TST उपचार निर्णय</th>
                <th>अनुशंसित औषधि एवं खुराक</th>
              </tr>
            </thead>
            <tbody>
              ${animals.map(a => {
                const tst = ParasitologyEngine.evaluateTstRecommendation(a);
                const dose = ParasitologyEngine.calculateExactDose('Closantel (15% w/v Oral Suspension)', a.bodyWeightKg, a.species);
                return `
                  <tr>
                    <td><strong>${a.tagNo}</strong></td>
                    <td>${a.species === 'caprine' ? 'बकरी' : 'भेड़'} (${a.breed})</td>
                    <td>${a.sex} • ${a.ageMonths}m</td>
                    <td>${a.bodyWeightKg}</td>
                    <td>${a.bcs}</td>
                    <td><strong>ग्रेड ${a.famachaScore}</strong></td>
                    <td>${tst.recommendationText}</td>
                    <td>${tst.shouldDeworm ? `Closantel: ${dose.mlDose} ml (${dose.totalMg}mg)` : 'दवा न दें (Refugia)'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="footer-sign">
            <div class="sign-box">
              हस्ताक्षर पशुपालक / फार्म प्रभारी<br />
              (Small Ruminant Farm Manager)
            </div>
            <div class="sign-box">
              पशु चिकित्सा विशेषज्ञ / वी.ओ.<br />
              (Registered Veterinary Officer)
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(reportHtml);
      printWindow.document.close();
    }
  };

})(window, document);
