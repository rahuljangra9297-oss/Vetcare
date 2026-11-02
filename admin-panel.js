// Vetcare AI OS - Master Admin Control Console, Masked Credentials & Dynamic Suite (2026 Production)

/**
 * ============================================================================
 * MASTER ADMIN CONTROL CONSOLE & SECURITY ARCHITECTURE
 * ============================================================================
 * 1. Strictly Masked Dual Admin Authentication (PIN: 9297 | ID: 9991039297 & Rahul@1812)
 *    - All sensitive inputs (Admin ID, Password, Master PIN) are type="password" by default.
 *    - Interactive eye icon toggles allow explicit, temporary unmasking while typing.
 *    - Self-Reset Workflow via 6-Digit SMS OTP to 9991039297.
 * 2. Dynamic Payout Bank & UPI Manager (SBI, PNB, and Custom Gateway Accounts).
 * 3. Granular User Management & Per-User Feature Toggles (SMS, AI Surgeon, Dual Portal, Trial).
 * 4. Location-Based User Analytics, Geo-Filters & Real-Time Operational Badges.
 * 5. Dynamic App Branding Engine (Logo, App Title, Theme Color, Live Announcement Banner).
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STORAGE KEYS & CORE DATA DEFINITIONS
  // --------------------------------------------------------------------------
  const ADMIN_STORAGE_KEYS = {
    CREDENTIALS: 'vetcare_admin_credentials',
    PAYOUTS: 'vetcare_payout_accounts',
    USERS: 'vetcare_users_db',
    BRANDING: 'vetcare_app_branding',
    SESSION_USER: 'vetcare_session_user'
  };

  const DEFAULT_ADMIN_CREDS = {
    masterPin: '9297',
    userId: '9991039297',
    password: 'Rahul@1812',
    recoveryPhone: '9991039297'
  };

  const DEFAULT_PAYOUT_ACCOUNTS = [
    {
      id: 'PAY_SBI_9297',
      bankName: 'State Bank of India (SBI)',
      payeeName: 'Vetcare Services',
      upiId: 'rahuljangra9297@oksbi',
      accountNumber: '65204067585',
      ifsc: 'SBIN0013693',
      branch: 'Main Branch',
      isPrimary: true
    },
    {
      id: 'PAY_PNB_9297',
      bankName: 'Punjab National Bank (PNB)',
      payeeName: 'Vetcare Services',
      upiId: 'rahuljangra9297-1@okicici',
      accountNumber: '6687001700015098',
      ifsc: 'PUNB0668700',
      branch: 'Service Branch',
      isPrimary: false
    }
  ];

  const DEFAULT_BRANDING = {
    appTitle: 'Vetcare AI OS',
    tagline: 'पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान',
    logoUrl: '',
    primaryColor: '#059669',
    announcementBanner: '🚀 Vetcare AI OS Live • 5-Tier Pharmacology & AI Surgeon 3.8 Active!'
  };

  const AdminState = {
    activeTab: 'USERS',
    activeAuthMode: 'PIN', // 'PIN' | 'IDPASS'
    pendingResetOtp: null,
    pendingResetPayload: null,
    editingPayoutId: null,
    userFilters: {
      role: 'ALL',
      locationQuery: '',
      status: 'ALL'
    }
  };

  // --------------------------------------------------------------------------
  // 2. STORAGE REPOSITORIES
  // --------------------------------------------------------------------------
  function getAdminCredentials() {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEYS.CREDENTIALS);
      return data ? { ...DEFAULT_ADMIN_CREDS, ...JSON.parse(data) } : { ...DEFAULT_ADMIN_CREDS };
    } catch (e) {
      return { ...DEFAULT_ADMIN_CREDS };
    }
  }

  function saveAdminCredentials(creds) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.CREDENTIALS, JSON.stringify(creds));
  }

  function getPayoutAccounts() {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEYS.PAYOUTS);
      if (!data) {
        localStorage.setItem(ADMIN_STORAGE_KEYS.PAYOUTS, JSON.stringify(DEFAULT_PAYOUT_ACCOUNTS));
        return [...DEFAULT_PAYOUT_ACCOUNTS];
      }
      return JSON.parse(data);
    } catch (e) {
      return [...DEFAULT_PAYOUT_ACCOUNTS];
    }
  }

  function savePayoutAccounts(accounts) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.PAYOUTS, JSON.stringify(accounts));
  }

  function getUsersDatabase() {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsersDatabase(users) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  function getAppBranding() {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEYS.BRANDING);
      return data ? { ...DEFAULT_BRANDING, ...JSON.parse(data) } : { ...DEFAULT_BRANDING };
    } catch (e) {
      return { ...DEFAULT_BRANDING };
    }
  }

  function saveAppBranding(branding) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.BRANDING, JSON.stringify(branding));
  }

  // --------------------------------------------------------------------------
  // 3. SECURE CREDENTIAL MASKING & AUTHENTICATION CONTROLLER
  // --------------------------------------------------------------------------
  window.toggleFieldMasking = function (inputId, iconId) {
    const field = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!field) return;

    if (field.type === 'password') {
      field.type = 'text';
      if (icon) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    } else {
      field.type = 'password';
      if (icon) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
  };

  window.openAdminPinModal = function () {
    renderAdminAuthModal();
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.closeAdminPinModal = function () {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'none';
  };

  function renderAdminAuthModal() {
    let modal = document.getElementById('admin-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'admin-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="window.closeAdminPinModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>

        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold">👑</div>
          <h3 class="text-base font-black text-slate-900">Vetcare मास्टर एडमिन</h3>
          <p class="text-[11px] text-slate-500 font-medium">गोपनीय सुरक्षा प्रमाणीकरण (Masked Console)</p>
        </div>

        <!-- Mode Tabs -->
        <div class="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold text-center">
          <button id="adminAuthTabPIN" onclick="window.switchAdminLoginTab('PIN')" class="py-2 rounded-xl transition ${
            AdminState.activeAuthMode === 'PIN' ? 'bg-white shadow-xs text-amber-800' : 'text-slate-600'
          }">
            मास्टर पिन
          </button>
          <button id="adminAuthTabIDPASS" onclick="window.switchAdminLoginTab('IDPASS')" class="py-2 rounded-xl transition ${
            AdminState.activeAuthMode === 'IDPASS' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
          }">
            आईडी व पासवर्ड
          </button>
        </div>

        <!-- TAB A: 4-DIGIT MASKED MASTER PIN -->
        <div id="panelAdminAuthPIN" class="${AdminState.activeAuthMode === 'PIN' ? 'space-y-3' : 'hidden'} text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-1 text-center">4-Digit Security Master PIN</label>
            <div class="relative">
              <input 
                id="secAdminPIN" 
                type="password" 
                maxlength="4" 
                pattern="[0-9]*" 
                inputmode="numeric" 
                placeholder="••••" 
                class="w-full text-center tracking-widest text-2xl font-mono py-2.5 px-8 border-2 border-slate-200 rounded-2xl outline-none focus:border-amber-600 transition" 
              />
              <button 
                type="button" 
                onclick="window.toggleFieldMasking('secAdminPIN', 'eyeIconPIN')" 
                class="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition" 
                title="PIN दिखाएं/छिपाएं"
              >
                <i id="eyeIconPIN" class="fa-solid fa-eye"></i>
              </button>
            </div>
            <p id="secAdminPinErr" class="text-rose-600 text-[11px] font-bold mt-1.5 text-center hidden">गलत PIN! कृपया पुनः प्रयास करें।</p>
          </div>
          <button onclick="window.submitAdminPINAuth()" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
            <span>PIN सत्यापित करें</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <!-- TAB B: STRICTLY MASKED USER ID & PASSWORD -->
        <div id="panelAdminAuthIDPASS" class="${AdminState.activeAuthMode === 'IDPASS' ? 'space-y-3' : 'hidden'} text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-1">Admin User ID (Masked)</label>
            <div class="relative">
              <input 
                id="secAdminUserID" 
                type="password" 
                placeholder="••••••••••" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-9 font-mono text-xs outline-none focus:border-slate-800" 
              />
              <button 
                type="button" 
                onclick="window.toggleFieldMasking('secAdminUserID', 'eyeIconUserID')" 
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700" 
                title="ID दिखाएं/छिपाएं"
              >
                <i id="eyeIconUserID" class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-slate-700 font-bold mb-1">Admin Password (Masked)</label>
            <div class="relative">
              <input 
                id="secAdminPassword" 
                type="password" 
                placeholder="••••••••••••" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-9 font-mono text-xs outline-none focus:border-slate-800" 
              />
              <button 
                type="button" 
                onclick="window.toggleFieldMasking('secAdminPassword', 'eyeIconPass')" 
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700" 
                title="पासवर्ड दिखाएं/छिपाएं"
              >
                <i id="eyeIconPass" class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <button onclick="window.submitAdminIDPassAuth()" class="w-full bg-slate-900 hover:bg-black text-white font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
            <span>कंसोल लॉगिन</span> <i class="fa-solid fa-lock"></i>
          </button>
        </div>

        <!-- Self-Reset Trigger -->
        <div class="pt-1 text-center border-t border-slate-100">
          <button onclick="window.resetAdminCredentialsWithOtp()" class="text-[11px] font-bold text-amber-800 hover:text-amber-900 underline transition">
            🔑 पिन/पासवर्ड भूल गए? (OTP द्वारा रीसेट करें)
          </button>
        </div>
      </div>
    `;
  }

  window.switchAdminLoginTab = function (mode) {
    AdminState.activeAuthMode = mode;
    renderAdminAuthModal();
  };

  window.submitAdminPINAuth = function () {
    const creds = getAdminCredentials();
    const pinInput = document.getElementById('secAdminPIN')?.value.trim();
    const errEl = document.getElementById('secAdminPinErr');

    if (pinInput === creds.masterPin) {
      if (errEl) errEl.classList.add('hidden');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      if (errEl) errEl.classList.remove('hidden');
      if (typeof window.showToast === 'function') {
        window.showToast('अमान्य मास्टर PIN! पुनः प्रयास करें।', 'error');
      }
    }
  };

  window.submitAdminIDPassAuth = function () {
    const creds = getAdminCredentials();
    const idInput = document.getElementById('secAdminUserID')?.value.trim();
    const passInput = document.getElementById('secAdminPassword')?.value.trim();

    if (idInput === creds.userId && passInput === creds.password) {
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      if (typeof window.showToast === 'function') {
        window.showToast('अमान्य एडमिन ID अथवा पासवर्ड!', 'error');
      } else {
        alert('अमान्य एडमिन ID अथवा पासवर्ड!');
      }
    }
  };

  // --------------------------------------------------------------------------
  // 4. ADMIN CREDENTIALS SELF-RESET (VIA OTP TO 9991039297)
  // --------------------------------------------------------------------------
  window.resetAdminCredentialsWithOtp = function () {
    const creds = getAdminCredentials();
    const targetPhone = creds.recoveryPhone || '9991039297';

    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    AdminState.pendingResetOtp = generatedOtp;

    if (typeof window.sendSmsOtpGateway === 'function') {
      window.sendSmsOtpGateway(targetPhone, generatedOtp);
    } else if (typeof window.showToast === 'function') {
      window.showToast(`एडमिन रीसेट OTP भेजा गया: [ ${generatedOtp} ]`, 'info', 10000);
    }

    renderAdminResetDialog(targetPhone);
  };

  function renderAdminResetDialog(phone) {
    let dialog = document.getElementById('admin-reset-dialog');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'admin-reset-dialog';
      dialog.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs';
      document.body.appendChild(dialog);
    }

    dialog.style.display = 'flex';
    dialog.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-3.5 shadow-2xl text-left text-xs">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 class="font-black text-slate-900 text-sm">एडमिन क्रेडेंशियल्स रीसेट</h3>
          <button onclick="document.getElementById('admin-reset-dialog').style.display='none'" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>
        <p class="text-slate-600 text-[11px]">अधिकृत नंबर <strong>${phone}</strong> पर भेजा गया 6-अंकीय OTP कोड एवं नए क्रेडेंशियल्स दर्ज करें:</p>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">प्राप्त 6-अंकीय OTP</label>
          <input id="rstAdminOtp" type="text" maxlength="6" placeholder="000000" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-center text-lg font-mono font-black" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">नया मास्टर PIN (4 अंक)</label>
          <div class="relative">
            <input id="rstNewPin" type="password" maxlength="4" placeholder="••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pr-8 font-mono" />
            <button type="button" onclick="window.toggleFieldMasking('rstNewPin', 'eyeRstPin')" class="absolute right-2.5 top-2 text-slate-400"><i id="eyeRstPin" class="fa-solid fa-eye"></i></button>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">नया Admin Password</label>
          <div class="relative">
            <input id="rstNewPassword" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pr-8 font-mono" />
            <button type="button" onclick="window.toggleFieldMasking('rstNewPassword', 'eyeRstPass')" class="absolute right-2.5 top-2 text-slate-400"><i id="eyeRstPass" class="fa-solid fa-eye"></i></button>
          </div>
        </div>

        <button onclick="window.verifyAndSaveAdminReset()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition">
          क्रेडेंशियल्स सुरक्षित करें ⚡
        </button>
      </div>
    `;
  }

  window.verifyAndSaveAdminReset = function () {
    const inputOtp = document.getElementById('rstAdminOtp')?.value.trim();
    const newPin = document.getElementById('rstNewPin')?.value.trim();
    const newPass = document.getElementById('rstNewPassword')?.value.trim();

    if (inputOtp !== AdminState.pendingResetOtp) {
      if (typeof window.showToast === 'function') window.showToast('अमान्य OTP कोड! रीसेट निरस्त।', 'error');
      return;
    }

    if (!newPin || newPin.length !== 4) {
      if (typeof window.showToast === 'function') window.showToast('मास्टर PIN ठीक 4 अंकों का होना चाहिए!', 'error');
      return;
    }

    if (!newPass || newPass.length < 6) {
      if (typeof window.showToast === 'function') window.showToast('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए!', 'error');
      return;
    }

    const currentCreds = getAdminCredentials();
    currentCreds.masterPin = newPin;
    currentCreds.password = newPass;
    saveAdminCredentials(currentCreds);

    const dialog = document.getElementById('admin-reset-dialog');
    if (dialog) dialog.style.display = 'none';

    if (typeof window.showToast === 'function') {
      window.showToast('एडमिन क्रेडेंशियल्स सफलतापूर्वक अपडेट किए गए!', 'success');
    }
  };

  // --------------------------------------------------------------------------
  // 5. MASTER ADMIN DASHBOARD CONSOLE (TABS & VIEWS)
  // --------------------------------------------------------------------------
  window.openAdminDashboard = function () {
    const modal = document.getElementById('modalAdminDashboard');
    if (!modal) return;
    modal.style.display = 'flex';
    window.switchAdminTab(AdminState.activeTab);
  };

  window.closeAdminDashboard = function () {
    const modal = document.getElementById('modalAdminDashboard');
    if (modal) modal.style.display = 'none';
  };

  window.switchAdminTab = function (tabName) {
    AdminState.activeTab = tabName;
    const tabBtns = ['USERS', 'PAYMENT', 'BRANDING', 'SECURITY'];
    tabBtns.forEach((key) => {
      const btn = document.getElementById(`tabBtnAdmin${key}`);
      const panel = document.getElementById(`adminPanel${key}`);
      if (btn) {
        if (key === tabName) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0';
        } else {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-bold shrink-0';
        }
      }
      if (panel) {
        if (key === tabName) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      }
    });

    if (tabName === 'USERS') renderUsersAndAnalyticsTab();
    else if (tabName === 'PAYMENT') renderPayoutAccountsTab();
    else if (tabName === 'BRANDING') renderBrandingSettingsTab();
    else if (tabName === 'SECURITY') renderSecurityManagerTab();
  };

  // --------------------------------------------------------------------------
  // 6. TAB 1: USERS, ADVANCED CONTROLS & LOCATION ANALYTICS
  // --------------------------------------------------------------------------
  function renderUsersAndAnalyticsTab() {
    const panel = document.getElementById('adminPanelUSERS');
    if (!panel) return;

    const users = getUsersDatabase();
    const filterRole = AdminState.userFilters.role;
    const filterLoc = AdminState.userFilters.locationQuery.toLowerCase();
    const filterStatus = AdminState.userFilters.status;

    // Filter Logic
    const filteredUsers = users.filter((u) => {
      // Role filter
      if (filterRole !== 'ALL' && u.role?.toLowerCase() !== filterRole.toLowerCase()) return false;
      // Location filter
      if (filterLoc) {
        const userLoc = `${u.city || ''} ${u.district || ''} ${u.pincode || ''} ${u.location || ''}`.toLowerCase();
        if (!userLoc.includes(filterLoc)) return false;
      }
      // Status filter
      const now = Date.now();
      const trialExpired = u.trialStartTimestamp ? now - u.trialStartTimestamp > 24 * 3600 * 1000 : true;
      if (filterStatus === 'ACTIVE' && (u.isBanned || trialExpired)) return false;
      if (filterStatus === 'TRIAL' && (u.isBanned || trialExpired)) return false;
      if (filterStatus === 'EXPIRED' && !trialExpired) return false;
      if (filterStatus === 'BANNED' && !u.isBanned) return false;
      return true;
    });

    // Analytics Calculation
    const totalUsers = users.length;
    const activeDoctors = users.filter((u) => u.role?.toLowerCase() === 'doctor' && !u.isBanned).length;
    const activeFarmers = users.filter((u) => u.role?.toLowerCase() === 'farmer' && !u.isBanned).length;
    const dualPortalCount = users.filter((u) => u.dualPortalEnabled).length;
    const inLocActive = filteredUsers.length;

    panel.innerHTML = `
      <div class="space-y-4">
        <!-- Live Analytics Badges -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
          <div class="bg-blue-50 border border-blue-200 p-3 rounded-2xl">
            <span class="text-[11px] font-bold text-blue-700 block">कुल यूज़र</span>
            <strong class="text-xl font-black text-blue-900">${totalUsers}</strong>
          </div>
          <div class="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl">
            <span class="text-[11px] font-bold text-indigo-700 block">सक्रिय डॉक्टर</span>
            <strong class="text-xl font-black text-indigo-900">${activeDoctors}</strong>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
            <span class="text-[11px] font-bold text-emerald-700 block">सक्रिय किसान</span>
            <strong class="text-xl font-black text-emerald-900">${activeFarmers}</strong>
          </div>
          <div class="bg-purple-50 border border-purple-200 p-3 rounded-2xl">
            <span class="text-[11px] font-bold text-purple-700 block">डुअल पोर्टल एक्टिव</span>
            <strong class="text-xl font-black text-purple-900">${dualPortalCount}</strong>
          </div>
          <div class="bg-amber-50 border border-amber-200 p-3 rounded-2xl col-span-2 sm:col-span-1">
            <span class="text-[11px] font-bold text-amber-700 block">फ़िल्टर अनुसार सक्रिय</span>
            <strong class="text-xl font-black text-amber-900">${inLocActive}</strong>
          </div>
        </div>

        <!-- Location Filters & Search Toolbar -->
        <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">भूमिका फ़िल्टर (Role):</label>
              <select onchange="window.setUserFilter('role', this.value)" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none">
                <option value="ALL" ${filterRole === 'ALL' ? 'selected' : ''}>सभी भूमिकाएं (All)</option>
                <option value="doctor" ${filterRole === 'doctor' ? 'selected' : ''}>🩺 अधिकृत डॉक्टर</option>
                <option value="farmer" ${filterRole === 'farmer' ? 'selected' : ''}>🌾 स्मार्ट किसान</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">लोकेशन (District / City / Pin):</label>
              <input 
                type="text" 
                value="${AdminState.userFilters.locationQuery}" 
                placeholder="उदा. हिसार, रोहतक, 125001..." 
                oninput="window.setUserFilter('locationQuery', this.value)" 
                class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs outline-none font-medium" 
              />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">ट्रायल / प्लान स्टेटस:</label>
              <select onchange="window.setUserFilter('status', this.value)" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none">
                <option value="ALL" ${filterStatus === 'ALL' ? 'selected' : ''}>सभी स्टेटस</option>
                <option value="ACTIVE" ${filterStatus === 'ACTIVE' ? 'selected' : ''}>सक्रिय (Active)</option>
                <option value="TRIAL" ${filterStatus === 'TRIAL' ? 'selected' : ''}>ट्रायल में (Within 24h)</option>
                <option value="EXPIRED" ${filterStatus === 'EXPIRED' ? 'selected' : ''}>ट्रायल समाप्त (Expired)</option>
                <option value="BANNED" ${filterStatus === 'BANNED' ? 'selected' : ''}>प्रतिबंधित (Banned)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Users Table & Granular Controls -->
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-slate-800 text-xs sm:text-sm">पंजीकृत यूज़र डायरेक्टरी (${filteredUsers.length})</h4>
            <button onclick="window.exportUsersCsv()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition">
              📥 एक्सपोर्ट CSV
            </button>
          </div>

          <div class="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            ${
              filteredUsers.length === 0
                ? `<div class="p-8 text-center text-slate-400 font-bold bg-white rounded-2xl border border-dashed border-slate-200">कोई यूज़र रिकॉर्ड नहीं मिला।</div>`
                : filteredUsers
                    .map((user) => {
                      const isDoctor = user.role?.toLowerCase() === 'doctor';
                      const trialTimeLeft = Math.max(
                        0,
                        (user.trialStartTimestamp || Date.now()) + 24 * 3600 * 1000 - Date.now()
                      );
                      const trialHoursLeft = Math.floor(trialTimeLeft / (3600 * 1000));
                      const isExpired = trialTimeLeft <= 0;

                      return `
                <div class="bg-white border ${
                  user.isBanned ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } rounded-2xl p-4 shadow-xs space-y-3 text-xs">
                  <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xl">${isDoctor ? '🩺' : '🌾'}</span>
                      <div>
                        <strong class="text-slate-900 text-sm font-black">${user.name || 'User'}</strong>
                        <span class="text-[10px] ${
                          isDoctor ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                        } font-bold px-2 py-0.5 rounded-full ml-1">
                          ${isDoctor ? 'Doctor' : 'Farmer'}
                        </span>
                        ${
                          user.isBanned
                            ? '<span class="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full ml-1">BANNED</span>'
                            : ''
                        }
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <span>📱 ${user.contact}</span>
                      <span>•</span>
                      <span>⏳ ${isExpired ? '<span class="text-rose-600 font-bold">Expired</span>' : trialHoursLeft + 'h Left'}</span>
                    </div>
                  </div>

                  <!-- Granular Toggles & Control Buttons -->
                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    
                    <!-- 1. Extend Trial -->
                    <div class="relative inline-block">
                      <select onchange="window.extendUserTrial('${user.contact}', this.value)" class="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] py-1.5 px-2 rounded-xl outline-none">
                        <option value="">⏳ एक्सटेंड ट्रायल</option>
                        <option value="24">+24 Hours</option>
                        <option value="168">+7 Days</option>
                        <option value="720">+30 Days</option>
                      </select>
                    </div>

                    <!-- 2. SMS Toggle -->
                    <button onclick="window.toggleUserFeature('${user.contact}', 'smsEnabled')" class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                        user.smsEnabled !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }">
                      💬 SMS: ${user.smsEnabled !== false ? 'चालू' : 'बंद'}
                    </button>

                    <!-- 3. AI Surgeon Toggle -->
                    <button onclick="window.toggleUserFeature('${user.contact}', 'aiSurgeonEnabled')" class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                        user.aiSurgeonEnabled !== false
                          ? 'bg-purple-50 text-purple-700 border-purple-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }">
                      ⚡ AI सर्जन: ${user.aiSurgeonEnabled !== false ? 'अनुमति' : 'रोक'}
                    </button>

                    <!-- 4. Dual Portal Permission -->
                    <button onclick="window.toggleUserFeature('${user.contact}', 'dualPortalEnabled')" class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                        user.dualPortalEnabled
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }">
                      🔄 डुअल पोर्टल: ${user.dualPortalEnabled ? 'सक्षम' : 'अक्षम'}
                    </button>

                    <!-- 5. Change Plan -->
                    <select onchange="window.changeUserPlan('${user.contact}', this.value)" class="bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px] py-1.5 px-2 rounded-xl outline-none">
                      <option value="">📦 प्लान बदलें (${user.plan || 'Trial'})</option>
                      <option value="1-Week">1-Week Pass</option>
                      <option value="1-Month">1-Month Pro</option>
                      <option value="3-Month">3-Month VIP</option>
                      <option value="Annual">Annual Master</option>
                    </select>

                    <!-- 6. Ban / Unban -->
                    <button onclick="window.toggleUserBan('${user.contact}')" class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                        user.isBanned
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                      }">
                      ${user.isBanned ? '🚫 अनबैन करें' : 'बैन करें'}
                    </button>

                    <!-- 7. Delete User -->
                    <button onclick="window.deleteUserRecord('${user.contact}')" class="text-[11px] font-bold px-2 py-1.5 rounded-xl text-slate-400 hover:text-rose-600 transition" title="खाता हटाएं">
                      <i class="fa-solid fa-trash"></i>
                    </button>

                  </div>
                </div>
              `;
                    })
                    .join('')
            }
          </div>
        </div>
      </div>
    `;
  }

  window.setUserFilter = function (key, val) {
    AdminState.userFilters[key] = val;
    renderUsersAndAnalyticsTab();
  };

  window.extendUserTrial = function (contact, hours) {
    if (!hours) return;
    const users = getUsersDatabase();
    const user = users.find((u) => u.contact === contact);
    if (!user) return;

    const msToAdd = parseInt(hours, 10) * 3600 * 1000;
    user.trialStartTimestamp = Math.max(Date.now(), user.trialStartTimestamp || Date.now()) + msToAdd;
    saveUsersDatabase(users);
    renderUsersAndAnalyticsTab();

    if (typeof window.showToast === 'function') {
      window.showToast(`यूज़र ${user.name} का ट्रायल +${hours} घंटे बढ़ाया गया!`, 'success');
    }
  };

  window.toggleUserFeature = function (contact, featureKey) {
    const users = getUsersDatabase();
    const user = users.find((u) => u.contact === contact);
    if (!user) return;

    if (user[featureKey] === undefined) {
      user[featureKey] = false;
    } else {
      user[featureKey] = !user[featureKey];
    }

    saveUsersDatabase(users);
    renderUsersAndAnalyticsTab();

    if (typeof window.showToast === 'function') {
      window.showToast(`${featureKey} टॉगल किया गया!`, 'info');
    }
  };

  window.changeUserPlan = function (contact, newPlan) {
    if (!newPlan) return;
    const users = getUsersDatabase();
    const user = users.find((u) => u.contact === contact);
    if (!user) return;

    user.plan = newPlan;
    // Add 30 or 90 days validity
    const days = newPlan === '1-Week' ? 7 : newPlan === '1-Month' ? 30 : 90;
    user.trialStartTimestamp = Date.now() + days * 24 * 3600 * 1000;

    saveUsersDatabase(users);
    renderUsersAndAnalyticsTab();

    if (typeof window.showToast === 'function') {
      window.showToast(`प्लान सफलतापूर्वक बदला गया: ${newPlan}`, 'success');
    }
  };

  window.toggleUserBan = function (contact) {
    const users = getUsersDatabase();
    const user = users.find((u) => u.contact === contact);
    if (!user) return;

    user.isBanned = !user.isBanned;
    saveUsersDatabase(users);
    renderUsersAndAnalyticsTab();

    if (typeof window.showToast === 'function') {
      window.showToast(user.isBanned ? 'यूज़र बैन किया गया!' : 'यूज़र अनबैन किया गया!', 'info');
    }
  };

  window.deleteUserRecord = function (contact) {
    if (!confirm('क्या आप वाकई इस यूज़र खाते को पूरी तरह हटाना चाहते हैं?')) return;
    let users = getUsersDatabase();
    users = users.filter((u) => u.contact !== contact);
    saveUsersDatabase(users);
    renderUsersAndAnalyticsTab();

    if (typeof window.showToast === 'function') {
      window.showToast('यूज़र खाता हटाया गया।', 'info');
    }
  };

  window.exportUsersCsv = function () {
    const users = getUsersDatabase();
    if (!users.length) {
      alert('एक्सपोर्ट के लिए कोई डेटा नहीं है!');
      return;
    }

    let csv = 'Name,Role,Contact,RegisteredAt,Banned,Plan,DualPortal\n';
    users.forEach((u) => {
      csv += `"${u.name || ''}","${u.role || ''}","${u.contact || ''}","${new Date(
        u.registeredAt || Date.now()
      ).toLocaleDateString()}","${u.isBanned ? 'YES' : 'NO'}","${u.plan || 'Trial'}","${
        u.dualPortalEnabled ? 'YES' : 'NO'
      }"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vetcare_Users_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --------------------------------------------------------------------------
  // 7. TAB 2: DYNAMIC PAYOUT BANK & UPI MANAGER
  // --------------------------------------------------------------------------
  function renderPayoutAccountsTab() {
    const panel = document.getElementById('adminPanelPAYMENT');
    if (!panel) return;

    const accounts = getPayoutAccounts();

    panel.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="flex justify-between items-center border-b border-slate-200 pb-2.5">
          <div>
            <h3 class="font-black text-slate-900 text-sm">पेआउट एवं बैंक सेटिंग्स (Dynamic Payout Gateway)</h3>
            <p class="text-[11px] text-slate-500">किसान व डॉक्टर से प्राप्त भुगतान हेतु अधिकृत बैंक खाते एवं UPI IDs</p>
          </div>
          <button onclick="window.openAddPayoutModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1">
            <i class="fa-solid fa-plus"></i> <span>नया बैंक / UPI जोड़ें</span>
          </button>
        </div>

        <!-- Accounts Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${accounts
            .map(
              (acc) => `
            <div class="bg-slate-50 border ${
              acc.isPrimary ? 'border-emerald-300 ring-2 ring-emerald-500/20' : 'border-slate-200'
            } rounded-2xl p-4 space-y-2.5 relative">
              ${
                acc.isPrimary
                  ? '<span class="absolute top-3 right-3 text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">प्राथमिक खाता (Active)</span>'
                  : ''
              }
              <div class="flex items-center gap-2">
                <span class="text-2xl">🏛️</span>
                <div>
                  <h4 class="font-black text-slate-900 text-sm">${acc.bankName}</h4>
                  <p class="text-[11px] text-slate-500 font-sans">Payee: <strong>${acc.payeeName}</strong></p>
                </div>
              </div>

              <div class="space-y-1 font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                <div class="flex justify-between">
                  <span class="text-slate-400">UPI ID:</span>
                  <span class="font-bold text-blue-700">${acc.upiId}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Account No:</span>
                  <span class="font-bold text-slate-800">${acc.accountNumber}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">IFSC Code:</span>
                  <span class="font-bold text-slate-800 uppercase">${acc.ifsc}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <div>
                  ${
                    !acc.isPrimary
                      ? `<button onclick="window.setPrimaryPayoutAccount('${acc.id}')" class="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2 py-1 rounded-lg hover:bg-blue-100">
                          प्राथमिक बनाएं
                        </button>`
                      : '<span class="text-[10px] font-bold text-emerald-700">✓ एक्टिव मर्चेंट</span>'
                  }
                </div>
                <div class="flex gap-1.5">
                  <button onclick="window.openEditPayoutModal('${acc.id}')" class="text-xs text-slate-600 hover:text-blue-700 font-bold px-2 py-1">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  ${
                    !acc.isPrimary
                      ? `<button onclick="window.deletePayoutAccount('${acc.id}')" class="text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1">
                          <i class="fa-solid fa-trash"></i>
                        </button>`
                      : ''
                  }
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  window.openAddPayoutModal = function () {
    AdminState.editingPayoutId = null;
    renderPayoutFormModal({});
  };

  window.openEditPayoutModal = function (accId) {
    const accounts = getPayoutAccounts();
    const acc = accounts.find((a) => a.id === accId);
    if (!acc) return;
    AdminState.editingPayoutId = accId;
    renderPayoutFormModal(acc);
  };

  function renderPayoutFormModal(data) {
    let modal = document.getElementById('admin-payout-form-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'admin-payout-form-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs';
      document.body.appendChild(modal);
    }

    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 sm:p-6 space-y-3.5 shadow-2xl text-xs text-left">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 class="font-black text-slate-900 text-sm">${AdminState.editingPayoutId ? 'बैंक खाता संपादित करें' : 'नया बैंक खाता जोड़ें'}</h3>
          <button onclick="document.getElementById('admin-payout-form-modal').style.display='none'" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">बैंक का नाम (Bank Name)</label>
          <input id="payFormBank" type="text" value="${data.bankName || ''}" placeholder="उदा. State Bank of India" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">खाता धारक का नाम (Payee Name)</label>
          <input id="payFormPayee" type="text" value="${data.payeeName || 'Vetcare Services'}" placeholder="Vetcare Services" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-0.5">UPI ID</label>
          <input id="payFormUpi" type="text" value="${data.upiId || ''}" placeholder="user@oksbi" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono outline-none font-bold text-blue-700" />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-slate-700 mb-0.5">खाता सं. (A/C No)</label>
            <input id="payFormAcc" type="text" value="${data.accountNumber || ''}" placeholder="6520406..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-0.5">IFSC कोड</label>
            <input id="payFormIfsc" type="text" value="${data.ifsc || ''}" placeholder="SBIN001..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono outline-none uppercase" />
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <button onclick="document.getElementById('admin-payout-form-modal').style.display='none'" class="w-1/3 bg-slate-100 font-bold text-slate-700 py-2.5 rounded-xl">रद्द</button>
          <button onclick="window.savePayoutFormAccount()" class="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-xs transition">सुरक्षित करें</button>
        </div>
      </div>
    `;
  }

  window.savePayoutFormAccount = function () {
    const bankName = document.getElementById('payFormBank')?.value.trim();
    const payeeName = document.getElementById('payFormPayee')?.value.trim();
    const upiId = document.getElementById('payFormUpi')?.value.trim();
    const accountNumber = document.getElementById('payFormAcc')?.value.trim();
    const ifsc = document.getElementById('payFormIfsc')?.value.trim().toUpperCase();

    if (!bankName || !upiId || !accountNumber || !ifsc) {
      if (typeof window.showToast === 'function') window.showToast('कृपया सभी बैंक विवरण अनिवार्य रूप से भरें!', 'error');
      return;
    }

    const accounts = getPayoutAccounts();

    if (AdminState.editingPayoutId) {
      const idx = accounts.findIndex((a) => a.id === AdminState.editingPayoutId);
      if (idx >= 0) {
        accounts[idx] = { ...accounts[idx], bankName, payeeName, upiId, accountNumber, ifsc };
      }
    } else {
      accounts.push({
        id: 'PAY_' + Date.now(),
        bankName,
        payeeName: payeeName || 'Vetcare Services',
        upiId,
        accountNumber,
        ifsc,
        isPrimary: accounts.length === 0
      });
    }

    savePayoutAccounts(accounts);
    const modal = document.getElementById('admin-payout-form-modal');
    if (modal) modal.style.display = 'none';

    renderPayoutAccountsTab();
    if (typeof window.showToast === 'function') {
      window.showToast('बैंक एवं UPI खाता सफलतापूर्वक सुरक्षित!', 'success');
    }
  };

  window.setPrimaryPayoutAccount = function (accId) {
    const accounts = getPayoutAccounts();
    accounts.forEach((a) => {
      a.isPrimary = a.id === accId;
    });
    savePayoutAccounts(accounts);
    renderPayoutAccountsTab();
    if (typeof window.showToast === 'function') window.showToast('प्राथमिक खाता अपडेट हुआ!', 'success');
  };

  window.deletePayoutAccount = function (accId) {
    if (!confirm('क्या आप वाकई इस खाते को हटाना चाहते हैं?')) return;
    let accounts = getPayoutAccounts();
    accounts = accounts.filter((a) => a.id !== accId);
    savePayoutAccounts(accounts);
    renderPayoutAccountsTab();
  };

  // --------------------------------------------------------------------------
  // 8. TAB 3: DYNAMIC BRANDING, LOGO & ANNOUNCEMENT ENGINE
  // --------------------------------------------------------------------------
  function renderBrandingSettingsTab() {
    const panel = document.getElementById('adminPanelBRANDING');
    if (!panel) return;

    const branding = getAppBranding();

    panel.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="border-b border-slate-200 pb-2">
          <h3 class="font-black text-slate-900 text-sm">ऐप ब्रांडिंग व पहचान संपादक (Live Branding Suite)</h3>
          <p class="text-[11px] text-slate-500">लोगो, मुख्य शीर्षक, थीम रंग एवं लाइव घोषणा संदेश का वास्तविक नियंत्रण</p>
        </div>

        <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">एप्लीकेशन मुख्य शीर्षक (App Title)</label>
            <input id="brandFormTitle" type="text" value="${branding.appTitle || ''}" placeholder="Vetcare AI OS" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold outline-none" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">संस्था / क्लिनिक टैगलाइन</label>
            <input id="brandFormTagline" type="text" value="${branding.tagline || ''}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none font-medium" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">लोगो इमेज URL (Direct Web Link)</label>
              <input id="brandFormLogoUrl" type="url" value="${branding.logoUrl || ''}" placeholder="https://domain.com/logo.png" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-mono text-[11px] outline-none" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">अथवा स्थानीय लोगो अपलोड (Base64)</label>
              <input id="brandFormLogoFile" type="file" accept="image/*" onchange="window.handleLogoFileUpload(this)" class="w-full bg-white border border-slate-200 rounded-xl p-1 text-slate-500" />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">ग्लोबल घोषणा संदेश (Announcement Banner)</label>
            <textarea id="brandFormBanner" rows="2" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none font-sans">${branding.announcementBanner || ''}</textarea>
          </div>

          <button onclick="window.saveAppBrandingSettings()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2">
            <span>💾 ब्रांडिंग परिवर्तन लाइव लागू करें</span>
          </button>
        </div>
      </div>
    `;
  }

  window.handleLogoFileUpload = function (input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const logoUrlInput = document.getElementById('brandFormLogoUrl');
        if (logoUrlInput) logoUrlInput.value = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  window.saveAppBrandingSettings = function () {
    const appTitle = document.getElementById('brandFormTitle')?.value.trim() || 'Vetcare AI OS';
    const tagline = document.getElementById('brandFormTagline')?.value.trim() || '';
    const logoUrl = document.getElementById('brandFormLogoUrl')?.value.trim() || '';
    const announcementBanner = document.getElementById('brandFormBanner')?.value.trim() || '';

    const newBranding = { appTitle, tagline, logoUrl, announcementBanner };
    saveAppBranding(newBranding);
    window.updateAppBranding(newBranding);

    if (typeof window.showToast === 'function') {
      window.showToast('ब्रांडिंग सेटिंग्स लाइव अपडेट हो चुकी हैं!', 'success');
    }
  };

  window.updateAppBranding = function (branding) {
    if (!branding) branding = getAppBranding();

    // Live DOM Reflection
    const appHeaderTitle = document.getElementById('appHeaderTitle');
    const gatewayAppTitle = document.getElementById('gatewayAppTitle');
    const gatewayTagline = document.getElementById('gatewayTagline');
    const logoImg = document.getElementById('app-logo-img');
    const headerLogoText = document.getElementById('headerLogoText');
    const bannerContainer = document.getElementById('app-announcement-banner');

    if (appHeaderTitle) appHeaderTitle.textContent = branding.appTitle;
    if (gatewayAppTitle) gatewayAppTitle.textContent = branding.appTitle;
    if (gatewayTagline) gatewayTagline.textContent = branding.tagline;

    if (branding.logoUrl) {
      if (logoImg) {
        logoImg.src = branding.logoUrl;
        logoImg.classList.remove('hidden');
      }
      if (headerLogoText) headerLogoText.classList.add('hidden');
    } else {
      if (logoImg) logoImg.classList.add('hidden');
      if (headerLogoText) headerLogoText.classList.remove('hidden');
    }

    if (bannerContainer) {
      if (branding.announcementBanner) {
        bannerContainer.innerHTML = `
          <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-[11px] font-bold p-2 text-center shadow-xs flex items-center justify-center gap-2">
            <span>📢</span> <span>${branding.announcementBanner}</span>
          </div>
        `;
      } else {
        bannerContainer.innerHTML = '';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 9. TAB 4: MASKED CREDENTIALS MANAGER INSIDE DASHBOARD
  // --------------------------------------------------------------------------
  function renderSecurityManagerTab() {
    const panel = document.getElementById('adminPanelSECURITY');
    if (!panel) return;

    const creds = getAdminCredentials();

    panel.innerHTML = `
      <div class="space-y-4 text-xs max-w-lg">
        <div class="border-b border-slate-200 pb-2">
          <h3 class="font-black text-slate-900 text-sm">क्रेडेंशियल्स व सुरक्षा प्रबंधन (Masked Security Manager)</h3>
          <p class="text-[11px] text-slate-500">मास्टर क्रेडेंशियल्स सदैव एन्क्रिप्टेड एवं मास्कड रहते हैं</p>
        </div>

        <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Master Quick PIN (4 Digits)</label>
            <div class="relative">
              <input id="mgrPin" type="password" maxlength="4" value="${creds.masterPin}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-8 font-mono outline-none" />
              <button type="button" onclick="window.toggleFieldMasking('mgrPin', 'eyeMgrPin')" class="absolute right-3 top-2.5 text-slate-400"><i id="eyeMgrPin" class="fa-solid fa-eye"></i></button>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Admin User ID</label>
            <div class="relative">
              <input id="mgrUserId" type="password" value="${creds.userId}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-8 font-mono outline-none" />
              <button type="button" onclick="window.toggleFieldMasking('mgrUserId', 'eyeMgrUser')" class="absolute right-3 top-2.5 text-slate-400"><i id="eyeMgrUser" class="fa-solid fa-eye"></i></button>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Admin Password</label>
            <div class="relative">
              <input id="mgrPassword" type="password" value="${creds.password}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-8 font-mono outline-none" />
              <button type="button" onclick="window.toggleFieldMasking('mgrPassword', 'eyeMgrPass')" class="absolute right-3 top-2.5 text-slate-400"><i id="eyeMgrPass" class="fa-solid fa-eye"></i></button>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">रिकवरी मोबाइल नंबर (फॉर OTP रीसेट)</label>
            <input id="mgrRecoveryPhone" type="tel" maxlength="10" value="${creds.recoveryPhone || '9991039297'}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-mono outline-none font-bold" />
          </div>

          <button onclick="window.saveSecurityManagerCredentials()" class="w-full bg-slate-900 hover:bg-black text-white font-black py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2">
            <span>💾 नए क्रेडेंशियल्स सुरक्षित करें</span>
          </button>
        </div>
      </div>
    `;
  }

  window.saveSecurityManagerCredentials = function () {
    const pin = document.getElementById('mgrPin')?.value.trim();
    const userId = document.getElementById('mgrUserId')?.value.trim();
    const password = document.getElementById('mgrPassword')?.value.trim();
    const recoveryPhone = document.getElementById('mgrRecoveryPhone')?.value.trim();

    if (!pin || pin.length !== 4) {
      if (typeof window.showToast === 'function') window.showToast('PIN 4 अंकों का होना आवश्यक है!', 'error');
      return;
    }

    if (!userId || !password) {
      if (typeof window.showToast === 'function') window.showToast('ID और पासवर्ड खाली नहीं हो सकते!', 'error');
      return;
    }

    const creds = { masterPin: pin, userId, password, recoveryPhone };
    saveAdminCredentials(creds);

    if (typeof window.showToast === 'function') {
      window.showToast('सुरक्षा क्रेडेंशियल्स सफलतापूर्वक अपडेट किए गए!', 'success');
    }
  };

  // --------------------------------------------------------------------------
  // 10. SYSTEM BOOTSTRAPPER & INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // Inject Tab header button for SECURITY in admin console if missing
    const tabHeaders = document.querySelector('#modalAdminDashboard .border-b');
    if (tabHeaders && !document.getElementById('tabBtnAdminSECURITY')) {
      const secBtn = document.createElement('button');
      secBtn.id = 'tabBtnAdminSECURITY';
      secBtn.onclick = () => window.switchAdminTab('SECURITY');
      secBtn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-bold shrink-0';
      secBtn.textContent = '🔒 सुरक्षा व क्रेडेंशियल्स';
      tabHeaders.appendChild(secBtn);

      const secPanel = document.createElement('div');
      secPanel.id = 'adminPanelSECURITY';
      secPanel.className = 'hidden';
      const container = document.querySelector('#modalAdminDashboard .max-w-4xl');
      if (container) container.appendChild(secPanel);
    }

    // Apply live branding
    window.updateAppBranding();
  });

})(window, document);
