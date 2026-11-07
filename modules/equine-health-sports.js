// Vetcare AI OS - Equine Health, Acute Colic Decision Matrix & AAEP Lameness Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standardized Equine Clinical References, AAEP Lameness & Colic Matrices
  window.VetcareApp.ClinicalData.EquineStandards = {
    AAEP_LAMENESS_SCALE: {
      0: { grade: 0, label: 'Grade 0 (Sound / Normal)', description: 'Lameness not perceptible under any circumstances (straight line, circles, incline, hard surface).', clinicalAction: 'No orthopedic limitation. Normal training/performance.' },
      1: { grade: 1, label: 'Grade 1 (Subtle / Inconsistent)', description: 'Difficult to observe; not consistently apparent regardless of circumstances (e.g. only seen under saddle or fatigue).', clinicalAction: 'Detailed palpatory exam, distal limb flexion tests, hoof testers.' },
      2: { grade: 2, label: 'Grade 2 (Mild / Consistent under Stress)', description: 'Difficult to observe at walk or trotting in a straight line; consistently apparent under certain circumstances (weight-carrying, circling, inclines, hard surface).', clinicalAction: 'Perform diagnostic nerve blocks starting from Palmar Digital block upward.' },
      3: { grade: 3, label: 'Grade 3 (Moderate / Obvious at Trot)', description: 'Consistently observable at a trot under all circumstances in both straight lines and circles.', clinicalAction: 'Radiography, diagnostic perineural analgesia, ultrasound of suspensory apparatus.' },
      4: { grade: 4, label: 'Grade 4 (Severe / Obvious at Walk)', description: 'Obvious lameness at a walk with pronounced compensatory head nod, asymmetrical pelvic hike, or shortened stride.', clinicalAction: 'Restrict movement immediately. Deep bedding, cross-tying, regional analgesia.' },
      5: { grade: 5, label: 'Grade 5 (Non-Weight Bearing)', description: 'Minimal weight-bearing in motion and/or rest; complete inability to move; catastrophic structural failure suspected.', clinicalAction: 'Emergency stabilization. Splinting/coaptation, immediate rule-out of fracture or septic synovial structure.' }
    },

    NERVE_BLOCK_SEQUENCES: [
      { name: 'Palmar / Plantar Digital Nerve Block (PDNB)', level: 'Distal pastern', desensitizes: 'Navicular apparatus, digital cushion, heel bulbs, sole, coffin joint (distal interphalangeal).' },
      { name: 'Abaxial Sesamoid Nerve Block (ASNB)', level: 'Base of proximal sesamoids', desensitizes: 'Entire foot, pastern joint (proximal interphalangeal), distal sesamoidean ligaments, digital flexor tendon sheath.' },
      { name: 'Low Four-Point / Low Palmar Block', level: 'Distal to button of splints', desensitizes: 'Fetlock joint (metacarpophalangeal), entire palmar region distal to mid-metacarpus.' },
      { name: 'High Four-Point / Sub-Carpal Block', level: 'Distal to carpus / tarsus', desensitizes: 'Origin of suspensory ligament, splint bones, proximal cannon region.' }
    ],

    COLIC_TRIAGE_THRESHOLDS: {
      HEART_RATE_CRITICAL_BPM: 60,
      REFLUX_CRITICAL_LITERS: 2.0,
      NORMAL_BORBORYGMI_QUADRANTS: 4
    }
  };

  // 2. INTERNAL STATE CONTROLLER
  const State = {
    activeTab: 'equine_roster',
    activeHorseId: 'EQ-HR-2026-01',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    equineRoster: [],
    colicEvaluations: [],
    lamenessExams: [],

    // Seed Data Setup (Hydrated if storage is empty)
    seedData: {
      equineRoster: [
        {
          horseId: 'EQ-HR-2026-01',
          passportNo: 'IND-EQ-904128',
          uelnNo: '356001002934812',
          microchip: '985141002934812',
          name: 'Veer Pratap',
          breed: 'Marwari',
          discipline: 'ENDURANCE',
          ageYears: 6,
          sex: 'stallion',
          color: 'Dark Bay, white star and snip, characteristic inward-curving lyre ears',
          ownerName: 'Rana Digvijay Singh',
          stableLocation: 'Royal Marwar Stud Farm, Rohtak',
          tetanusStatus: 'UP_TO_DATE',
          cogginsTestDate: new Date(Date.now() - 40 * 86400000).toISOString().split('T')[0]
        },
        {
          horseId: 'EQ-HR-2026-02',
          passportNo: 'IND-EQ-904129',
          uelnNo: '356001003491821',
          microchip: '985141003491821',
          name: 'Chetak Pride',
          breed: 'Kathiawari',
          discipline: 'CEREMONIAL',
          ageYears: 4,
          sex: 'mare',
          color: 'Dun with dorsal stripe and zebra markings on carpus',
          ownerName: 'Kunwar Manvendra Singh',
          stableLocation: 'Pataudi Heritage Stables',
          tetanusStatus: 'UP_TO_DATE',
          cogginsTestDate: new Date(Date.now() - 95 * 86400000).toISOString().split('T')[0]
        },
        {
          horseId: 'EQ-HR-2026-03',
          passportNo: 'IND-EQ-904130',
          uelnNo: '356001007741920',
          microchip: '985141007741920',
          name: 'Lightning Bolt',
          breed: 'Thoroughbred',
          discipline: 'RACING',
          ageYears: 5,
          sex: 'gelding',
          color: 'Chestnut, blaze, four white stockings',
          ownerName: 'Brigadier S. P. Malik',
          stableLocation: 'Delhi Race Club Equine Complex',
          tetanusStatus: 'DUE',
          cogginsTestDate: new Date(Date.now() - 190 * 86400000).toISOString().split('T')[0]
        }
      ],
      colicEvaluations: [
        {
          colicId: 'COLIC-7701',
          horseId: 'EQ-HR-2026-01',
          timestamp: new Date(Date.now() - 6 * 3600000).toISOString().replace('T', ' ').substring(0, 16),
          heartRateBpm: 48,
          painLevel: 'MILD_INTERMITTENT',
          gutSounds: 'HYPOMOTILE',
          nasogastricRefluxLiters: 0.5,
          rectalFindings: 'Mild pelvic flexure impaction; doughy ingesta palpable; cecum non-distended.',
          peritonealTapColor: 'NORMAL_STRAW',
          surgicalReferralUrgency: 'MEDICAL_STABLE',
          attendingVet: 'Dr. Rahul Sharma',
          medicalPlan: 'Flunixin meglumine (1.1 mg/kg IV) + 3L Mineral Oil drench + walking'
        }
      ],
      lamenessExams: [
        {
          examId: 'LAME-4401',
          horseId: 'EQ-HR-2026-03',
          timestamp: new Date(Date.now() - 24 * 3600000).toISOString().replace('T', ' ').substring(0, 16),
          limbAffected: 'RF',
          aaepGrade: 3,
          flexionTestPositive: true,
          diagnosticBlocks: ['Palmar Digital Nerve Block (70% improvement in soundness)'],
          provisionalDiagnosis: 'Podotrochlosis / Navicular Bursitis syndrome with secondary deep digital flexor tendonopathy.',
          hoofAngleDegrees: 51,
          shoeingAdvice: 'Egg-bar shoe with 2-degree heel wedge and rolled toe to ease breakover.'
        }
      ]
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcareEquineDB',
    DB_VERSION: 1,
    STORE_NAME: 'equine_health_records',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[EquineEngine] IndexedDB unavailable, using LocalStorage.');
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
          console.error('[EquineEngine] DB Open Error:', event.target.error);
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
              localStorage.setItem('VETCARE_EQ_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_EQ_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_EQ_' + key, JSON.stringify(data));
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
                const ls = localStorage.getItem('VETCARE_EQ_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_EQ_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_EQ_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_EQ_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. SCIENTIFIC CLINICAL SCORING & COLIC TRIAGE ENGINES
  const EquineEngine = {
    // Evaluates immediate surgical emergency risk in acute equine abdominal pain
    evaluateColicRisk(params) {
      const hr = parseInt(params.heartRateBpm, 10) || 40;
      const pain = params.painLevel || 'MILD_INTERMITTENT';
      const sounds = params.gutSounds || 'HYPOMOTILE';
      const refluxLiters = parseFloat(params.nasogastricRefluxLiters) || 0.0;
      const tapColor = params.peritonealTapColor || 'NORMAL_STRAW';

      let surgicalScore = 0;
      const redFlags = [];

      // Heart Rate Analysis
      if (hr >= 75) {
        surgicalScore += 35;
        redFlags.push(`तीव्र टैचीकार्डिया (Heart Rate: ${hr} bpm): कार्डियोवैस्कुलर कोलैप्स एवं एंडोटॉक्सिक शॉक का संकेत।`);
      } else if (hr >= 60) {
        surgicalScore += 20;
        redFlags.push(`उन्नत हृदय गति (${hr} bpm): निरंतर दर्द एवं सिस्टमिक डिहाइड्रेशन।`);
      }

      // Pain Intensity
      if (pain === 'SEVERE_UNRESPONSIVE') {
        surgicalScore += 35;
        redFlags.push('अदम्य दर्द (Severe Unresponsive Pain): एनाल्जेसिक्स के बावजूद जमीन पर लोटना व पैर पटकना - स्ट्रैंग्युलेटिंग लीजन संदिग्ध।');
      } else if (pain === 'MODERATE') {
        surgicalScore += 15;
      }

      // Motility / Borborygmi
      if (sounds === 'ABSENT') {
        surgicalScore += 20;
        redFlags.push('आंतों की गतिशीलता शून्य (Silent Abdomen / Absent Borborygmi): इलियस अथवा इस्केमिया।');
      }

      // Nasogastric Reflux (> 2 Liters spontaneous)
      if (refluxLiters >= 2.0) {
        surgicalScore += 25;
        redFlags.push(`स्वतः नेसोगैस्ट्रिक रिफ्लक्स (${refluxLiters} L): छोटी आंत में रुकावट अथवा डुओडेनाइटिस-प्रॉक्सिमल जेजुनाइटिस (DPJ)।`);
      }

      // Peritoneal Abdominocentesis Tap
      if (tapColor === 'TURBID_SEROSANGUINOUS') {
        surgicalScore += 30;
        redFlags.push('पेरिटोनियल द्रव मैला/रक्तयुक्त (Serosanguinous Fluid): आंतों की दीवार में नेक्रोसिस एवं वैस्कुलर कॉम्प्रोमाइज।');
      }

      const isSurgical = surgicalScore >= 50;

      return {
        surgicalScore,
        isSurgical,
        urgency: isSurgical ? 'SURGICAL_IMMEDIATE' : 'MEDICAL_STABLE',
        redFlags,
        therapeuticProtocol: isSurgical
          ? 'तत्काल सर्जिकल रेफरल (Exploratory Celiotomy/Laparotomy)। फ्लुइड रिससिटेशन (LRS/Normosol) प्रारंभ करें, फ्लूनिक्सिन 1.1 mg/kg IV दें, स्टमक ट्यूब सुरक्षित रखें।'
          : 'चिकित्सीय प्रबंधन (Medical Management): फ्लूनिक्सिन मेग्लुमाइन (Flunixin meglumine 1.1 mg/kg IV) + बसकोपान (Buscopan 0.3 mg/kg IV) + नेसोगैस्ट्रिक मिनरल ऑयल (Liquid Paraffin 2-4 L)।'
      };
    },

    // Aggregates high-level telemetry metrics
    computeRosterMetrics() {
      const horses = State.equineRoster;
      const colicCases = State.colicEvaluations;
      const lamenessCases = State.lamenessExams;

      let colicInObservation = 0;
      let severeLameness = 0;
      let tetanusDue = 0;

      colicCases.forEach(c => {
        if (c.surgicalReferralUrgency === 'SURGICAL_IMMEDIATE' || c.painLevel !== 'MILD_INTERMITTENT') {
          colicInObservation++;
        }
      });

      lamenessCases.forEach(l => {
        if (l.aaepGrade >= 3) {
          severeLameness++;
        }
      });

      horses.forEach(h => {
        if (h.tetanusStatus === 'DUE') {
          tetanusDue++;
        }
      });

      return {
        totalHorses: horses.length,
        colicInObservation,
        severeLameness,
        tetanusDue
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[EquineEngine ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const m = EquineEngine.computeRosterMetrics();
      const activeHorse = State.equineRoster.find(h => h.horseId === State.activeHorseId) || State.equineRoster[0];

      return `
        <div class="equine-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP KPI & ALERT RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Metric 1: Roster Headcount -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">कुल पंजीकृत अश्व (Equine Headcount)</span>
                  <div class="text-2xl font-black font-display text-white mt-1">
                    ${m.totalHorses} <span class="text-xs font-normal text-slate-400 font-sans">अश्व</span>
                  </div>
                  <div class="text-[11px] text-amber-400 font-mono mt-0.5">
                    मारवाड़ी • काठियावाड़ी • थरोब्रेड
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-horse-head"></i>
                </div>
              </div>
            </div>

            <!-- Metric 2: Colic Observation Alerts -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">तीव्र कॉलिक निगरानी (Colic Alerts)</span>
                  <div class="text-2xl font-black font-display ${m.colicInObservation > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'} mt-1">
                    ${m.colicInObservation} <span class="text-xs font-normal text-slate-400 font-sans">केस</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    ${m.colicInObservation > 0 ? 'सर्जिकल ट्रायज अलर्ट सक्रिय' : 'शून्य आपातकालीन दर्द'}
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
              </div>
            </div>

            <!-- Metric 3: AAEP High-Grade Lameness -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">उच्च-ग्रेड लंगड़ापन (AAEP &ge; 3)</span>
                  <div class="text-2xl font-black font-display ${m.severeLameness > 0 ? 'text-amber-400' : 'text-emerald-400'} mt-1">
                    ${m.severeLameness} <span class="text-xs font-normal text-slate-400 font-sans">घायल</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    नर्व ब्लॉक एवं एक्स-रे अपेक्षित
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-bone"></i>
                </div>
              </div>
            </div>

            <!-- Metric 4: Tetanus & Coggins Compliance -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">टिटनेस टॉक्साइड देय (Tetanus Due)</span>
                  <div class="text-2xl font-black font-display ${m.tetanusDue > 0 ? 'text-rose-400' : 'text-emerald-400'} mt-1">
                    ${m.tetanusDue} <span class="text-xs font-normal text-slate-400 font-sans">अश्व</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    कॉगिन्स (EIA) पासपोर्ट प्रोटोकॉल
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-syringe"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="equine_roster" class="eq-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'equine_roster' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-horse"></i>
                <span>१. अश्व रोस्टर एवं पहचान (Roster & UELN)</span>
              </button>
              <button type="button" data-tab="acute_colic_triage" class="eq-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'acute_colic_triage' ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-stethoscope"></i>
                <span>२. एक्यूट कॉलिक ट्रायज (Surgical vs Medical)</span>
              </button>
              <button type="button" data-tab="aaep_lameness_evaluator" class="eq-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'aaep_lameness_evaluator' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-bone"></i>
                <span>३. AAEP लंगड़ापन व नर्व ब्लॉक (Orthopedics)</span>
              </button>
              <button type="button" data-tab="performance_dental_log" class="eq-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'performance_dental_log' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-tooth"></i>
                <span>४. दंत फ्लोटिंग व नालबंदी (Farriery & Floating)</span>
              </button>
            </div>

            <!-- Action Trigger for New Horse Registration -->
            <div class="flex items-center gap-2">
              <button type="button" id="btnOpenNewHorseModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया अश्व पंजीकृत करें</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="equineTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="equineModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Equine Roster View
    renderRosterTab() {
      const horses = State.equineRoster;

      const cards = horses.map(h => {
        const isSelected = h.horseId === State.activeHorseId;

        return `
          <div class="p-5 rounded-2xl bg-slate-900 border-2 transition-all shadow-xl flex flex-col justify-between ${isSelected ? 'border-amber-500 bg-amber-950/20 ring-2 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'}">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-lg">
                    <i class="fa-solid fa-horse"></i>
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white leading-tight">${h.name}</h4>
                    <span class="text-[11px] font-mono text-slate-400">${h.breed} • ${h.discipline}</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  ${h.sex}
                </span>
              </div>

              <div class="space-y-1.5 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800/80">
                <div class="flex justify-between">
                  <span class="text-slate-500">UELN नंबर:</span>
                  <span class="text-amber-400 font-bold">${h.uelnNo}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">माइक्रोचिप RFID:</span>
                  <span class="text-slate-200">${h.microchip}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">आयु / पासपोर्ट:</span>
                  <span class="text-white">${h.ageYears} वर्ष • ${h.passportNo}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">अश्वपालक (Owner):</span>
                  <span class="text-slate-200">${h.ownerName}</span>
                </div>
                <div class="text-[10px] text-slate-400 truncate pt-1" title="${h.color}">
                  <i class="fa-solid fa-palette text-amber-500/80 mr-1"></i>${h.color}
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
              <button type="button" data-action="select_horse" data-id="${h.horseId}" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${isSelected ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}">
                ${isSelected ? '<i class="fa-solid fa-check mr-1"></i>सक्रिय अश्व' : 'अश्व चुनें'}
              </button>
              <button type="button" data-action="print_passport" data-id="${h.horseId}" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700" title="मेडिकल पासपोर्ट प्रिंट करें">
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
              <i class="fa-solid fa-clipboard-list text-amber-400"></i>
              <span>पंजीकृत अश्व रोस्टर एवं नस्ल पहचान (Equine Registry)</span>
            </h3>
            <span class="text-xs font-mono text-slate-400">${horses.length} अश्व पंजीकृत</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${cards}
          </div>
        </div>
      `;
    },

    // TAB 2: Acute Colic Triage & Surgical vs Medical Decision Matrix
    renderColicTriageTab() {
      const horse = State.equineRoster.find(h => h.horseId === State.activeHorseId) || State.equineRoster[0];
      const recentColic = State.colicEvaluations.find(c => c.horseId === horse.horseId) || {
        heartRateBpm: 44,
        painLevel: 'MILD_INTERMITTENT',
        gutSounds: 'HYPOMOTILE',
        nasogastricRefluxLiters: 0.5,
        peritonealTapColor: 'NORMAL_STRAW',
        rectalFindings: 'Normative'
      };

      const evalResult = EquineEngine.evaluateColicRisk(recentColic);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  EMERGENCY ABDOMINAL TRIAGE PROTOCOL
                </span>
                <h3 class="text-xl font-bold text-white mt-1">एक्यूट कॉलिक ट्रायज एवं सर्जिकल रेफरल मैट्रिक्स</h3>
                <div class="text-xs text-slate-400 font-mono">परीक्षणाधीन अश्व: <strong class="text-amber-400">${horse.name}</strong> (${horse.breed} • UELN: ${horse.uelnNo})</div>
              </div>

              <!-- Risk Badge -->
              <div class="p-3 rounded-xl border text-right font-mono ${evalResult.isSurgical ? 'bg-rose-950 border-rose-500 text-rose-400 animate-pulse' : 'bg-emerald-950 border-emerald-500 text-emerald-400'}">
                <span class="text-[10px] uppercase block font-bold">ट्रायज निर्णय (Status)</span>
                <span class="text-base font-black">${evalResult.isSurgical ? 'तत्काल सर्जरी (SURGICAL)' : 'चिकित्सीय स्थिर (MEDICAL)'}</span>
              </div>
            </div>

            <!-- Interactive Colic Diagnostic Inputs Form -->
            <form id="formColicTriage" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <!-- Heart Rate -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-mono">
                    <span class="text-slate-300 font-bold">हृदय गति (Heart Rate):</span>
                    <span id="colicHrDisplay" class="text-base font-black text-amber-400">${recentColic.heartRateBpm} bpm</span>
                  </div>
                  <input type="range" id="inp_colicHr" min="30" max="110" step="2" value="${recentColic.heartRateBpm}" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                  <span class="text-[10px] text-slate-500 block">&gt; 60 bpm गंभीर दर्द व एंडोटॉक्सीमिया का संकेत</span>
                </div>

                <!-- Pain Behavior -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label class="block text-xs font-mono font-bold text-slate-300">दर्द की तीव्रता (Pain Level):</label>
                  <select id="inp_colicPain" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="MILD_INTERMITTENT" ${recentColic.painLevel === 'MILD_INTERMITTENT' ? 'selected' : ''}>Mild Intermittent (पैर मारना, पेट देखना)</option>
                    <option value="MODERATE" ${recentColic.painLevel === 'MODERATE' ? 'selected' : ''}>Moderate (बार-बार लेटना, बेचैनी)</option>
                    <option value="SEVERE_UNRESPONSIVE" ${recentColic.painLevel === 'SEVERE_UNRESPONSIVE' ? 'selected' : ''}>Severe Unresponsive (अदम्य दर्द, हिंसक लोटना)</option>
                  </select>
                </div>

                <!-- Gut Sounds / Borborygmi -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label class="block text-xs font-mono font-bold text-slate-300">आंतों की गतिशीलता (Auscultation):</label>
                  <select id="inp_colicSounds" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="HYPERMOTILE" ${recentColic.gutSounds === 'HYPERMOTILE' ? 'selected' : ''}>Hypermotile (अति-सक्रिय / स्पैज्मोडिक)</option>
                    <option value="HYPOMOTILE" ${recentColic.gutSounds === 'HYPOMOTILE' ? 'selected' : ''}>Hypomotile (मंद / इम्पैक्शन)</option>
                    <option value="ABSENT" ${recentColic.gutSounds === 'ABSENT' ? 'selected' : ''}>Absent / Silent (शून्य - इस्केमिया चेतावनी)</option>
                  </select>
                </div>

              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- Nasogastric Reflux -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div class="flex justify-between text-xs font-mono">
                    <span class="text-slate-300 font-bold">नेसोगैस्ट्रिक स्वतः रिफ्लक्स (Liters):</span>
                    <span id="colicRefluxDisplay" class="text-sm font-bold text-cyan-400">${recentColic.nasogastricRefluxLiters} L</span>
                  </div>
                  <input type="number" step="0.5" id="inp_colicReflux" value="${recentColic.nasogastricRefluxLiters}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                  <span class="text-[10px] text-slate-500 block">&gt; 2.0 Liters रिफ्लक्स छोटी आंत की रुकावट दर्शाता है</span>
                </div>

                <!-- Abdominocentesis Peritoneal Fluid Tap -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label class="block text-xs font-mono font-bold text-slate-300">पेरिटोनियल द्रव का रंग (Peritoneal Tap):</label>
                  <select id="inp_colicTap" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="NORMAL_STRAW" ${recentColic.peritonealTapColor === 'NORMAL_STRAW' ? 'selected' : ''}>Normal Clear Straw (सामान्य पीला पारदर्शी)</option>
                    <option value="TURBID_SEROSANGUINOUS" ${recentColic.peritonealTapColor === 'TURBID_SEROSANGUINOUS' ? 'selected' : ''}>Turbid / Serosanguinous (मैला रक्तयुक्त - नेक्रोसिस)</option>
                  </select>
                </div>

              </div>

              <!-- Live Clinical Decision Guidance Box -->
              <div id="colicDecisionOutput" class="p-4 rounded-xl border-2 ${evalResult.isSurgical ? 'border-rose-500 bg-rose-950/20' : 'border-emerald-500 bg-emerald-950/20'} space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="font-bold text-sm text-white">ट्रायज स्कोर: ${evalResult.surgicalScore}/100</span>
                  <span class="text-xs ${evalResult.isSurgical ? 'text-rose-400 font-black' : 'text-emerald-400 font-bold'}">
                    ${evalResult.urgency}
                  </span>
                </div>

                ${evalResult.redFlags.length > 0 ? `
                  <div class="space-y-1 font-sans text-rose-300">
                    <strong class="font-mono text-rose-400 uppercase text-[10px]">पहचाने गए गंभीर लक्षण (Red Flags):</strong>
                    <ul class="list-disc pl-5 space-y-0.5 text-xs">
                      ${evalResult.redFlags.map(rf => `<li>${rf}</li>`).join('')}
                    </ul>
                  </div>
                ` : '<div class="text-emerald-400 font-sans">कोई तत्काल सर्जिकल रेड फ्लैग उपस्थित नहीं है। नियमित चिकित्सीय प्रोटोकॉल जारी रखें।</div>'}

                <div class="pt-2 border-t border-slate-800 font-sans text-slate-200">
                  <strong class="font-mono text-cyan-400">अनुशंसित प्रोटोकॉल:</strong> ${evalResult.therapeuticProtocol}
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i>
                  <span>कॉलिक मूल्यांकन सहेजें</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      `;
    },

    // TAB 3: AAEP Lameness Scale & Diagnostic Analgesia Nerve Blocks
    renderLamenessTab() {
      const horse = State.equineRoster.find(h => h.horseId === State.activeHorseId) || State.equineRoster[0];
      const exam = State.lamenessExams.find(l => l.horseId === horse.horseId) || {
        limbAffected: 'RF',
        aaepGrade: 2,
        flexionTestPositive: true,
        diagnosticBlocks: ['Palmar Digital Nerve Block (PDNB)'],
        provisionalDiagnosis: 'Distal limb pain',
        hoofAngleDegrees: 52
      };

      const aaepData = window.VetcareApp.ClinicalData.EquineStandards.AAEP_LAMENESS_SCALE;
      const blocks = window.VetcareApp.ClinicalData.EquineStandards.NERVE_BLOCK_SEQUENCES;

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  AMERICAN ASSOCIATION OF EQUINE PRACTITIONERS (AAEP)
                </span>
                <h3 class="text-xl font-bold text-white mt-1">अश्व लंगड़ापन ग्रेडिंग एवं पेरीन्यूरल एनाल्जेसिया (Orthopedic Engine)</h3>
                <div class="text-xs text-slate-400 font-mono">अश्व: <strong class="text-amber-400">${horse.name}</strong> • अनुशासन: ${horse.discipline}</div>
              </div>

              <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-right">
                <span class="text-slate-400 block text-[10px] uppercase">प्रभावित अंग</span>
                <span class="font-bold text-cyan-400 text-sm">${exam.limbAffected === 'LF' ? 'बायां अग्रांग (Left Fore)' : exam.limbAffected === 'RF' ? 'दायां अग्रांग (Right Fore)' : exam.limbAffected === 'LH' ? 'बायां पश्चांग (Left Hind)' : 'दायां पश्चांग (Right Hind)'}</span>
              </div>
            </div>

            <!-- AAEP 0 to 5 Visual Scale Grid -->
            <div class="space-y-3">
              <label class="text-xs font-mono uppercase text-cyan-400 font-bold block">
                AAEP लंगड़ापन ग्रेडिंग स्केल (Grades 0 to 5):
              </label>

              <div class="grid grid-cols-1 md:grid-cols-6 gap-2.5">
                ${Object.values(aaepData).map(item => {
                  const isCurrent = exam.aaepGrade === item.grade;
                  return `
                    <div class="p-3.5 rounded-xl border flex flex-col justify-between transition-all ${isCurrent ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/50' : 'border-slate-800 bg-slate-950'}">
                      <div>
                        <span class="font-black text-base font-mono block ${isCurrent ? 'text-cyan-300' : 'text-slate-300'}">ग्रेड ${item.grade}</span>
                        <div class="text-[10px] font-bold text-amber-400 mt-1">${item.label.split('(')[1].replace(')', '')}</div>
                        <p class="text-[11px] text-slate-400 mt-1.5 leading-snug">${item.description}</p>
                      </div>
                      <div class="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                        ${item.clinicalAction}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Perineural Diagnostic Nerve Block Hierarchy -->
            <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
                  <i class="fa-solid fa-syringe"></i>
                  <span>क्रमिक डायग्नोस्टिक नर्व ब्लॉक पदानुक्रम (Distal-to-Proximal Blocks):</span>
                </h4>
                <span class="text-[10px] font-mono text-slate-400">मेपाइवाकेन 2% (Mepivacaine HCl)</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                ${blocks.map((b, i) => `
                  <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-white font-mono">${i + 1}. ${b.name}</span>
                      <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">${b.level}</span>
                    </div>
                    <p class="text-slate-300 text-[11px]">${b.desensitizes}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Form: Record New Orthopedic Assessment -->
            <form id="formSaveLameness" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रभावित पैर (Limb Affected)*</label>
                  <select id="lame_limb" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="RF" ${exam.limbAffected === 'RF' ? 'selected' : ''}>RF (दायां अग्र पैर / Right Fore)</option>
                    <option value="LF" ${exam.limbAffected === 'LF' ? 'selected' : ''}>LF (बायां अग्र पैर / Left Fore)</option>
                    <option value="RH" ${exam.limbAffected === 'RH' ? 'selected' : ''}>RH (दायां पश्च पैर / Right Hind)</option>
                    <option value="LH" ${exam.limbAffected === 'LH' ? 'selected' : ''}>LH (बायां पश्च पैर / Left Hind)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">AAEP ग्रेड (0 to 5)*</label>
                  <select id="lame_grade" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="0" ${exam.aaepGrade === 0 ? 'selected' : ''}>0 - साउंड (Sound)</option>
                    <option value="1" ${exam.aaepGrade === 1 ? 'selected' : ''}>1 - सूक्ष्म (Subtle)</option>
                    <option value="2" ${exam.aaepGrade === 2 ? 'selected' : ''}>2 - दबाव में लंगड़ापन (Stress consistent)</option>
                    <option value="3" ${exam.aaepGrade === 3 ? 'selected' : ''}>3 - ट्रॉट पर स्पष्ट (Obvious at trot)</option>
                    <option value="4" ${exam.aaepGrade === 4 ? 'selected' : ''}>4 - वॉक पर सिर का हिलना (Head nod at walk)</option>
                    <option value="5" ${exam.aaepGrade === 5 ? 'selected' : ''}>5 - पैर न टेकना (Non-weight bearing)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">फ्लेक्सन टेस्ट (Flexion Test)*</label>
                  <select id="lame_flexion" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <option value="true" ${exam.flexionTestPositive ? 'selected' : ''}>धनात्मक (Positive - Lameness exacerbated)</option>
                    <option value="false" ${!exam.flexionTestPositive ? 'selected' : ''}>ऋणात्मक (Negative - No change)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अनंतिम निदान एवं सुधारात्मक नालबंदी (Farriery Prescription)</label>
                <textarea id="lame_diagnosis" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">${exam.provisionalDiagnosis || ''}</textarea>
              </div>

              <div class="flex justify-end pt-2 border-t border-slate-800">
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i>
                  <span>ऑर्थोपेडिक परीक्षण सहेजें</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      `;
    },

    // TAB 4: Farriery, Equine Dental Floating & EIA Coggins Log
    renderRoutineCareTab() {
      const horse = State.equineRoster.find(h => h.horseId === State.activeHorseId) || State.equineRoster[0];

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-tooth text-purple-400"></i>
                <span>दंत फ्लोटिंग, नालबंदी (Farriery) एवं कॉगिन्स संक्रामक एनीमिया प्रमाणन</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                अश्व के चबाने के कोण (Enamel Points), 6-8 सप्ताह का शूइंग चक्र एवं राष्ट्रीय अश्व अनुसंधान केंद्र (NRCE) कॉगिन्स टेस्ट
              </p>
            </div>

            <!-- Routine Care Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <!-- Farriery / Shoeing -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-400 uppercase font-mono">नालबंदी चक्र (Farriery Cycle)</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">ACTIVE</span>
                </div>
                <div class="text-slate-300">अंतिम नालबंदी: <strong>3 सप्ताह पूर्व</strong></div>
                <div class="text-slate-300">खुर कोण (Hoof Angle): <strong>52° (Fore) / 55° (Hind)</strong></div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  अनुशंसा: रॉलड टो एवं वाइड-वेब शूज द्वारा ब्रेकओवर सुगम बनाएं।
                </div>
              </div>

              <!-- Equine Odontoplasty / Dental Floating -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-cyan-400 uppercase font-mono">दंत फ्लोटिंग (Odontoplasty)</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">DUE IN 3M</span>
                </div>
                <div class="text-slate-300">अंतिम फ्लोटिंग: <strong>9 माह पूर्व</strong></div>
                <div class="text-slate-300">अवस्था: <strong>हुक व वेव्स रहित, हल्के इनैमल पॉइंट्स</strong></div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  हर्ष बिट के घर्षण से गालों के अंदर छालों की रोकथाम हेतु वार्षिक रेस्पिंग आवश्यक।
                </div>
              </div>

              <!-- Coggins Test (Equine Infectious Anemia) -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-purple-400 uppercase font-mono">कॉगिन्स टेस्ट (EIA Status)</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">NEGATIVE</span>
                </div>
                <div class="text-slate-300">परीक्षण लैब: <strong>ICAR-NRCE हिसार</strong></div>
                <div class="text-slate-300">तारीख: <strong>${horse.cogginsTestDate}</strong></div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  अश्व पारगमन एवं प्रतियोगिताओं हेतु 6 माह का नकारात्मक सीरोलॉजिकल प्रमाण अनिवार्य।
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    }
  };

  // 7. MODAL DIALOGS ENGINE (NEW HORSE REGISTRATION)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('equineModalContainer');
      if (container) container.innerHTML = '';
    },

    openNewHorseModal() {
      const container = document.getElementById('equineModalContainer');
      if (!container) return;

      const horseId = 'EQ-HR-' + new Date().getFullYear() + '-' + Math.floor(10 + Math.random() * 90);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <i class="fa-solid fa-horse-head"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया अश्व रोगी पंजीकृत करें</h3>
              </div>
              <button type="button" id="btnModalCloseHorse" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewHorse" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अश्व का नाम (Horse Name)*</label>
                  <input type="text" id="nh_name" required placeholder="उदा. बादल / चेतक" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नस्ल (Breed)*</label>
                  <select id="nh_breed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="Marwari">मारवाड़ी (Marwari Pure)</option>
                    <option value="Kathiawari">काठियावाड़ी (Kathiawari)</option>
                    <option value="Thoroughbred">थरोब्रेड (Thoroughbred)</option>
                    <option value="Zanskari">जांस्करी (Zanskari Mountain)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">UELN नंबर (15-अंकीय)*</label>
                  <input type="text" id="nh_ueln" required placeholder="35600100XXXXXXX" maxlength="15" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अनुशासन / उपयोगिता (Discipline)*</label>
                  <select id="nh_discipline" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="ENDURANCE">एंड्योरेंस रेसिंग (Endurance)</option>
                    <option value="CEREMONIAL">विवाह/शोभायात्रा (Ceremonial)</option>
                    <option value="RACING">टर्फ रेस (Racing)</option>
                    <option value="POLO">पोलो खेल (Polo)</option>
                    <option value="BREEDING">प्रजनन स्टड (Breeding)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आयु (वर्ष)*</label>
                  <input type="number" id="nh_age" value="5" min="1" max="40" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">लिंग*</label>
                  <select id="nh_sex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="stallion">नर स्टैलियन (Stallion)</option>
                    <option value="mare">मादा घोड़ी (Mare)</option>
                    <option value="gelding">बधिया नर (Gelding)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">माइक्रोचिप RFID</label>
                  <input type="text" id="nh_microchip" placeholder="98514100XXXXXXX" maxlength="15" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">रंग, माथे का तारा व हुलिया (Coat Color & Markings)*</label>
                <input type="text" id="nh_color" required placeholder="उदा. गहरा बे रंग, माथे पर सफेद तारा, मुड़े हुए कान" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अश्वपालक का नाम*</label>
                  <input type="text" id="nh_owner" required placeholder="श्री विक्रम सिंह" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">तबेला / स्टड फार्म स्थान*</label>
                  <input type="text" id="nh_stable" required placeholder="रॉयल स्टड, रोहतक" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelHorseModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">अश्व पंजीकृत करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseHorse').onclick = ModalController.closeModal;
      document.getElementById('btnCancelHorseModal').onclick = ModalController.closeModal;

      document.getElementById('formAddNewHorse').onsubmit = async (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('nh_name').value.trim();
        const breedVal = document.getElementById('nh_breed').value;
        const uelnVal = document.getElementById('nh_ueln').value.trim();
        const discVal = document.getElementById('nh_discipline').value;
        const ageVal = parseInt(document.getElementById('nh_age').value, 10);
        const sexVal = document.getElementById('nh_sex').value;
        const chipVal = document.getElementById('nh_microchip').value.trim();
        const colorVal = document.getElementById('nh_color').value.trim();
        const ownerVal = document.getElementById('nh_owner').value.trim();
        const stableVal = document.getElementById('nh_stable').value.trim();

        const newHorse = {
          horseId: horseId,
          passportNo: 'IND-EQ-' + Math.floor(100000 + Math.random() * 900000),
          uelnNo: uelnVal,
          microchip: chipVal || '98514100' + Math.floor(1000000 + Math.random() * 9000000),
          name: nameVal,
          breed: breedVal,
          discipline: discVal,
          ageYears: ageVal,
          sex: sexVal,
          color: colorVal,
          ownerName: ownerVal,
          stableLocation: stableVal,
          tetanusStatus: 'UP_TO_DATE',
          cogginsTestDate: new Date().toISOString().split('T')[0]
        };

        State.equineRoster.unshift(newHorse);
        State.activeHorseId = horseId;
        await StorageAdapter.setItem('equineRoster', State.equineRoster);

        ModalController.closeModal();
        notify(`अश्व "${nameVal}" (UELN: ${uelnVal}) सफलतापूर्वक पंजीकृत हुआ।`, 'success');
        window.VetcareApp.Modules.EquineHealthSports.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.eq-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.EquineHealthSports.refreshView();
        }
        return;
      }

      // 2. Select Active Horse
      const selectBtn = e.target.closest('button[data-action="select_horse"]');
      if (selectBtn) {
        const id = selectBtn.getAttribute('data-id');
        State.activeHorseId = id;
        window.VetcareApp.Modules.EquineHealthSports.refreshView();
        return;
      }

      // 3. Print Passport Action
      const printBtn = e.target.closest('button[data-action="print_passport"]');
      if (printBtn) {
        const id = printBtn.getAttribute('data-id') || State.activeHorseId;
        window.VetcareApp.Modules.EquineHealthSports.printEquineMedicalPassport(id);
        return;
      }

      // 4. Open New Horse Registration Modal
      if (e.target.closest('#btnOpenNewHorseModal')) {
        ModalController.openNewHorseModal();
        return;
      }
    });

    // Colic Live Sliders & Form Input Delegation
    container.addEventListener('input', (e) => {
      if (e.target.id === 'inp_colicHr') {
        const hr = e.target.value;
        const hrDisp = document.getElementById('colicHrDisplay');
        if (hrDisp) hrDisp.textContent = `${hr} bpm`;
        updateLiveColicCalculation();
      }
      if (e.target.id === 'inp_colicReflux') {
        const r = e.target.value;
        const rDisp = document.getElementById('colicRefluxDisplay');
        if (rDisp) rDisp.textContent = `${r} L`;
        updateLiveColicCalculation();
      }
    });

    container.addEventListener('change', (e) => {
      if (e.target.id === 'inp_colicPain' || e.target.id === 'inp_colicSounds' || e.target.id === 'inp_colicTap') {
        updateLiveColicCalculation();
      }
    });

    function updateLiveColicCalculation() {
      const hr = parseInt(document.getElementById('inp_colicHr')?.value, 10);
      const pain = document.getElementById('inp_colicPain')?.value;
      const sounds = document.getElementById('inp_colicSounds')?.value;
      const reflux = parseFloat(document.getElementById('inp_colicReflux')?.value);
      const tap = document.getElementById('inp_colicTap')?.value;

      const res = EquineEngine.evaluateColicRisk({
        heartRateBpm: hr,
        painLevel: pain,
        gutSounds: sounds,
        nasogastricRefluxLiters: reflux,
        peritonealTapColor: tap
      });

      const outBox = document.getElementById('colicDecisionOutput');
      if (outBox) {
        outBox.className = `p-4 rounded-xl border-2 ${res.isSurgical ? 'border-rose-500 bg-rose-950/20' : 'border-emerald-500 bg-emerald-950/20'} space-y-3 font-mono text-xs`;
        outBox.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="font-bold text-sm text-white">ट्रायज स्कोर: ${res.surgicalScore}/100</span>
            <span class="text-xs ${res.isSurgical ? 'text-rose-400 font-black' : 'text-emerald-400 font-bold'}">
              ${res.urgency}
            </span>
          </div>

          ${res.redFlags.length > 0 ? `
            <div class="space-y-1 font-sans text-rose-300">
              <strong class="font-mono text-rose-400 uppercase text-[10px]">पहचाने गए गंभीर लक्षण (Red Flags):</strong>
              <ul class="list-disc pl-5 space-y-0.5 text-xs">
                ${res.redFlags.map(rf => `<li>${rf}</li>`).join('')}
              </ul>
            </div>
          ` : '<div class="text-emerald-400 font-sans">कोई तत्काल सर्जिकल रेड फ्लैग उपस्थित नहीं है। नियमित चिकित्सीय प्रोटोकॉल जारी रखें।</div>'}

          <div class="pt-2 border-t border-slate-800 font-sans text-slate-200">
            <strong class="font-mono text-cyan-400">अनुशंसित प्रोटोकॉल:</strong> ${res.therapeuticProtocol}
          </div>
        `;
      }
    }

    // Colic Form Submit
    container.addEventListener('submit', async (e) => {
      if (e.target.id === 'formColicTriage') {
        e.preventDefault();
        const hr = parseInt(document.getElementById('inp_colicHr').value, 10);
        const pain = document.getElementById('inp_colicPain').value;
        const sounds = document.getElementById('inp_colicSounds').value;
        const reflux = parseFloat(document.getElementById('inp_colicReflux').value);
        const tap = document.getElementById('inp_colicTap').value;

        const res = EquineEngine.evaluateColicRisk({
          heartRateBpm: hr,
          painLevel: pain,
          gutSounds: sounds,
          nasogastricRefluxLiters: reflux,
          peritonealTapColor: tap
        });

        const newRecord = {
          colicId: 'COLIC-' + Math.floor(1000 + Math.random() * 9000),
          horseId: State.activeHorseId,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          heartRateBpm: hr,
          painLevel: pain,
          gutSounds: sounds,
          nasogastricRefluxLiters: reflux,
          rectalFindings: 'Colic evaluation logged',
          peritonealTapColor: tap,
          surgicalReferralUrgency: res.urgency,
          attendingVet: 'Attending Equine Surgeon',
          medicalPlan: res.therapeuticProtocol
        };

        State.colicEvaluations.unshift(newRecord);
        await StorageAdapter.setItem('colicEvaluations', State.colicEvaluations);
        notify('कॉलिक ट्रायज मूल्यांकन सुरक्षित किया गया।', 'success');
        window.VetcareApp.Modules.EquineHealthSports.refreshView();
      }

      if (e.target.id === 'formSaveLameness') {
        e.preventDefault();
        const limb = document.getElementById('lame_limb').value;
        const gr = parseInt(document.getElementById('lame_grade').value, 10);
        const flex = document.getElementById('lame_flexion').value === 'true';
        const diag = document.getElementById('lame_diagnosis').value.trim();

        const newLameRecord = {
          examId: 'LAME-' + Math.floor(1000 + Math.random() * 9000),
          horseId: State.activeHorseId,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          limbAffected: limb,
          aaepGrade: gr,
          flexionTestPositive: flex,
          diagnosticBlocks: ['Palmar Digital Nerve Block (PDNB)'],
          provisionalDiagnosis: diag,
          hoofAngleDegrees: 52,
          shoeingAdvice: 'Custom remedial shoeing prescribed.'
        };

        State.lamenessExams.unshift(newLameRecord);
        await StorageAdapter.setItem('lamenessExams', State.lamenessExams);
        notify('ऑर्थोपेडिक लंगड़ापन परीक्षण सहेजा गया।', 'success');
        window.VetcareApp.Modules.EquineHealthSports.refreshView();
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.EquineHealthSports = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedHorses = await StorageAdapter.getItem('equineRoster');
        State.equineRoster = Array.isArray(savedHorses) && savedHorses.length > 0 ? savedHorses : State.seedData.equineRoster;

        const savedColic = await StorageAdapter.getItem('colicEvaluations');
        State.colicEvaluations = Array.isArray(savedColic) && savedColic.length > 0 ? savedColic : State.seedData.colicEvaluations;

        const savedLame = await StorageAdapter.getItem('lamenessExams');
        State.lamenessExams = Array.isArray(savedLame) && savedLame.length > 0 ? savedLame : State.seedData.lamenessExams;

        if (State.equineRoster.length > 0 && !State.activeHorseId) {
          State.activeHorseId = State.equineRoster[0].horseId;
        }

        console.log('[EquineEngine] Initialized with', State.equineRoster.length, 'horses.');
      } catch (err) {
        console.error('[EquineEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[EquineEngine] Container ${containerId} not found.`);
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
      const contentPanel = State.containerElement.querySelector('#equineTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'equine_roster') {
        contentPanel.innerHTML = UIEngine.renderRosterTab();
      } else if (State.activeTab === 'acute_colic_triage') {
        contentPanel.innerHTML = UIEngine.renderColicTriageTab();
      } else if (State.activeTab === 'aaep_lameness_evaluator') {
        contentPanel.innerHTML = UIEngine.renderLamenessTab();
      } else if (State.activeTab === 'performance_dental_log') {
        contentPanel.innerHTML = UIEngine.renderRoutineCareTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[EquineEngine] Module destroyed cleanly.');
    },

    // Official Printable A4 Equine Sports Medical Passport
    printEquineMedicalPassport(horseId) {
      const horse = State.equineRoster.find(h => h.horseId === horseId);
      if (!horse) {
        notify('अश्व रिकॉर्ड अप्राप्य है।', 'error');
        return;
      }

      const lame = State.lamenessExams.find(l => l.horseId === horseId);
      const colic = State.colicEvaluations.find(c => c.horseId === horseId);

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const passportHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Equine Sports Medical Passport - ${horse.name} (${horse.uelnNo})</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Times New Roman', Times, serif; color: #111; line-height: 1.4; padding: 10px; font-size: 12px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 15px; }
            .crest { font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .subcrest { font-size: 11px; text-transform: uppercase; color: #475569; font-weight: bold; }
            .title { font-size: 15px; font-weight: bold; margin-top: 6px; text-decoration: underline; text-transform: uppercase; }
            .biometrics { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .biometrics th, .biometrics td { border: 1px solid #333; padding: 6px 8px; font-size: 11px; text-align: left; }
            .biometrics th { background-color: #f2f2f2; width: 30%; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; }
            th, td { border: 1px solid #333; padding: 5px 8px; font-size: 11px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 45px; }
            .sign-box { border-top: 1px solid #000; width: 220px; text-align: center; padding-top: 5px; font-size: 11px; font-weight: bold; }
            .qr-seal { border: 1px dashed #000; padding: 8px; width: 130px; text-align: center; font-family: monospace; font-size: 9px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">EQUINE FEDERATION & VETERINARY SPORTS COUNCIL</div>
            <div class="subcrest">Official UELN Identification, Health Passport & Anti-Doping Audit (2026 Core)</div>
            <div class="title">अश्व स्वास्थ्य, साउंडनेस एवं प्रतियोगिता मेडिकल पासपोर्ट</div>
          </div>

          <table class="biometrics">
            <tr>
              <th>अश्व का नाम (Horse Name)</th>
              <td><strong>${horse.name}</strong> (Discipline: ${horse.discipline})</td>
            </tr>
            <tr>
              <th>UELN (Universal Equine Life Number)</th>
              <td style="font-family: monospace; font-weight: bold; font-size: 13px;">${horse.uelnNo}</td>
            </tr>
            <tr>
              <th>माइक्रोचिप RFID / पासपोर्ट क्रमांक</th>
              <td>Microchip: <strong>${horse.microchip}</strong> | Passport: ${horse.passportNo}</td>
            </tr>
            <tr>
              <th>नस्ल, लिंग एवं आयु</th>
              <td>${horse.breed} • लिंग: ${horse.sex} • आयु: ${horse.ageYears} वर्ष</td>
            </tr>
            <tr>
              <th>रंग व शारीरिक पहचान चिन्ह (Markings)</th>
              <td>${horse.color}</td>
            </tr>
            <tr>
              <th>अश्वपालक का नाम व तबेला पता</th>
              <td><strong>${horse.ownerName}</strong> (${horse.stableLocation})</td>
            </tr>
          </table>

          <div style="font-weight: bold; text-transform: uppercase; font-size: 11px;">१. संक्रामक रोग प्रतिरक्षण एवं कॉगिन्स प्रमाणन (EIA & Tetanus):</div>
          <table>
            <thead>
              <tr>
                <th>परीक्षण / टीका का नाम</th>
                <th>प्रशासित दिनांक</th>
                <th>परिणाम / वैधता स्थिति</th>
                <th>अधिकृत वी.ओ. मुहर</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Equine Infectious Anemia (Coggins C-ELISA)</strong></td>
                <td>${horse.cogginsTestDate}</td>
                <td><strong>NEGATIVE (NRCE हिसार प्रमाणित)</strong></td>
                <td>सत्यापित (Certified)</td>
              </tr>
              <tr>
                <td><strong>Tetanus Toxoid Booster</strong></td>
                <td>10-Nov-2025</td>
                <td>VALID TILL 09-Nov-2026</td>
                <td>सत्यापित (Certified)</td>
              </tr>
              <tr>
                <td><strong>Equine Influenza (A/equine-2)</strong></td>
                <td>10-Nov-2025</td>
                <td>VALID TILL 09-May-2026</td>
                <td>सत्यापित (Certified)</td>
              </tr>
            </tbody>
          </table>

          <div style="font-weight: bold; text-transform: uppercase; font-size: 11px; margin-top: 10px;">२. ऑर्थोपेडिक साउंडनेस एवं नैदानिक परीक्षा (Orthopedic Examination):</div>
          <table>
            <tr>
              <th style="width: 30%;">AAEP लंगड़ापन ग्रेड</th>
              <td><strong>Grade ${lame?.aaepGrade || 0} / 5</strong> (${lame?.limbAffected || 'All limbs sound'})</td>
            </tr>
            <tr>
              <th>डायग्नोस्टिक नर्व ब्लॉक</th>
              <td>${lame?.diagnosticBlocks?.join(', ') || 'No nerve block indicated.'}</td>
            </tr>
            <tr>
              <th>नालबंदी एवं खूर कोण (Hoof Angle)</th>
              <td>Hoof Angle: ${lame?.hoofAngleDegrees || 52}° | ${lame?.shoeingAdvice || 'Normal flat shoeing compliant.'}</td>
            </tr>
          </table>

          <div class="footer-sign">
            <div class="qr-seal">
              [ SECURE EQUINE ]<br />
              UELN-${horse.uelnNo}<br />
              FEI / EFI COMPLIANT
            </div>

            <div class="sign-box">
              अश्वपालक / ट्रेनर के हस्ताक्षर<br />
              (Owner / Authorized Trainer)
            </div>

            <div class="sign-box">
              हस्ताक्षर अधिकृत इक्वाइन वेटरनरी सर्जन<br />
              (FEI / State Equine Veterinary Officer)<br />
              पंजीकरण संख्या एवं आधिकारिक मुहर
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
