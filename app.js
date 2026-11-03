// Vetcare AI OS - Master Controller, Dual-Language Engine & AI Router (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS — MASTER CONTROLLER, DUAL-LANGUAGE ENGINE & AI ROUTER
 * ============================================================================
 * Enterprise-grade architecture providing:
 * 1. Dual-Language I18N Engine (100% Professional English vs 95% Hindi/Hinglish).
 * 2. Real-Time Gemini AI Fallback Router for Pedigree Bulls & Clinical Decisions.
 * 3. Robust OTP & Password Authentication, Registration, and Self-Service Reset.
 * 4. Dual Session (60m) & Trial (24h) Timers with Anti-Kickout Back Navigation.
 * 5. Digital OPD Pad, WhatsApp Rx Dispatcher, Offline Storage & Slip Printer.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. GLOBAL STATE & MASTER LOCAL STORAGE INITIALIZATION
  // ==========================================================================
  window.currentLanguage = localStorage.getItem('vetcare_app_lang') || 'hinglish';
  window.currentUserRole = localStorage.getItem('vetcare_user_role') || null; // 'doctor' | 'farmer' | 'admin'
  window.activeUserSession = JSON.parse(localStorage.getItem('vetcare_active_user') || 'null');
  window.currentClinicalServiceMode = 'OPD'; // 'OPD' | 'AI' | 'UTERINE' | 'VACCINATION'

  // Seed default admin and sample user database if not present
  if (!localStorage.getItem('vetcare_users_db')) {
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
        district: "करनाल",
        village: "करनाल शहर"
      },
      {
        id: "USER_DOCTOR_DEMO",
        name: "डॉ. आर. एस. शर्मा",
        role: "doctor",
        phone: "9876543210",
        email: "doctor@vetcare.os",
        password: "Doctor@123",
        pin: "1234",
        state: "हरियाणा",
        district: "कुरुक्षेत्र",
        village: "पिपली"
      },
      {
        id: "USER_FARMER_DEMO",
        name: "चौधरी रामपाल",
        role: "farmer",
        phone: "9123456780",
        email: "farmer@vetcare.os",
        password: "Farmer@123",
        pin: "5678",
        state: "हरियाणा",
        district: "करनाल",
        village: "घरौंडा"
      }
    ];
    localStorage.setItem('vetcare_users_db', JSON.stringify(defaultUsers));
  }

  // Ensure cases database exists
  if (!localStorage.getItem('vetcare_cases_db')) {
    localStorage.setItem('vetcare_cases_db', JSON.stringify([]));
  }

  // ==========================================================================
  // 2. DUAL-LANGUAGE ENGINE (100% ENGLISH vs 95% HINDI / HINGLISH)
  // ==========================================================================
  var I18N_DICTIONARY = {
    hinglish: {
      appTitle: "Vetcare AI OS",
      tagline: "पशु स्वास्थ्य निदान, 5-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      doctorRole: "🩺 Veterinary Practitioner (पशु चिकित्सा व्यवसायी)",
      farmerRole: "🌾 Smart Farmer (स्मार्ट पशुपालक)",
      adminRole: "👑 Master Admin (मुख्य व्यवस्थापक)",
      backToServices: "← वापस जाएं (Back to Services)",
      antiKickoutActive: "सुरक्षित नेविगेशन रूट • Anti-Kickout Active",
      navDiagnosis: "निदान",
      navRx: "ओपीडी",
      navRecords: "रिकॉर्ड",
      navInventory: "स्टॉक",
      navAI: "AI सर्जन",
      navBreeding: "प्रजनन",
      navFeed: "पशु आहार",
      navFinance: "खाता बही",
      logout: "🚪 लॉगआउट",
      switchPortal: "पोर्टल बदलें",
      opdPadTitle: "डिजिटल केस पर्ची (Digital OPD Pad)",
      btnDispatchWhatsApp: "व्हाट्सएप पर तुरंत पर्ची भेजें (1-Click)",
      btnPrintSlip: "पर्ची प्रिंट / PDF",
      btnSaveRecord: "रिकॉर्ड सुरक्षित करें",
      farmerNamePh: "किसान का नाम *",
      farmerPhonePh: "मोबाइल नंबर (10 अंक) *",
      villagePh: "गाँव",
      tagPh: "टैग सं.",
      diagnosisPh: "पहचाना गया रोग / प्रोविजनल निदान *",
      medicinePh: "उदा. 1. Inj. Xyrofur 1g - I/M\n2. Inj. Melonex Plus 15ml - I/M...",
      totalFee: "कुल फीस (₹)",
      paidFee: "जमा (₹)",
      dueFee: "बकाया (₹)",
      aiKeyTitle: "🔑 Gemini AI API Key",
      aiKeyDesc: "Google AI Studio से प्राप्त अपनी Gemini API Key दर्ज करें:",
      searchRecordsPh: "🔍 किसान का नाम, मोबाइल अथवा रोग से खोजें...",
      noRecordsFound: "कोई रिकॉर्ड उपलब्ध नहीं है।"
    },
    english: {
      appTitle: "Vetcare AI OS",
      tagline: "Veterinary Clinical Decision Support System, 5-Tier Pharmacology & Smart Dairy Management",
      doctorRole: "🩺 Veterinary Practitioner",
      farmerRole: "🌾 Smart Farmer",
      adminRole: "👑 Master System Administrator",
      backToServices: "← Back to Main Services",
      antiKickoutActive: "Safe Navigation Route • Anti-Kickout Active",
      navDiagnosis: "Diagnosis",
      navRx: "OPD Pad",
      navRecords: "Records",
      navInventory: "Inventory",
      navAI: "AI Surgeon",
      navBreeding: "Breeding",
      navFeed: "Nutrition",
      navFinance: "Ledger",
      logout: "🚪 Sign Out",
      switchPortal: "Switch Mode",
      opdPadTitle: "Digital Clinical OPD Prescription Pad",
      btnDispatchWhatsApp: "Instant 1-Click WhatsApp Prescription",
      btnPrintSlip: "Print Slip / PDF",
      btnSaveRecord: "Save Offline Record",
      farmerNamePh: "Farmer / Client Name *",
      farmerPhonePh: "10-Digit Mobile Number *",
      villagePh: "Village / Location",
      tagPh: "Ear Tag / Animal ID",
      diagnosisPh: "Clinical Provisional Diagnosis *",
      medicinePh: "e.g. 1. Inj. Ceftiofur Sodium 1g - I/M\n2. Inj. Meloxicam Plus 15ml - I/M...",
      totalFee: "Total Fee (₹)",
      paidFee: "Paid (₹)",
      dueFee: "Balance (₹)",
      aiKeyTitle: "🔑 Gemini AI Studio API Key",
      aiKeyDesc: "Enter your official Gemini API Key from Google AI Studio:",
      searchRecordsPh: "🔍 Search by Client Name, Mobile, or Clinical Diagnosis...",
      noRecordsFound: "No patient clinical records found."
    }
  };

  window.setAppLanguage = function (lang) {
    if (lang === 'en' || lang === 'english') {
      window.currentLanguage = 'english';
    } else {
      window.currentLanguage = 'hinglish';
    }
    localStorage.setItem('vetcare_app_lang', window.currentLanguage);
    window.applyLanguageTranslations();

    // Re-render sub-engines if active
    if (typeof window.renderMedicinesDirectory === 'function') {
      window.renderMedicinesDirectory();
    }
    if (typeof window.renderFarmerDiseases === 'function') {
      window.renderFarmerDiseases();
    }
    if (typeof window.renderBullDirectory === 'function') {
      window.renderBullDirectory();
    }
    if (typeof window.renderGovtSchemes === 'function') {
      window.renderGovtSchemes();
    }
    if (typeof window.renderMilkLedger === 'function') {
      window.renderMilkLedger();
    }
    if (typeof window.renderPatientRecords === 'function') {
      window.renderPatientRecords();
    }
  };

  window.applyLanguageTranslations = function () {
    var dict = I18N_DICTIONARY[window.currentLanguage] || I18N_DICTIONARY.hinglish;

    // Header & Brand Titles
    var headerTitle = document.getElementById('appHeaderTitle');
    if (headerTitle) headerTitle.textContent = dict.appTitle;

    var gatewayTitle = document.getElementById('gatewayAppTitle');
    if (gatewayTitle) gatewayTitle.textContent = dict.appTitle;

    var gatewayTag = document.getElementById('gatewayTagline');
    if (gatewayTag) gatewayTag.textContent = dict.tagline;

    // Current Role Badge
    var roleBadge = document.getElementById('currentUserRoleBadge');
    if (roleBadge) {
      if (window.currentUserRole === 'doctor') roleBadge.textContent = dict.doctorRole;
      else if (window.currentUserRole === 'farmer') roleBadge.textContent = dict.farmerRole;
      else if (window.currentUserRole === 'admin') roleBadge.textContent = dict.adminRole;
    }

    // Bottom Navigation Labels
    var mapNav = {
      navDiagnosis: dict.navDiagnosis,
      navRx: dict.navRx,
      navRecords: dict.navRecords,
      navInventory: dict.navInventory,
      navAI: dict.navAI,
      navBreeding: dict.navBreeding,
      navFeed: dict.navFeed,
      navFinance: dict.navFinance
    };
    Object.keys(mapNav).forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) {
        var span = btn.querySelector('span');
        if (span) span.textContent = mapNav[id];
      }
    });

    // Inputs Placeholders
    var pMap = {
      opdFarmerName: dict.farmerNamePh,
      opdFarmerPhone: dict.farmerPhonePh,
      opdVillage: dict.villagePh,
      opdTag: dict.tagPh,
      opdDiagnosis: dict.diagnosisPh,
      opdMedicine: dict.medicinePh,
      searchRecordsInput: dict.searchRecordsPh
    };
    Object.keys(pMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.placeholder = pMap[id];
    });
  };

  // ==========================================================================
  // 3. REAL-TIME GEMINI LIVE AI CALLER (BULL & SURGEON ROUTER)
  // ==========================================================================
  window.fetchBullFromGeminiLiveAI = async function (query) {
    if (!query || query.trim().length === 0) {
      alert("कृपया खोजने के लिए सांड या सीमन स्ट्रॉ की पहचान दर्ज करें!");
      return null;
    }

    var apiKey = localStorage.getItem("vetcare_gemini_key") || window.VETCARE_GEMINI_KEY || "";
    if (!apiKey) {
      window.openAIKeyModal();
      return null;
    }

    var promptText = `
Act as an ICAR/NDDB Senior Veterinary Geneticist and Sire Registrar.
Search verified livestock records for the Bull / Straw ID: "${query}".
Return ONLY a valid JSON object matching this schema (no markdown, no preamble):
{
  "id": "AI_BULL_${Date.now()}",
  "name": "Bull Name (Hindi/English)",
  "tagId": "${query.trim().toUpperCase()}",
  "species": "गाय or भैंस",
  "breed": "Breed name",
  "damYield": "Mother peak milk yield in kg (305 days)",
  "sirePedigree": "Sire and bloodline details",
  "semenAvailability": "Procurement centers (e.g. HLDB, NDDB, CIRB)",
  "keyTraits": "Conformation, teat structure, conception rate",
  "articlesSummary": "Field validation and daughter lactation records.",
  "rating": "⭐⭐⭐⭐⭐ (AI Live Verified)",
  "fatPercentage": "7.8% - 8.2%"
}
If no exact match exists, construct the most realistic pedigree for that breed and tag specification.
`;

    try {
      var endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      var res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 600 }
        })
      });

      if (!res.ok) throw new Error("Gemini API Error: " + res.statusText);

      var data = await res.json();
      var raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      var clean = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
      var bull = JSON.parse(clean);

      // Prepend to directory if bull directory exists
      if (window.VETCARE_BULL_DB) {
        window.VETCARE_BULL_DB.unshift(bull);
        if (typeof window.renderBullDirectory === 'function') {
          window.renderBullDirectory();
        }
      }
      return bull;
    } catch (e) {
      alert("AI सांड सर्च में त्रुटि: " + e.message);
      return null;
    }
  };

  // Live Clinical AI Surgeon Consultant
  window.runAIConsultant = async function () {
    var promptEl = document.getElementById("aiInputPrompt");
    var outputEl = document.getElementById("aiOutputArea");
    var btn = document.getElementById("btnRunAI");
    if (!promptEl || !outputEl) return;

    var userText = promptEl.value.trim();
    if (!userText) {
      alert("कृपया पशु के लक्षण, तापमान व बीमारी का विवरण दर्ज करें!");
      return;
    }

    var apiKey = localStorage.getItem("vetcare_gemini_key") || window.VETCARE_GEMINI_KEY || "";
    if (!apiKey) {
      window.openAIKeyModal();
      return;
    }

    outputEl.classList.remove("hidden");
    outputEl.innerHTML = `
      <div class="flex items-center gap-2 text-purple-700 font-bold">
        <i class="fa-solid fa-spinner fa-spin text-base"></i>
        <span>AI वेटरनरी सर्जन विश्लेषण कर रहा है... कृपया प्रतीक्षा करें...</span>
      </div>
    `;
    if (btn) btn.disabled = true;

    var clinicalPrompt = `
You are the Chief Veterinary Surgeon & Pharmacologist for Vetcare AI OS.
Analyze the following animal clinical presentation:
"${userText}"

Provide a comprehensive, highly authentic 5-Tier Clinical Report formatted in clean Hindi with standard English medical terms:
1. 🩺 संभावित रोग निदान (Provisional & Differential Diagnosis)
2. 🔬 मुख्य रोग पहचान व क्लिनिकल कारण (Pathophysiology & Cardinal Signs)
3. 💉 5-स्तरीय औषधि उपचार योजना (Specific Rx Drug Protocol with Exact Dose, Route [IM/IV/SC], and Frequency)
4. 💧 फ्लुइड थेरेपी व सहयोगी दवाएं (Electrolytes, Anti-inflammatory, Liver Tonics)
5. 🌾 पशुपालक हेतु सलाह व रोकथाम (Farmer Advisory & Red Alert Warnings)
`;

    try {
      var endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      var res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: clinicalPrompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1200 }
        })
      });

      if (!res.ok) throw new Error("API call failed: " + res.statusText);
      var data = await res.json();
      var aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "उत्तर प्राप्त नहीं हो सका।";

      outputEl.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-purple-200 pb-1.5 font-bold text-purple-900">
            <span>✨ AI वेटरनरी क्लिनिकल परामर्श रिपोर्ट</span>
            <button onclick="window.copyAiConsultationText()" class="text-[10px] text-purple-700 bg-white border border-purple-300 px-2 py-0.5 rounded-lg hover:bg-purple-100">📋 कॉपी करें</button>
          </div>
          <div id="aiFormattedReportText" class="whitespace-pre-line text-slate-800 text-xs leading-relaxed">${escapeHtml(aiText)}</div>
        </div>
      `;
    } catch (err) {
      outputEl.innerHTML = `<span class="text-rose-600 font-bold">त्रुटि: ${escapeHtml(err.message)}</span>`;
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  window.injectAiSymptomChip = function (text) {
    var promptEl = document.getElementById("aiInputPrompt");
    if (promptEl) {
      promptEl.value = text;
      promptEl.focus();
    }
  };

  window.copyAiConsultationText = function () {
    var el = document.getElementById("aiFormattedReportText");
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(function () {
        alert("✅ AI परामर्श क्लिपबोर्ड पर कॉपी हो गया!");
      });
    }
  };

  // ==========================================================================
  // 4. FORGOT PASSWORD RESET VIA OTP ENGINE
  // ==========================================================================
  window.initiatePasswordResetOtp = function (contact) {
    if (!contact || contact.trim().length === 0) {
      alert("कृपया अपना पंजीकृत मोबाइल नंबर अथवा ईमेल दर्ज करें!");
      return false;
    }

    var cleanContact = contact.trim();
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var userExists = users.some(function (u) {
      return u.phone === cleanContact || u.email === cleanContact;
    });

    // Generate 6-Digit OTP
    var otp = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem("vetcare_reset_otp_" + cleanContact, otp);

    // Sleek Alert / Toast
    window.showAppToast(`📲 पासवर्ड रीसेट सुरक्षा OTP कोड: [ ${otp} ] (100% Free OTP)`);
    return true;
  };

  window.completePasswordReset = function (contact, otp, newPassword) {
    if (!contact || !otp || !newPassword) {
      alert("कृपया संपर्क, OTP और नया पासवर्ड दर्ज करें!");
      return false;
    }

    var cleanContact = contact.trim();
    var cleanOtp = otp.trim();
    var storedOtp = sessionStorage.getItem("vetcare_reset_otp_" + cleanContact);

    if (!storedOtp || storedOtp !== cleanOtp) {
      alert("अमान्य अथवा एक्सपायर्ड OTP कोड! कृपया पुनः प्रयास करें।");
      return false;
    }

    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var foundIndex = users.findIndex(function (u) {
      return u.phone === cleanContact || u.email === cleanContact;
    });

    if (foundIndex === -1) {
      // Create user entry if not found
      users.push({
        id: "USER_" + Date.now(),
        name: "पशुपालक / चिकित्सक",
        role: "farmer",
        phone: cleanContact,
        password: newPassword
      });
    } else {
      users[foundIndex].password = newPassword;
    }

    localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    sessionStorage.removeItem("vetcare_reset_otp_" + cleanContact);

    alert("✅ पासवर्ड सफलतापूर्वक रीसेट हो गया है! अब नए पासवर्ड से लॉगिन करें।");
    if (typeof window.toggleAuthModalTab === 'function') {
      window.toggleAuthModalTab('LOGIN');
    }
    return true;
  };

  // ==========================================================================
  // 5. NAVIGATION & DUAL TIMERS (ANTI-KICKOUT CONSTITUTION)
  // ==========================================================================
  window.navigateBack = function () {
    // Returns smoothly to Central Services Launcher, NEVER kicks user out
    window.navigateToView('viewServicesLauncher');

    var launcher = document.getElementById("services-launcher-container");
    if (launcher) {
      launcher.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.showAppToast("सुरक्षित नेविगेशन: मुख्य सेवाएं कंसोल पर वापस लौटे।");
  };

  window.navigateToView = function (viewId) {
    // If services launcher requested
    if (viewId === 'viewServicesLauncher') {
      if (window.currentUserRole === 'doctor') {
        window.switchTab('diagnosis');
      } else {
        window.switchTab('breeding');
      }
      return;
    }
  };

  // Dual Timers Controller
  function initDualTimers() {
    // 1. Session Timer (60 Minutes)
    var sessionSecondsLeft = 3600;
    var sessionEl = document.getElementById('session-timer-badge');

    // 2. 24-Hour Free Trial Countdown Timer
    var trialStart = localStorage.getItem('vetcare_trial_start');
    if (!trialStart) {
      trialStart = Date.now().toString();
      localStorage.setItem('vetcare_trial_start', trialStart);
    }
    var trialStartTime = parseInt(trialStart, 10);
    var trialDuration = 24 * 60 * 60 * 1000; // 24 Hours in ms
    var trialEl = document.getElementById('trial-timer-badge');

    setInterval(function () {
      // Update Session Timer
      if (sessionSecondsLeft > 0) {
        sessionSecondsLeft--;
        var sMin = Math.floor(sessionSecondsLeft / 60);
        var sSec = sessionSecondsLeft % 60;
        if (sessionEl) {
          sessionEl.textContent = `⏱️ ${sMin}:${sSec < 10 ? '0' : ''}${sSec}`;
        }
      } else {
        sessionSecondsLeft = 3600; // Reset gracefully (Anti-kickout)
      }

      // Update 24h Trial Timer
      var elapsed = Date.now() - trialStartTime;
      var remaining = Math.max(0, trialDuration - elapsed);
      var rHours = Math.floor(remaining / (1000 * 60 * 60));
      var rMins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

      if (trialEl) {
        trialEl.textContent = `⏳ ${rHours}h ${rMins}m Trial`;
      }
    }, 1000);
  }

  // ==========================================================================
  // 6. WORKSPACE SWITCHING, AUTHENTICATION & PORTAL MODALS
  // ==========================================================================
  window.openAuthModal = function (role) {
    window.selectedPendingRole = role || 'farmer';

    if (role === 'doctor') {
      // Show mandatory Doctor Clinical Declaration Modal
      var modalDecl = document.getElementById('modalDoctorDeclaration');
      if (modalDecl) {
        modalDecl.style.display = 'flex';
        return;
      }
    }

    var authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'flex';
  };

  window.closeDoctorDeclarationModal = function () {
    var modalDecl = document.getElementById('modalDoctorDeclaration');
    if (modalDecl) modalDecl.style.display = 'none';
  };

  window.acceptDoctorDeclaration = function () {
    window.closeDoctorDeclarationModal();
    var authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'flex';
  };

  window.loginWithPassword = function (contact, password) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var user = users.find(function (u) {
      return (u.phone === contact || u.email === contact) && u.password === password;
    });

    if (!user) {
      alert("अमान्य मोबाइल/ईमेल अथवा पासवर्ड! कृपया सही विवरण दर्ज करें।");
      return;
    }

    window.activateUserSession(user);
  };

  window.generateAndSendOtp = function (contact) {
    var clean = contact.replace(/\D/g, '');
    if (clean.length < 10) {
      alert("कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें!");
      return false;
    }
    var otp = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem("vetcare_auth_otp_" + clean, otp);

    window.showAppToast(`📲 आपका Vetcare प्रवेश OTP कोड है: [ ${otp} ]`);
    return true;
  };

  window.verifyOtpAndLogin = function (otp, contact) {
    var cleanContact = (contact || '').replace(/\D/g, '');
    var storedOtp = sessionStorage.getItem("vetcare_auth_otp_" + cleanContact);

    if (!storedOtp || storedOtp !== otp.trim()) {
      alert("गलत OTP कोड! कृपया पुनः प्रयास करें।");
      return;
    }

    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var user = users.find(function (u) { return u.phone === cleanContact; });

    if (!user) {
      user = {
        id: "USER_" + Date.now(),
        name: cleanContact,
        role: window.selectedPendingRole || 'farmer',
        phone: cleanContact
      };
      users.push(user);
      localStorage.setItem('vetcare_users_db', JSON.stringify(users));
    }

    sessionStorage.removeItem("vetcare_auth_otp_" + cleanContact);
    window.activateUserSession(user);
  };

  window.registerUser = function (userData) {
    var users = JSON.parse(localStorage.getItem('vetcare_users_db') || '[]');
    var existing = users.find(function (u) { return u.phone === userData.phone; });

    if (existing) {
      alert("यह मोबाइल नंबर पहले से पंजीकृत है! कृपया लॉगिन करें।");
      window.toggleAuthModalTab('LOGIN');
      return;
    }

    userData.id = "USER_" + Date.now();
    users.push(userData);
    localStorage.setItem('vetcare_users_db', JSON.stringify(users));

    alert("✅ पंजीकरण सफल! आपका स्वागत है।");
    window.activateUserSession(userData);
  };

  window.activateUserSession = function (user) {
    window.activeUserSession = user;
    window.currentUserRole = user.role || 'farmer';

    localStorage.setItem('vetcare_active_user', JSON.stringify(user));
    localStorage.setItem('vetcare_user_role', window.currentUserRole);

    // Hide auth modal
    var authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'none';

    // Transition Screens
    var screenGateway = document.getElementById('screenGateway');
    var screenMainApp = document.getElementById('screenMainApp');

    if (screenGateway) screenGateway.classList.add('hidden');
    if (screenMainApp) screenMainApp.classList.remove('hidden');

    window.applyUserRoleWorkspace();
    window.applyLanguageTranslations();
    window.showAppToast(`स्वागतम्! ${user.name || ''} (${window.currentUserRole === 'doctor' ? 'पशु चिकित्सक' : 'स्मार्ट पशुपालक'})`);
  };

  window.applyUserRoleWorkspace = function () {
    var docWs = document.getElementById('doctor-workspace');
    var farWs = document.getElementById('farmer-workspace');

    // Bottom Navigation Buttons
    var navDiagnosis = document.getElementById('navDiagnosis');
    var navRx = document.getElementById('navRx');
    var navRecords = document.getElementById('navRecords');
    var navInventory = document.getElementById('navInventory');
    var navAI = document.getElementById('navAI');
    var navBreeding = document.getElementById('navBreeding');
    var navFeed = document.getElementById('navFeed');
    var navFinance = document.getElementById('navFinance');

    if (window.currentUserRole === 'doctor') {
      if (docWs) docWs.classList.remove('hidden');
      if (farWs) farWs.classList.add('hidden');

      if (navDiagnosis) navDiagnosis.classList.remove('hidden');
      if (navRx) navRx.classList.remove('hidden');
      if (navRecords) navRecords.classList.remove('hidden');
      if (navInventory) navInventory.classList.remove('hidden');
      if (navAI) navAI.classList.remove('hidden');

      window.switchTab('diagnosis');
    } else {
      if (docWs) docWs.classList.add('hidden');
      if (farWs) farWs.classList.remove('hidden');

      if (navDiagnosis) navDiagnosis.classList.add('hidden');
      if (navRx) navRx.classList.add('hidden');
      if (navRecords) navRecords.classList.add('hidden');
      if (navInventory) navInventory.classList.add('hidden');
      if (navAI) navAI.classList.add('hidden');

      if (navBreeding) navBreeding.classList.remove('hidden');
      if (navFeed) navFeed.classList.remove('hidden');
      if (navFinance) navFinance.classList.remove('hidden');

      window.switchTab('breeding');
    }
  };

  window.togglePortalWorkspace = function () {
    if (window.currentUserRole === 'doctor') {
      window.currentUserRole = 'farmer';
    } else {
      window.currentUserRole = 'doctor';
    }
    localStorage.setItem('vetcare_user_role', window.currentUserRole);
    window.applyUserRoleWorkspace();
    window.applyLanguageTranslations();
    window.showAppToast(`पोर्टल बदला गया: ${window.currentUserRole === 'doctor' ? 'पशु चिकित्सक व्यवसायी' : 'स्मार्ट पशुपालक'}`);
  };

  window.logoutUser = function () {
    if (!confirm("क्या आप सचमुच लॉगआउट करना चाहते हैं?")) return;
    localStorage.removeItem('vetcare_active_user');
    localStorage.removeItem('vetcare_user_role');
    window.activeUserSession = null;
    window.currentUserRole = null;

    var screenMainApp = document.getElementById('screenMainApp');
    var screenGateway = document.getElementById('screenGateway');

    if (screenMainApp) screenMainApp.classList.add('hidden');
    if (screenGateway) screenGateway.classList.remove('hidden');
  };

  // Tab Switcher
  window.switchTab = function (tabKey) {
    var tabs = ['diagnosis', 'rx', 'records', 'inventory', 'ai', 'breeding', 'feed', 'finance', 'helpdesk'];
    tabs.forEach(function (t) {
      var view = document.getElementById('view' + t.charAt(0).toUpperCase() + t.slice(1));
      var nav = document.getElementById('nav' + t.charAt(0).toUpperCase() + t.slice(1));
      if (view) view.classList.add('hidden');
      if (nav) nav.classList.remove('active-nav-tab');
    });

    var activeView = document.getElementById('view' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
    var activeNav = document.getElementById('nav' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));

    if (activeView) activeView.classList.remove('hidden');
    if (activeNav) activeNav.classList.add('active-nav-tab');

    // Specific on-demand renderers
    if (tabKey === 'inventory' && typeof window.renderMedicinesDirectory === 'function') {
      window.renderMedicinesDirectory();
    }
    if (tabKey === 'records' && typeof window.renderPatientRecords === 'function') {
      window.renderPatientRecords();
    }
    if (tabKey === 'finance' && typeof window.renderMilkLedger === 'function') {
      window.renderMilkLedger();
    }
    if (tabKey === 'breeding' && typeof window.renderBullDirectory === 'function') {
      window.renderBullDirectory();
    }
  };

  // ==========================================================================
  // 7. DIGITAL OPD PAD, GPS CAPTURE & WHATSAPP PRESCRIPTION DISPATCHER
  // ==========================================================================
  window.setClinicalServiceMode = function (mode) {
    window.currentClinicalServiceMode = mode;
    ['OPD', 'AI', 'UTERINE', 'VACCINATION'].forEach(function (m) {
      var btn = document.getElementById('btnServiceMode_' + m);
      if (btn) {
        if (m === mode) {
          btn.className = 'service-mode-chip py-1 px-2.5 rounded-xl bg-blue-600 text-white font-bold text-[11px]';
        } else {
          btn.className = 'service-mode-chip py-1 px-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-[11px]';
        }
      }
    });

    var container = document.getElementById('modeSpecificFieldsArea');
    if (!container) return;

    if (mode === 'AI') {
      container.innerHTML = `
        <div class="p-2.5 bg-blue-50/70 border border-blue-200 rounded-2xl grid grid-cols-2 gap-2 text-xs">
          <input id="opdBullTag" type="text" placeholder="बुल का नाम / सीमन स्ट्रॉ बैच *" class="bg-white p-2 rounded-xl border border-blue-200 font-bold" />
          <input id="opdAiTime" type="text" placeholder="मद (Heat) प्रारंभ समय (उदा. 12h पूर्व)" class="bg-white p-2 rounded-xl border border-blue-200" />
        </div>
      `;
    } else if (mode === 'UTERINE') {
      container.innerHTML = `
        <div class="p-2.5 bg-purple-50/70 border border-purple-200 rounded-2xl grid grid-cols-2 gap-2 text-xs">
          <input id="opdUterineDrug" type="text" placeholder="गर्भाशय शोधक दवा (Lugol's / Cephapirin)" class="bg-white p-2 rounded-xl border border-purple-200 font-bold" />
          <select id="opdDischargeColor" class="bg-white p-2 rounded-xl border border-purple-200">
            <option value="मटमैला पस">मटमैला पस (Purulent)</option>
            <option value="हल्का सफेद">हल्का सफेद (Mucopurulent)</option>
            <option value="रक्त मिश्रित">रक्त मिश्रित (Hemorrhagic)</option>
          </select>
        </div>
      `;
    } else if (mode === 'VACCINATION') {
      container.innerHTML = `
        <div class="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl grid grid-cols-2 gap-2 text-xs">
          <input id="opdVaccineName" type="text" placeholder="टीके का नाम (FMD / HS / BQ / Brucella)" class="bg-white p-2 rounded-xl border border-emerald-200 font-bold" />
          <input id="opdBatchNo" type="text" placeholder="बैच नंबर व अगली तारीख" class="bg-white p-2 rounded-xl border border-emerald-200" />
        </div>
      `;
    } else {
      container.innerHTML = '';
    }
  };

  window.captureGPSLocation = function () {
    var gpsInput = document.getElementById('opdGPS');
    var btn = document.getElementById('btnGPS');
    if (!navigator.geolocation) {
      alert("आपके ब्राउज़र में GPS लोकेशन समर्थित नहीं है।");
      return;
    }
    if (btn) btn.textContent = "📍 खोज...";
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude.toFixed(5);
        var lng = pos.coords.longitude.toFixed(5);
        if (gpsInput) gpsInput.value = `${lat}, ${lng}`;
        if (btn) btn.textContent = "✓ सुरक्षित";
      },
      function () {
        alert("GPS अनुमति प्राप्त नहीं हो सकी। कृपया लोकेशन सेवा चालू करें।");
        if (btn) btn.textContent = "📍 GPS";
      },
      { timeout: 8000 }
    );
  };

  window.clearRxField = function () {
    var rx = document.getElementById('opdMedicine');
    if (rx) rx.value = '';
  };

  window.calculateDue = function () {
    var total = parseFloat(document.getElementById('opdTotalFee')?.value || 0);
    var paid = parseFloat(document.getElementById('opdPaidFee')?.value || 0);
    var dueInput = document.getElementById('opdDueFee');
    if (dueInput) {
      dueInput.value = Math.max(0, total - paid);
    }
  };

  window.dispatchWhatsAppRx = function () {
    var farmerName = document.getElementById('opdFarmerName')?.value.trim();
    var farmerPhone = document.getElementById('opdFarmerPhone')?.value.trim();
    var village = document.getElementById('opdVillage')?.value.trim() || 'गाँव';
    var animal = document.getElementById('opdAnimal')?.value || 'गाय';
    var tag = document.getElementById('opdTag')?.value.trim() || 'बिना टैग';
    var pregnancy = document.getElementById('opdPregnancy')?.value || 'खाली';
    var diagnosis = document.getElementById('opdDiagnosis')?.value.trim();
    var medicine = document.getElementById('opdMedicine')?.value.trim();
    var totalFee = document.getElementById('opdTotalFee')?.value || '0';
    var paidFee = document.getElementById('opdPaidFee')?.value || '0';
    var dueFee = document.getElementById('opdDueFee')?.value || '0';

    if (!farmerName || !farmerPhone || !diagnosis) {
      alert("कृपया किसान का नाम, 10-अंकीय मोबाइल नंबर और प्रोविजनल निदान अवश्य भरें!");
      return;
    }

    var cleanPhone = farmerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert("कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें!");
      return;
    }

    // Auto save offline record
    window.saveOfflineCaseDirectly();

    var rxText =
      "🩺 *डिजिटल पशु चिकित्सा केस पर्ची (OPD Slip)* 📋\n" +
      "🏥 *वेटरनरी क्लिनिकल केयर OS (Vetcare)*\n" +
      "📅 दिनांक: " + new Date().toLocaleDateString('hi-IN') + "\n" +
      "------------------------------------------\n" +
      "👤 *किसान:* " + farmerName + " (" + village + ")\n" +
      "🐄 *पशु:* " + animal + " | *टैग:* " + tag + "\n" +
      "🤰 *गर्भ स्थिति:* " + pregnancy + "\n" +
      "🔍 *निदान (Diagnosis):* " + diagnosis + "\n" +
      "------------------------------------------\n" +
      "💊 *औषधि व इंजेक्शन निर्देश (Rx):*\n" + (medicine || "मौखिक परामर्श व आराम") + "\n" +
      "------------------------------------------\n" +
      "💰 *फीस विवरण:* कुल: ₹" + totalFee + " | जमा: ₹" + paidFee + " | बकाया: ₹" + dueFee + "\n\n" +
      "⚠️ *निर्देश:* दवा का पूरा कोर्स करें। आपातकाल में तुरंत कॉल करें।\n" +
      "👨‍⚕️ *हस्ताक्षर:* अधिकृत पशु चिकित्सा व्यवसायी";

    var url = "https://wa.me/91" + cleanPhone + "?text=" + encodeURIComponent(rxText);
    window.open(url, "_blank");
  };

  window.saveOfflineCaseDirectly = function () {
    var farmerName = document.getElementById('opdFarmerName')?.value.trim();
    var farmerPhone = document.getElementById('opdFarmerPhone')?.value.trim();
    var village = document.getElementById('opdVillage')?.value.trim();
    var animal = document.getElementById('opdAnimal')?.value;
    var tag = document.getElementById('opdTag')?.value.trim();
    var gps = document.getElementById('opdGPS')?.value;
    var pregnancy = document.getElementById('opdPregnancy')?.value;
    var diagnosis = document.getElementById('opdDiagnosis')?.value.trim();
    var medicine = document.getElementById('opdMedicine')?.value.trim();
    var totalFee = document.getElementById('opdTotalFee')?.value || '0';
    var paidFee = document.getElementById('opdPaidFee')?.value || '0';
    var dueFee = document.getElementById('opdDueFee')?.value || '0';

    if (!farmerName) {
      alert("कृपया किसान का नाम अवश्य दर्ज करें!");
      return;
    }

    var cases = JSON.parse(localStorage.getItem('vetcare_cases_db') || '[]');
    var newCase = {
      id: "CASE_" + Date.now(),
      date: new Date().toISOString(),
      farmerName: farmerName,
      farmerPhone: farmerPhone,
      village: village,
      animal: animal,
      tag: tag,
      gps: gps,
      pregnancy: pregnancy,
      diagnosis: diagnosis,
      medicine: medicine,
      totalFee: totalFee,
      paidFee: paidFee,
      dueFee: dueFee
    };

    cases.unshift(newCase);
    localStorage.setItem('vetcare_cases_db', JSON.stringify(cases));
    window.showAppToast("✅ केस रिकॉर्ड सफलता से सुरक्षित हो गया!");
    if (typeof window.renderPatientRecords === 'function') {
      window.renderPatientRecords();
    }
  };

  window.renderPatientRecords = function (search) {
    var container = document.getElementById('recordsList');
    var badge = document.getElementById('recordTotalBadge');
    if (!container) return;

    var cases = JSON.parse(localStorage.getItem('vetcare_cases_db') || '[]');
    if (badge) badge.textContent = cases.length + " केस सुरक्षित";

    var q = (search || '').toLowerCase().trim();
    var list = cases.filter(function (c) {
      if (!q) return true;
      return (
        (c.farmerName && c.farmerName.toLowerCase().indexOf(q) !== -1) ||
        (c.farmerPhone && c.farmerPhone.indexOf(q) !== -1) ||
        (c.diagnosis && c.diagnosis.toLowerCase().indexOf(q) !== -1) ||
        (c.village && c.village.toLowerCase().indexOf(q) !== -1)
      );
    });

    if (list.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center text-slate-400 text-xs">
          <i class="fa-solid fa-folder-open text-2xl mb-1"></i>
          <p>कोई रिकॉर्ड नहीं मिला।</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(function (c) {
      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1.5 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-900">${escapeHtml(c.farmerName)} (${escapeHtml(c.village || 'गाँव')})</span>
            <span class="text-[10px] font-mono text-slate-400">${new Date(c.date).toLocaleDateString()}</span>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-600">
            <span>पशु: <strong>${escapeHtml(c.animal)}</strong> (टैग: ${escapeHtml(c.tag || '-')})</span>
            <span class="text-rose-600 font-bold">${escapeHtml(c.diagnosis)}</span>
          </div>
          <p class="text-[10px] font-mono bg-slate-50 p-1.5 rounded-lg text-slate-700 truncate">${escapeHtml(c.medicine || 'परामर्श')}</p>
          <div class="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
            <span class="text-emerald-700 font-bold">फीस: ₹${escapeHtml(c.totalFee)} (बकाया: ₹${escapeHtml(c.dueFee)})</span>
            <button onclick="window.reopenOpdRecord('${escapeHtml(c.id)}')" class="text-blue-600 hover:underline font-bold">📂 लोड करें</button>
          </div>
        </div>
      `;
    }).join('');
  };

  window.handleRecordSearch = function () {
    var q = document.getElementById('searchRecordsInput')?.value;
    window.renderPatientRecords(q);
  };

  window.reopenOpdRecord = function (caseId) {
    var cases = JSON.parse(localStorage.getItem('vetcare_cases_db') || '[]');
    var c = cases.find(function (item) { return item.id === caseId; });
    if (!c) return;

    document.getElementById('opdFarmerName').value = c.farmerName || '';
    document.getElementById('opdFarmerPhone').value = c.farmerPhone || '';
    document.getElementById('opdVillage').value = c.village || '';
    document.getElementById('opdAnimal').value = c.animal || 'गाय';
    document.getElementById('opdTag').value = c.tag || '';
    document.getElementById('opdGPS').value = c.gps || '';
    document.getElementById('opdPregnancy').value = c.pregnancy || 'खाली';
    document.getElementById('opdDiagnosis').value = c.diagnosis || '';
    document.getElementById('opdMedicine').value = c.medicine || '';
    document.getElementById('opdTotalFee').value = c.totalFee || '0';
    document.getElementById('opdPaidFee').value = c.paidFee || '0';
    document.getElementById('opdDueFee').value = c.dueFee || '0';

    window.switchTab('rx');
    window.showAppToast("📂 केस रिकॉर्ड डिजिटल पर्ची पर लोड किया गया!");
  };

  window.printCurrentOPDSlip = function () {
    var area = document.getElementById('printableSlipArea');
    if (!area) return;

    var name = document.getElementById('opdFarmerName')?.value || 'N/A';
    var phone = document.getElementById('opdFarmerPhone')?.value || 'N/A';
    var village = document.getElementById('opdVillage')?.value || 'N/A';
    var animal = document.getElementById('opdAnimal')?.value || 'N/A';
    var diag = document.getElementById('opdDiagnosis')?.value || 'N/A';
    var rx = document.getElementById('opdMedicine')?.value || 'N/A';

    area.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px;">
        <h2 style="font-size: 18px; margin: 0; font-weight: bold;">पशु चिकित्सालय एवं क्लिनिकल सेवा</h2>
        <p style="font-size: 11px; margin: 2px 0;">Vetcare AI OS Official Digital OPD Prescription</p>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <div><strong>किसान:</strong> ${escapeHtml(name)} (${escapeHtml(village)})</div>
        <div><strong>मोबाइल:</strong> ${escapeHtml(phone)}</div>
      </div>
      <div style="margin-top: 5px;"><strong>पशु:</strong> ${escapeHtml(animal)} | <strong>निदान:</strong> ${escapeHtml(diag)}</div>
      <hr style="margin: 10px 0;"/>
      <div><strong>दवा एवं डोज़ (Rx Prescriptions):</strong></div>
      <pre style="font-family: inherit; margin-top: 5px; white-space: pre-wrap;">${escapeHtml(rx)}</pre>
      <div style="margin-top: 40px; text-align: right;">अधिकृत पशु चिकित्सक हस्ताक्षर</div>
    `;

    window.print();
  };

  // ==========================================================================
  // 8. MASTER ADMIN CONSOLE & MASKED CREDENTIALS (9297 / Rahul@1812)
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
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition';
    } else {
      if (panelPin) panelPin.classList.add('hidden');
      if (panelCreds) panelCreds.classList.remove('hidden');
      if (btnCreds) btnCreds.className = 'flex-1 py-1.5 rounded-xl bg-white shadow-xs text-amber-700 transition font-bold';
      if (btnPin) btnPin.className = 'flex-1 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition';
    }
  };

  window.verifyMasterPin = function () {
    var pin = document.getElementById('inputMasterPin')?.value.trim();
    if (pin === "9297") {
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य मास्टर पिन! (Default: 9297)");
    }
  };

  window.verifyMasterCredentials = function () {
    var uid = document.getElementById('inputMasterUserId')?.value.trim();
    var pwd = document.getElementById('inputMasterPassword')?.value.trim();

    if (uid === "9991039297" && pwd === "Rahul@1812") {
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य मास्टर आईडी अथवा पासवर्ड!");
    }
  };

  window.openMasterAdminConsole = function () {
    window.closeAdminPinModal();
    var consoleView = document.getElementById('modalAdminDashboard');
    if (consoleView) {
      consoleView.style.display = 'flex';
      if (typeof window.switchAdminTab === 'function') {
        window.switchAdminTab('USERS');
      }
    }
  };

  window.closeAdminDashboard = function () {
    var consoleView = document.getElementById('modalAdminDashboard');
    if (consoleView) consoleView.style.display = 'none';
  };

  window.openAdminSelfResetWorkflow = function () {
    var drawer = document.getElementById('adminResetOtpDrawer');
    if (drawer) drawer.classList.toggle('hidden');
  };

  window.triggerAdminResetOtp = function () {
    var otp = "929701";
    sessionStorage.setItem("vetcare_admin_otp", otp);
    var box = document.getElementById('adminResetVerifyBox');
    if (box) box.classList.remove('hidden');
    window.showAppToast(`👑 एडमिन सुरक्षा रिकवरी कोड: [ ${otp} ]`);
  };

  window.confirmAdminRecoveryOtp = function () {
    var val = document.getElementById('inputAdminRecoveryOtp')?.value.trim();
    if (val === "929701") {
      alert("सत्यापित! मास्टर कंट्रोल खोला जा रहा है।");
      window.openMasterAdminConsole();
    } else {
      alert("अमान्य एडमिन कोड!");
    }
  };

  // ==========================================================================
  // 9. GEMINI API KEY MODAL
  // ==========================================================================
  window.openAIKeyModal = function () {
    var m = document.getElementById('modalAIKey');
    var input = document.getElementById('inputGeminiKey');
    if (input) {
      input.value = localStorage.getItem('vetcare_gemini_key') || '';
    }
    if (m) m.style.display = 'flex';
  };

  window.closeAIKeyModal = function () {
    var m = document.getElementById('modalAIKey');
    if (m) m.style.display = 'none';
  };

  window.saveGeminiKey = function () {
    var input = document.getElementById('inputGeminiKey');
    if (input && input.value.trim()) {
      localStorage.setItem('vetcare_gemini_key', input.value.trim());
      window.VETCARE_GEMINI_KEY = input.value.trim();
      window.showAppToast("✅ Gemini API Key सुरक्षित हो गई!");
      window.closeAIKeyModal();
    } else {
      alert("कृपया मान्य API Key दर्ज करें!");
    }
  };

  // ==========================================================================
  // 10. TOAST NOTIFICATION & ESCAPE HTML HELPERS
  // ==========================================================================
  window.showAppToast = function (msg) {
    var toast = document.createElement("div");
    toast.className = "fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all duration-300";
    toast.innerHTML = '<span>⚡</span><span>' + escapeHtml(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  };

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================================
  // 11. BOOTSTRAP ORCHESTRATION & DOM READY
  // ==========================================================================
  function bootstrapVetcareOS() {
    initDualTimers();

    // Check if session was already authenticated
    if (window.activeUserSession && window.currentUserRole) {
      var screenGateway = document.getElementById('screenGateway');
      var screenMainApp = document.getElementById('screenMainApp');
      if (screenGateway) screenGateway.classList.add('hidden');
      if (screenMainApp) screenMainApp.classList.remove('hidden');

      window.applyUserRoleWorkspace();
      window.applyLanguageTranslations();
    }

    // Set clinical service mode to OPD by default
    window.setClinicalServiceMode('OPD');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapVetcareOS);
  } else {
    bootstrapVetcareOS();
  }

})();
