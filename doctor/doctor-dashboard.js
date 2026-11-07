// Vetcare AI OS - Doctor Master Clinical Workspace, OPD Queue & Clinical KPIs Dashboard (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE & SAFETY REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Doctor = window.VetcareApp.Doctor || {};
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

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CLINICAL CHIMES & EMERGENCY SIRENS)
  const ClinicalAudio = {
    playTone: function (frequency, type, duration, volume) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(frequency || 440, ctx.currentTime);
        gain.gain.setValueAtTime(volume || 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.2));
      } catch (err) {
        // Fallback or policy silent
      }
    },
    chimeSuccess: function () {
      ClinicalAudio.playTone(523.25, "sine", 0.15, 0.08);
      setTimeout(() => ClinicalAudio.playTone(659.25, "sine", 0.2, 0.08), 100);
    },
    chimeEmergency: function () {
      ClinicalAudio.playTone(880, "sawtooth", 0.2, 0.15);
      setTimeout(() => ClinicalAudio.playTone(440, "sawtooth", 0.25, 0.18), 160);
      setTimeout(() => ClinicalAudio.playTone(987.77, "sawtooth", 0.3, 0.2), 340);
    },
    chimeCallNext: function () {
      ClinicalAudio.playTone(587.33, "triangle", 0.2, 0.12);
      setTimeout(() => ClinicalAudio.playTone(880, "triangle", 0.3, 0.12), 150);
    }
  };

  // 3. PERSISTENCE ENGINE (INDEXED-DB WITH LOCALSTORAGE REDUNDANCY)
  const StorageEngine = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    STORE_NAME: "doctor_dashboard_state",
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable in this browser environment"));
          return;
        }
        const req = window.indexedDB.open(StorageEngine.DB_NAME, StorageEngine.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(StorageEngine.STORE_NAME)) {
            db.createObjectStore(StorageEngine.STORE_NAME, { keyPath: "key" });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveState: async function (stateObject) {
      try {
        const db = await StorageEngine.getDb();
        const tx = db.transaction(StorageEngine.STORE_NAME, "readwrite");
        const store = tx.objectStore(StorageEngine.STORE_NAME);
        store.put({ key: "active_doctor_session", payload: stateObject, updatedAt: Date.now() });
      } catch (err) {
        // Transparent LocalStorage Failover
        try {
          localStorage.setItem("VETCARE_DOC_DASHBOARD_CACHE", JSON.stringify(stateObject));
        } catch (e) {
          console.warn("[Vetcare DB Warn] LocalStorage quota exceeded or disabled", e);
        }
      }
    },
    loadState: async function () {
      try {
        const db = await StorageEngine.getDb();
        return new Promise(resolve => {
          const tx = db.transaction(StorageEngine.STORE_NAME, "readonly");
          const store = tx.objectStore(StorageEngine.STORE_NAME);
          const req = store.get("active_doctor_session");
          req.onsuccess = function () {
            if (req.result && req.result.payload) {
              resolve(req.result.payload);
            } else {
              resolve(StorageEngine.loadFallback());
            }
          };
          req.onerror = function () { resolve(StorageEngine.loadFallback()); };
        });
      } catch (err) {
        return StorageEngine.loadFallback();
      }
    },
    loadFallback: function () {
      try {
        const cached = localStorage.getItem("VETCARE_DOC_DASHBOARD_CACHE");
        return cached ? JSON.parse(cached) : null;
      } catch (e) {
        return null;
      }
    }
  };

  // 4. MAIN DASHBOARD MODULE IMPLEMENTATION
  const Dashboard = {
    // --- Reactive Internal State ---
    state: {
      doctorProfile: {
        doctorId: "DOC-9297",
        name: "Dr. Rahul Jangra",
        qualification: "B.V.Sc & A.H., M.V.Sc (Medicine)",
        regNo: "VCI-2026-9297",
        currentDutyStation: "Veterinary Clinical Complex & Mobile Unit 01",
        onDutyStatus: "AVAILABLE" // AVAILABLE | IN_CONSULTATION | IN_SURGERY | ON_EMERGENCY_CALL
      },
      todaysQueue: [
        {
          tokenNo: 101,
          patientId: "PAT-BOV-8841",
          tagNo: "IN-HR-2024-8841",
          species: "bovine",
          breed: "Murrah Buffalo",
          gender: "Female",
          age: "5.5 Yrs",
          weightKg: 520,
          ownerName: "Sukhbir Singh (Dhansu Village)",
          chiefComplaint: "Acute Tympany, Left Paralumbar Fossa Severe Distension & Labored Grunting",
          priority: "EMERGENCY_RED",
          checkInTimestamp: Date.now() - 14 * 60 * 1000,
          waitTimeMins: 14,
          vitalSigns: { tempF: 101.4, pulseBpm: 88, respRate: 38 }
        },
        {
          tokenNo: 102,
          patientId: "PAT-BOV-1102",
          tagNo: "IN-PB-2023-1102",
          species: "bovine",
          breed: "Sahiwal Cow",
          gender: "Female",
          age: "4.0 Yrs",
          weightKg: 410,
          ownerName: "Harpal Singh (Kalanwali)",
          chiefComplaint: "S-Shaped Neck Posture, Recumbent (Downer Cow), Parturition 24h Ago (Hypocalcemia)",
          priority: "EMERGENCY_RED",
          checkInTimestamp: Date.now() - 22 * 60 * 1000,
          waitTimeMins: 22,
          vitalSigns: { tempF: 98.2, pulseBpm: 92, respRate: 24 }
        },
        {
          tokenNo: 103,
          patientId: "PAT-CAN-0921",
          tagNo: "CAN-0921-HR",
          species: "canine",
          breed: "German Shepherd Dog",
          gender: "Male",
          age: "7 Months",
          weightKg: 19.5,
          ownerName: "Amit Sharma (Model Town)",
          chiefComplaint: "Hemorrhagic Malodorous Diarrhea, Persistent Emesis & Lethargy (Parvoviral Susp.)",
          priority: "URGENT_ORANGE",
          checkInTimestamp: Date.now() - 35 * 60 * 1000,
          waitTimeMins: 35,
          vitalSigns: { tempF: 103.8, pulseBpm: 140, respRate: 42 }
        },
        {
          tokenNo: 104,
          patientId: "PAT-BOV-4409",
          tagNo: "IN-HR-2025-4409",
          species: "bovine",
          breed: "Crossbred HF",
          gender: "Female",
          age: "6.0 Yrs",
          weightKg: 480,
          ownerName: "Rajender Kumar (Ladwa)",
          chiefComplaint: "Right Forequarter Swelling, Hardness, Yellow Curdy Milk Flakes (Acute Clinical Mastitis)",
          priority: "URGENT_ORANGE",
          checkInTimestamp: Date.now() - 48 * 60 * 1000,
          waitTimeMins: 48,
          vitalSigns: { tempF: 103.2, pulseBpm: 76, respRate: 28 }
        },
        {
          tokenNo: 105,
          patientId: "PAT-CAP-4412",
          tagNo: "CAP-4412-ROH",
          species: "caprine",
          breed: "Sirohi Doe",
          gender: "Female",
          age: "2.0 Yrs",
          weightKg: 38,
          ownerName: "Devender Yadav (Bhiwani)",
          chiefComplaint: "Submandibular Bottle Jaw Edema, Pale Conjunctiva, Haemonchosis Suspicion",
          priority: "ROUTINE_GREEN",
          checkInTimestamp: Date.now() - 65 * 60 * 1000,
          waitTimeMins: 65,
          vitalSigns: { tempF: 102.6, pulseBpm: 84, respRate: 22 }
        },
        {
          tokenNo: 106,
          patientId: "PAT-EQU-7711",
          tagNo: "EQU-7711-HIS",
          species: "equine",
          breed: "Marwari Mare",
          gender: "Female",
          age: "8.0 Yrs",
          weightKg: 440,
          ownerName: "Col. Vikram Rathore (R.O. Farms)",
          chiefComplaint: "Quidding, Dropping Feed Balls, Bilateral Nasal Feed Specks (Molar Points / Dental Exam)",
          priority: "ROUTINE_GREEN",
          checkInTimestamp: Date.now() - 72 * 60 * 1000,
          waitTimeMins: 72,
          vitalSigns: { tempF: 100.1, pulseBpm: 40, respRate: 14 }
        }
      ],
      admittedIpdCases: [
        {
          ipdId: "IPD-2026-004",
          bedNo: "WARD-A-BAY-1",
          tagNo: "IN-HR-2024-8841",
          species: "Bovine (Murrah)",
          ownerName: "Sukhbir Singh",
          diagnosis: "Emergency C-Section (Uterine Torsion 360° Degrotational Realignment)",
          admissionDate: "2026-03-29",
          condition: "CRITICAL",
          tempF: "101.8 °F",
          pulseBpm: "78 bpm",
          ivFluids: "DNS 4L + Ringers Lactate 2L ongoing",
          lastRoundTime: "11:30 AM"
        },
        {
          ipdId: "IPD-2026-007",
          bedNo: "ICU-CAN-03",
          tagNo: "CAN-0419-GUR",
          species: "Canine (Labrador)",
          ownerName: "Deepak Mehra",
          diagnosis: "Post-Gastric Dilation Volvulus (GDV) Gastropexy Post-Op Day 1",
          admissionDate: "2026-03-30",
          condition: "STABLE",
          tempF: "102.1 °F",
          pulseBpm: "110 bpm",
          ivFluids: "PlasmaLyte-A + Fentanyl CRI",
          lastRoundTime: "12:15 PM"
        },
        {
          ipdId: "IPD-2026-009",
          bedNo: "WARD-E-EQUINE",
          tagNo: "EQU-9011-FAR",
          species: "Equine (Thoroughbred)",
          ownerName: "Ranjit Dhillon",
          diagnosis: "Spasmodic Cecal Impaction Colic under Continuous Enteral Hydration",
          admissionDate: "2026-03-30",
          condition: "OBSERVATION",
          tempF: "100.4 °F",
          pulseBpm: "44 bpm",
          ivFluids: "Isotonic Enteral Saline via Nasogastric Tube",
          lastRoundTime: "01:00 PM"
        }
      ],
      pendingLabReports: [
        {
          reportId: "LAB-2026-9041",
          tokenNo: 97,
          patientId: "PAT-BOV-7712",
          testType: "Automated CBC + Blood Smear Examination",
          specimen: "EDTA Whole Blood",
          sampleTime: "09:45 AM",
          status: "CRITICAL_VALUES",
          flaggedFindings: "Intraerythrocytic Babesia bigemina piriform bodies detected (++). PCV 14.8% (Severe Anemia), Platelets 62,000/μL."
        },
        {
          reportId: "LAB-2026-9042",
          tokenNo: 99,
          patientId: "PAT-BOV-4409",
          testType: "Quarter Milk Culture & Rapid Antimicrobial Sensitivity (AST)",
          specimen: "Mastitic Secretion (Right Fore)",
          sampleTime: "10:15 AM",
          status: "PENDING_REVIEW",
          flaggedFindings: "Staphylococcus aureus pure isolate. Sensitive to Ceftiofur & Enrofloxacin. Resistant to Ampicillin."
        },
        {
          reportId: "LAB-2026-9044",
          tokenNo: 100,
          patientId: "PAT-CAN-0881",
          testType: "Serum Biochemistry Panel (Renal + Hepatic)",
          specimen: "Plain Serum",
          sampleTime: "11:00 AM",
          status: "PENDING_REVIEW",
          flaggedFindings: "BUN: 64 mg/dL (Elevated), Serum Creatinine: 2.9 mg/dL (Grade II IRIS AKI/CKD)."
        }
      ],
      statutoryAlerts: [
        {
          alertId: "EPI-2026-LSD-04",
          pathogen: "Lumpy Skin Disease Virus (LSDV Capripox)",
          clusterRegion: "Rohtak-Jhajjar-Hisar Triangle (Within 18 KM of Clinic)",
          severity: "HIGH_CONTAGION_RISK",
          mandatoryProtocol: "Ring Goat-Pox Vaccination (Heterologous Booster), Vector Control & Immediate Milk Quarantine for Vesicular Ulcerations."
        },
        {
          alertId: "EPI-2026-FMD-01",
          pathogen: "Foot & Mouth Disease (FMD Type-O Aphthovirus)",
          clusterRegion: "Neighboring District Boundary Checkpost #4",
          severity: "BORDER_SURVEILLANCE",
          mandatoryProtocol: "Inspect Inter-State Livestock Transports, Foot Dip Disinfection at Hospital Gate."
        }
      ],
      recentConsultations: [
        {
          caseNo: "OPD-2026-8818",
          tokenNo: 96,
          species: "Bovine (Murrah)",
          ownerName: "Pawan Beniwal",
          diagnosis: "Acute Ephemeral Fever (Three-Day Sickness)",
          treatmentSummary: "Flunixin Meglumine 2.2mg/kg IV, Calcium Borogluconate 250ml SC, Supportive B-Complex",
          rxCode: "RX-8818-B",
          timestamp: "12:45 PM"
        },
        {
          caseNo: "OPD-2026-8817",
          tokenNo: 95,
          species: "Canine (Beagle)",
          ownerName: "Kavita Singhal",
          diagnosis: "Allergic Dermatitis & Secondary Malassezia Otitis Externa",
          treatmentSummary: "Oclacitinib (Apoquel) 0.5mg/kg PO, Posatex Otic Drops BID, Chlorhexidine Shampoo",
          rxCode: "RX-8817-C",
          timestamp: "12:10 PM"
        },
        {
          caseNo: "OPD-2026-8816",
          tokenNo: 94,
          species: "Caprine (Beetal)",
          ownerName: "Sanjay Kumar",
          diagnosis: "Sub-Acute Ruminal Acidosis (Grain Overload)",
          treatmentSummary: "Sodium Bicarbonate 5% IV, Activated Charcoal Drench 2g/kg, Rumen Toruf Rumen Buffers",
          rxCode: "RX-8816-G",
          timestamp: "11:40 AM"
        }
      ],
      quickStats: {
        opdSeenToday: 18,
        surgeriesScheduled: 2,
        criticalAlerts: 2,
        teleconsultsCompleted: 5
      },
      activeTab: "overview", // overview | live_opd_queue | ipd_summary | statutory_alerts
      queueFilter: "ALL", // ALL | EMERGENCY | URGENT | ROUTINE
      currentActiveExamPatient: null,
      domContainer: null,
      clockInterval: null,
      waitTimerInterval: null
    },

    // 5. LIFECYCLE METHOD: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Doctor Dashboard Subsystem v2.6.4-PROD...");
      const targetId = containerId || "doctorDashboardContainer";

      // Hydrate state from persistence
      const cached = await StorageEngine.loadState();
      if (cached && cached.doctorProfile) {
        Dashboard.state.doctorProfile = Object.assign(Dashboard.state.doctorProfile, cached.doctorProfile);
        if (cached.quickStats) Dashboard.state.quickStats = Object.assign(Dashboard.state.quickStats, cached.quickStats);
        if (cached.activeTab) Dashboard.state.activeTab = cached.activeTab;
      }

      Dashboard.injectStyles();
      Dashboard.registerEventListeners();
      Dashboard.render(targetId);
      Dashboard.startTimers();

      // Broadcast ready state
      window.VetcareApp.EventBus.emit("doctor:dashboard_ready", {
        doctorId: Dashboard.state.doctorProfile.doctorId,
        timestamp: Date.now()
      });

      return Dashboard;
    },

    // 6. LIFECYCLE METHOD: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        // Create dedicated host wrapper if missing
        container = document.createElement("div");
        container.id = containerId;
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = ""; // Clean view attachment
        mainHost.appendChild(container);
      }
      Dashboard.state.domContainer = container;

      // Construct Complete Workstation HTML
      container.innerHTML = `
        <div id="vetcareDocWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${Dashboard.renderHeaderBanner()}
          ${Dashboard.renderKpiGrid()}
          ${Dashboard.renderNavigationTabs()}
          <div id="docTabContentContainer" class="transition-all duration-200">
            ${Dashboard.renderActiveTabContent()}
          </div>
        </div>
        <!-- Active Examination Clinical Floating Sheet / Modal Hook -->
        <div id="activeConsultationRoomModal" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md hidden items-center justify-center p-2 sm:p-4"></div>
        <!-- Clinical Action Dialog Portal -->
        <div id="clinicalActionDialogPortal" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md hidden items-center justify-center p-3"></div>
      `;

      Dashboard.bindDomActions();
    },

    // 7. LIFECYCLE METHOD: DESTROY
    destroy: function () {
      if (Dashboard.state.clockInterval) clearInterval(Dashboard.state.clockInterval);
      if (Dashboard.state.waitTimerInterval) clearInterval(Dashboard.state.waitTimerInterval);
      window.VetcareApp.EventBus.off("queue:patient_checked_in", Dashboard.handlePatientCheckedIn);
      window.VetcareApp.EventBus.off("lab:report_saved", Dashboard.handleLabReportSaved);
      window.VetcareApp.EventBus.off("outbreak:alert_declared", Dashboard.handleOutbreakDeclared);
      if (Dashboard.state.domContainer) {
        Dashboard.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Doctor Dashboard destroyed cleanly.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-doctor-dashboard-styles")) return;
      const styleEl = document.createElement("style");
      styleEl.id = "vetcare-doctor-dashboard-styles";
      styleEl.textContent = `
        .badge-pulse { animation: badgeGlow 1.8s infinite; }
        @keyframes badgeGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.04); }
        }
        .emergency-row-glow {
          border-left: 5px solid #f43f5e !important;
          background: linear-gradient(90deg, rgba(244,63,94,0.08) 0%, rgba(17,24,39,0.95) 100%);
        }
        .urgent-row-glow {
          border-left: 5px solid #f59e0b !important;
          background: linear-gradient(90deg, rgba(245,158,11,0.06) 0%, rgba(17,24,39,0.95) 100%);
        }
        .routine-row-glow {
          border-left: 5px solid #10b981 !important;
          background: linear-gradient(90deg, rgba(16,185,129,0.04) 0%, rgba(17,24,39,0.95) 100%);
        }
        .queue-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .queue-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 9999px; }
        .queue-scroll::-webkit-scrollbar-thumb:hover { background: #10b981; }
        @media print {
          body * { visibility: hidden; }
          #printablePrescriptionSlip, #printablePrescriptionSlip * { visibility: visible; }
          #printablePrescriptionSlip { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; }
        }
      `;
      document.head.appendChild(styleEl);
    },

    // 9. HEADER BANNER COMPONENT
    renderHeaderBanner: function () {
      const prof = Dashboard.state.doctorProfile;
      const statusMap = {
        AVAILABLE: { label: "क्लिनिक में उपलब्ध (Available)", bg: "bg-emerald-500/20", border: "border-emerald-500", text: "text-emerald-400", dot: "bg-emerald-400" },
        IN_CONSULTATION: { label: "परीक्षण कक्ष में व्यस्त (Consulting)", bg: "bg-cyan-500/20", border: "border-cyan-500", text: "text-cyan-400", dot: "bg-cyan-400" },
        IN_SURGERY: { label: "शल्य चिकित्सा कक्ष (In Surgery)", bg: "bg-purple-500/20", border: "border-purple-500", text: "text-purple-400", dot: "bg-purple-400" },
        ON_EMERGENCY_CALL: { label: "आपातकालीन ऑन-कॉल (Emergency)", bg: "bg-rose-500/20", border: "border-rose-500", text: "text-rose-400", dot: "bg-rose-400" }
      };
      const curStatus = statusMap[prof.onDutyStatus] || statusMap.AVAILABLE;

      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <!-- Doctor Details -->
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-emerald-950/50">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <div class="flex items-center gap-2.5 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">${prof.name}</h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <i class="fa-solid fa-certificate mr-1"></i>${prof.regNo}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    ${prof.doctorId}
                  </span>
                </div>
                <div class="text-xs font-mono text-emerald-400 font-medium mt-0.5">${prof.qualification}</div>
                <div class="text-xs text-slate-400 flex items-center gap-2 mt-1 sunlight-muted">
                  <i class="fa-solid fa-hospital text-slate-500 text-[11px]"></i>
                  <span>${prof.currentDutyStation}</span>
                </div>
              </div>
            </div>

            <!-- Status Selector Pill & Real-Time IST Clock -->
            <div class="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
              <!-- Live Duty Status Toggle Pill -->
              <div class="relative">
                <select id="doctorDutyStatusSelect" class="appearance-none cursor-pointer pl-8 pr-8 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border ${curStatus.bg} ${curStatus.border} ${curStatus.text} focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md">
                  <option value="AVAILABLE" ${prof.onDutyStatus === "AVAILABLE" ? "selected" : ""}>🟢 AVAILABLE</option>
                  <option value="IN_CONSULTATION" ${prof.onDutyStatus === "IN_CONSULTATION" ? "selected" : ""}>🔵 CONSULTING</option>
                  <option value="IN_SURGERY" ${prof.onDutyStatus === "IN_SURGERY" ? "selected" : ""}>🟣 IN SURGERY</option>
                  <option value="ON_EMERGENCY_CALL" ${prof.onDutyStatus === "ON_EMERGENCY_CALL" ? "selected" : ""}>🔴 EMERGENCY CALL</option>
                </select>
                <div class="pointer-events-none absolute left-3 top-3">
                  <span class="w-2.5 h-2.5 rounded-full ${curStatus.dot} inline-block pulse-beacon"></span>
                </div>
                <div class="pointer-events-none absolute right-2.5 top-2.5 text-slate-400">
                  <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </div>
              </div>

              <!-- System Real-time Clock -->
              <div class="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-right min-w-[140px]">
                <div id="liveClockDate" class="text-[10px] text-slate-400 uppercase tracking-widest leading-none">--/--/2026</div>
                <div id="liveClockTime" class="text-sm font-black text-amber-400 mt-1 leading-none tracking-widest">00:00:00 IST</div>
              </div>

              <!-- Call Next Patient Master Button -->
              <button id="btnCallNextMaster" type="button" class="py-2 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-950/40 flex items-center gap-2 active:scale-95 transition-all">
                <i class="fa-solid fa-bullhorn text-sm"></i>
                <span>अगला मरीज बुलाएं (Call Next)</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 10. KPI METRIC CARDS COMPONENT
    renderKpiGrid: function () {
      const q = Dashboard.state.todaysQueue;
      const emergencyCount = q.filter(p => p.priority === "EMERGENCY_RED").length;
      const ipdCount = Dashboard.state.admittedIpdCases.length;
      const labPending = Dashboard.state.pendingLabReports.length;
      const outbreakCount = Dashboard.state.statutoryAlerts.length;

      return `
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <!-- Card 1: Waiting Queue -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors shadow-lg relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">प्रतीक्षारत मरीज (OPD Queue)</span>
              <span class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <i class="fa-solid fa-users text-sm"></i>
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">${q.length}</span>
              <span class="text-[11px] font-mono text-slate-400">टोकन सक्रिय</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] font-bold ${emergencyCount > 0 ? "text-rose-400" : "text-emerald-400"}">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i>
              <span>${emergencyCount} अति-गंभीर (Emergency Red)</span>
            </div>
          </div>

          <!-- Card 2: IPD In-Patients -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors shadow-lg relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">भर्ती पशु (IPD Admitted)</span>
              <span class="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <i class="fa-solid fa-bed-pulse text-sm"></i>
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">${ipdCount}</span>
              <span class="text-[11px] font-mono text-slate-400">वार्ड में भर्ती</span>
            </div>
            <div class="mt-2 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
              <i class="fa-solid fa-stethoscope text-[10px]"></i>
              <span>दैनिक राउंड्स लंबित: 1 केस</span>
            </div>
          </div>

          <!-- Card 3: Pending Lab & Imaging Reports -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-colors shadow-lg relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">जांच रिपोर्ट समीक्षा (Lab Reports)</span>
              <span class="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <i class="fa-solid fa-microscope text-sm"></i>
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-amber-400">${labPending}</span>
              <span class="text-[11px] font-mono text-slate-400">रिपोर्ट्स अप्रूवल हेतु</span>
            </div>
            <div class="mt-2 text-[11px] font-bold text-amber-400 flex items-center gap-1">
              <i class="fa-solid fa-triangle-exclamation text-[10px]"></i>
              <span>1 क्रिटिकल पैथोलॉजी अलर्ट</span>
            </div>
          </div>

          <!-- Card 4: Statutory Outbreak Radar -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 transition-colors shadow-lg relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">क्षेत्रीय महामारी अलर्ट (Outbreak Radar)</span>
              <span class="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <i class="fa-solid fa-shield-virus text-sm"></i>
              </span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-rose-400 badge-pulse">${outbreakCount}</span>
              <span class="text-[11px] font-mono text-slate-400">सक्रिय क्लस्टर</span>
            </div>
            <div class="mt-2 text-[11px] font-extrabold text-rose-400 flex items-center gap-1">
              <i class="fa-solid fa-bullseye text-[10px]"></i>
              <span>LSD व FMD रिंग प्रोटोकॉल सक्रिय</span>
            </div>
          </div>
        </div>
      `;
    },

    // 11. NAVIGATION TABS BAR
    renderNavigationTabs: function () {
      const active = Dashboard.state.activeTab;
      const tabs = [
        { id: "overview", label: "कार्यक्षेत्र अवलोकन (Overview Console)", icon: "fa-chart-pie" },
        { id: "live_opd_queue", label: "लाइव ओपीडी कतार (Live Token Queue)", icon: "fa-list-ol", count: Dashboard.state.todaysQueue.length },
        { id: "ipd_summary", label: "आईपीडी वार्ड राउंड्स (IPD Rounds)", icon: "fa-hospital-user", count: Dashboard.state.admittedIpdCases.length },
        { id: "statutory_alerts", label: "महामारी व कानूनी अलर्ट (Statutory Alerts)", icon: "fa-biohazard", count: Dashboard.state.statutoryAlerts.length }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-tab-target="${t.id}" class="tab-switch-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-emerald-400 border-t-2 border-l border-r border-emerald-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.count !== undefined ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono ${active === t.id ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">${t.count}</span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 12. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (Dashboard.state.activeTab) {
        case "live_opd_queue":
          return Dashboard.renderLiveQueueTab();
        case "ipd_summary":
          return Dashboard.renderIpdSummaryTab();
        case "statutory_alerts":
          return Dashboard.renderStatutoryAlertsTab();
        case "overview":
        default:
          return Dashboard.renderSplitWorkstationOverview();
      }
    },

    // 13. OVERVIEW: SPLIT WORKSTATION CONSOLE
    renderSplitWorkstationOverview: function () {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left Column: Priority Live Patient Queue (7 Cols) -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-stream text-emerald-400"></i>
                <h2 class="font-display font-extrabold text-base text-white uppercase tracking-tight sunlight-text">त्वरित ओपीडी मरीज कतार (OPD Queue Stream)</h2>
              </div>
              <!-- Queue Filters -->
              <div class="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                <button type="button" data-filter-queue="ALL" class="queue-filter-btn px-2 py-0.5 rounded ${Dashboard.state.queueFilter === "ALL" ? "bg-emerald-500 text-slate-950 font-black" : "text-slate-400"}">सभी</button>
                <button type="button" data-filter-queue="EMERGENCY" class="queue-filter-btn px-2 py-0.5 rounded ${Dashboard.state.queueFilter === "EMERGENCY" ? "bg-rose-500 text-white font-black" : "text-slate-400"}">आपातकाल</button>
                <button type="button" data-filter-queue="URGENT" class="queue-filter-btn px-2 py-0.5 rounded ${Dashboard.state.queueFilter === "URGENT" ? "bg-amber-500 text-slate-950 font-black" : "text-slate-400"}">गंभीर</button>
              </div>
            </div>

            <!-- Queue Cards Stack -->
            <div class="space-y-3 max-h-[620px] overflow-y-auto pr-1 queue-scroll">
              ${Dashboard.renderQueueCards(true)}
            </div>
          </div>

          <!-- Right Column: Clinical Launchpad & Recent Cases (5 Cols) -->
          <div class="lg:col-span-5 space-y-5">
            <!-- 1-Click Fast Clinical Launchers -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl sunlight-card">
              <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h3 class="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 sunlight-text">
                  <i class="fa-solid fa-bolt text-amber-400"></i>
                  <span>फास्ट क्लीनिकल लॉन्चपैड (Quick Actions)</span>
                </h3>
                <span class="text-[10px] font-mono text-emerald-400">AI-ACCELERATED</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <button id="btnQuickRxSlip" type="button" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-left flex flex-col justify-between group transition-all">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-file-prescription"></i>
                  </div>
                  <div>
                    <div class="font-display font-bold text-xs text-white sunlight-text">नई पर्ची (New Rx)</div>
                    <div class="text-[10px] text-slate-400">प्रिस्क्रिप्शन जनरेटर</div>
                  </div>
                </button>

                <button id="btnOrderLabWork" type="button" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-left flex flex-col justify-between group transition-all">
                  <div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-vial-virus"></i>
                  </div>
                  <div>
                    <div class="font-display font-bold text-xs text-white sunlight-text">जांच मांग (Order CBC)</div>
                    <div class="text-[10px] text-slate-400">रक्त व दूध माइक्रोबायोलॉजी</div>
                  </div>
                </button>

                <button id="btnDrugDirectory" type="button" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-left flex flex-col justify-between group transition-all">
                  <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-capsules"></i>
                  </div>
                  <div>
                    <div class="font-display font-bold text-xs text-white sunlight-text">औषधि निर्देशिका</div>
                    <div class="text-[10px] text-slate-400">खुराक, गर्भ सुरक्षा व विथड्राल</div>
                  </div>
                </button>

                <button id="btnEmergencyGuideModal" type="button" class="p-3 rounded-xl bg-gradient-to-br from-rose-950/40 to-slate-800 hover:from-rose-900/60 border border-rose-800/40 text-left flex flex-col justify-between group transition-all">
                  <div class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm mb-2 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-kit-medical"></i>
                  </div>
                  <div>
                    <div class="font-display font-bold text-xs text-rose-300">आपातकालीन प्रोटोकॉल</div>
                    <div class="text-[10px] text-slate-400">ट्रोकार, सर्पदंश व टॉक्सिन</div>
                  </div>
                </button>
              </div>

              <!-- Manual Intake Dispatcher -->
              <button id="btnRegisterWalkinToken" type="button" class="w-full mt-3 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-colors">
                <i class="fa-solid fa-plus-circle text-emerald-400"></i>
                <span>नया वॉक-इन टोकन जारी करें (Issue Walk-In Token)</span>
              </button>
            </div>

            <!-- Pending Laboratory Review Mini-Stream -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl sunlight-card">
              <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h3 class="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 sunlight-text">
                  <i class="fa-solid fa-microscope text-cyan-400"></i>
                  <span>लंबित डायग्नोस्टिक समीक्षा (${Dashboard.state.pendingLabReports.length})</span>
                </h3>
              </div>
              <div class="space-y-2.5">
                ${Dashboard.state.pendingLabReports.map(lab => `
                  <div class="p-3 rounded-xl bg-slate-950/70 border ${lab.status === "CRITICAL_VALUES" ? "border-rose-500/50" : "border-slate-800"} flex items-start justify-between gap-3">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white sunlight-text">${lab.testType}</span>
                        ${lab.status === "CRITICAL_VALUES" ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40">CRITICAL</span>' : ""}
                      </div>
                      <div class="text-[10px] font-mono text-slate-400">पशु ID: ${lab.patientId} • सैंपल: ${lab.sampleTime}</div>
                      <div class="text-[11px] text-amber-300/90 font-mono leading-tight">${lab.flaggedFindings}</div>
                    </div>
                    <button type="button" data-action="review_lab" data-report-id="${lab.reportId}" class="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-extrabold whitespace-nowrap active:scale-95 transition-all">
                      समीक्षा व साइन
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Recent Consultation Activity Log -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl sunlight-card">
              <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h3 class="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 sunlight-text">
                  <i class="fa-solid fa-clock-rotate-left text-slate-400"></i>
                  <span>आज के संपन्न परामर्श (Recent Consultations)</span>
                </h3>
              </div>
              <div class="space-y-2.5">
                ${Dashboard.state.recentConsultations.map(rc => `
                  <div class="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between gap-2">
                    <div class="space-y-0.5">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-200 sunlight-text">${rc.ownerName}</span>
                        <span class="text-[10px] font-mono text-emerald-400">(${rc.species})</span>
                      </div>
                      <div class="text-[11px] text-slate-400 truncate max-w-xs">${rc.diagnosis}</div>
                      <div class="text-[9px] font-mono text-slate-400">${rc.caseNo} • समय: ${rc.timestamp}</div>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button type="button" title="प्रिंट डुप्लीकेट पर्ची" data-action="print_recent_rx" data-case="${rc.caseNo}" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">
                        <i class="fa-solid fa-print"></i>
                      </button>
                      <button type="button" title="केस दोहराएं" data-action="duplicate_rx" data-case="${rc.caseNo}" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs">
                        <i class="fa-solid fa-copy"></i>
                      </button>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // 14. COMPONENT: LIVE OPD QUEUE VIEW
    renderLiveQueueTab: function () {
      return `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sunlight-card">
            <div>
              <h2 class="font-display font-black text-lg text-white uppercase tracking-tight sunlight-text">लाइव ओपीडी टोकन प्रबंधन कक्ष</h2>
              <p class="text-xs text-slate-400 sunlight-muted">मरीजों को ट्राइएज प्राथमिकता (Emergency, Urgent, Routine) के अनुसार क्रमित किया गया है।</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="btnAddNewQueuePatient" type="button" class="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40">
                <i class="fa-solid fa-user-plus"></i>
                <span>नया टोकन जारी करें (Add Token)</span>
              </button>
            </div>
          </div>
          <div class="space-y-3">
            ${Dashboard.renderQueueCards(false)}
          </div>
        </div>
      `;
    },

    // 15. RENDER QUEUE CARDS (USED BY BOTH OVERVIEW & FULL TAB)
    renderQueueCards: function (isCompact) {
      const q = Dashboard.state.todaysQueue;
      const filter = Dashboard.state.queueFilter;
      const filtered = q.filter(item => {
        if (filter === "EMERGENCY") return item.priority === "EMERGENCY_RED";
        if (filter === "URGENT") return item.priority === "URGENT_ORANGE";
        if (filter === "ROUTINE") return item.priority === "ROUTINE_GREEN";
        return true;
      });

      if (filtered.length === 0) {
        return `
          <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <i class="fa-solid fa-clipboard-check text-3xl text-emerald-400"></i>
            <div class="font-display font-bold text-sm text-slate-300">इस श्रेणी में कोई मरीज प्रतीक्षारत नहीं है</div>
            <p class="text-xs text-slate-500">सभी पंजीकृत ओपीडी मरीजों की जांच पूरी हो चुकी है अथवा कतार खाली है।</p>
          </div>
        `;
      }

      return filtered.map(patient => {
        const priorityConfig = {
          EMERGENCY_RED: {
            badge: "रेड आपातकाल (EMERGENCY)",
            badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
            rowClass: "emergency-row-glow",
            pulse: true
          },
          URGENT_ORANGE: {
            badge: "गंभीर (URGENT)",
            badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
            rowClass: "urgent-row-glow",
            pulse: false
          },
          ROUTINE_GREEN: {
            badge: "सामान्य (ROUTINE)",
            badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
            rowClass: "routine-row-glow",
            pulse: false
          }
        }[patient.priority];

        const speciesIcons = {
          bovine: "fa-cow text-emerald-400",
          canine: "fa-dog text-cyan-400",
          caprine: "fa-seedling text-amber-400",
          equine: "fa-horse text-purple-400"
        };
        const sIcon = speciesIcons[patient.species] || "fa-paw text-slate-400";

        return `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md transition-all duration-200 hover:border-slate-700 ${priorityConfig.rowClass} sunlight-card">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <!-- Token + Species + Owner Info -->
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center">
                  <span class="text-[9px] font-mono uppercase text-slate-400 leading-tight">टोकन</span>
                  <span class="text-lg font-black font-mono text-white leading-tight">#${patient.tokenNo}</span>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-display font-extrabold text-sm text-white sunlight-text">${patient.ownerName}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase border ${priorityConfig.badgeClass} ${priorityConfig.pulse ? "badge-pulse" : ""}">
                      ${priorityConfig.badge}
                    </span>
                  </div>

                  <div class="text-xs text-slate-300 flex items-center gap-2 flex-wrap sunlight-muted">
                    <span class="flex items-center gap-1 font-semibold text-slate-200">
                      <i class="fa-solid ${sIcon}"></i>
                      <span>${patient.breed} (${patient.gender}, ${patient.age})</span>
                    </span>
                    <span class="text-slate-600">•</span>
                    <span class="font-mono text-[11px] text-slate-400">टैग: ${patient.tagNo}</span>
                    <span class="text-slate-600">•</span>
                    <span class="font-mono text-[11px] text-emerald-400">${patient.weightKg} kg</span>
                  </div>
                </div>
              </div>

              <!-- Wait Time Tracker & Call into Exam Room CTA -->
              <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                <div class="text-right">
                  <div class="text-[10px] font-mono text-slate-400 uppercase">प्रतीक्षा समय</div>
                  <div class="text-xs font-mono font-bold ${patient.waitTimeMins > 30 ? "text-rose-400" : "text-amber-400"}">
                    <i class="fa-regular fa-clock mr-1"></i>${patient.waitTimeMins} मिनट
                  </div>
                </div>

                <div class="flex items-center gap-1.5">
                  <button type="button" data-action="call_patient" data-token="${patient.tokenNo}" class="py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-950/40 flex items-center gap-1.5 active:scale-95 transition-all">
                    <i class="fa-solid fa-stethoscope"></i>
                    <span>परीक्षण (Examine)</span>
                  </button>
                  <button type="button" title="ट्राइएज प्राथमिकता बदलें" data-action="triage_toggle" data-token="${patient.tokenNo}" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Chief Complaint & Live Vitals Strip -->
            <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div class="text-slate-300 flex items-start gap-1.5">
                <span class="font-bold text-amber-400/90 whitespace-nowrap">मुख्य समस्या:</span>
                <span class="text-slate-300 leading-snug">${patient.chiefComplaint}</span>
              </div>
              ${patient.vitalSigns ? `
                <div class="flex items-center gap-3 font-mono text-[10px] text-slate-400 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800 whitespace-nowrap">
                  <span>T: <strong class="text-slate-200">${patient.vitalSigns.tempF}</strong></span>
                  <span>P: <strong class="text-slate-200">${patient.vitalSigns.pulseBpm}</strong></span>
                  <span>R: <strong class="text-slate-200">${patient.vitalSigns.respRate}</strong></span>
                </div>
              ` : ""}
            </div>
          </div>
        `;
      }).join("");
    },

    // 16. COMPONENT: IPD SUMMARY TAB
    renderIpdSummaryTab: function () {
      const ipd = Dashboard.state.admittedIpdCases;
      return `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between sunlight-card">
            <div>
              <h2 class="font-display font-black text-lg text-white uppercase tracking-tight sunlight-text">आईपीडी इन-पेशेंट वार्ड प्रबंधन</h2>
              <p class="text-xs text-slate-400 sunlight-muted">भर्ती गंभीर पशुओं के 24-घंटे वाइटल्स, आईवी फ्लुइड इन्फ्यूजन एवं दैनिक राउंड रिकॉर्ड्स।</p>
            </div>
            <button id="btnLogIpdRounds" type="button" class="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2">
              <i class="fa-solid fa-notes-medical"></i>
              <span>दैनिक राउंड दर्ज करें (Log Rounds)</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${ipd.map(c => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 sunlight-card">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">${c.bedNo}</span>
                  <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold ${c.condition === "CRITICAL" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}">${c.condition}</span>
                </div>
                <div>
                  <div class="font-display font-black text-base text-white sunlight-text">${c.species}</div>
                  <div class="text-xs font-mono text-slate-400">टैग: ${c.tagNo} • पालक: ${c.ownerName}</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <div class="text-slate-400 text-[10px] uppercase font-mono">निदान (Diagnosis):</div>
                  <div class="text-slate-200 font-semibold">${c.diagnosis}</div>
                </div>
                <div class="space-y-1 text-xs font-mono">
                  <div class="flex justify-between text-slate-400"><span>तापमान:</span> <strong class="text-slate-200">${c.tempF}</strong></div>
                  <div class="flex justify-between text-slate-400"><span>नाड़ी दर:</span> <strong class="text-slate-200">${c.pulseBpm}</strong></div>
                  <div class="flex justify-between text-slate-400"><span>आईवी फ्लुइड:</span> <strong class="text-cyan-400 truncate max-w-[150px]">${c.ivFluids}</strong></div>
                  <div class="flex justify-between text-slate-400"><span>अंतिम राउंड:</span> <strong class="text-slate-200">${c.lastRoundTime}</strong></div>
                </div>
                <button type="button" data-action="update_ipd_vitals" data-ipd-id="${c.ipdId}" class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors">
                  वाइटल्स व दवाएं अपडेट करें
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: STATUTORY OUTBREAKS & EPIDEMIOLOGY RADAR
    renderStatutoryAlertsTab: function () {
      const alerts = Dashboard.state.statutoryAlerts;
      return `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sunlight-card">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xl">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <h2 class="font-display font-black text-lg text-rose-300 uppercase tracking-tight">राष्ट्रीय संक्रामक रोग एवं महामारी अलर्ट्स</h2>
                <p class="text-xs text-rose-200/80">पशुपालन एवं डेयरी विभाग (DAHD) तथा VCI 2026 वैधानिक निगरानी मानक।</p>
              </div>
            </div>
            <button id="btnDeclareNewOutbreak" type="button" class="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/50">
              <i class="fa-solid fa-bullhorn"></i>
              <span>क्षेत्रीय अलर्ट घोषित करें (Declare Alert)</span>
            </button>
          </div>

          <div class="space-y-4">
            ${alerts.map(a => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 sunlight-card">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-rose-500 pulse-beacon"></span>
                    <h3 class="font-display font-black text-base text-white sunlight-text">${a.pathogen}</h3>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40">
                    ${a.severity}
                  </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div class="text-[10px] font-mono text-slate-400 uppercase">संक्रमित परिधि क्लस्टर</div>
                    <div class="text-amber-400 font-bold mt-0.5">${a.clusterRegion}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div class="text-[10px] font-mono text-slate-400 uppercase">अनिवार्य वैधानिक प्रोटोकॉल</div>
                    <div class="text-slate-200 font-semibold mt-0.5">${a.mandatoryProtocol}</div>
                  </div>
                </div>
                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button type="button" data-action="broadcast_farmer_sms" data-alert-id="${a.alertId}" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700">
                    <i class="fa-solid fa-tower-broadcast text-amber-400 mr-1"></i> कृषकों को SMS चेतावनी भेजें
                  </button>
                  <button type="button" data-action="view_epidemic_sop" data-alert-id="${a.alertId}" class="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold">
                    मानक उपचार गाइड (SOP)
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 18. FAST ACTION ORCHESTRATOR: CALL NEXT PATIENT INTO EXAM ROOM
    callNextPatient: function (overrideTokenNo) {
      ClinicalAudio.chimeCallNext();
      const q = Dashboard.state.todaysQueue;
      if (q.length === 0) {
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("ओपीडी कतार में कोई मरीज प्रतीक्षारत नहीं है।", "info");
        }
        return;
      }

      let targetPatient = null;
      if (overrideTokenNo) {
        targetPatient = q.find(p => p.tokenNo === parseInt(overrideTokenNo, 10));
      } else {
        // Pick first Red emergency, then first urgent, or simply the first in line
        const red = q.find(p => p.priority === "EMERGENCY_RED");
        const orange = q.find(p => p.priority === "URGENT_ORANGE");
        targetPatient = red || orange || q[0];
      }

      if (!targetPatient) return;

      Dashboard.state.currentActiveExamPatient = targetPatient;
      Dashboard.state.doctorProfile.onDutyStatus = "IN_CONSULTATION";
      Dashboard.updateHeaderStatusPill();
      StorageEngine.saveState(Dashboard.state);

      // Check for standalone consultation room module
      if (window.VetcareApp.Doctor.PatientConsultationRoom && typeof window.VetcareApp.Doctor.PatientConsultationRoom.openSession === "function") {
        window.VetcareApp.Doctor.PatientConsultationRoom.openSession(targetPatient);
        return;
      }

      // Built-in Full Clinical Examination Suite Modal
      Dashboard.launchConsultationModal(targetPatient);
    },

    // 19. INTEGRATED CONSULTATION ROOM MODAL (EXAMINE, SHAEFFER'S FORMULA, STEROID GUARD & RX GENERATION)
    launchConsultationModal: function (patient) {
      const modal = document.getElementById("activeConsultationRoomModal");
      if (!modal) return;

      modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative sunlight-card">
          <!-- Modal Header -->
          <div class="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-stethoscope"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-display font-black text-lg text-white sunlight-text">क्लिनिकल परीक्षा एवं प्रिस्क्रिप्शन कंसोल</h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">टोकन #${patient.tokenNo}</span>
                </div>
                <div class="text-xs text-slate-400 font-mono">मरीज: ${patient.breed} • पालक: ${patient.ownerName} • टैग: ${patient.tagNo}</div>
              </div>
            </div>
            <button id="btnCloseConsultationModal" type="button" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Modal Scrollable Body -->
          <div class="p-5 overflow-y-auto space-y-5 custom-scrollbar flex-1">
            <!-- Patient Vital Baseline -->
            <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span class="text-[10px] font-mono uppercase text-slate-400">शारीरिक वजन (Weight)</span>
                <div class="text-sm font-bold text-emerald-400 font-mono mt-0.5">${patient.weightKg} kg (Shaeffer's Verified)</div>
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase text-slate-400">रेक्टल तापमान</span>
                <input type="text" id="consultTempInput" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-white mt-0.5" value="${patient.vitalSigns ? patient.vitalSigns.tempF : "101.5 °F"}" />
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase text-slate-400">हृदय / नाड़ी दर</span>
                <input type="text" id="consultPulseInput" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-white mt-0.5" value="${patient.vitalSigns ? patient.vitalSigns.pulseBpm : "72 bpm"}" />
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase text-slate-400">गर्भधारण स्थिति (Pregnancy)</span>
                <select id="consultPregnancyStatus" class="w-full bg-slate-900 border border-rose-500/60 text-rose-300 font-bold rounded-lg px-2 py-1 text-xs mt-0.5">
                  <option value="NOT_PREGNANT">गर्भवती नहीं (Non-Pregnant)</option>
                  <option value="PREGNANT_FIRST_TRIMESTER">गर्भवती (प्रथम तिमाही 1-3 माह)</option>
                  <option value="PREGNANT_ADVANCED" selected>गर्भवती (अंतिम तिमाही 7-9 माह - STEROID LOCK)</option>
                  <option value="UNKNOWN">अपुष्ट (Status Unknown)</option>
                </select>
              </div>
            </div>

            <!-- Corticosteroid Clinical Guard Banner -->
            <div id="corticosteroidAlertBanner" class="p-4 rounded-xl bg-rose-950/30 border-2 border-rose-500/60 flex items-start gap-3">
              <i class="fa-solid fa-triangle-exclamation text-rose-400 text-xl mt-0.5"></i>
              <div>
                <div class="font-display font-extrabold text-xs uppercase text-rose-300 tracking-wider">CORTICOSTEROID RED ALERT GUARD (ISO-VET 2026)</div>
                <div class="text-[11px] text-slate-300 leading-snug mt-1">
                  पशु अंतिम तिमाही में गर्भवती चिह्नित है। डेक्सामेथासोन, आइसोफ्लुप्रेडोन, बेटामेथासोन पूर्णतः प्रतिबंधित हैं (गर्भपात खतरा)। सिस्टम केवल गर्भ-सुरक्षित NSAIDs (जैसे Flunixin Meglumine अथवा Meloxicam) की अनुमति देगा।
                </div>
              </div>
            </div>

            <!-- Clinical Examination Notes & Diagnosis Formulation -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-mono uppercase text-slate-300 mb-1">नैदानिक लक्षण एवं इतिहास (Clinical History & Observations)</label>
                <textarea id="consultNotesArea" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">${patient.chiefComplaint}</textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">अंतिम निदान (Confirmed Clinical Diagnosis)</label>
                  <input type="text" id="consultDiagnosisInput" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" value="Acute Ruminal Tympany w/ Lactic Fermentation Risk" />
                </div>
                <div>
                  <label class="block text-xs font-mono uppercase text-slate-300 mb-1">AI Second Opinion असिस्टेंस</label>
                  <div class="flex gap-2">
                    <input type="text" readonly class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300" value="Heuristic Differential: Ruminal Acidosis vs. Frothy Bloat" />
                    <button id="btnTriggerAiSecondOpinion" type="button" class="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs whitespace-nowrap">
                      AI राय
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommended Drug Formulations Table -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase text-slate-300 font-bold">प्रिस्क्रिप्शन औषधियां (Prescribed Drugs & Dosages)</span>
                <button id="btnAddConsultDrugRow" type="button" class="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1">
                  <i class="fa-solid fa-plus"></i> दवा जोड़ें
                </button>
              </div>

              <div class="border border-slate-800 rounded-xl overflow-hidden">
                <table class="w-full text-left border-collapse text-xs">
                  <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th class="p-2.5">औषधि नाम (Salt / Brand)</th>
                      <th class="p-2.5">रूट</th>
                      <th class="p-2.5">खुराक (Shaeffer's Dosimetry)</th>
                      <th class="p-2.5">आवृत्ति व अवधि</th>
                      <th class="p-2.5 text-center">हटाएं</th>
                    </tr>
                  </thead>
                  <tbody id="consultDrugsTbody" class="divide-y divide-slate-800/80 bg-slate-900/80 text-slate-200 font-mono">
                    <tr>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" value="Bloatosil (Simethicone + Dill Oil Emulsion)" />
                      </td>
                      <td class="p-2">
                        <select class="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white">
                          <option selected>Oral / Drench</option>
                          <option>IM</option>
                          <option>IV</option>
                          <option>SC</option>
                          <option>Intraruminal</option>
                        </select>
                      </td>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-emerald-300" value="100 ml with 500ml warm water" />
                      </td>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" value="Stat, repeat in 4h if distension persists" />
                      </td>
                      <td class="p-2 text-center">
                        <button type="button" class="text-rose-400 hover:text-rose-300 text-sm delete-drug-row"><i class="fa-solid fa-trash-can"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" value="Flunixin Meglumine Injection (Safe NSAID)" />
                      </td>
                      <td class="p-2">
                        <select class="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white">
                          <option>Oral / Drench</option>
                          <option>IM</option>
                          <option selected>Slow IV</option>
                          <option>SC</option>
                        </select>
                      </td>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-emerald-300" value="2.2 mg/kg = 22.8 ml IV" />
                      </td>
                      <td class="p-2">
                        <input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" value="Once daily for 2 days" />
                      </td>
                      <td class="p-2 text-center">
                        <button type="button" class="text-rose-400 hover:text-rose-300 text-sm delete-drug-row"><i class="fa-solid fa-trash-can"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Withdrawal Period & Farmer Advice Notice -->
            <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <span class="font-bold uppercase tracking-wider text-[10px] text-amber-400 block mb-0.5">
                <i class="fa-solid fa-clock mr-1"></i> दुग्ध व मांस विथड्राल अवधि (Mandatory Statutory Notice)
              </span>
              उपचार के बाद 36 घंटे तक दूध मानव उपभोग हेतु उबाले बिना न बेचें। 7 दिन तक मांस उपयोग प्रतिबंधित।
            </div>
          </div>

          <!-- Modal Footer CTA Buttons -->
          <div class="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <button id="btnAdmitToIpd" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/60 transition-colors">
                <i class="fa-solid fa-bed-pulse mr-1"></i> आईपीडी में भर्ती करें
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button id="btnCancelConsultation" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                स्थगित करें
              </button>
              <button id="btnFinishAndPrintRx" type="button" class="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-2">
                <i class="fa-solid fa-print"></i>
                <span>प्रिस्क्रिप्शन सुरक्षित करें एवं प्रिंट निकालें (Complete & Print Rx)</span>
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Bind Modal Internal Actions
      const btnClose = document.getElementById("btnCloseConsultationModal");
      const btnCancel = document.getElementById("btnCancelConsultation");
      const btnFinishPrint = document.getElementById("btnFinishAndPrintRx");
      const btnAdmit = document.getElementById("btnAdmitToIpd");
      const btnAddRow = document.getElementById("btnAddConsultDrugRow");
      const drugsTbody = document.getElementById("consultDrugsTbody");

      function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        Dashboard.state.currentActiveExamPatient = null;
        Dashboard.state.doctorProfile.onDutyStatus = "AVAILABLE";
        Dashboard.updateHeaderStatusPill();
        StorageEngine.saveState(Dashboard.state);
      }

      if (btnClose) btnClose.addEventListener("click", closeModal);
      if (btnCancel) btnCancel.addEventListener("click", closeModal);

      if (btnAddRow && drugsTbody) {
        btnAddRow.addEventListener("click", function () {
          const tr = document.createElement("tr");
          tr.className = "bg-slate-900/80 text-slate-200 font-mono";
          tr.innerHTML = `
            <td class="p-2"><input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="दवा का नाम प्रविष्ट करें" /></td>
            <td class="p-2">
              <select class="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white">
                <option>Oral / Drench</option>
                <option>IM</option>
                <option>IV</option>
                <option>SC</option>
              </select>
            </td>
            <td class="p-2"><input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-emerald-300" placeholder="उदा. 15 ml" /></td>
            <td class="p-2"><input type="text" class="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="दिन में दो बार (BID)" /></td>
            <td class="p-2 text-center">
              <button type="button" class="text-rose-400 hover:text-rose-300 text-sm delete-drug-row"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          `;
          drugsTbody.appendChild(tr);
        });
      }

      // Delegate row deletion
      if (drugsTbody) {
        drugsTbody.addEventListener("click", function (e) {
          const btn = e.target.closest(".delete-drug-row");
          if (btn) {
            const tr = btn.closest("tr");
            if (tr) tr.remove();
          }
        });
      }

      // Finish Consultation & Trigger Real-Time OPD Slip Output
      if (btnFinishPrint) {
        btnFinishPrint.addEventListener("click", function () {
          const notes = document.getElementById("consultNotesArea") ? document.getElementById("consultNotesArea").value : "";
          const diag = document.getElementById("consultDiagnosisInput") ? document.getElementById("consultDiagnosisInput").value : "Clinical Evaluation Complete";

          // Remove patient from queue
          Dashboard.state.todaysQueue = Dashboard.state.todaysQueue.filter(p => p.tokenNo !== patient.tokenNo);
          Dashboard.state.quickStats.opdSeenToday++;

          // Push into recent consultations
          Dashboard.state.recentConsultations.unshift({
            caseNo: "OPD-2026-" + Math.floor(8820 + Math.random() * 200),
            tokenNo: patient.tokenNo,
            species: patient.breed,
            ownerName: patient.ownerName,
            diagnosis: diag,
            treatmentSummary: "Comprehensive Clinical Protocol Executed",
            rxCode: "RX-" + patient.tokenNo + "-AUTO",
            timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          });

          // Print Printable Rx
          Dashboard.executePrescriptionPrint(patient, diag, notes);

          closeModal();
          Dashboard.render(Dashboard.state.domContainer.id);
          ClinicalAudio.chimeSuccess();

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("परामर्श सफलतापूर्वक पूर्ण! प्रिस्क्रिप्शन प्रिंट तैयार है।", "success");
          }
        });
      }

      // Admit to IPD
      if (btnAdmit) {
        btnAdmit.addEventListener("click", function () {
          Dashboard.state.admittedIpdCases.push({
            ipdId: "IPD-2026-" + Math.floor(100 + Math.random() * 900),
            bedNo: "WARD-A-BED-" + (Dashboard.state.admittedIpdCases.length + 1),
            tagNo: patient.tagNo,
            species: patient.breed,
            ownerName: patient.ownerName,
            diagnosis: document.getElementById("consultDiagnosisInput") ? document.getElementById("consultDiagnosisInput").value : patient.chiefComplaint,
            admissionDate: new Date().toISOString().split("T")[0],
            condition: "OBSERVATION",
            tempF: patient.vitalSigns ? patient.vitalSigns.tempF : "101.5 °F",
            pulseBpm: patient.vitalSigns ? patient.vitalSigns.pulseBpm : "72 bpm",
            ivFluids: "Ringers Lactate 2L IV Drip Initiated",
            lastRoundTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          });

          Dashboard.state.todaysQueue = Dashboard.state.todaysQueue.filter(p => p.tokenNo !== patient.tokenNo);
          closeModal();
          Dashboard.render(Dashboard.state.domContainer.id);

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("मरीज को सफलतापूर्वक IPD वार्ड में भर्ती किया गया।", "success");
          }
        });
      }
    },

    // 20. EMERGENCY INTERVENTION OVERRIDE (TROCARIZATION, SNAKEBITE & RESUSCITATION)
    launchEmergencyIntervention: function (emergencyId) {
      ClinicalAudio.chimeEmergency();
      const portal = document.getElementById("clinicalActionDialogPortal");
      if (!portal) return;

      portal.innerHTML = `
        <div class="bg-slate-900 border-2 border-rose-500 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative sunlight-card space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500 text-slate-950 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <h3 class="font-display font-extrabold text-lg text-rose-400">आपातकालीन क्लिनिकल इंटरवेंशन प्रोटोकॉल</h3>
                <div class="text-xs text-slate-400 font-mono">CODE RED: Emergency Resuscitation & Stabilization</div>
              </div>
            </div>
            <button id="btnCloseEmergencyPortal" type="button" class="text-slate-400 hover:text-white p-1">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs text-slate-300">
            <div class="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40">
              <div class="font-bold text-rose-300 text-sm flex items-center gap-2 mb-1">
                <i class="fa-solid fa-syringe"></i>
                <span>1. तीव्र आफरा व ट्रोकाराइजेशन (Ruminal Tympany Trocarization)</span>
              </div>
              <p class="leading-relaxed">
                लेफ्ट पैरालम्बर फोसा के केंद्र में 16-गेज नीडल अथवा ट्रोकार-कैनुला प्रविष्ट करें। अत्यधिक गैस रिलीज के समय शॉक से बचाव हेतु कैनुला को धीरे-धीरे अनकैप करें। तुरंत 50ml Bloatosil व 500ml लिक्विड पैराफिन कैनुला द्वारा प्रविष्ट करें।
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
              <div class="font-bold text-amber-300 text-sm flex items-center gap-2 mb-1">
                <i class="fa-solid fa-staff-snake"></i>
                <span>2. सर्पदंश विषरोधी प्रोटोकॉल (Polyvalent Anti-Snake Venom)</span>
              </div>
              <p class="leading-relaxed">
                पशु वजन के अनुसार 2 से 4 वायल पॉलीवैलेंट ASV को 500ml सामान्य सलाइन (0.9% NS) में मिलाकर 30 मिनट में IV दें। एनाफिलेक्सिस से बचाव हेतु पहले Atropine Sulfate (0.04 mg/kg) व Dexamethasone (गैर-गर्भवती में) अथवा Avil तैयार रखें।
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
              <div class="font-bold text-cyan-300 text-sm flex items-center gap-2 mb-1">
                <i class="fa-solid fa-heart-pulse"></i>
                <span>3. डाउनर काऊ हाइपोकैल्सीमिया (Acute Milk Fever)</span>
              </div>
              <p class="leading-relaxed">
                Calcium Borogluconate 25% (450 ml): आधा IV अत्यंत धीमी गति से (हृदय गति की लगातार ऑस्कल्टेशन करते हुए) तथा आधा सब-क्यूटेनियस (SC) लगाएं। एरिथमिया होते ही IV तुरंत रोकें।
              </p>
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <button id="btnAcknowledgeEmergency" type="button" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg">
              प्रोटोकॉल निष्पादित हुआ (Acknowledge & Dismiss)
            </button>
          </div>
        </div>
      `;

      portal.classList.remove("hidden");
      portal.classList.add("flex");

      const btnClose = document.getElementById("btnCloseEmergencyPortal");
      const btnAck = document.getElementById("btnAcknowledgeEmergency");

      function closePortal() {
        portal.classList.add("hidden");
        portal.classList.remove("flex");
      }
      if (btnClose) btnClose.addEventListener("click", closePortal);
      if (btnAck) btnAck.addEventListener("click", closePortal);
    },

    // 21. PRESCRIPTION PRINT DISPATCHER
    executePrescriptionPrint: function (patient, diagnosis, notes) {
      // Create off-screen printable DOM container
      let printFrame = document.getElementById("printablePrescriptionSlip");
      if (!printFrame) {
        printFrame = document.createElement("div");
        printFrame.id = "printablePrescriptionSlip";
        document.body.appendChild(printFrame);
      }

      const prof = Dashboard.state.doctorProfile;
      const todayDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

      printFrame.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #000; max-width: 800px; margin: 0 auto; line-height: 1.4;">
          <!-- Rx Header -->
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px;">
            <div>
              <h2 style="margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase;">${prof.name}</h2>
              <div style="font-size: 11px; margin-top: 2px;">${prof.qualification}</div>
              <div style="font-size: 11px; font-weight: bold;">VCI Reg No: ${prof.regNo}</div>
              <div style="font-size: 11px;">${prof.currentDutyStation}</div>
            </div>
            <div style="text-align: right;">
              <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #064e3b;">VETCARE AI OS</h3>
              <div style="font-size: 11px;">OPD Slip No: <strong>#${patient.tokenNo}</strong></div>
              <div style="font-size: 11px;">दिनांक / Date: ${todayDate}</div>
              <div style="font-size: 11px; font-weight: bold; color: #b91c1c;">VETERINARY CLINICAL PRESCRIPTION</div>
            </div>
          </div>

          <!-- Patient & Owner Details Strip -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; background: #f3f4f6; padding: 10px; border-radius: 6px; margin-bottom: 16px;">
            <div><strong>पशुपालक का नाम (Owner):</strong> ${patient.ownerName}</div>
            <div><strong>टैग सं. (Tag/Microchip):</strong> ${patient.tagNo}</div>
            <div><strong>पशु प्रजाति / नस्ल (Species/Breed):</strong> ${patient.breed} (${patient.gender}, ${patient.age})</div>
            <div><strong>अनुमानित वजन (Body Weight):</strong> ${patient.weightKg} kg (Shaeffer's Verified)</div>
          </div>

          <!-- Clinical Diagnosis -->
          <div style="margin-bottom: 16px; font-size: 13px;">
            <div><strong>नैदानिक निष्कर्ष (Clinical Diagnosis):</strong> ${diagnosis}</div>
            <div style="font-size: 11px; color: #4b5563; margin-top: 3px;"><strong>लक्षण एवं इतिहास:</strong> ${notes}</div>
          </div>

          <!-- Rx Symbol & Medication Table -->
          <div style="margin-bottom: 16px;">
            <div style="font-size: 22px; font-weight: bold; margin-bottom: 4px; font-family: serif;">℞</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1.5px solid #000; border-top: 1px solid #000;">
                  <th style="padding: 6px;">क्र.</th>
                  <th style="padding: 6px;">दवा का नाम (Drug Name & Salt)</th>
                  <th style="padding: 6px;">रूट</th>
                  <th style="padding: 6px;">सटीक मात्रा (Dose)</th>
                  <th style="padding: 6px;">आवृत्ति एवं अवधि (Duration)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">1</td>
                  <td style="padding: 6px;"><strong>Bloatosil (Simethicone 1% + Dill Oil)</strong></td>
                  <td style="padding: 6px;">Oral Drench</td>
                  <td style="padding: 6px;">100 ml in warm water</td>
                  <td style="padding: 6px;">तत्काल (Stat), आवश्यकता पड़ने पर 4 घंटे बाद दोहराएं</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">2</td>
                  <td style="padding: 6px;"><strong>Flunixin Meglumine Injection (50mg/ml)</strong></td>
                  <td style="padding: 6px;">Slow IV</td>
                  <td style="padding: 6px;">2.2 mg/kg (22.8 ml)</td>
                  <td style="padding: 6px;">दिन में एक बार (OD) x 2 दिन</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">3</td>
                  <td style="padding: 6px;"><strong>Rumen Yeast & Probiotics (Toruf / Bio-Bloom Bolus)</strong></td>
                  <td style="padding: 6px;">Oral</td>
                  <td style="padding: 6px;">2 बोलस</td>
                  <td style="padding: 6px;">दिन में दो बार (BID) x 3 दिन</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Statutory Notice -->
          <div style="font-size: 10px; border-left: 3px solid #b91c1c; padding-left: 8px; margin-bottom: 30px; color: #374151;">
            <strong>वैधानिक विथड्राल सूचना:</strong> इस पशु के दूध का उपयोग 36 घंटे तक न करें। अंतिम खुराक के 7 दिन बाद तक मांस उपयोग वर्जित है। यदि आफरा 6 घंटे में ठीक न हो, तो तुरंत निकटतम पशु चिकित्सालय में संपर्क करें।
          </div>

          <!-- Signature Section -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
            <div style="font-size: 10px; color: #6b7280;">
              Vetcare AI OS • Generated on ${todayDate}<br/>
              डिजिटल सत्यापन कोड: SHA256-VC-${Date.now()}
            </div>
            <div style="text-align: center;">
              <div style="height: 45px; border-bottom: 1px solid #000; width: 180px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">हस्ताक्षर एवं मोहर (Doctor's Signature)</div>
              <div style="font-size: 10px;">${prof.name} (${prof.regNo})</div>
            </div>
          </div>
        </div>
      `;

      // Trigger Browser Print Dialog
      setTimeout(() => {
        window.print();
      }, 250);
    },

    // 22. EVENT BUS LISTENERS & HANDLERS
    registerEventListeners: function () {
      // Patient Checked-In from Intake Subsystem
      Dashboard.handlePatientCheckedIn = function (payload) {
        if (!payload) return;
        const newPatient = {
          tokenNo: payload.tokenNo || (Dashboard.state.todaysQueue.length + 101),
          patientId: payload.patientId || ("PAT-" + Math.floor(1000 + Math.random() * 9000)),
          tagNo: payload.tagNo || "TAG-NEW",
          species: payload.species || "bovine",
          breed: payload.breed || "Crossbred",
          gender: payload.gender || "Female",
          age: payload.age || "3 Yrs",
          weightKg: payload.weightKg || 350,
          ownerName: payload.ownerName || "Walk-In Farmer",
          chiefComplaint: payload.chiefComplaint || "Routine Health Evaluation",
          priority: payload.priority || "ROUTINE_GREEN",
          checkInTimestamp: Date.now(),
          waitTimeMins: 0,
          vitalSigns: payload.vitalSigns || { tempF: "101.5 °F", pulseBpm: "70", respRate: "24" }
        };

        Dashboard.state.todaysQueue.push(newPatient);
        StorageEngine.saveState(Dashboard.state);
        Dashboard.render(Dashboard.state.domContainer.id);
        ClinicalAudio.chimeSuccess();

        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast(`नया मरीज कतार में जुड़ा: टोकन #${newPatient.tokenNo}`, "success");
        }
      };
      window.VetcareApp.EventBus.on("queue:patient_checked_in", Dashboard.handlePatientCheckedIn);

      // Lab Report Arrived
      Dashboard.handleLabReportSaved = function (payload) {
        if (!payload) return;
        Dashboard.state.pendingLabReports.unshift(payload);
        StorageEngine.saveState(Dashboard.state);
        Dashboard.render(Dashboard.state.domContainer.id);
        ClinicalAudio.chimeEmergency();
      };
      window.VetcareApp.EventBus.on("lab:report_saved", Dashboard.handleLabReportSaved);

      // Outbreak Alert Declared
      Dashboard.handleOutbreakDeclared = function (payload) {
        if (!payload) return;
        Dashboard.state.statutoryAlerts.unshift(payload);
        StorageEngine.saveState(Dashboard.state);
        Dashboard.render(Dashboard.state.domContainer.id);
        ClinicalAudio.chimeEmergency();
      };
      window.VetcareApp.EventBus.on("outbreak:alert_declared", Dashboard.handleOutbreakDeclared);
    },

    // 23. REAL-TIME TIMERS & INTERVALS
    startTimers: function () {
      // 1. Clock Runner
      Dashboard.state.clockInterval = setInterval(function () {
        const timeEl = document.getElementById("liveClockTime");
        const dateEl = document.getElementById("liveClockDate");
        const now = new Date();
        if (timeEl) {
          timeEl.textContent = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";
        }
        if (dateEl) {
          dateEl.textContent = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        }
      }, 1000);

      // 2. Wait Timer Updater (Every 60s)
      Dashboard.state.waitTimerInterval = setInterval(function () {
        const now = Date.now();
        Dashboard.state.todaysQueue.forEach(p => {
          if (p.checkInTimestamp) {
            p.waitTimeMins = Math.floor((now - p.checkInTimestamp) / (60 * 1000));
          }
        });
        // Non-intrusive re-render of queue cards if on queue tab
        if (Dashboard.state.activeTab === "live_opd_queue" || Dashboard.state.activeTab === "overview") {
          const cardsContainer = document.querySelector(".queue-scroll");
          if (cardsContainer) {
            cardsContainer.innerHTML = Dashboard.renderQueueCards(Dashboard.state.activeTab === "overview");
          }
        }
      }, 60000);
    },

    // 24. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = Dashboard.state.domContainer;
      if (!root) return;

      // Status selector pill change
      const statusSelect = document.getElementById("doctorDutyStatusSelect");
      if (statusSelect) {
        statusSelect.addEventListener("change", function () {
          Dashboard.state.doctorProfile.onDutyStatus = this.value;
          StorageEngine.saveState(Dashboard.state);
          Dashboard.render(Dashboard.state.domContainer.id);
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`ड्यूटी स्थिति अपडेट: ${this.value}`, "info");
          }
        });
      }

      // Master Call Next Button
      const btnCallMaster = document.getElementById("btnCallNextMaster");
      if (btnCallMaster) {
        btnCallMaster.addEventListener("click", () => Dashboard.callNextPatient());
      }

      // Tab switcher clicks
      root.querySelectorAll(".tab-switch-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const target = this.getAttribute("data-tab-target");
          if (target) {
            Dashboard.state.activeTab = target;
            StorageEngine.saveState(Dashboard.state);
            Dashboard.render(Dashboard.state.domContainer.id);
          }
        });
      });

      // Queue priority filter clicks
      root.querySelectorAll(".queue-filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const filter = this.getAttribute("data-filter-queue");
          if (filter) {
            Dashboard.state.queueFilter = filter;
            const scrollContainer = root.querySelector(".queue-scroll");
            if (scrollContainer) {
              scrollContainer.innerHTML = Dashboard.renderQueueCards(true);
            }
            root.querySelectorAll(".queue-filter-btn").forEach(b => {
              b.className = "queue-filter-btn px-2 py-0.5 rounded text-slate-400";
            });
            this.className = "queue-filter-btn px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black";
          }
        });
      });

      // Quick Launch Bar Clicks
      const btnQuickRx = document.getElementById("btnQuickRxSlip");
      if (btnQuickRx) {
        btnQuickRx.addEventListener("click", function () {
          if (window.VetcareApp.Modules.PrescriptionGenerator && typeof window.VetcareApp.Modules.PrescriptionGenerator.init === "function") {
            window.VetcareApp.Modules.PrescriptionGenerator.init();
          } else {
            Dashboard.callNextPatient();
          }
        });
      }

      const btnEmergencyGuide = document.getElementById("btnEmergencyGuideModal");
      if (btnEmergencyGuide) {
        btnEmergencyGuide.addEventListener("click", function () {
          Dashboard.launchEmergencyIntervention("EMERGENCY-PROTOCOL-TRIGGER");
        });
      }

      const btnRegisterWalkin = document.getElementById("btnRegisterWalkinToken");
      const btnAddQueuePatient = document.getElementById("btnAddNewQueuePatient");
      const openIntake = function () {
        // Dispatch event or launch intake dialog
        window.VetcareApp.EventBus.emit("queue:patient_checked_in", {
          tokenNo: Dashboard.state.todaysQueue.length + 101,
          ownerName: "नया वॉक-इन पशुपालक",
          breed: "मुर्राह भैंस (Murrah Buffalo)",
          species: "bovine",
          weightKg: 490,
          priority: "URGENT_ORANGE",
          chiefComplaint: "हल्का आफरा एवं जुगाली बंद (Off-Feed)"
        });
      };
      if (btnRegisterWalkin) btnRegisterWalkin.addEventListener("click", openIntake);
      if (btnAddQueuePatient) btnAddQueuePatient.addEventListener("click", openIntake);

      // Delegated Action Clicks across the entire dashboard
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "call_patient") {
          const token = btn.getAttribute("data-token");
          Dashboard.callNextPatient(token);
        } else if (action === "triage_toggle") {
          const token = parseInt(btn.getAttribute("data-token"), 10);
          const patient = Dashboard.state.todaysQueue.find(p => p.tokenNo === token);
          if (patient) {
            const cycle = { ROUTINE_GREEN: "URGENT_ORANGE", URGENT_ORANGE: "EMERGENCY_RED", EMERGENCY_RED: "ROUTINE_GREEN" };
            patient.priority = cycle[patient.priority] || "ROUTINE_GREEN";
            StorageEngine.saveState(Dashboard.state);
            Dashboard.render(Dashboard.state.domContainer.id);
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast(`टोकन #${token} ट्राइएज प्राथमिकता अपडेट की गई।`, "warning");
            }
          }
        } else if (action === "review_lab") {
          const reportId = btn.getAttribute("data-report-id");
          Dashboard.state.pendingLabReports = Dashboard.state.pendingLabReports.filter(r => r.reportId !== reportId);
          StorageEngine.saveState(Dashboard.state);
          Dashboard.render(Dashboard.state.domContainer.id);
          ClinicalAudio.chimeSuccess();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`लैब रिपोर्ट ${reportId} को डॉक्टर द्वारा सत्यापित व अनुमोदित किया गया।`, "success");
          }
        } else if (action === "print_recent_rx") {
          const caseNo = btn.getAttribute("data-case");
          const recent = Dashboard.state.recentConsultations.find(r => r.caseNo === caseNo);
          if (recent) {
            Dashboard.executePrescriptionPrint(
              { tokenNo: recent.tokenNo, ownerName: recent.ownerName, breed: recent.species, tagNo: "TAG-VERIFIED", weightKg: 450, gender: "Female", age: "5 Yrs" },
              recent.diagnosis,
              recent.treatmentSummary
            );
          }
        } else if (action === "duplicate_rx") {
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("केस पर्ची क्लोन की गई। नए परामर्श हेतु तैयार।", "info");
          }
        } else if (action === "broadcast_farmer_sms") {
          ClinicalAudio.chimeEmergency();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("क्षेत्र के 1,450 पंजीकृत कृषकों को SMS एडवाइजरी प्रसारित की गई!", "success");
          }
        } else if (action === "view_epidemic_sop") {
          Dashboard.launchEmergencyIntervention("EPIDEMIC-SOP-TRIGGER");
        }
      });
    },

    // 25. HELPER: UPDATE LIVE STATUS PILL WITHOUT FULL REDRAW
    updateHeaderStatusPill: function () {
      const select = document.getElementById("doctorDutyStatusSelect");
      if (select) {
        select.value = Dashboard.state.doctorProfile.onDutyStatus;
      }
    }
  };

  // 26. MODULE EXPORT & INITIALIZATION HOOK
  window.VetcareApp.Doctor.Dashboard = Dashboard;

  // Auto-wire with `app-bootstrap.js` if already present in runtime
  if (window.VetcareApp.registerModule && typeof window.VetcareApp.registerModule === "function") {
    window.VetcareApp.registerModule("DoctorDashboard", Dashboard);
  }

  // Automatic trigger if standard `#doctorDashboardContainer` container exists on DOM load
  document.addEventListener("DOMContentLoaded", function () {
    const defaultContainer = document.getElementById("doctorDashboardContainer");
    if (defaultContainer) {
      Dashboard.init("doctorDashboardContainer");
    }
  });

})(window, document);
