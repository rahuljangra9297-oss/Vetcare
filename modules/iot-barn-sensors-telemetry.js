// Vetcare AI OS - Smart Farm IoT Telemetry, Barn Environment & THI Heat Stress Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  // 2. PRECISION LIVESTOCK FARMING (PLF) & THI EQUATIONS
  const PLF_STANDARDS = {
    // Kibler & NRC Dairy Cattle THI Formula:
    // THI = (0.8 * T) + [(%RH / 100) * (T - 14.4)] + 46.4
    THI_THRESHOLDS: {
      COMFORT_MAX: 71.9,
      MILD_MAX: 78.9,
      SEVERE_MAX: 88.9,
      EMERGENCY_MIN: 89.0
    },
    RUMINATION: {
      NORMAL_MIN_MINS_PER_DAY: 420,
      NORMAL_MAX_MINS_PER_DAY: 540,
      DROP_ALERT_PERCENT: 25.0 // Rumination drop >25% indicates SARA, mastitis, or DA 24-48h early
    },
    ACTIVITY: {
      ESTRUS_SPIKE_INDEX_MIN: 200 // Activity index > 200 with rumination drop indicates standing estrus
    },
    RUMEN_TEMP: {
      NORMAL_MIN_C: 38.6,
      NORMAL_MAX_C: 39.8,
      FEVER_MIN_C: 40.0
    },
    AIR_QUALITY: {
      AMMONIA_MAX_SAFE_PPM: 15.0, // NH3 gas in barn
      CO2_MAX_SAFE_PPM: 1000.0
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const IotStorage = {
    dbName: "VetcareIotTelemetryDB",
    dbVersion: 1,
    storeName: "iot_telemetry_logs",
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare IoT] IndexedDB not available, using localStorage fallback.");
          resolve(false);
          return;
        }
        const request = window.indexedDB.open(this.dbName, this.dbVersion);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(true);
        };
        request.onerror = (err) => {
          console.error("[Vetcare IoT] IndexedDB failed:", err);
          resolve(false);
        };
      });
    },

    async getAll() {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_IOT_LOGS");
        return raw ? JSON.parse(raw) : [];
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(this.storeName, "readonly");
          const store = tx.objectStore(this.storeName);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          console.error(e);
          resolve([]);
        }
      });
    },

    async put(item) {
      if (!item.id) item.id = "IOT-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const all = await this.getAll();
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.push(item);
        localStorage.setItem("VETCARE_IOT_LOGS", JSON.stringify(all));
        return item;
      }
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db.transaction(this.storeName, "readwrite");
          const store = tx.objectStore(this.storeName);
          const req = store.put(item);
          req.onsuccess = () => resolve(item);
          req.onerror = (err) => reject(err);
        } catch (e) {
          reject(e);
        }
      });
    }
  };

  // 4. MAIN IOT BARN SENSORS & TELEMETRY CONTROLLER
  const IotBarnSensorsTelemetry = {
    containerId: null,
    activeTab: "live_telemetry_grid", // 'live_telemetry_grid' | 'thi_heat_stress_matrix' | 'wearable_rumination_radar' | 'automation_trigger_rules'
    isSimulatingTelemetry: true,
    simulationTimer: null,

    // Reactive State
    state: {
      barnSensors: [],
      cowWearables: [],
      hvacRules: {
        autoCoolingEnabled: true,
        fanOnThiThreshold: 72.0,
        sprinklerOnThiThreshold: 78.0,
        soakerCycleOnMins: 3,
        soakerCycleOffMins: 9,
        exhaustFanAmmoniaPpm: 15.0
      }
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await IotStorage.init();
      await this.loadInitialData();
      this.startTelemetrySimulation();
      console.log("[Vetcare AI OS] Barn IoT Telemetry & THI Heat Stress Engine Initialized.");
    },

    async loadInitialData() {
      const records = await IotStorage.getAll();
      const loadedSensors = records.filter((r) => r.recordType === "SENSOR_STATION");
      const loadedCows = records.filter((r) => r.recordType === "COW_WEARABLE");

      if (loadedSensors.length > 0) {
        this.state.barnSensors = loadedSensors;
      } else {
        await this.seedDefaultStations();
      }

      if (loadedCows.length > 0) {
        this.state.cowWearables = loadedCows;
      } else {
        await this.seedDefaultWearables();
      }
    },

    async seedDefaultStations() {
      const defaultStations = [
        {
          id: "STATION-01",
          recordType: "SENSOR_STATION",
          stationId: "STATION-01",
          locationName: "शेड 1 - उच्च दुग्ध उत्पादक गायें (High Yielders)",
          ambientTempC: 32.8,
          relativeHumidityPercent: 76,
          thiScore: 84.8,
          ammoniaGasPpm: 11.2,
          co2Ppm: 640,
          fanSprinklerAutoStatus: "ON",
          lastUpdated: new Date().toLocaleTimeString("hi-IN")
        },
        {
          id: "STATION-02",
          recordType: "SENSOR_STATION",
          stationId: "STATION-02",
          locationName: "शेड 2 - शुष्क व ट्रांजिशन गभिन गायें (Dry Barn)",
          ambientTempC: 28.5,
          relativeHumidityPercent: 62,
          thiScore: 76.5,
          ammoniaGasPpm: 8.5,
          co2Ppm: 520,
          fanSprinklerAutoStatus: "ON",
          lastUpdated: new Date().toLocaleTimeString("hi-IN")
        },
        {
          id: "STATION-03",
          recordType: "SENSOR_STATION",
          stationId: "STATION-03",
          locationName: "बछिया एवं नवजात नर्सरी (Calf Nursery)",
          ambientTempC: 26.2,
          relativeHumidityPercent: 55,
          thiScore: 72.1,
          ammoniaGasPpm: 5.1,
          co2Ppm: 460,
          fanSprinklerAutoStatus: "OFF",
          lastUpdated: new Date().toLocaleTimeString("hi-IN")
        },
        {
          id: "STATION-04",
          recordType: "SENSOR_STATION",
          stationId: "STATION-04",
          locationName: "मिल्किंग पार्लर एवं होल्डिंग यार्ड (Holding Yard)",
          ambientTempC: 34.2,
          relativeHumidityPercent: 82,
          thiScore: 89.6, // LETHAL RISK ALERT
          ammoniaGasPpm: 16.4,
          co2Ppm: 810,
          fanSprinklerAutoStatus: "ON",
          lastUpdated: new Date().toLocaleTimeString("hi-IN")
        }
      ];

      for (const s of defaultStations) {
        s.thiScore = this.calculateTHI(s.ambientTempC, s.relativeHumidityPercent);
        await IotStorage.put(s);
        this.state.barnSensors.push(s);
      }
    },

    async seedDefaultWearables() {
      const defaultCows = [
        {
          id: "COW-1042",
          recordType: "COW_WEARABLE",
          tagNo: "TAG-1042",
          cowName: "गौरी (HF Cross #1042)",
          breed: "Holstein Friesian Cross",
          ruminationMinutesPerDay: 485,
          activityIndex: 105,
          reticulorumenTempC: 39.2,
          estrusAlert: false,
          sicknessAlert: false,
          healthStatus: "HEALTHY_OPTIMAL",
          lastHeard: "2 min ago"
        },
        {
          id: "COW-1088",
          recordType: "COW_WEARABLE",
          tagNo: "TAG-1088",
          cowName: "कावेरी (Jersey Cross #1088)",
          breed: "Jersey Cross",
          ruminationMinutesPerDay: 265, // Sharp 45% drop
          activityIndex: 245, // Extreme 245% spike
          reticulorumenTempC: 39.4,
          estrusAlert: true, // TRUE STANDING HEAT PEAK
          sicknessAlert: false,
          healthStatus: "IN_ESTRUS_HEAT_PEAK",
          lastHeard: "Just now"
        },
        {
          id: "COW-1105",
          recordType: "COW_WEARABLE",
          tagNo: "TAG-1105",
          cowName: "लक्ष्मी (Sahiwal #1105)",
          breed: "Sahiwal Indigenous",
          ruminationMinutesPerDay: 280, // Heavy drop
          activityIndex: 65, // Depressed activity
          reticulorumenTempC: 40.4, // Systemic high fever
          estrusAlert: false,
          sicknessAlert: true, // SARA / ACUTE MASTITIS EARLY WARNING
          healthStatus: "SICKNESS_FEVER_ALERT",
          lastHeard: "1 min ago"
        },
        {
          id: "COW-1120",
          recordType: "COW_WEARABLE",
          tagNo: "TAG-1120",
          cowName: "नंदिनी (Murrah Buffalo #1120)",
          breed: "Murrah Buffalo",
          ruminationMinutesPerDay: 510,
          activityIndex: 110,
          reticulorumenTempC: 38.9,
          estrusAlert: false,
          sicknessAlert: false,
          healthStatus: "HEALTHY_OPTIMAL",
          lastHeard: "4 min ago"
        }
      ];

      for (const c of defaultCows) {
        await IotStorage.put(c);
        this.state.cowWearables.push(c);
      }
    },

    // 4.2 MATHEMATICAL THI & SENSOR ENGINE
    /**
     * Kibler & National Research Council (NRC) Livestock THI Formula:
     * THI = (0.8 * T) + [(%RH / 100) * (T - 14.4)] + 46.4
     */
    calculateTHI(tempC, rhPercent) {
      const t = parseFloat(tempC) || 25.0;
      const rh = parseFloat(rhPercent) || 50.0;
      const thi = 0.8 * t + (rh / 100.0) * (t - 14.4) + 46.4;
      return parseFloat(thi.toFixed(1));
    },

    getTHIClassification(thiScore) {
      const thi = parseFloat(thiScore) || 70.0;
      if (thi < PLF_STANDARDS.THI_THRESHOLDS.COMFORT_MAX) {
        return {
          tier: "COMFORT",
          label: "इष्टतम आराम क्षेत्र (No Heat Stress)",
          milkLossPct: "0%",
          respirationRpm: "20-40 rpm (Normal)",
          colorClass: "text-emerald-400",
          badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          coolingRequired: false
        };
      } else if (thi <= PLF_STANDARDS.THI_THRESHOLDS.MILD_MAX) {
        return {
          tier: "MILD_STRESS",
          label: "हल्का तनाव (Mild Heat Stress)",
          milkLossPct: "~5% to 10%",
          respirationRpm: "45-65 rpm (Elevated)",
          colorClass: "text-amber-400",
          badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          coolingRequired: true
        };
      } else if (thi <= PLF_STANDARDS.THI_THRESHOLDS.SEVERE_MAX) {
        return {
          tier: "SEVERE_STRESS",
          label: "मध्यम से गंभीर तनाव (Severe Heat Stress)",
          milkLossPct: "> 25% Reduction",
          respirationRpm: "70-100 rpm (Panting & Drooling)",
          colorClass: "text-rose-400",
          badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          coolingRequired: true
        };
      } else {
        return {
          tier: "LETHAL_EMERGENCY",
          label: "घातक लू आपातकाल (Emergency Heat Stroke Risk)",
          milkLossPct: "> 40% Collapse Risk",
          respirationRpm: "> 100 rpm (Open-mouth gasping)",
          colorClass: "text-red-400 animate-pulse font-black",
          badgeClass: "bg-red-600/30 text-red-200 border-red-500 animate-pulse",
          coolingRequired: true
        };
      }
    },

    startTelemetrySimulation() {
      if (this.simulationTimer) clearInterval(this.simulationTimer);

      this.simulationTimer = setInterval(() => {
        if (!this.isSimulatingTelemetry) return;

        // Random walk perturbation for realistic environmental drift
        this.state.barnSensors.forEach((station) => {
          const deltaT = (Math.random() - 0.48) * 0.4;
          const deltaRh = (Math.random() - 0.5) * 1.2;

          station.ambientTempC = parseFloat(Math.max(20, Math.min(45, station.ambientTempC + deltaT)).toFixed(1));
          station.relativeHumidityPercent = Math.max(30, Math.min(98, Math.round(station.relativeHumidityPercent + deltaRh)));
          station.thiScore = this.calculateTHI(station.ambientTempC, station.relativeHumidityPercent);

          // Update HVAC status based on automation rules
          if (this.state.hvacRules.autoCoolingEnabled) {
            station.fanSprinklerAutoStatus = station.thiScore >= this.state.hvacRules.fanOnThiThreshold ? "ON" : "OFF";
          }
          station.lastUpdated = new Date().toLocaleTimeString("hi-IN");
        });

        // Drift cow wearables slightly
        this.state.cowWearables.forEach((cow) => {
          if (!cow.sicknessAlert && !cow.estrusAlert) {
            cow.ruminationMinutesPerDay = Math.max(400, Math.min(550, cow.ruminationMinutesPerDay + Math.floor((Math.random() - 0.5) * 6)));
            cow.activityIndex = Math.max(80, Math.min(130, cow.activityIndex + Math.floor((Math.random() - 0.5) * 4)));
          }
        });

        // If currently rendered, refresh dynamic telemetry elements without full DOM teardown
        this.updateLiveDoms();
      }, 4000);
    },

    updateLiveDoms() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Update Top Ribbon Elements
      const peakThiElem = container.querySelector("#lblTopPeakThi");
      if (peakThiElem) {
        const peak = Math.max(...this.state.barnSensors.map((s) => s.thiScore));
        peakThiElem.textContent = peak.toFixed(1);
      }

      // If active tab is live_telemetry_grid, re-render tab content smoothly
      if (this.activeTab === "live_telemetry_grid") {
        const viewport = container.querySelector("#iotTabViewport");
        if (viewport) {
          viewport.innerHTML = this.renderLiveTelemetryTab();
        }
      }
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare IoT] Target container node not found:", this.containerId);
        return;
      }

      const peakThi = this.state.barnSensors.length > 0 ? Math.max(...this.state.barnSensors.map((s) => s.thiScore)) : 70.0;
      const peakClass = this.getTHIClassification(peakThi);
      const estrusCount = this.state.cowWearables.filter((c) => c.estrusAlert).length;
      const sicknessCount = this.state.cowWearables.filter((c) => c.sicknessAlert).length;

      container.innerHTML = `
        <div class="iot-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- EMERGENCY HEAT STROKE WARNING BANNER -->
          ${
            peakThi >= PLF_STANDARDS.THI_THRESHOLDS.EMERGENCY_MIN
              ? `
            <div class="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-2 border-red-500 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-2xl text-white shadow-lg shrink-0">
                  <i class="fa-solid fa-fire-flame-curved"></i>
                </div>
                <div>
                  <h4 class="font-display font-black text-lg tracking-tight uppercase">घातक हीट स्ट्रोक चेतावनी (Lethal Barn Heat Stress Emergency: THI ${peakThi})</h4>
                  <p class="text-xs text-rose-200">होल्डिंग यार्ड या शेड में तापमान-नमी सूचकांक (THI) 89 पार कर चुका है! तत्काल स्वचालित सोकर स्प्रिंकलर (3 min on / 9 min off) और हाई-स्पीड पंखे सक्रिय रखें।</p>
                </div>
              </div>
              <button id="btnForceCoolingAll" class="px-5 py-2.5 rounded-xl bg-white text-rose-950 font-black text-xs hover:bg-rose-100 flex items-center gap-2 shadow-lg whitespace-nowrap">
                <i class="fa-solid fa-fan text-rose-600"></i> सभी कूलिंग पंखे 100% पर चालू करें
              </button>
            </div>
            `
              : ""
          }

          <!-- HEADER & TACTICAL BAR -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                  <i class="fa-solid fa-wifi text-cyan-400"></i> Edge IoT MQTT Broker: CONNECTED
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${peakClass.badgeClass}">
                  <i class="fa-solid fa-temperature-arrow-up"></i> ${peakClass.label}
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
                <span>स्मार्ट पशुशाला IoT पर्यावरण एवं THI हीट स्ट्रेस कंट्रोल रूम</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-3xl">
                Precision Livestock Farming (PLF): 24/7 Temperature Humidity Index (THI) Equations, Barn Air Quality (NH3/CO2), automated HVAC Sprinklers & Smart Cow Collar Rumination Radar.
              </p>
            </div>

            <!-- CONTROLS & LIVE SIMULATION TOGGLE -->
            <div class="flex flex-wrap items-center gap-2">
              <button id="btnToggleSimulation" class="px-4 py-2 rounded-xl text-xs font-bold border ${
                this.isSimulatingTelemetry
                  ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/50"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              } flex items-center gap-2 transition-all">
                <span class="w-2 h-2 rounded-full ${this.isSimulatingTelemetry ? "bg-emerald-400 animate-ping" : "bg-slate-600"}"></span>
                <span>${this.isSimulatingTelemetry ? "लाइव सिमुलेशन सक्रिय (Active)" : "सिमुलेशन रोका गया (Paused)"}</span>
              </button>
              <button id="btnExportCsv" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 shadow flex items-center gap-2 transition-all">
                <i class="fa-solid fa-file-csv"></i> CSV डेटा निर्यात (Export)
              </button>
            </div>
          </div>

          <!-- TOP TELEMETRY RIBBON -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सक्रिय सेंसर स्टेशन (IoT Nodes)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-white">${this.state.barnSensors.length} शेड</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">100% Online</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">सर्वोच्च THI हीट स्ट्रेस स्कोर</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span id="lblTopPeakThi" class="text-2xl font-display font-black ${peakClass.colorClass}">${peakThi.toFixed(1)}</span>
                <span class="text-xs font-mono text-slate-400 font-semibold">Max Threshold 72</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">मद/गर्मी (Estrus Peak) अलर्ट</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black text-purple-400">${estrusCount} गाय</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">AI Window Active</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span class="text-[10px] font-mono uppercase text-slate-400">रोग / जुगाली गिरावट (Sickness Alert)</span>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="text-2xl font-display font-black ${sicknessCount > 0 ? "text-rose-400 font-bold" : "text-emerald-400"}">${sicknessCount}</span>
                <span class="text-xs font-mono text-slate-400 font-semibold">Early Warning</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="live_telemetry_grid" class="iot-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "live_telemetry_grid"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-gauge-high"></i> 1. लाइव शेड पर्यावरण ग्रिड (Barn Telemetry)
            </button>
            <button data-tab="thi_heat_stress_matrix" class="iot-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "thi_heat_stress_matrix"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-temperature-half"></i> 2. THI हीट स्ट्रेस मैट्रिक्स व कूलिंग रूल्स (THI Heat Matrix)
            </button>
            <button data-tab="wearable_rumination_radar" class="iot-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "wearable_rumination_radar"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-cow"></i> 3. कॉलर जुगाली व मद रडार (Cow Rumination & Estrus)
            </button>
            <button data-tab="automation_trigger_rules" class="iot-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "automation_trigger_rules"
                ? "border-cyan-500 text-cyan-400 bg-cyan-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-sliders"></i> 4. स्वचालन व HVAC सेटिंग्स (HVAC Automations)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="iotTabViewport" class="w-full">
            ${this.renderActiveTabContent()}
          </div>

        </div>

        <!-- MODAL CONTAINER HOOK -->
        <div id="iotModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent() {
      switch (this.activeTab) {
        case "live_telemetry_grid":
          return this.renderLiveTelemetryTab();
        case "thi_heat_stress_matrix":
          return this.renderHeatStressMatrixTab();
        case "wearable_rumination_radar":
          return this.renderRuminationRadarTab();
        case "automation_trigger_rules":
          return this.renderAutomationRulesTab();
        default:
          return "";
      }
    },

    // TAB 1: LIVE BARN TELEMETRY SENSOR GRID
    renderLiveTelemetryTab() {
      return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${this.state.barnSensors
            .map((s) => {
              const thiInfo = this.getTHIClassification(s.thiScore);
              const isAmmoniaHigh = s.ammoniaGasPpm >= PLF_STANDARDS.AIR_QUALITY.AMMONIA_MAX_SAFE_PPM;

              return `
              <div class="p-5 rounded-2xl bg-slate-900 border ${s.thiScore >= 89 ? "border-red-500/80 bg-red-950/20" : "border-slate-800"} space-y-4">
                <div class="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-cyan-400">${s.stationId}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${thiInfo.badgeClass}">
                        THI ${s.thiScore} • ${thiInfo.tier}
                      </span>
                    </div>
                    <h3 class="font-display font-bold text-base text-white mt-1">${s.locationName}</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] font-mono text-slate-500 flex items-center gap-1 justify-end">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ${s.lastUpdated}
                    </span>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      s.fanSprinklerAutoStatus === "ON" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-slate-800 text-slate-400"
                    }">
                      <i class="fa-solid fa-fan mr-1"></i> HVAC: ${s.fanSprinklerAutoStatus}
                    </span>
                  </div>
                </div>

                <!-- 4 TELEMETRY MINI-GAUGES -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  
                  <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                    <span class="text-[10px] text-slate-400 uppercase">तापमान (Temp)</span>
                    <div class="text-xl font-display font-black text-amber-400 mt-1">${s.ambientTempC}°C</div>
                    <span class="text-[9px] text-slate-500">${((s.ambientTempC * 9) / 5 + 32).toFixed(1)}°F</span>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                    <span class="text-[10px] text-slate-400 uppercase">आर्द्रता (Humidity)</span>
                    <div class="text-xl font-display font-black text-cyan-400 mt-1">${s.relativeHumidityPercent}%</div>
                    <span class="text-[9px] text-slate-500">Relative Humidity</span>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-950/80 border ${isAmmoniaHigh ? "border-rose-500/60 bg-rose-950/30" : "border-slate-800/80"} text-center">
                    <span class="text-[10px] text-slate-400 uppercase">अमोनिया (NH3)</span>
                    <div class="text-xl font-display font-black ${isAmmoniaHigh ? "text-rose-400 animate-pulse" : "text-white"} mt-1">
                      ${s.ammoniaGasPpm} <span class="text-[10px] font-normal text-slate-500">ppm</span>
                    </div>
                    <span class="text-[9px] ${isAmmoniaHigh ? "text-rose-400 font-bold" : "text-slate-500"}">${isAmmoniaHigh ? "HIGH VENTILATE" : "Safe Tier"}</span>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                    <span class="text-[10px] text-slate-400 uppercase">कार्बन डाई (CO2)</span>
                    <div class="text-xl font-display font-black text-slate-200 mt-1">${s.co2Ppm} <span class="text-[10px] font-normal text-slate-500">ppm</span></div>
                    <span class="text-[9px] text-slate-500">Normal Range</span>
                  </div>

                </div>

                <!-- CLINICAL STRESS WARNING -->
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs flex justify-between items-center">
                  <div class="text-slate-300">
                    <strong class="${thiInfo.colorClass}">${thiInfo.label}</strong>
                    <div class="text-[11px] text-slate-400 mt-0.5">संभावित दुग्ध उत्पादन गिरावट: <span class="text-rose-400 font-bold">${thiInfo.milkLossPct}</span> • श्वसन दर: ${thiInfo.respirationRpm}</div>
                  </div>
                </div>

              </div>
            `;
            })
            .join("")}
        </div>
      `;
    },

    // TAB 2: THI HEAT STRESS MATRIX & COOLING ACTUATION
    renderHeatStressMatrixTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="border-b border-slate-800 pb-4">
              <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                <i class="fa-solid fa-table-cells text-amber-400"></i> वैज्ञानिक दुधारू पशु THI हीट स्ट्रेस मैट्रिक्स (Kibler Matrix)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Temperature Humidity Index formula: THI = (0.8 × T) + [(%RH / 100) × (T - 14.4)] + 46.4
              </p>
            </div>

            <!-- INTERACTIVE MATRIX TABLE -->
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-center text-xs border-collapse font-mono">
                <thead>
                  <tr class="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                    <th class="p-3 text-left">तापमान (°C)</th>
                    <th class="p-3">30% RH</th>
                    <th class="p-3">40% RH</th>
                    <th class="p-3">50% RH</th>
                    <th class="p-3">60% RH</th>
                    <th class="p-3">70% RH</th>
                    <th class="p-3">80% RH</th>
                    <th class="p-3">90% RH</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${[24, 26, 28, 30, 32, 34, 36, 38, 40]
                    .map((temp) => {
                      return `
                      <tr class="hover:bg-slate-800/40">
                        <td class="p-3 text-left font-bold text-white bg-slate-950/50">${temp}°C (${((temp * 9) / 5 + 32).toFixed(0)}°F)</td>
                        ${[30, 40, 50, 60, 70, 80, 90]
                          .map((rh) => {
                            const thi = this.calculateTHI(temp, rh);
                            let bgStyle = "bg-emerald-950/40 text-emerald-300 border border-emerald-900/40";
                            if (thi >= 89) bgStyle = "bg-red-950 text-red-300 font-black border border-red-700 animate-pulse";
                            else if (thi >= 79) bgStyle = "bg-rose-950/60 text-rose-300 font-bold border border-rose-800/50";
                            else if (thi >= 72) bgStyle = "bg-amber-950/40 text-amber-300 font-bold border border-amber-900/40";

                            return `
                            <td class="p-2.5">
                              <span class="inline-block px-2 py-1 rounded ${bgStyle}">${thi}</span>
                            </td>
                          `;
                          })
                          .join("")}
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- THI HEAT MANAGEMENT COLOR LEGEND -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <span class="font-bold text-emerald-400 block mb-1">THI &lt; 72: इष्टतम (Comfort)</span>
                <p class="text-[11px] text-slate-400">सामान्य शारीरिक स्थिति। कोई कृत्रिम कूलिंग आवश्यक नहीं।</p>
              </div>
              <div class="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30">
                <span class="font-bold text-amber-400 block mb-1">THI 72 - 78: हल्का तनाव (Mild)</span>
                <p class="text-[11px] text-slate-400">पंखा चालू (Fan On)। दूध में 5-10% तक गिरावट की शुरुआत।</p>
              </div>
              <div class="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <span class="font-bold text-rose-400 block mb-1">THI 79 - 88: गंभीर तनाव (Severe)</span>
                <p class="text-[11px] text-slate-400">पंखा + सोकर स्प्रिंकलर (3 मिनट ऑन / 9 मिनट ऑफ) तत्काल चालू।</p>
              </div>
              <div class="p-3 rounded-xl bg-red-950/40 border border-red-500/50">
                <span class="font-bold text-red-300 block mb-1">THI &gt; 89: घातक खतरा (Emergency)</span>
                <p class="text-[11px] text-slate-300">हीट स्ट्रोक से मृत्यु का जोखिम। आपातकालीन ठंडे पानी की बौछार।</p>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 3: WEARABLE RUMINATION & ESTRUS ACTIVITY RADAR
    renderRuminationRadarTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                  <i class="fa-solid fa-cow text-cyan-400"></i> कॉलर सेंसर: जुगाली मिनट एवं मद (Estrus) रडार
                </h3>
                <p class="text-xs text-slate-400">
                  Reticulorumen temperature bolus + Neck collar accelerometer telemetry. Detects estrus peak and acidosis 24-48h early.
                </p>
              </div>
              <button id="btnOpenAddCowWearableModal" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow">
                + नया कॉलर टैग जोड़ें
              </button>
            </div>

            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                    <th class="p-3">टैग नं. व पशु</th>
                    <th class="p-3">नस्ल (Breed)</th>
                    <th class="p-3">दैनिक जुगाली (Rumination)</th>
                    <th class="p-3">सक्रियता इंडेक्स (Activity)</th>
                    <th class="p-3">रोमन तापमान (°C)</th>
                    <th class="p-3">क्लिनिकल स्थिति (Status)</th>
                    <th class="p-3 text-right">अनुशंसित कार्यवाई (Action)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  ${this.state.cowWearables
                    .map((cow) => {
                      const isRuminationLow = cow.ruminationMinutesPerDay < 350;
                      const isActivitySpike = cow.activityIndex >= 200;
                      const isFever = cow.reticulorumenTempC >= 40.0;

                      return `
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-white text-xs">${cow.tagNo}</span>
                          <div class="text-[11px] text-cyan-400 font-semibold mt-0.5">${cow.cowName}</div>
                        </td>
                        <td class="p-3 text-slate-300">
                          ${cow.breed}
                        </td>
                        <td class="p-3 font-mono">
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-black ${isRuminationLow ? "text-rose-400" : "text-emerald-400"}">
                              ${cow.ruminationMinutesPerDay} m/दिन
                            </span>
                            <div class="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div class="h-full ${isRuminationLow ? "bg-rose-500" : "bg-emerald-400"}" style="width: ${Math.min(100, (cow.ruminationMinutesPerDay / 550) * 100)}%;"></div>
                            </div>
                          </div>
                          <span class="text-[10px] text-slate-500">${isRuminationLow ? "45% DROP (ALERT)" : "Normal 450-540m"}</span>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-sm font-black ${isActivitySpike ? "text-purple-400 font-black" : "text-white"}">
                            ${cow.activityIndex}%
                          </span>
                          <div class="text-[10px] text-slate-500">${isActivitySpike ? "ESTRUS HYPER-ACTIVITY" : "Baseline"}</div>
                        </td>
                        <td class="p-3 font-mono">
                          <span class="text-sm font-black ${isFever ? "text-rose-400 font-black animate-pulse" : "text-slate-200"}">
                            ${cow.reticulorumenTempC}°C
                          </span>
                          <div class="text-[10px] text-slate-500">${isFever ? "SYSTEMIC FEVER" : "Normal 39.2°C"}</div>
                        </td>
                        <td class="p-3 font-mono">
                          ${
                            cow.estrusAlert
                              ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">ESTRUS PEAK (हीट में है)</span>`
                              : cow.sicknessAlert
                              ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">SICKNESS ALERT (बीमारी)</span>`
                              : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">HEALTHY OPTIMAL</span>`
                          }
                        </td>
                        <td class="p-3 text-right font-mono text-[11px] whitespace-nowrap">
                          ${
                            cow.estrusAlert
                              ? `<strong class="text-purple-300">12-16 घंटे में कृत्रिम गर्भाधान (AI) कराएं</strong>`
                              : cow.sicknessAlert
                              ? `<strong class="text-rose-300">SARA / थनैला जांच व डॉक्टर संपर्क</strong>`
                              : `<span class="text-slate-400">नियमित निगरानी</span>`
                          }
                        </td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- PRECISION LIVESTOCK RUMINATION SCIENTIFIC NOTE -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <i class="fa-solid fa-brain text-purple-400 text-lg mt-0.5"></i>
              <div class="leading-relaxed">
                <strong>जुगाली व सक्रियता आधारित प्रारंभिक रोग चेतावनी (PLF Heuristic):</strong> जब गाय में जुगाली का समय सामान्य से 25% कम हो जाए (<350 मिनट) और शरीर का तापमान 40.0°C से ऊपर हो, तो यह <strong>सब-एक्यूट रूमेन एसिडोसिस (SARA), विस्थापित आमाशय (DA) या तीव्र थनैला (Acute Mastitis)</strong> का स्पष्ट पूर्व-संकेत है। यह अलर्ट दूध में गिरावट आने से 24 से 48 घंटे पहले ही मिल जाता है।
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: BARN HVAC AUTOMATION TRIGGER RULES
    renderAutomationRulesTab() {
      const r = this.state.hvacRules;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="font-display font-black text-lg text-white flex items-center gap-2">
                <i class="fa-solid fa-sliders text-cyan-400"></i> स्वचालित शेड पर्यावरण नियंत्रण नियम (HVAC Trigger Config)
              </h3>
              <p class="text-xs text-slate-400">Set-points for automated fans, high-pressure misting lines, and ammonia exhaust ventilation.</p>
            </div>

            <form id="formHvacRules" onsubmit="return false;" class="space-y-4 text-xs">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span class="font-bold text-white text-sm">स्वचालित IoT शेड कूलिंग इनेबल (Auto HVAC Trigger)</span>
                  <p class="text-[11px] text-slate-400">जब THI या अमोनिया सीमा पार करे, तो रिले द्वारा पंखे व स्प्रिंकलर स्वतः ऑन होंगे।</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="chkAutoHvac" class="sr-only peer" ${r.autoCoolingEnabled ? "checked" : ""} />
                  <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <label class="block font-mono uppercase text-slate-300">पंखे चालू करने हेतु THI सीमा (Fan Trigger THI)</label>
                  <input type="number" step="0.5" id="inFanThi" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold font-mono" value="${r.fanOnThiThreshold}" />
                  <span class="text-[10px] text-slate-500">Normal Standard: 72.0 THI</span>
                </div>

                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <label class="block font-mono uppercase text-slate-300">सोकर स्प्रिंकलर THI सीमा (Sprinkler Trigger THI)</label>
                  <input type="number" step="0.5" id="inSprinklerThi" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="${r.sprinklerOnThiThreshold}" />
                  <span class="text-[10px] text-slate-500">Normal Standard: 78.0 THI</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <label class="block font-mono uppercase text-slate-300">सोकर ऑन चक्र (Water Soaking Duration)</label>
                  <input type="number" id="inSoakerOn" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${r.soakerCycleOnMins}" />
                  <span class="text-[10px] text-slate-500">Minutes (Default: 3 mins)</span>
                </div>

                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <label class="block font-mono uppercase text-slate-300">पंखे केवल चक्र (Fan Only Evaporative Cycle)</label>
                  <input type="number" id="inSoakerOff" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${r.soakerCycleOffMins}" />
                  <span class="text-[10px] text-slate-500">Minutes (Default: 9 mins)</span>
                </div>

                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <label class="block font-mono uppercase text-slate-300">अमोनिया निकास सीमा (Exhaust NH3 ppm)</label>
                  <input type="number" step="1" id="inExhaustAmmonia" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-mono font-bold" value="${r.exhaustFanAmmoniaPpm}" />
                  <span class="text-[10px] text-slate-500">Default: 15 ppm</span>
                </div>
              </div>

              <div class="pt-3 flex justify-end">
                <button type="submit" id="btnSaveHvacRules" class="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg transition-all flex items-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i> स्वचालन नियम सहेजें (Save HVAC Rules)
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    // 4.5 EVENT BINDING & INTERACTION WORKFLOW
    bindEvents() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Tab switching
      container.querySelectorAll(".iot-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Simulation Toggle Button
      const btnToggleSimulation = container.querySelector("#btnToggleSimulation");
      if (btnToggleSimulation) {
        btnToggleSimulation.addEventListener("click", () => {
          this.isSimulatingTelemetry = !this.isSimulatingTelemetry;
          this.render();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(
              this.isSimulatingTelemetry ? "IoT लाइव डेटा सिमुलेशन प्रारंभ हुआ!" : "डेटा सिमुलेशन रोका गया।",
              this.isSimulatingTelemetry ? "success" : "warning"
            );
          }
        });
      }

      // Emergency Cool All Button
      const btnForceCoolingAll = container.querySelector("#btnForceCoolingAll");
      if (btnForceCoolingAll) {
        btnForceCoolingAll.addEventListener("click", () => {
          this.state.barnSensors.forEach((s) => {
            s.fanSprinklerAutoStatus = "ON";
          });
          this.render();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("आपातकालीन निर्देश प्रेषित: सभी शेड कूलिंग पंखे व स्प्रिंकलर 100% पर चालू!", "error");
          }
        });
      }

      // Export CSV Button
      const btnExportCsv = container.querySelector("#btnExportCsv");
      if (btnExportCsv) {
        btnExportCsv.addEventListener("click", () => this.exportTelemetryCsv());
      }

      // Add Cow Wearable Modal
      const btnOpenAddCowWearableModal = container.querySelector("#btnOpenAddCowWearableModal");
      if (btnOpenAddCowWearableModal) {
        btnOpenAddCowWearableModal.addEventListener("click", () => this.showAddCowWearableModal());
      }

      // Save HVAC Rules Form
      const formHvacRules = container.querySelector("#formHvacRules");
      if (formHvacRules) {
        formHvacRules.addEventListener("submit", () => {
          const chkAuto = container.querySelector("#chkAutoHvac")?.checked;
          const fanThi = parseFloat(container.querySelector("#inFanThi")?.value) || 72.0;
          const sprThi = parseFloat(container.querySelector("#inSprinklerThi")?.value) || 78.0;
          const soakOn = parseInt(container.querySelector("#inSoakerOn")?.value, 10) || 3;
          const soakOff = parseInt(container.querySelector("#inSoakerOff")?.value, 10) || 9;
          const nh3Max = parseFloat(container.querySelector("#inExhaustAmmonia")?.value) || 15.0;

          this.state.hvacRules = {
            autoCoolingEnabled: !!chkAuto,
            fanOnThiThreshold: fanThi,
            sprinklerOnThiThreshold: sprThi,
            soakerCycleOnMins: soakOn,
            soakerCycleOffMins: soakOff,
            exhaustFanAmmoniaPpm: nh3Max
          };

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("HVAC स्वचालन सेटिंग्स सफलतापूर्वक सहेजी गईं।", "success");
          }
        });
      }
    },

    // 4.6 CLINICAL MODALS
    showAddCowWearableModal() {
      const modalHost = document.getElementById("iotModalContainer");
      if (!modalHost) return;

      modalHost.innerHTML = `
        <div id="cowWearableModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white">नया स्मार्ट कॉलर टैग जोड़ें (Add Smart Collar)</h3>
              <button id="btnCloseCowModal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddCow" onsubmit="return false;" class="space-y-3 text-xs">
              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">कॉलर टैग आईडी (Tag No.)</label>
                <input type="text" id="inCowTag" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="TAG-${Math.floor(1000 + Math.random() * 9000)}" required />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">गाय का नाम / नंबर (Cow Identifier)</label>
                <input type="text" id="inCowName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold" placeholder="उदा. कामधेनु (#1145)" required />
              </div>

              <div>
                <label class="block font-mono uppercase text-slate-300 mb-1">नस्ल (Breed)</label>
                <input type="text" id="inCowBreed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" value="Crossbred Holstein" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">जुगाली (Rumination Min/d)</label>
                  <input type="number" id="inCowRumination" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="480" />
                </div>
                <div>
                  <label class="block font-mono uppercase text-slate-300 mb-1">सक्रियता इंडेक्स (Activity %)</label>
                  <input type="number" id="inCowActivity" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="100" />
                </div>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" id="btnCancelCow" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" id="btnSubmitCow" class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">कॉलर पंजीकृत करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const close = () => {
        modalHost.innerHTML = "";
      };
      document.getElementById("btnCloseCowModal").addEventListener("click", close);
      document.getElementById("btnCancelCow").addEventListener("click", close);

      document.getElementById("formAddCow").addEventListener("submit", async () => {
        const tagNo = document.getElementById("inCowTag").value.trim();
        const cowName = document.getElementById("inCowName").value.trim();
        const breed = document.getElementById("inCowBreed").value.trim();
        const rum = parseInt(document.getElementById("inCowRumination").value, 10) || 480;
        const act = parseInt(document.getElementById("inCowActivity").value, 10) || 100;

        const newCow = {
          id: "COW-" + tagNo,
          recordType: "COW_WEARABLE",
          tagNo,
          cowName,
          breed,
          ruminationMinutesPerDay: rum,
          activityIndex: act,
          reticulorumenTempC: 39.2,
          estrusAlert: act >= 200,
          sicknessAlert: rum < 350,
          healthStatus: act >= 200 ? "IN_ESTRUS_HEAT_PEAK" : rum < 350 ? "SICKNESS_FEVER_ALERT" : "HEALTHY_OPTIMAL",
          lastHeard: "Just now"
        };

        await IotStorage.put(newCow);
        this.state.cowWearables.unshift(newCow);
        close();
        this.render();
        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("नया कॉलर सेंसर टैग सफलता से पंजीकृत किया गया।", "success");
        }
      });
    },

    // 4.7 CSV TELEMETRY EXPORT ENGINE
    exportTelemetryCsv() {
      const now = new Date().toISOString();
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Type,ID,Name_Or_Tag,Metric1_Temp_Or_Rumination,Metric2_RH_Or_Activity,THI_Or_RumenTemp,Status,Timestamp\r\n";

      // Append Barn Sensors
      this.state.barnSensors.forEach((s) => {
        csvContent += `STATION,${s.stationId},"${s.locationName}",${s.ambientTempC} C,${s.relativeHumidityPercent} %,${s.thiScore},${s.fanSprinklerAutoStatus},${now}\r\n`;
      });

      // Append Cow Wearables
      this.state.cowWearables.forEach((c) => {
        csvContent += `COW_WEARABLE,${c.tagNo},"${c.cowName}",${c.ruminationMinutesPerDay} mins,${c.activityIndex} %,${c.reticulorumenTempC} C,${c.healthStatus},${now}\r\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Vetcare_Barn_IoT_Telemetry_${now.split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("IoT टेलीमेट्री CSV फाइल सफलतापूर्वक डाउनलोड हुई!", "success");
      }
    },

    // 4.8 LIFECYCLE DESTRUCTION ROUTINE
    destroy() {
      if (this.simulationTimer) {
        clearInterval(this.simulationTimer);
        this.simulationTimer = null;
      }
      const container = document.getElementById(this.containerId);
      if (container) {
        container.innerHTML = "";
      }
      const modalHost = document.getElementById("iotModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] IoT Barn Sensors Telemetry Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.IotBarnSensorsTelemetry = IotBarnSensorsTelemetry;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      IotBarnSensorsTelemetry.init();
    });
  } else {
    IotBarnSensorsTelemetry.init();
  }
})();
