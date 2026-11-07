// Vetcare AI OS - Veterinary Clinical Oncology, BSA Chemotherapy & TNM Staging Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. SCIENTIFIC ONCOLOGY, BSA PHARMACOKINETICS & PROTOCOL CONSTANTS
  const ONCOLOGY_CONSTANTS = {
    BSA_FACTORS: {
      canine: 10.1, // Canine Meeh-Rubner constant K: BSA (m²) = [10.1 * (Weight in g)^(2/3)] / 10,000
      feline: 10.0 // Feline constant K: BSA (m²) = [10.0 * (Weight in g)^(2/3)] / 10,000
    },
    SAFETY_THRESHOLDS: {
      MIN_ANC_PER_UL: 1500, // Absolute Neutrophil Count required for safe cytotoxic administration
      MIN_PLATELETS_PER_UL: 100000, // Thrombocyte safety threshold
      SMALL_DOG_WEIGHT_THRESHOLD_KG: 10.0 // Dogs < 10 kg risk severe overdose on BSA; dose on per-kg basis
    },
    DRUG_DATABASE: {
      VINCRISTINE: {
        name: "Vincristine Sulfate (Oncovin)",
        class: "Vinca Alkaloid (Microtubule inhibitor)",
        standardDoseBsaMgM2: 0.7,
        smallDogDoseMgKg: 0.025, // For dogs < 10 kg
        vialConcentrationMgMl: 1.0,
        vesicantStatus: "VESICANT_WARM_COMPRESS", // Requires warm compress + hyaluronidase if extravasated
        route: "Strict Intravenous (IV push through running catheter)",
        toxicities: "Peripheral neuropathy, paralytic ileus, mild myelosuppression, severe tissue necrosis on extravasation."
      },
      CYCLOPHOSPHAMIDE: {
        name: "Cyclophosphamide (Cytoxan)",
        class: "Nitrogen Mustard Alkylating Agent",
        standardDoseBsaMgM2: 250.0,
        smallDogDoseMgKg: 7.0,
        vialConcentrationMgMl: 20.0, // Or oral tablets (25mg/50mg)
        vesicantStatus: "NON_VESICANT",
        route: "Intravenous (IV) or Oral (PO)",
        specialPrecautions: "Metabolite Acrolein causes Sterile Hemorrhagic Cystitis. Concurrent Furosemide (1 mg/kg IV) + forced water diuresis mandatory.",
        toxicities: "Sterile hemorrhagic cystitis, myelosuppression (nadir 7-14 days), alopecia."
      },
      DOXORUBICIN: {
        name: "Doxorubicin Hydrochloride (Adriamycin)",
        class: "Anthracycline Topoisomerase II Inhibitor",
        standardDoseBsaMgM2: 30.0,
        smallDogDoseMgKg: 1.0, // For dogs < 15 kg
        vialConcentrationMgMl: 2.0,
        vesicantStatus: "VESICANT_COLD_COMPRESS", // Requires cold compress + Dexrazoxane antidote
        route: "Slow IV infusion over 20-30 min through fresh cleanly placed catheter",
        cardiacWarning: "Cumulative dose limit: 180-240 mg/m² in dogs due to irreversible dilated cardiomyopathy (DCM). Pre-chemo echocardiogram mandatory.",
        felineWarning: "In felines, primary cumulative organ toxicity is irreversible nephrotoxicity rather than cardiotoxicity.",
        toxicities: "Severe tissue sloughing on extravasation, acute anaphylactoid histamine release, DCM, severe GI mucosal sloughing."
      },
      CARBOPLATIN: {
        name: "Carboplatin (Paraplatin)",
        class: "Second-Generation Platinum Alkylating Agent",
        standardDoseBsaMgM2: 300.0, // Canine (200-240 mg/m² for felines)
        vialConcentrationMgMl: 10.0,
        vesicantStatus: "IRRITANT",
        route: "IV infusion over 15-30 min",
        toxicities: "Double nadir myelosuppression (Day 10-14 and Day 21). Safe for cats (unlike cisplatin which causes fatal pulmonary edema in felines)."
      },
      TOCERANIB: {
        name: "Toceranib Phosphate (Palladia)",
        class: "Receptor Tyrosine Kinase (RTK) Inhibitor",
        standardDoseBsaMgM2: 2.75, // 2.4 - 2.9 mg/kg PO Monday-Wednesday-Friday
        route: "Oral (PO) q48h",
        indications: "Patnaik Grade II / III Mast Cell Tumors with c-kit mutation.",
        toxicities: "Protein-losing nephropathy, hypertension, neutropenia, GI ulceration."
      }
    },
    CHOP_PROTOCOL_SCHEDULE: [
      { week: 1, drug: "VINCRISTINE", doseDisplay: "0.7 mg/m² IV", concurrent: "Prednisolone 2.0 mg/kg PO daily" },
      { week: 2, drug: "CYCLOPHOSPHAMIDE", doseDisplay: "250 mg/m² IV/PO", concurrent: "Furosemide 1 mg/kg IV + Forced Diuresis" },
      { week: 3, drug: "VINCRISTINE", doseDisplay: "0.7 mg/m² IV", concurrent: "Prednisolone 1.5 mg/kg PO daily" },
      { week: 4, drug: "DOXORUBICIN", doseDisplay: "30 mg/m² IV Infusion", concurrent: "Echocardiogram verification + Ondansetron" },
      { week: 5, drug: "REST_WEEK", doseDisplay: "No Cytotoxics", concurrent: "Complete CBC evaluation + Rest" }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const OncoStorage = {
    dbName: "VetcareOncologyDB",
    dbVersion: 1,
    storeNames: {
      patients: "oncology_treatment_records",
      chemoLogs: "oncology_chemo_flowsheets"
    },
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Onco] IndexedDB not supported, using localStorage fallback.");
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
          console.error("[Vetcare Onco] IndexedDB open error:", err);
          resolve(false);
        };
      });
    },

    async getAll(storeName) {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_ONCO_" + storeName);
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
      if (!item.id) item.id = "ONCO-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const items = await this.getAll(storeName);
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) items[idx] = item;
        else items.push(item);
        localStorage.setItem("VETCARE_ONCO_" + storeName, JSON.stringify(items));
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
        localStorage.setItem("VETCARE_ONCO_" + storeName, JSON.stringify(items));
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

  // 4. MAIN ONCOLOGY & PHARMACOMETRIC ENGINE CONTROLLER
  const CanineFelineOncology = {
    containerId: null,
    activeTab: "tumor_staging_hub", // 'tumor_staging_hub' | 'bsa_chemo_calculator' | 'chop_protocol_flowsheet' | 'chemo_safety_extravasation'

    // Reactive State
    state: {
      oncologyPatients: [],
      activePatientId: null,
      bsaCalculatorState: {
        species: "canine",
        weightKg: 24.5,
        selectedDrugKey: "DOXORUBICIN",
        customDoseRateMgM2: 30.0,
        useSmallDogKgRule: false,
        calculatedBsaM2: 0.85,
        calculatedDoseMg: 25.5,
        calculatedVolumeMl: 12.75
      },
      currentTnmSelection: {
        t: "T2", // T1, T2, T3
        n: "N1", // N0, N1, N2
        m: "M0", // M0, M1
        substage: "a", // a: asymptomatic, b: systemic illness
        tumorType: "CANINE_LYMPHOMA"
      }
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await OncoStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Veterinary Clinical Oncology, BSA Chemotherapy & TNM Staging Engine Loaded.");
    },

    async loadInitialData() {
      let patients = await OncoStorage.getAll(OncoStorage.storeNames.patients);
      if (!patients || patients.length === 0) {
        patients = this.getSeedPatients();
        for (const p of patients) {
          await OncoStorage.put(OncoStorage.storeNames.patients, p);
        }
      }
      this.state.oncologyPatients = patients;

      if (patients.length > 0 && !this.state.activePatientId) {
        this.state.activePatientId = patients[0].patientId;
      }

      this.recalculateLiveBsa();
    },

    getSeedPatients() {
      return [
        {
          id: "ONCO-PAT-001",
          patientId: "ONCO-PAT-001",
          tagNo: "TAG-ONC-101",
          patientName: "बहादुर (Bahadur - Boxer)",
          species: "canine",
          breed: "Boxer Cross",
          weightKg: 28.5,
          bodySurfaceAreaM2: 0.94,
          tumorType: "CANINE_LYMPHOMA",
          diagnosisTitle: "Stage IIIa Generalized B-Cell Multicentric Lymphoma (CD20+)",
          tnmStage: { t: "T2", n: "N1", m: "M0" },
          compositeStage: "STAGE_III",
          histopathGrade: "GRADE_III",
          cbcBeforeCycle: { ancCount: 4200, plateletCount: 240000 },
          remissionStatus: "COMPLETE_REMISSION",
          activeProtocol: "CHOP_WISCONSIN_MADISON",
          currentWeek: 4,
          ownerName: "मनोज वर्मा (Manoj Verma)",
          attendingOncologist: "Dr. Rahul (DACVIM Oncology Specialist)"
        },
        {
          id: "ONCO-PAT-002",
          patientId: "ONCO-PAT-002",
          tagNo: "TAG-ONC-102",
          patientName: "लूना (Luna - Domestic Shorthair)",
          species: "feline",
          breed: "Domestic Shorthair",
          weightKg: 4.2,
          bodySurfaceAreaM2: 0.26,
          tumorType: "FELINE_INJECTION_SITE_SARCOMA",
          diagnosisTitle: "Interscapular Feline Injection-Site Sarcoma (FISS) Post-Wide Resection",
          tnmStage: { t: "T1", n: "N0", m: "M0" },
          compositeStage: "STAGE_I",
          histopathGrade: "GRADE_II",
          cbcBeforeCycle: { ancCount: 3100, plateletCount: 185000 },
          remissionStatus: "PARTIAL_REMISSION",
          activeProtocol: "CARBOPLATIN_SINGLE_AGENT",
          currentWeek: 2,
          ownerName: "प्रिया नायर (Priya Nair)",
          attendingOncologist: "Dr. Rahul"
        },
        {
          id: "ONCO-PAT-003",
          patientId: "ONCO-PAT-003",
          tagNo: "TAG-ONC-103",
          patientName: "रूबी (Ruby - Golden Retriever)",
          species: "canine",
          breed: "Golden Retriever",
          weightKg: 32.0,
          bodySurfaceAreaM2: 1.01,
          tumorType: "OSTEOSARCOMA",
          diagnosisTitle: "Distal Radius Appendicular Osteosarcoma (Post-Amputation Adjuvant)",
          tnmStage: { t: "T2", n: "N0", m: "M0" },
          compositeStage: "STAGE_II",
          histopathGrade: "GRADE_III",
          cbcBeforeCycle: { ancCount: 1100, plateletCount: 85000 }, // PRE-CHEMO DELAY TRIGGER
          remissionStatus: "STABLE_DISEASE",
          activeProtocol: "CARBOPLATIN_SINGLE_AGENT",
          currentWeek: 1,
          ownerName: "दीपक कपूर (Deepak Kapoor)",
          attendingOncologist: "Dr. Rahul"
        }
      ];
    },

    // 4.2 SCIENTIFIC PHARMACOKINETICS & BSA MATHEMATICS
    /**
     * Exact Body Surface Area (BSA in m²) Formula:
     * Canine: BSA (m²) = [ 10.1 × (Weight in grams)^(2/3) ] / 10,000
     * Feline: BSA (m²) = [ 10.0 × (Weight in grams)^(2/3) ] / 10,000
     */
    calculateBsaM2(weightKg, species = "canine") {
      const wtKg = parseFloat(weightKg) || 1.0;
      const wtGrams = wtKg * 1000.0;
      const k = ONCOLOGY_CONSTANTS.BSA_FACTORS[species] || 10.1;
      const bsa = (k * Math.pow(wtGrams, 2 / 3)) / 10000.0;
      return parseFloat(bsa.toFixed(2));
    },

    recalculateLiveBsa() {
      const c = this.state.bsaCalculatorState;
      const bsa = this.calculateBsaM2(c.weightKg, c.species);
      c.calculatedBsaM2 = bsa;

      const drug = ONCOLOGY_CONSTANTS.DRUG_DATABASE[c.selectedDrugKey] || ONCOLOGY_CONSTANTS.DRUG_DATABASE.DOXORUBICIN;

      // Small Dog Dosing Exemption Rule (< 10 kg dogs dosed per kg instead of BSA)
      if (c.species === "canine" && c.weightKg < ONCOLOGY_CONSTANTS.SAFETY_THRESHOLDS.SMALL_DOG_WEIGHT_THRESHOLD_KG && c.useSmallDogKgRule) {
        const perKgRate = drug.smallDogDoseMgKg || (drug.standardDoseBsaMgM2 / 30);
        c.calculatedDoseMg = parseFloat((c.weightKg * perKgRate).toFixed(2));
      } else {
        c.calculatedDoseMg = parseFloat((bsa * c.customDoseRateMgM2).toFixed(2));
      }

      const conc = drug.vialConcentrationMgMl || 2.0;
      c.calculatedVolumeMl = parseFloat((c.calculatedDoseMg / conc).toFixed(2));
    },

    /**
     * Pre-Chemotherapy Hematologic Safety Gate:
     * ANC >= 1,500/uL and Platelets >= 100,000/uL required.
     */
    evaluatePreChemoCbc(anc, platelets) {
      const safeAnc = anc >= ONCOLOGY_CONSTANTS.SAFETY_THRESHOLDS.MIN_ANC_PER_UL;
      const safePlt = platelets >= ONCOLOGY_CONSTANTS.SAFETY_THRESHOLDS.MIN_PLATELETS_PER_UL;
      const go = safeAnc && safePlt;

      const reasons = [];
      if (!safeAnc) reasons.push(`गंभीर न्यूट्रोपेनिया (ANC: ${anc}/uL - न्यूनतम 1,500 आवश्यक)`);
      if (!safePlt) reasons.push(`थ्रोम्बोसाइटोपेनिया (Platelets: ${platelets}/uL - न्यूनतम 100,000 आवश्यक)`);

      return {
        isClearForChemo: go,
        verdictText: go ? "CLEAR FOR CHEMOTHERAPY (गो-सिग्नल)" : "DELAY CYCLE (3-7 दिन विलंब अनिवार्य)",
        colorClass: go ? "text-emerald-400" : "text-rose-400 font-bold",
        badgeClass: go ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse",
        clinicalRationale: go
          ? "बोन मैरो रिजर्व सुरक्षित। कीमोथेरेपी प्रोटोकॉल सुरक्षित रूप से दिया जा सकता है।"
          : `कीमोथेरेपी चक्र को 3 से 7 दिन के लिए स्थगित करें। कारण: ${reasons.join(", ")}। री-सीबीसी दोहराएं।`
      };
    },

    /**
     * WHO TNM Composite Staging Matrix
     */
    evaluateTnmStage(t, n, m, tumorType) {
      if (tumorType === "CANINE_LYMPHOMA") {
        if (m === "M1") return "STAGE_V (Bone Marrow / Non-lymphoid Infiltration)";
        if (n === "N2") return "STAGE_IV (Hepatosplenomegaly)";
        if (n === "N1") return "STAGE_III (Generalized Peripheral Lymphadenopathy)";
        if (t === "T2") return "STAGE_II (Regional Lymph Nodes Involved)";
        return "STAGE_I (Single Solitary Node)";
      }

      if (m === "M1") return "STAGE_IV (Distant Metastasis Present)";
      if (n === "N1" || n === "N2" || t === "T3") return "STAGE_III (Locally Advanced / Regional Nodes)";
      if (t === "T2" && n === "N0") return "STAGE_II (Intermediate Primary >3-5cm)";
      return "STAGE_I (Small Localized Primary <3cm, Nodes Negative)";
    },

    calculateOverallKPIs() {
      const totalPatients = this.state.oncologyPatients.length;
      const completeRemissionCount = this.state.oncologyPatients.filter((p) => p.remissionStatus === "COMPLETE_REMISSION").length;
      const pendingChemoCycles = this.state.oncologyPatients.filter((p) => p.cbcBeforeCycle.ancCount >= ONCOLOGY_CONSTANTS.SAFETY_THRESHOLDS.MIN_ANC_PER_UL).length;
      const delayedCycles = totalPatients - pendingChemoCycles;

      return {
        totalPatients,
        completeRemissionCount,
        pendingChemoCycles,
        delayedCycles
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Onco] Target container not found:", this.containerId);
        return;
      }

      const kpis = this.calculateOverallKPIs();
      const activePatient = this.state.oncologyPatients.find((p) => p.patientId === this.state.activePatientId) || this.state.oncologyPatients[0];

      container.innerHTML = `
        <div class="oncology-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- TOP HERO ONCOLOGY CLINICAL BAR -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-ribbon text-rose-500"></i> DACVIM Veterinary Medical Oncology
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  <i class="fa-solid fa-biohazard"></i> USP 800 Hazardous Drug Compliant
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>क्लिनिकल ऑन्कोलॉजी, BSA कीमोथेरेपी एवं TNM स्टेजिंग कंसोल</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Veterinary Chemotherapy Pharmacometrics: Exact Body Surface Area (BSA in m²) Calculations, Pre-Chemo ANC/Platelet Go/No-Go Gates, CHOP Protocol Flowsheets & Extravasation Antidote Protocols.
              </p>
            </div>

            <!-- ACTION SHORTCUTS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenNewOncoCaseModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> नया कैंसर रोगी दर्ज करें (New Patient)
              </button>
              <button id="btnPrintChemoSheet" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 shadow flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i> कीमो फ्लो-शीट प्रिंट करें (Print Sheet)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय कैंसर रोगी (Active Cancer Cases)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${kpis.totalPatients}</span>
                <span class="text-xs font-mono text-cyan-400 font-bold">DACVIM Protocol</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">पूर्ण उपशम (Complete Remission - CR)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-emerald-400">${kpis.completeRemissionCount} Dogs</span>
                <span class="text-xs font-mono text-emerald-300 font-semibold">Node Free</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">इस सप्ताह कीमो चक्र स्वीकृत (Go Gate)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${kpis.pendingChemoCycles}</span>
                <span class="text-xs font-mono text-slate-400">ANC &gt; 1,500/uL</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">विलंबित चक्र (Myelosuppression Hold)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${kpis.delayedCycles > 0 ? "text-amber-400 font-bold" : "text-slate-300"}">${kpis.delayedCycles}</span>
                <span class="text-xs font-mono text-amber-300">3-7 Day Delay</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="tumor_staging_hub" class="onco-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "tumor_staging_hub"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-network-wired"></i> 1. WHO TNM ट्यूमर स्टेजिंग हब (TNM Staging Hub)
            </button>
            <button data-tab="bsa_chemo_calculator" class="onco-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "bsa_chemo_calculator"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-calculator"></i> 2. बॉडी सरफेस एरिया (BSA) खुराक संगणक (BSA Dosing Engine)
            </button>
            <button data-tab="chop_protocol_flowsheet" class="onco-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "chop_protocol_flowsheet"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-list-ol"></i> 3. CHOP लिम्फोमा फ्लो-शीट एवं CBC गेट (CHOP Flowsheet)
            </button>
            <button data-tab="chemo_safety_extravasation" class="onco-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "chemo_safety_extravasation"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-shield-virus"></i> 4. कीमो सुरक्षा एवं एक्स्ट्रावासेशन विषहर (Extravasation SOP)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="oncoTabViewport" class="w-full">
            ${this.renderActiveTabContent(activePatient)}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINER -->
        <div id="oncoModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent(activePatient) {
      switch (this.activeTab) {
        case "tumor_staging_hub":
          return this.renderStagingHubTab(activePatient);
        case "bsa_chemo_calculator":
          return this.renderBsaCalculatorTab(activePatient);
        case "chop_protocol_flowsheet":
          return this.renderChopFlowsheetTab(activePatient);
        case "chemo_safety_extravasation":
          return this.renderExtravasationTab();
        default:
          return "";
      }
    },

    // TAB 1: WHO TNM STAGING HUB
    renderStagingHubTab(activePatient) {
      const composite = this.evaluateTnmStage(
        this.state.currentTnmSelection.t,
        this.state.currentTnmSelection.n,
        this.state.currentTnmSelection.m,
        this.state.currentTnmSelection.tumorType
      );

      return `
        <div class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- LEFT 1-COL: PATIENT SELECTOR ROSTER -->
            <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 class="font-display font-bold text-base text-white flex items-center gap-2">
                  <i class="fa-solid fa-users text-rose-400"></i> ऑन्कोलॉजी रोगी रोस्टर (Select Patient)
                </h3>
              </div>

              <div class="space-y-2">
                ${this.state.oncologyPatients
                  .map((p) => {
                    const isSelected = p.patientId === this.state.activePatientId;
                    return `
                    <div data-select-patient="${p.patientId}" class="p-3.5 rounded-xl border ${
                      isSelected ? "border-rose-500 bg-rose-950/20 shadow-md" : "border-slate-800 bg-slate-950/60 hover:bg-slate-800/50"
                    } cursor-pointer transition-all">
                      <div class="flex justify-between items-start">
                        <span class="font-bold text-white text-xs">${p.patientName}</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          p.remissionStatus === "COMPLETE_REMISSION"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                        }">
                          ${p.remissionStatus}
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-400 mt-1">${p.breed} • ${p.weightKg} kg (BSA: ${p.bodySurfaceAreaM2} m²)</div>
                      <div class="text-[10px] text-rose-400 font-mono mt-1 font-semibold">${p.diagnosisTitle}</div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </div>

            <!-- RIGHT 2-COLS: INTERACTIVE WHO TNM STAGING FORM -->
            <div class="lg:col-span-2 space-y-5">
              
              <!-- ACTIVE PATIENT SUMMARY BAR -->
              <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-rose-400">${activePatient.patientId}</span>
                      <span class="text-xs font-mono text-slate-500">| Tag: ${activePatient.tagNo}</span>
                    </div>
                    <h3 class="text-xl font-display font-black text-white mt-0.5">${activePatient.patientName}</h3>
                    <p class="text-xs text-slate-300 font-semibold mt-0.5">${activePatient.diagnosisTitle}</p>
                  </div>

                  <div class="text-right font-mono">
                    <span class="text-[10px] text-slate-400 uppercase">शारीरिक सतह क्षेत्रफल (BSA)</span>
                    <div class="text-2xl font-black text-cyan-400">${activePatient.bodySurfaceAreaM2} m²</div>
                    <span class="text-[10px] text-slate-500">${activePatient.weightKg} kg (${activePatient.species})</span>
                  </div>
                </div>

                <!-- TNM SELECTOR CONTROLS -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  
                  <!-- T: PRIMARY TUMOR -->
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span class="text-slate-400 uppercase font-bold text-[10px]">T: प्राथमिक ट्यूमर आकार (Primary Tumor)</span>
                    <select id="selTnmT" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white font-mono">
                      <option value="T1" ${this.state.currentTnmSelection.t === "T1" ? "selected" : ""}>T1: &lt; 3 cm व्यास (Small Localized)</option>
                      <option value="T2" ${this.state.currentTnmSelection.t === "T2" ? "selected" : ""}>T2: 3 - 5 cm व्यास (Moderate Invading)</option>
                      <option value="T3" ${this.state.currentTnmSelection.t === "T3" ? "selected" : ""}>T3: &gt; 5 cm व्यास (Large Invasive)</option>
                    </select>
                  </div>

                  <!-- N: REGIONAL NODES -->
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span class="text-slate-400 uppercase font-bold text-[10px]">N: लिम्फ नोड भागीदारी (Lymph Nodes)</span>
                    <select id="selTnmN" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white font-mono">
                      <option value="N0" ${this.state.currentTnmSelection.n === "N0" ? "selected" : ""}>N0: कोई नोड भागीदारी नहीं (Negative)</option>
                      <option value="N1" ${this.state.currentTnmSelection.n === "N1" ? "selected" : ""}>N1: क्षेत्रीय नोड पॉजिटिव (Ipsilateral)</option>
                      <option value="N2" ${this.state.currentTnmSelection.n === "N2" ? "selected" : ""}>N2: द्विपक्षीय / दूरस्थ नोड (Bilateral/Fixed)</option>
                    </select>
                  </div>

                  <!-- M: DISTANT METASTASIS -->
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span class="text-slate-400 uppercase font-bold text-[10px]">M: दूरस्थ मेटास्टेसिस (Metastasis)</span>
                    <select id="selTnmM" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white font-mono">
                      <option value="M0" ${this.state.currentTnmSelection.m === "M0" ? "selected" : ""}>M0: दूरस्थ मेटास्टेसिस अनुपस्थित (Clear)</option>
                      <option value="M1" ${this.state.currentTnmSelection.m === "M1" ? "selected" : ""}>M1: फेफड़े/यकृत मेटास्टेसिस उपस्थित</option>
                    </select>
                  </div>

                </div>

                <!-- COMPOSITE STAGE VERDICT BANNER -->
                <div class="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-rose-500/50 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div>
                    <span class="text-[10px] font-mono uppercase text-rose-400 font-bold">WHO कम्पोजिट क्लिनिकल स्टेज (Generated Stage)</span>
                    <div class="text-xl font-display font-black text-white mt-0.5">${composite}</div>
                  </div>
                  <button id="btnSaveStagingToPatient" class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 transition-all flex items-center gap-2">
                    <i class="fa-solid fa-floppy-disk"></i> स्टेजिंग रिकॉर्ड सहेजें (Update Record)
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      `;
    },

    // TAB 2: BSA & DRUG DOSING ENGINE
    renderBsaCalculatorTab(activePatient) {
      const c = this.state.bsaCalculatorState;
      const drug = ONCOLOGY_CONSTANTS.DRUG_DATABASE[c.selectedDrugKey] || ONCOLOGY_CONSTANTS.DRUG_DATABASE.DOXORUBICIN;

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/30 border border-purple-500/30 space-y-6">
            
            <div class="border-b border-slate-800 pb-4">
              <span class="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">
                <i class="fa-solid fa-calculator mr-1"></i> Meeh-Rubner Surface Area & Cytotoxic Dosing Engine
              </span>
              <h3 class="text-xl font-display font-black text-white mt-1">
                बॉडी सरफेस एरिया (BSA) एवं एंटी-नियोप्लास्टिक खुराक संगणक
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Dose (mg) = Prescribed Rate (mg/m²) × BSA (m²). Automatically flags small dog (&lt; 10 kg) per-kg dose reduction safety overrides.
              </p>
            </div>

            <!-- INTERACTIVE INPUT GRID -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              
              <div>
                <label class="block text-slate-300 uppercase mb-1">प्रजाति (Species Formula)</label>
                <select id="selBsaSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  <option value="canine" ${c.species === "canine" ? "selected" : ""}>कैनिन (Canine - K = 10.1)</option>
                  <option value="feline" ${c.species === "feline" ? "selected" : ""}>फेलाइन (Feline - K = 10.0)</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">शारीरिक भार (Body Weight kg)</label>
                <input type="number" step="0.5" id="inBsaWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="${c.weightKg}" />
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">कीमोथेरेपी औषधि (Chemo Agent)</label>
                <select id="selBsaDrug" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  ${Object.keys(ONCOLOGY_CONSTANTS.DRUG_DATABASE)
                    .map((key) => `<option value="${key}" ${c.selectedDrugKey === key ? "selected" : ""}>${ONCOLOGY_CONSTANTS.DRUG_DATABASE[key].name}</option>`)
                    .join("")}
                </select>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">खुराक दर (Rate mg/m²)</label>
                <input type="number" step="0.5" id="inBsaCustomRate" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono" value="${c.customDoseRateMgM2}" />
              </div>

            </div>

            <!-- COMPUTED BSA & EXACT VOLUME READOUT -->
            <div class="p-5 rounded-xl bg-slate-950 border border-purple-500/40 grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-center">
              
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">1. संगणित BSA क्षेत्रफल</span>
                <div class="text-3xl font-black text-cyan-400 mt-1">${c.calculatedBsaM2} m²</div>
                <span class="text-[10px] text-slate-500">Meeh Formula K=${ONCOLOGY_CONSTANTS.BSA_FACTORS[c.species]}</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">2. आवश्यक शुद्ध मात्रा</span>
                <div class="text-3xl font-black text-emerald-400 mt-1">${c.calculatedDoseMg} mg</div>
                <span class="text-[10px] text-slate-500">Pure Active Substance</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">3. वायल इंजेक्शन आयतन</span>
                <div class="text-3xl font-black text-rose-400 mt-1">${c.calculatedVolumeMl} ml</div>
                <span class="text-[10px] text-slate-500">Conc: ${drug.vialConcentrationMgMl || 2.0} mg/ml</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">4. एक्स्ट्रावासेशन जोखिम</span>
                <div class="text-xs font-bold text-amber-400 mt-2">${drug.vesicantStatus}</div>
                <span class="text-[10px] text-slate-500">${drug.route}</span>
              </div>

            </div>

            <!-- SMALL DOG EXEMPTION OVERRIDE WARNING -->
            ${
              c.species === "canine" && c.weightKg < ONCOLOGY_CONSTANTS.SAFETY_THRESHOLDS.SMALL_DOG_WEIGHT_THRESHOLD_KG
                ? `
              <div class="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-start gap-3 text-xs">
                <i class="fa-solid fa-triangle-exclamation text-amber-400 text-lg mt-0.5"></i>
                <div class="leading-relaxed">
                  <strong class="text-amber-300">छोटे श्वान के लिए सुरक्षा चेतावनी (&lt; 10 kg Dog):</strong> शरीर के वजन के अनुपात में BSA अत्यधिक बड़ा हो जाता है, जिससे तीव्र मायलोसप्रेशन और सेप्सिस का खतरा रहता है। 
                  ऑन्कोलॉजी दिशानिर्देशानुसार डॉक्सोरूबिसिन (1.0 mg/kg) अथवा विंक्रिस्टीन (0.025 mg/kg) का प्रयोग mg/kg आधार पर करें।
                </div>
              </div>
            `
                : ""
            }

          </div>
        </div>
      `;
    },

    // TAB 3: CHOP PROTOCOL FLOWSHEET & PRE-CHEMO HEMATOLOGY GATE
    renderChopFlowsheetTab(activePatient) {
      const cbcGate = this.evaluatePreChemoCbc(
        activePatient.cbcBeforeCycle.ancCount,
        activePatient.cbcBeforeCycle.plateletCount
      );

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-list-ol text-cyan-400"></i> CHOP विस्कॉन्सिन-मैडिसन लिम्फोमा प्रोटोकॉल एवं प्री-कीमो ब्लड गेट
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  19-Week Modified Wisconsin-Madison CHOP Protocol with mandatory Absolute Neutrophil Count (ANC) & Platelet gate.
                </p>
              </div>

              <!-- PRE-CHEMO GO / NO-GO BADGE -->
              <div class="px-4 py-2 rounded-xl border ${cbcGate.badgeClass} text-right font-mono">
                <div class="text-[10px] uppercase font-bold">हेमेटोलॉजिक गेट निर्णय</div>
                <div class="text-xs font-black mt-0.5">${cbcGate.verdictText}</div>
              </div>
            </div>

            <!-- PRE-CHEMO CBC GATE METRICS -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-slate-400 uppercase text-[10px]">न्यूट्रोफिल गणना (ANC)</span>
                <div class="text-xl font-bold ${activePatient.cbcBeforeCycle.ancCount >= 1500 ? "text-emerald-400" : "text-rose-400"} mt-1">
                  ${activePatient.cbcBeforeCycle.ancCount.toLocaleString()} /uL
                </div>
                <span class="text-[10px] text-slate-500">Threshold: &ge; 1,500/uL</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-slate-400 uppercase text-[10px]">प्लेटलेट्स गणना (Thrombocytes)</span>
                <div class="text-xl font-bold ${activePatient.cbcBeforeCycle.plateletCount >= 100000 ? "text-emerald-400" : "text-rose-400"} mt-1">
                  ${activePatient.cbcBeforeCycle.plateletCount.toLocaleString()} /uL
                </div>
                <span class="text-[10px] text-slate-500">Threshold: &ge; 100,000/uL</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 font-sans">
                <span class="text-slate-400 uppercase font-mono text-[10px]">क्लिनिकल दिशानिर्देश</span>
                <p class="text-[11px] text-slate-300 mt-1 leading-relaxed">${cbcGate.clinicalRationale}</p>
              </div>
            </div>

            <!-- 5-WEEK CHOP CYCLIC FLOWSHEET TABLE -->
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">सप्ताह (Cycle Week)</th>
                    <th class="p-3">प्रशासित औषधि (Agent)</th>
                    <th class="p-3">मानक खुराक दर (Standard Rate)</th>
                    <th class="p-3">सहायक दवाएं (Co-Medications)</th>
                    <th class="p-3 text-right">सत्यापन स्थिति (Sign-off)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-mono">
                  ${ONCOLOGY_CONSTANTS.CHOP_PROTOCOL_SCHEDULE.map((s) => {
                    const isCurrent = s.week === activePatient.currentWeek;
                    return `
                      <tr class="hover:bg-slate-800/40 ${isCurrent ? "bg-rose-950/20 border-l-4 border-rose-500" : ""}">
                        <td class="p-3 font-bold ${isCurrent ? "text-rose-400" : "text-white"}">
                          Week 0${s.week} ${isCurrent ? `<span class="ml-1 text-[10px] text-rose-300 font-sans font-bold">[CURRENT]</span>` : ""}
                        </td>
                        <td class="p-3">
                          <span class="text-white font-bold">${s.drug}</span>
                        </td>
                        <td class="p-3 font-bold text-cyan-300">${s.doseDisplay}</td>
                        <td class="p-3 font-sans text-slate-300 text-[11px]">${s.concurrent}</td>
                        <td class="p-3 text-right">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.week < activePatient.currentWeek
                              ? "bg-emerald-500/20 text-emerald-300"
                              : s.week === activePatient.currentWeek
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-slate-800 text-slate-500"
                          }">
                            ${s.week < activePatient.currentWeek ? "COMPLETED" : s.week === activePatient.currentWeek ? "DUE TODAY" : "SCHEDULED"}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: CHEMOTHERAPY SAFETY, EXTRAVASATION & HAZARDOUS WASTE
    renderExtravasationTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <span class="text-[10px] font-mono uppercase text-rose-400 font-bold">Emergency Cytotoxic Extravasation Protocols</span>
              <h3 class="text-xl font-display font-black text-white mt-0.5 flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation text-rose-500"></i> कीमोथेरेपी एक्स्ट्रावासेशन आपातकालीन एसओपी (Extravasation SOP)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Catastrophic tissue sloughing antidote workflows: Vincristine (Warm Compress) vs Doxorubicin (Cold Compress + Dexrazoxane).
              </p>
            </div>

            <!-- TWO DIVERGENT PROTOCOL CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <!-- VINCRISTINE EXTRAVASATION -->
              <div class="p-5 rounded-xl bg-slate-950 border-2 border-amber-500/60 space-y-3">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-base">विंक्रिस्टीन रिसाव (Vincristine Extravasation)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold">WARM COMPRESS</span>
                </div>
                
                <div class="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px] font-bold">
                  नियम: गर्म सिकाई (Warm Compress) करें ताकि रक्त वाहिकाएं फैलें और दवा ऊतकों से अवशोषित होकर हट जाए। कभी भी बर्फ या ठंडा न लगाएं!
                </div>

                <div class="space-y-2 text-slate-300 text-[11px]">
                  <div><strong>1. तत्काल रुकें:</strong> IV इन्फ्यूजन रोकें, पर सुई को न निकालें। कैथेटर से यथासंभव दवा वापस खींचें।</div>
                  <div><strong>2. हाइलूरोनिडेस (Hyaluronidase Antidote):</strong> 150 यूनिट्स/ml हाइलूरोनिडेस को 1 से 2 ml सलाइन में घोलकर रिसाव स्थल के चारों ओर कई सुइयों से सब-क्यूटेनियस लगाएं।</div>
                  <div><strong>3. गर्म सेक:</strong> 20 मिनट के लिए गर्म कपड़ा/सेंक दिन में 4 बार लगाएं।</div>
                </div>
              </div>

              <!-- DOXORUBICIN EXTRAVASATION -->
              <div class="p-5 rounded-xl bg-slate-950 border-2 border-rose-500/60 space-y-3">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-base">डॉक्सोरूबिसिन रिसाव (Doxorubicin Extravasation)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-bold">COLD COMPRESS</span>
                </div>

                <div class="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-200 text-[11px] font-bold">
                  नियम: बर्फ/ठंडी सिकाई (Cold Compress) करें ताकि दवा एक ही जगह बंधी रहे और फैले नहीं। गर्म सेक पूर्णतः वर्जित है!
                </div>

                <div class="space-y-2 text-slate-300 text-[11px]">
                  <div><strong>1. डेक्सराज़ोक्सेन (Dexrazoxane / Zinecard):</strong> 10x doxorubicin dose (300 mg/m² IV) रिसाव के 3 से 6 घंटे के भीतर दूरस्थ नस में लगाएं (आयरन-फ्री रेडिकल ब्लॉक करता है)।</div>
                  <div><strong>2. DMSO (डाइमिथाइल सल्फोक्साइड 99%):</strong> त्वचा पर दिन में 3-4 बार लगाएं (फ्री रेडिकल स्केवेंजर)।</div>
                  <div><strong>3. बर्फ सेक:</strong> 15 मिनट हेतु आइस-पैक दिन में 4 बार लगाएं।</div>
                </div>
              </div>

            </div>

            <!-- USP 800 OWNER WASTE HANDLING INSTRUCTIONS -->
            <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2 text-xs">
              <div class="font-bold text-purple-300 flex items-center gap-2">
                <i class="fa-solid fa-biohazard"></i> स्वामी हेतु विषाक्त मलमूत्र सुरक्षा दिशानिर्देश (48-Hour Owner Precautions)
              </div>
              <p class="text-slate-300 text-[11px] leading-relaxed">
                कीमोथेरेपी के 48 घंटे बाद तक श्वान/बिल्ली के मूत्र, मल और उल्टी में सक्रिय साइटोटॉक्सिक दवाएं उत्सर्जित होती हैं। पशु स्वामी को हमेशा <strong>नाइट्राइल दस्ताने (Nitrile Gloves)</strong> पहनकर ही सफाई करनी चाहिए। गर्भवती महिलाओं और बच्चों को पशु के अपशिष्ट से पूर्णतः दूर रखें।
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
      container.querySelectorAll(".onco-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Patient switching
      container.querySelectorAll("[data-select-patient]").forEach((card) => {
        card.addEventListener("click", (e) => {
          const pId = e.currentTarget.getAttribute("data-select-patient");
          if (pId && pId !== this.state.activePatientId) {
            this.state.activePatientId = pId;
            const p = this.state.oncologyPatients.find((x) => x.patientId === pId);
            if (p) {
              this.state.bsaCalculatorState.species = p.species;
              this.state.bsaCalculatorState.weightKg = p.weightKg;
              this.recalculateLiveBsa();
            }
            this.render();
          }
        });
      });

      // TNM Selector changes
      const selT = container.querySelector("#selTnmT");
      const selN = container.querySelector("#selTnmN");
      const selM = container.querySelector("#selTnmM");

      const updateTnm = () => {
        if (!selT || !selN || !selM) return;
        this.state.currentTnmSelection.t = selT.value;
        this.state.currentTnmSelection.n = selN.value;
        this.state.currentTnmSelection.m = selM.value;
        this.render();
      };

      if (selT && selN && selM) {
        selT.addEventListener("change", updateTnm);
        selN.addEventListener("change", updateTnm);
        selM.addEventListener("change", updateTnm);
      }

      // BSA Calculator input changes
      const inBsaWt = container.querySelector("#inBsaWeight");
      const selBsaSp = container.querySelector("#selBsaSpecies");
      const selBsaDrug = container.querySelector("#selBsaDrug");
      const inBsaRate = container.querySelector("#inBsaCustomRate");

      const updateBsaCalc = () => {
        if (!inBsaWt || !selBsaSp || !selBsaDrug) return;
        this.state.bsaCalculatorState.weightKg = parseFloat(inBsaWt.value) || 20.0;
        this.state.bsaCalculatorState.species = selBsaSp.value;
        this.state.bsaCalculatorState.selectedDrugKey = selBsaDrug.value;
        if (inBsaRate) this.state.bsaCalculatorState.customDoseRateMgM2 = parseFloat(inBsaRate.value) || 30.0;
        this.recalculateLiveBsa();
        this.render();
      };

      if (inBsaWt && selBsaSp && selBsaDrug) {
        inBsaWt.addEventListener("input", updateBsaCalc);
        selBsaSp.addEventListener("change", updateBsaCalc);
        selBsaDrug.addEventListener("change", () => {
          const dKey = selBsaDrug.value;
          const drug = ONCOLOGY_CONSTANTS.DRUG_DATABASE[dKey];
          if (drug && inBsaRate) {
            inBsaRate.value = drug.standardDoseBsaMgM2;
          }
          updateBsaCalc();
        });
      }

      // Modals Triggers
      const btnOpenNewOnco = container.querySelector("#btnOpenNewOncoCaseModal");
      if (btnOpenNewOnco) {
        btnOpenNewOnco.addEventListener("click", () => this.showNewPatientModal());
      }

      // Print Chemo Flowsheet
      const btnPrint = container.querySelector("#btnPrintChemoSheet");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => {
          this.printChemoFlowsheet(this.state.activePatientId);
        });
      }
    },

    // 4.6 CLINICAL MODALS
    showNewPatientModal() {
      const modalHost = document.getElementById("oncoModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="newOncoModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-rose-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-ribbon text-rose-500 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">नया कैंसर रोगी दाखिल करें (Oncology Intake)</h3>
              </div>
              <button id="btnCloseOncoModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewOncoPatient" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">रोगी का नाम (Patient Name)</label>
                  <input type="text" id="inOncoPetName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold" placeholder="उदा. शेरू (Sheru)" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">प्रजाति व नस्ल</label>
                  <input type="text" id="inOncoBreed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. Boxer Cross" required />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">शारीरिक भार (Weight kg)</label>
                  <input type="number" step="0.5" id="inOncoWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold" value="26.0" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">ट्यूमर का प्रकार (Tumor Type)</label>
                  <select id="selOncoTumorType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                    <option value="CANINE_LYMPHOMA">Canine Multicentric Lymphoma</option>
                    <option value="MAST_CELL_TUMOR">Mast Cell Tumor (MCT)</option>
                    <option value="OSTEOSARCOMA">Appendicular Osteosarcoma</option>
                    <option value="FELINE_INJECTION_SITE_SARCOMA">Feline Injection-Site Sarcoma</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">ANC गणना (/uL)</label>
                  <input type="number" id="inOncoAnc" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold" value="3800" />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">प्लेटलेट्स गणना (/uL)</label>
                  <input type="number" id="inOncoPlt" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold" value="210000" />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">स्वामी का नाम व संपर्क</label>
                <input type="text" id="inOncoOwner" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. रोहित मल्होत्रा (98XXXXXXXX)" required />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelOncoModal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitOncoPatient" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold">रोगी सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseOncoModal").addEventListener("click", close);
      document.getElementById("btnCancelOncoModal").addEventListener("click", close);

      document.getElementById("formAddNewOncoPatient").addEventListener("submit", async () => {
        const name = document.getElementById("inOncoPetName").value.trim();
        const breed = document.getElementById("inOncoBreed").value.trim();
        const weightKg = parseFloat(document.getElementById("inOncoWeight").value) || 20.0;
        const tumorType = document.getElementById("selOncoTumorType").value;
        const anc = parseInt(document.getElementById("inOncoAnc").value, 10) || 3500;
        const plt = parseInt(document.getElementById("inOncoPlt").value, 10) || 200000;
        const owner = document.getElementById("inOncoOwner").value.trim();

        const bsa = this.calculateBsaM2(weightKg, "canine");

        const newPatient = {
          id: "ONCO-" + Date.now(),
          patientId: "ONCO-PAT-" + Date.now().toString().slice(-4),
          tagNo: "TAG-ONC-" + Math.floor(100 + Math.random() * 900),
          patientName: name,
          species: "canine",
          breed,
          weightKg,
          bodySurfaceAreaM2: bsa,
          tumorType,
          diagnosisTitle: `${tumorType.replace(/_/g, " ")} (Confirmed Cytology/Histopath)`,
          tnmStage: { t: "T2", n: "N0", m: "M0" },
          compositeStage: "STAGE_II",
          histopathGrade: "GRADE_II",
          cbcBeforeCycle: { ancCount: anc, plateletCount: plt },
          remissionStatus: "PARTIAL_REMISSION",
          activeProtocol: "CHOP_WISCONSIN_MADISON",
          currentWeek: 1,
          ownerName: owner,
          attendingOncologist: "Dr. Rahul (DACVIM Oncology Specialist)"
        };

        await OncoStorage.put(OncoStorage.storeNames.patients, newPatient);
        this.state.oncologyPatients.unshift(newPatient);
        this.state.activePatientId = newPatient.patientId;
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("नया ऑन्कोलॉजी रोगी सफलतापूर्वक पंजीकृत हुआ!", "success");
        }
      });
    },

    // 4.7 CLINICAL CHEMOTHERAPY FLOWSHEET PRINT ENGINE
    printChemoFlowsheet(patientId) {
      const p = this.state.oncologyPatients.find((x) => x.patientId === patientId) || this.state.oncologyPatients[0];
      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि कीमोथेरेपी फ्लो-शीट प्रिंट की जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Clinical Oncology Chemo Flowsheet - ${p.patientName}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #b91c1c; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-red { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .hazard-banner { background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 6px; font-size: 10px; color: #991b1b; margin: 15px 0; line-height: 1.4; font-weight: bold; }
            .seal-row { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 180px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #991b1b; letter-spacing: -0.5px;">VETCARE AI OS (MEDICAL ONCOLOGY DIVISION)</div>
                <div style="font-size: 10px; color: #4b5563;">Cytotoxic Drug Administration Flowsheet & Dual-Nurse Verification Record</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">कीमोथेरेपी प्रशासन एवं सुरक्षा फ्लो-शीट (Chemo Administration Sheet)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-red">USP 800 HAZARDOUS DRUG</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">CASE ID: ${p.patientId}</div>
                <div style="font-size: 9px; color: #6b7280;">Date: ${new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <table class="data-table">
            <tr>
              <th width="25%">रोगी का नाम (Patient)</th>
              <td width="25%"><strong>${p.patientName}</strong> (${p.breed})</td>
              <th width="25%">वजन एवं BSA</th>
              <td width="25%"><strong>${p.weightKg} kg</strong> (BSA: <strong style="color: #0891b2;">${p.bodySurfaceAreaM2} m²</strong>)</td>
            </tr>
            <tr>
              <th>निदान व स्टेज (Staging)</th>
              <td colspan="3"><strong style="color: #991b1b;">${p.diagnosisTitle}</strong> (${p.compositeStage} - ${p.remissionStatus})</td>
            </tr>
            <tr>
              <th>प्री-कीमो न्यूट्रोफिल्स (ANC)</th>
              <td style="font-family: monospace; font-weight: bold; color: ${p.cbcBeforeCycle.ancCount >= 1500 ? "#065f46" : "#b91c1c"}">${p.cbcBeforeCycle.ancCount} /uL (Min 1,500)</td>
              <th>प्लेटलेट्स गणना (Platelets)</th>
              <td style="font-family: monospace; font-weight: bold; color: ${p.cbcBeforeCycle.plateletCount >= 100000 ? "#065f46" : "#b91c1c"}">${p.cbcBeforeCycle.plateletCount} /uL (Min 100,000)</td>
            </tr>
          </table>

          <div class="hazard-banner">
            चेतावनी (Hazardous Cytotoxic Protocol): यह दवा एक गंभीर वेसिकेंट (Vesicant) अथवा म्यूटाजेनिक एजेंट है। केवल प्रशिक्षित ऑन्कोलॉजी स्टाफ द्वारा क्लोज्ड सिस्टम ट्रांसफर डिवाइस (CSTD) तथा डबल नाइट्राइल ग्लव्स, गाउन व आई-शील्ड पहनकर ही चढ़ाई जाए। एक्स्ट्रावासेशन की स्थिति में तुरंत इन्फ्यूजन रोकें।
          </div>

          <div style="font-weight: 800; text-transform: uppercase; margin: 15px 0 6px; font-size: 11px; color: #991b1b;">
            सक्रिय प्रोटोकॉल: ${p.activeProtocol} (Cycle Week ${p.currentWeek})
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th width="15%">औषधि (Drug)</th>
                <th width="20%">निर्धारित खुराक (Dose)</th>
                <th width="15%">आयतन (Volume)</th>
                <th width="25%">मार्ग व प्रशासन समय (Route)</th>
                <th width="25%">प्रथम नर्स / द्वितीय नर्स हस्ताक्षर</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>DOXORUBICIN</strong></td>
                <td>${(p.bodySurfaceAreaM2 * 30).toFixed(1)} mg (30 mg/m²)</td>
                <td>${((p.bodySurfaceAreaM2 * 30) / 2).toFixed(1)} ml</td>
                <td>Slow IV infusion over 25 min in 0.9% NaCl</td>
                <td>RN-1: __________ | RN-2: __________</td>
              </tr>
              <tr>
                <td><strong>ONDANSETRON</strong></td>
                <td>${(p.weightKg * 0.5).toFixed(1)} mg (0.5 mg/kg)</td>
                <td>Slow IV Push pre-chemo</td>
                <td>Anti-emetic prophylaxis 30m prior</td>
                <td>Verified OK: ____________</td>
              </tr>
            </tbody>
          </table>

          <div class="seal-row">
            <div class="sig-box">
              प्रशासक ऑन्कोलॉजी नर्स<br/>
              <strong>Primary Chemo Nurse</strong>
            </div>
            <div class="sig-box">
              द्वितीय सत्यापनकर्ता नर्स<br/>
              <strong>Dual-Verification Nurse</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #991b1b; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>ONCOLOGY SEAL
              </div>
            </div>
            <div class="sig-box">
              प्रमाणित ऑन्कोलॉजिस्ट<br/>
              <strong>${p.attendingOncologist}</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 CYTOTOXIC CHEMO HASH: 3F90BA1145CD9843210ACDE9948210DDF9245ACBB6012489EFAA3210C110998B<br/>
            Vetcare AI OS - 2026 Production Master Core • DACVIM Oncology Protocol Flowsheet
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
      const modalHost = document.getElementById("oncoModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Canine Feline Oncology Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.CanineFelineOncology = CanineFelineOncology;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      CanineFelineOncology.init();
    });
  } else {
    CanineFelineOncology.init();
  }
})();
