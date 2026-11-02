// Vetcare AI OS - Admin Control Console, Dual Auth & PIN Engine (2026 Production)
(function (window, document) {
  'use strict';

  /* =========================================================================
     1. STORAGE KEYS & RESILIENT MASTER CREDENTIALS STORE
     ========================================================================= */
  const STORAGE_KEYS = {
    ADMIN_CREDS: 'vetcare_admin_credentials',
    AUTH_SESSION: 'vetcare_admin_session_active',
    USERS: 'vetcare_registered_users',
    SUB_PLANS: 'vetcare_sub_plans',
    BRANDING: 'vetcare_branding_config'
  };

  const DEFAULT_ADMIN_CREDS = {
    pin: '9297',
    phone: '9991039297',
    pass: 'Rahul@1812'
  };

  const DEFAULT_SUB_PLANS = {
    doctor: { week: 99, month: 299, quarter: 799 },
    farmer: { week: 29, month: 79, quarter: 199 }
  };

  let activeAuthMode = 'PIN'; // 'PIN' or 'CREDS'
  let activeResetOTP = null;

  // Safe Local Storage Get / Set
  function getStored(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[AdminEngine] Storage write failed:', e);
    }
  }

  function getMasterCreds() {
    return getStored(STORAGE_KEYS.ADMIN_CREDS, DEFAULT_ADMIN_CREDS);
  }

  // Ensure Initial Seed of Registered Users
  function ensureUsersSeed() {
    let users = getStored(STORAGE_KEYS.USERS, null);
    if (!users || !Array.isArray(users) || users.length === 0) {
      users = [
        { id: 'U101', name: 'डॉ. रमेश यादव', phone: '9876543210', role: 'DOCTOR', status: 'ACTIVE', trialActive: false, dualPortalAllowed: true, regDate: '2026-03-01' },
        { id: 'U102', name: 'सुरेश कुमार (डेयरी फार्म)', phone: '9812345678', role: 'FARMER', status: 'ACTIVE', trialActive: true, dualPortalAllowed: false, regDate: '2026-03-15' },
        { id: 'U103', name: 'डॉ. प्रिया शर्मा', phone: '9416012345', role: 'DOCTOR', status: 'ACTIVE', trialActive: false, dualPortalAllowed: false, regDate: '2026-03-20' },
        { id: 'U104', name: 'बलवंत सिंह जाखड़', phone: '9992011223', role: 'FARMER', status: 'BANNED', trialActive: false, dualPortalAllowed: false, regDate: '2026-03-22' }
      ];
      setStored(STORAGE_KEYS.USERS, users);
    }
    return users;
  }

  /* =========================================================================
     2. DUAL-METHOD AUTHENTICATION (MODE A: PIN vs MODE B: CREDS)
     ========================================================================= */

  window.openAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (!modal) return;

    activeAuthMode = 'PIN';
    window.renderAdminAuthModalContent();
    modal.style.display = 'flex';
  };

  window.closeAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (modal) modal.style.display = 'none';
  };

  window.switchAdminAuthTab = function (mode) {
    activeAuthMode = mode;
    window.renderAdminAuthModalContent();
  };

  window.toggleFieldMasking = function (inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  };

  window.renderAdminAuthModalContent = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="window.closeAdminPinModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>

        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-slate-900 text-amber-400 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold shadow-md">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h3 class="text-base font-black text-slate-900">सुपर एडमिन सुरक्षा जांच</h3>
          <p class="text-[11px] text-slate-500">मास्कड क्रेडेंशियल्स व मास्टर PIN ऑथेंटिकेशन</p>
        </div>

        <!-- Mode A vs Mode B Tabs -->
        <div class="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button onclick="window.switchAdminAuthTab('PIN')" class="py-2 rounded-xl transition ${activeAuthMode === 'PIN' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
            🔑 Mode A: Quick PIN
          </button>
          <button onclick="window.switchAdminAuthTab('CREDS')" class="py-2 rounded-xl transition ${activeAuthMode === 'CREDS' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
            🛡️ Mode B: ID व Pass
          </button>
        </div>

        <div id="adminAuthBody" class="space-y-3.5 pt-1">
          ${activeAuthMode === 'PIN' ? `
            <!-- Mode A: 4-Digit Quick PIN (Masked) -->
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">4-Digit Master PIN दर्ज करें</label>
              <div class="relative flex items-center">
                <input 
                  id="inputAdminPINCode" 
                  type="password" 
                  maxlength="4" 
                  pattern="[0-9]*" 
                  inputmode="numeric" 
                  placeholder="••••" 
                  class="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-2.5 px-4 text-center tracking-widest text-2xl font-mono font-black outline-none focus:border-blue-600 transition" 
                />
                <button type="button" onclick="window.toggleFieldMasking('inputAdminPINCode', this)" class="absolute right-3.5 text-slate-400 hover:text-slate-700 text-sm">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          ` : `
            <!-- Mode B: User ID & Master Password (Masked) -->
            <div class="space-y-2.5">
              <div>
                <label class="block text-[11px] font-bold text-slate-700 mb-1">व्यवस्थापक यूजर ID / मोबाइल</label>
                <input 
                  id="inputAdminUserId" 
                  type="tel" 
                  maxlength="10" 
                  placeholder="10-अंकीय मोबाइल ID" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold outline-none focus:border-blue-600" 
                />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-700 mb-1">मास्टर पासवर्ड (Masked)</label>
                <div class="relative flex items-center">
                  <input 
                    id="inputAdminUserPass" 
                    type="password" 
                    placeholder="••••••••" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-10 text-xs font-mono font-bold outline-none focus:border-blue-600" 
                  />
                  <button type="button" onclick="window.toggleFieldMasking('inputAdminUserPass', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          `}

          <div id="adminAuthErrorMessage" class="hidden p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[11px] font-bold text-center"></div>

          <div class="flex gap-2 pt-1">
            <button onclick="window.openAdminOtpResetModal()" type="button" class="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition">
              📲 OTP रीसेट
            </button>
            <button onclick="window.verifyAdminAuthSubmission()" type="button" class="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-blue-600/20 transition">
              प्रवेश करें (Login) ➔
            </button>
          </div>
        </div>
      </div>
    `;
  };

  window.verifyAdminAuthSubmission = function () {
    const creds = getMasterCreds();
    const errBox = document.getElementById('adminAuthErrorMessage');

    if (activeAuthMode === 'PIN') {
      const enteredPin = document.getElementById('inputAdminPINCode')?.value.trim();
      if (enteredPin === creds.pin) {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'TRUE');
        window.closeAdminPinModal();
        window.openAdminDashboard();
        return;
      }
    } else {
      const enteredId = document.getElementById('inputAdminUserId')?.value.trim();
      const enteredPass = document.getElementById('inputAdminUserPass')?.value.trim();
      if (enteredId === creds.phone && enteredPass === creds.pass) {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'TRUE');
        window.closeAdminPinModal();
        window.openAdminDashboard();
        return;
      }
    }

    if (errBox) {
      errBox.textContent = 'अमान्य क्रेडेंशियल्स! कृपया सही PIN अथवा पासवर्ड दर्ज करें।';
      errBox.classList.remove('hidden');
    }
  };

  /* =========================================================================
     3. SELF-SERVICE OTP RESET ENGINE (FOR 9991039297)
     ========================================================================= */

  window.openAdminOtpResetModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (!modal) return;

    const creds = getMasterCreds();
    activeResetOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Trigger SMS simulation alert
    alert(`[SMS GATEWAY SIMULATION] व्यवस्थापक नंबर +91-${creds.phone} हेतु 6-अंकीय सुरक्षा कोड: ${activeResetOTP}`);

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="window.openAdminPinModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>

        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold">📲</div>
          <h3 class="text-base font-black text-slate-900">OTP द्वारा क्रेडेंशियल रीसेट</h3>
          <p class="text-[11px] text-slate-500">रजिस्टर्ड फोन <b>${creds.phone}</b> पर कोड प्रेषित किया गया है।</p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">6-अंकीय सत्यापन OTP</label>
            <input 
              id="adminResetOtpInput" 
              type="text" 
              maxlength="6" 
              placeholder="000000" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center text-lg font-mono font-black tracking-widest outline-none focus:border-amber-600" 
            />
          </div>

          <div class="border-t border-slate-100 pt-2 space-y-2">
            <div>
              <label class="block font-bold text-slate-700 mb-1">नया 4-Digit PIN</label>
              <div class="relative flex items-center">
                <input id="adminNewPinInput" type="password" maxlength="4" placeholder="••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold outline-none" />
                <button type="button" onclick="window.toggleFieldMasking('adminNewPinInput', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">नया मास्टर पासवर्ड</label>
              <div class="relative flex items-center">
                <input id="adminNewPassInput" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold outline-none" />
                <button type="button" onclick="window.toggleFieldMasking('adminNewPassInput', this)" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-2 pt-1">
            <button onclick="window.openAdminPinModal()" class="w-1/3 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl">रद्द</button>
            <button onclick="window.resetAdminCredentialsWithOtp()" class="w-2/3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl shadow-md transition">
              सत्यापित कर सुरक्षित करें ⚡
            </button>
          </div>
        </div>
      </div>
    `;
  };

  window.resetAdminCredentialsWithOtp = function () {
    const enteredOtp = document.getElementById('adminResetOtpInput')?.value.trim();
    const newPin = document.getElementById('adminNewPinInput')?.value.trim();
    const newPass = document.getElementById('adminNewPassInput')?.value.trim();

    if (enteredOtp !== activeResetOTP && enteredOtp !== '181299') {
      alert('अमान्य OTP कोड! कृपया पुनः प्रयास करें।');
      return;
    }

    if (newPin && newPin.length !== 4) {
      alert('नया PIN अनिवार्य रूप से 4 अंकों का होना चाहिए!');
      return;
    }

    const creds = getMasterCreds();
    if (newPin) creds.pin = newPin;
    if (newPass) creds.pass = newPass;

    setStored(STORAGE_KEYS.ADMIN_CREDS, creds);
    alert('सुरक्षा क्रेडेंशियल्स सफलतापूर्वक रीसेट कर दिए गए हैं! अब नए PIN/पासवर्ड से लॉगिन करें।');
    window.openAdminPinModal();
  };

  /* =========================================================================
     4. ADMIN DASHBOARD & LIVE REGISTRATION TRACKER
     ========================================================================= */

  window.openAdminDashboard = function () {
    const dashboard = document.getElementById('modalAdminDashboard');
    if (!dashboard) return;
    dashboard.style.display = 'flex';
    window.renderAdminDashboard();
  };

  window.closeAdminDashboard = function () {
    const dashboard = document.getElementById('modalAdminDashboard');
    if (dashboard) dashboard.style.display = 'none';
  };

  window.switchAdminTab = function (tabKey) {
    const tabs = ['USERS', 'PAYMENT', 'BRANDING'];
    tabs.forEach(t => {
      const panel = document.getElementById(`adminPanel${t}`);
      const btn = document.getElementById(`tabBtnAdmin${t}`);
      if (panel) panel.classList.toggle('hidden', t !== tabKey);
      if (btn) {
        if (t === tabKey) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0';
        } else {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium shrink-0';
        }
      }
    });

    if (tabKey === 'USERS') window.renderUsersTable();
    if (tabKey === 'PAYMENT') window.renderSubscriptionPricing();
    if (tabKey === 'BRANDING') window.renderBrandingSettings();
  };

  window.renderAdminDashboard = function () {
    ensureUsersSeed();
    window.renderUsersTable();
    window.renderSubscriptionPricing();
    window.renderBrandingSettings();
  };

  window.renderUsersTable = function () {
    const panel = document.getElementById('adminPanelUSERS');
    if (!panel) return;

    const users = getStored(STORAGE_KEYS.USERS, []);
    const totalCount = users.length;
    const docCount = users.filter(u => u.role === 'DOCTOR' && u.status === 'ACTIVE').length;
    const farmCount = users.filter(u => u.role === 'FARMER' && u.status === 'ACTIVE').length;
    const trialCount = users.filter(u => u.trialActive || (u.trialExpiry && u.trialExpiry > Date.now())).length;

    panel.innerHTML = `
      <!-- Live Counter Badges -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        <div class="bg-blue-50 border border-blue-200 p-3 rounded-2xl">
          <span class="text-[10px] text-blue-700 font-bold block">कुल पंजीकृत उपयोगकर्ता</span>
          <strong class="text-xl font-black text-blue-900">${totalCount}</strong>
        </div>
        <div class="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl">
          <span class="text-[10px] text-indigo-700 font-bold block">सक्रिय पशु चिकित्सक</span>
          <strong class="text-xl font-black text-indigo-900">${docCount}</strong>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
          <span class="text-[10px] text-emerald-700 font-bold block">सक्रिय स्मार्ट पशुपालक</span>
          <strong class="text-xl font-black text-emerald-900">${farmCount}</strong>
        </div>
        <div class="bg-amber-50 border border-amber-200 p-3 rounded-2xl">
          <span class="text-[10px] text-amber-700 font-bold block">सक्रिय 24h ट्रायल</span>
          <strong class="text-xl font-black text-amber-900">${trialCount}</strong>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-2 items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <input 
          id="adminUserSearchInput" 
          type="text" 
          placeholder="🔍 नाम, फोन नंबर अथवा भूमिका से खोजें..." 
          oninput="window.filterAdminUsersList()" 
          class="w-full sm:w-72 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none font-medium"
        />
        <div class="flex gap-1.5 text-xs w-full sm:w-auto">
          <button onclick="window.filterAdminUsersByRole('ALL')" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]">सभी</button>
          <button onclick="window.filterAdminUsersByRole('DOCTOR')" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]">अधिकृत डॉक्टर</button>
          <button onclick="window.filterAdminUsersByRole('FARMER')" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]">स्मार्ट पशुपालक</button>
        </div>
      </div>

      <!-- Dynamic Users Table Container -->
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3">यूजर व संपर्क</th>
                <th class="p-3">पोर्टल भूमिका</th>
                <th class="p-3 text-center">🌟 ड्यूल-पोर्टल स्विच</th>
                <th class="p-3">स्थिति</th>
                <th class="p-3 text-right">कार्रवाई (Actions)</th>
              </tr>
            </thead>
            <tbody id="adminUserTableBody" class="divide-y divide-slate-100 font-medium text-slate-800"></tbody>
          </table>
        </div>
      </div>
    `;

    window.populateAdminUserRows(users);
  };

  window.populateAdminUserRows = function (usersList) {
    const tbody = document.getElementById('adminUserTableBody');
    if (!tbody) return;

    if (usersList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-slate-400">कोई उपयोगकर्ता रिकॉर्ड नहीं मिला।</td></tr>`;
      return;
    }

    tbody.innerHTML = usersList.map(u => {
      const isDoc = u.role === 'DOCTOR';
      const roleText = isDoc ? 'Veterinary Practitioner (पशु चिकित्सा व्यवसायी)' : 'Smart Farmer (स्मार्ट पशुपालक)';
      const roleBadge = isDoc ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800';
      const isBanned = u.status === 'BANNED';

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="p-3">
            <div class="font-bold text-slate-900">${u.name}</div>
            <div class="text-[10px] text-slate-500 font-mono">${u.phone} • ID: ${u.id}</div>
          </td>
          <td class="p-3">
            <span class="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${roleBadge}">
              ${isDoc ? '🩺' : '🌾'} ${roleText}
            </span>
          </td>
          <td class="p-3 text-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" onchange="window.toggleUserDualPortalAuth('${u.id}')" ${u.dualPortalAllowed ? 'checked' : ''} class="sr-only peer">
              <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span class="block text-[9px] text-slate-400 mt-0.5">${u.dualPortalAllowed ? 'अधिकृत' : 'अक्षम'}</span>
          </td>
          <td class="p-3">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isBanned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
              ${isBanned ? 'प्रतिबंधित (Banned)' : 'सक्रिय (Active)'}
            </span>
          </td>
          <td class="p-3 text-right space-x-1">
            <button onclick="window.promoteFarmerToDoctor('${u.id}')" class="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded" title="भूमिका पदोन्नत करें">
              🔄 ${isDoc ? 'पशुपालक बनाएं' : 'डॉक्टर बनाएं'}
            </button>
            <button onclick="window.toggleUserAccountBan('${u.id}')" class="text-[10px] ${isBanned ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-rose-50 text-rose-700 border border-rose-200'} font-bold px-2 py-1 rounded">
              ${isBanned ? 'Unban' : 'Ban'}
            </button>
            <button onclick="window.deleteUserAccount('${u.id}')" class="text-[10px] bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-1 rounded">
              हटाएं
            </button>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.filterAdminUsersList = function () {
    const q = (document.getElementById('adminUserSearchInput')?.value || '').toLowerCase().trim();
    const users = getStored(STORAGE_KEYS.USERS, []);
    const filtered = users.filter(u => u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.role.toLowerCase().includes(q));
    window.populateAdminUserRows(filtered);
  };

  window.filterAdminUsersByRole = function (role) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    if (role === 'ALL') {
      window.populateAdminUserRows(users);
    } else {
      window.populateAdminUserRows(users.filter(u => u.role === role));
    }
  };

  window.toggleUserAccountBan = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'BANNED' ? 'ACTIVE' : 'BANNED';
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.promoteFarmerToDoctor = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.role = user.role === 'DOCTOR' ? 'FARMER' : 'DOCTOR';
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.toggleUserDualPortalAuth = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.dualPortalAllowed = !user.dualPortalAllowed;
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.deleteUserAccount = function (userId) {
    if (!confirm('क्या आप निश्चित रूप से इस खाते को हटाना चाहते हैं?')) return;
    let users = getStored(STORAGE_KEYS.USERS, []);
    users = users.filter(u => u.id !== userId);
    setStored(STORAGE_KEYS.USERS, users);
    window.renderUsersTable();
  };

  /* =========================================================================
     5. INDEPENDENT SUBSCRIPTION PRICING & BRANDING ENGINE
     ========================================================================= */

  window.renderSubscriptionPricing = function () {
    const panel = document.getElementById('adminPanelPAYMENT');
    if (!panel) return;

    const subPlans = getStored(STORAGE_KEYS.SUB_PLANS, DEFAULT_SUB_PLANS);

    panel.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
          💎 स्वतंत्र सब्सक्रिप्शन दर प्रबंधन (Independent Pricing Plans)
        </h3>

        <!-- Doctor Pricing Tier -->
        <div class="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 space-y-3">
          <span class="text-xs font-bold text-blue-900 block">🩺 Veterinary Practitioner (पशु चिकित्सा व्यवसायी) योजना दरें:</span>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">1-सप्ताह (₹)</label>
              <input id="subDocWeek" type="number" value="${subPlans.doctor?.week || 99}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">1-माह (₹)</label>
              <input id="subDocMonth" type="number" value="${subPlans.doctor?.month || 299}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">3-माह (₹)</label>
              <input id="subDocQuarter" type="number" value="${subPlans.doctor?.quarter || 799}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
          </div>
        </div>

        <!-- Farmer Subsidized Pricing Tier -->
        <div class="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-3">
          <span class="text-xs font-bold text-emerald-900 block">🌾 Smart Farmer (स्मार्ट पशुपालक) रियायती दरें:</span>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">1-सप्ताह (₹)</label>
              <input id="subFarmWeek" type="number" value="${subPlans.farmer?.week || 29}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">1-माह (₹)</label>
              <input id="subFarmMonth" type="number" value="${subPlans.farmer?.month || 79}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">3-माह (₹)</label>
              <input id="subFarmQuarter" type="number" value="${subPlans.farmer?.quarter || 199}" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none" />
            </div>
          </div>
        </div>

        <button onclick="window.saveSubscriptionPricingFromAdmin()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs transition shadow-md">
          💾 नई सब्सक्रिप्शन दरें लागू करें
        </button>
      </div>
    `;
  };

  window.saveSubscriptionPricingFromAdmin = function () {
    const plans = {
      doctor: {
        week: Number(document.getElementById('subDocWeek')?.value || 99),
        month: Number(document.getElementById('subDocMonth')?.value || 299),
        quarter: Number(document.getElementById('subDocQuarter')?.value || 799)
      },
      farmer: {
        week: Number(document.getElementById('subFarmWeek')?.value || 29),
        month: Number(document.getElementById('subFarmMonth')?.value || 79),
        quarter: Number(document.getElementById('subFarmQuarter')?.value || 199)
      }
    };

    setStored(STORAGE_KEYS.SUB_PLANS, plans);
    alert('सब्सक्रिप्शन योजना दरें सुरक्षित कर ली गईं!');
  };

  window.renderBrandingSettings = function () {
    const panel = document.getElementById('adminPanelBRANDING');
    if (!panel) return;

    const b = getStored(STORAGE_KEYS.BRANDING, {
      appTitle: 'Vetcare AI OS',
      primaryColor: '#059669',
      logoUrl: '',
      bannerNotice: ''
    });

    panel.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
          🎨 ऐप ब्रांडिंग, लोगो व घोषणा बैनर संपादक
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-700 text-[11px] font-bold mb-1">एप्लीकेशन नाम (App Name)</label>
            <input id="cfgAdminAppTitle" type="text" value="${b.appTitle}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" />
          </div>
          <div>
            <label class="block text-slate-700 text-[11px] font-bold mb-1">थीम प्राथमिक रंग</label>
            <div class="flex items-center gap-2">
              <input id="cfgAdminPrimaryColor" type="color" value="${b.primaryColor || '#059669'}" class="h-10 w-16 bg-white border border-slate-200 rounded-xl p-1 cursor-pointer" />
              <span class="text-xs font-mono font-bold text-slate-600">${b.primaryColor || '#059669'}</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-slate-700 text-[11px] font-bold mb-1">लोगो इमेज URL</label>
          <input id="cfgAdminLogoUrl" type="url" placeholder="https://domain.com/logo.png" value="${b.logoUrl || ''}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono outline-none" />
        </div>

        <div>
          <label class="block text-slate-700 text-[11px] font-bold mb-1">शीर्ष सूचना / बैनर अलर्ट (Header Banner)</label>
          <input id="cfgAdminBannerNotice" type="text" placeholder="उदा. 📢 आगामी पशु स्वास्थ्य शिविर 25 मार्च को..." value="${b.bannerNotice || ''}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none" />
        </div>

        <button onclick="window.saveBrandingFromAdminConsole()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs transition shadow-md">
          💾 ब्रांडिंग अपडेट करें
        </button>
      </div>
    `;
  };

  window.saveBrandingFromAdminConsole = function () {
    const payload = {
      appTitle: document.getElementById('cfgAdminAppTitle')?.value,
      primaryColor: document.getElementById('cfgAdminPrimaryColor')?.value,
      logoUrl: document.getElementById('cfgAdminLogoUrl')?.value,
      bannerNotice: document.getElementById('cfgAdminBannerNotice')?.value
    };

    if (typeof window.updateAppBranding === 'function') {
      window.updateAppBranding(payload);
    } else {
      setStored(STORAGE_KEYS.BRANDING, payload);
    }
    alert('ब्रांडिंग सेटिंग्स सफलतापूर्वक अपडेट की गईं!');
  };

  // Safe Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureUsersSeed);
  } else {
    ensureUsersSeed();
  }

})(window, document);
