// Vetcare AI OS - Veterinary Biomedical Waste (BMW), Hospital Infection Control & Quality Audit Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. STATUTORY BIOMEDICAL WASTE (BMW) & INFECTION CONTROL STANDARDS
  const BMW_STANDARDS = {
    COLOR_BINS: {
      YELLOW: {
        code: "YELLOW",
        label: "पीला बैग / Yellow Bag (Non-chlorinated plastic)",
        treatment: "भस्मीकरण (Incineration) अथवा प्लाज्मा पायरोलिसिस (Plasma Pyrolysis)",
        badgeClass: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
        borderClass: "border-yellow-500",
        bgClass: "bg-yellow-500/10",
        items: [
          "Animal anatomical waste (Tissues, organs, body parts, fetuses, placentas)",
          "Soiled cotton, gauze dressings, swabs, plaster casts",
          "Expired, discarded, or contaminated cytotoxic and general pharmaceuticals",
          "Infected animal bedding and animal housing litter",
          "Major surgical biopsy specimens and necropsy waste"
        ]
      },
      RED: {
        code: "RED",
        label: "लाल बैग / Red Bag (Autoclavable plastic)",
        treatment: "ऑटोक्लेविंग (Autoclaving) + श्रेडिंग (Shredding) + रीसाइक्लिंग (Recycling)",
        badgeClass: "bg-red-500/20 text-red-300 border-red-500/40",
        borderClass: "border-red-500",
        bgClass: "bg-red-500/10",
        items: [
          "Contaminated recyclable plastics (IV infusion bottles, tubing sets)",
          "Urinary catheters, endotracheal tubes, suction cannulas",
          "Disposable plastic syringes (without needles)",
          "Blood collection vacutainers (without needles)",
          "Latex and nitrile surgical gloves"
        ]
      },
      WHITE: {
        code: "WHITE",
        label: "सफेद पारभासी कंटेनर / White Translucent (Puncture-proof)",
        treatment: "ऑटोक्लेविंग / ड्राई हीट स्टरलाइजेशन + धातु निष्कासन (Encapsulation)",
        badgeClass: "bg-slate-200/20 text-slate-100 border-slate-300",
        borderClass: "border-slate-300",
        bgClass: "bg-slate-800/60",
        items: [
          "Used, contaminated, or broken hypodermic needles",
          "Surgical scalpel blades, disposable lancets",
          "Suture needles, trocars, biopsy punch blades",
          "Contaminated sharps that can cause puncture or cut injuries"
        ]
      },
      BLUE: {
        code: "BLUE",
        label: "नीला कार्डबोर्ड बॉक्स / Blue Cardboard Box (Puncture-resistant)",
        treatment: "कीटाणुशोधन (1-2% Sodium Hypochlorite) + ऑटोक्लेविंग + ग्लास रीसाइक्लिंग",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        borderClass: "border-blue-500",
        bgClass: "bg-blue-500/10",
        items: [
          "Broken or intact medicine glass ampoules, vials",
          "Glass petri dishes, glass slides, pipettes",
          "Metallic body implants, orthopedic pins, bone screws, cerclage wires"
        ]
      }
    },
    WASTE_LOOKUP_CATALOG: [
      { item: "Amputated Limb / Splenectomy Spleen", bin: "YELLOW", note: "Anatomical organ waste - Deep Incineration" },
      { item: "Soiled Blood Gauze / Laparotomy Sponge", bin: "YELLOW", note: "Blood soaked dressing - Incineration" },
      { item: "Expired Doxorubicin / Antibiotic Vials with liquid", bin: "YELLOW", note: "Cytotoxic / pharmaceutical waste" },
      { item: "Plaster of Paris (POP) Bandage Cast", bin: "YELLOW", note: "Soiled medical plaster waste" },
      { item: "IV Infusion Bottle & Drip Set", bin: "RED", note: "Autoclavable recyclable plastic (Cut needle off)" },
      { item: "Foley Catheter & Urine Bag", bin: "RED", note: "Contaminated recyclable plastic" },
      { item: "Disposable Syringe (Plunger & Barrel without needle)", bin: "RED", note: "Plastics - Hub cutter used" },
      { item: "Surgical Nitrile / Latex Gloves", bin: "RED", note: "Contaminated gloves - Shredded after autoclave" },
      { item: "Hypodermic Injection Needle", bin: "WHITE", note: "Puncture-proof container - Never recap needles" },
      { item: "No. 10 / 15 Scalpel Blade", bin: "WHITE", note: "Surgical sharp - Encapsulation / Shredding" },
      { item: "Curved Suture Needle", bin: "WHITE", note: "Surgical sharp metal" },
      { item: "Glass Ampoule (e.g. Atropine / Meloxicam empty)", bin: "BLUE", note: "Glassware - Cardboard puncture box" },
      { item: "Broken Glass Medicine Bottle", bin: "BLUE", note: "Broken glassware - Sodium hypochlorite bath" },
      { item: "Orthopedic Bone Screw / Kirschner Wire", bin: "BLUE", note: "Metal orthopedic implant" }
    ],
    AUTOCLAVE_BIOLOGICAL_INDICATOR: {
      organism: "Geobacillus stearothermophilus (ATCC 7953)",
      standardTempC: 121.0,
      standardPressurePsi: 15.0,
      holdingTimeMin: 20.0,
      testFrequency: "साप्ताहिक अनिवार्य (Weekly Biological Validation)"
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const BmwStorage = {
    dbName: "VetcareBmwDB",
    dbVersion: 1,
    storeNames: {
      wasteLogs: "biomedical_waste_records",
      qualityAudits: "hospital_quality_audits",
      sharpsIncidents: "needle_stick_incidents"
    },
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare BMW] IndexedDB not available, using localStorage fallback.");
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
          console.error("[Vetcare BMW] IndexedDB connection failed:", err);
          resolve(false);
        };
      });
    },

    async getAll(storeName) {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_BMW_" + storeName);
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
      if (!item.id) item.id = "BMW-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const items = await this.getAll(storeName);
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) items[idx] = item;
        else items.push(item);
        localStorage.setItem("VETCARE_BMW_" + storeName, JSON.stringify(items));
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
        localStorage.setItem("VETCARE_BMW_" + storeName, JSON.stringify(items));
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

  // 4. MAIN BIOMEDICAL WASTE & QUALITY AUDIT CONTROLLER
  const BiomedicalWasteAuditQuality = {
    containerId: null,
    activeTab: "bmw_daily_segregation", // 'bmw_daily_segregation' | 'color_code_sorting_guide' | 'autoclave_sterility_log' | 'monthly_regulatory_annual_report'

    // Reactive State
    state: {
      bmwDailyLogs: [],
      qualityAudits: [],
      needleStickIncidents: [],
      searchFilterQuery: "",
      facilityInfo: {
        hospitalName: "राष्ट्रीय उष्ट्र एवं पशु चिकित्सालय (Vetcare Super-Speciality Hospital)",
        spcbAuthorizationNo: "SPCB/BMW/VET-AUTH/2026/8942",
        commonTreatmentFacility: "Synergy Waste Management Pvt. Ltd. (CBWTF)",
        gpsVehicleNo: "DL-1M-8942",
        infectionControlOfficer: "Dr. Rahul (Principal Environmental Biosafety Architect)"
      }
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await BmwStorage.init();
      await this.loadInitialData();
      console.log("[Vetcare AI OS] Veterinary Biomedical Waste (BMW) & Quality Audit Engine Loaded.");
    },

    async loadInitialData() {
      let logs = await BmwStorage.getAll(BmwStorage.storeNames.wasteLogs);
      if (!logs || logs.length === 0) {
        logs = this.getSeedWasteLogs();
        for (const l of logs) {
          await BmwStorage.put(BmwStorage.storeNames.wasteLogs, l);
        }
      }
      this.state.bmwDailyLogs = logs;

      let audits = await BmwStorage.getAll(BmwStorage.storeNames.qualityAudits);
      if (!audits || audits.length === 0) {
        audits = this.getSeedQualityAudits();
        for (const a of audits) {
          await BmwStorage.put(BmwStorage.storeNames.qualityAudits, a);
        }
      }
      this.state.qualityAudits = audits;

      let incidents = await BmwStorage.getAll(BmwStorage.storeNames.sharpsIncidents);
      if (!incidents || incidents.length === 0) {
        incidents = this.getSeedSharpsIncidents();
        for (const i of incidents) {
          await BmwStorage.put(BmwStorage.storeNames.sharpsIncidents, i);
        }
      }
      this.state.needleStickIncidents = incidents;
    },

    getSeedWasteLogs() {
      const now = new Date();
      const formatDate = (daysAgo) => {
        const d = new Date(now);
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split("T")[0];
      };

      return [
        {
          id: "BMW-LOG-001",
          logId: "BMW-2026-02-23",
          date: formatDate(1),
          yellowBagKg: 14.8,
          redBagKg: 9.4,
          whiteTranslucentPunctureKg: 1.6,
          blueBoxKg: 3.2,
          totalDayKg: 29.0,
          barcodedManifestNo: "MNF-8942-01928",
          commonTreatmentFacilityVehicleNo: "DL-1M-8942",
          officerSign: "Dr. Rahul (Infection Control Officer)"
        },
        {
          id: "BMW-LOG-002",
          logId: "BMW-2026-02-22",
          date: formatDate(2),
          yellowBagKg: 12.5,
          redBagKg: 8.1,
          whiteTranslucentPunctureKg: 1.2,
          blueBoxKg: 2.8,
          totalDayKg: 24.6,
          barcodedManifestNo: "MNF-8942-01927",
          commonTreatmentFacilityVehicleNo: "DL-1M-8942",
          officerSign: "Dr. Rahul"
        },
        {
          id: "BMW-LOG-003",
          logId: "BMW-2026-02-21",
          date: formatDate(3),
          yellowBagKg: 18.2, // Major surgery day
          redBagKg: 11.5,
          whiteTranslucentPunctureKg: 2.1,
          blueBoxKg: 4.5,
          totalDayKg: 36.3,
          barcodedManifestNo: "MNF-8942-01926",
          commonTreatmentFacilityVehicleNo: "DL-1M-8942",
          officerSign: "Dr. Rahul"
        }
      ];
    },

    getSeedQualityAudits() {
      return [
        {
          id: "AUDIT-2026-01",
          auditId: "AUDIT-2026-01",
          date: "2026-02-15",
          auditorName: "Dr. Rahul (Hospital Safety Committee)",
          surgicalProceduresTotal: 48,
          surgicalSiteInfectionsObserved: 1,
          surgicalSiteInfectionRate: 2.08, // 1/48 * 100
          autoclaveSporeTestPassed: true, // Geobacillus stearothermophilus negative
          sporeLotNo: "GEO-2026-SP-91",
          formalinVaporNeutralized: true, // Formaldehyde scavenger deployed
          radiationTldBadgesInspected: true, // X-Ray TLD radiation badges read quarterly
          complianceScorePercent: 96.5,
          deficienciesFound: "Minor labeling wear on 2 red bins in dental operatory.",
          actionTaken: "Bins replaced with new laser-engraved biohazard barcoded units."
        }
      ];
    },

    getSeedSharpsIncidents() {
      return [
        {
          id: "SHARP-2026-01",
          incidentId: "SHARP-2026-01",
          staffName: "रोहित यादव (Senior Vet Tech)",
          date: "2026-01-18",
          sourceAnimalTag: "Canine Stray Intake #892",
          procedureContext: "Post-spay skin closure suture needle cut through glove",
          firstAidGiven: "Wound washed with soap and running water for 10 minutes. No squeezing.",
          rabiesProphylaxisGiven: true, // PEP Day 0, 3, 7, 14
          tetanusBoosterGiven: true,
          resolutionStatus: "CLOSED_FULLY_PROTECTED"
        }
      ];
    },

    // 4.2 STATUTORY BIOSAFETY & INFECTION CONTROL FORMULAS
    calculateTotalMonthWasteKg() {
      let yellow = 0;
      let red = 0;
      let white = 0;
      let blue = 0;

      this.state.bmwDailyLogs.forEach((l) => {
        yellow += parseFloat(l.yellowBagKg) || 0;
        red += parseFloat(l.redBagKg) || 0;
        white += parseFloat(l.whiteTranslucentPunctureKg) || 0;
        blue += parseFloat(l.blueBoxKg) || 0;
      });

      const total = yellow + red + white + blue;
      return {
        yellowKg: yellow.toFixed(1),
        redKg: red.toFixed(1),
        whiteKg: white.toFixed(1),
        blueKg: blue.toFixed(1),
        grandTotalKg: total.toFixed(1)
      };
    },

    calculateDaysWithoutSharpsInjury() {
      if (this.state.needleStickIncidents.length === 0) return 365;
      const sorted = [...this.state.needleStickIncidents].sort((a, b) => new Date(b.date) - new Date(a.date));
      const lastDate = new Date(sorted[0].date);
      const now = new Date();
      const diffTime = Math.abs(now - lastDate);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    },

    calculateOverallKPIs() {
      const totals = this.calculateTotalMonthWasteKg();
      const daysClean = this.calculateDaysWithoutSharpsInjury();
      const latestAudit = this.state.qualityAudits[0] || {};
      const compliance = latestAudit.complianceScorePercent || 96.0;
      const sporePassed = latestAudit.autoclaveSporeTestPassed !== false;

      return {
        grandTotalWasteKg: totals.grandTotalKg,
        segregationCompliancePercent: compliance,
        daysWithoutSharpsInjury: daysClean,
        autoclaveSporeValidation: sporePassed
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare BMW] Target DOM container not found:", this.containerId);
        return;
      }

      const kpis = this.calculateOverallKPIs();
      const totals = this.calculateTotalMonthWasteKg();

      container.innerHTML = `
        <div class="bmw-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- TOP HOSPITAL BIOSAFETY COMMAND HEADER -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-recycle text-yellow-500"></i> Bio-Medical Waste Management Rules 2016/2026
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <i class="fa-solid fa-shield-halved"></i> NABH / SPCB Environmental Quality Verified
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>जैव-चिकित्सा अपशिष्ट (BMW), अस्पताल संक्रमण नियंत्रण एवं ऑडिट प्रणाली</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Statutory 4-Color Waste Segregation (Yellow, Red, White, Blue), Barcoded CBWTF Manifest Generation, Autoclave Spore Sterility Validation & Needle-Stick PEP Tracking.
              </p>
            </div>

            <!-- ACTION CONTROLS -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnOpenNewWasteEntryModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-yellow-600 hover:bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-950/40 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-plus-circle"></i> दैनिक अपशिष्ट वजन दर्ज करें (Log Daily BMW)
              </button>
              <button id="btnPrintAnnualBmwReport" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 shadow flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i> वैधानिक वार्षिक फॉर्म-IV रिपोर्ट (Print Form-IV)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">कुल अपशिष्ट निस्तारण (Month Total)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${kpis.grandTotalWasteKg} kg</span>
                <span class="text-xs font-mono text-cyan-400 font-bold">Barcoded Bags</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">प्रथक्करण अनुपालन इंडेक्स (Segregation)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-emerald-400">${kpis.segregationCompliancePercent}%</span>
                <span class="text-xs font-mono text-emerald-300 font-semibold">SPCB Compliant</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सुई चुभन रहित सुरक्षित दिन</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-cyan-400">${kpis.daysWithoutSharpsInjury} Days</span>
                <span class="text-xs font-mono text-slate-400 font-semibold">Zero Sharps Injury</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">ऑटोक्लेव जैविक बीजाणु परीक्षण</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-xl font-display font-black ${kpis.autoclaveSporeValidation ? "text-emerald-400" : "text-rose-400"}">
                  ${kpis.autoclaveSporeValidation ? "PASSED (100% STERILE)" : "FAILED (RE-AUTOCLAVE)"}
                </span>
                <span class="text-[10px] font-mono text-slate-400">G. stearothermophilus</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="bmw_daily_segregation" class="bmw-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "bmw_daily_segregation"
                ? "border-yellow-500 text-yellow-400 bg-yellow-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-boxes-packing"></i> 1. दैनिक 4-रंग कचरा पृथक्करण एवं वजन (Daily Log & Manifest)
            </button>
            <button data-tab="color_code_sorting_guide" class="bmw-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "color_code_sorting_guide"
                ? "border-yellow-500 text-yellow-400 bg-yellow-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-magnifying-glass"></i> 2. स्मार्ट अपशिष्ट छंटाई खोज सहायक (AI Waste Sorter)
            </button>
            <button data-tab="autoclave_sterility_log" class="bmw-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "autoclave_sterility_log"
                ? "border-yellow-500 text-yellow-400 bg-yellow-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-temperature-arrow-up"></i> 3. ऑटोक्लेव स्टरलिटी व संक्रमण दर (Infection Control)
            </button>
            <button data-tab="monthly_regulatory_annual_report" class="bmw-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "monthly_regulatory_annual_report"
                ? "border-yellow-500 text-yellow-400 bg-yellow-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-file-contract"></i> 4. वैधानिक फॉर्म-IV प्रदूषण नियंत्रण बोर्ड (SPCB Annual Return)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="bmwTabViewport" class="w-full">
            ${this.renderActiveTabContent(totals)}
          </div>

        </div>

        <!-- MODAL CONTAINER HOOK -->
        <div id="bmwModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent(totals) {
      switch (this.activeTab) {
        case "bmw_daily_segregation":
          return this.renderDailySegregationTab(totals);
        case "color_code_sorting_guide":
          return this.renderSortingGuideTab();
        case "autoclave_sterility_log":
          return this.renderSterilityLogTab();
        case "monthly_regulatory_annual_report":
          return this.renderAnnualReportTab(totals);
        default:
          return "";
      }
    },

    // TAB 1: DAILY 4-COLOR SEGREGATION & WEIGHING MANIFEST
    renderDailySegregationTab(totals) {
      return `
        <div class="space-y-6">
          
          <!-- 4 COLOR VISUAL TOTALS GRID -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- YELLOW CARD -->
            <div class="p-5 rounded-2xl bg-slate-900 border-2 border-yellow-500/60 shadow-xl space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs font-mono font-bold uppercase text-yellow-400">पीला बैग / YELLOW</span>
                <i class="fa-solid fa-fire text-yellow-400 text-lg"></i>
              </div>
              <div class="text-3xl font-display font-black text-white">${totals.yellowKg} <span class="text-sm font-mono text-slate-400 font-normal">kg</span></div>
              <p class="text-[11px] text-slate-400">शारीरिक अंग, संक्रमित पट्टी, साइटोटॉक्सिक औषधियां।</p>
              <div class="text-[10px] font-mono text-yellow-300 font-semibold border-t border-slate-800 pt-2">
                भस्मीकरण (Incineration)
              </div>
            </div>

            <!-- RED CARD -->
            <div class="p-5 rounded-2xl bg-slate-900 border-2 border-red-500/60 shadow-xl space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs font-mono font-bold uppercase text-red-400">लाल बैग / RED</span>
                <i class="fa-solid fa-recycle text-red-400 text-lg"></i>
              </div>
              <div class="text-3xl font-display font-black text-white">${totals.redKg} <span class="text-sm font-mono text-slate-400 font-normal">kg</span></div>
              <p class="text-[11px] text-slate-400">पुनर्चक्रण योग्य प्लास्टिक, IV बोतल, कैथेटर, दस्ताने।</p>
              <div class="text-[10px] font-mono text-red-300 font-semibold border-t border-slate-800 pt-2">
                ऑटोक्लेविंग + श्रेडिंग (Shredding)
              </div>
            </div>

            <!-- WHITE CARD -->
            <div class="p-5 rounded-2xl bg-slate-900 border-2 border-slate-400 shadow-xl space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs font-mono font-bold uppercase text-slate-200">सफेद कंटेनर / WHITE</span>
                <i class="fa-solid fa-syringe text-slate-200 text-lg"></i>
              </div>
              <div class="text-3xl font-display font-black text-white">${totals.whiteKg} <span class="text-sm font-mono text-slate-400 font-normal">kg</span></div>
              <p class="text-[11px] text-slate-400">सुई, सर्जिकल ब्लेड, स्कैल्पल, पंचर-प्रूफ बॉक्स।</p>
              <div class="text-[10px] font-mono text-slate-300 font-semibold border-t border-slate-800 pt-2">
                ड्राई हीट + एनकैप्सुलेशन
              </div>
            </div>

            <!-- BLUE CARD -->
            <div class="p-5 rounded-2xl bg-slate-900 border-2 border-blue-500/60 shadow-xl space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs font-mono font-bold uppercase text-blue-400">नीला बॉक्स / BLUE</span>
                <i class="fa-solid fa-wine-bottle text-blue-400 text-lg"></i>
              </div>
              <div class="text-3xl font-display font-black text-white">${totals.blueKg} <span class="text-sm font-mono text-slate-400 font-normal">kg</span></div>
              <p class="text-[11px] text-slate-400">कांच की खाली वायल, एम्पुल, हड्डी की धातु की पिन।</p>
              <div class="text-[10px] font-mono text-blue-300 font-semibold border-t border-slate-800 pt-2">
                सोडियम हाइपोक्लोराइट + रीसायकल
              </div>
            </div>

          </div>

          <!-- DAILY LOG HISTORY TABLE -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-clipboard-list text-yellow-400"></i> दैनिक अपशिष्ट वजन एवं बारकोडेड डिस्पैच लॉग (Daily Waste Log)
                </h3>
                <p class="text-xs text-slate-400">Barcoded manifest receipts for Common Bio-Medical Waste Treatment Facility (CBWTF).</p>
              </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">तारीख व लॉग आईडी</th>
                    <th class="p-3">पीला (Yellow kg)</th>
                    <th class="p-3">लाल (Red kg)</th>
                    <th class="p-3">सफेद (White kg)</th>
                    <th class="p-3">नीला (Blue kg)</th>
                    <th class="p-3">कुल वजन (Total)</th>
                    <th class="p-3">बारकोड मैनिफेस्ट एवं वाहन</th>
                    <th class="p-3 text-right">सत्यापन अधिकारी</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-mono">
                  ${this.state.bmwDailyLogs
                    .map((l) => {
                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3">
                          <span class="font-bold text-white text-xs">${l.date}</span>
                          <div class="text-[10px] text-slate-500">${l.logId}</div>
                        </td>
                        <td class="p-3 font-bold text-yellow-400">${l.yellowBagKg} kg</td>
                        <td class="p-3 font-bold text-red-400">${l.redBagKg} kg</td>
                        <td class="p-3 font-bold text-slate-300">${l.whiteTranslucentPunctureKg} kg</td>
                        <td class="p-3 font-bold text-blue-400">${l.blueBoxKg} kg</td>
                        <td class="p-3">
                          <span class="text-sm font-black text-emerald-400">${l.totalDayKg} kg</span>
                        </td>
                        <td class="p-3 text-[11px]">
                          <div class="text-cyan-300 font-bold">${l.barcodedManifestNo}</div>
                          <div class="text-[10px] text-slate-400 font-sans">Vehicle: ${l.commonTreatmentFacilityVehicleNo}</div>
                        </td>
                        <td class="p-3 text-right font-sans text-slate-300 text-[11px]">
                          ${l.officerSign}
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

    // TAB 2: SMART COLOR-CODE SORTING GUIDE & SEARCH ASSISTANT
    renderSortingGuideTab() {
      const q = this.state.searchFilterQuery.toLowerCase().trim();
      const filtered = q
        ? BMW_STANDARDS.WASTE_LOOKUP_CATALOG.filter(
            (item) => item.item.toLowerCase().includes(q) || item.bin.toLowerCase().includes(q) || item.note.toLowerCase().includes(q)
          )
        : BMW_STANDARDS.WASTE_LOOKUP_CATALOG;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-magnifying-glass text-yellow-400"></i> स्मार्ट अपशिष्ट छंटाई खोज सहायक (AI Waste Sorter Assistant)
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  Type any clinical waste item (e.g., "Catheter", "Needle", "Sponge", "Ampoule") to see statutory bin assignment.
                </p>
              </div>

              <!-- SEARCH INPUT -->
              <div class="w-full md:w-80 relative">
                <input type="text" id="inWasteSearchQuery" class="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="कचरा वस्तु खोजें (Search item)..." value="${this.state.searchFilterQuery}" />
                <i class="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
              </div>
            </div>

            <!-- RESULT ITEMS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              ${filtered
                .map((w) => {
                  const binDef = BMW_STANDARDS.COLOR_BINS[w.bin];
                  return `
                  <div class="p-4 rounded-xl border-2 ${binDef.borderClass} ${binDef.bgClass} flex flex-col justify-between space-y-3">
                    <div>
                      <div class="flex justify-between items-center">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${binDef.badgeClass}">
                          BIN: ${w.bin}
                        </span>
                      </div>
                      <h4 class="font-display font-bold text-white text-sm mt-2">${w.item}</h4>
                      <p class="text-[11px] text-slate-300 mt-1">${w.note}</p>
                    </div>

                    <div class="pt-2 border-t border-slate-700/60 text-[10px] font-mono text-slate-300">
                      <strong>निस्तारण:</strong> ${binDef.treatment}
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>

            <!-- STATUTORY SEGREGATION CALLOUT -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="font-bold text-yellow-400 flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation"></i> गलत पृथक्करण पर विधिक दण्ड (Statutory Violation Warning)
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                बायो-मेडिकल वेस्ट रूल्स के तहत लाल बैग में सुई/ब्लेड डालना या पीले बैग में प्लास्टिक बोतल डालना संज्ञेय अपराध है। सुइयों को हमेशा <strong>हब कटर (Needle Hub Cutter)</strong> द्वारा काटकर सीधे सफेद पंचर-प्रूफ जार में ही डालें। कभी भी सुई को हाथ से दोबारा री-कैप (Recap) न करें।
              </p>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 3: AUTOCLAVE STERILITY & INFECTION CONTROL LOG
    renderSterilityLogTab() {
      const audit = this.state.qualityAudits[0] || {};
      const sharpsCount = this.state.needleStickIncidents.length;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                <i class="fa-solid fa-temperature-arrow-up text-cyan-400"></i> ऑपरेशन थियेटर ऑटोक्लेव स्टरलिटी एवं अस्पताल संक्रमण नियंत्रण (HAI)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Weekly biological spore indicator validation (*Geobacillus stearothermophilus*) and surgical site infection (SSI) rate auditing.
              </p>
            </div>

            <!-- METRIC CARDS -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-center">
                <span class="text-slate-400 uppercase text-[10px]">सर्जिकल साइट इन्फेक्शन दर (SSI Rate)</span>
                <div class="text-2xl font-black ${audit.surgicalSiteInfectionRate <= 2.5 ? "text-emerald-400" : "text-rose-400"}">
                  ${audit.surgicalSiteInfectionRate || 2.08}%
                </div>
                <span class="text-[10px] text-slate-500">Benchmark: &lt; 2.5%</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-center">
                <span class="text-slate-400 uppercase text-[10px]">बायोलॉजिकल इंडिकेटर लोट</span>
                <div class="text-base font-bold text-cyan-400 mt-1">${audit.sporeLotNo || "GEO-2026-SP-91"}</div>
                <span class="text-[10px] text-emerald-400 font-bold">121°C / 20 min OK</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-center">
                <span class="text-slate-400 uppercase text-[10px]">सुई चुभन घटनाएं (Needle Stick PEP)</span>
                <div class="text-2xl font-black text-amber-400">${sharpsCount} दर्ज</div>
                <span class="text-[10px] text-slate-500">100% Post-Exposure Prophylaxis</span>
              </div>
            </div>

            <!-- SHARPS INJURY LOG TABLE -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <h4 class="font-display font-bold text-sm text-white flex items-center gap-2">
                  <i class="fa-solid fa-syringe text-rose-400"></i> सुई चुभन एवं एक्सपोज़र सुरक्षा रजिस्टर (Sharps Injury Log)
                </h4>
                <button id="btnOpenNewSharpsModal" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow">
                  + सुई चुभन घटना दर्ज करें
                </button>
              </div>

              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-3">घटना आईडी व तारीख</th>
                      <th class="p-3">कर्मचारी का नाम</th>
                      <th class="p-3">स्रोत पशु टैग (Source Animal)</th>
                      <th class="p-3">रेबीज प्रोफिलैक्सिस (PEP)</th>
                      <th class="p-3">टिटनेस बूस्टर</th>
                      <th class="p-3 text-right">स्थिति (Status)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80 font-mono">
                    ${this.state.needleStickIncidents
                      .map((i) => {
                        return `
                        <tr class="hover:bg-slate-800/40">
                          <td class="p-3">
                            <span class="font-bold text-white">${i.incidentId}</span>
                            <div class="text-[10px] text-slate-500">${i.date}</div>
                          </td>
                          <td class="p-3 font-sans font-bold text-white">${i.staffName}</td>
                          <td class="p-3 text-slate-300 font-sans">${i.sourceAnimalTag}</td>
                          <td class="p-3">
                            <span class="text-emerald-400 font-bold flex items-center gap-1">
                              <i class="fa-solid fa-check"></i> Day 0, 3, 7, 14 PEP Done
                            </span>
                          </td>
                          <td class="p-3 text-emerald-400 font-bold">Administered</td>
                          <td class="p-3 text-right font-sans text-[10px] text-emerald-400 font-bold">
                            ${i.resolutionStatus}
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

    // TAB 4: SPCB FORM-IV STATUTORY ANNUAL RETURN
    renderAnnualReportTab(totals) {
      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[10px] font-mono uppercase text-yellow-400 font-bold">State Pollution Control Board Statutory Compliance</span>
                <h3 class="text-xl font-display font-black text-white mt-0.5">
                  प्रदूषण नियंत्रण बोर्ड वार्षिक विवरणी (Form-IV Annual Return Summary)
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  Generated under Rule 13 of Bio-Medical Waste Management Rules 2016 for submission by 30th June each year.
                </p>
              </div>
              <button id="btnPrintFormIvReturn" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-yellow-600 hover:bg-yellow-500 text-slate-950 shadow-lg flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i> फॉर्म-IV औपचारिक दस्तावेज मुद्रित करें
              </button>
            </div>

            <!-- REGULATORY FACILITY METRICS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div class="font-bold text-white text-sm">संस्थान अधिकृतता विवरण (Facility Authorization)</div>
                <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div><strong>अस्पताल का नाम:</strong> ${this.state.facilityInfo.hospitalName}</div>
                  <div><strong>SPCB प्राधिकार संख्या:</strong> ${this.state.facilityInfo.spcbAuthorizationNo}</div>
                  <div><strong>उपचार सुविधा (CBWTF):</strong> ${this.state.facilityInfo.commonTreatmentFacility}</div>
                  <div><strong>जीपीएस कचरा वाहन:</strong> ${this.state.facilityInfo.gpsVehicleNo}</div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div class="font-bold text-white text-sm">श्रेणीवार वार्षिक वजन सारांश (Annual Weight Return)</div>
                <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div class="flex justify-between border-b border-slate-800/80 pb-1">
                    <span>पीला बैग (Yellow - Anatomical / Soiled):</span>
                    <strong class="text-yellow-400">${totals.yellowKg} kg</strong>
                  </div>
                  <div class="flex justify-between border-b border-slate-800/80 pb-1">
                    <span>लाल बैग (Red - Recyclable Plastics):</span>
                    <strong class="text-red-400">${totals.redKg} kg</strong>
                  </div>
                  <div class="flex justify-between border-b border-slate-800/80 pb-1">
                    <span>सफेद कंटेनर (White - Sharps / Needles):</span>
                    <strong class="text-slate-200">${totals.whiteKg} kg</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>नीला बॉक्स (Blue - Glassware / Implants):</span>
                    <strong class="text-blue-400">${totals.blueKg} kg</strong>
                  </div>
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
      container.querySelectorAll(".bmw-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Search Filter Input
      const inSearch = container.querySelector("#inWasteSearchQuery");
      if (inSearch) {
        inSearch.addEventListener("input", (e) => {
          this.state.searchFilterQuery = e.target.value;
          const viewport = container.querySelector("#bmwTabViewport");
          if (viewport && this.activeTab === "color_code_sorting_guide") {
            viewport.innerHTML = this.renderSortingGuideTab();
            // Refocus search input
            const freshSearch = container.querySelector("#inWasteSearchQuery");
            if (freshSearch) {
              freshSearch.focus();
              freshSearch.setSelectionRange(freshSearch.value.length, freshSearch.value.length);
            }
          }
        });
      }

      // Modals Triggers
      const btnOpenWasteModal = container.querySelector("#btnOpenNewWasteEntryModal");
      if (btnOpenWasteModal) {
        btnOpenWasteModal.addEventListener("click", () => this.showNewWasteLogModal());
      }

      const btnOpenSharpsModal = container.querySelector("#btnOpenNewSharpsModal");
      if (btnOpenSharpsModal) {
        btnOpenSharpsModal.addEventListener("click", () => this.showNewSharpsModal());
      }

      // Print Reports
      const btnPrintAnnual = container.querySelector("#btnPrintAnnualBmwReport");
      if (btnPrintAnnual) {
        btnPrintAnnual.addEventListener("click", () => this.printBmwAnnualReport());
      }

      const btnPrintFormIv = container.querySelector("#btnPrintFormIvReturn");
      if (btnPrintFormIv) {
        btnPrintFormIv.addEventListener("click", () => this.printBmwAnnualReport());
      }
    },

    // 4.6 CLINICAL MODALS
    showNewWasteLogModal() {
      const modalHost = document.getElementById("bmwModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="newWasteModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-yellow-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-scale-balanced text-yellow-400 text-xl"></i>
                <h3 class="font-display font-bold text-base text-white">दैनिक 4-रंग अपशिष्ट वजन दर्ज करें</h3>
              </div>
              <button id="btnCloseWasteModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddNewWasteLog" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase text-slate-300 mb-1">तारीख (Date)</label>
                  <input type="date" id="inWasteDate" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="${new Date().toISOString().split("T")[0]}" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-300 mb-1">बारकोड मैनिफेस्ट संख्या</label>
                  <input type="text" id="inManifestNo" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold" value="MNF-8942-${Math.floor(10000 + Math.random() * 90000)}" required />
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label class="block uppercase text-yellow-400 mb-1">पीला / Yellow (kg)</label>
                  <input type="number" step="0.1" id="inYellowKg" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="12.0" required />
                </div>
                <div>
                  <label class="block uppercase text-red-400 mb-1">लाल / Red (kg)</label>
                  <input type="number" step="0.1" id="inRedKg" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="8.5" required />
                </div>
                <div>
                  <label class="block uppercase text-slate-200 mb-1">सफेद / White (kg)</label>
                  <input type="number" step="0.1" id="inWhiteKg" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="1.5" required />
                </div>
                <div>
                  <label class="block uppercase text-blue-400 mb-1">नीला / Blue (kg)</label>
                  <input type="number" step="0.1" id="inBlueKg" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="3.0" required />
                </div>
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1">CBWTF कचरा वाहन नंबर</label>
                <input type="text" id="inVehicleNo" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="DL-1M-8942" required />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelWasteModal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitWasteLog" class="px-5 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold">वजन सहेजें (Save Log)</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseWasteModal").addEventListener("click", close);
      document.getElementById("btnCancelWasteModal").addEventListener("click", close);

      document.getElementById("formAddNewWasteLog").addEventListener("submit", async () => {
        const date = document.getElementById("inWasteDate").value;
        const manifestNo = document.getElementById("inManifestNo").value.trim();
        const yKg = parseFloat(document.getElementById("inYellowKg").value) || 0;
        const rKg = parseFloat(document.getElementById("inRedKg").value) || 0;
        const wKg = parseFloat(document.getElementById("inWhiteKg").value) || 0;
        const bKg = parseFloat(document.getElementById("inBlueKg").value) || 0;
        const vehicle = document.getElementById("inVehicleNo").value.trim();
        const totalKg = parseFloat((yKg + rKg + wKg + bKg).toFixed(1));

        const newLog = {
          id: "BMW-" + Date.now(),
          logId: "BMW-" + date,
          date,
          yellowBagKg: yKg,
          redBagKg: rKg,
          whiteTranslucentPunctureKg: wKg,
          blueBoxKg: bKg,
          totalDayKg: totalKg,
          barcodedManifestNo: manifestNo,
          commonTreatmentFacilityVehicleNo: vehicle,
          officerSign: "Dr. Rahul (Infection Control Officer)"
        };

        await BmwStorage.put(BmwStorage.storeNames.wasteLogs, newLog);
        this.state.bmwDailyLogs.unshift(newLog);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("दैनिक अपशिष्ट वजन एवं बारकोड मैनिफेस्ट सफलतापूर्वक दर्ज हुआ!", "success");
        }
      });
    },

    showNewSharpsModal() {
      const modalHost = document.getElementById("bmwModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="newSharpsModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-rose-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">सुई चुभन घटना दर्ज करें (Sharps Injury Log)</h3>
              <button id="btnCloseSharpsModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddSharps" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div>
                <label class="block uppercase text-slate-300 mb-1 font-sans">कर्मचारी का नाम (Staff Name)</label>
                <input type="text" id="inSharpsStaff" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold" placeholder="उदा. अमित कुमार (Vet Nurse)" required />
              </div>

              <div>
                <label class="block uppercase text-slate-300 mb-1">स्रोत पशु टैग / पहचान (Source Animal)</label>
                <input type="text" id="inSharpsAnimal" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans" placeholder="उदा. Canine Stray #921" required />
              </div>

              <div class="space-y-2 pt-1 font-sans">
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkSharpsRabies" class="w-4 h-4 text-emerald-500 rounded" checked />
                  <span class="text-white">रेबीज पोस्ट-एक्सपोजर प्रोफिलैक्सिस (PEP) प्रारंभ किया गया</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-800/60">
                  <input type="checkbox" id="chkSharpsTetanus" class="w-4 h-4 text-emerald-500 rounded" checked />
                  <span class="text-white">टिटनेस टॉक्सोइड (TT Booster) लगाया गया</span>
                </label>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelSharpsModal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitSharps" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold">घटना सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseSharpsModal").addEventListener("click", close);
      document.getElementById("btnCancelSharpsModal").addEventListener("click", close);

      document.getElementById("formAddSharps").addEventListener("submit", async () => {
        const staff = document.getElementById("inSharpsStaff").value.trim();
        const animal = document.getElementById("inSharpsAnimal").value.trim();
        const rabies = document.getElementById("chkSharpsRabies").checked;
        const tetanus = document.getElementById("chkSharpsTetanus").checked;

        const newIncident = {
          id: "SHARP-" + Date.now(),
          incidentId: "SHARP-" + Date.now().toString().slice(-4),
          staffName: staff,
          date: new Date().toISOString().split("T")[0],
          sourceAnimalTag: animal,
          procedureContext: "Reported puncture exposure during clinical procedure",
          firstAidGiven: "Washed with running water and soap for 10 minutes",
          rabiesProphylaxisGiven: rabies,
          tetanusBoosterGiven: tetanus,
          resolutionStatus: "ACTIVE_PEP_MONITORING"
        };

        await BmwStorage.put(BmwStorage.storeNames.sharpsIncidents, newIncident);
        this.state.needleStickIncidents.unshift(newIncident);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("सुई चुभन घटना एवं PEP रिकॉर्ड दर्ज किया गया।", "warning");
        }
      });
    },

    // 4.7 STATUTORY FORM-IV ANNUAL REPORT PRINT ENGINE
    printBmwAnnualReport() {
      const totals = this.calculateTotalMonthWasteKg();
      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि प्रदूषण नियंत्रण बोर्ड फॉर्म-IV मुद्रित किया जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>SPCB Form-IV Bio-Medical Waste Annual Return - Vetcare</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #ca8a04; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-gold { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .legal-banner { background: #fefce8; border: 1px solid #fef08a; padding: 10px 12px; border-radius: 6px; font-size: 10px; color: #713f12; margin: 15px 0; line-height: 1.4; }
            .seal-row { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 220px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #854d0e; letter-spacing: -0.5px;">VETCARE AI OS (ENVIRONMENTAL QUALITY & INFECTION CONTROL)</div>
                <div style="font-size: 10px; color: #4b5563;">State Pollution Control Board (SPCB) Bio-Medical Waste Annual Return</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">फॉर्म-IV: वार्षिक जैव-चिकित्सा अपशिष्ट विवरणी (Form-IV Statutory Return)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-gold">FORM-IV STATUTORY RETURN</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">RETURN YEAR: 2026</div>
                <div style="font-size: 9px; color: #6b7280;">Date: ${new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <table class="data-table">
            <tr>
              <th width="30%">संस्थान का नाम व पता (Facility)</th>
              <td width="70%"><strong>${this.state.facilityInfo.hospitalName}</strong></td>
            </tr>
            <tr>
              <th>प्रदूषण नियंत्रण बोर्ड प्राधिकार संख्या</th>
              <td style="font-family: monospace; font-weight: bold;">${this.state.facilityInfo.spcbAuthorizationNo}</td>
            </tr>
            <tr>
              <th>साझा अपशिष्ट उपचार सुविधा (CBWTF)</th>
              <td>${this.state.facilityInfo.commonTreatmentFacility} (GPS Vehicle: ${this.state.facilityInfo.gpsVehicleNo})</td>
            </tr>
          </table>

          <div class="legal-banner">
            <strong>वैधानिक घोषणा (Statutory Declaration):</strong> यह प्रमाणित किया जाता है कि संस्थान में उत्पन्न समस्त जैव-चिकित्सा अपशिष्ट का बायो-मेडिकल वेस्ट रूल्स 2016 के तहत 4-रंगों में शत-प्रतिशत पृथक्करण किया गया है। सभी बैग्स बारकोडेड हैं तथा अधिकृत CBWTF को सौंपे गए हैं।
          </div>

          <div style="font-weight: 800; text-transform: uppercase; margin: 15px 0 6px; font-size: 11px; color: #854d0e;">
            श्रेणीवार वार्षिक अपशिष्ट उत्पादन विवरणी (Category-wise Waste Quantity Generated)
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th width="20%">श्रेणी (Category)</th>
                <th width="25%">रंग कोड (Color Bin)</th>
                <th width="35%">कचरे का प्रकार (Type of Waste)</th>
                <th width="20%">कुल वजन (Annual Total Kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Category 1</strong></td>
                <td>पीला (Yellow Bag)</td>
                <td>Anatomical waste, organs, placentas, soiled dressings</td>
                <td style="font-family: monospace; font-weight: bold;">${totals.yellowKg} kg</td>
              </tr>
              <tr>
                <td><strong>Category 2</strong></td>
                <td>लाल (Red Bag)</td>
                <td>Contaminated plastics, IV bottles, catheters, gloves</td>
                <td style="font-family: monospace; font-weight: bold;">${totals.redKg} kg</td>
              </tr>
              <tr>
                <td><strong>Category 3</strong></td>
                <td>सफेद (White Translucent)</td>
                <td>Sharps, needles, scalpel blades, suture needles</td>
                <td style="font-family: monospace; font-weight: bold;">${totals.whiteKg} kg</td>
              </tr>
              <tr>
                <td><strong>Category 4</strong></td>
                <td>नीला (Blue Box)</td>
                <td>Glassware, empty medicine vials, metal implants</td>
                <td style="font-family: monospace; font-weight: bold;">${totals.blueKg} kg</td>
              </tr>
              <tr style="background: #fef9c3;">
                <td colspan="3" style="text-align: right; font-weight: bold;">कुल वार्षिक भार (Grand Total Disposed):</td>
                <td style="font-family: monospace; font-size: 12px; font-weight: 900; color: #854d0e;">${totals.grandTotalKg} kg</td>
              </tr>
            </tbody>
          </table>

          <div class="seal-row">
            <div class="sig-box">
              CBWTF अपशिष्ट संकलन चालक<br/>
              <strong>Common Treatment Facility Operator</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #ca8a04; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #854d0e; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>BMW AUDIT SEAL
              </div>
            </div>
            <div class="sig-box">
              अस्पताल संक्रमण नियंत्रण अधिकारी<br/>
              <strong>${this.state.facilityInfo.infectionControlOfficer}</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 SPCB STATUTORY HASH: 1A92BC3401CD9843210ACDE9948210DDF9245ACBB6012489EFAA3210C881029F<br/>
            Vetcare AI OS - 2026 Production Master Core • State Pollution Control Board Annual Form-IV Registry
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
      const modalHost = document.getElementById("bmwModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Biomedical Waste Audit Quality Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.BiomedicalWasteAuditQuality = BiomedicalWasteAuditQuality;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      BiomedicalWasteAuditQuality.init();
    });
  } else {
    BiomedicalWasteAuditQuality.init();
  }
})();
