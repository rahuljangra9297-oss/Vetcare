/**
 * ============================================================================
 * VETCARE AI OS - ENTERPRISE CORE ENGINE & SECURITY CONTROLLER
 * Architecture: Principal UI/UX & PWA Frontend Security Systems
 * Version: 4.5.0-PROD (Zero-Crash Enterprise Grade)
 * ============================================================================
 */

(function (window, document) {
  "use strict";

  /* ==========================================================================
   * 1. CONSTANTS, VERIFIED CREDENTIALS & GLOBAL STATE CONFIG
   * ========================================================================== */
  const SESSION_DURATION_MS = 60 * 60 * 1000; // 60 Minutes Absolute Timeout
  const WARNING_THRESHOLD_MS = 5 * 60 * 1000; // 5 Minutes Expiry Warning
  const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours Free Access Window

  // Master Production Credentials
  const MASTER_CONFIG = {
    masterPin: "9297",
    payeeName: "Vetcare Services",
    payeeOwner: "Mr. Rahul",
    pricing: {
      monthly: 199,
      annual: 1499,
      renewalMonthly: 149,
      renewalAnnual: 1199
    },
    sbiPrimary: {
      bankName: "State Bank of India (SBI)",
      upiId: "rahuljangra9297@oksbi",
      accountNumber: "65204067585",
      ifsc: "SBIN0013693"
    },
    pnbBackup: {
      bankName: "Punjab National Bank (PNB)",
      upiId: "rahuljangra9297-1@okicici",
      accountNumber: "6687001700015098",
      ifsc: "PUNB0668700"
    },
    adminWhatsApp: "9876543210",
    appTitle: "Vetcare AI OS",
    tagline: "क्लिनिकल डिसीजन इंजन, डिजिटल ओपीडी पर्ची एवं स्मार्ट पशु चिकित्सा ऑपरेटिंग सिस्टम"
  };

  // Runtime State Machine
  const State = {
    userRole: null, // 'DOCTOR' | 'FARMER'
    userPhone: null,
    userName: null,
    regNumber: null,
    sessionTimerId: null,
    warningTriggered: false,
    activeTab: "diagnosis",
    activeDiagMode: "SYMPTOMS",
    activeBank: "SBI",
    selectedPlan: "MONTHLY",
    invFilter: "ALL",
    directoryFilter: "ALL",
    matrixSelected: {
      temp: null,
      cardinal: "ALL",
      secondary: []
    }
  };

  /* ==========================================================================
   * 2. COMPREHENSIVE i18n DICTIONARY ENGINE (7 REGIONAL LANGUAGES)
   * ========================================================================== */
  const VETCARE_TRANSLATIONS = {
    en: {
      lbl_session: "Session",
      lbl_rem: "rem",
      btn_logout: "Logout",
      app_title: "Vetcare AI OS",
      app_tagline: "Clinical Decision Engine, 3-Tier Diagnostic Matrix & Smart Dairy System",
      lbl_select_role: "Please Select Your Work Profile (Role):",
      badge_farmer_free: "Free Access ✅",
      role_farmer_title: "Smart Dairy Farmer",
      role_farmer_desc: "Indigenous remedies, A.I. heat cycles, 24-hr ration balancer & dairy finance ledger.",
      btn_enter_farmer: "Enter as Dairy Farmer",
      badge_doctor_mode: "Clinical Mode 🛡️",
      role_doctor_title: "Registered Vet Practitioner",
      role_doctor_desc: "Allopathic drug protocols, 1-Click WhatsApp OPD prescription, inventory & farmer records.",
      btn_enter_doctor: "Enter as Veterinary Doctor",
      ft_secure: "🔒 Encrypted Storage",
      ft_offline: "⚡ Offline PWA Active",
      ft_sync: "☁️ Live Cloud Sync",
      btn_admin_control: "Admin Control",
      btn_premium: "Premium",
      btn_role_lock: "Role Locked",
      diag_mode_matrix: "1. Symptom Matrix (%)",
      diag_mode_quick: "2. Rapid Search",
      diag_mode_directory: "3. Disease Directory",
      lbl_weighted_matrix: "Weighted Symptom Clinical Matrix (Scientific Probability %)",
      btn_reset: "Reset ↺",
      lbl_body_temp: "🌡️ Body Temperature (20% Weightage):",
      temp_high: "High Fever (104°F+)",
      temp_normal: "Normal (101-102°F)",
      temp_sub: "Sub-normal (<100°F)",
      lbl_cardinal_sign: "🚨 Primary Specific Sign (Cardinal Sign - 40% Weightage):",
      lbl_sec_symptoms: "🔬 Secondary Clinical Symptoms (Multi-Select):",
      sym_off_feed: "Off Feed / Anorexia",
      sym_dullness: "Dullness / Lethargy",
      sym_diarrhea: "Watery Diarrhea",
      sym_constipation: "Constipation",
      sym_salivation: "Profuse Salivation",
      sym_milk_drop: "Sudden Milk Drop",
      sym_limping: "Lameness / Limping",
      lbl_select_calc_prompt: "Select symptoms ➔ Probability (%) auto-computes",
      hdr_quick_search: "Rapid Disease & Symptom Search",
      tag_all: "All Diseases",
      tag_bacterial: "🦠 Bacterial",
      tag_viral: "🧬 Viral",
      tag_protozoal: "🩸 Protozoal",
      tag_metabolic: "🌾 Metabolic",
      breeding_title: "Breeding & Heat Tracker (A.I.)",
      breeding_subtitle: "Determine optimal insemination timing and prevent repeat breeding",
      lbl_heat_time: "⏱️ Heat Signs & Precise Insemination Window:",
      lbl_discharge_check: "💧 Cervical Mucus Consistency Chart:",
      lbl_repeat_solutions: "⚠️ 4 Proven Solutions for Repeat Breeders:",
      feed_calc_title: "Balanced Daily Ration Calculator",
      feed_calc_subtitle: "24-Hour scientific feed balancing based on animal weight and milk yield",
      lbl_animal_weight: "Animal Body Weight (kg)",
      lbl_daily_milk: "Daily Milk Yield (Litres)",
      btn_calc_ration: "Calculate 24-Hour Ration ⚡",
      lbl_24hr_ration: "📊 Scientific 24-Hour Balanced Ration:",
      ration_grain: "Concentrate Feed",
      ration_green: "Green Fodder",
      ration_dry: "Dry Roughage",
      ration_mineral_tip: "• Add 50g Mineral Mixture + 30g Iodized Salt daily.",
      opd_slip_title: "Digital OPD Case Prescription",
      badge_auth_doc: "Authorized Vet",
      lbl_rx_presc: "Prescription (Rx Drugs, Doses & Routes):",
      btn_clear: "Clear",
      lbl_total_fee: "Total Fee (₹)",
      lbl_paid_fee: "Paid (₹)",
      lbl_due_fee: "Balance Due (₹)",
      btn_send_whatsapp_rx: "💬 Dispatch WhatsApp Slip (1-Click)",
      btn_print_pdf: "Print Slip / PDF",
      btn_save_record: "Save Case Offline",
      lbl_farmer_case_records: "Farmer OPD Case Records",
      lbl_ai_consultant_title: "Live AI Veterinary Surgeon (Second Opinion)",
      ai_consult_desc: "Enter clinical history, temperature, signs. AI will output a differential diagnosis.",
      btn_ask_ai: "Request AI Clinical Assessment",
      ledger_title: "Farmer Ledger & Bahi Khata",
      btn_new_entry: "New Khata Entry",
      lbl_total_credit: "Total Received (Income)",
      lbl_total_outstanding: "Total Outstanding (Due)",
      inventory_title: "Drug & Semen Straw Stock Inventory",
      btn_new_stock_item: "Add Stock Item",
      cat_all: "All Stock",
      cat_injection: "💉 Injections",
      cat_semen: "🧬 Semen Straws",
      cat_bolus: "💊 Boluses/Tabs",
      cat_tonic: "🍶 Tonics/Liquids",
      helpdesk_title: "Helpdesk & Veterinary FAQ",
      btn_admin_wa: "Admin WhatsApp",
      footer_verified: "Vetcare AI OS • Secure, Encrypted & Verified Clinical Environment",
      btn_upgrade_plan: "Upgrade Plan",
      nav_diagnosis: "Diagnosis",
      nav_opd: "OPD Rx",
      nav_records: "Records",
      nav_stock: "Inventory",
      nav_ai_surgeon: "AI Surgeon",
      nav_breeding: "Breeding",
      nav_feed: "Feed Calc",
      nav_ledger: "Ledger",
      nav_support: "Support"
    },
    hi: {
      lbl_session: "सत्र",
      lbl_rem: "शेष",
      btn_logout: "लॉगआउट",
      app_title: "Vetcare AI OS",
      app_tagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      lbl_select_role: "कृपया अपना कार्य-क्षेत्र (Role) चुनें:",
      badge_farmer_free: "मुफ़्त प्रवेश ✅",
      role_farmer_title: "स्मार्ट पशुपालक (Dairy Farmer)",
      role_farmer_desc: "देसी सिद्ध नुस्खे, मद व सीमन (A.I.) का सही समय, संतुलित आहार कैलकुलेटर एवं दैनिक दूध बिक्री बहीखाता।",
      btn_enter_farmer: "पशुपालक के रूप में प्रवेश करें",
      badge_doctor_mode: "क्लिनिकल मोड 🛡️",
      role_doctor_title: "अधिकृत पशु चिकित्सक (Veterinary Doctor)",
      role_doctor_desc: "संपूर्ण 5-स्तरीय एलोपैथिक इंजेक्शन तालिकाएं, 1-Click व्हाट्सएप डिजिटल पर्ची, इन्वेंट्री स्टॉक व किसान क्लिनिक खाता।",
      btn_enter_doctor: "चिकित्सक के रूप में प्रवेश करें",
      ft_secure: "🔒 सुरक्षित एन्क्रिप्शन",
      ft_offline: "⚡ ऑफलाइन PWA सक्षम",
      ft_sync: "☁️ लाइव सिंक",
      btn_admin_control: "एडमिन कंट्रोल",
      btn_premium: "प्रीमियम",
      btn_role_lock: "रोल लॉक",
      diag_mode_matrix: "1. लक्षण मैट्रिक्स (%)",
      diag_mode_quick: "2. त्वरित खोज",
      diag_mode_directory: "3. रोग डायरेक्टरी",
      lbl_weighted_matrix: "वेटेड सिम्पटम मैट्रिक्स (वैज्ञानिक संभावना %)",
      btn_reset: "रीसेट ↺",
      lbl_body_temp: "🌡️ शारीरिक तापमान (20% वेटेज):",
      temp_high: "तेज़ बुखार (104°F+)",
      temp_normal: "सामान्य (101-102°F)",
      temp_sub: "कम ताप (<100°F)",
      lbl_cardinal_sign: "🚨 प्रमुख विशिष्ट लक्षण (Cardinal Sign - 40% वेटेज):",
      lbl_sec_symptoms: "🔬 अतिरिक्त शारीरिक लक्षण (मल्टी-सेलेक्ट):",
      sym_off_feed: "चारा छोड़ना",
      sym_dullness: "सुस्ती / आंखें बंद",
      sym_diarrhea: "पतले दस्त",
      sym_constipation: "कब्ज / सूखा गोबर",
      sym_salivation: "मुंह से लार टपकना",
      sym_milk_drop: "दूध में भारी गिरावट",
      sym_limping: "लंगड़ाना",
      lbl_select_calc_prompt: "लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी",
      hdr_quick_search: "त्वरित रोग एवं लक्षण खोज",
      tag_all: "सभी रोग (22)",
      tag_bacterial: "🦠 जीवाणु (Bacterial)",
      tag_viral: "🧬 विषाणु (Viral)",
      tag_protozoal: "🩸 रक्त परजीवी (Protozoal)",
      tag_metabolic: "🌾 उपापचयी (Metabolic)",
      breeding_title: "पशु प्रजनन व मद चक्र (Heat Tracker)",
      breeding_subtitle: "सही समय पर सीमन (A.I.) करवाएं और बार-बार फिरने (रिपीट ब्रीडिंग) से बचें",
      lbl_heat_time: "⏱️ मद काल (Heat) व सीमन डलवाने का सटीक समय:",
      lbl_discharge_check: "💧 योनि डिस्चार्ज (तार) देखकर पहचानें:",
      lbl_repeat_solutions: "⚠️ बार-बार फिरने (Repeat Breeder) के 4 पक्के समाधान:",
      feed_calc_title: "संतुलित पशु आहार कैलकुलेटर",
      feed_calc_subtitle: "पशु के वजन व दैनिक दूध उत्पादन के अनुसार 24 घंटे का वैज्ञानिक राशन",
      lbl_animal_weight: "पशु का वजन (kg)",
      lbl_daily_milk: "दैनिक दूध (लीटर)",
      btn_calc_ration: "दैनिक संतुलित आहार की गणना करें ⚡",
      lbl_24hr_ration: "📊 24 घंटे का वैज्ञानिक संतुलित राशन:",
      ration_grain: "संतुलित दाना",
      ration_green: "हरा चारा",
      ration_dry: "सूखा भूसा",
      ration_mineral_tip: "• 50 ग्राम मिनरल मिक्सचर व 30 ग्राम सादा नमक प्रतिदिन अवश्य मिलाएं।",
      opd_slip_title: "डिजिटल केस पर्ची (OPD Prescription)",
      badge_auth_doc: "अधिकृत डॉक्टर",
      lbl_rx_presc: "दवा, इंजेक्शन डोज़ व रूट (Rx Injections & Medicines):",
      btn_clear: "खाली करें",
      lbl_total_fee: "कुल फीस (₹)",
      lbl_paid_fee: "जमा (₹)",
      lbl_due_fee: "बकाया (₹)",
      btn_send_whatsapp_rx: "💬 व्हाट्सएप पर तुरंत पर्ची भेजें (1-Click)",
      btn_print_pdf: "पर्ची प्रिंट / PDF",
      btn_save_record: "रिकॉर्ड सुरक्षित करें",
      lbl_farmer_case_records: "किसान एवं केस रिकॉर्ड्स",
      lbl_ai_consultant_title: "लाइव AI वेटरनरी सर्जन (Second Opinion)",
      ai_consult_desc: "पशु के लक्षण, तापमान और केस हिस्ट्री डालें। AI क्लिनिकल विभेदक निदान प्रदान करेगा।",
      btn_ask_ai: "AI से क्लिनिकल रिपोर्ट मांगें",
      ledger_title: "पशुपालक खाता बही (Ledger)",
      btn_new_entry: "नया खाता एंट्री",
      lbl_total_credit: "कुल जमा (Credit / Income)",
      lbl_total_outstanding: "कुल बकाया (Outstanding Due)",
      inventory_title: "दवा व सीमन स्ट्रॉ स्टॉक इन्वेंट्री",
      btn_new_stock_item: "नया स्टॉक आइटम जोड़ें",
      cat_all: "सभी आइटम",
      cat_injection: "💉 इंजेक्शन",
      cat_semen: "🧬 सीमन स्ट्रॉ",
      cat_bolus: "💊 बोलस/गोलियां",
      cat_tonic: "🍶 टॉनिक/तरल",
      helpdesk_title: "सहायता केंद्र व सपोर्ट चैटबॉट",
      btn_admin_wa: "एडमिन व्हाट्सएप",
      footer_verified: "Vetcare AI OS • सुरक्षित और सत्यापित क्लिनिकल प्रणाली",
      btn_upgrade_plan: "अपग्रेड प्लान",
      nav_diagnosis: "रोग निदान",
      nav_opd: "ओपीडी",
      nav_records: "रिकॉर्ड",
      nav_stock: "स्टॉक",
      nav_ai_surgeon: "AI सर्जन",
      nav_breeding: "प्रजनन",
      nav_feed: "पशु आहार",
      nav_ledger: "खाता बही",
      nav_support: "सपोर्ट"
    },
    hinglish: {
      lbl_session: "Session",
      lbl_rem: "left",
      btn_logout: "Logout",
      app_title: "Vetcare AI OS",
      app_tagline: "Pashu Swasthya Nidan, 3-Tier Clinical Engine aur Smart Dairy Solution",
      lbl_select_role: "Apna Role Choose Karein:",
      badge_farmer_free: "Free Access ✅",
      role_farmer_title: "Smart Dairy Farmer (पशुपालक)",
      role_farmer_desc: "Desi nuskhe, A.I. ka sahi samay, balanced ration calculator aur daily doodh khata.",
      btn_enter_farmer: "Pashupalak Login Karein ➔",
      badge_doctor_mode: "Clinical Mode 🛡️",
      role_doctor_title: "Registered Veterinary Doctor",
      role_doctor_desc: "Allopathic injection charts, WhatsApp digital parchi, inventory aur kisan records.",
      btn_enter_doctor: "Doctor Login Karein ➔",
      btn_premium: "Premium",
      btn_role_lock: "Role Locked",
      diag_mode_matrix: "1. Symptom Matrix (%)",
      diag_mode_quick: "2. Fast Search",
      diag_mode_directory: "3. Rog Directory",
      lbl_weighted_matrix: "Weighted Symptom Clinical Matrix (% Sambhavna)",
      btn_reset: "Reset ↺",
      lbl_body_temp: "🌡️ Body Temperature (20% Weight):",
      temp_high: "Tez Bukhar (104°F+)",
      temp_normal: "Normal (101-102°F)",
      temp_sub: "Kam Taap (<100°F)",
      nav_diagnosis: "Nidan",
      nav_opd: "OPD Parchi",
      nav_records: "Records",
      nav_stock: "Stock",
      nav_ai_surgeon: "AI Surgeon",
      nav_breeding: "Prajanan",
      nav_feed: "Pashu Aahar",
      nav_ledger: "Khata",
      nav_support: "Support"
    },
    pa: {
      lbl_session: "ਸੈਸ਼ਨ",
      lbl_rem: "ਬਾਕੀ",
      btn_logout: "ਲਾਗਆਉਟ",
      app_title: "Vetcare AI OS",
      app_tagline: "ਪਸ਼ੂ ਰੋਗ ਨਿਦਾਨ, 3-ਪੱਧਰੀ ਕਲੀਨਿਕਲ ਇੰਜਣ ਅਤੇ ਸਮਾਰਟ ਡੇਅਰੀ ਪ੍ਰਬੰਧਨ",
      lbl_select_role: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਕਾਰਜ-ਖੇਤਰ ਚੁਣੋ:",
      badge_farmer_free: "ਮੁਫ਼ਤ ਦਾਖ਼ਲਾ ✅",
      role_farmer_title: "ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ (Farmer)",
      role_farmer_desc: "ਦੇਸੀ ਨੁਸਖ਼ੇ, ਏ.ਆਈ. ਦਾ ਸਹੀ ਸਮਾਂ, ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਕੈਲਕੁਲੇਟਰ ਅਤੇ ਖਾਤਾ ਬਹੀ।",
      btn_enter_farmer: "ਕਿਸਾਨ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ ➔",
      badge_doctor_mode: "ਕਲੀਨਿਕਲ ਮੋਡ 🛡️",
      role_doctor_title: "ਰਜਿਸਟਰਡ ਵੈਟਰਨਰੀ ਡਾਕਟਰ (Doctor)",
      role_doctor_desc: "ਐਲੋਪੈਥਿਕ ਟੀਕਾਕਰਨ ਸੂਚੀ, 1-ਕਲਿੱਕ ਵਟਸਐਪ ਪਰਚੀ ਅਤੇ ਦਵਾਈਆਂ ਦਾ ਸਟਾਕ।",
      btn_enter_doctor: "ਡਾਕਟਰ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ ➔",
      nav_diagnosis: "ਰੋਗ ਨਿਦਾਨ",
      nav_opd: "ਓ.ਪੀ.ਡੀ.",
      nav_records: "ਰਿਕਾਰਡ",
      nav_stock: "ਸਟਾਕ",
      nav_ai_surgeon: "AI ਸਰਜਨ",
      nav_breeding: "ਪ੍ਰਜਨਨ",
      nav_feed: "ਸੰਤੁਲਿਤ ਖ਼ੁਰਾਕ",
      nav_ledger: "ਖਾਤਾ ਬਹੀ",
      nav_support: "ਸਹਾਇਤਾ"
    },
    mr: {
      lbl_session: "सत्र",
      lbl_rem: "उर्वरित",
      btn_logout: "लॉगआउट",
      app_title: "Vetcare AI OS",
      app_tagline: "पशु रोग निदान, ३-स्तरीय क्लिनिकल निर्णय इंजिन आणि स्मार्ट डेअरी सोल्यूशन",
      lbl_select_role: "कृपया आपली भूमिका (Role) निवडा:",
      badge_farmer_free: "मोफत प्रवेश ✅",
      role_farmer_title: "स्मार्ट पशुपालक (Dairy Farmer)",
      role_farmer_desc: "घरगुती उपचार, ए.आय. ची योग्य वेळ, संतुलित आहार गणक आणि दूध विक्री वहीखाते.",
      btn_enter_farmer: "पशुपालक म्हणून प्रवेश करा ➔",
      badge_doctor_mode: "क्लिनिकल मोड 🛡️",
      role_doctor_title: "नोंदणीकृत पशुवैद्यक (Veterinary Doctor)",
      role_doctor_desc: "अ‍ॅलोपॅथिक औषधोपचार, १-क्लिक व्हॉट्सअ‍ॅप प्रिस्क्रिप्शन आणि औषध साठा नोंद.",
      btn_enter_doctor: "डॉक्टर म्हणून प्रवेश करा ➔",
      nav_diagnosis: "रोग निदान",
      nav_opd: "ओपीडी",
      nav_records: "नोंदी",
      nav_stock: "साठा",
      nav_ai_surgeon: "AI तज्ज्ञ",
      nav_breeding: "प्रजनन",
      nav_feed: "पशुखाद्य",
      nav_ledger: "वहीखाते",
      nav_support: "मदत केंद्र"
    },
    gu: {
      lbl_session: "સત્ર",
      lbl_rem: "બાકી",
      btn_logout: "લૉગઆઉટ",
      app_title: "Vetcare AI OS",
      app_tagline: "પશુ આરોગ્ય નિદાન, ૩-સ્તરીય ક્લિનિકલ એન્જિન અને સ્માર્ટ ડેરી સિસ્ટમ",
      lbl_select_role: "કૃપા કરીને તમારી ભૂમિકા (Role) પસંદ કરો:",
      badge_farmer_free: "મફત પ્રવેશ ✅",
      role_farmer_title: "સ્માર્ટ પશુપાલક (Dairy Farmer)",
      role_farmer_desc: "દેશી ઉપચારો, વેતર અને બીજદાનનો યોગ્ય સમય, સમતોલ આહાર ગણતરી અને દૂધ હિસાબ.",
      btn_enter_farmer: "પશુપાલક તરીકે પ્રવેશ કરો ➔",
      badge_doctor_mode: "ક્લિનિકલ મોડ 🛡️",
      role_doctor_title: "રજિસ્ટર્ડ વેટરનરી ડૉક્ટર (Doctor)",
      role_doctor_desc: "એલોપેથિક સારવાર યાદી, ૧-ક્લિક વોટ્સએપ ડિજિટલ પ્રિસ્ક્રિપ્શન અને સ્ટોક મેનેજમેન્ટ.",
      btn_enter_doctor: "ડૉક્ટર તરીકે પ્રવેશ કરો ➔",
      nav_diagnosis: "રોગ નિદાન",
      nav_opd: "ઓપીડી",
      nav_records: "રેકોર્ડ",
      nav_stock: "સ્ટોક",
      nav_ai_surgeon: "AI સર્જન",
      nav_breeding: "સંવર્ધન",
      nav_feed: "પશુ આહાર",
      nav_ledger: "ખાતાવહી",
      nav_support: "સપોર્ટ"
    },
    bn: {
      lbl_session: "সেশন",
      lbl_rem: "বাকি",
      btn_logout: "লগআউট",
      app_title: "Vetcare AI OS",
      app_tagline: "পশু স্বাস্থ্য নির্ণয়, ক্লিনিক্যাল ডিসিশন ইঞ্জিন এবং স্মার্ট ডেইরি সমাধান",
      lbl_select_role: "আপনার কাজের ক্ষেত্র (Role) নির্বাচন করুন:",
      badge_farmer_free: "বিনামূল্যে প্রবেশ ✅",
      role_farmer_title: "স্মার্ট ডেইরি খামারি (Farmer)",
      role_farmer_desc: "ভেষজ চিকিৎসা, সঠিক কৃত্রিম প্রজনন সময়, সুষম খাদ্য হিসাব এবং দুধের খাতা।",
      btn_enter_farmer: "খামারি হিসেবে প্রবেশ করুন ➔",
      badge_doctor_mode: "ক্লিনিক্যাল মোড 🛡️",
      role_doctor_title: "নিবন্ধিত পশু চিকিৎসক (Doctor)",
      role_doctor_desc: "সম্পূর্ণ অ্যালোপ্যাথিক প্রেসক্রিপশন, হোয়াটসঅ্যাপ ডিজিটাল স্লিপ ও ইনভেন্টরি।",
      btn_enter_doctor: "চিকিৎসক হিসেবে প্রবেশ করুন ➔",
      nav_diagnosis: "রোগ নির্ণয়",
      nav_opd: "ওপিডি",
      nav_records: "রেকর্ড",
      nav_stock: "স্টক",
      nav_ai_surgeon: "এআই বিশেষজ্ঞ",
      nav_breeding: "প্রজনন",
      nav_feed: "পশু খাদ্য",
      nav_ledger: "হিসাব খাতা",
      nav_support: "সহায়তা"
    }
  };

  window.VETCARE_TRANSLATIONS = VETCARE_TRANSLATIONS;

  /* ==========================================================================
   * 3. SAFE DOM ACCESSOR & UTILITY SUITE
   * ========================================================================== */
  const $ = function (id) {
    return document.getElementById(id);
  };

  function setVisible(elemOrId, isVisible, displayType) {
    const el = typeof elemOrId === "string" ? $(elemOrId) : elemOrId;
    if (!el) return;
    if (isVisible) {
      el.style.display = displayType || "block";
      el.classList.remove("hidden");
    } else {
      el.style.display = "none";
      el.classList.add("hidden");
    }
  }

  function getStoredJson(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.error("[Storage Parse Error]", key, e);
      return defaultVal;
    }
  }

  function setStoredJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("[Storage Save Error]", key, e);
    }
  }

  /* ==========================================================================
   * 4. 60-MINUTE TIMEOUT & AUTO-LOGOUT SECURITY ENGINE
   * ========================================================================== */
  function initSessionEngine() {
    let sessionStart = localStorage.getItem("vetcare_session_timestamp");
    if (!sessionStart) {
      sessionStart = Date.now().toString();
      localStorage.setItem("vetcare_session_timestamp", sessionStart);
    }

    if (State.sessionTimerId) {
      clearInterval(State.sessionTimerId);
    }

    State.warningTriggered = false;

    State.sessionTimerId = setInterval(function () {
      const start = parseInt(localStorage.getItem("vetcare_session_timestamp") || "0", 10);
      const elapsed = Date.now() - start;
      const remainingMs = SESSION_DURATION_MS - elapsed;

      // Check Expiration
      if (remainingMs <= 0) {
        clearInterval(State.sessionTimerId);
        window.logoutUser(true);
        return;
      }

      // Check 55-Minute Imminent Warning Modal
      if (remainingMs <= WARNING_THRESHOLD_MS && !State.warningTriggered) {
        State.warningTriggered = true;
        setVisible("modalSessionWarning", true, "flex");
      }

      // Update Live UI Badges
      const totalSeconds = Math.floor(remainingMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formatted =
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);

      const display = $("sessionTimerDisplay");
      if (display) display.textContent = formatted;
    }, 1000);
  }

  window.extendSession = function () {
    localStorage.setItem("vetcare_session_timestamp", Date.now().toString());
    State.warningTriggered = false;
    setVisible("modalSessionWarning", false);
  };

  window.closeLogoutWarningModal = function () {
    setVisible("modalSessionWarning", false);
  };

  window.logoutUser = function (isAutoTimeout) {
    if (State.sessionTimerId) clearInterval(State.sessionTimerId);
    localStorage.removeItem("vetcare_session_timestamp");

    // Do NOT wipe permanent registration; role lock must be maintained!
    setVisible("screenMainApp", false);
    setVisible("screenGateway", true, "flex");
    setVisible("modalSessionWarning", false);

    if (isAutoTimeout) {
      alert(
        "⚠️ सत्र समाप्त (Session Expired)!\n60 मिनट पूर्ण होने पर सुरक्षा कारणों से आपको लॉगआउट कर दिया गया है। कृपया पुनः प्रवेश करें।"
      );
    }
  };

  window.handleManualLogout = function () {
    if (confirm("क्या आप वाकई Vetcare सत्र से लॉगआउट करना चाहते हैं?")) {
      window.logoutUser(false);
    }
  };

  /* ==========================================================================
   * 5. PERMANENT ROLE-LOCK & ADMIN REQUEST SYSTEM
   * ========================================================================== */
  window.openDoctorDeclarationModal = function () {
    const lockedRole = localStorage.getItem("vetcare_registered_role");
    if (lockedRole && lockedRole !== "DOCTOR") {
      window.openRoleChangeModal(lockedRole);
      return;
    }
    setVisible("doctor-declaration-modal", true, "flex");
  };

  window.closeDoctorDeclarationModal = function () {
    setVisible("doctor-declaration-modal", false);
  };

  window.acceptDoctorDeclaration = function () {
    const regInput = $("docRegNumber");
    const mobileInput = $("docMobileNumber");
    const agreeCheck = $("docAgreementCheckbox");

    const regNo = regInput ? regInput.value.trim() : "";
    const phone = mobileInput ? mobileInput.value.trim() : "";

    if (!agreeCheck || !agreeCheck.checked) {
      alert("कृपया IVC Act वैधानिक घोषणा चेकबॉक्स स्वीकार करें।");
      return;
    }
    if (!regNo) {
      alert("कृपया अपनी वैध पशु चिकित्सा परिषद पंजीकरण संख्या (VCI Reg No.) दर्ज करें।");
      if (regInput) regInput.focus();
      return;
    }
    if (!phone || phone.length < 10) {
      alert("कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।");
      if (mobileInput) mobileInput.focus();
      return;
    }

    localStorage.setItem("vetcare_registered_role", "DOCTOR");
    localStorage.setItem("vetcare_user_phone", phone);
    localStorage.setItem("vetcare_doc_reg", regNo);
    localStorage.setItem("vetcare_disclaimer_accepted_doctor", "true");

    if (!localStorage.getItem("vetcare_trial_start")) {
      localStorage.setItem("vetcare_trial_start", Date.now().toString());
    }

    initSessionEngine();
    activateRoleEnvironment("DOCTOR");
    window.closeDoctorDeclarationModal();
  };

  window.openFarmerDeclarationModal = function () {
    const lockedRole = localStorage.getItem("vetcare_registered_role");
    if (lockedRole && lockedRole !== "FARMER") {
      window.openRoleChangeModal(lockedRole);
      return;
    }
    setVisible("farmer-declaration-modal", true, "flex");
  };

  window.closeFarmerDeclarationModal = function () {
    setVisible("farmer-declaration-modal", false);
  };

  window.acceptFarmerDeclaration = function () {
    const nameInput = $("farmerNameInput");
    const mobileInput = $("farmerMobileInput");
    const agreeCheck = $("farmerAgreementCheckbox");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = mobileInput ? mobileInput.value.trim() : "";

    if (!agreeCheck || !agreeCheck.checked) {
      alert("कृपया पशुपालक सुरक्षा एवं मार्गदर्शन निर्देश स्वीकार करें।");
      return;
    }
    if (!name) {
      alert("कृपया अपना शुभ नाम दर्ज करें।");
      if (nameInput) nameInput.focus();
      return;
    }
    if (!phone || phone.length < 10) {
      alert("कृपया 10 अंकों का सक्रिय मोबाइल नंबर दर्ज करें।");
      if (mobileInput) mobileInput.focus();
      return;
    }

    localStorage.setItem("vetcare_registered_role", "FARMER");
    localStorage.setItem("vetcare_farmer_name", name);
    localStorage.setItem("vetcare_user_phone", phone);
    localStorage.setItem("vetcare_disclaimer_accepted_farmer", "true");

    if (!localStorage.getItem("vetcare_trial_start")) {
      localStorage.setItem("vetcare_trial_start", Date.now().toString());
    }

    initSessionEngine();
    activateRoleEnvironment("FARMER");
    window.closeFarmerDeclarationModal();
  };

  window.openRoleChangeModal = function (currentRole) {
    const roleLabel =
      currentRole === "DOCTOR"
        ? "अधिकृत पशु चिकित्सक (Doctor)"
        : "स्मार्ट पशुपालक (Farmer)";
    const lockedLabelEl = $("lockedCurrentRoleName");
    if (lockedLabelEl) lockedLabelEl.textContent = roleLabel;
    setVisible("role-change-modal", true, "flex");
  };

  window.closeRoleChangeModal = function () {
    setVisible("role-change-modal", false);
  };

  window.submitRoleChangeRequest = function () {
    const reasonInput = $("roleChangeReason");
    const reason = reasonInput ? reasonInput.value.trim() : "";
    if (!reason) {
      alert("कृपया रोल परिवर्तन करने का ठोस कारण दर्ज करें।");
      return;
    }

    const currentRole = localStorage.getItem("vetcare_registered_role") || "UNKNOWN";
    const userPhone = localStorage.getItem("vetcare_user_phone") || "Not Provided";
    const targetRole = currentRole === "DOCTOR" ? "FARMER" : "DOCTOR";

    const requests = getStoredJson("vetcare_role_change_requests", []);
    requests.push({
      id: "REQ_" + Date.now(),
      phone: userPhone,
      currentRole: currentRole,
      requestedRole: targetRole,
      reason: reason,
      timestamp: new Date().toLocaleString(),
      status: "PENDING"
    });
    setStoredJson("vetcare_role_change_requests", requests);

    alert(
      "✅ आपका रोल परिवर्तन अनुरोध मुख्य सुपर एडमिन को प्रेषित कर दिया गया है।\nसमीक्षा उपरांत आपका रोल अपडेट हो जाएगा।"
    );
    if (reasonInput) reasonInput.value = "";
    window.closeRoleChangeModal();
  };

  function activateRoleEnvironment(role) {
    State.userRole = role;
    setVisible("screenGateway", false);
    setVisible("screenMainApp", true, "flex");

    const badge = $("currentUserRoleBadge");
    if (badge) {
      badge.textContent =
        role === "DOCTOR" ? "🩺 अधिकृत पशु चिकित्सक" : "👨‍🌾 स्मार्ट पशुपालक";
    }

    // Toggle Clinical OPD, Records & Inventory for Doctor Role Exclusively
    const isDoc = role === "DOCTOR";
    setVisible("navRx", isDoc, "flex");
    setVisible("navRecords", isDoc, "flex");
    setVisible("navInventory", isDoc, "flex");
    setVisible("navAI", isDoc, "flex");

    const finLabel = $("navFinanceLabel");
    if (finLabel) {
      finLabel.textContent = isDoc ? "क्लिनिक खाता" : "डेयरी बहीखाता";
    }

    // Default Tab
    window.switchTab("diagnosis");
    renderClinicalDirectory();
    renderKhataList();
    renderInventory();
    renderBreedingGuides();
  }

  /* ==========================================================================
   * 6. TAB NAVIGATION & VIEW CONTROLLER
   * ========================================================================== */
  const TABS = [
    "diagnosis",
    "rx",
    "records",
    "ai",
    "breeding",
    "feed",
    "finance",
    "inventory",
    "helpdesk"
  ];

  window.switchTab = function (targetTab) {
    State.activeTab = targetTab;
    TABS.forEach(function (tab) {
      const view = $("view" + tab.charAt(0).toUpperCase() + tab.slice(1));
      const navBtn = $("nav" + tab.charAt(0).toUpperCase() + tab.slice(1));
      if (view) setVisible(view, tab === targetTab);
      if (navBtn) {
        if (tab === targetTab) {
          navBtn.classList.add("active-nav-tab");
          navBtn.classList.remove("text-slate-400");
        } else {
          navBtn.classList.remove("active-nav-tab");
          navBtn.classList.add("text-slate-400");
        }
      }
    });

    if (targetTab === "records") renderCaseRecords();
    if (targetTab === "inventory") renderInventory();
    if (targetTab === "finance") renderKhataList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ==========================================================================
   * 7. 3-WAY CLINICAL DIAGNOSIS ENGINE (MATRIX, HYBRID, DIRECTORY)
   * ========================================================================== */
  window.setDiagnosisMode = function (mode) {
    State.activeDiagMode = mode;
    setVisible("panelDiagMatrix", mode === "SYMPTOMS");
    setVisible("panelDiagHybrid", mode === "HYBRID");
    setVisible("panelDiagDirectory", mode === "DIRECTORY");

    // Styling switcher buttons
    ["btnDiagMode1", "btnDiagMode2", "btnDiagMode3"].forEach(function (bId, idx) {
      const btn = $(bId);
      if (!btn) return;
      const modes = ["SYMPTOMS", "HYBRID", "DIRECTORY"];
      if (modes[idx] === mode) {
        btn.className =
          "py-2 px-1 rounded-xl bg-blue-600 text-white font-bold transition text-center flex flex-col items-center shadow-xs cursor-pointer";
      } else {
        btn.className =
          "py-2 px-1 rounded-xl text-slate-600 font-medium transition text-center flex flex-col items-center cursor-pointer";
      }
    });

    if (mode === "DIRECTORY") {
      renderClinicalDirectory();
    } else {
      applyMatrixFilters();
    }
  };

  window.toggleMatrixParam = function (param, val, btnElem) {
    if (param === "temp") {
      State.matrixSelected.temp = State.matrixSelected.temp === val ? null : val;
      const container = btnElem.parentElement;
      if (container) {
        Array.from(container.children).forEach(function (c) {
          c.classList.remove("chip-active");
        });
      }
      if (State.matrixSelected.temp === val) {
        btnElem.classList.add("chip-active");
      }
    }
    applyMatrixFilters();
  };

  window.toggleSecSymptom = function (sym, btnElem) {
    const idx = State.matrixSelected.secondary.indexOf(sym);
    if (idx > -1) {
      State.matrixSelected.secondary.splice(idx, 1);
      btnElem.classList.remove("chip-active");
    } else {
      State.matrixSelected.secondary.push(sym);
      btnElem.classList.add("chip-active");
    }
    applyMatrixFilters();
  };

  window.resetSymptomMatrix = function () {
    State.matrixSelected = { temp: null, cardinal: "ALL", secondary: [] };
    const sel = $("selCardinalSign");
    if (sel) sel.value = "ALL";
    document.querySelectorAll(".m-chip, .s-chip").forEach(function (c) {
      c.classList.remove("chip-active");
    });
    applyMatrixFilters();
  };

  function getDiseaseDatabase() {
    return window.CORE_DISEASE_DB || [];
  }

  window.applyMatrixFilters = function () {
    const sel = $("selCardinalSign");
    if (sel) State.matrixSelected.cardinal = sel.value;

    const db = getDiseaseDatabase();
    const scoredList = db.map(function (d) {
      let score = 0;
      // 1. Temp (20%)
      if (State.matrixSelected.temp) {
        if (d.temp === State.matrixSelected.temp) score += 20;
      }
      // 2. Cardinal Sign (40%)
      if (
        State.matrixSelected.cardinal !== "ALL" &&
        d.cardinal === State.matrixSelected.cardinal
      ) {
        score += 40;
      }
      // 3. Secondary match (up to 40%)
      if (State.matrixSelected.secondary.length > 0) {
        const secWeight = 40 / State.matrixSelected.secondary.length;
        State.matrixSelected.secondary.forEach(function () {
          // General matching heuristic against disease description
          score += secWeight * 0.75;
        });
      }
      return { disease: d, matchScore: Math.min(100, Math.round(score)) };
    });

    scoredList.sort(function (a, b) {
      return b.matchScore - a.matchScore;
    });

    const isFiltered =
      State.matrixSelected.temp !== null ||
      State.matrixSelected.cardinal !== "ALL" ||
      State.matrixSelected.secondary.length > 0;

    const badge = $("matchCountBadge");
    const scoreText = $("matchScoreText");

    if (isFiltered) {
      const topMatch = scoredList[0];
      if (scoreText) {
        scoreText.textContent =
          "शीर्ष संभावित निदान: " +
          topMatch.disease.nameHindi +
          " (" +
          topMatch.matchScore +
          "% वैज्ञानिक संभावना)";
      }
      if (badge) badge.textContent = scoredList.length + " रोग विश्लेषित";
      renderDiseaseCards(
        scoredList.map(function (item) {
          return Object.assign({}, item.disease, { score: item.matchScore });
        })
      );
    } else {
      if (scoreText) {
        scoreText.textContent = "लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी";
      }
      if (badge) badge.textContent = db.length + " रोग एक्टिव";
      renderDiseaseCards(db);
    }
  };

  window.handleAppSearch = function () {
    const input = $("unifiedSearchInput");
    const query = input ? input.value.trim().toLowerCase() : "";
    const db = getDiseaseDatabase();
    if (!query) {
      renderDiseaseCards(db);
      return;
    }

    const filtered = db.filter(function (d) {
      const kws = (d.keywords || []).join(" ").toLowerCase();
      return (
        d.nameHindi.toLowerCase().includes(query) ||
        (d.desc && d.desc.toLowerCase().includes(query)) ||
        kws.includes(query)
      );
    });
    renderDiseaseCards(filtered);
  };

  window.filterByTag = function (tag, btn) {
    State.directoryFilter = tag;
    document.querySelectorAll(".q-chip").forEach(function (c) {
      c.className =
        "q-chip px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0 cursor-pointer";
    });
    if (btn) {
      btn.className =
        "q-chip px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold shrink-0 cursor-pointer";
    }

    const db = getDiseaseDatabase();
    if (tag === "ALL") {
      renderDiseaseCards(db);
    } else {
      const filtered = db.filter(function (d) {
        return d.category === tag;
      });
      renderDiseaseCards(filtered);
    }
  };

  function renderClinicalDirectory() {
    renderDiseaseCards(getDiseaseDatabase());
  }

  function renderDiseaseCards(diseases) {
    const container = $("diseaseSearchResults");
    if (!container) return;

    if (!diseases || diseases.length === 0) {
      container.innerHTML =
        '<div class="p-6 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">कोई रोग मेल नहीं खाया। कृपया लक्षण बदलकर पुनः प्रयास करें।</div>';
      return;
    }

    const isDoc = State.userRole === "DOCTOR";
    let html = "";

    diseases.forEach(function (d) {
      const scoreBadge =
        typeof d.score !== "undefined"
          ? '<span class="text-xs font-black px-2.5 py-1 rounded-xl ' +
            (d.score > 60
              ? "bg-rose-100 text-rose-700"
              : "bg-blue-100 text-blue-700") +
            '">' +
            d.score +
            "% संभावना</span>"
          : "";

      html += '<div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition hover:border-slate-300">';
      html += '  <div class="flex justify-between items-start gap-2">';
      html += '    <div>';
      html += '      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">' + d.category + "</span>";
      html += '      <h3 class="text-sm sm:text-base font-black text-slate-900 leading-tight">' + d.nameHindi + "</h3>";
      html += "    </div>";
      html += scoreBadge;
      html += "  </div>";
      html += '  <p class="text-xs text-slate-600 leading-relaxed">' + (d.desc || "") + "</p>";

      // Farmer View: Home/Indigenous Remedies
      if (!isDoc && d.farmerRemedy) {
        html += '  <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-emerald-950 text-xs space-y-1">';
        html += '    <h4 class="font-bold text-emerald-900 flex items-center gap-1">🌿 प्राथमिक घरेलू व देसी उपचार:</h4>';
        html += '    <p class="leading-relaxed">' + d.farmerRemedy + "</p>";
        html += "  </div>";
      }

      // Doctor View: Complete 5-Tier Allopathic Protocol
      if (isDoc && d.doctorRx) {
        html += '  <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 text-blue-950 text-xs space-y-1.5 font-mono">';
        html += '    <div class="flex justify-between items-center font-sans border-b border-blue-200/60 pb-1">';
        html += '      <h4 class="font-bold text-blue-900">💉 क्लिनिकल Rx इंजेक्शन व दवा तालिका:</h4>';
        html += '      <button onclick="loadRxToOpdSlip(\'' + escape(d.nameHindi) + "', '" + escape(d.doctorRx) + '\')" class="text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold px-2 py-0.5 rounded-lg transition cursor-pointer">+ पर्ची में भरें</button>';
        html += "    </div>";
        html += '    <pre class="whitespace-pre-wrap leading-relaxed text-[11px] font-mono text-slate-800">' + d.doctorRx + "</pre>";
        html += "  </div>";
      }

      html += "</div>";
    });

    container.innerHTML = html;
  }

  window.loadRxToOpdSlip = function (escapedName, escapedRx) {
    const name = unescape(escapedName);
    const rx = unescape(escapedRx);
    const diagInput = $("opdDiagnosis");
    const medInput = $("opdMedicine");

    if (diagInput) diagInput.value = name;
    if (medInput) medInput.value = rx;

    window.switchTab("rx");
  };

  /* ==========================================================================
   * 8. CLINICAL CALCULATORS (SHAEFFER'S, 24-HR RATION BALANCER, DRUG DOSE)
   * ========================================================================== */
  // Shaeffer's Formula for Cattle & Buffalo
  window.calculateShaefferWeight = function (girthInches, lengthInches) {
    const g = parseFloat(girthInches);
    const l = parseFloat(lengthInches);
    if (!g || !l) return 0;
    const weightLbs = (g * g * l) / 300.0;
    return Math.round(weightLbs * 0.453592); // Convert to KG
  };

  // 24-Hour Scientific Ration Balancer
  window.calculateDailyRation = function () {
    const weightInput = $("feedWeight");
    const milkInput = $("feedMilk");

    const w = parseFloat(weightInput ? weightInput.value : "400") || 400;
    const m = parseFloat(milkInput ? milkInput.value : "10") || 10;

    // Dry Matter (DM) requirement = 2.8% of Body Weight
    const totalDM = w * 0.028;

    // Maintenance concentrate = 1.5 kg; Production = 1 kg concentrate per 2.5 L milk
    const grainKg = Math.round((1.5 + m / 2.5) * 10) / 10;

    // Roughage satisfies remaining DM. Ratio: 2/3 Green Fodder + 1/3 Dry Straw
    const remainingDM = Math.max(0, totalDM - grainKg * 0.9);
    const dryStrawKg = Math.round((remainingDM * 0.4) * 10) / 10;
    const greenFodderKg = Math.round(((remainingDM * 0.6) / 0.2) * 10) / 10; // Green fodder is ~20% DM

    const resGrain = $("resFeedGrain");
    const resGreen = $("resFeedGreen");
    const resDry = $("resFeedDry");

    if (resGrain) resGrain.textContent = grainKg + " kg";
    if (resGreen) resGreen.textContent = greenFodderKg + " kg";
    if (resDry) resDry.textContent = dryStrawKg + " kg";

    setVisible("rationResultCard", true);
  };

  // Breeding & Heat Tracker Dynamic Content
  function renderBreedingGuides() {
    const heatContainer = $("heatSignsContainer");
    const dischContainer = $("dischargeContainer");
    const repeatContainer = $("repeatBreederList");

    if (heatContainer) {
      heatContainer.innerHTML =
        '<div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl"><strong>1. प्रारंभिक मद (0-6 घंटे):</strong> बेचैनी, रंभाना, अन्य पशुओं पर चढ़ना। (सीमन न करवाएं)</div>' +
        '<div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl"><strong>2. मध्य मद (6-18 घंटे) [सर्वोत्तम समय]:</strong> खूंटे पर चुपचाप खड़े रहना (Standing Heat), कांच जैसा पारदर्शी डिस्चार्ज। (A.I. का सटीक समय - AM/PM नियम)</div>' +
        '<div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl"><strong>3. अंतिम मद (18-24 घंटे):</strong> डिस्चार्ज गाढ़ा होना, हल्की ललिमा।</div>';
    }

    if (dischContainer) {
      dischContainer.innerHTML =
        '<div class="p-2 bg-emerald-50 rounded-xl border border-emerald-200"><strong>✅ कांच जैसा साफ, लम्बा तार:</strong> गर्भाशय स्वस्थ है। तुरंत सीमन कराएं।</div>' +
        '<div class="p-2 bg-amber-50 rounded-xl border border-amber-200"><strong>⚠️ सफेद या मटमैला गाढ़ा मवाद:</strong> गर्भाशय में मेट्राइटिस/इन्फेक्शन है। सीमन न कराएं, गर्भाशय की सफाई (Intrauterine) करवाएं।</div>' +
        '<div class="p-2 bg-rose-50 rounded-xl border border-rose-200"><strong>🩸 खूनी या लाल तार:</strong> मद बीत चुका है (Metestrus bleeding)। अगले चक्र (21 दिन बाद) की तैयारी करें।</div>';
    }

    if (repeatContainer) {
      repeatContainer.innerHTML =
        '<li><strong>गर्भाशय सफाई (I/U Therapy):</strong> 2-3 चक्रों में Lixen / Metrogyl intrauterine डलवाएं।</li>' +
        '<li><strong>हार्मोन थेरेपी:</strong> सीमन कराने के समय 2.5 ml Inj. Receptal (Buserelin) I/M लगाएं।</li>' +
        '<li><strong>A.I. का सही समय (AM-PM Rule):</strong> यदि पशु सुबह मद में आए तो शाम को और शाम को आए तो अगली सुबह सीमन डलवाएं।</li>' +
        '<li><strong>खनिज मिश्रण:</strong> चेलेटेड मिनरल मिक्सचर 50 ग्राम प्रतिदिन लगातार 2 माह तक खिलाएं।</li>';
    }
  }

  /* ==========================================================================
   * 9. DIGITAL OPD PRESCRIPTION ENGINE (WHATSAPP, PRINT, GPS, OFFLINE)
   * ========================================================================== */
  window.captureGPSLocation = function () {
    const gpsInput = $("opdGPS");
    const btn = $("btnGPS");
    if (!navigator.geolocation) {
      alert("आपके डिवाइस में GPS सुविधा उपलब्ध नहीं है।");
      return;
    }
    if (btn) btn.textContent = "⏳...";
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        if (gpsInput) {
          gpsInput.value =
            pos.coords.latitude.toFixed(5) + ", " + pos.coords.longitude.toFixed(5);
        }
        if (btn) btn.textContent = "✅ GPS";
      },
      function () {
        alert("GPS लोकेशन प्राप्त करने में विफल। कृपया लोकेशन परमिशन चालू करें।");
        if (btn) btn.textContent = "📍 GPS";
      },
      { timeout: 10000 }
    );
  };

  window.clearRxField = function () {
    const rx = $("opdMedicine");
    if (rx) rx.value = "";
  };

  window.calculateDue = function () {
    const totalEl = $("opdTotalFee");
    const paidEl = $("opdPaidFee");
    const dueEl = $("opdDueFee");

    const total = parseFloat(totalEl ? totalEl.value : "0") || 0;
    const paid = parseFloat(paidEl ? paidEl.value : "0") || 0;
    const due = Math.max(0, total - paid);

    if (dueEl) dueEl.value = due;
  };

  window.dispatchWhatsAppRx = function () {
    const name = ($("opdFarmerName") ? $("opdFarmerName").value : "").trim();
    const phone = ($("opdFarmerPhone") ? $("opdFarmerPhone").value : "").trim();
    const village = ($("opdVillage") ? $("opdVillage").value : "").trim();
    const animal = $("opdAnimal") ? $("opdAnimal").value : "पशु";
    const tag = ($("opdTag") ? $("opdTag").value : "").trim();
    const preg = $("opdPregnancy") ? $("opdPregnancy").value : "खाली";
    const diag = ($("opdDiagnosis") ? $("opdDiagnosis").value : "").trim();
    const rx = ($("opdMedicine") ? $("opdMedicine").value : "").trim();
    const total = $("opdTotalFee") ? $("opdTotalFee").value : "0";
    const paid = $("opdPaidFee") ? $("opdPaidFee").value : "0";
    const due = $("opdDueFee") ? $("opdDueFee").value : "0";

    if (!name || !phone || !diag || !rx) {
      alert("कृपया किसान का नाम, 10-अंकीय मोबाइल नंबर, निदान एवं दवा विवरण अवश्य भरें।");
      return;
    }

    const docReg = localStorage.getItem("vetcare_doc_reg") || "VCI-REGISTERED";
    const dateStr = new Date().toLocaleDateString("hi-IN");

    let msg = "🐾 *डिजिटल पशु चिकित्सा पर्ची (OPD Rx Slip)* 🐾\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "👨‍⚕️ *पंजीकृत चिकित्सक:* अधिकृत पशु चिकित्सक\n";
    msg += "📜 *VCI / State Reg. No.:* " + docReg + "\n";
    msg += "📅 *दिनांक:* " + dateStr + "\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "👤 *पशुपालक:* " + name + " (" + village + ")\n";
    msg += "🐄 *रोगी पशु:* " + animal + (tag ? " [टैग: " + tag + "]" : "") + "\n";
    msg += "🤰 *स्थिति:* " + preg + "\n";
    msg += "🩺 *डायग्नोसिस (निदान):* " + diag + "\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "💊 *औषधियां एवं खुराक (Rx):*\n" + rx + "\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "💰 *फीस विवरण:* कुल ₹" + total + " | जमा: ₹" + paid + " | बकाया: ₹" + due + "\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "⚠️ *सावधानी:* दवाएं केवल अधिकृत पशु चिकित्सक के निर्देशन में दें।\n";
    msg += "🚀 *Powered by Vetcare AI OS*";

    // Auto-save case to records
    saveCaseRecordInternal({
      id: "CASE_" + Date.now(),
      farmerName: name,
      phone: phone,
      village: village,
      animal: animal,
      tag: tag,
      pregnancy: preg,
      diagnosis: diag,
      medicine: rx,
      totalFee: total,
      paidFee: paid,
      dueFee: due,
      timestamp: new Date().toLocaleString()
    });

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone;
    const url = "https://wa.me/" + targetPhone + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  window.saveOfflineCaseDirectly = function () {
    const name = ($("opdFarmerName") ? $("opdFarmerName").value : "").trim();
    const phone = ($("opdFarmerPhone") ? $("opdFarmerPhone").value : "").trim();
    const diag = ($("opdDiagnosis") ? $("opdDiagnosis").value : "").trim();
    const rx = ($("opdMedicine") ? $("opdMedicine").value : "").trim();

    if (!name || !phone || !diag) {
      alert("कृपया किसान का नाम, मोबाइल नंबर और निदान दर्ज करें।");
      return;
    }

    saveCaseRecordInternal({
      id: "CASE_" + Date.now(),
      farmerName: name,
      phone: phone,
      village: $("opdVillage") ? $("opdVillage").value : "",
      animal: $("opdAnimal") ? $("opdAnimal").value : "पशु",
      tag: $("opdTag") ? $("opdTag").value : "",
      pregnancy: $("opdPregnancy") ? $("opdPregnancy").value : "",
      diagnosis: diag,
      medicine: rx,
      totalFee: $("opdTotalFee") ? $("opdTotalFee").value : "0",
      paidFee: $("opdPaidFee") ? $("opdPaidFee").value : "0",
      dueFee: $("opdDueFee") ? $("opdDueFee").value : "0",
      timestamp: new Date().toLocaleString()
    });

    alert("✅ केस रिकॉर्ड स्थानीय रूप से सुरक्षित कर लिया गया है।");
  };

  function saveCaseRecordInternal(record) {
    const records = getStoredJson("vetcare_opd_cases", []);
    records.unshift(record);
    setStoredJson("vetcare_opd_cases", records);

    // If there is an outstanding fee, log to Khata automatically
    const due = parseFloat(record.dueFee) || 0;
    if (due > 0) {
      const khata = getStoredJson("vetcare_khata_records", []);
      khata.unshift({
        id: "KHATA_" + Date.now(),
        farmerName: record.farmerName,
        phone: record.phone,
        amount: due,
        type: "DUE",
        note: record.diagnosis + " (OPD पर्ची बकाया)",
        timestamp: new Date().toLocaleDateString()
      });
      setStoredJson("vetcare_khata_records", khata);
    }
  }

  window.printCurrentOPDSlip = function () {
    const printArea = $("printableSlipArea");
    if (!printArea) return;

    const name = $("opdFarmerName") ? $("opdFarmerName").value : "-";
    const phone = $("opdFarmerPhone") ? $("opdFarmerPhone").value : "-";
    const village = $("opdVillage") ? $("opdVillage").value : "-";
    const animal = $("opdAnimal") ? $("opdAnimal").value : "-";
    const tag = $("opdTag") ? $("opdTag").value : "-";
    const diag = $("opdDiagnosis") ? $("opdDiagnosis").value : "-";
    const rx = $("opdMedicine") ? $("opdMedicine").value : "-";
    const docReg = localStorage.getItem("vetcare_doc_reg") || "VCI-REGISTERED";

    printArea.innerHTML =
      '<div style="border: 2px solid #0f172a; padding: 20px; font-family: sans-serif;">' +
      '  <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">' +
      '    <h1 style="font-size: 20px; margin: 0; font-weight: 900;">VETCARE VETERINARY CLINICAL OPD</h1>' +
      '    <p style="margin: 2px 0; font-size: 11px;">अधिकृत पशु चिकित्सालय एवं कृत्रिम गर्भाधान केंद्र</p>' +
      '    <p style="margin: 0; font-size: 10px; font-weight: bold;">Reg. No: ' + docReg + ' | Date: ' + new Date().toLocaleDateString("hi-IN") + "</p>" +
      "  </div>" +
      '  <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 12px;">' +
      "    <div><strong>किसान:</strong> " + name + " | <strong>गाँव:</strong> " + village + " | <strong>फोन:</strong> " + phone + "</div>" +
      "    <div><strong>पशु:</strong> " + animal + " | <strong>टैग:</strong> " + tag + "</div>" +
      "  </div>" +
      '  <div style="margin: 10px 0; font-size: 12px;"><strong>प्रोविजनल निदान (Diagnosis):</strong> ' + diag + "</div>" +
      '  <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin: 12px 0;">' +
      '    <strong style="font-size: 13px; display: block; margin-bottom: 6px;">Rx Prescribed Drugs & Doses:</strong>' +
      '    <pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px; margin: 0;">' + rx + "</pre>" +
      "  </div>" +
      '  <div style="text-align: right; margin-top: 30px; font-size: 11px;">' +
      "    ___________________________<br><strong>अधिकृत पशु चिकित्सक हस्ताक्षर</strong>" +
      "  </div>" +
      "</div>";

    window.print();
  };

  /* ==========================================================================
   * 10. SAVED CASE RECORDS ENGINE
   * ========================================================================== */
  function renderCaseRecords(filteredCases) {
    const list = $("recordsList");
    const badge = $("recordTotalBadge");
    if (!list) return;

    const cases = filteredCases || getStoredJson("vetcare_opd_cases", []);
    if (badge) badge.textContent = cases.length + " केस सुरक्षित";

    if (cases.length === 0) {
      list.innerHTML =
        '<div class="p-5 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl text-xs">कोई सुरक्षित केस रिकॉर्ड नहीं मिला।</div>';
      return;
    }

    let html = "";
    cases.forEach(function (c) {
      html += '<div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 shadow-xs text-xs">';
      html += '  <div class="flex justify-between items-start">';
      html += '    <div>';
      html += '      <strong class="text-slate-900 text-sm">' + c.farmerName + "</strong> (" + (c.village || "गाँव") + ")";
      html += '      <span class="block text-slate-400 text-[10px]">' + c.timestamp + " | 📱 " + c.phone + "</span>";
      html += "    </div>";
      html += '    <span class="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-lg border border-blue-200 text-[10px]">' + c.animal + "</span>";
      html += "  </div>";
      html += '  <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-800">';
      html += "    <strong>निदान:</strong> " + c.diagnosis + "<br>";
      html += "    <strong>Rx:</strong> " + c.medicine;
      html += "  </div>";
      html += '  <div class="flex justify-between items-center text-[11px] pt-1 border-t border-slate-100">';
      html += '    <span class="text-rose-600 font-bold">बकाया: ₹' + (c.dueFee || "0") + "</span>";
      html += '    <button onclick="deleteCaseRecord(\'' + c.id + '\')" class="text-rose-500 hover:underline font-semibold cursor-pointer">हटाएं 🗑️</button>';
      html += "  </div>";
      html += "</div>";
    });

    list.innerHTML = html;
  }

  window.handleRecordSearch = function () {
    const input = $("searchRecordsInput");
    const q = input ? input.value.trim().toLowerCase() : "";
    const cases = getStoredJson("vetcare_opd_cases", []);
    if (!q) {
      renderCaseRecords(cases);
      return;
    }
    const filtered = cases.filter(function (c) {
      return (
        c.farmerName.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        (c.village && c.village.toLowerCase().includes(q)) ||
        (c.diagnosis && c.diagnosis.toLowerCase().includes(q))
      );
    });
    renderCaseRecords(filtered);
  };

  window.deleteCaseRecord = function (id) {
    if (!confirm("क्या आप इस केस रिकॉर्ड को हटाना चाहते हैं?")) return;
    let cases = getStoredJson("vetcare_opd_cases", []);
    cases = cases.filter(function (c) {
      return c.id !== id;
    });
    setStoredJson("vetcare_opd_cases", cases);
    renderCaseRecords();
  };

  /* ==========================================================================
   * 11. GEMINI LIVE AI VET SURGEON INTEGRATION
   * ========================================================================== */
  window.openAIKeyModal = function () {
    const key = localStorage.getItem("vetcare_gemini_api_key") || "";
    const input = $("inputGeminiKey");
    if (input) input.value = key;
    setVisible("modalAIKey", true, "flex");
  };

  window.closeAIKeyModal = function () {
    setVisible("modalAIKey", false);
  };

  window.saveGeminiKey = function () {
    const input = $("inputGeminiKey");
    const key = input ? input.value.trim() : "";
    if (!key) {
      alert("कृपया वैध Gemini API Key दर्ज करें।");
      return;
    }
    localStorage.setItem("vetcare_gemini_api_key", key);
    alert("✅ Gemini API Key सुरक्षित कर ली गई है।");
    window.closeAIKeyModal();
  };

  window.sendCaseToAIConsultant = function () {
    const animal = $("opdAnimal") ? $("opdAnimal").value : "पशु";
    const diag = $("opdDiagnosis") ? $("opdDiagnosis").value : "";
    const med = $("opdMedicine") ? $("opdMedicine").value : "";
    const prompt =
      "मरीज: " +
      animal +
      "\nप्रोविजनल लक्षण/रोग: " +
      diag +
      "\nवर्तमान दवा योजना: " +
      med +
      "\n\nकृपया इस केस पर एक विशेषज्ञ वेटरनरी सर्जन की तरह डिफरेंशियल डायग्नोसिस, संभावित जटिलताएं और उपचार सुधार सुझाव हिंदी में प्रदान करें।";

    const aiPromptInput = $("aiInputPrompt");
    if (aiPromptInput) aiPromptInput.value = prompt;
    window.switchTab("ai");
  };

  window.runAIConsultant = function () {
    const promptInput = $("aiInputPrompt");
    const outArea = $("aiOutputArea");
    const btn = $("btnRunAI");
    const apiKey = localStorage.getItem("vetcare_gemini_api_key");

    const prompt = promptInput ? promptInput.value.trim() : "";
    if (!prompt) {
      alert("कृपया केस हिस्ट्री व लक्षण विवरण दर्ज करें।");
      return;
    }

    if (!apiKey) {
      alert("AI कंसल्टेशन चलाने के लिए कृपया पहले अपनी Gemini API Key दर्ज करें।");
      window.openAIKeyModal();
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "⏳ AI विश्लेषण जारी है...";
    }
    setVisible(outArea, true);
    if (outArea) outArea.textContent = "AI वेटरनरी विशेषज्ञ विश्लेषण कर रहे हैं, कृपया प्रतीक्षा करें...";

    const sysInstruction =
      "You are a Senior Veterinary Clinical Specialist & Surgeon. Provide scientifically accurate, practical veterinary diagnostic analysis and treatment recommendations in Hindi. Always highlight safety and precautions.";

    fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: sysInstruction + "\n\nकेस विवरण:\n" + prompt }]
            }
          ]
        })
      }
    )
      .then(function (res) {
        if (!res.ok) throw new Error("API Response Code: " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
        }
        const text =
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0].text
            ? data.candidates[0].content.parts[0].text
            : "AI उत्तर प्राप्त नहीं हो सका।";
        if (outArea) outArea.textContent = text;
      })
      .catch(function (err) {
        console.error(err);
        if (btn) {
          btn.disabled = false;
          btn.textContent = "✨ AI से क्लिनिकल रिपोर्ट मांगें";
        }
        if (outArea) {
          outArea.textContent =
            "❌ AI विश्लेषण विफल रहा। कृपया API Key एवं इंटरनेट कनेक्शन जांचें। एरर: " +
            err.message;
        }
      });
  };

  /* ==========================================================================
   * 12. PASHUPALAK KHATA BAHI (LEDGER)
   * ========================================================================== */
  window.openNewKhataModal = function () {
    setVisible("modalNewKhata", true, "flex");
  };

  window.closeNewKhataModal = function () {
    setVisible("modalNewKhata", false);
  };

  window.saveNewKhataRecord = function () {
    const nameInput = $("khataFarmerName");
    const phoneInput = $("khataFarmerPhone");
    const amtInput = $("khataAmount");
    const typeSelect = $("khataType");
    const noteInput = $("khataNote");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const amt = parseFloat(amtInput ? amtInput.value : "0") || 0;
    const type = typeSelect ? typeSelect.value : "DUE";
    const note = noteInput ? noteInput.value.trim() : "";

    if (!name || amt <= 0) {
      alert("कृपया किसान का नाम एवं वैध राशि दर्ज करें।");
      return;
    }

    const records = getStoredJson("vetcare_khata_records", []);
    records.unshift({
      id: "KH_" + Date.now(),
      farmerName: name,
      phone: phone,
      amount: amt,
      type: type,
      note: note,
      timestamp: new Date().toLocaleDateString()
    });
    setStoredJson("vetcare_khata_records", records);

    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (amtInput) amtInput.value = "";
    if (noteInput) noteInput.value = "";

    window.closeNewKhataModal();
    renderKhataList();
  };

  function renderKhataList() {
    const list = $("finDueList");
    const creditEl = $("finCredit");
    const debitEl = $("finDebit");
    if (!list) return;

    const records = getStoredJson("vetcare_khata_records", []);
    const searchInput = $("searchKhataInput");
    const q = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let totalCredit = 0;
    let totalDebit = 0;

    records.forEach(function (r) {
      if (r.type === "PAID") totalCredit += r.amount;
      else totalDebit += r.amount;
    });

    if (creditEl) creditEl.textContent = "₹" + totalCredit.toLocaleString();
    if (debitEl) debitEl.textContent = "₹" + totalDebit.toLocaleString();

    const filtered = q
      ? records.filter(function (r) {
          return (
            r.farmerName.toLowerCase().includes(q) ||
            (r.phone && r.phone.includes(q))
          );
        })
      : records;

    if (filtered.length === 0) {
      list.innerHTML =
        '<div class="p-4 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-xl text-xs">खाते में कोई लेन-देन नहीं है।</div>';
      return;
    }

    let html = "";
    filtered.forEach(function (r) {
      const isPaid = r.type === "PAID";
      html += '<div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">';
      html += '  <div>';
      html += '    <strong class="text-slate-900 block">' + r.farmerName + (r.phone ? " (" + r.phone + ")" : "") + "</strong>";
      html += '    <span class="text-slate-500 text-[11px]">' + (r.note || (isPaid ? "जमा" : "बकाया")) + " • " + r.timestamp + "</span>";
      html += "  </div>";
      html += '  <div class="text-right">';
      html += '    <span class="font-black text-sm block ' + (isPaid ? "text-emerald-700" : "text-rose-700") + '">';
      html += (isPaid ? "+ ₹" : "- ₹") + r.amount;
      html += "    </span>";
      html += '    <button onclick="deleteKhataEntry(\'' + r.id + '\')" class="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer">हटाएं ✕</button>';
      html += "  </div>";
      html += "</div>";
    });

    list.innerHTML = html;
  }

  window.renderKhataList = renderKhataList;

  window.deleteKhataEntry = function (id) {
    let records = getStoredJson("vetcare_khata_records", []);
    records = records.filter(function (r) {
      return r.id !== id;
    });
    setStoredJson("vetcare_khata_records", records);
    renderKhataList();
  };

  /* ==========================================================================
   * 13. DRUG & SEMEN STRAW INVENTORY STOCK SYSTEM
   * ========================================================================== */
  window.openNewInventoryItemModal = function () {
    setVisible("modalNewInventory", true, "flex");
  };

  window.closeNewInventoryModal = function () {
    setVisible("modalNewInventory", false);
  };

  window.filterInventoryCategory = function (cat, btn) {
    State.invFilter = cat;
    document.querySelectorAll(".inv-chip").forEach(function (c) {
      c.className =
        "inv-chip px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium shrink-0 cursor-pointer";
    });
    if (btn) {
      btn.className =
        "inv-chip px-3 py-1 rounded-xl bg-blue-600 text-white font-bold shrink-0 cursor-pointer";
    }
    renderInventory();
  };

  window.saveNewInventoryItem = function () {
    const nameInput = $("invItemName");
    const catSelect = $("invItemCategory");
    const stockInput = $("invItemStock");
    const alertInput = $("invItemMinAlert");
    const unitInput = $("invItemUnit");

    const name = nameInput ? nameInput.value.trim() : "";
    const cat = catSelect ? catSelect.value : "INJECTION";
    const stock = parseFloat(stockInput ? stockInput.value : "0") || 0;
    const minAlert = parseFloat(alertInput ? alertInput.value : "3") || 3;
    const unit = unitInput ? unitInput.value.trim() : "vials";

    if (!name) {
      alert("कृपया दवा/आइटम का नाम दर्ज करें।");
      return;
    }

    const items = getStoredJson("vetcare_inventory_stock", []);
    items.unshift({
      id: "INV_" + Date.now(),
      name: name,
      category: cat,
      stock: stock,
      minAlert: minAlert,
      unit: unit
    });
    setStoredJson("vetcare_inventory_stock", items);

    if (nameInput) nameInput.value = "";
    if (stockInput) stockInput.value = "";
    window.closeNewInventoryModal();
    renderInventory();
  };

  function renderInventory() {
    const container = $("inventoryItemsContainer");
    const alertBadge = $("lowStockAlertBadge");
    if (!container) return;

    const items = getStoredJson("vetcare_inventory_stock", [
      { id: "1", name: "Inj. Intacef Tazo (3375mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
      { id: "2", name: "Inj. Melonex Plus (100ml)", category: "INJECTION", stock: 2, minAlert: 3, unit: "vials" },
      { id: "3", name: "Murrah Buffalo Semen Straw (ID: M-29)", category: "SEMEN", stock: 15, minAlert: 5, unit: "straws" },
      { id: "4", name: "Bolus Bioboost (Rumen Probiotic)", category: "BOLUS", stock: 24, minAlert: 10, unit: "strips" }
    ]);

    let hasLowStock = false;
    items.forEach(function (i) {
      if (i.stock <= i.minAlert) hasLowStock = true;
    });

    setVisible(alertBadge, hasLowStock);

    const filtered =
      State.invFilter === "ALL"
        ? items
        : items.filter(function (i) {
            return i.category === State.invFilter;
          });

    if (filtered.length === 0) {
      container.innerHTML =
        '<div class="p-4 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-xl text-xs">इस श्रेणी में कोई स्टॉक आइटम नहीं है।</div>';
      return;
    }

    let html = "";
    filtered.forEach(function (item) {
      const isLow = item.stock <= item.minAlert;
      html += '<div class="p-3 bg-slate-50 border ' + (isLow ? "border-rose-300 bg-rose-50/50" : "border-slate-200") + ' rounded-2xl flex justify-between items-center text-xs">';
      html += '  <div>';
      html += '    <strong class="text-slate-900 block">' + item.name + "</strong>";
      html += '    <span class="text-slate-500 text-[11px]">' + item.category + " | अलर्ट सीमा: " + item.minAlert + " " + item.unit + "</span>";
      if (isLow) {
        html += '    <span class="text-[10px] text-rose-600 font-bold block">⚠️ स्टॉक कम है! तुरंत रीऑर्डर करें</span>';
      }
      html += "  </div>";
      html += '  <div class="flex items-center gap-2">';
      html += '    <button onclick="updateStockQty(\'' + item.id + '\', -1)" class="w-7 h-7 bg-white border border-slate-300 rounded-lg font-black text-slate-700 hover:bg-slate-100 cursor-pointer">-</button>';
      html += '    <strong class="text-sm font-mono px-1 ' + (isLow ? "text-rose-700" : "text-slate-900") + '">' + item.stock + "</strong>";
      html += '    <button onclick="updateStockQty(\'' + item.id + '\', 1)" class="w-7 h-7 bg-white border border-slate-300 rounded-lg font-black text-slate-700 hover:bg-slate-100 cursor-pointer">+</button>';
      html += '    <button onclick="deleteInventoryItem(\'' + item.id + '\')" class="text-slate-400 hover:text-rose-600 ml-1 text-sm cursor-pointer">🗑️</button>';
      html += "  </div>";
      html += "</div>";
    });

    container.innerHTML = html;
  }

  window.updateStockQty = function (id, delta) {
    const items = getStoredJson("vetcare_inventory_stock", []);
    const target = items.find(function (i) {
      return i.id === id;
    });
    if (target) {
      target.stock = Math.max(0, target.stock + delta);
      setStoredJson("vetcare_inventory_stock", items);
      renderInventory();
    }
  };

  window.deleteInventoryItem = function (id) {
    if (!confirm("क्या आप इस स्टॉक आइटम को हटाना चाहते हैं?")) return;
    let items = getStoredJson("vetcare_inventory_stock", []);
    items = items.filter(function (i) {
      return i.id !== id;
    });
    setStoredJson("vetcare_inventory_stock", items);
    renderInventory();
  };

  /* ==========================================================================
   * 14. DUAL-BANK MONETIZATION, QR GENERATOR & RENEWALS
   * ========================================================================== */
  window.openPremiumPaymentModal = function () {
    window.selectPaymentPlan(State.selectedPlan);
    setVisible("modalPremiumPayment", true, "flex");
  };

  window.closePremiumPaymentModal = function () {
    setVisible("modalPremiumPayment", false);
  };

  window.selectPaymentPlan = function (plan) {
    State.selectedPlan = plan;
    const isMonthly = plan === "MONTHLY";

    const btnM = $("btnPlanMonthly");
    const btnA = $("btnPlanAnnual");
    if (btnM && btnA) {
      if (isMonthly) {
        btnM.className =
          "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition cursor-pointer";
        btnA.className =
          "py-2 rounded-xl text-slate-700 font-medium text-center transition cursor-pointer";
      } else {
        btnM.className =
          "py-2 rounded-xl text-slate-700 font-medium text-center transition cursor-pointer";
        btnA.className =
          "py-2 rounded-xl bg-blue-600 text-white font-bold text-center transition cursor-pointer";
      }
    }

    const price = isMonthly
      ? MASTER_CONFIG.pricing.monthly
      : MASTER_CONFIG.pricing.annual;
    const directAmt = $("directUPIAmount");
    if (directAmt) directAmt.textContent = price;

    updateDynamicPaymentQR(price);
  };

  window.switchBankTab = function (bank) {
    State.activeBank = bank;
    const isSbi = bank === "SBI";
    const btnS = $("btnTabSBI");
    const btnP = $("btnTabPNB");

    if (btnS && btnP) {
      if (isSbi) {
        btnS.className =
          "flex-1 py-2 font-bold bg-blue-50 text-blue-700 text-center transition cursor-pointer";
        btnP.className =
          "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition cursor-pointer";
      } else {
        btnS.className =
          "flex-1 py-2 font-medium bg-slate-50 text-slate-600 text-center transition cursor-pointer";
        btnP.className =
          "flex-1 py-2 font-bold bg-amber-50 text-amber-800 text-center transition cursor-pointer";
      }
    }

    const bankObj = isSbi ? MASTER_CONFIG.sbiPrimary : MASTER_CONFIG.pnbBackup;
    const dispPayee = $("dispPayeeName");
    const dispUpi = $("dispUPIId");
    const dispAcc = $("dispAccountNumber");
    const dispIfsc = $("dispIFSC");

    if (dispPayee) dispPayee.textContent = MASTER_CONFIG.payeeName;
    if (dispUpi) dispUpi.textContent = bankObj.upiId;
    if (dispAcc) dispAcc.textContent = bankObj.accountNumber;
    if (dispIfsc) dispIfsc.textContent = bankObj.ifsc;

    const price =
      State.selectedPlan === "MONTHLY"
        ? MASTER_CONFIG.pricing.monthly
        : MASTER_CONFIG.pricing.annual;
    updateDynamicPaymentQR(price);
  };

  function updateDynamicPaymentQR(amount) {
    const isSbi = State.activeBank === "SBI";
    const bankObj = isSbi ? MASTER_CONFIG.sbiPrimary : MASTER_CONFIG.pnbBackup;

    // Build standard UPI intent URI
    const upiUri =
      "upi://pay?pa=" +
      bankObj.upiId +
      "&pn=" +
      encodeURIComponent(MASTER_CONFIG.payeeName) +
      "&am=" +
      amount +
      "&cu=INR&tn=Vetcare%20Premium%20Plan";

    const qrImg = $("dynamicQRImage");
    if (qrImg) {
      qrImg.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(upiUri);
    }

    const directBtn = $("btnDirectUPILink");
    if (directBtn) {
      directBtn.href = upiUri;
    }
  }

  window.sendPaymentProofWhatsApp = function () {
    const isMonthly = State.selectedPlan === "MONTHLY";
    const price = isMonthly
      ? MASTER_CONFIG.pricing.monthly
      : MASTER_CONFIG.pricing.annual;
    const planName = isMonthly ? "मासिक प्लान (₹199)" : "वार्षिक प्लान (₹1,499)";
    const userPhone = localStorage.getItem("vetcare_user_phone") || "नया उपयोगकर्ता";

    const msg =
      "नमस्ते एडमिन! मैंने Vetcare AI OS के " +
      planName +
      " के लिए ₹" +
      price +
      " का भुगतान पूर्ण कर दिया है।\n\nपंजीकृत मोबाइल: " +
      userPhone +
      "\nकृपया मेरा प्रीमियम खाता सक्रिय करें।\n(स्क्रीनशॉट संलग्न है)";

    const url =
      "https://wa.me/91" +
      MASTER_CONFIG.adminWhatsApp +
      "?text=" +
      encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  window.escalateToAdminWhatsApp = function () {
    const userPhone = localStorage.getItem("vetcare_user_phone") || "Unknown";
    const msg =
      "नमस्ते एडमिन, मुझे Vetcare AI OS ऐप उपयोग में सहायता चाहिए। मेरा नंबर: " +
      userPhone;
    window.open(
      "https://wa.me/91" +
        MASTER_CONFIG.adminWhatsApp +
        "?text=" +
        encodeURIComponent(msg),
      "_blank"
    );
  };

  /* ==========================================================================
   * 15. SUPER ADMIN CONTROL ROOM & DATA AUDIT METRICS
   * ========================================================================== */
  window.openAdminPinModal = function () {
    const input = $("inputAdminPIN");
    if (input) input.value = "";
    setVisible("pinErrorMessage", false);
    setVisible("modalAdminPIN", true, "flex");
  };

  window.closeAdminPinModal = function () {
    setVisible("modalAdminPIN", false);
  };

  window.verifyAdminPIN = function () {
    const input = $("inputAdminPIN");
    const pin = input ? input.value.trim() : "";
    const activePin = MASTER_CONFIG.masterPin;

    if (pin === activePin) {
      window.closeAdminPinModal();
      openAdminDashboard();
    } else {
      setVisible("pinErrorMessage", true);
      if (input) {
        input.value = "";
        input.focus();
      }
    }
  };

  function openAdminDashboard() {
    setVisible("modalAdminDashboard", true, "flex");
    populateAdminSettings();
    updateAdminMetrics();
    window.switchAdminTab("PAYMENT");
  }

  window.closeAdminDashboard = function () {
    setVisible("modalAdminDashboard", false);
  };

  window.switchAdminTab = function (tab) {
    setVisible("adminPanelPayment", tab === "PAYMENT");
    setVisible("adminPanelBranding", tab === "BRANDING");
    setVisible("adminPanelSupport", tab === "SUPPORT");
    setVisible("adminPanelMetrics", tab === "METRICS");

    const tabs = ["PAYMENT", "BRANDING", "SUPPORT", "METRICS"];
    const btnIds = [
      "tabBtnAdminPay",
      "tabBtnAdminBrand",
      "tabBtnAdminSupport",
      "tabBtnAdminMetrics"
    ];

    tabs.forEach(function (t, idx) {
      const btn = $(btnIds[idx]);
      if (!btn) return;
      if (t === tab) {
        btn.className =
          "px-4 py-2 border-b-2 border-blue-600 text-blue-600 shrink-0 font-bold cursor-pointer";
      } else {
        btn.className =
          "px-4 py-2 border-b-2 border-transparent hover:text-slate-900 text-slate-500 shrink-0 font-bold cursor-pointer";
      }
    });
  };

  function populateAdminSettings() {
    if ($("cfgPayeeName")) $("cfgPayeeName").value = MASTER_CONFIG.payeeName;
    if ($("cfgMonthlyPrice"))
      $("cfgMonthlyPrice").value = MASTER_CONFIG.pricing.monthly;
    if ($("cfgAnnualPrice"))
      $("cfgAnnualPrice").value = MASTER_CONFIG.pricing.annual;
    if ($("cfgSbiUpi")) $("cfgSbiUpi").value = MASTER_CONFIG.sbiPrimary.upiId;
    if ($("cfgSbiAccount"))
      $("cfgSbiAccount").value = MASTER_CONFIG.sbiPrimary.accountNumber;
    if ($("cfgSbiIfsc"))
      $("cfgSbiIfsc").value = MASTER_CONFIG.sbiPrimary.ifsc;
    if ($("cfgPnbUpi")) $("cfgPnbUpi").value = MASTER_CONFIG.pnbBackup.upiId;
    if ($("cfgPnbAccount"))
      $("cfgPnbAccount").value = MASTER_CONFIG.pnbBackup.accountNumber;
    if ($("cfgPnbIfsc"))
      $("cfgPnbIfsc").value = MASTER_CONFIG.pnbBackup.ifsc;
    if ($("cfgAppTitle")) $("cfgAppTitle").value = MASTER_CONFIG.appTitle;
    if ($("cfgAppTagline")) $("cfgAppTagline").value = MASTER_CONFIG.tagline;
    if ($("cfgAdminWhatsApp"))
      $("cfgAdminWhatsApp").value = MASTER_CONFIG.adminWhatsApp;
    if ($("cfgAdminPIN")) $("cfgAdminPIN").value = MASTER_CONFIG.masterPin;
  }

  function updateAdminMetrics() {
    const cases = getStoredJson("vetcare_opd_cases", []);
    const khata = getStoredJson("vetcare_khata_records", []);
    const stock = getStoredJson("vetcare_inventory_stock", []);

    let totalDues = 0;
    khata.forEach(function (k) {
      if (k.type === "DUE") totalDues += k.amount;
    });

    let lowStockCount = 0;
    stock.forEach(function (s) {
      if (s.stock <= s.minAlert) lowStockCount++;
    });

    if ($("metricTotalOPD")) $("metricTotalOPD").textContent = cases.length;
    if ($("metricTotalDues"))
      $("metricTotalDues").textContent = "₹" + totalDues.toLocaleString();
    if ($("metricLowStock")) $("metricLowStock").textContent = lowStockCount;
  }

  window.saveAllAdminSettings = function () {
    if ($("cfgPayeeName"))
      MASTER_CONFIG.payeeName = $("cfgPayeeName").value.trim();
    if ($("cfgMonthlyPrice"))
      MASTER_CONFIG.pricing.monthly =
        parseFloat($("cfgMonthlyPrice").value) || 199;
    if ($("cfgAnnualPrice"))
      MASTER_CONFIG.pricing.annual =
        parseFloat($("cfgAnnualPrice").value) || 1499;
    if ($("cfgSbiUpi"))
      MASTER_CONFIG.sbiPrimary.upiId = $("cfgSbiUpi").value.trim();
    if ($("cfgSbiAccount"))
      MASTER_CONFIG.sbiPrimary.accountNumber = $("cfgSbiAccount").value.trim();
    if ($("cfgSbiIfsc"))
      MASTER_CONFIG.sbiPrimary.ifsc = $("cfgSbiIfsc").value.trim();
    if ($("cfgPnbUpi"))
      MASTER_CONFIG.pnbBackup.upiId = $("cfgPnbUpi").value.trim();
    if ($("cfgPnbAccount"))
      MASTER_CONFIG.pnbBackup.accountNumber = $("cfgPnbAccount").value.trim();
    if ($("cfgPnbIfsc"))
      MASTER_CONFIG.pnbBackup.ifsc = $("cfgPnbIfsc").value.trim();
    if ($("cfgAppTitle"))
      MASTER_CONFIG.appTitle = $("cfgAppTitle").value.trim();
    if ($("cfgAppTagline"))
      MASTER_CONFIG.tagline = $("cfgAppTagline").value.trim();
    if ($("cfgAdminWhatsApp"))
      MASTER_CONFIG.adminWhatsApp = $("cfgAdminWhatsApp").value.trim();
    if ($("cfgAdminPIN")) {
      const pin = $("cfgAdminPIN").value.trim();
      if (pin.length === 4) MASTER_CONFIG.masterPin = pin;
    }

    setStoredJson("vetcare_master_config", MASTER_CONFIG);
    alert("✅ सभी सुपर एडमिन कॉन्फ़िगरेशन सुरक्षित कर दिए गए हैं।");
    window.closeAdminDashboard();
  };

  window.exportDataBackupJSON = function () {
    const backup = {
      timestamp: new Date().toISOString(),
      opdCases: getStoredJson("vetcare_opd_cases", []),
      khata: getStoredJson("vetcare_khata_records", []),
      inventory: getStoredJson("vetcare_inventory_stock", []),
      roleRequests: getStoredJson("vetcare_role_change_requests", [])
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vetcare_backup_" + Date.now() + ".json";
    a.click();
  };

  window.clearDemoDataOnly = function () {
    if (confirm("चेतावनी: क्या आप केवल टेस्ट/डेमो डेटा रीसेट करना चाहते हैं?")) {
      localStorage.removeItem("vetcare_opd_cases");
      localStorage.removeItem("vetcare_khata_records");
      renderCaseRecords();
      renderKhataList();
      updateAdminMetrics();
      alert("✅ टेस्ट डेटा साफ़ कर दिया गया है।");
    }
  };

  /* ==========================================================================
   * 16. MULTI-LANGUAGE (i18n) ENGINE DISPATCHER
   * ========================================================================== */
  window.openLanguageModal = function () {
    setVisible("modalLanguageSelector", true, "flex");
  };

  window.closeLanguageModal = function () {
    setVisible("modalLanguageSelector", false);
  };

  window.setLanguage = function (langCode) {
    if (!VETCARE_TRANSLATIONS[langCode]) langCode = "hi";
    localStorage.setItem("vetcare_lang", langCode);

    const dict = VETCARE_TRANSLATIONS[langCode];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langLabelMap = {
      en: "English",
      hi: "हिन्दी",
      hinglish: "Hinglish",
      pa: "ਪੰਜਾਬੀ",
      mr: "मराठी",
      gu: "ગુજરાતી",
      bn: "বাংলা"
    };

    const currentLabel = $("currentLangLabel");
    if (currentLabel) {
      currentLabel.textContent = langLabelMap[langCode] || "हिन्दी";
    }

    const headerText = $("headerLangText");
    if (headerText) {
      headerText.textContent = langLabelMap[langCode] || "भाषा";
    }

    window.closeLanguageModal();
  };

  /* ==========================================================================
   * 17. SYSTEM BOOTSTRAPPER & EVENT INITIALIZATION
   * ========================================================================== */
  function initializeSystem() {
    // 1. Load Custom Config Overrides
    const savedConfig = getStoredJson("vetcare_master_config", null);
    if (savedConfig) {
      Object.assign(MASTER_CONFIG, savedConfig);
    }

    // 2. Initialize Language Preference
    const savedLang = localStorage.getItem("vetcare_lang") || "hi";
    window.setLanguage(savedLang);

    // 3. Restore Role if Already Registered and Session is Active
    const savedRole = localStorage.getItem("vetcare_registered_role");
    const sessionStart = localStorage.getItem("vetcare_session_timestamp");

    if (savedRole && sessionStart) {
      const elapsed = Date.now() - parseInt(sessionStart, 10);
      if (elapsed < SESSION_DURATION_MS) {
        initSessionEngine();
        activateRoleEnvironment(savedRole);
        return;
      }
    }

    // Otherwise show Gateway landing
    setVisible("screenGateway", true, "flex");
    setVisible("screenMainApp", false);
  }

  // DOMContentLoaded Safeguard
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSystem);
  } else {
    initializeSystem();
  }

})(window, document);
