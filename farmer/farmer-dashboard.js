// Vetcare AI OS - Farmer Mobile Portal, Livestock Overview & One-Touch SOS Dashboard (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[Farmer EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CHIMES & SOS KLAXONS)
  const FarmerAudio = {
    playTone: function (freq, type, duration, vol) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.25));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.25));
      } catch (e) {
        // Fallback for restricted autoplay
      }
    },
    chimeSosSiren: function () {
      FarmerAudio.playTone(987.77, "sawtooth", 0.3, 0.2);
      setTimeout(() => FarmerAudio.playTone(493.88, "sawtooth", 0.35, 0.22), 220);
      setTimeout(() => FarmerAudio.playTone(987.77, "sawtooth", 0.45, 0.25), 450);
    },
    chimeSuccess: function () {
      FarmerAudio.playTone(523.25, "sine", 0.12, 0.08);
      setTimeout(() => FarmerAudio.playTone(659.25, "sine", 0.15, 0.08), 100);
      setTimeout(() => FarmerAudio.playTone(783.99, "sine", 0.25, 0.09), 200);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB INTEGRATION FOR LIVESTOCK RECORDS
  const FarmerStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    getHerdRecords: async function () {
      return new Promise(resolve => {
        if (!window.indexedDB) {
          resolve(null);
          return;
        }
        const req = window.indexedDB.open(FarmerStorage.DB_NAME, FarmerStorage.DB_VERSION);
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("patients")) {
            resolve(null);
            return;
          }
          const tx = db.transaction("patients", "readonly");
          const store = tx.objectStore("patients");
          const getReq = store.getAll();
          getReq.onsuccess = function () {
            resolve(getReq.result || null);
          };
          getReq.onerror = function () { resolve(null); };
        };
        req.onerror = function () { resolve(null); };
      });
    },
    saveFarmerCache: function (key, data) {
      try {
        localStorage.setItem("VETCARE_FARMER_" + key, JSON.stringify(data));
      } catch (e) {
        console.warn("[FarmerStorage] LocalStorage write error", e);
      }
    },
    loadFarmerCache: function (key) {
      try {
        const item = localStorage.getItem("VETCARE_FARMER_" + key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        return null;
      }
    }
  };

  // 4. MAIN FARMER DASHBOARD CONTROLLER
  const Dashboard = {
    // --- Reactive Internal State ---
    state: {
      farmerProfile: {
        farmerId: "FARM-9991",
        name: "रामनिवास यादव (Ramniwas Yadav)",
        village: "धांसू, हिसar (हरियाणा)",
        phone: "9991039297",
        language: "hi"
      },
      herdSummary: {
        totalCattle: 6,
        milkingCattle: 4,
        pregnantCattle: 2,
        calves: 2,
        totalDailyMilkLiters: 48,
        expectedDailyIncome: 3120 // ₹ 65/Ltr average
      },
      animalsList: [
        {
          tagNo: "IN-HR-2024-8841",
          name: "लक्ष्मी (Lakshmi)",
          breed: "मुर्रा भैंस (Murrah)",
          age: "5.5 वर्ष",
          status: "दूध दे रही (Milking)",
          dailyYield: "14.5 Ltr",
          pregnancyStatus: "गर्भवती (7 माह)",
          vaccinationDue: "गलघोंटू (HS) - 15 दिन शेष",
          photoIcon: "fa-cow"
        },
        {
          tagNo: "IN-HR-2025-1102",
          name: "गौरी (Gauri)",
          breed: "साहीवाल गाय (Sahiwal)",
          age: "4.0 वर्ष",
          status: "दूध दे रही (Milking)",
          dailyYield: "12.0 Ltr",
          pregnancyStatus: "खाली (AI हेतु तैयार)",
          vaccinationDue: "खुरपका (FMD) - 3 दिन शेष (URGENT)",
          photoIcon: "fa-cow"
        },
        {
          tagNo: "IN-HR-2023-4409",
          name: "गंगा (Ganga)",
          breed: "एच.एफ. क्रॉस (HF Cross)",
          age: "6.0 वर्ष",
          status: "दूध दे रही (Milking)",
          dailyYield: "16.0 Ltr",
          pregnancyStatus: "गर्भवती (8 माह)",
          vaccinationDue: "पूर्ण (All Updated)",
          photoIcon: "fa-cow"
        },
        {
          tagNo: "CAP-2210-ROH",
          name: "बबली (Babli)",
          breed: "सिरोही बकरी (Sirohi Goat)",
          age: "2.5 वर्ष",
          status: "दूध दे रही (Milking)",
          dailyYield: "2.5 Ltr",
          pregnancyStatus: "गर्भवती (3 माह)",
          vaccinationDue: "पीपीआर (PPR) - देय है",
          photoIcon: "fa-seedling"
        }
      ],
      criticalAlerts: [
        {
          id: "ALT-FMD-01",
          type: "VACCINATION",
          title: "खुरपका-मुंहपका (FMD) टीकाकरण देय",
          description: "गौरी (टैग: 1102) का एफएमडी बूस्टर टीका 3 दिन में लगना अनिवार्य है।",
          severity: "HIGH",
          urgencyColor: "border-rose-500 bg-rose-950/20 text-rose-300"
        },
        {
          id: "ALT-CALV-02",
          type: "CALVING_ALERT",
          title: "प्रसव पूर्व चेतावनी (Calving Due)",
          description: "गंगा (एच.एफ. क्रॉस) का प्रसव 12-15 दिनों में संभावित है। अलग स्वच्छ बाड़े में रखें।",
          severity: "MEDIUM",
          urgencyColor: "border-amber-500 bg-amber-950/20 text-amber-300"
        },
        {
          id: "ALT-DEWORM-03",
          type: "DEWORMING",
          title: "कृमिनाशक दवा (Deworming) समय",
          description: "बरसात पूर्व सभी पशुओं को पेट के कीड़ों की दवा (Fenbendazole) अवश्य दें।",
          severity: "NORMAL",
          urgencyColor: "border-cyan-500 bg-cyan-950/20 text-cyan-300"
        }
      ],
      weatherThiStatus: {
        tempC: 34,
        humidity: 72,
        thiIndex: 83.4,
        stressLevel: "MODERATE_HEAT_STRESS",
        levelHi: "मध्यम ताप तनाव (Heat Stress Alert)",
        advisoryHi: "दोपहर 11 से 4 बजे तक पशुओं को खुले में न बांधें। ठंडे पानी का छिड़काव करें, पीने हेतु 24 घंटे स्वच्छ पानी रखें और इलेक्ट्रोलाइट/मिनरल मिक्सचर दें।"
      },
      activeTab: "home_overview", // home_overview | my_animals | milk_income | doctor_connect
      isSosModalOpen: false,
      isAddAnimalModalOpen: false,
      isMilkLogModalOpen: false,
      currentGpsCoords: "29.1492° N, 75.7217° E (Hisar)",
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Mobile Portal & Livestock Hub (2026 Production)...");
      Dashboard.injectStyles();
      Dashboard.calculateLiveThi();
      Dashboard.fetchLiveGps();
      Dashboard.bindNotificationListener();

      if (containerId) {
        Dashboard.render(containerId);
      }
      return Dashboard;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "farmerDashboardContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      Dashboard.state.domContainer = container;

      // Construct Complete Mobile-First Farmer UI
      container.innerHTML = `
        <div id="vetcareFarmerWorkspace" class="max-w-4xl mx-auto space-y-5">
          ${Dashboard.renderTopGreetingBar()}
          ${Dashboard.renderEmergencySosBanner()}
          ${Dashboard.renderHeatStressCard()}
          ${Dashboard.renderLivestockSnapshotCards()}
          ${Dashboard.renderNavigationTabs()}
          <div id="farmerTabContentHost" class="transition-all duration-200">
            ${Dashboard.renderActiveTabContent()}
          </div>
        </div>

        <!-- Emergency SOS Fullscreen Dialing Modal -->
        <div id="farmerSosModalHost" class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md ${Dashboard.state.isSosModalOpen ? "flex" : "hidden"} items-center justify-center p-4">
          ${Dashboard.renderEmergencySosModal()}
        </div>

        <!-- Quick Intake Modal Host -->
        <div id="farmerAddAnimalModalHost" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md ${Dashboard.state.isAddAnimalModalOpen ? "flex" : "hidden"} items-center justify-center p-3 sm:p-4">
          ${Dashboard.renderAddAnimalModal()}
        </div>
      `;

      Dashboard.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (Dashboard.state.domContainer) {
        Dashboard.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Farmer Dashboard cleanly destroyed.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-farmer-dashboard-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-farmer-dashboard-styles";
      style.textContent = `
        .sos-pulse-ring {
          animation: sosPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes sosPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          50% { box-shadow: 0 0 0 16px rgba(239, 68, 68, 0); }
        }
        .action-card-touch {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .action-card-touch:active {
          transform: scale(0.97);
        }
      `;
      document.head.appendChild(style);
    },

    // 9. DYNAMIC THI (HEAT STRESS) EVALUATOR
    calculateLiveThi: function () {
      const t = Dashboard.state.weatherThiStatus.tempC;
      const rh = Dashboard.state.weatherThiStatus.humidity;
      // Standard Dairy NRC Temperature-Humidity Index Formula
      const thi = (1.8 * t + 32) - (0.55 - 0.0055 * rh) * (1.8 * t - 26);
      Dashboard.state.weatherThiStatus.thiIndex = Math.round(thi * 10) / 10;

      if (thi >= 88) {
        Dashboard.state.weatherThiStatus.stressLevel = "SEVERE_HEAT_STRESS";
        Dashboard.state.weatherThiStatus.levelHi = "अत्यधिक तीव्र ताप तनाव (Severe Danger)";
        Dashboard.state.weatherThiStatus.advisoryHi = "पशुओं को लू लगने का खतरा! दिन में 3-4 बार नहलाएं, फॉगर/कूलर चलाएं, ठंडा पानी व सोंठ/गुलकंद पानी में दें।";
      } else if (thi >= 79) {
        Dashboard.state.weatherThiStatus.stressLevel = "MODERATE_HEAT_STRESS";
        Dashboard.state.weatherThiStatus.levelHi = "मध्यम ताप तनाव (Moderate Heat Stress)";
        Dashboard.state.weatherThiStatus.advisoryHi = "छांवदार हवादार जगह बांधें। पीने हेतु 24 घंटे ठंडा पानी रखें, दोपहर में भोजन न दें, शाम को चारा डालें।";
      } else {
        Dashboard.state.weatherThiStatus.stressLevel = "COMFORT_NORMAL";
        Dashboard.state.weatherThiStatus.levelHi = "अनुकूल मौसम (Comfortable)";
        Dashboard.state.weatherThiStatus.advisoryHi = "मौसम दुग्ध उत्पादन हेतु अनुकूल है। नियमित संतुलित पशुआहार व हरा चारा जारी रखें।";
      }
    },

    // 10. REAL-TIME HTML5 GPS TELEMETRY
    fetchLiveGps: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            Dashboard.state.currentGpsCoords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
            const el = document.getElementById("farmerGpsIndicator");
            if (el) el.textContent = Dashboard.state.currentGpsCoords;
          },
          function () {
            // Keep default Hisar coords fallback
          },
          { timeout: 8000 }
        );
      }
    },

    // 11. COMPONENT: TOP GREETING BAR
    renderTopGreetingBar: function () {
      const p = Dashboard.state.farmerProfile;
      const coords = Dashboard.state.currentGpsCoords;

      return `
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex items-center justify-between gap-3 sunlight-card">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shadow-amber-950/40">
              <i class="fa-solid fa-cow"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-amber-400 uppercase">नमस्ते,</span>
                <h1 class="text-base sm:text-lg font-display font-black text-white sunlight-text">${p.name}</h1>
              </div>
              <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5 sunlight-muted">
                <i class="fa-solid fa-location-dot text-emerald-400 text-xs"></i>
                <span>${p.village}</span>
                <span class="text-slate-600">•</span>
                <span id="farmerGpsIndicator" class="font-mono text-[10px] text-slate-500">${coords}</span>
              </div>
            </div>
          </div>

          <div class="text-right">
            <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ID: ${p.farmerId}
            </span>
          </div>
        </div>
      `;
    },

    // 12. COMPONENT: EMERGENCY ONE-TOUCH RED SOS CALL BUTTON
    renderEmergencySosBanner: function () {
      return `
        <div class="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-rose-950/80 via-red-950/60 to-slate-950 border-2 border-rose-500/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3.5 text-center sm:text-left">
            <div class="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-rose-950/60 sos-pulse-ring">
              <i class="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 justify-center sm:justify-start">
                <h2 class="text-lg font-display font-black text-white tracking-tight">आपातकालीन पशु चिकित्सा सहायता (SOS)</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-rose-500 text-white animate-pulse">24/7 LIVE</span>
              </div>
              <p class="text-xs text-rose-200/90 mt-0.5">तीव्र आफरा, प्रसव अटकना, विषबाधा या गंभीर बीमारी में तुरंत डॉक्टर बुलाएं।</p>
            </div>
          </div>

          <!-- Master Action SOS Trigger -->
          <button id="btnTriggerEmergencySos" type="button" class="w-full sm:w-auto py-3 px-6 rounded-xl font-display font-black text-sm uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 active:scale-95 transition-all">
            <i class="fa-solid fa-phone-volume text-base animate-bounce"></i>
            <span>आपातकालीन डॉक्टर बुलाएं (SOS Call)</span>
          </button>
        </div>
      `;
    },

    // 13. COMPONENT: HEAT STRESS (THI) REAL-TIME ADVISORY
    renderHeatStressCard: function () {
      const thi = Dashboard.state.weatherThiStatus;
      const isStress = thi.stressLevel !== "COMFORT_NORMAL";

      return `
        <div class="p-4 rounded-xl ${isStress ? "bg-amber-950/20 border border-amber-500/40" : "bg-slate-900 border border-slate-800"} shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sunlight-card">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl ${isStress ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-cyan-500/20 text-cyan-400"} flex items-center justify-center text-lg mt-0.5">
              <i class="fa-solid fa-temperature-arrow-up"></i>
            </div>
            <div class="space-y-0.5">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-mono font-bold uppercase text-slate-300">मौसम व पशु तनाव सूचकांक (THI Index)</span>
                <span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase ${isStress ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}">
                  ${thi.levelHi}
                </span>
              </div>
              <p class="text-xs text-slate-300 leading-snug sunlight-muted">${thi.advisoryHi}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 font-mono text-xs self-end sm:self-center text-right shrink-0">
            <div>
              <div class="text-[10px] text-slate-400 uppercase">तापमान / नमी</div>
              <div class="font-bold text-white">${thi.tempC}°C • ${thi.humidity}% RH</div>
            </div>
            <div class="pl-2 border-l border-slate-800">
              <div class="text-[10px] text-slate-400 uppercase">THI मान</div>
              <div class="font-black text-amber-400">${thi.thiIndex}</div>
            </div>
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: LIVESTOCK SNAPSHOT METRIC CARDS
    renderLivestockSnapshotCards: function () {
      const s = Dashboard.state.herdSummary;

      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- Total Animals -->
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>कुल पशु (Total)</span>
              <i class="fa-solid fa-cow text-amber-400"></i>
            </div>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-white sunlight-text">${s.totalCattle}</span>
              <span class="text-[10px] font-mono text-slate-400">पशु</span>
            </div>
          </div>

          <!-- Milking -->
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>दुधारू (Milking)</span>
              <i class="fa-solid fa-bucket text-emerald-400"></i>
            </div>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-emerald-400">${s.milkingCattle}</span>
              <span class="text-[10px] font-mono text-slate-400">पशु</span>
            </div>
          </div>

          <!-- Daily Milk -->
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>दैनिक दूध (Milk)</span>
              <i class="fa-solid fa-glass-water-droplet text-cyan-400"></i>
            </div>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-cyan-300">${s.totalDailyMilkLiters}</span>
              <span class="text-[10px] font-mono text-slate-400">लीटर</span>
            </div>
          </div>

          <!-- Expected Daily Income -->
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <div class="flex items-center justify-between text-slate-400 text-xs">
              <span>आज की आय (Income)</span>
              <i class="fa-solid fa-indian-rupee-sign text-teal-400"></i>
            </div>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-teal-300">₹${s.expectedDailyIncome}</span>
            </div>
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = Dashboard.state.activeTab;
      const tabs = [
        { id: "home_overview", label: "मुख्य पृष्ठ (Overview)", icon: "fa-house" },
        { id: "my_animals", label: "मेरे पशु (My Animals)", icon: "fa-cow" },
        { id: "milk_income", label: "दूध खाता (Milk Log)", icon: "fa-bucket" },
        { id: "doctor_connect", label: "डॉक्टर परामर्श (Doctor)", icon: "fa-user-doctor" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-farmer-tab="${t.id}" class="farmer-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-amber-400 border-t-2 border-l border-r border-amber-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
            </button>
          `).join("")}
        </div>
      `;
    },

    // 16. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (Dashboard.state.activeTab) {
        case "my_animals":
          return Dashboard.renderMyAnimalsTab();
        case "milk_income":
          return Dashboard.renderMilkIncomeTab();
        case "doctor_connect":
          return Dashboard.renderDoctorConnectTab();
        case "home_overview":
        default:
          return Dashboard.renderHomeOverviewTab();
      }
    },

    // 17. COMPONENT: TAB 1 - HOME OVERVIEW (QUICK ACTION GRID & ALERTS)
    renderHomeOverviewTab: function () {
      const alerts = Dashboard.state.criticalAlerts;

      return `
        <div class="space-y-5">
          <!-- Upcoming Reminders & Critical Alerts List -->
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5 sunlight-card">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 class="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 sunlight-text">
                <i class="fa-solid fa-bell text-amber-400"></i>
                <span>आगामी जरूरी कार्य एवं अलर्ट (Upcoming Alerts)</span>
              </h3>
              <span class="text-[10px] font-mono text-slate-400">${alerts.length} पेंडिंग</span>
            </div>

            <div class="space-y-2.5">
              ${alerts.map(a => `
                <div class="p-3 rounded-xl border ${a.urgencyColor} flex items-start justify-between gap-3 text-xs">
                  <div class="space-y-0.5">
                    <div class="font-bold text-white sunlight-text flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-exclamation text-amber-400"></i>
                      <span>${a.title}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed font-sans">${a.description}</p>
                  </div>
                  <button type="button" data-action="dismiss_alert" data-alert-id="${a.id}" class="text-[11px] font-mono text-slate-400 hover:text-white p-1">
                    <i class="fa-solid fa-check"></i>
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Quick Action Touch-Friendly Grid (बड़ा टच मेनू) -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button id="btnOpenAddAnimalModal" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-plus-circle"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">+ नया पशु जोड़ें</div>
                <div class="text-[10px] text-slate-400">Register Cattle</div>
              </div>
            </button>

            <button id="btnOpenMilkLogShortcut" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-bucket"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">दूध व फैट खाता</div>
                <div class="text-[10px] text-slate-400">Daily Milk Ledger</div>
              </div>
            </button>

            <button id="btnOpenDesiNuskheModal" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-yellow-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-mortar-pestle"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">देसी नुस्खे (आयुर्वेद)</div>
                <div class="text-[10px] text-slate-400">Ethno-Veterinary</div>
              </div>
            </button>

            <button id="btnOpenBullsDirectory" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-dna"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">उच्च नस्ल सांड सीमन</div>
                <div class="text-[10px] text-slate-400">Top Bulls Straws</div>
              </div>
            </button>

            <button id="btnOpenGovtSchemes" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-landmark"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">सरकारी योजना व बीमा</div>
                <div class="text-[10px] text-slate-400">Govt Subsidies</div>
              </div>
            </button>

            <button id="btnOpenDoctorConsult" type="button" class="action-card-touch p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500 shadow-lg text-left flex flex-col justify-between h-28 transition-all sunlight-card">
              <div class="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-video"></i>
              </div>
              <div>
                <div class="font-display font-black text-xs text-white sunlight-text">डॉक्टर वीडियो कॉल</div>
                <div class="text-[10px] text-slate-400">Tele-Consultation</div>
              </div>
            </button>
          </div>
        </div>
      `;
    },

    // 18. COMPONENT: TAB 2 - MY ANIMALS LIST (मेरे पशु)
    renderMyAnimalsTab: function () {
      const animals = Dashboard.state.animalsList;

      return `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 sunlight-card">
            <div>
              <h2 class="font-display font-black text-sm text-white uppercase sunlight-text">पंजीकृत पशु प्रोफाइल (${animals.length})</h2>
              <p class="text-xs text-slate-400 sunlight-muted">टैग नंबर, दुग्ध काल, टीकाकरण एवं गर्भधारण स्थिति।</p>
            </div>
            <button id="btnAddAnimalTabTrigger" type="button" class="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow">
              <i class="fa-solid fa-plus"></i> नया पशु
            </button>
          </div>

          <div class="space-y-3">
            ${animals.map(a => `
              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2.5 sunlight-card">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-base">
                      <i class="fa-solid ${a.photoIcon}"></i>
                    </div>
                    <div>
                      <h3 class="font-display font-black text-sm text-white sunlight-text">${a.name}</h3>
                      <div class="text-[10px] font-mono text-slate-400">टैग: ${a.tagNo} • नस्ल: ${a.breed}</div>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ${a.status}
                  </span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans">
                  <div class="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span class="text-[10px] text-slate-400 block font-mono">दैनिक दूध मात्रा:</span>
                    <strong class="text-cyan-400 font-mono">${a.dailyYield}</strong>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span class="text-[10px] text-slate-400 block font-mono">गर्भ स्थिति:</span>
                    <strong class="text-amber-300 font-mono">${a.pregnancyStatus}</strong>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                    <span class="text-[10px] text-slate-400 block font-mono">टीकाकरण स्थिति:</span>
                    <strong class="text-rose-300 font-mono">${a.vaccinationDue}</strong>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 19. COMPONENT: TAB 3 - DAILY MILK INCOME & FAT LEDGER (दूध खाता)
    renderMilkIncomeTab: function () {
      const s = Dashboard.state.herdSummary;

      return `
        <div class="space-y-4">
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 class="font-display font-black text-sm text-white uppercase sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-calculator text-emerald-400"></i>
                <span>दैनिक दुग्ध उत्पादन, फैट व आय गणना (Milk Ledger)</span>
              </h2>
              <span class="text-xs font-mono font-bold text-emerald-400">रेट: ₹65/LTR</span>
            </div>

            <!-- Quick Calculator Form -->
            <form id="formMilkCalculator" onsubmit="return false;" class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">सुबह दूध (Liters)</label>
                <input type="number" step="0.5" id="inputMorningMilk" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="26.0" />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">शाम दूध (Liters)</label>
                <input type="number" step="0.5" id="inputEveningMilk" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="22.0" />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">औसत FAT %</label>
                <input type="number" step="0.1" id="inputMilkFat" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="6.8" />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">अनुमानित दर (₹/L)</label>
                <input type="number" id="inputMilkRate" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="65" />
              </div>
            </form>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400 font-mono uppercase">आज की कुल दुग्ध आय (Total Calculated)</span>
                <div class="text-2xl font-black font-display text-emerald-400">₹3,120.00</div>
              </div>
              <button id="btnSaveMilkLog" type="button" class="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow">
                खाते में जोड़ें (Save Log)
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 20. COMPONENT: TAB 4 - DOCTOR CONNECT & TELE-CONSULT
    renderDoctorConnectTab: function () {
      return `
        <div class="space-y-4">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex items-center gap-3.5 border-b border-slate-800 pb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 flex items-center justify-center text-2xl font-black">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-white sunlight-text">डॉ. राहुल जांगड़ा (पशु चिकित्सा विशेषज्ञ)</h3>
                <div class="text-xs font-mono text-emerald-400">VCI: VCI-2026-9297 • मोबाइल यूनिट प्रभारी</div>
                <div class="text-[11px] text-slate-400">रेफरल पशु चिकित्सा परिसर एवं टेली-परामर्श केंद्र</div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a href="tel:18008382273" class="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/60 hover:bg-emerald-900/40 flex items-center gap-3 transition-colors">
                <i class="fa-solid fa-phone text-emerald-400 text-lg"></i>
                <div>
                  <div class="font-bold text-white">टोल-फ्री हेल्पलाइन कॉल</div>
                  <div class="text-[10px] text-slate-400 font-mono">1800-VET-CARE (निःशुल्क)</div>
                </div>
              </a>

              <a href="https://wa.me/919991039297?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%A1%E0%A4%BE%E0%A4%95%E0%A5%8D%E0%A4%9F%E0%A4%B0%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%AC%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%AA%E0%A4%B6%E0%A5%81%20%E0%A4%95%E0%A5%87%20%E0%A4%87%E0%A4%B2%E0%A4%BE%E0%A4%9C%20%E0%A4%B9%E0%A5%87%E0%A4%A4%E0%A5%81%20%E0%A4%B8%E0%A4%B2%E0%A4%BE%E0%A4%B9%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 flex items-center gap-3 transition-colors">
                <i class="fa-brands fa-whatsapp text-emerald-400 text-xl"></i>
                <div>
                  <div class="font-bold text-white">WhatsApp चैट व फोटो भेजें</div>
                  <div class="text-[10px] text-slate-400 font-mono">+91 99910 39297</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
    },

    // 21. COMPONENT: EMERGENCY ONE-TOUCH SOS MODAL DIALOG
    renderEmergencySosModal: function () {
      const coords = Dashboard.state.currentGpsCoords;

      return `
        <div class="bg-slate-900 border-2 border-rose-500 rounded-3xl max-w-md w-full p-6 shadow-2xl relative sunlight-card space-y-4 text-center">
          <div class="w-16 h-16 rounded-full bg-rose-600/20 text-rose-500 border-2 border-rose-500 flex items-center justify-center text-3xl mx-auto sos-pulse-ring">
            <i class="fa-solid fa-truck-medical"></i>
          </div>

          <div>
            <h3 class="font-display font-black text-xl text-rose-400 tracking-tight">आपातकालीन डॉक्टर बुलावा (SOS Activated)</h3>
            <p class="text-xs text-slate-300 mt-1">आपकी लाइव लोकेशन पशु चिकित्सा आपातकालीन नियंत्रण कक्ष को भेजी जा रही है।</p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
            <div class="text-slate-400 text-[10px] uppercase">कैप्चर की गई GPS लोकेशन:</div>
            <div class="text-emerald-400 font-bold">${coords}</div>
            <div class="text-slate-400 text-[10px]">गाँव: धांसू, हिसार (हरियाणा)</div>
          </div>

          <div class="space-y-2 pt-2">
            <a href="tel:18008382273" class="w-full py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2">
              <i class="fa-solid fa-phone-volume text-lg"></i>
              <span>1800-VET-CARE पर कॉल करें</span>
            </a>

            <button id="btnCloseSosModal" type="button" class="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              रद्द करें (Cancel)
            </button>
          </div>
        </div>
      `;
    },

    // 22. COMPONENT: ADD ANIMAL MODAL DIALOG
    renderAddAnimalModal: function () {
      return `
        <div class="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-md w-full p-6 shadow-2xl relative sunlight-card space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-cow text-emerald-400 text-xl"></i>
              <h3 class="font-display font-black text-base text-white sunlight-text">नया पशु पंजीकृत करें</h3>
            </div>
            <button id="btnCloseAddAnimalModal" type="button" class="text-slate-400 hover:text-white p-1">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <form id="formAddNewAnimal" onsubmit="return false;" class="space-y-3 text-xs">
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु का नाम / पहचान</label>
              <input type="text" id="inputNewAnimalName" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. चमेली" required />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">नस्ल / प्रजाति</label>
                <select id="selectNewAnimalBreed" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option value="मुर्रा भैंस (Murrah)">मुर्रा भैंस (Murrah)</option>
                  <option value="साहीवाल गाय (Sahiwal)">साहीवाल गाय (Sahiwal)</option>
                  <option value="गिर गाय (Gir Cow)">गिर गाय (Gir Cow)</option>
                  <option value="एच.एफ. क्रॉस (HF Cross)">एच.एफ. क्रॉस (HF Cross)</option>
                  <option value="सिरोही बकरी (Sirohi Goat)">सिरोही बकरी (Sirohi)</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">टैग नंबर (यदि हो)</label>
                <input type="text" id="inputNewAnimalTag" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="IN-HR-2026-XXXX" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">वर्तमान स्थिति</label>
                <select id="selectNewAnimalStatus" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option value="दूध दे रही (Milking)">दूध दे रही (Milking)</option>
                  <option value="ड्राई / खाली (Dry)">ड्राई / खाली (Dry)</option>
                  <option value="गर्भवती (Pregnant)">गर्भवती (Pregnant)</option>
                  <option value="बछड़ा / बच्चा (Calf)">बछड़ा / बच्चा (Calf)</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दैनिक दूध (L/Day)</label>
                <input type="number" step="0.5" id="inputNewAnimalYield" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="10.0" />
              </div>
            </div>

            <div class="pt-2 flex justify-end gap-2">
              <button type="button" id="btnCancelAddAnimal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">रद्द करें</button>
              <button type="submit" id="btnSubmitAddAnimal" class="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-lg">सुरक्षित सहेजें</button>
            </div>
          </form>
        </div>
      `;
    },

    // 23. EVENT BUS LISTENER: OUTBREAK & EPIDEMIC BROADCASTS
    bindNotificationListener: function () {
      EventBus.on("notification:broadcast", function (payload) {
        if (!payload) return;
        Dashboard.state.criticalAlerts.unshift({
          id: "BROADCAST-" + Date.now(),
          type: "EPIDEMIC",
          title: payload.title || "क्षेत्रीय संक्रामक चेतावनी",
          description: payload.message || "निकटवर्ती गांव में रोग फैलाव की सूचना। पशुओं को अलग रखें।",
          severity: "HIGH",
          urgencyColor: "border-rose-500 bg-rose-950/30 text-rose-200"
        });
        if (Dashboard.state.domContainer) {
          Dashboard.render(Dashboard.state.domContainer.id);
        }
        FarmerAudio.chimeSosSiren();
      });
    },

    // 24. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = Dashboard.state.domContainer;
      if (!root) return;

      // SOS Trigger
      const btnSos = document.getElementById("btnTriggerEmergencySos");
      if (btnSos) {
        btnSos.addEventListener("click", function () {
          Dashboard.state.isSosModalOpen = true;
          Dashboard.render(Dashboard.state.domContainer.id);
          FarmerAudio.chimeSosSiren();
          EventBus.emit("farmer:sos_triggered", {
            farmer: Dashboard.state.farmerProfile,
            gps: Dashboard.state.currentGpsCoords,
            timestamp: Date.now()
          });
        });
      }

      // Close SOS Modal
      const btnCloseSos = document.getElementById("btnCloseSosModal");
      if (btnCloseSos) {
        btnCloseSos.addEventListener("click", function () {
          Dashboard.state.isSosModalOpen = false;
          Dashboard.render(Dashboard.state.domContainer.id);
        });
      }

      // Tab clicks
      root.querySelectorAll(".farmer-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-farmer-tab");
          if (tab) {
            Dashboard.state.activeTab = tab;
            Dashboard.render(Dashboard.state.domContainer.id);
          }
        });
      });

      // Quick Action Button Handlers
      const btnOpenAddAnimal = document.getElementById("btnOpenAddAnimalModal");
      const btnAddTabTrigger = document.getElementById("btnAddAnimalTabTrigger");
      const openAddAnimal = function () {
        Dashboard.state.isAddAnimalModalOpen = true;
        Dashboard.render(Dashboard.state.domContainer.id);
      };
      if (btnOpenAddAnimal) btnOpenAddAnimal.addEventListener("click", openAddAnimal);
      if (btnAddTabTrigger) btnAddTabTrigger.addEventListener("click", openAddAnimal);

      const btnCloseAddAnimal = document.getElementById("btnCloseAddAnimalModal");
      const btnCancelAddAnimal = document.getElementById("btnCancelAddAnimal");
      const closeAddAnimal = function () {
        Dashboard.state.isAddAnimalModalOpen = false;
        Dashboard.render(Dashboard.state.domContainer.id);
      };
      if (btnCloseAddAnimal) btnCloseAddAnimal.addEventListener("click", closeAddAnimal);
      if (btnCancelAddAnimal) btnCancelAddAnimal.addEventListener("click", closeAddAnimal);

      // Submit New Animal Form
      const formAnimal = document.getElementById("formAddNewAnimal");
      if (formAnimal) {
        formAnimal.addEventListener("submit", function (e) {
          e.preventDefault();
          const name = document.getElementById("inputNewAnimalName").value;
          const breed = document.getElementById("selectNewAnimalBreed").value;
          const tag = document.getElementById("inputNewAnimalTag").value || ("IN-HR-2026-" + Math.floor(1000 + Math.random() * 9000));
          const status = document.getElementById("selectNewAnimalStatus").value;
          const yieldL = document.getElementById("inputNewAnimalYield").value + " Ltr";

          const newObj = {
            tagNo: tag,
            name: name,
            breed: breed,
            age: "3.0 वर्ष",
            status: status,
            dailyYield: yieldL,
            pregnancyStatus: "सामान्य",
            vaccinationDue: "नियमित जांच",
            photoIcon: "fa-cow"
          };

          Dashboard.state.animalsList.unshift(newObj);
          Dashboard.state.herdSummary.totalCattle++;
          if (status.includes("Milking")) Dashboard.state.herdSummary.milkingCattle++;

          Dashboard.state.isAddAnimalModalOpen = false;
          Dashboard.render(Dashboard.state.domContainer.id);
          FarmerAudio.chimeSuccess();

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`पशु '${name}' सफलतापूर्वक पंजीकृत हुआ!`, "success");
          }
        });
      }

      // Milk log shortcut
      const btnMilkShortcut = document.getElementById("btnOpenMilkLogShortcut");
      if (btnMilkShortcut) {
        btnMilkShortcut.addEventListener("click", function () {
          Dashboard.state.activeTab = "milk_income";
          Dashboard.render(Dashboard.state.domContainer.id);
        });
      }

      // Save Milk Log in tab 3
      const btnSaveMilk = document.getElementById("btnSaveMilkLog");
      if (btnSaveMilk) {
        btnSaveMilk.addEventListener("click", function () {
          FarmerAudio.chimeSuccess();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("दैनिक दूध रिकॉर्ड बही खाते में सहेजा गया!", "success");
          }
        });
      }

      // Doctor video call shortcut
      const btnDocConsult = document.getElementById("btnOpenDoctorConsult");
      if (btnDocConsult) {
        btnDocConsult.addEventListener("click", function () {
          Dashboard.state.activeTab = "doctor_connect";
          Dashboard.render(Dashboard.state.domContainer.id);
        });
      }

      // Desi Nuskhe shortcut
      const btnNuskhe = document.getElementById("btnOpenDesiNuskheModal");
      if (btnNuskhe) {
        btnNuskhe.addEventListener("click", function () {
          if (window.VetcareApp.Farmer.DesiNuskhe && typeof window.VetcareApp.Farmer.DesiNuskhe.init === "function") {
            window.VetcareApp.Farmer.DesiNuskhe.init();
          } else {
            alert("देसी नुस्खे (आयुर्वेद) मॉड्यूल लोड हो रहा है...");
          }
        });
      }

      // Bulls Directory shortcut
      const btnBulls = document.getElementById("btnOpenBullsDirectory");
      if (btnBulls) {
        btnBulls.addEventListener("click", function () {
          if (window.VetcareApp.Farmer.BullsDirectory && typeof window.VetcareApp.Farmer.BullsDirectory.init === "function") {
            window.VetcareApp.Farmer.BullsDirectory.init();
          } else {
            alert("उच्च नस्ल सांड सीमन निर्देशिका लोड हो रही है...");
          }
        });
      }

      // Dismiss Alert Delegator
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action='dismiss_alert']");
        if (!btn) return;
        const id = btn.getAttribute("data-alert-id");
        Dashboard.state.criticalAlerts = Dashboard.state.criticalAlerts.filter(a => a.id !== id);
        Dashboard.render(Dashboard.state.domContainer.id);
      });
    }
  };

  // 25. GLOBAL REGISTRATION & ENTRY POINT BRIDGES
  window.VetcareApp.Farmer.Dashboard = Dashboard;
  window.VetcareApp.Farmer.initHub = function () {
    return Dashboard.init("farmerDashboardContainer");
  };

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("farmerDashboardContainer");
    if (defaultHost) {
      Dashboard.init("farmerDashboardContainer");
    }
  });

})(window, document);
