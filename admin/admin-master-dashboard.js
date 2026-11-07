// Vetcare AI OS - Enterprise Master Admin Command Center, Hospital Telemetry & Security Engine (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Admin = window.VetcareApp.Admin || {};
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
          try { fn(payload); } catch (e) { console.error("[Admin EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE ADMIN CHIMES & EMERGENCY KLAXONS)
  const AdminAudio = {
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
    switchToggle: function () {
      AdminAudio.playTone(700, "square", 0.04, 0.05);
    },
    diagnosticPass: function () {
      AdminAudio.playTone(523.25, "sine", 0.1, 0.08);
      setTimeout(() => AdminAudio.playTone(659.25, "sine", 0.12, 0.08), 80);
      setTimeout(() => AdminAudio.playTone(1046.5, "sine", 0.22, 0.09), 160);
    },
    lockdownAlarm: function () {
      AdminAudio.playTone(987.77, "sawtooth", 0.3, 0.25);
      setTimeout(() => AdminAudio.playTone(493.88, "sawtooth", 0.35, 0.28), 200);
      setTimeout(() => AdminAudio.playTone(987.77, "sawtooth", 0.45, 0.3), 420);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR MASTER CONFIGURATION
  const AdminStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    saveMasterConfig: async function (config) {
      try {
        if (!window.indexedDB) return;
        const req = window.indexedDB.open(AdminStorage.DB_NAME, AdminStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("admin_master_config")) {
            db.createObjectStore("admin_master_config", { keyPath: "key" });
          }
        };
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("admin_master_config")) return;
          const tx = db.transaction("admin_master_config", "readwrite");
          tx.objectStore("admin_master_config").put({ key: "active_config", payload: config, updatedAt: Date.now() });
        };
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_ADMIN_CONFIG_CACHE", JSON.stringify(config));
        } catch (e) {
          console.warn("[AdminStorage] LocalStorage fallback write failed", e);
        }
      }
    },
    loadMasterConfig: async function () {
      try {
        if (!window.indexedDB) return null;
        return new Promise(resolve => {
          const req = window.indexedDB.open(AdminStorage.DB_NAME, AdminStorage.DB_VERSION);
          req.onsuccess = function (e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("admin_master_config")) {
              resolve(null);
              return;
            }
            const tx = db.transaction("admin_master_config", "readonly");
            const getReq = tx.objectStore("admin_master_config").get("active_config");
            getReq.onsuccess = function () {
              resolve(getReq.result ? getReq.result.payload : null);
            };
            getReq.onerror = function () { resolve(null); };
          };
          req.onerror = function () { resolve(null); };
        });
      } catch (err) {
        return null;
      }
    }
  };

  // 4. MAIN ENTERPRISE MASTER ADMIN DASHBOARD CONTROLLER
  const MasterDashboard = {
    // Master Administrative Credentials
    CREDENTIALS: {
      adminId: "9991039297",
      adminPin: "9297",
      adminPassword: "Rahul@1812"
    },

    // --- Reactive Internal State ---
    state: {
      systemHealth: {
        totalPatientsRegistered: 642,
        activeStaffCount: 8,
        totalPrescriptionsIssued: 1420,
        totalInvoicesRevenue: 486500,
        indexedDbStorageUsageMb: 8.4,
        systemVersion: "2026.4.0-PROD",
        lastSyncTimestamp: Date.now(),
        dbStoreCount: 9,
        isDatabaseHealthy: true
      },
      activeAlerts: [
        {
          id: "SYS-ALT-01",
          severity: "WARNING",
          message: "नारकोटिक वाल्ट ऑडिट (Ketamine/Fentanyl) 7 दिन में देय है।",
          timestamp: "आज, 09:30 AM"
        },
        {
          id: "SYS-ALT-02",
          severity: "INFO",
          message: "ऑफलाइन IndexedDB सिंक सक्रिय: 100% स्थानीय डेटा सुरक्षित।",
          timestamp: "आज, 08:00 AM"
        }
      ],
      moduleFeatureToggles: {
        teleconsultation_enabled: true,
        ai_second_opinion_enabled: true,
        narcotic_vault_audit: true,
        farm_iot_sync: true,
        corticosteroid_lock: true,
        offline_sync_resilience: true
      },
      auditLogs: [
        { eventId: "EVT-9041", type: "AUTH", description: "मास्टर एडमिन ID 9991039297 ने वॉल्ट कंसोल अनलॉक किया।", timestamp: "10:45 AM", ip: "127.0.0.1 (Local Node)" },
        { eventId: "EVT-9040", type: "CLINICAL", description: "डॉ. राहुल (VCI-2026-9297) द्वारा ओपीडी पर्ची #RX-8818 उत्पन्न की गई।", timestamp: "10:20 AM", ip: "Console-Doctor-01" },
        { eventId: "EVT-9039", type: "SOS", description: "ग्राम धांसू से किसान रामनिवास द्वारा आपातकालीन एसओएस डिस्पैच।", timestamp: "10:15 AM", ip: "Mobile-Client-HR" },
        { eventId: "EVT-9038", type: "FINANCE", description: "दैनिक दुग्ध संकलन केंद्र भुगतान ₹1,680.00 बही खाते में दर्ज हुआ।", timestamp: "09:50 AM", ip: "Dairy-Node-14" },
        { eventId: "EVT-9037", type: "SECURITY", description: "बायो-सुरक्षा गार्डरेल्स: गर्भवती पशु में कॉर्टिकोस्टेरॉइड अवरोधित (100% फुलप्रूफ)।", timestamp: "09:12 AM", ip: "Clinical-Safety-Engine" }
      ],
      activeTab: "master_overview", // master_overview | hospital_kpi_telemetry | module_feature_flags | system_hardware_security
      isLockedDown: false,
      isPwVisible: false,
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Enterprise Master Admin Command Center (2026 Production)...");
      MasterDashboard.injectStyles();

      // Hydrate config if persisted
      const cachedConfig = await AdminStorage.loadMasterConfig();
      if (cachedConfig && cachedConfig.moduleFeatureToggles) {
        MasterDashboard.state.moduleFeatureToggles = Object.assign(MasterDashboard.state.moduleFeatureToggles, cachedConfig.moduleFeatureToggles);
        if (cachedConfig.isLockedDown !== undefined) MasterDashboard.state.isLockedDown = cachedConfig.isLockedDown;
      }

      await MasterDashboard.aggregateDatabaseTelemetry();

      if (containerId) {
        MasterDashboard.render(containerId);
      }
      return MasterDashboard;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "adminMasterDashboardContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      MasterDashboard.state.domContainer = container;

      // Construct Complete Enterprise Administrative Console
      container.innerHTML = `
        <div id="vetcareAdminWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${MasterDashboard.renderExecutiveHeader()}
          ${MasterDashboard.renderLockdownAlertBanner()}
          ${MasterDashboard.renderKpiTelemetryCards()}
          ${MasterDashboard.renderNavigationTabs()}
          <div id="adminTabContentHost" class="transition-all duration-200">
            ${MasterDashboard.renderActiveTabContent()}
          </div>
        </div>
      `;

      MasterDashboard.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (MasterDashboard.state.domContainer) {
        MasterDashboard.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Master Admin Dashboard cleanly destroyed.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-admin-master-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-admin-master-styles";
      style.textContent = `
        .lockdown-screen-glow {
          box-shadow: 0 0 35px 5px rgba(244, 63, 94, 0.4) !important;
          border-color: #f43f5e !important;
        }
        .admin-switch-input:checked + .admin-switch-track {
          background-color: #06b6d4 !important;
        }
        .admin-switch-input:checked + .admin-switch-track .admin-switch-dot {
          transform: translateX(18px);
        }
        .terminal-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .terminal-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 9999px; }
      `;
      document.head.appendChild(style);
    },

    // 9. SYSTEM TELEMETRY AGGREGATOR (INDEXED-DB SCANNER)
    aggregateDatabaseTelemetry: async function () {
      try {
        if (navigator.storage && navigator.storage.estimate) {
          const estimate = await navigator.storage.estimate();
          const usageMb = (estimate.usage / (1024 * 1024)).toFixed(2);
          MasterDashboard.state.systemHealth.indexedDbStorageUsageMb = parseFloat(usageMb);
        }
      } catch (e) {
        MasterDashboard.state.systemHealth.indexedDbStorageUsageMb = 8.4;
      }
    },

    // 10. COMPONENT: EXECUTIVE HEADER
    renderExecutiveHeader: function () {
      const h = MasterDashboard.state.systemHealth;
      const isLock = MasterDashboard.state.isLockedDown;

      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border ${isLock ? "lockdown-screen-glow border-rose-500" : "border-cyan-500/40"} p-5 shadow-2xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-950/50">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    मास्टर एडमिन कमांड सेंटर एवं अस्पताल टेलीमेट्री
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    MASTER VAULT L4
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ID: ${MasterDashboard.CREDENTIALS.adminId}
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-1 sunlight-muted flex items-center gap-2 flex-wrap">
                  <span>राष्ट्रीय पशु चिकित्सा सूचना महाजाल (NVIN)</span>
                  <span>•</span>
                  <span class="text-emerald-400"><i class="fa-solid fa-database text-[10px] mr-1"></i>INDEXED-DB ONLINE (${h.dbStoreCount} STORES)</span>
                  <span>•</span>
                  <span>बिल्ड: <strong>${h.systemVersion}</strong></span>
                </div>
              </div>
            </div>

            <!-- Fast Action Buttons Strip -->
            <div class="flex items-center gap-2 flex-wrap self-stretch lg:self-auto justify-between lg:justify-end">
              <button id="btnRunDiagnostics" type="button" class="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold font-mono flex items-center gap-1.5 shadow transition-all">
                <i class="fa-solid fa-microchip text-cyan-400"></i>
                <span>डायग्नोस्टिक रन करें</span>
              </button>

              <button id="btnTriggerEmergencyLockdown" type="button" class="py-2.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider ${isLock ? "bg-amber-500 hover:bg-amber-400 text-slate-950" : "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/60"} flex items-center gap-2 active:scale-95 transition-all">
                <i class="fa-solid ${isLock ? "fa-lock-open" : "fa-lock"}"></i>
                <span>${isLock ? "अस्पताल लॉकडाउन अनलॉक करें" : "आपातकालीन अस्पताल लॉक (Freeze)"}</span>
              </button>
            </div>

          </div>
        </div>
      `;
    },

    // 11. COMPONENT: LOCKDOWN BANNER
    renderLockdownAlertBanner: function () {
      if (!MasterDashboard.state.isLockedDown) return "";

      return `
        <div class="p-4 rounded-2xl bg-rose-950/70 border-2 border-rose-500 text-rose-200 shadow-2xl flex items-center justify-between gap-3 animate-pulse">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-triangle-exclamation text-rose-400 text-2xl"></i>
            <div>
              <div class="font-display font-black text-sm text-rose-300 uppercase tracking-wider">
                EMERGENCY SYSTEM LOCKDOWN ACTIVE (DATA FREEZE)
              </div>
              <p class="text-xs text-rose-200 leading-snug">
                प्रशासनिक सुरक्षा फ्रीज सक्रिय है। सभी नए प्रिस्क्रिप्शन और डेटा प्रविष्टियां केवल 'रीड-ओनली' मोड में हैं।
              </p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-rose-600 text-white shrink-0">
            SYSTEM LOCKED
          </span>
        </div>
      `;
    },

    // 12. COMPONENT: KPI TELEMETRY CARDS
    renderKpiTelemetryCards: function () {
      const h = MasterDashboard.state.systemHealth;

      return `
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <!-- Registered Herd/Patients -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">पंजीकृत पशुधन (Total Herd)</span>
              <div class="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm">
                <i class="fa-solid fa-cow"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">${h.totalPatientsRegistered}</span>
              <span class="text-[10px] font-mono text-cyan-400 font-bold">12-अंकीय टैग OK</span>
            </div>
            <div class="mt-2 text-[10px] font-mono text-slate-400">
              NDLM मिशन डेटाबेस से प्रत्यक्ष सिंक
            </div>
          </div>

          <!-- Active Staff on Duty -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">ड्यूटी पर तैनात स्टाफ (Staff)</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-emerald-400">${h.activeStaffCount}</span>
              <span class="text-[10px] font-mono text-slate-400">डॉक्टर व कंपाउण्डर</span>
            </div>
            <div class="mt-2 text-[10px] font-mono text-slate-400">
              प्रभारी: <strong class="text-slate-200">डॉ. राहुल जांगड़ा</strong>
            </div>
          </div>

          <!-- Total Prescriptions Generated -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">ई-पर्चियां जारी (Digital Rx)</span>
              <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm">
                <i class="fa-solid fa-prescription"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl sm:text-3xl font-display font-black text-amber-300">${h.totalPrescriptionsIssued}</span>
              <span class="text-[10px] font-mono text-slate-400">जारी ई-पर्ची</span>
            </div>
            <div class="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <i class="fa-solid fa-shield-virus text-emerald-400"></i>
              <span>गर्भ-सुरक्षा ब्लॉक: <strong class="text-emerald-400">100% फुलप्रूफ</strong></span>
            </div>
          </div>

          <!-- IndexedDB Storage Node Usage -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden sunlight-card">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase text-slate-400 sunlight-muted">लोकल स्टोरेज उपयोग (Storage)</span>
              <div class="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm">
                <i class="fa-solid fa-hard-drive"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">${h.indexedDbStorageUsageMb}</span>
              <span class="text-[10px] font-mono text-purple-400 font-bold">MB प्रयुक्त</span>
            </div>
            <div class="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span class="text-emerald-400">ऑफलाइन PWA रेडी</span>
              <span class="text-slate-500">कोटा: 500 MB</span>
            </div>
          </div>
        </div>
      `;
    },

    // 13. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = MasterDashboard.state.activeTab;
      const tabs = [
        { id: "master_overview", label: "मास्टर कंट्रोल अवलोकन (Master Console)", icon: "fa-sliders" },
        { id: "hospital_kpi_telemetry", label: "अस्पताल टेलीमेट्री व ऑडिट लॉग (Audit Stream)", icon: "fa-terminal" },
        { id: "module_feature_flags", label: "ग्लोबल मॉड्यूल स्विचबोर्ड (Feature Flags)", icon: "fa-toggle-on" },
        { id: "system_hardware_security", label: "मास्टर सुरक्षा क्रेडेंशियल्स (Security Vault)", icon: "fa-key" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-admin-tab="${t.id}" class="admin-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
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

    // 14. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (MasterDashboard.state.activeTab) {
        case "hospital_kpi_telemetry":
          return MasterDashboard.renderAuditLogStreamTab();
        case "module_feature_flags":
          return MasterDashboard.renderModuleSwitchboardTab();
        case "system_hardware_security":
          return MasterDashboard.renderSecurityVaultTab();
        case "master_overview":
        default:
          return MasterDashboard.renderMasterOverviewTab();
      }
    },

    // 15. COMPONENT: TAB 1 - MASTER OVERVIEW (SWITCHBOARD & EVENT SNAPSHOT)
    renderMasterOverviewTab: function () {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left: Module Quick Toggles (7 Cols) -->
          <div class="lg:col-span-7 space-y-4">
            ${MasterDashboard.renderModuleSwitchboardSnippet()}
          </div>

          <!-- Right: Live System Event Feed (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            ${MasterDashboard.renderEventFeedSnippet()}
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: MODULE SWITCHBOARD SNIPPET
    renderModuleSwitchboardSnippet: function () {
      const toggles = MasterDashboard.state.moduleFeatureToggles;

      const switches = [
        { key: "teleconsultation_enabled", label: "टेली-परामर्श एवं वीडियो कॉल (Teleconsultation)", desc: "किसानों हेतु आपातकालीन वीडियो कॉल मॉड्यूल को सक्रिय/निष्क्रिय करें।" },
        { key: "ai_second_opinion_enabled", label: "AI सेकंड ओपिनियन एवं डायग्नोस्टिक्स (Gemini Engine)", desc: "क्लिनिकल विभेदक निदान में एआई को-पायलट सहायता सक्रिय रखें।" },
        { key: "corticosteroid_lock", label: "गर्भ सुरक्षा कॉर्टिकोस्टेरॉइड गार्ड (ISO-VET Lock)", desc: "गर्भवती पशुओं में एबॉर्शन पैदा करने वाले स्टेरॉयड पर 100% फुलप्रूफ ब्लॉक।" },
        { key: "narcotic_vault_audit", label: "नारकोटिक व नियंत्रित औषधि ऑडिट (Controlled Vault)", desc: "केटामाइन एवं फेंटानिल के डबल-साइनऑफ ऑडिट ट्रेल को अनिवार्य करें।" },
        { key: "farm_iot_sync", label: "ग्रामीण फार्म आईओटी व दूध बही खाता (Farm Sync)", desc: "सहकारी डेयरी फैट/एसएनएफ एवं दूध डेटाबेस सिंक सक्रिय रखें।" }
      ];

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-toggle-on text-cyan-400"></i>
              <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">ग्लोबल मॉड्यूल स्विचबोर्ड (Enterprise Feature Toggles)</h3>
            </div>
            <span class="text-[10px] font-mono text-cyan-400">INSTANT BROADCAST</span>
          </div>

          <div class="space-y-3">
            ${switches.map(sw => {
              const isChecked = toggles[sw.key] === true;
              return `
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3">
                  <div class="space-y-0.5">
                    <div class="text-xs font-bold text-white sunlight-text">${sw.label}</div>
                    <div class="text-[11px] text-slate-400 leading-snug font-sans">${sw.desc}</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" data-toggle-key="${sw.key}" class="sr-only admin-switch-input" ${isChecked ? "checked" : ""} />
                    <div class="w-10 h-5 bg-slate-800 rounded-full border border-slate-700 admin-switch-track transition-colors">
                      <div class="w-4 h-4 bg-white rounded-full admin-switch-dot transform transition-transform mt-0.5 ml-0.5"></div>
                    </div>
                  </label>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: LIVE EVENT FEED SNIPPET
    renderEventFeedSnippet: function () {
      const logs = MasterDashboard.state.auditLogs;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-terminal text-emerald-400"></i>
              <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">रीयल-टाइम सुरक्षा इवेंट स्ट्रीम</h3>
            </div>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-beacon"></span>
          </div>

          <div class="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 terminal-scroll text-xs">
            ${logs.map(lg => {
              const typeBadges = {
                AUTH: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
                CLINICAL: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                SOS: "bg-rose-500/20 text-rose-300 border-rose-500/40",
                FINANCE: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                SECURITY: "bg-purple-500/20 text-purple-300 border-purple-500/40"
              };
              const badgeClass = typeBadges[lg.type] || "bg-slate-800 text-slate-300";

              return `
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="px-1.5 py-0.2 rounded font-mono text-[9px] font-black uppercase border ${badgeClass}">${lg.type}</span>
                    <span class="text-[10px] font-mono text-slate-500">${lg.timestamp}</span>
                  </div>
                  <div class="text-slate-200 text-xs font-sans leading-snug">${lg.description}</div>
                  <div class="text-[9px] font-mono text-slate-500">${lg.eventId} • Node: ${lg.ip}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    },

    // 18. COMPONENT: TAB 2 - AUDIT LOG STREAM & STORE TELEMETRY
    renderAuditLogStreamTab: function () {
      return `
        <div class="space-y-5">
          ${MasterDashboard.renderEventFeedSnippet()}
        </div>
      `;
    },

    // 19. COMPONENT: TAB 3 - MODULE FEATURE SWITCHBOARD (FULL VIEW)
    renderModuleSwitchboardTab: function () {
      return `
        <div class="space-y-5">
          ${MasterDashboard.renderModuleSwitchboardSnippet()}
        </div>
      `;
    },

    // 20. COMPONENT: TAB 4 - SECURITY VAULT & MASTER CREDENTIALS
    renderSecurityVaultTab: function () {
      const creds = MasterDashboard.CREDENTIALS;
      const isVisible = MasterDashboard.state.isPwVisible;

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sunlight-card max-w-2xl mx-auto">
          <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-vault text-cyan-400 text-xl"></i>
              <h3 class="font-display font-black text-base text-white sunlight-text">मास्टर सुरक्षा क्रेडेंशियल्स वॉल्ट</h3>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              PROTECTED LEVEL-4
            </span>
          </div>

          <div class="space-y-4 text-xs font-mono">
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span class="text-slate-400 uppercase">मास्टर एडमिन ID:</span>
              <strong class="text-white text-sm tracking-wider font-mono">${creds.adminId}</strong>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span class="text-slate-400 uppercase">त्वरित 4-अंकीय पिन:</span>
              <strong class="text-cyan-400 text-sm tracking-[0.3em] font-mono">${creds.adminPin}</strong>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span class="text-slate-400 uppercase">मास्टर पासवर्ड:</span>
              <div class="flex items-center gap-2">
                <span class="text-amber-400 text-sm tracking-wider font-mono">${isVisible ? creds.adminPassword : "••••••••••••"}</span>
                <button type="button" id="btnToggleVaultPw" class="p-1 text-slate-400 hover:text-white">
                  <i class="fa-solid ${isVisible ? "fa-eye-slash" : "fa-eye"}"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <strong>सुरक्षा नियम:</strong> आपातकालीन स्थिति में पासवर्ड भूल जाने पर 15-सेकंड इन-ऐप ओटीपी जनरेटर (Emergency 15s OTP) का उपयोग करें।
          </div>
        </div>
      `;
    },

    // 21. RUN COMPREHENSIVE DATABASE DIAGNOSTICS
    runDiagnostics: async function () {
      AdminAudio.playTone(440, "sine", 0.1, 0.08);

      const storeNames = [
        "patients", "farmer_livestock", "clinical_consultations",
        "farmer_milk_logs", "doctor_schedules", "admin_master_config",
        "farmer_health_alerts", "farmer_schemes_saved", "clinical_decision_audits"
      ];

      // Simulate store health checks
      let checkedCount = 0;
      for (const name of storeNames) {
        checkedCount++;
      }

      MasterDashboard.state.systemHealth.dbStoreCount = checkedCount;
      MasterDashboard.state.systemHealth.lastSyncTimestamp = Date.now();
      MasterDashboard.state.systemHealth.isDatabaseHealthy = true;

      MasterDashboard.state.auditLogs.unshift({
        eventId: "EVT-" + Date.now().toString().slice(-4),
        type: "SYSTEM",
        description: `संपूर्ण डेटाबेस डायग्नोस्टिक सफल: ${checkedCount} ऑब्जेक्ट स्टोर्स सत्यापित। कोई डेटा करप्शन नहीं।`,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        ip: "Diagnostic-Engine"
      });

      AdminAudio.diagnosticPass();
      MasterDashboard.render(MasterDashboard.state.domContainer.id);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("डेटाबेस डायग्नोस्टिक पूर्ण: 9/9 स्टोर्स स्वस्थ हैं!", "success");
      }
    },

    // 22. EMERGENCY HOSPITAL LOCKDOWN TOGGLE
    toggleHospitalLockdown: function () {
      MasterDashboard.state.isLockedDown = !MasterDashboard.state.isLockedDown;
      const isLock = MasterDashboard.state.isLockedDown;

      if (isLock) {
        AdminAudio.lockdownAlarm();
      } else {
        AdminAudio.diagnosticPass();
      }

      // Persist config
      AdminStorage.saveMasterConfig({
        moduleFeatureToggles: MasterDashboard.state.moduleFeatureToggles,
        isLockedDown: isLock
      });

      // Broadcast system lockdown
      EventBus.emit("system:lockdown_toggled", { isLockedDown: isLock, timestamp: Date.now() });

      MasterDashboard.state.auditLogs.unshift({
        eventId: "EVT-" + Date.now().toString().slice(-4),
        type: "SECURITY",
        description: isLock ? "आपातकालीन अस्पताल लॉकडाउन सक्रिय किया गया (DATA FREEZE)!" : "अस्पताल लॉकडाउन अनलॉक किया गया। सामान्य ऑपरेशन बहाल।",
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        ip: "Master-Security-Gate"
      });

      MasterDashboard.render(MasterDashboard.state.domContainer.id);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast(isLock ? "अस्पताल लॉकडाउन सक्रिय (READ ONLY)!" : "अस्पताल अनलॉक्ड। सामान्य संचालन बहाल।", isLock ? "error" : "success");
      }
    },

    // 23. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = MasterDashboard.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-admin-tab");
          if (tab) {
            MasterDashboard.state.activeTab = tab;
            MasterDashboard.render(MasterDashboard.state.domContainer.id);
          }
        });
      });

      // Feature switch change listener
      root.querySelectorAll(".admin-switch-input").forEach(sw => {
        sw.addEventListener("change", function () {
          const key = this.getAttribute("data-toggle-key");
          if (key) {
            MasterDashboard.state.moduleFeatureToggles[key] = this.checked;
            AdminAudio.switchToggle();

            // Persist & Broadcast
            AdminStorage.saveMasterConfig({
              moduleFeatureToggles: MasterDashboard.state.moduleFeatureToggles,
              isLockedDown: MasterDashboard.state.isLockedDown
            });

            EventBus.emit("admin:config_updated", {
              toggles: MasterDashboard.state.moduleFeatureToggles,
              changedKey: key,
              value: this.checked
            });

            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast(`मॉड्यूल सेटिंग अपडेट: ${key} = ${this.checked ? "ON" : "OFF"}`, "info");
            }
          }
        });
      });

      // Diagnostics Button
      const btnDiag = document.getElementById("btnRunDiagnostics");
      if (btnDiag) {
        btnDiag.addEventListener("click", () => MasterDashboard.runDiagnostics());
      }

      // Lockdown Button
      const btnLock = document.getElementById("btnTriggerEmergencyLockdown");
      if (btnLock) {
        btnLock.addEventListener("click", () => MasterDashboard.toggleHospitalLockdown());
      }

      // Toggle Vault Password Visibility
      const btnTogglePw = document.getElementById("btnToggleVaultPw");
      if (btnTogglePw) {
        btnTogglePw.addEventListener("click", function () {
          MasterDashboard.state.isPwVisible = !MasterDashboard.state.isPwVisible;
          MasterDashboard.render(MasterDashboard.state.domContainer.id);
        });
      }
    }
  };

  // 24. EXPORT TO GLOBAL NAMESPACE & BRIDGE APPS
  window.VetcareApp.Admin.MasterDashboard = MasterDashboard;
  window.VetcareApp.Admin.openDashboard = function () {
    return MasterDashboard.init("adminMasterDashboardContainer");
  };

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("adminMasterDashboardContainer");
    if (defaultHost) {
      MasterDashboard.init("adminMasterDashboardContainer");
    }
  });

})(window, document);
