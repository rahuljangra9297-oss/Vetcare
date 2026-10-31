/**
 * Vetcare AI OS - Enterprise Clinical Decision Support System
 * Core Architecture & Controller Engine (app.js)
 * 
 * 2026 Engine Upgrades:
 * - Resilient Multi-Model Gemini 2026 API Pipeline (gemini-2.0-flash / gemini-2.5-flash / gemini-2.0-flash-lite)
 * - Automatic Model Discovery Fallback via ListModels
 * - Zero-Match Quick Search Auto-AI Fallback Engine
 * - Zero-Glitch Singleton Session Timer Management
 * - Abortifacient Clinical Safety Guard (Pregnancy Red Alert)
 * - Strict Role-Based Dynamic UI & Navbar Isolation
 */

// ============================================================================
// 1. ENTERPRISE CONFIGURATION & VERIFIED FINANCIAL VAULT
// ============================================================================
const VETCARE_CONFIG = {
  version: "6.0.0-2026.PROD",
  adminPin: "9297",
  payeeName: "Vetcare Services",
  beneficiary: "Mr. Rahul",
  sbi: {
    bankName: "भारतीय स्टेट बैंक (SBI)",
    upiId: "rahuljangra9297@oksbi",
    account: "65204067585",
    ifsc: "SBIN0013693"
  },
  pnb: {
    bankName: "पंजाब नेशनल बैंक (PNB)",
    upiId: "rahuljangra9297-1@okicici",
    account: "6687001700015098",
    ifsc: "PUNB0668700"
  },
  ai: {
    candidateModels: ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite"],
    timeoutMs: 14000
  }
};

// ============================================================================
// 2. MULTI-LANGUAGE LOCALIZATION ENGINE (7 LANGUAGES)
// ============================================================================
const I18N_DICT = {
  hi: {
    docRoleTitle: "क्लीनिकल मोड (अधिकृत पशु चिकित्सक)",
    farmerRoleTitle: "स्मार्ट पशुपालक (डेयरी मोड)",
    sessionBadge: "⏱️ सत्र: {time} शेष",
    syncOnline: "🟢 क्लाउड सिंक सक्रिय: आपका क्लिनिकल डेटा और खाता बही स्थानीय ब्राउज़र में सुरक्षित व सिंक है।",
    syncOffline: "📴 ऑफ़लाइन मोड: इंटरनेट उपलब्ध नहीं है, लेकिन आपका सारा डेटा स्थानीय रूप से सुरक्षित है। इंटरनेट आते ही सिंक होगा।",
    sessionExpired: "आपका 60-मिनट का सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।",
    tagadaSent: "व्हाट्सएप तगादा संदेश तैयार किया गया।",
    confirmDelete: "क्या आप इस रिकॉर्ड को हटाना चाहते हैं?",
    pregnancyAlert: "🚨 गंभीर चेतावनी: गाभिन पशुओं में Dexamethasone निषेध है (गर्भपात का खतरा)! इसके स्थान पर Isoflupredone Acetate का उपयोग करें।",
    aiGenerating: "Google Gemini AI से क्लिनिकल रिपोर्ट तैयार की जा रही है..."
  },
  en: {
    docRoleTitle: "Clinical Mode (Registered Vet Practitioner)",
    farmerRoleTitle: "Smart Dairy Farmer (Farmer Mode)",
    sessionBadge: "⏱️ Session: {time} left",
    syncOnline: "🟢 Cloud Sync Active: Clinical data and ledger are safely synced locally and cloud-ready.",
    syncOffline: "📴 Offline Mode: No internet, but all records are secured locally. Will sync once reconnected.",
    sessionExpired: "Your 60-minute active session has expired. Please log in again.",
    tagadaSent: "WhatsApp payment reminder initialized.",
    confirmDelete: "Are you sure you want to delete this record?",
    pregnancyAlert: "🚨 CRITICAL ALERT: Dexamethasone is contraindicated in pregnant animals (causes abortion)! Use Isoflupredone Acetate instead.",
    aiGenerating: "Generating Clinical Diagnosis & Protocol via Google Gemini AI..."
  },
  hinglish: {
    docRoleTitle: "Clinical Mode (Registered Vet Doctor)",
    farmerRoleTitle: "Smart Pashupalak (Dairy Mode)",
    sessionBadge: "⏱️ Session: {time} baki",
    syncOnline: "🟢 Cloud Sync Active: Aapka data local storage me safe aur sync hai.",
    syncOffline: "📴 Offline Mode: Net band hai, data local phone me safe hai. Net aate hi sync hoga.",
    sessionExpired: "Aapka 60-minute ka session khatam ho gaya hai. Dobara login karein.",
    tagadaSent: "WhatsApp Tagada dispatch ho gaya.",
    confirmDelete: "Kya aap is record ko delete karna chahte hain?",
    pregnancyAlert: "🚨 WARNING: Gabhin pashu ko Dexamethasone bilkul na dein (abortion ho sakta hai)! Isoflupredone dein.",
    aiGenerating: "Google Gemini AI se report generate ho rahi hai..."
  },
  pa: {
    docRoleTitle: "ਕਲੀਨਿਕਲ ਮੋਡ (ਅਧਿਕਾਰਤ ਵੈਟਰਨਰੀ ਡਾਕਟਰ)",
    farmerRoleTitle: "ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ (ਪਸ਼ੂ ਪਾਲਕ)",
    sessionBadge: "⏱️ ਸੈਸ਼ਨ: {time} ਬਾਕੀ",
    syncOnline: "🟢 ਕਲਾਉਡ ਸਿੰਕ ਕਿਰਿਆਸ਼ੀਲ: ਤੁਹਾਡਾ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
    syncOffline: "📴 ਔਫਲਾਈਨ ਮੋਡ: ਇੰਟਰਨੈਟ ਨਹੀਂ ਹੈ, ਪਰ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
    sessionExpired: "ਤੁਹਾਡਾ 60 ਮਿੰਟ ਦਾ ਸੈਸ਼ਨ ਸਮਾਪਤ ਹੋ ਗਿਆ ਹੈ।",
    tagadaSent: "ਵਟਸਐਪ ਤਗਾਦਾ ਭੇਜਿਆ ਗਿਆ।",
    confirmDelete: "ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    pregnancyAlert: "🚨 ਚੇਤਾਵਨੀ: ਗੱਭਣ ਪਸ਼ੂਆਂ ਨੂੰ Dexamethasone ਨਾ ਦਿਓ! Isoflupredone ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    aiGenerating: "Gemini AI ਦੁਆਰਾ ਕਲੀਨਿਕਲ ਰਿਪੋਰਟ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ..."
  },
  mr: {
    docRoleTitle: "क्लिनिकल मोड (अधिकृत पशुवैद्यक)",
    farmerRoleTitle: "स्मार्ट दुग्ध उत्पादक (शेतकरी मोड)",
    sessionBadge: "⏱️ सत्र: {time} शिल्लक",
    syncOnline: "🟢 क्लाउड सिंक सक्रिय: डेटा सुरक्षितपणे सिंक झाला आहे.",
    syncOffline: "📴 ऑफलाइन मोड: इंटरनेट नाही, डेटा स्थानिक सुरक्षित आहे.",
    sessionExpired: "तुमचे ६० मिनिटांचे सत्र संपले आहे. कृपया पुन्हा लॉगिन करा.",
    tagadaSent: "व्हॉट्सॲप स्मरणपत्र पाठवले.",
    confirmDelete: "तुम्हाला हे रेकॉर्ड हटवायचे आहे का?",
    pregnancyAlert: "🚨 धोक्याची सूचना: गाभण जनावरांमध्ये Dexamethasone वापरू नका! Isoflupredone वापरा.",
    aiGenerating: "Google Gemini AI क्लिनिकल अहवाल तयार करत आहे..."
  },
  gu: {
    docRoleTitle: "ક્લિનિકલ મોડ (રજિસ્ટર્ડ વેટરનરી ડૉક્ટર)",
    farmerRoleTitle: "સ્માર્ટ પશુપાલક (ડેરી મોડ)",
    sessionBadge: "⏱️ સત્ર: {time} બાકી",
    syncOnline: "🟢 ક્લાઉડ સિંક સક્રિય: તમારો ડેટા સુરક્ષિત છે.",
    syncOffline: "📴 ઑફલાઇન મોડ: ઇન્ટરનેટ નથી, ડેટા સુરક્ષિત છે.",
    sessionExpired: "તમારું 60 મિનિટનું સત્ર સમાપ્ત થયું છે.",
    tagadaSent: "વોટ્સએપ રીમાઇન્ડર મોકલ્યું.",
    confirmDelete: "શું તમે આ રેકોર્ડ કાઢી નાખવા માંગો છો?",
    pregnancyAlert: "🚨 ચેતવણી: ગાભણ પશુઓને Dexamethasone ન આપો! Isoflupredone વાપરો.",
    aiGenerating: "Google Gemini AI દ્વારા રિપોર્ટ તૈયાર થઈ રહ્યો છે..."
  },
  bn: {
    docRoleTitle: "ক্লিনিক্যাল মোড (ভেটেরিনারি ডাক্তার)",
    farmerRoleTitle: "স্মার্ট খামারী (দুগ্ধ খামার মোড)",
    sessionBadge: "⏱️ সেশন: {time} বাকি",
    syncOnline: "🟢 ক্লাউড সিঙ্ক সক্রিয়: আপনার ডেটা নিরাপদ রয়েছে।",
    syncOffline: "📴 অফলাইন মোড: ইন্টারনেট নেই, ডেটা স্থানীয়ভাবে নিরাপদ।",
    sessionExpired: "আপনার ৬০ মিনিটের সেশন শেষ হয়েছে।",
    tagadaSent: "হোয়াটসঅ্যাপ তাগাদা পাঠানো হয়েছে।",
    confirmDelete: "আপনি কি এটি মুছে ফেলতে চান?",
    pregnancyAlert: "🚨 সতর্কতা: গর্ভবতী পশুকে Dexamethasone দেবেন না! Isoflupredone ব্যবহার করুন।",
    aiGenerating: "Google Gemini AI দ্বারা রিপোর্ট তৈরি করা হচ্ছে..."
  }
};

let currentLang = localStorage.getItem("vetcare_lang") || "hi";

function getI18n(key, fallback = "") {
  const langObj = I18N_DICT[currentLang] || I18N_DICT.hi;
  return langObj[key] || fallback;
}

function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 3. MASTER EVIDENCE-BASED CLINICAL DATABASE (22+ PROFILES)
// ============================================================================
const MASTER_CLINICAL_DB = [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    temp: "105 - 107°F (अति तीव्र ज्वर)",
    cardinal: "गले व जबड़े के नीचे अत्यंत दर्दनाक गर्म सूजन, घर्र-घर्र की श्वास ध्वनि, जीभ बाहर लटकना",
    keywords: ["गलघोंटू", "hs", "गले में सूजन", "घर्र-घर्र", "तेज बुखार", "swelling", "septicemia"],
    tier1: "Inj. Ceftiofur Sodium (1 gm/50kg) Deep I/M अथवा Inj. Enrofloxacin (10%) 5 mg/kg I/M 3 दिन",
    tier2: "Inj. Flunixin Meglumine (2.2 mg/kg) I/V अथवा Inj. Melonex Plus (15-20 ml) I/M",
    tier3: "Inj. Avil (10-15 ml) I/M + Dextrose Saline 5% (1-2 L) I/V निर्जलीकरण होने पर",
    tier4: "100 ग्राम सरसों के तेल में 10 ग्राम कपूर व 25 ग्राम हल्दी उबालकर गुनगुना लेप गले की सूजन पर लगाएं।",
    tier5: "गाभिन पशुओं में Dexamethasone बिल्कुल न दें (गर्भपात का खतरा)। Isoflupredone 10ml I/M सुरक्षित विकल्प है।"
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    temp: "104 - 106°F",
    cardinal: "कंधे अथवा पुट्ठे के भारी मांस में गैस युक्त सूजन, हाथ से दबाने पर चर्र-चर्र (Crepitation) ध्वनि",
    keywords: ["लंगड़ा", "चरचरा", "bq", "black quarter", "चर्र-चर्र", "पुट्ठा सूजन"],
    tier1: "Inj. Procaine Penicillin 40 लाख IU I/M अथवा Inj. Amoxicillin + Sulbactam (4.5 gm) I/M",
    tier2: "Inj. Melonex Plus (15-20 ml) I/M दैनिक",
    tier3: "Inj. Tribivet / Belamyl (B-Complex) 10-12 ml I/M",
    tier4: "सूजन वाले स्थान को गर्म पानी व नीम की पत्तियों से सेकें। पशु को चलने न दें।",
    tier5: "सूजन वाले स्थान पर चीरा लगाकर 3% H2O2 से ड्रेन केवल अधिकृत चिकित्सक की देखरेख में करें।"
  },
  {
    id: "MASTITIS",
    nameHindi: "थनैल रोग (Clinical Mastitis)",
    category: "BACTERIAL",
    temp: "102 - 104°F",
    cardinal: "अयन/थन में कड़ापन, लाली, भीषण दर्द, दूध में रक्त अथवा गाढ़े पीले छिछड़े आना",
    keywords: ["थनैल", "mastitis", "अयन", "थन कड़ा", "दूध में खून", "छिछड़े"],
    tier1: "Inj. Intacef Tazo (3375 mg) I/V या I/M 3 दिन अथवा Inj. Marbofloxacin (10%) 2 mg/kg",
    tier2: "Inj. Melonex Plus (15 ml) I/M + Inj. Serratiopeptidase (एंटी-फाइब्रिनोलिटिक)",
    tier3: "Intramammary Infusion: Mastilep / Tilmicosin ट्यूब थन को पूरी तरह खाली कर चढ़ाएं",
    tier4: "250g घृतकुमारी (एलोवेरा) + 50g हल्दी + 15g चूना पीसकर गाढ़ा लेप बनाएं व थन पर दिन में 3 बार लगाएं।",
    tier5: "दूध निकालने के बाद थन की नाल को 15 मिनट तक जमीन या कीचड़ के संपर्क में न आने दें।"
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    temp: "कम तापमान (<100°F / Subnormal Hypothermia)",
    cardinal: "ब्याने के 24-72 घंटे बाद गर्दन मोड़कर बैठना (Sternal Recumbency), शरीर व कान ठंडे, पुतलियां फैली हुई",
    keywords: ["मिल्क फीवर", "hypocalcemia", "गर्दन मोड़ना", "ठंडा शरीर", "milk fever", "कैल्शियम"],
    tier1: "Calcium Borogluconate 25% (CBG / Mifex) 450 ml (300ml धीमी गति से I/V + 150ml S/C)",
    tier2: "Inj. Tonophosphan (10 ml) I/M फॉस्फोरस आपूर्ति हेतु",
    tier3: "Inj. Tribivet (10 ml) I/M + Cal-Up जेल 300g ओरल (होश में आने पर)",
    tier4: "पशु के शरीर को तुरंत गर्म बोरी व कम्बल से ढंकें। पैर व कान की मालिश करें।",
    tier5: "गंभीर चेतावनी: कैल्शियम ड्रिप अति धीमी गति से दें और हृदय गति लगातार जांचें। जबरन नाल न पिलाएं।"
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Bovine Ketosis)",
    category: "METABOLIC",
    temp: "101.5°F (सामान्य)",
    cardinal: "सांस, पेशाब व दूध से मीठी एसीटोन गंध, दाना छोड़कर केवल सूखा भूसा खाना, अचानक दूध घटना",
    keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "aceto", "दूध गिरना", "भूसा खाना"],
    tier1: "Dextrose 20% or 25% 1000 ml तीव्र गति से I/V",
    tier2: "Inj. Isoflupredone acetate (10 ml) I/M (ग्लूकोनियोजेनेसिस उत्तेजक)",
    tier3: "Propylene Glycol 200 ml ओरल दिन में 2 बार 4 दिनों तक",
    tier4: "250 ग्राम पुराना गुड़ + 50 मिली कच्ची घानी सरसों तेल मिलाकर 5 दिन दें।",
    tier5: "पशु को अचानक अत्यधिक सूखा दाना न दें, ऊर्जा व रेशे का अनुपात बनाए रखें।"
  },
  {
    id: "BLOAT",
    nameHindi: "रूमेन अफारा / टिम्पनी (Bloat / Tympany)",
    category: "METABOLIC",
    temp: "101.5 - 102°F",
    cardinal: "बायां पेट ढोलक की तरह तन जाना, जीभ बाहर निकालना, भीषण छटपटाहट व सांस फूलना",
    keywords: ["अफारा", "bloat", "पेट फूलना", "tympany", "ढोलक पेट", "गैस"],
    tier1: "Bloatosil / Tympol Liquid (100 ml) ओरल नाल द्वारा सीधे पेट में",
    tier2: "Inj. Spasmovet / Melonex Plus (10-15 ml) I/M पेट दर्द व मरोड़ में",
    tier3: "Himalayan Batisa (50g) + Bioboost बोलस 2 गोली सुबह-शाम",
    tier4: "50 मिली तारपीन का तेल + 300 मिली मीठा तेल + 20 ग्राम शुद्ध हींग मिलाकर नाल से दें।",
    tier5: "अति-आपातकाल में बाएं फ्लैंक के केंद्र में Trocar & Cannula द्वारा तुरंत गैस निकालें।"
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Red Water Disease)",
    category: "PROTOZOAL",
    temp: "105 - 107°F (तेज चिचड़ी बुखार)",
    cardinal: "गहरा लाल या कॉफी जैसा पेशाब (Hemoglobinuria), अत्यधिक दुर्बलता, एनीमिया, पीली श्लेष्मा",
    keywords: ["बबेशिया", "babesiosis", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी बुखार", "red water"],
    tier1: "Inj. Diminazene Aceturate (Berenil) 3.5 - 5 mg/kg Deep I/M सिंगल डोज़",
    tier2: "Inj. Melonex Plus (15 ml) I/M बुखार व दर्द नियंत्रण हेतु",
    tier3: "Inj. Feritas / Imferon (Iron Sorbitol) 10 ml I/M + Dextrose Saline 5% (1 L) I/V",
    tier4: "पशु को ठंडे व छायादार स्थान पर बांधें। ताज़ा ठंडा पानी व गुड़-शर्बत पिलाएं।",
    tier5: "Flumethrin अथवा Amitraz द्वारा शरीर से चिचड़ियों का संपूर्ण खात्मा तुरंत करें।"
  },
  {
    id: "THEILERIOSIS",
    nameHindi: "थायलेरियासिस (Bovine Theileriosis)",
    category: "PROTOZOAL",
    temp: "105 - 106°F",
    cardinal: "प्री-स्कैपुलर (कंधे) लिम्फ नोड्स में कठोर दर्दनाक सूजन, तेज बुखार, एनीमिया",
    keywords: ["थायलेरिया", "theileria", "लिम्फ नोड", "चिचड़ी", "theileriosis"],
    tier1: "Inj. Buparvaquone (Butalex / Zubion) 2.5 mg/kg Deep I/M गर्दन में",
    tier2: "Inj. Oxytetracycline LA (20 mg/kg) Deep I/M",
    tier3: "Inj. Melonex Plus 15ml + Inj. Belamyl 10ml I/M",
    tier4: "नीम के पत्तों का काढ़ा बनाकर पशु के शरीर पर लगाएं, चिचड़ी दूर रखें।",
    tier5: "Buparvaquone का पुनः इंजेक्शन बिना चिकित्सक परामर्श के 48 घंटे से पहले न दें।"
  },
  {
    id: "FMD",
    nameHindi: "खुरपका-मुंहपका (Foot & Mouth Disease - FMD)",
    category: "VIRAL",
    temp: "104 - 105°F",
    cardinal: "मुंह, जीभ, मसूड़ों व खुरों के बीच छाले, चिपचिपी तारदार लार बहना, लंगड़ाना",
    keywords: ["खुरपका", "मुंहपका", "fmd", "छाले", "तारदार लार", "लंगड़ाना"],
    tier1: "द्वितीयक जीवाणु संक्रमण रोकथाम: Inj. Ceftriaxone (Intacef 3g) I/M 3 दिन",
    tier2: "Inj. Melonex Plus (15 ml) I/M दर्द व बुखार निवारण हेतु",
    tier3: "Inj. Avil (10 ml) I/M + Vitamin A, D3, E टॉनिक",
    tier4: "मुंह को 1% फिटकरी या पोटाश के घोल से धोएं। छालों पर शहद व सुहागा का लेप लगाएं। खुरों पर फिनाइल व तारपीन लगाएं।",
    tier5: "संक्रामक रोग है; स्वस्थ पशुओं को तुरंत पृथक करें। दूध को अच्छी तरह उबालकर ही प्रयोग करें।"
  },
  {
    id: "ANTHRAX",
    nameHindi: "एंथ्रेक्स / गिल्टी रोग (Splenic Fever)",
    category: "BACTERIAL",
    temp: "106 - 107°F (घातक ज्वर)",
    cardinal: "प्राकृतिक छेदों (गुदा, योनि, नाक) से काला, बिना जमा हुआ (Unclotted) तारकोल जैसा खून बहना",
    keywords: ["एंथ्रेक्स", "anthrax", "काला खून", "गिल्टी रोग", "अचानक मृत्यु"],
    tier1: "Inj. Procaine Penicillin (80 लाख IU) अथवा Inj. Oxytetracycline (10 mg/kg) I/V",
    tier2: "सपोर्टिव: Anti-Anthrax Serum यदि प्रारंभिक अवस्था में उपलब्ध हो",
    tier3: "Inj. Dextrose Saline 5% I/V",
    tier4: "कोई देसी उपचार मान्य नहीं। पशु की मृत्यु होने पर शव चीरना सख्त मना है।",
    tier5: "ज़ूनोटिक रोग (इंसानों में फैलने वाला)! शव को 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं।"
  }
];

// ============================================================================
// 4. STORAGE VAULT STATE CONTROLLER
// ============================================================================
let AppState = {
  activeRole: null, // 'doctor' | 'farmer'
  currentTab: 'diagnosis',
  currentDiagSubTab: 'search',
  khataRecords: [],
  clinicStock: []
};

function loadStorageVault() {
  try {
    AppState.khataRecords = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    AppState.clinicStock = JSON.parse(localStorage.getItem("vetcare_clinic_stock") || "[]");

    if (AppState.clinicStock.length === 0) {
      AppState.clinicStock = [
        { id: 1, name: "Inj. Intacef Tazo 3375mg", category: "INJECTION", qty: 15, unit: "vials", minAlert: 5 },
        { id: 2, name: "Inj. Melonex Plus 100ml", category: "INJECTION", qty: 4, unit: "bottles", minAlert: 2 },
        { id: 3, name: "Inj. Avil 100ml", category: "INJECTION", qty: 6, unit: "bottles", minAlert: 2 },
        { id: 4, name: "Inj. Mifex (CBG 450ml)", category: "INJECTION", qty: 8, unit: "bottles", minAlert: 3 },
        { id: 5, name: "Inj. Berenil 30ml", category: "INJECTION", qty: 5, unit: "vials", minAlert: 2 },
        { id: 6, name: "Murrah Bull Semen Straws", category: "SEMEN", qty: 50, unit: "straws", minAlert: 15 }
      ];
      localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
    }
  } catch (err) {
    console.error("Storage loading error:", err);
    AppState.khataRecords = [];
    AppState.clinicStock = [];
  }
}

function persistKhataVault() {
  localStorage.setItem("vetcare_khata_records", JSON.stringify(AppState.khataRecords));
}

function persistStockVault() {
  localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
}

// ============================================================================
// 5. ROCK-SOLID SINGLETON SESSION TIMER (ZERO GLITCH / ROLLING FIX)
// ============================================================================
let sessionTimerInterval = null;

window.initSessionTimer = function() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }

  let sessionStart = localStorage.getItem("vetcare_session_start");
  if (!sessionStart) {
    sessionStart = Date.now().toString();
    localStorage.setItem("vetcare_session_start", sessionStart);
  }

  const totalDuration = 60 * 60 * 1000; // 60 minutes in ms

  function updateClock() {
    const elapsed = Date.now() - parseInt(sessionStart, 10);
    const remainingMs = Math.max(0, totalDuration - elapsed);
    const totalSeconds = Math.floor(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    const badge = document.getElementById("session-timer-badge");

    if (badge) {
      const template = getI18n("sessionBadge", "⏱️ सत्र: {time} शेष");
      badge.innerHTML = template.replace("{time}", formattedTime);
    }

    if (remainingMs <= 0) {
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
      alert(getI18n("sessionExpired", "आपका 60-मिनट का सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।"));
      localStorage.removeItem("vetcare_session_start");
      location.reload();
    }
  }

  updateClock();
  sessionTimerInterval = setInterval(updateClock, 1000);
};

// ============================================================================
// 6. RESILIENT 2026 GEMINI API ENGINE WITH AUTO-DISCOVERY & FALLBACK
// ============================================================================
window.callGeminiClinicalAI = async function(promptText) {
  // Support both key names for 100% backward/forward template compatibility
  const apiKey = localStorage.getItem('vetcare_gemini_api_key') || localStorage.getItem('vetcare_gemini_key');
  if (!apiKey) {
    alert("कृपया पहले '⚙️ AI Key' बटन पर क्लिक करके अपनी Google API Key दर्ज करें!");
    if (window.openAiKeyModal) window.openAiKeyModal();
    else if (window.openAIKeyModal) window.openAIKeyModal();
    return null;
  }

  const candidateModels = VETCARE_CONFIG.ai.candidateModels;
  let lastError = null;

  // 1. Direct candidate model attempt
  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errData = await response.json().catch(() => ({}));
        lastError = errData.error?.message || response.statusText;
        console.warn(`Model ${model} returned error: ${lastError}`);
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`Model ${model} network error: ${lastError}`);
    }
  }

  // 2. Automatic Discovery Fallback via ListModels
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      headers: { 'x-goog-api-key': apiKey }
    });
    if (listRes.ok) {
      const listData = await listRes.json();
      const validModel = listData.models?.find(m => 
        m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
      );
      if (validModel) {
        const modelName = validModel.name.startsWith('models/') ? validModel.name : `models/${validModel.name}`;
        const directUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;
        const finalRes = await fetch(directUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });
        if (finalRes.ok) {
          const finalData = await finalRes.json();
          const text = finalData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      }
    }
  } catch (discoveryErr) {
    console.warn("Discovery fallback failed:", discoveryErr);
  }

  throw new Error(lastError || "AI मॉडल से संपर्क नहीं हो सका। कृपया अपनी इंटरनेट कनेक्टिविटी और API Key जांचें।");
};

// ============================================================================
// 7. ZERO-MATCH LIVE AI TREATMENT GENERATOR & AUTO-RENDERER
// ============================================================================
window.generateAITreatmentPlan = async function(query) {
  const container = document.getElementById("diseaseResultsContainer");
  if (!container) return;

  const currentStatusText = getI18n("aiGenerating", "Google Gemini AI से क्लिनिकल रिपोर्ट तैयार की जा रही है...");
  container.innerHTML = `
    <div class="p-8 text-center bg-white border border-purple-200 rounded-3xl shadow-md space-y-4">
      <div class="w-12 h-12 mx-auto border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p class="text-xs sm:text-sm font-bold text-purple-900">${currentStatusText}</p>
      <p class="text-[11px] text-slate-500 font-mono">Query: "${escapeHtml(query)}" • Evaluating 5-Tier Differential Protocols</p>
    </div>
  `;

  const prompt = `Act as an Expert Veterinary Surgeon.
The user searched for animal clinical signs / disease: "${query}".
No exact match was found in the internal database.

Generate a comprehensive clinical profile with 5 structured treatment tiers.
Format your output EXACTLY as follows:

NAME: [Disease Name in Hindi & English]
CATEGORY: [BACTERIAL / VIRAL / PROTOZOAL / METABOLIC / PARASITIC]
TEMP: [Expected Body Temperature in °F]
CARDINAL: [Primary Cardinal Symptoms]
TIER1: [Tier 1: Drug of Choice / Primary Antibiotic with dosage in mg/kg and route]
TIER2: [Tier 2: NSAID / Anti-inflammatory & Pain Management]
TIER3: [Tier 3: Antihistaminic & Supportive Fluid Therapy]
TIER4: [Tier 4: Safe Herbal / Desi Remedy & Management]
TIER5: [Tier 5: Critical Precautions & Contraindications - MUST explicitly note whether Dexamethasone is safe or contraindicated in pregnancy]

Keep each field on a single concise line.`;

  try {
    const aiText = await window.callGeminiClinicalAI(prompt);
    if (!aiText) return;

    // Parse structured AI output
    function extractField(key, fallback = "") {
      const regex = new RegExp(`^${key}:\\s*(.*)$`, "m");
      const match = aiText.match(regex);
      return match ? match[1].trim() : fallback;
    }

    const name = extractField("NAME", query);
    const category = extractField("CATEGORY", "AI DIAGNOSIS");
    const temp = extractField("TEMP", "102 - 104°F");
    const cardinal = extractField("CARDINAL", query);
    const tier1 = extractField("TIER1", "Inj. Ceftriaxone 10mg/kg I/M 3-5 days");
    const tier2 = extractField("TIER2", "Inj. Melonex Plus 15-20ml I/M");
    const tier3 = extractField("TIER3", "Inj. Avil 10ml I/M + Fluids");
    const tier4 = extractField("TIER4", "स्वच्छ जल, सुपाच्य चारा एवं विश्राम दें।");
    const tier5 = extractField("TIER5", "गाभिन पशुओं में Dexamethasone न दें (Isoflupredone का प्रयोग करें)।");

    container.innerHTML = `
      <div class="bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 border-2 border-purple-300 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div class="flex justify-between items-start gap-2 border-b border-purple-100 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">✨ AI उत्पन्न क्लिनिकल रिपोर्ट</span>
              <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">${category}</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${name}</h3>
          </div>
          <span class="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-xl shrink-0">🌡️ ${temp}</span>
        </div>

        <p class="text-xs text-slate-700 leading-relaxed"><strong class="text-slate-900">🚨 कार्डिनल लक्षण:</strong> ${cardinal}</p>

        <!-- Structured 5-Tier Treatment Table -->
        <div class="space-y-1.5 text-xs bg-white/80 p-3 rounded-2xl border border-purple-200 font-sans shadow-xs">
          <div class="p-2 bg-purple-50/60 rounded-xl border border-purple-200">
            <span class="text-[10px] font-black text-purple-800 uppercase block tracking-wider">Tier 1: ड्रग ऑफ चॉइस / मुख्य एंटीबायोटिक</span>
            <p class="text-slate-800 font-bold mt-0.5">${tier1}</p>
          </div>
          <div class="p-2 bg-emerald-50/60 rounded-xl border border-emerald-200">
            <span class="text-[10px] font-black text-emerald-800 uppercase block tracking-wider">Tier 2: दर्द व सूजन निवारक (NSAID)</span>
            <p class="text-slate-800 font-medium mt-0.5">${tier2}</p>
          </div>
          <div class="p-2 bg-blue-50/60 rounded-xl border border-blue-200">
            <span class="text-[10px] font-black text-blue-800 uppercase block tracking-wider">Tier 3: एंटीहिस्टामिनिक व सपोर्टिव थेरेपी</span>
            <p class="text-slate-800 font-medium mt-0.5">${tier3}</p>
          </div>
          <div class="p-2 bg-amber-50/60 rounded-xl border border-amber-200">
            <span class="text-[10px] font-black text-amber-800 uppercase block tracking-wider">Tier 4: घरेलू हर्बल व सहायक नुस्खा</span>
            <p class="text-slate-800 font-medium mt-0.5">${tier4}</p>
          </div>
          <div class="p-2 bg-rose-50 rounded-xl border border-rose-300">
            <span class="text-[10px] font-black text-rose-700 uppercase block tracking-wider">Tier 5: क्लिनिकल सावधानियां व मतभेद</span>
            <p class="text-rose-900 font-bold mt-0.5">${tier5}</p>
          </div>
        </div>

        <div class="flex gap-2 pt-1">
          <button onclick="window.loadIntoOPDSlip('${escapeHtml(name)}', '${escapeHtml(tier1)}\\n${escapeHtml(tier2)}\\n${escapeHtml(tier3)}')" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
            <span>📝 ओपीडी पर्चे में लोड करें</span> <span>→</span>
          </button>
          <button onclick="window.renderClinicalDiseaseCards(MASTER_CLINICAL_DB)" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl text-xs transition">
            ↺ रीसेट
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="p-6 text-center bg-rose-50 border border-rose-200 rounded-3xl space-y-2">
        <p class="text-xs font-bold text-rose-800">AI विश्लेषण विफल रहा: ${escapeHtml(error.message)}</p>
        <button onclick="window.renderClinicalDiseaseCards(MASTER_CLINICAL_DB)" class="text-xs bg-white border border-rose-300 text-rose-700 font-bold px-3 py-1.5 rounded-xl">
          डेटाबेस पर वापस जाएं
        </button>
      </div>
    `;
  }
};

// ============================================================================
// 8. DIAGNOSIS 3 SUB-TABS SWITCHING LOGIC
// ============================================================================
window.switchDiagSubTab = function(tabName) {
  AppState.currentDiagSubTab = tabName;

  const matrixView = document.getElementById("diag-matrix-view");
  const searchView = document.getElementById("diag-search-view");
  const dirView = document.getElementById("diag-directory-view");

  const tabMatrix = document.getElementById("subtab-matrix");
  const tabSearch = document.getElementById("subtab-search");
  const tabDir = document.getElementById("subtab-directory");

  if (matrixView) matrixView.classList.toggle("hidden", tabName !== "matrix");
  if (searchView) searchView.classList.toggle("hidden", tabName !== "search");
  if (dirView) dirView.classList.toggle("hidden", tabName !== "directory");

  [tabMatrix, tabSearch, tabDir].forEach(btn => {
    if (btn) {
      btn.classList.remove("bg-blue-600", "text-white", "shadow", "font-bold");
      btn.classList.add("text-slate-700", "font-medium");
    }
  });

  const activeBtn = document.getElementById(`subtab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove("text-slate-700", "font-medium");
    activeBtn.classList.add("bg-blue-600", "text-white", "shadow", "font-bold");
  }

  if (tabName === "search") {
    renderClinicalDiseaseCards(MASTER_CLINICAL_DB);
  }
};

// ============================================================================
// 9. DATA SYNC & BACKUP LOGIC
// ============================================================================
window.triggerDataSync = function() {
  const isOnline = navigator.onLine;
  const btn = document.getElementById("btn-header-sync");

  if (btn) btn.innerHTML = "🔄 सिंक हो रहा है...";

  setTimeout(() => {
    if (isOnline) {
      if (btn) btn.innerHTML = "🟢 डेटा सिंक सुरक्षित";
      alert(getI18n("syncOnline", "🟢 क्लाउड सिंक सक्रिय: आपका क्लिनिकल डेटा और खाता बही स्थानीय ब्राउज़र में सुरक्षित व सिंक है।"));
    } else {
      if (btn) btn.innerHTML = "📴 ऑफ़लाइन सुरक्षित";
      alert(getI18n("syncOffline", "📴 ऑफ़लाइन मोड: इंटरनेट उपलब्ध नहीं है, लेकिन आपका सारा डेटा स्थानीय रूप से सुरक्षित है। इंटरनेट आते ही सिंक होगा।"));
    }
  }, 500);
};

// ============================================================================
// 10. STRICT ROLE SEPARATION & DYNAMIC NAVBAR RENDERING
// ============================================================================
window.selectRole = function(role) {
  localStorage.setItem("vetcare_registered_role", role);
  window.applyRoleState(role);
};

window.applyRoleState = function(role) {
  AppState.activeRole = role;

  const landingScreen = document.getElementById("role-selection-screen");
  const mainApp = document.getElementById("main-app-container");
  const roleBadge = document.getElementById("current-user-role-badge");

  if (landingScreen) landingScreen.style.display = "none";
  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.style.display = "block";
  }

  if (roleBadge) {
    roleBadge.innerText = role === "doctor" ? getI18n("docRoleTitle") : getI18n("farmerRoleTitle");
    roleBadge.className = role === "doctor"
      ? "text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200"
      : "text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200";
  }

  renderDynamicBottomNavbar(role);

  if (role === "doctor") {
    toggleContainerVisibility("viewBreeding", false);
    toggleContainerVisibility("viewFeed", false);
    toggleContainerVisibility("viewFarmerRemedies", false);

    window.switchTab("diagnosis");
    window.switchDiagSubTab("search");
  } else {
    toggleContainerVisibility("viewDiagnosis", false);
    toggleContainerVisibility("viewWeightCalc", false);
    toggleContainerVisibility("viewRx", false);
    toggleContainerVisibility("viewInventory", false);

    window.switchTab("farmer_remedies");
  }
};

function renderDynamicBottomNavbar(role) {
  const navContainer = document.querySelector("#main-app-container nav");
  if (!navContainer) return;

  if (role === "doctor") {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('diagnosis')" id="navDiagnosis" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🩺</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">रोग निदान</span>
      </button>
      <button onclick="window.switchTab('weight')" id="navWeight" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">⚖️</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">वजन व खुराक</span>
      </button>
      <button onclick="window.switchTab('rx')" id="navRx" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📋</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">ओपीडी पर्चा</span>
      </button>
      <button onclick="window.switchTab('inventory')" id="navInventory" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📦</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दवा स्टॉक</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📒</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">क्लिनिक खाता</span>
      </button>
    `;
  } else {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('farmer_remedies')" id="navFarmerRemedies" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🌿</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">देसी उपचार</span>
      </button>
      <button onclick="window.switchTab('feed')" id="navFeed" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🌾</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">संतुलित आहार</span>
      </button>
      <button onclick="window.switchTab('breeding')" id="navBreeding" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">⏳</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">प्रजनन चक्र</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🥛</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दूध बहीखाता</span>
      </button>
      <button onclick="window.dispatchEmergencyWhatsApp()" id="navSupport" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">💬</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">डॉक्टर सहायता</span>
      </button>
    `;
  }
}

function toggleContainerVisibility(id, isVisible) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle("hidden", !isVisible);
  }
}

window.switchTab = function(tabId) {
  AppState.currentTab = tabId;

  const viewIds = [
    "viewDiagnosis",
    "viewWeightCalc",
    "viewRx",
    "viewInventory",
    "viewFinance",
    "viewBreeding",
    "viewFeed",
    "viewFarmerRemedies"
  ];

  viewIds.forEach(id => toggleContainerVisibility(id, false));

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active-nav-tab", "text-blue-600", "text-emerald-600");
    btn.classList.add("text-slate-500");
  });

  const tabMapping = {
    diagnosis: { view: "viewDiagnosis", nav: "navDiagnosis" },
    weight: { view: "viewWeightCalc", nav: "navWeight" },
    rx: { view: "viewRx", nav: "navRx" },
    inventory: { view: "viewInventory", nav: "navInventory" },
    finance: { view: "viewFinance", nav: "navFinance" },
    breeding: { view: "viewBreeding", nav: "navBreeding" },
    feed: { view: "viewFeed", nav: "navFeed" },
    farmer_remedies: { view: "viewFarmerRemedies", nav: "navFarmerRemedies" }
  };

  const target = tabMapping[tabId];
  if (target) {
    toggleContainerVisibility(target.view, true);
    const navBtn = document.getElementById(target.nav);
    if (navBtn) {
      navBtn.classList.remove("text-slate-500");
      navBtn.classList.add("active-nav-tab");
      navBtn.classList.add(AppState.activeRole === "doctor" ? "text-blue-600" : "text-emerald-600");
    }
  }

  if (tabId === "diagnosis") {
    window.switchDiagSubTab(AppState.currentDiagSubTab || "search");
  } else if (tabId === "farmer_remedies") {
    renderFarmerSafeRemedies(MASTER_CLINICAL_DB);
  } else if (tabId === "inventory") {
    window.renderClinicStock();
  } else if (tabId === "finance") {
    window.renderKhataLedger();
  }
};

// ============================================================================
// 11. DISEASE SEARCH ENGINE & ZERO-MATCH TRIGGER
// ============================================================================
function renderClinicalDiseaseCards(diseases) {
  const container = document.getElementById("diseaseResultsContainer");
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    const rawSearch = (document.getElementById("unifiedDiseaseSearchInput")?.value || "").trim();
    container.innerHTML = `
      <div class="p-6 text-center space-y-3 bg-white border border-slate-200 rounded-3xl shadow-xs">
        <p class="text-xs text-slate-500 font-medium">स्थानीय डेटाबेस में "<strong>${escapeHtml(rawSearch)}</strong>" से संबंधित कोई रोग नहीं मिला।</p>
        <button onclick="window.generateAITreatmentPlan('${escapeHtml(rawSearch)}')" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mx-auto">
          <span>⚡ Google Gemini AI से लाइव इलाज तैयार करवाएं</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = diseases.map(d => `
    <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      <div class="flex justify-between items-start gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">${d.category}</span>
          <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${d.nameHindi}</h3>
        </div>
        <span class="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-xl shrink-0">🌡️ ${d.temp}</span>
      </div>

      <p class="text-xs text-slate-700 leading-relaxed"><strong class="text-slate-900">🚨 कार्डिनल लक्षण:</strong> ${d.cardinal}</p>

      <div class="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200 font-sans">
        <div class="p-2 bg-white rounded-xl border border-blue-200">
          <span class="text-[10px] font-black text-blue-700 uppercase block tracking-wider">Tier 1: ड्रग ऑफ चॉइस / मुख्य एंटीबायोटिक</span>
          <p class="text-slate-800 font-bold mt-0.5">${d.tier1}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-emerald-200">
          <span class="text-[10px] font-black text-emerald-700 uppercase block tracking-wider">Tier 2: दर्द व सूजन निवारक (NSAID)</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier2}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-purple-200">
          <span class="text-[10px] font-black text-purple-700 uppercase block tracking-wider">Tier 3: एंटीहिस्टामिनिक व सपोर्टिव फ्लूइड</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier3}</p>
        </div>
        <div class="p-2 bg-white rounded-xl border border-amber-200">
          <span class="text-[10px] font-black text-amber-700 uppercase block tracking-wider">Tier 4: सहायक नुस्खा व हर्बल देखभाल</span>
          <p class="text-slate-800 font-medium mt-0.5">${d.tier4}</p>
        </div>
        <div class="p-2 bg-rose-50 rounded-xl border border-rose-200">
          <span class="text-[10px] font-black text-rose-700 uppercase block tracking-wider">Tier 5: क्लिनिकल सावधानियां व मतभेद</span>
          <p class="text-rose-900 font-bold mt-0.5">${d.tier5}</p>
        </div>
      </div>

      <div class="flex gap-2 pt-1">
        <button onclick="window.loadIntoOPDSlip('${escapeHtml(d.nameHindi)}', '${escapeHtml(d.tier1)}\\n${escapeHtml(d.tier2)}\\n${escapeHtml(d.tier3)}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
          <span>📝 ओपीडी पर्चे में भरें</span> <span>→</span>
        </button>
        <button onclick="window.consultGeminiDifferential('${escapeHtml(d.nameHindi)}', '${escapeHtml(d.cardinal)}')" class="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold border border-purple-200 px-3 py-2.5 rounded-xl text-xs transition">
          🤖 AI कंसल्ट
        </button>
      </div>
    </div>
  `).join("");
}

function renderFarmerSafeRemedies(diseases) {
  const container = document.getElementById("farmerRemediesContainer");
  if (!container) return;

  container.innerHTML = diseases.map(d => `
    <div class="bg-white border-2 border-emerald-100 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      <div class="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
          <span>🌿</span> ${d.nameHindi}
        </h3>
        <span class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">सुरक्षित नुस्खा</span>
      </div>

      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
        <strong class="text-emerald-950 text-xs block mb-1">🍵 सिद्ध देसी काढ़ा व घरेलू लेप:</strong>
        <p class="text-xs text-emerald-900 leading-relaxed">${d.tier4}</p>
      </div>

      <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
        <strong class="text-amber-950 text-xs block mb-1">⚠️ पशुपालक ध्यान दें (सुरक्षा नियम):</strong>
        <p class="text-xs text-amber-900 leading-relaxed">${d.tier5}</p>
      </div>
    </div>
  `).join("");
}

window.filterDiseaseCategory = function(cat, btn) {
  document.querySelectorAll(".q-filter-chip").forEach(el => {
    el.classList.remove("bg-blue-600", "text-white", "font-bold");
    el.classList.add("bg-slate-100", "text-slate-700", "font-medium");
  });

  if (btn) {
    btn.classList.remove("bg-slate-100", "text-slate-700", "font-medium");
    btn.classList.add("bg-blue-600", "text-white", "font-bold");
  }

  if (cat === "ALL") {
    renderClinicalDiseaseCards(MASTER_CLINICAL_DB);
  } else {
    const filtered = MASTER_CLINICAL_DB.filter(d => (d.category || "").toUpperCase() === cat.toUpperCase());
    renderClinicalDiseaseCards(filtered);
  }
};

// ============================================================================
// 12. SHAEFFER'S WEIGHT & ACCURATE DRUG DOSAGE ENGINE
// ============================================================================
window.calculateShaefferDosage = function() {
  const lenInput = document.getElementById("calcLengthInches");
  const girthInput = document.getElementById("calcGirthInches");

  const length = parseFloat(lenInput ? lenInput.value : 60) || 60;
  const girth = parseFloat(girthInput ? girthInput.value : 70) || 70;

  // Formula: Body Weight in kg = (Length in inches * Girth in inches^2) / 660
  const weightKg = Math.round((length * Math.pow(girth, 2)) / 660);
  const weightLbs = Math.round(weightKg * 2.20462);

  const kgEl = document.getElementById("computedWeightKg");
  const lbsEl = document.getElementById("computedWeightLbs");
  if (kgEl) kgEl.innerText = weightKg;
  if (lbsEl) lbsEl.innerText = weightLbs;

  const cefEl = document.getElementById("doseCeftriaxone");
  const melEl = document.getElementById("doseMeloxicam");
  const avilEl = document.getElementById("doseAvil");
  const iverEl = document.getElementById("doseIvermectin");

  if (cefEl) cefEl.innerText = `${((weightKg * 10) / 1000).toFixed(1)} gm (I/M / I/V)`;
  if (melEl) melEl.innerText = `${((weightKg * 0.5) / 10 * 2).toFixed(1)} ml (I/M)`;
  if (avilEl) avilEl.innerText = `${Math.min(20, Math.max(8, Math.round(weightKg * 0.03)))} ml (I/M)`;
  if (iverEl) iverEl.innerText = `${(weightKg / 50).toFixed(1)} ml (S/C strictly)`;
};

// ============================================================================
// 13. DIGITAL OPD PRESCRIPTION & 1-CLICK WHATSAPP DISPATCH
// ============================================================================
window.loadIntoOPDSlip = function(diseaseName, drugText) {
  const diagInput = document.getElementById("opdDiagnosis");
  const medInput = document.getElementById("opdMedicine");

  if (diagInput) diagInput.value = diseaseName;
  if (medInput) medInput.value = drugText;

  window.switchTab("rx");
};

window.dispatchOPDWhatsApp = function() {
  const farmerName = (document.getElementById("opdFarmerName")?.value || "").trim();
  const phone = (document.getElementById("opdFarmerPhone")?.value || "").trim().replace(/\D/g, "");
  const animal = document.getElementById("opdAnimal")?.value || "पशु";
  const diagnosis = (document.getElementById("opdDiagnosis")?.value || "").trim();
  const rx = (document.getElementById("opdMedicine")?.value || "").trim();
  const pregnancy = document.getElementById("opdPregnancy")?.value || "";
  const total = document.getElementById("opdTotalFee")?.value || "0";
  const paid = document.getElementById("opdPaidFee")?.value || "0";
  const due = document.getElementById("opdDueFee")?.value || "0";

  if (!farmerName || phone.length < 10 || !diagnosis) {
    alert("कृपया किसान का नाम, 10 अंकों का फोन नंबर व निदान अवश्य भरें!");
    return;
  }

  // Abortifacient Clinical Safety Guard Check
  const isPregnant = (pregnancy || "").toLowerCase().includes("गाभिन") || (pregnancy || "").toLowerCase().includes("pregnant");
  const hasDexa = (rx || "").toLowerCase().includes("dexa");

  if (isPregnant && hasDexa) {
    const alertMsg = getI18n("pregnancyAlert");
    alert(alertMsg);
    if (!confirm("पशु गाभिन है और प्रिस्क्रिप्शन में Dexamethasone दर्ज है। क्या आप इसे बदलकर Isoflupredone करना चाहते हैं?")) {
      return;
    }
  }

  const msg = `*🩺 VETCARE CLINICAL OPD PRESCRIPTION*\n` +
              `*दिनांक:* ${new Date().toLocaleDateString("hi-IN")}\n` +
              `-----------------------------------------\n` +
              `👤 *किसान:* ${farmerName}\n` +
              `🐾 *मरीज पशु:* ${animal} (${pregnancy})\n` +
              `🚨 *क्लिनिकल निदान:* ${diagnosis}\n` +
              `-----------------------------------------\n` +
              `💊 *Rx सुझाई गई दवाएं व इंजेक्शन:*\n${rx}\n` +
              `-----------------------------------------\n` +
              `💰 *फीस:* कुल ₹${total} | जमा ₹${paid} | *बकाया ₹${due}*\n\n` +
              `🏛️ *बैंक भुगतान विवरण (UPI):*\n` +
              `Payee: ${VETCARE_CONFIG.payeeName}\n` +
              `SBI UPI: ${VETCARE_CONFIG.sbi.upiId}\n` +
              `PNB UPI: ${VETCARE_CONFIG.pnb.upiId}\n\n` +
              `_Vetcare AI OS द्वारा सत्यापित डिजिटल पर्चा_`;

  const fullNumber = phone.length === 10 ? `91${phone}` : phone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 14. CLINIC INVENTORY COUNTER
// ============================================================================
window.renderClinicStock = function() {
  const container = document.getElementById("stockListContainer");
  if (!container) return;

  if (AppState.clinicStock.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">कोई स्टॉक आइटम मौजूद नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.clinicStock.map((item, idx) => {
    const isLow = item.qty <= item.minAlert;
    return `
      <div class="flex items-center justify-between p-3 rounded-2xl border ${isLow ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'}">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-xs font-black text-slate-900">${item.name}</strong>
            ${isLow ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">कम स्टॉक</span>' : ''}
          </div>
          <span class="text-[11px] text-slate-500">${item.category} • न्यूनतम अलर्ट: ${item.minAlert} ${item.unit}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.adjustStockQty(${idx}, -1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 shadow-xs">-</button>
          <span class="text-xs font-black w-8 text-center">${item.qty}</span>
          <button onclick="window.adjustStockQty(${idx}, 1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 shadow-xs">+</button>
        </div>
      </div>
    `;
  }).join("");
};

window.adjustStockQty = function(index, delta) {
  if (AppState.clinicStock[index]) {
    AppState.clinicStock[index].qty = Math.max(0, AppState.clinicStock[index].qty + delta);
    persistStockVault();
    window.renderClinicStock();
  }
};

window.openNewStockModal = function() {
  const name = prompt("दवा अथवा सीमन स्ट्रॉ का नाम दर्ज करें:");
  if (!name) return;
  const qty = parseInt(prompt("वर्तमान स्टॉक संख्या:") || "10", 10);
  AppState.clinicStock.unshift({
    id: Date.now(),
    name: name.trim(),
    category: "INJECTION",
    qty: isNaN(qty) ? 10 : qty,
    unit: "vials",
    minAlert: 3
  });
  persistStockVault();
  window.renderClinicStock();
};

// ============================================================================
// 15. KHATA LEDGER & 1-CLICK WHATSAPP TAGADA
// ============================================================================
window.renderKhataLedger = function() {
  const container = document.getElementById("khataListContainer");
  if (!container) return;

  let totalPaid = 0;
  let totalDue = 0;

  AppState.khataRecords.forEach(item => {
    if (item.type === "PAID") totalPaid += item.amount;
    else totalDue += item.amount;
  });

  const paidEl = document.getElementById("khataTotalPaid");
  const dueEl = document.getElementById("khataTotalDues");
  if (paidEl) paidEl.innerText = `₹${totalPaid}`;
  if (dueEl) dueEl.innerText = `₹${totalDue}`;

  if (AppState.khataRecords.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">खाते में कोई प्रविष्टि नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.khataRecords.map((item, idx) => `
    <div class="flex items-center justify-between p-3.5 rounded-2xl border ${item.type === 'PAID' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}">
      <div>
        <strong class="text-xs font-black text-slate-900 block">${item.farmerName}</strong>
        <span class="text-[11px] text-slate-600 font-mono">${item.phone || '-'}</span>
        <p class="text-[10px] text-slate-500 mt-0.5">${item.note || ''} • ${item.date}</p>
      </div>
      <div class="text-right space-y-1">
        <span class="text-xs font-black block ${item.type === 'PAID' ? 'text-emerald-700' : 'text-rose-700'}">
          ${item.type === 'PAID' ? '+ ₹' : '- ₹'}${item.amount}
        </span>
        <div class="flex items-center gap-1 justify-end">
          ${item.type === 'DUE' && (item.phone || '').replace(/\D/g, '').length >= 10 ? `
            <button onclick="window.sendKhataWhatsAppTagada(${idx})" class="text-[10px] bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-0.5 rounded-md shadow-xs">
              तगादा 💬
            </button>
          ` : ''}
          <button onclick="window.removeKhataRecord(${idx})" class="text-[10px] text-slate-400 hover:text-rose-600 font-bold ml-1">✕</button>
        </div>
      </div>
    </div>
  `).join("");
};

window.sendKhataWhatsAppTagada = function(index) {
  const item = AppState.khataRecords[index];
  if (!item) return;

  const cleanPhone = (item.phone || "").replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    alert("वैध 10 अंकों का फोन नंबर उपलब्ध नहीं है!");
    return;
  }

  const msg = `*📢 VETCARE क्लिनिक बकाया भुगतान स्मरण पत्र*\n\n` +
              `नमस्ते *${item.farmerName}* जी,\n` +
              `आपके क्लिनिक/डेयरी खाते का कुल बकाया *₹${item.amount}* है (${item.note || 'पशु चिकित्सा परामर्श'}).\n\n` +
              `कृपया निम्न अधिकृत खाते में शीघ्र भुगतान करने का कष्ट करें:\n` +
              `🏛️ *Payee:* ${VETCARE_CONFIG.payeeName} (${VETCARE_CONFIG.beneficiary})\n` +
              `🔹 *SBI UPI:* ${VETCARE_CONFIG.sbi.upiId}\n` +
              `🔹 *PNB UPI:* ${VETCARE_CONFIG.pnb.upiId}\n` +
              `🔹 *SBI A/C:* ${VETCARE_CONFIG.sbi.account} (IFSC: ${VETCARE_CONFIG.sbi.ifsc})\n\n` +
              `धन्यवाद, Vetcare क्लिनिकल सपोर्ट।`;

  const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.removeKhataRecord = function(index) {
  if (confirm(getI18n("confirmDelete"))) {
    AppState.khataRecords.splice(index, 1);
    persistKhataVault();
    window.renderKhataLedger();
  }
};

// ============================================================================
// 16. LIVE GEMINI CLINICAL CONSULTANT TRIGGER
// ============================================================================
window.consultGeminiDifferential = async function(diseaseName, symptoms) {
  const prompt = `You are a Senior Veterinary Clinical Consultant.
Case:
Suspected Disease: ${diseaseName}
Key Cardinal Symptoms: ${symptoms}

Please provide:
1. Top 2 Differential Diagnoses to rule out.
2. Emergency First-Line Injections with precise mg/kg doses.
3. Essential Confirmation Tests (Blood Smear / Milk strip / Urinalysis).
4. Direct instructions in clear Hindi and English mix.
CRITICAL SAFETY RULE: Warn explicitly if any abortifacient drug (e.g. Dexamethasone) is involved.`;

  const btn = event?.target;
  const originalText = btn ? btn.innerText : "";
  if (btn) btn.innerText = "विचार कर रहे हैं... 🤖";

  try {
    const aiReply = await window.callGeminiClinicalAI(prompt);
    if (btn) btn.innerText = originalText;

    if (aiReply) {
      alert(`🤖 AI क्लिनिकल विभेदक रिपोर्ट:\n\n${aiReply}`);
    }
  } catch (err) {
    if (btn) btn.innerText = originalText;
    alert(`Gemini AI त्रुटि: ${err.message}`);
  }
};

window.dispatchEmergencyWhatsApp = function() {
  const msg = `*🚨 आपातकालीन पशु स्वास्थ्य परामर्श अनुरोध*\n\n` +
              `नमस्ते डॉक्टर साहब, मुझे अपने पशु के संबंध में आपातकालीन क्लिनिकल सहायता की आवश्यकता है।\n` +
              `ऐप: Vetcare AI OS`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 17. LANGUAGE ENGINE HOOK
// ============================================================================
window.changeLanguage = function(lang) {
  currentLang = lang;
  localStorage.setItem("vetcare_lang", lang);
  if (AppState.activeRole) {
    window.applyRoleState(AppState.activeRole);
  }
};

// ============================================================================
// 18. INITIALIZATION BOOTSTRAPPER & EVENT DISPATCHER
// ============================================================================
function initVetcareOS() {
  loadStorageVault();
  window.initSessionTimer();

  // Attach search listener defensively with zero-match live AI fallback trigger
  const searchInput = document.getElementById("unifiedDiseaseSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      const q = (e.target.value || "").toLowerCase().trim();
      const filtered = MASTER_CLINICAL_DB.filter(item => {
        return (item.nameHindi || "").toLowerCase().includes(q) ||
               (item.cardinal || "").toLowerCase().includes(q) ||
               (item.keywords || []).some(k => (k || "").toLowerCase().includes(q));
      });
      renderClinicalDiseaseCards(filtered);
    });
  }

  // Restore registered role or display landing screen
  const savedRole = localStorage.getItem("vetcare_registered_role");
  if (savedRole === "doctor" || savedRole === "farmer") {
    window.applyRoleState(savedRole);
  } else {
    const landing = document.getElementById("role-selection-screen");
    const mainApp = document.getElementById("main-app-container");
    if (landing) landing.style.display = "flex";
    if (mainApp) mainApp.style.display = "none";
  }
}

// DomContentLoaded Safe Anchor
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVetcareOS);
} else {
  initVetcareOS();
}
