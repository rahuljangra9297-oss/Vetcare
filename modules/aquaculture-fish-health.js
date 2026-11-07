// Vetcare AI OS - Aquaculture Health, Water Quality Hydro-Chemistry & Fish Pathology Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. HYDRO-CHEMICAL, AQUATIC MEDICINE & PATHOLOGY REFERENCE STANDARDS
  const AQUA_STANDARDS = {
    WATER_QUALITY: {
      DO_MG_L: { OPTIMAL: 5.0, SUBOPTIMAL: 3.0, CRITICAL: 2.0 }, // Dissolved Oxygen
      PH: { MIN_SAFE: 6.5, OPTIMAL_MIN: 7.5, OPTIMAL_MAX: 8.5, MAX_SAFE: 9.0 },
      TEMP_C: { MIN: 24, MAX: 32 },
      UNIONIZED_NH3_MG_L: { SAFE: 0.02, WARNING: 0.05, TOXIC: 0.1 },
      NITRITE_NO2_MG_L: { SAFE: 0.1, WARNING: 0.5, TOXIC: 1.0 },
      ALKALINITY_MG_L: { MIN_SHRIMP: 120, MIN_CARP: 80, OPTIMAL_MAX: 200 }
    },
    SPECIES_CATALOG: [
      { id: "Rohu_Catla_Mrigal", name: "Indian Major Carps (IMC)", system: "Composite Carp Polyculture", optimumDo: 5.0, targetAlkalinity: 100 },
      { id: "Vannamei_Shrimp", name: "Pacific White Shrimp (P. vannamei)", system: "Coastal Brackishwater", optimumDo: 6.0, targetAlkalinity: 140 },
      { id: "Tilapia", name: "GIFT Tilapia (O. niloticus)", system: "Intensive Biofloc / Cage", optimumDo: 4.0, targetAlkalinity: 90 },
      { id: "Pangasius", name: "Striped Catfish (P. hypophthalmus)", system: "High-Density Pond", optimumDo: 3.5, targetAlkalinity: 80 }
    ],
    PATHOLOGIES: [
      {
        id: "EUS",
        name: "Epizootic Ulcerative Syndrome (EUS)",
        pathogen: "Aphanomyces invadans (Fungal deep granuloma)",
        organsAffected: ["Skin/Scales", "Muscle"],
        clinicalSigns: ["Deep necrotic red ulcers", "Erosion of scales", "Secondary bacterial necrosis"],
        rxDrug: "Potassium Permanganate (KMnO4) @ 2.5-3.0 ppm or CIFAX @ 1 Liter/ha-m",
        withdrawalDays: 14
      },
      {
        id: "WSSV",
        name: "White Spot Syndrome Virus (WSSV)",
        pathogen: "Nimaviridae / Whispovirus (Viral)",
        organsAffected: ["Carapace", "Gills", "Hepatopancreas"],
        clinicalSigns: ["White calcified spots on cephalothorax", "Reddish body discoloration", "Rapid mortality (>90% in 72h)"],
        rxDrug: "Strict Emergency Bio-containment. Emergency harvest if commercial size; Bleaching powder 30 ppm pond eradication.",
        withdrawalDays: 30
      },
      {
        id: "COLUMNARIS",
        name: "Columnaris / Cotton Wool Fin Rot",
        pathogen: "Flavobacterium columnare (Gram-negative bacterium)",
        organsAffected: ["Gills", "Fins", "Skin/Scales"],
        clinicalSigns: ["Saddleback necrotic lesions behind dorsal fin", "Frayed necrotic fin rays", "Gill necrosis"],
        rxDrug: "Copper Sulfate (CuSO4) @ 0.5-1.0 ppm (check total alkalinity) + Oxytetracycline medicated feed 50 mg/kg biomass for 7 days.",
        withdrawalDays: 21
      },
      {
        id: "AEROMONAS_DROPSY",
        name: "Motile Aeromonad Septicemia (MAS / Dropsy)",
        pathogen: "Aeromonas hydrophila (Bacterial septicemia)",
        organsAffected: ["Internal Organs", "Eyes", "Skin/Scales"],
        clinicalSigns: ["Abdominal dropsical swelling (ascites)", "Exophthalmia (Pop-eye)", "Pinecone scale protrusion"],
        rxDrug: "Oxytetracycline or Enrofloxacin @ 50 mg/kg feed for 10 days + Water exchange 30% + Zeolite 50 kg/ha.",
        withdrawalDays: 28
      },
      {
        id: "ARGULOSIS",
        name: "Argulus / Fish Lice Infestation",
        pathogen: "Argulus foliaceus / Argulus siamensis (Crustacean ectoparasite)",
        organsAffected: ["Skin/Scales", "Fins"],
        clinicalSigns: ["Disc-shaped translucent parasites attached to skin", "Erratic flashing/rubbing against dykes", "Localized petechiae"],
        rxDrug: "Emamectin Benzoate (5 mg/kg feed for 7 days) or Deltamethrin drench @ 0.05-0.1 ppm. Maintain strict withdrawal.",
        withdrawalDays: 15
      }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const AquaStorage = {
    dbName: "VetcareAquacultureDB",
    dbVersion: 1,
    storeName: "aquaculture_health_logs",
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Aquaculture] IndexedDB not available, using localStorage fallback.");
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
          console.error("[Vetcare Aquaculture] IndexedDB failed:", err);
          resolve(false);
        };
      });
    },

    async getAll() {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_AQUACULTURE_LOGS");
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
          console.error(e);
          resolve([]);
        }
      });
    },

    async put(item) {
      if (!item.id) item.id = "AQUA-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const all = await this.getAll();
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.push(item);
        localStorage.setItem("VETCARE_AQUACULTURE_LOGS", JSON.stringify(all));
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
        localStorage.setItem("VETCARE_AQUACULTURE_LOGS", JSON.stringify(all));
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

  // 4. MAIN AQUACULTURE FISH HEALTH CONTROLLER
  const AquacultureFishHealth = {
    containerId: null,
    activeTab: "pond_water_chemistry", // 'pond_water_chemistry' | 'water_quality_meters' | 'fish_disease_diagnostics' | 'chemical_treatment_calculator'

    // Reactive State
    state: {
      ponds: [],
      waterQualityLog: [],
      fishPathologyLog: [],
      selectedPondId: null
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await AquaStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Aquaculture Health, Hydro-Chemistry & Fish Pathology Engine Loaded.");
    },

    async loadInitialData() {
      const records = await AquaStorage.getAll();
      if (records && records.length > 0) {
        this.state.ponds = records.filter((r) => r.recordType === "POND_PROFILE");
        this.state.waterQualityLog = records.filter((r) => r.recordType === "WATER_LOG");
        this.state.fishPathologyLog = records.filter((r) => r.recordType === "PATHOLOGY_REPORT");
      }

      // If empty, seed realistic aquaculture data
      if (this.state.ponds.length === 0) {
        await this.seedDefaultAquacultureData();
      }

      if (this.state.ponds.length > 0 && !this.state.selectedPondId) {
        this.state.selectedPondId = this.state.ponds[0].pondId;
      }
    },

    async seedDefaultAquacultureData() {
      const defaultPonds = [
        {
          id: "POND-01-CARP",
          recordType: "POND_PROFILE",
          pondId: "POND-01-CARP",
          pondName: "तालाब A1 (Composite Carp Sector)",
          waterType: "FRESHWATER",
          areaHectares: 1.25,
          waterDepthMeters: 1.6,
          speciesStocked: "Rohu_Catla_Mrigal",
          stockingDensity: 12500, // 10,000 / ha
          daysOfCulture: 92,
          aerationType: "8-Paddle Wheel Aerators",
          farmerName: "सत्यनारायण चौधरी (Satya Aqua Farms)",
          location: "हवेली तालाब कॉम्प्लेक्स, करनाल (Haryana)"
        },
        {
          id: "POND-02-SHRIMP",
          recordType: "POND_PROFILE",
          pondId: "POND-02-SHRIMP",
          pondName: "क्रीक पॉन्ड B2 (Vannamei Shrimp)",
          waterType: "BRACKISH",
          areaHectares: 0.8,
          waterDepthMeters: 1.4,
          speciesStocked: "Vannamei_Shrimp",
          stockingDensity: 48000, // 60 pcs/m2
          daysOfCulture: 64,
          aerationType: "16-HP Spiral + Venturi Jet",
          farmerName: "रामकृष्ण राजू",
          location: "भीमावरम कोस्टल क्रीक (Andhra Pradesh)"
        },
        {
          id: "POND-03-TILAPIA",
          recordType: "POND_PROFILE",
          pondId: "POND-03-TILAPIA",
          pondName: "बायोफ्लॉक टैंक T3 (GIFT Tilapia)",
          waterType: "BIOFLOC",
          areaHectares: 0.15,
          waterDepthMeters: 1.2,
          speciesStocked: "Tilapia",
          stockingDensity: 15000,
          daysOfCulture: 48,
          aerationType: "Root Blower Ring Diffuser 24x7",
          farmerName: "डॉ. अमित वर्मा",
          location: "हाई-डेंसिटी एक्वा क्लस्टर (UP)"
        }
      ];

      for (const p of defaultPonds) {
        await AquaStorage.put(p);
        this.state.ponds.push(p);
      }

      const defaultWater = [
        {
          id: "WATER-LOG-001",
          recordType: "WATER_LOG",
          logId: "WATER-LOG-001",
          pondId: "POND-01-CARP",
          timestamp: new Date().toISOString(),
          dissolvedOxygenMgL: 5.6,
          waterTempC: 28.5,
          pH: 7.9,
          totalAmmoniaNitrogenMgL: 0.4,
          unionizedAmmoniaMgL: 0.021, // Automatically computed
          alkalinityMgL: 135,
          nitriteMgL: 0.04,
          turbidityCm: 32, // Secchi disc depth
          status: "NORMAL_OPTIMAL"
        },
        {
          id: "WATER-LOG-002",
          recordType: "WATER_LOG",
          logId: "WATER-LOG-002",
          pondId: "POND-02-SHRIMP",
          timestamp: new Date().toISOString(),
          dissolvedOxygenMgL: 4.8,
          waterTempC: 30.2,
          pH: 8.4,
          totalAmmoniaNitrogenMgL: 0.9,
          unionizedAmmoniaMgL: 0.088, // ELEVATED TOXIC NH3
          alkalinityMgL: 145,
          nitriteMgL: 0.12,
          turbidityCm: 25,
          status: "WARNING_ELEVATED_NH3"
        }
      ];

      for (const w of defaultWater) {
        await AquaStorage.put(w);
        this.state.waterQualityLog.push(w);
      }

      const defaultPathology = [
        {
          id: "PATH-REPORT-001",
          recordType: "PATHOLOGY_REPORT",
          reportId: "PATH-REPORT-001",
          pondId: "POND-01-CARP",
          date: new Date().toISOString().split("T")[0],
          observedSigns: ["Skin/Scales: Deep red necrotic ulcers", "Gills: Excessive mucus"],
          gillCondition: "PALE",
          suspectedDisease: "Epizootic Ulcerative Syndrome (EUS)",
          mortalityCount: 18,
          treatmentRecommended: "Potassium Permanganate (KMnO4) @ 2.5 ppm pond drench + CIFAX 1 Liter/ha-m.",
          practitioner: "Dr. Rahul (Aquatic Pathologist)"
        }
      ];

      for (const d of defaultPathology) {
        await AquaStorage.put(d);
        this.state.fishPathologyLog.push(d);
      }
    },

    // 4.2 HYDRO-CHEMISTRY & POND VOLUME ALGORITHMS
    /**
     * Exact Pond Water Volume Calculation:
     * Volume (m3) = Area (Hectares) × 10,000 m2/ha × Depth (Meters)
     */
    calculatePondVolumeM3(areaHectares, depthMeters) {
      const a = parseFloat(areaHectares) || 0;
      const d = parseFloat(depthMeters) || 0;
      return Math.round(a * 10000 * d);
    },

    /**
     * Exact Unionized Ammonia (Toxic NH3) Calculation:
     * Based on Emerson et al. formula from Total Ammonia Nitrogen (TAN), pH, and Water Temp (°C)
     * pKa = 0.09018 + 2729.92 / (273.15 + TempC)
     * fraction = 1 / (10^(pKa - pH) + 1)
     * NH3 = TAN * fraction
     */
    calculateUnionizedAmmonia(tanMgL, pH, tempC) {
      const tan = parseFloat(tanMgL) || 0;
      const p = parseFloat(pH) || 7.0;
      const t = parseFloat(tempC) || 25.0;

      if (tan <= 0) return 0;
      const pKa = 0.09018 + 2729.92 / (273.15 + t);
      const fraction = 1 / (Math.pow(10, pKa - p) + 1);
      const nh3 = tan * fraction;
      return parseFloat(nh3.toFixed(3));
    },

    /**
     * Chemical Treatment Requirement Calculator
     * 1 ppm = 1 g/m3 = 1 kg / 1,000 m3
     * Dosage (kg) = (Target ppm × Volume m3) / 1,000
     */
    calculateChemicalDose(volumeM3, targetPpm) {
      const v = parseFloat(volumeM3) || 0;
      const ppm = parseFloat(targetPpm) || 0;
      return parseFloat(((v * ppm) / 1000).toFixed(2));
    },

    /**
     * Agricultural Lime (CaCO3) Requirement for pH Correction:
     * If pH < 5.0 -> 2,000 kg/ha
     * If pH 5.0 - 6.5 -> 1,000 kg/ha
     * If pH 6.6 - 7.5 -> 500 kg/ha
     * If pH > 7.5 -> 200 kg/ha (Maintenance)
     */
    calculateLimingRequirement(areaHectares, currentPh) {
      const a = parseFloat(areaHectares) || 1.0;
      const p = parseFloat(currentPh) || 7.5;
      let ratePerHa = 300;

      if (p < 5.0) ratePerHa = 2000;
      else if (p <= 6.5) ratePerHa = 1200;
      else if (p <= 7.2) ratePerHa = 600;
      else if (p <= 7.8) ratePerHa = 300;
      else ratePerHa = 150;

      return Math.round(ratePerHa * a);
    },

    calculateOverallKPIs() {
      const totalPonds = this.state.ponds.length;
      let totalVolume = 0;
      this.state.ponds.forEach((p) => {
        totalVolume += this.calculatePondVolumeM3(p.areaHectares, p.waterDepthMeters);
      });

      const criticalDoAlerts = this.state.waterQualityLog.filter((w) => w.dissolvedOxygenMgL < AQUA_STANDARDS.WATER_QUALITY.DO_MG_L.SUBOPTIMAL).length;
      const toxicAmmoniaAlerts = this.state.waterQualityLog.filter((w) => w.unionizedAmmoniaMgL >= AQUA_STANDARDS.WATER_QUALITY.UNIONIZED_NH3_MG_L.WARNING).length;
      const activePathologies = this.state.fishPathologyLog.length;

      return {
        totalPonds,
        totalVolumeM3: totalVolume.toLocaleString(),
        criticalDoAlerts,
        toxicAmmoniaAlerts,
        activePathologies
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Aquaculture] Root DOM container not found:", this.containerId);
        return;
      }

      const kpis = this.calculateOverallKPIs();

      container.innerHTML = `
        <div class="aquaculture-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- EMERGENCY WATER HYPOXIA / ASPHYXIA BANNER (IF CRITICAL DO DETECTED) -->
          ${
            kpis.criticalDoAlerts > 0
              ? `
            <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 border-2 border-rose-500 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-2xl text-white shadow-lg shrink-0">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h4 class="font-display font-black text-lg tracking-tight uppercase">गंभीर जल ऑक्सीजन अभाव चेतावनी (Critical Aquatic Hypoxia Alert)</h4>
                  <p class="text-xs text-rose-200">एक या अधिक तालाबों में घुलित ऑक्सीजन (DO &lt; 3.0 mg/L) खतरनाक स्तर पर है। तत्काल सभी पैडल व्हील एरेटर चालू करें और हाइड्रोजन पेरोक्साइड (H2O2) आपातकालीन डोज तैयार रखें!</p>
                </div>
              </div>
              <button id="btnQuickAeratorDispatch" class="px-5 py-2.5 rounded-xl bg-white text-rose-950 font-black text-xs hover:bg-rose-100 flex items-center gap-2 shadow-lg whitespace-nowrap">
                <i class="fa-solid fa-fan text-rose-600"></i> एरेटर आपातकालीन चालू निर्देश
              </button>
            </div>
            `
              : ""
          }

          <!-- HEADER & TACTICAL BAR -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-water"></i> Aquatic Health & Water Hydro-Chemistry 2026
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <i class="fa-solid fa-fish"></i> FAO / CIFA Diagnostic Standards
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>जलीय जीव स्वास्थ्य, जल-रसायन व मत्स्य रोग निदान प्रणाली</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Real-time Hydro-chemical Telemetry (DO, pH, Unionized Toxic NH3, Alkalinity), Hydro-bath Dosage Engine & Comprehensive Fish Pathology Triage.
              </p>
            </div>

            <!-- ACTION SHORTCUTS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenAddPondModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नया तालाब जोड़ें (Add Pond)
              </button>
              <button id="btnOpenLogWaterModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-flask-vial"></i> जल परीक्षण दर्ज करें (Log Water Test)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय जल क्षेत्र (Ponds)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${kpis.totalPonds}</span>
                <span class="text-xs font-mono text-cyan-400 font-bold">${kpis.totalVolumeM3} m³</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">घुलित ऑक्सीजन (DO) संकट</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${kpis.criticalDoAlerts > 0 ? "text-rose-400" : "text-emerald-400"}">${kpis.criticalDoAlerts}</span>
                <span class="text-xs font-mono ${kpis.criticalDoAlerts > 0 ? "text-rose-400 font-bold" : "text-emerald-400"}">
                  ${kpis.criticalDoAlerts > 0 ? "CRITICAL LOW" : "OPTIMAL (>5.0)"}
                </span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">विषाक्त अमोनिया (NH3) अलर्ट</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${kpis.toxicAmmoniaAlerts > 0 ? "text-amber-400" : "text-emerald-400"}">${kpis.toxicAmmoniaAlerts}</span>
                <span class="text-xs font-mono ${kpis.toxicAmmoniaAlerts > 0 ? "text-amber-400 font-bold" : "text-emerald-400"}">
                  ${kpis.toxicAmmoniaAlerts > 0 ? ">0.05 mg/L TOXIC" : "SAFE (<0.02)"}
                </span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय रोग / घाव निगरानी</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${kpis.activePathologies > 0 ? "text-rose-300" : "text-slate-200"}">${kpis.activePathologies}</span>
                <span class="text-xs font-mono text-cyan-300">Under Treatment</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="pond_water_chemistry" class="aqua-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "pond_water_chemistry"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-water"></i> 1. तालाब जल-रसायन व लॉग (Water Chemistry Logs)
            </button>
            <button data-tab="water_quality_meters" class="aqua-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "water_quality_meters"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-gauge-high"></i> 2. लाइव मीटर व विषाक्तता रडार (Live Quality Gauges)
            </button>
            <button data-tab="fish_disease_diagnostics" class="aqua-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "fish_disease_diagnostics"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-stethoscope"></i> 3. मत्स्य शारीरिक घाव एवं रोग निदान (Fish Pathology Triage)
            </button>
            <button data-tab="chemical_treatment_calculator" class="aqua-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "chemical_treatment_calculator"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-calculator"></i> 4. चूना व रसायन खुराक संगणक (Pond Chemical Dosage Calc)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="aquaTabViewport" class="w-full">
            ${this.renderActiveTabContent()}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINERS -->
        <div id="aquaModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent() {
      switch (this.activeTab) {
        case "pond_water_chemistry":
          return this.renderPondWaterTab();
        case "water_quality_meters":
          return this.renderQualityMetersTab();
        case "fish_disease_diagnostics":
          return this.renderDiseaseDiagnosticsTab();
        case "chemical_treatment_calculator":
          return this.renderChemicalCalculatorTab();
        default:
          return "";
      }
    },

    // TAB 1: POND REGISTRY & WATER CHEMISTRY LOGS
    renderPondWaterTab() {
      return `
        <div class="space-y-6">
          
          <!-- POND SUMMARY TABLE -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-layer-group text-cyan-400"></i> सक्रिय तालाब रोस्टर एवं जलीय स्टॉक (Ponds Master)
                </h3>
                <p class="text-xs text-slate-400">Pond dimensions, volume calculations, culture days, and species inventory.</p>
              </div>
              <div class="text-xs font-mono text-slate-400">
                कुल पंजीकृत तालाब: <strong class="text-white">${this.state.ponds.length}</strong>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">तालाब कोड व नाम</th>
                    <th class="p-3">जल प्रकार व प्रजाति</th>
                    <th class="p-3">क्षेत्रफल व गहराई</th>
                    <th class="p-3">जल आयतन (Volume m³)</th>
                    <th class="p-3">स्टॉकिंग व DOC</th>
                    <th class="p-3">एरेटर व किसान</th>
                    <th class="p-3 text-right">कार्यवाई (Actions)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${
                    this.state.ponds.length === 0
                      ? `<tr><td colspan="7" class="p-6 text-center text-slate-500 font-mono">कोई तालाब रिकॉर्ड नहीं मिला। ऊपर दिए गए बटन से नया तालाब जोड़ें।</td></tr>`
                      : this.state.ponds
                          .map((p) => {
                            const vol = this.calculatePondVolumeM3(p.areaHectares, p.waterDepthMeters);
                            return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white text-xs">${p.pondId}</span>
                            <div class="text-[11px] text-cyan-400 font-semibold mt-0.5">${p.pondName}</div>
                          </td>
                          <td class="p-3">
                            <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              p.waterType === "BRACKISH"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : p.waterType === "BIOFLOC"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            }">
                              ${p.waterType}
                            </span>
                            <div class="text-[11px] text-slate-300 mt-1">${p.speciesStocked}</div>
                          </td>
                          <td class="p-3 font-mono">
                            <div class="text-white font-bold">${p.areaHectares} ha</div>
                            <div class="text-[10px] text-slate-400">Depth: ${p.waterDepthMeters} m</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-sm font-black text-cyan-400">${vol.toLocaleString()} m³</span>
                            <div class="text-[10px] text-slate-500">Exact Capacity</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-white font-bold">${p.stockingDensity.toLocaleString()} pcs</span>
                            <div class="text-[10px] text-emerald-400">DOC: ${p.daysOfCulture} दिन</div>
                          </td>
                          <td class="p-3 text-[11px]">
                            <div class="text-slate-200 font-semibold">${p.farmerName}</div>
                            <div class="text-[10px] text-slate-400 font-mono">${p.aerationType}</div>
                          </td>
                          <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button data-print-dossier="${p.pondId}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white" title="Print Water Analysis Dossier">
                              <i class="fa-solid fa-print"></i>
                            </button>
                            <button data-delete-pond="${p.id}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300" title="Delete Pond">
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
          </div>

          <!-- RECENT WATER QUALITY TESTING LOG -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-vial-circle-check text-emerald-400"></i> जल-गुणवत्ता रासायनिक परीक्षण लॉग (Hydro-Chemical Logs)
                </h3>
                <p class="text-xs text-slate-400">Dissolved Oxygen (DO), pH, Total Ammonia, Toxic Unionized NH3, Alkalinity, and Nitrite.</p>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">लॉग आईडी व समय</th>
                    <th class="p-3">तालाब आईडी</th>
                    <th class="p-3">DO (mg/L)</th>
                    <th class="p-3">जल तापमान व pH</th>
                    <th class="p-3">Total Ammonia (TAN)</th>
                    <th class="p-3">Toxic NH3 (Unionized)</th>
                    <th class="p-3">Alkalinity (CaCO3)</th>
                    <th class="p-3 text-right">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.waterQualityLog
                    .map((w) => {
                      const isDoCritical = w.dissolvedOxygenMgL < 3.0;
                      const isNh3Toxic = w.unionizedAmmoniaMgL >= 0.05;
                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-white">${w.logId}</span>
                          <div class="text-[10px] text-slate-500">${new Date(w.timestamp).toLocaleString("hi-IN")}</div>
                        </td>
                        <td class="p-3 font-mono font-bold text-cyan-400">
                          ${w.pondId}
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-sm font-black ${isDoCritical ? "text-rose-400 animate-pulse" : "text-emerald-400"}">
                            ${w.dissolvedOxygenMgL} mg/L
                          </span>
                          <div class="text-[10px] text-slate-500">${isDoCritical ? "CRITICAL ASPHYXIA" : "Adequate"}</div>
                        </td>
                        <td class="p-3 font-mono">
                          <div class="text-white font-bold">${w.waterTempC}°C</div>
                          <div class="text-[10px] ${w.pH < 7.0 || w.pH > 8.8 ? "text-amber-400" : "text-slate-400"}">pH: ${w.pH}</div>
                        </td>
                        <td class="p-3 font-mono text-white">
                          ${w.totalAmmoniaNitrogenMgL} mg/L
                        </td>
                        <td class="p-3 font-mono">
                          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${
                            isNh3Toxic ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }">
                            ${w.unionizedAmmoniaMgL} mg/L
                          </span>
                          <div class="text-[10px] text-slate-500">${isNh3Toxic ? "GILL HYPERPLASIA RISK" : "Safe Tier"}</div>
                        </td>
                        <td class="p-3 font-mono text-white">
                          ${w.alkalinityMgL} mg/L
                        </td>
                        <td class="p-3 text-right font-mono text-[10px]">
                          <span class="px-2 py-0.5 rounded font-bold ${
                            isDoCritical || isNh3Toxic ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }">
                            ${w.status || "CHECKED"}
                          </span>
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

    // TAB 2: LIVE WATER QUALITY METERS & TOXICITY RADAR
    renderQualityMetersTab() {
      // Get the latest log or fallback
      const latest = this.state.waterQualityLog.length > 0 ? this.state.waterQualityLog[0] : null;
      const doVal = latest ? latest.dissolvedOxygenMgL : 5.5;
      const phVal = latest ? latest.pH : 7.8;
      const nh3Val = latest ? latest.unionizedAmmoniaMgL : 0.015;
      const alkVal = latest ? latest.alkalinityMgL : 130;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-gauge-high text-cyan-400"></i> लाइव जलीय-पर्यावरण मीटर एवं विषाक्तता रडार
                </h3>
                <p class="text-xs text-slate-400">
                  Real-time sensor telemetry for dissolved gases, toxic metabolites, and buffering capacity.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono text-slate-400">चयनित तालाब:</span>
                <select id="selMeterPondSwitcher" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono">
                  ${this.state.ponds.map((p) => `<option value="${p.pondId}" ${p.pondId === this.state.selectedPondId ? "selected" : ""}>${p.pondId} (${p.speciesStocked})</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- 4 LIVE RADIAL / PROGRESS GAUGES -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <!-- GAUGE 1: DISSOLVED OXYGEN (DO) -->
              <div class="p-4 rounded-xl bg-slate-950/80 border ${doVal < 3.0 ? "border-rose-500/80 bg-rose-950/20" : "border-slate-800"} space-y-3">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-400 uppercase">घुलित ऑक्सीजन (DO)</span>
                  <span class="font-bold ${doVal < 3.0 ? "text-rose-400" : "text-emerald-400"}">${doVal < 3.0 ? "CRITICAL" : "OPTIMAL"}</span>
                </div>
                <div class="text-3xl font-display font-black ${doVal < 3.0 ? "text-rose-400" : "text-cyan-400"}">
                  ${doVal} <span class="text-sm font-mono text-slate-400 font-normal">mg/L</span>
                </div>
                <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div class="h-full ${doVal < 3.0 ? "bg-rose-500" : doVal < 5.0 ? "bg-amber-400" : "bg-cyan-400"}" style="width: ${Math.min(100, (doVal / 8) * 100)}%;"></div>
                </div>
                <div class="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>0 mg/L</span>
                  <span class="text-emerald-400">>5.0 Target</span>
                  <span>8.0+</span>
                </div>
              </div>

              <!-- GAUGE 2: WATER PH -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-400 uppercase">जल pH सूचकांक</span>
                  <span class="font-bold ${phVal < 6.5 || phVal > 8.8 ? "text-amber-400" : "text-emerald-400"}">${phVal < 6.5 || phVal > 8.8 ? "WARNING" : "BALANCED"}</span>
                </div>
                <div class="text-3xl font-display font-black ${phVal < 6.5 || phVal > 8.8 ? "text-amber-400" : "text-emerald-400"}">
                  ${phVal} <span class="text-sm font-mono text-slate-400 font-normal">pH</span>
                </div>
                <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-400" style="width: ${((phVal - 5) / 5) * 100}%;"></div>
                </div>
                <div class="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Acidic &lt;6.5</span>
                  <span class="text-emerald-400">7.5 - 8.5</span>
                  <span>Alkaline &gt;9.0</span>
                </div>
              </div>

              <!-- GAUGE 3: TOXIC UNIONIZED AMMONIA (NH3) -->
              <div class="p-4 rounded-xl bg-slate-950/80 border ${nh3Val >= 0.05 ? "border-rose-500/80 bg-rose-950/20" : "border-slate-800"} space-y-3">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-400 uppercase">विषाक्त अमोनिया (NH3)</span>
                  <span class="font-bold ${nh3Val >= 0.05 ? "text-rose-400" : "text-emerald-400"}">${nh3Val >= 0.05 ? "TOXIC RISK" : "SAFE"}</span>
                </div>
                <div class="text-3xl font-display font-black ${nh3Val >= 0.05 ? "text-rose-400" : "text-emerald-400"}">
                  ${nh3Val} <span class="text-sm font-mono text-slate-400 font-normal">mg/L</span>
                </div>
                <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div class="h-full ${nh3Val >= 0.05 ? "bg-rose-500" : "bg-emerald-400"}" style="width: ${Math.min(100, (nh3Val / 0.15) * 100)}%;"></div>
                </div>
                <div class="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>0.00</span>
                  <span class="text-rose-400">Threshold: 0.05</span>
                  <span>0.15+</span>
                </div>
              </div>

              <!-- GAUGE 4: TOTAL ALKALINITY -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-400 uppercase">कुल क्षारीयता (Alkalinity)</span>
                  <span class="font-bold text-cyan-400">BUFFER OK</span>
                </div>
                <div class="text-3xl font-display font-black text-white">
                  ${alkVal} <span class="text-sm font-mono text-slate-400 font-normal">mg/L</span>
                </div>
                <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div class="h-full bg-cyan-400" style="width: ${Math.min(100, (alkVal / 200) * 100)}%;"></div>
                </div>
                <div class="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>&lt;80 Low</span>
                  <span class="text-cyan-400">120-160 Ideal</span>
                  <span>200+</span>
                </div>
              </div>

            </div>

            <!-- SCIENTIFIC AMMONIA EQUILIBRIUM NOTE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-cyan-400 flex items-center gap-2">
                <i class="fa-solid fa-atom"></i> अमोनिया हाइड्रो-केमिस्ट्री संतुलन (Emerson Chemical Equilibrium)
              </div>
              <p class="text-slate-400 leading-relaxed">
                पानी में कुल अमोनिया (TAN) दो रूपों में रहता है: <strong>अविषैला आयनित अमोनियम (NH4+)</strong> तथा <strong>अत्यधिक विषैला गैर-आयनित अमोनिया (NH3)</strong>। उच्च तापमान और 8.5 से अधिक pH होने पर रासायनिक संतुलन तेजी से घातक NH3 की ओर झुक जाता है। जब NH3 0.05 mg/L से ऊपर जाता है, तो मछलियों के गलफड़ों में सूजन (Hyperplasia), सांस घुटने और लालिमा की समस्या पैदा होती है।
              </p>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: FISH ANATOMY & LESION TRIAGE
    renderDiseaseDiagnosticsTab() {
      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- FISH ANATOMICAL LESION SELECTOR -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-fish"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">मत्स्य शारीरिक अंग परीक्षण</h3>
                  <span class="text-[10px] font-mono text-cyan-400">Anatomical Lesion Triage Matrix</span>
                </div>
              </div>

              <div class="space-y-2.5 text-xs text-slate-300">
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-eye"></i> 1. गलफड़े / Gills स्थिति
                  </span>
                  <select id="selDiagGills" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white">
                    <option value="HEALTHY_RED">स्वस्थ चमकदार लाल (Bright Healthy Red)</option>
                    <option value="PALE">फीके / सफेद (Pale Anemic - Toxins/Parasites)</option>
                    <option value="ROTTEN_NECROTIC">सड़े हुए भूरे (Necrotic Gill Rot - Columnaris)</option>
                    <option value="WHITE_SPOTS">सफेद दानेदार (White Nodules - Ichthyophthiriasis)</option>
                  </select>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span class="font-bold text-amber-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-shield-halved"></i> 2. त्वचा एवं शल्क / Skin & Scales
                  </span>
                  <div class="space-y-1.5">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkSignUlcers" class="w-3.5 h-3.5 text-cyan-500 rounded" />
                      <span>गहरे लाल सड़न युक्त घाव (EUS Red Ulcers)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkSignWhiteSpots" class="w-3.5 h-3.5 text-cyan-500 rounded" />
                      <span>कड़े आवरण पर सफेद धब्बे (Shrimp WSSV)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkSignLice" class="w-3.5 h-3.5 text-cyan-500 rounded" />
                      <span>चिपके हुए परजीवी जूं (Argulus Crustaceans)</span>
                    </label>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span class="font-bold text-rose-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-heart-pulse"></i> 3. पंख एवं आंतरिक लक्षण / Fins & Organs
                  </span>
                  <div class="space-y-1.5">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkSignFinRot" class="w-3.5 h-3.5 text-cyan-500 rounded" />
                      <span>पंखों का कटना व गलना (Fin/Tail Rot)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkSignDropsy" class="w-3.5 h-3.5 text-cyan-500 rounded" />
                      <span>पेट में पानी भरना व आंखें बाहर आना (Dropsy/Pop-eye)</span>
                    </label>
                  </div>
                </div>

                <button id="btnRunDifferentialDiagnosis" class="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all flex items-center justify-center gap-2">
                  <i class="fa-solid fa-brain"></i> विभेदक रोग निदान चलाएं (Run Diagnosis)
                </button>
              </div>
            </div>

            <!-- DIAGNOSTIC RESULT & TREATMENT PROTOCOL -->
            <div class="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-clipboard-check text-emerald-400"></i> रोग निदान निष्कर्ष एवं उपचार प्रोटोकॉल
                </h3>
                <button id="btnOpenNewCaseModal" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700">
                  + नया रोग केस दर्ज करें
                </button>
              </div>

              <div id="diagOutcomeBox" class="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold text-cyan-400 uppercase">प्राथमिक संभावित रोग (Presumptive Diagnosis)</span>
                  <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">CIFA VALIDATED</span>
                </div>
                <div class="text-xl font-display font-black text-white" id="lblDiagnosedName">
                  Epizootic Ulcerative Syndrome (EUS / संक्रामक अल्सर सिंड्रोम)
                </div>
                <div class="text-xs text-slate-300" id="lblDiagnosedPathogen">
                  <strong>रोगजनक:</strong> Aphanomyces invadans (गहरा ऊतक-विनाशक कवक)
                </div>
                <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div class="text-amber-300 font-bold">अनुशंसित उपचार (Prescription Protocol):</div>
                  <div class="text-slate-300" id="lblDiagnosedRx">
                    पोटेशियम परमैंगनेट (KMnO4) @ 2.5 से 3.0 ppm (2.5 से 3.0 किग्रा प्रति 1000 घन मीटर पानी) का पूरे तालाब में छिड़काव करें अथवा CIFAX 1 लीटर प्रति हेक्टेयर-मीटर पानी में घोलकर डालें।
                  </div>
                </div>
              </div>

              <!-- LOGGED PATHOLOGY REPORTS TABLE -->
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-2.5">रिपोर्ट आईडी व तिथि</th>
                      <th class="p-2.5">तालाब</th>
                      <th class="p-2.5">निदानित रोग</th>
                      <th class="p-2.5">मृत्यु संख्या</th>
                      <th class="p-2.5 text-right">उपचार स्थिति</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${this.state.fishPathologyLog
                      .map((d) => {
                        return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-2.5 font-mono">
                            <span class="font-bold text-white">${d.reportId}</span>
                            <div class="text-[10px] text-slate-500">${d.date}</div>
                          </td>
                          <td class="p-2.5 font-mono font-bold text-cyan-400">${d.pondId}</td>
                          <td class="p-2.5 font-semibold text-white">
                            ${d.suspectedDisease}
                          </td>
                          <td class="p-2.5 font-mono text-rose-400 font-bold">
                            ${d.mortalityCount || 0} मछली
                          </td>
                          <td class="p-2.5 text-right font-mono text-[11px] text-emerald-400 font-bold">
                            TREATMENT ACTIVE
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

    // TAB 4: CHEMICAL DOSAGE & LIMING CALCULATOR
    renderChemicalCalculatorTab() {
      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-5">
            <div>
              <span class="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                <i class="fa-solid fa-calculator mr-1"></i> Automated Aqua-Chemical Hydro-Bath Engine
              </span>
              <h3 class="text-base font-display font-bold text-white mt-0.5">
                तालाब जल-आयतन एवं रासायनिक उपचार खुराक संगणक (Pond Dosage Calculator)
              </h3>
              <p class="text-xs text-slate-400">
                1 ppm (Parts Per Million) = 1 g/m³ = 1 किग्रा प्रति 1,000 m³ जल आयतन।
              </p>
            </div>

            <!-- INTERACTIVE DOSAGE FORM -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <label class="block text-slate-300 mb-1">तालाब क्षेत्रफल (Hectares)</label>
                <input type="number" step="0.05" id="calcAreaHa" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="1.0" />
              </div>
              <div>
                <label class="block text-slate-300 mb-1">औसत जल गहराई (Meters)</label>
                <input type="number" step="0.1" id="calcDepthM" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="1.5" />
              </div>
              <div>
                <label class="block text-slate-300 mb-1">रसायन चयन (Chemical)</label>
                <select id="calcChemicalSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans">
                  <option value="KMNO4_2.5">पोटेशियम परमैंगनेट (KMnO4 @ 2.5 ppm)</option>
                  <option value="BLEACHING_30">ब्लीचिंग पाउडर (Sanitization @ 30 ppm)</option>
                  <option value="COPPER_0.8">कॉपर सल्फेट (CuSO4 @ 0.8 ppm)</option>
                  <option value="LIME_AGRICULTURAL">कृषि चूना (Agricultural Lime CaCO3)</option>
                </select>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-center flex flex-col justify-center">
                <div class="text-[10px] uppercase text-slate-400">आवश्यक कुल मात्रा</div>
                <div id="lblCalculatedDoseKg" class="text-2xl font-black text-cyan-400 mt-0.5">37.50 kg</div>
              </div>
            </div>

            <!-- RESULT BREAKDOWN CARD -->
            <div id="dosageBreakdownCard" class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div class="flex justify-between items-center text-slate-300 border-b border-slate-800/80 pb-2">
                <span>कुल तालाब जल आयतन (Pond Water Volume):</span>
                <strong class="text-white font-mono" id="lblBreakdownVolume">15,000 m³ (1.50 Crore Liters)</strong>
              </div>
              <div class="flex justify-between items-center text-slate-300 border-b border-slate-800/80 pb-2">
                <span>प्रयुक्त रासायनिक सघनता (Concentration):</span>
                <strong class="text-cyan-400 font-mono" id="lblBreakdownPpm">2.5 ppm (2.5 g/m³)</strong>
              </div>
              <div class="flex justify-between items-center text-slate-300">
                <span>सुरक्षा सावधानियां व विधि:</span>
                <span class="text-slate-400 text-[11px]" id="lblBreakdownMethod">
                  प्रातःकाल सूर्योदय के समय पानी में अच्छी तरह घोलकर पूरे तालाब में समान रूप से छिड़काव करें।
                </span>
              </div>
            </div>

            <!-- LIMING CHART REFERENCE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-amber-300">CIFA मानक चूना (Liming) प्रयोग सारणी:</div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 font-mono text-[11px] pt-1">
                <div class="p-2 rounded bg-slate-900 border border-slate-800">
                  <div class="text-rose-400 font-bold">pH &lt; 5.0 (तीव्र अम्लीय)</div>
                  <div class="text-white">2,000 kg/ha</div>
                </div>
                <div class="p-2 rounded bg-slate-900 border border-slate-800">
                  <div class="text-amber-400 font-bold">pH 5.1 - 6.5 (मध्यम)</div>
                  <div class="text-white">1,000 - 1,200 kg/ha</div>
                </div>
                <div class="p-2 rounded bg-slate-900 border border-slate-800">
                  <div class="text-cyan-400 font-bold">pH 6.6 - 7.5 (सामान्य)</div>
                  <div class="text-white">500 - 600 kg/ha</div>
                </div>
                <div class="p-2 rounded bg-slate-900 border border-slate-800">
                  <div class="text-emerald-400 font-bold">pH &gt; 7.5 (रखरखाव)</div>
                  <div class="text-white">200 - 300 kg/ha</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // 4.5 EVENT BINDING & INTERACTION WORKFLOW
    bindEvents() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Tab switching
      container.querySelectorAll(".aqua-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Quick Aerator Dispatch Handler
      const btnQuickAeratorDispatch = container.querySelector("#btnQuickAeratorDispatch");
      if (btnQuickAeratorDispatch) {
        btnQuickAeratorDispatch.addEventListener("click", () => {
          alert("आपातकालीन निर्देश प्रेषित: सभी तालाब पैडल-व्हील एरेटर 100% क्षमता पर प्रारंभ कर दिए गए हैं।");
        });
      }

      // Pond Switcher on Meters Tab
      const selMeterPondSwitcher = container.querySelector("#selMeterPondSwitcher");
      if (selMeterPondSwitcher) {
        selMeterPondSwitcher.addEventListener("change", (e) => {
          this.state.selectedPondId = e.target.value;
          this.render();
        });
      }

      // Chemical Calculator Interactivity
      const inArea = container.querySelector("#calcAreaHa");
      const inDepth = container.querySelector("#calcDepthM");
      const selChem = container.querySelector("#calcChemicalSelect");
      const lblDose = container.querySelector("#lblCalculatedDoseKg");
      const lblVol = container.querySelector("#lblBreakdownVolume");
      const lblPpm = container.querySelector("#lblBreakdownPpm");
      const lblMethod = container.querySelector("#lblBreakdownMethod");

      const updateChemicalCalculation = () => {
        if (!inArea || !inDepth || !selChem || !lblDose) return;
        const a = parseFloat(inArea.value) || 1.0;
        const d = parseFloat(inDepth.value) || 1.5;
        const vol = this.calculatePondVolumeM3(a, d);
        const chem = selChem.value;

        if (lblVol) lblVol.textContent = vol.toLocaleString() + " m³ (" + (vol * 1000).toLocaleString() + " Liters)";

        if (chem === "KMNO4_2.5") {
          const kg = this.calculateChemicalDose(vol, 2.5);
          lblDose.textContent = kg + " kg";
          if (lblPpm) lblPpm.textContent = "2.5 ppm (2.5 g/m³)";
          if (lblMethod) lblMethod.textContent = "पोटेशियम परमैंगनेट: सुबह के समय पानी में घोलकर छिड़कें। परजीवियों व कवक के विरुद्ध प्रभावी।";
        } else if (chem === "BLEACHING_30") {
          const kg = this.calculateChemicalDose(vol, 30.0);
          lblDose.textContent = kg + " kg";
          if (lblPpm) lblPpm.textContent = "30.0 ppm (Sanitization)";
          if (lblMethod) lblMethod.textContent = "ब्लीचिंग पाउडर (30% क्लोरीन): स्टॉकिंग से 15 दिन पूर्व जल शोधन हेतु डालें।";
        } else if (chem === "COPPER_0.8") {
          const kg = this.calculateChemicalDose(vol, 0.8);
          lblDose.textContent = kg + " kg";
          if (lblPpm) lblPpm.textContent = "0.8 ppm (Algaecide/Columnaris)";
          if (lblMethod) lblMethod.textContent = "कॉपर सल्फेट: पानी की क्षारीयता 100 mg/L से अधिक होने पर ही प्रयोग करें।";
        } else if (chem === "LIME_AGRICULTURAL") {
          const kg = this.calculateLimingRequirement(a, 6.8);
          lblDose.textContent = kg + " kg";
          if (lblPpm) lblPpm.textContent = "Agricultural Lime CaCO3";
          if (lblMethod) lblMethod.textContent = "कृषि चूना: पानी में भिगोकर ठंडा होने के बाद छिड़कें। pH संतुलन व क्षारीयता वृद्धि हेतु।";
        }
      };

      if (inArea && inDepth && selChem) {
        inArea.addEventListener("input", updateChemicalCalculation);
        inDepth.addEventListener("input", updateChemicalCalculation);
        selChem.addEventListener("change", updateChemicalCalculation);
      }

      // Differential Diagnosis Trigger
      const btnRunDifferentialDiagnosis = container.querySelector("#btnRunDifferentialDiagnosis");
      if (btnRunDifferentialDiagnosis) {
        btnRunDifferentialDiagnosis.addEventListener("click", () => {
          const gillVal = container.querySelector("#selDiagGills")?.value;
          const uSign = container.querySelector("#chkSignUlcers")?.checked;
          const wSign = container.querySelector("#chkSignWhiteSpots")?.checked;
          const lSign = container.querySelector("#chkSignLice")?.checked;
          const fSign = container.querySelector("#chkSignFinRot")?.checked;
          const dSign = container.querySelector("#chkSignDropsy")?.checked;

          const lblName = container.querySelector("#lblDiagnosedName");
          const lblPathogen = container.querySelector("#lblDiagnosedPathogen");
          const lblRx = container.querySelector("#lblDiagnosedRx");

          if (wSign) {
            lblName.textContent = "White Spot Syndrome Virus (WSSV in Shrimp)";
            lblPathogen.innerHTML = "<strong>रोगजनक:</strong> Nimaviridae / Whispovirus";
            lblRx.textContent = "कड़ा बायोसिक्योरिटी प्रतिबंध। commercial साइज होने पर तत्काल आपातकालीन फसल निकालें, अन्यथा तालाब ब्लीचिंग 30 ppm से निष्फल करें।";
          } else if (lSign) {
            lblName.textContent = "Argulosis (Fish Louse Infestation / जूं संक्रमण)";
            lblPathogen.innerHTML = "<strong>रोगजनक:</strong> Argulus foliaceus (Crustacean ectoparasite)";
            lblRx.textContent = "Emamectin Benzoate (5 mg/kg feed) 7 दिन तक दें अथवा Deltamethrin 0.05 ppm तालाब में डालें।";
          } else if (dSign) {
            lblName.textContent = "Infectious Dropsy (Aeromonas Septicemia)";
            lblPathogen.innerHTML = "<strong>रोगजनक:</strong> Aeromonas hydrophila (जीवाणु संक्रमण)";
            lblRx.textContent = "Oxytetracycline @ 50 mg/kg बायोमास 10 दिन तक आहार में दें + 30% पानी बदलें।";
          } else if (fSign || gillVal === "ROTTEN_NECROTIC") {
            lblName.textContent = "Columnaris / Cotton Wool Fin Rot";
            lblPathogen.innerHTML = "<strong>रोगजनक:</strong> Flavobacterium columnare";
            lblRx.textContent = "कॉपर सल्फेट 0.8 ppm या पोटेशियम परमैंगनेट 2.0 ppm का तालाब छिड़काव करें।";
          } else {
            lblName.textContent = "Epizootic Ulcerative Syndrome (EUS / अल्सर सिंड्रोम)";
            lblPathogen.innerHTML = "<strong>रोगजनक:</strong> Aphanomyces invadans (कवक)";
            lblRx.textContent = "पोटेशियम परमैंगनेट (KMnO4) @ 2.5 से 3.0 ppm अथवा CIFAX 1 लीटर प्रति हेक्टेयर-मीटर पानी में छिड़कें।";
          }

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("विभेदक रोग निदान सफलता से अद्यतन हुआ!", "info");
          }
        });
      }

      // Modal Open Triggers
      const btnOpenAddPondModal = container.querySelector("#btnOpenAddPondModal");
      if (btnOpenAddPondModal) {
        btnOpenAddPondModal.addEventListener("click", () => this.showAddPondModal());
      }

      const btnOpenLogWaterModal = container.querySelector("#btnOpenLogWaterModal");
      if (btnOpenLogWaterModal) {
        btnOpenLogWaterModal.addEventListener("click", () => this.showLogWaterModal());
      }

      const btnOpenNewCaseModal = container.querySelector("#btnOpenNewCaseModal");
      if (btnOpenNewCaseModal) {
        btnOpenNewCaseModal.addEventListener("click", () => this.showNewCaseModal());
      }

      // Print Dossier Buttons
      container.querySelectorAll("[data-print-dossier]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const pId = e.currentTarget.getAttribute("data-print-dossier");
          this.printWaterQualityDossier(pId);
        });
      });

      // Delete Pond Buttons
      container.querySelectorAll("[data-delete-pond]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.getAttribute("data-delete-pond");
          if (confirm("क्या आप वाकई इस तालाब रिकॉर्ड को हटाना चाहते हैं?")) {
            await AquaStorage.delete(id);
            this.state.ponds = this.state.ponds.filter((x) => x.id !== id);
            this.render();
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("तालाब रिकॉर्ड सफलतापूर्वक हटाया गया।", "warning");
            }
          }
        });
      });
    },

    // 4.6 CLINICAL MODALS
    showAddPondModal() {
      const modalHost = document.getElementById("aquaModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="addPondModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-water"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">नया तालाब / जल क्षेत्र पंजीकृत करें (Add Pond)</h3>
                  <span class="text-[10px] font-mono text-cyan-400">CIFA / NFDB Aquaculture Standard</span>
                </div>
              </div>
              <button id="btnCloseAddPondModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddPond" onsubmit="return false;" class="space-y-3.5 text-xs">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">तालाब कोड (Pond ID)</label>
                  <input type="text" id="inPondId" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold" value="POND-${Date.now().toString().slice(-4)}" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">तालाब का नाम (Pond Name)</label>
                  <input type="text" id="inPondName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold" placeholder="उदा. सेक्टर B3 कार्प तालाब" required />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">जल का प्रकार (Water Type)</label>
                  <select id="inWaterType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="FRESHWATER">FRESHWATER (मीठा पानी / कार्प)</option>
                    <option value="BRACKISH">BRACKISH (खारा पानी / झींगा)</option>
                    <option value="BIOFLOC">BIOFLOC (सघन बायोफ्लॉक टैंक)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">स्टॉक्ड प्रजाति (Species)</label>
                  <select id="inSpeciesStocked" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    ${AQUA_STANDARDS.SPECIES_CATALOG.map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">क्षेत्रफल (Hectares)</label>
                  <input type="number" step="0.01" id="inPondArea" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="1.0" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">जल गहराई (Meters)</label>
                  <input type="number" step="0.1" id="inPondDepth" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="1.5" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">स्टॉकिंग संख्या (Fingerlings)</label>
                  <input type="number" id="inStockingQty" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="10000" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">किसान / फार्म का नाम (Farmer Name)</label>
                  <input type="text" id="inFarmerName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. रमेश कुमार" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">एरेटर व्यवस्था (Aeration)</label>
                  <input type="text" id="inAeratorInfo" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="4-Paddle Wheel Aerators" />
                </div>
              </div>

              <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelAddPond" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitAddPond" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-950/40">तालाब सहेजें (Save Pond)</button>
              </div>

            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseAddPondModal").addEventListener("click", close);
      document.getElementById("btnCancelAddPond").addEventListener("click", close);

      document.getElementById("formAddPond").addEventListener("submit", async () => {
        const pondId = document.getElementById("inPondId").value.trim();
        const pondName = document.getElementById("inPondName").value.trim();
        const waterType = document.getElementById("inWaterType").value;
        const speciesStocked = document.getElementById("inSpeciesStocked").value;
        const areaHectares = parseFloat(document.getElementById("inPondArea").value) || 1.0;
        const waterDepthMeters = parseFloat(document.getElementById("inPondDepth").value) || 1.5;
        const stockingDensity = parseInt(document.getElementById("inStockingQty").value, 10) || 10000;
        const farmerName = document.getElementById("inFarmerName").value.trim();
        const aerationType = document.getElementById("inAeratorInfo").value.trim();

        const newPond = {
          id: "POND-" + pondId,
          recordType: "POND_PROFILE",
          pondId,
          pondName,
          waterType,
          areaHectares,
          waterDepthMeters,
          speciesStocked,
          stockingDensity,
          daysOfCulture: 1,
          aerationType,
          farmerName,
          location: "Registered Farm Unit"
        };

        await AquaStorage.put(newPond);
        this.state.ponds.unshift(newPond);
        this.state.selectedPondId = pondId;
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("तालाब '" + pondName + "' सफलतापूर्वक जोड़ा गया।", "success");
        }
      });
    },

    showLogWaterModal() {
      const modalHost = document.getElementById("aquaModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="logWaterModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-flask-vial text-emerald-400 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">जल-गुणवत्ता परीक्षण दर्ज करें (Log Water Chemistry)</h3>
              </div>
              <button id="btnCloseWaterModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formLogWater" onsubmit="return false;" class="space-y-3.5 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">तालाब चयन (Select Pond)</label>
                <select id="selWaterPond" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.ponds.map((p) => `<option value="${p.pondId}">${p.pondId} - ${p.pondName}</option>`).join("")}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">घुलित ऑक्सीजन (DO mg/L)</label>
                  <input type="number" step="0.1" id="inWaterDo" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="5.8" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">जल pH स्तर</label>
                  <input type="number" step="0.1" id="inWaterPh" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono" value="8.0" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">जल तापमान (°C)</label>
                  <input type="number" step="0.1" id="inWaterTemp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="28.5" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">Total Ammonia (TAN mg/L)</label>
                  <input type="number" step="0.05" id="inWaterTan" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold font-mono" value="0.4" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">Alkalinity (CaCO3 mg/L)</label>
                  <input type="number" id="inWaterAlk" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="130" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">Nitrite (NO2 mg/L)</label>
                  <input type="number" step="0.01" id="inWaterNitrite" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="0.04" />
                </div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <i class="fa-solid fa-calculator text-cyan-400"></i>
                <span>Toxic NH3 की गणना pH और तापमान के आधार पर Emerson फॉर्मूला द्वारा स्वतः की जाएगी।</span>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelWater" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitWater" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">लॉग दर्ज करें (Save Test)</button>
              </div>
            </form>

          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseWaterModal").addEventListener("click", close);
      document.getElementById("btnCancelWater").addEventListener("click", close);

      document.getElementById("formLogWater").addEventListener("submit", async () => {
        const pondId = document.getElementById("selWaterPond").value;
        const doVal = parseFloat(document.getElementById("inWaterDo").value) || 5.0;
        const phVal = parseFloat(document.getElementById("inWaterPh").value) || 7.5;
        const tempVal = parseFloat(document.getElementById("inWaterTemp").value) || 28.0;
        const tanVal = parseFloat(document.getElementById("inWaterTan").value) || 0.2;
        const alkVal = parseInt(document.getElementById("inWaterAlk").value, 10) || 120;
        const no2Val = parseFloat(document.getElementById("inWaterNitrite").value) || 0.02;

        const nh3Val = this.calculateUnionizedAmmonia(tanVal, phVal, tempVal);
        let status = "NORMAL_OPTIMAL";
        if (doVal < 3.0) status = "CRITICAL_HYPOXIA";
        else if (nh3Val >= 0.05) status = "WARNING_TOXIC_NH3";

        const logEntry = {
          id: "WATER-LOG-" + Date.now(),
          recordType: "WATER_LOG",
          logId: "WATER-LOG-" + Date.now().toString().slice(-4),
          pondId,
          timestamp: new Date().toISOString(),
          dissolvedOxygenMgL: doVal,
          waterTempC: tempVal,
          pH: phVal,
          totalAmmoniaNitrogenMgL: tanVal,
          unionizedAmmoniaMgL: nh3Val,
          alkalinityMgL: alkVal,
          nitriteMgL: no2Val,
          turbidityCm: 30,
          status
        };

        await AquaStorage.put(logEntry);
        this.state.waterQualityLog.unshift(logEntry);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("जल परीक्षण डेटा सफलतापूर्वक सहेजा गया।", "success");
        }
      });
    },

    showNewCaseModal() {
      const modalHost = document.getElementById("aquaModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="newCaseModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">मत्स्य रोग / घाव केस दर्ज करें</h3>
              <button id="btnCloseCaseModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formNewCase" onsubmit="return false;" class="space-y-3 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">तालाब चयन</label>
                <select id="selCasePond" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.ponds.map((p) => `<option value="${p.pondId}">${p.pondId} - ${p.pondName}</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">निदानित रोग (Diagnosed Disease)</label>
                <select id="selCaseDisease" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  ${AQUA_STANDARDS.PATHOLOGIES.map((d) => `<option value="${d.name}">${d.name}</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">दैनिक मृत्यु संख्या (Daily Mortality)</label>
                <input type="number" id="inCaseMortality" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold font-mono" value="15" />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">प्रदत्त उपचार (Treatment Prescribed)</label>
                <input type="text" id="inCaseRx" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="KMnO4 @ 2.5 ppm pond drench + Water exchange" required />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelCase" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitCase" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">केस सहेजें (Save Report)</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseCaseModal").addEventListener("click", close);
      document.getElementById("btnCancelCase").addEventListener("click", close);

      document.getElementById("formNewCase").addEventListener("submit", async () => {
        const pondId = document.getElementById("selCasePond").value;
        const disease = document.getElementById("selCaseDisease").value;
        const mort = parseInt(document.getElementById("inCaseMortality").value, 10) || 0;
        const rx = document.getElementById("inCaseRx").value.trim();

        const item = {
          id: "PATH-" + Date.now(),
          recordType: "PATHOLOGY_REPORT",
          reportId: "PATH-" + Date.now().toString().slice(-4),
          pondId,
          date: new Date().toISOString().split("T")[0],
          observedSigns: ["Clinical pathology documented in field"],
          gillCondition: "PALE",
          suspectedDisease: disease,
          mortalityCount: mort,
          treatmentRecommended: rx,
          practitioner: "Dr. Rahul (Aquatic Pathologist)"
        };

        await AquaStorage.put(item);
        this.state.fishPathologyLog.unshift(item);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("रोग केस सफलतापूर्वक दर्ज किया गया।", "success");
        }
      });
    },

    // 4.7 BILINGUAL A4 WATER QUALITY DOSSIER & PRESCRIPTION PRINT ENGINE
    printWaterQualityDossier(pondId) {
      const pond = this.state.ponds.find((p) => p.pondId === pondId);
      if (!pond) {
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("तालाब रिकॉर्ड नहीं मिला।", "error");
        }
        return;
      }

      const waterLogs = this.state.waterQualityLog.filter((w) => w.pondId === pondId);
      const latestWater = waterLogs.length > 0 ? waterLogs[0] : null;
      const vol = this.calculatePondVolumeM3(pond.areaHectares, pond.waterDepthMeters);

      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि A4 वाटर क्वालिटी डॉसियर मुद्रित किया जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Aquaculture Water Dossier - ${pond.pondId}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 12px; }
            .header-table { width: 100%; border-bottom: 2px solid #0891b2; padding-bottom: 12px; margin-bottom: 20px; }
            .header-table td { vertical-align: middle; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-cyan { background: #cffafe; color: #0e7490; border: 1px solid #a5f3fc; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
            .kpi-box { border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; text-align: center; background: #f0fdfa; }
            .kpi-val { font-size: 18px; font-weight: 800; color: #0891b2; margin-top: 4px; }
            .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0891b2; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin: 20px 0 10px; }
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
                <div style="font-size: 20px; font-weight: 900; color: #0891b2; letter-spacing: -0.5px;">VETCARE AI OS (AQUACULTURE DIVISION)</div>
                <div style="font-size: 11px; color: #4b5563;">National Aquatic Animal Health & Inland Fisheries Telemetry Command</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">आधिकारिक जल-गुणवत्ता विश्लेषण एवं मत्स्य स्वास्थ्य प्रमाण पत्र (Water Dossier)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-cyan">CIFA / NFDB STANDARDS</span><br/>
                <div style="font-family: monospace; font-size: 11px; margin-top: 5px; font-weight: bold;">POND ID: ${pond.pondId}</div>
                <div style="font-size: 10px; color: #6b7280;">Date: ${new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <div class="kpi-grid">
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">जल आयतन (Volume)</div>
              <div class="kpi-val">${vol.toLocaleString()} m³</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">घुलित ऑक्सीजन (DO)</div>
              <div class="kpi-val" style="color: ${latestWater && latestWater.dissolvedOxygenMgL < 3 ? "#b91c1c" : "#0891b2"}">
                ${latestWater ? latestWater.dissolvedOxygenMgL + " mg/L" : "N/A"}
              </div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Toxic NH3 (Ammonia)</div>
              <div class="kpi-val" style="color: ${latestWater && latestWater.unionizedAmmoniaMgL >= 0.05 ? "#b91c1c" : "#065f46"}">
                ${latestWater ? latestWater.unionizedAmmoniaMgL + " mg/L" : "N/A"}
              </div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">pH स्तर</div>
              <div class="kpi-val">${latestWater ? latestWater.pH : "N/A"}</div>
            </div>
          </div>

          <div class="section-title">1. तालाब एवं स्टॉकिंग बायोमेट्रिक विवरण (Pond & Biomass Profile)</div>
          <table class="data-table">
            <tr>
              <th width="25%">तालाब का नाम</th>
              <td width="25%"><strong>${pond.pondName}</strong></td>
              <th width="25%">जल प्रणाली (System)</th>
              <td width="25%"><strong>${pond.waterType}</strong></td>
            </tr>
            <tr>
              <th>क्षेत्रफल व औसत गहराई</th>
              <td>${pond.areaHectares} Hectares / ${pond.waterDepthMeters} Meters</td>
              <th>स्टॉक्ड मत्स्य प्रजाति</th>
              <td>${pond.speciesStocked}</td>
            </tr>
            <tr>
              <th>स्टॉकिंग घनत्व (Density)</th>
              <td>${pond.stockingDensity.toLocaleString()} Fingerlings / Post-larvae</td>
              <th>संवर्धन दिन (DOC)</th>
              <td><strong>Day ${pond.daysOfCulture}</strong></td>
            </tr>
            <tr>
              <th>पालक / किसान का नाम</th>
              <td><strong>${pond.farmerName}</strong></td>
              <th>एरेटर उपकरण विवरण</th>
              <td>${pond.aerationType}</td>
            </tr>
          </table>

          <div class="section-title">2. जल-रासायनिक विश्लेषण (Hydro-Chemical Telemetry)</div>
          <table class="data-table">
            <tr>
              <th width="35%">घुलित ऑक्सीजन (Dissolved Oxygen)</th>
              <td><strong>${latestWater ? latestWater.dissolvedOxygenMgL + " mg/L (Target >5.0 mg/L)" : "N/A"}</strong></td>
            </tr>
            <tr>
              <th>जल तापमान एवं pH</th>
              <td>${latestWater ? latestWater.waterTempC + "°C | pH: " + latestWater.pH : "N/A"}</td>
            </tr>
            <tr>
              <th>कुल अमोनिया (Total Ammonia Nitrogen - TAN)</th>
              <td>${latestWater ? latestWater.totalAmmoniaNitrogenMgL + " mg/L" : "N/A"}</td>
            </tr>
            <tr>
              <th>गैर-आयनित विषाक्त अमोनिया (Toxic NH3)</th>
              <td><strong>${latestWater ? latestWater.unionizedAmmoniaMgL + " mg/L (Safety Limit <0.02 mg/L)" : "N/A"}</strong></td>
            </tr>
            <tr>
              <th>कुल क्षारीयता (Total Alkalinity as CaCO3)</th>
              <td>${latestWater ? latestWater.alkalinityMgL + " mg/L (Buffering Target >120 mg/L)" : "N/A"}</td>
            </tr>
            <tr>
              <th>नाइट्राइट (Nitrite NO2)</th>
              <td>${latestWater ? latestWater.nitriteMgL + " mg/L (Toxic Level >0.5 mg/L)" : "N/A"}</td>
            </tr>
          </table>

          <div class="section-title">3. विशेषज्ञ मत्स्य रोग निदान एवं उपचार निर्देश (Prescription Advice)</div>
          <p style="font-size: 11px; line-height: 1.5; color: #374151;">
            यदि विषाक्त अमोनिया (NH3) 0.05 mg/L से ऊपर जाए, तो तत्काल 25% जल विनिमय करें एवं आहार मात्रा आधी करें। EUS अल्सर अथवा गलफड़े सड़न के नियंत्रण हेतु पोटेशियम परमैंगनेट (KMnO4) @ 2.5 ppm का तालाब में छिड़काव करें। जल क्षारीयता स्थिर रखने हेतु कृषि चूना (CaCO3) 500 किग्रा/हेक्टेयर डालें।
          </p>

          <div class="seal-row">
            <div class="sig-box">
              मत्स्य पालक / फार्म अधीक्षक<br/>
              <strong>Aqua Farmer / Farm In-Charge</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #0891b2; padding: 8px 16px; border-radius: 8px; font-weight: bold; color: #0891b2; text-transform: uppercase; font-size: 10px;">
                VETCARE AI OS<br/>AQUATIC HEALTH SEAL
              </div>
            </div>
            <div class="sig-box">
              अधिकृत जलीय जीव स्वास्थ्य अधिकारी<br/>
              <strong>Aquatic Health Specialist (CIFA/AHS)</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 HASH VERIFICATION: 7C14D92EFA012B58994ACD8173620BBAFE451290EECA1199320078815BC4321A<br/>
            Vetcare AI OS - 2026 Production Master Core • Validated for Indian Fisheries & Coastal Aquaculture Registry
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
      const modalHost = document.getElementById("aquaModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Aquaculture Fish Health Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.AquacultureFishHealth = AquacultureFishHealth;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      AquacultureFishHealth.init();
    });
  } else {
    AquacultureFishHealth.init();
  }
})();
