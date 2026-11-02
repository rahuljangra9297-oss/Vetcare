// Vetcare AI OS - Admin Control Console & Branding Manager (2026 Production)
(function (window, document) {
  'use strict';

  // Secure Master Admin Authentication Credentials
  const ADMIN_CREDENTIALS = {
    phone: '9991039297',
    pass: 'Rahul@1812'
  };

  const STORAGE_KEYS = {
    AUTH_SESSION: 'vetcare_admin_authenticated',
    USERS: 'vetcare_registered_users',
    SUB_PLANS: 'vetcare_sub_plans',
    BRANDING: 'vetcare_branding_config'
  };

  const DEFAULT_SUB_PLANS = {
    doctor: { week: 99, month: 299, quarter: 799 },
    farmer: { week: 29, month: 79, quarter: 199 }
  };

  let simulatedGeneratedOTP = null;

  // Safe Local Storage Readers & Writers
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
      console.error('[AdminConsole] LocalStorage write error:', e);
    }
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
     1. MASKED ADMIN AUTHENTICATION & MOBILE OTP SIMULATION
     ========================================================================= */

  window.openAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="window.closeAdminPinModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold shadow-xs">🔒</div>
          <h3 class="text-base font-black text-slate-900">Vetcare AI OS • सुपर एडमिन प्रवेश</h3>
          <p class="text-[11px] text-slate-500">मास्कड क्रेडेंशियल्स व OTP सत्यापन प्रणाली</p>
        </div>

        <div id="adminLoginForm" class="space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">व्यवस्थापक मोबाइल आईडी (10 अंक)</label>
            <input id="adminLoginPhone" type="tel" maxlength="10" placeholder="9991039297" value="${ADMIN_CREDENTIALS.phone}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold outline-none focus:border-blue-600" />
          </div>

          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">मास्टर पासवर्ड (Masked)</label>
            <div class="relative flex items-center">
              <input id="adminLoginPass" type="password" placeholder="••••••••" value="${ADMIN_CREDENTIALS.pass}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-10 text-xs font-mono font-bold outline-none focus:border-blue-600" />
              <button type="button" onclick="window.toggleAdminPassVisibility()" class="absolute right-3 text-slate-500 hover:text-slate-800 text-xs">👁️</button>
            </div>
          </div>

          <div id="adminLoginError" class="hidden text-rose-600 text-[11px] font-bold"></div>

          <div class="flex gap-2 pt-1">
            <button onclick="window.requestAdminResetOTP()" type="button" class="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition">
              📲 OTP रीसेट
            </button>
            <button onclick="window.verifyAdminCredentials()" type="button" class="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-blue-600/30 transition">
              लॉगिन करें ➔
            </button>
          </div>
        </div>

        <div id="adminOtpSection" class="hidden space-y-3 border-t border-slate-100 pt-3">
          <div class="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-tight">
            <span>📢 रजिस्टर्ड नंबर <b>${ADMIN_CREDENTIALS.phone}</b> पर 6-अंकीय OTP भेजा गया है।</span>
          </div>
          <input id="adminOtpInput" type="text" maxlength="6" placeholder="000000" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center text-lg font-mono tracking-widest font-black outline-none focus:border-amber-600" />
          <button onclick="window.verifyAdminOTP()" type="button" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm">
            OTP सत्यापित कर अनलॉक करें ⚡
          </button>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  };

  window.closeAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (modal) modal.style.display = 'none';
  };

  window.toggleAdminPassVisibility = function () {
    const passInput = document.getElementById('adminLoginPass');
    if (passInput) {
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
    }
  };

  window.verifyAdminCredentials = function () {
    const phoneInput = document.getElementById('adminLoginPhone');
    const passInput = document.getElementById('adminLoginPass');
    const errBox = document.getElementById('adminLoginError');

    const enteredPhone = phoneInput ? phoneInput.value.trim() : '';
    const enteredPass = passInput ? passInput.value.trim() : '';

    if (enteredPhone === ADMIN_CREDENTIALS.phone && enteredPass === ADMIN_CREDENTIALS.pass) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'TRUE');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      if (errBox) {
        errBox.textContent = 'अमान्य एडमिन ID अथवा पासवर्ड! पुनः प्रयास करें।';
        errBox.classList.remove('hidden');
      }
    }
  };

  window.requestAdminResetOTP = function () {
    simulatedGeneratedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpSection = document.getElementById('adminOtpSection');
    const errBox = document.getElementById('adminLoginError');
    if (errBox) errBox.classList.add('hidden');
    if (otpSection) otpSection.classList.remove('hidden');
    alert(`[SMS SIMULATOR] Vetcare Master Security Code: ${simulatedGeneratedOTP} (Valid for 5 mins)`);
  };

  window.verifyAdminOTP = function () {
    const input = document.getElementById('adminOtpInput');
    const val = input ? input.value.trim() : '';
    if (val && val === simulatedGeneratedOTP) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'TRUE');
      alert('सुरक्षित OTP सत्यापन सफल! एडमिन कंसोल अनलॉक किया गया।');
      window.closeAdminPinModal();
      window.openAdminDashboard();
    } else {
      alert('गलत OTP दर्ज किया गया है! पुनः प्रयास करें।');
    }
  };

  /* =========================================================================
     2. ADMIN DASHBOARD ROUTER & DUAL PORTAL ARCHITECTURE
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

  window.switchAdminTab = function (tabName) {
    const panels = ['PAYMENT', 'BRANDING', 'USERS', 'SUPPORT', 'METRICS'];
    panels.forEach(p => {
      const el = document.getElementById(`adminPanel${p}`);
      const btn = document.getElementById(`tabBtnAdmin${p}`);
      if (el) el.classList.toggle('hidden', p !== tabName);
      if (btn) {
        if (p === tabName) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold shrink-0';
        } else {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium shrink-0';
        }
      }
    });

    if (tabName === 'USERS') {
      window.renderUsersTable();
    }
  };

  /* =========================================================================
     3. LIVE REGISTRATION TRACKER & USER CONTROLLER
     ========================================================================= */

  window.renderAdminDashboard = function () {
    ensureUsersSeed();
    const users = getStored(STORAGE_KEYS.USERS, []);
    const subPlans = getStored(STORAGE_KEYS.SUB_PLANS, DEFAULT_SUB_PLANS);

    // Compute Live Metric Counters
    const totalUsers = users.length;
    const activeDoctors = users.filter(u => u.role === 'DOCTOR' && u.status === 'ACTIVE').length;
    const activeFarmers = users.filter(u => u.role === 'FARMER' && u.status === 'ACTIVE').length;
    const activeTrials = users.filter(u => u.trialActive).length;

    // Inject Navigation Tab for Users if missing
    const tabsContainer = document.querySelector('#modalAdminDashboard .border-b');
    if (tabsContainer && !document.getElementById('tabBtnAdminUSERS')) {
      const usersTabBtn = document.createElement('button');
      usersTabBtn.id = 'tabBtnAdminUSERS';
      usersTabBtn.textContent = '👥 उपयोगकर्ता व ड्यूल-पोर्टल (Users)';
      usersTabBtn.onclick = () => window.switchAdminTab('USERS');
      usersTabBtn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium shrink-0';
      tabsContainer.insertBefore(usersTabBtn, tabsContainer.firstChild);
    }

    // Inject Users Panel DOM Container if missing
    const bodyContainer = document.querySelector('#modalAdminDashboard .max-w-4xl');
    if (bodyContainer && !document.getElementById('adminPanelUSERS')) {
      const panel = document.createElement('div');
      panel.id = 'adminPanelUSERS';
      panel.className = 'space-y-4';
      bodyContainer.appendChild(panel);
    }

    // Populate Counters in Metric Badges
    const badgeTotalOPD = document.getElementById('metricTotalOPD');
    if (badgeTotalOPD) badgeTotalOPD.textContent = totalUsers;

    // Render Users View
    window.renderUsersTable();

    // Populate Pricing Inputs
    window.populateSubscriptionInputs(subPlans);

    // Populate Branding Inputs
    window.populateBrandingInputs();
  };

  window.renderUsersTable = function () {
    const panel = document.getElementById('adminPanelUSERS');
    if (!panel) return;

    const users = getStored(STORAGE_KEYS.USERS, []);
    const totalUsers = users.length;
    const activeDoctors = users.filter(u => u.role === 'DOCTOR' && u.status === 'ACTIVE').length;
    const activeFarmers = users.filter(u => u.role === 'FARMER' && u.status === 'ACTIVE').length;
    const activeTrials = users.filter(u => u.trialActive).length;

    panel.innerHTML = `
      <!-- Live Counter Badges -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        <div class="bg-blue-50 border border-blue-200 p-3 rounded-2xl">
          <span class="text-[10px] text-blue-700 font-bold block">कुल पंजीकृत उपयोगकर्ता</span>
          <strong class="text-xl font-black text-blue-900">${totalUsers}</strong>
        </div>
        <div class="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl">
          <span class="text-[10px] text-indigo-700 font-bold block">सक्रिय पशु चिकित्सक</span>
          <strong class="text-xl font-black text-indigo-900">${activeDoctors}</strong>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
          <span class="text-[10px] text-emerald-700 font-bold block">सक्रिय स्मार्ट पशुपालक</span>
          <strong class="text-xl font-black text-emerald-900">${activeFarmers}</strong>
        </div>
        <div class="bg-amber-50 border border-amber-200 p-3 rounded-2xl">
          <span class="text-[10px] text-amber-700 font-bold block">सक्रिय 24h ट्रायल</span>
          <strong class="text-xl font-black text-amber-900">${activeTrials}</strong>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-2 items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <input 
          id="adminUserSearchInput" 
          type="text" 
          placeholder="🔍 नाम, फोन नंबर अथवा भूमिका से खोजें..." 
          oninput="window.filterAdminUsers()" 
          class="w-full sm:w-72 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none font-medium"
        />
        <div class="flex gap-1.5 text-xs w-full sm:w-auto">
          <button onclick="window.filterAdminUsersByRole('ALL')" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]">सभी</button>
          <button onclick="window.filterAdminUsersByRole('DOCTOR')" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]">चिकित्सक</button>
          <button onclick="window.filterAdminUsersByRole('FARMER')" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]">पशुपालक</button>
        </div>
      </div>

      <!-- Dynamic Users Table Container -->
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3">यूजर व संपर्क</th>
                <th class="p-3">भूमिका (Role)</th>
                <th class="p-3 text-center">🌟 ड्यूल-पोर्टल स्विच</th>
                <th class="p-3">स्थिति</th>
                <th class="p-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody id="adminUserTableBody" class="divide-y divide-slate-100 text-slate-800 font-medium"></tbody>
          </table>
        </div>
      </div>
    `;

    window.populateUserRows(users);
  };

  window.populateUserRows = function (usersList) {
    const tbody = document.getElementById('adminUserTableBody');
    if (!tbody) return;

    if (usersList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-slate-400">कोई उपयोगकर्ता रिकॉर्ड नहीं मिला।</td></tr>`;
      return;
    }

    tbody.innerHTML = usersList.map(u => {
      const isDoc = u.role === 'DOCTOR';
      const roleLabel = isDoc ? 'Veterinary Practitioner (पशु चिकित्सा व्यवसायी)' : 'Smart Farmer (स्मार्ट पशुपालक)';
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
              ${isDoc ? '🩺' : '👨‍🌾'} ${roleLabel}
            </span>
          </td>
          <td class="p-3 text-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" onchange="window.toggleUserDualPortal('${u.id}')" ${u.dualPortalAllowed ? 'checked' : ''} class="sr-only peer">
              <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span class="block text-[9px] text-slate-400 mt-0.5">${u.dualPortalAllowed ? 'सक्षम' : 'अक्षम'}</span>
          </td>
          <td class="p-3">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isBanned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
              ${isBanned ? 'प्रतिबंधित (Banned)' : 'सक्रिय (Active)'}
            </span>
          </td>
          <td class="p-3 text-right space-x-1">
            <button onclick="window.promoteUserRole('${u.id}')" class="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded" title="भूमिका बदलें">
              🔄 ${isDoc ? 'पशुपालक बनाएं' : 'डॉक्टर बनाएं'}
            </button>
            <button onclick="window.toggleUserBan('${u.id}')" class="text-[10px] ${isBanned ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-rose-50 text-rose-700 border border-rose-200'} font-bold px-2 py-1 rounded">
              ${isBanned ? 'Unban' : 'Ban'}
            </button>
            <button onclick="window.deleteUser('${u.id}')" class="text-[10px] bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-1 rounded">
              हटाएं
            </button>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.filterAdminUsers = function () {
    const query = (document.getElementById('adminUserSearchInput')?.value || '').toLowerCase().trim();
    const users = getStored(STORAGE_KEYS.USERS, []);
    const filtered = users.filter(u => u.name.toLowerCase().includes(query) || u.phone.includes(query) || u.role.toLowerCase().includes(query));
    window.populateUserRows(filtered);
  };

  window.filterAdminUsersByRole = function (role) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    if (role === 'ALL') {
      window.populateUserRows(users);
    } else {
      window.populateUserRows(users.filter(u => u.role === role));
    }
  };

  window.toggleUserBan = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'BANNED' ? 'ACTIVE' : 'BANNED';
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.promoteUserRole = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.role = user.role === 'DOCTOR' ? 'FARMER' : 'DOCTOR';
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.toggleUserDualPortal = function (userId) {
    const users = getStored(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === userId);
    if (user) {
      user.dualPortalAllowed = !user.dualPortalAllowed;
      setStored(STORAGE_KEYS.USERS, users);
      window.renderUsersTable();
    }
  };

  window.deleteUser = function (userId) {
    if (!confirm('क्या आप निश्चित रूप से इस उपयोगकर्ता को हटाना चाहते हैं?')) return;
    let users = getStored(STORAGE_KEYS.USERS, []);
    users = users.filter(u => u.id !== userId);
    setStored(STORAGE_KEYS.USERS, users);
    window.renderUsersTable();
  };

  /* =========================================================================
     4. APP BRANDING & GRAPHICS CONTROLLER
     ========================================================================= */

  window.populateBrandingInputs = function () {
    const branding = getStored(STORAGE_KEYS.BRANDING, {
      appTitle: 'Vetcare AI OS',
      appSubtitle: 'पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान',
      logoUrl: '',
      primaryColor: '#059669',
      bannerNotice: ''
    });

    const panelBranding = document.getElementById('adminPanelBranding');
    if (!panelBranding) return;

    panelBranding.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-4">
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
          🎨 ऐप ब्रांडिंग, ग्राफिक्स व नोटिफिकेशन बार प्रबंधन
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-700 text-[11px] font-bold mb-1">एप्लीकेशन का नाम (App Display Name)</label>
            <input id="cfgAdminAppTitle" type="text" value="${branding.appTitle}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold text-xs outline-none focus:border-blue-600" />
          </div>

          <div>
            <label class="block text-slate-700 text-[11px] font-bold mb-1">थीम प्राथमिक रंग (Primary Theme Color)</label>
            <div class="flex items-center gap-2">
              <input id="cfgAdminPrimaryColor" type="color" value="${branding.primaryColor || '#059669'}" class="h-10 w-16 bg-white border border-slate-200 rounded-xl p-1 cursor-pointer" />
              <span class="text-xs font-mono font-bold text-slate-600">${branding.primaryColor || '#059669'}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-slate-700 text-[11px] font-bold">हेडर लोगो छवि (Image URL अथवा लोकल फाइल अपलोड)</label>
          <div class="flex flex-col sm:flex-row gap-2">
            <input id="cfgAdminLogoUrl" type="url" placeholder="https://domain.com/logo.png" value="${branding.logoUrl}" class="flex-1 bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono outline-none" />
            <input type="file" id="cfgAdminLogoFileInput" accept="image/*" class="text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
        </div>

        <div>
          <label class="block text-slate-700 text-[11px] font-bold mb-1">शीर्ष सूचना / बैनर अलर्ट (Header Announcement Banner)</label>
          <input id="cfgAdminBannerNotice" type="text" placeholder="उदा. 📢 आगामी पशु चिकित्सा शिविर 25 मार्च को..." value="${branding.bannerNotice || ''}" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none" />
        </div>

        <button onclick="window.saveBrandingFromAdmin()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5">
          <span>💾 ब्रांडिंग अपडेट करें (Save Branding)</span>
        </button>
      </div>
    `;

    // Hook File Reader for Direct Base64 Encoding
    const fileInput = document.getElementById('cfgAdminLogoFileInput');
    if (fileInput) {
      fileInput.onchange = function () {
        if (typeof window.handleLogoFileUpload === 'function') {
          window.handleLogoFileUpload(fileInput, function (base64) {
            const urlInput = document.getElementById('cfgAdminLogoUrl');
            if (urlInput) urlInput.value = base64;
          });
        }
      };
    }
  };

  window.saveBrandingFromAdmin = function () {
    const title = document.getElementById('cfgAdminAppTitle')?.value;
    const primaryColor = document.getElementById('cfgAdminPrimaryColor')?.value;
    const logoUrl = document.getElementById('cfgAdminLogoUrl')?.value;
    const bannerNotice = document.getElementById('cfgAdminBannerNotice')?.value;

    const payload = {
      appTitle: title,
      primaryColor: primaryColor,
      logoUrl: logoUrl,
      bannerNotice: bannerNotice
    };

    if (typeof window.updateAppBranding === 'function') {
      window.updateAppBranding(payload);
      alert('ब्रांडिंग व थीम सफलतापूर्वक अपडेट की गई!');
    } else {
      setStored(STORAGE_KEYS.BRANDING, payload);
      alert('ब्रांडिंग स्थानीय रूप से सुरक्षित कर ली गई।');
    }
  };

  /* =========================================================================
     5. INDEPENDENT SUBSCRIPTION PRICING CONTROLLER
     ========================================================================= */

  window.populateSubscriptionInputs = function (subPlans) {
    const panelPayment = document.getElementById('adminPanelPayment');
    if (!panelPayment) return;

    let subPricingContainer = document.getElementById('adminSubPricingBox');
    if (!subPricingContainer) {
      subPricingContainer = document.createElement('div');
      subPricingContainer.id = 'adminSubPricingBox';
      subPricingContainer.className = 'space-y-4 pt-2';
      panelPayment.insertBefore(subPricingContainer, panelPayment.firstChild);
    }

    subPricingContainer.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-4">
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
          💎 स्वतंत्र सब्सक्रिप्शन दर प्रबंधन (Role-Based Subscription Plans)
        </h3>

        <!-- Doctor Pricing Tier -->
        <div class="bg-blue-50/50 border border-blue-200 rounded-2xl p-3.5 space-y-2.5">
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
        <div class="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-3.5 space-y-2.5">
          <span class="text-xs font-bold text-emerald-900 block">👨‍🌾 Smart Farmer (स्मार्ट पशुपालक) रियायती दरें:</span>
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

        <button onclick="window.saveSubscriptionPricing()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition">
          💾 नई सब्सक्रिप्शन दरें लागू करें
        </button>
      </div>
    `;
  };

  window.saveSubscriptionPricing = function () {
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
    alert('सब्सक्रिप्शन योजना दरें सफलतापूर्वक सुरक्षित कर ली गईं!');
  };

  // Safe Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureUsersSeed);
  } else {
    ensureUsersSeed();
  }

})(window, document);
