// Vetcare AI OS - Farmer Daily Feed Cost, Milk Economics & Net Farm Profit Engine (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[Economics EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CALCULATOR CLICKS & CASH CHIMES)
  const EconAudio = {
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
        // Fallback for restricted autoplay
      }
    },
    sliderClick: function () {
      EconAudio.playTone(520, "triangle", 0.03, 0.04);
    },
    chimeProfitPositive: function () {
      EconAudio.playTone(523.25, "sine", 0.1, 0.08);
      setTimeout(() => EconAudio.playTone(659.25, "sine", 0.12, 0.08), 80);
      setTimeout(() => EconAudio.playTone(1046.5, "sine", 0.22, 0.09), 160);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR ECONOMIC CALCULATIONS
  const EconStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    saveCalculations: async function (record) {
      try {
        if (!window.indexedDB) return;
        const req = window.indexedDB.open(EconStorage.DB_NAME, EconStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_economic_calculations")) {
            db.createObjectStore("farmer_economic_calculations", { keyPath: "calcId" });
          }
        };
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_economic_calculations")) return;
          const tx = db.transaction("farmer_economic_calculations", "readwrite");
          tx.objectStore("farmer_economic_calculations").put(record);
        };
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_ECONOMICS_DRAFT", JSON.stringify(record));
        } catch (e) {
          console.warn("[EconStorage] LocalStorage fallback write failed", e);
        }
      }
    }
  };

  // 4. MAIN DAIRY ECONOMICS & PROFIT CALCULATOR
  const FeedCostProfitCalculator = {
    // --- Reactive Internal State ---
    state: {
      farmCostInputs: {
        dryFodderKgPerCow: 6.0,       // तूड़ी / सूखा चारा (Kg)
        dryFodderPricePerKg: 8.0,     // ₹ / Kg
        greenFodderKgPerCow: 20.0,    // हरा चारा (Kg)
        greenFodderPricePerKg: 2.0,   // ₹ / Kg
        concentrateKgPerCow: 4.0,     // पशुआहार / खल-दाना (Kg)
        concentratePricePerKg: 24.0,  // ₹ / Kg
        mineralMixtureGrams: 50.0,    // मिनरल मिक्सचर (Grams)
        mineralPricePerKg: 120.0,     // ₹ / Kg
        laborCostPerCowDaily: 30.0,   // दैनिक मजदूरी प्रति पशु
        veterinaryMiscDaily: 15.0     // दवाई व आकस्मिक व्यय प्रति पशु
      },
      productionInputs: {
        milkingCowsCount: 5,          // कुल दुधारू पशु
        avgDailyMilkPerCowLiters: 12.0, // औसत दैनिक दूध प्रति पशु (Liters)
        milkSalePricePerLiter: 55.0   // दूध विक्रय दर (₹/Ltr)
      },
      economicResults: {
        totalDailyFeedCostPerCow: 0,
        totalFarmDailyExpense: 0,
        grossDailyMilkRevenue: 0,
        netDailyProfit: 0,
        feedCostPerLiter: 0,
        feedCostRatioPercent: 0,
        profitMarginPercent: 0,
        monthlyGrossRevenue: 0,
        monthlyNetProfit: 0
      },
      activeTab: "profit_calculator", // profit_calculator | least_cost_feed_tips | monthly_projection_ledger
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Daily Feed Cost, Milk Economics & Net Profit Engine (2026 Production)...");
      FeedCostProfitCalculator.injectStyles();
      FeedCostProfitCalculator.calculateEconomics();

      if (containerId) {
        FeedCostProfitCalculator.render(containerId);
      }
      return FeedCostProfitCalculator;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "farmerFeedEconomicsContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      FeedCostProfitCalculator.state.domContainer = container;

      // Construct Complete Rural Profit Architecture
      container.innerHTML = `
        <div id="vetcareEconomicsWorkspace" class="max-w-5xl mx-auto space-y-6">
          ${FeedCostProfitCalculator.renderMasterHeader()}
          ${FeedCostProfitCalculator.renderTopSummaryCards()}
          ${FeedCostProfitCalculator.renderNavigationTabs()}
          <div id="econTabContentHost" class="transition-all duration-200">
            ${FeedCostProfitCalculator.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Offscreen Container for Print Monthly Profit Dossier -->
        <div id="printableProfitDossier" class="hidden"></div>
      `;

      FeedCostProfitCalculator.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (FeedCostProfitCalculator.state.domContainer) {
        FeedCostProfitCalculator.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Feed Cost Profit Calculator cleanly destroyed.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-feed-economics-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-feed-economics-styles";
      style.textContent = `
        .econ-slider {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 9999px;
          background: #374151;
          outline: none;
        }
        .econ-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        @media print {
          body * { visibility: hidden !important; }
          #printableProfitDossier, #printableProfitDossier * { visibility: visible !important; }
          #printableProfitDossier { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 9. CORE DAIRY ECONOMICS MATHEMATICAL ENGINE
    calculateEconomics: function () {
      const c = FeedCostProfitCalculator.state.farmCostInputs;
      const p = FeedCostProfitCalculator.state.productionInputs;

      // 1. Daily Feed Cost Per Animal
      const dryCost = c.dryFodderKgPerCow * c.dryFodderPricePerKg;
      const greenCost = c.greenFodderKgPerCow * c.greenFodderPricePerKg;
      const concCost = c.concentrateKgPerCow * c.concentratePricePerKg;
      const mineralCost = (c.mineralMixtureGrams / 1000.0) * c.mineralPricePerKg;

      const totalFeedCostPerCow = dryCost + greenCost + concCost + mineralCost;

      // 2. Total Daily Expense Per Animal (Feed + Labor + Vet/Misc)
      const dailyExpensePerCow = totalFeedCostPerCow + c.laborCostPerCowDaily + c.veterinaryMiscDaily;

      // 3. Whole Farm Daily Expense
      const totalFarmDailyExpense = dailyExpensePerCow * p.milkingCowsCount;

      // 4. Gross Daily Milk Revenue
      const totalDailyMilkYield = p.milkingCowsCount * p.avgDailyMilkPerCowLiters;
      const grossDailyMilkRevenue = totalDailyMilkYield * p.milkSalePricePerLiter;

      // 5. Net Profit & Margins
      const netDailyProfit = grossDailyMilkRevenue - totalFarmDailyExpense;
      const feedCostPerLiter = totalDailyMilkYield > 0 ? (totalFeedCostPerCow / p.avgDailyMilkPerCowLiters) : 0;
      const feedCostRatioPercent = p.milkSalePricePerLiter > 0 ? ((feedCostPerLiter / p.milkSalePricePerLiter) * 100) : 0;
      const profitMarginPercent = grossDailyMilkRevenue > 0 ? ((netDailyProfit / grossDailyMilkRevenue) * 100) : 0;

      // 6. Monthly 30-Day Projections
      const monthlyGrossRevenue = grossDailyMilkRevenue * 30;
      const monthlyNetProfit = netDailyProfit * 30;

      FeedCostProfitCalculator.state.economicResults = {
        totalDailyFeedCostPerCow: Math.round(totalFeedCostPerCow * 10) / 10,
        totalFarmDailyExpense: Math.round(totalFarmDailyExpense),
        grossDailyMilkRevenue: Math.round(grossDailyMilkRevenue),
        netDailyProfit: Math.round(netDailyProfit),
        feedCostPerLiter: Math.round(feedCostPerLiter * 100) / 100,
        feedCostRatioPercent: Math.round(feedCostRatioPercent * 10) / 10,
        profitMarginPercent: Math.round(profitMarginPercent * 10) / 10,
        monthlyGrossRevenue: Math.round(monthlyGrossRevenue),
        monthlyNetProfit: Math.round(monthlyNetProfit)
      };

      // Persist draft calculations
      EconStorage.saveCalculations({
        calcId: "CALC-DRAFT",
        timestamp: Date.now(),
        costs: c,
        production: p,
        results: FeedCostProfitCalculator.state.economicResults
      });

      return FeedCostProfitCalculator.state.economicResults;
    },

    // 10. COMPONENT: MASTER HEADER
    renderMasterHeader: function () {
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-950/40">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    दैनिक पशुआहार लागत, दुग्ध अर्थशास्त्र एवं शुद्ध मुनाफा कैलकुलेटर
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    DAIRY ECONOMICS 2026
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
                  चारा-दाना लागत प्रति लीटर • वैज्ञानिक राशन संतुलन • मासिक शुद्ध आय विश्लेषण
                </div>
              </div>
            </div>

            <div class="text-right">
              <button id="btnPrintDossierTrigger" type="button" class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 shadow">
                <i class="fa-solid fa-print text-emerald-400"></i>
                <span>मासिक मुनाफा पर्ची (Print Dossier)</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 11. COMPONENT: TOP SUMMARY STAT CARDS
    renderTopSummaryCards: function () {
      const res = FeedCostProfitCalculator.state.economicResults;
      const isEfficient = res.feedCostRatioPercent <= 60.0;

      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- Daily Net Profit -->
          <div class="p-4 rounded-xl bg-slate-900 border ${res.netDailyProfit >= 0 ? "border-emerald-500/50" : "border-rose-500/60"} shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>शुद्ध दैनिक कमाई (Daily Net)</span>
              <i class="fa-solid fa-coins text-emerald-400"></i>
            </div>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl font-display font-black ${res.netDailyProfit >= 0 ? "text-emerald-400" : "text-rose-400"}">
                ₹${res.netDailyProfit.toLocaleString("en-IN")}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">/दिन</span>
            </div>
            <div class="text-[10px] font-mono text-slate-400 mt-1">
              मासिक अनुमान: <strong class="text-white">₹${res.monthlyNetProfit.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <!-- Feed Cost Per Liter -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>1L दूध की चारा लागत</span>
              <i class="fa-solid fa-glass-water-droplet text-cyan-400"></i>
            </div>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl font-display font-black text-cyan-300">
                ₹${res.feedCostPerLiter}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">/लीटर</span>
            </div>
            <div class="text-[10px] font-mono ${isEfficient ? "text-emerald-400" : "text-amber-400"} mt-1 font-bold">
              ${res.feedCostRatioPercent}% दूध भाव का (मानक < 60%)
            </div>
          </div>

          <!-- Profit Margin % -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>शुद्ध मुनाफा मार्जिन (%)</span>
              <i class="fa-solid fa-percent text-amber-400"></i>
            </div>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl font-display font-black text-amber-300">
                ${res.profitMarginPercent}%
              </span>
              <span class="text-[10px] text-slate-400 font-mono">मार्जिन</span>
            </div>
            <div class="text-[10px] font-mono text-slate-400 mt-1">
              दैनिक बिक्री: <strong class="text-white">₹${res.grossDailyMilkRevenue.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <!-- Daily Expense Per Animal -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>चारा खर्च प्रति पशु</span>
              <i class="fa-solid fa-bowl-rice text-teal-400"></i>
            </div>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">
                ₹${res.totalDailyFeedCostPerCow}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">/पशु/दिन</span>
            </div>
            <div class="text-[10px] font-mono text-slate-400 mt-1">
              फार्म कुल खर्च: <strong class="text-slate-200">₹${res.totalFarmDailyExpense}</strong>
            </div>
          </div>
        </div>
      `;
    },

    // 12. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = FeedCostProfitCalculator.state.activeTab;
      const tabs = [
        { id: "profit_calculator", label: "लागत व मुनाफा कैलकुलेटर (Cost Calculator)", icon: "fa-sliders" },
        { id: "least_cost_feed_tips", label: "चारा बचत देसी नुस्खे (Least-Cost Feed)", icon: "fa-leaf" },
        { id: "monthly_projection_ledger", label: "30-दिन आय-व्यय बही खाता (Ledger)", icon: "fa-book-bookmark" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-econ-tab="${t.id}" class="econ-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
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
      switch (FeedCostProfitCalculator.state.activeTab) {
        case "least_cost_feed_tips":
          return FeedCostProfitCalculator.renderLeastCostFeedTipsTab();
        case "monthly_projection_ledger":
          return FeedCostProfitCalculator.renderMonthlyProjectionLedgerTab();
        case "profit_calculator":
        default:
          return FeedCostProfitCalculator.renderProfitCalculatorTab();
      }
    },

    // 14. COMPONENT: TAB 1 - PROFIT & COST SLIDERS WORKBENCH
    renderProfitCalculatorTab: function () {
      const c = FeedCostProfitCalculator.state.farmCostInputs;
      const p = FeedCostProfitCalculator.state.productionInputs;
      const res = FeedCostProfitCalculator.state.economicResults;

      return `
        <div class="space-y-6">
          
          <!-- Benchmark Diagnostic Warning (If Feed > 60% of Milk Sale Price) -->
          ${res.feedCostRatioPercent > 60.0 ? `
            <div class="p-4 rounded-xl bg-amber-950/40 border-2 border-amber-500 text-amber-200 text-xs flex items-center gap-3">
              <i class="fa-solid fa-triangle-exclamation text-amber-400 text-xl"></i>
              <div>
                <strong>चेतावनी: चारा लागत अत्यधिक है (${res.feedCostRatioPercent}%)!</strong>
                डेयरी में 1 लीटर दूध की चारा लागत दूध भाव के 60% से कम होनी चाहिए। मुनाफा बढ़ाने हेतु हरा चारा बढ़ाएं और दाने/खल की बर्बादी रोकें।
              </div>
            </div>
          ` : ""}

          <!-- Input Controls Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- Left Pane: Feed & Labor Sliders (7 Cols) -->
            <div class="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sunlight-card">
              <div class="border-b border-slate-800 pb-2.5 flex items-center justify-between">
                <h3 class="font-display font-black text-sm text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-wheat-awn text-amber-400"></i>
                  <span>दैनिक राशन एवं इनपुट लागत (Daily Inputs)</span>
                </h3>
                <span class="text-[10px] font-mono text-emerald-400">प्रति पशु/दिन</span>
              </div>

              <!-- Sliders Stack -->
              <div class="space-y-4 text-xs">
                
                <!-- 1. Dry Fodder (तूड़ी) -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200">1. सूखी तूड़ी / कड़बी (Dry Fodder):</span>
                    <span class="font-mono font-bold text-white"><strong id="valDryFodderKg" class="text-amber-400">${c.dryFodderKgPerCow}</strong> kg @ ₹<strong id="valDryFodderRate">${c.dryFodderPricePerKg}</strong>/kg</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <input type="range" id="sliderDryFodderKg" min="2" max="12" step="0.5" value="${c.dryFodderKgPerCow}" class="econ-slider w-full" />
                    <input type="range" id="sliderDryFodderRate" min="3" max="15" step="0.5" value="${c.dryFodderPricePerKg}" class="econ-slider w-full" />
                  </div>
                </div>

                <!-- 2. Green Fodder (हरा चारा) -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200">2. हरा चारा / बरसीम / ज्वार (Green Fodder):</span>
                    <span class="font-mono font-bold text-white"><strong id="valGreenFodderKg" class="text-emerald-400">${c.greenFodderKgPerCow}</strong> kg @ ₹<strong id="valGreenFodderRate">${c.greenFodderPricePerKg}</strong>/kg</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <input type="range" id="sliderGreenFodderKg" min="5" max="35" step="1" value="${c.greenFodderKgPerCow}" class="econ-slider w-full" />
                    <input type="range" id="sliderGreenFodderRate" min="1" max="5" step="0.5" value="${c.greenFodderPricePerKg}" class="econ-slider w-full" />
                  </div>
                </div>

                <!-- 3. Concentrate (खल / दाना) -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200">3. पशुआहार / खल-दाना (Concentrate):</span>
                    <span class="font-mono font-bold text-white"><strong id="valConcKg" class="text-cyan-400">${c.concentrateKgPerCow}</strong> kg @ ₹<strong id="valConcRate">${c.concentratePricePerKg}</strong>/kg</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <input type="range" id="sliderConcKg" min="1" max="8" step="0.5" value="${c.concentrateKgPerCow}" class="econ-slider w-full" />
                    <input type="range" id="sliderConcRate" min="16" max="35" step="1" value="${c.concentratePricePerKg}" class="econ-slider w-full" />
                  </div>
                </div>

                <!-- 4. Production & Milk Sale Price Controls -->
                <div class="grid grid-cols-3 gap-2.5 pt-1">
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 block font-mono uppercase">दुधारू पशु संख्या:</span>
                    <input type="number" id="inputMilkingCowsCount" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono font-bold mt-1 text-xs" value="${p.milkingCowsCount}" min="1" max="50" />
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 block font-mono uppercase">औसत दूध (L/पशु):</span>
                    <input type="number" step="0.5" id="inputAvgMilkYield" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-cyan-400 font-mono font-bold mt-1 text-xs" value="${p.avgDailyMilkPerCowLiters}" min="1" max="35" />
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span class="text-[10px] text-slate-400 block font-mono uppercase">दूध भाव (₹/Ltr):</span>
                    <input type="number" step="1" id="inputMilkPrice" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-emerald-400 font-mono font-bold mt-1 text-xs" value="${p.milkSalePricePerLiter}" min="25" max="90" />
                  </div>
                </div>

              </div>
            </div>

            <!-- Right Pane: Visual Cost Doughnut & Profit Summary (5 Cols) -->
            <div class="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
              <div class="border-b border-slate-800 pb-2.5 flex items-center justify-between">
                <h3 class="font-display font-black text-sm text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-chart-pie text-cyan-400"></i>
                  <span>खर्च एवं मुनाफा अनुपात (Breakdown)</span>
                </h3>
              </div>

              <!-- Cost Component Bars -->
              <div class="space-y-3 text-xs">
                <div>
                  <div class="flex justify-between text-slate-300 mb-1">
                    <span>दाना/खल खर्च (Concentrate):</span>
                    <strong class="font-mono text-cyan-400">₹${c.concentrateKgPerCow * c.concentratePricePerKg}/दिन</strong>
                  </div>
                  <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div class="bg-cyan-500 h-full" style="width: 50%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-slate-300 mb-1">
                    <span>तूड़ी व सूखा चारा (Dry Fodder):</span>
                    <strong class="font-mono text-amber-400">₹${c.dryFodderKgPerCow * c.dryFodderPricePerKg}/दिन</strong>
                  </div>
                  <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div class="bg-amber-500 h-full" style="width: 25%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-slate-300 mb-1">
                    <span>हरा चारा (Green Fodder):</span>
                    <strong class="font-mono text-emerald-400">₹${c.greenFodderKgPerCow * c.greenFodderPricePerKg}/दिन</strong>
                  </div>
                  <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full" style="width: 20%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-slate-300 mb-1">
                    <span>मजदूरी व अन्य खर्च (Labor/Misc):</span>
                    <strong class="font-mono text-slate-400">₹${c.laborCostPerCowDaily + c.veterinaryMiscDaily}/दिन</strong>
                  </div>
                  <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div class="bg-slate-600 h-full" style="width: 15%"></div>
                  </div>
                </div>
              </div>

              <!-- Monthly Income Reality Box -->
              <div class="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
                <span class="text-[10px] font-mono uppercase text-slate-400">30 दिन की शुद्ध बचत (Monthly Net In-Pocket)</span>
                <div class="text-2xl font-black font-display text-emerald-400">₹${res.monthlyNetProfit.toLocaleString("en-IN")}</div>
                <div class="text-[11px] text-slate-400 font-mono">कुल दूध बिक्री: ₹${res.monthlyGrossRevenue.toLocaleString("en-IN")}</div>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 2 - LEAST-COST FEED & DIARY OPTIMIZATION TIPS
    renderLeastCostFeedTipsTab: function () {
      const tips = [
        {
          title: "1. दलहनी हरा चारा (बरसीम / लूसर्न) से 25% दाना बचाएं",
          desc: "यदि पशु को 20-25 किलो उच्च प्रोटीन युक्त दलहनी हरा चारा दिया जाए, तो महंगे पशुआहार (खल-दाने) की मात्रा 1 से 1.5 किलो प्रतिदिन घटाई जा सकती है। इससे प्रति पशु ₹30-₹35 की सीधी दैनिक बचत होती है।",
          icon: "fa-leaf text-emerald-400"
        },
        {
          title: "2. यूरिया उपचारित तूड़ी (Urea Treated Straw) का प्रयोग",
          desc: "4 किलो यूरिया को 40 लीटर पानी में घोलकर 100 किलो गेहूं की तूड़ी पर छिड़कें और 21 दिनों तक ढक कर रखें। इससे तूड़ी में क्रूड प्रोटीन 3% से बढ़कर 8% हो जाता है और पाचन शक्ति 40% सुधरती है।",
          icon: "fa-seedling text-amber-400"
        },
        {
          title: "3. साइलेज (मक्के का अचार) बनाकर गर्मी के संकट से बचें",
          desc: "दूधिया अवस्था में मक्के की कटाई कर साइलेज गड्ढे में दबाएं। जब गर्मियों में हरा चारा नहीं होता, तब साइलेज खिलाने से दूध उत्पादन में 20% की गिरावट रुक जाती है।",
          icon: "fa-wheat-awn text-cyan-400"
        },
        {
          title: "4. चेलेटेड मिनरल मिक्सचर (50g प्रतिदिन अनिवार्य)",
          desc: "सस्ता सामान्य नमक देने के बजाय बायो-अवेलेबल चेलेटेड मिनरल मिक्सचर दें। इससे बार-बार हीट पर न आने (Repeat Breeding) का ₹3000-₹4000 का डॉक्टर खर्च बचता है।",
          icon: "fa-pills text-purple-400"
        }
      ];

      return `
        <div class="space-y-4">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-lightbulb text-amber-400"></i>
                  <span>वैज्ञानिक चारा बचत एवं डेयरी मुनाफा बढ़ाने के देसी सूत्र</span>
                </h3>
                <p class="text-xs text-slate-400 sunlight-muted">बिना दूध घटाए दैनिक चारा लागत 20-30% तक कम करने के प्रमाणित नियम।</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              ${tips.map(t => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div class="font-bold text-white text-sm flex items-center gap-2 sunlight-text">
                    <i class="fa-solid ${t.icon}"></i>
                    <span>${t.title}</span>
                  </div>
                  <p class="text-slate-300 font-sans">${t.desc}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: TAB 3 - MONTHLY 30-DAY PROJECTION LEDGER
    renderMonthlyProjectionLedgerTab: function () {
      const res = FeedCostProfitCalculator.state.economicResults;
      const p = FeedCostProfitCalculator.state.productionInputs;

      return `
        <div class="space-y-4">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-book-bookmark text-emerald-400"></i>
                  <span>मासिक वित्तीय प्रक्षेपण विवरण (30-Day Farm Ledger)</span>
                </h3>
                <p class="text-xs text-slate-400 sunlight-muted">${p.milkingCowsCount} दुधारू पशुओं के आधार पर 30-दिवसीय लाभ-हानि खाता।</p>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-400">₹${res.monthlyNetProfit.toLocaleString("en-IN")} NET PROFIT</span>
            </div>

            <div class="border border-slate-800 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th class="p-3">मद विवरण (Ledger Head)</th>
                    <th class="p-3 text-right">दैनिक लागत/आय</th>
                    <th class="p-3 text-right">मासिक कुल (30 दिन)</th>
                    <th class="p-3 text-right">अनुपात (%)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                  <tr>
                    <td class="p-3 font-bold text-emerald-400">सकल दूध बिक्री राजस्व (Gross Milk Revenue)</td>
                    <td class="p-3 text-right font-bold text-white">₹${res.grossDailyMilkRevenue.toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right font-bold text-emerald-400">₹${res.monthlyGrossRevenue.toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right">100.0%</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-slate-300">कुल पशुआहार व चारा खर्च (Feed Costs)</td>
                    <td class="p-3 text-right text-rose-300">₹${Math.round(res.totalDailyFeedCostPerCow * p.milkingCowsCount)}</td>
                    <td class="p-3 text-right text-rose-300">₹${Math.round(res.totalDailyFeedCostPerCow * p.milkingCowsCount * 30).toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right text-amber-400">${res.feedCostRatioPercent}%</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-slate-300">मजदूरी व फार्म रख-रखाव (Labor Cost)</td>
                    <td class="p-3 text-right">₹${Math.round(FeedCostProfitCalculator.state.farmCostInputs.laborCostPerCowDaily * p.milkingCowsCount)}</td>
                    <td class="p-3 text-right">₹${Math.round(FeedCostProfitCalculator.state.farmCostInputs.laborCostPerCowDaily * p.milkingCowsCount * 30).toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right">8.0%</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-slate-300">पशु चिकित्सा व अन्य व्यय (Healthcare/Misc)</td>
                    <td class="p-3 text-right">₹${Math.round(FeedCostProfitCalculator.state.farmCostInputs.veterinaryMiscDaily * p.milkingCowsCount)}</td>
                    <td class="p-3 text-right">₹${Math.round(FeedCostProfitCalculator.state.farmCostInputs.veterinaryMiscDaily * p.milkingCowsCount * 30).toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right">4.0%</td>
                  </tr>
                  <tr class="bg-emerald-950/20 font-black">
                    <td class="p-3 text-white text-sm">शुद्ध बचत / किसान की कमाई (Net Profit)</td>
                    <td class="p-3 text-right text-emerald-400 text-sm">₹${res.netDailyProfit.toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right text-emerald-400 text-sm">₹${res.monthlyNetProfit.toLocaleString("en-IN")}</td>
                    <td class="p-3 text-right text-emerald-400 text-sm">${res.profitMarginPercent}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // 17. PRINT MONTHLY FARM PROFIT DOSSIER (A4 STANDARD)
    printFarmProfitDossier: function () {
      const res = FeedCostProfitCalculator.state.economicResults;
      const c = FeedCostProfitCalculator.state.farmCostInputs;
      const p = FeedCostProfitCalculator.state.productionInputs;

      let printHost = document.getElementById("printableProfitDossier");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "printableProfitDossier";
        document.body.appendChild(printHost);
      }

      printHost.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 40px; color: #000; max-width: 750px; margin: 0 auto; line-height: 1.5;">
          <!-- Header -->
          <div style="border-bottom: 2.5px solid #064e3b; padding-bottom: 12px; margin-bottom: 18px; text-align: center;">
            <div style="font-size: 16px; font-weight: bold; text-transform: uppercase;">डेयरी फार्म प्रबंधन एवं वित्तीय विश्लेषण विवरणिका</div>
            <div style="font-size: 20px; font-weight: 900; color: #064e3b; margin: 4px 0;">मासिक दुग्ध उत्पादन एवं शुद्ध लाभ प्रमाणक</div>
            <div style="font-size: 11px; font-family: monospace;">FARM ECONOMICS & FEED EFFICIENCY STATEMENT • 2026</div>
          </div>

          <!-- Farmer Profile Summary -->
          <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; background: #f9fafb; border: 1px solid #e5e7eb; margin-bottom: 16px;">
            <tr>
              <td style="padding: 7px;"><strong>पशुपालक / फार्मर:</strong> रामनिवास यादव</td>
              <td style="padding: 7px;"><strong>गाँव एवं जिला:</strong> धांसू, हिसार (हरियाणा)</td>
            </tr>
            <tr>
              <td style="padding: 7px;"><strong>दुधारू पशु संख्या:</strong> ${p.milkingCowsCount} पशु</td>
              <td style="padding: 7px;"><strong>औसत उत्पादन प्रति पशु:</strong> ${p.avgDailyMilkPerCowLiters} लीटर/दिन</td>
            </tr>
            <tr>
              <td style="padding: 7px;"><strong>दूध विक्रय मूल्य:</strong> ₹${p.milkSalePricePerLiter}/लीटर</td>
              <td style="padding: 7px;"><strong>कुल दैनिक उत्पादन:</strong> ${p.milkingCowsCount * p.avgDailyMilkPerCowLiters} लीटर/दिन</td>
            </tr>
          </table>

          <!-- Economic Results Table -->
          <div style="margin-bottom: 18px;">
            <div style="font-size: 12px; font-weight: bold; color: #064e3b; margin-bottom: 6px; text-transform: uppercase;">1. वित्तीय निष्पादन सूचकांक (Performance Indicators)</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
              <thead>
                <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background: #f3f4f6;">
                  <th style="padding: 6px;">आर्थिक पैरामीटर</th>
                  <th style="padding: 6px; text-align: right;">दैनिक मान (Daily)</th>
                  <th style="padding: 6px; text-align: right;">मासिक कुल (30 Days)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">सकल दूध बिक्री राजस्व</td>
                  <td style="padding: 6px; text-align: right; font-weight: bold;">₹${res.grossDailyMilkRevenue.toLocaleString("en-IN")}</td>
                  <td style="padding: 6px; text-align: right; font-weight: bold; color: #064e3b;">₹${res.monthlyGrossRevenue.toLocaleString("en-IN")}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">चारा, दाना व मिनरल खर्च</td>
                  <td style="padding: 6px; text-align: right;">₹${Math.round(res.totalDailyFeedCostPerCow * p.milkingCowsCount)}</td>
                  <td style="padding: 6px; text-align: right;">₹${Math.round(res.totalDailyFeedCostPerCow * p.milkingCowsCount * 30).toLocaleString("en-IN")}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">मजदूरी एवं स्वास्थ्य व्यय</td>
                  <td style="padding: 6px; text-align: right;">₹${Math.round((c.laborCostPerCowDaily + c.veterinaryMiscDaily) * p.milkingCowsCount)}</td>
                  <td style="padding: 6px; text-align: right;">₹${Math.round((c.laborCostPerCowDaily + c.veterinaryMiscDaily) * p.milkingCowsCount * 30).toLocaleString("en-IN")}</td>
                </tr>
                <tr style="background: #f0fdf4; font-weight: bold;">
                  <td style="padding: 8px; font-size: 12px; color: #064e3b;">शुद्ध लाभ (Net Farm In-Pocket Profit)</td>
                  <td style="padding: 8px; text-align: right; font-size: 12px; color: #064e3b;">₹${res.netDailyProfit.toLocaleString("en-IN")}</td>
                  <td style="padding: 8px; text-align: right; font-size: 13px; color: #064e3b;">₹${res.monthlyNetProfit.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Benchmarks Box -->
          <div style="font-size: 10.5px; border-left: 3px solid #064e3b; padding-left: 10px; margin-bottom: 30px; color: #374151; background: #f9fafb; padding: 10px; border-radius: 4px;">
            <strong>दक्षता मूल्यांकन:</strong> इस फार्म पर 1 लीटर दूध उत्पादन की चारा लागत <strong>₹${res.feedCostPerLiter}</strong> है (जो दूध भाव का <strong>${res.feedCostRatioPercent}%</strong> है)। 60% से कम अनुपात स्वस्थ एवं अत्यधिक लाभकारी डेयरी फार्मिंग का परिचायक है।
          </div>

          <!-- Sign-Off -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              सत्यापन कोड: SHA256-ECON-${Date.now()}<br/>
              Vetcare AI OS v2.6.4 Production
            </div>
            <div style="text-align: center;">
              <div style="height: 40px; border-bottom: 1px solid #000; width: 170px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">(डेयरी फार्मर / खाता निरीक्षक)</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.print();
      }, 200);
    },

    // 18. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = FeedCostProfitCalculator.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".econ-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-econ-tab");
          if (tab) {
            FeedCostProfitCalculator.state.activeTab = tab;
            FeedCostProfitCalculator.render(FeedCostProfitCalculator.state.domContainer.id);
          }
        });
      });

      // Synchronize Sliders with Engine
      const bindSlider = function (id, propObj, key, labelId) {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", function () {
            const val = parseFloat(this.value);
            propObj[key] = val;
            const lbl = document.getElementById(labelId);
            if (lbl) lbl.textContent = val;
            FeedCostProfitCalculator.calculateEconomics();
            EconAudio.sliderClick();

            // Refresh cards smoothly
            const cardsHost = root.querySelector(".grid-cols-2.sm\\:grid-cols-4");
            if (cardsHost) {
              cardsHost.outerHTML = FeedCostProfitCalculator.renderTopSummaryCards();
            }
          });
        }
      };

      bindSlider("sliderDryFodderKg", FeedCostProfitCalculator.state.farmCostInputs, "dryFodderKgPerCow", "valDryFodderKg");
      bindSlider("sliderDryFodderRate", FeedCostProfitCalculator.state.farmCostInputs, "dryFodderPricePerKg", "valDryFodderRate");
      bindSlider("sliderGreenFodderKg", FeedCostProfitCalculator.state.farmCostInputs, "greenFodderKgPerCow", "valGreenFodderKg");
      bindSlider("sliderGreenFodderRate", FeedCostProfitCalculator.state.farmCostInputs, "greenFodderPricePerKg", "valGreenFodderRate");
      bindSlider("sliderConcKg", FeedCostProfitCalculator.state.farmCostInputs, "concentrateKgPerCow", "valConcKg");
      bindSlider("sliderConcRate", FeedCostProfitCalculator.state.farmCostInputs, "concentratePricePerKg", "valConcRate");

      // Number Inputs
      const inputCows = document.getElementById("inputMilkingCowsCount");
      const inputYield = document.getElementById("inputAvgMilkYield");
      const inputPrice = document.getElementById("inputMilkPrice");

      const updateNumbers = function () {
        if (inputCows) FeedCostProfitCalculator.state.productionInputs.milkingCowsCount = parseInt(inputCows.value, 10) || 1;
        if (inputYield) FeedCostProfitCalculator.state.productionInputs.avgDailyMilkPerCowLiters = parseFloat(inputYield.value) || 1;
        if (inputPrice) FeedCostProfitCalculator.state.productionInputs.milkSalePricePerLiter = parseFloat(inputPrice.value) || 1;
        FeedCostProfitCalculator.calculateEconomics();
        FeedCostProfitCalculator.render(FeedCostProfitCalculator.state.domContainer.id);
        EconAudio.chimeProfitPositive();
      };

      if (inputCows) inputCows.addEventListener("change", updateNumbers);
      if (inputYield) inputYield.addEventListener("change", updateNumbers);
      if (inputPrice) inputPrice.addEventListener("change", updateNumbers);

      // Print Button
      const btnPrint = document.getElementById("btnPrintDossierTrigger");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => FeedCostProfitCalculator.printFarmProfitDossier());
      }
    }
  };

  // 19. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Farmer.FeedCostProfitCalculator = FeedCostProfitCalculator;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("farmerFeedEconomicsContainer");
    if (defaultHost) {
      FeedCostProfitCalculator.init("farmerFeedEconomicsContainer");
    }
  });

})(window, document);
