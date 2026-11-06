// Vetcare AI OS - Veterinary Reproduction Management, AI Registry & Calving Prediction Engine (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_BREEDING = "clinical_records";

  // Biological Standard Gestation & Reproductive Parameters (in days)
  const SPECIES_GESTATION_DAYS = {
    bovine: 283,      // Cattle / Cow
    bubaline: 310,    // Water Buffalo / Murrah
    caprine: 150,     // Goat / Doe
    ovine: 150,       // Sheep / Ewe
    equine: 340,      // Horse / Mare
    canine: 63,       // Dog / Bitch
    feline: 63,       // Cat / Queen
    swine: 114        // Pig / Sow
  };

  root.VetcareApp.ClinicalData.ReproductionGynecology = {
    gestationDays: SPECIES_GESTATION_DAYS
  };

  // Pre-seeded Production Breeding Registry Records
  const INITIAL_BREEDING_RECORDS = [
    {
      recordId: "AI-2026-801",
      damTag: "100293847561",
      damName: "Gauri (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Indigenous",
      ownerName: "Chaudhary Dharamvir Singh",
      mobile: "9812039281",
      village: "Bhadurpur, Karnal",
      serviceType: "ARTIFICIAL_INSEMINATION",
      inseminationDate: new Date(Date.now() - 86400000 * 125).toISOString().split("T")[0],
      inseminationTime: "07:30 AM",
      sireId: "MURRAH-NDRI-M29",
      sireBreed: "Elite Murrah Buffalo (Mother Yield: 5200 kg)",
      strawBatchNo: "STR-M29-2025-V09",
      semenStation: "NDRI Central Artificial Breeding Station, Karnal",
      aiTechnicianName: "Dr. Rahul Sharma (V.O.)",
      sheathType: "French Mini Straw (0.25 ml)",
      heatSigns: "Profuse stringy cervical mucus, uterine horn turgidity (3+), frequent micturition",
      status: "CONFIRMED_PREGNANT", // 'HEAT_CHECK_DUE' | 'PD_PENDING' | 'CONFIRMED_PREGNANT' | 'REPEAT_OPEN' | 'CALVED'
      pdMethod: "Transrectal Ultrasonography & Manual Bimanual Slip",
      pdDate: new Date(Date.now() - 86400000 * 65).toISOString().split("T")[0],
      pdExaminer: "Dr. Rahul Sharma",
      daysInGestation: 125,
      expectedCalvingDate: new Date(Date.now() - 86400000 * 125 + 86400000 * 310).toISOString().split("T")[0],
      dryOffDate: new Date(Date.now() - 86400000 * 125 + 86400000 * 250).toISOString().split("T")[0],
      steamingUpDate: new Date(Date.now() - 86400000 * 125 + 86400000 * 289).toISOString().split("T")[0],
      notes: "4th Parity. Pregnancy verified in left uterine horn with distinct fetal cotyledons."
    },
    {
      recordId: "AI-2026-802",
      damTag: "100293847562",
      damName: "Kamdhenu (Sahiwal Cow)",
      species: "bovine",
      breed: "Sahiwal Indigenous",
      ownerName: "Mahinder Rawat",
      mobile: "9416182931",
      village: "Assandh, Karnal",
      serviceType: "ARTIFICIAL_INSEMINATION",
      inseminationDate: new Date(Date.now() - 86400000 * 20).toISOString().split("T")[0],
      inseminationTime: "06:15 PM",
      sireId: "SAHIWAL-SAG-77",
      sireBreed: "Pedigree Sahiwal (Sire: SAG-104)",
      strawBatchNo: "SAG-SHW-2026-11",
      semenStation: "Sabarmati Ashram Gaushala (SAG), Bidaj",
      aiTechnicianName: "Sukhwinder Singh (AI Tech)",
      sheathType: "French Mini (0.25 ml)",
      heatSigns: "Standing to be mounted, clear glassy discharge, restlessness",
      status: "HEAT_CHECK_DUE",
      pdMethod: "Pending (Due Day 30 USG / Day 60 Rectal)",
      pdDate: null,
      pdExaminer: null,
      daysInGestation: 20,
      expectedCalvingDate: new Date(Date.now() - 86400000 * 20 + 86400000 * 283).toISOString().split("T")[0],
      dryOffDate: new Date(Date.now() - 86400000 * 20 + 86400000 * 223).toISOString().split("T")[0],
      steamingUpDate: new Date(Date.now() - 86400000 * 20 + 86400000 * 262).toISOString().split("T")[0],
      notes: "In critical return-to-estrus monitoring window (Days 18-24). Watch for heat symptoms."
    },
    {
      recordId: "AI-2026-803",
      damTag: "100293847563",
      damName: "Rani (HF Crossbred)",
      species: "bovine",
      breed: "Holstein Friesian Cross (75%)",
      ownerName: "Surender Malik",
      mobile: "9812998811",
      village: "Taraori, Karnal",
      serviceType: "ARTIFICIAL_INSEMINATION",
      inseminationDate: new Date(Date.now() - 86400000 * 62).toISOString().split("T")[0],
      inseminationTime: "08:00 AM",
      sireId: "HF-ABS-TITAN",
      sireBreed: "ABS Genomic Sire (PTA Milk +1400 lbs)",
      strawBatchNo: "ABS-TIT-9912",
      semenStation: "ABS India Semen Station",
      aiTechnicianName: "Dr. A. Verma",
      sheathType: "Universal Gun Sheath",
      heatSigns: "Hyperemia of vulva, vocalization, bull acceptance",
      status: "PD_PENDING",
      pdMethod: "Due for Transrectal Palpation (Membrane Slip Test)",
      pdDate: null,
      pdExaminer: null,
      daysInGestation: 62,
      expectedCalvingDate: new Date(Date.now() - 86400000 * 62 + 86400000 * 283).toISOString().split("T")[0],
      dryOffDate: new Date(Date.now() - 86400000 * 62 + 86400000 * 223).toISOString().split("T")[0],
      steamingUpDate: new Date(Date.now() - 86400000 * 62 + 86400000 * 262).toISOString().split("T")[0],
      notes: "Day 62 post-insemination. Manual rectal pregnancy examination due."
    },
    {
      recordId: "AI-2026-804",
      damTag: "100293847564",
      damName: "Lakshmi (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Buffalo",
      ownerName: "Satish Kumar",
      mobile: "9813204918",
      village: "Nilokheri, Karnal",
      serviceType: "ARTIFICIAL_INSEMINATION",
      inseminationDate: new Date(Date.now() - 86400000 * 300).toISOString().split("T")[0],
      inseminationTime: "09:30 AM",
      sireId: "CIRB-M99",
      sireBreed: "Central Institute for Research on Buffaloes (CIRB)",
      strawBatchNo: "CIRB-2025-08",
      semenStation: "CIRB Hisar Semen Depot",
      aiTechnicianName: "Dr. Rahul Sharma",
      sheathType: "French Mini (0.25 ml)",
      heatSigns: "Intense heat symptoms",
      status: "CONFIRMED_PREGNANT",
      pdMethod: "Confirmed Pregnant at 60 Days",
      pdDate: new Date(Date.now() - 86400000 * 240).toISOString().split("T")[0],
      pdExaminer: "Dr. Rahul Sharma",
      daysInGestation: 300,
      expectedCalvingDate: new Date(Date.now() - 86400000 * 300 + 86400000 * 310).toISOString().split("T")[0],
      dryOffDate: new Date(Date.now() - 86400000 * 300 + 86400000 * 250).toISOString().split("T")[0],
      steamingUpDate: new Date(Date.now() - 86400000 * 300 + 86400000 * 289).toISOString().split("T")[0],
      notes: "CRITICAL: Gestation Day 300/310. Expected calving in 10 days! Prepare clean calving pen."
    }
  ];

  // Estrus Synchronization Protocols Repository
  const ESTRUS_SYNC_PROTOCOLS_MASTER = {
    ovsynch: {
      name: "Ovsynch प्रोटोकॉल (GnRH - PGF2α - GnRH - Timed AI)",
      description: "डेयरी पशुओं में निश्चित समय पर कृत्रिम गर्भाधान (TAI) हेतु स्वर्ण मानक प्रोटोकॉल (हीट पहचान की आवश्यकता नहीं)।",
      steps: [
        { dayOffset: 0, drug: "GnRH (Buserelin Acetate - Receptal)", dose: "10 µg (2.5 ml IM)", instructions: "Day 0 (08:00 AM): प्राथमिक फॉलिकल का ओव्यूलेशन अथवा ल्यूटिनाइजेशन।" },
        { dayOffset: 7, drug: "PGF2α (Cloprostenol Sodium - Vetmate/Pragma)", dose: "500 µg (2.0 ml IM)", instructions: "Day 7 (08:00 AM): कॉर्पस ल्यूटियम (CL) का ल्यूटियोलिसिस एवं एस्ट्रोजन वृद्धि।" },
        { dayOffset: 9, drug: "GnRH (Buserelin Acetate)", dose: "10 µg (2.5 ml IM)", instructions: "Day 9 (05:00 PM - 56 घंटे बाद): LH सर्ज एवं सटीक ओव्यूलेशन प्रेरण।" },
        { dayOffset: 10, drug: "Timed AI (निश्चित समय गर्भाधान)", dose: "1 Viable Frozen Semen Straw", instructions: "Day 10 (09:00 AM - 2nd GnRH के 16 घंटे बाद): गर्भाशय ग्रीवा में वीर्य निक्षेपण।" }
      ]
    },
    double_ovsynch: {
      name: "Double-Ovsynch प्रोटोकॉल (Pre-synch + Breeding Ovsynch)",
      description: "अत्यधिक दूध देने वाली संकर गायों एवं एनोस्ट्रस (मदहीन) पशुओं में गर्भाधान दर 15-20% बढ़ाने हेतु।",
      steps: [
        { dayOffset: 0, drug: "GnRH 10 µg IM (Pre-synch 1)", dose: "2.5 ml IM", instructions: "Day 0: प्री-सिंक फॉलिकुलर वेव रीसेट।" },
        { dayOffset: 7, drug: "PGF2α 500 µg IM", dose: "2.0 ml IM", instructions: "Day 7: प्री-सिंक ल्यूटियोलिसिस।" },
        { dayOffset: 10, drug: "GnRH 10 µg IM (Pre-synch 2)", dose: "2.5 ml IM", instructions: "Day 10: 7 दिन पूर्व ओव्यूलेशन चक्र समन्वय।" },
        { dayOffset: 17, drug: "GnRH 10 µg IM (Breeding Ovsynch Day 0)", dose: "2.5 ml IM", instructions: "Day 17: मुख्य ब्रीडिंग ओवसिंक प्रारंभ।" },
        { dayOffset: 24, drug: "PGF2α 500 µg IM", dose: "2.0 ml IM", instructions: "Day 24: फाइनल ल्यूटियोलिसिस।" },
        { dayOffset: 26, drug: "GnRH 10 µg IM", dose: "2.5 ml IM", instructions: "Day 26 (56 घंटे बाद): ओव्यूलेशन सिंक।" },
        { dayOffset: 27, drug: "Timed AI (गर्भाधान)", dose: "1 Frozen Straw", instructions: "Day 27: निश्चित समय पर AI।" }
      ]
    },
    cidr_synch: {
      name: "CIDR-Synch (प्रोजेस्टेरोन इम्प्लांट + Timed AI)",
      description: "मुर्रा भैंसों एवं बछियों में साइलेंट हीट (मूक मद) एवं एनोस्ट्रस के पूर्ण निवारण हेतु सर्वोत्तम।",
      steps: [
        { dayOffset: 0, drug: "CIDR / PRID Insert + GnRH 10 µg IM", dose: "1 Insert (1.38g Progesterone) + 2.5 ml IM", instructions: "Day 0: योनि में CIDR इंसर्ट लगाएं एवं GnRH इंजेक्शन दें।" },
        { dayOffset: 7, drug: "CIDR Removal + PGF2α 500 µg IM", dose: "2.0 ml IM Cloprostenol", instructions: "Day 7: CIDR बाहर निकालें एवं ल्यूटियोलिसिस इंजेक्शन दें।" },
        { dayOffset: 9, drug: "GnRH 10 µg IM", dose: "2.5 ml IM", instructions: "Day 9 (48 घंटे बाद): LH सर्ज प्रेरण।" },
        { dayOffset: 10, drug: "Timed AI (TAI)", dose: "1 Frozen Straw", instructions: "Day 10 (CIDR निकालने के 72 घंटे बाद): गर्भाधान संपन्न करें।" }
      ]
    }
  };

  // Internal Module Reactive State
  const state = {
    breedingRecords: [...INITIAL_BREEDING_RECORDS],
    activeFilter: "all", // 'all' | 'due_heat_check' | 'due_pd' | 'confirmed_pregnant' | 'due_drying_off' | 'due_calving'
    searchQuery: "",
    activeTab: "active_registry", // 'active_registry' | 'gestation_calculator' | 'estrus_sync_protocols' | 'repeat_breeder_triage'
    calculatorInput: {
      species: "bubaline",
      breedingDate: new Date().toISOString().split("T")[0]
    },
    syncProtocolInput: {
      protocolKey: "ovsynch",
      startDate: new Date().toISOString().split("T")[0]
    },
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[BREEDING MANAGER ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection
  function getDbConnection() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve(state.db);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = (e) => {
        state.db = e.target.result;
        resolve(state.db);
      };
      req.onerror = (err) => reject(err);
    });
  }

  // Helper date adder
  function addDaysToDateStr(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  function getDaysBetween(dateStrA, dateStrB) {
    const a = new Date(dateStrA);
    const b = new Date(dateStrB);
    const diffTime = Math.abs(b - a);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Primary Module API Definition
  const BreedingReproductionManager = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadPersistedRecords();
        this.setupEventBus();
        this.recalculateGestationProgress();
        return true;
      } catch (err) {
        console.error("BreedingReproductionManager initialization failed:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for BreedingReproductionManager:", containerId);
        return;
      }
      state.containerElement = container;
      this.recalculateGestationProgress();

      container.innerHTML = `
        <div id="vetcare-breeding-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Executive Reproductive Health & Milestones Banner -->
          ${this.buildTopSummaryKpiHtml()}

          <!-- Tactical Navigation Toolbar -->
          ${this.buildActionToolbarHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "gestation_calculator"
              ? this.buildGestationCalculatorWorkstationHtml()
              : state.activeTab === "estrus_sync_protocols"
              ? this.buildEstrusSyncWorkstationHtml()
              : state.activeTab === "repeat_breeder_triage"
              ? this.buildRepeatBreederTriageHtml()
              : this.buildActiveRegistryWorkstationHtml()
          }

          <!-- Modals Insertion Mount -->
          <div id="breeding-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._patientSelectedListener) {
        window.removeEventListener("patient:selected", this._patientSelectedListener);
        window.removeEventListener("vetcare:patient-selected", this._patientSelectedListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handlePatient = (evt) => {
        const p = evt.detail;
        if (!p) return;
        state.searchQuery = p.tagNumber || p.tagNo || "";
        notify(`प्रजनन प्रबंधन में पशु लोड हुआ: ${state.searchQuery}`, "info");
        if (state.containerElement) {
          this.render(state.containerElement);
        }
      };

      this._patientSelectedListener = handlePatient;
      window.addEventListener("patient:selected", handlePatient);
      window.addEventListener("vetcare:patient-selected", handlePatient);
    },

    async loadPersistedRecords() {
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_BREEDING, "readonly");
        const store = tx.objectStore(STORE_BREEDING);
        const index = store.index("recordType");
        const req = index.getAll("reproduction");
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length > 0) {
            list.forEach((dbRec) => {
              const exists = state.breedingRecords.some((r) => r.recordId === dbRec.recordId);
              if (!exists) {
                const gestationDays = SPECIES_GESTATION_DAYS.bubaline;
                const aiDate = dbRec.timestamp ? dbRec.timestamp.split("T")[0] : new Date().toISOString().split("T")[0];
                state.breedingRecords.unshift({
                  recordId: dbRec.recordId,
                  damTag: dbRec.patientId.replace("PAT-", ""),
                  damName: "EMR Registered Dam",
                  species: "bubaline",
                  breed: "Murrah",
                  ownerName: "Verified Dairy Farmer",
                  mobile: "—",
                  village: "Veterinary Hub",
                  serviceType: "ARTIFICIAL_INSEMINATION",
                  inseminationDate: aiDate,
                  inseminationTime: "Morning AM",
                  sireId: dbRec.bullId || "MURRAH-NDRI",
                  sireBreed: "Elite Murrah Sire",
                  strawBatchNo: dbRec.semenBatch || "BATCH-2026",
                  semenStation: "Government Semen Bank",
                  aiTechnicianName: dbRec.technician || "Dr. Staff",
                  sheathType: "French Mini (0.25 ml)",
                  heatSigns: "Standing estrus, clear mucus",
                  status: dbRec.pdStatus && dbRec.pdStatus.includes("Confirmed") ? "CONFIRMED_PREGNANT" : "HEAT_CHECK_DUE",
                  pdMethod: "Transrectal USG",
                  pdDate: null,
                  pdExaminer: null,
                  daysInGestation: getDaysBetween(aiDate, new Date().toISOString().split("T")[0]),
                  expectedCalvingDate: dbRec.expectedCalvingDate || addDaysToDateStr(aiDate, gestationDays),
                  dryOffDate: addDaysToDateStr(aiDate, gestationDays - 60),
                  steamingUpDate: addDaysToDateStr(aiDate, gestationDays - 21),
                  notes: "Persisted IndexedDB Insemination Dossier"
                });
              }
            });
            if (state.containerElement) this.render(state.containerElement);
          }
        };
      } catch (e) {
        // Fallback quiet
      }
    },

    recalculateGestationProgress: function () {
      const todayStr = new Date().toISOString().split("T")[0];

      state.breedingRecords.forEach((r) => {
        const gestationTotal = SPECIES_GESTATION_DAYS[r.species] || 283;
        const daysPassed = getDaysBetween(r.inseminationDate, todayStr);
        r.daysInGestation = daysPassed;

        // Auto-compute milestones if missing
        if (!r.expectedCalvingDate) {
          r.expectedCalvingDate = addDaysToDateStr(r.inseminationDate, gestationTotal);
        }
        if (!r.dryOffDate) {
          r.dryOffDate = addDaysToDateStr(r.inseminationDate, gestationTotal - 60);
        }
        if (!r.steamingUpDate) {
          r.steamingUpDate = addDaysToDateStr(r.inseminationDate, gestationTotal - 21);
        }

        // Automatic Status Transitions
        if (r.status !== "CONFIRMED_PREGNANT" && r.status !== "REPEAT_OPEN" && r.status !== "CALVED") {
          if (daysPassed >= 18 && daysPassed <= 24) {
            r.status = "HEAT_CHECK_DUE";
          } else if (daysPassed >= 30) {
            r.status = "PD_PENDING";
          }
        }
      });
    },

    // MATHEMATICAL MILESTONE ENGINE
    calculateReproductiveMilestones: function (species, inseminationDateStr) {
      const gestationDuration = SPECIES_GESTATION_DAYS[species] || 283;

      return {
        species: species,
        inseminationDate: inseminationDateStr,
        returnToEstrusStart: addDaysToDateStr(inseminationDateStr, 18),
        returnToEstrusEnd: addDaysToDateStr(inseminationDateStr, 24),
        ultrasoundPdDate: addDaysToDateStr(inseminationDateStr, 30),
        manualTransrectalPdDate: addDaysToDateStr(inseminationDateStr, 60),
        placentomePalpableDate: addDaysToDateStr(inseminationDateStr, 90),
        dryOffDate: addDaysToDateStr(inseminationDateStr, gestationDuration - 60),
        steamingUpDate: addDaysToDateStr(inseminationDateStr, gestationDuration - 21),
        expectedCalvingDate: addDaysToDateStr(inseminationDateStr, gestationDuration),
        gestationDuration: gestationDuration
      };
    },

    // HTML VIEW BUILDERS
    buildTopSummaryKpiHtml: function () {
      const heatCheckCount = state.breedingRecords.filter((r) => r.status === "HEAT_CHECK_DUE").length;
      const pdPendingCount = state.breedingRecords.filter((r) => r.status === "PD_PENDING").length;
      const pregnantCount = state.breedingRecords.filter((r) => r.status === "CONFIRMED_PREGNANT").length;

      // Due for calving in next 15 days
      const todayStr = new Date().toISOString().split("T")[0];
      const in15DaysStr = addDaysToDateStr(todayStr, 15);
      const calvingSoonCount = state.breedingRecords.filter((r) => {
        return r.status === "CONFIRMED_PREGNANT" && r.expectedCalvingDate >= todayStr && r.expectedCalvingDate <= in15DaysStr;
      }).length;

      return `
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Heat Check Due (18-24 Days) -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">मद वापसी निगरानी (18-24 दिन)</div>
              <div class="text-2xl font-display font-black text-amber-400 mt-1">${heatCheckCount} <span class="text-xs font-normal text-slate-400">पशु</span></div>
              <div class="text-[10px] text-amber-300 font-mono mt-0.5">हीट लक्षण निरीक्षण आवश्यक</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
              <i class="fa-solid fa-venus-mars"></i>
            </div>
          </div>

          <!-- Pregnancy Diagnosis Due (Day 60+) -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">गर्भ परीक्षण देय (PD Due 60d)</div>
              <div class="text-2xl font-display font-black text-cyan-400 mt-1">${pdPendingCount} <span class="text-xs font-normal text-slate-400">पशु</span></div>
              <div class="text-[10px] text-cyan-300 font-mono mt-0.5">गुदा परीक्षण / USG देय</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
              <i class="fa-solid fa-hand-holding-medical"></i>
            </div>
          </div>

          <!-- Confirmed Pregnant Herd -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">पुष्ट गाभिन झुंड (Confirmed)</div>
              <div class="text-2xl font-display font-black text-emerald-400 mt-1">${pregnantCount} <span class="text-xs font-normal text-slate-400">गाभिन</span></div>
              <div class="text-[10px] text-emerald-300 font-mono mt-0.5">गर्भावस्था गार्डरेल्स सक्रिय</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>

          <!-- Due for Calving in 15 Days Alert -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">आगामी प्रसव (Calving in 15d)</div>
              <div class="text-2xl font-display font-black text-rose-400 mt-1">${calvingSoonCount} <span class="text-xs font-normal text-slate-400">अलर्ट</span></div>
              <div class="text-[10px] text-rose-300 font-mono mt-0.5">स्टीमिंग-अप एवं प्रसव कक्ष तैयार</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xl">
              <i class="fa-solid fa-baby-carriage"></i>
            </div>
          </div>

        </div>
      `;
    },

    buildActionToolbarHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <!-- Tab Navigation -->
          <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <button 
              type="button" 
              data-breeding-tab="active_registry" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "active_registry"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-dna"></i>
              <span>कृत्रिम गर्भाधान रजिस्टर (AI Registry)</span>
            </button>

            <button 
              type="button" 
              data-breeding-tab="gestation_calculator" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "gestation_calculator"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-calculator"></i>
              <span>गर्भकाल व प्रसव गणक (ECD Calculator)</span>
            </button>

            <button 
              type="button" 
              data-breeding-tab="estrus_sync_protocols" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "estrus_sync_protocols"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-diagram-project"></i>
              <span>मद समन्वय प्रोटोकॉल (Ovsynch / CIDR)</span>
            </button>

            <button 
              type="button" 
              data-breeding-tab="repeat_breeder_triage" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "repeat_breeder_triage"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-kit-medical"></i>
              <span>रिपीट ब्रीडर क्लिनिकल समाधान</span>
            </button>
          </div>

          <!-- Filter & Action Controls -->
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="relative min-w-[200px] flex-1 sm:flex-initial">
              <input 
                type="text" 
                id="breedingSearchInput" 
                value="${state.searchQuery}" 
                placeholder="टैग नं., सांड ID या किसान खोजें..." 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-slate-400 text-xs pointer-events-none"></i>
            </div>

            <select id="breedingStatusFilter" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-purple-500 cursor-pointer">
              <option value="all" ${state.activeFilter === "all" ? "selected" : ""}>समस्त अवस्थाएं</option>
              <option value="due_heat_check" ${state.activeFilter === "due_heat_check" ? "selected" : ""}>मद वापसी (18-24d)</option>
              <option value="due_pd" ${state.activeFilter === "due_pd" ? "selected" : ""}>गर्भ जांच देय (PD Due)</option>
              <option value="confirmed_pregnant" ${state.activeFilter === "confirmed_pregnant" ? "selected" : ""}>पुष्ट गाभिन (Pregnant)</option>
              <option value="due_calving" ${state.activeFilter === "due_calving" ? "selected" : ""}>प्रसव सन्निकट (Calving Soon)</option>
            </select>

            <button id="btnOpenInseminationModal" type="button" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center gap-1.5 active:scale-95 transition-all">
              <i class="fa-solid fa-plus-circle"></i>
              <span>+ नया AI / गर्भाधान दर्ज करें</span>
            </button>

            <button id="btnExportCalvingCsv" type="button" title="Export Calving Schedule CSV" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              <i class="fa-solid fa-file-csv"></i>
            </button>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 1: Active Insemination & Calving Registry Table
    buildActiveRegistryWorkstationHtml: function () {
      const filtered = this.getFilteredBreedingRecords();

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-cow text-purple-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                पशु गर्भाधान एवं प्रसव प्रगति रजिस्टर (${filtered.length})
              </h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">राष्ट्रीय गोकुल मिशन (Bharat Pashudhan AI) अनुरूप</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">मादा पशु पहचान (Dam Tag)</th>
                  <th class="px-3.5 py-3">गर्भाधान दिनांक व समय</th>
                  <th class="px-3.5 py-3">सांड ID एवं वीर्य स्ट्रॉ</th>
                  <th class="px-3.5 py-3">गर्भकाल प्रगति (Days)</th>
                  <th class="px-3.5 py-3">वर्तमान स्थिति (Status)</th>
                  <th class="px-3.5 py-3">संभावित प्रसव तिथि (ECD)</th>
                  <th class="px-3.5 py-3 text-right">कार्यवाही (Actions)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/70 font-sans">
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="7" class="p-8 text-center text-xs text-slate-500 font-mono">कोई प्रजनन रिकॉर्ड नहीं मिला। नया गर्भाधान पंजीकृत करें।</td></tr>`
                    : filtered
                        .map((r) => {
                          let badge = "";
                          if (r.status === "CONFIRMED_PREGNANT") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><i class="fa-solid fa-check mr-1"></i>पुष्ट गाभिन (${r.daysInGestation}d)</span>`;
                          } else if (r.status === "HEAT_CHECK_DUE") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"><i class="fa-solid fa-clock mr-1"></i>मद वापसी (Day ${r.daysInGestation})</span>`;
                          } else if (r.status === "PD_PENDING") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"><i class="fa-solid fa-stethoscope mr-1"></i>PD देय (${r.daysInGestation}d)</span>`;
                          } else {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400">${r.status}</span>`;
                          }

                          return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3.5 py-3 font-mono font-bold text-white">
                          <div class="flex items-center gap-1.5">
                            <span class="text-purple-400"><i class="fa-solid fa-tag text-[10px]"></i></span>
                            <span>${r.damTag}</span>
                          </div>
                          <div class="text-[11px] text-slate-400 font-sans font-normal">${r.species.toUpperCase()} (${r.breed})</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <div class="text-white font-bold">${r.inseminationDate}</div>
                          <div class="text-[10px] text-slate-400">${r.inseminationTime}</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <div class="text-emerald-400 font-bold">${r.sireId}</div>
                          <div class="text-[10px] text-slate-400 truncate max-w-[170px]" title="${r.sireBreed}">${r.strawBatchNo}</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <div class="text-slate-200 font-bold">${r.daysInGestation} / ${SPECIES_GESTATION_DAYS[r.species] || 283} दिन</div>
                          <div class="w-24 bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                            <div class="bg-purple-500 h-full" style="width: ${Math.min(100, Math.round((r.daysInGestation / (SPECIES_GESTATION_DAYS[r.species] || 283)) * 100))}%;"></div>
                          </div>
                        </td>
                        <td class="px-3.5 py-3">${badge}</td>
                        <td class="px-3.5 py-3 font-mono font-bold text-amber-400">
                          <div>${r.expectedCalvingDate}</div>
                          <div class="text-[10px] text-slate-400 font-sans font-normal">Dry-off: ${r.dryOffDate}</div>
                        </td>
                        <td class="px-3.5 py-3 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            <button 
                              type="button" 
                              data-record-pd-id="${r.recordId}" 
                              title="Record Pregnancy Diagnosis Result" 
                              class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow"
                            >
                              PD जांच
                            </button>
                            <button 
                              type="button" 
                              data-print-ai-slip="${r.recordId}" 
                              title="Print AI Certificate Slip" 
                              class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700"
                            >
                              <i class="fa-solid fa-print"></i>
                            </button>
                          </div>
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
      `;
    },

    // WORKSTATION TAB 2: Interactive Gestation & Calving Calculator
    buildGestationCalculatorWorkstationHtml: function () {
      const calc = this.calculateReproductiveMilestones(state.calculatorInput.species, state.calculatorInput.breedingDate);

      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Parameters Input Form (Cols 1-4) -->
          <div class="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
              <i class="fa-solid fa-calendar-day text-emerald-400 text-lg"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">गर्भकाल एवं प्रसव तिथि गणक</h3>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रजाति का चयन करें (Species)</label>
                <select id="calcSpeciesSelect" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:ring-2 focus:ring-emerald-500">
                  <option value="bubaline" ${state.calculatorInput.species === "bubaline" ? "selected" : ""}>महिषवंश / भैंस (310 दिन)</option>
                  <option value="bovine" ${state.calculatorInput.species === "bovine" ? "selected" : ""}>गोवंश / गाय (283 दिन)</option>
                  <option value="caprine" ${state.calculatorInput.species === "caprine" ? "selected" : ""}>बकरी / Goat (150 दिन)</option>
                  <option value="ovine" ${state.calculatorInput.species === "ovine" ? "selected" : ""}>भेड़ / Sheep (150 दिन)</option>
                  <option value="equine" ${state.calculatorInput.species === "equine" ? "selected" : ""}>घोड़ी / Mare (340 दिन)</option>
                  <option value="canine" ${state.calculatorInput.species === "canine" ? "selected" : ""}>श्वान / Bitch (63 दिन)</option>
                  <option value="feline" ${state.calculatorInput.species === "feline" ? "selected" : ""}>मार्जार / Queen (63 दिन)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">गर्भाधान / मिलन दिनांक (Breeding Date)</label>
                <input 
                  type="date" 
                  id="calcBreedingDateInput" 
                  value="${state.calculatorInput.breedingDate}" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                औसत गर्भकाल: <strong class="text-emerald-400">${calc.gestationDuration} दिन</strong><br>
                मानक विचलन: ± 5-7 दिन (नस्ल व लिंगानुसार)
              </div>
            </div>
          </div>

          <!-- Calculated Milestones Visual Timeline (Cols 5-12) -->
          <div class="lg:col-span-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                भ्रूणीय विकास एवं प्रजनन समय-सारणी (Reproductive Timeline)
              </h3>
              <span class="text-xs font-mono font-bold text-amber-400">
                ECD: ${calc.expectedCalvingDate}
              </span>
            </div>

            <div class="space-y-4">
              
              <!-- Timeline Milestone Item 1 -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                  18d
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">मद वापसी निरीक्षण (Heat Return Window)</span>
                    <span class="font-mono text-xs text-amber-400">${calc.returnToEstrusStart} से ${calc.returnToEstrusEnd}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">पशुपालक सुबह-शाम 20 मिनट तक ताव (हीट) के लक्षणों पर नजर रखें। यदि मद में न आए तो प्रारंभिक गर्भ की संभावना।</p>
                </div>
              </div>

              <!-- Timeline Milestone Item 2 -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                  30d
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">अल्ट्रासाउंड प्रारंभिक गर्भ जांच (USG Pregnancy Test)</span>
                    <span class="font-mono text-xs text-cyan-400">${calc.ultrasoundPdDate}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">भ्रूण की हृदय गति (Fetal Heartbeat) एवं एम्ब्रियोनिक वेसिकल की पुष्टि USG से की जा सकती है।</p>
                </div>
              </div>

              <!-- Timeline Milestone Item 3 -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
                  60d
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">गुदा द्वारा मैनुअल गर्भ परीक्षण (Transrectal Palpation)</span>
                    <span class="font-mono text-xs text-purple-400">${calc.manualTransrectalPdDate}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">फीटल मेम्ब्रेन स्लिप (Membrane Slip Test), गर्भाशय सींग में विषमता एवं भ्रूण की उपस्थिति स्पष्ट पुष्ट होती है।</p>
                </div>
              </div>

              <!-- Timeline Milestone Item 4 -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
                  -60d
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">दूध दोहन बंद करना (Drying Off Date)</span>
                    <span class="font-mono text-xs text-blue-400">${calc.dryOffDate}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">दूध सुखाना एवं ड्राई काउ थेरेपी (Intramammary Dry Antibiotic) देना अनिवार्य ताकि अयन (Udder) अगले ब्यात हेतु स्वस्थ रहे।</p>
                </div>
              </div>

              <!-- Timeline Milestone Item 5 -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-bold text-xs">
                  -21d
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">स्टीमिंग-अप एवं ट्रांजिशन डाइट (Transition Steaming-Up)</span>
                    <span class="font-mono text-xs text-rose-400">${calc.steamingUpDate}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">ऊर्जा युक्त दाना, मिनरल मिक्सचर एवं anionic salt (Negative DCAD) प्रारंभ करें ताकि मिल्क फीवर से बचाव हो।</p>
                </div>
              </div>

              <!-- Timeline Milestone Item 6: Calving -->
              <div class="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-950 border border-emerald-500/50">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                  ECD
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-emerald-300 text-sm">संभावित प्रसव दिनांक (Expected Calving Date)</span>
                    <span class="font-mono text-sm font-black text-emerald-400">${calc.expectedCalvingDate}</span>
                  </div>
                  <p class="text-[11px] text-slate-300 mt-0.5">सूखा पुआल बिछाकर प्रसव बाड़ा तैयार रखें। प्रसव संकेतों (लिगामेंट ढीले होना, अयन में खीस भरना) पर निगरानी रखें।</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 3: Estrus Synchronization Protocols
    buildEstrusSyncWorkstationHtml: function () {
      const pKey = state.syncProtocolInput.protocolKey;
      const sDate = state.syncProtocolInput.startDate;
      const proto = ESTRUS_SYNC_PROTOCOLS_MASTER[pKey] || ESTRUS_SYNC_PROTOCOLS_MASTER.ovsynch;

      return `
        <div class="space-y-6">
          
          <!-- Protocol Selector Bar -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div class="flex-1">
              <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रोटोकॉल चयन (Estrus Synchronization Protocol)</label>
              <select id="syncProtoSelect" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold text-xs focus:ring-2 focus:ring-cyan-500">
                <option value="ovsynch" ${pKey === "ovsynch" ? "selected" : ""}>Ovsynch (GnRH - PGF2α - GnRH - Timed AI)</option>
                <option value="double_ovsynch" ${pKey === "double_ovsynch" ? "selected" : ""}>Double-Ovsynch (High Producing Dairy Cattle)</option>
                <option value="cidr_synch" ${pKey === "cidr_synch" ? "selected" : ""}>CIDR-Synch (Progesterone Device + PGF2α)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रारंभ दिनांक (Day 0 Start Date)</label>
              <input 
                type="date" 
                id="syncStartDateInput" 
                value="${sDate}" 
                class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-xs focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
          </div>

          <!-- Protocol Schedule Detail Table -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="pb-3 border-b border-slate-800 mb-4">
              <h3 class="text-sm font-display font-bold text-white">${proto.name}</h3>
              <p class="text-xs text-slate-400 mt-1">${proto.description}</p>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3.5 py-3">समय सारणी (Day)</th>
                    <th class="px-3.5 py-3">सटीक दिनांक (Calendar Date)</th>
                    <th class="px-3.5 py-3">दवा एवं फॉर्मूलेशन (Drug)</th>
                    <th class="px-3.5 py-3">खुराक एवं मार्ग (Dose/Route)</th>
                    <th class="px-3.5 py-3 font-sans">क्लिनिकल निर्देश एवं उद्देश्य</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/70 font-sans">
                  ${proto.steps
                    .map((step) => {
                      const calDate = addDaysToDateStr(sDate, step.dayOffset);
                      const isAi = step.drug.includes("Timed AI");
                      return `
                      <tr class="hover:bg-slate-850/50 ${isAi ? "bg-emerald-950/20" : ""}">
                        <td class="px-3.5 py-3 font-mono font-bold text-cyan-400">Day ${step.dayOffset}</td>
                        <td class="px-3.5 py-3 font-mono font-bold text-white">${calDate}</td>
                        <td class="px-3.5 py-3 font-bold ${isAi ? "text-emerald-400" : "text-amber-300"}">${step.drug}</td>
                        <td class="px-3.5 py-3 font-mono text-slate-300">${step.dose}</td>
                        <td class="px-3.5 py-3 text-xs text-slate-300 leading-relaxed">${step.instructions}</td>
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

    // WORKSTATION TAB 4: Repeat Breeder Triage Decision Tree
    buildRepeatBreederTriageHtml: function () {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 p-5 shadow-xl">
            <div class="flex items-center gap-2.5 pb-3 border-b border-slate-800 mb-3">
              <i class="fa-solid fa-triangle-exclamation text-amber-400 text-lg"></i>
              <div>
                <h3 class="text-sm font-display font-bold text-white">रिपीट ब्रीडर (Repeat Breeder Syndrome) क्लिनिकल जांच एवं समाधान</h3>
                <div class="text-[11px] font-mono text-amber-300/90">3 या अधिक बार नियमित अंतराल पर गर्भाधान के बाद भी गाभिन न ठहरने वाले पशुओं की कार्ययोजना</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              <!-- Checkpoint 1 -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="font-bold text-amber-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <span>1. सब-क्लिनिकल एंडोमेट्रैटिस (गर्भाशय शोथ)</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  <strong>जांच:</strong> पारदर्शी डिस्चार्ज में सूक्ष्म मवाद कण (White-side test / Metricheck)।<br>
                  <strong>उपचार:</strong> AI के समय गर्भाशय में एंटीबायोटिक डालने से बचें। AI से 24 घंटे पूर्व PGF2α दें अथवा सेफक्विनोम / सेफ्टिओफर का अंतर्गर्भाशयी (IU) प्रयोग करें।
                </p>
              </div>

              <!-- Checkpoint 2 -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="font-bold text-cyan-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-clock-rotate-left"></i>
                  <span>2. विलंबित अंडोत्सर्ग (Delayed Ovulation)</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  <strong>लक्षण:</strong> हीट 36 घंटे से अधिक समय तक बनी रहना।<br>
                  <strong>उपचार:</strong> गर्भाधान (AI) संपन्न करते ही <strong>GnRH (Receptal 2.5 ml IM)</strong> लगाएं ताकि 16-24 घंटे के भीतर अंडाणु का विसर्जन सुनिश्चित हो सके।
                </p>
              </div>

              <!-- Checkpoint 3 -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="font-bold text-purple-400 flex items-center gap-1.5">
                  <i class="fa-solid fa-shield-heart"></i>
                  <span>3. भ्रूणीय मृत्यु (Early Embryonic Death)</span>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  <strong>कारण:</strong> कॉर्पस ल्यूटियम द्वारा प्रोजेस्टेरोन हार्मोन की अपर्याप्तता।<br>
                  <strong>उपचार:</strong> गर्भाधान के 4 से 5वें दिन <strong>hCG (Chorulon 1500-3000 IU IM)</strong> दें या 12वें दिन तक CIDR / प्रोजेस्टेरोन स्पंज का प्रयोग करें।
                </p>
              </div>

            </div>
          </div>
        </div>
      `;
    },

    getFilteredBreedingRecords: function () {
      return state.breedingRecords.filter((r) => {
        let matchesStatus = true;
        if (state.activeFilter === "due_heat_check") {
          matchesStatus = r.status === "HEAT_CHECK_DUE";
        } else if (state.activeFilter === "due_pd") {
          matchesStatus = r.status === "PD_PENDING";
        } else if (state.activeFilter === "confirmed_pregnant") {
          matchesStatus = r.status === "CONFIRMED_PREGNANT";
        } else if (state.activeFilter === "due_calving") {
          const today = new Date().toISOString().split("T")[0];
          const in15d = addDaysToDateStr(today, 15);
          matchesStatus = r.status === "CONFIRMED_PREGNANT" && r.expectedCalvingDate >= today && r.expectedCalvingDate <= in15d;
        }

        const q = state.searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          r.damTag.toLowerCase().includes(q) ||
          r.damName.toLowerCase().includes(q) ||
          r.sireId.toLowerCase().includes(q) ||
          r.ownerName.toLowerCase().includes(q);

        return matchesStatus && matchesQuery;
      });
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-breeding-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-breeding-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Search Input
      const searchInp = container.querySelector("#breedingSearchInput");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          state.searchQuery = e.target.value;
          this.render(container);
        });
      }

      // 3. Status Filter Dropdown
      const statusSelect = container.querySelector("#breedingStatusFilter");
      if (statusSelect) {
        statusSelect.addEventListener("change", (e) => {
          state.activeFilter = e.target.value;
          this.render(container);
        });
      }

      // 4. Insemination Modal Trigger
      const btnInseminate = container.querySelector("#btnOpenInseminationModal");
      if (btnInseminate) {
        btnInseminate.addEventListener("click", () => this.openInseminationModal());
      }

      // 5. Export Calving CSV
      const btnCsv = container.querySelector("#btnExportCalvingCsv");
      if (btnCsv) {
        btnCsv.addEventListener("click", () => this.exportCalvingScheduleCsv());
      }

      // 6. Gestation Calculator Inputs
      const calcSpecies = container.querySelector("#calcSpeciesSelect");
      if (calcSpecies) {
        calcSpecies.addEventListener("change", (e) => {
          state.calculatorInput.species = e.target.value;
          this.render(container);
        });
      }
      const calcDate = container.querySelector("#calcBreedingDateInput");
      if (calcDate) {
        calcDate.addEventListener("change", (e) => {
          state.calculatorInput.breedingDate = e.target.value;
          this.render(container);
        });
      }

      // 7. Sync Protocol Inputs
      const syncProto = container.querySelector("#syncProtoSelect");
      if (syncProto) {
        syncProto.addEventListener("change", (e) => {
          state.syncProtocolInput.protocolKey = e.target.value;
          this.render(container);
        });
      }
      const syncDate = container.querySelector("#syncStartDateInput");
      if (syncDate) {
        syncDate.addEventListener("change", (e) => {
          state.syncProtocolInput.startDate = e.target.value;
          this.render(container);
        });
      }

      // 8. PD & Certificate Action Delegation
      container.addEventListener("click", (e) => {
        const pdBtn = e.target.closest("[data-record-pd-id]");
        if (pdBtn) {
          const rid = pdBtn.getAttribute("data-record-pd-id");
          this.openPdModal(rid);
        }

        const slipBtn = e.target.closest("[data-print-ai-slip]");
        if (slipBtn) {
          const rid = slipBtn.getAttribute("data-print-ai-slip");
          this.printBreedingCertificate(rid);
        }
      });
    },

    // 4. MODALS & REGISTRATIONS: Insemination Logging
    openInseminationModal: function () {
      const mount = document.getElementById("breeding-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="inseminationModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-slate-900 border-2 border-purple-500 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8 text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-dna text-purple-400 text-lg"></i>
                <div>
                  <h3 class="font-display font-bold text-base text-white">नया कृत्रिम गर्भाधान (AI) पंजीकरण</h3>
                  <div class="text-[10px] font-mono text-purple-400">AM-PM गर्भाधान नियम एवं वीर्य स्ट्रॉ ट्रेसेबिलिटी</div>
                </div>
              </div>
              <button id="closeAiModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="newAiForm" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">मादा पशु टैग नं. (Dam Tag) *</label>
                  <input type="text" id="aiDamTag" required maxlength="12" placeholder="100293847566" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रजाति (Species) *</label>
                  <select id="aiSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-purple-500">
                    <option value="bubaline">महिषवंश / भैंस (Murrah)</option>
                    <option value="bovine">गोवंश / गाय (Cattle)</option>
                    <option value="caprine">बकरी / Goat</option>
                    <option value="ovine">भेड़ / Sheep</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">गर्भाधान दिनांक *</label>
                  <input type="date" id="aiDate" required value="${new Date().toISOString().split("T")[0]}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">समय एवं AM/PM नियम *</label>
                  <select id="aiTimeSlot" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-purple-500">
                    <option value="Morning AM (हीट कल शाम देखी गई)">Morning AM (मद कल शाम देखा गया)</option>
                    <option value="Evening PM (हीट आज सुबह देखी गई)">Evening PM (मद आज सुबह देखा गया)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">सांड / सीमन ID (Sire ID) *</label>
                  <input type="text" id="aiSireId" required value="MURRAH-NDRI-M29" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">वीर्य स्ट्रॉ बैच नं. (Batch No.) *</label>
                  <input type="text" id="aiStrawBatch" required value="STR-2026-X8" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">पशुपालक का नाम *</label>
                  <input type="text" id="aiOwnerName" required placeholder="किसान का नाम" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">मोबाइल नंबर</label>
                  <input type="tel" id="aiMobile" maxlength="10" placeholder="9812000000" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">मद लक्षण एवं गर्भाशय स्थिति (Heat Symptoms)</label>
                <input type="text" id="aiHeatSigns" value="पारदर्शी कांच जैसा स्राव, गर्भाशय सींग में तनाव (Turgid Horns)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-purple-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="cancelAiModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950/50">गर्भाधान सुरक्षित करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("inseminationModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeAiModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelAiModalBtn").addEventListener("click", closeAction);

      document.getElementById("newAiForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const damTag = document.getElementById("aiDamTag").value.trim();
        const species = document.getElementById("aiSpecies").value;
        const aiDate = document.getElementById("aiDate").value;
        const gestationDuration = SPECIES_GESTATION_DAYS[species] || 283;

        const newRecord = {
          recordId: "AI-" + Date.now(),
          damTag: damTag,
          damName: "Dam " + damTag,
          species: species,
          breed: species === "bubaline" ? "Murrah" : "Indigenous",
          ownerName: document.getElementById("aiOwnerName").value.trim(),
          mobile: document.getElementById("aiMobile").value.trim(),
          village: "Karnal",
          serviceType: "ARTIFICIAL_INSEMINATION",
          inseminationDate: aiDate,
          inseminationTime: document.getElementById("aiTimeSlot").value,
          sireId: document.getElementById("aiSireId").value.trim(),
          sireBreed: "High Genetic Merit Sire",
          strawBatchNo: document.getElementById("aiStrawBatch").value.trim(),
          semenStation: "Authorized State Semen Bank",
          aiTechnicianName: "Dr. Rahul Sharma",
          sheathType: "French Mini (0.25 ml)",
          heatSigns: document.getElementById("aiHeatSigns").value.trim(),
          status: "HEAT_CHECK_DUE",
          pdMethod: "Pending",
          pdDate: null,
          pdExaminer: null,
          daysInGestation: 0,
          expectedCalvingDate: addDaysToDateStr(aiDate, gestationDuration),
          dryOffDate: addDaysToDateStr(aiDate, gestationDuration - 60),
          steamingUpDate: addDaysToDateStr(aiDate, gestationDuration - 21),
          notes: "Registered via Veterinary Theriogenology Core"
        };

        state.breedingRecords.unshift(newRecord);

        // Dispatch EMR Integration Event
        window.dispatchEvent(
          new CustomEvent("breeding:event_logged", {
            detail: {
              patientId: "PAT-" + damTag,
              eventType: "Artificial Insemination (AI)",
              sireId: newRecord.sireId,
              inseminationDate: aiDate,
              expectedCalvingDate: newRecord.expectedCalvingDate
            }
          })
        );

        closeAction();
        notify(`मादा पशु ${damTag} का गर्भाधान सफलतापूर्वक दर्ज हुआ!`, "success");
        this.render(state.containerElement);
      });
    },

    // 5. MODAL: Pregnancy Diagnosis (PD) Recording
    openPdModal: function (recordId) {
      const record = state.breedingRecords.find((r) => r.recordId === recordId);
      if (!record) return;

      const mount = document.getElementById("breeding-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="pdModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-stethoscope text-cyan-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">गर्भ परीक्षण परिणाम दर्ज करें (PD Test)</h3>
              </div>
              <button id="closePdModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="pdForm" class="space-y-4 text-xs">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div class="text-white font-bold">टैग नं: ${record.damTag} (${record.species.toUpperCase()})</div>
                <div class="text-slate-400">गर्भाधान तिथि: <strong class="text-white font-mono">${record.inseminationDate}</strong> (${record.daysInGestation} दिन व्यतीत)</div>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">गर्भ परीक्षण परिणाम (PD Outcome) *</label>
                <select id="pdOutcomeSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500">
                  <option value="CONFIRMED_PREGNANT">पुष्ट गाभिन (Confirmed Pregnant)</option>
                  <option value="REPEAT_OPEN">खाली / गैर-गर्भवती (Empty / Open)</option>
                  <option value="DOUBTFUL_RECHECK">संदेहास्पद (Recheck in 15 Days)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">जांच विधि (Method)</label>
                <select id="pdMethodSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500">
                  <option value="Transrectal Membrane Slip & Horn Asymmetry">गुदा परीक्षण (Membrane Slip & Asymmetry)</option>
                  <option value="Ultrasonography (USG)">अल्ट्रासाउंड (USG Fetal Heart Beat)</option>
                  <option value="Cervical Fremitus">मध्य गर्भाशयी धमनी फ्रिमिटस (Fremitus)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">परीक्षक चिकित्सक का नाम</label>
                <input type="text" id="pdExaminer" required value="Dr. Rahul Sharma (V.O.)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="cancelPdModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/50">PD परिणाम सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("pdModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closePdModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelPdModalBtn").addEventListener("click", closeAction);

      document.getElementById("pdForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const outcome = document.getElementById("pdOutcomeSelect").value;
        record.status = outcome;
        record.pdDate = new Date().toISOString().split("T")[0];
        record.pdMethod = document.getElementById("pdMethodSelect").value;
        record.pdExaminer = document.getElementById("pdExaminer").value.trim();

        closeAction();
        notify(`पशु ${record.damTag} का PD परिणाम: ${outcome} अद्यतन हुआ!`, "success");
        this.render(state.containerElement);
      });
    },

    // 6. CERTIFICATION: Print Breeding & AI Certificate Slip
    printBreedingCertificate: function (recordId) {
      const record = state.breedingRecords.find((r) => r.recordId === recordId);
      if (!record) return;

      const printWindow = window.open("", "_blank", "width=850,height=900");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>कृत्रिम गर्भाधान पर्ची एवं प्रमाण पत्र - ${record.damTag}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.5; margin: 0; padding: 20px; font-size: 13px; }
            .cert-box { border: 3px double #581c87; padding: 25px; border-radius: 12px; }
            .header-strip { text-align: center; border-bottom: 2px solid #581c87; padding-bottom: 12px; margin-bottom: 20px; }
            .dept-title { font-size: 18px; font-weight: bold; color: #581c87; text-transform: uppercase; }
            .slip-title { font-size: 15px; font-weight: bold; margin-top: 3px; }
            .grid-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .grid-table td { padding: 8px 12px; border: 1px solid #d1d5db; font-size: 12px; }
            .grid-table td.header { background: #faf5ff; font-weight: bold; width: 30%; color: #581c87; }
            .ecd-banner { background: #fdf4ff; border: 2px solid #c084fc; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; }
            .ecd-title { font-size: 16px; font-weight: bold; color: #581c87; }
            .footer-strip { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 60px; text-align: center; line-height: 60px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <div class="header-strip">
              <div class="dept-title">राष्ट्रीय गोकुल मिशन • पशुपालन विभाग हरियाणा</div>
              <div class="slip-title">प्रमाणित कृत्रिम गर्भाधान पर्ची (Official AI Certificate Slip)</div>
              <div style="font-family: monospace; font-size: 11px; color: #666; margin-top: 2px;">SLIP NO: ${record.recordId} • ISO-VET-2026 REPRO</div>
            </div>

            <table class="grid-table">
              <tr>
                <td class="header">मादा पशु टैग (Dam Tag):</td>
                <td><strong>${record.damTag}</strong></td>
                <td class="header">प्रजाति व नस्ल:</td>
                <td>${record.species.toUpperCase()} (${record.breed})</td>
              </tr>
              <tr>
                <td class="header">पशुपालक का नाम:</td>
                <td><strong>${record.ownerName}</strong></td>
                <td class="header">पता / गांव:</td>
                <td>${record.village}</td>
              </tr>
              <tr>
                <td class="header">गर्भाधान दिनांक व समय:</td>
                <td><strong>${record.inseminationDate} (${record.inseminationTime})</strong></td>
                <td class="header">सांड सीमन ID (Sire ID):</td>
                <td><strong>${record.sireId}</strong></td>
              </tr>
              <tr>
                <td class="header">वीर्य स्ट्रॉ बैच नं.:</td>
                <td>${record.strawBatchNo}</td>
                <td class="header">वीर्य स्टेशन:</td>
                <td>${record.semenStation}</td>
              </tr>
              <tr>
                <td class="header">गर्भाधानकर्ता का नाम:</td>
                <td>${record.aiTechnicianName}</td>
                <td class="header">वर्तमान गर्भ स्थिति:</td>
                <td><strong>${record.status}</strong></td>
              </tr>
            </table>

            <div class="ecd-banner">
              <div class="ecd-title">संभावित प्रसव दिनांक (Expected Calving Date): ${record.expectedCalvingDate}</div>
              <div style="font-size: 12px; color: #7e22ce; margin-top: 4px;">
                दूध सुखाने की दिनांक (Dry-Off Date): <strong>${record.dryOffDate}</strong>
              </div>
            </div>

            <div class="footer-strip">
              <div>
                <div>जारी दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
                <div>डिजिटल प्रमाणीकरण: SHA256-INAPH-COMPLIANT</div>
              </div>
              <div class="seal-box">
                हस्ताक्षर AI तकनीशियन / चिकित्सक
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    },

    // 7. UTILITY: Export Calving Schedule to CSV
    exportCalvingScheduleCsv: function () {
      const headers = ["RecordID", "DamTag", "Species", "Breed", "InseminationDate", "SireID", "Status", "DaysInGestation", "ExpectedCalvingDate", "DryOffDate", "OwnerName", "Mobile"];
      const rows = state.breedingRecords.map((r) => [
        r.recordId,
        r.damTag,
        r.species,
        r.breed,
        r.inseminationDate,
        `"${r.sireId}"`,
        r.status,
        r.daysInGestation,
        r.expectedCalvingDate,
        r.dryOffDate,
        `"${r.ownerName}"`,
        r.mobile
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `VETCARE_CALVING_SCHEDULES_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      notify("प्रसव अनुसूची CSV प्रारूप में निर्यात हुई!", "success");
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.BreedingReproductionManager = BreedingReproductionManager;

})(typeof window !== "undefined" ? window : this);
