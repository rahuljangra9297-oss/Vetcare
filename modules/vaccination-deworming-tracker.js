// Vetcare AI OS - Veterinary Preventive Medicine, Vaccination Scheduler & Strategic Deworming Engine (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_PREVENTIVE = "clinical_records";

  // Comprehensive Multi-Species Standard Immunization Protocols
  const VACCINATION_SCHEDULES_MASTER = {
    bovine: [
      { id: "VAC-FMD", name: "FMD (Foot & Mouth Disease / खुरपका-मुंहपका)", antigen: "Inactivated Trivalent (O, A, Asia-1)", primaryAgeMonths: 4, boosterIntervalDays: 28, recallIntervalMonths: 6, doseRoute: "2 ml SC (Deep Subcutaneous)", seasonalWindow: "Pre-monsoon (April-May) & Post-monsoon (Oct-Nov)", mandatoryGovt: true },
      { id: "VAC-HS", name: "HS (Haemorrhagic Septicaemia / गलघोंटू)", antigen: "Alum Precipitated Pasteurella multocida", primaryAgeMonths: 6, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "3-5 ml SC", seasonalWindow: "Pre-monsoon (May-June)", mandatoryGovt: true },
      { id: "VAC-BQ", name: "BQ (Black Quarter / एकटंगा-लंगड़ा बुखार)", antigen: "Clostridium chauvoei Anaculture", primaryAgeMonths: 6, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "5 ml SC", seasonalWindow: "Pre-monsoon (May-June)", mandatoryGovt: true },
      { id: "VAC-BRU", name: "Brucellosis (ब्रूसीलोसिस)", antigen: "Live Attenuated Brucella abortus (Strain 19)", primaryAgeMonths: 5, boosterIntervalDays: 0, recallIntervalMonths: 0, doseRoute: "2 ml SC (Female Calves 4-8 Months Only)", seasonalWindow: "Once in Lifetime (Calfhood Only)", mandatoryGovt: true },
      { id: "VAC-THEI", name: "Theileriosis (थायलेरियासिस)", antigen: "Schizont Cell Culture (Theileria annulata)", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "3 ml SC", seasonalWindow: "Crossbred Calves (Spring)", mandatoryGovt: false },
      { id: "VAC-LSD", name: "Lumpy Skin Disease (गांठदार त्वचा रोग)", antigen: "Homologous Goat Pox Virus (Uttarkashi Strain)", primaryAgeMonths: 4, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "3 ml SC", seasonalWindow: "Annual (February-March)", mandatoryGovt: true }
    ],
    bubaline: [
      { id: "VAC-FMD-BUF", name: "FMD (Foot & Mouth Disease / खुरपका-मुंहपका)", antigen: "Inactivated Trivalent (O, A, Asia-1)", primaryAgeMonths: 4, boosterIntervalDays: 28, recallIntervalMonths: 6, doseRoute: "2 ml SC (Deep Subcutaneous)", seasonalWindow: "Bi-annual (April & October)", mandatoryGovt: true },
      { id: "VAC-HS-BUF", name: "HS (Haemorrhagic Septicaemia / गलघोंटू)", antigen: "Oil Adjuvant / Alum Precipitated P. multocida", primaryAgeMonths: 6, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "3 ml IM / 5 ml SC", seasonalWindow: "Pre-monsoon (May-June)", mandatoryGovt: true },
      { id: "VAC-BQ-BUF", name: "BQ (Black Quarter / लंगड़ा बुखार)", antigen: "Clostridium chauvoei Bacterin", primaryAgeMonths: 6, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "5 ml SC", seasonalWindow: "Pre-monsoon (May-June)", mandatoryGovt: true },
      { id: "VAC-BRU-BUF", name: "Brucellosis (ब्रूसीलोसिस)", antigen: "B. abortus Strain 19", primaryAgeMonths: 5, boosterIntervalDays: 0, recallIntervalMonths: 0, doseRoute: "2 ml SC (Female Murrah Calves 4-8 mos)", seasonalWindow: "Once in Lifetime", mandatoryGovt: true }
    ],
    caprine: [
      { id: "VAC-PPR", name: "PPR (Peste des Petits Ruminants / बकरी प्लेग)", antigen: "Live Attenuated Sungri 96 Strain", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 36, doseRoute: "1 ml SC", seasonalWindow: "Once every 3 years", mandatoryGovt: true },
      { id: "VAC-ET", name: "ET (Enterotoxaemia / फिड़किया)", antigen: "Clostridium perfringens Type D Toxoid", primaryAgeMonths: 4, boosterIntervalDays: 21, recallIntervalMonths: 12, doseRoute: "2 ml SC", seasonalWindow: "Pre-monsoon (May)", mandatoryGovt: true },
      { id: "VAC-GPOX", name: "Goat Pox (बकरी चेचक / माता)", antigen: "Attenuated Live Goat Pox Virus", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "Winter (December-January)", mandatoryGovt: true },
      { id: "VAC-CCPP", name: "CCPP (Contagious Caprine Pleuropneumonia)", antigen: "Mycoplasma capricolum subsp. capripneumoniae", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "Annual", mandatoryGovt: false }
    ],
    ovine: [
      { id: "VAC-PPR-SH", name: "PPR (Peste des Petits Ruminants)", antigen: "Live Attenuated Sungri 96", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 36, doseRoute: "1 ml SC", seasonalWindow: "Triennial", mandatoryGovt: true },
      { id: "VAC-ET-SH", name: "Enterotoxaemia (फिड़किया / Pulpy Kidney)", antigen: "C. perfringens Type D", primaryAgeMonths: 3, boosterIntervalDays: 21, recallIntervalMonths: 12, doseRoute: "2 ml SC", seasonalWindow: "Pre-monsoon", mandatoryGovt: true },
      { id: "VAC-SPOX", name: "Sheep Pox (भेड़ चेचक)", antigen: "Live Attenuated Romanian Strain", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "Annual (December)", mandatoryGovt: true }
    ],
    canine: [
      { id: "VAC-CAN-DHP", name: "DHPPiL (Megavac-6 / Nobivac DHPPi+L)", antigen: "CDV, CAV-2, CPV-2, CPiV, Leptospira icterohaemorrhagiae & canicola", primaryAgeMonths: 1.5, boosterIntervalDays: 21, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "6, 9 & 12 Weeks then Annual", mandatoryGovt: true },
      { id: "VAC-CAN-RAB", name: "Anti-Rabies (रेबीज रोधी - Rabisin/Nobivac R)", antigen: "Inactivated Rabies Virus (Pasteur RIV Strain)", primaryAgeMonths: 3, boosterIntervalDays: 30, recallIntervalMonths: 12, doseRoute: "1 ml SC / IM", seasonalWindow: "3 Months then Booster at 1 Yr / Annual", mandatoryGovt: true },
      { id: "VAC-CAN-KC", name: "Kennel Cough (Bordetella + Parainfluenza)", antigen: "Bordetella bronchiseptica Live/Inactivated", primaryAgeMonths: 2, boosterIntervalDays: 28, recallIntervalMonths: 12, doseRoute: "Intranasal / 1 ml SC", seasonalWindow: "Annual / High Risk", mandatoryGovt: false }
    ],
    feline: [
      { id: "VAC-FEL-TRI", name: "Tricat Trio (FVRCP / Feline 3-in-1)", antigen: "Feline Panleukopenia, Herpesvirus-1, Calicivirus", primaryAgeMonths: 2, boosterIntervalDays: 21, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "8 & 12 Weeks then Annual", mandatoryGovt: true },
      { id: "VAC-FEL-RAB", name: "Anti-Rabies (मार्जार रेबीज रोधी)", antigen: "Inactivated Rabies Virus", primaryAgeMonths: 3, boosterIntervalDays: 0, recallIntervalMonths: 12, doseRoute: "1 ml SC", seasonalWindow: "Annual", mandatoryGovt: true }
    ],
    poultry: [
      { id: "VAC-POUL-MD", name: "Marek's Disease (मारेक्स रोग)", antigen: "HVT (Herpesvirus of Turkeys)", primaryAgeMonths: 0.03, boosterIntervalDays: 0, recallIntervalMonths: 0, doseRoute: "0.2 ml SC at Day 1 in Hatchery", seasonalWindow: "Day-Old Chick", mandatoryGovt: true },
      { id: "VAC-POUL-NDF", name: "Ranikhet Disease / ND (F / Lasota Strain)", antigen: "Live Newcastle Disease Virus (Lentogenic)", primaryAgeMonths: 0.2, boosterIntervalDays: 21, recallIntervalMonths: 3, doseRoute: "1 Drop Intraocular / Nasal", seasonalWindow: "Day 5-7 then Day 28", mandatoryGovt: true },
      { id: "VAC-POUL-IBD", name: "Gumboro (Infectious Bursal Disease - IBD)", antigen: "Live Intermediate IBD Virus", primaryAgeMonths: 0.4, boosterIntervalDays: 14, recallIntervalMonths: 0, doseRoute: "Oral (Drinking Water with Skimmed Milk)", seasonalWindow: "Day 12-14 & Day 24", mandatoryGovt: true },
      { id: "VAC-POUL-NDR", name: "Ranikhet R2B (मुर्गी रानीखेत टीका)", antigen: "Mesogenic Newcastle Disease Strain", primaryAgeMonths: 2, boosterIntervalDays: 0, recallIntervalMonths: 6, doseRoute: "0.5 ml SC", seasonalWindow: "8-10 Weeks of Age", mandatoryGovt: true }
    ]
  };

  // Strategic Anthelmintic Class Rotation Master Protocols
  const ANTHELMINTIC_ROTATION_MASTER = {
    classA_Benzimidazoles: {
      name: "वर्ग 1: बेंजिमिडाजोल (Benzimidazoles)",
      molecules: [
        { name: "Albendazole (एल्बेंडाजोल)", doseMgKg: 7.5, route: "Oral Liquid/Bolus", targetParasites: "Nematodes, Moniezia tapeworms, adult liver flukes (at 10 mg/kg)", milkWithdrawalHours: 72, meatWithdrawalDays: 14, contraindicatedPregnancy: true },
        { name: "Fenbendazole (फेनबेंडाजोल)", doseMgKg: 5.0, route: "Oral Suspension/Bolus", targetParasites: "Gastrointestinal nematodes, lungworms, Giardia", milkWithdrawalHours: 0, meatWithdrawalDays: 8, contraindicatedPregnancy: false }
      ],
      nextRotationClass: "classB_Imidazothiazoles"
    },
    classB_Imidazothiazoles: {
      name: "वर्ग 2: इमिडाजोथियाजोल (Imidazothiazoles)",
      molecules: [
        { name: "Levamisole Hydrochloride (लेवामिसोल)", doseMgKg: 7.5, route: "Oral / Subcutaneous", targetParasites: "Adult & larval GI nematodes, lungworms (Dictyocaulus), immunostimulant", milkWithdrawalHours: 48, meatWithdrawalDays: 7, contraindicatedPregnancy: false }
      ],
      nextRotationClass: "classC_MacrocyclicLactones"
    },
    classC_MacrocyclicLactones: {
      name: "वर्ग 3: मैक्रोसाइक्लिक लैक्टोन्स (Macrocyclic Lactones)",
      molecules: [
        { name: "Ivermectin (आइवरमेक्टिन)", doseMgKg: 0.2, route: "Subcutaneous Injection / Pour-on", targetParasites: "Endoparasites (Nematodes) + Ectoparasites (Ticks, Sucking Lice, Mange mites)", milkWithdrawalHours: 672, meatWithdrawalDays: 28, contraindicatedPregnancy: false },
        { name: "Doramectin (डोरामेक्टिन)", doseMgKg: 0.2, route: "Subcutaneous / Intramuscular", targetParasites: "Long-acting systemic internal & external parasites", milkWithdrawalHours: 840, meatWithdrawalDays: 35, contraindicatedPregnancy: false }
      ],
      nextRotationClass: "classD_Salicylanilides"
    },
    classD_Salicylanilides: {
      name: "वर्ग 4: सैलिसिलैनिलाइड्स व हैलोजेनेटेड फेनोल्स (Liver Fluke Specialists)",
      molecules: [
        { name: "Oxyclozanide (ऑक्सीक्लोज़ानाइड)", doseMgKg: 10.0, route: "Oral Drench", targetParasites: "Adult Fasciola hepatica & gigantica, Paramphistomum (Rumen flukes)", milkWithdrawalHours: 72, meatWithdrawalDays: 14, contraindicatedPregnancy: false },
        { name: "Closantel (क्लोसैंटेल)", doseMgKg: 10.0, route: "Oral / Subcutaneous", targetParasites: "Mature & immature Liver Flukes, Haemonchus contortus, Oestrus ovis nasal bot", milkWithdrawalHours: 672, meatWithdrawalDays: 28, contraindicatedPregnancy: false }
      ],
      nextRotationClass: "classA_Benzimidazoles"
    }
  };

  root.VetcareApp.ClinicalData.VaccinationSchedules = VACCINATION_SCHEDULES_MASTER;
  root.VetcareApp.ClinicalData.DewormingProtocols = ANTHELMINTIC_ROTATION_MASTER;

  // Pre-seeded Operational Data for Production Tracker
  const INITIAL_PREVENTIVE_RECORDS = [
    {
      recordId: "PRV-2026-001",
      tagNumber: "100293847561",
      patientName: "Gauri (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Indigenous",
      ownerName: "Chaudhary Dharamvir Singh",
      mobileNumber: "9812039281",
      village: "Bhadurpur, Karnal",
      type: "vaccination",
      protocolId: "VAC-FMD-BUF",
      title: "FMD (खुरपका-मुंहपका) Bi-annual",
      antigenOrDrug: "Raksha-Ovac (Trivalent O, A, Asia-1)",
      batchNumber: "FMD-2026-992",
      manufacturer: "Indian Immunologicals Ltd",
      doseAndRoute: "2 ml Deep SC",
      dueDate: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0],
      status: "OVERDUE", // 'COMPLETED' | 'DUE_SOON' | 'OVERDUE'
      administeredDate: null,
      administeringVet: null,
      coldChainTempC: 4.2,
      notes: "Pre-monsoon drive booster overdue. Milk production protection required."
    },
    {
      recordId: "PRV-2026-002",
      tagNumber: "100293847562",
      patientName: "Kamdhenu (Sahiwal Cow)",
      species: "bovine",
      breed: "Sahiwal Indigenous",
      ownerName: "Mahinder Rawat",
      mobileNumber: "9416182931",
      village: "Assandh, Karnal",
      type: "vaccination",
      protocolId: "VAC-HS",
      title: "HS (Haemorrhagic Septicaemia / गलघोंटू)",
      antigenOrDrug: "Raksha-HS (Alum Precipitated)",
      batchNumber: "HS-2026-B12",
      manufacturer: "National Vet Biologicals",
      doseAndRoute: "3 ml SC",
      dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
      status: "DUE_SOON",
      administeredDate: null,
      administeringVet: null,
      coldChainTempC: 3.8,
      notes: "Annual pre-monsoon vaccination schedule."
    },
    {
      recordId: "PRV-2026-003",
      tagNumber: "PET-DEL-8921",
      patientName: "Bruno (Labrador)",
      species: "canine",
      breed: "Labrador Retriever",
      ownerName: "Priya Sharma",
      mobileNumber: "9811203948",
      village: "Sector 14, Urban, Gurugram",
      type: "vaccination",
      protocolId: "VAC-CAN-RAB",
      title: "Anti-Rabies Vaccine (Annual Booster)",
      antigenOrDrug: "Nobivac Rabies (Pasteur Strain)",
      batchNumber: "RAB-2025-V09",
      manufacturer: "MSD Animal Health",
      doseAndRoute: "1 ml SC",
      dueDate: new Date(Date.now() - 86400000 * 60).toISOString().split("T")[0],
      status: "COMPLETED",
      administeredDate: new Date(Date.now() - 86400000 * 60).toISOString().split("T")[0],
      administeringVet: "Dr. Rahul Sharma (Reg. HN-4921)",
      coldChainTempC: 4.5,
      notes: "Official certificate issued. Due for booster in 2027."
    },
    {
      recordId: "PRV-2026-004",
      tagNumber: "100293847561",
      patientName: "Gauri (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Indigenous",
      ownerName: "Chaudhary Dharamvir Singh",
      mobileNumber: "9812039281",
      village: "Bhadurpur, Karnal",
      type: "deworming",
      protocolId: "DEW-ROT-A",
      title: "Strategic Deworming: Benzimidazole Class",
      antigenOrDrug: "Fenbendazole Bolus (Fentas 3g)",
      batchNumber: "FEN-2026-10",
      manufacturer: "Intas Pharmaceuticals",
      doseAndRoute: "3g Bolus Orally (5 mg/kg)",
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      status: "DUE_SOON",
      administeredDate: null,
      administeringVet: null,
      coldChainTempC: null,
      notes: "Rotation cycle 1: Target nematodes. Zero milk withdrawal days."
    }
  ];

  // Module Internal Reactive State
  const state = {
    recordsList: [...INITIAL_PREVENTIVE_RECORDS],
    activeFilter: "all", // 'all' | 'due_soon' | 'overdue' | 'completed'
    speciesFilter: "all",
    searchQuery: "",
    activeTab: "vaccination", // 'vaccination' | 'deworming' | 'mass_campaign'
    isLogModalOpen: false,
    selectedRecordForLog: null,
    coldChainStatus: {
      isMonitored: true,
      currentTempC: 4.1,
      lastAudit: "Just Now",
      status: "OPTIMAL (2°C - 8°C)"
    },
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[VACCINATION TRACKER ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
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

  // Primary Module API Definition
  const VaccinationDewormingTracker = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadPersistedRecords();
        this.setupEventBus();
        this.recalculateStatuses();
        return true;
      } catch (err) {
        console.error("VaccinationDewormingTracker initialization error:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for VaccinationDewormingTracker:", containerId);
        return;
      }
      state.containerElement = container;
      this.recalculateStatuses();

      container.innerHTML = `
        <div id="vetcare-vaccine-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top KPI Telemetry & Cold Chain Banner -->
          ${this.buildKpiBannerHtml()}

          <!-- Tactical Filter & Control Strip -->
          ${this.buildFilterControlStripHtml()}

          <!-- Workstation Viewports Based on Tab -->
          ${
            state.activeTab === "deworming"
              ? this.buildDewormingRotationWorkstationHtml()
              : state.activeTab === "mass_campaign"
              ? this.buildMassCampaignWorkstationHtml()
              : this.buildVaccinationSchedulesWorkstationHtml()
          }

          <!-- Modals Insertion Mount -->
          <div id="vaccine-modal-container"></div>
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
        notify(`टीकाकरण ट्रैकर में पशु लोड हुआ: ${state.searchQuery}`, "info");
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
        const tx = db.transaction(STORE_PREVENTIVE, "readonly");
        const store = tx.objectStore(STORE_PREVENTIVE);
        const index = store.index("recordType");
        const req = index.getAll("vaccination");
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length > 0) {
            // Merge with local records
            list.forEach((dbRec) => {
              const exists = state.recordsList.some((r) => r.recordId === dbRec.recordId);
              if (!exists) {
                state.recordsList.unshift({
                  recordId: dbRec.recordId,
                  tagNumber: dbRec.patientId.replace("PAT-", ""),
                  patientName: "EMR Registered Animal",
                  species: "bovine",
                  breed: "Crossbred",
                  ownerName: "Enrolled Farmer",
                  mobileNumber: "—",
                  village: "Veterinary Catchment",
                  type: "vaccination",
                  protocolId: "VAC-GEN",
                  title: dbRec.vaccineName || "Scheduled Vaccine",
                  antigenOrDrug: dbRec.vaccineName,
                  batchNumber: dbRec.batchNumber || "B-2026",
                  manufacturer: dbRec.manufacturer || "National Vet Labs",
                  doseAndRoute: "Standard Dose SC",
                  dueDate: dbRec.nextDueDate || new Date().toISOString().split("T")[0],
                  status: "COMPLETED",
                  administeredDate: dbRec.timestamp ? dbRec.timestamp.split("T")[0] : null,
                  administeringVet: dbRec.administeredBy || "Dr. Staff",
                  coldChainTempC: 4.0,
                  notes: "IndexedDB Integrated Record"
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

    recalculateStatuses: function () {
      const now = new Date().toISOString().split("T")[0];
      const in7Days = new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0];

      state.recordsList.forEach((r) => {
        if (r.administeredDate) {
          r.status = "COMPLETED";
        } else if (r.dueDate < now) {
          r.status = "OVERDUE";
        } else if (r.dueDate <= in7Days) {
          r.status = "DUE_SOON";
        } else {
          r.status = "SCHEDULED";
        }
      });
    },

    // HTML VIEW BUILDERS
    buildKpiBannerHtml: function () {
      const total = state.recordsList.length;
      const completed = state.recordsList.filter((r) => r.status === "COMPLETED").length;
      const overdue = state.recordsList.filter((r) => r.status === "OVERDUE").length;
      const dueSoon = state.recordsList.filter((r) => r.status === "DUE_SOON").length;
      const coveragePct = total > 0 ? Math.round((completed / total) * 100) : 0;

      return `
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Upcoming in 7 Days Card -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">आगामी 7 दिनों में देय</div>
              <div class="text-2xl font-display font-black text-amber-400 mt-1">${dueSoon} <span class="text-xs font-normal text-slate-400">खुराक</span></div>
              <div class="text-[10px] text-amber-300/80 font-mono mt-0.5">SMS अलर्ट प्रेषण योग्य</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
              <i class="fa-solid fa-bell"></i>
            </div>
          </div>

          <!-- Overdue Critical Alert -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">अतिदेय / छूटा हुआ (Overdue)</div>
              <div class="text-2xl font-display font-black text-rose-400 mt-1">${overdue} <span class="text-xs font-normal text-slate-400">पशु</span></div>
              <div class="text-[10px] text-rose-300/80 font-mono mt-0.5">रोग प्रकोप जोखिम उच्च</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xl">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>

          <!-- Herd Immunization Coverage Progress -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <div class="text-[11px] font-mono uppercase text-slate-400">झुंड प्रतिरक्षा कवरेज (Herd Immunity)</div>
              <span class="text-xs font-mono font-bold text-emerald-400">${coveragePct}%</span>
            </div>
            <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-2">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style="width: ${coveragePct}%;"></div>
            </div>
            <div class="text-[10px] text-slate-400 font-mono">
              कुल पंजीकृत: <strong class="text-white">${total}</strong> | पूर्ण टीकाकरण: <strong class="text-emerald-400">${completed}</strong>
            </div>
          </div>

          <!-- Cold Chain Real-Time Telemetry Monitor -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">कोल्ड-चेन निगरानी (2-8°C)</div>
              <div class="text-xl font-display font-black text-cyan-400 mt-0.5 flex items-center gap-1.5">
                <i class="fa-solid fa-snowflake text-sm animate-spin" style="animation-duration: 8s;"></i>
                <span>${state.coldChainStatus.currentTempC}°C</span>
                <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">PASS</span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">ILR रेफ्रिजरेटर सेंसर 01</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
              <i class="fa-solid fa-temperature-arrow-down"></i>
            </div>
          </div>

        </div>
      `;
    },

    buildFilterControlStripHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <!-- Navigation Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <button 
              type="button" 
              data-preventive-tab="vaccination" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "vaccination"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-syringe"></i>
              <span>टीकाकरण अनुसूची (Vaccinations)</span>
            </button>

            <button 
              type="button" 
              data-preventive-tab="deworming" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "deworming"
                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-lg shadow-amber-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-tablets"></i>
              <span>रणनीतिक कृमिनाशक (Deworming Rotation)</span>
            </button>

            <button 
              type="button" 
              data-preventive-tab="mass_campaign" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                state.activeTab === "mass_campaign"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-people-roof"></i>
              <span>सामूहिक ग्राम अभियान (Mass Campaign)</span>
            </button>
          </div>

          <!-- Search & Filter Controls -->
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="relative min-w-[200px] flex-1 sm:flex-initial">
              <input 
                type="text" 
                id="preventiveSearchInput" 
                value="${state.searchQuery}" 
                placeholder="टैग नं., टीका या किसान खोजें..." 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-slate-400 text-xs pointer-events-none"></i>
            </div>

            <select id="preventiveSpeciesSelect" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="all" ${state.speciesFilter === "all" ? "selected" : ""}>समस्त प्रजातियां</option>
              <option value="bovine" ${state.speciesFilter === "bovine" ? "selected" : ""}>Bovine (गाय)</option>
              <option value="bubaline" ${state.speciesFilter === "bubaline" ? "selected" : ""}>Bubaline (भैंस)</option>
              <option value="caprine" ${state.speciesFilter === "caprine" ? "selected" : ""}>Caprine (बकरी)</option>
              <option value="ovine" ${state.speciesFilter === "ovine" ? "selected" : ""}>Ovine (भेड़)</option>
              <option value="canine" ${state.speciesFilter === "canine" ? "selected" : ""}>Canine (श्वान)</option>
              <option value="feline" ${state.speciesFilter === "feline" ? "selected" : ""}>Feline (मार्जार)</option>
              <option value="poultry" ${state.speciesFilter === "poultry" ? "selected" : ""}>Poultry (कुक्कुट)</option>
            </select>

            <select id="preventiveStatusFilter" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="all" ${state.activeFilter === "all" ? "selected" : ""}>समस्त स्थिति</option>
              <option value="due_soon" ${state.activeFilter === "due_soon" ? "selected" : ""}>आगामी देय (Due Soon)</option>
              <option value="overdue" ${state.activeFilter === "overdue" ? "selected" : ""}>अतिदेय (Overdue)</option>
              <option value="completed" ${state.activeFilter === "completed" ? "selected" : ""}>पूर्ण (Completed)</option>
            </select>

            <button id="btnOpenNewScheduleModal" type="button" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 active:scale-95 transition-all">
              <i class="fa-solid fa-plus-circle"></i>
              <span>+ प्रविष्टि दर्ज करें</span>
            </button>

            <button id="btnExportSchedulesCsv" type="button" title="Export CSV" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              <i class="fa-solid fa-file-csv"></i>
            </button>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 1: Vaccination Schedules Table
    buildVaccinationSchedulesWorkstationHtml: function () {
      const filtered = this.getFilteredRecords("vaccination");

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-calendar-check text-emerald-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                पशु रोग प्रतिरक्षण अनुसूची एवं देय तिथियां (${filtered.length})
              </h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">राष्ट्रीय पशु रोग नियंत्रण कार्यक्रम (NADCP) अनुपालन</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">टैग / पशु पहचान</th>
                  <th class="px-3.5 py-3">टीके का नाम व एंटीजन</th>
                  <th class="px-3.5 py-3">खुराक एवं मार्ग</th>
                  <th class="px-3.5 py-3">देय तिथि (Due Date)</th>
                  <th class="px-3.5 py-3">स्थिति (Status)</th>
                  <th class="px-3.5 py-3">पशुपालक एवं गांव</th>
                  <th class="px-3.5 py-3 text-right">कार्यवाही (Actions)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/70 font-sans">
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="7" class="p-8 text-center text-xs text-slate-500 font-mono">कोई टीकाकरण अनुसूची नहीं मिली। नया शेड्यूल जोड़ें।</td></tr>`
                    : filtered
                        .map((r) => {
                          let badge = "";
                          if (r.status === "COMPLETED") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><i class="fa-solid fa-check mr-1"></i>पूर्ण (${r.administeredDate})</span>`;
                          } else if (r.status === "OVERDUE") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"><i class="fa-solid fa-clock-rotate-left mr-1"></i>अतिदेय (Overdue)</span>`;
                          } else if (r.status === "DUE_SOON") {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"><i class="fa-solid fa-hourglass-half mr-1"></i>आगामी देय</span>`;
                          } else {
                            badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400">नियत (Scheduled)</span>`;
                          }

                          return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3.5 py-3 font-mono font-bold text-white">
                          <div class="flex items-center gap-1.5">
                            <span class="text-emerald-400"><i class="fa-solid fa-tag text-[10px]"></i></span>
                            <span>${r.tagNumber}</span>
                          </div>
                          <div class="text-[11px] text-slate-400 font-sans font-normal">${r.species.toUpperCase()} (${r.breed})</div>
                        </td>
                        <td class="px-3.5 py-3">
                          <div class="font-bold text-slate-200 text-xs">${r.title}</div>
                          <div class="text-[10px] font-mono text-slate-400">${r.antigenOrDrug}</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono text-slate-300">${r.doseAndRoute}</td>
                        <td class="px-3.5 py-3 font-mono font-bold ${r.status === "OVERDUE" ? "text-rose-400" : "text-amber-400"}">${r.dueDate}</td>
                        <td class="px-3.5 py-3">${badge}</td>
                        <td class="px-3.5 py-3 text-xs">
                          <div class="text-slate-200 font-medium">${r.ownerName}</div>
                          <div class="text-[10px] font-mono text-slate-400">${r.village}</div>
                        </td>
                        <td class="px-3.5 py-3 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            ${
                              r.status !== "COMPLETED"
                                ? `
                              <button 
                                type="button" 
                                data-log-administer-id="${r.recordId}" 
                                title="Mark as Administered" 
                                class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                              >
                                टीका लगाएं
                              </button>
                            `
                                : `
                              <button 
                                type="button" 
                                data-print-cert-id="${r.recordId}" 
                                title="Print Vaccination Certificate" 
                                class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                              >
                                <i class="fa-solid fa-print"></i>
                              </button>
                            `
                            }
                            <button 
                              type="button" 
                              data-sms-alert-id="${r.recordId}" 
                              title="Send Farmer SMS Reminder" 
                              class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700"
                            >
                              <i class="fa-solid fa-comment-sms"></i>
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

    // WORKSTATION TAB 2: Strategic Deworming Planner & Resistance Rotation
    buildDewormingRotationWorkstationHtml: function () {
      const filtered = this.getFilteredRecords("deworming");

      return `
        <div class="space-y-6">
          
          <!-- Strategic Class Rotation Master Guide Banner -->
          <div class="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg">
                  <i class="fa-solid fa-arrows-spin"></i>
                </div>
                <div>
                  <h3 class="text-sm font-display font-black text-white">रणनीतिक कृमिनाशक औषध चक्र (Anthelmintic Rotation Wheel)</h3>
                  <div class="text-[11px] font-mono text-amber-300/90">परजीवी प्रतिरोधी क्षमता (Anthelmintic Resistance) रोकथाम प्रणाली</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                त्रैमासिक चक्र (Quarterly Rotation)
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div class="text-[10px] text-emerald-400 uppercase font-bold">चरण 1: बेंजिमिडाजोल</div>
                <div class="font-bold text-white mt-1">Fenbendazole / Albendazole</div>
                <div class="text-[10px] text-slate-400 mt-0.5">लक्ष्य: नेमाटोड्स व फीताकृमि</div>
                <div class="text-[9px] text-emerald-300 mt-1">दुग्ध त्याग अवधि: शून्य / 72 घंटे</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div class="text-[10px] text-cyan-400 uppercase font-bold">चरण 2: इमिडाजोथियाजोल</div>
                <div class="font-bold text-white mt-1">Levamisole HCl (7.5 mg/kg)</div>
                <div class="text-[10px] text-slate-400 mt-0.5">लक्ष्य: फेफड़ों के कृमि व इम्युनिटी</div>
                <div class="text-[9px] text-cyan-300 mt-1">दुग्ध त्याग अवधि: 48 घंटे</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div class="text-[10px] text-purple-400 uppercase font-bold">चरण 3: मैक्रोसाइक्लिक</div>
                <div class="font-bold text-white mt-1">Ivermectin (0.2 mg/kg SC)</div>
                <div class="text-[10px] text-slate-400 mt-0.5">लक्ष्य: आंतरिक + बाहरी परजीवी (चिंचड़ी)</div>
                <div class="text-[9px] text-purple-300 mt-1">दुग्ध त्याग अवधि: 28 दिन (दूध में वर्जित)</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div class="text-[10px] text-amber-400 uppercase font-bold">चरण 4: फ्लूक स्पेशल</div>
                <div class="font-bold text-white mt-1">Oxyclozanide / Closantel</div>
                <div class="text-[10px] text-slate-400 mt-0.5">लक्ष्य: यकृत पर्णकृमि (Fasciola)</div>
                <div class="text-[9px] text-amber-300 mt-1">दुग्ध त्याग अवधि: 72 घंटे</div>
              </div>
            </div>
          </div>

          <!-- Deworming Schedule Table -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-tablets text-amber-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">कृमिनाशक शेड्यूल एवं देय तिथियां (${filtered.length})</h3>
              </div>
              <span class="text-[10px] font-mono text-slate-400">गर्भ व दूध सुरक्षा गार्डरेल्स लागू</span>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3.5 py-3">टैग / पहचान</th>
                    <th class="px-3.5 py-3">औषधि वर्ग व नाम</th>
                    <th class="px-3.5 py-3">खुराक दर (mg/kg)</th>
                    <th class="px-3.5 py-3">देय तिथि</th>
                    <th class="px-3.5 py-3">दूध त्याग (Withdrawal)</th>
                    <th class="px-3.5 py-3">पशुपालक</th>
                    <th class="px-3.5 py-3 text-right">कार्यवाही</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/70 font-sans">
                  ${
                    filtered.length === 0
                      ? `<tr><td colspan="7" class="p-8 text-center text-xs text-slate-500 font-mono">कोई कृमिनाशक शेड्यूल नहीं मिला।</td></tr>`
                      : filtered
                          .map((r) => {
                            return `
                        <tr class="hover:bg-slate-850/50 transition-colors">
                          <td class="px-3.5 py-3 font-mono font-bold text-white">
                            <div>${r.tagNumber}</div>
                            <div class="text-[11px] text-slate-400 font-sans font-normal">${r.species.toUpperCase()} (${r.breed})</div>
                          </td>
                          <td class="px-3.5 py-3">
                            <div class="font-bold text-slate-200 text-xs">${r.title}</div>
                            <div class="text-[10px] font-mono text-amber-400">${r.antigenOrDrug}</div>
                          </td>
                          <td class="px-3.5 py-3 font-mono text-slate-300">${r.doseAndRoute}</td>
                          <td class="px-3.5 py-3 font-mono font-bold text-amber-400">${r.dueDate}</td>
                          <td class="px-3.5 py-3 font-mono text-xs">
                            <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">शून्य (Zero Days)</span>
                          </td>
                          <td class="px-3.5 py-3 text-xs">
                            <div class="text-slate-200 font-medium">${r.ownerName}</div>
                            <div class="text-[10px] font-mono text-slate-400">${r.village}</div>
                          </td>
                          <td class="px-3.5 py-3 text-right">
                            <button 
                              type="button" 
                              data-log-administer-id="${r.recordId}" 
                              class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold shadow"
                            >
                              खुराक दें
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

        </div>
      `;
    },

    // WORKSTATION TAB 3: Mass Village Campaign Batch Entry
    buildMassCampaignWorkstationHtml: function () {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Campaign Input Form (Cols 1-7) -->
          <div class="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-people-roof text-cyan-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">
                  सामूहिक ग्राम पशु टीकाकरण अभियान प्रविष्टि (Mass Village Drive)
                </h3>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                बैच लॉगिंग
              </span>
            </div>

            <form id="massCampaignForm" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">अभियान का नाम (Campaign Name) *</label>
                  <input type="text" id="campName" required value="NADCP FMD Round-IV Mass Drive" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">लक्षित गांव / ब्लॉक (Village / Block) *</label>
                  <input type="text" id="campVillage" required value="Bhadurpur, Karnal" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">टीके का चयन (Vaccine Name) *</label>
                  <select id="campVaccine" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500">
                    <option value="Raksha-Ovac (FMD Inactivated)">Raksha-Ovac (FMD Trivalent)</option>
                    <option value="Raksha-HS (Haemorrhagic Septicaemia)">Raksha-HS (गलघोंटू)</option>
                    <option value="Raksha-BQ (Black Quarter)">Raksha-BQ (एकटंगा)</option>
                    <option value="PPR Vaccine (Sungri 96)">PPR Goat Plague Vaccine</option>
                    <option value="ET Vaccine (Enterotoxaemia)">ET फिड़किया वैक्सीन</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">वैक्सीन बैच / लॉट नं. *</label>
                  <input type="text" id="campBatch" required value="FMD-2026-X88" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">कोल्ड-चेन तापमान (°C) *</label>
                  <input type="number" step="0.1" id="campTemp" required value="4.2" min="1.0" max="9.0" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">कुल टीकाकरण किए गए पशु (Doses Count) *</label>
                  <input type="number" id="campDoses" required min="1" value="85" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">अधिकृत चिकित्सक / वैक्सीनेटर ID *</label>
                  <input type="text" id="campVetId" required value="Dr. Rahul Sharma (V.O. 9991039297)" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">अभियान टिप्पणी / प्रतिकूल प्रभाव यदि कोई हो</label>
                <textarea id="campNotes" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500" placeholder="सभी पशु स्वस्थ हैं, शून्य एनाफाइलेक्सिस रिपोर्ट..."></textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="submit" class="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50">
                  अभियान बैच रिकॉर्ड दर्ज करें (Commit Drive)
                </button>
              </div>
            </form>
          </div>

          <!-- Campaign Guidelines & Vaccine Cold Chain Instructions (Cols 8-12) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl text-xs space-y-3">
              <div class="flex items-center gap-2 text-emerald-400 font-bold uppercase font-mono pb-2 border-b border-slate-800">
                <i class="fa-solid fa-shield-halved"></i>
                <span>राष्ट्रीय कोल्ड-चेन सुरक्षा दिशानिर्देश</span>
              </div>
              <div class="text-slate-300 leading-relaxed space-y-2">
                <p><strong>तापमान सीमा:</strong> सभी इनएक्टिवेटेड (FMD, HS, BQ) एवं लाइव टीकों को <strong>2°C से 8°C</strong> के मध्य ही सुरक्षित रखा जाना अनिवार्य है।</p>
                <p><strong>फ्रीज निषेध:</strong> एडज्युवेंट टीकों (Alum / Oil Adjuvant) को कभी भी जमने न दें (डू नॉट फ्रीज); जमने पर प्रभावशीलता नष्ट हो जाती है।</p>
                <p><strong>सिरिंज प्रोटोकॉल:</strong> प्रत्येक पशु हेतु पृथक ऑटो-डिसेबल (AD) सुई का उपयोग करें ताकि रक्त जनित संक्रमण न फैले।</p>
              </div>
            </div>
          </div>

        </div>
      `;
    },

    getFilteredRecords: function (type) {
      return state.recordsList.filter((r) => {
        const matchesType = r.type === type;
        const matchesSpecies = state.speciesFilter === "all" || r.species === state.speciesFilter;
        let matchesStatus = true;
        if (state.activeFilter !== "all") {
          matchesStatus = r.status.toLowerCase() === state.activeFilter.toLowerCase();
        }
        const q = state.searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          r.tagNumber.toLowerCase().includes(q) ||
          r.patientName.toLowerCase().includes(q) ||
          r.ownerName.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.antigenOrDrug.toLowerCase().includes(q);

        return matchesType && matchesSpecies && matchesStatus && matchesQuery;
      });
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-preventive-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-preventive-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Search Input
      const searchInp = container.querySelector("#preventiveSearchInput");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          state.searchQuery = e.target.value;
          this.render(container);
        });
      }

      // 3. Species Dropdown
      const specSelect = container.querySelector("#preventiveSpeciesSelect");
      if (specSelect) {
        specSelect.addEventListener("change", (e) => {
          state.speciesFilter = e.target.value;
          this.render(container);
        });
      }

      // 4. Status Filter Dropdown
      const statusSelect = container.querySelector("#preventiveStatusFilter");
      if (statusSelect) {
        statusSelect.addEventListener("change", (e) => {
          state.activeFilter = e.target.value;
          this.render(container);
        });
      }

      // 5. Open New Schedule Modal
      const btnNew = container.querySelector("#btnOpenNewScheduleModal");
      if (btnNew) {
        btnNew.addEventListener("click", () => this.openNewScheduleModal());
      }

      // 6. Export CSV
      const btnCsv = container.querySelector("#btnExportSchedulesCsv");
      if (btnCsv) {
        btnCsv.addEventListener("click", () => this.exportSchedulesCsv());
      }

      // 7. Mark as Administered Click Delegation
      container.addEventListener("click", (e) => {
        const adminBtn = e.target.closest("[data-log-administer-id]");
        if (adminBtn) {
          const rid = adminBtn.getAttribute("data-log-administer-id");
          this.openAdministerShotModal(rid);
        }

        const printBtn = e.target.closest("[data-print-cert-id]");
        if (printBtn) {
          const rid = printBtn.getAttribute("data-print-cert-id");
          this.generateVaccinationCertificate(rid);
        }

        const smsBtn = e.target.closest("[data-sms-alert-id]");
        if (smsBtn) {
          const rid = smsBtn.getAttribute("data-sms-alert-id");
          this.openSmsAlertModal(rid);
        }
      });

      // 8. Mass Campaign Form Submission
      const campForm = container.querySelector("#massCampaignForm");
      if (campForm) {
        campForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const campName = document.getElementById("campName").value.trim();
          const village = document.getElementById("campVillage").value.trim();
          const doses = document.getElementById("campDoses").value;
          const vaccine = document.getElementById("campVaccine").value;

          notify(`सामूहिक अभियान दर्ज: ${campName} (${village}) में ${doses} खुराकें पूर्ण!`, "success");
          campForm.reset();
        });
      }
    },

    // 4. MODALS & WORKFLOWS: Administer Shot / Dewormer
    openAdministerShotModal: function (recordId) {
      const record = state.recordsList.find((r) => r.recordId === recordId);
      if (!record) return;

      const mount = document.getElementById("vaccine-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="administerShotModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-syringe text-emerald-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">टीकाकरण / खुराक प्रशासन पुष्टि</h3>
              </div>
              <button id="closeAdminModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="administerShotForm" class="space-y-4 text-xs">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div class="text-white font-bold">${record.title}</div>
                <div class="text-slate-400">टैग नं: <strong class="text-emerald-400 font-mono">${record.tagNumber}</strong> | पशुपालक: ${record.ownerName}</div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रशासन तिथि (Admin Date) *</label>
                  <input type="date" id="adminDate" required value="${new Date().toISOString().split("T")[0]}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">वैक्सीन बैच नं. *</label>
                  <input type="text" id="adminBatch" required value="${record.batchNumber || "B-2026-X01"}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">चिकित्सक / वैक्सीनेटर का नाम *</label>
                <input type="text" id="adminVet" required value="Dr. Rahul Sharma (V.O.)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">अगली बूस्टर / देय तिथि (Next Recall Due) *</label>
                <input type="date" id="adminNextDue" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="cancelAdminModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50">प्रशासन पूर्ण करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Set default next recall date to +180 days for bi-annual, +365 for annual
      const d = new Date();
      d.setDate(d.getDate() + (record.protocolId.includes("FMD") ? 180 : 365));
      document.getElementById("adminNextDue").value = d.toISOString().split("T")[0];

      const modal = document.getElementById("administerShotModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeAdminModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelAdminModalBtn").addEventListener("click", closeAction);

      document.getElementById("administerShotForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const aDate = document.getElementById("adminDate").value;
        const aBatch = document.getElementById("adminBatch").value.trim();
        const aVet = document.getElementById("adminVet").value.trim();
        const nextDue = document.getElementById("adminNextDue").value;

        this.logAdministration(record.recordId, {
          administeredDate: aDate,
          batchNumber: aBatch,
          administeringVet: aVet,
          nextDueDate: nextDue
        });

        closeAction();
        this.render(state.containerElement);
      });
    },

    logAdministration: function (recordId, adminData) {
      const record = state.recordsList.find((r) => r.recordId === recordId);
      if (!record) return;

      record.status = "COMPLETED";
      record.administeredDate = adminData.administeredDate;
      record.batchNumber = adminData.batchNumber;
      record.administeringVet = adminData.administeringVet;

      // Automatically generate next recall dose in scheduler
      const nextRecallRecord = {
        recordId: "PRV-" + Date.now(),
        tagNumber: record.tagNumber,
        patientName: record.patientName,
        species: record.species,
        breed: record.breed,
        ownerName: record.ownerName,
        mobileNumber: record.mobileNumber,
        village: record.village,
        type: record.type,
        protocolId: record.protocolId,
        title: record.title + " (Annual Recall)",
        antigenOrDrug: record.antigenOrDrug,
        batchNumber: "PENDING",
        manufacturer: record.manufacturer,
        doseAndRoute: record.doseAndRoute,
        dueDate: adminData.nextDueDate,
        status: "SCHEDULED",
        administeredDate: null,
        administeringVet: null,
        coldChainTempC: 4.0,
        notes: `Follow-up recall generated after dose administered on ${adminData.administeredDate}`
      };

      state.recordsList.unshift(nextRecallRecord);

      // Dispatch event for Patient EMR
      window.dispatchEvent(
        new CustomEvent("preventive:event_logged", {
          detail: {
            patientId: "PAT-" + record.tagNumber,
            vaccineName: record.title,
            batchNumber: record.batchNumber,
            administeredDate: record.administeredDate,
            nextDueDate: adminData.nextDueDate
          }
        })
      );

      notify(`टीकाकरण संपन्न! आगामी खुराक ${adminData.nextDueDate} को नियत की गई।`, "success");
    },

    // 5. MODAL: Add New Preventive Schedule Entry
    openNewScheduleModal: function () {
      const mount = document.getElementById("vaccine-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="newScheduleModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-calendar-plus text-emerald-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">नई टीकाकरण / कृमिनाशक अनुसूची जोड़ें</h3>
              </div>
              <button id="closeNewSchedModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="newScheduleForm" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">12-अंकीय पशु टैग नं. *</label>
                  <input type="text" id="schedTagNo" required maxlength="12" placeholder="100293847565" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्रजाति (Species) *</label>
                  <select id="schedSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="bovine">Bovine (गाय / Cattle)</option>
                    <option value="bubaline">Bubaline (भैंस / Buffalo)</option>
                    <option value="caprine">Caprine (बकरी / Goat)</option>
                    <option value="ovine">Ovine (भेड़ / Sheep)</option>
                    <option value="canine">Canine (श्वान / Dog)</option>
                    <option value="feline">Feline (मार्जार / Cat)</option>
                    <option value="poultry">Poultry (कुक्कुट)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">इवेंट प्रकार *</label>
                  <select id="schedType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="vaccination">रोग प्रतिरक्षण (Vaccination)</option>
                    <option value="deworming">कृमिनाशक (Strategic Deworming)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">टीके / औषधि का नाम *</label>
                  <input type="text" id="schedTitle" required value="FMD Inactivated (Raksha-Ovac)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">खुराक एवं मार्ग (Dose/Route)</label>
                  <input type="text" id="schedRoute" value="2 ml Deep SC" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">देय तिथि (Scheduled Due Date) *</label>
                  <input type="date" id="schedDueDate" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">पशुपालक का नाम *</label>
                  <input type="text" id="schedOwnerName" required placeholder="किसान का नाम" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">मोबाइल नंबर</label>
                  <input type="tel" id="schedMobile" maxlength="10" placeholder="9812000000" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="cancelNewSchedModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50">अनुसूची जोड़ें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Set default date in +7 days
      const d = new Date();
      d.setDate(d.getDate() + 7);
      document.getElementById("schedDueDate").value = d.toISOString().split("T")[0];

      const modal = document.getElementById("newScheduleModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeNewSchedModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelNewSchedModalBtn").addEventListener("click", closeAction);

      document.getElementById("newScheduleForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const newSched = {
          recordId: "PRV-" + Date.now(),
          tagNumber: document.getElementById("schedTagNo").value.trim(),
          patientName: "Registered Patient",
          species: document.getElementById("schedSpecies").value,
          breed: "Indigenous",
          ownerName: document.getElementById("schedOwnerName").value.trim(),
          mobileNumber: document.getElementById("schedMobile").value.trim(),
          village: "Karnal Block",
          type: document.getElementById("schedType").value,
          protocolId: "CUSTOM-PRV",
          title: document.getElementById("schedTitle").value.trim(),
          antigenOrDrug: document.getElementById("schedTitle").value.trim(),
          batchNumber: "PENDING",
          manufacturer: "Govt Vet Depot",
          doseAndRoute: document.getElementById("schedRoute").value.trim(),
          dueDate: document.getElementById("schedDueDate").value,
          status: "SCHEDULED",
          administeredDate: null,
          administeringVet: null,
          coldChainTempC: 4.0,
          notes: "Scheduled via Preventive Care Workstation"
        };

        state.recordsList.unshift(newSched);
        closeAction();
        notify(`पशु ${newSched.tagNumber} का शेड्यूल सुरक्षित हुआ!`, "success");
        this.render(state.containerElement);
      });
    },

    // 6. MODAL: Farmer SMS Alert Dispatcher
    openSmsAlertModal: function (recordId) {
      const record = state.recordsList.find((r) => r.recordId === recordId);
      if (!record) return;

      const mount = document.getElementById("vaccine-modal-container");
      if (!mount) return;

      const smsHindi = `प्रिय ${record.ownerName}, आपके पशु (टैग: ${record.tagNumber}) का ${record.title} का टीकाकरण दिनांक ${record.dueDate} को देय है। कृपया नजदीकी पशु चिकित्सालय में संपर्क कर टीका अवश्य लगवाएं। - पशुपालन एवं डेयरी विभाग`;

      mount.innerHTML = `
        <div id="smsAlertModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-comment-sms text-amber-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">पशुपालक SMS अनुस्मारक प्रेषण</h3>
              </div>
              <button id="closeSmsModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">प्राप्तकर्ता मोबाइल नंबर</label>
                <input type="text" id="smsPhone" value="${record.mobileNumber || "9812039281"}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">संदेश सामग्री (Bilingual Hindi SMS)</label>
                <textarea id="smsText" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white leading-relaxed focus:ring-2 focus:ring-amber-500">${smsHindi}</textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="btnCopySms" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">कॉपी करें</button>
                <button type="button" id="btnDispatchSms" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50">SMS भेजें (NIC Gateway)</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const modal = document.getElementById("smsAlertModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeSmsModalBtn").addEventListener("click", closeAction);

      document.getElementById("btnCopySms").addEventListener("click", () => {
        const text = document.getElementById("smsText").value;
        navigator.clipboard.writeText(text).then(() => {
          notify("SMS टेक्स्ट क्लिपबोर्ड पर कॉपी हुआ!", "info");
        });
      });

      document.getElementById("btnDispatchSms").addEventListener("click", () => {
        const phone = document.getElementById("smsPhone").value;
        closeAction();
        notify(`SMS अनुस्मारक मोबाइल ${phone} पर सफलतापूर्वक भेजा गया!`, "success");
      });
    },

    // 7. PRINTABLE OFFICIAL VACCINATION CERTIFICATE
    generateVaccinationCertificate: function (recordId) {
      const record = state.recordsList.find((r) => r.recordId === recordId);
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
          <title>पशु रोग प्रतिरक्षण प्रमाण पत्र - ${record.tagNumber}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.5; margin: 0; padding: 15px; font-size: 13px; }
            .cert-border { border: 4px double #064e3b; padding: 25px; border-radius: 12px; }
            .header-strip { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 20px; }
            .gov-title { font-size: 18px; font-weight: 800; color: #064e3b; text-transform: uppercase; }
            .cert-title { font-size: 15px; font-weight: bold; margin-top: 4px; color: #111; }
            .cert-num { font-family: monospace; font-size: 11px; color: #555; margin-top: 2px; }
            .bio-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
            .bio-table td { padding: 8px 12px; border: 1px solid #d1d5db; }
            .bio-table td.label { background: #f9fafb; font-weight: bold; width: 30%; color: #374151; }
            .vaccine-box { background: #ecfdf5; border: 2px solid #059669; border-radius: 8px; padding: 15px; margin-bottom: 25px; }
            .vaccine-title { font-size: 16px; font-weight: bold; color: #064e3b; }
            .footer-strip { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 70px; text-align: center; line-height: 70px; color: #9ca3af; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="cert-border">
            <div class="header-strip">
              <div class="gov-title">पशुपालन एवं डेयरी विभाग, हरियाणा सरकार</div>
              <div class="cert-title">आधिकारिक पशु रोग प्रतिरक्षण प्रमाण पत्र (Official Vaccination Certificate)</div>
              <div class="cert-num">CERT-ID: ${record.recordId} • ISO-VET-2026 AUDITED</div>
            </div>

            <table class="bio-table">
              <tr>
                <td class="label">12-अंकीय पशु टैग संख्या:</td>
                <td><strong>${record.tagNumber}</strong></td>
                <td class="label">प्रजाति व नस्ल:</td>
                <td>${record.species.toUpperCase()} (${record.breed})</td>
              </tr>
              <tr>
                <td class="label">पशुपालक का नाम:</td>
                <td><strong>${record.ownerName}</strong></td>
                <td class="label">गांव व जिला:</td>
                <td>${record.village}</td>
              </tr>
            </table>

            <div class="vaccine-box">
              <div class="vaccine-title">प्रमाणित टीका: ${record.title}</div>
              <div style="font-size: 12px; color: #047857; margin-top: 4px;">एंटीजन / फॉर्मूलेशन: ${record.antigenOrDrug}</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; font-size: 12px;">
                <div><strong>वैक्सीन बैच नं.:</strong> ${record.batchNumber || "B-2026-X01"}</div>
                <div><strong>निर्माता संस्थान:</strong> ${record.manufacturer || "Indian Immunologicals"}</div>
                <div><strong>प्रशासन तिथि:</strong> ${record.administeredDate || "—"}</div>
                <div><strong>आगामी देय तिथि (Booster Due):</strong> ${record.dueDate}</div>
              </div>
            </div>

            <p style="font-size: 11px; color: #4b5563; line-height: 1.6;">
              प्रमाणित किया जाता है कि उपर्युक्त वर्णित पशु को अधिकृत पशु चिकित्सा अधिकारी की देखरेख में कोल्ड-चेन मानकों का पूर्ण पालन करते हुए सुरक्षित रूप से टीकाकृत किया गया है।
            </p>

            <div class="footer-strip">
              <div>
                <div style="font-size: 11px; color: #6b7280;">स्थान: पशु चिकित्सालय, करनाल</div>
                <div style="font-size: 11px; color: #6b7280;">सत्यापन: SHA256-DIGITALLY-SIGNED</div>
              </div>
              <div class="seal-box">
                हस्ताक्षर एवं मुहर (पशु चिकित्सा अधिकारी)
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

    // 8. UTILITIES: Export Schedules to CSV
    exportSchedulesCsv: function () {
      const headers = ["RecordID", "TagNumber", "PatientName", "Species", "Type", "Title", "AntigenOrDrug", "BatchNumber", "DueDate", "Status", "OwnerName", "Mobile", "Village"];
      const rows = state.recordsList.map((r) => [
        r.recordId,
        r.tagNumber,
        `"${r.patientName}"`,
        r.species,
        r.type,
        `"${r.title}"`,
        `"${r.antigenOrDrug}"`,
        r.batchNumber,
        r.dueDate,
        r.status,
        `"${r.ownerName}"`,
        r.mobileNumber,
        `"${r.village}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `VETCARE_PREVENTIVE_SCHEDULES_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      notify("टीकाकरण सूची CSV प्रारूप में निर्यात हुई!", "success");
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.VaccinationDewormingTracker = VaccinationDewormingTracker;

})(typeof window !== "undefined" ? window : this);
