// Vetcare AI OS - Hospital Staff Directory, RBAC Access Governance & Duty Shift Manager (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[StaffRbac EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE ADMIN & RBAC CHIMES)
  const RbacAudio = {
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
    chimeSuccess: function () {
      RbacAudio.playTone(523.25, "sine", 0.1, 0.07);
      setTimeout(() => RbacAudio.playTone(659.25, "sine", 0.12, 0.07), 80);
      setTimeout(() => RbacAudio.playTone(880, "sine", 0.2, 0.08), 160);
    },
    chimeAccessDenied: function () {
      RbacAudio.playTone(220, "sawtooth", 0.25, 0.15);
    },
    toggleClick: function () {
      RbacAudio.playTone(700, "square", 0.03, 0.04);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR STAFF DIRECTORY
  const StaffStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    saveStaffDirectory: async function (staffList) {
      try {
        if (!window.indexedDB) return;
        const req = window.indexedDB.open(StaffStorage.DB_NAME, StaffStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("admin_staff_registry")) {
            db.createObjectStore("admin_staff_registry", { keyPath: "staffId" });
          }
        };
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("admin_staff_registry")) return;
          const tx = db.transaction("admin_staff_registry", "readwrite");
          const store = tx.objectStore("admin_staff_registry");
          staffList.forEach(stf => store.put(stf));
        };
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_STAFF_REGISTRY_CACHE", JSON.stringify(staffList));
        } catch (e) {
          console.warn("[StaffStorage] LocalStorage write error", e);
        }
      }
    },
    loadStaffDirectory: async function () {
      try {
        if (!window.indexedDB) return null;
        return new Promise(resolve => {
          const req = window.indexedDB.open(StaffStorage.DB_NAME, StaffStorage.DB_VERSION);
          req.onsuccess = function (e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("admin_staff_registry")) {
              resolve(null);
              return;
            }
            const tx = db.transaction("admin_staff_registry", "readonly");
            const getReq = tx.objectStore("admin_staff_registry").getAll();
            getReq.onsuccess = function () {
              resolve(getReq.result && getReq.result.length > 0 ? getReq.result : null);
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

  // 4. MAIN STAFF ROLE & ACCESS GOVERNANCE CONTROLLER
  const StaffRoleManagement = {
    // --- Reactive Internal State ---
    state: {
      staffDirectory: [
        {
          staffId: "STF-01",
          fullName: "डॉ. राहुल जांगड़ा (Dr. Rahul Jangra)",
          role: "CHIEF_VET",
          roleLabelHi: "मुख्य पशु चिकित्सा अधिकारी (Chief Vet)",
          vciRegNo: "VCI-2026-9297",
          mobile: "9991039297",
          email: "dr.rahul@vetcare.in",
          shift: "MORNING",
          permissions: ["rx:write", "rx:sign", "narcotics:prescribe", "surgery:perform", "billing:override", "emr:delete", "staff:manage", "telemedicine:consult"],
          accountStatus: "ACTIVE" // ACTIVE | SUSPENDED | ON_LEAVE
        },
        {
          staffId: "STF-02",
          fullName: "डॉ. प्रिया शर्मा (Dr. Priya Sharma)",
          role: "CONSULTANT_VET",
          roleLabelHi: "पशु चिकित्सा विशेषज्ञ (Consultant Vet)",
          vciRegNo: "VCI-2025-4412",
          mobile: "9812044111",
          email: "priya.vet@vetcare.in",
          shift: "EVENING",
          permissions: ["rx:write", "rx:sign", "surgery:perform", "telemedicine:consult", "emr:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-03",
          fullName: "संदीप सिंह (Sandeep Singh)",
          role: "PARA_VET",
          roleLabelHi: "पैरा-वेटरनेरियन / वीएलडीए (Para-Vet)",
          vciRegNo: "PV-HR-2023-889",
          mobile: "9416033441",
          email: "sandeep.pvet@vetcare.in",
          shift: "ROTATING",
          permissions: ["ai:inseminate", "firstaid:administer", "vaccine:inject", "records:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-04",
          fullName: "कविता वर्मा (Kavita Verma, RN)",
          role: "PHARMACIST",
          roleLabelHi: "प्रभारी फार्मासिस्ट (Pharmacist)",
          vciRegNo: "PCI-HR-11204",
          mobile: "9872200192",
          email: "kavita.pharm@vetcare.in",
          shift: "MORNING",
          permissions: ["pharmacy:dispense", "inventory:audit", "billing:generate", "records:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-05",
          fullName: "विक्रम नैन (Vikram Nain)",
          role: "LAB_TECHNICIAN",
          roleLabelHi: "पैथोलॉजी तकनीशियन (Lab Tech)",
          vciRegNo: "DMLT-2024-90",
          mobile: "9466011928",
          email: "vikram.lab@vetcare.in",
          shift: "MORNING",
          permissions: ["lab:process", "lab:report_entry", "records:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-06",
          fullName: "बलवान यादव (Balwan Yadav)",
          role: "AI_INSEMINATOR",
          roleLabelHi: "कृत्रिम गर्भाधान कार्यकर्ता (AI Technician)",
          vciRegNo: "AI-TRAINED-2022",
          mobile: "9416055811",
          email: "balwan.ai@vetcare.in",
          shift: "ROTATING",
          permissions: ["ai:inseminate", "straws:log", "records:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-07",
          fullName: "अमित पुनिया (Amit Punia)",
          role: "RECEPTIONIST",
          roleLabelHi: "ओपीडी रिसेप्शनिस्ट (Receptionist)",
          vciRegNo: "N/A",
          mobile: "9991122883",
          email: "amit.frontdesk@vetcare.in",
          shift: "MORNING",
          permissions: ["token:generate", "patient:register", "billing:collect", "records:view"],
          accountStatus: "ACTIVE"
        },
        {
          staffId: "STF-08",
          fullName: "डॉ. सुरेंदर मलिक (Dr. Surender Malik)",
          role: "CONSULTANT_VET",
          roleLabelHi: "रात्रि ऑन-कॉल सर्जन (Night Surgeon)",
          vciRegNo: "VCI-2021-3011",
          mobile: "9812077665",
          email: "malik.vet@vetcare.in",
          shift: "NIGHT",
          permissions: ["rx:write", "rx:sign", "surgery:perform", "records:view"],
          accountStatus: "ON_LEAVE"
        }
      ],
      rolePermissionPresets: {
        CHIEF_VET: ["rx:write", "rx:sign", "narcotics:prescribe", "surgery:perform", "billing:override", "emr:delete", "staff:manage", "telemedicine:consult", "lab:report_entry", "pharmacy:dispense", "patient:register"],
        CONSULTANT_VET: ["rx:write", "rx:sign", "surgery:perform", "telemedicine:consult", "emr:view", "patient:register"],
        PARA_VET: ["ai:inseminate", "firstaid:administer", "vaccine:inject", "records:view", "patient:register"],
        PHARMACIST: ["pharmacy:dispense", "inventory:audit", "billing:generate", "records:view"],
        LAB_TECHNICIAN: ["lab:process", "lab:report_entry", "records:view"],
        AI_INSEMINATOR: ["ai:inseminate", "straws:log", "records:view"],
        RECEPTIONIST: ["token:generate", "patient:register", "billing:collect", "records:view"]
      },
      selectedStaffId: "STF-01",
      activeTab: "staff_directory", // staff_directory | rbac_permission_matrix | duty_shift_roster | add_staff_modal
      filterRole: "ALL",
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Hospital Staff Directory & RBAC Governance Subsystem (2026 Production)...");
      StaffRoleManagement.injectStyles();

      // Hydrate state from IndexedDB if stored
      const stored = await StaffStorage.loadStaffDirectory();
      if (stored && stored.length > 0) {
        StaffRoleManagement.state.staffDirectory = stored;
      }

      if (containerId) {
        StaffRoleManagement.render(containerId);
      }
      return StaffRoleManagement;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "adminStaffManagementContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      StaffRoleManagement.state.domContainer = container;

      // Construct Complete Hospital Workforce UI
      container.innerHTML = `
        <div id="vetcareStaffWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${StaffRoleManagement.renderExecutiveHeader()}
          ${StaffRoleManagement.renderWorkforceKpiRibbon()}
          ${StaffRoleManagement.renderNavigationTabs()}
          <div id="staffTabContentHost" class="transition-all duration-200">
            ${StaffRoleManagement.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Offscreen Container for Print / CSV Exports -->
        <div id="staffDutyRosterExportHost" class="hidden"></div>
      `;

      StaffRoleManagement.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (StaffRoleManagement.state.domContainer) {
        StaffRoleManagement.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Staff Role Management module destroyed cleanly.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-staff-rbac-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-staff-rbac-styles";
      style.textContent = `
        .rbac-checkbox:checked {
          background-color: #06b6d4 !important;
          border-color: #06b6d4 !important;
        }
        .staff-card-active {
          border-left: 4px solid #10b981 !important;
        }
        .staff-card-leave {
          border-left: 4px solid #f59e0b !important;
        }
        .staff-card-suspended {
          border-left: 4px solid #f43f5e !important;
        }
      `;
      document.head.appendChild(style);
    },

    // 9. RBAC GOVERNANCE PERMISSION VERIFIER
    hasPermission: function (staffRole, requiredPermission) {
      const presets = StaffRoleManagement.state.rolePermissionPresets[staffRole];
      if (!presets) return false;
      return presets.includes(requiredPermission);
    },

    // 10. STATUTORY VETERINARY REGISTRATION VALIDATOR
    validateVciRegistration: function (role, regNo) {
      if (role === "CHIEF_VET" || role === "CONSULTANT_VET") {
        const vciRegex = /^(VCI|SVC|HRVCI|PBVCI)-\d{4}-\d{3,6}$/i;
        return vciRegex.test(regNo.trim());
      }
      return true;
    },

    // 11. SHIFT FATIGUE & COLLISION RULE CHECKER
    checkShiftFatigueRule: function (staffId, requestedShift) {
      const staff = StaffRoleManagement.state.staffDirectory.find(s => s.staffId === staffId);
      if (!staff) return { allowed: true };

      if (staff.shift === "NIGHT" && requestedShift === "MORNING") {
        return {
          allowed: false,
          warningMessageHi: "शिफ्ट टकराव व थकान नियम: रात्रि ड्यूटी (Night Shift) के तुरंत बाद मॉर्निंग ड्यूटी वर्जित है। न्यूनतम 12 घंटे का अनिवार्य विश्राम आवश्यक है!"
        };
      }
      return { allowed: true };
    },

    // 12. COMPONENT: EXECUTIVE HEADER
    renderExecutiveHeader: function () {
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-cyan-950/50">
                <i class="fa-solid fa-users-gear"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    अस्पताल मानव संसाधन, आरबीएसी अनुमतियां एवं ड्यूटी रोस्टर
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    RBAC GOVERNANCE 2026
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
                  VCI वैधानिक पंजीकरण सत्यापन • रोल-आधारित अनुमतियां • क्लिनिकल शिफ्ट थकान सुरक्षा
                </div>
              </div>
            </div>

            <!-- New Staff Fast Action Trigger -->
            <div class="flex items-center gap-2">
              <button id="btnOpenAddStaffTab" type="button" class="py-2.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50 flex items-center gap-2 active:scale-95 transition-all">
                <i class="fa-solid fa-user-plus"></i>
                <span>+ नया कर्मचारी जोड़ें</span>
              </button>
              <button id="btnExportStaffCsvTrigger" type="button" title="स्टाफ रोस्टर CSV डाउनलोड करें" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs">
                <i class="fa-solid fa-file-csv text-emerald-400 text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 13. COMPONENT: WORKFORCE KPI RIBBON
    renderWorkforceKpiRibbon: function () {
      const list = StaffRoleManagement.state.staffDirectory;
      const totalStaff = list.length;
      const activeClinicians = list.filter(s => (s.role === "CHIEF_VET" || s.role === "CONSULTANT_VET") && s.accountStatus === "ACTIVE").length;
      const paraVetsField = list.filter(s => (s.role === "PARA_VET" || s.role === "AI_INSEMINATOR") && s.accountStatus === "ACTIVE").length;
      const onLeaveCount = list.filter(s => s.accountStatus === "ON_LEAVE" || s.accountStatus === "SUSPENDED").length;

      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">कुल अस्पताल स्टाफ</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-white sunlight-text">${totalStaff}</span>
              <span class="text-[10px] text-cyan-400 font-bold">कार्मिक</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">सक्रिय पशु चिकित्सक (Vets)</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-emerald-400">${activeClinicians}</span>
              <span class="text-[10px] text-slate-400">VCI पंजीकृत</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">फील्ड पैरा-वेट / वीएलडीए</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black text-amber-300">${paraVetsField}</span>
              <span class="text-[10px] text-slate-400">सक्रिय फील्ड</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md sunlight-card">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">अवकाश / निलंबित</span>
            <div class="mt-1 flex items-baseline gap-1">
              <span class="text-xl sm:text-2xl font-display font-black ${onLeaveCount > 0 ? "text-rose-400" : "text-slate-400"}">${onLeaveCount}</span>
              <span class="text-[10px] text-slate-400">खाते</span>
            </div>
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = StaffRoleManagement.state.activeTab;
      const count = StaffRoleManagement.state.staffDirectory.length;

      const tabs = [
        { id: "staff_directory", label: "कार्मिक निर्देशिका (Staff Directory)", icon: "fa-address-book", count: count },
        { id: "rbac_permission_matrix", label: "आरबीएसी अनुमतियां (Permission Matrix)", icon: "fa-table-cells" },
        { id: "duty_shift_roster", label: "साप्ताहिक ड्यूटी रोस्टर (Shift Roster)", icon: "fa-calendar-week" },
        { id: "add_staff_modal", label: "+ नया कार्मिक नामांकन (Enroll Staff)", icon: "fa-user-plus" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-staff-tab="${t.id}" class="staff-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-cyan-400 border-t-2 border-l border-r border-cyan-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.count !== undefined ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono ${active === t.id ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">${t.count}</span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 15. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (StaffRoleManagement.state.activeTab) {
        case "rbac_permission_matrix":
          return StaffRoleManagement.renderRbacPermissionMatrixTab();
        case "duty_shift_roster":
          return StaffRoleManagement.renderDutyShiftRosterTab();
        case "add_staff_modal":
          return StaffRoleManagement.renderAddStaffFormTab();
        case "staff_directory":
        default:
          return StaffRoleManagement.renderStaffDirectoryTab();
      }
    },

    // 16. COMPONENT: TAB 1 - STAFF DIRECTORY
    renderStaffDirectoryTab: function () {
      const list = StaffRoleManagement.state.staffDirectory;
      const filter = StaffRoleManagement.state.filterRole;

      const filtered = list.filter(s => {
        if (filter === "ALL") return true;
        return s.role === filter;
      });

      return `
        <div class="space-y-4">
          <!-- Role Filter Chips -->
          <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex-wrap sunlight-card">
            <span class="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-2">
              <i class="fa-solid fa-filter text-cyan-400"></i>
              <span>पद अनुसार फ़िल्टर:</span>
            </span>
            <div class="flex items-center gap-1.5 flex-wrap text-xs">
              ${[
                { id: "ALL", label: "सभी स्टाफ" },
                { id: "CHIEF_VET", label: "मुख्य पशु चिकित्सक" },
                { id: "CONSULTANT_VET", label: "कंसल्टेंट डॉक्टर" },
                { id: "PARA_VET", label: "पैरा-वेट / वीएलडीए" },
                { id: "PHARMACIST", label: "फार्मासिस्ट" },
                { id: "LAB_TECHNICIAN", label: "लैब तकनीशियन" }
              ].map(f => `
                <button type="button" data-role-filter="${f.id}" class="role-filter-btn px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filter === f.id ? "bg-cyan-600 text-slate-950 font-black shadow" : "bg-slate-800 text-slate-300 hover:text-white"
                }">
                  ${f.label}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Staff Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${filtered.map(s => {
              const statusClass = s.accountStatus === "ACTIVE" ? "staff-card-active" : (s.accountStatus === "ON_LEAVE" ? "staff-card-leave" : "staff-card-suspended");
              return `
                <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5 ${statusClass} sunlight-card flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-black text-cyan-400 text-sm font-mono">
                          ${s.staffId}
                        </div>
                        <div>
                          <h3 class="font-display font-black text-base text-white sunlight-text">${s.fullName}</h3>
                          <div class="text-xs font-bold text-cyan-400 font-mono">${s.roleLabelHi}</div>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        s.accountStatus === "ACTIVE" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : (s.accountStatus === "ON_LEAVE" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40")
                      }">
                        ${s.accountStatus}
                      </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-slate-300">
                      <div>
                        <span class="text-[9px] text-slate-500 uppercase block">पंजीकरण (VCI/Reg):</span>
                        <strong class="${s.vciRegNo !== "N/A" ? "text-amber-400" : "text-slate-500"}">${s.vciRegNo}</strong>
                      </div>
                      <div>
                        <span class="text-[9px] text-slate-500 uppercase block">वर्तमान शिफ्ट:</span>
                        <strong class="text-white">${s.shift} SHIFT</strong>
                      </div>
                      <div>
                        <span class="text-[9px] text-slate-500 uppercase block">मोबाइल फोन:</span>
                        <strong class="text-slate-200">${s.mobile}</strong>
                      </div>
                      <div>
                        <span class="text-[9px] text-slate-500 uppercase block">अनुमतियां (Permissions):</span>
                        <strong class="text-cyan-400">${s.permissions.length} राइट्स स्वीकृत</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button type="button" data-action="toggle_status" data-staff-id="${s.staffId}" class="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors">
                      स्थिति बदलें (${s.accountStatus === "ACTIVE" ? "छुट्टी" : "सक्रिय"})
                    </button>
                    <button type="button" data-action="manage_permissions" data-staff-id="${s.staffId}" class="py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-black shadow transition-all">
                      अनुमतियां संपादित करें
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: TAB 2 - RBAC PERMISSION MATRIX
    renderRbacPermissionMatrixTab: function () {
      const presets = StaffRoleManagement.state.rolePermissionPresets;
      const roles = ["CHIEF_VET", "CONSULTANT_VET", "PARA_VET", "PHARMACIST", "LAB_TECHNICIAN", "RECEPTIONIST"];

      const permissionsCatalog = [
        { key: "rx:write", label: "प्रिस्क्रिप्शन लिखना (Write Prescription)", risk: "CRITICAL" },
        { key: "narcotics:prescribe", label: "नियंत्रित नारकोटिक दवाएं (Schedule H1 Narcotics)", risk: "LETHAL" },
        { key: "surgery:perform", label: "शल्य चिकित्सा संचालन (Perform Surgery)", risk: "CRITICAL" },
        { key: "billing:override", label: "बिलिंग छूट व ओवरराइड (Billing Override)", risk: "FINANCIAL" },
        { key: "emr:delete", label: "मरीज रिकॉर्ड हटाना (Delete EMR Records)", risk: "DATA" },
        { key: "lab:report_entry", label: "लैब रिपोर्ट सत्यापन (Sign Lab Reports)", risk: "CLINICAL" },
        { key: "pharmacy:dispense", label: "दवा वितरण व स्टॉक (Dispense Medicines)", risk: "CONTROL" },
        { key: "token:generate", label: "ओपीडी टोकन जारी करना (OPD Tokens)", risk: "ROUTINE" }
      ];

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-table-cells text-cyan-400"></i>
                <span>आरबीएसी अनुमतियां विन्यास ग्रिड (Fine-Grained Role Governance)</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">प्रत्येक पद (Role) हेतु मॉड्यूल-वार अधिकार सक्षम या अक्षम करें।</p>
            </div>
            <span class="text-xs font-mono text-emerald-400 font-bold">VCI COMPLIANT</span>
          </div>

          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th class="p-3">सिस्टम अनुमति (Module Capability)</th>
                  ${roles.map(r => `<th class="p-3 text-center">${r.replace(/_/g, " ")}</th>`).join("")}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 text-xs">
                ${permissionsCatalog.map(p => `
                  <tr>
                    <td class="p-3">
                      <div class="font-bold text-white">${p.label}</div>
                      <div class="text-[10px] font-mono text-slate-500">${p.key}</div>
                    </td>
                    ${roles.map(r => {
                      const isGranted = (presets[r] && presets[r].includes(p.key));
                      return `
                        <td class="p-3 text-center">
                          <input type="checkbox" data-role="${r}" data-perm="${p.key}" class="rbac-perm-checkbox w-4 h-4 rounded border-slate-700 rbac-checkbox cursor-pointer" ${isGranted ? "checked" : ""} />
                        </td>
                      `;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // 18. COMPONENT: TAB 3 - DUTY SHIFT ROSTER
    renderDutyShiftRosterTab: function () {
      const list = StaffRoleManagement.state.staffDirectory;

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-calendar-week text-amber-400"></i>
                <span>अस्पताल साप्ताहिक ड्यूटी रोस्टर (Clinical Shift Allocator)</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">मॉर्निंग (08-14), इवनिंग (14-20) एवं नाइट इमरजेंसी (20-08) ऑन-कॉल आवंटन।</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Morning Shift -->
            <div class="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="font-display font-bold text-xs text-amber-300 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-sun"></i> <span>मॉर्निंग शिफ्ट (08:00 - 14:00)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">OPD PEAK</span>
              </div>
              <div class="space-y-1.5 text-xs text-slate-200">
                ${list.filter(s => s.shift === "MORNING").map(s => `
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span class="font-bold">${s.fullName}</span>
                    <span class="text-[10px] font-mono text-cyan-400">${s.role}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Evening Shift -->
            <div class="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="font-display font-bold text-xs text-cyan-300 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-cloud-sun"></i> <span>इवनिंग शिफ्ट (14:00 - 20:00)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">EVENING OPD</span>
              </div>
              <div class="space-y-1.5 text-xs text-slate-200">
                ${list.filter(s => s.shift === "EVENING").map(s => `
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span class="font-bold">${s.fullName}</span>
                    <span class="text-[10px] font-mono text-cyan-400">${s.role}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Night Shift -->
            <div class="p-4 rounded-xl bg-slate-950 border border-rose-500/40 space-y-2">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="font-display font-bold text-xs text-rose-300 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-moon"></i> <span>नाइट इमरजेंसी (20:00 - 08:00)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">ON-CALL SOS</span>
              </div>
              <div class="space-y-1.5 text-xs text-slate-200">
                ${list.filter(s => s.shift === "NIGHT").map(s => `
                  <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span class="font-bold">${s.fullName}</span>
                    <span class="text-[10px] font-mono text-rose-400">${s.role}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // 19. COMPONENT: TAB 4 - ADD NEW STAFF FORM
    renderAddStaffFormTab: function () {
      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sunlight-card max-w-2xl mx-auto">
          <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-user-plus text-cyan-400 text-xl"></i>
              <h3 class="font-display font-black text-base text-white sunlight-text">नया स्वास्थ्य सेवा कार्मिक नामांकन</h3>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              CREDENTIALS ENROLLMENT
            </span>
          </div>

          <form id="formEnrollNewStaff" onsubmit="return false;" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पूरा नाम (Full Name w/ Title)</label>
                <input type="text" id="inputNewStaffName" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. डॉ. अमित नैन" required />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पद / रोल (Hospital Role)</label>
                <select id="selectNewStaffRole" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold cursor-pointer">
                  <option value="CONSULTANT_VET">पशु चिकित्सा विशेषज्ञ (Consultant Vet)</option>
                  <option value="CHIEF_VET">मुख्य पशु चिकित्सक (Chief Vet)</option>
                  <option value="PARA_VET">पैरा-वेट / वीएलडीए (Para-Vet)</option>
                  <option value="PHARMACIST">फार्मासिस्ट (Pharmacist)</option>
                  <option value="LAB_TECHNICIAN">लैब तकनीशियन (Lab Tech)</option>
                  <option value="AI_INSEMINATOR">कृत्रिम गर्भाधान कार्यकर्ता (AI Tech)</option>
                  <option value="RECEPTIONIST">ओपीडी रिसेप्शनिस्ट (Receptionist)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">VCI / स्टेट काउंसिल रजिस्ट्रेशन नंबर</label>
                <input type="text" id="inputNewStaffVci" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono" placeholder="उदा. VCI-2026-4401 (डॉक्टर हेतु अनिवार्य)" />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">प्रारंभिक ड्यूटी शिफ्ट</label>
                <select id="selectNewStaffShift" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option value="MORNING">मॉर्निंग शिफ्ट (08:00 - 14:00)</option>
                  <option value="EVENING">इवनिंग शिफ्ट (14:00 - 20:00)</option>
                  <option value="NIGHT">नाइट इमरजेंसी (20:00 - 08:00)</option>
                  <option value="ROTATING">रोटेटिंग / फील्ड विजिट</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">मोबाइल नंबर (Login ID)</label>
                <input type="tel" id="inputNewStaffMobile" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="98120XXXXX" required />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">ईमेल पता (Email Address)</label>
                <input type="email" id="inputNewStaffEmail" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="name@vetcare.in" required />
              </div>
            </div>

            <div class="pt-2 flex justify-end gap-2">
              <button type="submit" id="btnSubmitEnrollStaff" class="px-6 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg active:scale-95 transition-all">
                <i class="fa-solid fa-check-circle mr-1"></i> कर्मचारी पंजीकृत करें
              </button>
            </div>
          </form>
        </div>
      `;
    },

    // 20. EXPORT: STAFF DUTY ROSTER CSV
    exportStaffDutyRosterCsv: function () {
      const list = StaffRoleManagement.state.staffDirectory;
      let csv = "STAFF_ID,NAME,ROLE,VCI_REG_NO,MOBILE,SHIFT,STATUS\n";
      list.forEach(s => {
        csv += `"${s.staffId}","${s.fullName}","${s.role}","${s.vciRegNo}","${s.mobile}","${s.shift}","${s.accountStatus}"\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Vetcare_Staff_Roster_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      RbacAudio.chimeSuccess();

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("स्टाफ ड्यूटी रोस्टर CSV सफलतापूर्वक डाउनलोड हुआ!", "success");
      }
    },

    // 21. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = StaffRoleManagement.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".staff-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-staff-tab");
          if (tab) {
            StaffRoleManagement.state.activeTab = tab;
            StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);
          }
        });
      });

      // Role filter clicks
      root.querySelectorAll(".role-filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const filter = this.getAttribute("data-role-filter");
          if (filter) {
            StaffRoleManagement.state.filterRole = filter;
            StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);
          }
        });
      });

      // Open Add Staff Tab
      const btnOpenAdd = document.getElementById("btnOpenAddStaffTab");
      if (btnOpenAdd) {
        btnOpenAdd.addEventListener("click", function () {
          StaffRoleManagement.state.activeTab = "add_staff_modal";
          StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);
        });
      }

      // Export CSV Trigger
      const btnExport = document.getElementById("btnExportStaffCsvTrigger");
      if (btnExport) {
        btnExport.addEventListener("click", () => StaffRoleManagement.exportStaffDutyRosterCsv());
      }

      // Permission Checkbox Toggle in Matrix
      root.querySelectorAll(".rbac-perm-checkbox").forEach(cb => {
        cb.addEventListener("change", function () {
          const role = this.getAttribute("data-role");
          const perm = this.getAttribute("data-perm");
          const isChecked = this.checked;

          if (!StaffRoleManagement.state.rolePermissionPresets[role]) {
            StaffRoleManagement.state.rolePermissionPresets[role] = [];
          }

          if (isChecked) {
            if (!StaffRoleManagement.state.rolePermissionPresets[role].includes(perm)) {
              StaffRoleManagement.state.rolePermissionPresets[role].push(perm);
            }
          } else {
            StaffRoleManagement.state.rolePermissionPresets[role] = StaffRoleManagement.state.rolePermissionPresets[role].filter(p => p !== perm);
          }

          // Update staff assigned to this role
          StaffRoleManagement.state.staffDirectory.forEach(s => {
            if (s.role === role) {
              s.permissions = [...StaffRoleManagement.state.rolePermissionPresets[role]];
            }
          });

          StaffStorage.saveStaffDirectory(StaffRoleManagement.state.staffDirectory);
          RbacAudio.toggleClick();
          EventBus.emit("rbac:permission_modified", { role: role, perm: perm, granted: isChecked });
        });
      });

      // Enroll New Staff Form Submit
      const formEnroll = document.getElementById("formEnrollNewStaff");
      if (formEnroll) {
        formEnroll.addEventListener("submit", function () {
          const name = document.getElementById("inputNewStaffName").value;
          const role = document.getElementById("selectNewStaffRole").value;
          const vci = document.getElementById("inputNewStaffVci").value || "N/A";
          const shift = document.getElementById("selectNewStaffShift").value;
          const mobile = document.getElementById("inputNewStaffMobile").value;
          const email = document.getElementById("inputNewStaffEmail").value;

          // Statutory Registration Validation
          if (!StaffRoleManagement.validateVciRegistration(role, vci)) {
            RbacAudio.chimeAccessDenied();
            alert("⚠️ अमान्य VCI पंजीकरण संख्या! मुख्य या कंसल्टेंट डॉक्टर हेतु वैध पंजीकरण संख्या (उदा. VCI-2026-XXXX) अनिवार्य है।");
            return;
          }

          const newStaff = {
            staffId: "STF-" + String(StaffRoleManagement.state.staffDirectory.length + 1).padStart(2, "0"),
            fullName: name,
            role: role,
            roleLabelHi: role.replace(/_/g, " "),
            vciRegNo: vci,
            mobile: mobile,
            email: email,
            shift: shift,
            permissions: [...(StaffRoleManagement.state.rolePermissionPresets[role] || [])],
            accountStatus: "ACTIVE"
          };

          StaffRoleManagement.state.staffDirectory.push(newStaff);
          StaffStorage.saveStaffDirectory(StaffRoleManagement.state.staffDirectory);

          RbacAudio.chimeSuccess();
          StaffRoleManagement.state.activeTab = "staff_directory";
          StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`नया कर्मचारी '${name}' सफलतापूर्वक नामांकित हुआ!`, "success");
          }
        });
      }

      // Delegated Action Clicks
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "toggle_status") {
          const id = btn.getAttribute("data-staff-id");
          const staff = StaffRoleManagement.state.staffDirectory.find(s => s.staffId === id);
          if (staff) {
            staff.accountStatus = staff.accountStatus === "ACTIVE" ? "ON_LEAVE" : "ACTIVE";
            StaffStorage.saveStaffDirectory(StaffRoleManagement.state.staffDirectory);
            StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);
            RbacAudio.toggleClick();
          }
        } else if (action === "manage_permissions") {
          StaffRoleManagement.state.activeTab = "rbac_permission_matrix";
          StaffRoleManagement.render(StaffRoleManagement.state.domContainer.id);
        }
      });
    }
  };

  // 22. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Admin.StaffRoleManagement = StaffRoleManagement;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("adminStaffManagementContainer");
    if (defaultHost) {
      StaffRoleManagement.init("adminStaffManagementContainer");
    }
  });

})(window, document);
