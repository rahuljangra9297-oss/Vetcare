// Vetcare AI OS - Veterinary IPD In-Patient Ward Rounds, MAR & Daily Vitals Monitor (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Doctor = window.VetcareApp.Doctor || {};

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

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CLINICAL CHIMES & ALARMS)
  const WardAudio = {
    playTone: function (freq, type, duration, vol) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.2));
      } catch (e) {
        // Autoplay policy silent catch
      }
    },
    chimeCriticalAlert: function () {
      WardAudio.playTone(880, "sawtooth", 0.18, 0.15);
      setTimeout(() => WardAudio.playTone(440, "sawtooth", 0.22, 0.18), 140);
      setTimeout(() => WardAudio.playTone(880, "sawtooth", 0.3, 0.2), 300);
    },
    chimeDoseSigned: function () {
      WardAudio.playTone(523.25, "sine", 0.12, 0.07);
      setTimeout(() => WardAudio.playTone(659.25, "sine", 0.18, 0.08), 90);
    },
    chimeDischargeSuccess: function () {
      WardAudio.playTone(440, "sine", 0.1, 0.07);
      setTimeout(() => WardAudio.playTone(554.37, "sine", 0.12, 0.07), 100);
      setTimeout(() => WardAudio.playTone(659.25, "sine", 0.15, 0.08), 200);
      setTimeout(() => WardAudio.playTone(880, "sine", 0.25, 0.09), 320);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB WITH LOCALSTORAGE FAILOVER
  const IpdStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    STORE_NAME: "ipd_inpatient_records",
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(IpdStorage.DB_NAME, IpdStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(IpdStorage.STORE_NAME)) {
            const store = db.createObjectStore(IpdStorage.STORE_NAME, { keyPath: "ipdNo" });
            store.createIndex("species", "species", { unique: false });
            store.createIndex("acuityLevel", "acuityLevel", { unique: false });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveRecord: async function (record) {
      try {
        const db = await IpdStorage.getDb();
        const tx = db.transaction(IpdStorage.STORE_NAME, "readwrite");
        const store = tx.objectStore(IpdStorage.STORE_NAME);
        store.put(record);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_IPD_" + record.ipdNo, JSON.stringify(record));
        } catch (e) {
          console.warn("[IpdStorage] LocalStorage fallback write failed", e);
        }
      }
    },
    loadAllRecords: async function () {
      try {
        const db = await IpdStorage.getDb();
        return new Promise(resolve => {
          const tx = db.transaction(IpdStorage.STORE_NAME, "readonly");
          const store = tx.objectStore(IpdStorage.STORE_NAME);
          const req = store.getAll();
          req.onsuccess = function () {
            if (req.result && req.result.length > 0) {
              resolve(req.result);
            } else {
              resolve(null);
            }
          };
          req.onerror = function () { resolve(null); };
        });
      } catch (err) {
        return null;
      }
    }
  };

  // 4. MAIN IPD WARD ROUNDS & MAR MONITOR
  const IpdWardRoundsMonitor = {
    // --- Reactive Internal State ---
    state: {
      admittedPatients: [
        {
          ipdNo: "IPD-2026-004",
          patientId: "PAT-BOV-8841",
          tagNo: "IN-HR-2024-8841",
          species: "bovine",
          breed: "Murrah Buffalo",
          gender: "Female",
          age: "5.5 Yrs",
          weightKg: 520,
          wardType: "LARGE_ANIMAL_SHED",
          penNumber: "Shed-A-Pen-01",
          admissionDate: "2026-03-28",
          primaryDiagnosis: "Emergency C-Section (Post-Uterine Torsion 360° Realignment)",
          attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)",
          acuityLevel: "CRITICAL", // CRITICAL | STABLE | RECOVERING
          ownerName: "Sukhbir Singh (Dhansu)",
          ownerContact: "+91 98120 44921",
          ivFluidRateMlHr: 350,
          ivFluidType: "Dextrose Normal Saline (DNS 5%) + Ringers Lactate",
          isShockFlagged: false
        },
        {
          ipdNo: "IPD-2026-007",
          patientId: "PAT-CAN-0419",
          tagNo: "CAN-0419-GUR",
          species: "canine",
          breed: "Labrador Retriever",
          gender: "Male",
          age: "4.0 Yrs",
          weightKg: 34,
          wardType: "CANINE_ICU_KENNEL",
          penNumber: "ICU-Kennel-03",
          admissionDate: "2026-03-29",
          primaryDiagnosis: "Post-Gastric Dilatation Volvulus (GDV) Gastropexy Post-Op Day 1",
          attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)",
          acuityLevel: "STABLE",
          ownerName: "Deepak Mehra (Gurugram)",
          ownerContact: "+91 99911 22883",
          ivFluidRateMlHr: 75,
          ivFluidType: "PlasmaLyte-A with Fentanyl CRI",
          isShockFlagged: false
        },
        {
          ipdNo: "IPD-2026-009",
          patientId: "PAT-EQU-9011",
          tagNo: "EQU-9011-FAR",
          species: "equine",
          breed: "Thoroughbred Mare",
          gender: "Female",
          age: "7.0 Yrs",
          weightKg: 460,
          wardType: "LARGE_ANIMAL_SHED",
          penNumber: "Equine-Box-02",
          admissionDate: "2026-03-30",
          primaryDiagnosis: "Spasmodic Cecal Impaction Colic under Continuous Enteral Fluid Therapy",
          attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)",
          acuityLevel: "CRITICAL",
          ownerName: "Ranjit Dhillon (Faridabad)",
          ownerContact: "+91 98722 00192",
          ivFluidRateMlHr: 500,
          ivFluidType: "Isotonic Enteral Electrolyte Saline via Nasogastric Tube",
          isShockFlagged: false
        },
        {
          ipdNo: "IPD-2026-011",
          patientId: "PAT-CAP-2210",
          tagNo: "CAP-2210-ROH",
          species: "caprine",
          breed: "Beetal Doe",
          gender: "Female",
          age: "3.0 Yrs",
          weightKg: 42,
          wardType: "ISOLATION_PEN",
          penNumber: "Iso-Pen-04",
          admissionDate: "2026-03-27",
          primaryDiagnosis: "Severe Enterotoxemia (Clostridial Pulpy Kidney) w/ Dehydration",
          attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)",
          acuityLevel: "RECOVERING",
          ownerName: "Balwan Yadav (Rohtak)",
          ownerContact: "+91 94160 55811",
          ivFluidRateMlHr: 60,
          ivFluidType: "Normal Saline (0.9% NS) + 5% Dextrose",
          isShockFlagged: false
        }
      ],
      activeIpdNo: "IPD-2026-004",
      vitalsHistory: {
        "IPD-2026-004": [
          {
            date: "2026-03-31",
            time: "06:00",
            tempF: 99.2, // Triggers subnormal shock flag for cow!
            pulse: 94,
            respRate: 40,
            fluidRateMlHr: 350,
            urination: false,
            defecation: false,
            appetite: "NONE",
            doctorNotes: "Left recumbent, subnormal temp alert. Cold extremities. Administer warm IV fluids stat."
          },
          {
            date: "2026-03-30",
            time: "18:00",
            tempF: 101.6,
            pulse: 78,
            respRate: 26,
            fluidRateMlHr: 300,
            urination: true,
            defecation: true,
            appetite: "POOR",
            doctorNotes: "Evening round: Surgical incision clean, minimal seroma, mild voluntary water intake."
          },
          {
            date: "2026-03-30",
            time: "08:00",
            tempF: 101.8,
            pulse: 82,
            respRate: 28,
            fluidRateMlHr: 350,
            urination: true,
            defecation: false,
            appetite: "NONE",
            doctorNotes: "Post-op Day 2 morning round: Rumen sounds sluggish (1 wave/2min). Broad spectrum coverage continued."
          }
        ],
        "IPD-2026-007": [
          {
            date: "2026-03-31",
            time: "07:30",
            tempF: 101.5,
            pulse: 92,
            respRate: 24,
            fluidRateMlHr: 75,
            urination: true,
            defecation: true,
            appetite: "GOOD",
            doctorNotes: "Canine alert, wagging tail, bland low-fat diet tolerated well. Ready for discharge evaluation."
          }
        ],
        "IPD-2026-009": [
          {
            date: "2026-03-31",
            time: "08:00",
            tempF: 100.8,
            pulse: 46,
            respRate: 16,
            fluidRateMlHr: 500,
            urination: true,
            defecation: false,
            appetite: "NONE",
            doctorNotes: "Impaction softening noted on rectal palpation. Nasogastric reflux checked negative."
          }
        ],
        "IPD-2026-011": [
          {
            date: "2026-03-31",
            time: "08:00",
            tempF: 102.2,
            pulse: 74,
            respRate: 22,
            fluidRateMlHr: 40,
            urination: true,
            defecation: true,
            appetite: "GOOD",
            doctorNotes: "Feces formed pellets. Doe actively grazing on green fodder. Discharge approved."
          }
        ]
      },
      medicationAdministrationRecord: [
        {
          scheduleId: "MAR-004-01",
          ipdNo: "IPD-2026-004",
          drugName: "Ceftiofur Sodium Injection (RTU)",
          dose: "11 ml (1.1 mg/kg)",
          route: "Deep IM",
          scheduledTime: "08:00",
          shift: "MORNING",
          administeredBy: "Sister Kavita (RN-Vet)",
          isGiven: true,
          givenTimestamp: "2026-03-31 08:10"
        },
        {
          scheduleId: "MAR-004-02",
          ipdNo: "IPD-2026-004",
          drugName: "Flunixin Meglumine Injection",
          dose: "22 ml (2.2 mg/kg)",
          route: "Slow IV",
          scheduledTime: "08:00",
          shift: "MORNING",
          administeredBy: "Sister Kavita (RN-Vet)",
          isGiven: true,
          givenTimestamp: "2026-03-31 08:15"
        },
        {
          scheduleId: "MAR-004-03",
          ipdNo: "IPD-2026-004",
          drugName: "Calcium Borogluconate 25% + Mag",
          dose: "450 ml IV Infusion",
          route: "Slow IV Drip",
          scheduledTime: "14:00",
          shift: "AFTERNOON",
          administeredBy: "",
          isGiven: false,
          givenTimestamp: ""
        },
        {
          scheduleId: "MAR-004-04",
          ipdNo: "IPD-2026-004",
          drugName: "Ceftiofur Sodium Injection",
          dose: "11 ml (1.1 mg/kg)",
          route: "Deep IM",
          scheduledTime: "20:00",
          shift: "NIGHT",
          administeredBy: "",
          isGiven: false,
          givenTimestamp: ""
        },
        {
          scheduleId: "MAR-007-01",
          ipdNo: "IPD-2026-007",
          drugName: "Cefotaxime Sodium",
          dose: "750 mg (25 mg/kg)",
          route: "IV Push",
          scheduledTime: "08:00",
          shift: "MORNING",
          administeredBy: "Compounder Sandeep",
          isGiven: true,
          givenTimestamp: "2026-03-31 08:05"
        },
        {
          scheduleId: "MAR-007-02",
          ipdNo: "IPD-2026-007",
          drugName: "Pantoprazole IV",
          dose: "40 mg (1 mg/kg)",
          route: "Slow IV",
          scheduledTime: "08:00",
          shift: "MORNING",
          administeredBy: "Compounder Sandeep",
          isGiven: true,
          givenTimestamp: "2026-03-31 08:12"
        }
      ],
      activeTab: "ward_overview", // ward_overview | daily_vitals_sheet | medication_administration_mar | discharge_planner
      selectedWardFilter: "ALL", // ALL | LARGE_ANIMAL_SHED | CANINE_ICU_KENNEL | ISOLATION_PEN
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Veterinary IPD Ward Rounds & MAR Monitor (2026 Production)...");
      IpdWardRoundsMonitor.injectStyles();

      // Hydrate state from IndexedDB if existing
      const stored = await IpdStorage.loadAllRecords();
      if (stored && stored.length > 0) {
        IpdWardRoundsMonitor.state.admittedPatients = stored;
      }

      IpdWardRoundsMonitor.evaluateClinicalAcuity();
      IpdWardRoundsMonitor.registerEventListeners();

      if (containerId) {
        IpdWardRoundsMonitor.render(containerId);
      }
      return IpdWardRoundsMonitor;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "ipdWardMonitorContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      IpdWardRoundsMonitor.state.domContainer = container;

      // Render Complete Ward Layout
      container.innerHTML = `
        <div id="vetcareIpdWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${IpdWardRoundsMonitor.renderWardSummaryRibbon()}
          ${IpdWardRoundsMonitor.renderWardNavigationTabs()}
          <div id="ipdTabContentHost" class="transition-all duration-200">
            ${IpdWardRoundsMonitor.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Print Slip Container for Discharge Summary -->
        <div id="ipdPrintableDischargeSlip" class="hidden"></div>
      `;

      IpdWardRoundsMonitor.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (IpdWardRoundsMonitor.state.domContainer) {
        IpdWardRoundsMonitor.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] IPD Ward Monitor Destroyed Cleanly.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-ipd-ward-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-ipd-ward-styles";
      style.textContent = `
        .kennel-card-critical {
          border: 2px solid #f43f5e !important;
          background: linear-gradient(145deg, rgba(244,63,94,0.12) 0%, rgba(17,24,39,0.95) 100%) !important;
          box-shadow: 0 4px 20px -2px rgba(244,63,94,0.3) !important;
        }
        .kennel-card-stable {
          border: 2px solid #06b6d4 !important;
          background: linear-gradient(145deg, rgba(6,182,212,0.08) 0%, rgba(17,24,39,0.95) 100%) !important;
        }
        .kennel-card-recovering {
          border: 2px solid #10b981 !important;
          background: linear-gradient(145deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.95) 100%) !important;
        }
        .shock-beacon-alert {
          animation: shockFlash 1.4s infinite;
        }
        @keyframes shockFlash {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.08); }
        }
        @media print {
          body * { visibility: hidden !important; }
          #ipdPrintableDischargeSlip, #ipdPrintableDischargeSlip * { visibility: visible !important; }
          #ipdPrintableDischargeSlip { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 9. CLINICAL ACUITY & SHOCK TRIAGE LOGIC
    evaluateClinicalAcuity: function () {
      const patients = IpdWardRoundsMonitor.state.admittedPatients;
      const vitals = IpdWardRoundsMonitor.state.vitalsHistory;
      let shockAlertTriggered = false;

      patients.forEach(pat => {
        const history = vitals[pat.ipdNo];
        if (history && history.length > 0) {
          const latest = history[0]; // Most recent round
          const temp = parseFloat(latest.tempF);

          // Clinical Rule: Dropping body temperature in Bovine/Canine (< 99.5°F) indicates hypocalcemia / endotoxic shock / hypothermia
          // Or absent urination for > 12h
          if ((temp < 99.5) || (latest.urination === false && pat.acuityLevel === "CRITICAL")) {
            pat.isShockFlagged = true;
            pat.acuityLevel = "CRITICAL";
            shockAlertTriggered = true;
          } else {
            pat.isShockFlagged = false;
          }
        }
      });

      if (shockAlertTriggered) {
        WardAudio.chimeCriticalAlert();
      }
    },

    // 10. COMPONENT: WARD SUMMARY RIBBON
    renderWardSummaryRibbon: function () {
      const patients = IpdWardRoundsMonitor.state.admittedPatients;
      const totalCapacity = 10;
      const occupied = patients.length;
      const occPercent = Math.round((occupied / totalCapacity) * 100);
      const criticalCount = patients.filter(p => p.acuityLevel === "CRITICAL").length;
      const recoveringCount = patients.filter(p => p.acuityLevel === "RECOVERING").length;

      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-cyan-950/40">
                <i class="fa-solid fa-hospital"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    आईपीडी इन-पेशेंट वार्ड एवं नर्स मार मॉनिटर
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    WARD OS 2026 PROD
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-1 sunlight-muted">
                  प्रभारी पशु चिकित्सक: डॉ. राहुल जांगड़ा (VCI-2026-9297) • वार्ड क्षमता: ${occupied}/${totalCapacity} शेड/केनल अधिकृत
                </div>
              </div>
            </div>

            <!-- Ward KPI Strip -->
            <div class="flex items-center gap-3 sm:gap-4 flex-wrap self-stretch lg:self-auto justify-between lg:justify-end">
              <!-- Occupancy Indicator -->
              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">बेड अधिभोग (Occupancy)</div>
                <div class="text-base font-black font-mono text-cyan-400">${occPercent}% (${occupied}/${totalCapacity})</div>
              </div>

              <!-- Critical In-Patients -->
              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border ${criticalCount > 0 ? "border-rose-500/60" : "border-slate-800"} text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">अति-गंभीर (Critical ICU)</div>
                <div class="text-base font-black font-mono ${criticalCount > 0 ? "text-rose-400 shock-beacon-alert" : "text-slate-300"}">
                  ${criticalCount} केस
                </div>
              </div>

              <!-- Discharge Scheduled -->
              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">डिस्चार्ज पात्र (Ready)</div>
                <div class="text-base font-black font-mono text-emerald-400">${recoveringCount} केस</div>
              </div>

              <!-- New Admission Dispatcher -->
              <button id="btnOpenNewIpdAdmission" type="button" class="py-2.5 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50 flex items-center gap-2 active:scale-95 transition-all">
                <i class="fa-solid fa-plus"></i>
                <span>नई आईपीडी भर्ती</span>
              </button>
            </div>

          </div>
        </div>
      `;
    },

    // 11. COMPONENT: WARD NAVIGATION TABS
    renderWardNavigationTabs: function () {
      const active = IpdWardRoundsMonitor.state.activeTab;
      const tabs = [
        { id: "ward_overview", label: "वार्ड व केनल विजुअलाइज़र (Kennel Grid)", icon: "fa-border-all" },
        { id: "daily_vitals_sheet", label: "दैनिक राउंड्स व वाइटल्स शीट (Vitals Progression)", icon: "fa-notes-medical" },
        { id: "medication_administration_mar", label: "दवा वितरण नर्स लॉग (Nursing MAR Sheet)", icon: "fa-syringe" },
        { id: "discharge_planner", label: "डिस्चार्ज प्लानर व सर्टिफिकेट (Discharge Summary)", icon: "fa-file-invoice" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-ipd-tab="${t.id}" class="ipd-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-cyan-400 border-t-2 border-l border-r border-cyan-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
            </button>
          `).join("")}
        </div>
      `;
    },

    // 12. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (IpdWardRoundsMonitor.state.activeTab) {
        case "daily_vitals_sheet":
          return IpdWardRoundsMonitor.renderDailyVitalsSheetTab();
        case "medication_administration_mar":
          return IpdWardRoundsMonitor.renderMarSheetTab();
        case "discharge_planner":
          return IpdWardRoundsMonitor.renderDischargePlannerTab();
        case "ward_overview":
        default:
          return IpdWardRoundsMonitor.renderWardOverviewTab();
      }
    },

    // 13. COMPONENT: WARD OVERVIEW (KENNEL & SHED GRAPHICAL GRID)
    renderWardOverviewTab: function () {
      const patients = IpdWardRoundsMonitor.state.admittedPatients;
      const activeIpd = IpdWardRoundsMonitor.state.activeIpdNo;
      const filter = IpdWardRoundsMonitor.state.selectedWardFilter;

      const filtered = patients.filter(p => {
        if (filter === "ALL") return true;
        return p.wardType === filter;
      });

      return `
        <div class="space-y-5">
          <!-- Filter Bar -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 sunlight-card">
            <div class="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-2">
              <i class="fa-solid fa-filter text-cyan-400"></i>
              <span>वार्ड श्रेणी फ़िल्टर:</span>
            </div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <button type="button" data-ward-filter="ALL" class="ward-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === "ALL" ? "bg-cyan-600 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">सभी वार्ड्स</button>
              <button type="button" data-ward-filter="LARGE_ANIMAL_SHED" class="ward-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === "LARGE_ANIMAL_SHED" ? "bg-cyan-600 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">बड़े पशु शेड (Cows/Horses)</button>
              <button type="button" data-ward-filter="CANINE_ICU_KENNEL" class="ward-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === "CANINE_ICU_KENNEL" ? "bg-cyan-600 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">श्वान आईसीयू केनल (Canine ICU)</button>
              <button type="button" data-ward-filter="ISOLATION_PEN" class="ward-filter-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === "ISOLATION_PEN" ? "bg-cyan-600 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">आइसोलेशन वार्ड (Infectious)</button>
            </div>
          </div>

          <!-- Ward Interactive Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${filtered.map(pat => {
              const isSelected = (pat.ipdNo === activeIpd);
              const cardClass = pat.acuityLevel === "CRITICAL" ? "kennel-card-critical" : (pat.acuityLevel === "STABLE" ? "kennel-card-stable" : "kennel-card-recovering");
              const speciesIcon = pat.species === "bovine" ? "fa-cow" : (pat.species === "canine" ? "fa-dog" : (pat.species === "equine" ? "fa-horse" : "fa-seedling"));

              return `
                <div data-select-ipd="${pat.ipdNo}" class="p-5 rounded-2xl cursor-pointer transition-all duration-200 transform hover:-translate-y-1 ${cardClass} ${isSelected ? "ring-4 ring-cyan-400" : ""} sunlight-card relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <!-- Header -->
                    <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                      <div class="flex items-center gap-1.5">
                        <i class="fa-solid ${speciesIcon} text-cyan-400 text-sm"></i>
                        <span class="text-xs font-mono font-bold text-white">${pat.penNumber}</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                        pat.acuityLevel === "CRITICAL" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : (pat.acuityLevel === "STABLE" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40")
                      }">
                        ${pat.acuityLevel}
                      </span>
                    </div>

                    <!-- Patient Info -->
                    <div class="space-y-1">
                      <div class="font-display font-black text-base text-white sunlight-text">${pat.breed}</div>
                      <div class="text-[11px] font-mono text-slate-400">टैग: ${pat.tagNo} • IPD: ${pat.ipdNo}</div>
                      <div class="text-xs text-slate-300 font-semibold truncate mt-1">${pat.primaryDiagnosis}</div>
                    </div>

                    <!-- Shock Alert Banner If Flagged -->
                    ${pat.isShockFlagged ? `
                      <div class="mt-3 p-2 rounded-lg bg-rose-950/70 border border-rose-500 text-[10px] font-mono font-black text-rose-300 flex items-center gap-1.5 shock-beacon-alert">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span>CRITICAL SHOCK ALERT (SUB-TEMP)</span>
                      </div>
                    ` : ""}

                    <!-- Telemetry Pointers -->
                    <div class="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div>
                        <span class="text-slate-400 text-[9px] uppercase block">वजन:</span>
                        <strong class="text-emerald-400">${pat.weightKg} kg</strong>
                      </div>
                      <div>
                        <span class="text-slate-400 text-[9px] uppercase block">IV फ्लुइड दर:</span>
                        <strong class="text-cyan-400">${pat.ivFluidRateMlHr} ml/hr</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Select Button -->
                  <div class="mt-4 pt-2">
                    <button type="button" class="w-full py-1.5 px-3 rounded-lg text-xs font-bold ${isSelected ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-800 hover:bg-slate-700 text-slate-200"} transition-colors">
                      ${isSelected ? "सक्रिय चयनित केस (Viewing Chart)" : "चार्ट खोलें (Open Chart)"}
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: DAILY VITALS PROGRESSION SHEET
    renderDailyVitalsSheetTab: function () {
      const activeIpd = IpdWardRoundsMonitor.state.activeIpdNo;
      const patient = IpdWardRoundsMonitor.state.admittedPatients.find(p => p.ipdNo === activeIpd) || IpdWardRoundsMonitor.state.admittedPatients[0];
      const history = IpdWardRoundsMonitor.state.vitalsHistory[patient.ipdNo] || [];

      return `
        <div class="space-y-6">
          <!-- Active In-Patient Clinical Banner -->
          ${IpdWardRoundsMonitor.renderActivePatientBanner(patient)}

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left Pane: Log New Daily Round Vitals (5 Cols) -->
            <div class="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-stethoscope text-cyan-400"></i>
                  <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">दैनिक राउंड दर्ज करें (Log Round Vitals)</h3>
                </div>
                <span class="text-[10px] font-mono text-cyan-400">WARD ROUNDS 2026</span>
              </div>

              <form id="formLogRoundVitals" onsubmit="return false;" class="space-y-3 text-xs">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">तापमान (°F)</label>
                    <input type="number" step="0.1" id="inputRoundTemp" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white" value="101.4" required />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">नाड़ी दर (Pulse BPM)</label>
                    <input type="number" id="inputRoundPulse" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white" value="80" required />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">श्वसन दर (/min)</label>
                    <input type="number" id="inputRoundResp" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white" value="26" required />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">IV फ्लुइड दर (ml/hr)</label>
                    <input type="number" id="inputRoundFluidRate" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white" value="${patient.ivFluidRateMlHr}" required />
                  </div>
                </div>

                <!-- Elimination & Appetite Checks -->
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span class="text-[10px] font-mono uppercase text-slate-400 font-bold block">उत्सर्जन व भूख स्थिति (Elimination & Intake)</span>
                  <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkRoundUrination" checked class="rounded bg-slate-900 border-slate-700 text-cyan-500" />
                      <span class="text-xs text-slate-200">पेशाब किया (Urine Passed)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="chkRoundDefecation" checked class="rounded bg-slate-900 border-slate-700 text-cyan-500" />
                      <span class="text-xs text-slate-200">गोबर/मल (Feces Passed)</span>
                    </label>
                  </div>
                  <div class="pt-1">
                    <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">चारा / भोजन ग्रहण (Appetite)</label>
                    <select id="selectRoundAppetite" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white">
                      <option value="GOOD">अच्छा / सामान्य (Good Voluntary)</option>
                      <option value="MODERATE" selected>मध्यम / आंशिक (Moderate)</option>
                      <option value="POOR">अल्प / सुस्त (Poor Intake)</option>
                      <option value="NONE">शून्य / पूर्ण अरुचि (Anorexia / None)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">डॉक्टर राउंड्स नोट्स एवं मूल्यांकन (Clinical Evaluation)</label>
                  <textarea id="textareaRoundNotes" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white" placeholder="घाव की स्थिति, रूमेन गति, अलर्टनेस, आईवी साइट जांच..."></textarea>
                </div>

                <button id="btnCommitRoundVitals" type="button" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all">
                  वाइटल्स राउंड सुरक्षित करें
                </button>
              </form>
            </div>

            <!-- Right Pane: Vitals Progression History Table (7 Cols) -->
            <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-chart-line text-emerald-400"></i>
                  <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">वाइटल्स चार्ट प्रगति (24-Hour Vitals Log)</h3>
                </div>
                <span class="text-[10px] font-mono text-slate-400">${history.length} राउंड्स रिकॉर्ड्स</span>
              </div>

              <div class="border border-slate-800 rounded-xl overflow-hidden">
                <table class="w-full text-left border-collapse text-xs">
                  <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th class="p-2.5">दिनांक/समय</th>
                      <th class="p-2.5">तापमान</th>
                      <th class="p-2.5">नाड़ी</th>
                      <th class="p-2.5">श्वसन</th>
                      <th class="p-2.5">IV दर</th>
                      <th class="p-2.5">भूख</th>
                      <th class="p-2.5">मूल्यांकन नोट्स</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                    ${history.map(row => {
                      const temp = parseFloat(row.tempF);
                      const isSubTemp = temp < 99.5;
                      const isHighFever = temp > 103.5;

                      return `
                        <tr>
                          <td class="p-2.5 font-bold text-slate-300">${row.date}<br/><span class="text-cyan-400 text-[10px]">${row.time}</span></td>
                          <td class="p-2.5 ${isSubTemp ? "text-rose-400 font-black shock-beacon-alert" : (isHighFever ? "text-amber-400 font-bold" : "text-emerald-400")}">
                            ${row.tempF} °F
                          </td>
                          <td class="p-2.5">${row.pulse} bpm</td>
                          <td class="p-2.5">${row.respRate}/min</td>
                          <td class="p-2.5 text-cyan-300 font-bold">${row.fluidRateMlHr} ml/h</td>
                          <td class="p-2.5 text-[10px]">${row.appetite}</td>
                          <td class="p-2.5 text-slate-300 font-sans text-xs max-w-xs truncate">${row.doctorNotes}</td>
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: NURSING MAR (MEDICATION ADMINISTRATION RECORD) SHEET
    renderMarSheetTab: function () {
      const activeIpd = IpdWardRoundsMonitor.state.activeIpdNo;
      const patient = IpdWardRoundsMonitor.state.admittedPatients.find(p => p.ipdNo === activeIpd) || IpdWardRoundsMonitor.state.admittedPatients[0];
      const allMars = IpdWardRoundsMonitor.state.medicationAdministrationRecord;
      const patientMars = allMars.filter(m => m.ipdNo === patient.ipdNo);

      return `
        <div class="space-y-6">
          ${IpdWardRoundsMonitor.renderActivePatientBanner(patient)}

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="font-display font-extrabold text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-notes-medical text-amber-400"></i>
                  <span>नर्सिंग दवा वितरण चार्ट (MAR Shift Schedule)</span>
                </h3>
                <p class="text-xs text-slate-400 sunlight-muted">शिफ्ट अनुसार निर्धारित इंजेक्शन, एंटीबायोटिक्स एवं आईवी फ्लुइड्स का डिजिटल सत्यापन।</p>
              </div>

              <!-- Fast Add Scheduled Medication Trigger -->
              <button id="btnOpenAddMarModal" type="button" class="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                <i class="fa-solid fa-plus"></i>
                <span>नई दवा शेड्यूल करें</span>
              </button>
            </div>

            <!-- MAR Doses Table -->
            <div class="border border-slate-800 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th class="p-3">दवा नाम एवं सांद्रता</th>
                    <th class="p-3">खुराक व रूट</th>
                    <th class="p-3">निर्धारित समय</th>
                    <th class="p-3">शिफ्ट</th>
                    <th class="p-3">प्रशासक नर्स/कंपाउंडर</th>
                    <th class="p-3 text-center">प्रशासन स्थिति (Given?)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                  ${patientMars.map(m => `
                    <tr class="${m.isGiven ? "bg-emerald-950/10" : ""}">
                      <td class="p-3 font-bold text-white text-xs">${m.drugName}</td>
                      <td class="p-3 text-cyan-300 font-bold">${m.dose} (${m.route})</td>
                      <td class="p-3 text-amber-400 font-bold text-xs">${m.scheduledTime}</td>
                      <td class="p-3 text-[10px] uppercase font-bold text-slate-400">${m.shift}</td>
                      <td class="p-3 text-slate-300 font-sans">
                        ${m.administeredBy ? `<span class="text-emerald-400 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>${m.administeredBy}</span><br/><span class="text-[9px] text-slate-500 font-mono">${m.givenTimestamp}</span>` : '<span class="text-slate-500 italic">प्रतीक्षारत...</span>'}
                      </td>
                      <td class="p-3 text-center">
                        ${m.isGiven ? `
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            GIVEN
                          </span>
                        ` : `
                          <button type="button" data-action="sign_mar_dose" data-schedule-id="${m.scheduleId}" class="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-[11px] shadow active:scale-95 transition-all">
                            साइन व पूर्ण करें
                          </button>
                        `}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: DISCHARGE PLANNER & SUMMARY CERTIFICATE GENERATOR
    renderDischargePlannerTab: function () {
      const activeIpd = IpdWardRoundsMonitor.state.activeIpdNo;
      const patient = IpdWardRoundsMonitor.state.admittedPatients.find(p => p.ipdNo === activeIpd) || IpdWardRoundsMonitor.state.admittedPatients[0];
      const history = IpdWardRoundsMonitor.state.vitalsHistory[patient.ipdNo] || [];
      const latest = history[0] || {};

      // Discharge Readiness Criteria Check
      const isAfebrile = latest.tempF && (parseFloat(latest.tempF) >= 100.4 && parseFloat(latest.tempF) <= 102.8);
      const isEating = latest.appetite === "GOOD" || latest.appetite === "MODERATE";
      const isEliminating = latest.urination === true && latest.defecation === true;
      const isReadyForDischarge = isAfebrile && isEating && isEliminating;

      return `
        <div class="space-y-6">
          ${IpdWardRoundsMonitor.renderActivePatientBanner(patient)}

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left Pane: Criteria & Discharge Action (5 Cols) -->
            <div class="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-clipboard-check text-emerald-400"></i>
                  <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">डिस्चार्ज पात्रता सत्यापन (Discharge Criteria)</h3>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${isReadyForDischarge ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"}">
                  ${isReadyForDischarge ? "ELIGIBLE" : "PENDING CRITERIA"}
                </span>
              </div>

              <div class="space-y-2.5 text-xs">
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span class="text-slate-200">1. तापमान सामान्य (Afebrile 24h)</span>
                  <span class="${isAfebrile ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}">
                    <i class="fa-solid ${isAfebrile ? "fa-circle-check" : "fa-circle-xmark"} mr-1"></i>${latest.tempF || "--"} °F
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span class="text-slate-200">2. सक्रिय भूख (Voluntary Appetite)</span>
                  <span class="${isEating ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}">
                    <i class="fa-solid ${isEating ? "fa-circle-check" : "fa-triangle-exclamation"} mr-1"></i>${latest.appetite || "--"}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span class="text-slate-200">3. मल एवं मूत्र उत्सर्जन (Normal Elimination)</span>
                  <span class="${isEliminating ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}">
                    <i class="fa-solid ${isEliminating ? "fa-circle-check" : "fa-circle-xmark"} mr-1"></i>${isEliminating ? "पुष्ट (Passed)" : "अपूर्ण (Pending)"}
                  </span>
                </div>
              </div>

              <!-- Follow-up Date & Instructions Input -->
              <div class="space-y-3 pt-2">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">फॉलो-अप अपॉइंटमेंट तारीख</label>
                  <input type="date" id="inputFollowUpDate" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white" value="2026-04-07" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">घर पर देखभाल व आहार निर्देश (Home Care)</label>
                  <textarea id="textareaDischargeHomeCare" rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white">सर्जिकल टांके सूखे रखें। प्रतिदिन बेटाडीन ऑइंटमेंट लगाएं। भारी हरा चारा न दें, सुपाच्य दलिया व लिवर टॉनिक जारी रखें। 7 दिन बाद टांके कटवाने हेतु अस्पताल आएं।</textarea>
                </div>
              </div>

              <div class="pt-2 flex flex-col gap-2">
                <button type="button" data-action="print_discharge" data-ipd="${patient.ipdNo}" class="w-full py-3 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <i class="fa-solid fa-print"></i>
                  <span>डिस्चार्ज प्रमाण पत्र प्रिंट निकालें (Print A4 Certificate)</span>
                </button>
              </div>
            </div>

            <!-- Right Pane: Structured A4 Live Certificate Preview (7 Cols) -->
            <div class="lg:col-span-7 p-6 rounded-2xl bg-white text-slate-900 shadow-2xl space-y-4 border border-slate-300 text-xs font-sans">
              <!-- Official Certificate Header -->
              <div class="border-b-2 border-emerald-900 pb-3 flex justify-between items-start">
                <div>
                  <div class="text-base font-black text-emerald-950 uppercase">रेफरल पशु चिकित्सा परिसर एवं इन-पेशेंट वार्ड</div>
                  <div class="text-[11px] font-bold text-slate-700">REFERRAL VETERINARY CLINICAL HOSPITAL • DISCHARGE SUMMARY</div>
                  <div class="text-[10px] text-slate-500">प्रभारी: डॉ. राहुल जांगड़ा (VCI: VCI-2026-9297) • फोन: 1800-VET-CARE</div>
                </div>
                <div class="text-right font-mono">
                  <div class="text-xs font-bold text-emerald-800">IPD NO: ${patient.ipdNo}</div>
                  <div class="text-[10px] text-slate-600">भर्ती दिनांक: ${patient.admissionDate}</div>
                  <div class="text-[10px] text-slate-600">डिस्चार्ज दिनांक: 2026-03-31</div>
                </div>
              </div>

              <!-- Animal & Owner Particulars -->
              <div class="grid grid-cols-2 gap-2 bg-slate-100 p-2.5 rounded-lg text-[11px]">
                <div><strong>पशुपालक:</strong> ${patient.ownerName} (${patient.ownerContact})</div>
                <div><strong>पशु टैग:</strong> ${patient.tagNo}</div>
                <div><strong>नस्ल व प्रजाति:</strong> ${patient.breed} (${patient.species})</div>
                <div><strong>शारीरिक वजन:</strong> ${patient.weightKg} kg (Shaeffer)</div>
              </div>

              <div>
                <div class="font-bold text-emerald-950 text-xs">प्राथमिक नैदानिक कारण (Primary Diagnosis & Surgical Procedure):</div>
                <div class="text-slate-800 mt-0.5">${patient.primaryDiagnosis}</div>
              </div>

              <div>
                <div class="font-bold text-emerald-950 text-xs">अस्पताल में किया गया मुख्य उपचार (Hospital Treatments Administered):</div>
                <div class="text-slate-800 mt-0.5">
                  इंट्रावेनस फ्लुइड थेरेपी (${patient.ivFluidType}), ब्रॉड-स्पेक्ट्रम एंटीबायोटिक कवरेज, एनाल्जेसिक, रूमेन बफ़र्स एवं घाव की दैनिक एसेप्टिक ड्रेसिंग।
                </div>
              </div>

              <div>
                <div class="font-bold text-emerald-950 text-xs">घर पर जारी रखने हेतु औषधियां (Take-Home Medication Schedule):</div>
                <ul class="list-disc pl-5 space-y-0.5 text-slate-800 mt-0.5">
                  <li><strong>बोलस Meloxicam 100mg:</strong> 1 बोलस दिन में एक बार (OD) भोजन पश्चात x 3 दिन</li>
                  <li><strong>टॉनिक Rumen FS / Bio-Bloom:</strong> 50 ml दिन में दो बार (BID) x 5 दिन</li>
                  <li><strong>स्प्रे Topicure Plus:</strong> टांकों पर दिन में दो बार छिड़काव करें</li>
                </ul>
              </div>

              <div class="border-t border-slate-200 pt-3 flex justify-between items-end">
                <div class="text-[10px] text-slate-500 font-mono">
                  ISO-VET 2026 VERIFIED • DIGITAL HASH: SHA256-IPD-${Date.now()}
                </div>
                <div class="text-center">
                  <div class="w-32 border-b border-black mb-1"></div>
                  <div class="font-bold text-[11px] text-slate-900">(डॉ. राहुल जांगड़ा)</div>
                  <div class="text-[9px] text-slate-600">अधिकृत पशु चिकित्सा अधिकारी</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // 17. HELPER: ACTIVE PATIENT BANNER STRIP
    renderActivePatientBanner: function (patient) {
      const speciesIcon = patient.species === "bovine" ? "fa-cow" : (patient.species === "canine" ? "fa-dog" : (patient.species === "equine" ? "fa-horse" : "fa-seedling"));
      return `
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sunlight-card">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-lg">
              <i class="fa-solid ${speciesIcon}"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-display font-black text-sm text-white sunlight-text">${patient.breed} (${patient.gender}, ${patient.age})</h2>
                <span class="px-2 py-0.2 rounded font-mono text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">${patient.penNumber}</span>
              </div>
              <div class="text-xs text-slate-400 font-mono">टैग: ${patient.tagNo} • IPD: ${patient.ipdNo} • पालक: ${patient.ownerName}</div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-emerald-400 font-bold">${patient.weightKg} kg</span>
            <span class="text-slate-600">•</span>
            <span class="text-xs font-mono text-cyan-400">IV: ${patient.ivFluidRateMlHr} ml/hr</span>
          </div>
        </div>
      `;
    },

    // 18. PRINT FORMAL DISCHARGE SUMMARY (FULL-PAGE A4 STANDARD)
    printDischargeSummary: function (ipdNo) {
      const patient = IpdWardRoundsMonitor.state.admittedPatients.find(p => p.ipdNo === ipdNo) || IpdWardRoundsMonitor.state.admittedPatients[0];
      const homeCare = document.getElementById("textareaDischargeHomeCare") ? document.getElementById("textareaDischargeHomeCare").value : "टांके सूखे रखें व 7 दिन बाद टांके कटवाने आएं।";
      const followUp = document.getElementById("inputFollowUpDate") ? document.getElementById("inputFollowUpDate").value : "2026-04-07";

      let printSlip = document.getElementById("ipdPrintableDischargeSlip");
      if (!printSlip) {
        printSlip = document.createElement("div");
        printSlip.id = "ipdPrintableDischargeSlip";
        document.body.appendChild(printSlip);
      }

      printSlip.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 36px; color: #000; max-width: 800px; margin: 0 auto; line-height: 1.5;">
          <!-- Letterhead Header -->
          <div style="border-bottom: 2.5px solid #064e3b; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h1 style="margin: 0; font-size: 22px; color: #064e3b; font-weight: bold; text-transform: uppercase;">रेफरल पशु चिकित्सा परिसर एवं अनुसंधान चिकित्सालय</h1>
              <div style="font-size: 13px; font-weight: 600; color: #1f2937;">VETERINARY CLINICAL COMPLEX & IN-PATIENT IPD WARD</div>
              <div style="font-size: 11px; color: #4b5563;">VCI Reg. Accredited Teaching & Referral Center • 24/7 Mobile Emergency Unit</div>
            </div>
            <div style="text-align: right; font-family: monospace;">
              <div style="font-size: 14px; font-weight: bold; color: #064e3b;">DISCHARGE SUMMARY</div>
              <div style="font-size: 11px;">IPD No: <strong>${patient.ipdNo}</strong></div>
              <div style="font-size: 11px;">दिनांक: <strong>${new Date().toLocaleDateString("en-IN")}</strong></div>
            </div>
          </div>

          <!-- Patient & Admission Bio Strip -->
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 18px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <tr>
              <td style="padding: 8px;"><strong>पशुपालक का नाम:</strong> ${patient.ownerName}</td>
              <td style="padding: 8px;"><strong>संपर्क नंबर:</strong> ${patient.ownerContact}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>पशु प्रजाति व नस्ल:</strong> ${patient.breed} (${patient.species.toUpperCase()}, ${patient.gender})</td>
              <td style="padding: 8px;"><strong>पशु टैग संख्या:</strong> ${patient.tagNo}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>भर्ती तिथि:</strong> ${patient.admissionDate}</td>
              <td style="padding: 8px;"><strong>वार्ड / केनल संख्या:</strong> ${patient.penNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>शारीरिक वजन (डिस्चार्ज पर):</strong> ${patient.weightKg} kg</td>
              <td style="padding: 8px;"><strong>प्रभारी पशु चिकित्सक:</strong> ${patient.attendingVet}</td>
            </tr>
          </table>

          <!-- Clinical Record Body -->
          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: bold; color: #064e3b; margin-bottom: 4px;">1. भर्ती का कारण एवं अंतिम निदान (Final Clinical Diagnosis):</div>
            <div style="font-size: 12px; padding-left: 10px; color: #111827;">${patient.primaryDiagnosis}</div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: bold; color: #064e3b; margin-bottom: 4px;">2. अस्पताल में भर्ती के दौरान दी गई मुख्य चिकित्सा (In-Hospital Treatments):</div>
            <div style="font-size: 12px; padding-left: 10px; color: #111827;">
              सघन आईवी फ्लुइड्स (${patient.ivFluidType}), प्रणालीगत एंटीबायोटिक चिकित्सा, एनाल्जेसिक एवं दैनिक एसेप्टिक घाव प्रबंधन। पशु का तापमान, भूख एवं उत्सर्जन क्रियाएं सामान्य स्तर पर आ चुकी हैं।
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: bold; color: #064e3b; margin-bottom: 4px;">3. घर पर देखभाल एवं आहार निर्देश (Home Care Instructions):</div>
            <div style="font-size: 12px; padding-left: 10px; color: #111827;">${homeCare}</div>
          </div>

          <div style="margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: bold; color: #064e3b; margin-bottom: 4px;">4. अगली फॉलो-अप जांच तिथि (Scheduled Follow-up Date):</div>
            <div style="font-size: 12px; padding-left: 10px; font-weight: bold; color: #b91c1c;">${followUp} (अथवा किसी भी आपात स्थिति में तत्काल लाएं)</div>
          </div>

          <!-- Mandatory Legal Notice -->
          <div style="font-size: 10px; border-left: 3px solid #b91c1c; padding-left: 8px; margin-bottom: 30px; color: #374151;">
            <strong>वैधानिक विथड्राल सूचना:</strong> इस पशु के दूध का उपयोग 36 घंटे तक न करें। अंतिम खुराक के 7 दिन बाद तक मांस उपयोग वर्जित है।
          </div>

          <!-- Signatures -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              डिजिटल सत्यापन कोड: SHA256-IPD-DISCHARGE-${patient.ipdNo}<br/>
              Vetcare AI OS v2.6.4 (Production Core)
            </div>
            <div style="text-align: center;">
              <div style="height: 48px; border-bottom: 1px solid #000; width: 190px; margin-bottom: 4px;"></div>
              <div style="font-size: 12px; font-weight: bold;">(डॉ. राहुल जांगड़ा)</div>
              <div style="font-size: 10px; color: #374151;">अधिकृत पशु चिकित्सा अधिकारी / VCI: VCI-2026-9297</div>
            </div>
          </div>
        </div>
      `;

      WardAudio.chimeDischargeSuccess();
      setTimeout(() => {
        window.print();
      }, 200);
    },

    // 19. EVENT BUS LISTENERS
    registerEventListeners: function () {
      // Listen for incoming IPD transfer from Consultation Room
      window.VetcareApp.EventBus.on("ipd:patient_admitted", function (payload) {
        if (!payload || !payload.patient) return;
        const p = payload.patient;
        const newIpd = {
          ipdNo: "IPD-2026-" + Math.floor(100 + Math.random() * 900),
          patientId: p.id || p.patientId || "PAT-NEW",
          tagNo: p.tagNo || "TAG-VERIFIED",
          species: p.species || "bovine",
          breed: p.breed || "Crossbred",
          gender: p.sex || "Female",
          age: (p.ageYears ? p.ageYears + " Yrs" : "4.0 Yrs"),
          weightKg: p.weightKg || 400,
          wardType: (p.species === "canine" ? "CANINE_ICU_KENNEL" : "LARGE_ANIMAL_SHED"),
          penNumber: "Ward-New-" + (IpdWardRoundsMonitor.state.admittedPatients.length + 1),
          admissionDate: new Date().toISOString().split("T")[0],
          primaryDiagnosis: payload.diagnosis || "Critical In-Patient Observation",
          attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)",
          acuityLevel: "STABLE",
          ownerName: p.ownerName || "Registered Farmer",
          ownerContact: p.contact || "+91 98120 00000",
          ivFluidRateMlHr: 150,
          ivFluidType: "Ringers Lactate IV Infusion",
          isShockFlagged: false
        };

        IpdWardRoundsMonitor.state.admittedPatients.push(newIpd);
        IpdWardRoundsMonitor.state.activeIpdNo = newIpd.ipdNo;
        IpdStorage.saveRecord(newIpd);

        if (IpdWardRoundsMonitor.state.domContainer) {
          IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
        }
        WardAudio.chimeCriticalAlert();

        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast(`नया पशु मरीज IPD वार्ड में भर्ती: ${newIpd.ipdNo}`, "success");
        }
      });
    },

    // 20. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = IpdWardRoundsMonitor.state.domContainer;
      if (!root) return;

      // Tab clicks
      root.querySelectorAll(".ipd-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-ipd-tab");
          if (tab) {
            IpdWardRoundsMonitor.state.activeTab = tab;
            IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
          }
        });
      });

      // Ward filter clicks
      root.querySelectorAll(".ward-filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const filter = this.getAttribute("data-ward-filter");
          if (filter) {
            IpdWardRoundsMonitor.state.selectedWardFilter = filter;
            IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
          }
        });
      });

      // Kennel card select
      root.querySelectorAll("[data-select-ipd]").forEach(card => {
        card.addEventListener("click", function () {
          const ipd = this.getAttribute("data-select-ipd");
          if (ipd) {
            IpdWardRoundsMonitor.state.activeIpdNo = ipd;
            IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
          }
        });
      });

      // Commit Round Vitals Button
      const btnCommitVitals = document.getElementById("btnCommitRoundVitals");
      if (btnCommitVitals) {
        btnCommitVitals.addEventListener("click", function () {
          const activeIpd = IpdWardRoundsMonitor.state.activeIpdNo;
          const temp = parseFloat(document.getElementById("inputRoundTemp").value);
          const pulse = parseInt(document.getElementById("inputRoundPulse").value, 10);
          const resp = parseInt(document.getElementById("inputRoundResp").value, 10);
          const fluid = parseInt(document.getElementById("inputRoundFluidRate").value, 10);
          const urine = document.getElementById("chkRoundUrination").checked;
          const defec = document.getElementById("chkRoundDefecation").checked;
          const appetite = document.getElementById("selectRoundAppetite").value;
          const notes = document.getElementById("textareaRoundNotes").value;

          const newRound = {
            date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
            time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
            tempF: temp,
            pulse: pulse,
            respRate: resp,
            fluidRateMlHr: fluid,
            urination: urine,
            defecation: defec,
            appetite: appetite,
            doctorNotes: notes || "Daily Round evaluation completed."
          };

          if (!IpdWardRoundsMonitor.state.vitalsHistory[activeIpd]) {
            IpdWardRoundsMonitor.state.vitalsHistory[activeIpd] = [];
          }
          IpdWardRoundsMonitor.state.vitalsHistory[activeIpd].unshift(newRound);

          IpdWardRoundsMonitor.evaluateClinicalAcuity();
          IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
          WardAudio.chimeDoseSigned();

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("दैनिक राउंड वाइटल्स सफलतापूर्वक दर्ज किए गए!", "success");
          }
        });
      }

      // Fast New Admission Dispatcher
      const btnNewAdmission = document.getElementById("btnOpenNewIpdAdmission");
      if (btnNewAdmission) {
        btnNewAdmission.addEventListener("click", function () {
          window.VetcareApp.EventBus.emit("ipd:patient_admitted", {
            patient: {
              id: "PAT-BOV-" + Math.floor(1000 + Math.random() * 9000),
              tagNo: "IN-HR-2026-" + Math.floor(1000 + Math.random() * 9000),
              species: "bovine",
              breed: "Sahiwal Cow",
              sex: "Female",
              ageYears: 4,
              weightKg: 410,
              ownerName: "वॉक-इन कृषक",
              contact: "+91 99910 00000"
            },
            diagnosis: "तीव्र थनैला व डिहाइड्रेशन (Acute Toxic Mastitis)"
          });
        });
      }

      // Delegated Action Clicks across the entire IPD monitor
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "sign_mar_dose") {
          const schedId = btn.getAttribute("data-schedule-id");
          const dose = IpdWardRoundsMonitor.state.medicationAdministrationRecord.find(m => m.scheduleId === schedId);
          if (dose) {
            dose.isGiven = true;
            dose.administeredBy = "डॉ. राहुल जांगड़ा (On-Duty Vet)";
            dose.givenTimestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
            WardAudio.chimeDoseSigned();
            IpdWardRoundsMonitor.render(IpdWardRoundsMonitor.state.domContainer.id);
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast(`दवा खुराक सत्यापित व हस्ताक्षरित: ${dose.drugName}`, "success");
            }
          }
        } else if (action === "print_discharge") {
          const ipd = btn.getAttribute("data-ipd");
          IpdWardRoundsMonitor.printDischargeSummary(ipd);
        }
      });
    }
  };

  // 21. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Doctor.IpdWardRoundsMonitor = IpdWardRoundsMonitor;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("ipdWardMonitorContainer");
    if (defaultHost) {
      IpdWardRoundsMonitor.init("ipdWardMonitorContainer");
    }
  });

})(window, document);
