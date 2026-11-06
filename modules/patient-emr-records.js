// Vetcare AI OS - Veterinary Electronic Medical Records (EMR), Longitudinal Case Sheets & OPD/IPD Tracking Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_PATIENTS = "patients";
  const STORE_RECORDS = "clinical_records";

  // Internal Module State
  const state = {
    patientsList: [],
    activePatientId: null,
    activeCaseHistory: [],
    searchQuery: "",
    speciesFilter: "all",
    statusFilter: "all",
    activeTab: "timeline", // 'timeline' | 'vaccination' | 'reproduction' | 'labs' | 'vitals'
    isRegisterModalOpen: false,
    isVitalsModalOpen: false,
    isIpdModalOpen: false,
    isDischargeModalOpen: false,
    isVaccineModalOpen: false,
    isReproModalOpen: false,
    isLabModalOpen: false,
    containerElement: null,
    db: null
  };

  // Species Reference Metadata & Iconography
  const SPECIES_CONFIG = {
    bovine: { label: "Bovine (गाय / Cattle)", icon: "fa-cow", color: "text-emerald-400", defaultTemp: 101.5, rumenNormal: "2-3 / 2min" },
    bubaline: { label: "Bubaline (भैंस / Buffalo)", icon: "fa-shield-dog", color: "text-amber-400", defaultTemp: 101.0, rumenNormal: "2-3 / 2min" },
    caprine: { label: "Caprine (बकरी / Goat)", icon: "fa-paw", color: "text-cyan-400", defaultTemp: 102.5, rumenNormal: "2-4 / 2min" },
    ovine: { label: "Ovine (भेड़ / Sheep)", icon: "fa-paw", color: "text-lime-400", defaultTemp: 102.0, rumenNormal: "2-4 / 2min" },
    equine: { label: "Equine (घोड़ा / Horse)", icon: "fa-horse", color: "text-purple-400", defaultTemp: 100.5, rumenNormal: "N/A (Cecal)" },
    canine: { label: "Canine (श्वान / Dog)", icon: "fa-dog", color: "text-rose-400", defaultTemp: 101.5, rumenNormal: "N/A (Monogastric)" },
    feline: { label: "Feline (मार्जार / Cat)", icon: "fa-cat", color: "text-pink-400", defaultTemp: 101.5, rumenNormal: "N/A (Monogastric)" },
    avian: { label: "Avian (कुक्कुट / Poultry)", icon: "fa-dove", color: "text-yellow-400", defaultTemp: 107.0, rumenNormal: "N/A (Gizzard)" }
  };

  // Seed Data Generator for New Clinical Deployments
  function generateSeedData() {
    const defaultPatients = [
      {
        patientId: "PAT-100293847561",
        tagNumber: "100293847561",
        microchipNo: "981098721625341",
        species: "bubaline",
        breed: "Murrah Buffalo",
        sex: "Female",
        ageYears: 5,
        ageMonths: 4,
        bodyWeightKg: 540,
        colorMarkings: "Jet black, tightly curled horns, white switch on tail",
        reproductiveStatus: "Pregnant (Month 4, 3rd Parity)",
        status: "IPD_Admitted",
        penNumber: "PEN-B-04",
        registeredAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        owner: {
          fullName: "Chaudhary Dharamvir Singh",
          mobileNumber: "9812039281",
          village: "Bhadurpur",
          district: "Karnal",
          state: "Haryana",
          aadhaarLast4: "8821"
        },
        initialComplaint: "Subacute Mastitis in left rear quarter, drop in milk yield, feverish.",
        initialVitals: {
          tempF: 102.8,
          heartRateBpm: 76,
          respRatePerMin: 28,
          rumenMotilityPer2Min: 1,
          crtSec: 2,
          hydrationPercent: 95
        }
      },
      {
        patientId: "PAT-100293847562",
        tagNumber: "100293847562",
        microchipNo: "981098721625342",
        species: "bovine",
        breed: "Sahiwal Indigenous",
        sex: "Female",
        ageYears: 4,
        ageMonths: 0,
        bodyWeightKg: 380,
        colorMarkings: "Reddish brown, loose skin, voluminous dewlap",
        reproductiveStatus: "Lactating (Non-Pregnant, Open)",
        status: "OPD",
        penNumber: null,
        registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        owner: {
          fullName: "Mahinder Rawat",
          mobileNumber: "9416182931",
          village: "Assandh",
          district: "Karnal",
          state: "Haryana",
          aadhaarLast4: "4920"
        },
        initialComplaint: "Anorexia, nasal discharge, reduced rumen contractions.",
        initialVitals: {
          tempF: 103.4,
          heartRateBpm: 82,
          respRatePerMin: 34,
          rumenMotilityPer2Min: 1,
          crtSec: 2.5,
          hydrationPercent: 92
        }
      },
      {
        patientId: "PAT-981098102938",
        tagNumber: "PET-DEL-8921",
        microchipNo: "981098102938471",
        species: "canine",
        breed: "Labrador Retriever",
        sex: "Male",
        ageYears: 3,
        ageMonths: 2,
        bodyWeightKg: 31.5,
        colorMarkings: "Yellow Golden, no white markings",
        reproductiveStatus: "Intact",
        status: "OPD",
        penNumber: null,
        registeredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        owner: {
          fullName: "Priya Sharma",
          mobileNumber: "9811203948",
          village: "Sector 14, Urban",
          district: "Gurugram",
          state: "Haryana",
          aadhaarLast4: "1923"
        },
        initialComplaint: "Pruritus, bilateral ear scratching, erythematous pinna.",
        initialVitals: {
          tempF: 101.6,
          heartRateBpm: 94,
          respRatePerMin: 22,
          rumenMotilityPer2Min: 0,
          crtSec: 1.5,
          hydrationPercent: 100
        }
      }
    ];

    const defaultRecords = [
      {
        recordId: "REC-2026-001",
        patientId: "PAT-100293847561",
        recordType: "consultation",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        attendingDoctor: "Dr. Rahul Sharma, MVSc (Medicine)",
        clinicalDiagnosis: "Clinical Coliform Mastitis (LR Quarter)",
        provisionalNotes: "Left hind quarter swollen, hot to touch, yellowish serous milk with clots. CMT Positive (Score 3).",
        prescriptions: [
          { drugName: "Ceftiofur Sodium Inj (Xyrofur 1g)", dose: "1.1 mg/kg IM", route: "Intramuscular", frequency: "OD", durationDays: 3 },
          { drugName: "Flunixin Meglumine Inj (Megludyne)", dose: "2.2 mg/kg IV Slow", route: "Intravenous", frequency: "OD", durationDays: 2 },
          { drugName: "Intramammary Cefquinome (Cobactan LC)", dose: "1 Syringe in LR Quarter", route: "Intramammary", frequency: "q12h", durationDays: 3 },
          { drugName: "Trisodium Citrate Oral (Mastilep Powder)", dose: "50g orally", route: "Oral", frequency: "OD", durationDays: 5 }
        ]
      },
      {
        recordId: "REC-2026-002",
        patientId: "PAT-100293847561",
        recordType: "vitals",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        tempF: 102.1,
        heartRateBpm: 70,
        respRatePerMin: 24,
        rumenMotilityPer2Min: 2,
        crtSec: 2,
        hydrationPercent: 96,
        feedIntake: "Moderate",
        notes: "Edema decreasing in LR quarter. Milk consistency normalizing."
      },
      {
        recordId: "REC-2026-003",
        patientId: "PAT-100293847561",
        recordType: "vitals",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        tempF: 101.4,
        heartRateBpm: 66,
        respRatePerMin: 22,
        rumenMotilityPer2Min: 2,
        crtSec: 1.5,
        hydrationPercent: 98,
        feedIntake: "Normal",
        notes: "Afebrile. Milking normally. Rumen motility fully restored."
      },
      {
        recordId: "REC-2026-004",
        patientId: "PAT-100293847561",
        recordType: "vaccination",
        timestamp: new Date(Date.now() - 86400000 * 60).toISOString(),
        vaccineName: "Raksha-Ovac (FMD Inactivated)",
        batchNumber: "FMD-2025-X09",
        manufacturer: "Indian Immunologicals Ltd",
        administeredBy: "Dr. A. Verma",
        nextDueDate: new Date(Date.now() + 86400000 * 120).toISOString().split("T")[0],
        status: "Completed"
      },
      {
        recordId: "REC-2026-005",
        patientId: "PAT-100293847561",
        recordType: "reproduction",
        timestamp: new Date(Date.now() - 86400000 * 120).toISOString(),
        eventType: "Artificial Insemination (AI)",
        bullId: "MURRAH-NDRI-M29",
        semenBatch: "M29-BATCH-778",
        technician: "Dr. R. Sharma",
        pdStatus: "Confirmed Pregnant (Via USG at 60 Days)",
        expectedCalvingDate: new Date(Date.now() + 86400000 * 190).toISOString().split("T")[0]
      },
      {
        recordId: "REC-2026-006",
        patientId: "PAT-100293847561",
        recordType: "lab",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        testName: "Milk Somatic Cell Count & CMT",
        resultSummary: "CMT Grade 3+, SCC > 1,500,000 cells/mL. Heavy Gram-negative bacillary load.",
        labTechnician: "NDRI Central Lab Hub",
        status: "Finalized"
      }
    ];

    return { defaultPatients, defaultRecords };
  }

  // IndexedDB Storage Engine
  function initDatabase() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve(state.db);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_PATIENTS)) {
          const pStore = db.createObjectStore(STORE_PATIENTS, { keyPath: "patientId" });
          pStore.createIndex("tagNumber", "tagNumber", { unique: false });
          pStore.createIndex("species", "species", { unique: false });
          pStore.createIndex("status", "status", { unique: false });
        }
        if (!db.objectStoreNames.contains(STORE_RECORDS)) {
          const rStore = db.createObjectStore(STORE_RECORDS, { keyPath: "recordId" });
          rStore.createIndex("patientId", "patientId", { unique: false });
          rStore.createIndex("recordType", "recordType", { unique: false });
          rStore.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
      req.onsuccess = function (e) {
        state.db = e.target.result;
        seedDatabaseIfEmpty().then(() => resolve(state.db));
      };
      req.onerror = function (err) {
        console.error("IndexedDB initialization failed", err);
        reject(err);
      };
    });
  }

  function seedDatabaseIfEmpty() {
    return new Promise((resolve) => {
      const tx = state.db.transaction([STORE_PATIENTS, STORE_RECORDS], "readwrite");
      const pStore = tx.objectStore(STORE_PATIENTS);
      const countReq = pStore.count();
      countReq.onsuccess = function () {
        if (countReq.result === 0) {
          const { defaultPatients, defaultRecords } = generateSeedData();
          defaultPatients.forEach((p) => pStore.put(p));
          const rStore = tx.objectStore(STORE_RECORDS);
          defaultRecords.forEach((r) => rStore.put(r));
        }
      };
      tx.oncomplete = function () {
        resolve();
      };
      tx.onerror = function () {
        resolve();
      };
    });
  }

  function dbGetAllPatients() {
    return new Promise((resolve, reject) => {
      const tx = state.db.transaction(STORE_PATIENTS, "readonly");
      const store = tx.objectStore(STORE_PATIENTS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = (e) => reject(e);
    });
  }

  function dbPutPatient(patient) {
    return new Promise((resolve, reject) => {
      const tx = state.db.transaction(STORE_PATIENTS, "readwrite");
      const store = tx.objectStore(STORE_PATIENTS);
      const req = store.put(patient);
      req.onsuccess = () => resolve(patient);
      req.onerror = (e) => reject(e);
    });
  }

  function dbGetPatientRecords(patientId) {
    return new Promise((resolve, reject) => {
      const tx = state.db.transaction(STORE_RECORDS, "readonly");
      const store = tx.objectStore(STORE_RECORDS);
      const index = store.index("patientId");
      const req = index.getAll(patientId);
      req.onsuccess = () => {
        const sorted = (req.result || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        resolve(sorted);
      };
      req.onerror = (e) => reject(e);
    });
  }

  function dbPutRecord(record) {
    return new Promise((resolve, reject) => {
      const tx = state.db.transaction(STORE_RECORDS, "readwrite");
      const store = tx.objectStore(STORE_RECORDS);
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = (e) => reject(e);
    });
  }

  // Toast Notification Helper (Binds to global App or builds fallback)
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[VETCARE ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Primary Module API Definition
  const PatientEmrRecords = {
    // 1. LIFECYCLE: Initialization
    init: async function () {
      try {
        await initDatabase();
        state.patientsList = await dbGetAllPatients();
        if (state.patientsList.length > 0 && !state.activePatientId) {
          state.activePatientId = state.patientsList[0].patientId;
          state.activeCaseHistory = await dbGetPatientRecords(state.activePatientId);
        }
        this.setupEventBus();
        return true;
      } catch (err) {
        console.error("Failed to initialize PatientEmrRecords module:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: async function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("EMR Container element not found:", containerId);
        return;
      }
      state.containerElement = container;

      // Refresh patients list from database
      await this.refreshState();

      // Build Top Shell UI
      container.innerHTML = `
        <div id="vetcare-emr-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-12">
          <!-- Top Executive EMR Clinical Metrics -->
          ${this.buildHeaderStatsHtml()}

          <!-- Tactical Filter & Quick Action Strip -->
          ${this.buildActionBarHtml()}

          <!-- Split Workstation EMR Canvas -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left Pane: Patient Directory (Cols 1-4) -->
            <div class="lg:col-span-4 flex flex-col gap-3">
              ${this.buildLeftDirectoryHtml()}
            </div>

            <!-- Right Pane: Comprehensive Patient Chart & Medical Dossier (Cols 5-12) -->
            <div class="lg:col-span-8 flex flex-col gap-5">
              ${this.buildRightPatientChartHtml()}
            </div>
          </div>

          <!-- Modals Insertion Mounts -->
          <div id="emr-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._prescriptionListener) {
        window.removeEventListener("prescription:saved", this._prescriptionListener);
        window.removeEventListener("vetcare:prescription-saved", this._prescriptionListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    // EVENT BUS INTEGRATION
    setupEventBus: function () {
      const handlePrescription = async (evt) => {
        const payload = evt.detail;
        if (!payload || !state.activePatientId) return;

        const newConsultationRecord = {
          recordId: "REC-RX-" + Date.now(),
          patientId: state.activePatientId,
          recordType: "consultation",
          timestamp: new Date().toISOString(),
          attendingDoctor: payload.doctorName || "Dr. Rahul Sharma, MVSc",
          clinicalDiagnosis: payload.diagnosis || "OPD Clinical Consultation",
          provisionalNotes: payload.clinicalNotes || "Prescription generated via Clinical OPD Console.",
          prescriptions: payload.drugs || []
        };

        await dbPutRecord(newConsultationRecord);
        if (state.activePatientId) {
          state.activeCaseHistory = await dbGetPatientRecords(state.activePatientId);
        }
        notify("नया नैदानिक पर्चा (Prescription) EMR टाइमलाइन में दर्ज हुआ!", "success");
        this.renderRightPane();
      };

      this._prescriptionListener = handlePrescription;
      window.addEventListener("prescription:saved", handlePrescription);
      window.addEventListener("vetcare:prescription-saved", handlePrescription);
    },

    broadcastActivePatient: function (patient) {
      if (!patient) return;
      const detail = {
        patientId: patient.patientId,
        tagNumber: patient.tagNumber,
        species: patient.species,
        breed: patient.breed,
        bodyWeightKg: patient.bodyWeightKg,
        reproductiveStatus: patient.reproductiveStatus,
        owner: patient.owner
      };
      window.dispatchEvent(new CustomEvent("patient:selected", { detail }));
      window.dispatchEvent(new CustomEvent("vetcare:patient-selected", { detail }));
    },

    refreshState: async function () {
      state.patientsList = await dbGetAllPatients();
      if (state.activePatientId) {
        state.activeCaseHistory = await dbGetPatientRecords(state.activePatientId);
      } else if (state.patientsList.length > 0) {
        state.activePatientId = state.patientsList[0].patientId;
        state.activeCaseHistory = await dbGetPatientRecords(state.activePatientId);
      }
    },

    // HTML VIEW BUILDERS
    buildHeaderStatsHtml: function () {
      const total = state.patientsList.length;
      const opdCount = state.patientsList.filter((p) => p.status === "OPD").length;
      const ipdCount = state.patientsList.filter((p) => p.status === "IPD_Admitted").length;
      const criticalCount = state.patientsList.filter((p) => p.status === "Critical").length;

      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">कुल पंजीकृत पशु (Total Registry)</div>
              <div class="text-2xl font-display font-black text-white mt-1">${total} <span class="text-xs font-normal text-slate-400">जीव</span></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
              <i class="fa-solid fa-folder-tree"></i>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">आज के सक्रिय OPD (Day OPD)</div>
              <div class="text-2xl font-display font-black text-cyan-400 mt-1">${opdCount} <span class="text-xs font-normal text-slate-400">प्रकरण</span></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
              <i class="fa-solid fa-stethoscope"></i>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">IPD भर्ती (Indoor Inpatients)</div>
              <div class="text-2xl font-display font-black text-amber-400 mt-1">${ipdCount} <span class="text-xs font-normal text-slate-400">पशु</span></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
              <i class="fa-solid fa-hospital-user"></i>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">आपातकालीन/गंभीर (Critical Alert)</div>
              <div class="text-2xl font-display font-black text-rose-400 mt-1">${criticalCount} <span class="text-xs font-normal text-slate-400">सतर्क</span></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xl">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
        </div>
      `;
    },

    buildActionBarHtml: function () {
      return `
        <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <!-- Instant Search Box -->
          <div class="relative flex-1 min-w-[260px]">
            <input 
              type="text" 
              id="emrLiveSearchInput" 
              value="${this.escapeHtml(state.searchQuery)}"
              placeholder="12-अंकीय टैग नं., पशुपालक का नाम, फोन या माइक्रोचिप खोजें..." 
              class="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            ${state.searchQuery ? `
              <button id="emrClearSearchBtn" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white">
                <i class="fa-solid fa-xmark"></i>
              </button>
            ` : ""}
          </div>

          <!-- Filters & Registration CTA -->
          <div class="flex flex-wrap items-center gap-2.5">
            <!-- Species Dropdown -->
            <select id="emrSpeciesSelect" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="all" ${state.speciesFilter === "all" ? "selected" : ""}>समस्त प्रजातियां (All Species)</option>
              <option value="bovine" ${state.speciesFilter === "bovine" ? "selected" : ""}>Bovine (गाय / Cattle)</option>
              <option value="bubaline" ${state.speciesFilter === "bubaline" ? "selected" : ""}>Bubaline (भैंस / Buffalo)</option>
              <option value="caprine" ${state.speciesFilter === "caprine" ? "selected" : ""}>Caprine (बकरी / Goat)</option>
              <option value="ovine" ${state.speciesFilter === "ovine" ? "selected" : ""}>Ovine (भेड़ / Sheep)</option>
              <option value="equine" ${state.speciesFilter === "equine" ? "selected" : ""}>Equine (अश्व / Horse)</option>
              <option value="canine" ${state.speciesFilter === "canine" ? "selected" : ""}>Canine (श्वान / Dog)</option>
              <option value="feline" ${state.speciesFilter === "feline" ? "selected" : ""}>Feline (मार्जार / Cat)</option>
              <option value="avian" ${state.speciesFilter === "avian" ? "selected" : ""}>Avian (पक्षी / Poultry)</option>
            </select>

            <!-- Status Filter Dropdown -->
            <select id="emrStatusSelect" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="all" ${state.statusFilter === "all" ? "selected" : ""}>समस्त स्थिति (All Status)</option>
              <option value="OPD" ${state.statusFilter === "OPD" ? "selected" : ""}>ओपीडी (OPD Active)</option>
              <option value="IPD_Admitted" ${state.statusFilter === "IPD_Admitted" ? "selected" : ""}>आईपीडी भर्ती (IPD Inpatient)</option>
              <option value="Critical" ${state.statusFilter === "Critical" ? "selected" : ""}>गंभीर (Critical)</option>
              <option value="Discharged" ${state.statusFilter === "Discharged" ? "selected" : ""}>डिस्चार्ज्ड (Discharged)</option>
            </select>

            <!-- Register New Animal CTA -->
            <button id="emrOpenRegisterModalBtn" type="button" class="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 active:scale-95 transition-all">
              <i class="fa-solid fa-plus-circle text-sm"></i>
              <span>+ नया पशु केस शीट दर्ज करें</span>
            </button>
          </div>
        </div>
      `;
    },

    buildLeftDirectoryHtml: function () {
      let filtered = state.patientsList.filter((p) => {
        const matchesSpecies = state.speciesFilter === "all" || p.species === state.speciesFilter;
        const matchesStatus = state.statusFilter === "all" || p.status === state.statusFilter;
        const q = state.searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          (p.tagNumber && p.tagNumber.toLowerCase().includes(q)) ||
          (p.microchipNo && p.microchipNo.toLowerCase().includes(q)) ||
          (p.owner.fullName && p.owner.fullName.toLowerCase().includes(q)) ||
          (p.owner.mobileNumber && p.owner.mobileNumber.includes(q)) ||
          (p.owner.village && p.owner.village.toLowerCase().includes(q));

        return matchesSpecies && matchesStatus && matchesQuery;
      });

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 flex flex-col h-[740px]">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span class="text-xs font-mono font-bold uppercase text-slate-300">
              पंजीकृत रोगी सूची (${filtered.length})
            </span>
            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
              लाइव सिंक
            </span>
          </div>

          <!-- Cards Scrollable Area -->
          <div class="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            ${
              filtered.length === 0
                ? `
              <div class="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <i class="fa-solid fa-folder-open text-3xl mb-2 text-slate-600"></i>
                <div class="text-xs font-semibold">कोई पशु रिकॉर्ड नहीं मिला</div>
                <div class="text-[11px] mt-1 text-slate-600">खोज मापदंड बदलें अथवा नया पशु पंजीकरण करें।</div>
              </div>
            `
                : filtered
                    .map((p) => {
                      const isActive = p.patientId === state.activePatientId;
                      const spec = SPECIES_CONFIG[p.species] || { icon: "fa-paw", color: "text-slate-400" };
                      let statusBadge = "";

                      if (p.status === "IPD_Admitted") {
                        statusBadge = `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"><i class="fa-solid fa-bed mr-1"></i>IPD ${p.penNumber || ""}</span>`;
                      } else if (p.status === "Critical") {
                        statusBadge = `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30"><i class="fa-solid fa-triangle-exclamation mr-1"></i>CRITICAL</span>`;
                      } else if (p.status === "Discharged") {
                        statusBadge = `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-700 text-slate-300">DISCHARGED</span>`;
                      } else {
                        statusBadge = `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">OPD</span>`;
                      }

                      return `
                  <div 
                    data-patient-card-id="${p.patientId}" 
                    class="emr-patient-card p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? "bg-slate-800/95 border-emerald-500 shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/50"
                        : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700"
                    }"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-lg ${spec.color}">
                          <i class="fa-solid ${spec.icon}"></i>
                        </div>
                        <div>
                          <div class="text-xs font-mono font-bold text-white tracking-wide flex items-center gap-1.5">
                            <span>${p.tagNumber}</span>
                            ${p.microchipNo ? '<i class="fa-solid fa-microchip text-[10px] text-cyan-400" title="Microchipped"></i>' : ""}
                          </div>
                          <div class="text-[11px] text-slate-400 font-medium">${p.breed} • ${p.sex} (${p.ageYears}y)</div>
                        </div>
                      </div>
                      <div>${statusBadge}</div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <div class="truncate max-w-[170px]">
                        <i class="fa-solid fa-user-circle mr-1 text-slate-500"></i>
                        <span class="text-slate-300 font-semibold">${p.owner.fullName}</span>
                      </div>
                      <div class="font-mono text-slate-500">${p.owner.village}</div>
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>
        </div>
      `;
    },

    buildRightPatientChartHtml: function () {
      const p = state.patientsList.find((item) => item.patientId === state.activePatientId);
      if (!p) {
        return `
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-12 text-center text-slate-400 h-[740px] flex flex-col items-center justify-center">
            <i class="fa-solid fa-notes-medical text-5xl mb-4 text-slate-600"></i>
            <h3 class="text-lg font-bold text-white">कोई सक्रिय पशु चयनित नहीं है</h3>
            <p class="text-xs text-slate-400 max-w-sm mt-1">बाईं सूची में से किसी पशु को चुनें अथवा नया केस शीट बनाएं।</p>
          </div>
        `;
      }

      const spec = SPECIES_CONFIG[p.species] || { label: p.species, icon: "fa-paw", color: "text-emerald-400" };

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col h-[740px] overflow-hidden">
          <!-- Patient Biometric Master Banner -->
          <div class="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <!-- Left: Identity & Breed -->
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700/80 flex items-center justify-center text-2xl ${spec.color} shadow-inner">
                  <i class="fa-solid ${spec.icon}"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-lg sm:text-xl font-display font-black text-white tracking-wide">${p.tagNumber}</h2>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      ${spec.label}
                    </span>
                    ${
                      p.status === "IPD_Admitted"
                        ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">IPD: ${p.penNumber || "Main Ward"}</span>`
                        : `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">OPD ACTIVE</span>`
                    }
                  </div>
                  <div class="text-xs text-slate-400 mt-0.5">
                    <strong>${p.breed}</strong> • ${p.sex} • आयु: ${p.ageYears} वर्ष ${p.ageMonths || 0} माह • शारीरिक वजन: <strong class="text-emerald-400 font-mono">${p.bodyWeightKg} Kg</strong>
                  </div>
                  <div class="text-[11px] text-slate-400 mt-0.5">
                    <i class="fa-solid fa-venus-mars mr-1 text-purple-400"></i>गर्भ स्थिति: <span class="text-purple-300 font-semibold">${p.reproductiveStatus}</span> | पहचान चिह्न: ${p.colorMarkings}
                  </div>
                </div>
              </div>

              <!-- Right: Quick Workflow Action Triggers -->
              <div class="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
                <button id="emrBtnLaunchRx" type="button" class="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 flex items-center gap-1.5 transition-all">
                  <i class="fa-solid fa-file-prescription"></i>
                  <span>प्रिस्क्रिप्शन लिखें (Rx)</span>
                </button>
                <button id="emrBtnAddVitals" type="button" class="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1.5 transition-all">
                  <i class="fa-solid fa-heart-pulse"></i>
                  <span>वाइटल्स दर्ज करें</span>
                </button>
                <button id="emrBtnToggleIpd" type="button" class="px-3 py-2 rounded-xl text-xs font-bold ${
                  p.status === "IPD_Admitted" ? "bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/40" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                } flex items-center gap-1.5 transition-all">
                  <i class="fa-solid fa-bed"></i>
                  <span>${p.status === "IPD_Admitted" ? "डिस्चार्ज करें (Discharge)" : "IPD भर्ती करें"}</span>
                </button>
                <button id="emrBtnPrintPassport" type="button" title="Print Health Dossier" class="px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <i class="fa-solid fa-print"></i>
                </button>
                <button id="emrBtnExportJson" type="button" title="Export JSON Dossier" class="px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <i class="fa-solid fa-download"></i>
                </button>
              </div>
            </div>

            <!-- Owner & Caretaker Details Sub-Bar -->
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div class="flex items-center gap-4">
                <div><i class="fa-solid fa-user text-slate-500 mr-1.5"></i>मालिक: <strong class="text-white">${p.owner.fullName}</strong></div>
                <div><i class="fa-solid fa-phone text-slate-500 mr-1.5"></i>मोबाइल: <strong class="text-white font-mono">${p.owner.mobileNumber}</strong></div>
                <div><i class="fa-solid fa-location-dot text-slate-500 mr-1.5"></i>ग्राम: <span class="text-slate-300">${p.owner.village}, ${p.owner.district} (${p.owner.state})</span></div>
              </div>
              <div class="font-mono text-[11px] text-slate-400">
                दर्ज तिथि: ${new Date(p.registeredAt).toLocaleDateString("hi-IN")}
              </div>
            </div>
          </div>

          <!-- Medical Record Tabs Navigation -->
          <div class="flex items-center px-4 border-b border-slate-800 bg-slate-950/70 overflow-x-auto gap-1">
            <button data-emr-tab="timeline" class="emr-tab-btn px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              state.activeTab === "timeline" ? "border-emerald-500 text-emerald-400 bg-slate-900/40" : "border-transparent text-slate-400 hover:text-white"
            }">
              <i class="fa-solid fa-timeline"></i>
              <span>नैदानिक टाइमलाइन (${state.activeCaseHistory.filter((r) => r.recordType === "consultation").length})</span>
            </button>

            <button data-emr-tab="vitals" class="emr-tab-btn px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              state.activeTab === "vitals" ? "border-emerald-500 text-emerald-400 bg-slate-900/40" : "border-transparent text-slate-400 hover:text-white"
            }">
              <i class="fa-solid fa-chart-line"></i>
              <span>दैनिक वाइटल्स चार्ट (${state.activeCaseHistory.filter((r) => r.recordType === "vitals").length})</span>
            </button>

            <button data-emr-tab="vaccination" class="emr-tab-btn px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              state.activeTab === "vaccination" ? "border-emerald-500 text-emerald-400 bg-slate-900/40" : "border-transparent text-slate-400 hover:text-white"
            }">
              <i class="fa-solid fa-syringe"></i>
              <span>टीकाकरण व कृमिनाशक (${state.activeCaseHistory.filter((r) => r.recordType === "vaccination").length})</span>
            </button>

            <button data-emr-tab="reproduction" class="emr-tab-btn px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              state.activeTab === "reproduction" ? "border-emerald-500 text-emerald-400 bg-slate-900/40" : "border-transparent text-slate-400 hover:text-white"
            }">
              <i class="fa-solid fa-dna"></i>
              <span>प्रजनन व कृत्रिम गर्भाधान (${state.activeCaseHistory.filter((r) => r.recordType === "reproduction").length})</span>
            </button>

            <button data-emr-tab="labs" class="emr-tab-btn px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              state.activeTab === "labs" ? "border-emerald-500 text-emerald-400 bg-slate-900/40" : "border-transparent text-slate-400 hover:text-white"
            }">
              <i class="fa-solid fa-microscope"></i>
              <span>लैब रिपोर्ट व जांच (${state.activeCaseHistory.filter((r) => r.recordType === "lab").length})</span>
            </button>
          </div>

          <!-- Tab Content Display Area -->
          <div class="flex-1 overflow-y-auto p-5 custom-scrollbar bg-slate-950/30">
            ${this.renderActiveTabContent(p)}
          </div>
        </div>
      `;
    },

    renderActiveTabContent: function (patient) {
      switch (state.activeTab) {
        case "timeline":
          return this.renderTabTimeline(patient);
        case "vitals":
          return this.renderTabVitals(patient);
        case "vaccination":
          return this.renderTabVaccination(patient);
        case "reproduction":
          return this.renderTabReproduction(patient);
        case "labs":
          return this.renderTabLabs(patient);
        default:
          return `<div class="text-xs text-slate-500">चयनित मॉड्यूल उपलब्ध नहीं है।</div>`;
      }
    },

    // TAB 1: Clinical Consultations & Rx Timeline
    renderTabTimeline: function (patient) {
      const records = state.activeCaseHistory.filter((r) => r.recordType === "consultation");

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <h4 class="text-xs font-mono font-bold uppercase text-slate-300">
              लॉन्गिट्यूडिनल क्लिनिकल केस शीट व पर्चा इतिहास
            </h4>
            <button id="emrBtnAddNewCaseSheet" class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
              <i class="fa-solid fa-plus-circle"></i> नई क्लिनिकल एंट्री जोड़ें
            </button>
          </div>

          ${
            records.length === 0
              ? `
            <div class="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
              कोई पूर्व परामर्श इतिहास उपलब्ध नहीं है। ऊपर दिए बटन से प्रथम प्रिस्क्रिप्शन दर्ज करें।
            </div>
          `
              : records
                  .map((rec, index) => {
                    const dateFormatted = new Date(rec.timestamp).toLocaleString("hi-IN", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    });

                    return `
                <div class="relative pl-6 pb-6 border-l-2 border-emerald-500/30 last:border-l-0">
                  <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>

                  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                      <div>
                        <div class="text-sm font-bold text-white flex items-center gap-2">
                          <span>${rec.clinicalDiagnosis}</span>
                          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            Visit #${records.length - index}
                          </span>
                        </div>
                        <div class="text-[11px] font-mono text-slate-400 mt-0.5">
                          <i class="fa-solid fa-user-doctor text-emerald-400 mr-1"></i>${rec.attendingDoctor}
                        </div>
                      </div>
                      <div class="text-[11px] font-mono text-slate-400">
                        <i class="fa-solid fa-calendar mr-1"></i>${dateFormatted}
                      </div>
                    </div>

                    <div class="mt-3 text-xs text-slate-300 leading-relaxed">
                      <strong>नैदानिक अवलोकन (Notes):</strong> ${rec.provisionalNotes || "कोई अतिरिक्त नोट नहीं।"}
                    </div>

                    ${
                      rec.prescriptions && rec.prescriptions.length > 0
                        ? `
                      <div class="mt-3 pt-3 border-t border-slate-800">
                        <div class="text-[11px] font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                          <i class="fa-solid fa-pills text-emerald-400"></i>
                          <span>निर्धारित औषधियां (Prescribed Pharmacopeia):</span>
                        </div>
                        <div class="overflow-x-auto">
                          <table class="w-full text-left text-xs">
                            <thead class="text-[10px] font-mono uppercase text-slate-400 bg-slate-950/70">
                              <tr>
                                <th class="px-3 py-1.5 rounded-l">औषधि नाम (Drug Name)</th>
                                <th class="px-3 py-1.5">खुराक (Dose)</th>
                                <th class="px-3 py-1.5">मार्ग (Route)</th>
                                <th class="px-3 py-1.5">आवृत्ति (Freq)</th>
                                <th class="px-3 py-1.5 rounded-r">अवधि (Days)</th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800/60 font-mono">
                              ${rec.prescriptions
                                .map(
                                  (med) => `
                                <tr>
                                  <td class="px-3 py-2 text-white font-sans font-semibold">${med.drugName}</td>
                                  <td class="px-3 py-2 text-emerald-400">${med.dose}</td>
                                  <td class="px-3 py-2 text-slate-300">${med.route}</td>
                                  <td class="px-3 py-2 text-amber-400">${med.frequency}</td>
                                  <td class="px-3 py-2 text-slate-300">${med.durationDays} दिन</td>
                                </tr>
                              `
                                )
                                .join("")}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
                  })
                  .join("")
          }
        </div>
      `;
    },

    // TAB 2: Vitals Progression & ICU Monitoring
    renderTabVitals: function (patient) {
      const records = state.activeCaseHistory.filter((r) => r.recordType === "vitals");
      const spec = SPECIES_CONFIG[patient.species] || { defaultTemp: 101.5, rumenNormal: "2-3 / 2min" };

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h4 class="text-xs font-mono font-bold uppercase text-slate-300">
                दैनिक वाइटल संकेत प्रगति चार्ट (Vitals Progression)
              </h4>
              <p class="text-[11px] text-slate-400">मानक शारीरिक तापमान: ${spec.defaultTemp}°F | रूमेन संकुचन: ${spec.rumenNormal}</p>
            </div>
            <button id="emrBtnAddNewVitalsTab" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md">
              <i class="fa-solid fa-heart-pulse"></i> + नया वाइटल्स मापें
            </button>
          </div>

          ${
            records.length === 0
              ? `
            <div class="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
              अभी तक कोई दैनिक वाइटल संकेत दर्ज नहीं किए गए हैं।
            </div>
          `
              : `
            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950/80 border-b border-slate-800">
                  <tr>
                    <th class="px-3 py-2.5">दिनांक व समय</th>
                    <th class="px-3 py-2.5">तापमान (°F)</th>
                    <th class="px-3 py-2.5">हृदय गति (BPM)</th>
                    <th class="px-3 py-2.5">श्वसन गति (/min)</th>
                    <th class="px-3 py-2.5">रूमेन गति (/2min)</th>
                    <th class="px-3 py-2.5">CRT / हाइड्रेशन</th>
                    <th class="px-3 py-2.5">आहार स्थिति</th>
                    <th class="px-3 py-2.5 font-sans">टिप्पणी</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${records
                    .map((v) => {
                      const dt = new Date(v.timestamp).toLocaleString("hi-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      });
                      const isFever = v.tempF > spec.defaultTemp + 1.2;
                      return `
                      <tr class="hover:bg-slate-850/50">
                        <td class="px-3 py-2.5 text-slate-300 font-sans">${dt}</td>
                        <td class="px-3 py-2.5 ${isFever ? "text-rose-400 font-bold" : "text-emerald-400"}">
                          ${v.tempF}°F ${isFever ? '<i class="fa-solid fa-fire text-[10px] ml-0.5"></i>' : ""}
                        </td>
                        <td class="px-3 py-2.5 text-slate-200">${v.heartRateBpm}</td>
                        <td class="px-3 py-2.5 text-slate-200">${v.respRatePerMin}</td>
                        <td class="px-3 py-2.5 text-amber-300">${v.rumenMotilityPer2Min || "0"} / 2min</td>
                        <td class="px-3 py-2.5 text-cyan-300">${v.crtSec || 2}s (${v.hydrationPercent || 95}%)</td>
                        <td class="px-3 py-2.5 text-slate-300">${v.feedIntake || "Normal"}</td>
                        <td class="px-3 py-2.5 font-sans text-slate-400 truncate max-w-[200px]">${v.notes || "—"}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          `
          }
        </div>
      `;
    },

    // TAB 3: Vaccination & Preventive Deworming
    renderTabVaccination: function (patient) {
      const records = state.activeCaseHistory.filter((r) => r.recordType === "vaccination");

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h4 class="text-xs font-mono font-bold uppercase text-slate-300">
                रोग प्रतिरक्षण (टीकाकरण) व कृमिनाशक लॉग
              </h4>
              <p class="text-[11px] text-slate-400">राष्ट्रीय पशु रोग नियंत्रण कार्यक्रम (NADCP) अनुपालन रिकॉर्ड</p>
            </div>
            <button id="emrBtnAddNewVaccineModal" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md">
              <i class="fa-solid fa-syringe"></i> + नया टीका दर्ज करें
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${
              records.length === 0
                ? `
              <div class="col-span-2 p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
                कोई टीकाकरण विवरण दर्ज नहीं है।
              </div>
            `
                : records
                    .map((v) => {
                      const dt = new Date(v.timestamp).toLocaleDateString("hi-IN");
                      return `
                  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          सक्रिय संरक्षण
                        </span>
                        <span class="text-[11px] font-mono text-slate-400">लगाया गया: ${dt}</span>
                      </div>
                      <div class="text-sm font-bold text-white mb-1">${v.vaccineName}</div>
                      <div class="text-xs text-slate-400 space-y-1 font-mono">
                        <div>बैच नं: <strong class="text-slate-200">${v.batchNumber || "N/A"}</strong></div>
                        <div>निर्माता: <span class="text-slate-300 font-sans">${v.manufacturer || "National Vet Labs"}</span></div>
                        <div>प्रशासक: <span class="text-slate-300 font-sans">${v.administeredBy || "Dr. Staff"}</span></div>
                      </div>
                    </div>
                    <div class="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span class="text-amber-400">आगामी देय तिथि (Due Date):</span>
                      <strong class="text-white">${v.nextDueDate || "वार्षिक (Annual)"}</strong>
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>
        </div>
      `;
    },

    // TAB 4: Reproduction & Breeding Lifecycle
    renderTabReproduction: function (patient) {
      const records = state.activeCaseHistory.filter((r) => r.recordType === "reproduction");

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h4 class="text-xs font-mono font-bold uppercase text-slate-300">
                प्रजनन जीवनचक्र, AI एवं ब्यात विवरण
              </h4>
              <p class="text-[11px] text-slate-400">वर्तमान स्थिति: <strong class="text-purple-400">${patient.reproductiveStatus}</strong></p>
            </div>
            <button id="emrBtnAddNewReproModal" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md">
              <i class="fa-solid fa-dna"></i> + नई AI / PD एंट्री
            </button>
          </div>

          <div class="space-y-3">
            ${
              records.length === 0
                ? `
              <div class="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
                कोई प्रजनन या कृत्रिम गर्भाधान रिकॉर्ड उपलब्ध नहीं है।
              </div>
            `
                : records
                    .map((r) => {
                      const dt = new Date(r.timestamp).toLocaleDateString("hi-IN");
                      return `
                  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white uppercase">${r.eventType}</span>
                        <span class="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                          ${r.pdStatus || "In Process"}
                        </span>
                      </div>
                      <div class="text-xs text-slate-400 font-mono">
                        सांड सीमन ID: <strong class="text-emerald-400">${r.bullId || "N/A"}</strong> | बैच: ${r.semenBatch || "N/A"}
                      </div>
                      <div class="text-[11px] text-slate-500">
                        गर्भाधानकर्ता: ${r.technician || "Authorized AI Tech"} • तिथि: ${dt}
                      </div>
                    </div>
                    <div class="text-left md:text-right font-mono text-xs">
                      <div class="text-slate-400">संभावित प्रसव तिथि (EDC):</div>
                      <div class="text-amber-400 font-bold text-sm">${r.expectedCalvingDate || "अपुष्ट (Pending PD)"}</div>
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>
        </div>
      `;
    },

    // TAB 5: Laboratory & Diagnostic Reports
    renderTabLabs: function (patient) {
      const records = state.activeCaseHistory.filter((r) => r.recordType === "lab");

      return `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h4 class="text-xs font-mono font-bold uppercase text-slate-300">
                पैथोलॉजी, दुग्ध जांच एवं प्रयोगशाला परीक्षण
              </h4>
              <p class="text-[11px] text-slate-400">CBC, CMT, मूत्र विश्लेषण, सीरोलॉजी व इमेजिंग परिणाम</p>
            </div>
            <button id="emrBtnAddNewLabModal" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md">
              <i class="fa-solid fa-flask"></i> + नई लैब जांच संलग्न करें
            </button>
          </div>

          <div class="space-y-3">
            ${
              records.length === 0
                ? `
              <div class="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
                कोई लैब रिपोर्ट उपलब्ध नहीं है।
              </div>
            `
                : records
                    .map((l) => {
                      const dt = new Date(l.timestamp).toLocaleDateString("hi-IN");
                      return `
                  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div class="font-bold text-white text-xs flex items-center gap-2">
                        <i class="fa-solid fa-vial-virus text-cyan-400"></i>
                        <span>${l.testName}</span>
                      </div>
                      <span class="text-[10px] font-mono text-slate-400">${dt}</span>
                    </div>
                    <div class="mt-2.5 text-xs text-slate-200 leading-relaxed font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                      ${l.resultSummary}
                    </div>
                    <div class="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>परीक्षण केंद्र: ${l.labTechnician || "District Vet Diagnostic Lab"}</span>
                      <span class="text-emerald-400 font-semibold">${l.status || "सत्यापित"}</span>
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>
        </div>
      `;
    },

    // EVENT BINDINGS FOR ALL CONTROLS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Live Search Input
      const searchInput = container.querySelector("#emrLiveSearchInput");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          state.searchQuery = e.target.value;
          this.renderLeftDirectory();
        });
      }

      const clearSearchBtn = container.querySelector("#emrClearSearchBtn");
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
          state.searchQuery = "";
          this.renderLeftDirectory();
        });
      }

      // 2. Species Filter Dropdown
      const speciesSelect = container.querySelector("#emrSpeciesSelect");
      if (speciesSelect) {
        speciesSelect.addEventListener("change", (e) => {
          state.speciesFilter = e.target.value;
          this.renderLeftDirectory();
        });
      }

      // 3. Status Filter Dropdown
      const statusSelect = container.querySelector("#emrStatusSelect");
      if (statusSelect) {
        statusSelect.addEventListener("change", (e) => {
          state.statusFilter = e.target.value;
          this.renderLeftDirectory();
        });
      }

      // 4. Open Patient Registration Modal Button
      const openRegBtn = container.querySelector("#emrOpenRegisterModalBtn");
      if (openRegBtn) {
        openRegBtn.addEventListener("click", () => {
          this.openRegistrationModal();
        });
      }

      // 5. Patient Selection Cards (Left Pane Delegation)
      container.addEventListener("click", async (e) => {
        const card = e.target.closest(".emr-patient-card");
        if (card) {
          const patientId = card.getAttribute("data-patient-card-id");
          if (patientId && patientId !== state.activePatientId) {
            state.activePatientId = patientId;
            state.activeCaseHistory = await dbGetPatientRecords(patientId);
            this.renderLeftDirectory();
            this.renderRightPane();
            const p = state.patientsList.find((item) => item.patientId === patientId);
            this.broadcastActivePatient(p);
          }
        }
      });

      // 6. Tabs Navigation Click Delegation
      container.addEventListener("click", (e) => {
        const tabBtn = e.target.closest(".emr-tab-btn");
        if (tabBtn) {
          const tab = tabBtn.getAttribute("data-emr-tab");
          if (tab) {
            state.activeTab = tab;
            this.renderRightPane();
          }
        }
      });

      // 7. Right Action Bar: Launch Rx Button
      const btnRx = container.querySelector("#emrBtnLaunchRx");
      if (btnRx) {
        btnRx.addEventListener("click", () => {
          const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
          if (patient) {
            this.broadcastActivePatient(patient);
            notify(`ओपीडी प्रिस्क्रिप्शन कंसोल सक्रिय: ${patient.tagNumber}`, "info");
            // If Prescription Module is present, scroll or focus
            const rxElement = document.getElementById("doctor-intake") || document.getElementById("opd-prescription-section");
            if (rxElement) {
              rxElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      }

      // 8. Right Action Bar: Add Vitals Modal Trigger
      const btnAddVitals = container.querySelector("#emrBtnAddVitals");
      if (btnAddVitals) {
        btnAddVitals.addEventListener("click", () => this.openVitalsModal());
      }
      const btnAddVitalsTab = container.querySelector("#emrBtnAddNewVitalsTab");
      if (btnAddVitalsTab) {
        btnAddVitalsTab.addEventListener("click", () => this.openVitalsModal());
      }

      // 9. Right Action Bar: IPD Admission / Discharge Trigger
      const btnToggleIpd = container.querySelector("#emrBtnToggleIpd");
      if (btnToggleIpd) {
        btnToggleIpd.addEventListener("click", () => {
          const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
          if (!patient) return;
          if (patient.status === "IPD_Admitted") {
            this.openDischargeModal(patient);
          } else {
            this.openIpdModal(patient);
          }
        });
      }

      // 10. Right Action Bar: Print Passport & Export JSON
      const btnPrint = container.querySelector("#emrBtnPrintPassport");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => {
          if (state.activePatientId) this.printHealthPassport(state.activePatientId);
        });
      }

      const btnExport = container.querySelector("#emrBtnExportJson");
      if (btnExport) {
        btnExport.addEventListener("click", () => {
          if (state.activePatientId) this.exportPatientHistoryJson(state.activePatientId);
        });
      }

      // 11. Modal Add Buttons on Tabs
      const btnNewVaccine = container.querySelector("#emrBtnAddNewVaccineModal");
      if (btnNewVaccine) {
        btnNewVaccine.addEventListener("click", () => this.openVaccinationModal());
      }

      const btnNewRepro = container.querySelector("#emrBtnAddNewReproModal");
      if (btnNewRepro) {
        btnNewRepro.addEventListener("click", () => this.openReproductionModal());
      }

      const btnNewLab = container.querySelector("#emrBtnAddNewLabModal");
      if (btnNewLab) {
        btnNewLab.addEventListener("click", () => this.openLabModal());
      }

      const btnNewCaseSheet = container.querySelector("#emrBtnAddNewCaseSheet");
      if (btnNewCaseSheet) {
        btnNewCaseSheet.addEventListener("click", () => {
          const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
          if (patient) {
            this.broadcastActivePatient(patient);
            notify("नया क्लिनिकल केस शीट खोलने हेतु प्रिस्क्रिप्शन जनरेटर पर जाएं", "info");
          }
        });
      }
    },

    renderLeftDirectory: function () {
      const container = state.containerElement;
      if (!container) return;
      const leftCol = container.querySelector(".lg\\:col-span-4");
      if (leftCol) {
        leftCol.innerHTML = this.buildLeftDirectoryHtml();
      }
    },

    renderRightPane: function () {
      const container = state.containerElement;
      if (!container) return;
      const rightCol = container.querySelector(".lg\\:col-span-8");
      if (rightCol) {
        rightCol.innerHTML = this.buildRightPatientChartHtml();
        // Re-bind actions inside right pane
        this.bindUiEvents();
      }
    },

    // MODAL 1: NEW ANIMAL REGISTRATION (Demographics & Chief Complaint)
    openRegistrationModal: function () {
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrRegModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <i class="fa-solid fa-cow"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-lg text-white">नया पशु रोगी पंजीकरण (New Animal Registry)</h3>
                  <div class="text-[11px] font-mono text-slate-400">12-अंकीय राष्ट्रीय पशु टैग (INAPH / Bharat Pashudhan) या माइक्रोचिप</div>
                </div>
              </div>
              <button id="emrCloseRegModalBtn" type="button" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrNewPatientForm" class="space-y-4">
              <!-- Demographics Row 1 -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">12-अंकीय टैग नं. (Tag No.) *</label>
                  <input type="text" id="regTagNo" required maxlength="12" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" placeholder="100293847563" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">माइक्रोचिप / RFID (वैकल्पिक)</label>
                  <input type="text" id="regMicrochip" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" placeholder="981098721625..." />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">प्रजाति (Species) *</label>
                  <select id="regSpecies" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="bovine">Bovine (गाय / Cattle)</option>
                    <option value="bubaline">Bubaline (भैंस / Buffalo)</option>
                    <option value="caprine">Caprine (बकरी / Goat)</option>
                    <option value="ovine">Ovine (भेड़ / Sheep)</option>
                    <option value="equine">Equine (घोड़ा / Horse)</option>
                    <option value="canine">Canine (श्वान / Dog)</option>
                    <option value="feline">Feline (मार्जार / Cat)</option>
                    <option value="avian">Avian (कुक्कुट / Poultry)</option>
                  </select>
                </div>
              </div>

              <!-- Demographics Row 2 -->
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">नस्ल (Breed) *</label>
                  <input type="text" id="regBreed" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" placeholder="Murrah / Sahiwal / HF" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">लिंग (Sex) *</label>
                  <select id="regSex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="Female">मादा (Female)</option>
                    <option value="Male">नर (Male)</option>
                    <option value="Neutered/Castrated">बधियाकृत (Castrated)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">आयु (वर्ष / वर्ष.माह)</label>
                  <input type="number" id="regAge" step="0.5" min="0.1" value="3.5" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">वजन (Kg में) *</label>
                  <input type="number" id="regWeight" required min="1" max="1500" value="420" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <!-- Demographics Row 3: Reproduction & Markings -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">गर्भ / प्रजनन स्थिति (Repro Status)</label>
                  <select id="regReproStatus" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="Non-Pregnant (Open)">खुली / गैर-गर्भवती (Open)</option>
                    <option value="Pregnant (1st Trimester)">गाभिन (1st Trimester, 1-3 माह)</option>
                    <option value="Pregnant (2nd Trimester)">गाभिन (2nd Trimester, 4-6 माह)</option>
                    <option value="Pregnant (3rd Trimester)">गाभिन (3rd Trimester, 7-10 माह)</option>
                    <option value="Lactating (Dry)">दूध देने वाली (Lactating)</option>
                    <option value="Heifer">बछिया / हीफर (Heifer)</option>
                    <option value="Breeding Bull">प्रजनन सांड (Sire)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">पहचान चिह्न / रंग (Markings)</label>
                  <input type="text" id="regMarkings" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" placeholder="उदा: सफेद माथा, कटे हुए सींग" />
                </div>
              </div>

              <!-- Owner Information Banner -->
              <div class="pt-2 border-t border-slate-800">
                <div class="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-user-tag text-emerald-400"></i>
                  <span>पशुपालक / स्वामी विवरण (Owner Demographics)</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input type="text" id="regOwnerName" required placeholder="पशुपालक का नाम *" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <input type="tel" id="regOwnerPhone" required maxlength="10" placeholder="10-अंकीय मोबाइल नं. *" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <input type="text" id="regOwnerVillage" required placeholder="गांव / कस्बा *" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <!-- Initial Clinical Observation -->
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">मुख्य रोग शिकायत (Chief Clinical Complaint) *</label>
                <textarea id="regComplaint" required rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" placeholder="उदा: पिछले 2 दिन से चारा नहीं खा रही, बुखार 104°F, पेट में आफरा..."></textarea>
              </div>

              <!-- Submit Buttons -->
              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="regCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">रद्द करें</button>
                <button type="submit" class="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40">सुरक्षित दर्ज करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Modal Close Handlers
      const modal = document.getElementById("emrRegModal");
      const closeBtn = document.getElementById("emrCloseRegModalBtn");
      const cancelBtn = document.getElementById("regCancelBtn");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      if (closeBtn) closeBtn.addEventListener("click", closeAction);
      if (cancelBtn) cancelBtn.addEventListener("click", closeAction);

      // Submission
      const form = document.getElementById("emrNewPatientForm");
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const tagNumber = document.getElementById("regTagNo").value.trim();
          if (!tagNumber) return;

          // Check Tag Uniqueness
          const exists = state.patientsList.some((p) => p.tagNumber.toLowerCase() === tagNumber.toLowerCase());
          if (exists) {
            notify("चेतावनी: यह टैग नंबर पहले से सिस्टम में पंजीकृत है!", "error");
            return;
          }

          const newPatientObj = {
            patientId: "PAT-" + tagNumber,
            tagNumber: tagNumber,
            microchipNo: document.getElementById("regMicrochip").value.trim() || null,
            species: document.getElementById("regSpecies").value,
            breed: document.getElementById("regBreed").value.trim(),
            sex: document.getElementById("regSex").value,
            ageYears: parseFloat(document.getElementById("regAge").value) || 2,
            ageMonths: 0,
            bodyWeightKg: parseFloat(document.getElementById("regWeight").value) || 300,
            reproductiveStatus: document.getElementById("regReproStatus").value,
            colorMarkings: document.getElementById("regMarkings").value.trim() || "स्पष्ट पहचान",
            status: "OPD",
            penNumber: null,
            registeredAt: new Date().toISOString(),
            owner: {
              fullName: document.getElementById("regOwnerName").value.trim(),
              mobileNumber: document.getElementById("regOwnerPhone").value.trim(),
              village: document.getElementById("regOwnerVillage").value.trim(),
              district: "Karnal",
              state: "Haryana",
              aadhaarLast4: "—"
            },
            initialComplaint: document.getElementById("regComplaint").value.trim(),
            initialVitals: {
              tempF: 101.5,
              heartRateBpm: 72,
              respRatePerMin: 24,
              rumenMotilityPer2Min: 2,
              crtSec: 2,
              hydrationPercent: 95
            }
          };

          await dbPutPatient(newPatientObj);

          // Add initial consultation note
          const initialRecord = {
            recordId: "REC-INTAKE-" + Date.now(),
            patientId: newPatientObj.patientId,
            recordType: "consultation",
            timestamp: new Date().toISOString(),
            attendingDoctor: "Duty Veterinary Officer",
            clinicalDiagnosis: "प्रारंभिक ओपीडी पंजीकरण (Initial OPD Intake)",
            provisionalNotes: newPatientObj.initialComplaint,
            prescriptions: []
          };
          await dbPutRecord(initialRecord);

          closeAction();
          await this.refreshState();
          state.activePatientId = newPatientObj.patientId;
          state.activeCaseHistory = await dbGetPatientRecords(newPatientObj.patientId);

          notify(`नया पशु ${newPatientObj.tagNumber} सफलतापूर्वक दर्ज हुआ!`, "success");
          this.broadcastActivePatient(newPatientObj);
          this.renderLeftDirectory();
          this.renderRightPane();
        });
      }
    },

    // MODAL 2: DAILY VITALS ENTRY
    openVitalsModal: function () {
      const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
      if (!patient) return;
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      const spec = SPECIES_CONFIG[patient.species] || { defaultTemp: 101.5 };

      mount.innerHTML = `
        <div id="emrVitalsModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-heart-pulse text-cyan-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">वाइटल्स व शारीरिक लक्षण दर्ज करें (${patient.tagNumber})</h3>
              </div>
              <button id="emrCloseVitalsModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrVitalsForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">तापमान (°F) *</label>
                  <input type="number" id="vitTemp" step="0.1" required value="${spec.defaultTemp}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">हृदय गति (HR bpm)</label>
                  <input type="number" id="vitHr" required value="72" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">श्वसन गति (RR /min)</label>
                  <input type="number" id="vitRr" required value="24" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">रूमेन गति (/2min)</label>
                  <input type="number" id="vitRumen" value="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">CRT (कैपिलरी रिफिल सेकंड्स)</label>
                  <input type="number" id="vitCrt" step="0.5" value="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">आहार स्थिति (Feed Intake)</label>
                  <select id="vitFeed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500">
                    <option value="Normal">सामान्य चारा (Normal)</option>
                    <option value="Reduced">कम चारा (Reduced)</option>
                    <option value="Anorectic (Off Feed)">पूर्णतः बंद (Off Feed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">क्लिनिकल अवलोकन / टिप्पणी</label>
                <input type="text" id="vitNotes" placeholder="नेत्र श्लेष्मा, गोबर की स्थिति, जुगाली स्थिति..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="vitCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white">वाइटल्स सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("emrVitalsModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseVitalsModalBtn").addEventListener("click", closeAction);
      document.getElementById("vitCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrVitalsForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const vitalsObj = {
          recordId: "REC-VIT-" + Date.now(),
          patientId: patient.patientId,
          recordType: "vitals",
          timestamp: new Date().toISOString(),
          tempF: parseFloat(document.getElementById("vitTemp").value),
          heartRateBpm: parseInt(document.getElementById("vitHr").value, 10),
          respRatePerMin: parseInt(document.getElementById("vitRr").value, 10),
          rumenMotilityPer2Min: parseInt(document.getElementById("vitRumen").value, 10),
          crtSec: parseFloat(document.getElementById("vitCrt").value),
          feedIntake: document.getElementById("vitFeed").value,
          notes: document.getElementById("vitNotes").value.trim()
        };

        await dbPutRecord(vitalsObj);
        state.activeCaseHistory = await dbGetPatientRecords(patient.patientId);
        closeAction();
        notify("दैनिक वाइटल संकेत सुरक्षित किए गए।", "success");
        state.activeTab = "vitals";
        this.renderRightPane();
      });
    },

    // MODAL 3: IPD ADMISSION
    openIpdModal: function (patient) {
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrIpdModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-hospital-user text-amber-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">पशु अस्पताल IPD भर्ती (Inpatient Admission)</h3>
              </div>
              <button id="emrCloseIpdModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrIpdForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">वार्ड / पेन / केज नंबर (Ward Pen No.) *</label>
                <input type="text" id="ipdPenNo" required value="PEN-B-05" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">भर्ती का मुख्य कारण / नैदानिक टिप्पणी</label>
                <textarea id="ipdNotes" required rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500" placeholder="उदा: 24 घंटे IV फ्लुइड थेरेपी व सघन निगरानी हेतु..."></textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="ipdCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold">IPD में भर्ती करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("emrIpdModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseIpdModalBtn").addEventListener("click", closeAction);
      document.getElementById("ipdCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrIpdForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const pen = document.getElementById("ipdPenNo").value.trim();
        const notes = document.getElementById("ipdNotes").value.trim();

        patient.status = "IPD_Admitted";
        patient.penNumber = pen;
        await dbPutPatient(patient);

        const record = {
          recordId: "REC-IPD-" + Date.now(),
          patientId: patient.patientId,
          recordType: "consultation",
          timestamp: new Date().toISOString(),
          attendingDoctor: "Indoor Resident Clinician",
          clinicalDiagnosis: `IPD भर्ती (Admitted to ${pen})`,
          provisionalNotes: notes,
          prescriptions: []
        };
        await dbPutRecord(record);

        closeAction();
        await this.refreshState();
        notify(`पशु ${patient.tagNumber} को IPD वार्ड में भर्ती किया गया।`, "success");
        this.renderLeftDirectory();
        this.renderRightPane();
      });
    },

    // MODAL 4: DISCHARGE PATIENT
    openDischargeModal: function (patient) {
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrDischargeModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">पशु रोगी डिस्चार्ज सारांश (Discharge Summary)</h3>
              </div>
              <button id="emrCloseDischargeModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrDischargeForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">अंतिम नैदानिक स्थिति (Outcome)</label>
                <select id="disOutcome" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
                  <option value="Recovered / Cured">पूर्ण स्वस्थ / रोगमुक्त (Recovered / Cured)</option>
                  <option value="Improved / Home Care">सुधार (Continued Home Medication)</option>
                  <option value="Referred">उच्च अनुसंधान केंद्र रेफर (Referred to University)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">पशुपालक हेतु डिस्चार्ज निर्देश (Discharge Advice)</label>
                <textarea id="disAdvice" required rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" placeholder="उदा: 3 दिन तक सूखा भूसा दें, खली-दाने की मात्रा सीमित रखें..."></textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="disCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white">डिस्चार्ज सम्पादित करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("emrDischargeModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseDischargeModalBtn").addEventListener("click", closeAction);
      document.getElementById("disCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrDischargeForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const outcome = document.getElementById("disOutcome").value;
        const advice = document.getElementById("disAdvice").value.trim();

        patient.status = "Discharged";
        patient.penNumber = null;
        await dbPutPatient(patient);

        const record = {
          recordId: "REC-DIS-" + Date.now(),
          patientId: patient.patientId,
          recordType: "consultation",
          timestamp: new Date().toISOString(),
          attendingDoctor: "Senior Veterinary Surgeon",
          clinicalDiagnosis: `अस्पताल डिस्चार्ज: ${outcome}`,
          provisionalNotes: `डिस्चार्ज सलाह: ${advice}`,
          prescriptions: []
        };
        await dbPutRecord(record);

        closeAction();
        await this.refreshState();
        notify(`पशु ${patient.tagNumber} का डिस्चार्ज पूर्ण हुआ।`, "info");
        this.renderLeftDirectory();
        this.renderRightPane();
      });
    },

    // MODAL 5: VACCINE LOG ENTRY
    openVaccinationModal: function () {
      const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
      if (!patient) return;
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrVaccineModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-syringe text-emerald-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">टीकाकरण लॉग जोड़ें (${patient.tagNumber})</h3>
              </div>
              <button id="emrCloseVaccineModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrVaccineForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">टीके का नाम (Vaccine Name) *</label>
                <select id="vacName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
                  <option value="Raksha-Ovac (FMD Inactivated)">Raksha-Ovac (FMD / खुरपका-मुंहपका)</option>
                  <option value="Raksha-HS (Haemorrhagic Septicaemia)">Raksha-HS (गलघोंटू)</option>
                  <option value="Raksha-BQ (Black Quarter)">Raksha-BQ (एकटंगा / लंगड़ा बुखार)</option>
                  <option value="Bruvax (Brucellosis S19)">Bruvax (ब्रूसीलोसिस S19)</option>
                  <option value="Rabisin / Nobivac (Anti-Rabies)">रेबीज रोधी (Anti-Rabies Inactivated)</option>
                  <option value="Canine DHPPiL (Megavac-6)">DHPPiL कैनाइन 6-in-1</option>
                  <option value="Enterotoxaemia Vaccine">ET Vaccine (फिड़किया / बकरी)</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">बैच नंबर (Batch No.)</label>
                  <input type="text" id="vacBatch" value="B-2026-X8" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">अगली देय तिथि (Due Date)</label>
                  <input type="date" id="vacDueDate" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">निर्माता / केंद्र</label>
                <input type="text" id="vacMfg" value="Indian Immunologicals Ltd (IIL)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="vacCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white">टीकाकरण दर्ज करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Set default next due date to +180 days
      const d = new Date();
      d.setDate(d.getDate() + 180);
      document.getElementById("vacDueDate").value = d.toISOString().split("T")[0];

      const modal = document.getElementById("emrVaccineModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseVaccineModalBtn").addEventListener("click", closeAction);
      document.getElementById("vacCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrVaccineForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const record = {
          recordId: "REC-VAC-" + Date.now(),
          patientId: patient.patientId,
          recordType: "vaccination",
          timestamp: new Date().toISOString(),
          vaccineName: document.getElementById("vacName").value,
          batchNumber: document.getElementById("vacBatch").value.trim(),
          manufacturer: document.getElementById("vacMfg").value.trim(),
          administeredBy: "Authorized Veterinary Officer",
          nextDueDate: document.getElementById("vacDueDate").value,
          status: "Completed"
        };

        await dbPutRecord(record);
        state.activeCaseHistory = await dbGetPatientRecords(patient.patientId);
        closeAction();
        notify("टीकाकरण रिकॉर्ड सफलतापूर्वक सुरक्षित हुआ!", "success");
        state.activeTab = "vaccination";
        this.renderRightPane();
      });
    },

    // MODAL 6: REPRODUCTION & BREEDING ENTRY
    openReproductionModal: function () {
      const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
      if (!patient) return;
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrReproModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-purple-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-dna text-purple-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">कृत्रिम गर्भाधान (AI) / PD लॉग</h3>
              </div>
              <button id="emrCloseReproModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrReproForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">इवेंट प्रकार (Event Type)</label>
                <select id="repEvent" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500">
                  <option value="Artificial Insemination (AI)">कृत्रिम गर्भाधान (AI Insemination)</option>
                  <option value="Pregnancy Diagnosis (PD)">गर्भ जांच (Pregnancy Diagnosis)</option>
                  <option value="Calving / Parturition">प्रसव (Calving Event)</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">सांड ID / स्ट्रॉ नंबर</label>
                  <input type="text" id="repBull" value="MURRAH-NDRI-M29" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">गर्भ स्थिति (PD Status)</label>
                  <select id="repPdStatus" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500">
                    <option value="Inseminated (Wait 60d PD)">AI संपन्न (PD देय)</option>
                    <option value="Confirmed Pregnant">गाभिन पुष्ट (Confirmed Pregnant)</option>
                    <option value="Non-Pregnant (Repeat)">खाली / पुनः हीट में (Open)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">संभावित प्रसव तिथि (EDC - यदि पुष्ट हो)</label>
                <input type="date" id="repEdc" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="repCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white">प्रजनन रिकॉर्ड जोड़ें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Set default EDC to +310 days for buffalo / +280 days for cow
      const edc = new Date();
      edc.setDate(edc.getDate() + 310);
      document.getElementById("repEdc").value = edc.toISOString().split("T")[0];

      const modal = document.getElementById("emrReproModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseReproModalBtn").addEventListener("click", closeAction);
      document.getElementById("repCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrReproForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const pdStatus = document.getElementById("repPdStatus").value;
        const record = {
          recordId: "REC-REP-" + Date.now(),
          patientId: patient.patientId,
          recordType: "reproduction",
          timestamp: new Date().toISOString(),
          eventType: document.getElementById("repEvent").value,
          bullId: document.getElementById("repBull").value.trim(),
          semenBatch: "AI-STR-2026",
          technician: "Authorized Vet AI Tech",
          pdStatus: pdStatus,
          expectedCalvingDate: document.getElementById("repEdc").value
        };

        if (pdStatus === "Confirmed Pregnant") {
          patient.reproductiveStatus = "Pregnant (Confirmed)";
          await dbPutPatient(patient);
        }

        await dbPutRecord(record);
        state.activeCaseHistory = await dbGetPatientRecords(patient.patientId);
        closeAction();
        notify("प्रजनन व गर्भाधान रिकॉर्ड अद्यतन हुआ!", "success");
        state.activeTab = "reproduction";
        this.renderRightPane();
      });
    },

    // MODAL 7: LAB REPORT ENTRY
    openLabModal: function () {
      const patient = state.patientsList.find((p) => p.patientId === state.activePatientId);
      if (!patient) return;
      const mount = document.getElementById("emr-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="emrLabModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-microscope text-cyan-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">पैथोलॉजी व डायग्नोस्टिक लैब रिपोर्ट</h3>
              </div>
              <button id="emrCloseLabModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="emrLabForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">जांच का नाम (Test Profile) *</label>
                <select id="labName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500">
                  <option value="California Mastitis Test (CMT) & Somatic Cell Count">CMT एवं दुग्ध सोमैटिक सेल काउंट</option>
                  <option value="Complete Blood Count (CBC / Hemogram)">पूर्ण रक्त गणना (CBC / Hemogram)</option>
                  <option value="Blood Protozoa Smear (Babesia/Theileria/Anaplasma)">रक्त प्रोटोजोआ स्मीयर (बबेसिया/थायलेरिया)</option>
                  <option value="Fecal Floatation / Sedimentation (Helminths)">गोबर सूक्ष्मदर्शी जांच (कृमि अंडे)</option>
                  <option value="Serum Biochemical Panel (Liver / Kidney Function)">सीरम LFT / KFT प्रोफाइल</option>
                  <option value="Urinalysis (Urine Dipstick & Microscopic)">मूत्र विश्लेषण (Urinalysis)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">जांच परिणाम सारांश (Result Findings) *</label>
                <textarea id="labResults" required rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500" placeholder="उदा: Theileria annulata intra-erythrocytic piroplasms detected. Hb: 6.8 g/dL (Severe Anemia)..."></textarea>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">प्रयोगशाला केंद्र</label>
                  <input type="text" id="labCenter" value="Regional Disease Diagnostic Lab" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">परिणाम स्थिति</label>
                  <select id="labStatus" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500">
                    <option value="Finalized / Confirmed">सत्यापित (Finalized)</option>
                    <option value="Provisional">अनंतिम (Provisional)</option>
                  </select>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="labCancelBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white">रिपोर्ट सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("emrLabModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };
      document.getElementById("emrCloseLabModalBtn").addEventListener("click", closeAction);
      document.getElementById("labCancelBtn").addEventListener("click", closeAction);

      document.getElementById("emrLabForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const record = {
          recordId: "REC-LAB-" + Date.now(),
          patientId: patient.patientId,
          recordType: "lab",
          timestamp: new Date().toISOString(),
          testName: document.getElementById("labName").value,
          resultSummary: document.getElementById("labResults").value.trim(),
          labTechnician: document.getElementById("labCenter").value.trim(),
          status: document.getElementById("labStatus").value
        };

        await dbPutRecord(record);
        state.activeCaseHistory = await dbGetPatientRecords(patient.patientId);
        closeAction();
        notify("लैब रिपोर्ट सफलतापूर्वक संलग्न की गई!", "success");
        state.activeTab = "labs";
        this.renderRightPane();
      });
    },

    // 4. UTILITIES: Export Complete Dossier to JSON
    exportPatientHistoryJson: function (patientId) {
      const patient = state.patientsList.find((p) => p.patientId === patientId);
      if (!patient) return;

      const exportBundle = {
        software: "Vetcare AI OS (2026 Production Master Core)",
        standard: "ISO-VET-2026-HL7-COMPLIANT",
        exportTimestamp: new Date().toISOString(),
        patientDemographics: patient,
        longitudinalRecords: state.activeCaseHistory
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `VETCARE_DOSSIER_${patient.tagNumber}_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      notify(`पशु ${patient.tagNumber} का संपूर्ण EMR डेटा JSON प्रारूप में डाउनलोड हुआ!`, "success");
    },

    // 5. UTILITIES: Print High-Security Veterinary Health Passport
    printHealthPassport: function (patientId) {
      const patient = state.patientsList.find((p) => p.patientId === patientId);
      if (!patient) return;

      const vaccines = state.activeCaseHistory.filter((r) => r.recordType === "vaccination");
      const consultations = state.activeCaseHistory.filter((r) => r.recordType === "consultation");

      const printWindow = window.open("", "_blank", "width=850,height=950");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>राष्ट्रीय पशु स्वास्थ्य पासपोर्ट - ${patient.tagNumber}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 30px; color: #111; line-height: 1.4; }
            .passport-card { border: 3px double #064e3b; padding: 25px; border-radius: 12px; }
            .header-strip { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #064e3b; padding-bottom: 15px; }
            .header-title { font-size: 20px; font-weight: bold; color: #064e3b; text-transform: uppercase; }
            .sub-title { font-size: 11px; color: #555; }
            .barcode-box { font-family: monospace; font-size: 14px; font-weight: bold; border: 1px dashed #333; padding: 4px 10px; border-radius: 4px; }
            .grid-bio { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; background: #f9fbf9; padding: 15px; border-radius: 8px; font-size: 13px; }
            .table-box { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            .table-box th, .table-box td { border: 1px solid #ccc; padding: 7px 10px; text-align: left; }
            .table-box th { background-color: #e6f4ea; color: #064e3b; font-weight: bold; }
            .footer-strip { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px; color: #555; }
            .seal-box { width: 140px; height: 60px; border: 1px dashed #999; text-align: center; line-height: 60px; color: #aaa; }
            @media print {
              body { margin: 10px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="passport-card">
            <div class="header-strip">
              <div>
                <div class="header-title">राष्ट्रीय पशु डिजिटल स्वास्थ्य पासपोर्ट</div>
                <div class="sub-title">National Veterinary Health & Biosecurity Passport (ISO-VET-2026 Core)</div>
              </div>
              <div class="barcode-box">
                ||||||||||||||||||||||||<br>TAG: ${patient.tagNumber}
              </div>
            </div>

            <div class="grid-bio">
              <div>
                <div><strong>टैग संख्या:</strong> ${patient.tagNumber}</div>
                <div><strong>माइक्रोचिप ID:</strong> ${patient.microchipNo || "N/A"}</div>
                <div><strong>प्रजाति / नस्ल:</strong> ${patient.species.toUpperCase()} (${patient.breed})</div>
                <div><strong>लिंग व आयु:</strong> ${patient.sex} (${patient.ageYears} वर्ष)</div>
                <div><strong>शारीरिक वजन:</strong> ${patient.bodyWeightKg} किलोग्राम</div>
              </div>
              <div>
                <div><strong>पशुपालक का नाम:</strong> ${patient.owner.fullName}</div>
                <div><strong>संपर्क सूत्र:</strong> ${patient.owner.mobileNumber}</div>
                <div><strong>निवास / गांव:</strong> ${patient.owner.village}, ${patient.owner.district} (${patient.owner.state})</div>
                <div><strong>गर्भ स्थिति:</strong> ${patient.reproductiveStatus}</div>
                <div><strong>पहचान चिह्न:</strong> ${patient.colorMarkings}</div>
              </div>
            </div>

            <h4 style="margin-bottom: 5px; color: #064e3b; font-size: 14px;">आधिकारिक टीकाकरण एवं रोग प्रतिरक्षण रिकॉर्ड</h4>
            <table class="table-box">
              <thead>
                <tr>
                  <th>टीके का नाम</th>
                  <th>बैच संख्या</th>
                  <th>प्रशासक / केंद्र</th>
                  <th>दिनांक</th>
                  <th>आगामी देय तिथि</th>
                </tr>
              </thead>
              <tbody>
                ${
                  vaccines.length === 0
                    ? `<tr><td colspan="5" style="text-align: center; color: #888;">कोई आधिकारिक टीका दर्ज नहीं</td></tr>`
                    : vaccines
                        .map(
                          (v) => `
                        <tr>
                          <td><strong>${v.vaccineName}</strong></td>
                          <td>${v.batchNumber || "—"}</td>
                          <td>${v.administeredBy || "Govt Vet Hospital"}</td>
                          <td>${new Date(v.timestamp).toLocaleDateString("hi-IN")}</td>
                          <td><strong>${v.nextDueDate || "वार्षिक"}</strong></td>
                        </tr>
                      `
                        )
                        .join("")
                }
              </tbody>
            </table>

            <h4 style="margin-top: 20px; margin-bottom: 5px; color: #064e3b; font-size: 14px;">नवीनतम क्लिनिकल जांच एवं परामर्श</h4>
            <table class="table-box">
              <thead>
                <tr>
                  <th>दिनांक</th>
                  <th>निदान (Diagnosis)</th>
                  <th>चिकित्सक</th>
                  <th>टिप्पणी</th>
                </tr>
              </thead>
              <tbody>
                ${
                  consultations.slice(0, 3).length === 0
                    ? `<tr><td colspan="4" style="text-align: center; color: #888;">कोई पूर्व परामर्श नहीं</td></tr>`
                    : consultations
                        .slice(0, 3)
                        .map(
                          (c) => `
                        <tr>
                          <td>${new Date(c.timestamp).toLocaleDateString("hi-IN")}</td>
                          <td><strong>${c.clinicalDiagnosis}</strong></td>
                          <td>${c.attendingDoctor}</td>
                          <td>${c.provisionalNotes || "—"}</td>
                        </tr>
                      `
                        )
                        .join("")
                }
              </tbody>
            </table>

            <div class="footer-strip">
              <div>
                <div>सत्यापन कोड: SHA256-${patient.patientId.slice(0, 12)}</div>
                <div>Vetcare AI OS 2026 Core • आधिकारिक सरकारी अभिलेख हेतु मान्य</div>
              </div>
              <div class="seal-box">
                अधिकृत हस्ताक्षर व मुहर
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

    escapeHtml: function (str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  };

  // Register on VetcareApp Modules Namespace
  root.VetcareApp.Modules.PatientEmrRecords = PatientEmrRecords;

})(typeof window !== "undefined" ? window : this);
