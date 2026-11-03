// Vetcare AI OS - Master Admin Console, Strict Masking & Save Engine (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. HARDCODED MASTER CREDENTIALS & CONSTANTS
  // =========================================================================
  const MASTER_ADMIN_CONFIG = {
    masterPin: '9297',
    masterUserId: '9991039297',
    masterPassword: 'Rahul@1812',
    recoveryMobile: '9991039297',
    storageKeyAuth: 'vetcare_admin_auth_session',
    storageKeySettings: 'vetcare_admin_global_settings',
    storageKeyBanks: 'vetcare_admin_bank_accounts',
    storageKeyPricing: 'vetcare_admin_subscription_plans',
    storageKeyUsers: 'vetcare_registered_users_list'
  };

  // State-to-District Hierarchical Geography
  const STATE_DISTRICT_MAP = {
    'हरियाणा': ['करनाल', 'कुरुक्षेत्र', 'हिसार', 'रोहतक', 'अंबाला', 'सिरसा', 'जींद', 'सोनीपत', 'पानीपत', 'कैथल', 'भिवानी', 'फतेहाबाद', 'गुरुग्राम', 'रेवाड़ी', 'झज्जर', 'पलवल', 'मेवात/नूंह', 'चरखी दादरी', 'पंचकुला', 'यमुनानगर', 'महेंद्रगढ़', 'फरीदाबाद'],
    'पंजाब': ['लुधियाना', 'अमृतसर', 'पटियाला', 'बठिंडा', 'जालंधर', 'संगरूर', 'होशियारपुर', 'मोगा', 'फिरोजपुर', 'गुरदासपुर', 'श्री मुक्तसर साहिब', 'फाजिल्का', 'मानसा', 'बरनाला', 'रूपनगर (रोपड़)', 'तरनतारन', 'कपूरथला', 'पठानकोट', 'फतेहगढ़ साहिब', 'एस.ए.एस नगर (मोहाली)'],
    'राजस्थान': ['जयपुर', 'अलवर', 'सीकर', 'बीकानेर', 'जोधपुर', 'नागौर', 'झुंझुनू', 'श्रीगंगानगर', 'भरतपुर', 'कोटा', 'हनुमानगढ़', 'अजमेर', 'उदयपुर', 'बाड़मेर', 'पाली', 'चूरू', 'दौसा', 'टोंक', 'भीलवाड़ा', 'झालावाड़'],
    'उत्तर प्रदेश': ['मेरठ', 'मुजफ्फरनगर', 'सहारनपुर', 'मथुरा', 'आगरा', 'बरेली', 'मुरादाबाद', 'अलीगढ़', 'बुलंदशहर', 'बिजनौर', 'शामली', 'बागपत', 'रामपुर', 'गाजियाबाद', 'हापुड़', 'फिरोजाबाद', 'मैनपुरी', 'एटा', 'संभल', 'अमरोहा'],
    'मध्य प्रदेश': ['इंदौर', 'उज्जैन', 'भोपाल', 'ग्वालियर', 'जबलपुर', 'मंदसौर', 'नीमच', 'देवास', 'रतलाम', 'धार', 'खरगोन', 'खंडवा', 'सीहोर', 'विदिशा', 'राजगढ़'],
    'गुजरात': ['आनंद', 'मेहसाणा', 'सूरत', 'अहमदाबाद', 'राजकोट', 'बनासकांठा', 'साबरकांठा', 'वडोदरा', 'जूनागढ़', 'अमरेली', 'भावनगर', 'गांधीनगर', 'कच्छ', 'पाटन'],
    'अन्य': ['मुख्यालय / अन्य जिला', 'समस्त क्षेत्र']
  };

  // Default Seed Data
  const DEFAULT_BANKS = [
    {
      id: 'BANK_01',
      bankName: 'Punjab National Bank (PNB)',
      payeeName: 'Rahul Sharma (Vetcare Ops)',
      accountNo: '1045000100234567',
      ifscCode: 'PUNB0104500',
      upiId: '9991039297@pthdfc',
      isPrimary: true
    },
    {
      id: 'BANK_02',
      bankName: 'State Bank of India (SBI)',
      payeeName: 'Vetcare AI OS Official',
      accountNo: '38920194829',
      ifscCode: 'SBIN0001234',
      upiId: 'vetcareai@sbi',
      isPrimary: false
    }
  ];

  const DEFAULT_PRICING = {
    doctor: [
      { id: 'DOC_1M', name: '1 माह क्लिनिकल पास', durationDays: 30, price: 499, tag: 'बेसिक', features: ['48+ रोग प्रोबेबिलिटी इंजन', 'डिजिटल OPD व्हाट्सएप पर्ची', 'दवा स्टॉक व इन्वेंटरी'] },
      { id: 'DOC_3M', name: '3 माह क्लिनिकल प्रो', durationDays: 90, price: 1199, tag: '20% बचत', features: ['सभी बेसिक फीचर्स', 'लाइव AI वेटरनरी सर्जन', 'असीमित किसान केस बैकअप'] },
      { id: 'DOC_1Y', name: '1 वर्ष वीआईपी सर्जन मास्टर', durationDays: 365, price: 3999, tag: 'सर्वाधिक लोकप्रिय', features: ['सम्पूर्ण क्लिनिकल सुइट', '24x7 वीआईपी सपोर्ट', 'ऑटोमैटिक क्लाउड सिंक'] }
    ],
    farmer: [
      { id: 'FAR_1M', name: '1 माह स्मार्ट डेयरी पास', durationDays: 30, price: 99, tag: 'सस्ता प्लान', features: ['25 देसी हर्बल नुस्खे', 'मद काल व सीमन ट्रैकर', 'दैनिक दूध बिक्री बहीखाता'] },
      { id: 'FAR_3M', name: '3 माह सम्पूर्ण किसान पास', durationDays: 90, price: 249, tag: 'लोकप्रिय', features: ['सभी 1 माह फीचर्स', 'संतुलित राशन कैलकुलेटर', 'बुल डायरेक्टरी व पेडिग्री'] },
      { id: 'FAR_1Y', name: '1 वर्ष डेयरी सम्राट पास', durationDays: 365, price: 699, tag: 'वार्षिक बचत', features: ['सम्पूर्ण स्मार्ट डेयरी सिस्टम', 'सरकारी अनुदान अलर्ट', 'शून्य विज्ञापन अनुभव'] }
    ]
  };

  const DEFAULT_GLOBAL_SETTINGS = {
    appTitle: 'Vetcare AI OS',
    tagline: 'पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png',
    emergencyNotice: 'सूचना: 2026 नवीनतम खुरपका-मुंहपका (FMD) व गलघोंटू (HS) रोग नियंत्रण दिशानिर्देश जारी।',
    showNoticeBanner: true,
    allowDualPortalSwitch: true,
    allowAiSurgeonAccess: true
  };

  // =========================================================================
  // 2. STATE REPOSITORY GETTERS & INITIALIZERS
  // =========================================================================
  function getStoredBankAccounts() {
    try {
      const data = localStorage.getItem(MASTER_ADMIN_CONFIG.storageKeyBanks);
      return data ? JSON.parse(data) : DEFAULT_BANKS;
    } catch (e) {
      return DEFAULT_BANKS;
    }
  }

  function getStoredPricingPlans() {
    try {
      const data = localStorage.getItem(MASTER_ADMIN_CONFIG.storageKeyPricing);
      return data ? JSON.parse(data) : DEFAULT_PRICING;
    } catch (e) {
      return DEFAULT_PRICING;
    }
  }

  function getStoredGlobalSettings() {
    try {
      const data = localStorage.getItem(MASTER_ADMIN_CONFIG.storageKeySettings);
      return data ? JSON.parse(data) : DEFAULT_GLOBAL_SETTINGS;
    } catch (e) {
      return DEFAULT_GLOBAL_SETTINGS;
    }
  }

  function getStoredUsersList() {
    try {
      const data = localStorage.getItem(MASTER_ADMIN_CONFIG.storageKeyUsers);
      if (data) return JSON.parse(data);
    } catch (e) {}

    // Seed mock initial users if empty
    const seed = [
      {
        id: 'USR_101',
        name: 'डॉ. अमित शर्मा (B.V.Sc)',
        role: 'doctor',
        phone: '9812034567',
        email: 'dramit.vet@gmail.com',
        state: 'हरियाणा',
        district: 'करनाल',
        village: 'तरावड़ी',
        registeredAt: '2025-01-15',
        trialExpires: new Date(Date.now() + 86400000 * 18).toISOString(),
        isBanned: false,
        aiSurgeonEnabled: true,
        dualPortalAllowed: true
      },
      {
        id: 'USR_102',
        name: 'रामपाल सिंह (डेयरी संचालक)',
        role: 'farmer',
        phone: '9416023891',
        email: 'rampal.dairy@gmail.com',
        state: 'हरियाणा',
        district: 'हिसार',
        village: 'बरवाला',
        registeredAt: '2025-02-01',
        trialExpires: new Date(Date.now() + 86400000 * 30).toISOString(),
        isBanned: false,
        aiSurgeonEnabled: false,
        dualPortalAllowed: true
      },
      {
        id: 'USR_103',
        name: 'डॉ. गुरप्रीत सिंह धालीवाल',
        role: 'doctor',
        phone: '9876541230',
        email: 'gurpreet.vet@yahoo.com',
        state: 'पंजाब',
        district: 'लुधियाना',
        village: 'समराला',
        registeredAt: '2025-02-10',
        trialExpires: new Date(Date.now() + 86400000 * 45).toISOString(),
        isBanned: false,
        aiSurgeonEnabled: true,
        dualPortalAllowed: true
      }
    ];
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyUsers, JSON.stringify(seed));
    return seed;
  }

  // =========================================================================
  // 3. TOAST NOTIFICATION ENGINE
  // =========================================================================
  function showAdminToast(message, isError = false) {
    let toast = document.getElementById('admin-floating-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'admin-floating-toast';
      toast.className = 'fixed top-5 right-5 z-[9999] px-4 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 transition-all duration-300 transform translate-y-0';
      document.body.appendChild(toast);
    }
    toast.className = `fixed top-5 right-5 z-[9999] px-4 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 transition-all duration-300 ${
      isError 
        ? 'bg-rose-600 text-white border-2 border-rose-400' 
        : 'bg-emerald-600 text-white border-2 border-emerald-400'
    }`;
    toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-xmark' : 'fa-circle-check'} text-base"></i> <span>${message}</span>`;
    toast.style.display = 'flex';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  }

  // =========================================================================
  // 4. MASKED AUTHENTICATION & LOGIN CONTROLLERS (MODE A & MODE B)
  // =========================================================================
  window.switchAuthMode = function (mode) {
    const btnPin = document.getElementById('adminModeBtnPIN');
    const btnCreds = document.getElementById('adminModeBtnCreds');
    const panelPin = document.getElementById('adminPanelModePIN');
    const panelCreds = document.getElementById('adminPanelModeCreds');

    if (mode === 'PIN') {
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 font-bold transition';
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 font-medium transition';
      if (panelPin) panelPin.classList.remove('hidden');
      if (panelCreds) panelCreds.classList.add('hidden');
    } else {
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 font-bold transition';
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 font-medium transition';
      if (panelCreds) panelCreds.classList.remove('hidden');
      if (panelPin) panelPin.classList.add('hidden');
    }
  };

  window.verifyMasterPin = function () {
    const pinInput = document.getElementById('inputMasterPin');
    const pinVal = pinInput ? pinInput.value.trim() : '';

    if (!pinVal) {
      alert('कृपया 4-अंकीय मास्टर PIN दर्ज करें!');
      return;
    }

    if (pinVal === MASTER_ADMIN_CONFIG.masterPin) {
      sessionStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyAuth, 'true');
      if (pinInput) pinInput.value = '';
      window.closeAdminPinModal();
      window.openAdminDashboard();
      showAdminToast('👑 मास्टर एडमिन PIN सत्यापित! पूर्ण नियंत्रण कक्ष सक्रिय।');
    } else {
      showAdminToast('गलत मास्टर PIN! कृपया पुनः प्रयास करें।', true);
      if (pinInput) pinInput.focus();
    }
  };

  window.verifyMasterCredentials = function () {
    const idInput = document.getElementById('inputMasterUserId');
    const passInput = document.getElementById('inputMasterPassword');
    const idVal = idInput ? idInput.value.trim() : '';
    const passVal = passInput ? passInput.value.trim() : '';

    if (!idVal || !passVal) {
      alert('कृपया मास्टर यूजर ID एवं पासवर्ड दोनों दर्ज करें!');
      return;
    }

    if (idVal === MASTER_ADMIN_CONFIG.masterUserId && passVal === MASTER_ADMIN_CONFIG.masterPassword) {
      sessionStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyAuth, 'true');
      if (idInput) idInput.value = '';
      if (passInput) passInput.value = '';
      window.closeAdminPinModal();
      window.openAdminDashboard();
      showAdminToast('👑 एडमिन क्रेडेंशियल्स सत्यापित! स्वागत है, राहुल जी।');
    } else {
      showAdminToast('अवैध यूजर आईडी अथवा पासवर्ड!', true);
    }
  };

  // Self-Reset Recovery via Mock OTP
  window.openAdminSelfResetWorkflow = function () {
    const drawer = document.getElementById('adminResetOtpDrawer');
    if (drawer) drawer.classList.toggle('hidden');
  };

  window.triggerAdminResetOtp = function () {
    const mockOtp = '929700';
    window._lastAdminResetOtp = mockOtp;
    const verifyBox = document.getElementById('adminResetVerifyBox');
    if (verifyBox) verifyBox.classList.remove('hidden');
    alert(`[सुरक्षा सिमुलेशन]: अधिकृत मोबाइल ${MASTER_ADMIN_CONFIG.recoveryMobile} पर सुरक्षा OTP भेजा गया है:\n\n🔐 OTP: ${mockOtp}\n(सत्यापन हेतु दर्ज करें)`);
  };

  window.confirmAdminRecoveryOtp = function () {
    const inputOtp = document.getElementById('inputAdminRecoveryOtp')?.value.trim();
    if (inputOtp === window._lastAdminResetOtp || inputOtp === '9297' || inputOtp === '929700') {
      sessionStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyAuth, 'true');
      window.closeAdminPinModal();
      window.openAdminDashboard();
      showAdminToast('⚡ OTP सत्यापित! आपातकालीन एडमिन बाईपास सफल।');
    } else {
      alert('अमान्य OTP कोड! कृपया सही कोड दर्ज करें।');
    }
  };

  // =========================================================================
  // 5. ADMIN CONSOLE SHELL, HEADER CONTROLS & SAVE ENGINE
  // =========================================================================
  window.openAdminDashboard = function () {
    const modal = document.getElementById('modalAdminDashboard');
    if (!modal) return;
    modal.style.display = 'flex';

    // Inject Master Header Buttons: Save Changes & Admin Logout
    injectAdminHeaderButtons();

    // Default to USERS tab
    window.switchAdminTab('USERS');
  };

  window.closeAdminDashboard = function () {
    const modal = document.getElementById('modalAdminDashboard');
    if (modal) modal.style.display = 'none';
  };

  window.logoutAdmin = function () {
    if (confirm('क्या आप एडमिन कंसोल से लॉगआउट करना चाहते हैं?')) {
      sessionStorage.removeItem(MASTER_ADMIN_CONFIG.storageKeyAuth);
      window.closeAdminDashboard();
      showAdminToast('सुरक्षित एडमिन लॉगआउट संपन्न।');
      // Return to main gateway if available
      const screenMainApp = document.getElementById('screenMainApp');
      const screenGateway = document.getElementById('screenGateway');
      if (screenMainApp) screenMainApp.classList.add('hidden');
      if (screenGateway) screenGateway.classList.remove('hidden');
    }
  };

  function injectAdminHeaderButtons() {
    const header = document.querySelector('#admin-console-view header');
    if (!header) return;

    let btnContainer = document.getElementById('admin-header-actions-container');
    if (!btnContainer) {
      btnContainer = document.createElement('div');
      btnContainer.id = 'admin-header-actions-container';
      btnContainer.className = 'flex items-center gap-2';

      // Insert before close (X) button
      const closeBtn = header.querySelector('button');
      if (closeBtn) {
        header.insertBefore(btnContainer, closeBtn);
      } else {
        header.appendChild(btnContainer);
      }
    }

    btnContainer.innerHTML = `
      <button 
        type="button" 
        onclick="window.saveAllAdminSettings()" 
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 sm:px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 active:scale-98">
        <i class="fa-solid fa-floppy-disk"></i> <span>बदलाव सेव करें (Save Changes)</span>
      </button>

      <button 
        type="button" 
        onclick="window.logoutAdmin()" 
        class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 sm:px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 active:scale-98">
        <i class="fa-solid fa-right-from-bracket"></i> <span>एडमिन लॉगआउट (Logout)</span>
      </button>
    `;
  }

  /**
   * Persists all modified Bank accounts, Pricing plans, Theme branding, and Feature toggles
   */
  window.saveAllAdminSettings = function () {
    try {
      // 1. Gather Branding & Global Settings
      const appTitle = document.getElementById('adminSettingAppTitle')?.value.trim() || DEFAULT_GLOBAL_SETTINGS.appTitle;
      const tagline = document.getElementById('adminSettingTagline')?.value.trim() || DEFAULT_GLOBAL_SETTINGS.tagline;
      const logoUrl = document.getElementById('adminSettingLogoUrl')?.value.trim() || DEFAULT_GLOBAL_SETTINGS.logoUrl;
      const emergencyNotice = document.getElementById('adminSettingNotice')?.value.trim() || DEFAULT_GLOBAL_SETTINGS.emergencyNotice;
      const showNoticeBanner = document.getElementById('adminSettingNoticeToggle')?.checked ?? true;
      const allowDualPortalSwitch = document.getElementById('adminSettingDualPortalToggle')?.checked ?? true;
      const allowAiSurgeonAccess = document.getElementById('adminSettingAiSurgeonToggle')?.checked ?? true;

      const updatedSettings = {
        appTitle,
        tagline,
        logoUrl,
        emergencyNotice,
        showNoticeBanner,
        allowDualPortalSwitch,
        allowAiSurgeonAccess
      };
      localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeySettings, JSON.stringify(updatedSettings));

      // 2. Gather Pricing Plans from DOM
      const pricing = getStoredPricingPlans();
      // Doctor 1M, 3M, 1Y
      const doc1M = document.getElementById('price_doc_DOC_1M')?.value;
      const doc3M = document.getElementById('price_doc_DOC_3M')?.value;
      const doc1Y = document.getElementById('price_doc_DOC_1Y')?.value;
      if (doc1M) pricing.doctor[0].price = parseFloat(doc1M);
      if (doc3M) pricing.doctor[1].price = parseFloat(doc3M);
      if (doc1Y) pricing.doctor[2].price = parseFloat(doc1Y);

      // Farmer 1M, 3M, 1Y
      const far1M = document.getElementById('price_far_FAR_1M')?.value;
      const far3M = document.getElementById('price_far_FAR_3M')?.value;
      const far1Y = document.getElementById('price_far_FAR_1Y')?.value;
      if (far1M) pricing.farmer[0].price = parseFloat(far1M);
      if (far3M) pricing.farmer[1].price = parseFloat(far3M);
      if (far1Y) pricing.farmer[2].price = parseFloat(far1Y);

      localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyPricing, JSON.stringify(pricing));

      // 3. Update Global DOM if running
      const domTitle = document.getElementById('appHeaderTitle');
      const gatewayTitle = document.getElementById('gatewayAppTitle');
      const gatewayTagline = document.getElementById('gatewayTagline');
      const announcementBanner = document.getElementById('app-announcement-banner');

      if (domTitle) domTitle.innerText = appTitle;
      if (gatewayTitle) gatewayTitle.innerText = appTitle;
      if (gatewayTagline) gatewayTagline.innerText = tagline;

      if (announcementBanner) {
        if (showNoticeBanner && emergencyNotice) {
          announcementBanner.innerHTML = `
            <div class="bg-amber-500 text-slate-900 font-bold px-4 py-2 text-xs flex items-center justify-between border-b border-amber-600 shadow-xs">
              <div class="flex items-center gap-2">
                <span>📢</span> <span>${emergencyNotice}</span>
              </div>
              <button onclick="this.parentElement.remove()" class="text-slate-900 hover:text-white font-black text-xs">✕</button>
            </div>
          `;
        } else {
          announcementBanner.innerHTML = '';
        }
      }

      showAdminToast('💾 सम्पूर्ण बैंक खाते, दरें, ब्रांडिंग व नीतियां सफलतापूर्वक सुरक्षित की गईं!');
    } catch (err) {
      console.error('Error saving admin settings:', err);
      showAdminToast('सेटिंग्स सेव करने में त्रुटि!', true);
    }
  };

  // =========================================================================
  // 6. TABS CONTROLLER (USERS | PAYMENT & BANKS | BRANDING)
  // =========================================================================
  window.switchAdminTab = function (tabName) {
    const tabs = ['USERS', 'PAYMENT', 'BRANDING'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tabBtnAdmin${t}`);
      const panel = document.getElementById(`adminPanel${t}`);
      if (t === tabName) {
        if (btn) {
          btn.className = 'px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-black';
        }
        if (panel) panel.classList.remove('hidden');
      } else {
        if (btn) {
          btn.className = 'px-4 py-2 border-b-2 border-transparent text-slate-600 hover:text-slate-900 shrink-0 font-bold';
        }
        if (panel) panel.classList.add('hidden');
      }
    });

    if (tabName === 'USERS') window.renderAdminUsersPanel();
    if (tabName === 'PAYMENT') window.renderAdminPaymentPanel();
    if (tabName === 'BRANDING') window.renderAdminBrandingPanel();
  };

  // =========================================================================
  // 7. TAB 1: USERS LIVE TRACKER & LOCATION GEOGRAPHY FILTERS
  // =========================================================================
  window.renderAdminUsersPanel = function () {
    const panel = document.getElementById('adminPanelUSERS');
    if (!panel) return;

    const users = getStoredUsersList();
    const stateFilterVal = window._adminSelectedState || 'ALL';
    const districtFilterVal = window._adminSelectedDistrict || 'ALL';
    const roleFilterVal = window._adminSelectedRole || 'ALL';
    const searchQuery = (window._adminSearchQuery || '').toLowerCase();

    // Filter users
    const filteredUsers = users.filter(u => {
      if (stateFilterVal !== 'ALL' && u.state !== stateFilterVal) return false;
      if (districtFilterVal !== 'ALL' && u.district !== districtFilterVal) return false;
      if (roleFilterVal !== 'ALL' && u.role !== roleFilterVal) return false;
      if (searchQuery) {
        const str = `${u.name} ${u.phone} ${u.email} ${u.village} ${u.district}`.toLowerCase();
        if (!str.includes(searchQuery)) return false;
      }
      return true;
    });

    // Populate districts based on selected state
    const availableDistricts = stateFilterVal !== 'ALL' && STATE_DISTRICT_MAP[stateFilterVal]
      ? STATE_DISTRICT_MAP[stateFilterVal]
      : [];

    let html = `
      <div class="space-y-4">
        <!-- TOP STATS COUNTER -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">कुल पंजीकृत यूज़र</span>
            <div class="text-xl font-black text-blue-700">${users.length}</div>
          </div>
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">पशु चिकित्सक (Doctors)</span>
            <div class="text-xl font-black text-emerald-700">${users.filter(u => u.role === 'doctor').length}</div>
          </div>
          <div class="p-3 bg-teal-50 border border-teal-200 rounded-2xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">स्मार्ट पशुपालक (Farmers)</span>
            <div class="text-xl font-black text-teal-700">${users.filter(u => u.role === 'farmer').length}</div>
          </div>
          <div class="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">प्रतिबंधित यूज़र (Banned)</span>
            <div class="text-xl font-black text-rose-700">${users.filter(u => u.isBanned).length}</div>
          </div>
        </div>

        <!-- SEARCH & GEOGRAPHICAL STATE-DISTRICT FILTER BAR -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <h3 class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <span>📍</span> <span>राज्य व जिला भौगोलिक यूज़र फ़िल्टर (Location Filters)</span>
            </h3>
            
            <!-- RESET ALL USERS BUTTON -->
            <button 
              type="button" 
              onclick="window.resetAllUsersDatabase()" 
              class="text-[11px] bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl border border-rose-200 transition flex items-center gap-1.5">
              <i class="fa-solid fa-trash-can"></i> <span>🗑️ सभी पुराने यूज़र साफ़ करें (Reset All)</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <!-- Search Text -->
            <div class="sm:col-span-1">
              <input 
                type="text" 
                placeholder="🔍 नाम, फोन, ईमेल या गांव..." 
                value="${window._adminSearchQuery || ''}"
                oninput="window.handleAdminUserSearch(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" 
              />
            </div>

            <!-- Role Filter -->
            <div>
              <select onchange="window.handleAdminRoleFilter(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-slate-700">
                <option value="ALL" ${roleFilterVal === 'ALL' ? 'selected' : ''}>सभी भूमिकाएं (All Roles)</option>
                <option value="doctor" ${roleFilterVal === 'doctor' ? 'selected' : ''}>🩺 केवल डॉक्टर (Doctor)</option>
                <option value="farmer" ${roleFilterVal === 'farmer' ? 'selected' : ''}>🌾 केवल पशुपालक (Farmer)</option>
              </select>
            </div>

            <!-- State Filter -->
            <div>
              <select onchange="window.handleAdminStateFilter(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-slate-700">
                <option value="ALL">सभी राज्य (All States)</option>
                ${Object.keys(STATE_DISTRICT_MAP).map(st => `
                  <option value="${st}" ${stateFilterVal === st ? 'selected' : ''}>${st}</option>
                `).join('')}
              </select>
            </div>

            <!-- District Filter -->
            <div>
              <select onchange="window.handleAdminDistrictFilter(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-slate-700" ${stateFilterVal === 'ALL' ? 'disabled' : ''}>
                <option value="ALL">सभी जिले (All Districts)</option>
                ${availableDistricts.map(dst => `
                  <option value="${dst}" ${districtFilterVal === dst ? 'selected' : ''}>${dst}</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- USERS LIST CARDS / TABLE -->
        <div class="space-y-3">
          ${filteredUsers.length === 0 ? `
            <div class="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500">
              <span class="text-3xl">👥</span>
              <p class="text-xs font-bold mt-2">कोई यूज़र नहीं मिला!</p>
              <p class="text-[10px] text-slate-400">फ़िल्टर रीसेट करें अथवा नया पंजीकरण करें।</p>
            </div>
          ` : `
            ${filteredUsers.map(u => {
              const isDoc = u.role === 'doctor';
              const trialDate = new Date(u.trialExpires).toLocaleDateString('hi-IN');

              return `
                <div class="bg-white border ${u.isBanned ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-black text-slate-900">${u.name}</span>
                        <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${isDoc ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}">
                          ${isDoc ? '🩺 चिकित्सक (Doctor)' : '🌾 पशुपालक (Farmer)'}
                        </span>
                        ${u.isBanned ? '<span class="text-[9px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-md">प्रतिबंधित (BANNED)</span>' : ''}
                      </div>
                      <p class="text-[11px] text-slate-500 font-mono mt-0.5">
                        📱 ${u.phone} ${u.email ? `• ✉️ ${u.email}` : ''}
                      </p>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-bold text-slate-500">स्थान:</span>
                      <span class="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded-xl border border-slate-200 font-bold">
                        📍 ${u.state} • ${u.district} ${u.village ? `(${u.village})` : ''}
                      </span>
                    </div>
                  </div>

                  <!-- METADATA & PERMISSIONS ROW -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div class="p-2 bg-slate-50 rounded-xl">
                      <span class="text-[9px] text-slate-400 block font-bold uppercase">ट्रायल / वैधता:</span>
                      <span class="font-bold text-slate-800">${trialDate}</span>
                    </div>
                    <div class="p-2 bg-slate-50 rounded-xl">
                      <span class="text-[9px] text-slate-400 block font-bold uppercase">AI सर्जन एक्सेस:</span>
                      <span class="font-bold ${u.aiSurgeonEnabled ? 'text-purple-700' : 'text-slate-400'}">${u.aiSurgeonEnabled ? 'सक्रिय (Active)' : 'निष्क्रिय'}</span>
                    </div>
                    <div class="p-2 bg-slate-50 rounded-xl">
                      <span class="text-[9px] text-slate-400 block font-bold uppercase">ड्यूल पोर्टल स्विच:</span>
                      <span class="font-bold ${u.dualPortalAllowed ? 'text-emerald-700' : 'text-slate-400'}">${u.dualPortalAllowed ? 'स्वीकृत' : 'ब्लॉक'}</span>
                    </div>
                    <div class="p-2 bg-slate-50 rounded-xl">
                      <span class="text-[9px] text-slate-400 block font-bold uppercase">पंजीकरण तिथि:</span>
                      <span class="font-bold text-slate-700">${u.registeredAt}</span>
                    </div>
                  </div>

                  <!-- ADMIN ACTION BUTTONS -->
                  <div class="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                    <!-- Trial Extensions -->
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] font-bold text-slate-400">ट्रायल बढ़ाएं:</span>
                      <button onclick="window.extendUserTrial('${u.id}', 1)" class="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-blue-200">+24h</button>
                      <button onclick="window.extendUserTrial('${u.id}', 7)" class="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-blue-200">+7d</button>
                      <button onclick="window.extendUserTrial('${u.id}', 30)" class="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-blue-200">+30d</button>
                    </div>

                    <div class="h-4 w-px bg-slate-200 my-auto"></div>

                    <!-- AI Toggle -->
                    <button onclick="window.toggleUserPermission('${u.id}', 'aiSurgeonEnabled')" class="bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-purple-200">
                      ${u.aiSurgeonEnabled ? 'AI सर्जन बंद करें' : 'AI सर्जन चालू करें'}
                    </button>

                    <!-- Dual Portal Toggle -->
                    <button onclick="window.toggleUserPermission('${u.id}', 'dualPortalAllowed')" class="bg-teal-50 hover:bg-teal-100 text-teal-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-teal-200">
                      ${u.dualPortalAllowed ? 'ड्यूल पोर्टल रोकें' : 'ड्यूल पोर्टल चालू करें'}
                    </button>

                    <!-- Ban / Unban -->
                    <button onclick="window.toggleUserBan('${u.id}')" class="px-2 py-1 rounded-lg text-[10px] font-bold ${u.isBanned ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
                      ${u.isBanned ? '🔓 अनबैन करें' : '🚫 बैन करें'}
                    </button>

                    <!-- Delete Single User -->
                    <button onclick="window.deleteUser('${u.id}')" class="bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-rose-200 ml-auto">
                      🗑️ डिलीट
                    </button>
                  </div>

                </div>
              `;
            }).join('')}
          `}
        </div>

      </div>
    `;

    panel.innerHTML = html;
  };

  // Filter Event Handlers
  window.handleAdminUserSearch = function (q) {
    window._adminSearchQuery = q;
    window.renderAdminUsersPanel();
  };

  window.handleAdminRoleFilter = function (r) {
    window._adminSelectedRole = r;
    window.renderAdminUsersPanel();
  };

  window.handleAdminStateFilter = function (st) {
    window._adminSelectedState = st;
    window._adminSelectedDistrict = 'ALL';
    window.renderAdminUsersPanel();
  };

  window.handleAdminDistrictFilter = function (dst) {
    window._adminSelectedDistrict = dst;
    window.renderAdminUsersPanel();
  };

  // User Actions
  window.extendUserTrial = function (userId, days) {
    const users = getStoredUsersList();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    const currentExpire = new Date(target.trialExpires).getTime();
    const baseTime = currentExpire > Date.now() ? currentExpire : Date.now();
    target.trialExpires = new Date(baseTime + days * 86400000).toISOString();

    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyUsers, JSON.stringify(users));
    showAdminToast(`${target.name} का ट्रायल +${days} दिन बढ़ा दिया गया!`);
    window.renderAdminUsersPanel();
  };

  window.toggleUserPermission = function (userId, permKey) {
    const users = getStoredUsersList();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    target[permKey] = !target[permKey];
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyUsers, JSON.stringify(users));
    showAdminToast(`${target.name}: अनुमति अपडेट की गई।`);
    window.renderAdminUsersPanel();
  };

  window.toggleUserBan = function (userId) {
    const users = getStoredUsersList();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    target.isBanned = !target.isBanned;
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyUsers, JSON.stringify(users));
    showAdminToast(target.isBanned ? `${target.name} को प्रतिबंधित (Ban) किया गया!` : `${target.name} को अनबैन कर दिया गया।`);
    window.renderAdminUsersPanel();
  };

  window.deleteUser = function (userId) {
    if (!confirm('क्या आप निश्चित रूप से इस यूज़र का सम्पूर्ण डेटा हटाना चाहते हैं?')) return;
    let users = getStoredUsersList();
    users = users.filter(u => u.id !== userId);
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyUsers, JSON.stringify(users));
    showAdminToast('यूज़र रिकॉर्ड सफलता पूर्वक हटाया गया।');
    window.renderAdminUsersPanel();
  };

  window.resetAllUsersDatabase = function () {
    const code = prompt("⚠️ सभी यूज़र हटाने हेतु पुष्टि कोड '9297' दर्ज करें:");
    if (code === '9297') {
      localStorage.removeItem(MASTER_ADMIN_CONFIG.storageKeyUsers);
      showAdminToast('🗑️ संपूर्ण यूज़र डेटाबेस रीसेट किया गया!');
      window.renderAdminUsersPanel();
    } else if (code !== null) {
      alert('गलत पुष्टि कोड!');
    }
  };

  // =========================================================================
  // 8. TAB 2: FULL PAYOUT BANK ACCOUNT & SUBSCRIPTION PLANS MANAGER
  // =========================================================================
  window.renderAdminPaymentPanel = function () {
    const panel = document.getElementById('adminPanelPAYMENT');
    if (!panel) return;

    const banks = getStoredBankAccounts();
    const pricing = getStoredPricingPlans();

    let html = `
      <div class="space-y-6">

        <!-- 1. BANK ACCOUNTS & UPI MANAGER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <span>🏦</span> <span>पे-आउट बैंक खाते व यूपीआई आईडी प्रबंधक (Payout Bank & UPI Manager)</span>
              </h3>
              <p class="text-[11px] text-slate-500 font-medium">किसानों व डॉक्टरों द्वारा सीधे सब्सक्रिप्शन भुगतान प्राप्त करने वाले खाते</p>
            </div>
            <button 
              type="button" 
              onclick="window.openAddNewBankModal()" 
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto">
              <i class="fa-solid fa-plus"></i> <span>नया बैंक खाता जोड़ें</span>
            </button>
          </div>

          <!-- BANK CARDS LIST -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${banks.map((b, idx) => `
              <div class="bg-slate-50 border ${b.isPrimary ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'} rounded-2xl p-4 space-y-2.5 relative">
                <div class="flex items-center justify-between">
                  <span class="font-black text-slate-900 text-xs flex items-center gap-1.5">
                    <i class="fa-solid fa-building-columns text-blue-600"></i> ${b.bankName}
                  </span>
                  ${b.isPrimary ? `
                    <span class="text-[9px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">प्राथमिक खाता (Primary)</span>
                  ` : `
                    <button onclick="window.setPrimaryBankAccount('${b.id}')" class="text-[10px] text-blue-600 hover:underline font-bold">प्राथमिक बनाएं</button>
                  `}
                </div>

                <div class="space-y-1.5 text-xs">
                  <div>
                    <label class="text-[9px] text-slate-400 uppercase font-bold block">खाता धारक (Payee Name):</label>
                    <input 
                      type="text" 
                      value="${b.payeeName}" 
                      onchange="window.updateBankField('${b.id}', 'payeeName', this.value)"
                      class="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800 outline-none" 
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="text-[9px] text-slate-400 uppercase font-bold block">खाता संख्या (A/C No):</label>
                      <input 
                        type="password" 
                        value="${b.accountNo}" 
                        id="bank_acc_${b.id}"
                        onchange="window.updateBankField('${b.id}', 'accountNo', this.value)"
                        class="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-mono font-bold text-slate-800 outline-none" 
                      />
                    </div>
                    <div>
                      <label class="text-[9px] text-slate-400 uppercase font-bold block">IFSC कोड:</label>
                      <input 
                        type="text" 
                        value="${b.ifscCode}" 
                        onchange="window.updateBankField('${b.id}', 'ifscCode', this.value)"
                        class="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-mono font-bold text-slate-800 uppercase outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label class="text-[9px] text-slate-400 uppercase font-bold block">UPI ID (GooglePay / PhonePe / Paytm):</label>
                    <input 
                      type="text" 
                      value="${b.upiId}" 
                      onchange="window.updateBankField('${b.id}', 'upiId', this.value)"
                      class="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-mono font-bold text-emerald-700 outline-none" 
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <button type="button" onclick="window.toggleHtmlPasswordVisibility('bank_acc_${b.id}', this)" class="text-[10px] text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1">
                    <i class="fa-solid fa-eye"></i> <span>खाता संख्या देखें/छिपाएं</span>
                  </button>

                  <button type="button" onclick="window.deleteBankAccount('${b.id}')" class="text-[10px] text-rose-600 hover:text-rose-800 font-bold">
                    <i class="fa-solid fa-trash"></i> हटाएं
                  </button>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. INDEPENDENT SUBSCRIPTION PLANS MANAGER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-5">
          <div class="border-b border-slate-100 pb-2.5">
            <h3 class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <span>💳</span> <span>स्वतंत्र सब्सक्रिप्शन दरें प्रबंधक (Doctor vs Farmer Pricing Engine)</span>
            </h3>
            <p class="text-[11px] text-slate-500 font-medium">चिकित्सक व पशुपालक दोनों के लिए अलग-अलग मासिक व वार्षिक दरें तय करें</p>
          </div>

          <!-- DOCTOR PLANS SECTION -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-blue-700 flex items-center gap-1.5">
                <span>🩺</span> <span>पशु चिकित्सक प्लान (Veterinary Practitioner Plans)</span>
              </span>
              <button onclick="window.addNewPlanTier('doctor')" class="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-xl border border-blue-200">+ नया टियर जोड़ें</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${pricing.doctor.map(plan => `
                <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900">${plan.name}</span>
                    <span class="text-[9px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">${plan.tag}</span>
                  </div>

                  <div>
                    <label class="text-[9px] text-slate-400 font-bold uppercase block">शुल्क दर (₹ Price):</label>
                    <input 
                      id="price_doc_${plan.id}" 
                      type="number" 
                      value="${plan.price}" 
                      class="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono font-black text-blue-700 outline-none" 
                    />
                  </div>

                  <div class="text-[10px] text-slate-500 space-y-0.5">
                    <span class="font-bold block">शामिल विशेषताएं:</span>
                    ${plan.features.map(f => `<div>• ${f}</div>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- FARMER PLANS SECTION -->
          <div class="space-y-3 pt-3 border-t border-slate-100">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                <span>🌾</span> <span>स्मार्ट पशुपालक प्लान (Smart Farmer Dairy Plans)</span>
              </span>
              <button onclick="window.addNewPlanTier('farmer')" class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-xl border border-emerald-200">+ नया टियर जोड़ें</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${pricing.farmer.map(plan => `
                <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-black text-slate-900">${plan.name}</span>
                    <span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">${plan.tag}</span>
                  </div>

                  <div>
                    <label class="text-[9px] text-slate-400 font-bold uppercase block">शुल्क दर (₹ Price):</label>
                    <input 
                      id="price_far_${plan.id}" 
                      type="number" 
                      value="${plan.price}" 
                      class="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono font-black text-emerald-700 outline-none" 
                    />
                  </div>

                  <div class="text-[10px] text-slate-500 space-y-0.5">
                    <span class="font-bold block">शामिल विशेषताएं:</span>
                    ${plan.features.map(f => `<div>• ${f}</div>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    panel.innerHTML = html;
  };

  // Bank Actions
  window.updateBankField = function (bankId, field, value) {
    const banks = getStoredBankAccounts();
    const b = banks.find(item => item.id === bankId);
    if (b) {
      b[field] = value;
      localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyBanks, JSON.stringify(banks));
      showAdminToast('बैंक विवरण अपडेट किया गया।');
    }
  };

  window.setPrimaryBankAccount = function (bankId) {
    const banks = getStoredBankAccounts();
    banks.forEach(b => {
      b.isPrimary = (b.id === bankId);
    });
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyBanks, JSON.stringify(banks));
    showAdminToast('प्राथमिक पे-आउट खाता सेट किया गया!');
    window.renderAdminPaymentPanel();
  };

  window.deleteBankAccount = function (bankId) {
    if (!confirm('क्या आप इस बैंक खाते को हटाना चाहते हैं?')) return;
    let banks = getStoredBankAccounts();
    banks = banks.filter(b => b.id !== bankId);
    localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyBanks, JSON.stringify(banks));
    showAdminToast('बैंक खाता हटाया गया।');
    window.renderAdminPaymentPanel();
  };

  window.openAddNewBankModal = function () {
    const bName = prompt('बैंक का नाम (उदा. HDFC Bank):');
    const pName = prompt('खाता धारक का नाम (Payee Name):');
    const aNum = prompt('खाता संख्या (Account Number):');
    const ifsc = prompt('IFSC कोड:');
    const upi = prompt('UPI ID (उदा. rahul@okhdfcbank):');

    if (bName && aNum && ifsc) {
      const banks = getStoredBankAccounts();
      banks.push({
        id: 'BANK_' + Date.now(),
        bankName: bName,
        payeeName: pName || 'Vetcare Merchant',
        accountNo: aNum,
        ifscCode: ifsc.toUpperCase(),
        upiId: upi || '',
        isPrimary: banks.length === 0
      });
      localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyBanks, JSON.stringify(banks));
      showAdminToast('नया बैंक खाता सफलतापूर्वक जोड़ा गया!');
      window.renderAdminPaymentPanel();
    }
  };

  window.addNewPlanTier = function (role) {
    const name = prompt(`नया ${role === 'doctor' ? 'चिकित्सक' : 'पशुपालक'} प्लान नाम दर्ज करें:`);
    const price = prompt('प्लान की दर (₹ Price):');
    const days = prompt('वैधता (दिनों में - Days):', '30');

    if (name && price) {
      const pricing = getStoredPricingPlans();
      pricing[role].push({
        id: `${role.slice(0, 3).toUpperCase()}_${Date.now()}`,
        name: name,
        durationDays: parseInt(days) || 30,
        price: parseFloat(price) || 0,
        tag: 'नया प्लान',
        features: ['कस्टम क्लिनिकल एक्सेस', '24x7 सपोर्ट']
      });
      localStorage.setItem(MASTER_ADMIN_CONFIG.storageKeyPricing, JSON.stringify(pricing));
      showAdminToast('नया सब्सक्रिप्शन टियर जोड़ा गया!');
      window.renderAdminPaymentPanel();
    }
  };

  // =========================================================================
  // 9. TAB 3: BRANDING, LOGO & APP IDENTITY
  // =========================================================================
  window.renderAdminBrandingPanel = function () {
    const panel = document.getElementById('adminPanelBRANDING');
    if (!panel) return;

    const s = getStoredGlobalSettings();

    let html = `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div class="border-b border-slate-100 pb-2.5">
          <h3 class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <span>🎨</span> <span>ब्रांडिंग, लोगो व सिस्टम पहचान (Branding & Global Controls)</span>
          </h3>
          <p class="text-[11px] text-slate-500 font-medium">शीर्षक, टैगलाइन, अलर्ट बैनर व परमिशन टॉगल्स का मास्टर कंट्रोल</p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">एप्लीकेशन नाम (App Title):</label>
            <input id="adminSettingAppTitle" type="text" value="${s.appTitle}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 outline-none focus:border-blue-500" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">टैगलाइन व विवरण (Gateway Tagline):</label>
            <input id="adminSettingTagline" type="text" value="${s.tagline}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 outline-none focus:border-blue-500" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">लोगो इमेज URL (Logo URL):</label>
            <input id="adminSettingLogoUrl" type="url" value="${s.logoUrl}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-700 outline-none focus:border-blue-500" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">ग्लोबल इमरजेंसी अनाउंसमेंट बैनर (Emergency Alert):</label>
            <textarea id="adminSettingNotice" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-blue-500">${s.emergencyNotice}</textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <label class="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl cursor-pointer bg-slate-50">
              <input id="adminSettingNoticeToggle" type="checkbox" ${s.showNoticeBanner ? 'checked' : ''} class="accent-emerald-600" />
              <span class="font-bold text-slate-800 text-[11px]">अलर्ट बैनर दिखाएं</span>
            </label>

            <label class="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl cursor-pointer bg-slate-50">
              <input id="adminSettingDualPortalToggle" type="checkbox" ${s.allowDualPortalSwitch ? 'checked' : ''} class="accent-blue-600" />
              <span class="font-bold text-slate-800 text-[11px]">ड्यूल पोर्टल स्विच खुला रखें</span>
            </label>

            <label class="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl cursor-pointer bg-slate-50">
              <input id="adminSettingAiSurgeonToggle" type="checkbox" ${s.allowAiSurgeonAccess ? 'checked' : ''} class="accent-purple-600" />
              <span class="font-bold text-slate-800 text-[11px]">लाइव AI सर्जन सक्रिय रखें</span>
            </label>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button type="button" onclick="window.saveAllAdminSettings()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-2xl text-xs shadow-md transition flex items-center gap-2">
            <i class="fa-solid fa-floppy-disk"></i> <span>ब्रांडिंग सेटिंग्स सेव करें</span>
          </button>
        </div>
      </div>
    `;

    panel.innerHTML = html;
  };

  // =========================================================================
  // 10. BOOTSTRAP ON LOAD
  // =========================================================================
  window.initAdminPanelEngine = function () {
    // If admin already has an active authenticated session, keep dashboard available
    const isAuth = sessionStorage.getItem(MASTER_ADMIN_CONFIG.storageKeyAuth);
    if (isAuth === 'true') {
      injectAdminHeaderButtons();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initAdminPanelEngine);
  } else {
    window.initAdminPanelEngine();
  }

})();
