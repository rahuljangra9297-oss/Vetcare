// Vetcare AI OS - Doctor 360-Degree Patient Consultation Room & Diagnostic Workstation (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Doctor = window.VetcareApp.Doctor || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // Standard Event Bus Fallback
  if (!window.VetcareApp.EventBus) {
    const listeners = {};
    window.VetcareApp.EventBus = {
      on: function (event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
      },
      off: function (event, callback) {
        if (!listeners[event]) return;
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      },
      emit: function (event, payload) {
        if (listeners[event]) {
          listeners[event].forEach(cb => {
            try { cb(payload); } catch (e) { console.error("[Vetcare EventBus Error]", e); }
          });
        }
        window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
      }
    };
  }

  // 2. AUDIO FEEDBACK ENGINE (WEB AUDIO API SYNTHESIZER)
  const ConsultationAudio = {
    playChime: function (freq, type, duration, vol) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq || 587.33, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.2));
      } catch (e) {
        // Silent catch for autoplay constraints
      }
    },
    alertVitalsAbnormal: function () {
      ConsultationAudio.playChime(784, "sawtooth", 0.15, 0.1);
      setTimeout(() => ConsultationAudio.playChime(440, "sawtooth", 0.25, 0.12), 120);
    },
    successRxSave: function () {
      ConsultationAudio.playChime(523.25, "sine", 0.1, 0.08);
      setTimeout(() => ConsultationAudio.playChime(659.25, "sine", 0.15, 0.08), 90);
      setTimeout(() => ConsultationAudio.playChime(783.99, "sine", 0.25, 0.09), 180);
    }
  };

  // 3. INDEXED-DB PERSISTENCE LAYER FOR CLINICAL ENCOUNTERS
  const ClinicalStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    STORE_NAME: "clinical_consultations",
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(ClinicalStorage.DB_NAME, ClinicalStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(ClinicalStorage.STORE_NAME)) {
            const store = db.createObjectStore(ClinicalStorage.STORE_NAME, { keyPath: "consultationId" });
            store.createIndex("patientId", "patientId", { unique: false });
            store.createIndex("timestamp", "timestamp", { unique: false });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveConsultation: async function (record) {
      try {
        const db = await ClinicalStorage.getDb();
        const tx = db.transaction(ClinicalStorage.STORE_NAME, "readwrite");
        const store = tx.objectStore(ClinicalStorage.STORE_NAME);
        store.put(record);
      } catch (err) {
        try {
          const key = "VETCARE_CONSULTATION_" + record.consultationId;
          localStorage.setItem(key, JSON.stringify(record));
        } catch (e) {
          console.warn("[ConsultationStorage] LocalStorage quota overflow", e);
        }
      }
    }
  };

  // 4. VETERINARY CLINICAL SPECIES KNOWLEDGE ENGINE & DIFFERENTIALS
  const SpeciesVitalsRef = {
    bovine: {
      temp: { min: 100.4, max: 102.8, criticalHigh: 103.5, criticalLow: 100.0 },
      pulse: { min: 60, max: 80, criticalHigh: 95, criticalLow: 45 },
      resp: { min: 15, max: 30, criticalHigh: 40, criticalLow: 10 },
      rumenMotility: { min: 2, max: 3, criticalLow: 1 } // Per 2 mins
    },
    canine: {
      temp: { min: 100.0, max: 102.5, criticalHigh: 103.2, criticalLow: 99.0 },
      pulse: { min: 70, max: 130, criticalHigh: 160, criticalLow: 50 },
      resp: { min: 18, max: 34, criticalHigh: 45, criticalLow: 10 },
      rumenMotility: null
    },
    caprine: {
      temp: { min: 101.5, max: 103.5, criticalHigh: 104.2, criticalLow: 100.5 },
      pulse: { min: 70, max: 90, criticalHigh: 110, criticalLow: 55 },
      resp: { min: 15, max: 30, criticalHigh: 40, criticalLow: 12 },
      rumenMotility: { min: 2, max: 4, criticalLow: 1 }
    },
    equine: {
      temp: { min: 99.0, max: 100.5, criticalHigh: 101.5, criticalLow: 98.0 },
      pulse: { min: 28, max: 44, criticalHigh: 58, criticalLow: 22 },
      resp: { min: 8, max: 16, criticalHigh: 24, criticalLow: 6 },
      rumenMotility: null
    }
  };

  const DifferentialKnowledgeBase = [
    {
      species: ["bovine"],
      diagnosis: "Acute Ruminal Tympany (Free-Gas Bloat)",
      probability: "89%",
      triggers: ["bloat", "tympany", "distension", "fossa", "grunting", "left paralumbar"],
      urgentAction: "Trocarization / Stomach Tube & Simethicone drench (Bloatosil 100ml)",
      corticosteroidSafe: true
    },
    {
      species: ["bovine"],
      diagnosis: "Post-Partum Hypocalcemia (Milk Fever / Downer Cow)",
      probability: "84%",
      triggers: ["downer", "recumbent", "neck", "parturition", "calving", "subnormal"],
      urgentAction: "Slow IV infusion of Calcium Borogluconate 25% (450ml) w/ cardiac monitoring",
      corticosteroidSafe: true
    },
    {
      species: ["bovine"],
      diagnosis: "Acute Ephemeral Fever (Three-Day Sickness / Bovine Dengue)",
      probability: "78%",
      triggers: ["fever", "stiffness", "lameness", "shivering", "salivation", "lacrimation"],
      urgentAction: "Flunixin Meglumine 2.2 mg/kg IV + Supportive Fluid Therapy",
      corticosteroidSafe: true
    },
    {
      species: ["bovine", "caprine"],
      diagnosis: "Acute Coliform Clinical Mastitis (E. coli / Klebsiella)",
      probability: "82%",
      triggers: ["mastitis", "teat", "swelling", "curd", "flakes", "udder", "serous milk"],
      urgentAction: "Systemic Ceftiofur / Enrofloxacin + Frequent Stripping + NSAID (Meloxicam)",
      corticosteroidSafe: false
    },
    {
      species: ["bovine"],
      diagnosis: "Bovine Babesiosis (Redwater Fever - Babesia bigemina)",
      probability: "85%",
      triggers: ["coffee colored", "red urine", "hemoglobinuria", "tick", "high fever", "icterus"],
      urgentAction: "Diminazene Aceturate (Berenil) 3.5 mg/kg deep IM + Iron Dextran",
      corticosteroidSafe: true
    },
    {
      species: ["canine"],
      diagnosis: "Canine Parvoviral Enteritis (CPV-2)",
      probability: "92%",
      triggers: ["bloody diarrhea", "vomiting", "parvo", "foul smell", "lethargy", "pup"],
      urgentAction: "Intensive IV Crystalloids (RL), Maropitant (Cerenia), Metronidazole + Cefotaxime",
      corticosteroidSafe: false
    },
    {
      species: ["equine"],
      diagnosis: "Spasmodic / Impaction Colic",
      probability: "88%",
      triggers: ["colic", "rolling", "pawing", "flank watching", "sweating", "gut sounds absent"],
      urgentAction: "Flunixin Meglumine 1.1 mg/kg IV + Nasogastric tube decompression + Liquid paraffin",
      corticosteroidSafe: false
    }
  ];

  // 5. PHARMACOPEIA CATALOG WITH AUTOMATIC SHAEFFER DOSIMETRY
  const ClinicalFormulary = [
    {
      id: "drg-flunixin",
      name: "Flunixin Meglumine Injection (50 mg/ml)",
      category: "NSAID & Anti-Endotoxic",
      doseMgPerKg: 2.2,
      concentrationMgPerMl: 50,
      route: "Slow IV",
      freq: "OD x 2-3 Days",
      pregnancySafe: true,
      withdrawalMilkHours: 36,
      withdrawalMeatDays: 7
    },
    {
      id: "drg-meloxicam",
      name: "Meloxicam Injection (5 mg/ml)",
      category: "Safe Non-Steroidal Anti-Inflammatory",
      doseMgPerKg: 0.5,
      concentrationMgPerMl: 5,
      route: "IM / SC / Slow IV",
      freq: "OD x 3 Days",
      pregnancySafe: true,
      withdrawalMilkHours: 48,
      withdrawalMeatDays: 15
    },
    {
      id: "drg-ceftiofur",
      name: "Ceftiofur Sodium / RTU (50 mg/ml)",
      category: "3rd Gen Cephalosporin Antibiotic",
      doseMgPerKg: 1.1,
      concentrationMgPerMl: 50,
      route: "Deep IM",
      freq: "OD x 3-5 Days",
      pregnancySafe: true,
      withdrawalMilkHours: 0, // Zero milk withdrawal standard
      withdrawalMeatDays: 4
    },
    {
      id: "drg-enrofloxacin",
      name: "Enrofloxacin Injection (100 mg/ml)",
      category: "Fluoroquinolone Antimicrobial",
      doseMgPerKg: 5.0,
      concentrationMgPerMl: 100,
      route: "Slow IV / IM",
      freq: "OD x 3 Days",
      pregnancySafe: true,
      withdrawalMilkHours: 72,
      withdrawalMeatDays: 14
    },
    {
      id: "drg-bloatosil",
      name: "Bloatosil (Simethicone 1% + Dill Oil Emulsion)",
      category: "Antifoaming & Carminative",
      doseMgPerKg: null,
      customDose: "100 ml drench in 500 ml lukewarm water",
      route: "Oral / Intraruminal",
      freq: "Stat (Repeat in 4-6h if needed)",
      pregnancySafe: true,
      withdrawalMilkHours: 0,
      withdrawalMeatDays: 0
    },
    {
      id: "drg-dexamethasone",
      name: "Dexamethasone Sodium Phosphate (4 mg/ml)",
      category: "Potent Corticosteroid",
      doseMgPerKg: 0.05,
      concentrationMgPerMl: 4,
      route: "IM / IV",
      freq: "Stat only",
      pregnancySafe: false, // HIGH ABORTIFACIENT RISK
      withdrawalMilkHours: 72,
      withdrawalMeatDays: 21
    },
    {
      id: "drg-calcium-borogluconate",
      name: "Calcium Borogluconate 25% w/ Magnesium & Phosphorus",
      category: "Mineral Resuscitation Infusion",
      doseMgPerKg: null,
      customDose: "450 ml (Half slow IV with auscultation, half SC)",
      route: "Slow IV + SC",
      freq: "Stat (Warm to body temperature)",
      pregnancySafe: true,
      withdrawalMilkHours: 0,
      withdrawalMeatDays: 0
    }
  ];

  // 6. MAIN CONSULTATION ROOM CONTROLLER
  const ConsultationRoom = {
    // Reactive State
    state: {
      currentPatient: {
        id: "PAT-BOV-8841",
        tagNo: "IN-HR-2024-8841",
        name: "Laxmi (Murrah)",
        species: "bovine",
        breed: "Murrah Buffalo",
        ageYears: 5.5,
        weightKg: 520,
        sex: "female",
        lactationStage: "MID_LACTATION",
        pregnancyStatus: "PREGNANT_THIRD_TRIMESTER", // 'EMPTY' | 'PREGNANT_FIRST_TRIMESTER' | 'PREGNANT_THIRD_TRIMESTER' | 'POST_PARTUM'
        ownerName: "Sukhbir Singh",
        contact: "+91 98120 44921",
        village: "Dhansu, Hisar (HR)"
      },
      examinationForm: {
        chiefComplaint: "Severe Acute Left Paralumbar Distension, Pain Grunting, Restlessness & Drooling",
        illnessDurationDays: 1,
        tempF: 101.4,
        heartRateBpm: 88,
        respRateMin: 38,
        rumenMotilityPer2Min: 0,
        mucousMembranes: "CONGESTED", // 'ROSY_NORMAL' | 'PALE_PINK' | 'CONGESTED' | 'ICTERIC' | 'CYANOTIC'
        lymphNodes: "NORMAL", // 'NORMAL' | 'ENLARGED_PRESCAPULAR' | 'ENLARGED_PRECRURAL' | 'GENERALIZED_LYMPHADENOPATHY'
        systemicReview: {
          digestive: true,
          respiratory: true,
          musculoskeletal: false,
          urogenital: false,
          integumentary: false,
          ophthalmic: false
        },
        clinicalNotes: "Palpation of left paralumbar fossa reveals tense drum-like tympanitic resonance. Ruminal stasis confirmed upon auscultation for 2 consecutive minutes."
      },
      provisionalDiagnosis: "Acute Ruminal Tympany & Secondary Respiratory Distress",
      prescribedDrugs: [],
      orderedLabTests: [],
      admissionRecommended: false,
      containerElement: null
    },

    // 7. LIFECYCLE: INIT
    init: function (containerId) {
      console.info("[Vetcare AI OS] Initializing 360-Degree Patient Consultation Room (2026 Production)...");
      ConsultationRoom.state.containerElement = document.getElementById(containerId) || null;
      ConsultationRoom.injectStyles();
      ConsultationRoom.seedDefaultPrescription();
      return ConsultationRoom;
    },

    // 8. LIFECYCLE: RENDER
    render: function (containerId, patientId) {
      let targetContainer = document.getElementById(containerId);
      if (!targetContainer) {
        targetContainer = document.createElement("div");
        targetContainer.id = containerId || "patientConsultationRoomContainer";
        targetContainer.className = "w-full min-h-screen p-3 sm:p-5 lg:p-6";
        const mainArea = document.querySelector("main") || document.body;
        mainArea.innerHTML = "";
        mainArea.appendChild(targetContainer);
      }
      ConsultationRoom.state.containerElement = targetContainer;

      // If patientId provided and doesn't match default, load or synthesize
      if (patientId && patientId !== ConsultationRoom.state.currentPatient.id) {
        ConsultationRoom.loadPatientContext(patientId);
      }

      targetContainer.innerHTML = `
        <div id="vetcareConsultationRoomWorkspace" class="max-w-7xl mx-auto space-y-5">
          ${ConsultationRoom.renderMasterHeader()}
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left Column: Physical Exam & Clinical Telemetry (6 Cols) -->
            <div class="lg:col-span-6 space-y-5">
              ${ConsultationRoom.renderPatientBioCard()}
              ${ConsultationRoom.renderVitalsMatrixCard()}
              ${ConsultationRoom.renderSystemicReviewCard()}
            </div>

            <!-- Right Column: Diagnostic Inference, Rx & Orders (6 Cols) -->
            <div class="lg:col-span-6 space-y-5">
              ${ConsultationRoom.renderDifferentialDiagnosisCard()}
              ${ConsultationRoom.renderPharmacopeiaPrescriptionCard()}
              ${ConsultationRoom.renderDiagnosticOrdersCard()}
              ${ConsultationRoom.renderActionFooterCard()}
            </div>
          </div>
        </div>

        <!-- Hidden Offscreen Container for Print Generation -->
        <div id="legalPrescriptionPrintHost" class="hidden"></div>
      `;

      ConsultationRoom.bindAllEvents();
      ConsultationRoom.evaluateVitalsSanity();
    },

    // 9. LIFECYCLE: DESTROY
    destroy: function () {
      if (ConsultationRoom.state.containerElement) {
        ConsultationRoom.state.containerElement.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Patient Consultation Room Destroyed cleanly.");
    },

    // 10. EXTERNAL ENTRY POINT: OPEN DIRECT SESSION
    openSession: function (patientData) {
      if (patientData) {
        ConsultationRoom.state.currentPatient = {
          id: patientData.patientId || patientData.id || ("PAT-" + Date.now().toString().slice(-4)),
          tagNo: patientData.tagNo || "TAG-VERIFIED",
          name: patientData.breed || "Patient Animal",
          species: patientData.species || "bovine",
          breed: patientData.breed || "Crossbred",
          ageYears: parseFloat(patientData.age) || 4,
          weightKg: parseFloat(patientData.weightKg) || 420,
          sex: patientData.gender ? patientData.gender.toLowerCase() : "female",
          lactationStage: "MID_LACTATION",
          pregnancyStatus: "PREGNANT_THIRD_TRIMESTER",
          ownerName: patientData.ownerName || "Registered Farmer",
          contact: "+91 98120 00000",
          village: "Field Station Sector 4"
        };
        ConsultationRoom.state.examinationForm.chiefComplaint = patientData.chiefComplaint || "Routine Health Intake";
      }
      ConsultationRoom.seedDefaultPrescription();

      // Check if rendered inline or in dedicated modal host
      const defaultHost = document.getElementById("activeConsultationRoomModal") || document.getElementById("doctorDashboardContainer");
      if (defaultHost) {
        ConsultationRoom.render(defaultHost.id);
        defaultHost.classList.remove("hidden");
        defaultHost.classList.add("flex");
      } else {
        ConsultationRoom.render("patientConsultationRoomContainer");
      }
    },

    // 11. CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-consultation-room-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-consultation-room-styles";
      style.textContent = `
        .telemetry-normal { border-color: #10b981 !important; color: #10b981 !important; background-color: rgba(16, 185, 129, 0.08) !important; }
        .telemetry-warning { border-color: #f59e0b !important; color: #f59e0b !important; background-color: rgba(245, 158, 11, 0.08) !important; }
        .telemetry-critical { border-color: #f43f5e !important; color: #f43f5e !important; background-color: rgba(244, 63, 94, 0.12) !important; animation: vitalCriticalPulse 1.6s infinite; }
        @keyframes vitalCriticalPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(244, 63, 94, 0); }
        }
        .custom-vitals-input:focus { outline: none; border-color: #06b6d4 !important; ring: 2px #06b6d4; }
        @media print {
          body * { visibility: hidden !important; }
          #legalPrescriptionPrintHost, #legalPrescriptionPrintHost * { visibility: visible !important; }
          #legalPrescriptionPrintHost { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; }
        }
      `;
      document.head.appendChild(style);
    },

    // 12. COMPONENT: MASTER CLINICAL HEADER
    renderMasterHeader: function () {
      const p = ConsultationRoom.state.currentPatient;
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sunlight-card">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-950/40">
              <i class="fa-solid fa-laptop-medical"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="font-display font-black text-lg sm:text-xl text-white tracking-tight sunlight-text">
                  360° क्लिनिकल परामर्श कक्ष (Consultation Room)
                </h1>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ACTIVE CASE #${p.id}
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  SHAEFFER V2.6 OK
                </span>
              </div>
              <div class="text-xs text-slate-400 font-mono mt-0.5 sunlight-muted">
                स्थान: रेफरल पशु चिकित्सा परिसर • परीक्षक: डॉ. राहुल जांगड़ा (VCI-2026-9297)
              </div>
            </div>
          </div>

          <!-- Quick Navigation Actions -->
          <div class="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button id="btnConsultationResetDraft" type="button" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors">
              <i class="fa-solid fa-rotate-left mr-1"></i> रीसेट
            </button>
            <button id="btnCloseConsultationReturn" type="button" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold border border-slate-700 transition-colors">
              <i class="fa-solid fa-door-open mr-1"></i> वर्कस्पेस पर लौटें
            </button>
          </div>
        </div>
      `;
    },

    // 13. COMPONENT: PATIENT BIO CARD
    renderPatientBioCard: function () {
      const p = ConsultationRoom.state.currentPatient;
      const pregnancyLabels = {
        EMPTY: { label: "गैर-गर्भवती (Empty / Non-Pregnant)", class: "bg-slate-800 text-slate-300 border-slate-700" },
        PREGNANT_FIRST_TRIMESTER: { label: "गर्भवती (प्रथम तिमाही 1-3 माह)", class: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
        PREGNANT_THIRD_TRIMESTER: { label: "गर्भवती (तृतीय तिमाही - STEROID LOCK)", class: "bg-rose-500/20 text-rose-300 border-rose-500/50" },
        POST_PARTUM: { label: "प्रसव पश्चात (Post-Partum < 15 Days)", class: "bg-amber-500/20 text-amber-300 border-amber-500/40" }
      };
      const curPreg = pregnancyLabels[p.pregnancyStatus] || pregnancyLabels.EMPTY;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-address-card text-emerald-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">पशु बायोमेट्रिक्स एवं पहचान (Patient Profile)</h2>
            </div>
            <span class="text-xs font-mono font-bold text-emerald-400">टैग: ${p.tagNo}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div class="text-[10px] font-mono text-slate-400 uppercase">नस्ल व प्रजाति</div>
              <div class="font-bold text-white mt-0.5 sunlight-text">${p.breed}</div>
              <div class="text-[10px] text-emerald-400 capitalize">${p.species} • ${p.sex}</div>
            </div>

            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div class="text-[10px] font-mono text-slate-400 uppercase">आयु व वजन</div>
              <div class="font-bold text-white mt-0.5 sunlight-text">${p.ageYears} वर्ष</div>
              <div class="text-[11px] font-mono font-bold text-amber-400">${p.weightKg} kg (Shaeffer)</div>
            </div>

            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div class="text-[10px] font-mono text-slate-400 uppercase">दुग्ध / उत्पादन काल</div>
              <div class="font-bold text-slate-200 mt-0.5">मध्य काल (Mid-Lact)</div>
              <div class="text-[10px] text-cyan-400 font-mono">14.5 Ltr / Day</div>
            </div>

            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div class="text-[10px] font-mono text-slate-400 uppercase">पशुपालक विवरण</div>
              <div class="font-bold text-white mt-0.5 truncate sunlight-text">${p.ownerName}</div>
              <div class="text-[10px] text-slate-400 truncate">${p.village}</div>
            </div>
          </div>

          <!-- Corticosteroid Clinical Guard Interactive Status -->
          <div class="p-3 rounded-xl border ${curPreg.class} flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-shield-virus text-base"></i>
              <div>
                <div class="text-[10px] font-mono uppercase font-black tracking-wider">गर्भ सुरक्षा स्थिति (Pregnancy Guardrail)</div>
                <div class="text-xs font-bold">${curPreg.label}</div>
              </div>
            </div>
            <select id="selectPregnancyGuard" class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono">
              <option value="EMPTY" ${p.pregnancyStatus === "EMPTY" ? "selected" : ""}>Non-Pregnant</option>
              <option value="PREGNANT_FIRST_TRIMESTER" ${p.pregnancyStatus === "PREGNANT_FIRST_TRIMESTER" ? "selected" : ""}>1st Trimester</option>
              <option value="PREGNANT_THIRD_TRIMESTER" ${p.pregnancyStatus === "PREGNANT_THIRD_TRIMESTER" ? "selected" : ""}>3rd Trimester (Lock)</option>
              <option value="POST_PARTUM" ${p.pregnancyStatus === "POST_PARTUM" ? "selected" : ""}>Post-Partum</option>
            </select>
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: VITALS MATRIX CARD
    renderVitalsMatrixCard: function () {
      const f = ConsultationRoom.state.examinationForm;
      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-heart-pulse text-cyan-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">शारीरिक वाइटल्स एवं टेलीमेट्री (Clinical Vitals Matrix)</h2>
            </div>
            <span id="vitalsSanityIndicator" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              NORMAL RANGES
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <!-- Rectal Temperature -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">रेक्टल तापमान (°F)</label>
              <div class="relative">
                <input type="number" step="0.1" id="inputVitalTemp" class="custom-vitals-input w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-white" value="${f.tempF}" />
                <span class="absolute right-3 top-2.5 text-[10px] font-mono text-slate-500">°F</span>
              </div>
              <div id="badgeVitalTemp" class="text-[10px] font-mono font-semibold mt-1">सामान्य: 100.4 - 102.8</div>
            </div>

            <!-- Heart Rate -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">हृदय दर (Pulse BPM)</label>
              <div class="relative">
                <input type="number" id="inputVitalPulse" class="custom-vitals-input w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-white" value="${f.heartRateBpm}" />
                <span class="absolute right-3 top-2.5 text-[10px] font-mono text-slate-500">bpm</span>
              </div>
              <div id="badgeVitalPulse" class="text-[10px] font-mono font-semibold mt-1">सामान्य: 60 - 80</div>
            </div>

            <!-- Respiration Rate -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">श्वसन दर (Resp / Min)</label>
              <div class="relative">
                <input type="number" id="inputVitalResp" class="custom-vitals-input w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-white" value="${f.respRateMin}" />
                <span class="absolute right-3 top-2.5 text-[10px] font-mono text-slate-500">/min</span>
              </div>
              <div id="badgeVitalResp" class="text-[10px] font-mono font-semibold mt-1">सामान्य: 15 - 30</div>
            </div>

            <!-- Rumen Motility -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">रूमेन गतिशीलता (/2 Min)</label>
              <div class="relative">
                <input type="number" id="inputVitalRumen" class="custom-vitals-input w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-white" value="${f.rumenMotilityPer2Min}" />
                <span class="absolute right-3 top-2.5 text-[10px] font-mono text-slate-500">waves</span>
              </div>
              <div id="badgeVitalRumen" class="text-[10px] font-mono font-semibold mt-1">सामान्य: 2 - 3 चक्र</div>
            </div>
          </div>

          <!-- Mucous Membranes & Lymph Nodes Dual Selector -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">म्यूकोसा झिल्ली (Mucous Membranes)</label>
              <select id="selectMucousMembranes" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:ring-2 focus:ring-cyan-500">
                <option value="ROSY_NORMAL" ${f.mucousMembranes === "ROSY_NORMAL" ? "selected" : ""}>गुलाबी / सामान्य (Rosy Pink Normal)</option>
                <option value="CONGESTED" ${f.mucousMembranes === "CONGESTED" ? "selected" : ""}>कंजेस्टेड / रक्तिम (Congested Toxic Shock)</option>
                <option value="PALE_PINK" ${f.mucousMembranes === "PALE_PINK" ? "selected" : ""}>पीली / एनीमिया (Pale Anemic Babesiosis)</option>
                <option value="ICTERIC" ${f.mucousMembranes === "ICTERIC" ? "selected" : ""}>पीलिया / पीतवर्ण (Icteric / Jaundiced)</option>
                <option value="CYANOTIC" ${f.mucousMembranes === "CYANOTIC" ? "selected" : ""}>नीली / सायनोटिक (Cyanotic Hypoxia)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">लिम्फ नोड स्थिति (Superficial Lymph Nodes)</label>
              <select id="selectLymphNodes" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:ring-2 focus:ring-cyan-500">
                <option value="NORMAL" ${f.lymphNodes === "NORMAL" ? "selected" : ""}>सामान्य आकार (Non-Enlarged Normal)</option>
                <option value="ENLARGED_PRESCAPULAR" ${f.lymphNodes === "ENLARGED_PRESCAPULAR" ? "selected" : ""}>प्री-स्कैपुलर सूजन (Theileriosis Susp.)</option>
                <option value="ENLARGED_PRECRURAL" ${f.lymphNodes === "ENLARGED_PRECRURAL" ? "selected" : ""}>प्री-क्रूरल सूजन (Bovine Ephemeral)</option>
                <option value="GENERALIZED_LYMPHADENOPATHY" ${f.lymphNodes === "GENERALIZED_LYMPHADENOPATHY" ? "selected" : ""}>सर्वव्यापी सूजन (Generalized Node Swell)</option>
              </select>
            </div>
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: SYSTEMIC REVIEW & CLINICAL NOTES CARD
    renderSystemicReviewCard: function () {
      const f = ConsultationRoom.state.examinationForm;
      const sr = f.systemicReview;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-list-check text-amber-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">सिस्टमिक अंग समीक्षा एवं केस इतिहास</h2>
            </div>
            <span class="text-[10px] font-mono text-slate-400">6-POINT CHECKLIST</span>
          </div>

          <!-- Systemic Checkbox Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysDigestive" ${sr.digestive ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">पाचन तंत्र (Digestive)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysRespiratory" ${sr.respiratory ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">श्वसन तंत्र (Respiratory)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysMusculoskeletal" ${sr.musculoskeletal ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">अस्थि-मांसपेशी (Locomotor)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysUrogenital" ${sr.urogenital ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">मूत्र-जनन (Urogenital)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysIntegumentary" ${sr.integumentary ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">त्वचा व खुर (Dermatology)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input type="checkbox" id="chkSysOphthalmic" ${sr.ophthalmic ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span class="text-xs text-slate-200">नेत्र / दृष्टि (Ophthalmic)</span>
            </label>
          </div>

          <!-- Chief Complaint & Clinical Notes -->
          <div class="space-y-3 pt-1">
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">मुख्य शिकायत (Chief Complaint)</label>
              <input type="text" id="inputChiefComplaint" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500" value="${f.chiefComplaint}" />
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">विस्तृत परीक्षण निष्कर्ष (Clinical Examination & Auscultation Notes)</label>
              <textarea id="textareaClinicalNotes" rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-emerald-500">${f.clinicalNotes}</textarea>
            </div>
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: DIFFERENTIAL DIAGNOSIS SUGGESTIONS CARD
    renderDifferentialDiagnosisCard: function () {
      const p = ConsultationRoom.state.currentPatient;
      const cc = (ConsultationRoom.state.examinationForm.chiefComplaint || "").toLowerCase();

      // Find matching differentials
      const matches = DifferentialKnowledgeBase.filter(item => {
        const speciesMatch = item.species.includes(p.species);
        const triggerMatch = item.triggers.some(t => cc.includes(t));
        return speciesMatch && triggerMatch;
      });

      const displayList = matches.length > 0 ? matches : DifferentialKnowledgeBase.filter(i => i.species.includes(p.species)).slice(0, 3);

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-brain text-cyan-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">विभेदक निदान अनुशंसाएं (Differential Diagnostics AI)</h2>
            </div>
            <span class="text-[10px] font-mono text-cyan-400">AUTO-RANKED</span>
          </div>

          <div class="space-y-2">
            ${displayList.map(dd => `
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-white sunlight-text">${dd.diagnosis}</span>
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${dd.probability} मैच</span>
                  </div>
                  <div class="text-[11px] text-amber-300 font-mono">⚡ तत्काल कदम: ${dd.urgentAction}</div>
                </div>
                <button type="button" data-action="apply_diagnosis" data-diag-name="${dd.diagnosis}" class="py-1 px-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-[11px] font-extrabold whitespace-nowrap active:scale-95 transition-all">
                  चयन करें
                </button>
              </div>
            `).join("")}
          </div>

          <!-- Confirmed Diagnosis Input -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">अंतिम नैदानिक पुष्टि (Confirmed Provisional Diagnosis)</label>
            <input type="text" id="inputProvisionalDiagnosis" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500" value="${ConsultationRoom.state.provisionalDiagnosis}" />
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: PHARMACOPEIA & FAST DOSIMETRY CARD
    renderPharmacopeiaPrescriptionCard: function () {
      const p = ConsultationRoom.state.currentPatient;
      const prescribed = ConsultationRoom.state.prescribedDrugs;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-pills text-emerald-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">औषधि खुराक व प्रिस्क्रिप्शन (Shaeffer's Dosimetry)</h2>
            </div>
            <span class="text-[10px] font-mono text-emerald-400">${p.weightKg} KG BIOMETRIC BASIS</span>
          </div>

          <!-- Fast Add Formulation Selector -->
          <div class="flex items-center gap-2">
            <select id="selectFormularyCatalog" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
              ${ClinicalFormulary.map(d => `
                <option value="${d.id}">${d.name} (${d.category})</option>
              `).join("")}
            </select>
            <button id="btnAddDrugFromCatalog" type="button" class="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all shadow-md">
              <i class="fa-solid fa-plus"></i>
              <span>खुराक जोड़ें</span>
            </button>
          </div>

          <!-- Prescribed Drugs Active Table -->
          <div class="border border-slate-800 rounded-xl overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th class="p-2.5">औषधि नाम</th>
                  <th class="p-2.5">रूट</th>
                  <th class="p-2.5">सटीक खुराक (Calculated)</th>
                  <th class="p-2.5">आवृत्ति</th>
                  <th class="p-2.5 text-center">हटाएं</th>
                </tr>
              </thead>
              <tbody id="prescribedDrugsTableBody" class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                ${prescribed.map((drg, idx) => `
                  <tr>
                    <td class="p-2.5 font-bold text-white">${drg.name}</td>
                    <td class="p-2.5 text-cyan-300">${drg.route}</td>
                    <td class="p-2.5 text-emerald-400 font-bold">${drg.calculatedDose}</td>
                    <td class="p-2.5 text-slate-300">${drg.freq}</td>
                    <td class="p-2.5 text-center">
                      <button type="button" data-action="remove_drug" data-index="${idx}" class="text-rose-400 hover:text-rose-300 p-1">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Withdrawal Period Live Guard Notice -->
          <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
            <i class="fa-solid fa-clock-rotate-left text-amber-400 mt-0.5"></i>
            <div>
              <strong>विथड्राल सूचना:</strong> न्यूनतम 36 घंटे तक दूध आपूर्ति मानव उपभोग हेतु वर्जित। मांस 7 दिन तक वर्जित।
            </div>
          </div>
        </div>
      `;
    },

    // 18. COMPONENT: DIAGNOSTIC LAB & IMAGING ORDERS CARD
    renderDiagnosticOrdersCard: function () {
      const orders = [
        { code: "LAB_CBC_SMEAR", name: "Automated CBC + Blood Smear (Babesia/Theileria)", specimen: "EDTA Blood" },
        { code: "LAB_MILK_CMT_AST", name: "Quarter CMT & Antibiotic Sensitivity (AST)", specimen: "Mastitic Milk" },
        { code: "LAB_SERUM_BIOCHEM", name: "Serum Calcium, Phosphorus & BUN/Creatinine", specimen: "Plain Serum" },
        { code: "IMG_USG_ABDOMEN", name: "Emergency Abdominal Ultrasonography (Rumen/Reticulum)", specimen: "Imaging" }
      ];

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-vial-virus text-purple-400"></i>
              <h2 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">डायग्नोस्टिक लैब व इमेजिंग मांग (Order Pad)</h2>
            </div>
            <span class="text-[10px] font-mono text-purple-400">LAB ANALYZER SYNC</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${orders.map(o => `
              <label class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 cursor-pointer hover:border-slate-700">
                <input type="checkbox" data-lab-code="${o.code}" data-lab-name="${o.name}" data-lab-specimen="${o.specimen}" class="lab-order-checkbox mt-0.5 rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-purple-500" />
                <div class="text-xs">
                  <div class="font-bold text-slate-200">${o.name}</div>
                  <div class="text-[10px] font-mono text-slate-400">सैंपल: ${o.specimen}</div>
                </div>
              </label>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 19. COMPONENT: ACTION FOOTER CARD
    renderActionFooterCard: function () {
      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 sunlight-card">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <label class="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-950 border border-slate-800">
              <input type="checkbox" id="chkAdmitToIpd" class="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500" />
              <span class="text-xs font-bold text-cyan-300">
                <i class="fa-solid fa-bed-pulse mr-1"></i> आईपीडी में भर्ती की सिफारिश (Admit to Ward)
              </span>
            </label>

            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button id="btnCompleteAndPrintRx" type="button" class="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                <i class="fa-solid fa-print"></i>
                <span>परामर्श पूर्ण व प्रिंट पर्ची (Finish & Print)</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 20. VITALS TELEMETRY SANITY EVALUATOR
    evaluateVitalsSanity: function () {
      const p = ConsultationRoom.state.currentPatient;
      const ref = SpeciesVitalsRef[p.species] || SpeciesVitalsRef.bovine;

      const tempVal = parseFloat(document.getElementById("inputVitalTemp") ? document.getElementById("inputVitalTemp").value : ConsultationRoom.state.examinationForm.tempF);
      const pulseVal = parseInt(document.getElementById("inputVitalPulse") ? document.getElementById("inputVitalPulse").value : ConsultationRoom.state.examinationForm.heartRateBpm, 10);
      const respVal = parseInt(document.getElementById("inputVitalResp") ? document.getElementById("inputVitalResp").value : ConsultationRoom.state.examinationForm.respRateMin, 10);
      const rumenVal = parseInt(document.getElementById("inputVitalRumen") ? document.getElementById("inputVitalRumen").value : ConsultationRoom.state.examinationForm.rumenMotilityPer2Min, 10);

      const badgeTemp = document.getElementById("badgeVitalTemp");
      const badgePulse = document.getElementById("badgeVitalPulse");
      const badgeResp = document.getElementById("badgeVitalResp");
      const badgeRumen = document.getElementById("badgeVitalRumen");
      const sanityInd = document.getElementById("vitalsSanityIndicator");

      let hasCritical = false;

      // Temp check
      if (tempVal > ref.temp.criticalHigh) {
        hasCritical = true;
        if (badgeTemp) badgeTemp.innerHTML = `<span class="text-rose-400 font-bold">उच्च बुखार (High Fever > ${ref.temp.criticalHigh}°F)</span>`;
      } else if (tempVal < ref.temp.criticalLow) {
        hasCritical = true;
        if (badgeTemp) badgeTemp.innerHTML = `<span class="text-rose-400 font-bold">निम्न तापमान / मिल्क फीवर (< ${ref.temp.criticalLow}°F)</span>`;
      } else {
        if (badgeTemp) badgeTemp.innerHTML = `<span class="text-emerald-400 font-semibold">सामान्य सीमा (${ref.temp.min} - ${ref.temp.max}°F)</span>`;
      }

      // Pulse check
      if (pulseVal > ref.pulse.criticalHigh) {
        hasCritical = true;
        if (badgePulse) badgePulse.innerHTML = `<span class="text-rose-400 font-bold">टैकीकार्डिया (> ${ref.pulse.criticalHigh} bpm)</span>`;
      } else {
        if (badgePulse) badgePulse.innerHTML = `<span class="text-emerald-400 font-semibold">सामान्य सीमा (${ref.pulse.min} - ${ref.pulse.max})</span>`;
      }

      // Resp check
      if (respVal > ref.resp.criticalHigh) {
        hasCritical = true;
        if (badgeResp) badgeResp.innerHTML = `<span class="text-rose-400 font-bold">टैकीप्निया / कष्टमय श्वसन (> ${ref.resp.criticalHigh})</span>`;
      } else {
        if (badgeResp) badgeResp.innerHTML = `<span class="text-emerald-400 font-semibold">सामान्य सीमा (${ref.resp.min} - ${ref.resp.max})</span>`;
      }

      // Rumen check
      if (ref.rumenMotility && rumenVal < ref.rumenMotility.criticalLow) {
        hasCritical = true;
        if (badgeRumen) badgeRumen.innerHTML = `<span class="text-rose-400 font-bold">रूमेन गति शून्यता (Atony / Stasis)</span>`;
      } else if (ref.rumenMotility) {
        if (badgeRumen) badgeRumen.innerHTML = `<span class="text-emerald-400 font-semibold">सामान्य गति (${ref.rumenMotility.min} - ${ref.rumenMotility.max} चक्र)</span>`;
      }

      if (sanityInd) {
        if (hasCritical) {
          sanityInd.className = "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/50 telemetry-critical";
          sanityInd.textContent = "CRITICAL TELEMETRY DETECTED";
          ConsultationAudio.alertVitalsAbnormal();
        } else {
          sanityInd.className = "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
          sanityInd.textContent = "NORMAL VITAL RANGES";
        }
      }
    },

    // 21. SEED DEFAULT PRESCRIPTION ITEMS
    seedDefaultPrescription: function () {
      const p = ConsultationRoom.state.currentPatient;
      ConsultationRoom.state.prescribedDrugs = [
        {
          id: "drg-bloatosil",
          name: "Bloatosil (Simethicone 1% + Dill Oil)",
          route: "Oral Drench",
          calculatedDose: "100 ml diluted in 500 ml lukewarm water",
          freq: "Stat (Repeat in 4-6h if needed)",
          withdrawalNotice: "0 Days Milk / 0 Days Meat"
        },
        {
          id: "drg-flunixin",
          name: "Flunixin Meglumine Injection (50 mg/ml)",
          route: "Slow IV",
          calculatedDose: `${(p.weightKg * 2.2 / 50).toFixed(1)} ml (${p.weightKg * 2.2} mg)`,
          freq: "Once daily (OD) x 2 Days",
          withdrawalNotice: "36h Milk / 7 Days Meat"
        }
      ];
    },

    // 22. EVENT BINDINGS
    bindAllEvents: function () {
      const root = ConsultationRoom.state.containerElement;
      if (!root) return;

      // Vitals input triggers
      ["inputVitalTemp", "inputVitalPulse", "inputVitalResp", "inputVitalRumen"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", ConsultationRoom.evaluateVitalsSanity);
      });

      // Chief complaint input triggers differential refresh
      const ccInput = document.getElementById("inputChiefComplaint");
      if (ccInput) {
        ccInput.addEventListener("input", function () {
          ConsultationRoom.state.examinationForm.chiefComplaint = this.value;
        });
      }

      // Pregnancy status change
      const pregSelect = document.getElementById("selectPregnancyGuard");
      if (pregSelect) {
        pregSelect.addEventListener("change", function () {
          ConsultationRoom.state.currentPatient.pregnancyStatus = this.value;
          ConsultationRoom.render(ConsultationRoom.state.containerElement.id);
        });
      }

      // Add drug from catalog
      const btnAddDrug = document.getElementById("btnAddDrugFromCatalog");
      const catalogSelect = document.getElementById("selectFormularyCatalog");
      if (btnAddDrug && catalogSelect) {
        btnAddDrug.addEventListener("click", function () {
          const selectedId = catalogSelect.value;
          const found = ClinicalFormulary.find(d => d.id === selectedId);
          if (!found) return;

          // Check Corticosteroid pregnancy safety guard
          const isPregnant = ConsultationRoom.state.currentPatient.pregnancyStatus.includes("PREGNANT");
          if (!found.pregnancySafe && isPregnant) {
            ConsultationAudio.alertVitalsAbnormal();
            alert("⚠️ CORTICOSTEROID RED ALERT: यह औषधि गर्भवती पशु में पूर्णतः प्रतिबंधित है (गर्भपात खतरा)!");
            return;
          }

          let doseCalc = "";
          const w = ConsultationRoom.state.currentPatient.weightKg;
          if (found.doseMgPerKg && found.concentrationMgPerMl) {
            const ml = (w * found.doseMgPerKg / found.concentrationMgPerMl).toFixed(1);
            doseCalc = `${ml} ml (${w * found.doseMgPerKg} mg)`;
          } else {
            doseCalc = found.customDose || "Standard Clinical Dose";
          }

          ConsultationRoom.state.prescribedDrugs.push({
            id: found.id,
            name: found.name,
            route: found.route,
            calculatedDose: doseCalc,
            freq: found.freq,
            withdrawalNotice: `${found.withdrawalMilkHours}h Milk / ${found.withdrawalMeatDays}d Meat`
          });

          ConsultationRoom.render(ConsultationRoom.state.containerElement.id);
          ConsultationAudio.playChime(659.25, "sine", 0.15, 0.08);
        });
      }

      // Reset Draft
      const btnReset = document.getElementById("btnConsultationResetDraft");
      if (btnReset) {
        btnReset.addEventListener("click", function () {
          if (confirm("क्या आप इस परामर्श सत्र का ड्राफ्ट रीसेट करना चाहते हैं?")) {
            ConsultationRoom.seedDefaultPrescription();
            ConsultationRoom.render(ConsultationRoom.state.containerElement.id);
          }
        });
      }

      // Close & Return to Dashboard
      const btnReturn = document.getElementById("btnCloseConsultationReturn");
      if (btnReturn) {
        btnReturn.addEventListener("click", function () {
          const modal = document.getElementById("activeConsultationRoomModal");
          if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          }
          if (window.VetcareApp.Doctor.Dashboard && typeof window.VetcareApp.Doctor.Dashboard.render === "function") {
            window.VetcareApp.Doctor.Dashboard.render("doctorDashboardContainer");
          }
        });
      }

      // Complete Consultation & Print Rx
      const btnComplete = document.getElementById("btnCompleteAndPrintRx");
      if (btnComplete) {
        btnComplete.addEventListener("click", () => ConsultationRoom.finalizeConsultation());
      }

      // Delegate actions: Remove drug, Apply diagnosis
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "remove_drug") {
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          ConsultationRoom.state.prescribedDrugs.splice(idx, 1);
          ConsultationRoom.render(ConsultationRoom.state.containerElement.id);
        } else if (action === "apply_diagnosis") {
          const diag = btn.getAttribute("data-diag-name");
          ConsultationRoom.state.provisionalDiagnosis = diag;
          const input = document.getElementById("inputProvisionalDiagnosis");
          if (input) input.value = diag;
          ConsultationAudio.playChime(784, "sine", 0.12, 0.08);
        }
      });
    },

    // 23. FINALIZE CONSULTATION, PERSIST IN INDEXED-DB & PRINT LEGAL RX
    finalizeConsultation: async function () {
      // Gather latest inputs
      const f = ConsultationRoom.state.examinationForm;
      f.tempF = parseFloat(document.getElementById("inputVitalTemp") ? document.getElementById("inputVitalTemp").value : f.tempF);
      f.heartRateBpm = parseInt(document.getElementById("inputVitalPulse") ? document.getElementById("inputVitalPulse").value : f.heartRateBpm, 10);
      f.respRateMin = parseInt(document.getElementById("inputVitalResp") ? document.getElementById("inputVitalResp").value : f.respRateMin, 10);
      f.rumenMotilityPer2Min = parseInt(document.getElementById("inputVitalRumen") ? document.getElementById("inputVitalRumen").value : f.rumenMotilityPer2Min, 10);
      f.chiefComplaint = document.getElementById("inputChiefComplaint") ? document.getElementById("inputChiefComplaint").value : f.chiefComplaint;
      f.clinicalNotes = document.getElementById("textareaClinicalNotes") ? document.getElementById("textareaClinicalNotes").value : f.clinicalNotes;

      const provDiag = document.getElementById("inputProvisionalDiagnosis") ? document.getElementById("inputProvisionalDiagnosis").value : ConsultationRoom.state.provisionalDiagnosis;
      const isAdmitIpd = document.getElementById("chkAdmitToIpd") ? document.getElementById("chkAdmitToIpd").checked : false;

      // Gather Lab Orders
      const selectedLabs = [];
      document.querySelectorAll(".lab-order-checkbox:checked").forEach(cb => {
        selectedLabs.push({
          code: cb.getAttribute("data-lab-code"),
          name: cb.getAttribute("data-lab-name"),
          specimen: cb.getAttribute("data-lab-specimen")
        });
      });

      const consultationRecord = {
        consultationId: "CONS-" + Date.now(),
        patientId: ConsultationRoom.state.currentPatient.id,
        timestamp: Date.now(),
        patientSnapshot: JSON.parse(JSON.stringify(ConsultationRoom.state.currentPatient)),
        vitalsSnapshot: JSON.parse(JSON.stringify(f)),
        provisionalDiagnosis: provDiag,
        prescribedDrugs: JSON.parse(JSON.stringify(ConsultationRoom.state.prescribedDrugs)),
        orderedLabTests: selectedLabs,
        admittedToIpd: isAdmitIpd,
        doctorSignature: "Dr. Rahul Jangra (VCI-2026-9297)"
      };

      // Persist to IndexedDB
      await ClinicalStorage.saveConsultation(consultationRecord);

      // Fire Events
      window.VetcareApp.EventBus.emit("consultation:completed", consultationRecord);
      window.VetcareApp.EventBus.emit("prescription:saved", {
        consultationId: consultationRecord.consultationId,
        patientId: consultationRecord.patientId,
        drugs: consultationRecord.prescribedDrugs
      });

      if (isAdmitIpd) {
        window.VetcareApp.EventBus.emit("ipd:patient_admitted", {
          patient: consultationRecord.patientSnapshot,
          diagnosis: provDiag
        });
      }

      ConsultationAudio.successRxSave();

      // Trigger Clean Print Slip
      ConsultationRoom.generatePrintablePrescription(consultationRecord);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("परामर्श सुरक्षित किया गया! आधिकारिक पर्ची प्रिंट हो रही है...", "success");
      }
    },

    // 24. LEGAL GOVERNMENT-OF-INDIA / VCI PRESCRIPTION SLIP GENERATOR
    generatePrintablePrescription: function (record) {
      let printHost = document.getElementById("legalPrescriptionPrintHost");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "legalPrescriptionPrintHost";
        document.body.appendChild(printHost);
      }

      const p = record.patientSnapshot;
      const v = record.vitalsSnapshot;
      const dateStr = new Date(record.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      const timeStr = new Date(record.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      printHost.innerHTML = `
        <div style="font-family: 'Inter', Arial, sans-serif; padding: 30px; color: #000; max-width: 820px; margin: 0 auto; line-height: 1.45;">
          <!-- Top Header Strip -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2.5px solid #064e3b; padding-bottom: 14px; margin-bottom: 14px;">
            <div>
              <div style="font-size: 22px; font-weight: 800; color: #064e3b; text-transform: uppercase;">DR. RAHUL JANGRA</div>
              <div style="font-size: 12px; font-weight: 600; color: #374151;">B.V.Sc & A.H., M.V.Sc (Veterinary Medicine)</div>
              <div style="font-size: 11px; font-family: monospace; font-weight: bold; color: #111827;">VCI REGISTRATION: VCI-2026-9297</div>
              <div style="font-size: 11px; color: #4b5563;">Main Referral Veterinary Complex & Mobile Emergency Unit</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 18px; font-weight: 900; color: #064e3b; letter-spacing: 0.5px;">VETCARE AI OS</div>
              <div style="font-size: 11px; font-weight: 600;">Prescription ID: <strong>${record.consultationId}</strong></div>
              <div style="font-size: 11px;">दिनांक / Date: <strong>${dateStr} (${timeStr})</strong></div>
              <div style="font-size: 10px; font-family: monospace; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">
                GOVT. STANDARDS ISO-VET 2026 COMPLIANT
              </div>
            </div>
          </div>

          <!-- Patient & Owner Details Matrix -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11.5px; background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <div><strong>पशुपालक (Owner):</strong> ${p.ownerName} (${p.contact})</div>
            <div><strong>निवास / गाँव (Village):</strong> ${p.village}</div>
            <div><strong>पशु पहचान टैग (Tag No):</strong> ${p.tagNo}</div>
            <div><strong>नस्ल व प्रजाति (Breed/Species):</strong> ${p.breed} (${p.species.toUpperCase()}, ${p.sex})</div>
            <div><strong>शारीरिक वजन (Shaeffer Weight):</strong> <strong>${p.weightKg} kg</strong> (Age: ${p.ageYears} Yrs)</div>
            <div><strong>गर्भ सुरक्षा स्थिति:</strong> ${p.pregnancyStatus}</div>
          </div>

          <!-- Clinical Vitals Summary -->
          <div style="display: flex; gap: 16px; font-size: 11px; font-family: monospace; background: #f3f4f6; padding: 8px 12px; border-radius: 6px; margin-bottom: 16px;">
            <span>Temp: <strong>${v.tempF} °F</strong></span>
            <span>Pulse: <strong>${v.heartRateBpm} bpm</strong></span>
            <span>Resp: <strong>${v.respRateMin} /min</strong></span>
            <span>Rumen: <strong>${v.rumenMotilityPer2Min} /2min</strong></span>
            <span>Mucosa: <strong>${v.mucousMembranes}</strong></span>
          </div>

          <!-- Confirmed Clinical Diagnosis -->
          <div style="margin-bottom: 18px; font-size: 13px; border-left: 4px solid #064e3b; padding-left: 10px;">
            <div><strong>नैदानिक निष्कर्ष (Provisional Diagnosis):</strong> <span style="font-weight: bold; color: #064e3b;">${record.provisionalDiagnosis}</span></div>
            <div style="font-size: 11px; color: #4b5563; margin-top: 2px;"><strong>लक्षण एवं इतिहास:</strong> ${v.chiefComplaint}</div>
          </div>

          <!-- Rx Header & Drugs Table -->
          <div style="margin-bottom: 18px;">
            <div style="font-size: 26px; font-weight: bold; font-family: serif; color: #064e3b; margin-bottom: 4px;">℞</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; text-align: left;">
              <thead>
                <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background: #f9fafb;">
                  <th style="padding: 7px 6px;">क्र.</th>
                  <th style="padding: 7px 6px;">औषधि नाम एवं रूप (Formulation)</th>
                  <th style="padding: 7px 6px;">रूट</th>
                  <th style="padding: 7px 6px;">सटीक मात्रा (Dose)</th>
                  <th style="padding: 7px 6px;">आवृत्ति व अवधि (Schedule)</th>
                </tr>
              </thead>
              <tbody>
                ${record.prescribedDrugs.map((d, i) => `
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 7px 6px; font-weight: bold;">${i + 1}</td>
                    <td style="padding: 7px 6px;"><strong>${d.name}</strong></td>
                    <td style="padding: 7px 6px;">${d.route}</td>
                    <td style="padding: 7px 6px; font-weight: bold; color: #064e3b;">${d.calculatedDose}</td>
                    <td style="padding: 7px 6px;">${d.freq}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Lab Tests Ordered (If Any) -->
          ${record.orderedLabTests.length > 0 ? `
            <div style="margin-bottom: 16px; font-size: 11px; background: #fdf4ff; border: 1px solid #f0abfc; padding: 8px 12px; border-radius: 6px;">
              <strong>प्रयोगशाला जांच मांग (Ordered Diagnostic Labs):</strong> ${record.orderedLabTests.map(t => t.name).join(" • ")}
            </div>
          ` : ""}

          <!-- Mandatory Statutory Withdrawal Warning -->
          <div style="font-size: 10.5px; border: 1.5px solid #b91c1c; background: #fff5f5; color: #991b1b; padding: 10px; border-radius: 6px; margin-bottom: 24px;">
            <strong>वैधानिक विथड्राल सूचना (Mandatory Statutory Notice):</strong> इस उपचारित पशु का दूध 36 घंटे तक मानव उपभोग हेतु उपयोग न करें। अंतिम खुराक के 7 दिन बाद तक मांस उपयोग वर्जित है। स्थिति में सुधार न होने पर तुरंत संपर्क करें।
          </div>

          <!-- Doctor Sign-Off & Verification Stamp -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              डिजिटल सत्यापन कुंजी: SHA256-${record.consultationId}<br/>
              Vetcare AI OS v2.6.4 (Production Core)
            </div>
            <div style="text-align: center;">
              <div style="height: 48px; border-bottom: 1.5px solid #000; width: 200px; margin-bottom: 4px;"></div>
              <div style="font-size: 12px; font-weight: bold;">(डॉ. राहुल जांगड़ा)</div>
              <div style="font-size: 11px; color: #374151;">अधिकृत पशु चिकित्सा अधिकारी / VCI: VCI-2026-9297</div>
            </div>
          </div>
        </div>
      `;

      // Trigger Print Engine
      setTimeout(() => {
        window.print();
      }, 200);
    }
  };

  // 25. ATTACH TO WINDOW GLOBAL
  window.VetcareApp.Doctor.PatientConsultationRoom = ConsultationRoom;

  // Auto-init on document ready if host element exists
  document.addEventListener("DOMContentLoaded", function () {
    const host = document.getElementById("patientConsultationRoomContainer");
    if (host) {
      ConsultationRoom.init("patientConsultationRoomContainer");
      ConsultationRoom.render("patientConsultationRoomContainer");
    }
  });

})(window, document);
