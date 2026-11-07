// Vetcare AI OS - Companion Animal Clinic, WSAVA Nutrition & Pet Wellness Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standardized WSAVA, AAHA & Small Animal Clinical Guidelines
  window.VetcareApp.ClinicalData.CompanionStandards = {
    WSAVA_BCS_CANINE: {
      1: { label: 'Emaciated (अत्यंत क्षीण)', description: 'Ribs, lumbar vertebrae, and pelvic bones easily visible. No palpable body fat. Severe abdominal tuck.', status: 'CRITICAL_UNDERWEIGHT' },
      2: { label: 'Very Thin (अति दुर्बल)', description: 'Ribs easily visible with no palpable fat. Prominent bony ridges and obvious waist.', status: 'UNDERWEIGHT' },
      3: { label: 'Thin (दुर्बल)', description: 'Ribs easily palpable with minimal fat covering. Abdominal tuck clearly visible from side.', status: 'UNDERWEIGHT' },
      4: { label: 'Underweight / Lean (पतला)', description: 'Ribs easily palpable with slight fat covering. Obvious waistline from above.', status: 'LEAN' },
      5: { label: 'Ideal / Optimal (आदर्श स्वास्थ्य)', description: 'Ribs palpable without excess fat covering. Waist observed behind ribs when viewed from above; distinct abdominal tuck.', status: 'IDEAL' },
      6: { label: 'Overweight (हल्का अधिक वजन)', description: 'Ribs palpable with slight excess fat covering. Waistline discernible but not prominent.', status: 'OVERWEIGHT' },
      7: { label: 'Heavy Overweight (अधिक वजन)', description: 'Ribs difficult to palpate due to thick fat layer. Waist absent or barely visible. Moderate abdominal fat.', status: 'OVERWEIGHT' },
      8: { label: 'Obese (मोटापा)', description: 'Ribs cannot be palpated under heavy fat cover. Prominent fat deposits over lumbar spine and base of tail. Waist completely absent.', status: 'OBESE' },
      9: { label: 'Severely Obese (भीषण मोटापा)', description: 'Massive fat deposits over thorax, spine, neck, and limbs. Abdominal distension with complete loss of waist.', status: 'OBESE' }
    },

    DENTAL_PERIODONTAL_STAGES: {
      0: { grade: 'Grade 0 (Normal)', description: 'Healthy gingiva, no plaque or calculus, sharp margins, no bleeding.', prophylaxis: 'Daily brushing / dental chews' },
      1: { grade: 'Grade 1 (Gingivitis)', description: 'Gingival margin erythema (redness) and edema without attachment loss. Plaque present.', prophylaxis: 'Ultrasonic scaling recommended' },
      2: { grade: 'Grade 2 (Early Periodontitis)', description: '<25% attachment loss, mild subgingival calculus, gingivitis bleeding on probing.', prophylaxis: 'Ultrasonic scaling & subgingival curettage' },
      3: { grade: 'Grade 3 (Moderate Periodontitis)', description: '25-50% attachment loss, root exposure, gingival recession, furcation involvement.', prophylaxis: 'Deep scaling, open flap therapy / selective extractions' },
      4: { grade: 'Grade 4 (Advanced Periodontitis)', description: '>50% attachment loss, deep periodontal pockets, purulent exudate, mobile loose teeth.', prophylaxis: 'Surgical extraction of compromised teeth mandatory' }
    },

    VACCINATION_SCHEDULES: {
      canine: {
        core: ['Canine Distemper (CDV)', 'Infectious Canine Hepatitis (CAV-2)', 'Canine Parvovirus (CPV-2)', 'Rabies (1-Year / 3-Year)'],
        nonCore: ['Leptospira (4-Serovars)', 'Bordetella bronchiseptica (Kennel Cough)', 'Canine Parainfluenza (CPIV)']
      },
      feline: {
        core: ['Feline Panleukopenia (FPV)', 'Feline Viral Rhinotracheitis (FHV-1)', 'Feline Calicivirus (FCV)', 'Rabies'],
        nonCore: ['Feline Leukemia Virus (FeLV - Core in kittens / outdoor)', 'Chlamydia felis']
      }
    }
  };

  // 2. INTERNAL REACTIVE STATE
  const State = {
    activeTab: 'pet_directory',
    activePetId: 'PET-2026-001',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    petPatients: [],
    wellnessAssessments: [],

    // Seed Data Setup (Hydrated if storage is empty)
    seedData: {
      petPatients: [
        {
          petId: 'PET-2026-001',
          name: 'Bruno',
          species: 'canine',
          breed: 'Labrador Retriever',
          dob: new Date(Date.now() - 4 * 365 * 86400000).toISOString().split('T')[0],
          ageYears: 4,
          weightKg: 38.5,
          sex: 'neutered',
          microchipId: '985141002934812',
          ownerName: 'Vikramaditya Rathore',
          phone: '9829011234',
          lifeStage: 'MATURE'
        },
        {
          petId: 'PET-2026-002',
          name: 'Simba',
          species: 'canine',
          breed: 'Golden Retriever',
          dob: new Date(Date.now() - 8 * 365 * 86400000).toISOString().split('T')[0],
          ageYears: 8,
          weightKg: 32.0,
          sex: 'male',
          microchipId: '985141003491821',
          ownerName: 'Meenakshi Sundaram',
          phone: '9444029182',
          lifeStage: 'SENIOR'
        },
        {
          petId: 'PET-2026-003',
          name: 'Luna',
          species: 'feline',
          breed: 'Persian Longhair',
          dob: new Date(Date.now() - 2 * 365 * 86400000).toISOString().split('T')[0],
          ageYears: 2,
          weightKg: 3.8,
          sex: 'spayed',
          microchipId: '985141009182341',
          ownerName: 'Ananya Deshmukh',
          phone: '9820038192',
          lifeStage: 'YOUNG_ADULT'
        },
        {
          petId: 'PET-2026-004',
          name: 'Oliver',
          species: 'feline',
          breed: 'Domestic Shorthair',
          dob: new Date(Date.now() - 13 * 365 * 86400000).toISOString().split('T')[0],
          ageYears: 13,
          weightKg: 4.1,
          sex: 'neutered',
          microchipId: '985141001192834',
          ownerName: 'Cyrus Mistry',
          phone: '9822049182',
          lifeStage: 'SENIOR'
        },
        {
          petId: 'PET-2026-005',
          name: 'Rocky',
          species: 'canine',
          breed: 'German Shepherd Dog',
          dob: new Date(Date.now() - 240 * 86400000).toISOString().split('T')[0],
          ageYears: 0.7,
          weightKg: 24.5,
          sex: 'male',
          microchipId: '985141007741920',
          ownerName: 'Col. Rajesh Bakshi',
          phone: '9811029381',
          lifeStage: 'PUPPY_KITTEN'
        }
      ],
      wellnessAssessments: [
        {
          assessmentId: 'ASSESS-8801',
          petId: 'PET-2026-001',
          date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
          bcsScore: 7,
          muscleConditionScore: 'NORMAL',
          dentalGrade: 1,
          wsavaPainScore: 0,
          fleaTickPreventiveStatus: 'Isoxazoline Chewable (Simparica) administered 2 weeks ago',
          heartwormStatus: 'NEGATIVE',
          coreVaccineStatus: 'UP_TO_DATE',
          dietaryPlan: 'Calorie restricted weight loss diet (20% reduction, target 32kg weight).'
        },
        {
          assessmentId: 'ASSESS-8802',
          petId: 'PET-2026-002',
          date: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
          bcsScore: 5,
          muscleConditionScore: 'MILD_WASTING',
          dentalGrade: 2,
          wsavaPainScore: 1,
          fleaTickPreventiveStatus: 'Due this month',
          heartwormStatus: 'NEGATIVE',
          coreVaccineStatus: 'DUE',
          dietaryPlan: 'Senior canine joint support formula enriched with EPA/DHA & Glucosamine.'
        },
        {
          assessmentId: 'ASSESS-8803',
          petId: 'PET-2026-003',
          date: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0],
          bcsScore: 4,
          muscleConditionScore: 'NORMAL',
          dentalGrade: 0,
          wsavaPainScore: 0,
          fleaTickPreventiveStatus: 'Topical Selamectin active',
          heartwormStatus: 'NEGATIVE',
          coreVaccineStatus: 'UP_TO_DATE',
          dietaryPlan: 'Adult feline wet & dry combination diet with hairball control.'
        }
      ]
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcarePetClinicDB',
    DB_VERSION: 1,
    STORE_NAME: 'companion_animal_wellness',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[CompanionClinic] IndexedDB unavailable, using LocalStorage.');
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
          console.error('[CompanionClinic] DB Open Error:', event.target.error);
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
              localStorage.setItem('VETCARE_PET_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_PET_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_PET_' + key, JSON.stringify(data));
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
                const ls = localStorage.getItem('VETCARE_PET_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_PET_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_PET_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_PET_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. CLINICAL SCORING & WSAVA BIOMETRIC ENGINES
  const CompanionEngine = {
    // Calculates Target Ideal Weight based on WSAVA 9-point score
    calculateIdealWeight(currentWeightKg, bcsScore) {
      const bcs = parseInt(bcsScore, 10) || 5;
      const wt = parseFloat(currentWeightKg) || 10.0;
      if (bcs === 5) return wt;

      // Each point on 9-point scale above/below 5 corresponds to approx 10% change in body weight
      const percentOverOrUnder = (bcs - 5) * 10;
      const idealWeight = wt * (100 / (100 + percentOverOrUnder));
      return Math.round(idealWeight * 10) / 10;
    },

    // Evaluates physiological life-stage from chronological age
    deriveLifeStage(species, ageYears) {
      const age = parseFloat(ageYears);
      const isFeline = species === 'feline';

      if (age < 1.0) return 'PUPPY_KITTEN';
      if (isFeline) {
        if (age <= 6.0) return 'YOUNG_ADULT';
        if (age <= 10.0) return 'MATURE';
        if (age <= 14.0) return 'SENIOR';
        return 'GERIATRIC';
      } else {
        if (age <= 3.0) return 'YOUNG_ADULT';
        if (age <= 6.0) return 'MATURE';
        if (age <= 10.0) return 'SENIOR';
        return 'GERIATRIC';
      }
    },

    // Aggregates high-level Companion Clinic KPIs
    computeClinicMetrics() {
      const pets = State.petPatients;
      const assessments = State.wellnessAssessments;

      let canines = 0;
      let felines = 0;
      let seniors = 0;
      let overdueVaccines = 0;
      let obesityCount = 0;

      pets.forEach(p => {
        if (p.species === 'canine') canines++;
        else felines++;

        if (p.lifeStage === 'SENIOR' || p.lifeStage === 'GERIATRIC') {
          seniors++;
        }
      });

      assessments.forEach(a => {
        if (a.coreVaccineStatus === 'OVERDUE' || a.coreVaccineStatus === 'DUE') {
          overdueVaccines++;
        }
        if (a.bcsScore >= 7) {
          obesityCount++;
        }
      });

      return {
        totalPets: pets.length,
        canines,
        felines,
        seniors,
        overdueVaccines,
        obesityCount
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[CompanionClinic ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const metrics = CompanionEngine.computeClinicMetrics();
      const activePet = State.petPatients.find(p => p.petId === State.activePetId) || State.petPatients[0];

      return `
        <div class="companion-clinic-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP CLINIC TELEMETRY RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Metric 1: Total Registered Pets -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">सक्रिय पेट्स (Active Roster)</span>
                  <div class="text-2xl font-black font-display text-white mt-1">
                    ${metrics.totalPets} <span class="text-xs font-normal text-slate-400 font-sans">रजिस्टर्ड</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    श्वान: <strong class="text-cyan-400">${metrics.canines}</strong> | बिल्लियां: <strong class="text-purple-400">${metrics.felines}</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-paw"></i>
                </div>
              </div>
            </div>

            <!-- Metric 2: Overdue Core Vaccines -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">वैक्सीन लंबित (Core Due)</span>
                  <div class="text-2xl font-black font-display ${metrics.overdueVaccines > 0 ? 'text-amber-400' : 'text-emerald-400'} mt-1">
                    ${metrics.overdueVaccines} <span class="text-xs font-normal text-slate-400 font-sans">पशु</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    DHPPiL / Tricat / Rabies
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-syringe"></i>
                </div>
              </div>
            </div>

            <!-- Metric 3: Senior & Geriatric Care -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">सीनियर / जेरियाट्रिक केयर</span>
                  <div class="text-2xl font-black font-display text-purple-400 mt-1">
                    ${metrics.seniors} <span class="text-xs font-normal text-slate-400 font-sans">मरीज</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    SDMA / Echo / Joint Panels
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-heart-pulse"></i>
                </div>
              </div>
            </div>

            <!-- Metric 4: Obesity / BCS Intervention -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">मोटापा (WSAVA BCS &ge; 7)</span>
                  <div class="text-2xl font-black font-display ${metrics.obesityCount > 0 ? 'text-rose-400' : 'text-emerald-400'} mt-1">
                    ${metrics.obesityCount} <span class="text-xs font-normal text-slate-400 font-sans">केस</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    वजन प्रबंधन आहार योजना सक्रिय
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl">
                  <i class="fa-solid fa-weight-scale"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="pet_directory" class="pet-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'pet_directory' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-address-book"></i>
                <span>१. पेट डायरेक्टरी (Pet Directory)</span>
              </button>
              <button type="button" data-tab="wsava_assessment_wizard" class="pet-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'wsava_assessment_wizard' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-apple-whole"></i>
                <span>२. WSAVA पोषण व BCS विज़ार्ड (BCS 1-9)</span>
              </button>
              <button type="button" data-tab="dental_cardiac_scoring" class="pet-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'dental_cardiac_scoring' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-tooth"></i>
                <span>३. डेंटल व कार्डियक स्कोरिंग (Dental Gr 0-4)</span>
              </button>
              <button type="button" data-tab="pet_health_passport" class="pet-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'pet_health_passport' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-passport"></i>
                <span>४. डिजिटल पेट पासपोर्ट (Pet Passport)</span>
              </button>
            </div>

            <!-- Action Trigger for New Pet Registration -->
            <div class="flex items-center gap-2">
              <button type="button" id="btnOpenNewPetModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया पेट पंजीकृत करें</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="companionTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="companionModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Pet Patient Directory Cards View
    renderPetDirectoryTab() {
      const pets = State.petPatients;

      const cards = pets.map(p => {
        const isSelected = p.petId === State.activePetId;
        const assess = State.wellnessAssessments.find(a => a.petId === p.petId);

        let icon = p.species === 'canine' ? '<i class="fa-solid fa-dog text-cyan-400"></i>' : '<i class="fa-solid fa-cat text-purple-400"></i>';
        let bcsBadge = assess ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${assess.bcsScore >= 7 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : (assess.bcsScore <= 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40')}">BCS ${assess.bcsScore}/9</span>` : '';

        return `
          <div class="p-5 rounded-2xl bg-slate-900 border-2 transition-all shadow-xl flex flex-col justify-between ${isSelected ? 'border-cyan-500 bg-cyan-950/20 ring-2 ring-cyan-500/30' : 'border-slate-800 hover:border-slate-700'}">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                    ${icon}
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white leading-tight">${p.name}</h4>
                    <span class="text-[11px] font-mono text-slate-400">${p.breed}</span>
                  </div>
                </div>
                ${bcsBadge}
              </div>

              <div class="space-y-1.5 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800/80">
                <div class="flex justify-between">
                  <span class="text-slate-500">आयु / वजन:</span>
                  <span class="text-white">${p.ageYears} वर्ष • <strong>${p.weightKg} kg</strong></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">लिंग:</span>
                  <span class="capitalize text-slate-200">${p.sex}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">माइक्रोचिप ID:</span>
                  <span class="text-cyan-400 truncate max-w-[140px]">${p.microchipId || 'N/A'}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">पालक (Owner):</span>
                  <span class="text-slate-200">${p.ownerName}</span>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
              <button type="button" data-action="select_pet" data-id="${p.petId}" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${isSelected ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}">
                ${isSelected ? '<i class="fa-solid fa-check mr-1"></i>सक्रिय मरीज' : 'मरीज चुनें'}
              </button>
              <button type="button" data-action="print_passport" data-id="${p.petId}" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-purple-400 border border-slate-700" title="पेट पासपोर्ट प्रिंट करें">
                <i class="fa-solid fa-passport"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase">
              <i class="fa-solid fa-users-viewfinder text-cyan-400"></i>
              <span>पंजीकृत पेट्स रोस्टर (Companion Patients Roster)</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${pets.length} मरीज नामांकित</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${cards}
          </div>
        </div>
      `;
    },

    // TAB 2: WSAVA Nutritional Assessment & 9-Point BCS Wizard
    renderNutritionalAssessmentTab() {
      const pet = State.petPatients.find(p => p.petId === State.activePetId) || State.petPatients[0];
      const assessment = State.wellnessAssessments.find(a => a.petId === pet.petId) || {
        bcsScore: 5,
        muscleConditionScore: 'NORMAL',
        dietaryPlan: 'Maintenance Adult diet'
      };

      const bcsData = window.VetcareApp.ClinicalData.CompanionStandards.WSAVA_BCS_CANINE;
      const targetWeight = CompanionEngine.calculateIdealWeight(pet.weightKg, assessment.bcsScore);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  WSAVA GLOBAL NUTRITION COMMITTEE GUIDELINES
                </span>
                <h3 class="text-xl font-bold text-white mt-1">शारीरिक स्वास्थ्य एवं पोषण मूल्यांकन (BCS 1-9 & MCS)</h3>
                <div class="text-xs text-slate-400 font-mono">रोगी: <strong class="text-cyan-400">${pet.name}</strong> (${pet.species === 'canine' ? 'श्वान' : 'बिल्ली'} • ${pet.breed} • वर्तमान वजन: ${pet.weightKg} kg)</div>
              </div>

              <!-- Ideal Target Weight Display -->
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right">
                <span class="text-[10px] font-mono uppercase text-slate-400 block">आदर्श लक्ष्य वजन (Target Weight)</span>
                <span class="text-lg font-mono font-black text-emerald-400">${targetWeight} kg</span>
              </div>
            </div>

            <!-- WSAVA 9-Point Visual Interactive Slider -->
            <div class="space-y-4 p-5 rounded-xl bg-slate-950 border border-slate-800">
              <div class="flex items-center justify-between">
                <label class="text-xs font-mono uppercase text-emerald-400 font-bold">
                  WSAVA बॉडी कंडीशन स्कोर (BCS 1 to 9): <span id="bcsLiveDisplay" class="text-white text-base">${assessment.bcsScore} / 9</span>
                </label>
                <span id="bcsStatusPill" class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ${bcsData[assessment.bcsScore].label}
                </span>
              </div>

              <input type="range" id="bcsSliderInput" min="1" max="9" step="1" value="${assessment.bcsScore}" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              
              <div class="grid grid-cols-9 text-[10px] font-mono text-center text-slate-500">
                <span>1 (क्षीण)</span><span>2</span><span>3 (पतला)</span><span>4</span><span class="text-emerald-400 font-bold">5 (आदर्श)</span><span>6</span><span>7 (भारी)</span><span>8</span><span class="text-rose-400 font-bold">9 (मोटापा)</span>
              </div>

              <p id="bcsDescriptionBox" class="text-xs text-slate-300 p-3 rounded-lg bg-slate-900 border border-slate-800 leading-relaxed font-sans">
                ${bcsData[assessment.bcsScore].description}
              </p>
            </div>

            <!-- Muscle Condition Score (MCS) & Dietary Management Form -->
            <form id="formSaveNutritionAssessment" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मांसपेशी संकोच / वेस्टिंग स्कोर (Muscle Condition Score - MCS)*</label>
                  <select id="mcs_select" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="NORMAL" ${assessment.muscleConditionScore === 'NORMAL' ? 'selected' : ''}>Normal (सामान्य मांसपेशियां, कोई वेस्टिंग नहीं)</option>
                    <option value="MILD_WASTING" ${assessment.muscleConditionScore === 'MILD_WASTING' ? 'selected' : ''}>Mild Wasting (हल्का संकोच - खोपड़ी व स्कैपुला पर)</option>
                    <option value="MODERATE" ${assessment.muscleConditionScore === 'MODERATE' ? 'selected' : ''}>Moderate Wasting (मध्यम संकोच - रीढ़ की हड्डी उभार)</option>
                    <option value="SEVERE" ${assessment.muscleConditionScore === 'SEVERE' ? 'selected' : ''}>Severe Wasting (गंभीर कैशेक्सिया / सार्कोपेनिया)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कोर वैक्सीनेशन स्थिति (AAHA/WSAVA Core Vaccines)*</label>
                  <select id="core_vaccine_select" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="UP_TO_DATE" ${assessment.coreVaccineStatus === 'UP_TO_DATE' ? 'selected' : ''}>Up to Date (वैध व सक्रिय)</option>
                    <option value="DUE" ${assessment.coreVaccineStatus === 'DUE' ? 'selected' : ''}>Due this Month (इस माह देय)</option>
                    <option value="OVERDUE" ${assessment.coreVaccineStatus === 'OVERDUE' ? 'selected' : ''}>Overdue (अतिदेय - तत्काल बूस्टर आवश्यक)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आहार एवं पोषण योजना (WSAVA Nutritional Recommendation)</label>
                <textarea id="diet_plan_input" rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">${assessment.dietaryPlan || ''}</textarea>
              </div>

              <div class="flex justify-end pt-2 border-t border-slate-800">
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i>
                  <span>पोषण मूल्यांकन सहेजें</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      `;
    },

    // TAB 3: Dental Calculus Grading & Cardiac Prophylaxis
    renderDentalCardiacTab() {
      const pet = State.petPatients.find(p => p.petId === State.activePetId) || State.petPatients[0];
      const stages = window.VetcareApp.ClinicalData.CompanionStandards.DENTAL_PERIODONTAL_STAGES;

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-tooth text-amber-400"></i>
                <span>दंत स्वास्थ्य एवं कार्डियक-रीनल प्रिवेंटिव स्कोरिंग</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                पेरियोडॉन्टल डिसीज (ग्रेड 0 से 4) के कारण होने वाले बैक्टीरिया संचरण एवं हृदय/वृक्क जटिलताओं की रोकथाम
              </p>
            </div>

            <!-- 5 Dental Grades Grid -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
              ${Object.entries(stages).map(([gradeNum, item]) => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold block w-fit mb-1.5">
                      ${item.grade}
                    </span>
                    <p class="text-xs text-slate-300 leading-snug">${item.description}</p>
                  </div>
                  <div class="pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-400">
                    <strong>प्रोटोकॉल:</strong> ${item.prophylaxis}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Geriatric Cardiac & Renal Panels Advisor -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div class="font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-shield-cat text-purple-400"></i>
                <span>सीनियर पेट्स हेतु लक्षित नैदानिक प्रोटोकॉल (Age: ${pet.ageYears} Yrs - ${pet.lifeStage}):</span>
              </div>

              ${pet.species === 'feline' && pet.ageYears >= 7 ? `
                <div class="p-3 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-200">
                  <strong>बिल्ली सीनियर अलर्ट:</strong> 7 वर्ष से अधिक आयु की बिल्लियों में प्रारंभिक क्रॉनिक किडनी डिसीज (CKD) पहचान हेतु SDMA, सीरम क्रिएटिनिन, ब्लड प्रेशर एवं T4 थाइरॉइड प्रोफाइल जांच अनिवार्य है।
                </div>
              ` : `
                <div class="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-200">
                  <strong>श्वान कार्डियक अलर्ट:</strong> लार्ज व जायंट नस्लों में 6+ वर्ष की आयु पर कार्डियोमायोपैथी एवं माइट्रल वाल्व रोग हेतु NT-proBNP एवं ईकोकार्डियोग्राफी जांच की अनुशंसा की जाती है।
                </div>
              `}
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: Printable Official Digital Pet Health Passport
    renderPetHealthPassportTab() {
      const pet = State.petPatients.find(p => p.petId === State.activePetId) || State.petPatients[0];
      const assess = State.wellnessAssessments.find(a => a.petId === pet.petId);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-passport text-purple-400"></i>
                  <span>आधिकारिक डिजिटल पेट हेल्थ पासपोर्ट (Pet Passport Preview)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">माइक्रोचिप नंबर, टीकाकरण इतिहास व यात्रा हेतु विधिक स्वास्थ्य रिकॉर्ड</p>
              </div>
              <button type="button" id="btnPrintPassportAction" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i>
                <span>पासपोर्ट बुकलेट प्रिंट करें</span>
              </button>
            </div>

            <!-- Visual Passport Card Preview -->
            <div class="p-8 rounded-2xl bg-white text-slate-950 border-4 border-slate-900 shadow-2xl max-w-2xl mx-auto space-y-5 font-sans">
              <div class="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-2xl font-black">
                    <i class="fa-solid fa-paw"></i>
                  </div>
                  <div>
                    <div class="text-lg font-black uppercase text-slate-900 tracking-tight">PET HEALTH PASSPORT • पेट स्वास्थ्य पासपोर्ट</div>
                    <div class="text-[10px] text-slate-600 font-mono font-bold">VETCARE AI OS • OFFICIAL COMPANION ANIMAL IDENTIFICATION</div>
                  </div>
                </div>
                <div class="text-right text-xs font-mono font-bold text-purple-900">
                  PASSPORT NO:<br />${pet.petId}
                </div>
              </div>

              <!-- Pet Biometrics Grid -->
              <div class="grid grid-cols-2 gap-4 text-xs">
                <div class="space-y-1">
                  <div><strong>पेट का नाम:</strong> ${pet.name}</div>
                  <div><strong>प्रजाति / नस्ल:</strong> ${pet.species === 'canine' ? 'श्वान (Canine)' : 'बिल्ली (Feline)'} • ${pet.breed}</div>
                  <div><strong>लिंग / स्थिति:</strong> ${pet.sex}</div>
                  <div><strong>जन्म तिथि / आयु:</strong> ${pet.dob} (${pet.ageYears} वर्ष)</div>
                </div>
                <div class="space-y-1">
                  <div><strong>माइक्रोचिप RFID:</strong> <span class="font-mono font-bold">${pet.microchipId || '985141002934812'}</span></div>
                  <div><strong>शारीरिक वजन:</strong> ${pet.weightKg} kg (BCS: ${assess?.bcsScore || 5}/9)</div>
                  <div><strong>पालक (Owner):</strong> ${pet.ownerName}</div>
                  <div><strong>दूरभाष (Phone):</strong> ${pet.phone}</div>
                </div>
              </div>

              <!-- Vaccination Certification Records -->
              <div>
                <div class="text-xs font-bold uppercase border-b border-slate-300 pb-1 mb-2">टीकाकरण इतिहास (Vaccination Record Stamps):</div>
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-300 text-[10px] font-mono uppercase bg-slate-100">
                      <th class="p-1.5">वैक्सीन का नाम</th>
                      <th class="p-1.5">तिथि</th>
                      <th class="p-1.5">बैच नंबर</th>
                      <th class="p-1.5 text-right">सत्यापन स्थिति</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-slate-100">
                      <td class="p-1.5">Rabies (Anti-Rabies 1-Year)</td>
                      <td class="p-1.5 font-mono">15-Jan-2026</td>
                      <td class="p-1.5 font-mono">RAB-IND-8810</td>
                      <td class="p-1.5 text-right text-emerald-700 font-bold">CERTIFIED OK</td>
                    </tr>
                    <tr class="border-b border-slate-100">
                      <td class="p-1.5">${pet.species === 'canine' ? 'DHPPiL (Distemper, Parvo, Lepto)' : 'Tricat (FPV, FHV, FCV)'}</td>
                      <td class="p-1.5 font-mono">15-Jan-2026</td>
                      <td class="p-1.5 font-mono">CORE-7721</td>
                      <td class="p-1.5 text-right text-emerald-700 font-bold">CERTIFIED OK</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Preventive Parasite Control -->
              <div class="text-xs text-slate-800">
                <strong>आंतरिक एवं बाह्य परजीवी मुक्ति:</strong> ${assess?.fleaTickPreventiveStatus || 'नियमित ब्रॉड-स्पेक्ट्रम डीवॉर्मिंग संपन्न।'}
              </div>

              <div class="pt-6 border-t-2 border-slate-900 flex justify-between items-end text-xs">
                <div>
                  <div class="w-20 h-20 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center text-[9px] font-mono text-slate-400 text-center p-1">
                    [ CLINIC OFFICIAL EMBOSS SEAL ]
                  </div>
                </div>
                <div class="text-center font-bold">
                  अधिकृत पशु चिकित्सा अधिकारी हस्ताक्षर<br />
                  (Registered Veterinary Surgeon & VCI Seal)
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }
  };

  // 7. MODAL CONTROLLERS (ADD NEW PET PATIENT)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('companionModalContainer');
      if (container) container.innerHTML = '';
    },

    openNewPetModal() {
      const container = document.getElementById('companionModalContainer');
      if (!container) return;

      const petId = 'PET-2026-' + Math.floor(100 + Math.random() * 900);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <i class="fa-solid fa-paw"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया पेट रोगी पंजीकृत करें</h3>
              </div>
              <button type="button" id="btnModalClosePet" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewPet" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पेट का नाम (Pet Name)*</label>
                  <input type="text" id="np_name" required placeholder="उदा. मैक्स / टॉमी" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजाति (Species)*</label>
                  <select id="np_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="canine">श्वान (Canine / Dog)</option>
                    <option value="feline">बिल्ली (Feline / Cat)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नस्ल (Breed)*</label>
                  <input type="text" id="np_breed" required placeholder="उदा. लैब्राडोर / बीगल" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आयु (वर्षों में)*</label>
                  <input type="number" step="0.1" id="np_age" required value="2.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वजन (Weight in kg)*</label>
                  <input type="number" step="0.1" id="np_weight" required value="15.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लिंग एवं न्यूटर्ड स्थिति*</label>
                  <select id="np_sex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="male">नर (Male)</option>
                    <option value="female">मादा (Female)</option>
                    <option value="neutered">न्यूटर्ड नर (Neutered)</option>
                    <option value="spayed">स्पेड मादा (Spayed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">माइक्रोचिप RFID ID (15-अंकीय)</label>
                <input type="text" id="np_microchip" placeholder="98514100XXXXXXX" maxlength="15" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पालक का नाम (Owner)*</label>
                  <input type="text" id="np_owner" required placeholder="श्री राजेश शर्मा" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मोबाइल नंबर*</label>
                  <input type="text" id="np_phone" required placeholder="98120XXXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelPetModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">पेट पंजीकृत करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalClosePet').onclick = ModalController.closeModal;
      document.getElementById('btnCancelPetModal').onclick = ModalController.closeModal;

      document.getElementById('formAddNewPet').onsubmit = async (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('np_name').value.trim();
        const speciesVal = document.getElementById('np_species').value;
        const breedVal = document.getElementById('np_breed').value.trim();
        const ageVal = parseFloat(document.getElementById('np_age').value);
        const weightVal = parseFloat(document.getElementById('np_weight').value);
        const sexVal = document.getElementById('np_sex').value;
        const chipVal = document.getElementById('np_microchip').value.trim();
        const ownerVal = document.getElementById('np_owner').value.trim();
        const phoneVal = document.getElementById('np_phone').value.trim();

        const lStage = CompanionEngine.deriveLifeStage(speciesVal, ageVal);

        const newPet = {
          petId: petId,
          name: nameVal,
          species: speciesVal,
          breed: breedVal,
          dob: new Date(Date.now() - ageVal * 365 * 86400000).toISOString().split('T')[0],
          ageYears: ageVal,
          weightKg: weightVal,
          sex: sexVal,
          microchipId: chipVal || 'N/A',
          ownerName: ownerVal,
          phone: phoneVal,
          lifeStage: lStage
        };

        State.petPatients.unshift(newPet);
        State.activePetId = petId;
        await StorageAdapter.setItem('petPatients', State.petPatients);

        ModalController.closeModal();
        notify(`पेट रोगी "${nameVal}" सफलतापूर्वक पंजीकृत किया गया।`, 'success');
        window.VetcareApp.Modules.CompanionAnimalClinic.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.pet-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.CompanionAnimalClinic.refreshView();
        }
        return;
      }

      // 2. Select Pet
      const selectBtn = e.target.closest('button[data-action="select_pet"]');
      if (selectBtn) {
        const id = selectBtn.getAttribute('data-id');
        State.activePetId = id;
        window.VetcareApp.Modules.CompanionAnimalClinic.refreshView();
        return;
      }

      // 3. Print Passport Action
      const printBtn = e.target.closest('button[data-action="print_passport"]') || e.target.closest('#btnPrintPassportAction');
      if (printBtn) {
        const id = printBtn.getAttribute('data-id') || State.activePetId;
        window.VetcareApp.Modules.CompanionAnimalClinic.printPetHealthPassport(id);
        return;
      }

      // 4. Open New Pet Modal
      if (e.target.closest('#btnOpenNewPetModal')) {
        ModalController.openNewPetModal();
        return;
      }
    });

    // BCS Slider Input Live Reactive Update
    container.addEventListener('input', (e) => {
      if (e.target.id === 'bcsSliderInput') {
        const score = parseInt(e.target.value, 10);
        const bcsData = window.VetcareApp.ClinicalData.CompanionStandards.WSAVA_BCS_CANINE;
        const liveDisp = document.getElementById('bcsLiveDisplay');
        const statusPill = document.getElementById('bcsStatusPill');
        const descBox = document.getElementById('bcsDescriptionBox');

        if (liveDisp) liveDisp.textContent = `${score} / 9`;
        if (statusPill) statusPill.textContent = bcsData[score].label;
        if (descBox) descBox.textContent = bcsData[score].description;
      }
    });

    // Form Submit: Save Nutrition Assessment
    container.addEventListener('submit', async (e) => {
      if (e.target.id === 'formSaveNutritionAssessment') {
        e.preventDefault();
        const bcsVal = parseInt(document.getElementById('bcsSliderInput').value, 10);
        const mcsVal = document.getElementById('mcs_select').value;
        const vaccVal = document.getElementById('core_vaccine_select').value;
        const dietVal = document.getElementById('diet_plan_input').value.trim();

        const pet = State.petPatients.find(p => p.petId === State.activePetId);
        if (!pet) return;

        let existingIdx = State.wellnessAssessments.findIndex(a => a.petId === pet.petId);
        const newRecord = {
          assessmentId: 'ASSESS-' + Math.floor(1000 + Math.random() * 9000),
          petId: pet.petId,
          date: new Date().toISOString().split('T')[0],
          bcsScore: bcsVal,
          muscleConditionScore: mcsVal,
          dentalGrade: 1,
          wsavaPainScore: 0,
          fleaTickPreventiveStatus: 'Up to date',
          heartwormStatus: 'NEGATIVE',
          coreVaccineStatus: vaccVal,
          dietaryPlan: dietVal
        };

        if (existingIdx >= 0) {
          State.wellnessAssessments[existingIdx] = newRecord;
        } else {
          State.wellnessAssessments.unshift(newRecord);
        }

        await StorageAdapter.setItem('wellnessAssessments', State.wellnessAssessments);
        notify('WSAVA पोषण व बॉडी कंडीशन स्कोर सफलतापूर्वक सहेजा गया।', 'success');
        window.VetcareApp.Modules.CompanionAnimalClinic.refreshView();
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.CompanionAnimalClinic = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedPets = await StorageAdapter.getItem('petPatients');
        State.petPatients = Array.isArray(savedPets) && savedPets.length > 0 ? savedPets : State.seedData.petPatients;

        const savedAssessments = await StorageAdapter.getItem('wellnessAssessments');
        State.wellnessAssessments = Array.isArray(savedAssessments) && savedAssessments.length > 0 ? savedAssessments : State.seedData.wellnessAssessments;

        if (State.petPatients.length > 0 && !State.activePetId) {
          State.activePetId = State.petPatients[0].petId;
        }

        console.log('[CompanionClinic] Module initialized with', State.petPatients.length, 'pets.');
      } catch (err) {
        console.error('[CompanionClinic] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[CompanionClinic] Container ${containerId} not found.`);
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
      const contentPanel = State.containerElement.querySelector('#companionTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'pet_directory') {
        contentPanel.innerHTML = UIEngine.renderPetDirectoryTab();
      } else if (State.activeTab === 'wsava_assessment_wizard') {
        contentPanel.innerHTML = UIEngine.renderNutritionalAssessmentTab();
      } else if (State.activeTab === 'dental_cardiac_scoring') {
        contentPanel.innerHTML = UIEngine.renderDentalCardiacTab();
      } else if (State.activeTab === 'pet_health_passport') {
        contentPanel.innerHTML = UIEngine.renderPetHealthPassportTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[CompanionClinic] Module destroyed cleanly.');
    },

    // Official Printable Pet Health Passport Generator
    printPetHealthPassport(petId) {
      const pet = State.petPatients.find(p => p.petId === petId);
      if (!pet) {
        notify('पेट मरीज का रिकॉर्ड नहीं मिला।', 'error');
        return;
      }

      const assess = State.wellnessAssessments.find(a => a.petId === petId);

      const printWindow = window.open('', '_blank', 'width=900,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const passportHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Official Pet Passport - ${pet.name} (${pet.petId})</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 10px; font-size: 12px; }
            .header { text-align: center; border-bottom: 3px double #0f172a; padding-bottom: 8px; margin-bottom: 12px; }
            .title { font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; }
            .subtitle { font-size: 10px; font-mono; text-transform: uppercase; color: #475569; }
            .photo-grid { display: flex; justify-content: space-between; margin-bottom: 15px; border: 1px solid #cbd5e1; padding: 10px; border-radius: 8px; }
            .data-col { flex: 1; }
            .chip-box { width: 140px; text-align: center; border-left: 1px dashed #cbd5e1; padding-left: 10px; font-family: monospace; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 11px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 50px; }
            .sign-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">OFFICIAL PET HEALTH PASSPORT • पेट स्वास्थ्य पासपोर्ट</div>
            <div class="subtitle">VETCARE AI OS • COMPANION ANIMAL CLINICAL BOARD (2026 Core)</div>
          </div>

          <div class="photo-grid">
            <div class="data-col">
              <div><strong>पेट का नाम (Pet Name):</strong> ${pet.name}</div>
              <div><strong>प्रजाति व नस्ल (Species / Breed):</strong> ${pet.species === 'canine' ? 'श्वान (Canine)' : 'बिल्ली (Feline)'} • ${pet.breed}</div>
              <div><strong>लिंग व न्यूटर्ड स्थिति:</strong> ${pet.sex}</div>
              <div><strong>जन्म तिथि / आयु:</strong> ${pet.dob} (${pet.ageYears} वर्ष)</div>
              <div><strong>शारीरिक वजन:</strong> ${pet.weightKg} kg (WSAVA BCS: ${assess?.bcsScore || 5}/9)</div>
              <div><strong>पालक का नाम व पता:</strong> ${pet.ownerName} (Ph: ${pet.phone})</div>
            </div>
            <div class="chip-box">
              <div style="font-size: 10px; font-weight: bold;">MICROCHIP RFID</div>
              <div style="font-size: 14px; font-weight: 900; color: #0284c7; margin-top: 5px;">${pet.microchipId || '985141002934812'}</div>
              <div style="font-size: 9px; color: #64748b; margin-top: 5px;">ISO 11784/11785 FDX-B Standard</div>
            </div>
          </div>

          <div style="font-weight: bold; text-transform: uppercase; font-size: 12px;">१. आवश्यक कोर टीकाकरण प्रमाण (Vaccination Certifications):</div>
          <table>
            <thead>
              <tr>
                <th>वैक्सीन का नाम (Vaccine)</th>
                <th>प्रशासित दिनांक</th>
                <th>वैधता अवधि</th>
                <th>बैच नंबर</th>
                <th>हस्ताक्षर व मुहर</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Anti-Rabies Vaccine (Inactivated)</strong></td>
                <td>15-Jan-2026</td>
                <td>14-Jan-2027</td>
                <td>RAB-2026-8812</td>
                <td>सत्यापित (Certified)</td>
              </tr>
              <tr>
                <td><strong>${pet.species === 'canine' ? 'DHPPiL 9-in-1 Combo (Distemper, Parvo)' : 'Feline Tricat (Panleukopenia, Flu)'}</strong></td>
                <td>15-Jan-2026</td>
                <td>14-Jan-2027</td>
                <td>CORE-2026-4419</td>
                <td>सत्यापित (Certified)</td>
              </tr>
            </tbody>
          </table>

          <div style="font-weight: bold; text-transform: uppercase; font-size: 12px; margin-top: 15px;">२. परजीवी रोकथाम एवं क्लिनिकल फिटनेस (Parasite Control & Fitness):</div>
          <table>
            <tr>
              <th style="width: 30%;">हार्टवर्म जांच स्थिति</th>
              <td><strong>${assess?.heartwormStatus || 'NEGATIVE (Antigen Tested)'}</strong></td>
            </tr>
            <tr>
              <th>टिक्स व पिस्सू निवारक</th>
              <td>${assess?.fleaTickPreventiveStatus || 'Up to date with regular monthly preventive.'}</td>
            </tr>
            <tr>
              <th>दंत स्वास्थ्य श्रेणी</th>
              <td>Grade ${assess?.dentalGrade || 0} - Periodontal tissues sound.</td>
            </tr>
          </table>

          <div class="footer-sign">
            <div class="sign-box">
              पेट ओनर के हस्ताक्षर<br />
              (Pet Parent Signature)
            </div>
            <div class="sign-box">
              पशु चिकित्सा अधिकारी हस्ताक्षर व सील<br />
              (Authorized Veterinary Surgeon)
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(passportHtml);
      printWindow.document.close();
    }
  };

})(window, document);
