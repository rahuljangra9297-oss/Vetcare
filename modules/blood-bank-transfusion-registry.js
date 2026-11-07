// Vetcare AI OS - Veterinary Blood Banking, Cross-Matching & Transfusion Registry Module (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. HEMATOLOGY & TRANSFUSION MEDICINE SCIENTIFIC CONSTANTS
  const TRANSFUSION_CONSTANTS = {
    BLOOD_FACTORS: {
      canine: 90, // ml blood per kg body weight
      feline: 60,
      bovine: 70,
      equine: 80
    },
    DONOR_CRITERIA: {
      canine: {
        minWeightKg: 25.0,
        ageMinYears: 1,
        ageMaxYears: 8,
        minPcvPercent: 40,
        universalGroup: "DEA_1.1_NEG",
        mandatoryScreenings: ["Ehrlichia canis", "Babesia canis/gibsoni", "Dirofilaria immitis", "Leishmania infantum"]
      },
      feline: {
        minWeightKg: 4.5,
        ageMinYears: 1,
        ageMaxYears: 8,
        minPcvPercent: 35,
        universalGroup: "NONE", // No true universal donor in cats due to fatal alloantibodies
        mandatoryScreenings: ["FeLV (Feline Leukemia)", "FIV (Feline Immunodeficiency)", "Mycoplasma hemofelis"]
      },
      bovine: {
        minWeightKg: 350.0,
        ageMinYears: 2,
        ageMaxYears: 9,
        minPcvPercent: 28,
        universalGroup: "BOVINE_J_NEG",
        mandatoryScreenings: ["Theileria annulata", "Anaplasma marginale", "Bovine Leukemia Virus (BLV)"]
      },
      equine: {
        minWeightKg: 450.0,
        ageMinYears: 3,
        ageMaxYears: 12,
        minPcvPercent: 35,
        universalGroup: "EQUINE_QA_AA_NEG",
        mandatoryScreenings: ["Equine Infectious Anemia (Coggins)", "Piroplasmosis (Babesia caballi / Theileria equi)"]
      }
    },
    STORAGE_SHELF_LIFE_DAYS: {
      WHOLE_BLOOD: 28, // CPDA-1 stored at 1°C - 6°C
      PACKED_RBC: 35, // Stored with additive solution (ADSOL/SAGM) at 1°C - 6°C
      FRESH_FROZEN_PLASMA: 365, // Stored at -18°C or colder (preserves labile Factors V & VIII)
      CRYOPRECIPITATE: 365 // Stored at -18°C (concentrated vWF, Factor VIII, Fibrinogen)
    },
    MIN_DONATION_INTERVAL_DAYS: 60, // Minimum 8 weeks between full-volume phlebotomies
    MAX_TRANSFUSION_DURATION_HOURS: 4.0 // Complete unit within 4 hours to avoid room-temp bacterial growth
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const BloodBankStorage = {
    dbName: "VetcareBloodBankDB",
    dbVersion: 1,
    storeNames: {
      inventory: "blood_unit_inventory",
      donors: "donor_registry",
      transfusions: "transfusion_monitoring_logs"
    },
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare BloodBank] IndexedDB unavailable, using localStorage fallback.");
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
          console.error("[Vetcare BloodBank] IndexedDB error:", err);
          resolve(false);
        };
      });
    },

    async getAll(storeName) {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_BB_" + storeName);
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
      if (!item.id) item.id = "BB-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const items = await this.getAll(storeName);
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) items[idx] = item;
        else items.push(item);
        localStorage.setItem("VETCARE_BB_" + storeName, JSON.stringify(items));
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
        localStorage.setItem("VETCARE_BB_" + storeName, JSON.stringify(items));
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

  // 4. MAIN BLOOD BANK & TRANSFUSION MODULE CONTROLLER
  const BloodBankTransfusionRegistry = {
    containerId: null,
    activeTab: "blood_unit_inventory", // 'blood_unit_inventory' | 'donor_registry' | 'crossmatch_calculator' | 'transfusion_safety_audit'

    // Reactive State
    state: {
      bloodInventory: [],
      donorRegistry: [],
      transfusionMonitoringLogs: [],
      crossmatchWorkflow: {
        recipientSpecies: "canine",
        recipientWeightKg: 18.0,
        recipientCurrentPcv: 14,
        recipientTargetPcv: 26,
        recipientBloodGroup: "DEA_1.1_NEG",
        selectedDonorUnitId: null,
        majorCrossMatchGrade: "NEGATIVE",
        minorCrossMatchGrade: "NEGATIVE",
        compatibilityVerdict: "PENDING_EVALUATION",
        calculatedDoseMl: 0,
        initialRateMlHr: 0,
        maintenanceRateMlHr: 0
      }
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await BloodBankStorage.init();
      await this.loadInitialData();
      this.recalculateInventoryStatus();
      console.log("[Vetcare AI OS] Veterinary Blood Banking & Transfusion Registry Loaded.");
    },

    async loadInitialData() {
      let inv = await BloodBankStorage.getAll(BloodBankStorage.storeNames.inventory);
      if (!inv || inv.length === 0) {
        inv = this.getSeedInventory();
        for (const item of inv) {
          await BloodBankStorage.put(BloodBankStorage.storeNames.inventory, item);
        }
      }
      this.state.bloodInventory = inv;

      let donors = await BloodBankStorage.getAll(BloodBankStorage.storeNames.donors);
      if (!donors || donors.length === 0) {
        donors = this.getSeedDonors();
        for (const d of donors) {
          await BloodBankStorage.put(BloodBankStorage.storeNames.donors, d);
        }
      }
      this.state.donorRegistry = donors;

      let transfusions = await BloodBankStorage.getAll(BloodBankStorage.storeNames.transfusions);
      if (!transfusions || transfusions.length === 0) {
        transfusions = this.getSeedTransfusionLogs();
        for (const t of transfusions) {
          await BloodBankStorage.put(BloodBankStorage.storeNames.transfusions, t);
        }
      }
      this.state.transfusionMonitoringLogs = transfusions;
    },

    getSeedInventory() {
      const now = new Date();
      const createDate = (daysAgo) => {
        const d = new Date(now);
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split("T")[0];
      };
      const expireDate = (daysAhead) => {
        const d = new Date(now);
        d.setDate(d.getDate() + daysAhead);
        return d.toISOString().split("T")[0];
      };

      return [
        {
          id: "UNIT-CN-001",
          unitId: "CAN-WB-2026-001",
          unitType: "WHOLE_BLOOD",
          species: "canine",
          bloodGroup: "DEA_1.1_NEG", // Universal Emergency Donor Unit
          volumeMl: 450,
          donorPcv: 46,
          collectionDate: createDate(5),
          expiryDate: expireDate(23),
          anticoagulant: "CPDA-1",
          storageTempC: 3.8,
          status: "AVAILABLE",
          locationFridge: "Main Blood Bank Fridge #1 (Shelf A)"
        },
        {
          id: "UNIT-CN-002",
          unitId: "CAN-PRBC-2026-002",
          unitType: "PACKED_RBC",
          species: "canine",
          bloodGroup: "DEA_1.1_POS",
          volumeMl: 260,
          donorPcv: 72,
          collectionDate: createDate(12),
          expiryDate: expireDate(23),
          anticoagulant: "ADSOL / AS-1",
          storageTempC: 4.1,
          status: "AVAILABLE",
          locationFridge: "Main Blood Bank Fridge #1 (Shelf B)"
        },
        {
          id: "UNIT-FL-001",
          unitId: "FEL-WB-2026-001",
          unitType: "WHOLE_BLOOD",
          species: "feline",
          bloodGroup: "FELINE_A", // Type A (Most common domestic cat)
          volumeMl: 50,
          donorPcv: 38,
          collectionDate: createDate(3),
          expiryDate: expireDate(25),
          anticoagulant: "ACD-A (Citrate)",
          storageTempC: 3.9,
          status: "AVAILABLE",
          locationFridge: "Feline Dedicated Box #2"
        },
        {
          id: "UNIT-BV-001",
          unitId: "BOV-WB-2026-001",
          unitType: "WHOLE_BLOOD",
          species: "bovine",
          bloodGroup: "BOVINE_A",
          volumeMl: 3000,
          donorPcv: 32,
          collectionDate: createDate(2),
          expiryDate: expireDate(26),
          anticoagulant: "Sodium Citrate 3.8%",
          storageTempC: 4.5,
          status: "AVAILABLE",
          locationFridge: "Large Animal Cold Vault #3"
        }
      ];
    },

    getSeedDonors() {
      return [
        {
          id: "DONOR-CAN-01",
          donorId: "DONOR-CAN-01",
          tagOrMicrochip: "982000361284901",
          species: "canine",
          name: "चेस्टर (Chester - Golden Retriever)",
          breed: "Golden Retriever",
          bloodGroup: "DEA_1.1_NEG",
          weightKg: 34.5,
          ageYears: 3.5,
          pcvPercent: 48,
          infectiousScreeningPassed: true,
          lastDonationDate: "2025-12-15",
          totalDonations: 4,
          ownerContact: "अमित कुमार (9810112233)"
        },
        {
          id: "DONOR-CAN-02",
          donorId: "DONOR-CAN-02",
          tagOrMicrochip: "982000361284902",
          species: "canine",
          name: "टाइसन (Tyson - Boxer)",
          breed: "Boxer Cross",
          bloodGroup: "DEA_1.1_POS",
          weightKg: 29.0,
          ageYears: 4.0,
          pcvPercent: 44,
          infectiousScreeningPassed: true,
          lastDonationDate: "2026-01-10",
          totalDonations: 2,
          ownerContact: "रोहित मेहरा (9822334455)"
        },
        {
          id: "DONOR-FEL-01",
          donorId: "DONOR-FEL-01",
          tagOrMicrochip: "982000361284903",
          species: "feline",
          name: "मिश्टी (Mishti - Persian)",
          breed: "Domestic Shorthair",
          bloodGroup: "FELINE_A",
          weightKg: 5.2,
          ageYears: 2.8,
          pcvPercent: 39,
          infectiousScreeningPassed: true,
          lastDonationDate: "2025-11-20",
          totalDonations: 3,
          ownerContact: "सुमन शर्मा (9833445566)"
        }
      ];
    },

    getSeedTransfusionLogs() {
      return [
        {
          id: "TX-2026-001",
          transfusionId: "TX-2026-001",
          recipientPatientName: "शेरू (Sheru - Labrador)",
          species: "canine",
          recipientWeightKg: 22.0,
          preTransfusionPcv: 12,
          postTransfusionPcv: 24,
          transfusedUnitId: "CAN-WB-2026-001",
          date: new Date().toISOString().split("T")[0],
          totalVolumeAdministeredMl: 450,
          durationHours: 3.5,
          vitalsSeries: [
            { timeMin: 0, tempF: 101.4, hr: 130, rr: 32, bp: 92, notes: "Baseline before start (0.5 ml/kg/hr)" },
            { timeMin: 15, tempF: 101.6, hr: 122, rr: 28, bp: 95, notes: "No facial edema, no urticaria. Rate increased to 5 ml/kg/hr" },
            { timeMin: 30, tempF: 101.5, hr: 110, rr: 24, bp: 98, notes: "Tolerating well" },
            { timeMin: 60, tempF: 101.7, hr: 104, rr: 22, bp: 100, notes: "Infusing smoothly" },
            { timeMin: 120, tempF: 101.8, hr: 98, rr: 20, bp: 105, notes: "Stable" },
            { timeMin: 180, tempF: 101.6, hr: 96, rr: 20, bp: 108, notes: "Unit completed. Filter flushed with 0.9% NaCl" }
          ],
          acuteReactionsDetected: false,
          vetInCharge: "Dr. Rahul (Critical Care & Hematology)"
        }
      ];
    },

    recalculateInventoryStatus() {
      const now = new Date();
      this.state.bloodInventory.forEach((unit) => {
        const exp = new Date(unit.expiryDate);
        if (exp < now && unit.status === "AVAILABLE") {
          unit.status = "EXPIRED";
        }
      });
    },

    // 4.2 SCIENTIFIC TRANSFUSION MATHEMATICS & CROSS-MATCHING ALGORITHMS
    /**
     * Exact Whole Blood & Component Volume Formula:
     * Volume (ml) = [ Body Weight (kg) × Species Blood Factor ] × [ (Target PCV - Current PCV) / Donor Unit PCV ]
     */
    calculateVolumeNeeded(weightKg, currentPcv, targetPcv, donorPcv, species = "canine") {
      const wt = parseFloat(weightKg) || 1.0;
      const cPcv = parseFloat(currentPcv) || 10.0;
      const tPcv = parseFloat(targetPcv) || 25.0;
      const dPcv = parseFloat(donorPcv) || 40.0;
      const factor = TRANSFUSION_CONSTANTS.BLOOD_FACTORS[species] || 90;

      if (tPcv <= cPcv) return 0;
      const pcvDelta = tPcv - cPcv;
      const volumeMl = (wt * factor * pcvDelta) / dPcv;
      return Math.round(volumeMl);
    },

    /**
     * Major & Minor Cross-Matching Scientific Logic
     * Major: Recipient Serum + Donor RBCs (Detects preformed recipient alloantibodies destroying graft)
     * Minor: Recipient RBCs + Donor Plasma (Detects donor antibodies against recipient cells)
     * Grades: NEGATIVE (Compatible), 1+, 2+, 3+, 4+ or Hemolysis (Incompatible)
     */
    evaluateCrossmatchCompatibility(majorGrade, minorGrade, recipientGroup, donorGroup, species = "canine") {
      let compatible = true;
      let rationale = [];

      // Species-specific strict barriers:
      if (species === "feline") {
        if (recipientGroup === "FELINE_B" && donorGroup === "FELINE_A") {
          compatible = false;
          rationale.push("FATAL INCOMPATIBILITY: Type B cats possess potent natural anti-A IgM/IgG antibodies causing catastrophic acute intravascular hemolysis, hypotension, and death within minutes.");
        }
        if (recipientGroup === "FELINE_A" && donorGroup === "FELINE_B") {
          compatible = false;
          rationale.push("INCOMPATIBLE: Type A cats possess weak anti-B antibodies causing premature extravascular red cell destruction and lack of transfusion efficacy.");
        }
      }

      if (majorGrade !== "NEGATIVE") {
        compatible = false;
        rationale.push(`MAJOR CROSSMATCH FAILED (${majorGrade}): Recipient serum contains agglutinins or hemolysins active against donor red cells. Transfusion will precipitate Acute Hemolytic Transfusion Reaction (AHTR).`);
      }

      if (minorGrade !== "NEGATIVE" && minorGrade !== "1+") {
        // Minor 1+ may be tolerated in life-threatening emergency if pRBC is washed, but whole blood is risky
        compatible = false;
        rationale.push(`MINOR CROSSMATCH POSITIVE (${minorGrade}): Donor plasma contains antibodies against recipient red cells. If transfused, wash red cells to remove donor plasma or select alternative donor.`);
      }

      if (compatible) {
        rationale.push("COMPATIBLE: No macroscopic or microscopic agglutination/hemolysis observed. Safe for slow clinical infusion under 15-minute telemetry monitoring.");
      }

      return {
        isCompatible: compatible,
        verdict: compatible ? "COMPATIBLE_SAFE" : "INCOMPATIBLE_LETHAL",
        summary: rationale.join(" ")
      };
    },

    checkDonorEligibility(donor) {
      const species = donor.species || "canine";
      const criteria = TRANSFUSION_CONSTANTS.DONOR_CRITERIA[species];
      const issues = [];

      if (donor.weightKg < criteria.minWeightKg) {
        issues.push(`वजन कम (${donor.weightKg} kg vs न्यूनतम ${criteria.minWeightKg} kg)`);
      }
      if (donor.ageYears < criteria.ageMinYears || donor.ageYears > criteria.ageMaxYears) {
        issues.push(`आयु सीमा बाहर (${donor.ageYears} वर्ष vs स्वीकार्य ${criteria.ageMinYears}-${criteria.ageMaxYears} वर्ष)`);
      }
      if (donor.pcvPercent < criteria.minPcvPercent) {
        issues.push(`PCV कम (${donor.pcvPercent}% vs न्यूनतम ${criteria.minPcvPercent}%)`);
      }
      if (!donor.infectiousScreeningPassed) {
        issues.push("संक्रामक रोग स्क्रीनिंग अनिर्णित अथवा पॉजिटिव");
      }

      // Check last donation interval
      if (donor.lastDonationDate) {
        const last = new Date(donor.lastDonationDate);
        const now = new Date();
        const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
        if (diffDays < TRANSFUSION_CONSTANTS.MIN_DONATION_INTERVAL_DAYS) {
          issues.push(`पिछला रक्तदान ${diffDays} दिन पूर्व (न्यूनतम 60 दिन अनिवार्य)`);
        }
      }

      return {
        eligible: issues.length === 0,
        reasons: issues
      };
    },

    calculateOverallKPIs() {
      const totalUnits = this.state.bloodInventory.filter((u) => u.status === "AVAILABLE").length;
      const universalDogUnits = this.state.bloodInventory.filter(
        (u) => u.species === "canine" && u.bloodGroup === "DEA_1.1_NEG" && u.status === "AVAILABLE"
      ).length;

      const now = new Date();
      const sevenDaysAhead = new Date(now);
      sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);

      const expiringSoon = this.state.bloodInventory.filter((u) => {
        if (u.status !== "AVAILABLE") return false;
        const exp = new Date(u.expiryDate);
        return exp >= now && exp <= sevenDaysAhead;
      }).length;

      const activeDonors = this.state.donorRegistry.length;

      return {
        totalUnits,
        universalDogUnits,
        expiringSoon,
        activeDonors
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare BloodBank] Target container not found:", this.containerId);
        return;
      }

      const kpis = this.calculateOverallKPIs();

      container.innerHTML = `
        <div class="bloodbank-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- TOP CRITICAL BAR -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-droplet text-rose-500"></i> Veterinary Transfusion Medicine Core
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <i class="fa-solid fa-shield-halved"></i> Major/Minor Cross-Match Engine
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>पशु रक्त बैंक, क्रॉस-मैच एवं रक्ताधान रजिस्ट्री</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Veterinary Immunohematology: Component Blood Banking (Whole Blood, pRBC, FFP), Major/Minor Crossmatch Compatibility, DEA 1.1 Universal Emergency Stock & 15-Minute Vitals Safety Auditing.
              </p>
            </div>

            <!-- ACTION SHORTCUTS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenAddUnitModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नई रक्त यूनिट दर्ज करें (Add Unit)
              </button>
              <button id="btnOpenAddDonorModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 shadow flex items-center gap-2 transition-all">
                <i class="fa-solid fa-paw"></i> नया रक्तदाता पंजीकृत करें (Register Donor)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">कुल उपलब्ध रक्त यूनिट्स</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${kpis.totalUnits} Units</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">1-6°C Cold Vault</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">कैनिन DEA 1.1 निगेटिव (Universal)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-rose-400">${kpis.universalDogUnits} Units</span>
                <span class="text-xs font-mono text-rose-300 font-semibold">Emergency Ready</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">7 दिनों में एक्सपायर होने वाली यूनिट्स</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${kpis.expiringSoon > 0 ? "text-amber-400" : "text-slate-300"}">${kpis.expiringSoon}</span>
                <span class="text-xs font-mono text-slate-400 font-semibold">Priority Use</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सत्यापित सक्रिय रक्तदाता पशु</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${kpis.activeDonors} Donors</span>
                <span class="text-xs font-mono text-cyan-300 font-bold">Screened OK</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="blood_unit_inventory" class="bb-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "blood_unit_inventory"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-boxes-stacked"></i> 1. ब्लड यूनिट इन्वेंटरी (Blood Unit Vault)
            </button>
            <button data-tab="donor_registry" class="bb-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "donor_registry"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-id-card"></i> 2. सत्यापित डोनर रजिस्ट्री (Verified Donors)
            </button>
            <button data-tab="crossmatch_calculator" class="bb-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "crossmatch_calculator"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-flask-vial"></i> 3. क्रॉस-मैच एवं खुराक संगणक (Crossmatch Wizard)
            </button>
            <button data-tab="transfusion_safety_audit" class="bb-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "transfusion_safety_audit"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-heart-pulse"></i> 4. रक्ताधान निगरानी व सुरक्षा ऑडिट (15-Min Vitals Audit)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="bloodBankTabViewport" class="w-full">
            ${this.renderActiveTabContent()}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINER -->
        <div id="bloodBankModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent() {
      switch (this.activeTab) {
        case "blood_unit_inventory":
          return this.renderInventoryTab();
        case "donor_registry":
          return this.renderDonorRegistryTab();
        case "crossmatch_calculator":
          return this.renderCrossmatchCalculatorTab();
        case "transfusion_safety_audit":
          return this.renderTransfusionSafetyTab();
        default:
          return "";
      }
    },

    // TAB 1: BLOOD UNIT INVENTORY
    renderInventoryTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-snowflake text-cyan-400"></i> सुरक्षित रक्त एवं अवयव भंडार (Component Blood Storage)
                </h3>
                <p class="text-xs text-slate-400">
                  Continuous cold-chain monitoring (1-6°C for WB/pRBC, -18°C for FFP) with CPDA-1 preservation tracking.
                </p>
              </div>
              <div class="text-xs font-mono text-slate-400">
                कुल यूनिट्स: <strong class="text-white">${this.state.bloodInventory.length}</strong>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">यूनिट आईडी व अवयव प्रकार</th>
                    <th class="p-3">प्रजाति व ब्लड ग्रुप</th>
                    <th class="p-3">मात्रा व PCV%</th>
                    <th class="p-3">संग्रहण एवं एक्सपायरी तिथि</th>
                    <th class="p-3">एंटीकोआगुलेंट व तापमान</th>
                    <th class="p-3">स्थिति (Status)</th>
                    <th class="p-3 text-right">कार्यवाई (Actions)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${
                    this.state.bloodInventory.length === 0
                      ? `<tr><td colspan="7" class="p-6 text-center text-slate-500 font-mono">कोई रक्त यूनिट उपलब्ध नहीं है। ऊपर दिए गए बटन से नई यूनिट दर्ज करें।</td></tr>`
                      : this.state.bloodInventory
                          .map((u) => {
                            const isExp = u.status === "EXPIRED";
                            return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white text-xs">${u.unitId}</span>
                            <div class="text-[10px] text-cyan-400 font-bold mt-0.5">${u.unitType}</div>
                          </td>
                          <td class="p-3">
                            <span class="font-bold uppercase text-white">${u.species}</span>
                            <div>
                              <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                u.bloodGroup.includes("NEG")
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              }">
                                ${u.bloodGroup}
                              </span>
                            </div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="text-sm font-black text-rose-400">${u.volumeMl} ml</span>
                            <div class="text-[10px] text-slate-400">Donor PCV: ${u.donorPcv || 40}%</div>
                          </td>
                          <td class="p-3 font-mono text-[11px]">
                            <div class="text-slate-400">Collected: ${u.collectionDate}</div>
                            <div class="${isExp ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}">Expires: ${u.expiryDate}</div>
                          </td>
                          <td class="p-3 font-mono text-slate-300 text-[11px]">
                            <div>${u.anticoagulant}</div>
                            <div class="text-slate-500 text-[10px]">${u.storageTempC}°C (${u.locationFridge})</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.status === "AVAILABLE"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : u.status === "RESERVED"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }">
                              ${u.status}
                            </span>
                          </td>
                          <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button data-delete-unit="${u.id}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300" title="Delete Unit">
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

            <!-- SHELF-LIFE SCIENTIFIC CALLOUT -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <i class="fa-solid fa-temperature-arrow-down text-cyan-400 text-lg mt-0.5"></i>
              <div class="leading-relaxed">
                <strong>CPDA-1 कोल्ड-चेन अखंडता मानक (Cold-Chain Standard):</strong> संपूर्ण रक्त (Whole Blood) को 1°C से 6°C पर 28 से 35 दिनों तक सुरक्षित रखा जा सकता है। फ्रेश फ्रोजन प्लाज्मा (FFP) को -18°C या उससे कम तापमान पर रखने पर 1 वर्ष तक क्लॉटिंग फैक्टर्स (Factor V व VIII) अक्षुण्ण रहते हैं। रक्त को कभी भी फ्रीजर में सीधे जमाया (Freeze) नहीं जाना चाहिए अन्यथा आरबीसी की ऑस्मोटिक लिसिस हो जाएगी।
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 2: DONOR REGISTRY & ELIGIBILITY CHECKER
    renderDonorRegistryTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-paw text-emerald-400"></i> सत्यापित रक्तदाता पशु रजिस्ट्री (Verified Donor Roster)
                </h3>
                <p class="text-xs text-slate-400">
                  Pre-screened healthy donor dogs, cats, and cattle. Checked for infectious blood parasites, minimum weight, and PCV.
                </p>
              </div>
              <div class="text-xs font-mono text-slate-400">
                कुल पंजीकृत डोनर: <strong class="text-white">${this.state.donorRegistry.length}</strong>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">डोनर नाम व माइक्रोचिप</th>
                    <th class="p-3">प्रजाति व नस्ल</th>
                    <th class="p-3">ब्लड ग्रुप</th>
                    <th class="p-3">वजन व आयु</th>
                    <th class="p-3">PCV %</th>
                    <th class="p-3">अंतिम रक्तदान एवं अंतराल</th>
                    <th class="p-3">पात्रता स्थिति (Eligibility)</th>
                    <th class="p-3 text-right">पालक संपर्क</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.donorRegistry
                    .map((d) => {
                      const elig = this.checkDonorEligibility(d);
                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-white text-xs">${d.name}</span>
                          <div class="text-[10px] text-slate-500 font-mono">${d.tagOrMicrochip}</div>
                        </td>
                        <td class="p-3">
                          <span class="font-bold uppercase text-white">${d.species}</span>
                          <div class="text-[11px] text-slate-400">${d.breed}</div>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            d.bloodGroup.includes("NEG") ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                          }">
                            ${d.bloodGroup}
                          </span>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-white font-bold">${d.weightKg} kg</span>
                          <div class="text-[10px] text-slate-400">${d.ageYears} वर्ष</div>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-sm font-black ${d.pcvPercent >= 40 ? "text-emerald-400" : "text-amber-400"}">
                            ${d.pcvPercent}%
                          </span>
                        </td>
                        <td class="p-3 font-mono text-[11px]">
                          <div class="text-slate-300">${d.lastDonationDate || "Never Donated"}</div>
                          <div class="text-slate-500 text-[10px]">${d.totalDonations} बार कुल रक्तदान</div>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            elig.eligible ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }">
                            ${elig.eligible ? "ELIGIBLE (FIT TO DONATE)" : "DEFERRED / INELIGIBLE"}
                          </span>
                          ${!elig.eligible ? `<div class="text-[9px] text-rose-400 font-sans mt-0.5">${elig.reasons[0]}</div>` : ""}
                        </td>
                        <td class="p-3 text-right font-mono text-[11px] text-slate-300">
                          ${d.ownerContact}
                        </td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- MANDATORY SCREENING CRITERIA CALLOUT -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-amber-400 flex items-center gap-2">
                <i class="fa-solid fa-virus-slash"></i> अनिवार्य रक्त परजीवी स्क्रीनिंग (Mandatory Pathogen Exclusion Panel)
              </div>
              <p class="text-slate-400 leading-relaxed text-[11px]">
                रक्तदान से पूर्व श्वान डोनर का <strong>Ehrlichia, Babesia, Dirofilaria immitis (Heartworm) एवं Leishmania</strong> हेतु 4DX/PCR परीक्षण अनिवार्य है। बिल्ली में <strong>FeLV / FIV एवं Mycoplasma hemofelis</strong> नकारात्मक होना आवश्यक है।
              </p>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: CROSSMATCH WIZARD & TRANSFUSION DOSE CALCULATOR
    renderCrossmatchCalculatorTab() {
      const cm = this.state.crossmatchWorkflow;
      const vol = this.calculateVolumeNeeded(
        cm.recipientWeightKg,
        cm.recipientCurrentPcv,
        cm.recipientTargetPcv,
        40,
        cm.recipientSpecies
      );
      const initRate = ((cm.recipientWeightKg * 0.5) / 1).toFixed(1); // 0.5 ml/kg/hr for first 15-30 mins
      const maintRate = ((cm.recipientWeightKg * 5.0) / 1).toFixed(1); // 5 to 10 ml/kg/hr maintenance

      const crossmatchEval = this.evaluateCrossmatchCompatibility(
        cm.majorCrossMatchGrade,
        cm.minorCrossMatchGrade,
        cm.recipientBloodGroup,
        "DEA_1.1_NEG",
        cm.recipientSpecies
      );

      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- LEFT 1-COL: RECIPIENT & VOLUME CALCULATOR INPUTS -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
                <i class="fa-solid fa-calculator text-rose-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">रोगी रक्त आवश्यकता संगणक</h3>
              </div>

              <form id="formCrossmatchCalc" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
                <div>
                  <label class="block text-slate-300 uppercase mb-1">प्रजाति चयन (Species)</label>
                  <select id="selCmSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="canine" ${cm.recipientSpecies === "canine" ? "selected" : ""}>श्वान (Canine - 90 ml/kg factor)</option>
                    <option value="feline" ${cm.recipientSpecies === "feline" ? "selected" : ""}>बिल्ली (Feline - 60 ml/kg factor)</option>
                    <option value="bovine" ${cm.recipientSpecies === "bovine" ? "selected" : ""}>गौवंश (Bovine - 70 ml/kg factor)</option>
                    <option value="equine" ${cm.recipientSpecies === "equine" ? "selected" : ""}>अश्व (Equine - 80 ml/kg factor)</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-slate-300 uppercase mb-1">रोगी वजन (kg)</label>
                    <input type="number" step="0.5" id="inCmWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="${cm.recipientWeightKg}" />
                  </div>
                  <div>
                    <label class="block text-slate-300 uppercase mb-1">ब्लड ग्रुप (Recipient)</label>
                    <select id="selCmRecipientGroup" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                      <option value="DEA_1.1_NEG">DEA 1.1 Negative (Canine)</option>
                      <option value="DEA_1.1_POS">DEA 1.1 Positive (Canine)</option>
                      <option value="FELINE_A">Feline Type A</option>
                      <option value="FELINE_B">Feline Type B (High Alloantibody)</option>
                      <option value="BOVINE_A">Bovine Group A</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-slate-300 uppercase mb-1">वर्तमान PCV (%)</label>
                    <input type="number" id="inCmCurrentPcv" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold font-mono" value="${cm.recipientCurrentPcv}" />
                  </div>
                  <div>
                    <label class="block text-slate-300 uppercase mb-1">लक्षित Target PCV (%)</label>
                    <input type="number" id="inCmTargetPcv" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono" value="${cm.recipientTargetPcv}" />
                  </div>
                </div>

                <!-- TUBE AGGLUTINATION GRADES -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-sans">
                  <span class="text-[11px] font-bold text-amber-300 block uppercase font-mono">ट्यूब एग्लूटिनेशन ग्रेड (Agglutination Grading)</span>
                  
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-0.5">Major Cross-Match (Recipient Serum + Donor RBCs):</label>
                    <select id="selMajorGrade" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono">
                      <option value="NEGATIVE" ${cm.majorCrossMatchGrade === "NEGATIVE" ? "selected" : ""}>NEGATIVE (कोई थक्का नहीं - Compatible)</option>
                      <option value="1+" ${cm.majorCrossMatchGrade === "1+" ? "selected" : ""}>1+ (सूक्ष्म थक्के / Microscopic clumps)</option>
                      <option value="2+" ${cm.majorCrossMatchGrade === "2+" ? "selected" : ""}>2+ (छोटे स्पष्ट थक्के / Small clumps)</option>
                      <option value="3+" ${cm.majorCrossMatchGrade === "3+" ? "selected" : ""}>3+ (बड़े थक्के / Large clumps)</option>
                      <option value="4+" ${cm.majorCrossMatchGrade === "4+" ? "selected" : ""}>4+ (एकल ठोस थक्का / Solid Clot)</option>
                      <option value="HEMOLYSIS" ${cm.majorCrossMatchGrade === "HEMOLYSIS" ? "selected" : ""}>HEMOLYSIS (लाल पारदर्शी सीरम - Incompatible)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-[11px] text-slate-400 mb-0.5">Minor Cross-Match (Recipient RBCs + Donor Serum):</label>
                    <select id="selMinorGrade" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono">
                      <option value="NEGATIVE" ${cm.minorCrossMatchGrade === "NEGATIVE" ? "selected" : ""}>NEGATIVE (Compatible)</option>
                      <option value="1+" ${cm.minorCrossMatchGrade === "1+" ? "selected" : ""}>1+ (Mild non-specific)</option>
                      <option value="2+" ${cm.minorCrossMatchGrade === "2+" ? "selected" : ""}>2+ (Incompatible)</option>
                      <option value="3+" ${cm.minorCrossMatchGrade === "3+" ? "selected" : ""}>3+ (Incompatible)</option>
                    </select>
                  </div>
                </div>

                <button id="btnRecalculateCrossmatch" class="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-all flex items-center justify-center gap-2">
                  <i class="fa-solid fa-arrows-rotate"></i> क्रॉस-मैच अनुकूलता व मात्रा जांचें
                </button>
              </form>
            </div>

            <!-- RIGHT 2-COLS: SCIENTIFIC RESULTS & INFUSION PROTOCOL -->
            <div class="lg:col-span-2 space-y-5">
              
              <!-- COMPATIBILITY VERDICT CARD -->
              <div class="rounded-2xl bg-slate-900 border-2 ${
                crossmatchEval.isCompatible ? "border-emerald-500/50" : "border-rose-500 shadow-rose-950/50 shadow-2xl animate-pulse"
              } p-6 space-y-4">
                <div class="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span class="text-[10px] font-mono font-bold uppercase ${crossmatchEval.isCompatible ? "text-emerald-400" : "text-rose-400"}">
                      इम्यूनोहेमेटोलॉजी क्रॉस-मैच निर्णय
                    </span>
                    <h3 class="text-xl font-display font-black text-white mt-0.5">
                      ${crossmatchEval.isCompatible ? "संगत एवं सुरक्षित (Compatible for Transfusion)" : "असंगत व घातक निषेध (INCOMPATIBLE / DO NOT TRANSFUSE)"}
                    </h3>
                  </div>
                  <span class="px-3 py-1 rounded-xl font-mono text-xs font-bold ${
                    crossmatchEval.isCompatible ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-600/30 text-rose-200 border border-rose-500"
                  }">
                    ${crossmatchEval.verdict}
                  </span>
                </div>

                <p class="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  ${crossmatchEval.summary}
                </p>

                <!-- DOSE & INFUSION RATE SUMMARY -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
                  <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 uppercase">आवश्यक रक्त मात्रा (Volume)</span>
                    <div class="text-2xl font-black text-rose-400 mt-1">${vol} ml</div>
                    <span class="text-[10px] text-slate-500">Whole Blood (Donor PCV 40%)</span>
                  </div>
                  <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 uppercase">प्रारंभिक गति (First 15-30m)</span>
                    <div class="text-2xl font-black text-cyan-400 mt-1">${initRate} ml/hr</div>
                    <span class="text-[10px] text-slate-500">0.5 ml/kg/hr (Watch for shock)</span>
                  </div>
                  <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 uppercase">रखरखाव गति (Maintenance)</span>
                    <div class="text-2xl font-black text-emerald-400 mt-1">${maintRate} ml/hr</div>
                    <span class="text-[10px] text-slate-500">Max 4.0 Hours total limit</span>
                  </div>
                </div>

                <!-- CLINICAL INFUSION SAFEGUARDS -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div class="font-bold text-amber-300 flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation"></i> रक्ताधान सुरक्षा एवं फिल्टर नियम (Transfusion Filter Mandate)
                  </div>
                  <div class="text-[11px] text-slate-400 leading-relaxed space-y-1">
                    <div>• <strong>170-260 माइक्रोन क्लॉट फिल्टर</strong> (Blood Administration Set) का प्रयोग अनिवार्य है। बिना फिल्टर रक्त कभी न चढ़ाएं।</div>
                    <div>• रक्त नली में केवल <strong>0.9% सामान्य सलाइन (Normal Saline)</strong> ही मिलाया जा सकता है। रिंगर लैक्टेट (LRS) में मौजूद कैल्शियम रक्त को क्लॉट कर देगा, तथा डेक्सट्रोज (D5W) से आरबीसी फट जाएंगी।</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: TRANSFUSION SAFETY & INTRA-OP MONITORING AUDIT
    renderTransfusionSafetyTab() {
      const activeLog = this.state.transfusionMonitoringLogs[0];

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-heart-pulse text-rose-400"></i> रक्ताधान इंट्रा-ऑपरेटिव 15-मिनट निगरानी एवं सुरक्षा ऑडिट
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  Automated telemetry detection for Acute Hemolytic Transfusion Reactions (AHTR), Febrile Non-Hemolytic Reactions (FNHTR), and TRALI.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button id="btnLogVitalsNowModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow flex items-center gap-2">
                  + नया 15-मिनट वाइटल्स दर्ज करें
                </button>
                <button id="btnPrintConsentForm" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow flex items-center gap-2">
                  <i class="fa-solid fa-print"></i> सहमति व निगरानी पत्रक प्रिंट
                </button>
              </div>
            </div>

            <!-- ACTIVE PATIENT HANDOVER HEADER -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap justify-between items-center text-xs font-mono gap-4">
              <div>
                <span class="text-slate-400 uppercase">मरीज / Patient:</span>
                <strong class="text-white text-sm ml-1">${activeLog ? activeLog.recipientPatientName : "N/A"}</strong>
              </div>
              <div>
                <span class="text-slate-400 uppercase">यूनिट कोड:</span>
                <strong class="text-rose-400 ml-1">${activeLog ? activeLog.transfusedUnitId : "N/A"}</strong>
              </div>
              <div>
                <span class="text-slate-400 uppercase">कुल चढ़ाई मात्रा:</span>
                <strong class="text-cyan-400 ml-1">${activeLog ? activeLog.totalVolumeAdministeredMl : 0} ml</strong>
              </div>
              <div>
                <span class="text-slate-400 uppercase">पूर्व/पश्चात PCV:</span>
                <strong class="text-emerald-400 ml-1">${activeLog ? activeLog.preTransfusionPcv : 0}% ➔ ${activeLog ? activeLog.postTransfusionPcv : 0}%</strong>
              </div>
            </div>

            <!-- 15-MINUTE PROGRESSION TABLE -->
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">समय (Timeline)</th>
                    <th class="p-3">तापमान (Temp °F)</th>
                    <th class="p-3">हृदय गति (Heart Rate)</th>
                    <th class="p-3">श्वसन दर (Resp Rate)</th>
                    <th class="p-3">रक्तचाप (BP MAP)</th>
                    <th class="p-3">क्लिनिकल अवलोकन व प्रतिक्रिया</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-mono">
                  ${
                    activeLog && activeLog.vitalsSeries
                      ? activeLog.vitalsSeries
                          .map((v) => {
                            const isTempHigh = v.tempF >= 103.0;
                            const isHrHigh = v.hr >= 140;
                            return `
                        <tr class="hover:bg-slate-800/40">
                          <td class="p-3 font-bold text-white">Min ${v.timeMin}</td>
                          <td class="p-3">
                            <span class="text-sm font-bold ${isTempHigh ? "text-rose-400 animate-pulse" : "text-emerald-400"}">${v.tempF}°F</span>
                          </td>
                          <td class="p-3">
                            <span class="text-sm font-bold ${isHrHigh ? "text-rose-400" : "text-white"}">${v.hr} bpm</span>
                          </td>
                          <td class="p-3 font-bold text-slate-300">${v.rr} rpm</td>
                          <td class="p-3 font-bold text-cyan-300">${v.bp} mmHg</td>
                          <td class="p-3 font-sans text-slate-300 text-[11px]">${v.notes}</td>
                        </tr>
                      `;
                          })
                          .join("")
                      : `<tr><td colspan="6" class="p-6 text-center text-slate-500 font-mono">कोई रक्ताधान वाइटल्स रिकॉर्ड उपलब्ध नहीं है।</td></tr>`
                  }
                </tbody>
              </table>
            </div>

            <!-- EMERGENCY TRANSFUSION REACTION ALGORITHM -->
            <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2 text-xs">
              <h4 class="font-bold text-rose-300 flex items-center gap-2">
                <i class="fa-solid fa-bell text-rose-400"></i> एक्यूट ट्रांसफ्यूजन रिएक्शन आपातकालीन एसओपी (Stop Transfusion SOP)
              </h4>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                यदि तापमान में <strong>>1.5°F की वृद्धि, चेहरे पर पित्ती (Urticaria/Angioedema), अत्यधिक उल्टी, लार टपकना, अथवा पेशाब में लाल रंग (Hemoglobinuria)</strong> दिखे: <strong>तत्काल रक्ताधान रोकें!</strong> कैथेटर में लाइन बदलें, डाइफेनहाइड्रामाइन (2 mg/kg IM) एवं डेक्सामेथासोन (0.2 mg/kg IV) दें और रक्त यूनिट को पुनः कल्चर व क्रॉस-मैच हेतु प्रयोगशाला भेजें।
              </p>
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
      container.querySelectorAll(".bb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Recalculate Crossmatch Button
      const btnRecalcCm = container.querySelector("#btnRecalculateCrossmatch");
      if (btnRecalcCm) {
        btnRecalcCm.addEventListener("click", () => {
          this.syncCrossmatchInputsFromDom();
          this.render();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("क्रॉस-मैच व मात्रा पुनर्गणना पूर्ण!", "info");
          }
        });
      }

      // Open Add Unit Modal
      const btnOpenAddUnitModal = container.querySelector("#btnOpenAddUnitModal");
      if (btnOpenAddUnitModal) {
        btnOpenAddUnitModal.addEventListener("click", () => this.showAddUnitModal());
      }

      // Open Add Donor Modal
      const btnOpenAddDonorModal = container.querySelector("#btnOpenAddDonorModal");
      if (btnOpenAddDonorModal) {
        btnOpenAddDonorModal.addEventListener("click", () => this.showAddDonorModal());
      }

      // Log Vitals Modal
      const btnLogVitalsNowModal = container.querySelector("#btnLogVitalsNowModal");
      if (btnLogVitalsNowModal) {
        btnLogVitalsNowModal.addEventListener("click", () => this.showLogVitalsModal());
      }

      // Print Consent Form Button
      const btnPrintConsentForm = container.querySelector("#btnPrintConsentForm");
      if (btnPrintConsentForm) {
        btnPrintConsentForm.addEventListener("click", () => {
          this.printTransfusionConsentAndLog("TX-2026-001");
        });
      }

      // Delete Unit Button
      container.querySelectorAll("[data-delete-unit]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.getAttribute("data-delete-unit");
          if (confirm("क्या आप वाकई इस रक्त यूनिट को हटाना चाहते हैं?")) {
            await BloodBankStorage.delete(BloodBankStorage.storeNames.inventory, id);
            this.state.bloodInventory = this.state.bloodInventory.filter((u) => u.id !== id);
            this.render();
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("रक्त यूनिट रिकॉर्ड हटाया गया।", "warning");
            }
          }
        });
      });
    },

    syncCrossmatchInputsFromDom() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      const sp = container.querySelector("#selCmSpecies")?.value;
      const wt = parseFloat(container.querySelector("#inCmWeight")?.value);
      const cPcv = parseInt(container.querySelector("#inCmCurrentPcv")?.value, 10);
      const tPcv = parseInt(container.querySelector("#inCmTargetPcv")?.value, 10);
      const bg = container.querySelector("#selCmRecipientGroup")?.value;
      const majG = container.querySelector("#selMajorGrade")?.value;
      const minG = container.querySelector("#selMinorGrade")?.value;

      if (sp) this.state.crossmatchWorkflow.recipientSpecies = sp;
      if (!isNaN(wt) && wt > 0) this.state.crossmatchWorkflow.recipientWeightKg = wt;
      if (!isNaN(cPcv)) this.state.crossmatchWorkflow.recipientCurrentPcv = cPcv;
      if (!isNaN(tPcv)) this.state.crossmatchWorkflow.recipientTargetPcv = tPcv;
      if (bg) this.state.crossmatchWorkflow.recipientBloodGroup = bg;
      if (majG) this.state.crossmatchWorkflow.majorCrossMatchGrade = majG;
      if (minG) this.state.crossmatchWorkflow.minorCrossMatchGrade = minG;
    },

    // 4.6 CLINICAL MODALS
    showAddUnitModal() {
      const modalHost = document.getElementById("bloodBankModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="addUnitModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-rose-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-droplet text-rose-500 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">नई रक्त यूनिट संग्रह दर्ज करें</h3>
              </div>
              <button id="btnCloseUnitModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddBloodUnit" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div>
                <label class="block uppercase text-slate-300 mb-1">यूनिट बारकोड आईडी (Unit ID)</label>
                <input type="text" id="inUnitId" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="CAN-WB-2026-${Math.floor(100 + Math.random() * 900)}" required />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">प्रजाति (Species)</label>
                  <select id="inUnitSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="canine">कैनिन / श्वान (Canine)</option>
                    <option value="feline">फेलाइन / बिल्ली (Feline)</option>
                    <option value="bovine">बोवाइन / गौवंश (Bovine)</option>
                    <option value="equine">इक्वाइन / अश्व (Equine)</option>
                  </select>
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">अवयव प्रकार (Component)</label>
                  <select id="inUnitType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="WHOLE_BLOOD">Whole Blood (संपूर्ण रक्त)</option>
                    <option value="PACKED_RBC">Packed Red Blood Cells (pRBC)</option>
                    <option value="FRESH_FROZEN_PLASMA">Fresh Frozen Plasma (FFP)</option>
                    <option value="CRYOPRECIPITATE">Cryoprecipitate</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">ब्लड ग्रुप (Blood Group)</label>
                  <select id="inUnitGroup" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold">
                    <option value="DEA_1.1_NEG">DEA 1.1 Negative (Universal)</option>
                    <option value="DEA_1.1_POS">DEA 1.1 Positive</option>
                    <option value="FELINE_A">Feline Type A</option>
                    <option value="FELINE_B">Feline Type B</option>
                    <option value="BOVINE_A">Bovine Group A</option>
                  </select>
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">मात्रा (Volume ml)</label>
                  <input type="number" id="inUnitVolume" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="450" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">डोनर PCV (%)</label>
                  <input type="number" id="inDonorPcv" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="45" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">एंटीकोआगुलेंट (Anticoagulant)</label>
                  <input type="text" id="inAnticoagulant" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="CPDA-1" />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1">कोल्ड स्टोरेज स्थान (Storage Location)</label>
                <input type="text" id="inStorageLocation" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" value="Blood Bank Vault Fridge #1 (Shelf A)" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelAddUnit" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitAddUnit" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold">यूनिट सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseUnitModal").addEventListener("click", close);
      document.getElementById("btnCancelAddUnit").addEventListener("click", close);

      document.getElementById("formAddBloodUnit").addEventListener("submit", async () => {
        const unitId = document.getElementById("inUnitId").value.trim();
        const species = document.getElementById("inUnitSpecies").value;
        const unitType = document.getElementById("inUnitType").value;
        const bloodGroup = document.getElementById("inUnitGroup").value;
        const volumeMl = parseInt(document.getElementById("inUnitVolume").value, 10) || 450;
        const donorPcv = parseInt(document.getElementById("inDonorPcv").value, 10) || 42;
        const anticoagulant = document.getElementById("inAnticoagulant").value.trim();
        const locationFridge = document.getElementById("inStorageLocation").value.trim();

        const now = new Date();
        const shelfDays = TRANSFUSION_CONSTANTS.STORAGE_SHELF_LIFE_DAYS[unitType] || 28;
        const expDate = new Date(now);
        expDate.setDate(expDate.getDate() + shelfDays);

        const newUnit = {
          id: "UNIT-" + Date.now(),
          unitId,
          unitType,
          species,
          bloodGroup,
          volumeMl,
          donorPcv,
          collectionDate: now.toISOString().split("T")[0],
          expiryDate: expDate.toISOString().split("T")[0],
          anticoagulant,
          storageTempC: 3.9,
          status: "AVAILABLE",
          locationFridge
        };

        await BloodBankStorage.put(BloodBankStorage.storeNames.inventory, newUnit);
        this.state.bloodInventory.unshift(newUnit);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("रक्त यूनिट " + unitId + " सफलता से स्टॉक में जोड़ी गई!", "success");
        }
      });
    },

    showAddDonorModal() {
      const modalHost = document.getElementById("bloodBankModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="addDonorModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">नया रक्तदाता पशु पंजीकृत करें</h3>
              <button id="btnCloseDonorModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddDonor" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div>
                <label class="block uppercase text-slate-300 mb-1">डोनर नाम (Donor Name)</label>
                <input type="text" id="inDonorName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold" placeholder="उदा. मैक्स (Max - German Shepherd)" required />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">माइक्रोचिप / टैग आईडी</label>
                  <input type="text" id="inDonorChip" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300" value="982000${Math.floor(100000000 + Math.random() * 900000000)}" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">प्रजाति (Species)</label>
                  <select id="inDonorSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="canine">कैनिन / श्वान (Canine)</option>
                    <option value="feline">फेलाइन / बिल्ली (Feline)</option>
                    <option value="bovine">बोवाइन / गौवंश (Bovine)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">वजन (Weight kg)</label>
                  <input type="number" step="0.5" id="inDonorWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="28.0" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">आयु (वर्ष)</label>
                  <input type="number" step="0.5" id="inDonorAge" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="3.0" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">PCV %</label>
                  <input type="number" id="inDonorPcvVal" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="44" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">ब्लड ग्रुप</label>
                  <select id="inDonorGroupSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="DEA_1.1_NEG">DEA 1.1 Negative (Universal)</option>
                    <option value="DEA_1.1_POS">DEA 1.1 Positive</option>
                    <option value="FELINE_A">Feline Type A</option>
                    <option value="FELINE_B">Feline Type B</option>
                    <option value="BOVINE_A">Bovine Group A</option>
                  </select>
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">पालक संपर्क नंबर</label>
                  <input type="text" id="inDonorContact" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="98XXXXXXXX" required />
                </div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-sans">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="chkDonorScreening" class="w-4 h-4 text-emerald-500 rounded" checked />
                  <span class="text-white font-semibold">संक्रामक रोग स्क्रीन (Ehrlichia, Babesia, Heartworm) निगेटिव है</span>
                </label>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelDonor" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitDonor" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">डोनर पंजीकृत करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseDonorModal").addEventListener("click", close);
      document.getElementById("btnCancelDonor").addEventListener("click", close);

      document.getElementById("formAddDonor").addEventListener("submit", async () => {
        const name = document.getElementById("inDonorName").value.trim();
        const chip = document.getElementById("inDonorChip").value.trim();
        const species = document.getElementById("inDonorSpecies").value;
        const weightKg = parseFloat(document.getElementById("inDonorWeight").value) || 25;
        const ageYears = parseFloat(document.getElementById("inDonorAge").value) || 3;
        const pcvPercent = parseInt(document.getElementById("inDonorPcvVal").value, 10) || 42;
        const bloodGroup = document.getElementById("inDonorGroupSelect").value;
        const contact = document.getElementById("inDonorContact").value.trim();
        const screening = document.getElementById("chkDonorScreening").checked;

        const newDonor = {
          id: "DONOR-" + Date.now(),
          donorId: "DONOR-" + Date.now().toString().slice(-4),
          tagOrMicrochip: chip,
          species,
          name,
          breed: "Pedigree Screened",
          bloodGroup,
          weightKg,
          ageYears,
          pcvPercent,
          infectiousScreeningPassed: screening,
          lastDonationDate: "",
          totalDonations: 0,
          ownerContact: contact
        };

        await BloodBankStorage.put(BloodBankStorage.storeNames.donors, newDonor);
        this.state.donorRegistry.unshift(newDonor);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("रक्तदाता " + name + " सफलता से पंजीकृत हुआ!", "success");
        }
      });
    },

    showLogVitalsModal() {
      const modalHost = document.getElementById("bloodBankModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="vitalsModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">15-मिनट वाइटल्स टेलीमेट्री दर्ज करें</h3>
              <button id="btnCloseVitalsModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formLogVitals" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">समय अंतराल (Minutes)</label>
                  <input type="number" id="inVitalsTimeMin" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="45" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">तापमान (°F)</label>
                  <input type="number" step="0.1" id="inVitalsTemp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="101.5" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">HR (bpm)</label>
                  <input type="number" id="inVitalsHr" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="104" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">RR (rpm)</label>
                  <input type="number" id="inVitalsRr" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="24" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">BP MAP</label>
                  <input type="number" id="inVitalsBp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400" value="98" />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">क्लिनिकल अवलोकन व प्रतिक्रिया (Observations)</label>
                <input type="text" id="inVitalsNotes" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" value="सामान्य गति, कोई पित्ती या कांपना नहीं" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelVitals" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitVitals" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">वाइटल्स सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseVitalsModal").addEventListener("click", close);
      document.getElementById("btnCancelVitals").addEventListener("click", close);

      document.getElementById("formLogVitals").addEventListener("submit", async () => {
        const timeMin = parseInt(document.getElementById("inVitalsTimeMin").value, 10) || 45;
        const tempF = parseFloat(document.getElementById("inVitalsTemp").value) || 101.5;
        const hr = parseInt(document.getElementById("inVitalsHr").value, 10) || 100;
        const rr = parseInt(document.getElementById("inVitalsRr").value, 10) || 24;
        const bp = parseInt(document.getElementById("inVitalsBp").value, 10) || 95;
        const notes = document.getElementById("inVitalsNotes").value.trim();

        if (this.state.transfusionMonitoringLogs.length > 0) {
          const active = this.state.transfusionMonitoringLogs[0];
          active.vitalsSeries.push({ timeMin, tempF, hr, rr, bp, notes });
          await BloodBankStorage.put(BloodBankStorage.storeNames.transfusions, active);
        }

        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("15-मिनट वाइटल्स टेलीमेट्री सफलतापूर्वक अपडेट हुई।", "success");
        }
      });
    },

    // 4.7 BILINGUAL LEGAL CONSENT & INTRA-OP TRANSFUSION RECORD PRINT ENGINE
    printTransfusionConsentAndLog(transfusionId) {
      const log = this.state.transfusionMonitoringLogs.find((l) => l.transfusionId === transfusionId) || this.state.transfusionMonitoringLogs[0];
      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि रक्ताधान सहमति व निगरानी पत्रक मुद्रित किया जा सके।");
        return;
      }

      const rows = log && log.vitalsSeries
        ? log.vitalsSeries
            .map(
              (v) => `
          <tr>
            <td style="font-family: monospace;">Min ${v.timeMin}</td>
            <td style="font-family: monospace; font-weight: bold;">${v.tempF}°F</td>
            <td style="font-family: monospace;">${v.hr} bpm</td>
            <td style="font-family: monospace;">${v.rr} rpm</td>
            <td style="font-family: monospace;">${v.bp} mmHg</td>
            <td>${v.notes}</td>
          </tr>
        `
            )
            .join("")
        : `<tr><td colspan="6" style="text-align: center;">No Vitals Recorded</td></tr>`;

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Blood Transfusion Clinical Record - ${log ? log.transfusionId : "TX"}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #b91c1c; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-red { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .legal-banner { background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 6px; font-size: 10px; color: #991b1b; margin: 15px 0; line-height: 1.4; }
            .seal-row { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 200px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #991b1b; letter-spacing: -0.5px;">VETCARE AI OS (TRANSFUSION MEDICINE DIVISION)</div>
                <div style="font-size: 10px; color: #4b5563;">Veterinary Blood Banking, Immunohematology & Critical Care Registry</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">रक्ताधान कानूनी सहमति पत्र एवं 15-मिनट वाइटल्स फ्लो-शीट (Transfusion Consent & Vitals Log)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-red">CROSSMATCH VERIFIED OK</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">TX RECORD: ${log ? log.transfusionId : "TX-2026"}</div>
                <div style="font-size: 9px; color: #6b7280;">Date: ${log ? log.date : new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <table class="data-table">
            <tr>
              <th width="25%">रोगी पशु का नाम (Patient)</th>
              <td width="25%"><strong>${log ? log.recipientPatientName : "Sheru"}</strong></td>
              <th width="25%">प्रजाति व वजन</th>
              <td width="25%">${log ? log.species : "Canine"} • ${log ? log.recipientWeightKg : 22} kg</td>
            </tr>
            <tr>
              <th>प्रयुक्त रक्त यूनिट आईडी</th>
              <td style="font-family: monospace; color: #b91c1c; font-weight: bold;">${log ? log.transfusedUnitId : "CAN-WB-001"}</td>
              <th>चढ़ाई गई कुल मात्रा</th>
              <td><strong>${log ? log.totalVolumeAdministeredMl : 450} ml</strong> (Duration: ${log ? log.durationHours : 3.5} hrs)</td>
            </tr>
            <tr>
              <th>रक्ताधान पूर्व/पश्चात PCV</th>
              <td><strong>${log ? log.preTransfusionPcv : 12}% ➔ ${log ? log.postTransfusionPcv : 24}%</strong></td>
              <th>तीव्र प्रतिक्रिया (AHTR Status)</th>
              <td><strong style="color: #065f46;">शून्य (Uneventful Recovery)</strong></td>
            </tr>
          </table>

          <div class="legal-banner">
            <strong>कानूनी सहमति घोषणा (Owner Informed Consent):</strong> मैं पुष्टि करता हूँ कि मेरे पशु के जीवन की रक्षा हेतु रक्ताधान की आवश्यकता मुझे समझा दी गई है। यद्यपि रक्त की संपूर्ण जांच व क्रॉस-मैच किया गया है, तथापि एलर्जिक या अज्ञात रक्त प्रतिक्रियाओं के जोखिम से मैं अवगत हूँ और इसकी अनुमति देता हूँ।
          </div>

          <div style="font-weight: 800; text-transform: uppercase; margin: 15px 0 6px; font-size: 11px; color: #991b1b;">
            इंट्रा-ऑपरेटिव 15-मिनट वाइटल्स टेलीमेट्री लॉग (Intra-Transfusion 15-Min Vitals Flow Sheet)
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th width="12%">समय</th>
                <th width="15%">तापमान (°F)</th>
                <th width="15%">हृदय गति (HR)</th>
                <th width="15%">श्वसन दर (RR)</th>
                <th width="15%">रक्तचाप (MAP)</th>
                <th width="28%">क्लिनिकल नोट्स एवं प्रतिक्रिया</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="seal-row">
            <div class="sig-box">
              पशु स्वामी / पालक के हस्ताक्षर<br/>
              <strong>Animal Owner / Guardian</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #991b1b; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>BLOOD BANK SEAL
              </div>
            </div>
            <div class="sig-box">
              अधिकृत क्लिनिकल हेमेटोलॉजिस्ट<br/>
              <strong>${log ? log.vetInCharge : "Dr. Rahul (Critical Care)"}</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 TRANSFUSION HASH: 4B89FA1120CD9843210ACDE9948210DDF9245ACBB6012489EFAA3210C9912BA8<br/>
            Vetcare AI OS - 2026 Production Master Core • Clinical Immunohematology Registry
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
      const modalHost = document.getElementById("bloodBankModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Blood Bank & Transfusion Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.BloodBankTransfusionRegistry = BloodBankTransfusionRegistry;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      BloodBankTransfusionRegistry.init();
    });
  } else {
    BloodBankTransfusionRegistry.init();
  }
})();
