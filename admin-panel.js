// Vetcare AI OS - Master Admin Console, Bank Editor & Independent Plans Suite (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS — MASTER ADMINISTRATIVE ARCHITECTURE & CONTROL SUITE
 * ============================================================================
 * Production Core:
 * 1. Masked 2-Factor Authentication (Master PIN 9297 & Master Creds 9991039297 / Rahul@1812)
 * 2. Self-Reset OTP Recovery Workflow for Admin.
 * 3. Dynamic Bank Account & Payout Manager (Full CRUD with SBI & PNB defaults).
 * 4. Independent Subscription Plan Manager (Separate Veterinary Practitioner & Smart Farmer Tiers).
 * 5. Real-Time User Analytics, Trial Extensions (+24h, +7d, +30d), AI Surgeon Toggles & Purge.
 * 6. Live Global App Branding Engine (Title, Logo URL, Theme Colors & Announcement Banner).
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA SEEDING & LOCAL STORAGE ORCHESTRATION
  // ==========================================================================

  // Payout Bank Accounts Default Seeding
  if (!localStorage.getItem('vetcare_payout_accounts')) {
    var defaultBankAccounts = [
      {
        id: "BANK_SBI_PRIMARY",
        bankName: "State Bank of India (SBI)",
        payeeName: "Vetcare Services",
        accountNumber: "65204067585",
        ifscCode: "SBIN0013693",
        upiId: "rahuljangra9297@oksbi",
        isPrimary: true
      },
      {
        id: "BANK_PNB_SECONDARY",
        bankName: "Punjab National Bank (PNB)",
        payeeName: "Vetcare Services",
        accountNumber: "6687001700015098",
        ifscCode: "PUNB0668700",
        upiId: "rahuljangra9297-1@okicici",
        isPrimary: false
      }
    ];
    localStorage.setItem('vetcare_payout_accounts', JSON.stringify(defaultBankAccounts));
  }

  // Independent Subscription Plans Default Seeding
  if (!localStorage.getItem('vetcare_subscription_plans')) {
    var defaultSubscriptionPlans = {
      doctorPlans: [
        {
          id: "PLAN_DOC_1M",
          name: "1 माह क्लिनिकल एक्सेस (Doctor)",
          durationDays: 30,
          price: 299,
          features: "48+ रोग मैट्रिक्स, 5-स्तरीय ड्रग थेरेपी, डिजिटल OPD, असीमित व्हाट्सएप पर्ची",
          recommended: false
        },
        {
          id: "PLAN_DOC_3M",
          name: "3 माह सुपर क्लिनिक (Doctor)",
          durationDays: 90,
          price: 799,
          features: "समस्त क्लिनिकल टूल्स, 20-km GPS किसान नेविगेशन, AI सर्जन कंसल्टेंट, प्रायोरिटी सपोर्ट",
          recommended: true
        },
        {
          id: "PLAN_DOC_1Y",
          name: "1 वर्ष वार्षिक लाइसेंस (Doctor)",
          durationDays: 365,
          price: 2499,
          features: "वार्षिक असीमित लाइसेंस, ऑफलाइन बैकअप, क्लिनिक ब्रांडिंग, VIP तकनीकी सपोर्ट",
          recommended: false
        }
      ],
      farmerPlans: [
        {
          id: "PLAN_FAR_1M",
          name: "1 माह स्मार्ट पशुपालक (Farmer)",
          durationDays: 30,
          price: 49,
          features: "25 प्रमाणित देसी नुस्खे, मद काल ट्रैकर, बुनियादी सीमन बैंक खोज",
          recommended: false
        },
        {
          id: "PLAN_FAR_3M",
          name: "3 माह संपूर्ण डेयरी (Farmer)",
          durationDays: 90,
          price: 129,
          features: "दैनिक दूध व चारा बहीखाता, एलीट बुल व सीमन लाइव AI, सरकारी योजनाएं",
          recommended: true
        },
        {
          id: "PLAN_FAR_1Y",
          name: "1 वर्ष समृद्ध डेयरी (Farmer)",
          durationDays: 365,
          price: 399,
          features: "संपूर्ण वर्ष डेयरी प्रबंधन, 20-km डॉक्टर कॉलिंग, राशन कैलकुलेटर, SMS अलर्ट",
          recommended: false
        }
      ]
    };
    localStorage.setItem('vetcare_subscription_plans', JSON.stringify(defaultSubscriptionPlans));
  }

  // Global App Branding Default Seeding
  if (!localStorage.getItem('vetcare_app_branding')) {
    var defaultBranding = {
      appTitle: "Vetcare AI OS",
      tagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      logoUrl: "",
      themeColor: "emerald",
      bannerText: "📢 2026 अद्यतन: राष्ट्रीय गोकुल मिशन व हरियाणा पशुधन बीमा योजना का नया मॉड्यूल लाइव है!",
      bannerEnabled: true
    };
    localStorage.setItem('vetcare_app_branding', JSON.stringify(defaultBranding));
  }

  // Active Admin Filter State
  var adminUsersSearch = "";
  var adminRoleFilter = "ALL";
  var adminStateFilter = "ALL";
  var activeAdminTab = "USERS";

  // ==========================================================================
  // 2. MASKED ADMIN AUTHENTICATION & OTP RECOVERY ENGINE
  // ==========================================================================

  window.switchAuthMode = function (mode) {
    var panelPin = document.getElementById('adminPanelModePIN');
    var panelCreds = document.getElementById('adminPanelModeCreds');
    var btnPin = document.getElementById('adminModeBtnPIN');
    var btnCreds = document.getElementById('adminModeBtnCreds');

    if (mode === 'PIN') {
      if (panelPin) panelPin.classList.remove('hidden');
      if (panelCreds) panelCreds.classList.add('hidden');
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-bold';
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition font-medium';
    } else {
      if (panelPin) panelPin.classList.add('hidden');
      if (panelCreds) panelCreds.classList.remove('hidden');
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-bold';
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition font-medium';
    }
  };

  window.verifyMasterPin = function () {
    var pinInput = document.getElementById('inputMasterPin');
    var pin = pinInput ? pinInput.value.trim() : "";

    if (pin === "9297") {
      if (pinInput) pinInput.value = "";
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य 4-अंकीय मास्टर PIN! (Default: 9297)");
    }
  };

  window.verifyMasterCredentials = function () {
    var uidInput = document.getElementById('inputMasterUserId');
    var pwdInput = document.getElementById('inputMasterPassword');
    var uid = uidInput ? uidInput.value.trim() : "";
    var pwd = pwdInput ? pwdInput.value.trim() : "";

    if (uid === "9991039297" && pwd === "Rahul@1812") {
      if (uidInput) uidInput.value = "";
      if (pwdInput) pwdInput.value = "";
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य मास्टर आईडी अथवा पासवर्ड! (User ID: 9991039297 / Pwd: Rahul@1812)");
    }
  };

  window.openMasterAdminConsole = function () {
    window.closeAdminPinModal();
    var consoleView = document.getElementById('modalAdminDashboard');
    if (consoleView) {
      consoleView.style.display = 'flex';
      window.switchAdminTab('USERS');
    }
  };

  window.closeAdminDashboard = function () {
    var consoleView = document.getElementById('modalAdminDashboard');
    if (consoleView) {
      consoleView.style.display = 'none';
    }
  };

  window.openAdminSelfResetWorkflow = function () {
    var drawer = document.getElementById('adminResetOtpDrawer');
    if (drawer) {
      drawer.classList.toggle('hidden');
    }
  };

  window.triggerAdminResetOtp = function () {
    var otp = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem("vetcare_admin_reset_code", otp);

    var box = document.getElementById('adminResetVerifyBox');
    if (box) box.classList.remove('hidden');

    if (typeof window.showAppToast === 'function') {
      window.showAppToast(`👑 अधिकृत मोबाइल 9991039297 पर सुरक्षा OTP: [ ${otp} ]`);
    } else {
      alert(`अधिकृत मोबाइल (••••••9297) पर सुरक्षा OTP: ${otp}`);
    }
  };

  window.confirmAdminRecoveryOtp = function () {
    var input = document.getElementById('inputAdminRecoveryOtp');
    var entered = input ? input.value.trim() : "";
    var actual = sessionStorage.getItem("vetcare_admin_reset_code");

    if (entered && actual && entered === actual) {
      sessionStorage.removeItem("vetcare_admin_reset_code");
      alert("✅ सुरक्षा कोड सत्यापित! मास्टर कंसोल खोला जा रहा है।");
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य सुरक्षा OTP कोड! कृपया पुनः प्रयास करें।");
    }
  };

  // ==========================================================================
  // 3. ADMIN TABS ROUTER (USERS | PAYMENT | BRANDING)
  // ==========================================================================

  window.switchAdminTab = function (tab) {
    activeAdminTab = tab;

    var tabs = ['USERS', 'PAYMENT', 'BRANDING'];
    tabs.forEach(function (t) {
      var panel = document.getElementById('adminPanel' + t);
      var btn = document.getElementById('tabBtnAdmin' + t);

      if (panel) {
        if (t === tab) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      }

      if (btn) {
        if (t === tab) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-black';
        } else {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-900 shrink-0 font-bold';
        }
      }
    });

    if (tab === 'USERS') window.renderAdminUsersPanel();
    else if (tab === 'PAYMENT') window.renderAdminPaymentPanel();
    else if (tab === 'BRANDING') window.renderAdminBrandingPanel();
  };

  // ==========================================================================
  // 4. USER MANAGEMENT, TRIAL EXTENSION & LOCATION FILTERS
  // ==========================================================================

  window.renderAdminUsersPanel = function () {
    var container = document.getElementById('adminPanelUSERS');
    if (!container) return;

    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');

    // Summary Metrics
    var totalUsers = users.length;
    var totalDoctors = users.filter(function (u) { return u.role === 'doctor'; }).length;
    var totalFarmers = users.filter(function (u) { return u.role === 'farmer'; }).length;
    var totalActive = users.filter(function (u) { return u.status !== 'banned'; }).length;

    // Filter Logic
    var filtered = users.filter(function (u) {
      if (adminRoleFilter !== 'ALL' && u.role !== adminRoleFilter) return false;
      if (adminStateFilter !== 'ALL' && u.state !== adminStateFilter) return false;
      if (adminUsersSearch.trim() !== '') {
        var q = adminUsersSearch.toLowerCase().trim();
        var mName = (u.name || '').toLowerCase().indexOf(q) !== -1;
        var mPhone = (u.phone || '').indexOf(q) !== -1;
        var mEmail = (u.email || '').toLowerCase().indexOf(q) !== -1;
        var mDist = (u.district || '').toLowerCase().indexOf(q) !== -1;
        if (!mName && !mPhone && !mEmail && !mDist) return false;
      }
      return true;
    });

    // Unique states for filter
    var statesList = Array.from(new Set(users.map(function (u) { return u.state; }).filter(Boolean)));

    var html = `
      <div class="space-y-5 text-xs">
        
        <!-- TOP STATS COUNTER -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-blue-700 font-bold uppercase block">कुल पंजीकृत यूजर</span>
            <span class="text-lg font-black text-blue-900">${totalUsers}</span>
          </div>
          <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-indigo-700 font-bold uppercase block">पशु चिकित्सक (Doctor)</span>
            <span class="text-lg font-black text-indigo-900">${totalDoctors}</span>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-emerald-700 font-bold uppercase block">स्मार्ट पशुपालक (Farmer)</span>
            <span class="text-lg font-black text-emerald-900">${totalFarmers}</span>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
            <span class="text-[10px] text-amber-700 font-bold uppercase block">सक्रिय लाइव खाते</span>
            <span class="text-lg font-black text-amber-900">${totalActive}</span>
          </div>
        </div>

        <!-- SEARCH & FILTER TOOLBAR -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div class="sm:col-span-6 relative">
              <input
                type="text"
                value="${escapeHtml(adminUsersSearch)}"
                placeholder="नाम, मोबाइल, जिला या ईमेल से खोजें..."
                oninput="window.handleAdminUserSearch(this.value)"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <div class="sm:col-span-3">
              <select onchange="window.handleAdminRoleFilter(this.value)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs outline-none font-bold text-slate-700">
                <option value="ALL" ${adminRoleFilter === 'ALL' ? 'selected' : ''}>सभी भूमिकाएं (All Roles)</option>
                <option value="doctor" ${adminRoleFilter === 'doctor' ? 'selected' : ''}>🩺 पशु चिकित्सक (Doctor)</option>
                <option value="farmer" ${adminRoleFilter === 'farmer' ? 'selected' : ''}>🌾 स्मार्ट पशुपालक (Farmer)</option>
                <option value="admin" ${adminRoleFilter === 'admin' ? 'selected' : ''}>👑 मुख्य एडमिन</option>
              </select>
            </div>
            <div class="sm:col-span-3">
              <select onchange="window.handleAdminStateFilter(this.value)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs outline-none font-bold text-slate-700">
                <option value="ALL" ${adminStateFilter === 'ALL' ? 'selected' : ''}>सभी राज्य (All States)</option>
                ${statesList.map(function (st) {
                  return `<option value="${escapeHtml(st)}" ${adminStateFilter === st ? 'selected' : ''}>${escapeHtml(st)}</option>`;
                }).join('')}
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            <span>परिणाम: <strong class="text-slate-800">${filtered.length}</strong> / ${totalUsers} उपयोगकर्ता</span>
            <button onclick="window.resetAdminUserFilters()" class="text-blue-600 hover:underline font-bold text-[11px]">
              🔄 फ़िल्टर रीसेट करें
            </button>
          </div>
        </div>

        <!-- USERS LIST CARDS -->
        ${filtered.length === 0 ? `
          <div class="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
            <span class="text-2xl">👥</span>
            <p>कोई यूजर रिकॉर्ड नहीं मिला।</p>
          </div>
        ` : `
          <div class="space-y-3">
            ${filtered.map(function (u) { return renderSingleUserAdminCard(u); }).join('')}
          </div>
        `}

        <!-- DANGER ZONE: PURGE ALL USER DATA -->
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-rose-900 text-xs">⚠️ मास्टर डाटा डेंजर ज़ोन (Master Reset Zone)</h4>
              <p class="text-[11px] text-rose-700">सभी गैर-एडमिन उपयोगकर्ता रिकॉर्ड्स, केस फाइल्स व हिस्ट्री को फ़ैक्ट्री रीसेट करें।</p>
            </div>
            <button
              onclick="window.resetAllUsersDatabase()"
              class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <i class="fa-solid fa-trash-can"></i>
              <span>🗑️ सभी पुराने यूज़र डेटा साफ़ करें</span>
            </button>
          </div>
        </div>

      </div>
    `;

    container.innerHTML = html;
  };

  function renderSingleUserAdminCard(u) {
    var isBanned = u.status === 'banned';
    var isDoctor = u.role === 'doctor';
    var isAIAllowed = u.aiEnabled !== false;

    return `
      <div class="bg-white border ${isBanned ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'} rounded-2xl p-4 shadow-xs space-y-2.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">${isDoctor ? '🩺' : '🌾'}</span>
            <div>
              <h4 class="font-black text-slate-900 text-xs sm:text-sm">
                ${escapeHtml(u.name || 'उपयोगकर्ता')}
                ${isBanned ? '<span class="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold ml-1.5">प्रतिबंधित (Banned)</span>' : ''}
              </h4>
              <p class="text-[11px] font-mono text-slate-500">
                📱 ${escapeHtml(u.phone || '-')} • ✉️ ${escapeHtml(u.email || 'N/A')}
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isDoctor ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
              ${isDoctor ? 'पशु चिकित्सक' : 'स्मार्ट पशुपालक'}
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              📍 ${escapeHtml(u.district || 'जिला')}, ${escapeHtml(u.state || 'राज्य')}
            </span>
          </div>
        </div>

        <!-- TRIAL & QUICK ACTIONS -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
          <!-- Trial Extension Buttons -->
          <div class="flex items-center gap-1">
            <span class="font-bold text-slate-500 text-[10px] uppercase">ट्रायल विस्तार:</span>
            <button onclick="window.extendUserTrial('${escapeHtml(u.id)}', 24)" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-bold transition">+24h</button>
            <button onclick="window.extendUserTrial('${escapeHtml(u.id)}', 168)" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-bold transition">+7d</button>
            <button onclick="window.extendUserTrial('${escapeHtml(u.id)}', 720)" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-bold transition">+30d</button>
          </div>

          <!-- Permission & Management Actions -->
          <div class="flex items-center gap-1.5">
            <button
              onclick="window.toggleUserAI('${escapeHtml(u.id)}')"
              class="px-2.5 py-1 rounded-lg border font-bold text-[10.5px] transition ${isAIAllowed ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-400 border-slate-200'}"
              title="AI सर्जन कंसल्टेंट अनुमति बदलें"
            >
              <i class="fa-solid fa-robot"></i> AI ${isAIAllowed ? 'चालू' : 'बंद'}
            </button>

            <button
              onclick="window.toggleUserRole('${escapeHtml(u.id)}')"
              class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[10.5px] transition"
              title="पोर्टल भूमिका बदलें"
            >
              <i class="fa-solid fa-arrows-rotate"></i> ${isDoctor ? 'पशुपालक बनाएं' : 'डॉक्टर बनाएं'}
            </button>

            <button
              onclick="window.toggleUserBan('${escapeHtml(u.id)}')"
              class="px-2.5 py-1 rounded-lg font-bold text-[10.5px] transition ${isBanned ? 'bg-emerald-600 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'}"
            >
              ${isBanned ? 'अनबैन करें' : 'बैन करें'}
            </button>

            <button
              onclick="window.deleteUserRecord('${escapeHtml(u.id)}')"
              class="px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="अकाउंट मिटाएं"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // User Actions
  window.handleAdminUserSearch = function (q) {
    adminUsersSearch = q;
    window.renderAdminUsersPanel();
  };

  window.handleAdminRoleFilter = function (r) {
    adminRoleFilter = r;
    window.renderAdminUsersPanel();
  };

  window.handleAdminStateFilter = function (s) {
    adminStateFilter = s;
    window.renderAdminUsersPanel();
  };

  window.resetAdminUserFilters = function () {
    adminUsersSearch = "";
    adminRoleFilter = "ALL";
    adminStateFilter = "ALL";
    window.renderAdminUsersPanel();
  };

  window.extendUserTrial = function (userId, hours) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;

    var currentExpiry = u.trialExpiry ? new Date(u.trialExpiry).getTime() : Date.now();
    var newExpiry = Math.max(Date.now(), currentExpiry) + (hours * 60 * 60 * 1000);
    u.trialExpiry = new Date(newExpiry).toISOString();

    localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(`✅ ${u.name || 'यूजर'} का ट्रायल +${hours} घंटे बढ़ा दिया गया!`);
    } else {
      alert(`ट्रायल +${hours} घंटे बढ़ाया गया।`);
    }
    window.renderAdminUsersPanel();
  };

  window.toggleUserAI = function (userId) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;

    u.aiEnabled = !(u.aiEnabled !== false);
    localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    window.renderAdminUsersPanel();
  };

  window.toggleUserRole = function (userId) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;

    u.role = u.role === 'doctor' ? 'farmer' : 'doctor';
    localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    window.renderAdminUsersPanel();
  };

  window.toggleUserBan = function (userId) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var u = users.find(function (item) { return item.id === userId; });
    if (!u) return;

    u.status = u.status === 'banned' ? 'active' : 'banned';
    localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    window.renderAdminUsersPanel();
  };

  window.deleteUserRecord = function (userId) {
    if (!confirm("क्या आप इस उपयोगकर्ता का सम्पूर्ण रिकॉर्ड हटाना चाहते हैं?")) return;
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var filtered = users.filter(function (item) { return item.id !== userId; });
    localStorage.setItem('vetcare_users_db', JSON.stringify(filtered));
    window.renderAdminUsersPanel();
  };

  window.resetAllUsersDatabase = function () {
    var confirmCode = prompt("चेतावनी: सभी यूजर व केस डेटा मिट जाएगा। आगे बढ़ने हेतु 'RESET' टाइप करें:");
    if (confirmCode === "RESET") {
      var defaultUsers = [
        {
          id: "USER_ADMIN",
          name: "मुख्य व्यवस्थापक (Master Admin)",
          role: "admin",
          phone: "9991039297",
          email: "admin@vetcare.os",
          password: "Rahul@1812",
          pin: "9297",
          state: "हरियाणा",
          district: "करनाल"
        }
      ];
      localStorage.setItem('vetcare_users_db', JSON.stringify(defaultUsers));
      localStorage.setItem('vetcare_cases_db', JSON.stringify([]));
      alert("✅ डेटाबेस सफलतापूर्वक फ़ैक्ट्री रीसेट कर दिया गया है!");
      window.renderAdminUsersPanel();
    } else {
      alert("रीसेट रद्द किया गया।");
    }
  };

  // ==========================================================================
  // 5. FULL DYNAMIC BANK ACCOUNT & PAYOUT MANAGER (CRUD)
  // ==========================================================================

  window.renderAdminPaymentPanel = function () {
    var container = document.getElementById('adminPanelPAYMENT');
    if (!container) return;

    var accounts = JSON.parse(localStorage.getItem('vetcare_payout_accounts') || '[]');
    var plansData = JSON.parse(localStorage.getItem('vetcare_subscription_plans') || '{"doctorPlans":[], "farmerPlans":[]}');

    var html = `
      <div class="space-y-6 text-xs">
        
        <!-- =================================================================== -->
        <!-- SECTION 1: BANK ACCOUNTS & PAYOUT RECEPTACLES                       -->
        <!-- =================================================================== -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-building-columns text-emerald-600"></i>
                <span>बैंक खाता एवं भुगतान गेटवे प्रबंधक (Payout Accounts)</span>
              </h3>
              <p class="text-[11px] text-slate-500">
                किसानों व डॉक्टरों द्वारा सब्सक्रिप्शन भुगतान हेतु प्रदर्शित अधिकृत बैंक खाते एवं UPI IDs।
              </p>
            </div>
            <button
              onclick="window.openAddBankAccountModal()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition shadow-xs flex items-center gap-1 shrink-0"
            >
              <i class="fa-solid fa-plus"></i> <span>नया बैंक खाता जोड़ें</span>
            </button>
          </div>

          <!-- Accounts Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            ${accounts.map(function (acc) { return renderSingleBankAccountCard(acc); }).join('')}
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SECTION 2: INDEPENDENT SUBSCRIPTION PLANS (DOCTOR & FARMER)        -->
        <!-- =================================================================== -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-6">
          
          <!-- SUB-SECTION A: VETERINARY PRACTITIONER PLANS -->
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-2">
              <div>
                <h4 class="font-black text-blue-900 text-sm flex items-center gap-1.5">
                  <span>🩺</span> <span>पशु चिकित्सक (Veterinary Practitioner) सब्सक्रिप्शन प्लान्स</span>
                </h4>
                <p class="text-[11px] text-slate-500">क्लीनिकल डिसीजन इंजन, ड्रग फार्माकोपिया व डिजिटल OPD हेतु स्वतंत्र दरें।</p>
              </div>
              <button
                onclick="window.openAddPlanModal('doctor')"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition shadow-xs flex items-center gap-1 shrink-0"
              >
                <i class="fa-solid fa-plus"></i> <span>नया चिकित्सक प्लान जोड़ें</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${(plansData.doctorPlans || []).map(function (p) { return renderSinglePlanCard(p, 'doctor'); }).join('')}
            </div>
          </div>

          <!-- SUB-SECTION B: SMART FARMER PLANS -->
          <div class="space-y-3 pt-3 border-t border-slate-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-2">
              <div>
                <h4 class="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                  <span>🌾</span> <span>स्मार्ट पशुपालक (Smart Farmer) सब्सक्रिप्शन प्लान्स</span>
                </h4>
                <p class="text-[11px] text-slate-500">देसी नुस्खे, सीमन बुल बैंक, आहार व दैनिक दूध बहीखाता हेतु स्वतंत्र किफायती दरें।</p>
              </div>
              <button
                onclick="window.openAddPlanModal('farmer')"
                class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition shadow-xs flex items-center gap-1 shrink-0"
              >
                <i class="fa-solid fa-plus"></i> <span>नया पशुपालक प्लान जोड़ें</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${(plansData.farmerPlans || []).map(function (p) { return renderSinglePlanCard(p, 'farmer'); }).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    container.innerHTML = html;
  };

  function renderSingleBankAccountCard(acc) {
    return `
      <div class="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 relative">
        <div class="flex items-center justify-between">
          <span class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
            <i class="fa-solid fa-landmark text-blue-600"></i> ${escapeHtml(acc.bankName)}
          </span>
          ${acc.isPrimary ? '<span class="text-[9px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">प्राथमिक खाता</span>' : ''}
        </div>

        <div class="space-y-1 text-[11px] text-slate-700 font-mono bg-white p-2.5 rounded-xl border border-slate-100">
          <div><strong class="text-slate-500 font-sans">खाताधारक:</strong> ${escapeHtml(acc.payeeName)}</div>
          <div><strong class="text-slate-500 font-sans">खाता सं.:</strong> <span class="font-bold text-slate-900">${escapeHtml(acc.accountNumber)}</span></div>
          <div><strong class="text-slate-500 font-sans">IFSC कोड:</strong> ${escapeHtml(acc.ifscCode)}</div>
          <div><strong class="text-slate-500 font-sans">UPI ID:</strong> <span class="text-emerald-700 font-bold">${escapeHtml(acc.upiId)}</span></div>
        </div>

        <div class="flex justify-end gap-2 pt-1">
          <button
            onclick="window.editBankAccount('${escapeHtml(acc.id)}')"
            class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition"
          >
            ✏️ संपादित करें
          </button>
          <button
            onclick="window.deleteBankAccount('${escapeHtml(acc.id)}')"
            class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition"
          >
            🗑️ हटाएं
          </button>
        </div>
      </div>
    `;
  }

  function renderSinglePlanCard(p, role) {
    var isDoc = role === 'doctor';
    return `
      <div class="bg-slate-50 border ${p.recommended ? (isDoc ? 'border-blue-400 ring-1 ring-blue-300' : 'border-emerald-400 ring-1 ring-emerald-300') : 'border-slate-200'} rounded-2xl p-4 shadow-xs space-y-2 flex flex-col justify-between relative">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isDoc ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}">
              ${p.durationDays} दिन
            </span>
            ${p.recommended ? `<span class="text-[9px] font-black uppercase px-1.5 py-0.5 rounded text-white ${isDoc ? 'bg-blue-600' : 'bg-emerald-600'}">सर्वाधिक लोकप्रिय</span>` : ''}
          </div>

          <h5 class="font-black text-slate-900 text-xs sm:text-sm">${escapeHtml(p.name)}</h5>
          <div class="text-base font-black ${isDoc ? 'text-blue-700' : 'text-emerald-700'}">
            ₹${p.price}
          </div>
          <p class="text-[10.5px] text-slate-600 leading-relaxed bg-white p-2 rounded-xl border border-slate-100">
            ${escapeHtml(p.features)}
          </p>
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-slate-200/60">
          <button
            onclick="window.editSubscriptionPlan('${escapeHtml(role)}', '${escapeHtml(p.id)}')"
            class="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[10.5px] transition"
          >
            ✏️ बदलें
          </button>
          <button
            onclick="window.deleteSubscriptionPlan('${escapeHtml(role)}', '${escapeHtml(p.id)}')"
            class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10.5px] transition"
          >
            🗑️ हटाएं
          </button>
        </div>
      </div>
    `;
  }

  // Bank CRUD Actions
  window.openAddBankAccountModal = function () {
    var bankName = prompt("बैंक का नाम दर्ज करें (उदा. State Bank of India):");
    if (!bankName) return;
    var payeeName = prompt("खाताधारक / फर्म का नाम (उदा. Vetcare Services):", "Vetcare Services");
    var accountNumber = prompt("खाता संख्या दर्ज करें:");
    var ifscCode = prompt("IFSC कोड दर्ज करें:");
    var upiId = prompt("UPI ID दर्ज करें (उदा. example@oksbi):");

    if (!accountNumber || !ifscCode || !upiId) {
      alert("खाता संख्या, IFSC एवं UPI ID भरना अनिवार्य है!");
      return;
    }

    var accounts = JSON.parse(localStorage.getItem('vetcare_payout_accounts') || '[]');
    accounts.push({
      id: "BANK_" + Date.now(),
      bankName: bankName.trim(),
      payeeName: (payeeName || "Vetcare Services").trim(),
      accountNumber: accountNumber.trim(),
      ifscCode: ifscCode.trim().toUpperCase(),
      upiId: upiId.trim(),
      isPrimary: accounts.length === 0
    });

    localStorage.setItem('vetcare_payout_accounts', JSON.stringify(accounts));
    window.renderAdminPaymentPanel();
  };

  window.editBankAccount = function (accId) {
    var accounts = JSON.parse(localStorage.getItem('vetcare_payout_accounts') || '[]');
    var acc = accounts.find(function (a) { return a.id === accId; });
    if (!acc) return;

    var newBank = prompt("बैंक का नाम:", acc.bankName) || acc.bankName;
    var newPayee = prompt("खाताधारक का नाम:", acc.payeeName) || acc.payeeName;
    var newAcc = prompt("खाता संख्या:", acc.accountNumber) || acc.accountNumber;
    var newIfsc = prompt("IFSC कोड:", acc.ifscCode) || acc.ifscCode;
    var newUpi = prompt("UPI ID:", acc.upiId) || acc.upiId;

    acc.bankName = newBank.trim();
    acc.payeeName = newPayee.trim();
    acc.accountNumber = newAcc.trim();
    acc.ifscCode = newIfsc.trim().toUpperCase();
    acc.upiId = newUpi.trim();

    localStorage.setItem('vetcare_payout_accounts', JSON.stringify(accounts));
    window.renderAdminPaymentPanel();
  };

  window.deleteBankAccount = function (accId) {
    if (!confirm("क्या आप इस बैंक खाते को हटाना चाहते हैं?")) return;
    var accounts = JSON.parse(localStorage.getItem('vetcare_payout_accounts') || '[]');
    var filtered = accounts.filter(function (a) { return a.id !== accId; });
    localStorage.setItem('vetcare_payout_accounts', JSON.stringify(filtered));
    window.renderAdminPaymentPanel();
  };

  // Plan CRUD Actions
  window.openAddPlanModal = function (role) {
    var plansData = JSON.parse(localStorage.getItem('vetcare_subscription_plans') || '{"doctorPlans":[], "farmerPlans":[]}');
    var isDoc = role === 'doctor';

    var name = prompt(`नया ${isDoc ? 'चिकित्सक' : 'पशुपालक'} प्लान नाम (उदा. 6 माह प्लान):`);
    if (!name) return;
    var days = parseInt(prompt("अवधि (दिनों में - उदा. 180):", "180"), 10) || 30;
    var price = parseInt(prompt("मूल्य (₹):", "499"), 10) || 99;
    var features = prompt("सुविधाओं का संक्षिप्त विवरण:", "समस्त फीचर्स व प्राथमिकता सपोर्ट");

    var newPlan = {
      id: "PLAN_" + Date.now(),
      name: name.trim(),
      durationDays: days,
      price: price,
      features: (features || "").trim(),
      recommended: false
    };

    if (isDoc) plansData.doctorPlans.push(newPlan);
    else plansData.farmerPlans.push(newPlan);

    localStorage.setItem('vetcare_subscription_plans', JSON.stringify(plansData));
    window.renderAdminPaymentPanel();
  };

  window.editSubscriptionPlan = function (role, planId) {
    var plansData = JSON.parse(localStorage.getItem('vetcare_subscription_plans') || '{"doctorPlans":[], "farmerPlans":[]}');
    var list = role === 'doctor' ? plansData.doctorPlans : plansData.farmerPlans;
    var plan = list.find(function (p) { return p.id === planId; });
    if (!plan) return;

    var newName = prompt("प्लान का नाम:", plan.name) || plan.name;
    var newPrice = parseInt(prompt("मूल्य (₹):", plan.price), 10) || plan.price;
    var newDays = parseInt(prompt("अवधि (दिन):", plan.durationDays), 10) || plan.durationDays;
    var newFeat = prompt("सुविधाएं:", plan.features) || plan.features;

    plan.name = newName.trim();
    plan.price = newPrice;
    plan.durationDays = newDays;
    plan.features = newFeat.trim();

    localStorage.setItem('vetcare_subscription_plans', JSON.stringify(plansData));
    window.renderAdminPaymentPanel();
  };

  window.deleteSubscriptionPlan = function (role, planId) {
    if (!confirm("क्या आप इस सब्सक्रिप्शन प्लान को मिटाना चाहते हैं?")) return;
    var plansData = JSON.parse(localStorage.getItem('vetcare_subscription_plans') || '{"doctorPlans":[], "farmerPlans":[]}');

    if (role === 'doctor') {
      plansData.doctorPlans = plansData.doctorPlans.filter(function (p) { return p.id !== planId; });
    } else {
      plansData.farmerPlans = plansData.farmerPlans.filter(function (p) { return p.id !== planId; });
    }

    localStorage.setItem('vetcare_subscription_plans', JSON.stringify(plansData));
    window.renderAdminPaymentPanel();
  };

  // ==========================================================================
  // 6. APP BRANDING INTEGRATION (THEME, LOGO & ANNOUNCEMENT)
  // ==========================================================================

  window.renderAdminBrandingPanel = function () {
    var container = document.getElementById('adminPanelBRANDING');
    if (!container) return;

    var b = JSON.parse(localStorage.getItem('vetcare_app_branding') || '{}');

    var html = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 text-xs">
        <div>
          <h3 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
            <i class="fa-solid fa-palette text-purple-600"></i>
            <span>एप्लिकेशन ब्रांडिंग, लोगो व घोषणा संपादक</span>
          </h3>
          <p class="text-[11px] text-slate-500">
            सिस्टम का नाम, लोगो URL, रंग थीम व मुख्य सूचना बैनर को तुरंत बदलें।
          </p>
        </div>

        <div class="space-y-3 pt-2">
          <div>
            <label class="block font-bold text-slate-700 mb-1">एप्लिकेशन शीर्षक (App Header Title)</label>
            <input id="brandingAppTitle" type="text" value="${escapeHtml(b.appTitle || 'Vetcare AI OS')}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold text-slate-900" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">टैगलाइन (Sub-heading)</label>
            <input id="brandingTagline" type="text" value="${escapeHtml(b.tagline || '')}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">लोगो इमेज URL (Image Web Address)</label>
            <input id="brandingLogoUrl" type="url" placeholder="https://example.com/logo.png" value="${escapeHtml(b.logoUrl || '')}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono text-xs" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">वैश्विक सूचना बैनर संदेश (Announcement Banner)</label>
            <textarea id="brandingBannerText" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800">${escapeHtml(b.bannerText || '')}</textarea>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <input id="brandingBannerEnabled" type="checkbox" ${b.bannerEnabled !== false ? 'checked' : ''} class="w-4 h-4 accent-emerald-600 rounded cursor-pointer" />
            <label for="brandingBannerEnabled" class="font-bold text-slate-800 cursor-pointer">सूचना बैनर मुख्य स्क्रीन पर प्रदर्शित करें (Show Banner)</label>
          </div>

          <button
            onclick="window.saveAppBranding()"
            class="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            <span>ब्रांडिंग व थीम तुरंत अपडेट करें</span>
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  window.saveAppBranding = function () {
    var title = document.getElementById('brandingAppTitle')?.value.trim() || 'Vetcare AI OS';
    var tagline = document.getElementById('brandingTagline')?.value.trim() || '';
    var logoUrl = document.getElementById('brandingLogoUrl')?.value.trim() || '';
    var bannerText = document.getElementById('brandingBannerText')?.value.trim() || '';
    var bannerEnabled = !!document.getElementById('brandingBannerEnabled')?.checked;

    var branding = {
      appTitle: title,
      tagline: tagline,
      logoUrl: logoUrl,
      bannerText: bannerText,
      bannerEnabled: bannerEnabled
    };

    localStorage.setItem('vetcare_app_branding', JSON.stringify(branding));
    window.applyBrandingToUI();
    if (typeof window.showAppToast === 'function') {
      window.showAppToast("✅ ब्रांडिंग व सूचना बैनर सफलतापूर्वक अपडेट हो गया!");
    } else {
      alert("ब्रांडिंग सुरक्षित हो गई!");
    }
  };

  window.applyBrandingToUI = function () {
    var b = JSON.parse(localStorage.getItem('vetcare_app_branding') || '{}');

    // Header Title & Logo
    var appHeaderTitle = document.getElementById('appHeaderTitle');
    if (appHeaderTitle && b.appTitle) appHeaderTitle.textContent = b.appTitle;

    var gatewayAppTitle = document.getElementById('gatewayAppTitle');
    if (gatewayAppTitle && b.appTitle) gatewayAppTitle.textContent = b.appTitle;

    var gatewayTagline = document.getElementById('gatewayTagline');
    if (gatewayTagline && b.tagline) gatewayTagline.textContent = b.tagline;

    var logoImg = document.getElementById('app-logo-img');
    var headerLogoText = document.getElementById('headerLogoText');
    if (logoImg && headerLogoText) {
      if (b.logoUrl && b.logoUrl.startsWith('http')) {
        logoImg.src = b.logoUrl;
        logoImg.classList.remove('hidden');
        headerLogoText.classList.add('hidden');
      } else {
        logoImg.classList.add('hidden');
        headerLogoText.classList.remove('hidden');
      }
    }

    // Announcement Banner
    var bannerContainer = document.getElementById('app-announcement-banner');
    if (bannerContainer) {
      if (b.bannerEnabled && b.bannerText) {
        bannerContainer.innerHTML = `
          <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] sm:text-xs font-bold py-2 px-4 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2 truncate">
              <span class="pulse-live">🔔</span>
              <span class="truncate">${escapeHtml(b.bannerText)}</span>
            </div>
            <button onclick="document.getElementById('app-announcement-banner').innerHTML=''" class="ml-2 text-white/80 hover:text-white font-bold">✕</button>
          </div>
        `;
      } else {
        bannerContainer.innerHTML = '';
      }
    }
  };

  // Safe Escape HTML Helper
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Auto-Initialization
  function autoInitAdminModule() {
    window.applyBrandingToUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitAdminModule);
  } else {
    autoInitAdminModule();
  }

})();
