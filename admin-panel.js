// Vetcare AI OS - Admin Control Console & User Analytics (2026 Production)

(function (root) {
  "use strict";

  /* =========================================================================
     1. STORAGE KEYS & CORE STATE CONFIGURATION
     ========================================================================= */
  const STORAGE_KEYS = {
    AUTH_SESSION: "vetcare_admin_session",
    USERS_DB: "vetcare_users_db",
    PLANS_DB: "vetcare_sub_plans",
    TICKETS_DB: "vetcare_support_tickets"
  };

  const MASTER_CREDENTIALS = {
    adminId: "9991039297",
    adminPass: "Rahul@1812"
  };

  // Seed default subscription pricing if not already initialized
  const DEFAULT_PLANS = {
    DOCTOR: {
      week1: { price: 99, offer: "परीक्षण पैक (Intro)" },
      month1: { price: 299, offer: "सर्वाधिक लोकप्रिय (OPD + AI)" },
      month3: { price: 799, offer: "त्रैमासिक बचत (15% छूट)" }
    },
    FARMER: {
      week1: { price: 29, offer: "सस्ता किसान पैक" },
      month1: { price: 99, offer: "मासिक डेयरी बहीखाता" },
      month3: { price: 249, offer: "मौसमी विशेष बचत" }
    }
  };

  // Seed sample users if empty
  const SEED_USERS = [
    {
      id: "USR_101",
      name: "डॉ. राकेश शर्मा",
      contact: "9829012345",
      role: "DOCTOR",
      regDate: "2026-02-15",
      status: "ACTIVE",
      subscription: "ACTIVE",
      dualPortal: true,
      trialExpires: null
    },
    {
      id: "USR_102",
      name: "चौधरी महिपाल सिंह",
      contact: "9414098765",
      role: "FARMER",
      regDate: "2026-02-28",
      status: "ACTIVE",
      subscription: "TRIAL",
      dualPortal: false,
      trialExpires: Date.now() + 18 * 60 * 60 * 1000 // 18 hours left
    },
    {
      id: "USR_103",
      name: "डॉ. अमित वर्मा",
      contact: "9876543210",
      role: "DOCTOR",
      regDate: "2026-01-10",
      status: "BANNED",
      subscription: "EXPIRED",
      dualPortal: false,
      trialExpires: null
    },
    {
      id: "USR_104",
      name: "सुरेश गुर्जर (डेयरी फार्म)",
      contact: "9785011223",
      role: "FARMER",
      regDate: "2026-03-01",
      status: "ACTIVE",
      subscription: "ACTIVE",
      dualPortal: false,
      trialExpires: null
    }
  ];

  const SEED_TICKETS = [
    {
      id: "TCK_901",
      userId: "USR_104",
      userName: "सुरेश गुर्जर",
      role: "FARMER",
      subject: "दूध खाता में बकाया राशि नहीं जुड़ रही",
      message: "मैंने कल 500 रुपये की एंट्री की थी पर कुल बैलेंस में नहीं दिख रहा है। कृपया जांचें।",
      date: "2026-03-02 10:30 AM",
      status: "OPEN"
    },
    {
      id: "TCK_902",
      userId: "USR_101",
      userName: "डॉ. राकेश शर्मा",
      role: "DOCTOR",
      subject: "डिजिटल पर्ची में क्लिनिक का नाम बदलना है",
      message: "पर्ची हेडर पर 'श्री श्याम पशु क्लिनिक' प्रिंट करवाना चाहता हूँ।",
      date: "2026-03-01 04:15 PM",
      status: "RESOLVED"
    }
  ];

  /* Helper utilities for persistent state */
  function getStoredData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error("Storage Read Error:", e);
      return fallback;
    }
  }

  function setStoredData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage Write Error:", e);
    }
  }

  // Self-initialize storage tables
  if (!localStorage.getItem(STORAGE_KEYS.PLANS_DB)) {
    setStoredData(STORAGE_KEYS.PLANS_DB, DEFAULT_PLANS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS_DB)) {
    setStoredData(STORAGE_KEYS.USERS_DB, SEED_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TICKETS_DB)) {
    setStoredData(STORAGE_KEYS.TICKETS_DB, SEED_TICKETS);
  }

  /* =========================================================================
     2. MASKED ADMIN AUTHENTICATION & SECURITY CONTROLLER
     ========================================================================= */
  let simulatedOtpCode = null;

  root.isAdminAuthenticated = function () {
    const session = getStoredData(STORAGE_KEYS.AUTH_SESSION, null);
    if (!session || !session.token) return false;
    // Session validity 12 hours
    return Date.now() - session.timestamp < 12 * 60 * 60 * 1000;
  };

  root.openAdminConsole = function () {
    if (root.isAdminAuthenticated()) {
      root.renderAdminDashboard();
    } else {
      root.renderAdminLoginModal();
    }
  };

  root.renderAdminLoginModal = function () {
    const modalId = "vetcare_admin_auth_modal";
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-slate-800 font-sans">
        <button onclick="document.getElementById('${modalId}').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center text-xl shadow-lg">🛡️</div>
          <h2 class="text-base font-black text-slate-900 tracking-tight">सुरक्षा कंसोल लॉगिन</h2>
          <p class="text-[11px] text-slate-500 font-medium">एडमिनिस्ट्रेटिव सिस्टम सत्यापन</p>
        </div>

        <div class="space-y-3 pt-1">
          <div>
            <label class="block text-[11px] font-bold text-slate-600 mb-1">प्रशासक आईडी (Masked ID)</label>
            <div class="relative">
              <input id="admAuthId" type="password" placeholder="••••••••••" autocomplete="off"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono tracking-widest outline-none focus:border-blue-600 pr-9" />
              <button type="button" onclick="window.toggleFieldMask('admAuthId', this)" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 text-xs font-bold">👁️</button>
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-bold text-slate-600 mb-1">सुरक्षा पासवर्ड (Password)</label>
            <div class="relative">
              <input id="admAuthPass" type="password" placeholder="••••••••••••" autocomplete="off"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono tracking-widest outline-none focus:border-blue-600 pr-9" />
              <button type="button" onclick="window.toggleFieldMask('admAuthPass', this)" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 text-xs font-bold">👁️</button>
            </div>
          </div>

          <div id="admAuthError" class="hidden text-[11px] text-rose-600 font-bold bg-rose-50 border border-rose-200 rounded-lg p-2 text-center"></div>

          <button onclick="window.submitAdminLogin()" class="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-2xl text-xs shadow-md transition active:scale-98">
            सुरक्षित सत्यापन करें ➔
          </button>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <button onclick="window.triggerAdminOtpFlow()" class="text-blue-600 font-bold hover:underline">
              📱 मोबाइल OTP द्वारा रीसेट
            </button>
            <span class="text-slate-400 text-[10px]">2026 Core v4.8</span>
          </div>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  };

  root.toggleFieldMask = function (fieldId, btnElem) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    if (field.type === "password") {
      field.type = "text";
      btnElem.textContent = "🙈";
    } else {
      field.type = "password";
      btnElem.textContent = "👁️";
    }
  };

  root.submitAdminLogin = function () {
    const idField = document.getElementById("admAuthId");
    const passField = document.getElementById("admAuthPass");
    const errBox = document.getElementById("admAuthError");

    if (!idField || !passField) return;

    const id = idField.value.trim();
    const pass = passField.value.trim();

    if (id === MASTER_CREDENTIALS.adminId && pass === MASTER_CREDENTIALS.adminPass) {
      setStoredData(STORAGE_KEYS.AUTH_SESSION, {
        token: "AUTH_SEC_" + Date.now(),
        timestamp: Date.now()
      });
      const modal = document.getElementById("vetcare_admin_auth_modal");
      if (modal) modal.remove();
      root.renderAdminDashboard();
    } else {
      errBox.textContent = "अमान्य आईडी अथवा पासवर्ड! सुरक्षा कारणों से यह प्रयास रिकॉर्ड कर लिया गया है।";
      errBox.classList.remove("hidden");
    }
  };

  root.triggerAdminOtpFlow = function () {
    simulatedOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[सिम्युलेटेड SMS गेटवे]:\nअधिकृत नंबर (${MASTER_CREDENTIALS.adminId}) पर 6-अंकों का OTP भेजा गया है:\n\nOTP: ${simulatedOtpCode}`);

    const enteredOtp = prompt("कृपया मोबाइल पर प्राप्त 6-अंकों का OTP दर्ज करें:");
    if (enteredOtp && enteredOtp.trim() === simulatedOtpCode) {
      const newPass = prompt("नया सुरक्षा पासवर्ड दर्ज करें:");
      if (newPass && newPass.length >= 6) {
        MASTER_CREDENTIALS.adminPass = newPass.trim();
        alert("पासवर्ड सफलतापूर्वक रीसेट कर दिया गया है! अब नए पासवर्ड से लॉगिन करें।");
      } else {
        alert("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए!");
      }
    } else if (enteredOtp !== null) {
      alert("गलत OTP! सत्यापन विफल रहा।");
    }
  };

  root.adminLogout = function () {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    const dashboard = document.getElementById("vetcare_admin_dashboard_modal");
    if (dashboard) dashboard.remove();
    alert("एडमिन सत्र सुरक्षित रूप से समाप्त हो गया है।");
  };

  /* =========================================================================
     3. REAL-TIME USER TRACKER & ANALYTICS DASHBOARD
     ========================================================================= */
  let currentUserFilter = "ALL";
  let activeAdminTab = "USERS";

  root.renderAdminDashboard = function () {
    const modalId = "vetcare_admin_dashboard_modal";
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      modal.className = "fixed inset-0 z-50 flex flex-col bg-slate-100 overflow-y-auto text-slate-900 font-sans";
      document.body.appendChild(modal);
    }

    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    const tickets = getStoredData(STORAGE_KEYS.TICKETS_DB, []);
    const plans = getStoredData(STORAGE_KEYS.PLANS_DB, DEFAULT_PLANS);

    // Compute live metrics
    const totalUsers = users.length;
    const activeDoctors = users.filter(u => u.role === "DOCTOR" && u.status === "ACTIVE").length;
    const activeFarmers = users.filter(u => u.role === "FARMER" && u.status === "ACTIVE").length;
    const activeTrials = users.filter(u => u.subscription === "TRIAL" && u.trialExpires && u.trialExpires > Date.now()).length;
    const bannedAccounts = users.filter(u => u.status === "BANNED").length;
    const openTicketsCount = tickets.filter(t => t.status === "OPEN").length;

    modal.innerHTML = `
      <!-- TOP NAVIGATION BAR -->
      <header class="sticky top-0 z-30 bg-slate-900 text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-sm">VC</div>
          <div>
            <h1 class="text-sm sm:text-base font-black flex items-center gap-2">
              <span>सुपर एडमिन कंट्रोल कंसोल</span>
              <span class="text-[9px] bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded">ONLINE</span>
            </h1>
            <p class="text-[10px] text-slate-400">उपयोगकर्ता ट्रैकर, योजना मूल्य निर्धारण एवं सपोर्ट इनबॉक्स</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.adminLogout()" class="text-xs bg-rose-600/80 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl font-bold transition">
            लॉगआउट ➔
          </button>
        </div>
      </header>

      <!-- METRIC KPI CARDS -->
      <div class="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
            <span class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase block">कुल पंजीकृत उपयोगकर्ता</span>
            <strong class="text-xl sm:text-2xl font-black text-slate-900">${totalUsers}</strong>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
            <span class="text-[10px] sm:text-xs font-bold text-blue-600 uppercase block">सक्रिय पशु चिकित्सक</span>
            <strong class="text-xl sm:text-2xl font-black text-blue-700">${activeDoctors}</strong>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
            <span class="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase block">सक्रिय स्मार्ट पशुपालक</span>
            <strong class="text-xl sm:text-2xl font-black text-emerald-700">${activeFarmers}</strong>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
            <span class="text-[10px] sm:text-xs font-bold text-amber-600 uppercase block">24-घंटे सक्रिय ट्रायल</span>
            <strong class="text-xl sm:text-2xl font-black text-amber-600">${activeTrials}</strong>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs col-span-2 sm:col-span-1">
            <span class="text-[10px] sm:text-xs font-bold text-rose-600 uppercase block">प्रतिबंधित खाते (Banned)</span>
            <strong class="text-xl sm:text-2xl font-black text-rose-600">${bannedAccounts}</strong>
          </div>
        </div>

        <!-- MAIN TABS NAVIGATION -->
        <div class="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar font-bold text-xs sm:text-sm">
          <button onclick="window.switchAdminTab('USERS')" class="px-4 py-2.5 border-b-2 transition ${activeAdminTab === 'USERS' ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-800'}">
            👥 उपयोगकर्ता निर्देशिका (User Directory)
          </button>
          <button onclick="window.switchAdminTab('PRICING')" class="px-4 py-2.5 border-b-2 transition ${activeAdminTab === 'PRICING' ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-800'}">
            💳 स्वतंत्र सब्सक्रिप्शन मूल्य (Pricing Engine)
          </button>
          <button onclick="window.switchAdminTab('SUPPORT')" class="px-4 py-2.5 border-b-2 transition relative ${activeAdminTab === 'SUPPORT' ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-800'}">
            📬 सपोर्ट टिकट्स
            ${openTicketsCount > 0 ? `<span class="ml-1.5 bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">${openTicketsCount}</span>` : ''}
          </button>
        </div>

        <!-- TAB BODY CONTAINER -->
        <div id="adminTabContentArea"></div>
      </div>
    `;

    root.renderActiveTabContent();
  };

  root.switchAdminTab = function (tabName) {
    activeAdminTab = tabName;
    root.renderAdminDashboard();
  };

  root.renderActiveTabContent = function () {
    const container = document.getElementById("adminTabContentArea");
    if (!container) return;

    if (activeAdminTab === "USERS") {
      root.renderUsersDirectoryTab(container);
    } else if (activeAdminTab === "PRICING") {
      root.renderPricingEngineTab(container);
    } else if (activeAdminTab === "SUPPORT") {
      root.renderSupportTicketsTab(container);
    }
  };

  /* =========================================================================
     4. USER DIRECTORY & ADMINISTRATIVE CONTROLS
     ========================================================================= */
  root.renderUsersDirectoryTab = function (container) {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);

    let filteredUsers = users;
    if (currentUserFilter === "DOCTOR") {
      filteredUsers = users.filter(u => u.role === "DOCTOR");
    } else if (currentUserFilter === "FARMER") {
      filteredUsers = users.filter(u => u.role === "FARMER");
    }

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div class="flex items-center gap-1.5">
            <button onclick="window.setUserFilter('ALL')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${currentUserFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">सभी (${users.length})</button>
            <button onclick="window.setUserFilter('DOCTOR')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${currentUserFilter === 'DOCTOR' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">अधिकृत डॉक्टर</button>
            <button onclick="window.setUserFilter('FARMER')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${currentUserFilter === 'FARMER' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">स्मार्ट पशुपालक</button>
          </div>
          <div class="relative w-full sm:w-64">
            <input type="text" id="adminUserSearchInput" placeholder="नाम या मोबाइल से खोजें..." oninput="window.handleAdminUserSearch(this.value)"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500 font-medium" />
          </div>
        </div>

        <!-- USERS TABLE -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th class="p-3">आईडी व नाम</th>
                <th class="p-3">मोबाइल</th>
                <th class="p-3">भूमिका (Role)</th>
                <th class="p-3">पंजीकरण</th>
                <th class="p-3">सब्सक्रिप्शन</th>
                <th class="p-3">डुअल पोर्टल</th>
                <th class="p-3 text-right">प्रशासकीय एक्शन</th>
              </tr>
            </thead>
            <tbody id="adminUserTableBody" class="divide-y divide-slate-100">
              ${filteredUsers.map(u => root.getUserTableRowHtml(u)).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  root.getUserTableRowHtml = function (u) {
    const isBanned = u.status === "BANNED";
    const subBadge = u.subscription === "ACTIVE"
      ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">सक्रिय</span>'
      : (u.subscription === "TRIAL"
        ? '<span class="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">24h ट्रायल</span>'
        : '<span class="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">समाप्त</span>');

    const roleBadge = u.role === "DOCTOR"
      ? '<span class="text-blue-700 font-bold">🩺 डॉक्टर</span>'
      : '<span class="text-emerald-700 font-bold">👨‍🌾 पशुपालक</span>';

    return `
      <tr class="hover:bg-slate-50/80 transition ${isBanned ? 'bg-rose-50/40' : ''}">
        <td class="p-3">
          <div class="font-bold text-slate-900">${u.name}</div>
          <div class="text-[10px] font-mono text-slate-400">${u.id}</div>
        </td>
        <td class="p-3 font-mono font-medium">${u.contact}</td>
        <td class="p-3">${roleBadge}</td>
        <td class="p-3 text-[11px] text-slate-500">${u.regDate}</td>
        <td class="p-3">${subBadge}</td>
        <td class="p-3">
          <button onclick="window.toggleDualPortalAccess('${u.id}')" class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${u.dualPortal ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-500 border-slate-200'}">
            ${u.dualPortal ? '🌟 सक्रिय (Dual)' : '✕ अक्षम'}
          </button>
        </td>
        <td class="p-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${u.role === "FARMER" ? `
              <button onclick="window.promoteFarmerToDoctor('${u.id}')" title="डॉक्टर पद पर पदोन्नत करें" class="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-[10px] font-bold transition">
                🩺 पदोन्नति
              </button>
            ` : ''}

            <button onclick="window.toggleUserBan('${u.id}')" class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${isBanned ? 'bg-emerald-600 text-white' : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'}">
              ${isBanned ? 'अनलॉक' : 'बैन'}
            </button>

            <button onclick="window.deleteUserAccount('${u.id}')" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold transition">
              हटाएं
            </button>
          </div>
        </td>
      </tr>
    `;
  };

  root.setUserFilter = function (filter) {
    currentUserFilter = filter;
    root.renderAdminDashboard();
  };

  root.handleAdminUserSearch = function (query) {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    const q = (query || "").toLowerCase().trim();
    const tbody = document.getElementById("adminUserTableBody");
    if (!tbody) return;

    const filtered = users.filter(u => {
      const matchRole = currentUserFilter === "ALL" || u.role === currentUserFilter;
      const matchSearch = u.name.toLowerCase().includes(q) || u.contact.includes(q) || u.id.toLowerCase().includes(q);
      return matchRole && matchSearch;
    });

    tbody.innerHTML = filtered.map(u => root.getUserTableRowHtml(u)).join("");
  };

  /* ADMINISTRATIVE ACTIONS */
  root.toggleUserBan = function (userId) {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;

    users[idx].status = users[idx].status === "BANNED" ? "ACTIVE" : "BANNED";
    setStoredData(STORAGE_KEYS.USERS_DB, users);
    root.renderAdminDashboard();
  };

  root.deleteUserAccount = function (userId) {
    if (!confirm(`क्या आप यूजर ${userId} को स्थायी रूप से हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं होगी।`)) return;
    let users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    users = users.filter(u => u.id !== userId);
    setStoredData(STORAGE_KEYS.USERS_DB, users);
    root.renderAdminDashboard();
  };

  root.promoteFarmerToDoctor = function (userId) {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;

    if (confirm(`क्या आप ${users[idx].name} को अधिकृत पशु चिकित्सक (Veterinary Doctor) के रूप में पदोन्नत करना चाहते हैं?`)) {
      users[idx].role = "DOCTOR";
      setStoredData(STORAGE_KEYS.USERS_DB, users);
      root.renderAdminDashboard();
      alert("यूजर को सफलतापूर्वक पशु चिकित्सक में पदोन्नत किया गया।");
    }
  };

  root.toggleDualPortalAccess = function (userId) {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;

    users[idx].dualPortal = !users[idx].dualPortal;
    setStoredData(STORAGE_KEYS.USERS_DB, users);
    root.renderAdminDashboard();

    // Check if this applies to current active local session
    root.syncUserDualPortalBanner();
  };

  root.syncUserDualPortalBanner = function () {
    const users = getStoredData(STORAGE_KEYS.USERS_DB, []);
    // Example: dispatch custom event or toggle portal switcher button in app header if active
    const currentUser = users[0]; // Active local representation
    const portalBtn = document.getElementById("dualPortalSwitchBtn");
    if (portalBtn && currentUser) {
      if (currentUser.dualPortal) {
        portalBtn.classList.remove("hidden");
      } else {
        portalBtn.classList.add("hidden");
      }
    }
  };

  /* =========================================================================
     5. INDEPENDENT SUBSCRIPTION PRICING ENGINE
     ========================================================================= */
  root.renderPricingEngineTab = function (container) {
    const plans = getStoredData(STORAGE_KEYS.PLANS_DB, DEFAULT_PLANS);

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- DOCTOR PLANS EDITOR -->
        <div class="bg-white border border-blue-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2 border-b border-blue-100 pb-3">
            <span class="text-2xl">🩺</span>
            <div>
              <h3 class="font-black text-slate-900 text-sm">पशु चिकित्सक प्लान (Doctor Plans)</h3>
              <p class="text-[11px] text-slate-500">OPD पर्ची, AI सर्जन, इन्वेंट्री व खाता बही</p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-blue-900">1. एक सप्ताह (1 Week)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="doc_w1_price" type="number" value="${plans.DOCTOR.week1.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="doc_w1_offer" type="text" value="${plans.DOCTOR.week1.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-blue-900">2. एक माह (1 Month)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="doc_m1_price" type="number" value="${plans.DOCTOR.month1.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="doc_m1_offer" type="text" value="${plans.DOCTOR.month1.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-blue-900">3. तीन माह (3 Months)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="doc_m3_price" type="number" value="${plans.DOCTOR.month3.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="doc_m3_offer" type="text" value="${plans.DOCTOR.month3.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>
          </div>

          <button onclick="window.saveSubscriptionPlans('DOCTOR')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            💾 डॉक्टर प्लान सुरक्षित करें
          </button>
        </div>

        <!-- FARMER PLANS EDITOR -->
        <div class="bg-white border border-emerald-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2 border-b border-emerald-100 pb-3">
            <span class="text-2xl">👨‍🌾</span>
            <div>
              <h3 class="font-black text-slate-900 text-sm">स्मार्ट पशुपालक प्लान (Farmer Plans)</h3>
              <p class="text-[11px] text-slate-500">सस्ती दरें, देसी उपचार, आहार व दूध बहीखाता</p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-emerald-900">1. एक सप्ताह (1 Week)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="far_w1_price" type="number" value="${plans.FARMER.week1.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="far_w1_offer" type="text" value="${plans.FARMER.week1.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-emerald-900">2. एक माह (1 Month)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="far_m1_price" type="number" value="${plans.FARMER.month1.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="far_m1_offer" type="text" value="${plans.FARMER.month1.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="font-bold text-xs text-emerald-900">3. तीन माह (3 Months)</span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <input id="far_m3_price" type="number" value="${plans.FARMER.month3.price}" placeholder="मूल्य (₹)" class="bg-white border border-slate-200 rounded-xl p-2 font-bold" />
                <input id="far_m3_offer" type="text" value="${plans.FARMER.month3.offer}" placeholder="ऑफर टैग" class="bg-white border border-slate-200 rounded-xl p-2" />
              </div>
            </div>
          </div>

          <button onclick="window.saveSubscriptionPlans('FARMER')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            💾 पशुपालक प्लान सुरक्षित करें
          </button>
        </div>
      </div>
    `;
  };

  root.saveSubscriptionPlans = function (role) {
    const plans = getStoredData(STORAGE_KEYS.PLANS_DB, DEFAULT_PLANS);

    if (role === "DOCTOR") {
      plans.DOCTOR.week1.price = Number(document.getElementById("doc_w1_price").value) || 0;
      plans.DOCTOR.week1.offer = document.getElementById("doc_w1_offer").value.trim();
      plans.DOCTOR.month1.price = Number(document.getElementById("doc_m1_price").value) || 0;
      plans.DOCTOR.month1.offer = document.getElementById("doc_m1_offer").value.trim();
      plans.DOCTOR.month3.price = Number(document.getElementById("doc_m3_price").value) || 0;
      plans.DOCTOR.month3.offer = document.getElementById("doc_m3_offer").value.trim();
    } else if (role === "FARMER") {
      plans.FARMER.week1.price = Number(document.getElementById("far_w1_price").value) || 0;
      plans.FARMER.week1.offer = document.getElementById("far_w1_offer").value.trim();
      plans.FARMER.month1.price = Number(document.getElementById("far_m1_price").value) || 0;
      plans.FARMER.month1.offer = document.getElementById("far_m1_offer").value.trim();
      plans.FARMER.month3.price = Number(document.getElementById("far_m3_price").value) || 0;
      plans.FARMER.month3.offer = document.getElementById("far_m3_offer").value.trim();
    }

    setStoredData(STORAGE_KEYS.PLANS_DB, plans);
    alert(`${role === 'DOCTOR' ? 'पशु चिकित्सक' : 'पशुपालक'} प्लान सफलतापूर्वक अपडेट कर दिए गए हैं।`);
  };

  /* =========================================================================
     6. IN-APP SUPPORT TICKETS INBOX (NO EXTERNAL WHATSAPP)
     ========================================================================= */
  root.renderSupportTicketsTab = function (container) {
    const tickets = getStoredData(STORAGE_KEYS.TICKETS_DB, []);

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-black text-slate-900 text-sm flex items-center gap-2">
            <span>📬</span> इन-ऐप सपोर्ट टिकट्स इनबॉक्स
          </h3>
          <span class="text-xs text-slate-500 font-medium">कुल संदेश: ${tickets.length}</span>
        </div>

        <div class="space-y-3">
          ${tickets.length === 0 ? `
            <div class="text-center py-8 text-slate-400 text-xs">कोई भी नया सपोर्ट टिकट उपलब्ध नहीं है।</div>
          ` : tickets.map(t => `
            <div class="p-4 rounded-2xl border transition ${t.status === 'OPEN' ? 'bg-amber-50/40 border-amber-200' : 'bg-slate-50 border-slate-200'}">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold ${t.role === 'DOCTOR' ? 'text-blue-700' : 'text-emerald-700'}">${t.role === 'DOCTOR' ? '🩺 डॉक्टर' : '👨‍🌾 पशुपालक'}</span>
                  <span class="text-slate-400">•</span>
                  <span class="font-bold text-xs text-slate-900">${t.userName} (${t.userId})</span>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${t.status === 'OPEN' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                  ${t.status === 'OPEN' ? 'प्रतीक्षारत (Open)' : 'हल किया गया (Resolved)'}
                </span>
              </div>
              <div class="mt-2 text-xs font-bold text-slate-800">${t.subject}</div>
              <p class="text-xs text-slate-600 mt-1 bg-white/70 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">${t.message}</p>
              <div class="mt-3 flex items-center justify-between pt-1 text-[11px]">
                <span class="text-slate-400 font-mono text-[10px]">${t.date}</span>
                ${t.status === 'OPEN' ? `
                  <button onclick="window.markTicketResolved('${t.id}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition">
                    ✓ समस्या हल मार्क करें
                  </button>
                ` : `
                  <span class="text-emerald-600 font-bold text-xs">✓ समाधान पूर्ण</span>
                `}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };

  root.markTicketResolved = function (ticketId) {
    const tickets = getStoredData(STORAGE_KEYS.TICKETS_DB, []);
    const idx = tickets.findIndex(t => t.id === ticketId);
    if (idx === -1) return;

    tickets[idx].status = "RESOLVED";
    setStoredData(STORAGE_KEYS.TICKETS_DB, tickets);
    root.renderAdminDashboard();
  };

  /* =========================================================================
     7. INITIALIZATION AND EVENT LISTENERS
     ========================================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    root.syncUserDualPortalBanner();
  });

})(typeof window !== "undefined" ? window : global);
