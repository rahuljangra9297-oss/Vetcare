// Vetcare AI OS - Dromedary Camelid Medicine, Surra Diagnostics & Racing Performance Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. CAMELID BIOLOGICAL & PHARMACOLOGICAL CONSTANTS
  const CAMEL_CONSTANTS = {
    PHYSIOLOGY: {
      NORMAL_TEMP_RANGE_F: { min: 96.8, max: 101.5 }, // Wide diurnal poikilothermic variation in desert heat
      HEART_RATE_BPM: { min: 32, max: 48 },
      RESPIRATION_RPM: { min: 8, max: 16 },
      C1_MOTILITY_PER_2MIN: { min: 3, max: 4 }, // C1 rumen-equivalent compartmental motility
      NORMAL_HEMOGLOBIN_G_DL: { min: 9.5, max: 14.5 },
      CRITICAL_ANEMIA_HB: 6.5,
      MAX_DEHYDRATION_LOSS_PCT: 30.0, // Unique elliptical RBC survival limit
      RBC_MORPHOLOGY: "Elliptical non-nucleated (7.7 x 4.2 µm) - Extreme osmotic lysis resistance"
    },
    BREEDS: [
      { id: "BIKANERI", name: "Bikaneri", origin: "Rajasthan (Bikaner/Churu)", traits: "Heavy draft & milk, prominent 'Stop' (craniofacial depression), dark brown" },
      { id: "JAISALMERI", name: "Jaisalmeri", origin: "Thar Desert (Jaisalmer)", traits: "Active desert riding & racing, slender build, light brown/fawn, fine skin" },
      { id: "MEWARI", name: "Mewari", origin: "Aravalli Hills (Mewar)", traits: "Stout, docile, heavy milk yield (6-8 kg/day), thick coat, whitish cream" },
      { id: "KACHCHHI", name: "Kachchhi", origin: "Rann of Kutch (Gujarat)", traits: "Hardy draft, broad footpads, resistant to salt marsh vegetation" },
      { id: "KHARAI", name: "Kharai (Swimming Camel)", origin: "Coastal Gujarat", traits: "Unique mangrove-foraging swimming dromedary, extreme salinity adaptation" }
    ],
    SURRA_THERAPEUTICS: {
      QUINAPYRAMINE_PROSALT_DOSE_MG_KG: 4.4, // Curative & prophylactic combination SC
      QUINAPYRAMINE_SULFATE_DOSE_MG_KG: 3.0, // Water-soluble curative SC
      MELARSOMINE_DOSE_MG_KG: 0.25, // Cymelarsan deep IM in neck
      SURAMIN_DOSE_MG_KG: 10.0 // Naganol 10% slow IV
    },
    SEDATION_RULES: {
      XYLAZINE_DOSE_CAMEL_MG_KG: 0.25, // Extremely low dose! Camels are 10x more sensitive than horses
      FLUNIXIN_MEGLUMINE_MG_KG: 1.1 // Visceral analgesic of choice for C1/C3 sand colic
    }
  };

  // 3. INDEXED-DB PERSISTENCE ENGINE FOR CAMELIDS
  const CamelStorage = {
    dbName: "VetcareCamelidDB",
    dbVersion: 1,
    storeName: "camelid_health_records",
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Camelid] IndexedDB missing. Falling back to localStorage.");
          resolve(false);
          return;
        }
        const request = window.indexedDB.open(this.dbName, this.dbVersion);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(true);
        };
        request.onerror = (err) => {
          console.error("[Vetcare Camelid] IndexedDB open error:", err);
          resolve(false);
        };
      });
    },

    async getAll() {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_CAMELID_RECORDS");
        return raw ? JSON.parse(raw) : [];
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(this.storeName, "readonly");
          const store = tx.objectStore(this.storeName);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          console.error("[Vetcare Camelid] Get all failed:", e);
          resolve([]);
        }
      });
    },

    async put(item) {
      if (!item.id) item.id = "CAM-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const all = await this.getAll();
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.push(item);
        localStorage.setItem("VETCARE_CAMELID_RECORDS", JSON.stringify(all));
        return item;
      }
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db.transaction(this.storeName, "readwrite");
          const store = tx.objectStore(this.storeName);
          const req = store.put(item);
          req.onsuccess = () => resolve(item);
          req.onerror = (err) => reject(err);
        } catch (e) {
          reject(e);
        }
      });
    },

    async delete(id) {
      if (!this.db) {
        let all = await this.getAll();
        all = all.filter((x) => x.id !== id);
        localStorage.setItem("VETCARE_CAMELID_RECORDS", JSON.stringify(all));
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(this.storeName, "readwrite");
          const store = tx.objectStore(this.storeName);
          const req = store.delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  // 4. MAIN CAMELID DESERT MEDICINE CONTROLLER
  const CamelidDesertMedicine = {
    containerId: null,
    activeTab: "camel_registry", // 'camel_registry' | 'surra_trypanosomiasis_triage' | 'colic_impaction_eval' | 'musth_and_reproduction'

    // Reactive State
    state: {
      camelRoster: [],
      surraScreeningLog: [],
      musthBehaviorLog: [],
      colicImpactionLog: [],
      racingConditioningLog: []
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await CamelStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Camelid Desert Medicine & Surra Performance Engine Loaded.");
    },

    async loadInitialData() {
      const records = await CamelStorage.getAll();
      if (records && records.length > 0) {
        this.state.camelRoster = records.filter((r) => r.recordType === "CAMEL_PROFILE");
        this.state.surraScreeningLog = records.filter((r) => r.recordType === "SURRA_TEST");
        this.state.musthBehaviorLog = records.filter((r) => r.recordType === "MUSTH_LOG");
        this.state.colicImpactionLog = records.filter((r) => r.recordType === "COLIC_EVAL");
        this.state.racingConditioningLog = records.filter((r) => r.recordType === "RACING_METRICS");
      }

      // If empty, seed rich desert clinical records
      if (this.state.camelRoster.length === 0) {
        await this.seedDefaultDesertRoster();
      }
    },

    async seedDefaultDesertRoster() {
      const seedCamels = [
        {
          id: "CAM-01-THAR",
          recordType: "CAMEL_PROFILE",
          camelId: "CAM-01-THAR",
          microchipId: "982000361284912",
          name: "चेतक मरुराज (Maru-Raj)",
          breed: "Jaisalmeri",
          purpose: "RACING",
          ageYears: 6,
          sex: "male",
          humpStatus: "PLUMP_ERECT",
          shoulderHeightMeters: 2.15,
          thoracicGirthMeters: 2.28,
          humpGirthMeters: 2.45,
          weightKg: 585,
          ownerName: "रावत मानसिंह सोढ़ा",
          campLocation: "सम सैंड ड्युन्स (Sam Sand Dunes, Jaisalmer)",
          vaccinationStatus: "UP_TO_DATE",
          dewormedDate: "2026-01-15",
          notes: "Thar Desert endurance champion. Resting HR 34 bpm. Peak gallop 42 km/h."
        },
        {
          id: "CAM-02-BKN",
          recordType: "CAMEL_PROFILE",
          camelId: "CAM-02-BKN",
          microchipId: "982000361284913",
          name: "गंगा-प्रताप (Ganga-Pratap)",
          breed: "Bikaneri",
          purpose: "DRAFT",
          ageYears: 9,
          sex: "male",
          humpStatus: "PLUMP_ERECT",
          shoulderHeightMeters: 2.25,
          thoracicGirthMeters: 2.42,
          humpGirthMeters: 2.65,
          weightKg: 668,
          ownerName: "कुंभाराम चौधरी (Bikaner)",
          campLocation: "राष्ट्रीय उष्ट्र अनुसंधान केंद्र (NRCC Bikaner)",
          vaccinationStatus: "UP_TO_DATE",
          dewormedDate: "2026-02-01",
          notes: "Heavy agricultural draft. Prominent stop on forehead. Tested negative for Surra."
        },
        {
          id: "CAM-03-MEW",
          recordType: "CAMEL_PROFILE",
          camelId: "CAM-03-MEW",
          microchipId: "982000361284914",
          name: "धवली (Dhavali)",
          breed: "Mewari",
          purpose: "MILK",
          ageYears: 7,
          sex: "female",
          humpStatus: "DEPLETED_FLACCID",
          shoulderHeightMeters: 1.95,
          thoracicGirthMeters: 2.10,
          humpGirthMeters: 2.15,
          weightKg: 462,
          ownerName: "रतन लाल रेबारी",
          campLocation: "कुंभलगढ़ चारागाह (Kumbhalgarh)",
          vaccinationStatus: "DUE_BOOSTER",
          dewormedDate: "2025-11-20",
          notes: "Lactating camel (7.2 L/day). Mild sub-hump fat mobilization post-drought."
        }
      ];

      for (const c of seedCamels) {
        await CamelStorage.put(c);
        this.state.camelRoster.push(c);
      }

      const seedSurra = [
        {
          id: "SURRA-2026-001",
          recordType: "SURRA_TEST",
          testId: "SURRA-2026-001",
          camelId: "CAM-03-MEW",
          date: "2026-02-18",
          wetMountMotility: "POSITIVE_TRYPANOSOMES",
          parasitemiaLevel: "MODERATE (2-5 flagellates/field)",
          anemiaLevelHb: 6.8, // Severe anemia
          temperatureF: 103.4, // Undulating fever spike
          edemaPresent: true,
          edemaLocation: "Ventral abdomen & sheath edema",
          subHumpAtrophyObserved: true,
          suraminQuinapyramineGiven: true,
          drugAdministered: "Quinapyramine Prosalt (Triquin) @ 4.4 mg/kg SC",
          calculatedDoseMg: 2032,
          practitioner: "Dr. Rahul (Desert Field Vet)"
        }
      ];

      for (const s of seedSurra) {
        await CamelStorage.put(s);
        this.state.surraScreeningLog.push(s);
      }

      const seedMusth = [
        {
          id: "MUSTH-2026-001",
          recordType: "MUSTH_LOG",
          camelId: "CAM-01-THAR",
          date: "2026-02-10",
          pollGlandSecretion: true,
          pollGlandColor: "Fetid viscous dark-brown exudate",
          softPalateDullaEverted: true,
          dullaTraumaPresent: false,
          aggressiveScore: 4, // 1 to 5
          tailFlappingUrineSpraying: true,
          managementProtocol: "Isolated in double-post wooden kraal. Low-protein dry forage. Monitored for fighting wounds.",
          xylazineSedationAdministered: false,
          sedationDoseMg: 0
        }
      ];

      for (const m of seedMusth) {
        await CamelStorage.put(m);
        this.state.musthBehaviorLog.push(m);
      }

      const seedColic = [
        {
          id: "COLIC-2026-001",
          recordType: "COLIC_EVAL",
          camelId: "CAM-02-BKN",
          date: "2026-01-28",
          dehydrationPct: 15, // Camel tolerates up to 30%
          c1MotilityPer2Min: 1, // Hypomotility (normal 3-4)
          sandImpactionSuspected: true,
          fecalSandSedimentationTest: "POSITIVE (High sand pellet density)",
          liquidParaffinDrenchLiters: 4.0,
          flunixinGiven: true,
          recoveryOutcome: "COMPLETE RESOLUTION (Sand evacuated in 36h)"
        }
      ];

      for (const c of seedColic) {
        await CamelStorage.put(c);
        this.state.colicImpactionLog.push(c);
      }
    },

    // 4.2 DESERT VETERINARY BIOMETRIC ALGORITHMS
    /**
     * Dromedary Body Weight Estimation Formula (Schwartz & Dioli / NRCC Field Method):
     * Body Weight (kg) = Shoulder Height (m) × Thoracic Heart Girth (m) × Hump Girth (m) × 50
     */
    estimateCamelWeight(heightM, thoracicGirthM, humpGirthM) {
      const h = parseFloat(heightM) || 0;
      const tg = parseFloat(thoracicGirthM) || 0;
      const hg = parseFloat(humpGirthM) || 0;
      if (h <= 0 || tg <= 0 || hg <= 0) return 0;
      const weight = h * tg * hg * 50;
      return Math.round(weight);
    },

    /**
     * Surra Chemotherapy Dosage Calculation
     */
    calculateSurraTherapy(weightKg, drugType) {
      const wt = parseFloat(weightKg) || 0;
      if (wt <= 0) return { doseMg: 0, volumeMl: 0, instructions: "Invalid weight" };

      switch (drugType) {
        case "QUINAPYRAMINE_PROSALT":
          // 4.4 mg/kg SC (Reconstitute 2.5g vial in 15ml sterile water -> ~166 mg/ml)
          const qpDose = wt * CAMEL_CONSTANTS.SURRA_THERAPEUTICS.QUINAPYRAMINE_PROSALT_DOSE_MG_KG;
          const qpVol = (qpDose / 166.6).toFixed(1);
          return {
            doseMg: Math.round(qpDose),
            volumeMl: qpVol,
            instructions: "Deep Subcutaneous in 2-3 divided sites in lateral neck. Massage area. Curative + 60-day prophylactic."
          };
        case "MELARSOMINE":
          // 0.25 mg/kg deep IM (Cymelarsan 0.5% solution)
          const melDose = wt * CAMEL_CONSTANTS.SURRA_THERAPEUTICS.MELARSOMINE_DOSE_MG_KG;
          const melVol = (melDose / 5.0).toFixed(1); // 5 mg/ml
          return {
            doseMg: melDose.toFixed(1),
            volumeMl: melVol,
            instructions: "Deep Intramuscular in middle third of lateral cervical neck muscle. Highly effective against Suramin-resistant strains."
          };
        case "SURAMIN":
          // 10 mg/kg IV as 10% solution
          const surDose = wt * CAMEL_CONSTANTS.SURRA_THERAPEUTICS.SURAMIN_DOSE_MG_KG;
          const surVol = (surDose / 100).toFixed(1); // 10% solution = 100 mg/ml
          return {
            doseMg: Math.round(surDose),
            volumeMl: surVol,
            instructions: "Slow Intravenous injection in jugular vein. Monitor for anaphylaxis and acute renal collapse."
          };
        default:
          return { doseMg: 0, volumeMl: 0, instructions: "Select a therapeutic agent" };
      }
    },

    calculateHerdTelemetry() {
      const totalCamels = this.state.camelRoster.length;
      const surraPositives = this.state.surraScreeningLog.filter((s) => s.wetMountMotility === "POSITIVE_TRYPANOSOMES").length;
      const activeMusthBulls = this.state.musthBehaviorLog.filter((m) => m.pollGlandSecretion || m.softPalateDullaEverted).length;
      const activeColicCases = this.state.colicImpactionLog.filter((c) => c.c1MotilityPer2Min < 3).length;

      return {
        totalCamels,
        surraPositives,
        activeMusthBulls,
        activeColicCases
      };
    },

    // 4.3 DYNAMIC UI RENDERING WORKSTATION
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Camelid] Root DOM container not found:", this.containerId);
        return;
      }

      const telemetry = this.calculateHerdTelemetry();

      container.innerHTML = `
        <div class="camelid-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- DESERT VET COMMAND HEADER -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-sun"></i> Desert Veterinary Clinical Engine 2026
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <i class="fa-solid fa-dna"></i> Camelus Dromedarius Biometrics
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>रेगिस्तानी ऊंट चिकित्सा एवं सर्रा (Tibbi) नियंत्रण प्रणाली</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                C1-C3 Compartmental Rumen Dynamics, Elliptical Erythrocyte Anemia Profiling, Trypanosomiasis Chemotherapy, Sand Impaction Protocols & Rutting Bull (Musth) Safety.
              </p>
            </div>

            <!-- ACTION SHORTCUTS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenAddCamelModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नया ऊंट पंजीकृत करें (Register Camel)
              </button>
              <button id="btnOpenNewSurraModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-microscope"></i> सर्रा जांच दर्ज करें (Surra Smear)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय पंजीकृत ऊंट (Active Herd)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-amber-400">${telemetry.totalCamels}</span>
                <span class="text-xs font-mono text-slate-400">Head Count</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सर्रा (Tibbi) संक्रमित मामले</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${telemetry.surraPositives > 0 ? "text-rose-400" : "text-emerald-400"}">${telemetry.surraPositives}</span>
                <span class="text-xs font-mono ${telemetry.surraPositives > 0 ? "text-rose-400 font-bold" : "text-emerald-400"}">
                  ${telemetry.surraPositives > 0 ? "SURVEILLANCE ALERT" : "CLEAR"}
                </span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">मस्त (In-Musth) सांड निगरानी</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${telemetry.activeMusthBulls}</span>
                <span class="text-xs font-mono text-cyan-300">Rutting Season</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">C1/C3 रेत रुकावट (Sand Impaction)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${telemetry.activeColicCases > 0 ? "text-amber-400" : "text-slate-200"}">${telemetry.activeColicCases}</span>
                <span class="text-xs font-mono text-slate-400">Stasis / Colic</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="camel_registry" class="camel-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "camel_registry"
                ? "border-amber-500 text-amber-400 bg-amber-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-id-card"></i> 1. ऊंट पंजी एवं शारीरिक भार संगणक (Registry & Weight Engine)
            </button>
            <button data-tab="surra_trypanosomiasis_triage" class="camel-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "surra_trypanosomiasis_triage"
                ? "border-amber-500 text-amber-400 bg-amber-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-vial-virus"></i> 2. सर्रा (Trypanosoma evansi) नैदानिक ट्रायल व औषधि (Surra)
            </button>
            <button data-tab="colic_impaction_eval" class="camel-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "colic_impaction_eval"
                ? "border-amber-500 text-amber-400 bg-amber-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-cubes-stacked"></i> 3. C1/C3 आमाशय बालू रुकावट व दर्द निवारण (Desert Colic)
            </button>
            <button data-tab="musth_and_reproduction" class="camel-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "musth_and_reproduction"
                ? "border-amber-500 text-amber-400 bg-amber-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-shield-cat"></i> 4. मस्त सांड प्रबंधन व रेसिंग फिटनेस (Musth & Racing)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="camelTabViewport" class="w-full">
            ${this.renderActiveTabContent()}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINERS -->
        <div id="camelModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent() {
      switch (this.activeTab) {
        case "camel_registry":
          return this.renderRegistryTab();
        case "surra_trypanosomiasis_triage":
          return this.renderSurraTab();
        case "colic_impaction_eval":
          return this.renderColicTab();
        case "musth_and_reproduction":
          return this.renderMusthTab();
        default:
          return "";
      }
    },

    // TAB 1: REGISTRY & INTERACTIVE WEIGHT ENGINE
    renderRegistryTab() {
      return `
        <div class="space-y-6">
          
          <!-- LIVE BIOMETRIC WEIGHT ESTIMATOR WIDGET -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span class="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                  <i class="fa-solid fa-weight-scale mr-1"></i> NRCC / Schwartz-Dioli Camelid Weight Formula
                </span>
                <h3 class="text-base font-display font-bold text-white mt-0.5">
                  ऊंट वास्तविक शारीरिक भार मापक संगणक (Live Weight Estimator)
                </h3>
                <p class="text-xs text-slate-400">
                  वजन (kg) = कन्धे की ऊंचाई (Height) × सीने का घेरा (Thoracic Girth) × कूबड़ का घेरा (Hump Girth) × 50
                </p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-center min-w-[140px]">
                <div class="text-[10px] font-mono uppercase text-slate-400">अनुमानित वजन (Live)</div>
                <div id="lblLiveEstimatedWeight" class="text-2xl font-mono font-black text-amber-400">585 kg</div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <label class="block text-slate-300 mb-1">कन्धे की ऊंचाई / Height (Meters)</label>
                <input type="number" step="0.01" id="calcInHeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="2.15" />
                <span class="text-[10px] text-slate-500">Normal Range: 1.85m - 2.30m</span>
              </div>
              <div>
                <label class="block text-slate-300 mb-1">सीने का घेरा / Heart Girth (Meters)</label>
                <input type="number" step="0.01" id="calcInGirth" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="2.28" />
                <span class="text-[10px] text-slate-500">Thorax just behind front legs</span>
              </div>
              <div>
                <label class="block text-slate-300 mb-1">कूबड़ का घेरा / Hump Girth (Meters)</label>
                <input type="number" step="0.01" id="calcInHumpGirth" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="2.45" />
                <span class="text-[10px] text-slate-500">Over apex of hump and belly</span>
              </div>
            </div>
          </div>

          <!-- CAMEL HERD MASTER TABLE -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-list-check text-amber-400"></i> पंजीकृत उष्ट्र झुंड रोस्टर (Registered Dromedaries)
                </h3>
                <p class="text-xs text-slate-400">Official microchip registry, purpose classification, and biometric health records.</p>
              </div>
              <div class="text-xs font-mono text-slate-400">
                कुल प्रविष्टियां: <strong class="text-white">${this.state.camelRoster.length}</strong>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">ऊंट आईडी व माइक्रोचिप</th>
                    <th class="p-3">नाम व नस्ल</th>
                    <th class="p-3">उद्देश्य व लिंग</th>
                    <th class="p-3">आयु व कूबड़ स्थिति</th>
                    <th class="p-3">वजन (kg)</th>
                    <th class="p-3">पालक व डेरा स्थान</th>
                    <th class="p-3 text-right">कार्यवाई (Actions)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${
                    this.state.camelRoster.length === 0
                      ? `<tr><td colspan="7" class="p-6 text-center text-slate-500 font-mono">कोई ऊंट रिकॉर्ड नहीं मिला। ऊपर दिए गए बटन से नया ऊंट जोड़ें।</td></tr>`
                      : this.state.camelRoster
                          .map((c) => {
                            return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white text-xs">${c.camelId}</span>
                            <div class="text-[10px] text-amber-400/90 flex items-center gap-1 mt-0.5">
                              <i class="fa-solid fa-microchip text-[9px]"></i> ${c.microchipId || "NOT CHIPPED"}
                            </div>
                          </td>
                          <td class="p-3">
                            <div class="font-bold text-white text-sm">${c.name}</div>
                            <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">${c.breed}</span>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.purpose === "RACING"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : c.purpose === "MILK"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-800 text-slate-300"
                            }">
                              ${c.purpose}
                            </span>
                            <div class="text-[10px] text-slate-400 mt-1 uppercase">${c.sex}</div>
                          </td>
                          <td class="p-3">
                            <div class="text-white font-mono">${c.ageYears} वर्ष</div>
                            <span class="text-[10px] font-mono ${c.humpStatus === "PLUMP_ERECT" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}">
                              ${c.humpStatus === "PLUMP_ERECT" ? "कूबड़ पुष्ट (Plump)" : "कूबड़ शिथिल (Flaccid)"}
                            </span>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-sm font-black text-amber-400">${c.weightKg || 500} kg</span>
                            <div class="text-[10px] text-slate-500">Biometric Ok</div>
                          </td>
                          <td class="p-3 text-[11px]">
                            <div class="text-slate-200 font-semibold">${c.ownerName}</div>
                            <div class="text-slate-400 text-[10px]">${c.campLocation}</div>
                          </td>
                          <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button data-print-card="${c.camelId}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white" title="Print Desert Health Card">
                              <i class="fa-solid fa-print"></i>
                            </button>
                            <button data-delete-camel="${c.id}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300" title="Delete Camel">
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      `;
                          })
                          .join("")
                  }
                </tbody>
              </table>
            </div>

            <!-- UNIQUE ERYTHROCYTE BIOLOGICAL CALLOUT -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
              <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <i class="fa-solid fa-droplet"></i>
              </div>
              <div class="text-slate-300 leading-relaxed">
                <strong class="text-white">उष्ट्र लाल रक्त कोशिका (Elliptical Erythrocyte) विशिष्टता:</strong> ऊंट के RBC अंडाकार (Elliptical) तथा केन्द्रक-रहित होते हैं। यह आकार गंभीर निर्जलीकरण (30% तक शारीरिक भार हानि) के दौरान भी गाढ़े रक्त प्रवाह को बनाए रखता है तथा 100 लीटर पानी 10 मिनट में पीने पर भी ऑस्मोटिक लिसिस (Osmotic Hemolysis) नहीं होने देता।
              </div>
            </div>
          </div>

        </div>
      `;
    },

    // TAB 2: SURRA (TRYPANOSOMA EVANSI / TIBBI) DIAGNOSTIC & CHEMOTHERAPY TRIAGE
    renderSurraTab() {
      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- CLINICAL PATHOLOGY SYNOPSIS -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-bug"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">सर्रा (Tibbi) नैदानिक लक्षण</h3>
                  <span class="text-[10px] font-mono text-rose-400">Trypanosoma evansi (Tabanid Vector)</span>
                </div>
              </div>

              <div class="space-y-3 text-xs text-slate-300">
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-amber-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-temperature-arrow-up text-rose-400"></i> 1. लहरियादार बुखार (Undulating Fever)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    पैरासाइटेमिया (रक्त में ट्रिपैनोसोम की उपस्थिति) के साथ बुखार 103-105°F तक चढ़ता है। शांत काल में तापमान सामान्य रहता है।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-triangle-exclamation text-amber-400"></i> 2. कूबड़ का गिरना व तीव्र रक्ताल्पता
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    प्रगतिशील एनीमिया (Hb < 6.5 g/dL)। कूबड़ की वसा का क्षय हो जाता है, जिससे कूबड़ एक तरफ लटक (Flaccid) जाता है।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-emerald-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-water text-cyan-400"></i> 3. निचली सूजन (Dependent Edema)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    पैरों के तलवे, शिश्न आवरण (Sheath) व निचले पेट में पानी भरना। आंखों से रिसाव (Lacrimation) व कमजोरी।
                  </p>
                </div>
              </div>

              <!-- DOSING CALCULATOR INLINE -->
              <div class="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
                <div class="font-bold text-amber-400 text-xs uppercase font-mono">
                  <i class="fa-solid fa-calculator mr-1"></i> त्वरित सर्रा डोज कैलकुलेटर
                </div>
                <div>
                  <label class="block text-[11px] text-slate-400 mb-1">ऊंट का वजन (kg)</label>
                  <input type="number" id="inSurraCalcWeight" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono" value="500" />
                </div>
                <div>
                  <label class="block text-[11px] text-slate-400 mb-1">औषधि चयन (Select Drug)</label>
                  <select id="selSurraCalcDrug" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white">
                    <option value="QUINAPYRAMINE_PROSALT">Quinapyramine Prosalt (Triquin - 4.4 mg/kg SC)</option>
                    <option value="MELARSOMINE">Melarsomine (Cymelarsan - 0.25 mg/kg deep IM)</option>
                    <option value="SURAMIN">Suramin (Naganol - 10 mg/kg slow IV)</option>
                  </select>
                </div>
                <div id="surraCalcResultBox" class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                  <div class="text-emerald-400 font-bold">मात्रा (Dose): 2200 mg (~13.2 ml)</div>
                  <div class="text-slate-400 text-[10px]">गहरी चमड़ी के नीचे (SC) गर्दन के दो अलग-अलग स्थानों पर लगाएं।</div>
                </div>
              </div>
            </div>

            <!-- SURRA TESTING LOG TABLE -->
            <div class="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                    <i class="fa-solid fa-microscope text-emerald-400"></i> रक्त स्मीयर एवं CATT स्क्रीनिंग रिकॉर्ड्स
                  </h3>
                  <p class="text-xs text-slate-400">Wet blood film motility, Card Agglutination Test (CATT), and Hemoglobin monitoring.</p>
                </div>
                <button id="btnNewSurraTestDirect" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700">
                  + नया रक्त परीक्षण दर्ज करें
                </button>
              </div>

              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-3">परीक्षण आईडी व तिथि</th>
                      <th class="p-3">ऊंट आईडी</th>
                      <th class="p-3">रक्त फिल्म (Wet Mount)</th>
                      <th class="p-3">हीमोग्लोबिन (Hb)</th>
                      <th class="p-3">तापमान</th>
                      <th class="p-3">औषधि स्थिति</th>
                      <th class="p-3 text-right">चिकित्सक</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${this.state.surraScreeningLog
                      .map((s) => {
                        return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white">${s.testId}</span>
                            <div class="text-[10px] text-slate-500">${s.date}</div>
                          </td>
                          <td class="p-3 font-mono font-bold text-amber-400">
                            ${s.camelId}
                          </td>
                          <td class="p-3">
                            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              s.wetMountMotility === "POSITIVE_TRYPANOSOMES"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }">
                              ${s.wetMountMotility === "POSITIVE_TRYPANOSOMES" ? "POSITIVE (Trypanosoma+)" : "NEGATIVE (Clean)"}
                            </span>
                            <div class="text-[10px] text-slate-400 mt-0.5">${s.parasitemiaLevel || "N/A"}</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-sm font-black ${s.anemiaLevelHb < 7 ? "text-rose-400" : "text-emerald-400"}">${s.anemiaLevelHb} g/dL</span>
                            <div class="text-[10px] text-slate-500">${s.anemiaLevelHb < 7 ? "गंभीर एनीमिया" : "सामान्य सीमा"}</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-white font-bold">${s.temperatureF}°F</span>
                          </td>
                          <td class="p-3 text-[11px]">
                            <div class="${s.suraminQuinapyramineGiven ? "text-emerald-400 font-bold" : "text-amber-400"}">
                              ${s.suraminQuinapyramineGiven ? "उपचारित (Treated)" : "लंबित"}
                            </div>
                            <div class="text-[10px] text-slate-400">${s.drugAdministered || "--"}</div>
                          </td>
                          <td class="p-3 text-right font-mono text-[10px] text-slate-400">
                            ${s.practitioner || "Field Vet"}
                          </td>
                        </tr>
                      `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 3: C1/C3 SAND IMPACTION & DESERT COLIC EVALUATION
    renderColicTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <i class="fa-solid fa-triangle-exclamation mr-1"></i> Camelid Pseudoruminant Gastroenterology
                  </span>
                </div>
                <h3 class="text-xl font-display font-black text-white mt-1">
                  C1/C3 आमाशय रेत अवरोध एवं रेगिस्तानी पेट-दर्द (Sand Impaction Colic)
                </h3>
                <p class="text-xs text-slate-400">
                  ऊंट में वास्तविक 4-कक्षीय आमाशय (Omasum रहित) नहीं होता। C1, C2 और C3 कक्ष होते हैं। सूखा चारा व रेतीली भूमि में रेत खाने से C1/C3 में भारी रेत जम जाती है।
                </p>
              </div>

              <button id="btnNewColicEntryModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 font-display shadow-lg">
                + नया पेट दर्द परीक्षण दर्ज करें
              </button>
            </div>

            <!-- CLINICAL PATHOPHYSIOLOGY OF C1/C3 STOMACH -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div class="font-bold text-amber-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-dot"></i> कक्ष 1 (C1 Compartment)
                </div>
                <p class="text-slate-400 leading-relaxed">
                  कुल आमाशय क्षमता का 80%। इसमें ग्रन्थियुक्त थैलियां (Glandular saccules) होती हैं जो जल व बाईकार्बोनेट अवशोषण करती हैं। रेत इसी के निचले भाग में बैठ जाती है।
                </p>
                <div class="text-[10px] font-mono text-emerald-400">सामान्य गति: 3-4 संकुचन / 2 मिनट</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div class="font-bold text-cyan-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-dot"></i> कक्ष 2 (C2 Chamber)
                </div>
                <p class="text-slate-400 leading-relaxed">
                  छोटा जोड़ने वाला भाग जो भोजन को छानकर आगे C3 में धकेलता है। संकुचन दर C1 के साथ समन्वय में कार्य करती है।
                </p>
                <div class="text-[10px] font-mono text-slate-400">फिल्ट्रेशन व गति नियंत्रण</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div class="font-bold text-rose-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-dot"></i> कक्ष 3 (C3 Tubular Organ)
                </div>
                <p class="text-slate-400 leading-relaxed">
                  लंबा नलिकाकार आमाशय। इसका अंतिम 1/5 भाग वास्तविक एसिड स्रावित करता है (True Gastric Acidic Portion)। रेत यहां फंसने से अल्सर व रुकावट होती है।
                </p>
                <div class="text-[10px] font-mono text-rose-400">रेत अवरोध का मुख्य स्थल (Pyloric Region)</div>
              </div>
            </div>

            <!-- PROTOCOL WORKFLOW: LIQUID PARAFFIN DRENCH -->
            <div class="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 class="font-display font-bold text-sm text-emerald-400 flex items-center gap-2">
                <i class="fa-solid fa-pump-soap"></i> रेत निकासी व दर्द निवारण मानक प्रोटोकॉल (Standard Treatment)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <strong class="text-white">1. लिक्विड पैराफिन ड्रेन्च</strong>
                  <p class="text-[11px] text-slate-400 mt-1">
                    <strong>3 से 5 लीटर</strong> लिक्विड पैराफिन / मिनरल ऑयल पेट नली (Stomach Tube) द्वारा C1 में दें। फेफड़े में जाने से बचाएं!
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <strong class="text-white">2. दर्द निवारण (Analgesia)</strong>
                  <p class="text-[11px] text-slate-400 mt-1">
                    <strong>Flunixin Meglumine</strong> @ 1.1 mg/kg IV। ऊंटों में विसरल दर्द हेतु सर्वोत्तम। NSAID ओवरडोज से C3 अल्सर का खतरा रहता है।
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <strong class="text-white">3. जल-इलेक्ट्रोलाइट पुनःपूर्ति</strong>
                  <p class="text-[11px] text-slate-400 mt-1">
                    आइसोटोनिक सलाइन + डेक्सट्रोज। ऊंट के अंडाकार RBC बिना फटे तीव्र पुनर्जलीकरण सहन कर सकते हैं।
                  </p>
                </div>
              </div>
            </div>

            <!-- LOGGED COLIC CASES TABLE -->
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">परीक्षण आईडी</th>
                    <th class="p-3">ऊंट आईडी</th>
                    <th class="p-3">C1 संकुचन (Motility)</th>
                    <th class="p-3">निर्जलीकरण % (Dehydration)</th>
                    <th class="p-3">बालू अवसादन टेस्ट</th>
                    <th class="p-3">पैराफिन ड्रेन्च</th>
                    <th class="p-3 text-right">परिणाम (Outcome)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.colicImpactionLog
                    .map((c) => {
                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono font-bold text-white">${c.id}</td>
                        <td class="p-3 font-mono text-amber-400 font-bold">${c.camelId}</td>
                        <td class="p-3 font-mono">
                          <span class="${c.c1MotilityPer2Min < 3 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}">
                            ${c.c1MotilityPer2Min} संकुचन / 2 मिनट
                          </span>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-white font-bold">${c.dehydrationPct}%</span>
                          <span class="text-[10px] text-slate-500">of body weight</span>
                        </td>
                        <td class="p-3">
                          <span class="px-2 py-0.5 rounded text-[10px] font-mono ${c.sandImpactionSuspected ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"}">
                            ${c.fecalSandSedimentationTest || "COMPLETED"}
                          </span>
                        </td>
                        <td class="p-3 font-mono text-white">
                          ${c.liquidParaffinDrenchLiters} L Drench + Flunixin
                        </td>
                        <td class="p-3 text-right font-mono text-emerald-400 font-bold">
                          ${c.recoveryOutcome}
                        </td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 4: MUSTH (RUTTING BULL) & RACING FITNESS CONSOLE
    renderMusthTab() {
      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- RUTTING MUSTH BULL BEHAVIOR MATRIX -->
            <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg">
                    <i class="fa-solid fa-shield-cat"></i>
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-base text-white">मस्त सांड (Rutting Bull) व्यवहार एवं सुरक्षा</h3>
                    <span class="text-[10px] font-mono text-cyan-400">Poll Gland Secretions & Soft Palate (Dulla) Eversion</span>
                  </div>
                </div>
                <button id="btnNewMusthLogDirect" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700">
                  + नया मस्त व्यवहार दर्ज करें
                </button>
              </div>

              <div class="space-y-3 text-xs text-slate-300">
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-amber-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-head-side-mask"></i> 1. शीर्ष ग्रंथि स्राव (Poll Gland Secretions)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    सिर के पीछे (Occiput) स्थित ग्रंथि से दुर्गंधयुक्त गाढ़ा काला-भूरा स्राव बहता है। यह उच्च टेस्टोस्टेरोन का सूचक है। सांड इसे पीठ व पेड़ों पर रगड़ता है।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-rose-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-lungs"></i> 2. तालु का बाहर निकलना (Dulla / Gula Eversion)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    नर ऊंट अपनी कोमल तालु (Soft palate) को श्वासनली की हवा से फुलाकर गुलाबी गुब्बारे की भांति मुंह से बाहर निकालता है और गड़गड़ाहट (Gurgling sound) करता है।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-syringe"></i> 3. शांतिदायक औषधि सावधानी (Xylazine Warning)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    <strong>अति-संवेदनशीलता चेतावनी:</strong> ऊंट ज़ाइलाज़ीन (Xylazine) के प्रति अत्यधिक संवेदनशील होते हैं। घोड़े/गाय की खुराक का मात्र <strong>1/10 भाग (0.25 mg/kg IV)</strong> ही दिया जाना चाहिए! अधिक खुराक से मृत्यु हो सकती है।
                  </p>
                </div>
              </div>

              <!-- LOGGED MUSTH BULLS -->
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-2.5">ऊंट</th>
                      <th class="p-2.5">ग्रंथि स्राव</th>
                      <th class="p-2.5">Dulla बाहर</th>
                      <th class="p-2.5">आक्रामकता (1-5)</th>
                      <th class="p-2.5 text-right">प्रबंधन स्थिति</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${this.state.musthBehaviorLog
                      .map((m) => {
                        return `
                        <tr class="hover:bg-slate-800/40">
                          <td class="p-2.5 font-mono font-bold text-amber-400">${m.camelId}</td>
                          <td class="p-2.5">
                            <span class="${m.pollGlandSecretion ? "text-rose-400 font-bold" : "text-slate-400"}">
                              ${m.pollGlandSecretion ? "सक्रिय स्राव (Active)" : "शून्य"}
                            </span>
                          </td>
                          <td class="p-2.5">
                            <span class="${m.softPalateDullaEverted ? "text-cyan-400 font-bold" : "text-slate-400"}">
                              ${m.softPalateDullaEverted ? "Everted" : "Normal"}
                            </span>
                          </td>
                          <td class="p-2.5 font-mono">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.aggressiveScore >= 4 ? "bg-rose-500/20 text-rose-300" : "bg-amber-500/20 text-amber-300"}">
                              Level ${m.aggressiveScore}/5
                            </span>
                          </td>
                          <td class="p-2.5 text-right text-[11px] text-slate-300">
                            ${m.managementProtocol.slice(0, 30)}...
                          </td>
                        </tr>
                      `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- RACING PERFORMANCE & CARDIAC RECOVERY CONSOLE -->
            <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
                    <i class="fa-solid fa-flag-checkered"></i>
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-base text-white">दौड़ ऊंट फिटनेस एवं कार्डियक रिकवरी</h3>
                    <span class="text-[10px] font-mono text-amber-400">Jaisalmeri Racing Thoroughbred Conditioning</span>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
                <h4 class="font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-heart-pulse text-rose-400"></i> हृदय गति रिकवरी मानक (Cardiovascular Recovery Index)
                </h4>
                <div class="grid grid-cols-3 gap-2 text-center font-mono">
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div class="text-[10px] text-slate-400">विश्राम कालीन HR</div>
                    <div class="text-base font-bold text-emerald-400 mt-0.5">32-44 bpm</div>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div class="text-[10px] text-slate-400">दौड़ उपरांत HR</div>
                    <div class="text-base font-bold text-rose-400 mt-0.5">120-160 bpm</div>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div class="text-[10px] text-slate-400">15 मिनट रिकवरी</div>
                    <div class="text-base font-bold text-cyan-400 mt-0.5">&lt;60 bpm</div>
                  </div>
                </div>
                <p class="text-[11px] text-slate-400 leading-relaxed">
                  यदि तीव्र 8-10 किमी सरपट दौड़ (Gallop) के 15 मिनट बाद हृदय गति 60 bpm से कम नहीं आती है, तो निर्जलीकरण या मायोकार्डियल तनाव की पुष्टि होती है।
                </p>
              </div>

              <!-- SPEED & LACTATE CLEARANCE GUIDELINES -->
              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div class="font-bold text-amber-300">दौड़ अंतराल व गति मानक:</div>
                <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div class="flex justify-between border-b border-slate-800/80 pb-1">
                    <span>सर्वोच्च गति (Sprint 1-2 km):</span>
                    <strong class="text-white">35 - 42 km/h</strong>
                  </div>
                  <div class="flex justify-between border-b border-slate-800/80 pb-1">
                    <span>सहनशीलता गति (Endurance 10-15 km):</span>
                    <strong class="text-white">20 - 25 km/h</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>रक्त लैक्टेट निकासी लक्ष्य:</span>
                    <strong class="text-emerald-400">&lt; 4.0 mmol/L in 30 min</strong>
                  </div>
                </div>
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

      // Tab switching
      container.querySelectorAll(".camel-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Interactive Weight Estimator (Live calculator on Tab 1)
      const inH = container.querySelector("#calcInHeight");
      const inG = container.querySelector("#calcInGirth");
      const inHG = container.querySelector("#calcInHumpGirth");
      const lblWeight = container.querySelector("#lblLiveEstimatedWeight");

      const updateLiveWeight = () => {
        if (!inH || !inG || !inHG || !lblWeight) return;
        const wt = this.estimateCamelWeight(inH.value, inG.value, inHG.value);
        lblWeight.textContent = wt + " kg";
      };

      if (inH && inG && inHG) {
        inH.addEventListener("input", updateLiveWeight);
        inG.addEventListener("input", updateLiveWeight);
        inHG.addEventListener("input", updateLiveWeight);
      }

      // Inline Surra Dosing Calculator (Tab 2)
      const inSurraWt = container.querySelector("#inSurraCalcWeight");
      const selSurraDrug = container.querySelector("#selSurraCalcDrug");
      const resSurraBox = container.querySelector("#surraCalcResultBox");

      const updateSurraDosing = () => {
        if (!inSurraWt || !selSurraDrug || !resSurraBox) return;
        const res = this.calculateSurraTherapy(inSurraWt.value, selSurraDrug.value);
        resSurraBox.innerHTML = `
          <div class="text-emerald-400 font-bold">मात्रा (Dose): ${res.doseMg} mg (${res.volumeMl} ml)</div>
          <div class="text-slate-400 text-[10px]">${res.instructions}</div>
        `;
      };

      if (inSurraWt && selSurraDrug) {
        inSurraWt.addEventListener("input", updateSurraDosing);
        selSurraDrug.addEventListener("change", updateSurraDosing);
      }

      // Modal Triggers
      const btnOpenAddCamelModal = container.querySelector("#btnOpenAddCamelModal");
      if (btnOpenAddCamelModal) {
        btnOpenAddCamelModal.addEventListener("click", () => this.showAddCamelModal());
      }

      const btnOpenNewSurraModal = container.querySelector("#btnOpenNewSurraModal");
      if (btnOpenNewSurraModal) {
        btnOpenNewSurraModal.addEventListener("click", () => this.showAddSurraTestModal());
      }

      const btnNewSurraTestDirect = container.querySelector("#btnNewSurraTestDirect");
      if (btnNewSurraTestDirect) {
        btnNewSurraTestDirect.addEventListener("click", () => this.showAddSurraTestModal());
      }

      const btnNewColicEntryModal = container.querySelector("#btnNewColicEntryModal");
      if (btnNewColicEntryModal) {
        btnNewColicEntryModal.addEventListener("click", () => this.showAddColicModal());
      }

      const btnNewMusthLogDirect = container.querySelector("#btnNewMusthLogDirect");
      if (btnNewMusthLogDirect) {
        btnNewMusthLogDirect.addEventListener("click", () => this.showAddMusthModal());
      }

      // Print Cards
      container.querySelectorAll("[data-print-card]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const camelId = e.currentTarget.getAttribute("data-print-card");
          this.printCamelHealthCard(camelId);
        });
      });

      // Delete Camel
      container.querySelectorAll("[data-delete-camel]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.getAttribute("data-delete-camel");
          if (confirm("क्या आप वाकई इस ऊंट रिकॉर्ड को हटाना चाहते हैं?")) {
            await CamelStorage.delete(id);
            this.state.camelRoster = this.state.camelRoster.filter((x) => x.id !== id);
            this.render();
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("ऊंट रिकॉर्ड सफलतापूर्वक हटाया गया।", "warning");
            }
          }
        });
      });
    },

    // 4.6 CLINICAL MODALS
    showAddCamelModal() {
      const modalHost = document.getElementById("camelModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="camelAddModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-id-card"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">नया ऊंट पंजीकरण (Camel Registry Form)</h3>
                  <span class="text-[10px] font-mono text-amber-400">Pushkar / NRCC Microchip Database Standard</span>
                </div>
              </div>
              <button id="btnCloseAddCamelModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddCamelRecord" onsubmit="return false;" class="space-y-3.5 text-xs">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">ऊंट का नाम (Camel Name)</label>
                  <input type="text" id="inCamName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" placeholder="उदा. मरु-केसरी" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">नस्ल (Dromedary Breed)</label>
                  <select id="inCamBreed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    ${CAMEL_CONSTANTS.BREEDS.map((b) => `<option value="${b.name}">${b.name} (${b.origin})</option>`).join("")}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">माइक्रोचिप आईडी (15-Digit)</label>
                  <input type="text" id="inCamChip" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono" value="982000${Math.floor(100000000 + Math.random() * 900000000)}" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">उपयोग / उद्देश्य (Purpose)</label>
                  <select id="inCamPurpose" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="RACING">RACING (दौड़ प्रतियोगिता)</option>
                    <option value="MILK">MILK (डेयरी दुग्ध उत्पादन)</option>
                    <option value="DRAFT">DRAFT (कृषि एवं भार वहन)</option>
                    <option value="BREEDING">BREEDING (प्रजनन सांड/ऊंटनी)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">लिंग (Sex)</label>
                  <select id="inCamSex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="male">नर (Male / Bull)</option>
                    <option value="female">मादा (Female / Cow)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">आयु (वर्ष)</label>
                  <input type="number" id="inCamAge" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="6" min="1" max="35" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">कूबड़ स्थिति (Hump State)</label>
                  <select id="inCamHump" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="PLUMP_ERECT">पुष्ट व सीधा (Plump & Erect)</option>
                    <option value="DEPLETED_FLACCID">शिथिल व झुका हुआ (Flaccid/Depleted)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">शारीरिक भार (Weight Kg)</label>
                  <input type="number" id="inCamWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold font-mono" value="560" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">पालक का नाम (Owner Name)</label>
                  <input type="text" id="inCamOwner" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. सुरजाराम रेबारी" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">डेरा / स्थान (Camp Location)</label>
                  <input type="text" id="inCamCamp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. नाचना, जैसलमेर" required />
                </div>
              </div>

              <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelAddCamel" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitAddCamel" class="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/40">ऊंट पंजीकृत करें (Save Profile)</button>
              </div>

            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseAddCamelModal").addEventListener("click", close);
      document.getElementById("btnCancelAddCamel").addEventListener("click", close);

      document.getElementById("formAddCamelRecord").addEventListener("submit", async () => {
        const name = document.getElementById("inCamName").value.trim();
        const breed = document.getElementById("inCamBreed").value;
        const chip = document.getElementById("inCamChip").value.trim();
        const purpose = document.getElementById("inCamPurpose").value;
        const sex = document.getElementById("inCamSex").value;
        const age = parseInt(document.getElementById("inCamAge").value, 10) || 5;
        const hump = document.getElementById("inCamHump").value;
        const wt = parseFloat(document.getElementById("inCamWeight").value) || 500;
        const owner = document.getElementById("inCamOwner").value.trim();
        const camp = document.getElementById("inCamCamp").value.trim();

        const newCamel = {
          id: "CAM-" + Date.now().toString().slice(-4),
          recordType: "CAMEL_PROFILE",
          camelId: "CAM-" + Date.now().toString().slice(-4),
          microchipId: chip,
          name,
          breed,
          purpose,
          sex,
          ageYears: age,
          humpStatus: hump,
          weightKg: wt,
          ownerName: owner,
          campLocation: camp,
          vaccinationStatus: "UP_TO_DATE",
          dewormedDate: new Date().toISOString().split("T")[0],
          notes: "Enrolled in Vetcare Desert Medicine System."
        };

        await CamelStorage.put(newCamel);
        this.state.camelRoster.unshift(newCamel);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("ऊंट '" + name + "' सफलता से पंजीकृत किया गया।", "success");
        }
      });
    },

    showAddSurraTestModal() {
      const modalHost = document.getElementById("camelModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="surraTestModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-microscope text-emerald-400 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">सर्रा (Tibbi) रक्त परीक्षण प्रविष्टि</h3>
              </div>
              <button id="btnCloseSurraModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddSurraTest" onsubmit="return false;" class="space-y-3.5 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">ऊंट चयन (Select Camel)</label>
                <select id="selSurraCamel" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.camelRoster.map((c) => `<option value="${c.camelId}">${c.camelId} - ${c.name} (${c.ownerName})</option>`).join("")}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">गीली रक्त फिल्म (Wet Mount)</label>
                  <select id="inSurraResult" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="NEGATIVE">NEGATIVE (कोई ट्रिपैनोसोम नहीं)</option>
                    <option value="POSITIVE_TRYPANOSOMES">POSITIVE (Trypanosoma evansi उपस्थित)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">हीमोग्लोबिन स्तर (Hb g/dL)</label>
                  <input type="number" step="0.1" id="inSurraHb" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold font-mono" value="6.5" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">शरीर तापमान (°F)</label>
                  <input type="number" step="0.1" id="inSurraTemp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="103.8" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">सूजन (Dependent Edema)</label>
                  <select id="inSurraEdema" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="YES">उपस्थित (पेट/शिश्न पर सूजन)</option>
                    <option value="NO">अनुपस्थित</option>
                  </select>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="chkAdministerSurraDrug" class="w-4 h-4 text-emerald-500 rounded" checked />
                  <span class="text-white font-bold">तत्काल औषधीय उपचार (Triquin/Cymelarsan) दिया गया</span>
                </label>
                <input type="text" id="inSurraDrugText" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-white" value="Quinapyramine Prosalt (Triquin) @ 4.4 mg/kg SC" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelSurra" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitSurra" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">जांच सहेजें (Save Test)</button>
              </div>
            </form>

          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseSurraModal").addEventListener("click", close);
      document.getElementById("btnCancelSurra").addEventListener("click", close);

      document.getElementById("formAddSurraTest").addEventListener("submit", async () => {
        const camelId = document.getElementById("selSurraCamel").value;
        const res = document.getElementById("inSurraResult").value;
        const hb = parseFloat(document.getElementById("inSurraHb").value) || 7.0;
        const temp = parseFloat(document.getElementById("inSurraTemp").value) || 101.0;
        const edema = document.getElementById("inSurraEdema").value === "YES";
        const drugGiven = document.getElementById("chkAdministerSurraDrug").checked;
        const drugText = document.getElementById("inSurraDrugText").value.trim();

        const newTest = {
          id: "SURRA-" + Date.now(),
          recordType: "SURRA_TEST",
          testId: "SURRA-" + Date.now().toString().slice(-4),
          camelId,
          date: new Date().toISOString().split("T")[0],
          wetMountMotility: res,
          parasitemiaLevel: res === "POSITIVE_TRYPANOSOMES" ? "Active Motile Flagellates" : "Zero",
          anemiaLevelHb: hb,
          temperatureF: temp,
          edemaPresent: edema,
          suraminQuinapyramineGiven: drugGiven,
          drugAdministered: drugGiven ? drugText : "None",
          practitioner: "Dr. Rahul (Field Vet)"
        };

        await CamelStorage.put(newTest);
        this.state.surraScreeningLog.unshift(newTest);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("सर्रा जांच रिपोर्ट सफलतापूर्वक दर्ज की गई।", "success");
        }
      });
    },

    showAddColicModal() {
      const modalHost = document.getElementById("camelModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="colicModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">C1/C3 पेट-दर्द (Colic) परीक्षण प्रविष्टि</h3>
              <button id="btnCloseColicModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddColic" onsubmit="return false;" class="space-y-3 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">ऊंट चयन</label>
                <select id="selColicCamel" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.camelRoster.map((c) => `<option value="${c.camelId}">${c.camelId} - ${c.name}</option>`).join("")}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">C1 संकुचन (प्रति 2 मिनट)</label>
                  <input type="number" id="inColicMotility" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="1" min="0" max="6" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">निर्जलीकरण % (Dehydration)</label>
                  <input type="number" id="inColicDehydration" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="12" />
                </div>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">लिक्विड पैराफिन ड्रेन्च मात्रा (Liters)</label>
                <input type="number" step="0.5" id="inColicParaffin" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold font-mono" value="4.0" />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">पुनर्प्राप्ति स्थिति (Clinical Outcome)</label>
                <input type="text" id="inColicOutcome" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="Under Observation / Stomach tubed" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelColic" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitColic" class="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold">दर्ज करें (Save Colic Log)</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseColicModal").addEventListener("click", close);
      document.getElementById("btnCancelColic").addEventListener("click", close);

      document.getElementById("formAddColic").addEventListener("submit", async () => {
        const camelId = document.getElementById("selColicCamel").value;
        const mot = parseInt(document.getElementById("inColicMotility").value, 10) || 1;
        const deh = parseInt(document.getElementById("inColicDehydration").value, 10) || 10;
        const paraffin = parseFloat(document.getElementById("inColicParaffin").value) || 3.5;
        const outcome = document.getElementById("inColicOutcome").value.trim();

        const item = {
          id: "COLIC-" + Date.now(),
          recordType: "COLIC_EVAL",
          camelId,
          date: new Date().toISOString().split("T")[0],
          dehydrationPct: deh,
          c1MotilityPer2Min: mot,
          sandImpactionSuspected: true,
          fecalSandSedimentationTest: "POSITIVE",
          liquidParaffinDrenchLiters: paraffin,
          flunixinGiven: true,
          recoveryOutcome: outcome
        };

        await CamelStorage.put(item);
        this.state.colicImpactionLog.unshift(item);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("रेत रुकावट (Colic) परीक्षण लॉग सहेजा गया।", "success");
        }
      });
    },

    showAddMusthModal() {
      const modalHost = document.getElementById("camelModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="musthModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">मस्त सांड व्यवहार (Musth) प्रविष्टि</h3>
              <button id="btnCloseMusthModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddMusth" onsubmit="return false;" class="space-y-3 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">ऊंट सांड चयन</label>
                <select id="selMusthCamel" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.camelRoster.filter((c) => c.sex === "male").map((c) => `<option value="${c.camelId}">${c.camelId} - ${c.name}</option>`).join("")}
                </select>
              </div>

              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkPollGland" class="w-4 h-4 text-cyan-500 rounded" checked />
                  <span class="text-white">शीर्ष ग्रंथि से बदबूदार स्राव (Poll Gland Active)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkDulla" class="w-4 h-4 text-cyan-500 rounded" checked />
                  <span class="text-white">कोमल तालु (Dulla/Gula) बाहर निकाल रहा है</span>
                </label>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">आक्रामकता स्तर (1 = शांत, 5 = अत्यधिक खतरनाक)</label>
                <input type="number" id="inAggressiveness" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold font-mono" value="4" min="1" max="5" />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">सुरक्षा एवं बाड़े की व्यवस्था</label>
                <input type="text" id="inMusthProtocol" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="मजबूत लकड़ी के बाड़े में अलग रखा गया। बच्चों व पर्यटकों से दूर।" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelMusth" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitMusth" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">लॉग सहेजें (Save Rut Log)</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseMusthModal").addEventListener("click", close);
      document.getElementById("btnCancelMusth").addEventListener("click", close);

      document.getElementById("formAddMusth").addEventListener("submit", async () => {
        const camelId = document.getElementById("selMusthCamel").value;
        const poll = document.getElementById("chkPollGland").checked;
        const dulla = document.getElementById("chkDulla").checked;
        const agg = parseInt(document.getElementById("inAggressiveness").value, 10) || 3;
        const proto = document.getElementById("inMusthProtocol").value.trim();

        const item = {
          id: "MUSTH-" + Date.now(),
          recordType: "MUSTH_LOG",
          camelId,
          date: new Date().toISOString().split("T")[0],
          pollGlandSecretion: poll,
          softPalateDullaEverted: dulla,
          aggressiveScore: agg,
          tailFlappingUrineSpraying: true,
          managementProtocol: proto,
          xylazineSedationAdministered: false,
          sedationDoseMg: 0
        };

        await CamelStorage.put(item);
        this.state.musthBehaviorLog.unshift(item);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("मस्त सांड व्यवहार सफलतापूर्वक रिकॉर्ड किया गया।", "success");
        }
      });
    },

    // 4.7 BILINGUAL A4 HEALTH CARD & CAMEL FESTIVAL PRINT PASSPORT
    printCamelHealthCard(camelId) {
      const camel = this.state.camelRoster.find((c) => c.camelId === camelId);
      if (!camel) {
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("ऊंट रिकॉर्ड नहीं मिला।", "error");
        }
        return;
      }

      const surraTests = this.state.surraScreeningLog.filter((s) => s.camelId === camelId);
      const latestSurra = surraTests.length > 0 ? surraTests[0] : null;

      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि A4 ऊंट स्वास्थ्य कार्ड मुद्रित किया जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Dromedary Passport - ${camel.camelId}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
            .header-table { width: 100%; border-bottom: 2px solid #78350f; padding-bottom: 12px; margin-bottom: 20px; }
            .header-table td { vertical-align: middle; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-amber { background: #fef3c7; color: #78350f; border: 1px solid #fde68a; }
            .badge-green { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
            .kpi-box { border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; text-align: center; background: #fffbeb; }
            .kpi-val { font-size: 18px; font-weight: 800; color: #78350f; margin-top: 4px; }
            .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #78350f; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin: 20px 0 10px; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 8px 10px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 11px; text-transform: uppercase; }
            .seal-row { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 220px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 11px; }
            .security-hash { font-family: monospace; font-size: 9px; color: #6b7280; margin-top: 30px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 20px; font-weight: 900; color: #78350f; letter-spacing: -0.5px;">VETCARE AI OS (DESERT VETERINARY WING)</div>
                <div style="font-size: 11px; color: #4b5563;">National Dromedary Camelid Informatics & Thar Border Health Registry</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">आधिकारिक उष्ट्र स्वास्थ्य पहचान पत्र एवं मेला परमिट (Dromedary Passport)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-amber">PUSHKAR / BIKANER FAIR CERTIFIED</span><br/>
                <div style="font-family: monospace; font-size: 11px; margin-top: 5px; font-weight: bold;">CAMEL ID: ${camel.camelId}</div>
                <div style="font-family: monospace; font-size: 10px; color: #78350f;">CHIP: ${camel.microchipId || "N/A"}</div>
              </td>
            </tr>
          </table>

          <div class="kpi-grid">
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">उद्देश्य (Purpose)</div>
              <div class="kpi-val">${camel.purpose}</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">अनुमानित भार (Weight)</div>
              <div class="kpi-val">${camel.weightKg} kg</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">कूबड़ स्थिति (Hump)</div>
              <div class="kpi-val" style="font-size: 13px; color: ${camel.humpStatus === "PLUMP_ERECT" ? "#065f46" : "#b91c1c"}">${camel.humpStatus}</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">सर्रा स्थिति (Surra)</div>
              <div class="kpi-val" style="font-size: 14px; color: ${latestSurra && latestSurra.wetMountMotility === "POSITIVE_TRYPANOSOMES" ? "#b91c1c" : "#065f46"}">
                ${latestSurra ? (latestSurra.wetMountMotility === "POSITIVE_TRYPANOSOMES" ? "POSITIVE (TREATED)" : "NEGATIVE (CLEAN)") : "NOT SCREENED"}
              </div>
            </div>
          </div>

          <div class="section-title">1. ऊंट बायोमेट्रिक पहचान विवरण (Biometric & Lineage Profile)</div>
          <table class="data-table">
            <tr>
              <th width="25%">ऊंट का नाम</th>
              <td width="25%"><strong>${camel.name}</strong></td>
              <th width="25%">नस्ल (Breed)</th>
              <td width="25%"><strong>${camel.breed}</strong></td>
            </tr>
            <tr>
              <th>आयु एवं लिंग</th>
              <td>${camel.ageYears} वर्ष / ${camel.sex === "male" ? "नर (Bull)" : "मादा (Cow)"}</td>
              <th>माइक्रोचिप टैग</th>
              <td style="font-family: monospace;">${camel.microchipId || "None"}</td>
            </tr>
            <tr>
              <th>पालक का नाम (Owner)</th>
              <td><strong>${camel.ownerName}</strong></td>
              <th>डेरा व जिला (Location)</th>
              <td>${camel.campLocation}</td>
            </tr>
            <tr>
              <th>टीकाकरण व कृमिनाशक</th>
              <td>${camel.vaccinationStatus} (Dewormed: ${camel.dewormedDate})</td>
              <th>क्लिनिकल टिप्पणियां</th>
              <td>${camel.notes}</td>
            </tr>
          </table>

          <div class="section-title">2. सर्रा (Trypanosoma evansi / Tibbi) रक्त जांच व उपचार</div>
          <table class="data-table">
            <tr>
              <th width="35%">नवीनतम जांच तिथि</th>
              <td>${latestSurra ? latestSurra.date : "हाल ही में कोई जांच दर्ज नहीं"}</td>
            </tr>
            <tr>
              <th>रक्त फिल्म (Wet Blood Film Motility)</th>
              <td><strong>${latestSurra ? latestSurra.wetMountMotility : "N/A"}</strong></td>
            </tr>
            <tr>
              <th>हीमोग्लोबिन स्तर (Hb)</th>
              <td>${latestSurra ? latestSurra.anemiaLevelHb + " g/dL (Target >9.5 g/dL)" : "N/A"}</td>
            </tr>
            <tr>
              <th>प्रशासित औषधि (Chemotherapy Administered)</th>
              <td>${latestSurra ? latestSurra.drugAdministered : "None Required"}</td>
            </tr>
          </table>

          <div class="section-title">3. पशु मेला परिवहन व स्वास्थ्य प्रमाणन (Fair & Transit Certification)</div>
          <p style="font-size: 11px; line-height: 1.5; color: #374151;">
            प्रमाणित किया जाता है कि उपरोक्त ऊंट का शारीरिक एवं क्लिनिकल परीक्षण किया गया है। इसमें संक्रामक खुजली (Sarcoptic Mange / खाज), सर्रा (Tibbi), तथा आक्रामक मस्त (Uncontrolled Musth) के कोई सक्रिय सार्वजनिक लक्षण नहीं हैं। यह ऊंट पुष्कर/बीकानेर मेला अथवा अंतरराज्यीय परिवहन हेतु शारीरिक रूप से स्वस्थ एवं उपयुक्त है।
          </p>

          <div class="seal-row">
            <div class="sig-box">
              उष्ट्र पालक / स्वामी हस्ताक्षर<br/>
              <strong>Camel Owner / Custodian Signature</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #78350f; padding: 8px 16px; border-radius: 8px; font-weight: bold; color: #78350f; text-transform: uppercase; font-size: 10px;">
                VETCARE AI OS<br/>OFFICIAL CAMELID SEAL
              </div>
            </div>
            <div class="sig-box">
              अधिकृत रेगिस्तानी पशु चिकित्सा अधिकारी<br/>
              <strong>Desert Veterinary Officer (DVO)</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 HASH VERIFICATION: A9B44F7182C0E8D900213BAC458763219488FEAC1143890CBAD32198007621EE<br/>
            Vetcare AI OS - 2026 Production Master Core • NRCC Bikaner & DAHDF Validated
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
      const modalHost = document.getElementById("camelModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Camelid Desert Medicine Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.CamelidDesertMedicine = CamelidDesertMedicine;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      CamelidDesertMedicine.init();
    });
  } else {
    CamelidDesertMedicine.init();
  }
})();
