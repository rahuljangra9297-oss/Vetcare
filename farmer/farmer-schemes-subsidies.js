// Vetcare AI OS - Farmer Government Schemes, PKCC Subsidies & Livestock Insurance Engine (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Farmer = window.VetcareApp.Farmer || {};
  window.VetcareApp.Core = window.VetcareApp.Core || {};

  // Standard Event Bus Wire-up / Fallback
  const EventBus = window.VetcareApp.Core.EventBus || window.VetcareApp.EventBus || {
    listeners: {},
    on: function (event, cb) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(cb);
    },
    off: function (event, cb) {
      if (!this.listeners[event]) return;
      this.listeners[event] = this.listeners[event].filter(fn => fn !== cb);
    },
    emit: function (event, payload) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(fn => {
          try { fn(payload); } catch (e) { console.error("[Schemes EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CALCULATOR CHIMES)
  const SchemeAudio = {
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
        // Fallback for strict browser autoplay
      }
    },
    sliderTick: function () {
      SchemeAudio.playTone(600, "triangle", 0.04, 0.04);
    },
    calcSuccess: function () {
      SchemeAudio.playTone(523.25, "sine", 0.1, 0.07);
      setTimeout(() => SchemeAudio.playTone(659.25, "sine", 0.12, 0.07), 80);
      setTimeout(() => SchemeAudio.playTone(880, "sine", 0.2, 0.08), 160);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR SAVED SCHEME DOSSIERS
  const SchemeStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    saveDossier: async function (record) {
      try {
        if (!window.indexedDB) return;
        const req = window.indexedDB.open(SchemeStorage.DB_NAME, SchemeStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_schemes_saved")) {
            db.createObjectStore("farmer_schemes_saved", { keyPath: "dossierId" });
          }
        };
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_schemes_saved")) return;
          const tx = db.transaction("farmer_schemes_saved", "readwrite");
          tx.objectStore("farmer_schemes_saved").put(record);
        };
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_SCHEME_" + record.dossierId, JSON.stringify(record));
        } catch (e) {
          console.warn("[SchemeStorage] LocalStorage fallback write failed", e);
        }
      }
    }
  };

  // 4. MAIN GOVERNMENT SCHEMES & SUBSIDIES CONTROLLER
  const SchemesSubsidies = {
    // --- Reactive Internal State ---
    state: {
      schemesDirectory: [
        {
          id: "SCH-PKCC-01",
          nameHi: "पशु किसान क्रेडिट कार्ड योजना (Pashu KCC)",
          authority: "भारत सरकार एवं राज्य पशुपालन विभाग",
          categoryType: "WORKING_CAPITAL_LOAN",
          subsidyHighlight: "4% रियायती ब्याज दर (3% ब्याज अनुदान)",
          scaleOfFinanceHi: "प्रति भैंस ₹60,249 • प्रति गाय ₹40,783 • प्रति भेड़-बकरी ₹4,063",
          collateralFreeLimit: "₹1,60,000 (बिना जमीन गिरवी रखे)",
          eligibilityCriteria: "सभी दुग्ध उत्पादक पशुपालक, बटाईदार एवं स्वयं सहायता समूह। जमीन का मालिकाना हक अनिवार्य नहीं।",
          requiredDocs: ["आधार कार्ड", "बैंक पासबुक", "12-अंकीय पशु इयर टैग प्रमाण", "पशु स्वास्थ्य प्रमाण पत्र"],
          badgeColor: "border-emerald-500 bg-emerald-500/10 text-emerald-400"
        },
        {
          id: "SCH-NLM-02",
          nameHi: "राष्ट्रीय पशुधन मिशन (NLM 50% Capital Subsidy)",
          authority: "पशुपालन एवं डेयरी विभाग (DAHD, GOI)",
          categoryType: "CAPITAL_SUBSIDY",
          subsidyHighlight: "50% तक पूंजीगत अनुदान (अधिकतम ₹50 लाख)",
          scaleOfFinanceHi: "बकरी/भेड़ फार्म (100+5 यूनिट), सुअर पालन, साइलेज मेकिंग एवं ब्रीडर फार्म",
          collateralFreeLimit: "बैंक ऋण से जुड़ी पूंजीगत सब्सिडी (Back-Ended)",
          eligibilityCriteria: "किसान, उद्यमी, FPO, SHG एवं सहकारी समितियां। न्यूनतम चारा/बाड़ा व्यवस्था आवश्यक।",
          requiredDocs: ["विस्तृत प्रोजेक्ट रिपोर्ट (DPR)", "जमीन का दस्तावेज/पट्टा", "बैंक सैंक्शन लेटर", "जाति प्रमाण पत्र (SC/ST)"],
          badgeColor: "border-amber-500 bg-amber-500/10 text-amber-400"
        },
        {
          id: "SCH-INS-03",
          nameHi: "पशुधन बीमा एवं जोखिम प्रबंधन योजना",
          authority: "राष्ट्रीय पशुधन मिशन एवं राज्य बीमा संघ",
          categoryType: "INSURANCE_SUBSIDY",
          subsidyHighlight: "प्रीमियम पर 70% से 80% सरकारी सब्सिडी",
          scaleOfFinanceHi: "बीपीएल/एससी/एसटी हेतु 80% सब्सिडी (किसान को केवल 20% प्रीमियम देना होता है)",
          collateralFreeLimit: "पशु की आकस्मिक मृत्यु, बीमारी या बांझपन पर पूर्ण बाजार मूल्य का भुगतान",
          eligibilityCriteria: "अधिकतम 5 दुधारू पशु प्रति परिवार। पशु का 12-अंकीय INAPH टैग लगा होना अनिवार्य।",
          requiredDocs: ["पशु का 12-अंकीय टैग", "स्वास्थ्य प्रमाण पत्र (डॉक्टर द्वारा)", "बीपीएल राशन कार्ड / जाति प्रमाण पत्र"],
          badgeColor: "border-cyan-500 bg-cyan-500/10 text-cyan-400"
        },
        {
          id: "SCH-RGM-04",
          nameHi: "राष्ट्रीय गोकुल मिशन (RGM Breed Multiplication)",
          authority: "DAHD - राष्ट्रीय डेयरी विकास बोर्ड (NDDB)",
          categoryType: "BREEDING_SUBSIDY",
          subsidyHighlight: "50% सब्सिडी (अधिकतम ₹2 करोड़)",
          scaleOfFinanceHi: "उच्च आनुवंशिक देसी साहीवाल, गिर, थारपारकर, मुर्रा ब्रीडिंग फार्म (न्यूनतम 200 पशु)",
          collateralFreeLimit: "बड़े डेयरी फार्मर एवं ब्रीडर्स हेतु समर्पित",
          eligibilityCriteria: "न्यूनतम 5 एकड़ जमीन एवं 3 वर्ष का डेयरी प्रबंधन अनुभव।",
          requiredDocs: ["बैंक ऋण स्वीकृति", "पर्यावरण क्लीयरेंस", "नस्ल रिकॉर्ड एवं डीएनए प्रोफाइल"],
          badgeColor: "border-purple-500 bg-purple-500/10 text-purple-400"
        },
        {
          id: "SCH-HITECH-05",
          nameHi: "हरियाणा हाई-टेक मिनी डेयरी योजना (2026)",
          authority: "पशुपालन एवं डेयरी विभाग हरियाणा",
          categoryType: "STATE_SUBSIDY",
          subsidyHighlight: "25% (सामान्य) एवं 33.3% (SC/ST) ब्याज सब्सिडी",
          scaleOfFinanceHi: "3 से 20 दुधारू पशुओं की डेयरी यूनिट स्थापना हेतु",
          collateralFreeLimit: "राज्य सरकार द्वारा प्रायोजित बैंक लिंक्ड सब्सिडी",
          eligibilityCriteria: "हरियाणा राज्य का मूल निवासी। परिवार पहचान पत्र (PPP) अनिवार्य।",
          requiredDocs: ["परिवार पहचान पत्र (PPP)", "आधार कार्ड", "बैंक खाता", "जमीन फर्द/रजिस्ट्री"],
          badgeColor: "border-teal-500 bg-teal-500/10 text-teal-400"
        }
      ],
      eligibilityInputs: {
        landHoldingAcres: 2,
        cowCount: 2,
        buffaloCount: 3,
        goatCount: 6,
        category: "OBC", // GENERAL | OBC | SC_ST | WOMEN_ENTREPRENEUR
        stateName: "Haryana",
        projectType: "DAIRY" // DAIRY | GOAT_FARM | POULTRY | SILAGE_MAKING
      },
      activeTab: "schemes_explorer", // schemes_explorer | subsidy_eligibility_calculator | pkcc_loan_estimator | document_checklist_generator
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Government Schemes & PKCC Subsidies Engine (2026 Production)...");
      SchemesSubsidies.injectStyles();

      if (containerId) {
        SchemesSubsidies.render(containerId);
      }
      return SchemesSubsidies;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "farmerSchemesContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      SchemesSubsidies.state.domContainer = container;

      // Construct Complete Rural Welfare UI
      container.innerHTML = `
        <div id="vetcareSchemesWorkspace" class="max-w-5xl mx-auto space-y-6">
          ${SchemesSubsidies.renderMasterHeader()}
          ${SchemesSubsidies.renderSummaryRibbon()}
          ${SchemesSubsidies.renderNavigationTabs()}
          <div id="schemesTabContentHost" class="transition-all duration-200">
            ${SchemesSubsidies.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Offscreen Container for Print Scheme Application Dossier -->
        <div id="printableSchemeDossier" class="hidden"></div>
      `;

      SchemesSubsidies.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (SchemesSubsidies.state.domContainer) {
        SchemesSubsidies.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Farmer Schemes Subsystem cleanly destroyed.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-schemes-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-schemes-styles";
      style.textContent = `
        .scheme-card-gradient {
          background: linear-gradient(145deg, rgba(17,24,39,0.95) 0%, rgba(15,23,42,0.9) 100%);
        }
        .pkcc-slider {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 9999px;
          background: #374151;
          outline: none;
        }
        .pkcc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        @media print {
          body * { visibility: hidden !important; }
          #printableSchemeDossier, #printableSchemeDossier * { visibility: visible !important; }
          #printableSchemeDossier { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 9. FINANCIAL PKCC LOAN ESTIMATOR ALGORITHM (SCALE OF FINANCE 2026)
    calculatePkccLoan: function (cows, buffaloes, goats) {
      cows = parseInt(cows, 10) || 0;
      buffaloes = parseInt(buffaloes, 10) || 0;
      goats = parseInt(goats, 10) || 0;

      // Official RBI / State Level Bankers Committee (SLBC) Scale of Finance
      const cowRate = 40783; // ~ ₹40,783 per cow
      const buffaloRate = 60249; // ~ ₹60,249 per buffalo
      const goatRate = 4063; // ~ ₹4,063 per goat/sheep

      const totalCalculatedCredit = (cows * cowRate) + (buffaloes * buffaloRate) + (goats * goatRate);
      const collateralFreePortion = Math.min(160000, totalCalculatedCredit);
      const mortgageRequiredPortion = Math.max(0, totalCalculatedCredit - 160000);

      // Normal Agriloan interest rate = 7.0%. Prompt Repayment Incentive (PRI) = 3.0%. Effective Rate = 4.0%
      const annualInterestAt4Pct = Math.round(totalCalculatedCredit * 0.04);
      const monthlyInterestAt4Pct = Math.round(annualInterestAt4Pct / 12);
      const annualSubsidySavings = Math.round(totalCalculatedCredit * 0.03); // 3% saved through subvention

      return {
        totalCredit: Math.round(totalCalculatedCredit),
        collateralFree: collateralFreePortion,
        mortgageRequired: mortgageRequiredPortion,
        effectiveInterestRate: 4.0,
        monthlyInterest: monthlyInterestAt4Pct,
        annualSavings: annualSubsidySavings
      };
    },

    // 10. COMPONENT: MASTER HEADER
    renderMasterHeader: function () {
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-950/40">
                <i class="fa-solid fa-landmark"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    सरकारी योजनाएं, पशु केसीसी ऋण एवं बीमा सब्सिडी
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    DAHD & NABARD 2026
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
                  राष्ट्रीय पशुधन मिशन • पशु किसान क्रेडिट कार्ड (PKCC @ 4%) • 80% बीमा अनुदान
                </div>
              </div>
            </div>

            <div class="text-right">
              <span class="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <i class="fa-solid fa-certificate mr-1"></i> प्रत्यक्ष लाभ अंतरण (DBT)
              </span>
            </div>
          </div>
        </div>
      `;
    },

    // 11. COMPONENT: SUMMARY RIBBON
    renderSummaryRibbon: function () {
      const inp = SchemesSubsidies.state.eligibilityInputs;
      const loan = SchemesSubsidies.calculatePkccLoan(inp.cowCount, inp.buffaloCount, inp.goatCount);
      const totalSchemes = SchemesSubsidies.state.schemesDirectory.length;

      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">सक्रिय सरकारी योजनाएं</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-white sunlight-text">${totalSchemes}</span>
              <span class="text-[10px] text-emerald-400 font-bold">योजनाएं</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">अधिकतम पात्र PKCC ऋण</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-emerald-400">₹${(loan.totalCredit / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">प्रभावी ब्याज दर</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-amber-300">4.0%</span>
              <span class="text-[10px] text-slate-400">वार्षिक (PRI)</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">पशुधन बीमा सब्सिडी</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-cyan-400">70-80%</span>
              <span class="text-[10px] text-slate-400">अनुदान</span>
            </div>
          </div>
        </div>
      `;
    },

    // 12. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = SchemesSubsidies.state.activeTab;
      const tabs = [
        { id: "schemes_explorer", label: "योजना निर्देशिका (Schemes Catalog)", icon: "fa-landmark" },
        { id: "pkcc_loan_estimator", label: "पशु केसीसी ऋण कैलकुलेटर (PKCC Loan)", icon: "fa-calculator" },
        { id: "subsidy_eligibility_calculator", label: "सब्सिडी पात्रता जांच (Eligibility)", icon: "fa-sliders" },
        { id: "document_checklist_generator", label: "दस्तावेज चेकलिस्ट (Checklist)", icon: "fa-clipboard-check" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-scheme-tab="${t.id}" class="scheme-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-emerald-400 border-t-2 border-l border-r border-emerald-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
            </button>
          `).join("")}
        </div>
      `;
    },

    // 13. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (SchemesSubsidies.state.activeTab) {
        case "pkcc_loan_estimator":
          return SchemesSubsidies.renderPkccLoanEstimatorTab();
        case "subsidy_eligibility_calculator":
          return SchemesSubsidies.renderSubsidyEligibilityTab();
        case "document_checklist_generator":
          return SchemesSubsidies.renderDocumentChecklistTab();
        case "schemes_explorer":
        default:
          return SchemesSubsidies.renderSchemesExplorerTab();
      }
    },

    // 14. COMPONENT: TAB 1 - SCHEMES DIRECTORY EXPLORER
    renderSchemesExplorerTab: function () {
      const list = SchemesSubsidies.state.schemesDirectory;

      return `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${list.map(s => `
              <div class="p-5 rounded-2xl scheme-card-gradient border border-slate-800 shadow-xl space-y-3.5 sunlight-card flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${s.badgeColor}">
                        ${s.categoryType.replace(/_/g, " ")}
                      </span>
                      <h3 class="font-display font-black text-base text-white mt-1.5 sunlight-text">${s.nameHi}</h3>
                      <div class="text-[11px] font-mono text-slate-400">${s.authority}</div>
                    </div>
                  </div>

                  <div class="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                    <div class="text-[10px] font-mono uppercase text-amber-400 font-bold">सब्सिडी व वित्तीय लाभ:</div>
                    <div class="font-bold text-white text-xs">${s.subsidyHighlight}</div>
                    <div class="text-slate-300 font-mono text-[11px] mt-1">${s.scaleOfFinanceHi}</div>
                  </div>

                  <div class="mt-3 text-xs text-slate-300 space-y-1 leading-relaxed">
                    <strong class="text-slate-400 text-[10px] font-mono uppercase block">पात्रता मापदंड (Eligibility):</strong>
                    <p>${s.eligibilityCriteria}</p>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button type="button" data-action="print_scheme_summary" data-scheme-id="${s.id}" class="py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-xs uppercase tracking-wider shadow flex items-center gap-1.5 active:scale-95 transition-all">
                    <i class="fa-solid fa-file-pdf"></i>
                    <span>आवेदन विवरण (Dossier)</span>
                  </button>
                  <button type="button" data-action="view_checklist" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold">
                    दस्तावेज सूची
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 2 - INTERACTIVE PKCC LOAN ESTIMATOR
    renderPkccLoanEstimatorTab: function () {
      const inp = SchemesSubsidies.state.eligibilityInputs;
      const loan = SchemesSubsidies.calculatePkccLoan(inp.cowCount, inp.buffaloCount, inp.goatCount);

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 sunlight-card">
          <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-credit-card text-emerald-400"></i>
                <span>पशु किसान क्रेडिट कार्ड (PKCC) ऋण गणना यंत्र</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">आधिकारिक स्केल ऑफ फाइनेंस के अनुसार पशुधन पर बिना जमीन गिरवी रखे ऋण सीमा।</p>
            </div>
            <span class="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-emerald-500 text-slate-950">
              4% NET INTEREST
            </span>
          </div>

          <!-- Interactive Cattle Sliders Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <!-- Buffalo Slider -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-cow text-amber-400"></i>
                  <span>दुधारू भैंसें (Buffaloes)</span>
                </span>
                <span id="labelBuffaloCount" class="font-mono text-base font-black text-amber-400">${inp.buffaloCount}</span>
              </div>
              <input type="range" id="sliderBuffaloCount" min="0" max="10" value="${inp.buffaloCount}" class="pkcc-slider w-full" />
              <div class="text-[10px] font-mono text-slate-400 text-right">स्केल: ₹60,249 /भैंस</div>
            </div>

            <!-- Cow Slider -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-cow text-emerald-400"></i>
                  <span>दुधारू गायें (Cows)</span>
                </span>
                <span id="labelCowCount" class="font-mono text-base font-black text-emerald-400">${inp.cowCount}</span>
              </div>
              <input type="range" id="sliderCowCount" min="0" max="15" value="${inp.cowCount}" class="pkcc-slider w-full" />
              <div class="text-[10px] font-mono text-slate-400 text-right">स्केल: ₹40,783 /गाय</div>
            </div>

            <!-- Goat / Sheep Slider -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-seedling text-cyan-400"></i>
                  <span>बकरी / भेड़ (Goats/Sheep)</span>
                </span>
                <span id="labelGoatCount" class="font-mono text-base font-black text-cyan-400">${inp.goatCount}</span>
              </div>
              <input type="range" id="sliderGoatCount" min="0" max="30" value="${inp.goatCount}" class="pkcc-slider w-full" />
              <div class="text-[10px] font-mono text-slate-400 text-right">स्केल: ₹4,063 /बकरी</div>
            </div>
          </div>

          <!-- Calculated Output Card -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border-2 border-emerald-500/60 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            <div>
              <span class="text-[10px] font-mono uppercase text-slate-400 block">कुल स्वीकृत ऋण सीमा (Credit Limit)</span>
              <div id="textTotalCreditLimit" class="text-xl sm:text-2xl font-black font-mono text-white mt-1">₹${loan.totalCredit.toLocaleString("en-IN")}</div>
            </div>

            <div>
              <span class="text-[10px] font-mono uppercase text-emerald-400 block font-bold">बिना गारंटी सीमा (Collateral-Free)</span>
              <div id="textCollateralFree" class="text-lg font-black font-mono text-emerald-400 mt-1">₹${loan.collateralFree.toLocaleString("en-IN")}</div>
              <span class="text-[9px] text-slate-400 font-mono">(अधिकतम ₹1.60 लाख)</span>
            </div>

            <div>
              <span class="text-[10px] font-mono uppercase text-slate-400 block">मासिक अनुमानित ब्याज (@ 4%)</span>
              <div id="textMonthlyInterest" class="text-lg font-black font-mono text-amber-300 mt-1">₹${loan.monthlyInterest} /माह</div>
            </div>

            <div>
              <span class="text-[10px] font-mono uppercase text-cyan-400 block font-bold">वार्षिक ब्याज बचत (3% Subvention)</span>
              <div id="textAnnualSavings" class="text-lg font-black font-mono text-cyan-300 mt-1">₹${loan.annualSavings} /वर्ष</div>
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong class="text-emerald-400 font-mono text-[10px] uppercase block">महत्वपूर्ण लाभ:</strong>
            पशु किसान क्रेडिट कार्ड पर 1 वर्ष में समय पर भुगतान करने पर 3% का अतिरिक्त ब्याज अनुदान मिलता है, जिससे वास्तविक ब्याज दर केवल <strong>4% वार्षिक</strong> रह जाती है। यह ऋण किसी भी राष्ट्रीयकृत बैंक (SBI, PNB, HDFC, सर्व हरियाणा ग्रामीण बैंक) से प्राप्त किया जा सकता है।
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: TAB 3 - SUBSIDY ELIGIBILITY CALCULATOR
    renderSubsidyEligibilityTab: function () {
      const inp = SchemesSubsidies.state.eligibilityInputs;

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sunlight-card">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
              <i class="fa-solid fa-sliders text-cyan-400"></i>
              <span>सरकारी सब्सिडी एवं पात्रता कैलकुलेटर (Eligibility Matcher)</span>
            </h3>
            <p class="text-xs text-slate-400 sunlight-muted">अपनी सामाजिक श्रेणी, जमीन एवं पशुधन विवरण प्रविष्ट करें ताकि सटीक सब्सिडी निकाली जा सके।</p>
          </div>

          <form id="formEligibilityMatcher" onsubmit="return false;" class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">सामाजिक श्रेणी (Category)</label>
              <select id="selectEligibilityCategory" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold">
                <option value="GENERAL" ${inp.category === "GENERAL" ? "selected" : ""}>सामान्य (General)</option>
                <option value="OBC" ${inp.category === "OBC" ? "selected" : ""}>अन्य पिछड़ा वर्ग (OBC)</option>
                <option value="SC_ST" ${inp.category === "SC_ST" ? "selected" : ""}>अनुसूचित जाति/जनजाति (SC/ST - 33.3% Subsidy)</option>
                <option value="WOMEN_ENTREPRENEUR" ${inp.category === "WOMEN_ENTREPRENEUR" ? "selected" : ""}>महिला उद्यमी (Women Priority)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">प्रोजेक्ट प्रकार (Project Type)</label>
              <select id="selectEligibilityProject" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold">
                <option value="DAIRY" ${inp.projectType === "DAIRY" ? "selected" : ""}>डेयरी फार्मिंग (गाय/भैंस यूनिट)</option>
                <option value="GOAT_FARM" ${inp.projectType === "GOAT_FARM" ? "selected" : ""}>बकरी पालन (NLM 50% Capital)</option>
                <option value="SILAGE_MAKING" ${inp.projectType === "SILAGE_MAKING" ? "selected" : ""}>साइलेज / हरा चारा प्रसंस्करण</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">उपलब्ध भूमि (एकड़ में)</label>
              <input type="number" step="0.5" id="inputLandAcres" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${inp.landHoldingAcres}" />
            </div>
          </form>

          <!-- Matched Subsidies Results -->
          <div class="space-y-3 pt-2">
            <span class="text-xs font-mono uppercase text-emerald-400 font-bold block">आपके प्रोफाइल हेतु सर्वाधिक उपयुक्त योजनाएं:</span>

            <div class="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-start justify-between gap-3 text-xs">
              <div>
                <div class="font-bold text-white text-sm">राष्ट्रीय पशुधन मिशन (NLM) 50% कैपिटल सब्सिडी</div>
                <div class="text-slate-300 mt-1">बकरी/भेड़ या डेयरी साइलेज यूनिट पर 50% तक सीधी बैंक सब्सिडी (Back-Ended)।</div>
                <div class="text-[10px] font-mono text-cyan-400 mt-1">अधिकतम अनुदान: ₹10 लाख से ₹50 लाख तक</div>
              </div>
              <span class="px-2.5 py-1 rounded bg-emerald-600 text-slate-950 font-black text-xs shrink-0">100% MATCH</span>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs">
              <div>
                <div class="font-bold text-white text-sm">पशुधन जोखिम प्रबंधन बीमा योजना (80% Subsidy)</div>
                <div class="text-slate-300 mt-1">${inp.category === "SC_ST" ? "अनुसूचित जाति हेतु 80% प्रीमियम सरकार वहन करेगी।" : "सामान्य/ओबीसी हेतु 70% सरकारी प्रीमियम छूट।"}</div>
              </div>
              <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-xs shrink-0">QUALIFIED</span>
            </div>
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: TAB 4 - DOCUMENT CHECKLIST GENERATOR
    renderDocumentChecklistTab: function () {
      const docs = [
        { name: "आधार कार्ड (Aadhaar Card)", purpose: "पहचान व बायोमेट्रिक सत्यापन", mandatory: true },
        { name: "परिवार पहचान पत्र (PPP - हरियाणा)", purpose: "राज्य सब्सिडी पात्रता एवं डीबीटी सत्यापन", mandatory: true },
        { name: "बैंक पासबुक प्रति (Bank Passbook)", purpose: "खाता संख्या एवं IFSC कोड (डीबीटी लिंक)", mandatory: true },
        { name: "पशु का 12-अंकीय इयर टैग प्रमाण", purpose: "INAPH/NDLM पोर्टल पर पंजीकृत टैग नंबर", mandatory: true },
        { name: "पशु स्वास्थ्य प्रमाण पत्र (Health Certificate)", purpose: "सरकारी पशु चिकित्सक द्वारा जारी टीकाकरण प्रमाण", mandatory: true },
        { name: "जमीन की फर्द / जमाबंदी (यदि भूमि हो)", purpose: "चारा उत्पादन व शेड निर्माण सत्यापन", mandatory: false },
        { name: "जाति प्रमाण पत्र (Caste Certificate)", purpose: "SC/ST वर्ग हेतु 33.3% - 80% विशेष सब्सिडी लाभ", mandatory: false }
      ];

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-clipboard-check text-emerald-400"></i>
                <span>बैंक एवं सीएससी (CSC) आवेदन दस्तावेज चेकलिस्ट</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">बैंक शाखा या सरल पोर्टल पर जाने से पूर्व इन दस्तावेजों की स्व-प्रमाणित प्रतियां तैयार रखें।</p>
            </div>
          </div>

          <div class="space-y-2.5">
            ${docs.map((d, i) => `
              <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs border border-slate-700">
                    ${i + 1}
                  </span>
                  <div>
                    <div class="font-bold text-white sunlight-text">${d.name}</div>
                    <div class="text-[10px] text-slate-400 font-sans">${d.purpose}</div>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${d.mandatory ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-slate-800 text-slate-400"}">
                  ${d.mandatory ? "अनिवार्य (Mandatory)" : "वैकल्पिक"}
                </span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 18. PRINT SCHEME APPLICATION DOSSIER (A4 STANDARD)
    printSchemeApplicationSummary: function (schemeId) {
      const scheme = SchemesSubsidies.state.schemesDirectory.find(s => s.id === schemeId) || SchemesSubsidies.state.schemesDirectory[0];
      const inp = SchemesSubsidies.state.eligibilityInputs;
      const loan = SchemesSubsidies.calculatePkccLoan(inp.cowCount, inp.buffaloCount, inp.goatCount);

      let printHost = document.getElementById("printableSchemeDossier");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "printableSchemeDossier";
        document.body.appendChild(printHost);
      }

      printHost.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 40px; color: #000; max-width: 750px; margin: 0 auto; line-height: 1.5;">
          <!-- Header -->
          <div style="border-bottom: 2.5px solid #064e3b; padding-bottom: 12px; margin-bottom: 18px; text-align: center;">
            <div style="font-size: 16px; font-weight: bold; text-transform: uppercase;">पशुपालन एवं डेयरी विभाग • सरकारी कल्याणकारी योजना आवेदन पत्रक</div>
            <div style="font-size: 19px; font-weight: 900; color: #064e3b; margin: 4px 0;">${scheme.nameHi}</div>
            <div style="font-size: 11px; font-family: monospace;">SCHEME APPLICATION DOSSIER & FINANCIAL ESTIMATOR 2026</div>
          </div>

          <!-- Farmer Profile Matrix -->
          <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; background: #f9fafb; border: 1px solid #e5e7eb; margin-bottom: 16px;">
            <tr>
              <td style="padding: 7px;"><strong>आवेदक किसान का नाम:</strong> रामनिवास यादव</td>
              <td style="padding: 7px;"><strong>मोबाइल नंबर:</strong> 9991039297</td>
            </tr>
            <tr>
              <td style="padding: 7px;"><strong>गाँव एवं जिला:</strong> धांसू, हिसार (हरियाणा)</td>
              <td style="padding: 7px;"><strong>सामाजिक श्रेणी:</strong> ${inp.category}</td>
            </tr>
            <tr>
              <td style="padding: 7px;"><strong>विद्यमान दुधारू पशु:</strong> ${inp.buffaloCount} भैंसें, ${inp.cowCount} गायें, ${inp.goatCount} बकरियां</td>
              <td style="padding: 7px;"><strong>उपलब्ध कृषि भूमि:</strong> ${inp.landHoldingAcres} एकड़</td>
            </tr>
          </table>

          <!-- Financial Subsidies Breakdown -->
          <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: bold; color: #064e3b; margin-bottom: 4px; text-transform: uppercase;">1. वित्तीय लाभ एवं स्केल ऑफ फाइनेंस विवरण:</div>
            <div style="font-size: 11.5px; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 6px;">
              <div>• <strong>स्वीकृत कुल ऋण सीमा (PKCC Limit):</strong> ₹${loan.totalCredit.toLocaleString("en-IN")}</div>
              <div>• <strong>बिना गारंटी सीमा (Collateral-Free):</strong> ₹${loan.collateralFree.toLocaleString("en-IN")} (बिना जमीन बंधक रखे)</div>
              <div>• <strong>प्रभावी ब्याज दर:</strong> 4% वार्षिक (समय पर चुकता करने पर 3% छूट)</div>
              <div>• <strong>सब्सिडी प्रकार:</strong> ${scheme.subsidyHighlight}</div>
            </div>
          </div>

          <!-- Required Checklist for Bank -->
          <div style="margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: bold; color: #064e3b; margin-bottom: 4px; text-transform: uppercase;">2. बैंक शाखा में प्रस्तुत करने हेतु संलग्नक चेकलिस्ट:</div>
            <ul style="font-size: 11px; padding-left: 20px; margin: 0; color: #374151;">
              <li>आधार कार्ड एवं परिवार पहचान पत्र (PPP) स्व-प्रमाणित प्रति</li>
              <li>बैंक बचत खाता पासबुक प्रति (डीबीटी सक्रिय)</li>
              <li>पशुओं के 12-अंकीय NDLM इयर टैग एवं पशु चिकित्सक स्वास्थ्य प्रमाण पत्र</li>
              <li>पासपोर्ट आकार की 2 रंगीन फोटो</li>
            </ul>
          </div>

          <!-- Sign-Off -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              डिजिटल सत्यापन कोड: SHA256-SCHEME-${scheme.id}-${Date.now()}<br/>
              Vetcare AI OS v2.6.4 Production
            </div>
            <div style="text-align: center;">
              <div style="height: 40px; border-bottom: 1px solid #000; width: 170px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">(आवेदक किसान हस्ताक्षर / अंगूठा)</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.print();
      }, 200);
    },

    // 19. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = SchemesSubsidies.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".scheme-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-scheme-tab");
          if (tab) {
            SchemesSubsidies.state.activeTab = tab;
            SchemesSubsidies.render(SchemesSubsidies.state.domContainer.id);
          }
        });
      });

      // PKCC Sliders Listeners
      const sliderBuffalo = document.getElementById("sliderBuffaloCount");
      const sliderCow = document.getElementById("sliderCowCount");
      const sliderGoat = document.getElementById("sliderGoatCount");

      const updateSliderOutputs = function () {
        if (!sliderBuffalo || !sliderCow || !sliderGoat) return;
        const b = parseInt(sliderBuffalo.value, 10);
        const c = parseInt(sliderCow.value, 10);
        const g = parseInt(sliderGoat.value, 10);

        SchemesSubsidies.state.eligibilityInputs.buffaloCount = b;
        SchemesSubsidies.state.eligibilityInputs.cowCount = c;
        SchemesSubsidies.state.eligibilityInputs.goatCount = g;

        const labelB = document.getElementById("labelBuffaloCount");
        const labelC = document.getElementById("labelCowCount");
        const labelG = document.getElementById("labelGoatCount");

        if (labelB) labelB.textContent = b;
        if (labelC) labelC.textContent = c;
        if (labelG) labelG.textContent = g;

        const loan = SchemesSubsidies.calculatePkccLoan(c, b, g);

        const txtCredit = document.getElementById("textTotalCreditLimit");
        const txtCollat = document.getElementById("textCollateralFree");
        const txtInterest = document.getElementById("textMonthlyInterest");
        const txtSavings = document.getElementById("textAnnualSavings");

        if (txtCredit) txtCredit.textContent = `₹${loan.totalCredit.toLocaleString("en-IN")}`;
        if (txtCollat) txtCollat.textContent = `₹${loan.collateralFree.toLocaleString("en-IN")}`;
        if (txtInterest) txtInterest.textContent = `₹${loan.monthlyInterest} /माह`;
        if (txtSavings) txtSavings.textContent = `₹${loan.annualSavings} /वर्ष`;

        SchemeAudio.sliderTick();
      };

      if (sliderBuffalo) sliderBuffalo.addEventListener("input", updateSliderOutputs);
      if (sliderCow) sliderCow.addEventListener("input", updateSliderOutputs);
      if (sliderGoat) sliderGoat.addEventListener("input", updateSliderOutputs);

      // Eligibility Form Listeners
      const selectCat = document.getElementById("selectEligibilityCategory");
      const selectProj = document.getElementById("selectEligibilityProject");
      const inputLand = document.getElementById("inputLandAcres");

      if (selectCat) {
        selectCat.addEventListener("change", function () {
          SchemesSubsidies.state.eligibilityInputs.category = this.value;
          SchemeAudio.calcSuccess();
        });
      }
      if (selectProj) {
        selectProj.addEventListener("change", function () {
          SchemesSubsidies.state.eligibilityInputs.projectType = this.value;
          SchemeAudio.calcSuccess();
        });
      }
      if (inputLand) {
        inputLand.addEventListener("input", function () {
          SchemesSubsidies.state.eligibilityInputs.landHoldingAcres = parseFloat(this.value) || 0;
        });
      }

      // Delegated Action Clicks
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "print_scheme_summary") {
          const schemeId = btn.getAttribute("data-scheme-id");
          SchemesSubsidies.printSchemeApplicationSummary(schemeId);
        } else if (action === "view_checklist") {
          SchemesSubsidies.state.activeTab = "document_checklist_generator";
          SchemesSubsidies.render(SchemesSubsidies.state.domContainer.id);
        }
      });
    }
  };

  // 20. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Farmer.SchemesSubsidies = SchemesSubsidies;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("farmerSchemesContainer");
    if (defaultHost) {
      SchemesSubsidies.init("farmerSchemesContainer");
    }
  });

})(window, document);
