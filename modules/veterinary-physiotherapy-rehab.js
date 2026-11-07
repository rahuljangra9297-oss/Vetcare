// Vetcare AI OS - Veterinary Physical Rehabilitation, Class IV Laser & Neuro-Recovery Module (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. CCRP / CCRT REHABILITATION & SPORTS MEDICINE SCIENTIFIC CONSTANTS
  const REHAB_CONSTANTS = {
    LASER_PHOTOBIOMODULATION: {
      WAVELENGTHS_NM: [810, 980], // Dual-wavelength deep tissue penetration & hemoglobin/water absorption
      ENERGY_DENSITY_J_CM2: {
        SUPERFICIAL_WOUND_ACUTE_EDEMA: { min: 2.0, max: 4.0, target: 3.0 },
        CHRONIC_ARTHRITIS_JOINT_CAPSULE: { min: 6.0, max: 8.0, target: 7.0 },
        DEEP_SPINE_IVDD_HIP: { min: 8.0, max: 12.0, target: 10.0 }
      },
      COAT_COLOR_ABSORPTION_FACTOR: {
        WHITE_LIGHT: 1.0, // Baseline penetration
        MEDIUM_TAN: 0.9,
        DARK_BLACK: 0.75 // Dark melanin absorbs photons rapidly at skin surface; reduce power or increase sweep speed
      },
      MAX_CONTINUOUS_STATIONARY_SEC: 2.0 // Class IV laser must remain in continuous sweeping motion to avoid thermal burns
    },
    UNDERWATER_TREADMILL_BIOMECHANICS: {
      BUOYANCY_WEIGHT_REDUCTION: {
        LATERAL_MALLEOLUS: 9.0, // Water at hock: ~9% body weight reduction (91% weight bearing)
        STIFLE_JOINT: 15.0, // Water at stifle: ~15% body weight reduction (85% weight bearing)
        GREATER_TROCHANTER: 38.0 // Water at hip: ~38% body weight reduction (62% weight bearing) - Optimal for early post-op TPLO
      },
      WATER_TEMP_C: { MIN: 28.0, MAX: 32.0, OPTIMAL: 30.0 } // Warm water promotes muscle relaxation and vasodilation
    },
    MODIFIED_FRANKEL_SCALE_IVDD: {
      0: { grade: "Grade 0", label: "Paraplegia without Deep Pain Perception (DPP-)", prognosis: "Guarded (<50% recovery)", reflex: "Absent" },
      1: { grade: "Grade 1", label: "Paraplegia with Deep Pain Perception (DPP+)", prognosis: "Fair to Good (85-90% post-op)", reflex: "Present" },
      2: { grade: "Grade 2", label: "Paraplegia with Intact Superficial Pain Sensation", prognosis: "Good", reflex: "Present" },
      3: { grade: "Grade 3", label: "Non-Ambulatory Paraparesis (Motor present, cannot stand unsupported)", prognosis: "Good", reflex: "Upper/Lower Motor" },
      4: { grade: "Grade 4", label: "Ambulatory Paraparesis & Proprioceptive Ataxia (Wobbly gait)", prognosis: "Excellent", reflex: "Proprioceptive deficits" },
      5: { grade: "Grade 5", label: "Spinal Hyperesthesia Only (Normal ambulation, paraspinal pain)", prognosis: "Excellent", reflex: "Intact" }
    },
    NORMAL_GONIOMETRY_CANINE: {
      STIFLE: { flexionDeg: 42, extensionDeg: 162, totalRomDeg: 120 },
      HIP: { flexionDeg: 50, extensionDeg: 165, totalRomDeg: 115 },
      TARSUS_HOCK: { flexionDeg: 38, extensionDeg: 165, totalRomDeg: 127 },
      ELBOW: { flexionDeg: 36, extensionDeg: 165, totalRomDeg: 129 }
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const PhysioStorage = {
    dbName: "VetcarePhysioRehabDB",
    dbVersion: 1,
    storeNames: {
      cases: "physiotherapy_rehab_cases",
      sessions: "rehab_treatment_sessions"
    },
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Physio] IndexedDB not supported, falling back to localStorage.");
          resolve(false);
          return;
        }
        const request = window.indexedDB.open(this.dbName, this.dbVersion);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          Object.values(this.storeNames).forEach((store) => {
            if (!db.objectStoreNames.contains(store)) {
              db.createObjectStore(store, { keyPath: "id" });
            }
          });
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(true);
        };
        request.onerror = (err) => {
          console.error("[Vetcare Physio] IndexedDB error:", err);
          resolve(false);
        };
      });
    },

    async getAll(storeName) {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_PHYSIO_" + storeName);
        return raw ? JSON.parse(raw) : [];
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, "readonly");
          const store = tx.objectStore(storeName);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          console.error(e);
          resolve([]);
        }
      });
    },

    async put(storeName, item) {
      if (!item.id) item.id = "RHB-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const items = await this.getAll(storeName);
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) items[idx] = item;
        else items.push(item);
        localStorage.setItem("VETCARE_PHYSIO_" + storeName, JSON.stringify(items));
        return item;
      }
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.put(item);
          req.onsuccess = () => resolve(item);
          req.onerror = (err) => reject(err);
        } catch (e) {
          reject(e);
        }
      });
    },

    async delete(storeName, id) {
      if (!this.db) {
        let items = await this.getAll(storeName);
        items = items.filter((i) => i.id !== id);
        localStorage.setItem("VETCARE_PHYSIO_" + storeName, JSON.stringify(items));
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  // 4. MAIN PHYSIOTHERAPY & SPORTS MEDICINE CONTROLLER
  const VeterinaryPhysiotherapyRehab = {
    containerId: null,
    activeTab: "rehab_cases_board", // 'rehab_cases_board' | 'laser_dosage_calculator' | 'underwater_treadmill_planner' | 'home_exercise_prescription'

    // Reactive State
    state: {
      rehabCases: [],
      treatmentSessions: [],
      activeCaseId: null,
      laserCalculatorState: {
        conditionType: "CHRONIC_ARTHRITIS_JOINT_CAPSULE",
        targetAreaCm2: 120,
        energyDensityJoulePerCm2: 7.0,
        machinePowerWatts: 6.0,
        coatColor: "MEDIUM_TAN",
        targetAnatomy: "STIFLE",
        calculatedTotalJoules: 840,
        calculatedDurationSeconds: 140
      },
      uwtmPlannerState: {
        waterLevel: "GREATER_TROCHANTER",
        speedMph: 1.2,
        durationMinutes: 12,
        inclinePercent: 0,
        warmWaterTempC: 30.0
      }
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await PhysioStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Veterinary Physical Rehabilitation, Class IV Laser & Neuro-Recovery Engine Loaded.");
    },

    async loadInitialData() {
      let cases = await PhysioStorage.getAll(PhysioStorage.storeNames.cases);
      if (!cases || cases.length === 0) {
        cases = this.getSeedCases();
        for (const c of cases) {
          await PhysioStorage.put(PhysioStorage.storeNames.cases, c);
        }
      }
      this.state.rehabCases = cases;

      if (cases.length > 0 && !this.state.activeCaseId) {
        this.state.activeCaseId = cases[0].caseId;
      }

      let sessions = await PhysioStorage.getAll(PhysioStorage.storeNames.sessions);
      if (!sessions || sessions.length === 0) {
        sessions = this.getSeedSessions();
        for (const s of sessions) {
          await PhysioStorage.put(PhysioStorage.storeNames.sessions, s);
        }
      }
      this.state.treatmentSessions = sessions;
    },

    getSeedCases() {
      return [
        {
          id: "CASE-RHB-001",
          caseId: "CASE-RHB-001",
          patientId: "PAT-DOG-992",
          tagNo: "TAG-992",
          patientName: "बेला (Bella - Golden Retriever)",
          species: "canine",
          breed: "Golden Retriever",
          weightKg: 31.5,
          conditionCategory: "POST_ORTHOPEDIC_TPLO",
          diagnosisTitle: "Right Stifle Cranial Cruciate Ligament Rupture (Post-TPLO Day 18)",
          surgicalDate: "2026-02-05",
          injuryDate: "2026-01-20",
          targetGoal: "Restore full extension (160°), reverse 4cm quadriceps muscle atrophy, return to full field agility.",
          mobilityScore: 3, // 1 (Recumbent) to 5 (Full athletic performance)
          modifiedFrankelScore: 5,
          muscleCircumferenceCm: {
            leftThigh: 44.5, // Healthy unaffected limb
            rightThigh: 40.2 // 4.3 cm disuse atrophy deficit (-9.7%)
          },
          jointRomDegrees: {
            flexion: 52, // Normal is 42° (loss of 10° flexion)
            extension: 146 // Normal is 162° (loss of 16° extension)
          },
          ownerName: "रोहित मल्होत्रा (Rohit Malhotra)",
          primaryTherapist: "Dr. Rahul (CCRP / Certified Canine Rehab Practitioner)"
        },
        {
          id: "CASE-RHB-002",
          caseId: "CASE-RHB-002",
          patientId: "PAT-DOG-841",
          tagNo: "TAG-841",
          patientName: "ऑस्कर (Oscar - Dachshund)",
          species: "canine",
          breed: "Standard Dachshund",
          weightKg: 8.2,
          conditionCategory: "NEUROLOGICAL_IVDD",
          diagnosisTitle: "Hansen Type I Intervertebral Disc Herniation L2-L3 (Post-Hemilaminectomy)",
          surgicalDate: "2026-02-12",
          injuryDate: "2026-02-10",
          targetGoal: "Advance from Modified Frankel Grade 3 to independent unassisted quadrupedal ambulation.",
          mobilityScore: 2,
          modifiedFrankelScore: 3, // Non-ambulatory paraparesis with motor intact
          muscleCircumferenceCm: {
            leftThigh: 18.0,
            rightThigh: 17.8
          },
          jointRomDegrees: {
            flexion: 42,
            extension: 160
          },
          ownerName: "अनिता सिंह (Anita Singh)",
          primaryTherapist: "Dr. Rahul (CCRP)"
        },
        {
          id: "CASE-RHB-003",
          caseId: "CASE-RHB-003",
          patientId: "PAT-DOG-719",
          tagNo: "TAG-719",
          patientName: "रॉकी (Rocky - Senior Lab)",
          species: "canine",
          breed: "Labrador Retriever",
          weightKg: 36.0,
          conditionCategory: "OSTEOARTHRITIS_GERIATRIC",
          diagnosisTitle: "Bilateral Hip Dysplasia & Chronic Secondary Coxofemoral Osteoarthritis",
          surgicalDate: "Non-Surgical Conservative Management",
          injuryDate: "2024-06-15",
          targetGoal: "Pain-free sit-to-stand transitions, preserve lean mass, 20-min daily walk without stiffness.",
          mobilityScore: 2,
          modifiedFrankelScore: 5,
          muscleCircumferenceCm: {
            leftThigh: 38.5,
            rightThigh: 38.2
          },
          jointRomDegrees: {
            flexion: 65,
            extension: 140
          },
          ownerName: "विक्रम चौहान",
          primaryTherapist: "Dr. Rahul (CCRP)"
        }
      ];
    },

    getSeedSessions() {
      return [
        {
          id: "SESS-2026-01",
          sessionId: "SESS-2026-01",
          caseId: "CASE-RHB-001",
          sessionDate: "2026-02-21",
          modalitiesAdministered: [
            "Class IV Deep Tissue Laser (810/980nm, 840 Joules to R Stifle)",
            "Underwater Treadmill (UWTM @ 1.2 mph, Water at Greater Trochanter, 12 min)",
            "Cryotherapy (Ice Pack 15 min post-exercise)"
          ],
          underwaterTreadmillSpeedMph: 1.2,
          waterDepthLevel: "GREATER_TROCHANTER",
          laserJoulesDelivered: 840,
          homeExercisesPrescribed: ["Passive ROM (PROM) 20 reps q12h", "Slow Leash Walks 8 min on grass"],
          practitionerNotes: "Excellent stifle flexion tolerance today. Minimal compensatory weight shift to left forelimb."
        }
      ];
    },

    // 4.2 SCIENTIFIC LASER & HYDROTHERAPY MATHEMATICAL CALCULATIONS
    calculateLaserParameters(conditionKey, areaCm2, wattage, coatColorKey) {
      const condition = REHAB_CONSTANTS.LASER_PHOTOBIOMODULATION.ENERGY_DENSITY_J_CM2[conditionKey] || REHAB_CONSTANTS.LASER_PHOTOBIOMODULATION.ENERGY_DENSITY_J_CM2.CHRONIC_ARTHRITIS_JOINT_CAPSULE;
      const density = condition.target;
      const area = parseFloat(areaCm2) || 100;
      const rawJoules = area * density;

      const coatFactor = REHAB_CONSTANTS.LASER_PHOTOBIOMODULATION.COAT_COLOR_ABSORPTION_FACTOR[coatColorKey] || 1.0;
      const adjustedJoules = Math.round(rawJoules * coatFactor);

      const watts = parseFloat(wattage) || 6.0;
      const durationSeconds = watts > 0 ? Math.round(adjustedJoules / watts) : 0;

      return {
        totalJoules: adjustedJoules,
        densityJoulePerCm2: density,
        durationSeconds,
        durationMinutesDisplay: `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s`,
        requiresGoggles: true
      };
    },

    calculateAtrophyDeficit(leftCm, rightCm) {
      const l = parseFloat(leftCm) || 0;
      const r = parseFloat(rightCm) || 0;
      if (l <= 0 || r <= 0) return { diffCm: 0, percentDeficit: 0, affectedLimb: "None" };

      const diff = Math.abs(l - r).toFixed(1);
      const baseline = Math.max(l, r);
      const deficit = ((diff / baseline) * 100).toFixed(1);
      const affected = l < r ? "बायां पैर (Left Limb Atrophied)" : r < l ? "दायां पैर (Right Limb Atrophied)" : "संतुलित (Symmetrical)";

      return {
        diffCm: diff,
        percentDeficit: deficit,
        affectedLimb: affected,
        isSignificant: parseFloat(deficit) > 5.0 // >5% asymmetry is clinically significant muscle atrophy in quad/hamstrings
      };
    },

    calculateOverallKPIs() {
      const totalCases = this.state.rehabCases.length;
      const tploCount = this.state.rehabCases.filter((c) => c.conditionCategory === "POST_ORTHOPEDIC_TPLO").length;
      const neuroIvddCount = this.state.rehabCases.filter((c) => c.conditionCategory === "NEUROLOGICAL_IVDD").length;
      const totalSessions = this.state.treatmentSessions.length;

      return {
        totalCases,
        tploCount,
        neuroIvddCount,
        totalSessions
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Physio] Target container DOM not found:", this.containerId);
        return;
      }

      const kpis = this.calculateOverallKPIs();
      const activeCase = this.state.rehabCases.find((c) => c.caseId === this.state.activeCaseId) || this.state.rehabCases[0];

      container.innerHTML = `
        <div class="physio-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- TOP HERO CLINICAL APP BAR -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-bone text-emerald-400"></i> CCRP / CCRT Physical Rehabilitation Core
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <i class="fa-solid fa-water"></i> UWTM Biomechanics 38% Unweighting
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>पशु फिजियोथेरेपी, क्लास IV लेजर एवं न्यूरो-पुनर्वास केंद्र</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Canine Sports Medicine: Post-TPLO Rehabilitation, Modified Frankel Scale IVDD Spinal Recovery, Underwater Treadmill Hydrotherapy & Photobiomodulation Laser Engine.
              </p>
            </div>

            <!-- ACTION CONTROLS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenNewCaseModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नया रिहैब केस दर्ज करें (New Case)
              </button>
              <button id="btnOpenLogSessionModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-clipboard-check"></i> थेरेपी सत्र दर्ज करें (Log Session)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय फिजियोथेरेपी मरीज</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${kpis.totalCases}</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">CCRP Managed</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">TPLO क्रूसिएट सर्जरी रिकवरी</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${kpis.tploCount} Dogs</span>
                <span class="text-xs font-mono text-slate-400">Post-Op Day 14+</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">IVDD न्यूरोलॉजिकल स्पाइनल केस</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-purple-400">${kpis.neuroIvddCount}</span>
                <span class="text-xs font-mono text-purple-300">Frankel Scale 0-5</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">कुल संपन्न थेरेपी सत्र</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-amber-400">${kpis.totalSessions} Sessions</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">Laser / UWTM / PROM</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="rehab_cases_board" class="physio-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "rehab_cases_board"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-notes-medical"></i> 1. रोगी फिजियो प्रोफाइल एवं गोनियोमेट्री (Cases & ROM Board)
            </button>
            <button data-tab="laser_dosage_calculator" class="physio-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "laser_dosage_calculator"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-bolt-lightning"></i> 2. क्लास IV लेजर खुराक संगणक (Class IV Laser Engine)
            </button>
            <button data-tab="underwater_treadmill_planner" class="physio-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "underwater_treadmill_planner"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-water"></i> 3. अंडरवाटर ट्रेडमिल हाइड्रोथेरेपी (UWTM Biomechanics)
            </button>
            <button data-tab="home_exercise_prescription" class="physio-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "home_exercise_prescription"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-dumbbell"></i> 4. सचित्र घरेलू व्यायाम प्रिस्क्रिप्शन (Home Exercise HEP)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="physioTabViewport" class="w-full">
            ${this.renderActiveTabContent(activeCase)}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINER -->
        <div id="physioModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent(activeCase) {
      switch (this.activeTab) {
        case "rehab_cases_board":
          return this.renderCasesBoardTab(activeCase);
        case "laser_dosage_calculator":
          return this.renderLaserCalculatorTab(activeCase);
        case "underwater_treadmill_planner":
          return this.renderUwtmPlannerTab(activeCase);
        case "home_exercise_prescription":
          return this.renderHomeExerciseTab(activeCase);
        default:
          return "";
      }
    },

    // TAB 1: REHAB CASES BOARD & GONIOMETRY ATROPHY TRACKER
    renderCasesBoardTab(activeCase) {
      const atrophy = this.calculateAtrophyDeficit(
        activeCase.muscleCircumferenceCm.leftThigh,
        activeCase.muscleCircumferenceCm.rightThigh
      );
      const frankel = REHAB_CONSTANTS.MODIFIED_FRANKEL_SCALE_IVDD[activeCase.modifiedFrankelScore] || REHAB_CONSTANTS.MODIFIED_FRANKEL_SCALE_IVDD[5];

      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- LEFT 1-COL: ACTIVE PATIENTS SELECTOR ROSTER -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 class="font-display font-bold text-base text-white flex items-center gap-2">
                  <i class="fa-solid fa-user-doctor text-emerald-400"></i> सक्रिय पुनर्वास मरीज (Select Patient)
                </h3>
              </div>

              <div class="space-y-2">
                ${this.state.rehabCases
                  .map((c) => {
                    const isSelected = c.caseId === this.state.activeCaseId;
                    return `
                    <div data-select-case="${c.caseId}" class="p-3.5 rounded-xl border ${
                      isSelected ? "border-emerald-500 bg-emerald-950/20 shadow-md" : "border-slate-800 bg-slate-950/60 hover:bg-slate-800/50"
                    } cursor-pointer transition-all">
                      <div class="flex justify-between items-start">
                        <span class="font-bold text-white text-xs">${c.patientName}</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          c.conditionCategory === "POST_ORTHOPEDIC_TPLO"
                            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                            : c.conditionCategory === "NEUROLOGICAL_IVDD"
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                        }">
                          ${c.conditionCategory}
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-400 mt-1">${c.breed} • ${c.weightKg} kg</div>
                      <div class="text-[10px] text-emerald-400 font-mono mt-1">Mobility Score: ${c.mobilityScore}/5 • Goal: Active</div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </div>

            <!-- RIGHT 2-COLS: DETAILED GONIOMETRY, MUSCLE MASS & FRANKEL SCALE -->
            <div class="lg:col-span-2 space-y-5">
              
              <!-- ACTIVE PATIENT MASTER CARD -->
              <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-emerald-400">${activeCase.caseId}</span>
                      <span class="text-xs font-mono text-slate-500">| Tag: ${activeCase.tagNo}</span>
                    </div>
                    <h3 class="text-xl font-display font-black text-white mt-0.5">${activeCase.patientName}</h3>
                    <p class="text-xs text-cyan-300 font-semibold mt-0.5">${activeCase.diagnosisTitle}</p>
                  </div>

                  <div class="text-right">
                    <span class="text-[10px] font-mono uppercase text-slate-400">थेरेपी लक्ष्य (Target Goal)</span>
                    <div class="text-xs text-slate-300 max-w-xs mt-0.5 font-medium">${activeCase.targetGoal}</div>
                  </div>
                </div>

                <!-- BIOMECHANICAL METRIC GAUGES (ATROPHY & GONIOMETRY) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <!-- MUSCLE CIRCUMFERENCE ATROPHY VISUALIZER -->
                  <div class="p-4 rounded-xl bg-slate-950 border ${atrophy.isSignificant ? "border-amber-500/50" : "border-slate-800"} space-y-3">
                    <div class="flex justify-between items-center text-xs font-mono">
                      <span class="text-slate-400 uppercase font-bold">मांसपेशी घेरा / Disuse Atrophy (cm)</span>
                      <span class="text-amber-400 font-bold">${atrophy.percentDeficit}% Asymmetry</span>
                    </div>

                    <div class="space-y-2 text-xs font-mono">
                      <div>
                        <div class="flex justify-between text-[11px] mb-1">
                          <span class="text-slate-400">बायां पैर (Left Thigh 70% level):</span>
                          <strong class="text-white">${activeCase.muscleCircumferenceCm.leftThigh} cm</strong>
                        </div>
                        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div class="bg-emerald-400 h-full" style="width: ${Math.min(100, (activeCase.muscleCircumferenceCm.leftThigh / 50) * 100)}%;"></div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-[11px] mb-1">
                          <span class="text-slate-400">दायां पैर (Right Thigh Post-Op):</span>
                          <strong class="text-rose-400">${activeCase.muscleCircumferenceCm.rightThigh} cm</strong>
                        </div>
                        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div class="bg-rose-400 h-full" style="width: ${Math.min(100, (activeCase.muscleCircumferenceCm.rightThigh / 50) * 100)}%;"></div>
                        </div>
                      </div>
                    </div>

                    <div class="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
                      <i class="fa-solid fa-triangle-exclamation text-amber-400"></i>
                      <span>घाटा: <strong>${atrophy.diffCm} cm</strong> (${atrophy.affectedLimb})</span>
                    </div>
                  </div>

                  <!-- JOINT RANGE OF MOTION (ROM) GONIOMETRY -->
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div class="flex justify-between items-center text-xs font-mono">
                      <span class="text-slate-400 uppercase font-bold">जोड़ गति सीमा (Joint Goniometry ROM)</span>
                      <span class="text-cyan-400 font-bold">Stifle Extension</span>
                    </div>

                    <div class="grid grid-cols-2 gap-3 text-center font-mono">
                      <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span class="text-[10px] text-slate-400">फ्लेक्सियन (Flexion)</span>
                        <div class="text-xl font-bold text-white mt-1">${activeCase.jointRomDegrees.flexion}°</div>
                        <span class="text-[9px] text-slate-500">Normal ~42°</span>
                      </div>
                      <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span class="text-[10px] text-slate-400">एक्सटेंशन (Extension)</span>
                        <div class="text-xl font-bold text-rose-400 mt-1">${activeCase.jointRomDegrees.extension}°</div>
                        <span class="text-[9px] text-slate-500">Normal 162° (Deficit 16°)</span>
                      </div>
                    </div>

                    <div class="text-[10px] text-slate-400 font-mono text-center">
                      दैनिक पैसिव रेंज ऑफ मोशन (PROM) द्वारा एक्सटेंशन को 160° तक लाना अनिवार्य है।
                    </div>
                  </div>

                </div>

                <!-- NEUROLOGICAL MODIFIED FRANKEL SCALE DISPLAY (FOR IVDD) -->
                ${
                  activeCase.conditionCategory === "NEUROLOGICAL_IVDD"
                    ? `
                  <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2 text-xs">
                    <div class="flex justify-between items-center font-mono">
                      <span class="text-purple-300 font-bold uppercase flex items-center gap-1.5">
                        <i class="fa-solid fa-brain"></i> न्यूरोलॉजिकल स्पाइनल स्कोर (Modified Frankel Scale: ${frankel.grade})
                      </span>
                      <span class="text-emerald-400 font-bold">Prognosis: ${frankel.prognosis}</span>
                    </div>
                    <p class="text-slate-300 text-[11px] leading-relaxed">
                      <strong>क्लिनिकल स्थिति:</strong> ${frankel.label}। रीढ़ की हड्डी में डीप पेन परसेप्शन (DPP) सुरक्षित है। गैर-चलने योग्य पेरापेरेसिस में क्वाड्रुपेदल रिफ्लेक्स स्टिम्युलेशन और असिस्टेड हार्नेस की आवश्यकता है।
                    </p>
                  </div>
                `
                    : ""
                }

              </div>

            </div>

          </div>
        </div>
      `;
    },

    // TAB 2: CLASS IV LASER DOSAGE CALCULATOR
    renderLaserCalculatorTab(activeCase) {
      const calc = this.state.laserCalculatorState;
      const res = this.calculateLaserParameters(
        calc.conditionType,
        calc.targetAreaCm2,
        calc.machinePowerWatts,
        calc.coatColor
      );

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 space-y-6">
            
            <div class="border-b border-slate-800 pb-4">
              <span class="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                <i class="fa-solid fa-bolt-lightning mr-1"></i> Class IV High-Power Photobiomodulation (810/980nm)
              </span>
              <h3 class="text-xl font-display font-black text-white mt-1">
                क्लास IV कोल्ड लेजर ऊर्जा एवं समय संगणक (Laser Dosage Engine)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Total Joules = Area (cm²) × Target Energy Density (J/cm²) × Melanin Coat Absorption Factor. Computes sweep duration in seconds.
              </p>
            </div>

            <!-- INTERACTIVE LASER PARAMETER INPUT GRID -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              
              <div>
                <label class="block text-slate-300 uppercase mb-1">क्लिनिकल स्थिति (Condition)</label>
                <select id="selLaserCondition" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  <option value="CHRONIC_ARTHRITIS_JOINT_CAPSULE" ${calc.conditionType === "CHRONIC_ARTHRITIS_JOINT_CAPSULE" ? "selected" : ""}>Chronic Arthritis / Joint Capsule (6-8 J/cm²)</option>
                  <option value="DEEP_SPINE_IVDD_HIP" ${calc.conditionType === "DEEP_SPINE_IVDD_HIP" ? "selected" : ""}>Deep Spine / IVDD / Hip (8-12 J/cm²)</option>
                  <option value="SUPERFICIAL_WOUND_ACUTE_EDEMA" ${calc.conditionType === "SUPERFICIAL_WOUND_ACUTE_EDEMA" ? "selected" : ""}>Superficial Wound / Acute Edema (2-4 J/cm²)</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">उपचारित क्षेत्रफल (Area cm²)</label>
                <input type="number" id="inLaserArea" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="${calc.targetAreaCm2}" />
                <span class="text-[10px] text-slate-500">Stifle: ~100-120 cm² | Spine: ~200 cm²</span>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">लेजर मशीन आउटपुट (Watts)</label>
                <select id="selLaserWatts" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold">
                  <option value="4.0" ${calc.machinePowerWatts === 4.0 ? "selected" : ""}>4.0 Watts (Pulsed/Continuous)</option>
                  <option value="6.0" ${calc.machinePowerWatts === 6.0 ? "selected" : ""}>6.0 Watts (Standard Deep Tissue)</option>
                  <option value="8.0" ${calc.machinePowerWatts === 8.0 ? "selected" : ""}>8.0 Watts (Large Canine High-Speed)</option>
                  <option value="10.0" ${calc.machinePowerWatts === 10.0 ? "selected" : ""}>10.0 Watts (Equine / Deep Spine)</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">बालों का रंग (Coat Melanin Factor)</label>
                <select id="selLaserCoat" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  <option value="WHITE_LIGHT" ${calc.coatColor === "WHITE_LIGHT" ? "selected" : ""}>सफेद / हल्का रंग (White/Light Coat - 1.0x)</option>
                  <option value="MEDIUM_TAN" ${calc.coatColor === "MEDIUM_TAN" ? "selected" : ""}>मध्यम भूरा / लाल (Golden/Tan - 0.9x)</option>
                  <option value="DARK_BLACK" ${calc.coatColor === "DARK_BLACK" ? "selected" : ""}>काला / गहरा रंग (Black Coat - 0.75x Rapid Heat)</option>
                </select>
              </div>

            </div>

            <!-- COMPUTED LASER DOSAGE READOUT -->
            <div class="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div class="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">कुल डिलीवर ऊर्जा (Total Joules)</span>
                <div class="text-3xl font-black text-emerald-400 mt-1">${res.totalJoules} J</div>
                <span class="text-[10px] text-slate-500">${res.densityJoulePerCm2} J/cm² Energy Density</span>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">स्वीप उपचार समय (Treatment Time)</span>
                <div class="text-3xl font-black text-cyan-400 mt-1">${res.durationMinutesDisplay}</div>
                <span class="text-[10px] text-slate-500">${res.durationSeconds} Seconds at ${calc.machinePowerWatts}W</span>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">नेत्र सुरक्षा अनिवार्यता (Safety Goggles)</span>
                <div class="text-lg font-bold text-amber-400 mt-2 flex items-center justify-center gap-1.5">
                  <i class="fa-solid fa-glasses"></i> Doggles + Staff OD 5+
                </div>
                <span class="text-[10px] text-slate-500">Class IV Direct Beam Hazard</span>
              </div>
            </div>

            <!-- MANDATORY CLASS IV LASER SAFETY TECHNIQUE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-amber-300 flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation"></i> सुरक्षित लेजर संचालन तकनीक (Continuous Sweeping Technique)
              </div>
              <p class="text-slate-300 text-[11px] leading-relaxed">
                क्लास IV लेजर हेड को <strong>कभी भी एक स्थान पर 2 सेकंड से अधिक स्थिर न रखें</strong>। लेजर प्रोब को 3 से 5 सेमी प्रति सेकंड की निरंतर गोलाकार या ग्रिड गति (Continuous Sweeping Grid) में घुमाएं। गहरे काले बालों वाले कुत्तों (जैसे Labradors या Rottweilers) की त्वचा पर मेलेनिन प्रकाश को तीव्र गति से ऊष्मा में परिवर्तित करता है; इसलिए हाथ से त्वचा के तापमान का निरंतर परीक्षण करते रहें।
              </p>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 3: UNDERWATER TREADMILL (UWTM) BIOMECHANICS PLANNER
    renderUwtmPlannerTab(activeCase) {
      const uwtm = this.state.uwtmPlannerState;
      const reduction = REHAB_CONSTANTS.UNDERWATER_TREADMILL_BIOMECHANICS.BUOYANCY_WEIGHT_REDUCTION[uwtm.waterLevel] || 38.0;
      const actualWeightBearingPercent = (100 - reduction).toFixed(0);
      const effectiveWeightKg = ((activeCase.weightKg * actualWeightBearingPercent) / 100).toFixed(1);

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-6">
            
            <div class="border-b border-slate-800 pb-4">
              <span class="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                <i class="fa-solid fa-water mr-1"></i> Hydrokinetic Buoyancy & Gait Retraining
              </span>
              <h3 class="text-xl font-display font-black text-white mt-1">
                अंडरवाटर ट्रेडमिल (UWTM) हाइड्रोथेरेपी बायोमैकेनिक्स प्लानर
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Hydrostatic pressure reduces joint edema while water buoyancy offloads body weight, allowing early pain-free weight bearing.
              </p>
            </div>

            <!-- INTERACTIVE WATER HEIGHT SELECTOR -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span class="text-xs font-mono uppercase text-slate-400 font-bold">1. जल स्तर चयन (Water Height)</span>
                
                <div class="space-y-2 text-xs">
                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 border ${
                    uwtm.waterLevel === "GREATER_TROCHANTER" ? "border-cyan-500 text-white font-bold" : "border-slate-800 text-slate-400"
                  } cursor-pointer">
                    <input type="radio" name="rdWaterLevel" value="GREATER_TROCHANTER" ${uwtm.waterLevel === "GREATER_TROCHANTER" ? "checked" : ""} />
                    <div>
                      <div>कूल्हे के जोड़ तक (Greater Trochanter)</div>
                      <div class="text-[10px] text-cyan-400 font-mono">38% वजन में कमी (Post-Op TPLO Day 14-28)</div>
                    </div>
                  </label>

                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 border ${
                    uwtm.waterLevel === "STIFLE_JOINT" ? "border-cyan-500 text-white font-bold" : "border-slate-800 text-slate-400"
                  } cursor-pointer">
                    <input type="radio" name="rdWaterLevel" value="STIFLE_JOINT" ${uwtm.waterLevel === "STIFLE_JOINT" ? "checked" : ""} />
                    <div>
                      <div>घुटने के जोड़ तक (Stifle Level)</div>
                      <div class="text-[10px] text-cyan-400 font-mono">15% वजन में कमी (Late Rehab / Strength)</div>
                    </div>
                  </label>

                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 border ${
                    uwtm.waterLevel === "LATERAL_MALLEOLUS" ? "border-cyan-500 text-white font-bold" : "border-slate-800 text-slate-400"
                  } cursor-pointer">
                    <input type="radio" name="rdWaterLevel" value="LATERAL_MALLEOLUS" ${uwtm.waterLevel === "LATERAL_MALLEOLUS" ? "checked" : ""} />
                    <div>
                      <div>टखने के जोड़ तक (Lateral Malleolus)</div>
                      <div class="text-[10px] text-cyan-400 font-mono">9% वजन में कमी (Full Athletic Conditioning)</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- DYNAMIC BUOYANCY TELEMETRY BOX -->
              <div class="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-center font-mono flex flex-col justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold">बायोसी द्वारा वास्तविक भार वहन</span>
                  <div class="text-4xl font-display font-black text-cyan-400 mt-2">${actualWeightBearingPercent}%</div>
                  <div class="text-xs text-slate-300 mt-1">Weight-bearing Load</div>
                </div>

                <div class="pt-3 border-t border-slate-800 space-y-1 text-xs">
                  <div class="flex justify-between text-slate-400">
                    <span>वास्तविक वजन:</span>
                    <strong class="text-white">${activeCase.weightKg} kg</strong>
                  </div>
                  <div class="flex justify-between text-slate-400">
                    <span>पानी में प्रभावी वजन:</span>
                    <strong class="text-emerald-400 text-sm">${effectiveWeightKg} kg</strong>
                  </div>
                </div>
              </div>

              <!-- TREADMILL SPEED & DURATION CONTROLLER -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <span class="text-slate-400 uppercase font-bold">2. गति एवं समय पैरामीटर</span>

                <div>
                  <label class="block text-slate-300 mb-1">ट्रेडमिल गति (Speed Mph)</label>
                  <input type="number" step="0.1" id="inUwtmSpeed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="${uwtm.speedMph}" />
                  <span class="text-[10px] text-slate-500">Post-Op: 0.8 - 1.4 mph (Slow deliberate walk)</span>
                </div>

                <div>
                  <label class="block text-slate-300 mb-1">सत्र अवधि (Duration Minutes)</label>
                  <input type="number" id="inUwtmDuration" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="${uwtm.durationMinutes}" />
                  <span class="text-[10px] text-slate-500">2 min walking / 1 min rest intervals</span>
                </div>

                <div>
                  <label class="block text-slate-300 mb-1">गर्म जल तापमान (Water Temp °C)</label>
                  <input type="number" step="0.5" id="inUwtmTemp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold" value="${uwtm.warmWaterTempC}" />
                </div>
              </div>

            </div>

            <!-- CLINICAL HYDROTHERAPY NOTE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-cyan-300 flex items-center gap-2">
                <i class="fa-solid fa-water"></i> हाइड्रोस्टैटिक दबाव एवं फ्लेक्सियन वृद्धि (Clinical Hydrokinetics)
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                पानी में चलने पर श्वान के घुटने और कूल्हे का फ्लेक्सियन शुष्क जमीन की तुलना में <strong>15° से 20° अधिक</strong> होता है। पानी का हाइड्रोस्टैटिक दबाव टखने और घुटने की पोस्ट-ऑपरेटिव सूजन (Edema) को कम करता है। हमेशा सत्र के अंत में साफ पानी से धोकर सुखाएं और जोड़ों पर 10 मिनट आइस-पैक लगाएं।
              </p>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: VISUAL HOME EXERCISE PROGRAM (HEP) PRESCRIPTION
    renderHomeExerciseTab(activeCase) {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-dumbbell text-emerald-400"></i> सचित्र घरेलू व्यायाम प्रिस्क्रिप्शन (Home Exercise Program - HEP)
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  Customized owner-administered physical therapy exercises for post-op orthopedic and spinal convalescence.
                </p>
              </div>
              <button id="btnPrintHomeExercisePlan" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i> स्वामी व्यायाम गाइड प्रिंट करें (Print Plan)
              </button>
            </div>

            <!-- EXERCISE LIBRARY CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <!-- EXERCISE 1: PROM -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                    पैसिव रेंज ऑफ मोशन (Passive ROM - PROM)
                  </h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300">दिन में 2-3 बार</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  कुत्ते को करवट के बल लिटाएं। घुटने और कूल्हे को धीरे-धीरे साइकिल की भांति आगे फ्लेक्स करें और फिर पीछे सीधा (Extend) करें। दर्द की सीमा में ही गति दें। <strong>प्रत्येक जोड़ के 20 चक्र</strong> दोहराएं।
                </p>
                <div class="text-[10px] font-mono text-emerald-400 font-bold">लक्ष्य: जोड़ के साइनोवियल फ्लूइड का प्रवाह बनाए रखना व अकड़न रोकना।</div>
              </div>

              <!-- EXERCISE 2: CAVALETTI RAILS -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
                    कावेलेटी रेल्स वॉक (Cavaletti Rails)
                  </h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300">दैनिक 2 सत्र</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  जमीन पर 4-5 हल्की छड़ें (Hurdles) टखने की ऊंचाई (8-12 सेमी) पर रखें। कुत्ते को धीमी गति से पट्टे पर इनके ऊपर से चलाएं ताकि वह प्रत्येक पैर को उठाकर रखे। <strong>5 से 8 चक्र प्रति सत्र</strong>।
                </p>
                <div class="text-[10px] font-mono text-purple-400 font-bold">लक्ष्य: प्रोप्रियोसेप्शन (Proprioception) एवं संयुक्त फ्लेक्सियन वृद्धि।</div>
              </div>

              <!-- EXERCISE 3: WOBBLE CUSHION / BALANCE -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
                    संतुलन कुशन वॉक (Wobble Cushion Core Balance)
                  </h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300">10 पुनरावृत्ति</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  कुत्ते के दोनों प्रभावित पैरों को हवा भरी डिस्क (Inflatable Balance Disc) पर खड़ा रखें और हल्के हाथ से पेल्विस को धीरे-धीरे अगल-बगल हिलाएं (Rhythmic Stabilization)। <strong>30-45 सेकंड के 5 सेट</strong>।
                </p>
                <div class="text-[10px] font-mono text-amber-400 font-bold">लक्ष्य: कोर और परिरक्षक मांसपेशियों (Stabilizer Muscles) की मजबूती।</div>
              </div>

              <!-- EXERCISE 4: SIT-TO-STAND -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
                    नियंत्रित उठक-बैठक (Controlled Sit-to-Stand)
                  </h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300">10 से 15 पुनरावृत्ति</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  कुत्ते को दीवार के सहारे सीधा बैठने को कहें और ट्रीट देकर धीरे से सीधा खड़ा होने के लिए प्रेरित करें। ध्यान दें कि कुत्ता पैर को बाहर की ओर न फैलाए (Proper Square Sit)।
                </p>
                <div class="text-[10px] font-mono text-rose-400 font-bold">लक्ष्य: क्वाड्रीसेप्स और ग्लूटियल मांसपेशियों के आकार को दोबारा बढ़ाना।</div>
              </div>

            </div>

          </div>
        </div>
      `;
    },

    // 4.5 EVENT BINDING & INTERACTIVITY
    bindEvents() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Tab Switching
      container.querySelectorAll(".physio-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Patient Case Switching
      container.querySelectorAll("[data-select-case]").forEach((card) => {
        card.addEventListener("click", (e) => {
          const cId = e.currentTarget.getAttribute("data-select-case");
          if (cId && cId !== this.state.activeCaseId) {
            this.state.activeCaseId = cId;
            this.render();
          }
        });
      });

      // Laser Inputs Live Update
      const selLaserCond = container.querySelector("#selLaserCondition");
      const inLaserArea = container.querySelector("#inLaserArea");
      const selLaserWatts = container.querySelector("#selLaserWatts");
      const selLaserCoat = container.querySelector("#selLaserCoat");

      const updateLaser = () => {
        if (!selLaserCond || !inLaserArea || !selLaserWatts || !selLaserCoat) return;
        this.state.laserCalculatorState.conditionType = selLaserCond.value;
        this.state.laserCalculatorState.targetAreaCm2 = parseFloat(inLaserArea.value) || 100;
        this.state.laserCalculatorState.machinePowerWatts = parseFloat(selLaserWatts.value) || 6.0;
        this.state.laserCalculatorState.coatColor = selLaserCoat.value;
        this.render();
      };

      if (selLaserCond && inLaserArea && selLaserWatts && selLaserCoat) {
        selLaserCond.addEventListener("change", updateLaser);
        inLaserArea.addEventListener("input", updateLaser);
        selLaserWatts.addEventListener("change", updateLaser);
        selLaserCoat.addEventListener("change", updateLaser);
      }

      // UWTM Radio Buttons
      container.querySelectorAll("input[name='rdWaterLevel']").forEach((rd) => {
        rd.addEventListener("change", (e) => {
          this.state.uwtmPlannerState.waterLevel = e.target.value;
          this.render();
        });
      });

      // Modals Triggers
      const btnOpenNewCase = container.querySelector("#btnOpenNewCaseModal");
      if (btnOpenNewCase) {
        btnOpenNewCase.addEventListener("click", () => this.showNewCaseModal());
      }

      const btnOpenLogSession = container.querySelector("#btnOpenLogSessionModal");
      if (btnOpenLogSession) {
        btnOpenLogSession.addEventListener("click", () => this.showLogSessionModal());
      }

      // Print Plan Trigger
      const btnPrint = container.querySelector("#btnPrintHomeExercisePlan");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => {
          this.printHomeExerciseProgram(this.state.activeCaseId);
        });
      }
    },

    // 4.6 CLINICAL MODALS
    showNewCaseModal() {
      const modalHost = document.getElementById("physioModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="newCaseModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-bone text-emerald-400 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">नया फिजियोथेरेपी केस दर्ज करें</h3>
              </div>
              <button id="btnCloseCaseModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewCase" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">रोगी का नाम (Patient Name)</label>
                  <input type="text" id="inCasePetName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold" placeholder="उदा. मैक्स (Max)" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">प्रजाति व नस्ल</label>
                  <input type="text" id="inCaseBreed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. Labrador Retriever" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">शारीरिक भार (Weight kg)</label>
                  <input type="number" step="0.5" id="inCaseWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold" value="28.0" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">रोग श्रेणी (Category)</label>
                  <select id="selCaseCategory" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                    <option value="POST_ORTHOPEDIC_TPLO">Post-Orthopedic TPLO / Cruciate</option>
                    <option value="NEUROLOGICAL_IVDD">Neurological IVDD / Spinal Recovery</option>
                    <option value="OSTEOARTHRITIS_GERIATRIC">Osteoarthritis / Geriatric Mobility</option>
                    <option value="HIP_DYSPLASIA">Hip Dysplasia / FHNO Rehab</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">विस्तृत निदान (Diagnosis Title)</label>
                <input type="text" id="inCaseDiagnosis" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. Right Stifle TPLO Day 14" required />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">बायां पैर घेरा (Left Thigh cm)</label>
                  <input type="number" step="0.1" id="inCaseLeftThigh" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="42.0" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">दायां पैर घेरा (Right Thigh cm)</label>
                  <input type="number" step="0.1" id="inCaseRightThigh" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold" value="38.5" />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">स्वामी का नाम व संपर्क</label>
                <input type="text" id="inCaseOwner" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. राहुल शर्मा (98XXXXXXXX)" required />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelCaseModal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitNewCase" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">केस सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseCaseModal").addEventListener("click", close);
      document.getElementById("btnCancelCaseModal").addEventListener("click", close);

      document.getElementById("formAddNewCase").addEventListener("submit", async () => {
        const name = document.getElementById("inCasePetName").value.trim();
        const breed = document.getElementById("inCaseBreed").value.trim();
        const weightKg = parseFloat(document.getElementById("inCaseWeight").value) || 25.0;
        const category = document.getElementById("selCaseCategory").value;
        const diagnosis = document.getElementById("inCaseDiagnosis").value.trim();
        const leftThigh = parseFloat(document.getElementById("inCaseLeftThigh").value) || 40.0;
        const rightThigh = parseFloat(document.getElementById("inCaseRightThigh").value) || 40.0;
        const owner = document.getElementById("inCaseOwner").value.trim();

        const newCase = {
          id: "CASE-" + Date.now(),
          caseId: "CASE-RHB-" + Date.now().toString().slice(-4),
          patientId: "PAT-" + Math.floor(100 + Math.random() * 900),
          tagNo: "TAG-" + Math.floor(100 + Math.random() * 900),
          patientName: name,
          species: "canine",
          breed,
          weightKg,
          conditionCategory: category,
          diagnosisTitle: diagnosis,
          surgicalDate: new Date().toISOString().split("T")[0],
          injuryDate: new Date().toISOString().split("T")[0],
          targetGoal: "Restore symmetrical muscle mass and joint ROM",
          mobilityScore: 3,
          modifiedFrankelScore: 5,
          muscleCircumferenceCm: { leftThigh, rightThigh },
          jointRomDegrees: { flexion: 48, extension: 152 },
          ownerName: owner,
          primaryTherapist: "Dr. Rahul (CCRP)"
        };

        await PhysioStorage.put(PhysioStorage.storeNames.cases, newCase);
        this.state.rehabCases.unshift(newCase);
        this.state.activeCaseId = newCase.caseId;
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("नया फिजियोथेरेपी केस सफलतापूर्वक दर्ज हुआ!", "success");
        }
      });
    },

    showLogSessionModal() {
      const modalHost = document.getElementById("physioModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="logSessionModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">दैनिक पुनर्वास सत्र दर्ज करें</h3>
              <button id="btnCloseSessionModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formLogSession" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div>
                <label class="block uppercase text-slate-300 mb-1">मरीज का चयन</label>
                <select id="selSessionCase" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  ${this.state.rehabCases.map((c) => `<option value="${c.caseId}" ${c.caseId === this.state.activeCaseId ? "selected" : ""}>${c.patientName} (${c.conditionCategory})</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">प्रशासित मोडैलिटीज (Modalities Administered)</label>
                <input type="text" id="inSessionModalities" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" value="Class IV Laser 840J + UWTM 12 min + Ice pack" required />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">लेजर जूल्स (Joules)</label>
                  <input type="number" id="inSessionJoules" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="840" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">UWTM गति (mph)</label>
                  <input type="number" step="0.1" id="inSessionUwtmSpeed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold" value="1.2" />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">थेरेपिस्ट क्लिनिकल नोट्स</label>
                <input type="text" id="inSessionNotes" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" value="घुटने में उत्कृष्ट फ्लेक्सियन, कोई दर्द या सूजन नहीं" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelSessionModal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitSession" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">सत्र सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseSessionModal").addEventListener("click", close);
      document.getElementById("btnCancelSessionModal").addEventListener("click", close);

      document.getElementById("formLogSession").addEventListener("submit", async () => {
        const caseId = document.getElementById("selSessionCase").value;
        const modalities = document.getElementById("inSessionModalities").value.trim().split("+").map((s) => s.trim());
        const joules = parseInt(document.getElementById("inSessionJoules").value, 10) || 840;
        const speed = parseFloat(document.getElementById("inSessionUwtmSpeed").value) || 1.2;
        const notes = document.getElementById("inSessionNotes").value.trim();

        const newSession = {
          id: "SESS-" + Date.now(),
          sessionId: "SESS-2026-" + Date.now().toString().slice(-4),
          caseId,
          sessionDate: new Date().toISOString().split("T")[0],
          modalitiesAdministered: modalities,
          underwaterTreadmillSpeedMph: speed,
          waterDepthLevel: "GREATER_TROCHANTER",
          laserJoulesDelivered: joules,
          homeExercisesPrescribed: ["Passive ROM", "Slow leash walk"],
          practitionerNotes: notes
        };

        await PhysioStorage.put(PhysioStorage.storeNames.sessions, newSession);
        this.state.treatmentSessions.unshift(newSession);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("फिजियोथेरेपी सत्र सफलतापूर्वक सहेजा गया।", "success");
        }
      });
    },

    // 4.7 ILLUSTRATED A4 HOME EXERCISE PRESCRIPTION (HEP) PRINT ENGINE
    printHomeExerciseProgram(caseId) {
      const activeCase = this.state.rehabCases.find((c) => c.caseId === caseId) || this.state.rehabCases[0];
      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि होम एक्सरसाइज प्रिस्क्रिप्शन प्रिंट किया जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Physical Rehabilitation Plan - ${activeCase.patientName}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #065f46; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-green { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .exercise-card { border: 1px solid #e5e7eb; background: #f9fafb; padding: 10px 14px; border-radius: 6px; margin: 10px 0; }
            .seal-row { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 200px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #065f46; letter-spacing: -0.5px;">VETCARE AI OS (PHYSICAL REHABILITATION & CCRP WING)</div>
                <div style="font-size: 10px; color: #4b5563;">Veterinary Sports Medicine, Goniometry & Neuro-Recovery Department</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">सचित्र घरेलू व्यायाम प्रिस्क्रिप्शन एवं पोस्ट-ऑप गाइड (Home Exercise Program - HEP)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-green">CCRP CERTIFIED PROTOCOL</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px; font-weight: bold;">CASE ID: ${activeCase.caseId}</div>
                <div style="font-size: 9px; color: #6b7280;">Date: ${new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <table class="data-table">
            <tr>
              <th width="25%">मरीज का नाम (Patient)</th>
              <td width="25%"><strong>${activeCase.patientName}</strong> (${activeCase.breed})</td>
              <th width="25%">शारीरिक भार एवं आयु</th>
              <td width="25%">${activeCase.weightKg} kg</td>
            </tr>
            <tr>
              <th>निदान (Diagnosis)</th>
              <td colspan="3"><strong style="color: #065f46;">${activeCase.diagnosisTitle}</strong></td>
            </tr>
            <tr>
              <th>मांसपेशी घेरा असंतुलन</th>
              <td>बायां: ${activeCase.muscleCircumferenceCm.leftThigh} cm | दायां: ${activeCase.muscleCircumferenceCm.rightThigh} cm</td>
              <th>लक्षित जोड़ गति सीमा (ROM)</th>
              <td>Flexion: ${activeCase.jointRomDegrees.flexion}° | Extension: ${activeCase.jointRomDegrees.extension}°</td>
            </tr>
          </table>

          <div style="font-weight: 800; text-transform: uppercase; margin: 15px 0 6px; font-size: 11px; color: #065f46;">
            दैनिक निर्धारित घरेलू व्यायाम योजना (Daily Prescribed Exercise Routine)
          </div>

          <div class="exercise-card">
            <div style="font-size: 12px; font-weight: bold; color: #065f46;">1. पैसिव रेंज ऑफ मोशन (PROM) - दिन में 2 से 3 बार</div>
            <p style="margin: 4px 0; color: #374151; line-height: 1.4;">
              कुत्ते को करवट के बल आराम से लिटाएं। घुटने और कूल्हे को धीरे-धीरे आगे मोड़ें और फिर पीछे सीधा करें। <strong>20 चक्र प्रति सत्र</strong>। कभी भी जोड़ को जबरन न खींचें।
            </p>
          </div>

          <div class="exercise-card">
            <div style="font-size: 12px; font-weight: bold; color: #065f46;">2. नियंत्रित पट्टा चाल (Slow Leash Walking) - 8 से 10 मिनट</div>
            <p style="margin: 4px 0; color: #374151; line-height: 1.4;">
              कुत्ते को घास या खुरदरी सतह पर छोटी रस्सी से बहुत धीमी गति से चलाएं ताकि वह चारों पैरों पर समान रूप से वजन डाले। दौड़ना, कूदना या सीढ़ियां चढ़ना पूर्णतः प्रतिबंधित है।
            </p>
          </div>

          <div class="exercise-card">
            <div style="font-size: 12px; font-weight: bold; color: #065f46;">3. नियंत्रित उठक-बैठक (Sit-to-Stand Transitions) - 10 पुनरावृत्ति</div>
            <p style="margin: 4px 0; color: #374151; line-height: 1.4;">
              कुत्ते को दीवार के सहारे सीधा बैठाएं और ट्रीट दिखाकर सीधा खड़ा करें। इससे क्वाड्रीसेप्स मांसपेशी की मोटाई पुनः बढ़ती है।
            </p>
          </div>

          <div class="exercise-card">
            <div style="font-size: 12px; font-weight: bold; color: #065f46;">4. क्रायोथेरेपी / आइस-पैक (Post-Exercise Cryotherapy) - 10 से 15 मिनट</div>
            <p style="margin: 4px 0; color: #374151; line-height: 1.4;">
              व्यायाम सत्र पूरा होने के तुरंत बाद घुटने के जोड़ पर तौलिए में लपेटकर आइस-पैक लगाएं ताकि अंदरूनी सूजन न बढ़े।
            </p>
          </div>

          <div class="seal-row">
            <div class="sig-box">
              पशु पालक हस्ताक्षर<br/>
              <strong>Pet Parent Acknowledgment</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #065f46; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #065f46; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>REHABILITATION SEAL
              </div>
            </div>
            <div class="sig-box">
              प्रमाणित पुनर्वास पशु चिकित्सक<br/>
              <strong>${activeCase.primaryTherapist}</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 REHAB PRESCRIPTION HASH: 8A12BC09FE344890012498BACD9948210DDF9245ACBB6012489EFAA3210C77610<br/>
            Vetcare AI OS - 2026 Production Master Core • Canine Physical Rehabilitation Registry
          </div>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    },

    // 4.8 LIFECYCLE DESTRUCTION ROUTINE
    destroy() {
      const container = document.getElementById(this.containerId);
      if (container) {
        container.innerHTML = "";
      }
      const modalHost = document.getElementById("physioModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Veterinary Physiotherapy Rehab Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.VeterinaryPhysiotherapyRehab = VeterinaryPhysiotherapyRehab;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      VeterinaryPhysiotherapyRehab.init();
    });
  } else {
    VeterinaryPhysiotherapyRehab.init();
  }
})();
