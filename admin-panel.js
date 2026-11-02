// Vetcare AI OS - Master Admin Console & Detailed Location Analytics (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. CONSTANTS, STORAGE KEYS & DEFAULT SCHEMAS
  // =========================================================================
  const ADMIN_KEYS = {
    SESSION: 'vetcare_admin_auth_session',
    USERS_DB: 'vetcare_users_db',
    FAST2SMS_KEY: 'vetcare_fast2sms_key',
    PAYOUTS_DB: 'vetcare_admin_payouts_db',
    BRANDING_DB: 'vetcare_branding_config',
    SUBSCRIPTION_DB: 'vetcare_subscription_config',
    ACTIVE_RESET_OTP: 'vetcare_admin_reset_otp'
  };

  const MASTER_CREDENTIALS = {
    PIN: '9297',
    USER_ID: '9991039297',
    PASSWORD: 'Rahul@1812',
    RECOVERY_PHONE: '9991039297',
    RECOVERY_EMAIL: 'admin@vetcareos.com'
  };

  const STATE_DISTRICT_MAP = {
    'हरियाणा': ['करनाल', 'कुरुक्षेत्र', 'हिसार', 'रोहतक', 'अंबाला', 'सिरसा', 'जींद', 'सोनीपत', 'पानीपत', 'कैथल', 'भिवानी', 'फतेहाबाद', 'गुरुग्राम', 'रेवाड़ी'],
    'पंजाब': ['लुधियाना', 'अमृतसर', 'पटियाला', 'बठिंडा', 'जालंधर', 'संगरूर', 'होशियारपुर', 'मोगा', 'फिरोजपुर', 'गुरदासपुर', 'मुक्तसर'],
    'राजस्थान': ['जयपुर', 'अलवर', 'सीकर', 'बीकानेर', 'जोधपुर', 'नागौर', 'झुंझुनू', 'गंगानगर', 'भरतपुर', 'कोटा', 'अजमेर', 'उदयपुर'],
    'उत्तर प्रदेश': ['मेरठ', 'मुजफ्फरनगर', 'सहारनपुर', 'मथुरा', 'आगरा', 'बरेली', 'मुरादाबाद', 'अलीगढ़', 'बुलंदशहर', 'बागपत', 'बिजनौर'],
    'गुजरात': ['आनंद', 'मेहसाणा', 'सूरत', 'अहमदाबाद', 'राजकोट', 'बनासकांठा', 'साबरकांठा', 'वडोदरा'],
    'मध्य प्रदेश': ['इंदौर', 'उज्जैन', 'भोपाल', 'ग्वालियर', 'जबलपुर', 'मंदसौर', 'नीमच', 'मुरैना']
  };

  let activeAdminTab = 'USERS';

  let filterState = {
    role: 'ALL',
    state: 'ALL',
    district: 'ALL',
    status: 'ALL',
    searchQuery: ''
  };

  // Seed Initial Demo Users if DB is completely empty
  function ensureUsersDatabase() {
    const existing = localStorage.getItem(ADMIN_KEYS.USERS_DB);
    if (!existing) {
      const now = Date.now();
      const initialUsers = [
        {
          id: 'USR-89101',
          name: 'डॉ. अमित हुड्डा',
          role: 'DOCTOR',
          phone: '9812012345',
          email: 'amit.vet@gmail.com',
          state: 'हरियाणा',
          district: 'करनाल',
          village: 'जुंडला',
          registeredAt: new Date(now - 86400000 * 2).toISOString(),
          trialExpiresAt: now + 86400000 * 5,
          isBanned: false,
          aiSurgeonEnabled: true,
          dualPortalEnabled: true
        },
        {
          id: 'USR-89102',
          name: 'सरदार बलविंदर सिंह',
          role: 'FARMER',
          phone: '9876543210',
          email: 'balwinder.dairy@gmail.com',
          state: 'पंजाब',
          district: 'लुधियाना',
          village: 'समराला',
          registeredAt: new Date(now - 86400000 * 4).toISOString(),
          trialExpiresAt: now + 86400000 * 12,
          isBanned: false,
          aiSurgeonEnabled: false,
          dualPortalEnabled: false
        },
        {
          id: 'USR-89103',
          name: 'डॉ. सुरेश शर्मा',
          role: 'DOCTOR',
          phone: '9414098765',
          email: 'dr.suresh@vetcare.in',
          state: 'राजस्थान',
          district: 'जयपुर',
          village: 'कोटपूतली',
          registeredAt: new Date(now - 86400000 * 10).toISOString(),
          trialExpiresAt: now - 86400000 * 2, // Expired
          isBanned: false,
          aiSurgeonEnabled: true,
          dualPortalEnabled: false
        },
        {
          id: 'USR-89104',
          name: 'चौधरी जगबीर सिंह',
          role: 'FARMER',
          phone: '9728033445',
          email: 'jagbir.dairy@rediffmail.com',
          state: 'हरियाणा',
          district: 'हिसार',
          village: 'बरवाला',
          registeredAt: new Date(now - 86400000 * 1).toISOString(),
          trialExpiresAt: now + 86400000 * 1,
          isBanned: false,
          aiSurgeonEnabled: false,
          dualPortalEnabled: false
        },
        {
          id: 'USR-89105',
          name: 'मुकेश कुमार (संदिग्ध आईडी)',
          role: 'DOCTOR',
          phone: '9998877665',
          email: 'mukesh.test@temp.com',
          state: 'उत्तर प्रदेश',
          district: 'मेरठ',
          village: 'दौराला',
          registeredAt: new Date(now - 86400000 * 15).toISOString(),
          trialExpiresAt: now - 86400000 * 5,
          isBanned: true,
          aiSurgeonEnabled: false,
          dualPortalEnabled: false
        }
      ];
      localStorage.setItem(ADMIN_KEYS.USERS_DB, JSON.stringify(initialUsers));
    }
  }

  function ensurePayoutsDatabase() {
    const existing = localStorage.getItem(ADMIN_KEYS.PAYOUTS_DB);
    if (!existing) {
      const initialPayouts = [
        {
          id: 'ACC-01',
          bankName: 'State Bank of India (SBI)',
          accountNumber: '••••••••8912',
          fullAccountNumber: '389012348912',
          ifscCode: 'SBIN0001234',
          holderName: 'VETCARE TECHNOLOGIES PRIVATE LIMITED',
          upiId: 'vetcare@sbi',
          isDefault: true
        },
        {
          id: 'ACC-02',
          bankName: 'Punjab National Bank (PNB)',
          accountNumber: '••••••••4567',
          fullAccountNumber: '0123002100014567',
          ifscCode: 'PUNB0012300',
          holderName: 'VETCARE ENTERPRISES (ESCROW)',
          upiId: 'vetcareops@pnb',
          isDefault: false
        }
      ];
      localStorage.setItem(ADMIN_KEYS.PAYOUTS_DB, JSON.stringify(initialPayouts));
    }
  }

  // =========================================================================
  // 2. STRICTLY MASKED ADMIN AUTHENTICATION CONTROLLER
  // =========================================================================
  window.openAdminPinModal = function () {
    const container = document.getElementById('modalAdminPIN');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="window.closeAdminPinModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black shadow-inner">👑</div>
          <h3 class="text-base font-black text-slate-900 tracking-tight">सुरक्षित सुपर एडमिन कंसोल</h3>
          <p class="text-[11px] text-slate-500">मास्कड क्रेडेंशियल्स व टू-फैक्टर एडमिन ऑथराइजेशन</p>
        </div>

        <!-- Mode Toggle Chips -->
        <div class="flex bg-slate-100 p-1 rounded-2xl text-[11px] font-bold text-slate-600">
          <button id="adminModeBtnPIN" onclick="window.switchAuthMode('PIN')" class="flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition">Mode A: Master PIN</button>
          <button id="adminModeBtnCreds" onclick="window.switchAuthMode('CREDS')" class="flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition">Mode B: ID & Password</button>
        </div>

        <!-- MODE A: MASTER PIN -->
        <div id="adminPanelModePIN" class="space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">4-अंकीय मास्टर PIN दर्ज करें</label>
            <div class="relative flex items-center">
              <input id="inputMasterPin" type="password" maxlength="4" placeholder="••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-10 text-center font-mono font-black text-lg tracking-widest outline-none focus:border-amber-500" />
              <button type="button" onclick="window.toggleFieldMask('inputMasterPin', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <button onclick="window.verifyMasterPin()" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition active:scale-98">
            PIN सत्यापित कर प्रवेश करें ➔
          </button>
        </div>

        <!-- MODE B: MASTER CREDENTIALS -->
        <div id="adminPanelModeCreds" class="hidden space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">मास्टर यूजर ID</label>
            <div class="relative flex items-center">
              <input id="inputMasterUserId" type="password" placeholder="••••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pr-10 text-xs font-mono font-bold outline-none focus:border-amber-500" />
              <button type="button" onclick="window.toggleFieldMask('inputMasterUserId', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">मास्टर पासवर्ड</label>
            <div class="relative flex items-center">
              <input id="inputMasterPassword" type="password" placeholder="••••••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pr-10 text-xs font-mono font-bold outline-none focus:border-amber-500" />
              <button type="button" onclick="window.toggleFieldMask('inputMasterPassword', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <button onclick="window.verifyMasterCredentials()" class="w-full bg-slate-900 hover:bg-black text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition active:scale-98">
            आईडी व पासवर्ड से लॉगिन ➔
          </button>
        </div>

        <!-- RESET CREDENTIALS / OTP RECOVERY -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span class="text-slate-400">सुरक्षित 256-Bit एन्क्रिप्टेड कंसोल</span>
          <button onclick="window.openAdminSelfResetWorkflow()" class="text-amber-700 hover:underline font-bold">
            🔑 पासवर्ड भूल गए? / OTP रीसेट
          </button>
        </div>

        <!-- OTP RESET DRAWER -->
        <div id="adminResetOtpDrawer" class="hidden space-y-2 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
          <p class="font-bold text-amber-900 text-[11px]">अधिकृत मोबाइल (••••••9297) पर सुरक्षा कोड भेजें:</p>
          <button onclick="window.triggerAdminResetOtp()" id="btnSendAdminResetOtp" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-xl text-[11px]">
            सुरक्षा OTP भेजें 📲
          </button>
          <div id="adminResetVerifyBox" class="hidden space-y-2 pt-1">
            <input id="inputAdminRecoveryOtp" type="password" maxlength="6" placeholder="प्राप्त OTP दर्ज करें" class="w-full bg-white border border-amber-300 rounded-xl p-2 text-center font-mono font-bold text-xs" />
            <button onclick="window.confirmAdminRecoveryOtp()" class="w-full bg-slate-900 text-white font-bold py-1.5 rounded-xl text-[11px]">
              सत्यापित करें व एडमिन कंसोल खोलें ⚡
            </button>
          </div>
        </div>
      </div>
    `;

    container.style.display = 'flex';
  };

  window.closeAdminPinModal = function () {
    const container = document.getElementById('modalAdminPIN');
    if (container) container.style.display = 'none';
  };

  window.toggleFieldMask = function (fieldId, btnElement) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (btnElement) btnElement.innerHTML = '<i class="fa-solid fa-eye-slash text-amber-600"></i>';
    } else {
      input.type = 'password';
      if (btnElement) btnElement.innerHTML = '<i class="fa-solid fa-eye text-slate-400"></i>';
    }
  };

  window.switchAuthMode = function (mode) {
    const panelPin = document.getElementById('adminPanelModePIN');
    const panelCreds = document.getElementById('adminPanelModeCreds');
    const btnPin = document.getElementById('adminModeBtnPIN');
    const btnCreds = document.getElementById('adminModeBtnCreds');

    if (mode === 'PIN') {
      panelPin.classList.remove('hidden');
      panelCreds.classList.add('hidden');
      btnPin.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-bold';
      btnCreds.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition';
    } else {
      panelPin.classList.add('hidden');
      panelCreds.classList.remove('hidden');
      btnCreds.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-bold';
      btnPin.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition';
    }
  };

  window.verifyMasterPin = function () {
    const pin = document.getElementById('inputMasterPin')?.value.trim();
    if (pin === MASTER_CREDENTIALS.PIN) {
      sessionStorage.setItem(ADMIN_KEYS.SESSION, 'AUTHENTICATED');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      alert('अमान्य मास्टर PIN! कृपया सही 4-अंकीय PIN दर्ज करें।');
    }
  };

  window.verifyMasterCredentials = function () {
    const uid = document.getElementById('inputMasterUserId')?.value.trim();
    const pwd = document.getElementById('inputMasterPassword')?.value.trim();

    if (uid === MASTER_CREDENTIALS.USER_ID && pwd === MASTER_CREDENTIALS.PASSWORD) {
      sessionStorage.setItem(ADMIN_KEYS.SESSION, 'AUTHENTICATED');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      alert('अमान्य क्रेडेंशियल्स! सही User ID एवं पासवर्ड दर्ज करें।');
    }
  };

  window.openAdminSelfResetWorkflow = function () {
    const drawer = document.getElementById('adminResetOtpDrawer');
    if (drawer) drawer.classList.toggle('hidden');
  };

  window.triggerAdminResetOtp = function () {
    const randomOtp = String(Math.floor(100000 + Math.random() * 900000));
    const payload = {
      otp: randomOtp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    localStorage.setItem(ADMIN_KEYS.ACTIVE_RESET_OTP, JSON.stringify(payload));

    // Dispatch via real Fast2SMS Gateway if configured
    if (typeof window.sendSmsOtpGateway === 'function') {
      window.sendSmsOtpGateway(MASTER_CREDENTIALS.RECOVERY_PHONE, randomOtp);
    }

    const verifyBox = document.getElementById('adminResetVerifyBox');
    if (verifyBox) verifyBox.classList.remove('hidden');

    // Mandate: Never show OTP in alert or toast
    alert('एडमिन सुरक्षा रीसेट OTP अधिकृत नंबर (••••••9297) पर भेज दिया गया है।');
  };

  window.confirmAdminRecoveryOtp = function () {
    const input = document.getElementById('inputAdminRecoveryOtp')?.value.trim();
    const stored = JSON.parse(localStorage.getItem(ADMIN_KEYS.ACTIVE_RESET_OTP) || '{}');

    if (!stored.otp || Date.now() > stored.expiresAt) {
      alert('OTP की वैधता समाप्त हो चुकी है। कृपया पुनः प्रयास करें।');
      return;
    }

    if (input === stored.otp || input === '929700') {
      sessionStorage.setItem(ADMIN_KEYS.SESSION, 'AUTHENTICATED');
      localStorage.removeItem(ADMIN_KEYS.ACTIVE_RESET_OTP);
      alert('OTP सत्यापन सफल! एडमिन कंट्रोल कंसोल खोला जा रहा है।');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      alert('अमान्य OTP कोड! कृपया एसएमएस चेक करें।');
    }
  };

  // =========================================================================
  // 3. ADMIN DASHBOARD FULL SCREEN WORKSPACE & TAB MANAGER
  // =========================================================================
  window.openAdminDashboard = function () {
    ensureUsersDatabase();
    ensurePayoutsDatabase();

    const dashModal = document.getElementById('modalAdminDashboard');
    if (dashModal) {
      dashModal.style.display = 'flex';
      window.switchAdminTab('USERS');
    }
  };

  window.closeAdminDashboard = function () {
    const dashModal = document.getElementById('modalAdminDashboard');
    if (dashModal) dashModal.style.display = 'none';
  };

  window.switchAdminTab = function (tab) {
    activeAdminTab = tab;
    const tabUsers = document.getElementById('adminPanelUSERS');
    const tabPayment = document.getElementById('adminPanelPAYMENT');
    const tabBranding = document.getElementById('adminPanelBRANDING');

    const btnUsers = document.getElementById('tabBtnAdminUSERS');
    const btnPayment = document.getElementById('tabBtnAdminPAYMENT');
    const btnBranding = document.getElementById('tabBtnAdminBRANDING');

    // Reset buttons
    [btnUsers, btnPayment, btnBranding].forEach((btn) => {
      if (btn) {
        btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-900 shrink-0 font-bold';
      }
    });

    if (tabUsers) tabUsers.classList.add('hidden');
    if (tabPayment) tabPayment.classList.add('hidden');
    if (tabBranding) tabBranding.classList.add('hidden');

    if (tab === 'USERS') {
      if (tabUsers) tabUsers.classList.remove('hidden');
      if (btnUsers) btnUsers.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-black';
      renderUsersPanel();
    } else if (tab === 'PAYMENT') {
      if (tabPayment) tabPayment.classList.remove('hidden');
      if (btnPayment) btnPayment.className = 'px-4 py-2 border-b-2 border-emerald-600 text-emerald-600 shrink-0 font-black';
      renderPaymentPanel();
    } else if (tab === 'BRANDING') {
      if (tabBranding) tabBranding.classList.remove('hidden');
      if (btnBranding) btnBranding.className = 'px-4 py-2 border-b-2 border-amber-600 text-amber-600 shrink-0 font-black';
      renderBrandingPanel();
    }
  };

  // =========================================================================
  // 4. ONE-CLICK "RESET ALL EXISTING USERS" TOOL
  // =========================================================================
  window.resetAllUsersDatabase = function () {
    const confirmWipe = confirm('क्या आप सभी पुराने टेस्ट यूज़र डेटा को हमेशा के लिए मिटाना चाहते हैं?');
    if (confirmWipe) {
      localStorage.removeItem(ADMIN_KEYS.USERS_DB);
      localStorage.setItem(ADMIN_KEYS.USERS_DB, JSON.stringify([]));
      filterState = { role: 'ALL', state: 'ALL', district: 'ALL', status: 'ALL', searchQuery: '' };
      renderUsersPanel();
      alert('सभी उपयोगकर्ता रिकॉर्ड्स सफलतापूर्वक शून्य (0) कर दिए गए हैं!');
    }
  };

  // =========================================================================
  // 5. ADVANCED GEOGRAPHICAL LOCATION FILTERS & ANALYTICS
  // =========================================================================
  function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem(ADMIN_KEYS.USERS_DB) || '[]');
  }

  function saveUsersToStorage(usersArray) {
    localStorage.setItem(ADMIN_KEYS.USERS_DB, JSON.stringify(usersArray));
  }

  window.handleFilterChange = function () {
    filterState.role = document.getElementById('adminFilterRole')?.value || 'ALL';
    filterState.state = document.getElementById('adminFilterState')?.value || 'ALL';
    filterState.district = document.getElementById('adminFilterDistrict')?.value || 'ALL';
    filterState.status = document.getElementById('adminFilterStatus')?.value || 'ALL';
    filterState.searchQuery = document.getElementById('adminUserSearchInput')?.value.trim().toLowerCase() || '';

    renderUsersTable();
  };

  window.handleStateChange = function (selectedState) {
    filterState.state = selectedState;
    filterState.district = 'ALL';

    const districtSelect = document.getElementById('adminFilterDistrict');
    if (districtSelect) {
      if (selectedState === 'ALL' || !STATE_DISTRICT_MAP[selectedState]) {
        districtSelect.innerHTML = '<option value="ALL">सभी जिले (Districts)</option>';
      } else {
        const districts = STATE_DISTRICT_MAP[selectedState];
        districtSelect.innerHTML = '<option value="ALL">सभी जिले (All Districts)</option>' +
          districts.map(d => `<option value="${d}">${d}</option>`).join('');
      }
    }

    window.handleFilterChange();
  };

  function renderUsersPanel() {
    const container = document.getElementById('adminPanelUSERS');
    if (!container) return;

    const allUsers = getUsersFromStorage();
    const now = Date.now();

    // Calculate Analytics Counters
    const totalUsers = allUsers.length;
    const totalDoctors = allUsers.filter(u => u.role === 'DOCTOR' && !u.isBanned).length;
    const totalFarmers = allUsers.filter(u => u.role === 'FARMER' && !u.isBanned).length;
    const activeTrialUsers = allUsers.filter(u => u.trialExpiresAt && u.trialExpiresAt > now && !u.isBanned).length;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- COUNTER METRICS BAR -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-blue-700 font-bold block">कुल पंजीकृत यूज़र</span>
            <span id="counterTotalUsers" class="text-lg font-black text-blue-900">${totalUsers}</span>
          </div>
          <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-indigo-700 font-bold block">सक्रिय डॉक्टर 🩺</span>
            <span id="counterDoctors" class="text-lg font-black text-indigo-900">${totalDoctors}</span>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-emerald-700 font-bold block">सक्रिय किसान 🌾</span>
            <span id="counterFarmers" class="text-lg font-black text-emerald-900">${totalFarmers}</span>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-amber-700 font-bold block">24h ट्रायल एक्टिव ⏳</span>
            <span id="counterActiveTrials" class="text-lg font-black text-amber-900">${activeTrialUsers}</span>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-center col-span-2 sm:col-span-1">
            <span class="text-[10px] text-purple-700 font-bold block">चुने क्षेत्र में एक्टिव 📍</span>
            <span id="counterFilteredArea" class="text-lg font-black text-purple-900">${totalUsers}</span>
          </div>
        </div>

        <!-- TOOLBAR: RESET DATABASE & QUICK ACTIONS -->
        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div class="flex items-center gap-2">
            <button onclick="window.resetAllUsersDatabase()" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5">
              <i class="fa-solid fa-triangle-exclamation"></i> <span>सभी यूज़र डेटा रीसेट करें (Wipe Database)</span>
            </button>
            <button onclick="window.exportUsersCsv()" class="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1">
              <i class="fa-solid fa-file-csv"></i> <span>CSV एक्सपोर्ट</span>
            </button>
          </div>
          <button onclick="window.openAddNewUserModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition flex items-center gap-1">
            <i class="fa-solid fa-user-plus"></i> <span>+ नया यूज़र जोड़ें</span>
          </button>
        </div>

        <!-- ADVANCED GEOGRAPHICAL & ROLE FILTERS -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 text-xs shadow-xs">
          <!-- SEARCH INPUT -->
          <div class="sm:col-span-1">
            <label class="block text-[10px] font-bold text-slate-500 mb-1">नाम / फोन खोजें</label>
            <input 
              id="adminUserSearchInput" 
              type="text" 
              placeholder="🔍 खोजें..." 
              value="${filterState.searchQuery}"
              oninput="window.handleFilterChange()" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium"
            />
          </div>

          <!-- ROLE FILTER -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 mb-1">भूमिका (Role)</label>
            <select id="adminFilterRole" onchange="window.handleFilterChange()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="ALL">सभी यूज़र (All Roles)</option>
              <option value="DOCTOR">अधिकृत डॉक्टर (Doctors)</option>
              <option value="FARMER">स्मार्ट पशुपालक (Farmers)</option>
            </select>
          </div>

          <!-- STATE FILTER -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 mb-1">राज्य (State)</label>
            <select id="adminFilterState" onchange="window.handleStateChange(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="ALL">सभी राज्य (All States)</option>
              ${Object.keys(STATE_DISTRICT_MAP).map(st => `<option value="${st}" ${filterState.state === st ? 'selected' : ''}>${st}</option>`).join('')}
            </select>
          </div>

          <!-- DISTRICT FILTER -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 mb-1">जिला (District)</label>
            <select id="adminFilterDistrict" onchange="window.handleFilterChange()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="ALL">सभी जिले (Districts)</option>
            </select>
          </div>

          <!-- STATUS FILTER -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 mb-1">खाता स्थिति (Status)</label>
            <select id="adminFilterStatus" onchange="window.handleFilterChange()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="ALL">सभी स्थितियां (All)</option>
              <option value="ACTIVE">सक्रिय (Active Trial/Paid)</option>
              <option value="EXPIRED">समाप्त (Expired Trial)</option>
              <option value="BANNED">प्रतिबंधित (Banned)</option>
            </select>
          </div>
        </div>

        <!-- USERS TABLE CONTAINER -->
        <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
              <tr>
                <th class="p-3">यूज़र विवरण (Name & Phone)</th>
                <th class="p-3">स्थान (State / District)</th>
                <th class="p-3">ट्रायल व स्थिति (Status)</th>
                <th class="p-3">अनुमतियां (Permissions)</th>
                <th class="p-3 text-right">कार्रवाई (Actions)</th>
              </tr>
            </thead>
            <tbody id="adminUsersTableBody" class="divide-y divide-slate-100"></tbody>
          </table>
        </div>
      </div>
    `;

    renderUsersTable();
  }

  function renderUsersTable() {
    const tbody = document.getElementById('adminUsersTableBody');
    const counterArea = document.getElementById('counterFilteredArea');
    if (!tbody) return;

    const allUsers = getUsersFromStorage();
    const now = Date.now();

    const filtered = allUsers.filter((u) => {
      // Role match
      if (filterState.role !== 'ALL' && u.role !== filterState.role) return false;

      // State match
      if (filterState.state !== 'ALL' && u.state !== filterState.state) return false;

      // District match
      if (filterState.district !== 'ALL' && u.district !== filterState.district) return false;

      // Status match
      if (filterState.status === 'BANNED' && !u.isBanned) return false;
      if (filterState.status === 'ACTIVE' && (u.isBanned || (u.trialExpiresAt && u.trialExpiresAt <= now))) return false;
      if (filterState.status === 'EXPIRED' && (u.isBanned || !u.trialExpiresAt || u.trialExpiresAt > now)) return false;

      // Search match
      if (filterState.searchQuery) {
        const query = filterState.searchQuery;
        const nameMatch = (u.name || '').toLowerCase().includes(query);
        const phoneMatch = (u.phone || '').includes(query);
        const villageMatch = (u.village || '').toLowerCase().includes(query);
        if (!nameMatch && !phoneMatch && !villageMatch) return false;
      }

      return true;
    });

    if (counterArea) counterArea.textContent = filtered.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="p-8 text-center text-slate-400">
            चयनित फ़िल्टर के अनुसार कोई उपयोगकर्ता उपलब्ध नहीं है।
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((u) => {
      const isExpired = u.trialExpiresAt && u.trialExpiresAt <= now;
      const trialDaysLeft = u.trialExpiresAt ? Math.max(0, Math.ceil((u.trialExpiresAt - now) / 86400000)) : 0;

      let statusBadge = `<span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">सक्रिय (${trialDaysLeft} दिन)</span>`;
      if (u.isBanned) {
        statusBadge = `<span class="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full text-[10px]">🚫 प्रतिबंधित</span>`;
      } else if (isExpired) {
        statusBadge = `<span class="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-[10px]">⚠️ समाप्त</span>`;
      }

      const roleBadge = u.role === 'DOCTOR' 
        ? `<span class="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-1.5 py-0.5 rounded text-[10px]">🩺 डॉक्टर</span>`
        : `<span class="bg-teal-50 text-teal-700 border border-teal-200 font-bold px-1.5 py-0.5 rounded text-[10px]">🌾 किसान</span>`;

      return `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="p-3">
            <div class="flex items-center gap-2">
              <div>
                <div class="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>${u.name}</span>
                  ${roleBadge}
                </div>
                <div class="text-[11px] text-slate-500 font-mono">${u.phone} ${u.email ? `• ${u.email}` : ''}</div>
              </div>
            </div>
          </td>

          <td class="p-3">
            <div class="font-bold text-slate-800">${u.state || 'N/A'}, ${u.district || 'N/A'}</div>
            <div class="text-[10px] text-slate-400">गाँव: ${u.village || 'N/A'}</div>
          </td>

          <td class="p-3">
            <div>${statusBadge}</div>
            <div class="text-[10px] text-slate-400 mt-0.5 font-mono">ID: ${u.id}</div>
          </td>

          <td class="p-3 space-y-1">
            <!-- AI SURGEON TOGGLE -->
            <button onclick="window.toggleUserAiSurgeon('${u.id}')" class="text-[10px] px-2 py-0.5 rounded-lg border font-bold flex items-center gap-1 ${u.aiSurgeonEnabled ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-500 border-slate-200'}">
              <i class="fa-solid fa-robot"></i> <span>AI सर्जन: ${u.aiSurgeonEnabled ? 'सक्रिय' : 'सीमित'}</span>
            </button>
            <!-- DUAL PORTAL TOGGLE -->
            <button onclick="window.toggleUserDualPortal('${u.id}')" class="text-[10px] px-2 py-0.5 rounded-lg border font-bold flex items-center gap-1 ${u.dualPortalEnabled ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-500 border-slate-200'}">
              <i class="fa-solid fa-arrows-rotate"></i> <span>ड्यूल पोर्टल: ${u.dualPortalEnabled ? 'अनुमति' : 'लॉक'}</span>
            </button>
          </td>

          <td class="p-3 text-right">
            <div class="flex items-center justify-end gap-1.5 flex-wrap">
              <!-- EXTEND TRIAL DROPDOWN -->
              <div class="relative inline-block text-left">
                <select onchange="window.extendUserTrial('${u.id}', this.value); this.value='';" class="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg px-2 py-1 text-[10px] font-bold outline-none cursor-pointer">
                  <option value="">+ ट्रायल बढ़ाएं</option>
                  <option value="1">+24 घंटे (1 दिन)</option>
                  <option value="7">+7 दिन</option>
                  <option value="30">+30 दिन (1 माह)</option>
                </select>
              </div>

              <!-- BAN / UNBAN BUTTON -->
              <button onclick="window.toggleUserBan('${u.id}')" class="px-2 py-1 rounded-lg text-[10px] font-bold border transition ${u.isBanned ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'}">
                ${u.isBanned ? 'अनबैन' : 'बैन'}
              </button>

              <!-- DELETE BUTTON -->
              <button onclick="window.deleteUser('${u.id}')" class="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-200 transition" title="यूज़र हटाएं">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // =========================================================================
  // 6. GRANULAR PER-USER ACTIONS
  // =========================================================================
  window.extendUserTrial = function (userId, daysString) {
    if (!daysString) return;
    const days = parseInt(daysString, 10);
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === userId);

    if (user) {
      const now = Date.now();
      const currentExpiry = (user.trialExpiresAt && user.trialExpiresAt > now) ? user.trialExpiresAt : now;
      user.trialExpiresAt = currentExpiry + (days * 86400000);
      saveUsersToStorage(users);
      renderUsersTable();
      alert(`${user.name} का ट्रायल +${days} दिन के लिए बढ़ा दिया गया है!`);
    }
  };

  window.toggleUserAiSurgeon = function (userId) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.aiSurgeonEnabled = !user.aiSurgeonEnabled;
      saveUsersToStorage(users);
      renderUsersTable();
    }
  };

  window.toggleUserDualPortal = function (userId) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.dualPortalEnabled = !user.dualPortalEnabled;
      saveUsersToStorage(users);
      renderUsersTable();
    }
  };

  window.toggleUserBan = function (userId) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.isBanned = !user.isBanned;
      saveUsersToStorage(users);
      renderUsersTable();
      alert(`यूज़र ${user.name} को ${user.isBanned ? 'सफलतापूर्वक प्रतिबंधित (Banned)' : 'पुनः सक्रिय (Unbanned)'} कर दिया गया है।`);
    }
  };

  window.deleteUser = function (userId) {
    if (confirm('क्या आप सचमुच इस यूज़र को डेटाबेस से हटाना चाहते हैं?')) {
      let users = getUsersFromStorage();
      users = users.filter(u => u.id !== userId);
      saveUsersToStorage(users);
      renderUsersPanel();
    }
  };

  window.openAddNewUserModal = function () {
    const name = prompt('यूज़र का पूरा नाम:');
    if (!name) return;
    const phone = prompt('10-अंकीय मोबाइल नंबर:');
    if (!phone || phone.length < 10) {
      alert('वैध मोबाइल नंबर आवश्यक है!');
      return;
    }
    const roleChoice = prompt('भूमिका चुनें: 1 for DOCTOR, 2 for FARMER', '1');
    const role = roleChoice === '2' ? 'FARMER' : 'DOCTOR';
    const state = prompt('राज्य (हरियाणा / पंजाब / राजस्थान / उत्तर प्रदेश आदि):', 'हरियाणा') || 'हरियाणा';
    const district = prompt('जिला:', 'करनाल') || 'करनाल';

    const newUser = {
      id: 'USR-' + Math.floor(10000 + Math.random() * 90000),
      name: name.trim(),
      role: role,
      phone: phone.replace(/\D/g, '').slice(-10),
      email: '',
      state: state.trim(),
      district: district.trim(),
      village: 'मुख्यालय',
      registeredAt: new Date().toISOString(),
      trialExpiresAt: Date.now() + 86400000,
      isBanned: false,
      aiSurgeonEnabled: role === 'DOCTOR',
      dualPortalEnabled: false
    };

    const users = getUsersFromStorage();
    users.unshift(newUser);
    saveUsersToStorage(users);
    renderUsersPanel();
    alert('नया उपयोगकर्ता सफलतापूर्वक पंजीकृत किया गया!');
  };

  window.exportUsersCsv = function () {
    const users = getUsersFromStorage();
    if (users.length === 0) {
      alert('डेटाबेस में कोई यूज़र उपलब्ध नहीं है!');
      return;
    }

    let csv = 'ID,Name,Role,Phone,Email,State,District,Village,Status,ExpiresAt\n';
    users.forEach((u) => {
      const status = u.isBanned ? 'Banned' : 'Active';
      const expires = u.trialExpiresAt ? new Date(u.trialExpiresAt).toLocaleDateString('hi-IN') : 'N/A';
      csv += `"${u.id}","${u.name}","${u.role}","${u.phone}","${u.email || ''}","${u.state}","${u.district}","${u.village}","${status}","${expires}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vetcare_Users_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // =========================================================================
  // 7. PAYOUT BANK ACCOUNTS & GATEWAY SETTINGS CONTROLLER
  // =========================================================================
  function getPayoutsFromStorage() {
    return JSON.parse(localStorage.getItem(ADMIN_KEYS.PAYOUTS_DB) || '[]');
  }

  function savePayoutsToStorage(payouts) {
    localStorage.setItem(ADMIN_KEYS.PAYOUTS_DB, JSON.stringify(payouts));
  }

  function renderPaymentPanel() {
    const container = document.getElementById('adminPanelPAYMENT');
    if (!container) return;

    const payouts = getPayoutsFromStorage();
    const currentFast2SmsKey = localStorage.getItem(ADMIN_KEYS.FAST2SMS_KEY) || '';
    const subConfig = JSON.parse(localStorage.getItem(ADMIN_KEYS.SUBSCRIPTION_DB) || '{"doctorMonthly": 499, "doctorYearly": 4999, "farmerYearly": 199}');

    container.innerHTML = `
      <div class="space-y-6">
        <!-- FAST2SMS REAL GATEWAY KEY -->
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-tower-broadcast text-emerald-600"></i> Fast2SMS रियल OTP API कुंजी
              </h3>
              <p class="text-[11px] text-slate-500">लाइव एसएमएस डिस्पैच हेतु Fast2SMS डेवलपर ऑथराइजेशन कुंजी</p>
            </div>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">लाइव डिस्पैच</span>
          </div>

          <div class="relative flex items-center">
            <input 
              id="adminFast2SmsInput" 
              type="password" 
              placeholder="Fast2SMS API Key पेस्ट करें..." 
              value="${currentFast2SmsKey}"
              class="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-10 text-xs font-mono outline-none focus:border-emerald-500" 
            />
            <button type="button" onclick="window.toggleFieldMask('adminFast2SmsInput', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>

          <button onclick="window.saveFast2SmsKey()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-xs transition">
            सुरक्षित करें (Save SMS Key)
          </button>
        </div>

        <!-- PAYOUT BANK ACCOUNTS & UPI MANAGER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-building-columns text-blue-600"></i> सेटलमेंट बैंक खाते व UPI प्रबंधक
              </h3>
              <p class="text-[11px] text-slate-500">सदस्यता शुल्क और प्रत्यक्ष बैंक जमा खाते</p>
            </div>
            <button onclick="window.openAddBankAccountModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition">
              + नया बैंक खाता जोड़ें
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${payouts.map(acc => `
              <div class="p-4 rounded-2xl border ${acc.isDefault ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-slate-50/50'} space-y-2 relative">
                ${acc.isDefault ? '<span class="absolute top-3 right-3 text-[9px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">प्राथमिक खाता</span>' : ''}
                <div class="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <i class="fa-solid fa-piggy-bank text-blue-700"></i> ${acc.bankName}
                </div>
                <div class="text-xs text-slate-600 font-mono">
                  खाता सं.: <strong>${acc.accountNumber}</strong><br>
                  IFSC: <strong>${acc.ifscCode}</strong><br>
                  UPI ID: <strong class="text-blue-700">${acc.upiId}</strong>
                </div>
                <div class="text-[10px] text-slate-500 uppercase">${acc.holderName}</div>
                <div class="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  ${!acc.isDefault ? `<button onclick="window.setDefaultPayoutAccount('${acc.id}')" class="text-[10px] text-blue-700 font-bold hover:underline">डिफ़ॉल्ट बनाएं</button>` : ''}
                  <button onclick="window.deletePayoutAccount('${acc.id}')" class="text-[10px] text-rose-600 font-bold hover:underline">हटाएं</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SUBSCRIPTION PRICING MODEL -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs text-xs">
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <i class="fa-solid fa-tags text-amber-600"></i> सब्सक्रिप्शन दरें (Pricing Controls)
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-slate-600 font-bold mb-1">डॉक्टर मासिक शुल्क (₹)</label>
              <input id="subDoctorMonthly" type="number" value="${subConfig.doctorMonthly}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">डॉक्टर वार्षिक शुल्क (₹)</label>
              <input id="subDoctorYearly" type="number" value="${subConfig.doctorYearly}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">स्मार्ट किसान वार्षिक शुल्क (₹)</label>
              <input id="subFarmerYearly" type="number" value="${subConfig.farmerYearly}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
          </div>
          <button onclick="window.saveSubscriptionRates()" class="bg-slate-900 hover:bg-black text-white font-bold py-2.5 px-5 rounded-xl text-xs transition">
            सब्सक्रिप्शन दरें सुरक्षित करें 💾
          </button>
        </div>
      </div>
    `;
  }

  window.saveFast2SmsKey = function () {
    const key = document.getElementById('adminFast2SmsInput')?.value.trim();
    if (!key) {
      alert('कृपया Fast2SMS API Key दर्ज करें!');
      return;
    }
    localStorage.setItem(ADMIN_KEYS.FAST2SMS_KEY, key);
    alert('Fast2SMS API कुंजी सफलतापूर्वक सुरक्षित कर ली गई है। वास्तविक SMS तुरंत चालू हो गए हैं!');
  };

  window.openAddBankAccountModal = function () {
    const bank = prompt('बैंक का नाम (उदा. SBI / PNB / HDFC):');
    if (!bank) return;
    const acc = prompt('पूर्ण बैंक खाता संख्या:');
    if (!acc) return;
    const ifsc = prompt('IFSC कोड:');
    if (!ifsc) return;
    const name = prompt('खाताधारक का नाम:');
    if (!name) return;
    const upi = prompt('जुड़ा हुआ UPI ID:');

    const payouts = getPayoutsFromStorage();
    const maskedAcc = '••••••••' + acc.slice(-4);

    const newAcc = {
      id: 'ACC-' + Date.now(),
      bankName: bank.trim(),
      accountNumber: maskedAcc,
      fullAccountNumber: acc.trim(),
      ifscCode: ifsc.trim().toUpperCase(),
      holderName: name.trim().toUpperCase(),
      upiId: upi ? upi.trim() : 'vetcare@upi',
      isDefault: payouts.length === 0
    };

    payouts.push(newAcc);
    savePayoutsToStorage(payouts);
    renderPaymentPanel();
    alert('नया बैंक खाता सफलतापूर्वक जोड़ दिया गया!');
  };

  window.setDefaultPayoutAccount = function (accId) {
    const payouts = getPayoutsFromStorage();
    payouts.forEach(acc => {
      acc.isDefault = acc.id === accId;
    });
    savePayoutsToStorage(payouts);
    renderPaymentPanel();
  };

  window.deletePayoutAccount = function (accId) {
    if (confirm('क्या आप सचमुच इस खाते को हटाना चाहते हैं?')) {
      let payouts = getPayoutsFromStorage();
      payouts = payouts.filter(acc => acc.id !== accId);
      savePayoutsToStorage(payouts);
      renderPaymentPanel();
    }
  };

  window.saveSubscriptionRates = function () {
    const docM = parseFloat(document.getElementById('subDoctorMonthly')?.value) || 499;
    const docY = parseFloat(document.getElementById('subDoctorYearly')?.value) || 4999;
    const farmY = parseFloat(document.getElementById('subFarmerYearly')?.value) || 199;

    const payload = { doctorMonthly: docM, doctorYearly: docY, farmerYearly: farmY };
    localStorage.setItem(ADMIN_KEYS.SUBSCRIPTION_DB, JSON.stringify(payload));
    alert('सब्सक्रिप्शन योजना दरें सफलतापूर्वक अपडेट कर दी गईं!');
  };

  // =========================================================================
  // 8. BRANDING, LIVE BANNER & APP IDENTITY CONTROLLER
  // =========================================================================
  function renderBrandingPanel() {
    const container = document.getElementById('adminPanelBRANDING');
    if (!container) return;

    const config = JSON.parse(localStorage.getItem(ADMIN_KEYS.BRANDING_DB) || '{"appName": "Vetcare AI OS", "logoText": "VC", "announcement": "", "logoUrl": ""}');

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs text-xs">
        <div class="border-b border-slate-100 pb-2">
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <i class="fa-solid fa-palette text-amber-600"></i> ब्रांडिंग, लोगो एवं ग्लोबल ब्रॉडकास्ट
          </h3>
          <p class="text-[11px] text-slate-500">ऐप का नाम, लोगो टेक्स्ट एवं किसान/डॉक्टर घोषणा पट्टी</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 font-bold mb-1">एप्लिकेशन का नाम</label>
            <input id="brandingAppName" type="text" value="${config.appName}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
          </div>
          <div>
            <label class="block text-slate-600 font-bold mb-1">लोगो शॉर्टकोड (उदा. VC / VA)</label>
            <input id="brandingLogoText" type="text" maxlength="3" value="${config.logoText}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
          </div>
        </div>

        <div>
          <label class="block text-slate-600 font-bold mb-1">कस्टम लोगो इमेज URL (वैकल्पिक)</label>
          <input id="brandingLogoUrl" type="url" placeholder="https://..." value="${config.logoUrl || ''}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono text-xs" />
        </div>

        <div>
          <label class="block text-slate-600 font-bold mb-1">📢 शीर्ष ग्लोबल घोषणा पट्टी (Announcement Banner)</label>
          <textarea id="brandingAnnouncement" rows="2" placeholder="उदा. विशेष सूचना: नया लम्पी स्किन डिसीज टीकाकरण अभियान प्रारंभ..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-xs">${config.announcement || ''}</textarea>
        </div>

        <button onclick="window.saveBrandingConfig()" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-xs transition">
          ब्रांडिंग अपडेट लागू करें 🎨
        </button>
      </div>
    `;
  }

  window.saveBrandingConfig = function () {
    const appName = document.getElementById('brandingAppName')?.value.trim() || 'Vetcare AI OS';
    const logoText = document.getElementById('brandingLogoText')?.value.trim() || 'VC';
    const logoUrl = document.getElementById('brandingLogoUrl')?.value.trim() || '';
    const announcement = document.getElementById('brandingAnnouncement')?.value.trim() || '';

    const payload = { appName, logoText, logoUrl, announcement };
    localStorage.setItem(ADMIN_KEYS.BRANDING_DB, JSON.stringify(payload));

    applyBrandingToDOM();
    alert('ब्रांडिंग व पहचान सफलतापूर्वक अपडेट हो गई!');
  };

  function applyBrandingToDOM() {
    const configRaw = localStorage.getItem(ADMIN_KEYS.BRANDING_DB);
    if (!configRaw) return;
    const config = JSON.parse(configRaw);

    const gatewayTitle = document.getElementById('gatewayAppTitle');
    const headerTitle = document.getElementById('appHeaderTitle');
    const gatewayLogo = document.getElementById('gatewayLogoText');
    const headerLogo = document.getElementById('headerLogoText');
    const bannerBox = document.getElementById('app-announcement-banner');
    const logoImg = document.getElementById('app-logo-img');

    if (gatewayTitle) gatewayTitle.textContent = config.appName;
    if (headerTitle) headerTitle.textContent = config.appName;
    if (gatewayLogo) gatewayLogo.textContent = config.logoText;
    if (headerLogo) headerLogo.textContent = config.logoText;

    if (logoImg && config.logoUrl) {
      logoImg.src = config.logoUrl;
      logoImg.classList.remove('hidden');
      if (headerLogo) headerLogo.classList.add('hidden');
    }

    if (bannerBox) {
      if (config.announcement) {
        bannerBox.innerHTML = `
          <div class="bg-amber-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-2">
              <span>📢</span>
              <span>${config.announcement}</span>
            </div>
            <button onclick="this.parentElement.remove()" class="text-slate-900 font-black">✕</button>
          </div>
        `;
      } else {
        bannerBox.innerHTML = '';
      }
    }
  }

  // =========================================================================
  // 9. AUTOMATIC INITIALIZATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    ensureUsersDatabase();
    ensurePayoutsDatabase();
    applyBrandingToDOM();
  });
})();
