// Vetcare AI OS - Comprehensive i18n & Hinglish Multi-Language Engine (2026
Production) (function (window, document) { "use strict";

// Ensure application global namespace window.VetcareApp = window.VetcareApp ||
{};

/**

  - I18nEngine Module
  - High-performance multi-language internationalization system featuring
  - first-class Hinglish, Hindi, English, 10 Indian regional dialects, and 5
    global languages. */ const I18nEngine = (function () { const STORAGE_KEY =
    "vetcare_active_lang"; const DEFAULT_LANG = "hinglish";

// RTL language codes
const RTL_LANGUAGES = new Set(["ar", "ur"]);

// -------------------------------------------------------------
// LANGUAGE METADATA CATALOG
// -------------------------------------------------------------
const SUPPORTED_LANGUAGES = {
  hinglish: { name: "Hinglish", nativeName: "हिंग्लिश (Romanized Hindi)", dir: "ltr" },
  hi: { name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  en: { name: "English", nativeName: "English (Global)", dir: "ltr" },
  pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", dir: "ltr" },
  mr: { name: "Marathi", nativeName: "मराठी", dir: "ltr" },
  bn: { name: "Bengali", nativeName: "বাংলা", dir: "ltr" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", dir: "ltr" },
  ta: { name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
  te: { name: "Telugu", nativeName: "తెలుగు", dir: "ltr" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", dir: "ltr" },
  ml: { name: "Malayalam", nativeName: "മലയാളം", dir: "ltr" },
  or: { name: "Odia", nativeName: "ଓଡ଼ିଆ", dir: "ltr" },
  ur: { name: "Urdu", nativeName: "اردو", dir: "rtl" },
  es: { name: "Spanish", nativeName: "Español", dir: "ltr" },
  fr: { name: "French", nativeName: "Français", dir: "ltr" },
  de: { name: "German", nativeName: "Deutsch", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", dir: "rtl" },
  ru: { name: "Russian", nativeName: "Русский", dir: "ltr" }
};

// -------------------------------------------------------------
// CLINICAL TRANSLATION DICTIONARY
// -------------------------------------------------------------
const TRANSLATIONS = {
  // 1. HINGLISH (Primary conversational Romanized Hindi)
  hinglish: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Veterinary Informatic Core",
    nav_doctor: "Doctor Portal",
    nav_farmer: "Farmer Hub",
    nav_admin: "Admin Vault",
    nav_home: "Home",
    hero_title: "National Veterinary & Dairy Farmer Digital Network",
    hero_desc: "Shaeffer's formula weight calculation, instant OPD intake, 60+ pathology symptoms, aur foolproof corticosteroid pregnancy locks.",
    quick_intake: "Naya OPD Mareez (Quick Intake)",
    enter_opd: "OPD Console Kholein (Enter OPD)",
    access_farmer: "Pashupalak Hub Kholein (Access Desk)",
    unlock_vault: "Admin Vault Kholein (Unlock Vault)",
    opd_active: "OPD Active:",
    steroid_guard: "STEROID GUARD: ACTIVE",
    db_online: "INDEXED-DB: PERSISTED",
    shaeffer_calc: "Shaeffer Formula Live Weight",
    steroid_warning: "Garbhvati pashuon mein steroid puri tarah prohibited hai (Abortion Risk).",
    desi_nuskhe: "Ayurvedic Desi Nuskhe",
    milk_ledger: "Doodh aur Fat Khata Bahi",
    bulls_directory: "Top Genetic Bull Directory",
    triage_critical: "Emergency Critical (Turant Dekhein)",
    triage_urgent: "Urgent Attention (Jaldi)",
    triage_routine: "Routine OPD (Samanya)",
    species: "Pashu Prajati (Species)",
    save: "Surakshit Save Karein",
    cancel: "Cancel Karein",
    lang_switched: "Language Hinglish mein set ho gayi hai."
  },

  // 2. HINDI (हिन्दी - Standard Devnagari Clinical)
  hi: {
    app_title: "वेटकेयर एआई ओएस",
    app_subtitle: "पशु चिकित्सा सूचना तंत्र",
    nav_doctor: "चिकित्सक (Doctor)",
    nav_farmer: "पशुपालक (Farmer)",
    nav_admin: "एडमिन वॉल्ट (Admin)",
    nav_home: "मुख्य पृष्ठ",
    hero_title: "राष्ट्रीय पशु चिकित्सा एवं कृषक डिजिटल महाजाल",
    hero_desc: "शेफर्स सूत्र आधारित सटीक वजन मापन, त्वरित ओपीडी, 60+ पैथोलॉजी लक्षण मैट्रिक्स, सुरक्षित स्टेरॉयड गार्डरेल्स एवं समग्र पशु स्वास्थ्य प्रणाली।",
    quick_intake: "त्वरित नया ओपीडी मरीज (Quick Intake)",
    enter_opd: "ओपीडी कंसोल खोलें (Enter OPD)",
    access_farmer: "पशुपालक हब खोलें (Access Desk)",
    unlock_vault: "एडमिन वॉल्ट अनलॉक करें (Unlock Vault)",
    opd_active: "ओपीडी सक्रिय:",
    steroid_guard: "स्टेरॉयड गार्ड: सक्रिय",
    db_online: "इंडेक्स्ड-डीबी: सक्रिय",
    shaeffer_calc: "शेफर्स सूत्र आधारित वास्तविक वजन",
    steroid_warning: "गर्भवती पशुओं में कॉर्टिकोस्टेरॉइड का प्रयोग पूर्णतः वर्जित है (गर्भपात का जोखिम)।",
    desi_nuskhe: "पारंपरिक अनुभूत आयुर्वेदिक नुस्खे",
    milk_ledger: "दैनिक दुग्ध व फैट बही खाता",
    bulls_directory: "उच्च आनुवंशिक सांड निर्देशिका",
    triage_critical: "अति-गंभीर आपातकाल (लाल)",
    triage_urgent: "त्वरित ध्यान योग्य (पीला)",
    triage_routine: "सामान्य परामर्श (हरा)",
    species: "पशु प्रजाति",
    save: "सुरक्षित सहेजें",
    cancel: "रद्द करें",
    lang_switched: "भाषा हिन्दी में सफलतापूर्वक अपडेट की गई।"
  },

  // 3. ENGLISH (Global Medical Standard)
  en: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Veterinary Clinical Informatic Core",
    nav_doctor: "Veterinary Doctor",
    nav_farmer: "Smart Dairy Farmer",
    nav_admin: "Admin Vault",
    nav_home: "Dashboard Home",
    hero_title: "National Veterinary Informatics & Farmer Network",
    hero_desc: "Precision Shaeffer's formula weight dosing, rapid OPD intake, 60+ differential pathology matrices, and pregnancy corticosteroid locks.",
    quick_intake: "New Patient Intake (Quick OPD)",
    enter_opd: "Launch OPD Clinical Console",
    access_farmer: "Open Smart Dairy Desk",
    unlock_vault: "Authenticate & Unlock Vault",
    opd_active: "Active OPD:",
    steroid_guard: "STEROID GUARD: ACTIVE",
    db_online: "INDEXED-DB: PERSISTED",
    shaeffer_calc: "Shaeffer's Formula Body Weight",
    steroid_warning: "Corticosteroids strictly contraindicated during pregnancy (Abortion Risk).",
    desi_nuskhe: "Ethno-Veterinary Herbal Remedies",
    milk_ledger: "Daily Milk & Fat Ledger",
    bulls_directory: "High-Pedigree Bull Sires",
    triage_critical: "Critical Emergency (Immediate)",
    triage_urgent: "Urgent Assessment",
    triage_routine: "Routine OPD Checkup",
    species: "Animal Species",
    save: "Save & Persist",
    cancel: "Cancel",
    lang_switched: "Application language set to English."
  },

  // 4. PUNJABI (ਪੰਜਾਬੀ)
  pa: {
    app_title: "ਵੈੱਟਕੇਅਰ ਏਆਈ ਓਐਸ",
    app_subtitle: "ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਕੋਰ",
    nav_doctor: "ਡਾਕਟਰ ਪੋਰਟਲ",
    nav_farmer: "ਪਸ਼ੂ ਪਾਲਕ ਹੱਬ",
    nav_admin: "ਐਡਮਿਨ ਵਾਲਟ",
    nav_home: "ਮੁੱਖ ਸਫ਼ਾ",
    hero_title: "ਰਾਸ਼ਟਰੀ ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਅਤੇ ਡੇਅਰੀ ਕਿਸਾਨ ਨੈੱਟਵਰਕ",
    hero_desc: "ਸ਼ੈਫਰ ਫਾਰਮੂਲੇ ਨਾਲ ਸਹੀ ਭਾਰ ਗਣਨਾ, ਓਪੀਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਗਰਭ ਸੁਰੱਖਿਆ ਨਿਯਮ।",
    quick_intake: "ਨਵਾਂ ਮਰੀਜ਼ ਦਾਖਲਾ (Quick Intake)",
    enter_opd: "ਓਪੀਡੀ ਕੰਸੋਲ ਖੋਲ੍ਹੋ",
    access_farmer: "ਡੇਅਰੀ ਹੱਬ ਖੋਲ੍ਹੋ",
    unlock_vault: "ਐਡਮਿਨ ਵਾਲਟ ਖੋਲ੍ਹੋ",
    opd_active: "ਓਪੀਡੀ ਸਰਗਰਮ:",
    steroid_guard: "ਸਟੀਰੌਇਡ ਗਾਰਡ: ਸਰਗਰਮ",
    db_online: "ਡਾਟਾਬੇਸ: ਆਨਲਾਈਨ",
    shaeffer_calc: "ਸ਼ੈਫਰ ਭਾਰ ਕੈਲਕੁਲੇਟਰ",
    steroid_warning: "ਗਰਭਵਤੀ ਪਸ਼ੂਆਂ ਵਿੱਚ ਸਟੀਰੌਇਡ ਦੀ ਵਰਤੋਂ ਵਰਜਿਤ ਹੈ।",
    desi_nuskhe: "ਦੇਸੀ ਆਯੁਰਵੈਦਿਕ ਨੁਸਖੇ",
    milk_ledger: "ਦੁੱਧ ਅਤੇ ਫੈਟ ਵਹੀ ਖਾਤਾ",
    bulls_directory: "ਉੱਚ ਨਸਲ ਸਾਨ੍ਹ ਸੂਚੀ",
    triage_critical: "ਐਮਰਜੈਂਸੀ (ਤੁਰੰਤ)",
    triage_urgent: "ਜ਼ਰੂਰੀ",
    triage_routine: "ਆਮ ਜਾਂਚ",
    species: "ਪਸ਼ੂ ਨਸਲ",
    save: "ਸੁਰੱਖਿਅਤ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    lang_switched: "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਸੈੱਟ ਕੀਤੀ ਗਈ।"
  },

  // 5. MARATHI (मराठी)
  mr: {
    app_title: "व्हेटकेअर एआय ओएस",
    app_subtitle: "पशुवैद्यकीय माहिती प्रणाली",
    nav_doctor: "पशुवैद्यक (Doctor)",
    nav_farmer: "पशुपालक (Farmer)",
    nav_admin: "प्रशासकीय वॉल्ट",
    nav_home: "मुख्य पान",
    hero_title: "राष्ट्रीय पशुवैद्यकीय व शेतकरी डिजिटल महाजाल",
    hero_desc: "शेफर्स सूत्रानुसार अचूक वजन मापन, जलद ओपीडी व गर्भ संरक्षण सुरक्षा प्रणाली.",
    quick_intake: "नवीन रुग्ण नोंदणी (Quick Intake)",
    enter_opd: "ओपीडी कन्सोल उघडा",
    access_farmer: "पशुपालक हब उघडा",
    unlock_vault: "वॉल्ट अनलॉक करा",
    opd_active: "सक्रिय ओपीडी:",
    steroid_guard: "स्टेरॉईड गार्ड: सक्रिय",
    db_online: "डेटाबेस: ऑनलाइन",
    shaeffer_calc: "शेफर्स वजन गणना",
    steroid_warning: "गाभण जनावरांमध्ये कॉर्टिकोस्टिरॉइड्सचा वापर पूर्णपणे निषिद्ध आहे.",
    desi_nuskhe: "अनुभूत आयुर्वेदिक घरगुती उपाय",
    milk_ledger: "दूध व फॅट दैनंदिन नोंदवही",
    bulls_directory: "उच्च पैदास वळू निर्देशिका",
    triage_critical: "अति-तातडीचे (Emergency)",
    triage_urgent: "तातडीचे",
    triage_routine: "नियमित तपासणी",
    species: "प्राण्याची जात",
    save: "जतन करा",
    cancel: "रद्द करा",
    lang_switched: "भाषा मराठीत सेट केली आहे."
  },

  // 6. BENGALI (বাংলা)
  bn: {
    app_title: "ভেটকেয়ার এআই ওএস",
    app_subtitle: "পশু চিকিৎসা তথ্য ব্যবস্থা",
    nav_doctor: "চিকিৎসক পোর্টাল",
    nav_farmer: "খামারি হাব",
    nav_admin: "অ্যাডমিন ভল্ট",
    nav_home: "মূল পাতা",
    hero_title: "জাতীয় পশুচিকিৎসা এবং খামারি ডিজিটাল নেটওয়ার্ক",
    hero_desc: "শেফারের সূত্র দ্বারা নির্ভুল ওজন নির্ণয়, ওপিডি প্রেসক্রিপশন ও গর্ভ সুরক্ষা গার্ডরেল।",
    quick_intake: "নতুন রোগী নিবন্ধন (Quick Intake)",
    enter_opd: "ওপিডি কনসোল খুলুন",
    access_farmer: "খামারি ডেস্ক খুলুন",
    unlock_vault: "ভল্ট আনলক করুন",
    opd_active: "সক্রিয় ওপিডি:",
    steroid_guard: "স্টেরয়েড গার্ড: সক্রিয়",
    db_online: "ডাটাবেস: অনলাইন",
    shaeffer_calc: "শেফারের ওজন ক্যালকুলেটর",
    steroid_warning: "গর্ভবতী পশুদের জন্য স্টেরয়েড সম্পূর্ণরূপে নিষিদ্ধ।",
    desi_nuskhe: "দেশি ভেষজ চিকিৎসা",
    milk_ledger: "দুধ ও ফ্যাট হিসাব খাতা",
    bulls_directory: "উন্নত জাতের ষাঁড়ের তালিকা",
    triage_critical: "জরুরি অবস্থা (Critical)",
    triage_urgent: "জরুরি",
    triage_routine: "সাধারণ পরীক্ষা",
    species: "পশুর প্রজাতি",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল করুন",
    lang_switched: "ভাষা বাংলায় পরিবর্তন করা হয়েছে।"
  },

  // 7. GUJARATI (ગુજરાતી)
  gu: {
    app_title: "વેટકેર એઆઈ ઓએસ",
    app_subtitle: "પશુ ચિકિત્સા ઇન્ફોર્મેટિક્સ",
    nav_doctor: "ડૉક્ટર પોર્ટલ",
    nav_farmer: "પશુપાલક હબ",
    nav_admin: "એડમિન વૉલ્ટ",
    nav_home: "હોમ પેજ",
    hero_title: "રાષ્ટ્રીય પશુ ચિકિત્સા અને પશુપાલક ડિજિટલ નેટવર્ક",
    hero_desc: "શેફર્સ ફોર્મ્યુલા આધારિત વજન માપન, ઓપીડી કન્સલ્ટેશન અને ગર્ભ સુરક્ષા ગાર્ડરેલ.",
    quick_intake: "નવો દર્દી નોંધણી (Quick Intake)",
    enter_opd: "ઓપીડી કન્સોલ ખોલો",
    access_farmer: "પશુપાલક ડેસ્ક ખોલો",
    unlock_vault: "વૉલ્ટ અનલૉક કરો",
    opd_active: "ઓપીડી સક્રિય:",
    steroid_guard: "સ્ટેરોઇડ ગાર્ડ: સક્રિય",
    db_online: "ડેટાબેઝ: ઓનલાઇન",
    shaeffer_calc: "શેફર્સ વજન ગણતરી",
    steroid_warning: "સગર્ભા પશુઓમાં સ્ટેરોઇડ્સનો ઉપયોગ સખત પ્રતિબંધિત છે.",
    desi_nuskhe: "પરંપરાગત આયુર્વેદિક ઉપચાર",
    milk_ledger: "દૂધ અને ફેટ ખાતાવહી",
    bulls_directory: "ઉચ્ચ નસલ આખલા યાદી",
    triage_critical: "અતિ ગંભીર કટોકટી",
    triage_urgent: "તાકીદનું",
    triage_routine: "સામાન્ય તપાસ",
    species: "પશુ પ્રજાતિ",
    save: "સાચવો",
    cancel: "રદ કરો",
    lang_switched: "ભાષા ગુજરાતીમાં સેટ થઈ ગઈ છે."
  },

  // 8. TAMIL (தமிழ்)
  ta: {
    app_title: "வெட்கேர் AI OS",
    app_subtitle: "கால்நடை தகவல் மையம்",
    nav_doctor: "மருத்துவர் தளம்",
    nav_farmer: "விவசாயி தளம்",
    nav_admin: "நிர்வாக பெட்டகம்",
    nav_home: "முகப்பு",
    hero_title: "தேசிய கால்நடை மருத்துவ மற்றும் விவசாய டிஜிட்டல் தளம்",
    hero_desc: "துல்லியமான எடை கணக்கீடு, அவசர சிகிச்சை மற்றும் கர்ப்ப பாதுகாப்பு வழிகாட்டுதல்கள்.",
    quick_intake: "புதிய நோயாளி சேர்க்கை",
    enter_opd: "OPD தொடங்கவும்",
    access_farmer: "பண்ணை தளம் செல்லவும்",
    unlock_vault: "பெட்டகத்தை திறக்கவும்",
    opd_active: "செயலில் உள்ள OPD:",
    steroid_guard: "ஸ்டீராய்டு தடுப்பு: செயலில்",
    db_online: "தரவுத்தளம்: ஆன்லைன்",
    shaeffer_calc: "எடை கணிப்பான்",
    steroid_warning: "கர்ப்பிணி விலங்குகளுக்கு ஸ்டீராய்டு முற்றிலும் தடைசெய்யப்பட்டுள்ளது.",
    desi_nuskhe: "பாரம்பரிய நாட்டு மருத்துவம்",
    milk_ledger: "பால் மற்றும் கொழுப்பு கணக்கு",
    bulls_directory: "உயர் இன காளைகள் பட்டியல்",
    triage_critical: "அவசர சிகிச்சை தேவை",
    triage_urgent: "முக்கியமானது",
    triage_routine: "வழக்கமான பரிசோதனை",
    species: "விலங்கு இனம்",
    save: "சேமிக்கவும்",
    cancel: "ரத்து செய்",
    lang_switched: "மொழி தமிழுக்கு மாற்றப்பட்டது."
  },

  // 9. TELUGU (తెలుగు)
  te: {
    app_title: "వెట్‌కేర్ AI OS",
    app_subtitle: "పశువైద్య సమాచార వ్యవస్థ",
    nav_doctor: "వైద్యుల పోర్టల్",
    nav_farmer: "రైతు కేంద్రం",
    nav_admin: "అడ్మిన్ వాల్ట్",
    nav_home: "హోమ్ పేజీ",
    hero_title: "జాతీయ పశువైద్య మరియు పాడి రైతు డిజిటల్ నెట్‌వర్క్",
    hero_desc: "షెఫర్స్ సూత్రం ద్వారా శరీర బరువు లెక్కింపు మరియు గర్భ రక్షణ నియమాలు.",
    quick_intake: "కొత్త రోగి నమోదు (Quick Intake)",
    enter_opd: "OPD కన్సోల్ తెరవండి",
    access_farmer: "రైతు డెస్క్ తెరవండి",
    unlock_vault: "వాల్ట్ అన్‌లాక్ చేయండి",
    opd_active: "యాక్టివ్ OPD:",
    steroid_guard: "స్టెరాయిడ్ గార్డ్: యాక్టివ్",
    db_online: "డేటాబేస్: ఆన్‌లైన్",
    shaeffer_calc: "బరువు లెక్కింపు",
    steroid_warning: "గర్భంతో ఉన్న పశువులకు స్టెరాయిడ్స్ పూర్తిగా నిషేధం.",
    desi_nuskhe: "ఆయుర్వేద దేశీ చిట్కాలు",
    milk_ledger: "పాల కొలత మరియు ఫ్యాట్ లెడ్జర్",
    bulls_directory: "ఉన్నత జాతి ఆంబోతుల జాబితా",
    triage_critical: "తీవ్ర అత్యవసరం",
    triage_urgent: "అత్యవసరం",
    triage_routine: "సాధారణ పరీక్ష",
    species: "జంతువు జాతి",
    save: "భద్రపరచండి",
    cancel: "రద్దు చేయండి",
    lang_switched: "భాష తెలుగులోకి మార్చబడింది."
  },

  // 10. KANNADA (ಕನ್ನಡ)
  kn: {
    app_title: "ವೆಟ್‌ಕೇರ್ AI OS",
    app_subtitle: "ಪಶುವೈದ್ಯಕೀಯ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆ",
    nav_doctor: "ವೈದ್ಯರ ಪೋರ್ಟಲ್",
    nav_farmer: "ರೈತರ ಕೇಂದ್ರ",
    nav_admin: "ಅಡ್ಮಿನ್ ವಾಲ್ಟ್",
    nav_home: "ಮುಖಪುಟ",
    hero_title: "ರಾಷ್ಟ್ರೀಯ ಪಶುವೈದ್ಯಕೀಯ ಮತ್ತು ರೈತರ ಡಿಜಿಟಲ್ ಜಾಲ",
    hero_desc: "ತೂಕ ಲೆಕ್ಕಾಚಾರ, ತ್ವರಿತ ಒಪಿಡಿ ಮತ್ತು ಗರ್ಭಾವಸ್ಥೆಯ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು.",
    quick_intake: "ಹೊಸ ರೋಗಿ ನೋಂದಣಿ (Quick Intake)",
    enter_opd: "OPD ತೆರೆಯಿರಿ",
    access_farmer: "ರೈತರ ಕೇಂದ್ರ ತೆರೆಯಿರಿ",
    unlock_vault: "ವಾಲ್ಟ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ",
    opd_active: "ಸಕ್ರಿಯ OPD:",
    steroid_guard: "ಸ್ಟೀರಾಯ್ಡ್ ಗಾರ್ಡ್: ಸಕ್ರಿಯ",
    db_online: "ಡೇಟಾಬೇಸ್: ಆನ್‌ಲೈನ್",
    shaeffer_calc: "ತೂಕ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    steroid_warning: "ಗರ್ಭಿಣಿ ಪ್ರಾಣಿಗಳಿಗೆ ಸ್ಟೀರಾಯ್ಡ್ ಬಳಕೆ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.",
    desi_nuskhe: "ಆಯುರ್ವೇದ ನಾಟಿ ಔಷಧಗಳು",
    milk_ledger: "ಹಾಲು ಮತ್ತು ಫ್ಯಾಟ್ ಲೆಕ್ಕ ಪುಸ್ತಕ",
    bulls_directory: "ಉತ್ತಮ ತಳಿಯ ಹೋರಿಗಳ ಪಟ್ಟಿ",
    triage_critical: "ತುರ್ತು ಚಿಕಿತ್ಸೆ",
    triage_urgent: "ಅಗತ್ಯ",
    triage_routine: "ಸಾಮಾನ್ಯ ತಪಾಸಣೆ",
    species: "ಪ್ರಾಣಿಯ ತಳಿ",
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    lang_switched: "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ."
  },

  // 11. MALAYALAM (മലയാളം)
  ml: {
    app_title: "വെറ്റ്കെയർ AI OS",
    app_subtitle: "മൃഗചികിത്സാ വിവര ശൃംഖല",
    nav_doctor: "ഡോക്ടർ പോർട്ടൽ",
    nav_farmer: "കർഷക ഹബ്ബ്",
    nav_admin: "അഡ്മിൻ വോൾട്ട്",
    nav_home: "പ്രധാന പേജ്",
    hero_title: "ദേശീയ വെറ്ററിനറി - ക്ഷീരകർഷക ഡിജിറ്റൽ ശൃംഖല",
    hero_desc: "കൃത്യമായ ഭാര നിർണ്ണയം, ഒ.പി.ഡി കുറിപ്പടികൾ, ഗർഭകാല സുരക്ഷാ മാർഗ്ഗങ്ങൾ.",
    quick_intake: "പുതിയ ഒ.പി രജിസ്ട്രേഷൻ",
    enter_opd: "OPD കൺസോൾ തുറക്കുക",
    access_farmer: "കർഷക ഹബ്ബ് തുറക്കുക",
    unlock_vault: "വോൾട്ട് അൺലോക്ക് ചെയ്യുക",
    opd_active: "നിലവിലെ OPD:",
    steroid_guard: "സ്റ്റിറോയിഡ് ഗാർഡ്: സജീവം",
    db_online: "ഡാറ്റാബേസ്: ഓൺലൈൻ",
    shaeffer_calc: "ഭാരം കണക്കാക്കൽ",
    steroid_warning: "ഗർഭിണികളായ മൃഗങ്ങൾക്ക് സ്റ്റിറോയിഡുകൾ കർശനമായി നിരോധിച്ചിരിക്കുന്നു.",
    desi_nuskhe: "പരമ്പരാഗത നാട്ടുചികിത്സകൾ",
    milk_ledger: "പാൽ - കൊഴുപ്പ് കണക്കുപുസ്തകം",
    bulls_directory: "ഉയർന്ന ഇനം കാളകളുടെ പട്ടിക",
    triage_critical: "ഗുരുതരാവസ്ഥ (Emergency)",
    triage_urgent: "അടിയന്തിരം",
    triage_routine: "സാധാരണ പരിശോധന",
    species: "മൃഗ ഇനം",
    save: "സൂക്ഷിക്കുക",
    cancel: "റദ്ദാക്കുക",
    lang_switched: "ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി."
  },

  // 12. ODIA (ଓଡ଼ିଆ)
  or: {
    app_title: "ଭେଟକେୟାର AI OS",
    app_subtitle: "ପଶୁ ଚିକିତ୍ସା ସୂଚନା ପ୍ରଣାଳୀ",
    nav_doctor: "ଡାକ୍ତର ପୋର୍ଟାଲ",
    nav_farmer: "କୃଷକ ହବ୍",
    nav_admin: "ଆଡମିନ ଭଲ୍ଟ",
    nav_home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    hero_title: "ଜାତୀୟ ପଶୁ ଚିକିତ୍ସା ଓ ଦୁଗ୍ଧ ଚାଷୀ ଡିଜିଟାଲ ନେଟୱର୍କ",
    hero_desc: "ସଠିକ ଓଜନ ନିର୍ଣ୍ଣୟ, ଶୀଘ୍ର ଓପିଡି ପଞ୍ଜୀକରଣ ଏବଂ ଗର୍ଭଧାରଣ ସୁରକ୍ଷା ନିୟମ।",
    quick_intake: "ନୂତନ ରୋଗୀ ପଞ୍ଜୀକରଣ (Quick Intake)",
    enter_opd: "ଓପିଡି କନସୋଲ ଖୋଲନ୍ତୁ",
    access_farmer: "କୃଷକ ଡେସ୍କ ଖୋଲନ୍ତୁ",
    unlock_vault: "ଭଲ୍ଟ ଅନଲକ୍ କରନ୍ତୁ",
    opd_active: "ସକ୍ରିୟ ଓପିଡି:",
    steroid_guard: "ଷ୍ଟେରଏଡ ଗାର୍ଡ: ସକ୍ରିୟ",
    db_online: "ଡାଟାବେସ: ଅନଲାଇନ",
    shaeffer_calc: "ଓଜନ ଗଣନା",
    steroid_warning: "ଗର୍ଭବତୀ ପଶୁମାନଙ୍କ ପାଇଁ ଷ୍ଟେରଏଡ ସମ୍ପୂର୍ଣ୍ଣ ନିଷିଦ୍ଧ।",
    desi_nuskhe: "ପାରମ୍ପରିକ ଆୟୁର୍ବେଦିକ ଉପଚାର",
    milk_ledger: "ଦୁଗ୍ଧ ଓ ଫ୍ୟାଟ୍ ଖାତା ବହି",
    bulls_directory: "ଉଚ୍ଚ ବଂଶୀୟ ଷଣ୍ଢ ତାଲିକା",
    triage_critical: "ଜରୁରୀକାଳୀନ ସ୍ଥିତି",
    triage_urgent: "ଆବଶ୍ୟକୀୟ",
    triage_routine: "ସାଧାରଣ ଯାଞ୍ଚ",
    species: "ପଶୁ ପ୍ରଜାତି",
    save: "ସଂରକ୍ଷଣ କରନ୍ତୁ",
    cancel: "ବାତିଲ କରନ୍ତୁ",
    lang_switched: "ଭାଷା ଓଡ଼ିଆରେ ପରିବର୍ତ୍ତନ କରାଗଲା।"
  },

  // 13. URDU (اردو - RTL)
  ur: {
    app_title: "ویٹ کیئر AI OS",
    app_subtitle: "ویٹرنری انفارمیٹک کور",
    nav_doctor: "ڈاکٹر پورٹل",
    nav_farmer: "کسان ہب",
    nav_admin: "ایڈمن والٹ",
    nav_home: "ہوم پیج",
    hero_title: "قومی ویٹرنری اور ڈیری فارمر ڈیجیٹل نیٹ ورک",
    hero_desc: "شیفر فارمولے سے درست وزن، فوری او پی ڈی اور حمل کے دوران تحفظ کے اصول۔",
    quick_intake: "نیا مریض رجسٹریشن (Quick Intake)",
    enter_opd: "او پی ڈی کنسول کھولیں",
    access_farmer: "کسان ڈیسک کھولیں",
    unlock_vault: "ایڈمن والٹ انلاک کریں",
    opd_active: "فعال او پی ڈی:",
    steroid_guard: "سٹیرائڈ گارڈ: فعال",
    db_online: "ڈیٹابیس: آن لائن",
    shaeffer_calc: "شیفر وزن کا حساب",
    steroid_warning: "حاملہ جانوروں میں سٹیرائڈز کا استعمال سختی سے منع ہے (اسقاط حمل کا خطرہ)۔",
    desi_nuskhe: "روایتی دیسی نسخے",
    milk_ledger: "دودھ اور چکنائی کا کھاتہ",
    bulls_directory: "اعلیٰ نسل کے سانڈوں کی فہرست",
    triage_critical: "انتہائی ہنگامی (فوری)",
    triage_urgent: "ضروری توجہ",
    triage_routine: "معمول کا معائنہ",
    species: "جانوروں کی قسم",
    save: "محفوظ کریں",
    cancel: "منسوخ کریں",
    lang_switched: "زبان اردو میں تبدیل کر دی گئی ہے۔"
  },

  // 14. SPANISH (Español)
  es: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Núcleo Informático Veterinario",
    nav_doctor: "Portal Veterinario",
    nav_farmer: "Panel Ganadero",
    nav_admin: "Bóveda Admin",
    nav_home: "Inicio",
    hero_title: "Red Digital Nacional Veterinaria y Ganadera",
    hero_desc: "Cálculo de peso por fórmula de Shaeffer, admisión rápida OPD y protección gestacional.",
    quick_intake: "Ingreso Rápido de Paciente (OPD)",
    enter_opd: "Iniciar Consola Clínica",
    access_farmer: "Abrir Panel Ganadero",
    unlock_vault: "Desbloquear Bóveda",
    opd_active: "OPD Activo:",
    steroid_guard: "GUARDIA ESTEROIDES: ACTIVA",
    db_online: "BASE DE DATOS: ONLINE",
    shaeffer_calc: "Cálculo de Peso Shaeffer",
    steroid_warning: "Corticosteroides estrictamente contraindicados en gestación (Riesgo de aborto).",
    desi_nuskhe: "Remedios Herbales Veterinarios",
    milk_ledger: "Libro de Registro de Leche y Grasa",
    bulls_directory: "Directorio de Toros de Alta Genética",
    triage_critical: "Emergencia Crítica (Inmediata)",
    triage_urgent: "Atención Urgente",
    triage_routine: "Consulta de Rutina",
    species: "Especie Animal",
    save: "Guardar",
    cancel: "Cancelar",
    lang_switched: "Idioma configurado a Español."
  },

  // 15. FRENCH (Français)
  fr: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Cœur Informatique Vétérinaire",
    nav_doctor: "Portail Vétérinaire",
    nav_farmer: "Espace Éleveur",
    nav_admin: "Voûte Admin",
    nav_home: "Accueil",
    hero_title: "Réseau Numérique Vétérinaire et Agricole National",
    hero_desc: "Calcul du poids selon la formule de Shaeffer, admissions rapides et sécurité gestationnelle.",
    quick_intake: "Admission Rapide (OPD)",
    enter_opd: "Ouvrir la Console OPD",
    access_farmer: "Accéder à l'Espace Éleveur",
    unlock_vault: "Déverrouiller la Voûte",
    opd_active: "OPD Actif:",
    steroid_guard: "GARDE STÉROÏDE: ACTIF",
    db_online: "BASE DE DONNÉES: EN LIGNE",
    shaeffer_calc: "Calculateur de Poids Shaeffer",
    steroid_warning: "Corticoïdes strictement contre-indiqués pendant la gestation.",
    desi_nuskhe: "Remèdes Phytothérapiques",
    milk_ledger: "Registre du Lait et Matières Grasses",
    bulls_directory: "Catalogue des Taureaux d'Élite",
    triage_critical: "Urgence Critique (Immédiate)",
    triage_urgent: "Attention Urgente",
    triage_routine: "Visite de Routine",
    species: "Espèce Animale",
    save: "Enregistrer",
    cancel: "Annuler",
    lang_switched: "Langue définie sur Français."
  },

  // 16. GERMAN (Deutsch)
  de: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Veterinärmedizinisches Informationssystem",
    nav_doctor: "Tierarzt-Portal",
    nav_farmer: "Landwirt-Hub",
    nav_admin: "Admin-Tresor",
    nav_home: "Startseite",
    hero_title: "Nationales Digitalnetzwerk für Veterinärmedizin und Landwirtschaft",
    hero_desc: "Präzise Gewichtsberechnung nach Shaeffer, Notfall-Triage und Trächtigkeitsschutz.",
    quick_intake: "Schnellaufnahme Patient (OPD)",
    enter_opd: "OPD-Konsole öffnen",
    access_farmer: "Landwirt-Portal öffnen",
    unlock_vault: "Tresor entsperren",
    opd_active: "Aktive OPD:",
    steroid_guard: "STEROIDSCHUTZ: AKTIV",
    db_online: "DATENBANK: ONLINE",
    shaeffer_calc: "Gewichtsberechnung (Shaeffer)",
    steroid_warning: "Kortikosteroide sind während der Trächtigkeit streng kontraindiziert.",
    desi_nuskhe: "Veterinärmedizinische Kräuterheilkunde",
    milk_ledger: "Milch- und Fett-Hauptbuch",
    bulls_directory: "Zuchtbullen-Verzeichnis",
    triage_critical: "Kritischer Notfall (Sofort)",
    triage_urgent: "Dringende Behandlung",
    triage_routine: "Routineuntersuchung",
    species: "Tierart",
    save: "Speichern",
    cancel: "Abbrechen",
    lang_switched: "Sprache auf Deutsch eingestellt."
  },

  // 17. ARABIC (العربية - RTL)
  ar: {
    app_title: "نظام فيتكير للذكاء الاصطناعي",
    app_subtitle: "النواة المعلوماتية البيطرية",
    nav_doctor: "بوابة الطبيب البيطري",
    nav_farmer: "مركز المزارع",
    nav_admin: "خزنة الإدارة",
    nav_home: "الصفحة الرئيسية",
    hero_title: "الشبكة الرقمية الوطنية للطب البيطري ومربي الماشية",
    hero_desc: "حساب الوزن بمعادلة شيفر، استقبال العيادات الخارجية وحواجز أمان الحمل.",
    quick_intake: "تسجيل مريض جديد (سريع)",
    enter_opd: "فتح وحدة العيادات الخارجية",
    access_farmer: "فتح مكتب المزارع",
    unlock_vault: "فتح الخزنة الإدارية",
    opd_active: "العيادات النشطة:",
    steroid_guard: "حماية الستيرويد: نشطة",
    db_online: "قاعدة البيانات: متصلة",
    shaeffer_calc: "حساب الوزن بمعادلة شيفر",
    steroid_warning: "يمنع استخدام الكورتيكوستيرويدات منعاً باتاً أثناء الحمل (خطر الإجهاض).",
    desi_nuskhe: "العلاجات العشبية التقليدية",
    milk_ledger: "سجل الحليب ونسبة الدهون",
    bulls_directory: "دليل سلالات الثيران الممتازة",
    triage_critical: "طوارئ حرجة (فوري)",
    triage_urgent: "عناية عاجلة",
    triage_routine: "فحص روتيني",
    species: "نوع الحيوان",
    save: "حفظ",
    cancel: "إلغاء",
    lang_switched: "تم تغيير اللغة إلى العربية."
  },

  // 18. RUSSIAN (Русский)
  ru: {
    app_title: "VETCARE AI OS",
    app_subtitle: "Ветеринарное информационное ядро",
    nav_doctor: "Врачебный портал",
    nav_farmer: "Фермерский хаб",
    nav_admin: "Сейф администратора",
    nav_home: "Главная",
    hero_title: "Национальная цифровая сеть ветеринарии и фермерства",
    hero_desc: "Расчет веса по формуле Шеффера, амбулаторный прием и защита беременности.",
    quick_intake: "Быстрая регистрация (OPD)",
    enter_opd: "Открыть консоль приема",
    access_farmer: "Открыть фермерский стол",
    unlock_vault: "Разблокировать сейф",
    opd_active: "Активный прием:",
    steroid_guard: "ЗАЩИТА ОТ СТЕРОИДОВ: АКТИВНА",
    db_online: "БАЗА ДАННЫХ: ОНЛАЙН",
    shaeffer_calc: "Расчет веса по Шефферу",
    steroid_warning: "Кортикостероиды строго противопоказаны при беременности (риск аборта).",
    desi_nuskhe: "Народная ветеринарная медицина",
    milk_ledger: "Журнал учета молока и жирности",
    bulls_directory: "Каталог элитных быков-производителей",
    triage_critical: "Критическая ситуация (Срочно)",
    triage_urgent: "Срочный осмотр",
    triage_routine: "Плановый осмотр",
    species: "Вид животного",
    save: "Сохранить",
    cancel: "Отмена",
    lang_switched: "Язык переключен на русский."
  }
};

// Current in-memory active language state
let activeLanguage = DEFAULT_LANG;

// -------------------------------------------------------------
// INTERPOLATION & STRING TRANSLATION (t)
// -------------------------------------------------------------
function translate(key, params = {}, fallbackText = "") {
  const langDict = TRANSLATIONS[activeLanguage] || TRANSLATIONS[DEFAULT_LANG];
  let text = langDict[key] || TRANSLATIONS.en[key] || fallbackText || key;

  // Variable interpolation: e.g. {name} or {{name}}
  if (params && typeof params === "object") {
    Object.keys(params).forEach(pKey => {
      const val = params[pKey];
      text = text.replace(new RegExp(`\\{\\{?\\s*${pKey}\\s*\\}\\}?`, "g"), val);
    });
  }

  return text;
}

// -------------------------------------------------------------
// DOM TREE LOCALIZER
// -------------------------------------------------------------
function updateDomTranslations() {
  // 1. Elements with data-i18n="key"
  const i18nElements = document.querySelectorAll("[data-i18n]");
  i18nElements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = translate(key);
    }
  });

  // 2. Compatibility with index.html .lang-target[data-key="key"]
  const legacyTargets = document.querySelectorAll(".lang-target[data-key]");
  legacyTargets.forEach(el => {
    const key = el.getAttribute("data-key");
    if (key) {
      el.textContent = translate(key);
    }
  });

  // 3. Elements with data-i18n-placeholder
  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderElements.forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.setAttribute("placeholder", translate(key));
    }
  });

  // 4. Update Hero Banner Elements if present
  const heroTitle = document.getElementById("heroBannerTitle");
  const heroDesc = document.getElementById("heroBannerDesc");
  if (heroTitle) heroTitle.textContent = translate("hero_title");
  if (heroDesc) heroDesc.textContent = translate("hero_desc");

  // 5. Update Quick Action Buttons text if keyed
  const btnHeroIntake = document.getElementById("btnQuickIntakeHero");
  if (btnHeroIntake) {
    const textSpan = btnHeroIntake.querySelector("span");
    if (textSpan) textSpan.textContent = translate("quick_intake");
  }
}

// -------------------------------------------------------------
// LANGUAGE SWITCHER & DIRECTIONALITY
// -------------------------------------------------------------
function setLanguage(langCode) {
  if (!SUPPORTED_LANGUAGES[langCode]) {
    console.warn(`[I18nEngine] Language code '${langCode}' not supported, defaulting to '${DEFAULT_LANG}'`);
    langCode = DEFAULT_LANG;
  }

  activeLanguage = langCode;

  // Update HTML attributes (lang and dir)
  const isRtl = RTL_LANGUAGES.has(langCode);
  document.documentElement.setAttribute("lang", langCode);
  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");

  // Persist in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, langCode);
  } catch (e) {
    console.warn("[I18nEngine] Could not persist language selection:", e);
  }

  // Synchronize DOM elements
  updateDomTranslations();

  // Synchronize Header Dropdown if rendered
  const langDropdown = document.getElementById("langSelector");
  if (langDropdown && langDropdown.value !== langCode) {
    langDropdown.value = langCode;
  }

  // Broadcast Event via VetcareApp.EventBus
  if (window.VetcareApp.EventBus && typeof window.VetcareApp.EventBus.emit === "function") {
    window.VetcareApp.EventBus.emit("language:changed", {
      language: langCode,
      metadata: SUPPORTED_LANGUAGES[langCode]
    });
  }

  // Audible / Toast feedback
  if (typeof window.VetcareApp.showToast === "function") {
    window.VetcareApp.showToast(translate("lang_switched"), "info");
  }

  return activeLanguage;
}

// -------------------------------------------------------------
// INITIALIZATION & LOCALE DETECTOR
// -------------------------------------------------------------
function init() {
  let preferred = null;

  // 1. Check local storage
  try {
    preferred = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  // 2. Check browser navigator language if no stored preference
  if (!preferred && navigator.language) {
    const browserPrefix = navigator.language.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGUAGES[browserPrefix]) {
      preferred = browserPrefix;
    }
  }

  // Default fallback
  if (!preferred || !SUPPORTED_LANGUAGES[preferred]) {
    preferred = DEFAULT_LANG;
  }

  setLanguage(preferred);

  // Listen for manual changes on header dropdown
  const langSelect = document.getElementById("langSelector");
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      setLanguage(this.value);
    });
  }
}

// Auto-Mount on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// -------------------------------------------------------------
// Public API Surface
// -------------------------------------------------------------
return {
  t: translate,
  translate: translate,
  setLanguage: setLanguage,
  getLanguage: function () {
    return activeLanguage;
  },
  getSupportedLanguages: function () {
    return Object.assign({}, SUPPORTED_LANGUAGES);
  },
  isRTL: function () {
    return RTL_LANGUAGES.has(activeLanguage);
  },
  updateDOM: updateDomTranslations
};

})();

// Expose to App namespace & create shorthand alias window.VetcareApp.I18nEngine
= I18nEngine; window.VetcareApp.t = I18nEngine.t;

})(window, document);
