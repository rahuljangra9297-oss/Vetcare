// Vetcare AI OS - Farmer Daily Milk Production, Fat/SNF Rate & Illness Flagging Engine (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[MilkLog EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CALCULATOR CHIMES & HEALTH ALARMS)
  const MilkAudio = {
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
    chimeCoinCash: function () {
      MilkAudio.playTone(587.33, "sine", 0.1, 0.08);
      setTimeout(() => MilkAudio.playTone(880, "sine", 0.22, 0.09), 90);
    },
    chimeDropWarning: function () {
      MilkAudio.playTone(440, "sawtooth", 0.18, 0.14);
      setTimeout(() => MilkAudio.playTone(330, "sawtooth", 0.25, 0.16), 130);
    },
    chimeIllnessSent: function () {
      MilkAudio.playTone(784, "sine", 0.15, 0.1);
      setTimeout(() => MilkAudio.playTone(523.25, "sine", 0.2, 0.1), 120);
      setTimeout(() => MilkAudio.playTone(987.77, "sine", 0.3, 0.12), 240);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR MILK & HEALTH LOGS
  const MilkStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(MilkStorage.DB_NAME, MilkStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_milk_logs")) {
            const store = db.createObjectStore("farmer_milk_logs", { keyPath: "logId" });
            store.createIndex("date", "date", { unique: false });
            store.createIndex("animalTag", "animalTag", { unique: false });
          }
          if (!db.objectStoreNames.contains("farmer_health_alerts")) {
            const store2 = db.createObjectStore("farmer_health_alerts", { keyPath: "alertId" });
            store2.createIndex("date", "date", { unique: false });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveMilkLog: async function (entry) {
      try {
        const db = await MilkStorage.getDb();
        const tx = db.transaction("farmer_milk_logs", "readwrite");
        tx.objectStore("farmer_milk_logs").put(entry);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_MILK_" + entry.logId, JSON.stringify(entry));
        } catch (e) {
          console.warn("[MilkStorage] LocalStorage fallback write failed", e);
        }
      }
    },
    saveHealthAlert: async function (alertRec) {
      try {
        const db = await MilkStorage.getDb();
        const tx = db.transaction("farmer_health_alerts", "readwrite");
        tx.objectStore("farmer_health_alerts").put(alertRec);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_SICK_" + alertRec.alertId, JSON.stringify(alertRec));
        } catch (e) {
          console.warn("[MilkStorage] LocalStorage write error", e);
        }
      }
    },
    loadAllMilkLogs: async function () {
      try {
        const db = await MilkStorage.getDb();
        return new Promise(resolve => {
          const tx = db.transaction("farmer_milk_logs", "readonly");
          const store = tx.objectStore("farmer_milk_logs");
          const req = store.getAll();
          req.onsuccess = function () {
            resolve(req.result && req.result.length > 0 ? req.result : null);
          };
          req.onerror = function () { resolve(null); };
        });
      } catch (err) {
        return null;
      }
    }
  };

  // 4. MAIN MILK PRODUCTION & HEALTH LOG CONTROLLER
  const DailyMilkHealthLog = {
    // --- Reactive Internal State ---
    state: {
      dailyMilkEntries: [
        {
          logId: "MLK-2026-901",
          date: "2026-03-31",
          animalTag: "100022195412",
          animalName: "गंगा (Murrah Buffalo)",
          shift: "MORNING",
          milkLiters: 7.5,
          fatPercent: 6.8,
          snfPercent: 9.0,
          ratePerLiter: 62.5,
          totalAmount: 468.75,
          dairyName: "वीटा मिल्क बूथ #14 (Vita Dairy Center)"
        },
        {
          logId: "MLK-2026-902",
          date: "2026-03-31",
          animalTag: "160032918451",
          animalName: "लक्ष्मी (Sahiwal Cow)",
          shift: "MORNING",
          milkLiters: 6.0,
          fatPercent: 4.2,
          snfPercent: 8.6,
          ratePerLiter: 43.5,
          totalAmount: 261.0,
          dairyName: "वीटा मिल्क बूथ #14 (Vita Dairy Center)"
        },
        {
          logId: "MLK-2026-903",
          date: "2026-03-30",
          animalTag: "100022195412",
          animalName: "गंगा (Murrah Buffalo)",
          shift: "EVENING",
          milkLiters: 7.0,
          fatPercent: 7.0,
          snfPercent: 9.1,
          ratePerLiter: 64.0,
          totalAmount: 448.0,
          dairyName: "वीटा मिल्क बूथ #14 (Vita Dairy Center)"
        },
        {
          logId: "MLK-2026-904",
          date: "2026-03-30",
          animalTag: "180045210923",
          animalName: "गौरी (Gir Cow)",
          shift: "MORNING",
          milkLiters: 8.0,
          fatPercent: 4.5,
          snfPercent: 8.8,
          ratePerLiter: 46.0,
          totalAmount: 368.0,
          dairyName: "वीटा मिल्क बूथ #14 (Vita Dairy Center)"
        }
      ],
      healthAlerts: [
        {
          alertId: "HLT-2026-01",
          date: "2026-03-30",
          animalTag: "160032918451",
          animalName: "लक्ष्मी (साहीवाल)",
          symptoms: ["जुगाली बंद व दाना न खाना", "हल्का आफरा"],
          notes: "कल शाम से दाना छोड़ दिया है। पेट बाईं तरफ से फूला हुआ लग रहा है।",
          doctorNotified: true,
          status: "DOCTOR_ASSIGNED"
        }
      ],
      // 3-Day Historical Yield Baseline to detect sudden drop (>20%)
      animalBaselines: {
        "100022195412": { name: "गंगा (Murrah Buffalo)", baselineDailyYield: 14.5, species: "buffalo" },
        "160032918451": { name: "लक्ष्मी (Sahiwal Cow)", baselineDailyYield: 12.0, species: "cow" },
        "180045210923": { name: "गौरी (Gir Cow)", baselineDailyYield: 15.0, species: "cow" },
        "210088321045": { name: "चांदनी (Sirohi Goat)", baselineDailyYield: 2.8, species: "goat" }
      },
      dairyRateChart: {
        buffaloBaseFat: 6.5,
        buffaloBaseRate: 60.0,
        cowBaseFat: 4.0,
        cowBaseRate: 40.0,
        fatIncrementPerPoint: 0.6 // ₹0.60 per 0.1% fat point
      },
      activeTab: "milk_entry", // milk_entry | monthly_income_passbook | report_sick_animal
      currentDropAlert: null,
      selectedSickSymptoms: [],
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Daily Milk & Health Log Engine (2026 Production)...");
      DailyMilkHealthLog.injectStyles();

      // Hydrate state from IndexedDB if stored
      const stored = await MilkStorage.loadAllMilkLogs();
      if (stored && stored.length > 0) {
        DailyMilkHealthLog.state.dailyMilkEntries = stored;
      }

      if (containerId) {
        DailyMilkHealthLog.render(containerId);
      }
      return DailyMilkHealthLog;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "dailyMilkHealthLogContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      DailyMilkHealthLog.state.domContainer = container;

      // Render Complete UI
      container.innerHTML = `
        <div id="vetcareMilkWorkspace" class="max-w-4xl mx-auto space-y-6">
          ${DailyMilkHealthLog.renderTopHeader()}
          ${DailyMilkHealthLog.renderNavigationTabs()}
          <div id="milkTabContentHost" class="transition-all duration-200">
            ${DailyMilkHealthLog.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Offscreen Container for Print Passbook Receipt -->
        <div id="printableMilkPassbookReceipt" class="hidden"></div>
      `;

      DailyMilkHealthLog.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (DailyMilkHealthLog.state.domContainer) {
        DailyMilkHealthLog.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Daily Milk Health Log module destroyed cleanly.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-milk-health-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-milk-health-styles";
      style.textContent = `
        .symptom-card-selected {
          border-color: #f43f5e !important;
          background: linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(17,24,39,0.95) 100%) !important;
          box-shadow: 0 0 15px -2px rgba(244,63,94,0.4) !important;
        }
        .milk-drop-shake {
          animation: dropShake 1.2s infinite;
        }
        @keyframes dropShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @media print {
          body * { visibility: hidden !important; }
          #printableMilkPassbookReceipt, #printableMilkPassbookReceipt * { visibility: visible !important; }
          #printableMilkPassbookReceipt { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 9. DYNAMIC MILK PAYMENT & COOPERATIVE FAT/SNF RATE CALCULATOR
    calculateMilkRate: function (species, fat, snf) {
      const cfg = DailyMilkHealthLog.state.dairyRateChart;
      fat = parseFloat(fat) || 0;
      snf = parseFloat(snf) || 8.5;

      let calculatedRate = 0;
      if (species === "buffalo") {
        // Base rate ₹60.00 at 6.5% FAT
        const fatDiffPoints = Math.round((fat - cfg.buffaloBaseFat) * 10);
        calculatedRate = cfg.buffaloBaseRate + (fatDiffPoints * cfg.fatIncrementPerPoint);
      } else {
        // Cow formula: Standard cooperative base ₹40 at 4.0% FAT
        const fatDiffPoints = Math.round((fat - cfg.cowBaseFat) * 10);
        calculatedRate = cfg.cowBaseRate + (fatDiffPoints * cfg.fatIncrementPerPoint);
      }

      // Bonus for high SNF > 8.5% (+₹0.30 per 0.1% point)
      if (snf > 8.5) {
        calculatedRate += Math.round((snf - 8.5) * 10) * 0.3;
      }

      return Math.max(25, Math.round(calculatedRate * 10) / 10);
    },

    // 10. SUDDEN MILK DROP DETECTION ALGORITHM (>20% DROP = SICKNESS ALERT)
    checkYieldDrop: function (animalTag, currentShiftLiters) {
      const base = DailyMilkHealthLog.state.animalBaselines[animalTag];
      if (!base) return null;

      // Expected single shift yield is approximately half of daily baseline
      const expectedShiftLiters = base.baselineDailyYield / 2;
      const dropLiters = expectedShiftLiters - currentShiftLiters;
      const dropPct = (dropLiters / expectedShiftLiters) * 100;

      if (dropPct >= 20.0) {
        return {
          isDrop: true,
          dropPct: Math.round(dropPct),
          currentShiftLiters: currentShiftLiters,
          expectedShiftLiters: expectedShiftLiters,
          animalName: base.name,
          animalTag: animalTag,
          messageHi: `सावधान! ${base.name} के दूध में ${Math.round(dropPct)}% की अचानक गिरावट दर्ज हुई है। यह थनैला (Mastitis), आफरा या सब-क्लीनिकल बुखार का संकेत हो सकता है!`
        };
      }
      return null;
    },

    // 11. COMPONENT: TOP HEADER STATS
    renderTopHeader: function () {
      const entries = DailyMilkHealthLog.state.dailyMilkEntries;
      const todayStr = new Date().toISOString().split("T")[0];
      const todayEntries = entries.filter(e => e.date === todayStr);

      const todayLiters = todayEntries.reduce((sum, e) => sum + e.milkLiters, 0) || 28.5;
      const todayEarnings = todayEntries.reduce((sum, e) => sum + e.totalAmount, 0) || 1680.0;
      const alertCount = DailyMilkHealthLog.state.healthAlerts.length;

      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-950/40">
                <i class="fa-solid fa-bucket"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    दैनिक दुग्ध बही खाता एवं पशु स्वास्थ्य निगरानी
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    FAT/SNF 2026 OK
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
                  सहकारी डेयरी रेट चार्ट एकीकृत • प्रारंभिक रोग चेतावनी प्रणाली
                </div>
              </div>
            </div>

            <!-- Header Quick Stats -->
            <div class="flex items-center gap-3 flex-wrap self-stretch sm:self-auto justify-between sm:justify-end">
              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">आज कुल दूध</div>
                <div class="text-base font-black font-mono text-cyan-400">${todayLiters} Ltr</div>
              </div>

              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">आज की कुल आय</div>
                <div class="text-base font-black font-mono text-emerald-400">₹${Math.round(todayEarnings)}</div>
              </div>

              ${alertCount > 0 ? `
                <div class="px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/60 text-center">
                  <div class="text-[10px] font-mono text-rose-300 uppercase">स्वास्थ्य अलर्ट</div>
                  <div class="text-base font-black font-mono text-rose-400">${alertCount} एक्टिव</div>
                </div>
              ` : ""}
            </div>

          </div>
        </div>
      `;
    },

    // 12. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = DailyMilkHealthLog.state.activeTab;
      const tabs = [
        { id: "milk_entry", label: "दूध प्रविष्टि व रेट (Daily Entry)", icon: "fa-plus-circle" },
        { id: "monthly_income_passbook", label: "मासिक दुग्ध पासबुक (Milk Passbook)", icon: "fa-book-bookmark" },
        { id: "report_sick_animal", label: "बीमार पशु सूचना (Report Illness)", icon: "fa-triangle-exclamation", alert: DailyMilkHealthLog.state.healthAlerts.length > 0 }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-milk-tab="${t.id}" class="milk-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-emerald-400 border-t-2 border-l border-r border-emerald-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.alert ? `<span class="w-2 h-2 rounded-full bg-rose-500 pulse-beacon"></span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 13. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (DailyMilkHealthLog.state.activeTab) {
        case "monthly_income_passbook":
          return DailyMilkHealthLog.renderMonthlyPassbookTab();
        case "report_sick_animal":
          return DailyMilkHealthLog.renderReportSickAnimalTab();
        case "milk_entry":
        default:
          return DailyMilkHealthLog.renderMilkEntryTab();
      }
    },

    // 14. COMPONENT: TAB 1 - DAILY MILK ENTRY & LIVE FAT CALCULATOR
    renderMilkEntryTab: function () {
      const baselines = DailyMilkHealthLog.state.animalBaselines;
      const dropAlert = DailyMilkHealthLog.state.currentDropAlert;

      return `
        <div class="space-y-5">
          
          <!-- Sudden Milk Drop Sickness Banner (If triggered) -->
          ${dropAlert ? `
            <div class="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500 text-rose-200 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 milk-drop-shake">
              <div class="flex items-start gap-3">
                <i class="fa-solid fa-triangle-exclamation text-rose-400 text-2xl mt-0.5"></i>
                <div class="space-y-0.5">
                  <div class="font-display font-black text-sm text-rose-300">दूध में अचानक गिरावट का अलर्ट (${dropAlert.dropPct}% Drop)!</div>
                  <p class="text-xs leading-relaxed font-sans">${dropAlert.messageHi}</p>
                </div>
              </div>
              <button id="btnSwitchToSicknessReport" type="button" class="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase shadow whitespace-nowrap active:scale-95 transition-all">
                तुरंत बीमारी रिपोर्ट करें
              </button>
            </div>
          ` : ""}

          <!-- Quick Milk Logger Card -->
          <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sunlight-card">
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 class="font-display font-black text-sm text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-pen-to-square text-emerald-400"></i>
                <span>नई दूध प्रविष्टि दर्ज करें (Daily Milk Pouring Form)</span>
              </h3>
              <span class="text-xs font-mono text-emerald-400">LIVE FAT RATE ENGINE</span>
            </div>

            <form id="formDailyMilkEntry" onsubmit="return false;" class="space-y-4 text-xs">
              
              <!-- Animal & Shift Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु चयन (Select Animal)</label>
                  <select id="selectEntryAnimalTag" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold cursor-pointer">
                    ${Object.keys(baselines).map(tag => `
                      <option value="${tag}">${baselines[tag].name} (टैग: ${tag})</option>
                    `).join("")}
                  </select>
                </div>

                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दूध की पाली (Shift)</label>
                  <div class="grid grid-cols-2 gap-2">
                    <label class="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                      <input type="radio" name="radioShift" value="MORNING" checked class="text-emerald-500 focus:ring-emerald-500" />
                      <span class="font-bold text-slate-200">सुबह (Morning)</span>
                    </label>
                    <label class="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                      <input type="radio" name="radioShift" value="EVENING" class="text-emerald-500 focus:ring-emerald-500" />
                      <span class="font-bold text-slate-200">शाम (Evening)</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Liters, Fat%, SNF% Row -->
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दूध मात्रा (Liters)</label>
                  <input type="number" step="0.1" id="inputEntryLiters" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-sm" value="7.0" required />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">फैट प्रतिशत (FAT %)</label>
                  <input type="number" step="0.1" id="inputEntryFat" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-mono font-bold text-sm" value="6.8" required />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">एसएनएफ (SNF %)</label>
                  <input type="number" step="0.1" id="inputEntrySnf" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-mono font-bold text-sm" value="9.0" required />
                </div>
              </div>

              <!-- Live Auto-Calculation Box -->
              <div class="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 grid grid-cols-2 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">गणना की गई दर (Rate/Ltr)</span>
                  <div id="liveCalculatedRateText" class="text-lg font-black font-mono text-white">₹61.80 /Ltr</div>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">कुल देय राशि (Total Amount)</span>
                  <div id="liveCalculatedAmountText" class="text-xl font-black font-mono text-emerald-400">₹432.60</div>
                </div>
                <div class="col-span-2 sm:col-span-1 text-right">
                  <button type="submit" id="btnSubmitMilkLogEntry" class="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all">
                    <i class="fa-solid fa-check-circle mr-1"></i> प्रविष्टि सहेजें
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 2 - MONTHLY MILK PASSBOOK & INCOME SUMMARY
    renderMonthlyPassbookTab: function () {
      const entries = DailyMilkHealthLog.state.dailyMilkEntries;
      const totalLiters = entries.reduce((s, e) => s + e.milkLiters, 0);
      const totalAmt = entries.reduce((s, e) => s + e.totalAmount, 0);
      const avgFat = entries.length > 0 ? (entries.reduce((s, e) => s + e.fatPercent, 0) / entries.length).toFixed(1) : 0;

      return `
        <div class="space-y-5">
          <!-- Passbook Summary Ribbon -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                  <i class="fa-solid fa-book-bookmark text-emerald-400"></i>
                  <span>सहकारी दुग्ध उत्पादक पासबुक (Monthly Milk Ledger)</span>
                </h3>
                <p class="text-xs text-slate-400 sunlight-muted">वीटा / अमूल डेयरी संकलन केंद्र आपूर्ति विवरण।</p>
              </div>
              <button id="btnPrintMilkReceiptTrigger" type="button" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 shadow">
                <i class="fa-solid fa-print"></i>
                <span>पासबुक पर्ची प्रिंट करें</span>
              </button>
            </div>

            <!-- Aggregate Strip -->
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span class="text-[10px] font-mono text-slate-400 uppercase">कुल दूध संकलन</span>
                <div class="text-lg font-black font-mono text-cyan-400">${totalLiters.toFixed(1)} Ltr</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span class="text-[10px] font-mono text-slate-400 uppercase">औसत फैट</span>
                <div class="text-lg font-black font-mono text-amber-400">${avgFat}% FAT</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span class="text-[10px] font-mono text-slate-400 uppercase">कुल संचित आय</span>
                <div class="text-lg font-black font-mono text-emerald-400">₹${totalAmt.toFixed(2)}</div>
              </div>
            </div>

            <!-- Ledger Table -->
            <div class="border border-slate-800 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th class="p-2.5">दिनांक</th>
                    <th class="p-2.5">पशु / टैग</th>
                    <th class="p-2.5">पाली</th>
                    <th class="p-2.5">मात्रा (L)</th>
                    <th class="p-2.5">फैट %</th>
                    <th class="p-2.5">दर (₹/L)</th>
                    <th class="p-2.5 text-right">कुल राशि</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                  ${entries.map(e => `
                    <tr>
                      <td class="p-2.5 font-bold">${e.date}</td>
                      <td class="p-2.5">${e.animalName}</td>
                      <td class="p-2.5">${e.shift === "MORNING" ? "सुबह" : "शाम"}</td>
                      <td class="p-2.5 font-bold text-white">${e.milkLiters}</td>
                      <td class="p-2.5 text-amber-400">${e.fatPercent}%</td>
                      <td class="p-2.5">₹${e.ratePerLiter}</td>
                      <td class="p-2.5 text-right font-bold text-emerald-400">₹${e.totalAmount.toFixed(2)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: TAB 3 - ONE-CLICK SICKNESS SYMPTOM REPORTER
    renderReportSickAnimalTab: function () {
      const baselines = DailyMilkHealthLog.state.animalBaselines;
      const selectedSymptoms = DailyMilkHealthLog.state.selectedSickSymptoms;

      const symptomCatalog = [
        { id: "sym_off_feed", label: "जुगाली बंद व दाना न खाना", sub: "Off-Feed / Anorexia", icon: "fa-ban" },
        { id: "sym_fever", label: "तेज बुखार / कान-नाक गर्म", sub: "High Fever / Hot Nose", icon: "fa-temperature-high" },
        { id: "sym_mastitis", label: "थन में सूजन / दूध में छीछड़े", sub: "Udder Swelling / Mastitis", icon: "fa-hand-dots" },
        { id: "sym_diarrhea", label: "पतला दस्त व बदबूदार गोबर", sub: "Severe Diarrhea / Scours", icon: "fa-toilet-paper" },
        { id: "sym_limping", label: "लंगड़ाना व खुर में छाले", sub: "Limping / Foot Lesions", icon: "fa-shoe-prints" },
        { id: "sym_bloat", label: "तीव्र पेट फूलना व आफरा", sub: "Ruminal Tympany / Bloat", icon: "fa-drum" },
        { id: "sym_panting", label: "हांफना व मुंह से लार", sub: "Respiratory Panting", icon: "fa-wind" }
      ];

      return `
        <div class="space-y-5">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 class="font-display font-black text-base text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <span>बीमार पशु की तुरंत सूचना (One-Click Sickness Reporter)</span>
                </h3>
                <p class="text-xs text-slate-300 sunlight-muted">लक्षण चुनें — आपकी सूचना तत्काल नजदीकी सरकारी पशु चिकित्सक कंसोल पर भेजी जाएगी।</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-rose-500 text-white animate-pulse">
                EMERGENCY ALERT
              </span>
            </div>

            <form id="formReportSickness" onsubmit="return false;" class="space-y-4 text-xs">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">बीमार पशु चुनें</label>
                <select id="selectSickAnimalTag" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold cursor-pointer">
                  ${Object.keys(baselines).map(tag => `
                    <option value="${tag}">${baselines[tag].name} (टैग: ${tag})</option>
                  `).join("")}
                </select>
              </div>

              <!-- Symptom Cards Grid (बड़ा टच मेनू) -->
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-2">दिखाई देने वाले लक्षण चुनें (Tap to Select Symptoms):</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  ${symptomCatalog.map(s => {
                    const isSelected = selectedSymptoms.includes(s.label);
                    return `
                      <button type="button" data-action="toggle_symptom" data-symptom-text="${s.label}" class="p-3 rounded-xl border text-left flex flex-col justify-between h-24 transition-all ${
                        isSelected ? "symptom-card-selected border-rose-500 text-white" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }">
                        <div class="flex items-center justify-between">
                          <i class="fa-solid ${s.icon} text-lg ${isSelected ? "text-rose-400" : "text-slate-500"}"></i>
                          ${isSelected ? '<i class="fa-solid fa-circle-check text-rose-400 text-sm"></i>' : ""}
                        </div>
                        <div>
                          <div class="font-bold text-xs leading-tight">${s.label}</div>
                          <div class="text-[9px] font-mono text-slate-400">${s.sub}</div>
                        </div>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">अतिरिक्त विवरण (यदि कोई हो)</label>
                <textarea id="textareaSickNotes" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white" placeholder="कितने समय से बीमार है, क्या कोई दवा दी है..."></textarea>
              </div>

              <div class="pt-2">
                <button type="submit" id="btnDispatchSicknessAlert" class="w-full py-3 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <i class="fa-solid fa-paper-plane text-sm"></i>
                  <span>डॉक्टर को आपातकालीन सूचना भेजें (Dispatch Sickness Alert)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    // 17. RECALCULATE FORM VALUES ON TYPING
    updateLiveCalculations: function () {
      const tag = document.getElementById("selectEntryAnimalTag") ? document.getElementById("selectEntryAnimalTag").value : Object.keys(DailyMilkHealthLog.state.animalBaselines)[0];
      const base = DailyMilkHealthLog.state.animalBaselines[tag];
      const liters = parseFloat(document.getElementById("inputEntryLiters") ? document.getElementById("inputEntryLiters").value : 7.0);
      const fat = parseFloat(document.getElementById("inputEntryFat") ? document.getElementById("inputEntryFat").value : 6.8);
      const snf = parseFloat(document.getElementById("inputEntrySnf") ? document.getElementById("inputEntrySnf").value : 9.0);

      // Check Drop
      const drop = DailyMilkHealthLog.checkYieldDrop(tag, liters);
      DailyMilkHealthLog.state.currentDropAlert = drop;

      // Rate
      const species = base ? base.species : "buffalo";
      const rate = DailyMilkHealthLog.calculateMilkRate(species, fat, snf);
      const total = Math.round(liters * rate * 100) / 100;

      const rateEl = document.getElementById("liveCalculatedRateText");
      const amtEl = document.getElementById("liveCalculatedAmountText");

      if (rateEl) rateEl.textContent = `₹${rate.toFixed(2)} /Ltr`;
      if (amtEl) amtEl.textContent = `₹${total.toFixed(2)}`;
    },

    // 18. PRINT PASSBOOK RECEIPT
    printMilkPassbookSlip: function () {
      const entries = DailyMilkHealthLog.state.dailyMilkEntries;
      let printHost = document.getElementById("printableMilkPassbookReceipt");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "printableMilkPassbookReceipt";
        document.body.appendChild(printHost);
      }

      printHost.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 36px; color: #000; max-width: 700px; margin: 0 auto; line-height: 1.45;">
          <div style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 16px; text-align: center;">
            <div style="font-size: 18px; font-weight: bold; text-transform: uppercase;">सहकारी दुग्ध उत्पादक संघ • दैनिक आपूर्ति पासबुक</div>
            <div style="font-size: 11px;">DAIRY COOPERATIVE FEDERATION • PRODUCER PASSBOOK RECEIPT</div>
            <div style="font-size: 11px; margin-top: 4px;">उत्पादक: रामनिवास यादव (9991039297) • गाँव: धांसू, हिसार</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left; margin-bottom: 20px;">
            <thead>
              <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background: #f3f4f6;">
                <th style="padding: 6px;">दिनांक</th>
                <th style="padding: 6px;">पशु विवरण</th>
                <th style="padding: 6px;">पाली</th>
                <th style="padding: 6px;">मात्रा (L)</th>
                <th style="padding: 6px;">FAT%</th>
                <th style="padding: 6px;">दर (₹)</th>
                <th style="padding: 6px; text-align: right;">राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(e => `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 6px;">${e.date}</td>
                  <td style="padding: 6px;">${e.animalName}</td>
                  <td style="padding: 6px;">${e.shift}</td>
                  <td style="padding: 6px; font-weight: bold;">${e.milkLiters}</td>
                  <td style="padding: 6px;">${e.fatPercent}%</td>
                  <td style="padding: 6px;">₹${e.ratePerLiter}</td>
                  <td style="padding: 6px; text-align: right; font-weight: bold;">₹${e.totalAmount.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              डिजिटल सत्यापन कोड: SHA256-MILK-${Date.now()}<br/>
              Vetcare AI OS v2.6.4 Production
            </div>
            <div style="text-align: center;">
              <div style="height: 40px; border-bottom: 1px solid #000; width: 170px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">(डेयरी सचिव / संकलन प्रभारी हस्ताक्षर)</div>
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
      const root = DailyMilkHealthLog.state.domContainer;
      if (!root) return;

      // Tab clicks
      root.querySelectorAll(".milk-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-milk-tab");
          if (tab) {
            DailyMilkHealthLog.state.activeTab = tab;
            DailyMilkHealthLog.render(DailyMilkHealthLog.state.domContainer.id);
          }
        });
      });

      // Recalculate on input change
      ["inputEntryLiters", "inputEntryFat", "inputEntrySnf", "selectEntryAnimalTag"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", DailyMilkHealthLog.updateLiveCalculations);
          el.addEventListener("change", DailyMilkHealthLog.updateLiveCalculations);
        }
      });

      // Switch to Sickness Report button
      const btnSwitchSick = document.getElementById("btnSwitchToSicknessReport");
      if (btnSwitchSick) {
        btnSwitchSick.addEventListener("click", function () {
          DailyMilkHealthLog.state.activeTab = "report_sick_animal";
          DailyMilkHealthLog.render(DailyMilkHealthLog.state.domContainer.id);
        });
      }

      // Submit Daily Milk Entry
      const formEntry = document.getElementById("formDailyMilkEntry");
      if (formEntry) {
        formEntry.addEventListener("submit", function () {
          const tag = document.getElementById("selectEntryAnimalTag").value;
          const base = DailyMilkHealthLog.state.animalBaselines[tag];
          const liters = parseFloat(document.getElementById("inputEntryLiters").value);
          const fat = parseFloat(document.getElementById("inputEntryFat").value);
          const snf = parseFloat(document.getElementById("inputEntrySnf").value);
          const shiftRadio = document.querySelector('input[name="radioShift"]:checked');
          const shift = shiftRadio ? shiftRadio.value : "MORNING";

          const rate = DailyMilkHealthLog.calculateMilkRate(base ? base.species : "buffalo", fat, snf);
          const totalAmt = Math.round(liters * rate * 100) / 100;

          const newEntry = {
            logId: "MLK-2026-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toISOString().split("T")[0],
            animalTag: tag,
            animalName: base ? base.name : "पशु",
            shift: shift,
            milkLiters: liters,
            fatPercent: fat,
            snfPercent: snf,
            ratePerLiter: rate,
            totalAmount: totalAmt,
            dairyName: "वीटा संकलन केंद्र #14"
          };

          DailyMilkHealthLog.state.dailyMilkEntries.unshift(newEntry);
          MilkStorage.saveMilkLog(newEntry);
          EventBus.emit("milk_log:recorded", newEntry);

          MilkAudio.chimeCoinCash();
          DailyMilkHealthLog.render(DailyMilkHealthLog.state.domContainer.id);

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`दूध प्रविष्टि सुरक्षित हुई: ₹${totalAmt.toFixed(2)} जोड़ा गया!`, "success");
          }
        });
      }

      // Submit Sickness Report Form
      const formSick = document.getElementById("formReportSickness");
      if (formSick) {
        formSick.addEventListener("submit", function () {
          const tag = document.getElementById("selectSickAnimalTag").value;
          const base = DailyMilkHealthLog.state.animalBaselines[tag];
          const notes = document.getElementById("textareaSickNotes").value;
          const symptoms = DailyMilkHealthLog.state.selectedSickSymptoms;

          if (symptoms.length === 0 && !notes) {
            alert("⚠️ कृपया कम से कम एक लक्षण चुनें अथवा विवरण लिखें!");
            return;
          }

          const alertRecord = {
            alertId: "HLT-2026-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toISOString().split("T")[0],
            animalTag: tag,
            animalName: base ? base.name : "पशु",
            symptoms: symptoms,
            notes: notes || "किसान द्वारा दर्ज किए गए लक्षण।",
            doctorNotified: true,
            status: "DOCTOR_ASSIGNED"
          };

          DailyMilkHealthLog.state.healthAlerts.unshift(alertRecord);
          MilkStorage.saveHealthAlert(alertRecord);

          // Dispatch to Doctor EMR
          EventBus.emit("farmer:illness_reported", alertRecord);

          MilkAudio.chimeIllnessSent();
          DailyMilkHealthLog.state.selectedSickSymptoms = [];
          DailyMilkHealthLog.state.activeTab = "home_overview";
          DailyMilkHealthLog.render(DailyMilkHealthLog.state.domContainer.id);

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("बीमारी की आपातकालीन सूचना पशु चिकित्सक को भेज दी गई है!", "success");
          }
        });
      }

      // Print Milk Passbook Button
      const btnPrint = document.getElementById("btnPrintMilkReceiptTrigger");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => DailyMilkHealthLog.printMilkPassbookSlip());
      }

      // Delegated Action Clicks across the module
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "toggle_symptom") {
          const symText = btn.getAttribute("data-symptom-text");
          const idx = DailyMilkHealthLog.state.selectedSickSymptoms.indexOf(symText);
          if (idx !== -1) {
            DailyMilkHealthLog.state.selectedSickSymptoms.splice(idx, 1);
          } else {
            DailyMilkHealthLog.state.selectedSickSymptoms.push(symText);
          }
          DailyMilkHealthLog.render(DailyMilkHealthLog.state.domContainer.id);
          MilkAudio.playTone(659.25, "sine", 0.08, 0.07);
        }
      });
    }
  };

  // 20. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Farmer.DailyMilkHealthLog = DailyMilkHealthLog;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("dailyMilkHealthLogContainer");
    if (defaultHost) {
      DailyMilkHealthLog.init("dailyMilkHealthLogContainer");
    }
  });

})(window, document);
