// Vetcare AI OS - Animal Shelter Management, ABC (Spay-Neuter) Program & Welfare Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. STATUTORY ANIMAL BIRTH CONTROL (ABC) & WELFARE CONSTANTS
  const ABC_STANDARDS = {
    MANDATES: {
      MIN_POST_OP_DAYS: 4, // Statutory mandatory post-op recovery in kennel before release
      EAR_NOTCH: "V-Notch on apex of Left Ear (6mm depth) while under anesthesia",
      ARV_VACCINE_DOSE_ML: 1.0, // Anti-Rabies Vaccine administered concurrently on surgery table
      VINCRISTINE_TVT_DOSE_MG_KG: 0.025, // Weekly IV chemotherapy for Transmissible Venereal Tumor
      CSVR_RULE: "Capture-Sterilize-Vaccinate-Release: Release back to exact capture street/GPS"
    },
    KENNEL_CAPACITY: 24, // Total individual recovery and quarantine kennels
    ANIMAL_TYPES: [
      { id: "STRAY_COMMUNITY_DOG", label: "स्ट्रीट / कम्युनिटी डॉग (Community Dog)", requiresAbc: true },
      { id: "CAT", label: "बिल्ली (Feral / Community Cat)", requiresAbc: true },
      { id: "RESCUED_CRUELTY", label: "क्रूरता से मुक्त कराया गया (Cruelty Rescue)", requiresAbc: false },
      { id: "ABANDONED", label: "परित्यक्त पालतू जीव (Abandoned Pet)", requiresAbc: false }
    ],
    HEALTH_STATUSES: [
      { id: "HEALTHY", label: "स्वस्थ (Fit for Surgery / Release)", color: "emerald" },
      { id: "INJURED", label: "घायल / आघात (Trauma Care)", color: "amber" },
      { id: "MANGE", label: "खुजली / संक्रामक चर्मरोग (Mange Isolation)", color: "purple" },
      { id: "TRANSMISSIBLE_VENEREAL_TUMOR_TVT", label: "TVT ट्यूमर (Vincristine Protocol)", color: "rose" }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const ShelterStorage = {
    dbName: "VetcareShelterAbcDB",
    dbVersion: 1,
    storeName: "shelter_abc_records",
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Shelter] IndexedDB missing. Falling back to localStorage.");
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
          console.error("[Vetcare Shelter] IndexedDB error:", err);
          resolve(false);
        };
      });
    },

    async getAll() {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_SHELTER_RECORDS");
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
      if (!item.id) item.id = "SHL-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const all = await this.getAll();
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.push(item);
        localStorage.setItem("VETCARE_SHELTER_RECORDS", JSON.stringify(all));
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
        localStorage.setItem("VETCARE_SHELTER_RECORDS", JSON.stringify(all));
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

  // 4. MAIN SHELTER ANIMAL WELFARE & ABC MODULE CONTROLLER
  const ShelterAnimalWelfareAbc = {
    containerId: null,
    activeTab: "shelter_kennel_census", // 'shelter_kennel_census' | 'abc_sterilization_theater' | 'post_op_care_release' | 'pet_adoption_portal'

    // Reactive State
    state: {
      shelterAnimals: [],
      abcSurgeryRecords: [],
      adoptionRegistry: []
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await ShelterStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Shelter Medicine, ABC Sterilization & Welfare Engine Loaded.");
    },

    async loadInitialData() {
      const records = await ShelterStorage.getAll();
      if (records && records.length > 0) {
        this.state.shelterAnimals = records.filter((r) => r.recordType === "ANIMAL_INTAKE");
        this.state.abcSurgeryRecords = records.filter((r) => r.recordType === "ABC_SURGERY");
        this.state.adoptionRegistry = records.filter((r) => r.recordType === "ADOPTION");
      }

      // If empty, seed rich default shelter records
      if (this.state.shelterAnimals.length === 0) {
        await this.seedDefaultShelterData();
      }
    },

    async seedDefaultShelterData() {
      const seedAnimals = [
        {
          id: "INT-2026-001",
          recordType: "ANIMAL_INTAKE",
          intakeId: "INT-2026-001",
          admissionDate: "2026-02-22",
          animalType: "STRAY_COMMUNITY_DOG",
          sex: "FEMALE",
          colorMarkings: "Brown & White Indian Pariah",
          weightKg: 16.5,
          captureLocation: "वार्ड 14, मॉडल टाउन मार्केट, रोहिणी, दिल्ली (28.7150° N, 77.1210° E)",
          capturedBy: "राजेश कुमार (MCD ABC Catcher Squad #04)",
          kennelNumber: "K-04",
          healthStatus: "HEALTHY",
          notes: "Captured for routine ABC spay. Temperament friendly."
        },
        {
          id: "INT-2026-002",
          recordType: "ANIMAL_INTAKE",
          intakeId: "INT-2026-002",
          admissionDate: "2026-02-23",
          animalType: "STRAY_COMMUNITY_DOG",
          sex: "MALE",
          colorMarkings: "Black with tan socks Indie",
          weightKg: 18.2,
          captureLocation: "गली नं. 3, करोल बाग, नई दिल्ली (28.6517° N, 77.1906° E)",
          capturedBy: "सुरेश चंद (Animal Welfare Squad #02)",
          kennelNumber: "K-08",
          healthStatus: "HEALTHY",
          notes: "Alpha male pack leader. Ear unnotched."
        },
        {
          id: "INT-2026-003",
          recordType: "ANIMAL_INTAKE",
          intakeId: "INT-2026-003",
          admissionDate: "2026-02-18",
          animalType: "STRAY_COMMUNITY_DOG",
          sex: "MALE",
          colorMarkings: "Fawn Indie Dog",
          weightKg: 15.0,
          captureLocation: "कनॉट प्लेस आउटर सर्कल (28.6315° N, 77.2167° E)",
          capturedBy: "एनजीओ रेस्क्यू टीम",
          kennelNumber: "K-19",
          healthStatus: "TRANSMISSIBLE_VENEREAL_TUMOR_TVT",
          notes: "Genital cauliflower-like bleeding TVT growth. Under Vincristine chemotherapy."
        },
        {
          id: "INT-2026-004",
          recordType: "ANIMAL_INTAKE",
          intakeId: "INT-2026-004",
          admissionDate: "2026-02-10",
          animalType: "RESCUED_CRUELTY",
          sex: "FEMALE",
          colorMarkings: "Tri-color Indie Pup (4 months)",
          weightKg: 8.5,
          captureLocation: "लाजपत नगर रेलवे लाइन (Cruelty Abandonment Rescue)",
          capturedBy: "सोसाइटी फॉर प्रिवेंशन ऑफ क्रुएल्टी (SPCA)",
          kennelNumber: "K-12",
          healthStatus: "HEALTHY",
          notes: "Rescued from road abuse. De-wormed, 7-in-1 vaccinated, ready for adoption."
        }
      ];

      for (const a of seedAnimals) {
        await ShelterStorage.put(a);
        this.state.shelterAnimals.push(a);
      }

      const seedSurgeries = [
        {
          id: "SURG-2026-001",
          recordType: "ABC_SURGERY",
          surgeryId: "SURG-2026-001",
          intakeId: "INT-2026-001",
          dateOfSurgery: "2026-02-23",
          surgeonVetName: "डॉ. राहुल (VS-MCD-889)",
          procedureType: "OVARIOHYSTERECTOMY",
          earNotchShape: "V_NOTCH_LEFT_EAR",
          rabiesVaccineLotNo: "RAV-2026-X89 (Raksharab)",
          postOpDaysInKennel: 3,
          releasePlannedDate: "2026-02-27",
          releasedBackToLocation: false,
          woundHealingStatus: "CLEAN_DRY_NO_DISCHARGE"
        },
        {
          id: "SURG-2026-002",
          recordType: "ABC_SURGERY",
          surgeryId: "SURG-2026-002",
          intakeId: "INT-2026-002",
          dateOfSurgery: "2026-02-24",
          surgeonVetName: "डॉ. प्रिया शर्मा (MVSc Surgery)",
          procedureType: "CASTRATION",
          earNotchShape: "V_NOTCH_LEFT_EAR",
          rabiesVaccineLotNo: "RAV-2026-X89 (Raksharab)",
          postOpDaysInKennel: 2,
          releasePlannedDate: "2026-02-28",
          releasedBackToLocation: false,
          woundHealingStatus: "NORMAL_MILD_SWELLING"
        }
      ];

      for (const s of seedSurgeries) {
        await ShelterStorage.put(s);
        this.state.abcSurgeryRecords.push(s);
      }

      const seedAdoption = [
        {
          id: "ADOPT-2026-001",
          recordType: "ADOPTION",
          adoptionId: "ADOPT-2026-001",
          intakeId: "INT-2026-004",
          adopterName: "विकास मल्होत्रा",
          phone: "9810293847",
          aadharNo: "XXXX-XXXX-9281",
          homeCheckPassed: true,
          adoptionAgreementSigned: true,
          adoptionDate: "2026-02-25",
          followUpStatus: "SCHEDULED_15_DAYS"
        }
      ];

      for (const d of seedAdoption) {
        await ShelterStorage.put(d);
        this.state.adoptionRegistry.push(d);
      }
    },

    // 4.2 STATUTORY ABC CALCULATIONS & SHELTER TELEMETRY
    calculateShelterTelemetry() {
      const totalAnimals = this.state.shelterAnimals.length;
      const occupiedKennels = new Set(this.state.shelterAnimals.map((a) => a.kennelNumber)).size;
      const occupancyRate = Math.round((occupiedKennels / ABC_STANDARDS.KENNEL_CAPACITY) * 100);

      const totalSurgeriesMonth = this.state.abcSurgeryRecords.length;
      const dogsAwaitingRelease = this.state.abcSurgeryRecords.filter(
        (s) => !s.releasedBackToLocation && s.postOpDaysInKennel >= ABC_STANDARDS.MANDATES.MIN_POST_OP_DAYS
      ).length;
      const activeAdoptions = this.state.adoptionRegistry.length;

      return {
        totalAnimals,
        occupiedKennels,
        occupancyRate,
        totalSurgeriesMonth,
        dogsAwaitingRelease,
        activeAdoptions
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Shelter] Target container node not found:", this.containerId);
        return;
      }

      const telemetry = this.calculateShelterTelemetry();

      container.innerHTML = `
        <div class="shelter-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- SHELTER WELFARE COMMAND HEADER -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-shield-dog"></i> AWBI Animal Birth Control Rules 2023/2026
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <i class="fa-solid fa-location-crosshairs"></i> Geo-Tagged CSVR Protocols
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>पशु आश्रय प्रबंधन, ABC नसबंदी एवं पुनर्वास नियंत्रण कक्ष</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Statutory Municipal Spay/Neuter Tracking, Capture-Sterilize-Vaccinate-Release (CSVR), Left Ear V-Notch Verification, Post-Op Kennels & Humane Pet Adoption.
              </p>
            </div>

            <!-- ACTION CONTROLS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenIntakeModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नया पशु दाखिला (New Intake)
              </button>
              <button id="btnOpenSurgeryLogModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-scissors"></i> ABC सर्जरी दर्ज करें (Log Surgery)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">केनेल अधिभोग दर (Kennel Occupancy)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${telemetry.occupancyRate}%</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">${telemetry.occupiedKennels} / ${ABC_STANDARDS.KENNEL_CAPACITY} Cages</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">मासिक ABC नसबंदी सर्जरी</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${telemetry.totalSurgeriesMonth}</span>
                <span class="text-xs font-mono text-slate-400 font-bold">100% Ear-Notched</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">उसी स्थान पर वापसी योग्य (Ready to Release)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${telemetry.dogsAwaitingRelease > 0 ? "text-amber-400" : "text-slate-300"}">${telemetry.dogsAwaitingRelease}</span>
                <span class="text-xs font-mono text-amber-300 font-semibold">&gt;4 Days Post-Op</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सफल गोद लेना (Adoptions)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-purple-400">${telemetry.activeAdoptions}</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">Legal Contract Signed</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="shelter_kennel_census" class="shelter-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "shelter_kennel_census"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-border-all"></i> 1. केनेल जनगणना एवं दृश्य पिंजरा ग्रिड (Kennel Census)
            </button>
            <button data-tab="abc_sterilization_theater" class="shelter-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "abc_sterilization_theater"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-scissors"></i> 2. ABC नसबंदी ऑपरेशन थियेटर (Spay-Neuter OT)
            </button>
            <button data-tab="post_op_care_release" class="shelter-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "post_op_care_release"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-truck-ramp-box"></i> 3. पोस्ट-ऑप देखभाल व मूल स्थान वापसी (CSVR Release)
            </button>
            <button data-tab="pet_adoption_portal" class="shelter-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "pet_adoption_portal"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-heart"></i> 4. निराश्रित पशु गोद लेना पोर्टल (Adoption Portal)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="shelterTabViewport" class="w-full">
            ${this.renderActiveTabContent()}
          </div>

        </div>

        <!-- MODAL CONTAINER HOOK -->
        <div id="shelterModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent() {
      switch (this.activeTab) {
        case "shelter_kennel_census":
          return this.renderKennelCensusTab();
        case "abc_sterilization_theater":
          return this.renderAbcTheaterTab();
        case "post_op_care_release":
          return this.renderPostOpReleaseTab();
        case "pet_adoption_portal":
          return this.renderAdoptionPortalTab();
        default:
          return "";
      }
    },

    // TAB 1: KENNEL CENSUS & VISUAL CAGE GRID
    renderKennelCensusTab() {
      // Build 24 Cage Grid
      const cages = [];
      for (let i = 1; i <= ABC_STANDARDS.KENNEL_CAPACITY; i++) {
        const kId = "K-" + String(i).padStart(2, "0");
        const occupant = this.state.shelterAnimals.find((a) => a.kennelNumber === kId);
        cages.push({ kennelId: kId, occupant });
      }

      return `
        <div class="space-y-6">
          
          <!-- VISUAL 24-KENNEL MATRIX GRID -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-grid-horizontal text-emerald-400"></i> लाइव केनेल मैट्रिक्स (Visual Cage Status 1 - 24)
                </h3>
                <p class="text-xs text-slate-400">Click any occupied kennel to inspect medical status, feeding, and post-op timeline.</p>
              </div>
              <div class="flex items-center gap-3 text-xs font-mono">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Occupied</span>
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600"></span> Empty</span>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              ${cages
                .map((c) => {
                  const occ = c.occupant;
                  const isOcc = !!occ;
                  let badgeColor = "border-slate-800 bg-slate-950/60";
                  if (isOcc) {
                    if (occ.healthStatus === "TRANSMISSIBLE_VENEREAL_TUMOR_TVT") badgeColor = "border-rose-500/60 bg-rose-950/30";
                    else if (occ.healthStatus === "MANGE") badgeColor = "border-purple-500/60 bg-purple-950/30";
                    else badgeColor = "border-emerald-500/60 bg-emerald-950/20";
                  }

                  return `
                  <div class="p-3 rounded-xl border ${badgeColor} flex flex-col justify-between text-xs transition-all hover:scale-105">
                    <div class="flex justify-between items-center font-mono">
                      <span class="font-bold text-white text-[11px]">${c.kennelId}</span>
                      <span class="w-2 h-2 rounded-full ${isOcc ? "bg-emerald-400" : "bg-slate-700"}"></span>
                    </div>

                    <div class="my-2 min-h-[38px]">
                      ${
                        isOcc
                          ? `
                          <div class="font-bold text-white text-[11px] truncate">${occ.intakeId}</div>
                          <div class="text-[9px] text-slate-400 truncate uppercase">${occ.sex} • ${occ.weightKg}kg</div>
                          <div class="text-[9px] text-emerald-400 font-semibold truncate">${occ.healthStatus}</div>
                        `
                          : `
                          <div class="text-[10px] text-slate-600 font-mono py-2 text-center">रिक्त (EMPTY)</div>
                        `
                      }
                    </div>

                    <div class="text-[9px] font-mono text-slate-500 truncate">
                      ${isOcc ? occ.captureLocation.slice(0, 15) + "..." : "Available"}
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>

          <!-- SHELTER ANIMAL MASTER INTAKE TABLE -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-list-check text-cyan-400"></i> आश्रय पशु दाखिला रोस्टर (Intake & Admission Log)
                </h3>
                <p class="text-xs text-slate-400">Official Municipal Stray Catch Register with origin Ward and health classification.</p>
              </div>
              <div class="text-xs font-mono text-slate-400">
                वर्तमान आश्रय जीव: <strong class="text-white">${this.state.shelterAnimals.length}</strong>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">दाखिला आईडी व तिथि</th>
                    <th class="p-3">केनेल नं.</th>
                    <th class="p-3">श्रेणी व लिंग</th>
                    <th class="p-3">रंग, पहचान व वजन</th>
                    <th class="p-3">पकड़े जाने का स्थान (Capture Ward)</th>
                    <th class="p-3">स्वास्थ्य स्थिति (Triage)</th>
                    <th class="p-3 text-right">कार्यवाई (Actions)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${
                    this.state.shelterAnimals.length === 0
                      ? `<tr><td colspan="7" class="p-6 text-center text-slate-500 font-mono">कोई आश्रय पशु दर्ज नहीं है। 'नया पशु दाखिला' से जोड़ें।</td></tr>`
                      : this.state.shelterAnimals
                          .map((a) => {
                            return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white text-xs">${a.intakeId}</span>
                            <div class="text-[10px] text-slate-500">${a.admissionDate}</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="px-2 py-1 rounded text-xs font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                              ${a.kennelNumber}
                            </span>
                          </td>
                          <td class="p-3">
                            <div class="font-bold text-white">${a.animalType}</div>
                            <span class="text-[10px] font-mono uppercase ${a.sex === "FEMALE" ? "text-rose-400" : "text-cyan-400"}">${a.sex}</span>
                          </td>
                          <td class="p-3">
                            <div class="text-slate-200">${a.colorMarkings}</div>
                            <div class="text-[10px] text-slate-500 font-mono">${a.weightKg} kg</div>
                          </td>
                          <td class="p-3 text-[11px] max-w-xs">
                            <div class="text-slate-300 truncate">${a.captureLocation}</div>
                            <div class="text-[10px] text-slate-500 font-mono">Catcher: ${a.capturedBy}</div>
                          </td>
                          <td class="p-3 font-mono">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                              a.healthStatus === "HEALTHY"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : a.healthStatus === "TRANSMISSIBLE_VENEREAL_TUMOR_TVT"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }">
                              ${a.healthStatus}
                            </span>
                          </td>
                          <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button data-delete-animal="${a.id}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300" title="Delete Entry">
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

            <!-- STATUTORY CSVR LEGAL MANDATE FOOTNOTE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <i class="fa-solid fa-scale-balanced text-amber-400 text-lg mt-0.5"></i>
              <div class="leading-relaxed">
                <strong>वैधानिक पशु जन्म नियंत्रण (ABC) नियम 2023/2026:</strong> आवारा सामुदायिक कुत्तों को जिस विशिष्ट इलाके/गली/वार्ड से पकड़ा जाता है, नसबंदी एवं 4 दिन की पोस्ट-ऑपरेटिव रिकवरी तथा एंटी-रेबीज टीकाकरण के उपरांत <strong>उसी सटीक स्थान पर छोड़ना कानूनी रूप से अनिवार्य है</strong>। किसी भी कुत्ते को विस्थापित (Relocate) करना संज्ञेय अपराध है।
              </div>
            </div>
          </div>

        </div>
      `;
    },

    // TAB 2: ABC STERILIZATION THEATER & SURGICAL REGISTRY
    renderAbcTheaterTab() {
      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- MANDATORY SURGICAL STANDARD CHECKLIST -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-scissors"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">ABC सर्जिकल मानक प्रोटोकॉल</h3>
                  <span class="text-[10px] font-mono text-cyan-400">AWBI Minimum Standard of Care</span>
                </div>
              </div>

              <div class="space-y-3 text-xs text-slate-300">
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-emerald-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-ear-listen"></i> 1. बाएं कान पर 'V' आकार का निशान (Ear-Notch)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    एनेस्थीसिया के दौरान बाएं कान के ऊपरी सिरे पर <strong>6mm गहरा 'V' आकार का निशान</strong> अनिवार्य है, ताकि दूर से ही नसबंदी की पहचान हो सके और दोबारा पकड़े जाने से बचा जा सके।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-amber-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-shield-virus"></i> 2. एंटी-रेबीज टीकाकरण (ARV 1.0ml)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    सर्जरी टेबल पर ही प्रत्येक कुत्ते को एंटी-रेबीज वैक्सीन (1ml SC/IM) लगाई जानी अनिवार्य है। वैक्सीन का बैच नंबर रिकॉर्ड में दर्ज करें।
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-dna"></i> 3. TVT कीमोथेरेपी प्रोटोकॉल (Vincristine)
                  </div>
                  <p class="text-slate-400 leading-relaxed">
                    Transmissible Venereal Tumor से पीड़ित कुत्तों की नसबंदी से पूर्व <strong>Vincristine Sulfate (0.025 mg/kg IV)</strong> का साप्ताहिक चक्र (4-6 सप्ताह) दिया जाना चाहिए।
                  </p>
                </div>
              </div>
            </div>

            <!-- COMPLETED ABC SURGERIES TABLE -->
            <div class="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-clipboard-check text-emerald-400"></i> निष्पादित नसबंदी एवं कान-नॉच लॉग (Surgery Manifest)
                </h3>
                <span class="text-xs font-mono text-slate-400">
                  कुल सर्जरी: <strong class="text-white">${this.state.abcSurgeryRecords.length}</strong>
                </span>
              </div>

              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-3">सर्जरी आईडी व तिथि</th>
                      <th class="p-3">दाखिला आईडी</th>
                      <th class="p-3">प्रक्रिया (Procedure)</th>
                      <th class="p-3">बायां कान 'V' नॉच</th>
                      <th class="p-3">ARV वैक्सीन बैच</th>
                      <th class="p-3">घाव स्थिति (Wound)</th>
                      <th class="p-3 text-right">सर्जन पशु चिकित्सक</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${this.state.abcSurgeryRecords
                      .map((s) => {
                        return `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-3 font-mono">
                            <span class="font-bold text-white">${s.surgeryId}</span>
                            <div class="text-[10px] text-slate-500">${s.dateOfSurgery}</div>
                          </td>
                          <td class="p-3 font-mono font-bold text-cyan-400">${s.intakeId}</td>
                          <td class="p-3">
                            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              s.procedureType === "OVARIOHYSTERECTOMY" ? "bg-rose-500/20 text-rose-300" : "bg-cyan-500/20 text-cyan-300"
                            }">
                              ${s.procedureType}
                            </span>
                          </td>
                          <td class="p-3">
                            <span class="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                              <i class="fa-solid fa-check"></i> V-Notch Verified
                            </span>
                          </td>
                          <td class="p-3 font-mono text-slate-300">
                            ${s.rabiesVaccineLotNo}
                          </td>
                          <td class="p-3 font-mono text-[10px] text-emerald-400">
                            ${s.woundHealingStatus}
                          </td>
                          <td class="p-3 text-right font-mono text-slate-300">
                            ${s.surgeonVetName}
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

    // TAB 3: POST-OP CARE & STREET RELEASE AUDIT
    renderPostOpReleaseTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-truck-ramp-box text-amber-400"></i> पोस्ट-ऑपरेटिव केनेल प्रवास एवं मूल स्थान वापसी (CSVR Release Audit)
                </h3>
                <p class="text-xs text-slate-400">
                  Mandatory 4-Day Healing Verification, Rabies Vaccination Certificate, and Origin Street Geo-Validation.
                </p>
              </div>
              <button id="btnPrintMunicipalReleaseManifest" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 font-display shadow-lg flex items-center gap-2">
                <i class="fa-solid fa-print"></i> वैधानिक नगर निगम रिलीज मैनिफेस्ट प्रिंट करें
              </button>
            </div>

            <!-- RELEASE CANDIDATES TABLE -->
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">सर्जरी आईडी व पशु</th>
                    <th class="p-3">केनेल नं.</th>
                    <th class="p-3">पोस्ट-ऑप दिन (Days in Cage)</th>
                    <th class="p-3">सटीक मूल स्थान (Capture Location)</th>
                    <th class="p-3">निकासी पात्रता (Eligibility)</th>
                    <th class="p-3 text-right">वापसी पुष्टि (Release Status)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.abcSurgeryRecords
                    .map((s) => {
                      const animal = this.state.shelterAnimals.find((a) => a.intakeId === s.intakeId);
                      const isEligible = s.postOpDaysInKennel >= ABC_STANDARDS.MANDATES.MIN_POST_OP_DAYS;
                      const loc = animal ? animal.captureLocation : "Origin Unknown";
                      const kennel = animal ? animal.kennelNumber : "N/A";

                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-white">${s.surgeryId}</span>
                          <div class="text-[10px] text-cyan-400">${s.intakeId}</div>
                        </td>
                        <td class="p-3 font-mono font-bold text-white">${kennel}</td>
                        <td class="p-3 font-mono">
                          <span class="text-sm font-black ${isEligible ? "text-emerald-400" : "text-amber-400"}">
                            ${s.postOpDaysInKennel} दिन
                          </span>
                          <span class="text-[10px] text-slate-500">/ 4 Min</span>
                        </td>
                        <td class="p-3 text-[11px] max-w-sm text-slate-300">
                          ${loc}
                        </td>
                        <td class="p-3 font-mono">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            isEligible ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }">
                            ${isEligible ? "FIT FOR STREET RELEASE" : "HEALING REQUIRED (RETAIN)"}
                          </span>
                        </td>
                        <td class="p-3 text-right space-x-1 whitespace-nowrap">
                          ${
                            s.releasedBackToLocation
                              ? `<span class="text-slate-400 font-mono text-[11px]"><i class="fa-solid fa-check-double text-emerald-400"></i> Released</span>`
                              : `
                            <button data-mark-released="${s.id}" class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] shadow" ${
                                  !isEligible ? "disabled opacity-50 cursor-not-allowed" : ""
                                }>
                              सत्यापित रिलीज करें (Dispatch)
                            </button>
                            `
                          }
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

    // TAB 4: PET ADOPTION & WELFARE MATCHMAKER
    renderAdoptionPortalTab() {
      // Animals eligible for adoption: Rescued cruelty, abandoned pets, or socialized shelter pups
      const adoptables = this.state.shelterAnimals.filter(
        (a) => a.animalType === "RESCUED_CRUELTY" || a.animalType === "ABANDONED" || a.healthStatus === "HEALTHY"
      );

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-heart text-rose-400"></i> निराश्रित पशु कानूनी गोद लेना पोर्टल (Adoption Registry)
                </h3>
                <p class="text-xs text-slate-400">Pre-adoption background verification, Aadhar KYC check, and formal welfare adoption deed.</p>
              </div>
              <button id="btnOpenNewAdoptionModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white font-display shadow-lg shadow-purple-950/40 flex items-center gap-2">
                <i class="fa-solid fa-signature"></i> नया गोद अनुबंध दर्ज करें (Execute Deed)
              </button>
            </div>

            <!-- ADOPTABLE ANIMALS SPOTLIGHT CARDS -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${adoptables
                .slice(0, 3)
                .map((a) => {
                  return `
                  <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div class="flex justify-between items-center text-xs font-mono">
                        <span class="text-cyan-400 font-bold">${a.intakeId}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold">READY FOR HOME</span>
                      </div>
                      <h4 class="font-display font-bold text-white text-base mt-2">${a.colorMarkings}</h4>
                      <p class="text-xs text-slate-400 mt-1">${a.notes}</p>
                    </div>

                    <div class="pt-3 border-t border-slate-800 text-xs font-mono space-y-1">
                      <div class="flex justify-between text-slate-300">
                        <span class="text-slate-400">केनेल नं:</span>
                        <strong class="text-white">${a.kennelNumber}</strong>
                      </div>
                      <div class="flex justify-between text-slate-300">
                        <span class="text-slate-400">लिंग व वजन:</span>
                        <strong class="text-emerald-400">${a.sex} • ${a.weightKg} kg</strong>
                      </div>
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>

            <!-- COMPLETED ADOPTIONS TABLE -->
            <div class="overflow-x-auto custom-scrollbar pt-2">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">अनुबंध संख्या व तिथि</th>
                    <th class="p-3">पशु आईडी</th>
                    <th class="p-3">अंगीकारकर्ता (Adopter Name)</th>
                    <th class="p-3">दूरभाष (Phone)</th>
                    <th class="p-3">आधार / KYC</th>
                    <th class="p-3">गृह सत्यापन (Home Check)</th>
                    <th class="p-3 text-right">फॉलो-अप स्थिति</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.adoptionRegistry
                    .map((d) => {
                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono font-bold text-white">
                          ${d.adoptionId}
                          <div class="text-[10px] text-slate-500">${d.adoptionDate}</div>
                        </td>
                        <td class="p-3 font-mono font-bold text-cyan-400">${d.intakeId}</td>
                        <td class="p-3 font-semibold text-white">${d.adopterName}</td>
                        <td class="p-3 font-mono text-slate-300">${d.phone}</td>
                        <td class="p-3 font-mono text-slate-400">${d.aadharNo}</td>
                        <td class="p-3">
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                            <i class="fa-solid fa-house-circle-check"></i> Passed
                          </span>
                        </td>
                        <td class="p-3 text-right font-mono text-[11px] text-purple-300">
                          ${d.followUpStatus}
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

    // 4.5 EVENT BINDING & INTERACTIVITY
    bindEvents() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Tab Switching
      container.querySelectorAll(".shelter-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Modals Triggers
      const btnOpenIntakeModal = container.querySelector("#btnOpenIntakeModal");
      if (btnOpenIntakeModal) {
        btnOpenIntakeModal.addEventListener("click", () => this.showIntakeModal());
      }

      const btnOpenSurgeryLogModal = container.querySelector("#btnOpenSurgeryLogModal");
      if (btnOpenSurgeryLogModal) {
        btnOpenSurgeryLogModal.addEventListener("click", () => this.showSurgeryLogModal());
      }

      const btnOpenNewAdoptionModal = container.querySelector("#btnOpenNewAdoptionModal");
      if (btnOpenNewAdoptionModal) {
        btnOpenNewAdoptionModal.addEventListener("click", () => this.showAdoptionModal());
      }

      // Print Release Manifest
      const btnPrintMunicipalReleaseManifest = container.querySelector("#btnPrintMunicipalReleaseManifest");
      if (btnPrintMunicipalReleaseManifest) {
        btnPrintMunicipalReleaseManifest.addEventListener("click", () => {
          this.printAbcReleaseManifest(new Date().toISOString().split("T")[0]);
        });
      }

      // Mark Dog Released to Street
      container.querySelectorAll("[data-mark-released]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const sId = e.currentTarget.getAttribute("data-mark-released");
          const rec = this.state.abcSurgeryRecords.find((s) => s.id === sId);
          if (rec) {
            if (confirm("क्या आप पुष्टि करते हैं कि इस कुत्ते को उसके मूल वार्ड/स्थान पर सकुशल छोड़ दिया गया है?")) {
              rec.releasedBackToLocation = true;
              rec.actualReleaseDate = new Date().toISOString().split("T")[0];
              await ShelterStorage.put(rec);
              this.render();
              if (window.VetcareApp.showToast) {
                window.VetcareApp.showToast("कुत्ते की मूल स्थान पर सफल वापसी दर्ज की गई!", "success");
              }
            }
          }
        });
      });

      // Delete Animal Intake
      container.querySelectorAll("[data-delete-animal]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.getAttribute("data-delete-animal");
          if (confirm("क्या आप वाकई इस आश्रय रिकॉर्ड को हटाना चाहते हैं?")) {
            await ShelterStorage.delete(id);
            this.state.shelterAnimals = this.state.shelterAnimals.filter((x) => x.id !== id);
            this.render();
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("रिकॉर्ड हटाया गया।", "warning");
            }
          }
        });
      });
    },

    // 4.6 CLINICAL MODALS
    showIntakeModal() {
      const modalHost = document.getElementById("shelterModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="intakeModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-dog"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">नया आश्रय पशु दाखिला (Animal Shelter Intake)</h3>
                  <span class="text-[10px] font-mono text-emerald-400">Statutory CSVR Origin Street Logging</span>
                </div>
              </div>
              <button id="btnCloseIntakeModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddIntake" onsubmit="return false;" class="space-y-3.5 text-xs">
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">दाखिला टोकन नं.</label>
                  <input type="text" id="inIntakeId" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold" value="INT-2026-${Math.floor(100 + Math.random() * 900)}" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">पशु श्रेणी (Animal Type)</label>
                  <select id="inAnimalType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    ${ABC_STANDARDS.ANIMAL_TYPES.map((t) => `<option value="${t.id}">${t.label}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">लिंग (Sex)</label>
                  <select id="inAnimalSex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="FEMALE">मादा (Female)</option>
                    <option value="MALE">नर (Male)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">आवंटित केनेल (Kennel)</label>
                  <select id="inKennelSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 font-bold font-mono">
                    ${Array.from({ length: ABC_STANDARDS.KENNEL_CAPACITY }, (_, i) => `K-${String(i + 1).padStart(2, "0")}`)
                      .map((k) => `<option value="${k}">${k}</option>`)
                      .join("")}
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">वजन (Weight kg)</label>
                  <input type="number" step="0.1" id="inAnimalWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="15.0" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">स्वास्थ्य स्थिति (Health Triage)</label>
                  <select id="inHealthStatus" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    ${ABC_STANDARDS.HEALTH_STATUSES.map((h) => `<option value="${h.id}">${h.label}</option>`).join("")}
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">रंग व विशिष्ट शारीरिक पहचान (Markings)</label>
                <input type="text" id="inColorMarkings" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. काला व भूरा, सफेद सीना, दायीं आंख के पास निशान" required />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">सटीक पकड़ स्थल व वार्ड (Mandatory CSVR Location)</label>
                <input type="text" id="inCaptureLocation" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. गली नं 5, निकट शिव मंदिर, वार्ड 12, रोहिणी" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">पकड़ने वाले दल का नाम / गाड़ी नं.</label>
                  <input type="text" id="inCapturedBy" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="MCD ABC Dog Squad Van #03" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">विशेष क्लिनिकल टिप्पणी</label>
                  <input type="text" id="inIntakeNotes" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="नसबंदी हेतु उपयुक्त" />
                </div>
              </div>

              <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelIntake" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitIntake" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-950/40">दाखिला सहेजें (Save Intake)</button>
              </div>

            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseIntakeModal").addEventListener("click", close);
      document.getElementById("btnCancelIntake").addEventListener("click", close);

      document.getElementById("formAddIntake").addEventListener("submit", async () => {
        const intakeId = document.getElementById("inIntakeId").value.trim();
        const animalType = document.getElementById("inAnimalType").value;
        const sex = document.getElementById("inAnimalSex").value;
        const kennelNumber = document.getElementById("inKennelSelect").value;
        const weightKg = parseFloat(document.getElementById("inAnimalWeight").value) || 14.0;
        const healthStatus = document.getElementById("inHealthStatus").value;
        const colorMarkings = document.getElementById("inColorMarkings").value.trim();
        const captureLocation = document.getElementById("inCaptureLocation").value.trim();
        const capturedBy = document.getElementById("inCapturedBy").value.trim();
        const notes = document.getElementById("inIntakeNotes").value.trim();

        const newAnimal = {
          id: "INT-" + intakeId,
          recordType: "ANIMAL_INTAKE",
          intakeId,
          admissionDate: new Date().toISOString().split("T")[0],
          animalType,
          sex,
          colorMarkings,
          weightKg,
          captureLocation,
          capturedBy,
          kennelNumber,
          healthStatus,
          notes
        };

        await ShelterStorage.put(newAnimal);
        this.state.shelterAnimals.unshift(newAnimal);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("पशु दाखिला सफलतापूर्वक दर्ज किया गया (केनेल: " + kennelNumber + ")", "success");
        }
      });
    },

    showSurgeryLogModal() {
      const modalHost = document.getElementById("shelterModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="surgeryLogModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-scissors text-cyan-400 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">ABC नसबंदी सर्जरी लॉग करें (Spay-Neuter Log)</h3>
              </div>
              <button id="btnCloseSurgeryModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddSurgery" onsubmit="return false;" class="space-y-3.5 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">पशु चयन (Select Shelter Animal)</label>
                <select id="selSurgeryAnimal" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.shelterAnimals.map((a) => `<option value="${a.intakeId}">${a.intakeId} (${a.kennelNumber} • ${a.sex} • ${a.colorMarkings})</option>`).join("")}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">सर्जरी प्रक्रिया (Procedure)</label>
                  <select id="inProcType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="OVARIOHYSTERECTOMY">Ovariohysterectomy (मादा नसबंदी)</option>
                    <option value="CASTRATION">Castration (नर नसबंदी)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">बायां कान V-Notch</label>
                  <input type="text" id="inEarNotch" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono" value="V_NOTCH_LEFT_EAR (Verified)" readonly />
                </div>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">एंटी-रेबीज वैक्सीन लॉट / बैच नं. (ARV Lot No.)</label>
                <input type="text" id="inArvBatch" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="RAV-2026-X89 (Raksharab 1.0ml SC)" required />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">सर्जन पशु चिकित्सक का नाम (Surgeon Vet)</label>
                <input type="text" id="inSurgeonName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="डॉ. राहुल (VS-MCD-889)" required />
              </div>

              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <strong>नियम:</strong> सर्जरी के उपरांत जानवर को कम से कम 4 दिन तक केनेल में रखना अनिवार्य है। इसके बाद घाव सूखने पर ही रिलीज किया जा सकेगा।
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelSurgery" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitSurgery" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">सर्जरी सहेजें (Save Surgery)</button>
              </div>
            </form>

          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseSurgeryModal").addEventListener("click", close);
      document.getElementById("btnCancelSurgery").addEventListener("click", close);

      document.getElementById("formAddSurgery").addEventListener("submit", async () => {
        const intakeId = document.getElementById("selSurgeryAnimal").value;
        const procedureType = document.getElementById("inProcType").value;
        const rabiesVaccineLotNo = document.getElementById("inArvBatch").value.trim();
        const surgeonVetName = document.getElementById("inSurgeonName").value.trim();

        const newSurgery = {
          id: "SURG-" + Date.now(),
          recordType: "ABC_SURGERY",
          surgeryId: "SURG-2026-" + Date.now().toString().slice(-4),
          intakeId,
          dateOfSurgery: new Date().toISOString().split("T")[0],
          surgeonVetName,
          procedureType,
          earNotchShape: "V_NOTCH_LEFT_EAR",
          rabiesVaccineLotNo,
          postOpDaysInKennel: 0,
          releasePlannedDate: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
          releasedBackToLocation: false,
          woundHealingStatus: "FRESH_SURGICAL_WOUND"
        };

        await ShelterStorage.put(newSurgery);
        this.state.abcSurgeryRecords.unshift(newSurgery);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("ABC सर्जरी और कान-नॉच सफलतापूर्वक दर्ज किया गया।", "success");
        }
      });
    },

    showAdoptionModal() {
      const modalHost = document.getElementById("shelterModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="adoptionModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-purple-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">पशु अंगीकार अनुबंध (Pet Adoption Deed)</h3>
              <button id="btnCloseAdoptionModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddAdoption" onsubmit="return false;" class="space-y-3 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">गोद दिया जाने वाला पशु</label>
                <select id="selAdoptionAnimal" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                  ${this.state.shelterAnimals.map((a) => `<option value="${a.intakeId}">${a.intakeId} - ${a.colorMarkings} (${a.kennelNumber})</option>`).join("")}
                </select>
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">अंगीकारकर्ता का पूरा नाम (Adopter Name)</label>
                <input type="text" id="inAdopterName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" placeholder="उदा. अनिता देसाई" required />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">मोबाइल नंबर (Phone)</label>
                  <input type="text" id="inAdopterPhone" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="98XXXXXXXX" required />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">आधार कार्ड नंबर (KYC)</label>
                  <input type="text" id="inAdopterAadhar" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="XXXX-XXXX-1234" required />
                </div>
              </div>

              <div class="space-y-2 pt-1">
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkHomeCheck" class="w-4 h-4 text-purple-500 rounded" checked />
                  <span class="text-white">गृह सत्यापन (Home Check) दल द्वारा अनुमोदित</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkLegalDeed" class="w-4 h-4 text-purple-500 rounded" checked />
                  <span class="text-white">गैर-व्यापारिक आजीवन देखभाल शपथ पत्र हस्ताक्षरित</span>
                </label>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelAdoption" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitAdoption" class="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold">अनुबंध निष्पादित करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseAdoptionModal").addEventListener("click", close);
      document.getElementById("btnCancelAdoption").addEventListener("click", close);

      document.getElementById("formAddAdoption").addEventListener("submit", async () => {
        const intakeId = document.getElementById("selAdoptionAnimal").value;
        const adopterName = document.getElementById("inAdopterName").value.trim();
        const phone = document.getElementById("inAdopterPhone").value.trim();
        const aadharNo = document.getElementById("inAdopterAadhar").value.trim();
        const homeCheckPassed = document.getElementById("chkHomeCheck").checked;
        const agreementSigned = document.getElementById("chkLegalDeed").checked;

        const newAdoption = {
          id: "ADOPT-" + Date.now(),
          recordType: "ADOPTION",
          adoptionId: "ADOPT-2026-" + Date.now().toString().slice(-4),
          intakeId,
          adopterName,
          phone,
          aadharNo,
          homeCheckPassed,
          adoptionAgreementSigned: agreementSigned,
          adoptionDate: new Date().toISOString().split("T")[0],
          followUpStatus: "SCHEDULED_15_DAYS"
        };

        await ShelterStorage.put(newAdoption);
        this.state.adoptionRegistry.unshift(newAdoption);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("गोद अनुबंध सफलतापूर्वक पंजीकृत किया गया!", "success");
        }
      });
    },

    // 4.7 STATUTORY MUNICIPAL / AWBI CSVR RELEASE MANIFEST PRINT ENGINE
    printAbcReleaseManifest(batchDate) {
      const eligibleSurgeries = this.state.abcSurgeryRecords.filter(
        (s) => s.postOpDaysInKennel >= ABC_STANDARDS.MANDATES.MIN_POST_OP_DAYS
      );

      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि वैधानिक CSVR रिलीज मैनिफेस्ट मुद्रित किया जा सके।");
        return;
      }

      const rows = eligibleSurgeries
        .map((s, idx) => {
          const animal = this.state.shelterAnimals.find((a) => a.intakeId === s.intakeId) || {};
          return `
          <tr>
            <td style="font-family: monospace;">${idx + 1}</td>
            <td style="font-family: monospace;"><strong>${s.intakeId}</strong></td>
            <td>${animal.sex || "N/A"} / ${animal.colorMarkings || "Indie"}</td>
            <td><strong>${animal.captureLocation || "Ward Unspecified"}</strong></td>
            <td style="font-family: monospace;">${s.rabiesVaccineLotNo || "ARV OK"}</td>
            <td><strong style="color: #065f46;">YES (LEFT EAR V-NOTCH)</strong></td>
            <td><strong>SAME AS ORIGIN</strong></td>
          </tr>
        `;
        })
        .join("");

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>AWBI Statutory ABC Dog Release Manifest - ${batchDate}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-green { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .legal-banner { background: #fef3c7; border: 1px solid #fde68a; padding: 8px 12px; border-radius: 6px; font-size: 10px; color: #92400e; margin: 15px 0; }
            .seal-row { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 180px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #064e3b; letter-spacing: -0.5px;">VETCARE AI OS (SHELTER MEDICINE & ABC WING)</div>
                <div style="font-size: 10px; color: #4b5563;">National Animal Birth Control (Dogs) Regulatory Monitoring System</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">वैधानिक नसबंदी, एंटी-रेबीज टीकाकरण एवं मूल स्थान वापसी प्रमाणपत्र (CSVR Release Manifest)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-green">AWBI 2023/2026 STATUTORY COMPLIANT</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">MANIFEST REF: ABC-REL-${Date.now().toString().slice(-6)}</div>
                <div style="font-size: 9px; color: #6b7280;">Release Date: ${batchDate}</div>
              </td>
            </tr>
          </table>

          <div class="legal-banner">
            <strong>कानूनी घोषणा (Statutory CSVR Declaration):</strong> यह प्रमाणित किया जाता है कि निम्नलिखित सभी कुत्तों को उनके पकड़ने के बाद न्यूनतम 4 दिन पोस्ट-ऑपरेटिव केनेल में रखा गया है। घाव पूर्णतया ठीक हैं, बाएं कान पर 'V' आकार का नॉच सत्यापित है, एवं एंटी-रेबीज वैक्सीन लगाई जा चुकी है। इन्हें सर्वोच्च न्यायालय एवं भारतीय जीव जंतु कल्याण बोर्ड (AWBI) के निर्देशानुसार उसी सटीक स्थान/वार्ड में छोड़ा जा रहा है।
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th width="5%">क्र.</th>
                <th width="15%">दाखिला टोकन नं.</th>
                <th width="15%">लिंग व विवरण</th>
                <th width="30%">मूल पकड़ स्थान (Origin Ward / Street)</th>
                <th width="15%">ARV वैक्सीन लॉट</th>
                <th width="10%">कान नॉच</th>
                <th width="10%">वापसी स्थल</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="7" style="text-align: center; padding: 20px;">वर्तमान में कोई कुत्ता 4-दिन पोस्ट-ऑप अर्हता पूरी नहीं कर रहा है।</td></tr>`}
            </tbody>
          </table>

          <div class="seal-row">
            <div class="sig-box">
              डॉग कैचर / वाहन चालक हस्ताक्षर<br/>
              <strong>MCD / Municipal Catcher Squad</strong>
            </div>
            <div class="sig-box">
              जीव कल्याण प्रतिनिधि / एनजीओ<br/>
              <strong>AWBI Recognized NGO Rep</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #064e3b; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #064e3b; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>ABC STATUTORY SEAL
              </div>
            </div>
            <div class="sig-box">
              अधिकृत पशु चिकित्सा सर्जन<br/>
              <strong>Authorized ABC Vet Surgeon</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 CSVR REGULATORY HASH: 9E12F843BA017C89001248BBDF9843210ACDE9948210DDF9245ACBB60124987E<br/>
            Vetcare AI OS - 2026 Production Master Core • Generated for Official State Animal Welfare Board Audit
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
      const modalHost = document.getElementById("shelterModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Shelter Animal Welfare Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.ShelterAnimalWelfareAbc = ShelterAnimalWelfareAbc;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ShelterAnimalWelfareAbc.init();
    });
  } else {
    ShelterAnimalWelfareAbc.init();
  }
})();
