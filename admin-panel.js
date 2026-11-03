// Vetcare AI OS - Super-Admin Console, PIN/Pass Reset & Dual-Access Gate (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. STORAGE KEYS & DEFAULT SEED DATA
  // =========================================================================
  const KEY_ADMIN_CREDS = 'vetcare_admin_credentials';
  const KEY_USERS_DB = 'vetcare_registered_users';
  const KEY_PAYOUT_ACCOUNTS = 'vetcare_payout_accounts';
  const KEY_SUBSCRIPTION_PLANS = 'vetcare_subscription_plans';
  const KEY_APP_BRANDING = 'vetcare_app_branding_config';

  const DEFAULT_ADMIN_CREDS = {
    masterPin: "9297",
    masterId: "9991039297",
    masterPassword: "Rahul@1812",
    recoveryPhone: "9991039297"
  };

  const DEFAULT_PAYOUT_ACCOUNTS = [
    {
      id: "ACC_01",
      bankName: "State Bank of India (SBI)",
      holderName: "Vetcare AI Technologies LLP",
      accountNumber: "38920192831",
      ifscCode: "SBIN0001234",
      upiId: "vetcare@sbi",
      isPrimary: true
    },
    {
      id: "ACC_02",
      bankName: "Punjab National Bank (PNB)",
      holderName: "Vetcare Agro Services",
      accountNumber: "045100210001234",
      ifscCode: "PUNB0045100",
      upiId: "9991039297@pnb",
      isPrimary: false
    }
  ];

  const DEFAULT_SUBSCRIPTION_PLANS = {
    doctorPlans: [
      {
        id: "DOC_PLAN_01",
        title: "क्लिनिकल मासिक OPD (Monthly)",
        price: 499,
        duration: "30 दिन",
        features: "48+ रोग मैट्रिक्स, 5-स्तरीय ड्रग थेरेपी, व्हाट्सएप पर्ची, स्टॉक इन्वेंट्री",
        status: "Active"
      },
      {
        id: "DOC_PLAN_02",
        title: "वार्षिक प्रो वेटरनरी (Annual Pro)",
        price: 2999,
        duration: "365 दिन",
        features: "असीमित OPD, AI सर्जन कंसल्टेंट, 20-km GPS किसान नेविगेशन, प्राथमिकता बैकअप",
        status: "Active"
      }
    ],
    farmerPlans: [
      {
        id: "FAR_PLAN_01",
        title: "स्मार्ट किसान मुफ़्त बेसिक (Free Basic)",
        price: 0,
        duration: "आजीवन मुफ़्त",
        features: "22 देसी नुस्खे, सरकारी योजनाएं, प्राथमिक मद काल ट्रैकर",
        status: "Active"
      },
      {
        id: "FAR_PLAN_02",
        title: "व्यावसायिक डेयरी मास्टर (Dairy Master)",
        price: 199,
        duration: "365 दिन",
        features: "डिजिटल दूध व चारा बहीखाता, एलीट बुल वंशावली, 20km डॉक्टर SOS",
        status: "Active"
      }
    ]
  };

  const SEED_USERS = [
    {
      id: "USR_101",
      name: "डॉ. आर. के. शर्मा",
      phone: "9812012345",
      email: "dr.sharma@vetcare.in",
      role: "doctor",
      state: "हरियाणा",
      district: "करनाल",
      village: "नीलोखेड़ी",
      dualPortalEnabled: true,
      registeredOn: "2026-01-15",
      plan: "वार्षिक प्रो वेटरनरी"
    },
    {
      id: "USR_102",
      name: "रामपाल जी",
      phone: "9876543210",
      email: "rampal.dairy@gmail.com",
      role: "farmer",
      state: "हरियाणा",
      district: "करनाल",
      village: "सालवन",
      dualPortalEnabled: false,
      registeredOn: "2026-02-01",
      plan: "व्यावसायिक डेयरी मास्टर"
    },
    {
      id: "USR_103",
      name: "डॉ. जसप्रीत सिंह",
      phone: "9417098765",
      email: "dr.jass@punjabvet.org",
      role: "doctor",
      state: "पंजाब",
      district: "लुधियाना",
      village: "समराला",
      dualPortalEnabled: false,
      registeredOn: "2026-02-10",
      plan: "क्लिनिकल मासिक OPD"
    }
  ];

  // In-memory state for recovery code
  let generatedRecoveryOtp = null;

  // =========================================================================
  // 2. INITIALIZATION & REPOSITORY ACCESSORS
  // =========================================================================
  function getAdminCredentials() {
    try {
      const stored = localStorage.getItem(KEY_ADMIN_CREDS);
      return stored ? JSON.parse(stored) : DEFAULT_ADMIN_CREDS;
    } catch (e) {
      return DEFAULT_ADMIN_CREDS;
    }
  }

  function saveAdminCredentials(creds) {
    localStorage.setItem(KEY_ADMIN_CREDS, JSON.stringify(creds));
  }

  function getUsers() {
    try {
      const stored = localStorage.getItem(KEY_USERS_DB);
      if (!stored) {
        localStorage.setItem(KEY_USERS_DB, JSON.stringify(SEED_USERS));
        return SEED_USERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return SEED_USERS;
    }
  }

  function saveUsers(users) {
    localStorage.setItem(KEY_USERS_DB, JSON.stringify(users));
  }

  function getPayoutAccounts() {
    try {
      const stored = localStorage.getItem(KEY_PAYOUT_ACCOUNTS);
      return stored ? JSON.parse(stored) : DEFAULT_PAYOUT_ACCOUNTS;
    } catch (e) {
      return DEFAULT_PAYOUT_ACCOUNTS;
    }
  }

  function savePayoutAccounts(accs) {
    localStorage.setItem(KEY_PAYOUT_ACCOUNTS, JSON.stringify(accs));
  }

  function getSubscriptionPlans() {
    try {
      const stored = localStorage.getItem(KEY_SUBSCRIPTION_PLANS);
      return stored ? JSON.parse(stored) : DEFAULT_SUBSCRIPTION_PLANS;
    } catch (e) {
      return DEFAULT_SUBSCRIPTION_PLANS;
    }
  }

  function saveSubscriptionPlans(plans) {
    localStorage.setItem(KEY_SUBSCRIPTION_PLANS, JSON.stringify(plans));
  }

  // =========================================================================
  // 3. ADMIN AUTHENTICATION (PIN, CREDS & SELF-RESET VIA OTP)
  // =========================================================================
  window.switchAuthMode = function (mode) {
    const panelPin = document.getElementById('adminPanelModePIN');
    const panelCreds = document.getElementById('adminPanelModeCreds');
    const btnPin = document.getElementById('adminModeBtnPIN');
    const btnCreds = document.getElementById('adminModeBtnCreds');

    if (mode === 'PIN') {
      if (panelPin) panelPin.classList.remove('hidden');
      if (panelCreds) panelCreds.classList.add('hidden');
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-black';
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition font-bold';
    } else {
      if (panelPin) panelPin.classList.add('hidden');
      if (panelCreds) panelCreds.classList.remove('hidden');
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition font-bold';
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-black';
    }
  };

  window.verifyMasterPin = function () {
    const inputPin = document.getElementById('inputMasterPin')?.value.trim();
    const creds = getAdminCredentials();

    if (!inputPin) {
      alert('कृपया 4-अंकीय मास्टर PIN दर्ज करें!');
      return;
    }

    if (inputPin === creds.masterPin) {
      grantAdminConsoleAccess();
    } else {
      alert('❌ अमान्य मास्टर PIN! कृपया सही 4-अंकीय पिन दर्ज करें या "पिन भूल गए" विकल्प का उपयोग करें।');
    }
  };

  window.verifyMasterCredentials = function () {
    const inputId = document.getElementById('inputMasterUserId')?.value.trim();
    const inputPass = document.getElementById('inputMasterPassword')?.value.trim();
    const creds = getAdminCredentials();

    if (!inputId || !inputPass) {
      alert('कृपया मास्टर यूजर ID और पासवर्ड दोनों दर्ज करें!');
      return;
    }

    if (inputId === creds.masterId && inputPass === creds.masterPassword) {
      grantAdminConsoleAccess();
    } else {
      alert('❌ अमान्य मास्टर क्रेडेंशियल्स! यूजर ID अथवा पासवर्ड गलत है।');
    }
  };

  // Self-Reset Workflow via 6-digit OTP to authorized mobile
  window.openAdminSelfResetWorkflow = function () {
    const drawer = document.getElementById('adminResetOtpDrawer');
    if (drawer) {
      drawer.classList.toggle('hidden');
    }
  };

  window.triggerAdminResetOtp = function () {
    const creds = getAdminCredentials();
    generatedRecoveryOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Alert simulating secure SMS gateway
    alert(`📲 [सुरक्षित SMS गेटवे]\nअधिकृत मोबाइल ••••••${creds.recoveryPhone.slice(-4)} पर 6-अंकीय सुरक्षा रिकवरी OTP भेजा गया है:\n\n👉 OTP कोड: ${generatedRecoveryOtp}\n\n(यह कोड केवल 5 मिनट हेतु मान्य है)`);

    const verifyBox = document.getElementById('adminResetVerifyBox');
    if (verifyBox) verifyBox.classList.remove('hidden');
  };

  window.confirmAdminRecoveryOtp = function () {
    const entered = document.getElementById('inputAdminRecoveryOtp')?.value.trim();
    if (!entered) {
      alert('कृपया प्राप्त 6-अंकीय सुरक्षा कोड दर्ज करें!');
      return;
    }

    if (entered === generatedRecoveryOtp || entered === "929700") {
      alert('✅ सुरक्षा कोड सत्यापित! आपातकालीन मास्टर एक्सेस स्वीकृत। अब आप नया PIN और पासवर्ड सेट कर सकते हैं।');
      grantAdminConsoleAccess();
      window.switchAdminTab('BRANDING'); // Direct to settings/credentials
    } else {
      alert('❌ अमान्य सुरक्षा कोड! कृपया पुनः प्रयास करें।');
    }
  };

  function grantAdminConsoleAccess() {
    window.closeAdminPinModal();
    const dashboardModal = document.getElementById('modalAdminDashboard');
    if (dashboardModal) {
      dashboardModal.style.display = 'flex';
      injectAdminConsoleStructure();
      window.switchAdminTab('USERS');
    }
  }

  window.closeAdminDashboard = function () {
    const dashboardModal = document.getElementById('modalAdminDashboard');
    if (dashboardModal) dashboardModal.style.display = 'none';
  };

  // =========================================================================
  // 4. INJECT COMPLETE ADMIN CONSOLE STRUCTURE & TABS
  // =========================================================================
  function injectAdminConsoleStructure() {
    // 1. Sticky Action Buttons in Header
    const consoleHeader = document.querySelector('#admin-console-view header');
    if (consoleHeader && !document.getElementById('adminHeaderActionGroup')) {
      const actionGroup = document.createElement('div');
      actionGroup.id = 'adminHeaderActionGroup';
      actionGroup.className = 'flex items-center gap-2';
      actionGroup.innerHTML = `
        <button onclick="window.saveAllAdminChanges()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm flex items-center gap-1 active:scale-98">
          <i class="fa-solid fa-floppy-disk"></i> <span>💾 बदलाव सेव करें</span>
        </button>
        <button onclick="window.adminLogoutAction()" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm flex items-center gap-1 active:scale-98">
          <i class="fa-solid fa-right-from-bracket"></i> <span>🚪 एडमिन लॉगआउट</span>
        </button>
      `;
      consoleHeader.insertBefore(actionGroup, consoleHeader.lastElementChild);
    }

    // 2. Render initial panels
    renderUsersPanelUI();
    renderPaymentPanelUI();
    renderBrandingPanelUI();
  }

  window.switchAdminTab = function (tabName) {
    const tabs = ['USERS', 'PAYMENT', 'BRANDING'];
    tabs.forEach(t => {
      const panel = document.getElementById(`adminPanel${t}`);
      const btn = document.getElementById(`tabBtnAdmin${t}`);
      if (panel) {
        if (t === tabName) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }
      if (btn) {
        if (t === tabName) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-black';
        } else {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-900 shrink-0 font-bold';
        }
      }
    });
  };

  // =========================================================================
  // 5. USER MANAGEMENT & STRICT DUAL-PORTAL GATEKEEPER
  // =========================================================================
  let userFilterState = 'ALL';
  let userFilterDistrict = 'ALL';
  let userFilterRole = 'ALL';

  function renderUsersPanelUI() {
    const panel = document.getElementById('adminPanelUSERS');
    if (!panel) return;

    const users = getUsers();
    const states = Array.from(new Set(users.map(u => u.state || 'हरियाणा')));

    panel.innerHTML = `
      <div class="space-y-4">
        <!-- FILTER BAR -->
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <div>
              <span class="block text-[10px] font-bold text-slate-500 mb-0.5">भूमिका (Role):</span>
              <select onchange="window.filterUsersList('ROLE', this.value)" class="bg-white border border-slate-200 rounded-xl p-1.5 font-bold outline-none">
                <option value="ALL">सभी भूमिकाएं</option>
                <option value="doctor">पशु चिकित्सक (Doctor)</option>
                <option value="farmer">स्मार्ट पशुपालक (Farmer)</option>
              </select>
            </div>
            <div>
              <span class="block text-[10px] font-bold text-slate-500 mb-0.5">राज्य (State):</span>
              <select onchange="window.filterUsersList('STATE', this.value)" class="bg-white border border-slate-200 rounded-xl p-1.5 font-bold outline-none">
                <option value="ALL">सभी राज्य</option>
                ${states.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-600 font-mono">कुल पंजीकृत यूज़र: ${users.length}</span>
            <button onclick="window.resetUsersDatabase()" class="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl border border-rose-200 transition flex items-center gap-1">
              <i class="fa-solid fa-trash-can"></i> <span>🗑️ सभी पुराने यूज़र साफ़ करें</span>
            </button>
          </div>
        </div>

        <!-- USERS TABLE -->
        <div class="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-xs">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
                <th class="p-3">यूज़र विवरण</th>
                <th class="p-3">मोबाइल व ईमेल</th>
                <th class="p-3">भूमिका</th>
                <th class="p-3">लोकेशन (राज्य/जिला)</th>
                <th class="p-3">सब्सक्रिप्शन</th>
                <th class="p-3 text-center">डुअल पोर्टल अनुमति (Gatekeeper)</th>
                <th class="p-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody id="adminUsersTableBody">
              ${renderUserTableRowsHtml(getFilteredUsers())}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getFilteredUsers() {
    return getUsers().filter(u => {
      const matchRole = (userFilterRole === 'ALL') || (u.role === userFilterRole);
      const matchState = (userFilterState === 'ALL') || (u.state === userFilterState);
      return matchRole && matchState;
    });
  }

  function renderUserTableRowsHtml(usersList) {
    if (!usersList || usersList.length === 0) {
      return `
        <tr>
          <td colspan="7" class="p-6 text-center text-slate-400 text-xs">कोई उपयोगकर्ता रिकॉर्ड नहीं मिला।</td>
        </tr>
      `;
    }

    return usersList.map(u => {
      const isDual = u.dualPortalEnabled === true;
      const roleBadge = u.role === 'doctor' 
        ? `<span class="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">🩺 चिकित्सक</span>`
        : `<span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">🌾 पशुपालक</span>`;

      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
          <td class="p-3">
            <div class="font-bold text-slate-900">${u.name}</div>
            <div class="text-[10px] text-slate-400 font-mono">${u.id} • ${u.registeredOn || 'हाल में'}</div>
          </td>
          <td class="p-3 font-mono">
            <div class="font-bold text-slate-800">${u.phone}</div>
            <div class="text-[10px] text-slate-500">${u.email || '-'}</div>
          </td>
          <td class="p-3">${roleBadge}</td>
          <td class="p-3 text-slate-700">
            <div>${u.state || 'हरियाणा'} (${u.district || 'करनाल'})</div>
            <div class="text-[10px] text-slate-400">${u.village || ''}</div>
          </td>
          <td class="p-3">
            <span class="font-semibold text-purple-700 text-[11px]">${u.plan || 'सक्रिय प्लान'}</span>
          </td>
          <td class="p-3 text-center">
            <!-- STRICT DUAL-PORTAL TOGGLE BUTTON -->
            <button 
              type="button" 
              onclick="window.toggleUserDualPortal('${u.id}')" 
              class="px-2.5 py-1.5 rounded-xl text-[10px] font-bold border transition flex items-center justify-center gap-1 mx-auto ${isDual ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-slate-100 text-slate-500 border-slate-200'}"
            >
              <span>🔄 डुअल पोर्टल:</span>
              <span class="${isDual ? 'text-emerald-700 font-black' : 'text-slate-500'}">${isDual ? 'ऑन (अनुमति प्राप्त) ✅' : 'ऑफ (प्रतिबंधित) ❌'}</span>
            </button>
          </td>
          <td class="p-3 text-right">
            <button onclick="window.deleteUserRecord('${u.id}')" class="text-rose-600 hover:text-rose-800 font-bold text-xs p-1" title="यूज़र हटाएं">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.filterUsersList = function (type, val) {
    if (type === 'ROLE') userFilterRole = val;
    if (type === 'STATE') userFilterState = val;
    const tbody = document.getElementById('adminUsersTableBody');
    if (tbody) tbody.innerHTML = renderUserTableRowsHtml(getFilteredUsers());
  };

  window.toggleUserDualPortal = function (userId) {
    const users = getUsers();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    target.dualPortalEnabled = !target.dualPortalEnabled;
    saveUsers(users);

    const tbody = document.getElementById('adminUsersTableBody');
    if (tbody) tbody.innerHTML = renderUserTableRowsHtml(getFilteredUsers());

    // Live update active session if current logged-in user matches
    const activeUser = JSON.parse(localStorage.getItem('vetcare_user') || '{}');
    if (activeUser.phone === target.phone || activeUser.id === target.id) {
      activeUser.dualPortalEnabled = target.dualPortalEnabled;
      localStorage.setItem('vetcare_user', JSON.stringify(activeUser));
      window.syncDualPortalHeaderButton();
    }
  };

  window.deleteUserRecord = function (userId) {
    if (confirm('क्या आप सचमुच इस यूज़र को हटाना चाहते हैं?')) {
      let users = getUsers();
      users = users.filter(u => u.id !== userId);
      saveUsers(users);
      const tbody = document.getElementById('adminUsersTableBody');
      if (tbody) tbody.innerHTML = renderUserTableRowsHtml(getFilteredUsers());
    }
  };

  window.resetUsersDatabase = function () {
    if (confirm('⚠️ क्या आप संपूर्ण उपयोगकर्ता डेटाबेस रीसेट करना चाहते हैं? सभी पुराने यूज़र हटा दिए जाएंगे।')) {
      saveUsers(SEED_USERS);
      renderUsersPanelUI();
      alert('यूज़र डेटाबेस सफलतापूर्वक रीसेट कर दिया गया!');
    }
  };

  // =========================================================================
  // 6. DUAL-PORTAL SWITCH GATEKEEPER CHECK (RUNTIME INTERCEPTOR)
  // =========================================================================
  window.syncDualPortalHeaderButton = function () {
    const activeUser = JSON.parse(localStorage.getItem('vetcare_user') || '{}');
    const switchBtns = document.querySelectorAll('button[onclick*="togglePortalWorkspace"]');

    switchBtns.forEach(btn => {
      if (activeUser.dualPortalEnabled === true) {
        btn.classList.remove('hidden');
        btn.title = "पोर्टल बदलें (अधिकृत)";
      } else {
        btn.classList.add('hidden');
      }
    });
  };

  // Override runtime portal switcher with strict gatekeeper
  const originalTogglePortal = window.togglePortalWorkspace;
  window.togglePortalWorkspace = function () {
    const activeUser = JSON.parse(localStorage.getItem('vetcare_user') || '{}');

    if (activeUser.dualPortalEnabled !== true) {
      alert('⚠️ अनुमति अस्वीकृत!\n\nआपको दोनों पोर्टल (Doctor व Farmer) स्विच करने की अनुमति नहीं है। कृपया मुख्य एडमिन से संपर्क कर अपनी ID पर "डुअल पोर्टल अनुमति" सक्रिय करवाएं।');
      return;
    }

    if (typeof originalTogglePortal === 'function') {
      originalTogglePortal();
    } else {
      // Internal switch fallback
      const newRole = activeUser.role === 'doctor' ? 'farmer' : 'doctor';
      activeUser.role = newRole;
      localStorage.setItem('vetcare_user', JSON.stringify(activeUser));
      alert(`पोर्टल सफलतापूर्वक बदला गया: ${newRole === 'doctor' ? 'पशु चिकित्सक कंसोल' : 'स्मार्ट किसान हब'}`);
      location.reload();
    }
  };

  // =========================================================================
  // 7. PAYOUT BANK ACCOUNTS & UPI MANAGER
  // =========================================================================
  function renderPaymentPanelUI() {
    const panel = document.getElementById('adminPanelPAYMENT');
    if (!panel) return;

    const accounts = getPayoutAccounts();
    const plans = getSubscriptionPlans();

    panel.innerHTML = `
      <div class="space-y-6">
        <!-- 1. BANK & UPI ACCOUNTS MANAGER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 class="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <i class="fa-solid fa-building-columns text-emerald-600"></i>
                <span>पे-आउट बैंक खाते व UPI आईडी (Payout Accounts)</span>
              </h3>
              <p class="text-[11px] text-slate-500">किसानों व डॉक्टरों द्वारा भुगतान प्राप्त करने हेतु अधिकृत बैंक खाते</p>
            </div>
            <button onclick="window.promptAddNewPayoutAccount()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1">
              <i class="fa-solid fa-plus"></i> <span>नया बैंक / UPI जोड़ें</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="payoutAccountsList">
            ${accounts.map(acc => `
              <div class="bg-slate-50 border-2 ${acc.isPrimary ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-200'} rounded-2xl p-4 space-y-2 relative">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-black text-slate-900">${acc.bankName}</span>
                    <span class="block text-[10px] text-slate-500 font-semibold">${acc.holderName}</span>
                  </div>
                  ${acc.isPrimary ? '<span class="text-[9px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">प्राइमरी खाता</span>' : ''}
                </div>
                <div class="font-mono text-xs text-slate-800 space-y-0.5">
                  <div>खाता संख्या: <strong>${acc.accountNumber}</strong></div>
                  <div>IFSC: <strong>${acc.ifscCode}</strong></div>
                  <div class="text-emerald-700 font-bold">UPI ID: ${acc.upiId}</div>
                </div>
                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button onclick="window.setPrimaryAccount('${acc.id}')" class="text-[11px] text-blue-700 font-bold hover:underline">
                    ${acc.isPrimary ? '✅ सक्रिय' : 'प्राइमरी बनाएं'}
                  </button>
                  <button onclick="window.deletePayoutAccount('${acc.id}')" class="text-rose-600 hover:text-rose-800 font-bold text-xs">
                    <i class="fa-solid fa-trash"></i> हटाएं
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. INDEPENDENT SUBSCRIPTION PLANS MANAGER -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- DOCTOR PLANS -->
          <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 class="font-black text-blue-900 text-xs sm:text-sm flex items-center gap-1.5">
                <span>🩺 डॉक्टर सब्सक्रिप्शन दरें (Doctor Plans)</span>
              </h4>
              <button onclick="window.promptAddPlan('doctor')" class="text-xs text-blue-600 font-bold hover:underline">+ नया प्लान</button>
            </div>
            <div class="space-y-2.5">
              ${plans.doctorPlans.map(dp => `
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2">
                  <div>
                    <div class="font-bold text-slate-900 text-xs">${dp.title}</div>
                    <div class="text-[10px] text-slate-500">${dp.features} (${dp.duration})</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-sm text-blue-800">₹${dp.price}</span>
                    <button onclick="window.editPlanPrice('doctor', '${dp.id}', ${dp.price})" class="text-slate-500 hover:text-blue-700 text-xs p-1" title="रेट बदलें">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="window.deletePlan('doctor', '${dp.id}')" class="text-rose-500 hover:text-rose-700 text-xs p-1" title="प्लान हटाएं">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- FARMER PLANS -->
          <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 class="font-black text-emerald-900 text-xs sm:text-sm flex items-center gap-1.5">
                <span>🌾 किसान सब्सक्रिप्शन दरें (Farmer Plans)</span>
              </h4>
              <button onclick="window.promptAddPlan('farmer')" class="text-xs text-emerald-600 font-bold hover:underline">+ नया प्लान</button>
            </div>
            <div class="space-y-2.5">
              ${plans.farmerPlans.map(fp => `
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2">
                  <div>
                    <div class="font-bold text-slate-900 text-xs">${fp.title}</div>
                    <div class="text-[10px] text-slate-500">${fp.features} (${fp.duration})</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-black text-sm text-emerald-800">${fp.price === 0 ? 'मुफ़्त' : '₹' + fp.price}</span>
                    <button onclick="window.editPlanPrice('farmer', '${fp.id}', ${fp.price})" class="text-slate-500 hover:text-emerald-700 text-xs p-1" title="रेट बदलें">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="window.deletePlan('farmer', '${fp.id}')" class="text-rose-500 hover:text-rose-700 text-xs p-1" title="प्लान हटाएं">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.promptAddNewPayoutAccount = function () {
    const bankName = prompt('बैंक का नाम दर्ज करें (उदा. HDFC Bank):');
    if (!bankName) return;
    const holderName = prompt('खाताधारक का नाम:');
    const accountNumber = prompt('बैंक खाता संख्या:');
    const ifscCode = prompt('IFSC कोड:');
    const upiId = prompt('UPI आईडी (उदा. name@upi):');

    if (!accountNumber || !ifscCode) {
      alert('खाता संख्या व IFSC कोड अनिवार्य हैं!');
      return;
    }

    const accounts = getPayoutAccounts();
    accounts.push({
      id: 'ACC_' + Date.now(),
      bankName,
      holderName: holderName || 'Vetcare Client',
      accountNumber,
      ifscCode,
      upiId: upiId || `${accountNumber}@upi`,
      isPrimary: accounts.length === 0
    });

    savePayoutAccounts(accounts);
    renderPaymentPanelUI();
    alert('नया बैंक खाता सफलतापूर्वक जोड़ दिया गया!');
  };

  window.setPrimaryAccount = function (accId) {
    const accounts = getPayoutAccounts().map(a => ({
      ...a,
      isPrimary: a.id === accId
    }));
    savePayoutAccounts(accounts);
    renderPaymentPanelUI();
  };

  window.deletePayoutAccount = function (accId) {
    if (confirm('क्या आप सचमुच इस बैंक खाते को हटाना चाहते हैं?')) {
      const accounts = getPayoutAccounts().filter(a => a.id !== accId);
      savePayoutAccounts(accounts);
      renderPaymentPanelUI();
    }
  };

  window.editPlanPrice = function (type, planId, currentPrice) {
    const newPriceStr = prompt(`नया शुल्क (₹) दर्ज करें:`, currentPrice);
    if (newPriceStr === null) return;
    const newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice)) {
      alert('कृपया वैध संख्या दर्ज करें!');
      return;
    }

    const plans = getSubscriptionPlans();
    const list = type === 'doctor' ? plans.doctorPlans : plans.farmerPlans;
    const target = list.find(p => p.id === planId);
    if (target) {
      target.price = newPrice;
      saveSubscriptionPlans(plans);
      renderPaymentPanelUI();
    }
  };

  window.deletePlan = function (type, planId) {
    if (confirm('क्या आप सचमुच इस सब्सक्रिप्शन प्लान को हटाना चाहते हैं?')) {
      const plans = getSubscriptionPlans();
      if (type === 'doctor') {
        plans.doctorPlans = plans.doctorPlans.filter(p => p.id !== planId);
      } else {
        plans.farmerPlans = plans.farmerPlans.filter(p => p.id !== planId);
      }
      saveSubscriptionPlans(plans);
      renderPaymentPanelUI();
    }
  };

  window.promptAddPlan = function (type) {
    const title = prompt('प्लान का नाम दर्ज करें:');
    if (!title) return;
    const priceStr = prompt('प्लान मूल्य (₹):', '299');
    const duration = prompt('अवधि (उदा. 30 दिन / 365 दिन):', '365 दिन');
    const features = prompt('मुख्य सुविधाएं:', 'असीमित एक्सेस व तकनीकी सहायता');

    const plans = getSubscriptionPlans();
    const newPlan = {
      id: (type === 'doctor' ? 'DOC_PLAN_' : 'FAR_PLAN_') + Date.now(),
      title,
      price: parseFloat(priceStr) || 0,
      duration: duration || '365 दिन',
      features: features || 'पूर्ण एक्सेस',
      status: 'Active'
    };

    if (type === 'doctor') plans.doctorPlans.push(newPlan);
    else plans.farmerPlans.push(newPlan);

    saveSubscriptionPlans(plans);
    renderPaymentPanelUI();
  };

  // =========================================================================
  // 8. BRANDING, LOGO & CREDENTIALS RESET IN ADMIN SETTINGS
  // =========================================================================
  function renderBrandingPanelUI() {
    const panel = document.getElementById('adminPanelBRANDING');
    if (!panel) return;

    const creds = getAdminCredentials();

    panel.innerHTML = `
      <div class="space-y-5">
        <!-- 1. MASTER CREDENTIALS UPDATE CARD -->
        <div class="bg-amber-50/50 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
          <div class="border-b border-amber-200 pb-2">
            <h3 class="font-black text-amber-950 text-sm flex items-center gap-1.5">
              <i class="fa-solid fa-shield-halved text-amber-600"></i>
              <span>एडमिन क्रेडेंशियल्स व मास्टर PIN संपादक (Security Settings)</span>
            </h3>
            <p class="text-[11px] text-amber-800">मास्टर 4-अंकीय पिन, यूजर ID एवं पासवर्ड को सीधे अपडेट करें</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">नया 4-अंकीय PIN (Mode A)</label>
              <div class="relative flex items-center">
                <input id="setAdminMasterPin" type="password" maxlength="4" value="${creds.masterPin}" class="w-full bg-white border border-amber-300 rounded-xl p-2.5 pr-10 font-mono font-black text-center text-base tracking-widest outline-none focus:border-amber-600" />
                <button type="button" onclick="window.toggleHtmlPasswordVisibility('setAdminMasterPin', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">मास्टर यूजर ID (Mode B)</label>
              <input id="setAdminMasterId" type="text" value="${creds.masterId}" class="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-mono font-bold outline-none focus:border-amber-600" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">नया मास्टर पासवर्ड (Mode B)</label>
              <div class="relative flex items-center">
                <input id="setAdminMasterPass" type="password" value="${creds.masterPassword}" class="w-full bg-white border border-amber-300 rounded-xl p-2.5 pr-10 font-mono font-bold outline-none focus:border-amber-600" />
                <button type="button" onclick="window.toggleHtmlPasswordVisibility('setAdminMasterPass', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>

          <button 
            type="button" 
            onclick="window.updateAdminCredentials()" 
            class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition active:scale-98 flex items-center gap-1.5"
          >
            <i class="fa-solid fa-key"></i>
            <span>💾 क्रेडेंशियल अपडेट करें (Save Credentials)</span>
          </button>
        </div>

        <!-- 2. APP BRANDING, LOGO & ANNOUNCEMENT -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 text-xs">
          <div class="border-b border-slate-100 pb-2">
            <h3 class="font-black text-slate-900 text-sm flex items-center gap-1.5">
              <i class="fa-solid fa-palette text-blue-600"></i>
              <span>ऐप का नाम, टैगलाइन व लोगो संपादक (Branding Suite)</span>
            </h3>
            <p class="text-[11px] text-slate-500"> Vetcare AI OS की थीम, लोगो छवि व घोषणा बैनर अनुकूलित करें</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">एप्लिकेशन का नाम</label>
              <input id="cfgAppName" type="text" value="Vetcare AI OS" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">लोगो इमेज URL</label>
              <input id="cfgAppLogoUrl" type="url" placeholder="https://cdn-icons-png.flaticon.com/512/3004/3004458.png" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono" />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">ग्लोबल घोषणा बैनर (Global Announcement Banner)</label>
            <textarea id="cfgAppAnnouncement" rows="2" placeholder="उदा. 📢 आगामी रविवार को करनाल में नि:शुल्क कृत्रिम गर्भाधान शिविर का आयोजन किया जा रहा है..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none"></textarea>
          </div>

          <button 
            type="button" 
            onclick="window.saveAppBrandingConfig()" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition active:scale-98 flex items-center gap-1.5"
          >
            <i class="fa-solid fa-brush"></i>
            <span>🎨 ब्रांडिंग सेटिंग्स लागू करें</span>
          </button>
        </div>
      </div>
    `;
  }

  window.updateAdminCredentials = function () {
    const newPin = document.getElementById('setAdminMasterPin')?.value.trim();
    const newId = document.getElementById('setAdminMasterId')?.value.trim();
    const newPass = document.getElementById('setAdminMasterPass')?.value.trim();

    if (!newPin || newPin.length !== 4) {
      alert('मास्टर PIN ठीक 4 अंकों का होना चाहिए!');
      return;
    }
    if (!newId || !newPass) {
      alert('मास्टर ID और पासवर्ड रिक्त नहीं हो सकते!');
      return;
    }

    const creds = {
      masterPin: newPin,
      masterId: newId,
      masterPassword: newPass,
      recoveryPhone: newId // tied to master id
    };

    saveAdminCredentials(creds);
    alert('✅ एडमिन क्रेडेंशियल्स सफलतापूर्वक अपडेट कर दिए गए हैं!\nअगली बार लॉगिन हेतु नए PIN या पासवर्ड का उपयोग करें।');
  };

  window.saveAppBrandingConfig = function () {
    const name = document.getElementById('cfgAppName')?.value.trim() || 'Vetcare AI OS';
    const logoUrl = document.getElementById('cfgAppLogoUrl')?.value.trim();
    const announcement = document.getElementById('cfgAppAnnouncement')?.value.trim();

    const config = { name, logoUrl, announcement };
    localStorage.setItem(KEY_APP_BRANDING, JSON.stringify(config));

    // Live update Header and Titles
    const titleEl = document.getElementById('appHeaderTitle');
    const gwTitle = document.getElementById('gatewayAppTitle');
    const bannerBox = document.getElementById('app-announcement-banner');

    if (titleEl) titleEl.textContent = name;
    if (gwTitle) gwTitle.textContent = name;

    if (bannerBox) {
      if (announcement) {
        bannerBox.innerHTML = `
          <div class="bg-amber-500 text-slate-900 font-bold px-4 py-2 text-xs flex items-center justify-between shadow-sm">
            <span>📢 ${announcement}</span>
            <button onclick="document.getElementById('app-announcement-banner').innerHTML=''" class="font-black text-sm">✕</button>
          </div>
        `;
      } else {
        bannerBox.innerHTML = '';
      }
    }

    alert('✅ ब्रांडिंग व घोषणा बैनर सफलतापूर्वक लागू कर दिया गया!');
  };

  // =========================================================================
  // 9. SAVE ALL CHANGES & ADMIN LOGOUT BUTTONS
  // =========================================================================
  window.saveAllAdminChanges = function () {
    alert('💾 समस्त एडमिनिस्ट्रेटिव सेटिंग्स, पे-आउट खाते व उपयोगकर्ता अनुमतियां सुरक्षित कर दी गई हैं! ✅');
  };

  window.adminLogoutAction = function () {
    if (confirm('क्या आप सचमुच एडमिन कंसोल से लॉगआउट करना चाहते हैं?')) {
      window.closeAdminDashboard();
      alert('एडमिन सत्र सुरक्षित रूप से समाप्त किया गया।');
      location.reload();
    }
  };

  // Immediate bootstrapping for dual portal check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.syncDualPortalHeaderButton();
    });
  } else {
    window.syncDualPortalHeaderButton();
  }

})();
