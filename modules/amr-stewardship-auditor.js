// Vetcare AI OS - Veterinary Antimicrobial Stewardship (AMSP), WHO AWaRe Audit & AMR Surveillance Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // WHO & WOAH (World Organisation for Animal Health) Antimicrobial Standards Database
  window.VetcareApp.ClinicalData.AntimicrobialStewardship = {
    AWARE_CATEGORIES: {
      ACCESS: {
        category: 'ACCESS',
        label: 'एक्सेस समूह (First-Line Access)',
        color: '#10b981', // emerald-500
        targetPercentMin: 60,
        description: 'व्यापक स्पेक्ट्रम, न्यूनतम प्रतिरोध जोखिम वाली प्रथम पंक्ति की सुरक्षित औषधियां। न्यूनतम 60% उपयोग अनिवार्य।'
      },
      WATCH: {
        category: 'WATCH',
        label: 'वॉच समूह (Restricted Watch)',
        color: '#f59e0b', // amber-500
        targetPercentMax: 30,
        description: 'उच्च प्रतिरोध क्षमता वाले एंटीबायोटिक्स। केवल प्रयोगशाला संवेदनशीलता (C&S) जांच उपरांत ही प्रयोग करें।'
      },
      RESERVE: {
        category: 'RESERVE',
        label: 'रिजर्व समूह (Prohibited Reserve)',
        color: '#ef4444', // red-500
        targetPercentMax: 0,
        description: 'मानव स्वास्थ्य हेतु अंतिम रक्षा पंक्ति (Last-Resort)। पशु चिकित्सा में सामान्य प्रयोग पूर्णतः प्रतिबंधित।'
      }
    },

    ANTIBIOTIC_DIRECTORY: {
      'Amoxicillin': { category: 'ACCESS', isHpcIa: false, class: 'Aminopenicillin', route: 'Oral/Injectable', standardDurationDays: 5, defaultWithdrawal: { milk: 3, meat: 14 } },
      'Ampicillin': { category: 'ACCESS', isHpcIa: false, class: 'Aminopenicillin', route: 'Injectable', standardDurationDays: 5, defaultWithdrawal: { milk: 3, meat: 10 } },
      'Benzylpenicillin (Procaine Penicillin)': { category: 'ACCESS', isHpcIa: false, class: 'Natural Penicillin', route: 'IM', standardDurationDays: 5, defaultWithdrawal: { milk: 4, meat: 14 } },
      'Oxytetracycline': { category: 'ACCESS', isHpcIa: false, class: 'Tetracycline', route: 'IM/IV', standardDurationDays: 4, defaultWithdrawal: { milk: 5, meat: 21 } },
      'Gentamicin': { category: 'ACCESS', isHpcIa: false, class: 'Aminoglycoside', route: 'IV/IM', standardDurationDays: 5, defaultWithdrawal: { milk: 7, meat: 35 } },
      'Trimethoprim-Sulfadiazine (TMP-SMX)': { category: 'ACCESS', isHpcIa: false, class: 'Potentiated Sulfonamide', route: 'Oral/Injectable', standardDurationDays: 5, defaultWithdrawal: { milk: 4, meat: 14 } },
      'Cloxacillin': { category: 'ACCESS', isHpcIa: false, class: 'Penicillinase-resistant Penicillin', route: 'Intramammary', standardDurationDays: 3, defaultWithdrawal: { milk: 3, meat: 7 } },
      
      'Ceftiofur (3rd Gen Cephalosporin)': { category: 'WATCH', isHpcIa: true, class: '3rd Gen Cephalosporin', route: 'IM/SC', standardDurationDays: 5, defaultWithdrawal: { milk: 0, meat: 4 } },
      'Enrofloxacin': { category: 'WATCH', isHpcIa: true, class: 'Fluoroquinolone', route: 'IM/SC/Oral', standardDurationDays: 4, defaultWithdrawal: { milk: 4, meat: 14 } },
      'Marbofloxacin': { category: 'WATCH', isHpcIa: true, class: 'Fluoroquinolone', route: 'SC/IV', standardDurationDays: 3, defaultWithdrawal: { milk: 2, meat: 6 } },
      'Ciprofloxacin': { category: 'WATCH', isHpcIa: true, class: 'Fluoroquinolone', route: 'Oral/IV', standardDurationDays: 5, defaultWithdrawal: { milk: 7, meat: 21 } },
      'Amikacin': { category: 'WATCH', isHpcIa: false, class: 'Aminoglycoside', route: 'IV/IM', standardDurationDays: 5, defaultWithdrawal: { milk: 7, meat: 30 } },
      'Tilmicosin': { category: 'WATCH', isHpcIa: false, class: 'Macrolide', route: 'SC (Bovine only)', standardDurationDays: 1, defaultWithdrawal: { milk: 36, meat: 28 } },

      'Colistin (Polymyxin E)': { category: 'RESERVE', isHpcIa: true, class: 'Polymyxin', route: 'Oral/IM', standardDurationDays: 3, defaultWithdrawal: { milk: 7, meat: 28 } },
      'Cefquinome (4th Gen Cephalosporin)': { category: 'RESERVE', isHpcIa: true, class: '4th Gen Cephalosporin', route: 'IM/Intramammary', standardDurationDays: 3, defaultWithdrawal: { milk: 1, meat: 5 } },
      'Meropenem': { category: 'RESERVE', isHpcIa: true, class: 'Carbapenem', route: 'IV', standardDurationDays: 5, defaultWithdrawal: { milk: 60, meat: 60 } },
      'Vancomycin': { category: 'RESERVE', isHpcIa: true, class: 'Glycopeptide', route: 'IV', standardDurationDays: 7, defaultWithdrawal: { milk: 90, meat: 90 } }
    },

    HOSPITAL_ANTIBIOGRAM: [
      { pathogen: 'Staphylococcus aureus', source: 'Mastitis / Abscess', isolatesTested: 142, susceptibility: { 'Amoxicillin': 48, 'Oxytetracycline': 56, 'Gentamicin': 88, 'Enrofloxacin': 76, 'Ceftiofur': 92, 'Amikacin': 96 } },
      { pathogen: 'Streptococcus uberis', source: 'Environmental Mastitis', isolatesTested: 98, susceptibility: { 'Amoxicillin': 94, 'Oxytetracycline': 64, 'Gentamicin': 72, 'Enrofloxacin': 81, 'Ceftiofur': 96, 'Amikacin': 89 } },
      { pathogen: 'Escherichia coli (O157/ETEC)', source: 'Calf Scours / Colibacillosis', isolatesTested: 215, susceptibility: { 'Amoxicillin': 32, 'Oxytetracycline': 38, 'Gentamicin': 84, 'Enrofloxacin': 68, 'Ceftiofur': 86, 'Amikacin': 95 } },
      { pathogen: 'Pasteurella multocida (B:2)', source: 'Haemorrhagic Septicaemia (HS)', isolatesTested: 84, susceptibility: { 'Amoxicillin': 89, 'Oxytetracycline': 82, 'Gentamicin': 79, 'Enrofloxacin': 91, 'Ceftiofur': 98, 'Amikacin': 94 } },
      { pathogen: 'Pseudomonas aeruginosa', source: 'Otitis / Wound Sepsis', isolatesTested: 56, susceptibility: { 'Amoxicillin': 12, 'Oxytetracycline': 18, 'Gentamicin': 74, 'Enrofloxacin': 58, 'Ceftiofur': 42, 'Amikacin': 91 } }
    ]
  };

  // 2. INTERNAL STATE MANAGEMENT
  const State = {
    activeTab: 'amsp_dashboard',
    activeFilter: 'all',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    prescriptionsAuditLog: [],
    hospitalBenchmark: {
      accessPercent: 0,
      watchPercent: 0,
      reservePercent: 0,
      targetAccessPercent: 60,
      stewardshipIndexScore: 0
    },

    // Seed Data Setup (Hydrated if storage is empty)
    seedData: [
      {
        auditId: 'AUDIT-2026-001',
        rxId: 'RX-8812',
        date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
        vetName: 'Dr. Suresh Kumar',
        animalTag: 'IN-HR-2026-9041',
        species: 'Bovine',
        diagnosis: 'Acute Clinical Mastitis (Swollen Left Quarter)',
        antibioticPrescribed: 'Ceftiofur (3rd Gen Cephalosporin)',
        awareCategory: 'WATCH',
        isHpcIa: true,
        cultureSensitivityConducted: false,
        durationDays: 5,
        complianceScore: 55,
        flaggedIssues: [
          'HPCIA (3rd Gen Cephalosporin) बिना कल्चर संवेदनशीलता (C&S) जांच के सीधे प्रथम पंक्ति में प्रयुक्त।',
          'एक्सेस समूह (जैसे Amoxicillin-Sulbactam / Cloxacillin) का पूर्व परीक्षण नहीं किया गया।'
        ],
        recommendedAlternatives: ['Amoxicillin + Cloxacillin Intramammary', 'Send Milk Sample for Antibiogram'],
        withdrawalDays: { milk: 0, meat: 4 }
      },
      {
        auditId: 'AUDIT-2026-002',
        rxId: 'RX-8813',
        date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
        vetName: 'Dr. Rahul Sharma',
        animalTag: 'IN-HR-2026-1102',
        species: 'Bovine',
        diagnosis: 'Bronchopneumonia / Shipping Fever',
        antibioticPrescribed: 'Oxytetracycline',
        awareCategory: 'ACCESS',
        isHpcIa: false,
        cultureSensitivityConducted: false,
        durationDays: 4,
        complianceScore: 95,
        flaggedIssues: [],
        recommendedAlternatives: ['Compliant Access First-Line Choice'],
        withdrawalDays: { milk: 5, meat: 21 }
      },
      {
        auditId: 'AUDIT-2026-003',
        rxId: 'RX-8814',
        date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
        vetName: 'Dr. Neha Verma',
        animalTag: 'PET-DL-2026-441',
        species: 'Canine',
        diagnosis: 'Deep Pyoderma & Interdigital Furunculosis',
        antibioticPrescribed: 'Amoxicillin',
        awareCategory: 'ACCESS',
        isHpcIa: false,
        cultureSensitivityConducted: true,
        durationDays: 14,
        complianceScore: 90,
        flaggedIssues: ['गंभीर पायोडर्मा में 14 दिन की लंबी अवधि स्वीकार्य, पर 7 दिन पर क्लिनिकल समीक्षा आवश्यक।'],
        recommendedAlternatives: ['Continue Amoxicillin-Clavulanic as guided by C&S'],
        withdrawalDays: { milk: 0, meat: 0 }
      },
      {
        auditId: 'AUDIT-2026-004',
        rxId: 'RX-8815',
        date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
        vetName: 'Dr. Anil Mehta',
        animalTag: 'CAP-RJ-2026-778',
        species: 'Caprine',
        diagnosis: 'Severe Colibacillosis / Diarrhea Outbreak',
        antibioticPrescribed: 'Colistin (Polymyxin E)',
        awareCategory: 'RESERVE',
        isHpcIa: true,
        cultureSensitivityConducted: false,
        durationDays: 3,
        complianceScore: 35,
        flaggedIssues: [
          'गंभीर विधिक चेतावनी: Colistin एक रिजर्व (Last-Resort) मानव-प्राथमिकता एंटीबायोटिक है।',
          'बिना मल्टी-ड्रग रेजिस्टेंस (MDR) लैब प्रमाण के इसका प्रयोग पशु चिकित्सा में प्रतिबंधित है।'
        ],
        recommendedAlternatives: ['Gentamicin Oral/Injectable', 'Trimethoprim-Sulfa (ACCESS)'],
        withdrawalDays: { milk: 7, meat: 28 }
      },
      {
        auditId: 'AUDIT-2026-005',
        rxId: 'RX-8816',
        date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        vetName: 'Dr. Rahul Sharma',
        animalTag: 'IN-HR-2026-9082',
        species: 'Bovine',
        diagnosis: 'Acute Metritis post-dystocia',
        antibioticPrescribed: 'Enrofloxacin',
        awareCategory: 'WATCH',
        isHpcIa: true,
        cultureSensitivityConducted: false,
        durationDays: 4,
        complianceScore: 65,
        flaggedIssues: [
          'फ्लोरोक्विनोलोन (Enrofloxacin) का बिना सीवियर एंडोमेट्रियल बायोप्सी / कल्चर के प्रयोग।'
        ],
        recommendedAlternatives: ['Procaine Penicillin + Streptomycin', 'Oxytetracycline (ACCESS)'],
        withdrawalDays: { milk: 4, meat: 14 }
      }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE SAFETY)
  const StorageAdapter = {
    DB_NAME: 'VetcareAmspDB',
    DB_VERSION: 1,
    STORE_NAME: 'amr_stewardship_audits',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[AmspAuditor] IndexedDB not available, reverting to LocalStorage.');
          resolve(null);
          return;
        }

        const req = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        req.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'auditId' });
          }
        };

        req.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        req.onerror = (event) => {
          console.error('[AmspAuditor] DB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async saveAuditRecord(record) {
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
      let audits = [];
      try {
        const raw = localStorage.getItem('VETCARE_AMSP_AUDITS');
        audits = raw ? JSON.parse(raw) : [];
      } catch (e) {
        audits = [];
      }
      const idx = audits.findIndex(a => a.auditId === record.auditId);
      if (idx >= 0) audits[idx] = record;
      else audits.unshift(record);
      localStorage.setItem('VETCARE_AMSP_AUDITS', JSON.stringify(audits));
    },

    async loadAllAudits() {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => {
              let list = req.result || [];
              if (list.length === 0) list = StorageAdapter.loadFallback();
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
        const raw = localStorage.getItem('VETCARE_AMSP_AUDITS');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }
  };

  // 4. SCIENTIFIC ANTIMICROBIAL STEWARDSHIP AUDIT ENGINES
  const StewardshipEngine = {
    // Audit an incoming prescription against WHO AWaRe & WOAH HPCIA rules
    auditPrescription(rxData) {
      const drugName = rxData.antibioticPrescribed;
      const drugMeta = window.VetcareApp.ClinicalData.AntimicrobialStewardship.ANTIBIOTIC_DIRECTORY[drugName] || {
        category: 'WATCH',
        isHpcIa: true,
        class: 'Broad-Spectrum Agent',
        standardDurationDays: 5,
        defaultWithdrawal: { milk: 5, meat: 14 }
      };

      const hasCulture = !!rxData.cultureSensitivityConducted;
      const duration = parseInt(rxData.durationDays, 10) || 5;
      const isFoodAnimal = ['Bovine', 'Bubaline', 'Caprine', 'Ovine', 'Poultry', 'Porcine'].includes(rxData.species);

      let score = 100;
      const flaggedIssues = [];
      const recommendedAlternatives = [];

      // 1. AWaRe Categorization Scoring & Penalties
      if (drugMeta.category === 'RESERVE') {
        score -= 45;
        flaggedIssues.push('गंभीर चेतावनी (RESERVE DRUG): यह औषधि मानव स्वास्थ्य हेतु आरक्षित है। पशु चिकित्सा में उपयोग अत्यधिक प्रतिबंधित है।');
        recommendedAlternatives.push('De-escalate to ACCESS first-line agent immediately');
      } else if (drugMeta.category === 'WATCH') {
        if (!hasCulture) {
          score -= 25;
          flaggedIssues.push('वॉच समूह (WATCH) औषधि बिना कल्चर संवेदनशीलता (C&S) परीक्षण के अनुशंसित नहीं है।');
          recommendedAlternatives.push('Send sample for microbiological antibiogram before 2nd dose');
        }
      }

      // 2. HPCIA Rules
      if (drugMeta.isHpcIa && !hasCulture) {
        score -= 20;
        flaggedIssues.push('HPCIA प्रतिबंध: उच्चतम प्राथमिकता वाली गंभीर औषधि (Fluoroquinolone / 3rd-4th Gen Cephalosporin) का अनुभवजन्य (Empirical) उपयोग वर्जित है।');
      }

      // 3. Duration & Withdrawal Checks
      if (duration > 7 && !['Canine', 'Equine'].includes(rxData.species)) {
        score -= 15;
        flaggedIssues.push(`अत्यधिक लंबी अवधि (${duration} दिन): खाद्य पशुओं में 5-7 दिन से अधिक उपचार पर क्लिनिकल औचित्य दर्ज होना अनिवार्य है।`);
      }

      if (isFoodAnimal && (!rxData.withdrawalDocumented && rxData.withdrawalDocumented !== false)) {
        score -= 10;
        flaggedIssues.push('खाद्य सुरक्षा अलर्ट: दूध अथवा मांस हेतु आधिकारिक विथड्रावल (Withdrawal) समय पर्ची पर स्पष्ट अंकित होना अनिवार्य है।');
      }

      score = Math.max(10, Math.min(100, score));

      return {
        auditId: 'AUDIT-' + Date.now().toString().slice(-6),
        rxId: rxData.rxId || 'RX-' + Math.floor(1000 + Math.random() * 9000),
        date: rxData.date || new Date().toISOString().split('T')[0],
        vetName: rxData.vetName || 'Attending Veterinary Officer',
        animalTag: rxData.animalTag || 'TAG-PENDING',
        species: rxData.species || 'Bovine',
        diagnosis: rxData.diagnosis || 'Clinical Bacterial Infection',
        antibioticPrescribed: drugName,
        awareCategory: drugMeta.category,
        isHpcIa: drugMeta.isHpcIa,
        cultureSensitivityConducted: hasCulture,
        durationDays: duration,
        complianceScore: score,
        flaggedIssues: flaggedIssues,
        recommendedAlternatives: recommendedAlternatives.length > 0 ? recommendedAlternatives : ['Current regimen conforms to stewardship protocols.'],
        withdrawalDays: drugMeta.defaultWithdrawal
      };
    },

    // Recalculates hospital-wide AWaRe metrics
    computeHospitalMetrics() {
      const audits = State.prescriptionsAuditLog;
      const total = audits.length;
      if (total === 0) {
        return {
          totalAudits: 0,
          accessCount: 0,
          watchCount: 0,
          reserveCount: 0,
          accessPct: 0,
          watchPct: 0,
          reservePct: 0,
          missingCultureCount: 0,
          hpcIaCount: 0,
          stewardshipIndex: 100
        };
      }

      let access = 0;
      let watch = 0;
      let reserve = 0;
      let missingCulture = 0;
      let hpcia = 0;
      let totalScore = 0;

      audits.forEach(a => {
        if (a.awareCategory === 'ACCESS') access++;
        else if (a.awareCategory === 'WATCH') watch++;
        else if (a.awareCategory === 'RESERVE') reserve++;

        if (!a.cultureSensitivityConducted && (a.awareCategory === 'WATCH' || a.awareCategory === 'RESERVE')) {
          missingCulture++;
        }

        if (a.isHpcIa) hpcia++;
        totalScore += a.complianceScore;
      });

      const accessPct = Math.round((access / total) * 100);
      const watchPct = Math.round((watch / total) * 100);
      const reservePct = Math.round((reserve / total) * 100);
      const stewardshipIndex = Math.round(totalScore / total);

      return {
        totalAudits: total,
        accessCount: access,
        watchCount: watch,
        reserveCount: reserve,
        accessPct,
        watchPct,
        reservePct,
        missingCultureCount: missingCulture,
        hpcIaCount: hpcia,
        stewardshipIndex
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[AmspAuditor ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const metrics = StewardshipEngine.computeHospitalMetrics();
      const accessStatusColor = metrics.accessPct >= 60 ? 'text-emerald-400' : 'text-rose-400';

      return `
        <div class="amsp-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE AMSP TELEMETRY RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Metric 1: WHO AWaRe Access % -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">WHO AWaRe एक्सेस अनुपात</span>
                  <div class="text-2xl font-black font-display ${accessStatusColor} mt-1">
                    ${metrics.accessPct}% <span class="text-xs font-normal text-slate-400 font-sans">(${metrics.accessCount}/${metrics.totalAudits})</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    लक्ष्य: <strong class="text-emerald-400">&ge; 60% प्रथम पंक्ति</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-solid fa-shield-virus"></i>
                </div>
              </div>
            </div>

            <!-- Metric 2: Reserve Drug Alerts -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">रिजर्व समूह रेड अलर्ट (RESERVE)</span>
                  <div class="text-2xl font-black font-display ${metrics.reserveCount > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'} mt-1">
                    ${metrics.reserveCount} <span class="text-xs font-normal text-slate-400 font-sans">प्रिस्क्रिप्शन</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    ${metrics.reserveCount > 0 ? 'Colistin / Cefquinome प्रयुक्त' : 'शून्य रिजर्व दुरुपयोग (Optimal)'}
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
              </div>
            </div>

            <!-- Metric 3: Lacking Culture Sensitivity -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">बिना C&S के वॉच/रिजर्व दवा</span>
                  <div class="text-2xl font-black font-display ${metrics.missingCultureCount > 0 ? 'text-amber-400' : 'text-emerald-400'} mt-1">
                    ${metrics.missingCultureCount} <span class="text-xs font-normal text-slate-400 font-sans">केस</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    माइक्रोबायोलॉजी लैब संस्तुति लंबित
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-flask-vial"></i>
                </div>
              </div>
            </div>

            <!-- Metric 4: Hospital Stewardship Index -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">अस्पताल AMSP स्टीवर्डशिप स्कोर</span>
                  <div class="text-2xl font-black font-display text-cyan-400 mt-1">
                    ${metrics.stewardshipIndex} / 100
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    ${metrics.stewardshipIndex >= 80 ? 'उत्कृष्ट विधिक अनुपालन (A Grade)' : 'सुधार आवश्यक (Needs Audit)'}
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-clipboard-check"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="amsp_dashboard" class="amsp-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'amsp_dashboard' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-table-list"></i>
                <span>१. एंटीबायोटिक ऑडिट रजिस्टर (Rx Audit Log)</span>
              </button>
              <button type="button" data-tab="rx_auditor_wizard" class="amsp-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'rx_auditor_wizard' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>२. त्वरित प्रिस्क्रिप्शन परीक्षक (Live Rx Checker)</span>
              </button>
              <button type="button" data-tab="antibiogram_matrix" class="amsp-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'antibiogram_matrix' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-dna"></i>
                <span>३. अस्पताल एंटीबायोग्राम मैट्रिक्स (Antibiogram)</span>
              </button>
            </div>

            <!-- Report Export Action -->
            <button type="button" id="btnExportAmspPdf" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all">
              <i class="fa-solid fa-print text-amber-400"></i>
              <span>AMSP मासिक विधिक ऑडिट रिपोर्ट</span>
            </button>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="amspTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="amspModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Prescription Audit Register View
    renderAuditRegisterTab() {
      let audits = State.prescriptionsAuditLog;

      if (State.activeFilter === 'flagged_reserve') {
        audits = audits.filter(a => a.awareCategory === 'RESERVE');
      } else if (State.activeFilter === 'missing_culture') {
        audits = audits.filter(a => !a.cultureSensitivityConducted && a.awareCategory !== 'ACCESS');
      } else if (State.activeFilter === 'hpc_ia_alert') {
        audits = audits.filter(a => a.isHpcIa);
      }

      const rows = audits.map(a => {
        let badgeColor = '';
        if (a.awareCategory === 'ACCESS') {
          badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
        } else if (a.awareCategory === 'WATCH') {
          badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
        } else {
          badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
        }

        let scoreColor = a.complianceScore >= 80 ? 'text-emerald-400' : (a.complianceScore >= 60 ? 'text-amber-400' : 'text-rose-400');

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4 font-mono text-xs">
              <div class="font-bold text-white">${a.rxId}</div>
              <div class="text-[10px] text-slate-400">${a.date} • ${a.vetName}</div>
            </td>
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm font-mono">${a.animalTag}</div>
              <div class="text-[11px] text-slate-400">${a.species} • ${a.diagnosis}</div>
            </td>
            <td class="py-3 px-4 text-xs">
              <div class="font-bold text-slate-200">${a.antibioticPrescribed}</div>
              <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColor}">
                ${a.awareCategory} ${a.isHpcIa ? '• HPCIA' : ''}
              </span>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="flex items-center gap-1.5 ${a.cultureSensitivityConducted ? 'text-emerald-400' : 'text-slate-400'}">
                <i class="fa-solid ${a.cultureSensitivityConducted ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark'}"></i>
                <span>${a.cultureSensitivityConducted ? 'C&S संपन्न (Tested)' : 'अनुपलब्ध (No C&S)'}</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-1">अवधि: ${a.durationDays} दिन | Milk: ${a.withdrawalDays.milk}d</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="font-bold text-sm ${scoreColor}">${a.complianceScore} / 100</div>
              ${a.flaggedIssues.length > 0 ? `
                <div class="text-[10px] text-rose-400 truncate max-w-xs mt-0.5" title="${a.flaggedIssues.join(' ')}">
                  <i class="fa-solid fa-circle-exclamation mr-1"></i>${a.flaggedIssues[0]}
                </div>
              ` : '<div class="text-[10px] text-emerald-400 mt-0.5">पूर्ण विधिक अनुपालन</div>'}
            </td>
            <td class="py-3 px-4 text-right">
              <button type="button" data-action="view_audit_details" data-id="${a.auditId}" class="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <i class="fa-solid fa-eye mr-1"></i> समीक्षा
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="space-y-4">
          <!-- FILTER CHIPS BAR -->
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2 overflow-x-auto text-xs font-mono">
              <button type="button" data-filter="all" class="amsp-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                सभी ऑडिट (${State.prescriptionsAuditLog.length})
              </button>
              <button type="button" data-filter="flagged_reserve" class="amsp-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'flagged_reserve' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-rose-300 hover:bg-slate-700'}">
                रिजर्व दुरुपयोग अलर्ट (Reserve)
              </button>
              <button type="button" data-filter="missing_culture" class="amsp-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'missing_culture' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'}">
                बिना C&S के उच्च एंटीबायोटिक
              </button>
              <button type="button" data-filter="hpc_ia_alert" class="amsp-filter-btn px-3 py-1.5 rounded-lg transition-all ${State.activeFilter === 'hpc_ia_alert' ? 'bg-purple-500 text-white font-bold' : 'bg-slate-800 text-purple-300 hover:bg-slate-700'}">
                HPCIA श्रेणी दवाएं
              </button>
            </div>
            <span class="text-xs font-mono text-slate-400">AMSP surveillance active</span>
          </div>

          <!-- TABLE CARD -->
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">Rx ID / दिनांक / चिकित्सक</th>
                    <th class="py-3 px-4">पशु पहचान एवं रोग निदान</th>
                    <th class="py-3 px-4">प्रिस्क्राइब्ड एंटीबायोटिक (AWaRe)</th>
                    <th class="py-3 px-4">C&S स्थिति एवं अवधि</th>
                    <th class="py-3 px-4">अनुपालन स्कोर (0-100)</th>
                    <th class="py-3 px-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${audits.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">कोई ऑडिट रिकॉर्ड उपलब्ध नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 2: Live Prescription Checker Wizard
    renderLiveCheckerTab() {
      const drugs = Object.keys(window.VetcareApp.ClinicalData.AntimicrobialStewardship.ANTIBIOTIC_DIRECTORY);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-wand-magic-sparkles text-cyan-400"></i>
                <span>त्वरित नैदानिक प्रिस्क्रिप्शन स्टीवर्डशिप चेकर (Live Rx Auditor)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                प्रिस्क्रिप्शन फाइनल करने से पूर्व तत्काल WHO AWaRe वर्गीकरण, HPCIA फ्लैग व विधिक विथड्रावल सत्यापन
              </p>
            </div>

            <form id="formLiveRxAudit" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">एंटीबायोटिक का चयन करें (Antibiotic)*</label>
                  <select id="live_drug" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    ${drugs.map(d => `<option value="${d}">${d}</option>`).join('')}
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशु प्रजाति (Species)*</label>
                  <select id="live_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="Bovine">गोजातीय (Bovine / Buffalo)</option>
                    <option value="Caprine">बकरी (Caprine)</option>
                    <option value="Ovine">भेड़ (Ovine)</option>
                    <option value="Canine">श्वान (Canine)</option>
                    <option value="Equine">अश्व (Equine)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">उपचार अवधि (Duration in Days)*</label>
                  <input type="number" id="live_duration" value="5" min="1" max="60" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लक्षित नैदानिक रोग (Clinical Diagnosis)*</label>
                  <input type="text" id="live_diagnosis" required placeholder="उदा. थनैला (Acute Mastitis) / गलघोंटू" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशु टैग संख्या / केस संख्या*</label>
                  <input type="text" id="live_tag" required placeholder="IN-HR-2026-XXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block">प्रयोगशाला एवं विधिक अनुपालन चेक:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <input type="checkbox" id="live_csDone" class="rounded bg-slate-800 border-slate-700 text-cyan-500" />
                    <span class="text-slate-300">कल्चर एवं संवेदनशीलता (C&S) टेस्ट कराया गया है</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <input type="checkbox" id="live_withdrawalNoted" checked class="rounded bg-slate-800 border-slate-700 text-cyan-500" />
                    <span class="text-slate-300">पर्चे पर दूध/मांस विथड्रावल अवधि अंकित की गई है</span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-stethoscope"></i>
                  <span>ऑडिट परिणाम एवं स्कोर जांचें</span>
                </button>
              </div>
            </form>

            <!-- Dynamic Output Evaluation Container -->
            <div id="liveEvaluationOutput" class="hidden"></div>
          </div>
        </div>
      `;
    },

    // TAB 3: Hospital Antibiogram Matrix
    renderAntibiogramTab() {
      const data = window.VetcareApp.ClinicalData.AntimicrobialStewardship.HOSPITAL_ANTIBIOGRAM;

      const rows = data.map(item => {
        const getPill = (val) => {
          let color = val >= 80 ? 'text-emerald-400 bg-emerald-500/10' : (val >= 60 ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10');
          return `<span class="px-2 py-0.5 rounded font-mono font-bold text-xs ${color}">${val}%</span>`;
        };

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4">
              <div class="font-bold text-white text-xs italic">${item.pathogen}</div>
              <div class="text-[10px] text-slate-400 font-sans">${item.source} (${item.isolatesTested} नमूने)</div>
            </td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Amoxicillin'])}</td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Oxytetracycline'])}</td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Gentamicin'])}</td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Enrofloxacin'])}</td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Ceftiofur'])}</td>
            <td class="py-3 px-3 text-center">${getPill(item.susceptibility['Amikacin'])}</td>
          </tr>
        `;
      }).join('');

      return `
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-dna text-amber-400"></i>
                  <span>अस्पताल क्यूरेटेड एंटीबायोग्राम संवेदनशीलता मैट्रिक्स (Hospital Antibiogram Matrix)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  विगत 6 माह में पृथक किए गए जीवाणुओं की रोगाणुरोधी संवेदनशीलता प्रतिशत (Empirical Therapy Guide)
                </p>
              </div>
              <span class="text-xs font-mono text-emerald-400 font-bold">&ge; 80% संवेदनशीलता इष्टतम</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">रोगजनक जीवाणु (Isolate Pathogen)</th>
                    <th class="py-3 px-3 text-center text-emerald-400">Amoxicillin (ACC)</th>
                    <th class="py-3 px-3 text-center text-emerald-400">Oxytetracycline (ACC)</th>
                    <th class="py-3 px-3 text-center text-emerald-400">Gentamicin (ACC)</th>
                    <th class="py-3 px-3 text-center text-amber-400">Enrofloxacin (WAT)</th>
                    <th class="py-3 px-3 text-center text-amber-400">Ceftiofur (WAT)</th>
                    <th class="py-3 px-3 text-center text-amber-400">Amikacin (WAT)</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }
  };

  // 7. MODAL & AUDIT DETAILS CONTROLLER
  const ModalController = {
    closeModal() {
      const container = document.getElementById('amspModalContainer');
      if (container) container.innerHTML = '';
    },

    openAuditDetailsModal(auditId) {
      const audit = State.prescriptionsAuditLog.find(a => a.auditId === auditId);
      if (!audit) return;

      const container = document.getElementById('amspModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <i class="fa-solid fa-stethoscope"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">स्टीवर्डशिप ऑडिट रिपोर्ट (${audit.auditId})</h3>
              </div>
              <button type="button" id="btnModalCloseAudit" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="space-y-4 text-xs font-mono">
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div class="flex justify-between">
                  <span class="text-slate-400">प्रिस्क्रिप्शन ID:</span>
                  <strong class="text-white">${audit.rxId}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">पशु व प्रजाति:</span>
                  <span class="text-white">${audit.animalTag} (${audit.species})</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">रोग निदान:</span>
                  <span class="text-cyan-300 font-sans">${audit.diagnosis}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">प्रिस्क्राइब्ड ड्रग:</span>
                  <strong class="text-amber-400">${audit.antibioticPrescribed}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">AWaRe श्रेणी:</span>
                  <strong class="${audit.awareCategory === 'ACCESS' ? 'text-emerald-400' : (audit.awareCategory === 'WATCH' ? 'text-amber-400' : 'text-rose-400')}">${audit.awareCategory}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">अनुपालन स्कोर:</span>
                  <strong class="text-base text-cyan-400">${audit.complianceScore} / 100</strong>
                </div>
              </div>

              <!-- Flagged Issues -->
              <div class="space-y-1.5">
                <span class="text-[10px] text-rose-400 uppercase font-bold">पहचाने गए विधिक/क्लिनिकल उल्लंघनों का विवरण:</span>
                ${audit.flaggedIssues.length > 0 ? `
                  <ul class="list-disc pl-5 space-y-1 text-rose-300 font-sans">
                    ${audit.flaggedIssues.map(i => `<li>${i}</li>`).join('')}
                  </ul>
                ` : '<div class="text-emerald-400 font-sans">कोई उल्लंघन नहीं पाया गया। पूर्णतः मानक-सम्मत।</div>'}
              </div>

              <!-- Recommended Alternatives -->
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-sans">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block">सुधारात्मक सिफारिशें (Corrective Guidance):</span>
                <ul class="list-disc pl-5 space-y-0.5 text-slate-300">
                  ${audit.recommendedAlternatives.map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>

              <div class="flex justify-end pt-2 border-t border-slate-800">
                <button type="button" id="btnModalCloseAuditBtn" class="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200">
                  बंद करें
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseAudit').onclick = ModalController.closeModal;
      document.getElementById('btnModalCloseAuditBtn').onclick = ModalController.closeModal;
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.amsp-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.AmrStewardshipAuditor.refreshView();
        }
        return;
      }

      // 2. Filter Pills
      const filterBtn = e.target.closest('.amsp-filter-btn');
      if (filterBtn) {
        State.activeFilter = filterBtn.getAttribute('data-filter');
        window.VetcareApp.Modules.AmrStewardshipAuditor.refreshView();
        return;
      }

      // 3. View Details Modal
      const viewBtn = e.target.closest('button[data-action="view_audit_details"]');
      if (viewBtn) {
        const id = viewBtn.getAttribute('data-id');
        ModalController.openAuditDetailsModal(id);
        return;
      }

      // 4. Print AMSP Audit PDF
      if (e.target.closest('#btnExportAmspPdf')) {
        window.VetcareApp.Modules.AmrStewardshipAuditor.exportStewardshipAuditPdf();
        return;
      }
    });

    // Form Submission: Live Checker Form
    container.addEventListener('submit', async (e) => {
      if (e.target.id === 'formLiveRxAudit') {
        e.preventDefault();
        const drug = document.getElementById('live_drug').value;
        const species = document.getElementById('live_species').value;
        const duration = document.getElementById('live_duration').value;
        const diag = document.getElementById('live_diagnosis').value.trim();
        const tag = document.getElementById('live_tag').value.trim();
        const csDone = document.getElementById('live_csDone').checked;
        const withDoc = document.getElementById('live_withdrawalNoted').checked;

        const evaluated = StewardshipEngine.auditPrescription({
          antibioticPrescribed: drug,
          species: species,
          durationDays: duration,
          diagnosis: diag,
          animalTag: tag,
          cultureSensitivityConducted: csDone,
          withdrawalDocumented: withDoc
        });

        // Add to active audit log
        State.prescriptionsAuditLog.unshift(evaluated);
        await StorageAdapter.saveAuditRecord(evaluated);

        // Display results immediately
        const outputDiv = document.getElementById('liveEvaluationOutput');
        if (outputDiv) {
          outputDiv.classList.remove('hidden');
          outputDiv.innerHTML = `
            <div class="mt-5 p-5 rounded-xl border-2 ${evaluated.complianceScore >= 80 ? 'border-emerald-500 bg-emerald-950/20' : (evaluated.complianceScore >= 60 ? 'border-amber-500 bg-amber-950/20' : 'border-rose-500 bg-rose-950/20')} space-y-3 font-mono text-xs">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="font-bold text-sm text-white">स्टीवर्डशिप मूल्यांकन परिणाम (Score: ${evaluated.complianceScore}/100)</span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold ${evaluated.awareCategory === 'ACCESS' ? 'bg-emerald-500/20 text-emerald-300' : (evaluated.awareCategory === 'WATCH' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300')}">
                  ${evaluated.awareCategory} ${evaluated.isHpcIa ? '• HPCIA' : ''}
                </span>
              </div>

              ${evaluated.flaggedIssues.length > 0 ? `
                <div>
                  <strong class="text-rose-400 block mb-1">पहचाने गए जोखिम (Identified Non-Compliances):</strong>
                  <ul class="list-disc pl-5 space-y-1 text-rose-200 font-sans">
                    ${evaluated.flaggedIssues.map(iss => `<li>${iss}</li>`).join('')}
                  </ul>
                </div>
              ` : '<div class="text-emerald-400 font-sans font-bold">उत्कृष्ट चयन! यह प्रिस्क्रिप्शन प्रथम पंक्ति एक्सेस प्रोटोकॉल के पूर्णतः अनुकूल है।</div>'}

              <div class="pt-2 border-t border-slate-800/80 font-sans text-slate-300">
                <strong class="text-cyan-400 font-mono">सुझाव:</strong> ${evaluated.recommendedAlternatives.join('; ')}
              </div>
            </div>
          `;
        }

        notify('प्रिस्क्रिप्शन ऑडिट रिकॉर्ड में सहेजा गया।', 'success');
      }
    });

    // 5. System Event Bus Listener: Automatic Rx Interception
    window.addEventListener('prescription:saved', async (event) => {
      if (event && event.detail && event.detail.antibiotic) {
        const audited = StewardshipEngine.auditPrescription({
          rxId: event.detail.rxId,
          antibioticPrescribed: event.detail.antibiotic,
          species: event.detail.species,
          diagnosis: event.detail.diagnosis,
          animalTag: event.detail.animalTag,
          cultureSensitivityConducted: event.detail.cultureDone || false
        });
        State.prescriptionsAuditLog.unshift(audited);
        await StorageAdapter.saveAuditRecord(audited);
        console.log('[AmspAuditor] Intercepted and Audited Prescription:', audited);
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.AmrStewardshipAuditor = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();
        const saved = await StorageAdapter.loadAllAudits();
        State.prescriptionsAuditLog = Array.isArray(saved) && saved.length > 0 ? saved : State.seedData;

        console.log('[AmspAuditor] Initialized with', State.prescriptionsAuditLog.length, 'audits.');
      } catch (err) {
        console.error('[AmspAuditor] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[AmspAuditor] Container ${containerId} not found.`);
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
      const contentPanel = State.containerElement.querySelector('#amspTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'amsp_dashboard') {
        contentPanel.innerHTML = UIEngine.renderAuditRegisterTab();
      } else if (State.activeTab === 'rx_auditor_wizard') {
        contentPanel.innerHTML = UIEngine.renderLiveCheckerTab();
      } else if (State.activeTab === 'antibiogram_matrix') {
        contentPanel.innerHTML = UIEngine.renderAntibiogramTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[AmspAuditor] Module destroyed cleanly.');
    },

    // Formal Monthly AMSP Audit Report Generator
    exportStewardshipAuditPdf() {
      const metrics = StewardshipEngine.computeHospitalMetrics();
      const audits = State.prescriptionsAuditLog;

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
          <title>Antimicrobial Stewardship (AMSP) Audit Report - Vetcare AI OS</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 15px; font-size: 11px; }
            .header { text-align: center; border-bottom: 3px double #064e3b; padding-bottom: 8px; margin-bottom: 15px; }
            .crest { font-size: 20px; font-weight: 900; color: #064e3b; }
            .subcrest { font-size: 10px; text-transform: uppercase; color: #555; font-weight: bold; }
            .title { font-size: 14px; font-weight: bold; margin-top: 6px; text-decoration: underline; color: #047857; }
            .kpi-row { display: flex; justify-content: space-between; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 6px; margin-bottom: 15px; }
            .kpi-box { text-align: center; }
            .kpi-box .val { font-size: 16px; font-weight: bold; color: #166534; }
            .kpi-box .lbl { font-size: 9px; color: #15803d; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #cbd5e1; padding: 5px 7px; font-size: 10px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 50px; }
            .sign-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; font-size: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">VETCARE AI OS • ANTIMICROBIAL STEWARDSHIP PROGRAM (AMSP)</div>
            <div class="subcrest">WHO AWaRe Classification, HPCIA Surveillance & Hospital AMR Audit (2026 Core)</div>
            <div class="title">मासिक रोगाणुरोधी स्टीवर्डशिप अनुपालन एवं उपभोग रिपोर्ट</div>
          </div>

          <div class="kpi-row">
            <div class="kpi-box">
              <div class="val">${metrics.totalAudits}</div>
              <div class="lbl">कुल मूल्यांकित पर्चियां</div>
            </div>
            <div class="kpi-box">
              <div class="val">${metrics.accessPct}%</div>
              <div class="lbl">एक्सेस दर (लक्ष्य &ge; 60%)</div>
            </div>
            <div class="kpi-box">
              <div class="val" style="color: #b91c1c;">${metrics.reserveCount}</div>
              <div class="lbl">रिजर्व रेड अलर्ट</div>
            </div>
            <div class="kpi-box">
              <div class="val">${metrics.missingCultureCount}</div>
              <div class="lbl">बिना C&S वॉच दवाएं</div>
            </div>
            <div class="kpi-box">
              <div class="val">${metrics.stewardshipIndex}/100</div>
              <div class="lbl">अस्पताल AMSP इंडेक्स</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Rx ID</th>
                <th>दिनांक</th>
                <th>पशु पहचान / प्रजाति</th>
                <th>रोग निदान</th>
                <th>प्रिस्क्राइब्ड दवा</th>
                <th>AWaRe श्रेणी</th>
                <th>C&S स्थिति</th>
                <th>स्कोर</th>
              </tr>
            </thead>
            <tbody>
              ${audits.map(a => `
                <tr>
                  <td><strong>${a.rxId}</strong></td>
                  <td>${a.date}</td>
                  <td>${a.animalTag} (${a.species})</td>
                  <td>${a.diagnosis}</td>
                  <td><strong>${a.antibioticPrescribed}</strong></td>
                  <td>${a.awareCategory}</td>
                  <td>${a.cultureSensitivityConducted ? 'C&S Done' : 'No C&S'}</td>
                  <td><strong>${a.complianceScore}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer-sign">
            <div class="sign-box">
              क्लीनिकल माइक्रोबायोलॉजिस्ट / AMSP हेड<br />
              (In-Charge AMSP Surveillance)
            </div>
            <div class="sign-box">
              चिकित्सा अधीक्षक / मुख्य पशु चिकित्सा अधिकारी<br />
              (Chief Veterinary Officer / Superintendent)
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
